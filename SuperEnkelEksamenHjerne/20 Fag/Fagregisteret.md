---
tags: [fag, arkitektur]
oppdatert: 2026-08-19
---

# Fagregisteret

`js/subjects.js` er hele koblingen mellom motor og innhold. Motoren leser alt
fagspesifikt herfra.

## Plattformen

```js
window.EDU_PLATFORM = {
  name: "Super Enkel Eksamen",
  short: "SEE", logo: "SEE",
  tagline: "Eksamenstrening som faktisk sitter",
  accent: "#2f6bff",
};
```

Navnet, logoen og undertittelen på **plattformen** settes kun her — det er dette
fag-velgeren og sidetittelen viser når intet fag er valgt.

## Ett objekt per fag

| Felt | Betydning |
|---|---|
| `id` | nøkkel i URL (`?fag=sam3`) og i alle lagringsnøkler — **endres aldri i ettertid**, da mistes fremdriften |
| `name` / `short` | fullt navn (velgeren) / kort navn (sidepanelet) |
| `tagline` | undertekst i sidepanelet |
| `logo` | 1–3 tegn i logoflisen og faviconet |
| `blurb` | én setning i velgeren |
| `accent`, `accentInk`, `accentSoft`, `accentSoft2` | settes som CSS-variabler ved oppstart |
| `scripts` | datafiler som lastes når faget velges, **i rekkefølge** |
| `manual` | `{ candidates: [stier prøvd i tur], label, hint }` — pensumkilden |
| `problems` | `{ candidates: [...] }` — oppgavebanken; tom = modulen står tom |
| `modules` | hvilke moduler faget har. `null` = alle. Dashboard er alltid med |

Gyldige moduler: `/plan` `/curriculum` `/lyn` `/quiz` `/flashcards` `/dybde`
`/oppgaver` `/exam` `/sett` `/review` `/search` `/progress`

`/sett` er et unntak: med `modules: null` vises den bare hvis faget faktisk har
`EDU_DATA.sets`. Uten data ville den vært en tom side.

## Feltene som gjør motoren fagnøytral

Disse ble lagt til 19. august 2026 da FIE402 kom inn. **Alle har SAM3s gamle
oppførsel som default**, så et manifest uten dem er uendret.

| Felt | Erstatter | Uten feltet |
|---|---|---|
| `parts` | den hardkodede delinndelingen i parseren | SAM3s fem deler |
| `coreChapters` `{from,to}` | kapittelspennet i fremdriftsmålingen | 1–23 |
| `reviewChapters` `{from,to}` | spennet repetisjonsmotoren foreslår fra | `coreChapters`, ellers 1–22 |
| `dybdeBanks` `[{key,label,sub,tip}]` | de hardkodede bankene i dybdetrening | SAM3s tre banker |
| `manual.refSections` `{formulas,patterns,coverage}` | de hardkodede id-ene `#k22`/`#k21`/`#k23` | k22 / k21 / k23 |
| `problems.topicRules` / `.typeRules` | de norske regexene i oppgaveparseren | SAM3s regler |
| `copy` `{planEyebrow,planIntro,dybdeIntro}` | faste SAM3-setninger i sidetoppene | SAM3s tekst |

> [!warning] `parts` og cachen
> Delinndelingen skrives inn i den bufrede pensumparsingen. Endrer du `parts` i
> manifestet, må «Last innhold på nytt» kjøres før det slår gjennom.

`candidates` prøves i tur til én svarer med noe som ser riktig ut. Det er derfor
appen fungerer både fra rot, fra `fag/<id>/`-mappa og fra mappa over.

## Hvordan faget velges

`js/picker.js`:

1. `?fag=<id>` i URL-en
2. ellers `localStorage["edu.subject"]`
3. ellers → vis velgeren

Fagbytte skjer alltid ved full sidelasting — se [[Beslutningslogg]]. Velgeren er
alltid tilgjengelig via **«Alle fag»** nederst i sidepanelet, eller fra
Konto-siden på mobil.

Se [[Legge til nytt fag]] og [[SAM3 Makroøkonomi]].
