import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";

/**
 * Best-effort analytics event insert. Never throws — analytics must not block flow.
 * Only fires for authenticated users (RLS rejects anonymous inserts; we short-circuit
 * to avoid wasted round-trips). Anonymous page views are covered by Plausible script.
 */
export async function trackEvent(name: string, properties: Record<string, unknown> = {}) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("events").insert({
      name,
      properties: properties as never,
      user_id: user.id,
    });
  } catch (e) {
    logger.error("trackEvent failed", e);
  }
}
