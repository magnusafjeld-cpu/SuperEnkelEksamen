---
tags: [fag, fie402, innhold]
oppdatert: 2026-09-22
---

# FIE402 Corporate Finance

Fag nummer to. Id `fie402`, aksentfarge `#12805c` (grønn), logo «CF».
**Innholdet er på engelsk, appen rundt er norsk** — se [[Beslutningslogg]].

## Kursfakta

NHH, 7,5 studiepoeng, undervisningsspråk engelsk, karakter A–F på totalsummen.
**3 timers lukket skoleeksamen, penn og papir.** Kalkulator og én tospråklig
ordbok tillatt — merk kontrasten til [[SAM3 Makroøkonomi]], der kalkulator var
forbudt. Besvares på engelsk. To obligatoriske innleveringer for kursgodkjenning.

Lærebok er Berk & DeMarzo 6. utg., men **Magnus har den ikke** — manualen er
skrevet for å stå helt på egne ben.

## Eksamensformatet er lagt om, og det styrer alt

Kursansvarlig høsten 2026 er **Andrey Kurbatov**, som står bak eksamenene høst
2024 og høst 2025. De brøt med alt som var før:

| | 2015–vår 2024 | Kurbatov (H2024, H2025) |
|---|---|---|
| Flervalg | 10 spørsmål, 12–33 % av poengene | **avskaffet** |
| Struktur | 4–5 problemer, 180–240 poeng | **6 oppgaver, 100 poeng** |
| Verbale oppgaver | innbakt | **to rene drøftingsoppgaver à 12 p** med setningsbudsjett |
| Eierstyring | perifert | **garantert egen oppgave** |
| Asymmetrisk info | i 8 av 11 sett | **fraværende i begge** |

Kurset trener derfor Kurbatov-formatet, ikke gjennomsnittet av elleve år. ~1,8
minutter per poeng er det reelle tidspresset, og flertrinnsoppgavene bygger på
hverandre, så én regnefeil forplanter seg.

## Hva som faktisk kommer (11 sett kartlagt, 2015–H2025)

**Hver eneste gang:** unlever/relever beta med twin firm og CAPM · MM I og II
med rekapitalisering · WACC-metoden **og** APV-metoden på samme case.

**Nesten hver gang:** realopsjoner (fast 20-poengspost siden 2017) · M&A med
aksjebytte · gjeld og EK som opsjoner · Myers-Majluf og pecking order.

**Sjeldne, men billige å dekke:** konvertibel gjeld, FTE, leasing, durasjon,
auksjoner, DDM, coinsurance.

Sensor belønner gjennomgående at du **navngir mekanismen** og at du kjører
**konsistenssjekkene**: WACC-verdi = APV-verdi, vektet beta = β_U, samlet gevinst
til kreditorer og aksjonærer = prosjektets NPV.

## Formelarket

Utleveres på eksamen, og er identisk med `FIE402_Corp_course_files/Formula sheet.docx`:
FCF, evighetsrenter, CAPM, rE = rU + (D/E)(rU − rD), β_U-vekting, WACC før og
etter skatt, binomisk replikering med ρ, og aksjebytte/bytteforhold.

**Ikke på arket — må pugges:** V^L = V^U + PV(TS), reglene for hvilken rente som
diskonterer skatteskjoldet, D_t = d·V_t^L, put-call-paritet, βE = N(d1)(V/E)βU,
durasjon, hele Myers-Majluf-oppsettet og alt om realopsjoner. **Black-Scholes og
N(d)-tabellen ble fjernet fra arket i 2021** — derfor tester eksamen nå bare
intuisjonen rundt Black-Scholes, ikke utregningen.

## Kursets konvensjoner

Disse skiller seg mellom lærebøker, og hele manualen følger kursets valg:

- β_U vektes **uten** skatt: β_U = [E/(E+D)]β_E + [D/(E+D)]β_D
- Pre-tax WACC = r_U
- Skatteskjold diskonteres med **r_U** ved konstant D/E, med **r_D** (eller r_f)
  ved fast permanent gjeld

