import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";
import { containsUrl } from "@/lib/validators";
import { useAuth } from "@/contexts/AuthContext";

const top5Schema = z.array(z.string().uuid()).max(5);
const bioSchema = z.string().trim().max(140);

export function useSaveBio() {
  const queryClient = useQueryClient();
  const { user, refreshProfile } = useAuth();

  return useMutation({
    mutationFn: async (bio: string) => {
      if (!user) throw new Error("No estás logueado");

      const parsed = bioSchema.safeParse(bio);
      if (!parsed.success) throw new Error("Bio inválida");
      if (containsUrl(parsed.data)) throw new Error("No se permiten enlaces en la bio");

      const value = parsed.data.length === 0 ? null : parsed.data;
      const { error } = await supabase.from("profiles").update({ bio: value }).eq("id", user.id);
      if (error) {
        logger.error("saveBio", error);
        throw new Error("No se pudo guardar");
      }
    },
    onSuccess: async () => {
      await refreshProfile();
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Bio guardada");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useSaveTop5() {
  const queryClient = useQueryClient();
  const { user, refreshProfile } = useAuth();

  return useMutation({
    mutationFn: async (top5: string[]) => {
      if (!user) throw new Error("No estás logueado");
      const parsed = top5Schema.safeParse(top5);
      if (!parsed.success) throw new Error("Datos inválidos");

      // Defense: verify the user actually owns each pinned achievement.
      if (parsed.data.length > 0) {
        const { data: owned } = await supabase
          .from("unlocks")
          .select("achievement_id")
          .eq("user_id", user.id)
          .in("achievement_id", parsed.data);
        const ownedSet = new Set((owned ?? []).map((r) => r.achievement_id));
        const allOwned = parsed.data.every((id) => ownedSet.has(id));
        if (!allOwned) throw new Error("Solo puedes anclar logros que tengas");
      }

      const { error } = await supabase
        .from("profiles")
        .update({ top5: parsed.data })
        .eq("id", user.id);
      if (error) {
        logger.error("saveTop5", error);
        throw new Error("No se pudo guardar");
      }
    },
    onSuccess: async () => {
      await refreshProfile();
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useDeleteAccount() {
  const { user, signOut } = useAuth();

  return useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("No estás logueado");
      const { error } = await supabase.from("profiles").delete().eq("id", user.id);
      if (error) {
        logger.error("deleteAccount", error);
        throw new Error("No se pudo borrar la cuenta");
      }
      await signOut();
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
