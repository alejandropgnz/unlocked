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

// w-full + max-w lets cards fill narrow grid cells on mobile (where 2 cols ×
// 200px + gap + page padding overflows a 375px viewport) while still capping
// width on larger viewports so cards don't stretch into giant rectangles.
// w-full + max-w lets cards fill narrow grid cells on mobile (where 2 cols ×
// 200px + gap + page padding overflows a 375px viewport) while still capping
// width on larger viewports so cards don't stretch into giant rectangles.
// emojiBox is a FIXED-HEIGHT slot for the emoji line so cards line up
// horizontally regardless of how many emojis the achievement has — without
// it, 1-emoji cards have a taller emoji row than 3-emoji ones, and the title
// row drifts up/down across the grid.
const SIZES = {
  sm: { card: "w-full max-w-[140px]", title: "text-xs", padding: "p-3", emojiBox: "h-10" },
  md: { card: "w-full max-w-[200px]", title: "text-sm", padding: "p-4", emojiBox: "h-14" },
  lg: { card: "w-full max-w-[230px]", title: "text-base", padding: "p-5", emojiBox: "h-16" },
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
        {/* Top row — owned check on the left (when unlocked), rarity % on
            the right. Both sit inside the inner padded box so they line up
            with the bottom row (category | count) and respect the card's
            content padding. */}
        <div
          className="flex justify-between items-center text-[9px] font-bold tracking-[2.5px]"
          style={{ color: tierColor }}
        >
          <span aria-hidden className="text-gold/70 inline-flex">
            {isUnlocked ? (
              <Check className="w-3.5 h-3.5" strokeWidth={3} aria-label="Ya lo tienes" />
            ) : null}
          </span>
          <span className="font-mono">{rarityPercent.toFixed(2)}%</span>
        </div>
        <div
          className={cn(
            "flex items-center justify-center my-3 whitespace-nowrap leading-none",
            sizing.emojiBox,
          )}
        >
          <span className={emojiClass}>{emoji}</span>
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
    </Link>
  );
}
