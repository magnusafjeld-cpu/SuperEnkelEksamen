/* ===================== FIE432 · SJANGERTRENING =====================
   Én stige per oppgavesjanger: korte steg fra null til eksamensnivå, hvert med
   teori, et lite eksempel og én flervalgsoppgave med utregning, kontroll og
   feilene bak de gale alternativene. Motoren: js/bundle-sjangre.js.

   id-ene (sjangerens og stegenes) er lagringsnøkler. De må aldri endres; et
   steg som skrives om til en annen oppgave, får ny id.

   BYGGET FIL, ikke rediger her. Sjangrene ligger i _sjangre/*.js, og settes
   sammen med: python3 tools/bygg-sjangre.py fie432
   ============================================================================ */
window.EDU_DATA = window.EDU_DATA || {};
window.EDU_DATA.sjangre = [];
/* sjanger 1 · insidens · Hvem betaler skatten: stykkskatt og insidens */
window.EDU_DATA.sjangre.push({
  id: "insidens",
  num: 1,
  title: "Hvem betaler skatten: stykkskatt og insidens",
  summary: "Fra likevekten uten skatt til formelgjenkjenningen og grensetilfellene på eksamen",
  chapters: [11],
  exam: "8 av 9 sett · H2024 oppgave 8, H2025 oppgave 8",
  intro: `<p>Stykkskatt-insidens er kursets mest testede enkelttema: åtte av ni eksamenssett og 11,6 % av poengene. Det kommer i to former. Enten skal du peke ut ∂p/∂t eller ∂P/∂t blant fire nesten like brøker (H2024 oppgave 8), eller du skal regne prisene i et grensetilfelle (H2025 oppgave 8, H2022 oppgave 3). Stigen starter med en likevekt uten skatt og bygger utledningen, elastisitetsregelen og grensetilfellene ett steg om gangen. Etter siste steg kan du løse alle variantene settene har gitt. Du kjenner også igjen de gale alternativene før du regner.</p>`,
  steps: [
    {
      id: "insidens-1",
      title: "Likevekt og stykkskatt: P = p + t",
      theory: `<p>Etterspørselen D(P) og tilbudet S(p) sier hvor mange enheter kjøperne vil ha ved prisen P og selgerne vil selge ved prisen p. Uten skatt er P = p. Likevekten er prisen der de to mengdene er like. En stykkskatt er t kroner per solgt enhet. Legges den på tilbyderne, betaler kjøperen P, mens selgeren sender t til staten og beholder p: skatten er en kile mellom de to prisene. Kjøperne reagerer på P og selgerne på p, så den nye likevekten får du ved å sette P = p + t inn i etterspørselen og løse for p.</p>
<div class="formula"><div class="eq">Uten skatt: D(P) = S(P)</div><div class="eq">Med skatt: P = p + t og D(p + t) = S(p)</div><div class="where">P er konsumentprisen og p produsentprisen. Med lineære kurver x = a − bP og x = c + dp er helningene D′ = −b &lt; 0 og S′ = d &gt; 0. Løs for p og legg til t for å få P. Oppgaveteksten til H2024 oppgave 8 skriver likevekten som D(P) = S(p + t). Det er en skrivefeil: med P = p + t ville den gitt D(P) = S(P), uten noen virkning av skatten.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Etterspørselen er x = 500 − 20P og tilbudet x = 30p − 100. Uten skatt: 500 − 20P = 30P − 100, altså 600 = 50P og P = <b>kr 12</b>, med kvantum 500 − 20 × 12 = 260.</p><p>Nå kommer en stykkskatt t = kr 5 på tilbyderne. D(p + 5) = S(p): 500 − 20(p + 5) = 30p − 100, altså 400 − 20p = 30p − 100 og 500 = 50p. Produsentprisen blir p = <b>kr 10</b> og konsumentprisen P = 10 + 5 = <b>kr 15</b>.</p><p>Kontroll: kjøperne vil ha 500 − 20 × 15 = 200. Selgerne tilbyr 30 × 10 − 100 = 200. ✓</p></div>`,
      q: `<p>I et frikonkurransemarked er etterspørselen x = 840 − 12P og tilbudet x = 18p − 60, der P er prisen kjøperne betaler og p prisen selgerne får, i kroner [eksempeltall]. Staten innfører en stykkskatt på kr 10 per enhet, som tilbyderne betaler inn. Hva blir den nye konsumentprisen P?</p>`,
      options: ["kr 36", "kr 26", "kr 40", "kr 24"],
      answer: 0,
      solution: `<p>Sett P = p + 10 inn i etterspørselen: 840 − 12(p + 10) = 18p − 60.</p><p>Gang ut: 840 − 12p − 120 = 18p − 60, altså 720 + 60 = 30p og p = 780/30 = kr 26.</p><p>Konsumentprisen er P = p + t = 26 + 10 = <b>kr 36</b>.</p>`,
      check: `<p>Begge sider skal gi samme kvantum. Ved kr 36 vil kjøperne ha 840 − 12 × 36 = 408. Når selgerne får kr 26, tilbyr de 18 × 26 − 60 = 408. ✓ Uten skatt er prisen kr 30, fordi 840 − 12P = 18P − 60 gir 900 = 30P. Den nye prisen ligger mellom kr 30 og kr 40, altså mellom ingen og full overvelting, slik den skal når ingen av kurvene er loddrett eller vannrett.</p>`,
      traps: [
        null,
        "Svarte med produsentprisen p = 26 og glemte å legge skatten til: P = p + t = 36.",
        "Regnet ut prisen uten skatt (900/30 = kr 30) og la hele skatten oppå: 30 + 10 = 40. Da måtte produsentprisen stått på kr 30, men ved den prisen tilbyr selgerne 480 enheter, mens kjøperne bare vil ha 840 − 12 × 40 = 360 ved kr 40.",
        "Satte skatten inn på feil side, som om selgerne fikk p = P + t: 840 − 12P = 18(P + 10) − 60 gir 30P = 720 og P = 24, lavere enn prisen uten skatt.",
      ],
    },
    {
      id: "insidens-2",
      title: "Byrden: hvem bærer skatten og hvem betaler den inn",
      theory: `<p>Kilen P − p er alltid hele skatten t. Hvem som <i>bærer</i> skatten, ser du av hvor langt hver pris har flyttet seg fra prisen før skatt, P<sub>0</sub>. Kjøperne betaler P − P<sub>0</sub> mer per enhet. Selgerne får P<sub>0</sub> − p mindre. Den som betaler inn skatten (formell insidens), er ikke nødvendigvis den som bærer den (reell insidens). Legges skatten på kjøperne, betaler de p til selgeren og t til staten, så P = p + t og likevekten D(p + t) = S(p) blir den samme. Bare helningene avgjør fordelingen.</p>
<div class="formula"><div class="eq">Konsumentenes byrde = P − P<sub>0</sub> &nbsp;·&nbsp; produsentenes byrde = P<sub>0</sub> − p</div><div class="eq">(P − P<sub>0</sub>) + (P<sub>0</sub> − p) = P − p = t</div><div class="where">Andelene er (P − P<sub>0</sub>)/t og (P<sub>0</sub> − p)/t. De summerer til 100 %. P er det kjøperen betaler i alt, medregnet skatten. Produsentprisen p er det selgeren sitter igjen med. Kjenner du bare P, finner du p = P − t.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Fra forrige eksempel: P<sub>0</sub> = kr 12 og t = kr 5. Etter skatten er P = kr 15 og p = kr 10.</p><p>Konsumentene: 15 − 12 = kr 3, altså 3/5 = <b>60 %</b>. Produsentene: 12 − 10 = kr 2, altså 2/5 = <b>40 %</b>. Sum: 3 + 2 = 5 = t. ✓</p><p>Hadde kjøperne betalt inn skatten, ville de reagert på det de betaler i alt, p + 5. Ligningen 500 − 20(p + 5) = 30p − 100 er den samme, så fordelingen 60/40 er uendret.</p></div>`,
      q: `<p>Før avgiften omsettes en vare til kr 48. Staten innfører en avgift på kr 12 per enhet som <i>kjøperne</i> betaler direkte til staten, i tillegg til prisen de betaler selgeren. I den nye likevekten betaler kjøperne kr 51 per enhet i alt, avgiften medregnet [eksempeltall]. Hvor stor andel av avgiften bærer selgerne?</p>`,
      options: ["23,53 %", "0,00 %", "18,75 %", "75,00 %"],
      answer: 3,
      solution: `<p>Selgerne får det kjøperne betaler i alt, minus avgiften: p = P − t = 51 − 12 = kr 39.</p><p>Selgernes byrde: P<sub>0</sub> − p = 48 − 39 = kr 9.</p><p>Andel: 9/12 = <b>75,00 %</b>. Selgerne bærer det meste, selv om det er kjøperne som betaler inn avgiften.</p>`,
      check: `<p>Kjøpernes byrde er 51 − 48 = kr 3, altså 25 %. Byrdene summerer: 3 + 9 = 12 = t og 25 % + 75 % = 100 %. ✓ Hadde selgerne betalt inn avgiften, ville likevekten og fordelingen vært nøyaktig de samme.</p>`,
      traps: [
        "Regnet ut hvor stor del av kjøperprisen som er avgift: 12/51 = 23,53 %. Spørsmålet gjelder hvor stor del av avgiften selgerne bærer.",
        "Forvekslet formell og reell insidens: trodde selgerne slipper unna fordi kjøperne betaler inn avgiften. Selgerne sitter igjen med kr 39 mot kr 48 før.",
        "Delte selgernes byrde på prisen før avgiften i stedet for på avgiften: 9/48 = 18,75 %.",
        null,
      ],
    },
    {
      id: "insidens-3",
      title: "Utledningen: ∂p/∂t og ∂P/∂t",
      theory: `<p>Hvor mye endres prisene når skatten øker med én krone? Deriver likevekten D(p + t) = S(p) med hensyn på t. Venstresiden er sammensatt: argumentet p + t endrer seg med ∂p/∂t + 1, fordi p selv beveger seg. Samle leddene med ∂p/∂t på én side og del. Konsumentprisen trenger ingen ny derivasjon: kilen P = p + t gir ∂P/∂t = ∂p/∂t + 1. Da blir telleren S′. Med lineære kurver endres prisene med nøyaktig (∂P/∂t) × t og (∂p/∂t) × t.</p>
<div class="formula"><div class="eq">D′ × (∂p/∂t + 1) = S′ × ∂p/∂t &nbsp;⟹&nbsp; <b>∂p/∂t = D′/(S′ − D′)</b></div><div class="eq"><b>∂P/∂t = S′/(S′ − D′)</b> &nbsp;·&nbsp; ∂P/∂t − ∂p/∂t = 1</div><div class="where">D′ &lt; 0 og S′ &gt; 0, så nevneren S′ − D′ = S′ + |D′| er alltid positiv. ∂p/∂t ligger mellom −1 og 0 og ∂P/∂t mellom 0 og 1: ingen av prisene flytter seg med mer enn hele skatten. S′ i telleren gir konsumentprisen, D′ i telleren gir produsentprisen. Fortegnsfellen: med D′ = −20 er S′ − D′ lik S′ + 20, ikke S′ − 20.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Markedet x = 500 − 20P og x = 30p − 100 har D′ = −20 og S′ = 30, så S′ − D′ = 30 − (−20) = 50.</p><p>∂p/∂t = −20/50 = <b>−0,40</b> og ∂P/∂t = 30/50 = <b>0,60</b>. Med P<sub>0</sub> = kr 12 og t = kr 5 blir p = 12 − 0,40 × 5 = kr 10 og P = 12 + 0,60 × 5 = kr 15, samme svar som da du løste likevekten.</p><p>Kontroll: 0,60 − (−0,40) = 1 og 15 − 10 = 5 = t. ✓</p></div>`,
      q: `<p>En vare omsettes i frikonkurranse til kr 64 før skatt. Etterspørselen har helningen D′ = −24 og tilbudet helningen S′ = 8. Kurvene er lineære [eksempeltall]. Staten innfører en stykkskatt på kr 6 per enhet, som produsentene betaler inn. Hva blir den nye konsumentprisen?</p>`,
      options: ["kr 70,00", "kr 66,00", "kr 65,50", "kr 68,50"],
      answer: 2,
      solution: `<p>Nevneren: S′ − D′ = 8 − (−24) = 32.</p><p>∂P/∂t = S′/(S′ − D′) = 8/32 = 0,25. Kjøperne bærer 25 % av skatten: 0,25 × 6 = kr 1,50.</p><p>Ny konsumentpris: 64 + 1,50 = <b>kr 65,50</b>.</p>`,
      check: `<p>Produsentprisen: ∂p/∂t = −24/32 = −0,75, så p = 64 − 0,75 × 6 = kr 59,50. Kilen: 65,50 − 59,50 = 6 = t. ✓ Etterspørselen er tre ganger så prisfølsom som tilbudet (24 mot 8). Derfor bærer kjøperne minst.</p>`,
      traps: [
        "Antok full overvelting: 64 + 6 = kr 70,00. Kjøperne bærer bare 0,25 av skatten.",
        "Glemte S′ i nevneren: S′/|D′| = 8/24 = 0,33 i stedet for 8/32 = 0,25. Da blir P = 64 + 6 × 8/24 = 64 + 2 = kr 66,00.",
        null,
        "Byttet andelene: brukte |D′|/(S′ − D′) = 0,75 for kjøperne og fikk 64 + 0,75 × 6 = kr 68,50. Det er produsentenes byrde.",
      ],
    },
    {
      id: "insidens-4",
      title: "Hvem bærer mest: helningene og elastisitetene",
      theory: `<p>Deler du ∂P/∂t på ∂p/∂t, forsvinner nevneren: forholdet mellom prisendringene er forholdet mellom helningene (H2016 oppgave 1b). Eksamen oppgir ofte elastisiteter i stedet for helninger, ε<sub>D</sub> = D′ × P/x og ε<sub>S</sub> = S′ × p/x. I utgangspunktet er P = p, så faktoren P/x er felles og forkortes bort i andelene. Regelen blir at den minst elastiske siden bærer mest av skatten, fordi den har færrest alternativer å flykte til.</p>
<div class="formula"><div class="eq">(∂P/∂t)/(∂p/∂t) = S′/D′</div><div class="eq">Konsumentenes andel = ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|) &nbsp;·&nbsp; produsentenes andel = |ε<sub>D</sub>|/(ε<sub>S</sub> + |ε<sub>D</sub>|)</div><div class="where">ε<sub>D</sub> er negativ, så bruk tallverdien. Andelene summerer til 1. Det er samme brøk som S′/(S′ − D′), bare med P/x ganget inn over og under brøkstreken.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>ε<sub>D</sub> = −1,2, ε<sub>S</sub> = 0,8 og t = kr 10.</p><p>Konsumentenes andel: 0,8/(0,8 + 1,2) = 0,8/2,0 = 0,40, altså kr 4. Produsentenes andel: 1,2/2,0 = 0,60, altså kr 6.</p><p>Etterspørselen er mest elastisk, så produsentene bærer mest. Sum: 4 + 6 = 10 = t. ✓ Forholdet mellom byrdene er 4/6 = 0,8/1,2, det samme som ε<sub>S</sub>/|ε<sub>D</sub>|.</p></div>`,
      q: `<p>I likevekten før skatt er etterspørselselastisiteten ε<sub>D</sub> = −0,6 og tilbudselastisiteten ε<sub>S</sub> = 1,8. Kurvene er lineære [eksempeltall]. Staten innfører en stykkskatt på kr 8 per enhet, innkrevd fra produsentene. Hvor mye stiger konsumentprisen?</p>`,
      options: ["kr 12,00", "kr 8,00", "kr 10,67", "kr 6,00"],
      answer: 3,
      solution: `<p>Konsumentenes andel: ε<sub>S</sub>/(ε<sub>S</sub> + |ε<sub>D</sub>|) = 1,8/(1,8 + 0,6) = 1,8/2,4 = 0,75.</p><p>Konsumentprisen stiger med 0,75 × 8 = <b>kr 6,00</b>.</p><p>Etterspørselen er minst elastisk (0,6 mot 1,8). Derfor bærer kjøperne mest.</p>`,
      check: `<p>Produsentenes andel: 0,6/2,4 = 0,25, altså kr 2. Byrdene summerer: 6 + 2 = 8 = t. ✓ Forholdet mellom byrdene er 6/2 = 3, det samme som ε<sub>S</sub>/|ε<sub>D</sub>| = 1,8/0,6 = 3.</p>`,
      traps: [
        "Brukte ε<sub>D</sub> med fortegn i nevneren: 1,8/(1,8 − 0,6) = 1,5 og 1,5 × 8 = kr 12,00. Konsumentprisen kan aldri stige med mer enn skatten.",
        "Antok at kjøperne bærer hele skatten: kr 8,00. Med ε<sub>D</sub> = −0,6 og ε<sub>S</sub> = 1,8 reagerer begge sider på prisen, så selgerne må ta en del selv.",
        "Teller og nevner byttet: (ε<sub>S</sub> + |ε<sub>D</sub>|)/ε<sub>S</sub> × 8 = 2,4/1,8 × 8 = kr 10,67. Brøken er alltid over 1, men konsumentprisen kan aldri stige med mer enn skatten.",
        null,
      ],
    },
    {
      id: "insidens-5",
      title: "Grensetilfellene: når én side ikke reagerer",
      theory: `<p>Grensetilfellene får du ved å sette en helning lik 0 eller la den gå mot uendelig i de to formlene. Det er alltid forholdet mellom helningene som teller. En side som ikke reagerer på pris i det hele tatt, bærer alt. En side som reagerer uendelig sterkt, bærer ingenting. Er en av sidene perfekt uelastisk, endres ikke kvantumet.</p>
<div class="formula"><div class="eq">D′ = 0: ∂p/∂t = 0/(S′ − 0) = 0 &nbsp;·&nbsp; S′ = 0: ∂p/∂t = D′/(0 − D′) = −1</div><div class="where">Sett helningen inn i de vanlige uttrykkene, så slipper du å pugge tabellen.</div></div>
<table class="data"><tr><th>Tilfelle</th><th>∂P/∂t</th><th>∂p/∂t</th><th>Bærer skatten</th></tr><tr><td>Perfekt uelastisk etterspørsel, D′ = 0</td><td class="n">1</td><td class="n">0</td><td>konsumentene</td></tr><tr><td>Perfekt elastisk tilbud, S′ → ∞</td><td class="n">1</td><td class="n">0</td><td>konsumentene</td></tr><tr><td>Perfekt uelastisk tilbud, S′ = 0</td><td class="n">0</td><td class="n">−1</td><td>produsentene</td></tr><tr><td>Perfekt elastisk etterspørsel, D′ → −∞</td><td class="n">0</td><td class="n">−1</td><td>produsentene</td></tr></table>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Insulin: pasientene kjøper samme mengde uansett pris, så D′ = 0 (H2020 oppgave 1b). Tilbudet stiger, for eksempel med S′ = 30.</p><p>∂p/∂t = 0/(30 − 0) = <b>0</b> og ∂P/∂t = 30/(30 − 0) = <b>1</b>. Konsumentprisen stiger krone for krone med skatten. Produsentprisen står stille.</p><p>Kontroll: 1 − 0 = 1. ✓</p></div>`,
      q: `<p>I en bykjerne finnes et fast antall parkeringsplasser. Det kan ikke bygges flere, så tilbudet er perfekt uelastisk: S′(p) = 0. Etterspørselen er fallende, D′(P) &lt; 0. Kommunen legger en avgift t per plass på eierne av plassene, slik at P = p + t. Hvilket uttrykk viser effekten på prisen eierne sitter igjen med når avgiften øker marginalt?</p>`,
      options: ["∂p/∂t = 0", "∂p/∂t = 1", "∂p/∂t = −1", "∂p/∂t = S′(p)/(S′(p) − D′(P))"],
      answer: 2,
      solution: `<p>Sett S′ = 0 inn i ∂p/∂t = D′/(S′ − D′): ∂p/∂t = D′/(0 − D′) = D′/(−D′) = <b>−1</b>.</p><p>Prisen eierne sitter igjen med, faller med hele avgiften. Antallet plasser er låst, så eierne kan ikke holde plasser tilbake for å presse prisen opp. Samme tilfelle kom i H2016 oppgave 1c og H2018 oppgave 4b.</p>`,
      check: `<p>Konsumentprisen: ∂P/∂t = 0/(0 − D′) = 0, så det plassbrukerne betaler i alt, er uendret. Differansen: 0 − (−1) = 1, hele avgiften er fordelt. ✓</p>`,
      traps: [
        "Brukte svaret for perfekt uelastisk <i>etterspørsel</i> (D′ = 0). Her er det tilbudet som ikke reagerer. Da er det eierne som bærer alt.",
        "Tok ∂P/∂t = 1 fra tilfellet med uelastisk etterspørsel og satte det på produsentprisen. En avgift på eierne kan ikke løfte prisen de sitter igjen med.",
        null,
        "Uttrykket for konsumentprisen, ∂P/∂t. Med S′ = 0 blir det 0: plassbrukerne betaler det samme som før. Spørsmålet gjelder prisen eierne får.",
      ],
    },
    {
      id: "insidens-6",
      title: "Skatteinntekt og dødvektstap",
      theory: `<p>Staten får t kroner for hver enhet som fortsatt omsettes, så provenyet regnes med kvantumet <i>etter</i> skatten. Skatten fjerner også handler som både kjøper og selger ville tjent på. Gevinsten fra dem tilfaller ingen. Det er dødvektstapet: trekanten mellom de to likevektene, med hele kilen t som høyde og kvantumsfallet som grunnlinje. Med lineære kurver er trekanten eksakt.</p>
<div class="formula"><div class="eq">Proveny = t × x<sub>t</sub></div><div class="eq">Dødvektstap = ½ × t × (x<sub>0</sub> − x<sub>t</sub>) = ½ × t<sup>2</sup> × |S′D′|/(S′ − D′)</div><div class="where">x<sub>0</sub> er kvantumet før skatt og x<sub>t</sub> etter. Tapet vokser med kvadratet av skatten. Det er null når én av helningene er null, fordi kvantumet da ikke endres.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Markedet x = 500 − 20P og x = 30p − 100 med t = kr 5: kvantumet faller fra 260 til 200.</p><p>Proveny: 5 × 200 = <b>kr 1 000</b>. Dødvektstap: ½ × 5 × (260 − 200) = <b>kr 150</b>.</p><p>Formelen gir det samme: ½ × 5<sup>2</sup> × (30 × 20)/50 = ½ × 25 × 12 = 150. ✓</p></div>`,
      q: `<p>Etterspørselen er x = 900 − 15P og tilbudet x = 25p − 300, i kroner [eksempeltall]. Uten skatt er P = p = kr 30 og x = 450. Staten innfører en stykkskatt på kr 8 per enhet, innkrevd fra produsentene. Den nye likevekten blir P = kr 35, p = kr 27 og x = 375. Hvor stort er dødvektstapet?</p>`,
      options: ["kr 600,00", "kr 300,00", "kr 3 000,00", "kr 187,50"],
      answer: 1,
      solution: `<p>Kvantumsfallet: 450 − 375 = 75 enheter.</p><p>Dødvektstap: ½ × 8 × 75 = <b>kr 300,00</b>.</p><p>Provenyet er 8 × 375 = kr 3 000.</p>`,
      check: `<p>Formelen: ½ × 8<sup>2</sup> × (25 × 15)/(25 + 15) = ½ × 64 × 375/40 = ½ × 64 × 9,375 = 300. ✓ Velferdsregnskapet gir det samme. Kjøperne taper 5 × 375 + ½ × 5 × 75 = 2 062,50. Selgerne taper 3 × 375 + ½ × 3 × 75 = 1 237,50. Til sammen er det 3 300. Staten får 3 000. Differansen 3 300 − 3 000 = 300 forsvinner.</p>`,
      traps: [
        "Glemte halvparten: 8 × 75 = kr 600,00. Det er rektangelet, ikke trekanten.",
        null,
        "Ga provenyet, 8 × 375 = kr 3 000,00. Det er en overføring til staten, ikke et tap.",
        "Regnet bare kjøpernes del av trekanten, med prisøkningen 35 − 30 = 5 som høyde: ½ × 5 × 75 = kr 187,50. Høyden er hele kilen t = 8.",
      ],
    },
    {
      id: "insidens-7",
      title: "Monopol: prisen stiger med halve skatten",
      theory: `<p>Alt så langt forutsetter frikonkurranse. En monopolist setter grenseinntekt lik grensekostnad. En stykkskatt løfter grensekostnaden med t. Med lineær etterspørsel P = a − bx har grenseinntekten dobbelt så bratt helning, MR = a − 2bx. Med konstant grensekostnad c gir det P = (a + c + t)/2: prisen stiger med nøyaktig halve skatten, uansett helning (H2021 oppgave 2). Monopolisten velter ikke over alt, fordi full overvelting ville kostet ham for mange kunder.</p>
<div class="formula"><div class="eq">MR = MC + t: &nbsp; a − 2bx = c + t</div><div class="eq">x* = (a − c − t)/(2b) &nbsp;·&nbsp; P* = (a + c + t)/2 &nbsp;·&nbsp; ∂P/∂t = ½</div><div class="where">Gjelder lineær etterspørsel og konstant grensekostnad. Oligopol har ingen tilsvarende fast regel.</div></div>
<div class="callout mech"><span class="h">Kort om kapitalisering</span>Er en skatt ventet og varig, slår den inn i prisen på det som skattlegges, allerede når den blir kjent. Med et fast antall hytter senker en ny, varig eiendomsskatt hytteverdien med nåverdien av alle de framtidige skattebetalingene. Den som eier hytta når skatten vedtas, bærer derfor hele byrden. Den som kjøper etterpå, betaler skatten hvert år, men har fått den trukket fra i kjøpesummen.</div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Invers etterspørsel P = 100 − 2x og grensekostnad kr 20. Uten skatt: 100 − 4x = 20 gir x = 20 og P = 100 − 40 = <b>kr 60</b>.</p><p>Med t = kr 8: 100 − 4x = 28 gir x = 18 og P = 100 − 36 = <b>kr 64</b>.</p><p>Prisen steg med 4 = ½ × 8. Monopolisten sitter igjen med 64 − 8 = 56, altså 4 mindre enn før. ✓</p></div>`,
      q: `<p>En monopolist møter den inverse etterspørselen P = 150 − 3x og har konstant grensekostnad kr 30 per enhet [eksempeltall]. Uten skatt er prisen kr 90. Staten innfører en stykkskatt på kr 12 per enhet, innkrevd fra monopolisten. Hva blir prisen kundene betaler?</p>`,
      options: ["kr 96", "kr 42", "kr 102", "kr 84"],
      answer: 0,
      solution: `<p>Grenseinntekten er MR = 150 − 6x. Sett den lik grensekostnaden pluss skatten: 150 − 6x = 30 + 12 = 42.</p><p>Da er x = 108/6 = 18. Prisen blir P = 150 − 3 × 18 = <b>kr 96</b>.</p>`,
      check: `<p>Formelen: P* = (a + c + t)/2 = (150 + 30 + 12)/2 = 96. ✓ Prisen steg fra 90 til 96, altså 6 = ½ × 12. Monopolisten sitter igjen med 96 − 12 = 84, kr 6 mindre enn før: skatten deles likt.</p>`,
      traps: [
        null,
        "Satte prisen lik grensekostnad pluss skatt, som i frikonkurranse: 30 + 12 = kr 42. En monopolist setter grenseinntekten, ikke prisen, lik grensekostnaden.",
        "Antok at monopolisten velter over hele skatten fordi han har markedsmakt: 90 + 12 = kr 102. Han brukte markedsmakten allerede før skatten kom.",
        "Ga prisen monopolisten sitter igjen med etter skatten: 96 − 12 = kr 84.",
      ],
    },
    {
      id: "insidens-8",
      title: "Formelgjenkjenning: tre filtre som stryker de gale brøkene",
      theory: `<p>På eksamen skal du ofte peke ut ∂p/∂t eller ∂P/∂t blant fire nesten like brøker (H2024 oppgave 8, H2019 oppgave 5). Du trenger ikke derivere på nytt. Kjør hvert alternativ gjennom tre filtre: fortegnet, grensene og summen. Sett inn et par lovlige helninger med |D′| større enn S′, for eksempel D′ = −3 og S′ = 1. Da avslører også en fortegnsfeil i nevneren seg.</p>
<div class="formula"><div class="eq">1. Fortegn: ∂p/∂t &lt; 0 og ∂P/∂t &gt; 0</div><div class="eq">2. Grenser: −1 ≤ ∂p/∂t ≤ 0 og 0 ≤ ∂P/∂t ≤ 1</div><div class="eq">3. Sum: ∂P/∂t − ∂p/∂t = 1</div><div class="where">Nevneren S′ − D′ er alltid positiv. Et uttrykk som er konstant uansett helninger, kan ikke være riktig: da ville fordelingen vært lik i alle markeder.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>De fire uttrykkene for ∂p/∂t i H2024 oppgave 8a, med D′ = −3 og S′ = 1:</p><p>(D′ − S′)/(S′ − D′) = −4/4 = −1. Telleren er minus nevneren, så brøken er −1 uansett helninger. Strykes.</p><p>D′/S′ = −3/1 = −3. Under −1. Strykes.</p><p>S′/(S′ − D′) = 1/4 = 0,25. Positiv, så det er ∂P/∂t. Strykes.</p><p>D′/(S′ − D′) = −3/4 = −0,75. Negativ og mellom −1 og 0. Summen: 0,25 − (−0,75) = 1. <b>Riktig.</b></p></div>`,
      q: `<p>I et frikonkurransemarked ilegger myndighetene en stykkskatt t per solgt enhet, innkrevd fra produsentene, slik at P = p + t, der P er konsumentprisen og p produsentprisen. Likevekten er D(p + t) = S(p), med D′(P) &lt; 0 og S′(p) &gt; 0. Hvilket av uttrykkene viser effekten på produsentprisen når skatten øker marginalt?</p>`,
      options: ["∂p/∂t = (S′(p) − D′(P)) / D′(P)", "∂p/∂t = S′(p) / (S′(p) − D′(P))", "∂p/∂t = D′(P) / (S′(p) − D′(P))", "∂p/∂t = D′(P) / (S′(p) + D′(P))"],
      answer: 2,
      solution: `<p>Riktig er <b>∂p/∂t = D′(P)/(S′(p) − D′(P))</b>, fra derivasjonen D′ × (∂p/∂t + 1) = S′ × ∂p/∂t.</p><p>Filtrene, med D′ = −3 og S′ = 1:</p><p>(S′ − D′)/D′ = 4/(−3) = −1,33. Under −1: produsentprisen kan ikke falle med mer enn skatten.</p><p>S′/(S′ − D′) = 1/4 = 0,25. Positiv: det er konsumentprisen.</p><p>D′/(S′ + D′) = −3/(−2) = 1,5. Positiv og over 1. Nevneren S′ + D′ kan bli null eller negativ, mens S′ − D′ alltid er positiv.</p><p>D′/(S′ − D′) = −3/4 = −0,75. Består alle tre filtrene.</p>`,
      check: `<p>Prøv et annet lovlig par, D′ = −4 og S′ = 2. Det riktige uttrykket gir −4/6 = −0,67. Sammen med ∂P/∂t = 2/6 = 0,33 blir differansen 0,33 − (−0,67) = 1,00. ✓ De tre andre gir −1,50, 0,33 og 2,00 og stryker på de samme filtrene.</p>`,
      traps: [
        "Teller og nevner byttet. Brøken er alltid mindre enn −1, med D′ = −3 og S′ = 1 blir den −1,33. Produsentprisen kan ikke falle med mer enn hele skatten.",
        "Uttrykket for konsumentprisen, ∂P/∂t. Det er positivt, mens en skatt på produsentene bare kan senke prisen de sitter igjen med.",
        null,
        "Feil fortegn på D′ i nevneren: S′ + D′ i stedet for S′ − D′. Med D′ = −3 og S′ = 1 blir brøken 1,5, positiv og over 1.",
      ],
    },
    {
      id: "insidens-9",
      title: "Eksamensnivå: grensetilfellet med tall (H2025 oppgave 8)",
      theory: `<p>H2025 oppgave 8 ga en likevektspris og en stykkskatt på tilbyderne og spurte om prisene i to grensetilfeller, fordelt på tre delspørsmål. Rutinen: skriv ned kilen P = p + t, oversett ordene til en helning og les av hvilken pris som står stille. Skriv ned <i>hvilken</i> pris spørsmålet gjelder før du regner, for fasiten i ett delspørsmål står som galt alternativ i det neste.</p>
<div class="formula"><div class="eq">Perfekt uelastisk etterspørsel: P = P<sub>0</sub> + t og p = P<sub>0</sub></div><div class="eq">Perfekt elastisk etterspørsel: P = P<sub>0</sub> og p = P<sub>0</sub> − t</div><div class="where">Med stigende tilbud kan konsumentprisen aldri overstige P<sub>0</sub> + t. Produsentprisen kan aldri falle under P<sub>0</sub> − t. Alternativer utenfor det båndet strykes uten regning.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Likevektspris kr 4,00 og stykkskatt kr 1,00 på tilbyderne.</p><p>Perfekt uelastisk etterspørsel: kjøperne bærer alt, så P = 4,00 + 1,00 = <b>kr 5,00</b> og p = kr 4,00.</p><p>Perfekt elastisk etterspørsel: kjøperne kjøper ingenting over kr 4,00, så P = <b>kr 4,00</b> og p = 4,00 − 1,00 = <b>kr 3,00</b>.</p><p>Kontroll: P − p = 1,00 = t i begge tilfellene. ✓</p></div>`,
      q: `<p>I et frikonkurransemarked er likevektsprisen kr 2,40. Myndighetene ilegger tilbyderne en skatt på kr 0,60 per solgt enhet [eksempeltall]. Anta at etterspørselen er perfekt elastisk mens tilbudet er elastisk. Hvilken pris får tilbyderne (produsentene) etter at skatten er innført?</p>`,
      options: ["kr 1,80", "kr 2,40", "kr 3,00", "kr 2,10"],
      answer: 0,
      solution: `<p>Perfekt elastisk etterspørsel betyr at kjøperne ikke betaler mer enn kr 2,40: D′ → −∞. Da går ∂P/∂t = S′/(S′ − D′) mot 0. Konsumentprisen står stille på kr 2,40.</p><p>Kilen gir produsentprisen: p = P − t = 2,40 − 0,60 = <b>kr 1,80</b>.</p>`,
      check: `<p>Formelen: ∂p/∂t = D′/(S′ − D′) → −1 når D′ → −∞, så produsentprisen faller med hele skatten. Regnskapet: kjøperen betaler 2,40, staten får 0,60 og produsenten beholder 1,80. ✓ Svaret ligger på den nedre grensen P<sub>0</sub> − t, slik det skal når produsentene bærer alt.</p>`,
      traps: [
        null,
        "Ga konsumentprisen, som står stille på kr 2,40. Spørsmålet gjelder prisen tilbyderne får.",
        "Brukte svaret for perfekt <i>uelastisk</i> etterspørsel og la skatten på prisen: 2,40 + 0,60 = kr 3,00. En skatt på tilbyderne kan aldri løfte prisen de får.",
        "Delte skatten likt mellom kjøpere og selgere: 2,40 − 0,30 = kr 2,10. Med perfekt elastisk etterspørsel kan konsumentprisen ikke stige i det hele tatt, så selgerne bærer hele skatten.",
      ],
    },
    {
      id: "insidens-10",
      title: "Eksamensnivå: en subsidie som fjernes (H2022 oppgave 3)",
      theory: `<p>H2022 oppgave 3 er den vanskeligste varianten i settene, fordi verken helninger eller elastisiteter står oppgitt. Du må lese dem ut av ordene. «Kan ikke variere forbruket» betyr perfekt uelastisk etterspørsel, D′ = 0. «Mange tilbydere med konstant og lik grensekostnad» betyr at tilbudet er vannrett ved grensekostnaden, S′ → ∞. Å fjerne en subsidie per enhet til produsentene virker som å innføre en stykkskatt på samme beløp. Spørsmålet gjelder både pris og kvantum.</p>
<div class="formula"><div class="eq">Subsidie s fjernes ⟺ stykkskatt t = s</div><div class="eq">D′ = 0 eller S′ → ∞: ∂P/∂t = 1</div><div class="eq">D′ = 0: kvantumet uendret</div><div class="where">En subsidie er en negativ skatt, så de samme formlene gjelder med motsatt fortegn. Kvantumet endres bare når begge sidene reagerer på pris.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Mange bakerier selger brød med samme konstante grensekostnad, kr 40 per brød. Kundene kjøper 1 000 brød i uka uansett pris. Staten innfører et tilskudd på kr 10 per brød, utbetalt til bakeriene.</p><p>Tilbudet er vannrett ved kr 40 og flytter seg ned til kr 30. Etterspørselen er loddrett ved 1 000 brød. Kundeprisen faller fra kr 40 til <b>kr 30</b>. Kvantumet er uendret på <b>1 000</b>.</p><p>Kontroll: bakeriene får 30 + 10 = kr 40 både før og etter. Kundene får hele tilskuddet. ✓</p></div>`,
      q: `<p>Et legemiddel produseres av mange konkurrerende produsenter, alle med konstant og lik grensekostnad på kr 225 per pakning. Pasientene må ta en fast dose og kan ikke variere forbruket. I dag gir staten produsentene et tilskudd på kr 45 per solgte pakning, slik at pasientene betaler kr 180 [eksempeltall]. Staten bestemmer seg for å fjerne hele tilskuddet. Hva skjer med prisen pasientene betaler og med antallet pakninger som omsettes?</p>`,
      options: [
        "Prisen pasientene betaler er uendret på kr 180, mens antallet pakninger som omsettes faller",
        "Prisen pasientene betaler stiger til kr 225 og antallet pakninger som omsettes faller",
        "Prisen pasientene betaler stiger til kr 202,50, mens antallet er uendret",
        "Prisen pasientene betaler stiger til kr 225, mens antallet pakninger som omsettes er uendret",
      ],
      answer: 3,
      solution: `<p><b>Oversett ordene.</b> «Kan ikke variere forbruket» gir D′ = 0. «Mange produsenter med konstant og lik grensekostnad» gir et vannrett tilbud ved kr 225, S′ → ∞.</p><p><b>Tilskuddet som skatt.</b> Å fjerne kr 45 per pakning virker som en stykkskatt t = 45 på produsentene.</p><p><b>Prisen.</b> Både D′ = 0 og S′ → ∞ gir ∂P/∂t = 1, så pasientene bærer alt: 180 + 45 = <b>kr 225</b>.</p><p><b>Kvantumet.</b> Etterspørselen er loddrett, så antallet pakninger er <b>uendret</b>.</p>`,
      check: `<p>Regnskapet: produsentene fikk 180 + 45 = kr 225 per pakning før. Etter får de 225 fra pasientene. Produsentprisen står stille på grensekostnaden, som den må med vannrett tilbud. Kilen: 225 − 180 = 45, hele tilskuddet. ✓</p>`,
      traps: [
        "Svaret for perfekt <i>elastisk</i> etterspørsel og stigende tilbud: da står konsumentprisen stille, produsentene bærer alt og kvantumet faller. Her kan pasientene ikke variere forbruket.",
        "Standardsvaret for et marked der ingen av kurvene er loddrett eller vannrett: pris opp og kvantum ned. Med loddrett etterspørsel kan kvantumet ikke falle.",
        "Delte byrden likt: 180 + 22,50 = kr 202,50. Lik deling krever like store helninger i tallverdi. Her er helningene 0 og uendelig. Med vannrett tilbud kan produsentprisen ikke falle under grensekostnaden.",
        null,
      ],
    },
  ],
});

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

/* sjanger 4 · avkastningsskatt · Formuesskatt som avkastningsskatt */
window.EDU_DATA.sjangre.push({
  id: "avkastningsskatt",
  num: 4,
  title: "Formuesskatt som avkastningsskatt",
  summary: "Fra formuesskatten i kroner til verdsetting under formuesskatt og utbyttet som skal betale den",
  chapters: [8],
  exam: "4 av 9 sett · 17 % av H2025 · H2025 oppgave 3, 6 og 9, H2024 oppgave 7",
  intro: `<p>Formuesskatten er et fast beløp av formuen ved inngangen til året, men eksamen spør hva den er som skatt på avkastningen. Ekvivalensen fantes ikke på eksamen før H2021, men temaet ga 17 % av poengene i H2025 (oppgave 3, 6 og 9). Utbyttet som må til for å betale skatten, kom i H2019, H2024 og H2025. Forelesning 8 i 2026 har temaet som pensum. Etter siste steg regner du den ekvivalente avkastningsskatten begge veier og avkastningen etter formuesskatt. Du verdsetter en evig kontantstrøm under formuesskatt og finner utbyttet som skal dekke skatten, med og uten verdsettingsrabatt.</p>`,
  steps: [
    {
      id: "avkastningsskatt-1",
      title: "Formuesskatten i kroner og som andel av avkastningen",
      theory: `<p>Formuesskatten regnes av formuesverdien, ikke av det formuen kaster av seg. Har du formuesverdien W ved inngangen til året, betaler du τ<sub>w</sub> × W i kroner, enten året gir god avkastning eller ingen. Vil du vite hvor tung skatten er, sammenligner du kronebeløpet med årets avkastning i kroner. Satsen er 1,0 % av nettoformuen over bunnfradraget på kr 1 900 000 og 1,1 % av det som overstiger kr 21 500 000 <b>[dagens regel, 2026]</b>. Oppgavene ber deg som regel se bort fra bunnfradraget.</p>
<div class="formula"><div class="eq">Formuesskatt = τ<sub>w</sub> × W</div><div class="eq">Andel av avkastningen = τ<sub>w</sub> × W/avkastningen i kroner</div><div class="where">τ<sub>w</sub> er formuesskattesatsen og W formuesverdien ved inngangen til året. Bankinnskudd og rentefond har ingen verdsettingsrabatt, så der er W lik markedsverdien.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Du har kr 1 000 000 i banken ved inngangen til året og renten gir kr 40 000. Formuesskatten er 1 000 000 × 1,0 % = kr 10 000.</p><p>Som andel av avkastningen: 10 000/40 000 = 25 %. Satsen er 1 %, men skatten tar en firedel av renten.</p></div>`,
      q: `<p>Liv har kr 2 500 000 i et rentefond ved inngangen til året. Fondet har ingen verdsettingsrabatt og gir kr 150 000 i avkastning i løpet av året. Formuesskatten er 1,0 % av formuen ved inngangen til året <b>[dagens regel]</b> og bunnfradraget er brukt opp av annen formue. Hvor stor andel av årets avkastning tar formuesskatten?</p>`,
      options: ["16,7 %", "1,0 %", "20,0 %", "4,0 %"],
      answer: 0,
      solution: `<p>Formuesskatt: 2 500 000 × 1,0 % = kr 25 000.</p><p>Andel av avkastningen: 25 000/150 000 = <b>16,7 %</b>.</p>`,
      check: `<p>Regn med satser i stedet for kroner: avkastningen er 150 000/2 500 000 = 6 %. Da er andelen 1,0 %/6 % = 16,7 %, den samme. Formuen falt bort på veien. Det er det neste steg bygger på.</p>`,
      traps: [
        null,
        "Brukte satsen direkte som andel av avkastningen: 1,0 %. Satsen gjelder formuen, ikke avkastningen.",
        "Delte skatten på det som er igjen av avkastningen etter skatten: 25 000/(150 000 − 25 000) = 20,0 %. Andelen måles mot hele avkastningen.",
        "Trakk fra bunnfradraget selv om det er brukt opp av annen formue: (2 500 000 − 1 900 000) × 1,0 % = 6 000 og 6 000/150 000 = 4,0 %.",
      ],
    },
    {
      id: "avkastningsskatt-2",
      title: "Inngående formue: avkastningsskatten er satsen delt på r",
      theory: `<p>I kursets modell faller formuesskatten på formuen ved <b>inngangen</b> til perioden. En skatt t på avkastningen treffer et annet grunnlag: avkastningen r × W. Settes de to provenyene like, stryker W seg og formuesskatten tilsvarer en avkastningsskatt τ<sub>w</sub>/r. Fordi r står i nevneren, stiger t når avkastningen faller. Er r lavere enn τ<sub>w</sub>, blir t over 100 %: skatten tar mer enn hele avkastningen. Faller skatten i stedet på formuen ved periodens <b>slutt</b>, er grunnlaget W(1 + r) og svaret blir litt høyere. Oppgaveteksten sier hvilket tidspunkt som gjelder. Les den setningen før du regner.</p>
<div class="formula"><div class="eq">Inngangen: τ<sub>w</sub> × W = t × r × W &nbsp;⟹&nbsp; t = τ<sub>w</sub>/r</div><div class="eq">Slutten: τ<sub>w</sub> × W(1 + r) = t × r × W &nbsp;⟹&nbsp; t = τ<sub>w</sub>(1 + r)/r</div><div class="where">t er skatten på avkastningen som gir samme proveny og r er avkastningen før skatt. Eksamen skriver ofte formuesskatten som stor T og avkastningsskatten som liten t.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>τ<sub>w</sub> = 1,0 % og r = 4 %, skatten på inngående formue: t = 1,0 %/4 % = 25 %.</p><p>Med W = 100: formuesskatten er 1,00, avkastningen 4 og 25 % av 4 er 1,00. Hadde skatten falt på formuen ved slutten, ville den vært 104 × 1,0 % = 1,04 og 1,04/4 = 26 %. Ved r = 0,5 % er t = 1,0/0,5 = 200 % og formuen krymper.</p></div>`,
      q: `<p>La W = 300 være formuen ved periodens begynnelse og la r = 4 % være avkastningen, som realiseres ved periodens slutt. Formuesskatten er τ<sub>w</sub> = 1,1 % <b>[eksempeltall, dagens toppsats]</b> og faller på formuen ved periodens begynnelse. Hvor høy må en skatt t på avkastningen være for at de to skattene skal gi samme proveny?</p>`,
      options: ["28,6 %", "2,9 %", "37,9 %", "27,5 %"],
      answer: 3,
      solution: `<p>Formuesskatten: 300 × 1,1 % = 3,3.</p><p>Avkastningen: 300 × 4 % = 12, så avkastningsskatten er 12t.</p><p>12t = 3,3 ⟹ t = 3,3/12 = <b>27,5 %</b>. Med formelen: τ<sub>w</sub>/r = 1,1 %/4 % = 27,5 %.</p>`,
      check: `<p>Baklengs: 300 × 0,04 × 0,275 = 3,3, nøyaktig formuesskatten. Med W = 1 gir samme regning 0,011 = 0,04 × 0,275, så svaret avhenger ikke av hvor stor formuen er.</p>`,
      traps: [
        "Regnet skatten av formuen ved periodens slutt: 312 × 1,1 % = 3,432 og 3,432/12 = 28,6 %. Oppgaven sier periodens begynnelse.",
        "Trakk satsen fra avkastningen: 4 % − 1,1 % = 2,9 %. Det er avkastningen etter formuesskatt, ikke skatten som andel av avkastningen.",
        "Delte på avkastningen etter formuesskatt: 3,3/(12 − 3,3) = 37,9 %. Ekvivalensen måler skatten mot avkastningen før skatt.",
        null,
      ],
    },
    {
      id: "avkastningsskatt-3",
      title: "Avkastning etter formuesskatt: r minus satsen",
      theory: `<p>Avkastningen på en investering er direkteavkastning pluss kursgevinst, delt på det du betalte. Formuesskatten trekker et fast beløp τ<sub>w</sub> × kjøpspris fra, fordi den faller på verdien ved inngangen. Da trekker den nøyaktig τ<sub>w</sub> prosentpoeng fra avkastningen. Formuesskatten er en skatt på personen, ikke på aktivumet, så den treffer alle plasseringene hans likt: r − τ<sub>w</sub> er også det han kan få andre steder i samme risikoklasse.</p>
<div class="formula"><div class="eq">r = (CF + salgspris − kjøpspris)/kjøpspris</div><div class="eq">r<sub>etter</sub> = (CF + salgspris − kjøpspris − τ<sub>w</sub> × kjøpspris)/kjøpspris = r − τ<sub>w</sub></div><div class="where">CF er kontantstrømmen i perioden (utbytte, renter). Formelen gjelder når formuesverdien er lik markedsverdien.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Du kjøper for 20 mill. kr, får 1 mill. kr i utbytte og selger for 20,4 mill. kr. Før skatt: (1 + 20,4 − 20)/20 = 1,4/20 = 7 %.</p><p>Formuesskatt 1 % av 20 = 0,2 mill. kr. Etter skatt: (1,4 − 0,2)/20 = 1,2/20 = 6 %, som er 7 % − 1 %.</p></div>`,
      q: `<p>Ola kjøper aksjer for 50 mill. kr ved inngangen til året, mottar 2 mill. kr i utbytte ved årets slutt og selger aksjene for 51 mill. kr. Han betaler 1 % formuesskatt av investeringens verdi ved inngangen til året. Se bort fra aksjerabatten, bunnfradraget og skatt på utbytte og gevinst. Hva er avkastningen hans etter formuesskatt?</p>`,
      options: ["6,00 %", "3,00 %", "5,00 %", "4,98 %"],
      answer: 2,
      solution: `<p>Før skatt: (2 + 51 − 50)/50 = 3/50 = 6,00 %.</p><p>Formuesskatt: 50 × 1 % = 0,5 mill. kr.</p><p>Etter skatt: (3 − 0,5)/50 = 2,5/50 = <b>5,00 %</b>.</p>`,
      check: `<p>Formelen: 6 % − 1 % = 5 %. I kroner: Ola sitter igjen med 51 + 2 − 0,5 = 52,5 mill. kr av 50 og 52,5/50 − 1 = 5 %.</p>`,
      traps: [
        "Avkastningen før formuesskatt: 3/50 = 6,00 %.",
        "Glemte kursgevinsten: (2 − 0,5)/50 = 3,00 %. Totalavkastningen er direkteavkastning pluss kursgevinst.",
        null,
        "Regnet formuesskatten av verdien ved utgangen: 51 × 1 % = 0,51 og (3 − 0,51)/50 = 4,98 %.",
      ],
    },
    {
      id: "avkastningsskatt-4",
      title: "Verdsetting når skatten også treffer alternativet: V = CF/r",
      theory: `<p>I et effisient marked gir alle investeringer i samme risikoklasse samme avkastning r og en evig kontantstrøm CF er da verdt CF/r. Betaler investoren formuesskatt av markedsverdien V, er netto kontantstrøm CF − τ<sub>w</sub>V. Men skatten treffer også alternativet hans, så avkastningskravet faller til r − τ<sub>w</sub> (steg 3). Setter du avkastningen etter skatt lik kravet etter skatt, stryker τ<sub>w</sub> seg og verdien blir den samme som uten formuesskatt. Bare hvis alternativet ikke rammes, blir kravet stående på r. Da er bare telleren justert og verdien faller til CF/(r + τ<sub>w</sub>). Det er et tenkt tilfelle i kursets modell, men feilsvarene i H2025 oppgave 3 er laget av justeringer gjort på bare den ene siden.</p>
<div class="formula"><div class="eq">(CF − τ<sub>w</sub>V)/V = r − τ<sub>w</sub> &nbsp;⟺&nbsp; CF/V = r &nbsp;⟺&nbsp; V = CF/r</div><div class="eq">Rammes ikke alternativet: (CF − τ<sub>w</sub>V)/V = r &nbsp;⟺&nbsp; V = CF/(r + τ<sub>w</sub>)</div><div class="where">Formuesverdien er markedsverdien V. Tell justeringene: i første linje er skatten trukket fra både i kontantstrømmen og i avkastningskravet. De to opphever hverandre (Bjerksund og Schjelderup, manualen 8.3). Én justering i telleren og ingen i nevneren gir andre linje.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>r = 5 %, CF = 2 mill. kr i året og τ<sub>w</sub> = 1 %. Kravet etter skatt er 4 % og (2 − 0,01V)/V = 0,04 gir 2/V = 0,05, altså V = 40 mill. kr. Kontroll: skatten er 0,4, netto kontantstrøm 1,6 og 1,6/40 = 4 %.</p><p>Rammes ikke alternativet, er V = 2/(0,05 + 0,01) = 33,3 mill. kr. Kontroll: skatten er 0,333, netto kontantstrøm 1,667 og 1,667/33,3 = 5 %.</p></div>`,
      q: `<p>Kapitalmarkedet er effisient, så alle investeringer i samme risikoklasse gir 6 % avkastning før formuesskatt. En investor betaler formuesskatt på 1 % av markedsverdien ved periodens begynnelse av alt han eier, også av alternativene sine. Formuesverdien er lik markedsverdien. Han vurderer en investering i samme risikoklasse som gir 3 mill. kr i året i all framtid. Se bort fra bunnfradrag, rabatt og skatt på avkastningen. Hvor mye er investeringen verdt for ham?</p>`,
      options: ["50,0 mill. kr", "42,9 mill. kr", "60,0 mill. kr", "41,7 mill. kr"],
      answer: 0,
      solution: `<p>Alternativet gir 6 % − 1 % = 5 % etter formuesskatt.</p><p>(3 − 0,01V)/V = 0,05 ⟹ 3/V − 0,01 = 0,05 ⟹ 3/V = 0,06 ⟹ V = <b>50,0 mill. kr</b>.</p>`,
      check: `<p>Sett inn V = 50: formuesskatten er 0,5, netto kontantstrøm 2,5 og 2,5/50 = 5 %, nøyaktig kravet. En investor uten formuesskatt verdsetter strømmen til 3/0,06 = 50 mill. kr, altså det samme.</p>`,
      traps: [
        null,
        "Brukte formelen for et alternativ som ikke beskattes: 3/(0,06 + 0,01) = 42,9 mill. kr. Her betaler han formuesskatt også på alternativet.",
        "Senket avkastningskravet, men trakk ikke skatten fra kontantstrømmen: 3/(0,06 − 0,01) = 60,0 mill. kr.",
        "Halv justering: trakk skatten fra kontantstrømmen, men diskonterte med 6 % før skatt: (3 − 0,5)/0,06 = 41,7 mill. kr.",
      ],
    },
    {
      id: "avkastningsskatt-5",
      title: "Utbyttet som skal betale formuesskatten, regnet av formuesverdien",
      theory: `<p>En eier av et unotert selskap har ofte formuen i selskapet og ingen penger å betale formuesskatten med. Han må ta utbytte, som beskattes med eierskatten t<sub>e</sub> = 22 % × 1,72 = 37,84 % <b>[dagens regel]</b>. Det som er igjen etter eierskatt, skal akkurat dekke formuesskatten. Utbyttet må derfor bruttoregnes: del på (1 − t<sub>e</sub>), ikke gang med (1 + t<sub>e</sub>). Formuesskatten regnes av formuesverdien, ikke av markedsverdien. Aksjer verdsettes til 80 % av en skattemessig verdi. For børsnoterte aksjer er den kursverdien. For unoterte aksjer bygger den på selskapets bokførte tall og ligger ofte langt under det selskapet er verdt i markedet <b>[dagens regel]</b>.</p>
<div class="formula"><div class="eq">W = (1 − ρ) × skattemessig verdi</div><div class="eq">D × (1 − t<sub>e</sub>) = τ<sub>w</sub> × W &nbsp;⟹&nbsp; D = τ<sub>w</sub> × W/(1 − t<sub>e</sub>)</div><div class="where">ρ = 20 % for aksjer og aksjefond. D er bruttoutbyttet og W formuesverdien. Kontroll: D − t<sub>e</sub> × D skal bli nøyaktig formuesskatten.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Unoterte aksjer med skattemessig verdi kr 3 000 000 og τ<sub>w</sub> = 1,0 %: W = 3 000 000 × 0,80 = 2 400 000 og formuesskatten er 24 000.</p><p>D = 24 000/(1 − 0,3784) = 24 000/0,6216 = kr 38 610. Eierskatten er 38 610 × 37,84 % = 14 610 og 38 610 − 14 610 = 24 000.</p></div>`,
      q: `<p>Per eier alle aksjene i et unotert selskap og har ingen gjeld. Aksjene har en markedsverdi på kr 10 000 000. Den skattemessige verdien, som bygger på selskapets bokførte verdier, er kr 6 000 000 og unoterte aksjer verdsettes til 80 % av denne <b>[dagens regel]</b>. Per har ingen andre midler og må ta utbytte for å betale formuesskatten på aksjene. Formuesskatten er 1,0 % og eierskatten på utbytte er 37,84 % <b>[dagens regel]</b>. Se bort fra skjermingsfradraget og bunnfradraget. Hvor stort utbytte må han ta for at det som er igjen etter eierskatten, akkurat dekker formuesskatten?</p>`,
      options: ["kr 77 220", "kr 128 700", "kr 160 875", "kr 96 525"],
      answer: 0,
      solution: `<p>Formuesverdi: 6 000 000 × 0,80 = 4 800 000.</p><p>Formuesskatt: 4 800 000 × 1,0 % = 48 000.</p><p>D = 48 000/(1 − 0,3784) = 48 000/0,6216 = <b>kr 77 220</b>.</p>`,
      check: `<p>Eierskatten er 77 220 × 37,84 % = 29 220 og 77 220 − 29 220 = 48 000, nøyaktig formuesskatten. Markedsverdien brukes ikke noe sted i regningen: regnet av den er belastningen bare 77 220/10 000 000 = 0,77 %.</p>`,
      traps: [
        null,
        "Brukte børsregelen på et unotert selskap, 80 % av markedsverdien: 8 000 000 × 1,0 %/0,6216 = 128 700.",
        "Brukte markedsverdien som grunnlag: 10 000 000 × 1,0 %/0,6216 = 160 875.",
        "Glemte rabatten: 6 000 000 × 1,0 %/0,6216 = 96 525.",
      ],
    },
    {
      id: "avkastningsskatt-6",
      title: "Argumentene: hvilken del av avkastningen skatten treffer",
      theory: `<p>Adam og Miller deler avkastningen i normalavkastning (betaling for å vente med forbruk) og meravkastning (flaks og risiko, renprofitt, forkledd arbeidsinntekt). Teorien sier at meravkastningen kan skattlegges uten store vridninger, mens normalavkastningen helst bør skånes. Formuesskatten er et fast beløp τ<sub>w</sub>W uansett avkastning, så den tar en stor andel av en normal avkastning og en liten andel av en høy. Det er hovedinnvendingen deres, sammen med at skatten hoper seg opp år for år. Magma-artikkelen (Bjerksund og Schjelderup) snur samme egenskap til et argument for: skatten flytter kapital fra eiere med lav avkastning til eiere med høy. Eksamen tester at du kjenner argumentene, ikke at du er enig.</p>
<div class="formula"><div class="eq">Formuesskatt som andel av avkastningen = τ<sub>w</sub>/r, som faller når r stiger</div><div class="where">En skatt t på kapitalinntekt tar samme andel t av all avkastning, normal eller ikke.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>To personer eier 200 hver. Den ene får normalavkastningen 4 %, altså 8. Den andre får 12 %, altså 24.</p><p>En formuesskatt på 1 % tar 2 fra begge: 25 % av 8, men bare 8,3 % av 24. En skatt på 25 % av kapitalinntekten ville tatt 2 og 6.</p></div>`,
      q: `<p>Adam og Miller mener at en årlig formuesskatt beskatter feil del av avkastningen. Hvilket utsagn beskriver mekanismen bak innvendingen?</p>`,
      options: [
        "Den som får høy avkastning, blir rikere og betaler mer formuesskatt året etter, så skatten treffer meravkastningen hardest",
        "En årlig formuesskatt vrir ingenting fordi ingen kan endre formuen de allerede har; bare en uventet engangsskatt vrir",
        "Skatten er samme beløp uansett avkastning, så den tar en stor del av normalavkastningen og lite av meravkastningen",
        "Skatten senker betalingsviljen for aksjer hos norske investorer, så aksjene havner hos utenlandske eiere som ikke betaler formuesskatt",
      ],
      answer: 2,
      solution: `<p>Formuesskatten er τ<sub>w</sub>W kroner enten avkastningen er normal eller høy. Som andel av avkastningen er den τ<sub>w</sub>/r: stor når r er normal og liten når r er høy. Teorien vil ha det motsatt, med normalavkastningen skånet og meravkastningen skattlagt. Det er <b>mekanismen bak innvendingen</b>.</p>`,
      check: `<p>Regn på eksempelet: to formuer på 200 med 4 % og 12 % avkastning betaler begge 2 i formuesskatt, altså 25 % og 8,3 % av avkastningen. En skatt på kapitalinntekt tar samme andel av begge. Med formuesskatt betaler den som tjener mest, minst per krone avkastning.</p>`,
      traps: [
        "Snur mekanismen. Grunnlaget året etter blir litt større, men per krone avkastning tar formuesskatten minst fra den som får høy avkastning.",
        "Bytter om de to skattene. Det er den uventede engangsskatten som ikke vrir. En årlig skatt er kjent på forhånd og påvirker sparing og porteføljevalg.",
        null,
        "Dette er påstanden Bjerksund og Schjelderup tilbakeviser: skatten senker også avkastningskravet, så betalingsviljen er den samme (steg 4). Det er heller ikke Adam og Millers argument.",
      ],
    },
    {
      id: "avkastningsskatt-7",
      title: "Eierens regning: formuesskatt og utbytteskatt som andel av avkastningen",
      theory: `<p>Må eieren ta utbytte for å betale formuesskatten, er den samlede regningen hele utbyttet D: formuesskatten pluss eierskatten på utbyttet som betaler den. Som andel av avkastningen blir belastningen høyere enn τ<sub>w</sub>/r, fordi hver krone formuesskatt koster 1/(1 − t<sub>e</sub>) kroner i utbytte. Samtidig kan formuesverdien W ligge langt under markedsverdien og rabatten trekker da den andre veien. Dette er forelesningens hovedargument mot formuesskatten for eiere uten likvide midler.</p>
<div class="formula"><div class="eq">Andel av avkastningen = D/(r × V) = τ<sub>w</sub> × W/[(1 − t<sub>e</sub>) × r × V]</div><div class="where">V er markedsverdien, r avkastningen regnet av markedsverdien (etter selskapsskatt) og W formuesverdien. Er W = V, blir andelen τ<sub>w</sub>/[(1 − t<sub>e</sub>) × r].</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Markedsverdi kr 10 000 000 og avkastning 6 %, altså 600 000. Formuesverdien er kr 5 000 000, så formuesskatten er 50 000.</p><p>D = 50 000/0,6216 = 80 438 og 80 438/600 000 = 13,4 % av avkastningen. Uten utbytteskatten ville andelen vært 50 000/600 000 = 8,3 %.</p></div>`,
      q: `<p>Eva eier alle aksjene i et unotert selskap med markedsverdi kr 40 000 000. Selskapet tjener 5 % av markedsverdien i året etter selskapsskatt. Aksjenes formuesverdi etter rabatten er kr 16 000 000. Hun har ingen andre midler og tar akkurat så mye utbytte at det som er igjen etter eierskatten, dekker formuesskatten. Formuesskatten er 1,0 % og utbytte skattlegges med 22 % etter oppjustering med faktoren 1,72 <b>[dagens regel]</b>. Se bort fra skjermingsfradraget og bunnfradraget. Hvor stor andel av årets avkastning går til formuesskatten og eierskatten på dette utbyttet til sammen?</p>`,
      options: ["8,00 %", "12,87 %", "11,03 %", "10,26 %"],
      answer: 1,
      solution: `<p>Avkastning: 40 000 000 × 5 % = 2 000 000.</p><p>Formuesskatt: 16 000 000 × 1,0 % = 160 000.</p><p>Eierskatt: t<sub>e</sub> = 22 % × 1,72 = 37,84 %. Utbytte: D = 160 000/0,6216 = 257 400.</p><p>Andel: 257 400/2 000 000 = <b>12,87 %</b>.</p>`,
      check: `<p>Med formelen: τ<sub>w</sub> × W/V = 1,0 % × 16/40 = 0,4 % og (1 − t<sub>e</sub>) × r = 0,6216 × 5 % = 3,108 %. Da er 0,4/3,108 = 12,87 %. Utbyttet stemmer også: eierskatten er 257 400 × 37,84 % = 97 400 og 257 400 − 97 400 = 160 000.</p>`,
      traps: [
        "Glemte eierskatten på utbyttet: 160 000/2 000 000 = 8,00 %.",
        null,
        "Ganget med (1 + t<sub>e</sub>) i stedet for å dele på (1 − t<sub>e</sub>): 160 000 × 1,3784 = 220 544 og 220 544/2 000 000 = 11,03 %.",
        "Glemte oppjusteringen og brukte 22 % som eierskatt: 160 000/(1 − 0,22) = 205 128 og 205 128/2 000 000 = 10,26 %.",
      ],
    },
    {
      id: "avkastningsskatt-8",
      title: "Eksamensnivå: utgående formue og motsatt vei (H2021 oppgave 3, H2025 oppgave 9)",
      theory: `<p>H2025 oppgave 9 ga formuesskatten og spurte etter avkastningsskatten, med skatten på inngående formue. H2021 oppgave 3 gikk motsatt vei: gitt en avkastningsskatt, finn formuesskattesatsen som gir samme proveny, med skatten på formuen ved periodens <b>slutt</b>. Da står W(1 + r) på venstre side og du deler på (1 + r). På eksamen lå alternativene tett og skilte seg på tidspunktet. Er avkastningsskatten en aksjegevinstskatt, skiller de seg også på om den er oppjustert.</p>
<div class="formula"><div class="eq">Slutten: τ<sub>w</sub> × W(1 + r) = t × r × W &nbsp;⟹&nbsp; τ<sub>w</sub> = t × r/(1 + r)</div><div class="eq">Inngangen: τ<sub>w</sub> = t × r</div><div class="where">Er t skatten på aksjegevinst, er den 22 % × 1,72 = 37,84 % <b>[dagens regel]</b>, som i steg 5.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Renteskatt t = 22 % og r = 5 %, formuesskatten ved periodens slutt: τ<sub>w</sub> = 0,22 × 0,05/1,05 = 1,05 %. Ved inngangen ville den vært 0,22 × 0,05 = 1,10 %.</p><p>Kontroll med W = 100: renteskatten er 100 × 5 % × 22 % = 1,10 og formuesskatten er 105 × 1,0476 % = 1,10.</p></div>`,
      q: `<p>Avkastningen på aksjer skattlegges i dag som gevinst: 22 % etter oppjustering med faktoren 1,72 <b>[dagens regel]</b>. Et forslag er å erstatte gevinstskatten med en formuesskatt som gir samme proveny. La W = 100 være formuen ved periodens begynnelse og r = 6 % avkastningen, som realiseres ved periodens slutt. Formuesskatten skal falle på formuen ved periodens <b>slutt</b>, etter at avkastningen er lagt til. Se bort fra skjermingsfradraget. Hvilken formuesskattesats τ<sub>w</sub> gir samme proveny?</p>`,
      options: ["2,14 %", "2,27 %", "1,25 %", "2,41 %"],
      answer: 0,
      solution: `<p>Gevinstskatt: t = 22 % × 1,72 = 37,84 %. Avkastningen er 100 × 6 % = 6 og skatten 6 × 37,84 % = 2,2704.</p><p>Formuen ved slutten er 106, så τ<sub>w</sub> = 2,2704/106 = <b>2,14 %</b>.</p><p>Med formelen: 0,3784 × 0,06/1,06 = 2,14 %.</p>`,
      check: `<p>Baklengs: 106 × 2,1419 % = 2,2704, nøyaktig gevinstskatten. Andre vei: på inngående formue ville satsen vært 0,3784 × 0,06 = 2,27 % og å flytte grunnlaget til slutten deler på 1,06: 2,2704 %/1,06 = 2,14 %.</p>`,
      traps: [
        null,
        "Brukte formelen for inngående formue: 0,3784 × 0,06 = 2,27 %. Oppgaven legger skatten på formuen ved slutten.",
        "Glemte oppjusteringen: 0,22 × 0,06/1,06 = 1,25 %.",
        "Ganget med (1 + r) i stedet for å dele: 0,3784 × 0,06 × 1,06 = 2,41 %.",
      ],
    },
    {
      id: "avkastningsskatt-9",
      title: "Eksamensnivå: utbyttet med oppgavens egne satser (H2024 oppgave 7, H2025 oppgave 6)",
      theory: `<p>H2024 oppgave 7 og H2025 oppgave 6 var samme formel med ulike tall. H2019 oppgave 3a ga oppjusteringsfaktoren for seg. Fellene var de samme hver gang: skatten lagt oppå, oppjusteringen glemt og en sats fra hukommelsen i stedet for oppgavens. H2025 oppgave 6 oppga eierskatten til 50 % og kr 1 600 sto som alternativ fordi det er omtrent svaret med dagens 37,84 % (1 609). Bruk satsene i oppgaveteksten.</p>
<div class="formula"><div class="eq">t<sub>e</sub> = 22 % × f &nbsp;·&nbsp; D = τ<sub>w</sub> × W/(1 − t<sub>e</sub>)</div><div class="where">f er oppjusteringsfaktoren: 1,72 i dag, 1,6 i H2022-settet og 1,44 i H2019-settet. Utelukk raskt: med t<sub>e</sub> under 50 % er D mindre enn det dobbelte av formuesskatten.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Formuesverdi kr 20 000 000, τ<sub>w</sub> = 1,0 % og f = 1,44 <b>[eksempeltall fra 2019]</b>. Da er t<sub>e</sub> = 22 % × 1,44 = 31,68 % og formuesskatten 200 000.</p><p>D = 200 000/0,6832 = kr 292 740. Eierskatten er 292 740 × 31,68 % = 92 740 og 292 740 − 92 740 = 200 000.</p></div>`,
      q: `<p>Hans eier alle aksjene i et unotert selskap med formuesverdi kr 80 000 000. Formuesskatten er 1,1 % av hele formuesverdien <b>[eksempeltall; se bort fra bunnfradrag og trinn]</b>. Han har ingen likvide midler og må ta utbytte for å betale formuesskatten. Utbyttet må også dekke eierskatten på seg selv. Utbytte skattlegges med 22 % etter oppjustering med faktoren 1,6 <b>[eksempeltall, faktoren i H2022-settet]</b>. Se bort fra skjermingsfradraget. Hvor stort utbytte må Hans ta? Rund av til nærmeste krone.</p>`,
      options: ["kr 1 128 205", "kr 1 415 701", "kr 1 189 760", "kr 1 358 025"],
      answer: 3,
      solution: `<p>Eierskatt: t<sub>e</sub> = 22 % × 1,6 = 35,2 %.</p><p>Formuesskatt: 80 000 000 × 1,1 % = 880 000.</p><p>D = 880 000/(1 − 0,352) = 880 000/0,648 = <b>kr 1 358 025</b>.</p>`,
      check: `<p>Eierskatten er 1 358 025 × 35,2 % = 478 025 og 1 358 025 − 478 025 = 880 000. Regn også ut hvilken sats hvert tall forutsetter, (D − 880 000)/D: 1 358 025 gir 35,2 %, oppgavens sats. 1 415 701 gir 37,84 %, 1 128 205 gir 22 % og 1 189 760 gir 26,0 %.</p>`,
      traps: [
        "Glemte oppjusteringen: 880 000/(1 − 0,22) = 1 128 205.",
        "Brukte dagens faktor 1,72 i stedet for oppgavens 1,6: 880 000/(1 − 0,3784) = 1 415 701.",
        "Ganget med (1 + t<sub>e</sub>) i stedet for å dele på (1 − t<sub>e</sub>): 880 000 × 1,352 = 1 189 760.",
        null,
      ],
    },
    {
      id: "avkastningsskatt-10",
      title: "Eksamensnivå: hele verdsettingskjeden (H2025 oppgave 3)",
      theory: `<p>H2025 oppgave 3 var fire delspørsmål om én investor: avkastningen uten skatt, avkastningen etter formuesskatt, verdien av en evig strøm uten formuesskatt og verdien med. Svaret på det siste overrasket de fleste: verdien endres ikke. Kjeden er steg 3 og steg 4 i rekkefølge. Finn r fra investeringen du kjenner, med kursgevinsten. «Samme risikoklasse» betyr at r er diskonteringsrenten. Treffer formuesskatten alt investoren eier, faller både kontantstrømmen og kravet, så V = CF/r.</p>
<div class="formula"><div class="eq">r = (CF<sub>1</sub> + salgspris − kjøpspris)/kjøpspris &nbsp;→&nbsp; krav r − τ<sub>w</sub> &nbsp;→&nbsp; (CF<sub>2</sub> − τ<sub>w</sub>V)/V = r − τ<sub>w</sub> &nbsp;→&nbsp; V = CF<sub>2</sub>/r</div><div class="where">CF<sub>1</sub> er kontantstrømmen fra investeringen du kjenner, CF<sub>2</sub> den evige strømmen du skal verdsette. Fellene i settet var 80 mill. (halv justering i delspørsmål c) og 95 mill. (magefølelsen 100 − 5 i delspørsmål d).</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Kjøp for 40 mill. kr, utbytte 2,4 mill. kr, salg for 40 mill. kr: r = 2,4/40 = 6 %. Med 1 % formuesskatt er kravet 5 %.</p><p>En evig strøm på 1,5 mill. kr i samme risikoklasse: V = 1,5/0,06 = 25 mill. kr. Kontroll: skatten er 0,25, netto kontantstrøm 1,25 og 1,25/25 = 5 %.</p></div>`,
      q: `<p>Kapitalmarkedet er effisient, slik at alle investeringer i samme risikoklasse gir samme avkastning. En investor kjøper aksjer for 120 mill. kr ved periodens begynnelse, mottar 6 mill. kr i utbytte ved periodens slutt og selger aksjene for 123,6 mill. kr. Så finner han en annen aksjeinvestering i samme risikoklasse som gir 2,4 mill. kr i året i all framtid. Han betaler formuesskatt på 1 % av markedsverdien ved periodens begynnelse av alt han eier. Formuesverdien er lik markedsverdien. Se bort fra aksjerabatt, bunnfradrag og skatt på kapitalavkastning. Hvordan verdsetter han den nye investeringen?</p>`,
      options: ["26,25 mill. kr", "30,00 mill. kr", "48,00 mill. kr", "26,67 mill. kr"],
      answer: 1,
      solution: `<p>Avkastningen i risikoklassen: (6 + 123,6 − 120)/120 = 9,6/120 = 8 %.</p><p>Kravet etter formuesskatt: 8 % − 1 % = 7 %.</p><p>(2,4 − 0,01V)/V = 0,07 ⟹ 2,4/V = 0,08 ⟹ V = <b>30,00 mill. kr</b>.</p>`,
      check: `<p>Sett inn V = 30: formuesskatten er 0,30, netto kontantstrøm 2,10 og 2,10/30 = 7 %, nøyaktig kravet. Uten formuesskatt er verdien 2,4/0,08 = 30 mill. kr, altså den samme, slik nøytraliteten sier.</p>`,
      traps: [
        "Halv justering: trakk skatten fra strømmen, men diskonterte med 8 % før skatt: (2,4 − 0,01 × 30)/0,08 = 26,25 mill. kr.",
        null,
        "Glemte kursgevinsten: r = 6/120 = 5 % og 2,4/0,05 = 48,00 mill. kr.",
        "Brukte formelen for et alternativ som ikke beskattes: 2,4/(0,08 + 0,01) = 26,67 mill. kr.",
      ],
    },
  ],
});

/* sjanger 5 · effektiv · Skattesystemet: marginalskatt, gjennomsnittsskatt og effektiv skattesats */
window.EDU_DATA.sjangre.push({
  id: "effektiv",
  num: 5,
  title: "Skattesystemet: marginalskatt, gjennomsnittsskatt og effektiv skattesats",
  summary: "Fra skatten på én lønn til eierens samlede sats på utdelt overskudd",
  chapters: [1, 2],
  exam: "7 av 9 sett · H2024 oppgave 4 og 5, H2025 oppgave 5",
  intro: `<p>Gjennomsnittsskatt og effektiv skattesats har kommet i sju av ni sett, oftest som ett eller to raske poeng: trinnskatten for to personer (H2024 oppgave 5), et bunnfradrag som gjør systemet mer progressivt (H2024 oppgave 4), en avskrivning som senker den effektive satsen (H2025 oppgave 5) eller eierens samlede sats på utdelt overskudd (H2019 oppgave 3, H2022 oppgave 1). Regningen er kort, men feilene er faste: marginalsatsen brukt på hele inntekten, skattepliktig inntekt i nevneren der brutto skal stå og selskapets skatt glemt for eieren. Etter siste steg regner du disse oppgavene og kjenner igjen hvert galt alternativ.</p>`,
  steps: [
    {
      id: "effektiv-1",
      title: "Marginalskatt mot gjennomsnittsskatt",
      theory: `<p>To tall beskriver skatten din, men de svarer på hvert sitt spørsmål. <b>Marginalskatten</b> er hvor mye av den neste kronen du tjener som går til skatt. <b>Gjennomsnittsskatten</b> er hvor stor andel av hele inntekten som går til skatt. Marginalskatten styrer valget om å jobbe mer; gjennomsnittsskatten sier hvor mye du betaler i alt.</p>
<div class="formula"><div class="eq">Marginalskatt = ΔT/ΔY</div><div class="eq">Gjennomsnittsskatt = T/Y</div><div class="where">T er samlet skatt i kroner og Y inntekten. ΔT er hvor mye skatten øker når inntekten øker med ΔY. Ligger marginalskatten over gjennomsnittsskatten, trekker hver ny krone gjennomsnittet opp.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Per tjener kr 400 000 og betaler kr 100 000 i skatt. Gjennomsnittsskatten er 100 000/400 000 = 25 %.</p><p>Tjener han kr 10 000 mer, øker skatten til kr 103 500. Marginalskatten er (103 500 − 100 000)/10 000 = 3 500/10 000 = <b>35 %</b>.</p></div>`,
      q: `<p>Lise tjener kr 500 000 og betaler kr 120 000 i skatt. Hun får et lønnstillegg på kr 50 000. Da øker skatten til kr 137 000. Hva er marginalskatten hennes på tillegget?</p>`,
      options: ["24,9 %", "3,1 %", "24,0 %", "34,0 %"],
      answer: 3,
      solution: `<p>Skatteøkningen: 137 000 − 120 000 = 17 000.</p><p>Marginalskatt = ΔT/ΔY = 17 000/50 000 = <b>34,0 %</b>.</p>`,
      check: `<p>Regn baklengs: 120 000 + 34 % × 50 000 = 120 000 + 17 000 = 137 000. ✓ Gjennomsnittsskatten går fra 120 000/500 000 = 24,0 % til 137 000/550 000 = 24,9 %. Den stiger fordi tillegget skattlegges hardere enn gjennomsnittet, slik det alltid blir når marginalskatten ligger over gjennomsnittsskatten.</p>`,
      traps: [
        "Gjennomsnittsskatten etter tillegget, ikke marginalskatten: 137 000/550 000 = 24,9 %.",
        "Skatteøkningen delt på hele den nye lønnen i stedet for på tillegget: 17 000/550 000 = 3,1 %. Marginalskatten måler mot ΔY, ikke mot Y.",
        "Gjennomsnittsskatten før tillegget: 120 000/500 000 = 24,0 %.",
        null,
      ],
    },
    {
      id: "effektiv-2",
      title: "Skatt på alminnelig inntekt: minstefradrag og personfradrag",
      theory: `<p>Skatten på 22 % regnes ikke av lønnen, men av <b>alminnelig inntekt</b>: lønnen minus fradragene. En lønnstaker har to faste fradrag. <b>Minstefradraget</b> er 46 % av lønnen, men aldri mer enn kr 95 700. <b>Personfradraget</b> er kr 114 540 for alle. Satsene er <b>[dagens regel]</b> for 2026.</p>
<div class="formula"><div class="eq">Alminnelig inntekt = lønn − minstefradrag − personfradrag</div><div class="eq">Minstefradrag = min(46 % × lønn; 95 700)</div><div class="eq">Skatt på alminnelig inntekt = 22 % × alminnelig inntekt</div><div class="where">Taket nås ved en lønn på 95 700/0,46 = 208 043 kr. Alminnelig inntekt blir først positiv over 95 700 + 114 540 = 210 240 kr. Betaler du 22 % av lønn, står minstefradraget derfor alltid på taket. Fradragene virker bare mot 22-prosenten.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Lønn kr 400 000 <b>[dagens regel]</b>. 46 % × 400 000 = 184 000, over taket, så minstefradraget blir 95 700. Fradragene til sammen: 95 700 + 114 540 = 210 240.</p><p>Alminnelig inntekt: 400 000 − 210 240 = 189 760. Skatt: 189 760 × 22 % = <b>41 747,20</b> kr.</p></div>`,
      q: `<p>Jon har kr 520 000 i lønn og ingen andre inntekter eller fradrag. Bruk 2026-satsene <b>[dagens regel]</b>: minstefradrag 46 % av lønnen med tak på kr 95 700, personfradrag kr 114 540 og 22 % skatt på alminnelig inntekt. Hvor mye betaler han i skatt på alminnelig inntekt (hele kroner)?</p>`,
      options: ["kr 93 346", "kr 68 147", "kr 114 400", "kr 36 577"],
      answer: 1,
      solution: `<p>Minstefradraget: 46 % × 520 000 = 239 200, over taket, så 95 700.</p><p>Alminnelig inntekt: 520 000 − 95 700 − 114 540 = 309 760.</p><p>Skatt: 309 760 × 22 % = 68 147,20, altså <b>kr 68 147</b>.</p>`,
      check: `<p>Regn som skatt på hele lønnen minus verdien av fradragene: 22 % × 520 000 = 114 400. Fradragene er verdt 22 % × 210 240 = 46 252,80. 114 400 − 46 252,80 = 68 147,20. ✓</p>`,
      traps: [
        "Personfradraget glemt: (520 000 − 95 700) × 22 % = 93 346.",
        null,
        "Ingen fradrag: 520 000 × 22 % = 114 400.",
        "Minstefradraget regnet som 46 % uten tak: (520 000 − 239 200 − 114 540) × 22 % = 36 577.",
      ],
    },
    {
      id: "effektiv-3",
      title: "Trinnskatt, trygdeavgift og gjennomsnittsskatten på en lønn",
      theory: `<p>Trygdeavgiften og trinnskatten regnes av <b>personinntekten</b>, altså brutto lønn uten fradrag. Trygdeavgiften er 7,6 % av hele lønnen. Trinnskatten er den progressive delen: hver sats gjelder bare den delen av lønnen som ligger <i>inne i</i> trinnet. Legg de tre skattene sammen og del på brutto lønn, så har du gjennomsnittsskatten. Nevneren er lønnen før fradrag, ikke alminnelig inntekt. Marginalskatten er 22 % + 7,6 % + satsen i trinnet den neste kronen havner i, høyest 47,4 % over kr 1 467 200.</p>
<table class="data"><tr><th>Trinn (2026)</th><th>Inntekt i trinnet</th><th>Sats</th></tr><tr><td>1</td><td>226 100 til 318 300</td><td>1,7 %</td></tr><tr><td>2</td><td>318 300 til 725 050</td><td>4,0 %</td></tr><tr><td>3</td><td>725 050 til 980 100</td><td>13,7 %</td></tr><tr><td>4</td><td>980 100 til 1 467 200</td><td>16,8 %</td></tr><tr><td>5</td><td>over 1 467 200</td><td>17,8 %</td></tr></table>
<div class="formula"><div class="eq">T = 22 % × (lønn − 210 240) + 7,6 % × lønn + Σ sats<sub>i</sub> × (inntekten som ligger i trinn i)</div><div class="eq">Gjennomsnittsskatt = T/lønn</div><div class="where">Tabellen og satsene er <b>[dagens regel]</b>. 210 240 = 95 700 + 114 540 er fradragene med minstefradraget på taket. Et fullt trinn 1 gir alltid 92 200 × 1,7 % = 1 567,40. Kortform til kontroll: T = 29,6 % × lønn − 46 252,80 + trinnskatt, fordi 22 % og 7,6 % begge treffer lønnen og fradragene er verdt 22 % × 210 240 = 46 252,80.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Lønn kr 500 000 <b>[dagens regel]</b>. Trinn 1 er fullt: (318 300 − 226 100) × 1,7 % = 1 567,40. I trinn 2 ligger 500 000 − 318 300 = 181 700, som gir 7 268. Trinnskatt 8 835,40.</p><p>Alminnelig inntekt 289 760, skatt 63 747,20. Trygdeavgift 500 000 × 7,6 % = 38 000. T = 63 747,20 + 38 000 + 8 835,40 = 110 582,60. Gjennomsnittsskatt: 110 582,60/500 000 = <b>22,12 %</b>.</p></div>`,
      q: `<p>Ali har kr 650 000 i lønn og ingen andre inntekter eller fradrag. Bruk 2026-satsene <b>[dagens regel]</b>: 22 % av alminnelig inntekt, minstefradrag 46 % med tak på kr 95 700, personfradrag kr 114 540, trygdeavgift 7,6 % av lønnen og trinnskatt 1,7 % fra kr 226 100, 4,0 % fra kr 318 300 og 13,7 % fra kr 725 050. Hva er gjennomsnittsskatten hans (to desimaler)?</p>`,
      options: ["24,77 %", "36,61 %", "26,48 %", "33,60 %"],
      answer: 0,
      solution: `<p>Alminnelig inntekt: 650 000 − 95 700 − 114 540 = 439 760, skatt 439 760 × 22 % = 96 747,20.</p><p>Trygdeavgift: 650 000 × 7,6 % = 49 400.</p><p>Trinnskatt: 1 567,40 + (650 000 − 318 300) × 4,0 % = 1 567,40 + 13 268 = 14 835,40.</p><p>T = 96 747,20 + 49 400 + 14 835,40 = 160 982,60. Gjennomsnittsskatt: 160 982,60/650 000 = <b>24,77 %</b>.</p>`,
      check: `<p>Kortformen: 29,6 % × 650 000 − 46 252,80 + 14 835,40 = 192 400 − 46 252,80 + 14 835,40 = 160 982,60. ✓ Svaret må også ligge under satsen på den siste kronen, 22 + 7,6 + 4,0 = 33,6 %, fordi de første kronene skattlegges lavere enn de siste. Det gjør det.</p>`,
      traps: [
        null,
        "Skatten delt på alminnelig inntekt i stedet for brutto lønn: 160 982,60/439 760 = 36,61 %.",
        "Trinnsatsen 4,0 % brukt på hele lønnen i stedet for bare på delen i trinnet: 650 000 × 4,0 % = 26 000 og (96 747,20 + 49 400 + 26 000)/650 000 = 26,48 %.",
        "Marginalskatten brukt som gjennomsnittsskatt: 22 % + 7,6 % + 4,0 % = 33,60 %.",
      ],
    },
    {
      id: "effektiv-4",
      title: "Progressivitet: et bunnfradrag gjør en flat sats progressiv",
      theory: `<p>Et skattesystem er <b>progressivt</b> når gjennomsnittsskatten stiger med inntekten, <b>regressivt</b> når den faller og <b>proporsjonalt</b> når den er lik for alle. Det er andelen som avgjør, ikke kronene: en flat sats tar flest kroner fra den som tjener mest, men samme andel. Med et bunnfradrag B blir den flate satsen progressiv. Fradraget er like mange kroner for alle, men en større andel av en liten inntekt.</p>
<div class="formula"><div class="eq">Gjennomsnittsskatt = t × (Y − B)/Y = t × (1 − B/Y)</div><div class="where">t er den flate satsen og B bunnfradraget. Uten bunnfradrag er gjennomsnittsskatten t for alle. Med B &gt; 0 stiger den mot t når Y vokser, fordi B/Y faller. Marginalskatten er t for alle i begge tilfeller.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Flat sats 20 % over et bunnfradrag på kr 50 000 <b>[eksempeltall]</b>. Med kr 100 000 i inntekt: (100 000 − 50 000) × 20 % = 10 000, gjennomsnittsskatt 10,0 %. Med kr 400 000: 350 000 × 20 % = 70 000, gjennomsnittsskatt 17,5 %.</p><p>Gjennomsnittsskatten stiger med inntekten: systemet er progressivt.</p></div>`,
      q: `<p>Et land har en flat skattesats på 30 % på all inntekt over et bunnfradrag på kr 60 000 <b>[eksempeltall]</b>. Eva tjener kr 200 000 og Tor kr 750 000. Hvilket utsagn er riktig?</p>`,
      options: [
        "Progressivt: gjennomsnittsskatten er 21,0 % for Eva og 27,6 % for Tor",
        "Proporsjonalt: marginalskatten er 30 % for begge",
        "Proporsjonalt: gjennomsnittsskatten er 30,0 % for begge",
        "Regressivt: bunnfradraget fritar 30 % av Evas inntekt, men bare 8 % av Tors",
      ],
      answer: 0,
      solution: `<p>Eva: (200 000 − 60 000) × 30 % = 42 000, gjennomsnittsskatt 42 000/200 000 = 21,0 %.</p><p>Tor: (750 000 − 60 000) × 30 % = 207 000, gjennomsnittsskatt 207 000/750 000 = 27,6 %.</p><p>Gjennomsnittsskatten stiger med inntekten, så systemet er <b>progressivt</b>.</p>`,
      check: `<p>Formelen gir det samme: 30 % × (1 − 60 000/200 000) = 30 % × 0,7 = 21,0 % og 30 % × (1 − 60 000/750 000) = 30 % × 0,92 = 27,6 %. ✓ Begge ligger under 30 %, som de må når et fradrag trekkes fra før satsen brukes.</p>`,
      traps: [
        null,
        "Marginalskatt forvekslet med gjennomsnittsskatt. Marginalskatten er 30 % for begge, men progressivitet måles med gjennomsnittsskatten, som er ulik.",
        "Bunnfradraget glemt: 30 % av hele inntekten gir 30,0 % for begge. Det gjelder bare uten bunnfradrag.",
        "Riktige andeler, feil konklusjon. At Eva får en større andel fritatt, betyr at hun betaler en mindre andel i skatt. Gjennomsnittsskatten stiger med inntekten, altså progressivt.",
      ],
    },
    {
      id: "effektiv-5",
      title: "Effektiv skattesats: del på brutto inntekt (H2025 oppgave 5)",
      theory: `<p>Den <b>effektive skattesatsen</b> er betalt skatt delt på <b>brutto</b> inntekt. Den måler hvor stor del av det du faktisk tjente som gikk til skatt. Fradrag som avskrivning trekker den under den nominelle satsen, fordi de senker skattegrunnlaget uten at inntekten er lavere. Deler du på skattepliktig inntekt i stedet, får du med en flat sats alltid den nominelle satsen tilbake. Da sier målet ingenting.</p>
<div class="formula"><div class="eq">Effektiv skattesats = betalt skatt / brutto inntekt</div><div class="eq">Med flat sats t og avskrivning A: t × (inntekt − A)/inntekt = t × (1 − A/inntekt)</div><div class="where">Brutto inntekt er driftsinntektene før avskrivning. Skattepliktig inntekt, altså inntekten etter fradrag, hører aldri hjemme i nevneren.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Et aksjeselskap har kr 200 000 i driftsinntekter og avskriver kr 40 000. Selskapsskatten er 22 % <b>[dagens regel]</b>.</p><p>Skattepliktig overskudd 160 000, skatt 160 000 × 22 % = 35 200. Effektiv sats: 35 200/200 000 = <b>17,6 %</b>.</p></div>`,
      q: `<p>Smia AS har driftsinntekter på kr 500 000 i år 1 og ingen andre kostnader enn avskrivninger. Selskapet har kjøpt en maskin til kr 240 000 som avskrives med kr 120 000 i år 1 og kr 120 000 i år 2. Selskapsskatten er 22 %. Hva er selskapets effektive skattesats i år 1?</p>`,
      options: ["15,05 %", "22,00 %", "16,72 %", "11,44 %"],
      answer: 2,
      solution: `<p>Skattepliktig overskudd: 500 000 − 120 000 = 380 000.</p><p>Betalt skatt: 380 000 × 22 % = 83 600.</p><p>Effektiv sats: 83 600/500 000 = <b>16,72 %</b>.</p>`,
      check: `<p>Som sats: 22 % × (1 − 120 000/500 000) = 22 % × 0,76 = 16,72 %. ✓ Avskrivningen tar 24 % av grunnlaget og dermed 24 % av satsen.</p>`,
      traps: [
        "Skattepliktig overskudd brukt i stedet for brutto inntekt i satsformelen: 22 % × (1 − 120 000/380 000) = 15,05 %. Avskrivningen skal måles mot brutto inntekt.",
        "Skatten delt på skattepliktig overskudd i stedet for brutto inntekt: 83 600/380 000 = 22,00 %, den nominelle satsen igjen.",
        null,
        "Hele maskinen ført til fradrag i år 1, selv om oppgaven fordeler den over to år: (500 000 − 240 000) × 22 %/500 000 = 11,44 %.",
      ],
    },
    {
      id: "effektiv-6",
      title: "Eierens effektive sats: selskapets skatt og overskudd regnes med",
      theory: `<p>For den som eier et aksjeselskap, er selskapets overskudd eierens inntekt, enten det deles ut eller ikke. Derfor regnes både selskapsskatten og selskapets overskudd med i eierens effektive sats. Utbytte til en personlig eier skattlegges med eierskatten t<sub>e</sub> = 22 % × 1,72 = 37,84 % <b>[dagens regel]</b>, der 1,72 er oppjusteringsfaktoren. Deles alt ut, blir samlet sats 22 % + 78 % × 37,84 % = 51,52 %. Holdes noe tilbake, står det tilbakeholdte overskuddet fortsatt i nevneren.</p>
<div class="formula"><div class="eq">t<sub>eff</sub> = (selskapsskatt + eierskatt) / selskapets overskudd før skatt</div><div class="eq">Eierskatt = (utbytte − skjermingsfradrag) × t<sub>e</sub></div><div class="where">Nevneren er selskapets brutto overskudd, ikke utbyttet og ikke overskuddet etter skatt. Skjermingsfradraget kommer fra aksjonærmodellen; oppgaven oppgir beløpet når det skal brukes. Uten skjerming er eierskatten utbytte × t<sub>e</sub>.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Selskapet tjener kr 400 000 før skatt og betaler 22 %: 88 000. Eieren tar ut kr 100 000 i utbytte og lar resten stå. Eierskatt: 100 000 × 37,84 % = 37 840 <b>[dagens regel]</b>, uten skjerming.</p><p>t<sub>eff</sub> = (88 000 + 37 840)/400 000 = 125 840/400 000 = <b>31,46 %</b>. Hadde han tatt ut alle 312 000, ville satsen blitt (88 000 + 118 060,80)/400 000 = 51,52 %.</p></div>`,
      q: `<p>Hege eier alle aksjene i Fjell AS. Selskapet har et overskudd før skatt på kr 2 000 000 og betaler 22 % selskapsskatt. Det deler ut kr 600 000 til Hege og holder resten tilbake. Eierskatten er 37,84 % <b>[dagens regel]</b>; se bort fra skjerming. Hege har ingen andre inntekter. Hva er Heges effektive skattesats når selskapets skatt og overskudd regnes med?</p>`,
      options: ["33,35 %", "51,52 %", "11,35 %", "37,84 %"],
      answer: 0,
      solution: `<p>Selskapsskatt: 2 000 000 × 22 % = 440 000.</p><p>Eierskatt: 600 000 × 37,84 % = 227 040.</p><p>t<sub>eff</sub> = (440 000 + 227 040)/2 000 000 = 667 040/2 000 000 = <b>33,35 %</b>.</p>`,
      check: `<p>Som sats: 22 % + (600 000/2 000 000) × 37,84 % = 22 % + 0,3 × 37,84 % = 22 % + 11,352 % = 33,352 %. ✓ Svaret må ligge mellom 22 % (ingenting delt ut) og 51,52 % (alt delt ut).</p>`,
      traps: [
        null,
        "Regnet som om alt ble delt ut: 22 % + 78 % × 37,84 % = 51,52 %. Selskapet deler bare ut 600 000.",
        "Selskapets skatt glemt: 227 040/2 000 000 = 11,35 %.",
        "Bare det skattemeldingen viser, eierskatt delt på utbytte: 227 040/600 000 = 37,84 %. Selskapets skatt og overskudd er utelatt.",
      ],
    },
    {
      id: "effektiv-7",
      title: "Tidsverdien av et fradrag: ta det tidlig",
      theory: `<p>Et fradrag er verdt fradraget ganget med skattesatsen, i spart skatt. Kan du velge mellom å ta fradraget nå eller fordele det over flere år, er summen av besparelsene den samme i kroner. Men en krone spart i dag er verdt mer enn en krone spart om fem år, så tidlig fradrag vinner så lenge renten er positiv og du har inntekt å føre det mot. Utsatt skatt virker som et rentefritt lån fra staten.</p>
<div class="formula"><div class="eq">Alt nå: D × t</div><div class="eq">Fordelt over T år: (D/T) × t × [1 − (1 + r)<sup>−T</sup>]/r</div><div class="where">D er fradraget, t skattesatsen og r diskonteringsrenten. Klammen er annuitetsfaktoren: nåverdien av 1 krone betalt ved slutten av hvert av de T årene.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Fradrag kr 60 000, enten nå eller med kr 20 000 i hvert av tre år. Skatt 22 % <b>[dagens regel]</b>, rente 5 % <b>[eksempeltall]</b>.</p><p>Nå: 60 000 × 22 % = 13 200. Fordelt: 4 400 per år, annuitetsfaktor (1 − 1,05<sup>−3</sup>)/0,05 = 2,7232, nåverdi 4 400 × 2,7232 = 11 982. Å ta alt nå er verdt 13 200 − 11 982 = <b>1 218</b> kr mer.</p></div>`,
      q: `<p>Anders AS kjøper utstyr til kr 180 000. Selskapet kan utgiftsføre hele beløpet i år, eller avskrive kr 30 000 i hvert av de neste seks årene. Det har nok inntekt til å bruke fradraget hvert år. Skattesatsen er 22 % hele perioden. Skattebesparelsen ved å utgiftsføre alt kommer i dag; ved avskrivning kommer den ved slutten av hvert av de seks årene. Selskapet diskonterer med 8 % <b>[eksempeltall]</b>. Hvor mye mer er det verdt i nåverdi å utgiftsføre alt nå (hele kroner)?</p>`,
      options: ["kr 6 648", "kr 0", "kr 9 089", "kr 6 156"],
      answer: 2,
      solution: `<p>Alt nå: 180 000 × 22 % = 39 600, mottatt i dag.</p><p>Fordelt: 30 000 × 22 % = 6 600 per år. Annuitetsfaktor (1 − 1,08<sup>−6</sup>)/0,08 = 4,62288. Nåverdi 6 600 × 4,62288 = 30 511,01.</p><p>Forskjell: 39 600 − 30 511,01 = 9 088,99, altså <b>kr 9 089</b> i favør av å utgiftsføre alt nå.</p>`,
      check: `<p>Diskonter hvert år for seg: 6 600/1,08 = 6 111,11, deretter 5 658,44, 5 239,29, 4 851,20, 4 491,85 og 4 159,12. Summen er 30 511,01, som annuitetsfaktoren ga. ✓ Udiskontert er begge veier 39 600 kr, så hele forskjellen er tidsverdi.</p>`,
      traps: [
        "De årlige besparelsene regnet fra i dag i stedet for ved slutten av hvert år: 39 600 − 30 511,01 × 1,08 = 39 600 − 32 951,89 = 6 648.",
        "Udiskonterte kroner sammenlignet: 6 × 6 600 = 39 600 = 180 000 × 22 %, så «det spiller ingen rolle». Det stemmer bare når renten er null.",
        null,
        "Diskonterte også besparelsen ved å utgiftsføre alt, som om den kom ved slutten av året: 39 600/1,08 − 30 511,01 = 36 666,67 − 30 511,01 = 6 156. Oppgaven sier at den kommer i dag.",
      ],
    },
    {
      id: "effektiv-8",
      title: "Eksamensnivå: større bunnfradrag, sterkere progressivitet (H2024 oppgave 4)",
      theory: `<p>H2024 oppgave 4 økte bunnfradraget og spurte om systemet ble mer eller mindre progressivt. Mål det med avstanden i gjennomsnittsskatt mellom en lav og en høy inntekt. Med flat sats er avstanden proporsjonal med bunnfradraget: dobles B, dobles avstanden. Begge betaler færre kroner, men den lave inntekten får skjermet en mye større andel.</p>
<div class="formula"><div class="eq">Gjennomsnittsskatt(Y<sub>høy</sub>) − gjennomsnittsskatt(Y<sub>lav</sub>) = t × B × (1/Y<sub>lav</sub> − 1/Y<sub>høy</sub>)</div><div class="where">Følger av t × (1 − B/Y) fra steg 4. Større B gir større avstand og sterkere progressivitet, så fortegnet svarer på spørsmålet før du har regnet ut en eneste gjennomsnittsskatt.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Flat sats 30 %, inntekter 200 og 800 <b>[eksempeltall]</b>. Bunnfradrag 40: (200 − 40) × 30 %/200 = 24,0 % og (800 − 40) × 30 %/800 = 28,5 %, avstand 4,5 prosentpoeng.</p><p>Bunnfradrag 80: 18,0 % og 27,0 %, avstand 9,0 prosentpoeng. Fradraget er doblet, avstanden er doblet: sterkere progressivitet.</p></div>`,
      q: `<p>Skattesatsen på all inntekt er 25 % <b>[eksempeltall]</b>. Liv har en inntekt på kr 400 og Odd kr 1 600. Bunnfradraget økes fra kr 80 til kr 240, mens satsen er uendret. Hvilket utsagn om skattesystemet etter endringen er riktig, sammenlignet med før?</p>`,
      options: [
        "Svakere progressivt: begge får lavere gjennomsnittsskatt, så skatten omfordeler mindre enn før",
        "Like progressivt: marginalskatten er 25 % for begge, før og etter",
        "Like progressivt: begge betaler kr 40 mindre i skatt enn før",
        "Sterkere progressivt: avstanden i gjennomsnittsskatt øker fra 3,75 til 11,25 prosentpoeng",
      ],
      answer: 3,
      solution: `<p>Før, med B = 80: Liv (400 − 80) × 25 % = 80, altså 80/400 = 20,0 %. Odd (1 600 − 80) × 25 % = 380, altså 380/1 600 = 23,75 %. Avstand 3,75 prosentpoeng.</p><p>Etter, med B = 240: Liv (400 − 240) × 25 % = 40, altså 40/400 = 10,0 %. Odd (1 600 − 240) × 25 % = 340, altså 340/1 600 = 21,25 %. Avstand 11,25 prosentpoeng.</p><p>Gjennomsnittsskatten stiger fortsatt med inntekten. Avstanden er tredoblet: <b>sterkere progressivt</b>.</p>`,
      check: `<p>Formelen: 25 % × 80 × (1/400 − 1/1 600) = 20 × 0,001875 = 0,0375, altså 3,75 prosentpoeng. Med B = 240: 25 % × 240 × (1/400 − 1/1 600) = 60 × 0,001875 = 0,1125, altså 11,25 prosentpoeng. ✓ B tredobles, avstanden tredobles.</p>`,
      traps: [
        "Progressivitet målt med skattenivået i stedet for med hvordan gjennomsnittsskatten stiger med inntekten. Begge betaler mindre, men Livs sats faller med 10 prosentpoeng og Odds bare med 2,5, så avstanden øker.",
        "Marginalskatt forvekslet med gjennomsnittsskatt. Marginalskatten er 25 % hele tiden, men progressivitet måles med gjennomsnittsskatten.",
        "Kroner i stedet for andeler: begge sparer (240 − 80) × 25 % = 40 kr, men 40 kr er 10 % av Livs inntekt og 2,5 % av Odds.",
        null,
      ],
    },
    {
      id: "effektiv-9",
      title: "Eksamensnivå: gjennomsnittsskatt i et trinnsystem (H2024 oppgave 5)",
      theory: `<p>H2024 oppgave 5 ga tre satser med hvert sitt intervall og to personer. Alle fire alternativene var tallpar. Fyll de nederste trinnene helt, legg til toppsjiktet for hver person og del på inntekten. To raske grenser luker ut gale par: for en inntekt over toppgrensen må gjennomsnittsskatten ligge over gjennomsnittsskatten ved grensen og under toppsatsen.</p>
<div class="formula"><div class="eq">T(Y) = skatt på de fulle trinnene under + toppsats × (Y − toppgrense)</div><div class="eq">T(grense)/grense &lt; T(Y)/Y &lt; toppsats</div><div class="where">Differansen i skatt mellom to personer over toppgrensen er toppsatsen ganget med differansen i inntekt.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Satser <b>[eksempeltall]</b>: 10 % under kr 80 000, 25 % mellom kr 80 000 og kr 250 000, 35 % over kr 250 000. Inntekt kr 320 000.</p><p>Fulle trinn: 80 000 × 10 % = 8 000 og 170 000 × 25 % = 42 500. Toppsjiktet: 70 000 × 35 % = 24 500. T = 75 000, gjennomsnittsskatt 75 000/320 000 = <b>23,4 %</b>. Grensene: ved 250 000 er gjennomsnittsskatten 50 500/250 000 = 20,2 %. Svaret på 23,4 % ligger mellom 20,2 % og 35 %.</p></div>`,
      q: `<p>I et land <b>[eksempeltall]</b> skattlegges inntekt under kr 120 000 med 8 %, inntekt mellom kr 120 000 og kr 300 000 med 20 % og inntekt over kr 300 000 med 32 %. Siv har en skattepliktig inntekt på kr 540 000 og Leo kr 370 000. Hva er gjennomsnittsskatten deres (én desimal)?</p>`,
      options: ["Siv 25,3 % og Leo 22,3 %", "Siv 22,7 % og Leo 18,4 %", "Siv 8,4 % og Leo 12,3 %", "Siv 37,8 % og Leo 27,6 %"],
      answer: 1,
      solution: `<p>Fulle trinn, like for begge: 120 000 × 8 % = 9 600 og 180 000 × 20 % = 36 000, til sammen 45 600.</p><p>Siv: 45 600 + (540 000 − 300 000) × 32 % = 45 600 + 76 800 = 122 400, gjennomsnittsskatt 122 400/540 000 = 22,67 %, altså <b>22,7 %</b>.</p><p>Leo: 45 600 + 70 000 × 32 % = 45 600 + 22 400 = 68 000, gjennomsnittsskatt 68 000/370 000 = 18,38 %, altså <b>18,4 %</b>.</p>`,
      check: `<p>Differansen i inntekt, 170 000, ligger i 32 %-sjiktet: 170 000 × 32 % = 54 400, som er nøyaktig 122 400 − 68 000. ✓ Ved grensen er gjennomsnittsskatten 45 600/300 000 = 15,2 %, så begge tallene må ligge mellom 15,2 % og 32 %. Det utelukker paret med 8,4 % og paret med 37,8 %.</p>`,
      traps: [
        "Det nederste trinnet hoppet over, 20 % brukt fra første krone: Siv (60 000 + 76 800)/540 000 = 25,3 %, Leo (60 000 + 22 400)/370 000 = 22,3 %.",
        null,
        "Toppsjiktet glemt: 45 600/540 000 = 8,4 % og 45 600/370 000 = 12,3 %.",
        "Hver sats brukt på all inntekt over sitt innslagspunkt: Siv (43 200 + 84 000 + 76 800)/540 000 = 37,8 %, Leo (29 600 + 50 000 + 22 400)/370 000 = 27,6 %. Over toppsatsen, altså umulig.",
      ],
    },
    {
      id: "effektiv-10",
      title: "Eksamensnivå: eierens samlede sats regnet fra utbyttet (H2019 oppgave 3)",
      theory: `<p>Den vanskeligste varianten i sjangeren oppgir det eieren fikk ut av selskapet, ikke overskuddet. H2019 oppgave 3 oppga en gevinst som var alt selskapet hadde igjen etter selskapsskatt. Spørsmålet var samlet skatt i prosent av brutto overskudd. Da må du regne overskuddet før skatt baklengs: det eieren får, er 78 % av det, så du deler på 0,78. Å legge 22 % oppå beløpet gir for lite, fordi selskapsskatten er 22 % av det større beløpet. H2022 oppgave 1 la til et skjermingsfradrag, som trekkes fra utbyttet før eierskatten regnes.</p>
<div class="formula"><div class="eq">Overskudd før skatt = utbytte/(1 − 22 %)</div><div class="eq">t<sub>eff</sub> = [22 % × overskudd + t<sub>e</sub> × (utbytte − skjermingsfradrag)]/overskudd</div><div class="where">Kontroll som sats: t<sub>eff</sub> = 22 % + 78 % × t<sub>e</sub> × (1 − skjermingsfradrag/utbytte). Uten skjerming blir det 51,52 % med dagens satser.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Eieren får kr 1 170 000 i utbytte, alt selskapet hadde igjen etter 22 % skatt. Skjermingsfradraget er kr 70 000 og eierskatten 37,84 % <b>[dagens regel]</b>.</p><p>Overskudd før skatt: 1 170 000/0,78 = 1 500 000. Selskapsskatt: 330 000. Eierskatt: (1 170 000 − 70 000) × 37,84 % = 416 240. Samlet: 746 240/1 500 000 = <b>49,75 %</b>.</p></div>`,
      q: `<p>Kristin eier alle aksjene i Kyst AS. I år fikk hun kr 3 120 000 i utbytte, som var alt selskapet hadde igjen av årets overskudd etter 22 % selskapsskatt. Hun har et skjermingsfradrag på kr 120 000. Eierskatten er 37,84 % <b>[dagens regel]</b>. Hvor stor er samlet skatt (selskapsskatt og eierskatt) i prosent av selskapets brutto overskudd (to desimaler)?</p>`,
      options: ["47,86 %", "51,52 %", "50,38 %", "28,38 %"],
      answer: 2,
      solution: `<p>Overskudd før skatt: 3 120 000/0,78 = 4 000 000. Selskapsskatt: 4 000 000 × 22 % = 880 000.</p><p>Eierskatt: (3 120 000 − 120 000) × 37,84 % = 3 000 000 × 37,84 % = 1 135 200.</p><p>Samlet: 880 000 + 1 135 200 = 2 015 200, altså 2 015 200/4 000 000 = <b>50,38 %</b>.</p>`,
      check: `<p>Baklengs: 4 000 000 − 880 000 = 3 120 000, nøyaktig utbyttet. ✓ Som sats: 22 % + 78 % × 37,84 % × (1 − 120 000/3 120 000) = 22 % + 29,5152 % × 0,961538 = 22 % + 28,38 % = 50,38 %. ✓ Skjermingen er grunnen til at svaret ligger litt under 51,52 %.</p>`,
      traps: [
        "Overskuddet regnet ved å legge 22 % oppå utbyttet: selskapsskatt 3 120 000 × 22 % = 686 400 og brutto 3 806 400, så (686 400 + 1 135 200)/3 806 400 = 47,86 %. Riktig er å dele på 0,78.",
        "Skjermingsfradraget oversett, standardsatsen brukt: 22 % + 78 % × 37,84 % = 51,52 %.",
        null,
        "Selskapets skatt glemt for eieren: 1 135 200/4 000 000 = 28,38 %.",
      ],
    },
  ],
});

/* sjanger 6 · pensjon · Pensjon: folketrygden, innskudd mot ytelse og IPS */
window.EDU_DATA.sjangre.push({
  id: "pensjon",
  num: 6,
  title: "Pensjon: folketrygden, innskudd mot ytelse og IPS",
  summary: "Fra opptjeningen i folketrygden til samlet kompensasjonsgrad og IPS etter skatt",
  chapters: [15],
  exam: "6 av 9 sett · 10,4 % av poengene · H2024 oppgave 13a og 13b, H2025 oppgave 14 og 17",
  intro: `<p>Pensjon kom i seks av ni sett, både som regning på folketrygden (beholdning, delingstall og kompensasjonsgrad) og som påstander om innskudd, ytelse og IPS. Flervalgssettene har spurt om begrepene (H2024 oppgave 13a og 13b, H2025 oppgave 14 og 17), mens de åpne settene og flervalgstesten til kursgodkjenning 2026 regnet kompensasjonsgraden. Etter siste steg regner du beholdning, årlig pensjon og kompensasjonsgrad med og uten taket på 7,1 G, legger innskuddspensjonen til og vet hva IPS er verdt etter skatt.</p>`,
  steps: [
    {
      id: "pensjon-1",
      title: "Opptjening: 18,1 % av inntekten opp til 7,1 G",
      theory: `<p>Alderspensjonen fra folketrygden bygges opp som en <b>pensjonsbeholdning</b>. Hvert år med inntekt legges 18,1 % av den pensjonsgivende inntekten til. Alle år teller (<b>alleårsregelen</b>). Inntekt over <b>7,1 G</b> gir ingen opptjening. G er <b>grunnbeløpet</b>, et kronebeløp som justeres hvert år med lønnsveksten: kr 136 549 fra 1. mai 2026, så taket er 7,1 × 136 549 = kr 969 498 <b>[dagens regel]</b>. Oppgavene oppgir G selv. Eldre sett bruker andre tall.</p>
<div class="formula"><div class="eq">Opptjening = 18,1 % × min(inntekt; 7,1 G)</div><div class="where">min betyr det minste av de to tallene. Største mulige opptjening i 2026 er 18,1 % × 969 498 = kr 175 479 <b>[dagens regel]</b>.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>G = kr 136 549 <b>[dagens regel]</b>. En lønn på kr 700 000 ligger under taket, så hele lønnen teller: 18,1 % × 700 000 = kr 126 700.</p><p>En lønn på kr 1 200 000 ligger over taket. Bare 969 498 teller. Opptjeningen er 18,1 % × 969 498 = kr 175 479. De 230 502 kronene over taket gir ingenting.</p></div>`,
      q: `<p>Anta at grunnbeløpet er G = kr 120 000 <b>[eksempeltall]</b>. Jon har en pensjonsgivende inntekt på kr 1 000 000 dette året. Hvert år legges 18,1 % av pensjonsgivende inntekt opp til 7,1 G til pensjonsbeholdningen <b>[dagens regel]</b>. Hvor stor er Jons opptjening dette året, altså beløpet som legges til beholdningen for årets inntekt?</p>`,
      options: ["kr 181 000", "kr 852 000", "kr 154 212", "kr 175 479"],
      answer: 2,
      solution: `<p>Taket: 7,1 × 120 000 = kr 852 000. Inntekten er høyere, så bare 852 000 teller.</p><p>Opptjening: 18,1 % × 852 000 = <b>kr 154 212</b>.</p>`,
      check: `<p>Ingen kan tjene opp mer enn 18,1 % × 7,1 = 1,2851 G på ett år: 1,2851 × 120 000 = 154 212. Uten taket ville opptjeningen vært 181 000. Forskjellen er 18,1 % av de 148 000 kronene over taket: 0,181 × 148 000 = 26 788 og 181 000 − 26 788 = 154 212.</p>`,
      traps: [
        "Glemte taket: 18,1 % × 1 000 000 = 181 000. Inntekt over 7,1 G gir ingen opptjening.",
        "Stoppet etter taket og svarte med inntekten som gir opptjening: 7,1 × 120 000 = 852 000. Opptjeningen er 18,1 % av den.",
        null,
        "Brukte dagens G i stedet for oppgavens: 18,1 % × 7,1 × 136 549 = 175 479.",
      ],
    },
    {
      id: "pensjon-2",
      title: "Beholdningen fra år til år: reguler først, legg til etterpå",
      theory: `<p>Beholdningen reguleres hvert år med lønnsveksten, slik at den holder verdien målt mot lønningene. Rekkefølgen er fast: først vokser det som lå i beholdningen ved inngangen til året, deretter legges årets opptjening til. Årets opptjening reguleres ikke samme år, fordi den ikke lå i beholdningen gjennom året. H2019 oppgave 6c var akkurat denne regningen.</p>
<div class="formula"><div class="eq">B<sub>t</sub> = B<sub>t−1</sub> × (1 + g) + 18,1 % × min(inntekt<sub>t</sub>; 7,1 G)</div><div class="where">B er pensjonsbeholdningen og g lønnsveksten, målt ved veksten i G.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Beholdning kr 1 000 000 ved inngangen til året, lønnsvekst 4 % <b>[eksempeltall]</b>, inntekt kr 500 000 og G = kr 136 549 <b>[dagens regel]</b>.</p><p>Regulert: 1 000 000 × 1,04 = 1 040 000. Inntekten er under taket på 969 498, så opptjeningen er 18,1 % × 500 000 = 90 500. Ved utgangen av året: 1 040 000 + 90 500 = kr 1 130 500.</p></div>`,
      q: `<p>Ved inngangen til 2026 har Aisha en pensjonsbeholdning på kr 1 850 000 <b>[eksempeltall]</b>. I 2026 har hun en pensjonsgivende inntekt på kr 640 000. G = kr 136 549 og hvert år legges 18,1 % av inntekt opp til 7,1 G til beholdningen <b>[dagens regel]</b>. Beholdningen reguleres med lønnsveksten før årets opptjening legges til. Anta at lønnsveksten er 4,5 % <b>[eksempeltall]</b>. Hvor stor er pensjonsbeholdningen ved utgangen av 2026?</p>`,
      options: ["kr 1 965 840", "kr 2 049 090", "kr 2 108 729", "kr 2 054 303"],
      answer: 1,
      solution: `<p>Reguler: 1 850 000 × 1,045 = 1 933 250.</p><p>Taket er 7,1 × 136 549 = 969 498. Inntekten er under, så hele teller: 18,1 % × 640 000 = 115 840.</p><p>Beholdning: 1 933 250 + 115 840 = <b>kr 2 049 090</b>.</p>`,
      check: `<p>Økningen i løpet av året er 2 049 090 − 1 850 000 = 199 090. Den skal være reguleringen pluss opptjeningen: 1 850 000 × 4,5 % = 83 250 og 83 250 + 115 840 = 199 090.</p>`,
      traps: [
        "Glemte reguleringen: 1 850 000 + 115 840 = 1 965 840. Det som lå i beholdningen, skal først vokse med lønnsveksten.",
        null,
        "Brukte største mulige opptjening selv om inntekten er under taket: 1 933 250 + 18,1 % × 969 498 = 1 933 250 + 175 479 = 2 108 729.",
        "Snudde rekkefølgen: (1 850 000 + 115 840) × 1,045 = 2 054 303. Da får årets opptjening et helt års regulering den ikke har hatt.",
      ],
    },
    {
      id: "pensjon-3",
      title: "Et helt yrkesliv: regn beholdningen i G",
      theory: `<p>Når lønnen følger lønnsveksten, er en lønn på for eksempel 5 G like mye verdt i G hvert år. Beholdningen reguleres også med G. Da kan du regne alt i G: hvert år gir 18,1 % × min(lønn i G; 7,1) G. Du summerer over årene og ganger med dagens G til slutt. Reguleringen er da allerede tatt med. Alleårsregelen betyr at alle årene teller, også de tidlige med lav lønn. Et år over taket teller bare med 7,1 G (H2016 oppgave 4c).</p>
<div class="formula"><div class="eq">Beholdning i G = sum over årene av 18,1 % × min(lønn i G; 7,1)</div><div class="eq">Beholdning i kroner = beholdning i G × dagens G</div><div class="where">Er lønnen i G lik i en periode, ganger du årets opptjening med antall år i perioden.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>30 år med en lønn på 4 G: 18,1 % × 4 × 30 = 21,72 G.</p><p>Med G = kr 136 549 <b>[dagens regel]</b> er beholdningen 21,72 × 136 549 = kr 2 965 844.</p></div>`,
      q: `<p>Mari har hatt pensjonsgivende inntekt i 38 år: de første 14 årene 3,5 G og de siste 24 årene 8 G <b>[eksempeltall]</b>. Innenfor hver periode har lønnen fulgt G. Hvert år legges 18,1 % av inntekt opp til 7,1 G til beholdningen. Beholdningen reguleres med G <b>[dagens regel]</b>. Hvor stor er pensjonsbeholdningen hennes i dag, med G = kr 136 549 <b>[dagens regel]</b>?</p>`,
      options: ["kr 5 422 552", "kr 5 956 404", "kr 6 668 207", "kr 4 211 499"],
      answer: 0,
      solution: `<p>De første 14 årene: 18,1 % × 3,5 × 14 = 8,869 G.</p><p>De siste 24 årene: 8 G er over taket, så bare 7,1 G teller: 18,1 % × 7,1 × 24 = 30,8424 G.</p><p>Sum: 8,869 + 30,8424 = 39,7114 G. I kroner: 39,7114 × 136 549 = <b>kr 5 422 552</b>.</p>`,
      check: `<p>Regn periodene i kroner hver for seg: 8,869 × 136 549 = 1 211 053 og 30,8424 × 136 549 = 4 211 499. Summen er 1 211 053 + 4 211 499 = 5 422 552.</p>`,
      traps: [
        null,
        "Glemte taket i de 24 årene: 18,1 % × 8 × 24 = 34,752 G, i alt 43,621 G og 43,621 × 136 549 = 5 956 404.",
        "Regnet som om hele yrkeslivet lå på sluttlønnsnivå, slik den gamle folketrygden gjorde: 18,1 % × 7,1 × 38 = 48,8338 G og 48,8338 × 136 549 = 6 668 207.",
        "Tok bare med årene med høy lønn: 30,8424 × 136 549 = 4 211 499. Alleårsregelen teller også de første 14 årene.",
      ],
    },
    {
      id: "pensjon-4",
      title: "Årlig pensjon: beholdningen delt på delingstallet",
      theory: `<p>Ved uttak deles beholdningen på et <b>delingstall</b>, og resultatet er den årlige alderspensjonen, livsvarig. Delingstallet er omtrent forventet antall gjenstående leveår ved uttak. Det fastsettes for hvert årskull det året kullet fyller 61 år og er felles for kvinner og menn. <b>Levealdersjusteringen</b>: lever yngre kull lenger, får de høyere delingstall ved samme uttaksalder og dermed lavere årlig pensjon av samme beholdning. Bruk derfor delingstallet for personens eget kull og egen uttaksalder.</p>
<div class="formula"><div class="eq">Årlig alderspensjon = pensjonsbeholdning / delingstall</div><div class="where">Du deler, ikke ganger: delingstallet er antall år beholdningen fordeles på. H2016 oppgave 4c delte en beholdning på 4 441 852 på delingstallet 21,37.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Beholdning kr 4 000 000 og delingstall 18,50 <b>[eksempeltall]</b>: 4 000 000/18,50 = kr 216 216 i året.</p><p>Kontroll: 216 216 × 18,50 = 3 999 996, beholdningen opp til avrundingen.</p></div>`,
      q: `<p>Erlend er født i 1994 og tar ut alderspensjon fra folketrygden som 67-åring. Da har han hatt pensjonsgivende inntekt i 42 år og har en pensjonsbeholdning på kr 5 450 000 <b>[eksempeltall]</b>. Delingstallet ved uttak som 67-åring er 16,95 for 1964-kullet og 18,60 for 1994-kullet <b>[eksempeltall]</b>. Hvor stor blir den årlige alderspensjonen hans?</p>`,
      options: ["kr 321 534", "kr 129 762", "kr 293 011", "kr 101 370 000"],
      answer: 2,
      solution: `<p>Erlend er født i 1994, så delingstallet er 18,60.</p><p>Årlig pensjon: 5 450 000/18,60 = <b>kr 293 011</b>.</p>`,
      check: `<p>Baklengs: 293 011 × 18,60 = 5 450 005, beholdningen opp til avrundingen. Med 1964-kullets delingstall ville samme beholdning gitt 5 450 000/16,95 = 321 534. Det yngre kullet får mindre i året, slik levealdersjusteringen sier.</p>`,
      traps: [
        "Brukte delingstallet for 1964-kullet: 5 450 000/16,95 = 321 534. Levealdersjusteringen gir Erlends kull et høyere delingstall.",
        "Delte beholdningen på antall år med inntekt: 5 450 000/42 = 129 762. Pensjonen fordeles over forventet gjenstående levetid, ikke over opptjeningsårene.",
        null,
        "Ganget med delingstallet i stedet for å dele: 5 450 000 × 18,60 = 101 370 000.",
      ],
    },
    {
      id: "pensjon-5",
      title: "Kompensasjonsgrad: pensjonen som andel av sluttlønnen",
      theory: `<p><b>Kompensasjonsgraden</b> er årlig pensjon delt på sluttlønnen. Har lønnen ligget under taket og fulgt G hele yrkeslivet, gir hvert år 18,1 % av sluttlønnen til beholdningen, målt i dagens kroner. Etter n år er beholdningen 18,1 % × n ganger sluttlønnen. Lønnsnivået faller ut av brøken. Har egen lønn steget raskere enn G, er de tidlige årene verdt mindre målt mot sluttlønnen. Da blir kompensasjonsgraden lavere enn snarveien gir (H2019 oppgave 6b).</p>
<div class="formula"><div class="eq">Kompensasjonsgrad = årlig pensjon / sluttlønn = 18,1 % × n / delingstall</div><div class="where">n er antall år med inntekt. Snarveien gjelder bare når lønnen har ligget under 7,1 G og fulgt G. H2021 oppgave 7a og spørsmål 19 i flervalgstesten til kursgodkjenning 2026 var akkurat dette.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>38 år med inntekt under taket og delingstall 17,80 <b>[eksempeltall]</b>.</p><p>Beholdningen er 0,181 × 38 = 6,878 ganger sluttlønnen. Årlig pensjon er 6,878/17,80 = 38,64 % av sluttlønnen.</p></div>`,
      q: `<p>Tobias har pensjonsgivende inntekt i 41 år, fra han er 26 til han fyller 67. Han tar ut alderspensjon som 67-åring. Lønnen hans er kr 560 000 i dagens kroner og har fulgt G hele tiden, med G = kr 136 549 <b>[dagens regel]</b>. Delingstallet for kullet hans er 21,40 ved uttak som 62-åring og 18,35 ved uttak som 67-åring <b>[eksempeltall]</b>. Opptjeningen er 18,1 % av inntekt opp til 7,1 G <b>[dagens regel]</b>. Hva blir kompensasjonsgraden hans, altså årlig alderspensjon fra folketrygden delt på sluttlønnen?</p>`,
      options: ["34,68 %", "70,01 %", "18,10 %", "40,44 %"],
      answer: 3,
      solution: `<p>Lønnen er under taket på 7,1 × 136 549 = 969 498 og har fulgt G, så snarveien gjelder.</p><p>Beholdningen er 0,181 × 41 = 7,421 ganger sluttlønnen. Kompensasjonsgraden er 7,421/18,35 = <b>40,44 %</b>.</p>`,
      check: `<p>Regn i kroner: årlig opptjening 18,1 % × 560 000 = 101 360, beholdning 41 × 101 360 = 4 155 760, pensjon 4 155 760/18,35 = 226 472 og 226 472/560 000 = 40,44 %.</p>`,
      traps: [
        "Brukte delingstallet for uttak som 62-åring: 0,181 × 41/21,40 = 34,68 %.",
        "Regnet opptjening av hele taket hvert år selv om lønnen er under: 41 × 175 479 = 7 194 639, delt på 18,35 = 392 078 og 392 078/560 000 = 70,01 %.",
        "Delte beholdningen på antall år i stedet for på delingstallet: 0,181 × 41/41 = 18,10 %.",
        null,
      ],
    },
    {
      id: "pensjon-6",
      title: "Innskudd mot ytelse: den som ikke har fått noe avtalt, bærer risikoen",
      theory: `<p>Alle arbeidsgivere må ha tjenestepensjon (OTP), med innskudd på minst 2 % av lønnen opp til 12 G <b>[dagens regel]</b>. Den kommer i to hovedformer. Navnet sier hva som er avtalt. Ved <b>innskuddspensjon</b> er innskuddet avtalt: arbeidsgiveren setter inn en prosent av lønnen og du velger risikoprofil. Pensjonen blir det kontoen er verdt. Du bærer avkastningsrisikoen. Fordi kontoen i privat sektor som regel utbetales over ti år, bærer du også risikoen for å leve lenger enn pengene varer. Ved <b>ytelsespensjon</b> er ytelsen avtalt, typisk en andel av sluttlønnen. Blir avkastningen lav eller lever de ansatte lenger, må arbeidsgiveren skyte inn mer. Blir avkastningen høy, kan den skyte inn mindre.</p>
<div class="formula"><div class="eq">Innskuddspensjon: innskuddet er avtalt, den ansatte bærer risikoen</div><div class="eq">Ytelsespensjon: ytelsen er avtalt, arbeidsgiveren bærer risikoen</div><div class="where">Ved jobbytte blir innskuddspensjonen et pensjonskapitalbevis og ytelsespensjonen en fripolise. Innskuddspensjon arves av etterlatte.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Arbeidsgiveren setter inn 5 % av en lønn på kr 600 000, altså kr 30 000 i året. Gir pengene 3 % i stedet for 5 % i avkastning, blir kontoen mindre og pensjonen lavere. Det tapet er den ansattes.</p><p>Har arbeidsgiveren i stedet lovet 60 % av sluttlønnen inkludert folketrygden <b>[eksempeltall]</b>, er pensjonen den samme. Det er arbeidsgiverens innbetalinger som må opp.</p></div>`,
      q: `<p>Lars og Mia er 40 år og har samme lønn hos hver sin arbeidsgiver. Lars har innskuddspensjon: arbeidsgiveren setter inn 6 % av lønnen hvert år. Mia har ytelsespensjon: arbeidsgiveren har lovet henne 60 % av sluttlønnen inkludert folketrygden <b>[eksempeltall]</b>. De neste 25 årene blir avkastningen på pensjonsmidlene klart høyere enn begge ordningene regnet med. Hvilken påstand er riktig?</p>`,
      options: [
        "Mia får høyere pensjon fordi ytelsen følger avkastningen, mens Lars får det samme fordi det er innskuddet som er avtalt",
        "Lars får høyere pensjon enn ventet, mens Mia får det hun er lovet og arbeidsgiveren hennes kan betale inn mindre",
        "Ingen av dem får endret pensjon, fordi pensjonsmidlene reguleres med lønnsveksten og ikke med avkastningen",
        "Begge får høyere pensjon, fordi en tjenestepensjon alltid gir den ansatte avkastningen på pengene som er satt av",
      ],
      answer: 1,
      solution: `<p>Lars bærer avkastningsrisikoen i innskuddsordningen. Høy avkastning gjør kontoen større. Pensjonen hans blir høyere enn ventet.</p><p>Mia har en avtalt ytelse som ikke endres av avkastningen. Meravkastningen tilfaller arbeidsgiveren, som trenger å betale inn mindre for å innfri løftet.</p>`,
      check: `<p>Snu scenarioet: med lav avkastning ville Lars fått lavere pensjon. Mias arbeidsgiver måtte da betalt inn mer. Den som tar tapet ved lav avkastning, får gevinsten ved høy. Det er samme part begge veier: den som ikke har fått noe avtalt.</p>`,
      traps: [
        "Har byttet om ordningene: det er ytelsespensjonen som er fast og innskuddspensjonen som følger avkastningen.",
        null,
        "Blander med folketrygden, der beholdningen reguleres med lønnsveksten. Tjenestepensjonen er fondert og plassert i markedet.",
        "Glemmer at ytelsen er avtalt: i Mias ordning tilfaller meravkastningen arbeidsgiveren, ikke henne.",
      ],
    },
    {
      id: "pensjon-7",
      title: "Innskuddspensjonen ved uttak: sluttverdi og ti års utbetaling",
      theory: `<p>Innskuddspensjonen er en konto. Fram til uttak vokser saldoen du har i dag med avkastningen. Hvert årlige innskudd vokser fra det året det kommer inn. Ved uttak utbetales kontoen i privat sektor som regel over ti år. Det som står igjen, gir fortsatt avkastning. Den årlige utbetalingen er derfor sluttverdien delt på annuitetsfaktoren, ikke på ti. Regn reelt, i dagens kroner, så kan du dele på dagens lønn til slutt. H2020 oppgave 5b–c og H2021 oppgave 7b–c regnet denne kjeden.</p>
<div class="formula"><div class="eq">Sluttverdi = K<sub>0</sub> × (1 + r)<sup>T</sup> + a × [(1 + r)<sup>T</sup> − 1]/r</div><div class="eq">Årlig utbetaling = sluttverdi / A, &nbsp; A = [1 − (1 + r)<sup>−10</sup>]/r</div><div class="where">K<sub>0</sub> er saldoen i dag, a innskuddet ved utgangen av hvert år, T antall innskudd og r den reelle avkastningen. Første utbetaling kommer ett år etter siste innskudd.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Saldo kr 120 000, innskudd kr 20 000 i året i 10 år og 5 % avkastning <b>[eksempeltall]</b>. 1,05<sup>10</sup> = 1,628895 og 1,05<sup>−10</sup> = 0,613913.</p><p>Sluttverdi: 120 000 × 1,628895 = 195 467 og 20 000 × 0,628895/0,05 = 251 558, til sammen 447 025. A = (1 − 0,613913)/0,05 = 7,72174. Utbetaling: 447 025/7,72174 = kr 57 892 i året, altså 11,58 % av en lønn på kr 500 000.</p></div>`,
      q: `<p>Hanne er 47 år og tjener kr 650 000 i året. Regn reelt: lønnen holder seg på kr 650 000 i dagens kroner. Innskuddspensjonen gir 3,5 % årlig realavkastning <b>[eksempeltall]</b>. Kontoen står i dag på kr 230 000. Arbeidsgiveren setter inn 6 % av lønnen ved utgangen av hvert år i 20 år, det siste innskuddet når hun fyller 67. Kontoen utbetales så som ti like store årlige beløp, det første ett år etter siste innskudd, mens resten fortsatt forrentes med 3,5 %. Oppgitt: 1,035<sup>20</sup> = 1,989789 og 1,035<sup>−10</sup> = 0,708919. Hvor stor andel av lønnen utgjør den årlige utbetalingen? Oppgi svaret med to desimaler.</p>`,
      options: ["28,87 %", "24,01 %", "20,40 %", "22,89 %"],
      answer: 0,
      solution: `<p>Innskudd: 6 % × 650 000 = 39 000 i året.</p><p>Sluttverdi: 230 000 × 1,989789 = 457 651 og 39 000 × 0,989789/0,035 = 1 102 908, til sammen 1 560 559.</p><p>Annuitetsfaktor: (1 − 0,708919)/0,035 = 8,3166. Utbetaling: 1 560 559/8,3166 = 187 644.</p><p>Andel av lønnen: 187 644/650 000 = <b>28,87 %</b>.</p>`,
      check: `<p>Utbetalingen må ligge mellom to grenser. Uten avkastning i utbetalingsårene ville den vært 1 560 559/10 = 156 056. Forrentet du hele sluttverdien i ti år før du delte på ti, ville den vært 1 560 559/0,708919/10 = 220 132. Saldoen synker etter hver utbetaling, så svaret må ligge mellom dem. 187 644 gjør det. Baklengs: 187 644 × 8,3166 = 1 560 560, sluttverdien opp til avrundingen.</p>`,
      traps: [
        null,
        "Delte sluttverdien på ti og glemte avkastningen i utbetalingsårene: 1 560 559/10 = 156 056 og 156 056/650 000 = 24,01 %.",
        "Glemte saldoen i dag: 1 102 908/8,3166 = 132 615 og 132 615/650 000 = 20,40 %.",
        "Summerte innskuddene uten avkastning: 20 × 39 000 = 780 000, sluttverdi 457 651 + 780 000 = 1 237 651, utbetaling 1 237 651/8,3166 = 148 817 og 148 817/650 000 = 22,89 %. Hvert innskudd forrentes fra det året det kommer inn.",
      ],
    },
    {
      id: "pensjon-8",
      title: "IPS: 22 % inn og ut, utsatt skatt som rentefritt lån",
      theory: `<p>Individuell pensjonssparing (<b>IPS</b>) gir fradrag i alminnelig inntekt for innskuddet, inntil kr 25 000 i 2026 <b>[dagens regel]</b>, så skatten går ned med 22 % av innskuddet. Avkastningen skattlegges ikke underveis og kontoen er fritatt for formuesskatt. Pengene er bundet til du er minst 62 og utbetales over minst ti år og minst til du fyller 80. Uttaket skattlegges som <b>alminnelig inntekt med 22 %</b>, ikke som pensjonsinntekt: ingen trygdeavgift og ingen trinnskatt. Satsen er altså 22 % både inn og ut, så IPS gir ingen skatterabatt. Fordelen er at skatten er <b>utsatt</b>: statens 22 % står på kontoen og gir avkastning til deg fram til uttaket. Det er dette eksamen kaller et rentefritt lån fra staten (H2024 oppgave 13b). Regnet ut er IPS det samme som å skatte av beløpet først og la resten vokse helt uten skatt.</p>
<div class="formula"><div class="eq">Netto ut av IPS = I × (1 + r)<sup>n</sup> × (1 − t) = [I × (1 − t)] × (1 + r)<sup>n</sup></div><div class="eq">Vanlig sparekonto = I × (1 − t) × [1 + r(1 − t)]<sup>n</sup></div><div class="where">I er innskuddet før fradraget, t = 22 % og r renten. På sparekontoen skattlegges renten hvert år, så kontoen vokser bare med r(1 − t). Utsatt skatt er ikke spart skatt: den betales ved uttak.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>kr 10 000 inn på IPS i 20 år til 6 % <b>[eksempeltall]</b>: 10 000 × 3,207135 × 0,78 = kr 25 016 netto.</p><p>På sparekontoen setter du inn det IPS faktisk koster deg, 10 000 × 0,78 = 7 800, som vokser med 6 % × 0,78 = 4,68 % i året: 7 800 × 2,496171 = kr 19 470. Forskjellen, 25 016 − 19 470 = kr 5 546, er renteskatten IPS slapp.</p></div>`,
      q: `<p>Silje setter kr 20 000 inn på IPS i et rentefond. Fradraget i alminnelig inntekt gir henne 22 % tilbake i skatt, så innskuddet koster henne kr 15 600. Alternativet er å sette de samme kr 15 600 på en sparekonto. Begge gir 5 % rente i året i 25 år <b>[eksempeltall]</b>. På sparekontoen skattlegges renten med 22 % hvert år. IPS-uttaket skattlegges som alminnelig inntekt med 22 % <b>[dagens regel]</b>. Se bort fra formuesskatt. Oppgitt: 1,05<sup>25</sup> = 3,386355 og 1,039<sup>25</sup> = 2,602488. Hvor mye mer sitter hun igjen med etter skatt om 25 år med IPS enn med sparekontoen?</p>`,
      options: ["kr 27 128", "kr 12 228", "kr 0", "kr 1 500"],
      answer: 1,
      solution: `<p>IPS: 20 000 × 3,386355 = 67 727 før skatt. Etter 22 % skatt ved uttak: 67 727 × 0,78 = 52 827.</p><p>Sparekonto: renten etter skatt er 5 % × 0,78 = 3,9 %. Kontoen blir 15 600 × 2,602488 = 40 599.</p><p>Forskjell: 52 827 − 40 599 = <b>kr 12 228</b>.</p>`,
      check: `<p>Flytt skatten til begynnelsen: 15 600 × 3,386355 = 52 827, det samme som IPS. IPS er altså en skattefri sparekonto for de 15 600 kronene. Fordelen er bare renteskatten: 15 600 × (3,386355 − 2,602488) = 15 600 × 0,783867 = 12 228.</p>`,
      traps: [
        "Behandlet utsatt skatt som spart skatt og glemte skatten ved uttak: 67 727 − 40 599 = 27 128.",
        null,
        "Trodde fordelen forsvinner fordi satsen er 22 % både inn og ut. Det stemmer bare hvis renten på sparekontoen også var skattefri: da gir begge 52 827.",
        "Skattla IPS-uttaket med eierskatten 37,84 %: 67 727 × 0,6216 = 42 099 og 42 099 − 40 599 = 1 500.",
      ],
    },
    {
      id: "pensjon-9",
      title: "Eksamensnivå: utsatt uttak i ord (H2025 oppgave 14)",
      theory: `<p>H2025 oppgave 14 spurte hva som skjer med delingstallet og den årlige utbetalingen når en person født etter 1962 utsetter uttaket. Alternativene var kombinasjoner av «øker» og «synker». Utsetter du uttaket, virker to ting samme vei: delingstallet blir lavere, fordi det er færre forventede leveår igjen. Jobber du videre, blir også beholdningen større. Stryk først det som bryter brøkregningen: med samme eller større beholdning kan ikke delingstallet og pensjonen øke samtidig. Den gjenværende fellen er levealdersjusteringen. Delingstallet <b>synker</b> med uttaksalderen innenfor ett kull, men <b>stiger</b> fra kull til kull når levealderen øker. Og nøytraliteten gjelder samlet forventet utbetaling, ikke den årlige.</p>
<div class="formula"><div class="eq">Senere uttak ⟹ lavere delingstall og større beholdning ⟹ høyere årlig pensjon over færre år</div><div class="where">Levealdersjusteringen virker på tvers av kull: et yngre kull får høyere delingstall ved samme uttaksalder.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Beholdning 44 G, delingstall 20,60 ved 64 og 17,90 ved 68 <b>[eksempeltall]</b>, uten ny opptjening: 44/20,60 = 2,136 G mot 44/17,90 = 2,458 G, altså 15,1 % høyere ved 68.</p><p>Ganger du med delingstallet i stedet for å dele, ser det ut som om pensjonen synker med 13,1 %. Det er feilen bak alternativet der både delingstallet og utbetalingen synker.</p></div>`,
      q: `<p>Lise er født i 1980. Hun har tenkt å slutte å jobbe og ta ut alderspensjon fra folketrygden som 64-åring, men vurderer å jobbe videre med samme lønn til hun er 69 og ta ut da. Lønnen ligger under 7,1 G. Hvilket utsagn er riktig?</p>`,
      options: [
        "Delingstallet er høyere ved 69 år fordi levealderen øker, så den årlige pensjonen blir lavere enn ved uttak som 64-åring",
        "Delingstallet synker, så den årlige pensjonen synker også, fordi pensjonen følger delingstallet",
        "Den årlige pensjonen blir den samme, fordi ordningen er nøytral og samlet forventet utbetaling ikke endres",
        "Delingstallet synker og beholdningen vokser med ny opptjening, så den årlige pensjonen øker",
      ],
      answer: 3,
      solution: `<p>Ved 69 er det færre forventede leveår igjen, så delingstallet er lavere enn ved 64. Fem år til med inntekt legger i tillegg 18,1 % av lønnen til beholdningen hvert år. Større beholdning delt på et mindre delingstall gir høyere årlig pensjon. Utbetalingen varer færre år, så forventet samlet utbetaling er omtrent den samme.</p>`,
      check: `<p>Sett inn tall som i eksempelet: 44 G delt på 20,60 og 17,90 gir 2,136 G og 2,458 G. Det lavere delingstallet alene løfter pensjonen 15,1 %. Den nye opptjeningen kommer i tillegg. Ingen av de to effektene trekker ned.</p>`,
      traps: [
        "Blander inn levealdersjusteringen: delingstallet stiger fra kull til kull, men synker med uttaksalderen for samme kull.",
        "Ganget med delingstallet i stedet for å dele: pensjonen er beholdningen delt på delingstallet, så lavere delingstall gir høyere pensjon.",
        "Leser nøytraliteten som uendret årlig pensjon. Det er samlet forventet utbetaling som er omtrent den samme. Den årlige pensjonen øker.",
        null,
      ],
    },
    {
      id: "pensjon-10",
      title: "Eksamensnivå: påstander om IPS og tjenestepensjon (H2024 oppgave 13, H2025 oppgave 17)",
      theory: `<p><b>BSU</b> (boligsparing for ungdom) er standarddistraktoren mot IPS. Du kan spare inntil kr 27 500 i året og kr 300 000 i alt. Du får fradrag <b>i skatten</b> på 10 % av årets sparing, inntil kr 2 750. Fradraget gis til og med året du fyller 33 og bare hvis du ikke eier bolig. Pengene skal brukes til bolig <b>[dagens regel]</b>. IPS gir fradrag <b>i inntekten</b>, verdt 22 %. Pengene er bundet til pensjonsalder. Rutinen for påstandsspørsmålene er to spørsmål: Hvilken sats gjelder inn og ut? Hvem bærer risikoen? Et alternativ som beskriver den ene ordningen med den andres egenskaper, er galt.</p>
<div class="formula"><div class="eq">BSU: lavere skatt = 10 % × årets sparing (inntil kr 27 500)</div><div class="eq">IPS: lavere skatt = 22 % × innskuddet (inntil kr 25 000)</div><div class="where">IPS-fritaket for formuesskatt gjelder bare beløpet på IPS-kontoen. H2024 oppgave 13b hadde BSU-forvekslingen, uttak ved 35 år til bolig og fritak for hele formuen som gale alternativer.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Du er 28 år, eier ikke bolig og sparer kr 27 500 på BSU og kr 25 000 på IPS i 2026. BSU gir 10 % × 27 500 = kr 2 750 lavere skatt, IPS gir 22 % × 25 000 = kr 5 500. Til sammen kr 8 250.</p><p>Eier du bolig, faller BSU-fradraget bort. Da står bare kr 5 500 igjen.</p></div>`,
      q: `<p>Hvilken påstand om pensjonssparing er riktig?</p>`,
      options: [
        "IPS gir fradrag i alminnelig inntekt nå og skatt på alminnelig inntekt ved uttak, så fordelen er utsatt skatt og fritak for formuesskatt",
        "IPS virker som BSU, men med fritak for formuesskatt i tillegg: du får 10 % av innskuddet tilbake som fradrag i skatten",
        "IPS-uttak skattlegges som pensjonsinntekt, så fordelen er at marginalskatten din som pensjonist er lavere enn mens du jobber",
        "I en innskuddsordning garanterer arbeidsgiveren en andel av sluttlønnen, mens den ansatte bærer avkastningsrisikoen i en ytelsesordning",
      ],
      answer: 0,
      solution: `<p>IPS gir 22 % fradrag inn og 22 % skatt ut, så det er ingen satsfordel. Fordelen er at skatten er utsatt, som et rentefritt lån fra staten. I tillegg er kontoen fritatt for formuesskatt. Det er <b>påstanden om utsatt skatt og formuesskattefritak</b> som er riktig.</p>`,
      check: `<p>Still de to spørsmålene til hver påstand. Sats inn og ut for IPS: 22 % og 22 %, så både påstanden om 10 % fradrag i skatten og påstanden om lavere skatt som pensjonist faller. Hvem bærer risikoen: i en innskuddsordning den ansatte, så påstanden om garantert andel av sluttlønnen faller. Bare påstanden om utsatt skatt består begge spørsmålene.</p>`,
      traps: [
        null,
        "BSU-forvekslingen fra H2024 oppgave 13b: BSU gir 10 % fradrag i skatten, IPS gir fradrag i inntekten og virker gjennom utsatt skatt.",
        "IPS-uttak er alminnelig inntekt med 22 %, uten trygdeavgift og trinnskatt. Det er ingen satsforskjell å hente.",
        "Har byttet om ordningene: i innskuddsordningen bærer den ansatte risikoen, i ytelsesordningen arbeidsgiveren.",
      ],
    },
    {
      id: "pensjon-11",
      title: "Eksamensnivå: samlet kompensasjonsgrad over taket (H2020 oppgave 5, H2021 oppgave 7)",
      theory: `<p>H2020 oppgave 5 og H2021 oppgave 7 regnet først kompensasjonsgraden fra folketrygden og så innskuddspensjonen som andel av lønnen. Til slutt ble de to lagt sammen. Ligger lønnen over 7,1 G, gir snarveien fra steg 5 for mye: bare 7,1 G av lønnen tjener opp pensjon (H2016 oppgave 4c). Folketrygden er livsvarig og deles på delingstallet. Innskuddspensjonen utbetales over ti år og deles på annuitetsfaktoren.</p>
<div class="formula"><div class="eq">Samlet kompensasjonsgrad = (pensjon fra folketrygden + utbetaling fra innskuddspensjonen) / lønn</div><div class="eq">Folketrygden over taket: pensjon = n × 18,1 % × 7,1 G / delingstall</div><div class="where">Regnet reelt holder lønn og G seg konstante, så hvert år over taket gir 18,1 % × 7,1 G i dagens kroner.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Lønn 10 G i 40 år og delingstall 17,50 <b>[eksempeltall]</b>. Folketrygden: 18,1 % × 7,1 × 40/17,50 = 2,9374 G i året, altså 29,37 % av lønnen på 10 G.</p><p>Gir innskuddspensjonen 2,4 G i året i ti år, er det 24,00 % av lønnen. Samlet blir det 29,37 % + 24,00 % = 53,37 %.</p></div>`,
      q: `<p>Jonas er 37 år og tjener kr 1 100 000 i året. Regn reelt: lønnen og G = kr 136 549 holder seg konstante i dagens kroner, så 7,1 G = kr 969 498 <b>[dagens regel]</b>. Han har pensjonsgivende inntekt med samme reelle lønn i 42 år, fra han er 25 til han fyller 67. Han tar ut alderspensjon fra folketrygden som 67-åring med delingstall 18,20 <b>[eksempeltall]</b>. Opptjeningen er 18,1 % av inntekt opp til 7,1 G <b>[dagens regel]</b>. Innskuddspensjonen står i dag på kr 280 000. Arbeidsgiveren setter inn 5 % av lønnen ved utgangen av hvert år i 30 år, det siste når han fyller 67. Kontoen gir 3 % årlig realavkastning <b>[eksempeltall]</b>. Den utbetales som ti like store årlige beløp, det første ett år etter siste innskudd, mens resten forrentes med 3 %. Oppgitt: 1,03<sup>30</sup> = 2,427262 og 1,03<sup>−10</sup> = 0,744094. Hva blir den samlede kompensasjonsgraden fra folketrygden og innskuddspensjonen? Oppgi svaret med to desimaler.</p>`,
      options: ["76,90 %", "71,94 %", "53,28 %", "66,78 %"],
      answer: 1,
      solution: `<p><b>Folketrygden.</b> Lønnen er over taket, så hvert år gir 18,1 % × 969 498 = 175 479. Beholdning: 42 × 175 479 = 7 370 118. Pensjon: 7 370 118/18,20 = 404 952.</p><p><b>Innskuddspensjonen.</b> Innskudd 5 % × 1 100 000 = 55 000. Sluttverdi: 280 000 × 2,427262 = 679 633 og 55 000 × 1,427262/0,03 = 2 616 647, til sammen 3 296 280. Annuitetsfaktor: (1 − 0,744094)/0,03 = 8,5302. Utbetaling: 3 296 280/8,5302 = 386 425.</p><p><b>Samlet.</b> (404 952 + 386 425)/1 100 000 = 791 377/1 100 000 = <b>71,94 %</b>.</p>`,
      check: `<p>Regn delene som andeler: 404 952/1 100 000 = 36,81 % fra folketrygden og 386 425/1 100 000 = 35,13 % fra innskuddspensjonen, til sammen 71,94 %. Folketrygdleddet med formelen i G: lønnen er 1 100 000/136 549 = 8,0557 G. Da er 0,181 × 7,1 × 42/(18,20 × 8,0557) = 36,81 %.</p>`,
      traps: [
        "Glemte taket i folketrygden: 18,1 % × 1 100 000 × 42/18,20 = 459 462 og (459 462 + 386 425)/1 100 000 = 76,90 %.",
        null,
        "Delte innskuddspensjonen på delingstallet som om den var livsvarig: 3 296 280/18,20 = 181 114 og (404 952 + 181 114)/1 100 000 = 53,28 %.",
        "Delte sluttverdien på ti og glemte avkastningen i utbetalingsårene: 3 296 280/10 = 329 628 og (404 952 + 329 628)/1 100 000 = 66,78 %.",
      ],
    },
  ],
});

/* sjanger 7 · portefolje · Sparing og portefølje: Merton med humankapital */
window.EDU_DATA.sjangre.push({
  id: "portefolje",
  num: 7,
  title: "Sparing og portefølje: Merton med humankapital",
  summary: "Fra forventning og standardavvik for én investering til Mertons aksjeandel med humankapital over livsløpet",
  chapters: [14],
  exam: "Merton med humankapital 5 av 9 sett, portefølje 3 av 9 · 14 % av H2022 og H2025 · H2025 oppgave 11, 15 og 16, H2024 oppgave 12",
  intro: `<p>Mertons aksjeandel med humankapital har vært i fem av ni eksamenssett og tok 14 % av poengene i både H2022 og H2025, mens porteføljespørsmålene om korrelasjon, kapitalmarkedslinjen, indeksfond og valuta kom i tre av ni. Stigen starter med forventning og standardavvik for én investering og bygger porteføljen, kapitalmarkedslinjen, Mertons formel og humankapitalen ett steg om gangen. Etter siste steg kan du regne alle Merton-variantene settene har gitt, også over flere år. Du kjenner igjen de gale alternativene: σ i stedet for σ², avkastning i stedet for premie og humankapitalen glemt eller med feil fortegn.</p>`,
  steps: [
    {
      id: "portefolje-1",
      title: "Forventet avkastning og standardavvik for én investering",
      theory: `<p>En risikabel investering kan gi ulike avkastninger med ulike sannsynligheter. Forventet avkastning er det sannsynlighetsveide snittet. Variansen måler spredningen: ta avviket fra forventningen i hvert utfall, kvadrer det og vei med sannsynligheten. Standardavviket σ er kvadratroten av variansen og har samme enhet som avkastningen. Hold de to fra hverandre fra første stund. Mertons formel senere i stigen bruker variansen σ², ikke σ.</p>
<div class="formula"><div class="eq">E(r) = Σ p<sub>i</sub> × r<sub>i</sub></div><div class="eq">σ² = Σ p<sub>i</sub> × (r<sub>i</sub> − E(r))² &nbsp;·&nbsp; σ = √σ²</div><div class="where">p<sub>i</sub> er sannsynligheten for utfall i og r<sub>i</sub> avkastningen da. Med to utfall er σ = √(p(1 − p)) × |r<sub>1</sub> − r<sub>2</sub>|.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Et fond gir +20 % eller −10 %, hver med sannsynlighet 50 %. E(r) = 0,5 × 20 % + 0,5 × (−10 %) = 5 %.</p><p>Avvikene er +15 og −15 prosentpoeng. σ² = 0,5 × 0,15² + 0,5 × 0,15² = 0,0225 og σ = √0,0225 = 15 %.</p></div>`,
      q: `<p>Et aksjefond gir +15 % med sannsynlighet 80 % og −35 % med sannsynlighet 20 % <b>[eksempeltall]</b>. Hva er standardavviket til avkastningen?</p>`,
      options: ["20,6 %", "25,0 %", "20,0 %", "4,0 %"],
      answer: 2,
      solution: `<p>Forventet avkastning: 0,8 × 15 % + 0,2 × (−35 %) = 12 % − 7 % = 5 %.</p><p>Avvikene: 15 − 5 = +10 og −35 − 5 = −40 prosentpoeng.</p><p>Variansen: 0,8 × 0,10² + 0,2 × 0,40² = 0,008 + 0,032 = 0,04.</p><p>Standardavviket: √0,04 = <b>20,0 %</b>.</p>`,
      check: `<p>Snarveien for to utfall: √(0,8 × 0,2) × (15 − (−35)) = 0,4 × 50 = 20 %. Samme svar. Variansen 0,04 er ikke 4 % risiko: den har enheten prosent i andre. Først kvadratroten kan sammenlignes med avkastningen.</p>`,
      traps: [
        "Glemte å trekke fra forventningen og kvadrerte avkastningene direkte: √(0,8 × 0,15² + 0,2 × 0,35²) = √0,0425 = 20,6 %.",
        "Overså sannsynlighetene og veide utfallene likt: snittet blir −10 %, avvikene ±25 prosentpoeng og σ = 25,0 %.",
        null,
        "Svarte med variansen: σ² = 0,04, lest som 4,0 %. Standardavviket er kvadratroten.",
      ],
    },
    {
      id: "portefolje-2",
      title: "To aktiva: korrelasjonen avgjør diversifiseringen",
      theory: `<p>Fordeler du formuen med andelen s i aktivum 1 og 1 − s i aktivum 2, blir forventet avkastning et rent vektet snitt. Variansen får i tillegg et kryssledd med korrelasjonen ρ, som ligger mellom −1 og 1, ganget med begge standardavvikene. Så lenge ρ er under 1, er porteføljens standardavvik lavere enn det vektede snittet av standardavvikene. Det er diversifiseringsgevinsten. Ved ρ = 1 forsvinner den: standardavviket blir et rent vektet snitt. Uten shortsalg ligger lavest risiko da i et hjørne, med alt i aktivumet med lavest σ. Ved ρ = −1 kan risikoen fjernes helt.</p>
<div class="formula"><div class="eq">E(r<sub>p</sub>) = s × μ<sub>1</sub> + (1 − s) × μ<sub>2</sub></div><div class="eq">σ<sub>p</sub>² = s²σ<sub>1</sub>² + (1 − s)²σ<sub>2</sub>² + 2s(1 − s)ρσ<sub>1</sub>σ<sub>2</sub></div><div class="eq">Lavest varians: s* = (σ<sub>2</sub>² − ρσ<sub>1</sub>σ<sub>2</sub>)/(σ<sub>1</sub>² + σ<sub>2</sub>² − 2ρσ<sub>1</sub>σ<sub>2</sub>) &nbsp;·&nbsp; ρ = 1: σ<sub>p</sub> = s × σ<sub>1</sub> + (1 − s) × σ<sub>2</sub></div><div class="where">μ<sub>i</sub> og σ<sub>i</sub> er forventning og standardavvik for aktivum i. Kryssleddet inneholder kovariansen ρσ<sub>1</sub>σ<sub>2</sub>, ikke ρ alene. Ved ρ = 1 er σ<sub>p</sub> lineær i s, så svaret er 0 % eller 100 %, aldri noe imellom (H2024 oppgave 12d). Ved ρ = −1 er σ<sub>p</sub> = 0 ved s = σ<sub>2</sub>/(σ<sub>1</sub> + σ<sub>2</sub>).</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>60 % i aktivum 1 (μ = 6 %, σ = 15 %) og 40 % i aktivum 2 (μ = 10 %, σ = 25 %), med ρ = 0,2. E(r<sub>p</sub>) = 0,6 × 6 % + 0,4 × 10 % = 7,6 %.</p><p>σ<sub>p</sub>² = 0,36 × 0,0225 + 0,16 × 0,0625 + 2 × 0,6 × 0,4 × 0,2 × 0,15 × 0,25 = 0,0081 + 0,0100 + 0,0036 = 0,0217, så σ<sub>p</sub> = 14,7 %, under det vektede snittet 0,6 × 15 % + 0,4 × 25 % = 19 %.</p><p>Med ρ = 1 er σ<sub>p</sub> nøyaktig 19 % og faller jevnt mot 15 % når s går mot 100 %. Lavest risiko er da alt i aktivum 1. Med ρ = −1 gir s = 25/40 = 62,5 % σ<sub>p</sub> = 0.</p></div>`,
      q: `<p>Du kan bare investere i aksje X og aksje Y og kan ikke shortselge <b>[eksempeltall]</b>. Aksje X har forventet avkastning 5 % og standardavvik 16 %. Aksje Y har forventet avkastning 12 % og standardavvik 32 %. Korrelasjonen mellom dem er 1. Hvor stor andel bør du ha i aksje X hvis det eneste du bryr deg om, er så lavt standardavvik som mulig?</p>`,
      options: ["67 %", "100 %", "50 %", "80 %"],
      answer: 1,
      solution: `<p>Med ρ = 1 er standardavviket lineært: σ<sub>p</sub> = s × 16 % + (1 − s) × 32 % = 32 % − 16 % × s, der s er andelen i X.</p><p>Uttrykket faller hele veien mot s = 1. Lavest risiko er <b>100 %</b> i X, med σ<sub>p</sub> = 16 %.</p>`,
      check: `<p>Regn ut standardavviket for de andre andelene: s = 80 % gir 0,8 × 16 + 0,2 × 32 = 19,2 %, s = 67 % gir 21,3 % og s = 50 % gir 24,0 %. Alle høyere enn 16 %. Ved ρ = 1 må svaret være et hjørne, så bare 0 % og 100 % er kandidater. X har lavest standardavvik.</p>`,
      traps: [
        "Brukte regelen for ρ = −1: σ<sub>Y</sub>/(σ<sub>X</sub> + σ<sub>Y</sub>) = 32/48 = 67 %. Den gir risikofri portefølje bare ved perfekt negativ korrelasjon.",
        null,
        "Spredte likt fordi diversifisering pleier å hjelpe: 0,5 × 16 + 0,5 × 32 = 24,0 %. Ved ρ = 1 er det ingen gevinst å hente.",
        "Brukte minimum-varians-formelen med ρ = 0: 0,32²/(0,16² + 0,32²) = 0,1024/0,128 = 80 %. Korrelasjonen er 1, ikke 0.",
      ],
    },
    {
      id: "portefolje-3",
      title: "Kapitalmarkedslinjen: bank, markedsporteføljen og giring",
      theory: `<p>Legg til en bankkonto med sikker rente r<sub>f</sub>. Banken har verken varians eller kovarians, så både forventning og standardavvik blir lineære i andelen w i markedsporteføljen M, i praksis et bredt globalt indeksfond: alle kombinasjoner ligger på kapitalmarkedslinjen fra r<sub>f</sub> gjennom M. Er w over 1, låner du w − 1 av egenkapitalen til r<sub>f</sub>: det er giring. Stigningstallet er Sharpe-forholdet, risikopremie per enhet risiko. Giring flytter deg langs linjen uten å endre det. En risikabel enkeltaksje har usystematisk risiko som markedet ikke betaler for og havner under linjen, så vil du ha mer forventet avkastning enn M, skal du låne og gire M (H2025 oppgave 15).</p>
<div class="formula"><div class="eq">E(r<sub>p</sub>) = r<sub>f</sub> + w × (μ − r<sub>f</sub>) &nbsp;·&nbsp; σ<sub>p</sub> = w × σ &nbsp;⟹&nbsp; w = σ<sub>p</sub>/σ</div><div class="eq">Sharpe = (E(r<sub>p</sub>) − r<sub>f</sub>)/σ<sub>p</sub></div><div class="where">μ og σ er forventning og standardavvik for M og μ − r<sub>f</sub> risikopremien. Du betaler r<sub>f</sub> på lånet, så det er premien, ikke hele avkastningen, som ganges med w.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>r<sub>f</sub> = 1 % og M har μ = 6 % og σ = 20 %. Med w = 0,6 (40 % i banken): E(r<sub>p</sub>) = 1 % + 0,6 × 5 % = 4 % og σ<sub>p</sub> = 0,6 × 20 % = 12 %. Med w = 1,25 låner du 25 % av egenkapitalen: E(r<sub>p</sub>) = 1 % + 1,25 × 5 % = 7,25 % og σ<sub>p</sub> = 25 %.</p><p>Sharpe er 5/20 = 0,25 for M og 6,25/25 = 0,25 for den girede porteføljen. En teknologiaksje med 10 % forventning og σ = 45 % har bare 9/45 = 0,20. Giret M med σ<sub>p</sub> = 45 % gir 1 % + 0,25 × 45 % = 12,25 %, mer enn aksjen med samme risiko.</p></div>`,
      q: `<p>Risikofri rente er 2 % og du kan både spare og låne til den <b>[eksempeltall]</b>. Markedsporteføljen har forventet avkastning 8 % og standardavvik 16 %. Hanne vil ha en portefølje med standardavvik 24 % og bygger den av markedsporteføljen og lån til risikofri rente. Hvilken forventet avkastning får hun?</p>`,
      options: ["11,0 %", "12,0 %", "6,0 %", "14,0 %"],
      answer: 0,
      solution: `<p>Andel i markedsporteføljen: w = 24 %/16 % = 1,5. Hun låner 50 % av egenkapitalen.</p><p>E(r<sub>p</sub>) = 2 % + 1,5 × (8 % − 2 %) = 2 % + 9 % = <b>11,0 %</b>.</p>`,
      check: `<p>Regn i kroner med kr 100 i egenkapital: hun eier for kr 150 i markedet og får 150 × 8 % = 12. Renten på lånet er 50 × 2 % = 1. Netto 12 − 1 = 11 av 100, altså 11 %. Standardavviket er 1,5 × 16 % = 24 %, som hun ville ha. Sharpe-forholdet er (11 − 2)/24 = 0,375, det samme som markedsporteføljens (8 − 2)/16 = 0,375. ✓</p>`,
      traps: [
        null,
        "Glemte renten på lånet: 1,5 × 8 % = 12,0 %. Lånet på 50 % koster 1 prosentpoeng.",
        "Snudde forholdet: w = 16/24 = 0,67 og 2 % + 0,67 × 6 % = 6,0 %. Det gir standardavvik 10,7 %, ikke 24 %.",
        "Ganget avkastningen i stedet for risikopremien: 2 % + 1,5 × 8 % = 14,0 %.",
      ],
    },
    {
      id: "portefolje-4",
      title: "Mertons optimale aksjeandel w*, forlengs og baklengs",
      theory: `<p>Kapitalmarkedslinjen sa hvilken risikabel portefølje alle bør eie: markedsporteføljen. Mertons formel sier hvor mye. w* er andelen av totalformuen i aksjer: høyere risikopremie gir mer i aksjer, høyere varians og høyere risikoaversjon γ gir mindre. Formelen inneholder ingen tidshorisont. Er tre av de fire størrelsene oppgitt, er den fjerde bestemt, så formelen løses like gjerne baklengs for γ. Les nøye om oppgaven gir standardavviket eller variansen: står det «markedets varians er 0,10», som i H2025 oppgave 11, er σ² = 0,10 og skal brukes som det står.</p>
<div class="formula"><div class="eq">w* = (μ − r<sub>f</sub>)/(γσ²) &nbsp;·&nbsp; γ = (μ − r<sub>f</sub>)/(w* × σ²)</div><div class="where">μ − r<sub>f</sub> er risikopremien og σ² markedets varians. Er σ oppgitt, kvadrer den før du deler. γ er risikoaversjonen, den samme parameteren som i nyttefunksjonen U = c<sup>1−γ</sup>/(1 − γ) hvis oppgaven oppgir den. Uten humankapital er totalformuen lik finansformuen.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Risikopremie 5 %, σ = 20 % og γ = 2,5. Variansen er 0,20² = 0,04, så w* = 0,05/(2,5 × 0,04) = 0,05/0,10 = 50 %. Dobler du γ til 5, halveres andelen til 25 %. Dobler du σ til 40 %, firedobles variansen og andelen faller til 12,5 %.</p><p>Baklengs: meravkastning 0,04, varians 0,0625 og w* = 32 % gir γ = 0,04/(0,32 × 0,0625) = 0,04/0,02 = 2. Kontroll: 0,04/(2 × 0,0625) = 0,32. ✓</p></div>`,
      q: `<p>Gunn er pensjonist og har bare finansformue <b>[eksempeltall]</b>. Hun fordeler den mellom et globalt aksjefond med forventet avkastning 7,5 % og standardavvik 18 % og en bankkonto med risikofri rente 3 %. Risikoaversjonen hennes er γ = 5. Hvor stor andel av formuen bør hun ha i aksjefondet ifølge Mertons formel?</p>`,
      options: ["8,3 %", "27,8 %", "46,3 %", "5,0 %"],
      answer: 1,
      solution: `<p>Risikopremien: 7,5 % − 3 % = 4,5 %. Variansen: 0,18² = 0,0324.</p><p>w* = 0,045/(5 × 0,0324) = 0,045/0,162 = <b>27,8 %</b>.</p>`,
      check: `<p>Baklengs: γ = 0,045/(0,2778 × 0,0324) = 5,0. ✓ Som pensjonist har Gunn ingen humankapital, så andelen gjelder hele finansformuen. Av kr 1 000 000 står kr 277 778 i fondet.</p>`,
      traps: [
        "To feil på én gang, forventet avkastning i telleren og σ i nevneren: 0,075/(5 × 0,18) = 8,3 %.",
        null,
        "Brukte forventet avkastning i stedet for risikopremien: 0,075/0,162 = 46,3 %.",
        "Brukte standardavviket i stedet for variansen: 0,045/(5 × 0,18) = 5,0 %.",
      ],
    },
    {
      id: "portefolje-5",
      title: "Humankapital: trygg lønn er bank, aksjelignende lønn er aksjer",
      theory: `<p>Humankapitalen H er nåverdien av all framtidig arbeidsinntekt, for en ung arbeidstaker den største posten på balansen. Mertons w* gjelder totalformuen F + H, ikke bare finansformuen F. Er lønnen trygg (β<sub>H</sub> = 0), er humankapitalen et implisitt bankinnskudd som ikke kan omplasseres: hele aksjebeløpet må tas fra F, så andelen av F blir høyere enn w*. Er lønnen knyttet til aksjemarkedet, for eksempel gjennom bonus, inneholder humankapitalen allerede β<sub>H</sub> × H kroner aksjeeksponering, som trekkes fra før resten plasseres i F. Over 100 % betyr at teorien anbefaler lån. Uten shortsalg kan andelen ikke bli lavere enn 0.</p>
<div class="formula"><div class="eq">Aksjer i finansformuen = w* × (F + H) − β<sub>H</sub> × H</div><div class="eq">α = [w* × (F + H) − β<sub>H</sub> × H]/F</div><div class="where">α er andelen av finansformuen i aksjer. β<sub>H</sub> = 0 gir α = w* × (F + H)/F (H2022 oppgave 7, H2025 oppgave 11.2). β<sub>H</sub> = 1 betyr at lønnen svinger én-til-én med markedet (H2025 oppgave 11.3). Med H = 0 er α = w*.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>w* = 40 %, F = kr 1 000 000 og H = kr 2 000 000. Ønsket aksjebeløp: 0,40 × 3 000 000 = kr 1 200 000.</p><p>Trygg lønn, β<sub>H</sub> = 0: hele beløpet tas fra F, altså α = 1 200 000/1 000 000 = 120 %. Med β<sub>H</sub> = 0,5 har humankapitalen alt kr 1 000 000 i aksjeeksponering: 1 200 000 − 1 000 000 = 200 000, altså α = 20 %. Med β<sub>H</sub> = 1 blir uttrykket negativt og α = 0.</p></div>`,
      q: `<p>Stian er 55 år og aksjemegler. Lønnen og bonusen hans følger aksjemarkedet én-til-én, så humankapitalens beta er β<sub>H</sub> = 1. Finansformuen er kr 3 000 000 og humankapitalen kr 1 000 000. Mertons formel gir ham w* = 45 % av totalformuen i aksjer <b>[eksempeltall]</b>. Hvor stor andel av finansformuen bør han ha i aksjer?</p>`,
      options: ["60,0 %", "45,0 %", "26,7 %", "93,3 %"],
      answer: 2,
      solution: `<p>Ønsket aksjebeløp: 0,45 × (3 000 000 + 1 000 000) = kr 1 800 000.</p><p>Humankapitalen gir allerede 1 × 1 000 000 = kr 1 000 000 i aksjeeksponering.</p><p>Aksjer i finansformuen: 1 800 000 − 1 000 000 = 800 000, altså α = 800 000/3 000 000 = <b>26,7 %</b>.</p>`,
      check: `<p>Samlet balanse: kr 1 000 000 aksjelignende humankapital og kr 800 000 i aksjer, altså kr 1 800 000 aksjerisiko av kr 4 000 000. Det er 45 % = w*. ✓ Resten av finansformuen, kr 2 200 000, står i bank.</p>`,
      traps: [
        "Behandlet humankapitalen som risikofri, β<sub>H</sub> = 0: 1 800 000/3 000 000 = 60,0 %. Da bærer han 2 800 000 i aksjerisiko, 70 % av totalformuen.",
        "Glemte humankapitalen: α = w* = 45,0 %. Da har han 1 350 000 i aksjer pluss 1 000 000 i aksjelignende lønn, 58,8 % av totalformuen.",
        null,
        "Feil fortegn: la humankapitalens aksjeeksponering til i stedet for å trekke den fra: (1 800 000 + 1 000 000)/3 000 000 = 93,3 %.",
      ],
    },
    {
      id: "portefolje-6",
      title: "Livsløpet: aksjeandelen faller fordi humankapitalen faller",
      theory: `<p>Gjennom yrkeslivet gjøres humankapitalen om til finansformue: H krymper mot null mens F vokser. Med trygg lønn er α = w* × (1 + H/F), så andelen av finansformuen faller med alderen selv om w* står stille. Grunnen er humankapitalen, ikke tiden. Kurset avviser at aksjer blir tryggere på lang sikt, for standardavviket til sluttformuen vokser med horisonten. Mertons formel inneholder heller ikke tid. Andelen av totalformuen er w* i alle aldre, så les hvilken nevner spørsmålet bruker: H2025 oppgave 11.4 godtok to svar fordi den ikke sa det.</p>
<div class="formula"><div class="eq">α = w* × (1 + H/F)</div><div class="where">Gjelder risikofri humankapital. H/F faller med alderen, så α faller mot w*. Er humankapitalen aksjelignende (β<sub>H</sub> = 1), snus rangeringen.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>w* = 40 % og trygg lønn. Som 30-åring: F = kr 800 000 og H = kr 1 200 000. Aksjer: 0,40 × 2 000 000 = 800 000, altså α = 100 %.</p><p>Som 60-åring: F = kr 1 800 000 og H = kr 200 000. Aksjer: fortsatt 800 000, men α = 800 000/1 800 000 = 44,4 %. Aksjebeløpet står stille mens nevneren vokser.</p></div>`,
      q: `<p>Sofie er 31 år og Randi 63. Begge er lærere i fast stilling med lønn som ikke svinger med aksjemarkedet. De har samme risikoaversjon, samme syn på markedet og like stor finansformue. Hvilket utsagn om andelen av <b>finansformuen</b> de bør ha i aksjer, er riktig?</p>`,
      options: [
        "Randi bør ha lavere andel, fordi aksjerisikoen jevner seg ut over tid og Sofie har mange flere år igjen",
        "De bør ha lik andel, fordi Mertons formel verken inneholder alder eller tidshorisont",
        "Randi bør ha lavere andel, fordi hun har lite humankapital igjen som virker som et sikkert bankinnskudd",
        "Randi bør ha høyere andel, fordi hun har kort tid igjen og trenger høyere avkastning for å nå målet",
      ],
      answer: 2,
      solution: `<p>Riktig: <b>Randi bør ha lavere andel fordi humankapitalen hennes nesten er brukt opp</b>. Sofies trygge lønn er et stort sikkert bankinnskudd. For å nå w* av totalformuen må hun derfor ha en høy andel av finansformuen i aksjer. Randi har nesten bare finansformue, så hennes andel nærmer seg w*.</p>`,
      check: `<p>Med tall: w* = 40 % og F = kr 1 000 000 for begge. Sofie med H = kr 3 000 000 får α = 0,40 × 4 = 160 %, i praksis 100 % uten lån. Randi med H = kr 200 000 får α = 0,40 × 1,2 = 48 %. Andelen av totalformuen er 40 % for begge.</p>`,
      traps: [
        "Riktig retning, galt argument: tidsdiversifisering, som kurset avviser. Standardavviket til sluttformuen vokser med horisonten. Formelen har heller ingen tid i seg.",
        "Forveksler andelen av totalformuen, som er w* for begge, med andelen av finansformuen. Spørsmålet gjelder den siste.",
        null,
        "Jakter avkastning fordi tiden er kort. Mertons formel har verken tid eller avkastningsmål: andelen bestemmes av premien, variansen og γ. Humankapitalen trekker den ned for Randi, ikke opp.",
      ],
    },
    {
      id: "portefolje-7",
      title: "Indeksfond mot aktive fond: kostnaden og nullsumargumentet",
      theory: `<p>Et indeksfond eier aksjene i indeksen med markedsverdivekter og gir per definisjon det verdivektede snittet minus gebyret, typisk 0,1–0,3 % i året mot 1–2 % i aktive fond. Før kostnader eier alle investorer til sammen markedet. Indeksfondene eier sin del med markedsvekter, så de aktive eier resten med de samme vektene og får samlet markedsavkastningen før kostnader. Etter gebyrene må de som gruppe ligge under. Forbrukerrådets gjennomgang av norske forvalteres fond over tjue år fram til 2018 fant at aktive fond gjorde det svakere enn indeks på globale, europeiske og nordiske aksjer, men bedre på norske (H2025 oppgave 16). Et globalt indeksfond for utviklede markeder har rundt 70 % i USA og lite eller ingenting i Kina (H2024 oppgave 12b).</p>
<div class="formula"><div class="eq">Aktive som gruppe etter kostnader = markedsavkastningen − gjennomsnittlig gebyr</div><div class="eq">Sluttverdi = beløp × (1 + r − gebyr)<sup>T</sup></div><div class="where">r er avkastningen før kostnader og T antall år. Gebyret trekkes hvert år, så forskjellen vokser med renters rente.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Kr 500 000 i 30 år til 6 % før kostnader <b>[eksempeltall]</b>. Indeksfond med 0,2 % i gebyr: 500 000 × 1,058<sup>30</sup> = kr 2 713 564. Aktivt fond med 1,2 %: 500 000 × 1,048<sup>30</sup> = kr 2 040 838.</p><p>Ett prosentpoeng i gebyr koster kr 672 726, altså 24,8 % lavere sluttverdi.</p></div>`,
      q: `<p>Hvilken påstand om indeksfond og aktive fond er riktig?</p>`,
      options: [
        "Et indeksfond gir normalt litt høyere avkastning enn det verdivektede snittet av aksjene i indeksen, fordi det handler sjelden",
        "Aktive fond kan som gruppe ikke slå markedet etter kostnader, fordi de før kostnader til sammen eier markedet",
        "Forbrukerrådet fant at aktive fond fra norske forvaltere gjorde det svakere enn indeksfond i alle kategorier, også på norske aksjer",
        "Et globalt indeksfond for utviklede markeder har rundt 40 % i USA og en stor andel i kinesiske aksjer",
      ],
      answer: 1,
      solution: `<p>Riktig: <b>aktive fond kan som gruppe ikke slå markedet etter kostnader</b>. Indeksfondene eier markedet med markedsvekter. Da eier de aktive til sammen resten av markedet med de samme vektene og får markedsavkastningen før kostnader. Etter gebyrene på 1–2 % må de som gruppe ligge under.</p>`,
      check: `<p>Regn på et marked som stiger 9 % før kostnader: indeksfondene gir kundene 9 % − 0,15 % = 8,85 %. De aktive får samlet 9 % før kostnader og 9 % − 1,6 % = 7,4 % etter. Noen aktive kan slå indeksen, men bare på bekostning av andre aktive.</p>`,
      traps: [
        "Et indeksfond gir per definisjon det verdivektede snittet minus gebyret, aldri mer. Dette er den gale påstanden i H2024 oppgave 12a.",
        null,
        "For absolutt: Forbrukerrådet fant at aktive fond gjorde det bedre på norske aksjer. «Alle kategorier» er fellen i H2025 oppgave 16.",
        "Undervurderer USA og overdriver Kina: et globalt indeksfond for utviklede markeder er rundt 70 % USA og har lite eller ingenting i Kina.",
      ],
    },
    {
      id: "portefolje-8",
      title: "Valutasikring: se på samvariasjonen med lønnen",
      theory: `<p>Et globalt indeksfond er i utenlandsk valuta, for det meste dollar. Uten valutasikring er det mer verdt i kroner når kronen er svak. Valutasikring fjerner den svingningen og senker fondets eget standardavvik. Men det som teller, er risikoen i samlet inntekt: lønn pluss fond. Er lønnen høy når kronen er sterk, betaler det usikrede fondet mest når lønnen er lav. Det er en naturlig sikring og et argument mot å valutasikre (H2024 oppgave 12c).</p>
<div class="formula"><div class="eq">σ²<sub>samlet</sub> = σ²<sub>lønn</sub> + σ²<sub>fond</sub> + 2ρσ<sub>lønn</sub>σ<sub>fond</sub></div><div class="where">ρ er korrelasjonen mellom lønnen og fondets verdi i kroner. Negativ ρ trekker samlet varians ned. Valutasikring fjerner valutadelen av samvariasjonen. Samme regel taler mot mye norske aksjer når lønnen er knyttet til norsk økonomi (hjemmebias).</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Jens jobber i fiskeeksport. Når kronen er svak, får han godt betalt for fisken og lønnen er høy. Det usikrede fondet er også mest verdt i kroner når kronen er svak.</p><p>Lønn og fond går opp og ned sammen, så ρ er positiv. Her senker valutasikring risikoen i samlet inntekt. Jens bør sikre.</p></div>`,
      q: `<p>Mona er innkjøpssjef i et firma som importerer elektronikk og selger den i Norge. Når kronen er sterk, er varene billige å kjøpe inn og bonusen hennes er høy. Når kronen er svak, faller bonusen. Hun eier et globalt indeksfond i utenlandsk valuta og vurderer å bytte til en valutasikret utgave av samme fond. Sikringen er gratis og endrer ikke forventet avkastning. Mona er risikoavers og bryr seg om samlet inntekt: lønn og bonus pluss fondets verdi i kroner. Hva bør hun gjøre?</p>`,
      options: [
        "Valutasikre, fordi sikringen fjerner valutasvingningene og gjør fondet mindre risikabelt",
        "Valutasikre bare hvis hun er svært risikoavers, siden sikringen da er verdt mer for henne",
        "Det spiller ingen rolle, siden sikringen verken endrer forventet avkastning eller aksjerisikoen",
        "Ikke valutasikre, fordi det usikrede fondet er mest verdt i kroner når kronen er svak og bonusen lav",
      ],
      answer: 3,
      solution: `<p>Riktig: <b>ikke valutasikre</b>. Bonusen er høy når kronen er sterk og lav når den er svak. Det usikrede fondet er mest verdt i kroner når kronen er svak, altså når bonusen er lav. Fondet og bonusen trekker i hver sin retning, så samlet inntekt svinger mindre. Sikrer hun, forsvinner motvekten og samlet inntekt blir mer usikker.</p>`,
      check: `<p>Sjekk med formelen: med negativ korrelasjon mellom bonus og usikret fond er 2ρσ<sub>lønn</sub>σ<sub>fond</sub> negativ og trekker samlet varians ned. Sikringen setter valutadelen av den samvariasjonen til null. Snur du situasjonen, som for fiskeeksportøren i eksempelet, snus også svaret.</p>`,
      traps: [
        "Ser på fondet isolert. Fondets eget standardavvik faller, men samlet inntekt svinger mer når den naturlige sikringen forsvinner.",
        "Snur betydningen av risikoaversjon. Jo mer risikoavers hun er, desto mer verdt er den naturlige sikringen og desto sterkere er argumentet mot å sikre.",
        "Forventet avkastning er den samme, men risikoen i samlet inntekt er det ikke. Det er samvariasjonen med bonusen som avgjør.",
        null,
      ],
    },
    {
      id: "portefolje-9",
      title: "Eksamensnivå: γ baklengs og nye anslag (H2025 oppgave 11.1, H2021 oppgave 6b)",
      theory: `<p>H2025 oppgave 11.1 ga meravkastningen, markedets varians og w* og spurte etter γ. H2021 oppgave 6b endret risikopremien og spurte hva som skjer med aksjeandelen. Sett de to sammen og du har et totrinnsspørsmål: finn γ med de gamle anslagene og regn w* på nytt med de nye. γ er en egenskap ved personen og står fast når markedsanslagene endres. Fellene er de samme som før: variansen lest som standardavvik og bare én av endringene tatt med.</p>
<div class="formula"><div class="eq">γ = premie<sub>gammel</sub>/(w*<sub>gammel</sub> × σ²<sub>gammel</sub>)</div><div class="eq">w*<sub>ny</sub> = w*<sub>gammel</sub> × (premie<sub>ny</sub>/premie<sub>gammel</sub>) × (σ²<sub>gammel</sub>/σ²<sub>ny</sub>)</div><div class="where">Premien er μ − r<sub>f</sub>. Forholdsregningen er en kontroll: andelen følger premien og går motsatt vei av variansen.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Meravkastning 0,05, varians 0,04 og w* = 50 %: γ = 0,05/(0,50 × 0,04) = 2,5.</p><p>Variansen stiger til 0,05: w* = 0,05/(2,5 × 0,05) = 40 %. Kontroll: 50 % × 0,04/0,05 = 40 %.</p></div>`,
      q: `<p>Aksjemarkedets meravkastning over risikofri rente er 0,05 og markedets varians er 0,08. Ifølge Mertons formel bør Ola ha 25 % av formuen i aksjer <b>[eksempeltall]</b>. Et år senere justerer Ola anslagene: meravkastningen er nå 0,06 og variansen 0,06. Risikoaversjonen hans er den samme. Hva blir den nye optimale aksjeandelen?</p>`,
      options: ["40,0 %", "53,3 %", "22,5 %", "33,3 %"],
      answer: 0,
      solution: `<p>Risikoaversjonen fra de gamle anslagene: γ = 0,05/(0,25 × 0,08) = 0,05/0,02 = 2,5.</p><p>Ny andel: w* = 0,06/(2,5 × 0,06) = 0,06/0,15 = <b>40,0 %</b>.</p>`,
      check: `<p>Med forholdene: 25 % × (0,06/0,05) × (0,08/0,06) = 25 % × 1,2 × 1,333 = 40 %. ✓ Begge endringene trekker opp: høyere premie og lavere varians.</p>`,
      traps: [
        null,
        "Leste variansene som standardavvik og kvadrerte dem: γ = 0,05/(0,25 × 0,0064) = 31,25 og w* = 0,06/(31,25 × 0,0036) = 53,3 %.",
        "Snudde forholdet mellom variansene: 25 % × 1,2 × 0,06/0,08 = 22,5 %. Lavere varians skal gi høyere andel, ikke lavere.",
        "Tok bare med den nye variansen og glemte at premien steg: 25 % × 0,08/0,06 = 33,3 %.",
      ],
    },
    {
      id: "portefolje-10",
      title: "Eksamensnivå: Merton med humankapital ti år senere (H2022 oppgave 7, H2025 oppgave 11)",
      theory: `<p>H2022 oppgave 7 regnet w* fra standardavviket og fulgte samme person over ti år med risikofri humankapital. H2025 oppgave 11 oppga variansen direkte og spurte etter andelen av finansformuen. Den vanskeligste varianten samler alt: regn w* med variansen, finn aksjebeløpet av totalformuen og del på finansformuen <b>i det året spørsmålet gjelder</b>. Er humankapitalen bare gjort om til finansformue, står totalformuen og aksjebeløpet stille mens andelen av finansformuen faller. De gale alternativene i settene var w* brukt på finansformuen, andelen fra forrige delspørsmål og bankandelen.</p>
<div class="formula"><div class="eq">w* = (μ − r<sub>f</sub>)/(γσ²) &nbsp;→&nbsp; aksjebeløp = w* × (F + H) &nbsp;→&nbsp; α = aksjebeløp/F</div><div class="where">Bruk F og H fra det året spørsmålet gjelder. Med risikofri humankapital er α = w* × (1 + H/F).</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Risikopremie 6 %, σ = 25 % og γ = 3: w* = 0,06/(3 × 0,0625) = 32 %. I dag: F = kr 600 000 og risikofri H = kr 900 000. Aksjer: 0,32 × 1 500 000 = 480 000, altså α = 80 %.</p><p>Ti år senere: F = kr 1 600 000 og H = kr 400 000. Aksjer: 0,32 × 2 000 000 = 640 000, altså α = 640 000/1 600 000 = 40 %.</p></div>`,
      q: `<p>Ivar har risikoaversjon γ = 2. Risikopremien i aksjemarkedet er 4,5 % og markedets standardavvik 25 % <b>[eksempeltall]</b>. Han har trygg jobb, så humankapitalen regnes som risikofri. I dag er finansformuen kr 900 000 og humankapitalen kr 1 600 000. Ti år senere har han spart opp en finansformue på kr 1 500 000, mens humankapitalen er redusert til kr 1 000 000. Markedsanslagene og γ er uendret og han følger Mertons formel hele tiden. Hvor stor andel av finansformuen bør han ha i aksjer om ti år?</p>`,
      options: ["60 %", "100 %", "15 %", "36 %"],
      answer: 0,
      solution: `<p>w* = 0,045/(2 × 0,25²) = 0,045/0,125 = 36 %.</p><p>Om ti år: totalformue 1 500 000 + 1 000 000 = kr 2 500 000. Aksjebeløp: 0,36 × 2 500 000 = kr 900 000.</p><p>α = 900 000/1 500 000 = <b>60 %</b>.</p>`,
      check: `<p>I dag er totalformuen også kr 2 500 000 og aksjebeløpet kr 900 000, hele finansformuen. Humankapitalen er bare gjort om til finansformue, så aksjebeløpet står stille og andelen faller fra 100 % til 60 %. Om ti år er det sikre 600 000 i bank pluss 1 000 000 i humankapital, altså 64 % av totalformuen. Aksjene er de andre 36 % = w*. ✓</p>`,
      traps: [
        null,
        "Andelen i dag, ikke om ti år: 0,36 × 2 500 000/900 000 = 100 %.",
        "Brukte standardavviket i stedet for variansen: w* = 0,045/(2 × 0,25) = 9 % og α = 0,09 × 2 500 000/1 500 000 = 15 %.",
        "Glemte humankapitalen og svarte med w* = 36 %. Det gir bare kr 540 000 i aksjer, 21,6 % av totalformuen.",
      ],
    },
  ],
});

/* sjanger 8 · nytte · Forventet nytte, forsikring og valg under usikkerhet */
window.EDU_DATA.sjangre.push({
  id: "nytte",
  num: 8,
  title: "Forventet nytte, forsikring og valg under usikkerhet",
  summary: "Fra forventet nytte og sikkerhetsekvivalent til maksimalpremie, delvis dekning, terskelsannsynlighet og sparevalg med tapsaversjon",
  chapters: [17, 18],
  exam: "4 av 9 sett og 3 av 9 · H2024 oppgave 11, H2025 oppgave 13, H2022 oppgave 5, H2019 oppgave 7 og 9",
  intro: `<p>Forventet nytte og forsikring har kommet i fire av ni sett og er på vei opp: 8 % av poengene i H2024 (oppgave 11) og 14 % i H2025 (oppgave 12 og 13). Sparevalget med ln-nytte, subjektive sannsynligheter og tapsaversjon har kommet i tre sett og tok 14 % av H2022 (oppgave 5). Alt hviler på én regel: regn nytten i hvert utfall først og ta gjennomsnittet etterpå. Stigen bygger sikkerhetsekvivalent, maksimalpremie, delvis dekning og terskelsannsynlighet ett steg om gangen. Den ender med oppgavene fra H2022, H2024 og H2025 med nye tall, der de gale alternativene er laget av feilene sensor ser oftest.</p>`,
  steps: [
    {
      id: "nytte-1",
      title: "Forventet nytte: nytte først, gjennomsnitt etterpå",
      theory: `<p>En nyttefunksjon U(W) gjør formue om til nytte. Er formuen usikker, regner du nytten i hvert utfall og vekter med sannsynlighetene. Det er forventet nytte, E[U(W)]. Tar du gjennomsnittet av formuen først og nytten etterpå, får du U(E[W]), som er et annet tall. Med en konkav funksjon som √W er den siste kronen verdt mindre enn den første, så et tap trekker nytten mer ned enn en like stor gevinst løfter den: E[U(W)] blir lavere enn U(E[W]). Det er risikoaversjon.</p>
<div class="formula"><div class="eq">E[W] = (1 − p) × W + p × (W − L)</div><div class="eq">E[U(W)] = (1 − p) × U(W) + p × U(W − L)</div><div class="eq">Konkav U: E[U(W)] &lt; U(E[W])</div><div class="where">W er formuen, L tapet og p sannsynligheten for tapet. Formuen i tapsutfallet er W − L, ikke L. E[W] måles i kroner, E[U(W)] i nytteenheter.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>W = 49, L = 48 og p = 0,5, med U(W) = √W. Formuen er 49 eller 49 − 48 = 1.</p><p>Forventet formue: 0,5 × 49 + 0,5 × 1 = 25. Da er U(E[W]) = √25 = <b>5</b>.</p><p>Forventet nytte: 0,5 × √49 + 0,5 × √1 = 0,5 × 7 + 0,5 × 1 = <b>4</b>.</p><p>4 er mindre enn 5, som det skal være med konkav U. ✓</p></div>`,
      q: `<p>Formuen din er W = 100. Med sannsynlighet p = 0,25 taper du L = 64, ellers beholder du alt. Nyttefunksjonen er U(W) = √W [eksempeltall]. Hva er forventet nytte, E[U(W)]?</p>`,
      options: ["9,17", "84,00", "9,00", "9,50"],
      answer: 2,
      solution: `<p>Formuen i de to utfallene: 100 med sannsynlighet 0,75 og 100 − 64 = 36 med sannsynlighet 0,25.</p><p>Nytten i hvert utfall: √100 = 10 og √36 = 6.</p><p>Vekt med sannsynlighetene: E[U(W)] = 0,75 × 10 + 0,25 × 6 = 7,5 + 1,5 = <b>9,00</b>.</p>`,
      check: `<p>Forventet formue er 0,75 × 100 + 0,25 × 36 = 75 + 9 = 84, så U(E[W]) = √84 = 9,17. Forventet nytte 9,00 ligger under 9,17, slik den skal med konkav U. ✓ Får du √84 eller et tall over, har du regnet feil.</p>`,
      traps: [
        "Tok nytten av forventet formue: U(E[W]) = √84 = 9,17. Det er gjennomsnitt først og nytte etterpå, altså feil rekkefølge.",
        "Brukte forventet verdi i stedet for forventet nytte: 0,75 × 100 + 0,25 × 36 = 84,00. Det er kroner, ikke nytte.",
        null,
        "Satte inn tapet i stedet for formuen etter tapet: 0,75 × √100 + 0,25 × √64 = 7,5 + 2 = 9,50. Formuen i tapsutfallet er 100 − 64 = 36.",
      ],
    },
    {
      id: "nytte-2",
      title: "Sikkerhetsekvivalent, risikopremie og maksimalpremie",
      theory: `<p>Nyttetall er vanskelige å tolke, så du oversetter dem tilbake til kroner. Sikkerhetsekvivalenten CE er den sikre formuen som gir like mye nytte som det usikre utfallet: med U = √W kvadrerer du forventet nytte. Risikopremien RP = E[W] − CE er hvor mye forventet formue du gir opp for å slippe risikoen. Med full forsikring betaler du premien P og har W − P i begge utfall. Den høyeste premien du vil betale, P<sub>maks</sub>, gjør deg akkurat likegyldig, så W − P<sub>maks</sub> = CE. Den er rettferdig premie p × L, altså forventet skade, pluss risikopremien.</p>
<div class="formula"><div class="eq">U(CE) = E[U(W)] &nbsp;⟹&nbsp; for U = √W: CE = (E[U(W)])²</div><div class="eq">RP = E[W] − CE</div><div class="eq">P<sub>maks</sub> = W − CE = p × L + RP</div><div class="where">Rettferdig (aktuarisk) premie er p × L. P<sub>maks</sub> ligger over rettferdig premie og under tapet. CE er en formue, ikke en premie: trekk den alltid fra startformuen.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Fra forrige eksempel: W = 49, L = 48, p = 0,5 og U = √W gir E[U] = 4 og E[W] = 25.</p><p>Sikkerhetsekvivalenten: CE = 4² = 16. Risikopremien: RP = 25 − 16 = 9.</p><p>Rettferdig premie: 0,5 × 48 = 24. Maksimal premie: P<sub>maks</sub> = 49 − 16 = <b>33</b>.</p><p>Kontroll: 24 + 9 = 33 og √16 = 4 = E[U]. ✓</p></div>`,
      q: `<p>Formuen din er W = 100. Med sannsynlighet p = 0,25 taper du L = 64. Nyttefunksjonen er U(W) = √W [eksempeltall]. Et forsikringsselskap tilbyr full dekning av tapet. Hva er den høyeste premien du er villig til å betale?</p>`,
      options: ["16", "19", "91", "51"],
      answer: 1,
      solution: `<p>Uten forsikring: E[U] = 0,75 × 10 + 0,25 × 6 = 9, så CE = 9² = 81.</p><p>Maksimal premie: P<sub>maks</sub> = W − CE = 100 − 81 = <b>19</b>.</p><p>Forventet formue er 0,75 × 100 + 0,25 × 36 = 84, så risikopremien er 84 − 81 = 3. Rettferdig premie er 0,25 × 64 = 16. Du betaler altså gjerne 3 mer enn forventet skade for å slippe risikoen.</p>`,
      check: `<p>To veier: rettferdig premie pluss risikopremie er 16 + 3 = 19. ✓ Med premie 19 er formuen 100 − 19 = 81 i begge utfall. √81 = 9 er nøyaktig forventet nytte uten forsikring. ✓</p>`,
      traps: [
        "Rettferdig premie: p × L = 0,25 × 64 = 16. Det er forventet skade. En risikoavers person betaler mer, opp til 16 + 3 = 19.",
        null,
        "Glemte å invertere nyttefunksjonen og brukte nyttetallet 9 som sikkerhetsekvivalent: 100 − 9 = 91. CE er 9² = 81. En premie over tapet på 64 gir dessuten ingen mening.",
        "Byttet om sannsynlighetene og la 75 % på tapet: E[U] = 0,25 × 10 + 0,75 × 6 = 7, CE = 49 og 100 − 49 = 51.",
      ],
    },
    {
      id: "nytte-3",
      title: "Kjøpe eller ikke: sammenlign nytte, ikke kroner",
      theory: `<p>Er premien gitt, er spørsmålet om du skal kjøpe. Med full dekning er formuen sikker, så nytten med forsikring er bare U(W − P). Uten forsikring regner du forventet nytte som i steg 1. Kjøp når nytten med forsikring er størst. At premien ligger over forventet skade, avgjør ingenting: en risikoavers person betaler gjerne mer enn rettferdig premie, helt opp til P<sub>maks</sub>.</p>
<div class="formula"><div class="eq">Kjøp hvis U(W − P) &gt; (1 − p) × U(W) + p × U(W − L)</div><div class="eq">Det samme som: P &lt; P<sub>maks</sub> = W − CE</div><div class="where">Høyresiden er forventet nytte uten forsikring, ikke nytten av forventet formue. Sammenligner du kroner, P mot p × L, svarer du som en risikonøytral person. Da blir svaret nei hver gang premien har et påslag.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>W = kr 160 000, L = kr 120 000, p = 10 % og U = √W. Premien for full dekning er kr 14 000.</p><p>Uten forsikring: 0,90 × √160 000 + 0,10 × √40 000 = 0,90 × 400 + 0,10 × 200 = <b>380,00</b>.</p><p>Med forsikring: √(160 000 − 14 000) = √146 000 = <b>382,10</b>. Det er høyere, så kjøp, selv om forventet skade bare er 0,10 × 120 000 = 12 000.</p><p>Kontroll: P<sub>maks</sub> = 160 000 − 380² = 160 000 − 144 400 = 15 600. Premien 14 000 ligger under. ✓</p></div>`,
      q: `<p>Du har kr 810 000 i formue, hvorav en bil til kr 450 000. Med sannsynlighet 10 % blir bilen totalskadet i løpet av året. Da er den verdiløs. Nyttefunksjonen er U(W) = √W [eksempeltall]. Et selskap tilbyr full dekning for kr 50 000. Bør du kjøpe forsikringen?</p>`,
      options: [
        "Ja, fordi nytten med forsikring, 871,78, er høyere enn forventet nytte uten, 870,00",
        "Nei, fordi premien på kr 50 000 er høyere enn forventet skade på kr 45 000",
        "Nei, fordi nytten uten forsikring, 874,64, er høyere enn 871,78 med forsikring",
        "Ja, fordi en risikoavers person alltid forsikrer sine dyreste eiendeler",
      ],
      answer: 0,
      solution: `<p>Uten forsikring er formuen 810 000 med 90 % og 810 000 − 450 000 = 360 000 med 10 %: E[U] = 0,90 × 900 + 0,10 × 600 = 810 + 60 = 870,00.</p><p>Med forsikring er formuen 810 000 − 50 000 = 760 000 sikkert: √760 000 = 871,78.</p><p>871,78 er høyere enn 870,00, så <b>ja, kjøp</b>.</p>`,
      check: `<p>Regn i kroner. CE uten forsikring er 870² = 756 900, så P<sub>maks</sub> = 810 000 − 756 900 = 53 100. Premien 50 000 ligger under. ✓ Dekomponert: rettferdig premie 0,10 × 450 000 = 45 000 pluss risikopremie 765 000 − 756 900 = 8 100 gir 53 100. ✓</p>`,
      traps: [
        null,
        "Sammenlignet kroner i stedet for nytte: 50 000 mot 0,10 × 450 000 = 45 000. Det er den risikonøytrale regelen. Du betaler gjerne opp til kr 53 100.",
        "Brukte nytten av forventet formue i stedet for forventet nytte uten forsikring: √765 000 = 874,64. Riktig sammenligningsgrunnlag er 0,90 × 900 + 0,10 × 600 = 870,00.",
        "Riktig konklusjon med gal regel. Risikoaversjon betyr at du betaler noe over forventet skade, ikke hva som helst. Til en premie over kr 53 100 ville du sagt nei.",
      ],
    },
    {
      id: "nytte-4",
      title: "ln W og risikoaversjonen γ: tilbake til kroner med eksponentialfunksjonen",
      theory: `<p>√W og ln W hører til samme familie av nyttefunksjoner, der γ er den relative risikoaversjonen: √W har γ = 0,5 og ln W har γ = 1. Jo høyere γ, jo lavere sikkerhetsekvivalent og jo høyere maksimalpremie for samme risiko. Med γ = 0 er du risikonøytral og CE er lik forventet formue. Med U(W) = ln W er rutinen den samme som før, men inverteringen er en annen: logaritmen snus med eksponentialfunksjonen. Formuen i tapsutfallet må være positiv, fordi ln 0 ikke finnes.</p>
<div class="formula"><div class="eq">U(W) = W<sup>1−γ</sup>/(1 − γ): γ = 0,5 gir √W, γ = 1 gir ln W</div><div class="eq">E[ln W] = (1 − p) × ln W + p × ln(W − L)</div><div class="eq">CE = e<sup>E[ln W]</sup> &nbsp;·&nbsp; P<sub>maks</sub> = W − CE</div><div class="where">γ er den samme parameteren som i Mertons formel. Behold alle desimalene i E[ln W] før du tar eksponentialen. Avrunder du til fire desimaler, kan CE flytte seg med opptil 50 kroner per million.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Formuen er kr 900 000, men med sannsynlighet 0,5 taper du kr 500 000 og sitter igjen med kr 400 000. U = ln W.</p><p>E[ln W] = 0,5 × ln 900 000 + 0,5 × ln 400 000 = 0,5 × 13,710150 + 0,5 × 12,899220 = 13,304685.</p><p>CE = e<sup>13,304685</sup> = <b>600 000</b>, så P<sub>maks</sub> = 900 000 − 600 000 = <b>300 000</b>.</p><p>Med √W ville CE vært (0,5 × 948,68 + 0,5 × 632,46)² = 625 000 og P<sub>maks</sub> 275 000. En risikonøytral person (γ = 0) har CE lik forventet formue, 650 000. Høyere γ gir lavere CE. ✓</p></div>`,
      q: `<p>Du har kr 1 500 000 i formue, hvorav en hytte til kr 1 000 000. Med sannsynlighet 3 % blir hytta totalskadet i løpet av året. Nyttefunksjonen er U(W) = ln W [eksempeltall]. Hva er den høyeste premien du vil betale for full dekning av hytta?</p>`,
      options: ["kr 18 135", "kr 37 797", "kr 30 000", "kr 48 632"],
      answer: 3,
      solution: `<p>Formuen er 1 500 000 med 97 % og 500 000 med 3 %. ln 1 500 000 = 14,220976 og ln 500 000 = 13,122363.</p><p>E[ln W] = 0,97 × 14,220976 + 0,03 × 13,122363 = 13,794346 + 0,393671 = 14,188017.</p><p>CE = e<sup>14,188017</sup> = 1 451 368, så P<sub>maks</sub> = 1 500 000 − 1 451 368 = <b>kr 48 632</b>.</p>`,
      check: `<p>Dekomponer: rettferdig premie er 0,03 × 1 000 000 = 30 000. Forventet formue er 0,97 × 1 500 000 + 0,03 × 500 000 = 1 470 000, så risikopremien er 1 470 000 − 1 451 368 = 18 632. Til sammen 30 000 + 18 632 = 48 632. ✓</p>`,
      traps: [
        "Satte formuen i skadetilstanden lik hyttas verdi, 1 000 000, i stedet for 1 500 000 − 1 000 000 = 500 000: E[ln W] = 14,208812, CE = 1 481 865 og P<sub>maks</sub> = 18 135.",
        "Brukte √W av gammel vane: E[√W] = 1 209,2157, CE = 1 462 203 og P<sub>maks</sub> = 1 500 000 − 1 462 203 = 37 797. ln W er mer risikoavers og gir høyere premie.",
        "Rettferdig premie: 0,03 × 1 000 000 = 30 000. Det er det en risikonøytral person betaler.",
        null,
      ],
    },
    {
      id: "nytte-5",
      title: "Delvis dekning: premien betales i begge tilstander",
      theory: `<p>Med delvis dekning er risikoen dempet, ikke borte, så du regner forventet nytte over begge tilstandene også med forsikring. Premien betales i begge: i skadetilstanden har du formuen etter tapet, pluss utbetalingen, minus premien. Til rettferdig pris koster hver krone dekning nøyaktig det den gir tilbake i forventning. Forventet formue er da den samme for enhver dekningsgrad, mens risikoen først er borte ved 100 %, så full dekning gir høyest forventet nytte for enhver konkav nyttefunksjon (Mossins resultat, H2024 oppgave 11b). Med påslag over rettferdig pris kan delvis dekning eller egenandel lønne seg. Egenandelen demper i tillegg moralsk hasard: den som bærer en del av tapet selv, passer bedre på (H2019 oppgave 7b).</p>
<div class="formula"><div class="eq">Ingen skade: W − P &nbsp;·&nbsp; skade: W − L + αL − P</div><div class="eq">E[U] = (1 − p) × U(W − P) + p × U(W − L + αL − P)</div><div class="eq">Rettferdig premie for dekningsgrad α: P = p × αL</div><div class="where">α = 0 er ingen forsikring og α = 1 full dekning. αL er utbetalingen. Å glemme premien i skadetilstanden er den nest vanligste feilen på temaet. Den gjør delvis dekning for god. Nyttefunksjonen tar formue, ikke utbetaling.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>W = 100, L = 64, p = 0,25 og U = √W. Rettferdig premie er 8 for halv dekning og 16 for full.</p><p>Ingen: E[U] = 0,75 × 10 + 0,25 × 6 = <b>9,0000</b>.</p><p>Halv: formuen er 100 − 8 = 92 eller 100 − 64 + 32 − 8 = 60. E[U] = 0,75 × 9,5917 + 0,25 × 7,7460 = 7,1937 + 1,9365 = <b>9,1302</b>.</p><p>Full: formuen er 84 i begge tilstander, √84 = <b>9,1652</b>.</p><p>Forventet formue er 84 i alle tre, men nytten stiger med dekningen. ✓</p></div>`,
      q: `<p>Du har kr 250 000 i formue, hvorav en båt til kr 90 000. Sannsynligheten for at båten går tapt i løpet av året er 10 %. Nyttefunksjonen er U(W) = √W [eksempeltall]. Du kan forsikre 0 %, 50 % eller 100 % av båtens verdi. Premien er rettferdig: kr 4 500 for halv dekning og kr 9 000 for full dekning. Hvilket utsagn er riktig?</p>`,
      options: [
        "Full dekning er best, fordi den fjerner all risiko uten å endre forventet formue",
        "Alle tre er like gode, fordi forventet formue er kr 241 000 med alle tre dekningsgradene",
        "Halv dekning gir høyest forventet nytte: 491,21 mot 490,92 med full dekning",
        "Svaret avhenger av nyttefunksjonen: med ln W ville ingen dekning gitt høyest forventet nytte",
      ],
      answer: 0,
      solution: `<p>Ingen: 0,9 × √250 000 + 0,1 × √160 000 = 0,9 × 500 + 0,1 × 400 = 490,00.</p><p>Halv: formuen er 250 000 − 4 500 = 245 500 eller 250 000 − 90 000 + 45 000 − 4 500 = 200 500. E[U] = 0,9 × 495,48 + 0,1 × 447,77 = 445,93 + 44,78 = 490,71.</p><p>Full: formuen er 241 000 sikkert, √241 000 = 490,92.</p><p><b>Full dekning gir høyest forventet nytte.</b></p>`,
      check: `<p>Forventet formue: 0,9 × 250 000 + 0,1 × 160 000 = 241 000 uten forsikring, 0,9 × 245 500 + 0,1 × 200 500 = 220 950 + 20 050 = 241 000 med halv og 241 000 med full. ✓ I kroner: CE er 490² = 240 100 uten, 490,7088² = 240 795 med halv og 241 000 med full. Hver krone dekning er gratis i forventning og fjerner litt risiko.</p>`,
      traps: [
        null,
        "Sammenlignet forventet formue. Den er kr 241 000 i alle tre, men nytten er det ikke: 490,00, 490,71 og 490,92. Risikoen teller for en risikoavers person.",
        "Glemte premien i skadetilstanden ved halv dekning og brukte 250 000 − 90 000 + 45 000 = 205 000 i stedet for 200 500: 445,93 + 45,28 = 491,21. Til rettferdig pris kan halv dekning aldri slå full.",
        "ln W er også konkav og gir samme rangering: 12,3846, 12,3908 og 12,3926 for ingen, halv og full dekning. Hvilken konkav funksjon du bruker, endrer ikke svaret til rettferdig pris.",
      ],
    },
    {
      id: "nytte-6",
      title: "Laveste sannsynlighet som gjør forsikringen lønnsom",
      theory: `<p>Den andre regnevarianten snur likningen: med premien gitt skal du finne den laveste skadesannsynligheten som gjør forsikringen lønnsom. Sett nytten med full dekning lik forventet nytte uten forsikring. Løs så for p. Høyresiden avhenger ikke av p, mens venstresiden faller når p øker, så forsikringen lønner seg for alle p over terskelen p*. For en risikoavers person ligger terskelen under den risikonøytrale terskelen P/L.</p>
<div class="formula"><div class="eq">(1 − p*) × U(W) + p* × U(W − L) = U(W − P)</div><div class="eq">p* = [U(W) − U(W − P)] / [U(W) − U(W − L)]</div><div class="where">Er tapet hele formuen og U(0) = 0, blir nevneren U(W) og p* = 1 − U(W − P)/U(W), som i H2025 oppgave 13. Den snarveien gjelder bare ved totaltap.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>W = kr 1 000 000, L = kr 750 000, premie kr 10 000 og U = √W.</p><p>√1 000 000 = 1 000, √250 000 = 500 og √990 000 = 994,9874.</p><p>p* = (1 000 − 994,9874)/(1 000 − 500) = 5,0126/500 = <b>1,00 %</b>.</p><p>Den risikonøytrale terskelen er 10 000/750 000 = 1,33 %. Den risikoaverse ligger under. ✓</p></div>`,
      q: `<p>Du har kr 1 690 000 i formue, hvorav et sommerhus til kr 1 050 000. Nyttefunksjonen er U(W) = √W [eksempeltall]. Et selskap tilbyr full dekning mot totalskade på sommerhuset for kr 20 000. Hva er den laveste sannsynligheten for totalskade som gjør at du vil kjøpe forsikringen?</p>`,
      options: ["1,54 %", "1,90 %", "0,59 %", "1,23 %"],
      answer: 0,
      solution: `<p>Nyttene: √1 690 000 = 1 300, √(1 690 000 − 1 050 000) = √640 000 = 800 og √(1 690 000 − 20 000) = √1 670 000 = 1 292,2848.</p><p>p* = (1 300 − 1 292,2848)/(1 300 − 800) = 7,7152/500 = 0,015430, altså <b>1,54 %</b>.</p>`,
      check: `<p>Sett p* inn: forventet nytte uten forsikring er 1 300 − 500 × 0,015430 = 1 300 − 7,7152 = 1 292,2848, nøyaktig nytten med forsikring. ✓ Retningen: ved 1,90 % er nytten uten forsikring 1 300 − 500 × 0,0190 = 1 290,50, lavere enn 1 292,28, så der kjøper du. Forsikringen lønner seg over terskelen.</p>`,
      traps: [
        null,
        "Risikonøytral terskel: P/L = 20 000/1 050 000 = 1,90 %. Den sammenligner kroner. En risikoavers person kjøper allerede ved lavere sannsynlighet.",
        "Brukte snarveien for totaltap: 7,7152/1 300 = 0,59 %. Her er tapet bare en del av formuen, så nevneren er 1 300 − 800 = 500.",
        "Brukte ln W i stedet for √W: (ln 1 690 000 − ln 1 670 000)/(ln 1 690 000 − ln 640 000) = 0,011905/0,971016 = 1,23 %.",
      ],
    },
    {
      id: "nytte-7",
      title: "Sparevalg med ln W og subjektive sannsynligheter",
      theory: `<p>Samme verktøy brukes på sparevalg. Banken gir en sikker sluttverdi, så nytten er bare ln av den. Aksjene gir én sluttverdi i gode tider og en annen i dårlige, så du tar ln i hvert scenario og vekter med sannsynlighetene. Med ln W kan banken vinne selv om aksjene har høyere forventet sluttverdi. Subjektive sannsynligheter er det investoren selv tror. De endrer aksjenes forventede nytte, men verken sluttverdiene eller bankens nytte.</p>
<div class="formula"><div class="eq">Bank: U = ln W<sub>bank</sub></div><div class="eq">Aksjer: E[U] = q × ln W<sub>god</sub> + (1 − q) × ln W<sub>dårlig</sub></div><div class="eq">Grensen: q* = (ln W<sub>bank</sub> − ln W<sub>dårlig</sub>)/(ln W<sub>god</sub> − ln W<sub>dårlig</sub>)</div><div class="where">q er sannsynligheten for gode tider. Tror investoren på en q over q*, velger hun aksjer. Ta ln før forventningen: ln av forventet sluttverdi er U(E[W]), ikke E[U(W)].</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Kr 250 000 spares i åtte år. Banken gir sikkert kr 316 693. Aksjene gir kr 498 141 i gode tider og kr 195 936 i dårlige, med objektiv sannsynlighet 40 % for gode tider.</p><p>ln 316 693 = 12,6657, ln 498 141 = 13,1186 og ln 195 936 = 12,1855.</p><p>Objektivt: 0,40 × 13,1186 + 0,60 × 12,1855 = 12,559, under bankens 12,666. Banken.</p><p>Tror investoren på 50 %: 0,5 × (13,1186 + 12,1855) = 12,652, fortsatt under 12,666. Grensen er q* = (12,6657 − 12,1855)/(13,1186 − 12,1855) = 0,4802/0,9331 = <b>51,46 %</b>. ✓</p></div>`,
      q: `<p>Ida sparer kr 450 000 i ti år og ser bort fra skatt. Banken gir sikkert kr 604 762. Et aksjefond gir kr 1 167 184 i gode tider og kr 299 175 i dårlige tider. Den objektive sannsynligheten for gode tider er 45 %, men Ida tror selv at den er 60 %. Hun velger etter sin egen tro. Nyttefunksjonen er U(W) = ln W, der W er sluttverdien [eksempeltall]. Hvilket utsagn er riktig?</p>`,
      options: [
        "Nytte bank 13,313 &gt; nytte aksjer 13,221 ⇒ banken",
        "Nytte bank 13,313 &lt; nytte aksjer 13,426 ⇒ aksjer",
        "Nytte bank 13,313 &lt; nytte aksjer 13,617 ⇒ aksjer",
        "Nytte bank 13,313 &gt; nytte aksjer 13,153 ⇒ banken",
      ],
      answer: 1,
      solution: `<p>Logaritmene: ln 604 762 = 13,3126, ln 1 167 184 = 13,9701 og ln 299 175 = 12,6088.</p><p>Banken: 13,3126, uansett hva Ida tror.</p><p>Aksjer med Idas sannsynligheter: 0,60 × 13,9701 + 0,40 × 12,6088 = 8,3821 + 5,0435 = 13,4256.</p><p>13,426 er høyere enn 13,313, så <b>Ida velger aksjer</b>.</p>`,
      check: `<p>Grensen: q* = (13,3126 − 12,6088)/(13,9701 − 12,6088) = 0,7038/1,3613 = 51,70 %. Ida tror på 60 %, over grensen, så aksjer. ✓ Med de objektive 45 % ville hun valgt banken, så den subjektive troen snur valget. I kroner er CE for aksjene e<sup>13,4256</sup> ≈ 677 100, over bankens 604 762.</p>`,
      traps: [
        "Brukte de objektive sannsynlighetene: 0,45 × 13,9701 + 0,55 × 12,6088 = 13,2214. Ida velger etter sin egen tro på 60 %.",
        null,
        "Tok ln av forventet sluttverdi: ln(0,60 × 1 167 184 + 0,40 × 299 175) = ln 819 980 = 13,617. Det er U(E[W]), ikke forventet nytte.",
        "Byttet om sannsynlighetene og la 40 % på gode tider: 0,40 × 13,9701 + 0,60 × 12,6088 = 5,5880 + 7,5653 = 13,1533.",
      ],
    },
    {
      id: "nytte-8",
      title: "Eksamensnivå: tapsaversjon i sparevalget (H2022 oppgave 5)",
      theory: `<p>Med tapsaversjon måler investoren utfall mot et referansepunkt, her beløpet som ble satt inn. I kursets oppgaver ganges nytten av hvert utfall under referansepunktet med en tapsvekt λ mindre enn 1, så det dårlige utfallet blir enda dårligere. Utfall over referansepunktet røres ikke, heller ikke et sikkert bankinnskudd. Start derfor med å avgjøre hvilke utfall som er tap. H2022 oppgave 5 er bygget slik at alle fire alternativene kan ha samme konklusjon, så det er tallene som skiller dem.</p>
<div class="formula"><div class="eq">E[U] = q × ln W<sub>god</sub> + (1 − q) × λ × ln W<sub>dårlig</sub> &nbsp;når bare W<sub>dårlig</sub> ligger under referansepunktet</div><div class="where">I H2022 oppgave 5 og H2019 oppgave 9 er λ = 1/1,03 = 0,970874. Tapsvekten trekker bare aksjenytten ned, så den flytter valget mot det trygge alternativet.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Fra forrige eksempel: kr 250 000 satt inn, banken gir kr 316 693, aksjene kr 498 141 eller kr 195 936 med objektiv sannsynlighet 40 % for gode tider. λ = 1/1,03 = 0,970874.</p><p>Bare 195 936 ligger under 250 000. Banken og det gode utfallet røres ikke.</p><p>λ × 12,1855 = 11,8306. Aksjer: 0,40 × 13,1186 + 0,60 × 11,8306 = <b>12,346</b>.</p><p>Banken gir 12,666, så banken vinner med større margin enn uten tapsaversjon. ✓</p></div>`,
      q: `<p>Ida fra forrige steg sparer kr 450 000 i ti år. Banken gir sikkert kr 604 762, aksjefondet kr 1 167 184 i gode tider og kr 299 175 i dårlige. Hun bruker nå de objektive sannsynlighetene: 45 % for gode tider. Ida er tapsavers: nytten av utfall under referansepunktet kr 450 000 ganges med 1/1,04 = 0,961538. Nyttefunksjonen er ln W [eksempeltall]. Hvilket utsagn er riktig?</p>`,
      options: [
        "Nytte bank 13,313 &gt; nytte aksjer 13,221 ⇒ banken",
        "Nytte bank 12,801 &lt; nytte aksjer 12,955 ⇒ aksjer",
        "Nytte bank 13,313 &gt; nytte aksjer 12,955 ⇒ banken",
        "Nytte bank 12,801 &gt; nytte aksjer 12,713 ⇒ banken",
      ],
      answer: 2,
      solution: `<p><b>Hvilke utfall er tap?</b> Bare de dårlige tidene, 299 175, ligger under 450 000. Banken (604 762) og de gode tidene (1 167 184) ligger over.</p><p>Banken: ln 604 762 = 13,3126, uendret.</p><p>Aksjer: λ × ln 299 175 = 0,961538 × 12,6088 = 12,1238. E[U] = 0,45 × 13,9701 + 0,55 × 12,1238 = 6,287 + 6,668 = 12,955.</p><p>13,313 er høyere enn 12,955, så <b>banken</b>.</p>`,
      check: `<p>Uten tapsaversjon var aksjenytten 13,2214. Straffen er 0,55 × 12,6088 × (1 − 0,961538) = 0,2667. Trekk den fra: 13,2214 − 0,2667 = 12,9547, samme tall som over. ✓ I kroner faller CE for aksjene fra e<sup>13,2214</sup> ≈ 552 000 til e<sup>12,9547</sup> ≈ 422 800.</p>`,
      traps: [
        "Brukte ikke tapsvekten i det hele tatt: 0,45 × 13,9701 + 0,55 × 12,6088 = 13,2214. Det er nytten uten tapsaversjon.",
        "Ganget også bankens nytte med tapsvekten: 0,961538 × 13,3126 = 12,8006. Banken gir 604 762, over referansepunktet, så den skal ikke straffes.",
        null,
        "Ganget alle utfallene med tapsvekten, også banken og de gode tidene: 0,961538 × 13,3126 = 12,8006 og 0,961538 × 13,2214 = 12,7129. Bare utfall under referansepunktet skal straffes.",
      ],
    },
    {
      id: "nytte-9",
      title: "Eksamensnivå: maksimalpremien med prøve-og-feile (H2024 oppgave 11d)",
      theory: `<p>Sensorveiledningen godtar eksplisitt prøve-og-feile: sett svaralternativene inn i nyttefunksjonen i stedet for å løse likningen. Regn først forventet nytte uten forsikring, ankeret. Stryk så alternativene som bryter en grense du kjenner: maksimalpremien er høyere enn rettferdig premie og lavere enn en premie du allerede har avvist. Sett inn det som er igjen. Den høyeste premien som fortsatt gir minst ankeret, er svaret.</p>
<div class="formula"><div class="eq">Test: U(W − P) ≥ E[U uten]?</div><div class="eq">p × L &lt; P<sub>maks</sub> &lt; avvist premie</div><div class="where">Med √W og totaltap er P<sub>maks</sub> = W × (1 − (1 − p)²) = W × (2p − p²), litt under 2 × p × W. Tommelfingerregelen «to ganger forventet skade» gir derfor et tall som er litt for høyt.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Huset er verdt kr 640 000 og er hele formuen. Det brenner med sannsynlighet 1 % og U = √W. Du har avvist full dekning for kr 15 000. Alternativene er 6 400, 12 736, 12 800 og 16 000.</p><p>Ankeret: 0,99 × √640 000 = 0,99 × 800 = 792.</p><p>Stryk 16 000 (over avvist premie) og 6 400 (lik rettferdig premie 0,01 × 640 000).</p><p>Test 12 800: √627 200 = 791,96, under 792. For høyt. Test 12 736: √627 264 = 792,00. ✓ Svaret er <b>kr 12 736</b>.</p></div>`,
      q: `<p>Huset ditt er verdt kr 2 250 000 og er din eneste formue. Med sannsynlighet 2 % brenner det og mister hele verdien. Nyttefunksjonen er U(W) = √W [eksempeltall]. Du har allerede regnet ut at du takker nei til full dekning for kr 100 000. Hva er det høyeste beløpet du er villig til å betale for full dekning?</p>`,
      options: ["kr 90 000", "kr 45 000", "kr 90 900", "kr 89 100"],
      answer: 3,
      solution: `<p><b>Ankeret.</b> 0,98 × √2 250 000 + 0,02 × √0 = 0,98 × 1 500 = 1 470.</p><p><b>Stryk.</b> Rettferdig premie er 0,02 × 2 250 000 = 45 000. Maksimalpremien må ligge over den.</p><p><b>Test.</b> 90 900: √2 159 100 = 1 469,39. 90 000: √2 160 000 = 1 469,69. Begge under 1 470, altså for høye. 89 100: √2 160 900 = 1 470,00. Svaret er <b>kr 89 100</b>.</p>`,
      check: `<p>Algebra: 1 470² = 2 160 900, så P<sub>maks</sub> = 2 250 000 − 2 160 900 = 89 100. ✓ Dekomponert: forventet formue 0,98 × 2 250 000 = 2 205 000 gir risikopremie 2 205 000 − 2 160 900 = 44 100. Rettferdig premie pluss risikopremie: 45 000 + 44 100 = 89 100. ✓ Avslaget stemmer også: √2 150 000 = 1 466,29 er under 1 470.</p>`,
      traps: [
        "Tommelfingerregelen 2 × forventet skade: 2 × 0,02 × 2 250 000 = 90 000. Den overser p²-leddet: √2 160 000 = 1 469,69 er under ankeret 1 470.",
        "Rettferdig premie: 0,02 × 2 250 000 = 45 000. En risikoavers person betaler mer. Prøven viser det: √2 205 000 = 1 484,92 ligger godt over 1 470.",
        "Glemte premien i branntilstanden og løste 0,98 × √(2 250 000 − P) + 0,02 × 1 500 = 1 470, som gir P ≈ 90 900. Med full dekning er formuen W − P også når huset brenner.",
        null,
      ],
    },
    {
      id: "nytte-10",
      title: "Eksamensnivå: halv dekning til samme premie (H2025 oppgave 13)",
      theory: `<p>H2025 oppgave 13 spurte om full dekning, om terskelsannsynligheten og til slutt om 50 % dekning til samme premie. Det siste spørsmålet er det vanskeligste. Premien står stille mens dekningen halveres, så påslaget per krone dekning dobles. Da kan svaret snu. Regn på nytt med tilstandstabellen og husk premien i branntilstanden. Konklusjonen fra full dekning kan ikke dras videre.</p>
<div class="formula"><div class="eq">Anker: E[U uten] = (1 − p) × √W</div><div class="eq">Halv dekning: E[U] = (1 − p) × √(W − P) + p × √(0,5W − P)</div><div class="where">Ved totaltap er formuen etter brann bare utbetalingen minus premien. Påslaget er premien delt på rettferdig premie: P/(p × W) for full dekning og P/(p × 0,5W) for halv.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Huset er verdt kr 4 000 000 og er hele formuen. Brannsannsynlighet 1 %, U = √W, premie kr 60 000.</p><p>Ankeret: 0,99 × 2 000 = 1 980,00. Full dekning: √3 940 000 = 1 984,94. Kjøp.</p><p>Terskel: p* = 1 − 1 984,94/2 000 = 0,75 %.</p><p>Halv dekning til samme premie: formuen er 3 940 000 eller 2 000 000 − 60 000 = 1 940 000. E[U] = 0,99 × 1 984,94 + 0,01 × 1 392,84 = 1 965,09 + 13,93 = <b>1 979,02</b>, under 1 980,00. Ikke kjøp. ✓</p></div>`,
      q: `<p>Huset ditt er verdt kr 14 440 000 og er din eneste formue. Med sannsynlighet 1 % brenner det og mister hele verdien. Nyttefunksjonen er U(W) = √W [eksempeltall]. Full dekning koster kr 205 000. Den ville du kjøpt. Selskapet slutter å tilby full dekning og tilbyr i stedet å dekke 50 % av tapet, kr 7 220 000, til samme premie. Bør du kjøpe den?</p>`,
      options: [
        "Ja: med halv dekning blir forventet nytte 3 762,07, høyere enn 3 762,00 uten forsikring",
        "Ja, fordi full dekning til samme premie gir høyere forventet nytte enn å stå uforsikret",
        "Nei: med halv dekning blir forventet nytte 3 761,69, lavere enn 3 762,00 uten forsikring",
        "Nei: med halv dekning blir forventet nytte 3 761,69, lavere enn 3 780,95 uten forsikring",
      ],
      answer: 2,
      solution: `<p><b>Ankeret.</b> 0,99 × √14 440 000 = 0,99 × 3 800 = 3 762,00.</p><p><b>Tilstandene.</b> Huset står (99 %): 14 440 000 − 205 000 = 14 235 000. Huset brenner (1 %): 7 220 000 − 205 000 = 7 015 000.</p><p><b>Forventet nytte.</b> 0,99 × √14 235 000 + 0,01 × √7 015 000 = 0,99 × 3 772,93 + 0,01 × 2 648,58 = 3 735,20 + 26,49 = 3 761,69.</p><p>3 761,69 er lavere enn 3 762,00, så <b>nei</b>.</p>`,
      check: `<p>I kroner: CE med halv dekning er 3 761,6864² = 14 150 285, mot 3 762² = 14 152 644 uten, altså rundt 2 359 kroner dårligere. ✓ Maksimalpremien for halv dekning er om lag 202 644, mens selskapet krever 205 000. Påslaget forklarer det: 205 000/144 400 = 1,42 ganger rettferdig premie ved full dekning, men 205 000/72 200 = 2,84 ganger ved halv.</p>`,
      traps: [
        "Glemte premien i branntilstanden og brukte √7 220 000 = 2 687,01: 3 735,20 + 26,87 = 3 762,07. Her snur den feilen konklusjonen.",
        "Konklusjonen fra full dekning dratt videre uten ny regning. Full dekning gir √14 235 000 = 3 772,93, men halv dekning til samme premie er et annet produkt.",
        null,
        "Riktig nytte med halv dekning, men sammenlignet med nytten av forventet formue: √(0,99 × 14 440 000) = 3 780,95. Ankeret er forventet nytte, 0,99 × 3 800 = 3 762,00.",
      ],
    },
  ],
});

/* sjanger 9 · internasjonal · Internasjonal skatt og exit-skatt */
window.EDU_DATA.sjangre.push({
  id: "internasjonal",
  num: 9,
  title: "Internasjonal skatt og exit-skatt",
  summary: "Fra dagersreglene og unntak mot kredit til exit-skatt og H2024 oppgave 10 med nye tall",
  chapters: [13, 6],
  exam: "4 av 9 sett · H2022 oppgave 4, H2024 oppgave 10, H2020 oppgave 2, H2021 oppgave 4",
  intro: `<p>Internasjonal skatt har kommet i fire av ni sett og exit-skatt i to. Kommer temaet, kommer det tungt: 17 % av poengene i H2022 og 19 % i H2024, men ingenting i H2025. Kursplanen regner det som usikkert i 2026. Regnestoffet er lite: hvem som er bosatt, unntak mot kredit med kredittaket og hva som skjer uten avtale. Resten er fakta om utflytting og exit-skatt, der de gale alternativene er laget av de samme feilene hver gang. Etter siste steg regner du H2024 oppgave 10 med nye tall og kjenner igjen hvert galt alternativ.</p>`,
  steps: [
    {
      id: "internasjonal-1",
      title: "Bosted: dagersreglene i skatteloven § 2-1",
      theory: `<p>Norge skattlegger etter bosted. Er du bosatt her, skal du skatte til Norge av all inntekt, uansett hvor i verden den er tjent. Bosted følger av hvor lenge du oppholder deg i landet, ikke av pass, fødested eller adresse. Etter skatteloven § 2-1 annet ledd er du bosatt når du er i Norge mer enn 183 dager i løpet av en tolvmånedersperiode, eller mer enn 270 dager i løpet av en trettiseksmånedersperiode. Periodene er glidende: enhver tolv- og trettiseksmånedersperiode teller, ikke bare kalenderåret. Bostedet begynner i det inntektsåret der en av grensene passeres.</p>
<div class="formula"><div class="eq">Bosatt når dager i Norge &gt; 183 i en tolvmånedersperiode</div><div class="eq">eller når dager i Norge &gt; 270 i en trettiseksmånedersperiode</div><div class="where">«Mer enn» betyr at dag 184 og dag 271 er de første som gir bosted. Reglene er [dagens regel]. Tre kalenderår på rad er nøyaktig én trettiseksmånedersperiode.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Jonas har aldri vært i Norge før 2025. Han er her 130 dager i 2025 og 120 dager i 2026. Ingen tolvmånedersperiode har mer enn 183 dager.</p><p>Over trettiseks måneder: 130 + 120 = 250, under 270. Jonas er ikke bosatt. Er han i Norge 25 dager til i 2027, blir summen for 2025–2027 130 + 120 + 25 = 275 &gt; 270. Da er han <b>bosatt fra og med 2027</b>.</p></div>`,
      q: `<p>Ana er portugisisk statsborger og har ingen bolig i Norge. Hun har aldri vært i Norge før 2024. Hun jobber i perioder for en norsk kunde og er i Norge 110 dager i 2024, 85 dager i 2025 og 90 dager i 2026. Ingen tolvmånedersperiode har mer enn 183 dager med opphold i Norge. Fra og med hvilket inntektsår er Ana bosatt i Norge etter skatteloven § 2-1?</p>`,
      options: ["2024", "2025", "2026", "Aldri"],
      answer: 2,
      solution: `<p>Tolvmånedersregelen slår aldri inn: oppgaven sier at ingen tolvmånedersperiode har mer enn 183 dager.</p><p>Trettiseksmånedersregelen: 2024–2026 er tre kalenderår, altså én trettiseksmånedersperiode. Før 2026 har hun 110 + 85 = 195 dager, under 270. Med 2026 blir det 195 + 90 = 285 &gt; 270.</p><p>Grensen passeres i 2026, så Ana er bosatt fra og med <b>2026</b>.</p>`,
      check: `<p>Regn baklengs: hun trenger 271 − 195 = 76 dager i 2026 for å komme over 270. Hun har 90, så grensen passeres i løpet av 2026 og ikke før. Med 75 dager i 2026 ville hun hatt 195 + 75 = 270 dager, som ikke er mer enn 270.</p>`,
      traps: [
        "Trodde bostedet gjelder fra første år i perioden. Det begynner først i inntektsåret der grensen passeres.",
        "Brukte 183-regelen på to kalenderår: 110 + 85 = 195 &gt; 183. Men de dagene er spredt over 24 måneder, ikke tolv.",
        null,
        "Sjekket bare 183-regelen. Trettiseksmånedersregelen gir 110 + 85 + 90 = 285 &gt; 270.",
      ],
    },
    {
      id: "internasjonal-2",
      title: "Globalskatteplikt og begrenset skatteplikt: derfor oppstår dobbeltbeskatning",
      theory: `<p>To prinsipper gjelder samtidig. Etter <b>bostedsprinsippet</b> skattlegger Norge den som er bosatt her, for hele inntekten, også det som er tjent i utlandet: det er globalskatteplikt. Etter <b>kildeprinsippet</b> skattlegger et land også inntekt som er tjent der av folk som bor andre steder, men bare den inntekten: det er begrenset skatteplikt. For lønn er kilden landet der arbeidet utføres. Jobber du en periode i utlandet, krever derfor både Norge og arbeidslandet skatt av samme lønn. Lemper ingen av dem, legges satsene sammen på den utenlandske inntekten.</p>
<div class="formula"><div class="eq">Skatt til Norge = t<sub>hjem</sub> × (Y<sub>Norge</sub> + Y<sub>ute</sub>)</div><div class="eq">Skatt til kildelandet = t<sub>kilde</sub> × Y<sub>ute</sub></div><div class="where">t<sub>hjem</sub> er satsen i bostedslandet (hjemstaten), t<sub>kilde</sub> satsen i kildelandet og Y<sub>ute</sub> inntekten som er tjent der. Uten lempning bærer Y<sub>ute</sub> satsen t<sub>hjem</sub> + t<sub>kilde</sub>.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Kari er bosatt i Norge og tjener kr 200 000 i Norge og kr 100 000 for arbeid i Land B. Norsk sats er 30 % og Land Bs sats 20 % [eksempeltall]. Ingen av landene lemper.</p><p>Norge: 300 000 × 30 % = 90 000. Land B: 100 000 × 20 % = 20 000. Samlet <b>kr 110 000</b>. De 100 000 fra Land B bærer 30 % + 20 % = 50 %.</p></div>`,
      q: `<p>Erik er bosatt i Norge. I fire måneder jobber han i Land A for en arbeidsgiver der og tjener kr 400 000. Resten av året jobber han i Norge og tjener kr 400 000. Land A skattlegger ham bare for lønnen for arbeid utført i Land A, med 20 % [eksempeltall]. Bruk en flat norsk sats på 35 % [eksempeltall]. Se bort fra skatteavtaler og alle regler som lemper dobbeltbeskatning. Hvor mye skatt betaler Erik i alt, i begge land?</p>`,
      options: ["kr 300 000", "kr 360 000", "kr 220 000", "kr 280 000"],
      answer: 1,
      solution: `<p>Norge, globalskatteplikt: hele inntekten, 400 000 + 400 000 = 800 000. Skatt: 800 000 × 35 % = 280 000.</p><p>Land A, begrenset skatteplikt: bare lønnen for arbeid der, 400 000 × 20 % = 80 000.</p><p>Samlet: 280 000 + 80 000 = <b>kr 360 000</b>.</p>`,
      check: `<p>Regn per krone. Den norske lønnen skattlegges bare i Norge: 400 000 × 35 % = 140 000. Lønnen fra Land A skattlegges i begge land: 400 000 × (35 % + 20 %) = 220 000. 140 000 + 220 000 = 360 000.</p>`,
      traps: [
        "Byttet om prinsippene: Norge bare på den norske lønnen (400 000 × 35 % = 140 000) og Land A på alt (800 000 × 20 % = 160 000). Sum 300 000.",
        null,
        "Lot Norge bare skattlegge det som er tjent i Norge: 400 000 × 35 % + 400 000 × 20 % = 140 000 + 80 000 = 220 000. Den som er bosatt i Norge, har globalskatteplikt.",
        "Regnet bare skatten til Norge: 800 000 × 35 % = 280 000. De 80 000 Land A tar av lønnen for arbeid der, er glemt.",
      ],
    },
    {
      id: "internasjonal-3",
      title: "Unntaksmetoden: bare kildestaten skattlegger",
      theory: `<p>En skatteavtale mellom to land fordeler retten til å skattlegge. Kildestaten får skattlegge et selskaps næringsinntekt bare når den er tjent gjennom et <b>fast driftssted</b> der, som et salgskontor med egne lokaler og ansatte (et rent lager er ikke nok); eksamen oppgir om det foreligger. Under <b>unntaksmetoden</b> med fullstendig unntak gir hjemstaten helt avkall på inntekten fra kildestaten, som skattlegger den med sin egen sats, enten den er høyere eller lavere enn den norske. Metoden fjerner dobbeltbeskatningen, men utjevner ikke satsene. Skattlegger ikke kildestaten inntekten, blir den ikke skattlagt noe sted: det kalles dobbelt-ikke-beskatning.</p>
<div class="formula"><div class="eq">Unntak: samlet skatt = t<sub>kilde</sub> × Y &nbsp;·&nbsp; skatt til Norge = 0</div><div class="where">Y er inntekten fra kildestaten. Unntaket er ubetinget: Norge spør ikke om kildestaten faktisk skattlegger, eller med hvilken sats.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Et norsk aksjeselskap tjener kr 1 000 000 gjennom en avdeling i Land A som er fast driftssted. Land A skattlegger inntekten med 18 % [eksempeltall]. Avtalen bygger på fullstendig unntak.</p><p>Land A: 1 000 000 × 18 % = 180 000. Norge: 0. Samlet <b>kr 180 000</b>, altså 18 %, under den norske satsen på 22 %. Hadde Land A hatt 0 %, ville samlet skatt vært 0: dobbelt-ikke-beskatning.</p></div>`,
      q: `<p>Et norsk aksjeselskap tjener kr 3 500 000 gjennom en avdeling i Land M, som skattlegger avdelingen med 26 % [eksempeltall]. Avdelingen er et fast driftssted. Norsk selskapsskatt er 22 % [dagens regel]. Skatteavtalen mellom Norge og Land M bygger på unntaksmetoden med fullstendig unntak. Hvor mye skatt betaler selskapet i alt, i begge land, på denne inntekten?</p>`,
      options: ["kr 910 000", "kr 1 680 000", "kr 0", "kr 770 000"],
      answer: 0,
      solution: `<p>Land M skattlegger etter sin egen sats: 3 500 000 × 26 % = 910 000.</p><p>Norge unntar inntekten helt: 0.</p><p>Samlet: <b>kr 910 000</b>. Selskapet betaler mer enn det ville gjort hjemme. Unntaket kompenserer ikke for det.</p>`,
      check: `<p>Under fullstendig unntak skal samlet sats alltid være kildestatens: 910 000/3 500 000 = 26 %. Norsk skatt på samme inntekt ville vært 3 500 000 × 22 % = 770 000, så selskapet betaler 910 000 − 770 000 = 140 000 mer enn hjemme.</p>`,
      traps: [
        null,
        "Ingen lempning, satsene lagt sammen: 910 000 + 3 500 000 × 22 % = 910 000 + 770 000 = 1 680 000. Avtalen fjerner den norske skatten.",
        "Trodde unntaksmetoden betyr at ingen av landene skattlegger. Det er Norge som unntar; Land M skattlegger fullt ut.",
        "Byttet om rollene: lot Norge skattlegge og kildestaten unnta, 3 500 000 × 22 % = 770 000.",
      ],
    },
    {
      id: "internasjonal-4",
      title: "Kreditmetoden og kredittaket",
      theory: `<p>Under <b>kreditmetoden</b> skattlegger begge land. Norge regner sin egen skatt på inntekten og trekker fra skatten som er betalt i kildestaten. Fradraget, kreditfradraget, er begrenset til den norske skatten på nettopp den inntekten. Restskatten til Norge kan derfor aldri bli negativ: Norge betaler ikke tilbake skatt du har betalt til et annet land. Er kildesatsen lavere enn den norske, ender du på norsk nivå; er den høyere, ender du på kildestatens nivå. Det overskytende blir da stående uten kredit, slik at kredit og unntak gir samme samlede skatt; metodene skiller seg bare når kildesatsen er lavere enn den norske.</p>
<div class="formula"><div class="eq">Kreditfradrag = min(t<sub>kilde</sub> × Y ; t<sub>hjem</sub> × Y)</div><div class="eq">Skatt til Norge = t<sub>hjem</sub> × Y − kreditfradrag</div><div class="eq">Samlet skatt = maks(t<sub>hjem</sub> ; t<sub>kilde</sub>) × Y</div><div class="where">Dette er vanlig (ordinær) kredit. Kreditten er aldri større enn den norske skatten på inntekten.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Inntekt kr 1 000 000 i kildestaten, norsk sats 22 % [dagens regel].</p><p>Kildesats 15 % [eksempeltall]: kildeskatt 150 000, norsk skatt 220 000, kreditfradrag min(150 000 ; 220 000) = 150 000, til Norge 220 000 − 150 000 = 70 000. Samlet <b>kr 220 000</b>.</p><p>Kildesats 30 % [eksempeltall]: kildeskatt 300 000, kreditfradrag min(300 000 ; 220 000) = 220 000, til Norge 0. Samlet <b>kr 300 000</b>. Av kildeskatten får 300 000 − 220 000 = 80 000 ingen kredit.</p></div>`,
      q: `<p>Et norsk aksjeselskap tjener kr 2 500 000 gjennom en avdeling i Land R, som skattlegger avdelingen med 31 % [eksempeltall]. Avdelingen er et fast driftssted. Norsk selskapsskatt er 22 % [dagens regel]. Skatteavtalen mellom Norge og Land R bygger på vanlig kreditmetode. Hvor mye skatt betaler selskapet i alt, i begge land, på denne inntekten?</p>`,
      options: ["kr 550 000", "kr 1 325 000", "kr 1 000 000", "kr 775 000"],
      answer: 3,
      solution: `<p>Land R: 2 500 000 × 31 % = 775 000.</p><p>Norsk skatt på samme inntekt: 2 500 000 × 22 % = 550 000. Kreditfradrag: min(775 000 ; 550 000) = 550 000. Skatt til Norge: 550 000 − 550 000 = 0.</p><p>Samlet: 775 000 + 0 = <b>kr 775 000</b>.</p>`,
      check: `<p>Samlet sats skal være den høyeste av de to: maks(22 % ; 31 %) = 31 %. 2 500 000 × 31 % = 775 000. Av kildeskatten står 775 000 − 550 000 = 225 000 uten kredit. Det er dobbeltbeskatningen som er igjen når kildesatsen er høyest. Under fullstendig unntak ville samlet skatt også vært 2 500 000 × 31 % = 775 000: når kildesatsen er høyest, gir de to metodene samme svar.</p>`,
      traps: [
        "Kreditten større enn norsk skatt: hele kildeskatten trukket fra, 550 000 − 775 000 = −225 000 til Norge, samlet 550 000. Norge betaler aldri ut penger for skatt betalt i et annet land.",
        "Ingen kredit, satsene lagt sammen: 775 000 + 550 000 = 1 325 000.",
        "Snudde fortegnet på restskatten: regnet 775 000 − 550 000 = 225 000 som skatt til Norge, samlet 775 000 + 225 000 = 1 000 000. Restskatten er 0 når kildeskatten er størst.",
        null,
      ],
    },
    {
      id: "internasjonal-5",
      title: "Ingen skatteavtale: Norge gir likevel kredit (skatteloven § 16-20)",
      theory: `<p>Uten skatteavtale er det ingenting som fordeler retten mellom landene, så begge skattlegger etter sin interne rett. Det blir likevel ikke automatisk dobbeltbeskatning. Skatteloven § 16-20 gir den som er bosatt eller hjemmehørende i Norge, fradrag i norsk skatt for skatt betalt i landet der inntekten har kilde, også uten avtale. Fradraget er begrenset til den norske skatten på utenlandsinntekten (§ 16-21), så norsk rett virker som en vanlig kreditmetode. Eksamenssettene har likevel regnet som om Norge ikke lemper uten avtale: H2020 og H2021 sa det i oppgaveteksten, mens H2024 forutsatte det. Står den forutsetningen i oppgaven, legger du satsene sammen; står den ikke der, gjelder § 16-20.</p>
<div class="formula"><div class="eq">Uten avtale, norsk rett: kreditfradrag = min(t<sub>kilde</sub> × Y ; t<sub>hjem</sub> × Y)</div><div class="eq">Samlet skatt = maks(t<sub>hjem</sub> ; t<sub>kilde</sub>) × Y</div><div class="where">Bare når oppgaven sier at Norge ikke gir lempning: samlet skatt = (t<sub>hjem</sub> + t<sub>kilde</sub>) × Y.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Et norsk aksjeselskap tjener kr 500 000 i et land uten skatteavtale med Norge. Landet skattlegger inntekten med 15 % [eksempeltall].</p><p>Kildeskatt 500 000 × 15 % = 75 000. Norsk skatt 500 000 × 22 % = 110 000. Kreditfradrag etter § 16-20: min(75 000 ; 110 000) = 75 000. Til Norge 110 000 − 75 000 = 35 000. Samlet <b>kr 110 000</b>, altså 22 %.</p><p>Sier oppgaven at Norge ikke lemper, blir det 75 000 + 110 000 = 185 000.</p></div>`,
      q: `<p>Et norsk aksjeselskap tjener kr 1 600 000 gjennom en avdeling i Land V. Norge har ingen skatteavtale med Land V, som skattlegger avdelingen med 16 % [eksempeltall]. Norsk selskapsskatt er 22 % [dagens regel]. Regn etter skatteloven §§ 16-20 og 16-21 slik de lyder. Hvor mye skatt betaler selskapet i alt, i begge land, på denne inntekten?</p>`,
      options: ["kr 352 000", "kr 256 000", "kr 96 000", "kr 608 000"],
      answer: 0,
      solution: `<p>Land V: 1 600 000 × 16 % = 256 000.</p><p>Norsk skatt på inntekten: 1 600 000 × 22 % = 352 000. Kreditfradrag etter § 16-20, med taket i § 16-21: min(256 000 ; 352 000) = 256 000. Til Norge: 352 000 − 256 000 = 96 000.</p><p>Samlet: 256 000 + 96 000 = <b>kr 352 000</b>.</p>`,
      check: `<p>Samlet sats skal være maks(22 % ; 16 %) = 22 %. 1 600 000 × 22 % = 352 000. Med eksamensforutsetningen ville samlet skatt vært (22 % + 16 %) × 1 600 000 = 608 000. Forskjellen, 608 000 − 352 000 = 256 000, er nøyaktig kreditfradraget § 16-20 gir.</p>`,
      traps: [
        null,
        "Trodde at bare kildestaten skattlegger når det ikke finnes avtale: 256 000. Uten avtale er det ingenting som stenger Norges rett.",
        "Svarte med skatten til Norge alene: 352 000 − 256 000 = 96 000. De 256 000 til Land V er glemt.",
        "Antok dobbeltbeskatning fordi det ikke finnes avtale: 256 000 + 352 000 = 608 000. Det er svaret bare når oppgaven sier at Norge ikke lemper.",
      ],
    },
    {
      id: "internasjonal-6",
      title: "Skatteparadiser: mekanismene og motmidlene",
      theory: `<p>Schjelderup kaller skatteparadisene <i>secrecy jurisdictions</i>: produktet er hemmelighold like mye som lav skatt. Fire mekanismer går igjen. <b>Internprising</b>: konsernselskaper handler med hverandre til priser konsernet selv setter, slik at overskuddet havner der skatten er lav; motmiddelet er armlengdeprinsippet, som er svakt for varemerker og andre immaterielle verdier uten markedspris. <b>Tynn kapitalisering</b>: datterselskapet i høyskattelandet finansieres med lån fra et konsernselskap i lavskattelandet, så rentene trekkes fra der skatten er høy; motmiddelet er rentebegrensningsregler, som kutter fradraget for konserninterne renter ut over en andel av resultatet. <b>Skallselskaper</b> og <b>stråmenn</b> skjuler hvem som eier; motmiddelet er automatisk informasjonsutveksling mellom skattemyndighetene (CRS), som USA ikke deltar i. OECDs BEPS-arbeid og den globale minimumsskatten på 15 % angriper overskuddsflyttingen, men ingen av dem rører hemmeligholdet.</p>
<div class="formula"><div class="eq">Flyttet overskudd = avviket fra armlengdeprisen × volum</div><div class="eq">Skattebesparelse = flyttet overskudd × (t<sub>høy</sub> − t<sub>lav</sub>)</div><div class="where">Gevinsten følger satsforskjellen. Minimumsskatten løfter t<sub>lav</sub> til 15 % for store konsern og krymper den.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Et norsk produksjonsselskap selger 100 000 enheter i året til et konsernselskap i Land L med 0 % skatt. Armlengdeprisen er kr 500, men konsernet setter internprisen til kr 420 [eksempeltall].</p><p>Flyttet overskudd: (500 − 420) × 100 000 = 8 000 000. Skattebesparelse: 8 000 000 × (22 % − 0 %) = <b>kr 1 760 000</b> i året. Med minimumsskatt på 15 %: 8 000 000 × (22 % − 15 %) = 560 000.</p></div>`,
      q: `<p>Konsernet Nordlys har et norsk driftsselskap og et selskap i Land L med 0 % selskapsskatt. Selskapet i Land L eier konsernets varemerke og har to ansatte. Hvert år betaler det norske selskapet 12 % av omsetningen i royalty til selskapet i Land L for å bruke varemerket. Royaltyen trekkes fra i Norge. Konsernet har selv satt satsen. Hvilket utsagn beskriver mekanismen og motmiddelet mot den?</p>`,
      options: [
        "Tynn kapitalisering. Motmiddelet er rentebegrensningsregler, men de kutter bare fradraget for konserninterne renter ut over en andel av resultatet",
        "Dobbelt-ikke-beskatning under unntaksmetoden. Motmiddelet er å bygge skatteavtalen på kreditmetoden",
        "Hemmelighold. Motmiddelet er automatisk utveksling av kontoopplysninger mellom skattemyndighetene (CRS), men den virker dårlig fordi USA ikke deltar",
        "Internprising. Motmiddelet er armlengdeprinsippet, men det virker dårlig fordi et varemerke sjelden har noen markedspris",
      ],
      answer: 3,
      solution: `<p>Royaltyen er en pris konsernet setter mellom sine egne selskaper, for en immateriell verdi. Er satsen høyere enn det uavhengige parter ville avtalt, flyttes overskudd fra Norge, med 22 %, til Land L, med 0 %. Det er <b>internprising</b>.</p><p>Motmiddelet er armlengdeprinsippet: royaltyen skal være det uavhengige parter ville betalt. For et varemerke finnes det sjelden noen slik pris å sammenligne med. Derfor virker regelen dårlig nettopp her.</p>`,
      check: `<p>Sjekk mot de andre mekanismene. Det er ingen lån og ingen renter, så det er ikke tynn kapitalisering. Eieren er kjent, så hemmelighold er ikke kjernen. Det er to ulike selskaper, ikke ett selskap med inntekt i to land, så ingen skatteavtale med unntak eller kredit er i spill. Hver krone royalty sparer konsernet 22 % − 0 % = 22 øre i skatt.</p>`,
      traps: [
        "Tynn kapitalisering flytter overskudd med renter på konserninterne lån. Her er det ingen lån; betalingen er en pris for å bruke varemerket.",
        "Unntak og kredit gjelder ett selskaps inntekt i to land. Royaltyen går mellom to selskaper i samme konsern. Ingen skatteavtale hindrer flyttingen.",
        "Hemmelighold handler om å skjule hvem som eier. Her er eieren kjent; mekanismen er prisen konsernet setter.",
        null,
      ],
    },
    {
      id: "internasjonal-7",
      title: "Utflytting: når slutter du å være bosatt?",
      theory: `<p>Det er lettere å bli bosatt enn å slutte å være det. Etter skatteloven § 2-1 tredje ledd opphører bostedet først for et inntektsår der du ikke har vært i Norge mer enn 61 dager og verken du eller dine nærstående (ektefelle, samboer, mindreårige barn) har disponert bolig her. Har du vært bosatt i Norge i minst ti år før utflyttingsåret, må dette gjelde for hvert av de tre inntektsårene etter utflyttingsåret. Bostedet opphører først etter det tredje. Flyttemelding til Skatteetaten endrer ingenting. Så lenge du er bosatt, har du globalskatteplikt.</p>
<div class="formula"><div class="eq">Bosatt minst ti år: første år som utflyttet = utflyttingsåret + 4</div><div class="eq">Bosatt under ti år: første inntektsår med høyst 61 dager i Norge og ingen bolig her</div><div class="where">Utflyttingsåret teller ikke som ett av de tre årene. Vilkårene om 61 dager og bolig må være oppfylt i hvert av dem [dagens regel].</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Lena har bodd i Norge i 30 år og flytter til Land F i 2025. Hun oppfyller vilkårene om dager og bolig fra 2026.</p><p>Utflyttingsåret 2025 teller ikke. De tre årene etter er 2026, 2027 og 2028. Hun er bosatt til og med 2028. Første år som utflyttet er <b>2029</b> = 2025 + 4.</p></div>`,
      q: `<p>Silje har bodd i Norge hele livet. I august 2027 flytter hun, mannen og barna til Land E. Familien selger boligen i Norge. Silje melder flytting til Skatteetaten. Fra 2028 er hun i Norge høyst 20 dager i året. Ingen i familien disponerer bolig her. Fra og med hvilket inntektsår er Silje ikke lenger bosatt i Norge etter norsk intern rett?</p>`,
      options: ["2031", "2028", "2030", "2027"],
      answer: 0,
      solution: `<p>Silje har vært bosatt i langt mer enn ti år, så tiårsregelen gjelder. Utflyttingsåret er 2027. Det teller ikke.</p><p>De tre inntektsårene etter er 2028, 2029 og 2030. Vilkårene er oppfylt i alle tre, så hun er bosatt til og med 2030.</p><p>Første år som utflyttet: <b>2031</b>.</p>`,
      check: `<p>Formelen: 2027 + 4 = 2031. Globalskatteplikten varer like lenge: lønn Silje tjener i Land E i 2028, 2029 og 2030, er etter norsk intern rett skattepliktig til Norge.</p>`,
      traps: [
        null,
        "Brukte regelen for dem som har bodd i Norge under ti år: ute fra første år med høyst 61 dager og ingen bolig, 2028.",
        "Talte utflyttingsåret som ett av de tre årene: 2027, 2028 og 2029, ute fra 2030. Tellingen starter året etter utflyttingen.",
        "Trodde flyttemeldingen avgjør. Bostedet følger loven, ikke meldingen.",
      ],
    },
    {
      id: "internasjonal-8",
      title: "Exit-skatt: skatt på latent gevinst ved utflytting",
      theory: `<p>Flytter du ut, mister Norge retten til å skattlegge gevinsten på aksjene dine når du selger. Derfor skattlegges den latente gevinsten som om aksjene var solgt dagen før utflyttingen, mens du ennå bare er norsk skattyter, så en skatteavtale med det nye landet beskytter ikke (skatteloven § 10-70). Grunnlaget er gevinsten, markedsverdi minus inngangsverdi, opptjent mens du var bosatt i Norge, aldri hele verdien. Gevinst opp til et bunnfradrag på kr 3 000 000 er fritatt; resten skattlegges med eierskatten på aksjegevinst. Skatten fastsettes endelig: faller aksjene senere, settes den ikke ned.</p>
<div class="formula"><div class="eq">Exit-skatt = (markedsverdi − inngangsverdi − 3 000 000) × t<sub>e</sub></div><div class="eq">t<sub>e</sub> = 1,72 × 22 % = 37,84 %</div><div class="where">Bunnfradraget og satsene er [dagens regel] for utflyttinger fra 20. mars 2024. Oppjusteringen med 1,72 gjøres én gang: på grunnlaget eller på satsen, ikke begge.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Aksjene er verdt kr 10 000 000 dagen før utflytting. Inngangsverdien er kr 2 000 000.</p><p>Latent gevinst: 10 000 000 − 2 000 000 = 8 000 000. Etter bunnfradraget: 8 000 000 − 3 000 000 = 5 000 000. Exit-skatt: 5 000 000 × 37,84 % = <b>kr 1 892 000</b>.</p></div>`,
      q: `<p>Mats flytter fra Norge til Land B i 2026. Dagen før utflyttingen er aksjene hans verdt kr 15 500 000. Inngangsverdien er kr 3 700 000. All verdistigning skjedde mens han bodde i Norge. Bunnfradraget er kr 3 000 000, oppjusteringsfaktoren 1,72 og skatten på alminnelig inntekt 22 % [dagens regel]. Hvor stor blir exit-skatten?</p>`,
      options: ["kr 4 730 000", "kr 3 329 920", "kr 5 727 462", "kr 4 465 120"],
      answer: 1,
      solution: `<p>Latent gevinst: 15 500 000 − 3 700 000 = 11 800 000.</p><p>Etter bunnfradraget: 11 800 000 − 3 000 000 = 8 800 000.</p><p>Exit-skatt: 8 800 000 × 37,84 % = <b>kr 3 329 920</b>.</p>`,
      check: `<p>Oppjuster grunnlaget i stedet for satsen: 8 800 000 × 1,72 = 15 136 000; 15 136 000 × 22 % = 3 329 920. Baklengs: 3 329 920/37,84 % = 8 800 000. Legg til bunnfradraget og inngangsverdien: 8 800 000 + 3 000 000 + 3 700 000 = 15 500 000, som er markedsverdien.</p>`,
      traps: [
        "Skatt på hele verdien i stedet for gevinsten: (15 500 000 − 3 000 000) × 37,84 % = 12 500 000 × 37,84 % = 4 730 000. Inngangsverdien skal trekkes fra.",
        null,
        "Oppjustert to ganger: 8 800 000 × 1,72 × 37,84 % = 5 727 462,40.",
        "Glemte bunnfradraget: 11 800 000 × 37,84 % = 4 465 120.",
      ],
    },
    {
      id: "internasjonal-9",
      title: "Exit-skatt ved gave til noen i utlandet",
      theory: `<p>Exit-skatten kan ikke omgås ved å gi bort aksjene i stedet for å flytte selv. Gir du aksjer til noen i Norge, overtar mottakeren inngangsverdien din, så skatten kommer når han selger. Bor mottakeren i utlandet, typisk et barn, kan Norge ikke skattlegge det salget; derfor skattlegges den latente gevinsten hos deg som om du hadde solgt (skatteloven § 10-70). Grensen er en terskel på kr 100 000 i netto gevinst i året, ikke et fradrag: går gevinsten over, skattlegges hele. Bunnfradraget på kr 3 000 000 gjelder bare når du selv flytter; en skatteavtale med mottakerens land hjelper heller ikke. Den gamle femårsregelen, der skatten falt bort om aksjene ikke ble solgt innen fem år, ble opphevet i 2022.</p>
<div class="formula"><div class="eq">Gave til person i utlandet: skatt = latent gevinst × t<sub>e</sub> når netto gevinst i året &gt; 100 000</div><div class="eq">Netto gevinst i året høyst 100 000: ingen exit-skatt</div><div class="where">t<sub>e</sub> = 37,84 % [dagens regel]. Når du selv flytter, kan skatten betales straks, i tolv rentefrie årlige rater eller samlet etter tolv år med renter. Flytter du tilbake innen tolv år med aksjene i behold, faller den bort.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Ola gir datteren i Land S aksjer verdt kr 700 000 med inngangsverdi kr 300 000 [eksempeltall].</p><p>Gevinst: 700 000 − 300 000 = 400 000, over terskelen på 100 000. Hele gevinsten skattlegges, uten bunnfradrag: 400 000 × 37,84 % = <b>kr 151 360</b>. Hadde gevinsten vært kr 80 000, ville gaven ikke utløst exit-skatt.</p></div>`,
      q: `<p>Per er bosatt i Norge og blir boende her. I 2026 gir han aksjer verdt kr 1 400 000 til sønnen, som bor i Land C. Pers inngangsverdi er kr 500 000. Han gir ikke bort andre aksjer det året. Norge har skatteavtale med Land C. Eierskatten er 37,84 % [dagens regel]. Hvilket utsagn er riktig etter reglene som gjelder i 2026?</p>`,
      options: [
        "Ingen skatt nå. Sønnen overtar Pers inngangsverdi og betaler skatt på gevinsten først når han selger aksjene",
        "Exit-skatt nå på hele gevinsten, uten bunnfradrag: 900 000 × 37,84 % = kr 340 560",
        "Exit-skatt på 900 000 × 37,84 % = kr 340 560 beregnes, men den faller bort om sønnen ikke selger aksjene innen fem år",
        "Ingen skatt, fordi skatteavtalen med Land C gir sønnens bostedsland retten til å skattlegge gevinsten",
      ],
      answer: 1,
      solution: `<p>Gaven sender aksjene ut av norsk beskatningsområde: sønnen bor i utlandet, så Norge kan ikke skattlegge ham når han selger. Derfor utløser gaven exit-skatt hos Per.</p><p>Latent gevinst: 1 400 000 − 500 000 = 900 000, over terskelen på 100 000. Hele gevinsten skattlegges, uten bunnfradrag: 900 000 × 37,84 % = <b>kr 340 560</b>.</p>`,
      check: `<p>Terskelen er ikke et fradrag: (900 000 − 100 000) × 37,84 % = 302 720 ville vært feil. Kontroll av satsen: 900 000 × 1,72 = 1 548 000; 1 548 000 × 22 % = 340 560.</p>`,
      traps: [
        "Kontinuitet gjelder når mottakeren bor i Norge. Bor han i utlandet, kan Norge ikke skattlegge salget hans. Det er nettopp derfor gaven utløser exit-skatt.",
        null,
        "Femårsregelen ble opphevet i 2022. Etter dagens regler faller exit-skatten ikke bort ved å vente.",
        "Skatten utløses ved gaven, mens Per er norsk skattyter. Skatteavtalen fordeler retten til framtidige gevinster, men stopper ikke exit-skatten.",
      ],
    },
    {
      id: "internasjonal-10",
      title: "Selskapet flytter ut: stiftelse og § 10-71",
      theory: `<p>Et aksjeselskap stiftet etter norsk selskapsrett er hjemmehørende i Norge, også når styret og ledelsen flytter ut (skatteloven § 2-2). Det slutter bare å være hjemmehørende her om en skatteavtale gjør det hjemmehørende i en annen stat. Uten avtale kan et norskstiftet selskap altså ikke flytte ut skattemessig. Gjør en avtale det hjemmehørende i en stat utenfor EØS, skattlegges selskapet som om eiendelene var solgt dagen før (skatteloven § 10-71). Kursets fasiter i H2022 og H2024 sier at oppgjøret skjer på begge nivåer, som ved likvidasjon, mens lovteksten bare nevner selskapets eiendeler.</p>
<div class="formula"><div class="eq">Skatt ved utflytting = (markedsverdi − skattemessig verdi av eiendelene) × τ<sub>c</sub></div><div class="where">τ<sub>c</sub> er selskapsskatten, 22 % [dagens regel]. Etter loven gjelder regelen ved flytting ut av EØS, eller til et lavskatteland i EØS der selskapet ikke er reelt etablert. Svar med kursets fasit når eksamen spør etter den, men vit at loven er smalere.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Berg AS er stiftet i Norge og flytter ledelsen til et land utenfor EØS. Eiendelene har skattemessig verdi kr 10 000 000 og markedsverdi kr 25 000 000.</p><p>Uten skatteavtale: selskapet er fortsatt hjemmehørende i Norge, så ingenting utløses. Gjør en avtale det hjemmehørende i det andre landet: gevinst 25 000 000 − 10 000 000 = 15 000 000, skatt 15 000 000 × 22 % = <b>kr 3 300 000</b> på selskapets hånd.</p></div>`,
      q: `<p>Polar Data AS er stiftet i Norge. I 2026 flytter styret og hele ledelsen til Land U, som ligger utenfor EØS. Norge har skatteavtale med Land U. Etter avtalen er selskapet nå hjemmehørende i Land U. Eiendelene har en skattemessig verdi på kr 40 000 000 og en markedsverdi på kr 100 000 000. Selskapsskatten er 22 % [dagens regel]. Hvilket utsagn er riktig?</p>`,
      options: [
        "Selskapet skattlegges som om eiendelene var solgt dagen før utflyttingen: 60 000 000 × 22 % = kr 13 200 000",
        "Ingen norsk skatt utløses, fordi utflyttingsskatt bare gjelder personer som flytter",
        "Ingen norsk skatt utløses, fordi selskapet er stiftet i Norge og derfor fortsatt er hjemmehørende her",
        "Bare aksjonærene skattlegges, som om de hadde solgt aksjene sine dagen før utflyttingen",
      ],
      answer: 0,
      solution: `<p>Stiftelse i Norge holder selskapet hjemmehørende her bare så lenge ingen skatteavtale sier noe annet. Her gjør avtalen det hjemmehørende i Land U, utenfor EØS. Da utløser § 10-71 skatt som om eiendelene var solgt dagen før.</p><p>Gevinst: 100 000 000 − 40 000 000 = 60 000 000. Skatt: 60 000 000 × 22 % = <b>kr 13 200 000</b> på selskapets hånd.</p><p>Kursets fasiter legger til skatt på aksjonærnivå, som ved likvidasjon. Lovteksten nevner bare selskapet. Utsagnet er riktig under begge lesingene.</p>`,
      check: `<p>Sjekk stiftelsesregelen motsatt vei: uten skatteavtale med Land U ville Polar Data vært hjemmehørende i Norge fordi det er stiftet her. Da ville ingen skatt blitt utløst. Det var svaret i H2022 oppgave 4, spørsmål 7. Avtalen åpner døren ut, mens § 10-71 tar oppgjøret på vei ut.</p>`,
      traps: [
        null,
        "§ 10-71 gjelder nettopp selskaper. Exit-skatten for personer står i § 10-70.",
        "Stiftelsen holder selskapet i Norge bare når ingen avtale sier noe annet. Her gjør avtalen det hjemmehørende i Land U.",
        "Feil under begge lesingene. Lovteksten skattlegger selskapet for eiendelene. Kursets fasit skattlegger begge nivåer, ikke bare aksjonærene.",
      ],
    },
    {
      id: "internasjonal-11",
      title: "Eksamensnivå: bosatt i to land, avtalens bostedsregel (H2022 oppgave 4)",
      theory: `<p>Hvert land bruker sine egne bostedsregler, så du kan være bosatt i flere land samtidig. Da krever hvert av dem skatt av hele inntekten. Uten avtale og uten lempning legges alle satsene sammen: bosatt i tre land gir trippelbeskatning (H2022 oppgave 4, spørsmål 5 og 6). En skatteavtale etter OECDs mønsteravtale artikkel 4 peker ut ett bostedsland. Kriteriene prøves i fast rekkefølge, der du bare går videre når det forrige ikke peker ut ett land: fast bolig, sentrum for livsinteressene (familie, hjem, arbeid, økonomi), vanlig opphold og statsborgerskap. Bosted etter intern rett og flyttemelding avgjør ikke.</p>
<div class="formula"><div class="eq">Uten avtale, bosatt i n land: samlet skatt = (t<sub>1</sub> + t<sub>2</sub> + … + t<sub>n</sub>) × Y</div><div class="eq">Avtalens bostedsregel: fast bolig → sentrum for livsinteressene → vanlig opphold → statsborgerskap</div><div class="where">Har du fast bolig i begge land, avgjør som regel sentrum for livsinteressene. Dagtelling kommer først på tredje trinn.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Tor tjener kr 1 000 000 og er bosatt i Norge, Land K og Land D etter hvert lands interne rett. Satsene er 40 %, 20 % og 10 % [eksempeltall]. Ingen avtale gjelder. Ingen av landene lemper.</p><p>400 000 + 200 000 + 100 000 = <b>kr 700 000</b>, altså 70 % av inntekten. Med en avtale mellom Norge og Land K ville artikkel 4 peke ut ett av de to som bostedsland.</p></div>`,
      q: `<p>Henrik har bodd i Norge hele livet. Sommeren 2026 flytter han, kona og barna til Land K, der han har fått fast jobb og familien kjøper hus. Barna begynner på skole der. Leiligheten i Oslo beholder han ubebodd og bruker den når han er på besøk, til sammen 70 dager i året. Etter norsk intern rett er han fortsatt bosatt i Norge. Etter Land Ks interne rett er han bosatt i Land K. Skatteavtalen mellom Norge og Land K har en bostedsregel som OECDs mønsteravtale artikkel 4. Hvilket utsagn er riktig, både konklusjonen og begrunnelsen?</p>`,
      options: [
        "Norge, fordi han fortsatt disponerer leiligheten i Oslo og derfor er bosatt her etter norsk intern rett",
        "Norge, fordi han er norsk statsborger. Statsborgerskapet avgjør når han er bosatt i begge land",
        "Land K, fordi han oppholder seg langt flere dager i Land K enn i Norge i løpet av året",
        "Land K, fordi han har fast bolig i begge land og sentrum for livsinteressene i Land K",
      ],
      answer: 3,
      solution: `<p>Trinn 1, fast bolig: han har hus i Land K og en leilighet han disponerer i Oslo. Fast bolig i begge land, så trinnet avgjør ikke.</p><p>Trinn 2, sentrum for livsinteressene: kona, barna, skolen, jobben og huset er i Land K. Det avgjør. Etter avtalen er Henrik <b>bosatt i Land K</b>.</p><p>At han er bosatt i Norge etter intern rett, er nettopp konflikten artikkel 4 løser. Vanlig opphold og statsborgerskap brukes bare når de første trinnene ikke avgjør.</p>`,
      check: `<p>Gå trinnene i rekkefølge og stopp der ett land peker seg ut. Hopper du rett til trinn 3 (dager), får du riktig land med feil begrunnelse. Det er fellen H2022 oppgave 4 satte. Konsekvensen: som bosatt i Land K etter avtalen kan Henrik ikke skattlegges i Norge for lønnen han tjener for arbeid i Land K.</p>`,
      traps: [
        "Bosted etter intern rett er utgangspunktet for konflikten, ikke løsningen. Artikkel 4 avgjør mellom de to landene.",
        "Statsborgerskap er fjerde trinn og brukes bare når de tre første ikke avgjør.",
        "Riktig land, feil begrunnelse. Vanlig opphold er tredje trinn; her avgjør sentrum for livsinteressene allerede på andre trinn.",
        null,
      ],
    },
    {
      id: "internasjonal-12",
      title: "Eksamensnivå: fire markeder, tre regimer (H2024 oppgave 10)",
      theory: `<p>H2024 oppgave 10 ga ni delspørsmål om ett selskap med salg i fire land; H2021 oppgave 4 spurte etter skatten som skal betales til Norge. Tegn kartet først: ett land per rad, med metode, skatt lokalt og skatt til Norge. Norge har globalskatteplikt, så hver krone starter med 22 %. Unntak gir 0 til Norge og kredit gir norsk skatt minus kreditfradraget. Uten avtale tar Norge full skatt når oppgaven sier at Norge ikke lemper. Summer kolonnene og kontroller mot ren norsk skatt.</p>
<div class="formula"><div class="eq">Unntak: til Norge = 0</div><div class="eq">Kredit: til Norge = 22 % × Y<sub>i</sub> − min(t<sub>i</sub> × Y<sub>i</sub> ; 22 % × Y<sub>i</sub>)</div><div class="eq">Ingen avtale, Norge lemper ikke: til Norge = 22 % × Y<sub>i</sub></div><div class="where">Y<sub>i</sub> er inntekten fra land i og t<sub>i</sub> satsen der. Inntekt fra Norge gir 22 % × Y<sub>Norge</sub>. Sier ikke oppgaven at Norge lar være å lempe, gjelder § 16-20, som virker som kredit.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Et norsk aksjeselskap tjener kr 10 000 000 i hvert av fire markeder: Norge, Land A (fullstendig unntak), Land B (vanlig kredit) og Land C (ingen avtale, Norge lemper ikke). Alle tre utenlandske land har 15 % [eksempeltall].</p><p>Til Norge: 2 200 000 + 0 + (2 200 000 − 1 500 000) + 2 200 000 = <b>kr 5 100 000</b>. Lokalt: 3 × 1 500 000 = 4 500 000. Samlet 9 600 000, altså 24 %. Samme sats ute gir tre ulike resultater: 15 % under unntak, 22 % under kredit og 37 % uten avtale.</p></div>`,
      q: `<p>Nordkapp Analytics AS er hjemmehørende i Norge og har i 2026 et overskudd på kr 60 000 000 uten kostnader: kr 15 000 000 fra Norge, kr 20 000 000 fra Land A, kr 10 000 000 fra Land B og kr 15 000 000 fra Land C. Avdelingene i alle tre land er faste driftssteder. Avtalen med Land A bygger på fullstendig unntak og avtalen med Land B på vanlig kredit. Med Land C har Norge ingen avtale. Selskapsskatten er 22 % i Norge [dagens regel], 12 % i Land A, 30 % i Land B og 10 % i Land C [eksempeltall]. Anta, slik eksamensoppgaven gjorde, at Norge ikke gir fradrag for skatt betalt i Land C (se bort fra skatteloven § 16-20). Hvor mye skatt skal selskapet betale til Norge for 2026?</p>`,
      options: ["kr 5 800 000", "kr 8 600 000", "kr 6 600 000", "kr 3 300 000"],
      answer: 2,
      solution: `<table class="data"><tr><th>Marked</th><th>Inntekt</th><th>Metode</th><th>Skatt lokalt</th><th>Skatt til Norge</th></tr>
<tr><td>Norge</td><td class="n">15 000 000</td><td>intern rett</td><td class="n">0</td><td class="n">3 300 000</td></tr>
<tr><td>Land A</td><td class="n">20 000 000</td><td>fullstendig unntak</td><td class="n">2 400 000</td><td class="n">0</td></tr>
<tr><td>Land B</td><td class="n">10 000 000</td><td>vanlig kredit</td><td class="n">3 000 000</td><td class="n">0</td></tr>
<tr><td>Land C</td><td class="n">15 000 000</td><td>ingen avtale</td><td class="n">1 500 000</td><td class="n">3 300 000</td></tr>
<tr><td>Sum</td><td class="n">60 000 000</td><td></td><td class="n">6 900 000</td><td class="n">6 600 000</td></tr></table>
<p>Land B: norsk skatt 10 000 000 × 22 % = 2 200 000, kreditfradrag min(3 000 000 ; 2 200 000) = 2 200 000, til Norge 0. Land C: Norge tar full skatt, 15 000 000 × 22 % = 3 300 000.</p><p>Til Norge: 3 300 000 + 0 + 0 + 3 300 000 = <b>kr 6 600 000</b>.</p>`,
      check: `<p>Kontroller mot ren norsk skatt: 60 000 000 × 22 % = 13 200 000. Samlet skatt i alle land er 6 900 000 + 6 600 000 = 13 500 000, altså 300 000 mer. Avviket skal kunne spores land for land: Land A ligger 10 prosentpoeng under norsk nivå (−2 000 000), Land B 8 over (+800 000) og Land C 10 over (+1 500 000). −2 000 000 + 800 000 + 1 500 000 = 300 000.</p>`,
      traps: [
        "Kreditten større enn norsk skatt i Land B: 2 200 000 − 3 000 000 = −800 000, så Norge får 3 300 000 − 800 000 + 3 300 000 = 5 800 000. Restskatten kan ikke bli negativ.",
        "Byttet om unntak og kredit: kredit i Land A gir (22 % − 12 %) × 20 000 000 = 2 000 000 til Norge, unntak i Land B gir 0. Sum 3 300 000 + 2 000 000 + 0 + 3 300 000 = 8 600 000.",
        null,
        "Trodde at bare Land C skattlegger når det ikke finnes avtale, så Norge får bare skatten på den norske inntekten: 15 000 000 × 22 % = 3 300 000.",
      ],
    },
  ],
});

/* sjanger 10 · lan · Lån: annuitet, effektiv rente og utlånsforskriften */
window.EDU_DATA.sjangre.push({
  id: "lan",
  num: 10,
  title: "Lån: annuitet, effektiv rente og utlånsforskriften",
  summary: "Fra annuitetsformelen til effektiv rente med gebyrer, lånetaket og avdragsfrihet",
  chapters: [16],
  exam: "6 av 9 sett · 9 % av H2022 · H2022 oppgave 6, H2024 oppgave 14",
  intro: `<p>Lån har kommet i seks av ni sett. Terminbeløp, effektiv rente og kredittkostnad var tre spørsmål på rad i H2022 oppgave 6. Lånetaket med femgangeren og stresstesten var hele oppgaver i H2020 og H2021. H2024 oppgave 14 spurte hva avdragsfrihet egentlig er. Alt hviler på én formel, annuitetsformelen. De gale alternativene er faste: renten regnet av hele lånet hele året, nominell rente brukt som effektiv, gebyrene glemt, rentefradraget glemt eller trukket fra to ganger og gjeldsgraden regnet av netto inntekt. Etter siste steg regner du disse oppgavene og kjenner igjen hvert galt tall.</p>`,
  steps: [
    {
      id: "lan-1",
      title: "Annuitetslån: terminbeløpet fra annuitetsformelen",
      theory: `<p>Et lån betales tilbake i <b>terminer</b>. Hver termin har to deler: <b>renter</b> på det du fortsatt skylder (<b>restgjelden</b>) og <b>avdrag</b>, som er det som gjør gjelden mindre. I et <b>annuitetslån</b> er terminbeløpet A det samme hver gang: renten tar en stadig mindre del og avdraget en stadig større. A er betalingen som gjør nåverdien av alle terminene, diskontert med lånerenten, nøyaktig lik lånet. Da treffer restgjelden null i siste termin. I et <b>serielån</b> er det avdraget L/n som er likt hver gang, så terminen faller i takt med renten.</p>
<div class="formula"><div class="eq">A = L × r/(1 − (1 + r)<sup>−n</sup>)</div><div class="eq">Annuitetsfaktoren: AF(r, n) = (1 − (1 + r)<sup>−n</sup>)/r, så A = L/AF(r, n)</div><div class="where">L er lånet, r renten per termin (årsrenten når det er én termin i året) og n antall terminer. AF er nåverdien av 1 krone per termin i n terminer. A ligger alltid over L/n, fordi terminen også skal dekke renter. Den ligger under serielånets første termin L/n + r × L.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Annuitetslån kr 300 000 til 5 % over 3 år, én termin i slutten av hvert år.</p><p>Telleren: 300 000 × 5 % = 15 000. 1,05<sup>−3</sup> = 0,863838, så nevneren er 1 − 0,863838 = 0,136162. A = 15 000/0,136162 = 110 162,57, altså <b>kr 110 163</b> i året.</p></div>`,
      q: `<p>Jonas tar opp et annuitetslån på kr 900 000 til 6 % rente over 10 år, med én termin i slutten av hvert år. Hvor stort er terminbeløpet (hele kroner)?</p>`,
      options: ["kr 144 000", "kr 161 176", "kr 90 000", "kr 122 281"],
      answer: 3,
      solution: `<p>Telleren: 900 000 × 6 % = 54 000.</p><p>1,06<sup>−10</sup> = 0,558395, så nevneren er 1 − 0,558395 = 0,441605.</p><p>A = 54 000/0,441605 = 122 281,16, altså <b>kr 122 281</b>.</p>`,
      check: `<p>AF(6 %, 10) = 0,441605/0,06 = 7,360087. 122 281,16 × 7,360087 = 900 000. ✓ Nåverdien av terminene er lånet. Svaret ligger også mellom grensene: over 900 000/10 = 90 000 og under 90 000 + 54 000 = 144 000.</p>`,
      traps: [
        "Serielånets første termin, ikke annuiteten: 900 000/10 + 900 000 × 6 % = 90 000 + 54 000 = 144 000.",
        "Lånet forrentet med renters rente i ti år og delt på ti: 900 000 × 1,06<sup>10</sup>/10 = 161 176. Da overser du at hver termin betaler ned gjelden.",
        "Bare avdragene, rentene glemt: 900 000/10 = 90 000.",
        null,
      ],
    },
    {
      id: "lan-2",
      title: "Første termin: rente, avdrag og rentefradraget",
      theory: `<p>Renten i en termin regnes av restgjelden ved inngangen til terminen. Resten av terminbeløpet er avdrag. Bare avdraget gjør gjelden mindre. Renter gir fradrag i alminnelig inntekt, som skattlegges med 22 % <b>[dagens regel]</b>, så hver rentekrone koster 78 øre etter skatt. <b>Avdrag gir ikke fradrag</b>: et avdrag er ingen kostnad, bare nedbetaling av det du skylder. Fradraget regnes derfor av rentedelen av terminen, aldri av hele terminbeløpet. Det trekkes fra bare én gang.</p>
<div class="formula"><div class="eq">Rente<sub>1</sub> = r × L &nbsp;·&nbsp; avdrag<sub>1</sub> = A − rente<sub>1</sub> &nbsp;·&nbsp; restgjeld etter termin 1 = L − avdrag<sub>1</sub></div><div class="eq">Termin etter skatt = A − t × renter = avdrag + renter × (1 − t)</div><div class="where">t = 22 %. Fradraget treffer bare alminnelig inntekt, så det er 22 % uansett hvor høy marginalskatten på lønn er. Kontroll: restgjelden er alltid nåverdien av terminene som gjenstår, etter første termin A × AF(r, n − 1).</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Lånet fra forrige eksempel: kr 300 000 til 5 % over 3 år, A = 110 162,57.</p><p>Rente: 300 000 × 5 % = 15 000. Avdrag: 110 162,57 − 15 000 = 95 162,57. Restgjeld: 300 000 − 95 162,57 = kr 204 837. Kontroll: 110 162,57 × AF(5 %, 2) = 110 162,57 × 1,859410 = 204 837.</p><p>Rentefradraget: 15 000 × 22 % = 3 300. Terminen koster 110 162,57 − 3 300 = <b>kr 106 863</b> etter skatt.</p></div>`,
      q: `<p>Elin tar opp et annuitetslån på kr 2 800 000 til 5,5 % rente over 25 år, med én termin i slutten av hvert år. Terminbeløpet er kr 208 738. Renter gir fradrag i alminnelig inntekt, som skattlegges med 22 % <b>[dagens regel]</b>. Hvor mye belaster den første terminen økonomien hennes når skattebesparelsen fra rentefradraget er trukket fra (hele kroner)?</p>`,
      options: ["kr 162 816", "kr 208 738", "kr 174 858", "kr 140 978"],
      answer: 2,
      solution: `<p>Renter i første termin: 2 800 000 × 5,5 % = 154 000.</p><p>Skattebesparelse: 154 000 × 22 % = 33 880.</p><p>Netto: 208 738 − 33 880 = <b>kr 174 858</b>.</p>`,
      check: `<p>Regn delene for seg. Avdraget 208 738 − 154 000 = 54 738 gir ikke fradrag. Renten koster 154 000 × 0,78 = 120 120 etter skatt. 54 738 + 120 120 = 174 858. ✓</p>`,
      traps: [
        "Fradraget regnet av hele terminbeløpet: 208 738 × 0,78 = 162 816. Avdraget på 54 738 gir ikke fradrag.",
        "Rentefradraget glemt: hele terminen, 208 738.",
        null,
        "Fradraget trukket fra to ganger, først i renten etter skatt og så en gang til: 208 738 − 2 × 33 880 = 140 978.",
      ],
    },
    {
      id: "lan-3",
      title: "Effektiv rente: renters rente og gebyrer",
      theory: `<p>Den <b>nominelle</b> renten er årsrenten banken oppgir. Med k terminer i året betaler du r/k per termin, så renten kapitaliseres k ganger. Den <b>effektive</b> renten er det lånet faktisk koster per år. Den er høyere enn den nominelle så snart det er mer enn én termin i året eller det finnes gebyrer. Med gebyrer er den effektive renten <b>internrenten</b> i det du faktisk mottar og betaler: etableringsgebyret trekkes fra utbetalingen og termingebyret legges til hver termin. Internrenten kan ikke løses direkte, så på flervalg prøver du alternativene.</p>
<div class="formula"><div class="eq">Uten gebyrer: r<sub>eff</sub> = (1 + r/k)<sup>k</sup> − 1</div><div class="eq">Med gebyrer: L − etableringsgebyr = (A + termingebyr) × AF(r<sub>eff</sub>, n)</div><div class="where">r er nominell årsrente og k antall terminer per år: 12 for månedlige, 4 for kvartalsvise, 1 for årlige. Med k = 1 og ingen gebyrer er effektiv og nominell rente like. A er terminbeløpet regnet med nominell rente. Gebyrene er kroner på bestemte tidspunkter, ikke en sats på hele lånet.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Nominell rente 6 %, månedlige terminer: 0,5 % per måned. r<sub>eff</sub> = 1,005<sup>12</sup> − 1 = <b>6,17 %</b>. En krone lånt i et år koster 6,17 øre, ikke 6.</p><p>Med gebyrer: annuitetslån kr 200 000 til 6 % over 2 år, årlige terminer, etableringsgebyr kr 1 500 og termingebyr kr 400 <b>[eksempeltall]</b>. A = 109 087,38. Du mottar 198 500 og betaler 109 487,38 to ganger. Prøv 6,80 %: 198 500/AF(6,80 %, 2) = 198 500/1,813043 = 109 484, som treffer på kronene nær. Effektiv rente: <b>6,80 %</b>.</p></div>`,
      q: `<p>Et billån har nominell rente 7,6 % og kvartalsvise terminer, altså fire i året. Det er ingen gebyrer. Hva er den effektive årsrenten (to desimaler)?</p>`,
      options: ["7,87 %", "7,82 %", "7,60 %", "7,39 %"],
      answer: 1,
      solution: `<p>Rente per kvartal: 7,6 %/4 = 1,9 %.</p><p>Effektiv rente: 1,019<sup>4</sup> − 1 = 1,078194 − 1 = <b>7,82 %</b>.</p>`,
      check: `<p>Følg kr 1 000 000 gjennom året: 1 019 000 etter første kvartal, 1 038 361 etter andre, 1 058 090 etter tredje og 1 078 194 etter fjerde. Det er 7,82 % mer. ✓ Svaret ligger over 7,6 %, som det må med mer enn én termin i året.</p>`,
      traps: [
        "Regnet med månedlige terminer, som på et boliglån, selv om lånet har fire terminer i året: (1 + 7,6 %/12)<sup>12</sup> − 1 = 7,87 %.",
        null,
        "Nominell rente brukt som effektiv: 7,60 %.",
        "Regnet motsatt vei, som om 7,6 % var den effektive renten og den nominelle skulle finnes: 4 × (1,076<sup>1/4</sup> − 1) = 7,39 %.",
      ],
    },
    {
      id: "lan-4",
      title: "Renten første år: av saldoen som faller, ikke av hele lånet",
      theory: `<p>Boliglån har <b>månedlige terminer</b>. Da er renten per termin m = r/12 og antall terminer n = år × 12. Annuitetsformelen brukes med m og n. Renten regnes hver måned av restgjelden, som faller med hvert avdrag. Renten det første året er derfor <i>mindre</i> enn r × L: bare den aller første terminen forrenter hele lånet. Enklest finner du årets renter som alt du har betalt minus det gjelden har falt.</p>
<div class="formula"><div class="eq">Renter første år = 12 × A − (L − restgjeld etter 12 terminer)</div><div class="eq">Restgjeld etter 12 terminer = A × AF(m, n − 12)</div><div class="where">L minus restgjelden er summen av årets avdrag. r × L er renten på et lån som aldri nedbetales. For et annuitetslån er den alltid for høy.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Annuitetslån kr 2 000 000 til 6 % over 20 år, månedlige terminer <b>[eksempeltall]</b>. m = 6 %/12 = 0,5 % og n = 240. 1,005<sup>−240</sup> = 0,302096, så A = 10 000/0,697904 = 14 328,62.</p><p>Restgjeld etter 12 terminer: 14 328,62 × AF(0,5 %, 228) = 1 946 604. Renter første år: 12 × 14 328,62 − (2 000 000 − 1 946 604) = 171 943,44 − 53 396 = <b>kr 118 547</b>, ikke 6 % × 2 000 000 = 120 000.</p></div>`,
      q: `<p>Martin har et annuitetslån på kr 3 300 000 til 5,4 % nominell rente over 30 år, med månedlige terminer. Terminbeløpet er kr 18 530,52. Etter 12 terminer er restgjelden kr 3 254 724. Hvor mye har han betalt i renter det første året (hele kroner)?</p>`,
      options: ["kr 177 090", "kr 182 677", "kr 222 366", "kr 178 200"],
      answer: 0,
      solution: `<p>Betalt i året: 12 × 18 530,52 = 222 366,24.</p><p>Avdrag i året: 3 300 000 − 3 254 724 = 45 276.</p><p>Renter: 222 366,24 − 45 276 = 177 090,24, altså <b>kr 177 090</b>.</p>`,
      check: `<p>Første måned er renten 3 300 000 × 0,45 % = 14 850. Deretter faller den litt for hver måned. Årets renter tilsvarer 5,4 % av gjennomsnittlig restgjeld ved inngangen til hver måned: 177 090,24/0,054 = 3 279 449. Det ligger mellom 3 300 000 og 3 254 724, slik det må. ✓ Summerer du de tolv månedsrentene én for én, får du det samme.</p>`,
      traps: [
        null,
        "Den effektive renten, 1,0045<sup>12</sup> − 1 = 5,54 %, ganget med hele lånet: 3 300 000 × (1,0045<sup>12</sup> − 1) = 182 677. Det er kostnaden på et lån som aldri nedbetales, med renters rente. Her betales renten hver måned og saldoen faller.",
        "Hele terminbeløpet regnet som renter: 12 × 18 530,52 = 222 366. Avdragene på 45 276 er med i det tallet.",
        "Renten regnet av hele lånet hele året: 3 300 000 × 5,4 % = 178 200. Saldoen faller hver måned, så det er for mye.",
      ],
    },
    {
      id: "lan-5",
      title: "Fast eller flytende rente: en forsikring, ikke et veddemål",
      theory: `<p>Med <b>flytende rente</b> følger terminbeløpet renten i markedet. Med <b>fast rente</b> låser du renten i en periode, for eksempel fem år. Banken setter fastrenten ut fra det markedet venter om renten framover, så du kan ikke systematisk tjene på å binde når ekspertene venter renteoppgang: forventningen er allerede i prisen. Fastrenten er som regel litt høyere fordi den inneholder en <b>premie</b>. Det du kjøper, er visshet om terminbeløpet. Den er mest verdt for den som tåler en renteøkning dårligst: høy belåning, liten buffer, usikker inntekt. Innfrir du et fastrentelån før tiden, kan det koste en overkurs.</p>
<div class="formula"><div class="eq">Premie i år 1 = (fastrente − flytende rente) × L</div><div class="where">Med én termin i året forrenter første termin hele lånet, så premien det første året er rentedifferansen ganget med L. Om den er verdt prisen, avhenger av hvor sårbar du er, ikke av en renteprognose.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Lån kr 2 000 000, flytende rente 5,0 % og fastrente 5,5 % i tre år <b>[eksempeltall]</b>. Det første året koster fastrenten 0,5 % × 2 000 000 = <b>kr 10 000</b> mer i renter, 7 800 etter rentefradraget.</p><p>Hadde den flytende renten vært 7,0 % allerede det første året, ville fastrenten spart 1,5 % × 2 000 000 = 30 000. Faller renten, har fastrenten kostet mer. Premien kjøper visshet, ikke en lavere rente.</p></div>`,
      q: `<p>Silje har nettopp kjøpt sin første bolig. Hun har lånt kr 3 200 000 med én termin i året, så mye som banken ville gi. Hun har nesten ingen buffer. Banken tilbyr flytende rente på 4,9 % eller fem års fastrente på 5,3 %. Hvilket utsagn er riktig?</p>`,
      options: [
        "Hun bør binde renten bare hvis ekspertene venter at renten skal stige, for da blir fastrenten den billigste av de to",
        "Fastrenten er en forsikring som koster kr 12 800 mer i renter det første året, men som kan være verdt prisen for henne",
        "Fastrenten fjerner all risiko i lånet, også kostnaden ved å innfri det eller flytte det til en annen bank før de fem årene er gått",
        "Flytende rente er alltid billigst over tid, så de kr 12 800 fastrenten koster ekstra det første året, er bortkastet",
      ],
      answer: 1,
      solution: `<p>Fastrenten koster (5,3 % − 4,9 %) × 3 200 000 = 12 800 mer i renter det første året. Det er premien for å vite hva terminbeløpet blir de neste fem årene.</p><p>Silje har maksimalt lån og ingen buffer, så en renteøkning rammer henne hardt. Forsikringen kan derfor være verdt prisen for henne. <b>Forsikringsutsagnet er riktig.</b></p>`,
      check: `<p>Se hva forsikringen dekker: stiger den flytende renten med 2 prosentpoeng mens restgjelden er nær hele lånet, betaler hun om lag 2 % × 3 200 000 = 64 000 mer i renter i året. Mot det står en premie på 12 800 det første året. ✓ For en låntaker uten buffer er det en reell avveiing, ikke et veddemål.</p>`,
      traps: [
        "Prognosen er allerede i prisen. Banken setter fastrenten ut fra det markedet venter, så å binde etter ekspertenes råd gir ingen systematisk gevinst.",
        null,
        "Fastrenten fjerner renterisikoen i perioden, ikke all risiko. Innfrir hun lånet før tiden etter at rentene har falt, kan det koste en overkurs.",
        "«Alltid» er galt. Flytende er billigst i snitt fordi fastrenten har en premie, men stiger renten nok, blir fastrenten billigst. Premien kjøper visshet.",
      ],
    },
    {
      id: "lan-6",
      title: "Utlånsforskriften: belåningsgrad, gjeldsgrad, avdrag og stresstest",
      theory: `<p>Utlånsforskriften begrenser hvor mye banken kan låne ut. Kravene gjelder samtidig og det strengeste binder. Slik manualen oppgir dem for 2026 <b>[dagens regel]</b>:</p><ul><li><b>Belåningsgrad</b> = boliglån/boligens verdi, høyst 90 %. Du må altså ha minst 10 % egenkapital (15 % til og med 2024). Studielån og andre lån uten sikkerhet i boligen regnes ikke med her. Rammelån (boligkreditt) kan være høyst 60 %.</li><li><b>Gjeldsgrad</b> = samlet gjeld/<b>brutto</b> årsinntekt, høyst 5. Her teller all gjeld: boliglån, studielån og billån.</li><li><b>Avdrag</b>: er belåningsgraden over 60 %, må lånet nedbetales, med minst 2,5 % av lånet i året (eller det et annuitetslån over 30 år gir).</li><li><b>Stresstest</b>: <b>betjeningsevnen</b>, det du har igjen til renter og avdrag på boliglånet når skatt, forbruk og annen gjeld er betalt, må tåle renten pluss 3 prosentpoeng, minst 7 %, med lånet regnet som et annuitetslån over 30 år.</li></ul><p>Banken kan fravike kravene for en liten del av utlånene, <b>fleksibilitetskvoten</b> (10 %, 8 % i Oslo).</p>
<div class="formula"><div class="eq">Belåningsgrad = boliglån/boligverdi ≤ 90 % &nbsp;·&nbsp; gjeldsgrad = samlet gjeld/brutto årsinntekt ≤ 5</div><div class="eq">Største lån etter stresstesten = betjeningsevne × AF(r<sub>stress</sub>, 30), der r<sub>stress</sub> = maks(r + 3 prosentpoeng; 7 %)</div><div class="where">De to brøkene har ulik teller og ulik nevner. Deler du gjelden på inntekten etter skatt, ser lånet ut til å bryte kravet når det ikke gjør det. Eksamenssettene H2020 (oppgave 4c) og H2021 (oppgave 5c) la på 5 prosentpoeng i stresstesten, som var kravet den gangen. Bruk alltid påslaget oppgaven oppgir.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Bolig kr 4 000 000, egenkapital kr 600 000, studielån kr 250 000 og brutto årsinntekt kr 750 000 <b>[eksempeltall]</b>. Boliglånet er 3 400 000.</p><p>Belåningsgrad: 3 400 000/4 000 000 = 85 %, under 90 %. Gjeldsgrad: (3 400 000 + 250 000)/750 000 = 4,87, under 5. Belåningsgraden er over 60 %, så lånet må ha avdrag, med 2,5 %-regelen 2,5 % × 3 400 000 = 85 000 i året.</p><p>Stresstest: tar skatt, forbruk og studielånet 55 % av bruttoinntekten, er betjeningsevnen 750 000 × 45 % = 337 500. Lånerenten 5 % stresses til 8 %, over gulvet på 7 %. 337 500 × AF(8 %, 30) = 337 500 × 11,257783 = <b>kr 3 799 502</b>, over lånet på 3 400 000. Hun består.</p></div>`,
      q: `<p>Hanna kjøper bolig for kr 4 800 000. Hun har kr 600 000 i egenkapital og låner resten i banken. Hun har også kr 160 000 i studielån. Brutto årsinntekt er kr 880 000. Hun betaler 30 % skatt, så inntekten etter skatt er kr 616 000. Banken har regnet ut at hun består stresstesten. Utlånsforskriften <b>[dagens regel]</b>: boliglånet kan være høyst 90 % av boligens verdi. Samlet gjeld kan være høyst 5 ganger brutto årsinntekt. Ved belåningsgrad over 60 % må lånet ha avdrag. Hvilket utsagn er riktig?</p>`,
      options: [
        "Lånet bryter kravet til belåningsgrad, fordi lånene hennes utgjør 90,8 % av boligens verdi",
        "Lånet holder kravene til belåningsgrad og gjeldsgrad og trenger ikke avdrag, fordi belåningsgraden er under 90 %",
        "Lånet bryter gjeldsgradskravet, fordi samlet gjeld er 7,08 ganger inntekten hennes etter skatt",
        "Lånet holder kravene til belåningsgrad og gjeldsgrad, men må ha avdrag fordi belåningsgraden er over 60 %",
      ],
      answer: 3,
      solution: `<p>Boliglånet: 4 800 000 − 600 000 = 4 200 000. Belåningsgrad: 4 200 000/4 800 000 = 87,5 %, innenfor 90 %.</p><p>Samlet gjeld: 4 200 000 + 160 000 = 4 360 000. Gjeldsgrad: 4 360 000/880 000 = 4,95, innenfor 5.</p><p>Belåningsgraden er over 60 %, så lånet må ha avdrag. <b>Utsagnet om at lånet holder begge kravene, men må ha avdrag, er riktig.</b></p>`,
      check: `<p>Regn grensene i kroner: 90 % × 4 800 000 = 4 320 000 i boliglån og 5 × 880 000 = 4 400 000 i samlet gjeld. Hun ligger 120 000 under den første og 40 000 under den andre. ✓ Med 2,5 %-regelen blir avdraget 2,5 % × 4 200 000 = 105 000 det første året.</p>`,
      traps: [
        "Studielånet regnet med i belåningsgraden: (4 200 000 + 160 000)/4 800 000 = 90,8 %. Belåningsgraden gjelder bare lånet med sikkerhet i boligen: 87,5 %.",
        "De to grensene blandet: 90 % er taket for belåningsgraden, mens avdragskravet slår inn allerede over 60 %.",
        "Gjeldsgraden regnet av inntekten etter skatt: 4 360 000/616 000 = 7,08. Kravet gjelder brutto inntekt: 4 360 000/880 000 = 4,95.",
        null,
      ],
    },
    {
      id: "lan-7",
      title: "Avdragsfrihet: flere kroner, samme nåverdi (H2024 oppgave 14)",
      theory: `<p>Med <b>avdragsfrihet</b> betaler du bare renter i en periode. Gjelden står stille mens renten løper på hele lånet. Skal lånet likevel være nedbetalt til samme tid, må de gjenværende terminene bli større. Du betaler derfor <b>flere kroner</b> i alt. Men enhver betalingsplan for samme lån har samme nåverdi ved lånerenten, nemlig lånebeløpet: de ekstra kronene er renter på penger du beholder lenger. Avdragsfrihet er en likviditetsordning, ikke en rabatt og ikke en ekstra kostnad i nåverdi. Den kan være lur ved et <i>midlertidig</i> likviditetsproblem, når alternativet er dyrere kreditt.</p>
<div class="formula"><div class="eq">Termin etter d avdragsfrie år: A′ = L × r/(1 − (1 + r)<sup>−(n − d)</sup>)</div><div class="eq">Samlet betaling: d × r × L + (n − d) × A′ &gt; n × A</div><div class="eq">Nåverdi ved lånerenten: r × L × AF(r, d) + A′ × AF(r, n − d)/(1 + r)<sup>d</sup> = L</div><div class="where">d er antall avdragsfrie år. De avdragsfrie terminene er bare renten r × L. Avdraget utsettes; det forsvinner ikke. Staten betaler det heller ikke.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Annuitetslån kr 2 000 000 til 5 % over 20 år, årlige terminer: A = 160 485,17 <b>[eksempeltall]</b>. Med ett års avdragsfrihet er termin 1 bare renten, 100 000. De 19 neste blir 2 000 000 × 5 %/(1 − 1,05<sup>−19</sup>) = 165 490,02.</p><p>Samlet betaling: 100 000 + 19 × 165 490,02 = 3 244 310 mot 20 × 160 485,17 = 3 209 703, altså <b>kr 34 607</b> mer. Nåverdien ved 5 % er 2 000 000 i begge planene.</p></div>`,
      q: `<p>Ola har et annuitetslån på kr 2 400 000 til 4,5 % over 20 år, med én termin i slutten av hvert år. Han blir permittert og får avdragsfrihet de to første årene. Lånet skal fortsatt være nedbetalt etter 20 år, så de 18 siste terminene må dekke hele lånet. Se bort fra skatt. Hvilket utsagn er riktig?</p>`,
      options: [
        "Avdragsfriheten virker som et rentefritt lån fra banken: han slipper kr 153 005 i renter de to årene",
        "Samlet betaling blir den samme i kroner, siden avdragene bare flyttes til senere, så avdragsfrihet er noe bare en irrasjonell låntaker ber om",
        "Han betaler kr 78 579 mer i alt, men nåverdien ved lånerenten er uendret, så det kan være lurt ved et midlertidig likviditetsproblem",
        "Han betaler kr 78 579 mer i alt, som også er merkostnaden i nåverdi, så avdragsfrihet lønner seg aldri",
      ],
      answer: 2,
      solution: `<p>Uten avdragsfrihet: A = 2 400 000 × 4,5 %/(1 − 1,045<sup>−20</sup>) = 184 502,75. Samlet betaling: 20 × 184 502,75 = 3 690 055.</p><p>Med avdragsfrihet: to terminer på bare renten, 2 400 000 × 4,5 % = 108 000. Deretter A′ = 2 400 000 × 4,5 %/(1 − 1,045<sup>−18</sup>) = 197 368,55 i 18 år. Samlet betaling: 2 × 108 000 + 18 × 197 368,55 = 216 000 + 3 552 634 = 3 768 634.</p><p>Han betaler 3 768 634 − 3 690 055 = 78 579 kroner mer, men begge planene er lån av 2 400 000 til 4,5 %, så nåverdien ved lånerenten er 2 400 000 i begge. <b>Utsagnet om flere kroner og samme nåverdi er riktig.</b></p>`,
      check: `<p>Regn nåverdien av planen med avdragsfrihet. Rentene de to første årene: 108 000 × AF(4,5 %, 2) = 108 000 × 1,872668 = 202 248. De 18 terminene er verdt 197 368,55 × AF(4,5 %, 18) = 197 368,55 × 12,159992 = 2 400 000 om to år, altså 2 400 000/1,045<sup>2</sup> = 2 197 752 i dag. 202 248 + 2 197 752 = 2 400 000. ✓ De 78 579 kronene er renter på avdragene han utsetter.</p>`,
      traps: [
        "Det han slipper, er avdrag, ikke renter: 2 × (184 502,75 − 108 000) = 153 005. Han betaler full rente, 108 000 i året, også i de avdragsfrie årene.",
        "Renten løper på hele lånet så lenge avdragene står ubetalt, så han betaler 78 579 kroner mer. Ordningen kan likevel være fornuftig ved et midlertidig problem.",
        null,
        "Kronebeløpet stemmer, men nåverdien gjør det ikke: ved lånerenten er begge planene verdt nøyaktig 2 400 000. De ekstra kronene er renter på penger han beholder lenger.",
      ],
    },
    {
      id: "lan-8",
      title: "Eksamensnivå: terminbeløp og kredittkostnad (H2022 oppgave 6)",
      theory: `<p>H2022 oppgave 6 ga et billån med nominell rente, løpetid og to gebyrer. Den spurte etter terminbeløpet, den effektive renten og <b>kredittkostnaden</b>: alt du betaler for kreditten, summert uten diskontering. Det er renter pluss gebyrer. Avdragene er ikke kostnad, de er tilbakebetaling av lånet. Alternativene var ekte mellomregninger: summen av alt du betaler, rentene alene og termingebyrene alene. Det farligste er summen, der lånet ikke er trukket fra.</p>
<div class="formula"><div class="eq">Kredittkostnad = n × A + n × termingebyr + etableringsgebyr − L</div><div class="eq">= rentesum + gebyrer, der rentesum = n × A − L</div><div class="where">Regn med uavrundet A og rund av til slutt. Effektiv rente svarer på samme spørsmål med tidsverdi; kredittkostnaden er kronebeløpet uten.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Annuitetslån kr 100 000 til 6 % over 2 år, årlige terminer, etableringsgebyr kr 1 000 og termingebyr kr 500 <b>[eksempeltall]</b>. A = 54 543,69.</p><p>Sum betalt: 2 × 54 543,69 + 2 × 500 + 1 000 = 111 087. Kredittkostnad: 111 087 − 100 000 = <b>kr 11 087</b>. Kontroll: renter 2 × 54 543,69 − 100 000 = 9 087, pluss gebyrer 2 000, gir 11 087.</p></div>`,
      q: `<p>En bilforhandler tilbyr Kari et annuitetslån på kr 350 000 til nominell rente 6,49 % over 4 år, med én termin i slutten av hvert år. Etableringsgebyret er kr 3 990 og betales ved opptak. Termingebyret er kr 850 og betales sammen med hver termin. Kredittkostnaden er alle renter og gebyrer summert uten diskontering. Hva er kredittkostnaden (hele kroner)?</p>`,
      options: ["kr 98 250", "kr 415 961", "kr 58 571", "kr 65 961"],
      answer: 3,
      solution: `<p>Terminbeløp: telleren er 350 000 × 6,49 % = 22 715. 1,0649<sup>−4</sup> = 0,777615, så nevneren er 0,222385. A = 22 715/0,222385 = 102 142,73.</p><p>Sum terminbeløp: 4 × 102 142,73 = 408 570,93. Gebyrer: 4 × 850 + 3 990 = 7 390. Sum betalt: 415 960,93.</p><p>Kredittkostnad: 415 960,93 − 350 000 = 65 960,93, altså <b>kr 65 961</b>.</p>`,
      check: `<p>Nedbetalingsplanen gir rentene 22 715 + 17 560 + 12 071 + 6 225 = 58 571. Restgjelden treffer null etter fjerde termin. Renter pluss gebyrer: 58 571 + 7 390 = 65 961. ✓</p>`,
      traps: [
        "Renten regnet av hele lånet hvert år: 4 × 6,49 % × 350 000 + 7 390 = 90 860 + 7 390 = 98 250.",
        "Lånet ikke trukket fra: summen av alt som betales, 408 571 + 7 390 = 415 961.",
        "Rentene alene, gebyrene glemt: 4 × 102 142,73 − 350 000 = 58 571.",
        null,
      ],
    },
    {
      id: "lan-9",
      title: "Eksamensnivå: lånetaket med tre krav (H2020 oppgave 4, H2021 oppgave 5)",
      theory: `<p>H2020 oppgave 4 og H2021 oppgave 5 bygde lånetaket i trinn: betjeningsevnen, femgangeren minus studielånet, lånet stresstesten tillater og til slutt hvilket krav som binder. På flervalg blir det ett tall: det største lånet banken kan gi. Regn hvert krav i kroner og velg det <b>laveste</b>. De gale alternativene er de andre kravene og de vanlige feilene i hvert av dem.</p>
<div class="formula"><div class="eq">Lånetak = min(5 × brutto inntekt − annen gjeld; 90 % × boligverdi; betjeningsevne × AF(r<sub>stress</sub>, 30))</div><div class="where">Studielån og annen gjeld trekkes fra i femgangeren, men ikke i belåningsgraden. Eksamenssettene brukte 5 prosentpoeng i stresstesten; dagens regel er 3 prosentpoeng og minst 7 %.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Brutto inntekt kr 700 000, studielån kr 400 000, bolig kr 4 000 000, betjeningsevne kr 280 000 og lånerente 4,5 % <b>[eksempeltall]</b>.</p><p>Femgangeren: 3 500 000 − 400 000 = 3 100 000. Belåningsgraden: 90 % × 4 000 000 = 3 600 000. Stresstest ved 7,5 %: 280 000 × 11,810386 = 3 306 908. Lånetaket er <b>kr 3 100 000</b>; her binder gjeldsgradskravet.</p></div>`,
      q: `<p>Nina har brutto inntekt kr 820 000 og betaler 28 % skatt. Hun har kr 200 000 i studielån og vil kjøpe en bolig til kr 4 500 000. Skatt, forbruk og studielånet tar 60 % av bruttoinntekten. Resten kan gå til renter og avdrag på boliglånet. Lånerenten er 4,6 %. Utlånsforskriften <b>[dagens regel]</b>: samlet gjeld kan være høyst 5 ganger brutto årsinntekt. Boliglånet kan være høyst 90 % av boligens verdi. Hun må tåle renten pluss 3 prosentpoeng, minst 7 %, med lånet regnet som et annuitetslån over 30 år med én termin i året. Banken bruker ikke fleksibilitetskvoten. Hva er det største boliglånet banken kan gi (hele kroner)?</p>`,
      options: ["kr 2 752 000", "kr 3 836 396", "kr 3 900 000", "kr 3 198 250"],
      answer: 1,
      solution: `<p>Femgangeren: 5 × 820 000 − 200 000 = 3 900 000.</p><p>Belåningsgraden: 90 % × 4 500 000 = 4 050 000.</p><p>Stresstesten: betjeningsevne 820 000 × 40 % = 328 000. Stresset rente 4,6 % + 3 = 7,6 %, over gulvet. AF(7,6 %, 30) = 11,696329, så største lån er 328 000 × 11,696329 = 3 836 396.</p><p>Det laveste av de tre er stresstesten: <b>kr 3 836 396</b>.</p>`,
      check: `<p>Baklengs: 3 836 396/11,696329 = 328 000, nøyaktig betjeningsevnen. ✓ Samlet gjeld blir 3 836 396 + 200 000 = 4 036 396, gjeldsgrad 4 036 396/820 000 = 4,92, under 5. Belåningsgraden blir 3 836 396/4 500 000 = 85,3 %, under 90 % og over 60 %, så lånet må ha avdrag.</p>`,
      traps: [
        "Gjeldsgraden regnet av inntekten etter skatt: 5 × 820 000 × 72 % − 200 000 = 2 952 000 − 200 000 = 2 752 000.",
        null,
        "Stresstesten glemt, femgangeren tatt som lånetak: 5 × 820 000 − 200 000 = 3 900 000. Det er lavere enn belåningsgraden, men høyere enn stresstesten.",
        "Gammelt påslag på 5 prosentpoeng fra eksamenssettene: 328 000 × AF(9,6 %, 30) = 328 000 × 9,750762 = 3 198 250.",
      ],
    },
    {
      id: "lan-10",
      title: "Eksamensnivå: effektiv rente fra bunnen av (H2022 oppgave 6)",
      theory: `<p>Den vanskeligste varianten i sjangeren er H2022 oppgave 6 spørsmål 2: du får lånet, den nominelle renten, løpetiden og to gebyrer. Spørsmålet er den effektive renten. Det er tre trinn. Regn terminbeløpet med annuitetsformelen. Sett opp kontantstrømmen: det du mottar etter etableringsgebyret i år 0 og terminbeløpet pluss termingebyret hvert år etter. Prøv alternativene til ett av dem treffer. Alternativene i H2022 lå med 0,45 til 0,5 prosentpoengs mellomrom, så øyemål hjelper ikke. Et overslag luker likevel ut de groveste: gebyrene per år delt på <i>gjennomsnittlig</i> restgjeld er omtrent påslaget på den nominelle renten.</p>
<div class="formula"><div class="eq">A = L × r/(1 − (1 + r)<sup>−n</sup>)</div><div class="eq">L − etableringsgebyr = (A + termingebyr) × AF(r<sub>eff</sub>, n)</div><div class="eq">Overslag: r<sub>eff</sub> ≈ r + (etableringsgebyr/n + termingebyr)/gjennomsnittlig restgjeld</div><div class="where">Gjennomsnittlig restgjeld er snittet av restgjelden ved inngangen til hvert år. Den er mye lavere enn L. Deler du gebyrene på hele lånet, blir påslaget for lite.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Annuitetslån kr 120 000 til 6,4 % over 3 år, årlige terminer, etableringsgebyr kr 2 000 og termingebyr kr 800 <b>[eksempeltall]</b>. A = 45 225,81. Du mottar 118 000 og betaler 46 025,81 tre ganger.</p><p>Overslag: restgjelden ved inngangen til årene er 120 000, 82 454 og 42 505, i snitt 81 653. Gebyrene per år: 2 000/3 + 800 = 1 467, som er 1,80 % av snittet. Effektiv rente er altså rundt 6,4 % + 1,8 % = 8,2 %. Prøv 8,29 %: 118 000/AF(8,29 %, 3) = 118 000/2,563671 = 46 028, som treffer 46 026 på kronene nær. Effektiv rente: <b>8,29 %</b>.</p></div>`,
      q: `<p>En bank tilbyr Per et annuitetslån på kr 260 000 til nominell rente 5,49 % over 5 år, med én termin i slutten av hvert år. Etableringsgebyret er kr 4 950 og trekkes fra ved utbetalingen. Termingebyret er kr 950 og betales sammen med hver termin. Effektiv rente er internrenten i lånets kontantstrøm. Hva er den effektive renten (to desimaler)?</p>`,
      options: ["6,77 %", "6,24 %", "5,49 %", "6,06 %"],
      answer: 0,
      solution: `<p>Terminbeløp: telleren er 260 000 × 5,49 % = 14 274. 1,0549<sup>−5</sup> = 0,765497, så nevneren er 0,234503. A = 14 274/0,234503 = 60 869,18.</p><p>Kontantstrøm: mottatt 260 000 − 4 950 = 255 050 i år 0. Betalt 60 869,18 + 950 = 61 819,18 i hvert av de fem årene.</p><p>Prøv 6,77 %: AF(6,77 %, 5) = 4,125572 gir 255 050/4,125572 = 61 822, som treffer 61 819 på kronene nær. Den effektive renten er <b>6,77 %</b>.</p>`,
      check: `<p>Overslaget: restgjelden ved inngangen til årene er 260 000, 213 405, 164 252, 112 400 og 57 701, i snitt 161 552. Gebyrene per år er 4 950/5 + 950 = 1 940, altså 1,20 % av snittet. 5,49 % + 1,20 % = 6,69 %, nær 6,77 %. ✓ Prøv også et galt alternativ: ved 6,24 % blir 255 050/AF(6,24 %, 5) = 255 050/4,185003 = 60 944, mindre enn de 61 819 du betaler, så 6,24 % er for lavt.</p>`,
      traps: [
        null,
        "Gebyrene per år delt på hele lånet og lagt på renten: 5,49 % + (4 950/5 + 950)/260 000 = 5,49 % + 0,75 % = 6,24 %. Restgjelden er i snitt mye lavere enn lånet, så påslaget blir for lite.",
        "Nominell rente brukt som effektiv, gebyrene glemt: 5,49 %.",
        "Etableringsgebyret glemt, bare termingebyret med: internrenten i +260 000 og −61 819,18 i fem år er 6,06 %.",
      ],
    },
  ],
});

/* sjanger 11 · bedrift · Bedriftens tilpasning, nøytralitet og implisitt skatt */
window.EDU_DATA.sjangre.push({
  id: "bedrift",
  num: 11,
  title: "Bedriftens tilpasning, nøytralitet og implisitt skatt",
  summary: "Fra kapitalbruken uten skatt til gjeld mot egenkapital, implisitt skatt og formelgjenkjenningen på eksamen",
  chapters: [9, 10, 12],
  exam: "2 av 9 sett hver · 10 % av H2025 · H2025 oppgave 7, H2024 oppgave 9",
  intro: `<p>Bedriftens tilpasning og den implisitte skatten har kommet i to av ni eksamenssett hver, men tungt når de kommer. H2025 oppgave 7 ga tre poeng, 10 % av settet, for kravet med delvis rentefradrag, kravene for gjeld og egenkapital og rangeringen E* &lt; G*. H2024 oppgave 9 ga to poeng for likevekten mellom en skattefri og en skattlagt obligasjon og formelen for den implisitte skatten. Stigen starter med en bedrift uten skatt og bygger nøytralitet, delvis fradrag, gjeld mot egenkapital, skattearbitrasje og implisitt skatt ett steg om gangen, med ett steg hver for Domar–Musgrave og progressivitet. Etter siste steg finner du riktig formel blant fire nesten like brøker med grensetesten og regner likevekten mellom et skattefritt og et skattlagt papir.</p>`,
  steps: [
    {
      id: "bedrift-1",
      title: "F′(K) = r: grenseavkastningen og den nøytrale skatten",
      theory: `<p>En bedrift låner kapital K til renten r og tjener F(K) på den. Grenseavkastningen F′(K) er det den siste kapitalkronen gir. Den faller når K øker, fordi de beste prosjektene tas først (F″(K) &lt; 0). Bedriften utvider til F′(K) = r: det er grenseavkastningen som avgjør, ikke gjennomsnittet. Skattlegges overskuddet med satsen t og hele renten kan trekkes fra, beholder bedriften andelen (1 − t) av det samme overskuddet. Toppunktet flytter seg ikke, så skatten er <i>nøytral</i> for investeringen (H2020 oppgave 3a).</p>
<div class="formula"><div class="eq">Uten skatt: F′(K) = r</div><div class="eq">Med skatt og fullt rentefradrag: V = F(K) − rK − t[F(K) − rK] = (1 − t)[F(K) − rK] &nbsp;⟹&nbsp; F′(K) = r</div><div class="where">V er overskuddet etter skatt. Kommer kapitalen i blokker, tar bedriften med hver blokk med grenseavkastning over r. Kravet før skatt er fortsatt r, ikke r(1 − t): avkastningen beskattes like hardt som renten gir fradrag, så du sammenligner før skatt med før skatt.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Kapitalen kommer i blokker på kr 1 mill. med grenseavkastning 12 %, 9 %, 7 %, 5 % og 3 %. Renten er 6 %.</p><p>Uten skatt gir de tre første blokkene mer enn 6 % og den fjerde mindre. Bedriften bruker <b>kr 3 mill.</b> Overskuddet er (12 + 9 + 7 − 3 × 6) % × kr 1 mill. = kr 100 000. Med fire blokker ville det vært kr 90 000.</p><p>Med 22 % skatt og fullt rentefradrag gir den tredje blokken (7 − 6) % × 0,78 = 0,78 % av blokken etter skatt og den fjerde (5 − 6) % × 0,78 = −0,78 %. Bedriften bruker fortsatt <b>kr 3 mill.</b> Overskuddet etter skatt er 100 000 × 0,78 = kr 78 000.</p></div>`,
      q: `<p>En bedrift kan bruke kapital i blokker på kr 5 mill. Grenseavkastningen før skatt er 10 % på den første blokken, 8 % på den andre, 6,5 % på den tredje, 5,5 % på den fjerde og 4 % på den femte. Bedriften låner all kapital til 6 %. Overskuddet skattlegges med 22 % <b>[dagens regel]</b>. Hele rentekostnaden kan trekkes fra. Hvor mye kapital bruker bedriften?</p>`,
      options: ["kr 20 mill.", "kr 10 mill.", "kr 15 mill.", "kr 25 mill."],
      answer: 2,
      solution: `<p>Med fullt rentefradrag er kravet før skatt fortsatt renten, 6 %.</p><p>Blokk 1–3 gir 10 %, 8 % og 6,5 %, alle over 6 %. Blokk 4 gir 5,5 %, under 6 %. Bedriften bruker 3 × 5 = <b>kr 15 mill.</b></p><p>Den tredje blokken gir (6,5 − 6) % × kr 5 mill. × 0,78 = kr 19 500 etter skatt. Den fjerde ville gitt (5,5 − 6) % × kr 5 mill. × 0,78 = kr −19 500.</p>`,
      check: `<p>Regn overskuddet etter skatt for hvert valg. Tre blokker: (10 + 8 + 6,5 − 3 × 6) % × kr 5 mill. = 325 000 før skatt og 325 000 × 0,78 = kr 253 500 etter. To blokker: 300 000 × 0,78 = kr 234 000. Fire blokker: (325 000 − 25 000) × 0,78 = kr 234 000. Tre blokker er best, akkurat som uten skatt, fordi skatten krymper alle tallene med samme faktor.</p>`,
      traps: [
        "Sammenlignet grenseavkastningen med renten etter skatt, 6 % × 0,78 = 4,68 %. Da kommer også blokk 4 med 5,5 % inn. Svaret blir 4 × 5 = kr 20 mill. Avkastningen beskattes også, så kravet før skatt er 6 %.",
        "Regnet avkastningen etter skatt, men renten før skatt: 6,5 % × 0,78 = 5,07 % er under 6 %, så bare to blokker. Det er svaret når renten ikke gir fradrag. Her gir hele renten fradrag.",
        null,
        "Brukte gjennomsnittet i stedet for grenseavkastningen: (10 + 8 + 6,5 + 5,5 + 4)/5 = 6,8 % er over 6 %, så alle fem blokkene. Den femte blokken gir likevel bare 4 % og taper penger.",
      ],
    },
    {
      id: "bedrift-2",
      title: "Delvis rentefradrag: F′(K) = r(1 − At)/(1 − t)",
      theory: `<p>Får bedriften bare trekke fra andelen A av rentene, betaler den fortsatt hele rK, men skattegrunnlaget blir F(K) − ArK. Deriver verdien etter skatt med hensyn på K, sett lik null og samle leddene med F′(K) på venstre side (H2020 oppgave 3b, H2025 oppgave 7a). Kravet blir høyere enn r fordi en del av kapitalkostnaden ikke gir fradrag, så bedriften investerer mindre. A er andelen som <i>kan</i> trekkes fra. Sier oppgaven hvor mye som nektes fradrag, trekker du det fra 1 først.</p>
<div class="formula"><div class="eq">V = F(K) − rK − t[F(K) − ArK]</div><div class="eq">F′(K) − r − t[F′(K) − Ar] = 0 &nbsp;⟹&nbsp; F′(K)(1 − t) = r(1 − At)</div><div class="eq"><b>F′(K) = r(1 − At)/(1 − t)</b></div><div class="where">0 ≤ A ≤ 1. Grensetesten: A = 1 gir r(1 − t)/(1 − t) = r, den nøytrale skatten fra steg 1. A = 0 gir r/(1 − t). Kravet ligger alltid mellom de to og faller rettlinjet når A øker. Du deler på (1 − t); du ganger ikke.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Renten er 5 % og t = 22 % <b>[dagens regel]</b>. Skattereglene nekter fradrag for 30 % av rentene, så A = 1 − 0,3 = 0,7.</p><p>Telleren: 1 − 0,7 × 0,22 = 0,846. Kravet: 5 % × 0,846/0,78 = <b>5,42 %</b>.</p><p>Grensene er 5 % ved A = 1 og 5 %/0,78 = 6,41 % ved A = 0. Setter du inn 0,3 som A, får du 5 % × 0,934/0,78 = 5,99 %, nær grensen uten fradrag selv om det meste av renten gir fradrag.</p></div>`,
      q: `<p>En bedrift betaler 25 % skatt på overskuddet <b>[eksempeltall]</b> og låner kapital til renten r = 4 %. Skattereglene nekter fradrag for 60 % av rentekostnaden. Resten kan trekkes fra. Hva er bedriftens avkastningskrav før skatt, F′(K)?</p>`,
      options: ["2,70 %", "4,80 %", "4,53 %", "5,33 %"],
      answer: 1,
      solution: `<p>Fradragsandelen er A = 1 − 0,6 = 0,4.</p><p>Telleren: 1 − At = 1 − 0,4 × 0,25 = 0,90. Nevneren: 1 − t = 0,75.</p><p>F′(K) = 4 % × 0,90/0,75 = 4 % × 1,2 = <b>4,80 %</b>.</p>`,
      check: `<p>Grensene er 4 % ved fullt fradrag og 4 %/0,75 = 5,333 % uten fradrag. Kravet faller rettlinjet mellom dem, så A = 0,4 gir 5,333 % − 0,4 × 1,333 % = 5,333 % − 0,533 % = 4,80 %. ✓ Av de gale tallene ligger 2,70 % under båndet, 5,33 % er grensen uten fradrag og 4,53 % er punktet for A = 0,6.</p>`,
      traps: [
        "Ganget med (1 − t) i stedet for å dele: 4 % × 0,90 × 0,75 = 2,70 %. Et krav under renten er umulig når en del av renten ikke gir fradrag.",
        null,
        "Brukte andelen som nektes fradrag som A: 4 % × (1 − 0,6 × 0,25)/0,75 = 4 % × 0,85/0,75 = 4,53 %. A er andelen som kan trekkes fra, 0,4.",
        "Glemte telleren: 4 %/0,75 = 5,33 %. Det er kravet når ingen del av renten gir fradrag (A = 0). Her kan 40 % av renten trekkes fra, så telleren er 1 − 0,4 × 0,25 = 0,90.",
      ],
    },
    {
      id: "bedrift-3",
      title: "Gjeld mot egenkapital: kravene r og r/(1 − t)",
      theory: `<p>Del kapitalen i gjeld G og egenkapital E, så K = E + G. Begge koster r: gjelden i renter, egenkapitalen fordi eieren kunne plassert pengene til r et annet sted, men bare gjeldsrenten gir fradrag. For gjeld stryker skatten på inntekten og fradraget for renten hverandre, så kravet er r (A = 1 i steg 2). For egenkapital beskattes inntekten uten noe fradrag, så kravet er r/(1 − t) (A = 0). F er konkav, så et høyere krav gir færre prosjekter: bedriften bruker mindre egenkapitalfinansiert enn gjeldsfinansiert kapital, E* &lt; G* (H2025 oppgave 7b og 7c).</p>
<div class="formula"><div class="eq">V = F(E + G) − r(E + G) − t[F(E + G) − rG]</div><div class="eq">∂V/∂G = (1 − t)(F′<sub>G</sub> − r) = 0 &nbsp;⟹&nbsp; <b>F′<sub>G</sub> = r</b></div><div class="eq">∂V/∂E = F′<sub>E</sub> − r − tF′<sub>E</sub> = 0 &nbsp;⟹&nbsp; <b>F′<sub>E</sub> = r/(1 − t)</b></div><div class="where">F′<sub>G</sub> og F′<sub>E</sub> er avkastningskravene før skatt for en krone finansiert med gjeld og med egenkapital. r(1 − t) er gjeldens kostnad etter skatt, ikke et krav før skatt. Modellen gir bare ulikheten E* &lt; G*, ingen fast faktor mellom dem.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Et prosjekt binder kr 3 000 000 og gir 7 % før renter og skatt, altså kr 210 000. Renten er 6 % og t = 22 % <b>[dagens regel]</b>. Kravene er F′<sub>G</sub> = 6 % og F′<sub>E</sub> = 6 %/0,78 = 7,69 %.</p><p>Med gjeld er rentene kr 180 000 og gir fradrag. Skatten er (210 000 − 180 000) × 22 % = 6 600. Igjen blir 210 000 − 180 000 − 6 600 = <b>kr 23 400</b>.</p><p>Med egenkapital er skatten 210 000 × 22 % = 46 200. Da dekker 210 000 − 46 200 = 163 800 ikke alternativkostnaden på 180 000: <b>kr −16 200</b>. Samme prosjekt gir motsatt konklusjon, fordi 7 % ligger mellom 6 % og 7,69 %.</p></div>`,
      q: `<p>En bedrift kan bruke kapital i blokker på kr 4 mill. Grenseavkastningen før skatt er 9,5 %, 8,0 %, 7,4 %, 6,9 %, 6,0 % og 5,0 % på blokk 1 til 6. Både gjeld og egenkapital koster r = 5,5 %. Overskuddet skattlegges med 22 % <b>[dagens regel]</b>. Gjeldsrentene kan trekkes fra, men egenkapitalens kostnad kan ikke. Hvor mye kapital bruker bedriften hvis all kapitalen er egenkapital?</p>`,
      options: ["kr 20 mill.", "kr 4 mill.", "kr 12 mill.", "kr 24 mill."],
      answer: 2,
      solution: `<p>Kravet for egenkapital: F′<sub>E</sub> = 5,5 %/0,78 = 7,05 %.</p><p>Blokk 1–3 gir 9,5 %, 8,0 % og 7,4 %, alle over 7,05 %. Blokk 4 gir 6,9 %, under. E* = 3 × 4 = <b>kr 12 mill.</b></p><p>Med gjeld er kravet 5,5 % og blokk 1–5 holder, så G* = kr 20 mill. Altså E* &lt; G*.</p>`,
      check: `<p>Regn blokk 3 og 4 med egenkapital. Blokk 3: 7,4 % × 0,78 = 5,772 % etter skatt mot 5,5 % i alternativkostnad, altså 0,272 % × kr 4 mill. = kr 10 880. Blokk 4: 6,9 % × 0,78 = 5,382 %, altså −0,118 % × kr 4 mill. = kr −4 720. Med gjeld ville blokk 4 gitt (6,9 − 5,5) % × 0,78 × kr 4 mill. = kr 43 680. Forholdet E*/G* = 12/20 = 0,6 er ikke 1 − t = 0,78: modellen gir ingen fast faktor.</p>`,
      traps: [
        "Brukte kravet for gjeld, r = 5,5 %, også for egenkapitalen: blokk 1–5 gir kr 20 mill. Det er G*. Egenkapitalens kostnad gir ikke fradrag.",
        "Tok skatten to ganger: sammenlignet avkastningen etter skatt med kravet 7,05 %, som allerede er før skatt. Bare blokk 1 holder, 9,5 % × 0,78 = 7,41 %, så svaret blir kr 4 mill. Blokk 2 gir 8,0 % før skatt, over 7,05 %.",
        null,
        "Brukte gjeldens kostnad etter skatt som krav: 5,5 % × 0,78 = 4,29 %. Da kommer alle seks blokkene med, kr 24 mill. Det blander et tall etter skatt med en avkastning før skatt.",
      ],
    },
    {
      id: "bedrift-4",
      title: "Skattearbitrasje: lån med fradrag, plasser skattefritt",
      theory: `<p>Skattearbitrasje er å låne der renten gir fradrag og plassere der avkastningen beskattes lavt eller ikke i det hele tatt. Lånet koster r(1 − t) etter fradraget, mens en skattefri plassering gir avkastningen uavkortet. Er satsen på de to sidene lik, blir gevinsten null: det er nøytralitet på finansieringssiden. Rentefradraget i Norge er verdt 22 % <b>[dagens regel]</b> uansett hvor høy marginalskatten på lønn er. I et velfungerende marked lukkes arbitrasjen også av prisene, fordi alle vil eie det skattefrie papiret (neste steg).</p>
<div class="formula"><div class="eq">Gevinst per år = L × r<sub>fri</sub> − L × r(1 − t)</div><div class="eq">Med samme rente på begge sider: gevinst = L × r × t</div><div class="where">L er lånebeløpet, r lånerenten, t verdien av rentefradraget og r<sub>fri</sub> avkastningen på den skattefrie plasseringen. Gevinsten forsvinner når r<sub>fri</sub> = r(1 − t).</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Du låner kr 1 500 000 til 4 % og plasserer alt i et skattefritt papir med samme risiko, også til 4 %.</p><p>Rentene er 1 500 000 × 4 % = 60 000. Etter fradraget koster de 60 000 × 0,78 = 46 800. Papiret gir 60 000 skattefritt. Gevinst: 60 000 − 46 800 = <b>kr 13 200</b> i året, som er 1 500 000 × 4 % × 22 %.</p><p>Faller avkastningen på papiret til 4 % × 0,78 = 3,12 %, gir det 46 800 og gevinsten er null.</p></div>`,
      q: `<p>Siri låner kr 2 000 000 til 5 %. Rentene gir fradrag i alminnelig inntekt med 22 % <b>[dagens regel]</b>. Hun plasserer hele beløpet i et skattefritt papir med samme risiko som gir 4,2 % <b>[eksempeltall]</b>. Hvor stor er den årlige gevinsten etter skatt?</p>`,
      options: ["kr −16 000", "kr 22 000", "kr 6 000", "kr 31 400"],
      answer: 2,
      solution: `<p>Avkastning: 2 000 000 × 4,2 % = kr 84 000, skattefritt.</p><p>Renter: 2 000 000 × 5 % = 100 000. Etter fradraget: 100 000 × 0,78 = kr 78 000.</p><p>Gevinst: 84 000 − 78 000 = <b>kr 6 000</b>.</p>`,
      check: `<p>Avkastningen som gir null gevinst, er 5 % × 0,78 = 3,90 %. Papiret gir 4,2 − 3,9 = 0,3 prosentpoeng mer: 0,3 % × 2 000 000 = kr 6 000. ✓</p>`,
      traps: [
        "Glemte rentefradraget: 84 000 − 100 000 = kr −16 000. Rentene koster bare 78 000 etter skatt.",
        "Antok at papiret gir lånerenten 5 % og brukte gevinst = L × r × t: 2 000 000 × 5 % × 22 % = kr 22 000. Papiret gir 4,2 %.",
        null,
        "Verdsatte rentefradraget til marginalskatten på lønn, 47,4 %: 84 000 − 100 000 × 0,526 = kr 31 400. Rentefradraget gis i alminnelig inntekt med 22 %.",
      ],
    },
    {
      id: "bedrift-5",
      title: "Implisitt skatt: prisen spiser skattefritaket",
      theory: `<p>Gir et skattefritt papir mer etter skatt enn et skattlagt papir med samme risiko, vil alle ha det. Prisen stiger og avkastningen før skatt faller, til den marginale investoren får det samme etter skatt i begge. Fallet er en <i>implisitt skatt</i> (<i>implicit tax</i>): ingen krever den inn, men kjøperen betaler den gjennom lavere avkastning. Du leser den ut av to avkastninger uten å kjenne noen skattesats. Satsen måles mot avkastningen før skatt, så nevneren er den skattlagte avkastningen.</p>
<div class="formula"><div class="eq">Likevekt: r<sub>fri</sub> = r<sub>skattlagt</sub> × (1 − t) &nbsp;⟹&nbsp; r<sub>fri</sub> &lt; r<sub>skattlagt</sub></div><div class="eq"><b>t* = 1 − r<sub>fri</sub>/r<sub>skattlagt</sub> = (r<sub>skattlagt</sub> − r<sub>fri</sub>)/r<sub>skattlagt</sub></b></div><div class="where">r<sub>fri</sub> og r<sub>skattlagt</sub> er avkastningene før skatt på det skattefrie og det skattlagte papiret, med samme risiko. t er skatten den marginale investoren betaler på det skattlagte. Faktoren (1 − t) står på den skattlagte siden fordi det er den avkastningen skatten krymper. Differansen r<sub>skattlagt</sub> − r<sub>fri</sub> er prosentpoeng, ikke en sats.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Et skattlagt papir gir 6,5 % og renten skattlegges med 22 % <b>[dagens regel]</b>. Likevekten gir det skattefrie papiret 6,5 % × 0,78 = <b>5,07 %</b>. Den implisitte skatten er (6,5 − 5,07)/6,5 = <b>22 %</b>, like stor som den eksplisitte.</p><p>Motsatt vei: gir to like risikable papirer 4,0 % skattlagt og 3,4 % skattefritt, er t* = 1 − 3,4/4,0 = 15 %.</p></div>`,
      q: `<p>To obligasjoner har samme risiko. Den ene er skattlagt og gir 5,0 % før skatt. Den andre er fritatt for skatt og gir 3,6 % <b>[eksempeltall]</b>. Markedet er velfungerende. Hvor stor er den implisitte skatten på den skattefrie obligasjonen?</p>`,
      options: ["28,00 %", "38,89 %", "1,40 %", "72,00 %"],
      answer: 0,
      solution: `<p>t* = (r<sub>skattlagt</sub> − r<sub>fri</sub>)/r<sub>skattlagt</sub> = (5,0 − 3,6)/5,0 = 1,4/5,0 = <b>28,00 %</b>.</p>`,
      check: `<p>Baklengs gjennom likevekten: 5,0 % × (1 − 0,28) = 3,6 %, nøyaktig den skattefrie avkastningen. ✓ Kjøperen av den skattefrie obligasjonen gir fra seg 28 % av det den skattlagte gir før skatt, akkurat som om han betalte 28 % skatt.</p>`,
      traps: [
        null,
        "Delte på den skattefrie avkastningen: (5,0 − 3,6)/3,6 = 38,89 %. En skattesats måles mot grunnlaget før skatt, 5,0 %.",
        "Ga differansen r<sub>skattlagt</sub> − r<sub>fri</sub> = 1,40 prosentpoeng som sats. Det er en forskjell i avkastning, ikke en skattesats.",
        "Regnet r<sub>fri</sub>/r<sub>skattlagt</sub> = 3,6/5,0 = 72,00 % og glemte å trekke fra 1. Det er andelen kjøperen beholder.",
      ],
    },
    {
      id: "bedrift-6",
      title: "Hvem tjener på skattefritaket: din sats mot markedets",
      theory: `<p>Den implisitte skatten er markedets sats, satt av den marginale investoren. Har du høyere marginalskatt enn t*, får du mest etter skatt i det skattefrie papiret. Har du lavere, er det skattlagte best, så skattefrie investorer som pensjonsfond og stiftelser taper på å eie det fritatte. Skattefavoriserte aktiva havner derfor hos dem med høyest marginalskatt. Den som tjener på at fritaket innføres, er utstederen, som låner billigere, sammen med den som eide papiret den dagen.</p>
<div class="formula"><div class="eq">Fordel ved å velge det skattefrie = r<sub>fri</sub> − r<sub>skattlagt</sub> × (1 − t<sub>egen</sub>) = (t<sub>egen</sub> − t*) × r<sub>skattlagt</sub></div><div class="where">t<sub>egen</sub> er din marginalskatt på avkastningen. Positiv fordel: velg det skattefrie. Negativ: velg det skattlagte. Null: du er den marginale investoren.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Et skattlagt papir gir 6,0 % og et skattefritt 4,5 %, så t* = 1 − 4,5/6,0 = 25 % <b>[eksempeltall]</b>.</p><p>En investor med 40 % marginalskatt får 6,0 % × 0,60 = 3,6 % i det skattlagte mot 4,5 %. Fordelen er <b>0,9 prosentpoeng</b>, som er (40 % − 25 %) × 6,0 %.</p><p>En stiftelse uten skatt får 6,0 % mot 4,5 %. Den taper <b>1,5 prosentpoeng</b> på det skattefrie og bør eie det skattlagte.</p></div>`,
      q: `<p>Et skattlagt papir gir 5,0 % og et skattefritt papir med samme risiko gir 4,0 % <b>[eksempeltall]</b>. Ola har kr 1 000 000 å plassere og 35 % marginalskatt på avkastningen <b>[eksempeltall]</b>. Hvor mye mer sitter han igjen med per år etter skatt ved å velge det skattefrie papiret?</p>`,
      options: ["kr 17 500", "kr −10 000", "kr 0", "kr 7 500"],
      answer: 3,
      solution: `<p>Skattefritt: 1 000 000 × 4,0 % = kr 40 000.</p><p>Skattlagt: 1 000 000 × 5,0 % × (1 − 0,35) = kr 32 500.</p><p>Fordel: 40 000 − 32 500 = <b>kr 7 500</b>.</p>`,
      check: `<p>Markedets sats er t* = 1 − 4,0/5,0 = 20 %. Regelen gir (35 % − 20 %) × 5,0 % × 1 000 000 = kr 7 500. ✓ En investor med 20 % ville fått kr 40 000 i begge og vært likegyldig.</p>`,
      traps: [
        "Trodde han sparer hele skatten på det skattlagte papiret: 1 000 000 × 5,0 % × 35 % = kr 17 500. Det skattefrie gir 1 prosentpoeng mindre før skatt, som er en implisitt skatt på 20 %.",
        "Sammenlignet før skatt: 40 000 − 50 000 = kr −10 000. Ola betaler 35 % på det skattlagte, så sammenligningen må gjøres etter skatt.",
        "Antok at fordelen er priset bort for alle. Den er bare borte for den marginale investoren med 20 %. Med 35 % tjener Ola (35 % − 20 %) × 5,0 % × 1 000 000 = kr 7 500.",
        null,
      ],
    },
    {
      id: "bedrift-7",
      title: "Domar–Musgrave: staten som stille partner, med og uten fullt tapsfradrag",
      theory: `<p>En proporsjonal skatt med fullt tapsfradrag gjør staten til stille partner: den tar andelen t av gevinsten og bærer andelen t av tapet, fordi tapet gir fradrag mot annen inntekt. Hvert utfall krymper med (1 − t), så rangeringen mellom prosjekter står fast. En investor som vil ha samme fordeling som før, skalerer den risikable posisjonen opp med 1/(1 − t), så skatten <i>øker</i> risikotakingen. Betingelsen er fullt tapsfradrag. Gir bare en del av tapet fradrag, tar staten mer av oppsiden enn av nedsiden. Det risikable prosjektet straffes og risikotakingen faller (spørsmål 7 i flervalgstesten til kursgodkjenning 2026).</p>
<div class="formula"><div class="eq">Fullt tapsfradrag: forventet etter skatt = (1 − t) × gevinst − (1 − t) × tap</div><div class="eq">Fradrag for andelen q av tapet: forventet etter skatt = (1 − t) × gevinst − (1 − q × t) × tap</div><div class="eq">Replisering: beløp med skatt = beløp uten skatt/(1 − t)</div><div class="where">Gevinst og tap er de sannsynlighetsveide bruttobeløpene i de gode og de dårlige utfallene. q = 1 er fullt tapsfradrag og q = 0 intet. Fullt tapsfradrag krever annen inntekt å føre tapet mot.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Uten skatt har du kr 300 000 i en aksje som gir +20 % eller −10 %, altså +60 000 eller −30 000. Så kommer 25 % skatt med fullt tapsfradrag <b>[eksempeltall]</b>.</p><p>Står du stille, får du 60 000 × 0,75 = +45 000 eller −30 000 × 0,75 = −22 500. Øker du til 300 000/0,75 = <b>kr 400 000</b>, får du 400 000 × 20 % × 0,75 = +60 000 eller −400 000 × 10 % × 0,75 = −30 000. Det er nøyaktig fordelingen fra før skatten, med et større beløp i aksjen.</p></div>`,
      q: `<p>Lise investerer kr 200 000 og velger mellom to prosjekter. Det sikre gir kr 25 000. Det risikable gir +120 000 eller −60 000 med like stor sannsynlighet. Skatten er 30 % <b>[eksempeltall]</b>. Bare halvparten av et tap gir fradrag mot annen inntekt. Hva er forventet gevinst etter skatt i det risikable prosjektet?</p>`,
      options: ["kr 21 000", "kr 16 500", "kr 12 000", "kr 27 000"],
      answer: 1,
      solution: `<p>Godt utfall: 120 000 × (1 − 0,30) = 84 000.</p><p>Dårlig utfall: halve tapet, 30 000, gir fradrag verdt 30 000 × 30 % = 9 000. Netto tap: −60 000 + 9 000 = −51 000.</p><p>Forventet: ½ × 84 000 + ½ × (−51 000) = 42 000 − 25 500 = <b>kr 16 500</b>.</p>`,
      check: `<p>Med formelen er gevinsten ½ × 120 000 = 60 000 og tapet ½ × 60 000 = 30 000, så 0,70 × 60 000 − (1 − 0,5 × 0,30) × 30 000 = 42 000 − 25 500 = 16 500. ✓ Det sikre gir 25 000 × 0,70 = 17 500. Med fullt tapsfradrag ville det risikable gitt 21 000 og vunnet. Nå vinner det sikre: delvis tapsfradrag gir mindre risikotaking.</p>`,
      traps: [
        "Regnet med fullt tapsfradrag: 0,70 × (60 000 − 30 000) = kr 21 000. Oppgaven sier at bare halvparten av tapet gir fradrag.",
        null,
        "Regnet uten tapsfradrag: 42 000 − 30 000 = kr 12 000. Halvparten av tapet gir fradrag, verdt ½ × 9 000 = 4 500 i forventning.",
        "Halverte tapet i stedet for fradraget: 42 000 − ½ × 30 000 = kr 27 000. Det er fradraget som gjelder halve tapet, ikke tapet som halveres.",
      ],
    },
    {
      id: "bedrift-8",
      title: "Progressivitet: én sats kan være progressiv",
      theory: `<p>Et skattesystem er progressivt når gjennomsnittsskatten T(Y)/Y stiger med inntekten Y, proporsjonalt når den er lik for alle og regressivt når den faller (H2018 oppgave 1c). Antallet satser avgjør ikke: «flat» betyr én marginalsats, «proporsjonal» lik gjennomsnittsskatt. En flat sats uten fradrag er proporsjonal, men et bunnfradrag B gjør den progressiv fordi B er en større andel av en liten inntekt (H2024 oppgave 4). En borgerlønn til alle virker som et bunnfradrag på borgerlønnen/t, med negativ skatt under den grensen. At den rike betaler flest kroner, gjør ingen skatt progressiv.</p>
<div class="formula"><div class="eq">T(Y) = tY &nbsp;⟹&nbsp; T/Y = t (proporsjonal)</div><div class="eq">T(Y) = t(Y − B) &nbsp;⟹&nbsp; T/Y = t(1 − B/Y) (progressiv)</div><div class="eq">T(Y) = tY − borgerlønn = t(Y − borgerlønn/t) &nbsp;⟹&nbsp; T/Y = t − borgerlønn/Y (progressiv)</div><div class="where">t er den ene marginalsatsen og B bunnfradraget. Gjennomsnittsskatten nærmer seg t nedenfra, men når den aldri.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>30 % med bunnfradrag kr 100 000: inntekt 200 000 gir 30 % × 100 000/200 000 = <b>15 %</b> og inntekt 800 000 gir 30 % × 700 000/800 000 = <b>26,25 %</b>. Progressivt.</p><p>30 % av all inntekt minus en borgerlønn på kr 30 000: 200 000 gir (60 000 − 30 000)/200 000 = 15 % og 800 000 gir (240 000 − 30 000)/800 000 = 26,25 %. Samme tall, fordi 30 000/0,30 = 100 000.</p></div>`,
      q: `<p>Et parti foreslår å erstatte dagens inntektsskatt med 35 % av all inntekt og en borgerlønn på kr 70 000 til alle <b>[eksempeltall]</b>. Hvilket utsagn om forslaget er riktig?</p>`,
      options: [
        "Det er proporsjonalt, fordi alle betaler den samme marginalskatten på 35 %",
        "Det er regressivt, fordi den som tjener kr 1 000 000, får lavere marginalskatt enn med dagens trinnskatt",
        "Det er progressivt, men svakere enn 35 % med et bunnfradrag på kr 200 000, fordi også de rike får borgerlønnen",
        "Det er progressivt: gjennomsnittsskatten stiger fra 17,5 % ved kr 400 000 til 28,0 % ved kr 1 000 000",
      ],
      answer: 3,
      solution: `<p>Gjennomsnittsskatten er T/Y = 35 % − 70 000/Y.</p><p>Ved kr 400 000: (140 000 − 70 000)/400 000 = <b>17,5 %</b>. Ved kr 1 000 000: (350 000 − 70 000)/1 000 000 = <b>28,0 %</b>.</p><p>Den stiger med inntekten, så forslaget er progressivt selv om det har én sats.</p>`,
      check: `<p>Skriv om: 35 % × Y − 70 000 = 35 % × (Y − 200 000). Over kr 200 000 er forslaget nøyaktig 35 % med bunnfradrag kr 200 000: 35 % × 200 000/400 000 = 17,5 %. ✓ Under kr 200 000 blir skatten negativ, for eksempel 52 500 − 70 000 = −17 500 ved kr 150 000. Der omfordeler borgerlønnen mer enn bunnfradraget, ikke mindre.</p>`,
      traps: [
        "Forvekslet flat og proporsjonal. Marginalskatten er 35 % for alle, men gjennomsnittsskatten er 17,5 % ved kr 400 000 og 28,0 % ved kr 1 000 000.",
        "Forvekslet mindre progressivitet enn i dag med regressivitet. Regressivt krever fallende gjennomsnittsskatt. Her stiger den.",
        "Borgerlønnen tilsvarer et bunnfradrag på 70 000/0,35 = kr 200 000. Over den inntekten er de to systemene like. Under den gir borgerlønnen negativ skatt og mer omfordeling.",
        null,
      ],
    },
    {
      id: "bedrift-9",
      title: "Eksamensnivå: to obligasjoner med samme risiko (H2024 oppgave 9)",
      theory: `<p>H2024 oppgave 9 ga to poeng for to statsobligasjoner med lik risiko, den ene fritatt for skatt på rentene og den andre skattlagt med 22 %. Først kom rangeringen før skatt, som H2019 oppgave 4 også spurte om, så formelen for den implisitte skatten blant fire nesten like brøker. Fire filtre fjerner de gale alternativene: faktoren (1 − t) står på den skattlagte siden, den skattefrie har lavest avkastning før skatt, satsen deles på den skattlagte avkastningen og lik risiko i et velfungerende marked gjør papirene sammenlignbare.</p>
<div class="formula"><div class="eq">r<sub>fri</sub> = r<sub>skattlagt</sub> × (1 − t) &nbsp;·&nbsp; t* = (r<sub>skattlagt</sub> − r<sub>fri</sub>)/r<sub>skattlagt</sub></div><div class="where">Settet skrev r = r<sub>fri</sub> og R = r<sub>skattlagt</sub>, så svarene var r &lt; R og t = (R − r)/R. «Nominell avkastning» betydde avkastning før skatt. Med lik risiko og fullt fritak er t* lik den eksplisitte satsen.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Den skattlagte obligasjonen gir 5,0 % og skatten er 22 %. Likevekten gir den skattefrie 5,0 % × 0,78 = <b>3,90 %</b>, lavere enn 5,0 %.</p><p>Implisitt skatt: (5,0 − 3,9)/5,0 = <b>22 %</b>. Feil nevner ville gitt 1,1/3,9 = 28,21 %. Differansen alene er 1,1 prosentpoeng.</p></div>`,
      q: `<p>Staten utsteder to obligasjoner med samme risiko. Den ene er fritatt for skatt på rentene. Den andre gir 3,5 % i rente. Renten på den skattlegges med 22 % <b>[dagens regel]</b>. Kapitalmarkedet er velfungerende og effektivt. Med nominell avkastning menes avkastning før skatt. Hvilken påstand er riktig?</p>`,
      options: [
        "Den skattefrie gir 4,49 % nominelt, fordi den må gi 3,5 %/(1 − 0,22) for at kjøperne skal være likegyldige",
        "Begge gir 3,5 % nominelt, fordi papirer med samme risiko må ha samme avkastning før skatt",
        "Den skattefrie gir 2,73 % nominelt. Den implisitte skatten på den er (3,5 − 2,73)/2,73 = 28,2 %",
        "Den skattefrie gir 2,73 % nominelt. Den implisitte skatten på den er (3,5 − 2,73)/3,5 = 22,0 %",
      ],
      answer: 3,
      solution: `<p>Lik risiko krever lik avkastning etter skatt. Den skattefrie må gi 3,5 % × (1 − 0,22) = <b>2,73 %</b>, lavere enn 3,5 %.</p><p>Implisitt skatt: (3,5 − 2,73)/3,5 = 0,77/3,5 = <b>22,0 %</b>, like stor som den eksplisitte satsen.</p>`,
      check: `<p>Begge gir 2,73 % etter skatt: den skattefrie direkte og den skattlagte som 3,5 % × 0,78 = 2,73 %. ✓ Med 4,49 % ville den skattefrie gitt mer både før og etter skatt. Da ville alle solgt den skattlagte.</p>`,
      traps: [
        "Satte (1 − t) på feil side: 3,5 %/0,78 = 4,49 %. Da gir det skattefrie papiret mest både før og etter skatt. Ingen ville eid det skattlagte.",
        "Sammenlignet før skatt. Med 3,5 % i begge gir den skattefrie 3,5 % etter skatt mot 2,73 %. Da vil alle kjøpe den til prisen stiger og renten faller.",
        "Riktig rente, men feil nevner: 0,77/2,73 = 28,2 %. En skattesats måles mot avkastningen før skatt, 3,5 %.",
        null,
      ],
    },
    {
      id: "bedrift-10",
      title: "Eksamensnivå: delvis rentefradrag på gjelden (H2025 oppgave 7)",
      theory: `<p>H2025 oppgave 7 ga tre poeng: kravet med delvis rentefradrag (7a), kravene for gjeld og egenkapital (7b) og rangeringen E* &lt; G* (7c). Den vanskeligste varianten setter a og b sammen, slik at gjeld og egenkapital har hver sin fradragsandel. Rutinen er den samme for begge kildene: kravet er formelen fra steg 2 med den fradragsandelen kilden har. Kontroller så hvert alternativ med grensetesten, der fullt fradrag gir r og intet fradrag r/(1 − t). Fellen i 7b var r(1 − t): gjeldens kostnad etter skatt satt inn som et krav før skatt.</p>
<div class="formula"><div class="eq">F′<sub>G</sub> = r(1 − A<sub>G</sub>t)/(1 − t) &nbsp;·&nbsp; F′<sub>E</sub> = r(1 − A<sub>E</sub>t)/(1 − t)</div><div class="where">A<sub>G</sub> og A<sub>E</sub> er andelene av kostnaden ved gjeld og egenkapital som kan trekkes fra. I H2025 oppgave 7b var A<sub>G</sub> = 1 og A<sub>E</sub> = 0. Kilden med lavest fradragsandel har høyest krav. Bedriften bruker minst av den.</div></div>`,
      example: `<div class="worked"><span class="wh">Eksempel</span><p>Tenk deg et system der gjeldsrenten gir fullt fradrag og halvparten av en beregnet egenkapitalrente også kan trekkes fra. Da er A<sub>G</sub> = 1 og A<sub>E</sub> = 0,5. Renten er 5 % og t = 22 % <b>[eksempeltall]</b>.</p><p>F′<sub>G</sub> = 5 % × (1 − 0,22)/0,78 = <b>5,00 %</b>. F′<sub>E</sub> = 5 % × (1 − 0,5 × 0,22)/0,78 = 5 % × 0,89/0,78 = <b>5,71 %</b>.</p><p>Grensetest: med A<sub>E</sub> = 0 blir F′<sub>E</sub> = 5 %/0,78 = 6,41 %, svaret fra 7b. Fortsatt gjelder E* &lt; G*, men forskjellen er mindre.</p></div>`,
      q: `<p>En bedrift har profittfunksjonen P = F(K) − rK, der F′(K) &gt; 0 og F″(K) &lt; 0. Kapitalen er egenkapital E og gjeld G, så K = E + G. Både gjeld og egenkapital koster r. Bedriftsskattesatsen er t. Skattefuten lar bedriften trekke fra andelen A av gjeldsrentene, der 0 &lt; A &lt; 1, men ingen kostnad ved egenkapitalen. Hvordan tilpasser bedriften bruken av gjeld og egenkapital?</p>`,
      options: [
        "F′<sub>G</sub> = r(1 − At)/(1 − t) og F′<sub>E</sub> = r/(1 − t)",
        "F′<sub>G</sub> = r og F′<sub>E</sub> = r/(1 − t)",
        "F′<sub>G</sub> = r(1 − At) og F′<sub>E</sub> = r",
        "F′<sub>G</sub> = r/(1 − t) og F′<sub>E</sub> = r(1 − At)/(1 − t)",
      ],
      answer: 0,
      solution: `<p><b>Verdien etter skatt.</b> Bare ArG gir fradrag: V = F(E + G) − r(E + G) − t[F(E + G) − ArG].</p><p><b>Gjeld.</b> ∂V/∂G = F′<sub>G</sub> − r − t(F′<sub>G</sub> − Ar) = 0, så F′<sub>G</sub>(1 − t) = r(1 − At) og <b>F′<sub>G</sub> = r(1 − At)/(1 − t)</b>.</p><p><b>Egenkapital.</b> ∂V/∂E = F′<sub>E</sub> − r − tF′<sub>E</sub> = 0, så <b>F′<sub>E</sub> = r/(1 − t)</b>.</p><p>Siden At &gt; 0, er 1 − At &lt; 1 og F′<sub>G</sub> &lt; F′<sub>E</sub>. Fortsatt gjelder E* &lt; G*.</p>`,
      check: `<p>Sett tall: r = 5 %, t = 22 % og A = 0,5. Riktig par gir 5 % × 0,89/0,78 = 5,71 % for gjeld og 5 %/0,78 = 6,41 % for egenkapital. Grensetest: A = 1 gir 5,00 % og 6,41 %, svaret fra H2025 oppgave 7b. ✓ Paret r(1 − At) og r gir 4,45 % og 5,00 %, krav under eller lik renten selv om ingen kilde har fullt fradrag. Det byttede paret gir 6,41 % for gjeld og 5,71 % for egenkapital, som sier at egenkapital er billigst.</p>`,
      traps: [
        null,
        "Svaret fra H2025 oppgave 7b, der hele gjeldsrenten ga fradrag. Det gjelder bare når A = 1. Her er A &lt; 1, så gjeldskravet ligger over r.",
        "Brukte kostnadene etter skatt som krav: r(1 − At) er gjeldsrenten etter fradraget og r er egenkapitalens kostnad. Inntekten beskattes også, så kravet før skatt får nevneren (1 − t).",
        "Byttet om gjeld og egenkapital. Det sier at egenkapital er billigst, men det er gjeldsrentene som gir fradrag.",
      ],
    },
  ],
});
