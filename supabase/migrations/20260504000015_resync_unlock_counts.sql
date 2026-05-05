-- Resync achievements.unlock_count with the actual rows in `unlocks`.
--
-- The bump_unlock_count trigger (_003) fires on INSERT/DELETE so the
-- denormalized counter stays right going forward. But if you run _009
-- (which zeroed all counts) AFTER some unlocks already existed — or the
-- trigger was disabled at any point — the counter drifts.
--
-- This update walks every achievement and recomputes from the source of
-- truth. Idempotent: re-running gives the same result.

update achievements a
set unlock_count = coalesce((
  select count(*) from unlocks u where u.achievement_id = a.id
), 0);
