import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Wordmark } from "./Wordmark";

/**
 * Mobile-only top bar.
 *
 * Default state: wordmark on the left + (on /) a magnifying-glass icon on the
 * right. Tap the icon → the bar collapses the wordmark and expands an inline
 * search input that fills the bar; tapping X (or pressing Escape) restores
 * the default state.
 *
 * Other routes (e.g. /descubrir) get a centered page title via PAGE_TITLES
 * and no search affordance.
 */
const PAGE_TITLES: { match: (path: string) => boolean; title: string }[] = [
  { match: (p) => p.startsWith("/descubrir"), title: "Descubrir" },
];

// Routes where the search expansion is offered. Currently just the catalog.
function pathHasSearch(path: string): boolean {
  return path === "/";
}

export function MobileTopBar() {
  const path = useLocation().pathname;
  const [params, setParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const showSearch = pathHasSearch(path);
  const pageTitle = PAGE_TITLES.find((t) => t.match(path))?.title;
  const query = params.get("q") ?? "";

  // Keep search open if the URL already has a query (e.g. user landed via
  // a shared link or hot reload). Saves the "expand again" tap.
  useEffect(() => {
    if (showSearch && query.length > 0) setOpen(true);
  }, [showSearch, query]);

  // Auto-focus the input when the user taps the lupa to open the search.
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Collapse search when navigating away from a searchable route.
  useEffect(() => {
    if (!showSearch && open) setOpen(false);
  }, [showSearch, open]);

  const updateQuery = (v: string) => {
    const out = new URLSearchParams(params);
    if (v.trim()) out.set("q", v);
    else out.delete("q");
    setParams(out, { replace: true });
  };

  const closeSearch = () => {
    updateQuery("");
    setOpen(false);
  };

  return (
    <header
      className="md:hidden fixed top-0 left-0 right-0 z-40 bg-bg/95 backdrop-blur-md border-b border-white/10 h-14 flex items-center px-4"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      {open ? (
        // Expanded search — fills the bar end to end.
        <div className="relative w-full flex items-center">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none"
            aria-hidden
          />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => updateQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.preventDefault();
                closeSearch();
              }
            }}
            placeholder="Buscar logros…"
            className="w-full pl-9 pr-10 py-2 bg-surface border border-white/10 rounded-full text-sm focus:border-gold focus:outline-none placeholder:text-muted"
            aria-label="Buscar logros"
          />
          <button
            type="button"
            onClick={closeSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-white"
            aria-label="Cerrar búsqueda"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        // Default — wordmark on the left + (optional) page title + (optional) lupa
        <>
          <Link to="/" aria-label="Unlocky — Inicio" className="relative z-10">
            <Wordmark size="sm" />
          </Link>
          {pageTitle && (
            <h1 className="absolute inset-0 flex items-center justify-center pointer-events-none text-base font-black tracking-tighter">
              {pageTitle}
            </h1>
          )}
          {showSearch && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="ml-auto p-2 text-white hover:text-gold transition"
              aria-label="Buscar logros"
            >
              <Search className="w-5 h-5" />
            </button>
          )}
        </>
      )}
    </header>
  );
}
