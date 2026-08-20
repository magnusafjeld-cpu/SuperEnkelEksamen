---
tags: [arbeidsmåte, kode, stil]
oppdatert: 2026-08-19
---

# Kodekonvensjoner

Stilen i dette prosjektet er tydelig og konsekvent. Ny kode skal se ut som den
som allerede er der.

## Språk

**Norsk** i kommentarer, UI-tekst, commit-meldinger og domenebegreper.
Engelsk brukes bare der det er etablert teknisk vokabular (`render`, `store`,
`merge`, `deck`). Feilmeldinger til brukeren oversettes til norsk — se
`human()` i `account.js`.

## Kommentarer forklarer *hvorfor*

Hver fil åpner med en blokkommentar som sier hva filen er og hvilken regel som
gjelder for den. Inline-kommentarer brukes sparsomt, og da til å begrunne et
valg som ellers ser rart ut:

```js
/* Brukes av sky-synken når fjernversjonen har vunnet: bytt hele staten uten å
   stemple nytt savedAt (ellers ville hver innlasting sett ut som en endring). */
```

Det er stilen: en setning som redder neste leser fra å «rydde bort» noe viktig.
Ikke kommenter hva koden gjør når koden allerede sier det.

## Struktur

- Én IIFE per komponent: `(function (S) { … })(window.EDU)`, med en
  `/* ---------------- navn ---------------- */`-overskrift over.
- Eksport skjer ved å henge et objekt på `S` til slutt: `S.srs = { … }`.
- Korte hjelpefunksjoner på én linje er helt greit — koden er tett med vilje.
- Lange linjer er akseptert (fagdata og visningskode), fordi det ikke finnes et
  byggesteg som ville formatert dem uansett.

## UI

- Bygg noder med `S.u.el()`, ikke `innerHTML`, unntatt for statisk markup der
  `S.u.frag()` eller en template-streng er ryddigere.
- All brukertekst gjennom `escapeHtml` når den kommer fra data.
- Bruk CSS-variablene fra [[Designsystem]], aldri løse hex-verdier.
- Sjekk `S.hasModule("/rute")` før du lenker til en modul — faget kan ha slått
  den av.

## Feilhåndtering

Appen skal aldri stoppe helt. Mønsteret gjennomgående er:
prøv, fang, logg, kjør videre med en tom liste eller en vennlig melding.
`try { … } catch (e) {}` rundt all `localStorage`-bruk er bevisst — private
vinduer kaster.

## Commit-meldinger

Norsk, imperativ, én linje, ingen prefikser eller emoji:

```
Versjonér script-URL-ene så nye versjoner slår gjennom med én gang
Gjør motoren fagnøytral med fag-velger ved oppstart
Fiks oppblåst fremdriftsprosent
```

Formen er *hva endringen gjør for brukeren*, ikke hvilke filer som ble rørt.

## Hva du ikke skal gjøre

- Ikke innfør npm, bundler, TypeScript eller et rammeverk. Se [[Beslutningslogg]].
- Ikke legg fagstoff i `js/`, og ikke apparatur i `fag/`.
- Ikke legg til eksterne avhengigheter som lastes ved oppstart. Supabase-SDK-en
  er unntaket, og den lastes først når den trengs.
