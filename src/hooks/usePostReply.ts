import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";
import { replySchema, containsUrl } from "@/lib/validators";
import { useAuth } from "@/contexts/AuthContext";

interface ReplyInput {
  storyId: string;
  body: string;
}

export function usePostReply() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (input: ReplyInput) => {
      if (!user) throw new Error("No estás logueado");

      const parsed = replySchema.safeParse(input);
      if (!parsed.success) throw new Error("Respuesta inválida");
      if (containsUrl(parsed.data.body)) throw new Error("No se permiten enlaces");

      const { error } = await supabase.from("replies").insert({
        story_id: parsed.data.storyId,
        user_id: user.id,
        body: parsed.data.body,
      });
      if (error) {
        logger.error("postReply", error);
        throw new Error("No se pudo publicar");
      }
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ["replies", "by-story", vars.storyId] });
    },
    onError: (e: Error) => {
      toast.error(e.message);
    },
  });
}
