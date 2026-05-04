import { useEffect, useState } from "react";
import {
  useAdminPending,
  useAdminReports,
  useApproveAchievement,
  useRejectAchievement,
  useResolveReport,
  useDismissReport,
} from "@/hooks/useAdmin";
import { Button } from "@/components/ui/Button";

export default function Admin() {
  const [tab, setTab] = useState<"pending" | "reports">("pending");
  const [cursor, setCursor] = useState(0);

  const pendingQ = useAdminPending();
  const reportsQ = useAdminReports();
  const approveMut = useApproveAchievement();
  const rejectMut = useRejectAchievement();
  const resolveMut = useResolveReport();
  const dismissMut = useDismissReport();

  const pending = pendingQ.data ?? [];
  const reports = reportsQ.data ?? [];

  useEffect(() => {
    if (tab !== "pending" || pending.length === 0) return;
    const handler = (e: KeyboardEvent) => {
      const item = pending[cursor];
      if (!item) return;
      const key = e.key.toLowerCase();
      if (key === "a") approveMut.mutate(item.id);
      else if (key === "r") rejectMut.mutate(item.id);
      else if (key === "j") setCursor((c) => Math.min(c + 1, pending.length - 1));
      else if (key === "k") setCursor((c) => Math.max(c - 1, 0));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [pending, cursor, tab, approveMut, rejectMut]);

  return (
    <section className="px-4 md:px-8 max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-black tracking-tighter">Admin</h1>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => setTab("pending")}
          className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest transition ${tab === "pending" ? "bg-white text-bg" : "bg-surface hover:bg-surface/70"}`}
        >
          Logros pendientes ({pending.length})
        </button>
        <button
          type="button"
          onClick={() => setTab("reports")}
          className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest transition ${tab === "reports" ? "bg-white text-bg" : "bg-surface hover:bg-surface/70"}`}
        >
          Reports ({reports.length})
        </button>
      </div>

      {tab === "pending" && (
        <div className="mt-6 space-y-4">
          {pending.length === 0 && <p className="text-muted">Cola vacía.</p>}
          {pending.map((p, i) => (
            <div
              key={p.id}
              className={`bg-surface rounded-2xl p-5 ${i === cursor ? "ring-2 ring-gold" : ""}`}
            >
              <div className="flex items-start gap-3">
                <div className="text-4xl">{p.emoji}</div>
                <div className="flex-1">
                  <div className="font-black">{p.title}</div>
                  <div className="text-xs text-muted mt-2">
                    @{p.proposerUsername ?? "?"} · {p.category}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button
                  variant="gold"
                  onClick={() => {
                    setCursor(i);
                    approveMut.mutate(p.id);
                  }}
                >
                  [A] Aprobar
                </Button>
                <Button
                  variant="dangerSoft"
                  onClick={() => {
                    setCursor(i);
                    rejectMut.mutate(p.id);
                  }}
                >
                  [R] Rechazar
                </Button>
              </div>
            </div>
          ))}
          {pending.length > 0 && (
            <p className="text-xs text-muted">
              Atajos: A = aprobar · R = rechazar · J/K = mover cursor
            </p>
          )}
        </div>
      )}

      {tab === "reports" && (
        <div className="mt-6 space-y-4">
          {reports.length === 0 && <p className="text-muted">Sin reports abiertos.</p>}
          {reports.map((r) => (
            <div key={r.id} className="bg-surface rounded-2xl p-5">
              <div className="text-xs text-muted">
                @{r.reporterUsername ?? "?"} reportó {r.targetType} {r.targetId.slice(0, 8)}…
              </div>
              <div className="font-bold mt-2">Motivo: {r.reason}</div>
              {r.notes && <p className="text-sm mt-2 text-muted">{r.notes}</p>}
              <div className="mt-3 flex gap-2">
                <Button variant="gold" onClick={() => resolveMut.mutate(r.id)}>
                  Resolver
                </Button>
                <Button variant="ghost" onClick={() => dismissMut.mutate(r.id)}>
                  Descartar
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
