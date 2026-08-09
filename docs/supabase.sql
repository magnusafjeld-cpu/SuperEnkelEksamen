-- =============================================================================
-- Læringsplattform · Supabase-skjema
-- Kjør denne i Supabase → SQL Editor → New query → Run.
-- Trygg å kjøre flere ganger.
-- =============================================================================

-- Én rad per bruker per fag. Hele fremdriften ligger som JSON i "state",
-- slik at nye felter i appen ikke krever databasemigrering.
create table if not exists public.progress (
  user_id    uuid        not null references auth.users (id) on delete cascade,
  subject_id text        not null,
  state      jsonb       not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, subject_id)
);

-- Row Level Security: hver bruker ser og skriver kun sine egne rader.
-- Dette er det som gjør at anon-nøkkelen trygt kan ligge offentlig i repoet.
alter table public.progress enable row level security;

drop policy if exists "les egen fremdrift"      on public.progress;
drop policy if exists "lag egen fremdrift"      on public.progress;
drop policy if exists "endre egen fremdrift"    on public.progress;
drop policy if exists "slett egen fremdrift"    on public.progress;

create policy "les egen fremdrift"   on public.progress for select
  using (auth.uid() = user_id);
create policy "lag egen fremdrift"   on public.progress for insert
  with check (auth.uid() = user_id);
create policy "endre egen fremdrift" on public.progress for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "slett egen fremdrift" on public.progress for delete
  using (auth.uid() = user_id);

-- Databasen stempler updated_at selv, så en klient med feil klokke ikke kan
-- forgifte synkingen ved å påstå at den er nyere enn den er.
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

drop trigger if exists progress_touch on public.progress;
create trigger progress_touch before update on public.progress
  for each row execute function public.touch_updated_at();
