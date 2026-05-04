import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";

/**
 * Best-effort analytics event insert. Never throws — analytics must not block flow.
 */
export async function trackEvent(name: string, properties: Record<string, unknown> = {}) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("events").insert({
      name,
      properties: properties as never,
      user_id: user?.id ?? null,
    });
  } catch (e) {
    logger.error("trackEvent failed", e);
  }
}
