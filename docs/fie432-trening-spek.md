# FIE432 · Eksamenstrening: spesifikasjon for skribentene (LES HELE)

Du skriver spørsmål til **eksamenstreningen** i FIE432 Personlig økonomi: en stor bank med
spørsmål i nøyaktig samme format og vanskelighet som eksamen. Leseren velger tema og antall,
får spørsmålene i tilfeldig rekkefølge, svarer og får **en kort fasit med en gang** og en
knapp for **en full gjennomgang** som skal få en som ikke kan stoffet fra før, til å forstå
det.

Magnus' ønske, ordrett: «en stor mengde med spørsmål i samme format og vanskelighet som de
som kommer på eksamen … Først en ganske kort fasit, men med knapp for å få skikkelig
detaljert gjennomgang slik at man kan virkelig forstå det om man ikke kan det fra før … Det
er lov med flere spørsmål som er veldig like, men forskjellige tall.»

## 0. Hva du leser før du skriver

1. Denne fila, hele.
2. Referanseeksempelet: `fag/fie432/_trening/aksjonar.py` (familien `aks-skj1` og det
   statiske spørsmålet `aks-b01`). Det er kvalitetsnivået.
3. Verktøyet: `tools/trening_lib.py` (hjelperne) og `tools/bygg-trening.py` (byggeren).
4. For **hvert av temaene dine**:
   - kjernepensumdelen: `fag/fie432/_kjerne/kjN.js` (temaenes `kjerne` i `temaer.py`).
     Den har regelverket kondensert og kontrollert, med «Må kunne»-boksen.
   - manualkapitlene: `fag/fie432/_fragmenter/kN.html` (temaenes `kap`). Manualen er rettet
     mot lov og forelesning i flere runder. Er manualen og kjernepensum uenige, si fra i
     rapporten din.
   - regnerutinene og fellene i `docs/fie432-research/01-eksamens-dna.md` § 4 (R1–R20) og
     spørsmålsregisteret i § 1 (H2022, H2024, H2025 er flervalg og ligner mest på 2026).
     **NB:** DNA-dokumentet er eldre enn rettingene. Der det sier noe annet enn kjernepensum
     eller manualen (for eksempel stresstesten i utlånsforskriften, som nå er +3
     prosentpoeng og minst 7 %), gjelder kjernepensum og manualen.
   - satsene: `docs/fie432-research/05-satser-2026.md`.
   - eksisterende oppgaver i samme kapittel: `fag/fie432/_kapoppg/kN.js` og
     `fag/fie432/sett.js`. Ikke kopier dem. Bruk dem til å se hvordan eksamen spør og
     hvilke feller som virker.

## 1. Formatet

Hvert spørsmål har: spørsmålstekst `q`, **fire alternativer** der nøyaktig ett er riktig, en
**felle** per galt alternativ, en **kort fasit** og en **full gjennomgang**. Eksamen gir
+3 for rett, −1 for feil og 0 for blankt, så de gale alternativene må være laget av ekte
feil som en student faktisk gjør. Det er det som gjør det mulig å eliminere og dermed svare.

Du skriver Python-moduler i `fag/fie432/_trening/<tema>.py`, én per tema, med to slags
spørsmål:

### 1a. Familier (regnespørsmål med nye tall)

En familie er en funksjon som får en tilfeldighetsgenerator `r` og returnerer ett spørsmål.
Byggeren kaller den `antall` ganger med faste seeds. **Alle tall i spørsmålet, fasiten,
gjennomgangen og fellene skal komme fra de samme variablene**, så aritmetikken er riktig per
konstruksjon.

```python
@familie("aks-skj1", tema="aksjonar", antall=8, tittel="Skattepliktig utbytte, ett år")
def _(r):
    kost = r.randrange(200_000, 900_001, 50_000)
    ...
    ulike(riktig, f1, f2, f3, rel=0.02)          # kast Avvis hvis to alternativer er for like
    return sporsmal(q, [R(kra(riktig), riktig), F(kra(f1), "felle …", f1), ...], kort, full)
```

- **Trekk tall som ser ut som eksamenstall**: runde beløp (kr 400 000, kr 2 500 000),
  satser med én desimal (3,6 %), sannsynligheter som 1 % eller 2,5 %. Ikke kr 437 912.
- **Varier mer enn tallene der det er naturlig**: navn, aktivum, om spørsmålet spør etter
  grunnlaget eller skatten, om det er ett eller to år. To varianter skal ikke føles som
  samme oppgave med ett tall byttet, selv om de er det.
- `antall`: 5–10. Bedre flere familier med 6 varianter enn få med 15.
- **Hver felle beregnes i hver variant** av den feilen den beskriver. Felleteksten sier
  feilen og regnestykket: «Glemt oppjusteringen: 50 000 × 22 % = 11 000.»
