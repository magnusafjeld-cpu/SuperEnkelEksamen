/* ===================== CASETRENING · CASEBIBLIOTEKET =====================
   Hver case spilles trinn for trinn av js/bundle-case.js. Trinnartene er
   oppklaring · struktur · exhibit · regne · ide · syntese.

   Regel for innholdet: fasiten skal beskrive hva som skiller et sterkt svar
   fra et middels, ikke bare gjengi et riktig svar. Det er skillet kandidater
   taper på.
   ========================================================================= */
window.EDU_DATA = window.EDU_DATA || {};

window.EDU_DATA.cases = [
  {
    id: "kino-lonnsomhet",
    label: "Kinokjeden som taper penger",
    type: "Lønnsomhet",
    nivå: "Intro",
    firma: "Generisk",
    stil: "candidate-led",
    minutter: 30,
    ch: [],
    blurb: "Den klassiske inngangscasen. Trener profitt-treet, isolering av én driver, og forskjellen på et symptom og en årsak.",
    prompt: `<p>Klienten er <b>Nordisk Kino</b>, en kjede med 40 kinoer og 200 saler i Norge og Sverige.
      Selskapet eies av et familiefond som har hatt det i tjue år.</p>
      <p>De siste tre årene har driftsresultatet falt fra 111 til 78 millioner kroner — et fall på 30 prosent —
      <b>samtidig som besøkstallet har vært flatt på 12 millioner billetter i året</b>. Styret er urolig og
      har hyret dere.</p>
      <p><b>Hvorfor faller resultatet, og hva bør klienten gjøre med det?</b></p>`,
    bakgrunn: `<p>Casen er konstruert, men mekanismen er ekte: filmleie er en <i>prosentandel</i> av
      billettinntekten, forhandlet per film, og andelen har steget i hele bransjen etter hvert som
      distribusjonen er blitt konsentrert på færre store aktører. Kinoer tjener derfor stadig mer av
      pengene sine på kiosk og reklame, og stadig mindre på selve billetten.</p>
      <p>Det er også grunnen til at en kinocase er god trening: den ser ut som en volumcase — «besøket må
      ha falt» — men volumet er flatt. Hele svaret ligger i marginen.</p>`,
    trinn: [
      {
        art: "oppklaring",
        sek: 90,
        tittel: "Hva vil du vite før du begynner?",
        sp: `<p>Du har hørt prompten. Før du strukturerer: hvilke spørsmål stiller du?</p>`,
        fasit: `<p>Gode oppklarende spørsmål gjør tre ting: de <b>avgrenser</b> problemet, de <b>avdekker
          klientens mål</b>, og de <b>fjerner en tolkning du ellers måtte gjettet på</b>. To til fire er nok.</p>
          <ul>
            <li><b>Er «driftsresultat» absolutt eller margin, og gjelder fallet begge landene?</b> Hvis Sverige
              er flatt og Norge stuper, er halve casen løst i første spørsmål.</li>
            <li><b>Hva er klientens mål?</b> Tilbake til 111 millioner? En bestemt margin? Skal kjeden selges?
              Et salg om to år gir en helt annen anbefaling enn evig eierskap.</li>
            <li><b>Er besøket flatt fordi markedet er flatt, eller taper vi andel i et voksende marked?</b></li>
            <li><b>Har vi bygget eller lagt ned kinoer i perioden?</b> Endret kapasitet forklarer faste kostnader.</li>
          </ul>`,
        krav: [
          "Du spør om målet, ikke bare om tallene. En case uten mål har ingen anbefaling.",
          "Spørsmålene er få og valgt med hensikt — ikke en sjekkliste du leser opp.",
          "Du sier hvorfor du spør: «Jeg spør fordi svaret endrer hvor jeg leter.»",
          "Du noterer svarene og bruker dem senere i casen.",
        ],
        felle: "Å stille åtte spørsmål på rad uten å si hva de skal brukes til. Det leses som at du utsetter å tenke.",
      },
      {
        art: "struktur",
        sek: 150,
        tittel: "Strukturer problemet",
        sp: `<p>Bryt ned hvorfor driftsresultatet kan ha falt. Skriv nedbrytningen slik du ville tegnet den
          på arket, og <b>avslutt med hypotesen din</b> om hvor problemet ligger.</p>`,
        fasit: `<p>Startpunktet er identiteten, ikke et rammeverk: <b>resultat = inntekter − kostnader</b>.
          Det som skiller en sterk struktur fra en svak, er at grenene er <i>kinoens</i> grener, ikke generiske.</p>
          <div class="formula"><div class="eq">Resultat = (Besøk × Billettpris + Besøk × Kiosk per hode + Reklame) − (Filmleie + Varekost + Lønn + Husleie + Andre faste)</div></div>
          <p>Med besøket oppgitt som flatt kan du <b>si høyt at volumleddet er utelukket</b>, og bruke tiden på
          resten. Det er selve poenget med å strukturere før man regner: du velger bort.</p>
          <ul>
            <li><b>Inntekt per besøkende:</b> billettpris (og miks: 3D, premium, rabatt, honnør) og kiosksalg per hode.</li>
            <li><b>Variable kostnader:</b> filmleie som <i>andel</i> av billettinntekt — den store i denne bransjen — og varekost i kiosken.</li>
            <li><b>Faste kostnader:</b> lønn, husleie, vedlikehold, avskrivning på salsoppgradering.</li>
            <li><b>Utenfor selskapet:</b> strømmetjenester, distributørenes forhandlingsmakt, kortere kinovindu.</li>
          </ul>
          <p><b>Hypotesen:</b> når volumet er flatt og resultatet faller, ligger svaret i marginen per billett —
          og filmleie er den klart største enkeltposten som kan ha flyttet seg.</p>`,
        krav: [
          "Nedbrytningen er kinoens egen, ikke «inntekter, kostnader, marked, konkurrenter».",
          "Du deler inntekt i pris × volum og skiller variable fra faste kostnader.",
          "Du bruker opplysningen om flatt besøk til å eliminere en gren høyt.",
          "Du avslutter med en hypotese og sier hvor du vil lete først.",
          "Grenene overlapper ikke, og til sammen dekker de resultatet (MECE).",
        ],
        felle: "Å hente fram et ferdig rammeverk — 3C, 4P, Porter — og tvinge casen inn i det. Intervjueren ser det umiddelbart, og det er den vanligste grunnen til at en ellers god kandidat ikke går videre.",
      },
      {
        art: "exhibit",
        sek: 120,
        tittel: "Resultatoppstillingen",
        sp: `<p>Intervjueren gir deg tallene for år 1 og år 3. Millioner kroner.
          <b>Hva ser du, og hva betyr det?</b></p>`,
        figur: `<table class="data">
            <tr><th>Millioner kroner</th><th class="n">År 1</th><th class="n">År 3</th><th class="n">Endring</th></tr>
            <tr><td>Billettinntekt</td><td class="n">1 440</td><td class="n">1 560</td><td class="n">+120</td></tr>
            <tr><td>Kiosk</td><td class="n">504</td><td class="n">540</td><td class="n">+36</td></tr>
            <tr><td>Reklame og utleie</td><td class="n">96</td><td class="n">100</td><td class="n">+4</td></tr>
            <tr><td><b>Sum inntekter</b></td><td class="n"><b>2 040</b></td><td class="n"><b>2 200</b></td><td class="n"><b>+160</b></td></tr>
            <tr><td>Filmleie</td><td class="n">648</td><td class="n">780</td><td class="n">+132</td></tr>
            <tr><td>Varekost kiosk</td><td class="n">151</td><td class="n">162</td><td class="n">+11</td></tr>
            <tr><td>Lønn</td><td class="n">570</td><td class="n">620</td><td class="n">+50</td></tr>
            <tr><td>Husleie</td><td class="n">360</td><td class="n">380</td><td class="n">+20</td></tr>
            <tr><td>Andre faste</td><td class="n">200</td><td class="n">180</td><td class="n">−20</td></tr>
            <tr><td><b>Driftsresultat</b></td><td class="n"><b>111</b></td><td class="n"><b>78</b></td><td class="n"><b>−33</b></td></tr>
          </table>`,
        fasit: `<p>Rekkefølgen betyr noe. Si <b>overskriften først</b>, så beviset:</p>
          <p><i>«Inntektene har faktisk vokst 160 millioner. Hele resultatfallet ligger på kostnadssiden, og
          én post dominerer: filmleie er opp 132 millioner — fire ganger så mye som hele resultatfallet.»</i></p>
          <p>Det avgjørende neste steget er å regne filmleien <b>som andel av billettinntekten</b>, ikke i kroner:</p>
          <ul>
            <li>År 1: 648 / 1 440 = <b>45 %</b></li>
            <li>År 3: 780 / 1 560 = <b>50 %</b></li>
          </ul>
          <p>Da ser du at det ikke er en volumeffekt. Distributørene har tatt fem prosentpoeng mer av hver
          billettkrone. Billettinntekten vokste 8,3 %, men filmleien vokste 20,4 %.</p>`,
        krav: [
          "Du sier konklusjonen først, ikke en rad-for-rad-opplesning av tabellen.",
          "Du ser at inntektene vokste — problemet er ikke topplinjen.",
          "Du regner filmleie som andel, ikke bare i kroner. Det er hele innsikten.",
          "Du legger merke til at «andre faste» faktisk falt 20 — noen har allerede kuttet.",
        ],
        felle: "Å lese tabellen høyt fra topp til bunn. Intervjueren kan lese. Det de vil vite er hva du ser i den.",
      },
      {
        art: "regne",
        sek: 90,
        tittel: "Hva koster de fem prosentpoengene?",
        sp: `<p>Filmleien har steget fra 45 % til 50 % av billettinntekten.
          <b>Hvor mye koster de fem prosentpoengene klienten i år 3, i millioner kroner?</b></p>
          <p class="tiny">Regn det på papir, og si framgangsmåten høyt før du sier tallet.</p>`,
        svar: 78,
        enhet: "millioner kroner",
        toleranse: 0.02,
        fasit: `<p>Sammenlign faktisk filmleie med det den ville vært på gammel sats, på dagens inntekt:</p>
          <div class="formula">
            <div class="eq">Filmleie ved 45 %: 0,45 × 1 560 = 702</div>
            <div class="eq">Faktisk filmleie: 780</div>
            <div class="eq">Differanse: 780 − 702 = <b>78 millioner</b></div>
            <div class="where">Eller rett fram: 0,05 × 1 560 = 78. Fem prosentpoeng av 1 560 er 78 — det er
              samme regnestykke, og det er slik du bør si det høyt.</div>
          </div>
          <p><b>Og her ligger poenget de fleste går glipp av:</b> 78 millioner er mer enn hele resultatfallet
          på 33 millioner. Satsøkningen <i>overforklarer</i> nedgangen. Resten av selskapet har altså blitt
          <b>45 millioner bedre</b> i samme periode — høyere priser, bedre kiosksalg, kutt i andre faste
          kostnader. Å si det er det som skiller en sterk kandidat fra en som stopper ved «filmleien opp».</p>`,
        krav: [
          "Du regner mot dagens inntektsgrunnlag, ikke mot fjorårets.",
          "Du sier framgangsmåten før tallet.",
          "Du ser at 78 er større enn 33, og trekker den riktige slutningen av det.",
          "Du oppgir enhet — millioner kroner, ikke bare «78».",
        ],
        felle: "Å regne 5 % av 780 (= 39) i stedet for 5 prosentpoeng av 1 560. Prosent av feil grunnlag er den vanligste regnefeilen i caseintervjuer.",
      },
      {
        art: "ide",
        sek: 120,
        tittel: "Hva kan klienten gjøre?",
        sp: `<p>Du vet nå hvor pengene forsvinner. <b>List så mange tiltak du klarer på to minutter.</b>
          Én per linje. Ikke sorter ennå — få dem ut først.</p>`,
        liste: [
          "Reforhandle filmleien: lengre avtaler eller volumrabatt mot garantert antall visninger",
          "Vri programmeringen mot filmer med lavere sats — eldre titler, uavhengige distributører, repriser",
          "Forhandle synkende sats med spillelengde (filmleien faller typisk uke for uke) og hold filmene lenger",
          "Øke inntekten per besøkende med premiumsaler, resepsjon, 4DX — der billetten kan prises høyere",
          "Vokse kioskomsetningen per hode: kombotilbud, forhåndsbestilling, alkoholservering",
          "Bygge ut reklame og salsutleie: konferanser, e-sport, direktesending av sport og opera",
          "Innføre abonnement eller medlemskap som flytter kunden fra billett til fast månedsbeløp",
          "Dynamisk prising etter tidspunkt, ukedag og etterspørsel",
          "Kutte kapasitet: legge ned de svakeste salene eller kinoene",
          "Redusere bemanningskost med automatiserte billettluker og selvbetjent kiosk",
          "Reforhandle husleie, eller reforhandle mot omsetningsbasert leie",
          "Gå sammen med andre kjeder om felles innkjøpsmakt mot distributørene",
        ],
        fasit: `<p>Strukturen i idémyldringen teller mer enn antallet. Si <b>hvordan du deler dem opp</b> før
          du begynner å liste — for eksempel «tiltak mot filmleien, tiltak på andre inntekter, og tiltak på
          kostnadsbasen» — og gruppér mens du snakker.</p>
          <p>Avslutt med å <b>prioritere</b>: hvilke to har størst effekt, og hvilket kan klienten gjøre først?
          Her peker analysen på filmleien, fordi det er der pengene faktisk forsvant.</p>`,
        krav: [
          "Du sier oppdelingen din før du lister — ikke en usortert strøm.",
          "Idéene favner både inntektssiden og kostnadssiden.",
          "Minst én idé angriper årsaken direkte, altså selve filmleiesatsen.",
          "Du prioriterer til slutt i stedet for å la listen ligge flat.",
        ],
        felle: "Å bare liste kostnadskutt. Analysen viste at inntektene vokser — en anbefaling som bare kutter, overser at problemet er en prisandel, ikke sløsing.",
      },
      {
        art: "syntese",
        sek: 90,
        tittel: "Anbefalingen",
        sp: `<p>Styrelederen kommer inn i rommet og har <b>ett minutt</b>. Gi anbefalingen din.</p>
          <p class="tiny">Skriv den slik du ville sagt den — ikke som notater.</p>`,
        fasit: `<p>Topp-ned, alltid. Svaret først, så begrunnelsen, så hva som må skje.</p>
          <blockquote><p><b>«Resultatet faller fordi distributørene har tatt fem prosentpoeng mer av hver
          billettkrone. Det koster dere 78 millioner i året — mer enn hele resultatfallet. Jeg anbefaler at
          dere angriper filmleien direkte.»</b></p>
          <p>Tre grunner: For det første er inntektene ikke problemet — de vokste 160 millioner på tre år.
          For det andre er filmleie den eneste kostnadsposten som har flyttet seg vesentlig, opp 132
          millioner. For det tredje har dere allerede kuttet det som lot seg kutte andre steder, så de
          45 millionene resten av driften har forbedret seg med, blir spist opp av satsøkningen.</p>
          <p>Konkret: reforhandle med de to største distributørene, som står for mesteparten av visningene,
          og bygg forhandlingsmakt ved å vri programmeringen mot titler med lavere sats. Parallelt bør dere
          vokse kiosk og reklame, der dere beholder hver krone.</p>
          <p>Den store risikoen er at forhandlingsmakten ligger hos distributørene, ikke hos dere.
          Neste steg jeg ville tatt, er å regne på hvor mye av besøket som faktisk er drevet av de fem
          største titlene — det avgjør om dere har noe å forhandle med.»</p></blockquote>`,
        krav: [
          "Svaret kommer i første setning, ikke etter oppbyggingen.",
          "Du bruker tall fra casen, ikke generelle utsagn.",
          "Du sier hva klienten skal gjøre, ikke bare hva som er galt.",
          "Du nevner risiko og neste steg — det er det som skiller «distinkt» fra «solid».",
          "Du holder deg innenfor et minutt.",
        ],
        felle: "Å gjenfortelle casen kronologisk før konklusjonen kommer. Klienten har vært med hele veien; det de vil ha, er svaret.",
      },
    ],
  },
  {
    id: "marked-lading-sverige",
    label: "Ladeoperatøren som vil til Sverige",
    type: "Markedsinngang",
    nivå: "Middels",
    firma: "Generisk",
    stil: "candidate-led",
    minutter: 35,
    ch: [],
    blurb: "Markedsinngang i ren form: er markedet stort nok, kan vi vinne der, og hvor mye av markedet må vi ha bare for å gå i null? Trener breakeven oversatt til markedsandel.",
    prompt: `<p>Klienten er <b>Nordlys Lading</b>, en norsk hurtigladeoperatør med 320 ladepunkter
      fordelt på 80 stasjoner langs E6, E18 og E39. Selskapet eies av et infrastrukturfond.</p>
      <p>Det norske markedet nærmer seg metning: 32 prosent av personbilparken er allerede
      helelektrisk, og de beste tomtene i hver by er tatt. Styret vil derfor <b>inn i Sverige</b>
      med 60 nye stasjoner — en investering på 180 millioner kroner.</p>
      <p><b>Bør de gjøre det?</b></p>`,
    bakgrunn: `<p>Casen er konstruert, men markedsmekanikken er ekte. Hurtiglading er en
      <i>fastkostnadsforretning med tynn margin per enhet</i>: strøm, nettleie og
      korttransaksjon spiser mesteparten av kronen kunden betaler, mens tomteleie,
      nettilknytning, kapitalkostnad og en svensk organisasjon løper videre enten det står en
      bil der eller ikke. Når kostnadsbasen er fast, er utnyttelsen alt.</p>
      <p>Det som gjør Sverige til god trening, er at markedet er <b>lite i dag og stort
      senere</b>. Den svenske elbilandelen ligger omtrent der den norske lå for et tiår siden.
      En kandidat som regner breakeven mot dagens marked får ett svar; en som regner mot
      markedet i det året anlegget faktisk står ferdig, får et helt annet. Spørsmålet er derfor
      sjelden <i>om</i> markedet kommer, men om klienten har råd til å vente på det — og om
      tomtene fortsatt er ledige når det gjør det.</p>`,
    trinn: [
      {
        art: "oppklaring",
        sek: 90,
        tittel: "Hva vil du vite før du begynner?",
        sp: `<p>Du har hørt prompten. Før du strukturerer: hvilke spørsmål stiller du?</p>`,
        fasit: `<p>I en markedsinngangscase er de tre viktigste avklaringene alltid de samme:
          <b>hva er målet</b>, <b>hva er alternativet</b>, og <b>hva er beskrankningen</b>.
          To til fire spørsmål er nok.</p>
          <ul>
            <li><b>Hva er målet, og på hvilken horisont?</b> Avkastning på 180 millioner innen
              fem år er én sak. Å sikre tomter før konkurrentene, i påvente av et marked som
              kommer om ti år, er en helt annen — og gir motsatt anbefaling.</li>
            <li><b>Hva er alternativbruken av de 180 millionene?</b> Kan de investeres i Norge?
              Fondet har et avkastningskrav, og Sverige må slå det beste alternativet, ikke bare
              slå null.</li>
            <li><b>Må vi bygge selv, eller kan vi kjøpe oss inn?</b> Det finnes lokale svenske
              operatører. Spørsmålet endrer hele fjerde gren av strukturen.</li>
            <li><b>Er 60 stasjoner et krav fra styret, eller et utgangspunkt?</b> Hvis tallet er
              låst, er casen «hvordan», ikke «om». Det bør du vite før du bruker ti minutter på
              «om».</li>
          </ul>
          <p>Legg merke til hva du <i>ikke</i> trenger å spørre om: hvor stort markedet er.
          Det skal du bygge selv.</p>`,
        krav: [
          "Du spør om målet og om horisonten, ikke bare om markedet.",
          "Du spør om alternativkostnaden — 180 millioner har alltid en annen anvendelse.",
          "Du avklarer om beslutningen er «om» eller «hvordan». Det halverer casen.",
          "Du sier hvorfor du spør: «Svaret avgjør om jeg strukturerer rundt avkastning eller rundt posisjonering.»",
        ],
        felle: "Å spørre «hvor stort er det svenske markedet?» med én gang. Det er selve analysen — spør du om den, gir du fra deg det eneste stedet du kan vise regnehåndverk.",
      },
      {
        art: "struktur",
        sek: 150,
        tittel: "Strukturer beslutningen",
        sp: `<p>Bygg strukturen du ville tegnet på arket for å avgjøre om Nordlys bør inn i
          Sverige. <b>Avslutt med hypotesen din</b> og med hvilken gren du starter i.</p>`,
        fasit: `<p>Markedsinngang har fire spørsmål, og de kommer i rekkefølge fordi hvert av
          dem kan drepe casen alene:</p>
          <div class="formula"><div class="eq">Er markedet attraktivt? → Kan vi vinne der? → Lønner det seg? → Hvordan går vi inn?</div></div>
          <p>Det som skiller en sterk struktur fra en mal, er at grenene er <i>ladebransjens</i>
          grener, ikke generiske.</p>
          <ul>
            <li><b>Markedet:</b> ikke «størrelse og vekst», men driverne under: antall
              helelektriske biler × kWh hurtigladet per bil per år × pris per kWh. Elbilandelen
              er den ene variabelen som betyr noe, og den vokser raskt.</li>
            <li><b>Kan vi vinne:</b> i lading er konkurransefortrinnet <i>tomter og
              nettilknytning</i>, ikke merkevare. Hvem sitter på de beste plasseringene langs E4
              og E6? Hvor lang kø er det hos nettselskapet for ny kapasitet? Har vi
              roaming-avtaler så andres app-kunder kan lade hos oss?</li>
            <li><b>Lønnsomheten:</b> dekningsbidrag per kWh × volum − faste kostnader, og
              deretter avkastning på investeringen. Dette er en fastkostnadsforretning, så
              spørsmålet koker ned til <b>utnyttelse per ladepunkt</b>.</li>
            <li><b>Inngangsmåten:</b> bygge selv, kjøpe en lokal operatør, joint venture med et
              energiselskap, eller fase inn over tid. Og timing: nå, eller når elbilandelen har
              nådd et nivå der stasjonene fylles.</li>
          </ul>
          <p><b>Hypotesen:</b> markedet kommer helt sikkert, men det er for lite i dag til å
          bære 60 stasjoner. Jeg starter i lønnsomhetsgrenen, og det første jeg vil regne på er
          hvor stor markedsandel vi må ha bare for å dekke de faste kostnadene.</p>`,
        krav: [
          "Du bygger markedet som en ligning (biler × kWh × pris), ikke som en påstand.",
          "Du navngir det faktiske konkurransefortrinnet i bransjen — tomter og nettkapasitet.",
          "Du har en egen gren for inngangsmåte og timing, ikke bare for «om».",
          "Du prioriterer: sier hvilken gren du starter i og hvorfor.",
          "Du avslutter med en fallbar hypotese, ikke med «så gir jeg en anbefaling».",
        ],
        felle: "Å ta med «regulering» og «inngangsbarrierer» som egne grener fordi de står i malen. I denne bransjen er barrieren konkret og har navn: tomt og nettilknytning. Si det i stedet.",
      },
      {
        art: "exhibit",
        sek: 150,
        tittel: "Det svenske markedet og planen",
        sp: `<p>Intervjueren gir deg tre tabeller. <b>Hva ser du, og hva betyr det for
          beslutningen?</b></p>`,
        figur: `<table class="data">
            <tr><th>Det svenske hurtiglademarkedet</th><th class="n">I dag</th><th class="n">Om 3 år</th></tr>
            <tr><td>Personbiler (millioner)</td><td class="n">5,0</td><td class="n">5,0</td></tr>
            <tr><td>Andel helelektriske</td><td class="n">10 %</td><td class="n">16 %</td></tr>
            <tr><td>Helelektriske biler</td><td class="n">500 000</td><td class="n">800 000</td></tr>
            <tr><td>Hurtiglading per bil per år (kWh)</td><td class="n">400</td><td class="n">400</td></tr>
            <tr><td><b>Hurtigladevolum (mill. kWh)</b></td><td class="n"><b>200</b></td><td class="n"><b>320</b></td></tr>
            <tr><td>Snittpris til sluttkunde (kr/kWh)</td><td class="n">6,00</td><td class="n">6,00</td></tr>
            <tr><td><b>Markedet i kroner (mill. kr)</b></td><td class="n"><b>1 200</b></td><td class="n"><b>1 920</b></td></tr>
          </table>
          <table class="data">
            <tr><th>Andel av hurtigladevolumet i dag</th><th class="n">Andel</th><th class="n">Mill. kWh</th></tr>
            <tr><td>Kraftladd (energiselskap)</td><td class="n">40 %</td><td class="n">80</td></tr>
            <tr><td>Vattenlad (energiselskap)</td><td class="n">25 %</td><td class="n">50</td></tr>
            <tr><td>Stasjonsnett (bensinkjede)</td><td class="n">15 %</td><td class="n">30</td></tr>
            <tr><td>Øvrige og lokale aktører</td><td class="n">20 %</td><td class="n">40</td></tr>
            <tr><td><b>Sum</b></td><td class="n"><b>100 %</b></td><td class="n"><b>200</b></td></tr>
          </table>
          <table class="data">
            <tr><th>Nordlys' plan for Sverige</th><th class="n">Tall</th></tr>
            <tr><td>Stasjoner (4 ladepunkter hver)</td><td class="n">60</td></tr>
            <tr><td>Investering per stasjon (mill. kr)</td><td class="n">3,0</td></tr>
            <tr><td><b>Samlet investering (mill. kr)</b></td><td class="n"><b>180</b></td></tr>
            <tr><td>Pris til kunde (kr/kWh)</td><td class="n">6,00</td></tr>
            <tr><td>Strøm, nettleie og korttransaksjon (kr/kWh)</td><td class="n">3,60</td></tr>
            <tr><td><b>Dekningsbidrag (kr/kWh)</b></td><td class="n"><b>2,40</b></td></tr>
            <tr><td>Tomteleie, drift og vedlikehold per stasjon (kr/år)</td><td class="n">300 000</td></tr>
            <tr><td>Svensk organisasjon, IT og markedsføring (mill. kr/år)</td><td class="n">18</td></tr>
            <tr><td><b>Faste kostnader (mill. kr/år)</b></td><td class="n"><b>36</b></td></tr>
          </table>`,
        fasit: `<p>Si <b>implikasjonen først</b>, ikke tabellene:</p>
          <p><i>«Markedet er 1,2 milliarder i dag og 1,9 milliarder om tre år — det vokser
          60 prosent. Men tre etablerte aktører sitter på 80 prosent av volumet, og dekningsbidraget
          er bare 2,40 kroner per kWh mot 36 millioner i faste kostnader. Det er en
          volumforretning, og spørsmålet er om vi klarer å fylle stasjonene.»</i></p>
          <p>Tre observasjoner en sterk kandidat gjør, og en middels ikke gjør:</p>
          <ul>
            <li><b>Veksten kommer utelukkende fra elbilandelen</b> — 10 til 16 prosent. Bilparken
              er lik, forbruket per bil er likt, prisen er lik. Hele markedscasen er én variabel,
              og den bør du stressteste.</li>
            <li><b>Dekningsgraden er 40 prosent</b> (2,40 av 6,00). Det er høyt nok til at volum
              lønner seg, og lavt nok til at pris ikke er våpenet: kutter du 50 øre, gir du fra
              deg en femtedel av bidraget.</li>
            <li><b>Prisen er lik for alle i tabellen.</b> Ingen kan differensiere på pris uten å
              utløse en priskrig i et marked med fast kostnadsbase. Det er der slike markeder
              vanligvis ender.</li>
          </ul>
          <p>Og legg merke til det som <i>ikke</i> står: ingenting om tomter, ingenting om
          nettkapasitet, ingenting om hvor de etablerte allerede står. Å be om det er et sterkt
          trekk.</p>`,
        krav: [
          "Du sier hva tabellene betyr for beslutningen, ikke hva de inneholder.",
          "Du ser at hele markedsveksten ligger i én variabel — elbilandelen.",
          "Du regner dekningsgraden (40 %) og trekker riktig slutning: dette er en volumforretning.",
          "Du sier hva som mangler i tabellene, og ber om det.",
        ],
        felle: "Å bli imponert av at markedet er 1,2 milliarder. Markedsstørrelse alene sier ingenting — det er andelen du kan ta, ganget med bidraget per enhet, som avgjør.",
      },
      {
        art: "regne",
        sek: 90,
        tittel: "Hvor mye av markedet må de ha?",
        sp: `<p>De faste kostnadene er 36 millioner i året, og dekningsbidraget er 2,40 kroner
          per kWh. <b>Hvor stor andel av dagens svenske hurtigladevolum må Nordlys ha for at
          driften skal gå i null?</b></p>
          <p class="tiny">Svar i prosent. Si framgangsmåten høyt før du sier tallet.</p>`,
        svar: 7.5,
        enhet: "prosent",
        toleranse: 0.03,
        fasit: `<p>To trinn: først breakeven i volum, så oversett volumet til markedsandel. Det
          andre trinnet er det som gjør tallet vurderbart.</p>
          <div class="formula">
            <div class="eq">Breakeven-volum = 36 mill. kr / 2,40 kr per kWh = 15 mill. kWh</div>
            <div class="eq">Markedsandel = 15 / 200 = <b>7,5 %</b></div>
            <div class="where">Sanity-sjekk: 15 millioner kWh fordelt på 240 ladepunkter og 365 dager
              er 171 kWh per ladepunkt per døgn — drøyt én time på full effekt for en 150 kW-lader.
              Det er lite, og det er godt nytt.</div>
          </div>
          <p><b>Her ligger skillet.</b> En middels kandidat stopper ved 7,5 prosent og sier «det er
          mye». En sterk kandidat gjør tre ting til:</p>
          <ul>
            <li><b>Regner mot riktig år.</b> Stasjonene står ikke ferdige i dag. Mot markedet om
              tre år, 320 millioner kWh, er de samme 15 millionene bare <b>4,7 prosent</b>.
              Beslutningen skal tas mot markedet i driftsåret, ikke mot markedet i beslutningsåret.</li>
            <li><b>Skiller drift fra kapital.</b> 7,5 prosent gir null i driftsresultat — og null
              avkastning på de 180 millionene. Med 10 prosent andel om tre år: 32 millioner kWh
              × 2,40 = 76,8 millioner i dekningsbidrag, minus 36 i faste = <b>40,8 millioner</b>,
              altså 4,4 års tilbakebetaling. Det er tallet fondet faktisk bryr seg om.</li>
            <li><b>Oversetter til konkurransebildet.</b> 7,5 prosent fra null er halvparten av
              det tredjestørste selskapet har i dag. Det er ambisiøst, men ikke absurd — og det er
              en helt annen setning enn «7,5 prosent».</li>
          </ul>`,
        krav: [
          "Du deler i to: breakeven i volum først, så oversettelsen til markedsandel.",
          "Du oversetter tallet til noe vurderbart — mot konkurrentenes andeler, eller per ladepunkt per døgn.",
          "Du regner mot markedet i driftsåret, ikke mot markedet i dag.",
          "Du sier at breakeven ikke er lønnsomhet: kapitalen er ikke betjent ved null.",
          "Du oppgir enhet, og sier framgangsmåten før tallet.",
        ],
        felle: "Å regne breakeven i kroner omsetning i stedet for i dekningsbidrag: 36 / 6,00 = 6 millioner kWh, altså 3 prosent. Feilen er å glemme at 3,60 av hver krone går rett ut igjen.",
      },
      {
        art: "ide",
        sek: 120,
        tittel: "Hvordan kan de gå inn — og vinne?",
        sp: `<p><b>List så mange måter du klarer på to minutter.</b> Én per linje. Si
          oppdelingen din først.</p>`,
        liste: [
          "Kjøpe en av de mindre svenske operatørene i stedet for å bygge fra null — tomter og nettilknytning følger med",
          "Gå inn i én region først, for eksempel E6 sørover fra Svinesund, og bygge ut derfra",
          "Sikre tomtene gjennom eksklusivavtale med en svensk dagligvare- eller bensinkjede",
          "Joint venture med et svensk energiselskap som allerede har nettkapasitet og konsesjoner",
          "Fase byggingen: sett opp 20 stasjoner, mål utnyttelsen i ett år, bygg resten når elbilandelen har steget",
          "Bygge på nordmenn som handler i Sverige — en fast, kjent og lojal trafikkstrøm fra dag én",
          "Roaming-avtaler så kunder med andres app kan lade hos Nordlys uten å bytte leverandør",
          "Bedriftsavtaler med varebilflåter, taxi og hjemmetjeneste — forutsigbart grunnvolum utenom rushet",
          "Bygge færre og større stasjoner ved knutepunkter, i stedet for mange små langs veien",
          "Legge til kiosk, kaffe og toalett — inntekt per besøk som ikke er kWh",
          "Lease laderne i stedet for å eie dem, for å redusere kapitalbindingen per stasjon",
          "Selge anleggene til fondet og drive dem på forvaltningskontrakt (asset-light)",
          "Utsette hele inngangen og heller kjøpe seg inn senere, mot en høyere pris men lavere risiko",
          "Prise seg lavt i en innkjøringsperiode for å bygge vane, og akseptere tap de første to årene",
        ],
        fasit: `<p>Del idéene i tre <i>før</i> du lister: <b>hvordan komme inn</b> (bygge, kjøpe,
          samarbeide, vente), <b>hvordan vinne volum</b> (tomter, roaming, flåtekunder, pris) og
          <b>hvordan redusere risikoen</b> (fasing, leasing, asset-light).</p>
          <p>Avslutt med å prioritere. Analysen peker mot to ting: markedet er lite i dag og stort
          senere, og investeringen er stor og udelelig. Det gjør <b>fasing</b> og
          <b>oppkjøp av tomteposisjon</b> til de to sterkeste idéene — de kjøper tid uten å gi fra
          seg posisjonen.</p>`,
        krav: [
          "Du sier oppdelingen din før du lister.",
          "Idéene dekker både inngangsmåte og hvordan man vinner volum etterpå — ikke bare det ene.",
          "Minst én idé angriper timingproblemet direkte, som analysen faktisk avdekket.",
          "Du prioriterer til slutt, og begrunner prioriteringen med tall fra casen.",
        ],
        felle: "Å bare liste måter å bygge på. «Ikke gå inn nå» og «kjøp i stedet for å bygge» er også svar på spørsmålet — og de er ofte de riktige når markedet ligger tre år foran investeringen.",
      },
      {
        art: "syntese",
        sek: 90,
        tittel: "Anbefalingen",
        sp: `<p>Investeringsdirektøren i fondet stikker innom og har <b>ett minutt</b>. Gi
          anbefalingen din.</p>
          <p class="tiny">Skriv den slik du ville sagt den — ikke som notater.</p>`,
        fasit: `<p>Topp-ned: standpunkt, tre grunner med tall, risiko, neste steg.</p>
          <blockquote><p><b>«Ja til Sverige, men ikke til 60 stasjoner nå. Jeg anbefaler at dere
          bygger 20 stasjoner i sørlige Sverige først, og sikrer opsjon på tomtene til de
          resterende 40.»</b></p>
          <p>Tre grunner. For det første er markedet reelt: 1,2 milliarder i dag og 1,9 milliarder
          om tre år, drevet av at elbilandelen går fra 10 til 16 prosent. For det andre krever
          full utbygging 7,5 prosent markedsandel bare for å dekke de faste kostnadene — fra null,
          mot tre etablerte som holder 80 prosent. For det tredje faller det kravet til
          4,7 prosent om tre år, så tiden jobber for dere: dere trenger ikke kapasiteten før
          markedet er der.</p>
          <p>Konkret: bygg 20 stasjoner langs E6 og E4 i sør, der nordmenn som handler i Sverige
          gir kjent grunntrafikk fra dag én. Bruk året til å måle faktisk utnyttelse per
          ladepunkt, og forhandle nå om tomtene til resten — det er tomtene, ikke laderne, som
          er den knappe ressursen.</p>
          <p>Den store risikoen er nettopp den: at Kraftladd og Vattenlad tar de beste
          plasseringene mens dere venter. Det første jeg ville gjort, er å kartlegge hvor de tre
          etablerte har søkt om nettilknytning de siste tolv månedene — det viser hvor de skal,
          før de kommer dit.»</p></blockquote>`,
        krav: [
          "Standpunktet kommer i første setning, og det er nyansert uten å være vagt.",
          "Du bruker tallene fra casen — 7,5 prosent i dag mot 4,7 prosent om tre år er hele argumentet.",
          "Du sier hva klienten skal gjøre denne måneden, ikke bare hva som er sant.",
          "Risikoen du nevner, er den anbefalingen din faktisk skaper — ikke en generisk risiko.",
          "Du holder deg innenfor ett minutt.",
        ],
        felle: "Å svare «det kommer an på». En delvis inngang er et standpunkt; «det kommer an på markedsutviklingen» er det ikke. Ta valget, og legg betingelsen inn i anbefalingen.",
      },
    ],
  },
  {
    id: "ma-bakeri-kapasitet",
    label: "Bakeriet som kjøper et tak, ikke et selskap",
    type: "M&A",
    nivå: "Avansert",
    firma: "Generisk",
    stil: "interviewer-led",
    minutter: 40,
    ch: [],
    blurb: "Målselskapet tjener nesten ingenting, og prisen er 12,5 ganger EBITDA. Likevel kan oppkjøpet være billig — fordi kjøperen egentlig kjøper noe helt annet enn et resultat.",
    prompt: `<p>Klienten er <b>Nordbake</b>, Norges nest største industribakeri: fire fabrikker,
      3 200 millioner i omsetning, brød og bakervarer til dagligvarekjedene.</p>
      <p>De vurderer å kjøpe <b>Sørbakst</b>, en familieeid konkurrent på Sørlandet med to
      fabrikker og 800 millioner i omsetning. Familien vil ha <b>500 millioner kroner</b>.
      Sørbakst har en EBITDA på 40 millioner — prisen er altså 12,5 ganger EBITDA, i en bransje
      der 8 ganger er normalen.</p>
      <p><b>Bør Nordbake betale 500 millioner?</b></p>`,
    bakgrunn: `<p>Casen er konstruert, men mekanismen er en av de vanligste i ekte
      industrioppkjøp: <b>kjøperen kjøper ikke målselskapets resultat, den kjøper målselskapets
      kapasitet</b>. Et industribakeri kan ikke vokse uten produksjonslinjer, og en ny fabrikk
      tar tre år fra beslutning til første brød. Når egne linjer nærmer seg taket og
      etterspørselen vokser, blir spørsmålet ikke «hva er selskapet verdt», men «hva koster
      alternativet».</p>
      <p>Det er også derfor multipler er farlige i M&A-caser. 12,5 ganger EBITDA er dyrt målt mot
      Sørbaksts egen inntjening og billig målt mot inntjeningen i Nordbakes hender. Skillet
      mellom <i>standalone-verdi</i> og <i>verdi for denne kjøperen</i> er selve faget, og det er
      den klareste markøren mellom et A-svar og et C-svar i denne casetypen.</p>`,
    trinn: [
      {
        art: "oppklaring",
        sek: 90,
        tittel: "Hva vil du vite før du begynner?",
        sp: `<p>Du har hørt prompten. Hvilke spørsmål stiller du før du strukturerer?</p>`,
        fasit: `<p>I en M&A-case er de tre avklaringene som betyr mest: <b>hvorfor</b> kjøper vi,
          <b>hva er alternativet</b>, og <b>hva slags kjøper er vi</b>.</p>
          <ul>
            <li><b>Hva er den strategiske begrunnelsen?</b> Kapasitet? Geografi? Kunder? Å ta ut
              en konkurrent? Svaret bestemmer hvilke synergier som i det hele tatt er relevante,
              og dermed hvor du leter.</li>
            <li><b>Hva er alternativet til å kjøpe?</b> Kan Nordbake bygge selv, leie kapasitet,
              eller la være? Uten et alternativ finnes det ingen målestokk for om 500 millioner er
              mye. Dette er det viktigste spørsmålet i hele casen.</li>
            <li><b>Går Nordbakes egne fabrikker fulle?</b> Hvis de har ledig kapasitet, faller
              hele kapasitetslogikken bort og casen handler om noe annet.</li>
            <li><b>Er prisen forhandlet eller forlangt?</b> 500 millioner fra en familie som
              gjerne vil selge, og 500 millioner i en auksjon med tre budgivere, er to
              forskjellige situasjoner.</li>
          </ul>`,
        krav: [
          "Du spør etter alternativet til oppkjøpet. Uten det finnes ingen målestokk for prisen.",
          "Du spør hvorfor de kjøper — begrunnelsen bestemmer hvilke synergier som er reelle.",
          "Du spør om kjøperens egen situasjon, ikke bare om målselskapet.",
          "Du unngår å be om standard due diligence-lister. Det er ikke en avklaring, det er en utsettelse.",
        ],
        felle: "Å hoppe rett på «hva er synergiene?». Synergier er svaret på et spørsmål du ennå ikke har stilt: hva prøver kjøperen å oppnå, og hva ville det ellers kostet?",
      },
      {
        art: "struktur",
        sek: 150,
        tittel: "Strukturer beslutningen",
        sp: `<p>Bygg strukturen for om Nordbake bør betale 500 millioner. <b>Avslutt med
          hypotesen din.</b></p>`,
        fasit: `<p>Tre lag, i rekkefølge, og det tredje er der de fleste caser avgjøres:</p>
          <div class="formula">
            <div class="eq">Verdi for kjøper = Standalone-verdi + Synergiverdi − Integrasjonskostnad</div>
            <div class="eq">Beslutningen = Verdi for kjøper − Pris, målt mot beste alternative bruk av pengene</div>
          </div>
          <ul>
            <li><b>Standalone:</b> hva er Sørbakst verdt alene? 40 millioner i EBITDA på en normal
              multippel. Er inntjeningen varig, eller er den på vei ned?</li>
            <li><b>Synergier:</b> del dem i tre — <i>kostnad</i> (overlappende administrasjon,
              salg, innkjøpsmakt), <i>inntekt</i> (kryssalg, bedre kundemiks) og
              <i>kapasitet</i> (unngått investering). Den siste er den som ofte er størst i
              industri, og den som oftest glemmes.</li>
            <li><b>Alternativet:</b> hva koster det å skaffe samme kapasitet på andre måter —
              bygge, leie, kontraktsprodusere? Dette er ikke en fjerde gren for pyntens skyld:
              det er referansepunktet hele prisdiskusjonen måles mot.</li>
            <li><b>Risiko og gjennomføring:</b> kundefrafall når to leverandører blir én,
              konkurransemyndighetene, integrasjon, finansiering.</li>
          </ul>
          <p><b>Hypotesen:</b> 12,5 ganger EBITDA er dyrt for Sørbakst, men Sørbaksts egen EBITDA
          er feil målestokk. Jeg vil finne hva EBITDA-en blir i Nordbakes hender, og deretter
          sammenligne 500 millioner med hva det ville kostet å skaffe kapasiteten på andre måter.</p>`,
        krav: [
          "Du skiller eksplisitt mellom målselskapets egenverdi og verdien for denne kjøperen.",
          "Du deler synergiene i kostnad, inntekt og unngått investering — ikke bare «synergier».",
          "Du har alternativet (bygge eller leie) som en egen, likestilt gren.",
          "Du nevner at premien avgjør hvem som får synergiene, ikke bare om de finnes.",
          "Hypotesen er fallbar og peker på neste regnestykke.",
        ],
        felle: "Å behandle integrasjons- og kulturrisiko som en pliktbullet på slutten. Enten er den stor nok til å prises inn i regnestykket, eller så hører den ikke hjemme i strukturen.",
      },
      {
        art: "exhibit",
        sek: 150,
        tittel: "Tallene på bordet",
        sp: `<p>Intervjueren legger fram tre tabeller. <b>Hva er det viktigste du ser?</b></p>`,
        figur: `<table class="data">
            <tr><th>Nøkkeltall</th><th class="n">Nordbake</th><th class="n">Sørbakst</th></tr>
            <tr><td>Omsetning (mill. kr)</td><td class="n">3 200</td><td class="n">800</td></tr>
            <tr><td>EBITDA (mill. kr)</td><td class="n">384</td><td class="n">40</td></tr>
            <tr><td>EBITDA-margin</td><td class="n">12 %</td><td class="n">5 %</td></tr>
            <tr><td>Fabrikker</td><td class="n">4</td><td class="n">2</td></tr>
            <tr><td>Kapasitet (tonn per år)</td><td class="n">240 000</td><td class="n">100 000</td></tr>
            <tr><td>Produsert volum (tonn per år)</td><td class="n">228 000</td><td class="n">60 000</td></tr>
            <tr><td><b>Kapasitetsutnyttelse</b></td><td class="n"><b>95 %</b></td><td class="n"><b>60 %</b></td></tr>
            <tr><td>Omsetning per tonn (kr)</td><td class="n">14 035</td><td class="n">13 333</td></tr>
            <tr><td>Volumvekst per år</td><td class="n">4 %</td><td class="n">0 %</td></tr>
          </table>
          <table class="data">
            <tr><th>Synergier identifisert i due diligence</th><th class="n">Mill. kr per år</th></tr>
            <tr><td>55 overflødige stillinger i administrasjon og salg à 800 000 kr</td><td class="n">44</td></tr>
            <tr><td>Innkjøp: 5 % bedre pris på Sørbaksts varekjøp (40 % av 800 mill.)</td><td class="n">16</td></tr>
            <tr><td><b>Sum årlige synergier</b></td><td class="n"><b>60</b></td></tr>
            <tr><td>Engangs transaksjons- og integrasjonskostnad</td><td class="n">80</td></tr>
          </table>
          <table class="data">
            <tr><th>Alternativet: bygge ny fabrikk</th><th class="n">Tall</th></tr>
            <tr><td>Investering (mill. kr)</td><td class="n">700</td></tr>
            <tr><td>Kapasitet (tonn per år)</td><td class="n">50 000</td></tr>
            <tr><td>Kostnad per tonn kapasitet (kr)</td><td class="n">14 000</td></tr>
            <tr><td>Tid fra beslutning til drift</td><td class="n">3 år</td></tr>
            <tr><td>Normal EBITDA-multippel i bransjen</td><td class="n">8 ×</td></tr>
          </table>`,
        fasit: `<p>Overskriften først:</p>
          <p><i>«Nordbake går for fullt — 95 prosent utnyttelse og 4 prosent volumvekst. De treffer
          taket i løpet av to år. Sørbakst går på 60 prosent og har 40 000 tonn ledig kapasitet.
          Det er ikke to bakerier som skal slås sammen; det er en flaskehals som møter en
          løsning.»</i></p>
          <ul>
            <li><b>Regn framskrivningen høyt:</b> 228 000 × 1,04 = 237 000 tonn neste år,
              246 000 året etter. Kapasiteten er 240 000. <b>Taket treffes i år 2.</b> Det gjør
              dette til en tidsbeskrankning, ikke en verdsettelse.</li>
            <li><b>Marginforskjellen er 12 mot 5 prosent</b> på nesten samme omsetning per tonn
              (14 000 mot 13 300 kroner). Sørbakst er ikke dårlig fordi de selger billig — de er
              dårlige fordi de har en full kostnadsbase på halv kapasitet. Det er nettopp den
              typen problem et oppkjøp løser.</li>
            <li><b>Alternativet koster 14 000 kroner per tonn kapasitet og tar tre år.</b> De
              40 000 ledige tonnene hos Sørbakst tilsvarer alene 560 millioner i greenfield —
              og de er tilgjengelige umiddelbart.</li>
          </ul>
          <p>Det middels svaret leser opp tabellene. Det sterke sier: «Prisen på 500 millioner
          skal ikke sammenlignes med Sørbaksts EBITDA. Den skal sammenlignes med 700 millioner og
          tre år.»</p>`,
        krav: [
          "Du framskriver Nordbakes volum og finner når taket treffes. Det er poenget med tabellen.",
          "Du kobler Sørbaksts lave margin til den lave utnyttelsen i stedet for å kalle dem et dårlig selskap.",
          "Du bruker greenfield-tabellen som målestokk med én gang, ikke som en fotnote.",
          "Du regner kroner per tonn kapasitet, og sammenligner de to veiene til samme kapasitet.",
        ],
        felle: "Å konkludere at Sørbakst er et svakt selskap fordi marginen er 5 prosent. I en kapasitetscase er lav utnyttelse hos målet ikke en svakhet — det er varen du kjøper.",
      },
      {
        art: "regne",
        sek: 120,
        tittel: "Hva er Sørbakst verdt for Nordbake?",
        sp: `<p>Bruk bransjens normale multippel på 8 ganger EBITDA, og regn på EBITDA-en
          Sørbakst vil ha <b>i Nordbakes hender</b>.</p>
          <p><b>Hva er Sørbakst verdt for Nordbake, i millioner kroner?</b></p>
          <p class="tiny">Si oppsettet høyt før du regner.</p>`,
        svar: 800,
        enhet: "millioner kroner",
        toleranse: 0.02,
        fasit: `<p>Regnestykket er kort. Det er tolkningen som teller.</p>
          <div class="formula">
            <div class="eq">EBITDA i Nordbakes hender = 40 + 60 = 100 mill. kr</div>
            <div class="eq">Verdi for kjøper = 8 × 100 = <b>800 millioner kroner</b></div>
            <div class="where">Til sammenligning: standalone er Sørbakst verdt 8 × 40 = 320 millioner.</div>
          </div>
          <p><b>Nå kommer delen som skiller.</b> Sett prisen inn i bildet og fordel synergiene:</p>
          <ul>
            <li>Synergiene er verdt 8 × 60 = <b>480 millioner</b> i kapitalisert verdi.</li>
            <li>Prisen på 500 millioner mot standalone på 320 er en premie på <b>180 millioner</b>,
              altså 56 prosent.</li>
            <li>Selger får dermed 180 av de 480 synergimillionene. <b>Kjøper beholder 300</b>, eller
              62 prosent av synergien. Trekk fra 80 millioner i engangs integrasjonskostnad, og
              netto verdiskaping for Nordbake er <b>220 millioner</b>.</li>
          </ul>
          <p>Legg merke til hva som skjedde med multippelen: 500 millioner er 12,5 ganger
          Sørbaksts egen EBITDA, men bare <b>5 ganger</b> EBITDA-en i Nordbakes hender. Samme pris,
          to helt forskjellige tall — og det er derfor «12,5 ganger er dyrt» ikke er et argument.</p>
          <p>Og den virkelige sammenligningen ligger fortsatt utenfor regnestykket: alternativet
          er 700 millioner og tre års ventetid for 50 000 tonn. Sørbakst gir 40 000 ledige tonn
          nå, pluss en drift med 60 millioner i synergier, for 500.</p>`,
        krav: [
          "Du legger synergiene til før du multiplikerer, ikke etter.",
          "Du regner standalone-verdien også, så du kan si hvor stor premien er.",
          "Du fordeler synergien mellom kjøper og selger — det er premien som avgjør hvem som tjener.",
          "Du oversetter prisen til multippel begge veier: 12,5 × standalone, 5 × etter synergi.",
          "Du trekker fra engangskostnaden ved integrasjon i stedet for å nevne den til slutt.",
        ],
        felle: "Å multiplisere synergiene med 8 og legge dem oppå prisen i stedet for oppå verdien. Synergier tilfaller kjøperen bare i den grad premien er mindre enn synergiverdien — betaler du hele synergien i premie, har du kjøpt en tom pose.",
      },
      {
        art: "ide",
        sek: 120,
        tittel: "Hva bør Nordbake gjøre nå?",
        sp: `<p><b>List så mange grep du klarer på to minutter</b> — både i forhandlingen, i
          gjennomføringen og i risikohåndteringen. Én per linje.</p>`,
        liste: [
          "Forhandle prisen ned med utgangspunkt i at Sørbakst alene er verdt 320 millioner",
          "Legge inn en earn-out så deler av prisen først betales når synergiene er dokumentert",
          "Kjøpe fabrikkene og kundekontraktene som eiendeler i stedet for selve selskapet",
          "Bruke greenfield-alternativet aktivt i forhandlingen: 700 millioner og tre år er vår reelle alternativkostnad",
          "Avklare nedbemanningen av de 55 stillingene før signering — det er 44 av de 60 synergimillionene",
          "Kartlegge overlappende kunder, og regne på hvor mye volum som forsvinner når to leverandører blir én",
          "Undersøke om Konkurransetilsynet vil kreve at én fabrikk selges ut",
          "Finne ut hvorfor Sørbakst bare kjører 60 prosent — er den ledige kapasiteten reell eller på papiret",
          "Vurdere å leie kapasitet av Sørbakst på kontrakt i stedet for å kjøpe hele selskapet",
          "Se etter en tredje aktør med én ledig fabrikk, hvis det bare er kapasitet vi trenger",
          "Lage en integrasjonsplan med navngitt ansvarlig og tolv måneders milepæler før signering",
          "Stressteste volumveksten: hva om de 4 prosentene stopper — da har vi kjøpt kapasitet vi ikke trenger",
          "Sjekke finansieringen: samlet EBITDA blir 484 millioner, og 500 millioner i lån er da omtrent én gang EBITDA",
          "Sikre nøkkelpersonell og kundekontakter hos Sørbakst med bindingsavtaler før nyheten blir kjent",
        ],
        fasit: `<p>Gruppér før du lister: <b>pris og struktur</b> (hva vi betaler og hvordan),
          <b>realisering</b> (hva som må skje for at de 60 millionene faktisk kommer) og
          <b>risiko</b> (hva som kan velte regnestykket).</p>
          <p>Prioriteringen følger av analysen: 44 av 60 synergimillioner ligger i én eneste
          handling — å ta ut 55 stillinger. Er ikke den avklart før signering, er halve verdien
          en hypotese. Det er det viktigste enkeltpunktet i hele casen.</p>`,
        krav: [
          "Du grupperer før du lister, og gruppene følger analysen.",
          "Minst én idé handler om transaksjonsstrukturen, ikke bare om prisen.",
          "Du peker på hva som må være avklart før signering, ikke bare etter.",
          "Du prioriterer, og prioriteringen henger på hvor synergikronene faktisk ligger.",
        ],
        felle: "Å liste due diligence-temaer som om de var tiltak. «Sjekke kultur» er ikke et grep; «binde nøkkelpersonell før nyheten blir kjent» er det.",
      },
      {
        art: "syntese",
        sek: 90,
        tittel: "Anbefalingen",
        sp: `<p>Konsernsjefen i Nordbake har <b>ett minutt</b> før styremøtet. Gi anbefalingen
          din.</p>`,
        fasit: `<p>Svaret først, tallene som støtte, så risiko og neste steg.</p>
          <blockquote><p><b>«Kjøp Sørbakst. 500 millioner er dyrt målt mot deres egen inntjening,
          men billig målt mot alternativet — og det er alternativet som er den riktige
          målestokken.»</b></p>
          <p>Tre grunner. For det første treffer dere kapasitetstaket om to år: dere kjører
          228 000 tonn av 240 000 og vokser 4 prosent. For det andre koster det å bygge seg ut av
          det 700 millioner og tre år — og de tre årene har dere ikke. Sørbakst gir 40 000 ledige
          tonn med én gang. For det tredje er Sørbakst verdt 800 millioner i deres hender: 40
          millioner i egen EBITDA pluss 60 i synergier, ganger åtte. Selv etter 80 millioner i
          integrasjonskostnad skaper transaksjonen 220 millioner.</p>
          <p>Konkret: gå inn med 420 millioner og en earn-out på 80 knyttet til at de 55
          stillingene faktisk er ute innen tolv måneder. 44 av de 60 synergimillionene ligger i
          den ene posten, og den bør ikke være selgers gevinst før den er kjøpers.</p>
          <p>Den store risikoen er kundeoverlappet: kjedene liker ikke å gå fra to leverandører
          til én, og et volumfall på 10 prosent spiser en tredjedel av synergien. Det første jeg
          ville gjort, er å kartlegge hvor mye av Sørbaksts 800 millioner som ligger hos kjeder
          dere allerede leverer til.»</p></blockquote>`,
        krav: [
          "Første setning tar standpunkt og sier hvorfor multippelen er feil målestokk.",
          "Du bruker de harde tallene: 800 i verdi, 500 i pris, 700 i alternativ, 220 netto.",
          "Anbefalingen har en struktur, ikke bare et ja — earn-out knyttet til den største synergien.",
          "Risikoen er kvantifisert, ikke nevnt: 10 prosent kundefrafall mot 60 millioner i synergi.",
          "Du holder deg innenfor ett minutt.",
        ],
        felle: "Å avslutte med «forutsatt at synergiene realiseres». Alle synergier er forutsatt. Det som er verdt å si, er hvilken mekanisme i avtalen som gjør at de blir realisert.",
      },
    ],
  },
  {
    id: "prising-velferdsteknologi",
    label: "Sensoren som er priset som maskinvare",
    type: "Prising",
    nivå: "Middels",
    firma: "Generisk",
    stil: "interviewer-led",
    minutter: 30,
    ch: [],
    blurb: "Klienten priser med påslag på kostnad. Kunden sparer det femogtyvedobbelte. Trener verdibasert prising, og spørsmålet om hvem som faktisk sitter med gevinsten.",
    prompt: `<p>Klienten er <b>Trygg Sans</b>, et selskap i Trondheim med 30 ansatte. De selger
      en radarsensor som monteres i taket på et sykehjemsrom og varsler pleierne når en beboer
      faller eller forsøker å stå opp om natten. Sensoren erstatter tilsynsrunder.</p>
      <p>Produktet selges som et årsabonnement på <b>1 500 kroner per rom per år</b>. Prisen er
      satt som kostnad pluss påslag. De har 5 400 rom under kontrakt, altså 8,1 millioner i
      omsetning, og salget vokser sakte.</p>
      <p>Styret mener prisen er feil. <b>Hva bør produktet koste?</b></p>`,
    bakgrunn: `<p>Casen er konstruert, men mønsteret er gjennomgående i norsk velferdsteknologi:
      selskapene er grunnlagt av ingeniører, prisen settes som kostnad pluss påslag, og
      produktet selges som en dings. Kunden — en kommune — kjøper det som en dings, og verdien
      forsvinner i innkjøpsavdelingen.</p>
      <p>Den underliggende ferdigheten er den viktigste i prisingsfaget: <b>tre priser
      definerer et intervall</b>. Kostnaden er gulvet, kundens neste-beste alternativ er taket,
      og konkurrentene ligger et sted imellom. Er gapet mellom gulv og tak stort, har du
      prisingsmakt — og da er kostnadsbasert prising ikke bare unøyaktig, det er å gi bort
      selskapet.</p>
      <p>Casen har også en vri som er ekte og undervurdert: <i>verdien må lande i den samme
      lommeboken som betaler</i>. Sparte sykehusdøgn er verdifulle for staten, ikke for
      kommunen som skriver under kontrakten. Hvem som eier gevinsten, avgjør hva du kan ta
      betalt.</p>`,
    trinn: [
      {
        art: "oppklaring",
        sek: 90,
        tittel: "Hva vil du vite før du begynner?",
        sp: `<p>Hvilke spørsmål stiller du før du strukturerer?</p>`,
        fasit: `<p>I en prisingscase er den avgjørende avklaringen alltid den samme: <b>hva er
          målet med prisendringen?</b> Pris for margin og pris for markedsandel gir motsatt svar.</p>
          <ul>
            <li><b>Vil styret ha mer margin eller flere kunder?</b> Med 5 400 rom av rundt 40 000
              sykehjemsplasser i Norge er penetrasjonen 13 prosent. Skal vi melke de vi har,
              eller ta markedet?</li>
            <li><b>Hvem tar beslutningen hos kunden, og på hvilket budsjett?</b> Innkjøpssjefen
              som sammenligner priser, eller kommunalsjefen for helse som eier
              bemanningsbudsjettet? Det avgjør om produktet blir sammenlignet med en alarmmatte
              eller med en nattevakt.</li>
            <li><b>Gjelder prisen nye kontrakter, eller kan vi endre løpende avtaler?</b> Er
              avtalene treårige rammeavtaler, kan en ny pris ta tre år å slå gjennom.</li>
            <li><b>Endrer produktet faktisk bemanningen hos de kundene vi har i dag?</b> Hele
              verdiargumentet står og faller på dette ene svaret.</li>
          </ul>`,
        krav: [
          "Du spør om målet — margin eller andel — før du spør om noe annet.",
          "Du spør hvem som beslutter og på hvilket budsjett. Prising er like mye salg som regning.",
          "Du spør om produktet faktisk endrer kundens drift, ikke bare om det virker teknisk.",
          "Du bruker tall fra prompten aktivt: 5 400 rom er lite, og det betyr noe for målet.",
        ],
        felle: "Å spørre om konkurrentenes priser først. Konkurrentprisen er relevant, men den er en av tre målestokker — og i denne casen er den den minst interessante.",
      },
      {
        art: "struktur",
        sek: 150,
        tittel: "Strukturer prisspørsmålet",
        sp: `<p>Hvordan finner du riktig pris? Skriv strukturen, og <b>si hva du tror svaret
          blir</b>.</p>`,
        fasit: `<p>Tre metoder som til sammen definerer et intervall. Si dem som et intervall,
          ikke som en liste:</p>
          <div class="formula">
            <div class="eq">Gulv = variabel kostnad per rom      Tak = kundens verdi av alternativet</div>
            <div class="eq">Konkurrentprisen posisjonerer oss et sted mellom gulv og tak</div>
          </div>
          <ul>
            <li><b>Kostnadsgulvet:</b> hva koster ett rom oss per år? Maskinvare fordelt over
              levetiden, drift, support, mobilabonnement. Under dette taper vi penger på hver
              kunde.</li>
            <li><b>Verditaket:</b> hva ville kommunen ellers betalt for å oppnå det samme? Her er
              alternativet ikke en annen sensor — det er <i>en nattevakt</i>. Å se det er hele
              casen.</li>
            <li><b>Konkurrentene:</b> hva finnes, og løser det samme problem? En alarmmatte som
              varsler, men som ikke kan brukes til å redusere bemanning, er ikke samme produkt
              selv om den koster mindre.</li>
            <li><b>Modellen, ikke bare nivået:</b> per rom, per sykehjem, per varsel, fastpris
              pluss gevinstdeling. Prismodellen avgjør ofte mer enn prisnivået.</li>
          </ul>
          <p><b>Hypotesen:</b> når prisen er satt som kostnad pluss påslag, ligger den nær gulvet
          per definisjon. Jeg vil finne taket først — verdien av bemanningen produktet erstatter
          — og se hvor stort gapet er.</p>`,
        krav: [
          "Du setter opp de tre målestokkene som et intervall, ikke som tre uavhengige metoder.",
          "Du definerer kundens alternativ konkret: en nattevakt, ikke «status quo».",
          "Du tar med prismodellen som egen gren, ikke bare prisnivået.",
          "Du sier hvilken målestokk du starter med, og hvorfor.",
          "Hypotesen din er at prisen ligger nær gulvet — og den er testbar.",
        ],
        felle: "Å strukturere prising som «kostnad, konkurrenter, kunder» og deretter regne på kostnaden fordi det er den du har tall på. Verditaket er det som må regnes; det er også det som er vanskelig.",
      },
      {
        art: "exhibit",
        sek: 120,
        tittel: "Kundens nattdrift, og vår egen kostnad",
        sp: `<p>Intervjueren gir deg tallene for et typisk sykehjem med 60 rom, klientens
          kostnader og markedets priser. <b>Hva ser du?</b></p>`,
        figur: `<table class="data">
            <tr><th>Kommunens nattdrift, sykehjem med 60 rom</th><th class="n">Tall</th></tr>
            <tr><td>Pleiere på vakt hver natt</td><td class="n">3</td></tr>
            <tr><td>Årsverk som kreves per vaktposisjon (turnus, ferie, fravær)</td><td class="n">2,5</td></tr>
            <tr><td><b>Årsverk i nattbemanningen</b></td><td class="n"><b>7,5</b></td></tr>
            <tr><td>Kostnad per årsverk (lønn, sosiale kostnader, nattillegg)</td><td class="n">900 000</td></tr>
            <tr><td><b>Nattbemanning per år (kr)</b></td><td class="n"><b>6 750 000</b></td></tr>
            <tr><td>Nattbemanning per rom per år (kr)</td><td class="n">112 500</td></tr>
            <tr><td>Fall med skade per år</td><td class="n">18</td></tr>
            <tr><td>— hvorav hoftebrudd</td><td class="n">6</td></tr>
            <tr><td>Kostnad per hoftebrudd, sykehus og rehabilitering (kr)</td><td class="n">400 000</td></tr>
          </table>
          <table class="data">
            <tr><th>Trygg Sans, kostnad per rom per år</th><th class="n">Kroner</th></tr>
            <tr><td>Sensor og montering, 2 500 kr fordelt over 5 år</td><td class="n">500</td></tr>
            <tr><td>Drift, support og mobilabonnement</td><td class="n">300</td></tr>
            <tr><td><b>Sum variabel kostnad</b></td><td class="n"><b>800</b></td></tr>
            <tr><td>Dagens pris</td><td class="n">1 500</td></tr>
            <tr><td><b>Dekningsbidrag i dag</b></td><td class="n"><b>700</b></td></tr>
          </table>
          <table class="data">
            <tr><th>Alternativer i markedet</th><th class="n">Kr per rom per år</th></tr>
            <tr><td>Alarmmatte ved sengen (etablert leverandør)</td><td class="n">1 200</td></tr>
            <tr><td>Trygg Sans i dag</td><td class="n">1 500</td></tr>
            <tr><td>Dokumentert effekt av Trygg Sans: fall med skade</td><td class="n">−1/3</td></tr>
          </table>`,
        fasit: `<p>Implikasjonen først, og den er kort:</p>
          <p><i>«Kommunen bruker 112 500 kroner per rom per år på nattbemanning. Vi tar 1 500. Vi
          selger et produkt som erstatter arbeidskraft, til prisen på en dings.»</i></p>
          <ul>
            <li><b>Det avgjørende tallet er 2,5 årsverk per vaktposisjon.</b> En nattevakt er ikke
              én person — det er to og en halv, fordi noen må stå der hver natt hele året. Ser du
              ikke det, undervurderer du verdien med 60 prosent.</li>
            <li><b>Konkurrenten løser ikke samme problem.</b> Alarmmatten koster 1 200 og varsler,
              men gir ingen bemanningsreduksjon. At vi ligger 300 kroner over den, er derfor ikke
              en prisposisjon — det er en misforståelse om hva vi selger.</li>
            <li><b>Fallgevinsten er reell, men i feil lommebok.</b> To færre hoftebrudd à 400 000
              er 800 000 kroner i året. Det aller meste av den regningen betales av sykehuset og
              staten, ikke av kommunen som signerer kontrakten. Verdi som ikke lander hos
              betaleren, kan du sjelden ta betalt for.</li>
          </ul>`,
        krav: [
          "Du ser at 2,5 årsverk per vaktposisjon er tallet som bærer hele verdiberegningen.",
          "Du sier at alarmmatten ikke er et reelt alternativ, og hvorfor det gjør prissammenligningen feil.",
          "Du skiller verdi som treffer kommunens budsjett fra verdi som treffer statens.",
          "Du leder med forholdet mellom 112 500 og 1 500, ikke med tabellenes innhold.",
        ],
        felle: "Å regne verdien som 3 årsverk à 900 000 fordi det står tre pleiere på vakt. Tre på vakt er 7,5 årsverk. Å blande «personer på vakt» med «ansatte» er den vanligste feilen i bemanningsregning.",
      },
      {
        art: "regne",
        sek: 90,
        tittel: "Hva er pristaket?",
        sp: `<p>Anta at sensoren gjør at sykehjemmet kan gå fra <b>tre til to</b> pleiere på vakt
          om natten, uten at forsvarligheten svekkes.</p>
          <p><b>Hva er den maksimale prisen per rom per år, målt som verdien av det
          bemanningskuttet?</b></p>
          <p class="tiny">Svar i kroner per rom per år.</p>`,
        svar: 37500,
        enhet: "kroner per rom per år",
        toleranse: 0.02,
        fasit: `<p>Fire ledd, og det tredje er det man bommer på:</p>
          <div class="formula">
            <div class="eq">Én vaktposisjon mindre = 2,5 årsverk</div>
            <div class="eq">2,5 × 900 000 = 2 250 000 kr spart per sykehjem per år</div>
            <div class="eq">2 250 000 / 60 rom = <b>37 500 kroner per rom per år</b></div>
            <div class="where">Til sammenligning: dagens pris er 1 500. Taket er 25 ganger prisen,
              og 47 ganger kostnadsgulvet på 800 kroner.</div>
          </div>
          <p><b>Det middels svaret stopper her og sier «sett prisen til 37 500».</b> Det er feil, og
          det er verdt å vite hvorfor:</p>
          <ul>
            <li><b>Taket er ikke prisen.</b> Ingen kunde betaler hele sin egen gevinst. En vanlig
              deling er halvparten — 18 750 kroner per rom, eller 1,1 millioner per sykehjem i
              året. Selv en femtedel, 7 500 kroner, femdobler dagens pris.</li>
            <li><b>Verdien er betinget av en handling kunden må gjøre.</b> Kommunen får ikke
              2,25 millioner av å montere en sensor — de får det av å legge om turnusen. Det tar
              tid, det møter motstand i fagforeningen, og det skjer først ved neste
              turnusrevisjon. Prisen må derfor kobles til realisering, ikke til installasjon.</li>
            <li><b>Fallgevinsten legges ikke oppå.</b> 800 000 kroner i året i sparte
              hoftebrudd er ekte, men den lander i sykehusets budsjett. Regner du den inn i
              betalingsviljen til kommunen, har du regnet feil på hvem som betaler.</li>
          </ul>
          <p>Sanity-sjekk til slutt: 18 750 kroner per rom per år mot en kostnad på 800 gir en
          dekningsgrad på 96 prosent. Det høres absurd ut — helt til man husker at dette er en
          programvareforretning der marginalkostnaden er nær null, og at prisen skal reflektere
          verdi, ikke kostnad.</p>`,
        krav: [
          "Du regner 2,5 årsverk per vaktposisjon, ikke 1.",
          "Du deler ned til per rom, så tallet kan sammenlignes med dagens pris.",
          "Du sier eksplisitt at taket ikke er prisen, og foreslår en deling.",
          "Du peker på at verdien krever en handling hos kunden, og at prismodellen bør henge på den.",
          "Du holder fallgevinsten utenfor betalingsviljen, fordi den treffer et annet budsjett.",
        ],
        felle: "Å legge sammen bemanningsgevinsten og fallgevinsten til ett stort verditall. Verdi som ikke lander hos den som betaler, er ikke betalingsvilje — den er et argument i en høring.",
      },
      {
        art: "ide",
        sek: 120,
        tittel: "Hvordan tar de ut verdien?",
        sp: `<p><b>List så mange grep du klarer på to minutter</b> — på pris, prismodell og
          salgsmåte. Én per linje.</p>`,
        liste: [
          "Sette prisen som en andel av dokumentert spart bemanningskostnad — gevinstdeling",
          "Splitte produktet i to: en billig grunnpakke som varsler, og en dyr pakke som utløser bemanningskutt",
          "Kjøre et betalt pilotprosjekt i én kommune der besparelsen måles, og bruke tallet som referanse",
          "Selge sammen med turnusomlegging og opplæring — verdien kommer ikke av sensoren alene",
          "Prise per sykehjem i stedet for per rom, så små avdelinger ikke faller utenfor",
          "Heve prisen bare på nye kontrakter og la eksisterende løpe ut, for å teste elastisiteten trygt",
          "Bygge inn årlig prisregulering knyttet til lønnsveksten i kommunesektoren",
          "Selge til private sykehjemsdrivere først, der bemanningsbeslutninger tas raskere",
          "Ta betalt for integrasjon mot journalsystemet som eget produkt",
          "Flytte samtalen fra innkjøpssjefen til kommunalsjefen for helse, som eier bemanningsbudsjettet",
          "Dokumentere fallreduksjonen i en studie, så den delen av verdien også blir salgbar",
          "Sette en høy listepris å forhandle ned fra — i dag finnes det ingen listepris i det hele tatt",
          "Prise etter antall aktive netter eller varsler i stedet for per rom",
          "Gå på rammeavtale gjennom et interkommunalt innkjøpssamarbeid, og godta lavere pris mot volum",
        ],
        fasit: `<p>Del i tre før du lister: <b>prisnivå</b>, <b>prismodell</b> og <b>hvem vi selger
          til</b>. Den tredje gruppen er den de fleste glemmer, og den er ofte den viktigste: en
          prisøkning på 25 ganger går ikke gjennom hos en innkjøpssjef som sammenligner
          enhetspriser, men den kan gå gjennom hos en kommunalsjef som sammenligner med å ansette
          folk.</p>
          <p>Prioritér: gevinstdeling og et betalt pilotprosjekt henger sammen. Piloten skaffer
          beviset, og gevinstdelingen gjør at kunden ikke trenger å tro på beviset for å si ja.</p>`,
        krav: [
          "Du deler i prisnivå, prismodell og kanal/beslutningstaker før du lister.",
          "Minst én idé endrer hvem hos kunden som tar beslutningen.",
          "Minst én idé løser tillitsproblemet — kunden må tro på besparelsen før den er tatt ut.",
          "Du prioriterer, og prioriteringen henger sammen med at verdien er betinget.",
        ],
        felle: "Å bare foreslå «øk prisen». En prisøkning på 25 ganger uten en ny prismodell og en ny samtalepartner blir avvist i første innkjøpsrunde.",
      },
      {
        art: "syntese",
        sek: 90,
        tittel: "Anbefalingen",
        sp: `<p>Styrelederen i Trygg Sans har <b>ett minutt</b>. Gi anbefalingen din.</p>`,
        fasit: `<p>Svaret først. Tallene bærer argumentet.</p>
          <blockquote><p><b>«Dere selger arbeidskraft til prisen på maskinvare. Jeg anbefaler at
          dere går fra 1 500 kroner per rom til en gevinstdelt modell med et gulv på 6 000 kroner
          og et tak rundt 18 000 — og at dere slutter å selge til innkjøp.»</b></p>
          <p>Tre grunner. For det første er verditaket 37 500 kroner per rom per år: én
          vaktposisjon mindre er 2,5 årsverk à 900 000, fordelt på 60 rom. For det andre er dagens
          pris satt fra kostnadssiden — 800 kroner pluss påslag — og ligger derfor 25 ganger under
          det kunden faktisk sparer. For det tredje er den eneste reelle konkurrenten en alarmmatte
          til 1 200 kroner som ikke kan brukes til å redusere bemanning. Dere sammenligner dere med
          feil produkt.</p>
          <p>Konkret: kjør en betalt pilot i to kommuner der besparelsen måles i seks måneder, og
          selg deretter på gevinstdeling — fast grunnpris pluss en andel av de dokumenterte
          lønnskronene. Og flytt salget fra innkjøpssjefen til kommunalsjefen for helse, som er den
          eneste som kan ta beslutningen om bemanning.</p>
          <p>Den store risikoen er at kommunen ikke klarer å ta ut kuttet — turnusen bindes ett år
          av gangen, og fagforeningen har et ord med i laget. Derfor bør prisen henge på realisert
          besparelse, ikke på installerte sensorer. Det første jeg ville gjort, er å gå gjennom de
          5 400 rommene dere allerede har, og finne ut hvor mange av dem som faktisk har endret
          nattbemanningen.»</p></blockquote>`,
        krav: [
          "Første setning navngir feilen: kostnadsbasert prising på et verdibasert produkt.",
          "Du sier et konkret prisintervall, ikke bare «høyere».",
          "Du foreslår en modell som håndterer at verdien er betinget.",
          "Du nevner beslutningstakeren — prising er også et spørsmål om hvem du snakker med.",
          "Neste steg bruker data klienten allerede sitter på.",
        ],
        felle: "Å anbefale 37 500 kroner. Å foreslå at kunden gir fra seg hele sin egen gevinst er ikke et sterkt svar, det er et svar som ikke har møtt en kunde.",
      },
    ],
  },
  {
    id: "vekst-regnskapsprogram",
    label: "Veksten som ikke ble til omsetning",
    type: "Vekst",
    nivå: "Intro",
    firma: "Generisk",
    stil: "candidate-led",
    minutter: 30,
    ch: [],
    blurb: "Kundetallet har vokst 25 prosent. Omsetningen står stille. Trener den klassiske miksdekomponeringen, og forskjellen på vekst og verdiskaping.",
    prompt: `<p>Klienten er <b>Kontodata</b>, et norsk selskap som selger skybasert
      regnskapsprogram til små og mellomstore bedrifter. Abonnement, tre planer, betalt per år.</p>
      <p>På tre år har kundetallet vokst fra 40 000 til 50 000 — <b>25 prosent flere kunder</b>.
      Omsetningen er de samme 240 millionene i begge år. Listeprisene er ikke rørt.</p>
      <p>Daglig leder er frustrert: «Vi vinner kunder hver eneste måned, og likevel står
      topplinjen bom stille.» <b>Hvorfor, og hva skal de gjøre med det?</b></p>`,
    bakgrunn: `<p>Casen er konstruert, men den er den vanligste veksthistorien i norsk
      programvare: selskapet måler seg på antall kunder, salgsavdelingen bonuses på antall
      kunder, og markedsføringen optimaliseres mot antall kunder. Så flytter kundemassen seg mot
      den billigste planen, og hele veksten forsvinner i miksen.</p>
      <p>Det gjør casen til god trening, fordi den ser ut som en vekstcase — «hvordan skaffer vi
      flere kunder?» — mens volumet er det eneste som faktisk fungerer. Svaret ligger i
      <i>inntekt per kunde</i>, og verktøyet er en dekomponering: hvor mye av endringen skyldes
      antall, og hvor mye skyldes hva de betaler.</p>
      <p>I abonnementsforretninger har dette en ekstra brodd: marginalkostnaden per kunde er nær
      null, så mistet omsetning er mistet resultat, krone for krone.</p>`,
    trinn: [
      {
        art: "oppklaring",
        sek: 90,
        tittel: "Hva vil du vite før du begynner?",
        sp: `<p>Hvilke spørsmål stiller du før du strukturerer?</p>`,
        fasit: `<p>Du har allerede fått den viktigste opplysningen gratis — volumet vokser. Bruk
          avklaringene på det du <i>ikke</i> vet.</p>
          <ul>
            <li><b>Er de 50 000 kundene de samme 40 000 pluss 10 000 nye, eller har vi mistet
              mange og skaffet flere?</b> Bruttovekst og nettovekst er to helt forskjellige
              historier, og bare den ene er god.</li>
            <li><b>Hva er målet — omsetning, resultat eller verdsettelse ved et salg?</b> Et
              selskap som skal selges neste år, styres annerledes enn et som skal eies i ti.</li>
            <li><b>Er listeprisene virkelig uendret, eller gis det rabatter i nysalg?</b>
              Realisert pris og listepris er sjelden det samme.</li>
            <li><b>Har produktet eller planstrukturen endret seg i perioden?</b> En ny billig plan
              lansert i år 2 ville forklare alt.</li>
          </ul>`,
        krav: [
          "Du bruker ikke avklaringene på noe du allerede har fått vite.",
          "Du spør om brutto mot netto kundevekst — det er der halve svaret ligger.",
          "Du skiller listepris fra realisert pris.",
          "Du sier hva svaret ville endre i strukturen din.",
        ],
        felle: "Å spørre «hvordan går det med konkurrentene?» som første spørsmål. Det er et godt spørsmål senere, men her er problemet allerede lokalisert til noe internt: 25 prosent flere kunder og null vekst.",
      },
      {
        art: "struktur",
        sek: 150,
        tittel: "Strukturer problemet",
        sp: `<p>Bryt ned hvorfor omsetningen står stille når kundetallet vokser. <b>Avslutt med
          hypotesen din.</b></p>`,
        fasit: `<p>Start i identiteten, ikke i et rammeverk:</p>
          <div class="formula">
            <div class="eq">Omsetning = Antall kunder × Inntekt per kunde</div>
            <div class="eq">Antall kunder vokste 25 %. Omsetningen står stille. Altså falt inntekt per kunde ca. 20 %.</div>
            <div class="where">Fordi 1,25 × 0,80 = 1,00. Å si dette høyt før du får et eneste tall til,
              er det sterkeste enkelttrekket i denne casen.</div>
          </div>
          <p>Da har du eliminert halve treet på tjue sekunder, og resten av strukturen kan handle
          om det ene leddet som faktisk beveget seg. Inntekt per kunde kan falle av tre grunner,
          og bare tre:</p>
          <ul>
            <li><b>Miks:</b> kundene fordeler seg annerledes mellom planene. Flere billige, færre
              dyre. Prisene kan være helt uendret.</li>
            <li><b>Realisert pris innenfor hver plan:</b> rabatter, kampanjer, gratismåneder,
              lengre bindingstid mot lavere pris.</li>
            <li><b>Bruk og mersalg:</b> tilleggsmoduler, antall brukere, transaksjonsvolum — alt
              som gjorde at en kunde betalte mer enn grunnprisen.</li>
          </ul>
          <p>Og under miksen ligger to helt ulike mekanismer som må skilles: <b>nye kunder som
          kommer inn billigere</b>, og <b>eksisterende kunder som faller ned</b> eller forsvinner.
          Det første er et markedsføringsproblem, det andre er et produktproblem.</p>
          <p><b>Hypotesen:</b> veksten kommer i den billigste planen, mens de dyre planene
          skrumper. Jeg vil se kunder og omsetning fordelt på plan for begge årene.</p>`,
        krav: [
          "Du skriver identiteten og regner 1,25 × 0,80 = 1,00 før du ber om mer data.",
          "Du sier høyt at volumleddet er utelukket, og hvorfor det sparer tid.",
          "Nedbrytningen av inntekt per kunde er uttømmende: miks, realisert pris, mersalg.",
          "Du skiller nye kunder som kommer inn billig fra eksisterende som faller ned.",
          "Du ber om en konkret datatabell, ikke om «mer informasjon».",
        ],
        felle: "Å bygge et vekstrammeverk med «nytt marked, nytt produkt, nye kunder». Klienten vokser allerede i kunder — problemet er at veksten er verdiløs. Et Ansoff-tre svarer på feil spørsmål.",
      },
      {
        art: "exhibit",
        sek: 120,
        tittel: "Kundene fordelt på plan",
        sp: `<p>Du får tabellen du ba om. <b>Hva ser du, og hva betyr det?</b></p>`,
        figur: `<table class="data">
            <tr><th>Plan</th><th class="n">Pris per år</th><th class="n">Kunder år 1</th><th class="n">Kunder år 3</th><th class="n">Oms. år 1</th><th class="n">Oms. år 3</th></tr>
            <tr><td>Start (enkeltpersonforetak)</td><td class="n">2 400</td><td class="n">16 000</td><td class="n">29 500</td><td class="n">38,4</td><td class="n">70,8</td></tr>
            <tr><td>Vekst (bedrift med ansatte)</td><td class="n">7 200</td><td class="n">20 000</td><td class="n">17 500</td><td class="n">144,0</td><td class="n">126,0</td></tr>
            <tr><td>Pro (regnskapsbyrå)</td><td class="n">14 400</td><td class="n">4 000</td><td class="n">3 000</td><td class="n">57,6</td><td class="n">43,2</td></tr>
            <tr><td><b>Sum</b></td><td class="n"></td><td class="n"><b>40 000</b></td><td class="n"><b>50 000</b></td><td class="n"><b>240,0</b></td><td class="n"><b>240,0</b></td></tr>
            <tr><td><b>Inntekt per kunde (kr)</b></td><td class="n"></td><td class="n"><b>6 000</b></td><td class="n"><b>4 800</b></td><td class="n"></td><td class="n"></td></tr>
          </table>
          <p class="tiny">Omsetning i millioner kroner. Listeprisene er uendret gjennom hele perioden.</p>`,
        fasit: `<p>Overskriften først:</p>
          <p><i>«Prisene er uendret. Hele historien er miks: Start har vokst med 13 500 kunder,
          mens Vekst har falt 2 500 og Pro 1 000. Selskapet vokser i det billigste segmentet og
          krymper i de to som betaler.»</i></p>
          <p>Tre observasjoner som skiller:</p>
          <ul>
            <li><b>Regn de tre bevegelsene i kroner, ikke i kunder.</b> Start ga +32,4 millioner.
              Vekst tapte −18,0. Pro tapte −14,4. Summen er nøyaktig null. Det er ikke tilfeldig
              at det går opp — det er poenget: den billige veksten finansierer akkurat tapet av de
              dyre.</li>
            <li><b>Se på kundeandel mot omsetningsandel.</b> Start er nå 59 prosent av kundene og
              bare 29,5 prosent av omsetningen. Pro er 6 prosent av kundene og 18 prosent av
              omsetningen. Én Pro-kunde er verdt seks Start-kunder.</li>
            <li><b>De to fallene er ikke samme problem.</b> Vekst faller 12,5 prosent, Pro faller
              25 prosent. At det dyreste segmentet krymper raskest, er det mest alarmerende tallet
              i tabellen — regnskapsbyråer tar med seg hundrevis av sluttkunder når de bytter.</li>
          </ul>
          <p>Og det du <b>ikke</b> kan se i tabellen, må du be om: er nedgangen i Vekst kunder som
          har falt ned til Start, eller kunder som har forlatt huset? De to krever helt
          forskjellige tiltak.</p>`,
        krav: [
          "Du regner bevegelsene i kroner, ikke i antall kunder.",
          "Du ser at prisene er uendret, og slutter av det at hele effekten er miks.",
          "Du sammenligner kundeandel mot omsetningsandel og oversetter til «én Pro er verdt seks Start».",
          "Du peker på Pro-fallet som det farligste, og begrunner hvorfor.",
          "Du sier hva tabellen ikke svarer på: nedgradering eller frafall.",
        ],
        felle: "Å glede seg over at Start-segmentet vokser 84 prosent. Vekst i det billigste segmentet er bare god hvis kundene flytter oppover senere — og det er nettopp det tabellen antyder at de ikke gjør.",
      },
      {
        art: "regne",
        sek: 90,
        tittel: "Hva koster miksen dem?",
        sp: `<p>Inntekt per kunde falt fra 6 000 til 4 800 kroner.</p>
          <p><b>Hvor mye høyere ville omsetningen i år 3 vært hvis inntekten per kunde hadde holdt
          seg på 6 000 kroner? Svar i millioner kroner.</b></p>
          <p class="tiny">Si framgangsmåten høyt før du sier tallet.</p>`,
        svar: 60,
        enhet: "millioner kroner",
        toleranse: 0.02,
        fasit: `<p>Sammenlign faktisk omsetning med omsetningen på gammel inntekt per kunde, på
          dagens kundetall:</p>
          <div class="formula">
            <div class="eq">Ved uendret inntekt per kunde: 50 000 × 6 000 = 300 millioner</div>
            <div class="eq">Faktisk: 240 millioner</div>
            <div class="eq">Differanse: 300 − 240 = <b>60 millioner kroner</b></div>
            <div class="where">Eller rett fram: 50 000 × 1 200 = 60 millioner. 1 200 kroner lavere per
              kunde, ganger dagens 50 000 kunder — samme regnestykke, og slik bør du si det høyt.</div>
          </div>
          <p><b>Det som skiller et sterkt svar, er å sette opp broen begge veier:</b></p>
          <div class="formula">
            <div class="eq">Volumeffekt: +10 000 kunder × 6 000 = +60 millioner</div>
            <div class="eq">Mikseffekt: 50 000 kunder × (−1 200) = −60 millioner</div>
            <div class="eq">Netto: 0 — akkurat det klienten opplever</div>
          </div>
          <p>Nå kan du si noe langt skarpere enn «omsetningen står stille»: <i>«Salgsapparatet har
          levert 60 millioner i ny omsetning på tre år. Miksforskyvningen har spist opp nøyaktig
          alt.»</i> Det flytter samtalen fra «vi må vokse mer» til «vi må slutte å lekke».</p>
          <p>Og legg til poenget som gjør det alvorlig: i en abonnementsforretning er
          marginalkostnaden per kunde nær null. De 60 millionene er ikke tapt omsetning — de er
          tapt resultat, krone for krone.</p>`,
        krav: [
          "Du regner mot dagens kundetall, ikke mot fjorårets.",
          "Du setter opp broen: volumeffekt og mikseffekt hver for seg, og viser at de summerer til null.",
          "Du sier framgangsmåten før tallet, og oppgir enhet.",
          "Du oversetter tallet: 60 millioner tapt omsetning er 60 millioner tapt resultat i denne bransjen.",
        ],
        felle: "Å regne 20 prosent av 240 millioner (= 48) i stedet for 1 200 kroner ganger 50 000 kunder. Prosenten hører til inntekt per kunde, ikke til omsetningen — og grunnlaget er dagens kundetall, ikke fjorårets omsetning.",
      },
      {
        art: "ide",
        sek: 120,
        tittel: "Hva kan klienten gjøre?",
        sp: `<p><b>List så mange tiltak du klarer på to minutter.</b> Én per linje. Si
          oppdelingen din først.</p>`,
        liste: [
          "Finne ut hvor de 1 000 tapte Pro-kundene ble av, og hva som fikk dem til å dra",
          "Egen salgsrolle mot regnskapsbyråene — hver av dem tar med seg hundrevis av sluttkunder",
          "Bygge oppgraderingsstier i produktet: funksjoner som slår inn når bedriften får ansatte",
          "Prisdifferensiere Start etter antall bilag i stedet for én flat pris",
          "Ta betalt for funksjoner som i dag ligger gratis i Start — lønn, EHF-faktura, purring",
          "Heve listeprisene, som ikke har vært rørt på tre år",
          "Kutte rabattene i nysalg, og måle salgsavdelingen på omsetning i stedet for antall kunder",
          "Kryssalg til eksisterende kunder: betalingsterminal, faktureringstjeneste, forsikring",
          "Undersøke om Vekst-kundene faller ned til Start eller forlater huset — det er to ulike problemer",
          "Endre markedsføringen så den treffer bedrifter med ansatte, ikke enkeltpersonforetak",
          "Måle og styre på inntekt per kunde og segmentmiks, ikke på kundetall",
          "Sette et konverteringsmål: hvor mange Start-kunder skal opp til Vekst hvert år",
          "Vurdere en ren prisøkning i Start — 2 400 kroner er lavt, og frafall der koster lite",
          "Se på om produktet mangler noe regnskapsbyråene trenger, som en konkurrent har",
        ],
        fasit: `<p>Del i tre før du lister: <b>stoppe lekkasjen</b> (Pro og Vekst), <b>løfte dem vi
          har</b> (oppgradering, mersalg, pris) og <b>endre hvem vi skaffer</b> (markedsføring,
          salgsinsentiver).</p>
          <p>Prioritér etter tallene, ikke etter magefølelsen. Pro-fallet er 14,4 millioner:
          1 000 tapte kunder à 14 400 kroner. Å løfte 10 prosent av Start-kundene opp til Vekst er
          2 950 kunder × 4 800 kroner i prisforskjell = 14,2 millioner. De to største grepene er altså
          omtrent like store, men det ene er å stoppe en blødning og det andre er å bygge en
          motor. Rekkefølgen bør være blødningen først.</p>`,
        krav: [
          "Du sier oppdelingen din før du lister.",
          "Idéene dekker både frafallet i de dyre planene og løftet av de billige.",
          "Minst én idé handler om hva selskapet måler og belønner — det er årsaken bak årsaken.",
          "Du prioriterer med tall, ikke med adjektiver.",
        ],
        felle: "Å bare liste måter å skaffe flere kunder på. Klienten er allerede god til det — 25 prosent på tre år. Flere kunder av samme type gjør problemet større, ikke mindre.",
      },
      {
        art: "syntese",
        sek: 90,
        tittel: "Anbefalingen",
        sp: `<p>Daglig leder har <b>ett minutt</b>. Gi anbefalingen din.</p>`,
        fasit: `<p>Svaret først, så tallene, så hva som skal skje.</p>
          <blockquote><p><b>«Topplinjen står stille fordi kundemiksen har flyttet seg nedover, ikke
          fordi veksten mangler. Salget har levert 60 millioner i ny omsetning på tre år, og
          miksen har spist opp nøyaktig alt. Jeg anbefaler at dere stopper frafallet i Pro og
          Vekst før dere skaffer én kunde til.»</b></p>
          <p>Tre grunner. For det første er prisene uendret — hele effekten er miks. For det andre
          har Start vokst med 13 500 kunder og gitt 32 millioner, mens Vekst og Pro har tapt 3 500
          kunder og 32 millioner. For det tredje faller det dyreste segmentet raskest: Pro er ned
          25 prosent, og hver Pro-kunde er verdt seks Start-kunder.</p>
          <p>Konkret: sett en egen salgsressurs mot regnskapsbyråene og finn ut hvor de 1 000
          tapte gikk. Bygg samtidig en oppgraderingssti fra Start til Vekst — løfter dere ti
          prosent av Start-kundene, er det 14 millioner. Og endre målestokken: så lenge
          salgsavdelingen bonuses på antall kunder, får dere flere av den billigste sorten.</p>
          <p>Den store risikoen er at Pro-frafallet skyldes at produktet mangler noe en konkurrent
          har — da er ikke dette et salgsproblem, men et produktproblem. Det første jeg ville
          gjort, er å ringe tjue av de tapte Pro-kundene denne uken.»</p></blockquote>`,
        krav: [
          "Første setning sier hva som er galt, og det er ikke «vi vokser for sakte».",
          "Du bruker de tre tallene: +60 fra volum, −60 fra miks, og Pro ned 25 prosent.",
          "Du sier hva som skal gjøres først, og hvorfor rekkefølgen er slik.",
          "Du nevner insentivsystemet — det er den strukturelle årsaken.",
          "Risikoen du nevner, ville endret anbefalingen hvis den slår til.",
        ],
        felle: "Å oppsummere analysen kronologisk: «Først så vi på kundene, så på planene, så regnet vi …». Lederen var med hele veien. Start med konklusjonen.",
      },
    ],
  },
  {
    id: "ops-lakseslakteri",
    label: "Slakteriet som må si nei til fisk",
    type: "Operations",
    nivå: "Avansert",
    firma: "Generisk",
    stil: "candidate-led",
    minutter: 40,
    ch: [],
    blurb: "Etterspørselen er 80 000 tonn, kapasiteten 54 000. Trener flaskehalsanalyse, utnyttelsesgrad, og disiplinen i å sjekke hva som blir den neste flaskehalsen.",
    prompt: `<p>Klienten er <b>Nordfisk Slakteri</b> i Nordland, et lakseslakteri som tar imot
      fisk fra tolv oppdrettere i regionen og leverer sløyd og filetert laks til eksportører.</p>
      <p>Anlegget kjører to skift, 250 dager i året, og slakter <b>54 000 tonn</b>. Oppdretterne
      i regionen vil levere <b>80 000 tonn</b> i år. Nordfisk må si nei til resten, og fisken går
      til konkurrenten på andre siden av fjorden.</p>
      <p>Daglig leder har bedt om 90 millioner til en ny fileteringslinje. Styret vil vite om det
      er riktig bruk av pengene. <b>Hva anbefaler dere?</b></p>`,
    bakgrunn: `<p>Casen er konstruert, men flaskehalslogikken er universell: <b>gjennomstrømningen
      i et system er lik kapasiteten i det tregeste trinnet</b> — ikke gjennomsnittet, ikke
      summen. Alt du forbedrer et annet sted, forsvinner.</p>
      <p>Fiskeindustri er en god ramme for den ferdigheten fordi marginene er tynne: to prosent
      dekningsbidrag på omsetningen betyr at kapasitetsutnyttelse er nesten hele lønnsomheten.
      Og fordi råstoffet er ferskt, kan man ikke bygge lager foran flaskehalsen slik man kan i
      annen industri — fisken må gjennom når den kommer.</p>
      <p>Den vanskeligste delen av casen — og den som skiller — er å regne <i>hva som blir den
      neste flaskehalsen</i> etter at man har fjernet den første. En kandidat som anbefaler en ny
      fileteringslinje uten å sjekke pakkelinja, har løst feil problem til riktig pris.</p>`,
    trinn: [
      {
        art: "oppklaring",
        sek: 90,
        tittel: "Hva vil du vite før du begynner?",
        sp: `<p>Hvilke spørsmål stiller du før du strukturerer?</p>`,
        fasit: `<p>I en kapasitetscase er de tre avklaringene: <b>hva er målet</b>, <b>er
          etterspørselen ekte</b>, og <b>hva er lønnsomheten på marginalt volum</b>.</p>
          <ul>
            <li><b>Er de 80 000 tonnene en reell, kontraktsfestbar etterspørsel?</b> Det er
              forskjell på «oppdretterne sier de vil levere» og «vi har avtale om å ta imot». Uten
              det svaret er hele investeringen bygget på en antakelse.</li>
            <li><b>Hva tjener vi per tonn?</b> Uten dekningsbidraget kan ingen kapasitetsutvidelse
              vurderes — 26 000 tonn er verdiløst tall til det er oversatt til kroner.</li>
            <li><b>Er volumet jevnt fordelt over året?</b> Laks slaktes ikke jevnt. Er
              flaskehalsen bare bindende i seks uker om høsten, er svaret et helt annet enn hvis
              den er bindende hele året.</li>
            <li><b>Hva er målet — volum, resultat eller å beholde oppdretterne?</b> Å si nei til
              fisk kan koste kunder for alltid, og da er kapasiteten et forsvarsspørsmål, ikke et
              vekstspørsmål.</li>
          </ul>`,
        krav: [
          "Du spør om dekningsbidrag per tonn. Uten det kan ingen kapasitetsbeslutning tas.",
          "Du utfordrer om etterspørselen på 80 000 tonn er reell og varig.",
          "Du spør om sesongvariasjon — det avgjør om flaskehalsen er et års- eller et ukeproblem.",
          "Du spør om målet, og ser at «beholde oppdretterne» ville gitt en annen anbefaling.",
        ],
        felle: "Å gå rett på tekniske spørsmål om maskinene. Det er fristende i en operationscase, men rekkefølgen er den samme som ellers: mål, etterspørsel, økonomi — så teknikk.",
      },
      {
        art: "struktur",
        sek: 150,
        tittel: "Strukturer problemet",
        sp: `<p>Hvordan vil du finne ut om de 90 millionene er riktig bruk av pengene? Skriv
          strukturen, og <b>avslutt med hypotesen din</b>.</p>`,
        fasit: `<p>Start med identiteten for gjennomstrømning, ikke med et rammeverk:</p>
          <div class="formula">
            <div class="eq">Gjennomstrømning = Kapasitet i det tregeste trinnet × Oppetid × Driftstid</div>
            <div class="where">Tre knapper, og de koster helt ulikt. Oppetid er gratis, driftstid er
              lønn, kapasitet er kapital. Prøv dem i den rekkefølgen.</div>
          </div>
          <ul>
            <li><b>Finn flaskehalsen:</b> sammenlign hvert trinns effektive kapasitet — nominell
              rate ganger oppetid. Det tregeste trinnet bestemmer alt. Alle andre trinns kapasitet
              er irrelevant helt til flaskehalsen flytter seg.</li>
            <li><b>Utnyttelse før kapasitet:</b> hvorfor står flaskehalsen stille når den står
              stille? Omstilling, uplanlagt stopp, venting på råstoff, rengjøring. Hver time her
              er gratis kapasitet.</li>
            <li><b>Driftstid:</b> flere skift, flere dager, kortere pauser. Koster lønn og
              tillegg, men ingen kapital.</li>
            <li><b>Kapasitet:</b> ny linje. Dyrest, tregest — og bare relevant når de to første er
              uttømt. Og da må man sjekke hva som blir neste flaskehals.</li>
            <li><b>Utenfor anlegget:</b> sette ut overskuddsfisk til et annet slakteri, eller
              jevne ut leveransene i tid.</li>
          </ul>
          <p><b>Hypotesen:</b> anlegget slakter 54 000 tonn, og jeg vil vite hvor mye av gapet opp
          til 80 000 som skyldes at flaskehalsen står stille, før jeg vurderer å kjøpe mer av
          den. Jeg vil se kapasitet og oppetid per trinn.</p>`,
        krav: [
          "Du skriver gjennomstrømningsidentiteten og navngir de tre knappene.",
          "Du rangerer knappene etter kostnad: oppetid før driftstid før kapital.",
          "Du sier at bare flaskehalsens kapasitet betyr noe — de andre trinnene er støy inntil videre.",
          "Du har en gren for løsninger utenfor anlegget, ikke bare inne i det.",
          "Hypotesen peker på et konkret datasett du vil se.",
        ],
        felle: "Å strukturere som en investeringsanalyse — NPV, tilbakebetaling, risiko — uten først å spørre om investeringen løser riktig problem. Et perfekt regnestykke på feil tiltak er fortsatt feil.",
      },
      {
        art: "exhibit",
        sek: 150,
        tittel: "Linja, trinn for trinn",
        sp: `<p>Du får produksjonsdataene. <b>Hvor er flaskehalsen, og hva ser du ellers?</b></p>`,
        figur: `<table class="data">
            <tr><th>Trinn</th><th class="n">Nominell rate (tonn/t)</th><th class="n">Oppetid</th><th class="n">Effektiv rate (tonn/t)</th><th class="n">Tonn per år</th></tr>
            <tr><td>Mottak og bedøving</td><td class="n">32</td><td class="n">95 %</td><td class="n">30,4</td><td class="n">114 000</td></tr>
            <tr><td>Slakting og bløgging</td><td class="n">28</td><td class="n">90 %</td><td class="n">25,2</td><td class="n">94 500</td></tr>
            <tr><td><b>Filetering</b></td><td class="n"><b>18</b></td><td class="n"><b>80 %</b></td><td class="n"><b>14,4</b></td><td class="n"><b>54 000</b></td></tr>
            <tr><td>Pakking og ising</td><td class="n">25</td><td class="n">84 %</td><td class="n">21,0</td><td class="n">78 750</td></tr>
          </table>
          <p class="tiny">Driftstid: 2 skift × 7,5 timer × 250 dager = 3 750 timer per år.
            Dekningsbidrag: 1 500 kroner per tonn. Omsetning: 4 050 millioner kroner.</p>
          <table class="data">
            <tr><th>Hvorfor står fileteringslinja stille? (20 % av driftstiden)</th><th class="n">Andel</th><th class="n">Tapte tonn</th></tr>
            <tr><td>Omstilling mellom størrelsesklasser</td><td class="n">6 %</td><td class="n">4 050</td></tr>
            <tr><td>Uplanlagt stopp og vedlikehold</td><td class="n">5 %</td><td class="n">3 375</td></tr>
            <tr><td>Venting på råstoff — båten er forsinket</td><td class="n">5 %</td><td class="n">3 375</td></tr>
            <tr><td>Rengjøring utover planlagt</td><td class="n">4 %</td><td class="n">2 700</td></tr>
            <tr><td><b>Sum</b></td><td class="n"><b>20 %</b></td><td class="n"><b>13 500</b></td></tr>
          </table>`,
        fasit: `<p>Konklusjonen først, og den er entydig:</p>
          <p><i>«Filetering er flaskehalsen med god margin — 14,4 tonn i timen mot 21 for pakking
          og 25 for slakting. Anlegget kan aldri gjøre mer enn 54 000 tonn uansett hva som skjer
          med de tre andre trinnene.»</i></p>
          <ul>
            <li><b>Effektiv rate er den eneste kolonnen som betyr noe.</b> Filetering har lavest
              nominell rate <i>og</i> lavest oppetid — de to feilene forsterker hverandre. Det er
              også det som gjør at oppetiden er verdt så mye her: hvert prosentpoeng på
              flaskehalsen er et prosentpoeng på hele anlegget.</li>
            <li><b>De 20 prosentene har navn, og de er ikke like.</b> Omstilling og rengjøring er
              planleggingsproblemer og kan angripes uten investering. Venting på råstoff ligger
              utenfor porten og krever avtale med oppdretterne. Bare uplanlagt stopp er et rent
              teknisk problem.</li>
            <li><b>De tapte 13 500 tonnene er 20 millioner kroner i året</b> ved 1 500 kroner per
              tonn — uten at noen har investert en krone.</li>
          </ul>
          <p>Og legg merke til hvor tynn marginen er: 1 500 kroner per tonn av en pris på rundt
          75 000 er <b>2 prosent</b>. Det er derfor volum er alt i denne bransjen — og derfor
          en investering på 90 millioner skal begrunnes godt.</p>`,
        krav: [
          "Du regner effektiv rate, ikke nominell, og finner flaskehalsen på det.",
          "Du ser at filetering har lavest rate og lavest oppetid — begge deler, og at det ikke er tilfeldig.",
          "Du deler de 20 prosentene i det som kan fikses innenfor og utenfor anlegget.",
          "Du oversetter tapte timer til tapte tonn til kroner, ikke bare til prosent.",
          "Du kommenterer at dekningsgraden er 2 prosent, og hva det betyr for investeringsterskelen.",
        ],
        felle: "Å foreslå å oppgradere slakte- eller pakkelinja fordi de også har fravær. Hvert prosentpoeng oppetid utenfor flaskehalsen er verdt nøyaktig null tonn.",
      },
      {
        art: "regne",
        sek: 90,
        tittel: "Hva er oppetiden verdt?",
        sp: `<p>Anta at Nordfisk klarer å løfte oppetiden på fileteringslinja fra 80 til
          90 prosent, uten å investere i nytt utstyr.</p>
          <p><b>Hvor mange tonn ekstra kan de kjøre gjennom per år? Svar i tonn.</b></p>
          <p class="tiny">Si oppsettet høyt før du regner.</p>`,
        svar: 6750,
        enhet: "tonn per år",
        toleranse: 0.02,
        fasit: `<p>Regn på flaskehalsen, og bare på flaskehalsen:</p>
          <div class="formula">
            <div class="eq">Teoretisk kapasitet: 18 tonn/t × 3 750 timer = 67 500 tonn</div>
            <div class="eq">Ved 80 %: 54 000 tonn. Ved 90 %: 60 750 tonn</div>
            <div class="eq">Differanse: <b>6 750 tonn per år</b></div>
            <div class="where">Eller rett fram: 10 prosentpoeng av 67 500 = 6 750. Samme regnestykke,
              og raskere å si høyt.</div>
          </div>
          <p><b>Så kommer «so what», og det er der casen vinnes:</b></p>
          <ul>
            <li><b>6 750 tonn × 1 500 kroner = 10,1 millioner kroner i året — uten kapital.</b>
              Det er over ett års avkastning på en investering på 90 millioner, hentet ut av
              planlegging og vedlikehold.</li>
            <li><b>Sjekk om flaskehalsen flytter seg.</b> Ved 90 prosent kjører filetering
              16,2 tonn i timen. Pakking gjør 21,0. Fortsatt slakk — flaskehalsen står. Å si dette
              høyt, uoppfordret, er markøren for et sterkt operationssvar.</li>
            <li><b>Og gjør det samme for investeringen.</b> To fileteringslinjer på 90 prosent gir
              32,4 tonn i timen — men da er <i>pakkelinja</i> flaskehalsen på 21,0 tonn, altså
              78 750 tonn i året. De 90 millionene kjøper derfor ikke 67 500 tonn til; de kjøper
              78 750 − 60 750 = <b>18 000 tonn</b>, verdt 27 millioner i året. Tilbakebetaling
              3,3 år — og bare hvis pakkelinja ikke må oppgraderes også.</li>
          </ul>
          <p>Sanity-sjekk på toppen: selv med ny linje og full pakkekapasitet stopper anlegget på
          78 750 tonn, mens oppdretterne tilbyr 80 000. Taket er altså nesten nøyaktig
          etterspørselen — det er ingen grunn til å bygge mer enn dette.</p>`,
        krav: [
          "Du regner på flaskehalsen alene, ikke på anleggets gjennomsnitt.",
          "Du oversetter tonn til kroner umiddelbart, og sammenligner med investeringen.",
          "Du sjekker uoppfordret om flaskehalsen flytter seg — først etter oppetidsløftet, så etter investeringen.",
          "Du ser at pakkelinja setter det reelle taket for den nye linja, ikke fileteringen.",
          "Du sanity-sjekker mot etterspørselen på 80 000 tonn til slutt.",
        ],
        felle: "Å regne 10 prosent av 54 000 (= 5 400) i stedet for 10 prosentpoeng av 67 500. Prosentpoeng måles mot den teoretiske kapasiteten, ikke mot dagens produksjon.",
      },
      {
        art: "ide",
        sek: 120,
        tittel: "Hvordan får de opp gjennomstrømningen?",
        sp: `<p><b>List så mange tiltak du klarer på to minutter.</b> Én per linje. Si
          oppdelingen først.</p>`,
        liste: [
          "Redusere omstillingstiden mellom størrelsesklasser — planlegg dagen etter størrelse, ikke etter båt",
          "Sortere fisken før filetering, så linja kan kjøre lange serier per klasse",
          "Flytte planlagt vedlikehold på fileteringslinja til helg eller til skiftpausen",
          "Koordinere båtankomstene bedre, med bonus eller bot for punktlighet",
          "Bygge et lite mellomlager foran filetering så linja ikke sulter når båten er sen",
          "Kjøre rengjøringen på skiftbytte i stedet for etter siste skift",
          "Bemanne fileteringslinja i pausene, så den ikke stopper når folk spiser",
          "Måle OEE på fileteringslinja og henge tavla på veggen — ingen styrer det de ikke måler",
          "Sette inn ekstra operatør på det manuelle trimmetrinnet, hvis det er der takten settes",
          "Kjøpe en ny fileteringslinje — men først regne på om pakkelinja tåler volumet",
          "Innføre et tredje skift, med de tilleggene og den kortere rengjøringstiden det innebærer",
          "Sette ut overskuddsfisken til nabolegatet på kontrakt i stedet for å avvise den",
          "Reforhandle med oppdretterne så leveransene jevnes ut over året",
          "Selge mer rundfisk usløyd i toppene, slik at volumet går utenom fileteringen helt",
        ],
        fasit: `<p>Gruppér etter hva de koster, ikke etter hva de er: <b>gratis</b> (planlegging,
          rekkefølge, måling), <b>lønnskostnad</b> (skift, pausebemanning) og <b>kapital</b>
          (ny linje). Legg til en fjerde gruppe de fleste glemmer: <b>utenfor anlegget</b> — sette
          ut volum, jevne ut leveranser, selge produktet i en form som ikke går gjennom
          flaskehalsen.</p>
          <p>Prioritér: de 20 prosentene i nedetid er 13 500 tonn og 20 millioner kroner. Ingen av
          de kapitalfrie tiltakene er utprøvd ennå. Det er svært vanskelig å forsvare 90 millioner
          før den listen er tømt.</p>`,
        krav: [
          "Du grupperer etter kostnad — gratis, lønn, kapital — og ikke etter teknisk kategori.",
          "Du har med minst ett tiltak som ligger utenfor anlegget.",
          "Minst ett tiltak angriper hver av de fire nedetidsårsakene.",
          "Du prioriterer, og prioriteringen følger av at de gratis tiltakene er verdt 20 millioner.",
        ],
        felle: "Å foreslå «mer automatisering» eller «lean» som tiltak. Det er kategorier, ikke handlinger. Et tiltak skal kunne settes på en tavle med en ansvarlig og en frist.",
      },
      {
        art: "syntese",
        sek: 90,
        tittel: "Anbefalingen",
        sp: `<p>Styrelederen har <b>ett minutt</b>. Gi anbefalingen din.</p>`,
        fasit: `<p>Standpunkt, tall, risiko, neste steg.</p>
          <blockquote><p><b>«Ikke bevilg de 90 millionene ennå. Fileteringslinja står stille
          20 prosent av tiden, og de timene er verdt 20 millioner kroner i året. Ta dem først.»</b></p>
          <p>Tre grunner. For det første er filetering utvilsomt flaskehalsen: 14,4 tonn i timen
          effektivt, mot 21 for pakking og 25 for slakting. For det andre gir et løft i oppetiden
          fra 80 til 90 prosent 6 750 tonn og 10 millioner kroner i året, uten en krone i kapital
          — og halvparten av nedetiden er omstilling og rengjøring, altså planlegging. For det
          tredje kjøper de 90 millionene mindre enn de ser ut til: med to fileteringslinjer blir
          pakkelinja flaskehalsen på 78 750 tonn, så investeringen gir 18 000 tonn og
          3,3 års tilbakebetaling — ikke det dobbelte av dagens volum.</p>
          <p>Konkret: sett et OEE-mål på fileteringslinja på 90 prosent innen tolv måneder, med
          navngitt ansvarlig. Legg om produksjonsplanen så fisken sorteres i størrelsesklasser før
          linja, og flytt vedlikeholdet ut av driftstiden. Sett samtidig ut de 19 000 tonnene dere
          fortsatt må si nei til, på kontrakt hos nabolegatet, så oppdretterne ikke forsvinner.</p>
          <p>Den store risikoen er nettopp den: sier dere nei i to år til, mister dere
          oppdretterne for godt, og da er det ingen investering som hjelper. Det første jeg ville
          gjort, er å regne på hvor mye av de 80 000 tonnene som kommer fra oppdrettere som også
          leverer til konkurrenten.»</p></blockquote>`,
        krav: [
          "Første setning tar standpunkt til investeringsspørsmålet, ikke til flaskehalsen.",
          "Du bruker tallene: 20 millioner gratis, 10 millioner fra oppetid, 18 000 tonn fra investeringen.",
          "Du sier at pakkelinja blir neste flaskehals — det er innsikten som gjør svaret distinkt.",
          "Anbefalingen håndterer risikoen ved å si nei til fisk, ikke bare kapasiteten.",
          "Du holder deg innenfor ett minutt.",
        ],
        felle: "Å konkludere «nei til investeringen» og stoppe der. Kunden har fortsatt 19 000 tonn de må si nei til. Et sterkt svar sier hva som skjer med den fisken i mellomtiden.",
      },
    ],
  },
  {
    id: "lonn-apotek-varemiks",
    label: "Marginen som ikke rørte seg",
    type: "Lønnsomhet",
    nivå: "Middels",
    firma: "Generisk",
    stil: "candidate-led",
    minutter: 30,
    ch: [],
    blurb: "Bruttomarginen er identisk to år på rad, og likevel forsvinner resultatet. Trener det vektede snittet: en flat prosent kan skjule to store bevegelser som opphever hverandre.",
    prompt: `<p>Klienten er <b>Bergli Apotek</b>, en kjede med 90 apotek i Trøndelag og Nord-Norge.
      Selskapet er familieeid i andre generasjon.</p>
      <p>På tre år har omsetningen vokst fra <b>1 600 til 2 000 millioner kroner</b> — 25 prosent —
      og <b>bruttomarginen har vært helt uendret på 27,5 prosent begge år</b>. Likevel har
      driftsresultatet falt fra <b>80 til 50 millioner</b>.</p>
      <p>Daglig leder oppsummerer det slik: «Marginen står jo stille. Da må problemet ligge i
      kostnadene — vi har åpnet tolv nye apotek på tre år.»</p>
      <p><b>Stemmer den diagnosen? Hvorfor faller resultatet, og hva bør klienten gjøre?</b></p>`,
    bakgrunn: `<p>Casen er konstruert, men mekanismen er den mest reelle som finnes i norsk
      apotekdrift. Et apotek selger tre helt ulike ting med tre helt ulike marginer:
      <b>reseptbelagte legemidler</b>, der avansen er fastsatt i forskrift og er lav;
      <b>reseptfrie legemidler</b>; og <b>handelsvarer</b> — hudpleie, kosttilskudd,
      sykepleieartikler — som prises fritt og er den klart mest lønnsomme delen.</p>
      <p>Bruttomarginen kjeden rapporterer, er derfor <i>ikke en margin</i>. Den er et vektet
      snitt over tre forretninger, og et vektet snitt har to bevegelige deler: <b>satsene</b> og
      <b>vektene</b>. Nesten alle kandidater ser bare på satsene.</p>
      <p>Vektene beveger seg dessuten av grunner kjeden ikke rår over. En eldre befolkning og
      dyrere legemidler skyver reseptandelen oppover av seg selv. Samtidig har generisk bytte
      faktisk løftet apotekets margin <i>på</i> resept de siste årene. Da kan det oppstå akkurat
      det som skjer her: hver enkelt varegruppe blir bedre, og summen står bom stille.</p>`,
    trinn: [
      {
        art: "oppklaring",
        sek: 90,
        tittel: "Hva vil du vite før du begynner?",
        sp: `<p>Du har hørt prompten. <b>Hvilke spørsmål stiller du før du strukturerer?</b></p>`,
        fasit: `<p>Ett spørsmål er verdt mer enn alle de andre til sammen her, og det er dette:</p>
          <p><b>«Er bruttomarginen på 27,5 prosent ett tall, eller et snitt over varegrupper med
          ulik margin?»</b></p>
          <p>Svaret avgjør om ordet «uendret» betyr noe i det hele tatt. Er det ett produkt, er
          marginen faktisk stabil og hele casen ligger i kostnadene. Er det et snitt, kan alt ha
          flyttet på seg under overflaten. <i>Å stille det spørsmålet først er selve skillet
          mellom en sterk og en middels åpning</i> — og det tar ti sekunder.</p>
          <p>Deretter to eller tre til, valgt med hensikt:</p>
          <ul>
            <li><b>Kommer veksten på 25 prosent fra volum, pris eller nye apotek?</b> Tolv nye
              apotek av 78 er 15 prosent flere utsalg. Da er mesteparten av veksten kjøpt, ikke
              tjent, og det endrer hva vi skal forvente av kostnadene.</li>
            <li><b>Hva gjør sammenlignbare apotek — de som var med begge år?</b> Uten
              like-for-like blander vi to spørsmål: driver de eksisterende apotekene dårligere,
              eller er de nye ennå ikke modne?</li>
            <li><b>Hva er målet?</b> Tilbake til 80 millioner, eller en bestemt margin? Skal
              kjeden vokse videre, eller konsolidere? Anbefalingen blir en annen.</li>
          </ul>
          <p>Legg merke til hva du <b>ikke</b> bør spørre om ennå: detaljer om enkeltkostnader.
          Du vet ikke om kostnadene er problemet, og daglig leder har allerede gitt deg sin
          hypotese. Å begynne der er å arve konklusjonen hans.</p>`,
        krav: [
          "Du spør om bruttomarginen er ett tall eller et vektet snitt, og gjør det tidlig.",
          "Du sier hvorfor du spør — at svaret bestemmer hvor du leter videre.",
          "Du skiller vekst fra nye apotek fra vekst i eksisterende apotek.",
          "Du spør om målet, ikke bare om tallene.",
          "Du overtar ikke daglig leders hypotese om at problemet er kostnadene.",
        ],
        felle: "Å ta imot «marginen står stille» som et faktum og gå rett til kostnadssiden. Setningen er ikke et faktum, den er en sammenveiing — og i denne casen er den nøyaktig feil vei å begynne.",
      },
      {
        art: "struktur",
        sek: 150,
        tittel: "Strukturer problemet",
        sp: `<p>Bryt ned hvorfor driftsresultatet kan ha falt når omsetningen vokser og
          bruttomarginen står stille. <b>Avslutt med hypotesen din.</b></p>`,
        fasit: `<p>Start i identiteten, og skriv den med <b>summetegnet synlig</b>. Det er
          summetegnet som er hele poenget i denne casen:</p>
          <div class="formula">
            <div class="eq">Driftsresultat = Σᵢ (Omsetningᵢ × Bruttomarginᵢ) − Lønn − Husleie − Andre driftskostnader</div>
            <div class="where">i = varegruppe: reseptbelagt, reseptfritt, handelsvarer</div>
          </div>
          <p>Og skriv så opp hvordan en endring i den samlede bruttofortjenesten alltid kan
          deles i to:</p>
          <div class="formula">
            <div class="eq">Δ Bruttofortjeneste = <b>Satseffekt</b> (marginen i hver varegruppe) + <b>Mikseffekt</b> (vektene mellom dem)</div>
          </div>
          <p>Det gir tre grener, og du kan si høyt hva du forventer i hver:</p>
          <ul>
            <li><b>Satsene per varegruppe.</b> Innkjøpspris, apotekavanse på resept, egen
              prissetting på handelsvarer, andel generika.</li>
            <li><b>Miksen mellom varegruppene.</b> Reseptvolum vokser demografisk;
              handelsvarer konkurrerer med dagligvare og nett. Retningen er gitt på forhånd.</li>
            <li><b>Kostnadsbasen.</b> Lønn (farmasøyter er dyre og lovpålagte), husleie,
              og etableringskostnader for de tolv nye apotekene.</li>
          </ul>
          <p><b>Hypotesen:</b> når snittmarginen står helt stille i en bransje der reseptandelen
          stiger av seg selv, er den mest sannsynlige forklaringen ikke at ingenting har skjedd —
          det er at <i>to ting har skjedd samtidig og går opp i opp</i>. Jeg vil be om omsetning
          og margin per varegruppe for begge år, og regne bruttofortjenesten i kroner.</p>
          <p><b>Sterkt mot middels:</b> et middels svar deler i «inntekter og kostnader» og går
          videre. Et sterkt svar sier eksplisitt at det trenger <i>begge</i> tallene for
          <i>begge</i> år — omsetning og margin per gruppe — og begrunner hvorfor bare marginer
          ikke holder: uten omsetningen kan du ikke regne vektene.</p>`,
        krav: [
          "Du skriver bruttofortjenesten som en sum over varegrupper, ikke som ett produkt.",
          "Du deler endringen eksplisitt i en satseffekt og en mikseffekt.",
          "Du ber om omsetning og margin per varegruppe for begge år, og sier hvorfor begge trengs.",
          "Grenene er apotekets egne — resept, reseptfritt, handelsvarer — ikke generiske bokser.",
          "Du avslutter med en hypotese som kan vise seg å være feil.",
        ],
        felle: "Å tegne et profitt-tre med «pris × volum» på toppen og stoppe der. Et apotek har ikke én pris og ett volum, det har tre forretninger i samme lokale, og treet må forgrene seg før du multipliserer.",
      },
      {
        art: "exhibit",
        sek: 150,
        tittel: "Varegruppene, begge år",
        kort: "Varemiks",
        sp: `<p>Intervjueren gir deg omsetning og bruttomargin per varegruppe for begge år, og
          resultatoppstillingen under. Millioner kroner. <b>Hva ser du?</b></p>`,
        figur: `<table class="data">
            <tr><th>Millioner kroner</th><th class="n">Oms. år 1</th><th class="n">Margin år 1</th><th class="n">Bruttofortj. år 1</th><th class="n">Oms. år 3</th><th class="n">Margin år 3</th><th class="n">Bruttofortj. år 3</th></tr>
            <tr><td>Reseptbelagte legemidler</td><td class="n">960</td><td class="n">17,5 %</td><td class="n">168</td><td class="n">1 400</td><td class="n">20,0 %</td><td class="n">280</td></tr>
            <tr><td>Reseptfrie legemidler</td><td class="n">320</td><td class="n">40,0 %</td><td class="n">128</td><td class="n">300</td><td class="n">43,0 %</td><td class="n">129</td></tr>
            <tr><td>Handelsvarer</td><td class="n">320</td><td class="n">45,0 %</td><td class="n">144</td><td class="n">300</td><td class="n">47,0 %</td><td class="n">141</td></tr>
            <tr><td><b>Sum</b></td><td class="n"><b>1 600</b></td><td class="n"><b>27,5 %</b></td><td class="n"><b>440</b></td><td class="n"><b>2 000</b></td><td class="n"><b>27,5 %</b></td><td class="n"><b>550</b></td></tr>
          </table>
          <table class="data">
            <tr><th>Millioner kroner</th><th class="n">År 1</th><th class="n">År 3</th><th class="n">Endring</th></tr>
            <tr><td>Bruttofortjeneste</td><td class="n">440</td><td class="n">550</td><td class="n">+110</td></tr>
            <tr><td>Lønn</td><td class="n">250</td><td class="n">350</td><td class="n">+100</td></tr>
            <tr><td>Husleie</td><td class="n">60</td><td class="n">80</td><td class="n">+20</td></tr>
            <tr><td>Andre driftskostnader</td><td class="n">50</td><td class="n">70</td><td class="n">+20</td></tr>
            <tr><td><b>Driftsresultat</b></td><td class="n"><b>80</b></td><td class="n"><b>50</b></td><td class="n"><b>−30</b></td></tr>
            <tr><td>Driftsmargin</td><td class="n">5,0 %</td><td class="n">2,5 %</td><td class="n">−2,5 pp</td></tr>
            <tr><td>Antall apotek</td><td class="n">78</td><td class="n">90</td><td class="n">+12</td></tr>
          </table>`,
        fasit: `<p>Overskriften først, og den skal treffe hardt:</p>
          <p><i>«Marginen står ikke stille. Den gjør to store ting samtidig, og de går tilfeldigvis
          opp i opp. Hver eneste varegruppe har fått bedre margin — resept opp 2,5 prosentpoeng,
          reseptfritt 3,0, handelsvarer 2,0. Samtidig har reseptandelen gått fra 60 til 70 prosent
          av omsetningen, og resept er den gruppen som tjener minst per krone.»</i></p>
          <p>Regn vektene høyt, det tar femten sekunder:</p>
          <ul>
            <li><b>År 1:</b> 960 / 1 600 = <b>60 %</b> resept, 20 % reseptfritt, 20 % handelsvarer.</li>
            <li><b>År 3:</b> 1 400 / 2 000 = <b>70 %</b> resept, 15 % og 15 %.</li>
          </ul>
          <p>Og se hva som skjer i kroner, ikke i prosent: <b>reseptfritt og handelsvarer har
          faktisk krympet</b>, fra 320 til 300 millioner hver. Hele veksten på 400 millioner er
          resept — den gruppen som legger igjen 20 øre per krone mot handelsvarenes 47.</p>
          <p>Så den andre halvdelen av bildet, som også er ekte: <b>kostnadene vokste 140
          millioner mens bruttofortjenesten vokste 110.</b> Det er 39 prosent kostnadsvekst mot
          25 prosent omsetningsvekst. Daglig leder har altså ikke helt feil — men han har feil om
          årsaksrekkefølgen, og han overser at resept er den varegruppen som krever mest
          arbeid per omsatt krone.</p>
          <p><b>Sterkt mot middels:</b> et middels svar leser at alle tre marginene er opp og
          konkluderer at varemiksen er uskyldig. Et sterkt svar ser at nettopp det er umulig å
          forene med en flat sumlinje uten at vektene har flyttet seg — og sier: «Da må jeg
          kvantifisere hva miksen kostet, i kroner.»</p>`,
        krav: [
          "Du regner andelene per varegruppe for begge år før du sier noe om marginene.",
          "Du ser at reseptfritt og handelsvarer har krympet i kroner, ikke bare i andel.",
          "Du sier at alle tre marginene er opp, og at det gjør den flate sumlinjen umulig uten en miksforskyvning.",
          "Du merker deg at kostnadene vokste 39 prosent mot omsetningens 25.",
          "Du sier hva du vil regne videre, i stedet for å konkludere fra tabellen.",
        ],
        felle: "Å konkludere fra sumlinjen. Sumlinjen er den eneste raden i tabellen som ikke inneholder informasjon — den er et vektet snitt, og et vektet snitt kan stå bom stille mens begge delene beveger seg kraftig i hver sin retning.",
      },
      {
        art: "regne",
        sek: 120,
        tittel: "Hva kostet miksforskyvningen?",
        kort: "Mikskost",
        sp: `<p>Regn hva miksforskyvningen kostet klienten i år 3, målt i <b>millioner kroner
          bruttofortjeneste</b>.</p>
          <p class="tiny">Bruk år 3 sin omsetning på 2 000 millioner og år 3 sine marginer, men
          år 1 sin varemiks. Si framgangsmåten høyt før du sier tallet.</p>`,
        svar: 50,
        enhet: "millioner kroner",
        toleranse: 0.02,
        fasit: `<p>Legg år 1 sine vekter — 60 / 20 / 20 — på år 3 sin omsetning, og bruk år 3 sine
          marginer:</p>
          <div class="formula">
            <div class="eq">Resept: 60 % × 2 000 = 1 200, ganger 20,0 % = 240</div>
            <div class="eq">Reseptfritt: 20 % × 2 000 = 400, ganger 43,0 % = 172</div>
            <div class="eq">Handelsvarer: 20 % × 2 000 = 400, ganger 47,0 % = 188</div>
            <div class="eq">Sum = 600, altså en blandet margin på <b>30,0 %</b></div>
            <div class="eq">Faktisk bruttofortjeneste: 550. Differanse: 600 − 550 = <b>50 millioner</b></div>
            <div class="where">Snarveien er den samme regningen sagt kortere: 30,0 % − 27,5 % =
              2,5 prosentpoeng, ganger 2 000 millioner = 50. Det er slik du bør si den høyt.</div>
          </div>
          <p><b>Og her ligger poenget de fleste går glipp av.</b> Regn den motsatte veien også,
          det tar ti sekunder: med år 3 sin miks, men år 1 sine marginer, blir bruttofortjenesten
          1 400 × 17,5 % + 300 × 40,0 % + 300 × 45,0 % = <b>500 millioner</b>. Marginarbeidet var
          altså verdt <b>+50 millioner</b>, og miksforskyvningen kostet <b>−50 millioner</b>.
          <i>De to er nøyaktig like store.</i> Det er derfor sumlinjen ikke rørte seg.</p>
          <p>Sett det opp mot resultatfallet: <b>miksen kostet 50 millioner, mens hele
          resultatfallet er 30.</b> Uten miksforskyvningen ville driftsresultatet i år 3 vært
          600 − 500 = <b>100 millioner</b> — altså høyere enn år 1, til tross for at
          kostnadsbasen vokste 140 millioner. Organisasjonen har levert et ekte marginløft på
          50 millioner og gitt hver eneste krone av det bort til en forskyvning den ikke rår
          over.</p>
          <p><b>Sterkt mot middels:</b> et middels svar leverer 50 og sier «miksen er problemet».
          Et sterkt svar sier hva det betyr for hva klienten skal gjøre: <i>marginen per
          varegruppe er ikke lenger det interessante løftet — det arbeidet er allerede gjort og
          gjort godt. Løftet ligger enten i å endre selve miksen, eller i å ta ned kostnaden per
          omsatt reseptkrone. Å be innkjøpsavdelingen om enda en runde med marginforbedring er å
          be om mer av det som allerede har blitt spist opp.</i></p>`,
        krav: [
          "Du regner mot år 3 sin omsetning, ikke år 1 sin.",
          "Du sier framgangsmåten før tallet, og oppgir enhet.",
          "Du regner også den motsatte veien, og ser at satseffekten er +50 mot miksens −50.",
          "Du ser at 50 er større enn resultatfallet på 30, og trekker den riktige slutningen.",
          "Du sier hva funnet gjør med hvilke tiltak som er verdt noe.",
        ],
        felle: "Å regne mikseffekten mot år 1 sin omsetning på 1 600 millioner. Mikseffekten er et spørsmål om hvordan dagens omsetning er fordelt, og skal alltid måles på dagens grunnlag — ellers svarer du på hva miksen ville kostet i fortiden.",
      },
      {
        art: "ide",
        sek: 120,
        tittel: "Hva kan klienten gjøre?",
        sp: `<p>Du vet nå hvor pengene forsvinner. <b>List så mange tiltak du klarer på to
          minutter.</b> Én per linje. Få dem ut først, sorter etterpå.</p>`,
        liste: [
          "Øke handelsvaresalget per reseptkunde: plassering, tilbud i kassa, farmasøytens anbefaling ved utlevering",
          "Bygge helsetjenester i apotek — vaksinering, inhalasjonsveiledning, medisinstart — som prises fritt",
          "Automatisere reseptekspedisjonen: robotlager, e-resept, forhåndsplukk og hentehyller",
          "Flytte reseptvolum til nett og postutlevering, der kostnaden per ekspedisjon er lavere",
          "Øke andelen generika ytterligere der byttelisten tillater det",
          "Reforhandle innkjøpsavtalene på handelsvarer, der marginen faktisk er fri",
          "Utvide egne merkevarer i handelsvaresortimentet",
          "Prise handelsvarer aktivt etter etterspørsel i stedet for fast påslag",
          "Kutte sortiment som binder plass og lager uten å bidra til bruttofortjenesten",
          "Bemanne etter reseptrush i stedet for flat åpningstidsbemanning",
          "Reforhandle husleie, eventuelt til omsetningsbasert leie",
          "Stanse eller reversere åpningsprogrammet til de tolv nye apotekene er modne",
          "Måle og styre på bruttofortjeneste i kroner per apotek, ikke på bruttomargin i prosent",
          "Bygge multidose- og sykehjemsavtaler, der volumet er forutsigbart og bemanningen kan planlegges",
        ],
        fasit: `<p>Si oppdelingen din <b>før</b> du lister. Analysen gir den nesten gratis, og en
        god deling her er tredelt:</p>
          <ul>
            <li><b>Endre miksen:</b> selg mer av det som tjener penger, til de kundene som
              allerede står i lokalet.</li>
            <li><b>Ta ned kostnaden per reseptekspedisjon:</b> resept er 70 prosent av
              omsetningen og kommer til å bli mer, så kostnaden per ekspedisjon er den varige
              kampen.</li>
            <li><b>Rydde i kostnadsbasen:</b> lønn, husleie og åpningstakten.</li>
          </ul>
          <p>Avslutt med å prioritere. <b>Den ene idéen som følger direkte av analysen</b>, er å
          slutte å styre på bruttomargin i prosent. Den tallstørrelsen ga ledelsen feil svar i tre
          år på rad. Bruttofortjeneste i kroner per apotek ville sagt sannheten hele veien.</p>`,
        krav: [
          "Du sier oppdelingen din før du begynner å liste.",
          "Idéene treffer både miksen og kostnaden per reseptekspedisjon, ikke bare den ene.",
          "Minst én idé angriper styringsparameteren selv — at kjeden måler feil størrelse.",
          "Du prioriterer til slutt og sier hvilke to som betyr mest.",
        ],
        felle: "Å foreslå «bedre innkjøpsavtaler» som hovedtiltak. Analysen viste at marginene allerede er løftet 2 til 3 prosentpoeng i alle tre gruppene. Den brønnen er tømt, og en anbefaling som går dit, viser at du ikke tok inn hva regnestykket faktisk sa.",
      },
      {
        art: "syntese",
        sek: 90,
        tittel: "Anbefalingen",
        sp: `<p>Daglig leder kommer inn og har <b>ett minutt</b>. Gi anbefalingen din.</p>
          <p class="tiny">Skriv den slik du ville sagt den — og husk at han allerede har uttalt
          en diagnose du er uenig i.</p>`,
        fasit: `<p>Topp-ned. Svaret først, og i dette tilfellet må første setning også korrigere
          en feil premiss — høflig, men tydelig.</p>
          <blockquote><p><b>«Marginen har ikke stått stille. Den har gjort to store ting som går
          opp i opp, og den viktigste av dem koster dere 50 millioner i året — mer enn hele
          resultatfallet på 30.»</b></p>
          <p>Tre grunner. For det første er marginen bedre i hver eneste varegruppe: opp 2,5
          prosentpoeng på resept, 3,0 på reseptfritt, 2,0 på handelsvarer. Det arbeidet er verdt
          50 millioner, og det er gjort godt. For det andre har reseptandelen gått fra 60 til 70
          prosent, og resept legger igjen 20 øre per krone mot handelsvarenes 47. Den
          forskyvningen spiser nøyaktig opp hele marginløftet. For det tredje har kostnadene
          vokst 39 prosent mot omsetningens 25 — det er reelt, men det er den andre halvparten,
          ikke den første.</p>
          <p>Konkret anbefaler jeg to ting. Slutt å styre på bruttomargin i prosent; styr på
          bruttofortjeneste i kroner per apotek. Og angrip miksen der dere faktisk kan: hver
          reseptkunde står allerede i lokalet, og handelsvaresalget per kunde er den eneste
          hendelen som gjør demografien til penger i stedet for til en kostnad.</p>
          <p>Den store risikoen er at apotekavansen på resept er politisk bestemt. Mye av de 2,5
          prosentpoengene kan tas tilbake med et forskriftsvedtak, og da forsvinner marginløftet
          uten at miksen snur. Neste steg jeg ville tatt, er å skille de tolv nye apotekene ut av
          tallene og se om sammenlignbare apotek forteller den samme historien.»</p></blockquote>`,
        krav: [
          "Første setning korrigerer premissen og gir svaret, uten å bli belærende.",
          "Du bruker casens egne tall: 50 mot 30, 60 til 70 prosent, 20 øre mot 47.",
          "Du sier hva klienten skal gjøre, og at styringsparameteren selv må byttes.",
          "Du nevner reguleringsrisikoen på apotekavansen.",
          "Du holder deg innenfor ett minutt.",
        ],
        felle: "Å gi daglig leder rett for å være hyggelig — «du har helt rett i at kostnadene er høye, og i tillegg …». Han hadde ikke rett i det som betyr mest, og en anbefaling som ikke sier det, endrer ingenting.",
      },
    ],
  },
  {
    id: "kostnadskutt-skadeforsikring",
    label: "Forsikringsselskapet som skal kutte 15 prosent",
    type: "Kostnadskutt",
    nivå: "Middels",
    firma: "Generisk",
    stil: "interviewer-led",
    minutter: 30,
    ch: [],
    blurb: "Kostnadsbasen brutt ned per funksjon. Trener skillet mellom kutt som fjerner arbeid og kutt som bare flytter det — og hva et kutt faktisk gir netto.",
    prompt: `<p>Klienten er <b>Varde Forsikring</b>, et norsk skadeforsikringsselskap med 1,1 millioner
      kunder og 5 800 millioner kroner i premieinntekt. Selskapet ble kjøpt opp av et nordisk finanskonsern
      i fjor.</p>
      <p>Den nye eieren har satt ett tall på bordet: <b>kostnadsandelen skal fra 20 til 17 prosent av
      premieinntekten innen 18 måneder</b> — 174 millioner kroner ut av en driftskostnadsbase på
      1 160 millioner. Ledelsen har allerede levert sitt forslag: kutt 60 årsverk i skadeoppgjøret.</p>
      <p><b>Er det forslaget en besparelse, og hvor bør de 174 millionene egentlig hentes?</b></p>`,
    bakgrunn: `<p>Casen er konstruert, men mekanikken er ekte. Et skadeforsikringsselskap måles på
      <i>combined ratio</i> = erstatningsandel + kostnadsandel. Varde ligger på 78 + 20 = 98, altså
      tjener de 2 øre per premiekrone på selve forsikringen. Det er en helt vanlig norsk posisjon, og det
      forklarer hvorfor eieren går rett på kostnadsandelen: tre prosentpoeng der dobler resultatet.</p>
      <p>Kostnadskutt-casen er god trening fordi den ser triviell ut — «finn 15 prosent» — og fordi den
      vanligste feilen ikke er regnefeil, men kategorifeil. Halvparten av en forsikringsbedrifts
      driftskostnad er <b>kapasitet satt til å møte et arbeidsvolum</b>: skader som meldes, kunder som
      ringer. Fjerner du kapasiteten uten å fjerne arbeidet, kjøper du arbeidet tilbake til høyere pris.
      Det er nøyaktig det regnetrinnet i denne casen viser.</p>`,
    trinn: [
      {
        art: "oppklaring",
        sek: 90,
        kort: "Spørsmål",
        tittel: "Hva vil du vite før du begynner?",
        sp: `<p>Du har hørt oppdraget. <b>Hvilke spørsmål stiller du før du strukturerer?</b>
          To til fire er nok — og si hvorfor du spør.</p>`,
        fasit: `<p>I en kostnadscase er de gode avklaringene de som avgjør <i>hvilken type kutt</i> som teller.
          Et spørsmål som ikke endrer det, er bortkastet tid.</p>
          <ul>
            <li><b>Er kravet en varig årlig kostnad, eller holder det å treffe tallet ett år?</b> Dette er det
              viktigste spørsmålet i hele casen. Et engangskutt kan tas med ansettelsesstopp og utsatte
              prosjekter. Et varig kutt må fjerne arbeid.</li>
            <li><b>Gjelder kravet driftskostnadene alene, eller teller erstatningskostnadene med?</b>
              Erstatningene er 4 524 millioner. Ett prosentpoeng der er 45 millioner — mer enn noe
              bemanningskutt kan gi. Er de innenfor scope, ligger halve svaret et helt annet sted.</li>
            <li><b>Skal telleren ned eller nevneren opp?</b> Kostnadsandelen er en brøk. 17 prosent av en
              voksende premieinntekt er en helt annen oppgave enn 17 prosent av dagens.</li>
            <li><b>Hvilke bindinger finnes?</b> Oppsigelsestid, tariffavtaler, IT-kontrakter med restløpetid,
              agentavtaler. De avgjør hva som i det hele tatt er mulig innen 18 måneder.</li>
          </ul>
          <p><b>Sterkt mot middels:</b> et middels svar spør om tallene — «hvordan fordeler kostnadene seg?».
          Det får du uansett i neste trinn. Et sterkt svar spør om <i>rammene rundt tallet</i>: varighet,
          scope og nevner. De tre svarene bestemmer hvilke kutt som i det hele tatt kan telles.</p>`,
        krav: [
          "Du spør om kuttet skal være varig eller bare treffe ett år. Uten det svaret vet du ikke hva som teller.",
          "Du avklarer om erstatningskostnadene er innenfor oppdraget — de er fire ganger større enn driftskostnadene.",
          "Du ser at kostnadsandelen er en brøk, og spør hva som skjer med nevneren.",
          "Du sier hvorfor du spør, slik at intervjueren ser at svaret endrer strukturen din.",
        ],
        felle: "Å be om kostnadstabellen med en gang. Den kommer uansett, og spørsmålet forteller intervjueren at du vil lete i tallene i stedet for å tenke på hva slags kutt oppdraget faktisk krever.",
      },
      {
        art: "struktur",
        sek: 150,
        kort: "Struktur",
        tittel: "Strukturer kostnadsbasen",
        sp: `<p>Bryt ned de 1 160 millionene slik at du etterpå kan si <b>hvilke kutt som er varige</b>.
          Skriv nedbrytningen slik du ville tegnet den, og avslutt med hypotesen din.</p>`,
        fasit: `<p>En kostnadsstruktur som bare lister funksjoner, er en innholdsfortegnelse. Den som teller,
          krysser <b>to akser</b>: hvor pengene ligger, og <i>hva kostnaden følger</i>.</p>
          <div class="formula">
            <div class="eq">Driftskostnad = Arbeidsvolum × Kostnad per enhet arbeid + Salgsdrevne kostnader + Fast struktur</div>
            <div class="where">Arbeidsvolum = antall skader og antall henvendelser. Salgsdrevne = provisjon som
              følger premien. Fast struktur = ledd og systemer som finnes uansett volum.</div>
          </div>
          <p>Den andre aksen er det som gjør strukturen brukbar, fordi den gir <b>tre helt ulike kuttyper</b>:</p>
          <ul>
            <li><b>Strukturelt kutt — fjerner arbeidet.</b> Færre henvendelser fordi årsaken til dem er borte,
              færre systemer, færre ledd. Varig, og treffer kostnaden per definisjon.</li>
            <li><b>Produktivitetskutt — samme arbeid, færre timer per enhet.</b> Automatisering, standardisering.
              Varig hvis mekanismen er reell, men må kunne pekes på konkret.</li>
            <li><b>Kapasitetskutt — samme arbeid, færre hender.</b> Kommer tilbake som overtid, innleie, kø og
              kvalitetstap. Ser ut som en besparelse i budsjettet og er det ikke i regnskapet.</li>
          </ul>
          <p>Legg til et <b>gjennomførbarhetslag</b> til slutt: tid til effekt, engangskostnad før varig gevinst,
          og hvem som rammes. Uten det er en kostnadsplan bare aritmetikk.</p>
          <p><b>Hypotesen:</b> ledelsens forslag er av tredje type. Skadeoppgjøret er dimensjonert mot et
          arbeidsvolum som ikke endrer seg av at 60 mennesker slutter — så jeg vil først teste om kuttet
          i det hele tatt er en besparelse, og deretter lete etter de varige kronene i fast struktur.</p>
          <p><b>Sterkt mot middels:</b> et middels svar deler i «faste og variable kostnader» og stopper der.
          Et sterkt svar sier hva kostnaden <i>følger</i> — skader, henvendelser, solgt premie eller ingenting —
          fordi det er den inndelingen som avgjør om et kutt holder.</p>`,
        krav: [
          "Du krysser funksjon med kostnadsdriver, ikke bare fast mot variabel.",
          "Du navngir de tre kuttypene: fjerne arbeid, gjøre arbeidet billigere, fjerne hender.",
          "Du har et gjennomførbarhetslag med tid til effekt og engangskostnad.",
          "Du avslutter med en hypotese om ledelsens forslag, ikke bare en oversikt.",
          "Grenene overlapper ikke og dekker til sammen hele basen på 1 160 millioner.",
        ],
        felle: "Å behandle lønn som en fast kostnad. Lønn er fast i et kvartal og variabel over atten måneder gjennom naturlig avgang — og det er nettopp forskjellen mellom en sluttpakke og et kutt som ikke koster noe.",
      },
      {
        art: "exhibit",
        sek: 120,
        kort: "Figur",
        tittel: "Kostnadsbasen per funksjon",
        sp: `<p>Intervjueren gir deg kostnadsbasen brutt ned per funksjon.
          <b>Hva ser du, og hva betyr det for hvor pengene kan hentes?</b></p>`,
        figur: `<table class="data">
            <tr><th>Funksjon</th><th class="n">Kostnad (mill. kr)</th><th class="n">Årsverk</th><th>Hva kostnaden følger</th></tr>
            <tr><td>Skadeoppgjør</td><td class="n">330</td><td class="n">300</td><td>Antall skader (240 000 i året)</td></tr>
            <tr><td>Kundesenter og salg</td><td class="n">250</td><td class="n">230</td><td>Antall henvendelser</td></tr>
            <tr><td>IT og systemdrift</td><td class="n">240</td><td class="n">85</td><td>Antall systemer og lisenser</td></tr>
            <tr><td>Distribusjon og provisjon</td><td class="n">160</td><td class="n">15</td><td>Solgt premievolum</td></tr>
            <tr><td>Aktuar, produkt og pris</td><td class="n">80</td><td class="n">55</td><td>Fast struktur</td></tr>
            <tr><td>Konsernstab og ledelse</td><td class="n">100</td><td class="n">75</td><td>Fast struktur</td></tr>
            <tr><td><b>Sum driftskostnader</b></td><td class="n"><b>1 160</b></td><td class="n"><b>760</b></td><td><b>20 % av premien</b></td></tr>
          </table>
          <p class="tiny">Premieinntekt 5 800 mill. kr. Erstatningskostnader 4 524 mill. kr (78 %).
          Combined ratio 98. Kravet fra eier: 174 mill. kr, altså 15 % av basen.</p>`,
        fasit: `<p>Si overskriften først, ikke rad for rad:</p>
          <p><i>«Halvparten av basen — 580 av 1 160 — er kapasitet satt til å møte et arbeidsvolum. Der kan
          jeg ikke kutte uten å endre volumet. De varige kronene må ligge i de andre 580.»</i></p>
          <p>Deretter to nivå-2-innsikter som ikke står i tabellen, men som følger av å dele to kolonner
          på hverandre:</p>
          <ul>
            <li><b>Kostnad per årsverk avslører hva posten egentlig er.</b> Skadeoppgjør 330/300 = 1,1 millioner
              per årsverk — det er lønn. IT 240/85 = 2,8 millioner og distribusjon 160/15 = 10,7 millioner —
              det er <i>ikke</i> lønn. Det er lisenser, konsulenter og provisjon. Å telle hoder i IT er å lete
              på feil sted.</li>
            <li><b>Distribusjonens 160 millioner er den farligste posten i tabellen.</b> Den følger solgt
              premie. Kutter du der, faller premieinntekten — og siden kostnadsandelen er en brøk, kan tallet
              eieren måler deg på bli verre av at nevneren krymper.</li>
          </ul>
          <p>Hvor de strukturelle kronene faktisk ligger: IT (systemer, ikke folk — selskapet har arvet tre
          kjernesystemer gjennom oppkjøp), konsernstab (ledd, ikke kapasitet), og i å <b>fjerne årsaken</b> til
          henvendelser og skadebehandling i de to store kapasitetspostene.</p>
          <p><b>Sterkt mot middels:</b> et middels svar rangerer postene etter størrelse og peker på den
          største. Et sterkt svar deler kostnad på årsverk, ser at tre av seks poster ikke er lønnskostnader
          i det hele tatt, og sier hvilken post som er farlig å røre.</p>`,
        krav: [
          "Du sier konklusjonen først, ikke en opplesning av tabellen.",
          "Du grupperer de seks postene i kapasitet, salgsdrevet og fast struktur før du peker.",
          "Du regner kostnad per årsverk og ser at IT og distribusjon ikke er lønnskostnader.",
          "Du peker ut distribusjonen som farlig å kutte, og begrunner det med at kostnadsandelen er en brøk.",
        ],
        felle: "Å gå rett på den største posten fordi den er størst. Skadeoppgjøret er 330 millioner nettopp fordi det gjør 240 000 skader i året — størrelsen er et mål på arbeidsmengde, ikke på sløsing.",
      },
      {
        art: "regne",
        sek: 120,
        kort: "Regning",
        tittel: "Hva gir ledelsens kutt netto?",
        sp: `<p>Ledelsens forslag er å kutte <b>60 av 300 årsverk i skadeoppgjøret</b>. Intervjueren gir deg
          det du trenger:</p>
          <ul>
            <li>Lønnskostnad per årsverk i skadeoppgjør: <b>900 000 kroner</b></li>
            <li>Skadeoppgjøret behandler <b>240 000 skader</b> i året, og kapasiteten er i dag akkurat
              <b>800 skader per årsverk</b></li>
            <li>Av skadene som ikke lenger får plass, kan <b>18 000</b> flyttes til selvbetjent skademelding.
              Resten må kjøpes som overtid og innleide takstmenn til <b>1 500 kroner per skade</b></li>
            <li>En skade behandlet av innleide uten kundehistorikk utbetaler i snitt <b>900 kroner mer</b>
              enn en skade behandlet internt</li>
          </ul>
          <p><b>Hva blir den varige årlige nettoeffekten av kuttet, i millioner kroner?</b></p>
          <p class="tiny">Si framgangsmåten høyt før du regner. Svar med fortegn — tallet kan være negativt.</p>`,
        svar: -18,
        enhet: "millioner kroner",
        toleranse: 0.02,
        fasit: `<p>Regn kapasiteten før du regner kronene. Det er den rekkefølgen som gjør svaret riktig.</p>
          <div class="formula">
            <div class="eq">Brutto lønnsbesparelse: 60 × 900 000 = 54,0 mill.</div>
            <div class="eq">Kapasitet etter kuttet: (300 − 60) × 800 = 192 000 skader</div>
            <div class="eq">Arbeidsvolum: 240 000 skader → kapasitetsgap 48 000</div>
            <div class="eq">Til selvbetjening 18 000 → 30 000 skader må kjøpes</div>
            <div class="eq">Overtid og innleie: 30 000 × 1 500 = 45,0 mill.</div>
            <div class="eq">Merutbetaling: 30 000 × 900 = 27,0 mill.</div>
            <div class="eq">Netto: 54,0 − 45,0 − 27,0 = <b>−18,0 millioner</b></div>
          </div>
          <p><b>Poenget er ikke tallet, men hva det avslører.</b> Kuttet sparer ikke 54 millioner. Det koster
          18. Sammenlign enhetskostnadene og se hvorfor: internt koster én skade 900 000 / 800 =
          <b>1 125 kroner</b>. Kjøpt utenfra koster den 1 500 + 900 = <b>2 400 kroner</b> — mer enn dobbelt.
          Så snart kapasiteten faller under arbeidsvolumet, kjøper selskapet tilbake nøyaktig det arbeidet
          det nettopp sa opp, til dobbel pris. Det er ikke et kutt. Det er en byttehandel til dårlig kurs.</p>
          <p>To ting til, som begge trekker i samme retning:</p>
          <ul>
            <li><b>Sluttpakker kommer i tillegg.</b> 60 × 250 000 = 15 millioner det første året. Regnestykket
              er altså verre enn −18 før det i det hele tatt blir bedre.</li>
            <li><b>Den eneste ekte kronen i forslaget krever ingen oppsigelser.</b> De 18 000 skadene som
              flyttes til selvbetjening, frigjør 18 000 / 800 = 22,5 årsverk, verdt 20,3 millioner. Den
              gevinsten er tilgjengelig <i>uten</i> kuttet — fordi den fjerner arbeid, ikke hender.</li>
          </ul>
          <p><b>Sterkt mot middels:</b> et middels svar regner 60 × 900 000 = 54 millioner og stopper. Det er
          tallet ledelsen allerede har. Et sterkt svar regner kapasiteten mot etterspørselen først, trekker fra
          det som kommer tilbake, og sier setningen som avgjør casen: <i>et kutt som senker kapasiteten under
          arbeidsvolumet, er ikke en besparelse.</i></p>`,
        krav: [
          "Du regner kapasiteten før kronene: 240 årsverk ganger 800 skader er første linje, ikke siste.",
          "Du trekker fra det som kommer tilbake som innleie, overtid og høyere utbetalinger.",
          "Du oppgir fortegn og enhet — minus 18 millioner kroner, ikke bare 18.",
          "Du sammenligner enhetskostnaden internt mot kjøpt: 1 125 mot 2 400 kroner per skade.",
          "Du sier hva tallet betyr for anbefalingen, ikke bare hva det er.",
        ],
        felle: "Å stoppe ved bruttotallet: «60 årsverk à 900 000 er 54 millioner». Det er svaret ledelsen allerede har levert, og det er nettopp derfor de trenger deg.",
      },
      {
        art: "ide",
        sek: 150,
        kort: "Idéer",
        tittel: "Hvor kommer de 174 millionene fra?",
        sp: `<p>Kravet står fast. <b>List tiltak som faktisk kan gi varige kutt</b> — men si først hvordan du
          deler dem opp.</p>
          <p class="tiny">Én per linje. Få dem ut først, prioriter til slutt.</p>`,
        liste: [
          "Fjerne årsaken til henvendelsene: de fem vanligste grunnene folk ringer om, løst i selvbetjening",
          "Automatisk oppgjør for småskader under en beløpsgrense, uten manuell behandling",
          "Konsolidere de tre kjernesystemene selskapet har arvet gjennom oppkjøp, og avvikle to av dem",
          "Reforhandle IT-lisenser og bytte innleide konsulenter mot færre, faste utviklere",
          "Ta ut ett ledelsesledd og samle stab — HR, økonomi, juridisk — i én enhet for hele konsernet",
          "Digital skademelding med bilde og automatisk taksering på de enkleste bilskadene",
          "Rydde i produktporteføljen: færre varianter gir færre unntak, færre spørsmål og færre systemregler",
          "Flytte enkel skadebehandling til et felles nordisk oppgjørssenter i konsernet",
          "Endre provisjonsmodellen fra volum til lønnsomhet, slik at distribusjonen betaler for seg selv",
          "Kjøpe verksted- og reparasjonstjenester på færre og større avtaler — det treffer erstatningssiden",
          "Bruke naturlig avgang framfor oppsigelse: 760 årsverk gir plasser hvert år uten sluttpakker",
          "Bedre risikoseleksjon og prisdifferensiering, som senker erstatningsandelen i stedet for kostnadsandelen",
          "Outsource utskrift, post og arkiv — små poster, men fullt ut strukturelle",
        ],
        fasit: `<p>Si oppdelingen før du lister. Den som virker her, er den samme som i strukturen:
          <b>fjern arbeidet · gjør arbeidet billigere per enhet · fjern struktur som ikke gjør arbeid.</b></p>
          <p>Avslutt med å tallfeste, ikke bare å prioritere. En kostnadsplan uten tall er en ønskeliste:</p>
          <ul>
            <li><b>Kundesenter:</b> fjern årsaken til henvendelsene og flytt resten til selvbetjening →
              <b>55 av 250</b> (22 %), effekt innen 18 måneder.</li>
            <li><b>IT:</b> konsolider tre kjernesystemer til ett og avvikle to → <b>60 av 240</b> (25 %), men
              krever investering først og treffer først i år to.</li>
            <li><b>Skadeoppgjør:</b> automatisk oppgjør for småskader og digital skademelding → <b>30 av 330</b>
              (9 %). Merk at dette fjerner arbeid, ikke hender — derfor holder det.</li>
            <li><b>Konsernstab:</b> ett ledd ut, samlede stabsfunksjoner → <b>25 av 100</b> (25 %).</li>
          </ul>
          <p>Sum: <b>170 millioner av 174</b>. Si det høyt. Du kommer ikke helt fram, og de siste fire må
          enten hentes i provisjonsmodellen eller diskuteres med eieren. Å påstå at du treffer tallet på
          kronen er mindre troverdig enn å si nøyaktig hvor du stopper.</p>
          <p><b>Sterkt mot middels:</b> et middels svar lister tiltak. Et sterkt svar setter et beløp og en
          tidshorisont på hvert av de fire største, summerer, og innrømmer gapet.</p>`,
        krav: [
          "Du sier oppdelingen din før du lister, og gruppene er casens egne.",
          "Minst halvparten av idéene fjerner arbeid i stedet for å fjerne hender.",
          "Du setter beløp og tidshorisont på de største tiltakene og summerer dem.",
          "Du sier hvor mye du ikke får til, i stedet for å tvinge summen til å treffe 174.",
          "Du nevner at IT-konsolidering koster penger før den sparer penger.",
        ],
        felle: "Å foreslå kutt i distribusjonsprovisjonen fordi den er stor og har få årsverk. De 160 millionene følger salget. Kutter du der, faller premieinntekten — og kostnadsandelen, som er en brøk, kan bli verre av at nevneren krymper.",
      },
      {
        art: "syntese",
        sek: 90,
        kort: "Anbefaling",
        tittel: "Anbefalingen",
        sp: `<p>Konserndirektøren fra den nye eieren har <b>ett minutt</b> før neste møte. Gi anbefalingen din.</p>
          <p class="tiny">Skriv den slik du ville sagt den — ikke som notater.</p>`,
        fasit: `<p>Svaret først, så tallene, så risiko og neste steg.</p>
          <blockquote><p><b>«Ikke gjennomfør bemanningskuttet i skadeoppgjøret. Det sparer ikke 54 millioner —
          det koster 18. De 174 millionene finnes, men de ligger i systemer og ledd, ikke i hender.»</b></p>
          <p>Tre grunner. For det første er skadeoppgjøret dimensjonert mot 240 000 skader i året. Kutter dere
          60 årsverk, faller kapasiteten til 192 000, og de 30 000 skadene som ikke kan flyttes til
          selvbetjening, må kjøpes til 2 400 kroner stykket mot 1 125 internt. For det andre er halve
          kostnadsbasen — 580 av 1 160 millioner — av samme type: kapasitet mot et arbeidsvolum. For det
          tredje er de tre postene som ikke er det, IT på 240 millioner med bare 85 årsverk, konsernstab på
          100, og et kundesenter der halvparten av henvendelsene skyldes noe dere selv kan fjerne.</p>
          <p>Konkret: konsolider de tre kjernesystemene og avvikl to, ta ut ett ledelsesledd og samle staben,
          og fjern årsaken til de vanligste henvendelsene. Det gir 170 av 174 millioner. De siste fire vil
          jeg ta i provisjonsmodellen, ikke i volumet — for kutter dere salget, krymper nevneren og
          kostnadsandelen blir verre.</p>
          <p>Risikoen er tid og rekkefølge: systemkonsolideringen koster penger i år én og sparer først i år
          to, så dere trenger en bro. Neste steg jeg ville tatt, er å telle henvendelsene i kundesenteret
          etter årsak i fire uker. Det avgjør om de 55 millionene der er reelle — og det er den eneste av de
          fire postene jeg ennå ikke har hardt tallgrunnlag for.»</p></blockquote>
          <p><b>Sterkt mot middels:</b> et middels svar sier «kutt heller i IT og stab». Et sterkt svar sier
          <i>hvorfor de postene er annerledes</i> — de er struktur, ikke kapasitet — og legger til rekkefølgen,
          broen og det ene tallet som fortsatt mangler.</p>`,
        krav: [
          "Første setning avviser forslaget og gir tallet: kuttet koster 18 millioner, det sparer dem ikke.",
          "Du bruker casens egne tall, ikke generelle utsagn om kostnadsprogrammer.",
          "Du sier hvor de 174 millionene skal komme fra, med beløp per post.",
          "Du nevner risikoen i rekkefølgen — systemkuttet koster før det sparer.",
          "Du holder deg innenfor ett minutt og avslutter med ett konkret neste steg.",
        ],
        felle: "Å love hele beløpet fordi eieren ba om det. En plan som summerer til nøyaktig 174 uten at postene tåler etterprøving, faller sammen i første styremøte — og da er det du som satte tallet.",
      },
    ],
  },
  {
    id: "hurtigmat-kanalmetning",
    label: "Hurtigmatkjeden som åpner seg til ro",
    type: "Vekst",
    nivå: "Intro",
    firma: "Generisk",
    stil: "candidate-led",
    minutter: 30,
    ch: [],
    blurb: "Kjeden har åpnet 30 nye utsalg. Besøkene har knapt rørt seg. Trener samme-butikk-analyse, kannibalisering mellom egne enheter, og forskjellen på brutto og netto vekst.",
    prompt: `<p>Klienten er <b>Svingen Hurtigmat</b>, en gatekjøkkenkjede med 114 utsalg i Norge.
      Kjeden eies av et nordisk oppkjøpsfond som kjøpte den for fire år siden med én uttalt plan:
      å vokse gjennom nyetableringer.</p>
      <p>Planen er fulgt. På tre år har kjeden åpnet <b>30 nye utsalg</b> — fra 84 til 114, altså
      36 prosent flere. <b>Kundebesøkene har i samme periode vokst fra 12,6 til 13,9 millioner,
      altså 10 prosent.</b> Driftsresultatet har falt fra 91 til 55 millioner kroner.</p>
      <p>Etableringssjefen har nå lagt fram en plan for 30 nye utsalg til.
      <b>Skal styret si ja?</b></p>`,
    bakgrunn: `<p>Casen er konstruert, men mekanismen er den vanligste feilen i kjededrift:
      selskapet forveksler <i>utsalgssteder</i> med <i>etterspørsel</i>. Et gatekjøkken selger ikke
      til Norge, det selger til et nedslagsfelt — noen kvartaler, et kjøpesenter, en bussholdeplass.
      Legger du et nytt utsalg inni et nedslagsfelt du allerede dekker, flytter du kunder mellom
      egne kasser i stedet for å hente nye.</p>
      <p>Det som gjør feilen seig, er at den er <b>usynlig i regnskapet til hvert enkelt
      utsalg</b>. Det nye utsalgets egne bøker viser omsetning og overskudd. Kundene det tok fra
      naboutsalget, dukker ikke opp noe sted som en kostnad. Etableringsavdelingen måles på antall
      åpninger og på det nye utsalgets eget resultat, og begge tallene ser fine ut helt til noen
      summerer kjeden.</p>
      <p>Verktøyet mot dette er dagligvarehandelens eget: <b>samme-butikk-vekst</b>. Del alltid
      veksten i to — det som kommer fra utsalg som fantes i fjor, og det som kommer fra nye. Og
      finn et område der du <i>ikke</i> åpnet noe, så du har en kontrollgruppe å måle markedet med.</p>`,
    trinn: [
      {
        art: "oppklaring",
        kort: "Avklaring",
        sek: 90,
        tittel: "Hva vil du vite før du begynner?",
        sp: `<p>Du har hørt prompten. Før du strukturerer: hvilke spørsmål stiller du?</p>`,
        fasit: `<p>Du har allerede fått den viktigste opplysningen gratis: kjeden vokser kraftig i
          antall utsalg og nesten ikke i kundebesøk. Bruk avklaringene på det som avgjør
          <i>hvorfor</i>.</p>
          <ul>
            <li><b>Hva skjer med markedet rundt oss?</b> Vokser hurtigmatmarkedet, står det stille,
              eller taper det til leveringsappene? Uten dette vet du ikke om et fall er selvpåført
              eller tidevann. Det aller beste spørsmålet er en variant: <b>finnes det områder der
              vi ikke har åpnet noe?</b> Da har du en kontrollgruppe.</li>
            <li><b>Hvor ligger de nye utsalgene i forhold til de gamle?</b> Nytt kjøpesenter i en
              by vi allerede dekker, eller et tettsted vi ikke var i? Det er hele casen.</li>
            <li><b>Har vi samme-butikk-tall?</b> Altså: hvordan går det med de 84 utsalgene som
              fantes i år 1, isolert fra de 30 nye?</li>
            <li><b>Hva er fondets mål og tidshorisont?</b> Et salg om to år belønner antall utsalg
              i prospektet. Da er ikke dette bare en analysefeil, det er et insentivproblem.</li>
          </ul>
          <p><b>Hva skiller dette fra et middels svar?</b> Et middels svar spør om kostnadene i de
          nye utsalgene, og det er et fornuftig spørsmål. <b>Et sterkt svar ber om en
          kontrollgruppe før det ber om noe annet</b> — fordi uten den kan man ikke skille
          markedets bevegelse fra kjedens egen.</p>`,
        krav: [
          "Du spør om markedet rundt, ikke bare om kjedens egne tall.",
          "Du ber eksplisitt om et område der kjeden ikke har åpnet noe — en kontrollgruppe.",
          "Du spør hvor de nye utsalgene ligger i forhold til de gamle.",
          "Du ber om samme-butikk-tall, altså de gamle utsalgene isolert.",
          "Du sier hva svaret ville endre i strukturen din.",
        ],
        felle: "Å spørre om kostnadene i de nye utsalgene først. Det er et regnskapsspørsmål, og det kommer senere. Problemet er foreløpig at 36 prosent flere utsalg bare ga 10 prosent flere besøk, og det er et etterspørselsspørsmål.",
      },
      {
        art: "struktur",
        kort: "Nedbrytning",
        sek: 150,
        tittel: "Strukturer problemet",
        sp: `<p>Bryt ned hvorfor 36 prosent flere utsalg bare ga 10 prosent flere kundebesøk.
          Skriv nedbrytningen slik du ville tegnet den på arket, og <b>avslutt med hypotesen
          din</b>.</p>`,
        fasit: `<p>Start i identiteten, ikke i et vekstrammeverk:</p>
          <div class="formula">
            <div class="eq">Kundebesøk = Antall utsalg × Besøk per utsalg</div>
            <div class="eq">Utsalg +36 %. Besøk +10 %. Altså har besøk per utsalg falt rundt 19 %.</div>
            <div class="where">Fordi 1,36 × 0,81 = 1,10. Å si dette høyt før du får ett eneste tall
              til, er det sterkeste enkelttrekket i casen.</div>
          </div>
          <p>Men den viktige delen kommer nå, og den er spesifikk for kjeder: <b>«besøk per
          utsalg» er et gjennomsnitt over to helt forskjellige populasjoner.</b> Del det i to:</p>
          <ul>
            <li><b>De 84 gamle utsalgene (samme butikk):</b> hva skjedde med dem? Faller de, har
              noen tatt kundene deres.</li>
            <li><b>De 30 nye:</b> hvor mye omsetter de? Nye utsalg er ofte mindre, så et lavere
              snitt kan være helt uskyldig — eller det motsatte.</li>
          </ul>
          <p>Faller de gamle, er det bare tre mulige tyver, og de må skilles:</p>
          <ul>
            <li><b>Markedet:</b> leveringsapper, dagligvare som tok over ferdigmaten, færre besøk
              per innbygger. Rammer alle, også der vi ikke åpnet.</li>
            <li><b>Konkurrentene:</b> en annen kjede åpnet i våre nedslagsfelt.</li>
            <li><b>Oss selv:</b> vi åpnet i våre egne nedslagsfelt. Kannibalisering.</li>
          </ul>
          <p><b>Hypotesen:</b> de nye utsalgene ligger for tett på de gamle, og mesteparten av
          besøkene deres er flyttet, ikke skapt. Jeg vil se besøk fordelt på område, med de gamle
          og de nye utsalgene i hver sin kolonne.</p>`,
        krav: [
          "Du skriver identiteten og regner 1,36 × 0,81 = 1,10 før du ber om mer data.",
          "Du deler besøk per utsalg i gamle og nye utsalg — det er selve grepet i en kjedecase.",
          "Du lister de tre mulige årsakene til at gamle utsalg faller, og de overlapper ikke.",
          "Du sier at markedet må måles et sted der kjeden ikke har åpnet.",
          "Du ber om en konkret tabell, ikke om mer informasjon generelt.",
        ],
        felle: "Å hente fram Ansoff eller et generisk vekstrammeverk med nye markeder, nye produkter og nye kanaler. Klienten vokser allerede i kanalen — problemet er at veksten er tom. Rammeverket svarer på et spørsmål ingen har stilt.",
      },
      {
        art: "exhibit",
        kort: "Samme butikk",
        sek: 120,
        tittel: "Besøkene fordelt på område",
        sp: `<p>Du får tabellen du ba om. Kundebesøk i tusen. <b>Hva ser du, og hva betyr
          det?</b></p>`,
        figur: `<table class="data">
            <tr><th>Område</th><th class="n">Utsalg år 1</th><th class="n">Nye</th><th class="n">Utsalg år 3</th><th class="n">Besøk år 1</th><th class="n">Besøk år 3, de gamle</th><th class="n">Besøk år 3, de nye</th><th class="n">Sum år 3</th></tr>
            <tr><td>Storbyene</td><td class="n">36</td><td class="n">18</td><td class="n">54</td><td class="n">5 400</td><td class="n">4 320</td><td class="n">1 440</td><td class="n">5 760</td></tr>
            <tr><td>Mellomstore byer</td><td class="n">30</td><td class="n">6</td><td class="n">36</td><td class="n">4 500</td><td class="n">4 320</td><td class="n">450</td><td class="n">4 770</td></tr>
            <tr><td>Nye tettsteder</td><td class="n">0</td><td class="n">6</td><td class="n">6</td><td class="n">0</td><td class="n">0</td><td class="n">660</td><td class="n">660</td></tr>
            <tr><td>Distriktet (ingen åpninger)</td><td class="n">18</td><td class="n">0</td><td class="n">18</td><td class="n">2 700</td><td class="n">2 700</td><td class="n">0</td><td class="n">2 700</td></tr>
            <tr><td><b>Sum</b></td><td class="n"><b>84</b></td><td class="n"><b>30</b></td><td class="n"><b>114</b></td><td class="n"><b>12 600</b></td><td class="n"><b>11 340</b></td><td class="n"><b>2 550</b></td><td class="n"><b>13 890</b></td></tr>
          </table>
          <p class="tiny">Kundebesøk i tusen. «De gamle» er de 84 utsalgene som fantes i år 1.</p>
          <table class="data">
            <tr><th>Økonomi</th><th class="n">Kroner</th></tr>
            <tr><td>Dekningsbidrag per kundebesøk</td><td class="n">60</td></tr>
            <tr><td>Faste kostnader, nytt utsalg per år</td><td class="n">3 600 000</td></tr>
            <tr><td>Faste kostnader, etablert utsalg per år</td><td class="n">7 200 000</td></tr>
          </table>`,
        fasit: `<p>Overskriften først, og den ligger i den nederste raden:</p>
          <p><i>«Distriktet, der dere ikke åpnet et eneste utsalg, er helt flatt — 2,7 millioner
          besøk begge år. Markedet er altså ikke problemet. Og likevel har de 84 gamle utsalgene
          mistet 1,26 millioner besøk. Det er dere selv som har tatt dem.»</i></p>
          <ul>
            <li><b>Kontrollgruppen er hele beviset.</b> Uten distriktsraden kunne fallet i storby
              like gjerne vært leveringsappene eller en konkurrent. Med den er tolkningen entydig.</li>
            <li><b>Fallet er nøyaktig der åpningene er.</b> Storbyene fikk 18 nye utsalg og mistet
              20 prosent av samme-butikk-besøkene (5 400 til 4 320). Mellomstore byer fikk 6 nye og
              mistet 4 prosent. Distriktet fikk null og mistet null. Sammenhengen er ikke til å
              ta feil av — jo flere åpninger, jo større fall.</li>
            <li><b>Én rad er ren vekst.</b> Nye tettsteder: seks utsalg, 660 000 besøk, ingenting
              tatt fra noen. Og de er større enn de andre nyåpningene — 110 000 besøk mot 80 000 i
              storby. Der kjeden ikke var fra før, er det fortsatt marked.</li>
            <li><b>De nye utsalgene er ikke dårlige.</b> Et nytt storbyutsalg gjør 80 000 besøk mot
              150 000 i et etablert. Det ser ut som et svakt utsalg. Det er ikke svakt — det er
              plassert oppå et utsalg kjeden allerede eide.</li>
          </ul>
          <p><b>Hva skiller dette fra et middels svar?</b> Et middels svar leser at besøk per
          utsalg har falt fra 150 000 til 122 000 og konkluderer med at de nye utsalgene er svake.
          Det er å lese gjennomsnittet. <b>Et sterkt svar bruker distriktsraden som kontrollgruppe,
          kobler fallet i de gamle utsalgene til antall åpninger i samme område, og sier ordet
          kannibalisering før intervjueren gjør det.</b></p>`,
        krav: [
          "Du finner kontrollgruppen selv og sier hva den beviser: markedet er flatt.",
          "Du kobler størrelsen på samme-butikk-fallet til antall åpninger per område.",
          "Du ser at raden med nye tettsteder er ren vekst, uten kannibalisering.",
          "Du sier at de nye utsalgene ikke er svake, men feilplassert.",
          "Du sier konklusjonen først, ikke en rad-for-rad-opplesning.",
        ],
        felle: "Å konkludere med at de nye utsalgene underpresterer fordi de gjør færre besøk enn de gamle. Et nytt utsalg skal gjøre færre besøk enn et innarbeidet. Spørsmålet er ikke hvor mange besøk det har, men hvor besøkene kom fra.",
      },
      {
        art: "regne",
        kort: "Nettobidrag",
        sek: 90,
        tittel: "Hva bidrar et nytt storbyutsalg med?",
        sp: `<p>Markedet er flatt — distriktet beviser det — så hele fallet i de gamle
          storbyutsalgene er kannibalisering fra kjedens egne nyåpninger.</p>
          <p><b>Hvor mye svekker et gjennomsnittlig av de 18 nye storbyutsalgene kjedens
          driftsresultat per år? Svar i millioner kroner.</b></p>
          <p class="tiny">Regn det på papir, og si framgangsmåten høyt før du sier tallet.</p>`,
        svar: 2.4,
        enhet: "millioner kroner per utsalg per år",
        toleranse: 0.02,
        fasit: `<p>Regn i besøk først, kroner etterpå:</p>
          <div class="formula">
            <div class="eq">Brutto per nytt storbyutsalg: 1 440 000 / 18 = 80 000 besøk</div>
            <div class="eq">Tatt fra de gamle: (5 400 000 − 4 320 000) / 18 = 60 000 besøk</div>
            <div class="eq">Netto for kjeden: 80 000 − 60 000 = 20 000 besøk</div>
            <div class="eq">Dekningsbidrag: 20 000 × 60 = 1 200 000 kroner</div>
            <div class="eq">Minus faste kostnader: 1 200 000 − 3 600 000 = <b>−2,4 millioner kroner</b></div>
            <div class="where">Tre av fire besøk i et nytt storbyutsalg er tatt fra et av kjedens
              egne utsalg. Kannibaliseringsgraden er 75 prosent.</div>
          </div>
          <p><b>Og her ligger poenget de fleste går glipp av.</b> Sett opp det samme regnestykket
          slik restaurantsjefen ser det, uten kannibaliseringsleddet:</p>
          <div class="formula">
            <div class="eq">80 000 × 60 = 4 800 000 − 3 600 000 = <b>+1,2 millioner kroner</b></div>
          </div>
          <p>Utsalgets egne bøker viser altså <b>pluss 1,2 millioner</b>, mens kjeden taper
          <b>2,4 millioner</b> på det samme utsalget. Forskjellen er nøyaktig 3,6 millioner —
          de 60 000 besøkene som ble flyttet fra naboen, ganget med 60 kroner. <b>Det er derfor
          ingen har stoppet dette:</b> hver eneste åpning har blitt godkjent på et regnestykke som
          var riktig for utsalget og feil for eieren.</p>
          <p>Gjør du det samme for de to andre områdene, får du hele bildet:</p>
          <ul>
            <li><b>Storbyene:</b> 75 prosent kannibalisering, −2,4 millioner per utsalg, 18 utsalg
              — til sammen −43,2 millioner.</li>
            <li><b>Mellomstore byer:</b> 40 prosent kannibalisering, −0,9 millioner per utsalg —
              til sammen −5,4 millioner. Bedre, men fortsatt tapsbringende.</li>
            <li><b>Nye tettsteder:</b> ingen kannibalisering, 110 000 besøk, <b>+3,0 millioner per
              utsalg</b> — til sammen +18,0 millioner.</li>
          </ul>
          <p>Summen er <b>−30,6 millioner</b>. Sammen med et hovedkontor som har vokst med
          5,4 millioner, forklarer det hele resultatfallet fra 91 til 55 millioner — 36 på
          kronen.
          <b>Ekspansjonen er ikke en del av problemet — den er hele problemet.</b></p>
          <p><b>Hva skiller dette fra et middels svar?</b> Et middels svar regner 80 000 × 60
          minus 3,6 millioner, får +1,2 millioner og sier at utsalget tjener penger. Regnestykket
          er riktig; grunnlaget er feil. <b>Et sterkt svar trekker fra det som ble tatt fra
          naboen, og sier deretter uoppfordret at de to regnestykkene spriker med 3,6 millioner —
          fordi det er den forskjellen som forklarer hvorfor selskapet har gjort dette 24 ganger.</b></p>`,
        krav: [
          "Du trekker kannibaliseringen fra bruttobesøkene før du regner kroner.",
          "Du regner mot antall nye utsalg i området, ikke mot hele kjeden.",
          "Du setter opp utsalgets eget regnestykke ved siden av kjedens, og ser at de spriker.",
          "Du forklarer spriket som insentivproblemet det er, ikke bare som en regnefeil.",
          "Du oppgir enhet — millioner kroner per utsalg per år.",
        ],
        felle: "Å regne kannibaliseringen mot hele kjeden i stedet for mot området. Storbyfallet på 1,08 millioner besøk skal fordeles på de 18 nye storbyutsalgene, ikke på alle 30. Feil nevner er den vanligste regnefeilen i denne casen.",
      },
      {
        art: "ide",
        kort: "Tiltak",
        sek: 120,
        tittel: "Hva kan klienten gjøre?",
        sp: `<p>Du vet nå at kanalen er mettet der kjeden allerede er. <b>List så mange tiltak du
          klarer på to minutter.</b> Én per linje. Si oppdelingen din først.</p>`,
        liste: [
          "Stanse etableringsplanen i storby og mellomstore byer der kjeden allerede dekker nedslagsfeltet",
          "Gjennomføre resten av åpningene bare i tettsteder der kjeden ikke er til stede fra før",
          "Innføre nedslagsfelt, ikke utsalg, som styringsenhet i etableringsbeslutningene",
          "Kreve et netto-estimat med kannibalisering i hver eneste etableringssak til styret",
          "Endre bonusen til etableringsavdelingen fra antall åpninger til netto besøksvekst i området",
          "Legge ned eller slå sammen utsalg der to av kjedens egne overlapper i samme nedslagsfelt",
          "Reforhandle husleien i overlappende utsalg, eller la kontraktene løpe ut uten fornyelse",
          "Differensiere de overlappende utsalgene på meny, så de slutter å slåss om samme kunde",
          "Spre åpningstidene mellom naboutsalg, så kjeden dekker flere timer i stedet for samme time",
          "Vokse på besøk per kunde i stedet for antall utsalg: frokostmeny, kaffeabonnement, catering",
          "Bygge egen leveringsapp med hjemkjøring, som henter etterspørsel utenfor nedslagsfeltene",
          "Kjøpe opp frittstående gatekjøkken i områder kjeden ikke dekker, i stedet for å bygge nytt ved siden av seg selv",
          "Etablere utsalg i tilknytning til bensinstasjoner og kollektivknutepunkt, der besøksstrømmen er ny og ikke delt",
          "Måle og rapportere samme-butikk-vekst hver måned, slik dagligvarekjedene gjør",
        ],
        fasit: `<p>Oppdelingen selger seg selv her, og du bør si den før du lister: <b>stopp det
          som ødelegger, fiks systemet som tillot det, og finn veksten et annet sted.</b></p>
          <ul>
            <li><b>Stopp:</b> ingen flere åpninger i mettede nedslagsfelt.</li>
            <li><b>Fiks systemet:</b> netto i stedet for brutto, både i beslutningsunderlaget og i
              bonusen. Uten dette gjentar feilen seg neste år med ny etableringssjef.</li>
            <li><b>Finn veksten:</b> hvite flekker på kartet, nye tilbud per kunde, og kanaler
              som ikke deler nedslagsfelt med utsalgene.</li>
          </ul>
          <p>Avslutt med å <b>prioritere</b>. Det ene tiltaket som er verdt mest, er det kjedeligste:
          å kreve et nettoestimat i hver etableringssak. Det koster ingenting og fjerner årsaken.</p>`,
        krav: [
          "Du sier oppdelingen din før du lister, ikke en usortert strøm.",
          "Minst ett tiltak angriper insentivet, ikke bare beslutningen som allerede er tatt.",
          "Du foreslår vekst utenfor kanalen, ikke bare at kjeden skal slutte å åpne.",
          "Du tar med muligheten for å legge ned eller slå sammen overlappende utsalg.",
          "Du prioriterer til slutt i stedet for å la listen ligge flat.",
        ],
        felle: "Å bare foreslå å stanse åpningene. Fondet kjøpte selskapet for å vokse, og en anbefaling som bare sier nei, svarer ikke på det. Analysen viste også hvor veksten faktisk finnes — de nye tettstedene ga 3 millioner per utsalg.",
      },
      {
        art: "syntese",
        kort: "Anbefaling",
        sek: 90,
        tittel: "Anbefalingen",
        sp: `<p>Fondets partner kommer inn i rommet og har <b>ett minutt</b>. Gi anbefalingen
          din.</p>
          <p class="tiny">Skriv den slik du ville sagt den — ikke som notater.</p>`,
        fasit: `<p>Topp-ned. Svaret først, så beviset, så hva som må skje.</p>
          <blockquote><p><b>«Nei til planen slik den ligger — men ja til seks av de tretti.
          Tre av fire kunder i et nytt storbyutsalg er tatt fra deres eget naboutsalg, og hver
          åpning der svekker resultatet med 2,4 millioner i året. Det er ekspansjonen som har
          spist resultatfallet fra 91 til 55 millioner.»</b></p>
          <p>Tre grunner. For det første er markedet uskyldig: i distriktet, der dere ikke åpnet
          noe, er besøkene helt flate. For det andre følger fallet åpningene område for område —
          storby fikk 18 nye utsalg og mistet 20 prosent samme-butikk, mellomstore byer fikk 6 og
          mistet 4, distriktet fikk null og mistet null. For det tredje er det ett sted dette
          fungerer: de seks utsalgene i tettsteder dere ikke var i fra før, tok ingenting fra
          noen og bidrar med 3 millioner hver.</p>
          <p>Konkret: stans storbyåpningene i planen, og flytt kapitalen til tettsteder og
          oppkjøp av frittstående gatekjøkken utenfor deres eksisterende nedslagsfelt. Og endre
          beslutningsunderlaget — hver etableringssak skal vise netto besøk etter kannibalisering,
          ikke brutto. I dag godkjennes åpninger på et regnestykke som viser pluss 1,2 millioner
          når sannheten er minus 2,4.</p>
          <p>Den store risikoen er at konkurrentene tar de gode tettstedene mens dere venter, så
          dette haster. Neste steg jeg ville tatt, er å kjøre de samme tallene på nedslagsfeltnivå
          for de fem største byene — det avgjør hvilke av de eksisterende utsalgene som bør slås
          sammen.»</p></blockquote>
          <p><b>Hva skiller dette fra et middels svar?</b> Et middels svar sier «nei, ikke åpne
          flere, dere kannibaliserer dere selv». Det er riktig diagnose og et ubrukelig råd, fordi
          eieren kjøpte selskapet for å vokse. <b>Et sterkt svar deler planen i to — nei til de
          mettede områdene, ja til de hvite flekkene — kvantifiserer begge deler, og fikser
          beslutningsregelen som slapp feilen gjennom 24 ganger.</b></p>`,
        krav: [
          "Svaret kommer i første setning, og det er delt — ikke et rent nei.",
          "Du bruker tall fra casen: 75 prosent, 2,4 millioner, 3 millioner.",
          "Du peker på kontrollgruppen som beviset for at markedet ikke er skyld i noe.",
          "Du fikser beslutningsregelen, ikke bare den enkelte beslutningen.",
          "Du nevner risiko og neste steg, og holder deg innenfor ett minutt.",
        ],
        felle: "Å anbefale full stopp i all ekspansjon. Tabellen viste at seks av åpningene var ren vekst. En anbefaling som ikke skiller mellom de mettede områdene og de tomme, kaster den ene delen av planen som faktisk virket.",
      },
    ],
  },
  {
    id: "lansering-frossenpizza",
    label: "Pizzaen som selger godt og tjener dårlig",
    type: "Ny lansering",
    nivå: "Middels",
    firma: "Generisk",
    stil: "interviewer-led",
    minutter: 35,
    ch: [],
    blurb: "Nyheten treffer 6 millioner pakninger første år og ser ut som en suksess. Trener kannibalisering: det relevante tallet er aldri nytt volum, men netto nytt dekningsbidrag.",
    prompt: `<p>Klienten er <b>Nordpizza</b>, Norges største produsent av frossenpizza. De selger
      36 millioner pakninger i året i norsk dagligvare, fordelt på tre varianter, og har vært
      merkevareleder i tretti år.</p>
      <p>De siste to årene har <b>kjedenes egne merker</b> vokst fra 5 til 9 millioner pakninger,
      og Nordpizza har mistet omtrent like mye. Markedsavdelingen vil svare med <b>Nordpizza
      Grill</b> — en rimeligere variant til 26 kroner ut av fabrikk, mot 32 for hovedproduktet.
      Testpanelet anslår 6 millioner pakninger første år.</p>
      <p><b>Bør Nordpizza lansere Grill?</b></p>`,
    bakgrunn: `<p>Casen er konstruert, men grepet er ekte og har et navn: et <i>fighter brand</i>
      — en billigere variant du lanserer for å stoppe en lavprisutfordrer uten å røre prisen på
      hovedproduktet. Det er en av de vanligste svarene på press fra kjedenes egne merker, og en
      av de vanligste måtene å ødelegge sin egen margin på.</p>
      <p>Mekanikken er verdt å ha i fingrene. En lansering i en eksisterende portefølje er aldri
      en vurdering av det nye produktet alene. Kunden som legger en Grill i kurven, la kanskje en
      Original der før — og da er ikke gevinsten dekningsbidraget på Grill, men <b>differansen</b>.
      Selger du en vare med 11 kroner i dekningsbidrag i stedet for en med 14, taper du tre kroner
      på hver enhet du «vinner».</p>
      <p>Samtidig er den motsatte feilen like vanlig: å avvise en lansering <i>bare</i> fordi den
      kannibaliserer. Hvis volumet forsvinner til konkurrenten uansett, er det bedre å kannibalisere
      seg selv enn å la noen andre gjøre det. Begge feilene skal du kunne unngå i denne casen.</p>`,
    trinn: [
      {
        art: "oppklaring",
        sek: 90,
        kort: "Avklar",
        tittel: "Hva vil du vite før du begynner?",
        sp: `<p>Du har hørt prompten. Hvilke spørsmål stiller du før du strukturerer?</p>`,
        fasit: `<p>I en lanseringscase er de tre avklaringene som betyr mest: <b>hva er målet</b>,
          <b>hva er beslutningskriteriet</b>, og <b>hva skjer hvis vi lar være</b>. Det siste er
          det som oftest glemmes, og det er det viktigste her.</p>
          <ul>
            <li><b>Hva er målet — volum, andel eller resultat?</b> Skal Grill forsvare hylleplass
              og markedsandel, eller skal den tjene penger? De to gir motsatt anbefaling, og
              markedsavdelingen og økonomisjefen mener sjelden det samme.</li>
            <li><b>Hva skjer med Original-volumet hvis vi ikke lanserer?</b> Faller det videre til
              kjedenes egne merker? Da er ikke alternativet «dagens situasjon», og hele
              kannibaliseringsregnestykket ser annerledes ut.</li>
            <li><b>Hvor mye av Grill-volumet er ventet å komme fra vår egen portefølje?</b> Uten
              den andelen kan lanseringen ikke vurderes i det hele tatt.</li>
            <li><b>Har vi kapasitet, eller må vi investere?</b> En ny linje er en fast kostnad som
              skal dekkes av <i>netto</i> bidrag, ikke av brutto salg.</li>
            <li><b>Hvilken horisont vurderer vi på?</b> År 1 alene straffer alle lanseringer, siden
              markedsføringen er størst da.</li>
          </ul>
          <p><b>Sterkt mot middels:</b> et middels svar spør om produktet — smak, emballasje,
          navn. Et sterkt svar spør om <i>beslutningen</i>: hva sammenlignes lanseringen mot, og
          hvem eier tallet som avgjør.</p>`,
        krav: [
          "Du spør hva som skjer hvis de lar være å lansere. Uten et nullalternativ finnes ingen målestokk.",
          "Du spør etter kannibaliseringsandelen tidlig — den er selve variabelen casen dreier om.",
          "Du spør om målet er volum eller resultat, og sier hvorfor det endrer svaret.",
          "Du spør om kapasitet og investering, ikke bare om salg.",
          "Du holder deg til fire–fem spørsmål og sier hva hvert av dem skal brukes til.",
        ],
        felle: "Å spørre om produktegenskaper — smak, størrelse, emballasje — i stedet for om beslutningen. Det er interessant for markedsavdelingen, men det flytter ikke go/no-go-svaret en millimeter.",
      },
      {
        art: "struktur",
        sek: 150,
        kort: "Struktur",
        tittel: "Strukturer beslutningen",
        sp: `<p>Bryt ned hva som må være sant for at Nordpizza bør lansere Grill. Skriv
          nedbrytningen slik du ville tegnet den på arket, og <b>avslutt med hva du vil sjekke
          først</b>.</p>`,
        fasit: `<p>En lanseringscase er en go/no-go, og strukturen bør speile det: fire ting må
          holde samtidig, og de kan sjekkes i rekkefølge.</p>
          <div class="formula">
            <div class="eq">Netto bidrag = Nytt volum × DB(ny) − Kannibalisert volum × DB(gammel) − Nye faste kostnader</div>
            <div class="where">DB = dekningsbidrag per enhet, altså pris minus variabel kostnad.
              Legg merke til at det er den <i>gamle</i> varens dekningsbidrag som står i
              midtleddet — det er der hele casen ligger.</div>
          </div>
          <ul>
            <li><b>Er det et marked?</b> Lavprissegmentet vokser — 5 til 9 millioner pakninger på
              to år. Behovet er dokumentert, og det er kjedenes egne merker som dekker det i dag.</li>
            <li><b>Holder økonomien?</b> Pris, variabel kostnad, volum, <i>kannibaliseringsgrad</i>,
              og de nye faste kostnadene. Dette er grenen som avgjør, og den er tallfestbar.</li>
            <li><b>Kan vi levere?</b> Kapasitet, ny linje, og hylleplass hos kjedene — som er en
              hardere beskrankning enn produksjonen. Får Grill hylleplass på bekostning av
              Original, er kannibaliseringen bygget inn i distribusjonen.</li>
            <li><b>Hva kan gå galt?</b> Kannibalisering høyere enn antatt, kjedene som presser
              prisen på Original ned mot Grill, og at merkevaren tar skade av å stå i
              lavprishyllen.</li>
          </ul>
          <p><b>Sterkt mot middels:</b> et middels svar setter opp fire like store bokser. Et
          sterkt svar sier hvilken boks som avgjør, og hvorfor: <i>«Markedet finnes åpenbart. Jeg
          vil bruke tiden på økonomien, og der er kannibaliseringsgraden den ene variabelen som
          kan snu svaret helt.»</i></p>`,
        krav: [
          "Du setter opp netto bidrag som en formel med et kannibaliseringsledd, ikke bare pris ganger volum.",
          "Du bruker den gamle varens dekningsbidrag i kannibaliseringsleddet, ikke den nyes.",
          "Du skiller nye faste kostnader fra de variable, siden bare de nye er relevante.",
          "Du peker på hvilken gren som avgjør, i stedet for å behandle alle fire likt.",
          "Du nevner hylleplass som en egen beskrankning, ikke bare produksjonskapasitet.",
        ],
        felle: "Å bygge et rent profitt-tre for Grill alene. Da får du et lønnsomt produkt og et feil svar, fordi treet ikke har noe sted å plassere volumet som forsvinner fra Original.",
      },
      {
        art: "exhibit",
        sek: 150,
        kort: "Tallene",
        tittel: "Porteføljen, nyheten og markedet",
        sp: `<p>Intervjueren legger fram tre ark: dagens portefølje, forutsetningene bak Grill, og
          utviklingen i markedet. <b>Hva ser du?</b></p>`,
        figur: `<p><b>Ark 1 · Dagens portefølje, siste år</b></p>
          <table class="data">
            <tr><th>Produkt</th><th class="n">Pris ut av fabrikk (kr)</th><th class="n">Variabel kostnad (kr)</th><th class="n">DB per pakning (kr)</th><th class="n">Volum (mill. stk)</th><th class="n">DB (mill. kr)</th></tr>
            <tr><td>Nordpizza Original</td><td class="n">32</td><td class="n">18</td><td class="n">14</td><td class="n">24,0</td><td class="n">336</td></tr>
            <tr><td>Nordpizza Fullkorn</td><td class="n">36</td><td class="n">21</td><td class="n">15</td><td class="n">4,0</td><td class="n">60</td></tr>
            <tr><td>Nordpizza Mini</td><td class="n">19</td><td class="n">12</td><td class="n">7</td><td class="n">8,0</td><td class="n">56</td></tr>
            <tr><td><b>Sum</b></td><td class="n">—</td><td class="n">—</td><td class="n">—</td><td class="n"><b>36,0</b></td><td class="n"><b>452</b></td></tr>
          </table>
          <p><b>Ark 2 · Nordpizza Grill, forutsetninger fra markedsavdelingen</b></p>
          <table class="data">
            <tr><th>Forutsetning</th><th class="n">Verdi</th></tr>
            <tr><td>Pris ut av fabrikk</td><td class="n">26 kr</td></tr>
            <tr><td>Variabel kostnad</td><td class="n">15 kr</td></tr>
            <tr><td>DB per pakning</td><td class="n">11 kr</td></tr>
            <tr><td>Forventet volum, år 1</td><td class="n">6,0 mill. stk</td></tr>
            <tr><td>Brutto DB, år 1</td><td class="n">66 mill. kr</td></tr>
            <tr><td>Andel av volumet som tas fra Original (testpanel)</td><td class="n">55 %</td></tr>
            <tr><td>Ny produksjonslinje, årlig avskrivning</td><td class="n">14 mill. kr</td></tr>
            <tr><td>Lansering og markedsføring, år 1</td><td class="n">10 mill. kr</td></tr>
            <tr><td><b>Sum nye faste kostnader, år 1</b></td><td class="n"><b>24 mill. kr</b></td></tr>
          </table>
          <p><b>Ark 3 · Frossenpizza i norsk dagligvare (mill. pakninger)</b></p>
          <table class="data">
            <tr><th>Millioner pakninger</th><th class="n">År −2</th><th class="n">År −1</th><th class="n">I år</th></tr>
            <tr><td>Nordpizza Original</td><td class="n">26,0</td><td class="n">25,0</td><td class="n">24,0</td></tr>
            <tr><td>Nordpizza Fullkorn</td><td class="n">3,0</td><td class="n">3,5</td><td class="n">4,0</td></tr>
            <tr><td>Nordpizza Mini</td><td class="n">9,0</td><td class="n">8,5</td><td class="n">8,0</td></tr>
            <tr><td><b>Sum Nordpizza</b></td><td class="n"><b>38,0</b></td><td class="n"><b>37,0</b></td><td class="n"><b>36,0</b></td></tr>
            <tr><td>Kjedenes egne merker</td><td class="n">5,0</td><td class="n">7,0</td><td class="n">9,0</td></tr>
            <tr><td>Andre merkevarer</td><td class="n">7,0</td><td class="n">7,0</td><td class="n">7,0</td></tr>
            <tr><td><b>Sum marked</b></td><td class="n"><b>50,0</b></td><td class="n"><b>51,0</b></td><td class="n"><b>52,0</b></td></tr>
          </table>`,
        fasit: `<p>Overskriften først, så beviset:</p>
          <p><i>«Markedet vokser med to millioner pakninger, men hele veksten og litt til går til
          kjedenes egne merker. Nordpizza taper to millioner pakninger på to år, og det er Original
          som blør. Grill er altså riktig diagnose — men den er priset slik at kuren kan bli dyrere
          enn sykdommen.»</i></p>
          <ul>
            <li><b>Markedsandelen faller fra 76 til 69 prosent</b> (38 av 50, mot 36 av 52), mens
              egne merker går fra 10 til 17 prosent. Det er ikke tilfeldig støy, det er en trend
              over to år i samme retning.</li>
            <li><b>Original er hele tapet.</b> 26 til 24 millioner. Fullkorn vokser litt, Mini
              faller litt — netto er de to omtrent uendret.</li>
            <li><b>Grill har lavere dekningsbidrag enn Original: 11 mot 14 kroner.</b> Det er det
              ene tallet som gjør denne casen vanskelig. Grill er ikke bare billigere, den er
              tynnere per enhet, og den skal ta 55 prosent av volumet sitt fra nettopp den varen
              som tjener mest.</li>
            <li><b>Mini er verdt et sideblikk:</b> 7 kroner i DB på 8 millioner pakninger. Nordpizza
              har allerede et lavprisprodukt i porteføljen. Hvorfor er ikke <i>det</i> svaret på
              egne merker?</li>
          </ul>
          <p><b>Sterkt mot middels:</b> et middels svar konstaterer at egne merker vokser og at
          lansering derfor er fornuftig. Et sterkt svar setter de to arkene mot hverandre med én
          gang: <i>«Vi bytter 14-kronersvolum mot 11-kronersvolum. Da er spørsmålet ikke om Grill
          selger, men hvor mye av den som er ekte nytt salg.»</i></p>`,
        krav: [
          "Du sier konklusjonen først i stedet for å lese tabellene rad for rad.",
          "Du regner markedsandeler, ikke bare volumendringer i pakninger.",
          "Du ser at Original alene står for hele Nordpizzas tap, og sier det.",
          "Du sammenligner dekningsbidraget på Grill med Original før du regner noe som helst.",
          "Du legger merke til at Mini allerede dekker lavprissegmentet.",
        ],
        felle: "Å se de 66 millionene i brutto dekningsbidrag på ark 2 og behandle dem som lanseringens gevinst. De 66 millionene er bruttotallet — og casen handler om alt som skal trekkes fra.",
      },
      {
        art: "regne",
        sek: 120,
        kort: "Regn",
        tittel: "Hva er lanseringen egentlig verdt?",
        sp: `<p>Grill selger 6,0 millioner pakninger i år 1, og 55 prosent av volumet tas fra
          Original.</p>
          <p><b>Hvor mye ekstra dekningsbidrag gir lanseringen i år 1, når kannibaliseringen er
          regnet inn? Svar i millioner kroner.</b></p>
          <p class="tiny">Ikke trekk fra de faste kostnadene ennå. Si framgangsmåten høyt før du
          sier tallet.</p>`,
        svar: 19.8,
        enhet: "millioner kroner",
        toleranse: 0.02,
        fasit: `<p>To ledd, ikke ett:</p>
          <div class="formula">
            <div class="eq">Brutto DB fra Grill: 6,0 × 11 = 66 mill. kr</div>
            <div class="eq">Kannibalisert volum: 0,55 × 6,0 = 3,3 mill. pakninger Original</div>
            <div class="eq">Tapt DB på Original: 3,3 × 14 = 46,2 mill. kr</div>
            <div class="eq">Netto nytt DB: 66 − 46,2 = <b>19,8 millioner kroner</b></div>
          </div>
          <p>Den andre veien til samme tall er mer opplysende, og den bør du si høyt:</p>
          <div class="formula">
            <div class="eq">Ekte nytt volum: 6,0 − 3,3 = 2,7 mill. × 11 kr = 29,7</div>
            <div class="eq">Kannibalisert volum: 3,3 mill. × (11 − 14) = −9,9</div>
            <div class="eq">Sum: 29,7 − 9,9 = <b>19,8</b></div>
            <div class="where">På de 3,3 millionene som bare bytter etikett, <i>taper</i> Nordpizza
              3 kroner per pakning. Det er ikke en mindre gevinst — det er et minustall.</div>
          </div>
          <p><b>Og her ligger poenget:</b> de nye faste kostnadene er 24 millioner. Netto bidrag er
          19,8. <b>Lanseringen går 4,2 millioner i minus i år 1</b> — samtidig som volumet i
          porteføljen vokser fra 36,0 til 38,7 millioner pakninger, altså 7,5 prosent. Nordpizza
          selger mer og tjener mindre. Det er hele casen i én setning.</p>
          <p>To tall til, som gjør deg presis i stedet for bare negativ:</p>
          <ul>
            <li><b>Netto DB per solgt Grill er 3,30 kroner</b>, ikke 11: 11 − 0,55 × 14 = 3,30.
              Det betyr at breakeven-volumet er 24 / 3,30 = <b>7,3 millioner pakninger</b> — 21
              prosent over anslaget.</li>
            <li><b>Lanseringen tåler maksimalt 50 prosent kannibalisering</b> ved 6 millioner
              pakninger: 66 − 24 = 42, og 42 / (6,0 × 14) = 50 %. Testpanelet sier 55. Beslutningen
              står og faller på fem prosentpoeng i et testpanel — det er en langt viktigere
              observasjon enn minustallet i seg selv.</li>
          </ul>
          <p><b>Sterkt mot middels:</b> et middels svar lander på 19,8 og sier «altså ulønnsomt».
          Et sterkt svar sier hvor følsomt svaret er, hvilken forutsetning som bærer det, og
          hvilket tall klienten må gå tilbake og etterprøve.</p>`,
        krav: [
          "Du bruker Originals dekningsbidrag på 14 kroner i kannibaliseringsleddet, ikke Grills 11.",
          "Du regner kannibalisert volum av Grills volum, ikke av Originals.",
          "Du sammenligner de 19,8 millionene med de 24 millionene i nye faste kostnader.",
          "Du ser at porteføljevolumet stiger mens resultatet faller, og sier det høyt.",
          "Du oppgir enhet, og sier framgangsmåten før tallet.",
        ],
        felle: "Å regne 55 prosent av 46,2 eller av Originals 24 millioner pakninger i stedet for av Grills 6,0. Kannibaliseringsandelen er alltid en andel av det nye produktets volum — den sier hvor kundene kom fra, ikke hvor mye av den gamle varen som forsvinner.",
      },
      {
        art: "ide",
        sek: 120,
        kort: "Idéer",
        tittel: "Hvordan kan lanseringen reddes?",
        sp: `<p>Slik den er satt opp, går Grill i minus. <b>List så mange grep du klarer på to
          minutter</b> som enten gjør lanseringen lønnsom eller erstatter den. Én per linje.</p>
          <p class="tiny">Tenk på pris, kanal, kapasitet — og på hva som ville fått deg til å
          droppe lanseringen helt.</p>`,
        liste: [
          "Prise Grill høyere, for eksempel 28 kroner: da gir lanseringen 7,8 millioner i pluss, hvis volumet holder",
          "Redusere kannibaliseringen ved å differensiere produktet tydelig: annen størrelse, annen fylling, annen anledning",
          "Legge Grill i en annen kanal enn Original: kiosk, bensin, storhusholdning eller kun lavpriskjedene",
          "Selge Grill som kjedenes eget merke i stedet for under Nordpizza-navnet, og slippe merkevareskaden",
          "Lansere regionalt i ett år først, måle faktisk kannibalisering, og skalere bare hvis den er under 50 prosent",
          "Bruke ledig kapasitet på eksisterende linje i stedet for å bygge ny, og fjerne 14 millioner i avskrivning",
          "Reforhandle hylleplass slik at Grill kommer i tillegg til Original, ikke i stedet for",
          "Kutte variabel kostnad på Grill: tynnere bunn, enklere topping, billigere emballasje",
          "Reposisjonere Mini som lavprissvaret i stedet, siden produktet og linjen allerede finnes",
          "Forsvare Original med kampanjer og volumrabatt i stedet for å lansere noe nytt",
          "Prise Original opp der merkevaren er sterkest, og finansiere lavprisforsvaret med det",
          "Fase markedsføringen over to år i stedet for å ta 10 millioner i år 1",
          "Droppe lanseringen hvis testpanelets 55 prosent ikke lar seg etterprøve i en ekte butikktest",
          "Droppe lanseringen hvis kjedene krever at Grill erstatter en Original-frontplass",
        ],
        fasit: `<p>Si oppdelingen før du lister. Her er en som virker: <b>grep som øker bidraget
          per enhet</b> (pris, kostnad), <b>grep som reduserer kannibaliseringen</b> (produkt,
          kanal, kunde), <b>grep som fjerner de faste kostnadene</b> (kapasitet, fasing), og
          <b>alternativer til å lansere i det hele tatt</b>.</p>
          <p>Legg merke til at de to første gruppene angriper hvert sitt ledd i regnestykket ditt.
          Det er det som gjør idémyldringen troverdig: den følger av analysen i stedet for å være
          en liste med gode råd.</p>
          <p><b>Sterkt mot middels:</b> et middels svar lister tiltak. Et sterkt svar tallfester
          minst ett av dem underveis — «28 kroner i stedet for 26 flytter lanseringen fra 4,2 i
          minus til 7,8 i pluss, forutsatt at volumet holder» — og sier eksplisitt hva som ville
          fått det til å stoppe lanseringen. Å kunne formulere sitt eget no-go-kriterium er
          sjeldnere enn det burde være.</p>`,
        krav: [
          "Du sier oppdelingen din før du begynner å liste.",
          "Idéene treffer minst tre av leddene: bidrag per enhet, kannibalisering, faste kostnader.",
          "Minst én idé handler om kanal eller kunde, ikke bare om pris og produkt.",
          "Du nevner minst ett forhold som ville fått deg til å ikke lansere.",
          "Du tallfester effekten av minst én idé i stedet for å la listen ligge flat.",
        ],
        felle: "Å bare foreslå å selge mer av Grill. Volum er problemet, ikke løsningen: hver ekstra pakning gir 3,30 kroner netto, ikke 11, og med 55 prosent kannibalisering skal det 7,3 millioner pakninger til før lanseringen er i null.",
      },
      {
        art: "syntese",
        sek: 90,
        kort: "Svar",
        tittel: "Anbefalingen",
        sp: `<p>Administrerende direktør stikker hodet inn og har <b>ett minutt</b>. Gi anbefalingen
          din.</p>
          <p class="tiny">Skriv den slik du ville sagt den — ikke som notater.</p>`,
        fasit: `<p>Svaret først, så de tre grunnene, så hva som må skje. Og i en lanseringscase:
          si tydelig hva som ville endret svaret.</p>
          <blockquote><p><b>«Ikke lanser Grill slik den er satt opp nå. Den gir 19,8 millioner i
          netto dekningsbidrag mot 24 millioner i nye faste kostnader — 4,2 millioner i minus i år
          1, samtidig som dere selger 7,5 prosent flere pakninger.»</b></p>
          <p>Tre grunner. For det første er Grill tynnere enn varen den erstatter: 11 kroner mot 14.
          Hver pakning som bare bytter etikett, koster dere tre kroner. For det andre bærer hele
          regnestykket på ett tall fra et testpanel — 55 prosent kannibalisering — og
          lanseringen tåler maksimalt 50. For det tredje har dere allerede et lavprisprodukt i
          Mini, uten ny linje og uten 24 millioner i nye faste kostnader.</p>
          <p>Konkret ville jeg gjort to ting. Kjør en ekte butikktest i én region i seks måneder
          og mål faktisk kannibalisering — ikke i panel, men i kassa. Og gjør om på oppsettet
          i mellomtiden: 28 kroner i stedet for 26 flytter lanseringen til 7,8 millioner i pluss,
          og produseres den på eksisterende linje, forsvinner 14 millioner av de faste kostnadene.</p>
          <p>Det som ville snudd anbefalingen min, er nullalternativet. Hvis Original taper to
          millioner pakninger til de egne merkene uansett — som er nøyaktig det som har skjedd de
          to siste årene — så er to tredeler av kannibaliseringen volum dere mister uansett, og da
          er lanseringen 23,8 millioner i pluss i stedet for 4,2 i minus. Det er tallet jeg ville
          brukt neste uke på: hvor mye av Original-volumet som forsvinner hvis dere ikke gjør
          noe.»</p></blockquote>
          <p><b>Sterkt mot middels:</b> et middels svar sier nei og begrunner det med tallet. Et
          sterkt svar sier nei <i>til dette oppsettet</i>, navngir forutsetningen som bærer
          konklusjonen, og viser at det finnes et realistisk tilfelle der svaret er ja. Det er
          forskjellen på en kandidat som har regnet og en som har tenkt.</p>`,
        krav: [
          "Svaret kommer i første setning, med tallet.",
          "Du bruker tall fra casen, ikke generelle utsagn om kannibalisering.",
          "Du sier hva klienten skal gjøre, ikke bare at lanseringen er ulønnsom.",
          "Du navngir forutsetningen konklusjonen hviler på, og hva som ville snudd den.",
          "Du holder deg innenfor et minutt.",
        ],
        felle: "Å avvise lanseringen fordi den kannibaliserer, punktum. Kannibalisering er ikke et argument i seg selv — hadde nettobidraget vært 40 millioner, ville svaret vært ja med nøyaktig samme kannibaliseringsgrad.",
      },
    ],
  },
  {
    id: "lonn-vaskeri-prisetterslep",
    label: "Marginen som allerede har rettet seg",
    type: "Lønnsomhet",
    nivå: "Intro",
    firma: "Generisk",
    stil: "interviewer-led",
    minutter: 25,
    ch: [],
    blurb: "Et kostnadssjokk og en prisøkning som kom seks måneder for sent. Trener den viktigste skillelinjen i lønnsomhetsanalyse: hva er varig, og hva er bare tidsforskyvning?",
    prompt: `<p>Klienten er <b>Fjordvask</b>, et industrivaskeri med fire anlegg i Midt-Norge.
      De vasker sengetøy, håndklær og arbeidstøy for hoteller, sykehus og sykehjem på
      løpende kontrakter. Selskapet er familieeid.</p>
      <p>Fra år 0 til år 1 falt driftsresultatet fra <b>30 til 22 millioner kroner</b>, og
      driftsmarginen fra <b>7,5 til 5,3 prosent</b>. Volumet — antall tonn tekstil vasket —
      var uendret.</p>
      <p>Banken har bedt om en plan, og styret vurderer å <b>legge ned ett av de fire
      anleggene</b>. Daglig leder har bedt dere se på tallene først.</p>
      <p><b>Er marginfallet varig? Og bør de kutte?</b></p>
      <p class="tiny">Dette er en interviewer-led case. Intervjueren stiller ett spørsmål av
      gangen og gir deg tall underveis. Svar på det som blir spurt om, og ikke mer.</p>`,
    bakgrunn: `<p>Casen er konstruert, men mekanismen er hverdagen i alle kontraktsbaserte
      tjenester: renhold, vaskeri, kantine, transport, bemanning. <b>Prisen mot kunden står
      i en kontrakt</b>, og kontrakten har som regel en varslingsfrist — tre, seks eller
      tolv måneder — før en prisendring kan tre i kraft.</p>
      <p>Konsekvensen er at et kostnadssjokk <i>alltid</i> gir et marginfall, og at
      <b>dybden på fallet bestemmes av varslingsfristen, ikke av hvor godt selskapet
      drives</b>. Et selskap med tolv måneders frist ser dobbelt så sykt ut som et med seks,
      selv om de har nøyaktig samme kostnader og samme kunder.</p>
      <p>Derfor er den viktigste analysen i en slik case ikke å finne kostnaden som steg.
      Det er å <b>skille den varige effekten fra tidsforskyvningen</b> — og det gjør du ved
      å regne på det siste halvårets nivå i stedet for på hele året. Konsulenter kaller det
      run-rate. Det er ikke et triks; det er den eneste måten å svare på om et selskap
      tjener penger <i>nå</i>, i motsetning til i gjennomsnitt over en periode der
      forutsetningene skiftet midtveis.</p>`,
    trinn: [
      {
        art: "oppklaring",
        sek: 90,
        tittel: "Intervjueren åpner",
        sp: `<p>Intervjueren sier: <i>«Før jeg gir deg noen tall — hvilke tre ting vil du vite
          først, og hvorfor akkurat de tre?»</i></p>`,
        fasit: `<p>Rekkefølgen er svaret. To spørsmål må komme først fordi de avgjør om resten
          i det hele tatt er interessant:</p>
          <ul>
            <li><b>«Hvilken kostnad steg, og er økningen varig eller midlertidig?»</b> Et
              vaskeri har tre store poster: lønn, strøm og vaskemiddel. Strøm er den som
              beveger seg voldsomt fra år til år i Norge. Er dette et prissjokk som kan gå
              tilbake, eller et nytt nivå?</li>
            <li><b>«Har dere justert prisen mot kundene — og fra hvilken dato?»</b> Dette er
              spørsmålet hele casen henger på. Et kostnadssjokk som er priset inn, er ikke et
              lønnsomhetsproblem; det er en periode med dårlige tall på vei mot normalen.
              <i>Datoen betyr mer enn prosenten.</i></li>
            <li><b>«Er volum og kundemiks uendret, og mistet dere kunder etter
              prisøkningen?»</b> Prompten sier at volumet er flatt, så her bekrefter du bare
              — men frafall etter en prisjustering ville vært en helt annen historie.</li>
          </ul>
          <p>Og ett spørsmål til som er verdt å ha i lomma: <b>«Kan jeg få tallene fordelt på
          halvår i stedet for helår?»</b> Hvis prisen ble endret midt i året, er årstallet et
          gjennomsnitt av to forskjellige selskaper.</p>
          <p><b>Sterkt mot middels:</b> et middels svar spør «hva har skjedd med kostnadene?»
          og venter. Et sterkt svar spør etter <i>datoen</i> for prisjusteringen og etter
          halvårstall, fordi det allerede har en hypotese om at året inneholder to ulike
          regimer. Det er tre setninger som sparer ti minutter senere.</p>`,
        krav: [
          "Du spør om kostnadsøkningen er varig eller midlertidig, ikke bare hvor stor den er.",
          "Du spør om prisen er justert og fra hvilken dato — datoen, ikke bare prosenten.",
          "Du ber om tall fordelt på halvår, og sier hvorfor helårstallet kan være misvisende.",
          "Du sjekker at volum og kundemiks er uendret, slik at marginen er sammenlignbar.",
          "Du begrunner rekkefølgen på spørsmålene i stedet for å lese opp en liste.",
        ],
        felle: "Å begynne med markedet og konkurrentene. Volumet er flatt og kundene er på kontrakt — problemet er per definisjon internt i regnskapet, og en runde om konkurransebildet er tid du ikke får igjen.",
      },
      {
        art: "struktur",
        sek: 120,
        tittel: "Intervjueren ber om nedbrytningen",
        sp: `<p>Intervjueren sier: <i>«Godt. Tegn meg regnestykket du vil fylle ut — og si
          hvordan du vil dele opp året.»</i></p>`,
        fasit: `<p>To ting skal på arket, og den andre er den som skiller.</p>
          <p><b>Først identiteten</b>, med kostnadene delt i variable og faste, fordi volumet
          er flatt og det gjør skillet lettere å tolke:</p>
          <div class="formula">
            <div class="eq">Driftsresultat = Omsetning − Strøm − Andre variable kostnader − Lønn − Andre faste kostnader</div>
            <div class="where">Omsetning = Tonn tekstil × Pris per tonn. Volumet er oppgitt flatt, så all bevegelse i omsetningen er pris.</div>
          </div>
          <p><b>Så tidsaksen</b>, og si den høyt som en egen beslutning:</p>
          <div class="formula">
            <div class="eq">År 1 = Første halvår (gammel pris, ny kostnad) + Andre halvår (ny pris, ny kostnad)</div>
          </div>
          <p>Det er her casen løses. Hvis kostnaden steg ved årsskiftet og prisen først ble
          justert midt i året, inneholder år 1 <b>to selskaper i ett tall</b>: ett halvår der
          klienten bærer hele kostnadsøkningen alene, og ett halvår der kunden er med. Å legge
          dem sammen og kalle summen «marginen» er å beskrive en overgang som om den var en
          tilstand.</p>
          <p>Si også hva du skal ende med: <b>«Jeg vil bygge en bro fra 30 til 22 millioner
          med tre ledd — varig kostnadseffekt, varig priseffekt, og engangseffekten av at
          prisen kom sent. Og så vil jeg regne hva et helt år på dagens nivå gir.»</b></p>
          <p><b>Sterkt mot middels:</b> et middels svar tegner en riktig kostnadsnedbrytning
          og stopper. Et sterkt svar legger til tidsdimensjonen <i>uoppfordret</i>, og
          begrunner den: en margin er alltid målt over en periode, og hvis forutsetningene
          skiftet midt i perioden, er snittet et tall som ikke beskriver noe som helst
          tidspunkt.</p>`,
        krav: [
          "Du skiller variable fra faste kostnader og navngir vaskeriets egne poster.",
          "Du bruker at volumet er flatt til å si at all bevegelse i omsetningen er pris.",
          "Du deler året i to halvår og begrunner hvorfor helårssnittet ikke beskriver noen tilstand.",
          "Du sier på forhånd at du skal bygge en bro fra 30 til 22 og regne et helårsnivå.",
          "Du skiller varige effekter fra engangseffekter allerede i strukturen.",
        ],
        felle: "Å strukturere bare i kostnadskategorier. Uten tidsaksen ender du med å finne strømregningen — som er riktig og helt utilstrekkelig, fordi den ikke sier om problemet er over.",
      },
      {
        art: "exhibit",
        sek: 150,
        tittel: "Tallene, fordelt på halvår",
        kort: "Halvårene",
        sp: `<p>Intervjueren legger fram to ark: <i>«Her er resultatet, og her er det du spurte
          om. Hva ser du?»</i></p>`,
        figur: `<table class="data">
            <tr><th>Millioner kroner</th><th class="n">År 0</th><th class="n">År 1 · 1. halvår</th><th class="n">År 1 · 2. halvår</th><th class="n">År 1 totalt</th></tr>
            <tr><td>Omsetning</td><td class="n">400</td><td class="n">200</td><td class="n">216</td><td class="n">416</td></tr>
            <tr><td>Strøm</td><td class="n">40</td><td class="n">32</td><td class="n">32</td><td class="n">64</td></tr>
            <tr><td>Andre variable kostnader</td><td class="n">60</td><td class="n">30</td><td class="n">30</td><td class="n">60</td></tr>
            <tr><td>Lønn</td><td class="n">200</td><td class="n">100</td><td class="n">100</td><td class="n">200</td></tr>
            <tr><td>Andre faste kostnader</td><td class="n">70</td><td class="n">35</td><td class="n">35</td><td class="n">70</td></tr>
            <tr><td><b>Driftsresultat</b></td><td class="n"><b>30</b></td><td class="n"><b>3</b></td><td class="n"><b>19</b></td><td class="n"><b>22</b></td></tr>
            <tr><td>Driftsmargin</td><td class="n">7,5 %</td><td class="n">1,5 %</td><td class="n">8,8 %</td><td class="n">5,3 %</td></tr>
          </table>
          <table class="data">
            <tr><th>Det intervjueren legger til</th><th class="n">Verdi</th></tr>
            <tr><td>Vasket volum per halvår, tonn tekstil — likt i alle periodene</td><td class="n">10 000</td></tr>
            <tr><td>Strømpris i år 1 mot år 0</td><td class="n">+60 %</td></tr>
            <tr><td>Strømforbruk i kilowattimer</td><td class="n">uendret</td></tr>
            <tr><td>Prisjustering mot kunde, iverksatt 1. juli i år 1</td><td class="n">+8 %</td></tr>
            <tr><td>Varslingsfrist for prisendring i kundekontraktene</td><td class="n">6 måneder</td></tr>
            <tr><td>Kunder mistet etter prisjusteringen</td><td class="n">ingen</td></tr>
          </table>`,
        fasit: `<p>Det står én ting i denne tabellen som gjør resten av casen enkel, og den
          står nederst til høyre i den fjerde kolonnen. Si den først:</p>
          <p><i>«Marginen i andre halvår er 8,8 prosent. Det er høyere enn de 7,5 prosentene
          i år 0. Problemet dere ber meg løse, har allerede løst seg — det ligger i første
          halvår, og første halvår kommer ikke tilbake.»</i></p>
          <p>Les så mekanikken, som henger sammen rad for rad:</p>
          <ul>
            <li><b>Strømmen:</b> 40 → 64 millioner, altså 60 prosent opp, akkurat som
              prisen. Forbruket er uendret. Dette er rent en prisøkning på en innsatsfaktor,
              ikke sløsing.</li>
            <li><b>Omsetningen:</b> 200 i første halvår, 216 i andre. De 16 millionene er
              8 prosent av 200 — hele forskjellen er prisjusteringen 1. juli. Volumet er likt.</li>
            <li><b>Alt annet står stille:</b> lønn 100 og 100, faste 35 og 35, andre variable
              30 og 30. Det er ingen driftsforverring her å finne.</li>
          </ul>
          <p>Og legg merke til hvorfor prisen kom 1. juli og ikke 1. januar: <b>kontraktene
          har seks måneders varslingsfrist</b>. Strømsjokket kom ved årsskiftet, varselet gikk
          ut umiddelbart, og prisen kunne først tre i kraft et halvår senere. Fallet er altså
          ikke et symptom på at selskapet drives dårlig. Det er en mekanisk konsekvens av en
          kontraktsklausul.</p>
          <p><b>Sterkt mot middels:</b> et middels svar peker på strømregningen og sier
          «kostnadene steg 24 millioner». Det er riktig og det er halve bildet. Et sterkt svar
          går til andre halvår først, ser at marginen der er <i>bedre enn før sjokket</i>, og
          formulerer spørsmålet om: ikke «hvorfor falt marginen», men <b>«hvor mye av fallet
          er tidsforskyvning, og hva tjener vi nå?»</b></p>`,
        krav: [
          "Du går til andre halvår først, ikke til årskolonnen.",
          "Du ser at marginen i andre halvår er høyere enn i år 0, og sier det høyt.",
          "Du kobler de 16 millionene i omsetningsvekst til de 8 prosentene fra 1. juli.",
          "Du sjekker at lønn, faste og andre variable står stille, slik at ingen annen forklaring gjenstår.",
          "Du forklarer datoen 1. juli med varslingsfristen på seks måneder.",
        ],
        felle: "Å lese årskolonnen og konkludere at marginen falt 2,2 prosentpoeng. Årskolonnen er et gjennomsnitt av to halvår med helt ulike forutsetninger, og den beskriver ingen tilstand selskapet noensinne har vært i.",
      },
      {
        art: "regne",
        sek: 120,
        tittel: "Hva tjener de på dagens nivå?",
        kort: "Helårsnivå",
        sp: `<p>Intervjueren spør: <i>«Anta at pris- og kostnadsnivået fra andre halvår holder
          seg gjennom et helt år, med samme volum. Hva blir driftsresultatet, i millioner
          kroner?»</i></p>
          <p class="tiny">Og etterpå: si hvor mye av fallet fra 30 til 22 som er
          tidsforskyvning.</p>`,
        svar: 38,
        enhet: "millioner kroner",
        toleranse: 0.02,
        fasit: `<p>To veier, og begge tar under tjue sekunder:</p>
          <div class="formula">
            <div class="eq">Kort vei: 2 × 19 = <b>38 millioner</b></div>
            <div class="eq">Lang vei: Omsetning 2 × 216 = 432, minus 64 strøm, 60 andre variable, 200 lønn og 70 faste</div>
            <div class="eq">432 − 394 = <b>38 millioner</b>, altså en margin på 8,8 %</div>
          </div>
          <p><b>Bygg så broen fra 30 til 22.</b> Det er den som gjør tallet til en innsikt:</p>
          <div class="formula">
            <div class="eq">Utgangspunkt, år 0: <b>30</b></div>
            <div class="eq">Varig kostnadseffekt: 60 % × 40 = <b>−24</b> (strøm på helårsbasis)</div>
            <div class="eq">Varig priseffekt: 8 % × 400 = <b>+32</b> (prisjustering på helårsbasis)</div>
            <div class="eq">Engangseffekt: prisøkningen manglet i første halvår, 8 % × 200 = <b>−16</b></div>
            <div class="eq">30 − 24 + 32 − 16 = <b>22 millioner</b> ✓</div>
          </div>
          <p><b>Og der ligger poenget.</b> Den varige effekten av hele historien er
          −24 + 32 = <b>+8 millioner</b>. Prisøkningen på 8 prosent er større enn den trengte
          å være: for å dekke 24 millioner i økt strømkostnad holdt det med 6 prosent.
          Klienten har altså <i>overkompensert</i>, og tjener nå 8 millioner mer i året enn
          før sjokket, på nøyaktig samme volum.</p>
          <p>Hele resultatfallet på 8 millioner er med andre ord en <b>engangseffekt på 16
          millioner</b> minus en <b>varig forbedring på 8</b>. Fallet er ikke bare
          forbigående — det dekker over at selskapet er blitt mer lønnsomt.</p>
          <p><b>Sterkt mot middels:</b> et middels svar leverer 38 og sier «det ordner seg».
          Et sterkt svar leverer 38 og stiller straks de to spørsmålene som kan velte
          konklusjonen. <b>Er halvårene sammenlignbare?</b> Et vaskeri for hotell har normalt
          langt mer å gjøre om sommeren — her er volumet oppgitt likt per halvår, og det er
          nettopp derfor annualiseringen er lov. <b>Blir strømprisen liggende?</b> Faller den
          tilbake mens prisen mot kunde står, vokser de 8 millionene. Har kontraktene en
          energiindeks, faller prisen tilbake sammen med strømmen, og da er 38 en topp og ikke
          et nivå. Det er den forskjellen som avgjør om tallet kan brukes til noe.</p>`,
        krav: [
          "Du regner helårsnivået på andre halvårs tall, ikke på årsgjennomsnittet.",
          "Du bygger broen fra 30 til 22 med varig kostnadseffekt, varig priseffekt og engangseffekt.",
          "Du ser at den varige nettoeffekten er positiv, ikke negativ, og sier hvor mye.",
          "Du sjekker at halvårene er sammenlignbare før du ganger med to.",
          "Du oppgir enhet og sier framgangsmåten før tallet.",
        ],
        felle: "Å regne engangseffekten som 8 prosent av hele årsomsetningen på 416 og få 33 millioner. Tidsforskyvningen gjelder bare det halvåret prisen manglet, og grunnlaget er derfor første halvårs omsetning på 200 — ikke året.",
      },
      {
        art: "ide",
        sek: 120,
        tittel: "Hva bør klienten gjøre?",
        sp: `<p>Intervjueren sier: <i>«Styret sitter og venter på en handlingsplan. List det du
          ville satt på den.»</i> <b>Én per linje, to minutter.</b></p>`,
        liste: [
          "Legge inn energiindeks i kundekontraktene, så strømendringer slår gjennom automatisk uten varslingsfrist",
          "Forhandle ned varslingsfristen fra seks til tre måneder ved neste fornyelse",
          "Prissikre deler av strømforbruket med fastprisavtale eller kraftsikring",
          "Investere i varmegjenvinning fra avløpsvann og tørketromler",
          "Senke vasketemperatur og optimalisere programvalg der tekstilkravet tillater det",
          "Øke fyllingsgraden per vask, som er den billigste energibesparelsen som finnes",
          "Flytte energitunge kjøringer til timer med lav spotpris der driften tillater det",
          "Vurdere egen solproduksjon eller varmepumpe på anleggstakene",
          "Gå gjennom kundeporteføljen og prise opp kontrakter som ligger under snittmarginen",
          "Selge merverdi i stedet for pris: sporing av tekstiler, leiepool, automatisk etterfylling",
          "Utnytte ledig kapasitet på anleggene før man vurderer å legge ned noe",
          "Bygge en enkel run-rate-rapportering til styret, slik at neste sjokk ikke leses som en trend",
          "Kartlegge hvilke kontrakter som forfaller når, så prisjusteringer kan planlegges før neste sjokk",
        ],
        fasit: `<p>Del listen i tre før du begynner, og si delingen høyt:
          <b>kontraktene</b>, <b>energien</b> og <b>driften</b>.</p>
          <p>Og prioriter tydelig til slutt, for analysen peker på ett tiltak framfor alle
          andre: <b>energiindeks i kontraktene</b>. Det er det eneste tiltaket som fjerner
          selve mekanismen som skapte problemet. Alt annet gjør neste sjokk mindre; en
          indeksklausul gjør at neste sjokk ikke rammer resultatet i det hele tatt.</p>
          <p>Merk også hva som <b>ikke</b> hører hjemme på listen: nedleggelse av et anlegg.
          Analysen viste at driften er sunn og at kapasiteten er lønnsom. Å foreslå kutt her
          er å behandle et tidsforskyvningsproblem med et strukturtiltak.</p>`,
        krav: [
          "Du sier oppdelingen din før du lister.",
          "Minst ett tiltak angriper selve mekanismen — varslingsfristen eller indeksklausulen.",
          "Listen dekker både kontraktssiden og den fysiske energibruken.",
          "Du prioriterer til slutt og sier hvilket tiltak som er viktigst, og hvorfor.",
          "Du sier eksplisitt at nedleggelse ikke hører hjemme på listen, og begrunner det.",
        ],
        felle: "Å levere en generisk kostnadskuttliste. Klienten har ikke et kostnadsproblem — de har et gjennomslagsproblem, og de har allerede løst det. Tiltakene skal handle om hvor raskt prisen følger kostnaden neste gang.",
      },
      {
        art: "syntese",
        sek: 90,
        tittel: "Anbefalingen",
        sp: `<p>Intervjueren sier: <i>«Daglig leder og bankforbindelsen sitter i møterommet.
          Du har ett minutt.»</i></p>`,
        fasit: `<p>Svaret først, og det er et nei til det styret allerede hadde bestemt seg for.
          Si det rett ut.</p>
          <blockquote><p><b>«Ikke legg ned anlegget. Marginfallet var tidsforskyvning, ikke
          drift — og på dagens nivå tjener dere 38 millioner i året, mer enn de 30 dere tjente
          før strømprisen steg.»</b></p>
          <p>Tre grunner. For det første steg strømmen 60 prosent ved årsskiftet, men
          kontraktene har seks måneders varslingsfrist, så prisjusteringen kunne først tre i
          kraft 1. juli. Det halvåret uten dekning kostet 16 millioner, én gang. For det andre
          er de 8 prosentene dere tok, større enn de 6 prosentene som trengtes for å dekke
          kostnaden — den varige effekten er pluss 8 millioner i året, ikke minus. For det
          tredje: driftsmarginen i andre halvår er 8,8 prosent mot 7,5 før sjokket, med
          uendret volum og uten at dere mistet en eneste kunde.</p>
          <p>Konkret anbefaler jeg to ting. Få en energiindeks inn i kundekontraktene, så
          neste kostnadssjokk slår gjennom med én gang i stedet for om et halvår. Og
          rapporter til styret og banken på siste halvårs nivå, ikke på året — det var
          årstallet som fikk dere til å vurdere å legge ned et sunt anlegg.</p>
          <p>Den store risikoen er strømprisen selv. Faller den tilbake, øker gevinsten
          deres, men da vil kundene be om å få prisøkningen reversert, og da er 38 en topp og
          ikke et nivå. Neste steg jeg ville tatt, er å gå gjennom kontraktsporteføljen og se
          hvilke som forfaller når — det avgjør hvor raskt en indeksklausul kan innføres.»</p></blockquote>`,
        krav: [
          "Første setning er en beslutning: ikke legg ned anlegget.",
          "Du bruker casens tall: 38 mot 30, 16 millioner engang, 8,8 mot 7,5 prosent.",
          "Du forklarer hvorfor prisen kom 1. juli, altså varslingsfristen.",
          "Du nevner risikoen for at strømprisen faller tilbake og at prisøkningen da kan reverseres.",
          "Du holder deg innenfor ett minutt.",
        ],
        felle: "Å presentere funnet som «det går bedre enn dere tror» uten å si hva de skal gjøre. Klienten hadde en plan om å kutte; en anbefaling som bare beroliger, etterlater den planen i live.",
      },
    ],
  },
  {
    id: "konkurrent-treningssenter",
    label: "Konkurrenten som kuttet prisen med en tredel",
    type: "Konkurrentrespons",
    nivå: "Intro",
    firma: "Generisk",
    stil: "candidate-led",
    minutter: 30,
    ch: [],
    blurb: "Konkurrenten kutter prisen fra 450 til 300 kroner, og daglig leder vil matche i morgen. Trener det viktigste grepet i en konkurrentcase: å finne ut hvorfor de gjorde det, før du svarer.",
    prompt: `<p>Klienten er <b>Puls Trening</b>, en norsk treningssenterkjede med 62 sentre og
      150 000 medlemmer. Medlemsprisen er 450 kroner i måneden, og sentrene er fullservice: bemannet
      resepsjon, gruppetimer, personlig trening.</p>
      <p>Forrige uke kuttet konkurrenten <b>Tempo</b> medlemsprisen sin <b>fra 450 til 300 kroner</b>
      — en tredel — og annonserte det med helsides annonser. Tempo har 41 sentre, hvorav 22 ligger
      innenfor gangavstand fra et Puls-senter.</p>
      <p>Daglig leder i Puls vil matche prisen fra mandag. <b>Hva bør Puls gjøre?</b></p>`,
    bakgrunn: `<p>Casen er konstruert, men situasjonen er en av de vanligste i næringslivet, og en
      av dem der magefølelsen er mest pålitelig feil. Den instinktive responsen på et priskutt er å
      matche. Det er nesten alltid det dyreste svaret som finnes, av en enkel grunn: <b>du kutter
      prisen på alle kundene dine for å beholde de få som faktisk vurderte å gå.</b></p>
      <p>Treningssenterøkonomi gjør regnestykket ekstra brutalt. Kostnadsbasen er nesten helt fast —
      husleie, instruktører, utstyr — mens den variable kostnaden per medlem er liten. Et priskutt
      går derfor rett på bunnlinjen krone for krone, uten noe sted å hente det inn.</p>
      <p>Det som skiller en god konkurrentcase fra en dårlig, er rekkefølgen. Spørsmålet er ikke
      «hva gjør vi» først, men <b>«hvorfor gjorde de det»</b>. Et priskutt kan være et angrep på
      deg, et forsøk på å fylle ledig kapasitet, en ny eiers krav om volum, eller et signal om at
      konkurrenten er i trøbbel. De fire krever helt forskjellige svar — og du kan ikke velge svar
      før du har stilt spørsmålet.</p>`,
    trinn: [
      {
        art: "oppklaring",
        sek: 90,
        kort: "Avklar",
        tittel: "Hva vil du vite før du begynner?",
        sp: `<p>Du har hørt prompten. Hvilke spørsmål stiller du før du strukturerer?</p>`,
        fasit: `<p>I en konkurrentcase er det ett spørsmål som er viktigere enn alle andre, og det
          bør være det første du stiller: <b>hvorfor gjorde de det?</b> Alt annet følger av svaret.</p>
          <ul>
            <li><b>Hva vet vi om hvorfor Tempo kuttet?</b> Har de fått ny eier? Har de bygget ut og
              står med tomme sentre? Taper de medlemmer? Er kuttet permanent eller en kampanje med
              utløpsdato? Et kutt for å fylle egen ledig kapasitet er ikke et angrep på Puls, og
              skal ikke besvares som ett.</li>
            <li><b>Har Puls allerede mistet medlemmer?</b> Det er en uke siden. Hvis avgangen ikke
              har begynt, er det ingen hast — og hastverk er den dyreste rådgiveren i denne
              situasjonen.</li>
            <li><b>Hva er Tempos kostnadsbase per medlem?</b> Hvis de driver ubemannet og uten
              gruppetimer, kan 300 kroner være lønnsomt for dem og tapsbringende for Puls. Da er
              matching ikke bare dyrt, det er umulig.</li>
            <li><b>Hva er målet vårt — medlemstall, omsetning eller resultat?</b> Å forsvare
              markedsandel og å forsvare bunnlinjen er to forskjellige oppdrag.</li>
            <li><b>Hvor overlappende er kundegruppene?</b> Er det de samme menneskene som velger
              mellom de to kjedene, eller er dette to segmenter som bare deler nabolag?</li>
          </ul>
          <p><b>Sterkt mot middels:</b> et middels svar spør hvor mange medlemmer Puls kan tape. Et
          sterkt svar starter med motivet: <i>«Før jeg vurderer hva vi skal gjøre, vil jeg vite hva
          de prøver å oppnå — for hvis dette handler om deres egen ledige kapasitet, er det ikke
          engang rettet mot oss.»</i></p>`,
        krav: [
          "Ditt første spørsmål handler om hvorfor konkurrenten kuttet, ikke om hva dere skal gjøre.",
          "Du spør om kuttet er permanent eller en tidsavgrenset kampanje.",
          "Du spør om konkurrentens kostnadsbase, ikke bare om prisen deres.",
          "Du spør om Puls faktisk har mistet medlemmer ennå, altså om det haster.",
          "Du spør etter målet: medlemstall, omsetning eller resultat.",
        ],
        felle: "Å gå rett på responsalternativene fordi daglig leder har hastverk. Hastverket er en del av problemet: et priskutt virker akutt, men det tar måneder før medlemmer faktisk bytter, og du har tid til å finne ut hva som skjer.",
      },
      {
        art: "struktur",
        sek: 150,
        kort: "Struktur",
        tittel: "Strukturer responsen",
        sp: `<p>Bryt ned hvordan du vil komme fram til et svar. Skriv nedbrytningen slik du ville
          tegnet den, og <b>si hvilken rekkefølge du vil ta grenene i</b>.</p>`,
        fasit: `<p>En konkurrentcase har en naturlig rekkefølge, og rekkefølgen <i>er</i> strukturen.
          Fire trinn:</p>
          <ul>
            <li><b>1 · Hvorfor gjorde de det?</b> Fyller de ledig kapasitet? Har de en ny eier som
              vil ha volum? Har de en lavere kostnadsbase og tar ut en varig fordel? Er de i
              trøbbel og kjøper likviditet? Hver forklaring peker mot sitt eget svar.</li>
            <li><b>2 · Hva er eksponeringen vår?</b> Hvor mange av våre medlemmer kan faktisk bytte
              — altså bor eller jobber nær et Tempo-senter — og hvor lett er det å bytte? Alle
              150 000 er ikke i spill.</li>
            <li><b>3 · Hva koster hvert svar?</b> Matche, ignorere, eller svare på en annen akse.
              Alle tre har en pris, også det å gjøre ingenting, og de skal settes opp mot
              hverandre i kroner.</li>
            <li><b>4 · Hva gjør de så?</b> Et priskutt som besvares med et priskutt, blir besvart
              med et nytt priskutt. Vurder trekket ditt to trekk fram, ikke ett.</li>
          </ul>
          <div class="formula">
            <div class="eq">Kostnad ved å matche = Eksponerte medlemmer × Priskutt × 12</div>
            <div class="eq">Kostnad ved å ikke matche = Tapte medlemmer × DB per medlem per år</div>
            <div class="where">Legg merke til asymmetrien: den første regnes på <i>alle</i> som får
              lavere pris, den andre bare på dem som faktisk går. Det er derfor matching nesten
              alltid taper.</div>
          </div>
          <p><b>Sterkt mot middels:</b> et middels svar lister tre handlingsalternativer med fordeler
          og ulemper. Et sterkt svar sier at valget ikke kan tas før motivet er forstått, og setter
          opp de to kostnadene som skal sammenlignes før det ser et eneste tall.</p>`,
        krav: [
          "Motivet til konkurrenten står som første gren, ikke som en fotnote.",
          "Du skiller eksponerte medlemmer fra hele medlemsmassen.",
          "Du setter opp kostnaden ved å matche og kostnaden ved å la være som to sammenlignbare størrelser.",
          "Du har med at det å gjøre ingenting også har en pris.",
          "Du tenker minst ett trekk videre: hva konkurrenten gjør etter vårt svar.",
        ],
        felle: "Å bygge en prisingsstruktur — elastisitet, betalingsvilje, prispunkter. Dette er ikke en prisingscase. Prisen er allerede satt av noen andre, og spørsmålet er hvordan man svarer på et trekk, ikke hva den optimale prisen er i et vakuum.",
      },
      {
        art: "exhibit",
        sek: 150,
        kort: "Tallene",
        tittel: "Puls, Tempo og alternativene",
        sp: `<p>Du får tre ark: Puls sitt eget regnskap, utviklingen hos Tempo, og en grov
          kostnadsberegning av fire alternativer. <b>Hva ser du?</b></p>`,
        figur: `<p><b>Ark 1 · Puls Trening, siste år (mill. kr)</b></p>
          <table class="data">
            <tr><th>Millioner kroner</th><th class="n">Beløp</th></tr>
            <tr><td>Medlemsinntekt (150 000 medlemmer × 450 kr × 12)</td><td class="n">810</td></tr>
            <tr><td>Personlig trening og varesalg</td><td class="n">90</td></tr>
            <tr><td><b>Sum inntekter</b></td><td class="n"><b>900</b></td></tr>
            <tr><td>Variabel kostnad per medlem (150 000 × 50 kr × 12)</td><td class="n">90</td></tr>
            <tr><td>Lønn og instruktører</td><td class="n">320</td></tr>
            <tr><td>Husleie</td><td class="n">250</td></tr>
            <tr><td>Markedsføring</td><td class="n">60</td></tr>
            <tr><td>Andre faste kostnader</td><td class="n">80</td></tr>
            <tr><td><b>EBITDA</b></td><td class="n"><b>100</b></td></tr>
            <tr><td>Pulsmedlemmer i de 22 overlappsområdene</td><td class="n">60 000</td></tr>
          </table>
          <p><b>Ark 2 · Tempo, de to siste årene</b></p>
          <table class="data">
            <tr><th>Tempo</th><th class="n">I fjor</th><th class="n">I år</th></tr>
            <tr><td>Antall sentre</td><td class="n">32</td><td class="n">41</td></tr>
            <tr><td>Medlemmer</td><td class="n">71 000</td><td class="n">78 000</td></tr>
            <tr><td>Medlemmer per senter</td><td class="n">2 219</td><td class="n">1 902</td></tr>
            <tr><td>Medlemspris per måned</td><td class="n">450 kr</td><td class="n">300 kr</td></tr>
            <tr><td>Bemannet resepsjon</td><td class="n">Ja</td><td class="n">Nei</td></tr>
            <tr><td>Gruppetimer og personlig trening</td><td class="n">Ja</td><td class="n">Nei</td></tr>
          </table>
          <p><b>Ark 3 · Grov kostnad ved fire responser, per år</b></p>
          <table class="data">
            <tr><th>Alternativ</th><th class="n">EBITDA-effekt, mill. kr</th></tr>
            <tr><td>A · Matche 300 kr i de 22 overlappssentrene (60 000 medlemmer)</td><td class="n">−108,0</td></tr>
            <tr><td>B · Matche 300 kr i hele kjeden (150 000 medlemmer)</td><td class="n">−270,0</td></tr>
            <tr><td>C · Eget avstrippet lavprismerke i 8 sentre (12 000 medlemmer over på 300 kr)</td><td class="n">−21,6</td></tr>
            <tr><td>D · Gjøre ingenting og tape 15 % av de eksponerte medlemmene</td><td class="n">−43,2</td></tr>
          </table>`,
        fasit: `<p>Overskriften først, og den ligger på ark 2:</p>
          <p><i>«Tempo har bygget ni nye sentre på ett år — 28 prosent flere — men bare fått 10
          prosent flere medlemmer. Belegget per senter har falt fra 2 219 til 1 902. De sitter med
          rundt 13 000 tomme plasser. Dette priskuttet handler om deres egen ledige kapasitet, ikke
          om oss.»</i></p>
          <ul>
            <li><b>Tempo har også byttet forretningsmodell.</b> De har fjernet resepsjon,
              gruppetimer og personlig trening. Det er ikke en kampanje, det er en ny
              kostnadsbase — og en som gjør 300 kroner mulig for dem. Puls har 320 millioner i
              lønn og instruktører og kan ikke kopiere prisen uten å kopiere modellen.</li>
            <li><b>Puls har 100 millioner i EBITDA på 900 millioner i inntekt.</b> Marginen er 11
              prosent. Det er hele marginen som står på spill i alternativ A.</li>
            <li><b>Bare 60 000 av 150 000 medlemmer er i spill.</b> To tredeler av medlemsmassen bor
              ikke i nærheten av et Tempo-senter. Alternativ B kutter prisen for 90 000 mennesker
              som ikke har noe alternativ.</li>
            <li><b>Ark 3 er avslørende alene:</b> å matche i overlappsområdene koster mer enn å tape
              15 prosent av de eksponerte medlemmene — 108 mot 43,2. Og et eget lavprismerke koster
              en femtedel av det å matche.</li>
          </ul>
          <p><b>Sterkt mot middels:</b> et middels svar leser at Tempo er blitt billigere. Et sterkt
          svar leser at Tempo er blitt et <i>annet selskap</i> — ubemannet, uten tjenester, med
          tomme sentre å fylle — og trekker den slutningen som følger: dette er en
          segmenteringsbevegelse, ikke et priskrig-angrep, og skal besvares deretter.</p>`,
        krav: [
          "Du regner medlemmer per senter hos Tempo og ser at belegget har falt.",
          "Du kobler priskuttet til Tempos ledige kapasitet i stedet for til et angrep på Puls.",
          "Du legger merke til at Tempo har fjernet bemanning og tjenester, altså endret kostnadsbase.",
          "Du ser at bare 60 000 av 150 000 medlemmer er eksponert.",
          "Du sammenligner alternativene på ark 3 mot Puls sin EBITDA på 100 millioner.",
        ],
        felle: "Å lese Tempos 41 sentre og 78 000 medlemmer som vekst. Sentrene vokser 28 prosent og medlemmene 10 — det er ikke vekst, det er overkapasitet, og det er den enkeltopplysningen som forklarer hele priskuttet.",
      },
      {
        art: "regne",
        sek: 90,
        kort: "Regn",
        tittel: "Hva koster det å matche?",
        sp: `<p>Puls vurderer å matche Tempos pris på 300 kroner i de 22 overlappsområdene, der
          60 000 av medlemmene deres hører hjemme.</p>
          <p><b>Hva koster det Puls per år, i millioner kroner?</b></p>
          <p class="tiny">Si framgangsmåten høyt før du sier tallet.</p>`,
        svar: 108,
        enhet: "millioner kroner",
        toleranse: 0.02,
        fasit: `<p>Regnestykket er enkelt. Det er sammenligningen som er poenget.</p>
          <div class="formula">
            <div class="eq">Priskutt per medlem: 450 − 300 = 150 kr per måned</div>
            <div class="eq">60 000 × 150 × 12 = <b>108 millioner kroner per år</b></div>
            <div class="where">Og siden den variable kostnaden per medlem ikke endrer seg når prisen
              gjør det, går hele beløpet rett på EBITDA.</div>
          </div>
          <p><b>Sett det mot bunnlinjen:</b> Puls tjener 100 millioner. Å matche i bare en tredel av
          kjeden koster 108. <b>Matchingen spiser hele resultatet og litt til</b> — og alternativ B,
          å matche overalt, koster 270 millioner, altså nesten tre ganger hele EBITDA-en.</p>
          <p><b>Så snu regnestykket, for det er her innsikten ligger.</b> Hvor mange medlemmer må
          Puls tape før det å <i>ikke</i> matche blir like dyrt?</p>
          <div class="formula">
            <div class="eq">DB per medlem per år: (450 − 50) × 12 = 4 800 kr</div>
            <div class="eq">108 000 000 / 4 800 = <b>22 500 medlemmer</b></div>
            <div class="where">Regner du også med tapt salg av personlig trening og varer — 90
              millioner fordelt på 150 000 medlemmer er 600 kroner per medlem per år, altså 5 400
              totalt — blir svaret 20 000 medlemmer. Begge tallene forteller det samme.</div>
          </div>
          <p><b>22 500 medlemmer er 37,5 prosent av de 60 000 eksponerte.</b> Puls må altså miste
          mer enn hver tredje eksponerte medlem før matching lønner seg. Treningssentre mister ikke
          en tredel av medlemsmassen til en konkurrent på ett år — realistisk avgang ligger på 10
          til 15 prosent, som ark 3 tallfester til mellom 29 og 43 millioner.</p>
          <p>Det er den generelle regelen, og den er verdt å huske: <b>du matcher på hundre prosent
          av kundene dine for å redde de femten prosentene som faktisk ville gått.</b> Derfor er
          matching nesten alltid det dyreste svaret som finnes.</p>
          <p><b>Sterkt mot middels:</b> et middels svar regner 108 og sier at det er mye. Et sterkt
          svar regner videre til breakeven-avgangen, sammenligner den med hva som er realistisk, og
          gjør dermed om et stort tall til en beslutning.</p>`,
        krav: [
          "Du regner på de 60 000 eksponerte medlemmene, ikke på alle 150 000.",
          "Du husker å gange med tolv måneder.",
          "Du ser at 108 millioner er mer enn hele EBITDA-en på 100 millioner.",
          "Du regner videre til hvor mange medlemmer de kan tape før matching lønner seg.",
          "Du bruker dekningsbidraget per medlem, ikke prisen, når du regner kostnaden ved avgang.",
        ],
        felle: "Å regne kostnaden ved avgang med full pris på 450 kroner i stedet for dekningsbidraget på 400. Et medlem som slutter, tar med seg inntekten sin, men sparer også den variable kostnaden — og i en case der svaret avgjøres av en sammenligning, er det den slags upresishet som velter konklusjonen.",
      },
      {
        art: "ide",
        sek: 120,
        kort: "Idéer",
        tittel: "Hva kan Puls gjøre i stedet?",
        sp: `<p>Matching koster 108 millioner. <b>List så mange andre svar du klarer på to
          minutter.</b> Én per linje.</p>
          <p class="tiny">Tenk på hva som kan gjøres på en annen akse enn prisen — og hva som taler
          for å ikke gjøre noe i det hele tatt.</p>`,
        liste: [
          "Ikke gjøre noe i tre måneder, men måle avgangen senter for senter og handle først når tallene tilsier det",
          "Lansere et eget avstrippet lavprismerke i de mest utsatte sentrene, uten resepsjon og gruppetimer",
          "Innføre et rimeligere medlemskap med begrenset tilgang, for eksempel bare på dagtid",
          "Beholde prisen, men gi målrettet rabatt kun til medlemmer som faktisk sier opp",
          "Binde medlemmer med lengre avtale mot en lavere månedspris, og få forutsigbarhet i tillegg",
          "Konkurrere på det Tempo har fjernet: flere gruppetimer, bedre instruktører, bemannet resepsjon",
          "Legge til tjenester som ikke koster mye per medlem, som barnepass, sauna eller treningsprogram i app",
          "Selge mer personlig trening og varer til de medlemmene som blir, og heve inntekten per hode",
          "Kutte kostnader i de 22 utsatte sentrene så de tåler et lavere prispunkt hvis det blir nødvendig",
          "Markedsføre på kvalitet og bredde i stedet for pris, og gjøre sammenligningen vanskeligere",
          "Skjerpe salget mot bedriftsavtaler, der pris betyr mindre enn tilbud og beliggenhet",
          "Forbedre oppfølging av nye medlemmer de første ukene, siden det er da folk faller fra",
          "Åpne senter i områder der Tempo ikke er, og flytte veksten dit i stedet for å slåss",
          "Vurdere om Tempos kutt er så aggressivt at de selv går tom for penger, og bare vente dem ut",
        ],
        fasit: `<p>Si oppdelingen først. En som fungerer her: <b>gjøre ingenting og observere</b>,
          <b>svare på pris, men målrettet</b>, <b>svare på en annen akse enn pris</b>, og
          <b>flytte kampen et annet sted</b>.</p>
          <p>Det viktigste med denne listen er hva den <i>ikke</i> starter med. Å matche er ikke
          nevnt, fordi analysen allerede har vist at det koster mer enn det redder. Og legg merke
          til hvor billig alternativ C er: 21,6 millioner for et eget lavprismerke — en femtedel av
          matchingen — fordi det bare treffer de 12 000 som faktisk er prisfølsomme, og lar de andre
          48 000 betale full pris.</p>
          <p>Det er hele kunsten i en konkurrentrespons: <b>å gi rabatt bare til dem som ellers
          hadde gått.</b> Alt annet er å betale folk for å bli der de allerede var.</p>
          <p><b>Sterkt mot middels:</b> et middels svar lister tiltak. Et sterkt svar har med at det
          å gjøre ingenting er et reelt alternativ med en pris, og skiller mellom målrettet rabatt
          og generell prisnedgang. Den forskjellen er verdt 86 millioner i denne casen.</p>`,
        krav: [
          "Du sier oppdelingen din før du lister.",
          "Du har med å gjøre ingenting som et reelt alternativ, ikke som en unnvikelse.",
          "Minst tre idéer svarer på en annen akse enn pris.",
          "Du skiller målrettet rabatt fra generell prisnedgang.",
          "Du knytter minst én idé til et tall fra ark 3.",
        ],
        felle: "Å foreslå en generell kampanje eller velkomstrabatt for alle. Det er matching med et annet navn: kostnaden treffer alle 60 000, mens gevinsten bare finnes hos de få tusen som faktisk vurderte å bytte.",
      },
      {
        art: "syntese",
        sek: 90,
        kort: "Svar",
        tittel: "Anbefalingen",
        sp: `<p>Daglig leder står i døra og vil ha svaret nå. Hun har <b>ett minutt</b>.</p>
          <p class="tiny">Skriv anbefalingen slik du ville sagt den — ikke som notater.</p>`,
        fasit: `<p>Svaret først, og i denne casen er svaret et nei til det sjefen allerede har
          bestemt seg for. Da må tallet komme tidlig.</p>
          <blockquote><p><b>«Ikke match. Å matche i overlappsområdene koster 108 millioner i året —
          mer enn hele EBITDA-en deres på 100 — og dere måtte mistet 22 500 medlemmer, mer enn hver
          tredje eksponerte, før det lønte seg. Lanser i stedet et eget lavprismerke i de mest
          utsatte sentrene, til en femtedel av kostnaden.»</b></p>
          <p>Tre grunner. For det første handler ikke Tempos kutt om dere: de har bygget ni nye
          sentre på ett år og fått bare ti prosent flere medlemmer. Belegget har falt fra 2 219 til
          1 902 per senter. De fyller egen ledig kapasitet. For det andre har de fjernet resepsjon,
          gruppetimer og personlig trening — de har ikke bare senket prisen, de har byttet
          forretningsmodell. Dere kan ikke matche prisen uten å matche kostnadsbasen, og den er
          320 millioner i lønn. For det tredje er bare 60 000 av 150 000 medlemmer i det hele tatt
          eksponert. Å matche i hele kjeden ville kostet 270 millioner, og 90 000 av dem har ikke
          noe sted å gå.</p>
          <p>Konkret: lanser et avstrippet medlemskap til 300 kroner i de åtte hardest utsatte
          sentrene — 21,6 millioner i året — og gi rabatt ellers bare til medlemmer som faktisk sier
          opp. Bruk markedsføringen på det Tempo nettopp har kuttet: instruktører, gruppetimer,
          bemanning. Og mål avgangen ukentlig, senter for senter.</p>
          <p>Risikoen er at Tempo går lenger ned, eller at avgangen blir større enn 15 prosent. Da
          har dere fortsatt handlingsrom, for dere har ikke brukt opp prisvåpenet. Det jeg ville
          gjort først i morgen, er å hente ut oppsigelsestallene fra de 22 overlappssentrene — det
          er de tallene, ikke annonsen i avisen, som skal utløse et større svar.»</p></blockquote>
          <p><b>Sterkt mot middels:</b> et middels svar sier at man ikke bør matche fordi det er
          dyrt. Et sterkt svar sier hva klienten skal gjøre i stedet, hva det koster, hva som ville
          fått anbefalingen til å endre seg, og hvilket tall som skal utløse den endringen. Å gi
          sjefen et motsvar på hennes eget forslag krever at du har et alternativ klart — ellers er
          du bare i veien.</p>`,
        krav: [
          "Svaret kommer i første setning, med tallet, selv om det motsier daglig leder.",
          "Du forklarer konkurrentens motiv som en del av begrunnelsen, ikke bare kostnaden.",
          "Du gir et konkret alternativ med en prislapp, ikke bare et nei.",
          "Du sier hva som ville fått deg til å endre anbefalingen, og hvilket tall som utløser det.",
          "Du holder deg innenfor et minutt.",
        ],
        felle: "Å anbefale å avvente uten å si hva man venter på og hva som skal utløse handling. «La oss følge med litt» er ikke en anbefaling — det er en utsettelse, og det er akkurat det en leder med hastverk kommer til å overkjøre.",
      },
    ],
  },
  {
    id: "ops-veihjelp",
    label: "Veihjelpen som har nok biler i snitt",
    type: "Operations",
    nivå: "Middels",
    firma: "Generisk",
    stil: "candidate-led",
    minutter: 40,
    ch: [],
    blurb: "Kapasiteten er 60 prosent over snittetterspørselen, og likevel brytes responskravet. Trener variabilitet mot kapasitet, og hvorfor man kjøper snittet og leier toppen.",
    prompt: `<p>Klienten er <b>Bergingsvakten</b>, som leverer veihjelp på Østlandet på kontrakt for
      et stort forsikringsselskap. De rykker ut ved startvansker, punktering, feilfylling og
      utforkjøring, med <b>28 bergingsbiler</b>.</p>
      <p>Kontrakten har ett bindende krav: <b>90 prosent av oppdragene skal ha bil på stedet innen
      60 minutter.</b> Sist vintersesong klarte de <b>82 prosent</b>. Forsikringsselskapet har
      varslet at kontrakten går på anbud til våren.</p>
      <p>Driftslederen avviser å kjøpe flere biler: «Vi har nok kapasitet. Bilene våre kjører
      62 prosent belegg — vi har ledig kapasitet hver eneste uke.»
      <b>Har han rett, og hva bør klienten gjøre?</b></p>`,
    bakgrunn: `<p>Casen er konstruert, men den handler om det mest kontraintuitive i
      driftsfaget: <b>et system kan ha rikelig kapasitet i gjennomsnitt og likevel ha kø hele
      tiden.</b> Ventetid oppstår ikke bare når kapasiteten er for liten — den oppstår av
      <i>variasjon</i>, i etterspørselen, i arbeidstiden per oppdrag, eller i begge.</p>
      <p>Veihjelp er en ekstrem utgave fordi variasjonen er værstyrt. En mild uke i januar gir
      knapt noe å gjøre. Den første skikkelige kuldenatten gir ti ganger så mange oppdrag, fordi
      alle de svake batteriene i regionen dør samtidig. Etterspørselen er ikke jevn med litt støy
      — den er klumpete, og klumpene er korrelerte.</p>
      <p>Og tjenesten kan ikke lagres. Et verksted kan produsere mot lager i stille uker; en
      bergingsbil kan ikke rykke ut på forskudd. Derfor blir dette den klassiske avveiningen i
      kapasitetsstyring: <b>skal du eie kapasitet for toppen, eller eie for snittet og leie
      toppen?</b> Svaret er nesten alltid det andre, og casen er god trening fordi den lar deg
      regne på nøyaktig hvor mye det andre er verdt.</p>`,
    trinn: [
      {
        art: "oppklaring",
        kort: "Avklaring",
        sek: 90,
        tittel: "Hva vil du vite før du begynner?",
        sp: `<p>Du har hørt prompten. Før du strukturerer: hvilke spørsmål stiller du?</p>`,
        fasit: `<p>Driftslederen har gitt deg et gjennomsnitt og en konklusjon i samme setning.
          De avklarende spørsmålene skal angripe nettopp det.</p>
          <ul>
            <li><b>Hvordan fordeler oppdragene seg over sesongen?</b> Dette er det avgjørende
              spørsmålet. 62 prosent belegg kan bety jevn drift på 62 prosent, eller halvparten av
              døgnene på 20 og resten på 200. Det er to helt forskjellige selskaper.</li>
            <li><b>Måles de 90 prosentene per oppdrag eller per døgn, og over hvilken periode?</b>
              Et krav som måles per oppdrag over en hel sesong, er noe helt annet enn et krav som
              måles per måned. Kontraktsteksten avgjør regnestykket.</li>
            <li><b>Hva er straffen for å bomme, og hva er kontrakten verdt?</b> Uten det kan ingen
              vurdere hvor mye det er verdt å investere for å nå kravet.</li>
            <li><b>Hvor mange oppdrag rekker en bil per døgn, og hva består tiden av?</b>
              Kjøretid, jobbtid eller venting? Klarer vi flere per bil, trenger vi færre biler.</li>
            <li><b>Er toppene forutsigbare?</b> Vet vi et døgn i forveien at det kommer kuldegrader?
              Da er dette et bemanningsproblem, ikke et investeringsproblem.</li>
          </ul>
          <p><b>Hva skiller dette fra et middels svar?</b> Et middels svar spør hvorfor bilene
          bruker lang tid, og leter etter en effektivitetsfeil. <b>Et sterkt svar angriper
          gjennomsnittet i driftslederens påstand med en gang, og spør etter fordelingen — fordi
          hvis fordelingen er skjev, er hele hans argument ugyldig uten at ett eneste tall er
          feil.</b></p>`,
        krav: [
          "Du ber om fordelingen over sesongen, ikke bare snittet driftslederen oppga.",
          "Du spør om kravet måles per oppdrag eller per døgn — det avgjør regnestykket.",
          "Du spør hva kontrakten er verdt og hva bruddet koster.",
          "Du spør om toppene er varslet på forhånd.",
          "Du sier hvorfor du spør, og hva svaret ville endre i strukturen din.",
        ],
        felle: "Å akseptere de 62 prosentene som et gyldig argument og lete etter feilen et annet sted. Et gjennomsnittlig belegg sier ingenting om ventetid når etterspørselen svinger, og hele casen ligger i den setningen.",
      },
      {
        art: "struktur",
        kort: "Nedbrytning",
        sek: 150,
        tittel: "Strukturer problemet",
        sp: `<p>Bryt ned hvorfor bare 82 prosent av oppdragene nås innen 60 minutter, når
          kapasiteten i snitt er rikelig. <b>Avslutt med hypotesen din.</b></p>`,
        fasit: `<p>Ikke start i et rammeverk. Start i det som faktisk skaper ventetid:</p>
          <div class="formula">
            <div class="eq">Ventetid = f(kapasitet, etterspørsel, variasjon i begge)</div>
            <div class="where">Tre ledd, ikke to. Driftslederen har regnet på de to første og
              utelatt det tredje — og det tredje er det som lager kø i et system som har nok
              kapasitet i snitt.</div>
          </div>
          <p>Bygg så ut hvert ledd med klientens egne størrelser:</p>
          <ul>
            <li><b>Etterspørselen:</b> nivå, og like viktig, formen. Hvor mange oppdrag kommer på
              de verste døgnene mot de rolige? Er toppene værstyrte og dermed korrelerte, slik at
              alt skjer samtidig? Klumper de seg også innenfor døgnet, typisk mellom 06 og 09?</li>
            <li><b>Kapasiteten:</b> antall biler ganger oppdrag per bil per døgn. Oppdrag per bil
              er i seg selv kjøretid pluss jobbtid, så geografi og plassering hører hjemme her.</li>
            <li><b>Koblingen mellom dem:</b> hvordan oppdragene tildeles, om de prioriteres etter
              hastegrad, og om en bil kan stå ledig i ett område mens køen bygger seg i et annet.</li>
            <li><b>Kravet selv:</b> 90 prosent innen 60 minutter er en parameter i en kontrakt, ikke
              en naturlov. Å ta med kontrakten som en gren er ikke å pynte på svaret — det er ofte
              det billigste stedet å løse problemet.</li>
          </ul>
          <p>Og si den avgjørende innsikten høyt, gjerne før du får data: <b>et snitt betjener
          ingen.</b> Kunden ringer på et bestemt tidspunkt, og da er det kapasiteten <i>den
          dagen</i> som avgjør om bilen kommer. Ledig kapasitet i en mild uke i februar kan ikke
          spares til den første kuldenatten.</p>
          <p><b>Hypotesen:</b> etterspørselen er svært ujevn, og en stor andel av oppdragene faller
          på et lite antall værstyrte døgn der etterspørselen langt overstiger kapasiteten.
          Jeg vil se oppdragene fordelt på døgn, sortert etter volum.</p>`,
        krav: [
          "Du har med variasjon som eget ledd, ikke bare kapasitet og etterspørsel.",
          "Du deler kapasiteten i antall biler og oppdrag per bil, og knytter det siste til kjøretid og jobbtid.",
          "Du sier eksplisitt at ledig kapasitet på rolige døgn ikke kan spares til travle.",
          "Du tar med selve kontraktskravet som en gren du kan angripe.",
          "Du ber om fordelingen av oppdrag per døgn, ikke om mer data generelt.",
        ],
        felle: "Å bygge en ren flaskehalsanalyse med utnyttelsesgrad per ledd, slik man ville gjort i en fabrikk. Her finnes det ingen flaskehals å finne — kapasiteten er rikelig i snitt. Verktøyet som passer, er fordelingen, ikke flaskehalsen.",
      },
      {
        art: "exhibit",
        kort: "Døgnprofil",
        sek: 120,
        tittel: "Sesongen fordelt på døgntype",
        sp: `<p>Du får tabellen du ba om: alle 150 døgn i forrige vintersesong, gruppert etter
          hvor mange oppdrag som kom inn. <b>Hva ser du, og hva betyr det?</b></p>`,
        figur: `<table class="data">
            <tr><th>Døgntype</th><th class="n">Døgn</th><th class="n">Oppdrag per døgn</th><th class="n">Oppdrag i sesongen</th><th class="n">Andel</th></tr>
            <tr><td>Mildt og tørt</td><td class="n">60</td><td class="n">55</td><td class="n">3 300</td><td class="n">15,7 %</td></tr>
            <tr><td>Normalt vintervær</td><td class="n">60</td><td class="n">120</td><td class="n">7 200</td><td class="n">34,3 %</td></tr>
            <tr><td>Kaldt eller glatt føre</td><td class="n">21</td><td class="n">260</td><td class="n">5 460</td><td class="n">26,0 %</td></tr>
            <tr><td>Snøfall eller kuldebølge</td><td class="n">9</td><td class="n">560</td><td class="n">5 040</td><td class="n">24,0 %</td></tr>
            <tr><td><b>Sum</b></td><td class="n"><b>150</b></td><td class="n"><b>140 i snitt</b></td><td class="n"><b>21 000</b></td><td class="n"><b>100 %</b></td></tr>
          </table>
          <table class="data">
            <tr><th>Kapasitet og kontrakt</th><th class="n">Tall</th></tr>
            <tr><td>Bergingsbiler i drift</td><td class="n">28</td></tr>
            <tr><td>Oppdrag per bil per døgn innenfor 60 minutter</td><td class="n">8</td></tr>
            <tr><td><b>Kapasitet per døgn</b></td><td class="n"><b>224</b></td></tr>
            <tr><td>Betaling per oppdrag fra forsikringsselskapet</td><td class="n">1 500</td></tr>
            <tr><td>Kostnad for en egen bil i drift, per år</td><td class="n">2 000 000</td></tr>
            <tr><td>Døgnpris for innleid bil med sjåfør</td><td class="n">12 000</td></tr>
          </table>
          <p class="tiny">Oppdrag utover døgnkapasiteten blir liggende i kø og faller utenfor 60-minutterskravet. Beløp i kroner.</p>`,
        fasit: `<p>Overskriften først, og den er ett tall:</p>
          <p><i>«Halvparten av oppdragene kommer på 30 av 150 døgn. Driftslederen har rett i at
          dere har ledig kapasitet — dere har det bare på de døgnene ingen ringer.»</i></p>
          <ul>
            <li><b>Regn det ut og si det:</b> 5 460 pluss 5 040 er 10 500 oppdrag, altså nøyaktig
              halvparten av 21 000, og de kommer på 20 prosent av døgnene. Fordelingen er ikke litt
              skjev, den er ekstremt skjev.</li>
            <li><b>Kapasiteten er 224, og to døgntyper ligger over.</b> På kalde døgn kommer 260 —
              36 oppdrag mer enn dere rekker. På toppdøgn kommer 560, altså to og en halv gang
              kapasiteten. Da hjelper det ikke hva snittet er.</li>
            <li><b>Du kan regne ut de 82 prosentene selv, og bør gjøre det.</b> På døgn under
              kapasitet nås alle: 3 300 pluss 7 200. På de 30 døgnene over kapasitet nås 224:
              30 ganger 224 er 6 720. Til sammen 17 220 av 21 000 — <b>82,0 prosent</b>. Det
              stemmer nøyaktig med det rapporterte, og det betyr at hele SLA-bruddet er forklart av
              døgnfordelingen alene.</li>
            <li><b>Snittet er 140 mot en kapasitet på 224.</b> Klienten har 60 prosent mer kapasitet
              enn gjennomsnittlig etterspørsel og bryter likevel kravet. Det er hele poenget med
              casen, og det er verdt å si eksplisitt.</li>
          </ul>
          <p><b>Hva skiller dette fra et middels svar?</b> Et middels svar sier at fordelingen er
          skjev og at toppene er problemet. Det er riktig og for vagt. <b>Et sterkt svar regner
          seg fram til de 82 prosentene fra tabellen og bekrefter at tallet stemmer — for da har
          man bevist at forklaringen er fullstendig, og kan utelukke at det også ligger et
          effektivitetsproblem i bunnen.</b></p>`,
        krav: [
          "Du regner ut at halvparten av oppdragene kommer på 20 prosent av døgnene.",
          "Du sammenligner kapasiteten på 224 mot hver døgntype, ikke mot snittet.",
          "Du regner deg fram til de 82 prosentene selv og bekrefter at de stemmer.",
          "Du sier eksplisitt at kapasiteten er 60 prosent over snittetterspørselen og likevel utilstrekkelig.",
          "Du sier konklusjonen først, ikke en rad-for-rad-opplesning av tabellen.",
        ],
        felle: "Å regne snittetterspørselen til 140 og konkludere med at 28 biler holder. Det er nøyaktig driftslederens feil, gjort en gang til med tabellen foran seg. Ingen kunde ringer på et gjennomsnittsdøgn.",
      },
      {
        art: "regne",
        kort: "Biler",
        sek: 120,
        tittel: "Hvor mange biler kreves for kravet?",
        sp: `<p>Kontrakten krever at <b>90 prosent av oppdragene i sesongen</b> nås innen
          60 minutter. Hver bil rekker 8 oppdrag per døgn, og alt utover døgnkapasiteten faller
          utenfor kravet.</p>
          <p><b>Hvor mange bergingsbiler må Bergingsvakten ha for å klare kravet?</b></p>
          <p class="tiny">Si oppsettet høyt før du regner. Svar i antall biler.</p>`,
        svar: 41,
        enhet: "bergingsbiler",
        toleranse: 0.02,
        fasit: `<p>Start med hvor mange oppdrag kravet faktisk gjelder, og jobb bakover:</p>
          <div class="formula">
            <div class="eq">Kravet: 0,90 × 21 000 = 18 900 oppdrag innen 60 minutter</div>
            <div class="eq">Med nok biler nås alle de tre laveste døgntypene: 3 300 + 7 200 + 5 460 = 15 960</div>
            <div class="eq">Resten må komme fra de 9 toppdøgnene: 18 900 − 15 960 = 2 940</div>
            <div class="eq">Per toppdøgn: 2 940 / 9 = 326,7 oppdrag</div>
            <div class="eq">Biler: 326,7 / 8 = 40,8 → <b>41 bergingsbiler</b></div>
            <div class="where">Kontroll: 41 biler gir 328 per døgn. Det dekker de kalde døgnene
              med 260 helt, og gir 15 960 + 9 × 328 = 18 912, altså 90,1 prosent. Med 40 biler blir
              det 18 840, som er 89,7 prosent — og da er kontrakten brutt.</div>
          </div>
          <p><b>Og her ligger poenget som avgjør casen.</b> Sett de tre kapasitetsnivåene ved
          siden av hverandre:</p>
          <ul>
            <li>For <b>snittetterspørselen</b> på 140 oppdrag trengs 18 biler.</li>
            <li>For <b>dagens 82 prosent</b> har klienten 28 biler.</li>
            <li>For <b>kravet på 90 prosent</b> trengs 41 biler.</li>
          </ul>
          <p>De siste åtte prosentpoengene koster altså <b>13 biler til, en økning på 46 prosent</b>
          — og de bringer beleggsgraden ned fra 62 til 43 prosent. Kjøpt som egne biler koster det
          <b>13 × 2 millioner = 26 millioner kroner i året</b>, mot en sesonginntekt på
          21 000 × 1 500 = 31,5 millioner. <b>Å eie seg til kravet spiser nesten hele kontrakten.</b>
          Det er svaret på om driftslederen har rett: han tar feil om at kapasiteten holder, men
          han har helt rett i at det ikke er flere egne biler som er løsningen.</p>
          <p>Regn så alternativet, for det er der anbefalingen ligger. Klienten mangler
          18 900 − 17 220 = 1 680 oppdrag, og de mangler bare på 30 døgn:</p>
          <div class="formula">
            <div class="eq">Kalde døgn: 36 oppdrag for lite, altså 5 innleide biler × 21 døgn</div>
            <div class="eq">Toppdøgn: resterende 924 oppdrag over 9 døgn = 103 per døgn, altså 13 innleide biler × 9 døgn</div>
            <div class="eq">Til sammen 222 bil-døgn × 12 000 = <b>2,7 millioner kroner</b></div>
          </div>
          <p><b>Samme kontraktsoppfyllelse, en tiendedel av kostnaden.</b> Å eie kapasitet som
          brukes 30 døgn i året, er å betale for 335 døgn med stillstand.</p>
          <p><b>Hva skiller dette fra et middels svar?</b> Et middels svar regner riktig fram til
          41 biler og stopper der. <b>Et sterkt svar prissetter de 13 bilene, ser at 26 millioner
          er uforsvarlig mot en kontrakt på 31,5, og regner deretter den innleide løsningen —
          fordi spørsmålet aldri var hvor mye kapasitet som trengs, men hvordan man skaffer den.</b></p>`,
        krav: [
          "Du regner kravet om til antall oppdrag, ikke til antall døgn.",
          "Du ser at bare toppdøgnene fortsatt ligger over kapasitet ved løsningen, og bruker det.",
          "Du kontrollerer svaret ved å regne SLA-en tilbake for 40 og 41 biler.",
          "Du priser de ekstra bilene og sammenligner med kontraktens verdi.",
          "Du regner på innleid kapasitet som alternativ, og oppgir forholdet mellom de to.",
        ],
        felle: "Å finne døgnet som ligger på 90-persentilen og dimensjonere etter det. Det er et kaldt døgn med 260 oppdrag, altså 33 biler — men kravet gjelder 90 prosent av oppdragene, ikke av døgnene, og toppdøgnene bærer langt flere oppdrag hver. 33 biler gir bare 87,3 prosent, og kontrakten er fortsatt brutt.",
      },
      {
        art: "ide",
        kort: "Tiltak",
        sek: 120,
        tittel: "Hvordan når de kravet?",
        sp: `<p>Du vet nå at problemet er 30 døgn, ikke 150. <b>List så mange tiltak du klarer på
          to minutter.</b> Én per linje. Si oppdelingen din først.</p>`,
        liste: [
          "Inngå beredskapsavtaler med lokale bilbergere og verksteder som kalles inn på toppdøgn",
          "Bemanne etter værvarselet: kall inn ekstra mannskap og biler et døgn før kuldebølgen",
          "Betale egne sjåfører for tilkallingsberedskap i vintermånedene, ikke for fast vakt",
          "Prioritere oppdragene etter hastegrad: utforkjøring i veibanen foran startvansker i garasje",
          "Reforhandle kontrakten til differensiert krav: 60 minutter på trafikkfarlige oppdrag, lengre på resten",
          "Reforhandle måleperioden, slik at kravet gjelder per sesong og ikke straffes døgn for døgn",
          "Løse flere oppdrag uten utrykning: telefonstøtte, startveiledning i app, henvisning til nærmeste verksted",
          "Korte ned tiden per oppdrag med bedre utstyr i bilen og digital oppdragsflyt uten papirarbeid",
          "Plassere bilene etter forventet etterspørsel og trafikk, ikke jevnt utover geografien",
          "Kjøre forebyggende batterikampanje i oktober, som fjerner en del av startvanskene i toppene",
          "Inngå gjensidig overflytsavtale med en konkurrent, der begge tar den andres topper",
          "Leie inn sesongbiler og sesongsjåfører for vintermånedene i stedet for å eie hele året",
          "Ta betalt for topper i neste kontrakt, slik at prisen per oppdrag følger belastningen",
          "Måle og rapportere responstid per døgntype, så samtalen med kunden handler om de 30 døgnene",
        ],
        fasit: `<p>Oppdelingen er halve poenget her, og den følger direkte av analysen. Si den før
          du lister: <b>skaff fleksibel kapasitet til toppene, reduser etterspørselen i toppene,
          eller endre kravet.</b></p>
          <ul>
            <li><b>Fleksibel kapasitet:</b> innleie, beredskap, sesongbiler, overflytsavtaler. Dette
              er hovedsporet, og det er det analysen peker på.</li>
            <li><b>Mindre etterspørsel i toppene:</b> forebygging, telefonløsning, prioritering.
              Hvert oppdrag som forsvinner fra et toppdøgn, er verdt langt mer enn ett som
              forsvinner fra et mildt døgn.</li>
            <li><b>Endre kravet:</b> differensiert SLA og lengre måleperiode. Dette er ofte det
              billigste tiltaket av alle, og det blir nesten alltid glemt.</li>
          </ul>
          <p>Avslutt med å <b>prioritere</b>: beredskapsavtalene først, fordi de alene lukker gapet
          for 2,7 millioner og kan være på plass før neste sesong.</p>`,
        krav: [
          "Du sier oppdelingen først, og den skiller kapasitet, etterspørsel og kontraktskrav.",
          "Du foreslår fleksibel kapasitet, ikke bare flere egne biler.",
          "Minst ett tiltak reduserer etterspørselen på toppdøgnene spesielt.",
          "Du tar med å reforhandle selve kravet som et reelt alternativ.",
          "Du prioriterer til slutt, og begrunner rekkefølgen.",
        ],
        felle: "Å foreslå generell effektivisering — raskere oppdrag, bedre ruteplanlegging — som hovedgrep. Det hjelper litt på alle 150 døgn, men problemet finnes bare på 30 av dem, og der er gapet så stort at effektivisering alene ikke lukker det.",
      },
      {
        art: "syntese",
        kort: "Anbefaling",
        sek: 90,
        tittel: "Anbefalingen",
        sp: `<p>Daglig leder har <b>ett minutt</b> før han skal møte forsikringsselskapet.
          Gi anbefalingen din.</p>
          <p class="tiny">Skriv den slik du ville sagt den — ikke som notater.</p>`,
        fasit: `<p>Topp-ned. Svaret først, så beviset, så hva som skal skje før neste sesong.</p>
          <blockquote><p><b>«Ikke kjøp flere biler — kjøp beredskap. Dere mangler kapasitet på
          30 av 150 døgn, og det gapet kan lukkes for 2,7 millioner i året. Å eie seg til det
          samme kravet koster 26 millioner, av en kontrakt som er verdt 31,5.»</b></p>
          <p>Tre grunner. For det første er driftslederen halvveis riktig: kapasiteten er
          60 prosent over snittetterspørselen. Men halvparten av oppdragene kommer på 20 prosent av
          døgnene, og et snitt betjener ingen. For det andre forklarer døgnfordelingen alene
          nøyaktig de 82 prosentene dere leverte — det er ikke et effektivitetsproblem i bunnen.
          For det tredje ville 90 prosent med egne biler krevd 41 biler mot dagens 28, og de ville
          stått ubrukt 43 prosent av tiden.</p>
          <p>Konkret: inngå beredskapsavtaler med lokale bergere om 5 biler på kalde døgn og
          13 på de verste, kalt inn på værvarsel et døgn i forveien. Parallelt tar dere ned
          etterspørselen i toppene med telefonstøtte og en batterikampanje i oktober. Og i
          anbudet ber dere om differensiert responskrav — 60 minutter der bilen står trafikkfarlig,
          lengre der den står i egen garasje.</p>
          <p>Den store risikoen er at de innleide bergerne er opptatt nøyaktig når dere trenger
          dem, siden været rammer alle samtidig — så avtalene må være betalte beredskapsavtaler med
          eksklusivitet, ikke løse intensjoner. Neste steg jeg ville tatt, er å sjekke hvordan
          oppdragene fordeler seg innenfor toppdøgnene; kommer de fleste mellom 06 og 09, kan en
          del av gapet lukkes med vaktskifte i stedet for med biler.»</p></blockquote>
          <p><b>Hva skiller dette fra et middels svar?</b> Et middels svar sier «dere trenger
          41 biler for å nå kravet». Det er riktig regnet og feil anbefaling, fordi det svarer på
          hvor mye kapasitet som trengs i stedet for hvordan man skaffer den. <b>Et sterkt svar
          setter de to måtene å skaffe kapasitet på opp mot hverandre i kroner, velger den
          fleksible, og navngir risikoen ved den — at værstyrte topper rammer underleverandørene
          samtidig.</b></p>`,
        krav: [
          "Første setning er beslutningen, og den avviser flere egne biler.",
          "Du setter 2,7 millioner opp mot 26 millioner og mot kontraktens verdi.",
          "Du sier at halvparten av oppdragene kommer på 20 prosent av døgnene.",
          "Du gir konkrete tiltak med antall biler og utløser, ikke bare prinsippet om innleie.",
          "Du navngir risikoen ved innleie og gir et neste steg, innenfor ett minutt.",
        ],
        felle: "Å anbefale 41 biler fordi det var svaret på regnestykket. Regnestykket viste hvor mye kapasitet kravet krever, ikke hvordan den bør eies. En kapasitet som trengs 30 døgn i året, skal nesten aldri kjøpes.",
      },
    ],
  },
  {
    id: "offentlig-arbeidsmarkedstiltak",
    label: "300 millioner til arbeidsmarkedstiltak",
    type: "Offentlig",
    nivå: "Intro",
    firma: "Generisk",
    stil: "interviewer-led",
    minutter: 25,
    ch: [],
    blurb: "En klient uten bunnlinje. Trener effekt per krone mot en sammenligningsgruppe — og hva du gjør når to legitime mål peker i hver sin retning.",
    prompt: `<p>Klienten er <b>arbeids- og inkluderingsavdelingen i et av landets største fylker</b>.
      Avdelingen disponerer <b>300 millioner kroner i året</b> til arbeidsmarkedstiltak, fordelt på fem
      tiltakstyper og 9 150 deltakerplasser. I fylket står omtrent 14 000 mennesker registrert som
      arbeidssøkere eller med nedsatt arbeidsevne.</p>
      <p>Departementet har strammet inn: bevilgningen ligger fast i tre år, men avdelingen skal dokumentere
      <b>hva den får igjen for pengene</b>.</p>
      <p>Fylkesdirektøren spør: <b>Bruker vi de 300 millionene riktig, og hva ville du endret?</b></p>`,
    bakgrunn: `<p>Casen er konstruert, men mekanismen er den sentrale i all offentlig tiltaksevaluering:
      et tiltak måles mot <i>hva som ville skjedd uten det</i>. Andelen deltakere som ville kommet i jobb
      uansett, kalles dødvekt, og den er hele forskjellen mellom et tiltak som <i>ser</i> billig ut og et som
      <i>er</i> billig.</p>
      <p>Det som gjør offentlig sektor til en egen sjanger, er at målfunksjonen ikke er gitt. En privat klient
      maksimerer profitt. Denne klienten skal både få flest mulig i arbeid for pengene <b>og</b> hjelpe dem som
      står lengst fra arbeidslivet — og de to målene peker mot motsatte prioriteringer. En kandidat som
      importerer profitt-treet, oppdager aldri at konflikten finnes.</p>`,
    trinn: [
      {
        art: "oppklaring",
        sek: 90,
        kort: "Spørsmål",
        tittel: "Hva betyr «riktig»?",
        sp: `<p>Fylkesdirektøren spurte om pengene brukes riktig. <b>Hva spør du om før du svarer?</b></p>`,
        fasit: `<p>Hos en privat klient er målfunksjonen gitt. Her er den ikke det, og derfor er den første
          avklaringen alltid den samme: <b>hva maksimeres, og under hvilken skranke?</b></p>
          <ul>
            <li><b>Betyr «riktig» flest mulig i jobb totalt, eller flest mulig av dem som ellers ikke ville
              kommet i jobb?</b> De to gir motsatt rangering av tiltakene. Dette er det viktigste spørsmålet
              i casen.</li>
            <li><b>Er rammen virkelig fast, og kan penger flyttes mellom tiltakstypene?</b> Hvis ikke, er ikke
              omfordeling et mulig svar, og casen handler om noe annet.</li>
            <li><b>Hvor lenge skal effekten vare — jobb etter 12 måneder, eller varig tilknytning?</b>
              Et tiltak som ser best ut på 12 måneder, kan være det svakeste på 36.</li>
            <li><b>Finnes det tall for en sammenlignbar gruppe som ikke fikk tiltak?</b> Uten det er all
              effektmåling gjetning, uansett hvor presise de andre tallene er.</li>
            <li><b>Har avdelingen andre mål enn sysselsetting — fordeling, geografi, hvem tiltakene skal
              nå?</b> Still dette tidlig. Det er her konflikten ligger.</li>
          </ul>
          <p><b>Sterkt mot middels:</b> et middels svar spør om budsjettet og deltakertallene. Et sterkt svar
          spør hva som maksimeres, og oppdager i samme åndedrag at klienten har <i>to</i> mål som ikke kan
          maksimeres samtidig. Å navngi målkonflikten allerede i avklaringen er det som skiller her.</p>`,
        krav: [
          "Du spør hva som maksimeres, i stedet for å anta at målet er flest mulig i jobb.",
          "Du avklarer om penger kan flyttes mellom tiltakstypene, siden det avgjør hva et svar kan være.",
          "Du spør etter en sammenligningsgruppe — uten den kan ingen effekt måles.",
          "Du spør om avdelingen har andre mål enn sysselsetting, og navngir dermed målkonflikten tidlig.",
        ],
        felle: "Å behandle fylket som en bedrift med kostnader og «inntekter» i form av folk i jobb. En offentlig klient har flere legitime mål samtidig, og en anbefaling som later som det bare finnes ett, blir avvist i første politiske behandling.",
      },
      {
        art: "struktur",
        sek: 150,
        kort: "Struktur",
        tittel: "Hva måler du, og mot hva?",
        sp: `<p>Anta at målet er å få flest mulig i varig arbeid innenfor en fast ramme, men at avdelingen
          også har et mandat om å nå dem som står lengst unna. <b>Strukturer oppdraget.</b></p>`,
        fasit: `<p>Bygg ligningen først. Den er hele forskjellen på denne casen og en lønnsomhetscase.</p>
          <div class="formula">
            <div class="eq">Kroner per ekstra person i jobb = Kostnad / (Deltakere × (Andel i jobb med tiltak − Andel i jobb uten tiltak))</div>
            <div class="where">Nevneren er ikke «antall i jobb». Den er antall som er i jobb <i>på grunn av</i>
              tiltaket. Differansen mot en sammenlignbar gruppe er selve effekten.</div>
          </div>
          <p>Tre grener, og de er ikke likeverdige — si hvilken du starter i:</p>
          <ul>
            <li><b>Effekt per krone per tiltakstype.</b> Teller: ekstra personer i jobb. Nevner: total kostnad.
              Dette er der de raske pengene ligger, fordi omfordeling er gratis.</li>
            <li><b>Kapasitet mot behov.</b> 9 150 plasser mot rundt 14 000 mennesker er en dekningsgrad på
              65 prosent. Prioritering <i>mellom</i> tiltak er da bare halve spørsmålet — dekningsgraden er
              også et valg, og den kan ikke løses innenfor rammen.</li>
            <li><b>Fordeling og mandat.</b> Hvem når hvert tiltak? Et tiltak kan ha lav effekt per krone og
              likevel være det eneste tilbudet til dem som ellers ikke har noe.</li>
          </ul>
          <p>Legg til et lag med <b>det som kan gjøre analysen feil</b>, for i offentlig sektor er det ikke en
          pliktbullet: <i>seleksjon</i> (de mest motiverte havner i de beste tiltakene og skaper falsk effekt),
          <i>fortrengning</i> (den som får jobb gjennom lønnstilskudd, tar den fra en annen ledig, slik at
          nettoeffekten for samfunnet er mindre enn for deltakeren), og <i>varighet</i> (jobb etter 12 måneder
          er ikke det samme som varig tilknytning).</p>
          <p><b>Hypotesen:</b> med fast ramme ligger den største gevinsten i omfordeling mellom tiltak, ikke i
          å kutte noe. Jeg vil derfor regne kroner per ekstra person i jobb per tiltakstype først — og
          behandle mandatgrenen som en skranke, ikke som en gren jeg optimerer.</p>
          <p><b>Sterkt mot middels:</b> et middels svar setter opp «kostnad per deltaker i jobb» og kaller det
          effekt per krone. Et sterkt svar bygger nevneren med en sammenligningsgruppe, og sier eksplisitt at
          mandatet er en skranke som ikke kan måles med samme linjal.</p>`,
        krav: [
          "Du bygger en ligning der nevneren er ekstra personer i jobb, ikke personer i jobb.",
          "Du har med kapasitet mot behov, ikke bare fordeling mellom tiltakene.",
          "Du behandler mandatet om de vanskeligste som en egen skranke, ikke som en fotnote.",
          "Du navngir minst to feilkilder — seleksjon, fortrengning eller varighet.",
          "Du sier hvilken gren du starter i, og hvorfor.",
        ],
        felle: "Å importere profitt-treet: behandle kostnad per deltaker som kostnadssiden og antall i jobb som inntektssiden, og maksimere differansen. Da rangerer du tiltakene etter hvor lette deltakerne var, ikke etter hva tiltaket gjorde.",
      },
      {
        art: "exhibit",
        sek: 150,
        kort: "Figur",
        tittel: "De fem tiltakene",
        sp: `<p>Avdelingen har fått en ekstern evaluering som også følger sammenlignbare grupper som ikke fikk
          tiltak. <b>Hva ser du i tabellen?</b></p>`,
        figur: `<table class="data">
            <tr><th>Tiltak</th><th class="n">Plasser</th><th class="n">Kr per plass</th><th class="n">Sum (mill. kr)</th><th class="n">I jobb etter 12 mnd</th><th class="n">Sammenlignbar gruppe</th></tr>
            <tr><td>Digitalt jobbsøkerkurs</td><td class="n">4 000</td><td class="n">5 000</td><td class="n">20,0</td><td class="n">51 %</td><td class="n">50 %</td></tr>
            <tr><td>Lønnstilskudd, 6 måneder</td><td class="n">1 200</td><td class="n">60 000</td><td class="n">72,0</td><td class="n">64 %</td><td class="n">44 %</td></tr>
            <tr><td>Fagkurs (AMO), 5 måneder</td><td class="n">900</td><td class="n">90 000</td><td class="n">81,0</td><td class="n">57 %</td><td class="n">43 %</td></tr>
            <tr><td>Arbeidsforberedende trening</td><td class="n">650</td><td class="n">140 000</td><td class="n">91,0</td><td class="n">26 %</td><td class="n">11 %</td></tr>
            <tr><td>Ekstern oppfølging</td><td class="n">2 400</td><td class="n">15 000</td><td class="n">36,0</td><td class="n">47 %</td><td class="n">42 %</td></tr>
            <tr><td><b>Sum</b></td><td class="n"><b>9 150</b></td><td class="n">–</td><td class="n"><b>300,0</b></td><td class="n">–</td><td class="n">–</td></tr>
          </table>
          <p class="tiny">Sammenlignbar gruppe: andelen i jobb etter 12 måneder blant mennesker med tilsvarende
          bakgrunn som ikke fikk plass på tiltaket.</p>`,
        fasit: `<p>Orientér deg først, og si det høyt: <b>den siste kolonnen er det viktigste tallet i tabellen,
          og den er også den de fleste hopper over.</b> Den forteller hva som ville skjedd uten tiltaket.</p>
          <p>Overskriften:</p>
          <p><i>«Det billigste tiltaket per hode er nesten uten effekt. Jobbsøkerkurset får 51 prosent i jobb —
          mot 50 prosent i den sammenlignbare gruppen. Ett prosentpoeng.»</i></p>
          <p>Deretter tre observasjoner som til sammen snur hele rangeringen:</p>
          <ul>
            <li><b>Lønnstilskudd har den klart største effekten:</b> 64 mot 44, altså 20 prosentpoeng. Det er
              også det nest dyreste tiltaket per plass — de to tingene henger sammen, og det er hele poenget.</li>
            <li><b>Arbeidsforberedende trening ser dårligst ut og er det ikke.</b> 26 prosent i jobb er lavest i
              tabellen, helt til du ser at den sammenlignbare gruppen ligger på 11. Effekten er 15 prosentpoeng
              — større enn fagkursets 14. Å rangere tiltak etter <i>resultat</i> i stedet for etter
              <i>effekt</i> straffer systematisk de tiltakene som tar imot de vanskeligste deltakerne.</li>
            <li><b>Sammenligningsgruppene er ikke like:</b> 50 prosent mot 11 prosent forteller at deltakerne i
              de fem tiltakene er helt forskjellige mennesker. Nettopp derfor kan du ikke sammenligne
              «andel i jobb» på tvers — bare effekten.</li>
          </ul>
          <p><b>Sterkt mot middels:</b> et middels svar rangerer kolonnen «i jobb etter 12 måneder» og peker på
          lønnstilskudd fordi det topper den. Et sterkt svar leser de to siste kolonnene sammen, ser at
          differansen er tallet som betyr noe, og sier at spriket fra 50 til 11 i sammenligningsgruppene er
          bevis på at tiltakene ikke er sammenlignbare uten den korreksjonen.</p>`,
        krav: [
          "Du peker på sammenligningskolonnen først og sier hva den er.",
          "Du regner differansen for minst tre av tiltakene i hodet før du konkluderer.",
          "Du ser at arbeidsforberedende trening har større effekt enn fagkurset, tross lavest andel i jobb.",
          "Du sier at spriket fra 50 til 11 betyr at tiltakene ikke kan sammenlignes på resultat alene.",
        ],
        felle: "Å rangere kolonnen «i jobb etter 12 måneder» og anbefale tiltaket som topper den. Da anbefaler du det tiltaket som tok inn de deltakerne som klarte seg best fra før.",
      },
      {
        art: "regne",
        sek: 90,
        kort: "Regning",
        tittel: "Hva koster jobbsøkerkurset egentlig?",
        sp: `<p>Ta det digitale jobbsøkerkurset: 4 000 plasser à 5 000 kroner, 51 prosent i jobb etter
          12 måneder mot 50 prosent i den sammenlignbare gruppen.</p>
          <p><b>Hva koster kurset per ekstra person i jobb?</b> Med «ekstra» menes personer som ikke ville vært
          i jobb uten tiltaket.</p>
          <p class="tiny">Svar i kroner. Si oppsettet høyt før du regner.</p>`,
        svar: 500000,
        enhet: "kroner per ekstra person i jobb",
        toleranse: 0.02,
        fasit: `<p>Effekten først, kronene etterpå.</p>
          <div class="formula">
            <div class="eq">Effekt: 51 % − 50 % = 1 prosentpoeng</div>
            <div class="eq">Ekstra i jobb: 4 000 × 1 % = 40 personer</div>
            <div class="eq">Kostnad: 4 000 × 5 000 = 20 000 000 kroner</div>
            <div class="eq">Kroner per ekstra person i jobb: 20 000 000 / 40 = <b>500 000 kroner</b></div>
          </div>
          <p><b>Og her ligger poenget.</b> Regn nå tallet forvaltningen faktisk rapporterer — kroner per
          deltaker i jobb: 20 000 000 / (4 000 × 51 %) = 20 000 000 / 2 040 = <b>9 804 kroner</b>. Det er
          <b>51 ganger billigere enn sannheten</b>, og det er tallet som står i årsrapporten.</p>
          <p>Sammenlign så med lønnstilskudd: 72 000 000 / 768 = <b>93 750 kroner</b> per deltaker i jobb,
          altså nesten ti ganger dyrere enn kurset. Men per <i>ekstra</i> person i jobb:
          72 000 000 / (1 200 × 20 %) = 72 000 000 / 240 = <b>300 000 kroner</b> — 40 prosent
          <i>billigere</i> enn kurset. Rangeringen snur fullstendig når du bytter nevner.</p>
          <p>Gjør så det regnestykket som blir anbefalingen: flytter du kursets 20 millioner til lønnstilskudd,
          kjøper du 20 000 000 / 60 000 = <b>333 nye plasser</b>. De gir 333 × 20 prosentpoeng =
          <b>67 ekstra i jobb</b>, mot 40 i dag. Samme krone, 27 flere mennesker i arbeid.</p>
          <p><b>Sanity-sjekk:</b> 500 000 kroner er mer enn en norsk årslønn. Et tiltak som koster mer enn den
          jobben det skaper, må begrunnes med noe annet enn effektivitet — og for et to ukers jobbsøkerkurs
          finnes ingen slik begrunnelse. Merk også at ett prosentpoeng på 4 000 deltakere er 40 mennesker;
          det er innenfor det man ikke kan skille fra tilfeldig variasjon, så det ærlige svaret er at kurset
          kanskje ikke har effekt i det hele tatt.</p>
          <p><b>Sterkt mot middels:</b> et middels svar deler 20 millioner på 2 040 og får 9 804 kroner.
          Et sterkt svar deler på 40, får 500 000, og sier deretter selv hva forvaltningens eget tall ville
          vært og hvor mye det bommer.</p>`,
        krav: [
          "Du trekker fra sammenligningsgruppen før du deler. Det er hele regnestykket.",
          "Du regner også tallet forvaltningen ville rapportert, og sier hvor mye det bommer.",
          "Du oppgir enheten: kroner per ekstra person i jobb, ikke bare 500 000.",
          "Du sanity-sjekker mot en årslønn og ser at tallet ikke lar seg forsvare på effektivitet.",
          "Du sier at 40 personer av 4 000 er innenfor feilmarginen, i stedet for å behandle 1 prosentpoeng som sikker effekt.",
        ],
        felle: "Å dele på 2 040 i stedet for 40 — altså å bruke antall deltakere som er i jobb, i stedet for antall som er i jobb på grunn av tiltaket. Det er den enkeltfeilen som gjør flest offentlige evalueringer verdiløse.",
      },
      {
        art: "ide",
        sek: 150,
        kort: "Idéer",
        tittel: "Hva ville du endret?",
        sp: `<p>Fylkesdirektøren spør hva du ville gjort. <b>List tiltak — men si først hvilke hensyn du veier
          mot hverandre.</b></p>
          <p class="tiny">Rammen ligger fast i tre år. Penger kan flyttes mellom tiltakstypene.</p>`,
        liste: [
          "Flytte midlene fra jobbsøkerkurset til lønnstilskudd og ekstern oppfølging, som har lavest kostnad per ekstra person i jobb",
          "Beholde arbeidsforberedende trening uendret, og begrunne det med mandatet i stedet for med effekt per krone",
          "Skille budsjettet i to potter: én som styres på effekt per krone, og én som styres på mandat",
          "Kreve sammenligningsgruppe i alle nye leverandørkontrakter, slik at effekten faktisk kan måles",
          "Måle jobb etter 24 og 36 måneder, ikke bare 12, siden varighet er en del av målet",
          "Betale leverandørene etter oppnådd resultat, men justert for hvem de tar inn, så de ikke velger de letteste",
          "Teste om lønnstilskudd fortrenger andre ledige, ved å måle på arbeidsgivernivå og ikke bare på deltakernivå",
          "Sette et tak på hvor mange lønnstilskuddsplasser som kan skaleres før effekten faller",
          "Flytte de svakeste deltakerne fra kurs til oppfølging, som virker på en gruppe som ligner mer på dem",
          "Kutte antall tiltakstyper fra fem til tre og bruke administrasjonsgevinsten på flere plasser",
          "Øke dekningsgraden fra 65 prosent for de gruppene der effekten er best dokumentert",
          "Kjøpe tiltaksplasser sammen med nabofylkene for å få lavere pris per plass",
          "Publisere effekt per krone per tiltak åpent, slik at debatten flyttes fra volum til virkning",
        ],
        fasit: `<p>Si hensynene før du lister. Her er de to, og de peker i hver sin retning — <b>det er selve
          casen.</b></p>
          <p><b>Ren effekt per krone</b> sier: legg ned arbeidsforberedende trening. Den koster
          91 000 000 / 97,5 = <b>933 000 kroner</b> per ekstra person i jobb, tre ganger så mye som
          lønnstilskudd, og de 91 millionene er nesten en tredjedel av budsjettet.</p>
          <p><b>Mandatet</b> sier det motsatte. Sammenligningsgruppen for de deltakerne ligger på 11 prosent.
          Det er de eneste menneskene i tabellen som ikke har noe alternativ. Legger du ned tiltaket, forsvinner
          ikke de — de flytter over på uføretrygd, kommunale tjenester og helsevesen. Den regningen kommer et
          annet sted i det offentlige, og den varer i tiår.</p>
          <p>Rangeringen for de øvrige, som beslutningen bør bygge på: lønnstilskudd og ekstern oppfølging
          300 000 kroner per ekstra person, jobbsøkerkurs 500 000, fagkurs 643 000, arbeidsforberedende
          trening 933 000.</p>
          <p><b>Anbefalingen som faktisk holder, er å dele rammen i to:</b> én pott som styres hardt på effekt
          per krone, og én pott som styres på mandat og ikke måles med samme linjal. Da kan du optimere den
          første uten å bruke den andre som salderingspost — og du slipper å late som konflikten ikke finnes.</p>
          <p><b>Sterkt mot middels:</b> et middels svar rangerer alt på effekt per krone og anbefaler å legge
          ned det dyreste — eller sier «begge hensyn er viktige» uten å foreslå noe. Et sterkt svar tar
          stilling, sier hvilken målfunksjon det bruker for hvilke penger, og løser konflikten strukturelt i
          stedet for retorisk.</p>`,
        krav: [
          "Du sier hvilke hensyn du veier mot hverandre før du lister idéene.",
          "Du tallfester målkonflikten: 933 000 kroner per ekstra person mot en sammenligningsgruppe på 11 prosent.",
          "Du foreslår noe som faktisk løser konflikten, ikke bare beskriver den.",
          "Minst tre idéer handler om å måle bedre, ikke bare om å flytte penger.",
          "Du nevner fortrengning eller skaleringsgrense for lønnstilskudd, i stedet for å anta at effekten holder ved dobbelt volum.",
        ],
        felle: "Å anbefale at alt styres på effekt per krone. Da legger du ned det eneste tiltaket for dem som står lengst unna, og du gir samtidig leverandørene en grunn til å velge de letteste deltakerne — som over tid ødelegger nettopp den målingen du bygget anbefalingen på.",
      },
      {
        art: "syntese",
        sek: 90,
        kort: "Anbefaling",
        tittel: "Anbefalingen",
        sp: `<p>Fylkesdirektøren skal inn i fylkesutvalget om <b>ett minutt</b> og trenger én setning å åpne med,
          og tre å forsvare den med.</p>
          <p class="tiny">Skriv den slik du ville sagt den — ikke som notater.</p>`,
        fasit: `<p>Svaret først. I offentlig sektor betyr det også: si hvilket mål svaret er målt mot.</p>
          <blockquote><p><b>«Dere bruker 300 millioner og får drøyt 620 mennesker i arbeid som ellers ikke ville
          vært det. Jeg vil ikke kutte noe — jeg vil flytte 20 millioner, og jeg vil at 91 av de 300 skal styres
          etter et annet mål enn resten.»</b></p>
          <p>Tre grunner. For det første er det digitale jobbsøkerkurset uten målbar effekt: 51 prosent i jobb
          mot 50 i den sammenlignbare gruppen. Det er 40 mennesker for 20 millioner, altså 500 000 kroner per
          person — mer enn en årslønn — og de 40 er innenfor feilmarginen. For det andre gir lønnstilskudd og
          ekstern oppfølging samme resultat for 300 000. Flytter jeg kursets 20 millioner til lønnstilskudd,
          kjøper jeg 333 plasser og 67 ekstra i jobb i stedet for 40.</p>
          <p>For det tredje: arbeidsforberedende trening er det dyreste tiltaket per ekstra person,
          933 000 kroner, og jeg foreslår likevel ikke å røre det. Det er det eneste tiltaket som når mennesker
          der alternativet er 11 prosent i jobb. Det hører hjemme i en egen pott med sitt eget mål, ikke i
          samme rangering som de andre.</p>
          <p>Risikoen er at lønnstilskudd ikke skalerer: 333 nye plasser krever 333 arbeidsgivere, og de 20
          prosentpoengene er målt på dagens volum. Jeg ville derfor flyttet halvparten først og målt før jeg
          flyttet resten. Neste steg er å få sammenligningsgruppe inn i alle leverandørkontraktene, slik at
          dere kan gjøre dette regnestykket hvert år i stedet for hvert femte.»</p></blockquote>
          <p><b>Sterkt mot middels:</b> et middels svar sier hvilket tiltak som er best og hvilket som er verst.
          Et sterkt svar sier hvor mange mennesker de 300 millionene faktisk flytter, foreslår én konkret
          omdisponering med tall, og forsvarer eksplisitt hvorfor det dyreste tiltaket likevel skal stå — fordi
          det måles mot et annet mål.</p>`,
        krav: [
          "Første setning sier hva de 300 millionene gir i dag, målt som ekstra personer i arbeid.",
          "Du foreslår én konkret omdisponering med beløp og antall mennesker.",
          "Du forsvarer eksplisitt hvorfor det dyreste tiltaket ikke skal legges ned.",
          "Du nevner skaleringsrisikoen for lønnstilskudd i stedet for å anta lineær effekt.",
          "Du avslutter med ett neste steg som gjør neste års analyse mulig.",
        ],
        felle: "Å avslutte med at «det trengs mer forskning». Det er sant og ubrukelig. Fylkesutvalget skal vedta et budsjett i denne perioden, og en anbefaling uten et tall å vedta er ingen anbefaling.",
      },
    ],
  },
  {
    id: "prising-padel",
    label: "Padelhallen med én pris til alle",
    type: "Prising",
    nivå: "Avansert",
    firma: "Generisk",
    stil: "interviewer-led",
    minutter: 35,
    ch: [],
    blurb: "Kveldene er utsolgt, dagene er tomme, og prisen er den samme. Trener prisstruktur mot prisnivå, og innsikten om at utsolgt betyr for billig.",
    prompt: `<p>Klienten er <b>Rally Padel</b>, som driver fem padelhaller i norske byer med til
      sammen <b>40 baner</b>. Hallene er åpne fra 07 til 23 alle dager.</p>
      <p>Prisen er <b>400 kroner per bane per time</b> — samme pris hele døgnet, alle ukedager,
      for alle kunder. Daglig leder er stolt av det: «Det er enkelt og rettferdig, og ingen
      trenger å regne.» Omsetningen er 48 millioner kroner og har stått stille i to år.
      Driftsresultatet er 7 millioner.</p>
      <p>Styret vil sette prisen opp til 450 kroner, fordi hallene er billigere enn konkurrentene.
      <b>Er det riktig grep?</b></p>`,
    bakgrunn: `<p>Casen er konstruert, men feilen er blant de vanligste i norsk tjenestenæring:
      selskapet diskuterer <i>prisnivået</i> når problemet er <i>prisstrukturen</i>. Én pris til
      alle er en påstand om at alle kunder er like — og i en anleggsbransje er de aldri det.
      Han som må spille etter jobb klokken 19 på en tirsdag, og hun som kan spille klokken 11 på
      en onsdag, har helt ulik betalingsvilje for nøyaktig samme bane.</p>
      <p>Den underliggende ferdigheten er å lese <b>utnyttelsesgrad som et prissignal</b>. Et
      tidsvindu som er utsolgt uker i forveien, er ikke en suksess — det er rasjonering, og køen
      er penger noen andre ville betalt. Et tidsvindu som står tomt, er ikke en kapasitetsfeil —
      det er en pris som er satt for høyt for det som skal selges der.</p>
      <p>Casen har også den vrien som gjør prisstruktur mer verdt enn prisnivå: <b>en banetime som
      går usolgt, er tapt for alltid.</b> Marginalkostnaden ved å selge den er nesten null. Derfor
      henter en struktur som fyller de tomme timene inn mer enn en prisøkning som tømmer de
      fulle.</p>`,
    trinn: [
      {
        art: "oppklaring",
        kort: "Avklaring",
        sek: 90,
        tittel: "Hva vil du vite før du begynner?",
        sp: `<p>Intervjueren har gitt deg prompten og venter. <b>Hvilke spørsmål stiller du før du
          strukturerer?</b></p>`,
        fasit: `<p>I en prisingscase er den ene avklaringen som alltid må komme først:
          <b>hva er målet?</b> Deretter, og spesifikt for et anlegg med fast kapasitet:
          <b>hvordan fordeler salget seg over tid?</b></p>
          <ul>
            <li><b>Er målet omsetning, resultat eller belegg?</b> De tre gir ulike svar. Med nesten
              null marginalkostnad per banetime er omsetning og dekningsbidrag nesten det samme
              her — men belegg er ikke det, og et anlegg som styrer etter belegg, priser seg
              systematisk for lavt.</li>
            <li><b>Hvordan fordeler de solgte banetimene seg over uken og døgnet?</b> Dette er det
              avgjørende spørsmålet. Et snittbelegg forteller ingenting hvis kveldene er fulle og
              dagene tomme.</li>
            <li><b>Hvem er kundene, og booker de fast eller sporadisk?</b> Faste partier på samme
              tid hver uke er et helt annet produkt enn en enkelttime, og kan prises som det.</li>
            <li><b>Hvor mye koster en solgt banetime oss?</b> Er marginalkostnaden nær null, er
              hver tomme time et rent tap, og det endrer hele regnestykket.</li>
            <li><b>Hva er kapasiteten?</b> 40 baner ganger 16 timer ganger 7 dager er 4 480
              banetimer i uken. Å regne det selv, uoppfordret, viser at du forstår at dette er en
              kapasitetsforretning.</li>
          </ul>
          <p><b>Hva skiller dette fra et middels svar?</b> Et middels svar spør hva konkurrentene
          tar, fordi styret nevnte det. <b>Et sterkt svar spør etter fordelingen over tid før det
          spør om noe annet</b> — fordi hvis fordelingen er skjev, er spørsmålet om prisnivå
          allerede feil stilt.</p>`,
        krav: [
          "Du spør om målet før du spør om tallene.",
          "Du ber om fordelingen av salget over uke og døgn, ikke bare et snittbelegg.",
          "Du regner ut kapasiteten selv fra baner, åpningstid og dager.",
          "Du spør om marginalkostnaden per banetime.",
          "Du sier hvorfor du spør, og hva svaret ville endre.",
        ],
        felle: "Å starte med konkurrentenes priser fordi styret gjorde det. Konkurrentprisen er relevant, men den forteller deg bare noe om nivået — og i denne casen er nivået omtrent riktig. Det er formen på prisen som er feil.",
      },
      {
        art: "struktur",
        kort: "Struktur",
        sek: 150,
        tittel: "Strukturer prisspørsmålet",
        sp: `<p>Intervjueren spør direkte: <b>«Hvordan vil du avgjøre om 450 kroner er riktig
          pris?»</b> Skriv strukturen, og si hva du tror svaret blir.</p>`,
        fasit: `<p>Det sterke svaret begynner med å <b>avvise premisset i spørsmålet</b>, høflig og
          med en gang: prisen har to dimensjoner, og styret diskuterer bare den ene.</p>
          <div class="formula">
            <div class="eq">Prisnivå = hvor høyt snittet ligger</div>
            <div class="eq">Prisstruktur = hvordan prisen varierer mellom kunder, tider og kjøpsformer</div>
            <div class="where">Med én pris til alle er strukturen ikke valgt — den er bare aldri
              stilt spørsmål ved. Og det er der pengene ligger.</div>
          </div>
          <p>Bygg så strukturen på de tre aksene en pris kan variere langs:</p>
          <ul>
            <li><b>Etter tid:</b> hverdagskveld mot formiddag mot helg. Betalingsviljen for en
              bane klokken 19 på tirsdag er en annen enn klokken 11 på onsdag, og kapasiteten er
              den samme.</li>
            <li><b>Etter kunde:</b> bedrift mot privat, medlem mot ikke-medlem, senior og student
              mot full pris. Det krever et gjerde som gjør at segmentene ikke lekker.</li>
            <li><b>Etter kjøpsform:</b> enkelttime mot klippekort mot fast bane hele sesongen mot
              månedskort. Dette er fastpris mot forbruk, og det avgjør hvem som binder seg.</li>
          </ul>
          <p>Og legg til målestokken som avgjør hvor prisen skal endres: <b>utnyttelsesgraden per
          tidsvindu</b>. Er den nær 100, er prisen for lav. Er den nær null, er den for høy. Det er
          et prissignal, ikke et driftstall.</p>
          <p><b>Hypotesen:</b> snittprisen er omtrent riktig, men den er feil fordelt. Kveldene er
          underpriset og dagene overpriset, og en flat økning til 450 vil gjøre det tomme enda
          tommere. Jeg vil se solgte banetimer og kapasitet per tidsvindu.</p>`,
        krav: [
          "Du skiller prisnivå fra prisstruktur eksplisitt, og sier at styret bare diskuterer nivået.",
          "Strukturen din har alle tre akser: tid, kunde og kjøpsform.",
          "Du tar med fastpris mot forbruk som en egen dimensjon, ikke bare rabatter.",
          "Du peker på utnyttelsesgrad per tidsvindu som målestokken som avgjør hvor prisen skal flyttes.",
          "Du avslutter med en hypotese som er testbar mot data du ber om.",
        ],
        felle: "Å svare på spørsmålet som ble stilt, og bare regne på om 450 gir mer enn 400. Da har du låst deg til én pris for alle før analysen har begynt, og hele gevinsten i casen er utenfor rammen du selv tegnet.",
      },
      {
        art: "exhibit",
        kort: "Utnyttelse",
        sek: 120,
        tittel: "Banetimene fordelt på tidsvindu",
        sp: `<p>Intervjueren gir deg to tabeller: dagens salg fordelt på tidsvindu, og hva
          markedsavdelingen anslår at etterspørselen ville vært ved tre ulike priser.
          <b>Hva ser du?</b></p>`,
        figur: `<table class="data">
            <tr><th>Tidsvindu (per uke)</th><th class="n">Banetimer</th><th class="n">Solgt i dag</th><th class="n">Utnyttelse</th><th class="n">Omsetning</th></tr>
            <tr><td>Hverdag dag, man–fre 07–16</td><td class="n">1 800</td><td class="n">360</td><td class="n">20 %</td><td class="n">144 000</td></tr>
            <tr><td>Hverdag kveld, man–fre 16–23</td><td class="n">1 400</td><td class="n">1 330</td><td class="n">95 %</td><td class="n">532 000</td></tr>
            <tr><td>Helg dag, lør–søn 07–16</td><td class="n">720</td><td class="n">540</td><td class="n">75 %</td><td class="n">216 000</td></tr>
            <tr><td>Helg kveld, lør–søn 16–23</td><td class="n">560</td><td class="n">280</td><td class="n">50 %</td><td class="n">112 000</td></tr>
            <tr><td><b>Sum</b></td><td class="n"><b>4 480</b></td><td class="n"><b>2 510</b></td><td class="n"><b>56 %</b></td><td class="n"><b>1 004 000</b></td></tr>
          </table>
          <p class="tiny">Omsetning i kroner per uke, ved dagens pris på 400 kroner per banetime. Hallene regner 48 driftsuker i året.</p>
          <table class="data">
            <tr><th>Anslått etterspørsel, banetimer per uke</th><th class="n">Kapasitet</th><th class="n">Ved 250 kr</th><th class="n">Ved 400 kr</th><th class="n">Ved 550 kr</th></tr>
            <tr><td>Hverdag dag</td><td class="n">1 800</td><td class="n">700</td><td class="n">360</td><td class="n">180</td></tr>
            <tr><td>Hverdag kveld</td><td class="n">1 400</td><td class="n">1 400</td><td class="n">1 330</td><td class="n">1 190</td></tr>
            <tr><td>Helg dag</td><td class="n">720</td><td class="n">720</td><td class="n">540</td><td class="n">380</td></tr>
            <tr><td>Helg kveld</td><td class="n">560</td><td class="n">480</td><td class="n">280</td><td class="n">150</td></tr>
          </table>
          <p class="tiny">Hverdag kveld og helg dag ved 250 kroner er begrenset av kapasiteten — etterspørselen er høyere enn tallet. Marginalkostnaden per solgte banetime er rundt 40 kroner i strøm og renhold.</p>`,
        fasit: `<p>Implikasjonen først, og den er én setning:</p>
          <p><i>«Dere har ikke ett prisproblem, dere har fire — og de peker i motsatt retning.
          Hverdagskvelden er utsolgt til 95 prosent, og hverdagsdagen står 80 prosent tom. Én pris
          kan ikke være riktig for begge.»</i></p>
          <ul>
            <li><b>95 prosent utnyttelse er ikke suksess, det er rasjonering.</b> Når et tidsvindu
              er fullt uker i forveien, betyr det at noen som ville betalt mer, ikke fikk plass —
              og at prisen er for lav. Å si dette høyt er markøren i casen.</li>
            <li><b>20 prosent på hverdagsdagen er ikke en kapasitetsfeil.</b> Banene finnes,
              lyset står på og husleien løper. Det er 1 440 tomme banetimer i uken med
              marginalkostnad 40 kroner, og prisen 400 er satt for høyt for det som skal selges
              der.</li>
            <li><b>Etterspørselstabellen viser at elastisiteten er helt ulik.</b> På hverdagskveld
              faller volumet bare 10 prosent når prisen stiger 38 prosent — nesten uelastisk. På
              hverdagsdagen dobler volumet seg nesten når prisen faller fra 400 til 250. Det er to
              forskjellige markeder i samme bygg.</li>
            <li><b>Styrets forslag går feil vei i tre av fire vinduer.</b> En flat økning tar mer
              betalt der det er fullt, men tømmer også de tre vinduene som allerede har ledig
              kapasitet.</li>
          </ul>
          <p><b>Hva skiller dette fra et middels svar?</b> Et middels svar sier at snittbelegget er
          56 prosent og at det er lavt, og foreslår markedsføring for å fylle hallene. Det er å
          lese snittet av to motsatte problemer. <b>Et sterkt svar sier at 95 prosent er et signal
          om for lav pris — ikke om suksess — og at de to ytterpunktene krever hver sin pris, ikke
          mer markedsføring.</b></p>`,
        krav: [
          "Du tolker 95 prosent utnyttelse som rasjonering og for lav pris, ikke som suksess.",
          "Du ser at snittbelegget på 56 prosent skjuler to motsatte problemer.",
          "Du leser elastisiteten ut av etterspørselstabellen og ser at den er ulik per vindu.",
          "Du sier at styrets flate økning går feil vei i vinduene som har ledig kapasitet.",
          "Du kobler den lave marginalkostnaden til hvorfor de tomme timene er så dyre å la stå.",
        ],
        felle: "Å behandle 56 prosent snittbelegg som tallet casen handler om. Snittet er gjennomsnittet av et vindu som er utsolgt og et som står tomt, og det finnes ikke ett tiltak som er riktig for begge.",
      },
      {
        art: "regne",
        kort: "Gevinsten",
        sek: 120,
        tittel: "Hva henter strukturen inn?",
        sp: `<p>Anta at Rally Padel setter <b>én pris per tidsvindu</b>, valgt blant de tre
          prispunktene i tabellen, og velger den som gir mest omsetning i hvert vindu.</p>
          <p><b>Hvor mye mer omsetning gir det per uke enn dagens ene pris på 400 kroner?</b></p>
          <p class="tiny">Si framgangsmåten høyt før du regner. Svar i kroner per uke.</p>`,
        svar: 161500,
        enhet: "kroner per uke",
        toleranse: 0.02,
        fasit: `<p>Regn omsetning for hvert prispunkt i hvert vindu, og velg det største per rad:</p>
          <div class="formula">
            <div class="eq">Hverdag dag:   250 × 700 = 175 000   ·   400 × 360 = 144 000   ·   550 × 180 = 99 000</div>
            <div class="eq">Hverdag kveld: 250 × 1 400 = 350 000   ·   400 × 1 330 = 532 000   ·   550 × 1 190 = 654 500</div>
            <div class="eq">Helg dag:      250 × 720 = 180 000   ·   400 × 540 = 216 000   ·   550 × 380 = 209 000</div>
            <div class="eq">Helg kveld:    250 × 480 = 120 000   ·   400 × 280 = 112 000   ·   550 × 150 = 82 500</div>
            <div class="eq">Beste per vindu: 175 000 + 654 500 + 216 000 + 120 000 = <b>1 165 500</b></div>
            <div class="eq">I dag: 1 004 000. Differanse: <b>161 500 kroner per uke</b></div>
            <div class="where">Over 48 driftsuker: 7,8 millioner kroner i året. Trekk fra
              marginalkostnaden på de 400 ekstra banetimene i uken — 400 × 40 × 48 er 0,8
              millioner — og du står igjen med <b>rundt 7 millioner i økt resultat</b>. Klienten
              tjener 7 millioner i dag. Strukturen dobler resultatet.</div>
          </div>
          <p><b>Og her ligger poenget som avgjør casen.</b> Regn ut snittprisen i den nye
          strukturen:</p>
          <div class="formula">
            <div class="eq">Nytt volum: 700 + 1 190 + 540 + 480 = 2 910 banetimer</div>
            <div class="eq">Snittpris: 1 165 500 / 2 910 = <b>400,52 kroner</b></div>
          </div>
          <p>Snittprisen er altså <b>praktisk talt uendret</b> — 400,52 mot 400,00. Hele gevinsten på
          16 prosent kommer fra formen på prisen, ikke fra nivået. Samtidig stiger utnyttelsen fra
          56 til 65 prosent: <b>klienten selger mer, tjener mer, og tar i snitt nøyaktig det samme
          som før.</b></p>
          <p>Sammenlign så med det styret foreslo. Den <i>beste mulige enkeltprisen</i> av de tre
          er 550, som gir 1 045 000 — bare 41 000 mer i uken, og med volumet ned fra 2 510 til
          1 900 banetimer. <b>Strukturen henter fire ganger så mye som det beste prisnivået, og
          gjør det uten å tømme hallene.</b></p>
          <p><b>Hva skiller dette fra et middels svar?</b> Et middels svar regner riktig og sier
          161 500 kroner i uken. <b>Et sterkt svar legger til at snittprisen ikke har flyttet seg,
          at det beste enkeltprisalternativet bare henter en fjerdedel, og at 654 500 fortsatt
          stiger med prisen på hverdagskveld — så 550 er trolig ikke toppen. Neste steg er å teste
          650 der, ikke å låse strukturen.</b></p>`,
        krav: [
          "Du regner omsetning per prispunkt per vindu, og velger maksimum per rad — ikke per kolonne.",
          "Du ser at ett av fire vinduer skal beholde dagens pris.",
          "Du regner ut snittprisen i den nye strukturen og ser at den er uendret.",
          "Du sammenligner med den beste mulige enkeltprisen, ikke bare med dagens.",
          "Du sier at 550 kroner på hverdagskveld trolig ikke er toppen, og at det bør testes videre.",
        ],
        felle: "Å velge prisen som fyller hallene mest. Setter du 250 kroner overalt, stiger utnyttelsen til 74 prosent og omsetningen faller til 825 000 — 18 prosent ned. Belegg er ikke målet; det er bare et signal om hvor prisen står feil.",
      },
      {
        art: "ide",
        kort: "Tiltak",
        sek: 120,
        tittel: "Hvordan bygges strukturen i praksis?",
        sp: `<p>Intervjueren spør: <b>«Fint. Hvordan ser den nye prislisten faktisk ut?»</b>
          List så mange grep du klarer på to minutter. Si oppdelingen din først.</p>`,
        liste: [
          "Innfør faste prisvinduer: lav pris 07–16 på hverdager, høy pris 16–23 på hverdager",
          "Selg månedskort som bare gjelder på dagtid, til en fast pris uavhengig av antall timer",
          "Lag klippekort på ti timer med rabatt, gyldig alle tider unntatt hverdagskveld",
          "Selg fast bane på fast tid hele sesongen på hverdagskveld, med påslag for garantien",
          "Tilby bedriftsavtaler med fast månedsbeløp for garantert banetid midt på dagen",
          "Sett opp formiddagspartier for seniorer og skiftarbeidere til fast lav pris",
          "Innfør medlemskap med årsavgift og lavere timepris, som skiller faste fra sporadiske spillere",
          "Prøv dynamisk prising der prisen følger belegget i sanntid, slik hoteller og flyselskap gjør",
          "Innfør avbestillingsfrist og gebyr for uteblitt booking, så rasjonerte kveldstimer ikke går tapt",
          "Selg dagtimer som pakke med instruktør, der betalingsviljen er høyere enn for bare banen",
          "Gi studentpris mot legitimasjon, men bare i vinduene som står tomme",
          "Lei ut hele hallen til firmaturneringer og arrangementer på lavtidspunkter",
          "Test 650 kroner på hverdagskveld i én hall før strukturen rulles ut i alle fem",
          "Rydd i gjerdene mellom segmentene, så en bedriftsavtale ikke kan brukes til å kjøpe kveldstimer billig",
        ],
        fasit: `<p>Si oppdelingen før du lister, og bruk de tre aksene fra strukturen din:
          <b>pris etter tid, pris etter kunde, pris etter kjøpsform.</b> Da får listen din en form
          intervjueren kan følge.</p>
          <p>Det viktigste å få med, og det som skiller, er <b>gjerdene</b>. En segmentert
          prisstruktur er verdiløs hvis kundene fritt kan velge det billigste segmentet. Et
          dagtidsmånedskort som også virker klokken 19, er bare en rabatt til dem som allerede
          betalte full pris. Nevn dette uoppfordret.</p>
          <p>Avslutt med å <b>prioritere</b>: prisvinduene først, fordi de alene henter det meste
          av de 7 millionene og kan innføres på en uke. Medlemskap og dynamisk prising er
          neste bølge.</p>`,
        krav: [
          "Du sier oppdelingen først, og den følger de tre aksene fra strukturtrinnet.",
          "Idéene dekker både tid, kundetype og kjøpsform — ikke bare rabatter på dagtid.",
          "Du tar opp gjerdene mellom segmentene uoppfordret.",
          "Minst ett grep tester prisen videre i stedet for å låse den.",
          "Du prioriterer til slutt, og begrunner rekkefølgen med effekt og gjennomføringstid.",
        ],
        felle: "Å foreslå en lang liste rabatter uten å si hvem som skal hindres i å bruke dem. Uten gjerder lekker de fulle kveldene ned i de billige segmentene, og en struktur som skulle hentet 7 millioner, ender som et priskutt.",
      },
      {
        art: "syntese",
        kort: "Anbefaling",
        sek: 90,
        tittel: "Anbefalingen",
        sp: `<p>Styrelederen har <b>ett minutt</b>, og han er den som foreslo 450 kroner.
          Gi anbefalingen din.</p>
          <p class="tiny">Skriv den slik du ville sagt den — ikke som notater.</p>`,
        fasit: `<p>Topp-ned, og med et klart svar på styrelederens eget forslag.</p>
          <blockquote><p><b>«Ikke sett prisen opp til 450. Sett fire priser i stedet for én. Det
          henter 7,8 millioner i året, mot under 2 millioner for den beste enkeltprisen som finnes —
          og det med en snittpris som er praktisk talt uendret, 400,52 mot 400 kroner.»</b></p>
          <p>Tre grunner. For det første er ikke nivået feil: en flat økning til 450 tar mer betalt
          der det allerede er fullt, men tømmer de tre vinduene som står halvtomme. For det andre
          er hverdagskvelden utsolgt til 95 prosent — det er ikke suksess, det er rasjonering, og
          der bør prisen opp til 550. For det tredje står hverdagsdagen 80 prosent tom med en
          marginalkostnad på 40 kroner; der bør prisen ned til 250, og volumet dobler seg nesten.</p>
          <p>Konkret: fire prisvinduer fra neste måned — 250 på hverdager før 16, 550 på hverdager
          etter 16, 400 i helgene på dagtid, 250 i helgene på kveldstid. Beskytt strukturen med
          gjerder, slik at et dagtidskort ikke kan brukes på tirsdag kveld. Etter det bygger dere
          medlemskap og faste sesongbaner oppå.</p>
          <p>Den store risikoen er at faste kunder opplever 550 som et løftebrudd, så
          kveldsøkningen bør fases inn og kobles til at de kan sikre seg fast bane hele sesongen.
          Neste steg jeg ville tatt, er å teste 650 på hverdagskveld i én hall — tallene deres
          tyder på at 550 ikke er toppen.»</p></blockquote>
          <p><b>Hva skiller dette fra et middels svar?</b> Et middels svar sier «nei til 450, dere
          bør heller ha ulike priser på ulike tider» og stopper der. Det er riktig retning uten
          pris. <b>Et sterkt svar oppgir de fire prisene, setter gevinsten opp mot styrelederens
          eget alternativ i kroner, og sier eksplisitt at snittprisen ikke endres — for det er den
          setningen som gjør at en styreleder som ville heve prisen, kan si ja uten å tape
          ansikt.</b></p>`,
        krav: [
          "Første setning svarer på styrelederens forslag, og gir alternativet.",
          "Du oppgir de faktiske prisene per vindu, ikke bare prinsippet.",
          "Du setter gevinsten opp mot den beste mulige enkeltprisen i kroner, ikke bare mot dagens.",
          "Du sier at snittprisen er uendret — det er argumentet som gjør forslaget spiselig.",
          "Du nevner risiko og neste steg, og holder deg innenfor ett minutt.",
        ],
        felle: "Å bruke minuttet på å forklare hvorfor styrelederen tar feil. Han har allerede foreslått noe offentlig, og en anbefaling som bare motsier ham, blir en diskusjon i stedet for en beslutning. Gi ham et bedre forslag med større tall.",
      },
    ],
  },
  {
    id: "lonn-mobel-segment",
    label: "Segmentet som taper penger — og som du ikke kan kutte",
    type: "Lønnsomhet",
    nivå: "Avansert",
    firma: "Generisk",
    stil: "interviewer-led",
    minutter: 35,
    ch: [],
    blurb: "Ett segment taper 30 millioner. Legger du det ned, taper du 30 millioner. Trener forskjellen på fordelte og unngåelige kostnader — den feilen som koster mest i virkelige beslutninger.",
    prompt: `<p>Klienten er <b>Vollan Møbel</b>, en møbelprodusent på Sunnmøre med egen fabrikk
      og tre salgskanaler: <b>forhandlere</b> (møbelkjedene), <b>egne butikker</b>, og
      <b>prosjekt og kontrakt</b> — møblering av hoteller, kontorbygg og offentlige bygg,
      som regel vunnet i anbud.</p>
      <p>I fjor omsatte selskapet for <b>900 millioner kroner</b> med et driftsresultat på
      <b>30 millioner</b>, altså 3,3 prosent. Bransjesnittet for norske møbelprodusenter
      ligger rundt <b>7 prosent</b>. Omsetningen har vokst jevnt i flere år.</p>
      <p>Eierne, tredje generasjon i familien, spør: <b>hvorfor ligger vi under bransjen, og
      hva skal vi gjøre med det?</b></p>
      <p class="tiny">Dette er en interviewer-led case. Intervjueren gir deg tall når du ber
      om dem, og stiller ett spørsmål av gangen.</p>`,
    bakgrunn: `<p>Casen er konstruert, men både mekanismen og fella er hentet rett fra
      virkeligheten. Når et selskap ligger under bransjen på margin, er svaret nesten alltid
      at <b>snittet skjuler et sprik</b> — én kanal, ett produkt eller én geografi som ligger
      langt under de andre. Segmenteringen er ikke et skritt på veien til svaret; den
      <i>er</i> svaret.</p>
      <p>Så kommer fella, og den er dyr. Et segmentregnskap fordeler alltid felleskostnadene
      ut på segmentene, fordi regnskapet skal gå opp. Men <b>en fordelt kostnad er ikke en
      unngåelig kostnad</b>. Fabrikkbygget, maskinene, ledelsen og systemene forsvinner ikke
      fordi en salgskanal legges ned — de blir liggende og må bæres av de som er igjen.</p>
      <p>Derfor har et segmentregnskap med full kostnadsfordeling en innebygd egenskap:
      <b>det får ethvert lavmarginsegment til å se ut som en pengesluk</b>. Spørsmålet et
      slikt regnskap svarer på, er «hvordan fordeler resultatet seg?». Spørsmålet eierne
      stiller, er «hva skjer hvis vi slutter?». Det er to forskjellige regnestykker, og
      forskjellen mellom dem er hele denne casen.</p>`,
    trinn: [
      {
        art: "oppklaring",
        sek: 90,
        tittel: "Intervjueren åpner",
        sp: `<p>Intervjueren sier: <i>«Du har omsetningen, resultatet og bransjesnittet.
          Hva vil du vite før du begynner å tenke?»</i></p>`,
        fasit: `<p>Ett spørsmål før alle andre, og det er nesten alltid det samme når et snitt
          ligger under bransjen:</p>
          <p><b>«Kan jeg få resultatet brutt ned per salgskanal — omsetning, variable
          kostnader og faste kostnader hver for seg?»</b></p>
          <p>Begrunnelsen er verdt å si høyt: <i>et konsernresultat på 3,3 prosent kan bety at
          alt er middelmådig, eller at to av tre deler er glimrende og den tredje blør. De to
          krever helt motsatte tiltak, og jeg kan ikke skille dem uten nedbrytningen.</i></p>
          <p>Deretter tre til, valgt fordi de kommer til å bestemme hva anbefalingen kan
          inneholde:</p>
          <ul>
            <li><b>«Hvor mye ledig kapasitet har fabrikken?»</b> Dette avgjør alt senere. Er
              fabrikken full, er ethvert lavmarginsegment en fortrengning av noe bedre. Er den
              ikke full, er det motsatt: lavmarginvolum er bedre enn ingenting.</li>
            <li><b>«Hvordan er felleskostnadene fordelt mellom kanalene?»</b> Fordelingsnøkkelen
              er ikke en naturlov, den er et valg noen har tatt — og den bestemmer hvilket
              segment som ser lønnsomt ut.</li>
            <li><b>«Er de 7 prosentene i bransjen målt på sammenlignbare selskaper?»</b> En
              produsent som selger direkte gjennom egne butikker, har både høyere margin og
              høyere kostnader enn en ren fabrikk. Sammenligningen kan være skjev.</li>
          </ul>
          <p><b>Sterkt mot middels:</b> et middels svar ber om nedbrytningen. Et sterkt svar
          ber om nedbrytningen <i>og</i> spør om kapasitetsutnyttelsen i samme åndedrag, fordi
          det allerede vet at svaret på det andre spørsmålet bestemmer hva man kan gjøre med
          funnet fra det første.</p>`,
        krav: [
          "Du ber om resultatet brutt ned per salgskanal, og sier hvorfor snittet ikke kan tolkes.",
          "Du spør om fabrikkens kapasitetsutnyttelse, og sier hva svaret vil bety for anbefalingen.",
          "Du spør hvordan felleskostnadene er fordelt, ikke bare hvor store de er.",
          "Du utfordrer om bransjesnittet er sammenlignbart med klientens forretningsmodell.",
          "Du ber om variable og faste kostnader hver for seg, ikke bare et segmentresultat.",
        ],
        felle: "Å be om et segmentresultat per kanal uten å be om kostnadene delt i variable og faste. Da får du et tall du ikke kan bruke til noen beslutning — bare til å peke på en skyldig.",
      },
      {
        art: "struktur",
        sek: 150,
        tittel: "Intervjueren ber om regnestykket",
        sp: `<p>Intervjueren sier: <i>«Skriv opp hvordan du vil sette sammen konsernresultatet
          fra kanalene. Vær presis på nivåene.»</i></p>`,
        fasit: `<p>Tre nivåer, og det er hele poenget at de er tre og ikke to:</p>
          <div class="formula">
            <div class="eq">Driftsresultat = Σᵢ (Omsetningᵢ − Variable kostnaderᵢ) − Σᵢ Direkte faste kostnaderᵢ − Felleskostnader</div>
            <div class="where">Nivå 1: dekningsbidrag per kanal · Nivå 2: faste kostnader som bare finnes fordi kanalen finnes · Nivå 3: kostnader som finnes uansett</div>
          </div>
          <p>Si hva som hører hjemme hvor, med klientens egne poster:</p>
          <ul>
            <li><b>Variable kostnader:</b> materialer, direkte lønn i produksjonen, frakt,
              provisjon. Følger hver enkelt enhet.</li>
            <li><b>Direkte faste kostnader:</b> butikkleie og butikkbemanning for egne
              butikker, anbudsavdeling og prosjektledere for kontraktsmarkedet, key
              account-apparatet mot kjedene. Forsvinner hvis kanalen forsvinner.</li>
            <li><b>Felleskostnader:</b> fabrikkbygg, maskiner, produksjonsledelse,
              administrasjon, systemer. Finnes uansett hvem som kjøper møblene.</li>
          </ul>
          <p><b>Og si den avgjørende setningen nå, ikke senere:</b> <i>«Nivå tre er ikke en
          segmentkostnad. Den kan fordeles, men den kan ikke tilskrives. Hvis vi senere skal
          vurdere å legge ned noe, er det bare nivå én og to som er relevante — pluss den lille
          delen av nivå tre som faktisk lar seg ta bort.»</i></p>
          <p><b>Hypotesen:</b> med tre kanaler som selger samme produkt til svært ulike kunder,
          ligger spriket mellom kanalene, ikke i kostnadsbasen. Kontraktsmarkedet vinnes i
          anbud, og anbud vinnes på pris — så jeg forventer å finne den laveste dekningsgraden
          der.</p>
          <p><b>Sterkt mot middels:</b> et middels svar setter opp to nivåer — omsetning minus
          kostnader per segment. Et sterkt svar insisterer på tre, og forklarer <i>før det har
          sett tallene</i> hvorfor det tredje nivået ikke kan brukes i en nedleggelsesbeslutning.
          Da er du immun mot fella som kommer om to trinn.</p>`,
        krav: [
          "Du setter opp tre nivåer: dekningsbidrag, direkte faste kostnader og felleskostnader.",
          "Du plasserer klientens egne kostnadsposter på riktig nivå, ikke bare generiske kategorier.",
          "Du sier at fordelte felleskostnader ikke kan brukes i en nedleggelsesbeslutning, før du har sett tallene.",
          "Du avslutter med en hypotese om hvilken kanal som ligger lavest, og hvorfor.",
          "Nivåene overlapper ikke, og til sammen dekker de hele driftsresultatet.",
        ],
        felle: "Å slå direkte faste kostnader og felleskostnader sammen til «faste kostnader». Det er akkurat den sammenslåingen som gjør at et segmentregnskap ser ut som en beslutningsmodell, og det er den dyreste forenklingen i hele lønnsomhetsanalysen.",
      },
      {
        art: "exhibit",
        sek: 180,
        tittel: "Segmentregnskapet",
        kort: "Kanalene",
        sp: `<p>Intervjueren legger fram controllerens segmentregnskap og et ark om
          produksjonen. <i>«Vær så god. Hva ser du?»</i></p>`,
        figur: `<table class="data">
            <tr><th>Millioner kroner</th><th class="n">Forhandlere</th><th class="n">Egne butikker</th><th class="n">Prosjekt og kontrakt</th><th class="n">Sum</th></tr>
            <tr><td>Omsetning</td><td class="n">450</td><td class="n">150</td><td class="n">300</td><td class="n">900</td></tr>
            <tr><td>Variable kostnader</td><td class="n">297</td><td class="n">78</td><td class="n">234</td><td class="n">609</td></tr>
            <tr><td><b>Dekningsbidrag</b></td><td class="n"><b>153</b></td><td class="n"><b>72</b></td><td class="n"><b>66</b></td><td class="n"><b>291</b></td></tr>
            <tr><td>Dekningsgrad</td><td class="n">34,0 %</td><td class="n">48,0 %</td><td class="n">22,0 %</td><td class="n">32,3 %</td></tr>
            <tr><td>Direkte faste kostnader</td><td class="n">15</td><td class="n">30</td><td class="n">16</td><td class="n">61</td></tr>
            <tr><td>Fordelte felleskostnader</td><td class="n">90</td><td class="n">30</td><td class="n">80</td><td class="n">200</td></tr>
            <tr><td><b>Segmentresultat</b></td><td class="n"><b>48</b></td><td class="n"><b>12</b></td><td class="n"><b>−30</b></td><td class="n"><b>30</b></td></tr>
          </table>
          <table class="data">
            <tr><th>Produksjon</th><th class="n">Forhandlere</th><th class="n">Egne butikker</th><th class="n">Prosjekt og kontrakt</th><th class="n">Sum</th></tr>
            <tr><td>Produserte enheter</td><td class="n">90 000</td><td class="n">30 000</td><td class="n">80 000</td><td class="n">200 000</td></tr>
            <tr><td>Andel av fabrikkvolum</td><td class="n">45 %</td><td class="n">15 %</td><td class="n">40 %</td><td class="n">100 %</td></tr>
            <tr><td>Snittpris per enhet</td><td class="n">5 000 kr</td><td class="n">5 000 kr</td><td class="n">3 750 kr</td><td class="n">4 500 kr</td></tr>
            <tr><td>Fabrikkens kapasitet</td><td class="n"></td><td class="n"></td><td class="n"></td><td class="n">250 000</td></tr>
            <tr><td>Kapasitetsutnyttelse</td><td class="n"></td><td class="n"></td><td class="n"></td><td class="n">80 %</td></tr>
          </table>
          <p class="tiny">Felleskostnadene er fordelt etter produserte enheter.</p>`,
        fasit: `<p>Overskriften først, og den skal binde de to tabellene sammen:</p>
          <p><i>«Prosjekt og kontrakt er en tredjedel av omsetningen, men leverer bare 23
          prosent av dekningsbidraget — og bruker 40 prosent av fabrikken. Hele gapet mot
          bransjen ligger i den ene kanalen.»</i></p>
          <p>Regn de to tallene som forklarer hvorfor, og gjør det per enhet — det er der
          fabrikkøkonomien blir synlig:</p>
          <ul>
            <li><b>Dekningsbidrag per produsert enhet:</b> Forhandlere 153 / 90 000 =
              <b>1 700 kr</b>. Egne butikker 72 / 30 000 = <b>2 400 kr</b>. Prosjekt
              66 / 80 000 = <b>825 kr</b>.</li>
            <li><b>Felleskostnad per enhet:</b> 200 millioner / 200 000 = <b>1 000 kr</b>.
              Prosjekt dekker altså 825 av en fordelt kostnad på 1 000. <i>Det er nøyaktig
              derfor segmentet viser minus.</i></li>
          </ul>
          <p>Og se hvorfor: prosjektmøbler selges til <b>3 750 kroner per enhet mot 5 000 i de
          andre kanalene</b> — 25 prosent lavere — for enheter som beslaglegger like mye
          fabrikk. Kombinert med en dekningsgrad på 22 mot 34 og 48 prosent, betyr det at
          prosjekt både prises lavere <i>og</i> koster mer å lage. Det er signaturen til
          spesialtilpasning solgt i anbud.</p>
          <p><b>Men stopp før du konkluderer, og si hvorfor du stopper.</b> Det åpenbare
          neste steget ser ut til å være «legg ned prosjekt, så tjener dere 60 millioner».
          Det spørsmålet kan ikke besvares fra denne tabellen, og en sterk kandidat sier det
          rett ut: <i>«Før jeg vurderer nedleggelse må jeg vite hvor mye av de 80 millionene i
          fordelte felleskostnader som faktisk forsvinner. Fabrikkbygget forsvinner ikke.»</i></p>
          <p>Legg også merke til to ting som peker motsatt vei av nedleggelse. <b>Prosjekt
          bidrar med 66 − 16 = 50 millioner</b> etter sine egne direkte kostnader — det er ekte
          penger inn i fabrikken. Og <b>fabrikken går på 80 prosent</b>: det er ikke kapasitet
          det er knapphet på, det er etterspørsel.</p>
          <p><b>Sterkt mot middels:</b> et middels svar leser segmentresultatet på −30 og
          foreslår å kutte. Et sterkt svar leser de samme tallene, ser at konklusjonen ligger
          og lokker, og nekter å ta den før fordelingsnøkkelen er skilt fra virkeligheten.</p>`,
        krav: [
          "Du kobler de to tabellene: 33 prosent av omsetningen, 23 prosent av dekningsbidraget, 40 prosent av fabrikken.",
          "Du regner dekningsbidrag per produsert enhet for alle tre kanalene.",
          "Du ser at prosjekt prises 25 prosent lavere per enhet, og kobler det til anbudsmodellen.",
          "Du nekter å konkludere om nedleggelse før du vet hvor mye av felleskostnaden som er unngåelig.",
          "Du merker deg at fabrikken går på 80 prosent, og sier hva det betyr.",
        ],
        felle: "Å behandle raden «fordelte felleskostnader» som en kostnad prosjektsegmentet påfører selskapet. Den raden er en fordelingsnøkkel valgt av en controller. Bytt nøkkel fra enheter til omsetning, og prosjektsegmentet går fra minus 30 til minus 13 uten at én eneste krone har flyttet seg i virkeligheten.",
      },
      {
        art: "regne",
        sek: 150,
        tittel: "Hva skjer hvis dere legger ned prosjekt?",
        kort: "Uten prosjekt",
        sp: `<p>Intervjueren sier: <i>«Godt spørsmål. Her er svaret: legger dere ned
          prosjektsegmentet ved neste årsskifte, forsvinner de 16 millionene i direkte faste
          kostnader. Av de 80 millionene i fordelte felleskostnader klarer vi å ta bort 20 —
          én produksjonslinje og fire årsverk. Resten er fabrikkbygg, maskiner,
          produksjonsledelse og systemer, og de blir liggende.»</i></p>
          <p><b>Hvor mye faller konsernets driftsresultat, i millioner kroner?</b></p>`,
        svar: 30,
        enhet: "millioner kroner",
        toleranse: 0.02,
        fasit: `<p>Bare tre linjer, og de må være de riktige tre:</p>
          <div class="formula">
            <div class="eq">Tapt dekningsbidrag: <b>−66</b></div>
            <div class="eq">Spart direkte faste kostnader: <b>+16</b></div>
            <div class="eq">Spart felleskostnader, det som faktisk forsvinner: <b>+20</b></div>
            <div class="eq">Netto: −66 + 16 + 20 = <b>−30 millioner</b></div>
          </div>
          <p>Kontrollregn det andre veien, direkte på det som blir igjen:</p>
          <div class="formula">
            <div class="eq">153 + 72 (dekningsbidrag) − 15 − 30 (direkte faste) − 180 (gjenværende felles)</div>
            <div class="eq">= 225 − 225 = <b>0</b></div>
          </div>
          <p><b>Og der er casen.</b> Segmentet «taper» 30 millioner. Legger dere det ned, taper
          dere 30 millioner. Konsernet går fra 30 millioner i pluss til <b>null</b> — fra 3,3
          prosent margin til ingenting.</p>
          <p>Se hva som skjedde med de andre: <b>felleskostnaden per enhet går fra 1 000 til
          1 500 kroner</b> (180 millioner delt på 120 000 enheter). Forhandlere og egne
          butikker får femti prosent mer overhead på hver eneste stol, uten at de har gjort
          noe galt. De 30 millionene som sto som tap på prosjekt, var aldri et tap — det var en
          fordeling.</p>
          <p><b>Regelen, sagt generelt:</b> et segment skal måles på <i>hva som forsvinner
          hvis det forsvinner</i> — dekningsbidrag minus unngåelige kostnader. På det målet
          bidrar prosjekt med 66 − 16 − 20 = <b>+30 millioner i året</b> til å bære fabrikken.
          Segmentregnskapet sa minus 30. Beslutningsregnskapet sier pluss 30. Samme tall,
          motsatt fortegn, og forskjellen er utelukkende fordelingsnøkkelen.</p>
          <p><b>Sterkt mot middels:</b> et middels svar regner riktig og stopper ved 30. Et
          sterkt svar sier <i>betingelsen som ville snudd konklusjonen</i>: hvis de 80 000
          frigjorte enhetene kunne selges gjennom forhandlerkanalen til 1 700 kroner i
          dekningsbidrag, ville det vært 136 millioner, og nedleggelse ville vært åpenbart
          riktig. Men fabrikken går på 80 prosent — de har allerede ledig kapasitet og selger
          den ikke. Det er ikke plass det mangler, det er etterspørsel. <b>Alternativkostnaden
          ved prosjektvolumet er derfor null, og da er 825 kroner per enhet 825 kroner mer enn
          en tom maskin gir.</b></p>`,
        krav: [
          "Du bruker bare unngåelige kostnader i regnestykket, ikke de fordelte.",
          "Du kontrollregner andre veien på det som blir igjen, og får null.",
          "Du sier hva som skjer med felleskostnad per enhet for de gjenværende kanalene.",
          "Du formulerer regelen generelt: dekningsbidrag minus unngåelige kostnader.",
          "Du navngir betingelsen som ville snudd svaret, og avviser den med kapasitetstallet.",
        ],
        felle: "Å legge segmentets underskudd rett til konsernresultatet: 30 pluss 30 er 60. Det forutsetter at hver krone fordelt felleskostnad forsvinner sammen med segmentet. Fabrikkbygget legges ikke ned fordi anbudsavdelingen gjør det, og denne feilen er den vanligste dyre feilen i virkelige styrerom.",
      },
      {
        art: "ide",
        sek: 120,
        tittel: "Hva bør klienten gjøre i stedet?",
        sp: `<p>Intervjueren sier: <i>«Enig, vi legger det ikke ned. Hva gjør vi da?»</i>
          <b>List tiltakene, én per linje, to minutter.</b></p>`,
        liste: [
          "Innføre et gulv for dekningsbidrag per enhet i anbud, og la avdelingen si nei under gulvet",
          "Standardisere prosjektsortimentet: færre spesialtilpasninger, flere hyllevarer i prosjektfarger",
          "Prise spesialtilpasning separat i stedet for å legge den inn i enhetsprisen",
          "Måle og styre prosjekt på dekningsbidrag per fabrikktime, ikke på omsetning",
          "Bytte fordelingsnøkkel eller slutte å fordele felleskostnader i segmentrapporteringen",
          "Gå etter prosjekter med gjenkjøp og påfyll, der marginen ligger i ettermarkedet",
          "Selge de siste 20 prosentene av fabrikkapasiteten før noe som helst kuttes",
          "Bygge lengre rammeavtaler med hotellkjeder, som gir volum uten anbudspress hver gang",
          "Øke andelen egne butikker, der dekningsbidraget per enhet er 2 400 kroner",
          "Redusere variable kostnader i prosjekt gjennom serielengde og felles komponenter",
          "Bruke prosjektvolum bevisst som lastutjevning i lavsesong, og prise det deretter",
          "Gå gjennom anbudsporteføljen og avslutte de kontraktene som ligger under gulvet ved fornyelse",
          "Vurdere eksport av forhandlervolum for å fylle fabrikken med høyere dekningsbidrag",
        ],
        fasit: `<p>Del i tre og si delingen først: <b>få mer betalt</b>, <b>bruke mindre
          fabrikk per krone</b>, og <b>fylle den ledige kapasiteten med noe bedre</b>.</p>
          <p>Prioriter så, og la analysen bestemme. Prosjekt må løfte dekningsbidraget fra 825
          til 1 000 kroner per enhet for å bære sin fordelte andel. Det kan skje på to måter,
          og de er <i>ikke</i> like realistiske:</p>
          <ul>
            <li><b>Prisen opp 4,7 prosent</b> — 175 kroner på en pris på 3 750. I et marked
              der kontraktene vinnes i anbud, betyr det som regel at volumet forsvinner.</li>
            <li><b>Variable kostnader ned 6 prosent</b> — 175 kroner av en variabel kostnad på
              2 925 kroner per enhet. Det er nøyaktig samme beløp per enhet, 14 millioner
              i året, og det er fullt oppnåelig gjennom standardisering og serielengde.</li>
          </ul>
          <p>Samme kroner, helt ulik gjennomførbarhet. <b>Å si det er hele forskjellen på en
          idéliste og en anbefaling.</b></p>`,
        krav: [
          "Du sier oppdelingen din før du lister.",
          "Idéene treffer både prisen, kostnaden per enhet og kapasitetsutnyttelsen.",
          "Minst én idé angriper styringen selv — gulv for dekningsbidrag eller endret fordelingsnøkkel.",
          "Du prioriterer til slutt og sammenligner prisveien med kostnadsveien.",
          "Du sier hvorfor kostnadsveien er mer realistisk enn prisveien i et anbudsmarked.",
        ],
        felle: "Å foreslå at prosjektvolum erstattes av forhandlervolum. Fabrikken går på 80 prosent — hvis det fantes forhandleretterspørsel å ta, ville den allerede vært tatt. Tiltaket forutsetter et problem klienten ikke har.",
      },
      {
        art: "syntese",
        sek: 120,
        tittel: "Anbefalingen",
        sp: `<p>Intervjueren sier: <i>«Familien sitter samlet i styrerommet, og de har allerede
          bestemt seg for å legge ned prosjekt. Du har ett minutt.»</i></p>`,
        fasit: `<p>Svaret først, og det må rive ned beslutningen de allerede har tatt — med et
          tall, ikke med et forbehold.</p>
          <blockquote><p><b>«Ikke legg ned prosjekt. Segmentet ser ut til å tape 30 millioner,
          men legger dere det ned, faller konsernresultatet fra 30 millioner til null.»</b></p>
          <p>Grunnen er at de 80 millionene som er belastet prosjekt, er fordelte
          felleskostnader, ikke unngåelige. Bare 20 av dem forsvinner med segmentet. Resten er
          fabrikk, maskiner og ledelse, og de blir liggende og må bæres av de to andre
          kanalene — felleskostnaden per enhet går fra 1 000 til 1 500 kroner. Målt på det
          eneste som betyr noe i en slik beslutning, dekningsbidrag minus unngåelige kostnader,
          <b>bidrar prosjekt med pluss 30 millioner i året</b> til å bære fabrikken. Og
          fabrikken går på 80 prosent, så det er ingen bedre bruk av kapasiteten som står og
          venter.</p>
          <p>Men dere har et ekte problem, og det er ikke at prosjekt finnes — det er at
          prosjekt gir 825 kroner i dekningsbidrag per enhet mot 1 700 og 2 400 i de andre
          kanalene, på enheter som bruker like mye fabrikk. Der ligger hele gapet mot
          bransjens 7 prosent.</p>
          <p>Konkret anbefaler jeg to ting. Sett et gulv for dekningsbidrag per enhet i anbud,
          og gi avdelingen lov til å si nei under gulvet. Og ta variable kostnader i prosjekt
          ned 6 prosent gjennom standardisering — det er 175 kroner per enhet, 14 millioner i
          året, og nøyaktig samme beløp som en prisøkning på knapt 5 prosent ville gitt, men
          uten å miste volumet.</p>
          <p>Den store risikoen er at et gulv koster dere volum på kort sikt, og at fabrikken
          da går fra 80 prosent og nedover. Neste steg jeg ville tatt, er å gå gjennom
          anbudsporteføljen kontrakt for kontrakt og se hvor mange som faktisk ligger under
          gulvet — det avgjør om dette er en justering eller en omstilling.»</p></blockquote>`,
        krav: [
          "Første setning avviser beslutningen familien har tatt, og gjør det med et tall.",
          "Du forklarer forskjellen på fordelte og unngåelige kostnader uten å bruke fagsjargong.",
          "Du sier hva det ekte problemet er: 825 kroner mot 1 700 og 2 400 per enhet.",
          "Du gir to konkrete tiltak, ikke bare en avvisning av nedleggelsen.",
          "Du nevner risikoen ved et dekningsbidragsgulv og sier hva neste steg er.",
        ],
        felle: "Å vinne argumentet og glemme oppdraget. Eierne spurte hvorfor de ligger under bransjen. Svarer du bare at nedleggelse er feil, har du reddet dem fra en dyr beslutning og latt dem stå igjen uten en eneste ting å gjøre på mandag.",
      },
    ],
  },
  {
    id: "turnaround-entreprenor",
    label: "Entreprenøren som har tre måneder igjen",
    type: "Turnaround",
    nivå: "Avansert",
    firma: "Generisk",
    stil: "candidate-led",
    minutter: 40,
    ch: [],
    blurb: "Selskapet taper penger og har dårlig tid. Trener den ene rekkefølgen som avgjør en turnaround: stopp blødningen, diagnostiser, og skill det som virker på uker fra det som virker på år.",
    prompt: `<p>Klienten er <b>Løvaas Entreprenør</b>, en familieeid byggentreprenør på Østlandet med
      1 800 millioner kroner i omsetning og 620 ansatte. I fjor tapte selskapet <b>145 millioner</b> på driften.</p>
      <p>Banken har varslet at trekkrettigheten på 250 millioner <b>ikke fornyes automatisk</b> når den
      forfaller om fire måneder, og at den vil se en troverdig plan først. Egenkapitalandelen er nede i
      14 prosent mot et lånevilkår på 20.</p>
      <p>Styret stiller deg ett spørsmål, som egentlig er to: <b>Hva gjør vi de neste tre månedene, og
      finnes selskapet om tre år?</b></p>`,
    bakgrunn: `<p>Casen er konstruert, men mønsteret er det vanligste i norsk entreprenørbransje: selskaper
      går konkurs med full ordrereserve. Grunnen er at en entreprenør bygger ferdig lenge før den får betalt.
      Arbeid som er utført, men ikke fakturert, står i balansen som <i>opptjent, ikke fakturert produksjon</i>,
      og hver krone der er en krone som er betalt ut i lønn og materialer uten å ha kommet inn igjen.</p>
      <p>Derfor er turnaround en egen sjanger og ikke en lønnsomhetscase med hastverk. Resultatregnskapet
      sier hvor godt selskapet driver. Kontantstrømmen sier hvor lenge det får lov til å fortsette. En
      kandidat som starter med profitt-treet, svarer på feil spørsmål — og casen er bygget for å avsløre
      nøyaktig det.</p>`,
    trinn: [
      {
        art: "oppklaring",
        sek: 90,
        kort: "Spørsmål",
        tittel: "Hva må du vite først?",
        sp: `<p>Styret har gitt deg oppdraget. <b>Hva spør du om før du strukturerer?</b>
          Tenk på hva som må være avklart før noe annet gir mening.</p>`,
        fasit: `<p>Den avgjørende avklaringen i en turnaround er ikke <i>hvorfor</i> selskapet taper penger.
          Det er <b>hvor lenge det har på seg</b>. En plan som virker om ni måneder, er verdiløs hvis kassen
          er tom om tre.</p>
          <ul>
            <li><b>Hvor mye likviditet finnes i dag, og hvor mye av trekkrettigheten er allerede brukt?</b>
              Ingenting annet betyr noe før dette tallet ligger på bordet.</li>
            <li><b>Er tapet konsentrert i noen få prosjekter, eller ligger det jevnt utover porteføljen?</b>
              Dette ene spørsmålet skiller et strukturelt problem fra et operasjonelt, og dermed to helt
              ulike anbefalinger.</li>
            <li><b>Hvor stor del av ordrereserven er fastpris inngått før kostnadsinflasjonen, og finnes det
              indeksklausuler eller endringskrav som ikke er fremmet?</b> Ufremmede krav er kontanter som
              ligger og venter.</li>
            <li><b>Hva er eierens mål og evne?</b> Friske penger, salg, eller styrt avvikling. De tre gir
              motsatt anbefaling, og familien har ikke nødvendigvis samme svar som banken.</li>
          </ul>
          <p><b>Sterkt mot middels:</b> et middels svar spør om kostnadene og marginene — de spørsmålene hører
          hjemme i en lønnsomhetscase. Et sterkt svar spør om <i>tid og penger på konto</i> først, og sier
          hvorfor: rekkefølgen i en turnaround er gitt av hvor lenge selskapet får lov til å leve.</p>`,
        krav: [
          "Ditt første spørsmål handler om likviditet, ikke om lønnsomhet.",
          "Du spør om tapet er konsentrert eller spredt, fordi det avgjør diagnosen.",
          "Du avklarer eierens mål og evne til å skyte inn penger.",
          "Du sier hvorfor rekkefølgen er slik: en plan som virker for sent, er ingen plan.",
        ],
        felle: "Å starte med profitt-treet. Et selskap som går tom for penger, dør før marginen rekker å bli bedre — og intervjueren leser det umiddelbart som at du ikke har forstått hva slags case dette er.",
      },
      {
        art: "struktur",
        sek: 180,
        kort: "Struktur",
        tittel: "Strukturer oppdraget",
        sp: `<p>Intervjueren gir deg én opplysning før du strukturerer: <b>av fjorårets tap på 145 millioner
          kom 110 fra to fastpriskontrakter. Resten av porteføljen tjente 15 millioner før felleskostnader
          på 50.</b></p>
          <p>Strukturer nå oppdraget. Husk at styret stilte to spørsmål, ikke ett — og avslutt med hypotesen din.</p>`,
        fasit: `<p>Den strukturen som virker, er <b>tidsdelt</b>. Det er ikke en pen detalj, det er selve
          logikken: hver horisont har sitt eget spørsmål, sin egen måleenhet og sine egne tiltak.</p>
          <div class="formula">
            <div class="eq">Horisont 1 · 0–13 uker · Overleve</div>
            <div class="where">Måleenhet: kontanter. Kontantstrøm = innbetalinger − utbetalinger − binding i
              arbeidskapital − renter, avdrag og investeringer. Spørsmålet er ikke «tjener vi penger», men
              «rekker vi fram til neste beslutning».</div>
            <div class="eq">Horisont 2 · 3–12 måneder · Stoppe tapet</div>
            <div class="where">Måleenhet: sluttprognose per kontrakt. Er tapet i noen få kontrakter, eller i
              måten selskapet utfører prosjekter på?</div>
            <div class="eq">Horisont 3 · 1–3 år · Er modellen levedyktig</div>
            <div class="where">Måleenhet: kontraktsform, segmentmiks, kapitalstruktur og eierskap.</div>
          </div>
          <p><b>Diagnosen som binder dem sammen</b> er skillet strukturelt mot operasjonelt:</p>
          <ul>
            <li><b>Strukturelt:</b> prisingen av kontraktene er feil — fastpris uten indeksregulering i et
              marked med kostnadsinflasjon — eller selskapet er for lite til å bære risikoen det tar.</li>
            <li><b>Operasjonelt:</b> prosjektstyring, innkjøp, bemanning og håndtering av endringsordrer.</li>
            <li><b>Testen som skiller dem:</b> er tapet konsentrert eller spredt? Opplysningen du nettopp fikk
              svarer på det. 110 av 145 ligger i to kontrakter, og resten av porteføljen tjener 15 millioner.
              Det peker mot kontraktsproblem, ikke driftsproblem — og felleskostnadene på 50 millioner er da
              den neste tingen å teste, for de er for høye for det som er igjen.</li>
          </ul>
          <p><b>Hypotesen:</b> Løvaas har et akutt likviditetsproblem og et avgrenset kontraktsproblem, ikke
          et driftsproblem. Jeg vil derfor først regne rekkevidden i uker, og deretter se sluttprognosen på de
          to kontraktene. Jeg ser <i>ikke</i> på generelle kostnadskutt nå — de virker for sent og koster penger
          først.</p>
          <p><b>Sterkt mot middels:</b> et middels svar deler i inntekter og kostnader og legger på «likviditet»
          som en fjerde gren. Et sterkt svar gjør <i>tid</i> til den øverste aksen, sier hva som måles i hver
          horisont, og bruker de 110 av 145 til å ta stilling allerede i strukturen.</p>`,
        krav: [
          "Tid er den øverste aksen i strukturen din, ikke en gren nederst.",
          "Du skiller eksplisitt mellom strukturelt og operasjonelt problem, og sier hvilken test som skiller dem.",
          "Du bruker opplysningen om at 110 av 145 ligger i to kontrakter til å ta stilling.",
          "Du sier hva du ikke skal se på nå, og hvorfor det er for tidlig.",
          "Du avslutter med hypotese og hvilket tall du vil ha først.",
        ],
        felle: "Å behandle turnaround som en kostnadscase. Casen har en tidsdimensjon som er hele poenget: spørsmålet er ikke bare hva som må gjøres, men hva som må gjøres innen 90 dager mot innen tre år.",
      },
      {
        art: "exhibit",
        sek: 150,
        kort: "Figur",
        tittel: "Kontantstrømbroen",
        sp: `<p>Økonomidirektøren gir deg prognosen for de neste fire månedene, sammen med hva selskapet
          faktisk har å gå på. <b>Hva ser du?</b></p>`,
        figur: `<table class="data">
            <tr><th>Millioner kroner</th><th class="n">Neste fire måneder</th></tr>
            <tr><td>Driftsresultat før avskrivning (EBITDA)</td><td class="n">−8</td></tr>
            <tr><td>Endring i opptjent, ikke fakturert produksjon</td><td class="n">−44</td></tr>
            <tr><td>Endring i kundefordringer</td><td class="n">−22</td></tr>
            <tr><td>Endring i leverandørgjeld</td><td class="n">+16</td></tr>
            <tr><td>Renter og avdrag</td><td class="n">−24</td></tr>
            <tr><td>Investeringer i maskiner (allerede bestilt)</td><td class="n">−14</td></tr>
            <tr><td><b>Netto kontantstrøm</b></td><td class="n"><b>−96</b></td></tr>
            <tr><td>Kontanter i banken i dag</td><td class="n">24</td></tr>
            <tr><td>Ubenyttet trekkrettighet (ramme 250, brukt 202)</td><td class="n">48</td></tr>
            <tr><td><b>Tilgjengelig likviditet</b></td><td class="n"><b>72</b></td></tr>
          </table>`,
        fasit: `<p>Overskriften først, og den er ikke den man venter:</p>
          <p><i>«Driften er nesten i balanse. Bare 8 av de 96 millionene som forsvinner, er driftstap. Over
          halvparten — 50 millioner — er arbeidskapital: arbeid selskapet allerede har utført og betalt for,
          men ikke fått penger for.»</i></p>
          <p>Regnestykket bak den setningen: 44 i ufakturert produksjon pluss 22 i ubetalte fordringer, minus
          16 i leverandørgjeld som strekkes, er <b>50 millioner</b> bundet på fire måneder. Driftstapet er
          <b>8</b>, altså 8 prosent av kontantunderskuddet.</p>
          <p>Tre nivå-2-innsikter som avgjør anbefalingen:</p>
          <ul>
            <li><b>Leverandørgjelden vokser 16 millioner.</b> Selskapet finansierer seg allerede på
              underleverandørene sine. Det er en lånekilde som tar slutt brått — og som varsles gjennom hele
              bransjen i det øyeblikket noen ikke får betalt.</li>
            <li><b>Det kjøpes maskiner for 14 millioner mens kassen tømmes.</b> Dette er den enkleste kronen i
              hele casen, og den ligger fullt ut innenfor selskapets egen kontroll.</li>
            <li><b>De 48 millionene i ubenyttet trekkrettighet er bankens penger</b>, i en bank som nettopp har
              varslet at den vurderer å trekke dem. Regn med dem, men si høyt at de ikke er sikre.</li>
          </ul>
          <p><b>Sterkt mot middels:</b> et middels svar leser −96 og konkluderer at selskapet blør. Et sterkt
          svar deler de 96 i drift, arbeidskapital, finansiering og investering — og ser at bare 8 er drift.
          Den delingen snur hele anbefalingen fra kostnadskutt til kontantinnhenting.</p>`,
        krav: [
          "Du deler de 96 millionene i drift, arbeidskapital, finansiering og investering før du konkluderer.",
          "Du ser at bare 8 av 96 er driftstap, og sier hva det betyr for hvilke tiltak som virker.",
          "Du legger merke til at leverandørgjelden vokser, og kaller det det det er: en lånekilde.",
          "Du sier at den ubenyttede trekkrettigheten ikke er sikre penger.",
        ],
        felle: "Å lese −96 som at selskapet taper 96 millioner. Det taper 8 og binder 88. Blander du resultat og kontantstrøm i en turnaround, foreskriver du kostnadskutt mot et arbeidskapitalproblem.",
      },
      {
        art: "regne",
        sek: 120,
        kort: "Regning",
        tittel: "Hvor lenge holder likviditeten?",
        sp: `<p>Legg til grunn at kontantstrømmen fordeler seg jevnt over de fire månedene.</p>
          <p><b>Hvor lenge holder den tilgjengelige likviditeten? Svar i måneder.</b></p>
          <p class="tiny">Si oppsettet høyt før du regner, og sanity-sjekk tallet etterpå.</p>`,
        svar: 3,
        enhet: "måneder",
        toleranse: 0.02,
        fasit: `<p>Rekkevidde er tilgjengelig likviditet delt på forbruk per periode. Ikke noe mer.</p>
          <div class="formula">
            <div class="eq">Kontantforbruk per måned: 96 / 4 = 24 millioner</div>
            <div class="eq">Tilgjengelig likviditet: 24 + 48 = 72 millioner</div>
            <div class="eq">Rekkevidde: 72 / 24 = <b>3,0 måneder</b>, altså rundt 13 uker</div>
          </div>
          <p><b>Her ligger poenget:</b> trekkrettigheten forfaller om <i>fire</i> måneder. Kassen er tom om
          <i>tre</i>. Selskapet møter altså veggen før banken i det hele tatt rekker å ta stilling til
          fornyelsen. Det betyr at forhandlingen med banken må starte nå, ikke ved forfall — og det er en
          konklusjon du bare kommer til ved å holde rekkevidden opp mot forfallsdatoen.</p>
          <p><b>Sanity-sjekk:</b> 24 millioner i måneden mot en omsetning på 1 800 / 12 = 150 millioner i
          måneden er 16 prosent av omsetningen som forsvinner ut av kassen. Ingen entreprenør overlever den
          raten lenge, og tallet er dermed troverdig som krisetall.</p>
          <p><b>Og så det viktigste — regn baklengs, for det er der anbefalingen ligger.</b> Stopper selskapet
          maskininvesteringen (14) og henter inn halvparten av arbeidskapitalen (25 av 50), faller forbruket
          til (96 − 39) / 4 = <b>14,25 millioner i måneden</b>, og rekkevidden går fra 3,0 til
          72 / 14,25 = <b>5,1 måneder</b>. To tiltak, ingen oppsigelser, og selskapet lever forbi
          bankforfallet.</p>
          <p><b>Sterkt mot middels:</b> et middels svar regner 3 måneder og stopper. Et sterkt svar regner
          3 måneder, holder det opp mot fire måneder til forfall, og regner deretter hva to konkrete tiltak
          gjør med tallet. Det er forskjellen på en observasjon og en plan.</p>`,
        krav: [
          "Du regner rekkevidde, ikke margin. Spørsmålet var hvor lenge, ikke hvor mye.",
          "Du bruker kontanter pluss ubenyttet trekkrettighet som tilgjengelig likviditet.",
          "Du holder de tre månedene opp mot bankforfallet på fire — det er hele poenget.",
          "Du sanity-sjekker mot omsetningen: 24 av 150 millioner i måneden.",
          "Du regner baklengs på hva ett eller to tiltak gjør med rekkevidden.",
        ],
        felle: "Å regne rekkevidden på kontantbeholdningen alene (24 / 24 = én måned) eller på hele trekkrammen på 250, som forlengst er delvis brukt. Tilgjengelig likviditet er kontanter pluss det som faktisk kan trekkes — verken mer eller mindre.",
      },
      {
        art: "ide",
        sek: 150,
        kort: "Idéer",
        tittel: "Hva gjør dere, og når",
        sp: `<p><b>List tiltak — men del dem etter når de virker</b>, ikke etter hva de handler om.
          Si oppdelingen først.</p>
          <p class="tiny">Denne uken · dette kvartalet · de neste tre årene.</p>`,
        liste: [
          "Stoppe den bestilte maskininvesteringen på 14 millioner, eller be om leasing i stedet for kjøp",
          "Fakturere alt opptjent arbeid som ligger ufakturert, og gå fra månedlig til ukentlig fakturering",
          "Sette én person på innkreving av de ti største forfalte fordringene, med daglig oppfølging",
          "Fremme endringskrav og tilleggsvederlag som prosjektlederne har utsatt fordi de er ubehagelige",
          "Innføre en rullerende likviditetsprognose på 13 uker som styres ukentlig av daglig leder",
          "Stanse all rekruttering og alle innkjøp som ikke er kontraktsfestet, med umiddelbar virkning",
          "Gå til banken denne uken med åpen bok og be om avdragsutsettelse mot ukentlig rapportering",
          "Lage sluttprognose for hvert enkelt prosjekt, og skille tapsprosjektene fra resten",
          "Selge maskinparken og lease den tilbake for å frigjøre bundet kapital",
          "Avvikle eller reforhandle de to største tapskontraktene, om nødvendig ved å kjøpe seg ut",
          "Redusere administrasjonen i takt med at ordrereserven krymper, ikke før",
          "Slutte å ta fastpriskontrakter over en viss størrelse uten indeksregulering",
          "Spisse porteføljen mot segmentene der selskapet faktisk tjener penger, og forlate resten",
          "Hente egenkapital fra familien eller ny investor, eller fusjonere med en aktør som tåler risikoen",
        ],
        fasit: `<p>Oppdelingen <i>er</i> svaret her. Si den før du lister: <b>uker · kvartal · år.</b>
          Et tiltak som virker om ni måneder, er ikke feil — det er bare ikke først.</p>
          <ul>
            <li><b>Uker (kontanter):</b> stopp investeringen, fakturer det opptjente, krev inn fordringene,
              fremm endringskravene, innfør 13-ukersprognosen, gå til banken. Alt sammen henter penger som
              allerede tilhører selskapet.</li>
            <li><b>Kvartal (stoppe tapet):</b> sluttprognose per prosjekt, håndtere de to tapskontraktene,
              sale-leaseback på maskiner, tilpasse administrasjonen.</li>
            <li><b>År (modellen):</b> kontraktsform med indeksregulering, spisset segmentmiks, ny
              kapitalstruktur eller ny eier.</li>
          </ul>
          <p><b>Legg merke til hva som ikke står i ukesbunken: oppsigelser.</b> Det er kontraintuitivt og det
          skiller. Oppsigelser koster penger før de sparer penger — sluttpakker, oppsigelsestid og tapt
          produksjonskapasitet i prosjektene som fortsatt går. I en likviditetskrise er nedbemanning derfor et
          kvartalstiltak, ikke et uketiltak.</p>
          <p><b>Sterkt mot middels:</b> et middels svar grupperer etter tema — kostnader, inntekter, finans.
          Et sterkt svar grupperer etter <i>virkningstidspunkt</i>, og kan begrunne hvorfor det mest åpenbare
          kostnadstiltaket havner i andre bunke.</p>`,
        krav: [
          "Du deler etter når tiltaket virker, ikke etter hva det handler om.",
          "Ukesbunken består av tiltak som henter kontanter selskapet allerede har krav på.",
          "Du plasserer nedbemanning i kvartalsbunken og begrunner hvorfor den ikke hører hjemme i uker.",
          "Minst ett tiltak angriper kontraktsformen, som er den strukturelle årsaken.",
          "Du prioriterer til slutt i stedet for å la de tre bunkene ligge like tunge.",
        ],
        felle: "Å blande målene: «vi må kutte 15 prosent av kostnadene» er et lønnsomhetstiltak i en likviditetskrise. Det virker om tre kvartaler og koster penger de tre første — akkurat de tre selskapet har igjen.",
      },
      {
        art: "syntese",
        sek: 90,
        kort: "Anbefaling",
        tittel: "Anbefalingen",
        sp: `<p>Styrelederen og bankens kunderådgiver sitter i samme rom. Du har <b>ett minutt</b>.</p>
          <p class="tiny">Skriv den slik du ville sagt den — ikke som notater.</p>`,
        fasit: `<p>Svaret først, og i en turnaround er svaret alltid en rekkefølge.</p>
          <blockquote><p><b>«Løvaas har tre måneder på seg, ikke fire. Kassen tømmes før trekkrettigheten
          forfaller. Derfor er det første dere gjør, å kjøpe tid — ikke å kutte kostnader.»</b></p>
          <p>Tre grunner. For det første er driften nesten i balanse: bare 8 av de 96 millionene som forsvinner
          i kvartalet, er driftstap. For det andre ligger 50 millioner i arbeid dere allerede har utført, men
          ikke fakturert eller fått betalt — det er deres egne penger, ikke bankens. For det tredje kjøper dere
          maskiner for 14 millioner mens kassen tømmes.</p>
          <p>Stopper dere investeringen og henter inn halvparten av arbeidskapitalen, faller forbruket fra 24
          til 14 millioner i måneden, og rekkevidden går fra tre til fem måneder — forbi bankforfallet. Det er
          tiden dere trenger for å gjøre det egentlige arbeidet: to fastpriskontrakter står for 110 av
          fjorårets tap på 145, mens resten av porteføljen tjener penger. Dette er et kontraktsproblem, ikke
          et driftsproblem, og løsningen er å avslutte eller reforhandle de to — og aldri signere en tredje
          uten indeksregulering.</p>
          <p>Den største risikoen er at banken trekker de 48 millionene i ubenyttet kreditt før dere rekker å
          bruke dem. Derfor bør dere gå dit denne uken med en 13-ukers prognose og åpen bok, i stedet for å
          vente til forfall. Neste steg er sluttprognose på hvert enkelt prosjekt — det avgjør om tapet er to
          kontrakter eller tjue, og dermed om dette er en redning eller en avvikling.»</p></blockquote>
          <p><b>Sterkt mot middels:</b> et middels svar sier «skaff mer likviditet og kutt kostnader». Et
          sterkt svar sier <i>hvor mange måneder</i> selskapet har, <i>hvor mange det får</i> av to navngitte
          tiltak, og hvorfor kostnadskutt ikke står først. Og det tør å nevne at avvikling er et mulig utfall.</p>`,
        krav: [
          "Første setning gir tidsfristen og rekkefølgen, ikke en oppsummering av analysen.",
          "Du bruker de harde tallene: 8 av 96 er drift, 50 er arbeidskapital, 110 av 145 er to kontrakter.",
          "Du sier hva rekkevidden blir etter tiltakene, ikke bare hva den er i dag.",
          "Du adresserer banken direkte, siden den sitter i rommet og eier utfallet.",
          "Du nevner risiko og ett konkret neste steg, og utelukker ikke at svaret kan bli avvikling.",
        ],
        felle: "Å love styret at selskapet er reddet. Du vet at 110 av 145 ligger i to kontrakter, men ikke om sluttprognosene på de resterende prosjektene holder. En turnaround-anbefaling som ikke sier hva den ennå ikke vet, er ikke troverdig for en bank.",
      },
    ],
  },
  {
    id: "pe-brannsikring",
    label: "Plattformen fondet må tro på i fem år",
    type: "PE-vurdering",
    nivå: "Avansert",
    firma: "Generisk",
    stil: "candidate-led",
    minutter: 40,
    ch: [],
    blurb: "Et oppkjøpsfond stiller tre spørsmål: er inntjeningen varig, finnes det en verdiskapingsplan utover multippelekspansjon, og finnes det en exit. Trener avkastningsregning med gjeld.",
    prompt: `<p>Klienten er <b>Kleiven Kapital</b>, et nordisk oppkjøpsfond som investerer i
      mellomstore selskaper. De ser på <b>Sikring Nord</b>, en familieeid leverandør av brann- og
      sikkerhetsservice: lovpålagte årskontroller av slokkeutstyr, sprinkleranlegg, nødlys og
      brannalarm for næringsbygg, sykehjem og skoler.</p>
      <p>Sikring Nord omsetter for 580 millioner kroner med 90 millioner i EBITDA. Familien vil ha
      <b>10 ganger EBITDA — 900 millioner kroner</b>. Fondet finansierer med 540 millioner i gjeld
      og 360 millioner i egenkapital, og har et avkastningskrav på <b>2,5 ganger innskutt
      egenkapital over fem år</b>.</p>
      <p>Kleiven Kapital vil bruke Sikring Nord som <b>plattform</b> og kjøpe opp mindre lokale
      aktører rundt den. <b>Bør de investere?</b></p>`,
    bakgrunn: `<p>Casen er konstruert, men både bransjen og strukturen er hentet fra virkeligheten.
      Brann- og sikkerhetsservice er en klassisk nordisk plattformsektor: etterspørselen er
      <i>lovpålagt</i> og dermed lite konjunkturfølsom, inntektene er abonnementslignende
      årskontroller, markedet består av hundrevis av små lokale aktører, og en kjøper kan legge
      dem inn på egen ruteplanlegging og eget administrasjonsapparat. Det er oppskriften på en
      buy-and-build.</p>
      <p>Det som gjør PE-casen til en egen sjanger, er at tre spørsmål stilles i rekkefølge, og at
      de ikke er de samme som i en vanlig M&amp;A-case. <b>Er inntjeningen varig?</b> — altså tåler
      EBITDA-en de neste fem årene uten dagens eier. <b>Finnes det en verdiskapingsplan?</b> — noe
      som gjør selskapet mer verdt, uavhengig av at multipler kan stige. <b>Finnes det en exit?</b>
      — en kjøper som vil betale om fem år, av en annen grunn enn at hun også håper på
      multippelekspansjon.</p>
      <p>Og over det hele ligger gjelden. Med 540 av 900 millioner lånt er egenkapitalen 40 prosent
      av selskapsverdien. Det gjør at både oppside og nedside treffer eierne med to og en halv
      gangs kraft. En kandidat som ikke sier det høyt, har ikke forstått hva som skiller en
      PE-vurdering fra en industriell.</p>`,
    trinn: [
      {
        art: "oppklaring",
        sek: 90,
        kort: "Avklar",
        tittel: "Hva vil du vite før du begynner?",
        sp: `<p>Du har hørt prompten. Hvilke spørsmål stiller du før du strukturerer?</p>`,
        fasit: `<p>De tre avklaringene som betyr mest i en PE-case er <b>holdeperioden</b>,
          <b>exit-ruten</b> og <b>kvaliteten på EBITDA-tallet</b>. De to første definerer hva
          fondet faktisk kjøper; det tredje avgjør om prisen er regnet på noe ekte.</p>
          <ul>
            <li><b>Hva er holdeperioden, og hvem er den tenkte kjøperen ved exit?</b> Fem år er
              oppgitt, men ikke hvem som skal kjøpe. En industriell kjøper, et større fond, eller
              børs — de tre betaler for forskjellige ting, og det bestemmer hva planen bør
              inneholde.</li>
            <li><b>Er de 90 millionene i EBITDA rapportert eller justert?</b> Familieeide selskaper
              har normaliseringer: eierlønn, husleie til eierens eiendomsselskap, engangsposter.
              Hele prisen er 10 ganger dette tallet, så et avvik på 5 millioner er 50 millioner i
              pris.</li>
            <li><b>Hvor mye av veksten er organisk?</b> Hvis EBITDA har vokst fordi selskapet har
              kjøpt opp små aktører, er den underliggende veksten en annen — og da er
              verdiskapingsplanen delvis allerede tatt ut.</li>
            <li><b>Hva slags kontrakter er årskontrollene?</b> Løpetid, oppsigelsestid,
              prisreguleringsklausul, og fornyelsesgrad. Det er dette som avgjør om inntjeningen
              er varig.</li>
            <li><b>Er 540 millioner i gjeld faktisk kommittert av en bank?</b> Seks ganger EBITDA er
              i overkant. Får de ikke lånet, er hele avkastningsregnestykket et annet.</li>
          </ul>
          <p><b>Sterkt mot middels:</b> et middels svar ber om en due diligence-liste. Et sterkt
          svar spør om de fire–fem tingene som kan endre <i>prisen fondet kan betale</i>, og sier
          det: «Jeg spør fordi hvert av disse svarene flytter maksprisen.»</p>`,
        krav: [
          "Du spør om holdeperiode og exit-rute, ikke bare om selskapet.",
          "Du spør om EBITDA er justert, siden hele prisen er en multippel av det tallet.",
          "Du spør om hvor mye av veksten som er organisk mot oppkjøpt.",
          "Du spør om kontraktsvilkår og fornyelse, ikke bare om omsetningsvekst.",
          "Du knytter spørsmålene til prisen fondet kan betale, ikke til nysgjerrighet.",
        ],
        felle: "Å be om en standard due diligence-liste. Det er ikke en avklaring, det er en utsettelse — og i en PE-case signaliserer det at du ikke vet hvilke tre eller fire forhold som faktisk avgjør en investeringsbeslutning.",
      },
      {
        art: "struktur",
        sek: 150,
        kort: "Struktur",
        tittel: "Strukturer investeringsbeslutningen",
        sp: `<p>Bryt ned hva Kleiven Kapital må tro på for å gå inn. Skriv nedbrytningen slik du ville
          tegnet den, og <b>si hvilken gren du vil teste først</b>.</p>`,
        fasit: `<p>En PE-vurdering har fire grener, og de tre første er de tre spørsmålene et fond
          faktisk stiller. Den fjerde er der de møtes.</p>
          <ul>
            <li><b>1 · Er inntjeningen varig?</b> Er markedet stabilt eller voksende — her
              lovregulert, altså lite konjunkturfølsomt. Er inntektene gjentakende, og hva er
              fornyelsesgraden? Er de justerte 90 millionene ekte, eller pyntet? Hvor konsentrert
              er kundemassen? Hva skjer når familien går ut av døra — sitter kunderelasjonene i
              selskapet eller i eieren?</li>
            <li><b>2 · Finnes det en verdiskapingsplan?</b> Fire kilder, og bare tre av dem er
              fondets eget arbeid: <i>vekst</i> (organisk og oppkjøp), <i>marginforbedring</i>
              (pris, ruteplanlegging, innkjøp, administrasjon), <i>gjeldsnedbetaling</i> (kontanter
              som flytter verdi fra långiver til eier), og <i>multippelekspansjon</i> — som er
              markedets gave, ikke en plan.</li>
            <li><b>3 · Finnes det en exit?</b> Hvem kjøper om fem år, hvorfor, og til hvilken
              multippel? Er selskapet stort nok til å være interessant for en industriell kjøper,
              og er det ryddet slik at det kan selges?</li>
            <li><b>4 · Går regnestykket opp?</b> Prisen, gjelden, kontantstrømmen og
              avkastningskravet. Det er her de tre andre grenene blir til ett tall.</li>
          </ul>
          <div class="formula">
            <div class="eq">EK ved exit = Exit-multippel × EBITDA(exit) − Netto gjeld ved exit</div>
            <div class="eq">Avkastning = EK ved exit / Innskutt egenkapital</div>
            <div class="where">Legg merke til hva gjelden gjør: den står med minus i telleren og
              gjør nevneren mindre. Begge deler forsterker utslaget av at EBITDA og multippel
              bommer, i begge retninger.</div>
          </div>
          <p><b>Sterkt mot middels:</b> et middels svar sier «marked, selskap, konkurrenter,
          finansiering». Et sterkt svar skiller de fire verdikildene fra hverandre og sier at
          multippelekspansjon ikke er en plan, og starter der: <i>«Jeg vil først teste om
          inntjeningen er varig, for hvis fornyelsesgraden faller, spiller resten ingen
          rolle.»</i></p>`,
        krav: [
          "Du har varighet, verdiskapingsplan og exit som tre egne grener, ikke ett punkt om selskapet.",
          "Du deler verdiskapingen i vekst, margin, gjeldsnedbetaling og multippel, og skiller multippelen ut.",
          "Du skriver opp hvordan avkastningen faktisk regnes, med netto gjeld ved exit.",
          "Du nevner eieravhengighet og kundekonsentrasjon under varighet.",
          "Du sier hvilken gren du starter med, og hvorfor.",
        ],
        felle: "Å lage en verdsettelse i stedet for en investeringsvurdering. Spørsmålet er ikke hva Sikring Nord er verdt, men om 900 millioner gir 2,5 ganger pengene på fem år — det er to forskjellige regnestykker med to forskjellige svar.",
      },
      {
        art: "exhibit",
        sek: 150,
        kort: "Tallene",
        tittel: "Datarommet",
        sp: `<p>Fondet har fått tre ark fra datarommet: historikken, transaksjonsstrukturen, og
          fondets eget utkast til verdiskapingsplan. <b>Hva ser du?</b></p>`,
        figur: `<p><b>Ark 1 · Sikring Nord, tre år (mill. kr)</b></p>
          <table class="data">
            <tr><th>Millioner kroner</th><th class="n">År −2</th><th class="n">År −1</th><th class="n">Siste 12 mnd</th></tr>
            <tr><td>Serviceavtaler, årskontroller</td><td class="n">310</td><td class="n">336</td><td class="n">358</td></tr>
            <tr><td>Prosjekt og installasjon</td><td class="n">190</td><td class="n">214</td><td class="n">222</td></tr>
            <tr><td><b>Sum omsetning</b></td><td class="n"><b>500</b></td><td class="n"><b>550</b></td><td class="n"><b>580</b></td></tr>
            <tr><td>Varekost og underleverandør</td><td class="n">195</td><td class="n">215</td><td class="n">226</td></tr>
            <tr><td>Lønn, montører</td><td class="n">155</td><td class="n">168</td><td class="n">176</td></tr>
            <tr><td>Salg og administrasjon</td><td class="n">78</td><td class="n">84</td><td class="n">88</td></tr>
            <tr><td><b>EBITDA</b></td><td class="n"><b>72</b></td><td class="n"><b>83</b></td><td class="n"><b>90</b></td></tr>
            <tr><td>EBITDA-margin</td><td class="n">14,4 %</td><td class="n">15,1 %</td><td class="n">15,5 %</td></tr>
            <tr><td>Serviceavtaler som andel av omsetning</td><td class="n">62 %</td><td class="n">61 %</td><td class="n">62 %</td></tr>
            <tr><td>Fornyelsesgrad på serviceavtaler</td><td class="n">94 %</td><td class="n">93 %</td><td class="n">91 %</td></tr>
            <tr><td>De fem største kundene, andel av omsetning</td><td class="n">21 %</td><td class="n">26 %</td><td class="n">33 %</td></tr>
            <tr><td>Små aktører kjøpt opp i året</td><td class="n">0</td><td class="n">2</td><td class="n">3</td></tr>
          </table>
          <p><b>Ark 2 · Transaksjonen</b></p>
          <table class="data">
            <tr><th>Post</th><th class="n">Verdi</th></tr>
            <tr><td>EBITDA siste 12 måneder</td><td class="n">90 mill. kr</td></tr>
            <tr><td>Prisforlangende, multippel</td><td class="n">10 ×</td></tr>
            <tr><td>Selskapsverdi (EV)</td><td class="n">900 mill. kr</td></tr>
            <tr><td>Gjeld ved oppkjøp</td><td class="n">540 mill. kr</td></tr>
            <tr><td>Egenkapital fra fondet</td><td class="n">360 mill. kr</td></tr>
            <tr><td>Gjeld / EBITDA</td><td class="n">6,0 ×</td></tr>
            <tr><td>Planlagt gjeldsnedbetaling over fem år</td><td class="n">240 mill. kr</td></tr>
            <tr><td>Netto gjeld ved exit</td><td class="n">300 mill. kr</td></tr>
            <tr><td>Fondets avkastningskrav</td><td class="n">2,5 × på fem år</td></tr>
          </table>
          <p><b>Ark 3 · Fondets utkast til verdiskapingsplan</b></p>
          <table class="data">
            <tr><th>Tiltak</th><th class="n">EBITDA-effekt, mill. kr per år</th></tr>
            <tr><td>Prisøkning på serviceavtaler, 3 % over to år</td><td class="n">12</td></tr>
            <tr><td>Ruteplanlegging: ett oppdrag mer per montør per dag</td><td class="n">9</td></tr>
            <tr><td>Innkjøp: felles avtale på slokkemateriell</td><td class="n">4</td></tr>
            <tr><td>Kutt i administrasjon etter systembytte</td><td class="n">5</td></tr>
            <tr><td><b>Sum identifiserte tiltak</b></td><td class="n"><b>30</b></td></tr>
          </table>`,
        fasit: `<p>Overskriften først:</p>
          <p><i>«Selskapet ser ut som en god plattform — 62 prosent gjentakende inntekt, stigende
          margin, lovpålagt etterspørsel. Men de tre linjene nederst på ark 1 forteller en annen
          historie enn de tre øverste: fornyelsesgraden faller, kundekonsentrasjonen stiger raskt,
          og veksten er delvis kjøpt.»</i></p>
          <ul>
            <li><b>Fornyelsesgraden faller fra 94 til 91 prosent.</b> Det høres lite ut. Det er
              det ikke. Tre prosentpoeng på en serviceportefølje på 358 millioner er om lag 11
              millioner i årlig inntekt som lekker ut, og på servicekontrakter er marginen høyere
              enn snittet. Den lekkasjen løper hvert år, og den løper motsatt vei av
              verdiskapingsplanen.</li>
            <li><b>De fem største kundene har gått fra 21 til 33 prosent.</b> Én tapt storkunde
              flytter EBITDA-en flere millioner. Dette er den klassiske PE-fella: konsentrasjon
              vokser stille mens topplinjen ser sunn ut.</li>
            <li><b>Veksten er delvis kjøpt.</b> Fem oppkjøp på to år. Da er ikke 90 millioner
              resultatet av organisk kraft — og det betyr både at den underliggende veksten er
              svakere, og at en del av buy-and-build-gevinsten allerede er tatt ut av selgeren.</li>
            <li><b>Marginforbedringen er ekte, men liten:</b> 14,4 til 15,5 prosent. Det er drøyt
              ett prosentpoeng på to år, og ark 3 ber om ytterligere fem prosentpoeng i effekt.</li>
            <li><b>Ark 3 summerer til nøyaktig 30 millioner</b> — og 90 pluss 30 er 120. Merk deg
              det tallet før du regner. Det kommer tilbake.</li>
          </ul>
          <p><b>Sterkt mot middels:</b> et middels svar leser marginforbedringen og kaller selskapet
          attraktivt. Et sterkt svar leser de tre nøkkeltallene under EBITDA-linjen og sier at de
          alle peker samme vei: <i>«Inntjeningen ser varig ut på overflaten, men de tre
          kvalitetsmålene har forverret seg hvert år. Det er nøyaktig de tre jeg ville brukt
          due diligence-budsjettet på.»</i></p>`,
        krav: [
          "Du leser nøkkeltallene under EBITDA-linjen, ikke bare omsetning og margin.",
          "Du kobler fallende fornyelsesgrad til et beløp, ikke bare til prosentpoeng.",
          "Du ser at kundekonsentrasjonen har steget fra 21 til 33 prosent og sier hva risikoen er.",
          "Du merker at veksten delvis er kjøpt gjennom fem oppkjøp på to år.",
          "Du legger merke til at planen på ark 3 summerer til 30 og at 90 pluss 30 er 120.",
        ],
        felle: "Å behandle 62 prosent gjentakende inntekt som bevis på at inntjeningen er varig. Gjentakende inntekt er bare varig så lenge den fornyes — og fornyelsesgraden her har falt tre år på rad.",
      },
      {
        art: "regne",
        sek: 120,
        kort: "Regn",
        tittel: "Hva må EBITDA være ved exit?",
        sp: `<p>Fondet skyter inn 360 millioner og krever 2,5 ganger pengene på fem år. Netto gjeld
          ved exit er 300 millioner. Anta at selskapet selges på <b>samme multippel som det
          kjøpes for — 10 ganger</b>, altså ingen multippelekspansjon.</p>
          <p><b>Hvor stor må EBITDA være ved exit? Svar i millioner kroner.</b></p>
          <p class="tiny">Jobb bakover fra avkastningskravet. Si oppsettet høyt før du regner.</p>`,
        svar: 120,
        enhet: "millioner kroner",
        toleranse: 0.02,
        fasit: `<p>Fire linjer, bakover:</p>
          <div class="formula">
            <div class="eq">Nødvendig egenkapital ved exit: 2,5 × 360 = 900 mill. kr</div>
            <div class="eq">Nødvendig selskapsverdi: 900 + 300 (netto gjeld) = 1 200 mill. kr</div>
            <div class="eq">Nødvendig EBITDA ved 10 ×: 1 200 / 10 = <b>120 millioner kroner</b></div>
            <div class="eq">Nødvendig vekst: 120 / 90 = +33 % på fem år ≈ <b>5,9 % i året</b></div>
          </div>
          <p><b>Og nå kommer poenget.</b> Verdiskapingsplanen på ark 3 summerer til nøyaktig 30
          millioner. 90 pluss 30 er 120. <b>Planen leverer akkurat det som kreves — og ikke en
          krone mer.</b> Det betyr tre ting på én gang:</p>
          <ul>
            <li>Det finnes <b>ingen sikkerhetsmargin</b>. Hvert eneste tiltak må lykkes fullt ut,
              i tide, for at fondet skal nå minimumskravet sitt.</li>
            <li>Planen forutsetter implisitt <b>null organisk vekst og null erosjon</b>. Men
              fornyelsesgraden faller: tre prosentpoeng på 358 millioner er om lag 11 millioner i
              inntekt i året som lekker ut. Går noe av det på EBITDA, spiser lekkasjen tiltakene.</li>
            <li>Alt som skal til for å komme <i>over</i> 2,5 ganger, må komme fra
              <b>multippelekspansjon</b> — altså fra at markedet er villigere til å betale om fem
              år enn i dag. Det er ikke en plan, det er en forhåpning.</li>
          </ul>
          <p><b>Gjelden forsterker begge veier, og det er verdt å tallfeste:</b></p>
          <ul>
            <li>Uten gjeld ville de samme 900 millionene i EV blitt 1 200 — en avkastning på
              <b>1,33 ganger, altså 5,9 prosent i året</b>. Med 60 prosent gjeld blir nøyaktig
              samme utvikling til 2,5 ganger og 20 prosent. Det er gjelden som skaper avkastningen,
              ikke driften.</li>
            <li>Men den virker like sterkt nedover. Exit på <b>9 ganger</b> i stedet for 10 gir
              EV 1 080, egenkapital 780, altså <b>2,17 ganger</b> og en internrente på knapt 17
              prosent — under kravet. Exit på 11 ganger gir 2,83 ganger og 23 prosent.
              <b>Én multippeltrinn i hver retning svinger avkastningen med om lag en tredels
              gang pengene.</b></li>
            <li>Og hvis gjeldsnedbetalingen svikter — 240 millioner på fem år er 48 i året, drøyt
              40 prosent av gjennomsnittlig EBITDA — faller egenkapitalen ved exit fra 900 til
              660, altså <b>1,83 ganger</b>. Da er halvparten av avkastningen borte uten at
              driften har gjort noe galt.</li>
          </ul>
          <p><b>Sterkt mot middels:</b> et middels svar lander på 120 og sier at det krever seks
          prosent vekst. Et sterkt svar ser at planen treffer 120 på kronen, kaller det ut som en
          plan uten margin, og viser med ett tall hva gjeldsgraden gjør med utslaget begge veier.</p>`,
        krav: [
          "Du jobber bakover fra avkastningskravet i stedet for å framskrive EBITDA og håpe.",
          "Du legger til netto gjeld ved exit for å komme fra egenkapital til selskapsverdi.",
          "Du bruker uendret multippel når oppgaven sier det, og kaller multippelekspansjon en forutsetning og ikke en plan.",
          "Du ser at verdiskapingsplanen på 30 millioner treffer kravet nøyaktig, uten margin.",
          "Du tallfester hva ett multippeltrinn eller sviktende gjeldsnedbetaling gjør med avkastningen.",
        ],
        felle: "Å trekke fra gjelden på 540 i stedet for netto gjeld ved exit på 300. Gjeldsnedbetaling er en av de fire verdikildene i en oppkjøpsstruktur — glemmer du den, får du 133 millioner i nødvendig EBITDA og avviser en investering som faktisk kunne gått opp.",
      },
      {
        art: "ide",
        sek: 120,
        kort: "Idéer",
        tittel: "Hva må fondet gjøre før de byr?",
        sp: `<p>Regnestykket går akkurat opp, uten margin. <b>List så mange grep du klarer på to
          minutter</b> — i due diligence, i budet, i verdiskapingsplanen og i exit-forberedelsen.
          Én per linje.</p>`,
        liste: [
          "Etterprøve fornyelsesgraden kontrakt for kontrakt, og finne ut om de tapte kundene er små eller store",
          "Kjøre en kvalitetskontroll av EBITDA: eierlønn, husleie til eiers eiendomsselskap, engangsposter",
          "Skille organisk vekst fra oppkjøpt vekst i alle tre årene, og prise bare den organiske",
          "Møte de fem største kundene og sjekke kontraktslengde, oppsigelsestid og hvem relasjonen sitter hos",
          "Sjekke om prisreguleringsklausulene faktisk tillater prisøkningen på 12 millioner i planen",
          "Teste ruteplanleggingsgevinsten mot data: hvor mange oppdrag per montør per dag er det i dag",
          "Senke budet fra 10 til 9 ganger, som gir 90 millioner lavere pris og et helt annet utfallsrom",
          "Legge inn en earn-out slik at familien bærer risikoen for at fornyelsesgraden holder",
          "Binde selger og nøkkelpersoner med bonus og karensklausul, siden relasjonene kan sitte hos dem",
          "Bygge en pipeline av oppkjøpskandidater før signering, og prise dem inn i planen",
          "Kartlegge de industrielle kjøperne som finnes ved exit, og hva de betaler for i dag",
          "Sikre at gjelden faktisk er kommittert på 6 ganger EBITDA, og hva covenantene tåler",
          "Stresste planen: hva blir avkastningen ved 9 ganger exit og halv effekt av tiltakene",
          "Gå fra saken hvis kvalitetskontrollen tar mer enn fem millioner av de 90",
        ],
        fasit: `<p>Si oppdelingen først. En som fungerer: <b>hva vi må vite før vi byr</b>
          (due diligence), <b>hvordan vi strukturerer budet</b> (pris, earn-out, gjeld),
          <b>hva vi gjør de fem årene</b> (verdiskapingsplan), og <b>hvordan vi kommer ut</b>
          (exit). Det speiler strukturen din fra trinn to, og det merkes.</p>
          <p>Legg merke til hva som er det mest kraftfulle grepet i hele listen: <b>å betale
          mindre</b>. Ett multippeltrinn ned på inngangen — 9 i stedet for 10 — er 90 millioner
          lavere pris. Med samme gjeld er egenkapitalen 270 i stedet for 360, og hele
          avkastningsregnestykket får den marginen planen mangler. PE-kandidater glemmer ofte at
          prisen er en variabel de kontrollerer, mens driften er noe de bare kan håpe på.</p>
          <p><b>Sterkt mot middels:</b> et middels svar lister due diligence-punkter. Et sterkt svar
          har grep i alle fire gruppene, kobler minst ett av dem til et tall fra casen, og tør å ha
          et walk-away-punkt på listen.</p>`,
        krav: [
          "Du sier oppdelingen din før du lister, og den følger strukturen din.",
          "Du har grep i både due diligence, budstruktur, verdiskaping og exit.",
          "Minst ett grep angriper prisen, ikke bare driften.",
          "Du foreslår en strukturell risikodeling, som earn-out eller binding av nøkkelpersoner.",
          "Du formulerer et walk-away-kriterium i stedet for å forutsette at handelen skal skje.",
        ],
        felle: "Å bare foreslå operative forbedringer. Verdiskapingsplanen på ark 3 er allerede full av dem, og den treffer akkurat kravet — marginen må komme fra prisen, strukturen eller risikodelingen, ikke fra enda et tiltak på samme liste.",
      },
      {
        art: "syntese",
        sek: 90,
        kort: "Svar",
        tittel: "Anbefalingen til investeringskomiteen",
        sp: `<p>Du står foran investeringskomiteen og har <b>ett minutt</b>. Gi anbefalingen din.</p>
          <p class="tiny">Skriv den slik du ville sagt den — ikke som notater.</p>`,
        fasit: `<p>Topp-ned, med tallet i første setning, og med et tydelig skille mellom
          «investér» og «investér til denne prisen».</p>
          <blockquote><p><b>«Sikring Nord er riktig type selskap, men 10 ganger er feil pris. På
          900 millioner må EBITDA opp fra 90 til 120 på fem år bare for å treffe kravet på 2,5
          ganger — og verdiskapingsplanen deres leverer nøyaktig 30 millioner. Det er null
          margin. Jeg anbefaler et bud på 9 ganger, med earn-out.»</b></p>
          <p>Tre grunner. For det første er inntjeningen mindre varig enn den ser ut: fornyelsesgraden
          har falt fra 94 til 91 prosent, og de fem største kundene har gått fra 21 til 33 prosent
          av omsetningen. For det andre er verdiskapingsplanen troverdig, men uten slakk — og en
          plan som må lykkes hundre prosent for å nå minimumsavkastningen, er ikke en plan, det er
          en forutsetning. For det tredje bærer strukturen mye gjeld: seks ganger EBITDA. Det er
          derfor 2,5 ganger i det hele tatt er mulig — ugearet ville de samme tallene gitt 1,33
          ganger — men det er også derfor ett multippeltrinn ned ved exit tar avkastningen fra 2,5
          til 2,17, altså under kravet.</p>
          <p>Konkret: by 9 ganger, altså 810 millioner. Legg 60 millioner av prisen i en earn-out
          knyttet til fornyelsesgraden, så familien bærer den risikoen. Og bruk to uker på tre
          ting før signering: en kvalitetskontroll av EBITDA, en gjennomgang av de fem største
          kontraktene, og en bekreftelse på at prisreguleringsklausulene faktisk hjemler
          prisøkningen på 12 millioner.</p>
          <p>Exit-ruten ser jeg som et salg til en større europeisk aktør eller et sekundærsalg til
          et større fond. Går ikke prisen ned, ville jeg gått fra saken — det er ingen skam i å
          tape en auksjon på et selskap der hele oppsiden ligger i at multippelen skal stige.»</p></blockquote>
          <p><b>Sterkt mot middels:</b> et middels svar sier ja eller nei til investeringen. Et
          sterkt svar sier <i>ja til selskapet, nei til prisen</i>, og oppgir prisen det ville sagt
          ja til. I PE er det nesten alltid det riktige svaret, og det er også det svaret en
          investeringskomité faktisk kan handle på.</p>`,
        krav: [
          "Svaret kommer i første setning, og skiller mellom selskapet og prisen.",
          "Du oppgir en pris eller multippel du ville budt, ikke bare at prisen er for høy.",
          "Du bruker tall fra casen: 120 millioner, planens 30, fornyelsesgraden, multippelfølsomheten.",
          "Du sier hva gjeldsgraden gjør både opp og ned.",
          "Du nevner exit-rute og et walk-away-punkt, og holder deg innenfor et minutt.",
        ],
        felle: "Å konkludere med at investeringen er attraktiv fordi markedet er lovregulert og inntektene gjentakende. Det gjør selskapet til en god plattform, men sier ingenting om avkastningen — og fondets spørsmål er aldri om selskapet er godt, men om prisen gir 2,5 ganger pengene.",
      },
    ],
  },
  {
    id: "estimering-varmepumper",
    kategori: "Market sizing",
    label: "Hvor stort er varmepumpemarkedet i Norge?",
    type: "Estimering",
    nivå: "Intro",
    firma: "Generisk",
    stil: "interviewer-led",
    minutter: 25,
    ch: [],
    blurb: "Bygges nedenfra med levetidstrikset: installert base delt på levetid, pluss vekst og nybygg. Trener oppsettet, avrundingen og sanity-sjekken.",
    prompt: `<p>Klienten er et europeisk industrikonsern som lager varmepumper. De vurderer å
      etablere egen salgs- og monteringsorganisasjon i Norge, og har bedt dere om ett tall før
      resten av analysen settes i gang.</p>
      <p><b>Hvor stort er det norske markedet for varmepumper til bolig, målt i kroner per år?</b></p>
      <p class="tiny">Ingen kalkulator. Si forutsetningene høyt, rund av åpent, og sanity-sjekk
      svaret til slutt.</p>`,
    bakgrunn: `<p>Estimeringscaser vurderes nesten aldri på om tallet er riktig. De vurderes på
      om <b>oppsettet</b> er riktig, om forutsetningene er sagt høyt og begrunnet, og om
      kandidaten sanity-sjekker svaret sitt. Wharton-casebooken er eksplisitt på at det å hoppe
      over sanity-sjekken er en av de raskeste måtene å miste intervjuerens tillit på.</p>
      <p>Varmepumper er valgt fordi de tvinger fram <b>levetidstrikset</b>, som løser en stor del
      av alle estimeringsoppgaver: <i>årlig marked = installert base delt på levetid</i>. Uten
      det grepet ender kandidaten med å estimere hvor mange som «kjøper i år», og det er et tall
      ingen har noen følelse for.</p>
      <p>Referansetallene i faktaarket er hentet fra SSB og er de samme runde tallene som er verdt
      å ha i hodet til enhver norsk estimeringsoppgave.</p>`,
    trinn: [
      {
        art: "oppklaring",
        sek: 90,
        tittel: "Hva må avklares før du regner?",
        sp: `<p>Hvilke spørsmål stiller du før du setter opp regnestykket?</p>`,
        fasit: `<p>I en estimeringscase er avklaringene <b>definisjonsspørsmål</b>. Regner du på
          feil størrelse, er alle mellomregninger bortkastet.</p>
          <ul>
            <li><b>Måler vi enheter eller kroner, og i hvilket ledd?</b> Utstyr fra fabrikk,
              eller utstyr pluss montering til sluttkunde? De to skiller seg med en faktor på
              nesten to.</li>
            <li><b>Bare bolig, eller også næringsbygg og hytter?</b> Prompten sier bolig — bekreft
              det, og si at du holder næring utenfor.</li>
            <li><b>Alle typer varmepumper?</b> Luft-luft koster 25 000 og væske-vann 200 000.
              Blander du dem uten å si det, blir gjennomsnittsprisen tilfeldig.</li>
            <li><b>Nysalg alene, eller også service og reservedeler?</b> Ettermarkedet er ofte
              like interessant som nysalget for en aktør som vurderer å etablere seg.</li>
          </ul>
          <p>To til tre spørsmål er nok. Deretter sier du hva du <i>velger</i>: «Jeg regner
          markedet for varmepumper til bolig, utstyr og montering til sluttkunde, alle typer, per
          år.» Det er selve avgrensningen intervjueren vurderer deg på.</p>`,
        krav: [
          "Du avklarer enhet og ledd i verdikjeden før du gjør noe annet.",
          "Du avgrenser hva som er utenfor — næringsbygg, hytter, ettermarked — og sier det høyt.",
          "Du stiller to til tre spørsmål, ikke en sjekkliste.",
          "Du oppsummerer avgrensningen din i én setning før du begynner å regne.",
        ],
        felle: "Å begynne å regne før det er avklart hva som telles. Halvveis ute i regnestykket oppdager man at man har blandet enheter og kroner, og da må alt gjøres om.",
      },
      {
        art: "struktur",
        sek: 150,
        tittel: "Sett opp ligningen",
        sp: `<p>Skriv regnestykket ditt <b>i symboler, før du har fått et eneste tall</b>. Si
          hvilken vei du bygger — ovenfra eller nedenfra — og hvorfor.</p>`,
        fasit: `<p>Dette er hele casen. Et sterkt oppsett har tre kilder til salg, ikke én:</p>
          <div class="formula">
            <div class="eq">Marked (kr) = Antall enheter solgt per år × Snittpris installert</div>
            <div class="eq">Enheter = Erstatningssalg + Nysalg til nye brukere + Nybygg</div>
            <div class="eq">Erstatningssalg = Installert base / Levetid</div>
            <div class="eq">Installert base = Antall småhus × Andel med varmepumpe</div>
          </div>
          <p><b>Levetidstrikset</b> — installert base delt på levetid — er det grepet som gjør
          oppgaven løsbar. Alternativet er å gjette hvor mange som «kjøper i år», og det er et
          tall ingen har intuisjon for. Installert base og levetid har man derimot en formening
          om.</p>
          <p>Merk hvilken enhet som er den riktige å bygge på: <b>bolig, ikke person</b>. En
          varmepumpe monteres per bolig. Og ikke alle boliger — en varmepumpe i en
          blokkleilighet er uvanlig, så avgrens til småhus (enebolig, rekkehus, tomannsbolig) og
          si at du gjør det.</p>
          <p>Si også avrundingsregelen din høyt: «Jeg runder til nærmeste hundretusen og flagger
          retningen underveis.» Det er en kvalitetsmarkør, ikke en unnskyldning.</p>`,
        krav: [
          "Du skriver ligningen i symboler før du setter inn tall.",
          "Du har tre kilder til salg — erstatning, økt penetrasjon og nybygg — ikke bare én.",
          "Du bruker levetidstrikset i stedet for å gjette årlig kjøpsrate.",
          "Du velger bolig som enhet, ikke person, og avgrenser til småhus med begrunnelse.",
          "Du sier hvordan du vil runde av, før du begynner.",
        ],
        felle: "Å bygge markedet ovenfra fra befolkningen: 5,6 millioner nordmenn ganger en andel. Varmepumper kjøpes per bolig, og bolig er ikke person — å velge feil enhet gir systematisk feil svar uansett hvor godt man regner videre.",
      },
      {
        art: "exhibit",
        sek: 120,
        tittel: "Faktaarket",
        sp: `<p>Intervjueren gir deg et faktaark. <b>Hvilke tall trenger du, og hvilke er der
          bare for å sanity-sjekke?</b></p>`,
        figur: `<table class="data">
            <tr><th>Norske referansetall (SSB)</th><th class="n">Verdi</th></tr>
            <tr><td>Befolkning</td><td class="n">5,6 mill.</td></tr>
            <tr><td>Husholdninger</td><td class="n">2,65 mill.</td></tr>
            <tr><td>Personer per husholdning</td><td class="n">2,1</td></tr>
            <tr><td>Boliger i småhus (enebolig, rekkehus, tomannsbolig)</td><td class="n">1,4 mill.</td></tr>
            <tr><td>Nye småhus ferdigstilt per år</td><td class="n">12 000</td></tr>
            <tr><td>Dagligvaremarkedet</td><td class="n">230 mrd kr</td></tr>
            <tr><td>Nyregistrerte personbiler per år</td><td class="n">185 000</td></tr>
            <tr><td>Gjennomsnittspris ny personbil</td><td class="n">450 000 kr</td></tr>
          </table>
          <table class="data">
            <tr><th>Bransjetall oppgitt av intervjueren</th><th class="n">Verdi</th></tr>
            <tr><td>Andel av småhus som har varmepumpe i dag</td><td class="n">60 %</td></tr>
            <tr><td>Årlig økning i den andelen</td><td class="n">+2 prosentpoeng</td></tr>
            <tr><td>Gjennomsnittlig levetid på en varmepumpe</td><td class="n">14 år</td></tr>
            <tr><td>Snittpris installert, utstyr og montering</td><td class="n">30 000 kr</td></tr>
          </table>`,
        fasit: `<p>Del arket i to i hodet med én gang, og si det høyt: <b>fire tall skal inn i
          regnestykket, fire er der for å sanity-sjekke svaret.</b></p>
          <ul>
            <li><b>Inn i regnestykket:</b> 1,4 millioner småhus, 60 prosent penetrasjon, 14 års
              levetid, +2 prosentpoeng i året, 12 000 nye småhus, og 30 000 kroner i pris. Alt
              annet er kontekst.</li>
            <li><b>Til sanity-sjekk:</b> dagligvaremarkedet på 230 milliarder er den beste
              norske målestokken for et forbrukermarked. Nybilsalget — 185 000 biler à 450 000
              kroner, altså rundt 83 milliarder — er den nest beste, fordi en varmepumpe og en bil
              er sammenlignbare varige goder.</li>
            <li><b>Fellen i arket:</b> husholdninger (2,65 millioner) og småhus (1,4 millioner)
              er to forskjellige tall, og bare det ene er riktig grunnlag. Griper du feil, dobler
              du markedet.</li>
          </ul>
          <p>Legg merke til at penetrasjonen på 60 prosent er oppgitt for <i>småhus</i>, ikke for
          husholdninger. Å lese den fotnoten er hele forskjellen.</p>`,
        krav: [
          "Du skiller regnetall fra sanity-sjekk-tall, og sier det høyt.",
          "Du ser at småhus og husholdninger er to ulike grunnlag, og velger riktig.",
          "Du merker deg at penetrasjonen gjelder småhus, ikke alle boliger.",
          "Du sier på forhånd hvilken målestokk du vil sanity-sjekke mot.",
        ],
        felle: "Å bruke 2,65 millioner husholdninger som grunnlag fordi det er det mest kjente tallet på arket. Varmepumper monteres i småhus, og småhus er 1,4 millioner. Feil grunnlag dobler svaret.",
      },
      {
        art: "regne",
        sek: 120,
        tittel: "Regn markedet", kort: "Markedet",
        sp: `<p>Bruk tallene fra faktaarket. <b>Hvor stort er det norske markedet for varmepumper
          til bolig, i millioner kroner per år?</b></p>
          <p class="tiny">Bygg det leddvis og si hvert delresultat høyt. Rund av åpent.</p>`,
        svar: 3000,
        enhet: "millioner kroner",
        toleranse: 0.1,
        fasit: `<p>Fire ledd, hvert med en enhet:</p>
          <div class="formula">
            <div class="eq">Installert base: 1 400 000 × 60 % = 840 000 varmepumper</div>
            <div class="eq">Erstatningssalg: 840 000 / 14 år = 60 000 enheter per år</div>
            <div class="eq">Økt penetrasjon: 1 400 000 × 2 prosentpoeng = 28 000 enheter per år</div>
            <div class="eq">Nybygg: 12 000 enheter per år</div>
            <div class="eq">Sum: 60 000 + 28 000 + 12 000 = 100 000 enheter per år</div>
            <div class="eq">Marked: 100 000 × 30 000 kr = <b>3 000 millioner kroner = 3 milliarder</b></div>
          </div>
          <p><b>Nå kommer delen som skiller et sterkt svar fra et middels: sanity-sjekken.</b>
          Gjør minst to, og si dem høyt.</p>
          <ul>
            <li><b>Mot noe kjent:</b> 3 milliarder er 1,3 prosent av dagligvaremarkedet på 230
              milliarder. For en varig forbruksvare som kjøpes hvert fjortende år, er det en
              plausibel størrelsesorden.</li>
            <li><b>Mot nybilsalget:</b> 185 000 biler à 450 000 kroner er rundt 83 milliarder.
              Varmepumpene er 3,6 prosent av det. Sjekk konsistensen: vi selger 54 prosent så
              mange enheter til 6,7 prosent av prisen, som gir 3,6 prosent. Det stemmer.</li>
            <li><b>Baklengs:</b> 3 milliarder fordelt på 1,4 millioner småhus er rundt 2 100
              kroner per småhus per år. Med en pumpe til 30 000 kroner som varer 14 år, blir det
              2 140 kroner i året. Konsistent.</li>
          </ul>
          <p>Og til slutt det som gjør deg interessant å snakke med: <b>hva skjer med markedet når
          penetrasjonen stopper?</b> 28 000 av de 100 000 enhetene kommer fra vekst i
          penetrasjonen, og den delen forsvinner ved metning. Men den installerte basen har da
          vokst til 80 prosent av 1,4 millioner, altså 1,12 millioner pumper, og erstatningssalget
          blir 80 000 i året. Med nybygg blir markedet 92 000 enheter — bare 8 prosent lavere.
          <i>Markedet er langt mer robust enn det ser ut,</i> fordi erstatningsbasen vokser i takt
          med at veksten forsvinner. Det er en innsikt, ikke et regnestykke.</p>`,
        krav: [
          "Du sier enheten på hvert delresultat underveis — enheter, år, kroner.",
          "Du har med alle tre kildene til salg, ikke bare erstatningssalget.",
          "Du sanity-sjekker mot minst én kjent norsk størrelse, og sier tallet høyt.",
          "Du krysspeiler baklengs: svaret delt på antall boliger skal stemme med pris delt på levetid.",
          "Du sier noe om hva som skjer med markedet framover, ikke bare hva det er i dag.",
        ],
        felle: "Å levere 3 milliarder uten sanity-sjekk. Wharton er eksplisitt på at det er en av de raskeste måtene å miste intervjuerens tillit — og sjekken tar tjue sekunder.",
      },
      {
        art: "ide",
        sek: 120,
        tittel: "Hva ville du sjekket videre?",
        sp: `<p>Tallet er et anslag. <b>List så mange ting du klarer på to minutter</b> som ville
          gjort det bedre, eller som klienten trenger i tillegg. Én per linje.</p>`,
        liste: [
          "Skille luft-luft, luft-vann og væske-vann — prisen spenner fra 25 000 til 200 000 kroner",
          "Sjekke penetrasjonen mot SSBs statistikk over energibruk i husholdninger i stedet for å anta 60 prosent",
          "Sjekke om levetiden på 14 år stemmer — den bestemmer nesten hele erstatningsmarkedet alene",
          "Krysspeile mot importstatistikk fra SSB på varenummeret for varmepumper",
          "Krysspeile bunn-opp mot antall installatørbedrifter og hvor mange jobber hver rekker i året",
          "Legge inn leiligheter og blokk, som er utelatt helt i dagens avgrensning",
          "Legge inn hytter og næringsbygg som egne segmenter",
          "Dele markedet i utstyr og montering — ulike konkurrenter, ulik margin, ulik strategi",
          "Skille ut service, vedlikehold og reservedeler som en egen og mer stabil inntektsstrøm",
          "Sjekke hvordan strømprisen svinger etterspørselen — dette er et konjunkturmarked",
          "Sjekke Enova-tilskudd og andre støtteordninger, som flytter etterspørselen i sprang",
          "Sjekke geografien: luft-luft-pumper virker dårligere i kaldt klima, så Nord-Norge er annerledes",
          "Sjekke hvor mye av erstatningssalget som håndteres som reparasjon i stedet for nykjøp",
          "Sjekke markedsandelene til de etablerte importørene og kjedene før man snakker om inngang",
        ],
        fasit: `<p>Del i tre før du lister: <b>gjør estimatet mer presist</b> (segmentere,
          verifisere forutsetninger, krysspeile), <b>utvid avgrensningen</b> (hytter, næring,
          ettermarked) og <b>gjør det beslutningsrelevant</b> (marginer, kanaler, konkurrenter,
          støtteordninger).</p>
          <p>Prioritér etter hvilken forutsetning som flytter svaret mest. Her er det to:
          <b>levetiden</b>, fordi den alene bestemmer 60 av de 100 000 enhetene, og
          <b>produktmiksen</b>, fordi prisen spenner fra 25 000 til 200 000 kroner. Endrer du
          levetiden fra 14 til 10 år, går markedet fra 3 til 3,7 milliarder. Det er den typen
          følsomhet du bør si høyt.</p>`,
        krav: [
          "Du grupperer før du lister, og gruppene svarer på ulike behov.",
          "Du peker ut hvilken forutsetning som er mest følsom, og kvantifiserer følsomheten.",
          "Minst én idé krysspeiler estimatet mot en uavhengig kilde.",
          "Minst én idé handler om hva klienten faktisk skal bruke tallet til.",
        ],
        felle: "Å liste flere segmenteringer uten å si hvilken som betyr noe. En modell med tolv segmenter er ikke mer presis enn en med tre — feilen ligger i forutsetningene, ikke i oppdelingen.",
      },
      {
        art: "syntese",
        sek: 90,
        tittel: "Anbefalingen",
        sp: `<p>Klienten har <b>ett minutt</b>. Gi svaret og hva det betyr.</p>`,
        fasit: `<p>Tallet først, spennet med, så hva det betyr for beslutningen.</p>
          <blockquote><p><b>«Det norske markedet for varmepumper til bolig er rundt 3 milliarder
          kroner i året — omtrent 100 000 enheter til 30 000 kroner installert. Jeg vil si
          2,5 til 3,5 milliarder, der usikkerheten ligger i levetiden og i produktmiksen.»</b></p>
          <p>Slik kom jeg dit: 1,4 millioner småhus, 60 prosent har allerede pumpe, det gir en
          installert base på 840 000. Med 14 års levetid er erstatningssalget 60 000 i året. Legg
          til 28 000 fra at penetrasjonen vokser to prosentpoeng årlig, og 12 000 fra nybygg —
          100 000 enheter.</p>
          <p>Sanity-sjekken holder: det er 1,3 prosent av dagligvaremarkedet, og 3,6 prosent av
          nybilsalget. For et varig gode som byttes hvert fjortende år, er det riktig
          størrelsesorden.</p>
          <p>Det viktigste for dere er ikke tallet, men sammensetningen: 60 prosent av markedet er
          allerede erstatningssalg til folk som har hatt en pumpe før. Det er et
          <i>gjenkjøpsmarked</i>, ikke et vekstmarked, og det betyr at installatørnettverket og
          merkevaren betyr mer enn å overbevise nye kunder. Det jeg ville gjort videre, er å dele
          de 3 milliardene i utstyr og montering — de har helt ulike konkurrenter, og det avgjør
          hvor dere skal inn.»</p></blockquote>`,
        krav: [
          "Du gir tallet med et spenn, og sier hvor usikkerheten ligger.",
          "Du gjengir oppsettet på tjue sekunder, ikke hele regnestykket.",
          "Du sier sanity-sjekken høyt som en del av svaret.",
          "Du trekker en strategisk konsekvens av sammensetningen, ikke bare av størrelsen.",
          "Du holder deg innenfor ett minutt.",
        ],
        felle: "Å presentere et tall med fire siffer. «3,18 milliarder» signaliserer at du ikke har forstått hvor usikkerheten ligger. «Rundt 3 milliarder, spenn 2,5 til 3,5» signaliserer at du har.",
      },
    ],
  },
  {
    id: "ms-bensinstasjoner-usa",
    kategori: "Market sizing",
    label: "Hvor mange bensinstasjoner finnes i USA?",
    type: "Estimering", nivå: "Avansert", firma: "Implement", stil: "interviewer-led",
    minutter: 30, ch: [7, 15],
    blurb: "Arketypen for tilbud møter etterspørsel. Regn behovet, regn kapasiteten per stasjon, og del. Hele casen avgjøres av ett tall folk setter altfor høyt.",
    prompt: `<p>Intervjueren gir deg én setning og ingen tall:</p>
      <p><b>«Hvor mange bensinstasjoner finnes det i USA?»</b></p>
      <p>Du har papir og penn. Ingen bransjerapport, ingenting å slå opp i — bare det du vet om et land med drøyt tre hundre millioner innbyggere.</p>`,
    bakgrunn: `<p>Dette er en ekte intervjucase, gitt hos Implement. Den er verdt å kunne fordi den tvinger fram
      <b>begge sider av regnestykket</b>: hvor mange fyllinger som trengs, og hvor mange én stasjon rekker over.
      De fleste estimeringsoppgaver kan løses ved å multiplisere seg nedover fra befolkningen. Denne kan ikke det.</p>
      <p>Det virkelige antallet er <b>omtrent 145 000</b> stasjoner. En godt bygget kjede lander innenfor ti prosent
      av det — men bare hvis man setter utnyttelsesgraden riktig, og det er der nesten alle bommer.</p>`,
    trinn: [
      { art: "oppklaring", sek: 60, tittel: "Hva teller vi?",
        sp: `<p>Før du regner ett tall: hva må avklares?</p>`,
        fasit: `<p>Tre spørsmål, og de tar tjue sekunder til sammen:</p>
          <ul>
            <li><b>Hva er en bensinstasjon?</b> Teller vi bare bemannede stasjoner, eller også ubemannede automater? Teller vi truckstops langs motorveien? Sier intervjueren ingenting, definer selv og si det høyt: «Jeg teller alle utsalgssteder der en personbil kan fylle drivstoff.»</li>
            <li><b>Bensin alene, eller alt drivstoff?</b> Diesel og elbillading endrer bildet.</li>
            <li><b>Hele USA, i dag?</b> Geografi og tidspunkt.</li>
          </ul>
          <p><b>Og så det viktigste — si framgangsmåten før du begynner:</b> «Jeg vil regne dette fra to sider.
          Først hvor mange fyllinger som etterspørres i året, så hvor mange fyllinger én stasjon rekker over.
          Antall stasjoner er den ene delt på den andre.»</p>`,
        krav: [
          "Du definerer enheten før du regner, og sier definisjonen høyt.",
          "Du sier at du skal møtes fra to sider — det er selve strukturen, og den skal komme først.",
          "Du bruker under et minutt. Oppklaring er ikke en øvelse i å stille mange spørsmål.",
          "Du setter en definisjon selv når intervjueren ikke gir deg en.",
        ],
        felle: "Å begynne på befolkningstallet med en gang. Uten en definisjon av hva som telles, vet verken du eller intervjueren hva svaret betyr." },

      { art: "struktur", sek: 120, tittel: "Legg opp begge sidene",
        sp: `<p>Skriv kjeden for begge sider. Hvilke ledd må du sette forutsetninger for?</p>`,
        fasit: `<p><b>Etterspørselssiden</b> — fra folk til fyllinger:</p>
          <div class="formula"><div class="eq">Befolkning → biler → kjørelengde per bil → rekkevidde per tank → fyllinger per bil per år → fyllinger totalt</div></div>
          <p><b>Tilbudssiden</b> — fra én stasjon til kapasitet:</p>
          <div class="formula"><div class="eq">Pumper per stasjon × fyllinger per pumpe per time × åpningstimer × <b>utnyttelsesgrad</b> × 365</div></div>
          <p>Og til slutt: <b>antall stasjoner = fyllinger totalt / fyllinger per stasjon</b>.</p>
          <p>Legg merke til hvilket ledd som bærer mest usikkerhet. Det er ikke antall biler, og det er ikke
          hvor lang tid en fylling tar. Det er <b>utnyttelsesgraden</b> — hvor stor del av åpningstiden pumpene
          faktisk er i bruk. Si det høyt allerede nå, så vet intervjueren at du vet hvor det gjør vondt.</p>`,
        krav: [
          "Begge kjedene er skrevet ut, ikke bare den ene.",
          "Utnyttelsesgraden står som et eget ledd — den er ikke gjemt inne i «kapasitet».",
          "Du sier hvilket ledd som er mest usikkert før du begynner å regne.",
          "Du sier hvordan de to sidene settes sammen til slutt.",
        ],
        felle: "Å regne tilbudssiden som ren teoretisk kapasitet. En stasjon med åtte pumper åpen seksten timer kan i teorien betjene halvannet tusen biler i døgnet. Ingen stasjon gjør det." },

      { art: "regne", sek: 120, tittel: "Etterspørselssiden", kort: "Etterspørsel",
        sp: `<p>Hvor mange fyllinger etterspørres i USA i løpet av et år? Svar i milliarder.</p>
          <p class="tiny">Sett forutsetningene selv, og si hver av dem høyt.</p>`,
        svar: 8.25, enhet: "milliarder fyllinger per år", toleranse: 0.2,
        fasit: `<div class="worked"><span class="wh">Gjennomregnet</span>
          <p><b>Biler:</b> 330 millioner innbyggere. USA har omtrent én bil per 1,3 innbygger, så rundt
          <b>250 millioner</b> personbiler. Rundt tall, og godt nok.</p>
          <p><b>Fyllinger per bil per år:</b> en amerikansk bil kjører grovt 20 000 km i året. En tank rekker
          omtrent 600 km. Det gir 20 000 / 600 ≈ <b>33 fyllinger</b> i året, altså i overkant av annenhver uke.
          Det høres riktig ut, og den sjekken er verdt å si høyt.</p>
          <div class="formula"><div class="eq">250 millioner × 33 = <b>8,25 milliarder fyllinger per år</b></div></div>
          </div>
          <p><b>Sterkt mot middels:</b> et middels svar gjetter «fyller en gang i uka» og lander på 13 milliarder.
          Et sterkt svar utleder frekvensen av kjørelengde og rekkevidde, som begge er størrelser man kan noe om
          — og sier deretter «det blir omtrent annenhver uke, som stemmer med hvordan folk faktisk fyller».</p>`,
        krav: [
          "Frekvensen utledes av kjørelengde og rekkevidde, ikke gjettes direkte.",
          "Du sier hver forutsetning høyt, med enhet.",
          "Du runder til vennlige tall og sier at du gjør det.",
          "Du sanity-sjekker frekvensen mot egen erfaring: annenhver uke er troverdig, hver dag er det ikke.",
        ],
        felle: "Å bruke antall førerkort i stedet for antall biler. Det er bilen som fylles, ikke sjåføren, og i USA er det flere biler enn husholdninger." },

      { art: "regne", sek: 120, tittel: "Tilbudssiden — og tallet alle setter for høyt", kort: "Tilbud",
        sp: `<p>Hvor mange fyllinger rekker <b>én</b> bensinstasjon over i løpet av et år?</p>
          <p class="tiny">Dette leddet avgjør hele svaret. Tenk på en stasjon du har stått på.</p>`,
        svar: 56000, enhet: "fyllinger per stasjon per år", toleranse: 0.25,
        fasit: `<div class="worked"><span class="wh">Gjennomregnet</span>
          <p><b>Teoretisk kapasitet:</b> 8 pumper. En fylling tar rundt 5 minutter med betaling, altså 12 per pumpe
          per time. Åpent 16 timer.</p>
          <div class="formula"><div class="eq">8 × 12 × 16 = 1 536 fyllinger per døgn — i teorien</div></div>
          <p><b>Og her ligger hele casen.</b> Ingen bensinstasjon har kø fra morgen til kveld. Den står tom mesteparten
          av dagen, med rush om morgenen og ettermiddagen. En realistisk utnyttelsesgrad er <b>rundt 10 prosent</b>,
          ikke 25 og slett ikke 100.</p>
          <div class="formula">
            <div class="eq">1 536 × 10 % ≈ 154 fyllinger per døgn</div>
            <div class="eq">154 × 365 ≈ <b>56 000 fyllinger per stasjon per år</b></div>
          </div>
          <p><b>Hvorfor så lavt?</b> Fordi en bensinstasjon ikke er en gjennomstrømningsbedrift. Den er en
          <b>dekningsbedrift</b> — den ligger der den ligger fordi noen kjører forbi, ikke fordi den skal utnyttes
          maksimalt. Det er derfor det er så mange av dem.</p>
          </div>
          <p><b>Sterkt mot middels:</b> middels regner teoretisk kapasitet og lander på 25 prosent fordi det
          «høres forsiktig ut». Sterkt sier at stasjonen er tom store deler av døgnet, setter 10 prosent, og
          <i>begrunner det med forretningsmodellen</i>.</p>`,
        krav: [
          "Utnyttelsesgraden settes eksplisitt, ikke gjemt bort i et rundt tall.",
          "Du begrunner den lave graden med hva slags bedrift dette er.",
          "Du regner per døgn før du ganger opp til år — det gjør tallet sjekkbart.",
          "Du sier at dette er leddet med størst usikkerhet.",
        ],
        felle: "Å sette utnyttelsen til 50 prosent eller mer. Da får du fire ganger for få stasjoner, og hele svaret ryker på ett tall." },

      { art: "regne", sek: 60, tittel: "Sett de to sammen", kort: "Svar",
        sp: `<p>Hvor mange bensinstasjoner finnes det i USA?</p>`,
        svar: 147000, enhet: "bensinstasjoner", toleranse: 0.25,
        fasit: `<div class="formula">
            <div class="eq">8,25 milliarder / 56 000 ≈ <b>147 000 bensinstasjoner</b></div>
            <div class="where">Regn det som 8,25 × 10<sup>9</sup> delt på 5,6 × 10<sup>4</sup>: mantissen gir
              8,25 / 5,6 ≈ 1,47, og tierpotensen 10<sup>9−4</sup> = 10<sup>5</sup>. Altså 1,47 × 10<sup>5</sup>.</div>
          </div>
          <p><b>Fasit fra virkeligheten:</b> det faktiske tallet er omtrent <b>145 000</b>. Kjeden treffer innenfor
          halvannen prosent — ikke fordi hvert ledd var riktig, men fordi feilene er små og går i hver sin retning.</p>
          <p>Det er verdt å si høyt at presisjonen er tilfeldig. Du har bygget et forsvarlig anslag i riktig
          størrelsesorden. At det traff så godt, er flaks — men <i>strukturen</i> var ikke flaks.</p>`,
        krav: [
          "Du regner mantisse og tierpotens hver for seg.",
          "Du oppgir enheten.",
          "Du sier at svaret er en størrelsesorden, ikke en måling.",
          "Du gjør delingen riktig vei: totalt behov delt på kapasitet per enhet.",
        ],
        felle: "Å snu brøken. Fyllinger per stasjon delt på totale fyllinger gir et tall nær null, og det burde stoppe deg umiddelbart — sjekk alltid at svaret har en rimelig størrelsesorden." },

      { art: "syntese", sek: 60, tittel: "Si svaret",
        sp: `<p>Intervjueren spør: «Så hva er svaret ditt?» Du har ett minutt.</p>`,
        fasit: `<blockquote><p><b>«Rundt 150 000 bensinstasjoner.</b> Jeg kom fram til det ved å møte tallet fra to sider.</p>
          <p>På etterspørselssiden: 250 millioner biler som fyller omtrent 33 ganger i året, altså 8 milliarder
          fyllinger. Frekvensen utledet jeg av 20 000 kilometer i året og 600 kilometer på tanken.</p>
          <p>På tilbudssiden: en stasjon med åtte pumper kunne i teorien tatt 1 500 biler i døgnet, men står tom
          mesteparten av tiden. Med ti prosent utnyttelse blir det rundt 56 000 fyllinger i året per stasjon.</p>
          <p><b>Det tallet jeg er minst sikker på, er utnyttelsesgraden.</b> Halverer jeg den, dobles antallet
          stasjoner. Så hvis jeg skulle sjekke én ting med ekte data, ville det vært hvor mange biler en
          gjennomsnittsstasjon faktisk betjener i døgnet.»</p></blockquote>
          <p><b>Sterkt mot middels:</b> middels sier tallet. Sterkt sier tallet, hvilken forutsetning som bærer
          det, og hva som ville endret svaret mest — på under ett minutt.</p>`,
        krav: [
          "Tallet kommer først, avrundet til noe man kan huske.",
          "Begge sider av regnestykket oppsummeres på én setning hver.",
          "Du navngir det mest usikre leddet uoppfordret.",
          "Du sier hva du ville sjekket først med ekte data.",
          "Du holder deg innenfor ett minutt.",
        ],
        felle: "Å ramse opp alle mellomregningene på nytt. Intervjueren så deg gjøre dem — det de vil vite er svaret og hvor skjørt det er." },
    ],
  },
  {
    id: "ms-bensinstasjoner-norge",
    kategori: "Market sizing",
    label: "Hvor mange bensinstasjoner finnes det i Norge?",
    type: "Estimering",
    nivå: "Intro",
    firma: "Generisk",
    stil: "interviewer-led",
    minutter: 20,
    ch: [],
    blurb: "Grunnformen: bygg etterspørselen i fyllinger per år, bygg kapasiteten til én stasjon, og del. Den norske vrien er at en tredjedel av bilparken er elektrisk og ikke fyller i det hele tatt.",
    prompt: `<p>Du sitter i andregangsintervju. Intervjueren legger fra seg pennen og sier:</p>
      <p><b>«Hvor mange bensinstasjoner finnes det i Norge?»</b></p>
      <p class="tiny">Ingen kalkulator, ingen faktaark. Du får de tallene du ber om, hvis du sier
      hvorfor du trenger dem. Tenk høyt.</p>`,
    bakgrunn: `<p>Dette er den mest kjente formen for market sizing, og den som skiller best,
      fordi den ikke kan løses med én kjede av multiplikasjoner. Du må bygge <b>to
      regnestykker</b> og la dem møtes:</p>
      <div class="formula">
        <div class="eq">Etterspørsel: hvor mange fyllinger trenger landet i året?</div>
        <div class="eq">Tilbud: hvor mange fyllinger rekker én stasjon i året?</div>
        <div class="eq">Antall stasjoner = Etterspørsel / Kapasitet per stasjon</div>
      </div>
      <p>Kapasitetssiden er den som skiller. Der må du forlate befolkningstallene og se for deg
      <i>én pumpe i drift</i>: hvor lang tid tar en fylling, hvor mange pumper står det, hvor
      mange timer er det åpent, og — det avgjørende — <b>hvor stor del av tiden står pumpa
      faktisk i bruk?</b></p>
      <p>Den norske versjonen har en felle den amerikanske ikke har: <b>rundt en tredjedel av
      personbilene er elbiler</b>, og de fyller ikke bensin. Kandidater som starter på 2,9
      millioner biler og glemmer det, overvurderer etterspørselen med nesten femti prosent.</p>`,
    trinn: [
      {
        art: "oppklaring",
        sek: 90,
        tittel: "Hva er det egentlig vi teller?",
        sp: `<p>Før du regner noe som helst: hvilke spørsmål stiller du, og hva velger du å
          holde utenfor?</p>`,
        fasit: `<p>I en estimeringscase er avklaringene <b>definisjonsspørsmål</b>. Regner du på
          feil størrelse, er alle mellomregninger bortkastet.</p>
          <ul>
            <li><b>Hva er en «bensinstasjon»?</b> Et bemannet anlegg med butikk, eller teller vi
              også ubemannede automatstasjoner som Uno-X? De to gir svar som skiller seg med
              nesten det dobbelte. Jeg teller <i>alle steder der en privatbil kan fylle
              drivstoff</i>, bemannet eller ikke.</li>
            <li><b>Geografi:</b> hele Norge, fastland og øyer. Ikke Svalbard.</li>
            <li><b>Tidsrom:</b> antall stasjoner i drift i dag, ikke et gjennomsnitt over tid og
              ikke en framskrivning.</li>
            <li><b>Hva holdes utenfor?</b> Rene ladestasjoner uten drivstoffpumpe — de er et annet
              marked. Marinaer og flyplasser også. Og jeg regner på <i>personbiler</i>: varebiler,
              lastebiler og busser fyller i stor grad på egne dieselanlegg og truckstopp, så jeg
              lar dem ligge og flagger at svaret mitt da blir litt for lavt.</li>
          </ul>
          <p>Si deretter avgrensningen i én setning: <b>«Jeg teller alle drivstoffstasjoner i
          Norge i dag som betjener personbiler, bemannet og ubemannet, og jeg holder tunge
          kjøretøy og rene ladepunkter utenfor.»</b> Det er selve avgrensningen intervjueren
          vurderer deg på — ikke tallet.</p>`,
        krav: [
          "Du definerer enheten: hva som teller som én stasjon, og at automatstasjoner er med.",
          "Du setter geografi og tidsrom eksplisitt — Norge i dag, ikke et snitt over år.",
          "Du sier hva som holdes utenfor, og hvilken vei det trekker svaret ditt.",
          "Du oppsummerer avgrensningen i én setning før du begynner å regne.",
          "Du bruker maks halvannet minutt. Avklaringene skal rydde, ikke utsette.",
        ],
        felle: "Å stille åtte spørsmål på rad uten å si hva svaret skal brukes til. To til tre spørsmål med begrunnelse leses som struktur; åtte uten begrunnelse leses som at du utsetter å tenke.",
      },
      {
        art: "struktur",
        sek: 150,
        tittel: "Legg opp begge sider",
        sp: `<p>Skriv opp regnestykket <b>i symboler, før du har et eneste tall</b>. Legg opp
          begge sider — etterspørsel og kapasitet — og si <b>hvilken av dem du tror er
          bindende</b>.</p>`,
        fasit: `<p>Dette er hele casen. Et sterkt oppsett har to ligninger som møtes i en tredje:</p>
          <div class="formula">
            <div class="eq"><b>Etterspørsel</b> = Fossilbiler × Kilometer per år × Liter per km / Liter per fylling</div>
            <div class="eq"><b>Kapasitet per stasjon</b> = Pumper × Fyllinger per pumpe per time × Åpningstimer per år × Utnyttelsesgrad</div>
            <div class="eq"><b>Antall stasjoner</b> = Etterspørsel / Kapasitet per stasjon</div>
          </div>
          <p>Tre grep gjør oppsettet sterkt:</p>
          <ul>
            <li><b>Riktig enhet på etterspørselssiden.</b> Ikke personer — <i>biler</i>. Og ikke
              alle biler: bare de som faktisk fyller flytende drivstoff. Elbilene skal ut av
              grunnlaget før du ganger med noe som helst.</li>
            <li><b>Fyllinger, ikke liter, som fellesvaluta.</b> Det er fyllinger som opptar en
              pumpe, og det er pumpetid som er kapasiteten. Velger du liter, må du konvertere
              likevel.</li>
            <li><b>Utnyttelsesgrad som eget ledd.</b> Dette er leddet nesten alle glemmer, og det
              er det som avgjør svaret. En pumpe som var i bruk hver eneste åpningstime, ville
              hatt kø hele dagen. Legg leddet inn i ligningen med én gang, så husker du å sette
              tall på det.</li>
          </ul>
          <p><b>Hvilken side er bindende?</b> Si det høyt, for svaret er ikke opplagt.
          Etterspørselen er hard: nordmenn kjører det de kjører. Kapasiteten per stasjon er myk:
          en stasjon <i>kunne</i> tatt mange ganger så mange biler. Det betyr at antallet
          bensinstasjoner i praksis ikke settes av kapasitet, men av <b>dekning</b> — folk vil ha
          en stasjon i nærheten. Jeg regner likevel kapasitetsveien, fordi den gir meg et gulv, og
          så sier jeg til slutt at det virkelige tallet ligger over.</p>`,
        krav: [
          "Du skriver begge ligningene i symboler før du setter inn tall.",
          "Du velger bil som enhet, ikke person, og trekker ut elbilene med begrunnelse.",
          "Du har utnyttelsesgrad som eget ledd i kapasitetsligningen, ikke gjemt i et anslag.",
          "Du tar stilling til hvilken side som binder, og sier hvorfor du likevel regner kapasitetsveien.",
          "Du sier avrundingsregelen din høyt før du begynner: «Jeg runder til vennlige tall og flagger retningen.»",
        ],
        felle: "Å bare bygge etterspørselssiden og så gjette antall fyllinger per stasjon i ett jafs. Da har du ikke løst oppgaven, du har flyttet den. Kapasiteten skal bygges nedenfra fra én pumpe, akkurat som etterspørselen bygges nedenfra fra én bil.",
      },
      {
        art: "regne",
        sek: 120,
        tittel: "Etterspørselssiden", kort: "Etterspørsel",
        sp: `<p>Norge har <b>2,9 millioner personbiler</b>, hvorav <b>0,95 millioner er
          elbiler</b>. En bil kjører rundt <b>12 000 km i året</b> og bruker <b>0,6 liter per
          mil</b>. Folk fyller i snitt <b>36 liter</b> om gangen.</p>
          <p><b>Hvor mange fyllinger gjør norske personbiler til sammen i året, i millioner?</b></p>
          <p class="tiny">Bygg det leddvis og si enheten på hvert delresultat høyt.</p>`,
        svar: 40,
        enhet: "millioner fyllinger per år",
        toleranse: 0.15,
        fasit: `<p>Fire ledd, hvert med sin enhet:</p>
          <div class="formula">
            <div class="eq">Fossilbiler: 2,9 mill − 0,95 mill = 1,95 mill ≈ <b>2,0 millioner biler</b></div>
            <div class="eq">Drivstoff per bil: 12 000 km × 0,06 l/km = <b>720 liter per år</b></div>
            <div class="eq">Fyllinger per bil: 720 / 36 = <b>20 fyllinger per år</b></div>
            <div class="eq">Totalt: 2,0 mill × 20 = <b>40 millioner fyllinger per år</b></div>
          </div>
          <p><b>Avrundingen:</b> jeg rundet 1,95 opp til 2,0 millioner — det er 2,6 prosent opp, og
          jeg sier det høyt. Til gjengjeld gjør det hele resten av regnestykket til hoderegning:
          2 ganger 20 er 40. Det er hele poenget med avrunding, og det er derfor jeg gjør den
          <i>tidlig</i>, på et ledd som skal ganges videre.</p>
          <p><b>Dette skiller et sterkt svar fra et middels:</b></p>
          <ul>
            <li><b>Middels</b> starter på 2,9 millioner biler og får 58 millioner fyllinger. Feilen
              er ikke aritmetisk, den er strukturell: nesten en tredjedel av norske personbiler
              fyller ikke drivstoff i det hele tatt. Et sterkt svar trekker ut elbilene <i>uten å
              bli minnet på det</i>, og sier hvorfor.</li>
            <li><b>Middels</b> gjetter «folk fyller en gang i uka» og lander på 52 fyllinger.
              Sterkt bygger frekvensen fra kjørelengde og forbruk, slik at tallet er
              <i>utledet</i> og ikke husket. 20 fyllinger i året er én hver tredje uke — sjekk det
              mot din egen erfaring før du går videre.</li>
            <li><b>Sterkt</b> sier retningen på det som er utelatt: varebiler og lastebiler er ikke
              med, så 40 millioner er et gulv. «Jeg tror det virkelige tallet ligger 10–20 prosent
              over.»</li>
          </ul>`,
        krav: [
          "Du trekker elbilene ut av bilparken før du ganger, og sier hvorfor.",
          "Du utleder fyllefrekvensen fra kjørelengde og forbruk i stedet for å gjette den.",
          "Du sier enheten på hvert delresultat — biler, liter, fyllinger, per år.",
          "Du runder tidlig og flagger retningen: «1,95 opp til 2,0, altså litt for høyt.»",
          "Du sier at tunge kjøretøy er utelatt, og at 40 millioner derfor er et gulv.",
        ],
        felle: "Å bruke 2,9 millioner biler fordi det er drilltallet du kan utenat. Drilltallet er riktig — det er bare ikke grunnlaget for denne oppgaven. Det er nettopp slike tall som er farligst: de er lette å hente, og derfor får de gå ubehandlet.",
      },
      {
        art: "regne",
        sek: 120,
        tittel: "Tilbudssiden: hva rekker én stasjon?", kort: "Tilbud",
        sp: `<p>Nå glemmer du hele landet og ser for deg <b>én bensinstasjon</b>. Den har
          <b>4 pumper</b>. En fylling tar <b>5 minutter</b> fra bilen kjører inn til den kjører
          ut. Stasjonen har reell trafikk <b>16 timer i døgnet, 365 dager i året</b>.</p>
          <p><b>Hvor mange fyllinger betjener én stasjon i året?</b></p>
          <p class="tiny">Regn først taket, og korriger så for hvor mye av tiden pumpene faktisk
          er i bruk. Si begge tallene høyt.</p>`,
        svar: 30000,
        enhet: "fyllinger per stasjon per år",
        toleranse: 0.15,
        fasit: `<p>Fire ledd, og det siste er det som betyr noe:</p>
          <div class="formula">
            <div class="eq">Per pumpe per time: 60 / 5 = <b>12 fyllinger</b></div>
            <div class="eq">Åpningstimer: 16 × 365 = 5 840 ≈ <b>6 000 timer per år</b></div>
            <div class="eq">Teoretisk tak: 4 pumper × 12 × 6 000 = <b>288 000 fyllinger per år</b></div>
            <div class="eq">Ved 10 % utnyttelse: 288 000 × 0,10 = 28 800 ≈ <b>30 000 fyllinger per år</b></div>
          </div>
          <p><b>Hvor kommer de 10 prosentene fra?</b> Fra å se for deg stasjonen du kjørte forbi
          i går. Fire pumper, og som regel står det én bil ved én av dem. I rushtiden er alle
          fire opptatt og det står kø; klokka elleve på formiddagen er stasjonen tom. Et snitt
          rundt ti prosent er det du observerer. Femti prosent ville betydd kø ved to av fire
          pumper døgnet rundt — det finnes ikke.</p>
          <p><b>Dette skiller et sterkt svar fra et middels:</b></p>
          <ul>
            <li><b>Middels</b> leverer de 288 000 som svar. Det er ikke kapasiteten en stasjon
              <i>har</i>, det er kapasiteten den ville hatt hvis det sto kø hvert sekund den var
              åpen. Å levere et teoretisk tak som om det var et driftstall er den vanligste feilen
              på tilbudssiden, i alle varianter av denne casen.</li>
            <li><b>Sterkt</b> sier utnyttelsesgraden høyt <i>som en forutsetning</i>, ikke som et
              faktum, og oppgir følsomheten: «Ved 5 prosent utnyttelse får jeg 2 800 stasjoner, ved
              10 prosent 1 400, ved 20 prosent 700. Dette leddet bærer hele svaret, så det er her
              jeg ville brukt tid hvis vi skulle blitt presise.»</li>
            <li><b>Sterkt</b> krysspeiler mot noe fysisk: 30 000 fyllinger i året er 82 i døgnet,
              altså én bil hvert tolvte minutt gjennom 16 timer. Det er nøyaktig det tempoet du
              ser på en norsk stasjon. Da vet du at forutsetningen holder.</li>
          </ul>`,
        krav: [
          "Du regner det teoretiske taket først og sier eksplisitt at det er et tak, ikke et driftstall.",
          "Du setter en utnyttelsesgrad, begrunner den med noe du kan observere, og kaller den en forutsetning.",
          "Du oppgir følsomheten: hva svaret blir ved halvparten og ved det dobbelte.",
          "Du krysspeiler til fyllinger per døgn og sjekker at tempoet er gjenkjennelig.",
          "Du runder 5 840 timer til 6 000 og sier at du gjorde det.",
        ],
        felle: "Å hoppe over utnyttelsesgraden fordi tallet føles vilkårlig. Det er vilkårlig — og det er derfor det må sies høyt og testes med et spenn. Et ledd du ikke nevner, kan intervjueren ikke korrigere deg på; et ledd du nevner med et spenn, viser at du vet hvor usikkerheten sitter.",
      },
      {
        art: "regne",
        sek: 90,
        tittel: "La sidene møtes", kort: "Svar",
        sp: `<p>Du har <b>40 millioner fyllinger</b> i etterspørsel og <b>30 000 fyllinger</b> i
          kapasitet per stasjon.</p>
          <p><b>Hvor mange bensinstasjoner finnes det i Norge?</b></p>`,
        svar: 1300,
        enhet: "bensinstasjoner",
        toleranse: 0.15,
        fasit: `<div class="formula">
            <div class="eq">40 000 000 / 30 000 = 1 333 ≈ <b>rundt 1 300 bensinstasjoner</b></div>
          </div>
          <p>Sjekk enhetene før du sier tallet: fyllinger per år delt på fyllinger per stasjon per
          år gir stasjoner. Det går opp. Går det ikke opp, har du blandet et ledd.</p>
          <p><b>Nå kommer delen som skiller et sterkt svar fra et middels: sanity-sjekken.</b>
          Gjør minst to, og si dem høyt.</p>
          <ul>
            <li><b>Mot kommunekartet:</b> Norge har 357 kommuner. 1 300 stasjoner er 3,6 per
              kommune. Små distriktskommuner har én eller to, Oslo har flere titalls. Det henger
              sammen.</li>
            <li><b>Mot dagligvare:</b> Norge har rundt 3 900 dagligvarebutikker, altså én per
              1 400 innbyggere. Vårt svar gir én bensinstasjon per 4 300 innbyggere — en stasjon
              er altså tre ganger sjeldnere enn en matbutikk. Det stemmer med det du ser: alle
              nabolag har butikk, ikke alle har pumpe.</li>
            <li><b>Baklengs til kroner:</b> 40 millioner fyllinger à 36 liter er 1,44 milliarder
              liter. Til 20 kroner literen er det et drivstoffmarked på <b>rundt 29 milliarder
              kroner</b>, altså 12 prosent av dagligvaremarkedet på 230 milliarder. Fordelt på
              2,65 millioner husholdninger blir det 11 000 kroner i året. SSB oppgir transport til
              rundt 80 000 kroner per husholdning i året — drivstoff som en syvendedel av det, med
              bilkjøp, forsikring og kollektivreiser i resten, er helt plausibelt. Denne
              sjekken er uavhengig av alt i regnestykket, og det er derfor den er den beste.</li>
          </ul>
          <p><b>Og så det ærlige forbeholdet, som er selve innsikten:</b> 1 300 er et gulv, ikke et
          anslag. Det virkelige tallet ligger i størrelsesorden 1 500 til 1 800, og grunnen er
          strukturell: <i>bensinstasjoner bygges ikke etter kapasitetsbehov, de bygges etter
          dekningsbehov.</i> I et langt og tynt befolket land må det stå en stasjon i Lom selv om
          den bare har tolv kunder om dagen. Kapasitetsregnestykket forteller deg hvor mange
          stasjoner landet trenger; geografien forteller deg hvor mange det faktisk har. En
          kandidat som sier akkurat det, har forstått mer enn en kandidat som treffer tallet.</p>`,
        krav: [
          "Du sjekker at enhetene går opp før du sier tallet.",
          "Du gjør minst to sanity-sjekker, og minst én av dem er uavhengig av regnestykket.",
          "Du oppgir svaret som et spenn, ikke som ett tall med fire siffer.",
          "Du sier at kapasitetsmetoden gir et gulv, og forklarer hvorfor dekning trumfer kapasitet.",
          "Du bruker mindre enn halvannet minutt på hele delen — divisjonen er den enkle biten.",
        ],
        felle: "Å levere 1 333 stasjoner. Fire siffer signaliserer at du ikke har forstått at inngangstallene dine er anslag med tjue prosents usikkerhet. «Rundt 1 300, la oss si 1 200 til 1 600» signaliserer at du har.",
      },
      {
        art: "syntese",
        sek: 90,
        tittel: "Svaret på ett minutt",
        sp: `<p>Intervjueren har <b>ett minutt</b>. Gi tallet, den største usikkerheten, og
          sanity-sjekken.</p>`,
        fasit: `<p>Tallet først, metoden på tjue sekunder, usikkerheten og sjekken til slutt.</p>
          <blockquote><p><b>«Rundt 1 300 bensinstasjoner, og jeg vil si spennet er 1 200 til
          1 600. Jeg tror det virkelige tallet ligger i overkant av mitt, og jeg skal si
          hvorfor.»</b></p>
          <p>Jeg bygde det fra to sider. Etterspørselen: Norge har 2,9 millioner personbiler, men
          nesten en million er elbiler, så 2 millioner fyller drivstoff. De kjører 12 000 kilometer
          i året på 0,6 liter mila, altså 720 liter, og fyller 36 om gangen — 20 fyllinger per bil,
          40 millioner fyllinger totalt.</p>
          <p>Kapasiteten: fire pumper, fem minutter per fylling, 16 timer om dagen året rundt gir
          et tak på 288 000 fyllinger. Men en pumpe står ikke i bruk hele tiden — utnyttelsen er
          nærmere ti prosent, så en stasjon betjener rundt 30 000 fyllinger i året. Det er 82 biler
          i døgnet, én hvert tolvte minutt. Førti millioner delt på tretti tusen er 1 300.</p>
          <p><b>Den største usikkerheten er utnyttelsesgraden.</b> Ved fem prosent får jeg 2 800
          stasjoner, ved tjue prosent 700. Alt annet i regnestykket er tall jeg står inne for; dette
          ene leddet spenner over en faktor fire.</p>
          <p>Sanity-sjekken holder: 1 300 stasjoner er 3,6 per kommune, og det gir 29 milliarder
          kroner i drivstoffsalg — 11 000 kroner per husholdning i året, mot 80 000 kroner i samlede
          transportutgifter. Riktig størrelsesorden.</p>
          <p>Og det viktigste, hvis dette skulle brukes til noe: <i>antallet stasjoner styres ikke
          av kapasitet, det styres av dekning.</i> Kapasiteten per stasjon er rikelig — det er
          kravet om at det skal stå en pumpe i hver bygd som setter tallet. Det betyr også at når
          elbilandelen fortsetter å stige, er det ikke kapasitet nettet mister først, det er
          <i>lønnsomhet per stasjon</i>. De tynneste distriktsstasjonene faller ut lenge før
          etterspørselen tilsier det.»</p></blockquote>`,
        krav: [
          "Du sier tallet med spenn i første setning, og hvilken vei du tror du bommer.",
          "Du gjengir begge sider av regnestykket på tjue sekunder — ikke hvert mellomledd.",
          "Du peker ut ett ledd som den største usikkerheten, og kvantifiserer det.",
          "Du sier sanity-sjekken høyt som en del av svaret, ikke som en ettertanke.",
          "Du trekker en konsekvens av strukturen — dekning slår kapasitet — og holder ett minutt.",
        ],
        felle: "Å presentere tallet uten å si hvilken forutsetning som bærer det. Intervjueren vet at estimatet er grovt; det hun tester, er om du vet hvor det er grovt. Å peke på utnyttelsesgraden selv er verdt mer enn å treffe tallet.",
      },
    ],
  },
  {
    id: "ms-frisorsalonger-norge",
    kategori: "Market sizing",
    label: "Hvor mange frisørsalonger finnes det i Norge?",
    type: "Estimering",
    nivå: "Intro",
    firma: "Generisk",
    stil: "interviewer-led",
    minutter: 20,
    ch: [],
    blurb: "Samme mønster, men enheten er en stol og kapasiteten er klipp per stol per dag. Trener segmentering på to grupper og forskjellen på en fullbooket dag og en normal dag.",
    prompt: `<p>Klienten er et oppkjøpsfond som ser på en kjede av frisørsalonger. Før de bruker
      penger på en markedsanalyse, vil de vite om markedet i det hele tatt er stort nok.</p>
      <p><b>Hvor mange frisørsalonger finnes det i Norge?</b></p>
      <p class="tiny">Ingen kalkulator. Bygg begge sider av regnestykket og sanity-sjekk svaret.</p>`,
    bakgrunn: `<p>Casen er den samme formen som bensinstasjonene, men med to endringer som gjør
      den vanskeligere:</p>
      <ul>
        <li><b>Etterspørselen må segmenteres.</b> Menn og kvinner har helt ulik frekvens og helt
          ulik behandlingstid. Et snitt over hele befolkningen skjuler begge deler og gir et
          tilfeldig svar.</li>
        <li><b>Kapasitetsenheten er ikke bedriften, den er stolen.</b> En salong kan ha én stol
          eller ti. Regner du kapasitet per salong, må du gjette salongstørrelsen først, og da har
          du flyttet usikkerheten i stedet for å fjerne den. Regn per stol, og gang opp til
          salonger helt til slutt.</li>
      </ul>
      <p>Det er en generell regel verdt å ta med seg: <b>velg den minste enheten du har intuisjon
      om.</b> Du vet omtrent hvor lang tid en klipp tar. Du vet ikke hvor mange kunder en salong
      har i året.</p>`,
    trinn: [
      {
        art: "oppklaring",
        sek: 90,
        tittel: "Hva er det egentlig vi teller?",
        sp: `<p>Hvilke spørsmål stiller du, og hva holder du utenfor?</p>`,
        fasit: `<p>Fire avklaringer, og alle fire flytter svaret:</p>
          <ul>
            <li><b>Salonger eller stoler?</b> Det er to helt ulike tall — Norge har rundt tre
              ganger så mange stoler som salonger. Jeg regner meg fram til <i>stoler</i>, fordi det
              er den enheten kapasiteten faktisk sitter i, og deler på stoler per salong til
              slutt.</li>
            <li><b>Hva teller som en frisørsalong?</b> Bare virksomheter som klipper hår, eller
              også skjønnhetssalonger, negle- og hudpleiestudioer? Jeg avgrenser til <i>hår</i>, og
              sier det.</li>
            <li><b>Er hjemmefrisører med?</b> Enkeltpersonforetak som klipper på kjøkkenet regnes
              ikke som salong. Jeg holder dem utenfor på tilbudssiden, og trekker dem tilsvarende
              ut av etterspørselen.</li>
            <li><b>Geografi og tidsrom:</b> Norge, i drift i dag.</li>
          </ul>
          <p>Én setning før du regner: <b>«Jeg teller frisørsalonger i Norge i dag som klipper hår
          kommersielt, jeg regner meg dit via antall stoler, og jeg holder rene skjønnhetssalonger
          og hjemmefrisører utenfor.»</b></p>`,
        krav: [
          "Du skiller stol fra salong med én gang, og velger stolen som regneenhet med begrunnelse.",
          "Du avgrenser bransjen — hår, ikke all skjønnhetspleie.",
          "Du sier hva som holdes utenfor på begge sider, slik at etterspørsel og tilbud er konsistente.",
          "Du setter geografi og tidsrom eksplisitt.",
          "Du oppsummerer i én setning før du regner.",
        ],
        felle: "Å holde hjemmefrisører utenfor tilbudet, men la kundene deres bli stående i etterspørselen. Da presser du kunder som ikke finnes inn i stolene som finnes, og svaret blir for høyt. Avgrensningen må gjelde begge sider av regnestykket samtidig.",
      },
      {
        art: "struktur",
        sek: 150,
        tittel: "Legg opp begge sider",
        sp: `<p>Skriv ligningene i symboler. Si <b>hvilken akse du segmenterer på</b>, og
          <b>hvilken side du tror er bindende</b>.</p>`,
        fasit: `<div class="formula">
            <div class="eq"><b>Etterspørsel</b> = Σ (Segment × Andel som bruker frisør × Besøk per år)</div>
            <div class="eq"><b>Kapasitet per stol</b> = Timer åpent per år / Behandlingstid × Utnyttelsesgrad</div>
            <div class="eq"><b>Antall stoler</b> = Etterspørsel / Kapasitet per stol</div>
            <div class="eq"><b>Antall salonger</b> = Antall stoler / Stoler per salong</div>
          </div>
          <p><b>Segmentér på én akse, og velg den som betyr mest.</b> Her er det kjønn, og det er
          ikke en tilfeldig oppdeling: menn går ofte og kort, kvinner går sjelden og lenge. Det er
          to helt forskjellige mønstre, og et snitt over begge er et tall som ikke beskriver noen.
          Alder er en dårligere akse her — den flytter frekvensen mindre enn kjønn gjør.</p>
          <p>Merk hvordan behandlingstiden løses: den varierer fra 20 minutter for en herreklipp
          til to timer for farge. Jeg kunne segmentert kapasiteten også, men da får jeg fire
          regnestykker i stedet for to. I stedet bruker jeg <b>ett vektet snitt for
          behandlingstiden</b> og sier høyt at det er en forenkling. Regel: segmentér på den siden
          der forskjellen er størst, og bruk snitt på den andre.</p>
          <p><b>Hvilken side er bindende?</b> Kapasiteten, denne gangen — og det er forskjellen fra
          bensinstasjonene. En stol som står tom, koster frisøren lønn i timen; ingen driver salong
          med ledig kapasitet lenge. Tilbudet tilpasser seg etterspørselen ganske raskt, så
          kapasitetsutnyttelsen bør være <i>høy</i>, ikke lav. Det er et tall du kan sette med
          langt større trygghet her enn på en bensinstasjon.</p>`,
        krav: [
          "Du skriver alle fire ligningene i symboler før du setter inn tall.",
          "Du segmenterer på kjønn og begrunner hvorfor den aksen slår alder.",
          "Du bruker vektet snitt på behandlingstiden i stedet for å segmentere begge sider.",
          "Du sier at kapasitetsutnyttelsen skal være høy her, og begrunner det med at ledig stol koster lønn.",
          "Du har stoler per salong som et eget, siste ledd — ikke gjemt inne i kapasiteten.",
        ],
        felle: "Å segmentere på både kjønn, alder og geografi samtidig. Tolv segmenter er ikke mer presist enn to — feilen ligger i forutsetningene, ikke i oppdelingen, og tolv segmenter betyr bare tolv gjetninger i stedet for to.",
      },
      {
        art: "regne",
        sek: 120,
        tittel: "Etterspørselssiden", kort: "Etterspørsel",
        sp: `<p>Norge har <b>5,6 millioner innbyggere</b>, grovt halvparten av hvert kjønn. Anta at
          <b>60 prosent av menn</b> bruker frisør, og at de går <b>6 ganger i året</b>. For
          <b>kvinner</b>: <b>80 prosent</b>, og <b>3 ganger i året</b>.</p>
          <p><b>Hvor mange frisørbesøk blir det i Norge i året, i millioner?</b></p>`,
        svar: 17,
        enhet: "millioner frisørbesøk per år",
        toleranse: 0.15,
        fasit: `<p>To segmenter, to ledd hver, og én avrunding helt til slutt:</p>
          <div class="formula">
            <div class="eq">Menn som bruker frisør: 2,8 mill × 60 % = <b>1,7 millioner</b></div>
            <div class="eq">Herrebesøk: 1,7 mill × 6 = <b>10,2 millioner besøk</b></div>
            <div class="eq">Kvinner som bruker frisør: 2,8 mill × 80 % = <b>2,2 millioner</b></div>
            <div class="eq">Damebesøk: 2,2 mill × 3 = <b>6,6 millioner besøk</b></div>
            <div class="eq">Sum: 10,2 + 6,6 = 16,8 ≈ <b>17 millioner besøk per år</b></div>
          </div>
          <p><b>Avrundingen:</b> legg merke til at jeg <i>ikke</i> rundet 6,6 opp til 7 underveis.
          Det ville vært seks prosent på ett ledd, og det er for mye når leddet skal legges til et
          annet. Jeg summerer først og runder én gang til slutt — 16,8 til 17 er 1,2 prosent.
          Tommelfingerregelen er å runde tidlig på ledd som skal <i>ganges</i>, og sent på ledd som
          skal <i>legges sammen</i>.</p>
          <p><b>Dette skiller et sterkt svar fra et middels:</b></p>
          <ul>
            <li><b>Middels</b> tar 5,6 millioner ganger «fire klipp i året» og får 22 millioner.
              Tallet er ikke langt unna, men det er tilfeldig at det ikke er det, og kandidaten kan
              ikke svare på hva som skjer hvis frekvensen endrer seg for én gruppe. Segmenteringen
              er ikke pynt — den er det som gjør modellen brukbar til noe etterpå.</li>
            <li><b>Sterkt</b> sanity-sjekker delresultatet med én gang: 17 millioner besøk delt på
              5,6 millioner innbyggere er <b>3 besøk per nordmann per år</b>. Det er et tall du kan
              kjenne på — inkludert spedbarn og skallede menn. Det stemmer.</li>
            <li><b>Sterkt</b> sier hvilken forutsetning som er skjørest. Her er det herrefrekvensen
              på 6: den alene står for 10 av de 17 millionene. Går den til 4, faller etterspørselen
              til 13 millioner og hele svaret med den.</li>
          </ul>`,
        krav: [
          "Du regner segmentene hver for seg og holder enhetene fra hverandre.",
          "Du summerer før du runder, og sier hvorfor du ikke rundet 6,6 til 7 underveis.",
          "Du sanity-sjekker delresultatet mot besøk per innbygger med én gang.",
          "Du peker ut herrefrekvensen som det mest følsomme leddet, og sier hva den er verdt.",
          "Du sier enheten på hvert delresultat — personer, besøk, per år.",
        ],
        felle: "Å bruke antall husholdninger som grunnlag fordi det er det mest kjente tallet. Man går til frisøren som person, ikke som husholdning. Sjekk alltid om enheten i oppgaven er individ, husholdning eller bolig før du griper et drilltall.",
      },
      {
        art: "regne",
        sek: 120,
        tittel: "Tilbudssiden: hva rekker én stol?", kort: "Tilbud",
        sp: `<p>Se for deg <b>én stol</b>. En behandling tar i snitt <b>én time</b> inkludert
          rigging mellom kundene. Salongen er åpen <b>8 timer om dagen, 300 dager i året</b>.
          Boka er ikke full — regn med <b>75 prosent utnyttelse</b>.</p>
          <p><b>Hvor mange behandlinger tar én stol i året?</b></p>`,
        svar: 1800,
        enhet: "behandlinger per stol per år",
        toleranse: 0.15,
        fasit: `<div class="formula">
            <div class="eq">Åpne stoltimer: 8 × 300 = <b>2 400 timer per år</b></div>
            <div class="eq">Ved full booking: 2 400 / 1 time = <b>2 400 behandlinger</b></div>
            <div class="eq">Ved 75 % utnyttelse: 2 400 × 0,75 = <b>1 800 behandlinger per år</b></div>
          </div>
          <p><b>Krysspeil med én gang:</b> 1 800 delt på 300 dager er <b>6 behandlinger per stol
          per dag</b>. Det er en frisør som klipper seks hoder på en åttetimersdag. Det kjenner du
          igjen fra en salong du har vært i — og det er slik du vet at forutsetningene henger
          sammen. Hadde du fått 15 i døgnet, måtte noe vært galt.</p>
          <p><b>Dette skiller et sterkt svar fra et middels:</b></p>
          <ul>
            <li><b>Middels</b> setter utnyttelsen til 100 prosent fordi «frisører har alltid fullt».
              De har det på lørdag. En tirsdag i februar klokka to står boka halvtom, og salongen er
              åpen likevel. 75 prosent er allerede høyt — det er nesten det maksimale en
              timebestilt virksomhet klarer, fordi avbestillinger og huller mellom timer aldri kan
              fylles helt.</li>
            <li><b>Sterkt</b> sier hvorfor tallet er høyt her og lavt hos en bensinstasjon:
              <i>frisørkapasitet er timebestilt, drivstoffkapasitet er selvbetjent og
              tilfeldig.</i> Man booker en klipp; man booker ikke en fylling. Det er derfor
              utnyttelsen er 75 prosent i det ene tilfellet og 10 prosent i det andre. Å kunne
              begrunne forskjellen er verdt mer enn å treffe prosenten.</li>
            <li><b>Sterkt</b> flagger at ett vektet snitt på behandlingstiden er en forenkling:
              en herreklipp tar 20–30 minutter, en farge to timer. Miksen mellom dem flytter
              kapasiteten mer enn utnyttelsesgraden gjør.</li>
          </ul>`,
        krav: [
          "Du regner det åpne timetallet først og korrigerer så for utnyttelse.",
          "Du krysspeiler til behandlinger per dag og sjekker at tallet er gjenkjennelig.",
          "Du begrunner hvorfor utnyttelsen er høy her — timebestilling, ikke selvbetjening.",
          "Du sier at snittet på behandlingstiden er en forenkling, og hvilken vei miksen trekker.",
          "Du sier enheten hver gang — timer, behandlinger, per stol, per år.",
        ],
        felle: "Å regne kapasitet per salong i stedet for per stol. Da må du gjette salongstørrelsen midt i regnestykket, og gjetningen forsvinner inn i et tall du ikke kan diskutere etterpå. Hold stoler per salong som et eget, synlig ledd helt til slutt.",
      },
      {
        art: "regne",
        sek: 90,
        tittel: "La sidene møtes", kort: "Svar",
        sp: `<p>Du har <b>17 millioner besøk</b> og <b>1 800 behandlinger per stol</b>. En norsk
          salong har i snitt <b>3 stoler</b>.</p>
          <p><b>Hvor mange frisørsalonger finnes det i Norge?</b></p>`,
        svar: 3200,
        enhet: "frisørsalonger",
        toleranse: 0.15,
        fasit: `<div class="formula">
            <div class="eq">Stoler: 17 000 000 / 1 800 = 9 444 ≈ <b>9 500 stoler</b></div>
            <div class="eq">Salonger: 9 500 / 3 = 3 167 ≈ <b>rundt 3 200 salonger</b></div>
          </div>
          <p>Enhetssjekk: besøk per år delt på besøk per stol per år gir stoler; stoler delt på
          stoler per salong gir salonger. Det går opp.</p>
          <p><b>Sanity-sjekkene — gjør minst to, og si dem høyt:</b></p>
          <ul>
            <li><b>Mot arbeidsstyrken:</b> 9 500 stoler i drift betyr grovt 9 500 frisører i full
              stilling. Norge har 2,9 millioner sysselsatte, så det er <b>én av 300
              yrkesaktive</b> — 0,33 prosent. For et yrke som finnes i hver eneste bygd, men bare
              har noen få utøvere hvert sted, er det riktig størrelsesorden. Dette er den beste
              sjekken, fordi den er helt uavhengig av regnestykket.</li>
            <li><b>Mot dagligvare:</b> 3 200 salonger mot rundt 3 900 dagligvarebutikker. Altså
              omtrent like vanlig som en matbutikk, litt sjeldnere. Tenk på et kjøpesenter: det har
              gjerne to matbutikker og én frisør. Konsistent.</li>
            <li><b>Baklengs til kroner:</b> 17 millioner besøk à 500 kroner i vektet snitt — mange
              herreklipp til 400, noen fargebehandlinger til 1 500 — gir et marked på
              <b>8,5 milliarder kroner</b>. Det er 3,7 prosent av dagligvaremarkedet på 230
              milliarder, og 3 200 kroner per husholdning i året. Per stol blir det 900 000 kroner
              i omsetning, som med femti prosent lønnsandel gir 450 000 kroner i årslønn til
              frisøren. <i>Det er omtrent riktig frisørlønn</i>, og det er den skarpeste sjekken i
              hele casen: den knytter markedstallet til en lønn du kan vurdere.</li>
          </ul>
          <p><b>Dette skiller et sterkt svar fra et middels:</b> et middels svar sier «rundt 3 000
          salonger» og stopper. Et sterkt svar tar den baklengse sjekken helt ned til lønn per
          frisør — og hvis lønnen hadde kommet ut på 1,2 millioner, ville det sterke svaret sagt
          «da er noe galt, sannsynligvis snittprisen min», og justert. Sanity-sjekken er ikke en
          seremoni du utfører etter at svaret er ferdig; den er sjansen din til å oppdage at det
          ikke er det.</p>`,
        krav: [
          "Du sjekker at enhetene går opp gjennom begge divisjonene.",
          "Du gjør minst to sanity-sjekker, og minst én er uavhengig av regnestykket.",
          "Du tar den baklengse sjekken helt ned til omsetning per stol og lønn per frisør.",
          "Du sier hva du ville gjort hvis sjekken ikke hadde gått opp.",
          "Du oppgir svaret som et spenn, ikke som ett presist tall.",
        ],
        felle: "Å gjøre sanity-sjekken uten å være villig til å endre svaret. Hvis du sier «det virker rimelig» uansett hva tallet ble, har du ikke sjekket noe. En ekte sjekk har en terskel: si på forhånd hva som ville fått deg til å regne om.",
      },
      {
        art: "syntese",
        sek: 90,
        tittel: "Svaret på ett minutt",
        sp: `<p>Klienten har <b>ett minutt</b>. Gi tallet, usikkerheten og sjekken.</p>`,
        fasit: `<blockquote><p><b>«Rundt 3 200 frisørsalonger i Norge, med et spenn på 2 500 til
          4 000. Bak dem ligger rundt 9 500 stoler, og det er stolene som er det interessante
          tallet for dere.»</b></p>
          <p>Slik kom jeg dit. Etterspørselen delte jeg på kjønn, fordi mønstrene er så ulike:
          1,7 millioner menn går seks ganger i året, 2,2 millioner kvinner går tre ganger. Det gir
          17 millioner besøk, altså tre per nordmann i året. Kapasiteten regnet jeg per stol: 8
          timer i 300 dager er 2 400 timer, og med 75 prosents utnyttelse og en time per behandling
          blir det 1 800 behandlinger i året — seks om dagen. 17 millioner delt på 1 800 er 9 500
          stoler, og med tre stoler per salong blir det 3 200 salonger.</p>
          <p><b>Den største usikkerheten er stoler per salong.</b> Bransjen har mange
          enmannssalonger og noen få store kjedesalonger, så snittet på tre kan lett være to eller
          fire — og salongtallet svinger mellom 2 400 og 4 800 med det. Stoltallet på 9 500 står
          derimot ganske stødig, fordi det er utledet fra to sider som begge er sanity-sjekket.</p>
          <p>Sjekken: 9 500 frisører er én av 300 yrkesaktive nordmenn. Og markedet blir 8,5
          milliarder kroner, som gir 900 000 i omsetning per stol og rundt 450 000 i frisørlønn.
          Det er riktig lønn, så kjeden henger sammen.</p>
          <p>Det som betyr noe for dere: markedet er <i>kapasitetsbestemt og fullt utnyttet</i>.
          Vekst kan ikke komme fra flere stoler, for stolene fylles bare hvis folk klipper seg
          oftere, og det gjør de ikke. Vekst må komme fra <b>kroner per besøk</b> — behandling,
          farge, produktsalg — eller fra å ta stoler fra andre. Det er en helt annen investeringstese
          enn en volumtese, og det er det jeg ville testet først.»</p></blockquote>`,
        krav: [
          "Du gir salongtallet og stoltallet, og sier hvilket av dem som er mest robust.",
          "Du gjengir segmenteringen og kapasitetsregnestykket på tjue sekunder.",
          "Du peker ut stoler per salong som den største usikkerheten, og kvantifiserer spennet.",
          "Du sier sanity-sjekken høyt, inkludert lønnen per frisør.",
          "Du trekker en investeringsrelevant konsekvens: verdi per besøk, ikke flere stoler.",
        ],
        felle: "Å svare på spørsmålet som ble stilt og ikke på spørsmålet som ble ment. Fondet spurte om antall salonger, men de skal kjøpe en kjede — da er stoler, utnyttelse og kroner per besøk det som avgjør, og salongtallet er bare inngangen.",
      },
    ],
  },
  {
    id: "ms-ladepunkter-e6",
    kategori: "Market sizing",
    label: "Hvor mange hurtigladepunkter trengs langs E6 mellom Oslo og Trondheim?",
    type: "Estimering",
    nivå: "Middels",
    firma: "Generisk",
    stil: "interviewer-led",
    minutter: 25,
    ch: [],
    blurb: "Geografisk avgrenset sizing. Etterspørselen bygges fra trafikkarbeid på to ulike strekninger, kapasiteten fra ladetid per bil — og hele poenget er at et ladenett ikke dimensjoneres for gjennomsnittsdagen.",
    prompt: `<p>Klienten er en ladeoperatør som vurderer å bygge ut korridoren
      <b>E6 mellom Oslo og Trondheim</b>, en strekning på rundt 500 kilometer. De vil vite hvor
      mange hurtigladepunkter strekningen trenger før de setter et investeringsbudsjett.</p>
      <p><b>Hvor mange hurtigladepunkter trengs det langs E6 Oslo–Trondheim?</b></p>
      <p class="tiny">Ett ladepunkt er én kontakt én bil kan stå ved. En ladestasjon har flere.</p>`,
    bakgrunn: `<p>Denne casen er den vanskeligste av de fire, av tre grunner:</p>
      <ul>
        <li><b>Etterspørselen er ikke befolkning, den er trafikk.</b> Du kan ikke gå via
          innbyggertall — du må gå via <i>trafikkarbeid</i>, altså kjøretøykilometer per døgn. Det
          er årsdøgntrafikk ganger strekningslengde, og det er den riktige valutaen så snart
          oppgaven er geografisk avgrenset til en veistrekning.</li>
        <li><b>Bare en del av trafikken lader underveis.</b> De aller fleste elbilturer i Norge er
          korte, og de lades hjemme. Bare turer som er lengre enn bilens rekkevidde skaper
          etterspørsel etter hurtiglading langs vei. Å filtrere bort resten er selve
          strukturgrepet.</li>
        <li><b>Gjennomsnittsdagen er feil dimensjoneringsgrunnlag.</b> Et ladenett som holder i
          november, står i timeslang kø palmesøndag. Å si det høyt er det som skiller et sterkt
          svar fra et middels her — og det er også det klienten faktisk skal betale for.</li>
      </ul>`,
    trinn: [
      {
        art: "oppklaring",
        sek: 90,
        tittel: "Hva er det egentlig vi teller?",
        sp: `<p>Hvilke spørsmål stiller du før du regner?</p>`,
        fasit: `<ul>
            <li><b>Ladepunkt eller ladestasjon?</b> Klienten sier punkt, altså én kontakt. Én
              stasjon har typisk 6–12 punkter, så tallene skiller seg med nesten en tiendedel. Jeg
              regner punkter og oppgir stasjoner som avledet tall.</li>
            <li><b>Hurtiglading eller all lading?</b> Bare hurtiglading — 150 kW og oppover. En
              vanlig 22 kW-lader ved et hotell løser ikke en langtur og skal ikke telles.</li>
            <li><b>Hvor bredt er «langs E6»?</b> Jeg regner ladepunkter som betjener
              gjennomgangstrafikken på selve korridoren, ikke hele fylkene den går gjennom. Ladere
              inne i Oslo og Trondheim holdes utenfor — de dekker byenes egen trafikk.</li>
            <li><b>Personbiler, eller også tungtransport?</b> Elektriske vogntog trenger helt andre
              effektnivåer og egne plasser. Jeg holder dem utenfor og flagger at det er et eget
              regnestykke.</li>
            <li><b>Dimensjonere for hvilken dag?</b> Dette er det viktigste spørsmålet, og det bør
              stilles nå og ikke til slutt: skal nettet holde en vanlig onsdag, eller skal det
              holde palmesøndag? Trafikken skiller seg med en faktor tre til fire.</li>
          </ul>
          <p>Én setning: <b>«Jeg regner antall hurtigladepunkter for personbiler som betjener
          gjennomgangstrafikken på de 500 kilometerne mellom Oslo og Trondheim, dimensjonert for en
          normal dag — og så sier jeg hva topplasten gjør med tallet.»</b></p>`,
        krav: [
          "Du skiller ladepunkt fra ladestasjon i første setning.",
          "Du avgrenser til hurtiglading og sier hvorfor vanlige ladere ikke teller.",
          "Du avgrenser geografien til korridoren, ikke fylkene, og holder bylading utenfor.",
          "Du stiller dimensjoneringsspørsmålet — normal dag eller topplast — før du regner, ikke etter.",
          "Du oppsummerer avgrensningen i én setning.",
        ],
        felle: "Å ta topplastspørsmålet til slutt som en ettertanke. Det avgjør hele svaret — en faktor tre — og en kandidat som stiller det først, viser at hun forstår at dette er en dimensjoneringsoppgave og ikke en tellejobb.",
      },
      {
        art: "struktur",
        sek: 150,
        tittel: "Legg opp begge sider",
        sp: `<p>Skriv ligningene i symboler. Si <b>hvorfor trafikkarbeid og ikke befolkning</b> er
          riktig inngang, og <b>hvilken side du tror er bindende</b>.</p>`,
        fasit: `<div class="formula">
            <div class="eq"><b>Trafikkarbeid</b> = Σ (Strekningslengde × Årsdøgntrafikk) per delstrekning</div>
            <div class="eq"><b>Langturkilometer</b> = Trafikkarbeid × Andel langtur</div>
            <div class="eq"><b>Etterspørsel</b> = Langturkilometer × Elbilandel / Rekkevidde mellom lading</div>
            <div class="eq"><b>Kapasitet per punkt</b> = 24 t / Ladetid per bil × Utnyttelsesgrad</div>
            <div class="eq"><b>Antall ladepunkter</b> = Ladeøkter per døgn / Kapasitet per punkt</div>
          </div>
          <p><b>Hvorfor trafikkarbeid?</b> Fordi oppgaven er avgrenset til en <i>strekning</i>, ikke
          til en befolkning. Ladebehovet oppstår av kjørte kilometer, ikke av mennesker: én bil som
          kjører hele strekningen skaper like mye ladebehov som fem biler som kjører en femtedel
          hver. Kjøretøykilometer per døgn er den eneste størrelsen som fanger begge deler. Så snart
          en sizing-oppgave er geografisk avgrenset til vei, jernbane eller ledningsnett, er
          <b>lengde ganger intensitet</b> riktig inngang.</p>
          <p><b>Segmentér strekningen.</b> E6 er ikke én vei — den er en firefelts pendlerkorridor
          de første 100 kilometerne ut av Oslo, og en tofelts fjellvei over Dovre. Trafikken skiller
          seg med en faktor fire, og andelen langtur skiller seg enda mer. To delstrekninger er nok;
          fem er overpresisjon.</p>
          <p><b>Hvilken side er bindende?</b> Kapasiteten, og det er poenget med hele oppgaven. En
          bil som lader, står ved kontakten i en halvtime — det er hundre ganger lengre enn en
          bensinfylling, og det er derfor et ladenett er et kapasitetsproblem der et bensinnett er
          et dekningsproblem. Det er også hele grunnen til at klienten har et beslutningsproblem:
          hver kontakt koster penger, og for få kontakter gir kø, ikke bare ulempe.</p>`,
        krav: [
          "Du skriver alle leddene i symboler før du setter inn tall.",
          "Du begrunner trafikkarbeid som inngang, og sier at lengde × intensitet er regelen ved geografisk avgrensning.",
          "Du deler strekningen i to og begrunner delingen med at trafikkbildet er kvalitativt ulikt.",
          "Du har «andel langtur» som eget ledd — filtreringen bort fra hjemmelading er strukturgrepet.",
          "Du sier at kapasitet binder her, og hvorfor lading er et kapasitetsproblem der fylling ikke er det.",
        ],
        felle: "Å bygge etterspørselen fra antall elbiler i Norge. 0,95 millioner elbiler sier ingenting om hvor mange av dem som er på E6 over Dovre akkurat nå. Geografisk avgrensede oppgaver skal bygges fra geografien, ikke fra landstallene.",
      },
      {
        art: "regne",
        sek: 150,
        tittel: "Etterspørselssiden", kort: "Etterspørsel",
        sp: `<p>Del strekningen i to. <b>200 km</b> er bynært (rundt Oslo og Trondheim) med
          <b>ÅDT 20 000</b>, hvorav bare <b>15 prosent</b> er langtur. <b>300 km</b> er innland og
          fjell med <b>ÅDT 5 000</b>, hvorav <b>80 prosent</b> er langtur. <b>40 prosent</b> av
          trafikken er elbil, og en elbil kjører <b>250 km</b> mellom hver hurtiglading på
          langtur.</p>
          <p><b>Hvor mange ladeøkter blir det på strekningen per døgn?</b></p>`,
        svar: 3000,
        enhet: "ladeøkter per døgn",
        toleranse: 0.15,
        fasit: `<p>Fem ledd. Hold enhetene stramt — det er her folk mister sporet:</p>
          <div class="formula">
            <div class="eq">Bynært trafikkarbeid: 200 km × 20 000 = <b>4,0 mill kjøretøykm/døgn</b></div>
            <div class="eq">Innland trafikkarbeid: 300 km × 5 000 = <b>1,5 mill kjøretøykm/døgn</b></div>
            <div class="eq">Langtur bynært: 4,0 mill × 15 % = <b>0,6 mill km</b></div>
            <div class="eq">Langtur innland: 1,5 mill × 80 % = <b>1,2 mill km</b></div>
            <div class="eq">Sum langtur: 0,6 + 1,2 = <b>1,8 mill kjøretøykm/døgn</b></div>
            <div class="eq">Elbil: 1,8 mill × 40 % = <b>720 000 elbilkm/døgn</b></div>
            <div class="eq">Ladeøkter: 720 000 / 250 km = 2 880 ≈ <b>3 000 ladeøkter per døgn</b></div>
          </div>
          <p><b>Avrundingen:</b> 2 880 til 3 000 er 4 prosent opp, og jeg sier det. Til gjengjeld
          blir divisjonen i neste trinn hoderegning.</p>
          <p><b>Legg merke til hva segmenteringen gjorde.</b> De bynære 200 kilometerne har mer enn
          dobbelt så mye trafikkarbeid som fjellstrekningen — 4,0 mot 1,5 millioner kilometer — men
          bidrar bare halvparten så mye til ladebehovet, fordi nesten alt er pendling som lades
          hjemme. <i>Uten segmenteringen hadde du fått feil svar med riktig metode.</i> Det er den
          typen innsikt som skiller: si den høyt når du ser den, ikke bare noter tallet.</p>
          <p><b>Dette skiller et sterkt svar fra et middels:</b></p>
          <ul>
            <li><b>Middels</b> ganger 500 km med en gjennomsnitts-ÅDT og filtrerer ikke bort
              hjemmeladingen. Da får du 5,5 millioner kjøretøykilometer, 2,2 millioner elbilkm og
              8 800 ladeøkter — nesten tre ganger for høyt, og et ladenett som er tre ganger for
              dyrt.</li>
            <li><b>Sterkt</b> sanity-sjekker underveis: 3 000 ladeøkter per døgn på en strekning
              med rundt 2 000 langturbiler betyr at de fleste lader én gang, noen to. Det stemmer
              med at 500 kilometer er dobbelt så langt som rekkevidden.</li>
            <li><b>Sterkt</b> flagger at 250 km rekkevidde er et vinterhalvårstall. Om sommeren i
              flatt terreng er det 350; på Dovre i januar med kupévarme er det 180. Rekkevidden er
              en av to forutsetninger som bærer svaret.</li>
          </ul>`,
        krav: [
          "Du regner trafikkarbeid som lengde × ÅDT for hver delstrekning, med enheten sagt høyt.",
          "Du filtrerer bort korttursrafikken før du ganger med elbilandelen.",
          "Du legger merke til at den bynære strekningen dominerer trafikken, men ikke ladebehovet — og sier det.",
          "Du runder 2 880 til 3 000 og flagger retningen.",
          "Du sier at rekkevidden på 250 km er et vintertall, og hvilken vei det trekker.",
        ],
        felle: "Å blande ÅDT og trafikkarbeid. ÅDT er biler per døgn gjennom ett snitt av veien; trafikkarbeid er kjøretøykilometer per døgn på hele strekningen. Ganger du ÅDT direkte med noe som helst uten å gange inn lengden først, mister du kilometeren, og da går ikke divisjonen på rekkevidde opp.",
      },
      {
        art: "regne",
        sek: 120,
        tittel: "Tilbudssiden: hva rekker ett ladepunkt?", kort: "Tilbud",
        sp: `<p>Se for deg <b>ett ladepunkt</b>. En ladeøkt tar <b>30 minutter</b> inkludert inn-
          og utkjøring og betaling. Lading skjer ikke jevnt over døgnet — regn med at nesten alt
          skjer innenfor <b>14 dagtimer</b>, og at et punkt du kan planlegge med, ikke bør ha mer
          enn <b>40 prosent</b> belegg i de timene.</p>
          <p><b>Hvor mange ladeøkter betjener ett ladepunkt per døgn?</b></p>`,
        svar: 12,
        enhet: "ladeøkter per ladepunkt per døgn",
        toleranse: 0.15,
        fasit: `<div class="formula">
            <div class="eq">Per time: 60 / 30 = <b>2 økter</b></div>
            <div class="eq">Tak i dagtimene: 2 × 14 = <b>28 økter per døgn</b></div>
            <div class="eq">Ved 40 % belegg: 28 × 0,40 = 11,2</div>
            <div class="eq">Pluss litt nattlading: ≈ <b>12 ladeøkter per punkt per døgn</b></div>
          </div>
          <p><b>Hvorfor bare 40 prosent?</b> Dette er det viktigste å kunne begrunne i hele casen.
          I et system med tilfeldig ankomst — biler kommer når de kommer, ikke etter timeavtale —
          <i>vokser køen eksponentielt når belegget nærmer seg hundre prosent</i>. Ved 80 prosent
          belegg må en typisk bilist vente en halvtime på å komme til. Ved 40 prosent kommer nesten
          alle rett til. Å dimensjonere en tjeneste med tilfeldig ankomst for høyt belegg er ikke
          effektivt, det er ødeleggende: en halvtimes kø etter fire timers kjøring er forskjellen
          på en fornøyd og en rasende kunde.</p>
          <p><b>Dette skiller et sterkt svar fra et middels:</b></p>
          <ul>
            <li><b>Middels</b> regner 24 timer delt på 30 minutter og leverer 48 økter. Det er
              taket for et punkt med kø døgnet rundt, og det gir et svar som er fire ganger for
              lavt i antall ladepunkter. Å bruke det teoretiske taket som driftstall er den samme
              feilen som på bensinstasjonen — bare enda dyrere her, fordi kapasiteten faktisk
              binder.</li>
            <li><b>Sterkt</b> knytter beleggsgraden til <i>kø</i> og ikke til «effektivitet», og
              sier at akseptabel ventetid er en <b>tjenestenivåbeslutning klienten må ta</b>, ikke
              en teknisk forutsetning analytikeren skal gjette. Det er å gi klienten en spak i
              stedet for et tall.</li>
            <li><b>Sterkt</b> nevner at ladetiden faller raskt: 30 minutter i dag, og med 350
              kW-ladere og nyere biler nærmere 20. Det er en <i>kapasitetsøkning på femti prosent
              uten en eneste ny kontakt</i>, og for en investor som skal binde kapital i tolv år,
              er det kanskje det viktigste enkeltmomentet i hele analysen.</li>
          </ul>`,
        krav: [
          "Du regner taket først og sier eksplisitt at det ikke er et driftstall.",
          "Du begrunner beleggsgraden med kødannelse ved tilfeldig ankomst, ikke med «effektivitet».",
          "Du kaller ventetiden en tjenestenivåbeslutning som tilhører klienten.",
          "Du nevner at fallende ladetid øker kapasiteten uten nye kontakter, og hva det er verdt.",
          "Du sier enheten hver gang — økter per time, per døgn, per punkt.",
        ],
        felle: "Å bruke 24 timer i nevneren. Ingen lader klokka tre om natten på Dovre, og et anlegg dimensjonert som om de gjorde det, får kø hele dagen. Døgnprofilen — når på døgnet etterspørselen faktisk kommer — er en del av kapasitetsregnestykket, ikke en detalj.",
      },
      {
        art: "regne",
        sek: 90,
        tittel: "La sidene møtes", kort: "Svar",
        sp: `<p>Du har <b>3 000 ladeøkter per døgn</b> og <b>12 økter per ladepunkt per døgn</b>.</p>
          <p><b>Hvor mange hurtigladepunkter trengs langs E6 Oslo–Trondheim?</b></p>`,
        svar: 250,
        enhet: "ladepunkter",
        toleranse: 0.15,
        fasit: `<div class="formula">
            <div class="eq">3 000 / 12 = <b>250 ladepunkter</b></div>
          </div>
          <p>Enhetssjekk: økter per døgn delt på økter per punkt per døgn gir punkter. Det går opp.</p>
          <p><b>Sanity-sjekkene:</b></p>
          <ul>
            <li><b>Mot geografien — den beste her:</b> 250 punkter fordelt på ladestasjoner med 8
              punkter hver gir <b>rundt 31 ladestasjoner</b>, altså én hver 16. kilometer. Det er
              nøyaktig slik E6 ser ut når du kjører den: en ladestasjon ved omtrent annenhver
              tettsted. Hadde vi fått én stasjon hver 80. kilometer, ville en elbil med 250 km
              rekkevidde vært helt avhengig av at akkurat den ene virket — og det holder ikke.</li>
            <li><b>Mot energi:</b> 3 000 økter à 50 kWh er 150 MWh per døgn, altså 55 GWh i året.
              Norges samlede elbilforbruk er rundt 2,4 TWh — 0,95 millioner elbiler à 2 500 kWh —
              så én veistrekning står for 2,3 prosent av all elbillading i landet. For hovedåren
              mellom landets to største byområder er det plausibelt.</li>
            <li><b>Mot penger:</b> 250 punkter à en halv million kroner installert er 125 millioner
              kroner. Det er en investering en ladeoperatør faktisk kan bære, og størrelsesordenen
              stemmer med det Enova har delt ut til korridorutbygging. Hadde vi landet på 12
              milliarder, ville noe vært galt.</li>
          </ul>
          <p><b>Og så det som skiller et sterkt svar fra et middels — dimensjoneringen:</b>
          250 punkter holder på en <i>normal dag</i>. Palmesøndag og i fellesferien er
          langturtrafikken tre ganger så høy: 9 000 økter. Fordelt på 250 punkter blir det 36 økter
          per punkt per døgn, mot et tak på 28 i dagtimene. <b>Etterspørselen overstiger taket —
          det betyr ikke lang kø, det betyr sammenbrudd.</b> Skulle nettet holdt samme
          tjenestenivå i toppen, måtte det hatt 750 punkter.</p>
          <p>Ingen bygger for 750. Svaret et sterkt lys gir, er: <b>bygg rundt 400, ta køen de
          femten verste dagene i året, og gjør de tre travleste stasjonene dobbelt så store i
          stedet for å spre kapasiteten jevnt.</b> Det er en anbefaling, ikke et estimat — og det
          er det klienten betaler for.</p>`,
        krav: [
          "Du sjekker at enhetene går opp før du sier tallet.",
          "Du regner om til ladestasjoner og kilometer mellom dem — det er sanity-sjekken alle kan kjenne igjen.",
          "Du gjør minst én sjekk til som er uavhengig av regnestykket, energi eller investering.",
          "Du regner topplasten eksplisitt og viser at den bryter taket, ikke bare at den er høy.",
          "Du lander på en dimensjonering med begrunnet påslag, ikke på gjennomsnittstallet alene.",
        ],
        felle: "Å levere 250 og la det stå. Et ladenett dimensjonert for gjennomsnittsdagen fungerer 350 dager i året og kollapser de 15 dagene alle husker. Kunden dømmer nettet på påskedagen, ikke på en onsdag i november — og et estimat som ikke sier det, har svart på feil spørsmål.",
      },
      {
        art: "syntese",
        sek: 90,
        tittel: "Svaret på ett minutt",
        sp: `<p>Ladeoperatøren har <b>ett minutt</b>. Gi tallet, usikkerheten og sjekken.</p>`,
        fasit: `<blockquote><p><b>«Rundt 250 hurtigladepunkter dekker en normal dag. Men jeg ville
          bygget nærmere 400, og jeg skal si hvorfor tallet ikke er det samme som svaret.»</b></p>
          <p>Etterspørselen bygde jeg fra trafikkarbeid, ikke fra befolkning, fordi oppgaven er
          knyttet til en strekning. De 500 kilometerne gir 5,5 millioner kjøretøykilometer i
          døgnet, men bare 1,8 millioner av dem tilhører turer lange nok til å trenge lading
          underveis — resten er pendling som lades hjemme. Med 40 prosent elbil og 250 kilometer
          mellom hver lading blir det <b>3 000 ladeøkter i døgnet</b>.</p>
          <p>Kapasiteten: en økt tar en halvtime, og et punkt kan ikke planlegges med mer enn 40
          prosent belegg uten at køen løper løpsk. Det gir 12 økter per punkt per døgn, og 3 000
          delt på 12 er 250 punkter — rundt 31 ladestasjoner, én hver 16. kilometer. Det er slik
          E6 faktisk ser ut, så sjekken holder.</p>
          <p><b>Den største usikkerheten er andelen langtur.</b> Den bestemmer to tredjedeler av
          etterspørselen, og jeg har anslått den, ikke målt den — Vegvesenets snittdata ville
          avgjort den på en ettermiddag. Det er det første jeg ville hentet inn.</p>
          <p>Men det viktigste for dere er ikke gjennomsnittstallet, det er <b>topplasten</b>.
          Palmesøndag er langturtrafikken tre ganger så høy: 9 000 økter mot en kapasitet på 250
          punkter ganger 28 økter, altså 7 000. <i>Etterspørselen bryter taket</i> — det gir ikke
          kø, det gir sammenbrudd, og det er den dagen hele merkevaren deres avgjøres. Å bygge for
          toppen ville krevd 750 punkter, som ingen kan forsvare. Jeg ville bygget 400 og lagt
          påslaget der trafikken faktisk klumper seg: dobbel størrelse på de tre stasjonene rundt
          Dovre, ikke jevn fordeling langs hele strekningen.</p>
          <p>Og én ting til, fordi dere binder kapital i tolv år: <i>ladetiden faller.</i> Går den
          fra 30 til 20 minutter, øker kapasiteten femti prosent uten en eneste ny kontakt. Det
          taler for å bygge færre punkter nå og sikre seg <b>tomtene og nettkapasiteten</b> til
          resten. Det er de to tingene som ikke blir billigere med tiden.»</p></blockquote>`,
        krav: [
          "Du skiller estimatet fra anbefalingen i første setning, og sier at de ikke er samme tall.",
          "Du gjengir begge sider på tjue sekunder, og sier hvorfor trafikkarbeid var riktig inngang.",
          "Du peker ut andelen langtur som den største usikkerheten, og hvordan den kan avklares.",
          "Du viser at topplasten bryter kapasitetstaket, og gir en dimensjonering med begrunnet påslag.",
          "Du sier noe om hva som endrer seg over investeringens levetid — ladetid, tomter, nettkapasitet.",
        ],
        felle: "Å levere estimatet som om det var anbefalingen. Klienten spurte hvor mange punkter strekningen trenger; det riktige svaret er «250 i snitt, 750 i toppen, bygg 400 og plasser dem skjevt». Et enkelt tall skjuler nettopp den avveiningen de skal ta en beslutning om.",
      },
    ],
  },
  {
    id: "ms-sykehussenger-tyskland",
    kategori: "Market sizing",
    label: "Hvor mange sykehussenger finnes det i Tyskland?",
    type: "Estimering",
    nivå: "Middels",
    firma: "Generisk",
    stil: "interviewer-led",
    minutter: 20,
    ch: [],
    blurb: "Internasjonal variant der kapasitetsenheten er en seng og ikke en tidsluke. Trener liggedøgn som fellesvaluta, hvorfor 100 prosent belegg er umulig, og den mest presise sanity-sjekken som finnes: senger per tusen innbyggere.",
    prompt: `<p>Klienten er en europeisk leverandør av sykehusutstyr. De skal prioritere mellom
      markedene sine, og starter med det største.</p>
      <p><b>Hvor mange sykehussenger finnes det i Tyskland?</b></p>
      <p class="tiny">Ingen kalkulator, ingen faktaark. Du får tallene du ber om.</p>`,
    bakgrunn: `<p>Denne casen bruker samme mønster som de tre foregående, men kapasitetsenheten er
      ikke en tidsluke på noen minutter — den er en <b>seng som er opptatt i døgn av gangen</b>.
      Fellesvalutaen blir dermed <i>liggedøgn</i>, og det er et grep som løser mange oppgaver:
      hotellrom, fengselsplasser, sykehjemsplasser, containere på et lager, biler i en bilpool. Så
      snart kapasiteten holdes opptatt over tid, skal du regne i <b>enhet-døgn</b>.</p>
      <p>Casen har to grunner til å være internasjonal. Den ene er at Tyskland med 84 millioner
      innbyggere er et av de få tallene enhver kandidat bør kunne. Den andre er at helsevesen har
      en <b>sanity-sjekk som er så god at den nesten er et fasitoppslag</b>: senger per tusen
      innbyggere er en OECD-statistikk alle land måles på, og den ligger mellom 2 og 8. Får du et
      svar utenfor det intervallet, har du regnet feil — og du vet det uten å slå opp.</p>`,
    trinn: [
      {
        art: "oppklaring",
        sek: 90,
        tittel: "Hva er det egentlig vi teller?",
        sp: `<p>Hvilke spørsmål stiller du, og hva holder du utenfor?</p>`,
        fasit: `<ul>
            <li><b>Hva er en «sykehusseng»?</b> En godkjent, bemannet plass for innlagte pasienter.
              Ikke undersøkelsesbenker, ikke oppvåkningssenger, ikke senger på lager. Definisjonen
              betyr noe: forskjellen på «senger som finnes» og «senger i drift» er ti prosent i de
              fleste land.</li>
            <li><b>Somatikk alene, eller også psykiatri og rehabilitering?</b> Psykiatri har helt
              andre liggetider — uker mot dager — og vil ødelegge et snitt hvis den blandes inn
              ubemerket. Jeg regner <i>somatiske senger på akuttsykehus</i>, og sier at psykiatri
              og rehabilitering kommer i tillegg.</li>
            <li><b>Er sykehjem og pleiehjem med?</b> Nei. De er en helt annen sektor med helt annen
              liggetid, og i Tyskland er de flere ganger så mange som sykehussengene. Å blande dem
              inn er den største enkeltfeilen man kan gjøre i denne oppgaven.</li>
            <li><b>Tidsrom:</b> senger i drift i dag.</li>
          </ul>
          <p>Én setning: <b>«Jeg teller somatiske sykehussenger i drift i Tyskland i dag, og jeg
          holder psykiatri, rehabilitering og hele pleiesektoren utenfor.»</b></p>`,
        krav: [
          "Du definerer sengen som en bemannet plass i drift, ikke som en fysisk seng.",
          "Du skiller somatikk fra psykiatri med liggetid som begrunnelse, ikke bare som kategori.",
          "Du holder sykehjem utenfor eksplisitt, og sier hvorfor det er den farligste sammenblandingen.",
          "Du setter geografi og tidsrom.",
          "Du oppsummerer avgrensningen i én setning før du regner.",
        ],
        felle: "Å la pleiesektoren gli med. Tyskland har flere sykehjemsplasser enn sykehussenger, og de har liggetider målt i år. Blander du inn én sektor med tusen ganger lengre liggetid, blir gjennomsnittet meningsløst — og du oppdager det ikke, fordi svaret fortsatt ser plausibelt ut.",
      },
      {
        art: "struktur",
        sek: 150,
        tittel: "Legg opp begge sider",
        sp: `<p>Skriv ligningene i symboler. Si <b>hvilken fellesvaluta du velger</b> og
          <b>hvilken side du tror er bindende</b>.</p>`,
        fasit: `<div class="formula">
            <div class="eq"><b>Etterspørsel</b> = Befolkning × Innleggelser per innbygger per år × Liggetid</div>
            <div class="eq"><b>Kapasitet per seng</b> = 365 døgn × Beleggsprosent</div>
            <div class="eq"><b>Antall senger</b> = Liggedøgn per år / Liggedøgn per seng per år</div>
          </div>
          <p><b>Fellesvalutaen er liggedøgn</b>, og det er hele grepet. Verken pasienter eller
          innleggelser kan sammenlignes med senger, fordi en seng ikke har en «kunde per gang» — den
          har en <i>okkupasjonstid</i>. Så snart du ganger innleggelser med liggetid, har begge
          sider samme enhet, og divisjonen gir mening. Samme grep gjelder hotellrom (romdøgn),
          fengselsplasser (plassdøgn) og utleiebiler (bildøgn).</p>
          <p><b>Kapasitetssiden er merkelig enkel:</b> en seng har 365 døgn i året, punktum. Det
          eneste leddet som betyr noe, er <b>beleggsprosenten</b> — og den er ikke et
          effektivitetsmål, den er en <i>beredskapsbeslutning</i>. Et sykehus som kjører hundre
          prosent belegg, har ingen seng ledig når det kommer en bilulykke. Å reservere en åttendedel
          av kapasiteten til det som ikke er planlagt, er ikke sløsing; det er hele poenget med et
          akuttsykehus.</p>
          <p><b>Hvilken side binder?</b> Her er svaret uvanlig, og det er verdt å si høyt:
          <i>kapasiteten skaper sin egen etterspørsel.</i> Land med mange senger legger inn flere
          pasienter og holder dem lenger, for tilstander som andre land behandler poliklinisk. Det
          er en veldokumentert sammenheng i helseøkonomi. Etterspørselssiden er altså ikke uavhengig
          av tilbudssiden — så jeg regner den, men jeg sier at forutsetningene mine om
          innleggelsesrate og liggetid egentlig er <b>observasjoner av det tyske systemet</b>, ikke
          av et medisinsk behov.</p>`,
        krav: [
          "Du skriver ligningene i symboler og velger liggedøgn som fellesvaluta, med begrunnelse.",
          "Du sier at grepet generaliserer til alt som holdes opptatt over tid — hotellrom, plasser, biler.",
          "Du behandler beleggsprosenten som en beredskapsbeslutning, ikke som et effektivitetsmål.",
          "Du sier at tilbudet påvirker etterspørselen, og hva det betyr for tolkningen av svaret.",
          "Du sier avrundingsregelen din før du begynner.",
        ],
        felle: "Å regne «pasienter per seng per år» i stedet for liggedøgn. Det ser ut som det samme, men det tvinger deg til å gjette omløpshastigheten direkte — og da har du gjettet svaret i stedet for å utlede det. Liggetid er noe du har intuisjon om; omløp per seng per år er det ikke.",
      },
      {
        art: "regne",
        sek: 120,
        tittel: "Etterspørselssiden", kort: "Etterspørsel",
        sp: `<p>Tyskland har <b>84 millioner innbyggere</b>. Anta at <b>én av fem</b> legges inn på
          sykehus i løpet av et år, og at et opphold varer <b>8 døgn</b> i snitt.</p>
          <p><b>Hvor mange liggedøgn blir det i Tyskland i året, i millioner?</b></p>`,
        svar: 135,
        enhet: "millioner liggedøgn per år",
        toleranse: 0.15,
        fasit: `<div class="formula">
            <div class="eq">Innleggelser: 84 mill × 0,2 = 16,8 ≈ <b>17 millioner innleggelser</b></div>
            <div class="eq">Liggedøgn: 17 mill × 8 døgn = 136 ≈ <b>135 millioner liggedøgn</b></div>
          </div>
          <p><b>Avrundingen:</b> 16,8 opp til 17 er 1,2 prosent, og 136 ned til 135 er 0,7 prosent.
          Begge er små, og de peker i hver sin retning — det er den beste typen avrunding, fordi
          feilene spiser hverandre.</p>
          <p><b>Sanity-sjekk delresultatet med én gang.</b> 17 millioner innleggelser i året er 20
          per 100 innbyggere. Det betyr at en tysker i snitt legges inn på sykehus hvert femte år.
          Det høres høyt ut for en nordmann — og det <i>er</i> høyt. Tyskland har en av verdens
          høyeste innleggelsesrater, fordi mye som andre land gjør poliklinisk, gjøres med
          innleggelse der. Sier du «jeg vet at dette er høyt, og jeg tror det er riktig for akkurat
          Tyskland», har du vist noe mer enn regneferdighet.</p>
          <p><b>Dette skiller et sterkt svar fra et middels:</b></p>
          <ul>
            <li><b>Middels</b> setter liggetiden til 3–4 døgn, fordi det er det man hører om
              moderne sykehus. Det er tallet for et planlagt inngrep, ikke for snittet — og snittet
              trekkes opp av eldre pasienter med lungebetennelse og hoftebrudd som ligger i to uker.
              <i>Liggetiden alene er en faktor to i svaret.</i></li>
            <li><b>Sterkt</b> sier at både innleggelsesraten og liggetiden er <b>landsspesifikke og
              korrelerte</b>: land som legger inn mange, legger dem gjerne inn kortere. De to
              forutsetningene trekker altså i hver sin retning, og produktet er mer stabilt enn hver
              av dem. Det er en presis observasjon, og den er verdt å si.</li>
            <li><b>Sterkt</b> holder enheten stram: innleggelser er hendelser, liggedøgn er
              seng-døgn. Det er først når man ganger dem at tallet kan sammenlignes med en seng.</li>
          </ul>`,
        krav: [
          "Du ganger innleggelser med liggetid for å komme til liggedøgn, og sier hvorfor det er nødvendig.",
          "Du sanity-sjekker innleggelsesraten mot din egen erfaring og tar stilling til at den er høy.",
          "Du sier at liggetiden er snittet inkludert lange opphold, ikke tiden for et planlagt inngrep.",
          "Du runder små og i hver sin retning, og sier det.",
          "Du sier enheten på hvert delresultat.",
        ],
        felle: "Å bruke sin egen erfaring med norsk sykehusvesen som mal. Norge har blant Europas laveste sengetall og korteste liggetider; Tyskland har blant de høyeste av begge. Når oppgaven er internasjonal, må du spørre deg om ankeret ditt er landsspesifikt — og her er begge forutsetningene det.",
      },
      {
        art: "regne",
        sek: 90,
        tittel: "Tilbudssiden: hva rekker én seng?", kort: "Tilbud",
        sp: `<p>Se for deg <b>én seng</b>. Den er tilgjengelig <b>365 døgn i året</b>. Et sykehus
          kan ikke kjøre fullt belegg — regn med <b>80 prosent</b>.</p>
          <p><b>Hvor mange liggedøgn leverer én seng i året?</b></p>`,
        svar: 290,
        enhet: "liggedøgn per seng per år",
        toleranse: 0.15,
        fasit: `<div class="formula">
            <div class="eq">365 × 0,80 = 292 ≈ <b>290 liggedøgn per seng per år</b></div>
          </div>
          <p>Regnestykket er trivielt. <b>Begrunnelsen er ikke</b>, og det er den som vurderes.</p>
          <p><b>Hvorfor ikke 100 prosent?</b> Tre grunner, og de er verdt å si i rekkefølge:</p>
          <ul>
            <li><b>Beredskap.</b> Et akuttsykehus må ha en ledig seng når ambulansen kommer. Full
              belegg betyr at neste pasient sendes videre, og da er kapasiteten null når den trengs
              mest.</li>
            <li><b>Friksjon.</b> En seng står tom mellom to pasienter — utskrivning om formiddagen,
              rengjøring, ny innleggelse om kvelden. Noen timer per opphold blir noen prosent per
              år.</li>
            <li><b>Kø ved tilfeldig ankomst.</b> Akkurat som med ladepunktene: når ankomsten er
              tilfeldig, eksploderer ventetiden når belegget nærmer seg taket. Over 85 prosent
              regnes internasjonalt som kritisk grense for et akuttsykehus.</li>
          </ul>
          <p><b>Dette skiller et sterkt svar fra et middels:</b> et middels svar sier 365 og går
          videre — og får dermed et sengetall som er tjue prosent for lavt, med en begrunnelse som
          er hundre prosent fraværende. Et sterkt svar bruker tjue sekunder på å si at
          beleggsprosenten er en <i>politisk og faglig beslutning</i>, ikke et måltall: Tyskland har
          historisk ligget lavt fordi systemet er dimensjonert for beredskap, mens land som styrer
          hardt på kostnad presser mot nitti og betaler for det i korridorpasienter. <b>Dette ene
          leddet er hele forskjellen mellom to helsesystemfilosofier</b> — og det er en langt mer
          interessant setning å si i et intervju enn «365 ganger 0,8».</p>`,
        krav: [
          "Du gir tre distinkte grunner til at belegget ikke kan være 100 prosent.",
          "Du kobler kødannelsen til tilfeldig ankomst, samme mekanisme som ved en kø av kunder.",
          "Du kaller beleggsprosenten en beslutning, ikke et måltall, og sier hvem som tar den.",
          "Du oppgir følsomheten: hva svaret blir ved 70 og ved 90 prosent belegg.",
          "Du bruker mindre enn ett minutt — regnestykket er lett, begrunnelsen er poenget.",
        ],
        felle: "Å levere 365 fordi kapasiteten «er der uansett». Å ha en seng er ikke det samme som å kunne fylle den: bemanningen, ikke møbelet, er kapasiteten. En seng uten sykepleier på nattevakt leverer null liggedøgn.",
      },
      {
        art: "regne",
        sek: 90,
        tittel: "La sidene møtes", kort: "Svar",
        sp: `<p>Du har <b>135 millioner liggedøgn</b> og <b>290 liggedøgn per seng</b>.</p>
          <p><b>Hvor mange sykehussenger finnes det i Tyskland?</b></p>`,
        svar: 470000,
        enhet: "sykehussenger",
        toleranse: 0.15,
        fasit: `<div class="formula">
            <div class="eq">135 000 000 / 290 = 465 517 ≈ <b>rundt 470 000 senger</b></div>
          </div>
          <p>Enhetssjekk: liggedøgn per år delt på liggedøgn per seng per år gir senger.</p>
          <p><b>Sanity-sjekkene — og den første er den beste som finnes i market sizing:</b></p>
          <ul>
            <li><b>Senger per tusen innbyggere:</b> 470 000 / 84 millioner er <b>5,6 senger per
              1 000</b>. Dette er den ene helsestatistikken alle land rapporterer, og skalaen er
              kjent: rike land ligger mellom 2 og 8, Norge og Sverige rundt 2–3, Japan og Tyskland i
              toppen. At Tyskland havner høyt, er riktig — det er det landet i Vest-Europa som er
              mest sengeintensivt. <b>At vi lander på 5,6 og ikke på 0,5 eller 50, er selve
              sjekken</b>, og den koster ti sekunder.</li>
            <li><b>Mot Norge:</b> Norge ligger rundt 3 per 1 000. Med 5,6 millioner innbyggere blir
              det rundt 17 000 senger. Tyskland skulle da hatt omtrent dobbelt så mange senger per
              innbygger som Norge — og det stemmer med at norske sykehus er kjent for å skrive ut
              raskt og operere dagkirurgisk der tyske legger inn.</li>
            <li><b>Baklengs til kroner:</b> 135 millioner liggedøgn à 800 euro er <b>rundt 110
              milliarder euro</b> i sykehuskostnader. Tysk BNP er rundt 4 500 milliarder euro, så
              det er 2,4 prosent. Samlede helseutgifter ligger rundt 12 prosent av BNP, altså 540
              milliarder — sykehusdrift som en femtedel av det er riktig størrelsesorden, siden
              legemidler, fastleger, tannhelse og pleie utgjør resten. Denne sjekken bruker ingen av
              tallene i regnestykket og er derfor virkelig uavhengig.</li>
          </ul>
          <p><b>Det som skiller et sterkt svar fra et middels her, er å si hvor du sannsynligvis
          bommer.</b> Fasit ligger nærmere 8 senger per 1 000 for Tyskland, altså i overkant av
          600 000 senger. Vi er tjue til tretti prosent lave — helt akseptabelt for et estimat, men
          <i>et sterkt svar peker på hvilket ledd som er skyldig</i>: innleggelsesraten. Tyskland
          ligger nærmere 25 innleggelser per 100 innbyggere enn 20. Setter du inn 21 millioner
          innleggelser i stedet for 17, får du 580 000 senger og treffer nesten. Å kunne si «hvis
          jeg bommer, bommer jeg på innleggelsesraten, og da bommer jeg lavt» er mer imponerende enn
          å treffe.</p>`,
        krav: [
          "Du regner om til senger per tusen innbyggere og sjekker mot den kjente skalaen 2 til 8.",
          "Du sammenligner mot et land du kjenner, og forklarer hvorfor forskjellen gir mening.",
          "Du gjør minst én sjekk som ikke bruker tall fra regnestykket.",
          "Du sier hvilken vei du tror du bommer, og hvilket ledd som er ansvarlig.",
          "Du oppgir svaret som en størrelsesorden med spenn, ikke som seks siffer.",
        ],
        felle: "Å presentere 465 517 senger. Seks siffer på et tall bygget av to gjetninger er ikke presisjon, det er mangel på selvinnsikt. «Rundt en halv million, la oss si 400 000 til 600 000» er både ærligere og mer nyttig.",
      },
      {
        art: "syntese",
        sek: 90,
        tittel: "Svaret på ett minutt",
        sp: `<p>Utstyrsleverandøren har <b>ett minutt</b>. Gi tallet, usikkerheten og sjekken.</p>`,
        fasit: `<blockquote><p><b>«Rundt en halv million sykehussenger i Tyskland — jeg regner meg
          til 470 000, og vil si spennet er 400 000 til 600 000. Jeg tror jeg ligger i underkant,
          og jeg vet hvorfor.»</b></p>
          <p>Jeg bygde det i liggedøgn, fordi en seng ikke har kunder per time, den har
          okkupasjonstid. 84 millioner tyskere, én av fem legges inn i året, åtte døgn per opphold
          — det er 135 millioner liggedøgn. En seng leverer 365 døgn ganger 80 prosent belegg,
          altså 290 liggedøgn i året, fordi et akuttsykehus må ha ledig kapasitet når ambulansen
          kommer. 135 millioner delt på 290 er 470 000 senger.</p>
          <p>Sanity-sjekken er den beste som finnes i denne typen oppgaver: det er <b>5,6 senger
          per tusen innbyggere</b>. Skalaen er kjent — rike land ligger mellom 2 og 8, Norge rundt
          3, Tyskland i toppen av Europa. Vi lander riktig side av midten.</p>
          <p><b>Den største usikkerheten er innleggelsesraten.</b> Jeg satte den til 20 per 100
          innbyggere, og Tyskland ligger sannsynligvis nærmere 25 — verdens høyeste. Med 25 får jeg
          580 000 senger, og det er nok nærmere sannheten. Liggetiden er den andre usikkerheten,
          men de to henger sammen og trekker i hver sin retning, så produktet er stødigere enn
          leddene.</p>
          <p>Det som betyr noe for dere: <b>Tyskland er ikke et vekstmarked for senger, det er et
          erstatningsmarked i et krympende system.</b> Tyske senger per innbygger har falt i tjue
          år, og sykehusreformen presser videre nedover — så volumet deres kommer fra
          <i>utskifting</i>, ikke fra utbygging. Med en levetid på ti til femten år per seng er det
          i størrelsesorden 40 000 senger i året, og de kjøpes av innkjøpsfellesskap som forhandler
          hardt. Det jeg ville regnet på videre, er ikke antall senger, men <b>kroner per seng og
          hvem som faktisk tar innkjøpsbeslutningen</b> — det avgjør om markedet er attraktivt, ikke
          størrelsen.»</p></blockquote>`,
        krav: [
          "Du gir tallet som en størrelsesorden med spenn, og sier hvilken vei du tror du bommer.",
          "Du gjengir liggedøgn-grepet på tjue sekunder, inkludert hvorfor belegget ikke er 100 prosent.",
          "Du sier senger per tusen innbyggere høyt som sanity-sjekk.",
          "Du peker ut innleggelsesraten som den bærende usikkerheten og kvantifiserer den.",
          "Du trekker en kommersiell konsekvens — erstatningsmarked, ikke vekstmarked — og holder ett minutt.",
        ],
        felle: "Å svare med sengetallet alene når kunden selger utstyr. Den installerte basen er interessant først når den deles på levetiden — det er erstatningsvolumet som er markedet deres, akkurat som i varmepumpecasen. Levetidstrikset hører hjemme i syntesen selv når det ikke trengtes i regnestykket.",
      },
    ],
  },
  {
    id: "estimering-kjokken",
    kategori: "Market sizing",
    label: "Hvor stort er kjøkkenmarkedet i Norge?",
    type: "Estimering",
    nivå: "Intro",
    firma: "Generisk",
    stil: "interviewer-led",
    minutter: 25,
    ch: [],
    blurb: "Levetidstrikset i sin reneste form: fire av fem kjøkken selges til noen som allerede har ett. Trener topp-ned segmentering på boligtype, og følsomheten i den ene forutsetningen som bærer hele svaret.",
    prompt: `<p>Klienten er et dansk kjøkkenkonsern med 200 butikker i Danmark, Sverige og
      Tyskland. De vurderer å åpne i Norge, og styret vil ha ett tall før resten av analysen
      settes i gang.</p>
      <p><b>Hvor stort er det norske markedet for kjøkken til bolig, målt i kroner per år?</b></p>
      <p class="tiny">Ingen kalkulator. Si forutsetningene høyt, rund av åpent, og sanity-sjekk
      svaret til slutt.</p>`,
    bakgrunn: `<p>Kjøkken er den reneste treningen som finnes på <b>levetidstrikset</b>:
      <i>årlig marked = installert base / levetid</i>. Nesten hver eneste bolig i Norge har
      allerede et kjøkken, og det bygges bare rundt 25 000 nye boliger i året. Alt det andre
      salget går til noen som allerede har et kjøkken. Prøver du å gjette «hvor mange pusser opp
      kjøkken i år», gjetter du på et tall ingen har intuisjon for. Installert base og
      utskiftingstakt har man derimot en formening om.</p>
      <p>Det andre casen trener er <b>topp-ned segmentering</b>: du starter på en makrostørrelse
      — antall boliger — og filtrerer nedover langs én akse. Aksen her er boligtype, fordi et
      kjøkken i enebolig og et kjøkken i leilighet er to ulike produkter til to ulike priser.
      Segmenterer du på noe annet, som inntekt eller landsdel, får du ikke tak i den forskjellen
      som faktisk flytter svaret.</p>
      <p>Den tredje tingen — og den de fleste hopper over — er <b>følsomheten</b>. Levetiden på
      et kjøkken er ikke en slitasjegrense, det er en oppussingsbeslutning. Den er derfor det
      mest usikre tallet i hele kjeden, og trinn 5 handler om å si nøyaktig hvor mye den
      usikkerheten er verdt.</p>`,
    trinn: [
      {
        art: "oppklaring",
        sek: 90,
        tittel: "Hva teller vi?",
        sp: `<p>Før du setter opp et eneste ledd: <b>hvilke spørsmål stiller du for å avgrense
          hva som skal telles?</b></p>`,
        fasit: `<p>I en estimeringscase er avklaringene <b>definisjonsspørsmål</b>. De handler om
          fire ting, og du bør dekke alle fire på under et halvt minutt.</p>
          <ul>
            <li><b>Enhet:</b> kroner eller antall kjøkken? Og hvilket ledd — skrog og fronter fra
              fabrikk, eller komplett kjøkken med hvitevarer, benkeplate og montering til
              sluttkunde? De to skiller seg med mer enn en faktor to.</li>
            <li><b>Geografi:</b> Norge, hele landet. Sagt høyt så det ikke ligger som en uuttalt
              antakelse.</li>
            <li><b>Tidsrom:</b> per år. Et marked uten tidsenhet er ikke et marked.</li>
            <li><b>Avgrensning:</b> bare bolig, eller også hytter, næringsbygg og
              institusjonskjøkken? Prompten sier bolig — bekreft det, og si at du holder resten
              utenfor.</li>
          </ul>
          <p>Ett spørsmål til er verdt tiden: <b>teller vi hele kjøkkenet eller bare
          innredningen?</b> Hvitevarer er en tredjedel av prisen og selges av helt andre aktører.
          For en kjede som vurderer inngang, er det avgjørende.</p>
          <p>Så oppsummerer du valget ditt i én setning: «Jeg regner komplette kjøkken til bolig
          i Norge, inkludert hvitevarer og montering, målt i kroner per år.» Det er den setningen
          intervjueren vurderer deg på — ikke antallet spørsmål.</p>
          <p><b>Middels svar:</b> stiller tre gode spørsmål og venter på svar.
          <b>Sterkt svar:</b> stiller tre gode spørsmål, og lukker dem selv med en avgrensning
          intervjueren bare trenger å nikke til.</p>`,
        krav: [
          "Du dekker enhet, geografi, tidsrom og avgrensning — alle fire, kort.",
          "Du spør hvilket ledd i verdikjeden vi måler: fabrikk eller sluttkunde.",
          "Du sier hva du holder utenfor — hytter, næring, institusjon — i stedet for å la det ligge.",
          "Du lukker avklaringen med én setning som definerer hva du nå skal regne.",
        ],
        felle: "Å spørre om ting som ikke endrer regnestykket. «Hvem er konkurrentene?» er et godt spørsmål i en lønnsomhetscase og bortkastet tid i en estimeringscase. Still bare spørsmål der svaret endrer et ledd i kjeden din.",
      },
      {
        art: "struktur",
        sek: 150,
        tittel: "Velg retning, og skriv ligningen",
        sp: `<p>Si <b>topp-ned eller bunn-opp, og hvorfor</b>. Skriv så regnestykket i symboler,
          før du har fått et eneste tall, og si hvilken akse du segmenterer langs.</p>`,
        fasit: `<p><b>Topp-ned.</b> Begrunnelsen skal være konkret, ikke en refleks: kjøkken er et
          forbrukermarked der den relevante makrostørrelsen — antall boliger — er kjent, rund og
          lett å filtrere nedover. Bunn-opp ville krevd at du gjettet antall kjøkkenbutikker og
          hvor mange kjøkken hver av dem selger, og der er begge tallene svakere enn
          boligtallet. <i>Bunn-opp brukes i stedet til å krysspeile til slutt</i> — det er beste
          praksis: gjør den ene veien, sjekk med den andre.</p>
          <div class="formula">
            <div class="eq">Marked (kr/år) = Σ over boligtype [ Antall kjøkken solgt per år × Snittpris ]</div>
            <div class="eq">Kjøkken per år = Erstatningssalg + Nybygg</div>
            <div class="eq">Erstatningssalg = Installert base / Levetid</div>
            <div class="eq">Installert base = Antall boliger (ett kjøkken per bolig)</div>
          </div>
          <p><b>Levetidstrikset</b> er hele grepet. Du vet ikke hvor mange som pusser opp kjøkken
          i år. Du vet omtrent hvor mange boliger det er, og du har en formening om hvor ofte et
          kjøkken byttes. De to tallene gir deg det tredje.</p>
          <p><b>Segmenteringsaksen er boligtype: småhus mot leilighet.</b> Begrunn den. Et
          kjøkken i enebolig er større, dyrere og oftere en full ombygging; et leilighetskjøkken
          er mindre og billigere. Prisforskjellen er den eneste som er stor nok til å flytte
          svaret. Alder, inntekt og landsdel er også ekte akser, men de deler markedet uten å
          endre det — og en modell med tolv segmenter er ikke mer presis enn en med to.</p>
          <p>Merk nevneren mens du er her: <b>bolig, ikke person og ikke husholdning</b>. Ett
          kjøkken per bolig. I Norge er boliger og husholdninger nesten samme tall — rundt 2,65
          millioner begge to — så her spiller valget lite. Si det høyt likevel: «de to faller sammen her,
          så jeg bruker boliger.» Det viser at du vet at de ikke alltid gjør det.</p>
          <p>Til slutt avrundingsregelen: «Jeg runder til nærmeste tusen underveis og flagger
          retningen.» Det er en kvalitetsmarkør, ikke en unnskyldning.</p>
          <p><b>Middels svar:</b> riktig ligning. <b>Sterkt svar:</b> riktig ligning, pluss en
          setning om hvorfor topp-ned og hvorfor akkurat den segmenteringsaksen — og at
          bunn-opp holdes igjen som krysspeiling.</p>`,
        krav: [
          "Du sier topp-ned og begrunner det med at boligtallet er sterkere enn butikktallet.",
          "Du skriver ligningen i symboler før du ser et eneste tall.",
          "Du bruker levetidstrikset i stedet for å gjette en årlig kjøpsrate.",
          "Du velger boligtype som segmenteringsakse og sier hvorfor akkurat den flytter svaret.",
          "Du sier at bunn-opp holdes igjen som krysspeiling, ikke som hovedvei.",
        ],
        felle: "Å gjette direkte: «la oss si at 1 av 20 husholdninger pusser opp kjøkken i år». Legg merke til hva du egentlig har sagt — 1 av 20 er en levetid på 20 år. Du har gjort en levetidsantakelse uten å vite det, og derfor kan du ikke forsvare den. Levetidstrikset gjør den samme antakelsen eksplisitt og diskuterbar.",
      },
      {
        art: "regne",
        sek: 120,
        tittel: "Volumleddet — hvor mange kjøkken?", kort: "Volum",
        sp: `<p>Intervjueren gir deg tallene. <b>Hvor mange kjøkken selges i Norge per år?</b></p>
          <p class="tiny">Bygg det leddvis og si hvert delresultat høyt.</p>`,
        figur: `<table class="data">
            <tr><th>Norske referansetall (SSB)</th><th class="n">Verdi</th></tr>
            <tr><td>Befolkning</td><td class="n">5,6 mill.</td></tr>
            <tr><td>Husholdninger</td><td class="n">2,65 mill.</td></tr>
            <tr><td>Boliger i småhus (enebolig, rekkehus, tomannsbolig)</td><td class="n">1,4 mill.</td></tr>
            <tr><td>Boliger i leilighet og blokk</td><td class="n">1,25 mill.</td></tr>
            <tr><td>Nye småhus ferdigstilt per år</td><td class="n">12 000</td></tr>
            <tr><td>Nye leiligheter ferdigstilt per år</td><td class="n">13 000</td></tr>
            <tr><td>Boutgift per husholdning per år</td><td class="n">135 000 kr</td></tr>
            <tr><td>Dagligvaremarkedet</td><td class="n">230 mrd kr</td></tr>
          </table>
          <table class="data">
            <tr><th>Bransjetall oppgitt av intervjueren</th><th class="n">Verdi</th></tr>
            <tr><td>Hvor ofte et kjøkken byttes</td><td class="n">hvert 25. år</td></tr>
            <tr><td>Snittpris kjøkken i småhus, komplett montert</td><td class="n">120 000 kr</td></tr>
            <tr><td>Snittpris kjøkken i leilighet, komplett montert</td><td class="n">80 000 kr</td></tr>
            <tr><td>Antall kjøkkenbutikker i Norge</td><td class="n">ca. 700</td></tr>
          </table>`,
        svar: 131000,
        enhet: "kjøkken per år",
        toleranse: 0.15,
        fasit: `<p>Fire ledd, hvert med sin enhet:</p>
          <div class="formula">
            <div class="eq">Installert base: 1 400 000 småhus + 1 250 000 leiligheter = 2 650 000 kjøkken</div>
            <div class="eq">Utskifting småhus: 1 400 000 / 25 år = 56 000 per år</div>
            <div class="eq">Utskifting leilighet: 1 250 000 / 25 år = 50 000 per år</div>
            <div class="eq">Nybygg: 12 000 + 13 000 = 25 000 per år</div>
            <div class="eq">Sum: 56 000 + 50 000 + 25 000 = <b>131 000 kjøkken per år</b></div>
          </div>
          <p>Si sammensetningen høyt med én gang, for den er selve innsikten:
          <b>106 000 av 131 000 — 81 prosent — er erstatningssalg.</b> Fire av fem kjøkken selges
          til en bolig som allerede har ett. Nybygget, som er det de fleste tenker på først når de
          hører «kjøkkenmarked», er en femtedel.</p>
          <p>Legg også merke til at 700 kjøkkenbutikker og de to prisene ikke ble brukt her. De
          skal brukes senere — prisene i trinn 4, butikkene til krysspeiling. Å si hvilke tall du
          <i>ikke</i> bruker ennå, og hvorfor, er en billig måte å vise kontroll på.</p>
          <p><b>Middels svar:</b> 131 000. <b>Sterkt svar:</b> 131 000, og setningen «fire av fem
          er erstatning» — før intervjueren spør.</p>`,
        krav: [
          "Du sier enheten på hvert delresultat: boliger, år, kjøkken per år.",
          "Du deler i erstatning og nybygg, og holder de to fra hverandre hele veien.",
          "Du sier at 81 prosent er erstatningssalg, uten å bli spurt.",
          "Du sier hvilke tall på arket du ennå ikke har brukt, og hva du skal bruke dem til.",
        ],
        felle: "Å slå de to boligtypene sammen med én gang fordi levetiden er lik. Da mister du segmentene, og du får dem ikke tilbake i trinn 4 — der prisene er forskjellige. Hold segmentene atskilt til kronene er regnet.",
      },
      {
        art: "regne",
        sek: 120,
        tittel: "Verdileddet — hvor mange kroner?", kort: "Kroner",
        sp: `<p><b>Hvor stort er markedet i millioner kroner per år?</b></p>
          <p class="tiny">Rund av åpent, og sanity-sjekk før du leverer.</p>`,
        svar: 13200,
        enhet: "millioner kroner",
        toleranse: 0.15,
        fasit: `<p>Nå betaler segmenteringen seg. Samle volumet per boligtype først, gang så med
          prisen som hører til:</p>
          <div class="formula">
            <div class="eq">Småhus: 56 000 + 12 000 = 68 000 kjøkken × 120 000 kr = 8 160 mill</div>
            <div class="eq">Leilighet: 50 000 + 13 000 = 63 000 kjøkken × 80 000 kr = 5 040 mill</div>
            <div class="eq">Marked: 8 160 + 5 040 = <b>13 200 millioner kroner = 13,2 milliarder</b></div>
          </div>
          <p>Rund det til <b>13 milliarder</b> når du sier det høyt. Tre sifre er mer presisjon
          enn forutsetningene tåler.</p>
          <p><b>Så sanity-sjekken — det er her et middels svar og et sterkt svar skiller lag.</b>
          Gjør minst to, og si dem høyt.</p>
          <ul>
            <li><b>Mot noe kjent:</b> 13,2 milliarder er 5,7 prosent av dagligvaremarkedet på 230
              milliarder. For en varig innretning i hjemmet som byttes hvert 25. år, er det en
              plausibel størrelsesorden — stort, men ikke urimelig.</li>
            <li><b>Per husholdning:</b> 13 200 millioner fordelt på 2,65 millioner husholdninger
              er rundt 4 980 kroner i året. Det er 3,7 prosent av boutgiften på 135 000 kroner.
              Konsistent.</li>
            <li><b>Baklengs på erstatningsdelen:</b> erstatningssalget alene er
              56 000 × 120 000 + 50 000 × 80 000 = 6 720 + 4 000 = 10 720 millioner, altså 4 045
              kroner per bolig per år. Krysspeil mot prisen delt på levetiden: 120 000 / 25 = 4 800
              for et småhus og 80 000 / 25 = 3 200 for en leilighet. Vektet med 1,4 mot 1,25
              millioner boliger gir det 4 045. Stemmer på kronen.</li>
            <li><b>Bunn-opp som krysspeiling:</b> 700 kjøkkenbutikker som selger rundt 190 kjøkken
              i året — fire i uka — gir 133 000 kjøkken. Samme størrelsesorden som de 131 000 vi
              regnet ovenfra. To uavhengige veier til samme tall er det sterkeste du kan si i en
              estimeringscase.</li>
          </ul>
          <p><b>Middels svar:</b> 13,2 milliarder. <b>Sterkt svar:</b> «rundt 13 milliarder», med
          én sanity-sjekk mot dagligvare og én krysspeiling bunn-opp — begge sagt på under tjue
          sekunder.</p>`,
        krav: [
          "Du ganger hvert segment med sin egen pris i stedet for å bruke ett snitt.",
          "Du runder til to sifre når du sier tallet høyt, og sier at du gjør det.",
          "Du sanity-sjekker mot minst én kjent norsk størrelse, med tallet sagt høyt.",
          "Du krysspeiler baklengs: markedet per bolig skal stemme med pris delt på levetid.",
          "Du krysspeiler bunn-opp mot antall butikker, og sier at det er en uavhengig vei.",
        ],
        felle: "Å bruke ett gjennomsnittlig kjøkken på 100 000 kroner for alle 131 000. Det gir 13,1 milliarder — praktisk talt riktig svar. Og det er nettopp problemet: du fikk riktig tall ved et sammentreff, og du har ingenting å si om hvor forskjellen mellom småhus og leilighet ligger. Riktig svar uten struktur er et middels svar.",
      },
      {
        art: "regne",
        sek: 120,
        tittel: "Følsomhet — hva er tallet verdt?", kort: "Følsomhet",
        sp: `<p>Levetiden på 25 år er den mest usikre forutsetningen i hele kjeden. Et kjøkken
          slites ikke ut — det byttes fordi noen bestemmer seg for å pusse opp.</p>
          <p><b>Hva blir markedet hvis levetiden egentlig er 50 prosent lengre, altså rundt 38 år?
          Svar i millioner kroner.</b></p>`,
        svar: 9630,
        enhet: "millioner kroner",
        toleranse: 0.15,
        fasit: `<p>Det avgjørende grepet er å <b>splitte markedet i den delen som rører seg og
          den som ikke gjør det</b>, før du regner. Nybygget avhenger ikke av levetiden i det
          hele tatt.</p>
          <div class="formula">
            <div class="eq">Erstatningsdelen: 56 000 × 120 000 + 50 000 × 80 000 = 6 720 + 4 000 = 10 720 mill</div>
            <div class="eq">Nybyggdelen: 12 000 × 120 000 + 13 000 × 80 000 = 1 440 + 1 040 = 2 480 mill</div>
            <div class="eq">Kontroll: 10 720 + 2 480 = 13 200 mill ✓</div>
            <div class="eq">50 % lengre levetid ⇒ erstatningsvolumet ganges med 1 / 1,5 = 2/3</div>
            <div class="eq">10 720 × 2/3 = 7 147 mill</div>
            <div class="eq">Nytt marked: 7 147 + 2 480 = <b>9 627 mill ≈ 9,6 milliarder</b></div>
            <div class="eq">Endring: 9 627 / 13 200 − 1 = <b>−27 prosent</b></div>
          </div>
          <p>Lær deg omregningen i midten som et oppslag: <b>50 prosent lengre levetid betyr to
          tredjedeler av volumet</b>, ikke halvparten. 1 / 1,5 = 2/3. Den forveksles konstant, og
          den koster deg 17 prosentpoeng hvis du bommer.</p>
          <p>Nå kommer selve poenget, og det er ikke tallet 9 627. Det er dette: <b>50 prosent
          feil i den viktigste forutsetningen gir 27 prosent feil i svaret, ikke 50.</b>
          Nybygget på 2 480 millioner demper hele slaget, fordi det ikke rører seg når levetiden
          endres. Et marked med en fast, levetidsuavhengig komponent er mer robust enn det ser
          ut.</p>
          <p>Og motsatt vei, som du bør si i samme åndedrag: hvis levetiden er 50 prosent
          <i>kortere</i> — 17 år i stedet for 25 — øker erstatningsdelen med 50 prosent, og markedet
          går til rundt 18,5 milliarder. <b>Det ærlige spennet på dette estimatet er derfor
          10 til 18 milliarder, ikke 13,2.</b> Presisjonen i svaret er begrenset av den svakeste
          forutsetningen, ikke av regningen.</p>
          <p><b>Middels svar:</b> regner riktig og sier 9,6 milliarder. <b>Sterkt svar:</b> deler
          i bevegelig og fast del før det regner, sier at 50 prosent feil bare gir 27 prosent
          utslag, og trekker konsekvensen: spennet er 10 til 18, og det er levetiden som må
          verifiseres først.</p>`,
        krav: [
          "Du splitter i erstatningsdel og nybyggdel før du regner, i stedet for å skalere hele markedet.",
          "Du bruker 1 / 1,5 = 2/3, ikke 0,5, og sier det høyt.",
          "Du sier at 50 prosent feil i forutsetningen gir 27 prosent feil i svaret, og hvorfor.",
          "Du nevner motsatt retning også, og konverterer følsomheten til et ærlig spenn.",
          "Du konkluderer med hvilken forutsetning som må verifiseres først med ekte data.",
        ],
        felle: "Å gange hele markedet med 2/3 og svare 8 800 millioner. Da har du sagt at nybygget også faller når folk pusser opp sjeldnere, og det gir ingen mening — det bygges like mange boliger uansett. Følsomhetsanalyse handler om å vite hvilke ledd forutsetningen faktisk berører.",
      },
      {
        art: "syntese",
        sek: 90,
        tittel: "Anbefalingen",
        sp: `<p>Klienten har <b>ett minutt</b>. Gi tallet, usikkerheten, og hva du ville sjekket
          først med ekte data.</p>`,
        fasit: `<p>Tallet først, spennet med, så det som gjør deg interessant å snakke med.</p>
          <blockquote><p><b>«Det norske kjøkkenmarkedet er rundt 13 milliarder kroner i året —
          omtrent 130 000 kjøkken til en snittpris rundt 100 000 kroner montert. Spennet er
          10 til 18 milliarder, og hele usikkerheten ligger i én forutsetning: hvor ofte et
          kjøkken faktisk byttes.»</b></p>
          <p>Slik kom jeg dit: 2,65 millioner boliger, ett kjøkken i hver, byttet hvert 25. år
          gir 106 000 kjøkken i erstatningssalg. Legg til 25 000 nye boliger, og du er på 131 000.
          Delt i småhus til 120 000 og leilighet til 80 000 blir det 13,2 milliarder.</p>
          <p>Sanity-sjekken holder fra to kanter: det er 5,7 prosent av dagligvaremarkedet, og
          bunn-opp gir 700 butikker × 190 kjøkken = 133 000 — samme tall fra motsatt retning.</p>
          <p>Det viktigste for dere er ikke størrelsen, men <b>sammensetningen: fire av fem
          kjøkken selges til en bolig som allerede har ett.</b> Dette er ikke et vekstmarked
          drevet av boligbygging — det er et oppussingsmarked drevet av hvor lenge folk holder ut
          med kjøkkenet sitt. Det betyr at etterspørselen svinger med rente, boligpriser og
          konsumentenes optimisme, ikke med igangsettingstall. Det flytter hele markedsføringen:
          dere selger en oppussingsbeslutning, ikke en boligkomponent.</p>
          <p>Det jeg ville sjekket først, er nettopp den 25-årige utskiftingstakten — den bærer
          81 prosent av markedet alene. Den finnes i Prognosesenterets oppussingsundersøkelser og
          kan krysspeiles mot importstatistikk på kjøkkeninnredning fra SSB. Deretter ville jeg
          delt de 13 milliardene i innredning, hvitevarer og montering, for de har tre helt ulike
          konkurransebilder — og det avgjør hvor dere skal inn.»</p></blockquote>
          <p><b>Middels svar:</b> tallet, spennet og regnestykket. <b>Sterkt svar:</b> det samme,
          pluss at oppussingsmarkedet er konjunkturdrevet — en strategisk konsekvens av
          sammensetningen, ikke av størrelsen.</p>`,
        krav: [
          "Du gir tallet med et spenn og sier hvilken forutsetning spennet kommer fra.",
          "Du gjengir kjeden på tjue sekunder, ikke hele utregningen.",
          "Du sier sanity-sjekken høyt som en del av svaret.",
          "Du trekker en strategisk konsekvens av at markedet er erstatningsdrevet.",
          "Du navngir konkret hva du ville verifisert først, og hvor du ville funnet det.",
        ],
        felle: "Å si «13,2 milliarder» og stoppe. Klienten kan ikke gjøre noe med et tall. Innsikten er at 81 prosent er oppussing, og at et oppussingsmarked svinger med renta — det er den setningen som avgjør om de tar deg med videre.",
      },
    ],
  },
  {
    id: "estimering-briller",
    kategori: "Market sizing",
    label: "Hvor stort er brillemarkedet i Norge?",
    type: "Estimering",
    nivå: "Middels",
    firma: "Generisk",
    stil: "interviewer-led",
    minutter: 25,
    ch: [],
    blurb: "Fire aldersgrupper der andel, kjøpsfrekvens og pris alle stiger med alderen. Trener segmenteringen som avgjør svaret — og viser hvorfor et anslag bygget på ditt eget liv bommer med en faktor fire.",
    prompt: `<p>Klienten er et nordisk oppkjøpsfond. De har fått tilbud om å kjøpe en norsk
      optikerkjede, og vil ha en uavhengig vurdering av hvor stort markedet er før de går videre
      med due diligence.</p>
      <p><b>Hvor stort er det norske markedet for synskorrigerende briller, målt i kroner per
      år?</b></p>
      <p class="tiny">Ingen kalkulator. Segmenter langs én akse, si forutsetningene høyt, og
      sanity-sjekk svaret til slutt.</p>`,
    bakgrunn: `<p>Briller er casen som lærer deg <b>hvorfor segmentering ikke er pynt</b>. Tre
      forutsetninger — hvor stor andel som bruker briller, hvor ofte de kjøper nye, og hva de
      betaler — stiger alle sammen med alderen. En 25-åring som estimerer fra sitt eget liv
      treffer ikke i nærheten, fordi hele markedet ligger i en aldersgruppe han ikke tilhører.</p>
      <p>Casen trener også <b>levetidstrikset per segment</b>: hver aldersgruppe har sin egen
      installerte base av brillebrukere og sitt eget utskiftingsintervall. Det er den samme
      formelen som i alle andre estimeringscaser — installert base delt på levetid — men brukt
      fire ganger i stedet for én.</p>
      <p>Og det gir en ren kontrast til kjøkkencasen: her er <b>alt</b> erstatningssalg. Det
      finnes ikke noe «nybygg» av mennesker som demper følsomheten. Derfor slår en feil i
      utskiftingstakten rett gjennom til svaret, en-til-en. Den forskjellen er trinn 5.</p>`,
    trinn: [
      {
        art: "oppklaring",
        sek: 90,
        tittel: "Hva teller vi?",
        sp: `<p><b>Hvilke spørsmål stiller du før du setter opp regnestykket?</b></p>`,
        fasit: `<p>Avgrensningen er hardere her enn den ser ut, fordi «brillemarkedet» dekker fire
          ganske ulike produkter.</p>
          <ul>
            <li><b>Enhet og ledd:</b> kroner til sluttkunde, altså det kunden betaler i butikken
              for innfatning og glass samlet? Eller engrosverdien til optikerkjeden? Marginen i
              optikk er høy, så de to skiller seg med mer enn en faktor to.</li>
            <li><b>Bare synskorrigerende briller?</b> Kontaktlinser, solbriller uten styrke og
              synsundersøkelser er tre separate markeder som optikeren selger i samme lokale.
              Prompten sier synskorrigerende briller — bekreft, og si at du holder de andre
              utenfor.</li>
            <li><b>Geografi og tidsrom:</b> Norge, per år.</li>
            <li><b>Teller vi briller eller brillebrukere?</b> Mange har to par — lese og
              avstand. Jeg regner <i>brillekjøp</i> per år, ikke antall personer.</li>
          </ul>
          <p>Så lukker du: «Jeg regner det nordmenn bruker på synskorrigerende briller til
          sluttkundepris, innfatning og glass samlet, per år. Kontaktlinser, solbriller og
          synsundersøkelser holder jeg utenfor og kan legge til etterpå.»</p>
          <p><b>Middels svar:</b> spør om avgrensning. <b>Sterkt svar:</b> spør om avgrensning og
          legger til at de utelatte segmentene kan legges tilbake senere — det signaliserer at du
          har en modell, ikke et regnestykke.</p>`,
        krav: [
          "Du dekker enhet, geografi, tidsrom og avgrensning — alle fire, kort.",
          "Du skiller synskorrigerende briller fra linser, solbriller og synsundersøkelser.",
          "Du avklarer om vi teller briller eller personer, siden mange har flere par.",
          "Du lukker med én setning, og sier at de utelatte segmentene kan legges til etterpå.",
        ],
        felle: "Å godta «brillemarkedet» som en definisjon. Optikerbransjen i Norge omsetter for langt mer enn synskorrigerende briller alene, og hvis intervjueren senere sammenligner tallet ditt med bransjetall, må du kunne si nøyaktig hva du har utelatt.",
      },
      {
        art: "struktur",
        sek: 150,
        tittel: "Velg retning, og velg aksen",
        sp: `<p>Si <b>topp-ned eller bunn-opp, og hvorfor</b>. Skriv ligningen i symboler, og si
          hvilken akse du segmenterer langs — og hvorfor akkurat den.</p>`,
        fasit: `<p><b>Topp-ned.</b> Begrunnelsen: befolkningen er den sikreste makrostørrelsen som
          finnes, og briller er et rent forbrukerprodukt der veien fra befolkning til kjøp er
          kort. Bunn-opp — antall optikerbutikker ganger omsetning per butikk — er mulig, men
          begge de to tallene er svakere enn befolkningstallet. Behold bunn-opp til
          krysspeilingen.</p>
          <div class="formula">
            <div class="eq">Marked (kr/år) = Σ over aldersgruppe [ Brillekjøp per år × Snittpris ]</div>
            <div class="eq">Brillekjøp per år = Brillebrukere i gruppen / Utskiftingsintervall</div>
            <div class="eq">Brillebrukere = Antall personer i gruppen × Andel med briller</div>
          </div>
          <p>Legg merke til at midterste linje er <b>levetidstrikset igjen</b>, bare brukt per
          segment: installert base av brillebrukere delt på hvor ofte de kjøper nye.</p>
          <p><b>Aksen er alder.</b> Og her må begrunnelsen være skarp, for det er hele casen:
          <i>alle tre forutsetningene beveger seg samme vei med alderen.</i> Andelen som bruker
          briller går fra rundt 15 prosent blant barn til rundt 90 prosent blant de eldste.
          Kjøpsfrekvensen stiger igjen etter 45, når aldersynthet setter inn og styrken endrer
          seg. Og prisen stiger, fordi progressive glass koster langt mer enn enstyrkeglass. Tre
          faktorer som forsterker hverandre — <b>det er akkurat da segmentering betyr noe.</b>
          Var én av dem konstant på tvers av alder, kunne du regnet med et snitt.</p>
          <p>Si også hvorfor du <i>ikke</i> velger andre akser: kjønn deler befolkningen i to
          nesten like halvdeler uten å endre noen av de tre forutsetningene, og inntekt påvirker
          bare prisen. Alder påvirker alle tre. En akse er verdt å bruke når den flytter flere
          ledd samtidig.</p>
          <p>Enheten er <b>person, ikke husholdning</b>. Briller kjøpes per par øyne. Si det
          høyt — det er den samme sjekken som redder deg i markeder der svaret er motsatt.</p>
          <p><b>Middels svar:</b> «Jeg segmenterer på alder.» <b>Sterkt svar:</b> «Jeg segmenterer
          på alder fordi andel, frekvens og pris alle stiger med den — tre forutsetninger, én
          akse. Kjønn ville delt uten å forklare.»</p>`,
        krav: [
          "Du sier topp-ned og begrunner valget, i stedet for å ta det som gitt.",
          "Du skriver ligningen i symboler, med levetidstrikset som midterste ledd.",
          "Du begrunner aldersaksen med at den flytter tre forutsetninger samtidig.",
          "Du sier hvorfor du forkaster de andre aksene — det viser at du valgte, ikke gjettet.",
          "Du sier at enheten er person, ikke husholdning, og hvorfor.",
        ],
        felle: "Å segmentere på fire akser samtidig — alder, kjønn, by/land og inntekt — fordi det føles grundig. Da får du seksten celler du må gjette tall for, og hver eneste gjetning legger til støy. Én akse, valgt fordi den flytter flest ledd, slår fire akser hver gang.",
      },
      {
        art: "regne",
        sek: 150,
        tittel: "Volumleddet — hvor mange briller?", kort: "Volum",
        sp: `<p>Intervjueren gir deg tallene. <b>Hvor mange synskorrigerende briller selges i
          Norge per år?</b></p>
          <p class="tiny">Regn segment for segment. Sjekk befolkningssummen først.</p>`,
        figur: `<table class="data">
            <tr><th>Aldersgruppe</th><th class="n">Personer</th><th class="n">Andel med briller</th><th class="n">Nye briller hvert</th><th class="n">Snittpris</th></tr>
            <tr><td>0–19 år</td><td class="n">1,25 mill.</td><td class="n">15 %</td><td class="n">3. år</td><td class="n">3 000 kr</td></tr>
            <tr><td>20–44 år</td><td class="n">1,85 mill.</td><td class="n">35 %</td><td class="n">5. år</td><td class="n">4 000 kr</td></tr>
            <tr><td>45–66 år</td><td class="n">1,55 mill.</td><td class="n">80 %</td><td class="n">4. år</td><td class="n">5 000 kr</td></tr>
            <tr><td>67 år og eldre</td><td class="n">0,95 mill.</td><td class="n">90 %</td><td class="n">3. år</td><td class="n">4 500 kr</td></tr>
            <tr><td><b>Sum befolkning</b></td><td class="n"><b>5,6 mill.</b></td><td class="n">—</td><td class="n">—</td><td class="n">—</td></tr>
          </table>
          <table class="data">
            <tr><th>Til sanity-sjekk</th><th class="n">Verdi</th></tr>
            <tr><td>Dagligvaremarkedet</td><td class="n">230 mrd kr</td></tr>
            <tr><td>Dagligvare per innbygger per år</td><td class="n">41 000 kr</td></tr>
            <tr><td>Nyregistrerte personbiler per år</td><td class="n">185 000</td></tr>
            <tr><td>Gjennomsnittspris ny personbil</td><td class="n">450 000 kr</td></tr>
          </table>`,
        svar: 787000,
        enhet: "briller per år",
        toleranse: 0.15,
        fasit: `<p>Første grep, før noe annet: <b>sjekk at aldersgruppene summerer til
          befolkningen.</b> 1,25 + 1,85 + 1,55 + 0,95 = 5,6 millioner. Det gjør de. Ti sekunder
          som fanger den vanligste tabellfeilen av alle.</p>
          <p>Så to ledd per segment — først brukere, så kjøp per år:</p>
          <div class="formula">
            <div class="eq">0–19: 1 250 000 × 15 % = 187 500 brukere → / 3 år = 62 500 briller</div>
            <div class="eq">20–44: 1 850 000 × 35 % = 647 500 brukere → / 5 år = 129 500 briller</div>
            <div class="eq">45–66: 1 550 000 × 80 % = 1 240 000 brukere → / 4 år = 310 000 briller</div>
            <div class="eq">67+: 950 000 × 90 % = 855 000 brukere → / 3 år = 285 000 briller</div>
            <div class="eq">Brillebrukere: 187 500 + 647 500 + 1 240 000 + 855 000 = 2 930 000</div>
            <div class="eq">Briller per år: 62 500 + 129 500 + 310 000 + 285 000 = <b>787 000</b></div>
          </div>
          <p>Krysspeil brukertallet med én gang: <b>2,93 millioner av 5,6 millioner — 52 prosent
          av befolkningen bruker briller.</b> Det er et tall du kan kjenne på. Hadde det kommet ut
          på 20 prosent eller 85 prosent, hadde en av andelene i tabellen vært feillest.</p>
          <p>Legg merke til fordelingen allerede nå: <b>45-åringene og oppover står for 595 000 av
          de 787 000 brillene — 76 prosent av volumet fra 45 prosent av befolkningen.</b></p>
          <p><b>Middels svar:</b> 787 000. <b>Sterkt svar:</b> 787 000, med befolkningssummen
          sjekket først og penetrasjonen på 52 prosent brukt som mellomliggende sanity-sjekk — før
          man går videre til kroner.</p>`,
        krav: [
          "Du sjekker at aldersgruppene summerer til befolkningen før du regner noe som helst.",
          "Du regner brukere og kjøp per år som to atskilte ledd i hvert segment.",
          "Du krysspeiler at 52 prosent av befolkningen bruker briller — et tall du kan kjenne på.",
          "Du sier hvor tyngden ligger, at 45+ står for tre firedeler av volumet.",
        ],
        felle: "Å gange andel og frekvens i ett hopp: «15 prosent delt på 3». Det gir riktig svar her, men du mister brukertallet — og brukertallet er den eneste mellomstørrelsen i hele kjeden du har ekte intuisjon for. Regn det ut, og bruk det som sjekkpunkt.",
      },
      {
        art: "regne",
        sek: 120,
        tittel: "Verdileddet — hvor mange kroner?", kort: "Kroner",
        sp: `<p><b>Hvor stort er markedet i millioner kroner per år?</b></p>
          <p class="tiny">Hvert segment har sin egen pris. Sanity-sjekk før du leverer.</p>`,
        svar: 3538,
        enhet: "millioner kroner",
        toleranse: 0.15,
        fasit: `<div class="formula">
            <div class="eq">0–19: 62 500 × 3 000 kr = 187,5 mill</div>
            <div class="eq">20–44: 129 500 × 4 000 kr = 518 mill</div>
            <div class="eq">45–66: 310 000 × 5 000 kr = 1 550 mill</div>
            <div class="eq">67+: 285 000 × 4 500 kr = 1 282,5 mill</div>
            <div class="eq">Marked: 187,5 + 518 + 1 550 + 1 282,5 = <b>3 538 mill ≈ 3,5 milliarder</b></div>
          </div>
          <p><b>Nå kommer tallet som er verdt hele casen:</b> segmentene over 45 år står for
          1 550 + 1 282,5 = 2 832 millioner, altså <b>80 prosent av markedet fra 45 prosent av
          befolkningen</b>. Under 45 er 55 prosent av befolkningen og 20 prosent av kronene. Det
          er den slags setning som gjør at intervjueren husker deg.</p>
          <p>Sanity-sjekkene, minst to, sagt høyt:</p>
          <ul>
            <li><b>Per innbygger:</b> 3 538 millioner / 5,6 millioner = 632 kroner per nordmann
              per år på briller. Mot 41 000 kroner på dagligvarer er det 1,5 prosent. Plausibelt
              for et produkt de fleste kjøper hvert tredje til femte år.</li>
            <li><b>Per bruker:</b> 3 538 millioner / 2,93 millioner brillebrukere = 1 208 kroner
              per bruker per år. Krysspeil mot ett segment: 45–66-åringen betaler 5 000 kroner
              hvert fjerde år, altså 1 250 i året. Konsistent.</li>
            <li><b>Mot noe kjent:</b> 1,5 prosent av dagligvaremarkedet, og 4 prosent av
              nybilsalget på 185 000 × 450 000 ≈ 83 milliarder. Riktig størrelsesorden for et
              lite, men stabilt forbrukermarked.</li>
          </ul>
          <p><b>Og her er hvorfor aksen var verdt bryet.</b> Hadde du estimert usegmentert, fra
          ditt eget liv — «rundt 30 prosent bruker briller, de kjøper nye hvert femte år, og en
          brille koster 2 500» — ville du fått
          5,6 mill × 30 % / 5 år × 2 500 kr = <b>840 millioner</b>. Det er en fjerdedel av riktig
          svar; du hadde bommet med en faktor på over fire. Ikke fordi gjennomsnitt er ulovlig,
          men fordi <i>du har ingen intuisjon for befolkningsgjennomsnitt av noe som henger på
          alder</i> — du har bare intuisjon for din egen aldersgruppe. Segmenteringen er det som
          tvinger deg til å tenke på de andres.</p>
          <p><b>Middels svar:</b> 3,5 milliarder med én sanity-sjekk. <b>Sterkt svar:</b> 3,5
          milliarder, pluss «80 prosent av markedet er over 45» — og en setning om at et
          usegmentert anslag ville bommet med en faktor fire.</p>`,
        krav: [
          "Du bruker segmentets egen pris, ikke ett snitt over hele befolkningen.",
          "Du sier at 80 prosent av markedet ligger over 45 år, uten å bli spurt.",
          "Du sanity-sjekker per innbygger og krysspeiler per bruker mot ett segment.",
          "Du sier hva et usegmentert anslag ville gitt, og hvorfor det bommer.",
          "Du runder når du sier tallet: «rundt 3,5 milliarder», ikke «3 538».",
        ],
        felle: "Å bruke gjennomsnittsprisen 4 125 kroner (snittet av de fire) på alle 787 000 brillene. Det gir 3,25 milliarder — 8 prosent for lavt, fordi de dyre brillene også er de som kjøpes oftest. Når pris og volum henger sammen, er et uveid snitt alltid feil vei.",
      },
      {
        art: "regne",
        sek: 120,
        tittel: "Følsomhet — hva er tallet verdt?", kort: "Følsomhet",
        sp: `<p>Utskiftingsintervallene er de svakeste tallene i tabellen. Ingen vet egentlig hvor
          lenge folk går med de samme brillene, og optikerkjedene har all interesse av at tallet
          skal være lavt.</p>
          <p><b>Hvor mange prosent faller markedet hvis folk går 50 prosent lengre med brillene
          sine enn antatt?</b></p>
          <p class="tiny">Oppgi fallet som et positivt tall.</p>`,
        svar: 33,
        enhet: "prosent",
        toleranse: 0.15,
        fasit: `<p>Her er svaret enklere enn i de fleste andre estimeringscaser, og
          <b>nettopp derfor er innsikten større.</b></p>
          <div class="formula">
            <div class="eq">Alle fire intervallene ganges med 1,5: 3 → 4,5 år, 5 → 7,5 år, 4 → 6 år</div>
            <div class="eq">Volum i hvert segment ganges dermed med 1 / 1,5 = 2/3</div>
            <div class="eq">Hele markedet ganges med 2/3: 3 538 × 2/3 = 2 359 mill</div>
            <div class="eq">Endring: 2 359 / 3 538 − 1 = <b>−33 prosent</b></div>
          </div>
          <p>Legg merke til at du ikke måtte regne segmentene om igjen. Når <i>alle</i> segmentene
          skaleres med samme faktor, kan du skalere totalen direkte. Å se det sparer deg et helt
          minutt — og å si at du ser det, viser at du forstår strukturen i din egen modell.</p>
          <p><b>Sammenlign nå med kjøkkencasen, for det er hele poenget:</b> der ga 50 prosent
          lengre levetid bare 27 prosent utslag, fordi nybygget på 2,5 milliarder ikke rørte seg.
          Her er <b>hele markedet erstatningssalg</b> — det finnes ingen nybygde mennesker som
          demper slaget. Feilen slår derfor rett gjennom, en-til-en.</p>
          <div class="formula">
            <div class="eq">Rent erstatningsmarked: 50 % lengre levetid ⇒ −33 % marked</div>
            <div class="eq">Med 19 % fast nybyggandel: 50 % lengre levetid ⇒ −27 % marked</div>
          </div>
          <p>Den generelle regelen er verdt å ta med seg: <b>følsomheten for levetid er lik
          erstatningssalgets andel av markedet.</b> Jo mer av markedet som er gjenkjøp, jo mer
          skjørt er estimatet ditt for utskiftingstakten.</p>
          <p>Konsekvensen for klienten: det ærlige spennet er ikke 3,4 til 3,7 milliarder. Det er
          <b>2,4 til 5 milliarder</b>, og fondet kan ikke prise en optikerkjede på et estimat med
          det spennet. Det første de må kjøpe, er kassadata — faktisk gjenkjøpsintervall per
          aldersgruppe fra kjedens eget system.</p>
          <p><b>Middels svar:</b> −33 prosent. <b>Sterkt svar:</b> −33 prosent, med observasjonen
          at hele markedet skalerer fordi det ikke finnes en fast komponent, og konklusjonen at
          gjenkjøpsintervallet er det eneste tallet det er verdt å kjøpe data på.</p>`,
        krav: [
          "Du ser at alle segmentene skaleres likt, og skalerer totalen i stedet for å regne om.",
          "Du bruker 1 / 1,5 = 2/3, ikke 0,5.",
          "Du sier hvorfor utslaget er større her enn i et marked med nybygg.",
          "Du oversetter følsomheten til et ærlig spenn, og sier at det er for bredt til å prise på.",
          "Du navngir det ene tallet klienten bør kjøpe data på, i stedet for å liste fem.",
        ],
        felle: "Å svare −50 prosent. 50 prosent lengre levetid gir 1 / 1,5 = to tredjedeler av volumet, altså et fall på en tredjedel. Feilen er den samme som å tro at en prisøkning på 25 prosent reverseres av et kutt på 25 prosent — brøken snus ikke ved å bytte fortegn.",
      },
      {
        art: "syntese",
        sek: 90,
        tittel: "Anbefalingen",
        sp: `<p>Fondet har <b>ett minutt</b>. Gi tallet, usikkerheten, og hva du ville sjekket
          først med ekte data.</p>`,
        fasit: `<blockquote><p><b>«Det norske markedet for synskorrigerende briller er rundt 3,5
          milliarder kroner i året — omtrent 790 000 briller til rundt 4 500 kroner i snitt.
          Spennet er 2,5 til 5 milliarder, og usikkerheten ligger nesten i sin helhet i hvor ofte
          folk faktisk kjøper nye briller.»</b></p>
          <p>Slik kom jeg dit: 5,6 millioner nordmenn, delt i fire aldersgrupper. 2,9 millioner
          bruker briller — 52 prosent av befolkningen — og hver av dem kjøper nye hvert tredje til
          femte år. Det gir 790 000 briller, til priser fra 3 000 for barn til 5 000 for
          progressive glass.</p>
          <p>Sanity-sjekken holder: 630 kroner per nordmann per år, som er 1,5 prosent av det vi
          bruker på mat.</p>
          <p>Det viktigste for dere er ikke størrelsen, men <b>hvor den ligger: 80 prosent av
          markedet er kunder over 45 år, som er 45 prosent av befolkningen.</b> Dette er ikke et
          ungdomsmarked med moteinnfatninger — det er et helsemarked for progressive glass. Og det
          har to konsekvenser for kjøpet dere vurderer. For det første er markedet strukturelt
          voksende, fordi den aldersgruppen vokser raskere enn befolkningen. For det andre er
          verdien i kjeden lokalisert til synsundersøkelsen og glassleveransen, ikke til
          innfatningen — det er der en netthandelskonkurrent ikke kommer til.</p>
          <p>Det jeg ville sjekket først, er gjenkjøpsintervallet i kjedens egne kassadata, per
          aldersgruppe. Det ene tallet bestemmer 100 prosent av estimatet mitt. Deretter ville jeg
          lagt til kontaktlinser, solbriller og synsundersøkelser, som jeg har holdt utenfor — for
          en optikerkjede kan de være halvparten av omsetningen.»</p></blockquote>
          <p><b>Middels svar:</b> tallet, spennet og kjeden. <b>Sterkt svar:</b> det samme, pluss
          at aldersprofilen gjør markedet strukturelt voksende og flytter verdien fra innfatning
          til glass — en konsekvens av segmenteringen, ikke av størrelsen.</p>`,
        krav: [
          "Du gir tallet med spenn og navngir den ene forutsetningen spennet kommer fra.",
          "Du gjengir segmenteringen på tjue sekunder, ikke alle fire utregningene.",
          "Du sier sanity-sjekken høyt som en del av svaret.",
          "Du trekker en strategisk konsekvens av aldersprofilen, ikke bare av størrelsen.",
          "Du minner om hva du utelot, og hvor stort det kan være.",
        ],
        felle: "Å ikke nevne det du utelot. Fondet får et bransjetall på 7 milliarder fra selgeren, og hvis du ikke har sagt at ditt tall er briller alene — uten linser, solbriller og synsundersøkelser — ser det ut som du bommet med en faktor to.",
      },
    ],
  },
  {
    id: "estimering-lonnssystem",
    kategori: "Market sizing",
    label: "Hvor stort er markedet for lønnssystemer til norske bedrifter?",
    type: "Estimering",
    nivå: "Middels",
    firma: "Generisk",
    stil: "interviewer-led",
    minutter: 25,
    ch: [],
    blurb: "B2B: nevneren er ansatte i bedrifter med ansatte, ikke innbyggere — og to av tre norske bedrifter har ingen. Trener segmentering på bedriftsstørrelse, og følsomheten som viser at den mest usikre forutsetningen ikke alltid er den viktigste.",
    prompt: `<p>Klienten er en svensk leverandør av skybasert lønns- og HR-programvare. De har
      200 millioner kroner i omsetning i Sverige og vurderer å etablere seg i Norge. Styret vil
      ha markedsstørrelsen før de bevilger noe som helst.</p>
      <p><b>Hvor stort er det norske markedet for skybaserte lønns- og HR-systemer, målt i kroner
      per år?</b></p>
      <p class="tiny">Ingen kalkulator. Vær særlig nøye med hva nevneren er.</p>`,
    bakgrunn: `<p>B2B-estimering er der flest kandidater går i den samme grøfta: de starter på
      befolkningen fordi det er tallet de kan. Men <b>et B2B-marked har ikke innbyggere i
      nevneren</b> — det har bedrifter, eller ansatte, eller maskiner, eller kvadratmeter. Å
      finne den riktige tellenheten er hele første halvdel av casen.</p>
      <p>Norge har en felle innebygd i tallene her, og den er ekte: det finnes rundt 650 000
      aktive bedrifter, men bare rundt 200 000 av dem har en eneste ansatt. To av tre norske
      «bedrifter» er enkeltpersonforetak og holdingselskaper uten lønnsutbetaling. Bruker du
      650 000 som nevner i et marked som handler om å kjøre lønn, overvurderer du markedet med
      en faktor tre — og det er en feil intervjueren kjenner igjen umiddelbart.</p>
      <p>Casen trener også en av de nyttigste sanity-sjekkene i norsk sammenheng:
      <b>lønnssummen</b>. 2,9 millioner sysselsatte à 62 000 kroner i måneden er rundt 2 150
      milliarder i året, omtrent halve Fastlands-BNP. Et system som administrerer lønn kan måles
      som en promilleandel av lønnen det administrerer.</p>`,
    trinn: [
      {
        art: "oppklaring",
        sek: 90,
        tittel: "Hva teller vi?",
        sp: `<p><b>Hvilke spørsmål stiller du før du setter opp regnestykket?</b> Vær særlig
          konkret på hva tellenheten skal være.</p>`,
        fasit: `<p>I en B2B-case er det viktigste avklaringsspørsmålet alltid det samme:
          <b>hva er kundeenheten?</b> Er det bedriften som kjøper, eller er det den ansatte som
          prises?</p>
          <ul>
            <li><b>Tellenhet:</b> selges dette per bedrift, per ansatt, eller per lønnskjøring?
              Nesten all HR-programvare prises per ansatt per måned, og da er det <i>ansatte</i>
              som er nevneren — men bedriften er den som bestemmer.</li>
            <li><b>Avgrensning av kjøperne:</b> bare private bedrifter, eller også kommuner,
              helseforetak og staten? Offentlig sektor er nesten en tredel av alle sysselsatte i
              Norge og kjøper gjennom helt andre kanaler — offentlige anbud, ikke selvbetjening.
              Jeg tar med begge deler her og flagger at kanalen er ulik.</li>
            <li><b>Produktavgrensning:</b> bare lønn, eller også ferie, fravær, rekruttering og
              kompetansestyring? De ligger ofte i samme abonnement, men prisen dobles med
              modulene.</li>
            <li><b>Geografi og tidsrom:</b> Norge, per år, målt som årlig abonnementsinntekt.</li>
          </ul>
          <p>Lukk: «Jeg regner årlig abonnementsinntekt for skybaserte lønns- og HR-systemer til
          norske arbeidsgivere, priset per ansatt per måned.»</p>
          <p><b>Middels svar:</b> spør om avgrensning. <b>Sterkt svar:</b> spør eksplisitt om
          tellenheten, og legger merke til at kjøperen (bedriften) og prisenheten (den ansatte)
          er to forskjellige ting — det er det som styrer hele segmenteringen etterpå.</p>`,
        krav: [
          "Du spør eksplisitt hva tellenheten er: bedrift, ansatt eller transaksjon.",
          "Du skiller kjøperen fra prisenheten, og sier at de er to forskjellige ting.",
          "Du tar stilling til om offentlig sektor er med, og sier hvorfor det betyr noe.",
          "Du lukker med én setning som definerer hva du regner, med tidsenhet.",
        ],
        felle: "Å hoppe rett til «hvor mange bedrifter er det i Norge». Det er et tall, ikke en tellenhet. Spør først om produktet prises per bedrift eller per ansatt — svaret bestemmer hvilken nevner du skal lete etter, og de to gir ulike svar.",
      },
      {
        art: "struktur",
        sek: 150,
        tittel: "Velg retning, og finn riktig nevner",
        sp: `<p>Si <b>topp-ned eller bunn-opp, og hvorfor</b>. Skriv ligningen i symboler, og si
          hvilken makrostørrelse du starter på — og hvilken du forkaster.</p>`,
        fasit: `<p><b>Topp-ned, men fra arbeidslivet, ikke fra befolkningen.</b> Det er
          begrunnelsen som teller: makrostørrelsen må være den som faktisk genererer behovet.
          Behovet for et lønnssystem oppstår når noen får lønn — altså hos <i>ansatte i bedrifter
          med ansatte</i>. Befolkningen på 5,6 millioner er feil nevner med nesten en faktor to,
          og antall aktive bedrifter er feil nevner med en faktor tre.</p>
          <div class="formula">
            <div class="eq">Marked (kr/år) = Σ over bedriftsstørrelse [ Ansatte × Dekningsgrad × Pris per ansatt per mnd × 12 ]</div>
            <div class="eq">Ansatte i segmentet = Antall bedrifter × Gjennomsnittlig antall ansatte</div>
          </div>
          <p><b>Segmenteringsaksen er bedriftsstørrelse.</b> Begrunn den med at den flytter to ting
          samtidig, akkurat som aldersaksen gjorde i brillecasen — men motsatt vei:</p>
          <ul>
            <li><b>Dekningsgraden stiger med størrelsen.</b> Et selskap med 300 ansatte
              <i>må</i> ha et system. Et med to ansatte kan la regnskapsføreren kjøre lønn i sitt
              eget system, og betaler da ingenting selv.</li>
            <li><b>Prisen per ansatt faller med størrelsen.</b> Det er standard i all B2B-
              programvare: volumrabatt og forhandlingsmakt. En kunde med 500 ansatte betaler ikke
              samme sats per hode som en med tre.</li>
          </ul>
          <p>De to trekker i hver sin retning, og det er nettopp derfor du <b>ikke</b> kan regne
          med et gjennomsnitt. Bruker du én pris for alle, får du et tall som er feil i begge
          ender og tilfeldig riktig i midten — og du kan ikke si et ord om hvilket segment som
          faktisk er verdt å gå etter.</p>
          <p>Si også hvilken størrelse du skal <i>lete</i> etter i faktaarket, før du får det:
          «Jeg trenger antall bedrifter med minst én ansatt, ikke antall registrerte foretak.»
          Å be om riktig tall er en sterkere markør enn å regne riktig med feil tall.</p>
          <p><b>Middels svar:</b> segmenterer på bedriftsstørrelse. <b>Sterkt svar:</b> segmenterer
          på bedriftsstørrelse <i>og</i> sier at dekningsgrad og pris beveger seg motsatt vei langs
          aksen — som er selve grunnen til at aksen er riktig.</p>`,
        krav: [
          "Du forkaster befolkningen som nevner eksplisitt, og sier hvorfor.",
          "Du ber om antall bedrifter med ansatte, ikke antall registrerte foretak.",
          "Du skriver ligningen med dekningsgrad som eget ledd, ikke bakt inn i prisen.",
          "Du begrunner bedriftsstørrelse med at dekningsgrad og pris beveger seg motsatt vei.",
          "Du sier at ansatte er prisenheten mens bedriften er kjøperen, og holder de to fra hverandre.",
        ],
        felle: "Å utelate dekningsgraden fordi «alle må jo kjøre lønn». Alle må kjøre lønn — men ikke alle kjøper et eget system for det. I mikrobedrifter ligger lønnskjøringen hos regnskapsføreren, og da er kunden regnskapsføreren, ikke bedriften. Uten et dekningsgradsledd har du ikke noe sted å håndtere den forskjellen.",
      },
      {
        art: "regne",
        sek: 150,
        tittel: "Volumleddet — hvor mange ansatte betales det for?", kort: "Volum",
        sp: `<p>Intervjueren gir deg tallene. <b>Hvor mange ansatte ligger på et betalt skybasert
          lønns- og HR-system i Norge?</b></p>
          <p class="tiny">Sjekk at antall ansatte i segmentene stemmer med sysselsettingstallet
          før du går videre.</p>`,
        figur: `<table class="data">
            <tr><th>Norske referansetall (SSB)</th><th class="n">Verdi</th></tr>
            <tr><td>Befolkning</td><td class="n">5,6 mill.</td></tr>
            <tr><td>Sysselsatte</td><td class="n">2,9 mill.</td></tr>
            <tr><td>Aktive bedrifter</td><td class="n">0,65 mill.</td></tr>
            <tr><td>— av dem med minst én ansatt</td><td class="n">0,2 mill.</td></tr>
            <tr><td>Gjennomsnittlig månedslønn</td><td class="n">62 000 kr</td></tr>
            <tr><td>Fastlands-BNP</td><td class="n">4 400 mrd kr</td></tr>
            <tr><td>Dagligvaremarkedet</td><td class="n">230 mrd kr</td></tr>
          </table>
          <table class="data">
            <tr><th>Bedrifter med ansatte, etter størrelse</th><th class="n">Bedrifter</th><th class="n">Snitt ansatte</th><th class="n">På betalt skysystem</th><th class="n">Pris per ansatt/mnd</th></tr>
            <tr><td>1–4 ansatte</td><td class="n">120 000</td><td class="n">2</td><td class="n">40 %</td><td class="n">250 kr</td></tr>
            <tr><td>5–19 ansatte</td><td class="n">60 000</td><td class="n">10</td><td class="n">70 %</td><td class="n">150 kr</td></tr>
            <tr><td>20–99 ansatte</td><td class="n">16 000</td><td class="n">40</td><td class="n">85 %</td><td class="n">100 kr</td></tr>
            <tr><td>100 ansatte og over</td><td class="n">4 000</td><td class="n">350</td><td class="n">90 %</td><td class="n">50 kr</td></tr>
          </table>`,
        svar: 2320000,
        enhet: "ansatte",
        toleranse: 0.15,
        fasit: `<p>Sjekk tabellen mot makrotallene <i>først</i>. To kontroller, ti sekunder:</p>
          <div class="formula">
            <div class="eq">Bedrifter: 120 000 + 60 000 + 16 000 + 4 000 = 200 000 ✓ (SSB: 0,2 mill. med ansatte)</div>
            <div class="eq">Ansatte: 240 000 + 600 000 + 640 000 + 1 400 000 = 2 880 000 ✓ (SSB: 2,9 mill. sysselsatte)</div>
          </div>
          <p>Begge stemmer. Nå vet du at tabellen er konsistent med makrotallene, og du kan regne
          videre uten å lure på om du har mistet en gruppe.</p>
          <div class="formula">
            <div class="eq">1–4: 120 000 × 2 = 240 000 ansatte × 40 % = 96 000</div>
            <div class="eq">5–19: 60 000 × 10 = 600 000 ansatte × 70 % = 420 000</div>
            <div class="eq">20–99: 16 000 × 40 = 640 000 ansatte × 85 % = 544 000</div>
            <div class="eq">100+: 4 000 × 350 = 1 400 000 ansatte × 90 % = 1 260 000</div>
            <div class="eq">Sum: 96 000 + 420 000 + 544 000 + 1 260 000 = <b>2 320 000 ansatte</b></div>
          </div>
          <p>Si strukturen høyt med én gang: <b>4 000 bedrifter — 2 prosent av alle med ansatte —
          har 1,4 millioner av de 2,9 millionene, altså nesten halvparten av arbeidsstyrken.</b>
          Norsk næringsliv er ikke et hav av små bedrifter når man teller hoder; det er noen få
          store og veldig mange bittesmå. Den observasjonen kommer til å bære hele anbefalingen i
          trinn 6.</p>
          <p><b>Middels svar:</b> 2,32 millioner. <b>Sterkt svar:</b> 2,32 millioner, med begge
          makrokontrollene gjort først og observasjonen om at 2 prosent av bedriftene har 49
          prosent av de ansatte.</p>`,
        krav: [
          "Du kontrollerer både bedriftssummen og ansattsummen mot SSB-tallene før du regner.",
          "Du bruker antall bedrifter med ansatte, ikke de 650 000 registrerte foretakene.",
          "Du regner ansatte og dekkede ansatte som to atskilte ledd.",
          "Du sier at 2 prosent av bedriftene har halvparten av de ansatte, uten å bli spurt.",
        ],
        felle: "Å regne ansatte som 2,9 millioner delt på 200 000 bedrifter = 14,5 i snitt, og bruke det på alle. Gjennomsnittet på 14,5 finnes ikke i virkeligheten — det ligger mellom to segmenter som begge er langt fra det. Det er hele grunnen til at aksen finnes.",
      },
      {
        art: "regne",
        sek: 120,
        tittel: "Verdileddet — hvor mange kroner?", kort: "Kroner",
        sp: `<p><b>Hvor stort er markedet i millioner kroner per år?</b></p>
          <p class="tiny">Husk at prisen er per måned. Sanity-sjekk mot lønnssummen før du
          leverer.</p>`,
        svar: 2453,
        enhet: "millioner kroner",
        toleranse: 0.15,
        fasit: `<p>Prisen er per ansatt per <i>måned</i>. Gang med 12 én gang per segment, eller
          gang totalen til slutt — men si hvilken av delene du gjør, for det er her folk mister
          en faktor tolv.</p>
          <div class="formula">
            <div class="eq">1–4: 96 000 × 250 kr × 12 = 96 000 × 3 000 = 288 mill</div>
            <div class="eq">5–19: 420 000 × 150 kr × 12 = 420 000 × 1 800 = 756 mill</div>
            <div class="eq">20–99: 544 000 × 100 kr × 12 = 544 000 × 1 200 = 653 mill</div>
            <div class="eq">100+: 1 260 000 × 50 kr × 12 = 1 260 000 × 600 = 756 mill</div>
            <div class="eq">Marked: 288 + 756 + 653 + 756 = <b>2 453 mill ≈ 2,5 milliarder</b></div>
          </div>
          <p><b>Se hva som skjedde med de store.</b> 100+-segmentet har 49 prosent av de ansatte,
          men bare 31 prosent av kronene — fordi prisen per hode er en femtedel av
          mikrosegmentets. Og 1–4-segmentet har 8 prosent av de ansatte, men 12 prosent av
          kronene. Volumandel og verdiandel er ikke det samme, og forskjellen er hele grunnen til
          at prislisten ser ut som den gjør.</p>
          <p>Sanity-sjekkene, og den første her er en av de beste norske ankrene som finnes:</p>
          <ul>
            <li><b>Mot lønnssummen:</b> 2,9 millioner sysselsatte × 62 000 kroner × 12 måneder
              ≈ 2 150 milliarder kroner i lønn per år — omtrent halve Fastlands-BNP på 4 400
              milliarder, som er en kjent tommelfingerregel. Vårt marked på 2,45 milliarder er da
              <b>rundt én promille av lønnen systemet administrerer.</b> Det er en helt plausibel
              pris for administrasjonen av noe.</li>
            <li><b>Per ansatt:</b> 2 453 millioner / 2,88 millioner ansatte = 852 kroner per
              ansatt per år, altså rundt 71 kroner i måneden i snitt. Det ligger mellom
              mikrosegmentets 250 og storsegmentets 50, tyngdepunkt mot de store. Konsistent.</li>
            <li><b>Mot noe kjent:</b> 2,45 milliarder er 1,1 prosent av dagligvaremarkedet. For et
              nisje-B2B-marked i Norge er det riktig størrelsesorden — norske B2B-
              programvaremarkeder ligger typisk i milliardklassen, ikke i titallsmilliardklassen.</li>
          </ul>
          <p><b>Middels svar:</b> 2,5 milliarder med én sanity-sjekk. <b>Sterkt svar:</b> 2,5
          milliarder, med promillesjekken mot lønnssummen — og observasjonen at de store har
          halvparten av hodene og en tredel av pengene.</p>`,
        krav: [
          "Du ganger med 12 og sier eksplisitt at prisen var oppgitt per måned.",
          "Du sammenligner volumandel og verdiandel per segment, og sier at de ikke er like.",
          "Du sanity-sjekker mot lønnssummen og uttrykker markedet som en promilleandel.",
          "Du krysspeiler snittprisen per ansatt mot ytterpunktene i tabellen.",
          "Du runder: «rundt 2,5 milliarder», ikke «2 452,8».",
        ],
        felle: "Å glemme de tolv månedene. Da får du 204 millioner og et marked som er mindre enn klientens egen svenske omsetning — og det burde utløst en alarm i seg selv. Sanity-sjekken er ikke bare pynt til slutt; den er det som fanger en faktor tolv.",
      },
      {
        art: "regne",
        sek: 120,
        tittel: "Følsomhet — hvilken usikkerhet er verdt å bry seg om?", kort: "Følsomhet",
        sp: `<p>Den forutsetningen du er minst sikker på, er at 40 prosent av mikrobedriftene
          betaler for et eget skysystem. Ingen vet dette; det kunne like gjerne vært 20 prosent,
          fordi regnskapsføreren ofte tar lønnskjøringen i sitt eget system.</p>
          <p><b>Hvor mange millioner kroner faller markedet hvis dekningsgraden i 1–4-segmentet
          er 20 prosent, ikke 40?</b></p>`,
        svar: 144,
        enhet: "millioner kroner",
        toleranse: 0.15,
        fasit: `<p>Regningen er triviell, og det er hele poenget.</p>
          <div class="formula">
            <div class="eq">1–4-segmentet bidrar med 288 mill</div>
            <div class="eq">Dekningsgrad halveres ⇒ bidraget halveres: 288 × 0,5 = 144 mill</div>
            <div class="eq">Fall: <b>144 millioner kroner</b></div>
            <div class="eq">Nytt marked: 2 453 − 144 = 2 309 mill</div>
            <div class="eq">Endring: 144 / 2 453 = <b>−5,9 prosent</b></div>
          </div>
          <p><b>Konklusjonen er det som skiller et sterkt svar fra et middels her:</b> den
          forutsetningen du var mest usikker på, kan være 50 prosent feil og likevel flytte svaret
          med under 6 prosent. Den er, med andre ord, ikke verdt mer tid.</p>
          <p>Sammenlign med en forutsetning du følte deg tryggere på — prisen på 50 kroner per
          ansatt i 100+-segmentet:</p>
          <div class="formula">
            <div class="eq">100+-segmentet bidrar med 756 mill</div>
            <div class="eq">50 % feil på prisen: 756 × 0,5 = 378 mill, altså <b>±15,4 prosent</b> av markedet</div>
          </div>
          <p>Prisen til de store er nesten <b>tre ganger så viktig</b> som mikrodekningen, selv om
          du var mindre i tvil om den. Den generelle regelen er verdt å skrive ned:</p>
          <blockquote><p><b>Ranger forutsetningene etter usikkerhet <i>ganger</i> bidrag — ikke
          etter usikkerhet alene.</b> En vill gjetning på et lite ledd er ufarlig. Et kvalifisert
          anslag på et stort ledd er der estimatet ditt faktisk står og faller.</p></blockquote>
          <p>Det gjør også noe med anbefalingen: klienten skal ikke bruke penger på å kartlegge
          mikrobedrifter. De skal ringe fem store norske arbeidsgivere og spørre hva de betaler per
          ansatt. Fem telefoner løser 15 prosentpoeng av usikkerheten; en spørreundersøkelse blant
          120 000 mikrobedrifter løser 6.</p>
          <p><b>Middels svar:</b> 144 millioner. <b>Sterkt svar:</b> 144 millioner, med
          rangeringsregelen sagt høyt og en konkret konsekvens for hvor klienten skal bruke
          undersøkelsesbudsjettet sitt.</p>`,
        krav: [
          "Du regner utslaget på segmentet, ikke på hele markedet.",
          "Du oversetter kronefallet til en prosent av totalen, så det blir sammenlignbart.",
          "Du sammenligner mot en annen forutsetning, og finner at den betyr mer.",
          "Du sier regelen: ranger etter usikkerhet ganger bidrag, ikke usikkerhet alene.",
          "Du trekker en konsekvens for hva klienten faktisk skal undersøke først.",
        ],
        felle: "Å konkludere at estimatet er skjørt fordi én forutsetning er usikker. Et estimat er ikke like skjørt i alle retninger. Uten å regne på bidraget vet du ikke om usikkerheten er verdt seks prosent eller seksti — og det er forskjellen på å berolige klienten og å skremme ham uten grunn.",
      },
      {
        art: "syntese",
        sek: 90,
        tittel: "Anbefalingen",
        sp: `<p>Styret har <b>ett minutt</b>. Gi tallet, usikkerheten, og hva du ville sjekket
          først med ekte data.</p>`,
        fasit: `<blockquote><p><b>«Det norske markedet for skybaserte lønns- og HR-systemer er
          rundt 2,5 milliarder kroner i året — 2,3 millioner ansatte på et betalt system, til rundt
          70 kroner per ansatt per måned i snitt. Spennet er 2 til 3 milliarder, og det aller
          meste av usikkerheten sitter i prisen til de største kundene.»</b></p>
          <p>Slik kom jeg dit: Norge har 2,9 millioner sysselsatte fordelt på 200 000 bedrifter med
          ansatte — ikke 650 000, for to av tre norske foretak har ingen ansatte og ingen lønn å
          kjøre. Av de 2,9 millionene ligger 2,3 på et betalt system. Priset per ansatt per måned,
          fallende fra 250 kroner i de minste til 50 i de største, gir det 2,5 milliarder.</p>
          <p>Sanity-sjekken: norsk lønnssum er rundt 2 150 milliarder i året, så dette markedet er
          én promille av lønnen det administrerer. Det høres riktig ut.</p>
          <p>Det viktigste for dere er ikke størrelsen, men at <b>dette ikke er ett marked — det er
          to.</b> 4 000 bedrifter har halvparten av alle ansatte og en tredel av kronene, og de
          vinnes én for én med selgere, anbud og integrasjonsprosjekter. 120 000 mikrobedrifter har
          8 prosent av de ansatte og 12 prosent av kronene, og de kan bare nås gjennom
          regnskapsførerne — som i praksis er distribusjonskanalen, ikke sluttkunden. Dere har
          200 millioner i Sverige, som tilsier at dere er bygget for den ene av de to. Hvilken?
          Det er spørsmålet tallet stiller.</p>
          <p>Det jeg ville sjekket først, er faktisk pris per ansatt hos store norske
          arbeidsgivere. Fem telefoner flytter estimatet mitt 15 prosent — mer enn noen annen
          enkeltopplysning. Deretter ville jeg sjekket hvor mye av markedet Visma allerede har,
          for i et marked på 2,5 milliarder med én dominerende aktør er markedsandelen viktigere
          enn markedsstørrelsen.»</p></blockquote>
          <p><b>Middels svar:</b> tallet, spennet og kjeden. <b>Sterkt svar:</b> det samme, pluss
          at markedet er to markeder med hver sin salgskanal — og at klientens svenske størrelse
          allerede sier hvilket av dem de er bygget for.</p>`,
        krav: [
          "Du gir tallet med spenn og sier hvilken forutsetning spennet kommer fra.",
          "Du sier eksplisitt at nevneren er 200 000 bedrifter med ansatte, ikke 650 000 foretak.",
          "Du sier promillesjekken mot lønnssummen høyt som en del av svaret.",
          "Du deler markedet i to salgskanaler og knytter det til klientens egen situasjon.",
          "Du navngir de fem telefonene som ville flyttet estimatet mest.",
        ],
        felle: "Å levere markedsstørrelsen alene i et marked med én dominerende aktør. 2,5 milliarder er meningsløst for klienten hvis Visma har 70 prosent av det. I konsentrerte B2B-markeder er det oppnåelige markedet, ikke det totale, som er tallet beslutningen tas på — og det bør du si selv om ingen spør.",
      },
    ],
  },
  {
    id: "estimering-bredband",
    kategori: "Market sizing",
    label: "Hvor stort er bredbåndsmarkedet i Norge?",
    type: "Estimering",
    nivå: "Middels",
    firma: "Generisk",
    stil: "interviewer-led",
    minutter: 25,
    ch: [],
    blurb: "Samme bransje, to nevnere: mobil selges per person, fast bredbånd per husholdning. Trener nevnervalget — den feilen som mer enn dobler svaret før du har regnet et eneste ledd.",
    prompt: `<p>Klienten er et europeisk infrastrukturfond. De vurderer å by på et norsk
      fibernett, og trenger et uavhengig anslag på hvor stort inntektsgrunnlaget er før de setter
      en pris.</p>
      <p><b>Hvor stort er det norske markedet for fast bredbånd til hjemmet, målt i kroner per
      år?</b></p>
      <p class="tiny">Ingen kalkulator. Vær nøye med hva du deler på.</p>`,
    bakgrunn: `<p>Denne casen har bare én felle, og den ligger i første ledd: <b>hva er
      nevneren?</b> Fast bredbånd selges per bolig, ikke per person. Én linje inn i huset dekker
      alle som bor der. Bruker du befolkningen på 5,6 millioner i stedet for husholdningene på
      2,65 millioner, overvurderer du markedet med en faktor på over to — og ingenting du gjør
      senere i regnestykket kan rette det opp.</p>
      <p>Det som gjør fella ekte og ikke bare pedagogisk, er at <b>nabomarkedet har motsatt
      nevner</b>. Mobilabonnementer selges per person: en firebarnsfamilie har seks mobiler og
      ett bredbånd. Samme bransje, samme kunde, samme faktura — to helt ulike nevnere. Den som
      ikke stopper og spør «per hva?» kommer til å bomme på det ene av de to markedene hver
      gang.</p>
      <p>Casen trener også et tredje ledd som ofte glemmes i abonnementsmarkeder: <b>hvem som
      betaler er ikke alltid den som bruker.</b> I norske borettslag og sameier ligger bredbåndet
      ofte i felleskostnadene, forhandlet av styret til en helt annen pris enn den en
      enkelthusholdning betaler. Det er den kjøpsenheten som avgjør hvem klienten faktisk
      selger til.</p>`,
    trinn: [
      {
        art: "oppklaring",
        sek: 90,
        tittel: "Hva teller vi?",
        sp: `<p><b>Hvilke spørsmål stiller du før du setter opp regnestykket?</b> Ett av dem er
          viktigere enn alle de andre til sammen.</p>`,
        fasit: `<p>Det ene spørsmålet som betyr noe: <b>hva er kjøpsenheten?</b> Alt annet er
          finpuss.</p>
          <ul>
            <li><b>Kjøpsenhet:</b> selges bredbånd per person eller per bolig? Svaret er per bolig
              — én linje dekker husstanden. Si det høyt som en avklaring, ikke som en antakelse,
              for det halverer svaret.</li>
            <li><b>Avgrensning:</b> bare privatmarkedet, eller også bedrifter og offentlige bygg?
              Prompten sier «til hjemmet» — bekreft det, og hold bedriftsmarkedet utenfor.</li>
            <li><b>Produkt:</b> bare bredbåndslinjen, eller også TV-pakker og strømmetjenester som
              selges i samme abonnement? Det er ofte samme faktura, og det kan doble beløpet.
              Jeg regner bredbåndsdelen alene.</li>
            <li><b>Geografi og tidsrom:</b> Norge, per år, målt som det husholdningene betaler.</li>
          </ul>
          <p>Lukk: «Jeg regner det norske husholdninger betaler for fast bredbånd til hjemmet per
          år, uten TV-pakker, uten bedriftsmarkedet, og uten mobilt bredbånd.»</p>
          <p><b>Middels svar:</b> spør om avgrensning. <b>Sterkt svar:</b> stiller
          kjøpsenhetsspørsmålet først og eksplisitt, og legger til at nabomarkedet — mobil — har
          motsatt nevner. Det viser at du sjekker nevneren av vane, ikke fordi denne casen tilfeldigvis
          handler om det.</p>`,
        krav: [
          "Du spør om kjøpsenheten før alt annet, og sier at svaret er bolig, ikke person.",
          "Du avgrenser bort bedriftsmarkedet og mobilt bredbånd eksplisitt.",
          "Du tar stilling til om TV-pakker er med, siden de ligger på samme faktura.",
          "Du lukker med én setning som definerer hva du regner, med tidsenhet.",
        ],
        felle: "Å si «alle har jo internett» og begynne på befolkningen. Alle har internett — men ikke alle kjøper det. Spørsmålet er aldri hvem som bruker produktet, det er hvem som betaler regningen, og hvor mange regninger som sendes.",
      },
      {
        art: "struktur",
        sek: 150,
        tittel: "Velg retning, og velg nevneren bevisst",
        sp: `<p>Si <b>topp-ned eller bunn-opp, og hvorfor</b>. Skriv ligningen i symboler, og si
          hvilken nevner du velger — og hvilken du forkaster, med begrunnelse.</p>`,
        fasit: `<p><b>Topp-ned.</b> Begrunnelsen: husholdningstallet er blant de sikreste tallene
          SSB har, og veien fra husholdning til abonnement er kort — én filtrering på om de har
          fast bredbånd i det hele tatt. Bunn-opp — antall operatører ganger kunder per operatør —
          krever at du kan markedsandeler, og det kan du ikke. Behold bunn-opp som krysspeiling
          mot mobilmarkedet til slutt.</p>
          <div class="formula">
            <div class="eq">Marked (kr/år) = Σ over kjøpstype [ Antall abonnement × Månedspris × 12 ]</div>
            <div class="eq">Antall abonnement = Husholdninger × Andel med fast bredbånd</div>
          </div>
          <p><b>Nevneren er husholdning — 2,65 millioner — ikke befolkning.</b> Si begrunnelsen
          som en regel, ikke som en observasjon: <i>alt som leveres til en bygning, telles per
          bygning.</i> Bredbånd, strøm, forsikring på innbo, vaskemaskin, kabel-TV og
          søppeltømming er alle husholdningsprodukter. Mobil, briller, klær og kaffe er
          personprodukter. Å plassere produktet i riktig kategori er første ledd i enhver
          sizing-oppgave, og det er der flest svar dør.</p>
          <p><b>Segmenteringsaksen er hvem som betaler, ikke hvem som bor.</b> Det er valget som
          gjør denne casen mer enn en multiplikasjon:</p>
          <ul>
            <li><b>Husholdning i småhus:</b> kjøper sitt eget abonnement, høy dekning, høyest pris
              — de vil ha fiber og hastighet.</li>
            <li><b>Husholdning i blokk med eget abonnement:</b> noe lavere dekning, fordi mobilt
              bredbånd er et reelt alternativ når du bor alene i en liten leilighet. Lavere pris.</li>
            <li><b>Husholdning i blokk der bredbåndet ligger i felleskostnadene:</b> borettslaget
              er kunden, ikke beboeren. Volumavtale, mye lavere pris per bolig.</li>
          </ul>
          <p>Den tredje gruppen er den som skiller et sterkt svar fra et middels her. Den finnes i
          virkeligheten, den har helt annen pris, og den forteller klienten noe de trenger: i
          blokkmarkedet selger man til styrer, ikke til forbrukere.</p>
          <p>Si også hvordan du vil sanity-sjekke, før du får tallene: «Jeg vil krysspeile mot
          mobilmarkedet, som har motsatt nevner. Hvis forholdet mellom de to blir urimelig, har
          jeg tatt feil et sted.»</p>
          <p><b>Middels svar:</b> husholdning som nevner. <b>Sterkt svar:</b> husholdning som
          nevner, formulert som en generell regel om at bygningsleveranser telles per bygning — og
          en segmentering på hvem som betaler, ikke bare på hvor de bor.</p>`,
        krav: [
          "Du forkaster befolkningen som nevner eksplisitt, og sier hvorfor.",
          "Du formulerer nevnervalget som en regel du kan bruke igjen, ikke som en enkeltobservasjon.",
          "Du segmenterer på hvem som betaler, og får med borettslagsavtalene som egen gruppe.",
          "Du sier at prisen er per måned og at markedet skal oppgis per år.",
          "Du sier på forhånd at du vil krysspeile mot mobilmarkedet, og hvorfor det er en god sjekk.",
        ],
        felle: "Å segmentere på hastighet — fiber, kabel, DSL — fordi det er den inndelingen bransjen selv bruker. Den forteller deg noe om teknologi og ingenting om hvem som betaler eller hvor mye. Velg aksen som flytter prisen og kjøpsbeslutningen, ikke den som står i produktkatalogen.",
      },
      {
        art: "regne",
        sek: 120,
        tittel: "Volumleddet — hvor mange abonnement?", kort: "Volum",
        sp: `<p>Intervjueren gir deg tallene. <b>Hvor mange faste bredbåndsabonnement finnes det i
          Norge?</b></p>`,
        figur: `<table class="data">
            <tr><th>Norske referansetall (SSB)</th><th class="n">Verdi</th></tr>
            <tr><td>Befolkning</td><td class="n">5,6 mill.</td></tr>
            <tr><td>Husholdninger</td><td class="n">2,65 mill.</td></tr>
            <tr><td>Personer per husholdning</td><td class="n">2,1</td></tr>
            <tr><td>— husholdninger i småhus</td><td class="n">1,4 mill.</td></tr>
            <tr><td>— husholdninger i leilighet og blokk</td><td class="n">1,25 mill.</td></tr>
            <tr><td>Boutgift per husholdning per år</td><td class="n">135 000 kr</td></tr>
            <tr><td>Dagligvaremarkedet</td><td class="n">230 mrd kr</td></tr>
          </table>
          <table class="data">
            <tr><th>Bransjetall oppgitt av intervjueren</th><th class="n">Verdi</th></tr>
            <tr><td>Andel småhushusholdninger med fast bredbånd</td><td class="n">90 %</td></tr>
            <tr><td>Andel blokkhusholdninger med fast bredbånd</td><td class="n">80 %</td></tr>
            <tr><td>— av disse: andel der bredbåndet ligger i felleskostnadene</td><td class="n">40 %</td></tr>
            <tr><td>Snittpris eget abonnement, småhus</td><td class="n">550 kr/mnd</td></tr>
            <tr><td>Snittpris eget abonnement, blokk</td><td class="n">450 kr/mnd</td></tr>
            <tr><td>Snittpris per bolig i borettslagsavtale</td><td class="n">300 kr/mnd</td></tr>
            <tr><td>Snittpris mobilabonnement (per person)</td><td class="n">300 kr/mnd</td></tr>
          </table>`,
        svar: 2260000,
        enhet: "abonnement",
        toleranse: 0.15,
        fasit: `<p>Legg merke til at befolkningen på 5,6 millioner og personer per husholdning på
          2,1 står i tabellen. <b>De er ikke der for å brukes — de er der for å friste.</b> Si det
          høyt: «Jeg bruker husholdninger, ikke personer. De to øverste tallene er felle-tall.»</p>
          <div class="formula">
            <div class="eq">Småhus: 1 400 000 × 90 % = 1 260 000 abonnement</div>
            <div class="eq">Blokk totalt: 1 250 000 × 80 % = 1 000 000 abonnement</div>
            <div class="eq">— av dem i borettslagsavtale: 1 000 000 × 40 % = 400 000</div>
            <div class="eq">— av dem eget abonnement: 1 000 000 × 60 % = 600 000</div>
            <div class="eq">Sum: 1 260 000 + 1 000 000 = <b>2 260 000 abonnement</b></div>
          </div>
          <p>Krysspeil med én gang: <b>2,26 millioner abonnement på 2,65 millioner husholdninger
          er 85 prosent dekning.</b> Det er et tall du kan kjenne på — høyt, som det skal være i
          Norge, men ikke 100 prosent, fordi mobilt bredbånd finnes. Hadde du fått 4 millioner,
          ville du hatt flere abonnement enn boliger, og det er umulig.</p>
          <p><b>Det er nettopp den sjekken nevnervalget gir deg gratis.</b> Med personer som nevner
          hadde du fått et abonnementstall du ikke kunne kontrollert mot noe som helst, fordi det
          ikke finnes et tak på hvor mange abonnement en person kan ha. Med boliger som nevner har
          du et hardt tak: ett per bolig. Riktig nevner gir deg ikke bare riktig svar, den gir deg
          en sanity-sjekk du ellers ikke ville hatt.</p>
          <p><b>Middels svar:</b> 2,26 millioner. <b>Sterkt svar:</b> 2,26 millioner, med
          dekningsgraden på 85 prosent regnet ut som kontroll og felle-tallene i tabellen navngitt
          som felle-tall.</p>`,
        krav: [
          "Du bruker husholdninger som nevner, og sier eksplisitt at du forkaster befolkningen.",
          "Du peker ut hvilke tall i tabellen som ikke skal brukes, og hvorfor de står der.",
          "Du deler blokksegmentet i eget abonnement og borettslagsavtale før du går videre.",
          "Du krysspeiler dekningsgraden på 85 prosent mot antall husholdninger.",
        ],
        felle: "Å bruke 5,6 millioner personer. Selv med 85 prosent dekning gir det 4,8 millioner abonnement — flere enn det finnes boliger i Norge. Sjekken tar tre sekunder og fanger hele feilen, men bare hvis du har en nevner det finnes et tak på.",
      },
      {
        art: "regne",
        sek: 120,
        tittel: "Verdileddet — hvor mange kroner?", kort: "Kroner",
        sp: `<p><b>Hvor stort er markedet i millioner kroner per år?</b></p>
          <p class="tiny">Tre priser, tre segmenter. Krysspeil mot mobilmarkedet før du
          leverer.</p>`,
        svar: 12996,
        enhet: "millioner kroner",
        toleranse: 0.15,
        fasit: `<p>Gjør om månedsprisene til årspriser først — det er ett regnestykke i stedet for
          tre, og det er der folk mister faktoren tolv:</p>
          <div class="formula">
            <div class="eq">550 kr/mnd = 6 600 kr/år · 450 kr/mnd = 5 400 kr/år · 300 kr/mnd = 3 600 kr/år</div>
            <div class="eq">Småhus: 1 260 000 × 6 600 = 8 316 mill</div>
            <div class="eq">Blokk, eget abonnement: 600 000 × 5 400 = 3 240 mill</div>
            <div class="eq">Blokk, borettslagsavtale: 400 000 × 3 600 = 1 440 mill</div>
            <div class="eq">Marked: 8 316 + 3 240 + 1 440 = <b>12 996 mill ≈ 13 milliarder</b></div>
          </div>
          <p>Si «rundt 13 milliarder». Fem sifre er absurd når tre av forutsetningene er anslag.</p>
          <p><b>Og nå den sanity-sjekken som er hele poenget med casen:</b></p>
          <ul>
            <li><b>Mot mobilmarkedet, som har motsatt nevner:</b> mobil selges per person — 5,6
              millioner nordmenn à 300 kroner i måneden gir 5,6 mill × 3 600 = <b>20 milliarder</b>.
              Så det norske mobilmarkedet er rundt 20 milliarder og bredbåndsmarkedet rundt 13,
              selv om «alle» har begge deler. <i>Hele forskjellen er nevneren.</i> Hadde du regnet
              bredbånd per person, ville du fått 30 milliarder — større enn mobilmarkedet — og det
              er åpenbart galt, for de fleste betaler mer for mobilene i husstanden til sammen enn
              for linja inn i huset.</li>
            <li><b>Per husholdning:</b> 12 996 millioner / 2,65 millioner = rundt 4 900 kroner per
              husholdning per år, altså 410 kroner i måneden i snitt over <i>alle</i>
              husholdninger, også de 15 prosentene uten. Snittet blant dem som faktisk har
              abonnement er 12 996 mill / 2,26 mill = 5 750 kroner, altså 479 kroner i måneden.
              Det ligger mellom 300 og 550, med tyngdepunkt mot småhusene. Konsistent.</li>
            <li><b>Mot noe kjent:</b> 13 milliarder er 5,7 prosent av dagligvaremarkedet, og 3,6
              prosent av boutgiften på 135 000 kroner per husholdning. Riktig størrelsesorden for
              en fast månedsregning i norske hjem.</li>
          </ul>
          <p><b>Middels svar:</b> 13 milliarder med én sanity-sjekk. <b>Sterkt svar:</b> 13
          milliarder, krysspeilet mot mobilmarkedets 20 — og setningen om at hele forskjellen
          mellom de to tallene er nevneren, ikke produktet.</p>`,
        krav: [
          "Du regner om månedspris til årspris i ett steg, i stedet for å gange med 12 tre ganger.",
          "Du bruker hvert segments egen pris, inkludert den lave borettslagsprisen.",
          "Du krysspeiler mot mobilmarkedet og sier at forskjellen er nevneren, ikke produktet.",
          "Du krysspeiler snittet per abonnement mot ytterpunktene i prislisten.",
          "Du runder til to sifre når du sier tallet høyt.",
        ],
        felle: "Å bruke 450 kroner som gjennomsnittspris på alle 2,26 millioner abonnement. Det gir 12,2 milliarder — bare 6 prosent feil, så du slipper unna med det. Men da har du ikke sett at 1,4 milliarder av markedet er borettslagsavtaler til halv pris, og det er den observasjonen klienten faktisk betaler for.",
      },
      {
        art: "regne",
        sek: 120,
        tittel: "Følsomhet — hva er tallet verdt?", kort: "Følsomhet",
        sp: `<p>Husholdningstallet er sikkert; SSB teller det. Den virkelig usikre forutsetningen
          er at 80 prosent av blokkhusholdningene har fast bredbånd. Mobilt bredbånd er blitt godt
          nok for én person i en liten leilighet, og den substitusjonen skjer akkurat der.</p>
          <p><b>Hva blir markedet hvis bare 40 prosent av blokkhusholdningene har fast bredbånd?
          Svar i millioner kroner.</b></p>`,
        svar: 10656,
        enhet: "millioner kroner",
        toleranse: 0.15,
        fasit: `<p>Igjen: <b>del i den delen som rører seg og den som står stille før du regner.</b>
          Småhusene berøres ikke — der finnes ikke substitusjonen, fordi et hus med fire personer
          og strømmet TV ikke lever på mobilt bredbånd.</p>
          <div class="formula">
            <div class="eq">Småhus, uendret: 8 316 mill</div>
            <div class="eq">Blokk, ny dekning: 1 250 000 × 40 % = 500 000 abonnement (var 1 000 000)</div>
            <div class="eq">— eget abonnement: 500 000 × 60 % = 300 000 × 5 400 = 1 620 mill</div>
            <div class="eq">— borettslagsavtale: 500 000 × 40 % = 200 000 × 3 600 = 720 mill</div>
            <div class="eq">Nytt marked: 8 316 + 1 620 + 720 = <b>10 656 mill ≈ 10,7 milliarder</b></div>
            <div class="eq">Endring: 10 656 / 12 996 − 1 = <b>−18 prosent</b></div>
          </div>
          <p>Snarveien, hvis du ser den: blokksegmentet bidro med 4 680 millioner, og halveres til
          2 340. Fallet er 2 340 millioner, som er 18 prosent av 12 996. Ett regnestykke i stedet
          for fire.</p>
          <p><b>Innsikten er at 50 prosent feil gir 18 prosent utslag</b>, fordi blokksegmentet
          bare er 36 prosent av markedet. Sammenlign med kjøkkencasen, der samme prosentvise feil
          ga 27 prosent, og brillecasen, der den ga 33. Regelen er den samme i alle tre:
          <b>utslaget er feilen ganger segmentets andel av markedet.</b> En halvering av et segment
          som er en tredel, koster deg en sjettedel.</p>
          <p>Men her er det som gjør denne følsomheten mer enn aritmetikk, og som skiller et sterkt
          svar fra et middels: <b>substitusjonen er ikke en usikkerhet, den er en trend.</b> Et
          infrastrukturfond kjøper kontantstrøm i tjue år. Da er ikke spørsmålet om tallet er 13
          eller 10,7 milliarder i år — det er hvilken vei det beveger seg. En følsomhetsanalyse som
          peker i én bestemt retning over tid, er ikke et usikkerhetsintervall lenger. Det er en
          prognose, og den hører hjemme i prisingen.</p>
          <p><b>Middels svar:</b> 10 656 millioner. <b>Sterkt svar:</b> 10 656 millioner, med
          regelen «utslag = feil × segmentets andel», og observasjonen at nedsiden er ensidig —
          fordi substitusjonen bare går én vei.</p>`,
        krav: [
          "Du holder småhussegmentet fast, og begrunner hvorfor substitusjonen ikke rammer det.",
          "Du ser at hele blokksegmentet halveres, og skalerer det i ett steg.",
          "Du sier regelen: utslaget er feilen ganger segmentets andel av markedet.",
          "Du skiller en toveis usikkerhet fra en ensidig trend, og sier at dette er det siste.",
          "Du knytter det til hva klienten skal med tallet: en kontantstrøm over tjue år.",
        ],
        felle: "Å halvere hele markedet fordi «dekningen halveres». Dekningen halveres i ett av to segmenter, og det segmentet er 36 prosent av kronene. Å skalere totalen når bare en del beveger seg, er den vanligste feilen i hele følsomhetsanalysen — og den gir svar som er dobbelt så gale som de trenger å være.",
      },
      {
        art: "syntese",
        sek: 90,
        tittel: "Anbefalingen",
        sp: `<p>Fondet har <b>ett minutt</b>. Gi tallet, usikkerheten, og hva du ville sjekket
          først med ekte data.</p>`,
        fasit: `<blockquote><p><b>«Det norske markedet for fast bredbånd til hjemmet er rundt 13
          milliarder kroner i året — 2,3 millioner abonnement til rundt 480 kroner i måneden.
          Spennet er 10 til 14 milliarder, og usikkerheten er ensidig nedover: den ligger i hvor
          mange leilighetshusholdninger som klarer seg med mobilt bredbånd.»</b></p>
          <p>Slik kom jeg dit: 2,65 millioner husholdninger — ikke 5,6 millioner personer, for
          bredbånd leveres til en bolig, ikke til et menneske. 85 prosent av dem har fast bredbånd,
          altså 2,26 millioner abonnement, til priser fra 300 kroner i en borettslagsavtale til 550
          i en enebolig.</p>
          <p>Sanity-sjekken er den beste delen: mobilmarkedet, som har motsatt nevner, er rundt 20
          milliarder — 5,6 millioner personer à 300 kroner i måneden. At bredbånd er mindre enn
          mobil, selv om alle har begge deler, er nettopp fordi den ene selges per person og den
          andre per bolig. Hadde jeg regnet bredbånd per person — 5,6 millioner à 450 kroner i måneden — hadde jeg fått 30 milliarder og
          et marked større enn mobil. Det ville vært åpenbart galt.</p>
          <p>Det viktigste for dere er ikke størrelsen, men <b>hvem kunden er.</b> 8,3 av de 13
          milliardene ligger i småhus, der husholdningen kjøper selv, betaler mest og har få
          alternativer — det er en stabil kontantstrøm. 1,4 milliarder ligger i borettslagsavtaler,
          der styret forhandler og prisen er halvparten, og 3,2 milliarder ligger i
          blokkleiligheter der mobilt bredbånd er en reell konkurrent. Verdien i nettet dere
          vurderer avhenger derfor helt av hvor mange av linjene som går til hus og hvor mange som
          går til blokk.</p>
          <p>Det er også det jeg ville sjekket først: fordelingen av selskapets faktiske
          tilknytninger mellom småhus og blokk, og utviklingen i oppsigelser blant
          leilighetskunder de siste tre årene. Det ene tallet forteller dere om dere kjøper en
          annuitet eller en avtakende inntektsstrøm.»</p></blockquote>
          <p><b>Middels svar:</b> tallet, spennet og kjeden. <b>Sterkt svar:</b> det samme, pluss
          krysspeilingen mot mobilmarkedet som beviser nevnervalget — og oversettelsen fra
          markedsstørrelse til kontantstrømkvalitet, som er det fondet faktisk kjøper.</p>`,
        krav: [
          "Du sier nevnervalget som en del av svaret, ikke som en fotnote.",
          "Du bruker mobilmarkedet som krysspeiling og forklarer hvorfor forskjellen er nevneren.",
          "Du gir spennet og sier at usikkerheten er ensidig nedover.",
          "Du deler markedet i tre kundetyper og knytter dem til kontantstrømmens kvalitet.",
          "Du navngir de to opplysningene du ville hentet først fra selskapets egne data.",
        ],
        felle: "Å levere 13 milliarder som ett tall. For et infrastrukturfond er markedsstørrelsen nesten uinteressant — de kjøper en kontantstrøm med en varighet. Sammensetningen mellom hus, blokk og borettslag er det som avgjør prisen, og den kommer gratis ut av segmenteringen du allerede har gjort. Ikke la den bli liggende i kladden.",
      },
    ],
  },
  {
    id: "ms-heisservice",
    kategori: "Market sizing",
    label: "Hvor stort er heismarkedet i Norge?",
    type: "Estimering",
    nivå: "Middels",
    firma: "Generisk",
    stil: "interviewer-led",
    minutter: 25,
    ch: [],
    blurb: "Et infrastrukturmarked uten noen makrostørrelse over seg. Du må bygge det fra én heis, og kryssjekken må komme fra tilbudssiden — for topp-ned finnes ikke.",
    prompt: `<p>Klienten er en europeisk heisprodusent. De eier ikke noe i Norge i dag, og
      vurderer å kjøpe opp en norsk servicevirksomhet. Før de går videre vil de vite én ting:</p>
      <p><b>Hvor stort er det norske markedet for heiser og heisservice, målt i kroner per år?</b></p>
      <p class="tiny">Ingen kalkulator. Si forutsetningene høyt, rund av åpent, og kryssjekk
      svaret før du leverer.</p>`,
    bakgrunn: `<p>De fleste estimeringscaser kan gjøres begge veier: du kan starte fra befolkningen
      og filtrere nedover, eller fra én enhet og skalere oppover. Denne kan ikke.</p>
      <p>Grunnen er at <b>det ikke finnes en makrostørrelse over heismarkedet</b>. Heiser er ikke
      en andel av et publisert forbruksmarked, ikke en post i nasjonalregnskapet, ikke en linje
      i noe husholdningsbudsjett. Å prøve seg topp-ned her betyr å gjette på en andel av en
      størrelse som ikke måler noe i nærheten av det du vil ha.</p>
      <p>Det er derfor infrastrukturmarkeder er sin egen kategori: <b>vann- og avløpsnett,
      basestasjoner, ladepunkter, heiser, kjøletårn, broer</b>. De består av <i>tellbare fysiske
      enheter med en driftskostnad og en levetid</i>, og det er den eneste inngangen. Kryssjekken
      må da komme fra tilbudssiden — hvor mange folk jobber i bransjen, og hva omsetter de for.
      Det er ikke en dårligere kryssjekk. Det er en <i>uavhengig</i> kryssjekk, og det er hele
      kravet.</p>`,
    trinn: [
      {
        art: "oppklaring",
        sek: 90,
        tittel: "Hva teller vi, og hvilken enhet bygger vi fra?",
        sp: `<p>Hvilke spørsmål stiller du før du setter opp regnestykket — og hvilken enhet
          bestemmer du deg for å bygge fra?</p>`,
        fasit: `<p>To ting må ut av veien: <b>avgrensningen</b> og <b>enheten</b>. Begge er
          definisjonsspørsmål, og begge må sies høyt.</p>
          <ul>
            <li><b>Nysalg, service, eller begge?</b> En heisprodusent tjener mest på service —
              kontrakten løper i tiår etter at heisen er montert. Klienten skal kjøpe en
              servicevirksomhet, så service må i hvert fall være med. Bekreft at nysalg og
              modernisering også teller.</li>
            <li><b>Bare personheiser, eller også rulletrapper, vareheiser og løfteplattformer?</b>
              Jeg holder meg til registrerte heiser og sier det.</li>
            <li><b>Hele Norge, og alle byggtyper — bolig, næring, offentlig?</b> Ja, ellers
              mister vi mesteparten av parken.</li>
            <li><b>Hvilken enhet bygger vi fra?</b> Dette er det viktigste spørsmålet. Ikke person,
              ikke husholdning, ikke bygg — <b>én heis</b>. En heis har en eier, en servicekontrakt
              og en levetid, og markedet er ikke annet enn summen av det alle heisene koster
              i året.</li>
          </ul>
          <p>Og så det som gjør deg interessant allerede i første trinn: si høyt <b>hvorfor
          topp-ned ikke går her</b>. «Jeg finner ingen makrostørrelse å filtrere ned fra —
          heiser er ikke en andel av et forbruksmarked. Jeg bygger bunn-opp fra én heis, og
          kryssjekker mot bransjens egen bemanning.» Det er en observasjon, ikke en unnskyldning,
          og den forteller intervjueren at du vet hva slags oppgave du har fått.</p>`,
        krav: [
          "Du sier hvilken fysisk enhet du bygger fra — én heis — og begrunner valget.",
          "Du avklarer om service, nysalg og modernisering alle skal telle med.",
          "Du sier høyt at det ikke finnes en makrostørrelse over dette markedet, og hva det betyr for metoden.",
          "Du sier på forhånd hva du vil kryssjekke mot, siden en vanlig topp-ned ikke er tilgjengelig.",
          "Du stiller tre til fire spørsmål, ikke en sjekkliste.",
        ],
        felle: "Å lete etter en makrostørrelse likevel — «byggenæringen omsetter for 600 milliarder, heis er kanskje en halv prosent av det». Den halve prosenten er ren gjetning, og hele svaret hviler da på et tall du fant på. Bunn-opp er ikke andrevalget her; det er eneste valg.",
      },
      {
        art: "struktur",
        sek: 150,
        tittel: "Enhetsøkonomien i én heis",
        sp: `<p>Skriv opp hva <b>én heis</b> koster eieren i løpet av ett år, i symboler, før du
          setter inn tall. Si deretter hvordan du skalerer opp.</p>`,
        figur: `<table class="data">
            <tr><th>Oppgitt av intervjueren</th><th class="n">Verdi</th></tr>
            <tr><td>Registrerte heiser i Norge</td><td class="n">65 000</td></tr>
            <tr><td>Forebyggende servicebesøk per heis per år</td><td class="n">4 à 2 timer</td></tr>
            <tr><td>Feilutrykninger per heis per år</td><td class="n">2 à 3 timer</td></tr>
            <tr><td>Timepris, heismontør ut mot kunde</td><td class="n">1 400 kr</td></tr>
            <tr><td>Deler og komponenter per heis per år</td><td class="n">4 000 kr</td></tr>
            <tr><td>Kostnad ved å skifte ut en heis</td><td class="n">600 000 kr</td></tr>
            <tr><td>Levetid før utskifting eller full modernisering</td><td class="n">25 år</td></tr>
            <tr><td>Sysselsatte i heisbransjen i Norge</td><td class="n">1 800</td></tr>
            <tr><td>Omsetning per sysselsatt i bransjen</td><td class="n">1,6 mill. kr</td></tr>
          </table>
          <table class="data">
            <tr><th>Norske referansetall (SSB)</th><th class="n">Verdi</th></tr>
            <tr><td>Befolkning</td><td class="n">5,6 mill.</td></tr>
            <tr><td>Husholdninger</td><td class="n">2,65 mill.</td></tr>
            <tr><td>Dagligvaremarkedet</td><td class="n">230 mrd kr</td></tr>
            <tr><td>Arbeidstimer per årsverk</td><td class="n">~1 600</td></tr>
          </table>`,
        fasit: `<p>Enhetsøkonomien har <b>to deler med helt ulik karakter</b>, og et sterkt svar
          skiller dem:</p>
          <div class="formula">
            <div class="eq">Årskostnad per heis = Drift + Annualisert utskifting</div>
            <div class="eq">Drift = (Servicetimer + Utrykningstimer) × Timepris + Deler</div>
            <div class="eq">Annualisert utskifting = Utskiftingskostnad / Levetid</div>
            <div class="eq">Marked = Årskostnad per heis × Antall heiser</div>
          </div>
          <p><b>Levetidstrikset brukes her på kostnadssiden, ikke på volumsiden.</b> I en vanlig
          sizing deler du installert base på levetid for å få antall <i>enheter</i> solgt i år.
          Her deler du utskiftingskostnaden på levetiden for å få hvor mange <i>kroner</i>
          utskifting én heis genererer i et gjennomsnittsår. Det er samme grep speilvendt, og det
          gjør at du slipper å gjette hvor mange heiser som tilfeldigvis byttes akkurat i år.</p>
          <p>Del arket i to og si det høyt: <b>sju tall skal inn i regnestykket, to er kryssjekk.</b>
          De to nederste i første tabell — 1 800 sysselsatte og 1,6 millioner i omsetning per
          hode — skal ikke røres før i trinn fem. Rører du dem tidligere, har du ingen uavhengig
          kryssjekk igjen.</p>
          <p>Si også avrundingsregelen: «Jeg runder til nærmeste tusen på enhetsnivå og til
          nærmeste hundre millioner på markedsnivå, og flagger retningen.»</p>`,
        krav: [
          "Du skriver ligningen i symboler før du setter inn ett eneste tall.",
          "Du deler årskostnaden i drift og annualisert utskifting, og forklarer hvorfor de er ulike.",
          "Du bruker levetiden til å annualisere utskiftingen i stedet for å gjette årets utskiftingsvolum.",
          "Du peker ut hvilke tall på arket som er kryssjekk og lover å ikke bruke dem før til slutt.",
          "Du sier avrundingsregelen din høyt før du begynner.",
        ],
        felle: "Å ta med servicekontrakten og glemme utskiftingen. Utskiftingen er 24 000 kroner per heis per år — over halve markedet. Et estimat som bare teller service, halverer svaret og kommer til å bomme mot enhver kryssjekk.",
      },
      {
        art: "regne",
        sek: 90,
        tittel: "Regn én heis", kort: "Én enhet",
        sp: `<p>Hva koster <b>én heis</b> eieren per år, i kroner?</p>
          <p class="tiny">Bygg det leddvis og si hvert delresultat høyt med enhet.</p>`,
        svar: 48000,
        enhet: "kroner",
        toleranse: 0.15,
        fasit: `<p>Fire ledd:</p>
          <div class="formula">
            <div class="eq">Timer: 4 × 2 + 2 × 3 = 8 + 6 = 14 timer per heis per år</div>
            <div class="eq">Arbeid: 14 × 1 400 kr = 19 600 kr</div>
            <div class="eq">Deler: 4 000 kr → Drift = 23 600 kr</div>
            <div class="eq">Annualisert utskifting: 600 000 / 25 = 24 000 kr</div>
            <div class="eq">Sum: 23 600 + 24 000 = <b>47 600 kr ≈ 48 000 kr per heis per år</b></div>
          </div>
          <p><b>Legg merke til balansen:</b> drift og utskifting er nesten nøyaktig like store.
          Det er ikke tilfeldig — det er hvordan heisbransjen faktisk ser ut, og det er verdt å
          si høyt: «Halvparten av kronene ligger i den løpende kontrakten, halvparten i
          kapitalutskiftingen. Det er to helt forskjellige forretninger, med ulike kunder og
          ulike beslutningstakere.»</p>
          <p><b>Sanity-sjekk enheten før du skalerer.</b> Dette er grepet som skiller et sterkt
          svar fra et middels: sjekk enhetstallet mot noe du kjenner, <i>før</i> du ganger opp
          med 65 000 og feilen blir stor.</p>
          <ul>
            <li><b>Mot felleskostnadene:</b> en blokk med 24 leiligheter og én heis betaler
              47 600 / 24 ≈ <b>2 000 kroner per leilighet per år</b> for heisen. Felleskostnadene
              i en slik blokk ligger typisk på 40 000–50 000 kroner i året per leilighet, så
              heisen er rundt fire prosent av dem. Det er akkurat der man skulle vente å finne
              den — under strøm, forsikring og vedlikehold av bygget, men over
              trappevask.</li>
            <li><b>Mot arbeidsinnsatsen:</b> 14 timer i året per heis er én dag med montør per
              heis. For en maskin som beveger seg tusen ganger i uka og har mennesker inni, er én
              dag i året lite, men ikke urimelig lite.</li>
          </ul>
          <p>Hvis enhetstallet ikke tåler denne sjekken, er det her du oppdager det — ikke etter
          at du har ganget med 65 000.</p>`,
        krav: [
          "Du sier enheten på hvert delresultat — timer, kroner, per år.",
          "Du har både drift og annualisert utskifting med, ikke bare den ene.",
          "Du sanity-sjekker enhetstallet før du skalerer opp, ikke bare etterpå.",
          "Du kommenterer at drift og utskifting er omtrent like store, og hva det betyr.",
          "Du runder åpent og sier hvilken vei du rundet.",
        ],
        felle: "Å hoppe rett til oppskaleringen. Feil i enhetstallet ganges med 65 000. Tjue sekunder på å sjekke at 2 000 kroner per leilighet per år er plausibelt, er den billigste forsikringen i hele casen.",
      },
      {
        art: "regne",
        sek: 90,
        tittel: "Skalér opp", kort: "Skalér opp",
        sp: `<p>Hvor stort blir det norske heismarkedet, <b>i millioner kroner per år</b>?</p>`,
        svar: 3100,
        enhet: "millioner kroner",
        toleranse: 0.15,
        fasit: `<p>Ett ledd, men skriv det i tierpotenser så størrelsesordenen sjekkes for seg:</p>
          <div class="formula">
            <div class="eq">65 000 heiser × 47 600 kr = 6,5 × 4,76 = 30,9, og 10⁴ × 10⁴ = 10⁸</div>
            <div class="eq">→ 30,9 × 10⁸ = 3 094 millioner kroner ≈ <b>3,1 milliarder kroner per år</b></div>
          </div>
          <p>Del gjerne opp i to tall med én gang, for det er den delingen klienten skal bruke:</p>
          <ul>
            <li><b>Servicemarkedet:</b> 65 000 × 23 600 = <b>1,53 milliarder</b></li>
            <li><b>Utskifting og modernisering:</b> 65 000 × 24 000 = <b>1,56 milliarder</b></li>
          </ul>
          <p><b>Sanity-sjekk mot noe kjent, og gjør to.</b></p>
          <ul>
            <li><b>Mot dagligvaremarkedet:</b> 3,1 av 230 milliarder er 1,3 prosent. For en
              usynlig infrastrukturtjeneste er det plausibelt — den skal være liten, men ikke
              forsvinnende.</li>
            <li><b>Mot énkroneankeret:</b> én krone per nordmann per dag er 2 milliarder i året.
              3,1 milliarder er da <b>1,50 kroner per nordmann per dag</b>. Kjenner du deg igjen i
              at heiser koster halvannen krone om dagen per hode? For en tjeneste omtrent
              halvparten av landet bruker jevnlig, er det riktig størrelsesorden.</li>
            <li><b>Volumsjekk:</b> 65 000 / 25 år betyr at <b>2 600 heiser skiftes ut i året</b>.
              Det er ti heiser hver arbeidsdag i Norge. Det høres mye ut første gang man sier det,
              men det følger direkte av parkens størrelse og levetid — og det er derfor tallet er
              verdt å si høyt.</li>
          </ul>`,
        krav: [
          "Du regner i tierpotenser og sjekker størrelsesordenen for seg før du sjekker sifrene.",
          "Du deler markedet i service og utskifting, fordi klienten skal kjøpe det ene av dem.",
          "Du sanity-sjekker mot minst to kjente norske størrelser og sier tallene høyt.",
          "Du oversetter minst én gang til noe et menneske kan kjenne igjen — per dag, per leilighet, per arbeidsdag.",
          "Du runder til 3,1 milliarder, ikke til 3 094 millioner.",
        ],
        felle: "Å levere 3 094 millioner. Fire signifikante siffer på et tall som hviler på et anslag om fire servicebesøk i året, sier at du ikke vet hvor usikkerheten ligger. «Rundt 3 milliarder» sier at du vet.",
      },
      {
        art: "regne",
        sek: 120,
        tittel: "Kryssjekken — regn det motsatt vei", kort: "Kryssjekk",
        sp: `<p>Nå bruker du de to tallene du har spart. <b>Hvor stort blir markedet regnet fra
          tilbudssiden, i millioner kroner per år?</b></p>
          <p class="tiny">Og si etterpå: møtes de to veiene, og hva betyr det?</p>`,
        svar: 2900,
        enhet: "millioner kroner",
        toleranse: 0.15,
        fasit: `<p>En ekte topp-ned finnes ikke her — det var poenget fra første trinn. Erstatningen
          er å regne markedet fra <b>bransjens egen kapasitet</b>:</p>
          <div class="formula">
            <div class="eq">1 800 sysselsatte × 1,6 mill. kr per hode = <b>2 880 millioner kroner ≈ 2,9 milliarder</b></div>
          </div>
          <p><b>Bunn-opp ga 3,1 milliarder. Tilbudssiden gir 2,9 milliarder. Avviket er 7 prosent.</b></p>
          <p>Nå kommer det som faktisk skiller et sterkt svar fra et middels: <b>å si hvorfor
          dette styrker tilliten, i stedet for bare å konstatere at tallene ligner.</b> Tre
          grunner, og de er alle verdt tjue sekunder hver:</p>
          <ul>
            <li><b>De to veiene deler ingen forutsetning.</b> Bunn-opp bygget på antall heiser,
              servicefrekvens, timepris, delekostnad og levetid. Tilbudssiden bygget på antall
              ansatte og omsetning per ansatt. Ikke ett tall går igjen. Hadde de delt en
              forutsetning, ville enigheten vært innbilt — to regnestykker som gjentar samme
              gjetning, kommer selvsagt fram til det samme.</li>
            <li><b>Avviket er mindre enn usikkerheten i det svakeste leddet.</b> Anslaget på fire
              servicebesøk i året er neppe bedre enn ±25 prosent alene. Når to uavhengige veier
              likevel lander innenfor 7 prosent av hverandre, er det sterkere bevis enn hver av
              dem er verdt hver for seg.</li>
            <li><b>Retningen på avviket gir mening.</b> Bunn-opp ligger litt høyest, og det er
              forventet: en del av utskiftingene gjøres av byggentreprenører og elektrikere som
              ikke telles blant de 1 800 i heisbransjen. Et avvik som peker <i>feil</i> vei ville
              vært langt mer bekymringsfullt enn ett som peker riktig vei.</li>
          </ul>
          <p><b>Og den tredje sjekken, som binder de to sammen:</b> bunn-opp sa 65 000 heiser à
          14 timer = <b>910 000 servicetimer</b> i året. Fordelt på 1 800 ansatte blir det
          <b>505 timer per hode</b>, av rundt 1 600 arbeidstimer i året. Altså går en tredjedel av
          bransjens tid til løpende service, og to tredjedeler til montasje, modernisering,
          reise og administrasjon. <i>Det er en helt normal fordeling for en servicebransje med
          utrykning.</i> Hadde regnestykket krevd 1 800 timer per hode, hadde bunn-opp vært umulig
          — og da hadde du visst det, i stedet for å levere et tall som ikke går opp.</p>
          <p>Landingen: <b>rundt 3 milliarder, spenn 2,7 til 3,4.</b></p>`,
        krav: [
          "Du regner kryssjekken uten å bruke ett eneste tall fra bunn-opp-kjeden.",
          "Du sier eksplisitt at de to veiene ikke deler noen forutsetning, og hvorfor det er hele poenget.",
          "Du forklarer retningen på avviket, ikke bare størrelsen.",
          "Du gjør timesjekken: bunn-oppens timer fordelt på bransjens folk skal gi et plausibelt årsverk.",
          "Du lander på et spenn, ikke på ett tall.",
        ],
        felle: "Å si «samme størrelsesorden, altså stemmer det» og gå videre. To veier som møtes fordi de deler en forutsetning, beviser ingenting. Kryssjekken er bare verdt noe hvis du kan si hvilke tall den ikke har til felles med den første.",
      },
      {
        art: "syntese",
        sek: 90,
        tittel: "Anbefalingen",
        sp: `<p>Klienten har <b>ett minutt</b>. Gi tallet, si hvilken vei du stoler mest på, og
          hvorfor.</p>`,
        fasit: `<p>Tallet først, spennet med, så hvilken vei du stoler på — og til slutt det
          klienten skal gjøre med det.</p>
          <blockquote><p><b>«Det norske heismarkedet er rundt 3 milliarder kroner i året. Jeg vil
          si 2,7 til 3,4 milliarder. Og det er omtrent likt delt: 1,5 milliarder i løpende
          service, 1,6 milliarder i utskifting og modernisering.»</b></p>
          <p>Slik kom jeg dit: 65 000 heiser i Norge. Hver koster eieren rundt 48 000 kroner i
          året — halvparten i servicekontrakt og deler, halvparten i utskifting fordelt over 25
          års levetid.</p>
          <p><b>Jeg stoler mest på bunn-opp-tallet</b>, og grunnen er ikke at det er større.
          Grunnen er at det hviler på <i>tellbare fysiske ting</i>: antall heiser, antall
          servicebesøk, en timepris. Kryssjekken fra tilbudssiden ga 2,9 milliarder, og den bruker
          ikke ett eneste av de tallene — den bygger på 1 800 ansatte og omsetning per hode. At to
          uavhengige veier lander innenfor 7 prosent av hverandre, er så nær bekreftelse som et
          estimat kommer.</p>
          <p>Tilbudssidetallet er samtidig det svakeste av de to, fordi «heisbransjen» er en
          uskarp avgrensning — en del av utskiftingsarbeidet gjøres av entreprenører som ikke
          telles der. Det forklarer også at det ligger litt lavere.</p>
          <p><b>Det viktigste for dere er ikke størrelsen, men delingen.</b> Dere vurderer å kjøpe
          en servicevirksomhet, og servicedelen er 1,5 milliarder — ikke 3. Til gjengjeld er den
          delen langt bedre: en servicekontrakt løper i tiår, kunden er et borettslag som ikke
          bytter leverandør uten grunn, og volumet henger på parken, ikke på konjunkturen.
          Utskiftingsdelen på 1,6 milliarder er større, men den er prosjektsalg mot anbud, og den
          svinger med byggemarkedet. Det jeg ville gjort videre, er å finne ut hvor mange av de
          65 000 heisene som allerede er bundet i kontrakt hos de tre store — for det, og ikke
          markedsstørrelsen, avgjør hva et oppkjøp faktisk kjøper.»</p></blockquote>`,
        krav: [
          "Du gir tallet med spenn og sier hvor usikkerheten sitter.",
          "Du sier eksplisitt hvilken av de to veiene du stoler mest på, og begrunner med metoden — ikke med tallet.",
          "Du navngir svakheten i den veien du stoler minst på.",
          "Du deler markedet i de to delene klienten faktisk skal velge mellom.",
          "Du trekker en strategisk konsekvens av sammensetningen og holder deg innenfor ett minutt.",
        ],
        felle: "Å si «rundt 3 milliarder» og stoppe. Klienten skal kjøpe en servicevirksomhet, og servicemarkedet er halvparten. Å levere totalen uten delingen er å svare på et annet spørsmål enn det som ble stilt.",
      },
    ],
  },
  {
    id: "ms-it-drift-smb",
    kategori: "Market sizing",
    label: "Hvor stort er markedet for utsatt IT-drift til norske SMB-er?",
    type: "Estimering",
    nivå: "Middels",
    firma: "Generisk",
    stil: "interviewer-led",
    minutter: 25,
    ch: [],
    blurb: "Den klassiske B2B-strukturen: én typisk kunde ganger antall kunder som finnes. Kryssjekken går via de ansatte i stedet for via bedriftene, og gapet mellom de to har et navn.",
    prompt: `<p>Klienten er et nordisk oppkjøpsfond. De ser på å bygge en plattform av norske
      IT-driftsleverandører — selskapene som tar over servere, brukerstøtte, sikkerhet og
      lisenser for bedrifter som ikke vil ha egen IT-avdeling. Før de går videre vil de vite
      hvor stor kaka er.</p>
      <p><b>Hvor stort er det norske markedet for utsatt IT-drift til små og mellomstore
      bedrifter, målt i kroner per år?</b></p>
      <p class="tiny">Ingen kalkulator. Bygg fra én typisk kunde, og kryssjekk til slutt.</p>`,
    bakgrunn: `<p>B2B-markeder er nesten alltid enklere å estimere enn forbrukermarkeder, og
      grunnen er at <b>kundene er tellbare</b>. Det finnes 5,6 millioner nordmenn og ingen liste
      over hvem som kjøper hva. Det finnes rundt 200 000 norske bedrifter med ansatte, og
      SSB publiserer hvor mange av dem som har fem ansatte, tjue, hundre. Kundegrunnlaget er
      ikke et anslag — det er et oppslag.</p>
      <p>Derfor har B2B-sizing en fast form: <b>marked = antall kunder som finnes × andel som
      kjøper × hva én kunde betaler i året</b>. All usikkerheten flytter seg til de to siste
      leddene, og det er der du skal bruke tiden din.</p>
      <p>Casen er valgt fordi den har en <b>ekte kryssjekk med et lærerikt gap</b>. Bunn-opp
      teller bedrifter. Topp-ned teller ansatte. De to lander ikke helt likt — og forskjellen er
      ikke støy, den er en identifiserbar kostnadspost som ligger utenfor driftsavtalen. Å
      navngi den er hele oppgaven.</p>`,
    trinn: [
      {
        art: "oppklaring",
        sek: 90,
        tittel: "Hva teller vi, og hvem er kunden?",
        sp: `<p>Hvilke spørsmål stiller du før du regner — og hvordan definerer du «én kunde»?</p>`,
        fasit: `<p>I B2B er avklaringene <b>hvem som er i kundegrunnlaget</b> og <b>hva som ligger
          inne i avtalen</b>. Begge flytter svaret med titalls prosent.</p>
          <ul>
            <li><b>Hva er «SMB» her?</b> Bedrifter uten ansatte har ingen IT-avtale, og bedrifter
              over hundre ansatte har egen IT-avdeling. Jeg avgrenser til <b>5–100 ansatte</b> og
              sier det høyt — det er der en utsatt driftsavtale faktisk er den naturlige
              løsningen.</li>
            <li><b>Hva ligger inne i «drift»?</b> Løpende drift, brukerstøtte, overvåkning og
              sikkerhet — eller også maskinvare, lisenser og prosjekter? Dette er avgjørende, og
              jeg velger å regne <b>tjenesteavtalen alene</b>, siden det er den klienten skal
              kjøpe selskaper som selger.</li>
            <li><b>Privat sektor alene, eller også kommuner og offentlige virksomheter?</b>
              Kommuner kjøper via rammeavtaler med helt andre priser. Jeg holder dem utenfor.</li>
            <li><b>Hvilken enhet bygger jeg fra?</b> <b>Én bedrift</b>, ikke én ansatt. Avtalen
              signeres av en bedrift, prisen settes per bruker, og en bedrift som først har satt
              ut IT-driften, setter ut hele den.</li>
          </ul>
          <p>Oppsummer i én setning før du begynner: «Jeg regner markedet for løpende
          IT-driftsavtaler solgt til private norske bedrifter med 5 til 100 ansatte, per år,
          uten maskinvare, lisenser og prosjekter.» Den setningen er halve karakteren.</p>`,
        krav: [
          "Du avgrenser bedriftsstørrelsen i begge ender, og begrunner begge grensene.",
          "Du sier hva som er inne i avtalen og hva som er utenfor — særlig maskinvare og lisenser.",
          "Du velger bedrift som enhet, ikke ansatt, og sier hvorfor.",
          "Du holder offentlig sektor utenfor eller inne bevisst, ikke ved forglemmelse.",
          "Du oppsummerer avgrensningen i én setning før du regner.",
        ],
        felle: "Å ta med alle 650 000 aktive norske bedrifter. De fleste av dem er enkeltpersonforetak uten ansatte, og de kjøper ingen driftsavtale. Bruker du det tallet, blir markedet ti ganger for stort før du har regnet ett ledd.",
      },
      {
        art: "struktur",
        sek: 150,
        tittel: "Enhetsøkonomien i én kunde",
        sp: `<p>Skriv opp hva <b>én typisk SMB-kunde</b> betaler i året, i symboler, og si hvordan
          du skalerer opp til hele markedet.</p>`,
        figur: `<table class="data">
            <tr><th>Oppgitt av intervjueren</th><th class="n">Verdi</th></tr>
            <tr><td>Private bedrifter i Norge med 5–100 ansatte</td><td class="n">60 000</td></tr>
            <tr><td>Andel som setter IT-driften ut til ekstern leverandør</td><td class="n">60 %</td></tr>
            <tr><td>Ansatte i en typisk bedrift i dette sjiktet</td><td class="n">18</td></tr>
            <tr><td>Pris per bruker per måned, drift og brukerstøtte</td><td class="n">900 kr</td></tr>
            <tr><td>Sysselsatte i private bedrifter med 5–100 ansatte</td><td class="n">1,1 mill.</td></tr>
            <tr><td>Benchmark: samlet ekstern IT-kostnad per ansatt per år i sjiktet</td><td class="n">12 000 kr</td></tr>
          </table>
          <table class="data">
            <tr><th>Norske referansetall (SSB)</th><th class="n">Verdi</th></tr>
            <tr><td>Aktive bedrifter</td><td class="n">0,65 mill.</td></tr>
            <tr><td>— av dem med ansatte</td><td class="n">0,2 mill.</td></tr>
            <tr><td>Sysselsatte</td><td class="n">2,9 mill.</td></tr>
            <tr><td>Fastlands-BNP</td><td class="n">4 400 mrd kr</td></tr>
            <tr><td>Dagligvaremarkedet</td><td class="n">230 mrd kr</td></tr>
          </table>`,
        fasit: `<p>Standardformen for B2B, i tre ledd:</p>
          <div class="formula">
            <div class="eq">Marked = Antall kunder × Årlig kontraktsverdi per kunde</div>
            <div class="eq">Antall kunder = Bedrifter i sjiktet × Andel som setter ut</div>
            <div class="eq">Årlig kontraktsverdi = Brukere per bedrift × Pris per bruker per måned × 12</div>
          </div>
          <p><b>Merk hvorfor prisen er per bruker og ikke per bedrift.</b> Det er ikke en
          detalj — det er slik bransjen faktisk selger, og det betyr at kontraktsverdien skalerer
          med bedriftsstørrelsen. Derfor må du velge et gjennomsnittlig antall brukere, og derfor
          må du si høyt at gjennomsnittet er skjevt: de fleste bedriftene i sjiktet har rundt ti
          ansatte, noen få har åtti, og de få trekker snittet opp til atten. Et vektet snitt er
          riktig her, og det er verdt å nevne at du vet det.</p>
          <p>Del arket i to. <b>Fire tall skal inn i regnestykket</b> — 60 000 bedrifter,
          60 prosent, 18 brukere, 900 kroner. <b>To er kryssjekk</b> — 1,1 millioner sysselsatte
          og benchmarken på 12 000 kroner per ansatt. Ikke rør de to før i trinn fem.</p>
          <p>Og si på forhånd hva kryssjekken skal gjøre: «Bunn-opp teller <i>bedrifter</i>.
          Kryssjekken teller <i>ansatte</i>. Hvis de to ikke møtes, ligger forklaringen enten i
          bedriftsstørrelsen eller i hva som er inne i prisen — og begge deler er verdt å
          vite.»</p>`,
        krav: [
          "Du skriver ligningen i symboler i tre ledd før du setter inn tall.",
          "Du forklarer hvorfor prisen er per bruker, og hva det gjør med kontraktsverdien.",
          "Du sier at gjennomsnittsbedriften på 18 ansatte er et skjevt snitt, ikke en typisk bedrift.",
          "Du skiller regnetall fra kryssjekktall og lover å spare de siste.",
          "Du sier på forhånd hva et eventuelt avvik i kryssjekken vil bety.",
        ],
        felle: "Å gange antall bedrifter med en pris per bedrift i stedet for per bruker. Da mister du koblingen til bedriftsstørrelsen, og kryssjekken mot ansatte blir umulig å tolke — for du har ikke lenger noe brukertall å sammenligne med.",
      },
      {
        art: "regne",
        sek: 90,
        tittel: "Regn én kunde", kort: "Én enhet",
        sp: `<p>Hva betaler <b>én typisk SMB-kunde</b> for IT-drift per år, i kroner?</p>`,
        svar: 195000,
        enhet: "kroner",
        toleranse: 0.15,
        fasit: `<p>To ledd, og det lønner seg å ta månedstallet først:</p>
          <div class="formula">
            <div class="eq">Per måned: 18 brukere × 900 kr = 16 200 kr</div>
            <div class="eq">Per år: 16 200 × 12 = <b>194 400 kr ≈ 195 000 kr per kunde per år</b></div>
          </div>
          <p><b>Sanity-sjekk enhetstallet før du skalerer.</b> Det er her et sterkt svar skiller
          seg — det middels svaret ganger opp med én gang og oppdager først på slutten at
          kundeøkonomien var urimelig.</p>
          <ul>
            <li><b>Mot en lønn:</b> 194 400 kroner i året er rundt en fjerdedel av en norsk
              IT-lønn med sosiale kostnader. Bedriften kjøper altså et kvart årsverk IT-kompetanse
              for prisen. For atten ansatte høres det riktig ut — en bedrift på atten trenger
              åpenbart mer enn null IT-folk og mindre enn én.</li>
            <li><b>Mot alternativet:</b> nettopp derfor kjøpes tjenesten. En egen IT-ansatt ville
              kostet 800 000 kroner og vært underbeskjeftiget. Fire ganger billigere er akkurat
              den marginen som gjør at utsetting vinner — hadde vi regnet oss fram til 600 000
              kroner i året, ville bedriften ansatt i stedet, og markedet ville ikke
              eksistert.</li>
            <li><b>Mot bedriftens omsetning:</b> en bedrift med atten ansatte omsetter typisk for
              30–40 millioner kroner. 194 400 er da rundt 0,5 prosent av omsetningen. IT-drift
              som en halv prosent av omsetningen er en velkjent størrelsesorden.</li>
          </ul>
          <p>Den midterste sjekken er den beste, fordi den ikke bare bekrefter tallet — den
          forklarer <i>hvorfor markedet finnes</i>. Det er den typen observasjon som får
          intervjueren til å notere.</p>`,
        krav: [
          "Du regner månedstallet først, så årstallet — det er lettere å sanity-sjekke.",
          "Du sier enheten på hvert delresultat.",
          "Du sjekker kundeøkonomien mot alternativet: å ansette noen selv.",
          "Du sjekker mot minst én andre målestokk, for eksempel andel av kundens omsetning.",
          "Du gjør sjekken før oppskaleringen, ikke etter.",
        ],
        felle: "Å glemme å gange med tolv. «900 kroner per bruker» er en månedspris, og 18 × 900 = 16 200 er et månedstall. Å levere 16 200 som årstall er en av de vanligste feilene i B2B-sizing, og den gir et marked som er tolv ganger for lite.",
      },
      {
        art: "regne",
        sek: 90,
        tittel: "Skalér opp", kort: "Skalér opp",
        sp: `<p>Hvor stort er markedet, <b>i millioner kroner per år</b>?</p>`,
        svar: 7000,
        enhet: "millioner kroner",
        toleranse: 0.15,
        fasit: `<p>To ledd:</p>
          <div class="formula">
            <div class="eq">Kunder: 60 000 bedrifter × 60 % = 36 000 kunder</div>
            <div class="eq">Marked: 36 000 × 194 400 kr = 3,6 × 1,944 = 7,0, og 10⁴ × 10⁵ = 10⁹</div>
            <div class="eq">→ <b>6 998 millioner kroner ≈ 7 milliarder kroner per år</b></div>
          </div>
          <p><b>Sanity-sjekk mot noe kjent.</b></p>
          <ul>
            <li><b>Mot dagligvaremarkedet:</b> 7 av 230 milliarder er 3 prosent. En
              B2B-tjeneste som er tre prosent av det nordmenn bruker på mat, er stort — men
              IT-drift er heller ikke en liten post.</li>
            <li><b>Mot fastlands-BNP:</b> 7 milliarder av 4 400 er 0,16 prosent. For én tjeneste
              til ett bedriftssjikt er det plausibelt.</li>
            <li><b>Baklengs, per bruker:</b> markedet dekker 36 000 × 18 = <b>648 000 brukere</b>.
              7 milliarder fordelt på dem er 10 800 kroner per bruker per år — som er nøyaktig
              900 × 12, altså prisen vi startet med. Den sjekken er sirkulær og beviser ingenting,
              og det er verdt å si høyt at man vet det: <i>«det er bare regnestykket mitt
              baklengs.»</i> Den ekte sjekken kommer nå.</li>
          </ul>
          <p>Legg merke til hva 648 000 brukere betyr: markedet dekker <b>22 prosent av alle
          sysselsatte i Norge</b>. Det tallet er ikke sirkulært — det kan sjekkes mot noe utenfor
          modellen, og det gjør vi i neste trinn.</p>`,
        krav: [
          "Du regner kundeantallet som eget delresultat før du ganger med kontraktsverdien.",
          "Du regner i tierpotenser så størrelsesordenen kontrolleres for seg.",
          "Du sanity-sjekker mot minst to kjente norske størrelser.",
          "Du gjenkjenner at «per bruker»-sjekken er sirkulær, og sier det høyt i stedet for å telle den som bevis.",
          "Du regner ut hvor mange brukere modellen dekker, fordi det er tallet kryssjekken skal treffe.",
        ],
        felle: "Å telle en sirkulær sjekk som bekreftelse. Deler du svaret på antall brukere og får prisen du selv satte inn, har du bekreftet at multiplikasjon virker — ingenting annet. En sanity-sjekk må hente inn et tall som ikke allerede står i regnestykket.",
      },
      {
        art: "regne",
        sek: 120,
        tittel: "Kryssjekken — regn det motsatt vei", kort: "Kryssjekk",
        sp: `<p>Bruk de to tallene du sparte. <b>Hvor stort blir markedet regnet topp-ned fra de
          ansatte, i millioner kroner per år?</b></p>
          <p class="tiny">Og forklar etterpå hvorfor de to veiene ikke lander helt likt.</p>`,
        svar: 7900,
        enhet: "millioner kroner",
        toleranse: 0.15,
        fasit: `<p>Topp-ned starter fra menneskene i stedet for fra bedriftene:</p>
          <div class="formula">
            <div class="eq">Brukere: 1 100 000 sysselsatte × 60 % utsettingsandel = 660 000 brukere</div>
            <div class="eq">Marked: 660 000 × 12 000 kr = <b>7 920 millioner ≈ 7,9 milliarder kroner</b></div>
          </div>
          <p><b>Bunn-opp ga 7,0 milliarder. Topp-ned gir 7,9. Avviket er 12 prosent.</b> Samme
          størrelsesorden — men et sterkt svar stopper ikke der. <b>Det dekomponerer gapet.</b>
          Det er to ledd, og de er ulikt viktige:</p>
          <ul>
            <li><b>Ledd A — brukertallet, 130 millioner kroner av gapet.</b> Bunn-opp dekket
              648 000 brukere, topp-ned 660 000. Forskjellen er 12 000 brukere, altså under to
              prosent. Det er avrunding i snittbedriften på atten ansatte, og det er ikke verdt
              mer enn én setning. <b>Men det er i seg selv en sterk bekreftelse:</b> at
              bedriftsveien og ansattveien uavhengig av hverandre kommer fram til nesten samme
              antall brukere, betyr at snittbedriften på atten ansatte var riktig valgt.</li>
            <li><b>Ledd B — prisen, 790 millioner kroner av gapet.</b> Vi regnet 900 kroner per
              bruker per måned, altså 10 800 i året. Benchmarken sier 12 000. Differansen er
              <b>1 200 kroner per bruker per år</b>, og 660 000 × 1 200 = 792 millioner — nesten
              hele gapet.</li>
          </ul>
          <p><b>Og nå kommer poenget: de 1 200 kronene har et navn.</b> Det er maskinvare,
          lisenser og prosjekter — akkurat det vi bevisst holdt utenfor i oppklaringstrinnet.
          Benchmarken måler samlet ekstern IT-kostnad, driftsavtalen måler bare tjenesten.
          <i>Gapet er ikke feil. Gapet er avgrensningen vår, målt i kroner.</i></p>
          <p>Det er derfor kryssjekken er verdt noe her: den bekrefter volumet (brukertallet
          stemmer), og den setter en prislapp på definisjonsvalget vårt. Klienten vet nå at det
          ligger nesten <b>800 millioner kroner i tilstøtende salg</b> rundt driftsavtalene — et
          tall ingen av de to regnestykkene ga alene.</p>
          <p>Landingen: <b>markedet for selve driftsavtalene er rundt 7 milliarder, med et
          tilstøtende marked på 0,8 milliarder. Totalt rundt 8.</b></p>`,
        krav: [
          "Du regner topp-ned fra ansatte uten å bruke kundeantallet fra bunn-opp.",
          "Du deler avviket i to ledd — volum og pris — i stedet for å oppgi ett samlet avvik.",
          "Du ser at brukertallene nesten møtes, og sier at det bekrefter valget av snittbedrift.",
          "Du navngir prisdifferansen: 1 200 kroner per bruker er maskinvare og lisenser utenfor avtalen.",
          "Du lander på to tall — avtalemarkedet og det tilstøtende — ikke ett.",
        ],
        felle: "Å konstatere «12 prosent avvik, godt nok» og gå videre. Et avvik du kan dekomponere, er verdt mer enn en enighet du ikke kan forklare — her ligger det 800 millioner kroner med et navn inne i de tolv prosentene.",
      },
      {
        art: "syntese",
        sek: 90,
        tittel: "Anbefalingen",
        sp: `<p>Fondet har <b>ett minutt</b>. Gi tallet, si hvilken vei du stoler mest på, og
          hvorfor.</p>`,
        fasit: `<p>Tallet, spennet, valget mellom de to veiene, og så det som betyr noe for
          investeringen.</p>
          <blockquote><p><b>«Markedet for utsatte IT-driftsavtaler til norske bedrifter med 5 til
          100 ansatte er rundt 7 milliarder kroner i året — 36 000 kunder som betaler i snitt
          195 000 hver. Jeg vil si 6 til 8 milliarder. I tillegg ligger det rundt 800 millioner i
          maskinvare, lisenser og prosjekter rundt de samme avtalene.»</b></p>
          <p>Slik kom jeg dit: 60 000 bedrifter i sjiktet, 60 prosent har satt ut driften. En
          typisk kunde har atten brukere til 900 kroner per bruker per måned, altså 195 000 i
          året.</p>
          <p><b>Jeg stoler mest på bunn-opp-tallet</b>, av to grunner. Den ene er at
          kundegrunnlaget er tellbart — 60 000 bedrifter i sjiktet er et oppslag, ikke et anslag,
          og det er sjelden i sizing. Den andre er at bunn-opp måler <i>akkurat det dere skal
          kjøpe</i>: tjenesteavtalen. Topp-ned-tallet på 7,9 milliarder er ikke feil, men det
          måler en videre kurv — samlet ekstern IT-kostnad, maskinvare og lisenser inkludert.</p>
          <p>Kryssjekken er likevel den mest nyttige delen av analysen, og det er verdt tjue
          sekunder: de to veiene kom fram til nesten nøyaktig samme antall brukere — 648 000 mot
          660 000 — helt uavhengig av hverandre. Volumet er altså trygt. Hele avviket ligger i
          prisen, og det er 1 200 kroner per bruker per år som ligger utenfor driftsavtalen.</p>
          <p><b>Det er den observasjonen jeg ville bygget investeringsteksten på.</b> Dere ser på
          en plattform av driftsleverandører i et marked på 7 milliarder. Men de samme kundene,
          med de samme avtalene, kjøper allerede 800 millioner i tilstøtende varer og tjenester
          — fra noen andre. En plattform som tar den delen med, vokser 11 prosent uten å skaffe
          én ny kunde. Det jeg ville sjekket først, er hvor mye av de 800 millionene
          driftsleverandørene allerede formidler i dag, og hvilken margin de tar på det.»</p></blockquote>`,
        krav: [
          "Du gir tallet med spenn og skiller avtalemarkedet fra det tilstøtende.",
          "Du sier hvilken vei du stoler mest på, og begrunner det med metoden — tellbart kundegrunnlag, riktig avgrensning.",
          "Du sier hva den andre veien måler i stedet, i stedet for å kalle den feil.",
          "Du bruker kryssjekkens innsikt — at volumet stemmer og at avviket er pris — som en del av anbefalingen.",
          "Du trekker en investeringsmessig konsekvens av gapet, og holder deg innenfor ett minutt.",
        ],
        felle: "Å oppgi ett tall og la fondet velge selv mellom 7 og 7,9. To tall uten en forklaring på forskjellen er verre enn ett tall — du overlater analysen til dem. Si hvilket som svarer på deres spørsmål, og hva det andre måler.",
      },
    ],
  },
  {
    id: "ms-bruktbil-sprik",
    kategori: "Market sizing",
    label: "Bruktbilmarkedet der de to veiene ikke møtes",
    type: "Estimering",
    nivå: "Avansert",
    firma: "Generisk",
    stil: "interviewer-led",
    minutter: 30,
    ch: [],
    blurb: "Bunn-opp gir 46 milliarder, topp-ned gir 96. Faktor to. Hele casen handler om å forklare avviket i stedet for å gjennomsnitte det bort — og forklaringen er verdt mer enn tallet.",
    prompt: `<p>Klienten er et forsikringsselskap. De vurderer å lansere en <b>bruktbilgaranti</b>
      — en forsikring kjøperen tegner ved eierskifte. De trenger å vite hvor stort markedet er
      før de bestemmer seg for om produktet skal selges gjennom forhandlere eller direkte til
      forbruker.</p>
      <p><b>Hvor stort er det norske bruktbilmarkedet, målt i kroner per år?</b></p>
      <p class="tiny">Ingen kalkulator. Gjør begge veier, og ta avviket alvorlig.</p>`,
    bakgrunn: `<p>De fleste sizing-caser slutter når du har ett tall. Denne begynner der.</p>
      <p>Bunn-opp og topp-ned gir sjelden identiske svar, og prep-bransjens standardråd er
      «samme størrelsesorden, altså greit». Det rådet er riktig når avviket er tjue prosent. Det
      er <b>feil når avviket er en faktor to</b> — for da er det ikke avrundingsstøy, da er det
      et systematisk avvik, og et systematisk avvik betyr alltid at <b>den ene veien teller noe
      den andre ikke gjør</b>.</p>
      <p>Kandidater gjør da nesten alltid en av to feil: de gjennomsnitter de to tallene, eller
      de velger det som passer historien de allerede har begynt på. Begge deler kaster bort den
      mest verdifulle informasjonen i hele casen. <b>Avviket er ikke et problem med
      regnestykket. Avviket er funnet.</b></p>
      <p>Bruktbil er valgt fordi avviket her har to helt ulike årsaker samtidig — én i volumet og
      én i prisen — og fordi løsningen er direkte beslutningsrelevant: den avgjør hvilken kanal
      klienten skal selge gjennom.</p>`,
    trinn: [
      {
        art: "oppklaring",
        sek: 90,
        tittel: "Hva er egentlig «bruktbilmarkedet»?",
        sp: `<p>Ordet «bruktbilmarkedet» betyr minst tre forskjellige ting. Hvilke spørsmål
          stiller du?</p>`,
        fasit: `<p>Dette er en case der <b>hele avviket senere kan spores tilbake til
          avklaringstrinnet</b>. Stiller du de riktige spørsmålene nå, er du ikke overrasket i
          trinn fem.</p>
          <ul>
            <li><b>Verdien av bilene som skifter eier, eller forhandlernes omsetning?</b> To vidt
              forskjellige tall. En bil som selges privat, har en verdi, men gir ingen
              forhandleromsetning. Jeg spør, og velger <b>verdien av bilene som skifter
              eier</b> — for klientens produkt selges ved eierskifte, uansett hvem som
              formidler.</li>
            <li><b>Teller privatsalg mellom to personer med?</b> Dette er det avgjørende
              spørsmålet, og hvis intervjueren svarer «hva tror du?», er svaret ja — men da må
              du telle dem, ikke bare nevne dem.</li>
            <li><b>Teller leasingbiler som går tilbake til leasingselskapet? Arv og gaver innad
              i familien?</b> Ikke alle eierskifter er salg. Jeg avgrenser til eierskifter der
              det faktisk betales.</li>
            <li><b>Hvilken enhet bygger jeg fra?</b> Her ligger fella: <b>bunn-opp og topp-ned
              har ikke samme enhet.</b> Bunn-opp bygger fra <i>én forhandler</i>. Topp-ned bygger
              fra <i>ett eierskifte</i>. En forhandler formidler bare noen av eierskiftene, og det
              er nettopp derfor de to veiene ikke kan bli like. Si det høyt allerede nå.</li>
          </ul>
          <p>Den siste kulen er hele casen, og den kandidaten som ser den i minutt to i stedet
          for i minutt tjue, har allerede vunnet.</p>`,
        krav: [
          "Du skiller verdien av bilene som skifter eier fra forhandlernes omsetning.",
          "Du spør eksplisitt om privatsalg mellom personer teller med.",
          "Du merker at bunn-opp og topp-ned vil ha ulik enhet — forhandler mot eierskifte — og sier det høyt.",
          "Du avgrenser hva som ikke er et salg: arv, gaver, leasingretur.",
          "Du sier hvilken definisjon du velger, og kobler den til hva klienten skal bruke tallet til.",
        ],
        felle: "Å ta «bruktbilmarkedet» for gitt som ett entydig begrep. Det finnes tre tall som alle med rette kalles bruktbilmarkedet, de spriker med en faktor to, og hvilket som er riktig avhenger utelukkende av hva klienten skal gjøre med det.",
      },
      {
        art: "struktur",
        sek: 150,
        tittel: "To veier med to ulike enheter",
        sp: `<p>Skriv opp <b>begge</b> regnestykkene i symboler, før du får tall. Si hvilken enhet
          hver av dem bygger fra, og hvor de kan komme til å sprike.</p>`,
        figur: `<table class="data">
            <tr><th>Bunn-opp: forhandlerleddet</th><th class="n">Verdi</th></tr>
            <tr><td>Bilforhandlere i Norge</td><td class="n">1 400</td></tr>
            <tr><td>Bruktbiler solgt per forhandler per år</td><td class="n">150</td></tr>
            <tr><td>Snittpris på bruktbil solgt gjennom forhandler</td><td class="n">220 000 kr</td></tr>
          </table>
          <table class="data">
            <tr><th>Topp-ned: bilparken</th><th class="n">Verdi</th></tr>
            <tr><td>Personbiler registrert i Norge</td><td class="n">2,9 mill.</td></tr>
            <tr><td>Gjennomsnittlig eiertid per eier</td><td class="n">6 år</td></tr>
            <tr><td>Antatt snittpris på en bruktbil, alle kanaler</td><td class="n">200 000 kr</td></tr>
            <tr><td>Snittpris på bil solgt privat, person til person</td><td class="n">120 000 kr</td></tr>
          </table>
          <table class="data">
            <tr><th>Norske referansetall (SSB)</th><th class="n">Verdi</th></tr>
            <tr><td>Nyregistrerte personbiler per år</td><td class="n">185 000</td></tr>
            <tr><td>Gjennomsnittspris ny personbil</td><td class="n">450 000 kr</td></tr>
            <tr><td>Levetid på en personbil før vraking</td><td class="n">18 år</td></tr>
            <tr><td>Husholdninger</td><td class="n">2,65 mill.</td></tr>
            <tr><td>Transportutgift per husholdning per år</td><td class="n">82 000 kr</td></tr>
          </table>`,
        fasit: `<p>Skriv begge, og skriv dem ved siden av hverandre:</p>
          <div class="formula">
            <div class="eq"><b>Bunn-opp:</b> Marked = Forhandlere × Biler per forhandler × Snittpris forhandlerbil</div>
            <div class="eq"><b>Topp-ned:</b> Marked = Eierskifter per år × Snittpris</div>
            <div class="eq">Eierskifter per år = Bilpark / Gjennomsnittlig eiertid</div>
          </div>
          <p><b>Levetidstrikset dukker opp i to former her, og det er verdt å skille dem.</b>
          Bilparken delt på <i>levetid</i> (18 år) gir hvor mange biler som vrakes i året.
          Bilparken delt på <i>eiertid</i> (6 år) gir hvor mange eierskifter som skjer i året.
          Det er eiertiden vi trenger, og de to henger sammen på en måte du kan si høyt: en bil
          som lever i 18 år og har tre eiere, gir seks år per eier. <i>De to tallene bekrefter
          hverandre.</i></p>
          <p><b>Og nå det som er selve casen: si på forhånd hvor du venter sprik.</b> Et sterkt
          svar predikerer avviket før det regner det:</p>
          <ul>
            <li><b>Volum:</b> bunn-opp teller bare biler som går gjennom en forhandler. Topp-ned
              teller alle eierskifter. Alt privatsalg finnes bare i den ene av dem.</li>
            <li><b>Pris:</b> forhandlerbiler er nyere og dyrere enn snittbilen. Å bruke én
              snittpris på begge kanaler er en forutsetning som nesten sikkert er gal.</li>
          </ul>
          <p>Merk hvor ubrukelig gjennomsnittet av de to svarene kommer til å være. Når du på
          forhånd vet at den ene mangler et helt segment og den andre priser to segmenter likt,
          er middelverdien mellom dem uten mening. <b>Planen er ikke å velge mellom dem, men å
          bygge det tredje tallet som forklarer begge.</b> Si den planen høyt nå.</p>`,
        krav: [
          "Du skriver begge ligningene i symboler, side ved side.",
          "Du skiller eiertid fra levetid, og viser at 18 år og tre eiere gir 6 år.",
          "Du predikerer hvor spriket vil komme — i volum og i pris — før du regner.",
          "Du sier at du ikke har tenkt å gjennomsnitte de to svarene, og hvorfor ikke.",
          "Du sier hva du faktisk har tenkt å levere: et tredje tall som forklarer begge.",
        ],
        felle: "Å velge én vei og la den andre ligge fordi «man skal bare gjøre den ene og sanity-sjekke med den andre». Her er kryssjekken hele oppgaven. Gjør du bare bunn-opp, leverer du 46 milliarder og aner ikke at du har utelatt 56 prosent av bilene.",
      },
      {
        art: "regne",
        sek: 60,
        tittel: "Regn én forhandler", kort: "Én enhet",
        sp: `<p>Hva omsetter <b>én bilforhandler</b> for på bruktbil per år, i millioner kroner?</p>`,
        svar: 33,
        enhet: "millioner kroner",
        toleranse: 0.15,
        fasit: `<div class="formula">
            <div class="eq">150 biler × 220 000 kr = 15 × 22 = 330, og 10¹ × 10⁴ = 10⁵</div>
            <div class="eq">→ 330 × 10⁵ = <b>33 millioner kroner per forhandler per år</b></div>
          </div>
          <p><b>Sanity-sjekk enheten før du skalerer.</b></p>
          <ul>
            <li><b>Mot arbeidsdagene:</b> 150 biler i året er tre biler i uka, eller én bil hver
              tredje dag samlet for hele forhandleren. For en middels norsk bilforhandler med
              kanskje fem selgere er det lavt per selger, men husk at snittet inkluderer mange
              små brukthandlere med to ansatte og noen få store kjedeforhandlere med
              femhundre biler. <i>Snittet er skjevt, og det er verdt å si.</i></li>
            <li><b>Mot bemanningen:</b> 33 millioner i bruktbilomsetning med kanskje 8 prosent
              bruttomargin er 2,6 millioner i dekningsbidrag. Det holder til to til tre selgere
              — som er en plausibel bruktbilavdeling.</li>
          </ul>
          <p>Legg merke til at 220 000 kroner er <i>forhandlerbilens</i> snittpris, ikke
          bruktbilens generelt. Du fikk to prisanslag på arket, og at du bruker det riktige her
          er halve poenget med at det står to der.</p>`,
        krav: [
          "Du bruker forhandlerprisen på 220 000, ikke den blandede prisen på 200 000.",
          "Du regner i tierpotenser og sjekker størrelsesordenen for seg.",
          "Du oversetter 150 biler til noe menneskelig — biler per uke — for å kjenne på om det er plausibelt.",
          "Du sier at snittforhandleren er et skjevt snitt mellom små brukthandlere og store kjeder.",
          "Du sier enheten på svaret: millioner kroner per forhandler per år.",
        ],
        felle: "Å gripe 200 000 fordi det er det mest «typiske» tallet på arket. Arket gir deg tre priser med vilje: 220 000 for forhandlerbil, 120 000 for privatsalg, 200 000 som en blandet antakelse. Å bruke feil pris her forplanter seg gjennom hele casen.",
      },
      {
        art: "regne",
        sek: 90,
        tittel: "Skalér opp forhandlerleddet", kort: "Skalér opp",
        sp: `<p>Hvor stort blir <b>forhandlermarkedet</b>, i milliarder kroner per år?</p>
          <p class="tiny">Regn også ut hvor mange biler det er, du får bruk for det.</p>`,
        svar: 46,
        enhet: "milliarder kroner",
        toleranse: 0.15,
        fasit: `<div class="formula">
            <div class="eq">Biler: 1 400 forhandlere × 150 = 210 000 bruktbiler per år</div>
            <div class="eq">Kroner: 210 000 × 220 000 kr = 21 × 22 = 462, og 10⁴ × 10⁴ = 10⁸</div>
            <div class="eq">→ 462 × 10⁸ = <b>46,2 milliarder kroner per år</b></div>
          </div>
          <p><b>Skriv opp 210 000 biler like tydelig som du skriver 46 milliarder.</b> Det er
          volumtallet som gjør avstemmingen i neste trinn mulig, og kandidater som bare noterer
          kronetallet, må regne det på nytt under press.</p>
          <p><b>Sanity-sjekk:</b> 46 milliarder er 55 prosent av nybilmarkedet, som er 185 000
          biler à 450 000 kroner = 83 milliarder. At forhandlernes brukthandel er litt over
          halvparten av nybilomsetningen, er plausibelt — de fleste bilforhandlere sier selv at
          brukt er omtrent like stort som nytt i antall biler, men mindre i kroner fordi bilene
          er billigere. Her er det 210 000 brukte mot 185 000 nye i antall, altså <i>flere</i>
          brukte enn nye, og 55 prosent av verdien. Det henger sammen.</p>
          <p>Si samtidig hva du <b>ikke</b> har telt: alt som skifter eier utenom en forhandler.
          Ikke gjett på hvor mye det er ennå — neste trinn måler det.</p>`,
        krav: [
          "Du noterer volumtallet 210 000 biler like tydelig som kronetallet.",
          "Du sanity-sjekker mot nybilmarkedet på 83 milliarder og kommenterer forholdet.",
          "Du sammenligner både i antall og i kroner, og forklarer hvorfor de gir ulike forholdstall.",
          "Du sier eksplisitt hva som ikke er med i dette tallet, uten å gjette størrelsen ennå.",
          "Du kaller tallet forhandlermarkedet, ikke bruktbilmarkedet.",
        ],
        felle: "Å kalle 46 milliarder for «bruktbilmarkedet» og gå videre til syntesen. Det er forhandlermarkedet. Å levere det under feil navn er ikke en regnefeil, men det er den feilen som ville kostet klienten mest — de ville designet produktet for feil halvdel av markedet.",
      },
      {
        art: "regne",
        sek: 150,
        tittel: "Kryssjekken — regn det motsatt vei", kort: "Kryssjekk",
        sp: `<p>Regn markedet <b>topp-ned</b> fra bilparken. Hvor stort blir det, i milliarder
          kroner per år?</p>
          <p class="tiny">Og så det som er hele casen: forklar avviket. Ikke gjennomsnitt det.</p>`,
        svar: 96,
        enhet: "milliarder kroner",
        toleranse: 0.15,
        fasit: `<div class="formula">
            <div class="eq">Eierskifter: 2 900 000 / 6 år = 483 000 ≈ 480 000 per år</div>
            <div class="eq">Marked: 480 000 × 200 000 kr = 48 × 2 = 96, og 10⁴ × 10⁵ = 10⁹</div>
            <div class="eq">→ <b>96 milliarder kroner per år</b></div>
          </div>
          <p><b>Bunn-opp ga 46 milliarder. Topp-ned gir 96. Faktor 2,1.</b> Nå begynner arbeidet,
          og det er her casen vinnes eller tapes.</p>
          <p><b>Steg 1 — avstem volumet først, ikke kronene.</b> Volum er alltid lettere å
          forklare enn verdi, og det gir deg fotfeste:</p>
          <div class="formula">
            <div class="eq">480 000 eierskifter − 210 000 gjennom forhandler = <b>270 000 privatsalg</b></div>
            <div class="eq">Privatandel: 270 000 / 480 000 = <b>56 prosent av alle eierskifter</b></div>
          </div>
          <p>Volumsiden går altså opp umiddelbart, og forklaringen er akkurat den vi predikerte i
          strukturtrinnet: <b>over halvparten av norske bruktbiler skifter eier uten at en
          forhandler er involvert.</b> Bunn-opp kunne aldri sett dem — en forhandlerbasert
          modell teller per definisjon bare det som går gjennom en forhandler. <i>Den ene veien
          teller noe den andre ikke gjør, og nå vet vi nøyaktig hvor mange.</i></p>
          <p><b>Steg 2 — og nå den delen de fleste hopper over: kronene går likevel ikke opp.</b>
          Hvis privatbilene også var verdt 200 000, ville privatsalget vært 54 milliarder, og
          46 + 54 = 100 ≈ 96. Men arket sier at en privatsolgt bil koster <b>120 000</b>, ikke
          200 000 — og det gir mening, for private selger eldre biler:</p>
          <div class="formula">
            <div class="eq">Privatsalg: 270 000 × 120 000 kr = 32,4 milliarder</div>
            <div class="eq">Forhandler: 210 000 × 220 000 kr = 46,2 milliarder</div>
            <div class="eq">Sum: 32,4 + 46,2 = <b>78,6 ≈ 79 milliarder kroner</b></div>
          </div>
          <p><b>Så avviket har to helt ulike årsaker, og et sterkt svar navngir begge:</b></p>
          <ul>
            <li><b>Bunn-opp var for lav fordi den manglet et helt segment.</b> 270 000 biler,
              32 milliarder kroner, som aldri var med i modellen. Det er en <i>dekningsfeil</i>.</li>
            <li><b>Topp-ned var for høy fordi den brukte én pris på to ulike populasjoner.</b>
              Den antatte snittprisen på 200 000 var forhandlerprisen i forkledning. Den ekte
              blandede snittprisen er 78,6 mrd / 480 000 = <b>163 750 kroner</b>. Det er en
              <i>miksfeil</i>, og den er den vanligste feilen i all topp-ned-sizing.</li>
          </ul>
          <p><b>Fasit: rundt 79 milliarder, ikke 46 og ikke 96.</b> Legg merke til at ingen av
          de to opprinnelige tallene var riktige, og at gjennomsnittet av dem — 71 milliarder —
          heller ikke ville vært det. Du kommer ikke fram ved å midle. Du kommer fram ved å
          <b>splitte populasjonen og prise hver del for seg</b>.</p>
          <p><b>Sanity-sjekken, og den skal du ta på alvor:</b> 79 milliarder fordelt på
          2,65 millioner husholdninger er <b>29 700 kroner per husholdning per år</b> på bruktbil
          alene. SSB sier at hele transportbudsjettet er 82 000 kroner per husholdning, og det
          skal også dekke drivstoff, forsikring, verksted og kollektivtransport — pluss nybil.
          Legger vi nybilmarkedet på 83 milliarder oppå, blir bilkjøp alene 61 000 av 82 000.
          <b>Det går ikke opp,</b> og det skal du si høyt. To forklaringer, og begge er delvis
          sanne: en betydelig del av nybilene kjøpes av bedrifter og leasingselskaper og treffer
          aldri et husholdningsbudsjett, og SSBs forbruksundersøkelse fanger store, sjeldne
          kjøp dårlig. Men det betyr også at <b>79 milliarder trolig ligger i overkant</b>, og
          det hører hjemme i spennet.</p>`,
        krav: [
          "Du avstemmer volumet før du avstemmer kronene, og finner 270 000 privatsalg.",
          "Du navngir dekningsfeilen i bunn-opp og miksfeilen i topp-ned som to ulike feil.",
          "Du bygger det tredje tallet ved å prise de to segmentene hver for seg.",
          "Du regner ut den implisitte blandede snittprisen og viser at 200 000 var feil.",
          "Du sier eksplisitt at gjennomsnittet av de to opprinnelige tallene ville vært galt.",
          "Du gjør per-husholdning-sjekken, ser at den er stram, og lar den justere spennet.",
        ],
        felle: "Å stoppe etter volumavstemmingen. 270 000 privatbiler forklarer hvorfor bunn-opp var lav, men ikke hvorfor topp-ned var høy. Prises de 270 000 til 200 000 kroner, får du 100 milliarder og tror alt stemmer — mens den ekte feilen, at private biler er en tredjedel billigere, står uoppdaget.",
      },
      {
        art: "syntese",
        sek: 90,
        tittel: "Anbefalingen",
        sp: `<p>Forsikringsselskapet har <b>ett minutt</b>. Gi tallet, si hvilken vei du stoler
          mest på, og hva avviket betyr for kanalvalget deres.</p>`,
        fasit: `<p>Her er tallet nesten det minst interessante. <b>Avviket er anbefalingen.</b></p>
          <blockquote><p><b>«Det norske bruktbilmarkedet er rundt 79 milliarder kroner i året, og
          jeg vil si 70 til 85. Men det tallet er ikke det viktigste jeg har til dere: markedet
          er delt i to nesten like halvdeler som oppfører seg helt forskjellig. 210 000 biler til
          46 milliarder går gjennom forhandler. 270 000 biler til 32 milliarder skifter eier
          privat.»</b></p>
          <p>Slik kom jeg dit: 2,9 millioner biler med seks års eiertid gir 480 000 eierskifter i
          året. Av dem går 210 000 gjennom de 1 400 forhandlerne. Resten — 56 prosent av bilene —
          går fra person til person, og de bilene er eldre og en tredjedel billigere.</p>
          <p><b>Jeg stoler mest på den avstemte modellen, ikke på noen av de to enkeltveiene.</b>
          Bunn-opp ga 46 milliarder og var for lav, fordi den bare kan se biler som går gjennom
          en forhandler. Topp-ned ga 96 og var for høy, fordi den priset alle 480 000 bilene som
          om de var forhandlerbiler. <i>Ingen av dem var riktig, og gjennomsnittet — 71
          milliarder — ville heller ikke vært det.</i> Tallet kommer først når man deler
          populasjonen i to og priser hver del for seg.</p>
          <p><b>Og nå det som avgjør kanalvalget deres.</b> Dere spurte om produktet skal selges
          gjennom forhandler eller direkte. Svaret ligger i avviket: gjennom forhandler når dere
          44 prosent av bilene, men 58 prosent av kronene — de nyeste og dyreste bilene, som er
          lettest å forsikre og har lavest skadefrekvens. Direkte til forbruker når dere de
          resterende 270 000, men det er eldre biler til 120 000 kroner, der garantien koster mer
          og betaler mindre.</p>
          <p>Min anbefaling er derfor <b>å starte i forhandlerkanalen, men ikke fordi den er
          størst — fordi den er den eneste med et distribusjonsledd</b>. 1 400 forhandlere er en
          liste dere kan ringe. 270 000 privatpersoner er ikke en kanal, det er et
          markedsføringsproblem. Det jeg ville gjort videre, er å sjekke hvor mange av de 270 000
          privatsalgene som allerede går gjennom en nettmarkedsplass — for hvis de gjør det, har
          den andre halvdelen likevel et distribusjonsledd, og da endrer regnestykket seg
          fullstendig.»</p></blockquote>`,
        krav: [
          "Du gir tallet med spenn, men gjør det tydelig at delingen er den egentlige leveransen.",
          "Du sier at du ikke stoler på noen av enkeltveiene, og hvorfor hver av dem var feil.",
          "Du sier eksplisitt at gjennomsnittet av de to ville vært galt.",
          "Du oppgir delingen både i antall biler og i kroner, og bruker at de to andelene er ulike.",
          "Du kobler avviket direkte til kanalvalget klienten faktisk skal ta.",
          "Du holder deg innenfor ett minutt.",
        ],
        felle: "Å levere «mellom 46 og 96 milliarder» som om spennet var svaret. Det er ikke usikkerhet — det er to ulike definisjoner, og begge er presise innenfor sin egen. Å presentere dem som et spenn skjuler nøyaktig den innsikten klienten betalte for.",
      },
    ],
  },
  {
    id: "ms-nettdagligvare-beslutning",
    kategori: "Market sizing",
    label: "Tallet som avgjør om lageret skal bygges",
    type: "Estimering",
    nivå: "Avansert",
    firma: "Generisk",
    stil: "interviewer-led",
    minutter: 30,
    ch: [],
    blurb: "Slik estimering faktisk opptrer i arbeidslivet: klienten skal ta et valg, og tallet ingen har gitt dem er inngangsverdien. Syntesen er ikke markedsstørrelsen — den er beslutningen.",
    prompt: `<p>Klienten er en av de store norske dagligvarekjedene. De plukker i dag
      nettbestillinger manuelt i vanlige butikker i Oslo, og vurderer å bygge et
      <b>eget plukklager</b> — et «dark store» som bare betjener nettordrer.</p>
      <p>Investeringen koster <b>30 millioner kroner i året</b> i faste kostnader. Til gjengjeld
      faller plukkekostnaden fra <b>190 kroner per ordre i butikk til 90 kroner per ordre på
      lageret</b> — en besparelse på 100 kroner per ordre.</p>
      <p>De har 25 prosent av dagligvaremarkedet i Oslo. <b>Skal de bygge lageret?</b></p>
      <p class="tiny">Ingen har fortalt dem hvor mange nettordrer som finnes i Oslo. Det tallet
      må du lage — og så bruke det.</p>`,
    bakgrunn: `<p>Estimeringscasene i casebøkene ender nesten alltid med et tall. Sånn er det
      nesten aldri i virkeligheten. <b>I virkeligheten er estimatet et mellomsteg</b>: klienten
      skal ta et valg, valget avhenger av en størrelse ingen har målt, og konsulentens jobb er å
      lage den størrelsen godt nok til at valget kan tas.</p>
      <p>Det endrer to ting ved hvordan du jobber. <b>For det første kan du regne baklengs fra
      beslutningen:</b> du trenger ikke å vite markedet nøyaktig, du trenger å vite om det er
      over eller under et bestemt nivå. Det nivået kan du regne ut <i>før</i> du estimerer
      noe som helst, og da vet du hvor presis du må være. <b>For det andre er svaret ditt aldri
      et tall alene</b> — det er en anbefaling med tallet som begrunnelse.</p>
      <p>Denne casen er bygget slik at nullpunktet kan regnes ut på tjue sekunder, mens estimatet
      tar ti minutter. Kandidater som regner nullpunktet først, vet hele veien hva de leter
      etter. Kandidater som ikke gjør det, leverer et markedstall og oppdager først i syntesen
      at de mangler halve svaret.</p>`,
    trinn: [
      {
        art: "oppklaring",
        sek: 90,
        tittel: "Hvilket tall trenger beslutningen egentlig?",
        sp: `<p>Klienten spør om de skal bygge et lager. <b>Hvilket tall må du lage for å svare
          — og hva er det ikke?</b></p>`,
        fasit: `<p>Første grep er å oversette spørsmålet fra klientens språk til et regnestykke.
          Klienten sa «skal vi bygge». Det de trenger, er:</p>
          <div class="formula">
            <div class="eq">Klientens nettordrer per uke ⋛ Nullpunktet der besparelsen dekker de faste kostnadene</div>
          </div>
          <p>Og legg merke til hva det <b>ikke</b> er. Det er ikke dagligvaremarkedet i Oslo i
          kroner. Det er ikke nettdagligvaremarkedet i Norge. Det er <b>klientens eget antall
          ordrer per uke i Oslo</b> — og for å komme dit må du gå veien om markedet, men markedet
          er mellomsteget, ikke svaret.</p>
          <ul>
            <li><b>Hvilken geografi?</b> Lageret betjener Oslo. Da er det Oslo som skal
              estimeres, ikke Norge. En kandidat som estimerer Norge og deler på befolkningen til
              slutt, har gjort dobbelt arbeid.</li>
            <li><b>Ordrer eller kroner?</b> Kostnadene er per ordre. Da må svaret til slutt være
              i ordrer. Jeg regner i kroner underveis fordi markedstall er lettere å
              sanity-sjekke i kroner, og konverterer til slutt.</li>
            <li><b>Hvilket år?</b> Lageret er en investering med lang levetid. Beslutningen kan
              ikke tas på dagens volum alene — jeg må ha en vekstbane. Spør om hvor fort
              nettandelen vokser, for uten det er svaret bare halvferdig.</li>
            <li><b>Er de 25 prosentene markedsandel i nett, eller i dagligvare totalt?</b> Ikke
              det samme. Kjeder med sterk nettsatsing har høyere andel på nett enn i butikk. Jeg
              antar at nettandelen er lik den totale andelen, og <b>flagger det som en
              forutsetning jeg vil teste</b>.</li>
          </ul>
          <p>Og det grepet som skiller et sterkt svar: <b>si at du vil regne nullpunktet
          først.</b> «Før jeg estimerer noe, regner jeg ut hvor mange ordrer i uka lageret må ha
          for å lønne seg. Da vet jeg hvilken presisjon estimatet mitt trenger.» Det tar tjue
          sekunder og styrer hele resten av casen.</p>`,
        krav: [
          "Du oversetter «skal vi bygge» til en sammenligning mellom to tall.",
          "Du sier hva estimatet ikke er — markedet er mellomsteget, ikke svaret.",
          "Du ser at kostnadene er per ordre, og at svaret derfor må ende i ordrer.",
          "Du spør om vekstbanen, fordi en investeringsbeslutning ikke kan tas på dagens volum.",
          "Du sier at du vil regne nullpunktet før du estimerer, og hvorfor det styrer presisjonskravet.",
        ],
        felle: "Å behandle dette som en ren sizing-oppgave og levere «nettdagligvaremarkedet i Oslo er rundt 900 millioner kroner». Det er riktig, og det svarer ikke på spørsmålet. Klienten kan ikke bygge eller la være å bygge et lager på grunnlag av et kronetall de ikke kan sammenligne med noe.",
      },
      {
        art: "struktur",
        sek: 150,
        tittel: "Enhetsøkonomien i én husholdning — og nullpunktet",
        sp: `<p>Skriv opp <b>begge</b> regnestykkene i symboler: hva én netthandlende husholdning
          bruker i året, og hvor nullpunktet for lageret ligger. Regn nullpunktet med én gang.</p>`,
        figur: `<table class="data">
            <tr><th>Oppgitt av intervjueren</th><th class="n">Verdi</th></tr>
            <tr><td>Husholdninger i Oslo</td><td class="n">380 000</td></tr>
            <tr><td>Andel som handler dagligvarer på nett</td><td class="n">8 %</td></tr>
            <tr><td>Nettbestillinger per netthandlende husholdning per måned</td><td class="n">2</td></tr>
            <tr><td>Snittkurv per nettordre</td><td class="n">1 250 kr</td></tr>
            <tr><td>Nettandel av dagligvare i Oslo i dag</td><td class="n">3 %</td></tr>
            <tr><td>Ventet nettandel om tre år</td><td class="n">7 %</td></tr>
            <tr><td>Klientens andel av dagligvaremarkedet i Oslo</td><td class="n">25 %</td></tr>
          </table>
          <table class="data">
            <tr><th>Lagerets økonomi</th><th class="n">Verdi</th></tr>
            <tr><td>Faste kostnader per år</td><td class="n">30 mill. kr</td></tr>
            <tr><td>Plukkekostnad per ordre, i butikk</td><td class="n">190 kr</td></tr>
            <tr><td>Plukkekostnad per ordre, på lager</td><td class="n">90 kr</td></tr>
          </table>
          <table class="data">
            <tr><th>Norske referansetall (SSB)</th><th class="n">Verdi</th></tr>
            <tr><td>Befolkning</td><td class="n">5,6 mill.</td></tr>
            <tr><td>Oslo kommune</td><td class="n">0,73 mill.</td></tr>
            <tr><td>Husholdninger i Norge</td><td class="n">2,65 mill.</td></tr>
            <tr><td>Personer per husholdning, Norge / Oslo</td><td class="n">2,1 / 1,9</td></tr>
            <tr><td>Dagligvaremarkedet</td><td class="n">230 mrd kr</td></tr>
          </table>`,
        fasit: `<p>To ligninger, og den korte skal regnes ferdig med én gang:</p>
          <div class="formula">
            <div class="eq"><b>Estimatet:</b> Marked = Husholdninger × Nettandel × Ordrer per år × Snittkurv</div>
            <div class="eq"><b>Beslutningen:</b> Nullpunkt = Faste kostnader / Besparelse per ordre</div>
            <div class="eq">Nullpunkt = 30 000 000 / 100 = 300 000 ordrer per år = <b>5 800 ordrer per uke</b></div>
          </div>
          <p><b>Der er tallet du leter etter, og det tok tjue sekunder.</b> Nå vet du noe
          uvurderlig: du trenger ikke å treffe markedet på ti prosent. Du trenger å vite om
          klientens ukevolum er over eller under 5 800 — og hvis estimatet ditt lander langt fra
          den grensen, spiller presisjonen nesten ingen rolle. <i>Det er slik profesjonelle
          estimerer: presisjonskravet settes av beslutningen, ikke av ambisjonen.</i></p>
          <p><b>Merk enhetsvalget i estimatet.</b> Enheten er <b>husholdning</b>, ikke person. En
          dagligvarehandel gjøres for en husholdning; to samboere gjør ikke to bestillinger. Og
          det er ikke alle husholdninger — det er <i>de som allerede handler mat på nett</i>, som
          er en helt annen og mye mer intens kunde enn gjennomsnittet. Den todelingen er hele
          grunnen til at bunn-opp gir mer innsikt enn topp-ned her: topp-ned gir deg <i>3 prosent
          nettandel</i>, bunn-opp gir deg <i>hvem de 3 prosentene er</i>.</p>
          <p>Del arket: sju tall til estimatet og vekstbanen, tre til beslutningen, fem til
          sanity-sjekk. Og si hva du skal ende med: <b>«Jeg leverer klientens ordrer per uke i
          dag og om tre år, målt mot 5 800.»</b></p>`,
        krav: [
          "Du regner nullpunktet før du estimerer noe som helst, og sier hvorfor.",
          "Du sier hva nullpunktet betyr for presisjonskravet i estimatet.",
          "Du velger husholdning som enhet, ikke person, og begrunner det.",
          "Du skiller de netthandlende husholdningene fra alle husholdninger, som to ulike populasjoner.",
          "Du sier på forhånd nøyaktig hvilket tall du skal levere, og mot hvilken grense.",
        ],
        felle: "Å spare nullpunktet til slutt fordi «det hører hjemme i syntesen». Regnet først styrer det hele casen: det forteller deg om du trenger ett eller tre desimaler, om vekstbanen er avgjørende, og hva du skal kryssjekke hardest. Regnet sist er det bare aritmetikk.",
      },
      {
        art: "regne",
        sek: 60,
        tittel: "Regn én husholdning", kort: "Én enhet",
        sp: `<p>Hva handler <b>én netthandlende husholdning i Oslo</b> for på nett per år, i
          kroner?</p>`,
        svar: 30000,
        enhet: "kroner",
        toleranse: 0.15,
        fasit: `<div class="formula">
            <div class="eq">Ordrer: 2 per måned × 12 = 24 ordrer per år</div>
            <div class="eq">Beløp: 24 × 1 250 kr = <b>30 000 kroner per år</b></div>
          </div>
          <p><b>Sanity-sjekk enheten, og gjør det her — den er uvanlig sterk i denne casen.</b></p>
          <ul>
            <li><b>Mot matbudsjettet:</b> hva bruker en Oslo-husholdning på mat i alt? Oslos
              dagligvaremarked er 30 milliarder (det regner vi i trinn fem), fordelt på 380 000
              husholdninger blir det <b>79 000 kroner i året</b>. Vår netthusholdning kjøper
              30 000 av dem på nett — altså <b>38 prosent av matbudsjettet sitt</b>. Er det
              plausibelt? Ja: den som først har lagt om til nett, gjør storhandelen der og
              suppleringshandelen i butikk. 38 prosent er akkurat mønsteret man ser hos folk som
              faktisk bruker tjenesten.</li>
            <li><b>Mot frekvensen:</b> to bestillinger i måneden er annenhver uke. For en
              storhandel med levering hjem er det den naturlige rytmen — ukentlig ville krevd et
              annet kundesegment, månedlig ville betydd at bilen fortsatt gjør jobben.</li>
            <li><b>Mot kurven:</b> 1 250 kroner per ordre mot en vanlig butikkhandel på 300–400
              kroner. Tre til fire ganger større, som er nøyaktig det man skulle vente av en
              storhandel med fraktgrense.</li>
          </ul>
          <p>Den midterste og siste sjekken henger sammen og bekrefter hverandre: <b>store
          kurver sjeldnere.</b> Hvis du hadde regnet deg fram til 1 250 kroner <i>ukentlig</i>,
          ville husholdningen kjøpt 65 000 av et matbudsjett på 79 000 på nett, og da hadde
          modellen sagt at nettkundene nesten ikke går i butikk. Det er den typen implikasjon
          som avslører en feil forutsetning — og du finner den bare ved å sjekke enheten mot
          totalen.</p>`,
        krav: [
          "Du regner ordrer per år som eget delresultat før du ganger med kurven.",
          "Du sjekker hva 30 000 kroner utgjør av husholdningens hele matbudsjett.",
          "Du tolker de 38 prosentene som et atferdsmønster, ikke bare som et tall.",
          "Du kobler frekvens og kurvstørrelse: store kurver sjeldnere, og forklarer hvorfor det henger sammen.",
          "Du sier enheten på svaret: kroner per netthandlende husholdning per år.",
        ],
        felle: "Å sjekke 30 000 kroner mot landsgjennomsnittet for dagligvare per husholdning på 87 000 og si «greit nok». Oslo-husholdninger er mindre — 1,9 mot 2,1 personer — og bruker derfor mindre. Riktig referanse er 79 000, ikke 87 000, og forskjellen på ti prosent er akkurat forskjellen i husholdningsstørrelse.",
      },
      {
        art: "regne",
        sek: 90,
        tittel: "Skalér opp til Oslo", kort: "Skalér opp",
        sp: `<p>Hvor stort er nettdagligvaremarkedet i Oslo, <b>i millioner kroner per år</b>?</p>`,
        svar: 910,
        enhet: "millioner kroner",
        toleranse: 0.15,
        fasit: `<div class="formula">
            <div class="eq">Netthandlende husholdninger: 380 000 × 8 % = 30 400</div>
            <div class="eq">Marked: 30 400 × 30 000 kr = 3,04 × 3 = 9,1, og 10⁴ × 10⁴ = 10⁸</div>
            <div class="eq">→ 9,1 × 10⁸ = <b>912 millioner ≈ 910 millioner kroner per år</b></div>
          </div>
          <p><b>Konverter til beslutningens enhet med én gang</b>, mens tallene er varme:</p>
          <div class="formula">
            <div class="eq">Ordrer i Oslo: 912 mill. / 1 250 kr = 730 000 ordrer per år</div>
            <div class="eq">Per uke: 730 000 / 52 = <b>14 000 ordrer per uke i hele Oslo</b></div>
            <div class="eq">Klientens andel: 14 000 × 25 % = <b>3 500 ordrer per uke</b></div>
          </div>
          <p><b>Og der har du svaret på beslutningen, foreløpig: 3 500 mot et nullpunkt på
          5 800.</b> Klienten er 40 prosent unna. Si det høyt med én gang — ikke vent til
          syntesen. Å levere delkonklusjonen i det øyeblikket den finnes, er kjernen i
          hypotesedrevet arbeid.</p>
          <p><b>Sanity-sjekk:</b> 14 000 ordrer i uka i Oslo er 2 000 om dagen. Med tretti
          varebiler som rekker tjue leveringer hver på en dag, er det 600 leveringer per bil-dag
          fordelt på... nei, regn den riktig vei: 2 000 leveringer om dagen delt på 20 leveringer
          per bil gir <b>100 varebiler i sving i Oslo hver dag</b> for hele bransjen samlet. Det
          er et tall du kan holde opp mot noe du har sett: hundre dagligvarebiler i Oslo-trafikken
          er mye, men ikke absurd — det er omtrent én per gate i indre by. Størrelsesordenen
          holder.</p>`,
        krav: [
          "Du regner antall netthandlende husholdninger som eget delresultat.",
          "Du konverterer til ordrer per uke med en gang, fordi det er beslutningens enhet.",
          "Du regner klientens egen andel ut, ikke bare markedets.",
          "Du sier delkonklusjonen — 3 500 mot 5 800 — i det øyeblikket den finnes.",
          "Du sanity-sjekker volumet mot noe fysisk, for eksempel antall varebiler i sving.",
        ],
        felle: "Å levere 910 millioner kroner og gå videre til kryssjekken. Kronetallet kan ikke sammenlignes med nullpunktet, som er i ordrer. Konverteringen tar ti sekunder nå og er tungvint senere — og uten den vet du fortsatt ikke om klienten skal bygge.",
      },
      {
        art: "regne",
        sek: 120,
        tittel: "Kryssjekken — regn det motsatt vei", kort: "Kryssjekk",
        sp: `<p>Regn nettdagligvaremarkedet i Oslo <b>topp-ned</b>, i millioner kroner per år.</p>
          <p class="tiny">Og si etterpå hva kryssjekken faktisk gir deg som bunn-opp ikke ga.</p>`,
        svar: 900,
        enhet: "millioner kroner",
        toleranse: 0.15,
        fasit: `<p>Topp-ned går fra det norske dagligvaremarkedet og ned:</p>
          <div class="formula">
            <div class="eq">Oslos andel av befolkningen: 0,73 / 5,6 = 13 prosent</div>
            <div class="eq">Oslos dagligvaremarked: 230 mrd × 13 % = 29,9 ≈ 30 milliarder</div>
            <div class="eq">Nettdelen: 30 mrd × 3 % = <b>900 millioner kroner per år</b></div>
          </div>
          <p><b>Bunn-opp ga 912 millioner. Topp-ned gir 900. Avviket er 1,3 prosent.</b></p>
          <p>Så nær enighet skal gjøre deg litt mistenksom, og et sterkt svar sier det høyt:
          <b>deler de to veiene en forutsetning?</b> Gå gjennom dem. Bunn-opp brukte 380 000
          husholdninger, 8 prosent penetrasjon, 24 ordrer og 1 250 kroner. Topp-ned brukte
          230 milliarder, 13 prosent befolkningsandel og 3 prosent nettandel. <i>Ikke ett tall
          går igjen.</i> Enigheten er ekte.</p>
          <p><b>Og her kommer det kryssjekken faktisk gir deg, som er langt mer enn en
          bekreftelse.</b> Legg de to ved siden av hverandre:</p>
          <div class="formula">
            <div class="eq">Topp-ned: nettandelen er <b>3 prosent</b> — ett tall</div>
            <div class="eq">Bunn-opp: 8 % av husholdningene × 38 % av deres matbudsjett = <b>3,0 prosent</b></div>
          </div>
          <p>De to veiene dekomponerer nøyaktig samme tre prosent på to ulike måter, og
          <b>bunn-opp forteller deg hvilken av de to faktorene som kan bevege seg.</b> Det er
          hele forskjellen på et tall og en modell. Skal nettandelen fra 3 til 7 prosent, må
          enten <i>flere husholdninger begynne</i> — 8 prosent til 18 prosent — eller <i>de som
          allerede handler på nett flytte mer av budsjettet dit</i> — 38 prosent til 88 prosent.
          Den siste er nesten umulig; ingen kjøper 88 prosent av maten sin på nett. <b>Veksten
          må altså komme fra nye husholdninger, ikke fra dypere penetrasjon hos dagens
          kunder.</b> Det er en prognose ingen av de to regnestykkene ga alene.</p>
          <p><b>Og så den ekte sanity-sjekken, den som kunne felt hele modellen:</b> Oslos
          dagligvaremarked på 30 milliarder fordelt på 380 000 husholdninger er 79 000 kroner
          per husholdning. Landssnittet er 230 mrd / 2,65 mill = <b>87 000 kroner</b>. Oslo
          ligger altså 9 prosent lavere. Er det riktig? Ja, og av en grunn som kan etterprøves:
          Oslo-husholdninger har 1,9 personer mot 2,1 i landet, altså <b>10 prosent færre
          munner</b>. <i>De to avvikene er 9 og 10 prosent — de forklarer hverandre.</i> Hadde
          Oslo kommet ut 30 prosent lavere, ville modellen hatt en feil et sted, og da hadde vi
          visst det nå i stedet for i møtet.</p>
          <p>Landingen: <b>rundt 900 millioner kroner, spenn 800 til 1 000 — og 3 500 ordrer per
          uke for klienten.</b></p>`,
        krav: [
          "Du regner topp-ned uten å bruke ett tall fra bunn-opp-kjeden.",
          "Du kontrollerer aktivt om de to veiene deler en forutsetning, i stedet for å ta enigheten for gitt.",
          "Du viser at bunn-opp dekomponerer de samme 3 prosentene i to faktorer.",
          "Du bruker dekomponeringen til å si hvilken faktor veksten må komme fra.",
          "Du sjekker Oslo mot landssnittet og forklarer avviket med husholdningsstørrelse.",
        ],
        felle: "Å juble over at de to veiene traff hverandre på én prosent. Nær enighet er like ofte et tegn på at to regnestykker deler en gjetning, som et tegn på at begge er riktige. Sjekk overlappen først — og hvis den ikke finnes, da har du grunn til å juble.",
      },
      {
        art: "syntese",
        sek: 120,
        tittel: "Beslutningen",
        sp: `<p>Klienten har <b>ett minutt</b>. De spurte ikke om markedsstørrelsen. De spurte om
          de skal bygge lageret. <b>Svar på det.</b></p>`,
        fasit: `<p>Her er hele forskjellen på en sizing-case og en ekte oppdragsleveranse:
          <b>første setning er en beslutning, ikke et tall.</b> Tallet kommer som begrunnelse.</p>
          <blockquote><p><b>«Ikke bygg lageret nå — men bind opp tomten, og bygg om omtrent to
          år. Dere har 3 500 nettordrer i uka i Oslo i dag. Lageret trenger 5 800 for å gå i
          null. Bygger dere nå, taper dere rundt 12 millioner kroner i året til volumet har tatt
          igjen.»</b></p>
          <p>Slik kom jeg dit: Oslo har 380 000 husholdninger, 8 prosent handler mat på nett, og
          de gjør 24 bestillinger i året til 1 250 kroner. Det gir et nettdagligvaremarked i Oslo
          på rundt 900 millioner kroner, eller 14 000 ordrer i uka. Med deres 25 prosent blir det
          3 500. Jeg har kryssjekket topp-ned fra dagligvaremarkedet på 230 milliarder og fikk
          900 millioner der også, uten å dele en eneste forutsetning — så volumtallet er trygt.</p>
          <p><b>Regnestykket for beslutningen er kort.</b> Lageret sparer 100 kroner per ordre og
          koster 30 millioner i året. Nullpunktet er 300 000 ordrer i året, altså 5 800 i uka.
          I dag: 3 500 ordrer i uka gir 18 millioner i besparelse mot 30 millioner i kostnad —
          <b>12 millioner i årlig tap</b>. Om tre år, når nettandelen går fra 3 til 7 prosent,
          er dere på 8 200 ordrer i uka: 43 millioner i besparelse mot 30 i kostnad, altså
          <b>13 millioner i årlig gevinst</b>. Krysningspunktet ligger på 5 800 ordrer, og med
          den vekstbanen treffer dere det etter <b>rundt tjue måneder</b>.</p>
          <p><b>Det er derfor svaret er «ikke nå, men snart» og ikke «nei».</b> Å bygge i dag
          koster dere rundt 11 millioner kroner samlet før volumet har tatt igjen — tapet er
          størst det første året og krymper mot null fram mot krysningen. Å vente for lenge koster
          13 millioner i året i tapt besparelse, pluss at plukking i butikk begynner å ødelegge
          butikkdriften ved høye volumer. Det er en tidfestet beslutning, ikke en
          ja-eller-nei-beslutning.</p>
          <p><b>Og til slutt det dere skal følge med på.</b> Ikke markedsstørrelsen — den er nå
          estimert og trenger ikke oppdateres. Følg <i>deres egne ordrer per uke</i>, og sett en
          utløser: <b>når dere passerer 5 000 i uka, start byggingen</b>, siden det tar et halvt
          år å få lageret i drift og 5 000 vokser til rundt 5 800 i løpet av den byggetiden —
          dere treffer altså nullpunktet omtrent når dørene åpner. Den ene
          forutsetningen jeg ville testet først, er at nettandelen deres er lik butikkandelen
          deres på 25 prosent. Er dere sterkere på nett enn i butikk, flytter hele tidslinjen seg
          nærmere — og det er det eneste tallet i analysen dere allerede har i egne
          systemer.»</p></blockquote>
          <p><b>Hva skiller dette fra et middels svar?</b> Et middels svar sier «markedet er
          900 millioner, og med 25 prosent andel har dere 3 500 ordrer i uka, som er under
          nullpunktet på 5 800, så ikke bygg». Det er riktig regnet og likevel halvferdig, fordi
          det behandler en investeringsbeslutning som et øyeblikksbilde. <b>Et sterkt svar
          tidfester den, kvantifiserer kostnaden ved å ta feil i begge retninger, og gir klienten
          en utløser de kan handle på uten å ringe deg igjen.</b></p>`,
        krav: [
          "Første setning er beslutningen — ikke bygg nå, bygg om to år — ikke markedstallet.",
          "Du oppgir tapet ved å bygge i dag og gevinsten ved å bygge om tre år, begge i kroner.",
          "Du tidfester krysningspunktet i stedet for å svare ja eller nei.",
          "Du gir klienten en utløser i deres egen enhet — ordrer per uke — og justerer den for byggetiden.",
          "Du navngir den ene forutsetningen som ville flyttet konklusjonen mest, og sier at klienten selv sitter på tallet.",
          "Du holder deg innenfor ett minutt.",
        ],
        felle: "Å svare «nei, markedet er for lite». Det er svaret på dagens volum, og lageret er en investering som lever i femten år. En beslutning som avhenger av et volum i vekst, har ikke et ja eller et nei som svar — den har et tidspunkt og en utløser.",
      },
    ],
  },
];
