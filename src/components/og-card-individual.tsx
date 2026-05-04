import { rarityTier, tierLabel, type Tier } from "@/lib/rarity";

const TIER_HEX: Record<Tier, string> = {
  common: "#9aa0aa",
  rare: "#A78BFA",
  legendary: "#C9A961",
  unique: "#FFD700",
};

const TIER_BORDER: Record<Tier, string> = {
  common: "linear-gradient(135deg,#3a3a4a,#3a3a4a)",
  rare: "linear-gradient(135deg,#A78BFA,#7C3AED)",
  legendary: "linear-gradient(135deg,#FF6B6B,#C9A961,#A78BFA)",
  unique: "linear-gradient(135deg,#FFD700,#FF6B6B,#FFD700)",
};

export interface OgCardIndividualProps {
  emoji: string;
  title: string;
  rarityPercent: number;
  unlockCount: number;
  category: string;
  username: string;
}

export function OgCardIndividual({
  emoji,
  title,
  rarityPercent,
  unlockCount,
  category,
  username,
}: OgCardIndividualProps) {
  const tier = rarityTier(rarityPercent);
  const tierColor = TIER_HEX[tier];
  const rarityStr = `${rarityPercent.toFixed(2)}%`;
  const unlockStr = `${unlockCount.toLocaleString("es-ES")} unlocked`;
  const handleStr = username ? `@${username} · unlocked.app` : "unlocked.app";
  const tierStr = `★ ${tierLabel(tier)}`;

  return (
    <div
      style={{
        width: "1080px",
        height: "1920px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0e0e14",
        backgroundImage:
          "radial-gradient(circle at 30% 20%, rgba(167,139,250,0.15), transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,107,107,0.1), transparent 50%)",
        padding: "80px 60px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: -1, color: "#fff" }}>
          UNLOCKED
        </div>
        <div
          style={{
            fontSize: 18,
            letterSpacing: 4,
            color: "rgba(255,255,255,0.4)",
            textTransform: "uppercase",
          }}
        >
          your weird life · achieved
        </div>
      </div>

      {/* Card center */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        <div
          style={{
            width: 800,
            padding: 8,
            borderRadius: 48,
            display: "flex",
            backgroundImage: TIER_BORDER[tier],
          }}
        >
          <div
            style={{
              flex: 1,
              padding: "60px 50px",
              borderRadius: 40,
              backgroundColor: "#16161f",
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              justifyContent: "flex-start",
            }}
          >
            {/* Tier + rarity row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 4,
                color: tierColor,
              }}
            >
              <div>{tierStr}</div>
              <div>{rarityStr}</div>
            </div>
            {/* Emoji */}
            <div style={{ fontSize: 220, textAlign: "center", margin: "60px 0" }}>{emoji}</div>
            {/* Title */}
            <div
              style={{
                fontSize: 60,
                fontWeight: 900,
                letterSpacing: -2,
                color: "#fff",
                textAlign: "center",
                lineHeight: 1.05,
              }}
            >
              {title}
            </div>
            {/* Category + unlock count */}
            <div
              style={{
                marginTop: 48,
                paddingTop: 32,
                borderTop: "2px solid rgba(255,255,255,0.08)",
                display: "flex",
                justifyContent: "space-between",
                fontSize: 22,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              <div>{category}</div>
              <div>{unlockStr}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.05)",
          borderRadius: 24,
          padding: "24px 40px",
          fontSize: 28,
          fontWeight: 700,
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span>SOLO EL</span>
          <span style={{ color: tierColor }}>{rarityStr}</span>
          <span>LO TIENE</span>
        </div>
        <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)" }}>{handleStr}</div>
      </div>
    </div>
  );
}
