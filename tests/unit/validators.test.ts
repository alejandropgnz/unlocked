import { describe, expect, it } from "vitest";
import { containsUrl } from "@/lib/validators";

describe("containsUrl", () => {
  it("flags https links", () => {
    expect(containsUrl("visita https://spam.com aquí")).toBe(true);
    expect(containsUrl("HTTP://spam.com")).toBe(true);
  });
  it("flags www-prefixed links", () => {
    expect(containsUrl("ve a www.spam.es")).toBe(true);
  });
  it("flags bare domains", () => {
    expect(containsUrl("compra en spam.com")).toBe(true);
    expect(containsUrl("visita spam.io/pagina")).toBe(true);
  });
  it("flags known short-link domains", () => {
    expect(containsUrl("conecta en discord.gg/abc")).toBe(true);
    expect(containsUrl("mira bit.ly/xyz")).toBe(true);
  });
  it("flags any word.word pattern (strict)", () => {
    // The strict rule: if the user writes word.word without space, we reject.
    // Catches custom-domain abuse and URL-like patterns regardless of TLD.
    expect(containsUrl("recordamos.cierto evento")).toBe(true);
    expect(containsUrl("evento.especial")).toBe(true);
    expect(containsUrl("my.site")).toBe(true);
  });
  it("does not flag clean text", () => {
    expect(containsUrl("Una historia normal sin links")).toBe(false);
    expect(containsUrl("")).toBe(false);
  });
  it("does not flag a sentence with a period followed by a space", () => {
    // Normal punctuation. Sentences end with `. ` (dot + space).
    expect(containsUrl("Algo pasó. Luego pasó otra cosa")).toBe(false);
    expect(containsUrl("recordamos. cierto evento")).toBe(false);
  });
});
