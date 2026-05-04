# Unlocked — Design Spec

**Date:** 2026-05-04
**Owner:** Alejandro
**Status:** Approved (brainstorming complete, ready for implementation plan)

---

## 1. Product summary

Unlocked is a viral web app where people collect absurd life "achievements" (e.g. "Mi padre se fue a por tabaco y no volvió", "Me caí y rompí la cabeza", "1 finde sin dormir"). Users adjudicate achievements to themselves with one click, optionally tell their story, and discuss in per-achievement asynchronous forums. Each achievement displays its real rarity (% of users who hold it), and users can share visually striking trading-card-style images to Instagram, TikTok, WhatsApp, and Twitter.

The product's core loop is: **discover absurd achievements → adjudicate → share → friends discover via share → register → adjudicate.**

The viral motor is the share-card. The retention motor is the asynchronous forum and the personal achievement collection (with a top-5 highlighted).

**Language / market:** Spanish only, focus on Spain, at launch.

---

## 2. Goals and non-goals

### Goals (MVP — Phase 1)
- Public catalogue of curated achievements (200 seeded by Alejandro before launch).
- One-click adjudication with optional written "story".
- Per-achievement asynchronous forum (Reddit-style threads + replies, async — not real-time).
- User-proposed achievements with moderation queue.
- Public user profile with Top-5 highlighted achievements + full collection.
- Share-cards: individual achievement card + Top-5 collection card, both shareable as 1080×1920 PNG.
- Real rarity displayed as numeric % (no invented tiers — but visual border tier is computed from %).
- Google OAuth login (no anonymous accounts at launch).

### Non-goals (explicitly out of MVP)
- Real-time chat. Forums are asynchronous.
- Wrapped-style monthly/annual recap (not enough data at launch).
- Animated/video share-cards. Static PNG only.
- Multi-language. Spanish only.
- AR filters / Instagram effects.
- Friend graph / following users (collection-vs-collection comparison post-MVP).
- AI content moderation (manual + word-list at launch).
- Mobile native apps. Web only (PWA-ready).

---

## 3. Architecture

### Stack
- **Frontend:** Next.js 15 (App Router) on Vercel.
- **Styling:** Tailwind CSS + a small set of custom design tokens (see §8).
- **Backend / data:** Supabase (Postgres + Auth + Storage + Edge Functions).
- **Share-card rendering:** Next.js `ImageResponse` (Open Graph dynamic images) — no separate image service.
- **Analytics:** Plausible Analytics + custom `events` table in Supabase for product events.

### Why this stack
- Free tier covers up to ~50k MAU. Estimated cost for first year: 0€.
- Auth, DB, storage, RLS policies, and realtime (optional) all in one provider — eliminates ~3 weeks of backend work.
- Server Components give SEO out of the box; every achievement page has a unique URL with rich preview metadata for social sharing.
- Vercel `ImageResponse` returns a PNG from a JSX function, which is the simplest possible path to dynamic share-cards.

### Routing model
Default to Server Components for SEO and shareability. Use Client Components only for interactive surfaces:
- Swipe deck on `/descubrir`
- Adjudicate modal + story textarea
- Forum reply box
- Share-card preview/download modal
- Drag-and-drop on Top-5 reorder

### Hosting
Push to `main` → Vercel build → production. No staging environment at MVP. Branch deploys (Vercel preview URLs) cover any pre-merge testing needs.

### Cost projection
- 0€ up to ~50k MAU.
- ~25–50€/month at 100–500k MAU (Supabase Pro + Vercel Pro).
- Plausible: ~9€/month from day 1 (RGPD-friendly, no cookies).

---

## 4. Data model

7 Postgres tables, all with Row Level Security. Naming and column lists below are the authoritative shape — implementation can adjust types/indices but not the structure.

### `profiles`
Public profile of a user. One row per `auth.users`.
- `id` (uuid, FK auth.users.id, PK)
- `username` (text, unique, slug-safe, lowercased; 3–20 chars)
- `display_name` (text, from Google identity)
- `avatar_url` (text, from Google identity, can be replaced via Supabase Storage)
- `bio` (text, max 140)
- `top5` (uuid[5], ordered list of `achievements.id`; nullable elements allowed)
- `is_admin` (bool, default false)
- `created_at` (timestamptz)

