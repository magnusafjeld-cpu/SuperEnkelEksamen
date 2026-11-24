---
tags: [fag, fie402, innhold]
oppdatert: 2026-11-24
---

# FIE402 Corporate Finance

Fag nummer to. Id `fie402`, aksentfarge `#12805c` (grønn), logo «CF».
**Innholdet er på engelsk, appen rundt er norsk** — se [[Beslutningslogg]].

## Kursfakta

NHH, 7,5 studiepoeng, undervisningsspråk engelsk, karakter A–F på totalsummen.
**Eksamen 7. desember 2026: 3 timers lukket skoleeksamen, penn og papir.** Kalkulator og én tospråklig
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
fra docx-fila og med listen under. Hver formel har en (i) som forklarer hva den
er og når den brukes, på engelsk og bare med eksamenshenvisninger fra kursplanen.
Forklaringene er ikke en del av arket. Se [[Moduler og visninger]].

**Ikke på arket, må kunnes:** V^L = V^U + PV(TS), reglene for hvilken rente som
diskonterer skatteskjoldet, D_t = d·V_t^L, put-call-paritet, durasjon, hele
Myers-Majluf-oppsettet og alt om realopsjoner. **Black-Scholes regnes ikke på eksamen.**
Kurbatov sa det minst fire ganger i oppsummeringsforelesningen 2026: bare intuisjon
(hva σ, T, r, S og K gjør med prisen, amerikansk mot europeisk), og N(d1) trenger ikke
forklares. β_E = Δ(V/E)β_U står derfor som intuisjon, ikke som pugg. **Kursets nye
formelark (november 2026) har én linje til: Δ = (C_u − C_d)/(S_u − S_d).**

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

> [!note] H2024 E6(c) er avgjort av Kurbatovs nøkkel (14. november 2026)
> Appens gamle løsning regnet ρ = 0,7197 fra verdien i dag av kontantstrømmene år 1–10
> og verdiene om ett år av kontantstrømmene år 2–11, altså en inkonsistent tvilling.
> Nøkkelen (`2024 - S.pdf`) bruker en annuitet på 1 i 11 år og får **ρ = 0,4634** og
> ventopsjonen 0,351. Regelen: S0, Su og Sd må prise samme kontantstrøm, og Su og Sd er
> verdien på dato 1 inklusive en eventuell betaling da. Løsningen, realopsjon-12 og -13,
> opsjoner-14, kj9 og kapitteloppgave k25-5 er rettet.

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

**Tekstingen fra alle forelesningsopptakene** (hentet fra Panopto 22. november 2026) ligger
i `NHH/7. Semester/FIE402 Corporate Finance/Forelesninger/Teksting fra Panopto/`, én fil
per opptak med lysbildetitler og teksting med tidsstempler. Det er 17 av 18 opptak:
Problem Set 3 (14.10) har ingen teksting. Bruk dem som kilde når du vil vite hva
Kurbatov faktisk sa. Les fram til det du trenger i stedet for å gjengi dem.

> [!warning] To feller i kildematerialet
> **Vårfasiten fra 2024 heter nå `2024V - S.pdf`.** Fram til 14. november 2026 lå den
> under navnet `2024 - S.pdf`, selv om `2024.pdf` er *høst* 2024. Da kom Kurbatovs
> egen nøkkel til høsten 2024 i en ny nedlasting, og den ligger nå som `2024 - S.pdf`.
> Det er altså 11 eksamenssettinger, ikke 10, og begge 2024-settene har fasit.
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
| Eksamenssett | **alle seks** · 32 oppgaver · 147 deloppgaver. **12 prøveeksamener** i Kurbatov-formatet (prove1–3 fra oktober, prove4–12 fra prediksjonen 14. november). **34 deleksamener** («Per del»): 25 laget av de 72 prøveoppgavene og 9 «Mest forventet» med 24 egne oppgaver (23. november). **7 sett «Hintet i forelesning»** med 26 egne oppgaver (24. november) |
| Quiz | **338** (246 flervalg / 92 kortsvar) |
| Flashcards | **528**: 260 oppgavekort i 16 kategorier (forsiden en oppgavetype, baksiden svar og feller) og 268 begrepskort, pluss 80 auto-genererte formelkort |
| Kapitteloppgaver | **94 åpne oppgaver** over 27 kapitler · 866 poeng · 26 t |
| Eksamenstrening | **683 spørsmål** i 12 temaer (89 regnefamilier med nye tall og 207 statiske), 509 med tallsvar for «Regn selv først», uten minuspoeng. Spesifikasjon `docs/fie402-trening-spek.md` |
| Problem sets | **Problem Set 1–4** · 36 oppgaver · 144 delspørsmål med fire hint hver (PS4 er eksemplene i M&A-forelesningen, som Kurbatov kalte PS4) |
| Sjangertrening | **10 stiger · 151 steg**, hver fra null til eksamensnivå, etter eksamensvekt (stige 10 er governance og verbale M&A-motiver), pluss **«Del 3 i korte stiger»: 14 stiger · 80 steg** nederst |
| Øv uten stopp | **51 eksamensoppgaver** i Kurbatovs format, 12 varianter hver (612), **215 kort** (128 tall, 60 tekst, 27 blandet), pluss eksamenstreningens 276 familier: **491 kort** i repetisjonen. Spesifikasjon `docs/fie402-ov-spek.md` |
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

