/* ============== CASETRENING · PWC CONSULTING (OSLO) ==============
   Caser i formen PwC selv beskriver: et skriftlig casemateriale med «viktige
   forhold», kort lesetid, og så spørsmål fra en engasjementsleder i fast
   rekkefølge. 30–45 minutter, intervjuerledet. PwC Norges eget råd er «Les
   informasjonen du mottar svært nøye», og hvert materiale har én detalj som
   bare den som leser nøye, får med seg.

   Gjennomføringen er en del av svaret: hver case har et drøftingstrinn om
   risiko, veikart eller KI, slik PwCs egne eksempelcaser har.

   Kravene i hvert trinn er merket med ett av PwCs fem vurderingskriterier, og
   case-spilleren summerer treffene per kriterium etter casen. Navnene under er
   innhold, ikke motor.

   Casene har ingen egen kategori. De ligger blant intervjucasene og finnes via
   Stilart-filteret, som filtrerer på `firma`. Kilder: docs/case-research/10.

   BYGGET FIL — ikke rediger. Kilden er fag/case/_pwc/, bygget med
   tools/bygg-pwc-caser.py.
   ============================================================== */
window.EDU_DATA = window.EDU_DATA || {};
window.EDU_DATA.cases = window.EDU_DATA.cases || [];

/* PwCs egne fem kriterier, fra PwCs case-guide: structured thinking, comfort
   with ambiguity, communication skills, business intuition and basic numeracy,
   curiosity and coachability. */
window.EDU_DATA.caseKriterier = Object.assign(window.EDU_DATA.caseKriterier || {}, {
  struktur: "Strukturert tenkning",
  uklarhet: "Håndterer uklarhet",
  kommunikasjon: "Kommunikasjon",
  tall: "Forretningsforståelse og tall",
  nysgjerrighet: "Nysgjerrighet og mottakelighet",
});