### `achievements`
The catalogue.
- `id` (uuid, PK)
- `slug` (text, unique, kebab-case, generated from title)
- `title` (text, max 80)
- `emoji` (text, single emoji)
- `description` (text, max 200)
- `category` (enum: `familia`, `verguenza`, `resaca`, `amor`, `trabajo`, `random`, `salud`, `viajes`)
- `created_by` (uuid, FK profiles.id; nullable for seeded achievements)
- `status` (enum: `pending`, `approved`, `rejected`; default `pending`, seed = `approved`)
- `unlock_count` (int, default 0; denormalised, kept in sync by trigger)
- `created_at` (timestamptz)

### `unlocks`
Which user has which achievement. The most-read table.
- `id` (uuid, PK)
- `user_id` (uuid, FK profiles.id)
- `achievement_id` (uuid, FK achievements.id)
- `created_at` (timestamptz)
- UNIQUE(`user_id`, `achievement_id`)
- INDEX on (`achievement_id`) for "who has this" queries
- INDEX on (`user_id`, `created_at` DESC) for profile collection view

### `stories`
Optional written story attached to an unlock.
- `id` (uuid, PK)
- `unlock_id` (uuid, FK unlocks.id, unique — at most one story per unlock)
- `user_id` (uuid, FK profiles.id; denormalised for forum queries)
- `achievement_id` (uuid, FK achievements.id; denormalised for forum queries)
- `body` (text, max 1000)
- `score` (int, default 0; likes − dislikes, kept in sync by trigger on `reactions`)
- `is_hidden` (bool, default false; flipped by moderation)
- `created_at` (timestamptz)
- INDEX on (`achievement_id`, `score` DESC) for top-stories queries

### `replies`
Replies inside a forum thread (one thread per story; the `achievement_id` foro general is just "all stories of this achievement", no separate thread).
- `id` (uuid, PK)
- `story_id` (uuid, FK stories.id)
- `user_id` (uuid, FK profiles.id)
- `body` (text, max 500)
- `score` (int, default 0)
- `is_hidden` (bool, default false)
- `created_at` (timestamptz)
- INDEX on (`story_id`, `created_at` ASC)

### `reactions`
Likes / dislikes on stories and replies.
- `user_id` (uuid, FK profiles.id)
- `target_type` (enum: `story`, `reply`)
- `target_id` (uuid)
- `value` (int, +1 or −1)
- PK (`user_id`, `target_type`, `target_id`)
- Trigger on insert/update/delete: recompute `score` on the target row.

### `reports`
Content reports for moderation.
- `id` (uuid, PK)
- `target_type` (enum: `achievement`, `story`, `reply`, `profile`)
- `target_id` (uuid)
- `reporter_id` (uuid, FK profiles.id)
- `reason` (enum: `spam`, `ofensivo`, `datos_personales`, `otro`)
- `notes` (text, max 500, optional)
- `status` (enum: `open`, `resolved`, `dismissed`; default `open`)
- `created_at` (timestamptz)
- INDEX on (`status`, `created_at` ASC) for admin queue ordering

### `events` (analytics)
Custom product events.
- `id` (uuid, PK)
- `user_id` (uuid, nullable, FK profiles.id)
- `name` (text — e.g. `share_card_generated`, `top5_completed`, `achievement_proposed`)
- `properties` (jsonb)
- `created_at` (timestamptz)

### Computed / virtual
- `achievement_rarity` (materialised view): `unlock_count / total_users`. Refreshed every 10 min via a Supabase Edge Function on cron. Used for the % display and tier border colour.

### Triggers (essential)
1. `unlocks` insert → increment `achievements.unlock_count`. Delete → decrement.
2. `reactions` insert/update/delete → recompute `score` on target.
3. Reports: when any target accumulates 3+ open reports →
   - `story` / `reply` → set `is_hidden=true` automatically.
   - `achievement` → set `status='pending'` automatically (back to admin queue for re-review).
   - `profile` → flag for admin review (no automatic action; user-banning is a manual decision).

### RLS policies (summary)
- `profiles`: anyone can SELECT; only owner can UPDATE; only system creates on signup.
- `achievements`: anyone can SELECT where `status='approved'`; authenticated INSERT (status forced to `pending`); only admin UPDATE/DELETE.
- `unlocks`: anyone can SELECT; only owner INSERT/DELETE for their own `user_id`.
- `stories`, `replies`: anyone can SELECT where `is_hidden=false`; owner UPDATE/DELETE; admin can UPDATE `is_hidden`.
- `reactions`: anyone can SELECT count; authenticated INSERT/DELETE for their own `user_id`.
- `reports`: authenticated INSERT; admin SELECT/UPDATE.
- `events`: server-only writes (service role).

