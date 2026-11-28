---
tags: [prosjekt, historikk]
oppdatert: 2026-11-28
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
| 22. oktober 2026 | FIE402-stigene kortet ned fra 126 til 96 steg | Steg som gjentok en rutine er kuttet, og det de lærte er flyttet inn i teorien. Uendrede steg beholdt id-en, så ingen svar gikk tapt |
| 22. oktober 2026 | Sjangertrening i FIE432: elleve stiger, 114 steg | Samme modul som FIE402, på norsk. Antall steg tilpasset sjangeren etter Magnus' beskjed. Se [[FIE432 Personlig økonomi]] |
| 22. oktober 2026 | Hold over et symbol i sjangertreningen og formelarket | 275 nye forklaringer, egne per sjanger fordi bokstavene skifter mening. I løpende tekst merkes bare det som sikkert er symboler. Se [[Moduler og visninger]] |
| 22. oktober 2026 | Ny fane i FIE402: Sjangertrening, ni stiger fra null til eksamensnivå | Ett begrep per steg med teori, eksempel og én flervalgsoppgave, og fasit med utregning, kontroll og feilene bak de gale alternativene. 126 steg. Se [[Moduler og visninger]] |
| 21. oktober 2026 | FIE459 k10–k13 skrevet om fra foilene, med DNB-gjesteforelesningen og kj7 | Ny quiz og nye kort for k10–k13, eksamensinformasjonen fra forelesning 13 i k0 og kj0, og studieplanen kalibrert på nytt. Se [[FIE459 Sustainable Finance]] |
| 21. oktober 2026 | Kjernepensum for FIE459, med sant/usant og uten minuspoeng | Sju deler, rundt 6 900 ord. Manifestet fikk `wrongFactor`, og kontrollen godtar sant/usant. Se [[FIE459 Sustainable Finance]] |
| 20. oktober 2026 | Spør Claude lukkes ved trykk utenfor vinduet | Stedet trykket starter avgjør, så omtegning inni vinduet ikke lukker det. Se [[Moduler og visninger]] |
| 20. oktober 2026 | Ny fane i FIE402: Problem sets, med Problem Set 1 | Øvingssettene fra kurset med fire hint per delspørsmål og fasit bak en knapp. Se [[Moduler og visninger]] |
| 16. oktober 2026 | Varianter: sjakktrener med eget regelverk | Lær, øv og utforsk et åpningsrepertoar på brettet, med repetisjon. Reglene er perft-testet. Se [[Moduler og visninger]] |
| 16. oktober 2026 | Private fag og låst Supabase-bibliotek | Fag bare eieren ser, i en privat Supabase-bøtte. Biblioteket hentes nå med eksakt versjon og integritetssjekk. Se [[Supabase]] |
| 16. oktober 2026 | Merk spørsmål i eksamenstreningen med «Øv mer» | Utvalget «Bare merkede» og en liste under oppsettet. Se [[Moduler og visninger]] |
| 15. oktober 2026 | FIE432: hjelp i tre trinn, «Prøv igjen», «Ny variant», heuristikkene og MC-testen som eget sett | Etter kursgodkjenningstesten og øvingsguiden. Inntektsskiftingslikningen rettet til 2026-formen overalt. Se [[FIE432 Personlig økonomi]] |
| 12. oktober 2026 | Spør Claude: chat med sidekontekst og vurdering av svar, med egen API-nøkkel | Hver bruker bruker sin egen kvote. Nøkkelen ligger bare i nettleseren. Se [[Moduler og visninger]] og [[Beslutningslogg]] |
| 9. oktober 2026 | Hjelp-knapp på hvert spørsmål i eksamenstreningen | Fremgangsmåten uten tall. Riktig med hjelp teller som ikke mestret |
| 9. oktober 2026 | Hurtiginnføring på hvert tema i eksamenstreningen | Hva temaet tester, formlene og fellene, med symbolforklaring og knapp for å øve på bare det temaet |
| 9. oktober 2026 | Eksamenstrening i FIE432: 754 spørsmål i eksamensformat | Velg temaer og antall, kort fasit med en gang og full gjennomgang på knapp. Regnespørsmålene er familier med nye tall, alle temaene løst blindt. Se [[Moduler og visninger]] og [[FIE432 Personlig økonomi]] |
| 9. oktober 2026 | Symbolforklaringen også i FIE432s kjernepensum | 92 symboler. Motoren lærte æ, ø og å, så norske ord i formlene ikke blir hakket opp til falske symboler. Se [[Moduler og visninger]] |
| 8. oktober 2026 | Hold over et symbol i en formel i FIE402s kjernepensum | 114 symboler forklart, med egne betydninger der samme bokstav betyr noe annet i en del. Se [[Moduler og visninger]] |
| 7. oktober 2026 | «Kort fortalt» øverst i hver kjernepensumdel, i FIE402 og FIE432 | Fire til sju enkle setninger om hva delen handler om, før eksamensstatistikken. Se [[Moduler og visninger]] |
| 30. september 2026 | «Vurder med Claude» i case-spilleren | Kopierer casen, svaret, fasiten og kravene som én melding til Claude, så abonnementet betaler og appen har ingen nøkkel. Se [[Case-spilleren]] og [[Beslutningslogg]] |
| 28. september 2026 | Svarfeltet i åpne oppgaver fyller hele bredden | Det var et lite kvadrat på ~214 px, fordi en textarea ikke har bredde av seg selv |
| 28. september 2026 | Kjernepensum for [[FIE432 Personlig økonomi]], med flervalgsminicaser | Minicasen følger eksamensformen: +3/−1/0, «stå over» og feller |
| 28. september 2026 | Ny modul: kjernepensum, først for [[FIE402 Corporate Finance]] | Det viktigste på én kveld: tolv deler bygd rundt eksamensblokkene, med sjekker og minicase, og hovedpunktene samlet på én side. Se [[Moduler og visninger]] |
| 26. oktober 2026 | [[FIE432 Personlig økonomi]] får de seks eldre eksamenssettene (H2016–H2021) | Alle ni eksamenene med fasit kan nå øves på, ikke bare flervalgsæraen |
| 29. oktober 2026 | Prøveeksamener: egen del i Eksamenssett, og tre for [[FIE432 Personlig økonomi]] i 2026-formatet med minuspoeng | Hver løst blindt av en uavhengig kontrollør før de ble lagt inn |
| 29. oktober 2026 | [[FIE432 Personlig økonomi]] får H2023 som tiende eksamenssett | Sensorveiledningen manglet i kildematerialet. Registrert i eksamens-DNA, men frekvenstabellene teller fortsatt de ni |
| 29. oktober 2026 | [[FIE432 Personlig økonomi]]: seks prøveeksamener, kalibrert mot skoleeksamenene og kursgodkjenningen 2026 | Prøveeksamen 3 var for lik hjemmeeksamenen H2022 og ble skrevet om |
| 29. oktober 2026 | [[FIE402 Corporate Finance]]: tre prøveeksamener i Kurbatov-formatet | Hver løst blindt av en uavhengig kontrollør. Manualen fikk r<sub>E</sub> ved permanent gjeld med skatt, og H2024 E6(c) en merknad |
| 29. oktober 2026 | Planleggeren: privat utvidelse som fordeler dagens tid mellom fagene etter eksamensdato og mestring per kapittel | Motoren fikk private utvidelser (`S.utvidelser`). Claude kan lage ukeplan. Se [[Moduler og visninger]] og [[Beslutningslogg]] |
| 30. oktober 2026 | Planleggeren: Claude Opus lager dagsplanen hver morgen, spredt repetisjon og klokke per oppgave | `S.claude.strøm` tar nå en valgfri modell. Se [[Moduler og visninger]] |
| 30. oktober 2026 | Planleggeren: «Anbefalt arbeid» erstatter dagsplanen, Claude-planen og oppgaveklokka | Tid per fag og hva tiden bør gå til, uten timeplan. Se [[Beslutningslogg]] |
| 31. oktober 2026 | Eksamenssett: oppgaver kan merkes som usikre, med oversikt, filter og «Prøv på nytt» | Riktig på flaks blir synlig. Planleggeren teller usikre oppgaver halvt. Se [[Eksamenssett-modulen]] |
| 31. oktober 2026 | Pensumbufferen flyttet fra localStorage til IndexedDB | Full localStorage logget Magnus ut ved hvert fagbytte og stoppet lokal lagring av fremdrift. Se [[Fallgruver]] |
| 31. oktober 2026 | Planleggeren: dagens mål som tre ringer (tid, riktige, nytt), eksamensklar per fag og oppsummering om kvelden | Motivasjon gjennom dagen. Svarene føres i en dagbok per dag. Se [[Beslutningslogg]] |
| 2. november 2026 | Planleggeren: eksamensklar som anslått poengsum mot A-grensen per fag | 85 % mestring sa ikke noe om karakter. Se [[Beslutningslogg]] |
| 2. november 2026 | Eksamenssett: fanen «Kartlegging», FIE402 i tre deler (85 flervalgsledd) med rapport per tema | Finne ut hva som må øves, på tvers av hele pensum. Se [[Eksamenssett-modulen]] |
| 4. november 2026 | [[FIE432 Personlig økonomi]]: prøveeksamen 7–9 med pensum som 1–6 ikke testet og med minst mulig hjelp i oppgaveteksten | Magnus ville avdekke kunnskapshull og være forberedt på eksamen på sitt verste. Alle 90 svar løst blindt |
| 4. november 2026 | Eksamenssett: feil svar havner automatisk i oversikten øverst, merket «feil» også når leddet er usikkert | Én liste over alt som bør gjøres på nytt. Se [[Eksamenssett-modulen]] |
| 4. november 2026 | Eksamenssett: fanen «Svake temaer» med to private sett på det Magnus har bommet på | Mindre tid på det han kan. Se [[Eksamenssett-modulen]] |
| 6. november 2026 | [[FIE432 Personlig økonomi]]: eksamenssett per forelesning (16 sett) som til sammen dekker hele sjekklisten | Kurset sa at forelesningsnotatene er det viktigste. Se [[Eksamenssett-modulen]] |
| 8. november 2026 | [[FIE432 Personlig økonomi]]: prøveeksamen 10–12, laget for å ligne eksamen mest mulig (H2025-nivå) | Fire dager før eksamen. Hver eksamen kontrollert uavhengig, fem feil rettet |
| 9. november 2026 | [[FIE432 Personlig økonomi]]: prøveeksamen 13–15, bygd på en prediksjon av eksamen (sannsynlighet per tema) | Tre dager før eksamen. Kontrollert uavhengig, én feil og rundt tjue forbedringer rettet |
| 10. november 2026 | [[FIE432 Personlig økonomi]]: prøveeksamen 16–18, tre nye trekninger av prediksjonen med nye vrier | To dager før eksamen. Kontrolløren fikk 30 av 30 lik fasiten på alle tre, rundt tjuefem forbedringer rettet |
| 10. november 2026 | [[FIE432 Personlig økonomi]]: 263 oppgavekort i Flashcards, 13 kategorier, forsiden er oppgavetypen og baksiden løsningen | Kontrollert uavhengig per halvdel, sju feil rettet |
| 14. november 2026 | [[FIE402 Corporate Finance]]: Problem Set 1–4, H2024-nøkkelen, nytt formelark og alle forelesningene. Appen rettet der den motsa Kurbatov, 58 nye sjangersteg og governance-stigen | Første gang appen ble sammenlignet med forelesningene. Opptaket av wrap-up snudde Black-Scholes-beslutningen |
| 14. november 2026 | [[FIE402 Corporate Finance]]: Persøk-oppsettet for Corp: prediksjon av eksamen, 260 oppgavekort og 14 NotebookLM-kilder | Alt kontrollert uavhengig |
| 15. november 2026 | [[FIE402 Corporate Finance]]: prøveeksamen 4–12, bygd på prediksjonen, i tre runder | Hver løst blindt av en uavhengig kontrollør (96–100 av 100, ingen regnefeil) og rettet før publisering |
| 15. november 2026 | [[FIE402 Corporate Finance]]: eksamenstrening med 692 spørsmål i 12 temaer, «Regn selv først» og uten minuspoeng | Motoren gjort fagnøytral for poeng og språk; fire skribenter og fire uavhengige kontrollører |
| 21. november 2026 | [[FIE402 Corporate Finance]]: 25 deleksamener i fanen «Per del», én del av pensum om gangen, sortert i «Mest forventet» og «Med vri» | Lånt fra de 72 prøveoppgavene, ingen ekte eksamensoppgaver; planleggeren leser settene gjennom motoren (versjon 30) |
| 22. november 2026 | [[FIE402 Corporate Finance]]: «Del 3 i korte stiger» nederst i Sjangertrening, 14 korte stiger og 80 steg | Én stige per oppgavetype i del 3 (opsjoner, kreditt, realopsjoner, M&A, governance), med intuisjon i hvert steg. Motoren fikk seksjoner og emneoverskrifter |
| 23. november 2026 | [[FIE402 Corporate Finance]]: «Øv uten stopp», oppgave etter oppgave med repetisjon som Anki (FSRS) og nye tall hver gang | 51 nye eksamensoppgaver i 612 varianter pluss eksamenstreningen, 491 kort. Claude retter tekstsvar, slurvefeil og misforståelse skilles. Fem skribenter og fem kontrollører i to runder |
| 23. november 2026 | [[FIE402 Corporate Finance]]: ni nye deleksamener «Mest forventet» med egne oppgaver, og «Øv uten stopp» med fokus på flere deler og retur etter antall kort eller dager | 24 nye oppgaver i formen fra H2024 og H2025, skrevet av fire skribenter og kontrollert blindt. Kortene i «Øv uten stopp» kommer tilbake etter 8, 20 eller 40 kort (doblet per riktig på rad), og pausen er høyst en tredjedel av dagene til eksamen |
| 24. november 2026 | [[FIE402 Corporate Finance]]: fanen «Hintet i forelesning» i Eksamenssett, sju sett med 26 oppgaver Kurbatov pekte ut i forelesning | Bygd fra Panopto-tekstingen av 17 opptak; merket sier opptak, tid og sitat. Fire skribenter og fire blinde kontrollører, ingen tallfeil. Motoren fikk egne faner per art (`perDel.faner`) |
| 25. november 2026 | Appens logo: et eksamensark med en rød A i ring, valgt blant åtte forslag | Erstatter tekstflisen «SEE» i fanen og velgeren. Appen fikk for første gang et hjemskjermikon (`ikon/apple-touch-icon.png`); før tok iOS et skjermbilde. Se [[Designsystem]] |
| 25. november 2026 | Eksamenssett: knappen «Kopier det jeg ikke kunne» | Kopierer en beskrivelse av feil, delvis riktige og usikre deloppgaver med svar, fasit, feilen og Claudes retting. Bare beskrivelsen, uten bestilling, så den kan brukes til flere ting (for eksempel en NotebookLM-kilde). Se [[Eksamenssett-modulen]] |
| 25. november 2026 | Eksamenssett: rett på nytt i øving | Svarfeltene står åpne etter retting i øvingsmodus. Endrer du svaret, kommer «Rett a) på nytt». Første forsøk lagres og blir med i «Kopier det jeg ikke kunne» hvis det var feil. Bygg 222. Se [[Eksamenssett-modulen]] |
| 25. november 2026 | Eksamenssett: fasiten kan skjules og riktig svar gir lukket fasit | «Skjul fasit» i overskriften på det grønne fasitpanelet krymper det til en stripe. Fasiten starter lukket der svaret er rettet automatisk og helt riktig, åpen der du bommet. Bare visning, poeng og retting endres ikke. Bygg 224. Se [[Eksamenssett-modulen]] |
| 25. november 2026 | Problem sets: retting som i Eksamenssett | Svarfelt under hintene, «Rett a)», tall automatisk, tekst med Claude, «Rett på nytt», usikker, fasit lukket ved riktig svar og «Kopier det jeg ikke kunne». Rettingen er eksportert fra `bundle-sett.js`, ikke kopiert. Svar-data for 144 delspørsmål i `_svar/ps1–ps4.json`. Bygg 227. Se [[Moduler og visninger]] |
| 26. november 2026 | Eksamenssett: Kortsvar i «Per del» | De 30 drøftingsoppgavene på 12 poeng er flyttet ut av deleksamenene til 14 kortsvarsett under eget valg, før Del 1, 2 og 3. Lagret fremdrift beholder nøklene, oppgavene vises med løpenummer. Bygg 228. Se [[Eksamenssett-modulen]] |
| 26. november 2026 | Retting: kriteriene er nivået for full pott | Claude-rettingen i Eksamenssett, Problem sets, Øv uten stopp og Kapitteloppgaver gir full pott når innholdet i kriteriene står i svaret, også kort eller med andre ord. «Optional:» og detaljer som bare står i løsningen, gir ikke trekk. Kriteriene i ps3 9b til 9d er lagt på nivå med den offisielle løsningen. Bygg 229. Se [[Eksamenssett-modulen]] |
| 26. november 2026 | Retting: kortere tilbakemelding | Claude svarer med poeng og én setning, én linje per kriterium og et toppsvar på én til to setninger. «Det som kostet mest» er borte. Bygg 229. Se [[Eksamenssett-modulen]] |
| 26. november 2026 | FIE402: «Må kunne» i Eksamenstrening | Ny fane med 20 oppgavetyper Kurbatov har hintet til, i tre tiers, med tre nye eksamensoppgaver per type som åpnes i Eksamenssett-motoren. Tier 1 (sju typer, 21 oppgaver) lagt ut etter blind kontroll i bygg 230, tier 2 (åtte typer, 24 oppgaver) i bygg 231 og tier 3 (fem typer, 15 oppgaver) i bygg 232. Se [[FIE402 Corporate Finance]] og [[Moduler og visninger]] |
| 28. november 2026 | [[FIE402 Corporate Finance]]: fanen «Prediksjon» i Eksamenssett med prediksjon 1 og 2, hele eksamener bygd på det som mest sannsynlig kommer | Magnus ville ha prediksjonseksamener der hvert nytt sett tar med en oppgave som ligner det han bommet på i forrige. To skribenter og to blinde kontrollører: ingen regnefeil, reserveverdiene fjernet og toleransene strammet. Mock-sett kan nå ha `fane`. Bygg 233. Se [[Eksamenssett-modulen]] |
| 28. november 2026 | [[FIE402 Corporate Finance]]: prediksjon 3, den første som tar opp igjen feilene fra et tidligere sett | Magnus fikk 85 av 100 på prediksjon 1 (med følgefeil). Prediksjon 3 tar nye runder på de to feilene (ρ fra et omsatt verdipapir og fri kontantstrøm), og fellene han gikk i, faller utenfor toleransen. Skribent og blind kontrollør: ingen regnefeil. Bygg 234 |

Lest ovenfra og ned er fortellingen: *ett fag → en plattform*.
