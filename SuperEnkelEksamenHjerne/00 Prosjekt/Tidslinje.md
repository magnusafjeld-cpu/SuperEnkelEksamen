---
tags: [prosjekt, historikk]
oppdatert: 2026-09-30
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
| 30. august 2026 | [[Caseintervju]] lagt inn som fag nummer tre | Første fag uten eksamen. To nye moduler: [[Case-spilleren]] og [[Historieporteføljen]] |
| 1. september 2026 | Casebiblioteket delt i intervjucaser og market sizing | Feltet `kategori` styrer bolkene |
| 1. september 2026 | Intervjucasene fra 6 til 18 — alle tolv arketypene dekket | Lønnsomhet, prising, vekst og operations har nå flere caser med **ulik mekanisme**. Se [[Caseintervju]] |
| 1. september 2026 | `parseTall` leser ekte minustegn | Lå urørt til første case med negativ fasit. Se [[Case-spilleren]] |
| 3. september 2026 | Eksamenssettene retter flervalg automatisk, med valgfrie minuspoeng | Forberedelse til FIE432. Se [[Eksamenssett-modulen]] |
| 7. september 2026 | [[FIE432 Personlig økonomi]] lagt inn som fag nummer fire | Første fag der eksamen er ren flervalg — og der feil svar koster poeng |
| 7. september 2026 | `tools/sjekk-manual.py` og `tools/sjekk-sett.js` | Kontroller som speiler parserens og settmodulens egne regler. Fant seks feilskrevne figurer i SAM3 |
| 3. september 2026 | Eksamenssettene retter flervalg automatisk, med valgfrie minuspoeng | Forberedelse til FIE432, der eksamen er flervalg i Wiseflow. Se [[Eksamenssett-modulen]] |
| 24. september 2026 | Kapitteloppgaver én om gangen med trinnvis løsning, og eksamensvekt i hele pensum | Vekten styrer prikkene, repetisjonen og hvor mange oppgaver et kapittel får. Se [[Moduler og visninger]] |
| 24. september 2026 | FIE432-kapitteloppgavene fra 117 til 229, alle løst blindt | 229 av 229 blinde valg stemte, men gjennomgangen fant tre lovfeil som også sto i manualen. Se [[FIE432 Personlig økonomi]] |
| 24. september 2026 | De siste fire manualpunktene i FIE432 rettet | Ektefellenes innslagspunkt, kombinasjonsfond, exit-skattens 0,7-regel og gavegrense, bostedsregler og system 1/2. Se [[Åpne spørsmål og neste steg]] |
| 24. september 2026 | [[FIE459 Sustainable Finance]] lagt inn som fag nummer fem | Bevisst kort: 14 kapitler og 20 900 ord, quiz i eksamensformatet med flervalg og sant/usant |
| 28. september 2026 | Formelarket i FIE402 bak en knapp nederst til høyre | Ordrett fra eksamensarket, med det som ikke står der listet under |
| 28. september 2026 | (i) på hver formel i formelarket | Hva formelen er og når den brukes, ved hover eller trykk. Se [[Moduler og visninger]] |
| 28. september 2026 | Eksamensvekten på NotebookLM-siden | Prikkene ved hvert kapittel sier hvilke som er verdt å legge inn som kilde først |
| 28. september 2026 | Fremdrift-siden og «% klar» fjernet | Fremdriften står inne i hver modul. Det samlede tallet telte ikke kjernepensum, kapitteloppgaver eller eksamenssett. Se [[Beslutningslogg]] |
| 29. september 2026 | Kjernepensum som eget kort i NotebookLM, i FIE402 og FIE432 | Hele kjernepensum som én kilde eller del for del, med sjekker og minicase med fasit. Se [[Moduler og visninger]] |
| 30. september 2026 | PwC-caser og streng vurdering i casetreningen | Seks caser i PwCs eget format før intervjuet 6. oktober, hver kontrollert blindt av en annen agent. Nivået etter hvert trinn regnes nå ut av kravene du krysser av. Se [[Caseintervju]] og [[Case-spilleren]] |
| 28. september 2026 | Svarfeltet i åpne oppgaver fyller hele bredden | Det var et lite kvadrat på ~214 px, fordi en textarea ikke har bredde av seg selv |
| 28. september 2026 | Kjernepensum for [[FIE432 Personlig økonomi]], med flervalgsminicaser | Minicasen følger eksamensformen: +3/−1/0, «stå over» og feller |
| 28. september 2026 | Ny modul: kjernepensum, først for [[FIE402 Corporate Finance]] | Det viktigste på én kveld: tolv deler bygd rundt eksamensblokkene, med sjekker og minicase, og hovedpunktene samlet på én side. Se [[Moduler og visninger]] |

Lest ovenfra og ned er fortellingen: *ett fag → en plattform*.
