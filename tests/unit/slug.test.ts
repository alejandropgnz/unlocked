import { describe, expect, it } from "vitest";
import { slugify } from "@/lib/slug";

describe("slugify", () => {
  it("removes accents and lowercases", () => {
    expect(slugify("Mi Padre Se Fué a por Tabaco")).toBe(
      "mi-padre-se-fue-a-por-tabaco",
    );
  });

  it("trims and dedupes hyphens", () => {
    expect(slugify("  hola   mundo  ")).toBe("hola-mundo");
    expect(slugify("hola---mundo")).toBe("hola-mundo");
  });

  it("strips punctuation but keeps unicode letters/numbers", () => {
    expect(slugify("¡Vaya 🚬 día!")).toBe("vaya-dia");
    expect(slugify("Año 2026")).toBe("ano-2026");
  });

  it("limits length to 80", () => {
    const long = "a".repeat(200);
    const result = slugify(long);
    expect(result.length).toBeLessThanOrEqual(80);
  });

  it("returns an empty string for input with only punctuation/emoji", () => {
    expect(slugify("¡!?🚬")).toBe("");
  });
});
