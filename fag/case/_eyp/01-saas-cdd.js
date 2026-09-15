/* Buy-side commercial due diligence på et nordisk B2B-SaaS-selskap.
   TMT er 41 prosent av norsk PE-dealflow, så dette er statistisk den mest
   sannsynlige casen. Formen følger EY-Parthenons egen kandidatpakke:
   estimer markedet, finn driverne, les eksibitet, vei muligheter mot risiko,
   og lever en anbefaling med pris eller betingelse i seg. */
{
  id: "eyp-saas-cdd",
  label: "SaaS-selskapet til seks ganger ARR",
  kategori: "EY-Parthenon",
  type: "PE-vurdering",
  nivå: "Intro",
  firma: "EY-Parthenon",
  stil: "candidate-led",
  minutter: 30,
  ch: [],
  blurb: "Buy-side CDD på et nordisk B2B-SaaS-selskap. Trener ARR mot omsetning, kronechurn mot logo-churn, og en anbefaling som har en pris i seg.",
  prompt: `<p>Klienten er <b>Nordkapp Partners</b>, et nordisk oppkjøpsfond. De vurderer å kjøpe
    <b>Fagtakt AS</b>, et norsk programvareselskap som selger ordre-, time- og
    dokumentasjonssystem til tekniske installatører og håndverksbedrifter i Norden. Selskapet
    eies i dag av et annet fond, som har hatt det i fire år og nå selger.</p>
    <p>Fagtakt omsatte for <b>250 millioner kroner</b> siste tolv måneder, med
    <b>50 millioner i EBITDA</b>, og har vokst rundt <b>18 prosent</b> i året. Selger vil ha
    <b>1,2 milliarder kroner</b>. Nordkapp krever <b>2,5 ganger pengene på fem år</b>.</p>
    <p><b>Bør de kjøpe?</b></p>`,
  bakgrunn: `<p>Casen er konstruert, men settingen er hentet rett fra EY-Parthenon Oslos egen
    kvartalsrapport: TMT står for 41 prosent av norsk PE-dealflow og er den enkeltvis mest
    sannsynlige casen du kan få. Bransjen under, teknisk installasjon, er samtidig en av de mest
    fragmenterte i Norge, med tusenvis av små eierdrevne firma. Det gjør vertikal programvare til
    en troverdig norsk PE-tese.</p>
    <p>Det som gjør en SaaS-case til god trening, er at nøkkeltallene er bygget for å se pene ut.
    Omsetning, netto inntektsretensjon og et veksttall på 18 prosent kan alle stå side om side og
    fortelle tre ulike historier. Jobben i en commercial due diligence er ikke å vurdere om
    Fagtakt er et bra selskap. Den er å svare på om planen kjøperen betaler for, faktisk holder.
    Derfor må anbefalingen din ende i en pris eller en betingelse.</p>`,
  trinn: [
    {
      art: "oppklaring",
      sek: 180,
      tittel: "Hva vil du vite før du begynner?",
      sp: `<p>Du har hørt prompten, og du har fire tall: 250 millioner i omsetning,
        50 i EBITDA, 18 prosent vekst og en prisantydning på 1,2 milliarder.
        <b>Hva spør du om før du strukturerer?</b></p>`,
      fasit: `<p>I en programvarecase finnes det ett spørsmål som må komme først, og som
        overraskende mange hopper over: <b>hvor mye av de 250 millionene er gjentakende?</b>
        En krone i abonnement og en krone i konsulenttimer er ikke verdt det samme for en
        kjøper, og de prises ikke likt.</p>
      <p>Tre til fem spørsmål er nok. De sterke gjør tre ting: de deler opp topplinjen, de
        splitter veksten, og de får fram fondets egne premisser.</p>
      <ul>
        <li><b>Hvordan fordeler omsetningen seg på abonnement og tjenester?</b> Og hva er ARR,
          altså abonnementene annualisert slik de står i dag? ARR og omsetning er sjelden samme
          tall i et selskap som vokser.</li>
        <li><b>Hva består de 18 prosentene av?</b> Prisøkning, flere brukere hos eksisterende
          kunder, nye kunder, eller oppkjøp. Fire helt ulike historier, samme veksttall. Dette
          er det skarpeste spørsmålet du kan stille i en CDD.</li>
        <li><b>Hvordan ser retensjonen ut?</b> Be om churn både i antall kunder og i kroner,
          og om netto inntektsretensjon. Be gjerne også om hva de fem største kundene utgjør.</li>
        <li><b>Hva er fondets tese, holdeperiode og exit-plan?</b> Hvem kjøper dette av Nordkapp
          om fem år, og på hvilken multippel? Uten det kan du ikke svare på prisen.</li>
      </ul>
      <p><b>Svarene du får:</b></p>
      <ul>
        <li>Abonnement <b>190 millioner</b>, tjenester som implementering og kurs
          <b>60 millioner</b>. ARR ved utgangen av perioden er <b>200 millioner</b>.</li>
        <li>Bruttomargin <b>85 prosent</b> på programvaren, <b>25 prosent</b> på tjenestene.</li>
        <li>Veksten er organisk. Ingen oppkjøp i perioden.</li>
        <li>Norge står for <b>rundt 70 prosent</b> av ARR. Resten er Sverige og Danmark.</li>
        <li>Salgs- og markedskostnad er <b>40 millioner</b> i året.</li>
        <li>Holdeperioden er fem år. Exit til en industriell kjøper eller et større fond.</li>
      </ul>
      <p>Legg merke til hva du <i>ikke</i> spør om: hvor stort markedet er. Det skal du bygge selv.</p>`,
      krav: [
        "Du spør hvor mye av de 250 millionene som er gjentakende inntekt. Uten det vet du ikke hva du kjøper.",
        "Du skiller ARR fra omsetning, og spør etter begge.",
        "Du splitter veksten: pris, flere brukere, nye kunder, eller oppkjøp.",
        "Du spør om fondets holdeperiode og exit, fordi prisen er en del av svaret.",
        "Du sier hva hvert spørsmål skal brukes til, i stedet for å lese en liste.",
      ],
      felle: "Å behandle omsetning og ARR som samme tall. Det er den vanligste feilen i en programvarecase, og den forplanter seg helt inn i verdsettingen.",
    },
    {
      art: "struktur",
      sek: 300,
      tittel: "Strukturer investeringsbeslutningen",
      sp: `<p>Bygg strukturen du ville tegnet på arket for å avgjøre om Nordkapp bør kjøpe Fagtakt.
        <b>Avslutt med hypotesen din</b> og med hvilken gren du starter i.</p>`,
      fasit: `<p>En commercial due diligence har fire moduler, og rekkefølgen er ikke tilfeldig.
        Et voksende marked bærer en middelmådig plan, og et krympende marked drukner en god.
        Derfor markedet først.</p>
      <div class="formula"><div class="eq">Er markedet stort nok? → Kan de fortsette å vinne? → Holder enhetsøkonomien? → Hva er det verdt, og hva kan velte det?</div></div>
      <p>Det som skiller en sterk struktur fra en mal, er at grenene er <i>dette selskapets</i>
        grener. En SaaS-struktur ser slik ut:</p>
      <ul>
        <li><b>Markedet:</b> ikke «størrelse og vekst», men ligningen under. Antall
          installatørbedrifter i målgruppen × montører per bedrift × pris per bruker per år ×
          hvor stor andel som allerede har et system. Og så det samme for Sverige, Danmark og
          Finland, fordi Norge alene er lite.</li>
        <li><b>Konkurranseposisjon:</b> i vertikal programvare er vollgraven <i>byttekostnad</i>.
          Systemet ligger i arbeidsflyten, montørene er opplært, og historikk og
          samsvarsdokumentasjon ligger inne. Spørsmålet er om det gir prismakt, og om de vinner
          eller taper mot de andre nordiske aktørene.</li>
        <li><b>Enhetsøkonomi:</b> bygg ARR-broen som en ligning, ikke som en påstand:</li>
      </ul>
      <div class="formula">
        <div class="eq">Utgående ARR = inngående ARR − churn + mersalg + nysalg</div>
        <div class="where">Og ved siden av den: bruttomargin på programvare mot tjenester, samt
          hva en ny kunde koster å skaffe og hvor lang tid den bruker på å betale seg tilbake.</div>
      </div>
      <ul>
        <li><b>Risiko og pris:</b> kundekonsentrasjon, avhengighet av enkeltpersoner, og hva
          1,2 milliarder impliserer i multippel. Siste ledd er alltid det samme: hva må være sant
          for at 2,5 ganger pengene skal gå opp?</li>
      </ul>
      <p><b>Hypotesen:</b> Fagtakt er sannsynligvis ledende i et lite hjemmemarked. Da ligger
        veksten som er igjen i Norden og i mersalg, ikke i flere norske kunder. Jeg starter med å
        regne det norske markedet, fordi det avgjør hvor mye takhøyde som er igjen hjemme.</p>`,
      krav: [
        "Du strukturerer som en investeringsbeslutning, ikke som en lønnsomhetsanalyse.",
        "Du bygger ARR-broen som ligning: inngående ARR minus churn, pluss mersalg, pluss nysalg.",
        "Du skiller programvare fra tjenester. De har ulik margin og er ulikt mye verdt for en kjøper.",
        "Du har en egen gren for pris og avkastningskrav, ikke bare for om selskapet er bra.",
        "Du sier hvilken gren du starter i, og hvorfor.",
        "Grenene overlapper ikke, og dekker til sammen beslutningen.",
      ],
      felle: "Å åpne med inntekter minus kostnader. Dette er ikke en lønnsomhetscase, det er en investeringsbeslutning med en pris i seg, og lønnsomhetstreet er den tydeligste feilnavigeringen du kan gjøre i en EY-Parthenon-case.",
    },
    {
      art: "regne",
      sek: 360,
      tittel: "Hvor stort er det norske markedet?",
      sp: `<p>Fagtakt selger per bruker, altså per montør, med en månedspris.
        <b>Hvor stort er det norske markedet for denne typen programvare, målt i årlig
        omsetning i millioner kroner?</b></p>
        <p class="tiny">Bygg det nedenfra. Si forutsetningene høyt før du regner, og
        sanity-sjekk svaret til slutt. Norge har 5,63 millioner innbyggere og
        207 800 bedrifter med ansatte.</p>`,
      svar: 480,
      enhet: "millioner kroner",
      toleranse: 0.05,
      fasit: `<p>Norge er lite nok til at du faktisk kan telle. Det er selve fordelen ved en norsk
        case: nevnerne er kjente, og hvert trinn er etterprøvbart. Bygg i fire ledd, og si tallet
        høyt for hvert av dem.</p>
      <div class="formula">
        <div class="eq">208 000 bedrifter med ansatte × 12 % i bygg, anlegg og teknisk installasjon = 25 000 bedrifter</div>
        <div class="eq">25 000 × 40 % som er store nok til å trenge et system (3 montører eller mer) = 10 000 bedrifter</div>
        <div class="eq">10 000 bedrifter × 8 montører i snitt = 80 000 brukere</div>
        <div class="eq">80 000 × 500 kr per måned × 12 = <b>480 millioner kroner</b></div>
        <div class="where">Forutsetningene er dine egne. En annen kandidat kan lande på
          350 eller 650 millioner og ha like rett, så lenge hvert ledd er begrunnet. Det er
          strukturen intervjueren vurderer, ikke desimalene.</div>
      </div>
      <p><b>Sanity-sjekken:</b> et stort norsk B2B-nisjemarked ligger på 2 til 5 milliarder.
        Et halvt milliard for programvare til én bransje er en troverdig størrelsesorden. Hadde
        du landet på 20 milliarder, ville du vært på nivå med en tiendedel av hele
        dagligvarehandelen, og da har du regnet feil med to nuller.</p>
      <p><b>Og så det som faktisk betyr noe, altså «så hva»:</b></p>
      <ul>
        <li>Fagtakt har 70 prosent av 200 millioner i ARR i Norge, altså <b>140 millioner</b>.
          Mot et marked på 480 millioner er det <b>29 prosent markedsandel</b>. De er ikke en
          utfordrer, de er lederen.</li>
        <li>Da er det hjemlige takhøyden liten. Å doble seg i Norge betyr å ta halve markedet.</li>
        <li>Norden er rundt <b>fire ganger</b> Norge for denne typen programvare, altså i
          størrelsesorden <b>1,9 milliarder</b>. Utenfor Norge har Fagtakt 60 millioner av rundt
          1,4 milliarder, altså <b>drøyt 4 prosent</b>. <i>Der</i> ligger veksten, hvis den
          finnes.</li>
      </ul>
      <p>Det er den observasjonen som skal bæres videre i casen: veksthistorien må komme fra
        Norden eller fra mersalg, ikke fra flere norske kunder.</p>`,
      krav: [
        "Du bygger nedenfra og sier hvert ledd høyt før du multipliserer.",
        "Du bruker et norsk anker, for eksempel de 208 000 bedriftene med ansatte, i stedet for å gjette en prosent av BNP.",
        "Du sanity-sjekker mot en kjent størrelsesorden og sier at svaret er et anslag, ikke en måling.",
        "Du regner ut markedsandelen etterpå og sier hva den betyr for veksten.",
        "Du oppgir enhet: millioner kroner per år, ikke bare et tall.",
      ],
      felle: "Å importere amerikanske størrelsesordener. Lander du på 20 milliarder for programvare til én norsk bransje, er tallet feil med to nuller, og hele resten av casen bygges på det.",
    },
    {
      art: "exhibit",
      sek: 360,
      tittel: "Kundebasen, år for år",
      sp: `<p>Intervjueren legger fram kundetallene for det siste året, brutt ned på hvor mange
        montører kunden har. Alle kronetall er i millioner.</p>
        <p><b>Hva ser du, og hva betyr det for investeringstesen?</b></p>`,
      figur: `<table class="data">
          <tr>
            <th>Kundesegment</th>
            <th class="n">Kunder ved årets start</th>
            <th class="n">ARR ved årets start</th>
            <th class="n">Kunder tapt i året</th>
            <th class="n">ARR tapt i året</th>
            <th class="n">Mersalg på beholdte kunder</th>
          </tr>
          <tr><td>1–4 montører</td><td class="n">1 560</td><td class="n">34,0</td><td class="n">94</td><td class="n">2,0</td><td class="n">3,0</td></tr>
          <tr><td>5–19 montører</td><td class="n">720</td><td class="n">68,0</td><td class="n">36</td><td class="n">3,4</td><td class="n">8,0</td></tr>
          <tr><td>20 montører eller flere</td><td class="n">240</td><td class="n">68,0</td><td class="n">20</td><td class="n">12,6</td><td class="n">12,0</td></tr>
          <tr><td><b>Sum</b></td><td class="n"><b>2 520</b></td><td class="n"><b>170,0</b></td><td class="n"><b>150</b></td><td class="n"><b>18,0</b></td><td class="n"><b>23,0</b></td></tr>
        </table>
        <p class="tiny">ARR ved utgangen av året var 200,0 millioner. Prislistene ble justert opp
          8 prosent ved fornyelse i år. Selskapet oppgir netto inntektsretensjon på 103 prosent.</p>`,
      fasit: `<p>Si overskriften først, så beviset. Overskriften her er:</p>
      <p><i>«Churnen ser lav ut i antall kunder og høy ut i kroner, fordi det er de største
        kundene som forsvinner. Og retensjonen over 100 prosent er i hovedsak en prisøkning,
        ikke en voksende kundebase.»</i></p>
      <p><b>Det første regnestykket: churn på to måter.</b></p>
      <ul>
        <li>Logo-churn: 150 av 2 520 kunder = <b>6,0 prosent</b>. Det høres helt greit ut.</li>
        <li>Kronechurn: 18,0 av 170,0 millioner = <b>10,6 prosent</b>. Nesten dobbelt så høyt.</li>
        <li>En tapt kunde hadde i snitt 120 000 i ARR. Snittkunden har 67 000. De som går, er
          altså nesten dobbelt så store som de som blir.</li>
      </ul>
      <p><b>Det andre regnestykket: hvor det skjer.</b> I det største segmentet er logo-churnen
        8,3 prosent, men kronechurnen 18,5 prosent. Selv inne i storkundesegmentet er det de
        aller største som forsvinner: en tapt storkunde hadde 630 000 i ARR mot 283 000 for
        segmentet. Og dette segmentet er <b>40 prosent av hele ARR-en fordelt på 10 prosent av
        kundene</b>. Det er konsentrasjonsrisiko og churn i samme rad.</p>
      <p><b>Det tredje regnestykket, og det som skiller sterkt fra middels: hva NRR-en består av.</b>
        Selskapets tall stemmer:</p>
      <div class="formula">
        <div class="eq">NRR = (170,0 − 18,0 + 23,0) ÷ 170,0 = 175 ÷ 170 = 103 %</div>
      </div>
      <p>Men prisjusteringen på 8 prosent gjelder den beholdte basen på 152 millioner, og gir alene
        rundt <b>12 millioner</b> av de 23 i mersalg. Bare 11 millioner er flere montører og flere
        moduler. Regner du NRR uten prisøkningen:</p>
      <div class="formula">
        <div class="eq">NRR uten pris = (170,0 − 18,0 + 11,0) ÷ 170,0 = 163 ÷ 170 = <b>96 %</b></div>
        <div class="where">Den eksisterende kundebasen krympet altså med 7 millioner i året. Den
          vokste ikke. Prislisten vokste.</div>
      </div>
      <p><b>Og til slutt, ARR-broen:</b> 170,0 − 18,0 + 23,0 = 175,0, mens utgående ARR er 200,0.
        Nysalget må derfor ha vært <b>25 millioner</b>. Av årets vekst på 30 millioner kommer
        altså 25 fra nye kunder, og bare 5 netto fra den eksisterende basen. Uten prisøkningen
        hadde ARR vokst <b>10,6 prosent</b>, ikke 17,6.</p>
      <p>Én ting til, siden du nå har nysalget: med 40 millioner i salgs- og markedskostnad og
        85 prosent bruttomargin på programvaren tar en ny kunde rundt
        <b>23 måneder</b> på å betale seg tilbake. Det er i overkant for en abonnementsmodell,
        og det gjør vekst dyrt akkurat når selskapet trenger mer av den.</p>`,
      krav: [
        "Du regner churn på begge måter, i antall kunder og i kroner, og sier hvorfor de spriker.",
        "Du finner hvor det skjer: det er storkundene, og det er de aller største av dem.",
        "Du tar tak i prisjusteringen på 8 prosent og regner om NRR uten den. Det er hele innsikten.",
        "Du lukker ARR-broen og finner nysalget på 25 millioner som differansen.",
        "Du sier konklusjonen først, i stedet for å lese tabellen rad for rad.",
        "Du kobler funnet til tesen: vekst fra nye kunder, ikke fra en voksende base.",
      ],
      felle: "Å godta netto inntektsretensjon på 103 prosent som et sunnhetstegn fordi den er over 100. Tallet er riktig regnet og likevel misvisende, og hele poenget med eksibitet er å se hva som ligger under det.",
    },
    {
      art: "regne",
      sek: 300,
      tittel: "Hva må være sant for at prisen skal gå opp?",
      sp: `<p>Selger vil ha <b>1,2 milliarder</b> for et selskap med <b>200 millioner i ARR</b> og
        <b>50 millioner i EBITDA</b>. Nordkapp krever <b>2,5 ganger pengene på fem år</b>.</p>
        <p>Regn uten gjeld, og legg til grunn at fondet selger på samme ARR-multippel som det
        kjøper på. <b>Hvor høy må ARR være i år fem, i millioner kroner?</b></p>
        <p class="tiny">Si framgangsmåten høyt før du sier tallet, og gjør minst én sensitivitet
        etterpå.</p>`,
      svar: 500,
      enhet: "millioner kroner",
      toleranse: 0.03,
      fasit: `<p>Første grep, hver gang du får en pris: <b>regn ut multippelen</b>. Det er et
        gratis poeng, og uten det har du ingen målestokk.</p>
      <div class="formula">
        <div class="eq">1 200 ÷ 200 = <b>6,0 ganger ARR</b></div>
        <div class="eq">1 200 ÷ 50 = <b>24 ganger EBITDA</b></div>
        <div class="where">Legg merke til at de to tallene forteller samme historie: dette er
          priset som et vekstselskap, ikke som et lønnsomhetsselskap. Da er det veksten som må
          forsvare prisen.</div>
      </div>
      <p>Så selve regnestykket, i tre ledd:</p>
      <div class="formula">
        <div class="eq">Exit-verdi som kreves: 2,5 × 1 200 = 3 000 millioner</div>
        <div class="eq">ARR som kreves ved exit: 3 000 ÷ 6,0 = <b>500 millioner</b></div>
        <div class="eq">Årlig vekst: 500 ÷ 200 = 2,5 ganger på fem år ≈ <b>20 prosent i året</b></div>
        <div class="where">2,5 ganger på fem år tilsvarer rundt 20 prosent årlig vekst. Den
          sammenhengen er verdt å pugge: 1,5x ≈ 8 %, 2,0x ≈ 15 %, 2,5x ≈ 20 %, 3,0x ≈ 25 %.</div>
      </div>
      <p><b>Så hva.</b> Kravet er 20 prosent i året i fem år. Selskapet leverte 17,6 prosent i
        fjor, og etter eksibitet vet du at bare rundt <b>10,6 prosentpoeng</b> av det var volum.
        Resten var en prisjustering på 8 prosent. Planen krever altså nesten det dobbelte av den
        underliggende veksten, i et hjemmemarked der selskapet allerede har 29 prosent andel.</p>
      <p><b>Sensitiviteten, som er det sterkeste enkeltsignalet i en PE-case:</b> exit på
        6,0 ganger er en antakelse, ikke en plan. Faller multippelen til 5,0 ved exit, må ARR opp
        i 600 millioner, altså <b>24,6 prosent årlig</b>. Og en kundebase med 18,5 prosent
        kronechurn blant storkundene er nettopp den typen som får multippelen ned, ikke opp.</p>
      <p>Snu så regnestykket for å finne prisen i stedet for veksten, fordi det er den du skal
        anbefale:</p>
      <div class="formula">
        <div class="eq">Ved 14 % vekst: ARR år 5 = 385 → verdi 2 310 → maks pris 924 millioner (4,6x ARR)</div>
        <div class="eq">Ved 16 % vekst: ARR år 5 = 420 → verdi 2 520 → maks pris 1 008 millioner (5,0x ARR)</div>
        <div class="eq">Ved 20 % vekst: ARR år 5 = 500 → verdi 3 000 → maks pris 1 200 millioner (6,0x ARR)</div>
      </div>`,
      krav: [
        "Du regner ut den implisitte multippelen først: 6,0 ganger ARR og 24 ganger EBITDA.",
        "Du sier høyt at du holder exit-multippelen lik inngangsmultippelen, og at det er en antakelse.",
        "Du oversetter 2,5 ganger på fem år til rundt 20 prosent årlig vekst, uten kalkulator.",
        "Du kobler kravet til funnet i eksibitet: 20 prosent kreves, 10 til 11 prosent er underliggende volumvekst.",
        "Du gjør minst én sensitivitet, for eksempel hva som kreves hvis exit blir 5,0 ganger.",
        "Du oppgir enhet: millioner kroner i ARR, ikke bare et tall.",
      ],
      felle: "Å anta høyere exit-multippel enn inngangsmultippel uten å si det. Multippelekspansjon er en antakelse, ikke en plan, og en PE-klient ser umiddelbart at regnestykket ditt hviler på at noen andre betaler mer enn dere gjorde.",
    },
    {
      art: "syntese",
      sek: 300,
      tittel: "Anbefalingen",
      sp: `<p>Partneren som leder transaksjonen har <b>ett minutt</b>. Gi anbefalingen din.</p>
        <p>Midtveis avbryter hun: <i>«Selger sier at frafallet blant storkundene var et
        engangstilfelle. Tre av dem ble kjøpt opp av en konkurrents eier, og resten gikk på en
        produktmangel som er lukket i den nye versjonen. Endrer det svaret ditt?»</i></p>
        <p class="tiny">Skriv anbefalingen slik du ville sagt den, og ta med hvordan du svarer
        på innvendingen.</p>`,
      fasit: `<p>Topp-ned, og med en pris i seg. En CDD som ender i «det kommer an på», er ikke
        ferdig. Grunnspørsmålet var aldri om Fagtakt er et bra selskap, men om planen kjøperen
        betaler for, holder.</p>
      <blockquote>
        <p><b>«Nei til 1,2 milliarder. Selskapet er godt, men prisen forutsetter 20 prosent ARR-vekst
        i fem år, og den underliggende veksten er rundt 11. Jeg forsvarer 0,9 til 1,0 milliarder,
        altså 4,5 til 5 ganger ARR.»</b></p>
        <p>Tre grunner. For det første er hjemmemarkedet nesten tatt: 140 millioner av et norsk
        marked på rundt 480, altså 29 prosent andel. Veksten må komme fra Norden, der de har drøyt
        4 prosent, og det er en helt annen og dyrere øvelse enn å vokse hjemme.</p>
        <p>For det andre er retensjonen svakere enn nøkkeltallet. NRR på 103 prosent blir 96 når
        jeg tar ut prisjusteringen på 8 prosent. Kronechurnen er 10,6 prosent mot 6 i antall
        kunder, og i storkundesegmentet, som er 40 prosent av ARR, er den 18,5.</p>
        <p>For det tredje er vekst dyrt her: en ny kunde bruker rundt 23 måneder på å betale seg
        tilbake, og det blir verre når nysalget må flyttes til Sverige og Danmark.</p>
        <p>Svaret på innvendingen: det kan stemme, og det er testbart, men jeg endrer ikke
        standpunkt på en forklaring uten data bak. Jeg vil se tapsårsak per kunde for i fjor
        <i>og</i> forfjor, fordi et mønster over to år ikke er en engangshendelse. Jeg vil se
        fornyelsesdatoene for de tjue største kundene de neste tolv månedene. Og jeg vil høre
        produktmangelen bekreftet i kundeintervjuene, ikke bare i selgerens versjon. Holder
        forklaringen, flytter jeg meg opp mot én milliard, ikke til 1,2, fordi prisen fortsatt
        forutsetter at prisøkningen på 8 prosent kan gjentas hvert år hos små håndverksbedrifter.
        Det er to antakelser, ikke én.</p>
        <p>Det som kan velte svaret mitt begge veier, er den nordiske ekspansjonen. Det første jeg
        ville testet, er vinnraten mot de svenske konkurrentene i de siste tjue anbudene.»</p>
      </blockquote>
      <p>Legg merke til formen: <b>standpunkt, pris, tre grunner, håndtert innvending, og hva som
        testes først.</b> Det er den som skiller «distinkt» fra «solid».</p>`,
      krav: [
        "Anbefalingen har en pris eller en betingelse i seg. Ja eller nei uten prispunkt er ikke en ferdig CDD.",
        "Svaret kommer i første setning, ikke etter oppbyggingen.",
        "Du bruker tallene fra casen: 6,0 ganger ARR, 20 prosent kreves, 11 prosent underliggende vekst, 29 prosent markedsandel.",
        "Du tar imot innvendingen uten å kapitulere og uten å avvise den: du sier hva du ville sjekket, og hvor mye det ville flyttet prisen.",
        "Du navngir de to antakelsene prisen hviler på, ikke bare den ene.",
        "Du sier hva du ville testet først, og holder deg innenfor et minutt.",
      ],
      felle: "Å kapitulere så snart partneren presser. Innvendingen er ikke en korreksjon, den er en test av om standpunktet ditt er festet i tall eller i høflighet. Den motsatte feilen er like ille: å avvise ny informasjon fordi den ikke passet analysen din.",
    },
  ],
}
