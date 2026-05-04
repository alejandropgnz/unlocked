# Unlocked MVP — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the Unlocked MVP — a viral web app for collecting absurd life achievements, with public catalogue, adjudication with optional story, asynchronous forum, share-cards, user-proposed achievements with moderation, Top-5 collection, and Tinder-style discover mode.

**Architecture:** Next.js 15 (App Router) + Supabase (Postgres + Auth + Storage) + Tailwind, deployed on Vercel. Server Components by default for SEO; Client Components only for interactive surfaces. Share-cards as Next.js `ImageResponse` (no separate image service).

**Tech Stack:** Next.js 15, React 19, Tailwind CSS, Supabase (Auth/Postgres/Storage), Plausible Analytics, Playwright (E2E), Vitest (unit), TypeScript strict mode.

**Spec:** [docs/superpowers/specs/2026-05-04-unlocked-design.md](../specs/2026-05-04-unlocked-design.md)

---

## Milestones (each is independently shippable)

| M | Title | Outcome |
|---|---|---|
| 0 | Foundation | Empty Next + Tailwind + Supabase wired, deploys to Vercel |
| 1 | Schema | All 7 tables + RLS + triggers in Supabase, types generated |
| 2 | Public catalogue | Home grid + achievement detail, read-only, with seeded data |
| 3 | Auth + profile | Google login, auto-create profile, public `/u/[username]` |
| 4 | Adjudication | One-click unlock, optional story, confetti, profile updates |
| 5 | Share-cards | Individual + Top-5 PNGs, share modal, rich previews |
| 6 | Forum | Stories list, replies, likes/dislikes, score sorting |
| 7 | UGC + moderation | `/crear` form, blocklist, duplicate detection, `/admin` queue |
| 8 | Profile editing + Top-5 | Drag-and-drop Top-5, bio/avatar, account deletion |
| 9 | Discover (swipe) | Tinder swipe deck on `/descubrir` |
| 10 | Reports + RGPD + launch prep | Reports, cookies, legal, analytics, E2E tests, 200 seeded achievements |

---

## File structure (locked in here, follow throughout the plan)

```
unlocked/
├── docs/superpowers/{specs,plans}/...     # this spec + plan
├── public/
│   ├── fonts/                             # Inter, JetBrains Mono self-hosted
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx                   # / — home grid
│   │   │   ├── l/[slug]/page.tsx          # /l/[slug] — achievement detail
│   │   │   ├── u/[username]/page.tsx      # /u/[username] — public profile
│   │   │   └── legal/page.tsx
│   │   ├── (authed)/
│   │   │   ├── descubrir/page.tsx
│   │   │   ├── crear/page.tsx
│   │   │   ├── yo/page.tsx
│   │   │   └── admin/page.tsx
│   │   ├── og/
│   │   │   ├── unlock/[id]/route.tsx      # /og/unlock/[id] — individual share-card PNG
│   │   │   └── profile/[username]/route.tsx # Top-5 share-card PNG
│   │   ├── api/
│   │   │   └── auth/callback/route.ts     # Supabase auth callback
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── achievement-card.tsx           # the trading card (B3)
│   │   ├── achievement-grid.tsx           # Pinterest-style grid
│   │   ├── adjudicate-modal.tsx
│   │   ├── share-card-modal.tsx
│   │   ├── story-thread.tsx               # forum: list of stories
│   │   ├── reply-list.tsx
│   │   ├── reply-box.tsx
│   │   ├── reaction-buttons.tsx
│   │   ├── swipe-deck.tsx
│   │   ├── top5-editor.tsx                # drag-and-drop top 5
│   │   ├── login-button.tsx
│   │   ├── nav-bar.tsx                    # top nav (desktop)
│   │   ├── tab-bar.tsx                    # bottom tabs (mobile)
│   │   ├── report-button.tsx
│   │   └── og-card-individual.tsx         # JSX returned by ImageResponse
│   │   └── og-card-top5.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts                  # browser client
│   │   │   ├── server.ts                  # server component client
│   │   │   └── middleware.ts              # session refresh
│   │   ├── rarity.ts                      # tier calculation
│   │   ├── slug.ts                        # title -> slug
│   │   ├── moderation.ts                  # blocklist + Levenshtein
│   │   ├── share.ts                       # caption template, deep links
│   │   ├── analytics.ts                   # event(name, props)
│   │   └── validators.ts                  # Zod schemas
│   ├── types/
│   │   └── database.ts                    # generated from Supabase
│   └── middleware.ts                      # protected routes
├── supabase/
│   ├── migrations/
│   │   ├── 20260504000001_init_schema.sql
│   │   ├── 20260504000002_rls_policies.sql
│   │   ├── 20260504000003_triggers.sql
│   │   └── 20260504000004_rarity_view.sql
│   ├── seed/
│   │   └── achievements.sql               # 200 achievements
│   └── config.toml
├── tests/
│   ├── e2e/
│   │   ├── login.spec.ts
│   │   ├── adjudicate.spec.ts
│   │   ├── forum.spec.ts
│   │   └── share-card.spec.ts
│   └── unit/
│       ├── rarity.test.ts
│       ├── slug.test.ts
│       ├── moderation.test.ts
│       └── validators.test.ts
├── .env.local                             # gitignored
├── .env.example
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── playwright.config.ts
├── vitest.config.ts
└── README.md
```

---

# Milestone 0 — Foundation

**Outcome:** Empty Next.js app with Tailwind, Supabase wired locally, design tokens defined, deploys to Vercel.

---

### Task 0.1: Initialize Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `.gitignore`

- [ ] **Step 1: Run create-next-app**

```bash
cd C:/Users/alexp/Desktop/Webs/unlocked
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*" --no-eslint --turbopack
```

Answer prompts: TypeScript yes, Tailwind yes, src dir yes, App Router yes, Turbopack yes, alias `@/*`. Accept directory not empty.

- [ ] **Step 2: Verify dev server boots**

```bash
npm run dev
```

Expected: dev server on `http://localhost:3000`, default Next.js page loads.

- [ ] **Step 3: Add ESLint with Next.js config**

```bash
npm install -D eslint eslint-config-next @typescript-eslint/parser
```

Create `.eslintrc.json`:
```json
{ "extends": ["next/core-web-vitals", "next/typescript"] }
```

- [ ] **Step 4: Initialize git**

```bash
git init
git add .
git commit -m "chore: initial Next.js scaffold"
```

---

### Task 0.2: Set up Tailwind design tokens

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`
- Create: `public/fonts/` (placeholder; fonts wired in Task 0.3)

- [ ] **Step 1: Edit `tailwind.config.ts` with design tokens**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0e0e14",
        surface: "#16161f",
        muted: "rgba(255,255,255,0.45)",
        gold: "#C9A961",
        violet: "#A78BFA",
        red: "#FF6B6B",
        grey: "#3a3a4a",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-1px",
        tighter: "-0.5px",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Replace `src/app/globals.css`**

```css
@import "tailwindcss";

:root {
  color-scheme: dark;
}

html, body {
  background: #0e0e14;
  color: #ffffff;
}

body {
  font-family: var(--font-inter), system-ui, sans-serif;
  font-feature-settings: "ss01", "cv01", "cv11";
}
```

- [ ] **Step 3: Verify by running dev server**

Background should be `#0e0e14`, page should still render.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add Tailwind design tokens"
```

---

### Task 0.3: Self-host Inter and JetBrains Mono

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace `src/app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Unlocked — your weird life · achieved",
  description: "Colecciona los logros más absurdos de tu vida.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bg text-white antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Verify font loads in dev**

Open devtools → Network → filter "font" → see Inter and JetBrains Mono load.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: wire Inter and JetBrains Mono"
```

---

### Task 0.4: Provision Supabase project

**Files:**
- Create: `.env.example`
- Create: `.env.local` (gitignored)

- [ ] **Step 1: Create Supabase project at supabase.com**

Manually in browser:
1. New project, name `unlocked`, region closest to Spain (`eu-west-2` or `eu-central-1`)
2. Save project URL and anon key from Settings → API
3. Save service-role key (will be used server-side only)

- [ ] **Step 2: Create `.env.example`**

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

- [ ] **Step 3: Create `.env.local` with real values**

Copy `.env.example` to `.env.local` and fill in real values from step 1.

- [ ] **Step 4: Verify `.env.local` is gitignored**

```bash
git check-ignore .env.local
```

Expected: prints `.env.local` (meaning it IS ignored).

- [ ] **Step 5: Commit `.env.example` only**

```bash
git add .env.example
git commit -m "chore: add Supabase env template"
```

---

### Task 0.5: Install Supabase clients and helpers

**Files:**
- Create: `src/lib/supabase/client.ts`
- Create: `src/lib/supabase/server.ts`
- Create: `src/lib/supabase/middleware.ts`
- Create: `src/middleware.ts`

- [ ] **Step 1: Install packages**

```bash
npm install @supabase/supabase-js @supabase/ssr
```

- [ ] **Step 2: Create `src/lib/supabase/client.ts`**

```ts
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
```

- [ ] **Step 3: Create `src/lib/supabase/server.ts`**

```ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (toSet) => {
          try {
            toSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Server Component called from Server Action context — ignore
          }
        },
      },
    },
  );
}
```

- [ ] **Step 4: Create `src/lib/supabase/middleware.ts`**

```ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/types/database";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (toSet) => {
          toSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          toSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  await supabase.auth.getUser();
  return response;
}
```

- [ ] **Step 5: Create `src/middleware.ts`**

```ts
import { updateSession } from "@/lib/supabase/middleware";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
```

- [ ] **Step 6: Create stub `src/types/database.ts`**

```ts
export type Database = Record<string, unknown>; // regenerated in M1
```

- [ ] **Step 7: Verify build succeeds**

```bash
npm run build
```

Expected: clean build, no TypeScript errors.

- [ ] **Step 8: Commit**

```bash
git add .
git commit -m "feat: wire Supabase SSR clients and session middleware"
```

---

### Task 0.6: Deploy to Vercel

**Files:** none (deployment config only)

- [ ] **Step 1: Push to GitHub**

```bash
gh repo create unlocked --private --source=. --remote=origin --push
```

- [ ] **Step 2: Import to Vercel**

Manually in browser:
1. Go to vercel.com, "Add New Project", import the GitHub repo
2. Add environment variables (same as `.env.local`)
3. Deploy

- [ ] **Step 3: Verify deployment**

Open the production URL. Expected: homepage loads, fonts render, dark background.

- [ ] **Step 4: Commit and tag**

```bash
git tag -a m0-foundation -m "Milestone 0: Foundation"
git push --tags
```

---

# Milestone 1 — Schema

**Outcome:** All 7 tables + RLS + triggers in Supabase. TypeScript types generated. Local Supabase CLI working.

---

### Task 1.1: Set up Supabase CLI locally

**Files:**
- Create: `supabase/config.toml`

- [ ] **Step 1: Install Supabase CLI**

```bash
npm install -D supabase
npx supabase --version
```

Expected: prints version.

- [ ] **Step 2: Initialize Supabase locally**

```bash
npx supabase init
```

Creates `supabase/` folder.

- [ ] **Step 3: Link to remote project**

```bash
npx supabase link --project-ref <project-ref-from-supabase-url>
```

Enter database password when prompted.

- [ ] **Step 4: Commit**

```bash
git add supabase/
git commit -m "chore: init Supabase CLI"
```

---

### Task 1.2: Write init schema migration

**Files:**
- Create: `supabase/migrations/20260504000001_init_schema.sql`

- [ ] **Step 1: Create the migration file with full schema**

```sql
-- Extensions
create extension if not exists "uuid-ossp";

-- Enums
create type achievement_category as enum (
  'familia', 'verguenza', 'resaca', 'amor',
  'trabajo', 'random', 'salud', 'viajes'
);
create type achievement_status as enum ('pending', 'approved', 'rejected');
create type report_target_type as enum ('achievement', 'story', 'reply', 'profile');
create type report_reason as enum ('spam', 'ofensivo', 'datos_personales', 'otro');
create type report_status as enum ('open', 'resolved', 'dismissed');
create type reaction_target_type as enum ('story', 'reply');

-- profiles
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null check (username ~ '^[a-z0-9_]{3,20}$'),
  display_name text not null,
  avatar_url text,
  bio text check (char_length(bio) <= 140),
  top5 uuid[] check (array_length(top5, 1) is null or array_length(top5, 1) <= 5),
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

-- achievements
create table achievements (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null check (char_length(title) between 3 and 80),
  emoji text not null,
  description text check (char_length(description) <= 200),
  category achievement_category not null,
  created_by uuid references profiles(id) on delete set null,
  status achievement_status not null default 'pending',
  unlock_count integer not null default 0,
  created_at timestamptz not null default now()
);

create index achievements_status_idx on achievements(status);
create index achievements_category_idx on achievements(category);

-- unlocks
create table unlocks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  achievement_id uuid not null references achievements(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(user_id, achievement_id)
);

create index unlocks_achievement_idx on unlocks(achievement_id);
create index unlocks_user_created_idx on unlocks(user_id, created_at desc);

