# FIE432 — Forfatterspesifikasjon for kjernepensum

LES HELE FØR DU SKRIVER. Les så `docs/fie432-forfatterspek.md` §1, §3, §4, §6, §7 og §9
(språk, format, notasjon, kursets konvensjoner, eksamensforankring og nøyaktighet; alt
gjelder her uendret). Eksamens-DNA-et står i `docs/fie432-kursplan.md`.

---

## 1. Hva dette er

Faget har en manual på 81 500 ord (`FIE432_Manual.html`, 21 kapitler, rundt 57 timer).
Kjernepensum er en **egen, kort lesevei på rundt 11 500 ord**, én kveld med arbeid, som gir
god forståelse av det eksamen tester. Leseren bruker den i to situasjoner:

1. **Før han prøver seg på eksamensoppgaver selv**, for å kunne byggesteinene godt nok til
   å komme i gang.
2. **Når det er kort tid igjen til eksamen**, for å lese det viktigste én gang.

Det er greit at han ikke kan hele pensum etterpå. Det er ikke greit at han mangler noe
sentralt. Den avveiningen er hele jobben: hver setning må fortjene plassen sin ved det den
er verdt på eksamen.

**Manualen er kilden.** Kort den ned; ikke finn på nytt stoff. Hver påstand, konvensjon,
sats og formel skal stemme med manualen, som er kontrollert flere ganger, også mot Lovdata.
Der du korter ned, behold mekanismen og dropp utdypingen. Du kan gjenbruke manualens
gjennomregnede eksempler med tallene (forkortet); ofte er det det beste valget, fordi
tallene er kontrollert. Minicasen skal ha nye tall (se §6).

**Bygd etter eksamensblokker, ikke kapitler.** De tolv delene under følger det eksamen spør
om, og hver lister kapitlene den korter ned.

## 2. Eksamensformen styrer alt

**Eksamen er fire timers digital flervalg i Wiseflow: fire alternativer, 3 poeng for rett,
−1 for feil, 0 for ubesvart** (nytt fra 2026). Derfor:

- **Minicasen er flervalg**, ikke en åpen oppgave: en felles oppgavetekst og tre ledd med
  fire alternativer hver, i samme format som kapitteloppgavene i faget
  (`fag/fie432/kapitteloppgaver.js`). Appen gir +3, −1 og 0, har «stå over», og viser
  fasiten med en gang.
- **Hvert galt alternativ er laget av én bestemt feil**, og `traps` sier hvilken, én setning
  per galt alternativ. Det er halvparten av ferdigheten minuspoengene krever: å kjenne igjen
  det gale tallet. Bruk feilmønstrene fasitene viser (forfatterspek §6): glemt ubenyttet
  skjerming, oppjustering utelatt eller gjort to ganger, gjeld ikke redusert med rabatten
  eller redusert også for primærbolig, formuesskatt av markedsverdi i stedet for
  formuesverdi, effektiv sats av skattepliktig i stedet for brutto inntekt, og så videre.
- **Teksten lærer leseren å kjenne igjen de gale alternativene.** I hvert gjennomregnede
  eksempel: si hvilke gale tall de vanligste feilene gir.

## 3. De tolv delene

Ordbudsjettet gjelder bare `html` (sjekker og minicase kommer i tillegg). ±15 % er greit.
Går du langt over, er formålet borte; får du ikke plass til noe, si det i rapporten i stedet.

