---
tags: [fag, fie402, innhold]
oppdatert: 2026-09-28
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

**Arket ligger i appen**, bak knappen nederst til høyre på alle sider, ordrett
fra docx-fila og med listen under. Se [[Moduler og visninger]].

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

Ett sett per kapittel, å ta rett etter lesingen. **94 oppgaver over 27 kapitler,
866 poeng, 26 timer.** Alle kapitler med fagstoff er ferdige.

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

**Hver oppgave er kontrollregnet tre ganger**: av forfatteren, av meg
uavhengig etterpå, og i en blind gjennomgang (se under). Noen kontroller som betydde mye:

- **k4** har β<sub>D</sub> = 0-fellen riktig vei (spek 9.4): den understater
  β<sub>U</sub>, senker WACC og **overvurderer** firmaet, 700.93 mot 655.02.
- **k12** har I i nevneren (spek 9.4): α = 90/444 = 0.2027, ikke 90/354 = 0.2542,
  og overføringsidentiteten q × tap = (1−q) × gevinst går opp. Pooling flytter
  verdi, separating ødelegger den, ikke omvendt (spek 9.2c).
- **k19**: å glemme gjeldsjusteringen i FCFE flytter egenkapitalen med **minus
  nåverdien av netto låneopptak**. Et selskap som nedbetaler blir overvurdert
  (34 % i k19-2), et som låner blir undervurdert (18 % i k19-3). Feilen går altså
  *mot* fortegnet på låneopptaket. Oppgavene sa det motsatte fram til
  gjennomgangen. Den lille feilen er den farlige: å fryse gjelden på D₀ er bare
  en tidsforskyvning og koster under 1 %.
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

## Kjernepensum

Lagt inn 28. september 2026: det viktigste i faget på én kveld, som egen lesevei
ved siden av manualen. Modulen er beskrevet i [[Moduler og visninger]], valgene
i [[Beslutningslogg]], og forfatterspesifikasjonen er
`docs/fie402-kjerne-spek.md`.

| Del | Tittel | Kondenserer |
|---|---|---|
| kj0 | The exam in one page | k0, k28 |
| kj1 | Cost of capital and the twin-firm routine | k3, k4 |
| kj2 | Modigliani-Miller, recapitalisations and payout | k6, k15, k16 |
| kj3 | Taxes, the interest tax shield and the trade-off | k7, k8 |
| kj4 | Valuing a levered firm: WACC, APV and FTE | k2, k17–k20 |
| kj5 | Agency costs of debt: risk shifting and debt overhang | k9–k11 |
| kj6 | Asymmetric information and raising capital | k12–k14 |
| kj7 | Options: payoffs, parity, binomial pricing, Black-Scholes | k21–k23 |
| kj8 | Debt and equity as options, and credit risk | k5, k24 |
| kj9 | Real options | k25 |
| kj10 | Mergers and acquisitions | k26 |
| kj11 | Corporate governance | k27 |

**13 100 ord, 39 sjekker og 11 minicaser.** Omtrent 2 timer lesing, 4 t 30 min
med alt. Del 1–4 er verdsettingsmaskinen og leses i rekkefølge; resten står
alene. Myers-Majluf, gjeld og EK som opsjoner og emisjoner har full behandling
etter Magnus' valg, men er merket som fraværende i begge Kurbatov-settene.

Fem agenter skrev delene fra manualen. Alle tall ble regnet om to ganger: av meg,
og i en blind løsning av minicasene fra oppgaveteksten alene. Sjekkene ble
besvart blindt, 39 av 39. I tillegg ble hver påstand kontrollert mot manualen, og
dekningen målt mot H2024 og H2025: en leser med bare kjernepensum når anslagsvis
85–89 av 100 poeng på H2024 og nesten alt på H2025. Det gjennomgangen fant:

