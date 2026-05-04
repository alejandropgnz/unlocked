import { cn } from "@/lib/cn";

interface WordmarkProps {
  /** "sm" 16px (mobile), "md" 18px (NavBar), "lg" 28px+ (footer or large display) */
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZES = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-2xl",
};

/**
 * Brand wordmark "UNLOC<reversed-K>ED". The K is mirrored on the X axis as
 * the brand quirk (like Spotify's reversed letters or DOOR with the O upside
 * down). Done with CSS `transform: scaleX(-1)` so it scales with text size
 * and inherits the same Inter Black weight.
 */
export function Wordmark({ size = "md", className }: WordmarkProps) {
  return (
    <span
      className={cn(
        "font-black tracking-tightest leading-none whitespace-nowrap select-none",
        SIZES[size],
        className,
      )}
      aria-label="UNLOCKED"
    >
      <span aria-hidden>UNLOC</span>
      <span
        aria-hidden
        className="inline-block"
        style={{ transform: "scaleX(-1)" }}
      >
        K
      </span>
      <span aria-hidden>ED</span>
    </span>
  );
}
