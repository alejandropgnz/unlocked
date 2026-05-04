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

-- achievements
create policy "achievements: read approved"
  on achievements for select using (
    status = 'approved'
    or auth.uid() = created_by
    or exists (select 1 from profiles where id = auth.uid() and is_admin)
  );
create policy "achievements: propose"
  on achievements for insert
  with check (auth.uid() = created_by and status = 'pending');
create policy "achievements: admin updates"
  on achievements for update
  using (exists (select 1 from profiles where id = auth.uid() and is_admin));

-- unlocks
create policy "unlocks: read all"
  on unlocks for select using (true);
create policy "unlocks: own insert"
  on unlocks for insert with check (auth.uid() = user_id);
create policy "unlocks: own delete"
  on unlocks for delete using (auth.uid() = user_id);

-- stories
create policy "stories: read visible"
  on stories for select using (
    is_hidden = false
    or auth.uid() = user_id
    or exists (select 1 from profiles where id = auth.uid() and is_admin)
  );
create policy "stories: own insert"
  on stories for insert with check (auth.uid() = user_id);
create policy "stories: own update"
  on stories for update using (auth.uid() = user_id);
create policy "stories: admin can hide"
  on stories for update
  using (exists (select 1 from profiles where id = auth.uid() and is_admin));

-- replies
create policy "replies: read visible"
  on replies for select using (
    is_hidden = false
    or auth.uid() = user_id
    or exists (select 1 from profiles where id = auth.uid() and is_admin)
  );
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
  using (exists (select 1 from profiles where id = auth.uid() and is_admin));
create policy "reports: admin update"
  on reports for update
  using (exists (select 1 from profiles where id = auth.uid() and is_admin));

-- events: server-only writes, no public access
create policy "events: no public access"
  on events for select using (false);
