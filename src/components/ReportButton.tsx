import { useState } from "react";
import { useReport } from "@/hooks/useReport";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { Textarea } from "./ui/Textarea";

const REASONS = [
  { value: "spam", label: "Spam" },
  { value: "ofensivo", label: "Ofensivo" },
  { value: "datos_personales", label: "Datos personales" },
  { value: "otro", label: "Otro" },
] as const;

type Reason = (typeof REASONS)[number]["value"];

export function ReportButton({
  targetType,
  targetId,
}: {
  targetType: "achievement" | "story" | "reply" | "profile";
  targetId: string;
}) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<Reason>("ofensivo");
  const [notes, setNotes] = useState("");
  const reportMut = useReport();

  const handleSubmit = () => {
    reportMut.mutate(
      { targetType, targetId, reason, notes: notes.trim() || undefined },
      {
        onSuccess: () => {
          setOpen(false);
          setNotes("");
          setReason("ofensivo");
        },
      },
    );
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs text-muted hover:text-red transition"
      >
        Reportar
      </button>
      <Modal open={open} onClose={() => setOpen(false)} className="max-w-sm">
        <h3 className="font-black tracking-tighter mb-3">Reportar</h3>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value as Reason)}
          className="w-full bg-bg border border-white/10 rounded-xl p-3 text-sm focus:border-gold focus:outline-none"
        >
          {REASONS.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
        <div className="mt-2">
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="(opcional) Detalles"
            maxLength={500}
            rows={2}
            showCounter
          />
        </div>
        <div className="mt-3 flex gap-2">
          <Button
            variant="ghost"
            size="block"
            onClick={() => setOpen(false)}
            disabled={reportMut.isPending}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            size="block"
            onClick={handleSubmit}
            disabled={reportMut.isPending}
          >
            {reportMut.isPending ? "..." : "Enviar"}
          </Button>
        </div>
      </Modal>
    </>
  );
}