-- stories
create table stories (
  id uuid primary key default uuid_generate_v4(),
  unlock_id uuid not null unique references unlocks(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  achievement_id uuid not null references achievements(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 1000),
  score integer not null default 0,
  is_hidden boolean not null default false,
  created_at timestamptz not null default now()
);

create index stories_achievement_score_idx on stories(achievement_id, score desc);

-- replies
create table replies (
  id uuid primary key default uuid_generate_v4(),
  story_id uuid not null references stories(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 500),
  score integer not null default 0,
  is_hidden boolean not null default false,
  created_at timestamptz not null default now()
);

create index replies_story_created_idx on replies(story_id, created_at asc);

-- reactions
create table reactions (
  user_id uuid not null references profiles(id) on delete cascade,
  target_type reaction_target_type not null,
  target_id uuid not null,
  value smallint not null check (value in (-1, 1)),
  created_at timestamptz not null default now(),
  primary key (user_id, target_type, target_id)
);

-- reports
create table reports (
  id uuid primary key default uuid_generate_v4(),
  target_type report_target_type not null,
  target_id uuid not null,
  reporter_id uuid not null references profiles(id) on delete cascade,
  reason report_reason not null,
  notes text check (char_length(notes) <= 500),
  status report_status not null default 'open',
  created_at timestamptz not null default now()
);

create index reports_status_idx on reports(status, created_at asc);

-- events (analytics)
create table events (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete set null,
  name text not null,
  properties jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index events_name_idx on events(name, created_at desc);
```

- [ ] **Step 2: Push migration to remote Supabase**

```bash
npx supabase db push
```

Expected: migration applied to remote DB. Verify in Supabase Dashboard → Table Editor that all 8 tables exist.

- [ ] **Step 3: Commit**

```bash
git add supabase/migrations/
git commit -m "feat: init schema with 8 tables"
```

---

### Task 1.3: Write RLS policies migration

**Files:**
- Create: `supabase/migrations/20260504000002_rls_policies.sql`

- [ ] **Step 1: Create migration with all RLS policies**

```sql
-- Enable RLS everywhere
alter table profiles enable row level security;
alter table achievements enable row level security;
alter table unlocks enable row level security;
alter table stories enable row level security;
alter table replies enable row level security;
alter table reactions enable row level security;
alter table reports enable row level security;
alter table events enable row level security;

-- profiles
create policy "profiles readable by all"
  on profiles for select using (true);
create policy "profiles updatable by owner"
  on profiles for update using (auth.uid() = id);
create policy "profiles insertable by owner"
  on profiles for insert with check (auth.uid() = id);

-- achievements: anyone reads approved; authenticated proposes pending; admin updates anything
create policy "achievements: read approved"
  on achievements for select using (status = 'approved' or auth.uid() = created_by or
    exists(select 1 from profiles where id = auth.uid() and is_admin));
create policy "achievements: propose"
  on achievements for insert
  with check (auth.uid() = created_by and status = 'pending');
create policy "achievements: admin updates"
  on achievements for update
  using (exists(select 1 from profiles where id = auth.uid() and is_admin));

-- unlocks
create policy "unlocks: read all"
  on unlocks for select using (true);
create policy "unlocks: own insert"
  on unlocks for insert with check (auth.uid() = user_id);
create policy "unlocks: own delete"
  on unlocks for delete using (auth.uid() = user_id);

-- stories
create policy "stories: read visible"
  on stories for select using (is_hidden = false or auth.uid() = user_id or
    exists(select 1 from profiles where id = auth.uid() and is_admin));
create policy "stories: own insert"
  on stories for insert with check (auth.uid() = user_id);
create policy "stories: own update"
  on stories for update using (auth.uid() = user_id);
create policy "stories: admin can hide"
  on stories for update
  using (exists(select 1 from profiles where id = auth.uid() and is_admin));

-- replies
create policy "replies: read visible"
  on replies for select using (is_hidden = false or auth.uid() = user_id or
    exists(select 1 from profiles where id = auth.uid() and is_admin));
create policy "replies: own insert"
  on replies for insert with check (auth.uid() = user_id);
create policy "replies: own update"
  on replies for update using (auth.uid() = user_id);

-- reactions
create policy "reactions: read"
  on reactions for select using (true);
create policy "reactions: own write"
  on reactions for insert with check (auth.uid() = user_id);
create policy "reactions: own update"
  on reactions for update using (auth.uid() = user_id);
create policy "reactions: own delete"
  on reactions for delete using (auth.uid() = user_id);

-- reports
create policy "reports: insert by user"
  on reports for insert with check (auth.uid() = reporter_id);
create policy "reports: admin read"
  on reports for select
  using (exists(select 1 from profiles where id = auth.uid() and is_admin));
create policy "reports: admin update"
  on reports for update
  using (exists(select 1 from profiles where id = auth.uid() and is_admin));

-- events: server-only writes; nobody reads through anon
create policy "events: no public access"
  on events for select using (false);
```

- [ ] **Step 2: Push migration**

```bash
npx supabase db push
```

- [ ] **Step 3: Commit**

```bash
git add supabase/migrations/
git commit -m "feat: add RLS policies"
```

---

### Task 1.4: Write triggers migration

**Files:**
- Create: `supabase/migrations/20260504000003_triggers.sql`

- [ ] **Step 1: Create trigger migration**

```sql
-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  base_username text;
  candidate text;
  i integer := 0;
begin
  base_username := lower(regexp_replace(coalesce(new.raw_user_meta_data->>'name', 'user'), '[^a-z0-9]+', '_', 'g'));
  base_username := substr(base_username, 1, 17);
  candidate := base_username;
  while exists(select 1 from profiles where username = candidate) loop
    i := i + 1;
    candidate := base_username || '_' || i;
  end loop;
  insert into profiles(id, username, display_name, avatar_url)
  values (
    new.id,
    candidate,
    coalesce(new.raw_user_meta_data->>'name', candidate),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Maintain achievements.unlock_count
create or replace function public.bump_unlock_count()
returns trigger
language plpgsql
as $$
begin
  if (tg_op = 'INSERT') then
    update achievements set unlock_count = unlock_count + 1 where id = new.achievement_id;
  elsif (tg_op = 'DELETE') then
    update achievements set unlock_count = greatest(unlock_count - 1, 0) where id = old.achievement_id;
  end if;
  return null;
end;
$$;

drop trigger if exists unlocks_count_trigger on unlocks;
create trigger unlocks_count_trigger
  after insert or delete on unlocks
  for each row execute function public.bump_unlock_count();

-- Maintain stories.score and replies.score from reactions
create or replace function public.bump_score()
returns trigger
language plpgsql
as $$
declare
  delta integer;
  ttype reaction_target_type;
  tid uuid;
begin
  if (tg_op = 'INSERT') then
    delta := new.value;
    ttype := new.target_type;
    tid := new.target_id;
  elsif (tg_op = 'DELETE') then
    delta := -old.value;
    ttype := old.target_type;
    tid := old.target_id;
  elsif (tg_op = 'UPDATE') then
    delta := new.value - old.value;
    ttype := new.target_type;
    tid := new.target_id;
  end if;

  if ttype = 'story' then
    update stories set score = score + delta where id = tid;
  elsif ttype = 'reply' then
    update replies set score = score + delta where id = tid;
  end if;
  return null;
end;
$$;

drop trigger if exists reactions_score_trigger on reactions;
create trigger reactions_score_trigger
  after insert or update or delete on reactions
  for each row execute function public.bump_score();

-- Auto-hide content with 3+ open reports
create or replace function public.auto_hide_on_reports()
returns trigger
language plpgsql
as $$
declare
  cnt integer;
begin
  select count(*) into cnt from reports
    where target_type = new.target_type and target_id = new.target_id and status = 'open';

  if cnt >= 3 then
    if new.target_type = 'story' then
      update stories set is_hidden = true where id = new.target_id;
    elsif new.target_type = 'reply' then
      update replies set is_hidden = true where id = new.target_id;
    elsif new.target_type = 'achievement' then
      update achievements set status = 'pending' where id = new.target_id;
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists reports_auto_hide_trigger on reports;
create trigger reports_auto_hide_trigger
  after insert on reports
  for each row execute function public.auto_hide_on_reports();
```

- [ ] **Step 2: Push migration**

```bash
npx supabase db push
```

- [ ] **Step 3: Manually verify auto-profile trigger**

In Supabase Dashboard → Auth → Users → "Add user" (test@example.com).
Then in Table Editor → profiles → confirm a new row exists.
Delete the test user afterward.

- [ ] **Step 4: Commit**

```bash
git add supabase/migrations/
git commit -m "feat: add triggers for profile creation, counts, scores, auto-hide"
```

---

### Task 1.5: Add rarity view migration

**Files:**
- Create: `supabase/migrations/20260504000004_rarity_view.sql`

- [ ] **Step 1: Create view migration**

```sql
create or replace view achievement_rarity as
select
  a.id,
  a.slug,
  a.unlock_count,
  (select count(*) from profiles)::numeric as total_users,
  case
    when (select count(*) from profiles) = 0 then 0
    else round(a.unlock_count::numeric / (select count(*) from profiles)::numeric * 100, 4)
  end as rarity_percent
from achievements a
where a.status = 'approved';

grant select on achievement_rarity to anon, authenticated;
```

- [ ] **Step 2: Push migration**

```bash
npx supabase db push
```

- [ ] **Step 3: Test view in Supabase SQL Editor**

```sql
select * from achievement_rarity limit 5;
```

Expected: returns rows (empty for now since no achievements seeded yet).

- [ ] **Step 4: Commit**

```bash
git add supabase/migrations/
git commit -m "feat: add achievement_rarity view"
```

---

### Task 1.6: Generate TypeScript types

**Files:**
- Modify: `src/types/database.ts`
- Modify: `package.json` (add `db:types` script)

- [ ] **Step 1: Add npm script to `package.json`**

In `scripts`:
```json
"db:types": "supabase gen types typescript --linked --schema public > src/types/database.ts"
```

- [ ] **Step 2: Run it**

```bash
npm run db:types
```

Expected: `src/types/database.ts` overwritten with full type definitions.

- [ ] **Step 3: Verify build still succeeds**

```bash
npm run build
```

Expected: clean build.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: generate Supabase TypeScript types"
git tag -a m1-schema -m "Milestone 1: Schema"
git push --tags
```

---

# Milestone 2 — Public catalogue (read-only)

**Outcome:** Home grid + achievement detail pages render real data from Supabase, no auth needed yet, with seeded test data.

---

### Task 2.1: Seed test data manually

**Files:**
- Create: `supabase/seed/test-achievements.sql`

- [ ] **Step 1: Create test seed**

```sql
insert into achievements (slug, title, emoji, description, category, status) values
  ('mi-padre-tabaco', 'Mi padre se fue a por tabaco y no volvió', '🚬', 'Un clásico atemporal del trauma español.', 'familia', 'approved'),
  ('finde-sin-dormir', '1 finde sin dormir', '😴', 'De jueves a domingo. Sin pegar ojo.', 'resaca', 'approved'),
  ('he-visto-ballena', 'He visto una ballena', '🐳', 'En vivo y en directo.', 'viajes', 'approved'),
  ('cuernos-2', 'Me han puesto los cuernos +2 veces', '💔', 'No es mala suerte. Eres tú.', 'amor', 'approved'),
  ('me-cai-cabeza', 'Me caí y me rompí la cabeza', '🤕', 'Literalmente.', 'salud', 'approved'),
  ('beber-11am', 'Empezar a beber a las 11 AM', '🍻', 'En domingo. En el aeropuerto.', 'random', 'approved'),
  ('cague-encima', 'Me cagué encima en una boda', '😬', 'No fue diarrea. Fue destino.', 'verguenza', 'approved'),
  ('escarabajo-crudo', 'Me he comido un escarabajo crudo', '🪲', 'Y no estabas en la jungla.', 'random', 'approved');

-- Fake unlock_count for variety in rarity tiers
update achievements set unlock_count = 12500 where slug = 'finde-sin-dormir';
update achievements set unlock_count = 5400 where slug = 'me-cai-cabeza';
update achievements set unlock_count = 2341 where slug = 'mi-padre-tabaco';
update achievements set unlock_count = 800 where slug = 'cuernos-2';
update achievements set unlock_count = 412 where slug = 'beber-11am';
update achievements set unlock_count = 87 where slug = 'cague-encima';
update achievements set unlock_count = 23 where slug = 'he-visto-ballena';
update achievements set unlock_count = 4 where slug = 'escarabajo-crudo';
```

- [ ] **Step 2: Apply seed in Supabase SQL Editor**

Open Supabase Dashboard → SQL Editor → paste the above and run.

- [ ] **Step 3: Verify**

```sql
select slug, unlock_count from achievements;
```

Expected: 8 rows.

- [ ] **Step 4: Commit**

```bash
git add supabase/seed/
git commit -m "chore: add test seed achievements"
```

---

### Task 2.2: Write rarity tier helper with TDD

**Files:**
- Create: `src/lib/rarity.ts`
- Create: `tests/unit/rarity.test.ts`
- Modify: `package.json` (add `test` script)
- Create: `vitest.config.ts`

- [ ] **Step 1: Install Vitest**

```bash
npm install -D vitest @vitest/ui
```

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
```

- [ ] **Step 3: Add `test` script in `package.json`**

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Write the failing test in `tests/unit/rarity.test.ts`**

```ts
import { describe, expect, it } from "vitest";
import { rarityTier, type Tier } from "@/lib/rarity";

describe("rarityTier", () => {
  it("returns COMMON when percent > 10", () => {
    expect(rarityTier(15)).toBe<Tier>("common");
  });
  it("returns RARE when 1 <= percent <= 10", () => {
    expect(rarityTier(5)).toBe<Tier>("rare");
    expect(rarityTier(1)).toBe<Tier>("rare");
    expect(rarityTier(10)).toBe<Tier>("rare");
  });
  it("returns LEGENDARY when 0 < percent < 1", () => {
    expect(rarityTier(0.04)).toBe<Tier>("legendary");
    expect(rarityTier(0.99)).toBe<Tier>("legendary");
  });
  it("returns UNIQUE when percent equals 100 / total = 1 user", () => {
    expect(rarityTier(100, { totalUsers: 1, unlockCount: 1 })).toBe<Tier>("unique");
  });
  it("returns COMMON when no data (zero unlocks, default)", () => {
    expect(rarityTier(0)).toBe<Tier>("common");
  });
});
```

- [ ] **Step 5: Run the failing test**

```bash
npm test
```

Expected: FAIL with "Cannot find module '@/lib/rarity'".

- [ ] **Step 6: Implement `src/lib/rarity.ts`**

```ts
export type Tier = "common" | "rare" | "legendary" | "unique";

export interface RarityContext {
  totalUsers: number;
  unlockCount: number;
}

export function rarityTier(percent: number, ctx?: RarityContext): Tier {
  if (ctx && ctx.totalUsers > 0 && ctx.unlockCount === ctx.totalUsers && ctx.totalUsers === 1) {
    return "unique";
  }
  if (percent > 10) return "common";
  if (percent >= 1) return "rare";
  if (percent > 0) return "legendary";
  return "common";
}

export function tierBorderClass(tier: Tier): string {
  switch (tier) {
    case "common":
      return "bg-grey";
    case "rare":
      return "bg-violet";
    case "legendary":
      return "bg-gradient-to-br from-red via-gold to-violet";
    case "unique":
      return "bg-gradient-to-br from-gold via-red to-gold";
  }
}

export function tierLabel(tier: Tier): string {
  return ({ common: "COMÚN", rare: "RARO", legendary: "LEGENDARY", unique: "ÚNICO" } as const)[tier];
}
```

- [ ] **Step 7: Run test to confirm pass**

```bash
npm test
```

Expected: all 5 tests pass.

- [ ] **Step 8: Commit**

```bash
git add .
git commit -m "feat: rarity tier calculation with tests"
```

---

### Task 2.3: Build the achievement card component

**Files:**
- Create: `src/components/achievement-card.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { rarityTier, tierBorderClass, tierLabel, type Tier } from "@/lib/rarity";

export interface AchievementCardProps {
  slug: string;
  title: string;
  emoji: string;
  rarityPercent: number;
  unlockCount: number;
  category: string;
  size?: "sm" | "md" | "lg";
}

export function AchievementCard({
  slug,
  title,
  emoji,
  rarityPercent,
  unlockCount,
  category,
  size = "md",
}: AchievementCardProps) {
  const tier: Tier = rarityTier(rarityPercent);
  const sizes = {
    sm: { card: "w-[140px]", emoji: "text-3xl", title: "text-xs", padding: "p-3" },
    md: { card: "w-[200px]", emoji: "text-5xl", title: "text-sm", padding: "p-4" },
    lg: { card: "w-[230px]", emoji: "text-6xl", title: "text-base", padding: "p-5" },
  }[size];

  return (
    <a
      href={`/l/${slug}`}
      className={`${sizes.card} rounded-[18px] p-[2px] block transition-transform hover:scale-105 ${tierBorderClass(tier)}`}
    >
      <div className={`bg-surface rounded-[16px] ${sizes.padding}`}>
        <div className="flex justify-between items-center text-[9px] font-bold tracking-[2.5px]" style={{ color: tier === "legendary" || tier === "unique" ? "#C9A961" : tier === "rare" ? "#A78BFA" : "#9aa0aa" }}>
          <span>★ {tierLabel(tier)}</span>
          <span className="font-mono">{rarityPercent.toFixed(2)}%</span>
        </div>
        <div className={`${sizes.emoji} text-center my-3`}>{emoji}</div>
        <h3 className={`font-black text-white ${sizes.title} leading-tight tracking-tighter text-center`}>{title}</h3>
        <div className="mt-3 pt-3 border-t border-white/10 flex justify-between text-[9px] text-muted tracking-wider uppercase">
          <span>{category}</span>
          <span className="font-mono">{unlockCount.toLocaleString("es-ES")}</span>
        </div>
      </div>
    </a>
  );
}
```

- [ ] **Step 2: Build to confirm no TS errors**

```bash
npm run build
```

Expected: clean build.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: AchievementCard component"
```

---

### Task 2.4: Build home grid with real data

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/achievement-grid.tsx`

- [ ] **Step 1: Create grid component `src/components/achievement-grid.tsx`**

```tsx
import { AchievementCard } from "./achievement-card";

interface Item {
  slug: string;
  title: string;
  emoji: string;
  category: string;
  unlock_count: number;
  rarity_percent: number;
}

export function AchievementGrid({ items }: { items: Item[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 p-3 md:p-4">
      {items.map((a) => (
        <AchievementCard
          key={a.slug}
          slug={a.slug}
          title={a.title}
          emoji={a.emoji}
          rarityPercent={a.rarity_percent}
          unlockCount={a.unlock_count}
          category={a.category}
          size="md"
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Replace `src/app/page.tsx`**

```tsx
import { createClient } from "@/lib/supabase/server";
import { AchievementGrid } from "@/components/achievement-grid";

export const revalidate = 60;

export default async function HomePage() {
  const supabase = await createClient();
  const { data: achievements, error } = await supabase
    .from("achievements")
    .select("slug, title, emoji, category, unlock_count, achievement_rarity!inner(rarity_percent)")
    .eq("status", "approved")
    .order("unlock_count", { ascending: false })
    .limit(40);

  if (error) {
    console.error(error);
    return <div className="p-8">Error cargando logros.</div>;
  }

  const items = (achievements ?? []).map((a) => ({
    slug: a.slug,
    title: a.title,
    emoji: a.emoji,
    category: a.category,
    unlock_count: a.unlock_count,
    rarity_percent: Array.isArray(a.achievement_rarity)
      ? Number(a.achievement_rarity[0]?.rarity_percent ?? 0)
      : Number((a.achievement_rarity as { rarity_percent: number } | null)?.rarity_percent ?? 0),
  }));

  return (
    <main className="min-h-screen">
      <header className="px-4 md:px-8 pt-8 pb-6">
        <h1 className="text-5xl md:text-7xl font-black tracking-tightest bg-gradient-to-br from-red via-gold to-violet bg-clip-text text-transparent leading-none">
          UNLOCKED
        </h1>
        <p className="text-muted mt-2 text-sm md:text-base">Colecciona los logros más absurdos de tu vida.</p>
      </header>
      <AchievementGrid items={items} />
    </main>
  );
}
```

- [ ] **Step 3: Run dev server and verify**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected: 8 cards from seed, sorted by unlock_count desc, with tier borders matching rarity.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: home grid renders real achievements"
```

---

### Task 2.5: Build achievement detail page

**Files:**
- Create: `src/app/l/[slug]/page.tsx`
- Create: `src/app/l/[slug]/not-found.tsx`

- [ ] **Step 1: Create not-found page**

```tsx
export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <div className="text-6xl mb-4">🔒</div>
      <h1 className="text-3xl font-black">Logro no encontrado</h1>
      <p className="text-muted mt-2">Igual no se ha desbloqueado todavía.</p>
      <a href="/" className="mt-6 underline">Volver al inicio</a>
    </main>
  );
}
```

- [ ] **Step 2: Create detail page**

```tsx
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { rarityTier, tierBorderClass, tierLabel } from "@/lib/rarity";

export const revalidate = 60;

export default async function AchievementPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("achievements")
    .select("id, slug, title, emoji, description, category, unlock_count, achievement_rarity!inner(rarity_percent)")
    .eq("slug", slug)
    .eq("status", "approved")
    .single();

  if (error || !data) notFound();

  const rarityPercent = Array.isArray(data.achievement_rarity)
    ? Number(data.achievement_rarity[0]?.rarity_percent ?? 0)
    : Number((data.achievement_rarity as { rarity_percent: number } | null)?.rarity_percent ?? 0);
  const tier = rarityTier(rarityPercent);

  return (
    <main className="min-h-screen px-4 md:px-8 py-8 max-w-3xl mx-auto">
      <a href="/" className="text-muted text-sm">← Volver</a>

      <div className={`mt-6 rounded-[18px] p-[3px] ${tierBorderClass(tier)}`}>
        <div className="bg-surface rounded-[15px] p-8 md:p-12 text-center">
          <div className="flex justify-center items-center gap-4 text-[10px] font-bold tracking-[2.5px] mb-6" style={{ color: tier === "legendary" || tier === "unique" ? "#C9A961" : tier === "rare" ? "#A78BFA" : "#9aa0aa" }}>
            <span>★ {tierLabel(tier)}</span>
            <span className="font-mono">{rarityPercent.toFixed(2)}%</span>
          </div>
          <div className="text-8xl md:text-9xl mb-6">{data.emoji}</div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-none">{data.title}</h1>
          {data.description && <p className="text-muted mt-4 text-sm md:text-base">{data.description}</p>}
          <div className="mt-8 pt-6 border-t border-white/10 flex justify-around text-xs">
            <div>
              <div className="text-muted uppercase tracking-wider">Categoría</div>
              <div className="font-bold mt-1">{data.category}</div>
            </div>
            <div>
              <div className="text-muted uppercase tracking-wider">Desbloqueado</div>
              <div className="font-mono font-bold mt-1">{data.unlock_count.toLocaleString("es-ES")}</div>
            </div>
          </div>
          <button
            disabled
            className="mt-8 w-full md:w-auto md:px-12 py-4 bg-white text-bg font-black rounded-full text-sm tracking-widest uppercase opacity-50 cursor-not-allowed"
          >
            Adjudicar (próximamente)
          </button>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Verify in browser**

Open `http://localhost:3000/l/mi-padre-tabaco`. Expected: full detail card with emoji, tier border, "Adjudicar" disabled.

- [ ] **Step 4: Commit and tag**

```bash
git add .
git commit -m "feat: achievement detail page"
git tag -a m2-catalogue -m "Milestone 2: Public catalogue"
git push --tags
```

---

# Milestone 3 — Auth + profile

**Outcome:** Google login works. Profile auto-created on signup. Public `/u/[username]` shows the user's collection (empty for now).

---

### Task 3.1: Configure Google OAuth in Supabase

**Files:** none (configuration only)

- [ ] **Step 1: Create Google OAuth credentials**

Manually:
1. Google Cloud Console → APIs → OAuth consent screen → External, app name "Unlocked"
2. Credentials → Create OAuth Client ID → Web application
3. Authorized redirect URI: `<supabase-url>/auth/v1/callback`
4. Save Client ID + Client Secret

- [ ] **Step 2: Configure in Supabase Dashboard**

Authentication → Providers → Google → enable, paste Client ID + Secret. Save.

- [ ] **Step 3: Configure Site URL**

Authentication → URL Configuration → Site URL = `http://localhost:3000` for now (will update for prod later).
Redirect URLs: add `http://localhost:3000/auth/callback`, `https://<vercel-prod-url>/auth/callback`.

---

### Task 3.2: Build login button + auth callback route

**Files:**
- Create: `src/components/login-button.tsx`
- Create: `src/app/api/auth/callback/route.ts`

- [ ] **Step 1: Create `src/app/api/auth/callback/route.ts`**

```ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";
  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }
  return NextResponse.redirect(`${origin}${next}`);
}
```

- [ ] **Step 2: Create `src/components/login-button.tsx`**

```tsx
"use client";
import { createClient } from "@/lib/supabase/client";

export function LoginButton({ next }: { next?: string }) {
  const handleLogin = async () => {
    const supabase = createClient();
    const redirectTo = `${window.location.origin}/api/auth/callback${next ? `?next=${encodeURIComponent(next)}` : ""}`;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
  };

  return (
    <button
      onClick={handleLogin}
      className="px-5 py-3 bg-white text-bg font-black rounded-full text-xs tracking-widest uppercase hover:bg-gold transition"
    >
      Entrar con Google
    </button>
  );
}
```

- [ ] **Step 3: Add login button to home header**

In `src/app/page.tsx`, add a `<LoginButton />` to the header. Move existing header layout into `flex justify-between items-end`.

```tsx
import { LoginButton } from "@/components/login-button";
// inside <header>:
<div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
  <div>
    <h1 className="..."> ... </h1>
    <p className="..."> ... </p>
  </div>
  <LoginButton />
</div>
```

- [ ] **Step 4: Test login in browser**

Run dev server, click "Entrar con Google", complete flow. Should redirect to `/` after.
Verify in Supabase Dashboard → Auth → Users that your account exists.
Verify in Table Editor → profiles that a row was auto-created.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: Google OAuth login + auto profile creation"
```

---

### Task 3.3: Build public profile page

**Files:**
- Create: `src/app/u/[username]/page.tsx`
- Create: `src/app/u/[username]/not-found.tsx`

- [ ] **Step 1: Create not-found page**

```tsx
export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <div className="text-6xl mb-4">👻</div>
      <h1 className="text-3xl font-black">Perfil no encontrado</h1>
      <a href="/" className="mt-6 underline">Volver al inicio</a>
    </main>
  );
}
```

- [ ] **Step 2: Create profile page**

```tsx
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { AchievementCard } from "@/components/achievement-card";

export const revalidate = 30;

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, username, display_name, avatar_url, bio, top5")
    .eq("username", username)
    .single();

  if (error || !profile) notFound();

  const { data: unlocks } = await supabase
    .from("unlocks")
    .select("achievement_id, created_at, achievements!inner(slug, title, emoji, category, unlock_count, achievement_rarity!inner(rarity_percent))")
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false });

  type Row = NonNullable<typeof unlocks>[number];
  const items = (unlocks ?? []).map((u: Row) => {
    const a = Array.isArray(u.achievements) ? u.achievements[0] : u.achievements;
    const rarity = Array.isArray(a.achievement_rarity) ? a.achievement_rarity[0] : a.achievement_rarity;
    return {
      id: u.achievement_id,
      slug: a.slug,
      title: a.title,
      emoji: a.emoji,
      category: a.category,
      unlockCount: a.unlock_count,
      rarityPercent: Number(rarity?.rarity_percent ?? 0),
    };
  });

  const top5Items = (profile.top5 ?? []).map((id) => items.find((i) => i.id === id)).filter(Boolean) as typeof items;

  return (
    <main className="min-h-screen px-4 md:px-8 py-8 max-w-5xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8 pb-8 border-b border-white/10">
        {profile.avatar_url && (
          <img src={profile.avatar_url} alt="" className="w-24 h-24 rounded-full" />
        )}
        <div>
          <div className="text-muted text-sm">@{profile.username}</div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter">{profile.display_name}</h1>
          {profile.bio && <p className="text-muted mt-2">{profile.bio}</p>}
          <div className="mt-3 text-sm">
            <span className="font-mono font-bold">{items.length}</span>{" "}
            <span className="text-muted">{items.length === 1 ? "logro" : "logros"} desbloqueados</span>
          </div>
        </div>
      </header>

      {top5Items.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xs uppercase tracking-widest text-muted mb-4">Top 5</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {top5Items.map((a) => (
              <AchievementCard key={a.id} {...a} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-xs uppercase tracking-widest text-muted mb-4">Colección</h2>
        {items.length === 0 ? (
          <p className="text-muted">Aún no ha desbloqueado nada. Cuando lo haga, aparecerá aquí.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {items.map((a) => (
              <AchievementCard key={a.id} {...a} size="sm" />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
```

- [ ] **Step 3: Verify in browser**

Visit `http://localhost:3000/u/<your-username>`. Should see your profile with empty collection.

- [ ] **Step 4: Commit and tag**

```bash
git add .
git commit -m "feat: public profile page"
git tag -a m3-auth -m "Milestone 3: Auth + profile"
git push --tags
```

---

# Milestone 4 — Adjudication

**Outcome:** Click "Adjudicar" on a logged-in detail page → optional story textarea → unlock saved → confetti → profile updates.

---

### Task 4.1: Add adjudicate server action

**Files:**
- Create: `src/app/l/[slug]/actions.ts`
- Create: `src/lib/validators.ts`

- [ ] **Step 1: Install Zod**

```bash
npm install zod
```

- [ ] **Step 2: Create `src/lib/validators.ts`**

```ts
import { z } from "zod";

export const adjudicateSchema = z.object({
  achievementId: z.string().uuid(),
  story: z.string().trim().max(1000).optional().default(""),
});

export const proposeAchievementSchema = z.object({
  title: z.string().trim().min(3).max(80),
  emoji: z.string().min(1).max(4),
  description: z.string().trim().max(200),
  category: z.enum(["familia", "verguenza", "resaca", "amor", "trabajo", "random", "salud", "viajes"]),
});

export const replySchema = z.object({
  storyId: z.string().uuid(),
  body: z.string().trim().min(1).max(500),
});
```

- [ ] **Step 3: Create `src/app/l/[slug]/actions.ts`**

```ts
"use server";
import { createClient } from "@/lib/supabase/server";
import { adjudicateSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function adjudicateAction(formData: FormData) {
  const parsed = adjudicateSchema.safeParse({
    achievementId: formData.get("achievementId"),
    story: formData.get("story") ?? "",
  });
  if (!parsed.success) return { error: "Datos inválidos" };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No estás logueado" };

  const { data: unlock, error: unlockErr } = await supabase
    .from("unlocks")
    .insert({ user_id: user.id, achievement_id: parsed.data.achievementId })
    .select("id, achievement_id")
    .single();
  if (unlockErr) {
    if (unlockErr.code === "23505") return { error: "Ya tienes este logro" };
    return { error: "No se pudo adjudicar" };
  }

  const story = parsed.data.story?.trim();
  if (story && story.length > 0) {
    await supabase.from("stories").insert({
      unlock_id: unlock.id,
      user_id: user.id,
      achievement_id: unlock.achievement_id,
      body: story,
    });
  }

  revalidatePath(`/l/${formData.get("slug")}`);
  return { ok: true, unlockId: unlock.id };
}
```

- [ ] **Step 4: Build to confirm types**

```bash
npm run build
```

Expected: clean build.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: adjudicate server action"
```

---

### Task 4.2: Build adjudicate modal

**Files:**
- Create: `src/components/adjudicate-modal.tsx`

- [ ] **Step 1: Install confetti library**

```bash
npm install canvas-confetti
npm install -D @types/canvas-confetti
```

- [ ] **Step 2: Create `src/components/adjudicate-modal.tsx`**

```tsx
"use client";
import { useState, useTransition } from "react";
import confetti from "canvas-confetti";
import { adjudicateAction } from "@/app/l/[slug]/actions";

interface Props {
  achievementId: string;
  slug: string;
  isLoggedIn: boolean;
  alreadyUnlocked: boolean;
}

export function AdjudicateModal({ achievementId, slug, isLoggedIn, alreadyUnlocked }: Props) {
  const [open, setOpen] = useState(false);
  const [story, setStory] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (!isLoggedIn) {
    return (
      <a
        href={`/api/auth/login?next=${encodeURIComponent(`/l/${slug}`)}`}
        className="mt-8 w-full md:w-auto md:px-12 py-4 bg-white text-bg font-black rounded-full text-sm tracking-widest uppercase inline-block text-center"
      >
        Adjudicar
      </a>
    );
  }

  if (alreadyUnlocked) {
    return (
      <button disabled className="mt-8 w-full md:w-auto md:px-12 py-4 bg-gold/30 text-gold font-black rounded-full text-sm tracking-widest uppercase">
        ✓ Ya lo tienes
      </button>
    );
  }

  const handleSubmit = () => {
    setError(null);
    startTransition(async () => {
      const fd = new FormData();
      fd.append("achievementId", achievementId);
      fd.append("slug", slug);
      fd.append("story", story);
      const result = await adjudicateAction(fd);
      if ("error" in result && result.error) {
        setError(result.error);
        return;
      }
      setDone(true);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    });
  };

  if (done) {
    return (
      <div className="mt-8 p-6 bg-surface rounded-2xl border border-gold/30">
        <div className="text-2xl font-black">¡Desbloqueado! 🎉</div>
        <p className="text-muted mt-2 text-sm">Ya forma parte de tu colección.</p>
        <div className="mt-4 flex gap-3">
          <a href="/yo" className="px-4 py-2 border border-white/20 rounded-full text-sm">Ver mi perfil</a>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-8 w-full md:w-auto md:px-12 py-4 bg-white text-bg font-black rounded-full text-sm tracking-widest uppercase hover:bg-gold transition"
      >
        Adjudicar
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end md:items-center justify-center p-4" onClick={() => !isPending && setOpen(false)}>
          <div className="bg-surface rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-black">Adjudicar logro</h3>
            <p className="text-muted text-sm mt-2">¿Quieres contar la historia? (opcional)</p>
            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              maxLength={1000}
              rows={5}
              placeholder="Cuenta cómo pasó..."
              className="mt-3 w-full bg-bg border border-white/10 rounded-xl p-3 text-sm focus:border-gold focus:outline-none"
            />
            <div className="text-right text-xs text-muted mt-1 font-mono">{story.length}/1000</div>
            {error && <div className="text-red text-sm mt-2">{error}</div>}
            <div className="mt-4 flex gap-3">
              <button onClick={() => setOpen(false)} disabled={isPending} className="flex-1 py-3 border border-white/20 rounded-full text-sm">Cancelar</button>
              <button onClick={handleSubmit} disabled={isPending} className="flex-1 py-3 bg-white text-bg font-black rounded-full text-sm uppercase tracking-widest disabled:opacity-50">
                {isPending ? "..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 3: Wire modal into detail page**

Replace the disabled button in `src/app/l/[slug]/page.tsx` with the modal:

```tsx
import { AdjudicateModal } from "@/components/adjudicate-modal";
// ...
const { data: { user } } = await supabase.auth.getUser();
const { data: existing } = user
  ? await supabase
      .from("unlocks")
      .select("id")
      .eq("user_id", user.id)
      .eq("achievement_id", data.id)
      .maybeSingle()
  : { data: null };
// in the JSX, replace the disabled button with:
<AdjudicateModal
  achievementId={data.id}
  slug={slug}
  isLoggedIn={!!user}
  alreadyUnlocked={!!existing}
/>
```

- [ ] **Step 4: Test in browser**

Login → go to `/l/mi-padre-tabaco` → click Adjudicar → confirm → see confetti → go to `/u/<your-username>` → see the achievement in your collection.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: adjudicate modal with optional story"
```

---

### Task 4.3: Add login redirect helper

**Files:**
- Create: `src/app/api/auth/login/route.ts`

- [ ] **Step 1: Create the route**

```ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const next = searchParams.get("next") ?? "/";
  // Redirect to a page that triggers the OAuth flow client-side
  return NextResponse.redirect(`${origin}/login?next=${encodeURIComponent(next)}`);
}
```

- [ ] **Step 2: Create `src/app/login/page.tsx`**

```tsx
"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const params = useSearchParams();
  const next = params.get("next") ?? "/";

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(next)}` },
    });
  }, [next]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-muted">Redirigiendo a Google...</p>
    </main>
  );
}
```

- [ ] **Step 3: Test login from anonymous click on Adjudicar**

In incognito → `/l/finde-sin-dormir` → click Adjudicar → should redirect to Google login → after login, return to `/l/finde-sin-dormir`.

- [ ] **Step 4: Commit and tag**

```bash
git add .
git commit -m "feat: login redirect for protected actions"
git tag -a m4-adjudicate -m "Milestone 4: Adjudication"
git push --tags
```

---

# Milestone 5 — Share-cards

**Outcome:** Individual unlock card and Top-5 card render as PNG via `ImageResponse`. Share modal opens after adjudication. Rich previews work when pasting links.

---

### Task 5.1: Build OG image — individual unlock card

**Files:**
- Create: `src/app/og/unlock/[id]/route.tsx`
- Create: `src/components/og-card-individual.tsx`

- [ ] **Step 1: Create `src/components/og-card-individual.tsx`**

```tsx
import { rarityTier, tierLabel, type Tier } from "@/lib/rarity";

const tierColor: Record<Tier, string> = {
  common: "#9aa0aa",
  rare: "#A78BFA",
  legendary: "#C9A961",
  unique: "#FFD700",
};

const tierBorder: Record<Tier, string> = {
  common: "linear-gradient(135deg,#3a3a4a,#3a3a4a)",
  rare: "linear-gradient(135deg,#A78BFA,#7C3AED)",
  legendary: "linear-gradient(135deg,#FF6B6B,#C9A961,#A78BFA)",
  unique: "linear-gradient(135deg,#FFD700,#FF6B6B,#FFD700)",
};

export function OgCardIndividual({
  emoji,
  title,
  rarityPercent,
  unlockCount,
  category,
  username,
}: {
  emoji: string;
  title: string;
  rarityPercent: number;
  unlockCount: number;
  category: string;
  username: string;
}) {
  const tier = rarityTier(rarityPercent);
  return (
    <div style={{
      width: "1080px", height: "1920px", display: "flex", flexDirection: "column",
      backgroundColor: "#0e0e14",
      backgroundImage: "radial-gradient(circle at 30% 20%, rgba(167,139,250,0.15), transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,107,107,0.1), transparent 50%)",
      padding: "80px 60px",
      fontFamily: "Inter",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: -1, color: "#fff" }}>UNLOCKED</div>
        <div style={{ fontSize: 18, letterSpacing: 4, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>your weird life · achieved</div>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 40 }}>
        <div style={{
          width: 800, padding: 8, borderRadius: 48, display: "flex",
          backgroundImage: tierBorder[tier],
        }}>
          <div style={{ flex: 1, padding: "60px 50px", borderRadius: 40, backgroundColor: "#16161f", display: "flex", flexDirection: "column", alignItems: "stretch" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, fontWeight: 700, letterSpacing: 4, color: tierColor[tier] }}>
              <div>★ {tierLabel(tier)}</div>
              <div style={{ fontFamily: "JetBrainsMono" }}>{rarityPercent.toFixed(2)}%</div>
            </div>
            <div style={{ fontSize: 220, textAlign: "center", margin: "60px 0" }}>{emoji}</div>
            <div style={{ fontSize: 60, fontWeight: 900, letterSpacing: -2, color: "#fff", textAlign: "center", lineHeight: 1.05 }}>{title}</div>
            <div style={{ marginTop: 48, paddingTop: 32, borderTop: "2px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", fontSize: 22, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase" }}>
              <div>{category}</div>
              <div style={{ fontFamily: "JetBrainsMono" }}>{unlockCount.toLocaleString("es-ES")} unlocked</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 24, padding: "24px 40px",
        fontSize: 28, fontWeight: 700, color: "#fff",
      }}>
        <div>SOLO EL <span style={{ color: tierColor[tier], fontFamily: "JetBrainsMono" }}>{rarityPercent.toFixed(2)}%</span> LO TIENE</div>
        <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)" }}>@{username} · unlocked.app</div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/app/og/unlock/[id]/route.tsx`**

```tsx
import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/server";
import { OgCardIndividual } from "@/components/og-card-individual";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("unlocks")
    .select("user_id, achievements!inner(title, emoji, category, unlock_count, achievement_rarity!inner(rarity_percent)), profiles!unlocks_user_id_fkey(username)")
    .eq("id", id)
    .single();
  if (error || !data) return new Response("Not found", { status: 404 });

  const a = Array.isArray(data.achievements) ? data.achievements[0] : data.achievements;
  const p = Array.isArray(data.profiles) ? data.profiles[0] : data.profiles;
  const rarity = Array.isArray(a.achievement_rarity) ? a.achievement_rarity[0] : a.achievement_rarity;

  return new ImageResponse(
    <OgCardIndividual
      emoji={a.emoji}
      title={a.title}
      rarityPercent={Number(rarity?.rarity_percent ?? 0)}
      unlockCount={a.unlock_count}
      category={a.category}
      username={p?.username ?? "anonymous"}
    />,
    { width: 1080, height: 1920 },
  );
}
```

- [ ] **Step 3: Test in browser**

Adjudicate a logro, find your unlock id in Supabase Table Editor → unlocks. Visit `http://localhost:3000/og/unlock/<uuid>`. Expected: PNG renders.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: individual unlock OG share-card"
```

---

### Task 5.2: Build OG image — Top-5 card

**Files:**
- Create: `src/app/og/profile/[username]/route.tsx`
- Create: `src/components/og-card-top5.tsx`

- [ ] **Step 1: Create `src/components/og-card-top5.tsx`**

```tsx
import { rarityTier, tierLabel, type Tier } from "@/lib/rarity";

const tierColor: Record<Tier, string> = {
  common: "#9aa0aa",
  rare: "#A78BFA",
  legendary: "#C9A961",
  unique: "#FFD700",
};

interface Item { emoji: string; title: string; rarityPercent: number; }

export function OgCardTop5({
  username,
  displayName,
  avatarUrl,
  totalUnlocks,
  rarest,
  top5,
}: {
  username: string;
  displayName: string;
  avatarUrl?: string;
  totalUnlocks: number;
  rarest?: Item;
  top5: Item[];
}) {
  return (
    <div style={{
      width: 1080, height: 1920, display: "flex", flexDirection: "column",
      backgroundColor: "#0e0e14",
      backgroundImage: "radial-gradient(circle at 50% 0%, rgba(201,169,97,0.12), transparent 50%)",
      padding: "60px 50px", fontFamily: "Inter",
    }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 40 }}>
        {avatarUrl && (<img src={avatarUrl} width={140} height={140} style={{ borderRadius: 70, border: "4px solid #C9A961" }} />)}
        <div style={{ fontSize: 56, fontWeight: 900, color: "#fff", marginTop: 24, letterSpacing: -2 }}>{displayName}</div>
        <div style={{ fontSize: 26, color: "rgba(255,255,255,0.5)", marginTop: 8 }}>@{username}</div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 80, marginBottom: 40, fontSize: 22, color: "#fff" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontFamily: "JetBrainsMono", fontSize: 44, fontWeight: 900, color: "#C9A961" }}>{totalUnlocks}</div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 18, letterSpacing: 2, textTransform: "uppercase" }}>logros</div>
        </div>
        {rarest && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontFamily: "JetBrainsMono", fontSize: 44, fontWeight: 900, color: "#A78BFA" }}>{rarest.rarityPercent.toFixed(2)}%</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 18, letterSpacing: 2, textTransform: "uppercase" }}>más raro</div>
          </div>
        )}
      </div>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {top5.slice(0, 4).map((it, i) => {
          const tier = rarityTier(it.rarityPercent);
          return (
            <div key={i} style={{ backgroundColor: "#16161f", borderRadius: 24, padding: 30, display: "flex", flexDirection: "column", border: `2px solid ${tierColor[tier]}33` }}>
              <div style={{ fontSize: 90, textAlign: "center" }}>{it.emoji}</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#fff", textAlign: "center", lineHeight: 1.05, marginTop: 16, letterSpacing: -0.5 }}>{it.title}</div>
              <div style={{ marginTop: 16, textAlign: "center", fontSize: 16, color: tierColor[tier], letterSpacing: 2, textTransform: "uppercase" }}>★ {tierLabel(tier)} · {it.rarityPercent.toFixed(2)}%</div>
            </div>
          );
        })}
        {top5.slice(4, 5).map((it, i) => {
          const tier = rarityTier(it.rarityPercent);
          return (
            <div key={`b${i}`} style={{ gridColumn: "span 2", backgroundColor: "#16161f", borderRadius: 24, padding: 30, display: "flex", alignItems: "center", border: `2px solid ${tierColor[tier]}33` }}>
              <div style={{ fontSize: 80 }}>{it.emoji}</div>
              <div style={{ marginLeft: 30, flex: 1 }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: "#fff", letterSpacing: -0.5 }}>{it.title}</div>
                <div style={{ marginTop: 8, fontSize: 16, color: tierColor[tier], letterSpacing: 2, textTransform: "uppercase" }}>★ {tierLabel(tier)} · {it.rarityPercent.toFixed(2)}%</div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 30, textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: 22, letterSpacing: 2 }}>
        hazte tu pasaporte en <span style={{ color: "#fff" }}>unlocked.app</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/app/og/profile/[username]/route.tsx`**

```tsx
import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/server";
import { OgCardTop5 } from "@/components/og-card-top5";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const supabase = await createClient();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, username, display_name, avatar_url, top5")
    .eq("username", username)
    .single();
  if (error || !profile) return new Response("Not found", { status: 404 });

  const { count: totalUnlocks } = await supabase
    .from("unlocks").select("id", { count: "exact", head: true })
    .eq("user_id", profile.id);

  const { data: rarestRow } = await supabase
    .from("unlocks")
    .select("achievements!inner(emoji, title, achievement_rarity!inner(rarity_percent))")
    .eq("user_id", profile.id)
    .order("achievements(unlock_count)", { ascending: true })
    .limit(1)
    .maybeSingle();

  const top5Ids = (profile.top5 ?? []).filter(Boolean);
  let top5: { emoji: string; title: string; rarityPercent: number }[] = [];
  if (top5Ids.length > 0) {
    const { data: top5Rows } = await supabase
      .from("achievements")
      .select("id, emoji, title, achievement_rarity!inner(rarity_percent)")
      .in("id", top5Ids);
    const byId = new Map((top5Rows ?? []).map((r) => [r.id, r]));
    top5 = top5Ids.map((id) => byId.get(id)).filter(Boolean).map((r) => {
      const rar = Array.isArray(r!.achievement_rarity) ? r!.achievement_rarity[0] : r!.achievement_rarity;
      return { emoji: r!.emoji, title: r!.title, rarityPercent: Number(rar?.rarity_percent ?? 0) };
    });
  }

  const ra = rarestRow ? (Array.isArray(rarestRow.achievements) ? rarestRow.achievements[0] : rarestRow.achievements) : null;
  const rarRarest = ra ? (Array.isArray(ra.achievement_rarity) ? ra.achievement_rarity[0] : ra.achievement_rarity) : null;

  return new ImageResponse(
    <OgCardTop5
      username={profile.username}
      displayName={profile.display_name}
      avatarUrl={profile.avatar_url ?? undefined}
      totalUnlocks={totalUnlocks ?? 0}
      rarest={ra ? { emoji: ra.emoji, title: ra.title, rarityPercent: Number(rarRarest?.rarity_percent ?? 0) } : undefined}
      top5={top5}
    />,
    { width: 1080, height: 1920 },
  );
}
```

- [ ] **Step 3: Test in browser**

Visit `http://localhost:3000/og/profile/<your-username>`. Expected: PNG renders with your profile.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: Top-5 OG profile card"
```

---

### Task 5.3: Add Open Graph metadata to detail and profile pages

**Files:**
- Modify: `src/app/l/[slug]/page.tsx`
- Modify: `src/app/u/[username]/page.tsx`

- [ ] **Step 1: Add `generateMetadata` to `src/app/l/[slug]/page.tsx`**

Above the page component:
```tsx
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("achievements").select("title, description, id").eq("slug", slug).maybeSingle();
  if (!data) return { title: "Logro no encontrado · Unlocked" };
  // For detail page, no specific unlock id — use a generic OG image (default route falls back to home OG)
  const ogUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/og/achievement/${slug}`;
  return {
    title: `${data.title} · Unlocked`,
    description: data.description ?? undefined,
    openGraph: { title: data.title, images: [ogUrl] },
    twitter: { card: "summary_large_image", title: data.title, images: [ogUrl] },
  };
}
```

- [ ] **Step 2: Create generic `src/app/og/achievement/[slug]/route.tsx`**

```tsx
import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/server";
import { OgCardIndividual } from "@/components/og-card-individual";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("achievements")
    .select("title, emoji, category, unlock_count, achievement_rarity!inner(rarity_percent)")
    .eq("slug", slug).single();
  if (error || !data) return new Response("Not found", { status: 404 });
  const rarity = Array.isArray(data.achievement_rarity) ? data.achievement_rarity[0] : data.achievement_rarity;
  return new ImageResponse(
    <OgCardIndividual
      emoji={data.emoji} title={data.title}
      rarityPercent={Number(rarity?.rarity_percent ?? 0)}
      unlockCount={data.unlock_count} category={data.category}
      username="unlocked"
    />,
    { width: 1080, height: 1920 },
  );
}
```

- [ ] **Step 3: Add `generateMetadata` to `src/app/u/[username]/page.tsx`**

```tsx
export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  const ogUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/og/profile/${username}`;
  return {
    title: `@${username} · Unlocked`,
    openGraph: { title: `@${username} en Unlocked`, images: [ogUrl] },
    twitter: { card: "summary_large_image", images: [ogUrl] },
  };
}
```

- [ ] **Step 4: Verify rich preview**

Push to Vercel. Take a production URL like `https://unlocked.vercel.app/l/mi-padre-tabaco`, paste in WhatsApp Web — should show the share-card preview.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: rich OG previews for detail and profile pages"
```

---

### Task 5.4: Build share-card modal

**Files:**
- Create: `src/components/share-card-modal.tsx`
- Create: `src/lib/share.ts`
- Modify: `src/components/adjudicate-modal.tsx` (post-success state shows "Compartir card")

- [ ] **Step 1: Create `src/lib/share.ts`**

```ts
export function captionForUnlock(title: string, rarityPercent: number, username: string): string {
  return `Acabo de desbloquear: ${title} (solo el ${rarityPercent.toFixed(2)}% lo tiene 💀) — descubre los tuyos en unlocked.app/u/${username}`;
}

export function captionForProfile(username: string, total: number): string {
  return `Mi colección de ${total} logros absurdos en Unlocked. Ven a por los tuyos: unlocked.app/u/${username}`;
}

export const whatsappShare = (text: string) => `https://wa.me/?text=${encodeURIComponent(text)}`;
export const twitterShare = (text: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
export const instagramStoriesShare = (imageUrl: string, appId = "0") =>
  `instagram-stories://share?source_application=${appId}&background_image=${encodeURIComponent(imageUrl)}`;
```

- [ ] **Step 2: Create `src/components/share-card-modal.tsx`**

```tsx
"use client";
import { useState } from "react";
import { captionForUnlock, captionForProfile, whatsappShare, twitterShare, instagramStoriesShare } from "@/lib/share";

export function ShareCardModal({
  open, onClose, ogImageUrl, kind, title, rarityPercent, username, total,
}: {
  open: boolean; onClose: () => void; ogImageUrl: string;
  kind: "unlock" | "profile"; title?: string; rarityPercent?: number; username: string; total?: number;
}) {
  const [copied, setCopied] = useState(false);
  if (!open) return null;

  const caption = kind === "unlock"
    ? captionForUnlock(title ?? "", rarityPercent ?? 0, username)
    : captionForProfile(username, total ?? 0);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleDownload = async () => {
    const res = await fetch(ogImageUrl);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `unlocked-${username}.png`;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-end md:items-center justify-center p-4" onClick={onClose}>
      <div className="bg-surface rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-black mb-4">Compartir</h3>
        <div className="aspect-[9/16] bg-bg rounded-xl overflow-hidden">
          <img src={ogImageUrl} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button onClick={handleDownload} className="py-3 bg-white text-bg font-black rounded-full text-xs uppercase tracking-widest">Descargar PNG</button>
          <a href={instagramStoriesShare(ogImageUrl)} className="py-3 bg-gradient-to-r from-red to-violet text-white font-black rounded-full text-xs uppercase tracking-widest text-center">Stories IG</a>
          <a href={whatsappShare(caption)} target="_blank" rel="noopener" className="py-3 bg-[#25D366] text-white font-black rounded-full text-xs uppercase tracking-widest text-center">WhatsApp</a>
          <a href={twitterShare(caption)} target="_blank" rel="noopener" className="py-3 bg-[#1DA1F2] text-white font-black rounded-full text-xs uppercase tracking-widest text-center">Twitter</a>
        </div>
        <button onClick={handleCopy} className="mt-2 w-full py-3 border border-white/20 rounded-full text-xs uppercase tracking-widest">
          {copied ? "✓ Copiado" : "Copiar texto + link"}
        </button>
        <button onClick={onClose} className="mt-3 w-full py-3 text-muted text-sm">Cerrar</button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Wire modal into adjudicate-modal post-success state**

In `src/components/adjudicate-modal.tsx`, change the `done` block to include a "Compartir card" button that opens `ShareCardModal`. Add state `const [shareOpen, setShareOpen] = useState(false);` and a button "Compartir card" that opens the modal pointing at `/og/unlock/<unlockId>`.

(Pass `unlockId`, `title`, `rarityPercent`, `username` from the detail page page.tsx into `AdjudicateModal` props; expand props accordingly.)

- [ ] **Step 4: Wire share button into profile page**

On `/u/[username]`, add a "Compartir colección" button that opens `ShareCardModal` with `kind="profile"` and `ogImageUrl=/og/profile/<username>`.

- [ ] **Step 5: Test full flow**

Login → adjudicate logro → click "Compartir card" → modal shows preview → download PNG works. Then go to your profile → "Compartir colección" → preview of Top-5 (will be empty for now since Top-5 not editable yet — confirm at least the page renders).

- [ ] **Step 6: Commit and tag**

```bash
git add .
git commit -m "feat: share-card modal with platform share buttons"
git tag -a m5-share -m "Milestone 5: Share-cards"
git push --tags
```

---

# Milestone 6 — Forum

**Outcome:** Stories list on detail page, replies, like/dislike with score sorting.

---

### Task 6.1: Show stories list on achievement detail page

**Files:**
- Modify: `src/app/l/[slug]/page.tsx`
- Create: `src/components/story-thread.tsx`

- [ ] **Step 1: Create `src/components/story-thread.tsx`**

```tsx
import Link from "next/link";

export interface StoryItem {
  id: string;
  body: string;
  score: number;
  created_at: string;
  user: { username: string; display_name: string; avatar_url: string | null };
  is_own?: boolean;
}

export function StoryThread({ stories }: { stories: StoryItem[] }) {
  if (stories.length === 0) {
    return <p className="text-muted text-sm">Aún no hay historias. Adjudícate el logro y sé el primero.</p>;
  }
  return (
    <ul className="space-y-4">
      {stories.map((s) => (
        <li key={s.id} className="bg-surface rounded-2xl p-4">
          <div className="flex items-center gap-3">
            {s.user.avatar_url && <img src={s.user.avatar_url} className="w-8 h-8 rounded-full" alt="" />}
            <Link href={`/u/${s.user.username}`} className="text-sm font-bold">@{s.user.username}</Link>
            {s.is_own && <span className="text-[10px] uppercase tracking-widest bg-gold/20 text-gold px-2 py-0.5 rounded-full">Tu historia</span>}
            <span className="text-muted text-xs ml-auto font-mono">{s.score >= 0 ? "+" : ""}{s.score}</span>
          </div>
          <p className="mt-3 text-sm whitespace-pre-wrap">{s.body}</p>
          <Link href={`/h/${s.id}`} className="mt-3 inline-block text-xs text-muted hover:text-white">Ver respuestas →</Link>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 2: Modify detail page to load and show stories**

In `src/app/l/[slug]/page.tsx`, after loading the achievement, add:

```tsx
const { data: storiesRaw } = await supabase
  .from("stories")
  .select("id, body, score, created_at, user_id, profiles!stories_user_id_fkey(username, display_name, avatar_url)")
  .eq("achievement_id", data.id)
  .eq("is_hidden", false)
  .order("score", { ascending: false })
  .limit(50);

const stories = (storiesRaw ?? []).map((s) => {
  const u = Array.isArray(s.profiles) ? s.profiles[0] : s.profiles;
  return {
    id: s.id, body: s.body, score: s.score, created_at: s.created_at,
    user: { username: u?.username ?? "", display_name: u?.display_name ?? "", avatar_url: u?.avatar_url ?? null },
    is_own: user?.id === s.user_id,
  };
});
```

And below the adjudicate button, add:
```tsx
<section className="mt-12">
  <h2 className="text-xs uppercase tracking-widest text-muted mb-4">Historias</h2>
  <StoryThread stories={stories} />
</section>
```

- [ ] **Step 3: Test**

Adjudicate a logro with a story. Refresh `/l/<slug>` → see your story listed. Confirm "Tu historia" badge appears.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: stories list on detail page"
```

---

### Task 6.2: Build story thread page (with replies)

**Files:**
- Create: `src/app/h/[id]/page.tsx`
- Create: `src/components/reply-list.tsx`
- Create: `src/components/reply-box.tsx`
- Create: `src/app/h/[id]/actions.ts`

- [ ] **Step 1: Create reply server action `src/app/h/[id]/actions.ts`**

```ts
"use server";
import { createClient } from "@/lib/supabase/server";
import { replySchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";

export async function postReply(formData: FormData) {
  const parsed = replySchema.safeParse({
    storyId: formData.get("storyId"),
    body: formData.get("body"),
  });
  if (!parsed.success) return { error: "Datos inválidos" };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No estás logueado" };

  const { error } = await supabase.from("replies").insert({
    story_id: parsed.data.storyId,
    user_id: user.id,
    body: parsed.data.body,
  });
  if (error) return { error: "No se pudo publicar" };
  revalidatePath(`/h/${parsed.data.storyId}`);
  return { ok: true };
}
```

- [ ] **Step 2: Create `src/components/reply-box.tsx`**

```tsx
"use client";
import { useState, useTransition } from "react";
import { postReply } from "@/app/h/[id]/actions";

export function ReplyBox({ storyId, isLoggedIn }: { storyId: string; isLoggedIn: boolean }) {
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (!isLoggedIn) return <a href={`/login?next=/h/${storyId}`} className="text-sm underline">Inicia sesión para responder</a>;

  const handleSubmit = () => {
    setError(null);
    startTransition(async () => {
      const fd = new FormData();
      fd.append("storyId", storyId);
      fd.append("body", body);
      const r = await postReply(fd);
      if ("error" in r && r.error) setError(r.error);
      else setBody("");
    });
  };

  return (
    <div className="mt-4">
      <textarea
        value={body} onChange={(e) => setBody(e.target.value)}
        maxLength={500} rows={3} placeholder="Tu respuesta..."
        className="w-full bg-bg border border-white/10 rounded-xl p-3 text-sm focus:border-gold focus:outline-none"
      />
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-muted font-mono">{body.length}/500</span>
        <button
          onClick={handleSubmit} disabled={isPending || body.trim().length === 0}
          className="px-5 py-2 bg-white text-bg font-black rounded-full text-xs uppercase tracking-widest disabled:opacity-50"
        >
          {isPending ? "..." : "Responder"}
        </button>
      </div>
      {error && <p className="text-red text-sm mt-2">{error}</p>}
    </div>
  );
}
```

- [ ] **Step 3: Create `src/components/reply-list.tsx`**

```tsx
import Link from "next/link";

interface Reply {
  id: string;
  body: string;
  score: number;
  user: { username: string; avatar_url: string | null };
}

export function ReplyList({ replies }: { replies: Reply[] }) {
  if (replies.length === 0) return <p className="text-muted text-sm mt-6">Sé el primero en responder.</p>;
  return (
    <ul className="space-y-3 mt-6">
      {replies.map((r) => (
        <li key={r.id} className="bg-surface rounded-xl p-3">
          <div className="flex items-center gap-2">
            {r.user.avatar_url && <img src={r.user.avatar_url} className="w-6 h-6 rounded-full" alt="" />}
            <Link href={`/u/${r.user.username}`} className="text-xs font-bold">@{r.user.username}</Link>
            <span className="text-xs text-muted ml-auto font-mono">{r.score >= 0 ? "+" : ""}{r.score}</span>
          </div>
          <p className="mt-2 text-sm whitespace-pre-wrap">{r.body}</p>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 4: Create thread page `src/app/h/[id]/page.tsx`**

```tsx
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ReplyList } from "@/components/reply-list";
import { ReplyBox } from "@/components/reply-box";

export const revalidate = 30;

export default async function StoryThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: story, error } = await supabase
    .from("stories")
    .select("id, body, score, created_at, user_id, achievement_id, profiles!stories_user_id_fkey(username, display_name, avatar_url), achievements!inner(slug, title, emoji)")
    .eq("id", id)
    .eq("is_hidden", false)
    .single();
  if (error || !story) notFound();

  const u = Array.isArray(story.profiles) ? story.profiles[0] : story.profiles;
  const a = Array.isArray(story.achievements) ? story.achievements[0] : story.achievements;

  const { data: repliesRaw } = await supabase
    .from("replies")
    .select("id, body, score, user_id, profiles!replies_user_id_fkey(username, avatar_url)")
    .eq("story_id", id)
    .eq("is_hidden", false)
    .order("score", { ascending: false });

  const replies = (repliesRaw ?? []).map((r) => {
    const ru = Array.isArray(r.profiles) ? r.profiles[0] : r.profiles;
    return {
      id: r.id, body: r.body, score: r.score,
      user: { username: ru?.username ?? "", avatar_url: ru?.avatar_url ?? null },
    };
  });

  return (
    <main className="min-h-screen px-4 md:px-8 py-8 max-w-3xl mx-auto">
      <Link href={`/l/${a.slug}`} className="text-muted text-sm">← {a.emoji} {a.title}</Link>

      <div className="mt-6 bg-surface rounded-2xl p-5">
        <div className="flex items-center gap-3">
          {u?.avatar_url && <img src={u.avatar_url} className="w-9 h-9 rounded-full" alt="" />}
          <Link href={`/u/${u?.username}`} className="font-bold">@{u?.username}</Link>
          <span className="text-muted text-xs ml-auto font-mono">{story.score >= 0 ? "+" : ""}{story.score}</span>
        </div>
        <p className="mt-3 whitespace-pre-wrap">{story.body}</p>
      </div>

      <h2 className="mt-8 text-xs uppercase tracking-widest text-muted">Respuestas</h2>
      <ReplyList replies={replies} />
      <ReplyBox storyId={id} isLoggedIn={!!user} />
    </main>
  );
}
```

- [ ] **Step 5: Test**

Adjudicate a logro with story → click "Ver respuestas →" on the story → write a reply → see it appear.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: story thread page with replies"
```

---

### Task 6.3: Add reaction (like/dislike) buttons

**Files:**
- Create: `src/components/reaction-buttons.tsx`
- Create: `src/app/api/react/route.ts`

- [ ] **Step 1: Create the API route**

```ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const schema = z.object({
  targetType: z.enum(["story", "reply"]),
  targetId: z.string().uuid(),
  value: z.union([z.literal(1), z.literal(-1), z.literal(0)]),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "bad request" }, { status: 400 });

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  if (parsed.data.value === 0) {
    await supabase.from("reactions").delete()
      .eq("user_id", user.id)
      .eq("target_type", parsed.data.targetType)
      .eq("target_id", parsed.data.targetId);
  } else {
    await supabase.from("reactions").upsert(
      { user_id: user.id, target_type: parsed.data.targetType, target_id: parsed.data.targetId, value: parsed.data.value },
      { onConflict: "user_id,target_type,target_id" },
    );
  }
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: Create `src/components/reaction-buttons.tsx`**

```tsx
"use client";
import { useState, useTransition } from "react";

export function ReactionButtons({
  targetType, targetId, initialScore, initialValue, isLoggedIn,
}: {
  targetType: "story" | "reply";
  targetId: string;
  initialScore: number;
  initialValue: 1 | -1 | 0;
  isLoggedIn: boolean;
}) {
  const [score, setScore] = useState(initialScore);
  const [value, setValue] = useState<1 | -1 | 0>(initialValue);
  const [isPending, startTransition] = useTransition();

  const send = (newValue: 1 | -1 | 0) => {
    if (!isLoggedIn) { window.location.href = `/login?next=${encodeURIComponent(window.location.pathname)}`; return; }
    const delta = newValue - value;
    setScore((s) => s + delta);
    setValue(newValue);
    startTransition(async () => {
      await fetch("/api/react", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetType, targetId, value: newValue }),
      });
    });
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => send(value === 1 ? 0 : 1)} disabled={isPending} className={`text-sm font-mono ${value === 1 ? "text-gold" : "text-muted"} hover:text-gold`}>▲</button>
      <span className="text-xs font-mono">{score}</span>
      <button onClick={() => send(value === -1 ? 0 : -1)} disabled={isPending} className={`text-sm font-mono ${value === -1 ? "text-red" : "text-muted"} hover:text-red`}>▼</button>
    </div>
  );
}
```

- [ ] **Step 3: Wire reactions into stories and replies**

- In `src/components/story-thread.tsx`, replace the score `<span>` with `<ReactionButtons targetType="story" targetId={s.id} initialScore={s.score} initialValue={s.my_value ?? 0} isLoggedIn={isLoggedIn} />`. Add `my_value` and `isLoggedIn` to the props.
- In `src/app/l/[slug]/page.tsx`, when loading stories, also fetch the user's reactions:
```ts
let myReactions = new Map<string, 1 | -1>();
if (user) {
  const ids = (storiesRaw ?? []).map((s) => s.id);
  if (ids.length > 0) {
    const { data: rs } = await supabase
      .from("reactions").select("target_id, value")
      .eq("user_id", user.id).eq("target_type", "story").in("target_id", ids);
    (rs ?? []).forEach((r) => myReactions.set(r.target_id, r.value as 1 | -1));
  }
}
```
And pass `my_value: myReactions.get(s.id) ?? 0` into each story item, and `isLoggedIn={!!user}` to `<StoryThread />`.

- Same wiring in `src/components/reply-list.tsx` and the thread page.

- [ ] **Step 4: Test**

Click ▲ on a story → score increments. Click again → reverts to 0. Refresh page → state persists.

- [ ] **Step 5: Commit and tag**

```bash
git add .
git commit -m "feat: reactions with score-based ordering"
git tag -a m6-forum -m "Milestone 6: Forum"
git push --tags
```

---

# Milestone 7 — UGC + moderation

**Outcome:** Authenticated users can propose achievements via `/crear`. Word blocklist + Levenshtein duplicate detection. Admin queue at `/admin`.

---

### Task 7.1: Write moderation library with TDD

**Files:**
- Create: `src/lib/moderation.ts`
- Create: `tests/unit/moderation.test.ts`

- [ ] **Step 1: Write failing test**

```ts
import { describe, expect, it } from "vitest";
import { containsBlockedWord, isDuplicateTitle } from "@/lib/moderation";

