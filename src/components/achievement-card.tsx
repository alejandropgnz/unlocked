import Link from "next/link";
import {
  rarityTier,
  tierBorderClass,
  tierLabel,
  tierTextColor,
  type Tier,
} from "@/lib/rarity";

export interface AchievementCardProps {
  slug: string;
  title: string;
  emoji: string;
  rarityPercent: number;
  unlockCount: number;
  category: string;
  size?: "sm" | "md" | "lg";
}

const SIZES = {
  sm: { card: "w-[140px]", emoji: "text-3xl", title: "text-xs", padding: "p-3" },
  md: { card: "w-[200px]", emoji: "text-5xl", title: "text-sm", padding: "p-4" },
  lg: { card: "w-[230px]", emoji: "text-6xl", title: "text-base", padding: "p-5" },
} as const;

export function AchievementCard({
  slug,
  title,
  emoji,
  rarityPercent,
  unlockCount,
  category,
  size = "md",
}: AchievementCardProps) {
  const tier: Tier = rarityTier(rarityPercent);
  const sizing = SIZES[size];
  const tierColor = tierTextColor(tier);

  return (
    <Link
      href={`/l/${slug}`}
      className={`${sizing.card} block rounded-[18px] p-[2px] transition-transform hover:scale-[1.03] ${tierBorderClass(tier)}`}
    >
      <div className={`bg-surface rounded-[16px] ${sizing.padding} h-full flex flex-col`}>
        <div
          className="flex justify-between items-center text-[9px] font-bold tracking-[2.5px]"
          style={{ color: tierColor }}
        >
          <span>★ {tierLabel(tier)}</span>
          <span className="font-mono">{rarityPercent.toFixed(2)}%</span>
        </div>
        <div className={`${sizing.emoji} text-center my-3`}>{emoji}</div>
        <h3
          className={`font-black text-white ${sizing.title} leading-tight tracking-tighter text-center flex-1`}
        >
          {title}
        </h3>
        <div className="mt-3 pt-3 border-t border-white/10 flex justify-between text-[9px] text-muted tracking-wider uppercase">
          <span>{category}</span>
          <span className="font-mono">{unlockCount.toLocaleString("es-ES")}</span>
        </div>
      </div>
    </Link>
  );
}
