/* kj2 · Aksjonærmodellen: skjerming, utbytte og gevinst */
window.EDU_DATA.kjerne.push({
  id: "kj2",
  num: 2,
  title: "Aksjonærmodellen: skjerming, utbytte og gevinst",
  chapters: [5, 6],
  html: `
<p class="lead-in">Ingen annen rutine i kurset gir like mange poeng: skjerming er testet i fem av ni sett og tok 20 % av poengene i H2022, oppjustering og eierskatt i sju av ni. H2024 oppgave 1 og 2 og H2025 oppgave 4 og 10 er skjermingskjeder og gevinster med det samme regnestykket. Ett ledd feller folk: ubenyttet skjerming framføres <i>og</i> legges til neste års grunnlag.</p>
<h3>Eierskatten, og hvorfor den er 37,84 %</h3>
<p>For en personlig aksjonær trekkes skjermingsfradraget fra utbytte og gevinst, og resten oppjusteres og skattlegges:</p>
<div class="formula">
<div class="eq">t<sub>e</sub> = f × t = 1,72 × 22 % = 37,84 %</div>
<div class="eq">Skatt = grunnlag × f × t = grunnlag × t<sub>e</sub></div>
<div class="where">f er oppjusteringsfaktoren og t skatten på alminnelig inntekt, begge [dagens regel]. Oppjuster grunnlaget og bruk 22 %, eller oppjuster satsen og bruk grunnlaget som det er, aldri begge. Regn begge veier som kontroll. Eksamen oppgir ofte andre satser (1,6 og 25 % i H2022, eierskatt 40 % i H2025 oppgave 1): bruk oppgavens tall.</div>
</div>
<div class="callout mech"><span class="h">Hvorfor finnes oppjusteringen?</span>En krone tjent i selskapet og delt ut beskattes med 22 % i selskapet og 37,84 % av de 78 ørene som er igjen: 22 % + 78 % × 37,84 % = 51,52 %. Det skal ligne toppskatten på lønn, 47,4 % [dagens regel]. Uten oppjusteringen ville samlet sats vært 22 % + 78 % × 22 % = 39,16 %, og enhver med eget selskap ville tatt lønnen som utbytte. Det kalles inntektsskifting, og faktoren stenger døra.</div>
<h3>Skjermingen, år for år</h3>
<p>Skjermingsrenten er r<sub>s</sub> = (snittet av 3-måneders statskasseveksel + 0,5 prosentpoeng) × (1 − t), fastsatt i januar året etter inntektsåret, så eksamen oppgir den. Grunnlaget starter på kostprisen, aldri markedsverdien. Hvert år, i denne rekkefølgen:</p>
<div class="formula">
<div class="eq">S<sub>t</sub> = kostpris + ubenyttet skjerming<sub>t−1</sub></div>
<div class="eq">Skjermingsfradrag<sub>t</sub> = S<sub>t</sub> × r<sub>s,t</sub></div>
<div class="eq">Skattepliktig utbytte<sub>t</sub> = maks(0; D<sub>t</sub> − skjermingsfradrag<sub>t</sub> − ubenyttet skjerming<sub>t−1</sub>)</div>
<div class="eq">Ubenyttet skjerming<sub>t</sub> = maks(0; ubenyttet skjerming<sub>t−1</sub> + skjermingsfradrag<sub>t</sub> − D<sub>t</sub>)</div>
<div class="where">S<sub>t</sub> er skjermingsgrunnlaget og D<sub>t</sub> utbyttet i år t. Skjermingen er personlig og aksjevis. Den kan aldri gjøre skattepliktig utbytte negativt; det som ikke brukes, framføres.</div>
</div>
<div class="callout mech"><span class="h">Hvorfor teller ubenyttet skjerming to ganger?</span>Den er et fradrag som ikke ble brukt, og trekkes derfor fra et senere utbytte. Og den legges til grunnlaget, så neste års fradrag regnes av et større beløp: framført skjerming forrenter seg. Glemmer du den andre virkningen, blir svaret for høyt.</div>
<div class="worked"><span class="wh">Gjennomregnet: skjermingskjeden over tre år (H2024 oppgave 1)</span>
<p>Aksjen er kjøpt for kr 10 000, skjermingsrenten er 2 % alle år [eksempeltall], og utbyttet er 500, 100 og 400.</p>
<table class="data">
<tr><th>År</th><th>Grunnlag S</th><th>Årets fradrag</th><th>Framført inn</th><th>Utbytte</th><th>Skattepliktig</th><th>Framført ut</th></tr>
<tr><td>1</td><td class="n">10 000</td><td class="n">200</td><td class="n">0</td><td class="n">500</td><td class="n">300</td><td class="n">0</td></tr>
<tr><td>2</td><td class="n">10 000</td><td class="n">200</td><td class="n">0</td><td class="n">100</td><td class="n">0</td><td class="n">100</td></tr>
<tr><td>3</td><td class="n">10 100</td><td class="n">202</td><td class="n">100</td><td class="n">400</td><td class="n">98</td><td class="n">0</td></tr>
</table>
<p><b>Steg 1: år 1.</b> 10 000 × 2 % = 200, og 500 − 200 = <b>300</b> skattepliktig. Ingenting framføres. Spør oppgaven om grunnlaget, er svaret 300, ikke skatten 300 × 37,84 % = 113,52.</p>
<p><b>Steg 2: år 2.</b> Fradraget 200 mot utbyttet 100 gir skattepliktig <b>0</b>, ikke −100. Resten, 100, framføres.</p>
<p><b>Steg 3: år 3.</b> Grunnlaget er 10 000 + 100 = 10 100, fradraget 10 100 × 2 % = 202, samlet 202 + 100 = 302. Skattepliktig: 400 − 302 = <b>98</b>.</p>
<p><b>Kontroll:</b> samlet fradrag i år 3 er 100 × 1,02 + 200 = 302. ✓ Skattepliktig utbytte pluss brukt skjerming er utbyttene: 398 + 602 = 1 000. ✓</p>
<p><b>De gale tallene:</b> framføringen glemt gir 400 − 200 = 200; bare lagt til grunnlaget gir 400 − 202 = 198. Årets fradrag (202), samlet fradrag (302) og framført rest (100) sto som alternativer ved siden av 98: riktige mellomtall på feil linje. I H2025 oppgave 4 (kostpris 100, rente 3,5 % og så 4 %, utbytte 20 først i år 2) er svaret 20 − 3,50 − 4,14 = 12,36; fradraget regnet av kostprisen i stedet for grunnlaget 103,50 gir 12,50, den vanligste feilen i temaet.</p>
</div>
<h3>Gevinst ved salg, og eierskifte</h3>
<div class="formula">
<div class="eq">Skattepliktig gevinst = salgspris − inngangsverdi − ubenyttet skjerming</div>
<div class="eq">Skatt = gevinst × f × t = gevinst × t<sub>e</sub></div>
<div class="where">Inngangsverdien er kostprisen. Skjermingsfradraget tilordnes den som eier aksjen ved utgangen av året, så selger du før 31.12, får du ikke årets fradrag, bare det som er framført. Utbyttet tilordnes den som eier aksjen når utbyttet vedtas. Skjermingen kan redusere en gevinst til null, men ikke skape eller øke et tap.</div>
</div>
<div class="worked"><span class="wh">Gjennomregnet: gevinst med framført skjerming (H2025 oppgave 10)</span>
<p>Aksjen er kjøpt for kr 100 og solgt mot slutten av år 2 for kr 160, med kr 10 i ubenyttet skjerming fra år 1. f = 1,72 og t = 22 %, som i dag.</p>
<p><b>Steg 1: gevinsten.</b> 160 − 100 − 10 = 50.</p>
<p><b>Steg 2: skatten, begge veier.</b> 50 × 1,72 = 86, og 86 × 22 % = <b>18,92</b>. 50 × 37,84 % = 18,92. ✓</p>
<p><b>De gale tallene:</b> oppjusteringen glemt gir 50 × 22 % = 11,00, alltid 58 % av det riktige. Skjermingen glemt gir 60 × 37,84 % = 22,70. Faktoren 1,6 fra et gammelt sett gir 17,60.</p>
</div>
<h3>Når aksjonæren er et selskap</h3>
<p><b>Fritaksmetoden</b> (sktl § 2-38): et aksjeselskap betaler ikke skatt på utbytte og gevinst på aksjer i selskap i EØS, og får til gjengjeld ikke fradrag for tap. Unntaket er <b>treprosentregelen</b>: 3 % av mottatt utbytte inntektsføres, så skatten blir 3 % × 22 % = <b>0,66 %</b> av utbyttet. Den treffer bare utbytte, ikke gevinst, og gjelder ikke når mottakeren eier mer enn 90 % av selskapet og har mer enn 90 % av stemmene.</p>
<p>Et <b>holdingselskap</b> er en utsettelse, ikke et fritak. Samlet skatt på en krone som til slutt når deg, er fortsatt 22 % + 78 % × 37,84 % = 51,52 % ved direkte eie og i konsern over 90 %, men du bestemmer selv når eierskatten utløses, og utsatt skatt er et rentefritt lån fra staten. <b>Aksjonærlån</b>, lån fra selskapet til personlig aksjonær, skattlegges som utbytte siden 2015, så den omveien er stengt.</p>
<div class="callout warn"><span class="h">Feilene som koster poeng</span>Ubenyttet skjerming lagt til grunnlaget, men ikke trukket fra, eller omvendt. Oppjustering glemt, eller gjort to ganger (grunnlag × 1,72 × 37,84 %). Skjermingsfradrag gitt for salgsåret når aksjen er solgt før årsskiftet. Grunnlaget svart der oppgaven spør om skatten, eller omvendt. En gammel faktor fra hukommelsen i stedet for den oppgaven oppgir.</div>
<div class="callout tip husk"><span class="h">Må kunne</span>
<ul><li>Eierskatten er t<sub>e</sub> = f × t = 1,72 × 22 % = 37,84 % [dagens regel]. Oppjuster grunnlaget eller satsen, aldri begge, og regn begge veier som kontroll.</li>
<li>Skjermingsrutinen hvert år: grunnlag = kostpris + ubenyttet skjerming fra i fjor; fradrag = grunnlag × skjermingsrenten; skattepliktig utbytte = utbytte − fradrag − ubenyttet fra i fjor, aldri under null; resten framføres og legges til neste års grunnlag.</li>
<li>Kontroll av en skjermingskjede: skattepliktig utbytte pluss brukt skjerming over alle år er lik summen av utbyttene.</li>
<li>Skattepliktig gevinst = salgspris − inngangsverdi − ubenyttet skjerming, skattlagt med 37,84 %. Selges aksjen før årsskiftet, gis ikke årets skjermingsfradrag.</li>
<li>Samlet skatt på utdelt overskudd er 22 % + 78 % × 37,84 % = 51,52 %, mot 47,4 % på lønn: derfor oppjusteringen. Et aksjeselskap som eier aksjer i EØS, betaler etter fritaksmetoden ingen skatt på gevinst og 0,66 % (3 % × 22 %) på mottatt utbytte, null i konsern over 90 %. Et holdingselskap utsetter eierskatten, men fjerner den ikke.</li></ul></div>
`,
  checks: [
    {
      id: "kj2-s1",
      q: "Utbyttet i år er mindre enn skjermingsfradraget. Hva skjer med skjermingsgrunnlaget neste år?",
      options: [
        "Det er uendret, fordi grunnlaget alltid er aksjens kostpris",
        "Det faller, fordi en del av årets skjerming er brukt mot utbyttet",
        "Det øker med den ubrukte resten, som i tillegg trekkes fra neste års utbytte",
        "Det øker med den ubrukte resten, som da ikke trekkes fra en gang til",
      ],
      answer: 2,
      explanation: "Den ubrukte resten virker to ganger: den legges til grunnlaget, så neste års fradrag blir større, og den trekkes i tillegg fra neste utbytte. Svaret der resten bare løfter grunnlaget, gir 198 i stedet for 98 i H2024 oppgave 1d. Grunnlaget er kostprisen bare det første året, før noe er framført.",
    },
    {
      id: "kj2-s2",
      q: "Hvorfor ganges utbytte og aksjegevinst med 1,72 før 22 % skatt?",
      options: [
        "For at samlet skatt på utdelt overskudd skal ligne toppskatten på lønnsinntekt",
        "For at skjermingsfradraget skal gjøre normalavkastningen skattefri",
        "For å veie opp for at gevinsten først skattlegges når aksjen selges",
        "For at utbytte skal skattlegges hardere enn lønn, så overskudd blir stående",
      ],
      answer: 0,
      explanation: "Med oppjusteringen blir samlet skatt på utdelt overskudd 22 % + 78 % × 37,84 % = 51,52 %, nær 47,4 % på lønn; uten den ville den vært 39,16 %, og eiere ville tatt lønn som utbytte. Det er inntektsskifting faktoren skal hindre. Skjermingen gjør normalavkastningen skattefri, men det er en egen regel og ikke grunnen til faktoren.",
    },
    {
      id: "kj2-s3",
      q: "Du selger en aksjepost 20. november og har ikke fått utbytte i år. Hvilken skjerming kan du trekke fra gevinsten?",
      options: [
        "Den framførte ubenyttede skjermingen og årets fradrag, siden du eide aksjene det meste av året",
        "Årets skjermingsfradrag for månedene du eide aksjene, men ikke det som er framført",
        "Ingen, fordi skjermingsfradrag bare kan trekkes fra utbytte",
        "Bare den ubenyttede skjermingen som er framført fra tidligere år",
      ],
      answer: 3,
      explanation: "Årets skjermingsfradrag tilordnes den som eier aksjen ved utgangen av året, og det er ikke du når du selger i november. Den skjermingen som alt er framført, trekkes fra gevinsten. Å legge på årets fradrag i tillegg er fellen i H2022 oppgave 1, der det gir et negativt tall.",
    },
    {
      id: "kj2-s4",
      q: "Du eier driftsselskapet ditt gjennom et heleid holdingselskap. Hva skjer med samlet skatt på en krone overskudd som til slutt tas ut til deg?",
      options: [
        "Den faller til 22 %, fordi utbyttet til holdingselskapet er skattefritt",
        "Den er fortsatt 51,52 %, men du velger selv når eierskatten utløses",
        "Den stiger, fordi holdingselskapet betaler 22 % før utbyttet deles videre",
        "Den stiger med 0,66 prosentpoeng, fordi 3 % av utbyttet inntektsføres",
      ],
      answer: 1,
      explanation: "Fritaksmetoden gjør mellomleddet gjennomsiktig: selskapsskatt én gang og eierskatt én gang, 51,52 % samlet, uansett hvor mange ledd kjeden har. Det du vinner, er tidspunktet. Svaret om 22 % leser fritaket som endelig, men eierskatten kommer når pengene når deg, og treprosentregelen gjelder ikke når holdingselskapet eier over 90 %.",
    },
  ],
  case: {
    id: "kj2-m1",
    topic: "Skjerming over flere år, gevinst ved salg og eierskifte",
    minutes: 10,
    body: `<p>Lise kjøpte aksjer i januar år 1 for kr 120 000, som er kostprisen. Hun hadde ingen ubenyttet skjerming fra før, og hun eide aksjene ved utgangen av år 1, år 2 og år 3. Utbytte og skjermingsrente [eksempeltall]:</p>
<table class="data">
<tr><th>År</th><th>Utbytte (kr)</th><th>Skjermingsrente</th></tr>
<tr><td>1</td><td class="n">1 500</td><td class="n">3 %</td></tr>
<tr><td>2</td><td class="n">10 000</td><td class="n">4,5 %</td></tr>
<tr><td>3</td><td class="n">0</td><td class="n">4 %</td></tr>
<tr><td>4</td><td class="n">0</td><td class="n">4 %</td></tr>
</table>
<p>1. november i år 4 selger hun hele posten for kr 150 000 til en kjøper som eier den ved utgangen av år 4. Oppjusteringsfaktoren er 1,72 og skatten på alminnelig inntekt 22 % [dagens regel].</p>`,
    ledd: [
      {
        id: "kj2-m1a",
        points: 3,
        q: `<p>Hva er Lises skattepliktige utbytte i år 2?</p>`,
        options: ["kr 4 600,00", "kr 2 500,00", "kr 2 405,50", "kr 4 505,50"],
        answer: 2,
        solution: `<p><b>Steg 1: år 1.</b> Grunnlaget er kostprisen, og fradraget 120 000 × 3 % = 3 600. Utbyttet 1 500 er mindre, så skattepliktig er 0 og <b>2 100</b> framføres.</p><p><b>Steg 2: grunnlaget i år 2.</b> 120 000 + 2 100 = <b>122 100</b>.</p><p><b>Steg 3: år 2.</b> Fradrag 122 100 × 4,5 % = 5 494,50. Skattepliktig: 10 000 − 5 494,50 − 2 100 = <b>2 405,50</b>. Ingenting framføres videre.</p><p><b>Kontroll:</b> den framførte skjermingen forrenter seg, så samlet skjerming i år 2 er 2 100 × 1,045 + 120 000 × 4,5 % = 2 194,50 + 5 400 = 7 594,50, og 10 000 − 7 594,50 = 2 405,50. ✓</p>`,
        traps: [
          "Framføringen glemt helt: 10 000 − 120 000 × 4,5 % = 4 600.",
          "Resten fra år 1 trukket fra, men ikke lagt til grunnlaget: 10 000 − 2 100 − 120 000 × 4,5 % = 2 500.",
          null,
          "Resten lagt til grunnlaget, men ikke trukket fra: 10 000 − 122 100 × 4,5 % = 4 505,50.",
        ],
      },
      {
        id: "kj2-m1b",
        points: 3,
        q: `<p>Hvor mye skatt betaler Lise på gevinsten ved salget i år 4?</p>`,
        options: ["kr 11 352,00", "kr 9 535,68", "kr 5 544,00", "kr 7 646,71"],
        answer: 1,
        solution: `<p><b>Steg 1: framført skjerming.</b> Utbyttet i år 2 var større enn skjermingen, så ingenting ble framført fra år 2. År 3: grunnlag 120 000, fradrag 120 000 × 4 % = 4 800, ikke noe utbytte, så <b>4 800</b> framføres.</p><p><b>Steg 2: ingen skjerming for år 4.</b> Lise eier ikke aksjene ved utgangen av år 4.</p><p><b>Steg 3: gevinsten.</b> 150 000 − 120 000 − 4 800 = <b>25 200</b>.</p><p><b>Steg 4: skatten.</b> 25 200 × 1,72 × 22 % = <b>9 535,68</b>. Kontroll: 25 200 × 37,84 % = 9 535,68. ✓</p>`,
        traps: [
          "Den framførte skjermingen fra år 3 glemt: (150 000 − 120 000) × 37,84 % = 11 352.",
          null,
          "Oppjusteringen glemt: 25 200 × 22 % = 5 544.",
          "Skjermingsfradrag også for salgsåret, selv om hun solgte før årsskiftet: (25 200 − 124 800 × 4 %) × 37,84 % = 20 208 × 37,84 % = 7 646,71.",
        ],
      },
      {
        id: "kj2-m1c",
        points: 3,
        q: `<p>Kjøperen betalte kr 150 000. Hvor stort skjermingsfradrag gir aksjene for år 4, og hvem får det?</p>`,
        options: [
          "Kr 4 992 til Lise, beregnet av hennes grunnlag på kr 124 800",
          "Kr 4 992 til kjøperen, fordi Lises grunnlag følger aksjene",
          "Ingen: fradraget faller bort det året aksjene skifter eier",
          "Kr 6 000 til kjøperen, beregnet av kjøperens egen kostpris",
        ],
        answer: 3,
        solution: `<p><b>Hvem:</b> skjermingsfradraget tilordnes den som eier aksjen ved utgangen av året. Det er kjøperen.</p><p><b>Grunnlaget:</b> skjermingen er personlig, og grunnlaget starter på eierens egen kostpris, her kr 150 000. Lises ubenyttede skjerming er brukt mot gevinsten hennes og følger ikke med til kjøperen.</p><p><b>Fradraget:</b> 150 000 × 4 % = <b>6 000</b>.</p>`,
        traps: [
          "Fradraget gitt til den som eide aksjene mest av året, med hennes grunnlag (120 000 + 4 800) × 4 %. Det er eieren ved årsskiftet som får det.",
          "Riktig mottaker, men Lises grunnlag i stedet for kjøperens: (120 000 + 4 800) × 4 %. Ved salg starter kjøperens grunnlag på kjøperens egen kostpris, og Lises ubenyttede skjerming er brukt mot hennes gevinst.",
          "Årsskifteregelen lest som at ingen får skjerming det året. Selgeren mister årets fradrag, men kjøperen som eier ved årsskiftet, får det.",
          null,
        ],
      },
    ],
  },
});
