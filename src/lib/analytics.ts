"use server";

import { createClient } from "@/lib/supabase/server";

export async function logEvent(
  name: string,
  properties: Record<string, unknown> = {},
): Promise<void> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await supabase.from("events").insert({
      name,
      properties: properties as never,
      user_id: user?.id ?? null,
    });
  } catch (e) {
    // Analytics must never block flow
    console.error("logEvent error", e);
  }
}
