---
tags: [prosjekt, beslutninger]
oppdatert: 2026-09-30
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
Konto-siden. Alternativet — å generere en JSON-fil på forhånd — ville
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

## Ingen samlet fremdrift: hver modul viser sin egen
28. september 2026 fjernet vi Fremdrift-siden (`/progress`), ringen «% klar» og
tallkortene på dashbordet og «% klar» nederst i sidemenyen. Magnus syntes det
samlede tallet ble rart når appen har så mange ulike deler. Tallet
(`readiness()`) målte bare lesing, plan, flashcards og quiz, så kjernepensum,
kapitteloppgaver og eksamenssett telte null: du kunne være ferdig med alt det og
likevel stå på «0 % klar».

Nå står fremdriften inne i modulen den gjelder: Pensum (lest og forstått),
Kjernepensum (deler ferdig), Kapitteloppgaver (per kapittel), Flashcards
(mestret), Studieplan («X av N fullført»), Quiz (historikk og treffsikkerhet),
Casetrening (kjørt og snitt), Mock-intervjuer (sett), Historier (matrisen) og
Lynlæring (XP og streak). «Nullstill fremdrift» og «Last innhold på nytt» ligger
på Konto.

**Konsekvens:** ikke lag et nytt samlet tall eller en ny samleside uten at
Magnus ber om det. Vil du vise mer fremdrift, legg det i modulen det gjelder.

*Forrige beslutning, nå uten betydning:* `readiness()` målte dekning, ikke
treffprosent (fiks 29. juni 2026), fordi noen få riktige quizsvar blåste opp
tallet.

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

## Kjernepensum er en nedkorting av manualen, bygd etter eksamensblokker
Magnus ba 28. september 2026 om en del «som heter kjernepensum», som kan leses
på kort tid og gi god forståelse av det som kommer på eksamen. Tre valg ble tatt
med ham: **rundt 12 000 ord** (én kveld), **raske sjekker pluss en minicase** per
del, og **full behandling av temaene Kurbatov ikke har gitt** (Myers-Majluf,
gjeld og egenkapital som opsjoner, emisjoner), selv om de ikke var i de to siste
settene.

Teksten er manualen kortet ned, ikke nytt stoff: samme konvensjoner, ofte samme
kontrollerte eksempler, og hver del lenker til kapitlene den bygger på. Delene
følger det eksamen spør om (tvillingfirma, MM og rekapitalisering, WACC og APV
…), ikke kapittelinndelingen, fordi det er slik oppgavene kommer.
**Konsekvens:** ikke skriv nytt fagstoff i kjernepensum som ikke står i
manualen. Finnes noe i kjernepensum som manualen mangler, hører det hjemme i
manualen først. Se [[Moduler og visninger]].

## Minicasen i kjernepensum følger eksamensformen
FIE402 eksamineres med åpne oppgaver og penn og papir, FIE432 med flervalg og
minuspoeng. Kjernepensum i FIE432 fikk derfor flervalgsminicaser med +3/−1/0,
«stå over» og en setning per galt alternativ om hvilken feil det er laget av, og
ikke FIE402s åpne format. Magnus ba om at det skulle lages «på riktig måte basert
på eksamensformen». Et nytt fag velger form etter sin egen eksamen; motoren har
begge. Se [[Moduler og visninger]].

## Casevurderingen regnes ut, den velges ikke
Til 30. september 2026 valgte kandidaten selv Bom, Delvis, Solid eller Distinkt
etter hvert casetrinn. Magnus ba om «streng, konkret feedback etter hver runde»
før PwC-intervjuet, og en skala du velger etter magefølelse, er ikke streng. Nå
krysser du av kravene svaret faktisk oppfylte, og nivået regnes ut: alle krav gir
Distinkt, tre firedeler Solid, 40 prosent Delvis. Å gå i fella, eller ha feil tall
på et regnetrinn, setter Delvis som tak. Tiden står i tilbakemeldingen, men teller
ikke, fordi det tar lengre tid å skrive et svar enn å si det.

**Konsekvens:** ikke gjeninnfør fritt valg av nivå for trinn med krav. Og kravene
må være rettferdige, siden de nå avgjør nivået: de skal gjelde det spørsmålet ber
om, og godta like gode svar («for eksempel»). Se [[Case-spilleren]].

## Firmaets egen caseform framfor prep-bransjens
PwC-casene følger det PwC selv beskriver: skriftlig materiale med «viktige
forhold», lesetid, og spørsmål fra en engasjementsleder, vurdert mot PwCs egne fem
kriterier. Prep-bransjen kaller PwC «candidate-led», men PwCs egne eksempelcaser er
intervjuerledet. Der firmaet har publisert formen, bygger vi etter den, og
kildemerker motstriden. Se `docs/case-research/10-pwc-consulting.md`.

## Claude via kopiert melding, ikke via API
Magnus ville ha Claude til å vurdere casesvar, men uten at noen andre kunne bruke
kvoten. Et API-kall fra appen krever en nøkkel, og alt i en statisk side kan leses
av alle. Da trengs en server (en Supabase Edge Function med eiersjekk) og egen
fakturering. Abonnementet på claude.ai gir ingen API-nøkkel og kan ikke brukes fra
en egen nettside. Løsningen ble derfor en knapp som kopierer en ferdig melding, som
limes inn i Claude, og da er det abonnementet som betaler.

**Konsekvens:** ingen nøkler og ingen `fetch` til Anthropic i `js/`. Vil noen ha
vurderingen inne i appen, er veien en Edge Function med eiersjekk, stengt
registrering og utgiftstak på nøkkelen. Det er en egen beslutning og første
serverkode i prosjektet. Se [[Case-spilleren]].

## Norsk i kode og grensesnitt
Kommentarer, UI-tekst, commit-meldinger og variabelnavn for domenebegreper er på
norsk. Se [[Kodekonvensjoner]].