## Sjangertrening

Ni stiger, én per oppgavesjanger, i rekkefølge etter eksamensvekt: tvillingfirmaet,
MM og rekapitalisering, WACC og APV, realopsjoner, fusjoner, risikoskifting og
gjeldsoverheng, opsjoner, gjeld og egenkapital som opsjoner og Myers-Majluf. De siste stegene er bygd som de virkelige eksamensoppgavene med nye tall
(H2025 E4 (a)–(i) i WACC/APV, H2025 E5 og H2024 E6 i realopsjoner, H2025 E6 i
fusjoner, V2024 P4 i kreditt og så videre). Engelsk, som resten av faget.

Skrevet 22. oktober 2026 av ni agenter etter `docs/fie402-sjanger-spek.md`, og
kontrollert av fem uavhengige kontrollører som regnet alle tall på nytt. Ingen fasit
var feil. Det kontrollørene fant mest av, var **mønstre i feilsvarene** som pekte ut
fasiten: den høyeste verdien var aldri riktig, fasiten sto alene utenfor ellers
sorterte feilsvar, to alternativer summerte til 100 %, eller fasiten var det eneste
alternativet som delte en del med hvert av de andre. De ble brutt ved å bytte
feilsvar, aldri fasiten. Governance og de verbale M&A-motivene fikk egen stige
(nr. 10) 14. november 2026; se «Forelesningene 2026» under. Se [[Moduler og visninger]].


**Del 3 i korte stiger (22. november 2026).** Magnus slet med del 3 og ba om én kort stige
per oppgavetype, med vekt på intuisjon. 14 stiger på 5–6 steg (80 i alt) i en egen seksjon
nederst: paritet, replikerende portefølje, ρ, Black-Scholes-intuisjon, gjeld som opsjon,
CDS, ventopsjonen, exit og trinnvis finansiering, realopsjoner med omsatt tvilling,
fusjonsmotiver, aksjebytte og budkamp, dealsannsynlighet, overvåking og eierens verktøy.
Hvert steg slutter teorien med en intuisjonsboks, og de siste stegene er bygd som H2024,
H2025, V2021–V2024 og prøveeksamenene. Fragmentene er `_sjangre/101-…114-d3-*.js`,
utregningene `_sjangre/regn/d3-*.py`, spesifikasjonen §10 i `docs/fie402-sjanger-spek.md`.
CDS-stigen har egne symboler (`sg-d3-cds`), fordi ρ der er sannsynligheten for mislighold.
Skrevet av fem agenter og regnet på nytt av to uavhengige kontrollører.

**Øv uten stopp (23. november 2026).** Magnus ville bare trykke og få oppgave etter oppgave,
med repetisjon som Anki. Motoren er `js/bundle-ov.js` (se [[Moduler og visninger]]); her er
innholdet: 51 eksamensoppgaver (`fag/fie402/_ov/*.py`, bygd til `fag/fie402/ov.js` med
`tools/bygg-ov.py`), hver en case med deloppgaver (a)–(e) og minst én tekst- eller
blandetdel med intuisjon som Claude retter mot modellsvar og kriterier. 12 varianter med
nye tall per oppgave, så en deloppgave du bommer på, kommer tilbake med andre tall.
Fordelingen: verdsetting 11 (tvilling, WACC/APV, FCF og terminalverdi, gjeldskapasitet og
FTE, rekap med skatt, avveiningen), kapitalstruktur 10 (MM, hjemmelaget gearing, utbytte
og tilbakekjøp, risk shifting, gjeldsoverheng, gambling for resurrection), informasjon og
M&A 10 (Myers-Majluf, hakkeordenen, IPO, aksjebytte, kontant mot aksjer, dealsannsynlighet,
koforsikring, budkamp, to teorioppgaver), opsjoner og kreditt 10 (paritet, ett binomisk steg,
p og ρ, straddle, intuisjon, gjeld som put, senior og junior, spread, CDS, risikoskift),
realopsjoner 6 og governance 4 (teorioppgaver med 12 ulike vignetter). Fem skribenter og
fem uavhengige kontrollører; hver gruppe ble kontrollert to ganger. Regningen holdt i alle
variantene første gang; rettingene gjaldt feller som havnet innenfor toleransen,
forutsetninger som manglet i casen, gitt-felt, modellsvar som ikke fulgte varianten og
vignetter som lå for nær prøveeksamenene. Lærdommene står i spesifikasjonen § 6b.
## Problem sets

