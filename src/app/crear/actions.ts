"use server";

import { createClient } from "@/lib/supabase/server";
import { proposeAchievementSchema } from "@/lib/validators";
import { containsBlockedWord, isDuplicateTitle } from "@/lib/moderation";
import { slugify } from "@/lib/slug";
import { logEvent } from "@/lib/analytics";

export type ProposeResult = { ok: true } | { ok: false; error: string };

export async function proposeAchievement(formData: FormData): Promise<ProposeResult> {
  const parsed = proposeAchievementSchema.safeParse({
    title: formData.get("title"),
    emoji: formData.get("emoji"),
    description: formData.get("description"),
    category: formData.get("category"),
  });
  if (!parsed.success) return { ok: false, error: "Datos inválidos" };

  if (
    containsBlockedWord(parsed.data.title) ||
    containsBlockedWord(parsed.data.description)
  ) {
    return { ok: false, error: "Texto contiene palabras prohibidas" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "No estás logueado" };

  // Rate limit: max 3 per 24h
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count } = await supabase
    .from("achievements")
    .select("id", { count: "exact", head: true })
    .eq("created_by", user.id)
    .eq("status", "pending")
    .gte("created_at", since);
  if ((count ?? 0) >= 3) {
    return { ok: false, error: "Máximo 3 propuestas por día" };
  }

  // Duplicate detection (against approved set only)
  const { data: existing } = await supabase
    .from("achievements")
    .select("title")
    .eq("status", "approved")
    .returns<{ title: string }[]>();
  if (
    isDuplicateTitle(
      parsed.data.title,
      (existing ?? []).map((e) => e.title),
    )
  ) {
    return { ok: false, error: "Ya existe un logro muy parecido" };
  }

  const slug = slugify(parsed.data.title);
  if (slug.length === 0) {
    return { ok: false, error: "El título no produce un slug válido" };
  }

  const { error } = await supabase.from("achievements").insert({
    slug,
    title: parsed.data.title,
    emoji: parsed.data.emoji,
    description: parsed.data.description,
    category: parsed.data.category,
    created_by: user.id,
    status: "pending",
  });

  if (error) {
    if (error.code === "23505") return { ok: false, error: "Ese título ya existe" };
    console.error("propose insert error", error);
    return { ok: false, error: "No se pudo crear" };
  }

  await logEvent("achievement_proposed", { title: parsed.data.title });

  return { ok: true };
}
