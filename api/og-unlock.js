// Personal unlock OG card for /u/:username/:slug
// Usage: /api/og-unlock?username=<username>&slug=<slug>

import { ImageResponse } from "@vercel/og";
import { supabaseFetchOne } from "./_lib/supabase-fetch.js";
import { getInterFont } from "./_lib/og-helpers.js";
import { buildIndividualLayout } from "./og-achievement.js";

export const config = { runtime: "edge" };

const SLUG_RE = /^[a-z0-9-]{1,80}$/i;
const USERNAME_RE = /^[a-z0-9_]{3,20}$/i;

export default async function handler(req) {
  const url = new URL(req.url);
  const username = url.searchParams.get("username");
  const slug = url.searchParams.get("slug");

  if (!username || !USERNAME_RE.test(username)) return new Response("Bad username", { status: 400 });
  if (!slug || !SLUG_RE.test(slug)) return new Response("Bad slug", { status: 400 });

  try {
    const profile = await supabaseFetchOne(
      `profiles?username=eq.${encodeURIComponent(username.toLowerCase())}&select=id,username`,
    );
    if (!profile) return new Response("Profile not found", { status: 404 });

    const achievement = await supabaseFetchOne(
      `achievements?slug=eq.${encodeURIComponent(slug)}&status=eq.approved&select=id,title,emoji,category,unlock_count`,
    );
    if (!achievement) return new Response("Achievement not found", { status: 404 });

    // Verify the unlock exists (this user actually has this achievement)
    const unlock = await supabaseFetchOne(
      `unlocks?user_id=eq.${encodeURIComponent(profile.id)}&achievement_id=eq.${encodeURIComponent(achievement.id)}&select=id`,
    );
    if (!unlock) return new Response("Unlock not found", { status: 404 });

    const rarity = await supabaseFetchOne(
      `achievement_rarity?id=eq.${encodeURIComponent(achievement.id)}&select=rarity_percent`,
    );
    const rarityPercent = Number(rarity?.rarity_percent ?? 0);

    const fontData = await getInterFont();

    return new ImageResponse(
      buildIndividualLayout({
        emoji: achievement.emoji,
        title: achievement.title,
        rarityPercent,
        unlockCount: achievement.unlock_count,
        category: achievement.category,
        username: profile.username,
      }),
      {
        width: 1080,
        height: 1920,
        fonts: [{ name: "Inter", data: fontData, weight: 900, style: "normal" }],
      },
    );
  } catch (err) {
    console.error("[og-unlock] error:", err);
    return new Response("Image generation failed", { status: 500 });
  }
}
