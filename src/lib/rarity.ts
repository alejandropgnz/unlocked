export type Tier = "common" | "rare" | "legendary" | "unique";

export interface RarityContext {
  totalUsers: number;
  unlockCount: number;
}

export function rarityTier(percent: number, ctx?: RarityContext): Tier {
  if (
    ctx &&
    ctx.totalUsers === 1 &&
    ctx.unlockCount === 1
  ) {
    return "unique";
  }
  if (percent > 10) return "common";
  if (percent >= 1) return "rare";
  // percent > 0 but <= 1, or percent === 0 (no one has it yet) → legendary
  return "legendary";
}

const BORDER_CLASSES: Record<Tier, string> = {
  common: "bg-grey",
  rare: "bg-violet",
  legendary: "bg-gradient-to-br from-red via-gold to-violet",
  unique: "bg-gradient-to-br from-gold via-red to-gold",
};

export function tierBorderClass(tier: Tier): string {
  return BORDER_CLASSES[tier];
}

const TEXT_COLORS: Record<Tier, string> = {
  common: "#9aa0aa",
  rare: "#A78BFA",
  legendary: "#C9A961",
  unique: "#FFD700",
};

export function tierTextColor(tier: Tier): string {
  return TEXT_COLORS[tier];
}
