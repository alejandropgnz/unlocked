import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export interface ProfileSummary {
  id: string;
  username: string;
  isAdmin: boolean;
}

/**
 * Returns the current user's profile summary (id, username, is_admin) or null
 * if not logged in. Cached per-request via React.cache so multiple components
 * in the same render call only trigger ONE Supabase round-trip.
 *
 * Uses getSession() (cookie-only, no network) instead of getUser() (network call).
 * The session JWT is signed by Supabase; reading the user_id from a verified cookie
 * is safe for non-security-critical UI like nav rendering. Server Actions and
 * mutation-handling endpoints should still use getUser() for proper validation.
 */
export const getCurrentProfileSummary = cache(async (): Promise<ProfileSummary | null> => {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("id, username, is_admin")
    .eq("id", session.user.id)
    .returns<{ id: string; username: string; is_admin: boolean }[]>()
    .maybeSingle();

  if (!data) return null;
  return { id: data.id, username: data.username, isAdmin: data.is_admin };
});
