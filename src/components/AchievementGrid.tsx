import { AchievementCard } from "./AchievementCard";

interface GridItem {
  slug: string;
  title: string;
  emoji: string;
  rarityPercent: number;
  unlockCount: number;
  category: string;
}

export function AchievementGrid({
  items,
  size = "md",
  emptyMessage,
}: {
  items: GridItem[];
  size?: "sm" | "md" | "lg";
  emptyMessage?: string;
}) {
  if (items.length === 0) {
    return (
      <p className="text-muted text-center py-12">
        {emptyMessage ?? "No hay logros todavía."}
      </p>
    );
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 p-3 md:p-4 justify-items-center">
      {items.map((a) => (
        <AchievementCard key={a.slug} {...a} size={size} />
      ))}
    </div>
  );
}
