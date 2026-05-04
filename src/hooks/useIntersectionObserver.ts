import { useEffect, useRef } from "react";

/**
 * Fires `onIntersect` when the returned ref is scrolled into view.
 * Used as a "load more" sentinel at the bottom of paginated lists.
 */
export function useIntersectionObserver(
  onIntersect: () => void,
  options: IntersectionObserverInit = { rootMargin: "200px" },
) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onIntersect();
      }
    }, options);
    observer.observe(node);
    return () => observer.disconnect();
    // We intentionally don't depend on `onIntersect` to avoid re-creating the
    // observer on every render — the consumer is expected to keep the callback
    // stable (or reference an updated ref via useRef in the callback).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
