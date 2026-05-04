import { createClient } from "@/lib/supabase/server";
import { AchievementGrid, type GridItem } from "@/components/achievement-grid";

export const revalidate = 60;

interface AchievementRow {
  slug: string;
  title: string;
  emoji: string;
  category: string;
  unlock_count: number;
  achievement_rarity:
    | { rarity_percent: number | null }
    | { rarity_percent: number | null }[]
    | null;
}

export default async function HomePage() {
  const supabase = await createClient();

  const { data: rawAchievements, error } = await supabase
    .from("achievements")
    .select(
      "slug, title, emoji, category, unlock_count, achievement_rarity!inner(rarity_percent)",
    )
    .eq("status", "approved")
    .order("unlock_count", { ascending: false })
    .limit(40);

  if (error) {
    console.error("home achievements load error", error);
    return (
      <main className="min-h-screen p-8">
        <p className="text-red">No se pudieron cargar los logros.</p>
      </main>
    );
  }

  const achievements = (rawAchievements ?? []) as AchievementRow[];

  const items: GridItem[] = achievements.map((a) => {
    const rarity = Array.isArray(a.achievement_rarity)
      ? a.achievement_rarity[0]
      : a.achievement_rarity;
    return {
      slug: a.slug,
      title: a.title,
      emoji: a.emoji,
      category: a.category,
      unlockCount: a.unlock_count,
      rarityPercent: Number(rarity?.rarity_percent ?? 0),
    };
  });

  return (
    <main className="min-h-screen">
      <header className="px-4 md:px-8 pt-10 pb-8">
        <h1 className="text-5xl md:text-7xl font-black tracking-tightest bg-gradient-to-br from-red via-gold to-violet bg-clip-text text-transparent leading-none">
          UNLOCKED
        </h1>
        <p className="text-muted mt-2 text-sm md:text-base">
          Colecciona los logros más absurdos de tu vida.
        </p>
      </header>
      <AchievementGrid items={items} />
    </main>
  );
}
