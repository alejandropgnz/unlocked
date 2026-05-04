import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface StoryWithAchievement {
  id: string;
  body: string;
  score: number;
  createdAt: string;
  user: { username: string; display_name: string; avatar_url: string | null };
  achievement: { id: string; slug: string; title: string; emoji: string };
  myReaction: 1 | -1 | 0;
}

interface StoryRow {
  id: string;
  body: string;
  score: number;
  created_at: string;
  user_id: string;
  achievement_id: string;
  profiles: { username: string; display_name: string; avatar_url: string | null } | null;
  achievements: { id: string; slug: string; title: string; emoji: string } | null;
}

export function useStory(storyId: string | undefined, currentUserId: string | null) {
  return useQuery({
    queryKey: ["story", storyId, currentUserId],
    queryFn: async (): Promise<StoryWithAchievement | null> => {
      const { data, error } = await supabase
        .from("stories")
        .select(
          "id, body, score, created_at, user_id, achievement_id, profiles!stories_user_id_fkey(username, display_name, avatar_url), achievements!inner(id, slug, title, emoji)",
        )
        .eq("id", storyId!)
        .eq("is_hidden", false)
        .maybeSingle();
      if (error) throw error;
      const s = data as unknown as StoryRow | null;
      if (!s || !s.achievements) return null;

      let myReaction: 1 | -1 | 0 = 0;
      if (currentUserId) {
        const { data: r } = await supabase
          .from("reactions")
          .select("value")
          .eq("user_id", currentUserId)
          .eq("target_type", "story")
          .eq("target_id", s.id)
          .maybeSingle();
        if (r?.value === 1 || r?.value === -1) myReaction = r.value;
      }

      return {
        id: s.id,
        body: s.body,
        score: s.score,
        createdAt: s.created_at,
        user: {
          username: s.profiles?.username ?? "",
          display_name: s.profiles?.display_name ?? "",
          avatar_url: s.profiles?.avatar_url ?? null,
        },
        achievement: s.achievements,
        myReaction,
      };
    },
    enabled: !!storyId,
  });
}
