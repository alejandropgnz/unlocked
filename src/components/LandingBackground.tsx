/* Atmospheric "wall of cards" background for the landing. ~25 real logros
 * laid out in a CSS-columns masonry, each with a slight deterministic
 * rotation. The cards themselves are SOLID (bg-surface, full-opacity
 * border) — the dim/translucent feel comes from a single dark overlay
 * sitting between this layer and the foreground swipe deck. That way it
 * reads as "wall of cards seen through tinted glass", not as faded
 * content per se.
 *
 * Hidden on mobile: in a 375px viewport columns-1/2 doesn't generate the
 * masonry feel and only crowds the focal swipe deck. Desktop only (md+).
 */

interface BgLogro {
  emoji: string;
  title: string;
  rarityPercent: number;
  category: string;
}

const BG_LOGROS: BgLogro[] = [
  { emoji: "🚬", title: "Mi padre se fue a por tabaco y no volvió", rarityPercent: 0.04, category: "familia" },
  { emoji: "🛌", title: "He pasado un finde sin dormir", rarityPercent: 12.4, category: "salud" },
  { emoji: "🤮", title: "He vomitado en la cena de empresa", rarityPercent: 8.2, category: "trabajo" },
  { emoji: "💀", title: "Le di like a una foto de mi ex de 2018", rarityPercent: 18.6, category: "relaciones" },
  { emoji: "📱", title: "Stalkeé el insta de mi ex a las 3am", rarityPercent: 22.7, category: "relaciones" },
  { emoji: "🍻", title: "He bebido cerveza para desayunar", rarityPercent: 6.1, category: "resaca" },
  { emoji: "💼", title: "He llorado en el baño de la oficina", rarityPercent: 14.3, category: "trabajo" },
  { emoji: "📧", title: "Le di a Responder a todos en un correo que no debía", rarityPercent: 10.8, category: "trabajo" },
  { emoji: "😱", title: "Encendí la cámara en Teams y estaba en pijama", rarityPercent: 7.4, category: "trabajo" },
  { emoji: "🫥", title: "Cancelé un plan inventando que estaba malo", rarityPercent: 32.1, category: "amigos" },
  { emoji: "🔕", title: "Mantengo silenciado el grupo del cole", rarityPercent: 28.4, category: "amigos" },
  { emoji: "👀", title: "Leí el mensaje y no respondí nunca", rarityPercent: 41.2, category: "amigos" },
  { emoji: "🛒", title: "Me perdí el vuelo por mirar las tiendas", rarityPercent: 1.2, category: "viajes" },
  { emoji: "😤", title: "Me peleé con mi pareja en el aeropuerto", rarityPercent: 5.3, category: "viajes" },
  { emoji: "🍱", title: "Me robaron el túper del frigorífico", rarityPercent: 6.8, category: "trabajo" },
  { emoji: "🎤", title: "Hablé 5 minutos sin saber que estaba muteado", rarityPercent: 19.2, category: "trabajo" },
  { emoji: "🤥", title: "Mentí sobre saber Excel en la entrevista", rarityPercent: 24.6, category: "trabajo" },
  { emoji: "📞", title: "Le he llamado mamá a mi jefe", rarityPercent: 3.4, category: "trabajo" },
  { emoji: "🏖️", title: "Me quemé el primer día de playa", rarityPercent: 16.8, category: "viajes" },
  { emoji: "🥲", title: "He llorado viendo un anuncio", rarityPercent: 8.6, category: "random" },
  { emoji: "💔", title: "Me dejaron sin dar ninguna explicación", rarityPercent: 18.1, category: "amor" },
  { emoji: "🪑", title: "Guardé silla con chaqueta y vino alguien igual", rarityPercent: 4.2, category: "verguenza" },
  { emoji: "🚪", title: "He fingido no estar en casa al llamar a la puerta", rarityPercent: 22.0, category: "random" },
  { emoji: "📺", title: "He visto una serie para evitar una conversación", rarityPercent: 13.5, category: "relaciones" },
  { emoji: "🚇", title: "Me subí al metro en sentido contrario", rarityPercent: 38.0, category: "verguenza" },
];

export function LandingBackground() {
  return (
    <>
      {/* Cards layer — masonry via CSS columns. Hidden on mobile. */}
      <div
        aria-hidden
        className="hidden md:block absolute inset-0 z-0 overflow-hidden px-4 py-8"
      >
        <div className="columns-3 lg:columns-4 xl:columns-5 gap-3 lg:gap-4">
          {BG_LOGROS.map((card, i) => (
            <BackgroundCard key={i} card={card} index={i} />
          ))}
        </div>
      </div>

      {/* Single dark overlay above the cards, below the foreground content.
          0.78 alpha mutes the cards into "atmosphere" without losing their
          shape — you can still tell those are achievement cards. */}
      <div
        aria-hidden
        className="hidden md:block absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "rgba(14, 14, 20, 0.78)" }}
      />
    </>
  );
}

function BackgroundCard({ card, index }: { card: BgLogro; index: number }) {
  // Deterministic rotation per index so cards don't twitch on re-render.
  // Range -3° to +3°, distributed by hashing the index.
  const rotations = [-3, -2, -1.5, 1, 2.5, 3, -2, 1.5];
  const rotation = rotations[index % rotations.length];

  return (
    <div
      className="break-inside-avoid mb-3 lg:mb-4 bg-surface border-2 border-grey rounded-2xl p-3"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="text-right text-[8px] font-bold tracking-widest font-mono text-muted">
        {card.rarityPercent.toFixed(2)}%
      </div>
      <div className="text-3xl text-center my-2 leading-none">{card.emoji}</div>
      <div className="text-[10px] font-black text-white text-center leading-tight tracking-tighter line-clamp-2 min-h-[2.4em]">
        {card.title}
      </div>
      <div className="mt-2 pt-2 border-t border-grey text-[7px] uppercase tracking-[2px] text-muted text-center">
        {card.category}
      </div>
    </div>
  );
}
