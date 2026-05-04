import { useInfiniteAchievements } from "@/hooks/useInfiniteAchievements";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useUserUnlocks } from "@/hooks/useUserUnlocks";
import { useAuth } from "@/contexts/AuthContext";
import { AchievementGrid } from "@/components/AchievementGrid";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Home() {
  const { user } = useAuth();
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteAchievements();
  const { data: ownedUnlocks } = useUserUnlocks(user?.id);

  const sentinelRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  });

  const items = data?.pages.flatMap((p) => p.items) ?? [];
  const ownedSet = new Set(
    (ownedUnlocks ?? []).map((u) => u.achievementId),
  );

  return (
    <section className="min-h-screen max-w-7xl mx-auto">
      <header className="px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <h1 className="text-2xl md:text-3xl font-black tracking-tighter">
          Todos los logros
        </h1>
        <p className="text-muted text-sm md:text-base mt-1">
          Colecciona los logros más absurdos de tu vida.
        </p>
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
          <AchievementGrid
            items={items.map((a) => ({
              slug: a.slug,
              title: a.title,
              emoji: a.emoji,
              rarityPercent: a.rarityPercent,
              unlockCount: a.unlock_count,
              category: a.category,
              isUnlocked: ownedSet.has(a.id),
            }))}
          />

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
