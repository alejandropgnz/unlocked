import { NextResponse } from "next/server";
import { z } from "zod";
import { logEvent } from "@/lib/analytics";

const schema = z.object({
  name: z.string().min(1).max(64),
  properties: z.record(z.string(), z.unknown()).optional(),
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
  await logEvent(parsed.data.name, parsed.data.properties ?? {});
  return NextResponse.json({ ok: true });
}
