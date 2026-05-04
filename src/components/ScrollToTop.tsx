import { useLayoutEffect, useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll to top on every route change. Synchronous (useLayoutEffect)
 * to avoid the "flash of previous scroll" between page swaps.
 *
 * Also disables the browser's automatic scroll-restoration so back/forward
 * navigation lands at the top too — react-router-dom doesn't manage that
 * for us.
 */
export function ScrollToTop() {
  const { pathname, search } = useLocation();

  // Disable browser scroll restoration once on mount.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    // Reset scroll on document, body and window — covers every layout case.
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, search]);

  return null;
}
