import { createClient } from "@/lib/supabase/server";
import { AchievementGrid, type GridItem } from "@/components/achievement-grid";
import { SiteHeader } from "@/components/site-header";
import type { Database } from "@/types/database";

type AchievementRow = Database["public"]["Tables"]["achievements"]["Row"];
type RarityRow = Database["public"]["Views"]["achievement_rarity"]["Row"];

export const revalidate = 60;

export default async function HomePage() {
  const supabase = await createClient();

  const [achievementsRes, rarityRes] = await Promise.all([
    supabase
      .from("achievements")
      .select("id, slug, title, emoji, category, unlock_count")
      .eq("status", "approved")
      .order("unlock_count", { ascending: false })
      .limit(40)
      .returns<
        Pick<
          AchievementRow,
          "id" | "slug" | "title" | "emoji" | "category" | "unlock_count"
        >[]
      >(),
    supabase
      .from("achievement_rarity")
      .select("id, rarity_percent")
      .returns<Pick<RarityRow, "id" | "rarity_percent">[]>(),
  ]);

  if (achievementsRes.error || rarityRes.error) {
    console.error("home load error", {
      achievements: achievementsRes.error,
      rarity: rarityRes.error,
    });
    return (
      <main className="min-h-screen">
        <SiteHeader />
        <p className="px-4 md:px-8 text-red">No se pudieron cargar los logros.</p>
      </main>
    );
  }

  const rarityById = new Map<string, number>();
  for (const r of rarityRes.data ?? []) {
    if (r.id != null) rarityById.set(r.id, Number(r.rarity_percent ?? 0));
  }

  const items: GridItem[] = (achievementsRes.data ?? []).map((a) => ({
    slug: a.slug,
    title: a.title,
    emoji: a.emoji,
    category: a.category,
    unlockCount: a.unlock_count,
    rarityPercent: rarityById.get(a.id) ?? 0,
  }));

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <AchievementGrid items={items} />
    </main>
  );
}
