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

-- =============================================================================
-- Private fag (lagt til 16. oktober 2026, js/privat.js)
-- En privat bøtte der hver bruker bare kan lese og skrive i sin egen mappe,
-- privat/<bruker-id>/. Fagene som ligger der, vises bare for den brukeren.
-- Trygg å kjøre flere ganger.
-- =============================================================================

insert into storage.buckets (id, name, public)
values ('privat', 'privat', false)
on conflict (id) do update set public = false;

drop policy if exists "les egne private fag"   on storage.objects;
drop policy if exists "lag egne private fag"   on storage.objects;
drop policy if exists "endre egne private fag" on storage.objects;
drop policy if exists "slett egne private fag" on storage.objects;

-- Første mappenivå i stien må være brukerens egen id.
create policy "les egne private fag" on storage.objects for select to authenticated
  using (bucket_id = 'privat' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "lag egne private fag" on storage.objects for insert to authenticated
  with check (bucket_id = 'privat' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "endre egne private fag" on storage.objects for update to authenticated
  using (bucket_id = 'privat' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'privat' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "slett egne private fag" on storage.objects for delete to authenticated
  using (bucket_id = 'privat' and (storage.foldername(name))[1] = auth.uid()::text);
