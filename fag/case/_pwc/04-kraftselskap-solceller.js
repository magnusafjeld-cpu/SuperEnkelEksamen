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
}
