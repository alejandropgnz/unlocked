import type { Database } from "@/types/database";

export type Achievement = Database["public"]["Tables"]["achievements"]["Row"];
export type AchievementCategory = Database["public"]["Enums"]["achievement_category"];
export type AchievementStatus = Database["public"]["Enums"]["achievement_status"];

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Unlock = Database["public"]["Tables"]["unlocks"]["Row"];
export type Story = Database["public"]["Tables"]["stories"]["Row"];
export type Reply = Database["public"]["Tables"]["replies"]["Row"];
export type Reaction = Database["public"]["Tables"]["reactions"]["Row"];
export type ReportRow = Database["public"]["Tables"]["reports"]["Row"];
export type ReactionTargetType = Database["public"]["Enums"]["reaction_target_type"];
export type ReportTargetType = Database["public"]["Enums"]["report_target_type"];
export type ReportReason = Database["public"]["Enums"]["report_reason"];

export type AchievementSummary = Pick<
  Achievement,
  "id" | "slug" | "title" | "emoji" | "category" | "unlock_count"
>;

export type AchievementDetail = AchievementSummary & {
  description: string | null;
};

export type AchievementWithRarity = AchievementSummary & {
  rarityPercent: number;
};

export type ProfilePublic = Pick<
  Profile,
  "id" | "username" | "display_name" | "avatar_url" | "bio" | "top5"
>;

export interface StoryListItem {
  id: string;
  body: string;
  score: number;
  createdAt: string;
  achievementId: string;
  user: { username: string; display_name: string; avatar_url: string | null };
  isOwn: boolean;
  myReaction: 1 | -1 | 0;
}

export interface ReplyListItem {
  id: string;
  body: string;
  score: number;
  createdAt: string;
  user: { username: string; avatar_url: string | null };
  myReaction: 1 | -1 | 0;
}

export interface UnlockedItem {
  unlockId: string;
  achievementId: string;
  slug: string;
  title: string;
  emoji: string;
  category: string;
  unlockCount: number;
  rarityPercent: number;
  createdAt: string;
}
