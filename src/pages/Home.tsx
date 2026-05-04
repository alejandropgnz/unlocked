import { useAchievements } from "@/hooks/useAchievements";
import { AchievementGrid } from "@/components/AchievementGrid";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Home() {
  const { data: items, isLoading, isError } = useAchievements();

  return (
    <section className="min-h-screen">
      <header className="px-3 md:px-4 pt-6 pb-4">
        <p className="text-muted text-sm md:text-base">
          Colecciona los logros más absurdos de tu vida.
        </p>
      </header>

      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 p-3 md:p-4 justify-items-center">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="w-[200px] h-[260px]" />
          ))}
        </div>
      )}

      {isError && (
        <p className="px-3 md:px-4 text-red">No se pudieron cargar los logros.</p>
      )}

      {items && (
        <AchievementGrid
          items={items.map((a) => ({
            slug: a.slug,
            title: a.title,
            emoji: a.emoji,
            rarityPercent: a.rarityPercent,
            unlockCount: a.unlock_count,
            category: a.category,
          }))}
        />
      )}
    </section>
  );
}
