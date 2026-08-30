---
tags: [arkitektur, moduler, case]
oppdatert: 2026-08-30
---

# Historieporteføljen

`js/bundle-historier.js`, rute `/historier`. Det eneste stedet i hele appen der
**brukeren skriver innholdet selv**, ikke faget.

## Hvorfor den finnes

Fit-delen av et intervju kan ikke leses inn. Den krever seks til ti historier som
er skrevet ned, som dekker alle dimensjonene huset spør etter, og som tåler å bli
boret i. Å lese et kapittel om STAR gir null av dette. Derfor er modulen et
verktøy og ikke en visning.

## Fagnøytral, som resten av motoren

Dimensjonene, sondene og reglene kommer fra `EDU_DATA.historier`, så motoren vet
ingenting om konsulentbransjen. Et annet fag kan bruke den til hva som helst der
man trenger en portefølje med dekningskrav.

```js
EDU_DATA.historier = {
  intro: "…", sondeIntro: "…",
  regler: { minPerDim: 2, maksPerHistorie: 2, minKontekster: 4, sondeTerskel: 8 },
  dimensjoner: [{ id, navn, kort, beskrivelse }],
  sonder: ["…", "…"],
};
```

## De tre delene

**Dekningsmatrisen** er hele poenget. Den viser historier × dimensjoner, teller
per dimensjon, og **feller dom i klartekst** — hvilke dimensjoner som er tynne,
hvilke historier som er merket med for mange, og hvor mange ulike kontekster som
finnes. En matrise uten dom er bare et rutenett.

**Redigeringen** har sju felt, og de er valgt for å tvinge fram det som mangler i
tynne svar: hva som sto på spill, hvem som var uenig *og hvorfor*, utfallet med
tall, og «så derfor …».

**Sondetesten** er tolv oppfølgingsspørsmål. Du svarer høyt og krysser av bare
der du faktisk hadde et svar. Under terskelen på 8 er historien en reserve.

> [!info] Hvor tallene kommer fra
> Dimensjonene er McKinseys, med navnene de fikk sommeren 2025. Tolvpunktslista
> og terskelen på 8 er rekonstruert av ex-MBB-coacher — ikke publisert av firmaet.
> Kildeklassifiseringen står i `docs/case-research/05-fit-og-framforing.md`.

## Lagring

`state.exams["hist:<id>"]`, med `slettet: true` som gravstein i stedet for
sletting — ellers ville en slettet historie kommet tilbake ved neste synk fra en
annen enhet.
