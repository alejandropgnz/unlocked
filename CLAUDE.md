# Unlocked

Web viral de logros absurdos de la vida. Los users desbloquean logros ("mi padre se fue a por tabaco y no volvió", "1 finde sin dormir"), cuentan su historia, comentan en foros y comparten share-cards con tier por rareza real.

## Stack

- **Frontend**: React 18 + TypeScript + Vite (port 5173)
- **UI**: Tailwind CSS v4 + componentes propios (sistema de diseño en `src/components/ui/`)
- **Backend/DB**: Supabase (Postgres + Auth con Google OAuth)
- **Estado**: TanStack Query + Context API (AuthContext)
- **Deploy**: Vercel (serverless functions en `api/` para mutaciones, OG y crawler HTML)
- **Animación**: framer-motion (swipe deck), canvas-confetti (adjudicar)
- **Drag & drop**: @dnd-kit (Top-5 reorder)
- **Forms**: react-hook-form + Zod
- **Toasts**: sonner

## Comandos

- `npm run dev` — Vite dev server
- `npm run build` — Build de producción (Vite)
- `npm test` — Vitest (unit)
- `npx tsc --noEmit` — Verificar tipos (strict mode)
- `npm run lint` — ESLint flat config

## Estructura

```
src/
  pages/           → Páginas (Home, AchievementDetail, Profile, UserUnlock, Yo, Crear, Admin, Descubrir, StoryThread, Legal, Login)
  components/      → Componentes de feature (AchievementCard, AdjudicateModal, SwipeDeck, ShareCardModal, …)
  components/ui/   → Sistema de diseño primitivos (Button, Input, Textarea, Modal, Card, Tabs, …)
  hooks/           → Hooks de datos por dominio (useAchievement, useAchievements, useUnlocks, useStories, useReplies, useReactions, useTop5, useReport)
  contexts/        → AuthContext (sesión + perfil + OAuth)
  lib/             → supabase.ts, rarity.ts, slug.ts, moderation.ts, validators.ts, share.ts, logger.ts, safeUrl.ts
  types/           → database.ts (tipos hand-written de schema Supabase)
api/               → Serverless functions Vercel
  og-unlock.js        → PNG personal de unlock concreto (params: username + slug)
  og-profile.js       → PNG Top-5 de un perfil (param: username)
  og-achievement.js   → PNG genérico de un logro (param: slug)
  page.js             → HTML server-rendered para crawlers (preview rico)
  react.js            → POST upsert/delete reacción
  report.js           → POST crear report
  track.js            → POST evento custom
  adjudicate.js       → POST adjudicar logro (+ historia opcional)
  propose.js          → POST proponer logro (con moderation pipeline)
  reply.js            → POST responder en hilo
  admin/approve.js    → POST aprobar logro pendiente (+ auto-unlock proposer)
  admin/reject.js     → POST rechazar logro
  admin/resolve-report.js
  admin/dismiss-report.js
  yo/save-bio.js      → POST update bio
  yo/save-top5.js     → POST update top5 (con ownership check)
  yo/delete.js        → POST CASCADE delete account
supabase/
  migrations/      → SQL ya aplicado en producción (histórico)
  seed/            → 200 logros curados (achievements.sql)
```

## Paleta de colores

Tokens en `src/index.css` (Tailwind v4 `@theme inline`):

| Token Tailwind | HEX | Uso |
|---|---|---|
| `bg` | `#0e0e14` | Fondo de página |
| `surface` | `#16161f` | Tarjetas, modals, foros |
| `muted` | `rgba(255,255,255,0.45)` | Texto secundario |
| `gold` | `#C9A961` | Tier LEGENDARY · acentos premium |
| `violet` | `#A78BFA` | Tier RARE |
| `red` | `#FF6B6B` | Tier UNIQUE / errores / borrar |
| `grey` | `#3a3a4a` | Tier COMMON |

**Reglas tier por rareza:**
- `>10%` → COMÚN, borde `bg-grey`
- `1-10%` → RARO, borde `bg-violet`
- `<1%` → LEGENDARY, borde foil tricolor (red→gold→violet)
- 100% (1 user / 1 unlock) → ÚNICO, borde dorado

