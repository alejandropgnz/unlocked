import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";
import { useAuth } from "@/contexts/AuthContext";

const USERNAME_RE = /^[a-z0-9_]{3,20}$/;

export function useChangeUsername() {
  const queryClient = useQueryClient();
  const { user, refreshProfile } = useAuth();

  return useMutation({
    mutationFn: async (newUsername: string): Promise<string> => {
      if (!user) throw new Error("No estás logueado");
      const normalized = newUsername.trim().toLowerCase();
      if (!USERNAME_RE.test(normalized)) {
        throw new Error("Username inválido (3-20 caracteres, solo a-z, 0-9, _)");
      }

      // Pre-check availability — fast fail if taken (BD UNIQUE constraint
      // would also catch this but the error message is friendlier here).
      const { data: existing } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", normalized)
        .neq("id", user.id)
        .limit(1);
      if (existing && existing.length > 0) {
        throw new Error("Ya está cogido");
      }

      const { error } = await supabase
        .from("profiles")
        .update({ username: normalized })
        .eq("id", user.id);
      if (error) {
        if (error.code === "23505") throw new Error("Ya está cogido");
        logger.error("changeUsername", error);
        throw new Error("No se pudo cambiar");
      }
      return normalized;
    },
    onSuccess: async () => {
      await refreshProfile();
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Username actualizado");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
