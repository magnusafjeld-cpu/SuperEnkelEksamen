---
tags: [prosjekt, historikk]
oppdatert: 2026-08-19
---

# Tidslinje

Hva som ble bygget når. Utledet fra git-historikken, men med tolkningen som
ikke står i commit-meldingene.

| Dato | Hva | Betydning |
|---|---|---|
| 26. juni 2026 | Første versjon: SAM3 Makroøkonomi — interaktiv eksamenstrening | Hele appen som én SAM3-spesifikk greie |
| 26. juni 2026 | Gjør appen hostbar på GitHub Pages | Fra lokal fil til nettadresse |
| 29. juni 2026 | Fiks oppblåst fremdriftsprosent | `readiness()` ble lagt om til å måle **dekning**, ikke rate — ett riktig quizsvar skal ikke flytte nåla. Se [[Moduler og visninger]] |
| 29. juni 2026 | Oppgavebank med fasit + planen utvidet til 3 uker | Planen gikk fra 14 til 21 dager |
| 12. juli 2026 | Lynlæring: mobil-først minispill | Erkjennelsen av at telefonen er den viktigste flaten |
| 23. juli 2026 | Lynlæring: 6 nye spilltyper | 13 spill totalt |
| 23. juli 2026 | Dybdetrening: 100 + 84 + 38 spørsmål i tre banker | 222 selvrettede spørsmål |
| 31. juli 2026 | Frittstående oppgavebank-side | `SAM3_oppgavebank_2.html` — **ikke** koblet til appen, se [[Fallgruver]] |
| 9. august 2026 | Motoren gjort fagnøytral med fag-velger | Det store arkitekturskiftet: `js/` vs `fag/` |
| 9. august 2026 | Kontoer og synk via Supabase | Fremdrift på tvers av telefon og PC |
| 19. august 2026 | Koblet til det faktiske Supabase-prosjektet | Nøkler inn i `js/config.js` |
| 19. august 2026 | Døpt om til Super Enkel Eksamen, fag-velgeren alltid tilgjengelig | Plattformnavn over fagnavn |
| 19. august 2026 | Versjonerte script-URL-ene (`?v=N`) | Løste at telefonen kjørte gammel kode i opptil ti minutter |
| 19. august 2026 | GitHub-repoet døpt om fra SAM3 til SuperEnkelEksamen | Ny Pages-URL; den gamle er død |
| 19. august 2026 | Denne hjernen opprettet | |
| 19. august 2026 | Seks av motorens femten SAM3-antakelser flyttet ut i fagmanifestet | Motoren tåler et fag som ikke ligner makroøkonomi. Se [[Fallgruver]] |
| 19. august 2026 | Ny modul: [[Eksamenssett-modulen]] med øvingsmodus og eksamensmodus på tid | Første modul bygget for et annet fag enn SAM3 |
| 19. august 2026 | `plan.mode = "modules"` — progresjonsdrevet plan uten datoer | For fag man tar «litt her og der» i stedet for etter en kalender |
| 19. august 2026 | [[FIE402 Corporate Finance]] lagt inn som fag nummer to | Engelsk innhold i en norsk app, 24 moduler, elleve eksamenssett |
| 19. august 2026 | Den bufrede pensumparsingen halvert | To felter som ble lagret men aldri lest, ble fjernet. Se [[Datamodell og lagring]] |

Lest ovenfra og ned er fortellingen: *ett fag → en plattform*.
