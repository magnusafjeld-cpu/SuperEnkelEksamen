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
}
