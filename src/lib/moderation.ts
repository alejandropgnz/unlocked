const BLOCKLIST = [
  "puta", "puto", "mierda", "joder",
  // Expand as needed; intentionally short for MVP. Reviewer can add more later.
];

export function containsBlockedWord(text: string): boolean {
  if (!text) return false;
  const t = text.toLowerCase();
  return BLOCKLIST.some((w) =>
    new RegExp(`\\b${w}\\b`, "i").test(t),
  );
}

export function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  // Use a single rolling array for memory efficiency.
  let prev = new Array(n + 1);
  let curr = new Array(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;
  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(
        prev[j] + 1,
        curr[j - 1] + 1,
        prev[j - 1] + cost,
      );
    }
    [prev, curr] = [curr, prev];
  }
  return prev[n];
}

export function similarity(a: string, b: string): number {
  const aN = a.toLowerCase().trim();
  const bN = b.toLowerCase().trim();
  const maxLen = Math.max(aN.length, bN.length);
  if (maxLen === 0) return 1;
  return 1 - levenshtein(aN, bN) / maxLen;
}

function normalizeTitle(s: string): string {
  return s
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

export function isDuplicateTitle(
  candidate: string,
  existing: string[],
  threshold = 0.85,
): boolean {
  const normCandidate = normalizeTitle(candidate);
  return existing.some((e) => {
    if (similarity(candidate, e) >= threshold) return true;
    // Containment check: if the normalized candidate is a substring of an
    // existing title (or vice versa), treat as duplicate regardless of length.
    const normE = normalizeTitle(e);
    return normE.includes(normCandidate) || normCandidate.includes(normE);
  });
}
