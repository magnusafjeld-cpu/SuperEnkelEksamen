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

  /* ============================================================
     1 · MARKEDSINNGANG — Nordlys Lading inn i Sverige
     ============================================================ */
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

  /* ============================================================
     2 · M&A — Nordbake kjøper Sørbakst
     ============================================================ */
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

  /* ============================================================
     3 · PRISING — Trygg Sans mot kommunen
     ============================================================ */
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

  /* ============================================================
     4 · VEKST — Kontodata, veksten som ikke ble til omsetning
     ============================================================ */
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

  /* ============================================================
     5 · OPERATIONS — Nordfisk Slakteri
     ============================================================ */
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

  /* ============================================================
     6 · ESTIMERING — varmepumpemarkedet i Norge
     ============================================================ */
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


  /* ============================================================
     A1 · Bensinstasjoner i Norge — malen, i norsk utgave
     ============================================================ */
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

  /* ============================================================
     A2 · Frisørsalonger i Norge — kapasitet målt i klipp per stol
     ============================================================ */
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

  /* ============================================================
     A3 · Ladepunkter langs E6 Oslo–Trondheim — geografisk avgrenset
     ============================================================ */
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

  /* ============================================================
     A4 · Sykehussenger i Tyskland — kapasitet målt i liggedøgn
     ============================================================ */
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


  /* ============================================================
     B1 · KJØKKEN — levetidstrikset i sin reneste form
     ============================================================ */
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

  /* ============================================================
     B2 · BRILLER — segmentering på alder avgjør svaret
     ============================================================ */
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

  /* ============================================================
     B3 · LØNNSSYSTEM — B2B, nevneren er ansatte og bedrifter
     ============================================================ */
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

  /* ============================================================
     B4 · BREDBÅND — hele casen ligger i nevnervalget
     ============================================================ */
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


  /* ============================================================
     C1 · INFRASTRUKTUR — heisparken i Norge
     Bunn-opp er eneste farbare vei: det finnes ingen makrostørrelse over.
     ============================================================ */
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

  /* ============================================================
     C2 · B2B-TJENESTE — utsatt IT-drift til norske SMB-er
     Bygget fra én typisk kunde og antall kunder som finnes.
     ============================================================ */
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

  /* ============================================================
     C3 · NÅR VEIENE SPRIKER — bruktbilmarkedet i Norge
     Den ene veien teller noe den andre ikke gjør. Avviket er svaret.
     ============================================================ */
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

  /* ============================================================
     C4 · ESTIMATET SOM STEG I EN BESLUTNING — nettdagligvare i Oslo
     Klienten skal velge, og trenger et tall ingen har gitt dem.
     ============================================================ */
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
  }
];
