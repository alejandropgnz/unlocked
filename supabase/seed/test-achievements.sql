-- Test seed for Milestone 2: 8 curated achievements
-- Apply this manually in Supabase Dashboard → SQL Editor.
-- It is idempotent: safe to re-run (uses ON CONFLICT DO NOTHING).

insert into achievements (slug, title, emoji, description, category, status) values
  ('mi-padre-tabaco', 'Mi padre se fue a por tabaco y no volvió', '🚬', 'Un clásico atemporal del trauma español.', 'familia', 'approved'),
  ('finde-sin-dormir', '1 finde sin dormir', '😴', 'De jueves a domingo. Sin pegar ojo.', 'resaca', 'approved'),
  ('he-visto-ballena', 'He visto una ballena', '🐳', 'En vivo y en directo.', 'viajes', 'approved'),
  ('cuernos-2', 'Me han puesto los cuernos +2 veces', '💔', 'No es mala suerte. Eres tú.', 'amor', 'approved'),
  ('me-cai-cabeza', 'Me caí y me rompí la cabeza', '🤕', 'Literalmente.', 'salud', 'approved'),
  ('beber-11am', 'Empezar a beber a las 11 AM', '🍻', 'En domingo. En el aeropuerto.', 'random', 'approved'),
  ('cague-encima', 'Me cagué encima en una boda', '😬', 'No fue diarrea. Fue destino.', 'verguenza', 'approved'),
  ('escarabajo-crudo', 'Me he comido un escarabajo crudo', '🪲', 'Y no estabas en la jungla.', 'random', 'approved')
on conflict (slug) do nothing;

-- Fake unlock_count for variety in rarity tiers (the trigger maintains real counts later)
update achievements set unlock_count = 12500 where slug = 'finde-sin-dormir';
update achievements set unlock_count = 5400  where slug = 'me-cai-cabeza';
update achievements set unlock_count = 2341 where slug = 'mi-padre-tabaco';
update achievements set unlock_count = 800  where slug = 'cuernos-2';
update achievements set unlock_count = 412  where slug = 'beber-11am';
update achievements set unlock_count = 87   where slug = 'cague-encima';
update achievements set unlock_count = 23   where slug = 'he-visto-ballena';
update achievements set unlock_count = 4    where slug = 'escarabajo-crudo';
