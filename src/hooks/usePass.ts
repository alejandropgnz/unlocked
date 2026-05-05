import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Records a left-swipe ("paso") in the `passes` table so the achievement
 * doesn't reappear in the swipe deck on next visit.
 *
 * Conflicts (already-passed) are silently ignored. Other errors surface as
 * a toast + console log so we don't silently fail to persist passes
 * (previously a silent failure mode caused passed cards to reappear on
 * reload because the row was never written).
 */
export function usePass() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (achievementId: string) => {
      if (!user) {
        throw new Error("No estás logueado");
      }
      const { error } = await supabase
        .from("passes")
        .insert({ user_id: user.id, achievement_id: achievementId });
      // 23505 = unique_violation — already passed, fine
      if (error && error.code !== "23505") {
        logger.error("pass insert", error);
        throw error;
      }
    },
    onSuccess: () => {
      // Refresh the cached pass list so subsequent renders filter it out.
      void queryClient.invalidateQueries({
        queryKey: ["passes", "by-user", user?.id],
      });
    },
    onError: (e: Error) => {
      // Surface the failure rather than silently lose the pass record.
      toast.error(`No se pudo guardar el paso: ${e.message}`);
    },
  });
}
