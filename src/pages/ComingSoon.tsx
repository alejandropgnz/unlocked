import { useEffect, useMemo, useState } from "react";
import { useJoinWaitlist } from "@/hooks/useJoinWaitlist";
import { LaunchDate } from "@/components/CountdownTimer";
import { LandingMiniSwipe, type MiniCard } from "@/components/LandingMiniSwipe";
import { FloatingCards } from "@/components/FloatingCards";
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

  useEffect(() => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      const el = document.getElementById("waitlist-email");
      el?.focus();
    }
  }, []);

  return (
    <div className="min-h-screen min-h-[100dvh] bg-bg text-white flex flex-col relative overflow-hidden">
      {/* No background gradient. Floating cards + foil-gradient title carry
          the visual weight; the page itself stays plain dark so nothing
          reads as "fade". */}

      {/* Wordmark — minimal, doesn't compete with the hero */}
      <header className="relative z-10 px-4 sm:px-6 lg:px-8 pt-5 md:pt-7 pb-2 flex justify-center md:justify-start shrink-0">
        <Wordmark size="md" />
      </header>

      {/* Hero block fills the remaining viewport so the email form stays
          above the fold on standard laptops + phones. Mini-swipe lives
          below as a "scroll for more" tease.
          Floating mock cards live INSIDE this section absolutely
          positioned, behind the text (z-0), so they "frame" the pitch
          without crowding it. Hidden on mobile by FloatingCards itself. */}
      <section className="relative flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <FloatingCards />
        <div className="relative z-10 max-w-3xl mx-auto w-full">
          <div className="text-center">
            <p className="text-[10px] sm:text-xs uppercase tracking-[3px] text-gold font-bold mb-3 sm:mb-4">
              Próximamente · +1M de logros y sumando · Todo en español
            </p>

            {/* Title uses clamp() so it scales smoothly across viewports
                without breakpoint jumps. Range is tuned so it never
                overflows on 320px phones nor balloons on 27" desktops. */}
            <h1
              className="font-black tracking-tighter leading-[1.02]"
              style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)" }}
            >
              Deja de trackear hábitos.
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #FF6B6B 0%, #C9A961 50%, #A78BFA 100%)",
                }}
              >
                Empieza a coleccionar
              </span>
              <br />
              tus logros absurdos.
            </h1>

            <p
              className="text-muted mt-4 sm:mt-5 max-w-xl mx-auto leading-relaxed"
              style={{ fontSize: "clamp(0.85rem, 1.5vw, 1.05rem)" }}
            >
              La primera red de logros reales. <em>"Mi padre se fue a por
              tabaco y no volvió"</em>, <em>"1 finde sin dormir"</em>,{" "}
              <em>"vomité en la cena de empresa"</em>. ¿Soy yo o eres tú?
            </p>
          </div>

          {/* Countdown */}
          <div className="mt-7 sm:mt-9 md:mt-10">
            <LaunchDate target={LAUNCH_DATE} />
            <p className="text-center text-[11px] sm:text-xs text-muted uppercase tracking-widest mt-3">
              {launchLabel}
            </p>
          </div>

          {/* Email capture */}
          <div className="mt-7 sm:mt-9 md:mt-10 max-w-md mx-auto">
            {done ? (
              <div className="text-center bg-surface/80 backdrop-blur-sm border border-gold/40 rounded-2xl p-6 shadow-[0_0_40px_-10px_rgba(201,169,97,0.3)]">
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
                    className="flex-1 bg-surface/80 backdrop-blur-sm border border-white/10 rounded-full px-5 py-3.5 text-sm focus:border-gold focus:outline-none placeholder:text-muted transition"
                  />
                  <button
                    type="submit"
                    disabled={joinMut.isPending || email.trim().length < 5}
                    className={cn(
                      "rounded-full px-6 py-3.5 font-black tracking-widest text-xs uppercase transition",
                      "bg-white text-bg hover:bg-gold hover:scale-[1.02] active:scale-100",
                      "shadow-[0_0_30px_-5px_rgba(201,169,97,0.5)] hover:shadow-[0_0_40px_-5px_rgba(201,169,97,0.8)]",
                      "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
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
        </div>
      </section>

      {/* Mini-swipe demo — below the fold */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-12 md:pb-20">
        <div className="max-w-3xl mx-auto w-full border-t border-white/5 pt-12 md:pt-14">
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
      <footer className="relative z-10 px-4 sm:px-6 lg:px-8 py-6 border-t border-white/5">
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
