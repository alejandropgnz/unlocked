import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";

const USERNAME_RE = /^[a-z0-9_]{3,20}$/;

export type UsernameStatus =
  | "idle"
  | "checking"
  | "invalid"
  | "available"
  | "taken"
  | "current";

interface UsernameCheckResult {
  status: UsernameStatus;
  message: string;
}

/**
 * Checks if a username is available. Pass `currentUsername` to treat it as
 * "your own current username" (status: "current") instead of "taken".
 *
 * Validation rules (mirrors the BD CHECK constraint):
 * - lowercase letters, digits, underscores
 * - 3 to 20 characters
 */
export function useUsernameAvailability(
  desired: string,
  currentUsername: string | null,
) {
  const normalized = desired.trim().toLowerCase();
  const valid = USERNAME_RE.test(normalized);
  const isCurrent =
    currentUsername !== null && normalized === currentUsername.toLowerCase();

  return useQuery<UsernameCheckResult>({
    queryKey: ["username-availability", normalized, currentUsername],
    queryFn: async (): Promise<UsernameCheckResult> => {
      if (!valid) {
        return {
          status: "invalid",
          message: "Solo minúsculas, números y _ (3-20 caracteres)",
        };
      }
      if (isCurrent) {
        return { status: "current", message: "" };
      }
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("id")
          .eq("username", normalized)
          .limit(1);
        if (error) throw error;
        if (data && data.length > 0) {
          return { status: "taken", message: "Ya está cogido" };
        }
        return { status: "available", message: "Disponible" };
      } catch (e) {
        logger.error("username check failed", e);
        return { status: "invalid", message: "Error comprobando" };
      }
    },
    enabled: normalized.length > 0,
    staleTime: 30 * 1000,
  });
}