---

## 5. Screens

8 routes, plus 2 modals. No more.

### Public
1. **`/`** — Home. Grid Pinterest-style of achievements. Sections: "Random ahora", "Más populares", "Raros del día" (lowest %). Hero with login CTA. Bottom tab bar on mobile.
2. **`/l/[slug]`** — Achievement detail. Big emoji, title, % rarity, unlock count, "Adjudicar" button. Two tabs below: **"Historias"** (the forum — list of stories sorted by `score`; your own story, if any, pinned on top with a "Tu historia" badge) and **"Quién lo tiene"** (grid of all users who unlocked it).
3. **`/u/[username]`** — Public profile. Avatar, bio, Top-5 displayed prominently as trading cards, full grid of all unlocks below, "Compartir colección" CTA.
4. **`/legal`** — Terms + privacy policy + cookies (RGPD minimum).

### Authenticated
5. **`/descubrir`** — Swipe deck (Tinder-style). One card at a time, swipe right = adjudicate, left = pass. Mobile-first, addictive.
6. **`/crear`** — Achievement proposal form. Title, emoji picker, description, category. Submits as `pending`.
7. **`/yo`** — Self profile + edit. Top-5 drag-and-drop reorder, edit bio/avatar, account settings (delete account included).
8. **`/admin`** — Moderation queue (gated by `profiles.is_admin`). Tabs: pending achievements, open reports. Keyboard shortcuts A/R/B.

### Modals
- **Adjudicate modal** — appears on click. Confetti animation, "Tu historia (opcional)" textarea, primary CTA "Compartir card".
- **Share-card modal** — shows preview, 4 buttons: [Descargar PNG] [Stories IG] [TikTok] [WhatsApp] [Copiar link], suggested caption pre-filled to clipboard.

### Navigation pattern
- Mobile: bottom tab bar (Home / Descubrir / Crear / Perfil).
- Desktop: top nav with same items + search input.
- Same routes, responsive.

---

## 6. Critical flows

### A) Adjudicate an achievement
1. User on `/l/[slug]` or swiping in `/descubrir` taps "Adjudicar".
2. If logged out → Google OAuth modal → returns to step 3 with auth.
3. Adjudicate modal opens: emoji + title + "Lo desbloqueaste 🎉" + textarea "¿Quieres contar la historia?" (optional, max 1000 chars).
4. Submit → `INSERT` into `unlocks`. If story present, `INSERT` into `stories` with the same `unlock_id`.
5. Animation: card flies up, short confetti burst, primary CTA changes to "Compartir card".
6. If user taps "Compartir card" → share-card modal (flow D).

### B) Propose an achievement
1. Authenticated user on `/crear` fills title, emoji, description, category.
2. Submit → `INSERT` into `achievements` with `status='pending'`.
3. Confirmation screen: "En revisión. Te avisamos por mail si se aprueba." + "Comparte que lo propusiste" share button.
4. Push notification to admin queue (no real push — admin sees it on next `/admin` visit).
5. Admin approves → email to user via Supabase + auto-INSERT into `unlocks` for the proposer (creator gets the achievement automatically as incentive).

### C) Post a story or reply in a forum
1. On `/l/[slug]` → scroll to "Historias" tab (default tab).
2. If user has adjudicated, their story appears at top with "Tu historia" badge.
3. Tap a story → expands into a thread view with `replies`.
4. Reply box at the bottom. Submit → optimistic `INSERT` (UI updates before round-trip).
5. Like/dislike on stories and replies → reorder by `score`.

### D) Share-card generation and distribution
1. Trigger: just after adjudicating (individual card) or from profile (Top-5 card).
2. Backend renders PNG via Next `ImageResponse`. URLs:
   - `/og/unlock/[unlock_id]` → individual unlock card.
   - `/og/profile/[username]` → Top-5 collection card.
3. Modal shows preview (server-rendered HTML matching the PNG) + 5 buttons:
   - **Descargar PNG** — direct download.
   - **Stories IG** — deep link `instagram-stories://share?source_application=...&background_image=...` on mobile.
   - **TikTok** — copies image to clipboard + opens TikTok app/web.
   - **WhatsApp** — `https://wa.me/?text=...` with caption + link.
   - **Copiar link** — copies share URL with pre-written caption to clipboard.
