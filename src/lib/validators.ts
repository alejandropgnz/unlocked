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
  emoji: z.string().min(1).max(8),
  description: z.string().trim().max(200),
  category: z.enum([
    "familia",
    "verguenza",
    "resaca",
    "amor",
    "trabajo",
    "random",
    "salud",
    "viajes",
  ]),
});

export const replySchema = z.object({
  storyId: z.string().uuid(),
  body: z.string().trim().min(1).max(500),
});
