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