| id | Tittel | Manual | Ord | Sjekker |
|---|---|---|---|---|
| kj0 | Eksamen på én side | k0, k19 | 450 | 2 |
| kj1 | Skattesystemet og effektiv skatt | k1, k2 | 1 000 | 3 |
| kj2 | Aksjonærmodellen: skjerming, utbytte og gevinst | k5, k6 | 1 300 | 4 |
| kj3 | Formuesskatten: verdsetting og gjeldsfordeling | k7 | 1 100 | 3 |
| kj4 | Formuesskatt som avkastningsskatt | k8 | 900 | 3 |
| kj5 | Hvem betaler skatten: insidens | k11 | 1 000 | 4 |
| kj6 | Nøytralitet, bedriftens tilpasning og implisitte skatter | k9, k10, k12 | 1 100 | 3 |
| kj7 | Internasjonal skatt og exit-skatt | k13, k6 | 900 | 3 |
| kj8 | Sparing og porteføljevalg | k14, k18 | 1 200 | 4 |
| kj9 | Pensjon | k15 | 800 | 3 |
| kj10 | Lån | k16 | 700 | 3 |
| kj11 | Forsikring, forventet nytte og finansiell psykologi | k17, k18 | 1 000 | 3 |

### Hva hver del må inneholde

**kj0 · Eksamen på én side** (ingen minicase)
- Formatet: 4 timer, Wiseflow, fire alternativer, +3/−1/0 fra 2026. Forventet verdi av å
  gjette: 0 blindt, +⅓ med ett alternativ utelukket, +1 med to. Regelen: svar når du kan
  utelukke minst ett, stå over ellers. Tidsbudsjettet.
- Hvordan de gale alternativene lages (listen i §2), og at fasitene har kjente regnefeil:
  stol på ditt eget kontrollerte regnestykke og velg nærmeste alternativ.
- Hva som kommer oftest i flervalgsæraen (H2022–H2025), kort, med pekere til delene («kj5»).
- Rekkefølgen: faktaspørsmålene først, regnespørsmålene etterpå.
- **Én «Må kunne»-boks** med gjettereglen, regnerutinene som skal sitte og feilmønstrene.

**kj1 · Skattesystemet og effektiv skatt**
- Satsene for 2026 [dagens regel]: alminnelig inntekt 22 %, trinnskatt, trygdeavgift,
  personfradrag, minstefradrag, høyeste marginalskatt. Hent tallene fra manualen.
- Gjennomsnittsskatt regnet trinn for trinn (H2024 oppgave 5). Progressivitet = stigende
  gjennomsnittsskatt; et bunnfradrag gjør en flat sats progressiv, et større gjør den mer
  progressiv (H2024 oppgave 4).
- Effektiv skattesats = betalt skatt / bruttoinntekt; for en eier regnes selskapets skatt og
  overskudd med; avskrivninger senker den (H2025 oppgave 5).
- Hvorfor rente skattlegges med 22 % og aksjegevinst med 37,84 %: indifferensregningen.
- Avkastning etter skatt r(1 − t), og tidsverdien av et fradrag, kort.

**kj2 · Aksjonærmodellen: skjerming, utbytte og gevinst**
- Skjermingsgrunnlag, skjermingsrente, skjermingsfradrag, skattepliktig utbytte, ubenyttet
  skjerming som framføres **og legges til grunnlaget**, oppjusteringsfaktor 1,72, eierskatt
  37,84 %, oppjustering på grunnlag eller sats som kontroll av hverandre.
- **Flerårsrutinen** steg for steg (H2024 oppgave 1, H2025 oppgave 4), med ett gjennomregnet
  eksempel over minst to år, og hvilke gale tall de vanlige feilene gir.
- Gevinst ved salg: kostpris, ubenyttet skjerming, oppjustering (H2024 oppgave 2, H2025
  oppgave 10). Hvem utbyttet og skjermingen følger ved eierskifte (manualen 5.4).
- Hvorfor oppjusteringen finnes: inntektsskifting mellom lønn og utbytte.
- Fritaksmetoden og treprosentregelen (0,66 % effektivt), holdingselskap som utsettelse,
  aksjonærlån skattlagt som utbytte: kort.

**kj3 · Formuesskatten: verdsetting og gjeldsfordeling**
- Satser, bunnfradrag, ektefeller, verdsettingsrabatter (børsnoterte aksjer og fond,
  primærbolig under og over terskelen for 2026, sekundærbolig, unoterte aksjer).