Lógica en `src/lib/rarity.ts` con tests Vitest.

**No usar colores hardcodeados.** Si necesitas un color que no está en la paleta, añádelo al `@theme` antes de usarlo.

## Tipografía

- **Display / títulos**: Inter Black (900), tracking apretado (`tracking-tightest = -1px`)
- **Body**: Inter Regular/Medium
- **Datos numéricos** (% rareza, contadores): JetBrains Mono — `font-mono`
- **Etiquetas** (tier, categorías): `tracking-[2.5px] uppercase` con tamaño pequeño (`text-[9px]` o `text-xs`)

## Sistema de diseño (componentes UI primitivos)

En `src/components/ui/`:

- `Button.tsx` — variantes: `primary` (blanco sobre bg), `ghost` (border), `danger` (red), `gold` (gold/20). Tamaños: `sm`, `md`, `lg`. Siempre `rounded-full`, `uppercase tracking-widest`.
- `Input.tsx`, `Textarea.tsx` — con `maxLength` requerido, char counter opcional, error inline
- `Modal.tsx` — backdrop oscuro + content centrado, cierra con backdrop click, ESC key
- `Card.tsx` — `bg-surface rounded-2xl p-N`
- `Tabs.tsx` — uppercase tracking-widest pills
- `Avatar.tsx` — round, fallback con iniciales
- `Skeleton.tsx` — animate-pulse para loading states

**Regla:** cada feature component (AchievementCard, AdjudicateModal, etc.) se compone de primitivos. **No replicar estilos** entre componentes.

## Convenciones de código

- **Idioma UI**: TODO texto visible en español (España, no LATAM)
- **Toasts**: `sonner` (`import { toast } from 'sonner'`), nunca alert nativo
- **Logging**: `logger.error()` de `@/lib/logger`, NUNCA `console.error` en código de páginas/componentes (solo en api/ está OK)
- **Tipos**: TypeScript strict, NO `as any`. Tipos de BD desde `@/types/database`
- **Navegación**: `<Link to>` de React Router, NUNCA `<a href>` excepto enlaces externos
- **Auth**: SIEMPRE leer del `AuthContext` (`useAuth()`), no llamar a `supabase.auth.getUser()` directamente desde componentes
- **Estado de carga**: usar `<Skeleton />` o spinner consistente; jamás pantalla en blanco

## Reglas de datos (TanStack Query + Supabase)

- **`staleTime: Infinity`** por defecto (datos NO refetchean automáticamente; navegación instantánea)
- **No N+1**: `.in('id', ids)` o joins, jamás query por item
- **Mutations + invalidación selectiva**: tras un POST exitoso, `queryClient.invalidateQueries({ queryKey: [...] })` con la key específica
- **Optimistic updates** en reacciones (likes/dislikes), unlocks, top5 reorder
- **`enabled` guard** cuando un hook depende de un parámetro que puede ser null
- **Reacciones**: optimistas en cliente, debounce de 1s antes de tocar BD

Patrón:

```ts
export function useAchievement(slug: string | undefined) {
  return useQuery({
    queryKey: ['achievement', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('achievements')
        .select('id, slug, title, emoji, description, category, unlock_count')
        .eq('slug', slug!)
        .eq('status', 'approved')
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });
}
```

---

## Mobile viewport / BottomNav — innegociable

> El BottomNav es el ancla de navegación primaria en mobile. Que esté siempre pegado al fondo, sin gaps al scrollear, es crítico para la sensación de app nativa.

### Reglas obligatorias

1. **Siempre `min-h-screen min-h-[100dvh]`** en los contenedores principales del Layout. `100vh` no se ajusta cuando Safari iOS oculta la URL bar → genera gap. `100dvh` sí. Ambas como fallback.

2. **El `<main>` en mobile siempre con padding-bottom calculado:**
   ```tsx
   <main className="flex-1 pb-[calc(3.5rem+env(safe-area-inset-bottom)+0.5rem)] md:pb-0">
   ```
   - `3.5rem` = altura del BottomNav (`h-14`)
   - `env(safe-area-inset-bottom)` = home indicator iPhone
   - `0.5rem` = respiro extra

