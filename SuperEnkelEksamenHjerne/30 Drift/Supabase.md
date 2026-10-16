---
tags: [drift, supabase, synk]
oppdatert: 2026-10-16
---

# Supabase

Valgfritt lag over lagringen. Med tomme felt i `js/config.js` oppfører appen seg
nøyaktig som før — all fremdrift lokalt. Full oppskrift ligger i
`docs/supabase-oppsett.md`.

## Prosjektet

| | |
|---|---|
| Project ref | `xjmjoolrbgfqrcovznru` |
| URL | `https://xjmjoolrbgfqrcovznru.supabase.co` |
| Nøkkel i repoet | den publiserbare `anon`-nøkkelen, i `js/config.js` |
| SDK | `@supabase/supabase-js@2` fra jsDelivr, lastes **først når** konto brukes |

> [!info] Anon-nøkkelen skal ligge åpent
> Den er laget for frontend-kode og gir ingen tilgang alene. Row Level Security
> er det som avgjør hva den som holder nøkkelen får se.
> **`service_role`-nøkkelen må aldri inn i repoet** — den omgår RLS fullstendig.

## Skjemaet

`docs/supabase.sql`, trygt å kjøre flere ganger:

```sql
create table public.progress (
  user_id    uuid not null references auth.users (id) on delete cascade,
  subject_id text not null,
  state      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, subject_id)
);
```

Én rad per bruker per fag. **Hele fremdriften ligger som JSON i `state`**, slik at
nye felter i appen aldri krever databasemigrering.

Fire RLS-policyer (les/lag/endre/slett) med `auth.uid() = user_id`, pluss en
`before update`-trigger som stempler `updated_at` — så en klient med feil klokke
ikke kan forgifte synkingen ved å påstå at den er nyere enn den er.

## Auth-oppsettet

- **E-post + passord**, PKCE-flyt, `persistSession` og `autoRefreshToken` på.
- **«Confirm email» anbefales AV.** Supabase sin innebygde e-postsender har svært
  lav kvote, og for en personlig app med én bruker er bekreftelse bare i veien.
  Glemt-passord sender fortsatt e-post — det går fint, siden det skjer sjelden.
- **URL Configuration** må inneholde både Pages-adressen og
  `http://127.0.0.1:4178/**`, ellers virker ikke lenken i
  glemt-passord-e-posten.

> [!bug] Står feil nå
> Site URL og Redirect URLs peker fortsatt på `.../SAM3/` etter navnebyttet.
> Se [[Åpne spørsmål og neste steg]].

## Synkoppførselen

Detaljene i [[Datamodell og lagring]]. Kort:

- **Lokalt først** — alt skrives til `localStorage` med én gang og sendes til
  Supabase 1,5 sekunder senere. Mister du nett, fortsetter appen som normalt.
- **Sammenslåing, ikke overskriving** — `mergeState()` slår lokal og fjern stat
  sammen før noe skrives tilbake.
- **Ved reell konflikt vinner nyeste**, per element der elementet har eget
  tidsstempel. Tellere som bare går oppover, tar maksverdien.
- **Ett fag om gangen** — hvert fag har sin egen rad.

## Feilmeldinger

`account.js` oversetter Supabase-feil til norsk. De nyttigste:

| Melding i appen | Årsak |
|---|---|
| «Tabellen progress finnes ikke ennå» | `docs/supabase.sql` er ikke kjørt |
| «E-posten er ikke bekreftet ennå» | «Confirm email» står på |
| «Synk stoppet» i sidepanelet | åpne Konto-siden — detaljen står der |

## Private fag (16. oktober 2026)

Bøtta `privat` i Storage, med fire tilgangsregler på `storage.objects`: den
innloggede brukeren kan lese, lage, endre og slette bare der første mappenivå er
brukerens egen id (`(storage.foldername(name))[1] = auth.uid()::text`). SQL-en står
nederst i `docs/supabase.sql`.

- `privat/<bruker-id>/fag.json`: listen over de private fagene, samme felter som i
  `js/subjects.js`, med stier relative til fagets mappe og en `versjon`.
- `privat/<bruker-id>/<fag-id>/…`: fagets filer.

`js/privat.js` laster listen ved oppstart (bare når det finnes en lagret økt) og
når du logger inn, gjør stiene om til signerte adresser som varer i seks timer, og
legger fagene inn i registeret med `privat: true`. Velgeren viser dem i en egen
sammenfoldet liste, «Private fag (N)», under de vanlige fagene. Listen er lukket hver
gang velgeren åpnes, så de ikke synes med mindre du åpner den. Konto viser «Private
fag: N» eller hvorfor ingen ble funnet, med en knapp for å hente på nytt.
Et privat fag må hete `privat-<navn>` og kan aldri ta id-en til et offentlig fag.
På localhost leses fagene også rett fra `fag/<id>/` via `fag/privat-indeks.json`.

**Biblioteket:** `js/account.js` henter supabase-js 2.117.2 fra jsDelivr med
SRI-hash. Bytter du versjon, velg en som er minst to uker gammel og hent hashen fra
`https://data.jsdelivr.com/v1/packages/npm/@supabase/supabase-js@<versjon>?structure=flat`.
