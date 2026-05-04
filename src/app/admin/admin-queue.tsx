"use client";

import { useEffect, useState, useTransition } from "react";
import {
  approveAchievement,
  rejectAchievement,
  dismissReport,
  resolveReport,
} from "./actions";

export interface PendingItem {
  id: string;
  title: string;
  emoji: string;
  description: string | null;
  category: string;
  proposerUsername: string | null;
}

export interface ReportItem {
  id: string;
  targetType: string;
  targetId: string;
  reason: string;
  notes: string | null;
  createdAt: string;
  reporterUsername: string | null;
}

export function AdminQueue({
  pending,
  reports,
}: {
  pending: PendingItem[];
  reports: ReportItem[];
}) {
  const [tab, setTab] = useState<"pending" | "reports">("pending");
  const [cursor, setCursor] = useState(0);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (tab !== "pending" || pending.length === 0) return;
    const handler = (e: KeyboardEvent) => {
      const item = pending[cursor];
      if (!item) return;
      const key = e.key.toLowerCase();
      if (key === "a") {
        startTransition(() => {
          approveAchievement(item.id);
        });
      } else if (key === "r") {
        startTransition(() => {
          rejectAchievement(item.id);
        });
      } else if (key === "j") {
        setCursor((c) => Math.min(c + 1, pending.length - 1));
      } else if (key === "k") {
        setCursor((c) => Math.max(c - 1, 0));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [pending, cursor, tab]);

  return (
    <>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setTab("pending")}
          className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest transition ${tab === "pending" ? "bg-white text-bg" : "bg-surface hover:bg-surface/70"}`}
        >
          Logros pendientes ({pending.length})
        </button>
        <button
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
                  {p.description && (
                    <div className="text-muted text-sm mt-1">{p.description}</div>
                  )}
                  <div className="text-xs text-muted mt-2">
                    @{p.proposerUsername ?? "?"} · {p.category}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => {
                    setCursor(i);
                    startTransition(() => {
                      approveAchievement(p.id);
                    });
                  }}
                  className="px-4 py-2 bg-gold/20 text-gold font-black rounded-full text-xs uppercase tracking-widest hover:bg-gold/30 transition"
                >
                  [A] Aprobar
                </button>
                <button
                  onClick={() => {
                    setCursor(i);
                    startTransition(() => {
                      rejectAchievement(p.id);
                    });
                  }}
                  className="px-4 py-2 bg-red/20 text-red font-black rounded-full text-xs uppercase tracking-widest hover:bg-red/30 transition"
                >
                  [R] Rechazar
                </button>
              </div>
            </div>
          ))}
          {pending.length > 0 && (
            <p className="text-xs text-muted">
              Atajos: A = aprobar · R = rechazar · J/K = mover cursor.
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
                <button
                  onClick={() => startTransition(() => { resolveReport(r.id); })}
                  className="px-4 py-2 bg-gold/20 text-gold font-black rounded-full text-xs uppercase tracking-widest hover:bg-gold/30 transition"
                >
                  Resolver
                </button>
                <button
                  onClick={() => startTransition(() => { dismissReport(r.id); })}
                  className="px-4 py-2 bg-muted/20 text-muted font-black rounded-full text-xs uppercase tracking-widest hover:bg-muted/30 transition"
                >
                  Descartar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