- **En minicase som tillot to svar** (kj9 b): verdien av informasjon ble regnet
  mot å bygge i dag, mens oppgaven selv hadde vist at det beste alternativet er å
  vente. Da er studien bare verdt kostnaden ved utsettelsen, 25,45 og ikke 240.
  Spørsmålet sier nå «bygg i dag eller aldri», og teksten i kj9 har fått
  forbeholdet.
- **Fasiten var det lengste alternativet i 26 av 39 sjekker.** Rettet til 10 av
  39; se [[Fallgruver]] 7y.
- **Én «andre rute» som var samme likning** (kj10): spreaden i dealsannsynligheten
  er long-short-posisjonen uten innskuddet. Merket som en raskere vei, ikke en
  uavhengig sjekk.

- **Betingelser som falt bort i nedkortingen**, 14 steder. Eksempler: «skatter
  favoriserer tilbakekjøp» uten «når τ<sub>d</sub> &gt; τ<sub>g</sub>, for skattepliktige»,
  «pre-announcement prices in the failure branch» uten «når oppgaven sier at
  kursene går tilbake», og τ<sub>c</sub>D som skjoldets tak uten «for gjeld som ikke
  vokser». To påstander om kort løpetid og sikringskrav i covenants sto ikke i
  manualen og ble strøket.
- **Hull med eksamensverdi, tettet:** refinansiering inne i en rekapitalisering
  (H2024 E3: bare D<sub>ny</sub> − D<sub>gammel</sub> går til aksjonærene), realopsjon
  med renten som usikkerhet (H2024 E6), annuiteten på pugglista, gjeld mot
  egenkapital under asymmetrisk informasjon (2021 P1), at aksjonærer kan tape på å
  kjøpe tilbake gjeld, og oppkjøpsgrunner fordelt på kjøper og mål (H2024 E1).
  Kj0 fikk en «Must know»-boks med de fem sjekkene, så hovedpunktsiden definerer
  dem.

> [!warning] Mulig feil i eksamenssettets løsning på H2024 E6(c)
> Løsningen i `fag/fie402/sett.js` regner ρ = 0,7197 fra verdien i dag av
> kontantstrømmene år 1–10 og verdiene om ett år av kontantstrømmene år 2–11.
> Konsistente oppsett gir rundt 0,46. Det finnes ingen offisiell fasit. Ikke
> rettet ennå; se [[Åpne spørsmål og neste steg]]. Kjernepensum beskriver bare
> prinsippet.

Agentene fant i tillegg elleve feil i manualen og kursplanen, alle rettet:
kursplanen manglet I i nevneren til α; en setning i 10.4 var avkuttet; 26.3 og
k29 sa at identiteten NPV<sub>A</sub> + NPV<sub>T</sub> = S kan finne en feil i
x eller y (den holder for alle x og y); k29-raden for dealsannsynlighet
manglet (1 + r<sub>f</sub>), som er nettopp feilen H2025-fasiten navngir; 18.3 og 18.4
kalte τ<sub>c</sub>D skjoldets tak også for gjeld som vokser; 15 sa to steder at H2024 E3
mangler utbyttedelen (den har den, det nye er at gammel gjeld innfris først);
6.4 sa at ingenting beveger seg ved gjennomføringen, men kursen faller med
utbyttet; 16.3 lot skatteargumentet snu allerede ved like satser; 17.3 sa at
sjekk 2 fanger en feil β<sub>U</sub>, men den regner bare om; 23.5 kalte implisitt
volatilitet markedets prognose og motsa sin egen advarsel; og en modellbesvarelse
i 28.5 brukte forskjøvet styre uten å si at det er amerikansk rett.

## Gjennomgangen, september 2026

Alle 92 oppgavene ble gått gjennom på nytt etter at settet var ferdig. Fem
agenter løste hver sin del **blindt**, fra oppgaveteksten alene, før de fikk se
løsningen. Samtidig gikk en maskinell sveip over alle oppgavene: poeng mot
deloppgaver, sjekknumre, eksamenssitater mot PDF-ene, tall i kriteriene mot
løsningen, HTML og mobilbredde.

