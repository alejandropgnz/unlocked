import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminQueue, type PendingItem, type ReportItem } from "./admin-queue";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/admin");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .returns<{ is_admin: boolean }[]>()
    .maybeSingle();
  if (!profile?.is_admin) redirect("/");

  type PendingRow = {
    id: string;
    title: string;
    emoji: string;
    description: string | null;
    category: string;
    profiles: { username: string } | null;
  };

  const { data: pendingRaw } = await supabase
    .from("achievements")
    .select(
      "id, title, emoji, description, category, profiles!achievements_created_by_fkey(username)",
    )
    .eq("status", "pending")
    .order("created_at", { ascending: true })
    .returns<PendingRow[]>();

  type ReportRow = {
    id: string;
    target_type: string;
    target_id: string;
    reason: string;
    notes: string | null;
    created_at: string;
    profiles: { username: string } | null;
  };

  const { data: reportsRaw } = await supabase
    .from("reports")
    .select(
      "id, target_type, target_id, reason, notes, created_at, profiles!reports_reporter_id_fkey(username)",
    )
    .eq("status", "open")
    .order("created_at", { ascending: true })
    .returns<ReportRow[]>();

  const pending: PendingItem[] = (pendingRaw ?? []).map((p) => ({
    id: p.id,
    title: p.title,
    emoji: p.emoji,
    description: p.description,
    category: p.category,
    proposerUsername: p.profiles?.username ?? null,
  }));

  const reports: ReportItem[] = (reportsRaw ?? []).map((r) => ({
    id: r.id,
    targetType: r.target_type,
    targetId: r.target_id,
    reason: r.reason,
    notes: r.notes,
    createdAt: r.created_at,
    reporterUsername: r.profiles?.username ?? null,
  }));

  return (
    <main className="min-h-screen">
      <section className="px-4 md:px-8 max-w-3xl mx-auto py-8">
        <h1 className="text-3xl font-black tracking-tighter">Admin</h1>
        <AdminQueue pending={pending} reports={reports} />
      </section>
    </main>
  );
}
