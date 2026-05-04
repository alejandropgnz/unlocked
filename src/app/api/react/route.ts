import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  targetType: z.enum(["story", "reply"]),
  targetId: z.string().uuid(),
  value: z.union([z.literal(1), z.literal(-1), z.literal(0)]),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "bad request" }, { status: 400 });

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  if (parsed.data.value === 0) {
    const { error } = await supabase
      .from("reactions")
      .delete()
      .eq("user_id", user.id)
      .eq("target_type", parsed.data.targetType)
      .eq("target_id", parsed.data.targetId);
    if (error) return NextResponse.json({ error: "delete failed" }, { status: 500 });
  } else {
    const { error } = await supabase.from("reactions").upsert(
      {
        user_id: user.id,
        target_type: parsed.data.targetType,
        target_id: parsed.data.targetId,
        value: parsed.data.value,
      },
      { onConflict: "user_id,target_type,target_id" },
    );
    if (error) return NextResponse.json({ error: "upsert failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
