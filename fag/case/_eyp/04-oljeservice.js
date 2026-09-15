/* EY-Parthenon 04 · Commercial due diligence på et norsk brønnteknologiselskap
   for en amerikansk strategisk kjøper. Avansert, 40 minutter, finalerundens
   lengde.

   Casens egenart: partneren presser tilbake. Trinn 5 introduserer ny og
   motstridende informasjon etter at kandidaten har landet på en hypotese, og
   fasiten der handler like mye om hvordan hun reagerer som om hva som er riktig.
   EY-Parthenon vurderer uttrykkelig om kandidaten «svarer konstruktivt på
   motstand og ny informasjon». Det er den ferdigheten dette trinnet trener.

   Spenningen casen bygger på: olje og gass er bare 6 prosent av norske
   transaksjoner, og boreaktiviteten på en moden sokkel faller. Samtidig kjøper
   amerikanske konsern norsk brønn- og boreteknologi. Begge deler er sanne, og
   svaret ligger i at en krympende bransje kan ha en voksende nisje.

   Settingen er konstruert. Transaksjonene i bakgrunnen er ekte og hentet fra
   EY-Parthenon Oslos Transaction Trends Q2 2026. Se docs/case-research/08,
   seksjon 3.2, 5.1 og 5.9.
*/
{
  id: "eyp-oljeservice-exit",
  kategori: "EY-Parthenon",
  label: "Brønnteknologien amerikaneren vil kjøpe",
  type: "M&A",
  nivå: "Avansert",
  firma: "EY-Parthenon",
  stil: "candidate-led",
  minutter: 40,
  ch: [],
  blurb: "Finalerundens lengde, og finalerundens press. Du skal skille en krympende bransje fra en voksende nisje, sette en pris, og tåle at partneren snur arket midtveis.",
  prompt: `<p>Klienten er <b>Calder Energy Services</b>, et børsnotert amerikansk oljeserviceselskap
    med hovedkontor i Houston og om lag 4,5 milliarder dollar i omsetning. De er sterke innen
    boretjenester og svake innen brønnintervensjon.</p>
    <p>Calder vurderer å kjøpe <b>Nordvest Well Technology AS</b> i Stavanger, som eies av det nordiske
    oppkjøpsfondet Fjordkapital. Fondet har hatt selskapet i seks år og kjører nå en strukturert
    salgsprosess. Prisforlangendet er <b>1 800 millioner kroner</b> for hundre prosent på gjeldfri
    basis, altså rundt 170 millioner dollar med en kurs på 10,50 kroner per dollar.</p>
    <p>Nordvest omsatte i fjor for 900 millioner kroner med 180 millioner i EBITDA, og har en ordrebok
    på 1 400 millioner. Calders investeringskomité møtes om fire uker.</p>
    <p><b>Bør Calder kjøpe, og hva bør de i så fall betale?</b></p>`,
  bakgrunn: `<p>Klienten og målselskapet er oppdiktet, men bevegelsen er ekte. I ett enkelt kvartal i
    2026 kjøpte Halliburton både Sekal, et boreautomasjonsselskap i Stavanger, og InformatiQ. SLB kjøpte
    Hydra Well Intervention fra Norvestor, og Expro kjøpte Enhanced Drilling fra EV Private Equity for
    216 millioner dollar. Mønsteret er det samme hver gang: en nordisk eier selger, og en amerikansk
    industriell kjøper betaler. EY-Parthenon Oslo leser det som en bekreftelse på Norges rolle som
    globalt knutepunkt for undergrunns- og boreteknologi.</p>
    <p>Spenningen kandidaten må håndtere, er at det samtidig går motsatt vei. Olje og gass er bare
    6 prosent av antallet norske transaksjoner, og det meste av den aktiviteten er lisensbytter mellom
    operatørene, ikke selskapsoppkjøp. Norsk sokkel er moden, og boreaktiviteten faller. En kandidat
    som svarer «olje er dødt» bommer, og en som svarer «oljeservice er hett» bommer like mye.
    Det som faktisk er hett, er <i>teknologien</i>, og bare deler av den.</p>
    <p>Permanent plugging av brønner, på engelsk plug and abandonment eller P&amp;A, er den delen som
    peker motsatt vei av resten av bransjen. Arbeidet utløses av regelverk og av brønnenes alder,
    ikke av oljeprisen. Jo eldre sokkelen blir, desto mer av det må gjøres. Teknologi som fjerner
    behovet for en borerigg kutter kostnaden per brønn kraftig, og det er den typen teknologi en
    amerikansk kjøper med kanal i førti land kan gjøre langt mer ut av enn en norsk eier kan alene.</p>
    <p>Merk at kjøperen her er en strategisk kjøper, ikke et fond. Det flytter hele regnestykket:
    strategen kan betale for synergier og for teknologien i seg selv, og har derfor et høyere tak
    enn en finansiell kjøper. Å se den forskjellen, og å tallfeste den, er kjernen i denne casen.</p>`,
  trinn: [
    {
      art: "oppklaring",
      sek: 150,
      tittel: "Hva vil du vite før du strukturerer?",
      sp: `<p>Du har hørt prompten, og du driver selv. <b>Hvilke spørsmål stiller du, og hvorfor akkurat de?</b></p>
        <p class="tiny">Fire til fem er nok. Si hva hvert svar vil endre.</p>`,
      fasit: `<p>I en commercial due diligence gjør de gode oppklarende spørsmålene tre ting: de fester
        <b>hvem klienten er og hva hun måler mot</b>, de <b>deler målselskapet opp i de delene det
        faktisk består av</b>, og de <b>oversetter prisen til noe du kan vurdere</b>.</p>
        <ul>
          <li><b>Regn multippelen med en gang.</b> 1 800 delt på 180 er ti ganger EBITDA. Si det høyt.
            Å få en pris uten å oversette den til en multippel er et bortkastet poeng, og multippelen
            er det du skal bruke som målestokk resten av casen.</li>
          <li><b>Hva er den strategiske begrunnelsen?</b> Vil Calder ha teknologien, kanalen inn på
            norsk sokkel, eller kontantstrømmen? Svaret avgjør hva de kan forsvare å betale. En
            strategisk kjøper kjøper synergier, ikke bare et resultat.</li>
          <li><b>Hva består de 900 millionene av?</b> Et oljeserviceselskap er nesten alltid to eller
            tre virksomheter i én, og de har ulike drivere. Be om omsetning og margin per segment,
            tre år tilbake.</li>
          <li><b>Er ordreboken fast eller opsjonsbasert?</b> I prosjektbransjer er det forskjellen på
            en inntekt og et håp. Spør også om book-to-bill.</li>
          <li><b>Hvor mange kunder står for inntekten?</b> Norsk sokkel har en håndfull operatører.
            Sannsynligheten for at tre kunder er over halve omsetningen, er høy, og det er et funn
            du bør lete etter i stedet for å bli overrasket av.</li>
        </ul>
        <p>Det som skiller her, er at du <b>ikke</b> spør om holdeperiode og avkastningskrav. De
        spørsmålene hører til et fond. Calder er en industriell kjøper uten exit-dato, og det du i
        stedet må vite, er hva de eier fra før og hvor overlappet ligger.</p>`,
      krav: [
        "Du regner ut den implisitte multippelen umiddelbart: 1 800 delt på 180 er ti ganger EBITDA.",
        "Du spør hva de 900 millionene består av, fordi et oljeserviceselskap sjelden er én virksomhet.",
        "Du spør hvorfor Calder vil ha selskapet. Klienten er en strateg, og begrunnelsen setter taket for prisen.",
        "Du spør om ordreboken er fast eller opsjonsbasert før noen har antydet at det er et tema.",
        "Du stiller fire til fem spørsmål, ikke tolv, og sier for hvert enkelt hva svaret vil endre.",
      ],
      felle: "Å spørre om holdeperiode, avkastningskrav og exit-multippel. Det er spørsmål til et oppkjøpsfond. Calder er en industriell kjøper, og spørsmålet avslører at du har pugget PE-casen i stedet for å lytte til hvem klienten er.",
    },
    {
      art: "struktur",
      sek: 270,
      tittel: "Strukturer vurderingen",
      sp: `<p>Tegn strukturen du vil jobbe etter, og <b>avslutt med hypotesen din</b> om hvor svaret ligger.</p>
        <p class="tiny">Ta tenketid og si høyt at du tar den. To minutter i stillhet er normalt i en finalerunde.</p>`,
      fasit: `<p>Dette er en diligence-case, ikke en lønnsomhetscase. Å åpne med inntekter minus kostnader
        er en tydelig feilnavigering. Formen som forventes, går fra markedet til transaksjonen, og
        forankres i den ligningen kjøperen faktisk skal ta stilling til:</p>
        <div class="formula">
          <div class="eq">Verdi for Calder = standalone-verdi + verdien av synergiene − kostnaden ved å hente dem ut</div>
          <div class="where">Det er den siste halvdelen som skiller en strategisk kjøper fra et fond, og
            den bør ha sin egen gren fra første stund.</div>
        </div>
        <ul>
          <li><b>Markedet, delt etter driver og ikke etter produkt.</b> Boreaktivitet følger oljepris og
            operatørenes investeringsbeslutninger, og faller på en moden sokkel. Brønnintervensjon og
            permanent plugging følger regelverk og brønnenes alder. De to har ikke samme bane, og en
            struktur som legger dem i samme boks, låser deg ute fra svaret.</li>
          <li><b>Konkurranseposisjonen.</b> Hva er vollgraven? På norsk sokkel er prekvalifisering hos
            operatørene en reell inngangsbarriere, og referanselister på utførte pluggejobber er
            vanskelige å kopiere. Hvem taper de mot, og hvorfor?</li>
          <li><b>Selskapets egen økonomi.</b> Omsetning og margin per segment, ordrebok mot omsetning,
            kundekonsentrasjon, og investeringsbehovet i utleieflåten. Er marginen tjent eller lånt?</li>
          <li><b>Transaksjonen.</b> Hva er selskapet verdt frittstående, hva er det verdt for akkurat
            denne kjøperen, og hva er risikoen som kan velte begge tallene?</li>
        </ul>
        <p><b>Hypotesen:</b> «Jeg tror dette er to selskaper i ett. Det ene krymper med boreaktiviteten,
        det andre vokser med regelverket. Ti ganger EBITDA på konsernet er bare forsvarlig hvis den
        voksende delen er stor nok, lønnsom nok og varig nok til å bære hele prisen. Det er det jeg
        tester først.»</p>`,
      krav: [
        "Strukturen er en diligence-struktur som går fra marked til transaksjon, ikke et lønnsomhetstre.",
        "Du deler markedet etter driver: boreaktivitet følger oljeprisen, plugging følger regelverk og brønnalder.",
        "Du har en egen gren for transaksjonen, med skillet mellom standalone-verdi og verdi for denne kjøperen.",
        "Du nevner kundekonsentrasjon uoppfordret, fordi norsk sokkel har få operatører.",
        "Grenene overlapper ikke og dekker til sammen beslutningen.",
        "Du avslutter med en hypotese og sier hvilken gren du går til først.",
      ],
      felle: "Å behandle oljeservice som ett marked med én vekstrate. Hele casen ligger i at bransjen krymper mens en nisje i den vokser, og en struktur som ikke rommer begge bevegelsene samtidig, gjør resten av analysen umulig.",
    },
    {
      art: "regne",
      sek: 360,
      tittel: "Hvor stort er plugge-markedet på norsk sokkel?",
      sp: `<p>Du ba om markedstall for permanent plugging av brønner. Intervjueren gir deg fire opplysninger:</p>
        <ul>
          <li>Om lag <b>3 000 brønner</b> på norsk sokkel skal permanent plugges før sokkelen er ferdig.</li>
          <li>Operatørenes planer sprer arbeidet over om lag <b>30 år</b>.</li>
          <li>Gjennomsnittlig totalkostnad per permanent plugging er <b>50 millioner kroner</b>.</li>
          <li>Av den kostnaden går om lag <b>20 prosent</b> til spesialiserte teknologi- og
            tjenesteleverandører. Resten er rigg, fartøy, borekontraktør og prosjektledelse.</li>
        </ul>
        <p><b>Hvor stort er det årlige markedet Nordvest faktisk kan selge inn i, i millioner kroner?</b></p>
        <p class="tiny">Si framgangsmåten høyt før tallet, og si hva tallet betyr etterpå.</p>`,
      svar: 1000,
      enhet: "millioner kroner",
      toleranse: 0.05,
      fasit: `<p>Bygg nedenfra, og si hvert ledd høyt mens du gjør det:</p>
        <div class="formula">
          <div class="eq">3 000 brønner ÷ 30 år = 100 brønner i året</div>
          <div class="eq">100 × 50 mill. kr = 5 000 mill. kr i året, som er hva operatørene bruker</div>
          <div class="eq">5 000 × 20 % = <b>1 000 mill. kr i året</b>, som er hva leverandørene deler</div>
        </div>
        <p><b>Kryssjekk før du går videre.</b> Hele plugge-regningen på norsk sokkel blir 3 000 × 50, altså
        150 milliarder kroner. Fordelt på 30 år er det 5 milliarder i året, som er i underkant av
        2 prosent av de årlige petroleumsinvesteringene på norsk sokkel. Størrelsesordenen er rimelig, og
        1 000 millioner ligger der et norsk B2B-nisjemarked skal ligge: rundt en milliard, ikke to
        hundre milliarder.</p>
        <p><b>Så hva.</b> Nordvest hadde 250 millioner i norsk P&amp;A-omsetning i fjor. Det er rundt en
        fjerdedel av markedet, altså nummer én eller to i et marked som drives av regelverk og av
        brønnenes alder, ikke av oljeprisen. Det er nettopp den frakoblingen fra oljeprisen Calder
        betaler for.</p>
        <p><b>Det som skiller en sterk kandidat.</b> Nordvest selger riggløs plugging, altså en metode som
        fjerner behovet for en borerigg. Hvis den metoden tar over, faller totalkostnaden per brønn fra
        rundt 50 til rundt 30 millioner, men leverandørens andel av kostnaden stiger fra rundt 20 til
        rundt 40 prosent. Regn på det:</p>
        <div class="formula">
          <div class="eq">I dag: 20 % × 50 = 10 mill. kr per brønn til leverandøren</div>
          <div class="eq">Riggløst: 40 % × 30 = 12 mill. kr per brønn til leverandøren</div>
          <div class="eq">Markedet for leverandørene: 100 × 12 = 1 200 mill. kr i året</div>
        </div>
        <p>Operatøren sparer 20 millioner per brønn <i>samtidig</i> som leverandørens andel vokser. Det er
        en helt annen bane enn volumvekst: teknologien krymper markedet den selger inn i, og øker sin
        egen del av det. Å se den mekanismen er det som skiller en kandidat som har forstått hva Calder
        kjøper, fra en som har regnet riktig.</p>`,
      krav: [
        "Du bygger nedenfra og sier hvert ledd høyt: brønner per år, kroner per brønn, og hvor stor del av de kronene som er leverandørens.",
        "Du stopper ikke ved 5 000 millioner. Det er operatørens regning, ikke leverandørens marked.",
        "Du kryssjekker mot noe utenfor casen. 150 milliarder over 30 år er rundt 2 prosent av de årlige petroleumsinvesteringene, og da stemmer størrelsesordenen.",
        "Du sier hva tallet betyr: med 250 millioner i Norge har Nordvest rundt en fjerdedel av et marked som ikke følger oljeprisen.",
        "Du oppgir enhet, runder av høyt, og later ikke som du er presis.",
        "Du sier noe om hvordan riggløs teknologi endrer både kostnaden per brønn og leverandørens andel av den.",
      ],
      felle: "Å svare 5 000 millioner. Det er hva operatørene bruker, ikke hva leverandøren kan selge. Å blande totalmarked og adresserbart marked er den vanligste feilen i markedsdelen av en CDD, og her gjør den selskapets markedsandel fem ganger for lav.",
    },
    {
      art: "exhibit",
      sek: 330,
      tittel: "Segmentregnskapet fra datarommet",
      sp: `<p>Du ba om tall per segment. Her er de. <b>Hva ser du, og hva betyr det for prisen på ti ganger EBITDA?</b></p>`,
      figur: `<table class="data">
          <tr><th>Millioner kroner</th><th class="n">2023</th><th class="n">2024</th><th class="n">2025</th></tr>
          <tr><td>Omsetning, boreteknologi og utstyrsutleie</td><td class="n">620</td><td class="n">570</td><td class="n">540</td></tr>
          <tr><td>Omsetning, brønnintervensjon og P&amp;A</td><td class="n">180</td><td class="n">260</td><td class="n">360</td></tr>
          <tr><td><b>Sum omsetning</b></td><td class="n"><b>800</b></td><td class="n"><b>830</b></td><td class="n"><b>900</b></td></tr>
          <tr><td>EBITDA, boreteknologi og utstyrsutleie</td><td class="n">99</td><td class="n">86</td><td class="n">76</td></tr>
          <tr><td>EBITDA, brønnintervensjon og P&amp;A</td><td class="n">43</td><td class="n">68</td><td class="n">104</td></tr>
          <tr><td><b>Sum EBITDA</b></td><td class="n"><b>142</b></td><td class="n"><b>154</b></td><td class="n"><b>180</b></td></tr>
          <tr><td>Ordrebok ved årsslutt</td><td class="n">950</td><td class="n">1 150</td><td class="n">1 400</td></tr>
        </table>
        <p class="tiny">Av P&amp;A-omsetningen i 2025 lå 250 millioner i Norge og 110 millioner internasjonalt
        (Storbritannia og Brasil). De tre største kundene sto for 61 prosent av konsernomsetningen, den
        største alene for 34 prosent.</p>`,
      fasit: `<p>Overskriften først, så beviset:</p>
        <p><i>«Dette er ikke ett selskap. Det er to, de går i hver sin retning, og konserntallene skjuler
        begge bevegelsene.»</i></p>
        <ul>
          <li><b>Boreteknologi krymper, og marginen krymper med den.</b> Omsetningen faller fra 620 til 540,
            altså rundt 6,7 prosent i året. EBITDA faller fra 99 til 76. Marginen går fra 16 til 14 prosent.
            Et fallende volum spiser en fast kostnadsbase, og det er akkurat det du ser.</li>
          <li><b>P&amp;A dobler seg.</b> Omsetningen går fra 180 til 360, altså rundt 41 prosent i året.
            EBITDA går fra 43 til 104, og marginen fra 24 til 29 prosent. Marginen stiger <i>mens</i>
            volumet vokser, som er tegnet på at det er teknologi og ikke bemanning som selges.</li>
          <li><b>Det avgjørende forholdstallet:</b> P&amp;A er 40 prosent av omsetningen og nesten
            58 prosent av EBITDA. Regn det: 360 av 900, og 104 av 180.</li>
          <li><b>Konsernet ser rolig ut.</b> 6 prosent vekst i året og en margin som stiger fra 17,8 til
            20 prosent. Men marginen stiger ikke fordi noe drives bedre; den stiger fordi miksen flytter
            seg. Det er en helt annen sak, og en kjøper som betaler for marginforbedring, betaler for en
            miksendring hun ikke selv har skapt.</li>
        </ul>
        <p><b>Konsekvensen for prisen.</b> Én multippel på konsernet er feil spørsmål når delene fortjener
        ulike multipler. Del den opp og se hva som skjer, med dine egne antakelser sagt høyt:</p>
        <div class="formula">
          <div class="eq">Boreteknologi: 76 × 5 = 380 mill. kr</div>
          <div class="eq">Brønnintervensjon og P&amp;A: 104 × 11 = 1 144 mill. kr</div>
          <div class="eq">Sum: rundt 1 520 mill. kr, mot et prisforlangende på 1 800</div>
          <div class="where">Multiplene er antakelser du setter selv, og du skal si det. Poenget er ikke
            tallet, men at en krympende virksomhet med fallende margin ikke fortjener samme multippel
            som en som dobler seg med stigende margin.</div>
        </div>
        <p><b>Og se kundekonsentrasjonen.</b> 61 prosent på tre kunder, 34 prosent på den største, altså
        rundt 306 millioner kroner på ett kundeforhold. På norsk sokkel er dette delvis strukturelt, siden
        det finnes en håndfull operatører, men det er likevel det første en investeringskomité vil spørre
        om. Si det selv, før de gjør det.</p>`,
      krav: [
        "Du sier overskriften først: konsernet vokser, men det består av to virksomheter som går i hver sin retning.",
        "Du regner margin per segment og ikke bare omsetning. Boreteknologi faller fra 16 til 14 prosent, P&A stiger fra 24 til 29.",
        "Du finner forholdstallet som avgjør hva Calder egentlig kjøper: 40 prosent av omsetningen, 58 prosent av EBITDA.",
        "Du trekker konsekvensen for prisen og foreslår å verdsette delene hver for seg, med multipler du selv begrunner.",
        "Du sier at konsernmarginen stiger på grunn av miks, ikke på grunn av bedre drift.",
        "Du tar opp at tre kunder står for 61 prosent av omsetningen, og behandler det som en risiko og ikke en fotnote.",
      ],
      felle: "Å glede seg over 20 prosent EBITDA-margin på konsernet. Marginen stiger bare fordi tyngdepunktet flytter seg mot P&A. Leser du den som en forbedring i driften, betaler du for noe som ikke har skjedd.",
    },
    {
      art: "exhibit",
      sek: 450,
      tittel: "Partneren snur arket",
      sp: `<p>Du har landet på at P&amp;A-benet bærer hele casen, og at ordreboken på 1 400 millioner
        underbygger det. Partneren som leder prosjektet har sittet stille til nå. Hun snur arket:</p>
        <blockquote><p>«Jeg tror ikke på den ordreboken. Se på hvordan den er satt sammen før du svarer
          meg. Og teknisk due diligence har sendt over én ting til.»</p></blockquote>
        <p><b>Hva gjør de to opplysningene med hypotesen din, og hva må nå stemme for at konklusjonen
        din skal holde?</b></p>`,
      figur: `<table class="data">
          <tr><th>Ordreboken ved utgangen av 2025</th><th class="n">Mill. kr</th><th class="n">Andel</th><th>Kontraktsform</th></tr>
          <tr><td>Rammeavtale P&amp;A på ett felt, signert november 2025</td><td class="n">700</td><td class="n">50 %</td><td>Opsjon. Operatøren har ikke tatt investeringsbeslutning, og kan trekke seg årlig uten kostnad</td></tr>
          <tr><td>Løpende P&amp;A-oppdrag, fire operatører</td><td class="n">280</td><td class="n">20 %</td><td>Faste, tolv måneder</td></tr>
          <tr><td>Boreteknologi og utstyrsutleie, ni kunder</td><td class="n">350</td><td class="n">25 %</td><td>Rullerende rammeavtaler</td></tr>
          <tr><td>Internasjonalt, tre kunder</td><td class="n">70</td><td class="n">5 %</td><td>Piloter</td></tr>
          <tr><td><b>Sum</b></td><td class="n"><b>1 400</b></td><td class="n"><b>100 %</b></td><td></td></tr>
        </table>
        <p class="tiny"><b>Fra teknisk due diligence:</b> vedlikeholdet på utleieflåten av verktøy og
        trykkontrollutstyr har ligget på 18 millioner kroner i året de tre siste årene, mot 43 millioner
        i årene før. Gjennomsnittsalderen på flåten har steget fra fire til sju år. Teknisk DD anslår at
        etterslepet må tas igjen med 80 millioner kroner over to år, og at et normalisert årlig
        vedlikeholdsnivå ligger 25 millioner høyere enn dagens. Ledelsen kaller den lave posten
        «effektivisering».</p>`,
      fasit: `<p><b>Regn på informasjonen før du reagerer på den.</b> Det kjøper deg tid, og det gjør
        reaksjonen din etterpå til noe annet enn en mening.</p>
        <div class="formula">
          <div class="eq">Ordrebok uten rammeavtalen: 1 400 − 700 = 700 mill. kr</div>
          <div class="eq">Det er 700 ÷ 900 = 0,78 års omsetning, ikke 1,56</div>
          <div class="eq">Nye ordrer i 2025: 1 400 − 1 150 + 900 = 1 150 ⇒ book-to-bill 1,28</div>
          <div class="eq">Uten rammeavtalen: 450 ÷ 900 = <b>book-to-bill 0,50</b></div>
          <div class="eq">Normalisert EBITDA: 180 − 25 = <b>155 mill. kr</b></div>
          <div class="eq">Prisforlangendet er da 1 800 ÷ 155 = <b>11,6 ganger</b>, ikke 10</div>
        </div>
        <p>Med andre ord: den underliggende ordreinngangen i fjor var halvparten av omsetningen, og
        P&amp;A-ordreboken uten rammeavtalen er 280 millioner mot en P&amp;A-omsetning på 360, altså
        0,78 år og ikke de 2,7 årene tallet så ut til å gi. I tillegg er de 80 millionene i etterslep kontanter Calder må
        ut med etter closing, uansett hva som står i modellen.</p>
        <p>Legg også merke til at operatøren bak rammeavtalen sannsynligvis er den samme kunden som står
        for 34 prosent av omsetningen. Spør om det. Er det samme kunde, er det én risiko du har sett to
        ganger, ikke to uavhengige risikoer.</p>
        <p><b>Nå til det dette trinnet faktisk måler.</b> EY-Parthenon vurderer uttrykkelig om du svarer
        konstruktivt på motstand og ny informasjon. Det finnes to svake svar og ett sterkt.</p>
        <p><b>Svakt svar nummer én: å forsvare hypotesen.</b> «Rammeavtaler blir nesten alltid utløst.»
        «Vedlikehold er et teknisk spørsmål, ikke et kommersielt.» Du har da vist at ny informasjon ikke
        fester seg, og intervjueren slutter å gi deg noe å jobbe med.</p>
        <p><b>Svakt svar nummer to: å kaste hypotesen.</b> «Da er nok dette en dårlig deal.» Én
        opsjonsbasert kontrakt og ett vedlikeholdsetterslep velter ikke et selskap som har doblet
        et segment på to år og har en fjerdedel av et regelverksdrevet marked. Å snu helt på ett funn er
        like dårlig kalibrert som å ignorere det, og det leses som at du ikke hadde grunner for
        hypotesen i utgangspunktet.</p>
        <p><b>Sterkt svar: oppdater med begrunnelse, og si hva som nå må stemme.</b> Formen er å beholde
        det som fortsatt står, navngi den delen av beviset som falt bort, si hva som må bære
        konklusjonen i stedet, og gjøre resten om til etterprøvbare betingelser:</p>
        <blockquote><p>«Jeg holder på retningen, men flytter tyngdepunktet. Hypotesen var at P&amp;A-benet
          bærer prisen, og den står. Det jeg ikke lenger kan bruke som bevis, er ordreboken, for halvparten
          av den er en opsjon uten investeringsbeslutning. Beviset må nå være markedet og posisjonen:
          3 000 brønner skal plugges uansett hva oljen koster, det er rundt en milliard i året for
          leverandørene, og Nordvest har en fjerdedel av det. Prisen må ned uansett, fordi EBITDA
          normalisert for vedlikehold er 155 og ikke 180.</p>
          <p>Tre ting må stemme for at jeg fortsatt anbefaler kjøp. Ett: at operatøren på det feltet tar
          investeringsbeslutningen, eller at arbeidet uansett finnes hos en annen operatør. To: at den svake
          underliggende ordreinngangen i 2025 var et timingutslag og ikke en trend. Tre: at de 80
          millionene er et engangsbeløp og ikke starten på en flåte som må skiftes ut.»</p></blockquote>
        <p><b>Og si hva du vil ha.</b> Kvartalsvis ordreinngang tre år tilbake, fordi ett år er støy og
        to er en trend. Operatørens egen plan for feltet, helst fra et kundeintervju, som er nettopp det
        en CDD gjør. Historisk utløsningsgrad på opsjonsbaserte rammeavtaler i bransjen. En flåteliste
        med alder og gjenstående levetid per enhet. Det er fire konkrete forespørsler, og de gjør
        motstanden om til en arbeidsplan.</p>`,
      krav: [
        "Du regner på den nye informasjonen før du reagerer på den. Ordreboken uten rammeavtalen er 700 millioner, altså under ett års omsetning, og book-to-bill faller fra 1,28 til 0,50.",
        "Du normaliserer EBITDA for vedlikeholdsetterslepet og sier hva det gjør med prisen: 1 800 på 155 er 11,6 ganger, ikke ti.",
        "Du verken forsvarer eller forkaster hypotesen. Du oppdaterer den, og du sier eksplisitt hvilken del av beviset som falt bort og hva som må bære konklusjonen i stedet.",
        "Du formulerer to eller tre betingelser som må stemme, og de er etterprøvbare og ikke bare forbehold.",
        "Du sier hva du vil ha fra datarommet eller fra et kundeintervju for å avgjøre hvert punkt.",
        "Du overreagerer ikke. Ett år med svak underliggende ordreinngang er støy, og du ber om kvartalstall før du kaller det en trend.",
        "Du spør om operatøren bak rammeavtalen er den samme som står for 34 prosent av omsetningen.",
      ],
      felle: "Å si «det endrer ikke konklusjonen min». Det er nøyaktig det svaret partneren tester for, og det er det som feller kandidater i finalerunden. Et svar som ikke beveger seg i det hele tatt, scorer lavere enn et som beveger seg for mye, fordi det første tyder på at du ikke lytter mens det andre bare er dårlig kalibrert.",
    },
    {
      art: "regne",
      sek: 480,
      tittel: "Hva kan Calder forsvare å betale?",
      sp: `<p>Partneren vil ha et tall. <b>Hva er den høyeste prisen Calder kan forsvare, i millioner
        kroner?</b> Bruk dette:</p>
        <ul>
          <li>Normalisert EBITDA, altså etter vedlikeholdsjusteringen du nettopp gjorde.</li>
          <li>Sammenlignbare norske oljeserviceselskaper handles til <b>åtte ganger EBITDA</b>. Bruk den
            multippelen både på selskapet og på synergiene.</li>
          <li><b>Kostnadssynergier:</b> samlet administrasjon, salg og sertifisering i den nordiske
            virksomheten etter oppkjøpet blir <b>240 millioner kroner</b>. Overlappet er <b>30 prosent</b>,
            og av overlappet kan <b>25 prosent</b> tas ut.</li>
          <li><b>Inntektssynergier:</b> Calder selger i førti land og kan ta plugge-teknologien gjennom
            eget apparat. Brutto <b>200 millioner kroner</b> i ny omsetning innen år tre, med
            <b>30 prosent</b> marginal EBITDA-margin. Haircut velger du selv, og du skal si hvilken.</li>
          <li><b>Engangskostnad ved integrasjon:</b> regn den som ett års synergiverdi.</li>
          <li><b>Vedlikeholdsetterslepet</b> på 80 millioner må tas igjen etter closing.</li>
        </ul>
        <p class="tiny">Si formelen før du regner, og sammenlign svaret med prisforlangendet på 1 800.</p>`,
      svar: 1500,
      enhet: "millioner kroner",
      toleranse: 0.08,
      fasit: `<p>Si formelen først. Den er hele svaret på hvorfor en strategisk kjøper har et annet tak
        enn et fond:</p>
        <div class="formula">
          <div class="eq">Makspris = standalone-verdi + verdien av synergiene − integrasjonskostnad − etterslep</div>
        </div>
        <p>Så regner du, ledd for ledd:</p>
        <div class="formula">
          <div class="eq">Normalisert EBITDA: 180 − 25 = 155 mill. kr</div>
          <div class="eq">Standalone: 155 × 8 = 1 240 mill. kr</div>
          <div class="eq">Kostnadssynergi: 240 × 30 % × 25 % = 18 mill. kr i året</div>
          <div class="eq">Inntektssynergi brutto: 200 × 30 % = 60 mill. kr. Med 50 % haircut: 30 mill. kr</div>
          <div class="eq">Sum synergier: 18 + 30 = 48 mill. kr i året ⇒ verdi 48 × 8 = 384 mill. kr</div>
          <div class="eq">Integrasjon, ett års synergiverdi: 48 mill. kr</div>
          <div class="eq">Makspris = 1 240 + 384 − 48 − 80 = <b>1 496 mill. kr</b>, altså rundt 1 500</div>
        </div>
        <p><b>Om haircuten.</b> Inntektssynergier realiseres erfaringsmessig til rundt 40 til 50 prosent,
        så en haircut på 50 prosent er forsvarlig. Velger du 30 prosent i stedet, lander du på rundt
        1 580. Begge deler går an. Det som ikke går an, er å ta inntektssynergiene inn krone for krone
        uten å si noe om det.</p>
        <p><b>Så hva.</b> Gapet til prisforlangendet er rundt 300 millioner, altså 17 prosent.
        1 500 er 9,7 ganger normalisert EBITDA og 8,3 ganger rapportert; 1 800 er 11,6 ganger
        normalisert. For å forsvare 1 800 måtte de årlige synergiene opp mot 90 millioner, altså nesten
        det dobbelte av 48. Calder må i så fall tro at synergiene er dobbelt så store som regnestykket
        tilsier, og det er en påstand noen i organisasjonen må stå inne for.</p>
        <p><b>Strategen mot fondet, som er poenget med hele trinnet.</b> Et oppkjøpsfond har ingen
        synergier. Deres tak er standalone minus etterslepet:</p>
        <div class="formula">
          <div class="eq">Finansiell kjøper: 1 240 − 80 = 1 160 mill. kr</div>
          <div class="eq">Strategisk kjøper: 1 496 mill. kr</div>
          <div class="eq">Differansen: 336 mill. kr, altså rundt 29 prosent høyere tak</div>
        </div>
        <p>Det er nøyaktig derfor selgeren har invitert amerikanerne inn, og det er derfor norsk
        oljeserviceteknologi ender hos strategiske kjøpere og ikke hos fond. Men det er også advarselen:
        alt Calder betaler over 1 160, er betaling for synergier som ennå ikke finnes. Derfor hører de
        hjemme i en earn-out eller i en plan noen eier, ikke i åpningsbudet.</p>
        <p><b>Sensitivitet, som du bør gjøre uoppfordret.</b> Med sju ganger i stedet for åtte blir
        standalone 1 085 og synergiverdien 336, og taket faller til rundt 1 290. En multippel ned koster
        altså over 200 millioner. Det forteller deg hvor følsom hele saken er for hva markedet mener om
        oljeservice den dagen dere signerer.</p>`,
      krav: [
        "Du sier formelen før du regner, og du regner på normalisert EBITDA og ikke på rapportert.",
        "Du velger en haircut på inntektssynergiene og begrunner den. Å ta dem inn krone for krone er det klassiske feiltrinnet.",
        "Du verdsetter synergiene til en multippel og trekker fra engangskostnaden ved å hente dem ut.",
        "Du oversetter svaret til en multippel: rundt 1 500 er 9,7 ganger normalisert EBITDA, mot 11,6 ganger på prisforlangendet.",
        "Du regner ut hva et oppkjøpsfond kunne betalt, rundt 1 160, og sier at strategens tak ligger nær 30 prosent høyere og hvorfor.",
        "Du gjør minst én sensitivitet. Med sju ganger i stedet for åtte faller taket til rundt 1 290, og du sier tallet.",
        "Du sier hvor mye synergiene måtte vært for å forsvare 1 800, og at det er en påstand noen må stå inne for.",
      ],
      felle: "Å ta synergiene inn til full verdi og uten engangskostnad. Da får du 1 240 pluss 384, altså over 1 620, og du har akkurat argumentert for at Calder skal betale i dag for en integrasjon de ennå ikke har gjennomført. Det er slik industrielle kjøpere overbetaler, og det er nøyaktig det en kommersiell due diligence skal hindre.",
    },
    {
      art: "syntese",
      sek: 360,
      tittel: "Anbefalingen til investeringskomiteen",
      sp: `<p>Calders investeringskomité har <b>to minutter</b>. Direktøren for M&amp;A ser på klokken og
        spør: «Kjøper vi, og hva betaler vi?»</p>
        <p class="tiny">Skriv anbefalingen slik du ville sagt den, ikke som notater. Den skal ha en pris
        eller en betingelse i seg, og den skal skille hva selskapet er verdt for dere fra hva det er
        verdt frittstående.</p>`,
      fasit: `<p>Svaret først, med et tall i seg. Så de tre grunnene, så det du ikke tror på, så
        betingelsene, og til slutt den ene tingen som kan velte alt.</p>
        <blockquote><p><b>«Ja, kjøp. Men ikke til 1 800. Taket vårt er rundt 1 500 millioner kroner, og
          jeg ville åpnet på 1 350 med vedlikeholdsetterslepet trukket fra i prisen og verdien av
          rammeavtalen lagt i en earn-out.»</b></p>
          <p>Tre grunner. For det <b>første</b> kjøper dere ikke et oljeserviceselskap. Dere kjøper et
          plugge-selskap som fortsatt har et boreben hengende på seg. P&amp;A er 40 prosent av
          omsetningen og nesten 60 prosent av EBITDA, og den delen har gått fra 180 til 360 millioner på
          to år med stigende margin, mens boredelen faller nær 7 prosent i året med fallende margin.</p>
          <p>For det <b>andre</b> følger det markedet regelverk og brønnenes alder, ikke oljeprisen.
          3 000 brønner på norsk sokkel skal plugges uansett hva oljen koster. Det er rundt en milliard
          kroner i året for leverandørene, og Nordvest har en fjerdedel av det. At bransjen rundt krymper,
          er ikke et argument mot denne nisjen; det er grunnen til at nisjen finnes.</p>
          <p>For det <b>tredje</b> er selskapet verdt mer for dere enn for noen andre. Frittstående og
          justert for vedlikehold er det verdt rundt 1 160. Kanalen deres i førti land og kostnadsoverlappet
          i Norden legger rundt 340 millioner på toppen. Et oppkjøpsfond kan ikke matche det, og det er
          derfor dere er i denne prosessen.</p>
          <p>Derfor likevel ikke 1 800. Den prisen forutsetter to ting jeg ikke kan bekrefte: at
          rammeavtalen blir utløst, og at EBITDA er 180. Halvparten av ordreboken er en opsjon uten
          investeringsbeslutning, og uten den var ordreinngangen i fjor halvparten av omsetningen.
          Vedlikeholdet har ligget 25 millioner for lavt i tre år, så normalisert EBITDA er 155. På
          1 800 betaler dere 11,6 ganger, ikke ti.</p>
          <p>Betingelsene mine er tre. De 80 millionene i etterslep trekkes fra prisen, ikke fra planen.
          Verdien av rammeavtalen legges i en earn-out som utløses ved operatørens investeringsbeslutning.
          Og nøkkelpersonene på plugge-siden bindes, for det er dem teknologien sitter i.</p>
          <p>Det som kan velte dette, er om den svake underliggende ordreinngangen i fjor var en trend og
          ikke et timingutslag. Det er det første jeg tester: kvartalsvis ordreinngang tre år tilbake, og
          samtaler med de fire operatørene som står bak de løpende oppdragene.»</p></blockquote>
        <p><b>Legg merke til tre ting ved formen.</b> Anbefalingen har et tall i første setning, den
        skiller uttrykkelig mellom hva selskapet er verdt frittstående og hva det er verdt for denne
        kjøperen, og betingelsene er mekanikk en forhandler kan ta med til bordet: prisavslag, earn-out,
        binding av nøkkelpersoner. Forbehold er ikke betingelser. Et forbehold beskytter deg; en
        betingelse endrer avtalen.</p>`,
      krav: [
        "Anbefalingen har et tall i første setning. En CDD-syntese uten pris eller betingelse er ikke ferdig.",
        "Du skiller eksplisitt mellom hva selskapet er verdt frittstående og hva det er verdt for Calder, og du sier hvor forskjellen kommer fra.",
        "Du sier hva du ikke tror på, ikke bare hva du tror på. Både ordreboken og den rapporterte EBITDA-en er nedjustert, og du sier med hvor mye.",
        "Betingelsene dine er mekanikk en kjøper kan forhandle om: prisavslag, earn-out, binding av nøkkelpersoner.",
        "Du forklarer hvorfor en krympende bransje likevel kan romme en nisje det er riktig å kjøpe seg inn i.",
        "Du nevner den ene tingen som kan velte konklusjonen, og hva du ville gjort for å avgjøre den.",
        "Du holder deg innenfor to minutter og gjenforteller ikke casen kronologisk.",
      ],
      felle: "Å lande på «kjøp, men til riktig pris» uten å si hvilken. Det er en diagnose, og komiteen ville hatt en posisjon. Å si 1 500 og ta litt feil er bedre enn å si ingenting og ha formelt rett.",
    },
  ],
}
