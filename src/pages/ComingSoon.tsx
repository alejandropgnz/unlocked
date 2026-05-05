import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { useJoinWaitlist } from "@/hooks/useJoinWaitlist";
import { LaunchDate } from "@/components/CountdownTimer";
import { LandingBackground } from "@/components/LandingBackground";
import { LAUNCH_DATE } from "@/lib/launch";
import { Wordmark } from "@/components/Wordmark";
import { rarityTier, tierTextColor } from "@/lib/rarity";
import { cn } from "@/lib/cn";

/* ────────────────────────────────────────────────────────────────────────
 * The landing IS the product's swipe deck. 4 cards in sequence:
 *   0 → Hero (the pitch)
 *   1 → Example logro #1 (legendary, hooks attention)
 *   2 → Example logro #2 (common, recognizable)
 *   3 → CTA (email + countdown)
 *
 * Progress bar at the top with a hint that changes per step (narrative,
 * not "page 2/4" infantilization). Skip pill in the header jumps anyone
 * who doesn't want to play straight to the CTA.
 * ──────────────────────────────────────────────────────────────────────── */

const HINTS = [
  "¿Qué es esto?",
  "Un ejemplo, no es marketing",
  "Ya casi lo tienes",
  "Tu email y listo",
] as const;

interface ExampleLogro {
  emoji: string;
  title: string;
  rarityPercent: number;
  category: string;
}

const EXAMPLES: [ExampleLogro, ExampleLogro] = [
  {
    emoji: "🚬",
    title: "Mi padre se fue a por tabaco y no volvió",
    rarityPercent: 0.04,
    category: "familia",
  },
  {
    emoji: "🤮",
    title: "He vomitado en la cena de empresa",
    rarityPercent: 8.2,
    category: "trabajo",
  },
];

/* ─────────────── swipe gesture constants (mirrors SwipeDeck) ─────────── */
const SWIPE_THRESHOLD = 100;
const VELOCITY_THRESHOLD = 600;
const EXIT_DISTANCE = 1200;

