/* PwC Consulting, case 1 av 6: lønnsomhet i consumer markets, på Intro-nivå.
   Mekanismen er cost-to-serve i nettkanalen. Fri frakt, fri retur og høye returer
   i sko og klær gjør at en nettordre under 800 kroner taper penger, og veksten
   kommer i kanalen som tjener minst. «Les nøye»-detaljen er at tallene for
   nettbutikken er bestilt verdi før returer. Den som overser den, tar margin på
   varer som kommer tilbake, får +40 i stedet for −30 kroner per ordre, og leter
   etter feilen i butikkene. Formen følger PwCs egne eksempelcaser: skriftlig
   materiale, lesetid, og spørsmål fra en engasjementsleder i fast rekkefølge, med
   tiltak, risiko og KI før anbefalingen. Motstanden kommer to ganger: fra
   nettsjefen i strukturen, og mot fraktgebyrer i syntesen. */
{
  id: "pwc-sportskjede-nettkanal",
  label: "Sportskjeden som selger mer og tjener mindre",
  type: "Lønnsomhet",
  nivå: "Intro",
  firma: "PwC",
  stil: "interviewer-led",
  minutter: 35,
  ch: [3, 4, 5, 8, 9, 10],
  blurb: "Lønnsomhetscase i PwCs format, med lesetid og skriftlig materiale: en sportskjede vokser på nett mens resultatet faller. Trener å lese materialet nøye, finne hvor fallet sitter, og stå i motstand når du anbefaler.",
  prompt: `<p>Klienten er <b>Vidde Sport</b>, en norsk sportskjede som selger sko, klær og utstyr
    til trening og friluftsliv. Kjeden har <b>60 butikker</b> fra Kristiansand til Tromsø og en
    nettbutikk.</p>
    <p>Salget har vokst begge de to siste årene, drevet av nettbutikken, men driftsresultatet har
    falt fra <b>110 til 30 millioner kroner</b>, og driftsmarginen fra rundt <b>6 til
    1,5 prosent</b>. Styret vil ha en forklaring og en plan før budsjettet for neste år er
    ferdig.</p>
    <table class="data">
      <tr><th>Millioner kroner</th><th class="n">2023</th><th class="n">2025</th></tr>
      <tr><td>Omsetning i butikkene</td><td class="n">1 650</td><td class="n">1 500</td></tr>
      <tr><td>Salg i nettbutikken</td><td class="n">210</td><td class="n">700</td></tr>
      <tr><td>Driftsresultat</td><td class="n">110</td><td class="n">30</td></tr>
    </table>
    <p class="tiny">Butikktallene er hentet fra regnskapet. Tallene for nettbutikken er fra
    nettavdelingens månedsrapport og viser bestilt verdi før returer.</p>
    <p><b>Viktige forhold:</b></p>
    <ul>
      <li>Nettbutikken har fri frakt og fri retur på alle ordrer, uansett beløp. Det har de to
        største konkurrentene også.</li>
      <li>Butikkene og nettbutikken har samme sortiment og samme priser.</li>
      <li>Nettordrene plukkes og sendes fra et eget lager på Gardermoen. Butikkene tar verken imot
        nettordrer til henting eller returer fra nett.</li>
      <li>Kundeklubben har 450 000 medlemmer, og nesten alle kjøp på nett gjøres innlogget.</li>
    </ul>
    <p><b>Klienten spør:</b> Hvorfor tjener vi mindre når vi selger mer, og hva bør vi gjøre med
    det?</p>`,
  bakgrunn: `<p>Casen er konstruert, men settingen er hentet fra PwC Consultings egen liste.
    Consumer markets er en av bransjene, og blant tjenestene er operasjonell forbedring, styring og
    innsikt, og data og AI. En kjede som vokser på nett og tjener mindre, treffer alle tre.</p>
    <p>Mekanismen heter <i>cost-to-serve</i>: hva det koster å levere én ordre til én kunde. I
    butikken bærer kunden varen hjem selv. På nett betaler kjeden frakt, plukk og pakk og betaling
    for hver ordre, uansett hvor liten den er, og i sko og klær kommer mye tilbake fordi kunden
    ikke fikk prøvd varen. Da finnes det en kurvstørrelse der ordren går i null, og veksten kan
    komme akkurat under den. Her taper snittordren på nett 30 kroner, mens et butikkjøp tjener 85.</p>
    <p>Detaljen du måtte lese nøye, er at tallene for nettbutikken er bestilt verdi før returer.
    Bestilt verdi er et vanlig tall å styre etter i netthandel, fordi det kommer først og vokser
    raskest. Men marginen tjenes bare på det kunden beholder. Casen er bygget slik at den som
    overser linjen under tabellen, finner en nettordre som tjener 40 kroner og leter etter feilen i
    butikkene.</p>
    <p>Det som gjør dette til en PwC-case og ikke bare en lønnsomhetscase, er de siste trinnene:
    hvilke tiltak, med hvilken risiko, hvordan KI brukes i analysen, og om anbefalingen tåler
    innvendingen om at kundene går til konkurrenten. PwC skriver selv at de ser etter hvordan du
    tar imot veiledning og ny informasjon. En anbefaling uten en test og uten et nytt styringsmål er
    halv.</p>`,
  trinn: [
    {
      art: "forberedelse",
      sek: 300,
      tittel: "Lesetid: fem minutter med materialet",
      sp: `<p>Du får materialet over på forhånd og har <b>fem minutter</b> alene før intervjueren
        kommer inn i Teams-møtet. Les det nøye, og skriv notatene du vil ha foran deg i
        samtalen.</p>
        <p>Gode notater etter lesetiden har fire ting:</p>
        <ul>
          <li>målet, med klientens egne ord</li>
          <li>tallene som betyr mest, med endringene regnet ut</li>
          <li>det som mangler</li>
          <li>en foreløpig hypotese</li>
        </ul>`,
      fasit: `<p><b>Eksempelnotater etter fem minutter</b>, i stikkordsform slik de ser ut på
        arket:</p>
      <ul>
        <li><b>Mål:</b> «Hvorfor tjener vi mindre når vi selger mer, og hva bør vi gjøre med det?»
          Styret vil ha forklaring <i>og</i> plan før budsjettet.</li>
        <li><b>Resultat:</b> 110 → 30 mill. = −80, nesten tre firedeler borte. Margin ca. 6 → 1,5 %.</li>
        <li><b>Butikk:</b> 1 650 → 1 500 = −150, −9 %. Fra regnskapet.</li>
        <li><b>Nett:</b> 210 → 700, over tre ganger. Kilde: nettavdelingens månedsrapport.</li>
        <li><b>Forhold som betyr noe:</b> fri frakt og retur på alt, konkurrentene også · samme pris
          og sortiment → pris er neppe svaret · eget lager på Gardermoen, ingen henting eller retur
          i butikk · 450 000 i klubben, innlogget → data per kunde.</li>
        <li><b>Mangler:</b> resultat per kanal · hvor mye som kommer i retur · om nettveksten er tatt
          fra butikkene · om butikkostnadene er faste · konkurrentenes tall.</li>
        <li><b>Hypotese:</b> nettet tjener mindre per salgskrone enn butikkene, så resultatet faller
          når salget flytter dit. Motbevises hvis en nettordre tjener like mye som et butikkjøp.</li>
      </ul>
      <p><b>Sterkt mot middels:</b> et middels notat skriver av tallene. Et sterkt notat har regnet
        ut endringene, skrevet hva hvert tall faktisk måler, og har en hypotese som ett tall kan
        motbevise.</p>`,
      krav: [
        { k: "kommunikasjon", t: "Du skriver målet med klientens egne ord: hvorfor tjener vi mindre når vi selger mer, og hva bør vi gjøre." },
        { k: "tall", t: "Du regner ut endringene i lesetiden: resultatet ned 80 millioner, butikkene ned 150, nettet over tre ganger." },
        { k: "uklarhet", t: "Du noterer hvor hvert tall i tabellen kommer fra og hva det måler, ikke bare selve tallet." },
        { k: "uklarhet", t: "Du skriver ned hva som mangler, minst om det finnes et resultat per kanal." },
        { k: "struktur", t: "Du skriver en foreløpig hypotese som ett tall kan motbevise, ikke en liste over mulige årsaker." },
      ],
      felle: "Å bruke lesetiden på å lese materialet flere ganger i stedet for å skrive. Da har du verken regnede endringer eller en hypotese foran deg når intervjueren begynner, og du leser høyt fra arket i stedet for å tenke.",
    },
    {
      art: "oppklaring",
      sek: 180,
      tittel: "Hva vil du avklare?",
      sp: `<p>Intervjueren kommer inn, hilser og sier: <i>«Før vi går i gang: hva vil du avklare,
        og hvilke antagelser gjør du?»</i></p>
        <p class="tiny">Tre til fem spørsmål er nok. Si hva svaret på hvert av dem skal brukes
        til.</p>`,
      fasit: `<p>Det første spørsmålet er det som avgjør hvor du kan lete: <b>finnes det et
        resultat per kanal?</b> Resultatet har falt 80 millioner i et selskap med to kanaler. Uten
        tallene per kanal kan du ikke si hvor fallet sitter.</p>
      <p>Tre til fem spørsmål er nok, og hvert av dem skal ha en grunn:</p>
      <ul>
        <li><b>«Har dere resultat per kanal, eller føres kostnadene samlet?»</b> Avgjør om du kan
          lese svaret eller må bygge det selv.</li>
        <li><b>«Hvor mye av det som bestilles på nett, kommer i retur?»</b> Med fri retur på alle
          ordrer er returandelen den største ukjente i hva en nettordre koster.</li>
        <li><b>«Har priser, kampanjer eller bruttomargin endret seg?»</b> Er de stabile, kan du
          legge pris til side før du strukturerer.</li>
        <li><b>«Har butikkenes kostnader fulgt omsetningen ned?»</b> Husleie og lønn er ofte faste
          på kort sikt. Da faller resultatet med hele bruttomarginen på hver krone butikkene mister,
          ikke bare med driftsmarginen.</li>
        <li><b>Antagelsen, sagt høyt:</b> «Jeg antar at det ikke er engangsposter i noen av årene,
          og at hovedkontorets kostnader er omtrent uendret. Stemmer det?»</li>
      </ul>
      <p><b>Svarene du får:</b></p>
      <ul>
        <li>Bruttomarginen på varene er rundt <b>40 prosent</b> i begge kanaler og har ligget
          stabilt. Priser og kampanjer er som før.</li>
        <li>Det finnes <b>ikke</b> resultat per kanal. Kostnadene føres samlet, og nettavdelingen
          måles på salg.</li>
        <li>Lønn og husleie i butikkene har ligget flatt, rundt <b>375 millioner</b> i året. Det
          samme gjelder felleskostnadene på hovedkontoret. Ingen engangsposter.</li>
        <li>Fri frakt og fri retur har gjeldt hele perioden, og snittordren og fraktavtalene på nett
          er omtrent som i 2023. Veksten kom etter en ny app i 2024 og et markedsbudsjett som ble
          flyttet fra aviser og TV til nett.</li>
        <li>Returtallene har nettavdelingen per kategori. Du får dem om litt.</li>
        <li>De to største konkurrentene melder også om svakere marginer, men ingen av dem har falt
          like mye.</li>
      </ul>
      <p>Legg merke til hva svarene gjør: pris og engangsposter er ute, butikkenes kostnader ligger
        fast, og ingen har regnet på kanalene hver for seg. Det er der casen går videre.</p>`,
      krav: [
        { k: "nysgjerrighet", t: "Du spør om det finnes resultat per kanal, og sier at fallet ikke kan plasseres uten det." },
        { k: "nysgjerrighet", t: "Du spør hvor stor andel av nettordrene som kommer i retur, fordi fri retur gjør returene til en kostnad på hver ordre." },
        { k: "struktur", t: "Du spør om minst én av to ting: om pris og bruttomargin har endret seg, eller om butikkenes kostnader ligger fast." },
        { k: "uklarhet", t: "Du sier minst én antagelse høyt, for eksempel at det ikke er engangsposter i noen av årene." },
        { k: "kommunikasjon", t: "Du sier hva hvert spørsmål skal brukes til, i stedet for å lese opp en liste." },
      ],
      felle: "Å spørre bredt om markedet og konkurrentene før du har spurt om resultat per kanal. Fallet sitter et sted inne i ett selskap med to kanaler, og det er der de første spørsmålene hører hjemme.",
    },
    {
      art: "struktur",
      sek: 240,
      tittel: "Hvordan vil du angripe dette?",
      sp: `<p>Intervjueren: <i>«Hvordan vil du angripe dette? Si hvor du starter.»</i></p>
        <p>Mens du legger fram, skyter hun inn: <i>«Nettsjefen mener for øvrig at nettet er
        kjedens mest lønnsomme kanal, fordi det ikke har husleie eller butikkansatte.»</i></p>
        <p class="tiny">Ta med hvordan du svarer henne, og avslutt med hypotesen din.</p>`,
      fasit: `<p>Start med en identitet, ikke en temaliste. Kjeden har to kanaler og ett felles
        hovedkontor, så resultatet deler seg av seg selv:</p>
      <div class="formula">
        <div class="eq">Driftsresultat = butikkenes bidrag + nettkanalens bidrag − felleskostnader</div>
        <div class="where">Leddene summerer til resultatet, så de er MECE av konstruksjon.
          Felleskostnadene er flate, så fallet på 80 millioner må ligge i de to første
          leddene.</div>
      </div>
      <ul>
        <li><b>Butikkene:</b> omsetning × bruttomargin − kortgebyr − lønn og husleie. Omsetningen
          har falt 150 millioner, mens lønn og husleie ligger fast på 375. Hver tapt krone koster
          40 øre i resultat.</li>
        <li><b>Nettkanalen:</b> antall ordrer × bidrag per ordre. Bidraget er bruttofortjenesten per
          ordre, minus alt som følger ordren: frakt, plukk og pakk, retur og betaling. Det er
          <i>cost-to-serve</i>, og det er denne grenen jeg vil gå dypest i.</li>
        <li><b>Felleskostnader:</b> flate. Legges bort, sammen med pris, fordi bruttomarginen er
          stabil og prisene er like i begge kanaler.</li>
      </ul>
      <p><b>Svaret til nettsjefen:</b> <i>«Det kan godt stemme, og det er akkurat det jeg vil teste
        først. Nettet slipper husleie og butikkansatte, men betaler frakt, pakking og retur for
        hver eneste ordre. Jeg vil sammenligne hva ett kjøp koster å betjene i hver kanal. Og
        nettavdelingen måles på salg, ikke på hva salget tjener, så ingen har regnet på det
        ennå.»</i> Du verken godtar eller avviser påstanden. Du gjør den til en test,
        og du sier hvilket tall som avgjør den.</p>
      <p><b>Hypotesen:</b> resultatet faller fordi salget flytter seg fra en kanal som tjener penger
        på hvert kjøp, til en som tjener lite eller ingenting per ordre, mens husleien og lønnen i
        butikkene blir liggende. Jeg starter i nettkanalen, per ordre, fordi det er der veksten er,
        og fordi ingen har regnet på den.</p>
      <p><b>Sterkt mot middels:</b> et middels svar deler i inntekter og kostnader for hele
        kjeden. Pris er urørt og salget har vokst, så det treet peker ingen steder. Et sterkt svar
        deler på kanal først, fordi det er der spredningen er.</p>`,
      krav: [
        { k: "struktur", t: "Du deler driftsresultatet i butikkenes bidrag, nettkanalens bidrag og felleskostnader, slik at leddene summerer til resultatet." },
        { k: "struktur", t: "Du bryter nettkanalen ned til antall ordrer ganger bidrag per ordre, der bidraget er margin minus kostnadene som følger ordren." },
        { k: "struktur", t: "Du legger pris til side og sier hvorfor: bruttomarginen er stabil, og prisene er like i begge kanaler." },
        { k: "nysgjerrighet", t: "Du tar nettsjefens påstand som en hypotese og sier hvordan den testes: hva ett kjøp koster å betjene i hver kanal." },
        { k: "kommunikasjon", t: "Du sier alle hovedgrenene først, før du går i dybden på noen av dem." },
        { k: "struktur", t: "Du sier hvilken gren du starter i, og begrunner valget med noe fra casen, for eksempel at veksten ligger der." },
      ],
      felle: "Å godta at nettet er mest lønnsomt fordi det slipper husleie. Da leter du etter feilen i butikkene og overser kostnadene som følger hver eneste nettordre.",
    },
    {
      art: "exhibit",
      sek: 300,
      tittel: "Ett kjøp i hver kanal",
      kort: "Per ordre",
      sp: `<p>Intervjueren deler skjermen: <i>«Nettavdelingen og controlleren har satt sammen
        dette for oss. Øverst er ett kjøp i snitt i hver kanal i fjor, nederst returene i
        nettbutikken per kategori.»</i></p>
        <p><b>«Hva ser du, og hva betyr det?»</b></p>`,
      figur: `<table class="data">
          <tr><th>Ett kjøp i snitt, 2025</th><th class="n">Butikk</th><th class="n">Nett</th></tr>
          <tr><td>Snittkurv, kroner</td><td class="n">600</td><td class="n">700</td></tr>
          <tr><td>Bruttomargin</td><td class="n">40 %</td><td class="n">40 %</td></tr>
          <tr><td>Returandel, av bestilt verdi</td><td class="n">–</td><td class="n">25 %</td></tr>
          <tr><td>Betalingsgebyr, kroner</td><td class="n">5</td><td class="n">20</td></tr>
          <tr><td>Frakt til kunden, kroner</td><td class="n">–</td><td class="n">90</td></tr>
          <tr><td>Plukk og pakk, kroner</td><td class="n">–</td><td class="n">50</td></tr>
          <tr><td>Returfrakt og returhåndtering, kroner</td><td class="n">–</td><td class="n">80</td></tr>
          <tr><td>Lønn og husleie i butikk, kroner</td><td class="n">150</td><td class="n">–</td></tr>
        </table>
        <p class="tiny">Kostnadene er snitt per kjøp eller ordre. Returfrakt og returhåndtering er
        fordelt på alle nettordrene, også dem som ikke returneres, og inkluderer nedskrivning av
        varer som ikke kan selges som nye. Varetransport til butikkene og husleien for lageret på
        Gardermoen ligger i felleskostnadene. Tallene for nettbutikken følger nettavdelingens
        rapport.</p>
        <table class="data">
          <tr><th>Nettbutikken per kategori, 2025</th><th class="n">Andel av bestilt verdi</th><th class="n">Returandel</th></tr>
          <tr><td>Sko</td><td class="n">25 %</td><td class="n">40 %</td></tr>
          <tr><td>Klær</td><td class="n">45 %</td><td class="n">30 %</td></tr>
          <tr><td>Utstyr</td><td class="n">30 %</td><td class="n">5 %</td></tr>
          <tr><td><b>Nett i alt</b></td><td class="n"><b>100 %</b></td><td class="n"><b>25 %</b></td></tr>
        </table>`,
      fasit: `<p>Si overskriften først. Her er den:</p>
      <p><i>«Et butikkjøp tjener penger etter butikkens egne kostnader. En nettordre bærer i snitt
        240 kroner i kostnader som følger ordren, og frakt, plukk og pakk, 140 av dem, er de samme
        uansett størrelse. Returene er nesten bare sko og klær.»</i></p>
      <p><b>Butikkjøpet:</b></p>
      <div class="formula">
        <div class="eq">600 × 40 % = 240 kroner i bruttofortjeneste</div>
        <div class="eq">240 − 5 − 150 = <b>85 kroner per kjøp</b>, rundt 14 prosent av kjøpet</div>
        <div class="where">De 150 kronene er lønn og husleie: 375 millioner delt på 2,5 millioner
          kjøp. De er faste. De forsvinner ikke når et kjøp flytter til nett.</div>
      </div>
      <p><b>Nettordren:</b> kostnadene som følger ordren, er 20 + 90 + 50 + 80 = <b>240 kroner</b>,
        mot 5 + 150 = 155 per kjøp i butikken. Nettet slipper husleie, men betaler mer per ordre enn
        butikken bruker per kjøp. Nettsjefens argument så bare på én linje i tabellen.</p>
      <p>Og legg merke til <i>hvordan</i> kostnadene oppfører seg. Frakt, plukk og pakk følger
        ordren, ikke beløpet: de koster omtrent det samme for en ordre på 300 kroner som for en på
        3 000. Små ordrer er derfor der det gjør mest vondt.</p>
      <p><b>Returene:</b> vekt returandelen med andelen av salget.</p>
      <div class="formula">
        <div class="eq">Sko 25 % × 40 % = 10 · Klær 45 % × 30 % = 13,5 · Utstyr 30 % × 5 % = 1,5 prosentpoeng</div>
        <div class="where">Sum 25, som er returandelen for hele nettet. Sko og klær står for 23,5 av
          de 25, altså <b>94 prosent av returene</b>. Returene handler om størrelse og passform,
          altså om varer kunden ikke fikk prøvd.</div>
      </div>
      <p><b>Så hva, og hva du vil vite videre:</b> det neste er å regne hva en nettordre faktisk
        sitter igjen med. Og siden kostnadene følger ordren og ikke beløpet, vil jeg se hvordan
        ordrene fordeler seg på kurvstørrelse.</p>
      <p><b>Sterkt mot middels:</b> et middels svar ser at nettet mangler husleie og kaller det
        billigst. Et sterkt svar summerer linjene, ser at nettets kostnader følger ordren mens
        butikkens ligger fast, og spør etter fordelingen på kurvstørrelse før intervjueren tilbyr
        den.</p>`,
      krav: [
        { k: "kommunikasjon", t: "Du sier overskriften først, før du leser opp tall fra tabellene." },
        { k: "tall", t: "Du regner ut at et butikkjøp gir rundt 85 kroner etter kortgebyr, lønn og husleie." },
        { k: "tall", t: "Du summerer kostnadene som følger hver nettordre til 240 kroner." },
        { k: "struktur", t: "Du skiller kostnader som følger hver ordre fra kostnader som ligger fast, og sier at små nettordrer derfor rammes hardest." },
        { k: "tall", t: "Du finner at sko og klær står for over 90 prosent av returene i nettbutikken." },
        { k: "nysgjerrighet", t: "Du sier hva du vil vite videre, for eksempel hvordan nettordrene fordeler seg på kurvstørrelse." },
      ],
      felle: "Å lese de to kolonnene som om nettet er billigst, fordi linjen for lønn og husleie står tom. Summert koster en nettordre i snitt 240 kroner å betjene, mot 155 for et butikkjøp.",
    },
    {
      art: "regne",
      sek: 270,
      tittel: "Hva tjener kjeden på en nettordre?",
      kort: "Nettordren",
      sp: `<p>Intervjueren: <i>«Nettavdelingen kaller nettet kjedens vekstmotor. Hva sitter Vidde
        egentlig igjen med på en gjennomsnittlig nettordre?»</i></p>
        <p><b>Regn ut dekningsbidraget per nettordre, i kroner</b>, med tallene du har fått.
        Felleskostnader som hovedkontor, IT og markedsføring holder du utenfor.</p>
        <p>Når du har tallet, spør hun: <i>«Hvor stor må kurven være før en nettordre går i
        null? Og hva betyr det for kanalen i år?»</i></p>
        <p class="tiny">Si framgangsmåten høyt før du regner, og skriv svaret med fortegn.</p>`,
      svar: -30,
      enhet: "kroner per ordre",
      toleranse: 0.05,
      fasit: `<p>Framgangsmåten først: <i>«Jeg finner hva kunden faktisk beholder, tar marginen på
        det, og trekker fra alt som følger ordren.»</i></p>
      <div class="formula">
        <div class="eq">Beholdt verdi: 700 × (1 − 0,25) = 525 kroner</div>
        <div class="eq">Bruttofortjeneste: 525 × 40 % = 210 kroner</div>
        <div class="eq">Kostnader per ordre: 20 + 90 + 50 + 80 = 240 kroner</div>
        <div class="eq">Dekningsbidrag: 210 − 240 = <b>−30 kroner per ordre</b></div>
        <div class="where">Snarveien er verdt å kunne: av hver bestilte krone blir
          0,75 × 0,40 = 30 øre igjen. 700 × 0,30 = 210.</div>
      </div>
      <p><b>Fellen:</b> tar du 40 prosent av hele kurven, får du 280 − 240 = <b>+40 kroner</b>, og
        nettordren ser lønnsom ut. Men de 700 kronene er bestilt verdi før returer, slik det sto
        under tabellen i materialet. En firedel kommer tilbake, og på den tjener kjeden ingenting.
        Nettavdelingens egen rapport viser salget før returer, og ingen har regnet margin på det som
        blir igjen. Returene forklarer også driftsmarginen i materialet: 30 / (1 500 + 525) =
        1,5 prosent. Med 2 200 i nevneren får du 1,4.</p>
      <p>Linjen under tabellen i materialet sto der helt nøytralt, og den er lett å lese forbi. Når
        PwC ber deg lese informasjonen «svært nøye», er det slike linjer de mener.</p>
      <p><b>Hvis noen sier at returvarene jo selges igjen:</b> det stemmer, og derfor trekker du
        ikke fra varekostnaden, bare marginen som aldri ble tjent. Nedskrivningen på varer som ikke
        kan selges som nye, ligger allerede i de 80 kronene.</p>
      <p><b>Nullpunktet:</b></p>
      <div class="formula">
        <div class="eq">240 ÷ 0,30 = <b>800 kroner bestilt</b></div>
        <div class="where">Snittordren på 700 ligger under. Med 40 øre per bestilt krone ville du
          fått 600 bestilt, og trodd at snittordren tjente penger. Sier du 600 kroner som kunden
          beholder, er det riktig: det er de samme 800 etter returer.</div>
      </div>
      <p><b>Så hva:</b></p>
      <ul>
        <li>700 millioner i bestilt verdi delt på 700 kroner er <b>1 million ordrer</b>. Med
          −30 kroner per ordre taper nettet rundt <b>30 millioner i året</b>, og det er før lageret
          på Gardermoen, nettplattformen og annonsene.</li>
        <li>Når et butikkjøp blir til en nettordre, forsvinner ikke husleien og lønnen. Kjeden
          mister 235 kroner i bruttofortjeneste etter kortgebyr i butikken, og får en ordre som i
          snitt taper 30.</li>
      </ul>
      <p><b>Sterkt mot middels:</b> koble tallet til resultatfallet. Butikkene solgte 150 millioner
        mindre. Med 40 prosent margin er det 60 millioner mindre bruttofortjeneste, litt mindre etter
        spart kortgebyr, mens lønn og husleie sto fast. Nettordrene økte fra 0,3 til 1 million, og
        0,7 millioner flere ordrer à −30 kroner, hvis returandelen var den samme i 2023, er
        21 millioner mer i tap. Til sammen rundt 80 millioner: hele fallet fra 110 til 30.</p>`,
      krav: [
        { k: "tall", t: "Du trekker returene fra kurven før du tar marginen, fordi 700 kroner er bestilt verdi og bare 525 blir hos kunden." },
        { k: "tall", t: "Du lander på minus 30 kroner per ordre og sier at snittordren på nett taper penger." },
        { k: "tall", t: "Du ganger opp til kanalen: rundt én million ordrer gir et tap på rundt 30 millioner i året." },
        { k: "tall", t: "Du finner nullpunktet for kurven: 800 kroner bestilt, eller 600 kroner etter returer." },
        { k: "kommunikasjon", t: "Du sier framgangsmåten høyt før du regner, slik at intervjueren kan følge hvert ledd." },
      ],
      felle: "Å ta 40 prosent av hele kurven på 700 kroner. Kurven er bestilt verdi før returer, og da får du +40 i stedet for −30 kroner: nettordren ser lønnsom ut, og diagnosen peker bort fra nettet.",
    },
    {
      art: "drøfting",
      sek: 240,
      tittel: "Tiltakene og risikoen",
      kort: "Tiltak",
      sp: `<p>Intervjueren: <i>«Da snakker vi tiltak. Nettavdelingen har delt fjorårets ordrer ved
        800 kroner, der du fant nullpunktet.»</i></p>
        <p><b>60 prosent</b> av ordrene er under 800 kroner, med en snittkurv på <b>300 kroner</b>.
        De andre <b>40 prosentene</b> har en snittkurv på <b>1 300 kroner</b>. Regn først på hva
        ordrene under og over 800 kroner tjener, og si hva du antar.</p>
        <p><b>«Hvilke tiltak ville du vurdert, hva er risikoen ved hvert av dem, hvilket starter du
        med, og hva må på plass for at det blir gjennomført?»</b></p>`,
      fasit: `<p>Poenget først: <i>«Det er ikke nettet som taper, det er de små ordrene og returene
        i sko og klær. Tiltakene skal gjøre de små ordrene billigere å betjene eller større, ikke
        bremse nettet.»</i></p>
      <p>Regn på fordelingen. Si antagelsen høyt, for den må sjekkes: samme returandel og samme
        kostnad per ordre i begge gruppene.</p>
      <div class="formula">
        <div class="eq">Under 800: 0,30 × 300 − 240 = −150 kroner × 600 000 ordrer = <b>−90 millioner</b></div>
        <div class="eq">Over 800: 0,30 × 1 300 − 240 = +150 kroner × 400 000 ordrer = <b>+60 millioner</b></div>
        <div class="where">Sum −30 millioner, som i forrige trinn. De store ordrene tjener penger.
          Hele tapet, og mer til, sitter i de små.</div>
      </div>
      <table class="data">
        <tr><th>Tiltak</th><th>Hva det gjør</th><th>Risikoen for Vidde</th></tr>
        <tr><td>Klikk-og-hent og retur i butikk</td><td>Sparer det meste av frakten på 90 kroner og
          returfrakten, fordi varene kan gå med butikkenes vanlige vareleveranser. Gir besøk i
          butikken.</td><td>Mer arbeid i butikk i travle timer, og nettlageret må kunne sende
          ordrer med butikkenes vareleveranser. Liten risiko for å miste kunder.</td></tr>
        <tr><td>Størrelsesguide i sko og klær</td><td>Angriper 94 prosent av returene. Hvert
          prosentpoeng lavere returandel er verdt rundt 6 millioner i året.</td><td>Effekten er
          usikker og kommer gradvis. Må måles per varegruppe.</td></tr>
        <tr><td>Fraktgrense, for eksempel fri frakt fra 800 kroner</td><td>Mange samler kjøpene over
          grensen. Betaler de 600 000 små ordrene 79 kroner, er det rundt 47 millioner før returer
          og før kundene reagerer.</td><td>Kunder kan gå til konkurrenter med fri frakt, og nettkunder som også
          handler i butikk, kan bli borte begge steder.</td></tr>
        <tr><td>Gebyr for retur i posten, gratis retur i butikk</td><td>Færre returer, og færre som
          bestiller to størrelser for sikkerhets skyld.</td><td>Størst kunderisiko, særlig i sko og
          klær. Bør bare komme sammen med gratis retur i butikk.</td></tr>
      </table>
      <p class="tiny">Slik er seks millioner regnet: ett prosentpoeng lavere returandel gir
        700 × 1 % × 40 % = 2,80 kroner mer i margin per ordre, og rundt 3,20 mindre i returkostnad
        (80 kroner fordelt på 25 prosentpoeng). Til sammen rundt 6 kroner, ganger 1 million
        ordrer.</p>
      <p>Legg merke til at gebyret alene ikke gjør en liten ordre lønnsom: den går fra −150 til
        −71 kroner. Effekten av en fraktgrense kommer av at kundene samler kjøpene.</p>
      <p><b>Prioriteringen:</b> jeg starter med klikk-og-hent og retur i butikk. Det har lavest
        kunderisiko, og det bruker noe Vidde allerede betaler for: 60 butikker.
        Størrelsesguiden starter samtidig, på varene med flest returer. Fraktgrensen tester jeg i en
        pilot før den innføres. Gebyr for retur i posten kommer sist, om det trengs.</p>
      <p><b>Gjennomføringen, som er halve svaret:</b> nettavdelingen måles i dag på bestilt salg før
        returer. Så lenge det er målet, vil hvert tiltak over se ut som et tap for dem. Bytt målet
        til bidrag per ordre etter returer før tiltakene settes i gang, og gi butikkene betalt for
        nettordrene de leverer ut.</p>`,
      krav: [
        { k: "struktur", t: "Du sier hva som må endres for at tiltakene blir gjennomført, for eksempel at nettet måles på bidrag etter returer." },
        { k: "tall", t: "Du regner ut at ordrene under 800 kroner taper rundt 150 kroner hver, til sammen rundt 90 millioner i året." },
        { k: "uklarhet", t: "Du sier høyt at regnestykket antar samme returandel og samme kostnad per ordre for små og store ordrer." },
        { k: "struktur", t: "Du nevner minst tre tiltak og gir hvert av dem en risiko som gjelder akkurat Vidde." },
        { k: "struktur", t: "Du sier hvilket tiltak du starter med, og hvorfor det kommer før de andre." },
        { k: "struktur", t: "Du bruker de 60 butikkene som et fortrinn, for eksempel til klikk-og-hent eller retur i butikk." },
      ],
      felle: "Å foreslå å bremse nettsatsingen. Ordrene over 800 kroner tjener 150 kroner hver; det er de små ordrene og returene som taper, ikke kanalen.",
    },
    {
      art: "drøfting",
      sek: 180,
      tittel: "KI i analysen",
      kort: "KI",
      sp: `<p>Intervjueren: <i>«Før vi går til anbefalingen: hvordan ville du brukt KI i analysen
        her?»</i></p>
        <p class="tiny">Vær konkret for Vidde: hvilke data, hvilket spørsmål KI skal svare på,
        hvilken beslutning svaret skal brukes til, hvordan du ser om modellen er god nok, og hva som
        må avklares før dataene kan brukes.</p>`,
      fasit: `<p>Poenget først: <i>«Spørsmålet KI skal hjelpe meg å svare på, er hva som driver
        tapet: hvilke varer, kunder og ordrer som står bak returene og de små ordrene. Vidde har
        dataene som skal til.»</i></p>
      <p>Tre bruksområder, i den rekkefølgen jeg ville tatt dem:</p>
      <ol>
        <li><b>Sortere returårsakene.</b> Jeg antar at returskjemaet har et felt for årsak, og
          anmeldelsene sier ofte det samme: «for liten», «annen farge enn på bildet». En
          språkmodell kan klassifisere alle returene fra ett år på dager, ikke måneder. Resultatet
          er en liste over varene der størrelsen eller beskrivelsen er feil, og det er der
          størrelsesguiden skal starte.</li>
        <li><b>Returrisiko per ordrelinje.</b> Nesten alle kjøp gjøres innlogget, så hver ordrelinje
          kan kobles til kundens historikk, varen, størrelsen og om samme modell er bestilt i flere
          størrelser. En maskinlæringsmodell kan gi hver linje en sannsynlighet for retur. I
          analysen viser den hvilke kunder og varer som driver returene. Senere kan den brukes i
          kassen, til å vise størrelsesråd der risikoen er høy.</li>
        <li><b>Cost-to-serve per kunde.</b> Med returrisiko og kurvstørrelse per kunde kan du regne
          bidrag per kunde, ikke bare per ordre. Da ser du om tapet er spredt, eller sitter hos en
          liten gruppe som bestiller mye og sender mye tilbake. Det avgjør om et returgebyr må
          ramme alle, eller bare noen.</li>
      </ol>
      <p><b>Slik vet du om modellen virker:</b> ta de 10 prosent av ordrene som modellen mener er
        mest risikable. Står de for en klart større del av returene enn 10 prosent, er den nyttig. Gjør
        de ikke det, er den ikke verdt å bygge videre på.</p>
      <p><b>Det som må avklares først:</b> om kundeklubbens samtykke og formål dekker at kjøpsdata
        brukes til å vurdere den enkelte kunden. Det sjekkes med personvernombudet før modellen
        trenes, ikke etter. Og start med analysen, ikke med automatiske beslutninger om hvem som får
        fri retur.</p>
      <p><b>Sterkt mot middels:</b> et middels svar lister det KI kan gjøre i en butikkjede. Et
        sterkt svar knytter hvert grep til en beslutning i denne casen: hvilke varer som får
        størrelsesguide først, og om et returgebyr må ramme alle eller bare noen.</p>`,
      krav: [
        { k: "kommunikasjon", t: "Du sier først hvilket spørsmål KI skal svare på: hva som driver tapet, i returene eller i de små ordrene." },
        { k: "nysgjerrighet", t: "Du bruker en datakilde Vidde faktisk har, som innloggede kjøp i kundeklubben eller returtallene per kategori." },
        { k: "struktur", t: "Du knytter hvert KI-grep til en beslutning i casen, for eksempel hvilke varer som får størrelsesguide først." },
        { k: "uklarhet", t: "Du sier hva som må avklares før kjøpsdata brukes til å vurdere enkeltkunder, som samtykke og formål." },
        { k: "tall", t: "Du sier hvordan du vil måle om modellen virker, for eksempel hvor stor del av returene de mest risikable ordrene står for." },
      ],
      felle: "Å svare med KI på generelt grunnlag, som en chatbot i kundeservice. Spørsmålet gjelder analysen, og her er det returene og de små ordrene KI skal hjelpe deg å forstå.",
    },
    {
      art: "syntese",
      sek: 240,
      tittel: "Anbefalingen",
      sp: `<p>Intervjueren: <i>«Administrerende direktør har ett minutt før styremøtet. Hva
        anbefaler du?»</i></p>
        <p>Midtveis avbryter hun: <i>«Fri frakt og fri retur er bransjestandard. Innfører vi
        gebyrer, går kundene til konkurrenten.»</i></p>
        <p class="tiny">Skriv anbefalingen slik du ville sagt den, og ta med hvordan du svarer på
        innvendingen.</p>`,
      fasit: `<p>Topp-ned og med tallene fra casen: anbefalingen, tre grunner, største risiko og neste
        steg, på ett minutt.</p>
      <blockquote>
        <p><b>«Vidde bør beholde veksten på nett, men gjøre nettordrene lønnsomme.</b> Butikkene
        har mistet 150 millioner i salg mens husleie og lønn står fast, og nettet vokser med ordrer
        som i snitt taper 30 kroner. Til sammen forklarer det hele fallet fra 110 til
        30 millioner.</p>
        <p>Jeg anbefaler klikk-og-hent og gratis retur i alle 60 butikkene, størrelsesguide på sko og
        klær, fri frakt først fra 800 kroner, og å måle nettet på bidrag etter returer.</p>
        <p>Tre grunner. For det første koster en nettordre i snitt 240 kroner å betjene og går i
        null først ved 800 kroner. Seks av ti ordrer ligger under. For det andre er 94 prosent av
        returene sko og klær. For det tredje måles nettet på bestilt salg, 700 millioner, mens bare
        525 blir igjen etter returer.</p>
        <p>Største risiko er at gode kunder går når frakten ikke lenger er gratis. Denne uken ville
        jeg satt opp et månedlig resultat per kanal, med nettsalget etter returer.»</p>
      </blockquote>
      <p>Innvendingen kommer midtveis. Svaret på den er et eget, kort avsnitt:</p>
      <blockquote>
        <p>«Til innvendingen: det stemmer at vi ikke kan være alene om gebyrer. Det endrer
        rekkefølgen: fraktgrensen kommer sist, etter tiltakene som ikke koster kunden noe. Men
        regnestykket står: en ordre under 800 kroner taper i snitt 150 kroner, så den er ikke et
        tap å miste. Kunden bak den kan være det, og det kan vi måle: fraktgrense for en del av
        kundene i åtte uker, mot en kontrollgruppe med fri frakt.»</p>
      </blockquote>
      <p>I testen følger du ordrer, kurvstørrelse, returer og kjøp i butikk i begge gruppene. Går de
        gode kundene, justerer du grensen. Vil du vise gjennomføringen enda tydeligere, legg til et
        mål: snittordren på nett i pluss innen et år.</p>
      <p>Legg merke til formen: <b>standpunkt, tre grunner med tall, største risiko og neste steg på
        ett minutt, og innvendingen tatt inn med det den endrer, det den ikke endrer, og en
        test.</b> Uten testen er svaret på innvendingen bare en mening mot en annen.</p>`,
      krav: [
        { k: "kommunikasjon", t: "Du sier anbefalingen i første setning, før grunnene og tallene." },
        { k: "tall", t: "Du bruker minst to av casens tall som grunner, for eksempel minus 30 kroner per ordre og nullpunktet på 800 kroner." },
        { k: "nysgjerrighet", t: "Du tar innvendingen inn og sier konkret hva den endrer i anbefalingen, for eksempel rekkefølgen på tiltakene." },
        { k: "nysgjerrighet", t: "Du sier hva innvendingen ikke endrer, for eksempel at en ordre som taper 150 kroner, ikke er et tap å miste." },
        { k: "uklarhet", t: "Du foreslår en test med kontrollgruppe som viser om kundene faktisk går, i stedet for å gjette på det." },
        { k: "struktur", t: "Du avslutter anbefalingen med et neste steg klienten kan starte denne uken, for eksempel et månedlig resultat per kanal." },
      ],
      felle: "Å kapitulere og legge bort fraktgrensen fordi konkurrentene har fri frakt, slik at tiltaket som gjør de små ordrene større, forsvinner uten at noen har testet det. Den motsatte feilen er like dyr: å avvise innvendingen uten å si hvordan kundeflukten kan måles.",
    },
  ],
}