4. Pre-written caption template: `"Acabo de desbloquear: [título] (solo el [X]% lo tiene 💀) — descubre los tuyos en unlocked.app/u/[username]"`.

### Critical viral detail
The achievement detail URL (`unlocked.app/l/[slug]`) and the profile URL (`unlocked.app/u/[username]`) both have rich Open Graph metadata pointing to the same `ImageResponse` URLs. When pasted in WhatsApp, Twitter, Discord, Slack — the rich preview shows the share-card automatically. Zero friction.

---

## 7. Viral / share-card system

### Card types in MVP
1. **Individual unlock card** (1080×1920) — generated at `/og/unlock/[id]`. Triggered after adjudication.
2. **Top-5 collection card** (1080×1920) — generated at `/og/profile/[username]`. Triggered from "Compartir mi colección".

### Card 3 deferred to post-MVP
- Friend comparison ("@user1 vs @user2"). Specced here as a placeholder; not built in MVP.
- Wrapped-style monthly recap. Not built in MVP (no data yet).

### Tier-by-rarity visual system (chosen design B3)
Border colour and label on every card are computed from real rarity:
- `>10%` → `COMÚN` · grey border (`#3a3a4a`)
- `1–10%` → `RARO` · violet border (`#A78BFA`)
- `<1%` → `LEGENDARY` · tricolor foil border (gradient `#FF6B6B → #C9A961 → #A78BFA`)
- `100%` (only one user has it) → `ÚNICO` · special "100% rareza · único" banner.

The numeric % is always shown alongside the tier label. The tier is a visual amplifier of the % — both are present.

### Auxiliary viral mechanics (in MVP)
- **Pre-written caption** copied to clipboard on share.
- **Universal rich preview** — every achievement and profile URL shows the share-card when pasted anywhere. Implemented via `generateMetadata` + `openGraph.images` returning the `/og/...` route.

### Auxiliary viral mechanics (Phase 2, deferred)
- **Streak email** — weekly mail to active users with a recap card. Requires email-sending provider decision (see §14) and adds operational complexity. Not on the critical path for "did it pop" measurement, so deferred.

---

## 8. Visual design system

### Tone
HIPERLLAMATIVO without burning the eyes. Reference: trading cards (Pokemon TCG, Magic the Gathering) for collectibility, Steam/PlayStation achievements for the rarity-as-flex pattern.

### Tokens
- **Background base:** `#0e0e14`
- **Card surface:** `#16161f`
- **Text primary:** `#ffffff`
- **Text muted:** `rgba(255,255,255,0.45)`
- **Gold (legendary):** `#C9A961`
- **Violet (rare):** `#A78BFA`
- **Red accent:** `#FF6B6B`
- **Grey (common):** `#3a3a4a`

### Typography
- **Display / titles:** Inter Black 900, tight tracking (`letter-spacing: -0.5px`).
- **Body:** Inter 400/500.
- **Numeric data (rarity %, counts):** JetBrains Mono.

### Card anatomy
- 230px width on share-card preview, 2.5px gradient border, 18px radius outer / 16px radius inner.
- Tier label top-left (uppercase, 9px, letter-spacing 2.5px), rarity % top-right (mono).
- Emoji centered, 64px.
- Title centered, Inter Black 17px, tight line-height (1.05).
- Optional epigraph in italic muted gold.
- Footer with category and unlock count.

### Layout primitives
- **Home grid** uses staggered card sizes (Pinterest-style) with 8px gutters.
- **Swipe deck** uses one card at a time, full-bleed on mobile.
- **Profile** displays Top-5 prominently above the fold, then a dense grid of remaining unlocks.

---

## 9. Moderation

### Automatic filters (pre-queue)
- Word blocklist: slurs, explicit sexual content, exposed personal data ("DNI", names+addresses). Short list at launch, expandable.
- Duplicate detection on title proposal: Levenshtein similarity > 0.85 against approved achievements → auto-reject with a pointer to the existing achievement.
- Rate limit: max 3 achievement proposals per user per day.

### Manual queue (`/admin`)
- Cards with title/description/author. Three buttons: Approve (A), Reject (R), Block user (B).
- Keyboard shortcuts active by default.
- Realistic SLA: 5–15 min/day for Alejandro at MVP scale.

