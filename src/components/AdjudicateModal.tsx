import { useState } from "react";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";
import { useAuth } from "@/contexts/AuthContext";
import { useAdjudicate } from "@/hooks/useAdjudicate";
import { trackEvent } from "@/hooks/useTrack";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { Textarea } from "./ui/Textarea";
import { ShareCardModal } from "./ShareCardModal";

interface Props {
  achievementId: string;
  slug: string;
  title: string;
  rarityPercent: number;
  alreadyUnlocked: boolean;
}

export function AdjudicateModal({
  achievementId,
  slug,
  title,
  rarityPercent,
  alreadyUnlocked,
}: Props) {
  const { user, profile } = useAuth();
  const adjudicateMut = useAdjudicate();
  const [open, setOpen] = useState(false);
  const [story, setStory] = useState("");
  const [done, setDone] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [unlockId, setUnlockId] = useState<string | null>(null);

  if (!user) {
    return (
      <Link
        to={`/login?next=${encodeURIComponent(`/l/${slug}`)}`}
        className="mt-8 w-full md:w-auto md:px-12 py-4 bg-white text-bg font-black rounded-full text-sm tracking-widest uppercase inline-block text-center hover:bg-gold transition"
      >
        Adjudicar
      </Link>
    );
  }

  if (alreadyUnlocked && !done) {
    return (
      <Button variant="gold" size="lg" disabled className="mt-8">
        ✓ Ya lo tienes
      </Button>
    );
  }

  const handleSubmit = () => {
    adjudicateMut.mutate(
      { achievementId, story },
      {
        onSuccess: (data) => {
          setDone(true);
          setOpen(false);
          setUnlockId(data.unlockId);
          try {
            confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
          } catch {
            // ignore
          }
          void trackEvent("achievement_unlocked", { achievementId });
        },
      },
    );
  };

  if (done) {
    return (
      <>
        <div className="mt-8 p-6 bg-surface rounded-2xl border border-gold/30">
          <div className="text-2xl font-black tracking-tighter">¡Desbloqueado! 🎉</div>
          <p className="text-muted mt-2 text-sm">Ya forma parte de tu colección.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {unlockId && profile?.username && (
              <Button variant="primary" size="md" onClick={() => setShareOpen(true)}>
                Compartir card
              </Button>
            )}
            {profile?.username && (
              <Link
                to={`/u/${profile.username}`}
                className="px-4 py-2 border border-white/20 rounded-full text-sm hover:border-gold transition self-center"
              >
                Ver mi perfil
              </Link>
            )}
          </div>
        </div>
        {unlockId && profile?.username && (
          <ShareCardModal
            open={shareOpen}
            onClose={() => setShareOpen(false)}
            data={{
              kind: "unlock",
              username: profile.username,
              slug,
              title,
              rarityPercent,
            }}
          />
        )}
      </>
    );
  }

  return (
    <>
      <Button variant="primary" size="lg" onClick={() => setOpen(true)} className="mt-8">
        Adjudicar
      </Button>
      <Modal open={open} onClose={() => !adjudicateMut.isPending && setOpen(false)}>
        <h3 className="text-xl font-black tracking-tighter">Adjudicar logro</h3>
        <p className="text-muted text-sm mt-2">¿Quieres contar la historia? (opcional)</p>
        <div className="mt-3">
          <Textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            maxLength={1000}
            rows={5}
            placeholder="Cuenta cómo pasó..."
            showCounter
          />
        </div>
        <div className="mt-4 flex gap-3">
          <Button
            variant="ghost"
            size="block"
            onClick={() => setOpen(false)}
            disabled={adjudicateMut.isPending}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            size="block"
            onClick={handleSubmit}
            disabled={adjudicateMut.isPending}
          >
            {adjudicateMut.isPending ? "..." : "Confirmar"}
          </Button>
        </div>
      </Modal>
    </>
  );
}
