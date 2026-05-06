import { cn } from "@/lib/cn";

interface WordmarkProps {
  /** "sm" 16px text + 32px logo (mobile top bar)
   *  "md" 18px text + 40px logo (NavBar / Footer / landing header)
   *  "lg" 24px text + 56px logo (hero / large display) */
  size?: "sm" | "md" | "lg";
  className?: string;
  /** When true, renders only the logo without the "UNLOCKY" text. Useful
   *  for very tight contexts (square avatars, tiny indicators). */
  iconOnly?: boolean;
}

// Logo:text ratio ~2x — the illustrated padlock has interior detail
// (X eyes, mouth, body) that disappears below ~28px. We size the logo
// generously so it's recognizable at a glance.
const SIZE_CONFIG = {
  sm: { text: "text-base", logo: "w-8 h-8", gap: "gap-2", px: 32 },
  md: { text: "text-lg", logo: "w-10 h-10", gap: "gap-2.5", px: 40 },
  lg: { text: "text-2xl", logo: "w-14 h-14", gap: "gap-3", px: 56 },
};

/**
 * Brand wordmark. Logo (yellow padlock with X eyes on purple bg) +
 * "UNLOCKY" text. Reusable across NavBar, Footer, MobileTopBar, landing
 * header so any rebrand happens in one place.
 *
 * Always loads from /icon-192.png — browsers downscale to display size
 * with better antialiasing than they upscale a 32px file. Single source
 * also means a single HTTP cache entry for all wordmark instances on a
 * page (free perf win).
 *
 * `loading="eager"` because the wordmark is above-the-fold on every page.
 * `decoding="async"` keeps it off the critical render path.
 */
export function Wordmark({ size = "md", className, iconOnly = false }: WordmarkProps) {
  const cfg = SIZE_CONFIG[size];

  return (
    <span
      className={cn(
        "inline-flex items-center select-none whitespace-nowrap",
        cfg.gap,
        className,
      )}
    >
      <img
        src="/icon-192.png"
        alt={iconOnly ? "Unlocky" : ""}
        width={cfg.px}
        height={cfg.px}
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
