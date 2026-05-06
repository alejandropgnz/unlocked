# Unlocked

Web viral de logros absurdos de la vida. Los users desbloquean logros ("mi padre se fue a por tabaco y no volvió", "1 finde sin dormir"), cuentan su historia, comentan en foros y comparten share-cards con tier por rareza real.

## Stack

- **Frontend**: React 18 + TypeScript + Vite (port 5173)
- **UI**: Tailwind CSS v4 + componentes propios (sistema de diseño en `src/components/ui/`)
- **Backend/DB**: Supabase (Postgres + Auth con Google OAuth) — mutaciones desde el cliente vía `supabase-js`, autorización por RLS
- **Estado**: TanStack Query + Context API (AuthContext)
- **Deploy**: Vercel (Edge Functions en `api/` SOLO para OG image generation y crawler HTML)
- **Animación**: framer-motion (swipe deck), canvas-confetti (desbloquear)
- **Drag & drop**: @dnd-kit (Top-5 reorder)
- **Forms**: react-hook-form + Zod
- **Toasts**: sonner
- **Avatars**: react-easy-crop (cropping antes de upload)
- **Emojis**: emoji-picker-react (lazy-loaded en `/crear`)
- **Iconos**: lucide-react (consistencia entre Sidebar y BottomNav)

## Comandos

- `npm run dev` — Vite dev server
- `npm run build` — Build de producción (Vite)
- `npm test` — Vitest (unit)
- `npx tsc --noEmit` — Verificar tipos (strict mode)
- `npm run lint` — ESLint flat config

## Estructura

```
src/
  pages/           → Páginas (Home, AchievementDetail, Profile, UserUnlock, Crear, Admin, Descubrir, StoryThread, Legal, Login)
  components/      → Componentes de feature (AchievementCard, OwnedAchievementCard, SwipeDeck, ShareCardModal, EmojiPickerInput, MobileTopBar, …)
  components/ui/   → Sistema de diseño primitivos (Button, Input, Textarea, Modal, Card, Tabs, Avatar, Skeleton)
  hooks/           → Hooks de datos por dominio (useAchievement, useInfiniteAchievements, useUserUnlocks, useUserPasses, usePass, useDeleteUnlock, useStories, useReplies, useReact, useAdjudicate, usePropose, useAdmin…)
  contexts/        → AuthContext (sesión + perfil + OAuth con loading desacoplado de profileLoading)
  lib/             → cn, logger, moderation, rarity, safeUrl, share, slug, supabase, track, validators
  types/           → database.ts — tipos hand-written del schema Supabase (NO auto-generados)
api/               → Edge Functions Vercel (4 endpoints, ninguno hace mutaciones — eso va por supabase-js + RLS)
  og-achievement.js   → PNG genérico de logro 1080×1920 (param: slug)
  og-profile.js       → PNG Top-5 + stats de un perfil (param: username)
  og-unlock.js        → PNG personal de unlock concreto (params: username + slug)
  page.js             → HTML server-rendered para crawlers (rich preview en WhatsApp/Twitter/Discord)
  _lib/               → og-helpers.js (TIER_COLORS + getInterFont), supabase-fetch.js
supabase/
  migrations/      → SQL aplicado en producción (histórico, forward-only)
  seed/            → 1875 logros curados (achievements-v2-part-{1..4}.sql + achievements-v3-{viajes,trabajo,amigos,relaciones}.sql)
scripts/           → Helpers Node ESM para post-process de seed (fix length, normalize slugs, regenerate, strip column)
```

### Mutaciones — modelo

Casi todas las mutaciones (insert unlock, propose, react, reply, save bio/top5, delete account, etc.) van **directas desde el cliente** vía `supabase-js`. La seguridad la pone RLS + triggers + Zod (cliente). No hay endpoints serverless de mutación que verifiquen JWT manualmente — porque el JWT ya viaja en cada request del cliente y RLS hace cumplir `auth.uid() = user_id`.

Las únicas Edge Functions son las 4 anteriores (3 OG + crawler HTML), todas read-only.

## Paleta de colores

Tokens en `src/index.css` (Tailwind v4 `@theme inline`):

