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
    // Containment check: only apply if the shorter string is at least 60% the
    // length of the longer one, to avoid false positives where a short title
    // happens to be a substring of a much longer unrelated one.
    const normE = normalizeTitle(e);
    const lenA = normCandidate.length;
    const lenB = normE.length;
    const minLen = Math.min(lenA, lenB);
    const maxLen = Math.max(lenA, lenB);
    if (maxLen > 0) {
      const ratio = minLen / maxLen;
      if (ratio >= 0.6) {
        if (normE.includes(normCandidate) || normCandidate.includes(normE)) {
          return true;
        }
      }
    }
    return false;
  });
}
