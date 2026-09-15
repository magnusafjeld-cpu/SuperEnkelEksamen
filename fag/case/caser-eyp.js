/* ============== CASETRENING · EY-PARTHENON (S&E) ==============
   Caser rettet mot EY-Parthenons Strategy and Execution-praksis i Oslo.

   Formen følger EY-Parthenons egen kandidatpakke, der begge øvingscasene er
   PE-investeringsvurderinger bygget likt: estimer markedet, finn vekstdriverne,
   les et eksibit, vei muligheter mot risiko, og gi en anbefaling med pris eller
   betingelse i seg.

   Kravene i hvert trinn er skrevet mot EYs egne fire vurderingskriterier:
   problemløsning, tallforståelse, kreativitet og kommunikasjon — der det siste
   uttrykkelig omfatter å svare konstruktivt på motstand og ny informasjon.

   Settingene er norske og hentet fra EY-Parthenon Oslos egen kvartalsrapport
   Transaction Trends. Se docs/case-research/06–09.

   Casene har ingen egen kategori. De ligger blant de vanlige intervjucasene og
   finnes via Stilart-filteret, som filtrerer på `firma`.

   BYGGET FIL — ikke rediger. Kilden er fag/case/_eyp/, bygget med
   tools/bygg-eyp-caser.py.
   ============================================================== */
window.EDU_DATA = window.EDU_DATA || {};
window.EDU_DATA.cases = window.EDU_DATA.cases || [];

window.EDU_DATA.cases.push(
/* Buy-side commercial due diligence på et nordisk B2B-SaaS-selskap.
   TMT er 41 prosent av norsk PE-dealflow, så dette er statistisk den mest
   sannsynlige casen. Formen følger EY-Parthenons egen kandidatpakke:
   estimer markedet, finn driverne, les eksibitet, vei muligheter mot risiko,
   og lever en anbefaling med pris eller betingelse i seg. */
{
  id: "eyp-saas-cdd",
  label: "SaaS-selskapet til seks ganger ARR",
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
},
/* EY-Parthenon · buy-and-build i teknisk installasjon.
   Settingen er EY-Parthenon Oslos egen «case study of the quarter» i Q2 2026:
   fragmentert marked, aldrende eiere, PE-plattformer som ruller opp, 5 til 14
   transaksjoner på tre kvartaler. Se docs/case-research/08, seksjon 2.5 og 5.3.
   Selskapene er konstruerte. Mekanikken og størrelsesordenene er ikke. */
{
  id: "eyp-buy-and-build",
  label: "Plattformen som skal doble seg på tre år",
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
},
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
},
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
);