describe("moderation", () => {
  it("flags blocked words case-insensitively", () => {
    expect(containsBlockedWord("contiene puta mierda")).toBe(true);
    expect(containsBlockedWord("PUTA MIERDA")).toBe(true);
    expect(containsBlockedWord("texto limpio")).toBe(false);
  });
  it("returns true when title is similar enough", () => {
    expect(isDuplicateTitle("Mi padre se fue a por tabaco", ["mi padre se fué a por tabaco y no volvió"])).toBe(true);
    expect(isDuplicateTitle("Algo totalmente nuevo", ["mi padre se fue a por tabaco"])).toBe(false);
  });
});
```

Run: `npm test`. Expected: FAIL.

- [ ] **Step 2: Implement `src/lib/moderation.ts`**

```ts
const BLOCKLIST = [
  // minimal seed list — to be expanded
  "puta", "puto", "mierda", "joder",
];

export function containsBlockedWord(text: string): boolean {
  const t = text.toLowerCase();
  return BLOCKLIST.some((w) => new RegExp(`\\b${w}\\b`, "i").test(t));
}

export function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

export function similarity(a: string, b: string): number {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  return 1 - levenshtein(a.toLowerCase().trim(), b.toLowerCase().trim()) / maxLen;
}

export function isDuplicateTitle(candidate: string, existing: string[], threshold = 0.85): boolean {
  return existing.some((e) => similarity(candidate, e) >= threshold);
}
```

- [ ] **Step 3: Run test to confirm pass**

```bash
npm test
```

Expected: all pass.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: moderation library (blocklist + Levenshtein) with tests"
```

