---
tags: [arkitektur, moduler, pedagogikk]
oppdatert: 2026-08-19
---

# Moduler og visninger

15 moduler + Konto. Faget kan slå av hvilke som helst via `modules` i
[[Fagregisteret]]; Dashboard er alltid med.

| Modul | Rute | Hva den gjør |
|---|---|---|
| Dashboard | `/` | Dagens økt, prosent klar, fremdriftslinjer, neste milepæl, dagens konsepter |
| Studieplan | `/plan`, `/day/:n` | Dagene bygget pedagogisk: rammeverk → måling → vekst → kort sikt → repetisjon |
| Pensum | `/curriculum`, `/chapter/:num` | Kapitlene som rene artikler; marker *lest* / *forstått* / *usikker* |
| Lynlæring | `/lyn` | 13 minispill for mobil, 2–5 min |
| Quiz | `/quiz` | Trekker fra hele pensum, blander gammelt og nytt |
| Flashcards | `/flashcards` | Spaced repetition |
| Dybdetrening | `/dybde` | Selvrettede spørsmålsbanker |
| Oppgavebank | `/oppgaver` | Alle oppgaver med fasit, søk- og filtrerbare |
| Eksamenstrening | `/exam` | Tidligere eksamensoppgaver koblet til temaer og repetisjon |
| Eksamenssett | `/sett` | Hele sett, i øvingsmodus eller på tid — se [[Eksamenssett-modulen]] |
| Repetisjon | `/review` | Hva du bør repetere nå |
| Søk | `/search` | På tvers av begreper, formler, figurer, økonomer, variabler |
| Fremdrift | `/progress` | Statistikk, svakeste temaer, nullstilling, «last innhold på nytt» |
| Konto | `/konto` | Innlogging og synkstatus |

Sidepanelet grupperer dem som *Studieløp* / *Øving* / *Verktøy*. Mobilnavigasjonen
nederst viser seks: Hjem, Lyn, Plan, Quiz, Kort, Dybde. Konto-knappen ligger i
topplinja — på mobil er sidepanelet skjult, og da ville Konto vært uten inngang.

**Merker** i navigasjonen: antall forfalte flashcards, «må øve»-tellingen fra
dybdetrening, antall høyprioriterte repetisjonsforslag, og ⚡ hvis dagens lynøkt
ikke er tatt.

## De fire læringsmotorene

### Spaced repetition (`S.srs`)
Leitner-bokser med intervallene **0, 1, 3, 7, 16, 35 dager**. Karakterene er
`again` (tilbake til boks 0, teller et lapse), `hard` (samme boks, halvt
intervall), `good` (+1 boks), `easy` (+2 bokser). Boks ≥ 4 regnes som *mestret*.
Bunken består av fagets flashcards **pluss** ett kort per rad i formeltabellene
fra [[Pensumparseren]].

### Repetisjonsmotoren (`S.repetition`)
Poengsetter hvert kapittel og sorterer:

| Signal | Poeng |
|---|---|
| Markert som usikker | +55 |
| Dager siden sist sett (≥ 2) | +4 per dag, maks +32 |
| Ikke lest ennå | +8 |
| Sentralt eksamenstema | +9 per gang det er brukt i en tidligere eksamensoppgave (+6 hvis bare én) |
| Svak quizscore (< 70 %) | opptil +30 |
| Kapittel 13–19 | +6 — «Oppgave 3, historisk svakest» |

Prioritet: **høy** ≥ 55, **middels** ≥ 28, ellers lav. Hvert poeng kommer med en
begrunnelse som vises i grensesnittet — motoren forklarer alltid seg selv.

> Kapittel 13–19-regelen er SAM3-spesifikk og ligger i motoren. Se [[Fallgruver]].

### Fremdriftsmålet (`S.metrics.readiness`)
Vektet **dekning**, ikke treffprosent:

- 45 % kapitler lest
- 25 % dager fullført
- 18 % andel mestrede flashcards
- 12 % quizdekning (*riktige svar / totalt antall spørsmål* — ikke treffprosent)

Dette var en bevisst fiks: se [[Beslutningslogg]]. `streak()` teller
sammenhengende dager bakover der enten en dag ble fullført eller et kapittel sett.

### Søkeindeksen (`S.search`)
Bygges én gang og cachet. Indekserer kapitler (vekt 3), formler (2,2), begreper
(2), økonomer (2), variabler (1,8), seksjoner (1,5) og figurtekster (1,4).
Poeng gis for eksakt titteltreff, prefiks, delstreng og treff i brødteksten;
maks 40 treff.

## Lynlæring

`bundle-lyn.js`. 13 spill, hvert med en `ready()`-test mot fagets data — spill
uten nok innhold vises ikke i det hele tatt:

Lynquiz · Sant eller usant · Formel-lyn · Par-sprint · Skift eller glid? ·
Kjede · Hoderegning · Opp eller ned? · Forklar! · En skiller seg ut · Memory ·
Hvem er økonomen? · Dagens bit

Dagens økt er 3 spill (~4 min) og gir **+25 bonus-XP**. Nivåene:
Fersking (0) → Student (120) → Gruppelærer (320) → Seminarleder (650) →
Foreleser (1100) → Sensor (1700) → Nobelkandidat (2600).

## Lynlæringens fremdriftsport

Uten port henter minispillene fra hele pensum fra dag én, så du kan få M&A-spørsmål
i modul 3. Fag som setter **`lynFollowsProgress: true`** i manifestet får i stedet
bare kapitler de har nådd:

> alt i modulene til og med den du står i, **pluss** alt du selv har huket av som lest

Alle pooler går gjennom den samme porten: sant/usant, skift, kjeder, opp/ned,
hoderegning, lynquiz, «Forklar!», «Dagens bit», og ordlisten (symboler og økonomer
filtreres på `chapters`-feltet sitt). Elementer uten kapittelmerking slipper gjennom.

**Formeltabellene er et unntak som måtte løses særskilt.** De bærer ingen
kapittelmerking i seg selv, så manifestet oppgir den med
`formulaTableChapters` — én liste per tabell, i samme rekkefølge som de står i
manualen. Uten kartet slipper alle formler gjennom, som før. Merk at rekkefølgen
allerede er bundet av at flashcard-id-ene er posisjonsbaserte: endres den ene, må
den andre følge med. Se [[Fallgruver]].

Et spill som ikke har nok åpnet innhold faller ut av rutenettet med teksten
«Åpnes når du har lest mer», og en boks over rutenettet sier hvor mange kapitler
som er låst opp og hvor mange spill som gjenstår. Det skiller «faget mangler dette
innholdet» fra «du har ikke kommet dit ennå».

For [[FIE402 Corporate Finance]] betyr det 3 spill i modul 1 og alle 13 fra modul 6.
[[SAM3 Makroøkonomi]] har ikke flagget og er uendret.

## Dybdetrening

`bundle-dybde.js`. Tre banker, filtrerbare på nivå og tema, med
«kunne / må øve»-vurdering som lagres per bank og mater «må øve»-merket i
navigasjonen. Se [[SAM3 Makroøkonomi]] for bankene som finnes.
