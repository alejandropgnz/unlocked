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
 * Brand wordmark "UNLOCKED". Inter Black, tight tracking. Reusable across
 * NavBar, Footer, MobileTopBar so brand changes happen in one place.
 */
export function Wordmark({ size = "md", className }: WordmarkProps) {
  return (
    <span
      className={cn(
        "font-black tracking-tightest leading-none whitespace-nowrap select-none",
        SIZES[size],
        className,
      )}
    >
      UNLOCKED
    </span>
  );
}