- **Gjeldsfordelingen**: forholdsmessig etter bruttoverdi; gjeld henført til rabatterte aktiva
  reduseres med rabatten, men **ikke** gjeld henført til primærbolig (H2024 oppgave 6, H2025
  oppgave 2). Ett gjennomregnet eksempel med kontrollen og de gale tallene.
- Eiendomsskatt i én setning.

**kj4 · Formuesskatt som avkastningsskatt**
- Formuesskatten faller på formuen ved inngangen til året, så den tilsvarer en
  avkastningsskatt τ<sub>w</sub>/r (H2025 oppgave 9).
- Avkastning etter formuesskatt, og verdien av en evig kontantstrøm under formuesskatt,
  V = CF/r når skatten også treffer alternativet, og CF/(r + τ<sub>w</sub>) bare når den ikke
  gjør det (H2025 oppgave 3; manualen 8.3).
- Utbyttet som må tas ut for å betale formuesskatten, D = τ<sub>w</sub>·W/(1 − t<sub>e</sub>)
  (H2024 oppgave 7, H2025 oppgave 6).
- Argumentene for og mot formuesskatt, gjengitt som argumenter.

**kj5 · Hvem betaler skatten: insidens**
- Stykkskatt på tilbyderne, P = p + t, likevekten D(P) = S(p + t). **Utledningen**:
  ∂p/∂t = D′/(S′ − D′) og ∂P/∂t = S′/(S′ − D′), og elastisitetsformen.
- Grensetilfellene (perfekt uelastisk og perfekt elastisk), at den minst elastiske siden
  bærer skatten, og at det ikke spiller noen rolle hvem skatten legges på. Dødvektstap.
- Formelgjenkjenning (H2024 oppgave 8) og talleksempel med lineære kurver (H2025 oppgave 8).
- Det manualen har om monopol og kapitalisering, kort.

**kj6 · Nøytralitet, bedriftens tilpasning og implisitte skatter**
- Nøytral kapitalbeskatning og skattearbitrasje, kort.
- **Bedriftens tilpasning**: F′(K) = r(1 − At)/(1 − t); gjeld mot egenkapital når bare
  renter kan trekkes fra: F′<sub>G</sub> = r og F′<sub>E</sub> = r/(1 − t), så E* &lt; G*
  (H2025 oppgave 7).
- **Implisitt skatt**: t* = 1 − r<sub>fri</sub>/r<sub>skattlagt</sub>, likevekt
  r<sub>A</sub> = r<sub>B</sub>(1 − t) (H2024 oppgave 9); hvem som tjener på skattefavorisering.
- Domar–Musgrave (staten som stille partner, betingelsen) og progressivitet, flat skatt og
  rettferdighet (k10): kort.

**kj7 · Internasjonal skatt og exit-skatt**
- Flagg én gang: 17–19 % av poengene i H2022 og H2024, borte i H2025, og ingen gjesteforeleser
  i skatterett i 2026. Usikkert, men dekkes.
- Bosted (sktl § 2-1), globalskatteplikt, kildeskatt, fast driftssted. **Unntaksmetoden
  mot kreditmetoden**, med kreditten begrenset til norsk skatt på inntekten. Uten skatteavtale
  gir sktl § 16-20 ensidig kreditfradrag; det blir ikke automatisk dobbeltbeskatning
  (manualen er rettet på dette, fallgruve 7w). Ett gjennomregnet eksempel med begge metodene.
- Exit-skatt: latent gevinst, betalingsordningen, gave til nærstående i utlandet; selskaper
  som flytter ut (§ 10-71), med forbeholdet manualen 6.6 har om kursfasit og lov.
- Skatteparadis: mekanismene og tiltakene, kort.

**kj8 · Sparing og porteføljevalg**
- Forventet avkastning og varians for to aktiva, diversifisering og korrelasjon (korrelasjon 1,
  H2024 oppgave 12d), kapitalmarkedslinjen og giring (H2025 oppgave 15), Sharpe-forholdet,
  indeksfond mot aktive fond (H2025 oppgave 16).
