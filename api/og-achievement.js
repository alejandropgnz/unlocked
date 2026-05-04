// Generic achievement OG card (no user context).
// Usage: /api/og-achievement?slug=<achievement_slug>

import { ImageResponse } from "@vercel/og";
import { createElement as h } from "react";
import { supabaseFetchOne } from "./_lib/supabase-fetch.js";
import { TIER_COLORS, TIER_BORDER_GRADIENT, rarityTier, tierLabel, getInterFont } from "./_lib/og-helpers.js";

export const config = { runtime: "edge" };

const SLUG_RE = /^[a-z0-9-]{1,80}$/i;

export default async function handler(req) {
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug");

  if (!slug || !SLUG_RE.test(slug)) {
    return new Response("Bad slug", { status: 400 });
  }

  try {
    const achievement = await supabaseFetchOne(
      `achievements?slug=eq.${encodeURIComponent(slug)}&status=eq.approved&select=id,title,emoji,category,unlock_count`,
    );
    if (!achievement) return new Response("Not found", { status: 404 });

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
        username: "",
      }),
      {
        width: 1080,
        height: 1920,
        fonts: [{ name: "Inter", data: fontData, weight: 900, style: "normal" }],
      },
    );
  } catch (err) {
    console.error("[og-achievement] error:", err);
    return new Response("Image generation failed", { status: 500 });
  }
}

export function buildIndividualLayout({ emoji, title, rarityPercent, unlockCount, category, username }) {
  const tier = rarityTier(rarityPercent);
  const tierColor = TIER_COLORS[tier];
  const tierBorder = TIER_BORDER_GRADIENT[tier];

  return h(
    "div",
    {
      style: {
        width: "1080px",
        height: "1920px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0e0e14",
        backgroundImage:
          "radial-gradient(circle at 30% 20%, rgba(167,139,250,0.15), transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,107,107,0.1), transparent 50%)",
        padding: "80px 60px",
        fontFamily: "Inter",
      },
    },
    // Header
    h(
      "div",
      { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } },
      h("div", { style: { fontSize: 32, fontWeight: 900, letterSpacing: -1, color: "#fff" } }, "UNLOCKED"),
      h(
        "div",
        { style: { fontSize: 18, letterSpacing: 4, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" } },
        "your weird life · achieved",
      ),
    ),
    // Card body wrapper
    h(
      "div",
      {
        style: {
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 40,
        },
      },
      h(
        "div",
        {
          style: {
            width: 800,
            padding: 8,
            borderRadius: 48,
            display: "flex",
            backgroundImage: tierBorder,
          },
        },
        h(
          "div",
          {
            style: {
              flex: 1,
              padding: "60px 50px",
              borderRadius: 40,
              backgroundColor: "#16161f",
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
            },
          },
          h(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 4,
                color: tierColor,
              },
            },
            h("div", null, "★ " + tierLabel(tier)),
            h("div", null, rarityPercent.toFixed(2) + "%"),
          ),
          h("div", { style: { fontSize: 220, textAlign: "center", margin: "60px 0" } }, emoji),
          h(
            "div",
            {
              style: {
                fontSize: 60,
                fontWeight: 900,
                letterSpacing: -2,
                color: "#fff",
                textAlign: "center",
                lineHeight: 1.05,
              },
            },
            title,
          ),
          h(
            "div",
            {
              style: {
                marginTop: 48,
                paddingTop: 32,
                borderTop: "2px solid rgba(255,255,255,0.08)",
                display: "flex",
                justifyContent: "space-between",
                fontSize: 22,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: 2,
                textTransform: "uppercase",
              },
            },
            h("div", null, category),
            h("div", null, unlockCount.toLocaleString("es-ES") + " unlocked"),
          ),
        ),
      ),
    ),
    // Footer banner
    h(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.05)",
          borderRadius: 24,
          padding: "24px 40px",
          fontSize: 28,
          fontWeight: 700,
          color: "#fff",
        },
      },
      h(
        "div",
        null,
        "SOLO EL ",
        h("span", { style: { color: tierColor } }, rarityPercent.toFixed(2) + "%"),
        " LO TIENE",
      ),
      h(
        "div",
        { style: { fontSize: 22, color: "rgba(255,255,255,0.7)" } },
        username ? "@" + username + " · unlocked.app" : "unlocked.app",
      ),
    ),
  );
}