| Token Tailwind | HEX | Uso |
|---|---|---|
| `bg` | `#0e0e14` | Fondo de página |
| `surface` | `#16161f` | Tarjetas, modals, foros |
| `muted` | `rgba(255,255,255,0.45)` | Texto secundario, indicadores neutros |
| `gold` | `#C9A961` | Tier LEGENDARY · acentos premium · check de "ya lo tienes" |
| `violet` | `#A78BFA` | Tier RARE |
| `red` | `#FF6B6B` | Tier UNIQUE / errores / borrar / "Pasar" en swipe |
| `grey` | `#3a3a4a` | Tier COMMON |

**Reglas tier por rareza:**
- `>10%` → COMÚN, borde `bg-grey`
- `1-10%` → RARO, borde `bg-violet`
- `<1%` → LEGENDARY, borde foil tricolor (red→gold→violet)
- 100% (1 user / 1 unlock) → ÚNICO, borde dorado

Lógica en `src/lib/rarity.ts` con tests Vitest.

**No usar colores hardcodeados.** Si necesitas un color que no está en la paleta, añádelo al `@theme` antes de usarlo. Excepciones permitidas: `bg-[#25D366]` (WhatsApp brand) y `bg-[#1DA1F2]` (Twitter brand) en botones de share — son colores de marca de terceros.

## Tipografía

- **Display / títulos**: Inter Black (900), tracking apretado (`tracking-tightest = -1px`)
- **Body**: Inter Regular/Medium
- **Datos numéricos** (% rareza, contadores): JetBrains Mono — `font-mono`
- **Etiquetas** (tier, categorías): `tracking-[2.5px] uppercase` con tamaño pequeño (`text-[9px]` o `text-xs`)

Las fuentes se cargan vía Google Fonts CSS API (no URLs versionadas hardcodeadas — Google rota los hashes).

## Sistema de diseño (componentes UI primitivos)

En `src/components/ui/`:

- `Button.tsx` — variantes: `primary` (blanco sobre bg), `ghost` (border), `danger` (red), `dangerSoft` (red/20), `gold` (gold/20). Tamaños: `sm`, `md`, `lg`, `block`. Siempre `rounded-full`, `uppercase tracking-widest`.
- `Input.tsx`, `Textarea.tsx` — con `maxLength` requerido, char counter opcional, error inline
- `Modal.tsx` — backdrop oscuro + content centrado, cierra con backdrop click + ESC, `max-h-[90vh] overflow-y-auto`
- `Card.tsx` — `bg-surface rounded-2xl p-N`
- `Tabs.tsx` — uppercase tracking-widest pills
- `Avatar.tsx` — round, fallback con iniciales
- `Skeleton.tsx` — animate-pulse para loading states

**Regla:** cada feature component (AchievementCard, SwipeDeck, etc.) se compone de primitivos. **No replicar estilos** entre componentes.

### AchievementCard — patrón de cards reutilizable

- Sizes: `sm`, `md`, `lg`. Cada size define `card`, `title`, `padding` y `emojiBox`.
- **`w-full max-w-[Npx]`** (no `w-[Npx]` fijo) — así las cards llenan la celda del grid en mobile sin desbordar y se capean en desktop.
- **`h-full` en el `<Link>` exterior** — en grid con `align-items: stretch` (default), todas las cards de una row tienen el mismo alto aunque los títulos varíen en líneas.
- **`emojiBox` con altura fija por tamaño** — el slot del emoji NO depende del número de emojis (1, 2 o 3) → títulos alineados horizontalmente entre cards del mismo row.
- **Memoizada con `React.memo`** — el grid de Logros con 200+ cards mounted no debe re-renderear todas cuando llega una página nueva.
- **Indicadores de interacción** (top-left, mismo padding que % top-right):
  - `isUnlocked` → `Check` gold/70 + dark overlay 45%
  - `isPassed` → `Minus` muted + dark overlay 30% (más sutil — "ya lo viste, no rejection")
  - Si ambos true → gana unlocked

### OwnedAchievementCard — wrapper para perfil propio

- Hover: dim overlay + pill "Ver" centrado + botón rojo X `top-right` (delete)
- El X es **sibling del Link** (no hijo) → `e.preventDefault()` + `e.stopPropagation()` evitan navegar al hacer click
- `useDeleteUnlock` borra de `unlocks` Y inserta en `passes` (no vuelve en /descubrir)
- Confirm modal antes de borrar (acción destructiva)
- Tamaño del wrapper DEBE coincidir con el `max-w` del inner card o el overlay/X queda descolocado

## Convenciones de código