window.EDU_DATA.cases.push(
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
},
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
},
/* PwC-case 3 av 6: vekst i reiseliv, intervjuerledet, med lesetid først.
   Mekanismen er at veksten ligger i kapasiteten som allerede står tom. En
   kystkjede er full om sommeren og mer enn halvtom om vinteren, og et nytt
   hotell arver det samme mønsteret. RevPAR (belegg × snittpris) gjør det
   synlig, og vekst per investert krone avgjør. De to andre vekstcasene handler
   om miks og kannibalisering; denne handler om å fylle før man bygger.

   «Les nøye»-detaljen står nøytralt i første avsnitt: de fire minste hotellene
   er stengt fra november til og med mars, altså hele lavsesongen. Den biter i
   trinn 6, der vinterløftet må regnes på 800 rom, ikke 1 000. Eksempelnotatene
   i lesetiden nevner den med vilje ikke, og ingen fasit før trinn 6 gjør det
   heller. Det er regnetrinnet som avslører om du fikk den med deg, slik det
   ville skjedd i rommet.

   Motstand og ny informasjon kommer tre steder: de avviste sommergjestene
   (trinn 4), salgsdirektørens priskutt (trinn 6) og konkurrenten i Bergen
   (syntesen). */
{
  id: "pwc-hotellkjede-lavsesong",
  label: "Hotellkjeden som vil bygge tre nye hoteller",
  type: "Vekst",
  nivå: "Middels",
  firma: "PwC",
  stil: "interviewer-led",
  minutter: 35,
  ch: [3, 5, 6, 8, 9, 10],
  blurb: "Styret vil vokse 30 prosent, og administrasjonen vil bygge tre nye hoteller. Trener å prøve en investeringsplan mot målet den skal nå, å lese materialet nøye og å ta imot ny informasjon.",
  prompt: `<p>Klienten er <b>Skjærlys Hotell</b>, en norsk kjede med tolv hoteller langs kysten fra
    Kristiansand til Bodø. Gjestene er fritidsreisende, kurs- og konferansegjester og
    firmareisende. De fire minste hotellene, med 50 rom hver, holder stengt fra november til og
    med mars.</p>
    <p>Styret vil øke omsetningen med <b>30 prosent på fem år</b>, og administrasjonen foreslår å
    bygge <b>tre nye hoteller med 100 rom hver</b>. Administrerende direktør sier: «Vi er fulle
    hver sommer og må si nei til gjester. Skal vi vokse 30 prosent, trenger vi 30 prosent flere
    rom.»</p>
    <table class="data">
      <tr><th>Nøkkeltall</th><th class="n">I fjor</th></tr>
      <tr><td>Hoteller</td><td class="n">12</td></tr>
      <tr><td>Rom</td><td class="n">1 000</td></tr>
      <tr><td>Omsetning</td><td class="n">500 mill. kr</td></tr>
      <tr><td>herav romsalg</td><td class="n">300 mill. kr</td></tr>
      <tr><td>Driftsmargin</td><td class="n">12 %</td></tr>
    </table>
    <p><b>Viktige forhold:</b></p>
    <ul>
      <li>Et nytt hotell på 100 rom koster rundt <b>250 millioner kroner</b> og tar tre år fra
        vedtak til åpning.</li>
      <li>Å selge ett romdøgn til koster rundt <b>300 kroner</b> i renhold, vask og frokost.</li>
      <li>Sju av hotellene har møterom for mer enn 100 personer.</li>
      <li>Prisene settes for ett år om gangen, med faste priser per sesong og hotell.</li>
    </ul>
    <p><b>Klienten spør:</b> Er tre nye hoteller den beste veien til 30 prosent vekst?</p>`,
  bakgrunn: `<p>Casen er konstruert, men den er bygget på to av PwC Consultings egne satsinger i
    Norge: reiseliv er en av bransjene de oppgir, og vekst og kommersiell utvikling er en av
    tjenestene. Oppdraget er typisk. Styret har satt et vekstmål, administrasjonen har en
    investeringsplan, og noen utenfra skal vurdere om planen er den beste veien til målet.</p>
    <p>Mekanismen er en klassisk feil i bransjer med fast kapasitet: å vokse med mer kapasitet
    når kapasiteten man har, står tom store deler av året. En hotellkjede langs norskekysten er
    full om sommeren og mer enn halvtom om vinteren, og et nytt hotell arver det samme mønsteret.
    RevPAR, belegg ganger snittpris, er verktøyet som gjør det synlig. Vekst per investert krone
    er målestokken som avgjør.</p>
    <p>Casen trener også tre ting som skiller en PwC-case fra en vanlig vekstcase. Du må lese
    materialet nøye: at de fire minste hotellene er stengt hele lavsesongen, avgjør regnestykket
    i trinn 6. Du må ta imot ny informasjon uten å kapitulere: de avviste sommergjestene,
    salgsdirektørens priskutt og konkurrenten i Bergen trekker alle mot et annet svar. Og du må
    vise at anbefalingen lar seg gjennomføre, med en test før utrulling, en rekkefølge på
    tiltakene og et bonusmål som ikke belønner rabatt.</p>`,
  trinn: [
    {
      art: "forberedelse",
      sek: 300,
      kort: "Lesetid",
      tittel: "Fem minutter med materialet",
      sp: `<p>«Her er casematerialet. Du har <b>fem minutter</b> til å lese og notere, så begynner
        vi.»</p>
        <p class="tiny">Les nøye. Gode notater har fire ting: målet med klientens egne ord, tallene
        som betyr mest, det som mangler, og en foreløpig hypotese.</p>`,
      fasit: `<p>Stikkord, ikke setninger, i fire bolker, så du finner fram i dem mens du snakker.
        Slik kan notatene se ut når tiden er ute:</p>
      <p><b>Mål:</b> +30 % omsetning på 5 år, fra 500 til 650 mill. Det er styrets mål. Tre
        hoteller er administrasjonens løsning, ikke målet.</p>
      <p><b>Tall:</b></p>
      <ul>
        <li>12 hotell, 1 000 rom, Kristiansand–Bodø. Fritid, kurs og konferanse, firma</li>
        <li>Omsetning 500 mill, herav rom 300 (60 %), resten mat, drikke og møterom</li>
        <li>Driftsmargin 12 %, altså 60 mill i driftsresultat</li>
        <li>Forslaget: 3 hotell à 100 rom, 3 × 250 = 750 mill. Tre år til åpning. 30 % flere rom</li>
        <li>Ett romdøgn til koster 300 kr</li>
        <li>7 hotell med store møterom. Faste sesongpriser, satt for et år</li>
      </ul>
      <p><b>Mangler:</b> belegg og pris gjennom året · fordeling på gjestetyper · hva et nytt
        hotell gir i romsalg, og når · om målet er nominelt eller reelt · hva annet enn nye rom som
        er vurdert</p>
      <p><b>Påstand å teste:</b> «30 % flere rom = 30 % mer omsetning». Stemmer bare hvis nye rom
        selger like godt som de gamle, og sier ingenting om hva veksten koster.</p>
      <p><b>Foreløpig hypotese:</b> Tre nye hoteller er riktig svar bare hvis kjeden mangler rom
        store deler av året, og det tester jeg først.</p>`,
      krav: [
        { k: "tall", t: "Du skriver målet som et tall, for eksempel fra 500 til 650 millioner kroner på fem år." },
        { k: "tall", t: "Du regner ut i lesetiden hva forslaget koster til sammen: tre hoteller à 250 millioner er 750 millioner kroner." },
        { k: "nysgjerrighet", t: "Du noterer direktørens regnestykke, 30 prosent flere rom gir 30 prosent mer omsetning, som en påstand du skal teste." },
        { k: "uklarhet", t: "Du skriver ned minst to ting som mangler for å vurdere forslaget, for eksempel belegget gjennom året og hva et nytt hotell gir i romsalg." },
        { k: "struktur", t: "Du ordner notatene i bolker, med mål, tall, mangler og hypotese, så du finner fram i dem mens du snakker." },
        { k: "struktur", t: "Du har en foreløpig hypotese i én setning som du kan teste i intervjuet." },
      ],
      felle: "Å skrive av materialet. Da er lesetiden brukt på kopiering, og du møter første spørsmål uten et regnet tall, uten en liste over det som mangler og uten en hypotese.",
    },
    {
      art: "oppklaring",
      sek: 180,
      kort: "Avklaring",
      tittel: "Hva vil du avklare?",
      sp: `<p>«Før vi går i gang: <b>hva vil du avklare, og hvilke antagelser gjør du?</b>»</p>`,
      fasit: `<p>Tre til fem spørsmål, og hvert av dem skal kunne endre analysen. I en bransje med fast
        kapasitet er ett spørsmål obligatorisk: <b>hvordan fordeler belegg og pris seg gjennom
        året?</b> Et hotellrom som står tomt i januar, kan ikke selges i juli. Derfor sier et snitt
        for året lite.</p>
      <ul>
        <li><b>Hva betyr målet?</b> Omsetning eller resultat, nominelt eller reelt. Med prisstigning
          kommer en del av et nominelt mål av seg selv, og et resultatmål ville endret hele
          sammenligningen.</li>
        <li><b>Hvordan fordeler belegg og snittpris seg over sesongene og på gjestetypene?</b> Det
          avgjør om kjeden mangler rom eller mangler gjester.</li>
        <li><b>Hva gir et nytt hotell i romsalg, og når?</b> Tre år til åpning er oppgitt. Spør hvor
          lang tid det tar før det er like fullt som de andre.</li>
        <li><b>Hva annet enn nye hoteller er vurdert?</b> Er svaret «ingenting», er det i seg selv et
          funn.</li>
        <li><b>Hvem setter prisene, og hva måles og belønnes de på?</b> Det avgjør hva hotellene gjør
          med prisen når de skal fylle rom.</li>
      </ul>
      <p><b>Antagelsen du sier høyt:</b> «Jeg antar at mat, drikke og møterom følger gjestene. Da
        betyr 30 prosent mer omsetning omtrent 30 prosent mer romsalg, rundt 90 millioner kroner i
        året.»</p>
      <p><b>Svarene du får:</b></p>
      <ul>
        <li>Målet er reell vekst: omsetningen skal være <b>650 millioner kroner</b> i år fem, målt i
          dagens priser.</li>
        <li>Driftsmarginen skal ikke under dagens <b>12 prosent</b>.</li>
        <li>Et nytt hotell bruker rundt <b>to år</b> etter åpning på å bli like fullt som de
          etablerte.</li>
        <li>Administrasjonen har bare regnet på nye hoteller.</li>
        <li>Hotelldirektørene setter prisene på eget hotell og har <b>bonus knyttet til
          belegget</b> der.</li>
        <li>Kurs- og konferansegjester legger igjen omtrent like mye i mat og møterom som de betaler
          for rommet. Fritidsgjester legger igjen langt mindre.</li>
        <li>Belegg og priser gjennom året får du om et øyeblikk.</li>
      </ul>`,
      krav: [
        { k: "nysgjerrighet", t: "Du spør hvordan belegg og snittpris fordeler seg gjennom året, ikke bare hva snittet for året er." },
        { k: "nysgjerrighet", t: "Du stiller minst ett av disse: nominelt eller reelt mål, hva annet som er vurdert, eller når et nytt hotell er fullt." },
        { k: "uklarhet", t: "Du oversetter målet til et tall du kan regne mot, med en antagelse du sier høyt, for eksempel rundt 90 millioner kroner mer i romsalg." },
        { k: "nysgjerrighet", t: "Du spør hvem som setter prisene og hva de belønnes på, fordi det styrer hva hotellene gjør med prisen." },
        { k: "kommunikasjon", t: "Du sier hva hvert spørsmål skal brukes til, i stedet for å lese opp en liste." },
      ],
      felle: "Å spørre om tomter, byggekostnad og finansiering. Da har du godtatt at svaret er nye hoteller før du vet om kjeden mangler rom, og resten av casen blir et byggeprosjekt.",
    },
    {
      art: "struktur",
      sek: 270,
      kort: "Tilnærming",
      tittel: "Hvordan vil du angripe dette?",
      sp: `<p>«Du har målet og forslaget. <b>Hvordan vil du angripe dette?</b> Gi meg tilnærmingen,
        hvor du starter, og hva du tror svaret blir.»</p>`,
      fasit: `<p>Snu spørsmålet først. Klienten spør om tre hoteller, men problemet er 30 prosent vekst.
        Hotellene er ett av flere svar, og alle svarene skal måles på samme målestokk.</p>
      <div class="formula">
        <div class="eq">Omsetning = romsalg + mat, drikke og møterom</div>
        <div class="eq">Romsalg = tilgjengelige romdøgn × belegg × snittpris</div>
        <div class="eq">Belegg × snittpris = RevPAR</div>
        <div class="where">Tilgjengelige romdøgn er kapasiteten: rom ganger døgn. RevPAR er romsalg
          per tilgjengelige romdøgn, bransjens eget nøkkeltall, fordi det fanger både hvor fullt og
          hvor dyrt i ett tall.</div>
      </div>
      <p>Sammen gir de to identitetene fire grener som ikke overlapper:</p>
      <ul>
        <li><b>Flere tilgjengelige romdøgn:</b> for eksempel nye hoteller og påbygg, som koster kapital
          og tar år.</li>
        <li><b>Høyere belegg i rommene dere har:</b> per sesong og per gjestetype.</li>
        <li><b>Høyere snittpris:</b> prisnivå, priser som følger etterspørselen, og hvilke gjester
          som får rommene.</li>
        <li><b>Mer per gjest:</b> mat, drikke og møterom.</li>
      </ul>
      <p>Så målestokken, som er det som gjør strukturen til en beslutning: <b>vekst per investert
        krone</b>, tid til effekt innenfor fem år, og hva tiltaket gjør med driftsmarginen på
        12 prosent.</p>
      <p><b>Hypotesen:</b> «Kjeden har ledige rom store deler av året, og nye hoteller vil arve det
        mønsteret, så det er trolig billigere å fylle rommene dere har enn å bygge nye.»</p>
      <p><b>Startpunktet:</b> «Jeg starter med belegg og snittpris per sesong, fordi det avgjør om
        kjeden mangler rom eller mangler gjester.»</p>`,
      krav: [
        { k: "struktur", t: "Du bygger nedbrytningen på en identitet, for eksempel romsalg = tilgjengelige romdøgn × belegg × snittpris." },
        { k: "struktur", t: "Du behandler nye hoteller som ett alternativ blant flere, ikke som selve spørsmålet." },
        { k: "tall", t: "Du sier hvilken målestokk alternativene skal sammenlignes på, for eksempel vekst per investert krone." },
        { k: "struktur", t: "Du har mer omsetning per gjest, altså mat, drikke og møterom, som en egen gren." },
        { k: "kommunikasjon", t: "Du sier hvor du starter og hvorfor, uten at intervjueren må spørre." },
        { k: "kommunikasjon", t: "Du sier hypotesen i én setning, som et standpunkt og ikke som et spørsmål." },
      ],
      felle: "Å strukturere selve byggeprosjektet, med tomter, finansiering og byggetid. Da svarer du på administrasjonens løsning i stedet for styrets problem, og rommene som allerede står ledige, havner utenfor treet.",
    },
    {
      art: "exhibit",
      sek: 300,
      kort: "Sesongene",
      tittel: "Belegg og pris gjennom året",
      sp: `<p>Intervjueren deler skjermen: belegg, snittpris og RevPAR per sesong i fjor, og hvem som
        bodde på hotellene.</p>
        <p>«Før du svarer: administrerende direktør vil at du skal vite at hotellene måtte si nei til
        forespørsler om rundt <b>8 000 romdøgn</b> i fjor sommer, fordi de var fullbooket. <b>Hva
        ser du, og hva betyr det for forslaget om tre nye hoteller?</b>»</p>`,
      figur: `<table class="data">
          <tr><th>Sesong</th><th class="n">Belegg</th><th class="n">Snittpris</th><th class="n">RevPAR</th></tr>
          <tr><td>Høysesong: juni–august</td><td class="n">90 %</td><td class="n">2 000</td><td class="n">1 800</td></tr>
          <tr><td>Mellomsesong: april–mai og september–oktober</td><td class="n">60 %</td><td class="n">1 250</td><td class="n">750</td></tr>
          <tr><td>Lavsesong: november–mars</td><td class="n">40 %</td><td class="n">1 000</td><td class="n">400</td></tr>
        </table>
        <table class="data">
          <tr><th>Andel av solgte romdøgn</th><th class="n">Høysesong</th><th class="n">Mellomsesong</th><th class="n">Lavsesong</th></tr>
          <tr><td>Fritid</td><td class="n">85 %</td><td class="n">45 %</td><td class="n">15 %</td></tr>
          <tr><td>Kurs og konferanse</td><td class="n">5 %</td><td class="n">35 %</td><td class="n">45 %</td></tr>
          <tr><td>Firma</td><td class="n">10 %</td><td class="n">20 %</td><td class="n">40 %</td></tr>
        </table>
        <p class="tiny">Kroner. Belegg er solgte romdøgn delt på tilgjengelige romdøgn. RevPAR er
          romsalg per tilgjengelige romdøgn, altså belegg × snittpris. Regn 30 døgn i måneden.</p>`,
      fasit: `<p>Overskriften først, så beviset:</p>
      <p><i>«Hotellene er fulle i tre måneder og mer enn halvtomme i fem. Et rom gir 400 kroner i
        romsalg per døgn om vinteren mot 1 800 om sommeren, og det er vinteren som har de ledige
        rommene.»</i></p>
      <p><b>Det første: belegget.</b> 90 prosent i snitt om sommeren betyr fullt de fleste netter. Der
        er det lite å hente i volum. I lavsesongen står 60 prosent av rommene tomme, i mellomsesongen
        40 prosent.</p>
      <p><b>Det andre: RevPAR.</b> 1 800 mot 400 kroner er 4,5 ganger. Begge driverne trekker samme
        vei: snittprisen halveres, og belegget faller til under halvparten.</p>
      <div class="formula">
        <div class="eq">Sommer: 0,90 × 2 000 = 1 800</div>
        <div class="eq">Vinter: 0,40 × 1 000 = 400</div>
      </div>
      <p><b>Det tredje: hvem som bor der.</b> Om sommeren er 85 prosent av romdøgnene fritid. Om
        vinteren er 85 prosent av romdøgnene kurs, konferanse og firma, og fritidsgjestene er nesten
        borte. Vinterveksten må hentes der først, eller fra et vinterprodukt for fritid som ikke
        finnes i dag.</p>
      <p><b>Det fjerde: de 8 000 avviste romdøgnene.</b> Det er administrasjonens beste argument, og
        det er ekte. Men sett det i størrelse: ett hotell på 100 rom selger 100 × 90 × 90 % = 8 100
        romdøgn på en sommer. De avviste romdøgnene fyller altså omtrent én sommer i ett hotell, ikke
        tre hoteller hele året. Til sommerpris er de 8 000 × 2 000 = 16 millioner i romsalg, mot et
        mål på rundt 90. Og når dere sier nei til gjester, er prisen for lav de ukene. Noe av det kan
        hentes som pris, ikke som rom.</p>
      <p><b>Det tabellen ikke viser:</b> forskjellene mellom hotellene, og mellom ukedager og helger.
        Et snitt kan skjule både byhotell som går godt og småsteder som står tomme. Det avgjør hvor
        vinteren kan fylles, og med hva.</p>
      <p><b>Så hva:</b> et nytt hotell vil få det samme mønsteret. Det blir fullt om sommeren, der
        kjeden allerede er full, og 60 prosent tomt om vinteren. Neste spørsmål er hva et slikt
        hotell faktisk gir i romsalg, og hva det ville gitt å fylle de tomme rommene dere allerede
        har.</p>`,
      krav: [
        { k: "kommunikasjon", t: "Du sier overskriften først, for eksempel fullt om sommeren og mer enn halvtomt om vinteren, før du går gjennom tallene." },
        { k: "tall", t: "Du sammenligner RevPAR på tvers av sesongene, 1 800 mot 400 kroner, og sier at både pris og belegg trekker samme vei." },
        { k: "struktur", t: "Du leser segmentene: om vinteren er 85 prosent av romdøgnene kurs, konferanse og firma, og du sier hvilke gjester som kan fylle vinteren." },
        { k: "nysgjerrighet", t: "Du setter de 8 000 avviste romdøgnene i størrelse, for eksempel som omtrent én sommer i ett hotell på 100 rom eller rundt 16 millioner i romsalg." },
        { k: "tall", t: "Du kobler funnet til forslaget: et nytt hotell vil arve det samme sesongmønsteret." },
        { k: "uklarhet", t: "Du sier hva tabellen ikke viser, for eksempel belegg per hotell eller per ukedag, og hvorfor det kan endre bildet." },
      ],
      felle: "Å lese de 8 000 avviste romdøgnene som bevis for at kjeden trenger 300 nye rom. De fyller omtrent én sommer i ett hotell, og et hotell må leve av alle tolv månedene, ikke bare de tre fulle.",
    },
    {
      art: "regne",
      sek: 240,
      kort: "Nytt hotell",
      tittel: "Hva gir ett nytt hotell i romsalg?",
      sp: `<p>«La oss se hva ett nytt hotell faktisk ville gitt. Det har 100 rom, og når det er ferdig
        innkjørt, får det samme belegg og snittpris per sesong som i tabellen. <b>Hvor mye romsalg
        gir det i et normalår, i millioner kroner?</b>»</p>
        <p>Når du har sagt tallet, spør intervjueren: <i>«Hva betyr det for forslaget om tre
        hoteller?»</i></p>
        <p class="tiny">Si framgangsmåten høyt før du regner, og sanity-sjekk svaret til slutt.</p>`,
      svar: 31.2,
      enhet: "millioner kroner",
      toleranse: 0.03,
      fasit: `<p>Regn sesong for sesong. Et snitt for året skjuler akkurat det du skal finne. RevPAR gjør
        det til tre enkle gangestykker:</p>
      <div class="formula">
        <div class="eq">Romsalg = rom × døgn × RevPAR</div>
        <div class="eq">Høysesong: 100 × 90 × 1 800 = 16,2 mill.</div>
        <div class="eq">Mellomsesong: 100 × 120 × 750 = 9,0 mill.</div>
        <div class="eq">Lavsesong: 100 × 150 × 400 = 6,0 mill.</div>
        <div class="eq">Sum: <b>31,2 millioner kroner</b> i året</div>
        <div class="where">90, 120 og 150 døgn er tre, fire og fem måneder à 30 døgn.</div>
      </div>
      <p><b>Sanity-sjekken:</b> tre slike hoteller gir 93,6 millioner, 31 prosent av dagens romsalg
        på 300. Det er akkurat direktørens regnestykke: 30 prosent flere rom, rundt 30 prosent mer
        romsalg. <b>På papiret går det opp.</b> Spørsmålet er hva det koster, og når det kommer.</p>
      <p><b>Så hva:</b></p>
      <ul>
        <li>Over halvparten av pengene, 16,2 av 31,2 millioner, kommer på tre måneder. Om vinteren
          står 60 prosent av de nye rommene tomme: tre hoteller gir 300 × 150 × 60 % = 27 000 nye
          tomme romdøgn hver vinter.</li>
        <li>Hvert hotell koster 250 millioner. Det er 31,2 ÷ 250, altså 12,5 øre i romsalg per
          investert krone i året.</li>
        <li>Tre år til åpning og to år til hotellet er innkjørt: de 31,2 millionene kommer tidligst i
          år fem, og bare hvis ingen av byggene blir forsinket.</li>
      </ul>
      <p>Et nytt hotell gir vekst, men det bygger det samme mønsteret én gang til. Neste spørsmål er
        om det finnes billigere vekst i rommene som allerede står der.</p>`,
      krav: [
        { k: "tall", t: "Du regner sesong for sesong med rom × døgn × RevPAR, ikke med ett snitt for hele året." },
        { k: "kommunikasjon", t: "Du sier framgangsmåten høyt før du regner, slik at intervjueren kan følge deg og rette deg underveis." },
        { k: "tall", t: "Du sanity-sjekker svaret mot noe du vet, for eksempel direktørens påstand: tre hoteller gir rundt 94 millioner, omtrent 30 prosent av dagens romsalg." },
        { k: "tall", t: "Du sier når og hvor pengene kommer, for eksempel over halvparten om sommeren, eller tidligst fullt i år fem." },
        { k: "tall", t: "Du regner romsalg per investert krone for hotellet, for eksempel rundt 12,5 øre i året, så det kan sammenlignes med andre tiltak." },
      ],
      felle: "Å regne med sommerens tall for hele året. 100 rom × 360 døgn × 90 prosent × 2 000 kroner gir 64,8 millioner, over det dobbelte, og da ser et nytt hotell ut som en god forretning av feil grunn.",
    },
    {
      art: "regne",
      sek: 300,
      kort: "Vinterløftet",
      tittel: "Hva er vinteren verdt?",
      sp: `<p>«Salgsavdelingen har på eget initiativ skissert et alternativ: et lavsesongprogram med
        eget salgsteam for kurs og konferanse, vinterpakker og priser som følger etterspørselen. Det
        koster rundt <b>30 millioner kroner</b> de to første årene, og salgsavdelingen regner med
        fullt utslag fra andre vinter. Hotellet deres i Bergen, det største i kjeden, har
        <b>55 prosent</b> belegg i lavsesongen.</p>
        <p><b>Hvor mye øker romsalget i året hvis snittbelegget i lavsesongen løftes fra 40 til
        55 prosent, med samme snittpris?</b> Svar i millioner kroner. Og hva betyr det mot et nytt
        hotell?»</p>
        <p>Når du har sagt tallet, legger intervjueren til: <i>«Salgsdirektøren sier at dere aldri
        når 55 prosent uten å sette ned vinterprisen med 20 prosent. Hva svarer du ham?»</i></p>`,
      svar: 18,
      enhet: "millioner kroner",
      toleranse: 0.03,
      fasit: `<p>Regnestykket er kort. Det som avgjør det, er kapasiteten, og den står i første avsnitt
        av materialet: <b>de fire minste hotellene, med 50 rom hver, holder stengt fra november til
        og med mars.</b> Lavsesongen er nettopp november til mars. Da er 800 rom åpne, ikke 1 000.
        PwC ber deg lese informasjonen «svært nøye». Dette er en slik detalj.</p>
      <div class="formula">
        <div class="eq">Kapasitet i lavsesongen: 800 × 150 = 120 000 romdøgn</div>
        <div class="eq">15 prosentpoeng mer: 120 000 × 15 % = 18 000 romdøgn</div>
        <div class="eq">18 000 × 1 000 = <b>18 millioner kroner</b> i året</div>
        <div class="where">Samme svar med RevPAR, som går fra 400 til 0,55 × 1 000 = 550:
          (550 − 400) × 120 000 = 18 mill. Og som sjekk mot dagens lavsesong, som gir
          120 000 × 400 = 48 mill.: 48 × 55 ÷ 40 = 66, altså 18 mer.</div>
      </div>
      <p><b>Materialet bekrefter kapasiteten.</b> Høysesongen gir 1 000 × 90 × 1 800 = 162 mill.,
        mellomsesongen 1 000 × 120 × 750 = 90 mill. og lavsesongen 800 × 150 × 400 = 48 mill.
        Til sammen 162 + 90 + 48 = 300, akkurat romsalget i tabellen. Med 1 000 rom i lavsesongen
        ville summen blitt 312.</p>
      <p><b>Så hva, satt opp mot hotellet:</b></p>
      <table class="data">
        <tr><th></th><th class="n">Lavsesongprogram</th><th class="n">Ett nytt hotell</th></tr>
        <tr><td>Romsalg per år</td><td class="n">18 mill.</td><td class="n">31,2 mill.</td></tr>
        <tr><td>Kostnad</td><td class="n">30 mill. over to år</td><td class="n">250 mill.</td></tr>
        <tr><td>Romsalg per år per krone i kostnad</td><td class="n">60 øre</td><td class="n">12,5 øre</td></tr>
        <tr><td>Fullt utslag</td><td class="n">fra andre vinter</td><td class="n">tidligst år fem</td></tr>
      </table>
      <p>Programmet gir nesten 60 prosent av det et nytt hotell gir, for 12 prosent av kostnaden. Per
        krone i kostnad er det nesten fem ganger så mye romsalg. Og hvert ekstra romdøgn til
        1 000 kroner koster 300 å selge, så 700 blir igjen:</p>
      <div class="formula">
        <div class="eq">18 000 × 700 = 12,6 mill. i dekningsbidrag i året</div>
        <div class="where">Med halvt utslag første vinter og fullt fra den andre gir programmet
          6,3 + 12,6 = 18,9 mill. de to første årene, mot 30 i kostnad. De siste 11,1 kommer i løpet
          av år tre, så programmet er betalt tilbake på under tre år, hvis kostnaden stopper etter
          år to.</div>
      </div>
      <p>Spør hva programmet koster å drive etter de to første årene. Et salgsteam blir ikke gratis
        i år tre, og det tallet hører med før styret sier ja.</p>
      <p><b>Og programmet er en driftskostnad, ikke en investering.</b> De to første årene koster det
        15 millioner i året, mer enn de 12,6 millionene rommene gir i dekningsbidrag selv med fullt
        utslag. Driftsmarginen faller da til rundt 11 prosent i programårene, og lavere det første,
        med mindre mat og møterom fra konferansegjestene tar igjen resten. Styret har sagt at den
        ikke skal under 12.</p>
      <div class="formula">
        <div class="eq">År 1, halvt utslag: 60 + 6,3 − 15 = 51,3 mill. på 509 mill., rundt 10 %</div>
        <div class="eq">År 2, fullt utslag: 60 + 12,6 − 15 = 57,6 mill. på 518 mill., rundt 11 %</div>
        <div class="where">Driftsresultat på omsetning. I dag er det 60 millioner, 12 prosent av 500.
          Omsetningen øker med romsalget, 9 og 18 millioner.</div>
      </div>
      <p><b>Og det viktigste tallet i casen:</b> dere har allerede 120 000 × 60 % = 72 000 tomme
        romdøgn i lavsesongen og 120 000 × 40 % = 48 000 i mellomsesongen. Til sammen 120 000 tomme
        romdøgn utenom sommeren. Det er flere enn de tre nye hotellene ville hatt å selge på et helt
        år: 300 × 360 = 108 000.</p>
      <p><b>Svaret til salgsdirektøren.</b> Ta innvendingen på alvor, og regn på den med RevPAR og
        dekningsbidrag, ikke med belegg:</p>
      <div class="formula">
        <div class="eq">Ny pris: 1 000 × 0,8 = 800 kroner</div>
        <div class="eq">Ny RevPAR: 0,55 × 800 = 440, mot 400 i dag</div>
        <div class="eq">(440 − 400) × 120 000 = 4,8 mill. i året</div>
        <div class="where">Dagens 48 000 solgte romdøgn er 120 000 × 40 %. De 18 000 nye romdøgnene
          gir 18 000 × 800 = 14,4 mill., men rabatten på de 48 000 som ville kommet uansett koster
          48 000 × 200 = 9,6 mill. Regnet i dekningsbidrag blir det verre: 66 000 × 500 = 33,0 mill.
          mot 48 000 × 700 = 33,6 mill. i dag. Flere gjester, mindre igjen.</div>
      </div>
      <p>Legg merke til at RevPAR stiger med kuttet, 440 mot 400, mens dekningsbidraget faller.
        RevPAR er bedre enn belegg, men bare dekningsbidraget viser at rabatten ikke lønner seg.</p>
      <p>Så svaret er ikke et blankt nei, men dette: <b>et generelt priskutt tar nesten tre
        firedeler av gevinsten i romsalg, og mer enn hele gevinsten i dekningsbidrag.</b> Med
        20 prosent lavere pris må belegget opp til 50 prosent for å holde romsalget, fordi
        400 ÷ 800 er 50 prosent, og til 56 prosent for å holde dekningsbidraget: i dag gir hvert
        tilgjengelige romdøgn 0,40 × 700 = 280 kroner, og 280 ÷ 500 er 56 prosent. Rabatten må
        treffe bare de nye gjestene: konferansepakker, gruppepriser og midtukepriser, ikke
        vinterprisen for alle. Og programmet må styres på dekningsbidrag, ikke på belegg.</p>
      <p>Og husk hvor 55 prosent kommer fra: ett hotell, det største i kjeden. Om de mindre hotellene
        når dit, vet dere først når det er testet hotell for hotell.</p>`,
      krav: [
        { k: "tall", t: "Du regner kapasiteten i lavsesongen av de 800 rommene som er åpne, 800 × 150 = 120 000 romdøgn, ikke av alle 1 000." },
        { k: "tall", t: "Du sanity-sjekker tallet, for eksempel mot dagens 48 millioner i lavsesongen: 48 × 55 ÷ 40 = 66, altså 18 mer." },
        { k: "kommunikasjon", t: "Du setter tallet opp mot hotellet i én setning, for eksempel 18 mot 31,2 millioner i romsalg, for 30 mot 250 millioner kroner." },
        { k: "tall", t: "Du regner på salgsdirektørens innvending, for eksempel i dekningsbidrag: 66 000 × 500 = 33,0 mot 33,6 millioner i dag." },
        { k: "nysgjerrighet", t: "Du sier hva innvendingen endrer: rabatten må treffe bare de nye gjestene, ikke vinterprisen for alle." },
        { k: "uklarhet", t: "Du sier at 55 prosent er hentet fra ett hotell, det største i kjeden, og at nivået må testes hotell for hotell." },
      ],
      felle: "Å regne løftet på alle 1 000 rom. De fire minste hotellene er stengt hele lavsesongen, så du får 22,5 millioner, en firedel for mye, og hele sammenligningen med nye hoteller hviler på et oppblåst tall.",
    },
    {
      art: "drøfting",
      sek: 240,
      kort: "Må være sant",
      tittel: "Hva må være sant, og hva gjør dere først?",
      sp: `<p>«Styret liker retningen, men det har hørt om vinterprogrammer før. <b>Hva må være sant
        for at lavsesongen skal fylles, hvordan tester dere det før dere forplikter dere, og i hvilken
        rekkefølge tar dere tiltakene?</b>»</p>`,
      fasit: `<p>Poenget først: <b>vinterløftet står på tre forutsetninger, og alle tre kan testes
        denne vinteren på noen få hoteller før noe rulles ut.</b></p>
      <table class="data">
        <tr><th>Må være sant</th><th>Hvorfor det kan svikte</th><th>Slik testes det</th></tr>
        <tr><td>Etterspørselen finnes, også utenfor Bergen</td><td>Mindre kystbyer har ikke Bergens
          marked for kurs og firma</td><td>Konkurrentenes vinterbelegg i de samme byene, og
          forespørsler dere har sagt nei til eller aldri svart på</td></tr>
        <tr><td>Skjærlys kan selge den</td><td>Kurs og konferanser bookes ofte måneder i forveien, og
          salget er bygget for sommergjester</td><td>Salgsteam på tre av hotellene med store
          møterom, målt på bookinger for neste vinter</td></tr>
        <tr><td>Prisen holder</td><td>Rabatten lekker til gjester som ville kommet uansett</td><td>Pakker
          og gruppepriser som bare gjelder nye bookinger, målt på dekningsbidrag per rom mot
          hotellene uten program</td></tr>
      </table>
      <p><b>Hindringen som stopper det hvis ingen gjør noe:</b> hotelldirektørene setter prisene og
        har bonus på belegg. Belegg er lettest å kjøpe med rabatt, og da gjør de akkurat det
        salgsdirektøren foreslo. RevPAR alene er heller ikke nok: priskuttet løftet RevPAR fra 400 til
        440 mens dekningsbidraget falt. Bytt målet til dekningsbidrag per rom fra neste år, ellers blir
        gevinsten aldri realisert.</p>
      <p><b>Rekkefølgen, med grove tall:</b></p>
      <ol>
        <li><b>Lavsesongen, med kurs og konferanse først</b>, drevet fra de sju hotellene med store
          møterom. Løftet til 55 prosent er 18 millioner, og konferansegjestene legger igjen like mye
          i mat og møterom som på rommet. Størst, og langt raskere enn å bygge.</li>
        <li><b>Priser som følger etterspørselen.</b> Lite kapital, og det virker i alle sesonger. Et
          prissystem som lærer av bookingdataene, er også det naturlige stedet å bruke KI. Avviste
          gjester om sommeren betyr for lav pris i toppukene: 5 prosent høyere snittpris i
          høysesongen er 162 × 5 % = 8,1 millioner.</li>
        <li><b>Mellomsesongen</b>, med 48 000 tomme romdøgn. 10 prosentpoeng mer er
          120 000 × 10 % × 1 250 = 15 millioner.</li>
        <li><b>Et vinterprodukt for fritidsgjester</b>, som vinterpakker i nord, der kurs og
          konferanse er svakest. Nytt produkt og nye partnere: test på ett eller to hoteller før det
          skaleres.</li>
        <li><b>Å holde de fire minste åpne lenger</b>, til sist. Små hoteller, lite etterspørsel, og hver
          uke åpent koster bemanning og drift.</li>
      </ol>
      <p>De tre første gir rundt 18 + 8,1 + 15 = 41,1 millioner i romsalg, nesten halvparten av målet
        på rundt 90, uten ett nytt rom.</p>`,
      krav: [
        { k: "struktur", t: "Du deler forutsetningene i en rekke som ikke overlapper, for eksempel etterspørsel, salgsevne og pris." },
        { k: "uklarhet", t: "Du foreslår en test før utrulling, for eksempel et program på noen få hoteller denne vinteren, målt mot resten." },
        { k: "nysgjerrighet", t: "Du tar opp at direktørene har bonus på belegg, og foreslår et mål som ikke belønner rabatt, for eksempel dekningsbidrag per rom." },
        { k: "tall", t: "Du gir minst to av tiltakene et grovt tall, for eksempel 18 millioner i lavsesongen og 15 i mellomsesongen." },
        { k: "struktur", t: "Du begrunner rekkefølgen med hvor mye tiltaket gir og hvor raskt det virker." },
        { k: "kommunikasjon", t: "Du svarer konkret for Skjærlys, med minst to av casens egne fakta, ikke med en generell risikoliste." },
      ],
      felle: "Å levere en generell risikoliste, som marked, konkurrenter og gjennomføring, uten test og uten rekkefølge. En risiko uten en test dere kan starte denne vinteren, er bare en bekymring.",
    },
    {
      art: "syntese",
      sek: 240,
      kort: "Anbefaling",
      tittel: "Anbefalingen til styret",
      sp: `<p>«Styremøtet er neste uke, og styrelederen har <b>ett minutt</b>. Gi meg
        anbefalingen.»</p>
        <p>Midtveis avbryter intervjueren: <i>«Vi fikk nettopp vite at en konkurrent åpner et nytt
        hotell med 250 rom i Bergen neste år, der dere har det største hotellet deres. Endrer det
        anbefalingen?»</i></p>
        <p class="tiny">Skriv anbefalingen slik du ville sagt den, og ta med hvordan du svarer på
        den nye informasjonen.</p>`,
      fasit: `<p>Topp-ned, med et tall i hver grunn, og med neste steg. I en PwC-case er
        gjennomføringen en del av svaret.</p>
      <blockquote>
        <p>«Ikke bygg tre hoteller nå. Fyll rommene dere har først. Tre grunner. Én: et nytt hotell
        arver mønsteret dere har. Det gir 31,2 millioner i romsalg, over halvparten på tre
        sommermåneder, og står 60 prosent tomt om vinteren. To: de tomme rommene finnes allerede,
        120 000 romdøgn utenom sommeren. Et lavsesongprogram til 30 millioner kan gi 18 millioner i
        romsalg i året. Et hotell gir 31,2 og koster 250. Tre: vinter, mellomsesong og pris kan gi
        rundt 41 av de 90 millionene i romsalg som målet krever, uten ett nytt rom og før et nytt
        hotell er innkjørt i år fem. Risikoen er at vinteren ikke fylles, at marginen ligger under
        12 prosent de to årene programmet koster, og at et hotell vedtatt senere ikke rekker år fem.
        Derfor tester vi på tre hoteller med store møterom i vinter, flytter direktørenes bonus bort
        fra belegg, og tar stilling til hotell nummer én om 18 måneder.»</p>
      </blockquote>
      <p><b>Svaret på avbrytelsen</b> er et eget, kort svar, ikke en ny runde med hele analysen:</p>
      <blockquote>
        <p>«Konkurrenten endrer risikoen, ikke retningen. Planen var å løfte de andre hotellene opp
        mot Bergens 55 prosent, så løftet lå uansett utenfor Bergen. Det som trues, er Bergens eget
        belegg og beviset for at 55 prosent går an. Jeg binder de største kurs- og firmakundene i
        Bergen til avtaler før konkurrenten åpner, og sjekker hvilke gjester og hvor store møterom de
        satser på. Å bygge selv i Bergen blir enda mindre aktuelt.»</p>
      </blockquote>
      <p>Legg merke til formen: <b>standpunkt, tre grunner med tall, risikoen anbefalingen skaper, og
        neste steg med et beslutningspunkt.</b> Den nye informasjonen endrer risikoen, ikke
        retningen.</p>
      <p><b>Hvis styret spør hva rekkefølgen koster, si det rett ut:</b> «Med denne rekkefølgen når
        dere rundt halvparten av målet i år fem. Et hotell vedtatt om 18 måneder er ikke innkjørt
        før år seks eller sju. Det er prisen for å ikke binde 750 millioner nå.»</p>`,
      krav: [
        { k: "kommunikasjon", t: "Du sier anbefalingen i første setning, med et verb og et objekt, for eksempel «ikke bygg tre hoteller nå»." },
        { k: "tall", t: "Du bruker tallene fra casen i grunnene, for eksempel 18 mot 31,2 millioner i romsalg og 30 mot 250 millioner kroner." },
        { k: "tall", t: "Du sier ærlig hvor langt rommene kjeden allerede har, når mot målet, med et tall, for eksempel rundt 41 av de 90 millionene i romsalg." },
        { k: "nysgjerrighet", t: "Du tar inn konkurrenten uten å kapitulere, og sier hva nyheten endrer og hva den ikke endrer." },
        { k: "uklarhet", t: "Du sier hva du må sjekke om konkurrenten, for eksempel hvilke gjester de sikter på og hvor store møterom de får." },
        { k: "struktur", t: "Du avslutter med et neste steg og et beslutningspunkt: test nå, og ta stilling til hotell nummer én når vinterresultatene finnes." },
      ],
      felle: "Å svare på konkurrenten med å bygge i Bergen for å holde på markedet. Da bygger du vinterproblemet inn i en by som allerede får 250 nye rom, og gir opp det billigste svaret i casen.",
    },
  ],
},
/* Markedsinngang for et regionalt strømselskap som vil selge og montere solceller
   på kundenes tak. Energi er en av PwC Consultings bransjer i Norge, og strømselskaper
   som leter etter noe mer å selge enn kilowattimer, er et typisk oppdrag.

   Mekanismen er ny for markedsinngang: det adresserbare markedet er en liten brøkdel av
   kundebasen, og selv den brøkdelen er større enn det noen kan montere. Den bindende
   begrensningen er monteringskapasitet, ikke etterspørsel. Klientens fortrinn er
   tilgangen til kunden, ikke monteringen, og derfor er inngangsmåten (partner, bygge
   selv eller kjøpe en installatør) selve beslutningen. Den eksisterende
   markedsinngangscasen handler om breakeven som markedsandel; den gjentas ikke her.

   «Les nøye»: fotnoten under tabellen sier at kundens tall er med mva. og
   kostnadene uten. Den biter i bidraget per anlegg (trinn 6) og igjen i syntesen, der
   styreleder spør om et priskutt. Motstanden i syntesen er et ventet fall i kraftprisen.
   Det er framtidig med vilje: besparelsen i materialet er regnet med dagens priser, så et
   fall som alt hadde skjedd, ville vært telt to ganger. Svaret hviler på samme mekanisme:
   så lenge monteringen begrenser, spiser et fall i etterspørselen av sikkerhetsmarginen
   før det spiser av salget, men det gjør fast kapasitet risikabel. */
{
  id: "pwc-kraftselskap-solceller",
  label: "Strømselskapet som vil selge solceller",
  type: "Markedsinngang",
  nivå: "Middels",
  firma: "PwC",
  stil: "interviewer-led",
  minutter: 40,
  ch: [3, 5, 6, 7, 8, 10],
  blurb: "Et regionalt strømselskap med 300 000 privatkunder vurderer å selge og montere solceller. Trener markedsinngang med egne anslag, enhetsøkonomi og en anbefaling som tåler ny informasjon.",
  prompt: `<p>Klienten er <b>Østbygd Energi</b>, et regionalt strømselskap på Østlandet med
    <b>300 000 privatkunder</b>. Østbygd selger bare strøm. Strømmen er den samme hos alle
    leverandører, og selskapet opplever at flere kunder bytter enn før. Ledelsen vurderer derfor
    å <b>selge og montere solcelleanlegg</b> på kundenes tak. Konsernsjefen har sagt til styret:
    «Hvis bare fem prosent av kundene våre kjøper, er det 15 000 anlegg.»</p>
    <p><b>Viktige forhold:</b></p>
    <ul>
      <li>Østbygd når alle kundene gjennom appen og strømregningen, og regner med at et salg vil
        koste rundt <b>5 000 kroner</b>. Installatørene i regionen bruker rundt 15 000 kroner på å
        skaffe én kunde.</li>
      <li>Østbygd har ingen montører eller elektrikere, og har aldri drevet med takarbeid.</li>
      <li>Solcelleinstallatørene i regionen har ventelister på fire til seks måneder.</li>
      <li>Kundene velger Østbygd fordi selskapet oppleves som trygt. Ledelsen kaller merkevaren
        selskapets viktigste eiendel.</li>
    </ul>
    <table class="data">
      <tr><th>Typisk anlegg, 10 kW på en enebolig</th><th class="n">Kroner</th></tr>
      <tr><td>Pris til kunden</td><td class="n">150 000</td></tr>
      <tr><td>Utstyr: paneler, inverter og feste</td><td class="n">45 000</td></tr>
      <tr><td>Montering, installatørens pris</td><td class="n">30 000</td></tr>
      <tr><td>Kundens besparelse per år, med dagens strømpriser</td><td class="n">12 500</td></tr>
    </table>
    <p class="tiny">Kilde: Østbygds egen kalkyle og tilbud fra leverandører. Pris og besparelse
    for kunden er oppgitt inkl. mva., kostnadene eks. mva.</p>
    <p><b>Klienten spør:</b> Bør Østbygd begynne å selge og montere solcelleanlegg?</p>`,
  bakgrunn: `<p>Casen speiler to ting PwC Consulting i Norge oppgir at de jobber med:
    <b>energi</b> som bransje, og <b>innovasjon og nye forretningsmodeller</b> som tjeneste. Et
    strømselskap som vil selge noe mer enn kilowattimer, er et typisk oppdrag. Produktet er likt
    hos alle, og kundeforholdet er det eneste selskapet har som konkurrentene ikke har.</p>
    <p>Mekanismen: <b>totalmarkedet ser stort ut, men bare en liten brøkdel er reelle kjøpere, og
    selv de er flere enn noen kan montere.</b> 300 000 kunder blir 7 200 som sier at de
    sannsynligvis kjøper på tre år, og partnerne kan montere 300 i året. Når kapasiteten er
    flaskehalsen, er det den som bestemmer volumet. Da er inngangsmåten, altså hvordan klienten
    skaffer montering, selve beslutningen. Klientens fortrinn er tilgangen til kunden, ikke
    monteringen, og det fortrinnet er verdt noe bare hvis noen monterer.</p>
    <p>Den samme mekanismen styrer svaret på motstanden i syntesen. Så lenge monteringen
    begrenser, spiser et fall i etterspørselen av sikkerhetsmarginen før det spiser av salget.
    Men det gjør fast kapasitet, som et oppkjøp, risikabel. Og et priskutt for å redde
    etterspørselen gir bort margin uten å gi ett montert anlegg mer.</p>
    <p>«Les nøye»-detaljen er fotnoten under tabellen: prisen til kunden er oppgitt med mva.,
    kostnadene uten. PwC ber deg lese materialet «svært nøye», og det er slike detaljer de mener.
    Den som regner margin på prisen med mva., får 70 000 kroner per anlegg i stedet for 40 000.</p>`,
  trinn: [
    {
      art: "forberedelse",
      sek: 360,
      tittel: "Seks minutter med materialet",
      sp: `<p>«Du får seks minutter med materialet før vi begynner. Notatene tar du med deg inn.»</p>
        <p class="tiny">Gode notater har fire deler: målet med klientens egne ord, tallene som
        betyr mest, det som mangler, og en foreløpig hypotese. Stikkord, ikke setninger.</p>`,
      fasit: `<p>Slik kan notatene se ut etter seks minutter. Stikkord, og mest om det som
        <i>ikke</i> står på arket.</p>
        <ul>
          <li><b>Målet:</b> «Bør Østbygd begynne å selge og montere solcelleanlegg?» Ja eller nei,
            og i så fall hvordan.</li>
          <li><b>Tallene:</b> 300 000 kunder. Kunden betaler 150 000 og sparer 12 500 i året:
            150 000 ÷ 12 500 = 12 års tilbakebetaling. Et salg koster Østbygd 5 000, installatørene
            15 000.</li>
          <li><b>Påstand å teste:</b> konsernsjefens 5 % = 15 000 anlegg. Ovenfra og ned, og uten
            tidsperiode.</li>
          <li><b>Mangler:</b> Hvor mange bor i enebolig? Hvor mange tak egner seg? Kjøper noen med
            12 års tilbakebetaling? Hvem monterer? Hva koster det å drive?</li>
          <li><b>Hypotese:</b> kan lønne seg, fordi Østbygd skaffer kunder billig. Men 15 000 må
            testes nedenfra.</li>
        </ul>
        <p>Legg merke til hva notatene ikke gjør: de skriver ikke av materialet. Arket har du
        fortsatt foran deg. Notatene er for det du har regnet ut, det du lurer på, og det du
        tror.</p>`,
      krav: [
        { k: "kommunikasjon", t: "Du skriver klientens spørsmål med klientens egne ord øverst i notatene." },
        { k: "tall", t: "Du regner minst ett nøkkeltall i lesetiden, for eksempel kundens tilbakebetalingstid: 150 000 delt på 12 500 er 12 år." },
        { k: "uklarhet", t: "Du lister minst tre ting som mangler, for eksempel boligtype, tak og hvem som skal montere." },
        { k: "nysgjerrighet", t: "Du merker konsernsjefens 15 000 anlegg som en påstand som skal testes, ikke som et faktum." },
        { k: "uklarhet", t: "Du skriver en foreløpig hypotese i én setning, selv om den kan vise seg å være feil." },
      ],
      felle: "Å skrive av materialet. Arket har du fortsatt foran deg, og notater som gjentar tabellen, gir deg ingenting nytt når intervjueren begynner å spørre.",
    },
    {
      art: "oppklaring",
      sek: 180,
      tittel: "Hva vil du avklare?",
      sp: `<p>«Før vi går i gang: hva vil du avklare, og hvilke antagelser gjør du?»</p>`,
      fasit: `<p>Tre til fem spørsmål er nok. De sterke går rett på to ting: hvor mange av de
        300 000 som faktisk kan bli kunder, og hva Østbygd mangler for å levere.</p>
        <ul>
          <li><b>Hva vil styret oppnå?</b> Skal solcellene lønne seg i seg selv, eller er de et
            middel for å holde på strømkundene? Det avgjør hva «godt nok» betyr.</li>
          <li><b>Hvor mange av kundene kan i det hele tatt kjøpe?</b> Hvor mange bor i enebolig,
            og hvor mange av dem har et tak som egner seg? I blokk og rekkehus er taket, og
            beslutningen, ofte felles.</li>
          <li><b>Hva sier kundene om prisen?</b> Finnes det data på kjøpsvilje ved den
            tilbakebetalingstiden anlegget faktisk har?</li>
          <li><b>Hvem skal montere?</b> Østbygd har ingen montører, og installatørene har
            ventelister. Hvor mye kapasitet finnes, og til hvilken pris?</li>
          <li><b>Hva koster det å drive?</b> Faste kostnader til salg, prosjektledelse og
            kundeservice.</li>
        </ul>
        <p><b>Svarene du får:</b></p>
        <ul>
          <li>Styret vil at solcellene skal <b>lønne seg i seg selv</b>. At kundene blir mer
            lojale, er en bonus styret ikke vil betale for.</li>
          <li>Østbygd har ikke koblet kundelisten mot boligtype. «Hva ville du antatt?»</li>
          <li>En takanalyse Østbygd har kjøpt, viser at <b>fire av ti eneboliger</b> i regionen har
            tak som egner seg: riktig retning, lite skygge, og tak som ikke må skiftes med det
            første.</li>
          <li>Det finnes en kundeundersøkelse. Du får se den straks.</li>
          <li>Hvordan monteringen skal løses, er en del av det Østbygd vil ha råd om.</li>
          <li>Østbygd regner med et lite team til salg, prosjektledelse og kundeservice:
            <b>6 millioner kroner i året</b> i faste kostnader.</li>
          <li>Klienten oppgir at kunden kan få et offentlig tilskudd. Det er holdt utenfor alle
            tallene i casen, også tilbakebetalingstiden.</li>
        </ul>
        <p><b>Antagelsen du må ta selv:</b> andelen i enebolig. Bruk ankeret: rundt 1,3 millioner
        eneboliger mot 2,65 millioner husholdninger, om lag halvparten. Si det høyt: «Jeg antar at
        halvparten av kundene bor i enebolig, og holder blokk og rekkehus utenfor.» Kundene til et
        regionalt selskap bor trolig oftere i enebolig enn landssnittet, så halvparten er heller
        forsiktig.</p>`,
      krav: [
        { k: "nysgjerrighet", t: "Du spør hvor mange av de 300 000 kundene som bor i enebolig med et tak som egner seg." },
        { k: "nysgjerrighet", t: "Du spør hvem som skal montere anleggene, siden Østbygd ikke har en eneste montør." },
        { k: "uklarhet", t: "Du sier minst én antagelse høyt med et tall, for eksempel at halvparten av kundene bor i enebolig." },
        { k: "struktur", t: "Du spør hva styret vil oppnå, fordi lønnsomhet i seg selv og lojale strømkunder gir ulike svar." },
        { k: "kommunikasjon", t: "Du sier hva hvert spørsmål skal brukes til, i stedet for å lese opp en liste." },
      ],
      felle: "Å spørre om konkurrenter, paneltyper og leverandører, og glemme de to spørsmålene som bestemmer volumet: hvem som faktisk kan kjøpe, og hvem som skal montere.",
    },
    {
      art: "struktur",
      sek: 300,
      tittel: "Hvordan angriper du dette?",
      sp: `<p>«Hvordan vil du angripe dette? Gi meg strukturen, hypotesen din, og hvor du
        starter.»</p>
        <p>Når du er ferdig, legger intervjueren til: <i>«Og hvor kunne KI spart deg tid i
        analysen?»</i></p>`,
      fasit: `<p>Markedsinngang har fire spørsmål, og rekkefølgen er poenget. Det som gjør
        strukturen til <i>denne</i> klientens, er grenene under dem.</p>
        <div class="formula"><div class="eq">Finnes kundene? → Kan vi levere? → Tjener vi penger? → Hvordan går vi inn?</div></div>
        <ul>
          <li><b>Finnes kundene?</b> Bygg det nedenfra, ikke fra konsernsjefens fem prosent:</li>
        </ul>
        <div class="formula">
          <div class="eq">Kjøpere = kunder × andel i enebolig × andel med egnet tak × kjøpsandel ved kundens tilbakebetalingstid</div>
          <div class="where">Kjøpsandelen styres av tilbakebetalingstiden, og den styres igjen av to
            ting: prisen på anlegget og strømprisen.</div>
        </div>
        <ul>
          <li><b>Kan vi levere?</b> Østbygd har ingen montører, og installatørene har ventelister.
            Hvor mange anlegg kan monteres i året, av hvem, og hvor fort kan det økes?</li>
          <li><b>Tjener vi penger?</b> Bidrag per anlegg: pris minus utstyr, montering og salg. Så
            antall anlegg × bidrag, minus de faste kostnadene på 6 millioner.</li>
          <li><b>Hvordan går vi inn?</b> Samarbeide med installatører, bygge egne montørlag, eller
            kjøpe en installatør. Og hva som kan velte planen: strømprisen, kvaliteten på
            monteringen, og merkevaren.</li>
        </ul>
        <p><b>Hypotesen:</b> «Kjøperne er langt færre enn 15 000, fordi bare eneboliger med godt tak
        og god nok tilbakebetaling kjøper. Og det er ikke sikkert noen kan montere dem.» Jeg starter
        med kundene, fordi konsernsjefens tall er det hele ideen hviler på, og fordi det er raskest å
        teste med det vi har.</p>
        <p><b>Og KI:</b> svar konkret, og start med data Østbygd allerede har. «KI kan analysere
        store datamengder» er ikke et svar.</p>
        <ul>
          <li><b>Forbruket:</b> Østbygd har måledata fra strømmåleren til hver kunde. Med dem kan
            tilbakebetalingstiden regnes for hvert hus, ikke for en snittkunde.</li>
          <li><b>Takene:</b> koble kundeadressene mot flyfoto og høydedata, og la en bildemodell
            sortere eneboligene etter retning, skygge og takflate. Da vet du <i>hvem</i> som har
            egnet tak, ikke bare hvor mange.</li>
          <li><b>Salget:</b> tilbudet går først til dem der regnestykket er best. Det gjør et salg
            enda billigere, og det er der Østbygds fortrinn ligger.</li>
        </ul>`,
      krav: [
        { k: "struktur", t: "Du har en egen gren for monteringskapasitet, adskilt fra spørsmålet om kundene finnes." },
        { k: "struktur", t: "Du bygger etterspørselen som en kjede nedenfra: kunder, enebolig, egnet tak, kjøpsandel." },
        { k: "struktur", t: "Du har inngangsmåten som egen gren: samarbeide, bygge selv eller kjøpe en installatør." },
        { k: "uklarhet", t: "Du avslutter med en hypotese i én setning, selv om du ennå ikke har tallene som kan bekrefte den." },
        { k: "kommunikasjon", t: "Du sier hvilken gren du starter i, og hvorfor akkurat den er viktigst å teste først." },
        { k: "nysgjerrighet", t: "Du foreslår en konkret KI-bruk på Østbygds egne data, for eksempel måledata fra strømmåleren til hver kunde." },
      ],
      felle: "Å bruke en generisk mal med marked, konkurrenter og kunder, uten en gren for hvem som skal montere. Da regner du bare på etterspørselen, og overser at Østbygd ikke har én eneste montør.",
    },
    {
      art: "exhibit",
      sek: 300,
      kort: "Undersøkelsen",
      tittel: "Hva sier kundene?",
      sp: `<p>Intervjueren deler skjermen: «Dette er kundeundersøkelsen Østbygd gjorde i vår. Hva
        ser du, og hva betyr det for hvor mange kjøpere Østbygd faktisk har?»</p>
        <p class="tiny">Legg til grunn at halvparten av kundene bor i enebolig, og at fire av ti
        eneboliger har tak som egner seg.</p>
        <p>Når du har svart, legger intervjueren til: <i>«Konsernsjefen synes dette er altfor
        forsiktig. Fem prosent av 300 000 er 15 000 anlegg, sier han. Hva svarer du ham?»</i></p>`,
      figur: `<table class="data">
          <tr><th>Tilbakebetalingstid for kunden</th><th class="n">Sannsynligvis kjøpe innen tre år</th></tr>
          <tr><td>8 år</td><td class="n">25 %</td></tr>
          <tr><td>10 år</td><td class="n">18 %</td></tr>
          <tr><td>12 år</td><td class="n">12 %</td></tr>
          <tr><td>15 år</td><td class="n">6 %</td></tr>
          <tr><td>18 år</td><td class="n">3 %</td></tr>
        </table>
        <p class="tiny">1 000 eneboligeiere med egnet tak, trukket fra Østbygds kunder. Hver fikk
        oppgitt én tilbakebetalingstid og ble spurt: «Hvor sannsynlig er det at du kjøper
        solcelleanlegg de neste tre årene?» Andelen er dem som svarte «svært» eller «ganske»
        sannsynlig.</p>`,
      fasit: `<p>Si overskriften først: <i>«Kjøperne er noen få prosent av kundene, og kjøpsandelen
        faller bratt når tilbakebetalingstiden øker.»</i></p>
        <p><b>Først: hvilken rad gjelder?</b> Kunden betaler 150 000 og sparer 12 500 i året, altså
        12 års tilbakebetaling. Da er kjøpsandelen 12 prosent.</p>
        <div class="formula">
          <div class="eq">300 000 kunder × ½ i enebolig = 150 000 eneboliger</div>
          <div class="eq">150 000 × 40 % med egnet tak = 60 000</div>
          <div class="eq">60 000 × 12 % = <b>7 200 kjøpere på tre år</b>, altså <b>2 400 i året</b></div>
          <div class="where">7 200 er 2,4 prosent av kundene, og det er dem som <i>sier</i> at de
            sannsynligvis kjøper. Uttalt kjøpsvilje er nesten alltid høyere enn faktisk kjøp, og
            ikke alle kjøper av Østbygd. Halverer du, er det rundt 1 200 i året. Si det som en antagelse, ikke som et
            faktum.</div>
        </div>
        <p><b>Så det som betyr mest: kurven er bratt.</b> Fra 12 til 15 års tilbakebetaling halveres
        kjøpsandelen, fra 12 til 6 prosent. Fra 12 ned til 10 år øker den med halvparten.
        Tilbakebetalingstiden er den viktigste driveren for etterspørselen, og den bestemmes av to
        ting Østbygd bare delvis styrer: prisen på anlegget og strømprisen. Det gjør strømprisen
        til en hovedrisiko.</p>
        <p><b>Svaret til konsernsjefen:</b> spør først over hvor lang tid. Regn så baklengs:
        15 000 anlegg er 10 prosent av eneboligene og 25 prosent av dem med egnet tak. Så høy
        kjøpsandel gir undersøkelsen først ved <b>åtte års</b> tilbakebetaling, altså en pris på
        100 000 kroner i stedet for 150 000. Med dagens pris sier 7 200 at de sannsynligvis kjøper
        på tre år, under halvparten av tallet hans.</p>
        <p>Hold fast på tallet, men gi ham en vei videre: «Tallet ditt stemmer hvis anlegget betaler
        seg på åtte år. Til denne prisen gjør det ikke det.»</p>`,
      krav: [
        { k: "tall", t: "Du regner kundens tilbakebetalingstid til 12 år før du leser tabellen, så du bruker riktig rad." },
        { k: "tall", t: "Du bygger kjeden nedenfra til rundt 7 200 kjøpere på tre år, eller 2 400 i året." },
        { k: "uklarhet", t: "Du tar et lavere anslag enn undersøkelsen, fordi færre kjøper enn de som sier at de vil." },
        { k: "kommunikasjon", t: "Du sier overskriften før tallene: kjøperne er noen få prosent av kundene." },
        { k: "tall", t: "Du tallfester hvor bratt kurven er: fra 12 til 15 års tilbakebetaling halveres kjøpsandelen." },
        { k: "nysgjerrighet", t: "Du svarer konsernsjefen med tall, for eksempel at 15 000 er 25 prosent av dem med egnet tak, eller at det krever åtte års tilbakebetaling." },
      ],
      felle: "Å gange 12 prosent med alle 300 000 kundene. Undersøkelsen er gjort blant eneboligeiere med egnet tak, så svaret blir 36 000 i stedet for 7 200, fem ganger for høyt.",
    },
    {
      art: "regne",
      sek: 300,
      kort: "Kapasitet",
      tittel: "Hvor mange anlegg kan Østbygd selge?",
      sp: `<p>Intervjueren gir deg tallene for monteringen:</p>
        <ul>
          <li>Et montørlag, to montører og en elektriker, monterer <b>to anlegg i uka</b>.</li>
          <li>Takarbeid skjer i praksis fra april til oktober, rundt <b>30 uker</b> i året.</li>
          <li>Regionen har <b>30 lag</b> i dag. De monterte <b>1 800 anlegg</b> i fjor.</li>
          <li>To installatører tilbyr å sette inn <b>5 nye lag</b> med erfarne montører, som bare
            monterer for Østbygd fra første uke i sesongen, mot at Østbygd garanterer dem fullt
            belegg. Flere lag klarer de ikke å skaffe til neste sesong. De andre installatørene har
            ikke ledig kapasitet.</li>
        </ul>
        <p><b>«Hvor mange anlegg kan Østbygd realistisk selge og få montert i første sesong?»</b></p>
        <p>Når du har svart, spør intervjueren: <i>«Hvor mange lag ville Østbygd trengt for å ta
        hele etterspørselen?»</i></p>
        <p class="tiny">Si framgangsmåten høyt før du sier tallet.</p>`,
      svar: 300,
      enhet: "anlegg",
      toleranse: 0.02,
      fasit: `<p>Regn kapasiteten, og sammenlign den med etterspørselen. Salget blir det minste av
        de to.</p>
        <div class="formula">
          <div class="eq">Kapasitet: 5 lag × 2 anlegg i uka × 30 uker = <b>300 anlegg</b></div>
          <div class="eq">Etterspørsel: 2 400 i året sier ja, rundt 1 200 kjøper</div>
          <div class="eq">Salg = det minste av kapasitet og etterspørsel = <b>300 anlegg</b></div>
          <div class="where">Østbygd kan ikke selge mer enn noen kan montere. Det som selges utover
            300, blir en venteliste med Østbygds navn på.</div>
        </div>
        <p><b>Sanity-sjekk mot regionen:</b> 1 800 anlegg på 30 lag er 60 per lag, akkurat det et
        lag rekker på 30 uker. Regionen går for full maskin, og ventelistene i materialet bekrefter
        det. Det finnes ingen ledig kapasitet å leie.</p>
        <p><b>Så hva:</b></p>
        <ul>
          <li>Etterspørselen er fire til åtte ganger kapasiteten. <b>Det er monteringen som setter
            taket, ikke kundene.</b></li>
          <li>Skal Østbygd ta de rundt 1 200 som faktisk kjøper, trengs 1 200 ÷ 60 = <b>20 lag</b>.
            Det er to tredeler av alle lagene i regionen i dag.</li>
          <li>Konsernsjefens 15 000 anlegg er <b>50 års</b> kapasitet med disse lagene.</li>
          <li>Derfor er spørsmålet om hvordan Østbygd skaffer montering, ikke en detalj i
            gjennomføringen. Det er selve beslutningen.</li>
        </ul>`,
      krav: [
        { k: "tall", t: "Du regner kapasiteten riktig: 5 lag × 2 anlegg × 30 uker = 300 anlegg i året." },
        { k: "struktur", t: "Du setter salget lik det minste av kapasitet og etterspørsel, ikke lik etterspørselen." },
        { k: "tall", t: "Du sanity-sjekker mot regionen: 1 800 anlegg på 30 lag er 60 per lag, altså fullt utnyttet." },
        { k: "kommunikasjon", t: "Du sier «så hva» høyt: det er monteringen som setter taket, ikke kundene." },
        { k: "tall", t: "Du regner hvor mange lag som trengs for å ta etterspørselen, for eksempel 1 200 delt på 60 er 20 lag." },
      ],
      felle: "Å svare med etterspørselen, 2 400 eller 1 200. Kunder som vil kjøpe, er ikke anlegg som blir montert, og alt Østbygd selger utover 300, blir en venteliste med Østbygds navn på.",
    },
    {
      art: "regne",
      sek: 300,
      kort: "Per anlegg",
      tittel: "Hva er ett anlegg verdt for Østbygd?",
      sp: `<p>«La oss se på hva ett anlegg er verdt i partnermodellen. Installatørene tar
        30 000 kroner for monteringen, som i tabellen.»</p>
        <p><b>«Hva sitter Østbygd igjen med per anlegg etter utstyr, montering og salgskostnad, i
        kroner?»</b></p>
        <p>Når du har svart, spør intervjueren: <i>«Betyr det at tilbakebetalingstiden på tolv år
        var feil?»</i></p>
        <p class="tiny">Bruk tallene i materialet. Si framgangsmåten høyt før du sier tallet.</p>`,
      svar: 40000,
      enhet: "kroner",
      toleranse: 0.02,
      fasit: `<p>Første grep: se hva tallene inkluderer. Fotnoten sier at prisen til kunden er
        oppgitt <b>med</b> merverdiavgift, og kostnadene <b>uten</b>. Mva. er ikke Østbygds
        penger. Den kreves inn fra kunden og betales videre til staten. Før du trekker fra noe, må
        prisen over på samme grunnlag som kostnadene.</p>
        <div class="formula">
          <div class="eq">Pris uten mva. = 150 000 ÷ 1,25 = 120 000</div>
          <div class="eq">Kostnader = 45 000 utstyr + 30 000 montering + 5 000 salg = 80 000</div>
          <div class="eq">Bidrag per anlegg = 120 000 − 80 000 = <b>40 000 kroner</b></div>
          <div class="where">Det er en tredel av prisen uten mva. Mva. er 25 prosent av prisen
            <i>uten</i> avgift, og dermed en femdel av prisen <i>med</i>: 30 000 av 150 000.
            Trekker du 25 prosent av 150 000, får du 112 500, og det er også feil.</div>
        </div>
        <p><b>Svaret på oppfølgingen er nei.</b> Tilbakebetalingstiden var riktig regnet på
        150 000. En husholdning får ikke trekke fra mva., så for kunden er 150 000 den faktiske
        prisen, og besparelsen er også i kroner med mva. Samme tall, to sannheter, avhengig av
        hvem som betaler.</p>
        <p><b>Så hva:</b></p>
        <ul>
          <li>300 anlegg × 40 000 = <b>12 millioner</b> i dekningsbidrag i første sesong. Minus
            6 millioner i faste kostnader blir det rundt <b>6 millioner</b> i resultat.</li>
          <li>Hvert nytt montørlag er verdt 60 × 40 000 = <b>2,4 millioner</b> i bidrag i året. Det
            er verdien av kapasitet, og den er grunnen til at inngangsmåten er beslutningen.</li>
          <li>Fortrinnet synes i tallet: Østbygd skaffer kunden for 5 000, installatørene for
            15 000. Forskjellen på 10 000 er en firedel av bidraget.</li>
          <li>Konsernsjefens 15 000 krevde en pris på 100 000. Uten mva. er det 80 000, akkurat
            kostnadene: null kroner i bidrag.</li>
        </ul>`,
      krav: [
        { k: "tall", t: "Du tar mva. ut av prisen før du trekker fra kostnadene: 150 000 delt på 1,25 er 120 000." },
        { k: "kommunikasjon", t: "Du sier framgangsmåten høyt før du sier tallet, så intervjueren kan følge hvert ledd." },
        { k: "tall", t: "Du lander på 40 000 kroner per anlegg, altså en tredel av prisen uten mva." },
        { k: "tall", t: "Du sier at kundens tilbakebetalingstid likevel regnes på 150 000, fordi en husholdning betaler mva." },
        { k: "kommunikasjon", t: "Du kobler tallet til beslutningen med et tall, for eksempel 12 millioner i bidrag mot 6 millioner i faste kostnader, eller 2,4 millioner per lag." },
      ],
      felle: "Å trekke kostnadene fra 150 000. Da får du 70 000 per anlegg i stedet for 40 000, og overvurderer bidraget med 75 prosent, fordi en femdel av det kunden betaler, tilhører staten.",
    },
    {
      art: "drøfting",
      sek: 240,
      kort: "Inngangsmåte",
      tittel: "Partner, bygge eller kjøpe?",
      sp: `<p>«Østbygd kan skaffe monteringskapasitet på tre måter.»</p>
        <ul>
          <li><b>Partner:</b> de 5 lagene fra installatørene, til 30 000 kroner per anlegg og med
            garantert fullt belegg.</li>
          <li><b>Bygge selv:</b> rekruttere og lære opp egne lag. Østbygd anslår 12 til 18 måneder
            før de første lagene er i full drift, og elektrikere er vanskelige å få tak i.</li>
          <li><b>Kjøpe:</b> en installatør i regionen med <b>8 lag</b> er til salgs for
            <b>40 millioner kroner</b>. Eieren vil trappe ned om to år. Om vinteren gjør lagene
            vanlig elektrikerarbeid.</li>
        </ul>
        <p><b>«Hvilken ville du valgt, og hvilke risikoer ville du prioritert?»</b></p>`,
      fasit: `<p><b>Poenget først:</b> «Ta partnerlagene nå, og kjøp installatøren hvis vintersalget
        holder. Ikke bygg selv.»</p>
        <p>Begrunnelsen kommer fra regnestykkene: det er monteringen som begrenser, og hvert lag er
        verdt 2,4 millioner i bidrag i året. Da er valget av inngangsmåte et valg av hvor mye
        Østbygd kan selge. Sammenlign alternativene på de samme kriteriene:</p>
        <table class="data">
          <tr><th></th><th>Partner</th><th>Bygge selv</th><th>Kjøpe</th></tr>
          <tr><td>Kapasitet neste sesong, anlegg</td><td class="n">300</td><td>nesten ingen</td><td class="n">480</td></tr>
          <tr><td>Kapital og binding</td><td>garantert belegg</td><td>lønn hele året</td><td>40 millioner</td></tr>
          <tr><td>Kontroll på kvaliteten</td><td>lav</td><td>høy</td><td>høy</td></tr>
          <tr><td>Det Østbygd må lære</td><td>lite</td><td>alt</td><td>å eie en håndverksbedrift</td></tr>
        </table>
        <ul>
          <li><b>Partner</b> gir 300 anlegg fra første uke i sesongen, uten kapital. Det er det
            raskeste stedet å starte, og det viser hvor mange som faktisk kjøper.</li>
          <li><b>Kjøpe</b> er det eneste som gir mye kapasitet raskt: 8 lag × 60 = 480 anlegg i
            året, med montører som kan tak, og vinterarbeid til lagene. Og det passer fortrinnet:
            Østbygd skaffer en kunde for 5 000 kroner, installatøren for 15 000, men bare
            installatøren kan montere. De 8 lagene er blant de 30 som allerede går for fullt:
            Østbygd overtar ordreboken og installatørens egne kunder. Det gjør første år tryggere,
            men ikke alle 480 går til Østbygds kunder.</li>
          <li><b>Prisen</b> kan sjekkes grovt: går alle 480 etter hvert til Østbygds kunder, er det
            rundt 19 millioner i bidrag i året, så 40 millioner er i størrelsesorden to års bidrag.
            Om prisen er riktig, avhenger av hva installatøren tjener i dag. Det må sjekkes.</li>
          <li><b>Sammen</b> gir partner og kjøp 780 anlegg, fortsatt under de rundt 1 200 som
            faktisk kjøper.</li>
          <li><b>Bygge selv</b> er svakest for akkurat denne klienten. Det tar 12 til 18 måneder,
            det krever alt Østbygd ikke kan, og lagene står uten takarbeid 22 uker i året, med full
            lønn.</li>
        </ul>
        <p><b>Hva som må være sant før Østbygd kjøper:</b> at Østbygds kunder og installatørens
        egne til sammen fyller 780 anlegg i året. Skal Østbygds kunder gjøre det alene, må rundt en
        tredel av de 2 400 som sier ja, faktisk kjøpe. Derfor er veikartet: partneravtale og
        intensjonsavtale med eksklusivitet på installatøren nå, salgstest i vinter, og kjøpet
        gjennomføres før sesongen hvis bestillingene holder. En del av prisen bør avhenge av volum
        de to årene eieren blir.</p>
        <p><b>Risikoene, i prioritert rekkefølge:</b></p>
        <ol>
          <li><b>Kraftprisen.</b> Den styrer tilbakebetalingstiden, og undersøkelsen viser at
            kjøpsandelen halveres fra 12 til 15 år. Oppkjøpet er den delen av planen som tåler det
            dårligst: 40 millioner blir ikke mindre når etterspørselen blir det.</li>
          <li><b>Kvalitet og garanti.</b> En lekkasje eller en brann i et anlegg med Østbygds navn
            på rammer kjernevirksomheten med 300 000 kunder, og det er tilliten som gjør at et salg
            koster 5 000. Østbygd må sette monteringsstandarden, kontrollere de første anleggene
            selv, og avtale hvem som bærer garantien hvis en partner går konkurs. Det er Østbygd
            kunden ringer.</li>
          <li><b>Folk.</b> Eieren går om to år, og gode lagledere er det knappeste i hele planen.
            Bind dem med en avtale som belønner at de blir.</li>
        </ol>`,
      krav: [
        { k: "kommunikasjon", t: "Du sier valget ditt i første setning, før du går gjennom alternativene." },
        { k: "struktur", t: "Du vurderer de tre alternativene mot de samme kriteriene, for eksempel tid, kapital og kontroll på kvaliteten." },
        { k: "uklarhet", t: "Du sier hvordan valget beskytter merkevaren, for eksempel med egen monteringsstandard og kontroll av de første anleggene." },
        { k: "tall", t: "Du bruker tall fra casen i sammenligningen, for eksempel 480 anlegg fra oppkjøpet eller 22 uker uten takarbeid." },
        { k: "uklarhet", t: "Du sier hva som må være sant for valget ditt, for eksempel kjøpere til 780 anlegg i året før et oppkjøp." },
        { k: "struktur", t: "Du begrunner hvilken risiko som er størst, i stedet for å liste risikoer." },
      ],
      felle: "Å anbefale å bygge egne montørlag fordi det gir mest kontroll og margin. Det bruker minst av det Østbygd er god på og mest av det de ikke kan, og lagene står uten takarbeid 22 uker i året.",
    },
    {
      art: "syntese",
      sek: 240,
      tittel: "Anbefalingen",
      sp: `<p>«Styreleder har ett minutt. Hva anbefaler du?»</p>
        <p>Midtveis avbryter hun: <i>«Terminprisene for de neste årene har falt kraftig den siste
        måneden. Markedet venter nå en kraftpris 40 prosent under dagens, og vi tror på det. Endrer
        det svaret ditt?»</i></p>
        <p>Når du har svart, spør hun: <i>«Kan vi ikke bare sette ned prisen, så kundene får tolv
        års tilbakebetaling igjen?»</i></p>
        <p class="tiny">Klienten oppgir at kraftprisen er rundt halvparten av det kunden sparer per
        kilowattime. Resten er nettleie og avgifter, som ikke ventes å falle. Skriv anbefalingen
        slik du ville sagt den, og ta med hvordan du svarer på innvendingene.</p>`,
      fasit: `<p>Topp-ned, med inngangsmåten i første setning. «Ja» alene er en halv anbefaling i
        en PwC-case; styret vil vite hvordan. Hele minuttet:</p>
        <blockquote>
          <p><b>«Ja. Østbygd bør selge solceller: med partnerlagene nå, og med installatøren hvis
          vintersalget holder. Partnerlagene alene gir 300 anlegg og 12 millioner i dekningsbidrag
          i første sesong, rundt 6 millioner etter faste kostnader.</b></p>
          <p>Tre grunner. For det første finnes kundene, men færre enn antatt: 7 200 sier at de
          sannsynligvis kjøper på tre år, ikke 15 000. For det andre er det monteringen som setter
          taket: partnerne gir 300 anlegg i året, mot rundt 1 200 som faktisk kjøper. For det tredje
          tjener Østbygd 40 000 kroner per anlegg etter mva., og 10 000 av dem er fortrinnet:
          kunden koster en tredel av det installatørene betaler.</p>
          <p>Den største risikoen er kraftprisen, fordi kjøpsandelen halveres fra 12 til 15 års
          tilbakebetaling. Derfor venter oppkjøpet på faktiske bestillinger. Det første jeg ville
          gjort, er å sende et konkret tilbud til et utvalg av kundene med egnet tak i vinter, og
          telle bestillinger, ikke svar.»</p>
        </blockquote>
        <p><b>Når hun avbryter om kraftprisen:</b></p>
        <blockquote>
          <p>«Det endrer oppkjøpet, ikke ja-et. Kraftprisen er halve besparelsen, så 40 prosent
          lavere kraftpris gir 20 prosent lavere besparelse. Tilbakebetalingen går fra 12 til 15 år:
          1 200 i året sier ja, kanskje 600 kjøper. Partnernes 300 fylles fortsatt. Men med
          installatøren skal 780 fylles, og de siste 180 må komme fra installatørens egne kunder,
          som rammes av det samme fallet. Da betaler vi 40 millioner for kapasitet vi ikke vet om vi
          fyller. Kjøpet venter en sesong.»</p>
        </blockquote>
        <div class="formula">
          <div class="eq">12 500 × (1 − ½ × 40 %) = 10 000 kroner i året → 150 000 ÷ 10 000 = 15 år</div>
          <div class="eq">60 000 × 6 % ÷ 3 = 1 200 i året sier ja, og halvert 600 som kjøper</div>
          <div class="eq">780 − 600 = 180 anlegg som må komme fra installatørens egne kunder</div>
          <div class="where">Legg merke til at fallet er <i>ventet</i>. Besparelsen på 12 500 er regnet
            med dagens priser, så det er framtiden som endres, ikke tallet du har regnet på.</div>
        </div>
        <p><b>Når hun spør om priskutt:</b></p>
        <blockquote>
          <p>«Nei. Tolv års tilbakebetaling krever en pris på 120 000. Uten mva. er det 96 000, og da
          sitter vi igjen med 16 000 per anlegg i stedet for 40 000. Når monteringen er
          flaskehalsen og 600 kjøpere allerede fyller 300 plasser, gir et priskutt ikke ett montert
          anlegg mer.»</p>
        </blockquote>
        <p>Legg merke til formen: <b>standpunkt med inngangsmåte, tre grunner med ett tall hver,
        største risiko og neste steg, og innvendinger som besvares med hva de endrer og hva de ikke
        endrer.</b> Det er den som skiller «distinkt» fra «solid». Og et poeng til hvis du får tid:
        faller etterspørselen i hele regionen, krymper ventelistene hos installatørene, og da blir
        kapasitet billigere å leie enn å kjøpe.</p>`,
      krav: [
        { k: "kommunikasjon", t: "Du sier i første setning hvordan Østbygd skal gå inn, ikke bare ja eller nei." },
        { k: "struktur", t: "Du gir tre grunner med ett tall fra casen i hver, for eksempel 7 200 kjøpere, 300 anlegg og 40 000 kroner." },
        { k: "tall", t: "Du regner om det ventede prisfallet: 40 prosent på halve besparelsen er 20 prosent, så 12 år blir 15." },
        { k: "nysgjerrighet", t: "Du sier hva innvendingen endrer og hva den ikke endrer, for eksempel oppkjøpet mot første sesong med partnerne." },
        { k: "tall", t: "Du avviser et priskutt med tall, for eksempel 16 000 mot 40 000 per anlegg, eller at 600 kjøpere allerede fyller 300 plasser." },
        { k: "uklarhet", t: "Du avslutter med et konkret neste steg som måler faktiske bestillinger, for eksempel et tilbud til et utvalg kunder i vinter." },
      ],
      felle: "Å kapitulere med «da lønner det seg ikke». Første sesong er begrenset av monteringen, ikke av kundene, så prisfallet spiser av sikkerhetsmarginen før det spiser av salget; den motsatte feilen er å si at ingenting endres.",
    },
  ],
},
/* PwC-case 5 av 6: KI-assistenten i kundesenteret til et telekomselskap.
   PwC Consulting har «data og AI» og «operasjonell forbedring» som egne tjenester
   og teknologi, media og telekom som egen bransje, og PwCs egen eksempelcase spør
   «How would you leverage AI in your analysis?». Casen gir det spørsmålet en klient
   der svaret faktisk flytter tall.

   Mekanismen er failure demand: halvparten av henvendelsene skyldes selskapets
   egne feil (uforståelige fakturaer, bestillinger og bytter som feiler, driftsavvik
   uten varsling, forsinket fiberinstallasjon), og KI-assistenten tar helst de korte
   henvendelsene, som også er de billigste. Å fjerne årsaken frigjør fire ganger så
   mye rådgivertid som å automatisere svaret. Riktig svar er begge deler, i riktig
   rekkefølge.

   «Les nøye»-detaljen står nøytralt i første avsnitt: i chat har hver rådgiver to
   samtaler åpne samtidig, mens behandlingstiden i årsakstabellen er oppgitt per
   henvendelse. En chat koster derfor halv rådgivertid. Detaljen nevnes ikke igjen,
   og ingen fasit peker tilbake til den, før fasiten i trinn 5. Den biter i
   regnetrinnet om assistenten (12 årsverk blir 6, og først da går tabellen opp mot
   kapasiteten), i regnetrinnet om feilkildene (en fjernet henvendelse sparer ¾ av
   behandlingstiden), og i syntesen, der «40 prosent av chattene» viser seg å være
   rundt 13 prosent av rådgivertiden.

   Tallgrunnlaget: tabellen summerer til 8 000 tusen minutter. Halvparten i chat til
   halv tid gir 6 000 tusen minutter rådgivertid, som er nøyaktig 100 årsverk à
   1 000 timer. Kontrollregnet i python3. */
{
  id: "pwc-kundesenter-ki",
  label: "Kundesenteret som skal kutte 40 prosent med KI",
  type: "Digitalisering",
  nivå: "Avansert",
  firma: "PwC",
  stil: "interviewer-led",
  minutter: 45,
  ch: [3, 4, 5, 6, 8, 10],
  blurb: "Et telekomselskap vil ta ut 40 prosent av kostnaden i kundesenteret med en KI-assistent. Trener å lese materialet nøye, å regne på leverandørens løfte og å gi en anbefaling med rekkefølge og veikart.",
  prompt: `<p>Klienten er <b>Tindvik Telekom</b>, et norsk telekomselskap med mobilabonnement og
    fiberbredbånd. Kundesenteret betjener rundt <b>400 000 kunder</b> på telefon og i chat.
    Rådgiverne tar begge kanalene om hverandre, og i chat har hver rådgiver to samtaler åpne
    samtidig. Selskapet bygger ut fiber i flere kommuner, og installasjonen gjøres av en
    underleverandør.</p>
    <p>Toppsjefen vil kutte kundesenterkostnaden med <b>40 prosent</b> ved å innføre en
    KI-assistent. Hun har lest at en konkurrent klarte nettopp det, og hun har allerede et
    tilbud fra en leverandør. Styret skal behandle saken i desember.</p>
    <table class="data">
      <tr><th>Kundesenteret, siste tolv måneder</th><th class="n">Tall</th></tr>
      <tr><td>Henvendelser</td><td class="n">960 000</td></tr>
      <tr><td>Andel av henvendelsene som kommer i chat</td><td class="n">50 %</td></tr>
      <tr><td>Årsverk</td><td class="n">100</td></tr>
      <tr><td>Kostnad, millioner kroner i året</td><td class="n">100</td></tr>
      <tr><td>Kundetid per årsverk, timer i året</td><td class="n">1 000</td></tr>
    </table>
    <p><b>Viktige forhold:</b></p>
    <ul>
      <li>Kundetilfredsheten har falt to år på rad. Ventetiden på telefon er i snitt ni
        minutter.</li>
      <li>Leverandøren har selv vurdert hvilke henvendelser assistenten egner seg for.</li>
      <li>Juridisk avdeling vil ikke at assistenten skal se trafikkdata, altså hvem kundene har
        ringt og når.</li>
      <li>Rundt 20 prosent av rådgiverne slutter hvert år. De tillitsvalgte har bedt om å være
        med fra start.</li>
    </ul>
    <p><b>Klienten spør:</b> Kan en KI-assistent ta ut 40 prosent av kundesenterkostnaden, og
    hvordan bør vi gå fram?</p>`,
  bakgrunn: `<p>Casen speiler to av tjenestene PwC Consulting selv lister, <b>data og AI</b> og
    <b>operasjonell forbedring</b>, i en av bransjene de selv lister: teknologi, media og
    telekom. Spørsmålet i drøftingen, «Hvordan ville du brukt KI i analysen?», er hentet rett
    fra PwCs egne eksempelcaser.</p>
    <p>Mekanismen er <b>failure demand</b>, John Seddons begrep for henvendelser som skyldes at
    selskapet ikke gjorde noe, eller ikke gjorde det riktig, første gang. Et kundesenter måles
    på hvor fort det svarer, ikke på hvorfor kundene tar kontakt, og derfor ser en chatbot ut
    som svaret. Men en KI-assistent tar helst de enkle henvendelsene, og de er også de korteste.
    Gevinsten per automatisert henvendelse blir lavere enn snittet tilsier. Å fjerne årsaken
    fjerner henvendelsen i alle kanaler, også de lange som assistenten ikke er egnet for.</p>
    <p>I telekom er feilkildene lette å kjenne igjen: en faktura ingen forstår, et nummerbytte
    som feiler, et driftsavvik ingen fikk beskjed om, en fiberinstallasjon som er forsinket.
    Hver av dem gir en henvendelse som ikke hadde trengt å komme.</p>
    <p>Casen trener også det PwC skiller seg på: at gjennomføringen er en del av svaret. En
    anbefaling om KI i et kundesenter er ikke ferdig før den sier hva som gjøres først, hvordan
    årsverkene tas ut, og hva som skjer med kundene som ikke passer i en chat.</p>`,
  trinn: [
    {
      art: "forberedelse",
      sek: 300,
      kort: "Lesetid",
      tittel: "Lesetid: les materialet og noter",
      sp: `<p>Du får materialet i Teams-chatten og har <b>fem minutter</b> før intervjueren
        begynner.</p>
        <p>«Les det nøye, og noter det du vil ha foran deg: målet med klientens egne ord,
        tallene som betyr mest, det som mangler, og en foreløpig hypotese.»</p>
        <p class="tiny">Skriv notatene slik du faktisk ville skrevet dem, i stikkord. Regn om
        tallene der det går raskt.</p>`,
      fasit: `<p>Gode notater er ikke et referat av materialet. De er det du trenger når
        intervjueren begynner å spørre: målet, tallene regnet om til noe du kan bruke, hullene,
        og en hypotese du kan teste. Slik kan de se ut etter fem minutter:</p>
        <ul>
          <li><b>Målet:</b> «kutte kundesenterkostnaden med 40 prosent» med en KI-assistent.
            Styret i desember.</li>
          <li><b>Målet i tall:</b> 40 % av 100 mill. = 40 mill. Kostnaden er 1 mill. per
            årsverk, så målet tilsvarer 40 årsverk.</li>
          <li><b>Kapasiteten:</b> 100 årsverk × 1 000 t = 100 000 t = 6 mill. minutter. Delt på
            960 000 henvendelser: rundt 6 minutter rådgivertid per henvendelse.</li>
          <li><b>Per kunde:</b> 960 000 / 400 000 = 2,4 henvendelser per kunde i året. Hvorfor
            så mange?</li>
          <li><b>Mangler:</b> hvorfor kundene tar kontakt · hva assistenten kan ta, og i hvilke
            kanaler · hva konkurrentens 40 % faktisk måler · hva assistenten koster.</li>
          <li><b>Bindinger:</b> tilfredsheten faller allerede · trafikkdata holdes utenfor
            assistenten · 20 % turnover · tillitsvalgte med fra start · underleverandør på
            fiber.</li>
          <li><b>Hypotese:</b> assistenten alene gir under halvparten av de 40 prosentene.
            Testen: hvorfor kundene tar kontakt, og hvor tiden går.</li>
        </ul>
        <p>Legg merke til at notatene <i>regner</i>. Tre raske regnestykker i lesetiden gir deg
        tre tall du bruker resten av casen: målet er 40 årsverk, en henvendelse koster rundt
        6 minutter rådgivertid, og hver kunde tar kontakt 2,4 ganger i året.</p>`,
      krav: [
        { k: "kommunikasjon", t: "Du skriver målet med klientens egne ord: kutte kundesenterkostnaden med 40 prosent." },
        { k: "tall", t: "Du regner målet om til noe konkret: 40 millioner kroner, eller rundt 40 årsverk." },
        { k: "tall", t: "Du regner om minst ett tall til noe du kan bruke senere, for eksempel rundt 6 minutter rådgivertid per henvendelse eller 2,4 henvendelser per kunde." },
        { k: "uklarhet", t: "Du noterer minst tre ting som mangler, for eksempel hvorfor kundene tar kontakt, hva assistenten koster og hva konkurrentens 40 prosent måler." },
        { k: "struktur", t: "Du skriver en foreløpig hypotese du kan teste, ikke bare et spørsmål eller et tema." },
      ],
      felle: "Å skrive av materialet i stedet for å bearbeide det. Det som står på skjermen, trenger du ikke i notatene; du trenger tallene regnet om, hullene og en hypotese.",
    },
    {
      art: "oppklaring",
      sek: 180,
      kort: "Spørsmål",
      tittel: "Hva vil du avklare?",
      sp: `<p>«Før vi går i gang: hva vil du avklare, og hvilke antagelser gjør du?»</p>
        <p class="tiny">Tre til fem spørsmål er nok. Si hva hvert av dem skal brukes til.</p>`,
      fasit: `<p>De sterke spørsmålene her er de som endrer regnestykket. Fire er nok:</p>
        <ul>
          <li><b>«40 prosent av hva, og innen når?»</b> Hele kundesenterbudsjettet eller bare
            lønn? På ett år eller tre? Det avgjør om naturlig avgang kan ta kuttet, eller om det
            blir oppsigelser.</li>
          <li><b>«Hva kan assistenten gjøre, og i hvilke kanaler?»</b> En assistent som bare
            svarer i chat, kan bare nå chattene.</li>
          <li><b>«Hvorfor tar kundene kontakt?»</b> 2,4 henvendelser per kunde i året er mye. Før
            du vet hva som kan automatiseres, må du vite hva henvendelsene handler om.</li>
          <li><b>«Hva målte konkurrenten?»</b> 40 prosent av chattene, av henvendelsene og av
            kostnaden er tre helt ulike tall.</li>
        </ul>
        <p>Og antagelsene, sagt høyt: <i>«Jeg antar at kostnaden i hovedsak er lønn som følger
        rådgivertiden, og at volumet er noenlunde stabilt fra år til år. Stemmer ikke det, vil
        jeg vite det.»</i></p>
        <p><b>Svarene du får:</b></p>
        <ul>
          <li>Målet gjelder hele budsjettet på 100 millioner, med full effekt innen 18
            måneder.</li>
          <li>Assistenten svarer i chat og i appen, og kan gjøre enkle ting som å endre et
            abonnement eller melde flytting av bredbånd. Telefon er ikke med i første fase.</li>
          <li>Leverandøren lover at den løser 60 prosent av de enkle chattene uten rådgiver. Den
            koster rundt 2 millioner kroner i året, alt inkludert.</li>
          <li>Toppsjefen har de 40 prosentene fra et intervju med konkurrentens kundedirektør i
            en bransjeavis. Hva som ble målt, står ikke der.</li>
          <li>Volumet har vært stabilt de to siste årene.</li>
          <li>Det finnes en årsaksanalyse av henvendelsene. Du får den om litt.</li>
        </ul>`,
      krav: [
        { k: "nysgjerrighet", t: "Du spør hva de 40 prosentene måler, for eksempel hele budsjettet eller bare lønn, eller om konkurrentens tall gjelder chatter eller kroner." },
        { k: "nysgjerrighet", t: "Du spør hva assistenten kan gjøre og i hvilke kanaler, fordi det avgjør hvor stor del av volumet den kan nå." },
        { k: "nysgjerrighet", t: "Du spør hvorfor kundene tar kontakt, ikke bare hvor mange henvendelser det er." },
        { k: "uklarhet", t: "Du sier minst én antagelse høyt, for eksempel at kostnaden i hovedsak følger rådgivertiden." },
        { k: "kommunikasjon", t: "Du sier hva hvert spørsmål skal brukes til, i stedet for å lese opp en liste." },
      ],
      felle: "Å ta konkurrentens 40 prosent som bevis på at målet er nåbart, og gå rett på hva assistenten kan gjøre. Ingen vet hva tallet fra bransjeavisen måler.",
    },
    {
      art: "struktur",
      sek: 270,
      kort: "Struktur",
      tittel: "Hvordan angriper du dette?",
      sp: `<p>«Hvordan vil du angripe dette? Gi meg tilnærmingen, hypotesen din og hvor du
        starter.»</p>`,
      fasit: `<p>Start med en identitet, ikke med en liste over hva KI kan gjøre. Kostnaden i et
        kundesenter er tid, og tid kan brytes ned uten overlapp:</p>
        <div class="formula">
          <div class="eq">Kostnad = henvendelser til rådgiver × rådgivertid per henvendelse × kostnad per rådgivertime</div>
          <div class="where">Henvendelser til rådgiver = alle henvendelser − de som løses uten
            rådgiver. Da får du fire spaker, og de er fire ulike tiltak.</div>
        </div>
        <ul>
          <li><b>Færre henvendelser totalt.</b> Hvorfor tar kundene kontakt? Skill mellom det
            kunden faktisk vil gjøre, som å bestille fiber eller si opp et abonnement, og det som
            skyldes at selskapet har gjort noe feil eller uklart. Det siste kalles <i>failure
            demand</i>, og det fjernes ved å rette årsaken, ikke ved å svare raskere.</li>
          <li><b>Flere løst uten rådgiver.</b> Selvbetjening og KI-assistenten. Hvilke
            henvendelser kan den ta, i hvilke kanaler, og hvor mye rådgivertid sparer hver av
            dem?</li>
          <li><b>Kortere tid per henvendelse.</b> KI som støtte til rådgiveren: sammendrag,
            forslag til svar, feilsøking i teknisk hjelp. Den erstatter ingen, men gjør alle
            raskere.</li>
          <li><b>Lavere kostnad per time.</b> Bemanningsplanlegging, lokasjon, innkjøp. Minst
            interessant her, fordi klienten spør om KI.</li>
        </ul>
        <p>Legg til et lag for <b>gjennomføring</b>, fordi det er der en PwC-case skiller seg:
        kundeopplevelse og sårbare kunder, personvern, de ansatte og de tillitsvalgte, og hvor
        fort gevinsten faktisk kan tas ut.</p>
        <p><b>Hypotesen:</b> <i>«40 prosent fra assistenten alene er for høyt. En assistent tar
        de enkle henvendelsene, og det er sjelden der tiden går. Jeg tror en stor del av volumet
        skyldes selskapet selv, og at det gir mer å fjerne årsaken enn å automatisere svaret.
        Jeg starter derfor med hvorfor kundene tar kontakt, vektet etter tid og ikke etter
        antall.»</i></p>`,
      krav: [
        { k: "struktur", t: "Du bryter kostnaden ned i antall henvendelser, rådgivertid per henvendelse og kostnad per time." },
        { k: "struktur", t: "Du skiller mellom å fjerne henvendelser og å automatisere svaret på dem, som to ulike grener." },
        { k: "struktur", t: "Du har en egen gren for gjennomføring, med minst to av: kundeopplevelse, personvern, ansatte og tid til effekt." },
        { k: "uklarhet", t: "Du sier en hypotese høyt før du har data, for eksempel at 40 prosent er for mye for en assistent alene." },
        { k: "kommunikasjon", t: "Du sier hvor du starter og hvorfor, før du går ned i grenene." },
      ],
      felle: "Å strukturere etter hva KI kan gjøre: chatbot, stemmeassistent, automatisering. Da svarer du på hvordan dere kan bruke KI, ikke på hvordan dere tar ut 40 prosent, og grenen som fjerner henvendelsene helt, mangler.",
    },
    {
      art: "exhibit",
      sek: 300,
      kort: "Årsakene",
      tittel: "Hvorfor kundene tar kontakt",
      sp: `<p>Intervjueren deler skjermen: «Her er årsaksanalysen for de siste tolv månedene.
        <b>Hva ser du, og hva betyr det for målet på 40 prosent?</b>»</p>`,
      figur: `<table class="data">
          <tr>
            <th>Årsak</th>
            <th class="n">Henvendelser (tusen)</th>
            <th class="n">Skyldes egne feil</th>
            <th class="n">Behandlingstid (min)</th>
            <th>Egnet for KI</th>
          </tr>
          <tr><td>Faktura: forstår ikke beløpet</td><td class="n">240</td><td class="n">75 %</td><td class="n">8</td><td>Middels</td></tr>
          <tr><td>Feil etter bestilling eller bytte</td><td class="n">120</td><td class="n">75 %</td><td class="n">16</td><td>Lav</td></tr>
          <tr><td>Driftsavvik: nettet er nede</td><td class="n">120</td><td class="n">80 %</td><td class="n">5</td><td>Høy</td></tr>
          <tr><td>Status på bestilling og installasjon</td><td class="n">80</td><td class="n">100 %</td><td class="n">6</td><td>Høy</td></tr>
          <tr><td>Bestille, endre eller si opp</td><td class="n">220</td><td class="n">0 %</td><td class="n">6</td><td>Høy</td></tr>
          <tr><td>Teknisk hjelp: ruter, wifi og TV</td><td class="n">100</td><td class="n">30 %</td><td class="n">12</td><td>Middels</td></tr>
          <tr><td>Betaling og inkasso</td><td class="n">80</td><td class="n">5 %</td><td class="n">7</td><td>Lav</td></tr>
          <tr><td><b>Sum og snitt</b></td><td class="n"><b>960</b></td><td class="n"></td><td class="n"><b>8,3</b></td><td></td></tr>
        </table>
        <p class="tiny">Skyldes egne feil: andel der henvendelsen kom av feil, uklarhet eller
          manglende informasjon fra selskapet selv, anslått fra en gjennomgang av 1 200 samtaler i
          september. Feil etter bestilling eller bytte omfatter nummeroverføring, abonnementsbytte
          og fiberlevering. Behandlingstid: per henvendelse, fra rådgiveren tar den til den er
          avsluttet, omtrent lik i telefon og chat. Egnet for KI: leverandørens vurdering.</p>`,
      fasit: `<p>Overskriften først, så beviset:</p>
        <p><i>«Halvparten av henvendelsene skyldes selskapet selv. Og det assistenten er god på,
        er de korte henvendelsene, mens den bare er vurdert som middels og lav på de tyngste
        feilkildene.»</i></p>
        <p><b>Første regnestykke: hvor mye er failure demand?</b></p>
        <div class="formula">
          <div class="eq">240 × 75 % + 120 × 75 % + 120 × 80 % + 80 × 100 % + 100 × 30 % + 80 × 5 %</div>
          <div class="eq">= 180 + 90 + 96 + 80 + 30 + 4 = <b>480 000 av 960 000, altså 50 %</b></div>
          <div class="where">Vektet etter tid er det litt mer, 4 228 av 8 000 tusen minutter,
            altså 53 prosent, fordi feil etter bestilling eller bytte tar 16 minutter per
            henvendelse.</div>
        </div>
        <p><b>Andre regnestykke: vekt etter tid, ikke etter antall.</b> Gang volum med
        behandlingstid for hver rad. Tabellen summerer til 8 000 tusen minutter, altså
        8 millioner.</p>
        <ul>
          <li>De tre årsakene med høy egnethet, driftsavvik, bestillingsstatus og endringer, er
            420 av 960, altså <b>44 prosent av volumet</b>. Men de er 600 + 480 + 1 320 = 2 400 av
            8 000 minutter, altså <b>30 prosent av tiden</b>. De tar 5,7 minutter i snitt, mot 8,3
            for alle.</li>
          <li>De to tyngste feilkildene, faktura og feil etter bestilling eller bytte, står for
            1 440 + 1 440 = 2 880 av de 4 228 feilminuttene, drøyt to tredeler. Assistenten er
            vurdert som middels og lav på nettopp de to.</li>
          <li>To av de tre årsakene assistenten er best på, driftsavvik og bestillingsstatus, er
            nesten bare feilhenvendelser. Å automatisere dem er å svare raskere på egne feil.</li>
        </ul>
        <p><b>Så hva:</b> Selv om assistenten tok <i>alt</i> den er god på, i alle kanaler, er det
        30 prosent av tiden. Målet på 40 prosent kan ikke nås ved å automatisere det assistenten er
        god på. Den store gevinsten ligger i å fjerne grunnen til at kundene tar kontakt.</p>
        <p>Og to forbehold, sagt høyt: andelen egne feil bygger på 1 200 samtaler fra én måned
        rett etter sommerferien, og egnetheten er leverandørens egen vurdering. Begge må testes
        før tallene går til styret.</p>`,
      krav: [
        { k: "kommunikasjon", t: "Du sier overskriften før du går gjennom radene, for eksempel at halvparten av henvendelsene skyldes selskapet selv." },
        { k: "tall", t: "Du regner ut hvor stor del som er feilhenvendelser, for eksempel 480 000 av 960 000, altså halvparten, eller 53 prosent av tiden." },
        { k: "tall", t: "Du vekter etter tid, ikke antall, for eksempel at de tre årsakene med høy egnethet er 44 prosent av volumet, men bare 30 prosent av tiden." },
        { k: "struktur", t: "Du ser at de to tyngste feilkildene, faktura og feil etter bestilling eller bytte, bare er vurdert som middels og lav for assistenten." },
        { k: "uklarhet", t: "Du tar minst ett forbehold om dataene, for eksempel at egne feil bygger på 1 200 samtaler fra én måned, eller at egnetheten er leverandørens egen vurdering." },
      ],
      felle: "Å rangere årsakene etter volum og peke på fakturaen fordi den er størst. Da ser du ikke at det assistenten er god på, er de korteste henvendelsene, og at den bare er vurdert som middels og lav på de tyngste feilkildene.",
    },
    {
      art: "regne",
      sek: 300,
      kort: "KI alene",
      tittel: "Hva frigjør assistenten alene?",
      sp: `<p>«La oss regne på leverandørens tilbud. Assistenten svarer bare i chat og app i
        første fase. Leverandøren lover at den løser <b>60 prosent</b> av chattene i de tre
        årsakene med høy egnethet. Anta at halvparten av hver årsak kommer i chat, og at
        kanalfordelingen ikke endrer seg.»</p>
        <p>«<b>Hvor mange årsverk frigjør assistenten?</b>»</p>
        <p>Når du har svart, spør intervjueren: «Og hva er det verdt netto?»</p>
        <p class="tiny">Si framgangsmåten høyt før du regner. Et årsverk er 1 000 timer
        kundetid. Årsakstabellen ligger under «Årsakene».</p>`,
      svar: 6,
      enhet: "årsverk",
      toleranse: 0.02,
      fasit: `<p>Regn i minutter rådgivertid, og gjør om til årsverk helt til slutt. Fire
        ledd:</p>
        <div class="formula">
          <div class="eq">Tid i de tre årsakene: 120 × 5 + 80 × 6 + 220 × 6 = 600 + 480 + 1 320 = 2 400 tusen minutter</div>
          <div class="eq">Bare chatten: 2 400 × ½ = 1 200 · assistenten løser 60 %: 1 200 × 0,6 = 720</div>
          <div class="eq">To chatter åpne samtidig, så hver chat koster halv rådgivertid: 720 × ½ = 360 tusen minutter</div>
          <div class="eq">360 000 minutter = 6 000 timer = <b>6 årsverk</b></div>
          <div class="where">Kontroll: 420 000 × ½ × 60 % = 126 000 løste chatter. Det er
            13 prosent av alle henvendelsene, men bare 6 prosent av rådgivertiden.</div>
        </div>
        <p><b>Hvorfor så lite?</b> Tre ting trekker ned, og alle tre er verdt å si høyt:</p>
        <ul>
          <li><b>Kanalen.</b> Assistenten når bare chatten, altså halvparten.</li>
          <li><b>Samtidigheten.</b> En chat koster en halv rådgiver, fordi hun har to åpne.
            Behandlingstiden i tabellen er per henvendelse, ikke per rådgiver.</li>
          <li><b>Miksen.</b> Assistenten tar de korte henvendelsene: 5,7 minutter i snitt, mot 8,3
            for alle. Regner du med snittet, får du 8,75 årsverk. Det er feil, fordi assistenten
            ikke tar snittet.</li>
        </ul>
        <p><b>Sanity-sjekken:</b> Tabellen summerer til 8 millioner minutter, altså
        133 000 timer, mot 100 000 i kapasitet. Med halv rådgivertid per chat er rådgivertiden
        4 + 4 × ½ = 6 millioner minutter, altså 100 000 timer, nøyaktig det 100 årsverk gir.
        Samtidigheten er ikke en detalj. Det er den som får tallene i materialet til å
        stemme.</p>
        <p><b>Og hva er det verdt netto?</b> 6 årsverk er 6 millioner kroner i året, eller
        6 prosent av kostnaden. Trekk fra de 2 millionene assistenten koster i året, og den gir
        <b>4 millioner netto</b>, en tidel av målet. Og 6 millioner er et tak: ikke hele millionen
        per årsverk forsvinner når et årsverk går, for lokaler og systemer blir igjen.</p>
        <p>Assistenten er fortsatt lønnsom. Den er bare ikke svaret på 40 prosent.</p>`,
      krav: [
        { k: "tall", t: "Du tar bare med chatten, fordi assistenten ikke svarer på telefon i første fase." },
        { k: "tall", t: "Du halverer rådgivertiden per løst chat, fordi en rådgiver har to chatter åpne samtidig." },
        { k: "tall", t: "Du bruker behandlingstiden i de tre årsakene assistenten tar, ikke snittet på 8,3 minutter." },
        { k: "kommunikasjon", t: "Du setter svaret opp mot målet, for eksempel at 6 årsverk er 6 prosent av kostnaden mot 40 prosent som er ønsket." },
        { k: "tall", t: "Du trekker fra det assistenten koster og sier at den gir rundt 4 millioner kroner netto i året." },
      ],
      felle: "Å gange de løste chattene med full behandlingstid. En rådgiver har to chatter åpne samtidig, så da får du 12 årsverk og dobler gevinsten til assistenten.",
    },
    {
      art: "regne",
      sek: 300,
      kort: "Feilkildene",
      tittel: "Hva gir det å fjerne årsakene?",
      sp: `<p>«IT, bestilling og fakturering har tre tiltak klare:»</p>
        <ul>
          <li>ny faktura, der hver linje forklares i appen, mot fakturaspørsmålene</li>
          <li>automatisk kontroll av hver bestilling før den sendes til aktivering, mot feil etter
            bestilling eller bytte</li>
          <li>SMS ved driftsavvik og når en bestilling endrer status, mot driftsavvik og
            bestillingsstatus</li>
        </ul>
        <p>«Anta at hvert tiltak fjerner <b>halvparten av feilhenvendelsene</b> i årsakene det
        treffer. Tiltakene koster rundt <b>12 millioner kroner</b>, én gang. Samme kanalfordeling
        som før. <b>Hvor mange årsverk frigjør de tre tiltakene?</b>»</p>
        <p>Når du har svart, spør intervjueren: «Når ser vi pengene, og hva er
        tilbakebetalingstiden? Og med assistenten i tillegg er vi vel oppe i 30 årsverk?»</p>
        <p class="tiny">Si framgangsmåten høyt før du regner. Årsakstabellen ligger under
        «Årsakene».</p>`,
      svar: 24,
      enhet: "årsverk",
      toleranse: 0.02,
      fasit: `<p>Samme metode som for assistenten: minutter først, så rådgivertid, så
        årsverk.</p>
        <div class="formula">
          <div class="eq">Feilminutter: faktura 180 × 8 = 1 440 · feil etter bytte 90 × 16 = 1 440 · driftsavvik 96 × 5 = 480 · bestillingsstatus 80 × 6 = 480</div>
          <div class="eq">Sum 3 840 tusen minutter · halvparten fjernes: 1 920</div>
          <div class="eq">Halvparten på telefon med full tid, halvparten i chat med halv tid, altså ¾: 1 920 × ¾ = 1 440 tusen minutter</div>
          <div class="eq">1 440 000 minutter = 24 000 timer = <b>24 årsverk</b></div>
          <div class="where">Det er 223 000 færre henvendelser, 23 prosent av volumet.</div>
        </div>
        <p><b>Så hva: fire ganger så mye som assistenten</b>, 24 mot 6 årsverk. Grunnen er ikke at
        tiltakene er smartere. Den er at de treffer der tiden går: faktura og feil etter bytte er
        2 880 av de 3 840 feilminuttene, og der er assistenten bare vurdert som middels og lav. Og
        tiltakene fjerner henvendelser i begge kanaler, mens assistenten bare når chatten.</p>
        <p><b>Til oppfølgingsspørsmålene:</b></p>
        <ul>
          <li><b>Tilbakebetalingstiden:</b> 12 millioner én gang mot 24 millioner i året er et
            halvt år, regnet fra full effekt. Regnet fra oppstart tar det lenger, fordi
            besparelsen bygger seg opp etter hvert som årsverkene går ut: da er de 12 millionene
            tjent inn etter drøyt et år.</li>
          <li><b>Når dere ser pengene:</b> når årsverkene er ute, ikke når henvendelsene
            forsvinner. Med 20 prosent turnover går rundt 20 årsverk ut i året, så 24 årsverk
            kan tas ut på drøyt et år uten oppsigelser, hvis dere slutter å erstatte dem som
            går.</li>
          <li><b>30 årsverk med assistenten i tillegg?</b> Nei. SMS-varslingen fjerner halvparten
            av feilhenvendelsene om driftsavvik og bestillingsstatus, og noen av dem er de samme
            henvendelsene assistenten skulle ta. Regn assistenten på nytt etter tiltakene:</li>
        </ul>
        <div class="formula">
          <div class="eq">Driftsavvik 120 − 48 = 72 · bestillingsstatus 80 − 40 = 40 · bestille, endre eller si opp 220 uendret</div>
          <div class="eq">72 × 5 + 40 × 6 + 220 × 6 = 360 + 240 + 1 320 = 1 920 · × ½ × 0,6 × ½ = 288 tusen minutter = <b>4,8 årsverk</b></div>
          <div class="where">Begge deler gir 24 + 4,8 = <b>28,8 årsverk</b>, ikke 30. Forskjellen
            er liten her, men dobbelttelling er det første en økonomidirektør leter etter i en
            business case.</div>
        </div>
        <p>Rekkefølgen endrer ikke summen, men den endrer hva dere kjøper: bygger dere assistenten
        rundt driftsavvik og bestillingsstatus først, dimensjonerer dere den for 6 årsverk som blir
        4,8.</p>`,
      krav: [
        { k: "tall", t: "Du regner feilminuttene årsak for årsak, for eksempel 1 440, 1 440, 480 og 480 tusen før halvering, eller 720, 720, 240 og 240 etter." },
        { k: "tall", t: "Du bruker kanalregelen her også: en fjernet henvendelse sparer i snitt tre firedeler av behandlingstiden." },
        { k: "kommunikasjon", t: "Du sammenligner med assistenten i én setning, for eksempel 24 mot 6 årsverk, fire ganger så mye." },
        { k: "struktur", t: "Du svarer at 24 og 6 ikke kan legges sammen, fordi SMS-varslingen fjerner noen av henvendelsene assistenten skulle ta." },
        { k: "tall", t: "Du regner tilbakebetalingstiden og sier hva den regnes fra, for eksempel et halvt år fra full effekt, eller drøyt et år fra oppstart." },
        { k: "struktur", t: "Du sier at frigjorte årsverk først blir en besparelse når de er ute, for eksempel gjennom naturlig avgang." },
      ],
      felle: "Å gi intervjueren rett i 30 årsverk. SMS-varslingen fjerner noen av de samme henvendelsene assistenten skulle ta, så begge deler gir 28,8, og det er det tallet som tåler et styremøte.",
    },
    {
      art: "drøfting",
      sek: 210,
      kort: "KI i analysen",
      tittel: "Hvordan ville du brukt KI i analysen?",
      sp: `<p>«Andelene for egne feil kommer fra en manuell gjennomgang av 1 200 samtaler i
        september. Årsakskodene i systemet setter rådgiverne selv etter hver samtale, og de er
        kjent for å være upresise. Alle chatter lagres, og telefonsamtalene tas opp.»</p>
        <p>«Før dette går til styret: <b>hvordan ville du brukt KI i analysen?</b>»</p>`,
      fasit: `<p>Poenget først: <i>«Jeg ville brukt KI til å telle, ikke til å konkludere. Den kan
        lese alle 960 000 henvendelsene, der mennesker rakk 1 200.»</i> Så tre konkrete
        bruksområder for akkurat denne klienten:</p>
        <ol>
          <li><b>Klassifiser et helt år, ikke én måned.</b> Transkriber samtalene, og la en
            språkmodell sette årsak og «egen feil eller ikke» på alle henvendelsene. Da ser du
            sesongen: september er rett etter sommerferien, med regninger for bruk i utlandet, og
            midt i sesongen for fiberinstallasjon. Andelen faktura- og bestillingsspørsmål er neppe
            den samme i februar. Bruk de 1 200 manuelt gjennomgåtte samtalene som fasit, og test
            modellen mot dem før du stoler på den.</li>
          <li><b>Finn årsaken inne i årsaken.</b> At 180 000 fakturahenvendelser skyldes egne feil,
            sier ikke hva som må endres på fakturaen. Grupper dem etter hvilken linje kunden spør
            om, og feilene etter bytte etter hvilket steg som feilet: nummeroverføring, aktivering
            eller fakturaoppsett. Da vet fakturering og bestilling hvor de skal begynne.</li>
          <li><b>Test leverandørens 60 prosent før kontrakten signeres.</b> Kjør et par tusen gamle
            chatter gjennom assistenten, og la erfarne rådgivere vurdere om svarene var riktige.
            Mål også hvor mange kunder som tok kontakt igjen innen en uke. En chat assistenten
            «løste», der kunden ringte dagen etter, er ikke løst.</li>
        </ol>
        <p><b>Forutsetningene</b>, fordi det er dem klienten vil spørre om: avklar med
        personvernombudet at opptakene kan brukes til analyse, fjern personnummer, telefonnumre og
        kontonumre før noe kjøres, og hold trafikkdata utenfor, i tråd med det juridisk har sagt om
        assistenten. Ta de tillitsvalgte med før opptakene brukes, siden det også er rådgivernes
        samtaler. Og la noen som kjenner kundesenteret, lese et utvalg av det modellen har
        klassifisert. KI-en finner mønsteret; mennesker sjekker at det stemmer.</p>`,
      krav: [
        { k: "nysgjerrighet", t: "Du foreslår å klassifisere langt flere henvendelser med en språkmodell, for eksempel et helt år, i stedet for å stole på utvalget fra september." },
        { k: "uklarhet", t: "Du sier hvordan modellen kontrolleres før du stoler på den, for eksempel mot de 1 200 manuelt gjennomgåtte samtalene." },
        { k: "nysgjerrighet", t: "Du gir minst ett bruksområde til utover klassifiseringen, for eksempel å teste leverandørens 60 prosent på gamle chatter eller å finne hvilken fakturalinje kundene spør om." },
        { k: "uklarhet", t: "Du sier hva som må avklares før opptakene brukes, for eksempel personvern og at trafikkdata holdes utenfor." },
        { k: "kommunikasjon", t: "Du gir konkrete bruksområder for denne klienten, ikke en generell liste over hva KI kan gjøre." },
      ],
      felle: "Å svare om assistenten mot kundene når spørsmålet gjaldt analysen, eller å gi en liste som passer alle klienter. Svaret skal handle om de 1 200 samtalene og hva som skal til for å stole på resten.",
    },
    {
      art: "drøfting",
      sek: 240,
      kort: "Risiko",
      tittel: "Risikoen ved å la KI svare kundene",
      sp: `<p>«Toppsjefen vil uansett ha assistenten. <b>Hvilke risikoer ser du ved å la KI svare
        kundene, og hvilke ville du prioritert?</b>»</p>
        <p>Før du er ferdig, legger kundedirektøren til: <i>«Assistenten har tilgang til
        fakturadataene. Hvorfor kan den ikke forklare fakturaen fra dag én?»</i></p>`,
      fasit: `<p>Prioriter etter hva det koster hvis det skjer, og hvor sannsynlig det er. Ikke
        les opp en liste. For denne klienten er rekkefølgen slik:</p>
        <ol>
          <li><b>Feil svar om penger.</b> Assistenten forklarer en faktura feil, lover et tilbud
            som ikke gjelder, eller bekrefter en oppsigelse eller et nummerbytte som ikke er
            registrert. Det gir klager, kan koste penger, og treffer en kundetilfredshet som
            allerede faller. Tiltak: la den bare svare fra kundens egne data og godkjente tekster,
            test den på gamle samtaler, og send uenighet om beløp til et menneske.</li>
          <li><b>Sårbare kunder.</b> En kunde med betalingsproblemer, eller en eldre kunde med
            trygghetsalarm som er avhengig av nettet under et driftsavvik, skal ikke møte en
            maskin som ikke forstår. Tiltak: betaling og inkasso, som uansett er vurdert lavt, går
            rett til rådgiver, og ord som tyder på en krise sender samtalen videre.</li>
          <li><b>Kunder som blir sittende fast.</b> En kunde som går i ring i chatten og så
            ringer, har kostet to henvendelser og venter ni minutter i tillegg. Da forsvinner
            gevinsten, og tilfredsheten faller mer. Tiltak: alltid en knapp til et menneske, og
            «løst» betyr at kunden ikke tok kontakt igjen innen en uke.</li>
          <li><b>Personvern.</b> Assistenten må vite hvem den snakker med før den viser en
            faktura, og den skal ikke se trafikkdata, slik juridisk har bedt om. Tiltak:
            fakturaspørsmål bare for innloggede kunder i appen, og uten
            samtalespesifikasjonen.</li>
        </ol>
        <p>Den femte er mindre synlig: <b>assistenten kan skjule feilene.</b> Når en maskin svarer
        på «hvorfor er fakturaen så høy?», hører ingen i faktureringen spørsmålet lenger.</p>
        <p><b>Svaret til kundedirektøren:</b> <i>«Ja, som en bro mens den nye fakturaen lages. Det
        er et bevisst unntak fra regelen om å fjerne årsaken først, og det er bedre enn ni minutter
        i kø. Den kan forklare abonnement, rabatter og gebyrer. Spør kunden hvilke samtaler som
        ligger bak et beløp, trenger den trafikkdata, og da går samtalen til en rådgiver. Og tre
        vilkår til: den svarer bare innloggede kunder, uenighet om beløp går til et menneske, og
        hver forklaring registreres med hvilken linje kunden spurte om. Uten den loggingen holder
        ikke unntaket: da betaler dere for å forklare den samme feilen 180 000 ganger i året, og
        ingen retter den.»</i></p>`,
      krav: [
        { k: "struktur", t: "Du prioriterer risikoene etter konsekvens og sannsynlighet, i stedet for å liste dem likt." },
        { k: "nysgjerrighet", t: "Du sier på hvilke vilkår assistenten kan forklare fakturaen, for eksempel bare linjer som ikke krever trafikkdata." },
        { k: "tall", t: "Du tallfester minst én risiko, for eksempel at en kunde som sitter fast i chatten og så ringer, gir to henvendelser og ni minutter i kø." },
        { k: "struktur", t: "Du skiller ut sårbare kunder, for eksempel de med betalingsproblemer, og sender dem til et menneske." },
        { k: "kommunikasjon", t: "Du knytter hver risiko til et konkret tiltak for denne klienten, ikke bare til en advarsel." },
      ],
      felle: "Å svare bare ja eller bare nei. Et ja uten logging betaler for å forklare den samme feilen 180 000 ganger i året, og et nei uten plan lar fakturakundene stå ni minutter i kø.",
    },
    {
      art: "syntese",
      sek: 240,
      kort: "Anbefaling",
      tittel: "Anbefalingen til styret",
      sp: `<p>«Toppsjefen har <b>ett minutt</b> før hun går inn til styret. Gi meg anbefalingen
        din.»</p>
        <p>Midtveis avbryter hun: <i>«Konkurrenten har spart 40 prosent med en chatbot. Hvorfor
        skal ikke vi klare det?»</i></p>
        <p class="tiny">Skriv anbefalingen slik du ville sagt den, og ta med hvordan du svarer på
        innvendingen.</p>`,
      fasit: `<p>Anbefaling, grunner, rekkefølge, risiko og første steg, på ett minutt. Og en
        innvending som skal tas inn uten at du slipper tallene.</p>
        <blockquote>
          <p><b>«Nei, ikke på 18 måneder og ikke med assistenten alene: fjern årsakene først, og
          automatiser det som er igjen.</b> Det gir rundt 29 årsverk, opptil 27 millioner netto i
          året. Tre grunner. Halvparten av henvendelsene, 480 000 av 960 000, skyldes dere selv.
          Tre tiltak mot feilkildene frigjør 24 årsverk for 12 millioner én gang, betalt tilbake et
          halvt år etter full effekt. Assistenten frigjør bare 6 årsverk, 4 millioner netto, fordi
          den bare når chatten, tar de korte henvendelsene, og en chat koster en halv rådgiver.
          Rekkefølgen: SMS-varsling først, fordi den krymper det assistenten skal ta, så
          assistenten på de enkle chattene, og ny faktura og kontroll av bestillinger innen et år.
          Årsverkene tas ut gjennom
          naturlig avgang, og de tillitsvalgte er med fra start. Største risiko: feil svar om
          penger, så uenighet om beløp går alltid til et menneske. Første steg: klassifisere et
          helt års henvendelser med KI, så tallene står på mer enn 1 200 samtaler.»</p>
        </blockquote>
        <p><b>Når hun avbryter om konkurrenten:</b></p>
        <blockquote>
          <p>«Kanskje, men 40 prosent av hva? Er det 40 prosent av chattene, er det rundt
          13 prosent av rådgivertiden hos oss, fordi chatten er halve volumet til halv tid. Er det
          40 prosent av kostnaden, vil jeg vite hva de gjorde i tillegg, for eksempel om de rettet
          fakturaen. Jeg finner intervjuet og ber leverandøren om en referansekunde. Det endrer
          ikke rekkefølgen, men nådde de 40 prosent med begge deler, setter vi det som mål for år
          tre.»</p>
        </blockquote>
        <p>Legg merke til formen: <b>standpunkt med tall, tre grunner, rekkefølge med
        gevinstrealisering, største risiko og første steg, og en innvending tatt inn og regnet
        på.</b> Det er gjennomføringen som skiller en PwC-anbefaling fra en ren analyse.</p>`,
      krav: [
        { k: "kommunikasjon", t: "Du sier anbefalingen i første setning, for eksempel: ikke med assistenten alene, fjern årsakene først og automatiser det som er igjen." },
        { k: "tall", t: "Du bruker casens tall, for eksempel 6 årsverk fra assistenten, 24 fra feilkildene og rundt 29 med begge." },
        { k: "nysgjerrighet", t: "Du tar imot innvendingen og spør hva konkurrentens 40 prosent faktisk måler, i stedet for å avvise den." },
        { k: "tall", t: "Du regner på innvendingen med casens tall, for eksempel at 40 prosent av chattene bare er rundt 13 prosent av rådgivertiden hos oss." },
        { k: "struktur", t: "Du gir en rekkefølge i faser og sier hvorfor, for eksempel SMS-varsling før assistenten, fordi den krymper det assistenten skal ta." },
        { k: "uklarhet", t: "Du sier hva som ville endret anbefalingen, for eksempel at konkurrenten nådde 40 prosent med begge deler." },
      ],
      felle: "Å kapitulere for konkurrentens tall, eller å avfeie det. Den som ikke spør hva de 40 prosentene måler, lar et tall fra en bransjeavis styre et budsjett på 100 millioner.",
    },
  ],
},
/* PwC-case 6 av 6: hjemmetjenesten i en kommune med fast ramme og flere eldre.
   Casen speiler offentlig sektor, en av bransjene PwC Consulting lister, og to av
   tjenestene de selv lister: «samfunnsøkonomisk analyse og utredninger» og
   «operasjonell forbedring». Oppdraget er typisk: kommunedirektøren vil lukke et gap uten å
   svekke tilbudet, et år før kommunevalget.

   Mekanismen er at veksten er etterspørselsdrevet. Tjenesten er ikke dårlig drevet (45
   prosent av tiden hos brukerne, midt blant kommunene Heggstad sammenligner seg med),
   så ruter og turnus gir 20 årsverk én gang mot et gap på 60 i 2030 som fortsetter å
   vokse. Resten må komme fra færre besøk og mer selvhjulpne brukere: dispensere som
   erstatter medisinbesøk (24 årsverk, fordi et besøk som faller bort, tar med seg 20
   minutter kjøring og dokumentasjon), hverdagsrehabilitering og digitalt nattilsyn.
   Overlapp og vekst opphever hverandre: dispenserne og nattilsynet tar 1 800 besøk som
   ikke også blir tre minutter kortere (−3 årsverk), men i 2030 er det 1 800 flere
   besøk enn i dag, og de blir det (+3). Summen er 65 mot 60, og etter leien av
   dispenserne står det rundt 2 millioner igjen. Planen går opp, men med en margin som
   er mindre enn usikkerheten. Gevinsten er unngått kostnad, ikke kutt, og den finnes
   bare hvis den måles. Den offentlige casen fra før handler om effekt per krone mot en
   sammenligningsgruppe, og prisingscasen om velferdsteknologi ser det fra
   leverandøren. Ingen av de mekanismene gjentas her.

   «Les nøye»-detaljen står nøytralt i første avsnitt: brukerne er i alle aldre, og
   rundt 60 prosent av tiden hos brukerne går til dem over 80. Veksten på en firedel
   gjelder bare dem. Den biter i trinn 5, der gapet er 60 årsverk og ikke 100.
   Eksempelnotatene i lesetiden nevner den med vilje ikke, strukturfasiten deler med
   vilje ikke behovet på aldersgrupper, og ingen fasit før trinn 5 bruker den.

   Motstand og ny informasjon kommer fire steder: driftssjefen som vil løse alt med
   ruteplanlegging (trinn 4), spørsmålet om bemanningen kan tas ned når dispenserne
   frigjør tid (trinn 6), den hovedtillitsvalgte som hører «kutt» (trinn 7), og
   ordføreren som ikke vil ha noe som ligner kutt før valget i september 2027
   (syntesen).

   Tallgrunnlaget: 12 000 besøk i uka. 5 400 timer hos brukerne + 4 000 timer
   kjøring og dokumentasjon + 2 600 timer annet = 12 000 timer = 400 årsverk à
   30 timer. Sammenligningen med 40–50 prosent tid hos brukerne er klientens egen,
   mot fire kommuner av samme størrelse. Fella i trinn 6 er snittbesøket i tabellen
   (27 minutter hos brukeren, som gir 21,6 årsverk) og å glemme de to besøkene i
   uka som blir igjen (som gir 28 årsverk). At et bortfalt besøk tar med seg 20 minutter kjøring, er
   avslørt i trinn 4 og er ikke fella der. Kontrollregnet i python3. */
{
  id: "pwc-kommune-hjemmetjeneste",
  label: "Hjemmetjenesten med flere 80-åringer og samme ramme",
  type: "Offentlig",
  nivå: "Avansert",
  firma: "PwC",
  stil: "interviewer-led",
  minutter: 45,
  ch: [3, 4, 5, 6, 8, 10],
  blurb: "Offentlig case i PwCs format, med lesetid og skriftlig materiale: en kommune får flere eldre, og rammen til hjemmetjenesten står stille. Trener å regne på et kapasitetsgap, lese en tidsstudie og gjennomføre en plan i en politisk styrt organisasjon.",
  prompt: `<p>Klienten er <b>Heggstad kommune</b>, en kystkommune med <b>60 000 innbyggere</b>.
    Hjemmetjenesten gir hjemmesykepleie og praktisk bistand til <b>1 600 brukere</b>, organisert i
    fire soner. Brukerne er i alle aldre, og rundt 60 prosent av tiden hos brukerne går til dem
    som er over 80 år.</p>
    <p>Folketallet vil stå omtrent stille, men kommunens framskrivning viser at antall innbyggere
    over 80 år øker med <b>en firedel</b> fram til 2030. Rammen til hjemmetjenesten,
    <b>360 millioner kroner</b>, står stille i faste kroner. Kommunedirektøren har bedt PwC om
    hjelp.</p>
    <table class="data">
      <tr><th>Hjemmetjenesten i Heggstad</th><th class="n">I år</th></tr>
      <tr><td>Brukere</td><td class="n">1 600</td></tr>
      <tr><td>Årsverk</td><td class="n">400</td></tr>
      <tr><td>Kostnad, mill. kr</td><td class="n">360</td></tr>
      <tr><td>Innbyggere over 80 år i kommunen</td><td class="n">3 000</td></tr>
      <tr><td>Innbyggere over 80 år i 2030, framskrevet</td><td class="n">3 750</td></tr>
    </table>
    <p><b>Viktige forhold:</b></p>
    <ul>
      <li>Kommunen lyste ut 30 sykepleierstillinger i fjor og fikk besatt 12.</li>
      <li>Én sone har prøvd ut 50 medisindispensere siden januar. Utvidelsen til de andre sonene
        er satt på vent.</li>
      <li>Et team på tre ergo- og fysioterapeuter gir hverdagsrehabilitering til nye brukere, men
        bare i én av sonene.</li>
      <li>Kommunestyret vedtar budsjett og økonomiplan for 2027–2030 i desember. Det er kommunevalg
        i september 2027.</li>
      <li>De tillitsvalgte har bedt om å bli tatt med før det gjøres endringer i turnusen.</li>
    </ul>
    <p><b>Klienten spør:</b> Hvordan får vi hjemmetjenesten til å gå opp innenfor rammen fram til
    2030, uten å svekke tilbudet?</p>`,
  bakgrunn: `<p>Casen speiler offentlig sektor, en av bransjene PwC Consulting lister, og to av
    tjenestene de selv lister: <b>operasjonell forbedring</b> og <b>samfunnsøkonomisk
    analyse og utredninger</b>. Hjemmetjenesten er der kommunene merker eldrebølgen først, og
    spørsmålet om hvordan den skal tas innenfor samme ramme, ligger på bordet hos de fleste
    kommunedirektører.</p>
    <p>Mekanismen er at veksten er <b>etterspørselsdrevet</b>. Tjenesten er ikke dårlig drevet:
    45 prosent av tiden er hos brukerne, midt blant kommunene Heggstad sammenligner seg med.
    Derfor gir bedre ruter og turnus et engangsløft, mens behovet vokser hvert år. Gapet lukkes
    bare med færre besøk og mer selvhjulpne brukere: teknologi som erstatter besøk der det er
    forsvarlig, og hverdagsrehabilitering som lærer folk å klare mer selv. Et kort besøk som
    faller bort, tar med seg kjøringen og dokumentasjonen, og gir derfor tre ganger så mye som
    minuttene hos brukeren. Planen går opp, men med en margin som er mindre enn usikkerheten, og
    det skal anbefalingen si.</p>
    <p>Det andre casen trener, er gjennomføring i en politisk styrt organisasjon. Gevinsten er
    <b>unngått kostnad</b>, ikke kutt: budsjettet går ikke ned, men veksten tas uten nye årsverk.
    Den finnes bare hvis den måles, og den må kunne forklares for politikere før et valg, for
    tillitsvalgte som hører «kutt», og for brukere som får færre besøk, uten at tallene
    pyntes.</p>
    <p>«Les nøye»-detaljen står i første avsnitt: brukerne er i alle aldre, og 60 prosent av
    tiden går til dem over 80. Veksten på en firedel gjelder dem, ikke hele tjenesten. Den som
    overser det, regner gapet til 100 årsverk i stedet for 60.</p>`,
  trinn: [
    {
      art: "forberedelse",
      sek: 300,
      kort: "Lesetid",
      tittel: "Fem minutter med materialet",
      sp: `<p>Du får materialet i Teams-chatten og har <b>fem minutter</b> før intervjueren
        begynner.</p>
        <p>«Les det nøye, og noter det du vil ha foran deg når vi starter.»</p>
        <p class="tiny">Gode notater har fire ting: målet med klientens egne ord, tallene som betyr
        mest, det som mangler, og en foreløpig hypotese. Regn om tallene der det går raskt.</p>`,
      fasit: `<p>Stikkord, ikke setninger, i bolker du finner fram i mens du snakker. Slik kan
        notatene se ut når tiden er ute:</p>
      <ul>
        <li><b>Målet:</b> «gå opp innenfor rammen fram til 2030, uten å svekke tilbudet». Rammen er
          360 mill. i faste kroner.</li>
        <li><b>Tallene:</b> 60 000 innbyggere, folketallet flatt · 1 600 brukere i fire soner ·
          400 årsverk · 360 mill. kr, altså 0,9 mill. per årsverk · over 80 år: 3 000 i dag,
          3 750 i 2030 (kommunens framskrivning).</li>
        <li><b>Bindingene:</b> 12 av 30 sykepleierstillinger besatt (utlysningen i fjor) · budsjett og
          økonomiplan i desember · kommunevalg i september 2027 · tillitsvalgte vil med før
          turnusendringer.</li>
        <li><b>Det som finnes:</b> 50 dispensere i én sone, utvidelsen på vent. Hvorfor? ·
          hverdagsrehabilitering i én av fire soner.</li>
        <li><b>Det som mangler:</b> hva «uten å svekke tilbudet» betyr · hva som har drevet
          kostnadene til nå · hvor tiden går i dag · hva tiltakene gir, og hva de koster.</li>
        <li><b>Hypotese:</b> rammen holder ikke med dagens måte å jobbe på. Om svaret ligger i
          driften eller i hvor mye hjelp hver bruker trenger, må testes mot hvor tiden går.</li>
        <li><b>Obs:</b> 12 av 30 stillinger besatt. Selv om rammen økte, er det ikke sikkert
          folkene finnes.</li>
      </ul>
      <p>Hypotesen trenger ikke være riktig. Den skal være <i>testbar</i>, så du vet hva du leter
        etter når tallene kommer. Og legg merke til den siste linjen: to forhold som hver for seg
        er bakgrunn, sier sammen at dette ikke bare er et pengeproblem.</p>`,
      krav: [
        { k: "kommunikasjon", t: "Du skriver målet med klientens egne ord: gå opp innenfor rammen fram til 2030, uten å svekke tilbudet." },
        { k: "tall", t: "Du regner om minst ett tall i notatene, for eksempel 360 millioner på 400 årsverk, som er 0,9 millioner per årsverk." },
        { k: "tall", t: "Du noterer hvor hvert tall kommer fra og hva det måler, ikke bare tallet selv." },
        { k: "uklarhet", t: "Du markerer minst to hull du vil tette, for eksempel hva «uten å svekke tilbudet» betyr og hva som har drevet kostnadene." },
        { k: "struktur", t: "Du skriver en foreløpig hypotese som kan testes mot tall senere, ikke bare et tema." },
        { k: "struktur", t: "Du kobler minst to forhold i materialet, for eksempel 12 av 30 besatte stillinger og rammen: mangler folkene, hjelper ikke penger alene." },
      ],
      felle: "Å skrive av materialet i stedet for å bearbeide det. Notater uten mål, hull og hypotese gir deg ingenting å styre etter når intervjueren begynner å spørre.",
    },
    {
      art: "oppklaring",
      sek: 180,
      kort: "Avklaring",
      tittel: "Hva vil du avklare?",
      sp: `<p>Intervjueren kobler seg på, hilser, og går rett på sak:</p>
        <p><b>«Før vi går i gang: hva vil du avklare, og hvilke antagelser gjør du?»</b></p>
        <p class="tiny">Tre til fem spørsmål er nok. Si hva hvert av dem skal brukes til.</p>`,
      fasit: `<p>I en offentlig case er den første avklaringen nesten alltid den samme: <b>hva er
        det som ikke får bli dårligere?</b> Uten svar på det vet du ikke hvilke tiltak som er lov.
        Hvert spørsmål skal kunne endre analysen:</p>
      <ul>
        <li><b>Hva betyr «uten å svekke tilbudet»?</b> Samme kriterier for å få hjelp, ingen endring
          i dagens vedtak, eller at kvaliteten ikke blir dårligere? Det avgjør om det er lov å endre
          <i>hvordan</i> hjelpen gis.</li>
        <li><b>Hva har drevet kostnadene til nå?</b> Flere brukere, mer hjelp per bruker, eller mer
          tid og kostnad per besøk? Det avgjør om dette er et volumproblem eller et
          driftsproblem.</li>
        <li><b>Hva betyr «står stille i faste kroner» i praksis?</b> Dekkes hele lønnsveksten, og fra
          hvilket år? Det avgjør om lønnsveksten er en del av gapet.</li>
        <li><b>Hvorfor står utvidelsen av dispenserne på vent?</b> Faglig tvil, penger eller noe
          annet? Det avgjør hvor fort et tiltak som allerede finnes, kan tas i bruk.</li>
        <li><b>Hva sier framskrivningen etter 2030?</b> Et gap som topper i 2030, løses annerledes
          enn et som fortsetter å vokse.</li>
      </ul>
      <p>Og antagelsen sagt høyt: <i>«Jeg regner i faste 2026-kroner og antar at lønnsveksten
        dekkes, slik at gapet vi snakker om, er flere brukere og ikke dyrere timer.»</i></p>
      <p><b>Svarene du får:</b></p>
      <ul>
        <li>«Uten å svekke tilbudet» betyr: samme kriterier for å få hjelp, ingen reduksjon i dagens
          vedtak uten en ny individuell vurdering, brukertilfredsheten skal ikke falle, og avvikene i
          legemiddelhåndteringen skal ikke øke. <b>Hvordan</b> hjelpen gis, kan endres.</li>
        <li>Rammen står stille i 2026-kroner fra 2027: hele lønns- og prisveksten dekkes, flere
          brukere gjør det ikke. Til nå har kommunestyret plusset på rammen hvert år.</li>
        <li>Timene hos brukerne har økt med rundt <b>3 prosent i året</b> de siste fire årene. Tid
          per besøk og kostnad per time har vært nær uendret.</li>
        <li>Framskrivningen viser at antall innbyggere over 80 år fortsetter å øke i omtrent samme
          takt etter 2030.</li>
        <li>Ingen av de 50 i piloten har hatt avvik i legemiddelhåndteringen, og alle vil beholde
          dispenseren. Utvidelsen står fordi sykepleierne i de andre sonene er skeptiske, og fordi
          ingen har bestemt hvilket budsjett som skal betale.</li>
        <li>Teamet for hverdagsrehabilitering ga 70 nye brukere et opplegg på seks uker det siste
          året. Tre måneder etter brukte de i snitt en tredjedel færre timer enn nye brukere i de
          andre sonene.</li>
        <li>Det finnes en tidsstudie fra i vår som viser hvor tiden går. Du får den om litt.</li>
      </ul>`,
      krav: [
        { k: "uklarhet", t: "Du spør hva «uten å svekke tilbudet» betyr i praksis: kriteriene for å få hjelp, dagens vedtak eller kvaliteten." },
        { k: "nysgjerrighet", t: "Du spør hva som driver timene, for eksempel hva som har drevet veksten til nå, eller hvor arbeidstiden går i dag." },
        { k: "uklarhet", t: "Du sier minst én antagelse høyt, for eksempel at du regner i faste 2026-kroner, så gapet handler om flere brukere og ikke om lønnsvekst." },
        { k: "nysgjerrighet", t: "Du spør om noe i de viktige forholdene som kan endre planen, for eksempel hvorfor utvidelsen av dispenserne står på vent." },
        { k: "kommunikasjon", t: "Du sier hva hvert spørsmål skal brukes til, i stedet for å lese opp en liste." },
      ],
      felle: "Å glemme spørsmålet som avgjør hvilke tiltak som er lov: hva «uten å svekke tilbudet» betyr. Uten det vet du ikke om kommunen kan endre hvordan hjelpen gis.",
    },
    {
      art: "struktur",
      sek: 270,
      kort: "Tilnærming",
      tittel: "Hvordan vil du angripe dette?",
      sp: `<p><b>«Hvordan vil du angripe dette?»</b></p>
        <p class="tiny">Gi tilnærmingen din slik du ville tegnet den på arket, med en hypotese og hvor
        du starter.</p>`,
      fasit: `<p>Første grep: si hva slags case dette er. Det finnes ingen inntektsside og ingen
        profitt å maksimere. Kommunen skal dekke et behov som vokser, med en ramme som står stille
        og fagfolk som er vanskelige å få tak i. Det er et <b>kapasitetsregnestykke</b>, og det kan
        skrives som to ligninger:</p>
      <div class="formula">
        <div class="eq">Behov = antall brukere × timer per bruker</div>
        <div class="eq">Kapasitet = årsverk × timer per årsverk × andel av tiden som er hos brukerne</div>
        <div class="where">Gapet er behovet i 2030 minus kapasiteten rammen gir. Antall brukere følger
          befolkningen, og timer per bruker følger hvor mye hjelp hver trenger. Den første ligningen
          er etterspørselen, den andre er driften.</div>
      </div>
      <ul>
        <li><b>Hvor stort blir gapet, og hvor kommer det fra?</b> Behovet framskrevet til 2030, og
          hvor tiden går i dag, per besøkstype.</li>
        <li><b>Kan behovet bøyes?</b> Færre som trenger hjelp, mindre hjelp per bruker
          (hverdagsrehabilitering), og besøk som kan erstattes der det er forsvarlig
          (medisindispensere, digitalt tilsyn).</li>
        <li><b>Kan hvert årsverk gi mer tid hos brukerne?</b> Ruter, turnus og dokumentasjon.</li>
        <li><b>Hvordan gjennomføres det?</b> Gevinstrealisering: hvordan frigjort tid faktisk går til
          nye brukere. Interessentene: politikerne, de tillitsvalgte og de ansatte, brukerne og de
          pårørende. Og et veikart som henger på budsjettet i desember og valget i 2027.</li>
      </ul>
      <p>Den siste grenen er det som skiller en PwC Consulting-case fra en utredning. Et tiltak som
        ingen tar ut, finnes bare i regnearket.</p>
      <p><b>Hypotesen:</b> <i>«Jeg tror det er behovet som vokser, ikke driften som svikter. Da gir
        bedre drift et engangsløft, mens behovet vokser hvert år, og kommunen må få ned hvor mye
        hjelp hver bruker trenger. Det som ville avkreftet det, er at tjenesten bruker mye mindre av
        tiden hos brukerne enn sammenlignbare kommuner.»</i> <b>Jeg starter</b> med hvor tiden går i
        dag og hvor stort gapet blir, fordi det avgjør om bedre drift i det hele tatt kan holde.</p>
      <p class="tiny">Spør intervjueren hvordan du ville brukt KI i analysen, er ett konkret svar: la
        en modell foreslå ruter ut fra et år med faktiske besøk og kjøretider, så du regner ut hvor
        mye kjøring som faktisk kan spares i stedet for å gjette. Adresser og besøkstyper er
        helseopplysninger også uten navn, så analysen gjøres innenfor kommunens egne systemer.</p>`,
      krav: [
        { k: "struktur", t: "Du bryter behovet ned i volum og intensitet, for eksempel brukere × timer per bruker, eller besøk × tid per besøk." },
        { k: "struktur", t: "Du skiller tiltak som reduserer behovet fra tiltak som gir mer tid hos brukerne per årsverk." },
        { k: "struktur", t: "Du har en egen gren for gjennomføring, med minst to av: gevinstrealisering, interessenter og et veikart mot budsjettet og valget." },
        { k: "uklarhet", t: "Du sier en hypotese som kan avkreftes, og hvilke tall som ville avkreftet den." },
        { k: "kommunikasjon", t: "Du sier hvor du starter og hvorfor, før du begynner å ramse opp tiltak." },
      ],
      felle: "Å importere lønnsomhetstreet eller å strukturere som en liste over kutt. Det finnes ingen inntekter å øke, og en struktur som bare ser på driften, finner effektivisering og overser at det er behovet som vokser.",
    },
    {
      art: "exhibit",
      sek: 300,
      kort: "Besøkene",
      tittel: "Hvor tiden går i en vanlig uke",
      sp: `<p>Intervjueren deler skjermen: tidsstudien fra i vår, en vanlig uke fordelt på
        besøkstype.</p>
        <p><b>«Hva ser du, og hva betyr det?»</b></p>
        <p>Etter en stund legger hun til: <b>«Driftssjefen mener dette er et planleggingsproblem. Hun
        sier at de kjører for mye, og at et nytt planleggingsverktøy og en turnus som følger
        morgentoppen kan kutte kjøring og dokumentasjon fra 20 til 17 minutter per besøk. Lisensen
        til verktøyet ligger allerede i driftsbudsjettet. Hvor mye gir det?»</b></p>`,
      figur: `<table class="data">
          <tr>
            <th>Besøkstype</th>
            <th class="n">Besøk per uke</th>
            <th class="n">Minutter hos bruker per besøk</th>
            <th class="n">Timer hos bruker per uke</th>
          </tr>
          <tr><td>Medisiner: legge fram og gi</td><td class="n">4 200</td><td class="n">10</td><td class="n">700</td></tr>
          <tr><td>Tilsyn og trygghetsbesøk, dag og natt</td><td class="n">1 800</td><td class="n">10</td><td class="n">300</td></tr>
          <tr><td>Personlig stell og måltider</td><td class="n">3 600</td><td class="n">45</td><td class="n">2 700</td></tr>
          <tr><td>Sykepleie: sår, injeksjoner, oppfølging</td><td class="n">1 800</td><td class="n">35</td><td class="n">1 050</td></tr>
          <tr><td>Praktisk bistand: rengjøring og handling</td><td class="n">600</td><td class="n">65</td><td class="n">650</td></tr>
          <tr><td><b>Sum og snitt</b></td><td class="n"><b>12 000</b></td><td class="n"><b>27</b></td><td class="n"><b>5 400</b></td></tr>
        </table>
        <p class="tiny">I tillegg kommer kjøring og dokumentasjon, i snitt 20 minutter per besøk
          uansett type, og 2 600 timer i uka til møter, vaktskifte, opplæring og annet. Et årsverk
          gir rundt 30 timer i uka i tjenesten etter ferie og fravær. Kommunen har sammenlignet seg
          med fire kommuner av samme størrelse. Der er 40–50 prosent av arbeidstiden tid hos
          brukerne.</p>`,
      fasit: `<p>Overskriften først, så beviset:</p>
      <p><i>«Tjenesten er ikke dårlig drevet: 45 prosent av tiden er hos brukerne, midt blant
        kommunene Heggstad sammenligner seg med. Men halvparten av besøkene er korte, og i dem går
        det dobbelt så mye tid til kjøring og dokumentasjon som til brukeren.»</i></p>
      <p><b>Avstem først.</b> 5 400 timer hos brukerne, pluss 12 000 besøk × 20 minutter = 4 000
        timer kjøring og dokumentasjon, pluss 2 600 timer annet, er 12 000 timer. Delt på 30 timer per
        årsverk er det nøyaktig 400 årsverk. Tabellen stemmer med materialet, og <b>andelen tid hos
        brukerne er 45 prosent</b>, midt i spennet på 40–50 hos de fire kommunene.</p>
      <p><b>Så de korte besøkene:</b></p>
      <div class="formula">
        <div class="eq">Medisiner og tilsyn: 6 000 av 12 000 besøk, men bare 1 000 av 5 400 timer hos brukerne</div>
        <div class="eq">Hvert av dem koster 10 minutter hos brukeren + 20 i kjøring og dokumentasjon = <b>30 minutter</b></div>
        <div class="eq">6 000 × 30 minutter = 3 000 timer i uka, altså <b>100 årsverk</b>, en firedel av tjenesten</div>
        <div class="where">To av tre minutter i et kort besøk går med til å komme seg dit og skrive om
          det.</div>
      </div>
      <p><b>Og de lange.</b> Stell, måltider og praktisk bistand er 4 200 besøk, men 3 350 av de
        5 400 timene hos brukerne. Her kan ikke besøket erstattes, men mange brukere kan lære å klare
        deler av det selv.</p>
      <p><b>Så hva.</b> Tabellen deler tiltakene i to. Besøk som kan <i>erstattes</i>, der teknologi
        gjør jobben: medisiner og tilsyn. Og hjelp som kan <i>reduseres</i>, der brukeren trener seg
        opp til å klare mer selv: stell og praktisk bistand. Et besøk som blir kortere, sparer bare
        minuttene hos brukeren. Et besøk som faller bort, sparer også de 20 minuttene rundt det.</p>
      <p><b>Driftssjefens forslag:</b></p>
      <div class="formula">
        <div class="eq">12 000 besøk × 3 minutter = 36 000 minutter = 600 timer i uka</div>
        <div class="eq">600 ÷ 30 = <b>20 årsverk</b>, 5 prosent av kapasiteten, rundt 18 millioner kroner i året</div>
      </div>
      <p>Ta det inn: det er verdt å gjøre, og verktøyet kan komme raskt, men turnusen må lages
        sammen med de tillitsvalgte. Og si hva det er: et engangsløft. Kurven flyttes ned én gang,
        mens antall innbyggere over 80 år vokser med en firedel på fire år. Om 20 årsverk er nok,
        avhenger av hvor stort gapet er, og det er neste spørsmål.</p>`,
      krav: [
        { k: "kommunikasjon", t: "Du sier overskriften før radene, for eksempel at tjenesten ikke er dårlig drevet, men har mange korte besøk med mye tid rundt." },
        { k: "tall", t: "Du regner andelen tid hos brukerne, 5 400 av 12 000 timer eller 45 prosent, og holder den mot 40–50 prosent i kommunene Heggstad sammenligner seg med." },
        { k: "tall", t: "Du regner hva et kort besøk koster i alt: 10 minutter hos brukeren pluss 20 i kjøring og dokumentasjon, altså 30 minutter." },
        { k: "struktur", t: "Du skiller besøk som kan erstattes, som medisiner og tilsyn, fra hjelp som kan reduseres, som stell og praktisk bistand." },
        { k: "tall", t: "Du regner driftssjefens forslag til 600 timer i uka, altså 20 årsverk eller 5 prosent av kapasiteten." },
        { k: "nysgjerrighet", t: "Du tar driftssjefens forslag inn, men sier at det er et engangsløft som må holdes opp mot veksten." },
      ],
      felle: "Å lese de 45 prosentene tid hos brukerne som bevis på sløsing og bygge planen på ruter og turnus. Andelen ligger midt blant kommunene Heggstad sammenligner seg med, og forslaget gir 20 årsverk én gang, mens behovet vokser hvert år.",
    },
    {
      art: "regne",
      sek: 300,
      kort: "Gapet i 2030",
      tittel: "Hvor stort er gapet i 2030?",
      sp: `<p>«Kommunedirektøren vil vite hvor stort problemet er før hun legger fram økonomiplanen.
        <b>Hvis dere fortsetter som i dag, hvor mange flere årsverk trenger hjemmetjenesten i 2030
        enn i dag? Og hva betyr det for tiltaksplanen?</b>»</p>
        <p class="tiny">Legg til grunn at en 85-åring i 2030 trenger like mye hjelp som en 85-åring
        i dag, og at årsverkene vokser i takt med timene hos brukerne. Si framgangsmåten høyt før du
        sier tallet, oversett svaret til kroner, sanity-sjekk det, og si hva tallet forutsetter.</p>`,
      svar: 60,
      enhet: "årsverk",
      toleranse: 0.05,
      fasit: `<p>Tre ledd. Det første er det mange hopper over, fordi veksttallet står så tydelig i
        materialet:</p>
      <div class="formula">
        <div class="eq">Veksten gjelder innbyggerne over 80 år, og de får 60 prosent av tiden hos brukerne: 60 % × 25 % = <b>15 prosent flere timer</b></div>
        <div class="eq">Årsverk: 15 % × 400 = <b>60 årsverk</b>, altså 460 i 2030</div>
        <div class="eq">Kroner: 60 × 0,9 millioner = <b>54 millioner kroner i året</b> over rammen, i 2026-kroner</div>
        <div class="where">Folketallet står omtrent stille, og jeg antar at timene til brukerne under
          80 ligger fast. Det er prosent-av-prosent-fellen fra kapittel 8: 25 prosent vekst i en gruppe som
          står for 60 prosent av timene, er 15 prosent vekst i alt. Detaljen sto i første avsnitt i
          materialet: brukerne er i alle aldre.</div>
      </div>
      <p>Den raske feilen er å ta 25 prosent av hele tjenesten: 100 årsverk og 90 millioner. Det
        overdriver gapet med to tredjedeler.</p>
      <p><b>Sanity-sjekken:</b> 15 prosent på fire år er rundt 3,5 prosent i året, nær de
        3 prosentene timene har vokst med de siste fire årene. 25 prosent ville vært 5,7 prosent i
        året, nesten dobbelt så raskt som de siste fire årene. Da er det regnestykket som er feil,
        ikke eldrebølgen.</p>
      <p><b>Så hva.</b></p>
      <ul>
        <li><b>Hold det mot driftssjefens forslag.</b> Ruter og turnus gir 20 årsverk, en tredjedel
          av gapet, og bare én gang. Gapet vokser med rundt 15 årsverk i året, og framskrivningen sier
          at veksten fortsetter etter 2030.</li>
        <li><b>Det er et folkegap, ikke bare et pengegap.</b> Kommunen fikk besatt 12 av 30
          sykepleierstillinger i fjor. Selv med 54 millioner ekstra ville 60 nye årsverk vært
          vanskelige å finne.</li>
        <li><b>Derfor må behovet bøyes.</b> Når verken penger eller folk kan vokse, er det som
          gjenstår å redusere hvor mye hjelp hver bruker trenger, uten at brukeren får det
          dårligere.</li>
      </ul>
      <p><b>Og to forbehold, sagt høyt.</b> 60 forutsetter at de nye over 80 trenger like mye hjelp
        som snittet i gruppen. Kommer veksten mest blant de yngste over 80, som trenger mindre hjelp
        enn 90-åringene, blir gapet i 2030 noe mindre, og mer av det kommer etter 2030. Be om
        framskrivningen for 80–89 og 90+ hver for seg. Og i de 60 ligger 13 årsverk med møter,
        vaktskifte og annet, samme andel som i dag. Tas veksten uten nye folk, vokser ikke alt
        det.</p>`,
      krav: [
        { k: "tall", t: "Du bruker at bare 60 prosent av tiden hos brukerne går til dem over 80 år, og regner veksten til 15 prosent, ikke 25." },
        { k: "tall", t: "Du lander på 60 årsverk og oversetter det til 54 millioner kroner i året over rammen i 2030." },
        { k: "tall", t: "Du sanity-sjekker svaret, for eksempel mot at timene har vokst med rundt 3 prosent i året de siste fire årene." },
        { k: "tall", t: "Du sier minst to ting gapet betyr for tiltaksplanen, for eksempel at ruter og turnus gir 20 av 60 én gang, at folkene mangler, eller at gapet vokser etter 2030." },
        { k: "kommunikasjon", t: "Du sier framgangsmåten høyt før tallet: andelen over 80, veksten i timer, og så årsverkene." },
        { k: "uklarhet", t: "Du sier hva 60 forutsetter og hva du ville sjekket, for eksempel framskrivningen for 80–89 og 90+ hver for seg." },
      ],
      felle: "Å ta 25 prosent av hele tjenesten og svare 100 årsverk. Veksten gjelder innbyggerne over 80 år, som får 60 prosent av tiden hos brukerne; svaret er 60, og den som overdriver gapet med to tredjedeler, mister tilliten i første møte med politikerne.",
    },
    {
      art: "regne",
      sek: 270,
      kort: "Dispensere",
      tittel: "Hva frigjør medisindispenserne?",
      sp: `<p>«Piloten med medisindispensere har gått bra. Utenom de 50 i piloten får <b>rundt 300
        brukere</b> medisinbesøk i dag, i snitt <b>to om dagen</b>. Sykepleierne i piloten mener at
        <b>to av fem</b> av dem kan bruke dispenser på en forsvarlig måte. Med dispenser trenger
        brukeren fortsatt <b>to besøk i uka</b>, til påfylling og oppfølging.»</p>
        <p>«<b>Hvor mange årsverk frigjør det å gi dispenser til alle av dem som kan bruke den, og
        er det verdt leien?</b>»</p>
        <p>Når du har svart, spør hun: <b>«Så da kan vi ta ned bemanningen tilsvarende?»</b></p>
        <p class="tiny">Legg til grunn at et besøk som faller bort, sparer all tiden det tar i dag.
        Leie og drift koster rundt 20 000 kroner per dispenser i året. Tabellen over besøkene ligger
        under «Besøkene». Si også hvor sikkert tallet er.</p>`,
      svar: 24,
      enhet: "årsverk",
      toleranse: 0.05,
      fasit: `<p>Fem ledd, og det tredje avgjør svaret:</p>
      <div class="formula">
        <div class="eq">Brukere med dispenser: 300 × 2/5 = 120</div>
        <div class="eq">Besøk som faller bort: 120 × (14 − 2) = <b>1 440 i uka</b></div>
        <div class="eq">Tid per besøk: 10 minutter hos brukeren + 20 minutter kjøring og dokumentasjon = <b>30 minutter</b></div>
        <div class="eq">1 440 × 30 = 43 200 minutter = 720 timer i uka</div>
        <div class="eq">720 ÷ 30 timer per årsverk = <b>24 årsverk</b></div>
        <div class="where">Avstem mot tabellen: 300 brukere × 14 besøk = 4 200 medisinbesøk i uka,
          akkurat det tidsstudien viser.</div>
      </div>
      <p>Tre raske feil ligger og venter. Den første er å regne med snittbesøket på 27 minutter: det
        gir 21,6 årsverk, men snittet gjelder alle besøkstyper, og medisinbesøkene er blant de
        korteste. Den andre er å glemme de to besøkene i uka som blir igjen: da faller 14 besøk bort
        per bruker, ikke 12, og svaret blir 28 årsverk. Den tredje er å regne bare de 10 minuttene
        hos brukeren, som gir 8 årsverk. Da har du glemt det tabellen under «Besøkene» viste.</p>
      <p><b>Så hva.</b></p>
      <ul>
        <li><b>40 prosent av gapet</b>, 24 av 60 årsverk, fra ett tiltak.</li>
        <li><b>Ja, det er verdt leien:</b> 24 × 0,9 = 21,6 millioner kroner i året, mot
          120 × 20 000 = 2,4 millioner i leie og drift. Per dispenser er det 180 000 kroner mot
          20 000, altså ni ganger kostnaden.</li>
        <li><b>Og tallet kan vokse.</b> 24 er regnet på dagens brukere. Blir dispenser førstevalget
          for nye medisinbrukere, tar tiltaket også en del av veksten. Det er forskjellen på å
          flytte kurven og å bøye den.</li>
      </ul>
      <p><b>Svaret på oppfølgingen er nei:</b> «Gapet er 60 årsverk. Tar dere ned bemanningen med 24
        nå, må dere ansette dem igjen for å ta veksten. De 24 årsverkene er tid som går til nye
        brukere i stedet for nye stillinger.» Budsjettet går ikke ned. Det er unngått kostnad, og den
        synes bare hvis den telles: besøk erstattet per uke, og årsverk per bruker.</p>
      <p><b>Forbeholdene, sagt høyt:</b> 24 er et tak. Ikke alle de 120 vil takke ja, og kjøringen
        forsvinner ikke helt hvis en kollega uansett skal til samme adresse for stell. Spør også om
        medisinbesøket er det eneste besøket noen av dem får. Da forsvinner den eneste kontakten de
        har med tjenesten, og den må dekkes på en annen måte, eller så skal ikke den brukeren ha
        dispenser. Og utvidelsen står på vent fordi sykepleierne i de andre sonene er skeptiske.
        Gevinsten kommer ikke før de er med.</p>`,
      krav: [
        { k: "tall", t: "Du regner hvert besøk som faller bort til 30 minutter: medisinbesøkets 10 pluss 20 i kjøring og dokumentasjon, ikke snittet på 27." },
        { k: "tall", t: "Du lander på 24 årsverk: 1 440 besøk à 30 minutter er 720 timer i uka, delt på 30 timer per årsverk." },
        { k: "tall", t: "Du holder gevinsten mot kostnaden, for eksempel 21,6 millioner mot 2,4 millioner i året, eller 180 000 mot 20 000 kroner per dispenser." },
        { k: "kommunikasjon", t: "Du sier hva tallet betyr for gapet: 24 av 60 årsverk, altså 40 prosent, fra ett tiltak." },
        { k: "nysgjerrighet", t: "Du svarer på spørsmålet om bemanningen at de 24 årsverkene går til veksten, ikke ut av budsjettet." },
        { k: "uklarhet", t: "Du sier minst én grunn til at 24 er et tak, for eksempel at noen sier nei, eller at medisinbesøket er deres eneste kontakt." },
      ],
      felle: "Å regne med snittbesøket på 27 minutter og svare 21,6 årsverk, eller glemme de to besøkene i uka som blir igjen og svare 28 årsverk. Et snitt over alle besøkstyper sier ingenting om besøkene som faller bort.",
    },
    {
      art: "drøfting",
      sek: 360,
      kort: "Gjennomføring",
      tittel: "Gjennomføringen i en politisk styrt kommune",
      sp: `<p>«Teamet har regnet på de to andre tiltakene, etter kostnadene til terapeuter og utstyr:
        <b>hverdagsrehabilitering</b> for alle nye brukere som kan ha nytte av det, gir rundt
        <b>15 årsverk</b> i 2030, og <b>digitalt nattilsyn</b> gir rundt <b>6</b>.»</p>
        <p><b>«Holder det? Og hvordan ville du gjennomført dette i en politisk styrt kommune? Hvem må
        med, i hvilken rekkefølge, og hva er den største risikoen, og hva gjør du med den?»</b></p>
        <p>Når du er halvveis, legger intervjueren til: <b>«Hovedtillitsvalgt for sykepleierne har
        hørt om planen. Hun sier at frigjort tid bare er et finere ord for kutt, og at de ikke blir
        med på å fjerne 60 stillinger.»</b></p>`,
      fasit: `<p>Poenget først: <b>tiltakene dekker gapet til 2030, men med en margin som er mindre enn
        usikkerheten,</b> og bare hvis den frigjorte tiden faktisk går til de nye brukerne. Det er
        gjennomføringen som avgjør, ikke regnestykket.</p>
      <div class="formula">
        <div class="eq">Ruter og turnus 20 + dispensere 24 + hverdagsrehabilitering 15 + digitalt nattilsyn 6 = <b>65 årsverk</b> mot et gap på 60</div>
        <div class="eq">Overlapp og vekst: dispenserne og nattilsynet tar 1 440 + 360 = 1 800 besøk som ikke også blir tre minutter kortere (−3 årsverk). I 2030 er det 15 prosent flere besøk enn i dag, altså 1 800 til, og de blir det (+3 årsverk). Ruter og turnus gir fortsatt rundt 20, og summen er 65.</div>
        <div class="eq">I kroner: margin 5 × 0,9 = 4,5 millioner mot 2,4 i leie, rundt 2 millioner igjen</div>
        <div class="where">Ruter og turnus korter hvert besøk, også de nye, men endrer ikke veksttakten:
          behovet vokser like fort etterpå. Marginen er mindre enn usikkerheten.</div>
      </div>
      <p><b>Marginen, og hva som kan spise den.</b> 5 årsverk er lite mot det tiltakene kan bomme med.
        Kommer bare 80 av de 120 dispenserne i gang, forsvinner 8 årsverk, og gapet er ikke lukket.
        Hverdagsrehabiliteringen er målt på bare 70 brukere. På den andre siden er 13 av de
        60 årsverkene i gapet møter, vaktskifte og annet, som ikke nødvendigvis vokser når veksten
        tas uten nye folk. Derfor kan ingen av tiltakene droppes før effekten er målt.</p>
      <p>Sjekk gjerne teamets tall for nattilsynet: 6 årsverk er 180 timer i uka, altså 360 besøk à
        30 minutter. Tallet er netto etter utstyret, så det er litt over 360 besøk, rundt en femdel
        av tilsynsbesøkene. Det er et troverdig anslag.</p>
      <p>Legg merke til forskjellen på tiltakene. Ruter og turnus og dispensere til dagens brukere
        <i>flytter</i> kurven én gang. Hverdagsrehabilitering og dispenser som førstevalg for nye
        brukere <i>bøyer</i> den, fordi hver ny bruker får færre besøk eller klarer mer selv. Etter
        2030, når veksten fortsetter, er det bare de siste som holder følge.</p>
      <p><b>Veikartet, hengt på den politiske kalenderen:</b></p>
      <ul>
        <li><b>Nå til desember: vedtaket.</b> Økonomiplanen for 2027–2030 får en gevinstplan: rammen
          holdes, og veksten tas med tiltakene. Det som måles, er årsverk per bruker, andelen nye
          brukere som får hverdagsrehabilitering først, og brukertilfredsheten og avvikene i
          legemiddelhåndteringen, som er kommunens egen definisjon av at tilbudet ikke svekkes.
          Kommunestyret vedtar prinsippet, ikke bare tallet. Hjemmetjenesten får budsjettet for
          dispenserne, fordi det er den som får gevinsten. Omstillingsavtale med de tillitsvalgte før
          jul.</li>
        <li><b>2027, med start før valget: det som bare er bedre for brukeren.</b> Dispensere fra
          50 til 170 i løpet av 2027, først i pilotsonen, der de ansatte har erfaring, så én sone om
          gangen. Nytt planleggingsverktøy i to soner. Hverdagsrehabilitering i én sone til. Alt
          frivillig for dagens brukere.</li>
        <li><b>2028: alle fire soner.</b> Ny turnus laget sammen med de tillitsvalgte, digitalt
          nattilsyn, og hverdagsrehabilitering som første tilbud til alle nye brukere som kan ha nytte
          av det.</li>
        <li><b>2029–2030: full effekt.</b> Veksten tas uten nye årsverk, og politikerne får tallene
          hvert kvartal.</li>
      </ul>
      <p><b>Interessentene, og hva hver av dem trenger.</b> <b>Politikerne</b> eier rammen og
        tjenestenivået, og trenger en plan de kan stå for før et valg, med tall som viser at tilbudet
        ikke svekkes. <b>De tillitsvalgte og de ansatte</b> trenger en garanti mot oppsigelser,
        innflytelse på turnusen og en arbeidsdag som blir bedre, ikke tettere. <b>Brukerne og de
        pårørende</b>, også gjennom eldrerådet, trenger individuell vurdering, en prøveperiode og
        retten til å si nei. <b>Fastlegene og apoteket</b> må med, fordi dispenserne forutsetter
        oppdaterte medisinlister og ferdig pakkede medisiner.</p>
      <p><b>Den største risikoen</b> er at gevinsten aldri blir tatt ut: tiden fylles med lengre
        besøk og mer dokumentasjon, og sonene ansetter for veksten likevel. Grepene: ingen sone får
        nye årsverk for vekst, gevinsten måles i årsverk per bruker og ikke i «timer spart», og hvert
        tiltak har én navngitt eier. Den nest største er at tallene er for optimistiske:
        hverdagsrehabiliteringen er målt på 70 brukere i én sone, tre måneder etter, og ingen vet
        ennå om de var friskere enn snittet fra før. Spør hvordan de ble valgt, og mål igjen etter
        tolv måneder før tallet låses i budsjettet.</p>
      <p><b>Svaret til den tillitsvalgte:</b> ta det inn, ikke avvis det. «Ingen av de 400 skal sies
        opp, og ingen stillinger fjernes. De 60 er stillinger vi ellers måtte lyst ut, og i fjor fikk
        vi besatt 12 av 30. Det dere får, er færre korte besøk med kjøring imellom, og en turnus dere
        er med på å lage.» Og tilby noe konkret: de tillitsvalgte inn i styringsgruppen, og måling av
        arbeidsbelastningen ved siden av gevinsten.</p>`,
      krav: [
        { k: "tall", t: "Du holder tiltakene mot gapet i både årsverk og kroner, for eksempel 65 mot 60 årsverk, og en margin på 4,5 millioner mot 2,4 i leie." },
        { k: "struktur", t: "Du legger veikartet i faser som følger budsjettvedtaket i desember og valget i september 2027." },
        { k: "struktur", t: "Du sier hva som kommer først og hvorfor, for eksempel dispenserne i pilotsonen, der de ansatte alt har erfaring." },
        { k: "kommunikasjon", t: "Du navngir minst tre interessenter og hva hver av dem trenger, for eksempel politikerne, de tillitsvalgte og brukerne." },
        { k: "uklarhet", t: "Du navngir den største risikoen med et konkret grep, for eksempel at frigjort tid ikke går til nye brukere hvis sonene får ansette for vekst." },
        { k: "nysgjerrighet", t: "Du tar imot den tillitsvalgte uten å avvise henne, for eksempel med at ingen sies opp og at de 60 stillingene uansett er vanskelige å besette." },
      ],
      felle: "Å gi en generisk interessentliste og et veikart uten datoer. I en politisk styrt kommune er budsjettvedtaket i desember og valget i september 2027 rammene veikartet må henge på, og en plan som ikke sier hvordan frigjort tid tas ut, forsvinner i driften.",
    },
    {
      art: "syntese",
      sek: 240,
      kort: "Anbefaling",
      tittel: "Anbefalingen til formannskapet",
      sp: `<p>Kommunedirektøren skal orientere formannskapet neste uke. <b>«Gi meg anbefalingen din,
        slik du ville sagt den der. Du har ett minutt.»</b></p>
        <p>Midtveis avbryter hun: <i>«Ordføreren har sagt det rett ut: politikerne vil ikke ha noe
        som kan oppfattes som kutt i tjenestene før valget. Kan vi ikke vente med dette til etter
        september?»</i></p>
        <p class="tiny">Skriv anbefalingen slik du ville sagt den, og ta med hvordan du svarer
        ordføreren.</p>`,
      fasit: `<p>Topp-ned og med tallene fra casen: anbefalingen, tre grunner, største risiko og neste
        steg, på ett minutt.</p>
      <blockquote>
        <p><b>«Ta veksten fram til 2030 med de samme 400 årsverkene: ikke kutt, og ikke flere
        stillinger.</b> Fire tiltak frigjør rundt 65 årsverk mot et gap på 60, og
        etter leien av dispenserne er det rundt 2 millioner igjen i 2030.</p>
        <p>For det første vokser behovet: 60 prosent av tiden hos brukerne går til dem over 80, og de
        blir en firedel flere. Det er 60 årsverk mer i 2030, 54 millioner over rammen. For det andre
        gir ruter og turnus bare 20 årsverk, én gang. Resten må komme fra færre besøk og mer
        selvhjulpne brukere: dispensere 24, hverdagsrehabilitering 15, nattilsyn 6. For det tredje
        kan dere ikke ansette dere ut av det: 12 av 30 sykepleierstillinger ble besatt i fjor.</p>
        <p>Største risiko er at frigjort tid ikke går til nye brukere. Marginen er tynn: 80 dispensere
        i stedet for 120 gir 8 årsverk mindre. Neste steg er vedtaket i desember og de første
        dispenserne i januar.»</p>
      </blockquote>
      <p>Innvendingen kommer midtveis. Svaret på den er et eget, kort avsnitt:</p>
      <blockquote>
        <p>«Til ordføreren: dette er ikke et kutt. Ingen blir sagt opp, og ingen mister et vedtak
        uten ny vurdering. For brukerne betyr det medisiner til riktig tid og flere som klarer seg
        selv lenger. Men jeg pynter ikke på det: rundt 120 får færre medisinbesøk, og noen får
        nattilsyn på skjerm. Å vente koster rundt 15 årsverk i valgåret, 13,5 millioner. Så jeg
        endrer rekkefølgen, ikke tallene: før valget gjør vi bare det som er frivillig og bedre for
        brukeren.»</p>
      </blockquote>
      <p>Svaret gjør tre ting. Det avviser det som ikke stemmer, at dette er kutt. Det innrømmer det
        som stemmer, at noen får færre besøk. Og det sier hva det koster å vente.</p>
      <p>Tallene bak: å vente er gapet fordelt på fire år, 60 årsverk fram til 2030 er rundt 15 i
        året, og 15 × 0,9 = 13,5 millioner. Summen er 65: overlappen og de flere besøkene i 2030
        opphever hverandre. Marginen er 4,5 millioner mot 2,4 i leie. Risikoen er
        dispenserregningen baklengs: hver bruker med dispenser frigjør 12 besøk à 30 minutter,
        altså 6 timer i uka eller en femdel av et årsverk, og 40 færre brukere er 8 årsverk.</p>
      <p>Og legg merke til hva som <i>ikke</i> står der: ingen «besparelse på 54 millioner».
        Budsjettet går ikke ned. Det som vinnes, er at veksten tas uten å ansette, og det kan
        politikerne si høyt, gjerne som en reform de eier selv.</p>
      <p>Formen er <b>standpunkt, tre grunner med tall, største risiko og neste steg på ett minutt,
        og innvendingen tatt inn med det den endrer, det den ikke endrer, og hva det koster å
        vente.</b> Svaret til ordføreren er verken «ja, vi venter» eller «nei». Det er en ny
        rekkefølge, med de samme tallene.</p>`,
      krav: [
        { k: "kommunikasjon", t: "Du sier anbefalingen i første setning, for eksempel å ta veksten med de samme 400 årsverkene i stedet for å kutte eller ansette." },
        { k: "tall", t: "Du bruker minst to av casens tall som grunner, for eksempel gapet på 60 årsverk og de 20 som ruter og turnus gir." },
        { k: "nysgjerrighet", t: "Du sier hva ordførerens innvending endrer og hva den ikke endrer, for eksempel rekkefølgen, men ikke tallene." },
        { k: "tall", t: "Du sier hva det koster å vente, for eksempel veksten i 2027: rundt 15 årsverk eller 13,5 millioner kroner." },
        { k: "kommunikasjon", t: "Du sier rett ut hva brukerne merker, for eksempel at rundt 120 får færre medisinbesøk, i stedet for å kalle alt bedre tjenester." },
        { k: "uklarhet", t: "Du sier hva som ikke er i mål ennå, for eksempel at marginen er mindre enn usikkerheten, eller at 80 dispensere i stedet for 120 gir 8 årsverk mindre." },
      ],
      felle: "Å gi etter og skyve alt til etter valget, eller å selge planen som bare bedre tjenester og skjule at rundt 120 brukere får færre medisinbesøk. Det første koster rundt 13,5 millioner i 2027, det andre koster tilliten når det kommer fram.",
    },
  ],
}
);
