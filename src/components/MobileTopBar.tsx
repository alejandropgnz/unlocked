import { Link } from "react-router-dom";

/**
 * Mobile-only top bar. Shows just the "UNLOCKED" wordmark centered in white.
 * Mirrors the desktop NavBar's brand mark but stripped down (no nav links —
 * those live in BottomNav on mobile).
 */
export function MobileTopBar() {
  return (
    <header
      className="md:hidden fixed top-0 left-0 right-0 z-40 bg-bg/95 backdrop-blur-md border-b border-white/10 h-14 flex items-center justify-center"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <Link
        to="/"
        className="font-black text-base tracking-tightest text-white"
      >
        UNLOCKED
      </Link>
    </header>
  );
}
