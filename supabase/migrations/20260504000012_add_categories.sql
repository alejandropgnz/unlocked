-- Add `amigos` and `relaciones` to the achievement_category enum so the v3
-- seed can categorize them properly. Postgres requires ADD VALUE outside a
-- transaction in some versions; if your editor wraps everything in BEGIN..END
-- run these two statements separately.

alter type achievement_category add value if not exists 'amigos';
alter type achievement_category add value if not exists 'relaciones';
