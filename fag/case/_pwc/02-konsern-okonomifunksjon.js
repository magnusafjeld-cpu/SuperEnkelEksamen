/* PwC-case 2 av 6: effektivisering av økonomi- og støttefunksjoner i et
   sjømatkonsern, en av PwC Consultings egne tjenester i Norge, i en av bransjene
   de selv lister. Typen er kostnadskutt, men mekanismen er en annen enn i
   skadeforsikringscasen: gapet mot benchmark sitter i kompleksitet (fem
   ERP-systemer, sju kontoplaner, 9 000 leverandører), ikke i hvor fort folk
   jobber. Derfor må prosessene samordnes før de kan automatiseres, og det gir en
   J-kurve med en payback kandidaten regner ut. Gjennomføringen er en del av
   svaret: frigjort tid er ikke spart kostnad før stillingen er borte.
   «Les nøye»: materialet oppgir 180 ansatte, benchmarken teller årsverk (150).
   Detaljen biter i avgangstrinnet, der den som ikke regner om, får 54 i stedet
   for 45 og tror naturlig avgang dekker hele gapet. Motstanden i drøftingen er
   de daglige lederne som vil beholde økonomifolkene sine. Det er PwCs eget
   eksempelspørsmål om hindringer i veikartet.
   Payback når avgangen må gjøre jobben alene: 45,8 måneder med årssnitt, 46,0
   med gevinsten jevnt gjennom hvert år, og 46,6 når arbeidet fases ut gjennom
   år 2 (det minste av arbeid borte og avgang; år 2 gir da 19,3). Derfor
   «rundt 20 millioner i år 2» og «rundt 46» i trinn 6. Full takt fra år 3 er
   det som gir 150 millioner i år 3 og payback 42; full takt først i måned 36
   ville gitt 48. */
{
  id: "pwc-konsern-okonomifunksjon",
  label: "Sjømatkonsernet med sju økonomiavdelinger",
  type: "Kostnadskutt",
  nivå: "Middels",
  firma: "PwC",
  stil: "interviewer-led",
  minutter: 40,
  ch: [3, 5, 6, 8, 10],
  blurb: "Et sjømatkonsern med sju økonomiavdelinger skal kutte en firedel. Trener benchmarkgap, business case og gevinstrealisering uten oppsigelser.",
  prompt: `<p>Klienten er <b>Stormvær Sjømat</b>, et norsk sjømatkonsern med sju datterselskaper:
    settefisk, matfisk, slakteri, videreforedling, salg og eksport, brønnbåtrederi og eiendom.
    Selskapene er vokst fram eller kjøpt hver for seg, og hvert av dem har sin egen økonomiavdeling
    med egne rutiner.</p>
    <p>Den nye finansdirektøren vil ha kostnadene i økonomi- og støttefunksjonene ned med
    <b>rundt en firedel på tre år</b>. Hun har bedt PwC om å finne ut om det er realistisk, og hva
    som skal til.</p>
    <table class="data">
      <tr><th>Stormvær Sjømat</th><th class="n">I fjor</th></tr>
      <tr><td>Ansatte i konsernet</td><td class="n">2 400</td></tr>
      <tr><td>Ansatte i økonomi- og støttefunksjonene</td><td class="n">180</td></tr>
      <tr><td>Kostnad i økonomi- og støttefunksjonene</td><td class="n">200 mill. kr</td></tr>
      <tr><td>ERP-systemer i bruk</td><td class="n">5</td></tr>
      <tr><td>Kontoplaner</td><td class="n">7</td></tr>
    </table>
    <p><b>Viktige forhold:</b></p>
    <ul>
      <li>Økonomi- og støttefunksjonene omfatter fakturabehandling, regnskap og avstemming,
        rapportering, lønn og innkjøp.</li>
      <li>Konsernledelsen har lovet de tillitsvalgte at omstillingen skal skje uten oppsigelser.</li>
      <li>Rundt 10 prosent av de ansatte i økonomi- og støttefunksjonene slutter eller går av med
        pensjon hvert år.</li>
      <li>Klienten oppgir at brønnbåtrederiet er deleid med en lokal partner, og at felles tjenester
        dit må avtales og prises særskilt.</li>
      <li>Finansdirektøren skal legge fram planen for styret i desember.</li>
    </ul>
    <p><b>Klienten spør:</b> Er en firedel realistisk, og hvordan kommer vi dit?</p>`,
  bakgrunn: `<p>Casen speiler en av PwC Consultings egne tjenester i Norge, effektivisering av
    økonomi- og støttefunksjoner, i en av bransjene de selv lister: sjømat. Sjømatkonsern er ofte
    bygget gjennom oppkjøp av lokale selskaper langs kysten, og mange har beholdt en økonomiavdeling
    i hvert av dem. Lenge var det liten grunn til å samordne dem.</p>
    <p>Mekanismen er at gapet mot benchmark sitter i kompleksitet, ikke i hvor effektivt hver ansatt
    jobber. Folkene behandler like mange manuelle fakturaer per årsverk som benchmarken. De har bare
    nesten tre ganger så mange, fordi fem systemer, sju kontoplaner og 9 000 leverandører gjør det
    meste til håndarbeid. Da må prosessene samordnes før de kan automatiseres, og det gir en J-kurve:
    engangskostnad og dobbeltdrift først, gevinst senere, og en payback som er noe helt annet enn
    årlig takt.</p>
    <p>Det andre casen trener, er gevinstrealisering. Frigjort tid er ikke spart kostnad før
    stillingen er borte, og når konsernet har lovet at ingen skal sies opp, er naturlig avgang den
    viktigste spaken. «Les nøye»-detaljen sitter nettopp der: materialet teller ansatte, benchmarken
    teller årsverk, og den som ikke regner om, tror avgangen dekker hele gapet. Det er gjennomføringen
    som avgjør om tallet blir virkelighet, og det er den PwC lytter etter.</p>`,
  trinn: [
    {
      art: "forberedelse",
      sek: 300,
      tittel: "Fem minutter med materialet",
      sp: `<p>Du får materialet over på skjermen og <b>fem minutter</b> alene før intervjueren kobler
        seg på. Les det nøye, og skriv notatene du vil ha foran deg når samtalen starter.</p>
        <p class="tiny">Gode notater har fire ting: målet med klientens egne ord, tallene som betyr
        mest, det som mangler, og en foreløpig hypotese.</p>`,
      fasit: `<p>Slik kan notatene se ut etter fem minutter: stikkord, tall med enhet, og hullene
        markert. Legg merke til at det meste av materialet ikke er analyse, men rammer. De avgjør hva
        slags svar som i det hele tatt er mulig.</p>
      <ul>
        <li><b>Målet:</b> kostnadene i økonomi- og støttefunksjonene ned «rundt en firedel på tre år».
          En firedel av 200 mill. kr er rundt 50 mill. i året.</li>
        <li><b>Tallene:</b> 7 selskaper, 7 økonomiavdelinger · 180 ansatte · 200 mill. kr i fjor ·
          5 ERP-systemer · 7 kontoplaner · rundt 10 % avgang i året · 2 400 ansatte i konsernet.</li>
        <li><b>Rammene:</b> ingen oppsigelser, lovet de tillitsvalgte · rederiet deleid, egne avtaler ·
          styret i desember.</li>
        <li><b>Det som mangler:</b> hva «en firedel» måles mot, og om engangskostnader teller · hvor
          mye av de 200 som er lønn · fordelingen per prosess og selskap · en benchmark · hva det
          koster å komme dit.</li>
        <li><b>Hypotese:</b> sju avdelinger gjør det samme sju ganger. Gapet ligger i dupliseringen.
          Må testes prosess for prosess.</li>
        <li><b>Obs:</b> ingen oppsigelser og 10 % avgang. Hvor fort kan en gevinst i så fall tas ut?</li>
      </ul>
      <p>Hypotesen trenger ikke være riktig. Den skal være <i>testbar</i>, så du vet hva du leter
        etter når tallene kommer. Og legg merke til den siste linjen: to av de viktige forholdene sier
        lite hver for seg, men sammen reiser de et spørsmål du må ha svar på senere. Det er et eksempel
        på hva det betyr å lese «svært nøye».</p>`,
      krav: [
        { k: "kommunikasjon", t: "Du skriver målet med klientens egne ord: rundt en firedel, på tre år, i økonomi- og støttefunksjonene." },
        { k: "tall", t: "Du oversetter målet til kroner allerede i notatene: en firedel av 200 millioner er rundt 50 millioner i året." },
        { k: "tall", t: "Du noterer hvor hvert tall kommer fra og hva det måler, for eksempel om det gjelder konsernet eller økonomifunksjonene." },
        { k: "uklarhet", t: "Du markerer minst to hull du vil tette, for eksempel hva «en firedel» måles mot og hvor mye av kostnaden som er lønn." },
        { k: "struktur", t: "Du skriver en foreløpig hypotese om hvor kostnaden kommer fra, formulert slik at den kan testes mot tall senere." },
        { k: "nysgjerrighet", t: "Du kobler løftet om ingen oppsigelser til avgangen på 10 prosent, og noterer at de to sammen reiser et spørsmål om tempo." },
      ],
      felle: "Å bruke lesetiden på å skrive av materialet. Notater uten mål, hull og hypotese gir deg ingenting å styre etter når intervjueren begynner å spørre, og du ender med å reagere i stedet for å lede.",
    },
    {
      art: "oppklaring",
      sek: 180,
      tittel: "Hva vil du avklare?",
      sp: `<p>Intervjueren kobler seg på, hilser, og går rett på sak:</p>
        <p><b>«Før vi går i gang: hva vil du avklare, og hvilke antagelser gjør du?»</b></p>
        <p class="tiny">Tre til fem spørsmål er nok. Si hvorfor du spør.</p>`,
      fasit: `<p>I en kostnadscase er de gode avklaringene de som avgjør <i>hva slags gevinst som
        teller, og hvor fort den kan tas</i>. Et spørsmål som ikke kan endre analysen, er bortkastet
        tid, og tabellene kommer uansett.</p>
      <ul>
        <li><b>Hva betyr «rundt en firedel»?</b> Årlig kostnad i år 3 mot i dag, eller summen over tre
          år? Og regnes engangskostnadene med? Det avgjør om et program som koster penger først, i det
          hele tatt kan telle.</li>
        <li><b>Hvor mye av de 200 millionene er lønn, og hva er resten?</b> Er det meste lønn, må
          gevinsten tas i årsverk. Er det systemer og innleie, er det en innkjøpssak.</li>
        <li><b>Hva er handlingsrommet uten oppsigelser?</b> Naturlig avgang, ledige stillinger andre
          steder i konsernet, frivillige ordninger. Det avgjør tempoet.</li>
        <li><b>Hvilke bindinger finnes på systemsiden?</b> Lisensavtaler med restløpetid, og hva
          medeierskapet i rederiet betyr i praksis. Det avgjør rekkefølgen.</li>
        <li><b>Hvilket tjenestenivå må holdes?</b> Det setter gulvet for hvor fort bemanningen kan gå
          ned.</li>
      </ul>
      <p>Og én antagelse sagt høyt: <i>«Jeg antar at målet gjelder årlig kostnad i år 3, og at
        leverandørene fortsatt skal få betalt i tide.»</i> Da har intervjueren noe å korrigere, og du
        har noe å jobbe videre på.</p>
      <p><b>Svarene du får:</b></p>
      <ul>
        <li>Målet er årlig kostnad: i år 3 skal økonomi- og støttefunksjonene koste rundt
          <b>150 millioner</b>, mot 200 i dag. Engangskostnader kommer i tillegg, og styret vil vite når
          programmet har betalt seg tilbake.</li>
        <li>Av de 200 millionene er <b>150 lønn og sosiale kostnader</b>. Resten er systemer, lokaler og
          innleie. Finansdirektøren regner med at ett felles ERP-system vil koste omtrent det samme i
          drift som de fem gamle til sammen.</li>
        <li>Tjenestenivået skal holdes: leverandørene skal få betalt i tide, og månedsavslutningen skal
          ikke ta lenger tid enn i dag.</li>
        <li>Konsernet bygger et nytt settefiskanlegg og utvider slakteriet, og trenger rundt
          <b>20 nye prosjektøkonomer og controllere</b> de neste to årene. Stillingene belastes
          utbyggingsprosjektene og driften av anleggene, ikke økonomi- og støttefunksjonene, og blir
          faste når anleggene er i drift.</li>
        <li>Lisensavtalene for <b>to av de fem ERP-systemene</b> går ut om 18 måneder.</li>
        <li>Vi har benchmarkdata per prosess fra sammenlignbare konsern. Du får dem om litt.</li>
      </ul>`,
      krav: [
        { k: "uklarhet", t: "Du spør hva «rundt en firedel» måles mot: årlig kostnad i år 3, en sum over tre år, eller med engangskostnadene." },
        { k: "nysgjerrighet", t: "Du spør hvor mye av de 200 millionene som er lønn, fordi det avgjør om gevinsten må tas i årsverk." },
        { k: "nysgjerrighet", t: "Du spør hvilket handlingsrom som finnes uten oppsigelser, for eksempel ledige stillinger andre steder i konsernet." },
        { k: "uklarhet", t: "Du sier minst én antagelse høyt, for eksempel at tjenestenivået skal holdes." },
        { k: "kommunikasjon", t: "Du sier hva hvert spørsmål skal brukes til, i stedet for å lese opp en liste." },
      ],
      felle: "Å bruke avklaringene på å be om data, som tabeller per prosess og en benchmark, uten å avklare hva målet måles mot, hvor mye som er lønn og handlingsrommet uten oppsigelser. Dataene kommer uansett.",
    },
    {
      art: "struktur",
      sek: 270,
      tittel: "Hvordan vil du angripe dette?",
      sp: `<p><b>«Hvordan vil du angripe dette?»</b></p>
        <p class="tiny">Gi tilnærmingen din slik du ville tegnet den på arket, med en hypotese og hvor
        du starter.</p>`,
      fasit: `<p>Første grep er å gjøre målet konkret. Systemkostnaden faller ikke, så gevinsten må i
        hovedsak tas i lønn: <b>50 av 150 millioner er en tredjedel av lønnskostnaden</b>. Det er et
        stort tall, og det sier noe om hvor dypt analysen må gå.</p>
      <p>Så nedbrytningen. En liste over tiltak er ikke en struktur. Det som gjør den MECE, er en
        ligning for hva som driver arbeidet:</p>
      <div class="formula">
        <div class="eq">Kostnad = årsverk × kostnad per årsverk + systemer og annet</div>
        <div class="eq">Årsverk = volum × andel som håndteres manuelt × tid per manuell enhet</div>
        <div class="where">Den andre linjen er poenget. Den skiller <i>hvor mye arbeid som finnes</i>
          (volum og manuell andel) fra <i>hvor fort det gjøres</i> (tid per enhet). De to krever helt
          ulike tiltak, og et gap mot benchmark sier ikke av seg selv hvilken av dem som er problemet.</div>
      </div>
      <ul>
        <li><b>Hvor stort er gapet, og hvor sitter det?</b> Per prosess og per selskap, mot en
          benchmark for samme volum.</li>
        <li><b>Hva driver det?</b> Volum (kan det reduseres, for eksempel med færre leverandører og
          færre rapporter), manuell andel (systemer, kontoplaner, stamdata), tid per enhet (kompetanse,
          rutiner) og kostnad per årsverk.</li>
        <li><b>Hvilke grep lukker det?</b> Standardisere, samle i ett felles økonomisenter,
          automatisere, eventuelt sette ut. Hvert grep treffer først og fremst én av driverne.</li>
        <li><b>Hvordan tas gevinsten ut?</b> Engangskostnad og tidsplan, altså business casen. Folkene:
          avgang, flytting og de tillitsvalgte. Og risikoen for at gevinsten aldri blir tatt ut.</li>
      </ul>
      <p>Den siste grenen er den som skiller en PwC Consulting-case fra en ren analyse. En besparelse
        som ingen tar ut, finnes bare i regnearket.</p>
      <p><b>Hypotesen:</b> med fem ERP-systemer og sju kontoplaner tror jeg gapet sitter i
        transaksjonsprosessene, fakturabehandling og regnskap, mer enn i rapportering og lønn. Er det
        riktig, må prosessene samordnes før noe kan automatiseres, og da kommer gevinsten sent. Det som
        ville avkreftet det, er et gap som er jevnt fordelt over prosessene. <b>Jeg starter</b> med
        gapet prosess for prosess, og med fakturabehandlingen, fordi den som regel er den største
        transaksjonsprosessen.</p>
      <p class="tiny">Spør intervjueren hvordan du ville brukt KI i analysen, er ett konkret svar: la en
        modell sortere et utvalg manuelle fakturaer etter <i>hvorfor</i> de gikk manuelt, for eksempel
        manglende ordre, feil stamdata eller prisavvik. Da ser du årsakene før du velger grep.</p>`,
      krav: [
        { k: "struktur", t: "Du bryter årsverkene ned i mengden arbeid (volum, gjerne manuell andel) og tid per enhet, slik at mengden skilles fra farten." },
        { k: "struktur", t: "Du har en egen gren for gjennomføring, med minst to av: engangskostnad, tidsplan og hvordan gevinsten faktisk tas ut." },
        { k: "tall", t: "Du regner ut hva målet betyr for lønnen: 50 av 150 millioner er en tredjedel, siden systemkostnaden ikke faller." },
        { k: "uklarhet", t: "Du sier en hypotese som kan avkreftes, og hvilke tall som ville avkreftet den." },
        { k: "kommunikasjon", t: "Du sier hvor du starter og hvorfor, før du begynner å ramse opp tiltak." },
      ],
      felle: "Å strukturere som en liste over tiltak: sentralisere, sette ut, automatisere. Uten en nedbrytning av hva som driver arbeidet kan du ikke si hvilket tiltak som treffer, og uten en gren for gevinstuttak har du ikke svart på «hvordan kommer vi dit».",
    },
    {
      art: "exhibit",
      sek: 300,
      kort: "Benchmark",
      tittel: "Benchmarken per prosess",
      sp: `<p>Intervjueren deler skjermen: årsverk per prosess, mot en benchmark for sammenlignbare
        konsern med samme volum.</p>
        <p><b>«Hva ser du, og hva betyr det for målet på en firedel?»</b></p>
        <p>Og etter en stund: <b>«Finansdirektøren leser tabellen som at folkene hennes jobber for
        sakte. Har hun rett?»</b></p>`,
      figur: `<table class="data">
          <tr>
            <th>Prosess</th>
            <th class="n">Volum per år</th>
            <th class="n">Årsverk i dag</th>
            <th class="n">Benchmark, årsverk</th>
            <th>Nøkkeltall, i dag mot benchmark</th>
          </tr>
          <tr><td>Fakturabehandling</td><td class="n">200 000 fakturaer</td><td class="n">40</td><td class="n">15</td><td>80 % behandles manuelt, mot 30 %</td></tr>
          <tr><td>Regnskap og avstemming</td><td class="n">24 000 avstemminger</td><td class="n">35</td><td class="n">20</td><td>70 % avstemmes manuelt, mot 40 %</td></tr>
          <tr><td>Rapportering</td><td class="n">84 månedsrapporter</td><td class="n">25</td><td class="n">20</td><td>7 kontoplaner, mot 1</td></tr>
          <tr><td>Lønn</td><td class="n">28 800 lønnsslipper</td><td class="n">14</td><td class="n">12</td><td>3 lønnssystemer, mot 1</td></tr>
          <tr><td>Innkjøp</td><td class="n">30 000 innkjøpsordrer</td><td class="n">36</td><td class="n">33</td><td>9 000 aktive leverandører, mot 3 000</td></tr>
          <tr><td><b>Sum</b></td><td class="n"></td><td class="n"><b>150</b></td><td class="n"><b>100</b></td><td></td></tr>
        </table>
        <p class="tiny">Benchmark: sammenlignbare nordiske konsern, samme volum. Hos Stormvær koster
          et årsverk 1,0 million kroner med sosiale kostnader. 60 prosent av fakturaene kommer som EHF,
          mot 70 prosent i benchmarken.</p>`,
      fasit: `<p>Overskriften først, så beviset:</p>
      <p><i>«Målet er akkurat innen rekkevidde: gapet er 50 årsverk, altså 50 millioner og nøyaktig en
        firedel av 200, så hele gapet må lukkes. Men det sitter i hvor mye manuelt arbeid oppsettet
        skaper, ikke i hvor fort folk jobber.»</i></p>
      <p><b>Hvor gapet sitter.</b> 150 mot 100 årsverk. Fakturabehandling står for 25 av de 50 og
        regnskap for 15, altså <b>40 av 50, eller 80 prosent, i to prosesser</b>. Rapportering har 5,
        innkjøp 3 og lønn 2. De tre siste er nær benchmark, og ikke der du starter.</p>
      <p><b>Hvorfor det sitter der.</b> Regn på den manuelle delen:</p>
      <div class="formula">
        <div class="eq">I dag: 200 000 × 80 % = 160 000 manuelle fakturaer ÷ 40 årsverk = <b>4 000 per årsverk</b></div>
        <div class="eq">Benchmark: 200 000 × 30 % = 60 000 manuelle fakturaer ÷ 15 årsverk = <b>4 000 per årsverk</b></div>
        <div class="where">Samme mønster i avstemmingen: 16 800 manuelle ÷ 35 = 480 per årsverk, mot
          9 600 ÷ 20 = 480 i benchmarken.</div>
      </div>
      <p>Folkene er altså <i>nøyaktig like raske</i> som benchmarken per manuell enhet. De er for mange
        fordi de har nesten tre ganger så mange fakturaer å behandle for hånd. Og det er ikke fordi
        fakturaene kommer på papir eller som PDF: 60 prosent er EHF, mot 70 i benchmarken, og likevel
        går 80 prosent manuelt. Det manuelle arbeidet er å finne riktig leverandør blant 9 000, riktig
        konto i sju kontoplaner og en ordre å matche mot i fem systemer.</p>
      <p><b>Så hva.</b> Kutter du 50 årsverk i dag, ligger de 160 000 manuelle fakturaene der fortsatt,
        bare hos færre folk. Da kommer køen, purringene og en månedsavslutning som sprekker, altså
        nettopp tjenestenivået klienten sa skulle holdes. Rekkefølgen er gitt: samordne kontoplan,
        leverandørregister og fakturaflyt først, så ett system, så automatisering, og stillingene går i
        takt med at arbeidet forsvinner. Det koster penger før det sparer penger.</p>
      <p><b>Svaret til finansdirektøren:</b> «Nei. Per manuell faktura er folkene dine like raske som
        benchmarken, 4 000 i året. De er for mange fordi de har for mye manuelt arbeid, og det har de
        fordi alt finnes i sju utgaver.» Si det med tallet, ikke med høflighet. Det er tallet som gjør
        at hun tror på deg.</p>`,
      krav: [
        { k: "kommunikasjon", t: "Du sier overskriften før beviset: gapet er 50 årsverk, og hvor eller hvorfor det sitter, for eksempel i to prosesser eller i manuelt arbeid." },
        { k: "tall", t: "Du regner gapet om til kroner og holder det mot målet: 50 årsverk er 50 millioner, altså en firedel av 200." },
        { k: "tall", t: "Du regner manuelle fakturaer per årsverk for klienten og for benchmarken, og ser at begge er 4 000." },
        { k: "struktur", t: "Du skiller mengden manuelt arbeid fra farten det gjøres i, og sier at gapet ligger i mengden." },
        { k: "nysgjerrighet", t: "Du spør hva som skaper det manuelle arbeidet, og peker på systemene, kontoplanene eller leverandørregisteret." },
        { k: "kommunikasjon", t: "Du svarer finansdirektøren med tallet, ikke med høflighet: folkene er like raske, de har bare mer manuelt arbeid." },
      ],
      felle: "Å gi finansdirektøren rett fordi 40 mot 15 årsverk ser ut som lav produktivitet. Per manuell faktura er folkene like raske, 4 000 i året, så verken kutt eller produktivitetsprogram lukker gapet før det manuelle arbeidet er borte.",
    },
    {
      art: "regne",
      sek: 270,
      kort: "Payback",
      tittel: "Når har programmet betalt seg tilbake?",
      sp: `<p>Finansdirektørens team har laget et første anslag: felles kontoplan og leverandørregister
        først, så ett felles ERP-system innført i bølger, så automatisering av fakturaflyt og
        avstemming. Alle tall i millioner kroner.</p>
        <table class="data">
          <tr><th>Millioner kroner</th><th class="n">År 1</th><th class="n">År 2</th><th class="n">År 3</th><th class="n">År 4</th></tr>
          <tr><td>Engangskostnad: samordning, nytt ERP, automatisering</td><td class="n">−60</td><td class="n">−30</td><td class="n">0</td><td class="n">0</td></tr>
          <tr><td>Dobbeltdrift: gamle og nye systemer side om side</td><td class="n">0</td><td class="n">−10</td><td class="n">0</td><td class="n">0</td></tr>
          <tr><td>Gevinst: lavere lønnskostnad</td><td class="n">0</td><td class="n">25</td><td class="n">50</td><td class="n">50</td></tr>
        </table>
        <p><b>«Hvor mange måneder tar det før programmet har betalt seg tilbake, regnet fra
        oppstart?»</b></p>
        <p class="tiny">Regn som om kostnader og gevinster kommer jevnt gjennom hvert år. Si
        framgangsmåten før du sier tallet.</p>
        <p>Når du har svart, spør hun: <b>«Og hvis gevinsten kommer et år senere?»</b></p>`,
      svar: 42,
      enhet: "måneder",
      toleranse: 0.03,
      fasit: `<p>Legg det opp som akkumulert kontantstrøm, år for år. Det er J-kurven i tall:</p>
      <div class="formula">
        <div class="eq">År 1: −60 → akkumulert <b>−60</b></div>
        <div class="eq">År 2: −30 − 10 + 25 = −15 → akkumulert <b>−75</b>, bunnen av J-en</div>
        <div class="eq">År 3: +50 → akkumulert <b>−25</b></div>
        <div class="eq">År 4: +50 → akkumulert <b>+25</b>. Nullpunktet er når 25 av årets 50 er tjent
          inn, altså midt i året.</div>
        <div class="eq">Payback: 3,5 år = <b>42 måneder</b></div>
      </div>
      <p>Den raske feilen er å dele engangskostnad og dobbeltdrift, 100 millioner, på full årlig
        gevinst: 100 ÷ 50 = to år. Det er payback for et program der gevinsten kommer samme dag som
        pengene er brukt. Her kommer den et år senere og gradvis, og det koster <b>18 måneder</b>.</p>
      <p><b>Så hva.</b></p>
      <ul>
        <li>Målet på en firedel nås i år 3, slik finansdirektøren vil. Men programmet er ikke betalt
          tilbake før måned 42. Det er to ulike tall, og styret må høre begge.</li>
        <li>Styret må tåle å ligge <b>75 millioner</b> i minus etter to år før kurven snur.</li>
        <li><b>Sensitiviteten som betyr mest:</b> kommer gevinsten ett år senere, flytter payback seg
          fra 42 til <b>54 måneder</b>, og bunnen blir −100. Blir engangskostnad og dobbeltdrift
          20 prosent dyrere, 120 millioner, blir payback rundt 47 måneder. Tidspunktet for gevinsten
          betyr altså mer enn størrelsen på investeringen.</li>
      </ul>
      <p>Og gevinstraden er ikke en regnskapspost som kommer av seg selv. Den er 50 årsverk som faktisk
        må ut av lønningslistene. Om det går så fort, er neste spørsmål.</p>`,
      krav: [
        { k: "tall", t: "Du legger opp regnestykket år for år med akkumulert kontantstrøm, ikke som engangskostnad delt på årlig gevinst." },
        { k: "tall", t: "Du finner bunnen av J-kurven: 75 millioner i minus ved utgangen av år 2." },
        { k: "kommunikasjon", t: "Du skiller årlig takt fra payback: målet nås i år 3, men programmet er ikke betalt tilbake før midt i år 4." },
        { k: "tall", t: "Du gjør en sensitivitet med tall, for eksempel ett års forsinket gevinst (54 måneder) eller 20 prosent dyrere program." },
        { k: "uklarhet", t: "Du sier høyt at gevinstraden er et anslag som forutsetter at årsverkene faktisk blir tatt ut." },
      ],
      felle: "Å dele 100 millioner på 50 i året og svare 24 måneder. Det er payback for et program der gevinsten kommer samme dag som kostnaden, og det bommer med 18 måneder.",
    },
    {
      art: "regne",
      sek: 210,
      kort: "Avgang",
      tittel: "Hvor mye tar naturlig avgang ut?",
      sp: `<p><b>«Finansdirektøren vil holde løftet til de tillitsvalgte. Hun stopper alle
        nyansettelser i økonomi- og støttefunksjonene fra i dag, og erstatter ingen som slutter. Hvor
        mange årsverk er tatt ut på den måten etter tre år?»</b></p>
        <p class="tiny">Regn med at like mange slutter hvert år som i dag, og at de som blir, kan
        flyttes dit arbeidet er.</p>
        <p>Når du har svart, spør hun: <b>«Holder det for business casen, og hvor kommer resten
        fra?»</b></p>`,
      svar: 45,
      enhet: "årsverk",
      toleranse: 0.05,
      fasit: `<p>Tre ledd, og det andre er det mange hopper over:</p>
      <div class="formula">
        <div class="eq">Avgang: 10 % av 180 ansatte = 18 personer i året</div>
        <div class="eq">Men 180 ansatte er bare 150 årsverk, altså en snittstilling på fem sjettedeler:
          18 personer = <b>15 årsverk</b> i året</div>
        <div class="eq">Etter tre år: 3 × 15 = <b>45 årsverk</b>, fem færre enn gapet på 50</div>
        <div class="where">Kortere: 10 prosent av 150 årsverk. Materialet teller ansatte, benchmarken
          teller årsverk, og forskjellen er typisk deltid og delte roller i de små selskapene. Det er
          enhetsfellen fra kapittel 8, bare i et casemateriale i stedet for i en figur.</div>
      </div>
      <p>Den som regner 18 årsverk i året, får 54 og konkluderer med at naturlig avgang dekker hele
        gapet. Det riktige svaret sier det motsatte.</p>
      <p><b>Så hva.</b></p>
      <ul>
        <li><b>45 er et tak, ikke et anslag.</b> Det forutsetter at alle som slutter, kan stå uerstattet
          fra første dag. Men med finansdirektørens plan er arbeidet der fortsatt i år 1, så de som
          slutter da, må dekkes av innleie. Realistisk blir tallet lavere.</li>
        <li><b>Tempoet holder ikke for business casen.</b> Den forutsetter hele gevinsten fra år 3,
          altså 50 årsverk ute etter 24 måneder. Naturlig avgang gir 30 innen da. De 20 årsverkene som
          mangler, må komme fra andre spaker: de 20 nye stillingene i utbyggingsprosjektene og
          frivillige ordninger for dem som nærmer seg pensjon. Ellers må avgangen gjøre jobben alene.
          Da er gapet lukket først i måned 40. Gevinsten blir rundt 20 millioner i år 2, der både
          arbeidet som forsvinner og avgangen setter tak, og 37,5 i år 3, mot 25 og 50 i planen.
          Payback blir rundt 46 måneder, ikke 42.</li>
        <li><b>For de tillitsvalgte:</b> 50 årsverk er rundt 60 personer, ikke 50. Det er det tallet de
          kommer til å regne på.</li>
      </ul>
      <p>Dette er kjernen i gevinstrealisering: frigjort tid er ikke spart kostnad før stillingen er
        borte.</p>`,
      krav: [
        { k: "tall", t: "Du regner avgangen om til årsverk: 18 som slutter er 15 årsverk, fordi 180 ansatte bare er 150 årsverk." },
        { k: "tall", t: "Du sier at 45 årsverk er fem færre enn gapet på 50, så avgangen alene når ikke målet." },
        { k: "uklarhet", t: "Du sier at 45 er et tak, fordi de som slutter før arbeidet er borte, må erstattes eller dekkes av innleie." },
        { k: "tall", t: "Du holder svaret opp mot business casen: den trenger 50 årsverk ute etter 24 måneder, avgangen gir 30." },
        { k: "struktur", t: "Du foreslår andre spaker enn oppsigelser for resten, for eksempel de 20 nye stillingene i utbyggingsprosjektene." },
      ],
      felle: "Å regne de 18 som slutter som 18 årsverk. Da får du 54 og konkluderer med at naturlig avgang dekker hele gapet, men materialet teller ansatte og tabellen årsverk: svaret er 45, og målet nås ikke uten flere spaker.",
    },
    {
      art: "drøfting",
      sek: 270,
      kort: "Veikart",
      tittel: "Veikartet, og sju daglige ledere",
      sp: `<p><b>«Hvordan ville du gjennomført dette? Hva gjør dere først, hva kan gjøres uten
        oppsigelser, og hva er den største risikoen?»</b></p>
        <p>Når du er halvveis, legger intervjueren til: <b>«De sju daglige lederne i datterselskapene
        har allerede sagt fra: de vil ikke gi fra seg økonomifolkene sine. De mener fakturaene må
        behandles av folk som kjenner driften, for eksempel hvilken lokalitet og hvilken generasjon fisk
        kostnaden hører til. Hvordan kommer dere forbi det?»</b></p>`,
      fasit: `<p>Poenget først: <b>samordne før dere automatiserer, og ta ut gevinsten stilling for
        stilling fra første dag.</b> Automatiserer dere sju oppsett, får dere sju automatiserte
        oppsett.</p>
      <p><b>Veikartet, i tre faser:</b></p>
      <ul>
        <li><b>Måned 0–12, rydd og stopp.</b> Ansettelsesstopp med sentral godkjenning av alle
          stillinger, og innleie der arbeidet krever det. Felles kontoplan, med lokalitet og generasjon
          som faste dimensjoner. Leverandørregisteret vasket, og aktive leverandører ned fra 9 000 mot
          3 000. Krav om EHF med ordrenummer fra leverandørene, og ingen betaling uten innkjøpsordre.
          Valg av ERP-plattform. Målet for fasen: manuell andel i fakturabehandlingen ned fra 80 mot
          50 prosent. Det er 60 000 færre manuelle fakturaer, eller 15 årsverk, altså det avgangen gir
          på ett år. Da kan de som slutter, stå uerstattet allerede i år 1.</li>
        <li><b>Måned 12–24, ett system, ett senter og automatisering.</b> Første bølge på selskapene som
          bruker de to systemene der avtalene går ut om 18 måneder, så resten. Fakturabehandling og
          regnskap samles i ett felles økonomisenter, fordi 40 av de 50 årsverkene sitter der, og
          automatisk matching og avstemming slås på i hver bølge. Stillingene tas ut i takt med avgang
          og flytting, så gevinsten er i full takt fra år 3. Rederiet kobles på med egen avtale, siden
          medeieren må være med. Her ligger dobbeltdriften.</li>
        <li><b>Måned 24–36, hold gevinsten.</b> Budsjettene er kuttet, og frigjort tid skal ikke fylles
          opp igjen. Nå gir også KI-verktøy for kontering full effekt, fordi de lærer av data som er ført
          likt, og det gir en buffer mot at gevinsten glipper.</li>
      </ul>
      <p><b>Uten oppsigelser:</b> naturlig avgang gir 15 årsverk i året. Resten må komme fra flytting
        til de 20 nye stillingene i utbyggingsprosjektene, med opplæring, og fra frivillige ordninger
        for dem som nærmer seg pensjon. Flyttingen sparer konsernet penger fordi de stillingene ellers
        måtte vært fylt utenfra. Innleie som avsluttes, senker i tillegg den andre kostnadsposten. De tillitsvalgte skal inn fra første dag, med en omstillingsavtale: ingen
        oppsigelser, mot ansettelsesstopp og at folk tilbys stillinger i andre selskaper og
        oppgaver.</p>
      <p><b>Den største risikoen</b> er at gevinsten aldri blir tatt ut. Frigjort tid fylles med nye
        rapporter, lederne i datterselskapene ansetter igjen, og innleie blir fast. Grepene: budsjettene
        kuttes når en milepæl nås, ikke når folk slutter. Alle ansettelser i økonomi godkjennes
        sentralt. Gevinsten måles i årsverk og kroner, ikke i «timer spart», og hver gevinst har én
        navngitt eier.</p>
      <p><b>Svaret til de daglige lederne:</b> ta innvendingen på alvor, for den er delvis riktig.
        Kostnaden må føres på riktig lokalitet og generasjon, og det krever noen som kjenner driften.
        Men den kunnskapen trenger ikke sitte i sju økonomiavdelinger. Den kan bygges inn i prosessen:
        lokalitet og generasjon settes på innkjøpsordren når varen bestilles, og driftslederen
        godkjenner fakturaen i den digitale flyten, slik som i dag. Det som samles i senteret, er
        registrering, matching, bokføring og avstemming, og der sitter 40 av de 50 årsverkene.
        Controllerne, som faktisk bruker kunnskapen om driften, blir værende nær selskapene; rapportering
        står bare for 5 av de 50. Det som må sjekkes, er hvor mye av tiden i de lokale avdelingene som
        går til skjønn, og hvor mye som er rutine. To ukers tidsregistrering i to av selskapene gir
        svaret.</p>`,
      krav: [
        { k: "struktur", t: "Du prioriterer fakturabehandling og regnskap først, fordi 40 av de 50 årsverkene sitter der." },
        { k: "struktur", t: "Du bruker de to ERP-avtalene som går ut om 18 måneder til å bestemme hvem som går over først." },
        { k: "struktur", t: "Du tar de tillitsvalgte inn fra første dag med en konkret avtale, for eksempel ingen oppsigelser mot ansettelsesstopp og tilbud om nye stillinger." },
        { k: "uklarhet", t: "Du navngir én konkret hovedrisiko, som at gevinsten aldri tas ut eller at ERP-bølgene forsinkes, med ett konkret grep mot den." },
        { k: "nysgjerrighet", t: "Du tar imot de daglige ledernes innvending og sier hvor de har rett: kostnaden må føres på riktig lokalitet og generasjon." },
        { k: "struktur", t: "Du bygger driftskunnskapen inn i prosessen med minst to av: lokalitet og generasjon på ordren, godkjenning lokalt, rutinearbeidet samlet." },
      ],
      felle: "Å gi etter for de daglige lederne og la hvert selskap beholde hele økonomiavdelingen sin. Da blir fakturaflyten liggende i sju utgaver, og de 40 årsverkene i fakturabehandling og regnskap blir aldri frigjort.",
    },
    {
      art: "syntese",
      sek: 240,
      tittel: "Anbefalingen til styret",
      sp: `<p>Finansdirektøren skal til styret i desember. <b>«Gi meg anbefalingen din, slik du ville
        sagt den til styret. Du har ett minutt.»</b></p>
        <p>Midtveis avbryter hun: <i>«Styrelederen har allerede sagt at styret vil se hele gevinsten
        innen tolv måneder. Kan vi ikke bare komprimere planen?»</i></p>
        <p class="tiny">Skriv anbefalingen slik du ville sagt den, og ta med hvordan du svarer
        styrelederen.</p>`,
      fasit: `<p>Hele minuttet, topp-ned og med tall: svaret, tre grunner, største risiko og neste
        steg.</p>
      <blockquote>
        <p><b>«Ja, en firedel er realistisk: 50 millioner i året, i full takt fra år 3. Men det er et
        program, ikke et kutt, og det betaler seg tilbake etter rundt 42 måneder.</b>
        Tre grunner. Én: 40 av de 50 årsverkene i gapet sitter i fakturabehandling og regnskap, og
        folkene der er like raske som benchmarken. De har bare over dobbelt så mye manuelt arbeid,
        fordi alt finnes i fem systemer og sju kontoplaner. To: derfor må vi samordne før vi
        automatiserer. Det koster 100 millioner, og vi ligger 75 millioner i minus etter to år. Tre:
        gevinsten er ikke tatt før stillingene er borte. Avgangen gir 15 årsverk i året, så resten må
        komme fra flytting til utbyggingsprosjektene og frivillige ordninger. Største risiko er at
        frigjort tid aldri tas ut, så budsjettene kuttes når milepælene nås. Første steg er
        omstillingsavtalen med de tillitsvalgte, denne måneden.»</p>
      </blockquote>
      <p>Innvendingen kommer midtveis. Svaret på den er et eget, kort avsnitt:</p>
      <blockquote>
        <p>«Hele gevinsten på tolv måneder betyr at rundt 60 personer må ut, og avgangen gir bare 18. Det
        bryter løftet til de tillitsvalgte og setter betalingene og månedsavslutningen i fare. Det vi
        kan love, er opp til 15 millioner i årlig takt om tolv måneder, 30 prosent av målet, hvis
        hurtiggrepene i fakturaflyten virker. Resten krever ett ERP og automatisering og kommer i år 2
        og 3. Hva trenger styret å se om tolv måneder?»</p>
      </blockquote>
      <p>Tallet for tolv måneder er avgangen fra forrige regnetrinn: 15 årsverk. Og 15 årsverk i
        fakturabehandlingen er 15 × 4 000 = 60 000 færre manuelle fakturaer, altså fra 160 000 til
        100 000, eller fra 80 til 50 prosent manuelt. Det er mer enn business casen regnet med for
        år 1, som var null. Derfor står det «opp til», og virker hurtiggrepene, kommer også paybacken
        noen måneder før 42. Og det er en takt, ikke et uttak: når avgangen
        kommer jevnt, gir en takt på 15 millioner om tolv måneder rundt halvparten, 7,5 millioner, i
        selve budsjettåret. De resterende 35 millionene er de strukturelle.</p>
      <p>Legg merke til formen: <b>standpunkt, tre grunner med tall, største risiko og neste steg, på
        ett minutt.</b> Innvendingen får et eget, kort svar: hva som ikke går, hva som går, og et
        spørsmål tilbake. Svaret til styrelederen er ikke «nei». Det er et mindre ja, med en plan for
        resten.</p>`,
      krav: [
        { k: "kommunikasjon", t: "Du starter med et standpunkt på om en firedel er realistisk, når den nås, og payback, for eksempel rundt 42 måneder, eller 46 om avgangen står alene." },
        { k: "tall", t: "Du bygger grunnene på tall fra casen, for eksempel 40 av 50 årsverk i to prosesser og 15 årsverk i året fra avgang." },
        { k: "nysgjerrighet", t: "Du tar imot styrelederens krav uten å kapitulere eller avvise det, og sier hva det ville kreve, for eksempel rundt 60 personer ut på tolv måneder." },
        { k: "tall", t: "Du tallfester hva som kan leveres på tolv måneder, for eksempel opp til 15 millioner i årlig takt eller rundt 7,5 millioner i selve budsjettåret." },
        { k: "struktur", t: "Du skiller raske grep fra strukturelle, og sier at de strukturelle krever ett felles ERP og automatisering." },
        { k: "uklarhet", t: "Du spør hva styret faktisk trenger å se om tolv måneder, i stedet for å gjette hva de mener med «hele gevinsten»." },
      ],
      felle: "Å kapitulere og love hele gevinsten på tolv måneder. Det krever at rundt 60 personer går før arbeidet er borte og bryter løftet til de tillitsvalgte; den motsatte feilen er å avvise styret uten å tilby de opptil 15 millionene som kan tas.",
    },
  ],
}
