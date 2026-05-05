import { useEffect, useRef } from "react";

/**
 * Fires `onIntersect` when the returned ref is scrolled into view.
 * Used as a "load more" sentinel at the bottom of paginated lists.
 *
 * The callback is stored in a ref and updated on every render, so it always
 * sees the latest closure (hasNextPage, isFetchingNextPage, etc.) without
 * having to recreate the IntersectionObserver. This matters because creating
 * a new observer on every render can miss intersections that happened during
 * the brief gap between disconnect and reconnect.
 */
export function useIntersectionObserver(
  onIntersect: () => void,
  options: IntersectionObserverInit = { rootMargin: "1200px" },
) {
  const ref = useRef<HTMLDivElement | null>(null);
  const callbackRef = useRef(onIntersect);

  // Keep the callback ref pointing at the latest function on every render.
  useEffect(() => {
    callbackRef.current = onIntersect;
  });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) callbackRef.current();
      }
    }, options);
    observer.observe(node);
    return () => observer.disconnect();
    // Options is intentionally not a dep — the consumer's default object
    // changes identity on every render but the values are stable. If a caller
    // really needs dynamic options they can memoize them.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
