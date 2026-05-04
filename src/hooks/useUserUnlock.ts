import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface UserUnlockData {
  unlockId: string;
  unlockedAt: string;
  achievement: {
    id: string;
    slug: string;
    title: string;
    emoji: string;
    category: string;
    unlock_count: number;
  };
  user: {
    username: string;
    display_name: string;
    avatar_url: string | null;
  };
  story: { id: string; body: string; score: number; createdAt: string } | null;
  rarityPercent: number;
}

export function useUserUnlock(
  username: string | undefined,
  slug: string | undefined,
) {
  return useQuery({
    queryKey: ["user-unlock", username, slug],
    queryFn: async (): Promise<UserUnlockData | null> => {
      // 1. Profile by username
      const { data: profile, error: pErr } = await supabase
        .from("profiles")
        .select("id, username, display_name, avatar_url")
        .eq("username", username!)
        .maybeSingle();
      if (pErr) throw pErr;
      if (!profile) return null;

      // 2. Achievement by slug
      const { data: achievement, error: aErr } = await supabase
        .from("achievements")
        .select("id, slug, title, emoji, category, unlock_count")
        .eq("slug", slug!)
        .eq("status", "approved")
        .maybeSingle();
      if (aErr) throw aErr;
      if (!achievement) return null;

      // 3. Unlock joining the two
      const { data: unlock, error: uErr } = await supabase
        .from("unlocks")
        .select("id, created_at")
        .eq("user_id", profile.id)
        .eq("achievement_id", achievement.id)
        .maybeSingle();
      if (uErr) throw uErr;
      if (!unlock) return null;

      // 4. Optional story
      const { data: story } = await supabase
        .from("stories")
        .select("id, body, score, created_at")
        .eq("unlock_id", unlock.id)
        .eq("is_hidden", false)
        .maybeSingle();

      // 5. Rarity
      const { data: rarity } = await supabase
        .from("achievement_rarity")
        .select("rarity_percent")
        .eq("id", achievement.id)
        .maybeSingle();

      return {
        unlockId: unlock.id,
        unlockedAt: unlock.created_at,
        achievement: {
          id: achievement.id,
          slug: achievement.slug,
          title: achievement.title,
          emoji: achievement.emoji,
          category: achievement.category,
          unlock_count: achievement.unlock_count,
        },
        user: {
          username: profile.username,
          display_name: profile.display_name,
          avatar_url: profile.avatar_url,
        },
        story: story
          ? { id: story.id, body: story.body, score: story.score, createdAt: story.created_at }
          : null,
        rarityPercent: Number(rarity?.rarity_percent ?? 0),
      };
    },
    enabled: !!username && !!slug,
  });
}
