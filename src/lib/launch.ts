// Launch gate config. The product is hidden behind /proximamente until
// LAUNCH_DATE arrives (or VITE_LAUNCHED=true forces it on early). A secret
// preview token lets the team enter the real app pre-launch.

// Friday May 22, 2026 at 18:00 CET (CEST in May = UTC+02:00). Right before
// the weekend so day-1 visitors share Saturday/Sunday peak hours.
export const LAUNCH_DATE = new Date("2026-05-22T18:00:00+02:00");

const PREVIEW_TOKEN = "unlocked2026";
const STORAGE_KEY = "unlocked.preview";

/**
 * Has the product launched? Either an explicit env-var override, or the
 * LAUNCH_DATE has passed. Pure function — no React, no state.
 */
export function isLaunched(): boolean {
  if (import.meta.env.VITE_LAUNCHED === "true") return true;
  return Date.now() >= LAUNCH_DATE.getTime();
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
