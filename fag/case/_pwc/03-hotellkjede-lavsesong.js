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
}
