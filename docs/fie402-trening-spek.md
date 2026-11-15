# FIE402 · Eksamenstrening: spesifikasjon for skribentene (LES HELE)

Du skriver spørsmål til **eksamenstreningen** (`/trening`) i FIE402 Corporate Finance: en stor
bank med regneoppgaver og begrepsspørsmål på nivå med Kurbatovs eksamen. Leseren velger
oppgavetype (tema) og antall, får spørsmålene i tilfeldig rekkefølge og får **en kort fasit med
en gang** og en knapp for **en full gjennomgang** som skal få en som ikke kan stoffet, til å
forstå det. Modulen finnes alt for FIE432; denne spesifikasjonen bygger på
`docs/fie432-trening-spek.md`, men tre ting er annerledes i Corp:

1. **Eksamen er åpen.** Seks oppgaver, 100 poeng, ingen flervalg (H2024, H2025). Treningen bruker
   likevel fire alternativer, fordi de gale alternativene lærer bort feilene som koster poeng.
   Men hvert regnespørsmål får et **tallsvar** (`tall`): med «Regn selv først», som er på som
   standard i FIE402, skriver leseren tallet sitt før hun ser alternativene. Tallet er svaret.
2. **Ingen minuspoeng.** Resultatet er antall riktige og prosent. Ingen tekst skal snakke om å
   stå over eller om å eliminere for å unngå minus.
3. **Innholdet er på engelsk**, som resten av FIE402 og eksamen. Motorens tekster rundt er
   norske; dem rører du ikke.

Fire skribenter jobber samtidig, hver i sine egne moduler (§ 5).

## 0. Hva du leser før du skriver

1. Denne fila, hele.
2. Referanseeksempelet: `fag/fie402/_trening/eksempel.py`. Det har to familier med tallsvar
   (`tvi-unl1` og `mm-rec1`) og ett statisk governance-spørsmål (`gov-s01`). Det er
   kvalitetsnivået og formen. Les også variantene: `python3 tools/bygg-trening.py fie402 --bare
   eksempel.py --vis tvi-unl1`.
3. Verktøyet: `tools/trening_lib.py` (hjelperne, `tallsvar`) og `tools/bygg-trening.py`.
4. `docs/fie402-forfatterspek.md`: notasjonen i § 4 og lærdommene i § 9 gjelder fullt ut her.
5. `docs/fie402-forelesninger-2026.md`: Kurbatovs forelesninger 2026. **Der appen og Kurbatov
   er uenige, følger du Kurbatov.** Rettelsene A1–A13 og tilleggene B og D gjelder alle temaene.
6. For **hvert av temaene dine** (`kap` og `kjerne` i `fag/fie402/_trening/temaer.py`):
   - kjernepensumdelen `fag/fie402/_kjerne/kjN.js` («Must know»-boksen)
   - manualkapitlene i `FIE402_Manual.html`
   - eksamens-DNA og kapittelkartet i `docs/fie402-kursplan.md`
   - sjangertreningen i `fag/fie402/_sjangre/` (samme feller, samme konvensjoner)
   - kapitteloppgavene `fag/fie402/_kapoppg/` og eksamenssettene `fag/fie402/sett.js`. Ikke kopier
     dem. Bruk dem til å se hvordan Kurbatov spør og hvilke feil som koster poeng.
   - temaets hurtiginnføring (`INTRO` i `temaer.py`): det den sier at temaet tester, skal banken
     dekke.

## 1. Formatet

Hvert spørsmål har: spørsmålstekst `q`, **fire alternativer** der nøyaktig ett er riktig, en
**felle** per galt alternativ, en **kort fasit**, en **full gjennomgang**, **hjelp i tre trinn** og,
når svaret er ett tall, et **tallsvar**. Tenk på hvert spørsmål som én deloppgave, (a) til (f), i
en av Kurbatovs oppgaver, skrevet slik at det står på egne ben.

Du skriver Python-moduler i `fag/fie402/_trening/<modul>.py` med to slags spørsmål.

### 1a. Familier (regnespørsmål med nye tall)

En familie er en funksjon som får en tilfeldighetsgenerator `r` og returnerer ett spørsmål.
Byggeren kaller den `antall` ganger med faste seeds. **Alle tall i spørsmålet, fasiten,
gjennomgangen og fellene kommer fra de samme variablene**, så aritmetikken er riktig per
konstruksjon.

