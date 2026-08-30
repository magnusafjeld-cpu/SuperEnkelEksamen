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
];
