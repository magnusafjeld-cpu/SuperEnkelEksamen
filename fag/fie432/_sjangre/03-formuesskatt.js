/* sjanger 3 · formuesskatt · Formuesskatten: verdsetting og gjeldsfordeling */
window.EDU_DATA.sjangre.push({
  id: "formuesskatt",
  num: 3,
  title: "Formuesskatten: verdsetting og gjeldsfordeling",
  summary: "Fra bunnfradraget og satsen til forholdsmessig gjeldsreduksjon, ektefeller og nedbetaling av gjeld",
  chapters: [7],
  exam: "7 av 9 sett · H2024 oppgave 6, H2025 oppgave 2",
  intro: `<p>Gjeldsfordelingen er i sju av ni eksamenssett og verdsettingen i tre. Oppgaven gir deg eiendeler, rabatter og gjeld. Den spør etter gjeldsreduksjonen, nettoformuen eller skatten (H2024 oppgave 6, H2025 oppgave 2). De gale alternativene er bygget av de samme feilene hver gang: skatt av markedsverdi, glemt bunnfradrag, gjeld fordelt etter formuesverdi, gjeld som ikke er redusert eller gjeld redusert også for primærboligen. Etter siste steg regner du hele tabellen, kjenner igjen hvert av de gale tallene og kan avgjøre om det lønner seg å nedbetale gjeld med bankinnskudd.</p>`,
  steps: [
    {
      id: "formuesskatt-1",
      title: "Satsene: bunnfradraget og to trinn",
      theory: `<p>Formuesskatten regnes av <b>nettoformuen</b> W: summen av formuesverdiene minus gjelden du får trekke fra. Fra W trekkes bunnfradraget B. Resten skattlegges med 1,0 %. Over innslagspunktet K er satsen 1,1 %, men bare for den delen av W som ligger over K. Ligger W under B, er skatten null. Satsen deles mellom kommune og stat: kommunen tar 0,35 % av hele grunnlaget over B og staten resten. Kommunens andel er halvert fra 0,70 % i 2024, men samlet sats er uendret.</p>
<div class="formula"><div class="eq">Formuesskatt = 1,0 % × (min(W, K) − B) + 1,1 % × max(0, W − K)</div><div class="where">2026 <b>[dagens regel]</b> for en enslig: B = 1 900 000 kr og K = 21 500 000 kr, begge målt på nettoformuen selv. Kommunen: 0,35 % × (W − B). Staten: 0,65 % × (min(W, K) − B) + 0,75 % × max(0, W − K).</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>En enslig har 4 000 000 kr i bankinnskudd og 600 000 kr i gjeld. W = 3 400 000, godt under K. Formuesskatt = 1,0 % × (3 400 000 − 1 900 000) = <b>15 000 kr</b>.</p><p>En annen enslig har W = 25 000 000. Trinn 1: 1,0 % × (21 500 000 − 1 900 000) = 196 000. Trinn 2: 1,1 % × (25 000 000 − 21 500 000) = 38 500. Sum <b>234 500 kr</b>. Snarvei: 1,0 % × 23 100 000 = 231 000, pluss 0,1 % × 3 500 000 = 3 500.</p></div>`,
      q: `<p>Tone er enslig og har en nettoformue på kr 27 400 000. Formuesskatten er 1,0 % av nettoformuen mellom bunnfradraget kr 1 900 000 og innslagspunktet kr 21 500 000. Over innslagspunktet er satsen 1,1 %. Kommunen får 0,35 % av grunnlaget over bunnfradraget. Staten får resten, 0,65 % i trinn 1 og 0,75 % i trinn 2 [dagens regel, 2026]. Hva betaler Tone i formuesskatt til sammen, til kommune og stat?</p>`,
      options: ["kr 280 500", "kr 171 650", "kr 260 900", "kr 255 000"],
      answer: 2,
      solution: `<p>Trinn 1: 1,0 % × (21 500 000 − 1 900 000) = 1,0 % × 19 600 000 = 196 000.</p><p>Trinn 2: 1,1 % × (27 400 000 − 21 500 000) = 1,1 % × 5 900 000 = 64 900.</p><p>Sum: 196 000 + 64 900 = <b>kr 260 900</b>.</p>`,
      check: `<p>Del skatten på mottakerne. Kommunen: 0,35 % × (27 400 000 − 1 900 000) = 89 250. Staten: 0,65 % × 19 600 000 + 0,75 % × 5 900 000 = 127 400 + 44 250 = 171 650. Sum 89 250 + 171 650 = 260 900. Snarveien gir det samme: 1,0 % × 25 500 000 + 0,1 % × 5 900 000 = 255 000 + 5 900 = 260 900.</p>`,
      traps: [
        "Brukt 1,1 % på hele grunnlaget over bunnfradraget: 1,1 % × 25 500 000 = 280 500. Den høye satsen gjelder bare delen over 21 500 000.",
        "Bare statens del: 0,65 % × 19 600 000 + 0,75 % × 5 900 000 = 171 650. Kommunens 89 250 mangler.",
        null,
        "Glemt trinn 2: 1,0 % × (27 400 000 − 1 900 000) = 255 000.",
      ],
    },
    {
      id: "formuesskatt-2",
      title: "Formuesverdi, ikke markedsverdi: aksjer og boliger",
      theory: `<p>Formuesskatten treffer aldri markedsverdien. Den treffer <b>formuesverdien</b>: markedsverdien minus en verdsettingsrabatt ρ som er fastsatt for hver type eiendel. Børsnoterte aksjer og aksjeandelen i fond teller med 80 %, bankinnskudd med 100 %. Primærboligen, der du bor selv, teller med 25 % opp til terskelen T og med 70 % av verdien over. En sekundærbolig, som du ikke bor i selv, teller med 100 %. Verdsett hver eiendel for seg og legg sammen.</p>
<div class="formula"><div class="eq">Formuesverdi = markedsverdi × (1 − ρ)</div><div class="eq">Formuesverdi<sub>primærbolig</sub> = 25 % × min(M, T) + 70 % × max(0, M − T)</div><div class="where">ρ = 20 % for børsnoterte aksjer og aksjefond, 0 % for bank og sekundærbolig. T = 14 000 000 kr fra inntektsåret 2026 <b>[dagens regel]</b>. I 2024 og 2025, altså i H2024 og H2025, var T = 10 000 000 kr. M er Skatteetatens beregnede omsetningsverdi, gitt direkte eller som areal × kvadratmeterpris (H2019 oppgave 2a). H2025 oppgave 1 regnet en aksjepost slik: 10 000 000 × 80 % × 1 % = 80 000 i skatt per år.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>En primærbolig med M = 17 000 000: 25 % × 14 000 000 = 3 500 000 og 70 % × 3 000 000 = 2 100 000, til sammen 5 600 000.</p><p>Aksjer verdt 3 000 000 teller 2 400 000. En sekundærbolig verdt 2 500 000 og 1 500 000 i banken teller fullt.</p><p>Samlet formuesverdi: 5 600 000 + 2 400 000 + 2 500 000 + 1 500 000 = <b>12 000 000</b>, mot en markedsverdi på 24 000 000.</p></div>`,
      q: `<p>Live eier en primærbolig på 130 m² med beregnet kvadratmeterpris kr 120 000. Hun eier også et rent aksjefond verdt kr 5 000 000, en utleieleilighet (sekundærbolig) med beregnet omsetningsverdi kr 3 200 000 og kr 800 000 i bankinnskudd. Primærbolig verdsettes til 25 % av verdien opp til terskelen på kr 14 000 000 og til 70 % av verdien over. Aksjefond verdsettes til 80 %, sekundærbolig og bankinnskudd til 100 % [dagens regel, 2026]. Hva er den samlede formuesverdien av eiendelene hennes?</p>`,
      options: ["kr 11 900 000", "kr 13 620 000", "kr 12 620 000", "kr 10 220 000"],
      answer: 2,
      solution: `<p>Primærbolig: 130 × 120 000 = 15 600 000. Under terskelen: 25 % × 14 000 000 = 3 500 000. Over: 70 % × 1 600 000 = 1 120 000. Sum 4 620 000.</p><p>Aksjefond: 5 000 000 × 80 % = 4 000 000. Sekundærbolig: 3 200 000. Bank: 800 000.</p><p>Samlet: 4 620 000 + 4 000 000 + 3 200 000 + 800 000 = <b>kr 12 620 000</b>.</p>`,
      check: `<p>Regn rabattene som beløp. Fondet: 20 % × 5 000 000 = 1 000 000. Boligen: 75 % × 14 000 000 + 30 % × 1 600 000 = 10 500 000 + 480 000 = 10 980 000. Markedsverdien 24 600 000 minus 11 980 000 i rabatt gir 12 620 000. Boligens snitt er 4 620 000/15 600 000 ≈ 29,6 %, mellom 25 % og 70 %, slik det skal være.</p>`,
      traps: [
        "25 % på hele primærboligen, som om terskelen ikke fantes: 3 900 000 + 4 000 000 + 3 200 000 + 800 000 = 11 900 000.",
        "Ingen rabatt på aksjefondet: 4 620 000 + 5 000 000 + 3 200 000 + 800 000 = 13 620 000.",
        null,
        "Sekundærboligen verdsatt som en primærbolig, til 25 %: 4 620 000 + 4 000 000 + 800 000 + 800 000 = 10 220 000.",
      ],
    },
    {
      id: "formuesskatt-3",
      title: "Unoterte aksjer: selskapets skattemessige verdi, ikke markedsprisen",
      theory: `<p>En unotert aksje har ingen børskurs. Formuesskatten bruker heller ikke prisen fra en emisjon eller et salg. Grunnlaget er selskapets <b>skattemessige formuesverdi</b>: eiendelene verdsatt etter skattereglene minus gjelden. Din andel av den får så den vanlige aksjerabatten på 20 %. For selskaper med verdier som ikke står i balansen, som kunnskap eller merkevare, blir formuesverdien langt lavere enn markedsverdien.</p>
<div class="formula"><div class="eq">Formuesverdi = eierandel × (skattemessige eiendeler − gjeld) × 80 %</div><div class="where">Rabatten på 20 % er <b>[dagens regel]</b>, den samme som for børsnoterte aksjer. Markedsverdien av selskapet brukes ikke.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Du eier 60 % av et unotert selskap med skattemessige eiendeler 5 000 000 og gjeld 1 000 000. Formuesverdi: 60 % × 4 000 000 × 80 % = 2 400 000 × 80 % = <b>1 920 000</b>, uansett hva en kjøper ville betalt for aksjene.</p></div>`,
      q: `<p>Sindre eier 35 % av aksjene i det unoterte selskapet Fjordlys AS. En emisjon har nylig priset hele selskapet til kr 60 000 000. Selskapets skattemessige formuesverdi er eiendeler på kr 14 000 000 minus gjeld på kr 4 000 000. Sindre er enslig og har ingen annen formue og ingen gjeld. Unoterte aksjer verdsettes til 80 % av eierens andel av selskapets skattemessige formuesverdi. Formuesskatten er 1,0 % av nettoformuen over bunnfradraget på kr 1 900 000 [dagens regel, 2026]. Hva betaler Sindre i formuesskatt?</p>`,
      options: ["kr 16 000", "kr 9 000", "kr 149 000", "kr 20 200"],
      answer: 1,
      solution: `<p>Selskapets skattemessige formuesverdi: 14 000 000 − 4 000 000 = 10 000 000.</p><p>Sindres andel: 35 % × 10 000 000 = 3 500 000. Etter rabatt: 3 500 000 × 80 % = 2 800 000.</p><p>Formuesskatt = 1,0 % × (2 800 000 − 1 900 000) = 1,0 % × 900 000 = <b>kr 9 000</b>.</p>`,
      check: `<p>Sammenlign med markedsverdien: 35 % av 60 000 000 er 21 000 000, mens formuesverdien er 2 800 000, bare 13,3 % av den. Emisjonsprisen er seks ganger selskapets skattemessige verdi. Det er dette gapet som gjør unotert eierskap billig i formuesskatten.</p>`,
      traps: [
        "Glemt aksjerabatten: 1,0 % × (3 500 000 − 1 900 000) = 16 000.",
        null,
        "Brukt emisjonsprisen som verdi: 1,0 % × (35 % × 60 000 000 × 80 % − 1 900 000) = 149 000.",
        "Glemt selskapets gjeld: 1,0 % × (35 % × 14 000 000 × 80 % − 1 900 000) = 20 200.",
      ],
    },
    {
      id: "formuesskatt-4",
      title: "Gjelden fordeles etter bruttoverdi og reduseres med rabatten",
      theory: `<p>Har du eiendeler med rabatt, kan ikke gjelden bare trekkes fra. Den fordeles først forholdsmessig på <b>alle</b> eiendelene etter bruttoverdien, altså markedsverdien før rabatt, uansett hva lånet ble brukt til eller hvor pantet ligger. Gjelden som havner på en eiendel med rabatt, reduseres med den samme rabatten. Ellers ville rabatten virket to ganger: én gang ned på formuen og én gang opp på fradraget. <b>Unntaket er primærboligen</b>: gjelden henført dit reduseres ikke, selv om boligen bare teller 25 %. Sekundærbolig og bank har ingen rabatt og gir ingen reduksjon.</p>
<div class="formula"><div class="eq">G<sub>i</sub> = G × BV<sub>i</sub>/ΣBV</div><div class="eq">Reduksjon = Σ<sub>rabatterte</sub> G<sub>i</sub> × ρ<sub>i</sub> = G × Σ<sub>rabatterte</sub>(BV<sub>i</sub> × ρ<sub>i</sub>)/ΣBV</div><div class="where">G<sub>i</sub> er gjelden henført til eiendel i og BV<sub>i</sub> dens bruttoverdi <b>[dagens regel, skatteloven § 4-19]</b>. Formuesverdiene etter rabatt brukes ikke i nøkkelen. Summen i reduksjonen løper over aksjer, aksjefond, unoterte aksjer og næringseiendom, ikke over primærboligen. Fradragsberettiget gjeld = G − reduksjon.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Primærbolig 6 000 000, aksjer 3 000 000, bank 1 000 000 og gjeld 4 000 000. Andelene er 60 %, 30 % og 10 %, så gjelden henføres med 2 400 000, 1 200 000 og 400 000. Sum 4 000 000.</p><p>Reduksjon: 1 200 000 × 20 % = <b>240 000</b>. Boliggjelden og bankgjelden står urørt. Fradragsberettiget gjeld: 4 000 000 − 240 000 = 3 760 000.</p></div>`,
      q: `<p>Øystein har kr 7 200 000 i gjeld, et boliglån med pant i primærboligen. Ved årsskiftet eier han en primærbolig med markedsverdi kr 9 000 000, børsnoterte aksjer verdt kr 4 000 000, et rent aksjefond verdt kr 2 000 000 og en sekundærbolig verdt kr 3 000 000. Primærboligen verdsettes til 25 %, aksjene og aksjefondet til 80 % og sekundærboligen til 100 %. Gjelden fordeles forholdsmessig etter bruttoverdi. Gjeld henført til aksjene og aksjefondet reduseres med 20 %. Gjeld henført til primærboligen reduseres ikke [dagens regel, 2026]. Hvor mye reduseres gjelden med?</p>`,
      options: ["kr 687 761", "kr 0", "kr 480 000", "kr 3 180 000"],
      answer: 2,
      solution: `<p>Bruttoverdi i alt: 9 000 000 + 4 000 000 + 2 000 000 + 3 000 000 = 18 000 000. Pantet i boligen endrer ikke fordelingen.</p>
<table class="data"><tr><th></th><th>Primærbolig</th><th>Aksjer</th><th>Aksjefond</th><th>Sekundærbolig</th><th>Sum</th></tr>
<tr><td>Bruttoverdi</td><td class="n">9 000 000</td><td class="n">4 000 000</td><td class="n">2 000 000</td><td class="n">3 000 000</td><td class="n">18 000 000</td></tr>
<tr><td>Andel</td><td class="n">50 %</td><td class="n">22,22 %</td><td class="n">11,11 %</td><td class="n">16,67 %</td><td class="n">100 %</td></tr>
<tr><td>Gjeld henført</td><td class="n">3 600 000</td><td class="n">1 600 000</td><td class="n">800 000</td><td class="n">1 200 000</td><td class="n">7 200 000</td></tr>
<tr><td>Reduksjon</td><td class="n">0</td><td class="n">320 000</td><td class="n">160 000</td><td class="n">0</td><td class="n">480 000</td></tr></table>
<p>Reduksjonen er 1 600 000 × 20 % + 800 000 × 20 % = 320 000 + 160 000 = <b>kr 480 000</b>. Fradragsberettiget gjeld blir 7 200 000 − 480 000 = 6 720 000.</p>`,
      check: `<p>De henførte beløpene summerer til hele gjelden: 3 600 000 + 1 600 000 + 800 000 + 1 200 000 = 7 200 000. Aggregatformelen på én linje: 7 200 000 × (4 000 000 × 20 % + 2 000 000 × 20 %)/18 000 000 = 7 200 000 × 1 200 000/18 000 000 = 480 000.</p>`,
      traps: [
        "Fordelt gjelden etter formuesverdiene: 7 200 000 × 4 800 000/10 050 000 × 20 % = 687 761.",
        "Latt gjelden følge pantet: hele lånet havner på primærboligen, som ikke gir reduksjon. Fordelingen ser bort fra pantet.",
        null,
        "Redusert også boliggjelden med 75 %: 480 000 + 3 600 000 × 75 % = 3 180 000.",
      ],
    },
    {
      id: "formuesskatt-5",
      title: "Nettoformuen og skatten med gjeldsreduksjon",
      theory: `<p>Nå settes alt sammen i én tabell med en kolonne per eiendel: bruttoverdi, andel, formuesverdi, gjeld henført, fradragsberettiget gjeld og netto. Nettoformuen er summen av formuesverdiene minus den fradragsberettigede gjelden. En kolonne kan bli negativ, typisk primærboligen. Den motregnes mot de andre. Først når W er funnet, trekkes bunnfradraget fra.</p>
<div class="formula"><div class="eq">W = Σformuesverdi<sub>i</sub> − (G − reduksjon)</div><div class="where">Rekkefølgen er fast: verdsett, fordel gjelden etter bruttoverdi, reduser gjelden på rabatterte eiendeler unntatt primærboligen og trekk fra. Bruk B og τ<sub>w</sub> til slutt <b>[dagens regel]</b>.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>En enslig har primærbolig 5 000 000, aksjer 12 000 000, bank 3 000 000 og gjeld 4 000 000. Andelene er 25 %, 60 % og 15 %, så gjelden henføres med 1 000 000, 2 400 000 og 600 000.</p><p>Formuesverdi: 1 250 000 + 9 600 000 + 3 000 000 = 13 850 000. Fradragsberettiget gjeld: 1 000 000 + 2 400 000 × 80 % + 600 000 = 1 000 000 + 1 920 000 + 600 000 = 3 520 000.</p><p>W = 13 850 000 − 3 520 000 = 10 330 000. Skatt: 1,0 % × (10 330 000 − 1 900 000) = <b>84 300 kr</b>.</p></div>`,
      q: `<p>Hanne er enslig og har kr 6 000 000 i gjeld. Ved årsskiftet eier hun en primærbolig med markedsverdi kr 8 000 000, børsnoterte aksjer verdt kr 10 000 000 og kr 2 000 000 i bankinnskudd. Primærboligen verdsettes til 25 %, aksjene til 80 % og bankinnskuddet til 100 %. Gjelden fordeles forholdsmessig etter bruttoverdi. Gjeld henført til aksjene reduseres med 20 %, gjeld henført til primærboligen reduseres ikke. Formuesskatten er 1,0 % av nettoformuen over bunnfradraget på kr 1 900 000 [dagens regel, 2026]. Hva betaler Hanne i formuesskatt?</p>`,
      options: ["kr 121 000", "kr 41 000", "kr 65 000", "kr 47 000"],
      answer: 3,
      solution: `<table class="data"><tr><th></th><th>Primærbolig</th><th>Aksjer</th><th>Bank</th><th>Sum</th></tr>
<tr><td>Bruttoverdi</td><td class="n">8 000 000</td><td class="n">10 000 000</td><td class="n">2 000 000</td><td class="n">20 000 000</td></tr>
<tr><td>Andel</td><td class="n">40 %</td><td class="n">50 %</td><td class="n">10 %</td><td class="n">100 %</td></tr>
<tr><td>Formuesverdi</td><td class="n">2 000 000</td><td class="n">8 000 000</td><td class="n">2 000 000</td><td class="n">12 000 000</td></tr>
<tr><td>Gjeld henført</td><td class="n">2 400 000</td><td class="n">3 000 000</td><td class="n">600 000</td><td class="n">6 000 000</td></tr>
<tr><td>Fradragsberettiget</td><td class="n">2 400 000</td><td class="n">2 400 000</td><td class="n">600 000</td><td class="n">5 400 000</td></tr>
<tr><td>Netto</td><td class="n">−400 000</td><td class="n">5 600 000</td><td class="n">1 400 000</td><td class="n">6 600 000</td></tr></table>
<p>W = 12 000 000 − 5 400 000 = 6 600 000. Formuesskatt = 1,0 % × (6 600 000 − 1 900 000) = 1,0 % × 4 700 000 = <b>kr 47 000</b>.</p>`,
      check: `<p>Kolonnene summerer: −400 000 + 5 600 000 + 1 400 000 = 6 600 000. Aggregatformelen gir den samme gjelden: 6 000 000 × (1 − 10 000 000 × 20 %/20 000 000) = 6 000 000 × 0,9 = 5 400 000. Den negative boligkolonnen er riktig og skal motregnes.</p>`,
      traps: [
        "Formuesskatt av markedsverdiene: 1,0 % × (20 000 000 − 6 000 000 − 1 900 000) = 121 000.",
        "Gjelden ikke redusert: 1,0 % × (12 000 000 − 6 000 000 − 1 900 000) = 41 000.",
        "Redusert også boliggjelden med 75 %: fradragsberettiget gjeld 600 000 + 2 400 000 + 600 000 = 3 600 000, så 1,0 % × (8 400 000 − 1 900 000) = 65 000.",
        null,
      ],
    },
    {
      id: "formuesskatt-6",
      title: "Ektefeller: alt slås sammen, B og K dobles",
      theory: `<p>Ektefeller skattlegges under ett. Eiendelene og gjelden til begge legges sammen. Den samlede gjelden fordeles over alle eiendelene, uansett hvem som eier hva. Bunnfradraget og innslagspunktet for 1,1 % dobles og brukes på parets samlede nettoformue. Verdsettingen er den samme som for en enslig: terskelen på 14 000 000 for primærboligen gjelder boligen og dobles ikke.</p>
<div class="formula"><div class="eq">Formuesskatt<sub>ektepar</sub> = 1,0 % × (min(W, 2K) − 2B) + 1,1 % × max(0, W − 2K)</div><div class="where">W er parets samlede nettoformue. 2026 <b>[dagens regel]</b>: 2B = 3 800 000 kr og 2K = 43 000 000 kr.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Et ektepar har samlet nettoformue 12 000 000. Formuesskatt: 1,0 % × (12 000 000 − 3 800 000) = <b>82 000 kr</b> til sammen.</p></div>`,
      q: `<p>Lene og Martin er gift og skattlegges under ett. De eier primærboligen sammen, med beregnet omsetningsverdi kr 16 000 000. Lene eier børsnoterte aksjer verdt kr 35 000 000. Martin har kr 2 500 000 i banken. De har ingen gjeld. Primærbolig verdsettes til 25 % av verdien opp til kr 14 000 000 og til 70 % av verdien over, aksjer til 80 % og bankinnskudd til 100 %. For en enslig er formuesskatten 1,0 % av nettoformuen mellom bunnfradraget kr 1 900 000 og innslagspunktet kr 21 500 000. Over innslagspunktet er satsen 1,1 %. For ektefeller som skattlegges under ett, dobles bunnfradraget og innslagspunktet [dagens regel, 2026]. Hva betaler de til sammen i formuesskatt?</p>`,
      options: ["kr 329 900", "kr 307 000", "kr 316 000", "kr 335 000"],
      answer: 2,
      solution: `<p>Primærbolig: 25 % × 14 000 000 + 70 % × 2 000 000 = 3 500 000 + 1 400 000 = 4 900 000. Aksjer: 35 000 000 × 80 % = 28 000 000. Bank: 2 500 000.</p><p>Samlet nettoformue: 4 900 000 + 28 000 000 + 2 500 000 = 35 400 000. Det er under 2K = 43 000 000, så hele grunnlaget får 1,0 %.</p><p>Formuesskatt = 1,0 % × (35 400 000 − 3 800 000) = 1,0 % × 31 600 000 = <b>kr 316 000</b>.</p>`,
      check: `<p>Del formuen likt og regn hver ektefelle som enslig: 35 400 000/2 = 17 700 000 hver, under 21 500 000. 2 × 1,0 % × (17 700 000 − 1 900 000) = 2 × 158 000 = 316 000. Samme tall, fordi doble grenser på samlet formue er det samme som enkle grenser på hver halvdel.</p>`,
      traps: [
        "Doblet bunnfradraget, men ikke innslagspunktet: 1,0 % × (21 500 000 − 3 800 000) + 1,1 % × (35 400 000 − 21 500 000) = 177 000 + 152 900 = 329 900.",
        "Doblet også boligterskelen til 28 000 000, så hele boligen fikk 25 %: 1,0 % × (34 500 000 − 3 800 000) = 307 000.",
        null,
        "Doblet innslagspunktet, men ikke bunnfradraget: 1,0 % × (35 400 000 − 1 900 000) = 335 000.",
      ],
    },
    {
      id: "formuesskatt-7",
      title: "Hva gjeldsreduksjonen gjør med skatten",
      theory: `<p>Uten gjeldsreduksjon trekkes hele gjelden fra. Da virker rabatten to ganger. Med reduksjonen faller fradraget med reduksjonsbeløpet, så nettoformuen stiger like mye og skatten stiger med τ<sub>w</sub> × reduksjonen, så lenge W ligger over B og under K i begge tilfeller. Den som bare har primærbolig, merker ingenting (H2016 oppgave 2b). Etter dagens regler gjelder det samme for sekundærbolig og bank, fordi ingen av dem utløser reduksjon. De to reglene gir ulike svar, så oppgaven må si hvilken som gjelder. H2025 oppgave 2 sa det ikke. Sensor godtok derfor begge svarene. I denne stigen sier oppgaven alltid fra.</p>
<div class="formula"><div class="eq">ΔFormuesskatt = τ<sub>w</sub> × reduksjon = τ<sub>w</sub> × G × Σ<sub>rabatterte</sub>(BV<sub>i</sub> × ρ<sub>i</sub>)/ΣBV</div><div class="where">Gjelder når nettoformuen ligger mellom B og K både med og uten reduksjon. H2016 oppgave 2a regnet skatten før og etter at reduksjonen ble innført.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>En enslig har primærbolig 4 000 000, aksjer 8 000 000 og gjeld 3 000 000. Gjeld henført til aksjene: 3 000 000 × 8/12 = 2 000 000, reduksjon 400 000. Formuesverdi: 1 000 000 + 6 400 000 = 7 400 000.</p><p>Uten reduksjon: W = 4 400 000, skatt 25 000. Med reduksjon: W = 4 800 000, skatt 29 000. Skatten stiger med <b>4 000 kr</b>, som er 1,0 % × 400 000.</p></div>`,
      q: `<p>Eirik er enslig og har kr 6 000 000 i gjeld. Ved årsskiftet eier han en primærbolig med markedsverdi kr 6 000 000, et rent aksjefond verdt kr 9 000 000 og kr 3 000 000 i bankinnskudd. Primærboligen verdsettes til 25 %, aksjefondet til 80 % og bankinnskuddet til 100 %. Formuesskatten er 1,0 % av nettoformuen over bunnfradraget på kr 1 900 000 [dagens regel, 2026]. Sammenlign to regler. Etter regel 1 trekkes hele gjelden fra. Etter regel 2 fordeles gjelden forholdsmessig etter bruttoverdi, gjeld henført til aksjefondet reduseres med 20 % og gjeld henført til primærboligen reduseres ikke. Hvor mye høyere blir Eiriks formuesskatt etter regel 2 enn etter regel 1?</p>`,
      options: ["kr 21 000", "kr 600 000", "kr 7 385", "kr 6 000"],
      answer: 3,
      solution: `<p>Formuesverdi: 6 000 000 × 25 % + 9 000 000 × 80 % + 3 000 000 = 1 500 000 + 7 200 000 + 3 000 000 = 11 700 000.</p><p>Regel 1: W = 11 700 000 − 6 000 000 = 5 700 000. Skatt: 1,0 % × (5 700 000 − 1 900 000) = 38 000.</p><p>Regel 2: bruttoverdi 18 000 000, aksjefondets andel 50 %, gjeld henført 3 000 000 og reduksjon 3 000 000 × 20 % = 600 000. W = 11 700 000 − 5 400 000 = 6 300 000. Skatt: 1,0 % × (6 300 000 − 1 900 000) = 44 000.</p><p>Forskjell: 44 000 − 38 000 = <b>kr 6 000</b>.</p>`,
      check: `<p>Snarveien: 1,0 % × 600 000 = 6 000. Den gjelder her fordi W ligger over bunnfradraget under begge reglene. Hadde W uten reduksjon ligget under 1 900 000, ville økningen vært mindre enn 1,0 % av reduksjonen.</p>`,
      traps: [
        "Redusert også boliggjelden med 75 %: reduksjon 600 000 + 2 000 000 × 75 % = 2 100 000, så 1,0 % × 2 100 000 = 21 000.",
        "Svart med selve gjeldsreduksjonen, 3 000 000 × 20 % = 600 000, i stedet for med endringen i skatt.",
        "Fordelt gjelden etter formuesverdiene: 6 000 000 × 7 200 000/11 700 000 × 20 % = 738 462 i reduksjon, så 1,0 % × 738 462 = 7 385.",
        null,
      ],
    },
    {
      id: "formuesskatt-8",
      title: "Eksamensnivå: nettoformuen med to eiendeler (H2025 oppgave 2)",
      theory: `<p>H2025 oppgave 2 ga gjeld, en primærbolig og aksjefondsandeler. Den spurte etter skattepliktig nettoformue uten bunnfradrag. Alternativene var svaret med reduksjon, svaret uten reduksjon og speilbildene av dem med motsatt fortegn. Fordi oppgaven ikke sa om gjelden skulle reduseres, godtok sensor både 750 000 og 250 000. Sier oppgaven at reduksjonen skal brukes, er bare det ene riktig. Speilbildene stryker du så snart formuesverdien er større enn gjelden.</p>
<div class="formula"><div class="eq">W = Σformuesverdi − [G<sub>bolig</sub> + G<sub>fond</sub> × (1 − ρ)]</div><div class="where">Med to eiendeler er G<sub>bolig</sub> = G × BV<sub>bolig</sub>/ΣBV og G<sub>fond</sub> = G − G<sub>bolig</sub>. Forskjellen mellom svaret med og uten reduksjon er G<sub>fond</sub> × ρ.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Gjeld 1 500 000, primærbolig 4 000 000 (75 % rabatt) og aksjefond 2 000 000 (20 % rabatt). Gjelden fordeles 2/3 og 1/3: 1 000 000 og 500 000.</p><p>Formuesverdi: 1 000 000 + 1 600 000 = 2 600 000. Fradragsberettiget gjeld: 1 000 000 + 400 000 = 1 400 000. W = <b>1 200 000</b>. Uten reduksjon blir det 2 600 000 − 1 500 000 = 1 100 000. Forskjellen er 500 000 × 20 % = 100 000.</p></div>`,
      q: `<p>Ragnhild har kr 5 000 000 i gjeld. Formuen hennes før verdsettingsrabatter er kr 15 000 000. Primærboligen har markedsverdi kr 9 000 000 og 75 % verdsettingsrabatt. Aksjefondsandelene har markedsverdi kr 6 000 000 og 20 % verdsettingsrabatt. Gjelden skal fordeles forholdsmessig etter bruttoverdi. Gjeld henført til aksjefondsandelene skal reduseres med verdsettingsrabatten, mens gjeld henført til primærboligen ikke skal reduseres. Hva er Ragnhilds skattepliktige nettoformue? Se bort fra bunnfradrag.</p>`,
      options: ["kr 2 050 000", "kr 2 450 000", "kr −2 450 000", "kr −2 050 000"],
      answer: 1,
      solution: `<table class="data"><tr><th></th><th>Primærbolig</th><th>Aksjefond</th><th>Sum</th></tr>
<tr><td>Bruttoverdi</td><td class="n">9 000 000</td><td class="n">6 000 000</td><td class="n">15 000 000</td></tr>
<tr><td>Andel</td><td class="n">60 %</td><td class="n">40 %</td><td class="n">100 %</td></tr>
<tr><td>Formuesverdi</td><td class="n">2 250 000</td><td class="n">4 800 000</td><td class="n">7 050 000</td></tr>
<tr><td>Gjeld henført</td><td class="n">3 000 000</td><td class="n">2 000 000</td><td class="n">5 000 000</td></tr>
<tr><td>Fradragsberettiget</td><td class="n">3 000 000</td><td class="n">1 600 000</td><td class="n">4 600 000</td></tr>
<tr><td>Netto</td><td class="n">−750 000</td><td class="n">3 200 000</td><td class="n">2 450 000</td></tr></table>
<p>Nettoformue: 7 050 000 − 4 600 000 = <b>kr 2 450 000</b>.</p>`,
      check: `<p>Forskjellen til svaret uten reduksjon er nøyaktig reduksjonen: 2 450 000 − 2 050 000 = 400 000 = 2 000 000 × 20 %. Aggregatformelen: 5 000 000 × (1 − 6 000 000 × 20 %/15 000 000) = 5 000 000 × 0,92 = 4 600 000. Formuesverdien 7 050 000 er større enn gjelden 5 000 000, så de negative tallene kan strykes uten regning.</p>`,
      traps: [
        "Gjelden ikke redusert: 7 050 000 − 5 000 000 = 2 050 000. Det ble godtatt i H2025 fordi oppgaven ikke sa noe, men denne oppgaven sier at reduksjonen skal brukes.",
        null,
        "Riktig tall med snudd fortegn, altså gjeld minus formue: 4 600 000 − 7 050 000 = −2 450 000.",
        "Gjelden ikke redusert og fortegnet snudd: 5 000 000 − 7 050 000 = −2 050 000.",
      ],
    },
    {
      id: "formuesskatt-9",
      title: "Eksamensnivå: tre eiendeler og terskelen for 2026 (H2024 oppgave 6)",
      theory: `<p>H2024 oppgave 6 ga gjeld, en primærbolig, aksjer og bankinnskudd, sa uttrykkelig at gjelden på primærboligen ikke skulle reduseres og spurte først etter reduksjonen og så etter nettoformuen. Med 2026-reglene får primærboligen to sjikt, men i fordelingsnøkkelen teller den med hele bruttoverdien. Gjelden henført dit reduseres fortsatt ikke. Lag et bånd før du regner ferdig. Uten reduksjon er W = Σformuesverdi − G. Med full reduksjon ligger W like mye høyere som reduksjonen.</p>
<div class="formula"><div class="eq">Σformuesverdi − G ≤ W ≤ Σformuesverdi − G + Σ<sub>rabatterte</sub> G<sub>i</sub> × ρ<sub>i</sub></div><div class="where">Når oppgaven sier at reduksjonen skal brukes, ligger svaret i toppen av båndet. Et alternativ utenfor båndet er en metodefeil som du kan stryke før du har regnet ferdig.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Gjeld 2 000 000, primærbolig 3 000 000, aksjer 1 500 000 og bank 500 000. Andelene er 60 %, 30 % og 10 %, så gjelden henføres med 1 200 000, 600 000 og 200 000.</p><p>Reduksjon: 600 000 × 20 % = 120 000. Formuesverdi: 750 000 + 1 200 000 + 500 000 = 2 450 000. Båndet går fra 450 000 til 570 000. W = 2 450 000 − 1 880 000 = <b>570 000</b>.</p></div>`,
      q: `<p>Bjørnar har kr 9 600 000 i gjeld ved årsskiftet. Han har en formue før verdsettingsrabatter på kr 24 000 000: en primærbolig med beregnet omsetningsverdi kr 16 000 000, aksjer med markedsverdi kr 6 000 000 og kr 2 000 000 i bankinnskudd. Primærbolig verdsettes til 25 % av verdien opp til kr 14 000 000 og til 70 % av verdien over [dagens regel, 2026]. Aksjer har 20 % verdsettingsrabatt. Gjelden fordeles forholdsmessig etter bruttoverdi og reduseres med verdsettingsrabattene, men gjeld henført til primærboligen skal ikke reduseres. Hva er Bjørnars nettoformue før bunnfradraget?</p>`,
      options: ["kr 2 580 000", "kr 2 100 000", "kr 7 380 000", "kr 1 680 000"],
      answer: 0,
      solution: `<p>Primærboligens formuesverdi: 25 % × 14 000 000 + 70 % × 2 000 000 = 3 500 000 + 1 400 000 = 4 900 000.</p>
<table class="data"><tr><th></th><th>Primærbolig</th><th>Aksjer</th><th>Bank</th><th>Sum</th></tr>
<tr><td>Bruttoverdi</td><td class="n">16 000 000</td><td class="n">6 000 000</td><td class="n">2 000 000</td><td class="n">24 000 000</td></tr>
<tr><td>Andel</td><td class="n">66,67 %</td><td class="n">25 %</td><td class="n">8,33 %</td><td class="n">100 %</td></tr>
<tr><td>Formuesverdi</td><td class="n">4 900 000</td><td class="n">4 800 000</td><td class="n">2 000 000</td><td class="n">11 700 000</td></tr>
<tr><td>Gjeld henført</td><td class="n">6 400 000</td><td class="n">2 400 000</td><td class="n">800 000</td><td class="n">9 600 000</td></tr>
<tr><td>Fradragsberettiget</td><td class="n">6 400 000</td><td class="n">1 920 000</td><td class="n">800 000</td><td class="n">9 120 000</td></tr>
<tr><td>Netto</td><td class="n">−1 500 000</td><td class="n">2 880 000</td><td class="n">1 200 000</td><td class="n">2 580 000</td></tr></table>
<p>Bare aksjegjelden reduseres: 2 400 000 × 20 % = 480 000. Nettoformue: 11 700 000 − 9 120 000 = <b>kr 2 580 000</b>.</p>`,
      check: `<p>Båndet: uten reduksjon er W = 11 700 000 − 9 600 000 = 2 100 000. Største mulige reduksjon er 480 000, så W ligger mellom 2 100 000 og 2 580 000. Kolonnene summerer: −1 500 000 + 2 880 000 + 1 200 000 = 2 580 000. Aggregatformelen: 9 600 000 × (1 − 6 000 000 × 20 %/24 000 000) = 9 600 000 × 0,95 = 9 120 000.</p>`,
      traps: [
        null,
        "Gjelden ikke redusert: 11 700 000 − 9 600 000 = 2 100 000. Det er bunnen av båndet.",
        "Redusert også boliggjelden med 75 %: fradragsberettiget gjeld 1 600 000 + 1 920 000 + 800 000 = 4 320 000, så 11 700 000 − 4 320 000 = 7 380 000.",
        "Brukt 25 % på hele boligen, som om terskelen ikke fantes: 4 000 000 + 4 800 000 + 2 000 000 − 9 120 000 = 1 680 000.",
      ],
    },
    {
      id: "formuesskatt-10",
      title: "Eksamensnivå: nedbetale gjeld med bankinnskudd (H2017 oppgave 1)",
      theory: `<p>H2017 oppgave 1 endte i en beslutning: bør du bruke bankinnskuddet til å nedbetale gjeld? Uten gjeldsreduksjon skjer ingenting, for formuen og gjelden faller like mye. Med reduksjonen er det annerledes. Reduksjonen er R × G/ΣBV, der R er summen av bruttoverdi × rabatt over eiendelene som utløser reduksjon. Nedbetalingen senker gjeldsgraden G/ΣBV, så reduksjonen blir mindre og nettoformuen lavere. Formuesskatten belønner altså å eie det rabatterte og betale ned med det urabatterte.</p>
<div class="formula"><div class="eq">W = Σformuesverdi − G + R × G/ΣBV</div><div class="eq">ΔW = R × (G<sub>etter</sub>/ΣBV<sub>etter</sub> − G<sub>før</sub>/ΣBV<sub>før</sub>)</div><div class="where">Bankinnskuddet D faller ut av både Σformuesverdi og ΣBV. G faller også med D, så de to første leddene endres like mye. Endringen i skatt er τ<sub>w</sub> × ΔW når W ligger over B og under K både før og etter. Primærboligen er ikke med i R.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>En enslig har primærbolig 4 000 000, aksjer 8 000 000, bank 4 000 000 og gjeld 4 000 000. R = 8 000 000 × 20 % = 1 600 000.</p><p>Før: gjeldsgrad 4/16 = 25 %, reduksjon 400 000, W = 11 400 000 − 4 000 000 + 400 000 = 7 800 000, skatt 59 000.</p><p>Hun betaler ned all gjelden med banken. Etter: W = 7 400 000, skatt 55 000. Skatten faller med <b>4 000 kr</b>, selv om formuen og gjelden falt like mye.</p></div>`,
      q: `<p>Synne er enslig og eier en primærbolig med markedsverdi kr 5 000 000, børsnoterte aksjer verdt kr 15 000 000 og kr 5 000 000 i bankinnskudd. Gjelden hennes er kr 10 000 000. Hun vurderer å bruke hele bankinnskuddet til å nedbetale kr 5 000 000 av gjelden før årsskiftet. Verdiene er de samme ved årsskiftet. Se bort fra renter. Primærboligen verdsettes til 25 %, aksjene til 80 % og bankinnskuddet til 100 %. Gjelden fordeles forholdsmessig etter bruttoverdi. Gjeld henført til aksjene reduseres med 20 %, gjeld henført til primærboligen reduseres ikke. Formuesskatten er 1,0 % av nettoformuen over bunnfradraget på kr 1 900 000 [dagens regel, 2026]. Hvordan endres formuesskatten hennes hvis hun nedbetaler, sammenlignet med om hun lar være?</p>`,
      options: ["Den er uendret", "Den faller med kr 4 500", "Den faller med kr 10 125", "Den faller med kr 4 094"],
      answer: 1,
      solution: `<table class="data"><tr><th></th><th>Uten nedbetaling</th><th>Med nedbetaling</th></tr>
<tr><td>Bruttoverdi i alt</td><td class="n">25 000 000</td><td class="n">20 000 000</td></tr>
<tr><td>Gjeld</td><td class="n">10 000 000</td><td class="n">5 000 000</td></tr>
<tr><td>Gjeld henført til aksjene</td><td class="n">6 000 000</td><td class="n">3 750 000</td></tr>
<tr><td>Reduksjon (20 %)</td><td class="n">1 200 000</td><td class="n">750 000</td></tr>
<tr><td>Fradragsberettiget gjeld</td><td class="n">8 800 000</td><td class="n">4 250 000</td></tr>
<tr><td>Formuesverdi</td><td class="n">18 250 000</td><td class="n">13 250 000</td></tr>
<tr><td>Nettoformue</td><td class="n">9 450 000</td><td class="n">9 000 000</td></tr>
<tr><td>Formuesskatt</td><td class="n">75 500</td><td class="n">71 000</td></tr></table>
<p>Uten nedbetaling: aksjenes andel er 15/25 = 60 %, så 6 000 000 av gjelden henføres dit. Formuesverdi 1 250 000 + 12 000 000 + 5 000 000 = 18 250 000.</p><p>Med nedbetaling: aksjenes andel er 15/20 = 75 % av 5 000 000 = 3 750 000. Formuesverdi 1 250 000 + 12 000 000 = 13 250 000.</p><p>Skatten går fra 75 500 til 71 000. <b>Den faller med kr 4 500.</b></p>`,
      check: `<p>Formelen: R = 15 000 000 × 20 % = 3 000 000. Gjeldsgraden faller fra 10/25 = 40 % til 5/20 = 25 %, så ΔW = 3 000 000 × (25 % − 40 %) = −450 000 og skatten faller med 1,0 % × 450 000 = 4 500. Formuen og gjelden falt begge med 5 000 000. Det eneste som endret seg, er reduksjonen, fra 1 200 000 til 750 000.</p>`,
      traps: [
        "Glemt gjeldsreduksjonen: da faller formuen og gjelden like mye. W er 8 250 000 både før og etter.",
        null,
        "Redusert også boliggjelden med 75 %: R blir 3 000 000 + 5 000 000 × 75 % = 6 750 000, så ΔW = 6 750 000 × (25 % − 40 %) = −1 012 500 og skatten faller med 10 125.",
        "Fordelt gjelden etter formuesverdiene: reduksjonen faller fra 1 315 068 til 905 660, så skatten faller med 1,0 % × 409 408 = 4 094.",
      ],
    },
  ],
});
