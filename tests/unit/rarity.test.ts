import { describe, expect, it } from "vitest";
import { rarityTier, tierBorderClass, type Tier } from "@/lib/rarity";

describe("rarityTier", () => {
  it("returns common when percent > 10", () => {
    expect(rarityTier(15)).toBe<Tier>("common");
  });

  it("returns rare when 1 <= percent <= 10", () => {
    expect(rarityTier(5)).toBe<Tier>("rare");
    expect(rarityTier(1)).toBe<Tier>("rare");
    expect(rarityTier(10)).toBe<Tier>("rare");
  });

  it("returns legendary when 0 < percent < 1", () => {
    expect(rarityTier(0.04)).toBe<Tier>("legendary");
    expect(rarityTier(0.99)).toBe<Tier>("legendary");
  });

  it("returns unique when only one user has it and it equals total users", () => {
    expect(rarityTier(100, { totalUsers: 1, unlockCount: 1 })).toBe<Tier>("unique");
  });

  it("returns legendary when percent is zero (nobody has it yet)", () => {
    // An achievement with 0 unlocks (unlock_count=0) produces rarity_percent=0.
    // Showing it as "common" (grey) is misleading — it should be "legendary"
    // since literally no one else has unlocked it.
    expect(rarityTier(0)).toBe<Tier>("legendary");
  });
});

describe("tierBorderClass", () => {
  it("returns a non-empty class for every tier", () => {
    expect(tierBorderClass("common")).not.toBe("");
    expect(tierBorderClass("rare")).not.toBe("");
    expect(tierBorderClass("legendary")).not.toBe("");
    expect(tierBorderClass("unique")).not.toBe("");
  });

  it("uses gradient for legendary and unique tiers", () => {
    expect(tierBorderClass("legendary")).toContain("gradient");
    expect(tierBorderClass("unique")).toContain("gradient");
  });
});
