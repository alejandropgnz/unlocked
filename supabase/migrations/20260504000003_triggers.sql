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
  if char_length(base_username) < 3 then
    base_username := base_username || '_user';
  end if;
  candidate := base_username;
  while exists (select 1 from profiles where username = candidate) loop
    i := i + 1;
    candidate := base_username || '_' || i;
  end loop;
  insert into profiles (id, username, display_name, avatar_url)
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
    where target_type = new.target_type
      and target_id = new.target_id
      and status = 'open';

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
