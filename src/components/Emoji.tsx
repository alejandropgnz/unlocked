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
 * Drop-in emoji renderer that swaps the OS-native emoji font for a
 * consistent, brand-aligned set via a CDN. Each emoji becomes an <img>
 * sized at 1em so it scales naturally with the surrounding text.
 *
 * Why: native emoji rendering varies wildly between OS (Apple's 3D
 * vs Android's Noto vs Windows Segoe), breaking brand consistency for
 * an app where the emoji IS the content.
 *
 * Style: APPLE. emojicdn.elk.sh dropped the "microsoft" (Fluent) style
 * as of mid-2026 — only apple/google/facebook/twitter remain. Apple's
 * 3D illustrated set is the closest substitute to Fluent's chunky 3D
 * aesthetic that matches the padlock logo, and is the most universally
 * recognized "premium" emoji style.
 *
 * Implementation notes:
 * - Uses emojicdn.elk.sh as the asset gateway. It 302-redirects to the
 *   actual asset (cached by Bunny CDN). One redirect per unique emoji
 *   per browser cache lifetime, then instant.
 * - Splits the input by GRAPHEME (Intl.Segmenter), not by char, so
 *   compound emojis like 👨‍👩‍👧 (zero-width-joiner sequences) and
 *   country flags 🇪🇸 (regional indicator pairs) render as a single
 *   image instead of breaking apart.
 * - loading="lazy" defers off-screen emojis (huge win in feed/grid).
 * - draggable=false prevents iOS Safari from triggering image-drag UI
 *   when users tap-and-hold a card.
 * - alt={char} keeps the original emoji for screen readers and as a
 *   fallback if the image fails to load.
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
      {graphemes.map((char, i) => (
        <img
          key={i}
          src={`https://emojicdn.elk.sh/${encodeURIComponent(char)}?style=apple`}
          alt={char}
          style={{ width: "1em", height: "1em" }}
          className="inline-block"
          loading="lazy"
          draggable={false}
        />
      ))}
    </span>
  );
}
