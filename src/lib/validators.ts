import { z } from "zod";

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
