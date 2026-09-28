/* kj10 · Lån */
window.EDU_DATA.kjerne.push({
  id: "kj10",
  num: 10,
  title: "Lån",
  chapters: [16],
  html: `
<p class="lead-in">Lån er én formel og noen få regler. H2022 oppgave 6 (9 % av poengene) spurte om terminbeløp, effektiv rente og kredittkostnad på ett billån, H2020 oppgave 4 og H2021 oppgave 5 om lånetaket, og H2024 oppgave 14 om avdragsfrihet.</p>

<h3>Annuitet, serielån og rentefradraget</h3>
<p>Et annuitetslån har fast terminbeløp A. Renten på restgjelden betales først, resten er avdrag:</p>
<div class="formula"><div class="eq">A = L × m/(1 − (1 + m)<sup>−n</sup>) · rente<sub>t</sub> = restgjeld<sub>t−1</sub> × m · sum renter = n × A − L</div>
<div class="where">L er lånet, m renten per termin og n antall terminer; månedlig betyr m = r/12 og n = år × 12. A er aldri under L/n, avdraget alene.</div>
<div class="eq">Serielån: avdrag = L/n hver termin · sum renter = m × L × (n + 1)/2</div>
<div class="where">Terminbeløpet faller med restgjelden, og rentesummen er lavere fordi gjelden er mindre.</div>
<div class="eq">Rentekostnad etter skatt = renter × (1 − t)</div>
<div class="where">t = 22 % [dagens regel]: renter trekkes fra i alminnelig inntekt, så fradraget er 22 øre per krone uansett marginalskatt; avdrag gir ikke fradrag.</div></div>
<div class="callout mech"><span class="h">Hvorfor er rentene første år lavere enn r × L med månedlige terminer?</span>Renten regnes av det som står ubetalt. Bare første termin forrenter hele lånet; med én årlig termin er første års rente derfor nøyaktig r × L, men med månedlige terminer krymper hvert avdrag grunnlaget for neste rente allerede i løpet av året. r × L er da renten på et lån som aldri nedbetales.</div>

<div class="worked"><span class="wh">Gjennomregnet: terminbeløp og rentefradrag første år</span>
<p>Lån kr 3 000 000 til 5,0 % [eksempeltall] over 25 år, månedlige terminer, t = 22 %.</p>
<p><b>Steg 1: terminstørrelsene.</b> m = 5 %/12 = 0,416667 % og n = 300.</p>
<p><b>Steg 2: terminbeløpet.</b> 3 000 000 × 0,416667 % = 12 500, og 1 − 1,00416667<sup>−300</sup> = 0,712750, så A = 12 500/0,712750 = <b>17 537,70</b>.</p>
<p><b>Steg 3: rentene første år.</b> Restgjelden etter tolv terminer er nåverdien av de 288 som gjenstår, 2 938 143, så avdragene er 61 857. Rentene er resten: 12 × 17 537,70 − 61 857 = 210 452 − 61 857 = <b>148 595</b>.</p>
<p><b>Steg 4: fradraget.</b> 148 595 × 22 % = <b>32 691</b>; nettokostnaden er 148 595 × 78 % = 115 904.</p>
<p><b>Kontroll:</b> 17 537,70 × 171,06 (annuitetsfaktoren) ≈ 3 000 000 ✓, og rentene ligger under 5 % × 3 000 000 = 150 000 ✓.</p>
<p><b>De gale tallene:</b> renter av hele lånet gir fradrag 150 000 × 22 % = 33 000; fradrag av hele terminbeløpet gir 12 × 17 537,70 × 22 % = 46 300; årsannuiteten delt på tolv gir A = 17 738,11.</p></div>

<h3>Effektiv rente</h3>
<p>Effektiv rente er internrenten i det du faktisk mottar og betaler:</p>
<div class="formula"><div class="eq">L − etableringsgebyr = Σ<sub>t</sub> (A + termingebyr)/(1 + r<sub>eff</sub>)<sup>t</sup> · uten gebyrer: r<sub>eff</sub> = (1 + r/k)<sup>k</sup> − 1</div>
<div class="where">k er terminer per år. Internrenten løses ikke eksplisitt: sett alternativene inn baklengs. I H2022 oppgave 6 ga begge gebyrene 5,94 %, termingebyret alene 5,39 % og etableringsgebyret alene 5,54 %. Kredittkostnad er alle betalinger og gebyrer minus lånet, udiskontert.</div></div>

<h3>Utlånsforskriften</h3>
<p>Fire skranker, og den strengeste binder:</p>
<div class="formula"><div class="eq">samlet gjeld ≤ 5 × brutto årsinntekt · lån ≤ 90 % av boligens verdi (egenkapital 10 %)</div>
<div class="eq">stresstest: tåle renten + 3 prosentpoeng, minst 7 % · avdrag minst 2,5 % i året (eller som i et annuitetslån over 30 år) over 60 % belåningsgrad</div>
<div class="where">[Dagens regel fra 2025; egenkapitalkravet var 15 % til og med 2024.] Studielån og billån teller i samlet gjeld. Betjeningsevnen er det du har til renter og avdrag etter skatt og forbruk. Stresstest: maks lån = betjeningsevne × annuitetsfaktor over 30 år ved stresset rente; H2020 og H2021 la på 5 prosentpoeng, så bruk oppgavens påslag.</div></div>

<h3>Avdragsfrihet og fast rente</h3>
<p>Avdragsfrihet betyr bare renter en periode. Hovedstolen står, så du betaler flere kroner i renter (92 852 kr mer for to år på lånet over, med samme sluttdato), men diskontert med lånerenten koster det det samme. Ordningen kjøper likviditet ved midlertidige problemer som permittering, der alternativet er dyrere kreditt. Fast rente er en forsikring mot renteoppgang, ikke et veddemål. Betal ned dyreste lån først.</p>

<div class="callout warn"><span class="h">Feil som koster poeng</span>Fradrag med marginalskatten i stedet for 22 %. Effektiv rente som nominell rente pluss gebyrprosent. Kredittkostnad uten å trekke fra lånet. Studielånet glemt i femgangeren. «Avdragsfrihet er rentefritt.»</div>

<div class="callout tip husk"><span class="h">Må kunne</span>
<ul><li>Annuitet: A = L × m/(1 − (1 + m)<sup>−n</sup>), der L er lånet, m renten per termin og n antall terminer (månedlig: m = r/12, n = år × 12).</li>
<li>Rentene i et år er betalt beløp minus avdrag. Med månedlige terminer faller saldoen gjennom året, så rentene blir lavere enn rentesatsen ganger lånet; med én årlig termin er første års rente nøyaktig r × L. Fradraget er renter × 22 %.</li>
<li>Effektiv rente er internrenten der lånet minus etableringsgebyret er lik nåverdien av terminbeløp pluss termingebyr. Sum renter på et annuitetslån er n × A − L; kredittkostnaden er alt som betales, gebyrer medregnet, minus lånet, udiskontert.</li>
<li>Utlånsforskriften [dagens regel]: samlet gjeld høyst 5 × brutto inntekt, lån høyst 90 % av boligverdien, stresstest med renten + 3 prosentpoeng (minst 7 %), regnet over 30 år med mindre oppgaven sier noe annet; lånetaket er den laveste skranken.</li>
<li>Avdragsfrihet (bare renter en periode) gir flere kroner i renter, men samme nåverdi ved lånerenten; den kjøper likviditet.</li></ul></div>
`,
  checks: [
    {
      id: "kj10-s1",
      q: "Et annuitetslån har både etableringsgebyr og termingebyr. Hvordan finner du den effektive renten?",
      options: [
        "Legg gebyrene sammen, del på lånebeløpet og legg prosenten til den nominelle renten",
        "Renten der lånet minus etableringsgebyret er lik nåverdien av terminbeløp og termingebyr",
        "Renten der hele lånebeløpet, som du betaler renter av, er lik nåverdien av terminbeløp og termingebyr",
        "Regn om den nominelle renten med (1 + r/k)<sup>k</sup> − 1, fordi gebyrer ikke er renter",
      ],
      answer: 1,
      explanation: "Effektiv rente er internrenten i kontantstrømmen du faktisk får: etableringsgebyret tas i år 0 og reduserer det du mottar, termingebyret legges på hver betaling. Å legge gebyrprosenten på den nominelle renten overser når gebyrene betales, og gir systematisk feil tall. Å sette hele lånebeløpet på venstre side glemmer at etableringsgebyret trekkes fra det du mottar i år 0, og undervurderer renten.",
    },
    {
      id: "kj10-s2",
      q: "Ola har brutto årsinntekt kr 600 000, studielån kr 400 000 og billån kr 150 000. Hvor stort boliglån tillater gjeldsgradskravet alene?",
      options: [
        "Kr 3 000 000: kravet gjelder bare det nye boliglånet",
        "Kr 2 850 000: billånet teller, men ikke studielånet fra Lånekassen",
        "Kr 2 600 000: studielånet teller, men ikke billånet med pant i bilen",
        "Kr 2 450 000: all gjeld teller, så begge lånene trekkes fra",
      ],
      answer: 3,
      explanation: "Gjeldsgraden måler samlet gjeld mot fem ganger brutto inntekt, og studielån, billån og kredittkortramme teller med. 5 × 600 000 = 3 000 000, minus 400 000 og 150 000, gir 2 450 000. Svaret på 3 000 000 er den vanlige fellen: det glemmer at du allerede skylder penger.",
    },
    {
      id: "kj10-s3",
      q: "Du er permittert og får to års avdragsfrihet på boliglånet ditt, et annuitetslån. Hvilken påstand er riktig?",
      options: [
        "Du betaler mindre i renter i alt, fordi terminbeløpene er lavere de to årene",
        "Du betaler flere kroner i renter, men ikke mer i nåverdi ved lånerenten",
        "Staten dekker avdragene de to årene, så gjelden blir like liten som ellers",
        "Kostnaden er den samme i nåverdi, så ordningen er verdiløs for alle",
      ],
      answer: 1,
      explanation: "Hovedstolen står uendret i to år, så renten løper på et større lån lenger: flere kroner i renter, men diskontert med lånerenten er betalingsstrømmen verdt det samme. Påstanden om at ordningen er verdiløs trekker feil slutning fra samme nåverdi: likviditet er verdt noe når alternativet er dyrere kreditt. At avdragsfrihet kan være lurt ved midlertidige likviditetsproblemer, var riktig svar i H2024 oppgave 14. Staten har ingen rolle utover rentefradraget.",
    },
  ],
  case: {
    id: "kj10-m1",
    topic: "Lånetak, renter etter skatt og effektiv rente",
    minutes: 10,
    body: `<p>Lina har brutto årsinntekt kr 760 000 og et studielån på kr 200 000, og vil kjøpe en leilighet til kr 4 400 000. Banken regner at 38 % av bruttoinntekten, kr 288 800 i året, kan gå til renter og avdrag på boliglånet, og lånerenten er 4,5 % nominelt [eksempeltall]. Skattesatsen på alminnelig inntekt er 22 % [dagens regel].</p>
<p>Utlånsforskriften [dagens regel]: samlet gjeld høyst 5 × brutto årsinntekt; lånet høyst 90 % av boligens verdi; kunden må tåle renten pluss 3 prosentpoeng, men minst 7 %, regnet som et annuitetslån over 30 år med årlige terminer. Banken følger forskriften fullt ut.</p>
<table class="data"><tr><th>Rente</th><th class="n">4,5 %</th><th class="n">7,0 %</th><th class="n">7,5 %</th></tr>
<tr><td>Annuitetsfaktor, 30 år</td><td class="n">16,2889</td><td class="n">12,4090</td><td class="n">11,8104</td></tr></table>`,
    ledd: [
      {
        id: "kj10-m1a",
        points: 3,
        q: `<p>Hvor stort boliglån kan Lina maksimalt få?</p>`,
        options: ["Kr 3 410 844", "Kr 3 583 719", "Kr 3 600 000", "Kr 3 960 000"],
        answer: 0,
        solution: `<p>Regn hver skranke for seg; den laveste binder.</p><p><b>Steg 1: gjeldsgraden.</b> 5 × 760 000 = 3 800 000 i samlet gjeld. Studielånet teller med, så boliglånet kan være 3 800 000 − 200 000 = <b>3 600 000</b>.</p><p><b>Steg 2: belåningsgraden.</b> 90 % × 4 400 000 = <b>3 960 000</b>.</p><p><b>Steg 3: stresstesten.</b> 4,5 % + 3 prosentpoeng = 7,5 %, over gulvet på 7 %, så gulvet biter ikke. 288 800 × 11,8104 = <b>3 410 844</b>.</p><p><b>Steg 4: svaret.</b> Stresstesten er strengest: <b>kr 3 410 844</b>.</p><p><b>Kontroll:</b> snu stresstesten: 3 410 844/11,8104 = 288 800, nøyaktig betjeningsevnen ✓. Belåningsgraden blir 3 410 844/4 400 000 = 77,5 %, over 60 %, så avdragskravet gjelder.</p>`,
        traps: [
          null,
          "Stresset til gulvet på 7 % i stedet for renten pluss 3 prosentpoeng: 288 800 × 12,4090 = 3 583 719. Gulvet gjelder bare når renten pluss 3 prosentpoeng er under 7 %.",
          "Stresstesten glemt: ved dagens 4,5 % tåler hun 288 800 × 16,2889 = 4 704 234, og da ser gjeldsgraden, 3 800 000 − 200 000, ut til å binde.",
          "Belåningsgraden alene, 90 % × 4 400 000: egenkapitalkravet er bare én av tre skranker, og her binder det ikke.",
        ],
      },
      {
        id: "kj10-m1b",
        points: 3,
        q: `<p>Lina tar opp kr 3 400 000 som annuitetslån over 30 år med månedlige terminer til 4,5 %. Terminbeløpet er kr 17 227,30, og etter tolv terminer er restgjelden kr 3 345 150. Hva koster rentene henne det første året etter rentefradraget?</p>`,
        options: ["Kr 33 413", "Kr 118 465", "Kr 119 340", "Kr 161 248"],
        answer: 1,
        solution: `<p><b>Steg 1: avdragene første år.</b> 3 400 000 − 3 345 150 = <b>54 850</b>.</p><p><b>Steg 2: rentene.</b> Alt hun betaler minus avdragene: 12 × 17 227,30 − 54 850 = 206 727,60 − 54 850 = <b>151 877,60</b>. Renten regnes av saldoen som faller, så den blir lavere enn 4,5 % × 3 400 000 = 153 000.</p><p><b>Steg 3: etter skatt.</b> Fradraget er 151 877,60 × 22 % = 33 413, og nettokostnaden 151 877,60 × 78 % = <b>kr 118 465</b>.</p><p><b>Kontroll:</b> 33 413 + 118 465 = 151 878, rentene avrundet ✓. Første termin har rente 3 400 000 × 0,375 % = 12 750; tolv slike ville gitt 153 000, og rentene må ligge litt under ✓.</p>`,
        traps: [
          "Fradraget i stedet for nettokostnaden: 151 877,60 × 22 % = 33 413. Spørsmålet gjelder hva rentene koster etter fradraget.",
          null,
          "Renter av hele lånet i tolv måneder: 4,5 % × 3 400 000 × 78 % = 119 340. Bare første termin forrenter hele lånet.",
          "Hele terminbeløpet behandlet som rente: 12 × 17 227,30 × 78 % = 161 248. Avdragene på 54 850 er tilbakebetaling og gir ikke fradrag.",
        ],
      },
      {
        id: "kj10-m1c",
        points: 3,
        q: `<p>Lina kjøper også bil med et annuitetslån på kr 320 000 til nominell rente 5,8 % over 5 år, med årlige etterskuddsvise terminer [eksempeltall]. Etableringsgebyret er kr 4 800 og trekkes ved utbetalingen; termingebyret er kr 900 per termin. Terminbeløpet uten gebyrer er kr 75 553,99. Hva er den effektive renten?</p>`,
        options: ["5,80 %", "6,24 %", "6,36 %", "6,80 %"],
        answer: 3,
        solution: `<p><b>Steg 1: kontantstrømmen.</b> Hun mottar 320 000 − 4 800 = <b>315 200</b> i år 0 og betaler 75 553,99 + 900 = <b>76 453,99</b> i hvert av de fem årene.</p><p><b>Steg 2: prøv alternativene baklengs.</b> Effektiv rente er satsen der 315 200 er lik 76 453,99 × annuitetsfaktoren. Ved 6,80 % er faktoren over fem år 4,1222, og 315 200/4,1222 = 76 463, praktisk talt terminbeløpet (den eksakte internrenten er 6,7955 %). Ved 6,36 % er faktoren 4,1714, og 315 200/4,1714 = 75 562, under 76 453,99: renten må være høyere. Svaret er <b>6,80 %</b>.</p><p><b>Kontroll av størrelsen:</b> gebyrene er 4 800 + 5 × 900 = 9 300, altså 1 860 i året. Gjennomsnittlig restgjeld ved inngangen til de fem årene er 996 034/5 = 199 207, og 1 860/199 207 = 0,93 %. Effektiv rente må ligge nær 5,8 % + 0,9 prosentpoeng ✓.</p>`,
        traps: [
          "Den nominelle renten: gebyrene er ikke tatt med. Finnes det gebyrer, er effektiv rente alltid høyere.",
          "Bare termingebyret: internrenten av 320 000 mot 76 453,99 i fem år. Etableringsgebyret på 4 800 mangler.",
          "Bare etableringsgebyret: internrenten av 315 200 mot 75 553,99 i fem år. Termingebyrene mangler.",
          null,
        ],
      },
    ],
  },
});
