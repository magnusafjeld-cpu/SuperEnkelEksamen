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