3. **`<BottomNav>` debe tener `fixed bottom-0` + safe-area padding interno:**
   ```tsx
   <nav
     className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-bg/95 backdrop-blur-md border-t border-white/10"
     style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
   >
   ```

4. **NUNCA poner `transform`, `filter`, `perspective`, ni `will-change: transform` en ningún ancestor del `<BottomNav>`.** Esas propiedades convierten al ancestor en "containing block" del `position: fixed` y rompen el sticky-bottom.

5. **NUNCA convertir el `<BottomNav>` en `position: sticky`** dentro de un contenedor con scroll. `fixed bottom-0` es la única posición correcta.

### Validar siempre que cambies mobile:

1. Scroll al final del feed → última card no tapada por BottomNav
2. Hacer scroll para que Safari iOS oculte URL bar → no aparece gap
3. iPhone con notch → home indicator respetado

---

## Crawler HTML para share previews

> Una SPA renderiza HTML vacío + JS. Los crawlers de WhatsApp, Twitter, Discord, Instagram NO ejecutan JS. Sin server-rendered HTML, los share-cards no aparecen.

### Solución: `api/page.js` reescribe con OG metadata

`vercel.json` redirige user-agents de bots conocidos (`facebookexternalhit`, `Twitterbot`, `WhatsApp`, `Discordbot`, `LinkedInBot`, `Slackbot`) a `api/page.js?path=<original-path>`.

`api/page.js`:
1. Lee `path` del query string
2. Para `/l/<slug>`: fetch al achievement, devuelve HTML con `<meta og:image>` apuntando a `/api/og-achievement?slug=<slug>` y `<title>` rich
3. Para `/u/<username>`: ídem con perfil → `/api/og-profile?username=<username>`
4. Para `/u/<username>/<slug>`: fetch unlock + profile + achievement, devuelve HTML con `<meta og:image>` apuntando a `/api/og-unlock?username=<username>&slug=<slug>` (la card personal con la historia)
5. Otros paths: devuelve `index.html` de Vite

**SIEMPRE** sanitizar el HTML output con función `e()` para escapar entidades. **SIEMPRE** validar `slug`/`username` con regex antes de hacer la query.

---

## Seguridad — Reglas innegociables

### Inputs de usuario (forms)

- **NUNCA** aceptar URLs en campos de texto que no son explícitamente URL fields. Validador `containsUrl(text)` en `src/lib/validators.ts` rechaza `http://`, `https://`, `www.`, dominios `.com/.es/.net/.org`, `t.me/`, etc.
- **SIEMPRE** `maxLength` en `<Input>` y `<Textarea>`: title 80, description 200, story 1000, reply 500, bio 140, notes report 500
- **SIEMPRE** validar `proposeAchievementSchema`/`adjudicateSchema`/`replySchema` con Zod en cliente Y en serverless function
- **SIEMPRE** normalizar a lowercase el `username` antes de enviar a BD
- **NUNCA** renderizar un `href` de BD sin sanitizar protocolo via `safeHref()` de `src/lib/safeUrl.ts`

### Serverless functions (`api/`)

- **SIEMPRE** verificar JWT de Supabase antes de mutar datos:
  ```js
  const { data: { user } } = await supabase.auth.getUser(token);
  if (!user) return res.status(401).json({ error: 'unauthorized' });
  ```
- **SIEMPRE** validar inputs con Zod antes de tocar BD
- **NUNCA** `Access-Control-Allow-Origin: *` — usar el dominio definitivo (`https://unlocked-rgcv.vercel.app` o el custom)
- **NUNCA** exponer `SUPABASE_SERVICE_ROLE_KEY` al cliente
- **SIEMPRE** rate limiting en endpoints expuestos (propose 3/día, react 60/min)

### SQL Injection

