import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Records a left-swipe ("paso") in the `passes` table so the achievement
 * doesn't reappear in the swipe deck on next visit.
 *
 * Fire-and-forget: errors are logged but never block the UI — the worst case
 * is the card shows up again on next load, which is what would happen today
 * anyway. Conflicts (already-passed) are silently ignored.
 */
export function usePass() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (achievementId: string) => {
      if (!user) return;
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
      void queryClient.invalidateQueries({ queryKey: ["passes", "by-user", user?.id] });
    },
    // Errors are intentionally not toasted — silent best-effort write.
  });
}
