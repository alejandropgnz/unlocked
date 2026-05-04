import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import {
  rarityTier,
  tierBorderClass,
  tierTextColor,
  type Tier,
} from "@/lib/rarity";
import { emojiCount } from "@/lib/validators";
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
  sm: { card: "w-[140px]", title: "text-xs", padding: "p-3" },
  md: { card: "w-[200px]", title: "text-sm", padding: "p-4" },
  lg: { card: "w-[230px]", title: "text-base", padding: "p-5" },
} as const;

// Emoji size scales with how many emojis there are so 3 emojis fit on one line
// without wrapping. Counting graphemes via Intl.Segmenter so compound emojis
// (👨‍👩‍👧, 🇪🇸) count as 1.
const EMOJI_SIZE: Record<"sm" | "md" | "lg", Record<1 | 2 | 3, string>> = {
  sm: { 1: "text-3xl", 2: "text-2xl", 3: "text-xl" },
  md: { 1: "text-5xl", 2: "text-4xl", 3: "text-3xl" },
  lg: { 1: "text-6xl", 2: "text-5xl", 3: "text-4xl" },
};

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

  const count = emojiCount(emoji);
  const safeCount = (count >= 1 && count <= 3 ? count : 1) as 1 | 2 | 3;
  const emojiClass = EMOJI_SIZE[size][safeCount];

  return (
    <Link
      to={href ?? `/l/${slug}`}
      className={cn(
        sizing.card,
        "relative block rounded-[18px] p-[2px] transition-transform hover:scale-[1.03]",
        tierBorderClass(tier),
      )}
    >
      <div
        className={cn(
          "bg-surface rounded-[16px] h-full flex flex-col relative",
          sizing.padding,
        )}
      >
        <div
          className="flex justify-end items-center text-[9px] font-bold tracking-[2.5px]"
          style={{ color: tierColor }}
        >
          <span className="font-mono">{rarityPercent.toFixed(2)}%</span>
        </div>
        <div className={cn("text-center my-3 whitespace-nowrap leading-none", emojiClass)}>
          {emoji}
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

        {/* Dark overlay over the inner content when owned — emoji and text
            stay readable but the whole card visually recedes vs the unowned
            ones, so unowned achievements are the natural focus of attention. */}
        {isUnlocked && (
          <div
            className="absolute inset-0 rounded-[16px] bg-black/45 pointer-events-none"
            aria-hidden
          />
        )}
      </div>

      {/* Owned badge — circular gold stamp, top-right corner overlapping border */}
      {isUnlocked && (
        <div
          className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gold flex items-center justify-center shadow-lg ring-2 ring-bg z-10"
          aria-label="Ya lo tienes"
        >
          <Check className="w-4 h-4 text-bg" strokeWidth={3.5} />
        </div>
      )}
    </Link>
  );
}
