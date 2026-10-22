# FIE432: forfatterspesifikasjon for sjangertrening

LES HELE FØR DU SKRIVER. Les så `docs/fie432-forfatterspek.md` §1 (språk og leser), §4
(notasjon og kursets konvensjoner), §6 (eksamensforankring), §7 (nøyaktighet) og §9
(lærdommene fra kontrollen), og eksamens-DNA-et i `docs/fie432-kursplan.md`. Alt der gjelder
her uendret. Satsene for 2026 står i `docs/fie432-research/05-satser-2026.md`.

---

## 1. Hva dette er

En egen fane, «Sjangertrening», der hver **sjanger** er én type eksamensoppgave
(stykkskatt-insidens, skjermingsregningen, gjeldsfordelingen i formuesskatten …). Hver
sjanger er en **stige** av korte steg som starter som om leseren ikke kan noe om temaet,
og slutter med oppgaver på eksamensnivå. Etter siste steg skal han kunne løse nesten alle
eksamensoppgaver i sjangeren.

FIE402 har allerede dette (`docs/fie402-sjanger-spek.md`, `fag/fie402/_sjangre/`), og Magnus
syntes det ble veldig bra. Opplegget kommer opprinnelig fra FIE432, og så slik ut:

**Hvert steg har samme oppbygning:**
1. Kort teori om **ett** nytt begrep
2. Et lite talleksempel med pene tall
3. Én flervalgsoppgave med fire alternativer på akkurat det begrepet
4. Han svarer med en bokstav og får fasit

**Etter hvert svar får han:** riktig eller galt, utregningen steg for steg, en kontroll av
svaret, og hvilken typisk feil hvert galt alternativ er laget av.

> Steg 1: Forventet verdi mot forventet nytte. Teori: E[U(W)] betyr nytte først og gjennomsnitt
> etterpå; konkav U gir E[U(W)] &lt; U(E[W]). Eksempel: W = 49, L = 48, π = 0,5, U = √W gir
> E[W] = 25, U(E[W]) = 5 og E[U(W)] = 4. Oppgave: W = 100, L = 64, π = 0,25; finn E[U(W)].
> Alternativer: 9 (riktig), 84 (forventet verdi brukt), 9,17 (U(E[W]) brukt), 7
> (sannsynlighetene byttet om). Kontroll: 9 &lt; √84 ≈ 9,17, i tråd med konkav U.
>
> Steg 2: Sikkerhetsekvivalent og risikopremie, med samme tall: CE = 81, RP = 3. Gale
> alternativer: −3 (feil fortegn), 75 (glemt å invertere nyttefunksjonen), 35 (sannsynlighetene
> byttet om). Kontroll: √81 = 9 = E[U(W)].
>
> Steg 3: Rettferdig premie og maksimal betalingsvilje: rettferdig premie = π·L,
> m = W − CE = π·L + RP. Gale alternativer laget av rettferdig premie, risikopremien, og CE
> oppgitt uten å trekke fra startformuen.

**Vanskeligheten øker for hvert steg, og hvert nytt begrep bygger på det forrige.**

## 2. Eksamen er flervalg, og stigen ender der

Eksamen i FIE432 er fire timers flervalg med fire alternativer (fra 2026: +3/−1/0). Stigen har
ingen minuspoeng, fordi den er for læring, men **de siste stegene skal se ut som de virkelige
eksamensspørsmålene i sjangeren**: samme form, samme slags gale alternativer, nye tall. Alle 227
eksamensspørsmål fra ni sett er registrert i `docs/fie432-research/01-eksamens-dna.md` med tema,
type og regnerutine; de tre flervalgssettene og kursgodkjenningstesten ligger med fasit i
`fag/fie432/sett.js`. Bruk dem til å finne hver spørsmålstype i sjangeren.

