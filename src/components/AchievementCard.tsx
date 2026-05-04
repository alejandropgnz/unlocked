import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import {
  rarityTier,
  tierBorderClass,
  tierTextColor,
  type Tier,
} from "@/lib/rarity";
import { cn } from "@/lib/cn";

export interface AchievementCardProps {
  slug: string;
  title: string;
  emoji: string;
  rarityPercent: number;
  unlockCount: number;
  category: string;
  size?: "sm" | "md" | "lg";
  href?: string;
  isUnlocked?: boolean;
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
  href,
  isUnlocked = false,
}: AchievementCardProps) {
  const tier: Tier = rarityTier(rarityPercent);
  const sizing = SIZES[size];
  const tierColor = tierTextColor(tier);

  return (
    <Link
      to={href ?? `/l/${slug}`}
      className={cn(
        sizing.card,
        "relative block rounded-[18px] p-[2px] transition-transform hover:scale-[1.03]",
        tierBorderClass(tier),
        isUnlocked && "shadow-[0_0_0_2px_rgba(201,169,97,0.4),0_0_24px_rgba(201,169,97,0.25)]",
      )}
    >
      <div className={cn("bg-surface rounded-[16px] h-full flex flex-col", sizing.padding)}>
        <div
          className="flex justify-end items-center text-[9px] font-bold tracking-[2.5px]"
          style={{ color: tierColor }}
        >
          <span className="font-mono">{rarityPercent.toFixed(2)}%</span>
        </div>
        <div className="text-center my-3 relative">
          <div className={sizing.emoji}>{emoji}</div>
        </div>
        <h3
          className={cn(
            "font-black text-white leading-tight tracking-tighter text-center flex-1",
            sizing.title,
          )}
        >
          {title}
        </h3>
        <div className="mt-3 pt-3 border-t border-white/10 flex justify-between text-[9px] text-muted tracking-wider uppercase">
          <span>{category}</span>
          <span className="font-mono">{unlockCount.toLocaleString("es-ES")}</span>
        </div>
      </div>

      {/* Owned badge — circular gold stamp, top-right corner overlapping border */}
      {isUnlocked && (
        <div
          className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gold flex items-center justify-center shadow-lg ring-2 ring-bg"
          aria-label="Ya lo tienes"
        >
          <Check className="w-4 h-4 text-bg" strokeWidth={3.5} />
        </div>
      )}
    </Link>
  );
}