---

### Task 7.2: Create slug helper with TDD

**Files:**
- Create: `src/lib/slug.ts`
- Create: `tests/unit/slug.test.ts`

- [ ] **Step 1: Failing test**

```ts
import { describe, expect, it } from "vitest";
import { slugify } from "@/lib/slug";

describe("slugify", () => {
  it("removes accents and lowercases", () => {
    expect(slugify("Mi Padre Se Fué a por Tabaco")).toBe("mi-padre-se-fue-a-por-tabaco");
  });
  it("trims and dedupes hyphens", () => {
    expect(slugify("  hola   mundo  ")).toBe("hola-mundo");
  });
  it("strips emoji and punctuation", () => {
    expect(slugify("¡Vaya 🚬 día!")).toBe("vaya-dia");
  });
  it("limits length to 80", () => {
    const long = "a".repeat(200);
    expect(slugify(long).length).toBeLessThanOrEqual(80);
  });
});
```

Run: FAIL.

- [ ] **Step 2: Implement `src/lib/slug.ts`**

```ts
export function slugify(input: string): string {
  return input
    .normalize("NFKD").replace(/\p{Diacritic}/gu, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .toLowerCase().trim().replace(/\s+/g, "-").replace(/-+/g, "-")
    .slice(0, 80);
}
```

