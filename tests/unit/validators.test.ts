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
  it("flags bare domains with trailing slash", () => {
    expect(containsUrl("compra en spam.com/")).toBe(true);
    expect(containsUrl("visita spam.io/pagina")).toBe(true);
  });
  it("flags known short-link domains", () => {
    expect(containsUrl("conecta en discord.gg/abc")).toBe(true);
    expect(containsUrl("mira bit.ly/xyz")).toBe(true);
  });
  it("does not flag clean text", () => {
    expect(containsUrl("Una historia normal sin links")).toBe(false);
    expect(containsUrl("")).toBe(false);
  });
  it("does not flag substrings inside Spanish words (false positive guard)", () => {
    expect(containsUrl("recordamos.cierto evento")).toBe(false);
    expect(containsUrl("información.bonita del día")).toBe(false);
  });
});
