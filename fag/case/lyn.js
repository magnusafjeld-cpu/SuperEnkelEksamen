/* ===================== CASETRENING · LYNLÆRING =====================
   Rene data for minispillene i js/bundle-lyn.js. Ingen HTML-tagger —
   motoren escaper tekst, så symboler skrives som ren tekst.

   Vekten ligger på hoderegning, fordi det er den delen av caseintervjuet
   som er lettest å trene systematisk og oftest velter kandidater.
   =================================================================== */
window.EDU_DATA = window.EDU_DATA || {};
/* Object.assign, ikke tilordning: bankene ligger i egne filer (lyn-feil.js,
   lyn-graf.js, lyn-estimat.js), og da skal ikke lastrekkefølgen kunne slette
   noen av dem. */
window.EDU_DATA.lyn = Object.assign(window.EDU_DATA.lyn || {}, {

  /* ================= SANT ELLER USANT ================= */
  tf: [
    { s: "Et godt caseintervju starter med at du velger riktig rammeverk.", answer: false, why: "Det motsatte er nærmere sannheten. Å hente fram 3C eller Porter og tvinge casen inn i det er den vanligste grunnen til at ellers sterke kandidater ryker. Strukturen skal bygges for akkurat dette problemet, helst fra en identitet — resultat = inntekter minus kostnader — og ikke fra en huskeliste.", ch: 1 },
    { s: "Du bør si framgangsmåten høyt mens du regner, ikke bare oppgi svaret.", answer: true, why: "Intervjueren vurderer resonnementet, ikke bare tallet. Regner du stille og lander feil, har de ingenting å gi deg uttelling for. Regner du høyt og lander feil, ser de at metoden var riktig — og de fleste retter deg underveis.", ch: 3 },
    { s: "En struktur er MECE hvis grenene ikke overlapper.", answer: false, why: "Det er bare halve kravet. MECE er Mutually Exclusive OG Collectively Exhaustive: grenene skal verken overlappe eller etterlate hull. Den andre halvdelen er den vanskelige, for den krever at du oppdager hva du ikke har tenkt på.", ch: 2 },
    { s: "Når du har regnet ut et tall, bør du si hva det betyr for casen før du går videre.", answer: true, why: "Et tall uten tolkning er et halvferdig svar. «Filmleien er 50 prosent» er en avlesning. «Filmleien har tatt fem prosentpoeng mer av hver krone, og det alene koster mer enn hele resultatfallet» er en innsikt.", ch: 3 },
    { s: "Det er et dårlig tegn å be om et øyeblikk til å tenke.", answer: false, why: "Tvert imot — det forventes. Tretti sekunders stillhet før en gjennomtenkt struktur er langt bedre enn å begynne å snakke med en gang og rote seg bort. Si det eksplisitt: «Kan jeg få et halvminutt til å samle tankene?»", ch: 1 },
    { s: "I en markedsstørrelses-oppgave er det viktigste å treffe riktig tall.", answer: false, why: "Det finnes sjelden et fasitsvar, og intervjueren har ofte ikke ett. Det som vurderes er om nedbrytningen er forsvarlig, om forutsetningene sies høyt, og om du sanity-sjekker resultatet til slutt.", ch: 4 },
    { s: "Å oppgi enhet på svaret er en detalj som sjelden teller.", answer: false, why: "Det teller. «78» er ikke et svar; «78 millioner kroner i året» er. Manglende enhet er en av de vanligste tapte poengene, og den er gratis å unngå.", ch: 3 },
    { s: "Anbefalingen bør begynne med konklusjonen, ikke med analysen.", answer: true, why: "Topp-ned kommunikasjon er selve husstilen i bransjen. Svaret først, så de tre grunnene, så risiko og neste steg. Å gjenfortelle casen kronologisk før konklusjonen kommer, er å teste klientens tålmodighet.", ch: 6 },
    { s: "Fem prosentpoeng av 1 560 er det samme som fem prosent av 1 560.", answer: true, why: "Her er de like — begge er 78. Fella er en annen: fem prosentpoeng av grunnlaget (1 560) er noe helt annet enn fem prosent av selve kostnadsposten (780 gir 39). Prosent av feil grunnlag er den vanligste regnefeilen i caseintervjuer.", ch: 3 },
    { s: "Hvis intervjueren motsier deg, er det lurt å holde på standpunktet ditt.", answer: false, why: "Ikke ureflektert. De tester ofte om du kan ta inn ny informasjon. Det sterke svaret er å høre etter, si hva det endrer, og oppdatere konklusjonen hvis den bør endres — uten å kollapse hvis den ikke bør det.", ch: 6 },
  ],

  /* ================= HVA SKJER? (flervalg) ================= */
  shift: [
    { q: "Omsetningen faller 15 prosent mens prisene er satt opp 5 prosent. Hva har skjedd med volumet?", options: ["Falt omtrent 10 prosent", "Falt omtrent 19 prosent", "Falt omtrent 20 prosent", "Falt omtrent 15 prosent"], answer: 1, why: "Volumindeks = 0,85 / 1,05 = 0,8095, altså et fall på omtrent 19 prosent. Å trekke prosentene fra hverandre (15 − 5 = 10) er feil, fordi effektene multipliseres og ikke adderes.", ch: 3 },
    { q: "Du kutter prisen 3 prosent og vil holde bruttofortjenesten uendret. Hvor mye må volumet opp?", options: ["3,0 prosent", "3,1 prosent", "6,0 prosent", "Det avhenger av marginen"], answer: 3, why: "Det avhenger av marginen, og det er hele poenget. Et priskutt spiser rett inn i dekningsbidraget: jo tynnere margin, desto mer volum må til. Ved 30 prosent dekningsgrad krever et priskutt på 3 prosent omtrent 11 prosent mer volum.", ch: 3 },
    { q: "Et beløp vokser 6 prosent i året. Omtrent hvor lenge tar det å doble seg?", options: ["6 år", "12 år", "18 år", "24 år"], answer: 1, why: "72-regelen: 72 delt på vekstraten gir doblingstiden. 72 / 6 = 12 år. Samme regel baklengs gir vekstraten når du kjenner doblingstiden.", ch: 3 },
    { q: "Faste kostnader er 200, pris per enhet 50 og variabel kostnad per enhet 30. Hva er nullpunktet?", options: ["4 enheter", "6,7 enheter", "10 enheter", "40 enheter"], answer: 2, why: "Dekningsbidraget per enhet er 50 − 30 = 20. Nullpunktet er faste kostnader delt på dekningsbidrag: 200 / 20 = 10 enheter. Del alltid på dekningsbidraget, aldri på prisen.", ch: 3 },
    { q: "Et selskap har 12 prosent driftsmargin og 400 millioner i omsetning. Omsetningen vokser 25 prosent, marginen faller til 10 prosent. Hva skjer med driftsresultatet?", options: ["Det faller", "Det er uendret", "Det stiger", "Det avhenger av kostnadene"], answer: 2, why: "Før: 0,12 × 400 = 48. Etter: 0,10 × 500 = 50. Det stiger, om enn lite. Dette er trening i å motstå refleksen om at lavere margin alltid betyr dårligere — nivået avhenger av begge leddene.", ch: 3 },
    { q: "Hvilken av disse hører IKKE hjemme i en nedbrytning av et resultatfall?", options: ["Pris per enhet", "Volum solgt", "Konkurrentenes markedsandel", "Variabel kostnad per enhet"], answer: 2, why: "Konkurrentenes markedsandel er en mulig forklaring, ikke en komponent av resultatet. I selve treet hører bare det som resultatet består av. Konkurransen kommer inn som en årsak til at en av grenene har flyttet seg.", ch: 2 },
    { q: "Du skal anslå antall barnehager i Norge. Hva er det beste utgangspunktet?", options: ["Antall kommuner ganget med et anslag per kommune", "Antall barn i barnehagealder delt på snittstørrelsen", "Antall husholdninger med barn", "Barnehagemarkedets omsetning delt på pris"], answer: 1, why: "Bygg fra den befolkningsgruppen tjenesten faktisk betjener. Rundt 5,6 millioner innbyggere, omtrent 60 000 fødsler i året og fem årskull i barnehagealder gir cirka 300 000 barn; delt på 45 barn per barnehage lander du rundt 6 500. Kommunetallet er en dårligere vei, fordi kommunestørrelsen varierer enormt.", ch: 4 },
    { q: "En graf viser at salget «har eksplodert». Hva sjekker du først?", options: ["Om kilden er troverdig", "Hvor y-aksen starter", "Om det er sesongvariasjon", "Hva enheten er"], answer: 1, why: "En avkuttet y-akse gjør en beskjeden økning til en rakett. Effekten er godt dokumentert og forsvinner ikke med erfaring, så eneste motgift er den mekaniske vanen: les alltid y-aksens startverdi høyt før du kommenterer formen.", ch: 5 },
    { q: "Hva er 12,5 prosent av 4 800?", options: ["480", "600", "620", "560"], answer: 1, why: "12,5 prosent er en åttendedel. 4 800 / 8 = 600. Å kjenne brøkene bak de vanlige prosentene — 12,5 = 1/8, 16,7 = 1/6, 33,3 = 1/3 — sparer flere sekunder hver gang.", ch: 3 },
    { q: "Klienten sier målet er «å vokse». Hva gjør du?", options: ["Begynner å strukturere vekstalternativer", "Spør hva vekst betyr for dem, og innen når", "Antar omsetningsvekst og går videre", "Spør om budsjettet"], answer: 1, why: "«Vokse» kan bety omsetning, resultat, markedsandel eller verdi ved salg — og de peker mot ulike anbefalinger. Ett oppklarende spørsmål her sparer deg for å løse feil problem i tjue minutter.", ch: 1 },
  ],

  /* ================= OPP ELLER NED? ================= */
  updown: [
    { q: "Andelen av billettinntekten som går til filmdistributøren stiger. Hva skjer med kinoens driftsmargin?", dir: "ned", why: "Filmleie er en variabel kostnad regnet som prosent av billettinntekten. Stiger andelen, blir det mindre igjen av hver krone, uavhengig av hvor mange billetter som selges.", ch: 3 },
    { q: "Et selskap flytter kunder fra enkeltbilletter til månedsabonnement. Hva skjer med forutsigbarheten i inntekten?", dir: "opp", why: "Abonnement gir tilbakevendende inntekt som er lettere å prognostisere og som typisk verdsettes høyere per krone enn transaksjonsinntekt.", ch: 4 },
    { q: "Faste kostnader utgjør en større andel av kostnadsbasen. Hva skjer med resultatets følsomhet for volumendringer?", dir: "opp", why: "Høy andel faste kostnader gir høy operasjonell giring: hver ekstra solgt enhet bidrar med hele dekningsbidraget, og hver tapte enhet koster like mye. Resultatet svinger derfor kraftigere.", ch: 3 },
    { q: "Du forkorter tiden fra en film har premiere til den kommer på strømming. Hva skjer med kinobesøket?", dir: "ned", why: "Jo kortere kinovinduet er, desto lettere er det å vente. Dette er en av de reelle strukturelle endringene i bransjen, ikke bare en teoretisk mekanisme.", ch: 4 },
    { q: "En kandidat lister femten idéer uten å gruppere dem. Hva skjer med inntrykket av struktur?", dir: "ned", why: "Antall idéer er nesten aldri det som vurderes. Det som vurderes er om du sier oppdelingen først og sorterer mens du snakker. En usortert strøm leses som at du ikke har en tanke bak.", ch: 2 },
    { q: "Du sier hva som ville avkreftet hypotesen din. Hva skjer med troverdigheten?", dir: "opp", why: "Å navngi hva som ville vist at du tar feil, viser at du tenker som en analytiker og ikke som en selger. Det er også praktisk: det forteller intervjueren nøyaktig hvilke data du trenger.", ch: 2 },
    { q: "Prisen settes opp mens etterspørselen er svært elastisk. Hva skjer med samlet inntekt?", dir: "ned", why: "Ved elastisk etterspørsel faller volumet prosentvis mer enn prisen stiger, så inntekten går ned. Ved uelastisk etterspørsel er det motsatt — og derfor er elastisitet et av de få begrepene det lønner seg å ha klart.", ch: 3 },
    { q: "Et oppkjøp gir kostnadssynergier, men du bruker målselskapets egen kapitalkostnad på hele verdsettelsen. Hva skjer med treffsikkerheten?", dir: "ned", why: "Synergier tilhører kjøperen, ikke målselskapet alene. Verdien av målselskapet for oss er noe annet enn verdien i seg selv, og det skillet er ofte hele poenget i en oppkjøpscase.", ch: 4 },
    { q: "Du oppgir enhet og størrelsesorden på hvert svar. Hva skjer med antall poeng du taper på slurv?", dir: "ned", why: "Manglende enhet og en bortkommen tierpotens er de to hyppigste feilene i caseregning. Begge er gratis å unngå ved å si tallet fullstendig hver gang.", ch: 3 },
    { q: "Du gjenforteller hele casen kronologisk før du gir anbefalingen. Hva skjer med inntrykket?", dir: "ned", why: "Klienten har vært med hele veien. Topp-ned betyr at svaret kommer først; oppbyggingen er noe de kan be om hvis de vil ha den.", ch: 6 },
  ],

  /* ================= KJEDER ================= */
  chains: [
    { title: "Hvorfor et flatt besøkstall likevel gir resultatfall", ch: 3,
      steps: ["Besøket er flatt, så volumleddet kan utelukkes", "Da må endringen ligge i inntekt per besøkende eller i kostnad per besøkende", "Inntekten viser seg å ha vokst, så problemet er på kostnadssiden", "Filmleie er den største variable posten og har vokst raskere enn inntekten", "Regnet som andel har den gått fra 45 til 50 prosent av billettinntekten", "Fem prosentpoeng av billettinntekten forklarer mer enn hele resultatfallet"] },
    { title: "Slik bygges et markedsstørrelses-anslag nedenfra", ch: 4,
      steps: ["Velg befolkningsgruppen tjenesten faktisk betjener", "Del gruppen i segmenter som oppfører seg forskjellig", "Anslå andelen i hvert segment som kjøper", "Anslå kjøpsfrekvens per år", "Gang med gjennomsnittlig pris per kjøp", "Summer segmentene og sanity-sjekk mot et tall du kjenner"] },
    { title: "Rekkefølgen i en sterk anbefaling", ch: 6,
      steps: ["Si konklusjonen i første setning", "Gi tre grunner, hver med et tall fra casen", "Si hva klienten konkret skal gjøre", "Nevn den største risikoen ved rådet", "Si hva du ville undersøkt som neste steg"] },
    { title: "Slik åpner du en figur uten å rote deg bort", ch: 5,
      steps: ["Les tittelen og si hva figuren måler", "Les aksene, inkludert hvor y-aksen starter", "Sjekk enheten og om serien er indeksert eller absolutt", "Si hva som er den største enkeltobservasjonen", "Knytt observasjonen til hypotesen din", "Si hva den betyr for anbefalingen"] },
  ],

  /* ================= HODEREGNING =================
     Tiden er kalibrert per oppgave, ikke felles for banken. Grunnlaget er hva
     casene selv gir: 90 til 120 sekunder på et regnetrinn med to–fire ledd. Et
     ettrinns prosentanker skal gå på 15–20 sekunder; et nullpunkt med tre ledd
     får 40. Ett fast tall for alt gjorde de enkle for lette og de sammensatte
     urealistisk harde.

     Ingen oppgave krever et eksakt tall der en case ville tålt avrunding.
     Kapittel 6 lærer bort kompenserende avrunding — da kan ikke drillen straffe
     deg for å bruke den. */
  hode: [
    /* ---- ettrinns: ankere og oppslag, 15–20 sekunder ---- */
    { q: "1 prosent av 5,6 millioner nordmenn", sek: 15, correct: "56 000", distractors: ["5 600", "560 000", "56"],
      why: "Flytt kommaet to plasser: 5 600 000 / 100 = 56 000. Prosentankere fra 1 og 10 prosent er de to du bygger alle andre prosenter av." },
    { q: "Hva er 1/8 uttrykt i prosent?", sek: 15, correct: "12,5", distractors: ["8", "16,7", "11,1"],
      why: "1/8 = 12,5 prosent. Brøktabellen er verdt å pugge: 1/6 = 16,7, 1/7 = 14,3, 1/8 = 12,5, 1/9 = 11,1, 1/12 = 8,3." },
    { q: "Hva er 3/8 uttrykt i prosent?", sek: 15, correct: "37,5", distractors: ["30", "33,3", "35"],
      why: "1/8 er 12,5, så 3/8 er tre ganger det: 37,5 prosent. Å gange en kjent brøk er raskere enn å dele 3 på 8." },
    { q: "Doblingstid ved 9 prosent årlig vekst", sek: 15, correct: "8 år", distractors: ["6 år", "11 år", "14 år"],
      why: "72-regelen: 72 delt på vekstraten. 72 / 9 = 8 år. Regelen treffer godt mellom omtrent 4 og 15 prosent, og virker begge veier." },
    { q: "10 prosent av 2,65 millioner husholdninger", sek: 15, correct: "265 000", distractors: ["26 500", "2,65 millioner", "2 650 000"],
      why: "Ti prosent er å flytte kommaet én plass. Bygg alltid de andre prosentene fra 10 og 1 i stedet for å gange med desimaltall." },
    { q: "En krone per nordmann per dag, i året", sek: 20, correct: "2 milliarder", distractors: ["200 millioner", "20 milliarder", "560 millioner"],
      why: "5,6 millioner × 365 ≈ 2,04 milliarder. Det mest brukbare norske ankeret som finnes: koster noe «en kaffe i uka», er markedet noen milliarder." },
    { q: "18 prosent av 250", sek: 20, correct: "45", distractors: ["40", "50", "36"],
      why: "Rund opp og korriger: 20 prosent av 250 er 50, og du rundet omtrent 11 prosent for høyt, så svaret er cirka 45. Si begge deler høyt — det er selve teknikken." },

    /* ---- to ledd: 25–30 sekunder ---- */
    { q: "5 prosentpoeng av 1 560 millioner", sek: 25, correct: "78", distractors: ["39", "156", "7,8"],
      why: "0,05 × 1 560 = 78, altså halvparten av 156 som er ti prosent. Merk at 39 er svaret på et annet spørsmål — fem prosent av 780." },
    { q: "12 millioner × 130 kroner", sek: 25, correct: "1 560 millioner", distractors: ["156 millioner", "15,6 milliarder", "1 560 milliarder"],
      why: "12 × 13 = 156, så fest nullene tilbake: 1,56 milliarder = 1 560 millioner. Regn med sifrene først og tierpotensen for seg." },
    { q: "En kjede har 19 butikker som omsetter for 41 millioner hver. Omtrent hvor stor er omsetningen?", sek: 25,
      correct: "cirka 780 millioner", distractors: ["cirka 600 millioner", "cirka 1,2 milliarder", "cirka 240 millioner"],
      why: "Kompenserende avrunding: 20 × 40 = 800, og siden du rundet én opp og én ned, ligger svaret litt under. «Cirka 780» er godt nok — i en case sier du 800 og går videre. Ingen ber deg om 779." },
    { q: "Marginen gikk fra 8 til 10 prosent. Hvor mange prosent økte den?", sek: 25, correct: "25 prosent", distractors: ["2 prosent", "20 prosent", "12,5 prosent"],
      why: "2 prosentpoeng på et grunnlag av 8 er 2/8 = 25 prosent relativ vekst. Å svare 2 er å forveksle prosentpoeng med prosent — den vanligste feilen i caseregning." },
    { q: "2,9 millioner personbiler, snittlevetid 17 år. Nybilsalg per år?", sek: 25, correct: "cirka 170 000", distractors: ["cirka 17 000", "cirka 1,7 millioner", "cirka 500 000"],
      why: "Installert base delt på levetid. 17 × 17 = 289, så 2,9 / 17 ≈ 0,17, og tierpotensen gir 170 000. Her holder det å treffe størrelsesorden." },
    { q: "648 / 1 440, som prosent", sek: 30, correct: "45", distractors: ["40", "50", "44"],
      why: "1 440 delt på 10 er 144, og 648 / 144 = 4,5. Altså 45 prosent. Å dele opp i tiendedeler først gjør brøken håndterbar." },
    { q: "Driftsmargin når resultatet er 78 og omsetningen 2 200", sek: 30, correct: "3,5 prosent", distractors: ["2,8 prosent", "3,9 prosent", "28 prosent"],
      why: "Ti prosent av 2 200 er 220, så 78 er litt over en tredjedel av det: omtrent 3,5 prosent. Å gå via ti prosent er raskere enn å dele direkte." },
    { q: "Prisen falt 20 prosent, til 1 200 kroner. Hva var den før?", sek: 30, correct: "1 500 kroner", distractors: ["1 440 kroner", "1 400 kroner", "1 250 kroner"],
      why: "Del på 0,8, ikke gang med 1,2. 1 200 / 0,8 = 1 500. Feilsvaret 1 440 er nettopp fella: å legge 20 prosent til det nye tallet i stedet for å reversere." },

    /* ---- flere ledd: 40–45 sekunder, som casene selv gir ---- */
    { q: "Nullpunkt ved faste kostnader 200, pris 50, variabel kostnad 30", sek: 40, correct: "10", distractors: ["4", "6,7", "20"],
      why: "Dekningsbidrag per enhet = 50 − 30 = 20. Nullpunkt = 200 / 20 = 10 enheter. Del på dekningsbidraget, aldri på prisen — 4 er svaret du får hvis du deler på prisen." },
    { q: "Omsetning ned 15 prosent, pris opp 5 prosent — endring i volum", sek: 40, correct: "ned 19 prosent", distractors: ["ned 10 prosent", "ned 20 prosent", "ned 15 prosent"],
      why: "0,85 / 1,05 = 0,81, altså ned omtrent 19 prosent. Prosentendringer multipliseres; de kan ikke trekkes fra hverandre. Svaret 10 er nettopp den subtraksjonen." },
    { q: "Faste kostnader 36 millioner, dekningsbidrag 2,40 kroner per enhet. Nullpunkt i volum?", sek: 45,
      correct: "15 millioner enheter", distractors: ["86 millioner enheter", "1,5 millioner enheter", "150 millioner enheter"],
      why: "36 / 2,4 = 15. Regn det som 36 / 24 = 1,5 og flytt tierpotensen, i stedet for å slite med desimalen. Dette er nøyaktig regnetrinnet i ladecasen." },
    { q: "2,65 millioner husholdninger × 400 kroner i måneden × 12", sek: 45, correct: "12,7 milliarder", distractors: ["1,27 milliarder", "127 milliarder", "10,6 milliarder"],
      why: "400 × 12 = 4 800 per husholdning i året. Så 2,65 × 4,8 = 12,72, og fest på milliardene. Gjør årsbeløpet ferdig før du ganger med antallet." },
    { q: "Et selskap har 12 prosent margin på 400 millioner. Omsetningen vokser 25 prosent, marginen faller til 10. Nytt driftsresultat?", sek: 45,
      correct: "50 millioner", distractors: ["48 millioner", "40 millioner", "60 millioner"],
      why: "Før: 0,12 × 400 = 48. Etter: 0,10 × 500 = 50. Det stiger, om enn lite — trening i å motstå refleksen om at lavere margin alltid betyr dårligere." },
  ],
});