```python
@familie("tvi-unl1", tema="tvilling", antall=8, tittel="Cost of equity from a twin with debt betas",
         hjelp=hjelp3("<tema>", "<regel>", "<oppsett>"))
def _(r):
    bE_t = r.choice([1.20, 1.25, 1.30, 1.40, 1.50])
    ...
    rE = rf + bE * mrp                                   # riktig, som brøk
    f_ru = rf + bU * mrp                                 # stoppet ved r_U
    ulike(rE, f_bd0, f_tvilling, f_ru, rel=0.02)         # Avvis hvis to alternativer er for like
    return sporsmal(q, [R(pst(rE, 2), rE), F(pst(f_ru, 2), "This is r<sub>U</sub> …", f_ru), ...],
                    kort, full, tall=tallsvar(skala=100, enhet="%"))
```

- **Tall som ser ut som eksamenstall**: betaer med to desimaler, renter med én (4.5%),
  beløp i millioner med runde tall (NOK 750 million), sannsynligheter som 0.4 eller 0.25.
  Velg kombinasjoner der vektene blir pene (V = 1 200, D = 360 gir D/V = 0.30).
- **Varier mer enn tallene**: selskapsnavn (fiktive), valuta (NOK eller $), om oppgaven gir D/E
  eller D/V, om den spør etter r<sub>E</sub> eller WACC, ett eller to perioder.
- `antall`: 5–10. Bedre flere familier med 6–8 varianter enn få med 15.
- **Hver felle regnes ut i hver variant** av feilen den beskriver. **Hver felle er én navngitt
  feil**: «D/V used instead of D/E», «the tax shield discounted at r<sub>D</sub> when D/V is
  constant», «real probability discounted at r<sub>f</sub> when the risk is priced». Ingen
  fyllalternativer, ingen tilfeldige tall. Felleteksten sier feilen og regnestykket.
- Gi **hver** R og F en `verdi` (samme enhet for alle, for eksempel brøk). Da kan byggeren sjekke
  tallsvaret og knytte et tall leseren skriver til fella det treffer (§ 1c).
- `raise Avvis(...)` når tallene gir et dårlig spørsmål (negativ NPV der spørsmålet forutsetter
  positiv, to like alternativer, en felle som tilfeldigvis gir svaret). Byggeren trekker på nytt.
- Rekkefølgen bestemmer byggeren (jevn fasit på A–D). Bruk `rekkefolge="stigende"` bare når
  fellene ligger på begge sider av svaret og bytter plass mellom variantene (fallgruve 7æ).

### 1b. Statiske spørsmål (begrep, påstand, formel, tolkning)

```python
statisk("gov-s01", tema="governance", type="begrep", hjelp=hjelp3(...),
        q=..., alternativer=[R(...), F(..., "felle"), F(...), F(...)], kort=..., full=...)
```

`type` er en av `begrep`, `paastand`, `formel`, `fakta` eller `tolkning`. Governance og de
verbale delene av M&A, informasjon og utbytte er mest statiske spørsmål. Bygg dem på Kurbatovs
to teorioppgaver (H2024 E2, H2025 E2) og på oppsummeringsforelesningen (D8, D9, D14 i
forelesningsnotatet): hva en mekanisme gjør, hvem som vinner og taper, hvilket tiltak som løser
hvilket problem.

- **Fasiten skal ikke være det lengste alternativet** oftere enn omtrent én av fire ganger. Den skal
  heller ikke alltid være det korteste (fallgruve 7y). Skriv de gale like presise og like lange.
- Påstandsspørsmål med «Only I», «Only II», «Both», «Neither» trenger `rekkefolge="fast"`.
- Et statisk spørsmål med ett tall som svar kan også få `tall=tallsvar(verdi=…, …)`.

### 1c. Tallsvaret (`tall`) og toleransen

Alle spørsmål der svaret er **ett tall** skal ha et tallsvar. Det er det som gjør treningen til
eksamenstrening for en åpen eksamen.

```python
return sporsmal(q, alternativer, kort, full, tall=tallsvar(skala=100, enhet="%"))
```

