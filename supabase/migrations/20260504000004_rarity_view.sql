create or replace view achievement_rarity as
select
  a.id,
  a.slug,
  a.unlock_count,
  (select count(*) from profiles)::numeric as total_users,
  case
    when (select count(*) from profiles) = 0 then 0::numeric
    else round(a.unlock_count::numeric / (select count(*) from profiles)::numeric * 100, 4)
  end as rarity_percent
from achievements a
where a.status = 'approved';

grant select on achievement_rarity to anon, authenticated;
