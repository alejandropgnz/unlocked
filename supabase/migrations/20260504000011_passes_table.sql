-- Track left-swipes ("paso") on /descubrir so cards the user already passed
-- don't reappear after a reload. Right-swipes already persist via `unlocks`.
--
-- Composite primary key (user_id, achievement_id) enforces idempotency:
-- swiping left twice on the same item is a no-op.

create table if not exists passes (
  user_id uuid not null references profiles(id) on delete cascade,
  achievement_id uuid not null references achievements(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, achievement_id)
);

create index if not exists passes_user_id_idx on passes(user_id);

alter table passes enable row level security;

drop policy if exists passes_select_own on passes;
create policy passes_select_own
  on passes for select
  using (auth.uid() = user_id);

drop policy if exists passes_insert_own on passes;
create policy passes_insert_own
  on passes for insert
  with check (auth.uid() = user_id);

drop policy if exists passes_delete_own on passes;
create policy passes_delete_own
  on passes for delete
  using (auth.uid() = user_id);