| Parameter | Betydning |
|---|---|
| `verdi` | Tallet leseren skal skrive, i enheten ved feltet. Utelatt: R-alternativets `verdi × skala` |
| `enhet` | Vises ved feltet: `"%"`, `"million"`, `"NOK million"`, `"$ per share"`, `"shares"`, `"years"`. Tom for rene tall (beta, sannsynlighet, ER) |
| `skala` | Regner R- og F-verdiene om til enheten: `100` når verdiene er brøker og enheten er `%` |
| `rel` | Relativt avvik som godtas. **Standard 0.001** (0,1 %) |
| `abs` | Absolutt avvik i enheten. Påkrevd når svaret er 0. Gis begge, godtas det største |

**Toleransen er Kurbatovs:** rundt 0.001 relativt er greit. Han regner med fire desimaler.
Bruk standarden. Gi `abs` når svaret er 0 eller nær 0 (en NPV som kan bli −0.3 eller 0.4, en
endring i verdi), fordi et relativt avvik da blir urimelig strengt.

**Slik leses svaret i appen.** Leseren kan skrive punktum eller komma som desimaltegn og
mellomrom eller komma som tusenskille, med eller uten minus (−, -, «minus»), valutategn og
enhet. Med enheten `%` godtas også brøken: 12.5 og 0.125 er samme svar. Treffer tallet en felle
innenfor toleransen, regnes svaret som det gale alternativet. Fella vises da. Treffer det
ingenting, er det feil.

**Krav som byggeren og kontrollen håndhever:**

- Verdien stemmer med tallet i det riktige alternativet. Feil skala eller enhet stoppes.
- Er alternativet vist i prosent, skal enheten være `%` (med `skala=100` når verdiene er brøker).
- **Ingen felle ligger innenfor toleransen.** `ulike(..., rel=0.02)` holder dem langt nok unna.
- Det riktige alternativet skal vises med nok desimaler til å ligge innenfor toleransen: renter
  som prosent med to desimaler (13.13%, altså fire desimaler som brøk), betaer og
  sannsynligheter med fire (0.5885), beløp med to der de er under 100. Kontrollen advarer ellers.
- **Avrunder du mellomtall** (fire desimaler, som Kurbatov), regn R fra de avrundede tallene, så
  fasiten summerer (forfatterspek § 9.5). Send den eksakte verdien med
  `tallsvar(verdi=eksakt × skala, …)`. Da sjekker byggeren at den avrundede fasiten ligger
  innenfor toleransen av det eksakte svaret, så en leser som regner uten avrunding, får rett.
- **Spørsmålet må gi ett tall.** Si enheten når den er tvetydig («in NOK million», «per share»,
  «as a probability»). Si også om svaret er prosjektets verdi eller NPV, firmaet eller
  egenkapitalen (forelesningsnotatet D4).

Spørsmål uten ett tall (påstander, formler, verbale spørsmål) får ikke `tall`. De vises som
vanlig flervalg også med «Regn selv først».

## 2. Den korte fasiten og den fulle gjennomgangen

**`kort`**: svaret i fet skrift og det ene regnestykket som avgjør det. Under 50 ord, lesbart
på fem sekunder.

```html
<p><b>13.13%.</b> β<sub>U</sub> = 0.70 × 1.40 + 0.30 × 0.15 = 1.0250. With D/E = 1.00: β<sub>E</sub> = 1.7500. r<sub>E</sub> = 3.5% + 1.7500 × 5.5% = 13.13%.</p>
```

**`full`**: en gjennomgang for en leser som ikke kan dette fra før, 120–350 ord:

1. **What the concept is**, med vanlige ord, i to–tre setninger. Si hvorfor det er slik.
2. **Løsningen steg for steg** med tallene fra spørsmålet: `<p><b>Step 1: …</b> …</p>`.
3. **En kontroll.** Bruk en av de fem nummererte i k0 § 0.5 når den passer (Check 1: WACC = APV,
   Check 2: vektet β = β<sub>U</sub>, Check 3: kreditorenes + aksjonærenes gevinst = NPV,
   Check 4, Check 5: er troen rasjonell). Kall en lokal kontroll «First check», aldri «Check 2».
   **Si fra når kontrollen er en identitet** som ikke kan feile (forfatterspek § 9.2 og 9.2b):
   «this check is an identity, so it catches arithmetic slips only».
