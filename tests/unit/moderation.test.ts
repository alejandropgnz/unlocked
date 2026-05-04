import { describe, expect, it } from "vitest";
import {
  containsBlockedWord,
  similarity,
  isDuplicateTitle,
} from "@/lib/moderation";

describe("containsBlockedWord", () => {
  it("flags blocked words case-insensitively", () => {
    expect(containsBlockedWord("contiene puta mierda")).toBe(true);
    expect(containsBlockedWord("PUTA MIERDA")).toBe(true);
  });

  it("does not flag clean text", () => {
    expect(containsBlockedWord("texto limpio")).toBe(false);
    expect(containsBlockedWord("")).toBe(false);
  });

  it("does not flag substrings inside other words (word boundary check)", () => {
    // 'asputado' should NOT trigger 'puta' (substring inside another word)
    expect(containsBlockedWord("disputa amistosa")).toBe(false);
  });
});

describe("similarity", () => {
  it("returns 1 for identical strings", () => {
    expect(similarity("hola", "hola")).toBe(1);
  });

  it("returns 0 when both strings are empty", () => {
    expect(similarity("", "")).toBe(1);
  });

  it("returns a value between 0 and 1 for partial matches", () => {
    const s = similarity("hola mundo", "ola mundo");
    expect(s).toBeGreaterThan(0.85);
    expect(s).toBeLessThan(1);
  });

  it("is case-insensitive and trims", () => {
    expect(similarity("  Hola  ", "hola")).toBe(1);
  });
});

describe("isDuplicateTitle", () => {
  it("flags near-duplicates above threshold", () => {
    expect(
      isDuplicateTitle("Mi padre se fue a por tabaco", [
        "mi padre se fué a por tabaco y no volvió",
      ]),
    ).toBe(true);
  });

  it("does not flag distinct titles", () => {
    expect(
      isDuplicateTitle("Algo totalmente nuevo", [
        "mi padre se fue a por tabaco",
      ]),
    ).toBe(false);
  });

  it("returns false when existing list is empty", () => {
    expect(isDuplicateTitle("cualquier cosa", [])).toBe(false);
  });

  it("respects an explicit threshold parameter", () => {
    expect(isDuplicateTitle("hola mundo", ["holaa mundo"], 0.99)).toBe(false);
    expect(isDuplicateTitle("hola mundo", ["holaa mundo"], 0.85)).toBe(true);
  });

  it("does not flag short titles that are substrings of much longer ones", () => {
    expect(
      isDuplicateTitle("He visto el mar", [
        "He visto el mar más bonito de mi vida en Croacia con mi novia",
      ]),
    ).toBe(false);
    expect(
      isDuplicateTitle("Amor", ["Amor de verano que no pudo ser"]),
    ).toBe(false);
  });
});
