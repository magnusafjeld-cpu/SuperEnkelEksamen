---
tags: [arkitektur, data, synk]
oppdatert: 2026-08-19
---

# Datamodell og lagring

## localStorage-nøkler

| Nøkkel | Innhold |
|---|---|
| `edu.subject` | sist valgte fag-id |
| `edu.<fagId>.progress.v1` | all fremdrift for faget |
| `edu.<fagId>.manual.v1` | parset pensum (`{curriculum, reference}`) |
| `edu.<fagId>.problems.v1` | parset oppgavebank |
| `sam3.progress.v1`, `sam3.manual.v1`, `sam3.problems.v1` | **arv** fra før fag-velgeren; leses én gang og skrives over til de nye nøklene |

Supabase-sesjonen lagres i tillegg av Supabase-SDK-en selv, under sine egne
`sb-*`-nøkler.

## Fremdriftsstaten

`defaults()` i `bundle-core.js` definerer formen. Alt bor i ett objekt:

```js
{
  version: 1,
  startedAt: "ÅÅÅÅ-MM-DD",   // første gang faget ble åpnet
  savedAt: 0,                // ms-tidsstempel — synken bruker det til å avgjøre nyest
  chapters: {},              // { <num>: { read, understanding, lastSeen } }
  days:     {},              // { <dag>: { completed, completedAt } }
  sections: {},              // { "<kap>.<sek>": true }
  quiz:     { answered: { <qid>: { correct, attempts, lastTs } }, sessions: [] },
  cards:    {},              // { <kortId>: { box, due, reviews, lapses, lastTs } }
  active:   {},              // aktiv læring: fullførte oppgaver
  exams:    {},              // eksamensoppgaver: egen status/notater
  settings: {},
  lyn:      { xp, days: {"ÅÅÅÅ-MM-DD": true}, plays, best: {} },
  dybde:    { banks: { kort: {marks:{}}, lang: {marks:{}}, eksamen: {marks:{}} } }
}
```

`understanding` er `"understood"`, `"unsure"` eller `null`. Å velge samme verdi
to ganger nullstiller den.

`exams` brukes av to moduler samtidig. `/exam` lagrer under oppgavens egen id,
mens [[Eksamenssett-modulen]] bruker `"<settId>-run"` for selve økta og
`"<settId>-e<n>"` for selvvurdering per oppgave. Nøkkelrommet er delt, så
sett-id-er og oppgave-id-er må ikke kollidere.

## To plantyper

`plan.mode` avgjør hva «i dag» betyr:

- **`"dates"`** (default, SAM3): dagen regnes fra `plan.startDate` mot kalenderen,
  og klampes til `totalDays`. Går planen ut på dato, står den fast på siste dag.
- **`"modules"`** (FIE402): «i dag» er **første ufullførte modul**. Ingen datoer
  vises, `day.date` og `day.weekday` er valgfrie, og ordet «dag» byttes til
  «modul» i hele grensesnittet. Planen kan dermed ikke gå ut på dato.

`migrate()` håndterer én historisk formendring: dybdetreningens vurderinger lå
tidligere flatt i `state.dybde.marks` og flyttes inn i `kort`-banken.

## Skriveregler

- Alle mutasjoner går gjennom `S.store.*` og ender i `emit()`, som stempler
  `savedAt`, varsler abonnenter og lagrer med 120 ms debounce.
- `adopt(next)` er unntaket: den brukes av synken når fjernversjonen har vunnet,
  og stempler **ikke** nytt `savedAt` — ellers ville hver innlasting sett ut som
  en endring og utløst en ny skriving.

## Synkmodellen

Detaljene i `js/account.js`. Se også [[Supabase]].

| Hendelse | Hva skjer |
|---|---|
| Innlasting med sesjon | `pull()` → merge → `push()` |
| `SIGNED_IN` | `pull()` |
| Endring i staten | `push()` etter 1,5 sek debounce |
| Fanen skjules | `push()` med én gang |
| Fanen kommer tilbake | `pull()`, men tidligst 20 sek etter forrige |

**`mergeState(a, b)` er hjertet.** Regelen: *fremdrift skal aldri forsvinne fordi
to enheter var i utakt.*

- Grunnlaget er den staten med høyest `savedAt`; den andre fyller inn nøkler den
  vinnende ikke har.
- **Kapitler** slås sammen per kapittel på `lastSeen`. `read` er en ELLER — lest
  er lest.
- **Dager**: fullført er fullført, og tidligste fullføringsdato beholdes.
- **Flashcards**: kortet med nyeste `lastTs` vinner hele SRS-tilstanden, men
  `reviews` og `lapses` tar maksverdien.
- **Quizsvar**: nyeste `lastTs` vinner, `attempts` tar maks.
- **Quizøkter**: union, dedupliseres på `ts`, sorteres nyest først, kappes til 300.
- **Lyn**: `xp` og `plays` tar maks, `days` er en union, `best` tar maks per spill.
- **Dybde**: vurderinger har ingen tidsstempel, så nyeste stat avgjør.

Alt som bare kan gå oppover, tar altså maks. Alt som er en tilstand, avgjøres av
det ferskeste tidsstempelet som finnes for akkurat det elementet.

## Innholdscachen

Parset pensum og oppgavebank ligger i `localStorage` fordi parsingen tar tid.

**Størrelsen er den reelle begrensningen, ikke tiden.** Å parse 156 KB manual tar
~25 ms; den parsede kopien er derimot mange ganger kildefilen. Målt 19. august 2026
lå FIE402s sju seksjoner på 563 KB parset, altså 3,6 ganger kilden. Med et fullt
pensum i to fag ville det nærmet seg Safaris grense på 5 MB per origin.

To felter ble derfor sluttet å lagres, fordi de aldri ble lest:

- `sections[].html` — en full kopi av kapittelteksten, som allerede ligger i
  `chapter.html`. Ingen visning leste den.
- `searchText` utover 1400 tegn — søkeindeksen klipper uansett på 1200
  (`search.build`), så resten var ren ballast. Ordtellingen tas før klippingen.

Det halverte cachen: 563 → 296 KB for de samme sju seksjonene. Merk konsekvensen
for søket, som gjaldt også før endringen: **et kapittelsøk treffer bare de første
1200 tegnene av kapitlet.** Seksjonene indekseres separat med 600 tegn hver, så
dekningen er bedre enn det høres ut som, men den er ikke fullstendig.

Skulle cachen likevel sprenge kvoten, feiler `lsSet` stille i en `try/catch`.
Appen fortsetter da å virke, men parser pensum på nytt ved hver innlasting.
Endrer du manual-HTML-en, må cachen tømmes: knappen **«Last innhold på nytt»**
nederst på Fremdrift-siden kaller `S.clearContentCache()` og laster siden på nytt.
Den fjerner også de gamle `sam3.*`-nøklene.

Se [[Pensumparseren]].
