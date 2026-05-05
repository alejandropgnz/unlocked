import { useEffect, useMemo, useState } from "react";
import { useJoinWaitlist } from "@/hooks/useJoinWaitlist";
import { LaunchDate } from "@/components/CountdownTimer";
import { LandingMiniSwipe, type MiniCard } from "@/components/LandingMiniSwipe";
import { LAUNCH_DATE } from "@/lib/launch";
import { Wordmark } from "@/components/Wordmark";
import { cn } from "@/lib/cn";

const SAMPLE_CARDS: MiniCard[] = [
  {
    id: "sample-1",
    emoji: "🚬",
    title: "Mi padre se fue a por tabaco y no volvió",
    rarityPercent: 0.04,
    category: "familia",
  },
  {
    id: "sample-2",
    emoji: "💼",
    title: "He llorado en el baño de la oficina",
    rarityPercent: 8.4,
    category: "trabajo",
  },
  {
    id: "sample-3",
    emoji: "📱",
    title: "He stalkeado a mi ex en modo incógnito a las 3am",
    rarityPercent: 22.7,
    category: "relaciones",
  },
];

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState<null | "new" | "already">(null);
  const joinMut = useJoinWaitlist();

  // Format the launch date as a readable Spanish phrase, e.g.
  // "viernes 22 de mayo · 18:00 CET"
  const launchLabel = useMemo(() => {
    const d = LAUNCH_DATE;
    const day = d.toLocaleDateString("es-ES", { weekday: "long" });
    const dayNum = d.getDate();
    const month = d.toLocaleDateString("es-ES", { month: "long" });
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${day} ${dayNum} de ${month} · ${hh}:${mm} CET`;
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    joinMut.mutate(email, {
      onSuccess: ({ alreadyOnList }) => {
        setDone(alreadyOnList ? "already" : "new");
      },
    });
  };

  // Move focus into the input on mount on desktop only — annoying on mobile.
  useEffect(() => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      const el = document.getElementById("waitlist-email");
      el?.focus();
    }
  }, []);

  return (
    <div className="min-h-screen min-h-[100dvh] bg-bg text-white flex flex-col">
      {/* Top bar — wordmark only, centered on mobile, left-aligned on desktop */}
      <header className="px-4 sm:px-6 lg:px-8 pt-6 md:pt-8 pb-2 flex justify-center md:justify-start">
        <Wordmark size="md" />
      </header>

      {/* Hero + countdown + form */}
      <section className="flex-1 px-4 sm:px-6 lg:px-8 py-8 md:py-16 max-w-3xl mx-auto w-full">
        <div className="text-center">
          <p className="text-[10px] sm:text-xs uppercase tracking-[3px] text-gold font-bold mb-4">
            Próximamente · 1.875 logros · todo en español
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-[1.05]">
            Deja de trackear hábitos.
            <br />
            <span className="text-gold">Empieza a coleccionar</span>
            <br />
            tus logros absurdos.
          </h1>
          <p className="text-muted text-sm sm:text-base mt-5 max-w-xl mx-auto">
            La primera red de logros reales. <em>"Mi padre se fue a por tabaco
            y no volvió"</em>, <em>"1 finde sin dormir"</em>, <em>"vomité en
            la cena de empresa"</em>. ¿Soy yo o eres tú?
          </p>
        </div>

        {/* Countdown */}
        <div className="mt-10 md:mt-14">
          <LaunchDate target={LAUNCH_DATE} />
          <p className="text-center text-xs text-muted uppercase tracking-widest mt-3">
            {launchLabel}
          </p>
        </div>

        {/* Email capture */}
        <div className="mt-10 md:mt-14 max-w-md mx-auto">
          {done ? (
            <div className="text-center bg-surface border border-gold/30 rounded-2xl p-6">
              <div className="text-5xl mb-2">📬</div>
              <p className="text-base sm:text-lg font-black tracking-tight">
                {done === "already"
                  ? "Ya estabas en la lista."
                  : "Te tenemos."}
              </p>
              <p className="text-muted text-sm mt-2">
                Te avisaremos el {launchLabel.split(" · ")[0]} a las{" "}
                {launchLabel.split(" · ")[1]?.split(" ")[0]}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={120}
                  className="flex-1 bg-surface border border-white/10 rounded-full px-5 py-3.5 text-sm focus:border-gold focus:outline-none placeholder:text-muted"
                />
                <button
                  type="submit"
                  disabled={joinMut.isPending || email.trim().length < 5}
                  className={cn(
                    "rounded-full px-6 py-3.5 font-black tracking-widest text-xs uppercase transition",
                    "bg-white text-bg hover:bg-gold disabled:opacity-50 disabled:cursor-not-allowed",
                  )}
                >
                  {joinMut.isPending ? "..." : "Avísame"}
                </button>
              </div>
              <p className="text-center text-[11px] text-muted">
                Solo te escribiremos el día del lanzamiento. Cero spam.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Mini-swipe demo */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12 md:pb-20 max-w-3xl mx-auto w-full">
        <div className="border-t border-white/5 pt-12 md:pt-16">
          <div className="text-center mb-8">
            <p className="text-[10px] uppercase tracking-[3px] text-muted">
              · Pruébalo ·
            </p>
            <h2 className="text-xl sm:text-2xl font-black tracking-tighter mt-2">
              Desliza si te identificas, ignora si no.
            </h2>
          </div>
          <LandingMiniSwipe cards={SAMPLE_CARDS} />
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 lg:px-8 py-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted">
          <span>Hecho en España · 2026</span>
          <a href="/legal" className="hover:text-white transition">
            Privacidad
          </a>
        </div>
      </footer>
    </div>
  );
}
