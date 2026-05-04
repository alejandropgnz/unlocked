import { Link, useLocation } from "react-router-dom";
import { Wordmark } from "./Wordmark";

/**
 * Mobile-only top bar. Wordmark on the left, optional centered page title for
 * specific routes (so pages like /descubrir can free the in-page header for
 * the main content).
 */
const PAGE_TITLES: { match: (path: string) => boolean; title: string }[] = [
  { match: (p) => p.startsWith("/descubrir"), title: "Descubrir" },
];

export function MobileTopBar() {
  const path = useLocation().pathname;
  const pageTitle = PAGE_TITLES.find((t) => t.match(path))?.title;

  return (
    <header
      className="md:hidden fixed top-0 left-0 right-0 z-40 bg-bg/95 backdrop-blur-md border-b border-white/10 h-14 flex items-center px-4"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <Link to="/" aria-label="Unlocked — Inicio" className="relative z-10">
        <Wordmark size="sm" />
      </Link>
      {pageTitle && (
        <h1 className="absolute inset-0 flex items-center justify-center pointer-events-none text-base font-black tracking-tighter">
          {pageTitle}
        </h1>
      )}
    </header>
  );
}
