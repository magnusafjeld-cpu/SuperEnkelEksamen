# FIE402: forfatterspesifikasjon for sjangertrening

LES HELE FØR DU SKRIVER. Les så `docs/fie402-forfatterspek.md` §1 (språk og leser) og
avsnittene om notasjon og konvensjoner, og eksamens-DNA-et i `docs/fie402-kursplan.md`.
Alt der gjelder her uendret.

---

## 1. Hva dette er

En egen fane, «Sjangertrening», der hver **sjanger** er én type eksamensoppgave (tvillingfirmaet,
rekapitaliseringen, realopsjonen …). Hver sjanger er en **stige**: 10–14 korte steg som starter
som om leseren ikke kan noe om temaet, og slutter med en oppgave på eksamensnivå. Etter siste
steg skal han kunne løse nesten alle eksamensoppgaver i sjangeren.

Magnus ba om dette etter et opplegg han likte i FIE432. Det fungerte slik, og slik skal det
fungere her:

**Hvert steg har samme oppbygning:**
1. Kort teori om **ett** nytt begrep
2. Et lite talleksempel med pene tall
3. Én flervalgsoppgave med fire alternativer på akkurat det begrepet
4. Han svarer med en bokstav og får fasit

**Etter hvert svar får han:**
- riktig eller galt
- utregningen steg for steg
- en kontroll av svaret
- hvilken typisk feil hvert galt alternativ er laget av

**Vanskeligheten øker for hvert steg, og hvert nytt begrep bygger på det forrige.**

Slik så de første stegene ut i FIE432 (forsikring med nyttefunksjoner), som mønster for
hvordan et begrep introduseres og hvordan de gale alternativene lages:

> Steg 1: Forventet verdi mot forventet nytte. Teori: E[u(W)] betyr nytte først og gjennomsnitt
> etterpå; konkav u gir E[u(W)] &lt; u(E[W]). Eksempel: W = 49, L = 48, π = 0,5, u = √W gir
> E[W] = 25, u(E[W]) = 5 og E[u(W)] = 4. Oppgave: W = 100, L = 64, π = 0,25; finn E[u(W)].
> Alternativer: 9 (riktig), 84 (forventet verdi brukt), 9,17 (u(E[W]) brukt), 7
> (sannsynlighetene byttet om). Kontroll: 9 &lt; √84 ≈ 9,17, i tråd med konkav u.
>
> Steg 2: Sikkerhetsekvivalent og risikopremie, med samme tall: CE = 81, RP = 3. Gale
> alternativer: −3 (feil fortegn), 75 (glemt å invertere nyttefunksjonen), 35 (sannsynlighetene
> byttet om). Kontroll: √81 = 9 = E[u(W)].

## 2. Stigen

- **Steg 1 forutsetter ingenting** utover å kunne regne prosent. Ett begrep, én formel.
- **Ett nytt begrep per steg.** Et steg kan bruke alt fra tidligere steg i samme stige, men
  aldri noe som ikke er introdusert der. Hver stige står på egne ben: leseren kan starte i
  hvilken som helst sjanger.
- **Rampen:**
  - steg 1–4: én formel eller én idé hver, ett regnesteg
  - de midterste stegene: kombiner to–tre ting fra tidligere steg, flere regnesteg
  - de siste 2–3 stegene: oppgaver på eksamensnivå, bygd som de virkelige
    eksamensoppgavene i sjangeren (se `fag/fie402/sett.js`), med nye tall. Det siste steget
    skal være den vanskeligste varianten eksamen har gitt i sjangeren.
- **Dekk sjangeren.** Gå gjennom eksamensoppgavene i sjangeren (alle seks sett i
  `fag/fie402/sett.js`, og frekvenstabellen i kursplanen) og sørg for at hver deloppgavetype som
  har kommet, er dekket av minst ett steg. Det er målestokken for «nesten alle oppgaver».
- Verbale deloppgaver («name the mechanism», «explain why») kan bli flervalg om mekanismen:
  hvilket utsagn forklarer resultatet riktig.

## 3. Hvert steg

