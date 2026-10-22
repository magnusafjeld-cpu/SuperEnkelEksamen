/* sjanger 2 · aksjonaer · Aksjonærmodellen: skjerming, utbytte og gevinst */
window.EDU_DATA.sjangre.push({
  id: "aksjonaer",
  num: 2,
  title: "Aksjonærmodellen: skjerming, utbytte og gevinst",
  summary: "Fra oppjusteringen og ett års skjerming til flerårig skjerming, gevinst og tap ved salg",
  chapters: [5, 6],
  exam: "7 av 9 sett · H2024 oppgave 1 og 2, H2025 oppgave 4 og 10, H2022 oppgave 1 og 2",
  intro: `<p>Aksjonærmodellen er den mest gjenbrukte regnerutinen på skattesiden: oppjustering og eierskatt har kommet i sju av ni sett, skjermingen i fem. Til sammen står de for rundt 12 % av poengene. Oppgavene er korte, men de gale alternativene er laget av nøyaktig de feilene som er lettest å gjøre: glemt oppjustering, glemt ubenyttet skjerming eller skjerming som ikke er lagt til grunnlaget. Stigen starter med 37,84 % og ett års skjerming. Den ender med flerårige skjermingskjeder og gevinst ved salg på eksamensnivå, som H2024 oppgave 1 og 2 og H2025 oppgave 4 og 10.</p>`,
  steps: [
    {
      id: "aksjonaer-1",
      title: "Oppjustering og eierskatten 37,84 %",
      theory: `<p>Aksjonærmodellen gjelder deg som eier aksjer personlig. Utbytte og aksjegevinst skattlegges som alminnelig inntekt, men grunnlaget ganges først med oppjusteringsfaktoren f. Den effektive satsen, eierskatten t<sub>e</sub>, blir derfor høyere enn 22 %. Du kan oppjustere grunnlaget og bruke t, eller oppjustere satsen og bruke grunnlaget som det er. Begge gir samme svar; gjør du begge deler, har du oppjustert to ganger.</p>
<div class="formula"><div class="eq">t<sub>e</sub> = f × t = 1,72 × 22 % = 37,84 %</div><div class="eq">Eierskatt = grunnlag × f × t = grunnlag × t<sub>e</sub></div><div class="where">f er oppjusteringsfaktoren og t skatten på alminnelig inntekt, begge [dagens regel] for 2026. Eier du aksjene gjennom et selskap, gjelder fritaksmetoden i stedet.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Du får kr 10 000 i utbytte og har ingen skjerming å trekke fra.</p><p>Oppjuster grunnlaget: 10 000 × 1,72 = 17 200; 17 200 × 22 % = <b>kr 3 784</b>.</p><p>Oppjuster satsen: 10 000 × 37,84 % = <b>kr 3 784</b>. Samme tall begge veier.</p></div>`,
      q: `<p>Lise eier aksjer personlig og mottar kr 35 000 i utbytte. Hun har ingen skjerming å trekke fra. Oppjusteringsfaktoren er 1,72 og skatten på alminnelig inntekt 22 % [dagens regel]. Hvor mye eierskatt betaler hun på utbyttet?</p>`,
      options: ["kr 13 244", "kr 7 700", "kr 22 780", "kr 60 200"],
      answer: 0,
      solution: `<p>Grunnlaget er hele utbyttet, kr 35 000, siden hun ikke har skjerming.</p><p>Oppjuster grunnlaget: 35 000 × 1,72 = 60 200.</p><p>Skatt: 60 200 × 22 % = <b>kr 13 244</b>.</p>`,
      check: `<p>Oppjuster satsen i stedet: 35 000 × 37,84 % = 13 244. Samme tall, så oppjusteringen er gjort nøyaktig én gang. Lise beholder 35 000 − 13 244 = 21 756, altså 62,16 % = 1 − 37,84 %.</p>`,
      traps: [
        null,
        "Glemt oppjusteringen: 35 000 × 22 % = 7 700. Et slikt svar er alltid 22/37,84 = 58 % av det riktige.",
        "Oppjustert to ganger, både grunnlaget og satsen: 35 000 × 1,72 × 37,84 % = 22 779,68, avrundet 22 780.",
        "Svarte med det oppjusterte grunnlaget, 35 000 × 1,72 = 60 200, uten å gange med skattesatsen.",
      ],
    },
    {
      id: "aksjonaer-2",
      title: "Skjermingsfradraget og skattepliktig utbytte",
      theory: `<p>Skjermingsfradraget gjør en risikofri normalavkastning på det du har betalt for aksjen skattefri, slik at eierskatten bare treffer avkastningen utover den. Fradraget er skjermingsgrunnlaget S ganget med skjermingsrenten r<sub>s</sub>. Grunnlaget er aksjens kostpris (inngangsverdien), aldri markedsverdien. Renten er allerede en rente etter skatt. Eksamen oppgir den alltid. Fradraget trekkes fra utbyttet. Bare det som blir igjen, oppjusteres og skattlegges: først skjerming, så oppjustering.</p>
<div class="formula"><div class="eq">Skjermingsfradrag = S × r<sub>s</sub></div><div class="eq">Eierskatt = (utbytte − skjermingsfradrag) × f × t = skattepliktig utbytte × t<sub>e</sub></div><div class="where">r<sub>s</sub> = (3-måneders statskasseveksel + 0,5 prosentpoeng) × (1 − 22 %), fastsatt i januar året etter inntektsåret. Faktiske satser: 3,2 % (2023), 3,9 % (2024) og 3,6 % (2025). Renten for 2026 kommer i januar 2027. f = 1,72 og t = 22 %, så t<sub>e</sub> = 37,84 % [dagens regel]. Les nøye om oppgaven spør etter skattepliktig utbytte eller eierskatten.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Du kjøpte aksjer for kr 50 000. Ved årsskiftet er de verdt kr 70 000. I løpet av året får du kr 5 000 i utbytte. Skjermingsrenten er 3,6 % [faktisk sats for 2025].</p><p>Skjermingsfradrag: 50 000 × 3,6 % = 1 800. Markedsverdien på 70 000 brukes ikke. Skattepliktig utbytte: 5 000 − 1 800 = 3 200.</p><p>Eierskatt: 3 200 × 1,72 = 5 504; 5 504 × 22 % = <b>kr 1 210,88</b>. Kontroll: 3 200 × 37,84 % = 1 210,88.</p></div>`,
      q: `<p>Tone kjøpte aksjer for kr 180 000, som er kostprisen. Hun har ingen ubenyttet skjerming. Ved årsskiftet eier hun dem fortsatt, men kursen har falt, så de er bare verdt kr 150 000. I år får hun kr 16 000 i utbytte. Skjermingsrenten er 4 % [eksempeltall]. Oppjusteringsfaktoren er 1,72 og skatten på alminnelig inntekt 22 % [dagens regel]. Hvor mye eierskatt betaler hun på utbyttet?</p>`,
      options: ["kr 3 784,00", "kr 6 054,40", "kr 3 329,92", "kr 4 470,40"],
      answer: 2,
      solution: `<p>Grunnlaget er kostprisen, også når kursen har falt: 180 000 × 4 % = 7 200.</p><p>Skattepliktig utbytte: 16 000 − 7 200 = 8 800.</p><p>Eierskatt: 8 800 × 1,72 = 15 136; 15 136 × 22 % = <b>kr 3 329,92</b>.</p>`,
      check: `<p>Oppjuster satsen i stedet: 8 800 × 37,84 % = 3 329,92. Skjermingen skal også spare deg nøyaktig fradraget × t<sub>e</sub>: uten skjerming er skatten 16 000 × 37,84 % = 6 054,40. Trekk fra 7 200 × 37,84 % = 2 724,48: 6 054,40 − 2 724,48 = 3 329,92.</p>`,
      traps: [
        "Skjermingen regnet av markedsverdien: 150 000 × 4 % = 6 000, så (16 000 − 6 000) × 37,84 % = 3 784,00. Grunnlaget er kostprisen, også når kursen har falt.",
        "Skatt av utbyttet før skjerming: 16 000 × 37,84 % = 6 054,40.",
        null,
        "Oppjusterte utbyttet før skjermingen ble trukket fra: (16 000 × 1,72 − 7 200) × 22 % = 20 320 × 22 % = 4 470,40. Skjermingen trekkes før oppjusteringen.",
      ],
    },
    {
      id: "aksjonaer-3",
      title: "Ubenyttet skjerming framføres",
      theory: `<p>Er utbyttet mindre enn skjermingsfradraget, blir skattepliktig utbytte null. Det kan aldri bli negativt. Skjermingen gir heller aldri fradrag i annen inntekt. Den delen av fradraget som ikke ble brukt, er <i>ubenyttet skjerming</i>. Den framføres på den enkelte aksjen og kan brukes mot utbytte eller gevinst på samme aksje senere.</p>
<div class="formula"><div class="eq">Skattepliktig utbytte = maks(0; utbytte − skjermingsfradrag)</div><div class="eq">Ubenyttet skjerming = maks(0; skjermingsfradrag − utbytte)</div><div class="where">Skjermingen er personlig og aksjevis: den følger aksjen du eier, ikke deg som skattyter generelt.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Kostpris kr 50 000, skjermingsrente 3,6 %, utbytte kr 1 000.</p><p>Skjermingsfradrag: 50 000 × 3,6 % = 1 800. Skattepliktig utbytte: 1 000 − 1 800 = −800, som settes til <b>0</b>.</p><p>Ubenyttet skjerming: 1 800 − 1 000 = <b>kr 800</b>, som framføres. De første 1 000 av fradraget ble brukt mot årets utbytte.</p></div>`,
      q: `<p>Jens har en aksjepost med kostpris kr 320 000 og ingen ubenyttet skjerming fra før. I år mottar han kr 4 500 i utbytte. Han eier posten ved årsskiftet, da den er verdt kr 400 000. Skjermingsrenten er 3,5 % [eksempeltall]. Hvor mye ubenyttet skjerming framføres til neste år?</p>`,
      options: ["kr 9 500", "kr 11 200", "kr 6 700", "kr 4 236"],
      answer: 2,
      solution: `<p>Skjermingsfradrag: 320 000 × 3,5 % = 11 200.</p><p>Utbyttet er mindre enn fradraget, så skattepliktig utbytte er 0. Av fradraget er 4 500 brukt mot utbyttet.</p><p>Ubenyttet skjerming: 11 200 − 4 500 = <b>kr 6 700</b>, som framføres på aksjeposten.</p>`,
      check: `<p>Brukt pluss ubenyttet skal gi hele fradraget: 4 500 + 6 700 = 11 200. Hele utbyttet er skjermet: 4 500 − 4 500 = 0 i skattepliktig utbytte.</p>`,
      traps: [
        "Skjermingen regnet av markedsverdien: 400 000 × 3,5 % − 4 500 = 14 000 − 4 500 = 9 500.",
        "Framførte hele fradraget på 11 200 og glemte at 4 500 av det ble brukt mot årets utbytte.",
        null,
        "Nedjusterte renten for skatt en gang til: 320 000 × 3,5 % × 0,78 − 4 500 = 8 736 − 4 500 = 4 236. Skjermingsrenten er allerede etter skatt.",
      ],
    },
    {
      id: "aksjonaer-4",
      title: "Året etter: ubenyttet skjerming virker to ganger",
      theory: `<p>Ubenyttet skjerming gjør to ting året etter. Den legges til skjermingsgrunnlaget, slik at årets fradrag regnes av et større beløp: den framførte skjermingen forrentes som et innskudd. I tillegg trekkes den selv fra utbyttet, ved siden av årets fradrag. Glemmer du én av de to virkningene, treffer du et av de gale alternativene. Sensorveiledningene peker på nettopp dette leddet. Bruk hvert års egen rente, slik H2025 oppgave 4 krevde med ulike renter i to år og svar med to desimaler.</p>
<div class="formula"><div class="eq">S<sub>2</sub> = kostpris + ubenyttet skjerming<sub>1</sub></div><div class="eq">Samlet fradrag<sub>2</sub> = ubenyttet skjerming<sub>1</sub> + S<sub>2</sub> × r<sub>s,2</sub></div><div class="eq">Skattepliktig utbytte<sub>2</sub> = maks(0; utbytte<sub>2</sub> − samlet fradrag<sub>2</sub>)</div><div class="where">Indeksen er året. Grunnlaget er fortsatt kostprisen, bare løftet med det som er framført. Står det igjen noe av det samlede fradraget, framføres resten til året etter på samme måte. Kontroll når år 1 er uten utbytte: samlet skjerming = kostpris × (1 + r<sub>s,1</sub>) × (1 + r<sub>s,2</sub>) − kostpris.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Kostpris kr 50 000, ubenyttet skjerming kr 800 fra år 1, skjermingsrente 4 % og utbytte kr 5 000 i år 2.</p><p>Grunnlaget: S<sub>2</sub> = 50 000 + 800 = 50 800. Årets fradrag: 50 800 × 4 % = 2 032, mot 2 000 om grunnlaget hadde stått stille. De 32 kronene er rente på de framførte 800.</p><p>Samlet fradrag: 800 + 2 032 = 2 832. Skattepliktig utbytte: 5 000 − 2 832 = <b>kr 2 168</b>. Hele fradraget er brukt, så ingenting framføres til år 3.</p></div>`,
      q: `<p>Ida kjøpte en aksje i mars 2023 for kr 250, som er kostprisen. Hun hadde rett til utbytte i 2023, men selskapet betalte ikke utbytte det året. I 2024 mottok hun kr 30 i utbytte. Hun eide aksjen ved utgangen av begge år. Skjermingsrenten var 3,2 % i 2023 og 3,9 % i 2024 [faktiske satser]. Hva er Idas skattepliktige utbytte i 2024? Benytt to desimaler.</p>`,
      options: ["kr 12,25", "kr 11,94", "kr 22,00", "kr 19,94"],
      answer: 1,
      solution: `<p>2023: fradrag 250 × 3,2 % = 8,00. Ingen utbytte, så 8,00 framføres.</p><p>2024, grunnlaget: 250 + 8,00 = 258,00. Årets fradrag: 258,00 × 3,9 % = 10,062 ≈ 10,06.</p><p>Skattepliktig utbytte: 30 − 8,00 − 10,06 = <b>kr 11,94</b>.</p>`,
      check: `<p>La grunnlaget vokse: 250 × 1,032 × 1,039 = 268,06. Skjerming til disposisjon i 2024 er 268,06 − 250 = 18,06, som er 8,00 + 10,06. Og 30 − 18,06 = 11,94.</p>`,
      traps: [
        "Ubenyttet skjerming ikke lagt til grunnlaget: 30 − 8,00 − 250 × 3,9 % = 30 − 8,00 − 9,75 = 12,25.",
        null,
        "Trakk bare fra den framførte skjermingen og glemte årets fradrag: 30 − 8,00 = 22,00.",
        "Trakk bare fra årets fradrag og glemte den framførte skjermingen: 30 − 10,06 = 19,94.",
      ],
    },
    {
      id: "aksjonaer-5",
      title: "Eierskatt etter selskapsskatt",
      theory: `<p>Utbyttet kommer fra et selskap som allerede har betalt selskapsskatt τ<sub>c</sub> av overskuddet. Det som kan deles ut, er overskuddet etter skatt. Eierskatten regnes så av utbyttet minus skjermingen, aldri av overskuddet før selskapsskatt. Uten skjerming blir samlet skatt på en utdelt krone 22 % + 78 % × 37,84 % = 51,52 % [dagens regel]. H2022 oppgave 1 bygde flere delspørsmål på denne kjeden.</p>
<div class="formula"><div class="eq">Utbytte = overskudd × (1 − τ<sub>c</sub>)</div><div class="eq">Eierskatt = (utbytte − skjermingsfradrag) × t<sub>e</sub></div><div class="where">τ<sub>c</sub> er selskapsskatten, 22 % [dagens regel]. Skjermingsfradraget regnes av eierens kostpris på aksjene, ikke av overskuddet.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Selskapet tjener kr 100 000 før skatt og deler ut alt som er igjen. Eierens kostpris er kr 200 000 og skjermingsrenten 4 %.</p><p>Selskapsskatt: 100 000 × 22 % = 22 000. Utbytte: 78 000. Skjerming: 200 000 × 4 % = 8 000. Skattepliktig utbytte: 70 000.</p><p>Eierskatt: 70 000 × 37,84 % = <b>kr 26 488</b>. Eieren sitter igjen med 78 000 − 26 488 = 51 512.</p></div>`,
      q: `<p>Eva eier alle aksjene i Lyngheia AS, kjøpt for kr 360 000, som er kostprisen. Hun har ingen ubenyttet skjerming. Selskapet har et overskudd før skatt på kr 250 000 og betaler 22 % selskapsskatt. Alt som er igjen, deles ut til Eva som utbytte. Skjermingsrenten er 3,5 % [eksempeltall]. Oppjusteringsfaktoren er 1,72 og skatten på alminnelig inntekt 22 % [dagens regel]. Hvor mye sitter Eva igjen med av utbyttet etter eierskatt? Benytt to desimaler.</p>`,
      options: ["kr 121 212,00", "kr 76 285,32", "kr 125 979,84", "kr 105 167,84"],
      answer: 2,
      solution: `<p>Selskapsskatt: 250 000 × 22 % = 55 000. Utbytte: 250 000 − 55 000 = 195 000.</p><p>Skjerming: 360 000 × 3,5 % = 12 600. Skattepliktig utbytte: 195 000 − 12 600 = 182 400.</p><p>Eierskatt: 182 400 × 1,72 = 313 728; 313 728 × 22 % = 69 020,16.</p><p>Igjen: 195 000 − 69 020,16 = <b>kr 125 979,84</b>.</p>`,
      check: `<p>Gå via samlet sats. Uten skjerming betaler selskap og eier til sammen 22 % + 78 % × 37,84 % = 51,5152 %, altså 250 000 × 51,5152 % = 128 788. Skjermingen sparer 12 600 × 37,84 % = 4 767,84, så samlet skatt blir 124 020,16. Av overskuddet før skatt sitter Eva igjen med 250 000 − 124 020,16 = 125 979,84.</p>`,
      traps: [
        "Glemt skjermingen: eierskatt 195 000 × 37,84 % = 73 788, så 195 000 − 73 788 = 121 212,00.",
        "Oppjustert to ganger: eierskatt 182 400 × 1,72 × 37,84 % = 118 714,68, så 195 000 − 118 714,68 = 76 285,32.",
        null,
        "Eierskatten regnet av overskuddet før selskapsskatt: (250 000 − 12 600) × 37,84 % = 89 832,16, så 195 000 − 89 832,16 = 105 167,84. Eierskatten treffer utbyttet, ikke overskuddet.",
      ],
    },
    {
      id: "aksjonaer-6",
      title: "Gevinst ved salg",
      theory: `<p>Ved salg byttes utbyttet ut med en gevinst. Resten av rutinen er den samme: trekk fra framført ubenyttet skjerming og oppjuster det som blir igjen én gang. Ubenyttet skjerming kan redusere gevinsten til null, men aldri under. Slik var H2024 oppgave 2 og H2025 oppgave 10 bygget.</p>
<div class="formula"><div class="eq">Skattepliktig gevinst = salgssum − kostpris − ubenyttet skjerming</div><div class="eq">Skatt = gevinst × f × t = gevinst × t<sub>e</sub></div><div class="where">Kostprisen er inngangsverdien. Den ubenyttede skjermingen er den som er framført fra årene du eide aksjen. f = 1,72 og t = 22 % [dagens regel].</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Kjøpt for kr 40 000, solgt for kr 65 000, ubenyttet skjerming kr 2 500.</p><p>Gevinst: 65 000 − 40 000 − 2 500 = 22 500. Oppjustert: 22 500 × 1,72 = 38 700. Skatt: 38 700 × 22 % = <b>kr 8 514</b>. Kontroll: 22 500 × 37,84 % = 8 514.</p></div>`,
      q: `<p>Petter kjøpte aksjer for kr 85 000, som er inngangsverdien. Han selger dem for kr 112 000. Han har kr 3 000 i ubenyttet skjerming framført fra årene han har eid dem. Oppjusteringsfaktoren er 1,72 og skatten på alminnelig inntekt 22 % [dagens regel]. Hvor mye skatt betaler Petter på gevinsten? Benytt to desimaler.</p>`,
      options: ["kr 10 216,80", "kr 5 280,00", "kr 7 216,80", "kr 9 081,60"],
      answer: 3,
      solution: `<p>Gevinst: 112 000 − 85 000 − 3 000 = 24 000.</p><p>Oppjuster: 24 000 × 1,72 = 41 280.</p><p>Skatt: 41 280 × 22 % = <b>kr 9 081,60</b>.</p>`,
      check: `<p>Oppjuster satsen i stedet: 24 000 × 37,84 % = 9 081,60. Petter beholder 24 000 − 9 081,60 = 14 918,40 av den skattepliktige gevinsten, som er 62,16 % = 1 − 37,84 %.</p>`,
      traps: [
        "Glemt den ubenyttede skjermingen: (112 000 − 85 000) × 37,84 % = 27 000 × 37,84 % = 10 216,80.",
        "Glemt oppjusteringen: 24 000 × 22 % = 5 280,00.",
        "Trakk skjermingen fra skatten i stedet for fra gevinsten: 27 000 × 37,84 % − 3 000 = 10 216,80 − 3 000 = 7 216,80. Skjermingen er et fradrag i inntekten, ikke i skatten.",
        null,
      ],
    },
    {
      id: "aksjonaer-7",
      title: "Tap ved salg",
      theory: `<p>Selger du for mindre enn kostprisen, får du et tap. For en personlig aksjonær er tapet fradragsberettiget og oppjusteres akkurat som en gevinst, så skatten går ned med tapet × 37,84 % [dagens regel]. Ubenyttet skjerming kan derimot verken skape eller øke et tap: den går tapt. Skjermingen er altså asymmetrisk. For et selskap som eier aksjer, er det annerledes: under fritaksmetoden er gevinsten skattefri og tapet ikke fradragsberettiget.</p>
<div class="formula"><div class="eq">Tap = kostpris − salgssum</div><div class="eq">Skattereduksjon = tap × f × t = tap × t<sub>e</sub></div><div class="where">Forutsetter at du har annen inntekt å trekke tapet fra. Ubenyttet skjerming på aksjen brukes ikke.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Kjøpt for kr 60 000, solgt for kr 45 000, ubenyttet skjerming kr 2 000.</p><p>Tap: 60 000 − 45 000 = 15 000. Skattereduksjon: 15 000 × 37,84 % = <b>kr 5 676</b>. De 2 000 i ubenyttet skjerming går tapt. Tar du dem med, får du 17 000 × 37,84 % = 6 432,80, som er feil.</p></div>`,
      q: `<p>Randi eier aksjer personlig. Hun kjøpte dem for kr 140 000, som er kostprisen. Nå selger hun dem for kr 98 000. Hun har kr 4 200 i ubenyttet skjerming på aksjene. Hun har nok annen inntekt til å utnytte et fradrag fullt ut. Oppjusteringsfaktoren er 1,72 og skatten på alminnelig inntekt 22 % [dagens regel]. Hvor mye lavere blir skatten hennes på grunn av salget? Benytt to desimaler.</p>`,
      options: ["kr 17 482,08", "kr 15 892,80", "kr 0,00", "kr 9 240,00"],
      answer: 1,
      solution: `<p>Tap: 140 000 − 98 000 = 42 000. Den ubenyttede skjermingen kan ikke øke tapet.</p><p>Oppjuster: 42 000 × 1,72 = 72 240.</p><p>Skattereduksjon: 72 240 × 22 % = <b>kr 15 892,80</b>.</p>`,
      check: `<p>Oppjuster satsen i stedet: 42 000 × 37,84 % = 15 892,80. Etter skatt taper Randi 42 000 − 15 892,80 = 26 107,20, altså 62,16 % av tapet. Staten deler gevinst og tap med samme sats, men ikke den ubenyttede skjermingen.</p>`,
      traps: [
        "Lot den ubenyttede skjermingen øke tapet: (42 000 + 4 200) × 37,84 % = 17 482,08. Skjermingen kan ikke skape eller øke et tap.",
        null,
        "Trodde aksjetap ikke gir fradrag. Det gjelder et selskap under fritaksmetoden, ikke en personlig aksjonær.",
        "Glemt å oppjustere tapet: 42 000 × 22 % = 9 240,00.",
      ],
    },
    {
      id: "aksjonaer-8",
      title: "Eierskifte: hvem får utbyttet og skjermingen",
      theory: `<p>Når en aksje skifter eier midt i året, følger utbyttet og skjermingen hver sin regel. Utbyttet skattlegges hos den som eier aksjen når utbyttet vedtas. Årets skjermingsfradrag tilordnes den som eier aksjen ved utgangen av året, 31. desember. Det regnes av eierens egen kostpris med hele årets rente. Selgeren får altså ingen skjerming for salgsåret, men kan bruke skjerming som allerede er framført fra tidligere år, mot gevinsten.</p>
<div class="formula"><div class="eq">Utbytte → eieren da utbyttet vedtas</div><div class="eq">Årets skjermingsfradrag → eieren 31.12: eierens kostpris × årets r<sub>s</sub></div><div class="where">Skjermingen hører til aksjonærmodellen og gjelder personlige aksjonærer. Framført ubenyttet skjerming følger ikke med til kjøperen.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Kari eier en aksje da generalforsamlingen i mai vedtar utbytte. I november selger hun aksjen til Per for kr 300. Skjermingsrenten for året er 4 %.</p><p>Kari skattlegges for utbyttet, men får ingen skjerming for året. Per får hele årets skjermingsfradrag: 300 × 4 % = <b>kr 12</b>, selv om han bare eide aksjen i to måneder.</p></div>`,
      q: `<p>Liv eier en aksje i Fjellvind AS da generalforsamlingen i april vedtar utbytte. I september selger hun aksjen til Tor, som eier den ved årsskiftet. Begge er personlige aksjonærer. Hvilket utsagn er riktig?</p>`,
      options: [
        "Liv skattlegges for utbyttet og får årets skjermingsfradrag, fordi hun eide aksjen da utbyttet ble vedtatt.",
        "Tor skattlegges for utbyttet og får årets skjermingsfradrag, fordi han eier aksjen ved årsskiftet.",
        "Tor skattlegges for utbyttet. Liv får årets skjermingsfradrag, fordi hun eide aksjen lengst i året.",
        "Liv skattlegges for utbyttet. Tor får hele årets skjermingsfradrag.",
      ],
      answer: 3,
      solution: `<p>Utbyttet følger eieren på vedtakstidspunktet. Liv eide aksjen i april, så utbyttet skattlegges hos henne.</p><p>Årets skjermingsfradrag følger eieren 31. desember. Det er Tor. Han får fradraget regnet av sin kostpris med hele årets rente. Liv får ingen skjerming for salgsåret, bare den hun eventuelt har framført fra før, som hun kan trekke fra gevinsten.</p>`,
      check: `<p>Sjekk mot gevinstregelen fra steg 6: Livs gevinst er salgssum − kostpris − framført ubenyttet skjerming. Årets skjerming står ikke i formelen, fordi den går til Tor. Den samme regelen avgjorde H2022 oppgave 1, spørsmål 6: aksjen ble solgt om sommeren, så salgsåret ga ingen skjerming.</p>`,
      traps: [
        "Trodde skjermingen følger utbyttet. Årets skjerming går til den som eier aksjen 31. desember, ikke til den som eide den ved vedtaket.",
        "Trodde utbyttet også følger eieren ved årsskiftet. Utbyttet skattlegges hos den som eide aksjen da det ble vedtatt.",
        "Byttet om de to reglene. Skjermingen fordeles heller ikke etter eiertid; den går til eieren 31. desember.",
        null,
      ],
    },
    {
      id: "aksjonaer-9",
      title: "Hvorfor oppjusteringen finnes: inntektsskifting",
      theory: `<p>En eier som arbeider i eget selskap, kan selv velge om hun tar ut penger som lønn eller som utbytte. Uten oppjustering ville utdelt overskudd blitt skattlagt med 22 % + 78 % × 22 % = 39,16 %. Det er langt under 47,4 % på høy lønn [dagens regel], så alle ville tatt lønnen som utbytte. Det kalles inntektsskifting. Faktoren f settes slik at de to veiene koster det samme. Kurset (forelesning 5, 2026) legger da de <i>nominelle</i> satsene sammen.</p>
<div class="formula"><div class="eq">t<sub>w</sub> + a = τ<sub>c</sub> + f × t</div><div class="eq">47,4 % + 12,4 % = 22 % + 22 % × f &nbsp;⟹&nbsp; f = 37,8/22 ≈ 1,72</div><div class="where">t<sub>w</sub> er høyeste marginalskatt på lønn, a arbeidsgiveravgiften målt mot lønnskostnaden (14,1 % av lønnen er 12,4 % av kostnaden), τ<sub>c</sub> selskapsskatten (forelesningen skriver t<sub>A</sub>) og t satsen eierskatten regnes med. Likningen forutsetter at arbeidstakeren bærer hele avgiften. Eierskatten blir f × t = t<sub>w</sub> + a − τ<sub>c</sub>.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Anta at selskapsskatten senkes til 21 % mens alt annet er som i dag [eksempeltall].</p><p>59,8 = 21 + 22 × f, så f = 38,8/22 = 1,7636 og eierskatten blir 22 % × 1,7636 = <b>38,8 %</b>. Lavere skatt på selskapet gir høyere skatt på eieren, slik at summen fortsatt er 59,8.</p></div>`,
      q: `<p>Anta en skattereform [eksempeltall]: høyeste marginalskatt på lønn er 46 %, arbeidsgiveravgiften som arbeidstakeren bærer, er 12 % av lønnskostnaden, selskapsskatten er 20 % og skatten på alminnelig inntekt for personer, som eierskatten regnes med, er 24 %. Myndighetene setter oppjusteringsfaktoren med kursets inntektsskiftingslikning. Hvilken eierskatt t<sub>e</sub> = f × t gir det?</p>`,
      options: ["26,0 %", "47,5 %", "14,0 %", "38,0 %"],
      answer: 3,
      solution: `<p>Lønnssiden: 46 % + 12 % = 58 %.</p><p>Likningen: 58 = 20 + 24 × f, så f = 38/24 = 1,5833.</p><p>Eierskatt: 1,5833 × 24 % = <b>38,0 %</b>, som er 58 − 20.</p>`,
      check: `<p>Sett inn igjen: 20 % + 38 % = 58 % = 46 % + 12 %. Begge sider er like, så en krone tatt ut som utbytte koster nominelt det samme som en krone tatt ut som lønn.</p>`,
      traps: [
        "Glemt arbeidsgiveravgiften: 46 = 20 + 24 × f gir f = 1,0833 og eierskatt 26,0 %.",
        "Brukte den eldre likningen med effektive satser fra H2017 og H2020: 58 = 20 + (1 − 20 %) × 24 × f gir f = 1,9792 og 47,5 %.",
        "Satte avgiften på bedriftens side, som om bedriften bar den: 46 = 20 + 12 + 24 × f gir f = 0,5833 og 14,0 %.",
        null,
      ],
    },
    {
      id: "aksjonaer-10",
      title: "Eksamensnivå: skjermingskjeden over tre år (H2024 oppgave 1)",
      theory: `<p>H2024 oppgave 1 fulgte én aksje gjennom tre år, i fire delspørsmål som bygget på hverandre. Det som feller folk, er året etter et år med for lite utbytte: der virker den ubenyttede skjermingen begge veier. Sett opp én rad per år med grunnlag, årets fradrag, framført inn, samlet fradrag, utbytte, skattepliktig og framført ut. Et år der utbyttet er større enn samlet fradrag, framfører ingenting.</p>
<div class="formula"><div class="eq">S<sub>t</sub> = kostpris + framført inn<sub>t</sub></div><div class="eq">Samlet fradrag<sub>t</sub> = S<sub>t</sub> × r<sub>s,t</sub> + framført inn<sub>t</sub></div><div class="eq">Skattepliktig<sub>t</sub> = maks(0; utbytte<sub>t</sub> − samlet fradrag<sub>t</sub>) &nbsp;·&nbsp; framført ut<sub>t</sub> = maks(0; samlet fradrag<sub>t</sub> − utbytte<sub>t</sub>)</div><div class="where">Framført ut i ett år er framført inn året etter.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Kostpris kr 5 000, skjermingsrente 4 % alle år, utbytte 300, 100 og 500.</p><p>År 1: fradrag 200, skattepliktig 300 − 200 = 100, ingenting framført. År 2: fradrag 200, utbytte 100, skattepliktig 0, framført 100. År 3: grunnlag 5 100, årets fradrag 204, samlet 204 + 100 = 304, skattepliktig 500 − 304 = <b>196</b>.</p></div>`,
      q: `<p>Synne kjøpte en aksjepost for kr 25 000, som er kostprisen. Hun eier den ved utgangen av alle tre år og hadde ingen ubenyttet skjerming før år 1. Skjermingsrenten er 3 % i alle år [eksempeltall]. Hun mottar kr 1 000 i utbytte i år 1, kr 300 i år 2 og kr 1 500 i år 3. Ved utgangen av år 3 er posten verdt kr 32 000. Hva er skattepliktig utbytte i år 3? Benytt to desimaler.</p>`,
      options: ["kr 286,50", "kr 736,50", "kr 108,41", "kr 300,00"],
      answer: 0,
      solution: `<table class="data"><tr><th>År</th><th>Grunnlag S</th><th>Årets fradrag</th><th>Framført inn</th><th>Samlet fradrag</th><th>Utbytte</th><th>Skattepliktig</th><th>Framført ut</th></tr>
<tr><td>1</td><td class="n">25 000</td><td class="n">750,00</td><td class="n">0</td><td class="n">750,00</td><td class="n">1 000</td><td class="n">250,00</td><td class="n">0</td></tr>
<tr><td>2</td><td class="n">25 000</td><td class="n">750,00</td><td class="n">0</td><td class="n">750,00</td><td class="n">300</td><td class="n">0</td><td class="n">450,00</td></tr>
<tr><td>3</td><td class="n">25 450</td><td class="n">763,50</td><td class="n">450,00</td><td class="n">1 213,50</td><td class="n">1 500</td><td class="n">286,50</td><td class="n">0</td></tr></table>
<p>År 1: utbyttet dekker hele fradraget på 25 000 × 3 % = 750, så ingenting framføres. År 2: 300 − 750 &lt; 0, så skattepliktig utbytte er 0 og 750 − 300 = 450 framføres.</p><p>År 3: grunnlaget er 25 000 + 450 = 25 450. Årets fradrag: 25 450 × 3 % = 763,50. Samlet fradrag: 763,50 + 450 = 1 213,50. Skattepliktig utbytte: 1 500 − 1 213,50 = <b>kr 286,50</b>.</p>`,
      check: `<p>Samlet fradrag i år 3 en annen vei: den framførte skjermingen forrentes, 450 × 1,03 = 463,50, mens kostprisen gir 25 000 × 3 % = 750. Sum 1 213,50. Delene summerer også over tre år: utbyttene er 1 000 + 300 + 1 500 = 2 800, skattepliktig er 250 + 0 + 286,50 = 536,50 og brukt skjerming 750 + 300 + 1 213,50 = 2 263,50. 536,50 + 2 263,50 = 2 800.</p>`,
      traps: [
        null,
        "La den framførte skjermingen til grunnlaget, men trakk den ikke fra: 1 500 − 763,50 = 736,50.",
        "Svarte med eierskatten i stedet for skattepliktig utbytte: 286,50 × 37,84 % = 108,41. Spørsmålet ber om grunnlaget.",
        "Trakk fra den framførte skjermingen, men la den ikke til grunnlaget: 1 500 − 750 − 450 = 300,00.",
      ],
    },
    {
      id: "aksjonaer-11",
      title: "Eksamensnivå: gevinst etter flere år, solgt før årsskiftet",
      theory: `<p>Den tyngste varianten bygger først opp den ubenyttede skjermingen over flere år og selger så aksjen før årsskiftet. H2022 oppgave 1, spørsmål 6, var bygget slik og ga tre poeng; H2024 oppgave 2 og H2025 oppgave 10 er den korte formen. Skjerming som ikke ble brukt, legges til grunnlaget og framføres. Salgsåret gir ingen ny skjerming, fordi du ikke eier aksjen 31. desember. Til slutt trekkes all framført skjerming fra gevinsten. Resten oppjusteres én gang.</p>
<div class="formula"><div class="eq">Ubenyttet ved salg = framført skjerming fra årene du eide aksjen 31.12</div><div class="eq">Skatt = (salgssum − kostpris − ubenyttet) × t<sub>e</sub></div><div class="where">I salgsåret regnes ingen skjerming. Renten for salgsåret står ofte i oppgaven bare for å friste.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Kostpris kr 10 000. År 1: rente 2 %, utbytte 50. År 2: rente 3 %, ingen utbytte. Solgt i oktober år 3 for kr 12 000.</p><p>År 1: fradrag 200, framført 200 − 50 = 150. År 2: grunnlag 10 150, fradrag 304,50, framført 150 + 304,50 = 454,50. År 3: ingen skjerming. Gevinst: 12 000 − 10 000 − 454,50 = 1 545,50. Skatt: 1 545,50 × 37,84 % = <b>kr 584,82</b>.</p></div>`,
      q: `<p>Hilde kjøpte en aksjepost i januar år 1 for kr 600 000, som er kostprisen. Hun mottok kr 6 000 i utbytte i år 1. Selskapet betalte ikke utbytte i år 2 eller år 3. Hun eide posten ved utgangen av år 1 og år 2. Den 1. november i år 3 solgte hun hele posten for kr 700 000. Skjermingsrenten var 3 % i år 1, 4 % i år 2 og 5 % i år 3 [eksempeltall]. Oppjusteringsfaktoren er 1,72 og skatten på alminnelig inntekt 22 % [dagens regel]. Hvor mye skatt betaler Hilde på gevinsten? Benytt to desimaler.</p>`,
      options: ["kr 24 035,97", "kr 24 217,60", "kr 37 840,00", "kr 11 993,77"],
      answer: 0,
      solution: `<table class="data"><tr><th>År</th><th>Grunnlag S</th><th>Årets fradrag</th><th>Framført inn</th><th>Utbytte</th><th>Framført ut</th></tr>
<tr><td>1</td><td class="n">600 000</td><td class="n">18 000</td><td class="n">0</td><td class="n">6 000</td><td class="n">12 000</td></tr>
<tr><td>2</td><td class="n">612 000</td><td class="n">24 480</td><td class="n">12 000</td><td class="n">0</td><td class="n">36 480</td></tr>
<tr><td>3</td><td>solgt før 31.12</td><td class="n">0</td><td class="n">36 480</td><td class="n">0</td><td>brukes mot gevinsten</td></tr></table>
<p>År 1: 600 000 × 3 % = 18 000. Utbyttet bruker 6 000, så 12 000 framføres.</p><p>År 2: grunnlaget er 600 000 + 12 000 = 612 000. Fradrag: 612 000 × 4 % = 24 480. Ingen utbytte, så framført skjerming blir 12 000 + 24 480 = 36 480.</p><p>År 3: ingen skjerming, siden Hilde ikke eier posten 31. desember. Gevinst: 700 000 − 600 000 − 36 480 = 63 520. Oppjustert: 63 520 × 1,72 = 109 254,40. Skatt: 109 254,40 × 22 % = <b>kr 24 035,97</b>.</p>`,
      check: `<p>La grunnlaget vokse fra år 2: 612 000 × 1,04 = 636 480. Minus kostprisen gir 36 480, den samme framførte skjermingen. Oppjuster satsen i stedet for grunnlaget: 63 520 × 37,84 % = 24 035,97.</p>`,
      traps: [
        null,
        "La ikke den ubenyttede skjermingen til grunnlaget i år 2: 12 000 + 600 000 × 4 % = 36 000, gevinst 64 000 og skatt 64 000 × 37,84 % = 24 217,60.",
        "Glemt den ubenyttede skjermingen: (700 000 − 600 000) × 37,84 % = 37 840,00.",
        "Ga skjerming også for salgsåret: 636 480 × 5 % = 31 824, gevinst 63 520 − 31 824 = 31 696 og skatt 31 696 × 37,84 % = 11 993,77. Hilde eier ikke posten 31. desember i år 3.",
      ],
    },
  ],
});
