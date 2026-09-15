/* EY-Parthenon · buy-and-build i teknisk installasjon.
   Settingen er EY-Parthenon Oslos egen «case study of the quarter» i Q2 2026:
   fragmentert marked, aldrende eiere, PE-plattformer som ruller opp, 5 til 14
   transaksjoner på tre kvartaler. Se docs/case-research/08, seksjon 2.5 og 5.3.
   Selskapene er konstruerte. Mekanikken og størrelsesordenene er ikke. */
{
  id: "eyp-buy-and-build",
  label: "Plattformen som skal doble seg på tre år",
  kategori: "EY-Parthenon",
  type: "M&A",
  nivå: "Middels",
  firma: "EY-Parthenon",
  stil: "candidate-led",
  minutter: 30,
  ch: [],
  blurb: "Buy-and-build i ren form. Trener konsolideringsrom regnet nedenfra, normalisering av eierlønn i et eksibit, og multippelarbitrasjen som er hele verdiskapingen før første synergi.",
  prompt: `<p>Klienten er <b>Fjordkapital</b>, et norsk oppkjøpsfond. De eier
    <b>Termik Gruppen</b>, en plattform innen teknisk installasjon: rørlegging, elektro,
    ventilasjon og kulde. Selskapet har <b>900 millioner kroner i omsetning</b>,
    <b>72 millioner i EBITDA</b> og rundt 520 ansatte fordelt på elleve avdelinger
    i Oslo, Akershus, Innlandet, Agder og Vestland. Fondet kjøpte plattformen for to år
    siden til <b>9 ganger EBITDA</b>, og har gjennomført fire mindre oppkjøp siden.</p>
    <p>Investeringskomiteen skal nå ta stilling til et oppkjøpsprogram. Planen er å nå
    <b>1,8 milliarder kroner i omsetning om tre år</b>, der <b>750 millioner av veksten
    kjøpes</b> og resten kommer organisk. Programmet krever rundt <b>400 millioner kroner
    i ny kapital</b>. Fondet har et avkastningskrav på 20 prosent.</p>
    <p><b>Holder planen, og hva bør fondet være villig til å betale?</b></p>`,
  bakgrunn: `<p>Casen er konstruert, men settingen er EY-Parthenons egen. I kvartalsrapporten
    <i>Transaction Trends</i> for Q2 2026 valgte EY-Parthenon Oslo <b>teknisk installasjon</b>
    som kvartalets case, og beskrev et marked som konsoliderer raskt, drevet av
    strukturell fragmentering, en aldrende eiermasse og krav om mer profesjonell
    tjenesteleveranse. Antall transaksjoner i segmentet gikk fra 5 til 14 på tre kvartaler,
    og PE-eide plattformer sto for mesteparten. Medvinden er reell: varmepumper,
    energieffektivisering og fornybar installasjon.</p>
    <p>Det som gjør en buy-and-build til god trening, er at verdiskapingen er
    <b>finansiell før den er operasjonell</b>. En plattform med en milliard i omsetning
    omsettes til en helt annen multippel enn et rørleggerfirma med tjue ansatte, og
    differansen er penger i seg selv, før noen har spart en krone på innkjøp. Kandidater
    som ikke ser det, leter etter synergier som ikke er hovedsaken. Kandidater som bare
    ser det, glemmer at spreaden lukker seg når noen normaliserer regnskapene.</p>
    <p>Bransjens egen særhet hører med: <b>den knappe ressursen er fagarbeidere, ikke
    kunder</b>. Ordrebøkene er fulle. Å kjøpe omsetning er i praksis å kjøpe montører, og
    montørene følger ofte den eieren som nettopp solgte.</p>`,
  trinn: [
    {
      art: "oppklaring",
      sek: 150,
      tittel: "Hva vil du vite før du begynner?",
      sp: `<p>Du har hørt prompten. Før du strukturerer: hvilke spørsmål stiller du,
        og hva skal svarene brukes til?</p>`,
      fasit: `<p>I en CDD for et oppkjøpsprogram er det tre ting som må på plass før
        strukturen: <b>hva beslutningen faktisk gjelder</b>, <b>hva som er låst og hva som
        er variabelt</b>, og <b>hvordan dagens tall er satt sammen</b>. Tre til fire
        spørsmål er nok.</p>
        <ul>
          <li><b>Er 1,8 milliarder et mål eller en forutsetning?</b> Hvis komiteen kan
            godta 1,5 milliarder, er casen «hvor mye og til hvilken pris». Hvis tallet er
            låst, er casen «klarer vi det», og det er et langt smalere spørsmål.</li>
          <li><b>Hvordan er de 900 millionene satt sammen i dag?</b> Hvor mye er service
            og vedlikehold med gjentakende inntekt, og hvor mye er prosjekt? Det avgjør
            både hvilken multippel plattformen fortjener og hvilke mål som er verdt å
            kjøpe.</li>
          <li><b>Hvor mye av de fire oppkjøpene er faktisk integrert?</b> Fire på atten
            måneder sier noe om kapasitet. Hvis de fortsatt har fire regnskapssystemer og
            fire logoer, er integrasjonsevnen beskrankningen, ikke dealflowen.</li>
          <li><b>Hva er exit-antakelsen, og når?</b> Fondet har eid i to år. Med tre år
            til er holdeperioden fem år, og alt som betaler seg i år seks er irrelevant
            for denne beslutningen.</li>
        </ul>
        <p>Det du <i>ikke</i> skal spørre om, er hvor stort markedet er eller hvor mange
        selskaper som finnes. Det er analysen. Spør du om den, gir du fra deg det eneste
        stedet du kan vise regnehåndverk.</p>`,
      krav: [
        "Du avklarer om måltallet er låst. Det avgjør om casen handler om «om» eller «hvor mye».",
        "Minst ett spørsmål går på hvordan dagens inntjening er satt sammen, ikke bare på hvor stor den er.",
        "Du spør om integrasjonskapasitet, ikke bare om kjøpsmuligheter. Fire oppkjøp på atten måneder er en opplysning om begge deler.",
        "Du sier hva svaret vil endre: «Hvis tallet er låst, hopper jeg rett til gjennomførbarhet.»",
        "Du ber ikke om markedsstørrelsen. Den skal du bygge selv.",
      ],
      felle: "Å spørre hvor mange installasjonsbedrifter det finnes i Norge. Det er nøyaktig det tallet intervjueren vil se at du kan resonnere deg fram til, og spørsmålet koster deg hele regnetrinnet.",
    },
    {
      art: "struktur",
      sek: 270,
      tittel: "Strukturer beslutningen",
      sp: `<p>Bygg strukturen du ville tegnet på arket. <b>Avslutt med hypotesen din</b>
        og med hvilken gren du starter i, og si hvorfor akkurat den.</p>`,
      fasit: `<p>En buy-and-build har en egen kjede, og den er ikke «marked, konkurrenter,
        kunde». Den er en <b>rekkefølge av betingelser som hver for seg kan velte planen</b>:</p>
        <div class="formula"><div class="eq">Finnes målene? → Får vi dem? → Til hvilken pris? → Tåler vi å eie dem? → Er summen verdt mer enn delene?</div></div>
        <ul>
          <li><b>Finnes målene.</b> Konsolideringsrommet regnet nedenfra: antall foretak i
            riktig størrelsesbånd, i riktig geografi, med en eier som faktisk vil selge nå.
            Dette er den harde beskrankningen, og den regnes, den påstås ikke.</li>
          <li><b>Får vi dem.</b> Vi er ikke alene. Flere PE-eide plattformer jakter i det
            samme båndet, og industrielle kjøpere også. Vår andel av dealflowen er ikke
            hundre prosent.</li>
          <li><b>Prisen.</b> Inngangsmultippel mot plattformmultippel. Her ligger
            multippelarbitrasjen, og her ligger spørsmålet om prisene stiger når de beste
            målene er tatt.</li>
          <li><b>Tåler vi å eie dem.</b> Integrasjon, systemer, ledelse, og den som teller
            mest i denne bransjen: <b>holder montørene og fagarbeiderne seg</b> etter at
            eieren har fått pengene sine? Ordreboken følger folk, ikke kontrakter.</li>
          <li><b>Er summen verdt mer.</b> Innkjøpsmakt mot leverandørene, kryssalg mellom
            fagene, tetthet per region, og om en samlet plattform faktisk verdsettes høyere
            enn delene når den skal selges.</li>
        </ul>
        <p>Legg merke til at <b>markedsvekst ikke er øverst</b>. I en roll-up kan markedet
        være flatt og planen likevel virke, fordi veksten kjøpes. Det som dreper en roll-up
        er at målene ikke finnes, at de koster for mye, eller at de faller fra hverandre
        etter kjøpet.</p>
        <p><b>Hypotesen:</b> arbitrasjen er reell, men 750 millioner i kjøpt omsetning på
        tre år er et stort tall i et marked der de kjøpbare selskapene omsetter for rundt
        tretti millioner hver. Jeg starter med å regne hvor mange mål som faktisk finnes,
        fordi hvis det tallet er for lite, spiller prisen ingen rolle.</p>`,
      krav: [
        "Grenene er buy-and-buildens egne, ikke et generisk rammeverk tvunget over casen.",
        "Du har en egen gren for om målene i det hele tatt finnes, og du behandler den som noe som skal regnes.",
        "Du skiller mellom dealflow og vår andel av dealflowen. Vi er ikke den eneste kjøperen.",
        "Du nevner fagarbeiderne som beskrankning, ikke bare kundene eller kapitalen.",
        "Du sier hvilken gren du starter i og hvorfor den er først, ikke bare at du har fem grener.",
        "Du avslutter med en hypotese som kan vise seg å være feil.",
      ],
      felle: "Å strukturere rundt markedets vekst. I en roll-up kjøpes veksten. Et voksende marked er hyggelig, men det er ikke det som avgjør om planen holder, og en kandidat som bruker fem minutter på varmepumpetrender har brukt fem minutter feil.",
    },
    {
      art: "regne",
      sek: 330,
      tittel: "Hvor mange selskaper er det å kjøpe?",
      sp: `<p>Du har bedt om tall om bransjen, og får dette:</p>
        <ul>
          <li>Norsk teknisk installasjon omsetter for <b>90 milliarder kroner</b> i året
            og har rundt <b>7 500 foretak med ansatte</b>.</li>
          <li>Selskapene med <b>10 til 49 ansatte</b> er cirka 1 000 foretak og står for
            <b>34 milliarder kroner</b> av omsetningen. Det er båndet plattformen kjøper i:
            store nok til å ha egen ledelse, små nok til å være billige.</li>
          <li>Plattformens fylker dekker <b>60 prosent</b> av bransjeomsetningen.</li>
          <li><b>30 prosent</b> av eierne i dette båndet er over 60 år, og erfaringen fra
            bransjen er at omtrent <b>halvparten</b> av dem faktisk selger i løpet av en
            gitt treårsperiode.</li>
          <li><b>Fire PE-eide plattformer</b> konkurrerer om de samme selskapene, og de
            deler dealflowen omtrent likt.</li>
        </ul>
        <p><b>Hvor mye årlig omsetning ligger i selskapene Termik realistisk kan kjøpe de
        neste tre årene?</b> Svar i millioner kroner.</p>
        <p class="tiny">Si framgangsmåten høyt før du regner, og si «så hva» etter tallet.</p>`,
      svar: 765,
      enhet: "millioner kroner",
      toleranse: 0.05,
      fasit: `<p>Dette er en trakt, og den skal sies høyt før den regnes, ett filter om
        gangen:</p>
        <div class="formula">
          <div class="eq">Kjøpsvinduet: 34 mrd. kr</div>
          <div class="eq">× 60 % riktig geografi = 20,4 mrd. kr</div>
          <div class="eq">× 30 % eier over 60 år = 6,1 mrd. kr</div>
          <div class="eq">× 50 % som faktisk selger i vinduet = 3,1 mrd. kr</div>
          <div class="eq">÷ 4 plattformer = <b>765 mill. kr</b></div>
        </div>
        <p><b>Og så det som faktisk er svaret på spørsmålet.</b> Planen krever 750
        millioner i kjøpt omsetning. Regn kontrollen: 900 millioner som vokser 5 prosent
        organisk i tre år blir cirka 1 042 millioner, så for å nå 1,8 milliarder må
        <b>758 millioner kjøpes</b>. Det er <b>99 prosent av alt som er å få tak i</b>.</p>
        <p>Planen er altså ikke umulig. Den er verre enn umulig: den har <b>null slakk</b>.
        Den forutsetter at Termik vinner hver eneste transaksjon i sin andel av markedet,
        til den prisen de har budsjettert, i hvert eneste kvartal i tre år.</p>
        <p>To kontroller til som koster lite og betyr mye:</p>
        <ul>
          <li><b>Antall selskaper.</b> Snittet i båndet er 34 millioner i omsetning
            (34 mrd. delt på 1 000 foretak). 750 delt på 34 er <b>22 oppkjøp</b>.</li>
          <li><b>Takten.</b> 22 oppkjøp på tre år er drøyt 7 i året. Termik har gjort fire
            på atten måneder, altså under tre i året. Planen krever at de nesten
            <b>tredobler takten</b>, samtidig som de integrerer.</li>
        </ul>
        <p>Det som skiller et sterkt svar fra et middels her, er ikke trakten. Trakten kan
        de fleste. Det er å <b>snu tallet mot planen med en gang</b>, uten å bli bedt om
        det, og å regne antallet oppkjøp, fordi 750 millioner høres håndterbart ut og 22
        separate transaksjoner gjør det ikke.</p>`,
      krav: [
        "Du sier filtrene i rekkefølge før du regner, ikke ett langt regnestykke uten forklaring.",
        "Du deler på antall konkurrerende plattformer. Dealflow er ikke det samme som vår dealflow.",
        "Du sammenligner tallet med det planen krever, uten å bli bedt om det.",
        "Du regner om fra kroner til antall oppkjøp, og videre til takt per år.",
        "Du oppgir enhet og runder åpent: «vi kaller det 765 millioner».",
        "Du sier hvilket filter du er minst trygg på. Andelen som faktisk selger er den svakeste antakelsen i hele kjeden.",
      ],
      felle: "Å stoppe ved 765 millioner og si «det er nok». Tallet betyr ingenting alene. Det får mening først når det holdes mot de 758 millionene planen krever, og da er poenget at forholdet er 99 prosent, ikke at tallet er stort.",
    },
    {
      art: "exhibit",
      sek: 390,
      tittel: "Oppkjøpskandidatene",
      sp: `<p>Corporate finance-teamet har screenet markedet og lagt fram seks kandidater
        som er i salgsprosess eller har signalisert at de vil selge. Prisantydningen er
        eierens forventning, ikke et bud.</p>
        <p><b>Hva ser du, og hva betyr det for programmet?</b></p>`,
      figur: `<table class="data">
          <tr>
            <th>Kandidat</th><th>Fylke</th><th>Fag</th>
            <th class="n">Omsetning</th><th class="n">EBITDA-margin</th>
            <th class="n">EBITDA</th><th class="n">Prisantydning</th>
          </tr>
          <tr><td>Rørteknikk Innlandet</td><td>Innlandet</td><td>Rør</td><td class="n">38</td><td class="n">11 %</td><td class="n">4,2</td><td class="n">25</td></tr>
          <tr><td>Vestland VVS</td><td>Vestland</td><td>Rør og VVS</td><td class="n">44</td><td class="n">9 %</td><td class="n">4,0</td><td class="n">22</td></tr>
          <tr><td>Follo Ventilasjon</td><td>Akershus</td><td>Ventilasjon</td><td class="n">27</td><td class="n">12 %</td><td class="n">3,2</td><td class="n">16</td></tr>
          <tr><td>Sør Installasjon</td><td>Agder</td><td>Elektro</td><td class="n">61</td><td class="n">10 %</td><td class="n">6,1</td><td class="n">40</td></tr>
          <tr><td>Bergen Kulde og Klima</td><td>Vestland</td><td>Kulde og ventilasjon</td><td class="n">52</td><td class="n">8 %</td><td class="n">4,2</td><td class="n">23</td></tr>
          <tr><td>Nordvest Elektro</td><td>Møre og Romsdal</td><td>Elektro</td><td class="n">95</td><td class="n">14 %</td><td class="n">13,3</td><td class="n">106</td></tr>
          <tr><td colspan="7" class="tiny">Millioner kroner. Prisantydning er enterprise value.</td></tr>
        </table>
        <table class="data">
          <tr><th>Notater fra screeningen</th></tr>
          <tr><td>Rørteknikk Innlandet: eier 63 år, ingen daglig leder under seg.</td></tr>
          <tr><td>Follo Ventilasjon: eier tar 0,4 mill. i lønn og driver selv. Markedslønn for daglig leder i et selskap på denne størrelsen er 1,4 mill.</td></tr>
          <tr><td>Sør Installasjon: 40 % av omsetningen kommer fra ett sykehusprosjekt som ferdigstilles neste år.</td></tr>
          <tr><td>Bergen Kulde og Klima: 70 % av omsetningen er serviceavtaler med årlig fornyelse.</td></tr>
          <tr><td>Nordvest Elektro: største aktør i sitt fylke. To andre budgivere i prosessen.</td></tr>
        </table>`,
      fasit: `<p>Det gratis poenget først: <b>regn den impliserte multippelen på hver rad</b>.
        Pris delt på EBITDA. Det er én divisjon, og uten den kan du ikke sammenligne noe
        som helst.</p>
        <ul>
          <li>Rørteknikk Innlandet 25 / 4,2 = <b>6,0x</b></li>
          <li>Vestland VVS 22 / 4,0 = <b>5,5x</b></li>
          <li>Follo Ventilasjon 16 / 3,2 = <b>5,0x</b></li>
          <li>Sør Installasjon 40 / 6,1 = <b>6,6x</b></li>
          <li>Bergen Kulde og Klima 23 / 4,2 = <b>5,5x</b></li>
          <li>Nordvest Elektro 106 / 13,3 = <b>8,0x</b></li>
        </ul>
        <p><b>Første observasjon: multippelen stiger med størrelsen.</b> Det er ikke tilfeldig,
        og det er dårlige nyheter for programmet. De små er billige nettopp fordi de er små
        og vanskelige å kjøpe for andre enn en lokal plattform. Jo større mål, jo flere
        budgivere, jo mindre spread mot plattformens egen multippel på 9 til 10. Nordvest
        Elektro til 8x har nesten ingen arbitrasje igjen.</p>
        <p><b>Andre observasjon: den beste raden er en felle.</b> Nordvest Elektro har størst
        omsetning, best margin og er markedsleder i sitt fylke. Den er også i
        Møre og Romsdal, der Termik ikke har en eneste avdeling, i en prosess med to andre
        budgivere, til 8x. Å kjøpe den er å bygge en ny plattform, ikke en bolt-on: ingen
        tetthet å høste, ingen innkjøpsvolum å slå sammen, egen ledelse som må bli.
        Én kandidat på 106 millioner ville i tillegg spist over en fjerdedel av programmets
        kapital.</p>
        <p><b>Tredje observasjon, og den som faktisk skiller: marginene er ikke sanne.</b>
        Follo Ventilasjon viser 12 prosent, den beste marginen blant de små. Eieren tar
        0,4 millioner i lønn der markedet koster 1,4. Én million av den EBITDAen er
        egentlig lønnskostnad:</p>
        <div class="formula">
          <div class="eq">Rapportert EBITDA: 3,2 mill. kr</div>
          <div class="eq">Normalisert EBITDA: 3,2 − 1,0 = 2,2 mill. kr</div>
          <div class="eq">Normalisert margin: 2,2 / 27 = <b>8,1 %</b>, ikke 12 %</div>
          <div class="eq">Reell multippel: 16 / 2,2 = <b>7,3x</b>, ikke 5,0x</div>
          <div class="where">Den billigste kandidaten i tabellen er i virkeligheten den nest dyreste.</div>
        </div>
        <p>Dette er ikke et særtilfelle. Det er <b>normaltilstanden i eierdrevne
        småselskaper</b>, og det gjelder hele screeningen. Marginene i tabellen er
        selgerens tall.</p>
        <p><b>Fjerde observasjon: Sør Installasjon selger deg noe som tar slutt.</b>
        40 prosent av 61 millioner er ett prosjekt som ferdigstilles neste år. Run-rate
        omsetning er rundt 37 millioner, ikke 61, og prosjektmarginen er sannsynligvis
        høyere enn servicemarginen. Prisen på 40 millioner er satt på en inntjening som
        ikke finnes om atten måneder. Her er svaret ikke «nei», men «ja, til en pris regnet
        på run-rate, og med en earn-out».</p>
        <p><b>Femte observasjon, og den mest kontraintuitive: den kjedeligste raden er den
        beste.</b> Bergen Kulde og Klima har lavest margin i tabellen, 8 prosent, og nest
        laveste multippel. Men 70 prosent av omsetningen er serviceavtaler som fornyes
        årlig. Det er den eneste raden med gjentakende inntekt, den eneste der
        inntjeningen ikke avhenger av at neste anbud vinnes, og den ligger i et fylke der
        Termik allerede har avdelinger. Lav margin med høy kvalitet slår høy margin med
        lav kvalitet, hver gang.</p>
        <p>Samlet for de fem kandidatene i Termiks egne fylker: 222 millioner i omsetning,
        21,7 millioner i rapportert EBITDA, 126 millioner i samlet prisantydning. Det gir
        <b>9,8 prosent snittmargin</b> og <b>5,8x snittmultippel</b> på rapporterte tall.
        Hold på begge, du trenger dem i neste trinn.</p>`,
      krav: [
        "Du regner implisitt multippel på hver rad før du sier noe om dem. Pris uten multippel er ikke sammenlignbar informasjon.",
        "Du ser at multippelen stiger med størrelsen, og sier hva det betyr for et program som skal kjøpe 22 selskaper.",
        "Du normaliserer Follo Ventilasjon for eierlønn og regner den reelle multippelen, ikke bare konstaterer at marginen er høy.",
        "Du generaliserer normaliseringen: hvis én eier tar for lite lønn, gjør de fleste det.",
        "Du skiller run-rate fra rapportert omsetning hos Sør Installasjon.",
        "Du velger Bergen Kulde og Klima som best, eller begrunner hvorfor ikke, på kvaliteten i inntjeningen og ikke på marginen.",
        "Du avviser Nordvest Elektro på geografi og pris, ikke på magefølelse, og sier hva som ville fått deg til å ombestemme deg.",
        "Du sier overskriften først og leser ikke tabellen rad for rad.",
      ],
      felle: "Å rangere kandidatene etter EBITDA-margin. Marginen i tabellen er selgerens tall, satt av hvor mye lønn eieren velger å ta ut og av hvilke prosjekter som tilfeldigvis løp i fjor. I et eierdrevet småselskap er rapportert margin en forhandlingsposisjon, ikke en måling.",
    },
    {
      art: "regne",
      sek: 360,
      tittel: "Hva er arbitrasjen verdt?",
      sp: `<p>Fondet legger fram sin egen regning for komiteen. De kjøper <b>750 millioner
        kroner i omsetning</b> gjennom rundt 22 bolt-ons. På rapporterte tall er
        snittmarginen 9,8 prosent, men de har tatt ett prosentpoeng i haircut for eierlønn
        og bruker <b>9 prosent</b>. Snittprisen er <b>5,8 ganger EBITDA</b>. Plattformen
        selv omsettes til <b>10 ganger EBITDA</b>.</p>
        <p><b>Hvor mye verdi skaper selve multippelforskjellen, før én eneste synergi?</b>
        Svar i millioner kroner.</p>
        <p class="tiny">Si formelen før du setter inn tall.</p>`,
      svar: 283.5,
      enhet: "millioner kroner",
      toleranse: 0.04,
      fasit: `<p>Formelen er kort nok til å sies før den regnes: <b>kjøpt EBITDA ganger
        differansen mellom plattformens multippel og inngangsmultippelen</b>.</p>
        <div class="formula">
          <div class="eq">Kjøpt EBITDA: 750 × 9 % = 67,5 mill. kr</div>
          <div class="eq">Kjøpesum: 67,5 × 5,8 = 391,5 mill. kr</div>
          <div class="eq">Verdi inne i plattformen: 67,5 × 10 = 675 mill. kr</div>
          <div class="eq">Arbitrasje: 675 − 391,5 = <b>283,5 mill. kr</b></div>
          <div class="where">Eller rett fram: 67,5 × (10 − 5,8) = 283,5. Samme regnestykke, og det er slik du bør si det høyt.</div>
        </div>
        <p><b>Så hva.</b> 283 millioner i verdi på 391 millioner innsatt kapital er
        1,7 ganger pengene på tre år, altså rundt <b>20 prosent avkastning</b>. Det treffer
        fondets krav nøyaktig. Men legg merke til hva som <i>ikke</i> er med: ikke én krone
        i innkjøpsrabatt, ikke én krone i kryssalg, ikke én krone i organisk vekst hos de
        kjøpte selskapene. Hele avkastningen kommer av at de samme kronene i inntjening
        skifter eier. <b>Verdien skapes i spreaden, ikke i driften.</b> Det er den setningen
        casen handler om.</p>
        <p><b>Og så motstanden, som du bør reise selv før intervjueren gjør det.</b>
        Ett prosentpoeng haircut for eierlønn er for snilt. Follo Ventilasjon alene mistet
        3,9 prosentpoeng på normalisering. Går du gjennom 22 eierdrevne selskaper der eieren
        i snitt tar 0,8 millioner for lite i lønn, snakker vi om 18 millioner i året, altså
        2 til 3 prosentpoeng margin. Sett reell margin til 7 prosent i stedet for 9. Prisen
        er allerede forhandlet, så den står:</p>
        <div class="formula">
          <div class="eq">Reell EBITDA: 750 × 7 % = 52,5 mill. kr</div>
          <div class="eq">Reell inngangsmultippel: 391,5 / 52,5 = <b>7,5x</b>, ikke 5,8x</div>
          <div class="eq">Verdi i plattformen: 525 mill. kr</div>
          <div class="eq">Arbitrasje: 525 − 391,5 = <b>133,5 mill. kr</b></div>
        </div>
        <p>Arbitrasjen mer enn halveres, og avkastningen faller fra 20 til rundt 10 prosent.
        Sagt som en tommelfingerregel komiteen kan huske: <b>hvert prosentpoeng margin du
        bommer på, koster 75 millioner i exit-verdi</b> (1 prosentpoeng av 750 er 7,5
        millioner i EBITDA, ganger 10).</p>
        <p>Trekk så fra integrasjonskostnaden. 22 bolt-ons med systemer, ERP, profil og
        bonuser for å holde på folk koster halvannen million hver, altså rundt 33 millioner,
        og det er i tråd med tommelregelen om ett til to års synergiverdi. Da står det igjen
        rundt <b>100 millioner</b> av de 283 fondet la fram.</p>
        <p>Legg til den siste, som få nevner: <b>spreaden lukker seg underveis</b>. De
        billigste og enkleste målene kjøpes først. Kandidat 18 er dyrere enn kandidat 3,
        både fordi de gode er borte og fordi selgerne har sett hva naboen fikk. Regner du
        arbitrasjen med én snittmultippel for alle 22, har du regnet med kandidat 3 sin pris
        for hele programmet.</p>`,
      krav: [
        "Du sier formelen før du setter inn tall: kjøpt EBITDA ganger multippeldifferansen.",
        "Du oversetter tallet til avkastning på innsatt kapital, ikke bare til et beløp.",
        "Du sier eksplisitt at dette er før synergier. Det er hele poenget med multippelarbitrasje.",
        "Du reiser normaliseringen selv, uten å bli presset, og regner hva den gjør med inngangsmultippelen.",
        "Du regner sensitiviteten på minst én variabel og sier hva den gjør med konklusjonen.",
        "Du trekker fra integrasjonskostnad før du sier «netto verdi».",
        "Du peker på at snittmultippelen stiger utover i programmet, i stedet for å behandle 5,8x som en konstant.",
      ],
      felle: "Å regne 10 minus 5,8 ganger kjøpt omsetning i stedet for ganger kjøpt EBITDA. Multippelen er på inntjening, ikke på topplinje. Det gir 3 150 millioner i stedet for 283, og et tall som er elleve ganger for stort blir ikke fanget opp av magefølelsen hvis du ikke har sagt hva enheten er.",
    },
    {
      art: "syntese",
      sek: 240,
      tittel: "Anbefalingen til komiteen",
      sp: `<p>Investeringskomiteen møtes om ti minutter. Du får <b>halvannet minutt</b>.
        De skal ta stilling til 400 millioner kroner.</p>
        <p class="tiny">Skriv anbefalingen slik du ville sagt den. En anbefaling uten en pris
        eller en betingelse er ikke ferdig.</p>`,
      fasit: `<p>Ta stilling i første setning. Sett en pris. Si hva som ville endret svaret.</p>
        <blockquote><p><b>«Jeg anbefaler at dere kjører programmet, men ikke slik det er lagt
        fram. Sett et tak på 5,5 ganger normalisert EBITDA, og kutt måltallet fra 750 til
        rundt 500 millioner i kjøpt omsetning. Det gir dere 15 bolt-ons i stedet for 22,
        en plattform på rundt 1,55 milliarder i stedet for 1,8, og en avkastning som
        faktisk klarer kravet.»</b></p>
        <p>Tre grunner. For det første finnes ikke dealflowen: det er 765 millioner å kjøpe
        i deres andel av markedet på tre år, og planen krever 758. Dere har null slakk, og
        må nesten tredoble oppkjøpstakten mens dere integrerer. For det andre er prisene i
        screeningen satt på selgerens marginer. Follo Ventilasjon ser ut som 5,0x og er
        7,3x når eieren lønnes til markedspris. Gjør dere den regningen på hele porteføljen,
        er den reelle inngangsmultippelen nærmere 7,5 enn 5,8, og arbitrasjen halveres fra
        283 til 133 millioner. For det tredje forsvinner resten i integrasjon: 22 bolt-ons
        koster rundt 33 millioner å knytte sammen, og da står det igjen omtrent 100 av de
        283 millionene planen lover.</p>
        <p>Tre betingelser, og jeg ville gjort dem til vilkår i mandatet, ikke til gode råd.
        Én: ingen indikativt bud før EBITDA er normalisert med markedslønn for daglig leder
        og uten prosjektinntekter som utløper. To: minst 30 prosent av vederlaget som
        earn-out over tre år, knyttet til at eieren blir. I denne bransjen er montørene den
        knappe ressursen, ikke kundene, og montørene følger eieren ut døren. Tre: bare fylker
        der dere allerede har avdeling. Nordvest Elektro er det beste selskapet på lista og
        skal likevel sies nei til: 8x, tre budgivere, og null tetthet å høste i Møre og
        Romsdal. Det er en ny plattform, ikke en bolt-on.</p>
        <p>Den ene tingen som ville snudd meg: hvis dere kan vise at de fire oppkjøpene dere
        allerede har gjort er fullt integrert, med felles innkjøpsavtaler og montører som
        faktisk krysser mellom fagene, så tåler organisasjonen et større program, og da ville
        jeg gått med på 20 bolt-ons. Det jeg ville testet først, er hva som skjedde med
        bemanningen i de fire selskapene tolv måneder etter kjøpet.»</p></blockquote>
        <p><b>Hvorfor 5,5x og 500 millioner, og ikke noe annet.</b> En anbefaling med et
        tall i seg må tåle at noen spør hvor tallet kommer fra. 500 millioner i kjøpt
        omsetning er 15 selskaper, altså 65 prosent av det som er å få tak i, ikke 99. Til
        5,5x på 8 prosent normalisert margin er kjøpesummen 220 millioner, verdien inne i
        plattformen 400 millioner, og integrasjonen rundt 22 millioner. Det gir 1,7 ganger
        pengene på tre år på arbitrasjen alene, altså rundt 20 prosent, og da ligger innkjøps-
        og kryssalgssynergiene på toppen i stedet for å være det som redder regnestykket.
        Til 5,8x på selgerens marginer er det motsatt.</p>
        <p><b>Ett poeng til, hvis noen spør om konkurransemyndighetene.</b> Meldeplikt til
        Konkurransetilsynet utløses når to av foretakene hver omsetter for over 100 millioner
        i Norge og til sammen over én milliard. Plattformen passerer milliarden tidlig, men
        ingen av målene i screeningen er over 100 millioner. Programmet er derfor ikke
        meldepliktig, og det er en del av grunnen til at roll-ups fungerer i Norge. Nordvest
        Elektro på 95 millioner ligger like under grensen, og det er verdt å vite før man
        forhandler seg opp.</p>`,
      krav: [
        "Anbefalingen kommer i første setning, og den tar stilling i stedet for å liste hensyn.",
        "Det står en pris i svaret, ikke bare et ja eller et nei. En multippel med grunnlag oppgitt, ikke bare «vær forsiktig med prisen».",
        "Du bruker tall fra casen, og de riktige: 765 mot 758, 5,8x mot 7,5x, 283 mot 133.",
        "Du sier hva komiteen skal gjøre annerledes, konkret nok til at det kan skrives inn i et mandat.",
        "Du nevner fagarbeiderne som den reelle risikoen, ikke bare integrasjon generelt.",
        "Du sier hva som ville endret svaret ditt, og hva du ville testet først.",
        "Du sier nei til den mest fristende kandidaten, og begrunner det.",
        "Du holder deg innenfor halvannet minutt.",
      ],
      felle: "Å anbefale kjøp uten tak på prisen. Grunnspørsmålet i en kommersiell due diligence er ikke om selskapet er bra, men om planen som ligger i prisen holder. Et godt selskap til feil multippel er fortsatt en dårlig transaksjon, og «ja, men vær disiplinert på pris» er ikke en anbefaling, det er en tilbaketrekning.",
    },
  ],
}
