/* ===================== FIE432 · KJERNEPENSUM =====================
   Det viktigste i faget på én kveld: en kort gjennomgang av det som kommer på
   eksamen, organisert etter eksamensblokkene og ikke etter kapitlene. Hver del
   har raske sjekker (flervalg med forklaring) og en kort minicase i
   eksamensformat. Teksten er en nedkorting av manualen, ikke nytt stoff.

   id-ene (kjN, kjN-sM, kjN-m1) er lagringsnøkler. De må aldri endres; en del
   eller et spørsmål som skrives om, får ny id (fallgruve 7s).

   BYGGET FIL — ikke rediger her. Delene ligger i _kjerne/kjN.js, og settes
   sammen med: python3 tools/bygg-kjerne.py fie432
   ============================================================================ */
window.EDU_DATA = window.EDU_DATA || {};
window.EDU_DATA.kjerne = [];

/* kj0 · Eksamen på én side */
window.EDU_DATA.kjerne.push({
  id: "kj0",
  num: 0,
  title: "Eksamen på én side",
  chapters: [0, 19],
  html: `
<p class="lead-in">Fire timer flervalg, og fra 2026 koster et feil svar poeng. Her er når du svarer, hvordan de gale alternativene lages, og hvor poengene har ligget.</p>
<h3>Formatet og gjetteregelen</h3>
<ul>
<li>Fire timers skoleeksamen i Wiseflow, fire alternativer, kalkulator. Fra 2026: <b>3 poeng for rett, −1 for feil, 0 for ubesvart</b>.</li>
<li>Med n alternativer igjen er forventet poeng (1/n) × 3 − (1 − 1/n): <b>0</b> blindt blant fire, <b>+⅓</b> med ett utelukket, <b>+1</b> med to. Svar når du kan utelukke minst ett; stå over ellers.</li>
<li>29 til 38 spørsmål på 240 minutter, 6 til 8 minutter hvert (H2025: 29 poeng). Du taper ikke på tiden, men på å regne fort og feil.</li>
</ul>
<h3>Slik lages de gale alternativene</h3>
<p>Nesten hvert galt alternativ er én bestemt feil: ubenyttet skjerming glemt, oppjusteringen utelatt eller gjort to ganger (kj2); gjeld ikke redusert med rabatten, eller redusert også for primærbolig, og markedsverdi i stedet for formuesverdi (kj3); effektiv sats delt på skattepliktig i stedet for brutto inntekt (kj1); konsumentpris og produsentpris forvekslet (kj5).</p>
<p>Regn ferdig før du ser på alternativene, og forklar hvilken feil hvert av de tre andre er laget av; da er tallet ditt nesten sikkert riktig. Fasitene har kjente regnefeil i veiledningsteksten (H2024 oppgave 5 skriver 17,1 %, men 65 400/380 000 = 17,2 %, som alternativet sier), mens svaralternativet nesten alltid stemmer. Stol på ditt kontrollerte regnestykke og velg nærmeste alternativ. Ligger tallet ditt langt fra alle fire, har du trolig gjort en feil: regn om.</p>
<h3>Hvor poengene har ligget</h3>
<table class="data">
<tr><th>Tema</th><th>H2022</th><th>H2024</th><th>H2025</th><th>Del</th></tr>
<tr><td>Stykkskatt-insidens</td><td class="n">9 %</td><td class="n">19 %</td><td class="n">10 %</td><td>kj5</td></tr>
<tr><td>Skjerming</td><td class="n">20 %</td><td class="n">8 %</td><td class="n">5 %</td><td>kj2</td></tr>
<tr><td>Oppjustering, eierskatt, effektiv sats</td><td class="n">18 %</td><td class="n">6 %</td><td class="n">6 %</td><td>kj1, kj2</td></tr>
<tr><td>Internasjonal skatt, exit-skatt</td><td class="n">17 %</td><td class="n">19 %</td><td class="n">–</td><td>kj7</td></tr>
<tr><td>Formuesskatt som avkastningsskatt</td><td class="n">–</td><td class="n">–</td><td class="n">17 %</td><td>kj4</td></tr>
<tr><td>Merton med humankapital</td><td class="n">14 %</td><td class="n">–</td><td class="n">14 %</td><td>kj8</td></tr>
<tr><td>Forventet nytte, forsikring</td><td class="n">–</td><td class="n">8 %</td><td class="n">14 %</td><td>kj11</td></tr>
<tr><td>Bedriftens tilpasning</td><td class="n">–</td><td class="n">–</td><td class="n">10 %</td><td>kj6</td></tr>
<tr><td>Sparing: ln-nytte, tapsaversjon</td><td class="n">14 %</td><td class="n">–</td><td class="n">–</td><td>kj8</td></tr>
</table>
<p>Resten: progressivitet og implisitt skatt (til sammen 14 % i H2024; kj1, kj6), utbyttet som betaler formuesskatten (kj4), gjeldsfordeling (kj3), portefølje (kj8), pensjon (kj9) og lån (kj10).</p>
<h3>Rekkefølgen</h3>
<p>Fakta- og begrepsspørsmålene først, i én gjennomgang: et minutt eller to hver, og et sikkert gulv. Så regnespørsmålene, ett tema om gangen, og formelgjenkjenningen sist. Merk dem du hopper over, og særskilt dem der du har strøket ett eller to alternativer; dem tar du det siste kvarteret.</p>
<div class="callout tip husk"><span class="h">Må kunne</span>
<ul><li>Med +3 for rett og −1 for feil er forventet poeng 0 blindt blant fire, +⅓ med ett alternativ utelukket og +1 med to. Svar når du kan utelukke minst ett.</li>
<li>Regn ferdig før du ser på alternativene, kontroller tallet en annen vei, og forklar hvilken feil hvert galt alternativ er laget av.</li>
<li>Feilmønstrene: glemt ubenyttet skjerming, oppjustering utelatt eller doblet, gjeld ikke redusert med rabatten eller redusert også for primærbolig, markedsverdi i stedet for formuesverdi, skattepliktig i stedet for brutto i nevneren.</li>
<li>Kontrollert tall tett ved ett alternativ: velg det, selv om fasitteksten sier noe annet. Langt fra alle fire: regn om.</li></ul></div>
`,
  checks: [
    {
      id: "kj0-s1",
      q: "Du har strøket ett av de fire alternativene og har ingen formening om de tre som er igjen. Hva er forventet poeng av å svare, med 3 for rett og −1 for feil?",
      options: [
        "0, fordi minuspoengene er satt slik at gjetting aldri lønner seg",
        "+1, fordi sjansen for rett er ⅓ og ⅓ × 3 = 1",
        "+⅓, fordi ⅓ × 3 − ⅔ × 1 = ⅓",
        "−⅓, fordi du fortsatt bommer oftere enn du treffer",
      ],
      answer: 2,
      explanation: "Med tre alternativer igjen er sjansen for rett ⅓, så forventningen er ⅓ × 3 − ⅔ × 1 = +⅓, og du bør svare. Null gjelder bare når du gjetter blindt blant fire. Svaret +1 glemmer at de to gale utfallene hver koster ett poeng.",
    },
    {
      id: "kj0-s2",
      q: "Du har regnet ferdig og kontrollert, men tallet ditt ligger langt fra alle de fire alternativene. Hva gjør du?",
      options: [
        "Velger alternativet nærmest tallet ditt, siden fasitene har kjente regnefeil",
        "Leser oppgaven igjen og regner om, siden bommen trolig er din egen",
        "Lar spørsmålet stå blankt med en gang, siden gjetting gir null i forventning",
        "Velger alternativet midt i spennet, siden de gale tallene ligger rundt det riktige",
      ],
      answer: 1,
      explanation: "De gale alternativene er laget av de typiske feilene, så et tall som ikke ligner noe av dem, tyder på at du har lest eller regnet feil. Fasitfeilene som er kartlagt, ligger i veiledningsteksten og er små; der er svaralternativet nesten alltid riktig. «Velg nærmeste» gjelder derfor når tallet ditt ligger tett ved ett alternativ, ikke når det bommer på alle fire.",
    },
  ],
});

