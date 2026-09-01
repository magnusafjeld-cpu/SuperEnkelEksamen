---
tags: [fag, case, innhold]
oppdatert: 2026-09-01
---

# Caseintervju

Fag nummer tre, og det første som ikke handler om en eksamen. Id `case`,
aksentfarge `#5b3fd6` (fiolett), logo «CI». **Alt innhold på norsk**, men
fagtermene står på engelsk der de faktisk heter det — *issue tree*, *MECE*,
*candidate-led*. Magnus må kunne si dem i rommet.

## Hva det er

Trening til caseintervjuer i managementkonsulenting. Målgruppen er hans egne
søknader høsten 2026, vektet mot **MBB, Arkwright og de øvrige strategihusene** —
ikke Big 4, som ble valgt bort.

## Det som styrer alt: fristene

Kartleggingen 30. august 2026 fant at **søknadsfristene er nå**, ikke senere.
NHHs egen jobbportal (`nu.nhhs.no/jobs`) var den beste kilden. Se
[[Åpne spørsmål og neste steg]] for status.

| Frist | Hvem |
|---|---|
| 30.08 | Arkwright Internship 2027 · Implement (junior + graduate) |
| 06.09 | McKinsey Associate Intern og Junior Associate |
| 13.09 | **Bain Associate Consultant** · Arkwright «Preview» · BearingPoint |
| 04.10 | Accenture — det siste sikkerhetsnettet |
| rullerende | BCG er eneste som ikke har fast frist |

**Konsekvens for kurset:** det bygges hastverksrettet. Hoderegning og
strukturering først, teori underveis — ikke motsatt.

## De to nye modulene

Casetrening lot seg ikke presse inn i eksamensformatet, fordi en case er en
samtale og ikke et oppgavesett. Derfor to nye moduler i motoren:

- **[[Case-spilleren]]** (`/caser`) — én case spilt trinn for trinn
- **Mock-intervjuer** (`/mock`) — 70 verifiserte YouTube-videoer med stopp-punkter
- **[[Historieporteføljen]]** (`/historier`) — dine egne fit-historier

Og fire nye minispill i lynmodulen, fordi «mer enn bare tekst» var beskjeden:
**Strukturer!** (90 sekunder per prompt, selvrettet mot en modellstruktur),
**Finn feilen** (klikk linjen der utregningen ryker — noen runder har ingen feil),
**Les grafen** (exhibit-tolkning med ekte figurer) og **Bygg estimatet**
(markedsstørrelse steg for steg, med sanity-sjekk som obligatorisk siste trinn).

## Kildegrunnlaget

Fem parallelle kartlegginger ligger i `docs/case-research/`. De er verdt å lese
før du skriver innhold, og de er **kildemerket**: hva firmaene selv sier, mot hva
prep-industrien påstår. Det skillet finnes ikke i noen av de kommersielle kildene.

De skarpeste funnene:

- **Verken BCG eller Bain nevner ett eneste navngitt rammeverk** på sine egne
  sider. Det er det sterkeste dokumenterte argumentet mot 3C og Porter — sterkere
  enn noe prep-bransjen selv sier.
- **McKinsey døpte om alle fire PEI-dimensjonene sommeren 2025** til Leadership,
  Drive, Growth og Connection. Substansen er uendret.
- **BCG Nordics' test er ikke Casey**, men logisk resonnement: 80 spørsmål på
  30 minutter uten kalkulator. Det er hastighetsdrill, ikke casetrening.
- **Ingen casetype-frekvensstatistikk er etterprøvbar.** «Lønnsomhet = 30–40 %»
  sirkulerer overalt uten metode. Behandles som folklore.
- **Arkwright publiserer ingenting** om prosessen. Det som finnes er
  Glassdoor-rapporter: to runder, to caser i hver, candidate-led. Ryktet om en
  beryktet numerisk test **lot seg ikke bekrefte** — ikke tren mot den uten å ha
  ringt `recruiting@arkwright.no` først.

> [!warning] Tre selskaper på den opprinnelige lista er blindveier
> **Oliver Wyman, Roland Berger og Simon-Kucher har ikke Oslo-kontor.**
> **Considium** rekrutterer erfarne ledere, ikke nyutdannede. **Cordial** er
> svensk uten norsk graduate-inngang — `cordial.no` er en bistro.

## Status

