# FIE459 · Eksamenstrening: spesifikasjon for skribentene (LES HELE)

Du skriver flervalgsspørsmål til **eksamenstreningen** (`/trening`) i FIE459 Sustainable
Finance. Magnus ba om den 21. november 2026: «eksamenstrening slik som tidligere. Delt opp
basert på de forskjellige temaene i faget. Bare multiple choice og meget eksamensrelevant.»

Modulen finnes alt for FIE432 og FIE402. Leseren velger tema og antall, får spørsmålene i
tilfeldig rekkefølge, svarer, får **en kort fasit med en gang** og kan åpne **en full
gjennomgang**. Før svaret kan hun be om **hjelp i tre trinn**.

## 0. Eksamen styrer alt

- 3 timers digital skoleeksamen, **lukket bok**, 16. desember 2026, flervalg og sant/usant, på
  engelsk. Denne banken er **bare flervalg med fire alternativer**.
- Foreleseren (Jiaying Li): «The focus of the course is on economic intuition, not calculation»
  og «Memorizing definitions is not the best strategy!». Forelesning 13: eksamen har fokus på
  «concepts and frameworks learned in class».
- **Ingen minuspoeng** (ingenting i kildene sier at feil svar trekker). Skriv derfor aldri om å
  stå over eller om minus.

**«Meget eksamensrelevant» betyr:** hvert spørsmål tester et begrep, et rammeverk, en
skillelinje eller et funn som foreleseren faktisk la vekt på, og det tester det slik en
flervalgseksamen gjør:

- **Bruk på en kort case** (minst halvparten): et selskap, en investor, en bank eller en
  forsikrer gjør noe; hvilket begrep, hvilket trinn, hvilken strategi, hvilket problem er det?
- **«Which statement is correct?»** der de gale påstandene er galne på én konkret måte
  (byttet retning, feil forfatter, feil trinn, for sterk påstand).
- **Skillelinjer**: CSR mot SRI mot ESG, value mot values, financial mot impact materiality, risk
  mot mispricing, green bond mot sustainability-linked bond, risk-based mot value-based banking.
- **Rammeverk i riktig rekkefølge eller med riktig innhold**: SF 1.0–3.0, Starks' spekter,
  Unerman-stigen, Ostroms prinsipper, katastrofemodellen, TCFD-pilarene.
- **Hovedfunnet i de navngitte studiene** foreleseren viste (Flammer 2021, Hart og Zingales,
  Starks 2023, Giglio et al., Dimson, Karakaş og Li). Ikke småtall, årstall eller prosentsatser
  med mindre foilen gjør tallet til poenget.

Unngå rene huskespørsmål («In which year …»), spørsmål om detaljer som bare står i én
bisetning, og spørsmål der svaret avhenger av en tolkning kildene ikke støtter.

## 1. Kildene, i denne rekkefølgen

1. **Manualkapitlet** `fag/fie459/_fragmenter/kN.html`. Kontrollert mot foilene og artiklene. Hold
   deg innenfor det.
2. **Foilteksten** `FIE459 Sustainable Finance files/_tekst/FIE459_H26_N_*.txt` for hva foreleseren
   vektla. Gjesteforelesningene ligger i samme mappe (se § 5).
3. **Rammeverkene som bare finnes som bilder**: `docs/fie459-forfatterspek.md` § 5.
4. **Kjente feil i foilene**, som du skal lære riktig: alfa-fortegnet (forelesning 8 og 9),
   «return on assets» i forelesning 6 er omløpshastighet (0.58), TCFD stavet «TFCD», «DNB (2017)»
   i forelesning 12 er De Nederlandsche Bank, «Bird & Walters» er Bird & Waters (1989),
   Kotsantonis og Serafeim (2019). Se `SuperEnkelEksamenHjerne/20 Fag/FIE459 Sustainable Finance.md`.
5. **Det som finnes fra før**, for å se hva som er vektet og for å **unngå å kopiere**:
   `fag/fie459/quiz.js`, `fag/fie459/_kjerne/kj*.js`, `fag/fie459/_forelesninger/fN.js`. Samme
   begrep er greit; samme case eller samme formulering er det ikke.

**Ikke dikt opp tall, år, sitater, studier eller funn.** Fiktive selskaper i casene er greit
(«a Nordic utility», «Fjordbank»). Ekte selskaper bare når foilene bruker dem (Oatly, Danone,
Unilever, Klarna, ING, DNB, Heidelberg Materials).