- **Idioma UI**: TODO texto visible en español (España, no LATAM). Acentos respetados (á é í ó ú ñ ¿ ¡).
- **Toasts**: `sonner` (`import { toast } from 'sonner'`), nunca alert nativo
- **Logging**: `logger.error()` de `@/lib/logger`, NUNCA `console.error` en código de páginas/componentes (solo en `api/` está OK por contexto Edge)
- **Tipos**: TypeScript strict, NO `as any`. Tipos de BD desde `@/types/database` — **hand-written, hay que sincronizar manualmente** cuando cambias schema (nueva tabla, columna, enum value, RPC). El build falla si no.
- **Navegación**: `<Link to>` de React Router, NUNCA `<a href>` excepto enlaces externos
- **Auth**: SIEMPRE leer del `AuthContext` (`useAuth()`), no llamar a `supabase.auth.getUser()` directamente desde componentes
- **Estado de carga**: usar `<Skeleton />` o spinner consistente; jamás pantalla en blanco
- **Filtros / búsqueda en URL**: usar `useSearchParams` de React Router para `?q=`, `?cat=`, etc. — survive a reload, comparable, integrable con MobileTopBar

## Reglas de datos (TanStack Query + Supabase)

- **`staleTime: Infinity`** por defecto (datos NO refetchean automáticamente; navegación instantánea). Excepciones puntuales (totalUsers count: 60s, similar-achievement RPC: por request).
- **Eliminar N+1**: `.in('id', ids)` o joins, jamás query por item. Y cuando un valor se puede derivar de otra cuenta cacheada, computar client-side antes que hacer query de detalle (ej: `rarityPercent = unlock_count / totalUsers * 100` — `totalUsers` está cacheado, no hace falta tocar `achievement_rarity` en cada page fetch).
- **Mutations + invalidación selectiva**: tras un POST exitoso, `queryClient.invalidateQueries({ queryKey: [...] })` con la key específica. Si la query está inactiva (página no montada) y tiene `refetchOnMount: false`, usar `refetchType: "all"` o no se actualizará al volver.
- **Optimistic updates** en reacciones (likes/dislikes), unlocks, top5 reorder
- **`enabled` guard** cuando un hook depende de un parámetro que puede ser null
- **Reacciones**: optimistas en cliente, debounce de 1s antes de tocar BD
- **Infinite scroll**: el `queryKey` debe incluir TODOS los filtros (`{ q, cat }`) — al cambiar un filtro, la lista reinicia limpiamente desde page 0.
- **Memoizar items del grid** con `React.memo` cuando el grid puede llegar a cientos. Sin memo, cada nueva página re-renderiza todas las cards anteriores.
- **IntersectionObserver para infinite scroll**: callback en `useRef` actualizado cada render → el observer ve siempre el closure más reciente sin recrear el observer (que perdería intersecciones). `rootMargin: 1200px` para pre-fetch antes del fondo.

Patrón:

