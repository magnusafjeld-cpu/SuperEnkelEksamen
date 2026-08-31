---
tags: [fag, case, innhold]
oppdatert: 2026-08-30
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
| Studieplan | **12 moduler · 14 timer** · 32 arbeidsoppgaver med lenke inn i øvelsen |
| Caser | **7** · 42 trinn · alle sju casetypene · 230 minutter trening |
| Struktureringsprompter | **34**, hver med modellstruktur, hypotese og felle |
| Finn feilen | **34** utregninger, 7 av dem uten feil |
| Les grafen | **24** figurer — 18 SVG, 6 tabeller, 17 med innebygd felle |
| Bygg estimatet | **14** kjeder · 57 runder |
| Mock-videoer | **70**, dobbeltverifisert · 103 stopp-punkter · 34 timer |
| Historieporteføljen | 4 dimensjoner, 12 sonder, terskel 8 |
| Lynelementer totalt | **152** |
| Quiz | **50** (41 flervalg / 9 kortsvar), alle 16 kapitler dekket |
| Flashcards | **64** forfattet + 44 auto-genererte fra tallarket |
| Dybdetrening | **115** i fire banker: grunnlaget 20, struktur 25, tall 40, framføring 30 |

**Manualen er ferdig.** 21 300 ord mot kursplanens tak på 20 000 — litt over, men
forholdet holder: rundt 110 minutters lesing mot 625 minutter drill i studieplanen,
altså under en femdel av tiden, som var det ordtaket egentlig skulle sikre.

`tools/case-bygg-manual.py` setter manualen sammen av kapittelfragmenter og
normaliserer deltitlene. Manualen er sannhetskilden når den først er bygget.

## Aritmetikken er kontrollert uavhengig

Alt tallinnhold er regnet gjennom på nytt etter at agentene leverte:

- 67 uttrekkbare regnestykker i Finn feilen — null feil
- alle sju casenes figurer, regnetrinn og sanity-sjekker, for hånd — null feil
- tabellsummer og andeler i figurbanken — null feil
- tre estimeringskjeder regnet helt gjennom — null feil

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