- **Merton**: w* = (μ − r<sub>f</sub>)/(γσ²), humankapital som sikker eller risikabel, aksjeandel
  over livsløpet (H2025 oppgave 11). Ett gjennomregnet eksempel.
- Sparerutinen med ln-nytte, subjektive sannsynligheter og tapsaversjon (manualen 18.2;
  H2019 oppgave 9, H2022 oppgave 5).
- Aksjesparekonto og skatt på fond, kort.

**kj9 · Pensjon**
- Folketrygden: alleårsregel, opptjening 18,1 % av inntekt opp til 7,1 G, pensjonsbeholdning,
  delingstall og levealdersjustering, utsatt uttak (H2025 oppgave 14).
- Innskudd mot ytelse (H2024 oppgave 13a, H2025 oppgave 17), OTP-minimum, AFP.
- IPS: utsatt skatt og rentefritt lån fra staten, formuesskattefritak, og uttak skattlagt som
  **alminnelig inntekt med 22 %**, ikke som pensjonsinntekt (manualen k15 har en egen boks om
  denne forvekslingen; H2024 oppgave 13b). BSU, kort.

**kj10 · Lån**
- Annuitet mot serielån, effektiv rente med gebyrer, fast mot flytende rente.
- Utlånsforskriften (5 × inntekt, egenkapitalkravet slik manualen oppgir det for 2026, avdrag over 60 %, stresstest).
- Rentefradraget etter skatt. **Rentene første år regnes av saldoen som faller**, ikke av hele
  lånet (feilen manualen selv hadde i 16.5).
- Avdragsfrihet ved midlertidig likviditetsproblem: koster flere kroner, men ikke mer i
  nåverdi (H2024 oppgave 14).

**kj11 · Forsikring, forventet nytte og finansiell psykologi**
- Risikoaversjon, U = √W og ln W, forventet nytte med og uten forsikring,
  sikkerhetsekvivalent, maksimal premie (H2024 oppgave 11d), full dekning til aktuarisk pris
  er optimalt, delvis dekning til samme pris er det ikke (H2025 oppgave 13), laveste
  sannsynlighet som gjør forsikringen lønnsom. Prøve-og-feile som godkjent eksamensmetode.
- Finansiell psykologi (k18): de atferdsfeilene forelesningen dekker, hva de koster, og
  reglene som beskytter mot dem; system 1 og 2 slik manualen framstiller det. Kort.

### Formen på hver del (kj1–kj11)

1. `<p class="lead-in">`: to–tre setninger om hva dette er og hvorfor det er kjerne, med de
   ekte eksamenshenvisningene over. Bare sett som kursplanen eller eksamens-DNA-et lister.
2. To–fire `<h3>`-underoverskrifter (vanlige titler, **ingen nummerering**).
3. Formlene eksamen krever, i `.formula`-blokker, hver fulgt av hva den betyr.
4. `.callout.mech` for mekanismen bak det sentrale resultatet (1–2 per del).
5. **Ett** `.worked`-eksempel, kort og komplett, som ender med kontrollen **og de gale tallene
   de vanlige feilene gir**. To bare der delen dekker to adskilte eksamensrutiner.
6. `.callout.warn` med feilene som koster poeng; med minuspoeng koster de dobbelt (1 per del).
7. **Sist: nøyaktig én «Må kunne»-boks** med 3–5 punkter. Appen samler disse boksene på én
   side til siste dag, så **hvert punkt må stå på egne ben og definere symbolene sine**:

```html
<div class="callout tip husk"><span class="h">Må kunne</span>
<ul><li>…</li><li>…</li><li>…</li></ul></div>
```

Figurer er valgfrie: høyst én per del, bare der den sparer ord (insidens med to kurver,
kapitalmarkedslinjen). Du kan kopiere en SVG-figur ordrett fra manualen.

Skriv satser med **[dagens regel]** eller **[eksempeltall]** der det ikke går fram av
sammenhengen (forfatterspek §9.3), desimalkomma, mellomrom som tusenskille, `22 %`,
`kr 500 000`, `−` (U+2212) som minus og `×` for multiplikasjon. Ingen tankestrek som
setningsbinder.

