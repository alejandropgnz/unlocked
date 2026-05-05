import { useState } from "react";
import { X, Eye } from "lucide-react";
import { AchievementCard, type AchievementCardProps } from "./AchievementCard";
import { useDeleteUnlock } from "@/hooks/useDeleteUnlock";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";

/**
 * Wrapper around AchievementCard for the user's own profile. On hover (or
 * focus), it dims the card and surfaces two affordances:
 *   - X (top-right, red) — delete from collection. Confirms first, then
 *     removes the unlock and passes the achievement so /descubrir doesn't
 *     resurface it.
 *   - Ver (centered) — visible cue that the card itself navigates. The
 *     underlying AchievementCard's <Link> still handles navigation; the
 *     centered button is purely decorative for the hover state.
 *
 * On touch devices `:hover` is sticky / unreliable, so the X is also
 * shown at reduced opacity by default and goes full-strength on focus.
 */
export function OwnedAchievementCard({
  achievementId,
  ...cardProps
}: AchievementCardProps & { achievementId: string }) {
  const deleteMut = useDeleteUnlock();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirm = () => {
    deleteMut.mutate(achievementId, {
      onSuccess: () => setConfirmOpen(false),
    });
  };

  return (
    // max-w must match the inner AchievementCard's size cap (md = 200px) so
    // the hover overlay + X badge stay aligned with the actual card edge.
    // h-full so the wrapper stretches with the grid row, keeping cards in
    // the same row visually equal-height even if titles vary in length.
    <div className="relative group w-full max-w-[200px] h-full">
      <AchievementCard {...cardProps} />

      {/* Hover overlay — dims the card and surfaces the "Ver" cue. Sits
          ABOVE the card content (z-10) but is pointer-events-none so the
          underlying Link still receives clicks (navigates to the
          achievement). */}
      <div
        className="absolute inset-[2px] rounded-[16px] bg-black/60 opacity-0 group-hover:opacity-100 transition pointer-events-none flex items-center justify-center z-10"
        aria-hidden
      >
        <span className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5" strokeWidth={2.5} />
          Ver
        </span>
      </div>

      {/* Delete button — sits ABOVE the Link with z-20 + its own click
          handler that does NOT bubble to the Link (prevent + stop). The
          button is a sibling of <AchievementCard> in the wrapper div, so
          there's no nested-anchor HTML issue. */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setConfirmOpen(true);
        }}
        disabled={deleteMut.isPending}
        className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red text-white flex items-center justify-center shadow-lg ring-2 ring-bg z-20 opacity-0 group-hover:opacity-100 focus:opacity-100 transition disabled:opacity-50"
        aria-label="Eliminar de mi colección"
      >
        <X className="w-4 h-4" strokeWidth={3} />
      </button>

      {/* Confirm modal — destructive action, wants explicit yes. */}
      <Modal open={confirmOpen} onClose={() => !deleteMut.isPending && setConfirmOpen(false)}>
        <h3 className="text-xl font-black tracking-tighter">Eliminar logro</h3>
        <p className="text-muted text-sm mt-2">
          Va a salir de tu colección y no volverá a aparecer en Descubrir.
          Puedes recuperarlo desbloqueándolo otra vez si cambia de idea.
        </p>
        <div className="mt-5 flex gap-3">
          <Button
            variant="ghost"
            size="block"
            onClick={() => setConfirmOpen(false)}
            disabled={deleteMut.isPending}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            size="block"
            onClick={handleConfirm}
            disabled={deleteMut.isPending}
          >
            {deleteMut.isPending ? "..." : "Eliminar"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
