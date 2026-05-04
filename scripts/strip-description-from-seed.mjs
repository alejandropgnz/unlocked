// Strip the `description` column from existing seed files (v2 + v3) so
// future re-runs work after migration _014 dropped the column.
//
// Two surgical edits per file:
//   1. INSERT INTO achievements (slug, title, emoji, DESCRIPTION, category, status)
//      becomes (slug, title, emoji, category, status)
//   2. Each row tuple ('slug','title','emoji', NULL|'desc', 'cat','status')
//      drops the 4th field.
//
// Robust: parses each row by walking single quotes (titles can contain
// double quotes but never single quotes — we enforce that elsewhere).

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SEED_DIR = join(process.cwd(), "supabase", "seed");
const FILES = [
  "achievements-v2-part-1.sql",
  "achievements-v2-part-2.sql",
  "achievements-v2-part-3.sql",
  "achievements-v2-part-4.sql",
  "achievements-v3-viajes.sql",
  "achievements-v3-trabajo.sql",
  "achievements-v3-amigos.sql",
  "achievements-v3-relaciones.sql",
];

/** Parse a row line: returns the array of field tokens (preserving NULL
 * literal vs quoted strings) or null if not a row line. */
function parseRow(line) {
  if (!/^  \(/.test(line)) return null;
  // Tokens between commas, but commas inside single-quoted strings don't count.
  const tokens = [];
  let buf = "";
  let inS = false;
  let depth = 0;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === "'" && line[i - 1] !== "\\") {
      inS = !inS;
      buf += c;
      continue;
    }
    if (!inS) {
      if (c === "(") {
        if (depth > 0) buf += c;
        depth++;
        continue;
      }
      if (c === ")") {
        depth--;
        if (depth === 0) {
          tokens.push(buf.trim());
          buf = "";
          continue;
        }
        buf += c;
        continue;
      }
      if (c === "," && depth === 1) {
        tokens.push(buf.trim());
        buf = "";
        continue;
      }
    }
    buf += c;
  }
  return tokens;
}

function emitRow(tokens, trailingComma) {
  return `  (${tokens.join(", ")})${trailingComma}`;
}

let totalRowsTouched = 0;

for (const file of FILES) {
  const path = join(SEED_DIR, file);
  let text;
  try {
    text = readFileSync(path, "utf8");
  } catch (e) {
    console.warn(`! ${file}: not found, skipping`);
    continue;
  }

  const lines = text.split(/\r?\n/);
  let rowsTouched = 0;
  let headerTouched = false;

  const out = lines.map((line) => {
    // Header rewrite: drop the description column from the column list.
    if (
      /^insert into achievements/i.test(line) &&
      /\bdescription\b/.test(line)
    ) {
      headerTouched = true;
      return line.replace(/,\s*description/i, "");
    }

    const tokens = parseRow(line);
    if (!tokens || tokens.length < 6) return line;

    // Row tuple: tokens are [slug, title, emoji, description, category, status]
    // Drop index 3 (description).
    const newTokens = [tokens[0], tokens[1], tokens[2], tokens[4], tokens[5]];

    // Preserve trailing punctuation (`,` or no comma + maybe space)
    const tail = line.slice(line.lastIndexOf(")") + 1);
    rowsTouched++;
    return emitRow(newTokens, tail);
  });

  writeFileSync(path, out.join("\n"), "utf8");
  console.log(
    `${file}: ${headerTouched ? "header rewritten, " : ""}${rowsTouched} rows updated`,
  );
  totalRowsTouched += rowsTouched;
}

console.log(`---\nTotal: ${totalRowsTouched} rows had their description field stripped`);