**Regnestykkene holdt nesten overalt. Feilene lå i påstandene om dem**, akkurat
som i manualrevisjonene (forfatterspek §9). De viktigste:

- **Sjekker solgt som uavhengige som er identiteter.** Et eksempel er
  S − premie når målselskapet handles til budprisen (k26-3). Et annet er å
  verdsette egenkapitalen fra egen kontantstrøm når r<sub>E</sub> kom fra MM II
  (k6-5): det er MM II omskrevet, og det holder for enhver r<sub>D</sub>.
- **Lokale «Check 1/2»** (k16-1, k22-4) som kolliderer med de fem faste
  sjekkene. k6-1 kalte pre-tax WACC = r<sub>U</sub> for «check 1».
- **Amerikansk selskapsrett på norske ASA-er** (k27-1, k27-3). Daglig leder kan
  ikke sitte i styret (asal § 6-1), generalforsamlingen kan avsette styremedlemmer
  når som helst (§ 6-7), og en styrevedtatt giftpille etter et varslet bud er
  forbudt (vphl § 6-17). Sjekket på Lovdata. k27-3 er flyttet til Delaware, med
  den norske regelen som et eget poeng.
- **Et spørsmål som ikke stemte med sitt eget svar** (k6-4c: proratarisk tender
  der alle kan tilby, men svaret forutsatte ulik deltakelse) og **en oppgavetekst
  som tillot to svar** (k20-1: skal gjelden som trekkes fra være 700 eller
  837?). Rettet i teksten, ikke i svaret.
- **Halen etter år 20 kalt en opsjonsverdi** (k1-1). Den er det avkortingen
  koster.

**Fire agentpåstander ble avvist** etter at kildene var sjekket. H2025 E4(a)
*er* gjeldsbetaen. 2015 P4 *er* den kjeden k24-2 sier. H2025 E5(b) *er* en
umiddelbar markedsundersøkelse der uinformert beslutning er å avslå. Og
q × tap = (1 − q) × gevinst i k12-3 er nullprofittbetingelsen, ikke en identitet.
Se [[Fallgruver]] 7t.

**Fire nye oppgaver fyller hull med eksamensbelegg:**

| Oppgave | Hvorfor |
|---|---|
| **k6-6** (18 p) erstatter k6-1 og k6-2 | H2024 E3 og H2025 E3 starter begge fra et firma som *allerede* har gjeld. Det gjorde ingen av de gamle |
| **k20-3** (18 p) | Kursplanen sier k20 skal ha H2025 E4s ni steg. Ingen oppgave hadde det. Denne låner i år 1 der H2025 nedbetalte, så «repay» på rams feiler |
| **k24-4** (10 p) | CDS hadde null oppgaver, men V2024 P3 var 28 poeng på nettopp det |
| **k10-4** (8 p) | Feilen fasitene navngir, at aksjonærer tror de tjener på å redusere gjeld, var ikke testet |

k1-1 gikk fra 10 til 20 poeng (arbeidet var 40 minutter, ikke 18), k7-4 fra 6 til
8 og k8-2 fra 8 til 9.

**Manualen hadde de samme feilene på 22 steder**, og de ble rettet samtidig
for at oppgave og manual ikke skal motsi hverandre. k20 og k19 kalte
WACC = APV «a real one» og «genuinely independent», i strid med spek §9.2b.
§18.6 sa at APV-delen gir få poeng, men H2024 E5(e) gir 6 av 20. Lokale
sjekknavn i k5, k22 og k23 ble rettet, og amerikanske styreregler i k27 fikk
jurisdiksjon.

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
| Kapitteloppgaver | **94 åpne oppgaver** over 27 kapitler · 866 poeng · 26 t |
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
