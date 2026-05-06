/* Atmospheric "wall of cards" framing the landing's central swipe deck.
 *
 * Single full-viewport panel populated with real catalog logros in a
 * staggered Flexbox masonry. The swipe deck floats on top via z-index
 * (deck z-10, wall z-0) and physically occludes any cards directly
 * behind it — so the "void" reserved for the deck is just a visual
 * by-product, not an empty band in the layout. Cards extend uniformly
 * across the entire viewport width.
 *
 *
 * NOTE: Background cards stay with NATIVE OS emojis (no <Emoji>) so we
 * don't fire 1500+ image requests just for atmospheric texture. The
 * overlay (rgba 0.92 black) makes them silhouettes anyway — no one
 * inspects details. Foreground deck uses Fluent via the regular Emoji
 * component for brand consistency where it actually matters.
 *
 * Cards are SOLID (bg-surface); a single dark overlay over the whole
 * wall does the dimming, so each card still reads as a real
 * achievement, just seen through tinted glass.
 *
 * Cards repeat REPEATS times so the columns always overflow the
 * viewport vertically (clipped by overflow-hidden) and odd columns get
 * a -mt-20 offset so the masonry staggers organically — no horizontal
 * alignment between adjacent columns.
 *
 * Hover effect: each card scales 1.08x on hover with a 200ms ease.
 * The scale transform creates a new stacking context so the hovered
 * card naturally paints above its neighbors without z-index tricks.
 * Cards behind the swipe deck never receive hover events because the
 * deck (higher z) occludes pointer events for them. Pure visual sugar
 * — NO click handler, NO cursor change, just texture that responds.
 *
 * Hidden below lg (1024px). At md+ smaller the wall would compete
 * with the deck for attention; mobile gets the deck alone.
 */
const REPEATS = 3;
const COLS_LG = 4;
const COLS_XL = 6;

interface BgLogro {
  emoji: string;
  title: string;
  rarityPercent: number;
  category: string;
}

// Combined source set — both halves of what used to be LEFT/RIGHT
// panels, interleaved (alternating) so adjacent items in the source
// array represent different categories. Keeps visual variety high
// even before the per-column distribution runs.
const ALL_LOGROS: BgLogro[] = [
  { emoji: "🚬", title: "Mi padre se fue a por tabaco y no volvió", rarityPercent: 0.04, category: "familia" },
  { emoji: "📱", title: "Stalkeé el insta de mi ex a las 3am", rarityPercent: 22.7, category: "relaciones" },
  { emoji: "💀", title: "Le di like a una foto de mi ex de 2018", rarityPercent: 18.6, category: "relaciones" },
  { emoji: "🤖", title: "Usé la IA de psicólogo", rarityPercent: 18.4, category: "salud" },
  { emoji: "🛌", title: "He pasado un finde sin dormir", rarityPercent: 12.4, category: "salud" },
  { emoji: "💼", title: "He llorado en el baño de la oficina", rarityPercent: 14.3, category: "trabajo" },
  { emoji: "📧", title: "Le di a Responder a todos sin querer", rarityPercent: 10.8, category: "trabajo" },
  { emoji: "🍻", title: "He bebido cerveza para desayunar", rarityPercent: 6.1, category: "resaca" },
  { emoji: "🫥", title: "Cancelé un plan inventando que estaba malo", rarityPercent: 32.1, category: "amigos" },
  { emoji: "🔕", title: "Mantengo silenciado el grupo del cole", rarityPercent: 28.4, category: "amigos" },
  { emoji: "🛒", title: "Me perdí el vuelo por mirar las tiendas", rarityPercent: 1.2, category: "viajes" },
  { emoji: "🍽️", title: "He sobrevivido a una cena de Navidad sin política", rarityPercent: 12.0, category: "familia" },
  { emoji: "💒", title: "Mi tía me pregunta cuándo me caso", rarityPercent: 52.0, category: "familia" },
  { emoji: "💔", title: "Me dejaron sin dar ninguna explicación", rarityPercent: 18.1, category: "amor" },
  { emoji: "🥲", title: "He llorado viendo un anuncio", rarityPercent: 8.6, category: "random" },
  { emoji: "🚇", title: "Me subí al metro en sentido contrario", rarityPercent: 38.0, category: "verguenza" },
];

const SIDE_PADDING_PX = 28;