/* kj1 · Skattesystemet og effektiv skatt */
window.EDU_DATA.kjerne.push({
  id: "kj1",
  num: 1,
  title: "Skattesystemet og effektiv skatt",
  chapters: [1, 2],
  html: `
<div class="callout kort"><span class="h">Kort fortalt</span>Norsk inntektsskatt regnes av to grunnlag. Alminnelig inntekt er inntekten etter fradrag og skattlegges med 22 %. Brutto lønn er inntekten før fradrag og er grunnlaget for trygdeavgift og trinnskatt. Delen viser hvordan skatten regnes trinn for trinn og hvordan du finner hvor stor andel av inntekten som faktisk går til skatt. Den forklarer også hvorfor marginalskatten, skatten på neste krone, er noe annet enn gjennomsnittsskatten. Til slutt ser du hva et fradrag er verdt.</div>

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

/* kj2 · Aksjonærmodellen: skjerming, utbytte og gevinst */
window.EDU_DATA.kjerne.push({
  id: "kj2",
  num: 2,
  title: "Aksjonærmodellen: skjerming, utbytte og gevinst",
  chapters: [5, 6],
  html: `
<div class="callout kort"><span class="h">Kort fortalt</span>Aksjeinntekter skattlegges to ganger. Først betaler selskapet 22 % av overskuddet. Så betaler eieren skatt når pengene deles ut som utbytte eller aksjen selges. Eierskatten er satt høyt (37,84 %), slik at det ikke skal lønne seg å ta ut inntekt som utbytte i stedet for lønn. Samtidig skal en normal avkastning, omtrent det du ville fått risikofritt, være skattefri. Det er skjermingsfradraget. Delen lærer deg å regne skjermingen år for år, gevinst ved salg og hva som skjer når eieren er et selskap.</div>

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

/* kj3 · Formuesskatten: verdsetting og gjeldsfordeling */
window.EDU_DATA.kjerne.push({
  id: "kj3",
  num: 3,
  title: "Formuesskatten: verdsetting og gjeldsfordeling",
  chapters: [7],
  html: `
<div class="callout kort"><span class="h">Kort fortalt</span>Formuesskatten er en årlig skatt på det du eier minus det du skylder, over et bunnfradrag. Men den regnes ikke av markedsverdiene. Hver eiendel verdsettes med sin egen sats: en primærbolig teller bare 25 % av verdien opp til en grense, aksjer 80 % og bankinnskudd fullt. Gjelden hører ikke til én bestemt eiendel, så den må fordeles på dem etter verdi. Gjelden som havner på aksjer og andre eiendeler med rabatt på 20 %, gir bare delvis fradrag. Delen gir deg én tabell som løser alle variantene.</div>

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

/* kj4 · Formuesskatt som avkastningsskatt */
window.EDU_DATA.kjerne.push({
  id: "kj4",
  num: 4,
  title: "Formuesskatt som avkastningsskatt",
  chapters: [8],
  html: `
<div class="callout kort"><span class="h">Kort fortalt</span>Formuesskatten betales av formuen, men den kan regnes om til en skatt på avkastningen. Er formuesskatten 1 % og avkastningen 5 %, tar formuesskatten en femdel av avkastningen. Det tilsvarer en avkastningsskatt på 20 %. Delen viser denne omregningen, hva formuesskatten gjør med avkastning og verdi, hvor stort utbytte en eier må ta ut for å betale den og argumentene for og mot skatten.</div>

<p class="lead-in">Temaet fantes ikke på eksamen før H2021, men var 17 % av poengene i H2025: oppgave 9 (hvilken avkastningsskatt formuesskatten tilsvarer) og oppgave 3 (avkastning og verdi under formuesskatt). Utbyttet som betaler skatten, kom i H2024 oppgave 7 og H2025 oppgave 6.</p>

<h3>Ekvivalensen: t = τ<sub>w</sub>/r</h3>
<p>I kursets modell faller formuesskatten τ<sub>w</sub>W på formuen W ved periodens begynnelse og er kjent på forhånd. En skatt t på avkastningen er t × r × W. Samme proveny krever:</p>
<div class="formula"><div class="eq">τ<sub>w</sub> × W = t × r × W ⟹ t = τ<sub>w</sub>/r</div>
<div class="eq">Faller skatten på utgående formue W(1 + r): τ<sub>w</sub> = t × r/(1 + r)</div>
<div class="where">W stryker seg: svaret avhenger bare av satsen og avkastningen r. At skatten faller ved periodens begynnelse, er konvensjonen i kursets modell (Bjerksund og Schjelderup) og i H2025 oppgave 9. Loven verdsetter formuen per 1. januar i året etter inntektsåret (skatteloven § 4-1), altså ved utgangen av inntektsåret; oppgaveteksten avgjør hvilken du bruker. Eksamen skriver ofte formuesskattesatsen som stor T.</div></div>
<p>H2025 oppgave 9 [eksempeltall]: W = 100, r = 5 %, T = 1 % på inngående formue. Skatten er 1,00 og avkastningen 5, så t = 1/5 = <b>20 %</b>. Alternativet 21 % er skatten lagt på utgående formue, 1,05/5. Fordi r står i nevneren, stiger satsen bratt når avkastningen faller: 10 % ved r = 10 %, 50 % ved r = 2 %.</p>

<h3>Avkastning og verdi under formuesskatt</h3>
<div class="formula"><div class="eq">r<sub>etter</sub> = (CF − τ<sub>w</sub>W)/W = r − τ<sub>w</sub></div>
<div class="where">Formuesskatten trekker τ<sub>w</sub> prosentpoeng fra avkastningen. Med verdsettingsrabatt ρ blir fratrekket τ<sub>w</sub>(1 − ρ): 0,8 prosentpoeng for aksjer ved 1,0 % og 20 % rabatt [dagens regel].</div></div>
<div class="callout mech"><span class="h">Hvorfor faller alternativkostnaden også?</span>Formuesskatten er en skatt på personen, ikke på aktivumet: den treffer alt du eier, og senker avkastningen på alternativet like mye som på investeringen. Den som trekker skatten fra kontantstrømmen, men beholder det gamle avkastningskravet, sammenligner et tall etter skatt med et tall før skatt.</div>
<div class="formula"><div class="eq">Alternativet rammes likt: (CF − τ<sub>w</sub>V)/V = r − τ<sub>w</sub> ⟹ V = CF/r</div>
<div class="eq">Alternativet rammes ikke: (CF − τ<sub>w</sub>V)/V = r ⟹ V = CF/(r + τ<sub>w</sub>)</div>
<div class="where">V er verdien av en evig kontantstrøm CF, og skatten faller på V. Forutsetningen er et effisient, integrert marked der samme risikoklasse gir samme avkastning. Da stryker τ<sub>w</sub> seg: en norsk investor verdsetter aksjen som en utlending uten formuesskatt (Bjerksund og Schjelderup).</div></div>
<div class="worked"><span class="wh">Gjennomregnet: H2025 oppgave 3</span>
<p>Samme risikoklasse gir samme avkastning. Aksjer kjøpes for 200 mill., gir 10 mill. i kontantstrøm og selges for 200 mill. En evig strøm i samme risikoklasse gir 5 mill. i året. Formuesskatten er 1 % [eksempeltall, lik dagens sats]; se bort fra rabatt, bunnfradrag og skatt på avkastningen.</p>
<p><b>(a) Uten formuesskatt:</b> r = 10/200 = <b>5 %</b>.</p>
<p><b>(b) Med formuesskatt:</b> skatten er 200 × 1 % = 2, så (10 − 2)/200 = <b>4 %</b> = r − τ<sub>w</sub>. Dette er nå alternativkostnaden.</p>
<p><b>(c) Den evige strømmen uten formuesskatt:</b> V = 5/0,05 = <b>100 mill.</b></p>
<p><b>(d) Med formuesskatt:</b> (5 − 0,01V)/V = 0,04 ⟹ 5/V = 0,05 ⟹ V = <b>100 mill.</b></p>
<p><b>Kontroll:</b> V = 100 gir skatt 1, netto 4 og avkastning 4 %, nøyaktig alternativkostnaden ✓.</p>
<p><b>De gale tallene.</b> 6 % er skatten lagt til i stedet for trukket fra, 3 % skatten trukket fra to ganger. 80 mill. = (5 − 1)/0,05 er den halve justeringen: strømmen trukket for skatt, men diskontert med 5 %. 5/0,06 = 83,3 mill. gjelder bare hvis alternativet ikke rammes.</p>
</div>

<h3>Utbyttet som skal betale formuesskatten</h3>
<p>En eier av et unotert selskap mangler ofte penger utenfor selskapet og må ta utbytte, som selv beskattes med eierskatten t<sub>e</sub>. Utbyttet må bruttoregnes:</p>
<div class="formula"><div class="eq">D × (1 − t<sub>e</sub>) = τ<sub>w</sub> × W ⟹ D = τ<sub>w</sub> × W/(1 − t<sub>e</sub>)</div>
<div class="where">D er bruttoutbyttet, W formuesverdien (ikke markedsverdien) og t<sub>e</sub> = 22 % × 1,72 = 37,84 % [dagens regel]. Belastningen blir τ<sub>w</sub>/(1 − t<sub>e</sub>) = 1 %/0,6216 = 1,61 % av formuesverdien, ikke 1 %. Med skjerming blir nødvendig utbytte mindre.</div></div>
<p>H2025 oppgave 6 [eksempeltall]: formuesverdi kr 100 000, formuesskatt 1 %, eierskatt 50 %. D = 1 000/0,50 = <b>kr 2 000</b>; kontroll 2 000 − 1 000 = 1 000 ✓. Kr 1 500 er skatten lagt oppå og gir bare 750 etter skatt; 1 000/0,6216 = 1 609 er dagens eierskatt brukt der oppgaven sier 50 %.</p>

<h3>Argumentene for og mot</h3>
<p><b>Adam og Miller</b> er skeptiske: en årlig formuesskatt treffer normalavkastningen og ikke meravkastningen, motsatt av det teorien anbefaler. På et aktivum til 100 tar 1 % formuesskatt 1 enten avkastningen er 5 eller 20; 20 % avkastningsskatt tar 1 og 4. Skatten kumulerer også: over 40 år med 5 % avkastning senker 1 % formuesskatt sluttverdien med 31,8 %. Som argumenter for gjengir de: sparing kan avsløre skatteevne, formue gir nytte utover kjøpekraften, og rikdom kan kjøpe politisk innflytelse. <b>Magma-artikkelen</b> (Bjerksund og Schjelderup) forsvarer skatten: formue er skjevere fordelt enn inntekt, og registerstudier av tett eide selskaper finner ikke at den reduserer sysselsettingen. Kritikken deres gjelder verdsettingen: unoterte aksjer kommer inn til om lag halvparten av markedsverdien før rabatt. Sammen med lav effektiv selskapsskatt forklarer det at den effektive skatten faller på toppen.</p>
<div class="callout warn"><span class="h">Feilene som koster poeng</span>(1) Skatten lagt på utgående formue når oppgaven sier inngående: 21 % mot 20 %. (2) Den halve justeringen: strømmen trukket for skatt, men diskontert med det gamle kravet. (3) Utbyttet ganget med (1 + t<sub>e</sub>) i stedet for delt på (1 − t<sub>e</sub>). (4) Pugget sats brukt der oppgaven oppgir en annen, eller skatten regnet av markedsverdi.</div>
<div class="callout tip husk"><span class="h">Må kunne</span>
<ul><li>I kursets modell tilsvarer formuesskatt med sats τ<sub>w</sub> på formuen ved periodens begynnelse en avkastningsskatt t = τ<sub>w</sub>/r, der r er avkastningen; faller den på utgående formue, er τ<sub>w</sub> = t × r/(1 + r).</li>
<li>Med formuesskattesats τ<sub>w</sub> og avkastning r før skatt er avkastningen etter formuesskatt r − τ<sub>w</sub>, eller r − τ<sub>w</sub>(1 − ρ) med verdsettingsrabatt ρ.</li>
<li>Evig kontantstrøm CF med avkastningskrav r i et effisient marked: treffer formuesskatten τ<sub>w</sub> også alternativet, er verdien uendret, V = CF/r; bare hvis alternativet ikke rammes, er V = CF/(r + τ<sub>w</sub>).</li>
<li>Utbyttet D som dekker formuesskatten (sats τ<sub>w</sub>) på formuesverdi W når utbytte beskattes med eierskatten t<sub>e</sub>: D = τ<sub>w</sub>W/(1 − t<sub>e</sub>); kontroll D × (1 − t<sub>e</sub>) = τ<sub>w</sub>W.</li>
<li>Mot (Adam og Miller): skatten treffer normalavkastningen, ikke meravkastningen, og kumulerer over tid. For (Magma-artikkelen): formue er skjevt fordelt, og problemet ligger i verdsettingen av unoterte aksjer.</li></ul></div>
`,
  checks: [
    {
      id: "kj4-s1",
      q: "Formuesskatten er 1,0 % av formuen ved periodens begynnelse. Hva skjer med den ekvivalente avkastningsskatten τ<sub>w</sub>/r når avkastningen faller fra 5 % til 2,5 %?",
      options: [
        "Den dobles fra 20 % til 40 %: kronebeløpet er fast, mens avkastningen halveres",
        "Den er uendret på 20 %: det er formuesskattesatsen som bestemmer belastningen",
        "Den halveres, fra 20 % til 10 %: lavere avkastning gir mindre å skattlegge",
        "Det kan ikke avgjøres uten formuens størrelse, siden skatten er et kronebeløp",
      ],
      answer: 0,
      explanation: "Skatten er τ<sub>w</sub>W uansett avkastning, mens avkastningen er rW, så ekvivalent sats er 1 %/5 % = 20 % før og 1 %/2,5 % = 40 % etter: r står i nevneren. Svaret «uendret» blander satsen på formuen med belastningen på avkastningen; den faste kronesummen tar en dobbelt så stor andel når avkastningen halveres. Formuen stryker seg og spiller ingen rolle.",
    },
    {
      id: "kj4-s2",
      q: "I et effisient, integrert marked treffer formuesskatten alt en norsk investor eier, på markedsverdien ved årets start. Hvordan verdsetter han en evig kontantstrøm CF sammenlignet med en utlending uten formuesskatt?",
      options: [
        "Lavere, CF/(r + τ<sub>w</sub>): skatten legges oppå avkastningskravet hans",
        "Lavere, CF(1 − τ<sub>w</sub>/r)/r: skatten trukket fra strømmen, men kravet r beholdt",
        "Likt, CF/r: skatten senker både strømmen og alternativkostnaden",
        "Høyere, CF/(r − τ<sub>w</sub>): hans alternativkostnad er lavere enn utlendingens",
      ],
      answer: 2,
      explanation: "Formuesskatten er en skatt på personen og treffer alternativet like mye som investeringen, så både kontantstrømmen og kravet faller med τ<sub>w</sub>: (CF − τ<sub>w</sub>V)/V = r − τ<sub>w</sub> gir V = CF/r. Svaret CF/(r + τ<sub>w</sub>) er riktig bare når alternativet ikke rammes av skatten. Å trekke skatten fra strømmen og beholde r er den halve justeringen.",
    },
    {
      id: "kj4-s3",
      q: "Hvorfor mener Adam og Miller at en årlig formuesskatt treffer feil del av avkastningen?",
      options: [
        "Den tar samme kronebeløp uansett avkastning, og treffer dermed normalavkastningen",
        "Den tar en fast andel av avkastningen, så høy og lav avkastning rammes likt",
        "Den treffer bare meravkastningen, som teorien sier bør være skattefri",
        "Den virker som en engangsskatt, og engangsskatter vrir mer enn årlige",
      ],
      answer: 0,
      explanation: "En formuesskatt på 1 % av 100 tar 1 enten avkastningen er 5 eller 20: en femdel av normalavkastningen, men bare 5 % av en avkastning på 20. Teorien sier det motsatte: meravkastningen (renprofitt, flaks og risiko, forkledd arbeidsinntekt) kan beskattes, normalavkastningen helst ikke. Svaret om engangsskatt snur poenget deres: en uventet engangsskatt vrir ingenting.",
    },
  ],
  case: {
    id: "kj4-m1",
    topic: "Ekvivalent avkastningsskatt, verdsetting og utbytte til formuesskatten",
    minutes: 10,
    body: `<p>Kapitalmarkedet er effisient og integrert, så alle investeringer i samme risikoklasse gir samme avkastning. Marius er norsk investor. I risikoklassen han investerer i, gir en plassering 6 % avkastning før formuesskatt, realisert ved periodens slutt [eksempeltall]. Formuesskatten er 1,0 % [dagens regel] av formuesverdien ved <b>periodens begynnelse</b>, og den treffer alt han eier likt. I (a) og (b): se bort fra verdsettingsrabatt, bunnfradrag og skatt på kapitalavkastning.</p>`,
    ledd: [
      {
        id: "kj4-m1a",
        points: 3,
        q: `<p>Hvor høy må en skatt t på avkastningen være for at den skal gi samme proveny som formuesskatten på en plassering i denne risikoklassen? Oppgi svaret med én desimal.</p>`,
        options: ["14,3 %", "17,7 %", "20,0 %", "16,7 %"],
        answer: 3,
        solution: `<p><b>Steg 1: formuesskatten.</b> Med formue W ved periodens begynnelse er skatten 1,0 % × W = 0,01W, et fast beløp.</p><p><b>Steg 2: avkastningsskatten.</b> Grunnlaget er avkastningen 0,06W, så skatten er t × 0,06W.</p><p><b>Steg 3: sett dem like.</b> t × 0,06W = 0,01W gir t = τ<sub>w</sub>/r = 1,0 %/6 % = <b>16,7 %</b>. W stryker seg.</p><p><b>Kontroll:</b> med W = 100 er formuesskatten 1,00 og avkastningen 6, og 6 × 16,67 % = 1,00. ✓</p>`,
        traps: [
          "Nevneren blåst opp med formuesskattesatsen: 1,0 %/(6 % + 1,0 %) = 14,3 %. Grunnlaget for avkastningsskatten er avkastningen alene.",
          "Skatten lagt på formuen ved periodens slutt: 1,0 % × 1,06/6 % = 17,7 %. Oppgaven sier periodens begynnelse.",
          "Delt på avkastningen etter formuesskatt: 1,0 %/(6 % − 1,0 %) = 20,0 %. Ekvivalensen sammenligner med avkastningen før formuesskatt.",
          null,
        ],
      },
      {
        id: "kj4-m1b",
        points: 3,
        q: `<p>Marius vurderer en investering i samme risikoklasse som gir en evigvarende kontantstrøm på kr 900 000 i året. Formuesskatten faller på investeringens markedsverdi. Hva er investeringen verdt for ham?</p>`,
        options: ["kr 15 000 000", "kr 12 500 000", "kr 12 857 143", "kr 18 000 000"],
        answer: 0,
        solution: `<p><b>Steg 1: alternativkostnaden.</b> Formuesskatten treffer også alternativet, så avkastningen etter formuesskatt i risikoklassen er 6 % − 1,0 % = <b>5 %</b>.</p><p><b>Steg 2: betingelsen.</b> Netto kontantstrøm 900 000 − 0,01V skal gi 5 % av V: (900 000 − 0,01V)/V = 0,05 ⟹ 900 000/V = 0,06 ⟹ V = <b>kr 15 000 000</b>.</p><p><b>Kontroll:</b> formuesskatt 150 000, netto 750 000, og 750 000/15 000 000 = 5 %, nøyaktig alternativkostnaden. ✓ Verdien er den samme som uten formuesskatt, 900 000/0,06: skatten senker strømmen og kravet like mye.</p>`,
        traps: [
          null,
          "Den halve justeringen: kontantstrømmen trukket for formuesskatt, 900 000 − 150 000 = 750 000, men diskontert med 6 % før skatt: 750 000/0,06 = 12 500 000.",
          "Alternativkostnaden holdt på 6 %: 900 000/(6 % + 1,0 %) = 12 857 143. Det gjelder bare hvis alternativet ikke rammes av formuesskatten.",
          "Diskontert med 5 % etter skatt, men uten å trekke formuesskatten fra kontantstrømmen: 900 000/0,05 = 18 000 000.",
        ],
      },
      {
        id: "kj4-m1c",
        points: 3,
        q: `<p>Marius eier også alle aksjene i et unotert selskap. Markedsverdien er kr 20 000 000, men formuesverdien etter verdsettingsreglene er kr 8 000 000. Han har ingen likvide midler og må ta utbytte fra selskapet for å betale formuesskatten på 1,0 % på aksjene. Utbytte skattlegges med eierskatten 37,84 %, altså 22 % oppjustert med faktoren 1,72 [dagens regel]. Se bort fra skjermingsfradraget og bunnfradraget.</p><p>Hvor stort bruttoutbytte må han ta for at det som er igjen etter eierskatt, akkurat dekker formuesskatten på aksjene?</p>`,
        options: ["kr 110 272", "kr 321 750", "kr 128 700", "kr 102 564"],
        answer: 2,
        solution: `<p><b>Steg 1: formuesskatten.</b> Grunnlaget er formuesverdien, ikke markedsverdien: 8 000 000 × 1,0 % = <b>kr 80 000</b>.</p><p><b>Steg 2: bruttoregn.</b> D × (1 − 0,3784) = 80 000 gir D = 80 000/0,6216 = 128 700,13 ≈ <b>kr 128 700</b>.</p><p><b>Kontroll:</b> 128 700,13 × 37,84 % = 48 700,13 i eierskatt, og 128 700,13 − 48 700,13 = 80 000, nøyaktig formuesskatten. ✓ Belastningen er 1,61 % av formuesverdien, ikke 1,0 %.</p>`,
        traps: [
          "Eierskatten lagt oppå i stedet for bruttoregnet: 80 000 × 1,3784 = 110 272. Etter 37,84 % eierskatt gir det bare 68 545, som ikke dekker 80 000.",
          "Formuesskatten regnet av markedsverdien: 20 000 000 × 1,0 % = 200 000, og 200 000/0,6216 = 321 750.",
          null,
          "Utbyttet skattlagt med 22 % uten oppjustering: 80 000/0,78 = 102 564.",
        ],
      },
    ],
  },
});

/* kj5 · Hvem betaler skatten: insidens */
window.EDU_DATA.kjerne.push({
  id: "kj5",
  num: 5,
  title: "Hvem betaler skatten: insidens",
  chapters: [11],
  html: `
<div class="callout kort"><span class="h">Kort fortalt</span>Den som formelt betaler en skatt, er ikke nødvendigvis den som bærer den. Legges en avgift på en vare, stiger prisen kjøperen betaler, mens prisen selgeren sitter igjen med, faller. Til sammen utgjør de to endringene hele avgiften. Hvor mye hver side tar, avhenger av hvor lett den kan endre kvantumet: den som minst kan tilpasse seg, bærer mest. Delen utleder dette med tilbud og etterspørsel, viser grensetilfellene og regner ut skatteinntekt og dødvektstap.</div>

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

/* kj6 · Nøytralitet, bedriftens tilpasning og implisitte skatter */
window.EDU_DATA.kjerne.push({
  id: "kj6",
  num: 6,
  title: "Nøytralitet, bedriftens tilpasning og implisitte skatter",
  chapters: [9, 10, 12],
  html: `
<div class="callout kort"><span class="h">Kort fortalt</span>En skatt er nøytral når den ikke endrer hvilke valg som lønner seg. Denne delen ser på hva som skjer når den ikke er det. Når renter gir fradrag, men avkastning på egenkapital ikke gjør det, blir gjeld billigere enn egenkapital. Bedriften tilpasser seg etter det. Når én plassering er skattefavorisert, presses avkastningen på den ned. Forskjellen i avkastning kalles implisitt skatt. Til slutt ser du hvorfor en skatt med fullt tapsfradrag kan få investoren til å ta mer risiko, ikke mindre.</div>

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

/* kj8 · Sparing og porteføljevalg */
window.EDU_DATA.kjerne.push({
  id: "kj8",
  num: 8,
  title: "Sparing og porteføljevalg",
  chapters: [14, 18],
  html: `
<div class="callout kort"><span class="h">Kort fortalt</span>Hvor mye bør du ha i aksjer? Delen starter med hvordan to aktiva blandes til en portefølje med lavere risiko. Deretter ser du hvordan du velger risikonivå ved å kombinere markedsporteføljen med lån eller plassering til risikofri rente. Så kommer Mertons modell, som også regner med fremtidig lønn (humankapital): en ung person med trygg jobb har mye som ligner obligasjoner i lønnen sin og kan derfor ha mer i aksjer. Til slutt ser du hvordan nytte brukes til å velge mellom bank og risiko.</div>

<p class="lead-in">Mertons aksjeandel med humankapital har vært med i fem av ni sett og tok 14 % av poengene i både H2022 og H2025. Porteføljestoffet tok 8 % i H2024 og 7 % i H2025, sparevalget med ln-nytte 14 % i H2022. To vaner avgjør mye: sjekk om tallet er varians eller standardavvik, og om «andel» betyr andel av finansformuen eller av totalformuen.</p>

<h3>To aktiva og kapitalmarkedslinjen</h3>
<p>Med andelen s i aktivum 1 og 1 − s i aktivum 2:</p>
<div class="formula"><div class="eq">E(r<sub>p</sub>) = sμ<sub>1</sub> + (1 − s)μ<sub>2</sub></div>
<div class="eq">σ<sub>p</sub><sup>2</sup> = s<sup>2</sup>σ<sub>1</sub><sup>2</sup> + (1 − s)<sup>2</sup>σ<sub>2</sub><sup>2</sup> + 2s(1 − s)ρσ<sub>1</sub>σ<sub>2</sub></div>
<div class="where">μ<sub>i</sub> er forventet avkastning, σ<sub>i</sub> standardavviket og ρ korrelasjonen. Forventningen er et vektet snitt, variansen er det ikke: så lenge ρ &lt; 1 er standardavviket lavere enn det vektede snittet av standardavvikene. Det er diversifiseringsgevinsten. Krysleddet inneholder kovariansen ρσ<sub>1</sub>σ<sub>2</sub>, ikke ρ alene.</div></div>
<p>To grensetilfeller må du kunne, og ρ = 1 er testet. Ved ρ = 1 blir σ<sub>p</sub> = sσ<sub>1</sub> + (1 − s)σ<sub>2</sub>, en rett linje uten gevinst, og uten shortsalg gir alt i aksjen med lavest σ lavest risiko (H2024 oppgave 12d: 100 % i A; distraktoren 69 % er minimum-varians-vekten σ<sub>B</sub><sup>2</sup>/(σ<sub>A</sub><sup>2</sup> + σ<sub>B</sub><sup>2</sup>) med ρ satt til 0). Ved ρ = −1 kan risikoen fjernes helt med s* = σ<sub>2</sub>/(σ<sub>1</sub> + σ<sub>2</sub>), som bare er 50 % når standardavvikene er like.</p>
<p>Med bank og lån til risikofri rente r<sub>f</sub> ligger alle gode porteføljer på én linje gjennom markedsporteføljen M:</p>
<div class="formula"><div class="eq">E(r<sub>p</sub>) = r<sub>f</sub> + [(E(r<sub>M</sub>) − r<sub>f</sub>)/σ<sub>M</sub>] × σ<sub>p</sub></div>
<div class="where">Stigningstallet er Sharpe-forholdet, meravkastning per enhet risiko. Med r<sub>f</sub> = 3 %, premie 5 prosentpoeng og σ<sub>M</sub> = 15 % [eksempeltall] er det 0,333. Vil du ha σ<sub>p</sub> = 22,5 %, låner du 50 % av egenkapitalen og har 150 % i M: 3 % + 1,5 × 5 % = 10,5 %. Lånt andel = σ<sub>p</sub>/σ<sub>M</sub> − 1.</div></div>
<div class="callout mech"><span class="h">Hvorfor gir ikke volatile enkeltaksjer mer forventet avkastning?</span>Markedet betaler bare for risiko du ikke kan diversifisere bort. Selskapsspesifikk risiko forsvinner i en bred portefølje, så ingen får betalt for å bære den, og enkeltaksjen havner under linjen. Alle holder derfor samme risikable portefølje, i praksis et globalt indeksfond, og risikoviljen styrer bare blandingen med bank eller lån (separasjonsteoremet). Vil du ha mer risiko enn M, låner du og girer M (H2025 oppgave 15).</div>
<p>Et indeksfond gir per definisjon det verdivektede snittet av aksjene minus gebyret, så «indeksfondet slår et vektet snitt» er feil (H2024 oppgave 12a). Et globalt indeksfond er omtrent 70 % USA og har lite eller ingen Kina (H2024 oppgave 12b). Forbrukerrådet fant at aktive fond over tjue år fram til 2018 gjorde det svakere enn indeks for globale, europeiske og nordiske aksjer, men bedre for norske (H2025 oppgave 16). Gebyret forklarer mye: ett prosentpoeng i årlig gebyr gir 17,1 % lavere sluttverdi over 20 år (7 % mot 6 % [eksempeltall]). Er lønnen høy når kronen er sterk, skal du ikke valutasikre fondet: det er verdt mest i kroner når lønnen er lav (H2024 oppgave 12c).</p>

<h3>Merton med humankapital</h3>
<p>Kapitalmarkedslinjen sier hvilken risikabel portefølje; Merton sier hvor mye:</p>
<div class="formula"><div class="eq">w* = (μ − r<sub>f</sub>)/(γσ<sup>2</sup>)</div>
<div class="where">w* er andelen av <b>totalformuen</b> i aksjer, μ − r<sub>f</sub> risikopremien, σ<sup>2</sup> markedets varians og γ risikoaversjonen. Tidshorisont står ikke i formelen, og tre gitte størrelser bestemmer den fjerde.</div></div>
<div class="formula"><div class="eq">Aksjer i finansformuen = w*(F + H) − β<sub>H</sub> × H · α<sub>F</sub> = [w*(F + H) − β<sub>H</sub> × H]/F</div>
<div class="where">F er finansformuen, H humankapitalen (nåverdien av framtidig arbeidsinntekt) og β<sub>H</sub> dens samvariasjon med aksjemarkedet. Sikker jobb: β<sub>H</sub> = 0, humankapitalen er et implisitt bankinnskudd, og all aksjeeksponering tas i F. Lønn som følger markedet én-til-én: β<sub>H</sub> = 1, og du eier allerede aksjer for H. α<sub>F</sub> kappes ved 0; over 100 % betyr lån.</div></div>
<div class="worked"><span class="wh">Gjennomregnet: H2025 oppgave 11</span>
<p>Risikopremien er 0,05 og markedets <b>varians</b> 0,10 [eksempeltall fra oppgaveteksten]. Kari skal ha 50 % av totalformuen i aksjer. F = kr 1 mill. og H = kr 1 mill.</p>
<p><b>Steg 1: γ.</b> 0,50 = 0,05/(γ × 0,10) gir γ = 1.</p>
<p><b>Steg 2: sikker humankapital, β<sub>H</sub> = 0.</b> Ønsket aksjebeløp 0,50 × 2 mill. = 1 mill., og alt må tas i F: <b>100 %</b> av finansformuen.</p>
<p><b>Steg 3: risikabel humankapital, β<sub>H</sub> = 1.</b> 1 mill. − 1 × 1 mill. = 0, altså <b>0 %</b>: hele F i bank.</p>
<p><b>Steg 4: nær pensjon, H ≈ 0.</b> α<sub>F</sub> = w* = 50 %, lavere enn i steg 2. Sensor godtok også «lik andel», fordi andelen av totalformuen er 50 % hele tiden: les nevneren.</p>
<p><b>Kontroll:</b> aksjeandelen av alt skal være w*: 1 mill. av 2 mill. i både steg 2 (aksjer) og steg 3 (aksjelignende humankapital). ✓</p>
<p><b>De gale tallene:</b> 0,10 lest som standardavvik og kvadrert gir γ = 10. w* rett på F gir 50 % i både steg 2 og 3. Svaret fra forrige steg dratt videre gir 100 % i steg 3.</p>
</div>

<h3>Sparevalget med ln-nytte</h3>
<p>H2019 oppgave 9 og H2022 oppgave 5: bank mot fond med to utfall og U(W) = ln W av sluttverdien W. Du velger høyest forventet nytte, p × ln W<sub>god</sub> + (1 − p) × ln W<sub>dårlig</sub> mot ln W<sub>bank</sub>. Ved tapsaversjon ganges nytten av utfall under referansepunktet med en tapsvekt under 1.</p>
<div class="worked"><span class="wh">Gjennomregnet: bank, subjektive sannsynligheter og tapsaversjon</span>
<p>Ella har kr 400 000 i 15 år. Banken gir 2,5 % sikkert; fondet gir kr 1 300 000 eller kr 280 000 med 50 % sannsynlighet hver [eksempeltall, uten skatt].</p>
<p><b>Steg 1: bank.</b> 400 000 × 1,025<sup>15</sup> = 579 319, og ln 579 319 = 13,2696.</p>
<p><b>Steg 2: fondet.</b> 0,5 × 14,0779 + 0,5 × 12,5425 = 13,3102 &gt; 13,2696: fondet.</p>
<p><b>Steg 3: subjektiv p = 40 %.</b> 0,4 × 14,0779 + 0,6 × 12,5425 = 13,1567 &lt; 13,2696: banken. Sluttverdiene er de samme; bare nytten endres. Grensen er p* = (13,2696 − 12,5425)/(14,0779 − 12,5425) = 47,36 %.</p>
<p><b>Steg 4: tapsaversjon.</b> Referansepunktet er innskuddet, så bare 280 000 er et tap: 0,970874 × 12,5425 = 12,1772 (tapsvekt 1/1,03). 0,5 × 14,0779 + 0,5 × 12,1772 = 13,1276 &lt; 13,2696: banken.</p>
<p><b>Kontroll:</b> tapsvekten trekker bare ned det dårlige utfallet, så den kan bare flytte valget mot banken. ✓</p>
<p><b>De gale tallene:</b> forventet sluttverdi (790 000 og 688 000 mot 579 319) velger fondet i alle tre tilfellene, som om Ella var risikonøytral. Nyttetallene ligger tett, så skriv ned hvilke to du sammenligner.</p>
</div>
<p>Aksjesparekonto [dagens regel]: gevinst og utbytte på kontoen skattlegges først ved uttak ut over innskuddet, med skjerming og 37,84 %, så hele bruttoavkastningen forrentes videre.</p>

<div class="callout warn"><span class="h">Feilene som koster poeng</span>Standardavvik brukt som varians: med premie 4 %, σ = 20 % og γ = 3 er w* = 0,04/(3 × 0,04) = 33,3 %, men 6,7 % om du glemmer å kvadrere. w* brukt direkte på finansformuen. Og «aksjer blir tryggere på lang sikt», som kurset avviser: sluttformuens standardavvik vokser med horisonten. Det gale alternativet har ofte riktig konklusjon med galt argument, så les hele setningen.</div>

<div class="callout tip husk"><span class="h">Må kunne</span>
<ul><li>Porteføljevarians σ<sub>p</sub><sup>2</sup> = s<sup>2</sup>σ<sub>1</sub><sup>2</sup> + (1 − s)<sup>2</sup>σ<sub>2</sub><sup>2</sup> + 2s(1 − s)ρσ<sub>1</sub>σ<sub>2</sub>, der s er andelen i aktivum 1 og ρ korrelasjonen. Ved ρ = 1 og uten shortsalg: alt i aktivumet med lavest standardavvik.</li>
<li>Kapitalmarkedslinjen E(r<sub>p</sub>) = r<sub>f</sub> + [(E(r<sub>M</sub>) − r<sub>f</sub>)/σ<sub>M</sub>] × σ<sub>p</sub>: vil du ha mer risiko enn markedsporteføljen M, låner du til r<sub>f</sub> og kjøper mer M, ikke volatile enkeltaksjer.</li>
<li>Merton w* = (μ − r<sub>f</sub>)/(γσ<sup>2</sup>) er aksjeandelen av totalformuen F + H (finansformue pluss humankapital), med σ<sup>2</sup> som varians. Aksjer i F = w*(F + H) − β<sub>H</sub> × H, der β<sub>H</sub> = 0 for sikker humankapital og 1 for lønn som følger markedet.</li>
<li>Med trygg jobb skal unge ha høyere aksjeandel av finansformuen enn eldre fordi humankapitalen er stor og obligasjonslignende, ikke fordi aksjer blir tryggere med tiden.</li>
<li>Indeksfond: gir det verdivektede snittet minus gebyret; et globalt fond er omtrent 70 % USA; Forbrukerrådet fant aktive fond svakere enn indeks globalt, i Europa og Norden, men bedre i Norge; ikke valutasikre når lønnen er høy når kronen er sterk.</li>
<li>Sparevalg med U(W) = ln W: sammenlign p × ln W<sub>god</sub> + (1 − p) × ln W<sub>dårlig</sub> med ln W<sub>bank</sub>. Nye sannsynligheter endrer nytten, aldri sluttverdiene; tapsvekten ganges bare på utfall under referansepunktet.</li></ul></div>
`,
  checks: [
    {
      id: "kj8-s1",
      q: "Aksje A har forventet avkastning 8 % og standardavvik 15 %, aksje B 5 % og 25 %. Korrelasjonen er 1, og du kan bare investere i disse to, uten shortsalg. Hvilken fordeling gir lavest standardavvik?",
      options: [
        "100 % i A, fordi risikoen er lineær i andelen",
        "50 % i hver, fordi spredning alltid senker risikoen",
        "62,5 % i A, fra σ<sub>B</sub>/(σ<sub>A</sub> + σ<sub>B</sub>)",
        "73,5 % i A, fra minimum-varians-andelen med ρ = 0",
      ],
      answer: 0,
      explanation: "Ved ρ = 1 er σ<sub>p</sub> = s × 15 % + (1 − s) × 25 %, som faller jo mer du har i A, så minimum ligger i hjørnet med alt i A. Minimum-varians-formelen med ρ satt til 0, 0,0625/(0,0225 + 0,0625) = 73,5 %, er den fristende feilen: den gjelder bare når aksjene er ukorrelerte. Andelen 62,5 % er løsningen for ρ = −1.",
    },
    {
      id: "kj8-s2",
      q: "Markedsporteføljen har forventet avkastning 7 % og standardavvik 16 %, og du kan låne og spare til r<sub>f</sub> = 3 %. Du vil ha standardavvik 24 %. Hvilken forventet avkastning gir kapitalmarkedslinjen?",
      options: [
        "10,5 %, altså 150 % av markedets 7 %",
        "6,0 %, altså 1,5 × premien på 4 prosentpoeng",
        "7,0 %, fordi mer risiko enn M ikke betales",
        "9,0 %, altså 3 % + 1,5 × 4 prosentpoeng",
      ],
      answer: 3,
      explanation: "Du låner 24/16 − 1 = 50 % av egenkapitalen og har 150 % i M: 1,5 × 7 % − 0,5 × 3 % = 9,0 %, det samme som 3 % + (4/16) × 24 %. Svaret 10,5 % glemmer at lånet koster r<sub>f</sub>. Mer risiko enn M betales langs linjen, så lenge du tar den ved å gire M.",
    },
    {
      id: "kj8-s3",
      q: "Ifølge kurset bør en 30-åring med trygg jobb ha høyere aksjeandel av finansformuen enn en 60-åring med samme risikoaversjon γ. Hvorfor?",
      options: [
        "Aksjer blir mindre risikable jo lengre tid du eier dem",
        "Humankapitalen er stor og virker som et sikkert bankinnskudd",
        "Mertons w* øker med lengden på tidshorisonten",
        "Unge tåler tap bedre og har derfor lavere γ",
      ],
      answer: 1,
      explanation: "Merton gjelder totalformuen F + H, og en trygg humankapital er en stor obligasjonslignende post, så aksjeeksponeringen må tas i den lille finansformuen. Påstanden om at aksjer blir tryggere med tiden er den fristende feilen: sluttformuens standardavvik vokser med horisonten, og formelen inneholder ingen tid. γ er oppgitt som lik.",
    },
    {
      id: "kj8-s4",
      q: "Ella velger mellom bank og et fond med to utfall, med ln-nytte. Hun blir mer pessimistisk: sannsynligheten for gode tider går ned fra 50 % til 40 %. Hva endres?",
      options: [
        "Fondets forventede nytte, men ikke sluttverdiene i utfallene",
        "Sluttverdiene i begge utfall, og dermed nytten",
        "Bankens nytte, fordi banken er referansepunktet",
        "Ingenting, fordi ln W bare avhenger av sluttverdien",
      ],
      answer: 0,
      explanation: "Sannsynlighetene er vektene i p × ln W<sub>god</sub> + (1 − p) × ln W<sub>dårlig</sub>; utfallene selv og bankens sikre ln W<sub>bank</sub> er uendret. Det er fellen i H2022 oppgave 5: å tro at sluttverdiene flytter seg. Hver ln W er uendret, men den veide summen er ikke det.",
    },
  ],
  case: {
    id: "kj8-m1",
    topic: "Merton med sikker og risikabel humankapital",
    minutes: 10,
    body: `<p>Et globalt indeksfond har forventet avkastning μ = 9 % og standardavvik σ = 25 %, og risikofri rente er r<sub>f</sub> = 3 % [eksempeltall]. Du kan låne og spare til r<sub>f</sub>, men ikke shorte aksjer. Aksjeandelene regnes etter Mertons formel, w* = (μ − r<sub>f</sub>)/(γσ<sup>2</sup>), som andel av totalformuen F + H, der F er finansformuen og H humankapitalen.</p>
<p>Hedda er 30 år. Mertons formel gir henne w* = 32 % av totalformuen. Finansformuen er kr 1 600 000 og humankapitalen kr 2 400 000. Hun har en bonusdel i lønnen, så humankapitalen er delvis risikabel med beta mot aksjemarkedet β<sub>H</sub> = 0,25.</p>
<p>Faren Tor er 60 år og har samme risikoaversjon, så w* = 32 % gjelder også for ham. Han er aksjemegler, og lønnen følger markedet én-til-én: β<sub>H</sub> = 1. Finansformuen er kr 3 000 000 og humankapitalen kr 1 000 000.</p>`,
    ledd: [
      {
        id: "kj8-m1a",
        points: 3,
        q: `<p>Hvor høy er Heddas risikoaversjon γ?</p>`,
        options: ["4,50", "3,00", "0,75", "0,33"],
        answer: 1,
        solution: `<p><b>Steg 1 — premie og varians.</b> μ − r<sub>f</sub> = 9 % − 3 % = 0,06, og σ<sup>2</sup> = 0,25<sup>2</sup> = 0,0625.</p><p><b>Steg 2 — løs formelen baklengs.</b> 0,32 = 0,06/(γ × 0,0625), så γ = 0,06/(0,32 × 0,0625) = 0,06/0,02 = <b>3,00</b>.</p><p><b>Kontroll:</b> 0,06/(3 × 0,0625) = 0,06/0,1875 = 0,32. ✓</p>`,
        traps: [
          "Forventet avkastning i telleren i stedet for risikopremien: 0,09/(0,32 × 0,0625) = 4,50.",
          null,
          "Standardavviket brukt som varians: 0,06/(0,32 × 0,25) = 0,75.",
          "Brøken snudd: (0,32 × 0,0625)/0,06 = 0,33.",
        ],
      },
      {
        id: "kj8-m1b",
        points: 3,
        q: `<p>Hvor stor andel av <b>finansformuen</b> bør Hedda ha i aksjer?</p>`,
        options: ["17,0 %", "32,0 %", "42,5 %", "80,0 %"],
        answer: 2,
        solution: `<p><b>Steg 1 — ønsket aksjebeløp av totalformuen.</b> 0,32 × (1 600 000 + 2 400 000) = 0,32 × 4 000 000 = kr 1 280 000.</p><p><b>Steg 2 — det humankapitalen allerede leverer.</b> Den er delvis risikabel: β<sub>H</sub> × H = 0,25 × 2 400 000 = kr 600 000 i aksjeeksponering.</p><p><b>Steg 3 — resten tas i finansformuen.</b> 1 280 000 − 600 000 = kr 680 000, og 680 000/1 600 000 = <b>42,5 %</b> av finansformuen.</p><p><b>Kontroll:</b> samlet aksjeeksponering 680 000 + 600 000 = 1 280 000, som er 32 % av 4 000 000. ✓</p>`,
        traps: [
          "Aksjebeløpet delt på totalformuen i stedet for finansformuen: 680 000/4 000 000 = 17,0 %.",
          "w* brukt direkte på finansformuen: 32 %, altså kr 512 000. Da er humankapitalen ikke med.",
          null,
          "Humankapitalen behandlet som sikker (β<sub>H</sub> = 0): 1 280 000/1 600 000 = 80,0 %.",
        ],
      },
      {
        id: "kj8-m1c",
        points: 3,
        q: `<p>Hvor stor andel av <b>finansformuen</b> bør Tor ha i aksjer?</p>`,
        options: ["9,3 %", "32,0 %", "34,3 %", "42,7 %"],
        answer: 0,
        solution: `<p><b>Steg 1 — ønsket aksjebeløp av totalformuen.</b> 0,32 × (3 000 000 + 1 000 000) = kr 1 280 000.</p><p><b>Steg 2 — humankapitalen er risikabel.</b> Med β<sub>H</sub> = 1 er hele H aksjelignende: 1 × 1 000 000 = kr 1 000 000.</p><p><b>Steg 3 — resten i finansformuen.</b> 1 280 000 − 1 000 000 = kr 280 000, og 280 000/3 000 000 = <b>9,3 %</b>. Resten, kr 2 720 000, står risikofritt.</p><p><b>Kontroll:</b> 280 000 + 1 000 000 = 1 280 000, som er 32 % av 4 000 000. ✓</p>`,
        traps: [
          null,
          "w* brukt direkte på finansformuen: 32 %. Da er humankapitalen, som allerede er aksjer, ikke med.",
          "Heddas β<sub>H</sub> = 0,25 dratt videre: (1 280 000 − 250 000)/3 000 000 = 34,3 %.",
          "Humankapitalen behandlet som sikker (β<sub>H</sub> = 0): 1 280 000/3 000 000 = 42,7 %.",
        ],
      },
    ],
  },
});

/* kj9 · Pensjon */
window.EDU_DATA.kjerne.push({
  id: "kj9",
  num: 9,
  title: "Pensjon",
  chapters: [15],
  html: `
<div class="callout kort"><span class="h">Kort fortalt</span>Pensjonen din kommer fra tre kilder: folketrygden fra staten, tjenestepensjon fra arbeidsgiveren og egen sparing. Delen viser hvordan folketrygden bygges opp år for år som en beholdning og gjøres om til en årlig pensjon. Du ser også hvorfor den årlige pensjonen blir høyere jo lenger du venter med uttaket. Så forklarer delen forskjellen på innskudds- og ytelsespensjon, altså hvem som bærer risikoen. Til slutt kommer skattefordelene ved IPS og BSU.</div>

<p class="lead-in">Pensjon har vært med i sju av ni sett, folketrygden og ordningene i seks hver: folketrygdregningen tar 6,2 % av poengene i snitt, ordningene 4,2 %. I flervalgsæraen har det vært begreper (H2024 oppgave 13a og 13b, H2025 oppgave 14 og 17), men regnerutinen gikk igjen i eldre sett som H2019 oppgave 6.</p>

<h3>Folketrygden: beholdning og delingstall</h3>
<p>For kull født fra 1963 teller alle år med inntekt (alleårsregelen):</p>
<div class="formula"><div class="eq">Opptjening<sub>t</sub> = 18,1 % × min(pensjonsgivende inntekt<sub>t</sub>; 7,1 G<sub>t</sub>)</div>
<div class="eq">B<sub>t</sub> = B<sub>t−1</sub> × (1 + g) + opptjening<sub>t</sub> · årlig pensjon = B/delingstall</div>
<div class="where">B er pensjonsbeholdningen og g lønnsveksten (veksten i grunnbeløpet G). Reguler først, legg til årets opptjening etterpå. Inntekt over 7,1 G gir ingen opptjening. Med G = kr 136 549 (1. mai 2026) er taket kr 969 498 og maks opptjening kr 175 479 [dagens regel]; oppgaven oppgir som regel G.</div></div>
<p>Kompensasjonsgraden er årlig pensjon delt på sluttlønn; under taket, med lønn som følger G, er den 18,1 % × n/delingstall for n år i arbeid. Delingstallet er tilnærmet forventet gjenstående leveår ved uttak, fastsatt endelig året kullet fyller 61 og felles for kvinner og menn. Det <b>synker</b> når du utsetter uttaket, så årlig pensjon stiger (H2025 oppgave 14), men <b>stiger</b> fra kull til kull når levealderen øker: levealdersjusteringen.</p>
<div class="callout mech"><span class="h">Hvorfor er uttaksalderen et nøytralt valg?</span>Beholdningen deles på forventet gjenstående levetid, men utbetalingen løper livet ut: de som lever lenge, får mer enn beholdningen, betalt av dem som dør tidlig. Forventet samlet utbetaling er derfor omtrent lik uansett uttaksalder. Kr 4 670 000 delt på 21,15 ved 62 og 17,08 ved 67 [eksempeltall fra forelesningen] gir kr 220 804 mot kr 273 419 i året, og den som venter, tar igjen forspranget ved 88 år.</div>
<div class="worked"><span class="wh">Gjennomregnet: kompensasjonsgrad under og over taket</span>
<p>Marit har tjent 5 G i 40 år, Anders 9 G. Begge tar ut ved 67 med delingstall 17,08 [eksempeltall]; G = kr 136 549 [dagens regel].</p>
<p><b>Steg 1: Marit, under taket.</b> 18,1 % × 5 × 40 = 36,20 G = kr 4 943 074, pensjon 4 943 074/17,08 = kr 289 407, sluttlønn kr 682 745, altså <b>42,39 %</b>.</p>
<p><b>Steg 2: Anders, taket binder.</b> 18,1 % × 7,1 × 40 = 51,404 G = kr 7 019 165, pensjon kr 410 958, sluttlønn kr 1 228 941, altså <b>33,44 %</b>: flere kroner, lavere andel.</p>
<p><b>Kontroll:</b> 18,1 % × 40/17,08 = 42,39 % ✓ og 18,1 % × 7,1 × 40/(17,08 × 9) = 33,44 % ✓.</p>
<p><b>De gale tallene:</b> uten taket får Anders kr 520 933 og 42,39 %, samme prosent som Marit; lik prosent for én lønn over og én under taket betyr glemt tak. Anders' brøk 7,1/9 brukt på Marit gir 33,44 % for henne.</p>
</div>

<h3>Tjenestepensjon: innskudd mot ytelse</h3>
<p>Den som ikke har fått noe avtalt, bærer risikoen. Ved <b>innskuddspensjon</b> lover arbeidsgiveren innskuddet: du bærer avkastningsrisikoen, velger risikoprofil, beholdningen arves, og ved jobbytte får du pensjonskapitalbevis. Ved <b>ytelsespensjon</b> lover arbeidsgiveren en andel av sluttlønnen og bærer risikoen, uten individuelle valg; ved jobbytte får du fripolise. OTP er obligatorisk uansett form, og begge former finnes i begge sektorer.</p>
<div class="formula"><div class="eq">OTP-minimum = 2 % × lønn opp til 12 G, fra første krone</div>
<div class="eq">Maks innskudd = 7 % × lønn opp til 12 G + 18,1 % × lønn mellom 7,1 G og 12 G</div>
<div class="where">Tillegget på 18,1 % kompenserer for at folketrygden ikke gir opptjening over 7,1 G. AFP finnes bare i bedrifter med AFP i tariffavtalen og er i privat sektor et livsvarig påslag til alderspensjonen.</div></div>

<h3>IPS og BSU</h3>
<p>IPS [dagens regel]: innskudd opp til kr 25 000 i året (fra 2026) gir fradrag i alminnelig inntekt, 22 % tilbake. Avkastningen skattlegges ikke underveis, kontoen er fritatt for formuesskatt, og uttak skattlegges som <b>alminnelig inntekt med 22 %</b>, ikke som pensjonsinntekt: ingen trygdeavgift, ingen trinnskatt. Pengene er bundet til du fyller 62, og utbetalingen skal gå over minst ti år og minst til fylte 80 år.</p>
<div class="formula"><div class="eq">Netto ut = innskudd × (1 + r)<sup>n</sup> × (1 − t) = [innskudd × (1 − t)] × (1 + r)<sup>n</sup></div>
<div class="where">t = 22 % inn og ut, så det er ingen satsrabatt: IPS er som å skatte lønnen først og la resten vokse skattefritt. Statens 22 % vokser med dine; det er «det rentefrie lånet fra staten» i H2024 oppgave 13b.</div></div>
<p>BSU [dagens regel]: maks kr 27 500 i året og kr 300 000 i alt, 10 % av innskuddet i skattefradrag, til og med året du fyller 33 og bare uten egen bolig. BSU gir fradrag i skatten, IPS i inntekten.</p>

<div class="callout warn"><span class="h">Feilene som koster poeng</span>IPS-uttak skattet med eierskatten 37,84 % eller som pensjonsinntekt; det er alminnelig inntekt med 22 %. «IPS lønner seg fordi du skatter lavere som pensjonist» er feil: fordelen er utsatt skatt og formuesskattefritaket. Glemt tak på 7,1 G. Og delingstallets to retninger blandet: det synker med uttaksalderen innenfor ett kull.</div>

<div class="callout tip husk"><span class="h">Må kunne</span>
<ul><li>Folketrygden: opptjening = 18,1 % × min(inntekt; 7,1 G), der G er grunnbeløpet, og beholdningen B<sub>t</sub> = B<sub>t−1</sub> × (1 + g) + opptjening, der g er lønnsveksten: reguler først, legg til etterpå.</li>
<li>Årlig pensjon = beholdning/delingstall. Delingstallet synker når du utsetter uttaket, så årlig pensjon stiger; det stiger fra kull til kull når levealderen øker. Kompensasjonsgrad under taket, med lønn som følger G: 18,1 % × antall år/delingstall.</li>
<li>Innskuddspensjon: arbeidsgiveren lover innskuddet, du bærer risikoen og velger profil. Ytelsespensjon: arbeidsgiveren lover ytelsen og bærer risikoen. OTP-minimum er 2 % av lønn opp til 12 G.</li>
<li>IPS: fradrag 22 % inn (maks kr 25 000 i 2026), ingen skatt underveis, fritatt for formuesskatt, uttak skattlagt som alminnelig inntekt med 22 %, ikke som pensjonsinntekt. Fordelen er utsatt skatt og formuesskattefritaket.</li></ul></div>
`,
  checks: [
    {
      id: "kj9-s1",
      q: "Ola er født i 1975 og vurderer å utsette uttaket av alderspensjon fra folketrygden fra 62 til 67 år. Beholdningen er den samme. Hva skjer?",
      options: [
        "Delingstallet øker, og den årlige pensjonen øker",
        "Delingstallet synker, og den årlige pensjonen øker",
        "Delingstallet synker, og samlet forventet utbetaling øker",
        "Delingstallet øker, og den årlige pensjonen synker",
      ],
      answer: 1,
      explanation: "Delingstallet er tilnærmet forventet gjenstående leveår, og ved 67 er det færre av dem: med fast beholdning og lavere nevner stiger årsbeløpet. Det fristende gale er at samlet forventet utbetaling øker; ordningen er nøytral, så den er omtrent uendret. Et delingstall som øker hører til levealdersjusteringen fra kull til kull.",
    },
    {
      id: "kj9-s2",
      q: "Lise har innskuddspensjon og Per ytelsespensjon, med samme lønn. Aksjemarkedet faller kraftig året før begge går av. Hva skjer?",
      options: [
        "Begge får lavere pensjon, fordi begge ordningene er fondert",
        "Per får lavere pensjon, fordi ytelsen regnes av pensjonsmidlene",
        "Ingen av dem merker det, fordi OTP er lovpålagt",
        "Lise får lavere pensjon, fordi bare innskuddet er avtalt",
      ],
      answer: 3,
      explanation: "I innskuddspensjon er innskuddet avtalt og pensjonen avhenger av avkastningen, så Lise bærer fallet. Per er lovet en andel av sluttlønnen, og arbeidsgiveren må dekke det som mangler. Svaret om at begge taper, glemmer at det er avtalen, ikke fonderingen, som avgjør hvem som bærer risikoen.",
    },
    {
      id: "kj9-s3",
      q: "Rolf er 70 år og tar ut kr 40 000 fra IPS-kontoen i år. Se bort fra personfradraget. Hvor mye skatt betaler han av uttaket?",
      options: [
        "kr 15 136: eierskatt 37,84 %, som for gevinst på sparing",
        "Mer enn kr 8 800: trygdeavgift og trinnskatt kommer i tillegg",
        "kr 8 800: 22 % som alminnelig inntekt",
        "kr 0: skatten ble tatt da pengene ble satt inn",
      ],
      answer: 2,
      explanation: "IPS-uttak er alminnelig inntekt: 22 % × 40 000 = kr 8 800. Det inngår ikke i personinntekten, så trygdeavgift og trinnskatt kommer ikke i tillegg, og det er ikke gevinst med eierskatt. Innskuddet ga fradrag, så skatten tas nettopp ved uttak.",
    },
  ],
  case: {
    id: "kj9-m1",
    topic: "Pensjonsbeholdning, innskuddspensjon og IPS",
    minutes: 10,
    body: `<p>Silje er født i 1990 og er i den nye opptjeningsmodellen i folketrygden. For 2026 gjelder [dagens regel]: G = kr 136 549, opptjeningstaket 7,1 G = kr 969 498, 12 G = kr 1 638 588, opptjeningssats 18,1 %, skatt på alminnelig inntekt 22 % og eierskatt 37,84 %. Anta at satsene holder seg, og at lønnsveksten som beholdningen reguleres med, er 4 % [eksempeltall].</p>
<p>Ved inngangen til 2026 er Siljes pensjonsbeholdning kr 1 600 000, og i 2026 tjener hun kr 1 050 000 [eksempeltall]. Arbeidsgiveren har innskuddspensjon og legger seg på maksimalsatsen: 7 % av lønn opp til 12 G pluss 18,1 % av lønnen mellom 7,1 G og 12 G.</p>
<p>Silje setter også inn kr 25 000 på IPS i 2026 og lar pengene stå i 30 år til 5 % årlig avkastning [eksempeltall]. Oppgitt: 1,05<sup>30</sup> = 4,321942.</p>`,
    ledd: [
      {
        id: "kj9-m1a",
        points: 3,
        q: `<p>Hvor stor er pensjonsbeholdningen i folketrygden ved utgangen av 2026?</p>`,
        options: ["kr 1 775 479", "kr 1 839 479", "kr 1 846 498", "kr 1 854 050"],
        answer: 1,
        solution: `<p><b>Steg 1 — reguler den gamle beholdningen.</b> 1 600 000 × 1,04 = kr 1 664 000.</p><p><b>Steg 2 — årets opptjening, med taket.</b> Lønnen er over 7,1 G, så bare kr 969 498 teller: 18,1 % × 969 498 = kr 175 479.</p><p><b>Steg 3 — legg sammen.</b> 1 664 000 + 175 479 = <b>kr 1 839 479</b>.</p><p><b>Kontroll:</b> opptjeningen kan aldri overstige 18,1 % av taket, kr 175 479, uansett lønn. ✓</p>`,
        traps: [
          "Reguleringen glemt: 1 600 000 + 175 479 = kr 1 775 479.",
          null,
          "Motsatt rekkefølge, årets opptjening regulert med: (1 600 000 + 175 479) × 1,04 = kr 1 846 498.",
          "Taket glemt: 1 664 000 + 18,1 % × 1 050 000 = 1 664 000 + 190 050 = kr 1 854 050.",
        ],
      },
      {
        id: "kj9-m1b",
        points: 3,
        q: `<p>Hvor mye setter arbeidsgiveren inn i innskuddspensjonen hennes for 2026?</p>`,
        options: ["kr 14 571", "kr 73 500", "kr 88 071", "kr 263 550"],
        answer: 2,
        solution: `<p><b>Steg 1 — grunnsatsen.</b> Lønnen er under 12 G, så hele lønnen teller: 7 % × 1 050 000 = kr 73 500.</p><p><b>Steg 2 — tillegget over folketrygdtaket.</b> 1 050 000 − 969 498 = kr 80 502 ligger mellom 7,1 G og 12 G: 18,1 % × 80 502 = kr 14 571.</p><p><b>Steg 3 — sum.</b> 73 500 + 14 571 = <b>kr 88 071</b>.</p><p><b>Kontroll:</b> tillegget gir 18,1 øre per krone over taket, nøyaktig det folketrygden ikke gir. ✓</p>`,
        traps: [
          "Bare tillegget, grunnsatsen på 7 % glemt: 18,1 % × 80 502 = kr 14 571.",
          "Bare grunnsatsen, tillegget over 7,1 G glemt: 7 % × 1 050 000 = kr 73 500.",
          null,
          "Tillegget regnet av hele lønnen: 73 500 + 18,1 % × 1 050 000 = 73 500 + 190 050 = kr 263 550.",
        ],
      },
      {
        id: "kj9-m1c",
        points: 3,
        q: `<p>Hvor mye er IPS-kontoen verdt for Silje etter 30 år, etter skatten som betales ved uttak? Se bort fra avkastning i utbetalingsperioden.</p>`,
        options: ["kr 67 163", "kr 84 278", "kr 89 778", "kr 108 049"],
        answer: 1,
        solution: `<p><b>Steg 1 — kontoverdien.</b> Hele innskuddet vokser uten løpende skatt: 25 000 × 4,321942 = kr 108 049.</p><p><b>Steg 2 — skatt ved uttak.</b> Uttaket er alminnelig inntekt, 22 % av hele beløpet: 108 049 × 22 % = kr 23 771, så netto 108 049 − 23 771 = <b>kr 84 278</b>.</p><p><b>Kontroll:</b> med satsen flyttet til starten: 25 000 × 0,78 × 4,321942 = 19 500 × 4,321942 = kr 84 278. ✓ Statens 22 %, kr 5 500, har vokst til 5 500 × 4,321942 = kr 23 771, nøyaktig skatten.</p>`,
        traps: [
          "Eierskatten 37,84 % brukt på uttaket: 108 049 × 62,16 % = kr 67 163.",
          null,
          "Bare avkastningen skattlagt, som om innskuddet kom skattefritt ut først som på aksjesparekontoen: 108 049 − 22 % × 83 049 = kr 89 778.",
          "Uttaksskatten glemt: kr 108 049.",
        ],
      },
    ],
  },
});

/* kj10 · Lån */
window.EDU_DATA.kjerne.push({
  id: "kj10",
  num: 10,
  title: "Lån",
  chapters: [16],
  html: `
<div class="callout kort"><span class="h">Kort fortalt</span>Et lån er én formel og noen få regler. Delen viser hvordan terminbeløpet på et annuitetslån regnes og hvor mye av hver betaling som er renter, som gir 22 % fradrag. Du lærer å finne den effektive renten med gebyrene medregnet. Til slutt ser du hvor mye du kan låne etter utlånsforskriften og hva avdragsfrihet egentlig koster.</div>

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

/* kj11 · Forsikring, forventet nytte og finansiell psykologi */
window.EDU_DATA.kjerne.push({
  id: "kj11",
  num: 11,
  title: "Forsikring, forventet nytte og finansiell psykologi",
  chapters: [17, 18],
  html: `
<div class="callout kort"><span class="h">Kort fortalt</span>Hvorfor kjøper folk forsikring når premien i snitt er høyere enn det de får igjen? Fordi de fleste misliker risiko: å tape 100 000 kroner gjør mer vondt enn å vinne 100 000 kroner gjør godt. Forventet nytte fanger det ved å sammenligne hvor godt du har det i hvert utfall, ikke bare kronene. Delen viser hvordan du regner ut den høyeste premien du bør godta. Den avslutter med finansiell psykologi: tankefeil og preferanser som får folk til å velge annerledes enn teorien sier.</div>

<p class="lead-in">Forventet nytte tok 8 % av poengene i H2024 (oppgave 11a–d) og 14 % i H2025 (oppgave 12 og 13), og regnedelen sammenligner nytter, ikke kroner. Finansiell psykologi er spurt som begreper (H2016 oppgave 3j, H2019 oppgave 9f og 9h); regningen med tapsaversjon står i kj8.</p>

<h3>Risikoaversjon og sikkerhetsekvivalent</h3>
<p>En nyttefunksjon U(W) av formuen W er risikoavers når den er konkav (U″ &lt; 0): avtakende grensenytte. Kursets √W og ln W er begge konkave; ln W er mest risikoavers (relativ risikoaversjon γ = 1 mot 0,5).</p>
<div class="formula"><div class="eq">E[U] = Σ p<sub>i</sub> × U(W<sub>i</sub>) · U(CE) = E[U] · risikopremie = E[W] − CE</div>
<div class="where">Sikkerhetsekvivalenten CE er den sikre formuen som er like god som lotteriet: CE = (E[U])² med √W, CE = e<sup>E[U]</sup> med ln W. Konkaviteten gir CE &lt; E[W].</div></div>

<h3>Forsikring: kjøpe, maksimal premie og terskelen</h3>
<p>Formue W, tap L med sannsynlighet p, premie P:</p>
<div class="formula"><div class="eq">E[U uten] = (1 − p) × U(W) + p × U(W − L) · E[U med full dekning] = U(W − P)</div>
<div class="where">Kjøp når E[U med] &gt; E[U uten]. Full dekning gir formuen W − P i begge tilstander.</div>
<div class="eq">P<sub>maks</sub> = W − CE = aktuarisk premie p × L + risikopremie</div>
<div class="where">Løs U(W − P<sub>maks</sub>) = E[U uten]. H2024 oppgave 11d: W = 1 000 000, p = 1 %, alt går tapt, √W: E[U] = 990, CE = 980 100 og P<sub>maks</sub> = 19 900 = 10 000 + 9 900.</div>
<div class="eq">Delvis dekning av andelen α: E[U] = (1 − p) × U(W − P) + p × U(W − L + αL − P)</div>
<div class="eq">Kritisk sannsynlighet: (1 − p*) × U(W) + p* × U(W − L) = U(W − P)</div>
<div class="where">Er tapet hele formuen og U(0) = 0, er p* = 1 − U(W − P)/U(W). Forsikringen lønner seg for p over p*.</div></div>
<div class="callout mech"><span class="h">Hvorfor er full dekning optimalt til aktuarisk pris, men ikke med påslag?</span>Til aktuarisk pris koster hver krone dekning det den forventes å gi tilbake: forventet formue er lik ved enhver dekningsgrad, og risikoen faller til null ved 100 %. En risikoavers tar all gratis risikoreduksjon: full dekning, med både √W og ln W (H2024 oppgave 11a og 11b). Med påslag blir en egenandel optimal, men halv dekning til full premie dobler prisen per krone dekning.</div>
<p><b>Prøve-og-feile er godkjent av sensor:</b> regn E[U uten] som anker, stryk alternativer som bryter en kjent grense (under aktuarisk premie, en terskel over en p som ga kjøp), og sett inn resten.</p>

<div class="worked"><span class="wh">Gjennomregnet: H2025 oppgave 13</span>
<p>Huset er verdt kr 9 000 000 og er all formuen din. Det brenner med sannsynlighet 1 % og blir verdiløst. U(W) = √W, og full dekning koster kr 160 000 [eksempeltall fra oppgaveteksten].</p>
<p><b>Steg 1: ankeret.</b> E[U uten] = 0,99 × √9 000 000 + 0,01 × √0 = 0,99 × 3 000 = 2 970,0000, og CE = 2 970² = 8 820 900.</p>
<p><b>Steg 2: kjøpe? (13.1)</b> √8 840 000 = 2 973,2137 &gt; 2 970,0000: ja. I kroner er P<sub>maks</sub> = 9 000 000 − 8 820 900 = 179 100, over 160 000.</p>
<p><b>Steg 3: laveste sannsynlighet (13.2).</b> (1 − p*) × 3 000 = 2 973,2137 gir p* = 0,0089, altså 0,89 %.</p>
<p><b>Steg 4: 50 % dekning til samme premie (13.3).</b> Formuen blir 8 840 000 om huset står og 4 500 000 − 160 000 = 4 340 000 om det brenner: 0,99 × 2 973,2137 + 0,01 × 2 083,2667 = 2 943,4816 + 20,8327 = 2 964,3143 &lt; 2 970,0000, så nei.</p>
<p><b>Kontroll:</b> √(9 000 000 − 179 100) = √8 820 900 = 2 970 ✓, og aktuarisk premie 90 000 pluss risikopremien 8 910 000 − 8 820 900 = 89 100 gir 179 100 ✓.</p>
<p><b>De gale tallene:</b> forventet formue, 8 910 000 mot 8 840 000, gir «nei» i 13.1. Terskler over 1 % (1,52 % og 2,01 %) strider mot kjøpet ved 1 %. Glemt premie i branntilstanden gir 2 964,6948 i 13.3, og «ja» der er 13.1 dratt videre.</p></div>

<p>Fakta: blant de vanlige privatforsikringene er bare ansvarsforsikring på bil lovpålagt, fordi skaden rammer tredjepart (H2025 oppgave 12). Moralsk hasard dempes med egenandel, ugunstig utvalg med tvang, som i folketrygden. Manglende diversifisering: arbeidsledighet rammer alle samtidig, så et privat selskap kan ikke bære den (H2019 oppgave 7c).</p>

<div class="callout warn"><span class="h">Feil som koster poeng</span>«Premien er høyere enn forventet skade, altså nei» er en gal regel, og den står som alternativ (H2024 oppgave 11c). Premien trekkes fra også i skadetilstanden. I nyttefunksjonen går formuen etter tapet, W − L, ikke tapet L. Regn hvert delspørsmål på nytt.</div>

<h3>Finansiell psykologi</h3>
<p>Et avvik (bias) er en systematisk feil i én retning, målt mot finansteorien.</p>
<table class="data">
<tr><th>Avvik</th><th>Mekanismen</th><th>Hva det koster</th></tr>
<tr><td>Overkonfidens</td><td>Du tror du vet mer enn markedet</td><td>Hyppig handel: kurtasje oppå et nullspill</td></tr>
<tr><td>Disposisjonseffekten</td><td>Kjøpskursen blir referansepunkt; tap gjør vondt å realisere</td><td>Gevinstskatt betalt tidlig, tapsfradrag hentet sent</td></tr>
<tr><td>Hjemmebias</td><td>Norske selskaper føles kjente og trygge</td><td>Dobbel eksponering mot norsk økonomi, der jobben din er</td></tr>
<tr><td>Mental regnskapsføring</td><td>Penger merkes etter kilde og formål</td><td>Dyr gjeld og sparepenger samtidig</td></tr>
<tr><td>Tapsaversjon</td><td>Et tap veier tyngre enn en like stor gevinst</td><td>For lav aksjeandel, forsikring av småtap</td></tr>
<tr><td>Flokkatferd</td><td>Du følger mengden</td><td>Kjøper på topp, selger på bunn</td></tr>
<tr><td>Forankring</td><td>Det første tallet styrer vurderingen</td><td>Kjøpskurs tatt som «riktig» pris</td></tr>
</table>
<p>Tapsaversjon er en preferanse, og disposisjonseffekten bygger på den; hjemmebias kan leses begge veier, og resten er feilslutninger. En feilslutning kan i prinsippet rettes med informasjon; en preferanse kan ikke være feil, bare dyr, og må omgås med en regel. Forelesningens regler: globalt indeksfond mot overkonfidens og hjemmebias, automatisk sparing mot forankring og flokkatferd, innlåst pensjonssparing (IPS, tjenestepensjon) mot svak selvkontroll, og en skriftlig plan der avviket er en preferanse. Standardvalg, som automatisk pensjonssparing, virker.</p>
<p>Kahnemans system 1, magefølelsen, er rask og følelsesstyrt; system 2 er langsom og analyserende. Magefølelsen er god der ledetrådene er valide (ekspertvurderinger), ikke når dagens aksjekurs leses som signal om framtidig kurs. Betenkningstid før forbrukslån (H2016 oppgave 3j) flytter valget fra system 1 til system 2.</p>

<div class="callout tip husk"><span class="h">Må kunne</span>
<ul><li>Sammenlign forventet nytte, aldri forventet formue: E[U uten] = (1 − p) × U(W) + p × U(W − L) mot U(W − P), der W er formuen, L tapet, p sannsynligheten og P premien.</li>
<li>Maksimal premie = W − CE, der W er formuen og sikkerhetsekvivalenten CE løser U(CE) = E[U uten] (med √W: CE = E[U uten]²); kontroll: aktuarisk premie (sannsynlighet × tap) pluss risikopremien E[W] − CE.</li>
<li>Til aktuarisk premie (sannsynlighet × tap) kjøper en risikoavers full dekning; ved delvis dekning trekkes premien fra også i skadetilstanden.</li>
<li>Kritisk sannsynlighet p* løser (1 − p*) × U(W) + p* × U(W − L) = U(W − P), med formue W, tap L og premie P; forsikringen lønner seg for p over p*.</li>
<li>Av de vanlige privatforsikringene er bare ansvarsforsikring på bil lovpålagt. Egenandel demper moralsk hasard, tvang demper ugunstig utvalg, og arbeidsledighet kan ikke forsikres privat fordi den rammer alle samtidig.</li>
<li>En feilslutning som overkonfidens kan i prinsippet rettes med informasjon (hjemmebias endret seg ikke i forsøket, så den kan også leses som en preferanse); en preferanse (tapsaversjon) må omgås med en regel, som en skriftlig plan. Betenkningstid flytter valget fra system 1, magefølelsen, til system 2, overveielsen.</li></ul></div>
`,
  checks: [
    {
      id: "kj11-s1",
      q: "Premien for full dekning er 50 % høyere enn forventet skade. Kan det være riktig for en risikoavers person å kjøpe?",
      options: [
        "Nei: forventet formue blir lavere med forsikringen enn uten den",
        "Ja: så lenge premien er under aktuarisk premie pluss hele risikopremien",
        "Ja: en risikoavers person kjøper alltid full dekning, uansett pris",
        "Bare med ln W; √W er for lite krum til å betale over forventet skade",
      ],
      answer: 1,
      explanation: "Forventet nytte avgjør, og en risikoavers betaler gjerne mer enn forventet skade, opp til maksimalpremien W − CE, som er aktuarisk premie pluss risikopremien. Svaret som sammenligner forventet formue, sier nei hver gang premien overstiger forventet skade, og det er alltid feil metode. Full dekning uansett pris gjelder ingen: det er til aktuarisk pris full dekning er optimalt, og både √W og ln W er risikoaverse.",
    },
    {
      id: "kj11-s2",
      q: "Hva er forelesningens hovedargument mot at en norsk arbeidstaker eier nesten bare norske aksjer?",
      options: [
        "Norske aksjer har lavere forventet avkastning enn utenlandske",
        "Det er overkonfidens: du tror du vet mer enn markedet gjør",
        "Jobben din er allerede en stor posisjon i norsk økonomi",
        "Hjemmebias er en preferanse, og preferanser er alltid feil",
      ],
      answer: 2,
      explanation: "Humankapitalen din er en stor, udiversifisert posisjon i norsk økonomi: går det dårlig, mister du jobben samtidig som aksjene faller. Norske aksjer legger mer av samme risiko oppå, så argumentet handler om samvariasjon, ikke om at norske selskaper er dårlige. En preferanse kan ikke være feil, bare dyr; det er derfor kostnaden er poenget.",
    },
    {
      id: "kj11-s3",
      q: "Betenkningstid før et forbrukslån utbetales er foreslått for å dempe impulslån. Hvordan forklarer Kahnemans system 1 og 2 at det kan virke?",
      options: [
        "Den flytter valget fra impulsen i system 1 til den rolige overveielsen i system 2",
        "Den flytter valget fra system 2 til system 1, så kunden stoler mer på magefølelsen",
        "Den gir system 1 tid til å vurdere lånet grundigere før kunden bestemmer seg",
        "Den virker ikke gjennom systemene, men fordi ventetiden gjør lånet dyrere",
      ],
      answer: 0,
      explanation: "System 1 er magefølelsen, rask og følelsesstyrt; system 2 er den langsomme, analyserende tenkningen økonomisk teori forutsetter. Betenkningstid lar beslutningen tas i ro, av system 2. Svaret der system 1 får tid til å vurdere grundigere, bytter om systemene: grundig vurdering er nettopp system 2. Ventetiden gjør heller ikke lånet dyrere; den endrer hvem av de to systemene som bestemmer.",
    },
  ],
  case: {
    id: "kj11-m1",
    topic: "Maksimal premie, halv dekning og kritisk sannsynlighet",
    minutes: 10,
    body: `<p>Eirik har en formue på kr 4 840 000, hvorav en hytte til kr 3 150 000. Med sannsynlighet 2 % brenner hytta i løpet av året og blir verdiløs, slik at formuen faller til kr 1 690 000. Nyttefunksjonen hans er U(W) = √W. Et forsikringsselskap tilbyr full dekning av hytta for en premie på kr 72 000. Alle tall er [eksempeltall].</p>`,
    ledd: [
      {
        id: "kj11-m1a",
        points: 3,
        q: `<p>Hva er den høyeste premien Eirik er villig til å betale for full dekning?</p>`,
        options: ["Kr 15 876", "Kr 63 000", "Kr 78 876", "Kr 191 664"],
        answer: 2,
        solution: `<p><b>Steg 1: ankeret.</b> E[U uten] = 0,98 × √4 840 000 + 0,02 × √1 690 000 = 0,98 × 2 200 + 0,02 × 1 300 = 2 156 + 26 = <b>2 182</b>.</p><p><b>Steg 2: sikkerhetsekvivalenten.</b> CE = 2 182² = <b>4 761 124</b>.</p><p><b>Steg 3: maksimalpremien.</b> P<sub>maks</sub> = 4 840 000 − 4 761 124 = <b>kr 78 876</b>.</p><p><b>Kontroll i nyttefunksjonen:</b> √(4 840 000 − 78 876) = √4 761 124 = 2 182, lik E[U uten] ✓. <b>Kontroll ved dekomponering:</b> aktuarisk premie 2 % × 3 150 000 = 63 000; forventet formue 4 840 000 − 63 000 = 4 777 000; risikopremien 4 777 000 − 4 761 124 = 15 876; og 63 000 + 15 876 = 78 876 ✓.</p>`,
        traps: [
          "Risikopremien alene, E[W] − CE = 4 777 000 − 4 761 124. Maksimalpremien er aktuarisk premie pluss risikopremien.",
          "Aktuarisk premie, 2 % × 3 150 000: det en risikonøytral ville betalt. En risikoavers betaler mer.",
          null,
          "Formuen i branntilstanden satt til null, som om hele formuen brant: E[U] = 0,98 × 2 200 = 2 156, CE = 4 648 336 og 4 840 000 − 4 648 336 = 191 664. Eirik har 1 690 000 igjen.",
        ],
      },
      {
        id: "kj11-m1b",
        points: 3,
        q: `<p>Selskapet tilbyr i stedet å dekke halvparten av hyttas verdi, kr 1 575 000 ved brann, for den samme premien på kr 72 000. Bør Eirik kjøpe denne polisen framfor å stå uforsikret?</p>`,
        options: [
          "Nei: forventet nytte med halv dekning er 2 175,64, under 2 182,00 uten forsikring",
          "Ja: full dekning til kr 72 000 lønner seg, og premien er den samme",
          "Nei: forventet nytte med halv dekning er 2 176,04, under 2 182,00 uten forsikring",
          "Ja: med påslag over aktuarisk pris er delvis dekning optimalt",
        ],
        answer: 0,
        solution: `<p><b>Steg 1: formuen i hver tilstand.</b> Hytta står: 4 840 000 − 72 000 = 4 768 000. Hytta brenner: 4 840 000 − 3 150 000 + 1 575 000 − 72 000 = 3 193 000. Premien er betalt i begge.</p><p><b>Steg 2: forventet nytte.</b> 0,98 × √4 768 000 + 0,02 × √3 193 000 = 0,98 × 2 183,5751 + 0,02 × 1 786,8968 = 2 139,90 + 35,74 = <b>2 175,64</b>.</p><p><b>Steg 3: sammenlign.</b> 2 175,64 er lavere enn 2 182,00 uten forsikring: <b>nei</b>.</p><p><b>Kontroll i kroner:</b> sikkerhetsekvivalenten er 2 175,6415² = 4 733 416, altså 27 708 under 4 761 124 uten forsikring ✓. Aktuarisk pris for halv dekning er 2 % × 1 575 000 = 31 500, og 72 000 er 2,29 ganger det, mot 72 000/63 000 = 1,14 ganger for full dekning.</p>`,
        traps: [
          null,
          "Konklusjonen fra full dekning dratt videre. Samme premie kjøper nå halvparten så mye dekning, og det må regnes på nytt.",
          "Premien glemt i branntilstanden: formuen der satt til 3 265 000, så E[U] = 2 139,90 + 0,02 × 1 806,93 = 2 176,04. Premien betales i begge tilstander.",
          "Resultatet om egenandel gjelder når prisen per krone dekning er den samme. Her stiger den fra 1,14 til 2,29 ganger aktuarisk pris.",
        ],
      },
      {
        id: "kj11-m1c",
        points: 3,
        q: `<p>Tilbake til full dekning for kr 72 000. Hva er den laveste brannsannsynligheten som gjør at Eirik vil kjøpe den? Alternativene er avrundet til to desimaler.</p>`,
        options: ["0,75 %", "1,82 %", "2,29 %", "3,86 %"],
        answer: 1,
        solution: `<p><b>Steg 1: høyresiden.</b> Med full dekning er formuen sikker: √(4 840 000 − 72 000) = √4 768 000 = <b>2 183,5751</b>, uavhengig av p.</p><p><b>Steg 2: indifferensen.</b> (1 − p*) × 2 200 + p* × 1 300 = 2 183,5751, altså 2 200 − 900 × p* = 2 183,5751 og p* = 16,4249/900 = 0,0182499, altså <b>1,82 %</b>.</p><p><b>Kontroll:</b> ved 1,82 % er E[U uten] = 0,9818 × 2 200 + 0,0182 × 1 300 = 2 159,96 + 23,66 = 2 183,62, og ved 1,83 % er den 2 159,74 + 23,79 = 2 183,53. Formuen med forsikring, 2 183,58, ligger mellom ✓. Retningen: Eirik kjøper ved 2 %, siden 72 000 er under maksimalpremien, så terskelen må ligge under 2 %, og de to alternativene over stryker seg selv.</p>`,
        traps: [
          "Totaltapsformelen p* = 1 − U(W − P)/U(W) = 1 − 2 183,5751/2 200 brukt, men Eirik mister ikke alt: U(W − L) = 1 300, ikke 0.",
          null,
          "Den risikonøytrale terskelen, der premien er lik forventet skade: 72 000/3 150 000. En risikoavers kjøper ved lavere sannsynlighet.",
          "Tapet satt inn i nyttefunksjonen i stedet for formuen etter tapet: √3 150 000 = 1 774,82 i stedet for 1 300 gir p* = 16,4249/425,18.",
        ],
      },
    ],
  },
});
