import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";
import { useAuth } from "@/contexts/AuthContext";

export function useUpdateAvatar() {
  const queryClient = useQueryClient();
  const { user, refreshProfile } = useAuth();

  return useMutation({
    mutationFn: async (avatarUrl: string) => {
      if (!user) throw new Error("No estás logueado");
      const { error } = await supabase
        .from("profiles")
        .update({ avatar_url: avatarUrl })
        .eq("id", user.id);
      if (error) {
        logger.error("update avatar_url", error);
        throw new Error("No se pudo actualizar la foto");
      }
    },
    onSuccess: async () => {
      await refreshProfile();
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
