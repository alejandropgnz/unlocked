-- Enforce: a user cannot have more than 3 pending proposals in the last 24 hours.
-- Client-side validation can be bypassed; DB trigger is authoritative.
-- Sentinel error code distinguishes this from generic insert errors.

create or replace function public.enforce_propose_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  pending_count integer;
begin
  -- Only check user-proposed achievements (status='pending'). Seeded approved
  -- achievements bypass since created_by IS NULL.
  if new.created_by is null or new.status <> 'pending' then
    return new;
  end if;

  -- Early-termination using LIMIT — count up to 4 rows max.
  select count(*) into pending_count
  from (
    select 1 from achievements
    where created_by = new.created_by
      and status = 'pending'
      and created_at >= now() - interval '24 hours'
    limit 4
  ) t;

  if pending_count >= 3 then
    raise exception 'PROPOSE_RATE_LIMIT_EXCEEDED'
      using errcode = 'check_violation';
  end if;

  return new;
end;
$$;

drop trigger if exists propose_rate_limit_trigger on achievements;
create trigger propose_rate_limit_trigger
  before insert on achievements
  for each row execute function public.enforce_propose_rate_limit();

-- Index supporting the rate-limit query above (created_by, created_at desc, status).
-- Partial index where status = 'pending' (the only rows we count).
create index if not exists achievements_proposer_pending_recent_idx
  on achievements (created_by, created_at desc)
  where status = 'pending';
