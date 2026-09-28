/* kj9 · Pensjon */
window.EDU_DATA.kjerne.push({
  id: "kj9",
  num: 9,
  title: "Pensjon",
  chapters: [15],
  html: `
<p class="lead-in">Pensjon har vært med i sju av ni sett, folketrygden og ordningene i seks hver: folketrygdregningen tar 6,2 % av poengene i snitt, ordningene 4,2 %. I flervalgsæraen har det vært begreper (H2024 oppgave 13a og 13b, H2025 oppgave 14 og 17), men regnerutinen gikk igjen i eldre sett som H2019 oppgave 6.</p>

<h3>Folketrygden: beholdning og delingstall</h3>
<p>For kull født fra 1963 teller alle år med inntekt (alleårsregelen):</p>
<div class="formula"><div class="eq">Opptjening<sub>t</sub> = 18,1 % × min(pensjonsgivende inntekt<sub>t</sub>; 7,1 G<sub>t</sub>)</div>
<div class="eq">B<sub>t</sub> = B<sub>t−1</sub> × (1 + g) + opptjening<sub>t</sub> · årlig pensjon = B/delingstall</div>
<div class="where">B er pensjonsbeholdningen og g lønnsveksten (veksten i grunnbeløpet G). Reguler først, legg til årets opptjening etterpå. Inntekt over 7,1 G gir ingen opptjening. Med G = kr 136 549 (1. mai 2026) er taket kr 969 498 og maks opptjening kr 175 479 [dagens regel]; oppgaven oppgir som regel G.</div></div>
<p>Kompensasjonsgraden er årlig pensjon delt på sluttlønn; under taket, med lønn som følger G, er den 18,1 % × n/delingstall for n år i arbeid. Delingstallet er tilnærmet forventet gjenstående leveår ved uttak, fastsatt endelig året kullet fyller 61 og felles for kvinner og menn. Det <b>synker</b> når du utsetter uttaket, så årlig pensjon stiger (H2025 oppgave 14), men <b>stiger</b> fra kull til kull når levealderen øker: levealdersjusteringen.</p>
<div class="callout mech"><span class="h">Hvorfor er uttaksalderen et nøytralt valg?</span>Beholdningen deles på forventet gjenstående levetid, men utbetalingen løper livet ut: de som lever lenge, får mer enn beholdningen, betalt av dem som dør tidlig. Forventet samlet utbetaling er derfor omtrent lik uansett uttaksalder. Kr 4 670 000 delt på 21,15 ved 62 og 17,08 ved 67 [eksempeltall fra forelesningen] gir kr 220 804 mot kr 273 419 i året, og den som venter, tar igjen forspranget ved 88 år.</div>
<div class="worked"><span class="wh">Gjennomregnet: kompensasjonsgrad under og over taket</span>
<p>Marit har tjent 5 G i 40 år, Anders 9 G. Begge tar ut ved 67 med delingstall 17,08 [eksempeltall]; G = kr 136 549 [dagens regel].</p>
<p><b>Steg 1: Marit, under taket.</b> 18,1 % × 5 × 40 = 36,20 G = kr 4 943 074, pensjon 4 943 074/17,08 = kr 289 407, sluttlønn kr 682 745, altså <b>42,39 %</b>.</p>
<p><b>Steg 2: Anders, taket binder.</b> 18,1 % × 7,1 × 40 = 51,404 G = kr 7 019 165, pensjon kr 410 958, sluttlønn kr 1 228 941, altså <b>33,44 %</b>: flere kroner, lavere andel.</p>
<p><b>Kontroll:</b> 18,1 % × 40/17,08 = 42,39 % ✓ og 18,1 % × 7,1 × 40/(17,08 × 9) = 33,44 % ✓.</p>
<p><b>De gale tallene:</b> uten taket får Anders kr 520 933 og 42,39 %, samme prosent som Marit; lik prosent for én lønn over og én under taket betyr glemt tak. Anders' brøk 7,1/9 brukt på Marit gir 33,44 % for henne.</p>
</div>

<h3>Tjenestepensjon: innskudd mot ytelse</h3>
<p>Den som ikke har fått noe avtalt, bærer risikoen. Ved <b>innskuddspensjon</b> lover arbeidsgiveren innskuddet: du bærer avkastningsrisikoen, velger risikoprofil, beholdningen arves, og ved jobbytte får du pensjonskapitalbevis. Ved <b>ytelsespensjon</b> lover arbeidsgiveren en andel av sluttlønnen og bærer risikoen, uten individuelle valg; ved jobbytte får du fripolise. OTP er obligatorisk uansett form, og begge former finnes i begge sektorer.</p>
<div class="formula"><div class="eq">OTP-minimum = 2 % × lønn opp til 12 G, fra første krone</div>
<div class="eq">Maks innskudd = 7 % × lønn opp til 12 G + 18,1 % × lønn mellom 7,1 G og 12 G</div>
<div class="where">Tillegget på 18,1 % kompenserer for at folketrygden ikke gir opptjening over 7,1 G. AFP finnes bare i bedrifter med AFP i tariffavtalen og er i privat sektor et livsvarig påslag til alderspensjonen.</div></div>

<h3>IPS og BSU</h3>
<p>IPS [dagens regel]: innskudd opp til kr 25 000 i året (fra 2026) gir fradrag i alminnelig inntekt, 22 % tilbake. Avkastningen skattlegges ikke underveis, kontoen er fritatt for formuesskatt, og uttak skattlegges som <b>alminnelig inntekt med 22 %</b>, ikke som pensjonsinntekt: ingen trygdeavgift, ingen trinnskatt. Pengene er bundet til du fyller 62, og utbetalingen skal gå over minst ti år og minst til fylte 80 år.</p>
<div class="formula"><div class="eq">Netto ut = innskudd × (1 + r)<sup>n</sup> × (1 − t) = [innskudd × (1 − t)] × (1 + r)<sup>n</sup></div>
<div class="where">t = 22 % inn og ut, så det er ingen satsrabatt: IPS er som å skatte lønnen først og la resten vokse skattefritt. Statens 22 % vokser med dine; det er «det rentefrie lånet fra staten» i H2024 oppgave 13b.</div></div>
<p>BSU [dagens regel]: maks kr 27 500 i året og kr 300 000 i alt, 10 % av innskuddet i skattefradrag, til og med året du fyller 33 og bare uten egen bolig. BSU gir fradrag i skatten, IPS i inntekten.</p>

<div class="callout warn"><span class="h">Feilene som koster poeng</span>IPS-uttak skattet med eierskatten 37,84 % eller som pensjonsinntekt; det er alminnelig inntekt med 22 %. «IPS lønner seg fordi du skatter lavere som pensjonist» er feil: fordelen er utsatt skatt og formuesskattefritaket. Glemt tak på 7,1 G. Og delingstallets to retninger blandet: det synker med uttaksalderen innenfor ett kull.</div>

<div class="callout tip husk"><span class="h">Må kunne</span>
<ul><li>Folketrygden: opptjening = 18,1 % × min(inntekt; 7,1 G), der G er grunnbeløpet, og beholdningen B<sub>t</sub> = B<sub>t−1</sub> × (1 + g) + opptjening, der g er lønnsveksten: reguler først, legg til etterpå.</li>
<li>Årlig pensjon = beholdning/delingstall. Delingstallet synker når du utsetter uttaket, så årlig pensjon stiger; det stiger fra kull til kull når levealderen øker. Kompensasjonsgrad under taket, med lønn som følger G: 18,1 % × antall år/delingstall.</li>
<li>Innskuddspensjon: arbeidsgiveren lover innskuddet, du bærer risikoen og velger profil. Ytelsespensjon: arbeidsgiveren lover ytelsen og bærer risikoen. OTP-minimum er 2 % av lønn opp til 12 G.</li>
<li>IPS: fradrag 22 % inn (maks kr 25 000 i 2026), ingen skatt underveis, fritatt for formuesskatt, uttak skattlagt som alminnelig inntekt med 22 %, ikke som pensjonsinntekt. Fordelen er utsatt skatt og formuesskattefritaket.</li></ul></div>
`,
  checks: [
    {
      id: "kj9-s1",
      q: "Ola er født i 1975 og vurderer å utsette uttaket av alderspensjon fra folketrygden fra 62 til 67 år. Beholdningen er den samme. Hva skjer?",
      options: [
        "Delingstallet øker, og den årlige pensjonen øker",
        "Delingstallet synker, og den årlige pensjonen øker",
        "Delingstallet synker, og samlet forventet utbetaling øker",
        "Delingstallet øker, og den årlige pensjonen synker",
      ],
      answer: 1,
      explanation: "Delingstallet er tilnærmet forventet gjenstående leveår, og ved 67 er det færre av dem: med fast beholdning og lavere nevner stiger årsbeløpet. Det fristende gale er at samlet forventet utbetaling øker; ordningen er nøytral, så den er omtrent uendret. Et delingstall som øker hører til levealdersjusteringen fra kull til kull.",
    },
    {
      id: "kj9-s2",
      q: "Lise har innskuddspensjon og Per ytelsespensjon, med samme lønn. Aksjemarkedet faller kraftig året før begge går av. Hva skjer?",
      options: [
        "Begge får lavere pensjon, fordi begge ordningene er fondert",
        "Per får lavere pensjon, fordi ytelsen regnes av pensjonsmidlene",
        "Ingen av dem merker det, fordi OTP er lovpålagt",
        "Lise får lavere pensjon, fordi bare innskuddet er avtalt",
      ],
      answer: 3,
      explanation: "I innskuddspensjon er innskuddet avtalt og pensjonen avhenger av avkastningen, så Lise bærer fallet. Per er lovet en andel av sluttlønnen, og arbeidsgiveren må dekke det som mangler. Svaret om at begge taper, glemmer at det er avtalen, ikke fonderingen, som avgjør hvem som bærer risikoen.",
    },
    {
      id: "kj9-s3",
      q: "Rolf er 70 år og tar ut kr 40 000 fra IPS-kontoen i år. Se bort fra personfradraget. Hvor mye skatt betaler han av uttaket?",
      options: [
        "kr 15 136: eierskatt 37,84 %, som for gevinst på sparing",
        "Mer enn kr 8 800: trygdeavgift og trinnskatt kommer i tillegg",
        "kr 8 800: 22 % som alminnelig inntekt",
        "kr 0: skatten ble tatt da pengene ble satt inn",
      ],
      answer: 2,
      explanation: "IPS-uttak er alminnelig inntekt: 22 % × 40 000 = kr 8 800. Det inngår ikke i personinntekten, så trygdeavgift og trinnskatt kommer ikke i tillegg, og det er ikke gevinst med eierskatt. Innskuddet ga fradrag, så skatten tas nettopp ved uttak.",
    },
  ],
  case: {
    id: "kj9-m1",
    topic: "Pensjonsbeholdning, innskuddspensjon og IPS",
    minutes: 10,
    body: `<p>Silje er født i 1990 og er i den nye opptjeningsmodellen i folketrygden. For 2026 gjelder [dagens regel]: G = kr 136 549, opptjeningstaket 7,1 G = kr 969 498, 12 G = kr 1 638 588, opptjeningssats 18,1 %, skatt på alminnelig inntekt 22 % og eierskatt 37,84 %. Anta at satsene holder seg, og at lønnsveksten som beholdningen reguleres med, er 4 % [eksempeltall].</p>
<p>Ved inngangen til 2026 er Siljes pensjonsbeholdning kr 1 600 000, og i 2026 tjener hun kr 1 050 000 [eksempeltall]. Arbeidsgiveren har innskuddspensjon og legger seg på maksimalsatsen: 7 % av lønn opp til 12 G pluss 18,1 % av lønnen mellom 7,1 G og 12 G.</p>
<p>Silje setter også inn kr 25 000 på IPS i 2026 og lar pengene stå i 30 år til 5 % årlig avkastning [eksempeltall]. Oppgitt: 1,05<sup>30</sup> = 4,321942.</p>`,
    ledd: [
      {
        id: "kj9-m1a",
        points: 3,
        q: `<p>Hvor stor er pensjonsbeholdningen i folketrygden ved utgangen av 2026?</p>`,
        options: ["kr 1 775 479", "kr 1 839 479", "kr 1 846 498", "kr 1 854 050"],
        answer: 1,
        solution: `<p><b>Steg 1 — reguler den gamle beholdningen.</b> 1 600 000 × 1,04 = kr 1 664 000.</p><p><b>Steg 2 — årets opptjening, med taket.</b> Lønnen er over 7,1 G, så bare kr 969 498 teller: 18,1 % × 969 498 = kr 175 479.</p><p><b>Steg 3 — legg sammen.</b> 1 664 000 + 175 479 = <b>kr 1 839 479</b>.</p><p><b>Kontroll:</b> opptjeningen kan aldri overstige 18,1 % av taket, kr 175 479, uansett lønn. ✓</p>`,
        traps: [
          "Reguleringen glemt: 1 600 000 + 175 479 = kr 1 775 479.",
          null,
          "Motsatt rekkefølge, årets opptjening regulert med: (1 600 000 + 175 479) × 1,04 = kr 1 846 498.",
          "Taket glemt: 1 664 000 + 18,1 % × 1 050 000 = 1 664 000 + 190 050 = kr 1 854 050.",
        ],
      },
      {
        id: "kj9-m1b",
        points: 3,
        q: `<p>Hvor mye setter arbeidsgiveren inn i innskuddspensjonen hennes for 2026?</p>`,
        options: ["kr 14 571", "kr 73 500", "kr 88 071", "kr 263 550"],
        answer: 2,
        solution: `<p><b>Steg 1 — grunnsatsen.</b> Lønnen er under 12 G, så hele lønnen teller: 7 % × 1 050 000 = kr 73 500.</p><p><b>Steg 2 — tillegget over folketrygdtaket.</b> 1 050 000 − 969 498 = kr 80 502 ligger mellom 7,1 G og 12 G: 18,1 % × 80 502 = kr 14 571.</p><p><b>Steg 3 — sum.</b> 73 500 + 14 571 = <b>kr 88 071</b>.</p><p><b>Kontroll:</b> tillegget gir 18,1 øre per krone over taket, nøyaktig det folketrygden ikke gir. ✓</p>`,
        traps: [
          "Bare tillegget, grunnsatsen på 7 % glemt: 18,1 % × 80 502 = kr 14 571.",
          "Bare grunnsatsen, tillegget over 7,1 G glemt: 7 % × 1 050 000 = kr 73 500.",
          null,
          "Tillegget regnet av hele lønnen: 73 500 + 18,1 % × 1 050 000 = 73 500 + 190 050 = kr 263 550.",
        ],
      },
      {
        id: "kj9-m1c",
        points: 3,
        q: `<p>Hvor mye er IPS-kontoen verdt for Silje etter 30 år, etter skatten som betales ved uttak? Se bort fra avkastning i utbetalingsperioden.</p>`,
        options: ["kr 67 163", "kr 84 278", "kr 89 778", "kr 108 049"],
        answer: 1,
        solution: `<p><b>Steg 1 — kontoverdien.</b> Hele innskuddet vokser uten løpende skatt: 25 000 × 4,321942 = kr 108 049.</p><p><b>Steg 2 — skatt ved uttak.</b> Uttaket er alminnelig inntekt, 22 % av hele beløpet: 108 049 × 22 % = kr 23 771, så netto 108 049 − 23 771 = <b>kr 84 278</b>.</p><p><b>Kontroll:</b> med satsen flyttet til starten: 25 000 × 0,78 × 4,321942 = 19 500 × 4,321942 = kr 84 278. ✓ Statens 22 %, kr 5 500, har vokst til 5 500 × 4,321942 = kr 23 771, nøyaktig skatten.</p>`,
        traps: [
          "Eierskatten 37,84 % brukt på uttaket: 108 049 × 62,16 % = kr 67 163.",
          null,
          "Bare avkastningen skattlagt, som om innskuddet kom skattefritt ut først som på aksjesparekontoen: 108 049 − 22 % × 83 049 = kr 89 778.",
          "Uttaksskatten glemt: kr 108 049.",
        ],
      },
    ],
  },
});