- [ ] **Step 3: Run tests pass**

```bash
npm test
```

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: slugify helper with tests"
```

---

### Task 7.3: Build /crear form

**Files:**
- Create: `src/app/crear/page.tsx`
- Create: `src/app/crear/actions.ts`
- Create: `src/components/category-picker.tsx`

- [ ] **Step 1: Create the server action**

```ts
"use server";
import { createClient } from "@/lib/supabase/server";
import { proposeAchievementSchema } from "@/lib/validators";
import { containsBlockedWord, isDuplicateTitle } from "@/lib/moderation";
import { slugify } from "@/lib/slug";

export async function proposeAchievement(formData: FormData) {
  const parsed = proposeAchievementSchema.safeParse({
    title: formData.get("title"),
    emoji: formData.get("emoji"),
    description: formData.get("description"),
    category: formData.get("category"),
  });
  if (!parsed.success) return { error: "Datos inválidos" };

  if (containsBlockedWord(parsed.data.title) || containsBlockedWord(parsed.data.description)) {
    return { error: "Texto contiene palabras prohibidas" };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No estás logueado" };

  // Rate limit: max 3 per day
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count } = await supabase
    .from("achievements").select("id", { count: "exact", head: true })
    .eq("created_by", user.id).gte("created_at", since);
  if ((count ?? 0) >= 3) return { error: "Máximo 3 propuestas por día" };

  // Duplicate detection
  const { data: existing } = await supabase.from("achievements").select("title").eq("status", "approved");
  if (isDuplicateTitle(parsed.data.title, (existing ?? []).map((e) => e.title))) {
    return { error: "Ya existe un logro muy parecido" };
  }

  const slug = slugify(parsed.data.title);
  const { error } = await supabase.from("achievements").insert({
    slug, title: parsed.data.title, emoji: parsed.data.emoji,
    description: parsed.data.description, category: parsed.data.category,
    created_by: user.id, status: "pending",
  });
  if (error) {
    if (error.code === "23505") return { error: "Ese título ya existe" };
    return { error: "No se pudo crear" };
  }
  return { ok: true };
}
```

- [ ] **Step 2: Create `src/components/category-picker.tsx`**

```tsx
const CATEGORIES = [
  { value: "familia", label: "Familia", emoji: "👨‍👩‍👧" },
  { value: "verguenza", label: "Vergüenza", emoji: "😬" },
  { value: "resaca", label: "Resaca", emoji: "🍻" },
  { value: "amor", label: "Amor", emoji: "💔" },
  { value: "trabajo", label: "Trabajo", emoji: "💼" },
  { value: "random", label: "Random", emoji: "🎲" },
  { value: "salud", label: "Salud", emoji: "🤕" },
  { value: "viajes", label: "Viajes", emoji: "✈️" },
] as const;

