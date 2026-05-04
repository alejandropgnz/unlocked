import { z } from "zod";

// Patterns for detecting URLs in plain-text fields (stories, replies, bio).
// Strategy: flag explicit protocols and www., but for bare domains require
// the TLD to be followed by "/" or end-of-string to avoid false positives
// on Spanish sentence-ending patterns like "recordamos.cierto".
const URL_PATTERNS = [
  /\bhttps?:\/\//i,
  /\bwww\./i,
  /\b(?:t\.me|bit\.ly|tinyurl\.com|goo\.gl|youtu\.be|discord\.gg|tiktok\.com)\b/i,
  /[\w-]+\.(com|es|net|org|io|app|co|me|tv|gg|dev|xyz|info|biz|tk|ml|ga|cf|to|ly)(?:\/|$)/i,
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
