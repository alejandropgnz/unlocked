import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";
import {
  proposeAchievementSchema,
  containsUrl,
} from "@/lib/validators";
import { containsBlockedWord } from "@/lib/moderation";
import { slugify } from "@/lib/slug";
import { useAuth } from "@/contexts/AuthContext";

export interface ProposeInput {
  title: string;
  emoji: string;
  category: string;
}

interface SimilarRow {
  id: string;
  slug: string;
  title: string;
  sim: number;
}

export function usePropose() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (input: ProposeInput) => {
      if (!user) throw new Error("No estás logueado");

      const parsed = proposeAchievementSchema.safeParse(input);
      if (!parsed.success) throw new Error("Datos inválidos");

      if (containsBlockedWord(parsed.data.title)) {
        throw new Error("Texto contiene palabras prohibidas");
      }
      if (containsUrl(parsed.data.title)) {
        throw new Error("No se permiten enlaces");
      }

      // Duplicate detection — server-side via pg_trgm trigram similarity
      // (migration _013). Threshold 0.65 catches "casi-iguales" without
      // false-positiving distinct-but-thematically-similar logros.
      const { data: similar, error: simErr } = await supabase.rpc(
        "find_similar_achievement",
        {
          query_title: parsed.data.title,
          min_similarity: 0.65,
        },
      );
      if (simErr) {
        logger.error("find_similar_achievement", simErr);
        // Fail open — better to let the propose through and have admin catch
        // it than block the user on a transient RPC error.
      } else if (Array.isArray(similar) && similar.length > 0) {
        const top = similar[0] as SimilarRow;
        throw new Error(`Ya existe uno muy parecido: "${top.title}"`);
      }

      const slug = slugify(parsed.data.title);
      if (slug.length === 0) throw new Error("El título no produce un slug válido");

      const { error } = await supabase.from("achievements").insert({
        slug,
        title: parsed.data.title,
        emoji: parsed.data.emoji,
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