Sensorveiledningenes feilmønstre (kursplanen) er de beste gale alternativene: glemt ubenyttet
skjerming, oppjustering to ganger eller ingen, gjeld ikke redusert med rabatten eller redusert
også for primærbolig, formuesskatt av markedsverdi i stedet for formuesverdi, effektiv sats av
skattepliktig i stedet for brutto inntekt, insidensformelen med byttet teller, og så videre.

## 3. Stigen

- **Så få steg som trengs, ikke et fast tall** (Magnus' beskjed 22. oktober 2026). Typisk 8–12;
  en smal sjanger kan klare seg med færre, og bare en uvanlig bred sjanger bør gå over 14. Større
  hopp er greit der begrepet er enkelt: to lette ting kan dele et steg. Kutt steg som bare
  gjentar en rutine med nye tall. Si i rapporten hvorfor stigen fikk det antallet den fikk.
- **Steg 1 forutsetter ingenting** utover å kunne regne prosent. Ett begrep, én formel.
- **Ett nytt begrep per steg.** Et steg kan bruke alt fra tidligere steg i samme stige, men
  aldri noe som ikke er introdusert der. Hver stige står på egne ben.
- **Rampen:** steg 1–4 én formel eller én idé hver; de midterste kombinerer to–tre ting fra
  tidligere steg; de siste 2–3 er eksamensspørsmål med nye tall, og det siste er den
  vanskeligste varianten eksamen har gitt i sjangeren (gjerne flerårig, eller med en felle
  sensorveiledningen peker på).
- **Dekk sjangeren:** hver spørsmålstype i sjangeren som har kommet på eksamen, skal være dekket
  av minst ett steg. Det er målestokken for «nesten alle oppgaver».
- Faktaspørsmål og drøftingsspørsmål («hvilket utsagn er riktig?») kan være steg, men stigen
  er først og fremst for regnerutinene.

## 4. Hvert steg

| Felt | Innhold |
|---|---|
| `title` | Begrepet steget lærer bort, kort: «Ubenyttet skjerming framføres» |
| `theory` | 2–6 setninger og formelen. Hva begrepet er, hvorfor det er slik, og når du bruker det. Formler i `.formula` med `.eq` og `.where` |
| `example` | Et lite, ferdig regnet eksempel med pene tall, i `.worked`. Viser nøyaktig fremgangsmåten oppgaven krever |
| `q` | Oppgaven: nye tall (ikke eksempelets), alt som trengs står i teksten (også satsene), og den spør etter ett tall eller ett utsagn |
| `options` | Fire alternativer, ett riktig. Tall med samme format og antall desimaler |
| `answer` | 0–3, fra fasitplanen |
| `solution` | Utregningen steg for steg, med tall, som en kort modelløsning |
| `check` | En kontroll som bekrefter svaret på en annen måte: regn baklengs, oppjuster på satsen i stedet for grunnlaget, sjekk at gjeldsandelene summerer, sjekk at skattebyrdene summerer til t |
| `traps` | Fire plasser parallelt med `options`, `null` på fasiten. Hver sier hvilken typisk feil alternativet er laget av, med tallet: «Oppjustert to ganger: 15 600 × 1,72 × 37,84 % = 10 152» |

**Hvert galt alternativ er et konkret feilsvar**, regnet ut av en navngitt feil studenter faktisk
gjør. Ingen fyllalternativer.

**Spørsmålet må bare tillate svaret du skrev.** Sjekk at et galt alternativ ikke kan forsvares
under en rimelig lesning, og at oppgaven sier det den forutsetter: år og satser, om
gjeldsreduksjon skal brukes, om primærbolig er over eller under terskelen. H2025 oppgave 2 måtte
godta to svar fordi oppgaven ikke sa det; det skal ikke skje her.

**Bryt mønstre.** Kontrollen av FIE402-stigene fant at fasiten avslørte seg uten fagkunnskap: det
høyeste tallet var aldri riktig, fasiten sto alene utenfor ellers sorterte feilsvar, to
alternativer summerte til 100 %, eller fasiten var det eneste alternativet som delte en del med
hvert av de andre. Unngå det fra start: varier hvor fasiten ligger i størrelsesorden, og la ikke
fasiten være «midtpunktet» i kombinasjonsalternativer.

## 5. Fragmentformatet

Én fil per sjanger: `fag/fie432/_sjangre/NN-<id>.js` (NN er num med to sifre). Ingenting annet i
fila. Formatet er det samme som FIE402 (se `fag/fie402/_sjangre/02-mm.js` for en ferdig stige):

```js
/* sjanger 2 · aksjonaer · Aksjonærmodellen: skjerming, utbytte og gevinst */
window.EDU_DATA.sjangre.push({
  id: "aksjonaer",
  num: 2,
  title: "Aksjonærmodellen: skjerming, utbytte og gevinst",
  summary: "Fra skjermingsfradraget i ett år til flerårig regning med salg",
  chapters: [5],
  exam: "7 av 9 sett · H2024 oppgave 1, H2025 oppgave 4",
  intro: `<p>To–fire setninger: hva sjangeren er, hvordan den kommer på eksamen og hva du kan etter siste steg.</p>`,
  steps: [
    {
      id: "aksjonaer-1",
      title: "…",
      theory: `<p>…</p><div class="formula"><div class="eq">…</div><div class="where">…</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>…</p></div>`,
      q: `<p>…</p>`,
      options: ["kr 15 600", "kr 10 200", "kr 28 920", "kr 5 903"],
      answer: 0,
      solution: `<p>…</p>`,
      check: `<p>…</p>`,
      traps: [null, "…", "…", "…"],
    },
  ],
});
```

- `theory`, `example`, `q`, `solution`, `check` og `intro` er malstrenger (backticks). Skriv
  aldri `${` i dem.
- Lovlige tagger: p, h4, div, span, b, i, sub, sup, ul, ol, li, table, tr, th, td, br. Lovlige
  klasser: formula, eq, where, worked, wh, callout, tip, warn, mech, h. Hvert `.worked` starter med
  `<span class="wh">`, hver callout med `<span class="h">`.
- `options` og `traps` kan bare inneholde b, i, sub, sup og br.
- **Aldri rå `<` eller `>` i tekst.** Skriv `&lt;`, `&gt;` og `&amp;`.
- id-er: sjangeren som gitt i briefen, stegene `<sjanger>-1`, `<sjanger>-2`, … i rekkefølge. De er
  lagringsnøkler og endres aldri etter publisering.

## 6. Fasitposisjoner og lengde

- **Fasitposisjonen er bestemt på forhånd** (fallgruve 7c) i `fag/fie432/_sjangre/fasitplan.json`,
  én liste per sjanger, som 0–3 (A–D). Steg n bruker plass n i lista.
- **Lengden skal ikke avsløre fasiten** (fallgruve 7y): for utsagnsalternativer, sikt mot at det
  riktige er det lengste i omtrent ett av fire steg. Kontrollen teller ikke tallalternativer.
  Ikke juster tall for å påvirke lengden.

## 7. Språk og notasjon

- **Norsk bokmål**, som resten av FIE432 og eksamen.
- Kursets notasjon og konvensjoner fra forfatterspesifikasjonen §4: t, f, t<sub>e</sub>,
  r<sub>s</sub>, S, τ<sub>w</sub>, W, ρ, B, P og p, ε<sub>D</sub> og ε<sub>S</sub>, U(W), E[U],
  γ, σ², μ, w*. Samme symbol skal bety det samme i hele stigen.
- **Desimalkomma og mellomrom som tusenskille**: `37,84 %`, `kr 1 467 200`. Prosent med mellomrom
  før tegnet. Minus som − (U+2212), × for multiplikasjon.
- Si hvilke satser du bruker, og merk dem **[dagens regel]** eller **[eksempeltall]** der det
  ikke går fram av sammenhengen (forfatterspek §9.3). 2026-satsene står i `05-satser-2026.md`.
  Eldre eksamenssett har andre satser (oppjustering 1,6 i H2022, aksjerabatt 45 % i 2021):
  oppgaveteksten oppgir alltid satsene.
- Ingen tankestrek (—) som setningsbinder: bruk komma, kolon eller ny setning. **Ingen komma
  foran «og».** Ingen alternativer omtalt med bokstav i utregningen («svaret som bruker
  markedsverdien»).
- Kort og direkte. Tiltale «du».

## 8. Nøyaktighet

- **Regn ut hvert tall med python3 før du skriver det**: eksempelet, fasiten, hvert feilsvar og
  kontrollen. Mellomresultatene du skriver, må summere til totalen du skriver.
- Bruk manualens regler og konvensjoner (`FIE432_Manual.html`, kapitlene sjangeren lister; hvert er
  en `<section id="kN">`). Der manualen sier hvordan gjelden fordeles, hvem utbyttet følger eller hva
  IPS-uttak skattlegges som, skal stigen si det samme. Tror du manualen tar feil, følg den og
  rapporter det.
- **Fasitene i eksamenssettene har kjente regnefeil** (kursplanen, «Det sensorveiledningene
  belønner»). Stol på ditt eget kontrollerte regnestykke.
- Ikke kopier manualens gjennomregnede eksempler, kapitteloppgavene (`fag/fie432/kapitteloppgaver.js`),
  eksamenstreningens spørsmål (`fag/fie432/_trening/`) eller eksamensoppgavene ordrett: leseren har
  sett dem. Samme struktur med nye tall er riktig.
- Kjør kontrollen og rett hver FEIL:
  `node tools/sjekk-sjangre.js fag/fie432/_sjangre/NN-<id>.js`

## 9. Sjangrene

| num | id | Tittel | Kapitler | Vekt på eksamen |
|---|---|---|---|---|
| 1 | insidens | Hvem betaler skatten: stykkskatt og insidens | k11 | 8/9 sett, 11,6 % |
| 2 | aksjonaer | Aksjonærmodellen: skjerming, utbytte og gevinst | k5 | 7/9 og 5/9, 12,4 % |
| 3 | formuesskatt | Formuesskatten: verdsetting og gjeldsfordeling | k7 | 7/9, 10,6 % |
| 4 | avkastningsskatt | Formuesskatt som avkastningsskatt | k8 | 17 % av H2025 |
| 5 | effektiv | Skattesystemet: marginalskatt, gjennomsnittsskatt og effektiv skattesats | k1, k2 | 7/9, 5,3 % |
| 6 | pensjon | Pensjon: folketrygden, innskudd mot ytelse og IPS | k15 | 6/9, 10,4 % |
| 7 | portefolje | Sparing og portefølje: Merton med humankapital | k14 | 5/9 og 3/9, 7,9 % |
| 8 | nytte | Forventet nytte, forsikring og valg under usikkerhet | k17, k18 | 4/9 og 3/9, 8,5 % |
| 9 | internasjonal | Internasjonal skatt og exit-skatt | k13, k6 | 4/9, 7,0 % |
| 10 | lan | Lån: annuitet, effektiv rente og utlånsforskriften | k16 | 4/9 og 3/9, 7,5 % |
| 11 | bedrift | Bedriftens tilpasning, nøytralitet og implisitt skatt | k9, k10, k12 | 2/9 hver, ca. 4 % |

Hver brief sier hvilke steg rampen bør innom. Det er et minimum; eksamensspørsmålene i sjangeren
avgjør resten.

## 10. Hva du rapporterer tilbake

Stegene på én linje hver (tittel og fasit), hvilke eksamensspørsmål de siste stegene er bygd
etter, hvilke spørsmålstyper i sjangeren som eventuelt ikke er dekket og hvorfor, og feil eller
uklarheter du fant i manualen. Kort.
