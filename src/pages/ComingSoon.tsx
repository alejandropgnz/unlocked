import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import confetti from "canvas-confetti";
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
  "Y otro",
  "Y la mejor parte",
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

/* Peek cards stacked behind the active one, same pattern as the real
 * Descubrir SwipeDeck. Hardcoded values (not random per render) so cards
 * don't twitch when state updates for other reasons. */
const PEEK_PRESETS = [
  { rotate: -3.5, x: -8, y: 8, scale: 0.95, opacity: 0.7 },
  { rotate: 5, x: 10, y: 16, scale: 0.91, opacity: 0.45 },
  { rotate: -2.5, x: -4, y: 24, scale: 0.87, opacity: 0.25 },
] as const;

const PEEK_CARDS: ExampleLogro[] = [
  { emoji: "🛌", title: "He pasado un finde sin dormir", rarityPercent: 12.4, category: "salud" },
  { emoji: "📱", title: "Stalkeé el insta de mi ex a las 3am", rarityPercent: 22.7, category: "relaciones" },
  { emoji: "💼", title: "He llorado en el baño de la oficina", rarityPercent: 14.3, category: "trabajo" },
];

export default function ComingSoon() {
  const [step, setStep] = useState(0);

  const advance = () => setStep((s) => Math.min(s + 1, 4));
  const skipToCTA = () => setStep(4);

  // h-screen + h-[100dvh] (NOT min-h-) so the column is exactly viewport
  // height; combined with overflow-hidden, anything taller than the
  // viewport gets clipped instead of pushing the body to scroll. The
  // landing must always fit on a single screen.
  return (
    <div className="h-screen h-[100dvh] bg-bg text-white flex flex-col overflow-hidden">
      {/* Header — wordmark left, "Apúntate" skip pill right (only visible
          while we're not already on the CTA card). */}
      <header className="px-4 sm:px-6 py-4 flex items-center justify-between shrink-0">
        <Wordmark size="sm" />
        {step < 4 && (
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
      <main className="relative flex-1 min-h-0 flex flex-col items-center justify-center px-4 py-3">
        <LandingBackground />
        <div className="relative z-10 w-full max-w-md flex flex-col">
          <ProgressBar step={step} total={HINTS.length} hint={HINTS[step]} />

          {/* Card sized tightly so inner content doesn't stretch sparsely.
              Mobile max 520, sm bumps to 580. Excess viewport space stays
              outside the card (above/below via main's justify-center). */}
          <div className="relative mt-5 sm:mt-6 h-[520px] sm:h-[580px] max-h-[calc(100dvh-180px)]">
            {/* Peek stack behind the active card — same pattern as the real
                Descubrir deck. Hidden on the final CTA card since you're
                no longer "in the deck", you're at the destination. */}
            {step < 4 &&
              PEEK_CARDS.map((card, idx) => (
                <PeekCard key={idx} card={card} depth={idx + 1} />
              ))}

            <AnimatePresence mode="wait" initial={false}>
              {step === 0 && (
                <SwipeCard key="hero" onSwipe={advance}>
                  <HeroCardBody />
                </SwipeCard>
              )}
              {step === 1 && (
                <SwipeCard key="ex1" onSwipe={advance}>
                  <ExampleCardBody example={EXAMPLES[1]} />
                </SwipeCard>
              )}
              {step === 2 && (
                <SwipeCard key="ex0" onSwipe={advance}>
                  <ExampleCardBody example={EXAMPLES[0]} />
                </SwipeCard>
              )}
              {step === 3 && (
                <SwipeCard key="stories" onSwipe={advance}>
                  <StoriesCardBody />
                </SwipeCard>
              )}
              {step === 4 && <CTACard key="cta" />}
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

/* ─────────────────── peek cards (decorative stack behind) ───────────── */

function PeekCard({
  card,
  depth,
}: {
  card: ExampleLogro;
  depth: number;
}) {
  const preset = PEEK_PRESETS[depth - 1] ?? PEEK_PRESETS[PEEK_PRESETS.length - 1];
  return (
    <motion.div
      style={{
        scale: preset.scale,
        x: preset.x,
        y: preset.y,
        rotate: preset.rotate,
        opacity: preset.opacity,
      }}
      className="absolute inset-0 bg-surface border-2 border-grey rounded-3xl pointer-events-none"
    >
      <div className="flex flex-col items-center justify-center text-center h-full p-6">
        <div className="text-7xl">{card.emoji}</div>
      </div>
    </motion.div>
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
      dragElastic={0.55}
      dragSnapToOrigin
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      // Initial only fades (no Y offset). Was { opacity: 0, y: 24 } which
      // bounced on the FIRST card on click: AnimatePresence's
      // initial={false} skipped the entry but framer-motion held the
      // y:24 'pending' and replayed it on the first pointer interaction,
      // dropping the card a few pixels visually. Opacity-only initial
      // avoids any positional snap.
      initial={{ opacity: 0 }}
      animate={
        exiting
          ? {
              x: exiting === "right" ? EXIT_DISTANCE : -EXIT_DISTANCE,
              opacity: 0,
              rotate: exiting === "right" ? 25 : -25,
            }
          : { opacity: 1, y: 0 }
      }
      exit={{ opacity: 0 }}
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
          <span className="text-indigo">Empieza a coleccionar</span> logros.
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
        ¿Te suena?
      </div>
    </div>
  );
}

/* ───────────────── Stories card — shows the comments feature ────────── */

interface MockStory {
  username: string;
  avatarEmoji: string;
  avatarBg: string;
  body: string;
}

const MOCK_STORIES: MockStory[] = [
  {
    username: "alex_perez",
    avatarEmoji: "👨🏻",
    avatarBg: "#6366F1",
    body: "Era 2003. Mi padre dijo que iba al estanco. Aún espero el cambio. 🚬",
  },
  {
    username: "marina_g",
    avatarEmoji: "👩🏽‍🦱",
    avatarBg: "#E8BD55",
    body: "Mi madre me lo cuenta con humor pero veo que se le cae la sonrisa al final. 🥲",
  },
  {
    username: "joaquin_v",
    avatarEmoji: "🧔🏼",
    avatarBg: "#A78BFA",
    body: "El mío sí volvió. Pero con otra mujer. ¿Cuenta? 😂",
  },
];

function StoriesCardBody() {
  return (
    <div className="absolute inset-0 flex flex-col p-6 sm:p-7">
      {/* Logro header — gives context for which logro the stories below
          belong to. Mimics the real /l/<slug> page format: emoji + title
          + rarity. Without this the stories feel disconnected from the
          previous example cards (which were about a different logro). */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="text-4xl shrink-0 leading-none">🚬</div>
        <div className="flex-1 min-w-0 text-left">
          <p className="text-sm sm:text-base font-black tracking-tighter leading-tight">
            Mi padre se fue a por tabaco
          </p>
          <p className="text-[10px] font-mono text-gold tracking-widest mt-0.5">
            0.04% lo tiene
          </p>
        </div>
      </div>

      {/* Frame what this list IS — the stories feature explained without
          a full intro section. Sits between header and the thread. */}
      <p className="text-muted text-xs sm:text-sm mt-3 shrink-0 text-left">
        Cada logro tiene su sección de historias. La gente puede contar
        cómo lo consiguió.
      </p>

      {/* Divider + section label — what is this list */}
      <div className="mt-3 mb-3 flex items-center gap-2 shrink-0">
        <div className="h-px flex-1 bg-grey" />
        <p className="text-[10px] uppercase tracking-[3px] text-muted font-bold">
          3 historias
        </p>
        <div className="h-px flex-1 bg-grey" />
      </div>

      {/* Mock thread — same shape as the real story page */}
      <div className="space-y-2.5 sm:space-y-3 flex-1 min-h-0 overflow-hidden">
        {MOCK_STORIES.map((s) => (
          <MockStoryRow key={s.username} story={s} />
        ))}
      </div>
    </div>
  );
}

function MockStoryRow({ story }: { story: MockStory }) {
  return (
    <div className="bg-bg border border-grey rounded-xl p-3">
      <div className="flex items-center gap-2 mb-1.5">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-base shrink-0 leading-none"
          style={{ backgroundColor: story.avatarBg }}
        >
          {story.avatarEmoji}
        </div>
        <span className="text-[11px] font-mono text-muted">@{story.username}</span>
      </div>
      <p className="text-xs sm:text-[13px] leading-relaxed">{story.body}</p>
    </div>
  );
}

/* ──────────────────────────── CTA card ───────────────────────────────── */

function CTACard() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
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

  // Confetti fires on successful email submit (not on card mount). Marks
  // the "thank you" moment so it feels rewarded, not just transactional.
  // Wrapped in try/catch since canvas-confetti can throw on browsers
  // without canvas (rare); never let it block the success path.
  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 110,
        spread: 75,
        startVelocity: 38,
        origin: { y: 0.55 },
        colors: ["#6366F1", "#E8BD55", "#A78BFA", "#FF6B6B", "#FFFFFF"],
      });
    } catch {
      // ignore
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent) return; // belt-and-braces; button is also disabled
    joinMut.mutate(email, {
      onSuccess: ({ alreadyOnList }) => {
        setDone(alreadyOnList ? "already" : "new");
        fireConfetti();
      },
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

            {/* GDPR consent — narrow scope: ONLY the launch alert. We
                cannot use this email for newsletters or any other comms
                without separate consent later (handled at launch day if
                we want to). */}
            <label className="flex items-start gap-2 text-left text-[11px] text-muted cursor-pointer leading-relaxed">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 shrink-0 accent-indigo cursor-pointer"
              />
              <span>
                Acepto que me avisen por email del lanzamiento de Unlocked.
                Más info en{" "}
                <a
                  href="/legal"
                  className="underline hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacidad
                </a>
                .
              </span>
            </label>

            <button
              type="submit"
              disabled={joinMut.isPending || !consent}
              className={cn(
                "w-full rounded-full px-6 py-3.5 font-black tracking-widest text-xs uppercase",
                "bg-indigo text-bg hover:bg-white",
                "disabled:bg-grey disabled:text-muted disabled:cursor-not-allowed",
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
