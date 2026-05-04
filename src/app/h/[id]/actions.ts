"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { replySchema } from "@/lib/validators";

export type PostReplyResult = { ok: true } | { ok: false; error: string };

export async function postReply(formData: FormData): Promise<PostReplyResult> {
  const parsed = replySchema.safeParse({
    storyId: formData.get("storyId"),
    body: formData.get("body"),
  });
  if (!parsed.success) return { ok: false, error: "Datos inválidos" };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "No estás logueado" };

  const { error } = await supabase.from("replies").insert({
    story_id: parsed.data.storyId,
    user_id: user.id,
    body: parsed.data.body,
  });
  if (error) {
    console.error("postReply insert error", error);
    return { ok: false, error: "No se pudo publicar" };
  }

  revalidatePath(`/h/${parsed.data.storyId}`);
  return { ok: true };
}
