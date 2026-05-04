import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/server";
import { OgCardTop5 } from "@/components/og-card-top5";
import type { Database } from "@/types/database";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ProfileRow = Pick<
  Database["public"]["Tables"]["profiles"]["Row"],
  "id" | "username" | "display_name" | "avatar_url" | "top5"
>;

type AchievementRow = Pick<
  Database["public"]["Tables"]["achievements"]["Row"],
  "id" | "emoji" | "title" | "unlock_count"
>;

type RarityRow = Pick<
  NonNullable<Database["public"]["Views"]["achievement_rarity"]["Row"]>,
  "id" | "rarity_percent"
>;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ username: string }> },
) {
  const { username } = await params;
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, username, display_name, avatar_url, top5")
    .eq("username", username)
    .returns<ProfileRow[]>()
    .maybeSingle();

  if (error || !profile) return new Response("Not found", { status: 404 });

  const { count: totalUnlocks } = await supabase
    .from("unlocks")
    .select("id", { count: "exact", head: true })
    .eq("user_id", profile.id);

  const top5Ids = (profile.top5 ?? []).filter((id): id is string => typeof id === "string");
  let top5: { emoji: string; title: string; rarityPercent: number }[] = [];

  // Need rarity for everything either rendered or used as "rarest"
  const { data: rarityRows } = await supabase
    .from("achievement_rarity")
    .select("id, rarity_percent")
    .returns<RarityRow[]>();
  const rarityById = new Map<string, number>();
  for (const r of rarityRows ?? []) {
    if (r.id != null) rarityById.set(r.id, Number(r.rarity_percent ?? 0));
  }

  if (top5Ids.length > 0) {
    const { data: top5Rows } = await supabase
      .from("achievements")
      .select("id, emoji, title, unlock_count")
      .in("id", top5Ids)
      .returns<AchievementRow[]>();
    const byId = new Map((top5Rows ?? []).map((r) => [r.id, r] as const));
    top5 = top5Ids
      .map((id) => byId.get(id))
      .filter((r): r is AchievementRow => r != null)
      .map((r) => ({
        emoji: r.emoji,
        title: r.title,
        rarityPercent: rarityById.get(r.id) ?? 0,
      }));
  }

  // Find the rarest unlocked achievement (lowest rarity_percent among the user's unlocks)
  const { data: rarestRows } = await supabase
    .from("unlocks")
    .select("achievements!inner(id, emoji, title, unlock_count)")
    .eq("user_id", profile.id)
    .order("achievements(unlock_count)", { ascending: true })
    .limit(1)
    .returns<{ achievements: AchievementRow | null }[]>();
  const rarestAchievement = rarestRows?.[0]?.achievements ?? null;
  const rarest = rarestAchievement
    ? {
        emoji: rarestAchievement.emoji,
        title: rarestAchievement.title,
        rarityPercent: rarityById.get(rarestAchievement.id) ?? 0,
      }
    : undefined;

  return new ImageResponse(
    (
      <OgCardTop5
        username={profile.username}
        displayName={profile.display_name}
        avatarUrl={profile.avatar_url ?? undefined}
        totalUnlocks={totalUnlocks ?? 0}
        rarest={rarest}
        top5={top5}
      />
    ),
    { width: 1080, height: 1920 },
  );
}