Øvingssettene fra kurset har egen fane, `/problemsett`. Problem Set 1 kom
20. oktober 2026 som en ferdig HTML-side og ble lagt inn i
`fag/fie402/problemsett.js`: oppgaveteksten ordrett på engelsk, hint og fasit
på norsk, stjernene fra settet (tutorial, forelesning, egen trening).
Formelarket fra HTML-siden ble utelatt, siden appen har eksamensarket på alle
sider. Neste sett legges til som et nytt objekt i samme fil. Se
[[Moduler og visninger]].

## Prøveeksamenene

Tre prøveeksamener (`prove1`–`prove3`, `kind: "mock"`, «Mock exam 1–3») ligger sist i
`fag/fie402/sett.js` og vises under «Prøveeksamener» i Eksamenssett. Lagt inn 29. oktober
2026 etter `docs/fie402-proveeksamen-spek.md`. Alle følger Kurbatovs mal nøyaktig: 180
minutter, 100 poeng, seks oppgaver med 12/12/18/18/20/20 poeng, to verbale oppgaver først
(den andre alltid governance), åpne svar med løsning og kriterier for selvvurdering.

| Eksamen | Ligner | Oppgavene |
|---|---|---|
| Mock exam 1 | H2025 | Opsjonsintuisjon · governance (fri kontantstrøm) · MM-rekapitalisering med hjemmelaget giring · WACC og APV over to år (gjelden øker i år 1) · realopsjoner (informasjon, salgsopsjon, likegyldighetspunkt) · M&A med aksjebytte |
| Mock exam 2 | H2024 | M&A verbal · governance (lederlønn) · MM med risikabel gjeld og utbytterekap · risikoskifting, gjeldsoverheng og reforhandling · WACC og APV fra et sammenlignbart selskap · ventopsjon med risikonøytral verdsetting fra en omsatt tvilling |
| Mock exam 3 | Kurbatovs vekt i 2026 (arbeidskravene) | Utbyttepolitikk verbal · governance (aktivist, poison pill, gullfallskjerm) · Myers-Majluf med sertifikat · skatteskjold, rekap og konkurskostnader · binomialprising, put-call-paritet og egenkapital som kjøpsopsjon · WACC og APV med gjeldskapasitet |

Tallene er regnet i `fag/fie402/_prove/proveN_regn.py`, som også sjekker
konsistenskontrollene (WACC = APV, vektede betaer, gevinstene summerer til NPV) og bygger
JSON-en; flettes inn med `tools/flett-prove.py . fie402 …`. Hver eksamen ble løst blindt
av en uavhengig kontrollør: alle tall stemte. Kontrollene fant ett ledd med to forsvarlige
svar (verdien av en salgsopsjon, 5d i Mock exam 1), kriterier som krevde ting spørsmålet
ikke ba om, og at manualen manglet r<sub>E</sub> ved permanent gjeld med skatt. Den står nå
i k7 § 7.4, og en feil setning i k15 § 15.5 er rettet. Kontrolløren av Mock exam 2 pekte
også på feilen i H2024 E6(c), som Kurbatovs nøkkel avgjorde 14. november 2026 (se over).

## Kartleggingen

Lagt inn 2. november 2026: en diagnoseprøve i tre deler under fanen «Kartlegging» i
Eksamenssett. Magnus ville finne ut hva han må øve mer på, med omtrent hele pensum
dekket. Han valgte ren flervalg og tre deler à rundt 90 minutter.

| Del | Kapitler | Ledd | Temaer |
|---|---|---|---|
| 1 Grunnlag og verdsetting med gjeld | 1–5, 17–20 | 28 | tid, fcf, capm, tvilling, gjeld, wacc, apv, fte |
| 2 Kapitalstruktur, agentkostnader og informasjon | 6–16 | 29 | mm, skatt, tradeoff, risikoskift, overheng, myers, emisjon, utbytte |
| 3 Opsjoner, M&A og governance | 21–27 | 28 | opsjon, binomial, bs, kreditt, realopsjon, ma, governance |

