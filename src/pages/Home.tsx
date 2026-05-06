import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import { useInfiniteAchievements } from "@/hooks/useInfiniteAchievements";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useUserUnlocks } from "@/hooks/useUserUnlocks";
import { useUserPasses } from "@/hooks/useUserPasses";
import { useAuth } from "@/contexts/AuthContext";
import { AchievementGrid } from "@/components/AchievementGrid";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/cn";
import type { Database } from "@/types/database";

type Category = Database["public"]["Enums"]["achievement_category"];

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "familia", label: "Familia" },
  { value: "amigos", label: "Amigos" },
  { value: "amor", label: "Amor" },
  { value: "relaciones", label: "Relaciones" },
  { value: "trabajo", label: "Trabajo" },
  { value: "viajes", label: "Viajes" },
  { value: "verguenza", label: "Vergüenza" },
  { value: "resaca", label: "Resaca" },
  { value: "salud", label: "Salud" },
  { value: "random", label: "Random" },
];

export default function Home() {
  const { user } = useAuth();
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const categoryParam = params.get("cat");
  const category =
    CATEGORIES.find((c) => c.value === categoryParam)?.value ?? null;

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteAchievements({ query, category });
  const { data: ownedUnlocks } = useUserUnlocks(user?.id);
  const { data: passedIds } = useUserPasses(user?.id);

  const sentinelRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  });

  const items = data?.pages.flatMap((p) => p.items) ?? [];
  const ownedSet = useMemo(
    () => new Set((ownedUnlocks ?? []).map((u) => u.achievementId)),
    [ownedUnlocks],
  );
  const passedSet = useMemo(
    () => new Set(passedIds ?? []),
    [passedIds],
  );

  // Helper that mutates the URL params atomically (drops empty values so we
  // don't leave stale `?q=` or `?cat=` in the URL).
  const updateParams = (next: { q?: string; cat?: Category | null }) => {
    const out = new URLSearchParams(params);
    if (next.q !== undefined) {
      const v = next.q.trim();
      if (v) out.set("q", v);
      else out.delete("q");
    }
    if (next.cat !== undefined) {
      if (next.cat) out.set("cat", next.cat);
      else out.delete("cat");
    }
    setParams(out, { replace: true });
  };

  const filtered = query.length > 0 || category !== null;

  return (
    <section className="max-w-7xl mx-auto">
      <header className="px-4 sm:px-6 lg:px-8 pt-6 pb-4 space-y-4">
        {/* Title + bullet + subtitle in a single row. Subtitle hides on
            very narrow screens so the title doesn't truncate. */}
        <div className="flex items-baseline gap-2 flex-wrap">
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter">
            Todos los logros
          </h1>
          <span className="text-muted hidden sm:inline">·</span>
          <p className="text-muted text-sm md:text-base hidden sm:inline">
            Colecciona los logros más absurdos de tu vida.
          </p>
        </div>

        {/* Search bar — desktop only. On mobile the search lives in the
            MobileTopBar (lupa icon expands inline). */}
        <div className="hidden md:block max-w-md">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => updateParams({ q: e.target.value })}
              placeholder="Buscar logros…"
              className="w-full pl-9 pr-9 py-2.5 bg-surface border border-white/10 rounded-full text-sm focus:border-indigo focus:outline-none placeholder:text-muted"
            />
            {query && (
              <button
                type="button"
                onClick={() => updateParams({ q: "" })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category chips — horizontally scrollable on mobile, wraps on
            desktop. "Todos" deselects the filter. */}
        <div className="-mx-4 sm:-mx-6 lg:-mx-8">
          <div className="flex gap-2 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-1 scrollbar-none md:flex-wrap">
            <CategoryChip
              label="Todos"
              active={category === null}
              onClick={() => updateParams({ cat: null })}
            />
            {CATEGORIES.map((c) => (
              <CategoryChip
                key={c.value}
                label={c.label}
                active={category === c.value}
                onClick={() => updateParams({ cat: c.value })}
              />
            ))}
          </div>
        </div>
      </header>

      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 px-4 sm:px-6 lg:px-8 py-4 justify-items-start">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="w-full max-w-[200px] h-[260px]" />
          ))}
        </div>
      )}

      {isError && (
        <p className="px-4 sm:px-6 lg:px-8 text-red">
          No se pudieron cargar los logros.
        </p>
      )}

      {!isLoading && !isError && (
        <>
          {items.length === 0 ? (
            <div className="px-4 sm:px-6 lg:px-8 py-12 text-center">
              <p className="text-muted text-sm">
                {filtered
                  ? `Sin resultados${query ? ` para "${query}"` : ""}.`
                  : "No hay logros."}
              </p>
              {filtered && (
                <button
                  type="button"
                  onClick={() => setParams({}, { replace: true })}
                  className="mt-3 text-xs uppercase tracking-widest underline text-indigo"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          ) : (
            <AchievementGrid
              items={items.map((a) => ({
                slug: a.slug,
                title: a.title,
                emoji: a.emoji,
                rarityPercent: a.rarityPercent,
                unlockCount: a.unlock_count,
                category: a.category,
                isUnlocked: ownedSet.has(a.id),
                isPassed: passedSet.has(a.id),
              }))}
            />
          )}

          {/* Sentinel — when this scrolls into view, load next page */}
          <div ref={sentinelRef} className="h-12" />

          {isFetchingNextPage && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 px-4 sm:px-6 lg:px-8 py-4 justify-items-start">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="w-full max-w-[200px] h-[260px]" />
              ))}
            </div>
          )}

          {!hasNextPage && items.length > 0 && (
            <p className="text-muted text-xs text-center py-8 uppercase tracking-widest">
              · fin del catálogo ·
            </p>
          )}
        </>
      )}
    </section>
  );
}

function CategoryChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 px-3 py-1.5 rounded-full text-xs uppercase tracking-widest font-bold transition border",
        active
          ? "bg-indigo text-bg border-indigo"
          : "bg-surface text-muted border-white/10 hover:text-white hover:border-white/30",
      )}
    >
      {label}
    </button>
  );
}