| | |
|---|---|
| Motor | **ferdig** — fem moduler, alle verifisert i nettleseren |
| Manual | **16 av 16 kapitler · 21 300 ord** — 96 seksjoner, 43 tabeller, 15 gjennomregnede eksempler |
| Studieplan | **11 moduler · 14 timer** · arbeidsoppgaver med lenke inn i øvelsen |
| Caser | **32** i to bolker: **18 intervjucaser** og 14 market sizing · 192 trinn · 950 minutter |
| Struktureringsprompter | **84** i åtte casetyper (9–15 hver), med modellstruktur som tre, hypotese og felle |
| Finn feilen | **34** utregninger, 7 av dem uten feil |
| Les grafen | **24** figurer — 18 SVG, 6 tabeller, 17 med innebygd felle |
| Bygg estimatet | **14** kjeder · 57 runder |
| Mock-videoer | **70**, dobbeltverifisert · 103 stopp-punkter · 34 timer |
| Historieporteføljen | 4 dimensjoner, 12 sonder, terskel 8 |
| Lynelementer totalt | **207** |
| Quiz | **48** (40 flervalg / 8 kortsvar), alle 16 kapitler dekket |
| Flashcards | **64** forfattet + 44 auto-genererte fra tallarket |
| Dybdetrening | **115** i fire banker: grunnlaget 20, struktur 25, tall 40, framføring 30 |

**Manualen er ferdig.** 21 300 ord mot kursplanens tak på 20 000 — litt over, men
forholdet holder: rundt 110 minutters lesing mot 625 minutter drill i studieplanen,
altså under en femdel av tiden, som var det ordtaket egentlig skulle sikre.

`tools/case-bygg-manual.py` setter manualen sammen av kapittelfragmenter og
normaliserer deltitlene. Manualen er sannhetskilden når den først er bygget.

## Intervjucasene dekker hele arketypekartet

De seks første casene dekket seks typer. Kartleggingen i
`docs/case-research/01-kanon.md` lister tolv, og de resterende seks — kostnadskutt,
ny lansering, turnaround, PE-vurdering, konkurrentrespons og offentlig sektor —
manglet helt. Nå finnes alle, og de tre mest testede typene har flere enn én.

| Type | Antall | Mekanismene som skilles |
|---|---|---|
| Lønnsomhet | 4 | prisøkning · **miksforskyvning** · **forsinket prisgjennomslag** · **ett tapssegment** |
| Prising | 2 | alternativkostnad som tak · **struktur framfor nivå** |
| Vekst | 2 | inntekt per kunde faller · **kanalen er mettet** |
| Operations | 2 | flaskehals i linja · **variabilitet og kø** |
| Markedsinngang · M&A · Kostnadskutt · Ny lansering · Konkurrentrespons · Offentlig · Turnaround · PE-vurdering | 1 hver | — |

Regelen ved påfyll: **en ny case av en type som finnes, må ha en annen mekanisme.**
En tredje lønnsomhetscase der marginen faller fordi prisen falt, lærer ingenting
den første ikke lærte. Derfor står mekanismen, ikke bare typen, i tabellen over.

Regnetrinnet skal bære en innsikt utover tallet. Noen eksempler på formen:
kuttet av 60 årsverk *koster* 18 millioner fordi kapasiteten faller under
arbeidsvolumet; segmentet som «taper 30 millioner» bidrar med *pluss* 30 når man
måler på det som faktisk forsvinner; PE-fondets verdiskapingsplan summerer til
nøyaktig det avkastningskravet krever, og har dermed null margin.

## Market sizing er en egen bolk

Casebiblioteket er delt i **Intervjucaser** og **Market sizing**, styrt av feltet
`kategori`. De to er ulike øvelser: den ene diagnostiserer et problem, den andre
bygger et tall av forutsetninger man setter selv.

Market sizing-casene har en annen trinnrekkefølge enn de vanlige — tre
regnetrinn på rad i stedet for ett — og trinnene bærer egne korttitler, siden
raden ellers sa «Regning» tre ganger.

**Tre former, alle representert:**

| Form | Tredje regnetrinn er | Antall |
|---|---|---|
| Tilbud møter etterspørsel | kombinasjonen | 5 |
| Topp-ned med segmentering | en **følsomhetssjekk** | 4 |
| Bunn-opp fra én enhet | en **kryssjekk motsatt vei** | 4 |

> [!info] Arketypen er brukerens egen intervjucase
> «Hvor mange bensinstasjoner finnes i USA?» fra Implement. Hele casen avgjøres
> av utnyttelsesgraden: åtte pumper åpent seksten timer kan i teorien ta 1 536
> biler i døgnet, men en stasjon tar rundt 154. Den er en **dekningsbedrift**,
> ikke en gjennomstrømningsbedrift — og det er nettopp derfor det finnes så mange
> av dem. Ved ti prosent lander kjeden på 147 000 mot et faktisk antall på
> omtrent 145 000.

