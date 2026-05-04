-- Fix 1: reports.reporter_id should be nullable + ON DELETE SET NULL
-- Drop the existing FK constraint, drop the NOT NULL, recreate with ON DELETE SET NULL.
alter table reports drop constraint reports_reporter_id_fkey;
alter table reports alter column reporter_id drop not null;
alter table reports
  add constraint reports_reporter_id_fkey
  foreign key (reporter_id) references profiles(id) on delete set null;

-- Fix 2: admin can delete achievements
create policy "achievements: admin delete"
  on achievements for delete
  using (exists (select 1 from profiles where id = auth.uid() and is_admin));

-- Fix 3: owner can delete their own story
create policy "stories: own delete"
  on stories for delete
  using (auth.uid() = user_id);

-- Fix 4: owner can delete their own reply
create policy "replies: own delete"
  on replies for delete
  using (auth.uid() = user_id);

-- Fix 5: admin can update replies (mirror of stories: admin can hide)
create policy "replies: admin can hide"
  on replies for update
  using (exists (select 1 from profiles where id = auth.uid() and is_admin));
