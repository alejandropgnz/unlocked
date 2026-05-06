import { useEffect, useState } from "react";
import {
  useAdminPending,
  useAdminReports,
  useApproveAchievement,
  useRejectAchievement,
  useResolveReport,
  useDismissReport,
  useAdminCatalog,
  type CatalogItem,
} from "@/hooks/useAdmin";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { CATEGORIES } from "@/components/CategoryPicker";
import { EditAchievementModal } from "@/components/EditAchievementModal";
import type { AchievementCategory, AchievementStatus } from "@/hooks/types";

const PAGE_SIZE = 50;

export default function Admin() {
  const [tab, setTab] = useState<"pending" | "reports" | "catalog">("pending");
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
    <section className="px-4 md:px-8 max-w-5xl mx-auto py-8">
      <h1 className="text-3xl font-black tracking-tighter">Admin</h1>
      <div className="mt-4 flex gap-2 flex-wrap">
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
        <button
          type="button"
          onClick={() => setTab("catalog")}
          className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest transition ${tab === "catalog" ? "bg-white text-bg" : "bg-surface hover:bg-surface/70"}`}
        >
          Catálogo
        </button>
      </div>

      {tab === "pending" && (
        <div className="mt-6 space-y-4">
          {pending.length === 0 && <p className="text-muted">Cola vacía.</p>}
          {pending.map((p, i) => (
            <div
              key={p.id}
              className={`bg-surface rounded-2xl p-5 ${i === cursor ? "ring-2 ring-indigo" : ""}`}
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
                  variant="indigo"
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
                <Button variant="indigo" onClick={() => resolveMut.mutate(r.id)}>
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

      {tab === "catalog" && <CatalogTab />}
    </section>
  );
}

/* ─────────────────── catalog tab — lives in same file because it ──────
 * shares no state with the other tabs and is simple enough that
 * splitting it adds more boilerplate than it saves.
 * ────────────────────────────────────────────────────────────────────── */

function CatalogTab() {
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [category, setCategory] = useState<AchievementCategory | "">("");
  const [status, setStatus] = useState<AchievementStatus | "">("");
  const [page, setPage] = useState(0);
  const [editing, setEditing] = useState<CatalogItem | null>(null);

  // Debounce search input so we don't fire a query on every keystroke.
  // 300ms balances responsiveness vs. server load — fast enough that the
  // user feels the typing is "live", slow enough to skip noise.
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQ(q), 300);
    return () => clearTimeout(timer);
  }, [q]);

  // Reset to page 0 whenever filters change — otherwise you can land on
  // a non-existent page (e.g. filtered down to 5 results while on page 3).
  useEffect(() => {
    setPage(0);
  }, [debouncedQ, category, status]);

  const catalogQ = useAdminCatalog({
    q: debouncedQ,
    category,
    status,
    page,
    pageSize: PAGE_SIZE,
  });

  const rows = catalogQ.data?.rows ?? [];
  const totalCount = catalogQ.data?.totalCount ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <div className="mt-6">
      {/* Filters bar */}
      <div className="bg-surface rounded-2xl p-4 mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por título…"
          className="bg-bg border border-white/10 rounded-xl p-3 text-sm focus:border-indigo focus:outline-none"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as AchievementCategory | "")}
          className="bg-bg border border-white/10 rounded-xl p-3 text-sm focus:border-indigo focus:outline-none"
        >
          <option value="">Todas las categorías</option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.emoji} {c.label}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as AchievementStatus | "")}
          className="bg-bg border border-white/10 rounded-xl p-3 text-sm focus:border-indigo focus:outline-none"
        >
          <option value="">Todos los estados</option>
          <option value="approved">Aprobados</option>
          <option value="pending">Pendientes</option>
          <option value="rejected">Rechazados</option>
        </select>
      </div>

      {/* Result count + pagination header */}
      <div className="flex justify-between items-center mb-3 text-xs text-muted">
        <span>
          {catalogQ.isLoading
            ? "Cargando..."
            : `${totalCount.toLocaleString("es-ES")} resultados`}
        </span>
        <span className="font-mono">
          Página {page + 1} de {totalPages}
        </span>
      </div>

      {/* Loading skeleton on first load only — stale data stays visible
          during pagination thanks to placeholderData on the query. */}
      {catalogQ.isLoading && rows.length === 0 && (
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!catalogQ.isLoading && rows.length === 0 && (
        <p className="text-muted text-sm py-8 text-center">
          Sin resultados. Prueba a relajar los filtros.
        </p>
      )}

      {/* Rows */}
      <ul className="space-y-2">
        {rows.map((row) => (
          <li key={row.id}>
            <button
              type="button"
              onClick={() => setEditing(row)}
              className="w-full bg-surface hover:bg-surface/70 rounded-xl p-3 text-left flex items-center gap-3 transition"
            >
              <div className="text-3xl shrink-0">{row.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="font-black text-sm leading-tight tracking-tight truncate">
                  {row.title}
                </div>
                {row.description && (
                  <div className="text-xs text-muted italic truncate mt-0.5">
                    {row.description}
                  </div>
                )}
                <div className="text-[10px] text-muted font-mono uppercase tracking-widest mt-1">
                  {row.category} · {row.unlock_count} unlocks
                </div>
              </div>
              <StatusBadge status={row.status} />
            </button>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex gap-2 justify-center">
          <Button
            variant="ghost"
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
          >
            ← Anterior
          </Button>
          <Button
            variant="ghost"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
            disabled={page >= totalPages - 1}
          >
            Siguiente →
          </Button>
        </div>
      )}

      {/* Edit modal */}
      <EditAchievementModal
        open={!!editing}
        onClose={() => setEditing(null)}
        item={editing}
      />
    </div>
  );
}

function StatusBadge({ status }: { status: AchievementStatus }) {
  // Compact pill that's readable at a glance during scanning. Color
  // coded to match the rest of the design system.
  const config: Record<AchievementStatus, { label: string; className: string }> = {
    approved: { label: "OK", className: "bg-indigo/20 text-indigo" },
    pending: { label: "Pendiente", className: "bg-violet/20 text-violet" },
    rejected: { label: "Oculto", className: "bg-red/20 text-red" },
  };
  const c = config[status];
  return (
    <span
      className={`shrink-0 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${c.className}`}
    >
      {c.label}
    </span>
  );
}
