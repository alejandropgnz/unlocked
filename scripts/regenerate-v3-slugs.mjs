// Regenerate v3 seed slugs from titles (mirrors src/lib/slug.ts +
// Wisheem's pattern). Detects collisions against v2 + within v3
// and auto-suffixes (-2, -3, ...) for the seed only — user proposals
// will continue to throw SLUG_CONFLICT and ask the user to rephrase.
//
// Run after the agents wrote the v3 files. Idempotent.

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const SEED_DIR = join(process.cwd(), "supabase", "seed");

const V2_FILES = [
  "achievements-v2-part-1.sql",
  "achievements-v2-part-2.sql",
  "achievements-v2-part-3.sql",
  "achievements-v2-part-4.sql",
];

const V3_FILES = [
  "achievements-v3-viajes.sql",
  "achievements-v3-trabajo.sql",
  "achievements-v3-amigos.sql",
  "achievements-v3-relaciones.sql",
];

// Mirrors src/lib/slug.ts but caps at 60 to keep URLs short.
function slugify(input) {
  return input
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60)
    .replace(/^-|-$/g, "");
}

function pullFields(line) {
  // Returns ['slug', 'title', 'emoji', desc, 'cat', 'status'] from a line like
  //   ('slug', 'title', '🔥', NULL, 'cat', 'approved'),
  // Robust against double quotes inside the title (we forbid single quotes
  // inside per the agent prompt). NULL stays as the literal string "NULL".
  const fields = [];
  let inS = false, buf = "";
  for (const c of line) {
    if (c === "'") {
      if (inS) { fields.push(buf); buf = ""; inS = false; }
      else { inS = true; }
    } else if (inS) {
      buf += c;
    }
  }
  return fields;
}

// Build a set of existing v2 slugs to avoid colliding with the prior seed.
const v2Slugs = new Set();
for (const f of V2_FILES) {
  const text = readFileSync(join(SEED_DIR, f), "utf8");
  for (const line of text.split(/\r?\n/)) {
    if (!/^  \(/.test(line)) continue;
    const fields = pullFields(line);
    if (fields[0]) v2Slugs.add(fields[0]);
  }
}
console.log(`Loaded ${v2Slugs.size} v2 slugs as collision set`);

// Process each v3 file
let totalRenamed = 0;
let totalCollisions = 0;
const taken = new Set(v2Slugs); // shared across all v3 files (slug is global)

for (const file of V3_FILES) {
  const path = join(SEED_DIR, file);
  const text = readFileSync(path, "utf8");
  const lines = text.split(/\r?\n/);
  let renamed = 0;
  let collided = 0;

  const out = lines.map((line) => {
    if (!/^  \(/.test(line)) return line;
    const fields = pullFields(line);
    const oldSlug = fields[0];
    const title = fields[1];
    if (!title) return line;

    let base = slugify(title);
    if (!base) base = "logro"; // pathological fallback
    let newSlug = base;
    let n = 2;
    while (taken.has(newSlug)) {
      newSlug = `${base}-${n}`;
      n++;
      collided++;
    }
    taken.add(newSlug);
    if (newSlug !== oldSlug) renamed++;

    // Replace only the slug (the first single-quoted segment)
    return line.replace(/^(  \(')[^']+(')/, `$1${newSlug}$2`);
  });

  writeFileSync(path, out.join("\n"), "utf8");
  console.log(
    `${file}: ${renamed} slug(s) regenerated, ${collided} collision(s) auto-suffixed`,
  );
  totalRenamed += renamed;
  totalCollisions += collided;
}

console.log(`---\nTotal: ${totalRenamed} slugs regenerated, ${totalCollisions} collisions resolved`);
