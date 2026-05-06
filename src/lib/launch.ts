// Launch gate config. The product is hidden behind /proximamente until
// LAUNCH_DATE arrives (or VITE_LAUNCHED=true forces it on early). A secret
// preview token lets the team enter the real app pre-launch.

// Friday May 29, 2026 at 18:00 CET (CEST in May = UTC+02:00). Right before
// the weekend so day-1 visitors share Saturday/Sunday peak hours.
export const LAUNCH_DATE = new Date("2026-05-29T18:00:00+02:00");

const PREVIEW_TOKEN = "unlocky2026";
const STORAGE_KEY = "unlocky.preview";

/**
 * Has the product launched? Server-controlled via the VITE_LAUNCHED env
 * var only — NOT auto-flipped by the client clock.
 *
 * Why no Date.now() check: the client clock is user-tampable. A motivated
 * visitor could push their system date past LAUNCH_DATE and bypass the
 * gate. Trusting only the build-time env var means the team controls
 * cutover by toggling Vercel and redeploying (≈10s) — no surprise leaks.
 *
 * LAUNCH_DATE remains exported for display purposes only (countdown UI).
 */
export function isLaunched(): boolean {
  return import.meta.env.VITE_LAUNCHED === "true";
}

/**
 * Is the current visitor in preview mode (i.e. allowed to see the gated
 * app pre-launch)? Detected via `?preview=<token>` in the URL on first
 * visit, then remembered in sessionStorage so navigation doesn't lose it.
 *
 * Strips the param from the URL after consuming so it doesn't leak into
 * shares.
 */
export function isPreview(): boolean {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  if (params.get("preview") === PREVIEW_TOKEN) {
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      /* sessionStorage may be unavailable in Safari private mode; ignore. */
    }
    const url = new URL(window.location.href);
    url.searchParams.delete("preview");
    window.history.replaceState({}, "", url.toString());
    return true;
  }
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

/** True when we should show the landing instead of the real app. */
export function showLanding(): boolean {
  return !isLaunched() && !isPreview();
}