export default function ComingSoon() {
  const [step, setStep] = useState(0);

  const advance = () => setStep((s) => Math.min(s + 1, 3));
  const skipToCTA = () => setStep(3);

  return (
    <div className="min-h-screen min-h-[100dvh] bg-bg text-white flex flex-col overflow-hidden">
      {/* Header — wordmark left, "Apúntate" skip pill right (only visible
          while we're not already on the CTA card). */}
      <header className="px-4 sm:px-6 py-4 flex items-center justify-between shrink-0">
        <Wordmark size="sm" />
        {step < 3 && (
          <button
            type="button"
            onClick={skipToCTA}
            className="text-[11px] uppercase tracking-widest font-bold text-muted hover:text-white px-3 py-1.5 rounded-full border-2 border-grey hover:border-white"
          >
            Apúntate
          </button>
        )}
      </header>

      {/* Body — centered vertically. Card has a viewport-aware fixed
          height so it never feels sparse (no huge inner gaps) nor
          overflows on small phones. The leftover space splits as small
          margins above the progress bar and below the card, which on
          standard phones is ~30-50px each — perceived as breathing,
          not as empty zones.
          Atmospheric wall of cards lives INSIDE main so it never bleeds
          into the header/footer zones. */}
      <main className="relative flex-1 flex flex-col items-center justify-center px-4 py-3">
        <LandingBackground />
        <div className="relative z-10 w-full max-w-md flex flex-col">
          <ProgressBar step={step} total={HINTS.length} hint={HINTS[step]} />

          <div
            className="relative mt-5 sm:mt-6"
            style={{ height: "min(620px, calc(100dvh - 200px))" }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {step === 0 && (
                <SwipeCard key="hero" onSwipe={advance}>
                  <HeroCardBody />
                </SwipeCard>
              )}
              {step === 1 && (
                <SwipeCard key="ex0" onSwipe={advance}>
                  <ExampleCardBody example={EXAMPLES[0]} />
                </SwipeCard>
              )}
              {step === 2 && (
                <SwipeCard key="ex1" onSwipe={advance}>
                  <ExampleCardBody example={EXAMPLES[1]} />
                </SwipeCard>
              )}
              {step === 3 && <CTACard key="cta" />}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <footer className="shrink-0 px-4 py-4 border-t border-grey text-[11px] text-muted text-center">
        Hecho en España · 2026 ·{" "}
        <a href="/legal" className="hover:text-white underline-offset-2 hover:underline">
          Privacidad
        </a>
      </footer>
    </div>
  );
}

/* ────────────────────────────── progress bar ─────────────────────────── */

function ProgressBar({
  step,
  total,
  hint,
}: {
  step: number;
  total: number;
  hint: string;
}) {
  const pct = ((step + 1) / total) * 100;
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2 min-h-[1.25rem]">
        <AnimatePresence mode="wait">
          <motion.span
            key={hint}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="text-sm font-bold tracking-tight"
          >
            {hint}
          </motion.span>
        </AnimatePresence>
        <span className="text-[11px] text-muted font-mono tabular-nums tracking-widest">
          {step + 1}/{total}
        </span>
      </div>
      <div className="h-[3px] bg-grey rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-indigo rounded-full"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

/* ─────────────────── swipeable card wrapper (cards 0-2) ──────────────── */

function SwipeCard({
  onSwipe,
  children,
}: {
  onSwipe: () => void;
  children: React.ReactNode;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
  const [exiting, setExiting] = useState<"left" | "right" | null>(null);

  // onAnimationComplete fires for EVERY animation that ends, including the
  // entry, the fly-off, and the AnimatePresence exit. Without a guard,
  // advance() gets called multiple times → step skips (1 → 3 instead of
  // 1 → 2). Ref ensures onSwipe runs at most once per card lifetime.
  const calledRef = useRef(false);

  const handleDragEnd = (
    _e: PointerEvent | MouseEvent | TouchEvent,
    info: PanInfo,
  ) => {
    if (exiting) return;
    const dx = info.offset.x;
    const vx = info.velocity.x;
    if (dx > SWIPE_THRESHOLD || vx > VELOCITY_THRESHOLD) setExiting("right");
    else if (dx < -SWIPE_THRESHOLD || vx < -VELOCITY_THRESHOLD)
      setExiting("left");
  };

  return (
    <motion.div
      drag={exiting ? false : "x"}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, y: 24 }}
      animate={
        exiting
          ? {
              x: exiting === "right" ? EXIT_DISTANCE : -EXIT_DISTANCE,
              opacity: 0,
              rotate: exiting === "right" ? 25 : -25,
            }
          : { opacity: 1, y: 0 }
      }
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
      onAnimationComplete={() => {
        if (exiting && !calledRef.current) {
          calledRef.current = true;
          onSwipe();
        }
      }}
      style={{ x, rotate }}
      whileTap={{ cursor: "grabbing" }}
      className="absolute inset-0 bg-surface border-2 border-grey rounded-3xl select-none cursor-grab active:cursor-grabbing"
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────── card bodies ─────────────────────────────── */

/* Each card body uses the same flex column layout — top region pinned to
 * top, flex-1 middle for the centered content, bottom region pinned to
 * bottom — so vertical zones never overlap regardless of title length.
 * Padding lives on the outer container (p-6 sm:p-8) so all three cards
 * share the same insets from the card border.
 */

function HeroCardBody() {
  return (
    <div className="absolute inset-0 flex flex-col text-center p-8 sm:p-10">
      {/* Top */}
      <p className="text-[10px] sm:text-xs uppercase tracking-[3px] text-muted font-bold shrink-0">
        Viernes 22 de mayo
      </p>

      {/* Middle. No forced <br/>'s — let the title wrap naturally based on
          the card width. Bigger font on mobile so the title dominates the
          card and doesn't feel lost in empty space. */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-0">
        <h1
          className="font-black tracking-tighter leading-[1.05]"
          style={{ fontSize: "clamp(2.25rem, 6vw, 3rem)" }}
        >
          Deja de trackear hábitos.{" "}
          <span className="text-indigo">Empieza a coleccionar</span> tus logros absurdos.
        </h1>
      </div>

      {/* Bottom */}
      <div className="shrink-0">
        <p className="text-muted text-sm">Desliza para ver de qué va.</p>
        <div className="mt-2 text-2xl text-muted animate-pulse">→</div>
      </div>
    </div>
  );
}

function ExampleCardBody({ example }: { example: ExampleLogro }) {
  const tier = rarityTier(example.rarityPercent);
  const tierColor = tierTextColor(tier);
  return (
    <div className="absolute inset-0 flex flex-col text-center p-8 sm:p-10">
      {/* Top — rarity */}
      <div className="leading-tight shrink-0">
        <div
          className="font-mono font-black tabular-nums text-2xl sm:text-3xl"
          style={{ color: tierColor }}
        >
          {example.rarityPercent.toFixed(2)}%
        </div>
        <div className="text-muted text-xs sm:text-sm mt-1">
          de las personas tienen este logro
        </div>
      </div>

      {/* Middle — emoji + title + category */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-0">
        <div className="text-7xl sm:text-8xl">{example.emoji}</div>
        <div className="mt-4 sm:mt-5 text-xl sm:text-2xl font-black tracking-tighter leading-tight">
          {example.title}
        </div>
        <div className="mt-3 text-[11px] text-muted font-mono uppercase tracking-widest">
          {example.category}
        </div>
      </div>

      {/* Bottom hint */}
      <div className="font-black text-sm uppercase tracking-widest text-muted shrink-0">
        ¿Soy yo o eres tú?
      </div>
    </div>
  );
}

/* ──────────────────────────── CTA card ───────────────────────────────── */

function CTACard() {
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

  // Auto-focus the email input on desktop only (intrusive on mobile keyboards)
  useEffect(() => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      const el = document.getElementById("waitlist-email");
      el?.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    joinMut.mutate(email, {
      onSuccess: ({ alreadyOnList }) =>
        setDone(alreadyOnList ? "already" : "new"),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
      className="absolute inset-0 bg-surface border-2 border-indigo rounded-3xl p-8 sm:p-10 flex flex-col"
    >
      {done ? (
        <div className="m-auto text-center">
          <div className="text-6xl mb-3">📬</div>
          <p className="text-xl sm:text-2xl font-black tracking-tight">
            {done === "already" ? "Ya estabas en la lista." : "Te tenemos."}
          </p>
          <p className="text-muted text-sm mt-2">
            Te escribimos {launchLabel.split(" · ")[0]} a las{" "}
            {launchLabel.split(" · ")[1]?.split(" ")[0]}.
          </p>
        </div>
      ) : (
        <>
          <div className="text-center shrink-0">
            <h2
              className="font-black tracking-tighter leading-tight"
              style={{ fontSize: "clamp(1.5rem, 4.5vw, 2rem)" }}
            >
              Apúntate y te avisamos<br />
              cuando salga.
            </h2>
          </div>

          {/* Countdown — my-auto centers it vertically between title + form,
              splitting the leftover space equally. No extra padding here:
              the auto-margin already breathes for it. */}
          <div className="my-auto">
            <LaunchDate target={LAUNCH_DATE} />
            <p className="text-center text-[11px] text-muted uppercase tracking-widest mt-3">
              {launchLabel}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
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
              className="w-full bg-bg border-2 border-grey rounded-full px-5 py-3.5 text-sm focus:border-indigo focus:outline-none placeholder:text-muted"
            />
            <button
              type="submit"
              disabled={joinMut.isPending}
              className={cn(
                "w-full rounded-full px-6 py-3.5 font-black tracking-widest text-xs uppercase",
                // Always full indigo so the CTA never reads as "muted/dim".
                // HTML5 required + email type guards empty/invalid submits;
                // we don't need a visual disabled state for that.
                "bg-indigo text-bg hover:bg-white disabled:cursor-wait",
              )}
            >
              {joinMut.isPending ? "..." : "Avísame"}
            </button>
          </form>
        </>
      )}
    </motion.div>
  );
}
