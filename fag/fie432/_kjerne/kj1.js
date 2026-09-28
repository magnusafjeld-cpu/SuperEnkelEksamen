/* kj1 · Skattesystemet og effektiv skatt */
window.EDU_DATA.kjerne.push({
  id: "kj1",
  num: 1,
  title: "Skattesystemet og effektiv skatt",
  chapters: [1, 2],
  html: `
<p class="lead-in">Effektiv skattesats og gjennomsnittsskatt er testet i sju av ni gamle sett: progressivitet i H2024 oppgave 4, trinnskatt i H2024 oppgave 5, effektiv sats med avskrivning i H2025 oppgave 5. De to vanlige feilene, marginalsatsen på hele inntekten og feil nevner, har alltid sitt eget svaralternativ.</p>
<h3>Satsene og de to grunnlagene</h3>
<p>En lønn treffes av tre skatter med to grunnlag. Trygdeavgiften og trinnskatten regnes av <b>personinntekten</b>, altså brutto lønn. 22-prosenten regnes av <b>alminnelig inntekt</b>: all inntekt minus alle fradrag, for en lønnstaker minstefradraget og personfradraget. Satsene, [dagens regel] for 2026:</p>
<table class="data">
<tr><th>Størrelse</th><th>Sats</th><th>Grense (kr)</th></tr>
<tr><td>Alminnelig inntekt</td><td class="n">22 %</td><td></td></tr>
<tr><td>Trygdeavgift, lønn</td><td class="n">7,6 %</td><td class="n">nedre grense 99 650</td></tr>
<tr><td>Trinnskatt, trinn 1 til 5</td><td class="n">1,7 · 4,0 · 13,7 · 16,8 · 17,8 %</td><td class="n">fra 226 100 · 318 300 · 725 050 · 980 100 · 1 467 200</td></tr>
<tr><td>Personfradrag</td><td></td><td class="n">114 540</td></tr>
<tr><td>Minstefradrag i lønn</td><td class="n">46 %</td><td class="n">maks 95 700</td></tr>
<tr><td>Høyeste marginalskatt på lønn</td><td class="n">47,4 %</td><td class="n">22 + 7,6 + 17,8</td></tr>
</table>
<div class="formula">
<div class="eq">T(Y) = 22 % × (Y − minstefradrag − personfradrag) + 7,6 % × Y + Σ sats<sub>i</sub> × (inntekt inne i trinn i)</div>
<div class="eq">Kortform: T(Y) = 29,6 % × Y − 22 % × (samlede fradrag) + trinnskatt</div>
<div class="where">Y er brutto lønn. Hver trinnsats gjelder bare inntekten <i>inne i</i> trinnet. Kortformen slår sammen 22 % og 7,6 %, som begge treffer lønnen, og er kontrollen.</div>
</div>
<div class="callout mech"><span class="h">Hvorfor er et fradrag nesten alltid verdt 22 øre per krone?</span>Fradragene trekkes bare fra alminnelig inntekt, aldri fra grunnlaget for trygdeavgift og trinnskatt. Et ekstra fradrag senker derfor bare 22-prosenten, uansett hvor høy marginalskatten din er.</div>
<h3>Gjennomsnittsskatt og progressivitet</h3>
<p>Marginalskatten er ΔT/ΔY, skatten på den neste kronen. Gjennomsnittsskatten er t̄ = T(Y)/Y, andelen av inntekten som går til skatt; med brutto inntekt i nevneren er den effektiv skattesats. Systemet er <b>progressivt</b> når t̄ stiger med inntekten, proporsjonalt når den er konstant, regressivt når den faller. Det er andelen som avgjør: en flat sats tar flest kroner fra den som tjener mest, og er likevel ikke progressiv (H2024 oppgave 4a).</p>
<div class="formula">
<div class="eq">Flat sats t med bunnfradrag B: t̄(Y) = t × (1 − B/Y)</div>
<div class="eq">t̄(Y<sub>høy</sub>) − t̄(Y<sub>lav</sub>) = t × B × (1/Y<sub>lav</sub> − 1/Y<sub>høy</sub>)</div>
<div class="where">Med B = 0 er t̄ konstant. Med B &gt; 0 stiger t̄ med Y, fordi B/Y faller. Avstanden er proporsjonal med B: firedobles bunnfradraget, firedobles avstanden (H2024 oppgave 4c).</div>
</div>
<div class="callout mech"><span class="h">Hvorfor gjør et bunnfradrag en flat sats progressiv?</span>Fradraget er samme kronebeløp for alle, men en større andel av en liten inntekt: 50 er 10 % av 500 og 5 % av 1 000 [eksempeltall]. Den som tjener minst, betaler derfor den laveste andelen, og forskjellen vokser med fradraget.</div>
<div class="worked"><span class="wh">Gjennomregnet: gjennomsnittsskatt trinn for trinn (H2024 oppgave 5)</span>
<p>[Eksempeltall]: 12 % på inntekt under 100 000, 18 % mellom 100 000 og 350 000, 28 % over 350 000. Individ A har kr 450 000, individ X kr 380 000.</p>
<p><b>Steg 1: de nederste trinnene, like for begge.</b> 12 % × 100 000 + 18 % × 250 000 = 12 000 + 45 000 = 57 000.</p>
<p><b>Steg 2: toppsjiktet.</b> A: 28 % × 100 000 = 28 000. X: 28 % × 30 000 = 8 400.</p>
<p><b>Steg 3: snittet.</b> A: 85 000/450 000 = <b>18,9 %</b>. X: 65 400/380 000 = 17,2105 %, altså <b>17,2 %</b>.</p>
<p><b>Kontroll:</b> hele inntektsforskjellen på 70 000 ligger i toppsjiktet: 28 % × 70 000 = 19 600 = 85 000 − 65 400. ✓ Ved 350 000 er snittet 57 000/350 000 = 16,29 %, så begge svarene må ligge over det.</p>
<p><b>De gale tallene:</b> 28 % på alt gir 28,0 % for begge. Toppsjiktet glemt gir 57 000/380 000 = 15,0 % for X. 18 % på hele inntekten opp til 350 000 gir (63 000 + 8 400)/380 000 = 18,8 %. Veiledningen skriver 17,1 %; alternativet 17,2 % stemmer.</p>
</div>
<h3>Effektiv skattesats</h3>
<div class="formula">
<div class="eq">Effektiv skattesats = betalt skatt / brutto inntekt</div>
<div class="eq">Eierens: t<sub>eff</sub> = (α × selskapets skatt + eierens skatt) / (α × selskapets bruttoinntekt + eierens andre inntekter)</div>
<div class="where">α er eierandelen. Delt på skattepliktig inntekt overser brøken fradragene; med en flat sats gir den bare satsen tilbake. For en eier hører selskapets skatt og overskudd med, fordi tilbakeholdt overskudd er eierens formue enten det tas ut eller ikke.</div>
</div>
<p>Avskrivninger senker den effektive satsen (H2025 oppgave 5). Driftsinntekter kr 100 000 og avskrivning kr 25 000 gir skatt 22 % × 75 000 = 16 500, altså 16 500/100 000 = <b>16,5 %</b>. Fellen er 16 500/75 000 = 22,0 %; hele maskinen på kr 50 000 ført i år 1 gir 11,0 %. Et heleid selskap som tjener kr 1 000 000 og ikke deler ut, gir eieren en effektiv sats på 22 %, men null inntekt og null skatt på skattemeldingen.</p>
<h3>Rente mot aksjegevinst, og fradragets tidsverdi</h3>
<p>Aksjegevinst og utbytte er alt skattlagt én gang i selskapet: samlet 22 % + 78 % × 37,84 % = <b>51,52 %</b>, som skal ligne toppskatten på lønn (kj2). For deg som sparer:</p>
<div class="formula">
<div class="eq">r<sub>etter</sub> = r(1 − t) for renter · r(1 − t<sub>e</sub>) for utbytte og aksjegevinst</div>
<div class="eq">Indifferanse: r<sub>aksje</sub>/r<sub>rente</sub> = (1 − t)/(1 − t<sub>e</sub>) = 0,78/0,6216 = 1,2548</div>
<div class="where">t = 22 % og t<sub>e</sub> = 37,84 % [dagens regel]. Kr 100 000 i renter gir 78 000 etter skatt, like mye som en aksjegevinst på 100 000 × 0,78/0,6216 = kr 125 483. Skatt opp virker som rente ned.</div>
</div>
<p><b>Realavkastning.</b> Totalavkastning er kursgevinst pluss det som kom inn underveis, (P<sub>1</sub> − P<sub>0</sub> + Y<sub>1</sub>)/P<sub>0</sub>. Rekkefølgen er nominelt, så etter skatt, så realt: r<sub>etter</sub> = (1 + i(1 − t))/(1 + π) − 1, der i er nominell rente og π inflasjonen; r ≈ i − π er bare en tilnærming. Med i = 5 % og π = 3 % [eksempeltall] gir det 1,039/1,03 − 1 = 0,87 % etter skatt, mot 1,94 % før skatt. Superprofitt er avkastningen ut over risikofri rente (tremåneders statskasseveksel), r − r<sub>f</sub>, med begge i samme enhet. Gjennomsnittlig årlig vekst er (W<sub>T</sub>/W<sub>0</sub>)<sup>1/T</sup> − 1 med T lik antall år, og sparer du S i året i T år til r, blir sluttverdien S × [(1 + r)<sup>T</sup> − 1]/r.</p>
<p>Et fradrag er en skattebesparelse, fradraget × satsen, og diskonteres som en kontantstrøm. Så lenge renten er positiv, satsen er lik og det finnes inntekt å trekke det fra, er det best å ta det med en gang (H2024 oppgave 3: 22 000 nå mot 13 518 fordelt over ti år ved 10 %).</p>
<div class="callout warn"><span class="h">Feilene som koster poeng</span>Toppsatsen brukt på hele inntekten. Skatten delt på skattepliktig inntekt, som overser fradragene. «Progressivt» fordi de rike betaler flest kroner. For eieren: selskapets skatt og overskudd glemt, eller tatt med i sin helhet i stedet for med eierandelen.</div>
<div class="callout tip husk"><span class="h">Må kunne</span>
<ul><li>Effektiv skattesats = betalt skatt / brutto inntekt, med skatten regnet trinn for trinn (hver sats bare på inntekten inne i trinnet). Delt på skattepliktig inntekt overser den fradragene; med en flat sats gir den bare satsen tilbake.</li>
<li>Progressivt betyr stigende gjennomsnittsskatt. Flat sats t med bunnfradrag B gir gjennomsnittsskatt t × (1 − B/Y) ved inntekt Y; avstanden mellom to inntekter er proporsjonal med B.</li>
<li>Eierens effektive sats med eierandel α: (α × selskapets skatt + egen skatt) / (α × selskapets bruttoinntekt + andre inntekter). Avskrivninger senker den under den nominelle satsen.</li>
<li>2026 [dagens regel]: 22 % på alminnelig inntekt; trygdeavgift 7,6 % og trinnskatt av brutto lønn; toppmarginalskatt 47,4 %. Et fradrag er verdt 22 øre per krone når det er inntekt å trekke det fra.</li>
<li>Renter skattlegges med 22 %, aksjegevinst med 37,84 %: kr 100 000 i renter gir like mye etter skatt som kr 125 483 i aksjegevinst (0,78/0,6216).</li>
<li>Realavkastning etter skatt med nominell rente i og inflasjon π: (1 + i(1 − t))/(1 + π) − 1, i rekkefølgen nominelt, skatt, realt. Et fradrag tas så tidlig som inntekten tillater, fordi en krone spart i dag er verdt mer.</li></ul></div>
`,
  checks: [
    {
      id: "kj1-s1",
      q: "En flat skatt på 25 % har et bunnfradrag på kr 100 000 [eksempeltall]. Bunnfradraget dobles til kr 200 000. Hva skjer med progressiviteten?",
      options: [
        "Den blir sterkere, fordi avstanden i gjennomsnittsskatt dobles",
        "Den er uendret, fordi alle sparer det samme kronebeløpet, kr 25 000",
        "Den blir svakere, fordi alle nå betaler en lavere andel av inntekten",
        "Den er uendret, fordi hver krone over fradraget fortsatt skattlegges med 25 %",
      ],
      answer: 0,
      explanation: "For inntekter over begge fradragene er avstanden i gjennomsnittsskatt t × B × (1/Y<sub>lav</sub> − 1/Y<sub>høy</sub>), proporsjonal med bunnfradraget B, så en dobling dobler den. Det fristende svaret om like mange kroner overser at 25 000 er en større andel av en liten inntekt enn av en stor, og det er andelen progressivitet måler.",
    },
    {
      id: "kj1-s2",
      q: "Et selskap betaler flat 22 % av skattepliktig overskudd og har store avskrivninger. Hvorfor måles den effektive skattesatsen som betalt skatt delt på <i>brutto</i> inntekt, og ikke på skattepliktig inntekt?",
      options: [
        "Fordi skattepliktig inntekt gir en lavere sats, som undervurderer skatten når fradragene er store",
        "Fordi selskapsskatten regnes av brutto inntekt, og nevneren må ha samme grunnlag",
        "Det spiller liten rolle: de to målene gir samme rangering av selskapene",
        "Fordi delt på skattepliktig gir 22 % tilbake, uansett hvor mye fradrag som er brukt",
      ],
      answer: 3,
      explanation: "Skatt delt på skattepliktig inntekt gir satsen tilbake: 16 500/75 000 = 22 % også når avskrivningen har tatt en firedel av grunnlaget. Målet skal fange at fradrag gjør den faktiske skatten lavere, så nevneren må være brutto. Svaret om en lavere sats har retningen snudd: skattepliktig inntekt er den minste nevneren og gir den høyeste satsen.",
    },
    {
      id: "kj1-s3",
      q: "Et selskap kan utgiftsføre kr 100 000 i år eller avskrive kr 20 000 i året i fem år. Det har inntekt å trekke fradraget fra hvert år, satsen er 22 % hele tiden, og renten er positiv. Hva er best?",
      options: [
        "Det spiller ingen rolle, fordi besparelsen er kr 22 000 i begge tilfeller",
        "Utgiftsføre i år: like mange kroner, men de kommer tidligere",
        "Avskrive over fem år, fordi fradraget da gir en skattebesparelse hvert år",
        "Avskrive over fem år, fordi senere besparelser er verdt mer når renten er høy",
      ],
      answer: 1,
      explanation: "Kronene er de samme, 22 000 i begge tilfeller, så det er bare tidspunktet som skiller, og med positiv rente er en besparelse i dag verdt mer enn den samme besparelsen senere. «Det spiller ingen rolle» sammenligner udiskonterte kroner og er riktig bare når renten er null. Konklusjonen hviler på at det finnes inntekt å trekke fradraget fra og at satsen er lik over tid.",
    },
  ],
  case: {
    id: "kj1-m1",
    topic: "Trinnskatt, eierens effektive sats og rente mot aksjefond",
    minutes: 10,
    body: `<p><b>Eva</b> skattlegges i et forenklet trinnsystem [eksempeltall]: 8 % av skattepliktig inntekt opp til kr 150 000, 20 % av inntekten mellom kr 150 000 og kr 400 000, og 32 % av inntekten over kr 400 000. Eva har kr 560 000 i brutto inntekt og kr 60 000 i fradrag, så den skattepliktige inntekten er kr 500 000. Effektiv skattesats er betalt skatt delt på brutto inntekt.</p>
<p><b>Tor</b> eier 50 % av Tor AS. I år har selskapet driftsinntekter på kr 1 200 000, avskrivninger på kr 200 000 og ingen andre kostnader. Selskapet betaler 22 % selskapsskatt og deler ut kr 300 000 i utbytte, så Tor får kr 150 000. Eierskatten er 37,84 % [dagens regel]; se bort fra skjerming og personfradrag. Tor har ingen andre inntekter. Eierens effektive skattesats regnes slik kurset gjør: eierandelen av selskapets skatt pluss eierens egen skatt, delt på eierandelen av selskapets driftsinntekter pluss eierens andre inntekter. Utbyttet er en del av selskapets inntekt og telles ikke en gang til.</p>
<p>Tor har også sparepenger. Banken gir 4,5 % rente, skattlagt med 22 %. Et aksjefond skattlegges med 37,84 % av hele avkastningen [dagens regel; se bort fra skjermingsfradraget].</p>`,
    ledd: [
      {
        id: "kj1-m1a",
        points: 3,
        q: `<p>Hva er Evas effektive skattesats? Rund av til to desimaler.</p>`,
        options: ["18,80 %", "28,57 %", "20,21 %", "16,79 %"],
        answer: 3,
        solution: `<p><b>Steg 1: skatten trinn for trinn, av skattepliktig inntekt.</b> 8 % × 150 000 = 12 000. 20 % × 250 000 = 50 000. 32 % × 100 000 = 32 000. Sum: <b>94 000</b>.</p><p><b>Steg 2: effektiv sats, med brutto inntekt i nevneren.</b> 94 000/560 000 = <b>16,79 %</b>.</p><p><b>Kontroll:</b> regn som om alt var skattlagt med toppsatsen, og trekk fra det de lavere trinnene sparer: 32 % × 500 000 − 24 % × 150 000 − 12 % × 250 000 = 160 000 − 36 000 − 30 000 = 94 000. ✓</p>`,
        traps: [
          "Riktig skatt, men delt på skattepliktig inntekt i stedet for brutto: 94 000/500 000 = 18,80 %.",
          "Toppsatsen brukt på hele den skattepliktige inntekten: 32 % × 500 000 = 160 000, og 160 000/560 000 = 28,57 %.",
          "Fradragene glemt, så trinnene er brukt på brutto inntekt: 12 000 + 50 000 + 32 % × 160 000 = 113 200, og 113 200/560 000 = 20,21 %.",
          null,
        ],
      },
      {
        id: "kj1-m1b",
        points: 3,
        q: `<p>Hva er Tors effektive skattesats? Rund av til to desimaler.</p>`,
        options: ["23,06 %", "33,35 %", "27,79 %", "37,84 %"],
        answer: 2,
        solution: `<p><b>Steg 1: selskapets skatt.</b> (1 200 000 − 200 000) × 22 % = 220 000. Tors halvpart: <b>110 000</b>.</p><p><b>Steg 2: Tors egen skatt.</b> 150 000 × 37,84 % = <b>56 760</b>.</p><p><b>Steg 3: brøken.</b> Teller 110 000 + 56 760 = 166 760. Nevner 50 % × 1 200 000 = 600 000. 166 760/600 000 = <b>27,79 %</b>.</p><p><b>Kontroll:</b> del opp per krone driftsinntekt. Selskapsskatten er 220 000/1 200 000 = 18,33 %, og Tors egen skatt er 56 760/600 000 = 9,46 % av hans andel. 18,33 % + 9,46 % = 27,79 %. ✓</p>`,
        traps: [
          "Eierandelen glemt: hele selskapets skatt pluss Tors skatt over hele selskapets driftsinntekter, (220 000 + 56 760)/1 200 000 = 23,06 %.",
          "Nevneren er Tors andel av det skattepliktige overskuddet i stedet for driftsinntektene: 166 760/500 000 = 33,35 %.",
          null,
          "Bare det skattemeldingen viser: 56 760/150 000 = 37,84 %. Selskapets skatt og overskudd er utelatt.",
        ],
      },
      {
        id: "kj1-m1c",
        points: 3,
        q: `<p>Hvor høy avkastning før skatt må aksjefondet gi for at Tor skal sitte igjen med like mye etter skatt som i banken? Rund av til to desimaler.</p>`,
        options: ["3,51 %", "7,24 %", "3,59 %", "5,65 %"],
        answer: 3,
        solution: `<p><b>Steg 1: banken etter skatt.</b> 4,5 % × (1 − 22 %) = 4,5 % × 0,78 = <b>3,51 %</b>.</p><p><b>Steg 2: fondet må gi det samme etter 37,84 %.</b> r × 0,6216 = 3,51 %, så r = 3,51 %/0,6216 = 5,6467 %, altså <b>5,65 %</b>.</p><p><b>Kontroll:</b> forholdet 5,6467/4,5 = 1,2548, som er 0,78/0,6216, indifferansen mellom rente og aksjeavkastning. ✓</p>`,
        traps: [
          "Bankrenten etter skatt: 4,5 % × 0,78 = 3,51 %. Det er det fondet må gi <i>etter</i> skatt, ikke før.",
          "Glemt at bankrenten også skattlegges: 4,5 %/0,6216 = 7,24 %.",
          "Brøken snudd: 4,5 % × 0,6216/0,78 = 3,59 %, som gir fondet et lavere krav enn banken selv om det skattlegges hardere.",
          null,
        ],
      },
    ],
  },
});
