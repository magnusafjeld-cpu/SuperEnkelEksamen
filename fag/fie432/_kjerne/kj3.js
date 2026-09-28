/* kj3 · Formuesskatten: verdsetting og gjeldsfordeling */
window.EDU_DATA.kjerne.push({
  id: "kj3",
  num: 3,
  title: "Formuesskatten: verdsetting og gjeldsfordeling",
  chapters: [7],
  html: `
<p class="lead-in">Forholdsmessig gjeldsfordeling er i sju av ni eksamenssett og står for 7,6 % av alle poengene: H2024 oppgave 6 spurte om gjeldsreduksjonen og nettoformuen, H2025 oppgave 2 om nettoformuen. Verdsettingen er den andre halvparten, med tre sett bak seg. Én fast tabell løser hele familien, og de gale alternativene er nesten alltid bygget av de samme få feilene.</p>

<h3>Satsene og bunnfradraget</h3>
<p>Formuesskatten regnes av nettoformuen W: summen av formuesverdiene etter verdsettingsrabatt, minus fradragsberettiget gjeld. Det som ligger over bunnfradraget, skattlegges i to trinn:</p>
<div class="formula"><div class="eq">Formuesskatt = 1,0 % × maks(0, min(W, K) − B) + 1,1 % × maks(0, W − K)</div>
<div class="where">[dagens regel, 2026] Bunnfradraget B = kr 1 900 000 og innslagspunktet K = kr 21 500 000 for en enslig. Ektefeller som skattlegges under ett, får begge doblet og regnet på parets samlede nettoformue: kr 3 800 000 og kr 43 000 000. Både B og K måles på nettoformuen selv.</div></div>
<p>En enslig med W = kr 30 000 000 betaler 1,0 % × 19 600 000 + 1,1 % × 8 500 000 = 196 000 + 93 500 = kr 289 500. Den kommunale andelen er halvert fra 0,70 % (2024) til 0,35 % (2026) og den statlige hevet like mye, så samlet sats er uendret. Eldre sett bruker sitt eget års bunnfradrag: kr 1 700 000 i 2024, kr 1 760 000 i 2025.</p>

<h3>Verdsettingen: formuesverdi, ikke markedsverdi</h3>
<p>Skatten treffer aldri markedsverdien, men formuesverdien: markedsverdien redusert med en rabatt ρ per aktivaklasse [dagens regel, 2026].</p>
<table class="data">
<tr><th>Aktivum</th><th>Verdsettes til</th><th>Gjelden henført dit avkortes?</th></tr>
<tr><td>Børsnoterte aksjer, aksjeandel i fond, næringseiendom</td><td class="n">80 %</td><td>Ja, med 20 %</td></tr>
<tr><td>Unoterte aksjer, av selskapets skattemessige formuesverdi</td><td class="n">80 %</td><td>Ja, med 20 %</td></tr>
<tr><td>Primærbolig, delen opp til kr 14 000 000</td><td class="n">25 %</td><td>Nei</td></tr>
<tr><td>Primærbolig, delen over kr 14 000 000</td><td class="n">70 %</td><td>Nei</td></tr>
<tr><td>Sekundærbolig, bankinnskudd, renteandel i fond</td><td class="n">100 %</td><td>Ingen rabatt, ingen avkorting</td></tr>
</table>
<p><b>Primærboligens terskel</b> er kr 14 000 000 fra 2026, men kr 10 000 000 i H2024 og H2025, og de eldste settene (H2016, H2019) verdsatte hele boligen til 25 % uten terskel: bruk satsene oppgaven gir. En bolig til 18 mill. har formuesverdi 0,25 × 14 000 000 + 0,70 × 4 000 000 = 6 300 000 i 2026, mot 8 100 000 med den gamle terskelen. <b>Unoterte aksjer</b> verdsettes av selskapets bokførte eiendeler minus gjeld, ikke av en emisjonskurs, og får så 20 % rabatt. Anine-regnestykket fra forelesning 1 brukte emisjonsprisen og kom til kr 495 000 i formuesskatt; bokført verdi gir kr 17 000 med 2026-satsene. Et kombinasjonsfond deles: aksjedelen 80 %, rentedelen 100 %.</p>

<h3>Gjeldsfordelingen</h3>
<p>Gjelden kan ikke bare trekkes fra. Den fordeles forholdsmessig etter aktivaenes <b>bruttoverdi</b> før rabatt, og den delen som havner på et rabattert aktivum, avkortes med samme rabatt. Gjeld henført til primærbolig avkortes <b>ikke</b>:</p>
<div class="formula"><div class="eq">Fradragsberettiget gjeld<sub>i</sub> = G × (BV<sub>i</sub>/ΣBV) × (1 − ρ<sub>i</sub>), men uavkortet for primærbolig</div>
<div class="eq">Samlet = G × [1 − Σ<sub>rabatterte</sub>(BV<sub>i</sub> × ρ<sub>i</sub>)/ΣBV]</div>
<div class="where">G er samlet gjeld, BV<sub>i</sub> bruttoverdien og ρ<sub>i</sub> rabatten. Summen i andre linje løper bare over aktiva som utløser avkorting: aksjer, aksjefond, næringseiendom og andre aktiva med 20 % rabatt. Primærboligen teller med full bruttoverdi i fordelingsnøkkelen, men gjelden dit står uendret.</div></div>
<p>Sett alltid opp samme tabell, én kolonne per aktivum: (1) bruttoverdi, (2) andel av bruttoformuen, (3) formuesverdi, (4) andel av gjelden, (5) fradragsberettiget gjeld, (6) netto = (3) − (5). Negative kolonner motregnes mot positive.</p>
<div class="callout mech"><span class="h">Hvorfor fordeles gjelden i det hele tatt?</span>Ellers ville rabatten virke to ganger. Aksjer for 1 mill. kjøpt med 1 mill. i lån har formuesverdi 800 000; med fullt gjeldsfradrag ble nettobidraget −200 000, som senket skatten på all annen formue. Gjelden måles derfor med samme målestokk som eiendelen den finansierer: 20 % rabatt på aksjen, 20 % avkorting av gjelden dit.</div>
<div class="callout mech"><span class="h">Hvorfor er primærboligen unntatt?</span>Lovgiveren ville at boligrabatten skulle komme skattyteren fullt til gode. «Formuesverdi 25 %, gjeldsfradrag 100 %» er tilsiktet, og det er derfor en belånt primærbolig ofte gir et negativt bidrag til nettoformuen.</div>
<div class="worked"><span class="wh">Gjennomregnet: H2024 oppgave 6</span>
<p>Bottolf har kr 1 800 000 i gjeld. Eiendelene er primærbolig 4 800 000, aksjer 1 000 000 og bank 200 000, til sammen 6 000 000 før rabatt. Rabattene er 75 % på boligen og 20 % på aksjene [eksempeltall fra oppgaven, lik dagens regel], og oppgaven sier at gjeld henført til primærbolig ikke skal reduseres. Hvor mye reduseres gjelden, og hva er nettoformuen?</p>
<table class="data">
<tr><th>Rad</th><th>Primærbolig</th><th>Aksjer</th><th>Bank</th><th>Sum</th></tr>
<tr><td>1 Bruttoverdi</td><td class="n">4 800 000</td><td class="n">1 000 000</td><td class="n">200 000</td><td class="n">6 000 000</td></tr>
<tr><td>2 Andel</td><td class="n">80 %</td><td class="n">16⅔ %</td><td class="n">3⅓ %</td><td class="n">100 %</td></tr>
<tr><td>3 Formuesverdi</td><td class="n">1 200 000</td><td class="n">800 000</td><td class="n">200 000</td><td class="n">2 200 000</td></tr>
<tr><td>4 Andel av gjelden</td><td class="n">1 440 000</td><td class="n">300 000</td><td class="n">60 000</td><td class="n">1 800 000</td></tr>
<tr><td>5 Fradragsberettiget</td><td class="n">1 440 000</td><td class="n">240 000</td><td class="n">60 000</td><td class="n">1 740 000</td></tr>
<tr><td>6 Netto</td><td class="n">−240 000</td><td class="n">560 000</td><td class="n">140 000</td><td class="n">460 000</td></tr>
</table>
<p><b>Steg 1: nøkkelen er bruttoverdiene</b>, ikke formuesverdiene: 80 %, 16⅔ % og 3⅓ %. Her bommer flest.</p>
<p><b>Steg 2: fordel og avkort.</b> Aksjene får 300 000 av gjelden, som avkortes med 20 %: reduksjonen er <b>kr 60 000</b>. Boliggjelden står, og banken har ingen rabatt.</p>
<p><b>Steg 3: netto.</b> 2 200 000 − 1 740 000 = <b>kr 460 000</b>.</p>
<p><b>Kontroll:</b> per kolonne −240 000 + 560 000 + 140 000 = 460 000 ✓, og samlet 1 800 000 × (1 − 200 000/6 000 000) = 1 740 000 ✓.</p>
<p><b>De gale tallene.</b> Ingen avkorting: 2 200 000 − 1 800 000 = 400 000. Boliggjelden også avkortet med 75 %: nettoformue 1 540 000. Boligkolonnen satt til null: 700 000. Markedsverdi på aksjene og ingen avkorting: 600 000. Gjeld fordelt etter formuesverdi: 530 909. Av disse sto bare 600 000 blant alternativene i oppgave 6b; treffer du ingen rute, har du gjort en metodefeil.</p>
</div>
<p>H2025 oppgave 2 (primærbolig og aksjefond på 5 mill. hver, gjeld 5 mill.) sa ikke at gjelden skulle avkortes, og sensor godtok både 750 000 (med avkorting, etter loven) og 250 000 (uten). Når to alternativer begge kan forsvares, velg det som følger loven.</p>
<div class="callout warn"><span class="h">Feilene som koster poeng</span>(1) Gjelden fordelt etter formuesverdi i stedet for bruttoverdi. (2) Boliggjelden avkortet med 75 %: den dyreste enkeltfeilen. (3) Avkortingen hoppet over. (4) En negativ boligkolonne «rettet» til null. (5) Skatten regnet av markedsverdi, eller et gammelt sett regnet med 2026-terskelen og -bunnfradraget. Og les hva det spørres om: nettoformuen er før bunnfradrag og sats.</div>
<p><b>Bolig ellers</b> [dagens regel]: gevinst ved salg av egen bolig er skattefri når du har eid den i mer enn ett år og bodd i den minst 12 av de siste 24 månedene, og utleie av egen bolig er skattefri når du selv bruker minst halvparten, regnet etter utleieverdi.</p>
<p><b>Eiendomsskatt</b> er en annen skatt: kommunal og frivillig, grunnlaget er beregnet omsetningsverdi × 0,7 minus et eventuelt bunnfradrag, satsen høyst 4 ‰ for bolig, og uten gjeldsfradrag, så formuesskattens 25 % gjelder ikke der.</p>
<div class="callout tip husk"><span class="h">Må kunne</span>
<ul><li>Formuesskatt 2026 [dagens regel]: 1,0 % av nettoformuen W over bunnfradraget kr 1 900 000 og 1,1 % over kr 21 500 000; ektefeller under ett har kr 3 800 000 og kr 43 000 000, regnet på samlet nettoformue.</li>
<li>Skatten regnes av formuesverdi, ikke markedsverdi: aksjer, aksjefond og unoterte aksjer 80 % (unoterte av bokførte eiendeler minus gjeld), primærbolig 25 % opp til kr 14 000 000 og 70 % over (10 mill. i H2024 og H2025), sekundærbolig og bank 100 %.</li>
<li>Gjelden G fordeles etter bruttoverdi før rabatt. Gjeld henført til rabatterte aktiva avkortes med rabatten ρ; gjeld henført til primærbolig avkortes ikke. Samlet fradrag = G × [1 − Σ(BV<sub>i</sub> × ρ<sub>i</sub>)/ΣBV], summert over aktiva med 20 % rabatt, som aksjer, fond og næringseiendom (BV = bruttoverdi).</li>
<li>Kontroll: netto per aktivum summerer til nettoformuen, og en negativ kolonne (typisk en belånt primærbolig) motregnes.</li>
<li>Sier oppgaven ikke at gjelden skal avkortes, kan sensor godta begge svarene (H2025 oppgave 2); velg da svaret som følger loven.</li></ul></div>
`,
  checks: [
    {
      id: "kj3-s1",
      q: "Du har børsnoterte aksjer for kr 2 000 000, kr 2 000 000 i bank og kr 2 000 000 i gjeld. Aksjene verdsettes til 80 %. Hvor mye av gjelden er fradragsberettiget?",
      options: [
        "kr 2 000 000: bankinnskuddet har ingen rabatt, så hele gjelden går til fradrag",
        "kr 1 600 000: hele gjelden avkortes med aksjerabatten på 20 %",
        "kr 1 800 000: halve gjelden henføres til aksjene og avkortes med 20 %",
        "kr 1 822 222: gjelden fordeles etter formuesverdiene 1,6 og 2 mill.",
      ],
      answer: 2,
      explanation: "Gjelden fordeles etter bruttoverdiene, 2 og 2 mill., så 1 000 000 henføres til aksjene og avkortes med 20 % til 800 000, mens bankgjelden på 1 000 000 står. Samlet 1 800 000. Svaret som avkorter hele gjelden, bruker aksjerabatten også på gjelden som hører til bankinnskuddet, og det har ingen rabatt.",
    },
    {
      id: "kj3-s2",
      q: "I en gjeldsfordeling får primærboligen formuesverdi kr 2 000 000 og kr 3 000 000 av gjelden henført til seg. Hva gjør du med boligkolonnen?",
      options: [
        "Setter den til null: en eiendel kan ikke gi negativ formue",
        "Lar den stå på −1 000 000 og motregner den mot de andre kolonnene",
        "Avkorter boliggjelden med 75 %, så kolonnen blir +1 250 000",
        "Flytter de 1 000 000 som overstiger formuesverdien, over på de andre aktivaene",
      ],
      answer: 1,
      explanation: "Formuesverdien er bare 25 % av boligens verdi, mens gjelden henført dit trekkes fra fullt ut, så kolonnen blir negativ. Det er tilsiktet, og nettoformuen er summen over alle aktiva, så −1 000 000 motregnes. Å sette kolonnen til null gir for høy nettoformue, og å avkorte boliggjelden er den dyreste enkeltfeilen i disse oppgavene. Å flytte de overskytende 1 000 000 til andre aktiva har ingen hjemmel; havner de på aksjer, avkortes de i tillegg med aksjerabatten, og fradraget blir for lite.",
    },
    {
      id: "kj3-s3",
      q: "En emisjon priser et unotert selskap til kr 80 000 000. Selskapet har bokførte eiendeler for kr 15 000 000 og gjeld for kr 3 000 000. Du eier 50 %. Hva er formuesverdien av aksjene dine etter reglene kurset bruker?",
      options: [
        "kr 32 000 000: halve emisjonsprisen, med aksjerabatten på 20 %",
        "kr 6 000 000: halve bokførte egenkapitalen, uten rabatt fordi aksjen er unotert",
        "kr 7 500 000: halvparten av de bokførte eiendelene, før selskapets gjeld",
        "kr 4 800 000: halve bokførte egenkapitalen, med aksjerabatten på 20 %",
      ],
      answer: 3,
      explanation: "Unoterte aksjer verdsettes av selskapets skattemessige formuesverdi, bokførte eiendeler minus gjeld: 15 000 000 − 3 000 000 = 12 000 000. Din halvpart er 6 000 000, og rabatten på 20 % gjelder også unoterte aksjer: 4 800 000. Svaret med emisjonsprisen er feilen i Anine-regnestykket; svaret uten rabatt tror at bare børsnoterte aksjer får 20 %.",
    },
  ],
  case: {
    id: "kj3-m1",
    topic: "Gjeldsfordeling, nettoformue og formuesskatt",
    minutes: 10,
    body: `<p>Live er enslig. Ved årsskiftet eier hun en primærbolig med beregnet omsetningsverdi kr 10 000 000, børsnoterte aksjer for kr 12 000 000, en sekundærbolig (utleieleilighet) verdt kr 4 000 000 og kr 2 000 000 i bankinnskudd. Gjelden hennes er kr 8 400 000.</p><p>Primærboligen verdsettes til 25 % (hele verdien ligger under terskelen på kr 14 000 000), aksjene til 80 %, sekundærbolig og bankinnskudd til 100 %. Gjelden fordeles forholdsmessig etter eiendelenes bruttoverdi før rabatt. Gjeld henført til aksjene reduseres med 20 %, og gjeld henført til primærboligen reduseres ikke. Formuesskatten er 1,0 % av nettoformuen over bunnfradraget på kr 1 900 000 og 1,1 % av den delen som overstiger kr 21 500 000 [dagens regel, 2026].</p>`,
    ledd: [
      {
        id: "kj3-m1a",
        points: 3,
        q: `<p>Hvor mye reduseres den fradragsberettigede gjelden med?</p>`,
        options: ["kr 720 000", "kr 2 970 000", "kr 891 050", "kr 1 680 000"],
        answer: 0,
        solution: `<p><b>Steg 1: fordelingsnøkkelen.</b> Bruttoformuen er 10 000 000 + 12 000 000 + 4 000 000 + 2 000 000 = 28 000 000. Gjelden henført til aksjene er 8 400 000 × 12 000 000/28 000 000 = <b>3 600 000</b>.</p><p><b>Steg 2: avkort bare aksjegjelden.</b> 3 600 000 × 20 % = <b>kr 720 000</b>. Boliggjelden (8 400 000 × 10/28 = 3 000 000) står uendret, og sekundærbolig og bank har ingen rabatt.</p><p><b>Kontroll:</b> samlet formel: 8 400 000 × (12 000 000 × 20 %)/28 000 000 = 8 400 000 × 2 400 000/28 000 000 = 720 000. ✓</p>`,
        traps: [
          null,
          "Boliggjelden også avkortet med 75 %: 720 000 + 3 000 000 × 75 % = 2 970 000. Gjeld henført til primærbolig reduseres ikke.",
          "Gjelden fordelt etter formuesverdi i stedet for bruttoverdi: 8 400 000 × 9 600 000/18 100 000 × 20 % = 891 050.",
          "Hele gjelden avkortet med aksjerabatten: 8 400 000 × 20 % = 1 680 000. Bare delen som er henført til aksjene, avkortes.",
        ],
      },
      {
        id: "kj3-m1b",
        points: 3,
        q: `<p>Hva er Lives nettoformue, før bunnfradraget?</p>`,
        options: ["kr 9 700 000", "kr 10 420 000", "kr 12 670 000", "kr 10 920 000"],
        answer: 1,
        solution: `<p><b>Steg 1: formuesverdiene.</b> 10 000 000 × 25 % = 2 500 000, 12 000 000 × 80 % = 9 600 000, sekundærbolig 4 000 000 og bank 2 000 000. Sum <b>18 100 000</b>.</p><p><b>Steg 2: fradragsberettiget gjeld.</b> 8 400 000 − 720 000 = <b>7 680 000</b>.</p><p><b>Steg 3: netto.</b> 18 100 000 − 7 680 000 = <b>kr 10 420 000</b>.</p><p><b>Kontroll per aktivum:</b> gjelden fordeles 3 000 000 / 3 600 000 / 1 200 000 / 600 000. Bolig 2 500 000 − 3 000 000 = −500 000, aksjer 9 600 000 − 2 880 000 = 6 720 000, sekundærbolig 4 000 000 − 1 200 000 = 2 800 000, bank 2 000 000 − 600 000 = 1 400 000. Summen er 10 420 000. ✓ Den negative boligkolonnen er riktig og motregnes.</p>`,
        traps: [
          "Gjelden ikke avkortet: 18 100 000 − 8 400 000 = 9 700 000.",
          null,
          "Boliggjelden også avkortet med 75 %: fradragsberettiget gjeld 7 680 000 − 2 250 000 = 5 430 000, og 18 100 000 − 5 430 000 = 12 670 000.",
          "Den negative boligkolonnen satt til null: 6 720 000 + 2 800 000 + 1 400 000 = 10 920 000. Negative kolonner skal motregnes.",
        ],
      },
      {
        id: "kj3-m1c",
        points: 3,
        q: `<p>Hva betaler Live i formuesskatt?</p>`,
        options: ["kr 104 200", "kr 78 000", "kr 85 200", "kr 177 000"],
        answer: 2,
        solution: `<p><b>Steg 1: trinnet.</b> Nettoformuen er 10 420 000, under innslagspunktet på 21 500 000, så bare satsen 1,0 % brukes.</p><p><b>Steg 2: bunnfradraget.</b> 10 420 000 − 1 900 000 = 8 520 000.</p><p><b>Steg 3: satsen.</b> 8 520 000 × 1,0 % = <b>kr 85 200</b>.</p><p><b>Kontroll:</b> 1,0 % × 10 420 000 = 104 200, minus 1,0 % × 1 900 000 = 19 000, gir 85 200. ✓ Grunnlaget er formuesverdiene, ikke markedsverdiene på til sammen 28 000 000.</p>`,
        traps: [
          "Bunnfradraget glemt: 10 420 000 × 1,0 % = 104 200.",
          "Gjelden ikke avkortet: (9 700 000 − 1 900 000) × 1,0 % = 78 000.",
          null,
          "Skatten regnet av markedsverdi minus gjeld: (28 000 000 − 8 400 000 − 1 900 000) × 1,0 % = 177 000.",
        ],
      },
    ],
  },
});
