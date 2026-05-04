// Post-process v3 seed files:
//   1. Drop any INSERT row whose title (4th single-quoted field) exceeds 80 chars.
//   2. Ensure the last surviving INSERT row ends with `)` (no trailing comma)
//      and is followed by `on conflict (slug) do nothing;`.
// Used after the agent runs because they occasionally produce 81-87 char titles
// which would violate the `achievements_title_check` constraint on insert.

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const SEED_DIR = join(ROOT, "supabase", "seed");
const FILES = [
  "achievements-v3-viajes.sql",
  "achievements-v3-trabajo.sql",
  "achievements-v3-amigos.sql",
  "achievements-v3-relaciones.sql",
];

function getTitleLength(line) {
  // Match: `  ('slug', 'title', 'emoji', NULL|'desc', 'cat', 'status'),`
  // Pull the 2nd single-quoted segment (the title).
  // Use a state machine because titles never contain ' (we enforce it).
  const fields = [];
  let inString = false;
  let buf = "";
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === "'") {
      if (inString) {
        fields.push(buf);
        buf = "";
        inString = false;
      } else {
        inString = true;
      }
    } else if (inString) {
      buf += c;
    }
  }
  // fields = [slug, title, emoji, desc?, category, status]
  return (fields[1] ?? "").length;
}

for (const file of FILES) {
  const path = join(SEED_DIR, file);
  const original = readFileSync(path, "utf8");
  const lines = original.split(/\r?\n/);

  const kept = [];
  let dropped = 0;

  for (const line of lines) {
    if (/^  \(/.test(line)) {
      const len = getTitleLength(line);
      if (len > 80) {
        dropped++;
        continue;
      }
      kept.push(line);
    } else {
      kept.push(line);
    }
  }

  // Find the last INSERT row index in kept[] and ensure it ends with `)` (no
  // trailing comma) and is followed by `on conflict (slug) do nothing;`.
  let lastInsertIdx = -1;
  for (let i = kept.length - 1; i >= 0; i--) {
    if (/^  \(/.test(kept[i])) {
      lastInsertIdx = i;
      break;
    }
  }

  if (lastInsertIdx === -1) {
    console.error(`! ${file}: no INSERT rows found, skipping`);
    continue;
  }

  // Strip trailing `,` from the last INSERT row.
  kept[lastInsertIdx] = kept[lastInsertIdx].replace(/,\s*$/, "");

  // Drop any subsequent `on conflict ...` lines we'll re-emit cleanly.
  let cutFrom = kept.length;
  for (let i = lastInsertIdx + 1; i < kept.length; i++) {
    if (/^on conflict/i.test(kept[i]) || /^\s*$/.test(kept[i]) || /^;/.test(kept[i])) {
      cutFrom = i;
      break;
    }
  }
  kept.length = cutFrom;
  kept.push("on conflict (slug) do nothing;", "");

  writeFileSync(path, kept.join("\n"), "utf8");
  const remaining = kept.filter((l) => /^  \(/.test(l)).length;
  console.log(`✓ ${file}: dropped ${dropped} long titles, ${remaining} entries remain`);
}
