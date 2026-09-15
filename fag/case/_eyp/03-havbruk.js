/* Markedsattraktivitet og CDD på en leverandør til norsk havbruk.

   Poenget casen skal tvinge fram: leverandørens skjebne henger på
   oppdretternes investeringssyklus, ikke på laksepris direkte. Volumtaket
   settes av antall konsesjoner, ikke av etterspørselen etter laks. Og
   inntjeningen ligger et annet sted enn omsetningen. */
{
  id: "eyp-havbruk-leverandor",
  label: "Leverandøren til lakseoppdretterne",
  type: "PE-vurdering",
  nivå: "Middels",
  firma: "EY-Parthenon",
  stil: "candidate-led",
  minutter: 30,
  ch: [],
  blurb: "Et fond vil kjøpe en utstyrsleverandør til norsk havbruk til ni ganger EBITDA. Markedet ser voksende ut. Trener markedsestimat på en installert base, avkoding av en veksthistorie, og en anbefaling som har en pris i seg.",
  prompt: `<p>Klienten er <b>Nordvik Kapital</b>, et norsk oppkjøpsfond med industrifokus og fire til fem
    års holdeperiode. De har signert en intensjonsavtale om å kjøpe <b>Fjordtek AS</b> i Ørsta på Sunnmøre,
    og har bedt dere om en kommersiell due diligence.</p>
    <p>Fjordtek bygger <b>fôrflåter og fôringssystemer</b> til norsk havbruk. Fôrflåten er den flytende
    enheten som ligger ved hvert oppdrettsanlegg, lagrer fôret og blåser det ut i merdene. Selskapet
    selger også service, reservedeler og oppgraderinger på flåter som allerede står i sjøen. All
    omsetning er norsk. Familien som eier selskapet er i andre generasjon og vil selge.</p>
    <p>Omsetningen var <b>645 millioner kroner</b> i 2025, med <b>58 millioner i EBITDA</b>.
    Prisforventningen er <b>520 millioner kroner</b>.</p>
    <p><b>Bør Nordvik kjøpe Fjordtek til den prisen?</b></p>`,
  bakgrunn: `<p>Selskapet er konstruert, men rammen er ikke det. EY-Parthenon Norge gir ut sin egen
    årlige <i>Norwegian Aquaculture Analysis</i> og har egen havbrukspartner i Bergen, så sjømat er en
    av de settingene der huset faktisk har noe å vise fram. Norsk havbruk hadde 131 milliarder kroner i
    eksportverdi i 2024 og en produksjonskostnad på 63 kroner per kilo, begge fra den rapporten.</p>
    <p>En leverandørcase er vanskeligere enn en oppdretterscase, og det er meningen. Når kunden din er
    fem børsnoterte konsern, ligger forhandlingsmakten ikke hos deg. Når kundens produksjonsvolum er
    regulert av konsesjoner og maksimalt tillatt biomasse, har volumveksten din et tak satt av
    Nærings- og fiskeridepartementet. Og når kunden kjøper utstyr, kjøper hun det i rykk og napp etter
    hvor god fjoråret var, ikke jevnt.</p>
    <p>Den koblingen er hele casen: <b>laksepris driver ikke leverandørens omsetning direkte, den driver
    oppdretternes investeringslyst med et etterslep på et år eller halvannet.</b> Kandidater som ser
    laksepris i prompten og begynner å snakke om lakseprisen, svarer på feil case.</p>`,
  trinn: [
    {
      art: "oppklaring",
      sek: 180,
      tittel: "Hva må du vite før du begynner?",
      sp: `<p>Du har hørt prompten, og du har ingenting annet enn tre tall og en bransje.
        <b>Hvilke spørsmål stiller du, og hvorfor akkurat de?</b></p>
        <p class="tiny">To til fire spørsmål. Si hva svaret vil endre.</p>`,
      fasit: `<p>I en CDD er oppklaringen ikke høflighet. Den er første arbeidsstrøm. Du spør om det
        <b>en ekte due diligence ville hentet inn i uke én</b>, og du sier hva du skal bruke det til.
        Fire spørsmål bærer resten av casen:</p>
        <ul>
          <li><b>Hva er investeringstesen?</b> Kjøper Nordvik en stabil kontantstrøm, eller en
            vekstplattform? Fondet har fire til fem års holdeperiode, så alt som betaler seg i år sju er
            irrelevant. Hvis tesen er «doble omsetningen», er det den planen du skal teste, ikke selskapet
            som sådan.</li>
          <li><b>Hvordan fordeler omsetningen seg på nysalg og ettermarked, og hva er marginen på hver?</b>
            Et verft og et servicehus er to vidt forskjellige selskaper med samme regnskap. Dette er det
            spørsmålet som flytter mest i denne casen.</li>
          <li><b>Hvem er kundene, og hvor mye av omsetningen ligger hos de tre største?</b> Norsk havbruk
            har få og store kjøpere. Over 25 prosent hos én kunde regnes som et rødt flagg i en due
            diligence, og her bør du be om tallet uoppfordret.</li>
          <li><b>Er 58 millioner i EBITDA et normalt år?</b> Selger presenterer alltid det beste
            tolvmånedersvinduet. Be om fire til fem år, ikke ett, i en bransje du vet er syklisk.</li>
        </ul>
        <p>Spørsmål som er greie, men mindre verdt her: antall ansatte, eierstruktur, gjeldsnivå. De er
        finansielle og kommer uansett fra revisjonssiden av transaksjonen.</p>
        <p><b>Det som skiller:</b> å spørre om noe fordi du allerede har en hypotese. «Jeg spør om
        kundekonsentrasjonen fordi det er fem store oppdrettskonsern i Norge, og hvis tre av dem er
        mesteparten av omsetningen, er prisingsmakten hos kunden, ikke hos selskapet.»</p>`,
      krav: [
        "Du spør om investeringstesen, ikke bare om selskapet. En CDD tester en plan, ikke en bedrift.",
        "Minst ett spørsmål handler om splitten mellom nysalg og ettermarked.",
        "Du tar opp kundekonsentrasjon uoppfordret, fordi du vet at norsk havbruk har få store kjøpere.",
        "Du spør om flere år med tall, ikke bare det siste, fordi bransjen er syklisk.",
        "Hvert spørsmål kommer med hva svaret vil endre i analysen din.",
        "Du holder deg til to til fire spørsmål og går videre.",
      ],
      felle: "Å spørre om lakseprisen som om den var selskapets inntektsdriver. Selskapet selger ikke laks. Lakseprisen betyr noe her, men den virker gjennom oppdretternes investeringsbudsjetter, med etterslep, og det er en helt annen mekanisme enn en råvarepris som slår rett inn i topplinjen.",
    },
    {
      art: "struktur",
      sek: 300,
      tittel: "Strukturer vurderingen",
      sp: `<p>Nordvik vil vite om de skal betale 520 millioner. <b>Skriv nedbrytningen du ville tegnet på
        arket</b>, og avslutt med hvor du vil lete først og hvorfor.</p>`,
      fasit: `<p>Grunnspørsmålet i en CDD er ikke «er dette et bra selskap». Det er <b>holder planen vi
        betaler for</b>. Et godt selskap til feil pris er fortsatt en dårlig avtale. Den rekkefølgen som
        følger av det, og som EY-Parthenon selv bruker, har fire ledd:</p>
        <ol>
          <li><b>Markedet.</b> Hvor stort er det norske markedet for fôrflåter, og hva driver det? Her er
            det strukturelle poenget at markedet ikke er «etterspørsel etter laks», men
            <i>utskiftingstakten på en installert base</i>. Det står et gitt antall flåter i sjøen, de
            har en levetid, og markedet er strømmen av utskiftinger pluss servicen på basen.</li>
          <li><b>Konkurranseposisjon.</b> Hvor stor andel har Fjordtek, og holder den? Hva kjøper
            oppdretteren egentlig på: pris, oppetid, responstid ved havari, nærhet til anlegget? Hva
            koster det kunden å bytte leverandør midt i en flåtepark?</li>
          <li><b>Enhetsøkonomi.</b> Omsetning er antall flåter ganger pris per flåte, pluss et
            ettermarked som er installert base ganger kroner per flåte per år. De to leddene har
            forskjellig margin, forskjellig syklisitet og forskjellig verdi. Dekomponer veksten i
            volum, pris og miks før du tror på den.</li>
          <li><b>Risiko og pris.</b> Kundekonsentrasjon, syklisitet, teknologiskifte, og til slutt: hva
            er 520 millioner som multippel, og på hvilken EBITDA?</li>
        </ol>
        <p><b>De tre driverne som er spesielle for akkurat dette markedet</b>, og som du bør si høyt
        allerede i strukturen:</p>
        <ul>
          <li><b>Taket.</b> Oppdrettsvolumet er regulert gjennom konsesjoner og maksimalt tillatt
            biomasse. Antall lokaliteter vokser altså ikke fritt med etterspørselen etter laks. Da har
            den installerte basen, og dermed utskiftingsmarkedet, et tak satt av myndighetene.</li>
          <li><b>Syklusen.</b> Oppdretteren kjøper ny flåte når hun har penger og tro på framtiden. Det
            følger lakseprisen, men med et etterslep på et år eller halvannet, fordi investeringsbudsjettet
            settes året etter det gode året. Leverandøren ser derfor en bølge som er forskjøvet i forhold
            til kundens resultatregnskap.</li>
          <li><b>Forhandlingsmakten.</b> Få og store kunder, mange mindre leverandører. Det setter en
            grense for hvor mye margin en utstyrsleverandør kan holde på, uansett hvor god teknologien er.</li>
        </ul>
        <p><b>Hypotesen:</b> Markedet er sannsynligvis lite og volumbegrenset, men ettermarkedet på en
        installert base er stabilt. Jeg vil derfor begynne med å måle markedet, fordi hvis Fjordtek
        allerede har en stor andel av et marked med tak, kan veksten i planen ikke komme fra Norge.</p>`,
      krav: [
        "Du starter med markedet, ikke med selskapet. Et voksende marked bærer en middelmådig plan, et krympende marked drukner en god.",
        "Du modellerer markedet som installert base delt på levetid, ikke som en generell etterspørselskurve.",
        "Du skiller nysalg fra ettermarked som to ulike forretninger med ulik margin og ulik syklisitet.",
        "Du sier at konsesjoner og biomassetak setter et tak på volumet.",
        "Du kobler investeringssyklusen til laksepris med etterslep, i stedet for å koble laksepris rett på omsetningen.",
        "Nedbrytningen ender i pris. En CDD som ikke lander på hva man bør betale, er ikke ferdig.",
        "Du avslutter med en hypotese og sier hvor du vil lete først.",
      ],
      felle: "Å hente fram Porters fem krefter fordi ordet leverandør står i oppgaven. Rammeverket beskriver bransjen, men svarer ikke på om planen holder. Intervjueren ser forskjellen med en gang, og en generisk struktur er den vanligste grunnen til at en ellers sterk kandidat ikke går videre.",
    },
    {
      art: "regne",
      sek: 360,
      tittel: "Hvor stort er markedet?",
      sp: `<p>Intervjueren gir deg fire holdepunkter:</p>
        <ul>
          <li>Det står om lag <b>1 000 fôrflåter</b> i sjøen på norske lokaliteter, én per lokalitet i drift.</li>
          <li>En ny flåte med fôringssystem koster i snitt <b>22 millioner kroner</b>.</li>
          <li>En flåte byttes ut etter om lag <b>20 år</b>.</li>
          <li>Service, reservedeler og oppgraderinger løper på om lag <b>0,4 millioner kroner per flåte per år</b>.</li>
        </ul>
        <p><b>Hvor stort er det norske markedet for fôrflåter og fôringssystemer, i millioner kroner per år?</b></p>
        <p class="tiny">Si framgangsmåten før du sier tallet, og si hva tallet betyr etterpå.</p>`,
      svar: 1500,
      enhet: "millioner kroner per år",
      toleranse: 0.1,
      fasit: `<p>Markedet har to ben, og de må regnes hver for seg fordi de oppfører seg forskjellig.</p>
        <div class="formula">
          <div class="eq">Utskifting: 1 000 flåter ÷ 20 år = 50 flåter i året</div>
          <div class="eq">Nysalgsmarked: 50 × 22 mill. kr = 1 100 mill. kr</div>
          <div class="eq">Ettermarked: 1 000 flåter × 0,4 mill. kr = 400 mill. kr</div>
          <div class="eq">Sum: 1 100 + 400 = <b>1 500 millioner kroner i året</b></div>
          <div class="where">Feilen som ligger og venter: å gange 1 000 flåter med 22 millioner og lande
            på 22 milliarder. Det er verdien av den installerte basen, ikke et årlig marked. Markedet er
            strømmen, ikke beholdningen.</div>
        </div>
        <p><b>Kryssjekk, som du bør gjøre høyt.</b> Norsk havbruk hadde 131 milliarder kroner i
        eksportverdi i 2024. Et marked på 1,5 milliarder er 1,2 prosent av det. At én utstyrskategori
        utgjør rundt en prosent av kundenes omsetning, er en helt rimelig størrelsesorden. Hadde du
        landet på 20 milliarder, ville du påstått at oppdretterne bruker 15 prosent av eksportverdien
        på fôrflåter alene, og da skal alarmen gå.</p>
        <p><b>Og så det som faktisk betyr noe.</b> Fjordtek omsetter for 645 millioner. Det er
        <b>43 prosent av markedet</b>. Selskapet er markedsleder i et marked med tak.</p>
        <ul>
          <li>Av volumet: 18 flåter levert i 2025 av 50 utskiftinger, altså <b>36 prosent</b>.</li>
          <li>Av nysalgskronene: 513 av 1 100, altså <b>47 prosent</b>. Spriket mellom 36 og 47 betyr at
            Fjordtek selger dyrere flåter enn snittet i markedet.</li>
          <li>Av ettermarkedet: 132 av 400, altså <b>33 prosent</b>. De servicer altså færre flåter enn de
            har levert, og der ligger et åpent spørsmål.</li>
        </ul>
        <p>Konsekvensen er hele grunnen til å ha regnet: <b>veksten i planen kan ikke komme fra å ta mer
        andel i Norge.</b> Med 43 prosent er det ikke mange prosentpoeng igjen å ta, og markedets volum
        er kapet av antall konsesjoner. Veksten må komme fra pris, fra ettermarked, fra utlandet eller
        fra et nytt produkt. Si den setningen høyt. Det er den intervjueren venter på.</p>`,
      krav: [
        "Du deler installert base på levetid i stedet for å gange basen med prisen.",
        "Du regner ettermarkedet som et eget ben, ikke som et påslag på nysalget.",
        "Du oppgir enheten, altså millioner kroner per år, og sier at det er et årlig marked.",
        "Du kryssjekker størrelsesordenen mot noe du vet, for eksempel havbrukets eksportverdi.",
        "Du regner ut Fjordteks andel når du først har markedet, uten å bli bedt om det.",
        "Du trekker slutningen: med 43 prosent av et volumbegrenset marked må veksten komme et annet sted fra.",
      ],
      felle: "Å blande beholdning og strøm. 1 000 flåter ganger 22 millioner er 22 milliarder, og det er verdien av utstyret som allerede står i sjøen. Markedet er det som kjøpes i år. Den samme feilen tar kandidater på bilparker, heiser, kraner og skip, og den er alltid like lett å unngå: spør deg selv om tallet har en tidsenhet i seg.",
    },
    {
      art: "exhibit",
      sek: 330,
      tittel: "Veksthistorien og kundelisten",
      sp: `<p>Selger har lagt fram fire år med tall, og på spørsmål om kundene kom den andre tabellen.
        <b>Hva ser du, og hva betyr det for prisen på 520 millioner?</b></p>`,
      figur: `<table class="data">
          <tr><th>Fjordtek AS</th><th class="n">2022</th><th class="n">2023</th><th class="n">2024</th><th class="n">2025</th></tr>
          <tr><td>Fôrflåter levert (antall)</td><td class="n">22</td><td class="n">24</td><td class="n">21</td><td class="n">18</td></tr>
          <tr><td>Snittpris per flåte (mill. kr)</td><td class="n">19,0</td><td class="n">21,5</td><td class="n">25,0</td><td class="n">28,5</td></tr>
          <tr><td>Nysalg (mill. kr)</td><td class="n">418</td><td class="n">516</td><td class="n">525</td><td class="n">513</td></tr>
          <tr><td>Service og deler (mill. kr)</td><td class="n">96</td><td class="n">104</td><td class="n">118</td><td class="n">132</td></tr>
          <tr><td><b>Sum omsetning</b></td><td class="n"><b>514</b></td><td class="n"><b>620</b></td><td class="n"><b>643</b></td><td class="n"><b>645</b></td></tr>
          <tr><td>EBITDA</td><td class="n">46</td><td class="n">62</td><td class="n">64</td><td class="n">58</td></tr>
          <tr><td>EBITDA-margin</td><td class="n">8,9 %</td><td class="n">10,0 %</td><td class="n">10,0 %</td><td class="n">9,0 %</td></tr>
        </table>
        <table class="data" style="margin-top:14px">
          <tr><th>Kunder 2025</th><th class="n">Andel av omsetningen</th><th>Merknad fra ledelsen</th></tr>
          <tr><td>Kunde A (børsnotert, ni produksjonsregioner)</td><td class="n">34 %</td><td>Åpnet eget mekanisk verksted i 2024 og bygde to av sine fire nye flåter i egen regi i 2025</td></tr>
          <tr><td>Kunde B</td><td class="n">22 %</td><td>Rammeavtale, utløper 2027</td></tr>
          <tr><td>Kunde C</td><td class="n">14 %</td><td>Ingen avtale, kjøper prosjekt for prosjekt</td></tr>
          <tr><td>Øvrige 38 kunder</td><td class="n">30 %</td><td>Mindre og familieeide oppdrettere</td></tr>
        </table>`,
      fasit: `<p>Overskriften først, så beviset. Overskriften er denne:</p>
        <p><i>«Omsetningen har vokst 26 prosent på tre år, men det har ikke kommet én ny flåte ut av det.
        Volumet har falt 18 prosent. Hele veksten er pris og ettermarked.»</i></p>
        <p><b>Dekomponer nysalget.</b> Det er den analysen eksibitet er bygget for:</p>
        <div class="formula">
          <div class="eq">Volum: 22 → 18 flåter, altså −18 %</div>
          <div class="eq">Pris: 19,0 → 28,5 mill. kr per flåte, altså +50 %</div>
          <div class="eq">Nysalg: 0,82 × 1,50 = 1,23, altså +23 %, fra 418 til 513</div>
        </div>
        <p><b>Er de 50 prosentene prismakt?</b> Nei, og det ser du uten flere tall: EBITDA-marginen står
        stille på 9 til 10 prosent gjennom hele perioden. Hadde selskapet hatt prismakt, ville marginen
        utvidet seg når prisen steg 50 prosent. At den ikke gjør det, betyr at prisøkningen er
        <b>kostnadsovervelting og miks</b>, altså stål, lønn og større flåter til mer eksponerte
        lokaliteter. Det er ikke verdiløst, men det er noe helt annet enn prismakt, og det kan ikke
        gjentas i det uendelige.</p>
        <p><b>Det ene lyspunktet.</b> Service og deler går 96 → 132, altså 11 prosent i året, jevnt, gjennom
        et fallende volumår. Det er den eneste linjen i tabellen som vokser uavhengig av syklusen, fordi
        den henger på den installerte basen og ikke på hvor mange flåter som kjøpes i år. Den er nå
        20 prosent av omsetningen. <b>Be om marginen på den linjen for seg.</b></p>
        <p><b>Hvilket år er normalt?</b> Du regnet at markedet bytter ut 50 flåter i året. Fjordtek leverte
        18 i 2025, altså 36 prosent, og 22 til 24 i de tre foregående. Enten tok de andel før og mister
        den nå, eller så var 2022 til 2024 toppen av en investeringsbølge etter rekordårene på laksepris,
        og 2025 er tilbake til trend. Det er to helt forskjellige diagnoser, og du må si at du vil vite
        hvilken. Er 2025 trend, betaler selger deg for et normalår. Er 2025 tapt andel, er 58 millioner
        heller ikke bunnen.</p>
        <p><b>Kundetabellen er det røde flagget.</b> De tre største er 70 prosent av omsetningen. Kunde A
        alene er 34 prosent, altså 219 millioner kroner, og A har begynt å bygge selv. Det er ikke en
        konkurrent som tar kunden fra deg, det er kunden som blir konkurrenten din. Kunde B er sikret
        til 2027, som er innenfor Nordviks holdeperiode, og C har ingen avtale i det hele tatt.</p>
        <p>Implisitt multippel på prisforventningen: 520 ÷ 58 = <b>9,0 ganger EBITDA</b>. Regn den ut i det
        du får en pris. Det er et gratis poeng, og det setter resten av samtalen.</p>`,
      krav: [
        "Du sier konklusjonen først i stedet for å lese tabellen radvis.",
        "Du dekomponerer veksten i volum og pris, og ser at volumet faller mens omsetningen stiger.",
        "Du bruker den flate EBITDA-marginen til å avvise at prisveksten er prismakt.",
        "Du legger merke til at service og deler vokser jevnt gjennom et fallende volumår, og ber om marginen på den linjen.",
        "Du holder 18 leverte flåter opp mot de 50 utskiftingene du regnet, og spør om 2025 er trend eller tapt andel.",
        "Du regner ut at 520 på 58 er ni ganger, uten å bli bedt om det.",
        "Du sier hva kunde As egenproduksjon betyr, ikke bare at konsentrasjonen er høy.",
      ],
      felle: "Å lese omsetningsveksten på 26 prosent som en vekstcase og gå videre. Tabellen har volumraden med av en grunn. En leverandør som vokser på pris i et marked der kunden blir større og færre, vokser på lånt tid, og den observasjonen er hele forskjellen mellom en kandidat som går videre og en som ikke gjør det.",
    },
    {
      art: "ide",
      sek: 300,
      tittel: "Hvor skal veksten komme fra?",
      sp: `<p>Nordviks investeringstese er at Fjordtek skal vokse fra 645 millioner til over en milliard i
        løpet av holdeperioden. Du vet nå at det norske markedet er rundt 1,5 milliarder, og at Fjordtek
        allerede har 43 prosent av det.</p>
        <p><b>List så mange veier til vekst du klarer på to minutter.</b> Én per linje. Si oppdelingen din
        først, så lister du.</p>`,
      liste: [
        "Levere flere flåter til de samme kundene når investeringssyklusen snur og etterslepet fra de svake årene tas igjen",
        "Vokse ettermarkedet: servicekontrakter, deler og oppgraderinger på alle flåtene i sjøen, også de andre har bygget",
        "Eksportere til Skottland, Færøyene, Island, Chile og Canada, der samme teknologi brukes og kundene er få og lette å nå",
        "Ta mer av leveransen per lokalitet: fortøyning, nøter, kameraer, sensorer og kraftforsyning selges sammen med flåten",
        "Selge oppgraderingspakker på eksisterende flåter i stedet for nybygg, fordi terskelen for kunden er lavere i et svakt investeringsår",
        "Bygge en produktlinje for landbaserte anlegg, der fôringssystemet trengs selv om den flytende flåten ikke gjør det",
        "Bygge for eksponerte og offshore lokaliteter, der kravene er strengere, enhetene større og prisen per leveranse høyere",
        "Selge fôringsprogramvare og biomassestyring som abonnement, altså gjentakende inntekt med høyere margin enn stål",
        "Kjøpe opp mindre norske konkurrenter for å konsolidere et marked med tak, i bolt-ons som ligger under meldeplikten til Konkurransetilsynet",
        "Tilby leasing eller leverandørfinansiering, slik at kundens beslutning ikke krever hele beløpet opp front i et dårlig år",
        "Gå fra å selge flåter til å selge fôring som tjeneste, betalt per kilo fôr levert ut i merden",
        "Selge inn mot tilgrensende havnæringer som fôrer i sjø: torskeoppdrett, rensefisk og andre nye arter",
      ],
      fasit: `<p>Oppdelingen teller mer enn antallet. En som fungerer her, og som du bør si før du lister:
        <b>samme produkt til nye kunder, nytt produkt til samme kunder, nytt produkt til nye kunder,</b>
        og til slutt <b>oppkjøp</b>. Det er en vekstmatrise, og den er raskere å si enn å tegne.</p>
        <p>Men en liste er ikke svaret. Det som skiller, er å <b>sile den mot det du allerede vet</b>:</p>
        <ul>
          <li><b>Mer andel i Norge er nesten utelukket.</b> 43 prosent er høyt, kundene er få, og de tre
            største kjenner alle alternativene. Å ta 55 prosent ville krevd at du slår noen på pris i et
            marked med ni prosents margin.</li>
          <li><b>Volumvekst i Norge er kapet.</b> Antall lokaliteter styres av konsesjoner og biomassetak.
            Uten nye tillatelser vokser ikke den installerte basen, og dermed heller ikke
            utskiftingsmarkedet.</li>
          <li><b>Ettermarkedet er den beste av de nære ideene.</b> Fjordtek har 33 prosent av ettermarkedet
            men har levert nærmere halvparten av flåtene, så det finnes en åpenbar luke. Ettermarkedet er
            også det eneste benet som ikke svinger med investeringssyklusen, og det er akkurat det et fond
            med fire års horisont trenger.</li>
          <li><b>Eksport er den største muligheten og den dyreste.</b> Skottland, Færøyene, Island, Chile
            og Canada kjøper samme type utstyr. Men konkurrentene der er etablerte, og servicemodellen
            krever fysisk nærhet til anlegget. Det er en femårsplan, ikke en toårsplan.</li>
          <li><b>Landbasert og offshore er reell opsjon og reell trussel samtidig.</b> Hvis lukkede og
            landbaserte anlegg tar andel fra tradisjonell sjøfase, forsvinner deler av flåtemarkedet. Da
            er en landbasert produktlinje ikke vekst, det er forsikring.</li>
        </ul>
        <p><b>Prioriter til slutt.</b> Ettermarked og bredere leveranse per lokalitet er det som kan gjøres
        innen holdeperioden. Eksport og landbasert er det som avgjør hva selskapet er verdt ved exit.
        Å si den forskjellen høyt er poenget: et fond kjøper både en plan og en historie å selge videre.</p>`,
      krav: [
        "Du sier oppdelingen din før du begynner å liste, i stedet for en usortert strøm.",
        "Minst én idé går på ettermarkedet, som er det eneste benet som er uavhengig av investeringssyklusen.",
        "Minst én idé går utenfor Norge, fordi det norske volumet har tak.",
        "Minst én idé tar høyde for teknologiskiftet mot landbasert eller offshore.",
        "Du siler ideene mot markedsandelen du selv regnet, og forkaster mer andel i Norge.",
        "Du skiller mellom det som kan gjennomføres på fire år og det som først betaler seg etter exit.",
        "Du prioriterer til slutt i stedet for å la listen ligge flat.",
      ],
      felle: "Å foreslå vekst som forutsetter at markedet vokser. Du har nettopp regnet ut at det ikke gjør det, fordi antall lokaliteter er regulert. En vekstplan som hviler på at norsk havbruk produserer mer laks, er en plan som venter på at Nærings- og fiskeridepartementet skal dele ut nye tillatelser, og det er ikke en plan et fond kan eie.",
    },
    {
      art: "syntese",
      sek: 300,
      tittel: "Anbefalingen til investeringskomiteen",
      sp: `<p>Du ba om marginen splittet, og fikk den rett før møtet: <b>ettermarkedet har 25 prosent
        EBITDA-margin, nysalget har om lag 5 prosent.</b></p>
        <p>Investeringskomiteen har <b>ett minutt</b>. Prisforventningen står fast på 520 millioner kroner.
        <b>Gi anbefalingen din.</b></p>
        <p class="tiny">Skriv den slik du ville sagt den. Den skal ha et tall i seg.</p>`,
      fasit: `<p>Regn den nye opplysningen ferdig før du snakker. Den snur casen:</p>
        <div class="formula">
          <div class="eq">Ettermarked: 0,25 × 132 = 33 mill. kr i EBITDA</div>
          <div class="eq">Nysalg: 58 − 33 = 25 mill. kr på 513 i omsetning, altså 4,9 % margin</div>
          <div class="where">Ettermarkedet er 20 prosent av omsetningen og 57 prosent av inntjeningen.
            Nysalget er 80 prosent av omsetningen og under halvparten av inntjeningen.</div>
        </div>
        <p>Og nedsiden, med antakelsen sagt høyt: kunde A er 219 millioner, hvorav rundt 175 er nysalg. Tar
        A halvparten av nybygget sitt inn i eget verksted, forsvinner 88 millioner i omsetning. Med
        15 prosent dekningsbidrag på nysalg er det 13 millioner i EBITDA.</p>
        <div class="formula">
          <div class="eq">EBITDA i nedsidescenariet: 58 − 13 = 45 mill. kr</div>
          <div class="eq">520 ÷ 45 = 11,6 ganger, ikke 9</div>
        </div>
        <blockquote><p><b>«Nei til 520 millioner. Ja rundt 400, altså sju ganger, og da med en betingelse
        knyttet til kunde A.»</b></p>
        <p>Tre grunner. For det første er veksten ikke det den ser ut som: omsetningen er opp 26 prosent på
        tre år, men volumet er ned 18 prosent, og hele forskjellen er pris som ikke har gitt én eneste
        prosentpoeng bedre margin. Det er kostnadsovervelting, ikke prismakt.</p>
        <p>For det andre er markedet på 1,5 milliarder kroner og Fjordtek har 43 prosent av det. Volumet er
        kapet av antall konsesjoner. Vekstplanen fra 645 til over en milliard kan derfor ikke hentes i
        Norge, og planene som kan hente den, altså eksport og landbasert, er femårsplaner, ikke
        toårsplaner.</p>
        <p>For det tredje betaler dere ni ganger på et tall som er 34 prosent avhengig av en kunde som har
        begynt å bygge selv. Tar kunde A bare halvparten av sitt eget nybygg, faller EBITDA til rundt 45,
        og da har dere i praksis betalt nærmere tolv ganger.</p>
        <p>Men det er et selskap her verdt å eie, og det er ikke verftet. Ettermarkedet er 20 prosent av
        omsetningen og 57 prosent av inntjeningen, det vokser 11 prosent i året gjennom en nedtur, og det
        henger på tusen flåter i sjøen, ikke på investeringsbudsjettene. Det er den annuiteten dere skal
        betale for, og der har Fjordtek bare 33 prosent selv om de har levert nærmere halvparten av
        flåtene.</p>
        <p>Konkret: 400 millioner er sju ganger på fjorårets tall og ni ganger på nedsidetallet, altså
        samme multippel som selger vil ha, bare regnet på et tall jeg tror på. Alternativt full pris mot at
        kunde A signerer en flerårig rammeavtale før closing, eller at differansen legges i en earn-out
        knyttet til leverte flåter hos A.</p>
        <p>Det første jeg ville testet er ettermarkedet: er 25 prosent margin ekte, og hvorfor servicer de
        bare en tredel av basen når de har bygget halvparten av den. Holder det svaret, tåler prisen å
        løftes.»</p></blockquote>
        <p><b>Formen som scorer:</b> ta stilling, fest svaret til en pris eller en betingelse, og pek på de
        to tingene som faktisk kan velte konklusjonen. En anbefaling som sier «det kommer an på» er en
        diagnose, og komiteen ba om en posisjon.</p>`,
      krav: [
        "Svaret kommer i første setning, og det har et tall i seg.",
        "Du sier nei til den prisen som står, og oppgir hvilken pris eller betingelse du sier ja til.",
        "Du regner ut at ettermarkedet er over halve inntjeningen på en femdel av omsetningen, og bygger anbefalingen på det.",
        "Du sensitiverer på kunde A og viser hva multippelen blir hvis volumet der faller.",
        "Du sier hvilke antakelser du gjorde da du regnet nedsiden, i stedet for å presentere tallet som et faktum.",
        "Du bruker tall fra casen, ikke generelle utsagn om bransjen.",
        "Du sier hva du ville testet først, og hva som ville fått deg til å endre svaret.",
        "Du holder deg innenfor ett minutt.",
      ],
      felle: "Å si nei og stoppe der. Et fond som har brukt penger på en due diligence vil ikke ha en avvisning, de vil ha en pris og en struktur som gjør avtalen gjennomførbar. Det samme gjelder motsatt vei: å si ja til 520 fordi selskapet er markedsleder med voksende omsetning er å svare på om dette er et bra selskap, og det var ikke spørsmålet.",
    },
  ],
},