```ts
export function useAchievement(slug: string | undefined) {
  return useQuery({
    queryKey: ['achievement', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('achievements')
        .select('id, slug, title, emoji, category, unlock_count')
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

1. **`min-h-screen min-h-[100dvh]` en layouts SCROLLABLES, `h-screen` + `style={{ height: "100svh" }}` en layouts FIXED (1-screen)**. La unidad correcta depende de cómo se comporta la página:

   - **Scrollable (Home, Profile, Descubrir feed, etc.)**: `min-h-screen min-h-[100dvh]`. El contenedor crece con el contenido y mínimo cubre el viewport. `100dvh` (NO `100vh`) porque cuando Safari iOS oculta la URL bar al scrollear, `100vh` deja un gap; `100dvh` se ajusta dinámicamente y no.
   - **Fixed single-screen (landing `/proximamente`, modals fullscreen, splash screens)**: `h-screen` como fallback Tailwind + `style={{ height: "100svh" }}` inline. **NUNCA `100dvh` aquí.** iOS Safari 15-17 tiene un bug documentado: durante el primer paint, `100dvh` reporta el LARGE viewport (chrome oculto) en vez del visible actual → el contenedor sale más alto que el área visible cuando la URL bar y la toolbar inferior están mostradas → con `overflow-hidden` el contenido (típicamente footer) queda recortado detrás de la toolbar inferior de Safari. Solo se reproduce en iOS real, NO en el emulador mobile de Chrome DevTools (que no tiene chrome dinámico). `100svh` = small viewport height = el peor caso del chrome → garantiza que el layout cabe siempre. Trade-off: cuando la URL bar se minimiza al scrollear queda un sliver del color de fondo abajo, imperceptible en una landing single-screen.

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

6. **Iconos consistentes mobile/desktop**: BottomNav y Sidebar usan los MISMOS iconos `lucide-react` (Trophy, Flame, Sparkles, User). Nada de emojis en una y SVG en otra.

### MobileTopBar pattern

- Wordmark a la izquierda + (opcional) título de página centrado en absoluto + (opcional) acción a la derecha
- En `/` muestra icono lupa que expande a buscador full-width inline (X o ESC para cerrar)
- En `/descubrir` muestra "Descubrir" centrado en lugar de duplicar el título de la página
- Map de rutas → título via `PAGE_TITLES` array dentro del componente

### Validar siempre que cambies mobile:

1. Scroll al final del feed → última card no tapada por BottomNav
2. Hacer scroll para que Safari iOS oculte URL bar → no aparece gap
3. iPhone con notch → home indicator respetado
4. **Sin scroll horizontal** — cards en grid 2-col deben tener `w-full max-w-[Npx]`, NUNCA `w-[Npx]` fijo, o desbordan en viewports estrechos (375px típico iPhone)
5. **Probar SIEMPRE en iOS Safari real, no solo en Chrome DevTools mobile mode.** El emulador de Chrome no tiene chrome dinámico (URL bar / toolbar inferior) y oculta bugs de `100dvh`, safe-area-insets y `overflow-hidden` clipping. Si solo validas en el emulador, vas a deployar layouts rotos al teléfono real. Para forzar refresh tras un cambio, usar query param `?v=N` ya que iOS Safari cachea index.html agresivamente.

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

**SIEMPRE** sanitizar el HTML output con función `escapeHtml()` para escapar entidades. **SIEMPRE** validar `slug`/`username` con regex antes de hacer la query.

---

## OG / share-cards — Satori (innegociable)

> `@vercel/og` usa Satori bajo el capó para renderizar JSX → SVG → PNG. Satori es estricto.

1. **Satori NO soporta WOFF2.** Solo TTF, OTF y WOFF. Si le pasas un buffer WOFF2 produce un PNG de **0 bytes silenciosamente** (sin error, content-type `image/png`, body vacío). El navegador entonces dispara `onError`.
   - `getInterFont()` en `api/_lib/og-helpers.js` debe usar URLs que sirvan WOFF/TTF/OTF (actualmente jsdelivr `@fontsource/inter` con unpkg como fallback).
2. **Layouts solo con flexbox.** Satori NO soporta CSS Grid. Construir todo con flex-direction, flex-wrap, gap.
3. **JSX se construye con `React.createElement` (`h()`)** — no JSX literal en `.js` Edge functions.
4. **Tamaños fijos en px** dentro del layout. PNG sale 1080×1920.
5. **Cache-Control largo** en `vercel.json` para los `/api/og-*` (`max-age=300, s-maxage=600, stale-while-revalidate=86400`).

### Cliente: ShareCardModal

- Preview con **width-cap** (`max-w-[220px]`) + `aspect-[9/16]` → la imagen 1080×1920 se queda ~390px de alto, los botones quedan visibles sin scroll
- Estados: `loading` (Skeleton) → `ready` o `error` (mensaje + icono). El botón Descargar PNG se deshabilita hasta `ready`.

---

## Slug + duplicate detection

### Pattern: `slugify(title)`

`src/lib/slug.ts` — Unicode-correct slugify mirroring Wisheem:

```ts
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80)
    .replace(/^-|-$/g, "");
}
```

- **Para user proposals (`/crear`)**: `usePropose` hace `slug = slugify(title)`, intenta INSERT → si Postgres devuelve `23505` (unique violation) avisa al user para que reformule
- **Para seed**: scripts en `scripts/` regeneran slugs offline y auto-sufijan (`-2`, `-3`) si chocan, ya que el admin no tiene quien le pregunte
- **NO usar prefijos de categoría** en slugs (era un error temporal en v3 que se corrigió). Slug = derivado del título.

### Duplicate detection: pg_trgm

Migración `_013_pg_trgm.sql` activa la extensión + GIN index sobre `achievements.title` + RPC `find_similar_achievement(query_title, min_similarity)`.

`usePropose` antes de insertar:
```ts
const { data: similar } = await supabase.rpc("find_similar_achievement", {
  query_title: parsed.data.title,
  min_similarity: 0.65,
});
if (similar?.length > 0) throw new Error(`Ya existe uno muy parecido: "${similar[0].title}"`);
```

Threshold 0.65 (escala 0-1 trigram, más estricto que Levenshtein 0.85).

---

## Pass tracking — `passes` table

Tabla en migración `_011`. Composite PK `(user_id, achievement_id)`, RLS own-only.

- Swipe izquierda en `/descubrir` → `usePass` inserta en `passes` (23505 silencioso si ya estaba)
- `/descubrir` filtra el deck excluyendo `unlocks ∪ passes` (vía `useUserUnlocks` + `useUserPasses`)
- Borrar un unlock desde el perfil propio (`useDeleteUnlock`) también inserta en `passes` para que no resurja en el deck
- Errores de `usePass` SE TOAS-TEAN (silent failure escondió bugs antes — si la migración no se aplica, el toast lo señala inmediatamente)

---

## Categorías de achievements

Enum `achievement_category` (10 valores actuales):

| Valor enum | Label UI | Notas |
|---|---|---|
| `familia` | Familia | |
| `amigos` | Amigos | Añadido migración `_012` |
| `amor` | Amor | Heartbreak / romance profundo |
| `relaciones` | Relaciones | Añadido `_012`. Layer comportamental (dating apps, ghosting, ex stalking…) |
| `trabajo` | Trabajo | |
| `viajes` | Viajes | |
| `verguenza` | Vergüenza | |
| `resaca` | Resaca | |
| `salud` | Salud | |
| `random` | Random | Catch-all |

**Cuando añadas una categoría nueva, hay que tocar TRES sitios o se rompen cosas:**
1. Migración SQL: `ALTER TYPE achievement_category ADD VALUE IF NOT EXISTS 'X'`
2. `src/types/database.ts`: añadir `'X'` al union de `Enums.achievement_category`
3. `src/lib/validators.ts`: añadir `'X'` al `z.enum([...])` de `proposeAchievementSchema`
4. `src/components/CategoryPicker.tsx` y `src/pages/Home.tsx` (chips): añadir entrada con label español y emoji

---

## Seguridad — Reglas innegociables

### Inputs de usuario (forms)

- **NUNCA** aceptar URLs en campos de texto que no son explícitamente URL fields. Validador `containsUrl(text)` en `src/lib/validators.ts` rechaza `http://`, `https://`, `www.`, dominios `.com/.es/.net/.org`, `t.me/`, etc.
- **SIEMPRE** `maxLength` en `<Input>` y `<Textarea>`: title 80, story 1000, reply 500, bio 140, notes report 500
- **SIEMPRE** validar `proposeAchievementSchema` / `adjudicateSchema` / `replySchema` con Zod en cliente
- **SIEMPRE** normalizar a lowercase el `username` antes de enviar a BD
- **NUNCA** renderizar un `href` de BD sin sanitizar protocolo via `safeHref()` de `src/lib/safeUrl.ts`
- **Emoji-only fields**: usar `EmojiPickerInput` (controlled) o validar con `isEmojiOnly(text)` + `emojiCount(text)` (graphemes via `Intl.Segmenter`, no length)

