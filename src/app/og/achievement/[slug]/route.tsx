import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/server";
import { OgCardIndividual } from "@/components/og-card-individual";
import type { Database } from "@/types/database";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AchievementRow = Pick<
  Database["public"]["Tables"]["achievements"]["Row"],
  "id" | "title" | "emoji" | "category" | "unlock_count"
>;

type RarityRow = Pick<
  NonNullable<Database["public"]["Views"]["achievement_rarity"]["Row"]>,
  "id" | "rarity_percent"
>;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: achievement, error } = await supabase
    .from("achievements")
    .select("id, title, emoji, category, unlock_count")
    .eq("slug", slug)
    .eq("status", "approved")
    .returns<AchievementRow[]>()
    .maybeSingle();

  if (error || !achievement) {
    return new Response("Not found", { status: 404 });
  }

  const { data: rarity } = await supabase
    .from("achievement_rarity")
    .select("id, rarity_percent")
    .eq("id", achievement.id)
    .returns<RarityRow[]>()
    .maybeSingle();

  return new ImageResponse(
    (
      <OgCardIndividual
        emoji={achievement.emoji}
        title={achievement.title}
        rarityPercent={Number(rarity?.rarity_percent ?? 0)}
        unlockCount={achievement.unlock_count}
        category={achievement.category}
        username=""
      />
    ),
    { width: 1080, height: 1920 },
  );
}
