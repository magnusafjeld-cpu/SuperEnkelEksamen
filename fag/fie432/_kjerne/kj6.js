/* kj6 · Nøytralitet, bedriftens tilpasning og implisitte skatter */
window.EDU_DATA.kjerne.push({
  id: "kj6",
  num: 6,
  title: "Nøytralitet, bedriftens tilpasning og implisitte skatter",
  chapters: [9, 10, 12],
  html: `
<p class="lead-in">To små regnerutiner med faste feller. Bedriftens tilpasning ga 10 % av poengene i H2025 (oppgave 7: fire nesten like brøker for F′(K), så gjeld mot egenkapital). Implisitt skatt kom i H2019 oppgave 4 og H2024 oppgave 9, der fella i 9b var nevneren. Progressivitet er prøvd med regning (H2024 oppgave 4) og Domar–Musgrave aldri; under ren flervalg må du vente stoffet som påstandsspørsmål.</p>

<h3>Nøytralitet og skattearbitrasje</h3>
<p>Et skattesystem er nøytralt når det ikke endrer rangeringen mellom private alternativer. Det krever like <i>effektive</i> satser på tvers av aktiva, finansieringsformer (gjeld mot egenkapital) og organisasjonsformer (lønn mot utbytte). Ellers flytter kapitalen seg etter avkastningen etter skatt, mens det er avkastningen før skatt som måler hva investeringen er verdt for samfunnet. Nøytralt betyr verken lav eller rettferdig skatt.</p>
<div class="formula"><div class="eq">Årlig arbitrasjegevinst = r × L × (t<sub>fradrag</sub> − t<sub>avkastning</sub>)</div>
<div class="where">Du låner L til renten r med fradrag og plasserer til samme rente med lavere skatt. Gevinsten er ren satsdifferanse: kr 1 000 000 lånt til 5 % [eksempeltall] med 22 % fradrag og plassert skattefritt gir 50 000 × 22 % = kr 11 000 i året. Lik sats på renteinntekt og rentefradrag stenger den, og markedet byr ned avkastningen på skattefrie papirer.</div></div>

<h3>Bedriftens tilpasning</h3>
<p>Bedriften bruker kapital K med inntekt F(K), der F′ &gt; 0 og F″ &lt; 0. Den betaler renten r på all kapital, men bare andelen A av rentene kan trekkes fra, så rentekostnaden står to ganger: hele rK som utbetaling, bare ArK som fradrag.</p>
<div class="formula">
<div class="eq">V = F(K) − rK − t[F(K) − ArK]</div>
<div class="eq">F′(K)(1 − t) = r(1 − At) ⟹ F′(K) = r(1 − At)/(1 − t)</div>
<div class="where">Deriver med hensyn på K og samle leddene med F′(K). Uttrykket er avkastningskravet før skatt for den siste kapitalkronen. A = 1 gir F′(K) = r: en overskuddsskatt med fullt fradrag for kapitalkostnaden er nøytral. A = 0 gir r/(1 − t) &gt; r og underinvestering.</div></div>
<p>Deles kapitalen i gjeld G og egenkapital E, har begge alternativkostnaden r, men bare gjeldsrenten er en utbetaling som gir fradrag:</p>
<div class="formula">
<div class="eq">F′<sub>G</sub> = r og F′<sub>E</sub> = r/(1 − t) ⟹ E* &lt; G*</div>
<div class="where">For gjeld stryker de to t-ene hverandre: inntekten beskattes, og renten gir fradrag. For egenkapital beskattes inntekten uten motpost. Høyere krav betyr mindre bruk, fordi F er konkav.</div></div>
<div class="callout mech"><span class="h">Hvorfor er gjeld billigere enn egenkapital?</span>Bare fordi skattesystemet gir fradrag for renter og ikke for egenkapitalens alternativkostnad. Det er en skatteregel, ikke en finansiell lov: et fradrag for beregnet egenkapitalrente ville gitt F′<sub>E</sub> = F′<sub>G</sub> = r. Det som i virkeligheten stopper hjørneløsningen med bare gjeld, er konkurskostnader, långivernes krav og rentebegrensningsregler.</div>

<div class="worked"><span class="wh">Gjennomregnet: H2025 oppgave 7 med grensetesten</span>
<p>Alternativene i 7a var F′(K) = r, rA/(1 − t), r(1 − At)/(1 − t) og r/[(1 − t)A]. Sett r = 6 % og A = 0,5 [eksempeltall] og t = 22 % [dagens regel].</p>
<p><b>Steg 1, riktig uttrykk.</b> 6 % × (1 − 0,5 × 0,22)/0,78 = 6 % × 0,89/0,78 = 6,85 %.</p>
<p><b>Steg 2, grensetesten.</b> Sett A = 1: det riktige kollapser til r = 6 %, mens rA/(1 − t) og r/[(1 − t)A] begge gir 6 %/0,78 = 7,69 %. Uttrykket r alene er riktig bare når A = 1, og oppgaven sier A &lt; 1.</p>
<p><b>Steg 3, gjeld mot egenkapital.</b> F′<sub>G</sub> = 6,00 % og F′<sub>E</sub> = 7,69 %. Et prosjekt på kr 1 000 000 som gir 7 % før renter og skatt, gir med gjeld (70 000 − 60 000) × 0,78 = 7 800. Med egenkapital gir det 70 000 × 0,78 = 54 600 mot alternativkostnaden 60 000, altså −5 400.</p>
<p><b>Kontroll:</b> uttrykket er lineært i A, så A = 0,5 skal treffe midt mellom 6,00 og 7,69 %: 13,69/2 = 6,845 ≈ 6,85 % ✓. Egenkapitalens nullpunkt er 60 000/0,78 = 76 923, altså 7,69 % ✓.</p>
<p><b>De gale tallene:</b> rA/(1 − t) gir 3,85 %, lavere enn renten; r/[(1 − t)A] gir 15,38 %; og F′<sub>G</sub> = r(1 − t) gir 4,68 %, et etter-skatt-tall i en før-skatt-sammenligning.</p>
</div>

<h3>Implisitt skatt</h3>
<p>To aktiva med samme risiko må gi samme avkastning etter skatt, ellers finnes en pengemaskin. Det skattefavoriserte bys opp i pris til fordelen er borte fra avkastningen før skatt:</p>
<div class="formula"><div class="eq">r = R(1 − t) ⟹ r &lt; R</div>
<div class="eq">t* = (R − r)/R = 1 − r/R</div>
<div class="where">R er avkastningen før skatt på det fullt skattlagte aktivumet, r på det skattefavoriserte. Nevneren er R, fordi en sats måles mot grunnlaget før skatt. Ingen krever den implisitte skatten inn.</div></div>
<p>I H2024 oppgave 9 skattlegges obligasjon B med 22 % og obligasjon A er skattefri. Med R = 10 % [eksempeltall] gir A r = 0,78 × 10 % = 7,8 %, og kontrollen (10 − 7,8)/10 = 22 % ✓. De gale brøkene: (R − r)/r = 2,2/7,8 = 28,21 %, og R − r = 2,2 prosentpoeng, som ikke er en sats.</p>
<div class="callout mech"><span class="h">Hvem tjener på et skattefritak?</span>Den implisitte satsen settes av den marginale investoren. Har du høyere marginalskatt enn t*, bør du eie det favoriserte aktivumet; har du lavere, det skattlagte. For de fleste kjøpere har konkurransen om papiret spist fordelen. Den som tjener, er utstederen, som låner billigere, og den som eide papiret da fritaket kom.</div>

<h3>Domar–Musgrave og progressivitet</h3>
<div class="formula"><div class="eq">Fullt tapsfradrag: E<sub>etter</sub> = (1 − t) × E · uten tapsfradrag: E<sub>etter</sub> = E − t × G</div>
<div class="where">E er forventet resultat før skatt, G forventet bruttogevinst i de gode utfallene. Med proporsjonal skatt og fullt tapsfradrag bærer staten andelen t av både gevinst og tap, som en stille partner: rangeringen står, og investoren skalerer det risikable beløpet opp med 1/(1 − t) til fordelingen etter skatt er som før. Resultatet krever også at tapet faktisk kan føres mot annen inntekt, og at bare meravkastningen over risikofri rente beskattes. Uten tapsfradrag straffes oppsiden, og valget vris mot det sikre.</div></div>
<p>Progressivitet betyr stigende gjennomsnittsskatt, ikke mange satser. En flat sats med bunnfradrag er både flat og progressiv, og større bunnfradrag gir sterkere progresjon (H2024 oppgave 4, se kj1); flat er ikke det samme som proporsjonal. Horisontal likhet krever at like tilfeller behandles likt, vertikal at ulike behandles passende ulikt, men evneprinsippet bak begge sier ikke hvor progressivt. Optimal marginalskatt er høyere jo lavere den kompenserte arbeidstilbudselastisiteten, jo større produktivitetsspredningen og jo sterkere ulikhetsaversjonen.</p>

<div class="callout warn"><span class="h">Feilene som koster poeng</span>r(1 − t) satt inn der et marginalprodukt før skatt skal sammenlignes. (R − r)/r i stedet for (R − r)/R. «Det skattefrie papiret har høyest avkastning før skatt»: det har lavest. «Staten deler tapet» når oppgaven ikke sier fullt tapsfradrag. «En flat skatt kan ikke være progressiv»: jo, med bunnfradrag.</div>

<div class="callout tip husk"><span class="h">Må kunne</span>
<ul><li>Avkastningskravet til marginalproduktet av kapital er F′(K) = r(1 − At)/(1 − t), der r er renten, t skattesatsen og A andelen av rentene som kan trekkes fra. Test alternativene med A = 1, som skal gi r.</li><li>Når bare renter gir fradrag: F′<sub>G</sub> = r for gjeld og F′<sub>E</sub> = r/(1 − t) for egenkapital, der r er renten og egenkapitalens alternativkostnad og t skattesatsen. Derfor bruker bedriften mindre egenkapitalfinansiert kapital enn gjeldsfinansiert: E* &lt; G*.</li><li>Implisitt skatt: to like risikable aktiva i likevekt gir r = R(1 − t) og t* = (R − r)/R, der R er avkastningen før skatt på det skattlagte og r på det skattefavoriserte. Det favoriserte passer for den med marginalskatt over t*.</li><li>Domar–Musgrave: med proporsjonal skatt t på meravkastningen og fullt tapsfradrag er staten stille partner, og investoren skalerer det risikable beløpet opp med 1/(1 − t).</li><li>Progressivitet er stigende gjennomsnittsskatt; en flat sats med bunnfradrag er progressiv.</li></ul></div>
`,
  checks: [
    {
      id: "kj6-s1",
      q: "Et skattefritt og et fullt skattlagt papir har samme risiko, og markedet er i likevekt. Hvem bør eie det skattefrie papiret?",
      options: [
        "Alle skattytere, siden et skattefritak alltid gir mest etter skatt",
        "De med lavere marginalskatt enn markedets implisitte sats",
        "Ingen, siden det har lavest avkastning før skatt",
        "De med høyere marginalskatt enn markedets implisitte sats",
      ],
      answer: 3,
      explanation: "I likevekt er t* = (R − r)/R lik marginalskatten til den marginale investoren. Den med høyere sats får mer av det skattefrie r enn av R(1 − t), den med lavere sats mindre. At et skattefritak alltid lønner seg, overser at fordelen allerede er priset inn i avkastningen før skatt.",
    },
    {
      id: "kj6-s2",
      q: "Bedriftens krav er F′(K) = r(1 − At)/(1 − t), der A er andelen av rentene som kan trekkes fra. Hva skjer når A øker fra 0,5 mot 1?",
      options: [
        "Kravet faller mot r, og bedriften bruker mer kapital",
        "Kravet stiger mot r/(1 − t), og kapitalbruken faller",
        "Kravet er uendret, siden skattesatsen er den samme",
        "Kravet faller mot r(1 − t), og bedriften bruker mer kapital",
      ],
      answer: 0,
      explanation: "Uttrykket faller i A og blir r når A = 1, der hele kapitalkostnaden gir fradrag og skatten er nøytral. Med F″ &lt; 0 betyr lavere krav mer kapital. r(1 − t) er renten etter skatt, mens kravet til marginalproduktet før skatt alltid ligger mellom r og r/(1 − t).",
    },
    {
      id: "kj6-s3",
      q: "En proporsjonal skatt på meravkastningen over risikofri rente heves, og tap gir fullt fradrag mot annen inntekt. Hva gjør investoren i Domar–Musgrave-modellen med beløpet i det risikable aktivumet?",
      options: [
        "Reduserer det, siden skatten tar en del av gevinstene",
        "Øker det, til posisjonen etter skatt er som før",
        "Holder det uendret, siden skatten treffer alle utfall likt",
        "Øker det bare hvis han er lite risikoavers",
      ],
      answer: 1,
      explanation: "Med fullt tapsfradrag krymper skatten hvert utfall med (1 − t), både gevinst og tap. Investoren skalerer beløpet opp med 1/(1 − t) og får tilbake nøyaktig samme fordeling, uansett risikoholdning. Svaret om at skatten tar en del av gevinstene, glemmer at staten også bærer andelen t av tapet.",
    },
  ],
  case: {
    id: "kj6-m1",
    topic: "Avkastningskrav, egenkapitalfinansiering og implisitt skatt",
    minutes: 10,
    body: `<p>Fjordlaks AS vurderer kapitalbruken sin. Markedsrenten er r = 5,5 % [eksempeltall], og selskapsskatten er t = 22 % [dagens regel]. Egenkapitalen har samme alternativkostnad, 5,5 %, fordi eierne kunne plassert pengene til den renten et annet sted, men den kostnaden er ingen utbetaling og gir ikke fradrag.</p>`,
    ledd: [
      {
        id: "kj6-m1a",
        points: 3,
        q: `<p>Anta at hele kapitalen er lånt til renten r, men at en rentebegrensningsregel gjør at bare 60 % av rentekostnaden er fradragsberettiget (A = 0,6). Hvilket marginalprodukt F′(K) må den siste kapitalkronen gi for å være verdt å bruke? Rund av til to desimaler.</p>`,
        options: ["6,12 %", "4,23 %", "11,75 %", "7,05 %"],
        answer: 0,
        solution: `<p><b>Steg 1 — formelen.</b> F′(K) = r(1 − At)/(1 − t) = 5,5 % × (1 − 0,6 × 0,22)/(1 − 0,22) = 5,5 % × 0,868/0,78 = <b>6,12 %</b>.</p><p><b>Steg 2 — grensene.</b> A = 1 gir r = 5,50 %, og A = 0 gir r/(1 − t) = 5,5 %/0,78 = 7,05 %. Svaret må ligge mellom dem.</p><p><b>Kontroll:</b> uttrykket er lineært i A, så 7,05 − 0,6 × (7,05 − 5,50) = 7,05 − 0,93 = 6,12 % ✓.</p>`,
        traps: [
          null,
          "rA/(1 − t) = 5,5 % × 0,6/0,78 = 4,23 %: grensene snudd, og et krav under renten kan ingen ufullstendig fradragsrett gi.",
          "r/[(1 − t)A] = 5,5 %/(0,78 × 0,6) = 11,75 %: gir r/(1 − t) ved full fradragsrett, der kravet skal være r.",
          "Fradragsandelen overset, som om ingen renter kunne trekkes fra: r/(1 − t) = 5,5 %/0,78 = 7,05 %.",
        ],
      },
      {
        id: "kj6-m1b",
        points: 3,
        q: `<p>Fjordlaks vurderer et prosjekt som binder kr 3 000 000 og gir kr 195 000 i året før renter og skatt. Prosjektet finansieres fullt med egenkapital. Hva blir eiernes årlige resultat etter skatt og etter alternativkostnaden?</p>`,
        options: ["Overskudd kr 23 400", "Overskudd kr 30 000", "Underskudd kr 12 900", "Underskudd kr 16 538"],
        answer: 2,
        solution: `<p><b>Steg 1 — skatten.</b> Egenkapitalens kostnad gir ikke fradrag, så hele inntekten beskattes: 195 000 × 22 % = 42 900, og etter skatt gjenstår 195 000 − 42 900 = 152 100.</p><p><b>Steg 2 — alternativkostnaden.</b> 3 000 000 × 5,5 % = 165 000. Resultatet er 152 100 − 165 000 = <b>−12 900</b>, et underskudd på kr 12 900.</p><p><b>Kontroll:</b> kravet for egenkapital er F′<sub>E</sub> = 5,5 %/0,78 = 7,05 %, og prosjektet gir 195 000/3 000 000 = 6,5 %, altså under kravet ✓. Med gjeld hadde det gitt (195 000 − 165 000) × 0,78 = 23 400: samme prosjekt, motsatt konklusjon.</p>`,
        traps: [
          "Egenkapitalens alternativkostnad behandlet som fradragsberettiget rente: (195 000 − 165 000) × 0,78 = 23 400, som er resultatet ved gjeldsfinansiering.",
          "Skatten glemt: 195 000 − 165 000 = 30 000.",
          null,
          "Resultatet målt før skatt: 195 000 − 165 000/0,78 = 195 000 − 211 538 = −16 538. Etter skatt er det 16 538 × 0,78 ≈ 12 900.",
        ],
      },
      {
        id: "kj6-m1c",
        points: 3,
        q: `<p>Fjordlaks har også ledig likviditet og kan velge mellom to obligasjoner med samme risiko i et velfungerende marked i likevekt: en fullt skattlagt som gir 7,5 % før skatt, og en med skattefrie renter som gir 5,4 % [eksempeltall]. Selskapet betaler 22 % skatt på renteinntekter. Hva er den implisitte skattesatsen, og hvilken obligasjon bør selskapet velge?</p>`,
        options: ["28,0 %; den skattefrie", "38,9 %; den skattlagte", "22,0 %; likegyldig", "28,0 %; den skattlagte"],
        answer: 3,
        solution: `<p><b>Steg 1 — den implisitte satsen.</b> t* = (R − r)/R = (7,5 − 5,4)/7,5 = 2,1/7,5 = <b>28,0 %</b>, lest rett ut av de to avkastningene.</p><p><b>Steg 2 — valgregelen.</b> Selskapets egen sats, 22 %, er lavere enn 28 %, så det skal eie den <b>skattlagte</b>.</p><p><b>Kontroll:</b> den skattlagte gir 7,5 % × 0,78 = 5,85 % etter skatt mot 5,4 %. Fordelen er 0,45 prosentpoeng, og via satsene (28 % − 22 %) × 7,5 % = 0,45 ✓.</p>`,
        traps: [
          "Valgregelen snudd: det skattefrie passer bare for den som har høyere marginalskatt enn 28 %, og selskapet har 22 %.",
          "Feil nevner: (7,5 − 5,4)/5,4 = 38,9 %. Valget blir riktig, men satsen skal måles mot avkastningen før skatt, 7,5 %.",
          "Selskapets egen sats tatt som markedets: den implisitte satsen leses ut av prisene, 2,1/7,5 = 28 %, ikke av skatteloven.",
          null,
        ],
      },
    ],
  },
});
