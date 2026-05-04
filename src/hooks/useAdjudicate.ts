import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";
import { containsUrl } from "@/lib/validators";
import { useAuth } from "@/contexts/AuthContext";

interface AdjudicateInput {
  achievementId: string;
  story?: string;
}

interface AdjudicateResult {
  unlockId: string;
  storyId: string | null;
}

export function useAdjudicate() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ achievementId, story }: AdjudicateInput): Promise<AdjudicateResult> => {
      if (!user) throw new Error("No estás logueado");

      const cleanStory = story?.trim() ?? "";
      if (cleanStory.length > 0) {
        if (cleanStory.length > 1000) throw new Error("La historia es demasiado larga");
        if (containsUrl(cleanStory)) throw new Error("No se permiten enlaces en las historias");
      }

      // 1. Insert unlock
      const { data: unlock, error: unlockErr } = await supabase
        .from("unlocks")
        .insert({ user_id: user.id, achievement_id: achievementId })
        .select("id, achievement_id")
        .single();
      if (unlockErr) {
        if (unlockErr.code === "23505") throw new Error("Ya tienes este logro");
        logger.error("adjudicate insert unlock", unlockErr);
        throw new Error("No se pudo adjudicar");
      }

      // 2. Optional story
      let storyId: string | null = null;
      if (cleanStory.length > 0) {
        const { data: storyRow, error: storyErr } = await supabase
          .from("stories")
          .insert({
            unlock_id: unlock.id,
            user_id: user.id,
            achievement_id: unlock.achievement_id,
            body: cleanStory,
          })
          .select("id")
          .single();
        if (storyErr) {
          logger.error("adjudicate insert story", storyErr);
          // Unlock already saved — degrade gracefully.
        } else {
          storyId = storyRow.id;
        }
      }

      return { unlockId: unlock.id, storyId };
    },
    onSuccess: (_data, _vars) => {
      // refetchType: "all" forces refetch on inactive queries too (e.g. the
      // home grid that's currently unmounted because the user is on /l/:slug).
      // Without this, invalidate marks them stale but with refetchOnMount:false
      // the cached old data shows up when the user navigates back.
      queryClient.invalidateQueries({ queryKey: ["unlocks"], refetchType: "all" });
      queryClient.invalidateQueries({ queryKey: ["achievement"], refetchType: "all" });
      queryClient.invalidateQueries({ queryKey: ["achievements"], refetchType: "all" });
      queryClient.invalidateQueries({ queryKey: ["stories"], refetchType: "all" });
    },
    onError: (e: Error) => {
      toast.error(e.message);
    },
  });
}
