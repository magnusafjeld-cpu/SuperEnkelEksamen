---
tags: [prosjekt, beslutninger]
oppdatert: 2026-10-29
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

## Claude med brukerens egen API-nøkkel (12. oktober 2026)
Erstatter «Claude via kopiert melding» under. Magnus fikk API-kreditt og ville ha
bedre tilbakemelding på fasit og en chat som vet hvilken side du står på. Andre
brukere skulle kunne bruke sin egen kvote. Løsningen er «bring your own key»: hver
bruker limer inn sin egen nøkkel, den lagres bare i nettleseren
(`localStorage["edu.claude.v1"]`). Nettleseren kaller api.anthropic.com direkte
med `anthropic-dangerous-direct-browser-access`.

Valgt framfor en Edge Function med eiersjekk fordi ingen nøkler havner hos oss,
ingen betaler for andre og det trengs ingen serverkode. Risikoen er at en nøkkel
i nettleseren kan leses av kode på siden. Det ble først skrevet at siden ikke laster
skript utenfra. Det stemte ikke: innloggingen hentet Supabase-biblioteket fra
jsDelivr med «@2», altså nyeste versjon uten kontroll. Rettet 16. oktober 2026:
biblioteket er låst til 2.117.2 med integritetssjekk (SRI). UI-et ber om en egen
nøkkel med lav utgiftsgrense.

**Konsekvens:** Nøkkelen skal aldri inn i fremdriften (`S.store`), for den synkes
til Supabase. Laster siden noen gang et skript utenfra, må denne beslutningen tas
opp igjen. Uten nøkkel virker alt som før: knappene kopierer meldingen. Se
[[Moduler og visninger]] under «Spør Claude».

## Claude via kopiert melding, ikke via API (erstattet 12. oktober 2026)
Magnus ville ha Claude til å vurdere casesvar, men uten at noen andre kunne bruke
kvoten. Et API-kall fra appen krever en nøkkel, og alt i en statisk side kan leses
av alle. Da trengs en server (en Supabase Edge Function med eiersjekk) og egen
fakturering. Abonnementet på claude.ai gir ingen API-nøkkel og kan ikke brukes fra
en egen nettside. Løsningen ble derfor en knapp som kopierer en ferdig melding, som
limes inn i Claude, og da er det abonnementet som betaler.

Kopieringen lever videre som reserve for brukere uten nøkkel. Se [[Case-spilleren]].

## Regnespørsmål genereres, de skrives ikke
Eksamenstreningen trengte hundrevis av regnespørsmål, og Magnus sa uttrykkelig at
like spørsmål med nye tall var greit. Skrevet for hånd ville hvert tall vært en
mulig regnefeil; FIE432-manualen hadde én slik feil som slapp gjennom fire
kontrollrunder. Regnespørsmålene er derfor familier: små Python-funksjoner i
`fag/<fag>/_trening/` som trekker tall og regner svar, feller og forklaring av de
samme variablene. `tools/bygg-trening.py` lager en statisk `trening.js`.

**Konsekvens:** appen er fortsatt uten byggesteg; Python-kildene lastes aldri i
nettleseren, de er kilder slik `_kjerne/` og `_fragmenter/` er. Endrer du et
spørsmål, rett i `_trening/*.py` og bygg på nytt, aldri i `trening.js`. Aritmetikken
er riktig per konstruksjon, men **premissene er det ikke**: en gal regel i en
familie blir gal i alle variantene. Derfor blindkontroll av minst to varianter per
familie. Se [[Moduler og visninger]].

## Inntektsskiftingslikningen følger forelesningen for 2026 (15. oktober 2026)
Eksamensfasitene H2017 og H2020 brukte t<sub>w</sub> = t<sub>A</sub> + (1 − t<sub>A</sub>) × t<sub>e</sub> × y. Forelesning 5 i
2026 legger nominelle satser sammen: 47,4 % + 12,4 % = 22 % + 22 % × y, og
kursgodkjenningstesten bruker den formen. Appen lærer derfor bort 2026-formen. Den
eldre står bare som felle eller som «eldre eksamener». Tekstuttrekket appen ble bygget
fra, manglet formelobjektene i lysbildene. Derfor kom feilen inn.

## MC-testen publiseres med løsninger før fristen (15. oktober 2026)
Kurset deler ikke ut fasit til kursgodkjenningstesten. Appen er offentlig. Magnus
fikk spørsmålet og valgte å publisere settet med løsninger med en gang.

## Private fag i en privat Supabase-bøtte (16. oktober 2026)
Magnus ville kunne legge til fag som bare han ser. Alt i repoet og på GitHub Pages
er offentlig, også filer velgeren ikke viser. Kursmateriale fra NHH er dessuten
opphavsrettslig beskyttet. Fagene ligger derfor i bøtta `privat` i Supabase Storage,
der en tilgangsregel bare slipper inn eierens egen mappe (`privat/<bruker-id>/`).
Valgt framfor «bare lokalt» fordi fagene skal virke på telefonen også. Valgt framfor
å skjule faget i velgeren fordi filene da fortsatt ville vært offentlige.

**Konsekvens:** private fag finnes bare når du er logget inn. De skrives i
`fag/privat-<navn>/`, som `.gitignore` holder utenfor repoet. De lastes opp med
`tools/last-opp-privat.py` med din egen innlogging. `service_role` brukes ikke.
Se [[Supabase]].

## Planleggeren: regnemodell med Claude som rådgiver (29. oktober 2026)
Magnus ville ha en plan som oppdaterer seg etter resultatene og fordeler tiden
fornuftig mellom fag: ikke overprioritere FIE432 bare fordi eksamen er nær når han
kan det, spre tiden når alt er langt unna og ta hensyn til ulik pensummengde.
Valgt: en deterministisk regnemodell lager dagsplanen hver dag, gratis og
forutsigbart, og Claude lager en ukeplan bare på knapp, med appen som vokter over
tiden og eksamensdatoene. Valgt framfor bare Claude fordi en daglig plan ikke skal
koste penger eller variere tilfeldig, og framfor bare regler fordi skjønn om
generalprøver, notater og vekting er lettere å beskrive enn å kode.

**Konsekvens:** modulen er privat (utvidelse i bøtta). Se [[Moduler og visninger]].

## Norsk i kode og grensesnitt
Kommentarer, UI-tekst, commit-meldinger og variabelnavn for domenebegreper er på
norsk. Se [[Kodekonvensjoner]].
