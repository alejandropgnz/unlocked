import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Remove an unlock from the user's collection AND record it as a pass so
 * it doesn't come back in /descubrir.
 *
 * The bump_unlock_count trigger (migration 003) handles the achievements
 * counter — DELETE on unlocks decrements it automatically. We don't need
 * to touch that.
 *
 * Passes insert may 23505 if the achievement was previously passed and
 * later unlocked; that's fine, we just want it in passes one way or
 * another.
 */
export function useDeleteUnlock() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (achievementId: string) => {
      if (!user) throw new Error("No estás logueado");

      const { error: delErr } = await supabase
        .from("unlocks")
        .delete()
        .eq("user_id", user.id)
        .eq("achievement_id", achievementId);
      if (delErr) {
        logger.error("delete unlock", delErr);
        throw new Error("No se pudo eliminar");
      }

      const { error: passErr } = await supabase
        .from("passes")
        .insert({ user_id: user.id, achievement_id: achievementId });
      // 23505 = unique_violation; the row already exists in passes, fine.
      if (passErr && passErr.code !== "23505") {
        logger.error("delete unlock — pass insert", passErr);
        // Don't throw — the unlock is already gone, the user got the
        // outcome they wanted; the worst case is the card reappears in
        // /descubrir, which they can pass again.
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["unlocks"], refetchType: "all" });
      queryClient.invalidateQueries({
        queryKey: ["passes", "by-user", user?.id],
      });
      queryClient.invalidateQueries({ queryKey: ["achievement"], refetchType: "all" });
      queryClient.invalidateQueries({ queryKey: ["achievements"], refetchType: "all" });
      toast.success("Eliminado de tu colección");
    },
    onError: (e: Error) => {
      toast.error(e.message);
    },
  });
}
