// One-shot fixer for slugs that snuck accents/ñ into the v3 seed files.
// Strips diacritics and replaces ñ→n in the FIRST single-quoted field (slug).
// Titles are untouched.

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SEED_DIR = join(process.cwd(), "supabase", "seed");
const FILES = [
  "achievements-v3-viajes.sql",
  "achievements-v3-trabajo.sql",
  "achievements-v3-amigos.sql",
  "achievements-v3-relaciones.sql",
];

function normalizeSlug(s) {
  return s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // strip combining diacritics
    .replace(/ñ/g, "n")
    .replace(/Ñ/g, "N");
}

for (const file of FILES) {
  const path = join(SEED_DIR, file);
  const original = readFileSync(path, "utf8");
  let touched = 0;

  const fixed = original.replace(/^  \('([^']+)'/gm, (_match, slug) => {
    const norm = normalizeSlug(slug);
    if (norm !== slug) touched++;
    return `  ('${norm}'`;
  });

  writeFileSync(path, fixed, "utf8");
  console.log(`${file}: normalized ${touched} slug(s)`);
}