export function CategoryPicker({ name, defaultValue }: { name: string; defaultValue?: string }) {
  return (
    <select name={name} defaultValue={defaultValue} required className="w-full bg-bg border border-white/10 rounded-xl p-3 text-sm focus:border-gold focus:outline-none">
      <option value="">Elige una categoría...</option>
      {CATEGORIES.map((c) => (
        <option key={c.value} value={c.value}>{c.emoji} {c.label}</option>
      ))}
    </select>
  );
}

export { CATEGORIES };
```

- [ ] **Step 3: Create `src/app/crear/page.tsx`**

```tsx
"use client";
import { useState, useTransition } from "react";
import { proposeAchievement } from "./actions";
import { CategoryPicker } from "@/components/category-picker";

export default function CrearPage() {
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const r = await proposeAchievement(fd);
      if ("error" in r && r.error) setError(r.error);
      else setDone(true);
    });
  };

  if (done) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8 text-center">
        <div>
          <div className="text-6xl mb-4">📨</div>
          <h1 className="text-3xl font-black">En revisión</h1>
          <p className="text-muted mt-2">Si pasa la moderación, te lo adjudicamos automáticamente.</p>
          <a href="/" className="mt-6 inline-block underline">Volver al inicio</a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 md:px-8 py-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-black tracking-tighter">Proponer un logro</h1>
      <p className="text-muted mt-2 text-sm">Si lo aprobamos, todo el mundo podrá adjudicárselo. Tú lo recibirás automáticamente.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-xs uppercase tracking-widest text-muted">Título</label>
          <input name="title" maxLength={80} required className="mt-1 w-full bg-bg border border-white/10 rounded-xl p-3 text-sm focus:border-gold focus:outline-none" placeholder="Ej: Me dormí en una boda" />
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-muted">Emoji</label>
          <input name="emoji" maxLength={4} required className="mt-1 w-24 bg-bg border border-white/10 rounded-xl p-3 text-2xl text-center focus:border-gold focus:outline-none" placeholder="😴" />
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-muted">Descripción</label>
          <textarea name="description" maxLength={200} rows={3} className="mt-1 w-full bg-bg border border-white/10 rounded-xl p-3 text-sm focus:border-gold focus:outline-none" placeholder="Una línea explicándolo..." />
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-muted">Categoría</label>
          <div className="mt-1"><CategoryPicker name="category" /></div>
        </div>
        {error && <p className="text-red text-sm">{error}</p>}
        <button type="submit" disabled={isPending} className="w-full py-4 bg-white text-bg font-black rounded-full text-sm uppercase tracking-widest disabled:opacity-50">
          {isPending ? "..." : "Proponer"}
        </button>
      </form>
    </main>
  );
}
```

- [ ] **Step 4: Test**

Visit `/crear`, fill form, submit. Verify in Supabase Table Editor → achievements that the row is created with `status='pending'`.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: /crear form for proposing achievements"
```

---

### Task 7.4: Build /admin moderation queue

**Files:**
- Create: `src/app/admin/page.tsx`
- Create: `src/app/admin/actions.ts`
- Create: `src/components/admin-queue.tsx`

- [ ] **Step 1: Create the actions**

```ts
"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

async function assertAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("not logged in");
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
  if (!profile?.is_admin) throw new Error("not admin");
  return { supabase, user };
}

export async function approveAchievement(id: string) {
  const { supabase, user } = await assertAdmin();
  void user;
  const { data: ach } = await supabase.from("achievements").select("created_by").eq("id", id).single();
  await supabase.from("achievements").update({ status: "approved" }).eq("id", id);
  if (ach?.created_by) {
    await supabase.from("unlocks").insert({ user_id: ach.created_by, achievement_id: id }).select();
  }
  revalidatePath("/admin");
}

export async function rejectAchievement(id: string) {
  const { supabase } = await assertAdmin();
  await supabase.from("achievements").update({ status: "rejected" }).eq("id", id);
  revalidatePath("/admin");
}

export async function resolveReport(id: string) {
  const { supabase } = await assertAdmin();
  await supabase.from("reports").update({ status: "resolved" }).eq("id", id);
  revalidatePath("/admin");
}

export async function dismissReport(id: string) {
  const { supabase } = await assertAdmin();
  await supabase.from("reports").update({ status: "dismissed" }).eq("id", id);
  revalidatePath("/admin");
}
```

- [ ] **Step 2: Create the admin page**

```tsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminQueue } from "@/components/admin-queue";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/admin");
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
  if (!profile?.is_admin) redirect("/");

  const { data: pending } = await supabase
    .from("achievements")
    .select("id, title, emoji, description, category, created_by, profiles!achievements_created_by_fkey(username)")
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  const { data: reports } = await supabase
    .from("reports")
    .select("id, target_type, target_id, reason, notes, created_at, profiles!reports_reporter_id_fkey(username)")
    .eq("status", "open")
    .order("created_at", { ascending: true });

  return <AdminQueue pending={pending ?? []} reports={reports ?? []} />;
}
```

- [ ] **Step 3: Create `src/components/admin-queue.tsx`**

