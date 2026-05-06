import { cn } from "@/lib/cn";

interface WordmarkProps {
  /** "sm" 16px text + 24px logo (mobile top bar)
   *  "md" 18px text + 28px logo (NavBar / Footer)
   *  "lg" 28px text + 40px logo (large display) */
  size?: "sm" | "md" | "lg";
  className?: string;
  /** When true, renders only the logo without the "UNLOCKY" text. Useful
   *  for very tight contexts (square avatars, tiny indicators). */
  iconOnly?: boolean;
}

const SIZE_CONFIG = {
  sm: { text: "text-base", logo: "w-6 h-6", gap: "gap-2" },
  md: { text: "text-lg", logo: "w-7 h-7", gap: "gap-2" },
  lg: { text: "text-2xl", logo: "w-10 h-10", gap: "gap-2.5" },
};

/**
 * Brand wordmark. Logo (yellow padlock with X eyes on purple bg) +
 * "UNLOCKY" text. Reusable across NavBar, Footer, MobileTopBar, landing
 * header so any rebrand happens in one place.
 *
 * Logo is loaded from /icon-32.png at small sizes (sm/md) — that's the
 * sweet spot for crisp rendering at 24-28px without overkill payload.
 * At lg we step up to /icon-192.png so the 40px display still has room.
 *
 * `loading="eager"` because the wordmark is above-the-fold on every page.
 * `decoding="async"` keeps it off the critical render path.
 */
export function Wordmark({ size = "md", className, iconOnly = false }: WordmarkProps) {
  const cfg = SIZE_CONFIG[size];
  const src = size === "lg" ? "/icon-192.png" : "/icon-32.png";

  return (
    <span
      className={cn(
        "inline-flex items-center select-none whitespace-nowrap",
        cfg.gap,
        className,
      )}
    >
      <img
        src={src}
        alt={iconOnly ? "Unlocky" : ""}
        width={size === "lg" ? 40 : size === "md" ? 28 : 24}
        height={size === "lg" ? 40 : size === "md" ? 28 : 24}
        className={cn("object-contain shrink-0", cfg.logo)}
        loading="eager"
        decoding="async"
      />
      {!iconOnly && (
        <span className={cn("font-black tracking-tightest leading-none", cfg.text)}>
          UNLOCKY
        </span>
      )}
    </span>
  );
}
