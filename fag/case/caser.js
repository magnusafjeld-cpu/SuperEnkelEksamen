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
        tittel: "Regn markedet",
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
  }
];