4. **«Remember:»** til slutt: regelen på én linje.

Fellene vises automatisk under gjennomgangen, merket med bokstaven til hvert alternativ. Skriv
derfor aldri «option B» eller «(C)»: alternativene stokkes.

## 2b. Hjelpen i tre trinn og fellene

Hvert spørsmål har `hjelp=hjelp3(tema, regel, oppsett)`, på engelsk, som vises ett trinn om
gangen før leseren svarer:

1. **Tema** (høyst 35 ord): hvilket begrep spørsmålet handler om og hva du skal finne. Ingen formel.
2. **Regel** (høyst 70 ord): formelen med symboler, slik kurset skriver den.
3. **Oppsett** (40–120 ord): fremgangsmåten steg for steg (`<p><b>Step 1: …</b> …</p>`), med
   hvilken felle du skal se etter.

**Ingen av de tre røper svaret**: ingen tall fra spørsmålet eller alternativene, ikke teksten i
det riktige alternativet og ikke hvilket det er. Små heltall (Step 1, 12 months, 100) er lov.
Familier har én hjelp i `@familie(...)`; har familien flere spørsmålstyper, gi varianten sin egen
med `sporsmal(..., hjelp=...)`.

**Fellene vises før fasiten** i «Prøv igjen først» og når et tall treffer en felle. Fella skal
derfor si hva som er galt med *dette* valget, ikke hva som er riktig: ikke tallet i det riktige
alternativet, ikke «Right number, but …», ikke et mellomtall som gir fasiten med ett steg
(fallgruve 12).

## 3. Språk og regler

- **Engelsk.** Tiltale «you». Kort og direkte, aktiv form.
- **Ingen tankestrek (—)** noe sted. Bruk komma, kolon eller ny setning.
- **Ingen komma foran «and»** (heller ikke i oppramsinger: «taxes, distress costs and fire
  sales»). Kontrollen stopper «, and». Del heller setningen.
- **Ingen bokstavhenvisninger** («option B», «answer C», «(A)», «B is correct»). Kall heller
  ikke strategier «Option A» og «Option B» i fasiten; bruk «invest now» og «wait».
- **Ingen henvisninger til andre spørsmål** («previous question», «same firm as»): spørsmålene
  trekkes tilfeldig og hver for seg.
- **Tallformat**: punktum som desimaltegn, hardt mellomrom som tusenskille, ekte minus (−) og ×
  for gange. `temaer.py` setter `SPRAK = "en"`. Da gir hjelperne riktig format: `tall(x, d)`
  «1 234.50», `pst(x, d)` «12.50%» (brøk til prosent), `prosent_tekst(p, d)` «3.5%», `penger(x, d,
  "$")` «−$1 234», `penger(x, 0, "NOK")` «NOK 1 234», `mill(x, d)` «5.25 million», `gen(navn)`
  «Skarvik Logistics'». Skriv aldri tallene for hånd i f-strengene uten hjelperne.
- **Notasjon** etter forfatterspek § 4: r<sub>E</sub>, r<sub>D</sub>, r<sub>U</sub>,
  β<sub>U</sub>, τ<sub>c</sub>, V<sup>L</sup>, PV(TS), r<sub>wacc</sub>, FCF<sub>t</sub>. Reserverte
  symboler (§ 9.3): ρ er alltid den risikonøytrale sannsynligheten, D er markedsverdien av gjeld
  (avskrivning er Dep), K er innløsningskurs eller pålydende.
- **Oppgi alt i spørsmålet**: renter, skatt eller ikke, konstant D/V eller fast gjeld, risikofri
  gjeld eller ikke, reelle eller risikonøytrale sannsynligheter, når kontantstrømmene kommer.
  Spørsmålet må bare tillate svaret du skrev (forfatterspek § 9.7b).
- Fiktive selskaper. Ikke ekte selskaper i regneoppgaver.

## 3b. Kursets konvensjoner (Kurbatov 2026)

Fra `docs/fie402-forfatterspek.md` § 4 og § 9 og `docs/fie402-forelesninger-2026.md`. Står det
noe annet i manualen eller kjernepensum, gjelder dette. Si fra i rapporten.

