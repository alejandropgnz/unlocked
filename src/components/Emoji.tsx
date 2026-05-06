import { cn } from "@/lib/cn";

interface EmojiProps {
  /** The emoji char(s) — supports 1-3 emojis or compound graphemes
   *  like 👨‍👩‍👧 (family), 🇪🇸 (flag). */
  children: string;
  /** Optional Tailwind classes applied to the wrapping <span>.
   *  Use to control gap, alignment, etc. The emoji itself sizes to 1em
   *  so it inherits font-size from the parent text context. */
  className?: string;
}

/**
 * jsDelivr URL builder for Microsoft Fluent UI Emoji "Modern" 3D set.
 *
 * The static assets package @lobehub/fluent-emoji-modern@1.0.0 organizes
 * SVGs by codepoint in /assets/{codepoint(s)}.svg. jsDelivr serves any
 * npm package on demand — the 143 MB package never gets bundled into
 * our app, only the individual SVGs we actually request (each <10 KB)
 * stream in via the CDN edge.
 *
 * File naming:
 *  - Single-codepoint emojis: lowercase hex, padded to min 4 chars
 *    e.g. ©  → "00a9-fe0f.svg"
 *         🚬 → "1f6ac.svg"
 *  - Multi-codepoint (ZWJ sequences, regional indicators, keycaps):
 *    codepoints joined by "-"
 *    e.g. 👨‍👩‍👧 → "1f468-200d-1f469-200d-1f467.svg"
 *         🇪🇸    → "1f1ea-1f1f8.svg"
 */
function emojiToCodepointSlug(grapheme: string): string {
  return Array.from(grapheme)
    .map((c) => c.codePointAt(0)!.toString(16).padStart(4, "0"))
    .join("-");
}

const FLUENT_BASE =
  "https://cdn.jsdelivr.net/npm/@lobehub/fluent-emoji-modern@1.0.0/assets";

/**
 * Drop-in emoji renderer that swaps the OS-native emoji font for
 * Microsoft Fluent Emoji ("Modern" 3D style) via jsDelivr. Each emoji
 * becomes an <img> sized at 1em so it scales naturally with the
 * surrounding text.
 *
 * Why: native emoji rendering varies wildly between OS (Apple's 3D
 * vs Android's Noto vs Windows Segoe), breaking brand consistency for
 * an app where the emoji IS the content. Fluent's chunky 3D style
 * matches the illustrated padlock logo aesthetic.
 *
 * Implementation:
 * - Splits the input by GRAPHEME via Intl.Segmenter so compound emojis
 *   like 👨‍👩‍👧 (ZWJ sequences) and 🇪🇸 (regional indicator pairs)
 *   are treated as single image units, not broken apart.
 * - Each grapheme is converted to its codepoint slug (e.g. "1f6ac" or
 *   "1f1ea-1f1f8") which is the filename used by the Fluent Modern
 *   static package.
 * - loading="lazy" defers off-screen emojis (big win on long lists).
 * - draggable=false prevents iOS Safari image-drag UI on tap-and-hold.
 * - alt={char} keeps the original emoji as fallback for screen
 *   readers and if the SVG ever 404s on the CDN.
 */
export function Emoji({ children, className }: EmojiProps) {
  if (!children) return null;

  const graphemes = Array.from(
    new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(children),
  ).map((s) => s.segment);

  return (
    <span
      className={cn("inline-flex items-center align-middle gap-0.5", className)}
    >
      {graphemes.map((char, i) => {
        const slug = emojiToCodepointSlug(char);
        return (
          <img
            key={i}
            src={`${FLUENT_BASE}/${slug}.svg`}
            alt={char}
            style={{ width: "1em", height: "1em" }}
            className="inline-block"
            loading="lazy"
            draggable={false}
          />
        );
      })}
    </span>
  );
}
