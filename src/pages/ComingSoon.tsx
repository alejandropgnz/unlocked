import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { Instagram } from "lucide-react";
import { useJoinWaitlist } from "@/hooks/useJoinWaitlist";
import { LaunchDate } from "@/components/CountdownTimer";
import { LandingBackground } from "@/components/LandingBackground";
import { LAUNCH_DATE } from "@/lib/launch";
import { Wordmark } from "@/components/Wordmark";
import { rarityTier, tierTextColor } from "@/lib/rarity";
import { cn } from "@/lib/cn";

/* ────────────────────────────────────────────────────────────────────────
 * The landing IS the product's swipe deck. 8 cards in sequence:
 *
 *   PRE-CONVERSIÓN (5 swipes)
 *     0 → Hook ("categoría nueva" framing)
 *     1 → Ejemplo común — universal Spanish (tía cuándo me caso ~52%)
 *     2 → Ejemplo más raro — el reframe sarcástico de la marca
 *           (cena Navidad sin política ~12%)
 *     3 → Stories card sobre IA psicólogo — demuestra la feature de foro
 *           con un logro 2026-zeitgeist; rompe la percepción "app de
 *           familia" justo antes del CTA
 *     4 → CTA (email + countdown)
 *
 *   POST-CONVERSIÓN (3 swipes)
 *     5 → Bonus — el legendary 0.04% (padre tabaco) como recompensa
 *     6 → Share trigger — slide dedicada para forwarding viral
 *     7 → Goodbye con secondary CTA share
 *
 * Pre-CTA: 5 swipes con énfasis en pedagogía (cold IG necesita varios
 * ejemplos para entender la categoría nueva). Post-CTA: bonus + share +
 * goodbye, optimizado para virality pre-launch.
 *
 * Progress bar con hint que cambia por step (narrativo, no "page 2/4").
 * Skip pill en header salta a la CTA para los que ya están convencidos.
 * ──────────────────────────────────────────────────────────────────────── */

const HINTS = [
  "¿Qué es esto?",
  "Esto es un logro",
  "Y esto también",
  "Cada uno tiene su foro",
  "Te avisamos el día",
] as const;

interface ExampleLogro {
  emoji: string;
  title: string;
  rarityPercent: number;
  category: string;
}

// Examples ordered común → raro: tía es universal (le pasa a casi
// todos), cena Navidad es un logro de supervivencia más raro pero
// recognizable. El orden ascendente en rareza crea narrativa "te
// suena → ahora flipa con esto".
const EXAMPLES: [ExampleLogro, ExampleLogro] = [
  {
    emoji: "💒",
    title: "Mi tía me pregunta cuándo me caso en cada reunión familiar",
    rarityPercent: 52.0,
    category: "familia",
  },
  {
    emoji: "🍽️",
    title: "He sobrevivido a una cena de Navidad sin hablar de política",
    rarityPercent: 12.0,
    category: "familia",
  },
];

// Post-submit bonus deck — UN solo logro extremo (0.04% legendary) que
// recompensa al usuario tras dar el email. Padre-tabaco ya es el ejemplo
// canónico del producto y aquí cierra el flujo con el wow máximo.
const BONUS_LOGROS: ExampleLogro[] = [
  {
    emoji: "🚬",
    title: "Mi padre se fue a por tabaco y no volvió",
    rarityPercent: 0.04,
    category: "familia",
  },
];

