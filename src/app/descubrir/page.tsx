import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";
import { SwipeDeck, type SwipeItem } from "@/components/swipe-deck";

export const dynamic = "force-dynamic";

type AchievementRow = Pick<
  Database["public"]["Tables"]["achievements"]["Row"],
  "id" | "slug" | "title" | "emoji" | "category" | "unlock_count"
>;

type RarityRow = Pick<
  NonNullable<Database["public"]["Views"]["achievement_rarity"]["Row"]>,
  "id" | "rarity_percent"
>;

type UnlockRow = { achievement_id: string };

export default async function DescubrirPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/descubrir");

  // 1. The user's already-unlocked set (so we can exclude them from the pool).
  const { data: ownedRows } = await supabase
    .from("unlocks")
    .select("achievement_id")
    .eq("user_id", user.id)
    .returns<UnlockRow[]>();
  const owned = new Set((ownedRows ?? []).map((u) => u.achievement_id));

  // 2. The pool — approved achievements. Cap at 50 to avoid huge initial payloads.
  const { data: pool, error } = await supabase
    .from("achievements")
    .select("id, slug, title, emoji, category, unlock_count")
    .eq("status", "approved")
    .limit(50)
    .returns<AchievementRow[]>();

  if (error) {
    console.error("descubrir pool load error", error);
    return (
      <main className="min-h-screen">
        <p className="px-4 md:px-8 text-red mt-6">No se pudieron cargar los logros.</p>
      </main>
    );
  }

  // 3. Rarities for those pool ids.
  const poolIds = (pool ?? []).map((p) => p.id);
  const rarityById = new Map<string, number>();
  if (poolIds.length > 0) {
    const { data: rarityRows } = await supabase
      .from("achievement_rarity")
      .select("id, rarity_percent")
      .in("id", poolIds)
      .returns<RarityRow[]>();
    for (const r of rarityRows ?? []) {
      if (r.id != null) rarityById.set(r.id, Number(r.rarity_percent ?? 0));
    }
  }

  // 4. Filter out owned, shuffle, build SwipeItems.
  const items: SwipeItem[] = (pool ?? [])
    .filter((a) => !owned.has(a.id))
    .map((a) => ({
      id: a.id,
      slug: a.slug,
      emoji: a.emoji,
      title: a.title,
      category: a.category,
      unlockCount: a.unlock_count,
      rarityPercent: rarityById.get(a.id) ?? 0,
    }))
    .sort(() => Math.random() - 0.5);

  return (
    <main className="min-h-screen">
      <section className="px-4 py-6 md:py-10">
        <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-center mb-6 md:mb-8">
          Descubrir
        </h1>
        <SwipeDeck items={items} />
      </section>
    </main>
  );
}