- **β<sub>U</sub> uten skatt i vektene** er standarden (konstant D/V). D(1 − τ<sub>c</sub>)-vektene
  brukes bare når oppgaven sier at gjeldsbeløpet er fast og permanent. Si det da (A1).
- **Netto gjeld i vektene**: gjeld minus overskuddskasse (B3).
- **Skatteskjoldet** diskonteres med r<sub>U</sub> ved konstant D/V og med r<sub>D</sub> ved fast
  plan. Bare renter gir skjold, aldri hovedstolen (B8). Permanent gjeld uten vekst: WACC-metoden
  virker, r<sub>wacc</sub> = r<sub>U</sub>(1 − τ<sub>c</sub>D/V<sup>L</sup>) (A2). Konstant
  rentedekning: V<sup>L</sup> = (1 + τ<sub>c</sub>k)V<sup>U</sup> (B1). Debt capacity
  D<sub>t</sub> = d × V<sup>L</sup><sub>t</sub> (B2).
- **Diskret diskontering overalt**: PV(K) = K/(1 + r<sub>f</sub>)<sup>T</sup>, y = (K/D)<sup>1/T</sup>
  − 1, også for brøkdeler av år. Månedsrente er (1 + r)<sup>1/12</sup> − 1 (A4, D3). Aldri e<sup>−rT</sup>.
- **Ingen Black-Scholes-regning**, heller ikke på realopsjoner. Bare intuisjon: hva skjer med
  prisen når σ, T, r<sub>f</sub>, S eller K øker. Amerikansk mot europeisk kan også komme (A6, D1).
- **Reelle sannsynligheter** diskonteres med kapitalkostnaden, som er r<sub>f</sub> bare når
  risikoen ikke er priset (β = 0). Feilen er reelle sannsynligheter med r<sub>f</sub> når risikoen
  er priset (A3). Risikonøytrale sannsynligheter diskonteres alltid med r<sub>f</sub>.
- **Nedleggelse sammenlignes med 0**: verdien av å stoppe er 0, ikke den negative verdien av å
  fortsette (D12). En opsjon er aldri verdt mindre enn 0.
- **Tvillingen priser samme kontantstrøm**: en tvilling (eller et replikerende verdipapir) kan
  bare brukes når den har samme risiko, i realopsjoner betyr det samme utbetaling tilstand for
  tilstand (eller proporsjonal med den). Prosjektet er verdt det replikeringen koster.
- **Sannsynligheten for en avtale** i M&A diskonteres over T år: (1 + r<sub>f</sub>)<sup>T</sup>,
  med T = 0.25 for et kvartal (B12, D13).
- **Governance er generell**, ikke norsk aksjelov, med mindre spørsmålet sier ASA eller Norge (A7).
- **Konkurskostnader**: 3–4 % for store og 20–25 % for små selskaper, ganget med en
  konkurssannsynlighet under 1 % i året (A8). Brannsalg og indirekte kostnader teller (D6).
- **Oppkjøp**: målselskapet rundt 15 % unormal avkastning, kjøperen rundt 1 % og negativ i om lag
  halvparten (A5).
- **Fire desimaler** på renter, sannsynligheter og betaer. Mellomtallene du skriver, summerer
  til totalen du skriver (forfatterspek § 9.5).

## 4. Vanskelighet og blanding

Nivået er deloppgavene i H2024 og H2025. Del a er lett (D2). Sikt på:

- **Regnetemaene** (tvilling, mm, skatt, wacc-apv, opsjoner, kreditt, realopsjon, ma) er rundt 75
  % familier med tallsvar og 25 % statiske spørsmål om mekanismen («why is r<sub>wacc</sub> below
  r<sub>U</sub>?», «what happens to the price if σ rises?»). Kurbatov har 3–5 poeng intuisjon på
  slutten av regneoppgavene.
- **Agent, info og utbytte** er halvt om halvt. **Governance** er nesten bare statiske spørsmål.
- **Hver regnerutine temaet har på eksamen, skal ha minst én familie.** Bruk temaets innføring,
  kursplanen og forelesningsnotatet (særlig B- og D-punktene) som liste.
- Noen spørsmål tar to–tre steg i kjeden (β<sub>U</sub> → β<sub>E</sub> → r<sub>E</sub> →
  r<sub>wacc</sub>), slik eksamen gjør. Spørsmålet må likevel gi alle tallene det trenger.

