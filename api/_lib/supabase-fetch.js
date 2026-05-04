const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

export function enc(value) {
  return encodeURIComponent(String(value));
}

/**
 * Fetch a single row from a Supabase table via PostgREST.
 * Returns the first row or null. Throws on network/HTTP error.
 */
export async function supabaseFetchOne(query) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${query}`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Accept: "application/vnd.pgrst.object+json", // single row or 406
    },
  });
  if (res.status === 406) return null; // no rows
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase fetch failed (${res.status}): ${text}`);
  }
  return res.json();
}

/**
 * Fetch multiple rows from a Supabase table.
 */
export async function supabaseFetchMany(query) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${query}`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase fetch failed (${res.status}): ${text}`);
  }
  return res.json();
}
