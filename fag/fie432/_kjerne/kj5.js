/* kj5 · Hvem betaler skatten: insidens */
window.EDU_DATA.kjerne.push({
  id: "kj5",
  num: 5,
  title: "Hvem betaler skatten: insidens",
  chapters: [11],
  html: `
<p class="lead-in">Stykkskatt-insidens er kursets mest testede enkelttema: åtte av ni sett, 11,6 % av poengene i snitt og 19 % i H2024. H2024 oppgave 8 ba deg peke ut ∂p/∂t og ∂P/∂t blant fire nesten like brøker; H2025 oppgave 8 ga grensetilfeller med tall. Begge hviler på én utledning og én kontroll.</p>

<h3>Kilen og utledningen</h3>
<p>En stykkskatt på t kroner per enhet kreves inn av produsentene. Kjøperen betaler konsumentprisen P, selgeren beholder produsentprisen p, og skatten er kilen mellom dem:</p>
<div class="formula"><div class="eq">P = p + t og likevekten D(p + t) = S(p)</div>
<div class="where">D er etterspurt mengde ved prisen kjøperen møter, S tilbudt mengde ved prisen selgeren møter.</div></div>
<p>Deriver likevekten med hensyn på t. Argumentet p + t endrer seg med ∂p/∂t + 1:</p>
<div class="formula">
<div class="eq">D′ × (∂p/∂t + 1) = S′ × ∂p/∂t ⟹ D′ = (S′ − D′) × ∂p/∂t</div>
<div class="eq">∂p/∂t = D′/(S′ − D′)</div>
<div class="eq">∂P/∂t = ∂p/∂t + 1 = S′/(S′ − D′)</div>
<div class="where">Samle leddene med ∂p/∂t på én side og del. Konsumentprisen følger av kilen: legg til 1 skrevet som (S′ − D′)/(S′ − D′). Brøkene skiller seg bare i telleren: D′ for produsentprisen, S′ for konsumentprisen.</div></div>
<div class="callout mech"><span class="h">Hvorfor spiller det ingen rolle hvem skatten legges på?</span>Legg skatten på kjøperen i stedet. Han betaler p til selgeren og t til staten, altså P = p + t igjen, og likevekten er den samme ligningen. Formell insidens (hvem loven peker på) avgjør derfor ikke reell insidens (hvem som får lavere velferd); det gjør helningene.</div>

<h3>Fortegnene og kontrollen</h3>
<p>D′ &lt; 0 og S′ &gt; 0 alltid. Da er nevneren S′ − D′ = S′ + |D′| positiv, ∂p/∂t ligger mellom −1 og 0, og ∂P/∂t mellom 0 og 1. Fordi P − p = t, holder kontrollen for alle kurver:</p>
<div class="formula">
<div class="eq">∂P/∂t − ∂p/∂t = 1</div>
<div class="eq">Kjøperens andel = ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|) · selgerens andel = |ε<sub>D</sub>|/(ε<sub>S</sub> + |ε<sub>D</sub>|)</div>
<div class="where">Andelene summerer til 1. Med ε = helning × p/x er p/x felles i utgangspunktet og forkortes bort.</div></div>
<p>Slik stryker du de gale brøkene i H2024 oppgave 8a, som spør etter ∂p/∂t. Sett inn D′ = −2 og S′ = 3 [eksempeltall]; nevneren blir 3 − (−2) = 5:</p>
<table class="data">
<tr><th>Alternativ</th><th>Verdi</th><th>Dom</th></tr>
<tr><td>D′/(S′ − D′)</td><td class="n">−0,40</td><td>riktig: mellom −1 og 0</td></tr>
<tr><td>S′/(S′ − D′)</td><td class="n">0,60</td><td>positiv; det er ∂P/∂t, svaret på 8b</td></tr>
<tr><td>D′/S′</td><td class="n">−0,67</td><td>nevneren mangler D′; paret med S′/S′ = 1 gir differansen 1,67 ≠ 1</td></tr>
<tr><td>(D′ − S′)/(S′ − D′)</td><td class="n">−1,00</td><td>alltid −1, en konstant</td></tr>
</table>
<p>Kontroll: 0,60 − (−0,40) = 1,00 ✓. I 8b var fella (S′ − D′)/S′ = 5/3 = 1,67, over 1 og altså umulig.</p>

<h3>Grensetilfellene og elastisitetsregelen</h3>
<table class="data">
<tr><th>Tilfelle</th><th>∂P/∂t</th><th>∂p/∂t</th><th>Bærer skatten</th></tr>
<tr><td>Perfekt uelastisk etterspørsel, D′ = 0 (insulin)</td><td class="n">1</td><td class="n">0</td><td>kjøperen</td></tr>
<tr><td>Perfekt elastisk tilbud, S′ → ∞ (gitt verdenspris)</td><td class="n">1</td><td class="n">0</td><td>kjøperen</td></tr>
<tr><td>Perfekt uelastisk tilbud, S′ = 0 (fast tomt)</td><td class="n">0</td><td class="n">−1</td><td>selgeren</td></tr>
<tr><td>Perfekt elastisk etterspørsel, D′ → −∞</td><td class="n">0</td><td class="n">−1</td><td>selgeren</td></tr>
</table>
<p>Les ordlyden: «kan ikke endre forbruket» betyr D′ = 0, og en fast pris tilbyderne leverer så mye som helst til (gitt verdenspris, konstant grensekostnad) betyr S′ → ∞. H2022 oppgave 3 kombinerte de to.</p>
<div class="callout mech"><span class="h">Hvorfor bærer den minst elastiske siden skatten?</span>Prisfølsomhet er det samme som å ha et alternativ. Kan kjøperen droppe varen, tør ikke selgeren velte skatten over; må han ha den, som insulin, kan alt veltes over. Kan produsenten flytte kapitalen, bærer kjøperen; sitter han fast, som med en tomt, bærer han selv.</div>
<p>H2025 oppgave 8 hadde likevektspris kr 1,50 og skatt kr 0,50 på tilbyderne. Perfekt uelastisk etterspørsel gir P = 1,50 + 0,50 = kr 2,00 og p = kr 1,50; perfekt elastisk etterspørsel gir P = kr 1,50 og p = 1,50 − 0,50 = kr 1,00. De gale alternativene i 8a (2,50, 3,00 og 3,50) ligger over taket 1,50 + 0,50 = 2,00.</p>

<h3>Dødvektstap, monopol og kapitalisering</h3>
<div class="formula"><div class="eq">Proveny = t × x<sub>t</sub> · dødvektstap ≈ ½ × t × (x<sub>0</sub> − x<sub>t</sub>) = ½ × t² × |S′D′|/(S′ − D′)</div>
<div class="where">x<sub>0</sub> er kvantumet før skatten, x<sub>t</sub> etter. Tapet er handler som ikke lenger blir gjort, så det er null når én side er perfekt uelastisk, og det vokser med kvadratet av skatten.</div></div>

<div class="worked"><span class="wh">Gjennomregnet: forelesningens skatt på 1 krone</span>
<p>Før skatt er prisen 5,00 og kvantumet 100. En stykkskatt på 1 krone på produsentene gir P = 5,60 og x = 90 [eksempeltall fra forelesningen].</p>
<p><b>Steg 1, delingen.</b> p = 5,60 − 1 = 4,60. Kjøperen betaler 5,60 − 5,00 = 0,60 mer, selgeren får 5,00 − 4,60 = 0,40 mindre, og 0,60 + 0,40 = 1,00 = t ✓.</p>
<p><b>Steg 2, helningene mot formelen.</b> D′ = (90 − 100)/0,60 = −16,67 og S′ = (90 − 100)/(−0,40) = 25. Nevneren er 25 + 16,67 = 41,67, så ∂P/∂t = 25/41,67 = 0,60 og ∂p/∂t = −16,67/41,67 = −0,40 ✓.</p>
<p><b>Steg 3, proveny og dødvektstap.</b> Proveny 1 × 90 = 90. Dødvektstap ½ × 1 × (100 − 90) = 5.</p>
<p><b>Kontroll, velferdsregnskapet.</b> Kjøperne taper 0,60 × 90 + ½ × 0,60 × 10 = 54 + 3 = 57, selgerne 0,40 × 90 + ½ × 0,40 × 10 = 36 + 2 = 38. Samlet 57 + 38 = 95, hvorav staten får 90, og 95 − 90 = 5 ✓.</p>
<p><b>De gale tallene:</b> proveny med gammelt kvantum gir 100, dødvektstap uten halvparten gir 10, kjøpernes tap uten trekanten gir 54, og selgerens byrde satt lik kilen gir 1,00.</p>
</div>

<p><b>Monopol.</b> Skatten løfter grensekostnaden, og med lineær etterspørsel og konstant grensekostnad stiger prisen med nøyaktig halve skatten. H2021 oppgave 2: P = 3 − Q og grensekostnad 1 gir P = 2,00 uten skatt og 2,50 med t = 1, ikke 3,00: med lineær etterspørsel velter monopolisten aldri hele skatten over. Under oligopol finnes ingen entydig regel.</p>
<p><b>Kapitalisering.</b> En ventet framtidig skatt slår inn i prisen på aktivumet allerede i dag, som eiendomsskatt i hytteprisene. Selskapsskatten betales formelt av selskapet, men etter Harberger bæres mest av kapitalen.</p>

<div class="callout warn"><span class="h">Feilene som koster poeng</span>Store P og lille p er ikke samme spørsmål: fasiten på det ene står som alternativ i det andre (H2024 8a og 8b, H2025 8b og 8c). Skriv ned hvilken pris det spørres om. Et positivt ∂p/∂t og et ∂P/∂t over 1 strykes uten regning, og en konstant strykes når oppgaven spør etter det generelle uttrykket (i et grensetilfelle er svaret nettopp en konstant). Proveny regnes av det nye kvantumet, og dødvektstapet har ½ foran.</div>

<div class="callout tip husk"><span class="h">Må kunne</span>
<ul><li>Med P = p + t (P kjøperens pris, p selgerens) og helningene D′ &lt; 0 og S′ &gt; 0 er ∂p/∂t = D′/(S′ − D′) og ∂P/∂t = S′/(S′ − D′).</li><li>Kontrollen ∂P/∂t − ∂p/∂t = 1, fordi kilen P − p alltid er t: konsumentprisen P stiger med 0 til 1 krone per krone skatt, og produsentprisen p faller med resten.</li><li>Den minst elastiske siden bærer mest; kjøperens andel er ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|), med ε<sub>S</sub> og ε<sub>D</sub> tilbuds- og etterspørselselastisiteten. D′ = 0 («kan ikke endre forbruket») eller S′ → ∞ (fast pris, som en gitt verdenspris) gir kjøperen hele skatten, S′ = 0 eller D′ → −∞ gir selgeren hele. Hvem skatten legges på, spiller ingen rolle.</li><li>Med stykkskatt t per enhet: proveny = t × nytt kvantum og dødvektstap ≈ ½ × t × kvantumsfallet, null når én side er perfekt uelastisk.</li></ul></div>
`,
  checks: [
    {
      id: "kj5-s1",
      q: "Etterspørselen etter en vare er mindre elastisk enn tilbudet, |ε<sub>D</sub>| &lt; ε<sub>S</sub>. En stykkskatt legges på selgerne. Hvem bærer mest av skatten?",
      options: [
        "Selgerne, siden det er de som betaler skatten inn til staten",
        "Selgerne, siden tilbudet er den mest prisfølsomme siden",
        "Kjøperne, siden de har færrest alternativer å gå til",
        "Begge like mye, siden kilen alltid deles på midten",
      ],
      answer: 2,
      explanation: "Kjøperens andel er ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|), som er over halvparten når |ε<sub>D</sub>| &lt; ε<sub>S</sub>: den minst elastiske siden bærer mest. Svaret om at selgerne bærer fordi de betaler inn, blander formell og reell insidens; hvem loven peker på, betyr ingenting for fordelingen.",
    },
    {
      id: "kj5-s2",
      q: "En stykkskatt t legges på produsentene, P = p + t og D(p + t) = S(p). Hvilket uttrykk er ∂P/∂t, endringen i prisen kjøperen betaler?",
      options: [
        "S′/(S′ − D′)",
        "D′/(S′ − D′)",
        "(S′ − D′)/S′",
        "−D′/(S′ − D′)",
      ],
      answer: 0,
      explanation: "∂P/∂t = ∂p/∂t + 1 = D′/(S′ − D′) + 1 = S′/(S′ − D′), som ligger mellom 0 og 1. D′/(S′ − D′) er ∂p/∂t, negativt, og hører til produsentprisen. (S′ − D′)/S′ er over 1, og −D′/(S′ − D′) er hvor mye produsentprisen faller, altså selgerens andel.",
    },
    {
      id: "kj5-s3",
      q: "Antallet tomter i en kommune kan ikke endres, så tilbudet er perfekt uelastisk. Kommunen innfører en årlig avgift per tomt som leietakerne skal betale inn. Hvem bærer avgiften?",
      options: [
        "Leietakerne, siden det er de som betaler avgiften inn",
        "Leietakerne, siden en tomt ikke har noen erstatning",
        "Ingen, siden kvantumet er uendret og tapet er null",
        "Eierne, siden leien de får, faller med hele avgiften",
      ],
      answer: 3,
      explanation: "Med S′ = 0 er ∂P/∂t = 0 og ∂p/∂t = −1: det leietakerne betaler i alt, er uendret, og leien eierne får, faller med hele avgiften. At leietakerne betaler inn, er formell insidens. At dødvektstapet er null, er riktig, men sier ingenting om hvem som bærer skatten.",
    },
    {
      id: "kj5-s4",
      q: "Tilbud og etterspørsel er lineære. Stykkskatten dobles fra t til 2t. Hva skjer med dødvektstapet?",
      options: [
        "Det dobles, i takt med skattesatsen",
        "Det øker, men mindre enn provenyet gjør",
        "Det firedobles, fordi det vokser med t²",
        "Det er uendret, fordi elastisitetene ikke endres",
      ],
      answer: 2,
      explanation: "Dødvektstapet er ½ × t² × |S′D′|/(S′ − D′), så doblet skatt gir fire ganger tapet: både høyden (kilen) og bredden (kvantumsfallet) i trekanten dobles. Provenyet øker mindre enn det dobbelte, fordi kvantumet faller, så påstanden om at tapet øker mindre enn provenyet er feil vei.",
    },
  ],
  case: {
    id: "kj5-m1",
    topic: "Stykkskatt med lineære kurver og et grensetilfelle",
    minutes: 10,
    body: `<p>Etterspørselen etter en vare er x = 2 400 − 15P og tilbudet er x = 45p − 600, der P er prisen kjøperen betaler, p prisen selgeren sitter igjen med, begge i kroner, og x er antall enheter [eksempeltall]. Uten skatt er P = p = kr 50 og x = 1 650.</p><p>Staten innfører en stykkskatt på kr 8 per enhet, innkrevd av selgerne.</p>`,
    ledd: [
      {
        id: "kj5-m1a",
        points: 3,
        q: `<p>Hva blir prisen kjøperen betaler, og hva sitter selgeren igjen med?</p>`,
        options: ["P = kr 52 og p = kr 44", "P = kr 58 og p = kr 50", "P = kr 54 og p = kr 46", "P = kr 56 og p = kr 48"],
        answer: 3,
        solution: `<p><b>Steg 1 — sett inn kilen.</b> D(p + 8) = S(p): 2 400 − 15(p + 8) = 45p − 600 gir 2 280 − 15p = 45p − 600, altså 2 880 = 60p og <b>p = kr 48</b>. Da er <b>P = 48 + 8 = kr 56</b>.</p><p><b>Steg 2 — samme svar med formlene.</b> D′ = −15 og S′ = 45, så nevneren er 45 − (−15) = 60. ∂P/∂t = 45/60 = 0,75 gir 0,75 × 8 = kr 6 opp, og ∂p/∂t = −15/60 = −0,25 gir kr 2 ned. Kjøperen bærer mest fordi etterspørselen er minst prisfølsom.</p><p><b>Kontroll:</b> 6 + 2 = 8 = t ✓, og kvantumet går opp på begge kurvene: 45 × 48 − 600 = 1 560 og 2 400 − 15 × 56 = 1 560 ✓.</p>`,
        traps: [
          "Andelene byttet om: kjøperen tildelt |D′|/(S′ − D′) = 15/60 = 25 %, altså 50 + 2 = 52 og 50 − 6 = 44.",
          "Hele skatten lagt på kjøperen, som om tilbudet var perfekt elastisk: 50 + 8 = 58, mens p står i 50.",
          "Skatten delt på midten, monopolregelen brukt i frikonkurranse: 50 + 4 = 54 og 50 − 4 = 46.",
          null,
        ],
      },
      {
        id: "kj5-m1b",
        points: 3,
        q: `<p>Hvor stort blir dødvektstapet av skatten?</p>`,
        options: ["kr 360", "kr 720", "kr 480", "kr 270"],
        answer: 0,
        solution: `<p><b>Steg 1 — kvantumsfallet.</b> Ny likevekt er P = 56 og p = 48, så x = 45 × 48 − 600 = 1 560. Fallet er 1 650 − 1 560 = 90. Kontroll: S′ × 2 = 45 × 2 = 90 og |D′| × 6 = 15 × 6 = 90 ✓.</p><p><b>Steg 2 — trekanten.</b> Høyden er hele kilen t = 8 og bredden kvantumsfallet: ½ × 8 × 90 = <b>kr 360</b>. Formelen gir det samme: ½ × 8² × (15 × 45)/60 = ½ × 64 × 11,25 = 360 ✓.</p><p><b>Kontroll — velferdsregnskapet.</b> Kjøperne taper 6 × 1 560 + ½ × 6 × 90 = 9 360 + 270 = 9 630, selgerne 2 × 1 560 + ½ × 2 × 90 = 3 120 + 90 = 3 210, samlet 12 840. Staten får 8 × 1 560 = 12 480, og 12 840 − 12 480 = 360 ✓.</p>`,
        traps: [
          null,
          "Halvparten glemt: 8 × 90 = 720 er rektangelet, ikke trekanten.",
          "Kvantumsfallet regnet som |D′| × t = 15 × 8 = 120, som om kjøperen bar hele skatten: ½ × 8 × 120 = 480.",
          "Høyden satt til kjøperens prisøkning på 6 i stedet for hele kilen på 8: ½ × 6 × 90 = 270, som er bare kjøpernes trekant.",
        ],
      },
      {
        id: "kj5-m1c",
        points: 3,
        q: `<p>Anta i stedet at varen importeres til en gitt verdenspris på kr 50, slik at tilbudet er perfekt elastisk ved den prisen. Etterspørselen er som før, og skatten er fortsatt kr 8 per enhet innkrevd av selgerne. Hva blir P og p?</p>`,
        options: ["P = kr 56 og p = kr 48", "P = kr 50 og p = kr 42", "P = kr 58 og p = kr 42", "P = kr 58 og p = kr 50"],
        answer: 3,
        solution: `<p><b>Steg 1 — grensetilfellet.</b> S′ → ∞ gir ∂P/∂t = S′/(S′ − D′) → 1 og ∂p/∂t → 0. Selgerne leverer alt til kr 50 og ingenting under, så kjøperen bærer hele skatten.</p><p><b>Steg 2 — prisene.</b> <b>P = 50 + 8 = kr 58</b> og <b>p = kr 50</b>. Kvantumet faller til 2 400 − 15 × 58 = 1 530.</p><p><b>Kontroll:</b> P − p = 58 − 50 = 8 = t ✓, og andelene er 1 + 0 = 1 ✓.</p>`,
        traps: [
          "Svaret fra forrige ledd dratt med: 56 og 48 gjelder den stigende tilbudskurven, ikke et tilbud som er perfekt elastisk.",
          "Grensetilfellet snudd: perfekt elastisk tilbud lest som at selgerne bærer alt, slik det er når tilbudet er perfekt uelastisk.",
          "Skatten trukket fra på begge sider: P opp med 8 og p ned med 8 gir en kile på 16, ikke 8.",
          null,
        ],
      },
    ],
  },
});