- `raise Avvis(...)` når tallene gir et dårlig spørsmål (negativt grunnlag, to like
  alternativer, en felle som tilfeldigvis gir riktig svar). Byggeren trekker på nytt.
- Rekkefølgen på alternativene bestemmer byggeren (stokking med jevn fordeling på A–D).
  Bruk `rekkefolge="stigende"` bare når fellene ligger på begge sider av svaret og bytter
  plass mellom variantene. Kontrollen advarer når fasiten står på samme plass i over 60 %
  av en families varianter.

### 1b. Statiske spørsmål (begrep, påstand, formel, fakta)

```python
statisk("ins-s01", tema="insidens", type="formel", q=..., alternativer=[R(...), F(..., "felle"), ...],
        kort=..., full=...)
```

`type` er en av: `begrep` (hva noe betyr, hvorfor), `paastand` (hvilken påstand er riktig
eller gal), `formel` (hvilket uttrykk er riktig, som H2024 oppgave 8 og H2025 oppgave 7),
`fakta` (regler og satser, som H2025 oppgave 12), `tolkning` (hva et resultat betyr).

- Formelalternativene skal være laget som eksamen lager dem: telleren og nevneren byttet,
  fortegnet snudd, et ledd sløyfet. Bruk `<sub>`, `<sup>`, `−` (U+2212) og `×`.
- Påstandsspørsmål med «Bare I», «Bare II», «Begge», «Ingen» trenger `rekkefolge="fast"`.
- **Fallgruve 7y: fasiten skal ikke være det lengste alternativet.** Skribenter skriver
  instinktivt det riktige alternativet mest presist og derfor lengst. Gjør de gale like
  lange og like presise. Kontrollen advarer over 40 % for hele banken. Det motsatte er også en
  feil: fasiten skal ikke alltid være kortest.

## 2. Den korte fasiten og den fulle gjennomgangen

**`kort`**: svaret i fet skrift og det ene regnestykket eller den ene grunnen som avgjør det.
Én til tre setninger, under 50 ord. Den skal kunne leses på fem sekunder.

```html
<p><b>kr 16 400.</b> Skjermingsfradraget er 400 000 × 3,9 % = 15 600. Skattepliktig utbytte er 32 000 − 15 600 = 16 400.</p>
```

**`full`**: en gjennomgang for en leser som ikke kan dette fra før. 120–350 ord. Den skal ha:

1. **Hva begrepet er**, med vanlige ord, i to–tre setninger. Ikke anta at leseren husker
   definisjonen. Si hvorfor regelen finnes når det hjelper på forståelsen.
2. **Løsningen steg for steg** med tallene fra spørsmålet: `<p><b>Steg 1: …</b> …</p>`.
3. **En kontroll** som kan feile, når det finnes en: oppjustering på grunnlaget og på
   satsen, gjeldsfordeling per aktivum og som sum, ∂P/∂t − ∂p/∂t = 1. En «kontroll» som
   bare gjentar definisjonen, er ingen kontroll (se FIE432-notatet om blind gjennomgang).
4. **«Husk:»** til slutt: regelen på én linje.

Fellene vises automatisk under gjennomgangen, merket med bokstaven til hvert galt
alternativ. **Skriv derfor aldri «alternativ B» eller «(C)» i noen tekst**: alternativene
stokkes ved bygging. Bokstaven ville pekt feil. Skriv «det gale alternativet som glemmer
oppjusteringen».

## 3. Språk og regler

- **Bokmål.** Tiltale «du». Kort og direkte.
- **Ingen tankestrek (—)** noe sted. Bruk komma, kolon eller ny setning.
- **Ingen komma foran «og».** Magnus' skriveregel, uten unntak. Kontrollen stopper det.
  Del heller setningen: «Kostprisen er kr 400 000. Det finnes ingen ubenyttet skjerming.»