/** Repeat the source array so columns always overflow viewport. */
function expandCards(cards: BgLogro[]): BgLogro[] {
  const out: BgLogro[] = [];
  for (let r = 0; r < REPEATS; r++) {
    for (let i = 0; i < cards.length; i++) {
      out.push(cards[(i + r * 3) % cards.length]);
    }
  }
  return out;
}

/** Distribute cards round-robin into N columns. */
function distributeCards<T>(cards: T[], n: number): T[][] {
  const cols: T[][] = Array.from({ length: n }, () => []);
  cards.forEach((card, i) => {
    cols[i % n].push(card);
  });
  return cols;
}

export function LandingBackground() {
  const expanded = expandCards(ALL_LOGROS);
  const cols4 = distributeCards(expanded, COLS_LG);
  const cols6 = distributeCards(expanded, COLS_XL);

  return (
    <div
      aria-hidden
      className="hidden lg:block absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {/* lg (1024-1279): 4 columns to keep cards readable at narrower
          viewports. xl+ (1280+): 6 columns for denser wall feel. Both
          renders coexist in the DOM but only one is visible per
          breakpoint via responsive utilities. */}
      <Wall cols={cols4} className="lg:flex xl:hidden" />
      <Wall cols={cols6} className="hidden xl:flex" />

      {/* Single dark overlay over the entire wall. Cards stay readable
          as silhouettes only and don't compete with the foreground
          swipe deck. The overlay also has pointer-events-none so it
          doesn't block hover detection on the cards underneath. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(14, 14, 20, 0.92)" }}
      />
    </div>
  );
}

function Wall({ cols, className }: { cols: BgLogro[][]; className: string }) {
  return (
    <div
      className={`absolute inset-0 ${className} gap-2 py-6`}
      style={{ paddingLeft: SIDE_PADDING_PX, paddingRight: SIDE_PADDING_PX }}
    >
      {cols.map((col, c) => (
        <div
          key={c}
          // Alternating columns get a -mt-20 offset so the masonry
          // staggers (no horizontal alignment between adjacent
          // columns) and the top of the wall feels continuous (the
          // first card sticks out above the panel and gets clipped,
          // mirroring what already happens at the bottom).
          className={`flex-1 flex flex-col gap-2 ${c % 2 === 1 ? "-mt-20" : ""}`}
        >
          {col.map((card, i) => (
            <BackgroundCard
              key={`${c}-${i}`}
              card={card}
              index={c * 100 + i /* unique-ish for variant cycling */}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Each card varies in size based on its index — deterministic so the
 * wall never re-shuffles between renders. 3 size variants (compact /
 * normal / tall) cycle by index → masonry actually staggers instead
 * of degenerating into a flat grid.
 *
 * Hover behavior: subtle scale-up (1.08) with a 200ms ease-out. The
 * transform creates a new stacking context so the hovered card paints
 * above its neighbors automatically. pointer-events-auto overrides
 * the wrapper's pointer-events-none so the hover actually fires on
 * the card. cursor-default explicitly says "this is not interactive
 * beyond visual feedback" — no pointer cursor that suggests a click.
 */
function BackgroundCard({ card, index }: { card: BgLogro; index: number }) {
  // 3 visual variants cycled deterministically. Different paddings + emoji
  // sizes give the masonry real height variance without rotation.
  const variant = index % 3;
  const padding = variant === 2 ? "p-4" : "p-3";
  const emojiSize = variant === 0 ? "text-2xl" : variant === 1 ? "text-3xl" : "text-4xl";
  const emojiSpacing = variant === 2 ? "my-3" : "my-2";

  return (
    <div
      className={`bg-surface border-2 border-grey rounded-2xl ${padding} pointer-events-auto cursor-default transition-transform duration-200 ease-out hover:scale-[1.08]`}
    >
      <div className="text-right text-[8px] font-bold tracking-widest font-mono text-muted">
        {card.rarityPercent.toFixed(2)}%
      </div>
      <div className={`${emojiSize} ${emojiSpacing} text-center leading-none`}>
        {card.emoji}
      </div>
      <div className="text-[10px] font-black text-white text-center leading-tight tracking-tighter line-clamp-2 min-h-[2.4em]">
        {card.title}
      </div>
      <div className="mt-2 pt-2 border-t border-grey text-[7px] uppercase tracking-[2px] text-muted text-center">
        {card.category}
      </div>
    </div>
  );
}
