-- Drop the achievements.description column. The product no longer uses it
-- — the title alone is the unit, and proposers/admin found the extra field
-- noise more than signal. Stories live on `unlocks` (per-user attached
-- narrative), so context already has a home.
--
-- Safe to run after any seed batch — Postgres rewrites the table in place.

alter table achievements drop column if exists description;