| Felt | Innhold |
|---|---|
| `title` | Begrepet steget lærer bort, kort: «Unlevering beta when debt is risk-free» |
| `theory` | 2–6 setninger og formelen. Hva begrepet er, hvorfor det er slik, og når du bruker det. Formler i `.formula` med `.eq` og `.where` |
| `example` | Et lite, ferdig regnet eksempel med pene tall, i `.worked`. Viser nøyaktig fremgangsmåten oppgaven krever |
| `q` | Oppgaven: nye tall (ikke eksempelets), alt som trengs står i teksten, og den spør etter ett tall eller ett utsagn |
| `options` | Fire alternativer, ett riktig. Tall med samme format og antall desimaler |
| `answer` | 0–3, fra fasitplanen |
| `solution` | Utregningen steg for steg, med tall, som en kort modelløsning |
| `check` | En kontroll som bekrefter svaret på en annen måte: regn baklengs, sammenlign med en grense, eller bruk en av kursets fem konsistenssjekker (WACC = APV, vektet β = βU, sum av gevinster = NPV …) |
| `traps` | Fire plasser parallelt med `options`, `null` på fasiten. Hver sier hvilken typisk feil alternativet er laget av, med tallet: «Used the market return instead of the market risk premium: 4% + 1.5 × 10% = 19%» |

**Hvert galt alternativ er et konkret feilsvar**, regnet ut av en navngitt feil som studenter
faktisk gjør. Ingen fyllalternativer. Bruk feilene kursplanen og løsningsforslagene nevner
(100 i stedet for 100 × 1.03 som sikkerhetsekvivalent, stand-alone NPV forvekslet med endringen i
egenkapitalverdi, feil rente på skatteskjoldet, D/V forvekslet med D/E, glemt gjeldsbeta,
reell sannsynlighet i stedet for risikonøytral …).

**Spørsmålet må bare tillate svaret du skrev.** Sjekk at et galt alternativ ikke kan forsvares
under en rimelig lesning, og at oppgaven sier det den forutsetter (skatt eller ikke, risikofri
gjeld eller ikke, evig eller ett år, D/E eller D/V).

## 4. Fragmentformatet

Én fil per sjanger: `fag/fie402/_sjangre/NN-<id>.js` (NN er num med to sifre). Ingenting annet
i fila.

```js
/* sjanger 1 · tvilling · Twin firm: unlever, relever and the cost of capital */
window.EDU_DATA.sjangre.push({
  id: "tvilling",
  num: 1,
  title: "Twin firm: unlever, relever and the cost of capital",
  summary: "From the CAPM to a full WACC built on a comparable firm",
  chapters: [3, 4],
  exam: "11 of 11 papers · H2024 E5, H2025 E4",
  intro: `<p>Two to four sentences: what this genre is, how it appears on the exam and what you can do at the end of the ladder.</p>`,
  steps: [
    {
      id: "tvilling-1",
      title: "The CAPM: from beta to required return",
      theory: `<p>Investors are only paid for risk they cannot diversify away. Beta measures that risk: how much a stock moves with the market. The CAPM turns beta into a required return.</p>
<div class="formula"><div class="eq">r<sub>E</sub> = r<sub>f</sub> + β<sub>E</sub>(E[R<sub>mkt</sub>] − r<sub>f</sub>)</div>
<div class="where">r<sub>f</sub> is the risk-free rate, E[R<sub>mkt</sub>] − r<sub>f</sub> the market risk premium. Check whether the exam gives you the market return or the premium.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>r<sub>f</sub> = 3%, E[R<sub>mkt</sub>] = 8%, β<sub>E</sub> = 1.2.</p><p>Premium = 8% − 3% = 5%. r<sub>E</sub> = 3% + 1.2 × 5% = 9%.</p></div>`,
      q: `<p>The risk-free rate is 4%, the expected market return is 10% and a stock's beta is 1.5. What is the stock's required return?</p>`,
      options: ["9.00%", "13.00%", "15.00%", "19.00%"],
      answer: 1,
      solution: `<p>Market risk premium = 10% − 4% = 6%.</p><p>r<sub>E</sub> = 4% + 1.5 × 6% = 4% + 9% = <b>13.00%</b>.</p>`,
      check: `<p>A beta above 1 must give a return above the market's 10%: 13% is. Backwards: (13% − 4%) / 6% = 1.5, the beta you started with.</p>`,
      traps: [
        "Forgot to add the risk-free rate: 1.5 × 6% = 9%.",
        null,
        "Multiplied beta by the market return and dropped the risk-free rate: 1.5 × 10% = 15%.",
        "Used the market return instead of the premium: 4% + 1.5 × 10% = 19%.",
      ],
    },
    // tvilling-2, tvilling-3 … i rekkefølge
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

## 5. Fasitposisjoner og lengde