Hvert ledd står på egne ben, og hvert gale alternativ er bygd fra én navngitt feil
(`diag`), så rapporten kan si hva som ikke sitter. Tre agenter skrev én del hver
etter `fag/fie402/_kart/OPPDRAG.md`, med et regneskript per del som regner alle
alternativene. En uavhengig agent løste hver del blindt og sammenlignet etterpå. Alle
85 fasitene stemte i første runde. Det kontrollen fant, var annet:

- **Lekkasje.** Delen vises på én side, men oppfølgingsledd oppga svaret på forrige ledd
  («Suppose r_U = …»). Rettet med andre hypotetiske verdier.
  `tools/sjekk-lekkasje.js` leter nå etter hvert riktig tallsvar andre steder i delen.
- **Lengde.** I del 3 var riktig svar det lengste i alle elleve verbale ledd, og de
  gale brukte absolutte ord. Skrevet om. Regneskriptet sjekker nå lengden.
- **Gjettbare ledd** der svaret kunne leses av casen (V^L i stammen) og en
  «kontroll» som var en identitet (§9.2b, §9.7b).

Se [[Eksamenssett-modulen]] for motoren og rapporten.

## Eksamenssettene i appen

Gjengis ordrett i modulen [[Eksamenssett-modulen]], med egne fullstendige
løsninger. Ordrett gjengivelse er et bevisst valg — se [[Beslutningslogg]] — og
betyr at NHHs oppgavetekst ligger på den offentlige Pages-siden.

## Deleksamenene (21. november 2026)