## Struktur

**Manualen `FIE402_Manual.html`: 30 seksjoner (k0–k29).**

| Del | Kapitler |
|---|---|
| Part 0 · Foundations | k0–k5 |
| Part I · Capital structure | k6–k11 |
| Part II · Information and issuance | k12–k14 |
| Part III · Payout policy | k15–k16 |
| Part IV · Valuation with leverage | k17–k20 |
| Part V · Options | k21–k25 |
| Part VI · Transactions and governance | k26–k27 |
| Part VII · Exam craft | k28 |
| Reference | k29 — formelsamlingen |

**k29 er referansekapitlet**, ikke k22 som i SAM3. Det er derfor manifestet setter
`manual.refSections = { formulas: "k29" }`. De 80 radene der blir automatisk til
flashcards og mater to lynspill — **rekkefølgen er permanent**, se [[Fallgruver]].

**Studieplanen: 24 moduler, `plan.mode = "modules"`.** Ingen datoer: «i dag» er
første ufullførte modul. Modul 1–20 er læring, 21–24 er ren eksamenstrening.
Milepæler for innlevering 1 (modul 10) og innlevering 2 (modul 19).
Samlet estimat ~82 timer.

**Seks dybdetreningsbanker** som følger delene: `foundations` · `capital` ·
`information` · `valuation` · `options` · `transactions`.

## Kapitteloppgaver

Ett sett per kapittel, å ta rett etter lesingen. **92 oppgaver over 27 kapitler,
817 poeng, 24,5 timer.** Alle kapitler med fagstoff er ferdige.

> [!important] Antall oppgaver følger eksamensvekt, ikke en fast norm
> `examWeights` i manifestet gir hvert kapittel 1–5 med begrunnelse, utledet av
> frekvenstabellen i kursplanen men **vektet mot Kurbatov-settene**, siden han
> setter eksamen i 2026. Vekt 5 gir fem oppgaver, vekt 4 gir tre til fire, vekt 3
> gir tre. `tools/sjekk-kapitteloppgaver.js` leser tabellen, så et kapittel med
> vekt 3 og tre oppgaver ikke lenger meldes som for tynt.
>
> Vektingen flytter to kapitler tydelig: **k23 Black-Scholes** er bare 2 av 11
> numerisk, men H2025 E1 var nøyaktig dette verbalt (12 poeng), så vekt 4.
> **k24 gjeld og EK som opsjoner** er 8 av 11 historisk og ga 90 poeng i 2015 P4,
> men er fraværende hos Kurbatov, så vekt 3. Samme forbehold på k12.

Uten vekting ville fem oppgaver på alle 28 kapitlene blitt ~34 timer, altså 44 %
av hele studieplanen på én modul, oppå 338 quizspørsmål, 458 dybdespørsmål og
20 timer eksamenssett. Det var begrunnelsen for å vekte.

> [!important] Formatet er åpent, ikke flervalg
> FIE432 bruker samme modul med flervalg og minuspoeng. FIE402 eksamineres som
> seks åpne oppgaver, så oppgavene er `open: true` med `solution` og `criteria`:
> du skriver svaret, åpner løsningen, og gir deg selv poeng i fire trinn av maks.
> Motoren skifter regelkort, fremdriftslinje og resultatkort når hele settet er
> åpent. Se [[Moduler og visninger]].

Kriteriene er skrevet mot det sensorveiledningene faktisk belønner: metoden sagt,
utregningen vist («no calculation, no points»), mekanismen navngitt, og
konsistenssjekken kjørt. Deloppgavene har poeng i parentes som på eksamen, og de
verbale har setningsbudsjett.

**Hver oppgave er kontrollregnet to ganger** — av forfatteren, og av meg
uavhengig etterpå. De tre kontrollene som betydde mest:

- **k4** har β<sub>D</sub> = 0-fellen riktig vei (spek 9.4): den understater
  β<sub>U</sub>, senker WACC og **overvurderer** firmaet, 700.93 mot 655.02.
