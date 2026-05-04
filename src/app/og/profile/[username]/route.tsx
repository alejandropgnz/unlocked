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

  const top5Ids = (profile.top5 ?? []).filter((id): id is string => typeof id === "string");

  // Fetch the user's unlocks with the achievements they reference (used for "rarest" + total)
  const { data: unlocksData } = await supabase
    .from("unlocks")
    .select("achievements!inner(id, emoji, title, unlock_count)")
    .eq("user_id", profile.id)
    .returns<{ achievements: AchievementRow | null }[]>();

  const userAchievements: AchievementRow[] = (unlocksData ?? [])
    .map((u) => u.achievements)
    .filter((a): a is AchievementRow => a != null);

  const totalUnlocks = userAchievements.length;

  // Top-5 details (only fetch the rows we need)
  let top5Details: AchievementRow[] = [];
  if (top5Ids.length > 0) {
    const { data: top5Rows } = await supabase
      .from("achievements")
      .select("id, emoji, title, unlock_count")
      .in("id", top5Ids)
      .returns<AchievementRow[]>();
    const byId = new Map((top5Rows ?? []).map((r) => [r.id, r] as const));
    top5Details = top5Ids
      .map((id) => byId.get(id))
      .filter((r): r is AchievementRow => r != null);
  }

  // Single scoped rarity query (top-5 + collection)
  const relevantIds = Array.from(
    new Set([...top5Ids, ...userAchievements.map((a) => a.id)]),
  );
  const rarityById = new Map<string, number>();
  if (relevantIds.length > 0) {
    const { data: rarityRows } = await supabase
      .from("achievement_rarity")
      .select("id, rarity_percent")
      .in("id", relevantIds)
      .returns<RarityRow[]>();
    for (const r of rarityRows ?? []) {
      if (r.id != null) rarityById.set(r.id, Number(r.rarity_percent ?? 0));
    }
  }

  const top5 = top5Details.map((r) => ({
    emoji: r.emoji,
    title: r.title,
    rarityPercent: rarityById.get(r.id) ?? 0,
  }));

  // Rarest = lowest rarity_percent among the user's unlocks (correct, not approximated)
  let rarest: { emoji: string; title: string; rarityPercent: number } | undefined = undefined;
  if (userAchievements.length > 0) {
    let lowest = Number.POSITIVE_INFINITY;
    let pick: AchievementRow | null = null;
    for (const a of userAchievements) {
      const p = rarityById.get(a.id) ?? 100;
      if (p < lowest) {
        lowest = p;
        pick = a;
      }
    }
    if (pick) {
      rarest = {
        emoji: pick.emoji,
        title: pick.title,
        rarityPercent: rarityById.get(pick.id) ?? 0,
      };
    }
  }

  return new ImageResponse(
    (
      <OgCardTop5
        username={profile.username}
        displayName={profile.display_name}
        avatarUrl={profile.avatar_url ?? undefined}
        totalUnlocks={totalUnlocks}
        rarest={rarest}
        top5={top5}
      />
    ),
    { width: 1080, height: 1920 },
  );
}
