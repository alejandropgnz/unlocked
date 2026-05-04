import { useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useAchievements } from "@/hooks/useAchievements";
import { useUserUnlocks } from "@/hooks/useUserUnlocks";
import { SwipeDeck } from "@/components/SwipeDeck";
import { Skeleton } from "@/components/ui/Skeleton";
import type { SwipeItem } from "@/components/SwipeDeck";

function shuffled<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Descubrir() {
  const { user } = useAuth();
  const { data: achievements, isLoading: achLoading } = useAchievements();
  const { data: myUnlocks, isLoading: unlocksLoading } = useUserUnlocks(user?.id);

  const ownedIds = useMemo(
    () => new Set((myUnlocks ?? []).map((u) => u.achievementId)),
    [myUnlocks],
  );

  const deck = useMemo((): SwipeItem[] => {
    if (!achievements) return [];
    const notOwned = achievements.filter((a) => !ownedIds.has(a.id));
    return shuffled(notOwned).map((a) => ({
      id: a.id,
      slug: a.slug,
      emoji: a.emoji,
      title: a.title,
      rarityPercent: a.rarityPercent,
      unlockCount: a.unlock_count,
      category: a.category,
    }));
  }, [achievements, ownedIds]);

  const isLoading = achLoading || unlocksLoading;

  return (
    <section
      className="
        px-4 md:px-8 py-4 md:py-8 flex flex-col
        overflow-hidden md:overflow-visible
        h-[calc(100dvh-7.5rem-env(safe-area-inset-top)-env(safe-area-inset-bottom))]
        md:h-auto
      "
    >
      <header className="text-center mb-4 md:mb-8 shrink-0">
        <h1 className="text-2xl md:text-3xl font-black tracking-tighter">Descubrir</h1>
        <p className="text-muted text-xs md:text-sm mt-1">
          Desliza derecha para adjudicarte, izquierda para pasar.
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
