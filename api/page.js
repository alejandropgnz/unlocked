// Edge function — returns crawler-friendly HTML with OG meta for bots,
// called via vercel.json rewrites when a bot User-Agent is detected.
// Routes handled: /l/:slug, /u/:username/:slug, /u/:username

import { supabaseFetchOne } from "./_lib/supabase-fetch.js";

export const config = { runtime: "edge" };

const SLUG_RE = /^[a-z0-9-]{1,80}$/i;
const USERNAME_RE = /^[a-z0-9_]{3,20}$/i;

const SITE_URL =
  process.env.SITE_URL ||
  process.env.VITE_SITE_URL ||
  "https://unlocked-rgcv.vercel.app";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function htmlShell({ title, description, ogImage, canonical }) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1.0" />
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}" />
<link rel="canonical" href="${escapeHtml(canonical)}" />
<meta property="og:type" content="website" />
<meta property="og:title" content="${escapeHtml(title)}" />
<meta property="og:description" content="${escapeHtml(description)}" />
<meta property="og:image" content="${escapeHtml(ogImage)}" />
<meta property="og:image:width" content="1080" />
<meta property="og:image:height" content="1920" />
<meta property="og:url" content="${escapeHtml(canonical)}" />
<meta property="og:site_name" content="Unlocked" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(title)}" />
<meta name="twitter:description" content="${escapeHtml(description)}" />
<meta name="twitter:image" content="${escapeHtml(ogImage)}" />
</head>
<body>
<h1>${escapeHtml(title)}</h1>
<p>${escapeHtml(description)}</p>
<p><a href="${escapeHtml(canonical)}">Ver en Unlocked</a></p>
</body>
</html>`;
}

export default async function handler(req) {
  const url = new URL(req.url);
  const path = url.searchParams.get("path") || "/";

  try {
    // /l/<slug> — generic achievement
    const lMatch = path.match(/^\/l\/([^/]+)\/?$/);
    if (lMatch) {
      const slug = lMatch[1];
      if (!SLUG_RE.test(slug)) return new Response("Bad slug", { status: 400 });

      const ach = await supabaseFetchOne(
        `achievements?slug=eq.${encodeURIComponent(slug)}&status=eq.approved&select=title,description,emoji`,
      );
      if (!ach) return new Response("Not found", { status: 404 });

      const title = `${ach.emoji} ${ach.title} · Unlocked`;
      const description =
        ach.description || "Colecciona los logros más absurdos de tu vida.";
      const ogImage = `${SITE_URL}/api/og-achievement?slug=${encodeURIComponent(slug)}`;
      const canonical = `${SITE_URL}/l/${slug}`;
      return new Response(htmlShell({ title, description, ogImage, canonical }), {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    // /u/<username>/<slug> — personal unlock (must test before /u/:username)
    const uuMatch = path.match(/^\/u\/([^/]+)\/([^/]+)\/?$/);
    if (uuMatch) {
      const username = uuMatch[1].toLowerCase();
      const slug = uuMatch[2];
      if (!USERNAME_RE.test(username) || !SLUG_RE.test(slug)) {
        return new Response("Bad params", { status: 400 });
      }

      const profile = await supabaseFetchOne(
        `profiles?username=eq.${encodeURIComponent(username)}&select=id,username,display_name`,
      );
      if (!profile) return new Response("Not found", { status: 404 });

      const ach = await supabaseFetchOne(
        `achievements?slug=eq.${encodeURIComponent(slug)}&status=eq.approved&select=id,title,emoji`,
      );
      if (!ach) return new Response("Not found", { status: 404 });

      const unlock = await supabaseFetchOne(
        `unlocks?user_id=eq.${encodeURIComponent(profile.id)}&achievement_id=eq.${encodeURIComponent(ach.id)}&select=id`,
      );
      if (!unlock) return new Response("Not found", { status: 404 });

      const title = `${ach.emoji} ${profile.display_name} desbloqueó: ${ach.title} · Unlocked`;
      const description = `@${profile.username} en Unlocked.`;
      const ogImage = `${SITE_URL}/api/og-unlock?username=${encodeURIComponent(username)}&slug=${encodeURIComponent(slug)}`;
      const canonical = `${SITE_URL}/u/${username}/${slug}`;
      return new Response(htmlShell({ title, description, ogImage, canonical }), {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    // /u/<username> — profile
    const uMatch = path.match(/^\/u\/([^/]+)\/?$/);
    if (uMatch) {
      const username = uMatch[1].toLowerCase();
      if (!USERNAME_RE.test(username)) return new Response("Bad username", { status: 400 });

      const profile = await supabaseFetchOne(
        `profiles?username=eq.${encodeURIComponent(username)}&select=username,display_name,bio`,
      );
      if (!profile) return new Response("Not found", { status: 404 });

      const title = `@${profile.username} · Unlocked`;
      const description =
        profile.bio || `${profile.display_name} colecciona logros absurdos en Unlocked.`;
      const ogImage = `${SITE_URL}/api/og-profile?username=${encodeURIComponent(username)}`;
      const canonical = `${SITE_URL}/u/${username}`;
      return new Response(htmlShell({ title, description, ogImage, canonical }), {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    // Default: home / fallback — serve a minimal HTML so crawlers get something
    const title = "Unlocked — your weird life · achieved";
    const description = "Colecciona los logros más absurdos de tu vida.";
    const ogImage = `${SITE_URL}/og-default.png`;
    const canonical = SITE_URL + path;
    return new Response(htmlShell({ title, description, ogImage, canonical }), {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (err) {
    console.error("[page] error:", err);
    return new Response("Server error", { status: 500 });
  }
}