- **Fasitposisjonen er bestemt på forhånd** (fallgruve 7c) i `fag/fie402/_sjangre/fasitplan.json`,
  én liste per sjanger, som 0–3 (A–D). Steg n bruker plass n i lista. Skriv det riktige
  alternativet der.
- For tallalternativer: sorter ikke etter størrelse hvis det flytter fasiten; plasser fasiten der
  planen sier, og de tre feilsvarene på de andre plassene.
- **Lengden skal ikke avsløre fasiten** (fallgruve 7y). For utsagnsalternativer: sikt mot at det
  riktige er det lengste i omtrent ett av fire steg. Legg begrunnelsen i utregningen, ikke i
  alternativet.

## 6. Språk og notasjon

- **Engelsk**, som resten av FIE402, fordi eksamen er på engelsk. Grensesnittet rundt er norsk.
- Kursets notasjon fra forfatterspesifikasjonen og manualen: r<sub>E</sub>, r<sub>D</sub>,
  r<sub>U</sub>, β<sub>E</sub>, β<sub>U</sub>, β<sub>D</sub>, τ<sub>c</sub>, D/E, D/V, V<sup>L</sup>,
  V<sup>U</sup>, PV(TS), r<sub>wacc</sub>. Samme symbol skal bety det samme i hele stigen.
- Desimalpunktum og mellomrom som tusenskille («1 725.00», som manualen), prosent med %, minus som − (U+2212), × for multiplikasjon. Rater med det antall
  desimaler oppgaven sier; eksamen H2025 krevde fire desimaler, så de siste stegene gjør det samme.
- Ingen tankestrek (—) som setningsbinder: bruk komma, kolon eller ny setning. Ingen komma foran
  «and». Ingen alternativer omtalt med bokstav i utregningen («the answer that uses D/V»).
- Kort og direkte. Si hva leseren skal gjøre.

## 7. Nøyaktighet

- **Regn ut hvert tall med python3 før du skriver det**: eksempelet, fasiten, hvert feilsvar og
  kontrollen. Mellomresultatene du skriver, må summere til totalen du skriver.
- Bruk manualens regler og konvensjoner (`FIE402_Manual.html`, kapitlene sjangeren lister). Der
  manualen sier hvilken rente som diskonterer skatteskjoldet, eller hvordan gjelden justeres
  mellom perioder, skal stigen si det samme. Tror du manualen tar feil, følg den og rapporter det.
- Ikke kopier manualens gjennomregnede eksempler, kapitteloppgavene (`fag/fie402/kapitteloppgaver.js`)
  eller eksamensoppgavene ordrett: leseren har sett dem. Samme struktur med nye tall er riktig.
- Kjør kontrollen og rett hver FEIL:
  `node tools/sjekk-sjangre.js fag/fie402/_sjangre/NN-<id>.js`

## 8. Sjangrene

| num | id | Tittel | Kapitler | På eksamen |
|---|---|---|---|---|
| 1 | tvilling | Twin firm: unlever, relever and the cost of capital | k3, k4 | 11/11 · H2024 E5, H2025 E4 |
| 2 | mm | MM and recapitalisation | k6, k15 | 11/11 · H2024 E3, H2025 E3 |
| 3 | wacc-apv | Valuation with leverage: tax shield, WACC and APV | k7, k17–k20 | 11/11 · H2024 E5, H2025 E4 |
| 4 | realopsjon | Real options | k25 | 8/11 · H2024 E6, H2025 E5 |
| 5 | ma | Mergers and acquisitions: stock swaps and deal probability | k26 | 8/11 · H2025 E6 |
| 6 | agent | Risk shifting and debt overhang | k9, k10 | 5/11 + 5/11 · H2024 E4 |
| 7 | opsjoner | Options: payoffs, parity, the binomial model and Black-Scholes intuition | k21–k23 | 7/11 · H2024 E6, H2025 E1 |
| 8 | kreditt | Debt and equity as options: credit risk | k5, k24 | 8/11 · not in the Kurbatov papers |
| 9 | myers | Asymmetric information: Myers-Majluf | k12, k13 | 8/11 · not in the Kurbatov papers |

Hver brief sier hvilke steg rampen bør innom. Det er et minimum; eksamensoppgavene i sjangeren
avgjør resten.

## 9. Hva du rapporterer tilbake

Stegene på én linje hver (tittel og fasit), hvilke eksamensdeloppgaver de siste stegene er bygd
etter, hvilke deloppgavetyper i sjangeren som eventuelt ikke er dekket og hvorfor, og feil eller
uklarheter du fant i manualen. Kort.
