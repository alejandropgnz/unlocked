import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";
import { useAuth } from "@/contexts/AuthContext";
import type { ReactionTargetType } from "./types";

interface ReactInput {
  targetType: ReactionTargetType;
  targetId: string;
  value: 1 | -1 | 0;
}

export function useReact() {
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ targetType, targetId, value }: ReactInput) => {
      if (!user) throw new Error("No estás logueado");

      if (value === 0) {
        const { error } = await supabase
          .from("reactions")
          .delete()
          .eq("user_id", user.id)
          .eq("target_type", targetType)
          .eq("target_id", targetId);
        if (error) {
          logger.error("react delete", error);
          throw error;
        }
      } else {
        const { error } = await supabase.from("reactions").upsert(
          {
            user_id: user.id,
            target_type: targetType,
            target_id: targetId,
            value,
          },
          { onConflict: "user_id,target_type,target_id" },
        );
        if (error) {
          logger.error("react upsert", error);
          throw error;
        }
      }
    },
    onSuccess: () => {
      // Don't invalidate immediately — the trigger updates `score` server-side,
      // but the optimistic UI in the consumer already showed the change.
      // Pages that need authoritative scores can manually invalidate.
    },
    onError: (e: Error) => {
      logger.error("react failed", e);
    },
  });
}
