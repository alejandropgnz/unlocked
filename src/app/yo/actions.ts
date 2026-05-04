"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

export type SaveResult = { ok: true } | { ok: false; error: string };

const top5Schema = z.array(z.string().uuid()).max(5);
const bioSchema = z.object({
  bio: z.string().trim().max(140).optional().default(""),
});

export async function saveTop5(formData: FormData): Promise<SaveResult> {
  const raw = formData.get("top5");
  const rawStr = typeof raw === "string" ? raw : "[]";
  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(rawStr);
  } catch {
    return { ok: false, error: "Datos inválidos" };
  }
  const parsed = top5Schema.safeParse(parsedJson);
  if (!parsed.success) return { ok: false, error: "Datos inválidos" };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "No autenticado" };

  // Verify the user actually owns each unlock referenced in top5.
  // Without this guard, a malicious client could pin any achievement.
  if (parsed.data.length > 0) {
    const { data: ownedRows } = await supabase
      .from("unlocks")
      .select("achievement_id")
      .eq("user_id", user.id)
      .in("achievement_id", parsed.data)
      .returns<{ achievement_id: string }[]>();
    const ownedSet = new Set((ownedRows ?? []).map((r) => r.achievement_id));
    const allOwned = parsed.data.every((id) => ownedSet.has(id));
    if (!allOwned) return { ok: false, error: "Solo puedes anclar logros que tengas" };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ top5: parsed.data })
    .eq("id", user.id);
  if (error) {
    console.error("saveTop5 update error", error);
    return { ok: false, error: "No se pudo guardar" };
  }

  // Look up username for the public profile path
  const { data: profileRow } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .returns<{ username: string }[]>()
    .maybeSingle();

  revalidatePath("/yo");
  if (profileRow?.username) revalidatePath(`/u/${profileRow.username}`);
  return { ok: true };
}

export async function saveBio(formData: FormData): Promise<SaveResult> {
  const parsed = bioSchema.safeParse({ bio: formData.get("bio") });
  if (!parsed.success) return { ok: false, error: "Datos inválidos" };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "No autenticado" };

  const value = parsed.data.bio.length === 0 ? null : parsed.data.bio;
  const { error } = await supabase
    .from("profiles")
    .update({ bio: value })
    .eq("id", user.id);
  if (error) {
    console.error("saveBio update error", error);
    return { ok: false, error: "No se pudo guardar" };
  }

  const { data: profileRow } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .returns<{ username: string }[]>()
    .maybeSingle();

  revalidatePath("/yo");
  if (profileRow?.username) revalidatePath(`/u/${profileRow.username}`);
  return { ok: true };
}

export async function deleteAccount(): Promise<never> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/");
  }

  // Profiles row CASCADE-deletes the user's unlocks, stories, replies, reactions.
  // reports.reporter_id is SET NULL (per the M1 fix migration).
  const { error: delErr } = await supabase
    .from("profiles")
    .delete()
    .eq("id", user.id);
  if (delErr) {
    console.error("deleteAccount profile delete error", delErr);
    redirect("/yo?error=delete_failed");
  }

  await supabase.auth.signOut();
  redirect("/");
}
