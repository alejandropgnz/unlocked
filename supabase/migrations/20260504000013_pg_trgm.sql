-- Trigram fuzzy-search on achievement titles, used to catch near-duplicate
-- user proposals server-side without pulling the whole catalog into the
-- client. With ~2k entries today it's cosmetic; at 10k+ it's the difference
-- between a snappy submit and a 700KB title list every keystroke.
--
-- After this runs:
--   SELECT * FROM find_similar_achievement('Me dormí en el avion', 0.6);
-- returns the top-5 already-approved/pending titles that are >= 60% similar.

create extension if not exists pg_trgm;

-- GIN index makes the % operator (and similarity-ordered queries) fast.
create index if not exists achievements_title_trgm_idx
  on achievements using gin (title gin_trgm_ops);

-- RPC the client calls before inserting a proposal. Returns up to 5 matches
-- with similarity score; the client decides what to do with them.
--
-- security definer + pinned search_path so it can read pending rows even if
-- the caller's RLS policy doesn't expose pending to non-admins.
create or replace function find_similar_achievement(
  query_title text,
  min_similarity float default 0.6
)
returns table (id uuid, slug text, title text, sim float)
language sql
stable
security definer
set search_path = public
as $$
  select
    a.id,
    a.slug,
    a.title,
    similarity(a.title, query_title) as sim
  from achievements a
  where a.status in ('approved', 'pending')
    and similarity(a.title, query_title) >= min_similarity
  order by sim desc
  limit 5;
$$;

grant execute on function find_similar_achievement(text, float) to authenticated;
grant execute on function find_similar_achievement(text, float) to anon;