## 4. Fragmentformatet

Skriv én fil per del: `fag/fie432/_kjerne/kjN.js`. Ingenting annet i den.

```js
/* kj2 · Aksjonærmodellen: skjerming, utbytte og gevinst */
window.EDU_DATA.kjerne.push({
  id: "kj2",
  num: 2,
  title: "Aksjonærmodellen: skjerming, utbytte og gevinst",
  chapters: [5, 6],
  html: `
<p class="lead-in">…</p>
<h3>Skjermingen</h3>
<p>…</p>
…
<div class="callout tip husk"><span class="h">Må kunne</span><ul><li>…</li></ul></div>
`,
  checks: [
    {
      id: "kj2-s1",
      q: "…",
      options: ["…", "…", "…", "…"],
      answer: 2,
      explanation: "…",
    },
  ],
  case: {
    id: "kj2-m1",
    topic: "Skjerming over to år og gevinst ved salg",
    minutes: 10,
    body: `<p>Den felles oppgaveteksten, med alle tall leddene trenger.</p>`,
    ledd: [
      {
        id: "kj2-m1a",
        points: 3,
        q: `<p>Hva er skattepliktig utbytte i 2026?</p>`,
        options: ["kr 15 600", "kr 10 200", "kr 28 920", "kr 5 903,04"],
        answer: 0,
        solution: `<p><b>Steg 1 — …</b> …</p><p><b>Steg 2 — …</b> …</p><p><b>Kontroll:</b> …</p>`,
        traps: [null, "Grunnlaget satt til markedsverdien: …", "…", "…"],
      },
      // kj2-m1b og kj2-m1c på samme måte
    ],
  },
});
```

- `html`, `body`, `q` og `solution` er malstrenger (backticks). Skriv aldri `${` i dem.
- Lovlige tagger i `html`: p, h3, h4, div, span, b, i, sub, sup, ul, ol, li, table, tr, th, td,
  br, figure, figcaption, svg og barna. Lovlige klasser: lead-in, formula, eq, where,
  callout, mech, tip, warn, link, mistake, h, husk, worked, wh, data, n. Hver boks starter
  med `<span class="h">`, hvert `.worked` med `<span class="wh">`.
- **Aldri rå `<` eller `>` i tekst.** Skriv `&lt;` og `&gt;`.
- Vil du vise til manualen for dybde, skriv kapittelkoden: «k7». Appen gjør den til en lenke.
  Til en annen del: «kj3». Bruk begge sparsomt; delen skal stå på egne ben.

## 5. Sjekkene

Raske forståelsessjekker, rett etter teksten. Hver tar under ett minutt. De har ikke
minuspoeng; det er minicasen som trener eksamensformen.

- **Test forståelse, ikke pugg.** Godt: «Hva skjer med skjermingsgrunnlaget neste år når
  utbyttet er mindre enn skjermingsfradraget?», «Hvem bærer mest av skatten når
  etterspørselen er mindre elastisk enn tilbudet?». Dårlig: «Hvilket år kom
  aksjonærmodellen?».
- Nøyaktig fire alternativer, ett riktig. Hvert galt alternativ er en bestemt, vanlig
  misforståelse.
- **Fasitposisjonen er bestemt på forhånd** (fallgruve 7c). Posisjonene står i briefen din,
  som 0–3 (A–D). Skriv det riktige alternativet på den plassen.
- **Lengden skal ikke avsløre fasiten** (fallgruve 7y). Sikt mot at det riktige er det
  lengste alternativet i omtrent én av fire sjekker, som ved tilfeldighet. I FIE402 var det
  lengst i 26 av 39, fordi fasiten fikk hele begrunnelsen og de gale ble korte påstander. Da
  denne spesifikasjonen sa «ikke det lengste», ble det 0 av 38, og det avslører like mye.
  Legg begrunnelsen i forklaringen, og gi alternativene begrunnelser av samme lengde.