## 2. Formatet

Python-moduler i `fag/fie459/_trening/<modul>.py`. Bare **statiske** spørsmål (ingen familier,
ingen tallsvar):

```python
from trening_lib import *  # noqa: F401,F403

statisk(
    "sf-s01", tema="sf", type="tolkning",
    hjelp=hjelp3(
        "Tema: hvilket begrep spørsmålet handler om, uten formel (≤ 35 ord).",
        "Regel: rammeverket eller definisjonen slik kurset skriver den, uten svaret (≤ 70 ord).",
        "<p><b>Step 1: …</b> …</p><p><b>Step 2: …</b> …</p>",   # fremgangsmåten, 30–100 ord
    ),
    q="<p>Kort case eller påstand. Avslutt med selve spørsmålet.</p>",
    alternativer=[
        R("Det riktige alternativet"),
        F("Galt alternativ", "Fella: hva som er galt med akkurat dette valget, én til to setninger."),
        F("Galt alternativ", "Fella."),
        F("Galt alternativ", "Fella."),
    ],
    kort="<p><b>Svaret i fet skrift.</b> Én til to setninger om hvorfor. Under 50 ord.</p>",
    full="<p>…</p>",   # gjennomgangen, se § 3
)
```

- `type`: `tolkning` (case), `paastand` (hvilken påstand stemmer), `begrep`, `fakta` (et funn
  fra en navngitt studie). Sikt mot minst halvparten `tolkning`.
- **Nøyaktig fire alternativer, nøyaktig ett riktig.** Byggeren stokker dem med jevn fasit på A–D.
- Påstandsspørsmål med «Only I», «Only II», «Both I and II», «Neither» trenger
  `rekkefolge="fast"`. Bruk høyst tre slike per tema. Ellers ingen «all of the above» og ingen
  «none of the above».
- Referanse for kvalitetsnivået: `fag/fie402/_trening/governance.py`, `gov-s02` og `gov-s03`.

## 3. Kort fasit, full gjennomgang, hjelp og feller

**`kort`**: svaret i fet skrift og det ene argumentet som avgjør. Under 50 ord.

**`full`** (100–220 ord), for en leser som ikke kan stoffet:
1. **Begrepet eller rammeverket** med vanlige ord, og hvorfor det er slik.
2. **Hvorfor svaret er riktig her**, knyttet til casen.
3. **Den vanligste forvekslingen** og hvordan du skiller (fellene vises i tillegg automatisk).
4. **«Remember:»** til slutt: regelen på én linje.
Nevn forelesningen eller studien («lecture 6», «Flammer (2021)») der det hjelper.

**`hjelp3(tema, regel, oppsett)`** vises ett trinn om gangen før leseren svarer. **Ingen av de tre
røper svaret**: ikke teksten i det riktige alternativet, ikke hvilket det er, ikke tall fra
alternativene.

**Fellene** vises før fasiten i «Prøv igjen først». En felle sier hva som er galt med *dette*
valget, ikke hva som er riktig. Ikke siter det riktige alternativet, ikke skriv «Right idea,
but …» som røper (fallgruve 12).

**Lengden på alternativene:** like presise og omtrent like lange. **Fasiten skal være det lengste
alternativet i rundt én av fire**, ikke oftere og ikke aldri (fallgruve 7y). Legg begrunnelsen i
`full`, ikke i fasiten.

## 4. Språk

- **Engelsk.** Tiltale «you». Kort og direkte.
- **Ingen tankestrek** (— eller –) noe sted.
- **Ingen komma foran «and»**, heller ikke i oppramsinger («a, b and c»).
- **Ingen bokstavhenvisninger** («option B», «(C)») og **ingen henvisninger til andre
  spørsmål** («previous question»).
- Desimalpunktum. Skriv tall med vanlige sifre.
- HTML: `<p>`, `<b>`, `<i>`, `<sub>`, `<sup>`, `<br>`, `<ul><li>`. Skriv `&amp;` for &, og
  `&lt;IR&gt;` for &lt;IR&gt;.

## 4b. Hurtiginnføringen for temaene dine

Skriv `fag/fie459/_trening/_intro_<din del>.py` med én oppføring per tema:

