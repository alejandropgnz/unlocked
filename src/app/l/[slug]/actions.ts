"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { adjudicateSchema } from "@/lib/validators";
import type { Database } from "@/types/database";

export type AdjudicateResult =
  | { ok: true; unlockId: string; storyId: string | null }
  | { ok: false; error: string };

type UnlockInsertRow = Pick<
  Database["public"]["Tables"]["unlocks"]["Row"],
  "id" | "achievement_id"
>;

type StoryInsertRow = Pick<
  Database["public"]["Tables"]["stories"]["Row"],
  "id"
>;

export async function adjudicateAction(formData: FormData): Promise<AdjudicateResult> {
  const parsed = adjudicateSchema.safeParse({
    achievementId: formData.get("achievementId"),
    story: formData.get("story") ?? "",
  });
  if (!parsed.success) return { ok: false, error: "Datos inválidos" };

  const slug = formData.get("slug");
  const slugStr = typeof slug === "string" ? slug : null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "No estás logueado" };

  const { data: unlock, error: unlockErr } = await supabase
    .from("unlocks")
    .insert({ user_id: user.id, achievement_id: parsed.data.achievementId })
    .select("id, achievement_id")
    .returns<UnlockInsertRow[]>()
    .single();

  if (unlockErr) {
    if (unlockErr.code === "23505") return { ok: false, error: "Ya tienes este logro" };
    console.error("adjudicate insert unlock error", unlockErr);
    return { ok: false, error: "No se pudo adjudicar" };
  }

  let storyId: string | null = null;
  const story = parsed.data.story?.trim();
  if (story && story.length > 0) {
    const { data: storyRow, error: storyErr } = await supabase
      .from("stories")
      .insert({
        unlock_id: unlock.id,
        user_id: user.id,
        achievement_id: unlock.achievement_id,
        body: story,
      })
      .select("id")
      .returns<StoryInsertRow[]>()
      .single();

    if (storyErr) {
      console.error("adjudicate insert story error", storyErr);
      // Unlock is already created — degrade gracefully, swallow story error.
    } else {
      storyId = storyRow.id;
    }
  }

  if (slugStr) revalidatePath(`/l/${slugStr}`);

  return { ok: true, unlockId: unlock.id, storyId };
}