### Mutaciones cliente (supabase-js + RLS)

Como las mutaciones son client-side, la seguridad reside en RLS:
- **NUNCA** `WITH CHECK (true)` en tablas de mutación crítica sin verificar `auth.uid()`
- Triggers `BEFORE INSERT` para limites por user (max 3 propuestas pendientes/día — migración `_007`)
- Tablas con datos sensibles tienen RLS restrictivo (passes: own SELECT/INSERT/DELETE only; unlocks: public SELECT, own INSERT/DELETE)

### Edge Functions (`api/`)

Las únicas Edge Functions son las 4 de OG/crawler. Son **read-only** y públicas (no requieren auth). Pero:
- **SIEMPRE** validar slug/username con regex (`SLUG_RE`, `USERNAME_RE`) antes de query
- **SIEMPRE** `encodeURIComponent()` en parámetros que van a URLs PostgREST
- **NUNCA** exponer `SUPABASE_SERVICE_ROLE_KEY` — usar el anon key (`SUPABASE_ANON_KEY`)
- Cache largo (`s-maxage=600, stale-while-revalidate=86400`) en `vercel.json`

### SQL Injection

- **No hay riesgo** mediante el SDK de Supabase/PostgREST — usa prepared statements internamente
- En Edge Functions que construyen URLs PostgREST manualmente: SIEMPRE `encodeURIComponent()` los parámetros
- Funciones RPC PostgreSQL `SECURITY DEFINER` deben validar tipos con `IF ... THEN RAISE EXCEPTION` y siempre `SET search_path = public` (anti search_path hijack)

