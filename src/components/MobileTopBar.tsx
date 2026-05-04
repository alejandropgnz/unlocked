import { Link } from "react-router-dom";
import { Wordmark } from "./Wordmark";

/**
 * Mobile-only top bar. Shows just the "UNLOCKED" wordmark on the left.
 * Mirrors the desktop NavBar's brand mark but stripped down (no nav links —
 * those live in BottomNav on mobile).
 */
export function MobileTopBar() {
  return (
    <header
      className="md:hidden fixed top-0 left-0 right-0 z-40 bg-bg/95 backdrop-blur-md border-b border-white/10 h-14 flex items-center px-4"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <Link to="/" aria-label="Unlocked — Inicio">
        <Wordmark size="sm" />
      </Link>
    </header>
  );
}