- **k12** har I i nevneren (spek 9.4): α = 90/444 = 0.2027, ikke 90/354 = 0.2542,
  og overføringsidentiteten q × tap = (1−q) × gevinst går opp. Pooling flytter
  verdi, separating ødelegger den, ikke omvendt (spek 9.2c).
- **k19** fant at **feilens fortegn er fortegnet på netto låneopptak**: glemmer du
  gjeldsjusteringen på et selskap som nedbetaler, overvurderer du egenkapitalen
  med 34 %; på et som låner mer, undervurderer du den med 18 %. Det river bort
  forsvaret «det går omtrent opp i opp». Og den lille feilen er den farlige: å
  fryse gjelden på D₀ koster bare 0,59 %, innenfor det som leses som avrunding.
- **k9-4** viser at reforhandling **ikke** løser risikoskifting: i hele
  intervallet K′ ∈ [67.5, 72.5] foretrekker aksjonærene fortsatt det risikable
  prosjektet, så det trengs en håndhevbar covenant.

> [!tip] En agent fant en feil i manualen
> 22.2 sa at B = −40.00 i stedet for −38.4615 «overpriser callen med 1.5385».
> Retningen var snudd: 50.0000 − 40.0000 = 10.0000 ligger *under* 11.5385, så den
> underpriser. Rettet, og verifisert uavhengig før rettingen.

Introteksten på `/kapitteloppgaver` følger formatet: er alle settene i faget
åpne, sier den penn og papir og sensorkriterier; ellers står flervalgsteksten
FIE432 trenger. Ett felles avsnitt ville vært feil for det ene av fagene.

Bygges med `tools/bygg-kapoppgaver.py fie402` fra fragmenter i
`fag/fie402/_kapoppg/`, fordi kapitlene skrives parallelt. Kontrolleres med
`tools/sjekk-kapitteloppgaver.js fie402`, som godtar begge oppgavetypene.

**k28 får ingen oppgaver med vilje.** Eksamenshåndverk trenes ved å kjøre ekte
sett på klokka, ikke ved å lese om det, og det ligger i Eksamenssett.

> [!note] Kontrollen teller poeng i tillegg til antall
> k20 er hele verdsettingskjeden i to lange oppgaver — 37 poeng, mer enn noe
> femoppgaverskapittel — og ble meldt som for tynt fordi kontrollen bare talte
> oppgaver. Nå innfrir et kapittel vekten sin med enten antallet eller
> poengsummen, så færre og lengre oppgaver er et lovlig valg.

## Kildene

Alt ligger i `FIE402_Corp_course_files/`: 20 PDF-er med eksamener og
løsningsforslag, syllabus for 2026, formelarket og NHHs infoside.

> [!warning] To feller i kildematerialet
> **`2024 - S.pdf` hører ikke til `2024.pdf`.** Løsningsfila er fasit til *vår*
> 2024, mens eksamensfila er *høst* 2024. Det er altså 11 eksamenssettinger, ikke 10.
>
> **`2015 - S.pdf` er en ren skanning** uten tekstlag, og deler av `2016 - S.pdf`
> likeså. `2021 - S.pdf` mangler løsning på oppgave 3 og 4, og 2022 og 2023 har
> ingen fasitfil i det hele tatt. For disse skrives løsningene fra bunnen.
> Vil man lese ut de skannede sidene, må `brew install poppler` kjøres først.

## Arbeidsdokumentene som styrer byggingen

To filer i `docs/` er kontrakten alt innhold skrives etter. **Les dem før du
skriver et eneste kapittel til:**

- `docs/fie402-forfatterspek.md` — HTML-formatet parseren krever, notasjonstabellen,
  kursets konvensjoner, stil og lengde, og et eget kapittel med lærdommene fra
  kontrollen av bølge 1
- `docs/fie402-kursplan.md` — kapittelkartet k0–k29 med hva hvert kapittel skal
  dekke, pluss hele eksamens-DNA-en: frekvenstabellen, formelarket, og hva
  sensorveiledningene belønner

