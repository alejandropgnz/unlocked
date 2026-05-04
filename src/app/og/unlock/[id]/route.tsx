import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/server";
import { OgCardIndividual } from "@/components/og-card-individual";
import type { Database } from "@/types/database";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AchievementJoin = Pick<
  Database["public"]["Tables"]["achievements"]["Row"],
  "id" | "title" | "emoji" | "category" | "unlock_count"
>;

type ProfileJoin = Pick<Database["public"]["Tables"]["profiles"]["Row"], "username">;

type RarityRow = Pick<
  NonNullable<Database["public"]["Views"]["achievement_rarity"]["Row"]>,
  "id" | "rarity_percent"
>;

interface UnlockJoinRow {
  user_id: string;
  achievements: AchievementJoin | null;
  profiles: ProfileJoin | null;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: unlock, error } = await supabase
    .from("unlocks")
    .select(
      "user_id, achievements!inner(id, title, emoji, category, unlock_count), profiles!unlocks_user_id_fkey(username)",
    )
    .eq("id", id)
    .returns<UnlockJoinRow[]>()
    .maybeSingle();

  if (error || !unlock || !unlock.achievements) {
    return new Response("Not found", { status: 404 });
  }

  const achievement = unlock.achievements;
  const profile = unlock.profiles;

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
        username={profile?.username ?? "anonymous"}
      />
    ),
    { width: 1080, height: 1920 },
  );
}
