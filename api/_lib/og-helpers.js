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

export async function getInterFont() {
  if (_interFontCache) return _interFontCache;
  // Try rsms.me first (more reliable in Edge), fall back to GitHub raw
  const urls = [
    "https://rsms.me/inter/font-files/Inter-Black.woff2",
    "https://github.com/rsms/inter/raw/master/docs/font-files/Inter-Black.otf",
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