```python
INTRO = {
    "sf": dict(
        formeltittel="Concepts you must know",
        tester=["Hva temaet tester, 3–5 punkter"],
        formler=[("Begrep eller rammeverk", "Én til to setninger om hva det er og hva det skilles fra."), ...],  # 5–9
        feller=["Typiske feil på eksamen, 3–5 punkter"],
    ),
}
```

Samme språkregler. Kontrollen leser dem.

## 5. Temaene, filene og skribentene

Id-ene er lagringsnøkler og endres aldri. Statiske spørsmål heter `<prefiks>s01`, `<prefiks>s02`
… Målet kan overskrides med inntil 15 %, men ikke med svakere spørsmål.

| Skribent | Tema (`tema=`) | Fil | Prefiks | Mål | Kilder |
|---|---|---|---|---|---|
| A | sf | `sf.py` | `sf-` | 30 | k1, L1, Starks (2023) |
| A | etikk | `etikk.py` | `eti-` | 30 | k2, L2 |
| A | eksternaliteter | `eksternaliteter.py` | `ext-` | 30 | k3, L3 |
| B | stakeholder | `stakeholder.py` | `stk-` | 30 | k4, L4, Hart og Zingales |
| B | governance | `governance.py` | `gov-` | 30 | k5, L5 |
| B | forretningsmodell | `forretningsmodell.py` | `bm-` | 30 | k6, L6 |
| C | rapportering | `rapportering.py` | `rep-` | 30 | k7, L7, PwC |
| C | investering | `investering.py` | `inv-` | 30 | k8, L8 |
| C | esg-priser | `esg_priser.py` | `esg-` | 30 | k9, L9 |
| D | obligasjoner | `obligasjoner.py` | `bnd-` | 30 | k10, L10 |
| D | bank | `bank.py` | `bnk-` | 30 | k11, L11, DNB |
| D | forsikring | `forsikring.py` | `ins-` | 30 | k12, L12 |
| E | koalisjoner | `koalisjoner.py` | `coa-` | 30 | k13, L13 |
| E | gjest | `gjest.py` | `gst-` | 24 | Folketrygdfondet, Fondsfinans, Heidelberg Materials (8 hver) |

Gjesteforelesningene (tekst i `_tekst/`): `Guest_lecture_NHH_Sustainable_Finance_TF_September_26.txt`
(Folketrygdfondet), `M_Brooks_NHH_okt_2026.txt` (Fondsfinans) og
`20261027_NHH_Sustainable_Finance.txt` (Heidelberg Materials, Brevik CCS). PDF-ene ligger i
`FIE459 Sustainable Finance files/`. Mange foiler er bilder: les dem med Read-verktøyet når
teksten er tynn. Gjesteforelesningene ble ikke tatt opp og er ikke i manualen, så spør bare om
hovedpoengene foilene selv gjør tydelige.

**Dekning:** fordel spørsmålene over hele forelesningen. Hvert begrep eller rammeverk som står i
kapitlets «exam» eller «remember»-bokser, i kjernepensum eller i `kunne`-lista i
forelesningsgjennomgangen, skal ha minst ett spørsmål.

## 6. Arbeidsrutinen

```bash
python3 tools/bygg-trening.py fie459 --bare sf.py etikk.py eksternaliteter.py
node tools/sjekk-trening.js fie459 --fil fag/fie459/_trening/_utkast-eksternaliteter-etikk-sf.js
```

Byggeren skriver navnet på utkastet. Kjør kontrollen til den sier «Ingen feil», og les
advarslene for dine temaer.

1. Skriv spørsmålene tema for tema. **Løs hvert spørsmål selv** før du skriver fasiten: er det
   nøyaktig ett forsvarlig svar etter kildene?
2. **Blindtest** til slutt: skriv ut spørsmålene uten fasit (et lite skript i
   `/private/tmp/claude-501/-Users-magnusfjeld-Documents-Magnus-Fjeld-NHH/d8fcb6a6-9b2c-4346-b9e5-66d957577c1e/scratchpad/trening-<din del>/`),
   svar, og sammenlign.
3. **Ikke bygg `fag/fie459/trening.js`** (uten `--bare`). Ikke rør andre filer enn dine egne
   moduler og din `_intro_`-fil. `temaer.py` eies av koordinatoren.

## 7. Rapporten din

Antall spørsmål per tema og type, hva du dekket og bevisst utelot, resultatet av blindtesten,
kontrollens oppsummering og alt du er usikker på (id og hvorfor).