### User reports
- Report button on stories, replies, profiles, approved achievements.
- Predefined reasons: spam, ofensivo, datos personales, otro.
- 3+ open reports on same target → auto-`is_hidden=true`, awaiting admin.

### RGPD
- Cookie banner (cookieyes free or similar).
- `/legal` with privacy policy from a reputable template.
- "Borrar mi cuenta" button on `/yo` settings → CASCADE delete of `profiles`, `unlocks`, `stories`, `replies`, `reactions`, `reports.reporter_id` set null on resolution.

### Out of MVP
- Volunteer community mods.
- AI/ML moderation.
- Graduated strikes/bans system. At MVP: warning email or direct ban.

---

## 10. Testing strategy

### E2E (Playwright) — 4 critical flows
1. Login with Google (mocked) → land on `/`.
2. Adjudicate from `/l/[slug]` with story → unlock count increments → confirmation.
3. Post story and reply in forum → reactions update score.
4. Generate share-card and confirm PNG renders.

### Unit tests
Only for logic that hurts when broken:
- Rarity calculation (`unlock_count / total_users`).
- Achievement proposal validation (length, emoji, category).
- RLS policies (test that User A can't modify User B's data).

### Type and lint
- TypeScript strict.
- ESLint with Next.js config + Tailwind plugin.

### Out of scope at MVP
- Component-level UI tests (UI changes too fast at MVP).
- Visual regression testing.
- Load testing (free-tier Vercel + Supabase have generous burst capacity).

---

## 11. Seed data

Before public launch, Alejandro curates **200 achievements** spanning the 8 categories. Approximate distribution:
- Familia tóxica · 25
- Vergüenzas · 30
- Resaca · 25
- Amor · 25
- Trabajo basura · 20
- Salud · 20
- Viajes · 25
- Random / surreales · 30

Each seed achievement has title, emoji, description, category, and `created_by=null`. Variety in expected rarity is essential — half should feel "I have this", half should feel "no one has this".

A seed admin profile (Alejandro's) is created with `is_admin=true`.

---

## 12. Success metrics and "did it land" criteria

### Tracked from day 1
- DAU / WAU / MAU (Plausible).
- Median achievements adjudicated per user.
- % of users who complete a Top-5.
- Share rate: cards generated / total adjudications.
- Viral coefficient: new users from share-link / total new.
- Achievements proposed per day / approved per day.

### Implementation
- Plausible from day 1 for page views and basic engagement.
- Custom `events` table in Supabase for product events. SQL queries saved as Supabase saved-queries — no dashboard built in MVP.

### Hard "did it pop" gates
- **Day 7:** ≥ 1.000 users with at least one unlock.
- **Day 14:** ≥ 30% D7 retention.
- **Day 30:** ≥ 100 community-proposed achievements.

If none of the three gates is met by day 30 → close or pivot. Decision is binary, taken on data alone.

---

## 13. Decisions log (referenced answers from brainstorm)

| # | Question | Decision |
|---|---|---|
| 1 | MVP scope | Phase 1 with forums included |
| 2 | Forum format | Asynchronous (Reddit-style), not real-time |
| 3 | User identity | Google OAuth, real name, real photo |
| 4 | Achievement creation | Open with moderation queue from day 1 |
| 5 | Share-card formats | Individual + Top-5 (no Wrapped) |
| 6 | Home format / Discover format | Home = Pinterest grid · Discover = Tinder swipe |
| 7 | Adjudication friction | One click + optional story |
| 8 | Rarity system | Real % shown numerically, with computed visual tier |
| 9 | Language / market | Spanish only, focus Spain |
| 10 | Stack | Next.js 15 + Supabase + Tailwind + Vercel |
| 11 | Visual direction | Trading card B3 — tier border by rarity |

---

## 14. Open questions (for implementation plan)

These are intentionally not decided in the spec and will be resolved during implementation:
- Exact Tailwind config and shared component primitives.
- Concrete category emoji and category-page layouts.
- Email-sending provider (Supabase native vs. Resend) for moderation approval notifications. Only required for MVP if approval-by-email is wanted; otherwise the user sees status on next visit to `/yo`. Default: build `/yo` notifications first, defer email until Phase 2.
- Whether admin queue lives at `/admin` route or as a Supabase Studio-only workflow at MVP (path-of-least-resistance: in-app `/admin`, since it's specced).
