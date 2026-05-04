-- Create the avatars storage bucket (public, since avatars are displayed publicly).
-- Idempotent: insert with on conflict do nothing.

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- RLS policies for the avatars bucket:
-- 1. Anyone can SELECT (read avatars publicly)
-- 2. Authenticated users can INSERT/UPDATE/DELETE in their OWN folder (path prefix = auth.uid())

drop policy if exists "avatars: public read" on storage.objects;
create policy "avatars: public read"
  on storage.objects for select
  using (bucket_id = 'avatars');

drop policy if exists "avatars: own insert" on storage.objects;
create policy "avatars: own insert"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "avatars: own update" on storage.objects;
create policy "avatars: own update"
  on storage.objects for update
  using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "avatars: own delete" on storage.objects;
create policy "avatars: own delete"
  on storage.objects for delete
  using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
