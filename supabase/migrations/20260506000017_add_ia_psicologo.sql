-- =================================================================
-- Add the "Usé la IA de psicólogo" achievement to the catalog.
--
-- Featured in the pre-launch landing's Stories card (slide 4 of the
-- swipe deck) — when the real product launches and a user clicks
-- through from the landing copy, this achievement must already exist
-- so they can unlock it.
--
-- Categoría salud (mental health): closest fit for "therapy via AI".
-- Idempotent via ON CONFLICT (slug) DO NOTHING.
-- =================================================================

insert into achievements (slug, title, emoji, category, status) values
  ('use-la-ia-de-psicologo', 'Usé la IA de psicólogo', '🤖', 'salud', 'approved')
on conflict (slug) do nothing;
