import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";
import { containsUrl } from "@/lib/validators";
import { useAuth } from "@/contexts/AuthContext";

interface AddStoryInput {
  achievementId: string;
  story: string;
}

export function useAddStory() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ achievementId, story }: AddStoryInput) => {
      if (!user) throw new Error("No estás logueado");
      const clean = story.trim();
      if (clean.length === 0) throw new Error("Escribe algo");
      if (clean.length > 1000) throw new Error("Demasiado largo (máx 1000)");
      if (containsUrl(clean)) throw new Error("No se permiten enlaces");

      // Find the user's existing unlock for this achievement
      const { data: unlock, error: uErr } = await supabase
        .from("unlocks")
        .select("id")
        .eq("user_id", user.id)
        .eq("achievement_id", achievementId)
        .maybeSingle();
      if (uErr) {
        logger.error("addStory find unlock", uErr);
        throw new Error("No se pudo encontrar tu unlock");
      }
      if (!unlock) throw new Error("No tienes este logro");

      // Guard: one story per unlock
      const { data: existing } = await supabase
        .from("stories")
        .select("id")
        .eq("unlock_id", unlock.id)
        .maybeSingle();
      if (existing) throw new Error("Ya has contado tu historia");

      const { error } = await supabase.from("stories").insert({
        unlock_id: unlock.id,
        user_id: user.id,
        achievement_id: achievementId,
        body: clean,
      });
      if (error) {
        logger.error("addStory insert", error);
        throw new Error("No se pudo guardar");
      }
    },
    onSuccess: (_d, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["stories", "by-achievement", vars.achievementId],
      });
      toast.success("Historia publicada");
    },
    onError: (e: Error) => {
      toast.error(e.message);
    },
  });
}
