import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { StoryListItem } from "./types";

interface StoryRow {
  id: string;
  body: string;
  score: number;
  created_at: string;
  user_id: string;
  achievement_id: string;
  profiles: { username: string; display_name: string; avatar_url: string | null } | null;
}

export function useStories(achievementId: string | undefined, currentUserId: string | null) {
  return useQuery({
    queryKey: ["stories", "by-achievement", achievementId, currentUserId],
    queryFn: async (): Promise<StoryListItem[]> => {
      const { data: rows, error } = await supabase
        .from("stories")
        .select(
          "id, body, score, created_at, user_id, achievement_id, profiles!stories_user_id_fkey(username, display_name, avatar_url)",
        )
        .eq("achievement_id", achievementId!)
        .eq("is_hidden", false)
        .order("score", { ascending: false })
        .limit(50);
      if (error) throw error;

      const stories = (rows as unknown as StoryRow[] | null) ?? [];
      const ids = stories.map((s) => s.id);

      const myReactionByStory = new Map<string, 1 | -1>();
      if (currentUserId && ids.length > 0) {
        const { data: rs } = await supabase
          .from("reactions")
          .select("target_id, value")
          .eq("user_id", currentUserId)
          .eq("target_type", "story")
          .in("target_id", ids);
        for (const r of rs ?? []) {
          myReactionByStory.set(r.target_id, r.value as 1 | -1);
        }
      }

      const items: StoryListItem[] = stories.map((s) => ({
        id: s.id,
        body: s.body,
        score: s.score,
        createdAt: s.created_at,
        achievementId: s.achievement_id,
        user: {
          username: s.profiles?.username ?? "",
          display_name: s.profiles?.display_name ?? "",
          avatar_url: s.profiles?.avatar_url ?? null,
        },
        isOwn: !!currentUserId && currentUserId === s.user_id,
        myReaction: myReactionByStory.get(s.id) ?? 0,
      }));

      // Pin own story to top, then score DESC
      items.sort((a, b) => {
        if (a.isOwn !== b.isOwn) return a.isOwn ? -1 : 1;
        return b.score - a.score;
      });

      return items;
    },
    enabled: !!achievementId,
  });
}
