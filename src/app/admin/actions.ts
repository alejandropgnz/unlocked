"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type AdminResult = { ok: true } | { ok: false; error: string };

async function assertAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false as const, error: "not logged in" };
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .returns<{ is_admin: boolean }[]>()
    .maybeSingle();
  if (!profile?.is_admin) return { ok: false as const, error: "not admin" };
  return { ok: true as const, supabase, user };
}

export async function approveAchievement(id: string): Promise<AdminResult> {
  const auth = await assertAdmin();
  if (!auth.ok) return { ok: false, error: auth.error };
  const { supabase } = auth;

  const { data: ach } = await supabase
    .from("achievements")
    .select("created_by")
    .eq("id", id)
    .returns<{ created_by: string | null }[]>()
    .maybeSingle();

  const { error: updErr } = await supabase
    .from("achievements")
    .update({ status: "approved" })
    .eq("id", id);
  if (updErr) {
    console.error("approve update error", updErr);
    return { ok: false, error: "update failed" };
  }

  // Auto-unlock for the proposer (incentive). Non-fatal if it fails.
  if (ach?.created_by) {
    const { error: unlockErr } = await supabase
      .from("unlocks")
      .insert({ user_id: ach.created_by, achievement_id: id })
      .select("id");
    if (unlockErr && unlockErr.code !== "23505") {
      console.error("approve auto-unlock error", unlockErr);
    }
  }

  revalidatePath("/admin");
  return { ok: true };
}

export async function rejectAchievement(id: string): Promise<AdminResult> {
  const auth = await assertAdmin();
  if (!auth.ok) return { ok: false, error: auth.error };
  const { supabase } = auth;
  const { error } = await supabase
    .from("achievements")
    .update({ status: "rejected" })
    .eq("id", id);
  if (error) {
    console.error("reject update error", error);
    return { ok: false, error: "update failed" };
  }
  revalidatePath("/admin");
  return { ok: true };
}

export async function resolveReport(id: string): Promise<AdminResult> {
  const auth = await assertAdmin();
  if (!auth.ok) return { ok: false, error: auth.error };
  const { supabase } = auth;
  const { error } = await supabase
    .from("reports")
    .update({ status: "resolved" })
    .eq("id", id);
  if (error) {
    console.error("resolve report error", error);
    return { ok: false, error: "update failed" };
  }
  revalidatePath("/admin");
  return { ok: true };
}

export async function dismissReport(id: string): Promise<AdminResult> {
  const auth = await assertAdmin();
  if (!auth.ok) return { ok: false, error: auth.error };
  const { supabase } = auth;
  const { error } = await supabase
    .from("reports")
    .update({ status: "dismissed" })
    .eq("id", id);
  if (error) {
    console.error("dismiss report error", error);
    return { ok: false, error: "update failed" };
  }
  revalidatePath("/admin");
  return { ok: true };
}