// Mini-grid del Share Trigger card — 3 logros recognizable que generan
// el "tengo un amigo así" instantáneo en el viewer.
const SHARE_LOGROS: ExampleLogro[] = [
  { emoji: "🛒", title: "Me perdí el vuelo por mirar las tiendas", rarityPercent: 1.2, category: "viajes" },
  { emoji: "📱", title: "Stalkeé el insta de mi ex a las 3am", rarityPercent: 22.7, category: "relaciones" },
  { emoji: "🔕", title: "Mantengo silenciado el grupo del cole", rarityPercent: 28.4, category: "amigos" },
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

  // Steps 0-4 = main flow (hook, ej1, ej2, stories, CTA).
  // Steps 5-7 = post-submit (1 bonus + share trigger + goodbye).
  // CTACard advances to 5 itself on successful submit.
  const advance = () => setStep((s) => Math.min(s + 1, 7));
  const skipToCTA = () => setStep(4);
  const inBonus = step >= 5;

  // 100svh (NOT 100dvh, NOT 100vh) is critical here. iOS Safari 15-17 has a
  // documented bug where `100dvh` during the initial paint reports the LARGE
  // viewport (= chrome hidden) instead of the actual currently-visible
  // height — so a div sized to dvh ends up bigger than the visible viewport
  // when the URL bar + bottom toolbar are showing, and the footer gets
  // clipped behind Safari's toolbar. svh is the SMALL viewport height (=
  // chrome fully visible) → guarantees the layout fits in every chrome
  // state. Trade-off: when the URL bar minifies on scroll, a small bg-bg
  // sliver appears below the footer; imperceptible on a single-screen
  // landing.
  // h-screen (= 100vh) stays as Tailwind class fallback for ancient
  // browsers without svh support; modern iOS Safari (15.4+) and all
  // current Chrome/Firefox/Edge support svh, so the inline style wins.
  return (
    <div
      className="h-screen bg-bg text-white flex flex-col overflow-hidden"
      style={{ height: "100svh" }}
    >
      {/* Header — wordmark left, "Apúntate" skip pill right (only visible
          while we're not already on the CTA card). Safe-area top padding
          so the notch on iPhone doesn't eat into the wordmark. */}
      <header
        className="px-4 sm:px-6 py-3 flex items-center justify-between shrink-0"
        style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
      >
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

      {/* Body — fills all leftover vertical space between header and footer.
          The card itself is `flex-1` so on mobile it grows to fully use the
          available viewport (no wasted top/bottom margins) and on desktop
          it caps at 620px (kept centered by the inner column's
          justify-center) to avoid an absurdly tall rectangle.
          Atmospheric wall of cards lives INSIDE main so it never bleeds
          into the header/footer zones. */}
      <main className="relative flex-1 min-h-0 flex flex-col items-center px-4 pt-2 pb-3">
        <LandingBackground />
        <div className="relative z-10 w-full max-w-md lg:max-w-lg flex flex-col flex-1 min-h-0 justify-center">
          {/* Progress bar only shows during the main flow (steps 0-4).
              In the post-submit bonus, the user already converted —
              the bar would be misleading (5/5 done) or confusing
              (6/8?). Cleaner to drop it and let the bonus feel like
              an unstructured epilogue. */}
          {!inBonus && (
            <ProgressBar
              step={step}
              total={HINTS.length}
              hint={HINTS[step]}
            />
          )}

          {/* Card fills available vertical space inside main (no fixed
              height → no overflow on small phones, no waste on tall
              viewports). max-h caps it on desktop so the card stays
              card-shaped instead of stretching into a billboard. */}
          <div
            className={cn(
              "relative flex-1 min-h-0 max-h-[620px] w-full",
              !inBonus && "mt-3 sm:mt-4",
            )}
          >
            {/* Peek stack behind the active card — same pattern as the real
                Descubrir deck. Hidden from the CTA onward — once you're
                at the destination (or past it), no more deck behind. */}
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
                <SwipeCard key="ex0" onSwipe={advance}>
                  <ExampleCardBody example={EXAMPLES[0]} />
                </SwipeCard>
              )}
              {step === 2 && (
                <SwipeCard key="ex1" onSwipe={advance}>
                  <ExampleCardBody example={EXAMPLES[1]} />
                </SwipeCard>
              )}
              {step === 3 && (
                <SwipeCard key="stories" onSwipe={advance}>
                  <StoriesCardBody />
                </SwipeCard>
              )}
              {step === 4 && <CTACard key="cta" onSubmitted={advance} />}
              {step === 5 && (
                <SwipeCard key="bonus0" onSwipe={advance}>
                  <BonusCardBody
                    example={BONUS_LOGROS[0]}
                    intro="Te enseñamos un logro más ;)"
                  />
                </SwipeCard>
              )}
              {step === 6 && (
                <SwipeCard key="share" onSwipe={advance}>
                  <ShareCardBody />
                </SwipeCard>
              )}
              {step === 7 && <GoodbyeCard key="goodbye" />}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <footer
        className="shrink-0 px-4 pt-3 pb-3 border-t border-grey text-[11px] text-muted text-center flex items-center justify-center gap-3"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <span>Hecho en España · 2026</span>
        <span className="text-grey">·</span>
        <a
          href="https://instagram.com/unlucky.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:text-white transition"
          aria-label="Síguenos en Instagram @unlucky.app"
        >
          <Instagram className="w-3.5 h-3.5" />
          <span>@unlucky.app</span>
        </a>
        <span className="text-grey">·</span>
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