Den beste av de nye er `ms-bruktbil-sprik`, der bunn-opp gir 46 milliarder og
topp-ned 96. Riktig svar er 79 — hverken det ene, det andre eller snittet — og
hele casen er å forklare hvorfor de to veiene teller ulike ting.

## Struktureringsdrillen: velg type, se treet

Drillen åpner med en typevelger — de åtte casetypene med antall bak hver — og ett
gjennomgått eksempel. Da kan man trene målrettet på den typen man er svakest på,
i stedet for å ta det som tilfeldig kommer.

**Modellstrukturen tegnes som et tre**, ikke som en punktliste. Poenget med
øvelsen er å bygge en nedbrytning, så fasiten må vise en nedbrytning. Rotnoden er
siste setning i prompten, som alltid er klientens spørsmål; grenene splittes på
«Etikett: forklaring», en form 176 av 208 grener allerede hadde. Treet er loddrett
med stamme til venstre, så det også holder på 277 piksler.

Klassifiseringen avdekket at **estimering hadde null prompter** av 34. Tre er
skrevet til: varmepumpemarkedet, treningssentre og ladepunkter. Ti av de 34 er
merket som skjønn, og fire av dem ligger i grenselandet Offentlig mot Lønnsomhet
— den ene grensen kapittel 5 selv er vagest på.

## Rekkefølgen: undervis før du krever

Første versjon av planen ba deg kjøre en hel case i modul 1 — med et
struktureringstrinn — mens bare k0 og k1 var lest. Ingen av dem lærer deg å
strukturere. **Det aller første kurset ba om, var det det ikke hadde undervist i.**

k3 er derfor flyttet til modul 1, og arbeidslista sier eksplisitt «Les kapittel 3
FØR du starter casen». Planen gikk fra 12 til 11 moduler da modul 3 og 4 ble slått
sammen.

«Strukturer!» hadde samme problem i det små: den ba om produksjon uten å ha vist
ett eneste eksempel. Den åpner nå med én gjennomgått nedbrytning fra
`lyn.strukturIntro`, som kan hoppes over med ett trykk.

> [!warning] Sjekk dette for hvert nytt fag
> Gå gjennom planen modul for modul og spør: **krever denne modulen en ferdighet
> som ennå ikke er undervist?** Det er lett å bygge planen etter fagets logikk i
> stedet for etter leserens.

## Aritmetikken er kontrollert uavhengig

Alt tallinnhold er regnet gjennom på nytt etter at agentene leverte:

- 67 uttrekkbare regnestykker i Finn feilen — null feil
- alle sju casenes figurer, regnetrinn og sanity-sjekker, for hånd — null feil
- tabellsummer og andeler i figurbanken — null feil
- tre estimeringskjeder regnet helt gjennom — null feil
- de tolv nye intervjucasene, ~150 kontroller i Python — **tre feil**, alle i
  fasittekst som agentenes egne kontroller hadde godkjent: to påstander om at to
  ulike tiltak ga «samme kroner» når de ikke gjorde det, og «halvparten» om noe
  som var to tredeler

**Strukturen sjekkes maskinelt.** `tools/case-sjekk-caser.js` laster
casefil(ene), teller opp fordelingen på type, nivå og stil, og stopper på det
motoren ellers bare ville tegnet feil i stillhet: manglende `sp`/`fasit`/`felle`,
regnetrinn uten `svar` eller `enhet`, exhibit uten `table.data`, markup i felter
som escapes, for korte idélister, dupliserte id-er og feil trinnrekkefølge.
Rekkefølgekravet er ulikt for de to bolkene — market sizing kjører legitimt tre
regnetrinn på rad og tåler videre `toleranse` (tak 0,3 mot 0,05).

> [!warning] Kontrollskript kan lyve begge veier
> De to første kontrollskriptene mine ga 21 og 25 «avvik». Alle var falske:
> uttrekkeren forsto ikke enheter (`= 120 mill.`), prosent (`= 20 %`) eller
> kjedede ledd (`a × b × c = d = e`). Tredje versjon, som sammenligner mot flere
> skalaer samtidig, ga null. **Et kontrollskript som finner feil, må selv
> kontrolleres før man tror på det.**

## Fasitposisjon er en gjenganger

Estimeringsbanken hadde fasiten på alternativ B i 40 av 57 runder. `mcqRunner`
stokker ikke alternativene, så drillen ville vært gjettbar på posisjon — nøyaktig
samme skjevhet som ble funnet i [[FIE402 Corporate Finance]]. Sjekk fordelingen
hver gang det produseres flervalgsinnhold.
