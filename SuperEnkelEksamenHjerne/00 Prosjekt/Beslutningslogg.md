---
tags: [prosjekt, beslutninger]
oppdatert: 2026-09-24
---

# Beslutningslogg

Valg som er tatt bevisst. Står noe her, er det **ikke** en forglemmelse — ikke
"rydd" det bort uten å ta det opp først.

## Ingen bygging, ingen avhengigheter
Filene i repoet er filene som kjører. Ingen npm, ingen bundler, ingen
transpilering. Prisen er lange linjer og manuell cache-busting; gevinsten er at
prosjektet fungerer om fem år uten å oppdatere noe som helst, og at man kan
åpne `index.html` rett fra Finder.
**Konsekvens:** ikke foreslå React, Vite, TypeScript eller npm-pakker.

## Pensum parses i nettleseren, ikke på forhånd
`DOMParser` kjører på manual-HTML-en ved første oppstart, og resultatet caches i
`localStorage`. Endres manualen, trykker man «Last innhold på nytt» på
Fremdrift-siden. Alternativet — å generere en JSON-fil på forhånd — ville
innført et byggesteg. Se [[Pensumparseren]].

## Fagbytte er en full sidelasting
`picker.choose()` gjør `location.replace("?fag=<id>")` i stedet for å bytte data
i minnet. Bevisst: motoren cacher parset pensum, SRS-bunken og søkeindeksen i
modulnivå-variabler, og å rive alt det ned trygt er mer kode enn en sidelasting
er verdt.

## Anon-nøkkelen ligger åpent i repoet
`js/config.js` er sjekket inn med Supabase-URL og anon-nøkkel. Det er riktig:
anon-nøkkelen er laget for frontend, og Row Level Security er det som faktisk
beskytter dataene. **`service_role`-nøkkelen skal aldri inn i repoet.**
Se [[Supabase]].

## Lokalt først, skyen som kopi
`localStorage` er sannheten mens du jobber; Supabase er speilet. Ved innlasting
slås lokal og fjern stat **sammen** (`mergeState`) før noe skrives tilbake, så
to enheter aldri overskriver hverandre. Se [[Datamodell og lagring]].

## Fremdrift måles som dekning, ikke treffprosent
`readiness()` vekter *hvor mye som er gjort*, ikke *hvor godt det gikk*. Dette
var en eksplisitt fiks 29. juni 2026 — den gamle beregningen ble oppblåst av
noen få riktige quizsvar. Ikke gå tilbake til rate-basert måling.

## All fagtekst kommer fra manualen
For SAM3 er ingen tekst funnet på utenfor `SAM3_Eksamensmanual.html`. Stoffet er
omstrukturert for å bli lettere å forstå, men ikke utvidet med nytt innhold.
Dette er et pedagogisk prinsipp, ikke en teknisk begrensning.

## Fagteksten følger eksamensspråket
FIE402 og FIE459 undervises og eksamineres på engelsk, og der er fagteksten,
quizen og kortene på engelsk. Begrepene må være de samme som i eksamensoppgavene.
Grensesnittet, studieplanen og alt rundt er fortsatt norsk. SAM3, FIE432 og
Caseintervju er på norsk. Se [[FIE402 Corporate Finance]] og
[[FIE459 Sustainable Finance]].

## FIE459 er bevisst kort
Magnus ba om et fag han kan gå «raskt igjennom for å ha en grei forståelse for
temaene». Derfor én kort kapittel per forelesning, quiz og flashcards, og ingen
dybdetrening, lynlæring, kapitteloppgaver eller eksamenssett. Det er et valg, ikke
et hull; mer eksamenstrening kan legges til senere. Se [[FIE459 Sustainable Finance]].

## Norsk i kode og grensesnitt
Kommentarer, UI-tekst, commit-meldinger og variabelnavn for domenebegreper er på
norsk. Se [[Kodekonvensjoner]].
