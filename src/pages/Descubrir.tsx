import { useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useAchievements } from "@/hooks/useAchievements";
import { useUserUnlocks } from "@/hooks/useUserUnlocks";
import { useUserPasses } from "@/hooks/useUserPasses";
import { SwipeDeck } from "@/components/SwipeDeck";
import { Skeleton } from "@/components/ui/Skeleton";
import type { SwipeItem } from "@/components/SwipeDeck";

/**
 * FNV-1a hash of a string → uint32. Cheap, deterministic, no deps.
 * Used to derive a numeric seed from the user.id (UUID string) so each
 * user gets their own consistent shuffle order across sessions and
 * page navigations.
 */
function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Mulberry32 — small fast seeded PRNG. Returns a function that yields
 * floats in [0,1). Enough quality for shuffling a deck; not for crypto.
 */
function mulberry32(seed: number): () => number {
  let s = seed;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Fisher-Yates with a seeded RNG. Same seed always produces the same
 * order — that's the whole point. Each user has their own shuffle that
 * stays stable across mounts/navigations, but two users see different
 * orders so the swipe deck doesn't feel "global" / scripted.
 */
function shuffledSeeded<T>(arr: T[], seed: number): T[] {
  const rand = mulberry32(seed);
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Descubrir() {
  const { user } = useAuth();
  const { data: achievements, isLoading: achLoading } = useAchievements();
  const { data: myUnlocks, isLoading: unlocksLoading } = useUserUnlocks(user?.id);
  const { data: passedIds, isLoading: passesLoading } = useUserPasses(user?.id);

  const skipIds = useMemo(() => {
    const set = new Set<string>();
    for (const u of myUnlocks ?? []) set.add(u.achievementId);
    for (const id of passedIds ?? []) set.add(id);
    return set;
  }, [myUnlocks, passedIds]);

  // Seed derived from user.id → each user has a personal but consistent
  // shuffle. Anonymous users (no id) all share seed 0; that's fine,
  // /descubrir requires login anyway via the route guard.
  const seed = useMemo(() => (user?.id ? hashStr(user.id) : 0), [user?.id]);

  const deck = useMemo((): SwipeItem[] => {
    if (!achievements) return [];
    const remaining = achievements.filter((a) => !skipIds.has(a.id));
    // Shuffle BEFORE filtering would also work, but filtering first means
    // the seeded RNG runs over a slightly smaller array each time the
    // user passes a card. Net result is the same effective order minus
    // the cards already interacted with — feels stable.
    return shuffledSeeded(remaining, seed).map((a) => ({
      id: a.id,
      slug: a.slug,
      emoji: a.emoji,
      title: a.title,
      rarityPercent: a.rarityPercent,
      unlockCount: a.unlock_count,
      category: a.category,
    }));
  }, [achievements, skipIds, seed]);

  const isLoading = achLoading || unlocksLoading || passesLoading;

  return (
    <section
      className="
        px-4 md:px-8 py-4 md:py-8 flex flex-col
        overflow-hidden md:overflow-visible
        h-[calc(100dvh-7.5rem-env(safe-area-inset-top)-env(safe-area-inset-bottom))]
        md:h-auto
      "
    >
      {/* Header — hidden on mobile (the title sits in MobileTopBar instead so
          the swipe card gets the spotlight). Visible on desktop. */}
      <header className="hidden md:block text-center mb-8 shrink-0">
        <h1 className="text-3xl font-black tracking-tighter">Descubrir</h1>
        <p className="text-muted text-sm mt-1">
          Desliza derecha para desbloquear, izquierda para pasar.
        </p>
      </header>

      <div className="flex-1 min-h-0 flex items-stretch justify-center md:h-[520px] md:flex-none">
        {isLoading ? (
          <div className="relative w-full max-w-sm mx-auto h-full max-h-[520px]">
            <Skeleton className="absolute inset-0 rounded-3xl" />
          </div>
        ) : (
          <SwipeDeck items={deck} />
        )}
      </div>
    </section>
  );
}
