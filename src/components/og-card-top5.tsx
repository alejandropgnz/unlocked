import { rarityTier, tierLabel, type Tier } from "@/lib/rarity";

const TIER_HEX: Record<Tier, string> = {
  common: "#9aa0aa",
  rare: "#A78BFA",
  legendary: "#C9A961",
  unique: "#FFD700",
};

interface Item {
  emoji: string;
  title: string;
  rarityPercent: number;
}

export interface OgCardTop5Props {
  username: string;
  displayName: string;
  avatarUrl?: string;
  totalUnlocks: number;
  rarest?: Item;
  top5: Item[];
}

function tierBadge(it: Item): string {
  const tier = rarityTier(it.rarityPercent);
  return `★ ${tierLabel(tier)} · ${it.rarityPercent.toFixed(2)}%`;
}

export function OgCardTop5({
  username,
  displayName,
  avatarUrl,
  totalUnlocks,
  rarest,
  top5,
}: OgCardTop5Props) {
  const usernameStr = `@${username}`;
  const rarestStr = rarest ? `${rarest.rarityPercent.toFixed(2)}%` : "";

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0e0e14",
        backgroundImage:
          "radial-gradient(circle at 50% 0%, rgba(201,169,97,0.12), transparent 50%)",
        padding: "60px 50px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Profile header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        {avatarUrl && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={avatarUrl}
            width={140}
            height={140}
            style={{ borderRadius: 70, border: "4px solid #C9A961" }}
            alt=""
          />
        )}
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: "#fff",
            marginTop: 24,
            letterSpacing: -2,
          }}
        >
          {displayName}
        </div>
        <div style={{ fontSize: 26, color: "rgba(255,255,255,0.5)", marginTop: 8 }}>
          {usernameStr}
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 80,
          marginBottom: 40,
          fontSize: 22,
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              fontSize: 44,
              fontWeight: 900,
              color: "#C9A961",
            }}
          >
            {totalUnlocks}
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 18,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            logros
          </div>
        </div>
        {rarest && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                fontSize: 44,
                fontWeight: 900,
                color: "#A78BFA",
              }}
            >
              {rarestStr}
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 18,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              más raro
            </div>
          </div>
        )}
      </div>

      {/* Cards grid (flexbox rows) */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Row 1: items 0-1 */}
        <div style={{ display: "flex", gap: 20, flex: 1 }}>
          {top5.slice(0, 2).map((it, i) => {
            const tier = rarityTier(it.rarityPercent);
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  backgroundColor: "#16161f",
                  borderRadius: 24,
                  padding: 30,
                  display: "flex",
                  flexDirection: "column",
                  border: `2px solid ${TIER_HEX[tier]}33`,
                }}
              >
                <div style={{ fontSize: 90, textAlign: "center" }}>{it.emoji}</div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 900,
                    color: "#fff",
                    textAlign: "center",
                    lineHeight: 1.05,
                    marginTop: 16,
                    letterSpacing: -0.5,
                  }}
                >
                  {it.title}
                </div>
                <div
                  style={{
                    marginTop: 16,
                    textAlign: "center",
                    fontSize: 16,
                    color: TIER_HEX[tier],
                    letterSpacing: 2,
                    textTransform: "uppercase",
                  }}
                >
                  {tierBadge(it)}
                </div>
              </div>
            );
          })}
        </div>
        {/* Row 2: items 2-3 */}
        <div style={{ display: "flex", gap: 20, flex: 1 }}>
          {top5.slice(2, 4).map((it, i) => {
            const tier = rarityTier(it.rarityPercent);
            return (
              <div
                key={`b${i}`}
                style={{
                  flex: 1,
                  backgroundColor: "#16161f",
                  borderRadius: 24,
                  padding: 30,
                  display: "flex",
                  flexDirection: "column",
                  border: `2px solid ${TIER_HEX[tier]}33`,
                }}
              >
                <div style={{ fontSize: 90, textAlign: "center" }}>{it.emoji}</div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 900,
                    color: "#fff",
                    textAlign: "center",
                    lineHeight: 1.05,
                    marginTop: 16,
                    letterSpacing: -0.5,
                  }}
                >
                  {it.title}
                </div>
                <div
                  style={{
                    marginTop: 16,
                    textAlign: "center",
                    fontSize: 16,
                    color: TIER_HEX[tier],
                    letterSpacing: 2,
                    textTransform: "uppercase",
                  }}
                >
                  {tierBadge(it)}
                </div>
              </div>
            );
          })}
        </div>
        {/* Row 3: item 4 (full width) */}
        {top5.slice(4, 5).map((it, i) => {
          const tier = rarityTier(it.rarityPercent);
          return (
            <div
              key={`c${i}`}
              style={{
                backgroundColor: "#16161f",
                borderRadius: 24,
                padding: 30,
                display: "flex",
                alignItems: "center",
                border: `2px solid ${TIER_HEX[tier]}33`,
              }}
            >
              <div style={{ fontSize: 80 }}>{it.emoji}</div>
              <div style={{ marginLeft: 30, flex: 1, display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 900,
                    color: "#fff",
                    letterSpacing: -0.5,
                  }}
                >
                  {it.title}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontSize: 16,
                    color: TIER_HEX[tier],
                    letterSpacing: 2,
                    textTransform: "uppercase",
                  }}
                >
                  {tierBadge(it)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 30,
          textAlign: "center",
          color: "rgba(255,255,255,0.5)",
          fontSize: 22,
          letterSpacing: 2,
        }}
      >
        hazte tu pasaporte en unlocked.app
      </div>
    </div>
  );
}
