-- Pre-launch waitlist. Email capture from /proximamente landing while the
-- product is gated. Anon can INSERT (with a basic email-shape check),
-- only admins can SELECT — no public list of who's signed up.

create table if not exists waitlist (
  email text primary key
    check (email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  source text not null default 'landing',
  created_at timestamptz not null default now()
);

create index if not exists waitlist_created_at_idx on waitlist(created_at desc);

alter table waitlist enable row level security;

drop policy if exists waitlist_public_insert on waitlist;
create policy waitlist_public_insert
  on waitlist for insert
  to anon, authenticated
  with check (true);

-- Only admins can read the list. Default-deny otherwise.
drop policy if exists waitlist_admin_select on waitlist;
create policy waitlist_admin_select
  on waitlist for select
  using (
    exists (
      select 1 from profiles p
      where p.id = auth.uid() and p.is_admin = true
    )
  );