- **No hay riesgo de SQL injection** mediante el SDK de Supabase/PostgREST — usa prepared statements internamente
- En serverless functions que construyen URLs PostgREST manualmente: SIEMPRE `encodeURIComponent()` los parámetros
- Funciones RPC PostgreSQL `SECURITY DEFINER` deben validar tipos con `IF ... THEN RAISE EXCEPTION`

### RLS

- Las RLS policies actuales (M1) cubren el modelo correctamente
- **NUNCA** `WITH CHECK (true)` en tablas de mutación crítica sin verificar `auth.uid()`
- Triggers `BEFORE INSERT` para limites por user (max 3 propuestas pendientes/día ya implementado)

### Auth

- **Activar hCaptcha / Cloudflare Turnstile** en Supabase Dashboard > Auth > Bot Protection cuando haya tracción
- Los mensajes de error de login no diferencian entre "email no existe" y "contraseña incorrecta"

---

## Reglas de escalabilidad SQL — innegociables

> Antes de añadir un trigger, función o policy RLS que toque el camino caliente (unlocks, reactions, replies, propose, etc.) hay que pasar este checklist.

1. **Toda función que toque el camino caliente debe estar acotada a O(log N) o mejor.** Verificar con `EXPLAIN ANALYZE`.
2. **Cada predicado de WHERE en la función debe tener índice.**
3. **Si la función hace `COUNT(*) <= N` para validar límite, reescribir como `SELECT 1 ... LIMIT N+1`** (early termination).
4. **Triggers `BEFORE INSERT/UPDATE` no deben superar 5ms** en data realista.
5. **Para policies RLS con subquery: añadir índice sobre la columna join.**
6. **`SECURITY DEFINER` con `SET search_path = public`** (riesgo de hijack del search_path).
7. **Sentinel errors con `RAISE EXCEPTION ... USING ERRCODE`** + nombres secos como `RESERVE_LIMIT_EXCEEDED`, traducidos en cliente.

---

## Métricas de éxito (criterios de "did it pop")

- **Día 7**: ≥1.000 users con ≥1 unlock
- **Día 14**: ≥30% retención D7
- **Día 30**: ≥100 logros propuestos por la comunidad

Si día 30 ninguno se cumple → cierre o pivote. Decisión binaria.

Tracking:
- Plausible para page views (sin cookies, RGPD-friendly)
- Tabla `events` en Supabase para eventos custom (`achievement_unlocked`, `achievement_proposed`, `share_card_clicked`, `share_card_downloaded`)

---

## Diseño viral — el motor del producto

### Share-cards (la pieza más importante)

1. **Card individual de logro** (1080×1920) → al adjudicar. URL: `/api/og-unlock?id=<unlock_id>`
2. **Card Top-5 / pasaporte** (1080×1920) → al pulsar "Compartir mi colección". URL: `/api/og-profile?username=<username>`
3. **Card genérica de logro** (1080×1920) → preview de URL `/l/<slug>` no desbloqueado. URL: `/api/og-achievement?slug=<slug>`

### Mecanismos de viralidad

- **% rareza visible** (PlayStation/Steam style) — "Solo el 0.04% lo tiene"
- **Tier por rareza** (foil tricolor para legendary) — coleccionable
- **Pre-written caption** copia al clipboard al compartir
- **Universal rich preview** — cualquier link pegado en WA/Twitter/Discord muestra la card

---

## Decisiones del producto (locked-in)

| # | Decisión |
|---|---|
| 1 | MVP con foros incluidos desde día 1 |
| 2 | Foros asíncronos tipo Reddit (NO chat tiempo real) |
| 3 | Login Google + nombre real + foto |
| 4 | Crear logros con cola de moderación desde día 1 |
| 5 | Share-cards: individual + Top-5 |
| 6 | Home = Grid Pinterest · Descubrir = Tinder swipe |
| 7 | Adjudicar con click, historia opcional |
| 8 | Rareza = % real visible + tier visual |
| 9 | Solo español, foco España |
| 10 | Stack: Vite + TanStack Query + Supabase + Vercel |
| 11 | Diseño visual: trading card holo limpio (B3) — tier por rareza |

Spec completa: `docs/superpowers/specs/2026-05-04-unlocked-design.md`
