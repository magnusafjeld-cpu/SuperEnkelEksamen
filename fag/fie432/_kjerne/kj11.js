/* kj11 · Forsikring, forventet nytte og finansiell psykologi */
window.EDU_DATA.kjerne.push({
  id: "kj11",
  num: 11,
  title: "Forsikring, forventet nytte og finansiell psykologi",
  chapters: [17, 18],
  html: `
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
