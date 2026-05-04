-- Tighten events insert policy: only authenticated users can insert.
-- Replaces the over-permissive `with check (true)` from migration 006.

drop policy if exists "events: anyone can insert" on events;

create policy "events: authenticated insert only"
  on events for insert
  with check (auth.uid() is not null);

-- The user_id column may still be NULL (e.g. server-side functions inserting on behalf of system),
-- but the inserter MUST have a valid auth context.