- Desimalkomma og hardt mellomrom som tusenskille. Bruk hjelperne: `kr()`, `kra()` (øre bare
  når beløpet ikke er helt), `tall()`, `talla()`, `pst()` (brøk til prosent),
  `prosent_tekst()` (tall som alt er prosent), `mill()`, `gen()` (genitiv av navn:
  «Jonas'»). Minus er `−` (U+2212), gange er `×`.
- **Oppgi alle satser i spørsmålsteksten**, slik eksamen gjør, også 22 % og 1,72. Leseren
  skal kunne løse spørsmålet uten å huske årets sats. Fakta-spørsmål om dagens regler er
  unntaket; der er det regelen som testes.
- **Dagens regler er 2026-reglene** fra `05-satser-2026.md` og kjernepensum: eierskatt
  37,84 % (1,72 × 22 %), formuesskatt 1,0 % over kr 1 900 000 og 1,1 % over kr 21 500 000
  (enslig), primærbolig 25 % opp til kr 14 000 000 og 70 % over, aksjer 80 %, stresstest +3
  prosentpoeng og minst 7 %, IPS kr 25 000. **Skjermingsrenten for 2026 finnes ikke ennå**:
  oppgi den i spørsmålet som et eksempeltall eller som et tidligere års sats.
- Kursets konvensjoner (forfatterspek § 4): formuesskatten faller på formuen ved
  **inngangen** til året (t = τ<sub>w</sub>/r), gjeld fordeles etter bruttoverdi før rabatt,
  gjeld på primærbolig avkortes ikke, effektiv skattesats = betalt skatt / bruttoinntekt.
- Spørsmålene trekkes **tilfeldig og hver for seg**. Ingen «oppgaven over», «samme person
  som», «forrige spørsmål». Hvert spørsmål må stå på egne ben.
- Ikke ta politisk parti om formuesskatten: gjengi argumentene som argumenter.
- Lovpåstander må stemme med loven. Er du usikker, sjekk kjernepensum og manualen, som er
  kontrollert mot Lovdata. Er de uklare, la være å lage spørsmålet.

## 4. Vanskelighet og blanding

Samme nivå som H2022, H2024 og H2025. De fleste eksamensspørsmål er ett regnestykke eller
ett begrep med et par steg. Sikt på:

- **Rundt halvparten regning** (familier) og halvparten begrep, påstand, formel og fakta
  (statiske), justert etter hva temaet faktisk testes med. Insidens er mye
  formelgjenkjenning, internasjonal skatt og pensjon er mye begrep og fakta.
- **Hver regnerutine fra DNA § 4 som hører til temaet ditt, skal ha minst én familie.**
- De fleste spørsmålene på standard eksamensnivå, noen med et ekstra steg (to år i
  skjermingen, både bunnfradrag og rabatt), noen enkle grunnspørsmål.
- Distraktorene er nesten aldri tilfeldige tall: de er (1) mellomtall fra din egen
  utregning, (2) svaret på et nabospørsmål, eller (3) resultatet av å hoppe over nøyaktig
  ett ledd. Bruk DNA-ens «Vanlig felle» for hver rutine.

## 5. Id-er, filer og mål

Én fil per tema i `fag/fie432/_trening/`. Id-ene er lagringsnøkler og må aldri endres når
de først er brukt. Et spørsmål som skrives om til noe annet, får ny id.

| Tema | Fil | Prefiks | Mål (spørsmål) |
|---|---|---|---|
| skattesystem | `skattesystem.py` | `ska-` | 60 |
| aksjonar | `aksjonar.py` | `aks-` | 80 |
| formue | `formue.py` | `frm-` | 60 |
| avkastningsskatt | `avkastningsskatt.py` | `avk-` | 50 |
| insidens | `insidens.py` | `ins-` | 80 |
| noytralitet | `noytralitet.py` | `noy-` | 45 |
| internasjonal | `internasjonal.py` | `int-` | 45 |
| portefolje | `portefolje.py` | `prt-` | 80 |
| pensjon | `pensjon.py` | `pen-` | 55 |
| laan | `laan.py` | `lan-` | 45 |
| forsikring | `forsikring.py` | `fors-` | 60 |
| psykologi | `psykologi.py` | `psy-` | 25 |

Familier heter `<prefiks><kort navn>`, for eksempel `aks-skj2` og `ins-lin1`. Statiske heter
`<prefiks>s01`, `<prefiks>s02` … (for eksempel `ins-s01`). Målet kan overskrides med
inntil 15 %, ikke mer: kvalitet først.

## 6. Arbeidsrutinen

```bash
python3 tools/bygg-trening.py fie432 --bare insidens.py noytralitet.py      # bygger bare dine filer
node tools/sjekk-trening.js fie432 --fil fag/fie432/_trening/_utkast-insidens-noytralitet.js
python3 tools/bygg-trening.py fie432 --bare insidens.py --vis ins-lin1          # les variantene
```

1. Skriv en familie, bygg, **les alle variantene med `--vis`** og regn minst to av dem
   uavhengig i `python3` fra spørsmålsteksten alene. Først da neste familie.
2. Skriv de statiske spørsmålene. Løs hvert av dem selv før du skriver fasiten.
3. Kjør kontrollen til den sier «Ingen feil». Les advarslene for dine temaer.
4. **Ikke bygg `fag/fie432/trening.js`** (uten `--bare`). Den bygges samlet når alle er
   ferdige. Flere skribenter jobber samtidig.
5. Ikke rør andre filer enn dine egne temafiler. Trenger du en ny hjelper i
   `trening_lib.py`, definer den lokalt i din egen fil i stedet.

## 7. Rapporten din

Når du er ferdig, svar med:

- antall familier, varianter og statiske per tema og hvilke regnerutiner fra DNA § 4 som
  er dekket
- hva du regnet uavhengig og hva du fant og rettet underveis
- alt du er usikker på (en regel, en konvensjon, et tall), med fil og id
- eventuelle avvik mellom manualen og kjernepensum, eller feil du så i dem