/* ─────────────────── brand tag (top-left of every card) ─────────────── */

/**
 * Tiny "unlocky.app" stamp on the top-left of every landing card.
 * Two purposes:
 *   1. Repetition: 8 brand impressions per visit instead of 1 (header)
 *      → calar la URL en memoria pasiva
 *   2. Screenshot-friendly: si un usuario captura una card para
 *      mandársela a un amigo, la URL viaja CON la imagen — sin esto,
 *      el screenshot es un meme anónimo y se pierde el origen
 *
 * Mono font (matches the product's data aesthetic), text-muted (no
 * compite con el contenido), pointer-events-none (no atrapa el drag
 * gesture del swipe). z-10 para ir por encima del body absoluto del
 * card pero por debajo de cualquier overlay activo (peek cards van
 * por detrás).
 */
function BrandTag() {
  return (
    <span className="absolute top-5 left-6 text-[10px] sm:text-[11px] font-mono text-muted tracking-widest pointer-events-none z-10">
      unlocky.app
    </span>
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

  // onTap fires after a pointer release that DIDN'T involve a
  // significant drag — so tap and drag coexist without conflicting.
  // Framer-motion handles the discrimination: a small movement = tap,
  // anything past its tap threshold = drag (handled by onDragEnd).
  const handleTap = () => {
    if (exiting) return;
    setExiting("right");
  };

  return (
    <motion.div
      drag={exiting ? false : "x"}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.55}
      dragSnapToOrigin
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      onTap={handleTap}
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
      className="absolute inset-0 bg-surface border-2 border-grey rounded-3xl select-none cursor-pointer"
    >
      <BrandTag />
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
      {/* Top — date keeps the launch tease visible from slide 0. */}
      <p className="text-[10px] sm:text-xs uppercase tracking-[3px] text-muted font-bold shrink-0">
        Viernes 29 de mayo
      </p>

      {/* Middle — hook B2: posicionamiento "categoría nueva". Contraste
          declarativo entre lo que YA existe (hábitos) y lo que esto es
          por primera vez (coleccionar logros). El número "1.000" da
          autoridad inmediata sin esfuerzo. */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-0">
        <h1
          className="font-black tracking-tighter leading-[1.05]"
          style={{ fontSize: "clamp(2rem, 5.5vw, 2.75rem)" }}
        >
          Hay <span className="text-indigo">1.000 apps</span> para trackear hábitos.
          <br />
          Esta es la primera para <span className="text-indigo">coleccionar logros</span>.
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

      {/* Bottom hint — engagement emocional. El progress bar superior
          lleva el hint declarativo ("esto es un logro"); aquí abajo va
          la pregunta abierta que invita a auto-reconocerse. */}
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

// 4 stories sobre 🤖 IA psicólogo. Tono catálogo: frase corta, primera
// persona, situación específica, reveal pequeño al final, cero adjetivos
// sentimentales. Las 2 visibles van pensadas para impacto inmediato
// (universal + meta); las 2 ocultas viven en "+ 2 más" para sugerir
// profundidad sin pedir lectura completa.
const MOCK_STORIES: MockStory[] = [
  {
    username: "alex_perez",
    avatarEmoji: "👨🏻",
    avatarBg: "#6366F1",
    body: "Le conté lo de mi ex a ChatGPT antes que a mis amigos. Me dio mejor consejo.",
  },
  {
    username: "lucia_m",
    avatarEmoji: "👩🏼",
    avatarBg: "#FF6B6B",
    body: "Le conté un sueño muy raro. Me dijo que necesitaba ayuda profesional. Ironía nivel dios.",
  },
  // ─── ocultas tras "+ 2 más" ───
  {
    username: "marina_g",
    avatarEmoji: "👩🏽‍🦱",
    avatarBg: "#E8BD55",
    body: "Pago 80€ al mes a mi terapeuta. Le pregunto a la IA entre sesiones.",
  },
  {
    username: "joaquin_v",
    avatarEmoji: "🧔🏼",
    avatarBg: "#A78BFA",
    body: "La IA me ha hecho llorar tres veces este mes. Mi terapeuta solo dos.",
  },
];

const STORIES_VISIBLE = 2;

function StoriesCardBody() {
  return (
    // Asymmetric padding: pt-10/12 reserva sitio al BrandTag (top-5 +
    // ~12px de altura del tag = ~32px ocupados arriba) para que la
    // cabecera left-aligned (🤖 + título) no se solape. Las demás cards
    // del deck tienen contenido top centered, no compiten con el tag y
    // pueden quedarse con padding uniforme.
    <div className="absolute inset-0 flex flex-col px-6 sm:px-7 pt-10 sm:pt-12 pb-6 sm:pb-7">
      {/* Logro header — IA psicólogo. El 2026-zeitgeist rompe la
          percepción de "app de familia" creada por las dos cards previas
          y muestra el rango antes del CTA. */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="text-4xl shrink-0 leading-none">🤖</div>
        <div className="flex-1 min-w-0 text-left">
          <p className="text-sm sm:text-base font-black tracking-tighter leading-tight">
            Usé la IA de psicólogo
          </p>
          <p className="text-[10px] font-mono text-violet tracking-widest mt-0.5">
            18.4% lo tiene
          </p>
        </div>
      </div>

      {/* Sub-headline declarativa — describe sin sobre-explicar. Antes
          era un párrafo de 2 líneas; ahora es 4 palabras. */}
      <p className="text-muted text-xs sm:text-sm mt-3 shrink-0 text-left">
        Cada logro tiene su foro
      </p>

      {/* Divider + total count — sugiere volumen. */}
      <div className="mt-3 mb-3 flex items-center gap-2 shrink-0">
        <div className="h-px flex-1 bg-grey" />
        <p className="text-[10px] uppercase tracking-[3px] text-muted font-bold">
          {MOCK_STORIES.length} historias
        </p>
        <div className="h-px flex-1 bg-grey" />
      </div>

      {/* 2 historias visibles + indicador "+ N más" para sugerir
          profundidad sin pedir que lean las 4. */}
      <div className="space-y-2.5 sm:space-y-3 flex-1 min-h-0 overflow-hidden">
        {MOCK_STORIES.slice(0, STORIES_VISIBLE).map((s) => (
          <MockStoryRow key={s.username} story={s} />
        ))}
        {MOCK_STORIES.length > STORIES_VISIBLE && (
          <p className="text-[11px] text-muted text-center font-mono pt-1">
            + {MOCK_STORIES.length - STORIES_VISIBLE} más
          </p>
        )}
      </div>
    </div>
  );
}

function MockStoryRow({ story }: { story: MockStory }) {
  return (
    <div className="bg-bg border border-grey rounded-xl p-3">
      <div className="flex items-center gap-2 mb-1.5">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-lg shrink-0 leading-none"
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

function CTACard({ onSubmitted }: { onSubmitted: () => void }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
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
      onSuccess: () => {
        fireConfetti();
        // Hand off to parent — it advances to the bonus deck (steps 5-7).
        // Quick delay so the confetti has a beat to register before the
        // card transitions out.
        setTimeout(onSubmitted, 350);
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
      <BrandTag />
      <div className="text-center shrink-0">
            <h2
              className="font-black tracking-tighter leading-tight"
              style={{ fontSize: "clamp(1.5rem, 4.5vw, 2rem)" }}
            >
              Avísame<br />
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
                Acepto que me avisen por email del lanzamiento de Unlocky.
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
    </motion.div>
  );
}

/* ─────────────────── bonus card body — post-submit deck ──────────────── */

function BonusCardBody({
  example,
  intro,
}: {
  example: ExampleLogro;
  intro?: string;
}) {
  const tier = rarityTier(example.rarityPercent);
  const tierColor = tierTextColor(tier);
  return (
    <div className="absolute inset-0 flex flex-col text-center p-7 sm:p-9">
      {/* Optional intro line — only on the first bonus card to bridge
          the user from "I just submitted" to "here's something extra". */}
      {intro && (
        <p className="text-[10px] sm:text-xs uppercase tracking-[3px] text-indigo font-bold shrink-0 mb-2">
          {intro}
        </p>
      )}

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

      <div className="font-black text-sm uppercase tracking-widest text-muted shrink-0">
        ¿Te suena?
      </div>
    </div>
  );
}

/* ─────────────────── share trigger — viral pre-launch card ──────────── */

const SHARE_TEXT =
  "Esto te va a doler de lo familiar que te suena. Sale en 2 semanas:";
const SHARE_URL = "https://unlocky.app";

/**
 * Share trigger card — la pieza dedicada para activar forwarding viral
 * pre-launch. Sin esta card, los shares dependen de que el usuario
 * copie la URL por su cuenta (≈ 0% conversión secundaria). Con esta
 * card + un botón grande conectado a navigator.share(), capturamos el
 * momento "tengo un amigo así" en su pico emocional.
 *
 * navigator.share() abre el share sheet nativo del SO en mobile (iOS,
 * Android). En desktop (donde no existe), fallback a clipboard +
 * toast. AbortError = usuario canceló el share sheet, no es un fallo.
 */
function ShareCardBody() {
  const handleShare = async () => {
    const data: ShareData = { title: "Unlocky", text: SHARE_TEXT, url: SHARE_URL };
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(`${SHARE_TEXT} ${SHARE_URL}`);
      toast.success("Copiado, mándaselo por donde quieras");
    } catch (err) {
      // AbortError fires when user dismisses the native share sheet.
      // Anything else falls back to clipboard so the action never feels
      // broken to the user.
      if (err instanceof Error && err.name === "AbortError") return;
      try {
        await navigator.clipboard.writeText(`${SHARE_TEXT} ${SHARE_URL}`);
        toast.success("Copiado, mándaselo por donde quieras");
      } catch {
        toast.error("No se pudo compartir");
      }
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col text-center p-6 sm:p-8">
      {/* Top — emoji + headline. La frase apela a la red social interna
          del usuario sin apostar por una emoción concreta ("le va a
          encantar" / "se va a partir") — solo describe que existe un
          alguien y cierra. */}
      <div className="shrink-0">
        <div className="text-5xl sm:text-6xl mb-3 leading-none">📲</div>
        <h2
          className="font-black tracking-tighter leading-tight"
          style={{ fontSize: "clamp(1.4rem, 4.5vw, 1.9rem)" }}
        >
          Tienes un amigo<br />
          al que le pasa esto.
        </h2>
      </div>

      {/* Stack de 3 logros recognizable — funciona como prueba visual
          del "esto" abstracto del headline. Layout horizontal (emoji
          izquierda + título derecha) en lugar de grid cuadrada para
          que el texto sea legible (~13px) y los logros se lean como
          "cosas que tu amigo hace", que es exactamente el frame del
          headline. Pulsar uno no hace nada (atrezzo, no feature). */}
      <div className="flex-1 flex items-center min-h-0 my-4">
        <div className="flex flex-col gap-2 w-full">
          {SHARE_LOGROS.map((logro) => (
            <ShareMiniCard key={logro.title} logro={logro} />
          ))}
        </div>
      </div>

      {/* CTA grande con border indigo (mismo lenguaje visual que el
          CTA de email, para que el usuario lea "esto es la acción
          principal aquí"). stopPropagation evita que el tap del
          SwipeCard wrapper avance al goodbye en cuanto el usuario
          pulsa este botón — queremos abrir el share, no saltar slide. */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          void handleShare();
        }}
        className="shrink-0 w-full rounded-full px-6 py-3.5 font-black tracking-widest text-xs uppercase bg-indigo text-bg hover:bg-white transition"
      >
        Mándaselo →
      </button>
    </div>
  );
}

function ShareMiniCard({ logro }: { logro: ExampleLogro }) {
  return (
    <div className="bg-bg border border-grey rounded-xl p-3 flex items-center gap-3">
      <div className="text-3xl sm:text-4xl leading-none shrink-0">{logro.emoji}</div>
      <p className="text-[13px] sm:text-sm font-black text-white leading-tight tracking-tighter line-clamp-2 text-left flex-1 min-w-0">
        {logro.title}
      </p>
    </div>
  );
}

/* ─────────────────── goodbye card — final post-bonus screen ──────────── */

function GoodbyeCard() {
  const launchLabel = useMemo(() => {
    const d = LAUNCH_DATE;
    const day = d.toLocaleDateString("es-ES", { weekday: "long" });
    const dayNum = d.getDate();
    const month = d.toLocaleDateString("es-ES", { month: "long" });
    return `${day} ${dayNum} de ${month}`;
  }, []);

  // Secondary share CTA en goodbye — recordatorio para los que pasaron
  // de la card de share trigger. Misma función que ShareCardBody pero
  // styled como CTA secundario (ghost) para no competir con el "nos
  // vemos el [día]" que es el take-away principal.
  const handleShare = async () => {
    const data: ShareData = { title: "Unlocky", text: SHARE_TEXT, url: SHARE_URL };
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(`${SHARE_TEXT} ${SHARE_URL}`);
      toast.success("Copiado, mándaselo por donde quieras");
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      try {
        await navigator.clipboard.writeText(`${SHARE_TEXT} ${SHARE_URL}`);
        toast.success("Copiado, mándaselo por donde quieras");
      } catch {
        // ignore
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
      className="absolute inset-0 bg-surface border-2 border-indigo rounded-3xl p-8 sm:p-10 flex flex-col items-center justify-center text-center"
    >
      <BrandTag />
      <div className="text-6xl mb-4">📬</div>
      <h2
        className="font-black tracking-tighter leading-tight"
        style={{ fontSize: "clamp(1.5rem, 4.5vw, 2rem)" }}
      >
        Nos vemos el {launchLabel}.
      </h2>
      <p className="text-muted text-sm mt-3 max-w-xs">
        Te escribimos al email ese día.
      </p>
      <button
        type="button"
        onClick={handleShare}
        className="mt-6 text-xs uppercase tracking-widest text-muted hover:text-white underline-offset-4 hover:underline transition"
      >
        O mándaselo a alguien
      </button>
    </motion.div>
  );
}
