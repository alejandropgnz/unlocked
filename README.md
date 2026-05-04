# Unlocked

Web viral de logros absurdos. Trading-card style con tier por rareza real.

**Stack:** Vite + React 18 + TypeScript + Tailwind v4 + TanStack Query + Supabase + Vercel

## Desarrollo

```bash
npm install
npm run dev          # http://localhost:5173
npm test             # Vitest unit tests
npm run build        # Build de producción
```

## Variables de entorno

Crea `.env.local` (no commit) con:

```
VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
VITE_SITE_URL=http://localhost:5173

# Server-side (sólo serverless functions en api/)
SUPABASE_URL=<same>
SUPABASE_ANON_KEY=<same>
SITE_URL=https://unlocked-rgcv.vercel.app
```

## Estructura

- `src/pages/` — páginas (React Router lazy-loaded)
- `src/components/` — feature components + `ui/` design system primitives
- `src/hooks/` — TanStack Query hooks por dominio
- `src/contexts/AuthContext.tsx` — sesión + perfil + OAuth Google
- `src/lib/` — supabase, rarity, slug, moderation, validators, share, logger
- `api/` — Vercel serverless functions (OG images + crawler HTML)
- `supabase/migrations/` — SQL schema histórico
- `supabase/seed/` — 200 logros curados

## OG Images

`api/page.js` genera HTML para crawlers y `api/og.js` genera imágenes OG dinámicas.
`/og-default.png` se usa como fallback para rutas desconocidas — si no existe, el OG meta dará 404 (los crawlers lo manejan con gracia; reemplazar con imagen real antes del launch).

## Producto

Spec completa en `docs/superpowers/specs/2026-05-04-unlocked-design.md`. Reglas y convenciones en `CLAUDE.md`.
