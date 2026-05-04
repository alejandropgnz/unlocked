import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { ReplyListItem } from "./types";

interface ReplyRow {
  id: string;
  body: string;
  score: number;
  created_at: string;
  user_id: string;
  profiles: { username: string; avatar_url: string | null } | null;
}

export function useReplies(storyId: string | undefined, currentUserId: string | null) {
  return useQuery({
    queryKey: ["replies", "by-story", storyId, currentUserId],
    queryFn: async (): Promise<ReplyListItem[]> => {
      const { data: rows, error } = await supabase
        .from("replies")
        .select(
          "id, body, score, created_at, user_id, profiles!replies_user_id_fkey(username, avatar_url)",
        )
        .eq("story_id", storyId!)
        .eq("is_hidden", false)
        .order("score", { ascending: false });
      if (error) throw error;

      const replies = (rows as unknown as ReplyRow[] | null) ?? [];
      const ids = replies.map((r) => r.id);

      const myReactionByReply = new Map<string, 1 | -1>();
      if (currentUserId && ids.length > 0) {
        const { data: rs } = await supabase
          .from("reactions")
          .select("target_id, value")
          .eq("user_id", currentUserId)
          .eq("target_type", "reply")
          .in("target_id", ids);
        for (const r of rs ?? []) {
          myReactionByReply.set(r.target_id, r.value as 1 | -1);
        }
      }

      return replies.map((r) => ({
        id: r.id,
        body: r.body,
        score: r.score,
        createdAt: r.created_at,
        user: {
          username: r.profiles?.username ?? "",
          avatar_url: r.profiles?.avatar_url ?? null,
        },
        myReaction: myReactionByReply.get(r.id) ?? 0,
      }));
    },
    enabled: !!storyId,
  });
}
