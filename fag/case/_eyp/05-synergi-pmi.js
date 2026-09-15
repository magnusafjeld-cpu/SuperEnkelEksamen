/* Synergivurdering og integrasjon etter et gjennomført oppkjøp. Nordisk
   forsvars- og industriteknologi, som konsoliderer kraftig i 2025–2026.
   Casen tvinger fram skillet mellom kostnads- og inntektssynergier, kostnaden
   ved å hente dem, og det skarpeste poenget av alle: en synergi som allerede
   lå i budet, er ikke verdiskaping for kjøperen. */
{
  id: "eyp-synergi-pmi",
  label: "Forsvarsplattformen som har kjøpt",
  type: "M&A",
  nivå: "Middels",
  firma: "EY-Parthenon",
  stil: "candidate-led",
  minutter: 30,
  ch: [],
  blurb: "Handelen er gjennomført. Nå skal synergiene tallfestes, haircut-es og settes opp mot både engangskostnaden og premien som allerede er betalt til selgeren. Trener synergimekanikken hele veien, og den ubehagelige slutten på den.",
  prompt: `<p>Klienten er <b>Nordvakt Group</b>, en norsk plattform innen forsvarselektronikk og
    presisjonsmekanikk. Eierne er et nordisk oppkjøpsfond sammen med grunnleggerfamilien.
    Nordvakt omsetter for <b>2,4 milliarder kroner</b> med 14 prosent EBITDA-margin.</p>
    <p>For seks uker siden sluttførte de kjøpet av <b>Bergslagen Precision AB</b>, en svensk
    underleverandør av presisjonsmekanikk og kabling til forsvarsindustrien:
    <b>1,2 milliarder i omsetning</b> og 11 prosent EBITDA-margin. Prisen var
    <b>1 320 millioner kroner</b>. Handelen er gjennomført. Det finnes ingen vei tilbake.</p>
    <p>Styret har satt av 120 millioner kroner til integrasjonen, og vil ha svar på to ting før
    neste styremøte: <b>hvor ligger verdien i denne sammenslåingen, og hva må til for å hente den?</b></p>`,
  bakgrunn: `<p>Selskapene er oppdiktet, men rommet er ekte. Forsvar og industriteknologi er den
    varmeste norske transaksjonssektoren akkurat nå: 31 prosent av alle norske transaksjoner i
    andre kvartal 2026 lå i EYs kategori for avansert industri, mobilitet og forsvar, og EY
    beskriver selv forsvar som en sektor som har gått <i>fra nisje til nødvendighet</i>. Mønsteret
    er også ekte: en norsk plattform kjøper en svensk underleverandør for å ta kontroll over en
    kritisk del av verdikjeden.</p>
    <p>Casetypen er nøyaktig det EY-Parthenons Strategy and Execution-team selger etter at en
    commercial due diligence er levert. EYs egen beskrivelse av tjenesten nevner uttrykkelig
    integrasjonsstrategi, identifisering av synergier og verdiskapingsmuligheter, og en
    overordnet integrasjonsplan. Lederen for S&amp;E i Norge har «verdirealisering ved oppkjøp
    eller salg» som oppgitt hovedfokus.</p>
    <p>Grunnen til at casen er god trening, er at den ser ferdig ut. Handelen er gjort, prisen er
    betalt, og det virker som om jobben bare er å legge sammen to kostnadsbaser. Men et synergibeløp
    er ikke verdt noe før du har trukket fra hva det koster å hente det, og før du har spurt hvem
    som allerede har fått betalt for det.</p>`,
  trinn: [
    {
      art: "oppklaring",
      sek: 180,
      tittel: "Hva vil du vite før du begynner?",
      sp: `<p>Du har hørt prompten. Handelen er sluttført, og styret venter på deg.
        <b>Hvilke spørsmål stiller du før du strukturerer?</b></p>`,
      fasit: `<p>I en synergicase er de beste oppklarende spørsmålene de som avgjør <i>hva tallet skal
        måles mot</i>. Tre til fem er nok, og hvert av dem skal kunne flytte svaret.</p>
        <ul>
          <li><b>Hva lå av synergier i budet?</b> Dette er det viktigste spørsmålet i hele casen, og det
            er nesten ingen som stiller det. Betalte vi 1 320 fordi Bergslagen er verdt 1 320 alene, eller
            fordi vi allerede regnet inn synergiene i prisen? I det siste tilfellet har selgeren fått
            betalt for arbeidet vi ikke har gjort ennå.</li>
          <li><b>Hva er standalone-verdien, altså hva ville en finansiell kjøper betalt?</b> Uten den kan
            du ikke skille premie fra pris.</li>
          <li><b>Hvor mye tid har vi, og hva er styrets mål?</b> Run-rate om tre år er et annet mål enn
            EBITDA-effekt i neste årsrapport. Et fond med to år igjen av holdeperioden bryr seg om det siste.</li>
          <li><b>Hva er overlappet i kunder og i produkter?</b> Selger de til de samme kundene, eller er
            Bergslagen leverandør til Nordvakts konkurrenter? Svaret avgjør om kryssalg er en synergi
            eller en risiko.</li>
          <li><b>Hva begrenser oss juridisk?</b> Forsvarsindustri er regulert: eksportkontroll,
            sikkerhetsklarering og kundegodkjenning av produksjonssted. Noen synergier er ulovlige eller
            tar år, uansett hvor fine de ser ut i modellen.</li>
          <li><b>Hvordan er integrasjonen bemannet?</b> 120 millioner er et budsjett, ikke en plan.
            Hvem eier hvilken synergi?</li>
        </ul>
        <p>Det som skiller et sterkt svar fra et middels her, er ikke antallet spørsmål. Det er at du
        stiller minst ett spørsmål om <b>prisen</b>. En kandidat som bare spør om kostnadsbasen, har
        allerede bestemt seg for at oppgaven er et regnestykke.</p>`,
      krav: [
        "Du spør hva som allerede lå av synergier i budet. Det er spørsmålet som avgjør om arbeidet i det hele tatt skaper verdi for kjøperen.",
        "Du spør om tidshorisont og hva styret måles på, slik at du vet om run-rate eller år 1 er svaret.",
        "Du spør om kunde- og produktoverlapp, fordi det både er kilden til kryssalg og kilden til dissynergi.",
        "Du sier hvorfor du spør, og du bruker svarene senere i casen.",
        "Spørsmålene er få og valgt med hensikt, ikke en sjekkliste lest høyt.",
      ],
      felle: "Å spørre om alt som kan tenkes å påvirke integrasjonen, fra IT-systemer til kantineavtaler. Casen er tretti minutter. Spør om det som endrer tallet.",
    },
    {
      art: "struktur",
      sek: 210,
      tittel: "Strukturer verdispørsmålet",
      sp: `<p>Bryt ned hvor verdien i denne sammenslåingen kan ligge, og hva som avgjør om den faktisk
        blir hentet. Skriv nedbrytningen slik du ville tegnet den på arket, og <b>avslutt med hvor du vil
        lete først</b>.</p>`,
      fasit: `<p>Start med identiteten, ikke med et rammeverk. Verdien av en sammenslåing er ikke
        «synergier». Den er dette:</p>
        <div class="formula">
          <div class="eq">Verdi for kjøper = (kostnadssynergier + inntektssynergier − dissynergier) × realiseringsgrad × multippel − engangskostnader − premie betalt til selger</div>
          <div class="where">Hvert ledd i den linjen er et sted casen kan velte. De fleste kandidater
            regner bare det første.</div>
        </div>
        <p>Grenene, i den rekkefølgen de bør angripes:</p>
        <ul>
          <li><b>Kostnadssynergier.</b> Hvor er de to kostnadsbasene overlappende? Konsernfunksjoner,
            innkjøpsvolum, produksjonsanlegg, IT. Den generiske formen er
            <i>samlet kostnadsbase × overlappsandel × reduksjonsdybde</i>. Disse er sikrest og kommer raskest.</li>
          <li><b>Inntektssynergier.</b> Kryssalg, felles anbud, kanaltilgang, samlet tilbud. Større på
            papiret, mer usikre i praksis, og de kommer senere.</li>
          <li><b>Dissynergier.</b> Kunder som ikke vil ha én leverandør på to ledd i kjeden, nøkkelpersoner
            som slutter, kunder hos den oppkjøpte som nå kjøper av en konkurrent. Disse trekkes fra, de
            legges ikke til.</li>
          <li><b>Kostnaden ved å hente dem.</b> Sluttpakker, IT- og ERP-integrasjon, rekvalifisering av
            produksjonssteder hos forsvarskunder, rebranding, retention-bonuser. Tommelfingerregelen er
            ett til to års synergiverdi.</li>
          <li><b>Gjennomførbarhet og tid.</b> Hvem eier hver synergi, når slår den inn, og hva skiller
            <i>run-rate</i> fra det som faktisk realiseres i år 1?</li>
          <li><b>Målestokken.</b> Hva av dette lå allerede i prisen? Det er mot premien, ikke mot null,
            verdiskapingen skal måles.</li>
        </ul>
        <p><b>Hvor jeg vil lete først:</b> kostnadssynergiene, fordi de er de eneste vi kan tallfeste
        forsvarlig på seks uker, og fordi de er de eneste styret kan holde noen ansvarlig for.</p>`,
      krav: [
        "Nedbrytningen skiller kostnadssynergier fra inntektssynergier som to separate grener, ikke som én pott.",
        "Dissynergier står i strukturen som et eget ledd med minustegn, ikke som en fotnote.",
        "Engangskostnaden ved å hente synergiene er med i strukturen, ikke bare synergibeløpet.",
        "Du skiller run-rate fra det som realiseres i år 1, og sier at det er to forskjellige tall.",
        "Du sier hvor du vil begynne, og hvorfor, i stedet for å la treet ligge flatt.",
        "Grenene overlapper ikke, og til sammen forklarer de verdien av transaksjonen.",
      ],
      felle: "Å strukturere casen som «kostnader, inntekter, risiko» uten å nevne at noe av verdien allerede kan være betalt bort i prisen. Da regner du et tall som er riktig og et svar som er feil.",
    },
    {
      art: "ide",
      sek: 270,
      tittel: "Hvor kan synergiene ligge?",
      sp: `<p>Du har ennå ikke sett tall på kostnadsbasene. <b>List så mange steder du klarer der de to
        selskapene kan være verdt mer sammen enn hver for seg.</b> Én per linje.</p>
        <p class="tiny">Si oppdelingen din høyt før du begynner å liste. Den teller mer enn antallet.</p>`,
      liste: [
        "Slå sammen konsernfunksjonene: én finans-, HR- og IT-avdeling i stedet for to",
        "Fjerne dublerte lederlag, styrehonorarer og kostnader ved å drive to selvstendige selskaper",
        "Felles innkjøp av materialer og komponenter: samlet volum gir bedre pris hos leverandører begge allerede bruker",
        "Ett ERP og én IT-plattform i stedet for to lisensparker og to driftsavtaler",
        "Insource maskinering og overflatebehandling som Nordvakt i dag kjøper eksternt, inn i Bergslagens egen kapasitet",
        "Samle produksjonen på færre anlegg der volumet og kundegodkjenningene tillater det",
        "Kryssalg: Bergslagens komponenter inn i Nordvakts egne programmer i stedet for tredjeparts",
        "Felles anbud på større nordiske programmer som ingen av dem var store nok til å by på alene",
        "Bruke Bergslagens svenske kundetilgang og leverandørgodkjenninger som kanal for Nordvakts systemer",
        "Samle FoU så to team ikke løser samme problem, og gjenbruke komponentplattformer på tvers",
        "Felles kapasitetsstyring: flytte ordrer mellom anleggene så toppene jevnes ut og overtid faller",
        "Redusere arbeidskapital: felles lager av fellesdeler, og bedre betalingsbetingelser på samlet volum",
        "Samle sertifisering, kvalitet og eksportkontroll der regelverket i det hele tatt tillater det",
        "Forhandle bedre finansieringsvilkår og forsikringspremier på en større samlet balanse",
      ],
      fasit: `<p>Oppdelingen som fungerer, er <b>kostnad, inntekt, kapital</b>. De fleste kandidater kommer
        på de første to. Den tredje, altså arbeidskapital og finansieringsvilkår, er den som viser at du
        leser en balanse og ikke bare en resultatregnskapslinje.</p>
        <p>Innenfor kostnad er den nyttige rekkefølgen etter hvor sikkert beløpet er:
        <i>konsernfunksjoner</i> (sikrest, én organisasjon kan bare ha én økonomisjef),
        <i>innkjøp</i> (sikkert nok, prisen er forhandlingsbar), <i>anlegg og produksjon</i> (tregest,
        og i forsvar bremset av at kunden må godkjenne produksjonsstedet på nytt).</p>
        <p><b>Det som skiller et sterkt svar:</b> å si at listen ikke er likeverdig. Tre til fire av
        punktene er verdt nesten hele beløpet, og resten er støy. Avslutt med å peke på hvilke du ville
        tallfestet først, og be om kostnadsbasene for å gjøre det.</p>`,
      krav: [
        "Du sier oppdelingen din før du lister, i stedet for å levere en usortert strøm.",
        "Listen dekker både kostnadssiden og inntektssiden, ikke bare kostnadskutt.",
        "Minst ett punkt handler om balansen: arbeidskapital, lager eller finansieringsvilkår.",
        "Minst ett punkt er spesifikt for denne bransjen, for eksempel at Nordvakt kjøper eksternt det Bergslagen gjør selv.",
        "Du prioriterer til slutt og sier hvilke tre eller fire som er verdt å tallfeste.",
        "Du ber om dataene du trenger for å gå fra liste til tall.",
      ],
      felle: "Å liste tolv ideer uten å skille dem etter hvor sikre de er. En synergiliste uten rangering etter sikkerhet er bare en ønskeliste, og intervjueren leser den som det.",
    },
    {
      art: "exhibit",
      sek: 330,
      tittel: "De to kostnadsbasene",
      sp: `<p>Intervjueren legger fram kostnadsbasene for begge selskapene, siste tolv måneder, i
        millioner kroner. <b>Hva ser du, og hva betyr det for hvor synergiene faktisk ligger?</b></p>`,
      figur: `<table class="data">
          <tr><th>Millioner kroner (LTM)</th><th class="n">Nordvakt</th><th class="n">Bergslagen</th><th class="n">Sum</th></tr>
          <tr><td>Omsetning</td><td class="n">2 400</td><td class="n">1 200</td><td class="n">3 600</td></tr>
          <tr><td>Materialer og komponenter</td><td class="n">860</td><td class="n">390</td><td class="n">1 250</td></tr>
          <tr><td>Innkjøpt maskinering og overflatebehandling</td><td class="n">240</td><td class="n">24</td><td class="n">264</td></tr>
          <tr><td>Egen produksjon: lønn og fabrikkdrift</td><td class="n">456</td><td class="n">438</td><td class="n">894</td></tr>
          <tr><td>FoU og produktutvikling</td><td class="n">188</td><td class="n">60</td><td class="n">248</td></tr>
          <tr><td>Salg, anbud og programledelse</td><td class="n">168</td><td class="n">84</td><td class="n">252</td></tr>
          <tr><td>Administrasjon og konsernfunksjoner</td><td class="n">112</td><td class="n">48</td><td class="n">160</td></tr>
          <tr><td>Sikkerhet, kvalitet og eksportkontroll</td><td class="n">40</td><td class="n">24</td><td class="n">64</td></tr>
          <tr><td><b>Sum kostnader</b></td><td class="n"><b>2 064</b></td><td class="n"><b>1 068</b></td><td class="n"><b>3 132</b></td></tr>
          <tr><td><b>EBITDA</b></td><td class="n"><b>336</b></td><td class="n"><b>132</b></td><td class="n"><b>468</b></td></tr>
          <tr><td>EBITDA-margin</td><td class="n">14 %</td><td class="n">11 %</td><td class="n">13 %</td></tr>
        </table>
        <p class="tiny"><b>Fotnoter fra datarommet</b></p>
        <ul class="tiny">
          <li>Nordvakts innkjøpte maskinering kjøpes fra fjorten eksterne verksteder i Norge og Polen.</li>
          <li>Bergslagens maskinpark går på 62 prosent av tilgjengelig skifttid.</li>
          <li>Begge selskapene har egen finans-, HR- og IT-funksjon, og hvert sitt ERP.</li>
          <li>Rundt 40 prosent av materialkjøpet ligger i kategorier begge kjøper: elektronikk, kabling og metaller.</li>
          <li>Ingen overlappende produktprogrammer i FoU. Bergslagen leverer komponenter, Nordvakt leverer systemer.</li>
          <li>Sikkerhetsorganisasjon og eksportkontroll må være nasjonalt adskilt. Norsk og svensk regelverk krever hver sin.</li>
          <li>180 millioner av Bergslagens omsetning ligger hos tre kunder som konkurrerer direkte med Nordvakt.</li>
        </ul>`,
      fasit: `<p>Overskriften først, så beviset. Det figuren viser, er at <b>overlappet ikke ligger der man
        skulle tro</b>.</p>
        <p><i>«Den store kostnaden i begge selskapene er produksjon, men det er ikke der synergien er. Den
        er tre andre steder, og det største av dem ser ikke ut som en synergi i det hele tatt.»</i></p>
        <ul>
          <li><b>Produksjonen overlapper nesten ikke.</b> 894 millioner i samlet produksjonskostnad, men de
            lager forskjellige ting. Nordvakt bygger systemer, Bergslagen lager komponenter. Å legge ned et
            anlegg er ikke tilgjengelig her, og i forsvar må kunden godkjenne produksjonsstedet på nytt hvis
            du flytter en linje. Dette er grenen du <i>utelukker høyt</i>.</li>
          <li><b>Administrasjonen overlapper nesten helt.</b> 160 millioner samlet, to av alt. Lite beløp,
            høy overlapp, rask gjennomføring.</li>
          <li><b>Det ikke-opplagte funnet:</b> Nordvakt kjøper maskinering for <b>240 millioner</b> fra
            fjorten eksterne verksteder, mens Bergslagen har en maskinpark som står stille 38 prosent av
            tiden. Nordvakt outsourcer nøyaktig det Bergslagen gjør selv. Dette er ikke et kutt i en
            overlappende funksjon, det er en flytting av kjøp fra tredjepart til eget hus, og det er den
            klart største enkeltsynergien i casen.</li>
          <li><b>Innkjøp:</b> 1 250 millioner i samlet materialspend, 40 prosent i felles kategorier. Volum
            gir pris.</li>
          <li><b>Det som ser ut som en synergi, men ikke er det:</b> sikkerhet og eksportkontroll, 64
            millioner. Regelverket krever nasjonalt adskilte organisasjoner. Den grenen er stengt.</li>
          <li><b>Det som er en dissynergi:</b> 180 millioner av Bergslagens omsetning ligger hos Nordvakts
            konkurrenter. De kundene kjøper nå av en eier de konkurrerer med.</li>
        </ul>
        <p><b>Skillet mellom sterkt og middels:</b> et middels svar rangerer kostnadspostene etter
        størrelse og foreslår kutt i den største. Et sterkt svar rangerer dem etter <i>overlapp</i>, ikke
        etter beløp, og ser at den femte linjen i tabellen er et innkjøp som kan bli en internleveranse.</p>`,
      krav: [
        "Du sier konklusjonen først i stedet for å lese tabellen rad for rad.",
        "Du rangerer kostnadspostene etter overlapp, ikke etter størrelse.",
        "Du utelukker produksjon høyt og sier hvorfor: de lager forskjellige ting, og kunden må godkjenne produksjonsstedet på nytt.",
        "Du finner koblingen mellom Nordvakts innkjøpte maskinering og Bergslagens ledige kapasitet.",
        "Du leser fotnotene, og ser at sikkerhetsfunksjonen er stengt for synergi og at kundeoverlappet er en risiko, ikke en gevinst.",
        "Du sier hva du vil regne, før du begynner å regne.",
      ],
      felle: "Å gå rett på administrasjonen fordi den er det klassiske synergistedet. Den er riktig, men den er bare 160 millioner brutto. Kandidaten som stopper der, mister den største synergien i casen.",
    },
    {
      art: "regne",
      sek: 480,
      tittel: "Hva er synergiene verdt?",
      sp: `<p>Du har bedt om antakelsene, og du får disse. Tre kostnadssynergier, én inntektssynergi:</p>
        <ul>
          <li><b>Maskinering:</b> halvparten av Nordvakts eksterne kjøp på 240 kan kvalifiseres inn på
            Bergslagens anlegg. Besparelsen er 30 prosent av det som flyttes.</li>
          <li><b>Innkjøp:</b> 40 prosent av det samlede materialkjøpet på 1 250 ligger i felles kategorier.
            Samlet volum gir 4 prosent lavere pris på den delen.</li>
          <li><b>Administrasjon:</b> 50 prosent av den samlede kostnaden på 160 er overlappende, og av den
            delen kan 40 prosent tas ut.</li>
          <li><b>Inntektssynergier:</b> ledelsen har regnet 60 millioner i årlig EBITDA-effekt fra kryssalg
            og felles anbud.</li>
        </ul>
        <p>Bruk <b>25 prosent haircut på kostnadssynergiene og 60 prosent på inntektssynergiene</b>.</p>
        <p><b>Hva er netto synergi på run-rate, i millioner kroner i året?</b></p>
        <p class="tiny">Regn det på papir, og si framgangsmåten høyt før du sier tallet. Si også hvorfor
        haircutene er forskjellige.</p>`,
      svar: 90,
      enhet: "millioner kroner i året",
      toleranse: 0.05,
      fasit: `<p>Formen på hver kostnadssynergi er den samme:
        <i>kostnadsbase × overlappsandel × reduksjonsdybde</i>.</p>
        <div class="formula">
          <div class="eq">Maskinering: 240 × 50 % × 30 % = <b>36</b></div>
          <div class="eq">Innkjøp: 1 250 × 40 % × 4 % = <b>20</b></div>
          <div class="eq">Administrasjon: 160 × 50 % × 40 % = <b>32</b></div>
          <div class="eq">Brutto kostnadssynergier = <b>88</b></div>
          <div class="eq">Etter 25 % haircut: 88 × 0,75 = <b>66</b></div>
          <div class="eq">Inntektssynergier etter 60 % haircut: 60 × 0,40 = <b>24</b></div>
          <div class="eq">Netto synergi på run-rate = 66 + 24 = <b>90 millioner kroner i året</b></div>
        </div>
        <p><b>Sanity-sjekk før du går videre.</b> 88 millioner brutto er 2,8 prosent av en samlet
        kostnadsbase på 3 132. Det er innenfor det som er vanlig i en industriell sammenslåing. De 90
        netto er derimot 19 prosent av samlet EBITDA på 468, og det er høyt. Grunnen til at det likevel
        holder, er at den største posten ikke er et nedbemanningskutt, men en flytting av et innkjøp på
        240 millioner fra tredjepart til eget anlegg som allerede står ledig. Si dette høyt. Et tall som
        blir sanity-sjekket, leses som et estimat. Et tall som ikke blir det, leses som en gjetning.</p>
        <p><b>Hvorfor haircutene er forskjellige, og dette er kjernen i hele casen:</b></p>
        <ul>
          <li><b>Kostnadssynergier er under din egen kontroll.</b> Du bestemmer selv om to
            økonomiavdelinger blir til én, og du kan telle stillingene. De kommer raskt, og
            prep-litteraturen setter realiseringsgraden rundt 70 prosent.</li>
          <li><b>Inntektssynergier krever at noen andre sier ja.</b> En kunde må velge å kjøpe mer, og en
            konkurrent kan senke prisen for å hindre det. De kommer sent, og de realiseres typisk til
            40–50 prosent. Å haircut-e dem hardere er ikke pessimisme, det er den observerte fordelingen.</li>
          <li>Merk konsekvensen av regnestykket: ledelsen hadde <b>148 millioner brutto</b>, der
            inntektssynergiene var 41 prosent av potten. Etter haircut er de bare <b>27 prosent</b> av de
            90. Den asymmetriske haircut-en flyttet altså tyngdepunktet i casen fra inntekt til kostnad,
            og det er der styret bør bruke tiden sin.</li>
        </ul>
        <p><b>Run-rate er ikke år 1.</b> 90 millioner er nivået når integrasjonen er ferdig, typisk etter
        atten til tjuefire måneder. En realistisk realiseringsprofil er 40 prosent i år 1, altså rundt
        <b>36 millioner</b>. Samtidig påløper hele engangskostnaden på 120. <b>År 1 er negativt med rundt
        84 millioner.</b> Det bør styret høre fra deg og ikke oppdage selv.</p>
        <p><b>Er engangskostnaden troverdig?</b> 120 delt på 90 er 1,33 års synergiverdi, midt i
        tommelfingerregelen på ett til to år. Budsjettet holder. Postene er sluttpakker i de
        overlappende funksjonene, sammenslåing av to ERP-er, rekvalifisering av maskineringen hos
        forsvarskundene, og retention-bonuser til nøkkelpersonell hos Bergslagen.</p>
        <p><b>Hva er det verdt?</b> Kapitalisert på multippelen de faktisk betalte:</p>
        <div class="formula">
          <div class="eq">90 × 10 = 900 millioner i synergiverdi</div>
          <div class="eq">− 120 i engangskostnader</div>
          <div class="eq">= <b>780 millioner</b> i skapt verdi</div>
          <div class="where">Og så det spørsmålet som avgjør casen: hvor mye av de 780 sitter Nordvakt
            faktisk igjen med?</div>
        </div>`,
      krav: [
        "Du bruker samme form på hver kostnadssynergi: base ganger overlapp ganger dybde, og sier den høyt.",
        "Du haircut-er inntektssynergiene hardere enn kostnadssynergiene, og begrunner asymmetrien med at kostnadssynergier er under egen kontroll mens inntektssynergier krever at en kunde sier ja.",
        "Du sanity-sjekker beløpet mot samlet kostnadsbase og samlet EBITDA, ikke bare mot seg selv.",
        "Du skiller run-rate fra realisert i år 1, og sier at år 1 er negativt når engangskostnaden tas med.",
        "Du sjekker engangskostnaden mot tommelfingerregelen på ett til to års synergiverdi i stedet for å ta budsjettet for gitt.",
        "Du kapitaliserer synergien på en multippel for å få et verditall, og oppgir enhet hver gang.",
      ],
      felle: "Å oppgi 148 millioner i brutto synergier og stoppe der. Bruttotallet er det selgeren viste fram i prosessen. Jobben din er nettotallet, og forskjellen mellom de to er hele grunnen til at noen har hyret dere.",
    },
    {
      art: "syntese",
      sek: 270,
      tittel: "Anbefalingen",
      sp: `<p>Du skal oppsummere for styret. Rett før du begynner, kommer to ting inn:</p>
        <ul>
          <li>Finansdirektøren nevner at <b>sammenlignbare underleverandører i samme størrelse omsettes
            til 7–8 ganger EBITDA</b>. Nordvakt betalte 1 320 for 132 i EBITDA.</li>
          <li>Et styremedlem avbryter: <b>«Tre av Bergslagens kunder konkurrerer direkte med oss, og de
            står for 180 millioner i omsetning. Selgeren forsikret oss om at de blir. Endrer det svaret
            ditt?»</b></li>
        </ul>
        <p><b>Gi anbefalingen din.</b> Du har ett minutt.</p>
        <p class="tiny">Skriv den slik du ville sagt den, ikke som notater. Svar på innvendingen underveis,
        ikke etterpå.</p>`,
      fasit: `<p>Først det regnestykket den nye opplysningen utløser. 7,5 ganger 132 er <b>990</b>. De
        betalte 1 320. <b>Premien er 330 millioner</b>, og den premien er betalt for synergier ingen har
        hentet ennå.</p>
        <div class="formula">
          <div class="eq">Synergiverdi 900 − engangskostnad 120 = 780</div>
          <div class="eq">− premie allerede betalt til selger 330</div>
          <div class="eq">= <b>450 millioner i verdiskaping for Nordvakt</b></div>
          <div class="where">Break-even: (330 + 120) ÷ 10 = 45 millioner i run-rate. Halvparten av
            synergiene er allerede brukt opp på prisen før integrasjonen har begynt.</div>
        </div>
        <p>Og innvendingen, som er ekte: 180 millioner i omsetning hos konkurrenter, på 11 prosents
        margin, er rundt <b>20 millioner</b> i EBITDA. Det er en dissynergi, ikke en inntektssynergi.
        Regn nedsiden høyt:</p>
        <ul>
          <li>Kostnadssynergiene alene, uten noe på inntektssiden: 66 × 10 − 120 − 330 = <b>+210</b>.
            Fortsatt positivt.</li>
          <li>Kostnadssynergiene alene, <i>og</i> vi mister de tre kundene: (66 − 20) × 10 − 120 − 330 =
            <b>+10</b>. Da er handelen i praksis verdinøytral.</li>
        </ul>
        <p>Svaret på styremedlemmets spørsmål er derfor <b>ja, det endrer svaret, men ikke anbefalingen</b>.
        Det flytter transaksjonen fra behagelig til stram, og det gjør de tre kundene til den viktigste
        enkeltoppgaven i integrasjonen. Merk også at «selgeren forsikret oss» ikke er data. Det er en
        påstand fra motparten, avgitt før pengene skiftet hender.</p>
        <blockquote><p><b>«Verdien i denne handelen er 450 millioner, ikke 900. Den ligger i
        kostnadssynergier, ikke i kryssalg, og halvparten av den er allerede betalt bort til selgeren.»</b></p>
        <p>Tre grunner. For det første: netto run-rate er 90 millioner i året, ikke de 148 som lå i
        forretningsplanen. 66 av dem er kostnad, 24 er inntekt, fordi inntektssynergier krever at en kunde
        sier ja og kostnadssynergier bare krever at vi bestemmer oss.</p>
        <p>For det andre: den største enkeltsynergien er ikke et kutt. Dere kjøper maskinering for 240
        millioner fra fjorten eksterne verksteder, og dere eier nå et anlegg som står stille 38 prosent av
        tiden. Det er 36 millioner i året, og det er den ene tingen som må prioriteres i integrasjonsplanen.</p>
        <p>For det tredje, og det er det ubehagelige: dere betalte 10 ganger EBITDA for et selskap
        sammenlignbare handler priser til 7–8. De 330 millionene i premie er synergier dere har lovet bort
        på forhånd. Dere må hente 45 millioner i run-rate bare for å komme i null. Det er halvparten av det
        vi nettopp regnet.</p>
        <p>Om de tre kundene: 20 millioner i EBITDA står i spill. Mister vi dem og inntektssynergiene
        uteblir, er handelen verdinøytral. Derfor gjør jeg dette til første punkt på integrasjonsplanen,
        ikke til en fotnote.</p>
        <p>Konkret ville jeg gjort tre ting de neste nitti dagene. Én: sette en navngitt eier på hver av de
        tre kostnadssynergiene, med beløp og dato, og rapportere dem månedlig mot run-rate. To: starte
        rekvalifiseringen av maskineringen hos forsvarskundene nå, fordi det er godkjenningstiden og ikke
        beslutningen som er flaskehalsen. Tre: la de tre konkurrentkundene beholde en avtale om
        informasjonsvegg og separat kontaktpunkt, i stedet for å integrere dem inn i Nordvakts salgsapparat.</p>
        <p>Og advar styret om at år 1 blir negativt med rundt 84 millioner. Det er ikke et tegn på at
        integrasjonen feiler. Det er et tegn på at dere betaler for den.»</p></blockquote>
        <p><b>Det som skiller distinkt fra solid her</b> er én setning: <i>en synergi som lå i budet, er
        ikke verdiskaping for kjøperen</i>. Den tilfalt selgeren i det øyeblikket prisen ble avtalt. De
        aller fleste kandidater regner 900 og stopper. Kandidaten som trekker fra premien, har forstått hva
        transaksjonsrådgivning faktisk er.</p>`,
      krav: [
        "Svaret kommer i første setning, med et tall i seg, og tallet er nettoverdien og ikke bruttosynergien.",
        "Du sier uttrykkelig at synergiene som lå i budet, tilfalt selgeren og ikke kjøperen.",
        "Du regner premien fra den nye multippelopplysningen i stedet for å notere den og gå videre.",
        "Du svarer konstruktivt på styremedlemmets innvending: du tallfester dissynergien, sier at den endrer regnestykket, og sier hva du gjør med den.",
        "Du sier at selgerens forsikring om kundene er en påstand fra motparten, ikke data.",
        "Du gir minst én sensitivitet, for eksempel hva verdien blir hvis inntektssynergiene uteblir helt.",
        "Du sier hva klienten skal gjøre de neste nitti dagene, med eier og frist, ikke bare hva som er galt.",
        "Du advarer om at år 1 blir negativt, før styret oppdager det selv.",
      ],
      felle: "Å forsvare seg mot innvendingen i stedet for å regne på den. Styremedlemmet har gitt deg et tall du kan bruke: 180 millioner i omsetning på 11 prosents margin er 20 millioner i EBITDA. En kandidat som svarer «det er en god risiko å følge med på», har fått data og levert en følelse.",
    },
  ],
}
