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
