/* kj7 · Internasjonal skatt og exit-skatt */
window.EDU_DATA.kjerne.push({
  id: "kj7",
  num: 7,
  title: "Internasjonal skatt og exit-skatt",
  chapters: [13, 6],
  html: `
<div class="callout kort"><span class="h">Kort fortalt</span>Bor du i ett land og tjener penger i et annet, kan begge land kreve skatt av den samme inntekten. Skatteavtaler løser det på to måter: hjemlandet unntar inntekten, eller det gir fradrag (kredit) for skatten som er betalt ute. Delen viser hvordan du regner skatten under hver løsning og uten avtale. Den dekker også reglene for når du regnes som bosatt i Norge og exit-skatten du må betale når du flytter ut med urealiserte aksjegevinster.</div>

<p class="lead-in">Internasjonal skatt og exit-skatt tok 17 % av poengene i H2022 og 19 % i H2024 (oppgave 10). I H2025 var temaet borte, og 2026-planen har ingen gjesteforeleser i skatterett. Usikkert, men billig: tre regimer og noen exit-fakta.</p>

<h3>Bosted, globalskatteplikt og kilde</h3>
<p>Etter bostedsprinsippet skattlegger Norge hele inntekten til bosatte personer og hjemmehørende selskaper, uansett hvor den er tjent: globalskatteplikt. Etter kildeprinsippet skattlegger staten der inntekten er opptjent. Bosatt er du etter skatteloven § 2-1 ved opphold her i mer enn 183 dager i en tolvmånedersperiode eller mer enn 270 dager i en trettiseksmånedersperiode. Bostedet opphører først når du er her høyst 61 dager i året og verken du eller nærstående disponerer bolig her. Etter minst ti års bosted må det godtgjøres også for de tre neste årene: flytter du i 2022, er du skattyter til og med 2025 (H2022 oppgave 4). Er du bosatt i flere land etter hvert lands interne rett, avgjør skatteavtalen etter OECDs mønsteravtale artikkel 4, i fast rekkefølge: fast bolig, sentrum for livsinteressene, vanlig opphold, statsborgerskap. Et selskap stiftet i Norge forblir hjemmehørende her når det ikke finnes avtale (H2022 oppgave 4).</p>
<p>Kildestaten kan skattlegge et utenlandsk foretak bare over terskelen <b>fast driftssted</b>, et fast forretningssted virksomheten drives gjennom. Oppgaven sier om den er passert, og et fast driftssted ute fjerner aldri Norges rett.</p>

<h3>Unntak, kredit og ingen avtale</h3>
<p>Begge prinsippene treffer samme krone, og en skatteavtale fordeler retten på én av to måter:</p>
<div class="formula">
<div class="eq">Fullstendig unntak: T = t<sub>kilde</sub> × Y</div>
<div class="eq">Ordinær kredit: kreditfradrag = min(t<sub>kilde</sub> × Y ; t<sub>hjem</sub> × Y), så T = maks(t<sub>hjem</sub> ; t<sub>kilde</sub>) × Y</div>
<div class="eq">Ingen lettelse: T = (t<sub>hjem</sub> + t<sub>kilde</sub>) × Y</div>
<div class="where">Y er inntekten i kildestaten. Under unntak gir hjemstaten helt avkall, uansett om kildestaten skattlegger. Under kredit trekker hjemstaten kildeskatten fra i sin egen skatt, høyst med sin egen skatt på inntekten, så restskatten hjem blir aldri negativ. Uten avtale regner eksamenssettene med ingen lettelse (H2024 oppgave 10 forutsetter det). Loven er rausere: skatteloven § 16-20 gir kreditfradrag for utenlandsk skatt også uten avtale, så det blir ikke automatisk dobbeltbeskatning.</div></div>
<div class="callout mech"><span class="h">Hvorfor har kreditten et tak?</span>Kreditten er en lettelse i norsk skatt, ikke et tilskudd: uten tak ville statskassen dekket alt over 22 % for virksomhet i en stat med 60 % skatt. Under ordinær kredit ender du derfor alltid på den høyeste av satsene.</div>

<div class="worked"><span class="wh">Gjennomregnet: én million gjennom begge metodene</span>
<p>Et norsk selskap tjener kr 1 000 000 gjennom et fast driftssted i utlandet. Norsk sats er 22 % [dagens regel], og kildesatsen er 15 % eller 35 % [eksempeltall].</p>
<p><b>Steg 1, skattene hver for seg.</b> Kildeskatten er 150 000 eller 350 000 uansett metode. Norsk skatt før lettelse er 220 000.</p>
<p><b>Steg 2, kredit.</b> Med 15 %: fradrag min(150 000 ; 220 000) = 150 000, restskatt 220 000 − 150 000 = 70 000, samlet 220 000. Med 35 %: fradrag 220 000, restskatt 0, samlet 350 000, og 350 000 − 220 000 = 130 000 får ingen kredit.</p>
<table class="data">
<tr><th>Regime</th><th>Kilde 15 %</th><th>Kilde 35 %</th></tr>
<tr><td>Fullstendig unntak</td><td class="n">150 000</td><td class="n">350 000</td></tr>
<tr><td>Ordinær kredit</td><td class="n">220 000</td><td class="n">350 000</td></tr>
<tr><td>Ingen lettelse</td><td class="n">370 000</td><td class="n">570 000</td></tr>
</table>
<p><b>Kontroll:</b> unntak gir kildesatsen, kredit den høyeste satsen og ingen lettelse summen: 15 og 35 %, 22 og 35 %, 37 og 57 % ✓. Er kildesatsen 0, gir unntak dobbelt ikke-beskatning; kredit gir da full norsk skatt.</p>
<p><b>De gale tallene:</b> full kredit ved 35 % gir 220 000, altså at Norge betaler ut 130 000. At bare kildestaten skattlegger uten avtale, gir 150 000 der eksamen regner 370 000.</p>
</div>

<h3>Exit-skatt</h3>
<div class="formula"><div class="eq">Exit-skatt = (markedsverdi − inngangsverdi − bunnfradrag) × t<sub>e</sub></div>
<div class="where">Latent gevinst på aksjer, fondsandeler og lignende anses realisert dagen før utflytting, med bunnfradrag kr 3 000 000 og eierskatt t<sub>e</sub> = 37,84 % [dagens regel, skatteloven § 10-70]. Bare verdistigningen mens du bodde i Norge teller, og skatten fastsettes endelig: et senere verdifall setter den ikke ned.</div></div>
<p>Eksempel: (25 000 000 − 5 000 000 − 3 000 000) × 37,84 % = kr 6 432 800. Glemt bunnfradrag gir 7 568 000, og 22 % i stedet for 37,84 % gir 3 740 000.</p>
<p>Skatten kan betales i tolv rentefrie årlige rater, alt etter tolv år med renter, eller straks. Flytter du tilbake innen tolv år med aksjene i behold, faller den bort. Femårsregelen i H2022 oppgave 4 ble opphevet 29. november 2022.</p>
<p><b>Gave</b> til noen som bor i utlandet utløser også exit-skatt (H2024 oppgave 10h). Grensen på kr 100 000 er en terskel, ikke et fradrag: overstiger netto gevinst på gavene i året 100 000, skattlegges hele gevinsten, og bunnfradraget gjelder bare når du selv flytter.</p>
<p><b>Selskapet flytter ut</b> (H2022 oppgave 4, H2024 oppgave 10i): kursfasiten gir poeng for oppgjør på både selskaps- og aksjonærnivå, som ved likvidasjon. Skatteloven § 10-71 er smalere: den skattlegger gevinst på selskapets eiendeler, og bare når selskapet flytter ut av EØS eller til et lavskatteland i EØS der det ikke er reelt etablert. Aksjonærene nevnes ikke.</p>

<h3>Skatteparadiser</h3>
<p>Schjelderups poeng er at hemmeligholdet er produktet (<i>secrecy jurisdiction</i>), ikke skattesatsen. Overskudd flyttes med internprising og tynn kapitalisering; eierskap skjules med skallselskaper og stråmenn. Tiltakene er CRS (informasjonsutveksling bare til skattemyndighetene, uten USA), BEPS og den globale minimumsskatten på 15 %. Etter Alstadsæter m.fl. skjuler de 0,01 % rikeste i Norge om lag 20 % av formuen og unndrar om lag 25 % av skatten.</p>

<div class="callout warn"><span class="h">Feilene som koster poeng</span>Globalskatteplikten gjelder hele verdensinntekten, ikke bare den norske. «Full kredit» er galt når oppgaven sier ordinær kredit. Lav kildesats under kredit gir ingen dobbeltbeskatning. Exit-skatt ved gave har verken 3 millioner eller 100 000 i fradrag. Skatteplanlegging er lovlig, unndragelse ulovlig.</div>

<div class="callout tip husk"><span class="h">Må kunne</span>
<ul><li>Med inntekt Y i kildestaten, norsk sats t<sub>hjem</sub> og kildesats t<sub>kilde</sub>: fullstendig unntak gir t<sub>kilde</sub> × Y, ordinær kredit maks(t<sub>hjem</sub> ; t<sub>kilde</sub>) × Y, fordi kreditten er begrenset til norsk skatt på inntekten.</li><li>Uten avtale regner eksamen med (t<sub>hjem</sub> + t<sub>kilde</sub>) × Y, men skatteloven § 16-20 gir kreditfradrag også da.</li><li>Unntak med kildesats 0 gir dobbelt ikke-beskatning. Etter intern rett skattlegger Norge bosatte og hjemmehørende for hele verdensinntekten.</li><li>Exit-skatt = (markedsverdi − inngangsverdi − kr 3 000 000) × 37,84 % dagen før utflytting, og den kan betales i tolv rentefrie rater. Gave til noen i utlandet: hele gevinsten skattlegges når den overstiger kr 100 000 i året.</li><li>Bosatt i Norge: mer enn 183 dager på tolv måneder eller 270 på 36. Etter minst ti års bosted opphører bostedet først når vilkårene er oppfylt i de tre inntektsårene etter utflyttingsåret. Bosatt i flere land: avtalens artikkel 4 avgjør, med fast bolig først.</li>
<li>Selskap som flytter ut: kursfasiten sier oppgjør på selskaps- og aksjonærnivå; skatteloven § 10-71 nevner bare selskapets eiendeler.</li></ul></div>
`,
  checks: [
    {
      id: "kj7-s1",
      q: "Norge har en skatteavtale med fullstendig unntak med et land som ikke skattlegger inntekten i det hele tatt. Hva blir resultatet for inntekten?",
      options: [
        "Norge skattlegger med 22 %, siden det ikke er noe å unnta",
        "Dobbeltbeskatning, siden begge statene har beskatningsrett",
        "Ingen steder, siden Norge har gitt avkall og kilden ikke skattlegger",
        "Kildestaten må skattlegge, ellers faller avtalen bort",
      ],
      answer: 2,
      explanation: "Under fullstendig unntak gir Norge helt avkall på inntekten uten å spørre om kildestaten bruker sin rett, så inntekten skattlegges ingen steder. Svaret med 22 % beskriver kreditmetoden, der Norge skattlegger og krediterer den kildeskatten som faktisk er betalt, her null.",
    },
    {
      id: "kj7-s2",
      q: "En skatteavtale bygger på ordinær kredit. Norsk sats er 22 %, kildestatens sats 26 %. Hva blir samlet skatt i prosent av inntekten?",
      options: [
        "26 %, og 4 prosentpoeng av kildeskatten får ingen kredit i Norge",
        "22 %, siden Norge krediterer all skatt betalt ute",
        "48 %, siden begge statene skattlegger hele inntekten",
        "30 %, siden restskatten på 4 prosentpoeng kommer i tillegg",
      ],
      answer: 0,
      explanation: "Kreditten er begrenset til norsk skatt på inntekten, 22 %, så restskatten hjem blir null og samlet skatt blir kildesatsen, 26 %: den høyeste av de to. Svaret med 22 % er full kredit, der Norge måtte betalt ut differansen, men restskatten kan aldri bli negativ.",
    },
    {
      id: "kj7-s3",
      q: "Du har bodd i Norge i 20 år og flytter ut i 2026. Senere er du aldri mer enn 61 dager i året i Norge, og verken du eller dine nærstående disponerer bolig her. Til og med hvilket inntektsår er du skattemessig bosatt i Norge?",
      options: [
        "2026, siden bostedet opphører i det året du flytter ut av landet",
        "2027, siden det første hele året ute er nok",
        "2031, siden femårsregelen krever fem år ute",
        "2029, siden de tre årene etter utflyttingsåret teller",
      ],
      answer: 3,
      explanation: "Etter minst ti års bosted må vilkårene godtgjøres for hvert av de tre inntektsårene etter utflyttingsåret, 2027, 2028 og 2029, og bostedet opphører først etter det tredje. Svaret 2026 overser treårsregelen. Fem år var den opphevede femårsregelen for exit-skatt, ikke en bostedsregel.",
    },
  ],
  case: {
    id: "kj7-m1",
    topic: "Unntak og kredit i to land, og gave til utlandet",
    minutes: 10,
    body: `<p>Nordfjell AS er hjemmehørende i Norge og har kr 50 000 000 i overskudd i 2026: kr 20 000 000 opptjent i Norge, kr 18 000 000 gjennom et fast driftssted i land X og kr 12 000 000 gjennom et fast driftssted i land Y. Norsk selskapsskatt er 22 % [dagens regel]. Land X skattlegger driftsstedet med 16 %, og skatteavtalen med X bygger på ordinær kredit, beregnet for X alene. Land Y skattlegger driftsstedet med 30 %, og avtalen med Y bygger på fullstendig unntak [eksempeltall].</p>`,
    ledd: [
      {
        id: "kj7-m1a",
        points: 3,
        q: `<p>Hvor mye skatt betaler Nordfjell AS til Norge for 2026?</p>`,
        options: ["kr 5 480 000", "kr 4 400 000", "kr 8 360 000", "kr 11 000 000"],
        answer: 0,
        solution: `<p><b>Steg 1 — Norge.</b> 20 000 000 × 22 % = 4 400 000.</p><p><b>Steg 2 — X, ordinær kredit.</b> Norsk skatt på X-inntekten er 18 000 000 × 22 % = 3 960 000, og skatten i X er 18 000 000 × 16 % = 2 880 000. Kreditfradraget er min(2 880 000 ; 3 960 000) = 2 880 000, og restskatten til Norge 3 960 000 − 2 880 000 = 1 080 000.</p><p><b>Steg 3 — Y, fullstendig unntak.</b> Norge gir helt avkall: 0.</p><p><b>Sum:</b> 4 400 000 + 1 080 000 + 0 = <b>kr 5 480 000</b>. <b>Kontroll:</b> restskatten på X er satsforskjellen, (22 % − 16 %) × 18 000 000 = 1 080 000 ✓.</p>`,
        traps: [
          null,
          "X behandlet som unntak, så bare den norske inntekten skattlegges: 20 000 000 × 22 % = 4 400 000. Under ordinær kredit krever Norge restskatten når kildesatsen er lavere.",
          "Kreditfradraget for X glemt: 4 400 000 + 3 960 000 = 8 360 000.",
          "Begge avtalene overset: 50 000 000 × 22 % = 11 000 000 er skatteplikten etter intern rett isolert sett, før avtalene brukes.",
        ],
      },
      {
        id: "kj7-m1b",
        points: 3,
        q: `<p>Hva blir samlet skatt, i Norge og i utlandet, i prosent av overskuddet på kr 50 000 000? Rund av til to desimaler.</p>`,
        options: ["10,96 %", "29,68 %", "23,92 %", "21,76 %"],
        answer: 2,
        solution: `<p><b>Steg 1 — skatten ute.</b> X: 2 880 000. Y: 12 000 000 × 30 % = 3 600 000.</p><p><b>Steg 2 — samlet.</b> Til Norge 5 480 000 (4 400 000 + 1 080 000), ute 2 880 000 + 3 600 000 = 6 480 000. Samlet 5 480 000 + 6 480 000 = 11 960 000, altså 11 960 000/50 000 000 = <b>23,92 %</b>.</p><p><b>Kontroll:</b> ren norsk beskatning ville gitt 50 000 000 × 22 % = 11 000 000. Under kredit ender X på norsk nivå, så bare Y ligger over, med (30 % − 22 %) × 12 000 000 = 960 000. 11 000 000 + 960 000 = 11 960 000 ✓.</p>`,
        traps: [
          "Bare skatten til Norge regnet med: 5 480 000/50 000 000 = 10,96 %.",
          "Kreditfradraget for X glemt: 4 400 000 + 3 960 000 + 2 880 000 + 3 600 000 = 14 840 000, altså 29,68 %.",
          null,
          "X behandlet som unntak: 4 400 000 + 2 880 000 + 3 600 000 = 10 880 000, altså 21,76 %. Under kredit løftes X-inntekten til 22 %.",
        ],
      },
      {
        id: "kj7-m1c",
        points: 3,
        q: `<p>Eieren av Nordfjell, Siri, er bosatt i Norge. Hun gir en post børsnoterte aksjer til sønnen sin, som er bosatt i Sverige. Posten er verdt kr 900 000 og har inngangsverdi kr 540 000, og det er hennes eneste gave i 2026. Eierskatten er 37,84 % [dagens regel, 22 % × 1,72]; se bort fra skjerming. Hvor mye exit-skatt utløser gaven?</p>`,
        options: ["kr 0", "kr 136 224", "kr 98 384", "kr 340 560"],
        answer: 1,
        solution: `<p><b>Steg 1 — gevinsten.</b> 900 000 − 540 000 = 360 000.</p><p><b>Steg 2 — terskelen.</b> Gave til noen som bor i utlandet utløser exit-skatt når netto gevinst i året overstiger kr 100 000. 360 000 er over, så <i>hele</i> gevinsten skattlegges. Bunnfradraget på kr 3 000 000 gjelder bare når du selv flytter.</p><p><b>Steg 3 — skatten.</b> 360 000 × 37,84 % = <b>kr 136 224</b>. <b>Kontroll:</b> 360 000 × 1,72 × 22 % = 619 200 × 22 % = 136 224 ✓.</p>`,
        traps: [
          "Bunnfradraget på kr 3 000 000 brukt, så gevinsten forsvinner. Det gjelder bare når skattyteren selv flytter ut.",
          null,
          "Terskelen lest som fradrag: (360 000 − 100 000) × 37,84 % = 98 384.",
          "Skatt av markedsverdien i stedet for gevinsten: 900 000 × 37,84 % = 340 560.",
        ],
      },
    ],
  },
});