- `explanation`: to–fire setninger. Si hvorfor det riktige er riktig **og** hva det mest
  fristende gale alternativet tar feil i. **Vis til alternativene ved innhold, aldri ved
  bokstav** («svaret som bruker markedsverdien», ikke «alternativ B»).
- `q`, `options` og `explanation` kan bare inneholde b, i, sub, sup og br.
- id-er: `kjN-s1`, `kjN-s2`, … i rekkefølge.

## 6. Minicasen: en eksamensoppgave i flervalg

Én kort eksamensoppgave etter hver del (ikke kj0): en felles oppgavetekst og **tre ledd**,
hvert et flervalgsspørsmål til 3 poeng, rundt 10 minutter i alt (`minutes`). Den sjekker at
du kan **gjøre** rutinen og velge riktig blant fristende gale tall.

- **Nye tall.** Ikke en kopi av manualens gjennomregnede eksempel eller av en
  kapitteloppgave i `fag/fie432/kapitteloppgaver.js`; leseren har sett dem.
- **Selvstendig:** alle tall leddene trenger, står i `body` (eller i leddets `q`). Leddene
  vises sammen, så (b) kan bygge på (a), men hvert ledd må ha ett entydig svar også for den
  som bommet på (a): gi mellomresultatet i teksten der det trengs.
- **Hvert galt alternativ er et konkret feilsvar**, regnet ut av en navngitt feil, og `traps`
  (fire plasser parallelt med `options`, `null` på fasiten) sier hvilken, med tallet:
  «Oppjustert to ganger: 15 600 × 1,72 × 37,84 %». Ingen fyllalternativer.
- `solution`: stegene med tall, metoden sagt, og kontrollen der den finnes. Kort: en
  modelløsning, ikke en forelesning. Vis ikke til alternativene ved bokstav.
- **Spørsmålet må bare tillate svaret du skrev.** Sjekk at et galt alternativ ikke kan
  forsvares under en rimelig lesning, og at oppgaven sier det den forutsetter (skattesats,
  år, om gjeldsreduksjonen skal brukes). I FIE402 målte én minicase verdien av informasjon mot
  å bygge i dag, mens oppgaven selv hadde vist at det beste alternativet var å vente.
- id-er: casen `kjN-m1`, leddene `kjN-m1a`, `kjN-m1b`, `kjN-m1c`. Fasitposisjonene for leddene
  står i briefen din.

## 7. Nøyaktighet

- **Regn ut hvert tall med python3 før du skriver det**, også i minicasen, i fellene og i
  sjekkene. Mellomresultatene du skriver, må summere til totalen du skriver.
- Les manualkapitlene for delene dine på nytt. Der manualen sier en regel (hvordan gjelden
  fordeles, hvem utbyttet følger, hva IPS-uttak skattlegges som), skal teksten din si det
  samme. Tror du manualen tar feil, ikke avvik i stillhet: følg den og rapporter mistanken.
- **Ikke tilfør stoff manualen ikke har.** I FIE402 kom to påstander inn fra en kapitteloppgave
  og måtte strykes. Finnes noe viktig bare utenfor manualen, rapporter det.
- **Ikke mist betingelser når du korter ned.** Gjennomgangen av FIE402 fant 14 slike steder:
  «skatter favoriserer tilbakekjøp» uten «når utbytteskatten er høyere, for skattepliktige»,
  en regel som bare gjelder «når oppgaven sier at kursene går tilbake», et tak som bare gjelder
  gjeld som ikke vokser. Behold vilkåret, også i «Må kunne»-boksen.
- Kjør kontrollen på filene dine og rett hver FEIL:
  `node tools/sjekk-kjerne.js fag/fie432/_kjerne/kj3.js fag/fie432/_kjerne/kj4.js`

## 8. Hva du rapporterer tilbake

For hver del: ordtallet fra kontrollen, minicasen på én linje med de tre svarene, **hva du
valgte å utelate fra manualkapitlene og hvorfor**, og eventuelle feil eller uklarheter du fant
i manualen. Kort.
