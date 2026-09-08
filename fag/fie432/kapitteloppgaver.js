/* ================== FIE432 · KAPITTELOPPGAVER ==================
   Flervalgsoppgaver i eksamensformat, ett sett per kapittel, å ta rett etter at
   kapitlet er lest. Fire alternativer, ett riktig, minuspoeng for feil.

   `traps` står parallelt med `options`: én tekst per galt alternativ som sier
   hvilken konkret feil det alternativet er laget av, og null på fasiten. Det er
   halve ferdigheten flervalg krever, og den eneste måten et galt svar lærer deg
   noe på.

   id-ene er lagringsnøkler for svarene. De må aldri endres.

   BYGGET FIL — ikke rediger her. Kapitlene ligger i _kapoppg/kN.js, og settes
   sammen med: python3 tools/bygg-kapoppgaver.py fie432
   ============================================================================ */
window.EDU_DATA = window.EDU_DATA || {};
window.EDU_DATA.chapterTasks = window.EDU_DATA.chapterTasks || {};

/* Kapittel 1 — Skattesystemet i Norge: satser, progressivitet og effektiv skatt */
window.EDU_DATA.chapterTasks[1] = {
  minutes: 20,
  tasks: [
    {
      id: "k1-1",
      topic: "Gjennomsnittsskatt",
      points: 3,
      body: "<p>Ida har kr 900 000 i lønn og ingen andre inntekter eller fradrag. Bruk 2026-satsene: skatt på alminnelig inntekt 22 %, trygdeavgift 7,6 % av personinntekt, minstefradrag 46 % av lønnen med tak på kr 95 700, personfradrag kr 114 540. Trinnskatten er 1,7 % fra 226 100, 4,0 % fra 318 300 og 13,7 % fra 725 050.</p><p>Hva er Idas gjennomsnittsskatt?</p>",
      options: ["24,46 %", "29,11 %", "37,98 %", "43,30 %"],
      answer: 1,
      solution: "<p><b>Steg 1 — fradragene.</b> 46 % av 900 000 er 414 000, altså over taket, så minstefradraget er 95 700. Samlede fradrag: 95 700 + 114 540 = 210 240. Alminnelig inntekt: 900 000 − 210 240 = <b>689 760</b>.</p><p><b>Steg 2 — skatt på alminnelig inntekt.</b> 689 760 × 22 % = <b>151 747,20</b>.</p><p><b>Steg 3 — trygdeavgift, av brutto lønn.</b> 900 000 × 7,6 % = <b>68 400</b>. Merk at fradragene ikke trekkes fra her.</p><p><b>Steg 4 — trinnskatten, bare inntekten inne i hvert trinn.</b> Trinn 1: (318 300 − 226 100) × 1,7 % = 1 567,40. Trinn 2: (725 050 − 318 300) × 4,0 % = 16 270. Trinn 3: (900 000 − 725 050) × 13,7 % = 23 968,15. Sum: <b>41 805,55</b>.</p><p><b>Steg 5 — samlet skatt og gjennomsnittet.</b> 151 747,20 + 68 400 + 41 805,55 = <b>261 952,75</b>. Gjennomsnittsskatten er 261 952,75 / 900 000 = <b>29,11 %</b>.</p><p><b>Kontroll med kortformen:</b> 29,6 % × 900 000 − 22 % × 210 240 + 41 805,55 = 266 400 − 46 252,80 + 41 805,55 = 261 952,75. ✓</p>",
      traps: [
        "Trinnskatten er glemt. Bare 22 %-delen og trygdeavgiften gir 220 147,20, altså 24,46 %.",
        null,
        "Skatten er delt på alminnelig inntekt (689 760) i stedet for brutto lønn. Dette er den vanligste enkeltfeilen på gjennomsnittsskatt.",
        "Marginalskatten brukt som om den gjaldt hele inntekten. Den gjelder bare den neste kronen.",
      ],
    },
    {
      id: "k1-2",
      topic: "Marginalskatt",
      points: 3,
      body: "<p>Samme situasjon som over: Ida har kr 900 000 i lønn, 2026-satser, og trinnskattens tredje trinn på 13,7 % gjelder fra 725 050.</p><p>Hva er Idas marginalskatt på den neste kronen hun tjener?</p>",
      options: ["29,11 %", "35,70 %", "43,30 %", "47,40 %"],
      answer: 2,
      solution: "<p>Marginalskatten er summen av de satsene som treffer den <i>neste</i> kronen. En krone til i lønn øker alminnelig inntekt med én krone (minstefradraget står på taket og vokser ikke lenger), øker personinntekten med én krone, og faller i trinn 3.</p><p>22 % + 7,6 % + 13,7 % = <b>43,3 %</b>.</p><p><b>Kontroll:</b> regn skatten ved 900 001 og trekk fra skatten ved 900 000. Differansen er 0,433 kr. ✓</p><p>Legg merke til avstanden til gjennomsnittsskatten på 29,11 %. De to kan aldri være like i et system med fradrag, fordi gjennomsnittet også inneholder de første kronene, og de er skattlagt lavere.</p>",
      traps: [
        "Gjennomsnittsskatten. Den svarer på et annet spørsmål: hvor stor andel av hele inntekten som går til skatt.",
        "Trygdeavgiften er glemt: 22 + 13,7. Den treffer personinntekten og er alltid med i marginalskatten på lønn.",
        null,
        "Toppmarginalskatten, som forutsetter trinn 5. Det slår først inn fra 1 467 200.",
      ],
    },
    {
      id: "k1-3",
      topic: "Verdien av et fradrag",
      points: 3,
      body: "<p>Ida har kr 500 000 i lønn og en marginalskatt på 33,6 %. Jonas har kr 1 200 000 og en marginalskatt på 46,4 %. Begge får et nytt fradrag på kr 10 000 i alminnelig inntekt. Begge har minstefradraget på taket.</p><p>Hvor mye lavere blir skatten for hver av dem?</p>",
      options: [
        "Kr 3 360 for Ida og kr 4 640 for Jonas",
        "Kr 2 200 for Ida og kr 4 640 for Jonas",
        "Kr 4 740 for begge",
        "Kr 2 200 for begge",
      ],
      answer: 3,
      solution: "<p>Et fradrag i alminnelig inntekt virker bare mot skatten på alminnelig inntekt. Trygdeavgiften regnes av personinntekten, og trinnskatten av personinntekten, og ingen av dem berøres av fradraget.</p><p>Begge sparer derfor 10 000 × 22 % = <b>kr 2 200</b>, uansett hvor høy marginalskatten er.</p><p>Dette er en av de mest kontraintuitive konsekvensene av at lønnsskatten har to grunnlag. I et system der alle skattene traff samme grunnlag, ville fradraget vært verdt marginalskatten. I Norge er et fradrag nesten alltid verdt 22 øre per krone.</p>",
      traps: [
        "Marginalskatten brukt på fradraget. Det ville vært riktig hvis alle tre skattene traff samme grunnlag, men bare 22-prosenten gjør det.",
        "Riktig beløp for Ida, men Jonas' marginalskatt brukt på ham. Fradraget er verdt det samme for begge.",
        "Toppmarginalskatten på 47,4 % brukt på fradraget.",
        null,
      ],
    },
    {
      id: "k1-4",
      topic: "Eierens samlede sats",
      points: 3,
      body: "<p>Et aksjeselskap tjener kr 100 før skatt og deler ut alt som er igjen etter selskapsskatt som utbytte til en personlig eier. Selskapsskatten er 22 % og eierskatten på utbytte er 37,84 %. Se bort fra skjerming.</p><p>Hvor stor andel av de opprinnelige 100 kronene forsvinner i skatt til sammen?</p>",
      options: ["51,52 %", "37,84 %", "59,84 %", "29,52 %"],
      answer: 0,
      solution: "<p><b>Steg 1 — selskapsleddet.</b> 100 × 22 % = 22 i selskapsskatt. Igjen: 78.</p><p><b>Steg 2 — eierleddet.</b> Eierskatten treffer det som faktisk deles ut, altså 78, ikke 100: 78 × 37,84 % = <b>29,5152</b>.</p><p><b>Steg 3 — samlet.</b> 22 + 29,5152 = <b>51,52 %</b>.</p><p><b>Kontroll den andre veien:</b> eieren sitter igjen med 0,78 × (1 − 0,3784) = 0,484848, altså 48,48 kr. 100 − 48,48 = 51,52. ✓</p><p>Tallet er ikke tilfeldig. Det skal ligne på den høyeste marginalskatten på lønn, 47,4 %, slik at det ikke lønner seg systematisk å ta lønnen sin ut som utbytte i stedet.</p>",
      traps: [
        null,
        "Bare eierskatten. Selskapsskatten på 22 er utelatt.",
        "De to satsene lagt sammen direkte. Eierskatten treffer bare de 78 som er igjen etter selskapsskatt, ikke hele 100.",
        "Bare eierleddet: 78 × 37,84 %. Selskapsskatten mangler.",
      ],
    },
    {
      id: "k1-5",
      topic: "Progressivitet",
      points: 3,
      body: "<p>Et land har en flat skattesats på 30 % [eksempeltall], men de første kr 150 000 av inntekten er skattefrie. Ola tjener kr 300 000 og har en gjennomsnittsskatt på 15,0 %.</p><p>Hva er gjennomsnittsskatten for Kari, som tjener kr 600 000?</p>",
      options: ["5,0 %", "15,0 %", "22,5 %", "30,0 %"],
      answer: 2,
      solution: "<p><b>Steg 1 — grunnlaget.</b> Bunnfradraget trekkes fra <i>inntekten</i>, ikke fra skatten: 600 000 − 150 000 = <b>450 000</b>.</p><p><b>Steg 2 — skatten.</b> 450 000 × 30 % = <b>135 000</b>.</p><p><b>Steg 3 — gjennomsnittet.</b> 135 000 / 600 000 = <b>22,5 %</b>.</p><p>Gjennomsnittsskatten stiger fra 15,0 % til 22,5 % når inntekten dobles, altså 7,5 prosentpoeng. <b>En flat sats med bunnfradrag er progressiv</b>, selv om marginalskatten er den samme 30 % for begge. Progresjonen kommer utelukkende fra bunnfradraget, som utgjør en fallende andel av inntekten når inntekten stiger.</p>",
      traps: [
        "Bunnfradraget trukket fra skatten i stedet for fra grunnlaget: 600 000 × 30 % − 150 000 = 30 000.",
        "Olas gjennomsnittsskatt, som står oppgitt i teksten.",
        null,
        "Den flate satsen brukt direkte. Da er bunnfradraget glemt, og hele progresjonen med det.",
      ],
    },
    {
      id: "k1-6",
      topic: "Effektiv skattesats",
      points: 3,
      body: "<p>Individ X har en brutto inntekt på kr 380 000, en skattepliktig inntekt på kr 300 000, og betaler kr 65 400 i skatt. Individ Y har en brutto inntekt på kr 950 000 og betaler kr 275 500 i skatt.</p><p>Hva er den effektive skattesatsen for individ X?</p>",
      options: ["17,2 %", "21,8 %", "24,6 %", "29,0 %"],
      answer: 0,
      solution: "<p>Effektiv skattesats er skatten delt på <b>brutto</b> inntekt. Det er hele poenget med begrepet: det skal fange opp at deler av inntekten er unntatt fra beskatning, og bruker du skattepliktig inntekt som nevner, forsvinner nettopp det du ville måle.</p><p>65 400 / 380 000 = <b>17,21 %</b>.</p><p>Til sammenligning har Y 275 500 / 950 000 = 29,0 %. Systemet er altså progressivt målt på denne måten. Merk at forskjellen mellom brutto og skattepliktig inntekt hos X, kr 80 000, er nøyaktig det som gjør den effektive satsen lavere enn den ville vært om alt var skattepliktig.</p>",
      traps: [
        null,
        "Skatten delt på skattepliktig inntekt (300 000) i stedet for brutto. Dette er nettopp feilen begrepet «effektiv skattesats» er laget for å unngå.",
        "Brutto inntekt redusert med personfradraget først: 65 400 / 265 460.",
        "Individ Y sin effektive skattesats.",
      ],
    },
  ],
};