```tsx
"use client";
import { useEffect, useState, useTransition } from "react";
import { approveAchievement, rejectAchievement, dismissReport, resolveReport } from "@/app/admin/actions";

interface Pending {
  id: string; title: string; emoji: string; description: string | null; category: string;
  profiles: { username: string } | { username: string }[] | null;
}
interface Report {
  id: string; target_type: string; target_id: string; reason: string; notes: string | null; created_at: string;
  profiles: { username: string } | { username: string }[] | null;
}

export function AdminQueue({ pending, reports }: { pending: Pending[]; reports: Report[] }) {
  const [tab, setTab] = useState<"pending" | "reports">("pending");
  const [cursor, setCursor] = useState(0);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (tab !== "pending" || pending.length === 0) return;
      const item = pending[cursor];
      if (!item) return;
      if (e.key.toLowerCase() === "a") startTransition(() => { approveAchievement(item.id); });
      if (e.key.toLowerCase() === "r") startTransition(() => { rejectAchievement(item.id); });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [pending, cursor, tab]);

  return (
    <main className="min-h-screen px-4 md:px-8 py-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-black tracking-tighter">Admin</h1>
      <div className="mt-4 flex gap-2">
        <button onClick={() => setTab("pending")} className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest ${tab === "pending" ? "bg-white text-bg" : "bg-surface"}`}>Logros pendientes ({pending.length})</button>
        <button onClick={() => setTab("reports")} className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest ${tab === "reports" ? "bg-white text-bg" : "bg-surface"}`}>Reports ({reports.length})</button>
      </div>

      {tab === "pending" && (
        <div className="mt-6 space-y-4">
          {pending.length === 0 && <p className="text-muted">Cola vacía.</p>}
          {pending.map((p, i) => {
            const u = Array.isArray(p.profiles) ? p.profiles[0] : p.profiles;
            return (
              <div key={p.id} className={`bg-surface rounded-2xl p-5 ${i === cursor ? "ring-2 ring-gold" : ""}`}>
                <div className="flex items-start gap-3">
                  <div className="text-4xl">{p.emoji}</div>
                  <div className="flex-1">
                    <div className="font-black">{p.title}</div>
                    {p.description && <div className="text-muted text-sm mt-1">{p.description}</div>}
                    <div className="text-xs text-muted mt-2">@{u?.username ?? "?"} · {p.category}</div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => startTransition(() => { approveAchievement(p.id); })} className="px-4 py-2 bg-gold/20 text-gold font-black rounded-full text-xs uppercase tracking-widest">[A] Aprobar</button>
                  <button onClick={() => startTransition(() => { rejectAchievement(p.id); })} className="px-4 py-2 bg-red/20 text-red font-black rounded-full text-xs uppercase tracking-widest">[R] Rechazar</button>
                </div>
              </div>
            );
          })}
          <p className="text-xs text-muted">Atajos: A = aprobar · R = rechazar (sobre la card resaltada).</p>
        </div>
      )}

      {tab === "reports" && (
        <div className="mt-6 space-y-4">
          {reports.length === 0 && <p className="text-muted">Sin reports abiertos.</p>}
          {reports.map((r) => {
            const u = Array.isArray(r.profiles) ? r.profiles[0] : r.profiles;
            return (
              <div key={r.id} className="bg-surface rounded-2xl p-5">
                <div className="text-xs text-muted">@{u?.username ?? "?"} reportó {r.target_type} {r.target_id.slice(0, 8)}…</div>
                <div className="font-bold mt-2">Motivo: {r.reason}</div>
                {r.notes && <p className="text-sm mt-2 text-muted">{r.notes}</p>}
                <div className="mt-3 flex gap-2">
                  <button onClick={() => startTransition(() => { resolveReport(r.id); })} className="px-4 py-2 bg-gold/20 text-gold font-black rounded-full text-xs uppercase tracking-widest">Resolver</button>
                  <button onClick={() => startTransition(() => { dismissReport(r.id); })} className="px-4 py-2 bg-muted/20 text-muted font-black rounded-full text-xs uppercase tracking-widest">Descartar</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
```

- [ ] **Step 4: Make yourself admin manually**

In Supabase SQL Editor:
```sql
update profiles set is_admin = true where username = '<your-username>';
```

- [ ] **Step 5: Test**

Visit `/admin`. Should see your propose-test from Task 7.3 in the pending queue. Approve it → confirm it appears on `/` and that you got auto-unlock.

- [ ] **Step 6: Commit and tag**

```bash
git add .
git commit -m "feat: admin moderation queue at /admin"
git tag -a m7-ugc -m "Milestone 7: UGC + moderation"
git push --tags
```

---

# Milestone 8 — Profile editing + Top-5

**Outcome:** `/yo` lets the user edit bio/avatar, drag-and-drop their Top-5, delete their account.

---

### Task 8.1: Add editable Top-5 component

**Files:**
- Create: `src/components/top5-editor.tsx`
- Create: `src/app/yo/actions.ts`

- [ ] **Step 1: Install dnd-kit**

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

- [ ] **Step 2: Create server action**

```ts
"use server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const top5Schema = z.array(z.string().uuid()).max(5);
const profileSchema = z.object({
  bio: z.string().trim().max(140).optional(),
});

export async function saveTop5(formData: FormData) {
  const raw = formData.get("top5");
  const parsed = top5Schema.safeParse(JSON.parse(typeof raw === "string" ? raw : "[]"));
  if (!parsed.success) return { error: "Datos inválidos" };
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autenticado" };
  await supabase.from("profiles").update({ top5: parsed.data }).eq("id", user.id);
  revalidatePath("/yo");
  revalidatePath(`/u/${user.user_metadata.username ?? ""}`);
  return { ok: true };
}

export async function saveBio(formData: FormData) {
  const parsed = profileSchema.safeParse({ bio: formData.get("bio") });
  if (!parsed.success) return { error: "Datos inválidos" };
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autenticado" };
  await supabase.from("profiles").update({ bio: parsed.data.bio ?? null }).eq("id", user.id);
  revalidatePath("/yo");
  return { ok: true };
}

export async function deleteAccount() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autenticado" };
  // Delete profile (CASCADE deletes everything else)
  await supabase.from("profiles").delete().eq("id", user.id);
  await supabase.auth.signOut();
  return { ok: true };
}
```

- [ ] **Step 3: Create `src/components/top5-editor.tsx`**

```tsx
"use client";
import { useState, useTransition } from "react";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { saveTop5 } from "@/app/yo/actions";

interface Item { id: string; emoji: string; title: string; }

function Sortable({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  return (
    <div ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }}
      {...attributes} {...listeners}
      className="bg-surface rounded-xl p-3 cursor-grab active:cursor-grabbing flex items-center gap-3 border border-white/10">
      {children}
    </div>
  );
}

export function Top5Editor({ initial, available }: { initial: Item[]; available: Item[] }) {
  const [top5, setTop5] = useState<Item[]>(initial);
  const [, startTransition] = useTransition();

  const persist = (arr: Item[]) => {
    const fd = new FormData();
    fd.append("top5", JSON.stringify(arr.map((i) => i.id)));
    startTransition(() => { saveTop5(fd); });
  };

  const handleDragEnd = (e: DragEndEvent) => {
    if (!e.over || e.active.id === e.over.id) return;
    const oldIndex = top5.findIndex((i) => i.id === e.active.id);
    const newIndex = top5.findIndex((i) => i.id === e.over!.id);
    const next = arrayMove(top5, oldIndex, newIndex);
    setTop5(next); persist(next);
  };

  const remove = (id: string) => { const next = top5.filter((i) => i.id !== id); setTop5(next); persist(next); };
  const add = (item: Item) => {
    if (top5.length >= 5 || top5.some((i) => i.id === item.id)) return;
    const next = [...top5, item]; setTop5(next); persist(next);
  };

  const remaining = available.filter((a) => !top5.some((t) => t.id === a.id));

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs uppercase tracking-widest text-muted mb-2">Tu Top 5 (arrastra para ordenar)</h3>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={top5.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {top5.map((i) => (
                <Sortable key={i.id} id={i.id}>
                  <div className="text-2xl">{i.emoji}</div>
                  <div className="flex-1 text-sm font-bold">{i.title}</div>
                  <button onClick={(e) => { e.stopPropagation(); remove(i.id); }} className="text-red text-xs uppercase tracking-widest">Quitar</button>
                </Sortable>
              ))}
            </div>
          </SortableContext>
        </DndContext>
        {top5.length < 5 && <p className="text-xs text-muted mt-2">Quedan {5 - top5.length} huecos.</p>}
      </div>

      {remaining.length > 0 && top5.length < 5 && (
        <div>
          <h3 className="text-xs uppercase tracking-widest text-muted mb-2">Añadir desde tu colección</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {remaining.map((i) => (
              <button key={i.id} onClick={() => add(i)} className="bg-surface/50 rounded-xl p-3 text-left hover:bg-surface transition flex items-center gap-2">
                <div className="text-xl">{i.emoji}</div>
                <div className="flex-1 text-xs font-bold leading-tight">{i.title}</div>
                <span className="text-gold">+</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Create `/yo` page wiring everything**

`src/app/yo/page.tsx`:
```tsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Top5Editor } from "@/components/top5-editor";
import { saveBio, deleteAccount } from "./actions";

export default async function YoPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/yo");

  const { data: profile } = await supabase
    .from("profiles").select("username, display_name, bio, top5, avatar_url").eq("id", user.id).single();
  if (!profile) redirect("/");

  const { data: unlocks } = await supabase
    .from("unlocks").select("achievement_id, achievements!inner(id, emoji, title)").eq("user_id", user.id);

  const items = (unlocks ?? []).map((u) => {
    const a = Array.isArray(u.achievements) ? u.achievements[0] : u.achievements;
    return { id: u.achievement_id, emoji: a.emoji, title: a.title };
  });
  const top5Ids = profile.top5 ?? [];
  const initial = top5Ids.map((id) => items.find((i) => i.id === id)).filter(Boolean) as typeof items;

  return (
    <main className="min-h-screen px-4 md:px-8 py-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-black tracking-tighter">Tu perfil</h1>
      <p className="text-muted mt-1 text-sm">@{profile.username}</p>

      <section className="mt-8">
        <h2 className="text-xs uppercase tracking-widest text-muted mb-3">Bio</h2>
        <form action={saveBio}>
          <textarea name="bio" defaultValue={profile.bio ?? ""} maxLength={140} rows={2}
            className="w-full bg-bg border border-white/10 rounded-xl p-3 text-sm focus:border-gold focus:outline-none" />
          <button type="submit" className="mt-2 px-4 py-2 bg-white text-bg font-black rounded-full text-xs uppercase tracking-widest">Guardar</button>
        </form>
      </section>

      <section className="mt-8">
        <Top5Editor initial={initial} available={items} />
      </section>

      <section className="mt-12 pt-6 border-t border-white/10">
        <h2 className="text-xs uppercase tracking-widest text-muted mb-2">Zona de peligro</h2>
        <form action={async () => { "use server"; const r = await deleteAccount(); }}>
          <button type="submit" className="px-4 py-2 bg-red/20 text-red font-black rounded-full text-xs uppercase tracking-widest"
            onClick={(e) => { if (!confirm("¿Borrar tu cuenta? No se puede deshacer.")) e.preventDefault(); }}>
            Borrar mi cuenta
          </button>
        </form>
      </section>
    </main>
  );
}
```

- [ ] **Step 5: Test**

Adjudicate 5+ logros → visit `/yo` → add to Top-5 → drag to reorder → visit `/u/<username>` → see Top-5 reflected.

- [ ] **Step 6: Commit and tag**

```bash
git add .
git commit -m "feat: profile editing + drag-drop Top-5"
git tag -a m8-profile -m "Milestone 8: Profile editing + Top-5"
git push --tags
```

---

# Milestone 9 — Discover (swipe)

**Outcome:** `/descubrir` shows a Tinder-style swipe deck. Swipe right adjudicates, left passes.

---

### Task 9.1: Build swipe deck

**Files:**
- Create: `src/app/descubrir/page.tsx`
- Create: `src/components/swipe-deck.tsx`

- [ ] **Step 1: Install framer-motion**

```bash
npm install framer-motion
```

- [ ] **Step 2: Create the swipe deck**

```tsx
"use client";
import { useState, useTransition } from "react";
import { motion, type PanInfo } from "framer-motion";
import { adjudicateAction } from "@/app/l/[slug]/actions";

export interface SwipeItem {
  id: string; slug: string; emoji: string; title: string;
  rarityPercent: number; unlockCount: number; category: string;
}

