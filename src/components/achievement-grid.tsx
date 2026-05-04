import { AchievementCard } from "./achievement-card";

export interface GridItem {
  slug: string;
  title: string;
  emoji: string;
  category: string;
  unlockCount: number;
  rarityPercent: number;
}

export function AchievementGrid({ items }: { items: GridItem[] }) {
  if (items.length === 0) {
    return (
      <p className="text-muted text-center py-20">
        No hay logros todavía. Vuelve pronto.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 p-3 md:p-4 justify-items-center">
      {items.map((a) => (
        <AchievementCard
          key={a.slug}
          slug={a.slug}
          title={a.title}
          emoji={a.emoji}
          rarityPercent={a.rarityPercent}
          unlockCount={a.unlockCount}
          category={a.category}
          size="md"
        />
      ))}
    </div>
  );
}
