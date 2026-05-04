import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";
import {
  proposeAchievementSchema,
  containsUrl,
} from "@/lib/validators";
import {
  containsBlockedWord,
  isDuplicateTitle,
} from "@/lib/moderation";
import { slugify } from "@/lib/slug";
import { useAuth } from "@/contexts/AuthContext";

export interface ProposeInput {
  title: string;
  emoji: string;
  description: string;
  category: string;
}

export function usePropose() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (input: ProposeInput) => {
      if (!user) throw new Error("No estás logueado");

      const parsed = proposeAchievementSchema.safeParse(input);
      if (!parsed.success) throw new Error("Datos inválidos");

      if (
        containsBlockedWord(parsed.data.title) ||
        containsBlockedWord(parsed.data.description)
      ) {
        throw new Error("Texto contiene palabras prohibidas");
      }
      if (
        containsUrl(parsed.data.title) ||
        containsUrl(parsed.data.description)
      ) {
        throw new Error("No se permiten enlaces");
      }

      // Duplicate detection vs approved set
      const { data: existing } = await supabase
        .from("achievements")
        .select("title")
        .eq("status", "approved");
      if (
        isDuplicateTitle(
          parsed.data.title,
          (existing ?? []).map((e) => e.title),
        )
      ) {
        throw new Error("Ya existe un logro muy parecido");
      }

      const slug = slugify(parsed.data.title);
      if (slug.length === 0) throw new Error("El título no produce un slug válido");

      const { error } = await supabase.from("achievements").insert({
        slug,
        title: parsed.data.title,
        emoji: parsed.data.emoji,
        description: parsed.data.description,
        category: parsed.data.category,
        created_by: user.id,
        status: "pending",
      });
      if (error) {
        if (error.code === "23505") throw new Error("Ese título ya existe");
        // Sentinel from rate-limit trigger (migration 007)
        if (error.message?.includes("PROPOSE_RATE_LIMIT_EXCEEDED")) {
          throw new Error("Máximo 3 propuestas pendientes en 24 horas");
        }
        logger.error("propose insert", error);
        throw new Error("No se pudo crear");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
      toast.success("Tu logro está en revisión");
    },
    onError: (e: Error) => {
      toast.error(e.message);
    },
  });
}
