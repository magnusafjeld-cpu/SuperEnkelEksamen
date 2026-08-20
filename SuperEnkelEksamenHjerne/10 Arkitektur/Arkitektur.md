---
tags: [arkitektur, kode]
oppdatert: 2026-08-19
---

# Arkitektur

## Filkart

```
index.html                 skall: hele CSS-designsystemet inline + script-taggene
js/
  subjects.js              FAGREGISTERET + plattformnavn (EDU_PLATFORM)
  config.js                Supabase-nøkler (tomme felt = kun lokal lagring)
  bundle-core.js           utils, pensumparser, oppgaveparser, store, srs,
                           søk, repetisjonsmotor, metrics, ruter
  bundle-views.js          alle visninger (dashboard, plan, pensum, kapittel,
                           quiz, flashcards, eksamen, repetisjon, søk, fremdrift)
  bundle-lyn.js            lynlæring: 13 minispill + XP/nivå/streak
  bundle-dybde.js          dybdetrening: de tre spørsmålsbankene
  account.js               Supabase-innlogging + synk (mergeState bor her)
  picker.js                fag-velger, tema, byggnummer, dynamisk lasting av fagdata
  boot.js                  app-skall, navigasjon, ruting, innholdslaster
fag/<id>/                  fagets innhold: data.js, lyn.js, dybde.js
tools/serve.py             liten lokal server
docs/                      supabase.sql + oppsettsoppskrift
```

## Globale navn

Alt henger på fire globale objekter — det er hele "modulsystemet":

| Global | Eier | Innhold |
|---|---|---|
| `window.EDU` | motoren | `u` (utils), `data`, `store`, `srs`, `search`, `repetition`, `metrics`, `router`, `views`, `picker`, `account`, `app`, `hasModule` |
| `window.EDU_DATA` | faget | `plan`, `quizzes`, `flashcards`, `activeLearning`, `exams`, `glossary`, `lyn`, `dybde` + parset `curriculum`, `reference`, `problems` |
| `window.EDU_SUBJECTS` / `EDU_PLATFORM` / `EDU_SUBJECT` | registeret | se [[Fagregisteret]] |
| `window.EDU_CONFIG` | oppsett | Supabase-URL og anon-nøkkel |

Hver fil er én eller flere IIFE-er på formen `(function (S) { … })(window.EDU)`
som henger sine egne funksjoner på `S`. Ingen `import`, ingen `export`.

> [!warning] Den viktigste enkeltregelen i motoren
> **Fagets datafiler lastes dynamisk *etter* at motoren er lastet.** Derfor kan
> ingenting i `js/` snapshotte `EDU_DATA` når filen evalueres. `S.data` bruker
> gettere (`get plan()`, `get exams()`, `get glossary()`) nettopp av denne
> grunnen. Skriver du `const plan = EDU_DATA.plan` på toppnivå i en motorfil, får
> du `undefined` — og feilen dukker ikke opp før faget er valgt.

## Lastrekkefølge

`index.html` laster i denne rekkefølgen, alle med `?v=N` (se
[[Publisering og cache]]):

`subjects.js` → `config.js` → `bundle-core` → `bundle-views` → `bundle-lyn` →
`bundle-dybde` → `account` → `picker` → `boot`

`boot.js` kjører til slutt og starter alt.

## Oppstartsflyt

Hele flyten ligger i den andre IIFE-en i `js/boot.js`:

1. `picker.resolve()` — finner faget fra `?fag=<id>`, ellers fra
   `localStorage["edu.subject"]`. Finner den ingen: **vis fag-velgeren og stopp**.
2. `picker.applyTheme(sub)` — aksentfarger som CSS-variabler, sidetittel, favicon
   (generert som inline SVG av fagets logo-tegn).
3. `store.open(sub.id)` — bytter lagringsnøkkel til `edu.<id>.progress.v1`.
4. `picker.loadScripts(sub.scripts)` — laster fagets datafiler i rekkefølge,
   sekvensielt (`async = false`), med byggnummeret påhengt.
5. Pensum: prøv cache (`edu.<id>.manual.v1`) → ellers `fetch` på hver kandidat i
   `sub.manual.candidates` → ellers vis filvelgeren med drag-and-drop.
6. `bootData(curriculum, reference)` → `loadProblems()` (samme cache/fetch-mønster).
7. `account.start()` — valgfritt; feiler den, logges det og appen går videre.
8. Skjul splash → `app.init()`: bygg skall, registrer ruter, start ruteren.

## Ruting

Egen hash-ruter nederst i `bundle-core.js`. Mønstre med `:param`, spørrestreng
etter `?` i hashen. `boot.js` registrerer bare rutene faget faktisk har —
`hasModule(match)` sjekker mot `modules`-feltet i fagmanifestet, og visningene
bruker den samme funksjonen så de ikke lenker til avslåtte moduler.

Rutene: `/`, `/plan`, `/day/:n`, `/curriculum`, `/chapter/:num`, `/quiz`,
`/flashcards`, `/dybde`, `/lyn`, `/oppgaver`, `/exam`, `/review`, `/search`,
`/progress`, `/konto`. Ukjent rute → dashboard.

## Rendering

Ingen virtuell DOM. `S.u.el(spec, attrs, ...children)` bygger noder med en
CSS-aktig spec (`"button.btn.primary"`), og `S.u.mount(node, …)` bytter innhold.
Hele den aktive visningen tegnes på nytt ved endring: `app.refresh()` kaller
gjeldende visnings-thunk om igjen og gjenoppretter scrollposisjonen.
`store.subscribe()` med 150 ms debounce holder navigasjonens merker oppdatert.

Se [[Datamodell og lagring]], [[Pensumparseren]], [[Moduler og visninger]].