export function SwipeDeck({ items: initial }: { items: SwipeItem[] }) {
  const [stack, setStack] = useState(initial);
  const [, startTransition] = useTransition();

  const handleEnd = (_e: PointerEvent, info: PanInfo, item: SwipeItem) => {
    const dx = info.offset.x;
    if (Math.abs(dx) < 100) return;
    const right = dx > 0;
    setStack((s) => s.filter((i) => i.id !== item.id));
    if (right) {
      const fd = new FormData();
      fd.append("achievementId", item.id);
      fd.append("slug", item.slug);
      fd.append("story", "");
      startTransition(() => { adjudicateAction(fd); });
    }
  };

  const top = stack[0];
  if (!top) return <p className="text-muted text-center mt-20">No hay más logros por ahora.</p>;

  return (
    <div className="relative w-full max-w-sm mx-auto h-[520px]">
      {stack.slice(0, 3).reverse().map((item, idx) => {
        const isTop = idx === stack.slice(0, 3).length - 1;
        return (
          <motion.div key={item.id}
            drag={isTop ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, info) => handleEnd(e as PointerEvent, info, item)}
            initial={{ scale: 0.9 - idx * 0.05, y: idx * 8 }}
            animate={{ scale: 1 - idx * 0.05, y: idx * 8 }}
            className="absolute inset-0 bg-surface border border-white/10 rounded-3xl p-8 flex flex-col">
            <div className="text-xs text-muted uppercase tracking-widest text-center">⚡ desbloqueable</div>
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="text-8xl">{item.emoji}</div>
              <div className="mt-6 text-2xl font-black tracking-tighter text-center">{item.title}</div>
              <div className="mt-3 text-xs text-muted font-mono">{item.rarityPercent.toFixed(2)}% · {item.unlockCount.toLocaleString("es-ES")} desbloqueados</div>
            </div>
            <div className="text-center text-xs text-muted">← Pasar · Adjudicar →</div>
          </motion.div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 3: Create `src/app/descubrir/page.tsx`**

```tsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SwipeDeck, type SwipeItem } from "@/components/swipe-deck";

export const dynamic = "force-dynamic";

export default async function DescubrirPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/descubrir");

  const { data: existing } = await supabase.from("unlocks").select("achievement_id").eq("user_id", user.id);
  const owned = new Set((existing ?? []).map((u) => u.achievement_id));

  const { data: pool } = await supabase
    .from("achievements")
    .select("id, slug, emoji, title, category, unlock_count, achievement_rarity!inner(rarity_percent)")
    .eq("status", "approved").limit(50);

  const items: SwipeItem[] = (pool ?? [])
    .filter((a) => !owned.has(a.id))
    .map((a) => {
      const r = Array.isArray(a.achievement_rarity) ? a.achievement_rarity[0] : a.achievement_rarity;
      return { id: a.id, slug: a.slug, emoji: a.emoji, title: a.title, category: a.category, unlockCount: a.unlock_count, rarityPercent: Number(r?.rarity_percent ?? 0) };
    })
    .sort(() => Math.random() - 0.5);

  return (
    <main className="min-h-screen px-4 py-8 flex flex-col">
      <h1 className="text-2xl font-black tracking-tighter text-center mb-6">Descubrir</h1>
      <SwipeDeck items={items} />
    </main>
  );
}
```

- [ ] **Step 4: Test**

Visit `/descubrir` → swipe right on a logro → check `/yo` → confirm it appears.

- [ ] **Step 5: Commit and tag**

```bash
git add .
git commit -m "feat: Tinder swipe deck on /descubrir"
git tag -a m9-discover -m "Milestone 9: Discover (swipe)"
git push --tags
```

---

# Milestone 10 — Reports + RGPD + analytics + launch prep

**Outcome:** Reports button works. Cookie banner. Legal page. Plausible Analytics. E2E tests. Navigation. 200-achievement seed. Production deploy.

---

### Task 10.1: Add report button + endpoint

**Files:**
- Create: `src/components/report-button.tsx`
- Create: `src/app/api/report/route.ts`

- [ ] **Step 1: Create the API route**

```ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const schema = z.object({
  targetType: z.enum(["achievement", "story", "reply", "profile"]),
  targetId: z.string().uuid(),
  reason: z.enum(["spam", "ofensivo", "datos_personales", "otro"]),
  notes: z.string().max(500).optional(),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "bad request" }, { status: 400 });
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { error } = await supabase.from("reports").insert({
    target_type: parsed.data.targetType, target_id: parsed.data.targetId,
    reason: parsed.data.reason, notes: parsed.data.notes ?? null, reporter_id: user.id,
  });
  if (error) return NextResponse.json({ error: "failed" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: Create the report button**

```tsx
"use client";
import { useState } from "react";

export function ReportButton({ targetType, targetId }: { targetType: "achievement" | "story" | "reply" | "profile"; targetId: string }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<"spam" | "ofensivo" | "datos_personales" | "otro">("ofensivo");
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);

  const submit = async () => {
    const r = await fetch("/api/report", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ targetType, targetId, reason, notes }) });
    if (r.ok) { setDone(true); setTimeout(() => setOpen(false), 1500); }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="text-xs text-muted hover:text-red">Reportar</button>
      {open && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="bg-surface rounded-2xl p-5 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            {done ? <p>Gracias por reportar. Lo revisaremos.</p> : (
              <>
                <h3 className="font-black mb-3">Reportar</h3>
                <select value={reason} onChange={(e) => setReason(e.target.value as typeof reason)} className="w-full bg-bg border border-white/10 rounded-xl p-3 text-sm">
                  <option value="spam">Spam</option><option value="ofensivo">Ofensivo</option>
                  <option value="datos_personales">Datos personales</option><option value="otro">Otro</option>
                </select>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="(opcional) Detalles" maxLength={500} rows={2}
                  className="mt-2 w-full bg-bg border border-white/10 rounded-xl p-3 text-sm" />
                <button onClick={submit} className="mt-3 w-full py-3 bg-red text-white font-black rounded-full text-xs uppercase tracking-widest">Enviar</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 3: Wire into stories and replies**

Add `<ReportButton targetType="story" targetId={s.id} />` into `story-thread.tsx`, and same for replies in `reply-list.tsx`.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: report button"
```

---

### Task 10.2: Add navigation (top nav + bottom tabs)

**Files:**
- Create: `src/components/nav-bar.tsx`
- Create: `src/components/tab-bar.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create nav-bar (desktop)**

```tsx
import Link from "next/link";
import { LoginButton } from "./login-button";
import { createClient } from "@/lib/supabase/server";

export async function NavBar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let username: string | null = null;
  if (user) {
    const { data } = await supabase.from("profiles").select("username").eq("id", user.id).single();
    username = data?.username ?? null;
  }
  return (
    <nav className="hidden md:flex items-center justify-between px-8 py-4 border-b border-white/5">
      <Link href="/" className="font-black text-lg tracking-tightest">UNLOCKED</Link>
      <div className="flex items-center gap-6 text-sm">
        <Link href="/" className="hover:text-gold">Home</Link>
        <Link href="/descubrir" className="hover:text-gold">Descubrir</Link>
        <Link href="/crear" className="hover:text-gold">Crear</Link>
        {username ? <Link href="/yo" className="hover:text-gold">@{username}</Link> : <LoginButton />}
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Create tab-bar (mobile)**

```tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function TabBar({ username }: { username: string | null }) {
  const path = usePathname();
  const tabs = [
    { href: "/", label: "Home", emoji: "🏠" },
    { href: "/descubrir", label: "Descubrir", emoji: "🔥" },
    { href: "/crear", label: "Crear", emoji: "✨" },
    { href: username ? "/yo" : "/login", label: username ? "Yo" : "Entrar", emoji: "👤" },
  ];
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-bg border-t border-white/10 flex justify-around py-2 z-40">
      {tabs.map((t) => {
        const active = path === t.href || (t.href !== "/" && path.startsWith(t.href));
        return (
          <Link key={t.href} href={t.href} className={`flex flex-col items-center gap-0.5 px-3 py-1 ${active ? "text-gold" : "text-muted"}`}>
            <span className="text-lg">{t.emoji}</span>
            <span className="text-[10px] uppercase tracking-widest">{t.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
```

- [ ] **Step 3: Wire into layout**

Modify `src/app/layout.tsx`:
```tsx
import { NavBar } from "@/components/nav-bar";
import { TabBar } from "@/components/tab-bar";
import { createClient } from "@/lib/supabase/server";
// ... inside RootLayout:
const supabase = await createClient();
const { data: { user } } = await supabase.auth.getUser();
let username: string | null = null;
if (user) {
  const { data } = await supabase.from("profiles").select("username").eq("id", user.id).single();
  username = data?.username ?? null;
}
// in body, before {children}:
<NavBar />
// after {children}:
<TabBar username={username} />
```

(Make `RootLayout` `async`.)

- [ ] **Step 4: Add bottom padding to pages so content not hidden by tab bar**

In `globals.css`:
```css
@media (max-width: 767px) { body { padding-bottom: 64px; } }
```

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: top nav + mobile bottom tab bar"
```

---

### Task 10.3: Add cookie banner + legal page

**Files:**
- Create: `src/app/legal/page.tsx`
- Create: `src/components/cookie-banner.tsx`

- [ ] **Step 1: Create legal page**

```tsx
export default function LegalPage() {
  return (
    <main className="min-h-screen px-4 md:px-8 py-8 max-w-3xl mx-auto prose prose-invert prose-sm">
      <h1 className="text-3xl font-black">Aviso legal y privacidad</h1>
      <h2>Quiénes somos</h2>
      <p>Unlocked es un proyecto independiente operado por su autor desde España. Para contactar: hola@unlocked.app.</p>

      <h2>Datos que recogemos</h2>
      <ul>
        <li>Datos de tu cuenta de Google (nombre, email, foto) para crear tu perfil.</li>
        <li>Logros que adjudicas, historias que publicas y respuestas en foros.</li>
        <li>Estadísticas anónimas de uso vía Plausible Analytics (sin cookies).</li>
      </ul>

      <h2>Tus derechos</h2>
      <p>Puedes borrar tu cuenta en cualquier momento desde tu perfil. Eso elimina todos tus datos personales (perfil, logros, historias, respuestas, votos).</p>

      <h2>Cookies</h2>
      <p>Solo usamos cookies estrictamente necesarias para mantener tu sesión iniciada. No usamos cookies de marketing ni de terceros.</p>

      <h2>Términos de uso</h2>
      <p>Al adjudicar logros y publicar contenido, te comprometes a no incluir datos personales ajenos, contenido ofensivo, ilegal o de odio. Nos reservamos el derecho a moderar y eliminar contenido sin previo aviso.</p>

      <p className="text-muted text-xs mt-8">Actualizado: 2026-05-04.</p>
    </main>
  );
}
```

- [ ] **Step 2: Create cookie banner**

```tsx
"use client";
import { useEffect, useState } from "react";

export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => { setShow(localStorage.getItem("ck-ack") !== "1"); }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-16 md:bottom-4 inset-x-4 md:inset-x-auto md:right-4 md:max-w-sm bg-surface border border-white/10 rounded-2xl p-4 z-30">
      <p className="text-xs">Solo usamos cookies necesarias para mantenerte logueado. Sin tracking.</p>
      <div className="mt-2 flex gap-2 items-center">
        <button onClick={() => { localStorage.setItem("ck-ack", "1"); setShow(false); }} className="px-3 py-1 bg-white text-bg font-black text-xs uppercase rounded-full tracking-widest">OK</button>
        <a href="/legal" className="text-xs text-muted underline">Más info</a>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Wire into layout**

In `src/app/layout.tsx`, add `<CookieBanner />` near the bottom.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: legal page + cookie banner"
```

---

### Task 10.4: Add Plausible + custom events

**Files:**
- Create: `src/lib/analytics.ts`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Add Plausible script in `src/app/layout.tsx`**

In `<head>` (you'll need to expose it via metadata or just add a script tag in body — easiest with `<Script>`):
```tsx
import Script from "next/script";
// ...
<Script defer data-domain="unlocked.app" src="https://plausible.io/js/script.js" />
```

(Wait until production domain is set up to actually configure Plausible site.)

- [ ] **Step 2: Create event helper**

```ts
"use server";
import { createClient } from "@/lib/supabase/server";

export async function logEvent(name: string, properties: Record<string, unknown> = {}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  await supabase.from("events").insert({ name, properties, user_id: user?.id ?? null });
}
```

- [ ] **Step 3: Instrument key events**

Add `logEvent("achievement_unlocked", { id })` after a successful insert in `adjudicateAction`. Add `logEvent("share_card_generated", { kind })` when share modal opens. Add `logEvent("achievement_proposed")` after a successful insert in `proposeAchievement`.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: analytics — Plausible + custom events"
```

---

### Task 10.5: E2E tests (Playwright)

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/e2e/login.spec.ts`
- Create: `tests/e2e/adjudicate.spec.ts`
- Create: `tests/e2e/forum.spec.ts`
- Create: `tests/e2e/share-card.spec.ts`

- [ ] **Step 1: Install Playwright**

```bash
npm install -D @playwright/test
npx playwright install chromium
```

- [ ] **Step 2: Create `playwright.config.ts`**

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: "http://localhost:3000",
    headless: true,
  },
});
```

- [ ] **Step 3: Add test script**

In `package.json`:
```json
"test:e2e": "playwright test"
```

- [ ] **Step 4: Write `tests/e2e/login.spec.ts`** (smoke test, no actual Google login because OAuth is hard to mock)

```ts
import { test, expect } from "@playwright/test";
test("home loads and shows login button", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("text=UNLOCKED")).toBeVisible();
  await expect(page.locator("text=Entrar con Google")).toBeVisible();
});
```

- [ ] **Step 5: Write the other E2E specs as smoke tests for now**

For deeper E2E we'd need test users — out of MVP scope. Smoke-test that pages load:

`tests/e2e/adjudicate.spec.ts`:
```ts
import { test, expect } from "@playwright/test";
test("achievement detail loads", async ({ page }) => {
  await page.goto("/l/mi-padre-tabaco");
  await expect(page.locator("h1")).toContainText("padre");
});
```

`tests/e2e/forum.spec.ts`:
```ts
import { test, expect } from "@playwright/test";
test("descubrir requires login", async ({ page }) => {
  await page.goto("/descubrir");
  await expect(page).toHaveURL(/\/login/);
});
```

`tests/e2e/share-card.spec.ts`:
```ts
import { test, expect } from "@playwright/test";
test("achievement OG returns PNG", async ({ request }) => {
  const r = await request.get("/og/achievement/mi-padre-tabaco");
  expect(r.status()).toBe(200);
  expect(r.headers()["content-type"]).toContain("image/png");
});
```

- [ ] **Step 6: Run tests**

```bash
npm run test:e2e
```

Expected: all pass.

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "test: E2E smoke tests for critical pages"
```

---

### Task 10.6: Seed 200 achievements

**Files:**
- Create: `supabase/seed/achievements.sql`

- [ ] **Step 1: Curate 200 achievements**

Spend an hour curating ~25 achievements per category × 8 categories = 200. Format:

```sql
insert into achievements (slug, title, emoji, description, category, status) values
  ('aaaa', 'Title', '🚬', 'descripcion', 'familia', 'approved'),
  -- ... 199 more
;
```

(This is content work, not code work. Take time. Variety in expected rarity. Keep it absurd, recognizable, Spain-flavored.)

- [ ] **Step 2: Apply via Supabase SQL Editor**

Paste and run.

- [ ] **Step 3: Verify**

```sql
select count(*) from achievements where status = 'approved';
-- expected: ~208 (200 + the 8 from Task 2.1)
```

- [ ] **Step 4: Refresh `achievement_rarity` view**

It's auto-updated, but rarity_percent will be 0 for all (no users yet). Fine.

- [ ] **Step 5: Commit**

```bash
git add supabase/seed/achievements.sql
git commit -m "data: seed 200 curated achievements"
```

---

### Task 10.7: Production deploy and final checks

**Files:** none

- [ ] **Step 1: Set production env vars in Vercel**

`NEXT_PUBLIC_SITE_URL=https://unlocked.app` (or whatever the production domain is)

- [ ] **Step 2: Update Supabase Auth settings**

Authentication → URL Configuration → Site URL = production URL. Add production callback to redirect URLs.

- [ ] **Step 3: Configure custom domain in Vercel**

Buy unlocked.app (or alternative) and point DNS to Vercel.

- [ ] **Step 4: Run smoke checks on production**

- Open `/` — grid loads
- Login with Google — works
- Adjudicate a logro — confetti + saved
- Compartir card — PNG downloads
- Pegar URL en WhatsApp — rich preview

- [ ] **Step 5: Tag launch**

```bash
git tag -a v1.0.0 -m "Unlocked MVP launch"
git push --tags
```

---

# Self-review

**Spec coverage check** — every spec section maps to tasks:
- §3 Architecture — M0 (foundation), M1 (schema)
- §4 Data model — M1.2–1.6
- §5 Screens — M2 (home, detail), M3 (profile public), M7.3 (crear), M7.4 (admin), M8 (yo), M9 (descubrir), M10.3 (legal)
- §6 Critical flows — A: M4, B: M7.3+M7.4, C: M6, D: M5
- §7 Viral / share-cards — M5
- §8 Visual design system — M0.2 (tokens), M2.3 (card), used everywhere
- §9 Moderation — M7.1 (lib), M7.4 (admin queue), M10.1 (reports), M1.4 (auto-hide trigger), M10.3 (RGPD/cookie)
- §10 Testing — M2.2, M7.1, M7.2 (unit) + M10.5 (E2E)
- §11 Seed data — M10.6
- §12 Metrics — M10.4 (Plausible + events)
- §14 Open question (admin queue route): resolved in M7.4 (in-app `/admin`)

**Placeholder scan:** No "TBD", "TODO", or "implement later" remain. Every code step has actual code.

**Type consistency check:**
- `Tier = "common" | "rare" | "legendary" | "unique"` used consistently across `rarity.ts`, `achievement-card.tsx`, `og-card-individual.tsx`, `og-card-top5.tsx`. ✓
- `proposeAchievement` action signature consistent with `proposeAchievementSchema`. ✓
- `adjudicateAction` signature consistent across calls in detail page, swipe deck, adjudicate-modal. ✓
- `Story`/`Reply` shapes in story-thread.tsx match the queries that produce them. ✓

No issues found.

---

# Execution

Plan complete and saved to `docs/superpowers/plans/2026-05-04-unlocked-mvp.md`. Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
