import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Insert an email into the pre-launch waitlist. RLS allows anon INSERTs.
 * 23505 (unique violation) is treated as a friendly "ya estabas en la
 * lista" success state so a re-submit doesn't feel like a rejection.
 */
export function useJoinWaitlist() {
  return useMutation<
    { alreadyOnList: boolean },
    Error,
    string
  >({
    mutationFn: async (email: string) => {
      const trimmed = email.trim().toLowerCase();
      if (!EMAIL_RE.test(trimmed)) throw new Error("Email no válido");

      const { error } = await supabase
        .from("waitlist")
        .insert({ email: trimmed, source: "landing" });

      if (error) {
        if (error.code === "23505") {
          // Already in the list — fine, treat as success
          return { alreadyOnList: true };
        }
        logger.error("waitlist insert", error);
        throw new Error("No se pudo guardar. Inténtalo en un momento.");
      }
      return { alreadyOnList: false };
    },
    onError: (e: Error) => {
      toast.error(e.message);
    },
  });
}
