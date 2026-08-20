---
tags: [fag, oppskrift]
oppdatert: 2026-08-19
---

# Legge til nytt fag

Fire steg. Malen i `fag/_mal/data.js` forklarer hvert felt.

## 1. Kopier malen

```bash
cp -r fag/_mal fag/<ditt-fag>
```

## 2. Skriv pensumfilen

Én HTML-fil med samme struktur som `SAM3_Eksamensmanual.html`. Kravene står i
[[Pensumparseren]] — kort: `section` med id `k0`, `k1`, … , `h2.chap` som
kapitteltittel, `h3` med `N.M Tittel` som seksjoner, og boksene `.callout.tip`,
`.callout.mistake`, `.callout.mech`, `.callout.link`.

Ta med et kapittel med formeltabeller (`table.data` under `h3` merket `22.N` i
`#k22`) hvis du vil ha formel-flashcards og formelspillene. De bygges automatisk
derfra.

## 3. Fyll `fag/<ditt-fag>/data.js`

Alt bortsett fra `plan` er valgfritt:

| Felt | Form |
|---|---|
| `plan` | `{ startDate, totalDays, examNote, days: [...] }` — hver dag har `day`, `date`, `weekday`, `phase`, `title`, `chapters`, `estMinutes`, `goals`, `keyConcepts`, `review`, `examFocus`, `pastExam`, `milestone`, `tip` |
| `quizzes` | `{ id, ch, oppg, type: "mcq"\|"num", q, options, answer, why }` |
| `flashcards` | `{ id, ch, deck, front, back }` |
| `activeLearning` | `{ <kapittelnr>: [{ type: "control"\|"calc"\|"reflect"\|"explain", q, solution }] }` |
| `exams` | `{ format, tasks: [...] }` — hver oppgave med `chapters`, `recommendDay`, `reviewIfWrong`, `tests` |
| `glossary` | `{ economists: [{name, note, chapters}], symbols: [{sym, name}] }` |
| `lyn` | `{ tf, shift, chains, updown }` (egen fil: `lyn.js`) |
| `dybde` | `{ <bank>: { cats, lvl, items: [{n, k, s, f, id}] } }` (egen fil: `dybde.js`) |

`startDate` styrer hvilken dag appen mener det er i dag — `activeDayIndex()`
regner dager siden startdato og klamper til `totalDays`.

## 4. Registrer faget

Legg til ett objekt i `window.EDU_SUBJECTS` i `js/subjects.js`. Feltene står i
[[Fagregisteret]]. Velgeren plukker det opp automatisk.

Moduler du ikke fyller ut data for, slår du av med `modules`-feltet — da
forsvinner de fra menyen i stedet for å stå tomme.

## Til slutt

**Bump byggnummeret** i `index.html`. Se [[Publisering og cache]].

> [!warning] Rydd fagnøytraliteten først
> Motoren har fortsatt SAM3-spesifikke antakelser (dele-inndelingen, kapittel
> 13–19-bonusen, kapittelspennet 1–23). Fag nr. 2 vil avsløre dem. Se
> [[Fallgruver]].
