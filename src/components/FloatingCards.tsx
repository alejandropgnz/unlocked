import { cn } from "@/lib/cn";

/**
 * Decorative mock achievement cards floating around the landing hero.
 * Hidden on mobile (md breakpoint) — they'd crowd the small viewport
 * and compete with the form CTA. On desktop they sit at the four
 * corners of the hero, tilted, slightly transparent, behind the text
 * (z-0 vs hero z-10) to suggest the catalog "spilling out" from the
 * central pitch.
 *
 * pointer-events-none so they never intercept the email form.
 */

interface MockCardData {
  emoji: string;
  title: string;
  rarityPercent: number;
  category: string;
}

const CARDS: MockCardData[] = [
  { emoji: "🚬", title: "Mi padre se fue a por tabaco y no volvió", rarityPercent: 0.04, category: "familia" },
  { emoji: "🛌", title: "He pasado un finde sin dormir", rarityPercent: 12.4, category: "salud" },
  { emoji: "🤮", title: "Vomité en la cena de empresa", rarityPercent: 8.2, category: "trabajo" },
  { emoji: "💀", title: "Le di like a una foto de mi ex de 2018", rarityPercent: 18.6, category: "relaciones" },
  { emoji: "🍻", title: "He bebido cerveza para desayunar", rarityPercent: 6.1, category: "resaca" },
  { emoji: "📱", title: "He stalkeado el insta de mi ex a las 3am", rarityPercent: 22.7, category: "relaciones" },
];

interface Slot {
  card: MockCardData;
  /** Tailwind classes for position + size + rotation. */
  className: string;
  /** Tier color hex — matches the % chip + outline. */
  tier: "common" | "rare" | "legendary";
}

const TIER_COLORS = {
  common: "#9aa0aa",
  rare: "#A78BFA",
  legendary: "#C9A961",
} as const;

// Tight, sharp drop shadow — reads as a physical card on a table, not a
// glowy halo. Less "fade" feel than the previous tier-colored glows.
const CARD_SHADOW =
  "0 12px 30px -8px rgba(0,0,0,0.55), 0 4px 8px -2px rgba(0,0,0,0.4)";

// Each slot is hand-tuned to keep cards clearly INSIDE the viewport
// (away from the edges) and to leave the center column clear for the
// hero text/form. % positions so layout scales with viewport.
const SLOTS: Slot[] = [
  // Top-left
  { card: CARDS[0], tier: "legendary", className: "absolute top-[10%] left-[8%] w-40 lg:w-44 -rotate-[10deg]" },
  // Top-right
  { card: CARDS[2], tier: "rare", className: "absolute top-[14%] right-[8%] w-44 lg:w-48 rotate-[8deg]" },
  // Mid-left
  { card: CARDS[4], tier: "common", className: "absolute top-[46%] left-[6%] w-32 lg:w-36 -rotate-[6deg]" },
  // Mid-right
  { card: CARDS[5], tier: "common", className: "absolute top-[42%] right-[6%] w-32 lg:w-36 rotate-[12deg]" },
  // Bottom-left
  { card: CARDS[1], tier: "rare", className: "absolute bottom-[12%] left-[10%] w-36 lg:w-40 -rotate-[12deg]" },
  // Bottom-right, biggest tilt
  { card: CARDS[3], tier: "common", className: "absolute bottom-[10%] right-[10%] w-40 lg:w-44 rotate-[14deg]" },
];

export function FloatingCards() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none hidden md:block z-0"
    >
      {SLOTS.map((slot, i) => (
        <MockCard key={i} {...slot} />
      ))}
    </div>
  );
}

function MockCard({ card, className, tier }: Slot) {
  const tierColor = TIER_COLORS[tier];
  return (
    <div
      className={cn(
        // Solid bg + sharp 2px tier border + tight drop shadow → reads as
        // a physical card on a table rather than a translucent overlay.
        "rounded-2xl bg-surface p-3 lg:p-4 border-2",
        className,
      )}
      style={{
        borderColor: tierColor,
        boxShadow: CARD_SHADOW,
      }}
    >
      <div
        className="text-right text-[8px] lg:text-[9px] font-bold tracking-[2px] font-mono"
        style={{ color: tierColor }}
      >
        {card.rarityPercent.toFixed(2)}%
      </div>
      <div className="text-3xl lg:text-4xl text-center my-2 lg:my-3 leading-none">
        {card.emoji}
      </div>
      <div className="text-[10px] lg:text-[11px] font-black text-white text-center leading-tight tracking-tighter line-clamp-2 min-h-[2.4em]">
        {card.title}
      </div>
      <div className="mt-2 lg:mt-3 pt-2 border-t border-grey text-[7px] lg:text-[8px] uppercase tracking-[2px] text-muted text-center">
        {card.category}
      </div>
    </div>
  );
}
