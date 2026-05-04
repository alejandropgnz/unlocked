// Profile Top-5 OG card.
// Usage: /api/og-profile?username=<username>

import { ImageResponse } from "@vercel/og";
import { createElement as h } from "react";
import { supabaseFetchOne, supabaseFetchMany } from "./_lib/supabase-fetch.js";
import { TIER_COLORS, rarityTier, getInterFont } from "./_lib/og-helpers.js";

export const config = { runtime: "edge" };

const USERNAME_RE = /^[a-z0-9_]{3,20}$/i;

export default async function handler(req) {
  const url = new URL(req.url);
  const username = url.searchParams.get("username");

  if (!username || !USERNAME_RE.test(username)) {
    return new Response("Bad username", { status: 400 });
  }

  try {
    const profile = await supabaseFetchOne(
      `profiles?username=eq.${encodeURIComponent(username.toLowerCase())}&select=id,username,display_name,avatar_url,top5`,
    );
    if (!profile) return new Response("Profile not found", { status: 404 });

    // Fetch the user's full collection (we need both top5 and rarest)
    const userUnlocks = await supabaseFetchMany(
      `unlocks?user_id=eq.${encodeURIComponent(profile.id)}&select=achievement_id,achievements(id,emoji,title,unlock_count)`,
    );
    const totalUnlocks = userUnlocks.length;

    // Top-5 (in order, may be incomplete)
    const top5Ids = (profile.top5 || []).filter(Boolean);
    let top5Details = [];
    if (top5Ids.length > 0) {
      const ids = top5Ids.map((id) => `"${id}"`).join(",");
      top5Details = await supabaseFetchMany(
        `achievements?id=in.(${ids})&select=id,emoji,title,unlock_count`,
      );
    }

    // Build a rarity map for top5 IDs + all user achievement IDs
    const allIds = Array.from(
      new Set([
        ...top5Ids,
        ...userUnlocks.map((u) => u.achievement_id),
      ]),
    );
    let rarityById = new Map();
    if (allIds.length > 0) {
      const ids = allIds.map((id) => `"${id}"`).join(",");
      const rows = await supabaseFetchMany(
        `achievement_rarity?id=in.(${ids})&select=id,rarity_percent`,
      );
      rarityById = new Map(rows.map((r) => [r.id, Number(r.rarity_percent ?? 0)]));
    }

    // Order top5 according to profile.top5 array
    const top5Map = new Map(top5Details.map((r) => [r.id, r]));
    const top5 = top5Ids
      .map((id) => top5Map.get(id))
      .filter(Boolean)
      .map((r) => ({
        emoji: r.emoji,
        title: r.title,
        rarityPercent: rarityById.get(r.id) ?? 0,
      }));

    // Find rarest from user's unlocks (lowest rarity_percent)
    let rarest = undefined;
    if (userUnlocks.length > 0) {
      let lowest = Infinity;
      let pick = null;
      for (const u of userUnlocks) {
        const a = u.achievements;
        if (!a) continue;
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

    const fontData = await getInterFont();

    return new ImageResponse(
      buildTop5Layout({
        username: profile.username,
        displayName: profile.display_name,
        avatarUrl: profile.avatar_url,
        totalUnlocks,
        rarest,
        top5,
      }),
      {
        width: 1080,
        height: 1920,
        fonts: [{ name: "Inter", data: fontData, weight: 900, style: "normal" }],
      },
    );
  } catch (err) {
    console.error("[og-profile] error:", err);
    return new Response("Image generation failed", { status: 500 });
  }
}

function buildTop5Layout({ username, displayName, avatarUrl, totalUnlocks, rarest, top5 }) {
  const headerChildren = [];
  if (avatarUrl) {
    headerChildren.push(
      h("img", {
        src: avatarUrl,
        width: 140,
        height: 140,
        style: { borderRadius: 70, border: "4px solid #C9A961" },
        alt: "",
      }),
    );
  }
  headerChildren.push(
    h(
      "div",
      {
        style: {
          fontSize: 56,
          fontWeight: 900,
          color: "#fff",
          marginTop: 24,
          letterSpacing: -2,
        },
      },
      displayName,
    ),
  );
  headerChildren.push(
    h(
      "div",
      { style: { fontSize: 26, color: "rgba(255,255,255,0.5)", marginTop: 8 } },
      "@" + username,
    ),
  );

  const statsChildren = [
    h(
      "div",
      { style: { display: "flex", flexDirection: "column", alignItems: "center" } },
      h(
        "div",
        { style: { fontSize: 44, fontWeight: 900, color: "#C9A961" } },
        String(totalUnlocks),
      ),
      h(
        "div",
        {
          style: {
            color: "rgba(255,255,255,0.5)",
            fontSize: 18,
            letterSpacing: 2,
            textTransform: "uppercase",
          },
        },
        "logros",
      ),
    ),
  ];
  if (rarest) {
    statsChildren.push(
      h(
        "div",
        { style: { display: "flex", flexDirection: "column", alignItems: "center" } },
        h(
          "div",
          { style: { fontSize: 44, fontWeight: 900, color: "#A78BFA" } },
          rarest.rarityPercent.toFixed(2) + "%",
        ),
        h(
          "div",
          {
            style: {
              color: "rgba(255,255,255,0.5)",
              fontSize: 18,
              letterSpacing: 2,
              textTransform: "uppercase",
            },
          },
          "más raro",
        ),
      ),
    );
  }

  // Build individual card elements (not using gridColumn span — handled by flex rows)
  function buildCard(it, key) {
    const tier = rarityTier(it.rarityPercent);
    return h(
      "div",
      {
        key,
        style: {
          flex: 1,
          backgroundColor: "#16161f",
          borderRadius: 24,
          padding: 30,
          display: "flex",
          flexDirection: "column",
          border: "2px solid " + TIER_COLORS[tier] + "33",
        },
      },
      h("div", { style: { fontSize: 90, textAlign: "center" } }, it.emoji),
      h(
        "div",
        {
          style: {
            fontSize: 24,
            fontWeight: 900,
            color: "#fff",
            textAlign: "center",
            lineHeight: 1.05,
            marginTop: 16,
            letterSpacing: -0.5,
          },
        },
        it.title,
      ),
      h(
        "div",
        {
          style: {
            marginTop: 16,
            textAlign: "center",
            fontSize: 16,
            color: TIER_COLORS[tier],
            letterSpacing: 2,
            textTransform: "uppercase",
          },
        },
        it.rarityPercent.toFixed(2) + "% lo tienen",
      ),
    );
  }

  // 5th card is full-width horizontal layout
  function buildCard5(it) {
    const tier = rarityTier(it.rarityPercent);
    return h(
      "div",
      {
        style: {
          backgroundColor: "#16161f",
          borderRadius: 24,
          padding: 30,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          border: "2px solid " + TIER_COLORS[tier] + "33",
        },
      },
      h("div", { style: { fontSize: 80 } }, it.emoji),
      h(
        "div",
        { style: { marginLeft: 30, flex: 1, display: "flex", flexDirection: "column" } },
        h(
          "div",
          { style: { fontSize: 26, fontWeight: 900, color: "#fff", letterSpacing: -0.5 } },
          it.title,
        ),
        h(
          "div",
          {
            style: {
              marginTop: 8,
              fontSize: 16,
              color: TIER_COLORS[tier],
              letterSpacing: 2,
              textTransform: "uppercase",
            },
          },
          it.rarityPercent.toFixed(2) + "% lo tienen",
        ),
      ),
    );
  }

  return h(
    "div",
    {
      style: {
        width: 1080,
        height: 1920,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0e0e14",
        backgroundImage:
          "radial-gradient(circle at 50% 0%, rgba(201,169,97,0.12), transparent 50%)",
        padding: "60px 50px",
        fontFamily: "Inter",
      },
    },
    // Header
    h(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 40,
        },
      },
      ...headerChildren,
    ),
    // Stats row
    h(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "center",
          gap: 80,
          marginBottom: 40,
          fontSize: 22,
          color: "#fff",
        },
      },
      ...statsChildren,
    ),
    // Cards container — flexbox rows (Satori doesn't support grid)
    h(
      "div",
      {
        style: {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        },
      },
      // Row 1: cards 0 + 1
      top5.length > 0
        ? h(
            "div",
            { style: { display: "flex", gap: 20 } },
            buildCard(top5[0], "c0"),
            top5[1] ? buildCard(top5[1], "c1") : null,
          )
        : null,
      // Row 2: cards 2 + 3
      top5.length > 2
        ? h(
            "div",
            { style: { display: "flex", gap: 20 } },
            buildCard(top5[2], "c2"),
            top5[3] ? buildCard(top5[3], "c3") : null,
          )
        : null,
      // 5th card full-width
      top5[4] ? buildCard5(top5[4]) : null,
    ),
    // Footer
    h(
      "div",
      {
        style: {
          marginTop: 30,
          textAlign: "center",
          color: "rgba(255,255,255,0.5)",
          fontSize: 22,
          letterSpacing: 2,
        },
      },
      "hazte tu pasaporte en ",
      h("span", { style: { color: "#fff" } }, "unlocked.app"),
    ),
  );
}
