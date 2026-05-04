create policy "events: anyone can insert"
  on events for insert
  with check (true);