Kapitlene skrives som frittstående `<section id="kN">`-fragmenter og settes inn i
`FIE402_Manual.html`. **Manualen er sannhetskilden** når den først er satt sammen —
fragmenter er bare en arbeidsform for å skrive flere kapitler i parallell.

## Status: ferdig

| | |
|---|---|
| Manualen | **30 kapitler · 109 000 ord** · alle uavhengig tallkontrollert |
| Studieplan | **25 moduler · 78 timer**, estimatene regnet av faktisk innhold |
| Eksamenssett | **alle seks** · 32 oppgaver · 147 deloppgaver |
| Quiz | **338** (246 flervalg / 92 kortsvar) |
| Flashcards | **268** forfattet + 80 auto-genererte formelkort |
| Kapitteloppgaver | **92 åpne oppgaver** over 27 kapitler · 817 poeng · 24,5 t |
| Aktiv læring | **208** oppgaver |
| Dybdetrening | **458** i seks banker |
| Lynlæring | **233** elementer, med fremdriftsport |
| Ordliste | 25 økonomer, 67 symboler |

**Lynøkta følger fremdriften.** Manifestet setter `lynFollowsProgress`, så minispillene
henter bare fra kapitler du har nådd — 3 spill er åpne i modul 1, alle 13 fra modul 6.
Formeltabellene måtte kapittelmerkes særskilt via `formulaTableChapters`, siden de ikke
bærer noen merking selv. Se [[Moduler og visninger]].

**Kapittelhenvisninger merkes ved visning.** Manualen skriver dem som bare «k17», som
ikke sier noe til en leser som ikke har vært der. Motoren bytter dem ut: bakover blir
det en stille lenke, framover får den tittelen og merket «senere». Se
[[Moduler og visninger]].

**Manualen ble tre ganger større enn planlagt.** Målet var 35 000 ord. Ordgrensen ble
19. august først strammet til 1 400 per kapittel og deretter fjernet helt, med
beskjeden *«pass først og fremst på at pensum er dekket»*. Spesifikasjonen sier nå at
et kapittel som er kort fordi det utelot stoff, er mislykket.

**Studieplanens tidsestimater regnes av innholdet**, ikke gjettes: `tools/rekalibrer-plan.py fie402`
leser manualen og setter `estMinutes` av ordantall (60 ord/min), antall gjennomregnede
eksempler (15 min hver) og en fast drillpost. Kjør den på nytt hvis kapitler endres.
Det var den som avslørte at M&A og eierstyring hadde havnet i samme modul på 405
minutter; den ble delt, og planen gikk fra 24 til 25 moduler.

## Hva kontrollen fant

En uavhengig agent regnet om hvert eneste tall i k0–k5 og k29 og verifiserte hvert
plottede punkt i alle ni figurene. **All aritmetikk var riktig.** Alle feilene var
*påstander om* matematikken, eller motsigelser mellom kapitler skrevet parallelt:

- formelsamlingen hadde snudd fortegnet på hva β_D = 0 gjør (understater β_U, ikke
  overstater) — og motsa dermed k4 direkte
- de «fem konsistenssjekkene» i k29 var ikke de samme fem som k0 nummererer
- Myers-Majluf-formelen manglet det innskutte beløpet i nevneren
- én oppdiktet eksamensreferanse blant tjueen ekte

Alle er rettet, og lærdommene er skrevet inn i forfatterspesifikasjonen som et eget
kapittel, slik at bølge 2–5 ikke gjentar dem. Se [[Slik oppdaterer du hjernen]] for
prinsippet: en kontroll som bare bekrefter, er ingen kontroll.

## Eksamenssettene i appen

Gjengis ordrett i modulen [[Eksamenssett-modulen]], med egne fullstendige
løsninger. Ordrett gjengivelse er et bevisst valg — se [[Beslutningslogg]] — og
betyr at NHHs oppgavetekst ligger på den offentlige Pages-siden.
