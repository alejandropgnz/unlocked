/* Atmospheric "wall of cards" framing the landing's central swipe deck.
 * Two side panels (left + right) populated with real catalog logros in a
 * CSS-columns masonry. The center column is a void (~580px wide) reserved
 * for the swipe deck — cards never sit behind it.
 *
 * Cards are SOLID; an overlay over each panel does the dimming, so each
 * card still reads as a real achievement, just seen through tinted glass.
 *
 * Hidden below lg (1024px). At md the side panels would be too narrow for
 * a 1-column masonry to feel like a wall.
 *
 * Cards are repeated REPEATS times so the column always overflows the
 * viewport (clipped by overflow-hidden) — guarantees the wall fills the
 * whole height even on tall monitors. Each card gets a deterministic
 * size variant + rotation so the wall feels organic, not gridded. The
 * 0.92 black overlay makes the repetition imperceptible: cards read as
 * texture, not as identifiable copies.
 */
const REPEATS = 3;

interface BgLogro {
  emoji: string;
  title: string;
  rarityPercent: number;
  category: string;
}

const LEFT_LOGROS: BgLogro[] = [
  { emoji: "🚬", title: "Mi padre se fue a por tabaco y no volvió", rarityPercent: 0.04, category: "familia" },
  { emoji: "💀", title: "Le di like a una foto de mi ex de 2018", rarityPercent: 18.6, category: "relaciones" },
  { emoji: "🛌", title: "He pasado un finde sin dormir", rarityPercent: 12.4, category: "salud" },
  { emoji: "📧", title: "Le di a Responder a todos sin querer", rarityPercent: 10.8, category: "trabajo" },
  { emoji: "🫥", title: "Cancelé un plan inventando que estaba malo", rarityPercent: 32.1, category: "amigos" },
  { emoji: "🛒", title: "Me perdí el vuelo por mirar las tiendas", rarityPercent: 1.2, category: "viajes" },
  { emoji: "💒", title: "Mi tía me pregunta cuándo me caso", rarityPercent: 52.0, category: "familia" },
  { emoji: "🥲", title: "He llorado viendo un anuncio", rarityPercent: 8.6, category: "random" },
];

const RIGHT_LOGROS: BgLogro[] = [
  { emoji: "📱", title: "Stalkeé el insta de mi ex a las 3am", rarityPercent: 22.7, category: "relaciones" },
  { emoji: "🤖", title: "Usé la IA de psicólogo", rarityPercent: 18.4, category: "salud" },
  { emoji: "💼", title: "He llorado en el baño de la oficina", rarityPercent: 14.3, category: "trabajo" },
  { emoji: "🍻", title: "He bebido cerveza para desayunar", rarityPercent: 6.1, category: "resaca" },
  { emoji: "🔕", title: "Mantengo silenciado el grupo del cole", rarityPercent: 28.4, category: "amigos" },
  { emoji: "🍽️", title: "He sobrevivido a una cena de Navidad sin política", rarityPercent: 12.0, category: "familia" },
  { emoji: "💔", title: "Me dejaron sin dar ninguna explicación", rarityPercent: 18.1, category: "amor" },
  { emoji: "🚇", title: "Me subí al metro en sentido contrario", rarityPercent: 38.0, category: "verguenza" },
];

// Symmetric whitespace pattern: cards have the same margin to the deck
// edge as they have to the viewport edge.
//
//   half deck width = 256 (max-w-lg / 2 at lg+ breakpoint)
//   margin Y = 28
//
// HALF_VOID_PX = 256 + Y means the panel ends Y px BEFORE the deck.
// Combined with asymmetric panel padding (`pl-Y pr-0` on left,
// `pl-0 pr-Y` on right), each card has Y on its viewport-facing edge AND
// Y on its deck-facing edge. Visually balanced.
//
// Why 256 (not 224 like the mobile/sm card width): the swipe deck
// upgrades to max-w-lg (512px) at lg breakpoint where the side panels
// become visible. At lg the deck is always 512 wide, so HALF_VOID_PX
// reflects that — never the smaller 448 used at sm/md.
const SIDE_MARGIN_PX = 28;
const HALF_VOID_PX = 256 + SIDE_MARGIN_PX;

export function LandingBackground() {
  return (
    <div
      aria-hidden
      className="hidden lg:block absolute inset-0 z-0 pointer-events-none"
    >
      <SidePanel side="left" cards={LEFT_LOGROS} />
      <SidePanel side="right" cards={RIGHT_LOGROS} />
    </div>
  );
}

function SidePanel({
  side,
  cards,
}: {
  side: "left" | "right";
  cards: BgLogro[];
}) {
  const positionStyle: React.CSSProperties =
    side === "left"
      ? { left: 0, width: `calc(50% - ${HALF_VOID_PX}px)` }
      : { right: 0, width: `calc(50% - ${HALF_VOID_PX}px)` };

  // Asymmetric padding so the card edge facing the deck has 0 panel
  // padding (the void itself provides the visual margin), while the
  // viewport-facing edge has SIDE_MARGIN_PX worth of breathing.
  const innerPadStyle: React.CSSProperties =
    side === "left"
      ? { paddingLeft: SIDE_MARGIN_PX, paddingRight: 0 }
      : { paddingLeft: 0, paddingRight: SIDE_MARGIN_PX };

  // Repeat the source array so the column always overflows. Offset the
  // start index per repeat to avoid stacking identical cards on top of
  // each other when columns wrap.
  const expanded: BgLogro[] = [];
  for (let r = 0; r < REPEATS; r++) {
    for (let i = 0; i < cards.length; i++) {
      expanded.push(cards[(i + r * 3) % cards.length]);
    }
  }

  return (
    <div
      className="absolute top-0 bottom-0 overflow-hidden"
      style={positionStyle}
    >
      <div
        className="columns-1 xl:columns-2 gap-3 lg:gap-4 py-6"
        style={innerPadStyle}
      >
        {expanded.map((card, i) => (
          <BackgroundCard key={i} card={card} index={i} />
        ))}
      </div>

      {/* Heavy dark overlay — cards stay readable as silhouettes only,
          shouldn't compete with the foreground swipe deck. */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(14, 14, 20, 0.92)" }}
      />
    </div>
  );
}

/**
 * Each card varies in 3 ways based on its index — deterministic so the
 * wall never re-shuffles between renders:
 *  - size variant (compact / normal / tall) → masonry actually staggers
 *    instead of degenerating into a grid
 *  - rotation ±1.6° → organic, not perfectly aligned
 *  - emoji scale follows the size variant
 */
function BackgroundCard({ card, index }: { card: BgLogro; index: number }) {
  // 3 visual variants cycled deterministically. Different paddings + emoji
  // sizes give the masonry real height variance.
  const variant = index % 3;
  const padding = variant === 2 ? "p-4" : "p-3";
  const emojiSize = variant === 0 ? "text-2xl" : variant === 1 ? "text-3xl" : "text-4xl";
  const emojiSpacing = variant === 2 ? "my-3" : "my-2";

  // Pseudo-random but deterministic rotation per card. Multiplying by a
  // prime (37) and modding by 9 gives a varied -2..+2 distribution
  // without needing Math.random (which would re-shuffle every render).
  const rotateDeg = (((index * 37) % 9) - 4) * 0.4;

  return (
    <div
      className={`break-inside-avoid mb-3 lg:mb-4 bg-surface border-2 border-grey rounded-2xl ${padding}`}
      style={{ transform: `rotate(${rotateDeg}deg)` }}
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
