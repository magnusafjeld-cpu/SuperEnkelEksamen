---
tags: [arbeidsmåte, hjerne, meta]
oppdatert: 2026-08-19
---

# Slik oppdaterer du hjernen

Hvelvet er bare nyttig så lenge det stemmer. Et notat som lyver er verre enn
ingen notat.

## Til AI-assistenter i nye økter

Les [[Prosjektoversikt]], [[Arkitektur]] og [[Fallgruver]] før du foreslår eller
gjør noe. Sjekk [[Åpne spørsmål og neste steg]] før du foreslår arbeid — det
kan allerede stå der.

**Verifiser før du stoler.** Notatene beskriver koden slik den var da de ble
skrevet (`oppdatert:` i frontmatter). Navngir et notat en fil, en funksjon eller
et tall, sjekk at det fortsatt finnes før du bygger på det.

Når du er ferdig med en endring: oppdater notatene den berører, i samme økt.

## Hva som utløser en oppdatering

| Du har … | Oppdater |
|---|---|
| lagt til eller endret en modul | [[Moduler og visninger]] |
| endret lagringsformat eller synk | [[Datamodell og lagring]] |
| endret parseren eller manualformatet | [[Pensumparseren]] |
| lagt til et fag | [[Fagregisteret]], nytt fagnotat, [[Tidslinje]] |
| endret innholdstall i et fag | fagets notat |
| tatt et arkitektonisk valg | [[Beslutningslogg]] |
| oppdaget en ny felle | [[Fallgruver]] |
| gjort noe med publisering, adresser eller nøkler | [[Publisering og cache]], [[Supabase]] |
| fullført noe på lista | [[Åpne spørsmål og neste steg]] + [[Tidslinje]] |

## Regler for notatene

1. **Ett tema per notat.** Blir et notat om to ting, splitt det.
2. **Sett `oppdatert:` i frontmatter** hver gang du redigerer. Det er sånn neste
   leser vet hvor mye den kan stole på.
3. **Skriv hvorfor, ikke bare hva.** Koden viser hva. Hjernen finnes for
   begrunnelsene.
4. **Lenk med dobbeltklammer** (`[[notatnavn]]`) i stedet for å gjenta. Dupliserte fakta blir
   motstridende fakta.
5. **Ikke kopier kode hit.** Beskriv formen og pek på filen. Kode kopiert inn
   råtner umiddelbart.
6. **Slett det som ikke stemmer.** Et utdatert notat skal fjernes, ikke bevares
   av høflighet.

## Struktur

```
Hjernen.md            inngangen — kart over alt
00 Prosjekt/          hva, hvorfor, historikk, hva som gjenstår
10 Arkitektur/        hvordan koden henger sammen
20 Fag/               registeret og fagene
30 Drift/             kjøre, publisere, synke, unngå feller
40 Arbeidsmåte/       stil og vedlikehold
```

Nye notater legges i mappa de hører hjemme i, og lenkes fra [[Hjernen]].