Fanen «Per del» i Eksamenssett: 25 sett med oppgaver fra bare én av pensumets tre
deler, med samme inndeling som [[#Kartleggingen]] (del 1 grunnlag og verdsetting med
gjeld, k1–k5 og k17–k20; del 2 kapitalstruktur, agentkostnader og informasjon,
k6–k16; del 3 opsjoner, M&A og governance, k21–k27). Ligger sist i
`fag/fie402/sett.js` som `EDU_DATA.perDel` og sett med `lån`.

**Bare prøveoppgaver.** Magnus ville ikke ha de ekte eksamensoppgavene der, bare
lignende oppgaver med nye tall. Alle 72 prøveoppgavene er brukt én gang. Ingen av
dem har tallene fra en ekte oppgave (sammenlignet 21. november: overlappet var bare
runde tall som 25, 50 og 90). De eldre settene ville uansett ikke passet: de har 1
minutt per poeng, Kurbatov 1,8.

**To arter i hver del.** Magnus ville skille det helt naturlige fra det med vri:

| Del | Mest forventet | Med vri |
|---|---|---|
| 1 | 2 sett · 4 oppgaver | 3 sett · 8 oppgaver |
| 2 | 2 sett · 4 oppgaver | 6 sett · 18 oppgaver |
| 3 | 3 sett · 11 oppgaver | 9 sett · 27 oppgaver |

«Mest forventet» er oppgaver i samme form som en oppgave Kurbatov har gitt i H2024
eller H2025, med nye tall. Kolonnen K i `docs/fie402-prediksjon.md` avgjør. «Med vri»
er samme sjanger med en vri prediksjonen mener kan komme (annen gjeldspolitikk, skatt
eller brannsalg i rekapitaliseringen, Myers-Majluf, børsnotering, trinnvis
finansiering, kontantbud …). Del 2 har få forventede fordi Kurbatov bare har gitt
MM-rekapitalisering og risikoskifting der. Hver oppgave har et `merke` som sier hvilken
ekte oppgave den ligner, eller hva vrien er. Merket navngir aldri mekanismen oppgaven
spør etter («Vri: fusjon av to selskaper med gjeld», ikke «coinsurance»).

Settene er på 2–4 oppgaver og 65–115 minutter (1,8 minutter per poeng), med de
verbale oppgavene først som på eksamen.

**Ni nye «Mest forventet» med egne oppgaver (23. november 2026).** Magnus kunne ikke nok
ennå til settene «Med vri» og ba om tre nye forventede sett i hver del, alle på
eksamensnivå. Prøveoppgavene var brukt opp, så de 24 oppgavene er nyskrevne:
del1-f3–f5 (H2025 E4 og H2024 E5), del2-f3–f5 (H2025 E3 eller H2024 E3 og H2024 E4) og
del3-f4–f6 (H2025 E1 eller H2024 E1, governance, H2024 E6 eller H2025 E5, og CDS eller
H2025 E6). Fire skribenter og fire blinde kontrollører: alle tall stemte i første runde
(56 + 65 + 50 regnet på nytt). Det kontrollen fant, var
- et felletall som var regnet feil, og to sammenlignbare firmaer med så like β_U at et svar
  med bare ett firma ble godkjent automatisk
- c- og d-ledd i del 2 som gled over i en vri (reforhandling, gjeldsoverheng med positiv
  NPV), skrevet om til H2024 E4-formen med en NPV-nøytral kontrakt
- et spørsmål med to lesninger (hvem vinner om avtalen signeres) og et feilsitat av
  Kurbatov om milepælsmål
- kriterier som krevde begrunnelser spørsmålet ikke ba om (nå bonus) og lister med godtatte
  svar som manglet det nøklene godtar (markedsmakt, risikodeling ved aksjebetaling).
Spesifikasjon: `docs/fie402-deleksamen-spek.md`. Kilde: `fag/fie402/_del/` (s1–s4 og
`sett.json`), flettet inn med `tools/flett-del.py fie402 --skriv`. Hvorfor oppgavene er lånt og ikke kopiert,
står i [[Eksamenssett-modulen]].

## Hintet i forelesning (24. november 2026)

Magnus ba om en egen del i Eksamenssett med bare oppgaver Kurbatov pekte ut i forelesning
som mulige eksamensoppgaver. Fanen «Hintet i forelesning» har sju sett (`hint1-1`, `hint2-1`
til `hint2-3`, `hint3-1` til `hint3-3`), 26 oppgaver og 400 poeng: teorioppgaver på 10 poeng
først, regneoppgaver på 20, 1,8 minutter per poeng. Settene er `kind: "del"` med
`art: "hint"`. Arten har egen fane via `EDU_DATA.perDel.faner` (se
[[Eksamenssett-modulen]]).

Hver oppgave bygger på eksemplet han pekte på, med ny historie og nye tall, og merket sier
hvilket opptak, tidsstempel og sitat («Forelesning 16 (M&A), 1:11:07: «it can literally be an
exam question and it has been»»). Kildene er Panopto-tekstingen og oppsummeringen
`NHH/7. Semester/FIE402 Corporate Finance/FIE402 Viktig fra forelesningene (ikke på lysbildene).md`.
Med dette er de varslede forelesningseksemplene som manglet (CDS, Google-oppgaven med senior og
junior gjeld, coinsurance og budkampen med bank D) dekket.

| Del | Oppgavene |
|---|---|
| 1 | beta · kilder til positiv NPV · prosjektverdsetting med fellene (sunk cost, kannibalisering, ΔNWC, halvårsrente, NPV mot IRR) · WACC og APV med to sammenlignbare firmaer |
| 2 | MM mot virkeligheten · SEO med kursfall på 12 % · winner's curse · gjeldsoverheng med reforhandlingsintervall · fire bruk av fri kontantstrøm · kostnader ved financial distress · skatteskjold på annuitetslån og tilbakekjøp mot utbytte · gambling for resurrection med brannsalg · børsnotert mot privat · signalisering og sertifisering · replikering av gründerens andel |
| 3 | opsjonsintuisjon · to typer overvåking · dealsannsynlighet med utsettelse · CDS med kupong · fusjonsgrunner uten synergier · eierens tre tiltak · vente eller investere med X · senior og junior fra noterte calls · realopsjoner verbalt · exit-klausul med gebyr · budkamp og coinsurance |

Fire skribenter og fire blinde kontrollører. Ingen tallfeil i noen av settene. Kontrollen fant:
- **Kurbatovs «X under 0,5»** (opptak 14, 29:57) holder bare når NPV nå holdes fast. Når begge
  NPV-ene avhenger av X, blir det 0,88 i timens eksempel. Fasiten i hint3-2 oppg. 3 forklarer
  begge.
- **Utsettelse av et aksjebytte** krymper spreaden når p er uendret, fordi fiaskotapet
  diskonteres lenger. Den øker bare hvis markedet senker p. Spørsmålet er delt i to.
- **Perfekt korrelasjon** er ikke nok til at coinsurance forsvinner. Betingelsen er at ingen
  tilstand har ett firma i mislighold mens det andre har egenkapital igjen.
- **Feil i løsningsteksten:** eksempler på WACC over r<sub>U</sub> som ikke ga det (manglende
  1 − τ gir WACC = r<sub>U</sub>), og «omvendt rekkefølge» i budkampen.
- **Ledd med to lesninger:** junior gjeld ved høyere volatilitet (svaret avhenger av hvor
  eiendelene ligger), «expected return» i winner's curse, amerikansk call uten oppgitt utbytte
  og «indifferent» uten «value today».
- **Tallfelt som røpet svaret** på et tekstspørsmål (feltnavnene vises ved boksen), og spørsmål
  som røpet fortegnet i et tidligere ledd.
- **Skatteskjold på avdraget:** Kurbatov sa i opptak 03 (38:38) at skatteskjoldet «in general»
  også tar med τ × hovedstol. Oppgaven sier nå at bare renter er fradragsberettiget.

Spesifikasjon: `docs/fie402-hint-spek.md`. Kilde: `fag/fie402/_del/h1`–`h4` (`_regn.py`,
`.json`, `_svar.json`), hodene i `_del/sett.json`, flettet inn med `tools/flett-del.py fie402
--skriv`.

## Forelesningene 2026 (14. november 2026)

Alt fagstoff var skrevet fra gamle eksamener og syllabus. 14. november kom Kurbatovs
14 forelesninger, tavlenotater, practice/tutorial sessions, Problem Set 1–3 med
løsninger, den offisielle nøkkelen til H2024, løsningene til arbeidskravene, nytt
formelark og teksting av oppsummeringsforelesningen. Tre kontrollører sammenlignet dem
med appen; beslutningene står i `docs/fie402-forelesninger-2026.md`, og eksamenssignalene
fra opptaket i `Lecture 14 wrap-up eksamenssignaler fra opptaket.md` i kursmappen.

**Rettet fordi appen motsa Kurbatov:**
- Uskattede vekter er standard, men ved forhåndsbestemt fast gjeld vekter han r_U og
  β_U med D(1−τ) (lecture 8 s. 18). WACC virker ved fast permanent gjeld uten vekst,
  r_wacc = r_U(1 − τD/V^L) (PS2 E9). Appen sa «aldri» og «bare APV».
- Reelle sannsynligheter går med r_f når risikoen ikke er systematisk.
- k24 diskonterer nå diskret, som han gjør.
- Gevinster ved oppkjøp: målselskapet ca. 15 %, kjøperen ca. 1 %, samlet 1–3 %.
- Black-Scholes regnes ikke (se Formelarket over). Først trodde vi motsatt fra
  lysbildene; opptaket avgjorde.
- Governance svares generelt; norsk aksjelov bare når oppgaven sier ASA.

**Lagt til:** rentedekning V^L = (1 + τk)V^U, debt capacity, netto gjeld, senior og
junior gjeld fra noterte calls, utbytte med nye aksjer, gjeldsoverheng med ny
egenkapital, spin-off, EPS-feilslutningen, underprisingsteoriene, aksjonærer mot
interessenter, rådgivere for stemmegivning, motivlisten og fusjonstyper,
dealsannsynlighet med (1 + r_f)^T, trinnvis finansiering, månedsrente og
nedleggelsesopsjon sammenlignet med 0. 58 nye sjangersteg og governance-stigen.

**Eksamenssignaler fra opptaket:** samme struktur som F24 og F25 (to teorioppgaver på
rundt 10 poeng, fire regneoppgaver på rundt 80 %), hver blokk minst én oppgave,
følgefeil gir full uttelling, fire desimaler, A-grense historisk 90–91. Hint om
nedleggelsesopsjon, Mannesmann/Vodafone, SEO med kursfall på 12 %, fire måter å bruke
fri kontantstrøm, rente for brøkdel av år og gjeld som risikofri gjeld minus put.

**Kildefeil funnet underveis:** kursets regneark til PS2 E8 (r_f 5,2 % og kortsiktig
gjeld telt to ganger: riktig $26,17), PS3 E6(a) 11,1 % (riktig 11,3 %), PS3 E7(c)
pålydende 250 (riktig 402,6), lecture 10 s. 15 junior 34,94 % (riktig 35,94 %),
lecture 12 s. 21 225,03 (riktig 225,003, p = 0,5884).

## Persøk-oppsettet for Corp (14. november 2026)

Magnus ba om det samme som hjalp i Persøk: mange prøveeksamener, oppgavekort og
NotebookLM-kilder, med god tid.

- **Prediksjonen** står i `docs/fie402-prediksjon.md`: format, sannsynlighet per tema,
  rotasjon etter H2024 og H2025 og en plan for prove4–prove12 i tre runder. Hovedfunnet er
  at Kurbatov bygger hver eksamensoppgave på et eget forelesningseksempel eller en
  problem set-oppgave med nye tall og én vri; alle tolv oppgavene i H2024 og H2025 kan
  spores.
- **Oppgavekort:** 260 kort (`ok-*` i `window.EDU_DATA.flashcards`), generert av
  `fag/fie402/_oppgavekort/del1_regn.py` og `del2_regn.py` og satt inn med blokkskript
  som kan kjøres på nytt. `flashcardsMeta.order` legger de 16 oppgavekategoriene først og
  begrepskortene sist. Begge halvdelene ble kontrollert uavhengig; ingen regnefeil, rundt
  tjue rettinger av kilder, avrunding og uklare forsider.
- **NotebookLM-kilder:** 14 filer, én per forelesning, på engelsk, i kursmappen
  `NotebookLM-kilder/`. Kontrollert uavhengig; seks rettinger, blant annet IST i PS1 E9
  (gevinsten er 27 mill., ikke 37). I tillegg kilder per problem set (PS1–PS3) og en
  dypdykkfil for andre halvdel av forelesning 9 (`… lecture 9 options I after put-call
  parity.md`, 21.11.2026): binomial, replikering, ρ, Black-Scholes-intuisjon og implisitt
  volatilitet, med H2024 E6, H2025 E1 og 2022 P4. Alle tall regnet på nytt i Python. Senior og junior gjeld som calls (Google-oppgaven, PS3 E6) har egen kilde og prompt for en forklaringsvideo (24.11.2026).
- **Panopto-tekstingen (22.11.2026):** alle 17 opptak ligger i kursmappen under
  `Forelesninger/Teksting fra Panopto/`. Fem agenter leste dem mot NotebookLM-kildene;
  funnene står i `NotebookLM-kilder/FIE402 NotebookLM source exam signals from all lecture
  recordings.md`, som går foran de eldre kildene der de er uenige. Viktigst for appen:
  bare formelarkets formler på eksamen (justert WACC ved permanent gjeld og D(1 − τ)-vektingen
  er hjemmeoppgavestoff), CDS-oppgaven fra V2024 kan komme igjen, temaene kan bytte plass,
  oppgaver med tre stjerner kan komme, skattemessige underskudd er ikke et M&A-motiv hos
  Kurbatov, og slide 17 i Options I er riktig (√1,015).
- **Appen rettet etter opptakene (22.11.2026):** fem agenter med eget fileierskap (to for
  NotebookLM-kildene, tre for appen). Justert WACC er tatt ut som regning overalt der det
  likner eksamen (treningsfamiliene wac-perm1/2 fjernet, prove9 E4c/d og prove10 E4e byttet
  ut, sjangertrinn erstattet, resten merket «not on the exam as a calculation»).
  Skattemessige underskudd er fjernet som M&A-motiv, utbytteskatten er nyansert (likt i dag,
  fordelen er utsatt skatt), «minus a written put» er rettet, amerikanske opsjoner og
  Black-Scholes-regning er merket som utenfor eksamen, styrestørrelse 7–11, og
  eksamensformatet (teori rundt 10 poeng, temaer kan bytte plass, tre stjerner kan komme,
  governance med ny vinkel) er rettet i manual, kjerne, kort, plan og subjects.js.
  Prediksjonen er oppdatert (10/10/20/20/20/20 45 %, kursrekkefølge 45 %, ny kode D11).
  Treningen har nå 683 spørsmål; 331 fikk ny rekkefølge på alternativene fordi byggeren
  fordeler fasitplassene med løpende teller. `sjekk-prove.js` filtrerer nå bort deleksamenene.
  Ikke gjort: ny prøveeksamen med de varslede forelesningseksemplene (CDS, Google,
  coinsurance, bank D; dekket 24. november i fanen «Hintet i forelesning»), og studieplanen er ikke rekalibrert (ville gått fra 78 til 85 t).
- **Retting med egen API-nøkkel (22.11.2026):** alle 418 deloppgavene i de 18 egne settene har
  svar-data (`fag/fie402/_svar/*.json` → `svar.js`, spesifikasjon `docs/fie402-svar-spek.md`).
  Tall og bokstaver rettes automatisk, tekst av Opus 5.5, følgefeil av Sonnet 5.5. Se
  [[Eksamenssett-modulen]].
- **Prøveeksamener 4–12:** se `docs/fie402-proveeksamen-spek.md`, siste del. Runde 1
  (prove4 det mest sannsynlige settet, prove5 kjernen, prove6 H2024-formen) er lagt ut etter
  blind løsning: ingen regnefeil, men alle tre var 40–60 % lengre enn Kurbatovs (1 600–1 900
  ord mot 1 000–1 150), og `facts`/`note`, som vises før start, røpet formler. Kortet til
  1 110–1 250 ord og rettet. Lærdommene står i spesifikasjonen. Runde 2 og 3 (prove7–12)
  ble skrevet med lærdommene og løst blindt med 98–100 av 100; ingen regnefeil i noen av de
  ni. Det kontrollørene fant mest av, var spørsmål som kunne leses på to måter, kriterier som
  krevde mer enn spørsmålet, for mange enkeltspørsmål og sjekker merket som ekte når de var
  identiteter eller fastpunkter.
- Kontrollene fant også feil i appen: H2025 E5(d) verdsatte exit-programmet mot den
  negative NPV-en (62 388); riktig mot det beste alternativet er 45 246. PS1 E6(b) sa at
  gjelden blir risikofri; riktig er 75 → 90 og eieren 25 → 16.

- **Rettet etter kontrollørene i Øv uten stopp (23.11.2026, versjon 214):** alt sjekket mot
  Panopto-tekstingen. Utbytteskatt: τ*<sub>d</sub> står ikke på lysbildene eller formelarket, og
  opptak 05 (1:15:59) sier at utbytte og kursgevinst skattlegges likt i dag. kj2 bruker Kurbatovs
  versjon (utsettelsen), manualen 16.1 merker formelen og eksempel 1 som bakgrunn, og treningen
  mistet utb-tax1 og utb-s09. kj8: ρ (ikke q) for risikonøytral misligholdssannsynlighet («I always
  prefer the rho», opptak 13, 25:41; lysbildet skriver p), LGD mot pålydende i CDS-spreaden, L i
  r<sub>D</sub> = y − p·L definert mot prisen (kilen er p × LGD × (1 + y) mot pålydende), «plus a
  written put» (opptak 18, 1:03:55) og ingen kjønnet pronomen om Kurbatov. Samme ordlyd i
  sjangerstige 08, ρ i prove10 E5, L-presisering i V2024 P3(a) og spek §§ 9.3–9.4. Prediksjonens
  trekk 9 sa feilaktig at H2025 E5 kaller risikoen usystematisk. Rettede NotebookLM-kilder for
  forelesning 11 og 14 ligger ved siden av originalene med «(rettet 2026-11-23)» i navnet.
  Ikke rettet (bevisst): τ*<sub>d</sub> i quiz q190–q191, dybdebanken, kapitteloppgave k16,
  kartlegging 2 oppg. 8a, oppgavekort ok-utbytte-06 og prove3 E1 (bonus); y − p·L med L mot
  pålydende i manualen k5/k29, sjangerstige 08 (viser selv avviket), ov-tvi3 (oppgaven foreskriver
  formelen) og flere kapitteloppgaver; q i sjangerstige 08 og treningen.

## Eksamenstrening (15. november 2026)

Magnus ba om det samme som i Persøk: velge oppgavetype og få mange eksamensoppgaver på den.
`/trening` er nå satt opp for FIE402 med 692 spørsmål i 12 temaer, skrevet av fire skribenter
etter `docs/fie402-trening-spek.md` (kilder i `fag/fie402/_trening/*.py`, bygget med
`python3 tools/bygg-trening.py fie402`). Motoren fikk poeng per fag (Corp uten minuspoeng),
engelsk tallformat og «Regn selv først»: studenten skriver tallet før alternativene vises.
Fire uavhengige kontrollører regnet alle regnevariantene blindt: ingen regnefeil. De fant fire
faglige feil (diversifisering og varians, retningen på dealsannsynligheten, tilbakekjøp av
gjeld etter V2024 P1e, og en nedleggelsesindifferens som ikke fantes), mange hint og feller som
røpet svaret, og noen spørsmål som kunne leses to veier. Alt er rettet.

**Opsjoner: kort sjekk per forelesning** (22. november 2026). Magnus ville kunne ta bare
opsjonsspørsmål fra forelesning 9, 10 eller 11 (Options I–III), bare det viktigste og mest
som en sjekk. Åtte spørsmål per forelesning, i forelesningens rekkefølge, valgt etter
lysbildene og oppsummeringsforelesningen:

| Sjekk | Tema i banken | Innhold |
|---|---|---|
| Options I · forelesning 9 | `opsjoner` (k21–k23) | payoff, put-call-paritet, replikering, ρ og prising, at den virkelige sannsynligheten ikke betyr noe, sann mot implisitt volatilitet, utbytte, amerikansk call |
| Options II · forelesning 10 | `kreditt` (k24, k5) | gjeld som risikofri gjeld minus en put, gjeld og egenkapital i et tre, gjeld via put, CDS, forventet avkastning mot yield, gjeld fra noterte calls, senior og junior, mer risiko |
| Options III · forelesning 11 | `realopsjon` (k25) | vente, verdien av informasjon, trinnvis finansiering, ρ fra et omsatt verdipapir, hvorfor sannsynlighetene ikke trengs, exit, exit mot 0, månedsrente |

Totrinnstreet er utelatt: Kurbatov tar bare ett steg (forelesning 9 nevner flere perioder
bare som veien til Black-Scholes). Det har heller ikke vært på noen av de seks eksamenene.
Utvalget står i `SJEKKER` i `fag/fie402/_trening/temaer.py`.
