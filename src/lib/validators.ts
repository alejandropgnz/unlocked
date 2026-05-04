import { z } from "zod";

// Patterns for detecting URLs in plain-text fields (stories, replies, bio, notes).
// Strict: any `word.word` without spaces between the dot is rejected. Catches
// real URLs (google.com), shorteners (bit.ly), and URL-like patterns even with
// non-standard TLDs (my.site, evento.especial). False positives on intentional
// dotted abbreviations are rare in Spanish casual writing.
const URL_PATTERNS = [
  /\bhttps?:\/\//i,
  /\bwww\./i,
  /\w{2,}\.\w{2,}/, // any word.word with both sides 2+ alphanumeric chars
];

export function containsUrl(text: string): boolean {
  if (!text) return false;
  return URL_PATTERNS.some((re) => re.test(text));
}

// Matches a single emoji "grapheme cluster":
// - An Extended_Pictographic (the main emoji), optionally followed by:
//   - U+FE0F (Variation Selector-16, makes it render as emoji)
//   - U+200D + another pictographic (ZWJ sequences like 👨‍👩‍👧)
// - OR a pair of Regional_Indicator characters (a flag like 🇪🇸)
// Built with explicit unicode escapes — invisible chars in source are fragile.
const EMOJI_GRAPHEME = new RegExp(
  "^(?:\\p{Extended_Pictographic}(?:\\uFE0F|\\u200D\\p{Extended_Pictographic})*|\\p{Regional_Indicator}{2})$",
  "u",
);
const EMOJI_ONLY = new RegExp(
  "^(?:\\p{Extended_Pictographic}(?:\\uFE0F|\\u200D\\p{Extended_Pictographic})*|\\p{Regional_Indicator}{2})+$",
  "u",
);

/**
 * True if the text contains ONLY emojis (no letters, digits, punctuation).
 * Returns false for empty strings.
 */
export function isEmojiOnly(text: string): boolean {
  const stripped = text.trim();
  if (stripped.length === 0) return false;
  return EMOJI_ONLY.test(stripped);
}

/**
 * Count user-perceived emoji "characters" (grapheme clusters).
 * Uses Intl.Segmenter for correct counting of compound emojis.
 *
 * "👨‍👩‍👧" → 1 (a single ZWJ family)
 * "🇪🇸" → 1 (a flag, one grapheme)
 * "🚬👨‍👩‍👧🇪🇸" → 3
 *
 * Returns -1 if any segment is not a valid emoji grapheme.
 */
export function emojiCount(text: string): number {
  const stripped = text.trim();
  if (stripped.length === 0) return 0;
  const seg = new Intl.Segmenter("es", { granularity: "grapheme" });
  let count = 0;
  for (const piece of seg.segment(stripped)) {
    if (EMOJI_GRAPHEME.test(piece.segment)) count += 1;
    else return -1; // signal: not pure emojis
  }
  return count;
}

export const adjudicateSchema = z.object({
  achievementId: z.string().uuid(),
  story: z
    .string()
    .trim()
    .max(1000)
    .optional()
    .default(""),
});

export const proposeAchievementSchema = z.object({
  title: z.string().trim().min(3).max(80),
  emoji: z
    .string()
    .trim()
    .max(32) // Hard char cap (3 complex ZWJ emojis + slack — grapheme count is the real check below)
    .refine((v) => isEmojiOnly(v), {
      message: "Solo emojis (sin letras ni números)",
    })
    .refine(
      (v) => {
        const c = emojiCount(v);
        return c >= 1 && c <= 3;
      },
      { message: "Entre 1 y 3 emojis" },
    ),
  category: z.enum([
    "familia",
    "verguenza",
    "resaca",
    "amor",
    "trabajo",
    "random",
    "salud",
    "viajes",
    "amigos",
    "relaciones",
  ]),
});

export const replySchema = z.object({
  storyId: z.string().uuid(),
  body: z.string().trim().min(1).max(500),
});