### Auth

- **Activar hCaptcha / Cloudflare Turnstile** en Supabase Dashboard > Auth > Bot Protection cuando haya tracción
- Los mensajes de error de login no diferencian entre "email no existe" y "contraseña incorrecta"

---

## Schema management — innegociable

### Migrations son forward-only

`supabase/migrations/` es histórico. Una vez aplicada en producción, NO se modifica una migración existente — se crea una nueva. Las migraciones son idempotentes (`CREATE ... IF NOT EXISTS`, `INSERT ... ON CONFLICT DO NOTHING`, `ALTER TYPE ... ADD VALUE IF NOT EXISTS`) para que se puedan re-aplicar sin romper.

### `src/types/database.ts` se mantiene a mano

NO se auto-genera. Cuando cambias schema, hay que actualizar este archivo o el build TS falla. Lista de cambios que requieren update:
- Nueva tabla → añadir entrada en `Tables`
- Nueva columna → añadir en `Row`/`Insert`/`Update`
- Drop column → quitar de las 3
- Nuevo enum value → añadir al union
- Nuevo enum entero → añadir en `Enums`
- Nueva función RPC → añadir en `Functions` con args + Returns

Si te olvidas, error TS clásico: "Argument of type 'X' is not assignable to parameter of type ...".

### unlock_count denormalizado

`achievements.unlock_count` lo mantiene el trigger `bump_unlock_count` (migración `_003`) que se dispara en INSERT/DELETE de `unlocks`. Si por cualquier razón el contador queda desincronizado (ej: migración _009 zeroizó counts después de unlocks existentes), aplicar el resync de migración `_015`:

```sql
update achievements a
set unlock_count = (select count(*) from unlocks u where u.achievement_id = a.id);
```

Idempotente. Re-correr es seguro.

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

## SwipeDeck (Descubrir) — UX rules

- **Drag horizontal con framer-motion** + threshold de 100px de desplazamiento O 600px/s de velocidad (flick rápido) — Tinder/Hinge feel
- **Fly-off animation antes de remover**: state `exiting` se setea cuando el swipe se commitea → la card vuela ±1200px lateral con rotación ±25° y fade a 0 (320ms ease-out) → `onSwipe` se llama en `onAnimationComplete` (no antes) → la siguiente card aparece sin "pop"
- **Click en "Pasar" / "Desbloquear" texts** dispara la misma animación. Drag sigue funcionando para los que prefieran el gesto.
- **Stack visual**: 3 cards detrás del top card con `PEEK_PRESETS` (rotación + offset X/Y por profundidad). Estable, no random por render — para que las cards no se tambaleen al re-renderizar por otra cosa.
- **Centrado del cluster emoji+título**: posicionado `absolute inset-0 flex items-center justify-center` sobre la card entera (no entre la fila top y bottom), porque la fila top (rarity) es más alta que bottom (Pasar/Desbloquear) y el `flex-1` quedaba off-center. Cluster con `pointer-events-none` para no romper el drag.

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

1. **Card individual de logro** (1080×1920) → al desbloquear. URL: `/api/og-unlock?username=<u>&slug=<s>`
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
| 6 | Logros = Grid Pinterest · Descubrir = Tinder swipe |
| 7 | Desbloquear con click o swipe, historia opcional adjuntada al unlock |
| 8 | Rareza = % real visible + tier visual |
| 9 | Solo español, foco España |
| 10 | Stack: Vite + TanStack Query + Supabase + Vercel |
| 11 | Diseño visual: trading card holo limpio (B3) — tier por rareza |
| 12 | Verbo nativo del producto: **DESBLOQUEAR**. NO "adjudicar" (deprecated, eliminado de copy en _UI_). El código interno conserva `useAdjudicate` / `AdjudicateModal` por hist órico — refactor pendiente. |
| 13 | Pass tracking: swipe izquierda en /descubrir se persiste; cards pasadas no resurgen |
| 14 | Sin campo `description` en achievements — el título solo es la unidad. Las stories viven en `unlocks`. |
| 15 | Slugs derivados de títulos via `slugify()`. NO category prefix. Auto-suffix para seed, throw + ask-rephrase para user proposals. |
