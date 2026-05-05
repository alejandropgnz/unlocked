export const TIER_COLORS = {
  common: "#9aa0aa",
  rare: "#A78BFA",
  legendary: "#C9A961",
  unique: "#FFD700",
};

export const TIER_BORDER_GRADIENT = {
  common: "linear-gradient(135deg,#3a3a4a,#3a3a4a)",
  rare: "linear-gradient(135deg,#A78BFA,#7C3AED)",
  legendary: "linear-gradient(135deg,#FF6B6B,#C9A961,#A78BFA)",
  unique: "linear-gradient(135deg,#FFD700,#FF6B6B,#FFD700)",
};

export function rarityTier(percent, ctx) {
  if (ctx && ctx.totalUsers === 1 && ctx.unlockCount === 1) return "unique";
  if (percent > 10) return "common";
  if (percent >= 1) return "rare";
  if (percent > 0) return "legendary";
  return "common";
}

export function tierLabel(tier) {
  return ({ common: "COMÚN", rare: "RARO", legendary: "LEGENDARY", unique: "ÚNICO" })[tier];
}

let _interFontCache = null;

/**
 * Fetch the Inter Black weight font for use with @vercel/og (Satori).
 *
 * IMPORTANT: Satori does NOT support WOFF2. It accepts TTF, OTF, or WOFF.
 * If we hand it a WOFF2 buffer it silently produces a 0-byte PNG, which
 * the client then treats as a load failure. The previous version pointed
 * at rsms.me's `.woff2` URL — that's why share cards stopped rendering.
 *
 * fontsource ships @fontsource/inter with WOFF subsets that Satori can
 * decode. jsdelivr is the primary CDN; unpkg is the fallback.
 */
export async function getInterFont() {
  if (_interFontCache) return _interFontCache;
  const urls = [
    "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.18/files/inter-latin-900-normal.woff",
    "https://unpkg.com/@fontsource/inter@5.0.18/files/inter-latin-900-normal.woff",
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        _interFontCache = await res.arrayBuffer();
        return _interFontCache;
      }
    } catch (_) {
      // try next
    }
  }
  throw new Error("Failed to load Inter Black font from all sources");
}
