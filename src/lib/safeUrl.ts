/**
 * Returns a safe href value: only allows http: and https: protocols.
 * Returns "#" for any other scheme (javascript:, data:, etc.) — XSS hardening.
 */
export function safeHref(url: string | null | undefined): string {
  if (!url) return "#";
  try {
    const proto = new URL(url).protocol;
    return proto === "http:" || proto === "https:" ? url : "#";
  } catch {
    return "#";
  }
}
