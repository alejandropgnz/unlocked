import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";
import { containsUrl } from "@/lib/validators";
import { useAuth } from "@/contexts/AuthContext";

const reportSchema = z.object({
  targetType: z.enum(["achievement", "story", "reply", "profile"]),
  targetId: z.string().uuid(),
  reason: z.enum(["spam", "ofensivo", "datos_personales", "otro"]),
  notes: z.string().trim().max(500).optional(),
});

interface ReportInput {
  targetType: "achievement" | "story" | "reply" | "profile";
  targetId: string;
  reason: "spam" | "ofensivo" | "datos_personales" | "otro";
  notes?: string;
}

export function useReport() {
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (input: ReportInput) => {
      if (!user) throw new Error("No estás logueado");
      const parsed = reportSchema.safeParse(input);
      if (!parsed.success) throw new Error("Datos inválidos");
      if (parsed.data.notes && containsUrl(parsed.data.notes)) {
        throw new Error("No se permiten enlaces en las notas");
      }

      const { error } = await supabase.from("reports").insert({
        target_type: parsed.data.targetType,
        target_id: parsed.data.targetId,
        reason: parsed.data.reason,
        notes: parsed.data.notes ?? null,
        reporter_id: user.id,
      });
      if (error) {
        logger.error("report insert", error);
        throw new Error("No se pudo enviar el reporte");
      }
    },
    onSuccess: () => {
      toast.success("Gracias. Lo revisaremos.");
    },
    onError: (e: Error) => {
      toast.error(e.message);
    },
  });
}