## 5. Id-er, filer, mål og fordelingen på fire skribenter

Id-ene er lagringsnøkler og må aldri endres når de først er brukt. Et spørsmål som skrives om til
noe annet, får ny id. Familier heter `<prefiks><kort navn><n>` (`tvi-unl1`, `wac-apv2`), statiske
`<prefiks>s01`, `<prefiks>s02` … (`gov-s01`). Målet kan overskrides med inntil 15 %.

| Skribent | Tema | Fil | Prefiks | Mål |
|---|---|---|---|---|
| 1 · Verdsettingskjeden | tvilling | `tvilling.py` | `tvi-` | 60 |
| 1 | wacc-apv | `wacc_apv.py` | `wac-` | 70 |
| 1 | skatt | `skatt.py` | `skt-` | 55 |
| 2 · Kapitalstruktur | mm | `mm.py` | `mm-` | 60 |
| 2 | utbytte | `utbytte.py` | `utb-` | 45 |
| 2 | agent | `agent.py` | `agt-` | 45 |
| 3 · Opsjoner | opsjoner | `opsjoner.py` | `ops-` | 55 |
| 3 | kreditt | `kreditt.py` | `kre-` | 45 |
| 3 | realopsjon | `realopsjon.py` | `reo-` | 60 |
| 4 · Informasjon, M&A og governance | info | `info.py` | `inf-` | 45 |
| 4 | ma | `ma.py` | `ma-` | 55 |
| 4 | governance | `governance.py` | `gov-` | 45 |

`tema=` i hvert spørsmål er temaets id fra tabellen (`"wacc-apv"` med bindestrek, selv om fila
heter `wacc_apv.py`).

**Eksempelmodulen.** `eksempel.py` har `tvi-unl1` (skribent 1), `mm-rec1` (skribent 2) og
`gov-s01` (skribent 4). Du kan flytte ditt eksempel uendret inn i modulen din med samme id
og bygge videre på det. Rediger ikke `eksempel.py`. Koordinatoren sletter den før den samlede
byggingen, så samme id står aldri to steder i den ferdige banken. Si i rapporten om du flyttet
eksempelet.

## 6. Arbeidsrutinen

```bash
python3 tools/bygg-trening.py fie402 --bare tvilling.py wacc_apv.py skatt.py      # bare dine filer
node tools/sjekk-trening.js fie402 --fil fag/fie402/_trening/_utkast-skatt-tvilling-wacc_apv.js
python3 tools/bygg-trening.py fie402 --bare tvilling.py --vis tvi-unl2              # les variantene
```

Utkastet heter `_utkast-<modulene i alfabetisk rekkefølge>.js`; byggeren skriver navnet.

1. Skriv én familie, bygg, **les alle variantene med `--vis`** (linjen `TALL:` viser tallsvaret og
   verdiene bak alternativene) og regn minst to av dem uavhengig i `python3` fra spørsmålsteksten
   alene, med full presisjon. Sjekk at det eksakte svaret ligger innenfor toleransen av fasiten.
   Først da neste familie.
2. Les spørsmålet som om alternativene ikke fantes («Regn selv først»): kan det bare gi ett tall,
   og er enheten klar?
3. Skriv de statiske spørsmålene. Løs hvert av dem selv før du skriver fasiten.
4. Kjør kontrollen til den sier «Ingen feil». Les advarslene for dine temaer.
5. **Ikke bygg `fag/fie402/trening.js`** (uten `--bare`). Den bygges samlet når alle er ferdige.
6. Ikke rør andre filer enn dine egne moduler. Trenger du en hjelper, definer den lokalt i din
   egen fil, ikke i `trening_lib.py`. `temaer.py` eies av koordinatoren.

## 7. Rapporten din

Når du er ferdig, svar med:

- antall familier, varianter og statiske spørsmål per tema, hvor mange som har tallsvar
  og hvilke regnerutiner fra eksamen (og fra B- og D-punktene i forelesningsnotatet) som er dekket
- hva du regnet uavhengig og hva du fant og rettet underveis
- alt du er usikker på (en konvensjon, en formel, et tall), med fil og id
- avvik mellom manualen, kjernepensum og Kurbatovs forelesninger som du oppdaget
- om du flyttet eksempelet inn i modulen din
