/* ===================== CASEINTERVJU · QUIZ =====================
   Legges TIL quizzene i data.js, som eier q1–q4. Id-ene er lagringsnøkler
   og må aldri endres i ettertid.

   To regler som har vært brutt før i dette prosjektet, og som gjelder her:
   fasitposisjonen skal være jevnt fordelt, siden motoren ikke stokker
   alternativene — og ingen forklaring skal referere til en bokstav, for da
   blir den feil hvis rekkefølgen noen gang endres.
   =============================================================== */
window.EDU_DATA = window.EDU_DATA || {};
window.EDU_DATA.quizzes = (window.EDU_DATA.quizzes || []).concat([

  /* ---------- Del 0 · Grunnlaget ---------- */
  { id: "q10", ch: 0, oppg: 1, type: "mcq",
    q: "Du har fire uker til første intervju. Hva bør ha førsteprioritet?",
    options: [
      "Lese hele manualen grundig én gang, så du har oversikten",
      "Hoderegning hver dag i korte økter",
      "Se så mange mock-intervjuer som mulig",
      "Pugge bransjemarginer og markedstall",
    ],
    answer: 1,
    explanation: "Hoderegning er den eneste ferdigheten som blir målbart bedre av ren mengde, og den er nesten umulig å redde inne i rommet. Å lese manualen er det billigste og minst virksomme man kan gjøre — kurset er bygget rundt at lesing skal være under en femdel av tiden." },

  { id: "q11", ch: 0, oppg: 1, type: "mcq",
    q: "Hvorfor er fasiten låst til du har skrevet ditt eget svar?",
    options: [
      "For å måle hvor lang tid du bruker per trinn",
      "For å hindre at du hopper over vanskelige oppgaver",
      "Fordi en løsning du ikke har forsøkt på gir gjenkjennelse, ikke kunnskap",
      "Fordi fasitene er lange og tar tid å lese",
    ],
    answer: 2,
    explanation: "En løsning føles opplagt i det man leser den. Den følelsen er gjenkjennelse, og den forsvinner i rommet. Forsøket først er det eneste som skiller trening fra lesing." },

  { id: "q13", ch: 1, oppg: 1, type: "mcq",
    q: "Hvilken av disse er IKKE en av de fire tingene som vurderes?",
    options: [
      "Struktur", "Kvantitativt håndverk", "Bransjekunnskap", "Dømmekraft",
    ],
    answer: 2,
    explanation: "Bransjekunnskap er nyttig, men den vurderes ikke — intervjueren gir deg alle tallene du trenger. De fire er struktur, kvantitativt håndverk, dømmekraft og kommunikasjon. Å komme med bransjefakta utenfra kan til og med skade, hvis det erstatter resonnement." },

  { id: "q14", ch: 1, oppg: 1, type: "mcq",
    q: "Hvorfor har ferdige rammeverk blitt et negativt signal?",
    options: [
      "Fordi de tar for lang tid å tegne opp",
      "Fordi de er utdaterte og faglig feil",
      "Fordi husene har forbudt dem eksplisitt",
      "Fordi de viser at du behandler et konkret problem som en kategori",
    ],
    answer: 3,
    explanation: "Husene har brukt tjue år på å lære seg å se dem. Verken BCG eller Bain nevner ett eneste navngitt rammeverk på sine egne prep-sider — de beskriver en arbeidsmåte i stedet. Problemet er ikke at rammeverkene er faglig gale, men at de er generiske." },

  { id: "q15", ch: 2, oppg: 1, type: "mcq",
    q: "Hva kjennetegner BCGs screeningtest i Norden?",
    options: [
      "Logisk resonnement: 80 spørsmål på 30 minutter, uten kalkulator",
      "Casey-chatboten, som simulerer en hel case",
      "En spillbasert test med økosystembygging",
      "En skriftlig case på 55 minutter med tre slides",
    ],
    answer: 0,
    explanation: "Dette er verdt å ha rett, for det avgjør hva du trener på. BCG dokumenterer selv en logikktest på 80 spørsmål på 30 minutter — altså 22,5 sekunder per spørsmål. Det er ren hastighetsdrill, ikke casetrening. Casey brukes andre steder, og økosystemspillet er McKinseys og i praksis faset ut." },

  { id: "q16", ch: 2, oppg: 1, type: "mcq",
    q: "Hva vet vi sikkert om Arkwrights rekrutteringsprosess?",
    options: [
      "At den inneholder en beryktet numerisk test",
      "At den er interviewer-led, som hos McKinsey",
      "Lite — selskapet publiserer ingenting, og det som finnes er kandidatrapporter",
      "At den består av tre runder med gruppecase",
    ],
    answer: 2,
    explanation: "Arkwright publiserer ingen prosessbeskrivelse. Kandidatrapporter peker mot to runder med to caser i hver, candidate-led. Ryktet om en numerisk test lot seg ikke bekrefte fra noen åpen kilde — å trene mot en test som kanskje ikke finnes, er bortkastet tid. Ring rekrutteringen i stedet." },

  { id: "q17", ch: 2, oppg: 1, type: "mcq",
    q: "Hvilket hus er alene om å ikke ha en fast søknadsfrist på høsten?",
    options: [
      "McKinsey", "Bain", "Arkwright", "BCG",
    ],
    answer: 3,
    explanation: "BCG rekrutterer rullerende, mens McKinsey, Bain, Arkwright og de fleste andre har faste frister tidlig i høstsemesteret. Det gjør BCG til det ene stedet der «jeg søker litt senere» faktisk er et alternativ — men rullerende betyr også at plassene fylles fortløpende." },

  /* ---------- Del I · Struktur ---------- */
  { id: "q18", ch: 3, oppg: 1, type: "mcq",
    q: "Hvilken halvdel av MECE er den vanskelige, og hvorfor?",
    options: [
      "Begge er like vanskelige", "At antallet grener er riktig", "At grenene ikke overlapper, fordi overlapp er vanskelig å oppdage", "At grenene til sammen dekker alt, fordi det krever at du vet hva du ikke har tenkt på",
    ],
    answer: 3,
    explanation: "Overlapp kan du sjekke ved å lese treet ditt. Hull kan du ikke, for de er per definisjon det du ikke tenkte på. Den praktiske testen: «hvis alle grenene mine var uendret, kunne resultatet likevel ha falt?» Er svaret ja, mangler du en gren." },

  { id: "q19", ch: 3, oppg: 1, type: "mcq",
    q: "Du skal skjære et problem etter én akse. Hvilken velger du?",
    options: [
      "Den som er lettest å forklare",
      "Den du tror variasjonen er størst langs",
      "Den som gir flest grener",
      "Den bransjen vanligvis bruker",
    ],
    answer: 1,
    explanation: "Skjærer du etter noe der alle skivene oppfører seg likt, har du delt opp uten å lære noe. Aksen må dessuten være målbar og mulig å handle på — en inndeling som ikke peker mot et tiltak, gir en pen analyse og ingen anbefaling." },

  { id: "q20", ch: 3, oppg: 1, type: "mcq",
    q: "Hvilken av disse er IKKE en av de fem måtene å være MECE på?",
    options: [
      "Algebra", "Prosess", "Bransjestandard", "Segmentering",
    ],
    answer: 2,
    explanation: "De fem er algebra, prosess, konseptuelt, segmentering og motsatte ord. «Bransjestandard» er nettopp det motsatte — å hente et ferdig oppsett utenfra i stedet for å bygge et for dette problemet." },

  { id: "q21", ch: 3, oppg: 1, type: "mcq",
    q: "Prompten sier at besøkstallet har vært flatt. Hva bør du gjøre med den opplysningen?",
    options: [
      "Notere den og komme tilbake til den senere i casen",
      "Si høyt at volumleddet er utelukket, og bruke tiden på resten",
      "Be om tallene bak, siden «flatt» kan bety flere ting",
      "Bygge en egen gren for volum likevel, for å være MECE",
    ],
    answer: 1,
    explanation: "Å velge bort er selve poenget med å strukturere før man regner. En opplysning som eliminerer en hel gren er den mest verdifulle gaven prompten kan gi, og en struktur som ikke bruker den, kaster den. Å bygge grenen likevel er MECE på papiret og sløsing i praksis." },

  { id: "q22", ch: 4, oppg: 1, type: "mcq",
    q: "«Jeg starter på inntektssiden og går deretter til kostnadssiden.» Hva er dette?",
    options: [
      "En hypotese, siden den sier hvor du tror svaret ligger",
      "En rekkefølge — den kan ikke vise seg å være feil",
      "En oppsummering av strukturen",
      "En akseptabel hypotese hvis du legger til en begrunnelse",
    ],
    answer: 1,
    explanation: "En hypotese er en påstand om verden som kan vise seg gal. En rekkefølge sier bare hva du skal gjøre, og ingen data kan motbevise den. Testen er å spørre: hvilket tall ville fått meg til å ombestemme meg? Har spørsmålet ikke noe svar, er det ingen hypotese." },

  { id: "q23", ch: 4, oppg: 1, type: "mcq",
    q: "Hva skiller et A-svar fra et C-svar på samme strukturering?",
    options: [
      "A-svaret har flere grener enn C-svaret",
      "A-svaret bruker fagbegreper, C-svaret hverdagsspråk",
      "A-svaret bruker opplysningene i prompten og navngir en fallbar hypotese",
      "A-svaret er lengre og mer detaljert",
    ],
    answer: 2,
    explanation: "C-svaret er ofte MECE nok og rolig framført — det er ikke tull. Men det er ordrett det samme treet som ville passet en helt annen bransje, og det bruker ingen av opplysningene intervjueren nettopp ga fra seg. Flere grener gjør det verre, ikke bedre." },

  { id: "q24", ch: 4, oppg: 1, type: "mcq",
    q: "Omtrent hvor mye av en 25-minutters case bør gå til struktureringen?",
    options: [
      "Åtte til ti minutter", "Så lenge som nødvendig", "Under ett minutt", "Fire til fem minutter",
    ],
    answer: 3,
    explanation: "Whartons tidsbudsjett gir 2–3 minutter til oppsett, 4–5 til struktur, 8–10 til å bygge løsningen, 3–5 til matte og eksponat, og 2–3 til syntesen. Bruker du ti minutter på treet, rekker du ikke å bruke det til noe." },

  { id: "q25", ch: 5, oppg: 1, type: "mcq",
    q: "Hva spør en prisingscase egentlig om?",
    options: [
      "Hva produktet koster å lage, pluss en rimelig margin",
      "Hva konkurrentene tar for tilsvarende produkter",
      "Hva markedet vil tåle før volumet faller",
      "Hva kundens alternativ er, og hvor mye av verdien vi kan ta",
    ],
    answer: 3,
    explanation: "Kostnaden gir gulvet, aldri taket. Taket er verdien kunden får sammenlignet med sitt beste alternativ. Konkurrentprising er ett datapunkt om alternativet, ikke svaret i seg selv — og en case som besvares med kost pluss påslag, har mistet hele poenget." },

  { id: "q26", ch: 5, oppg: 1, type: "mcq",
    q: "I en oppkjøpscase: hva er målselskapet verdt for kjøperen?",
    options: [
      "Målselskapets egenverdi, pluss verdien av synergiene",
      "Målselskapets egenverdi, som er det markedet allerede priser",
      "Budprisen, siden det er den som faktisk betales",
      "Målselskapets egenverdi minus integrasjonskostnadene",
    ],
    answer: 0,
    explanation: "Skillet mellom egenverdi og verdi-for-oss er ofte hele casen. Synergiene tilhører kjøperen og er det eneste som kan forsvare en premie over børskurs. Integrasjonskostnader trekkes fra, men de er en justering — ikke definisjonen." },

  /* ---------- Del II · Tall ---------- */
  { id: "q27", ch: 6, oppg: 1, type: "mcq",
    q: "Omsetningen falt 15 prosent mens prisene steg 5 prosent. Hva skjedde med volumet?",
    options: [
      "Falt omtrent 10 prosent", "Falt omtrent 20 prosent",
      "Falt omtrent 19 prosent", "Kan ikke avgjøres uten flere tall",
    ],
    answer: 2,
    explanation: "Volumindeks = 0,85 / 1,05 = 0,81, altså et fall på omtrent 19 prosent. Å trekke prosentene fra hverandre gir 10 og er feil: prosentendringer multipliseres, de adderes ikke." },

  { id: "q28", ch: 6, oppg: 1, type: "mcq",
    q: "Hva er 12,5 prosent av 4 800?",
    options: [
      "480", "560", "620", "600",
    ],
    answer: 3,
    explanation: "12,5 prosent er en åttendedel, og 4 800 delt på 8 er 600. Brøktabellen er verdt å pugge nettopp fordi den gjør slike regnestykker til ett trinn: 1/6 er 16,7 prosent, 1/7 er 14,3, 1/8 er 12,5, 1/9 er 11,1." },

  { id: "q29", ch: 6, oppg: 1, type: "mcq",
    q: "Hvor lang tid tar det å doble seg ved 9 prosent årlig vekst?",
    options: [
      "Omtrent 8 år", "Omtrent 11 år", "Omtrent 6 år", "Omtrent 14 år",
    ],
    answer: 0,
    explanation: "72-regelen: 72 delt på vekstraten. 72 / 9 = 8 år. Regelen treffer godt mellom omtrent 4 og 15 prosent, og den virker begge veier — kjenner du doblingstiden, får du vekstraten." },

  { id: "q30", ch: 6, oppg: 1, type: "mcq",
    q: "Hva er den beste måten å regne 19 × 41 i hodet?",
    options: [
      "19 × 40 = 760, pluss 19",
      "20 × 40 = 800, deretter juster: pluss 20, minus 40, minus 1",
      "Rund begge opp til 20 × 41 og trekk fra 41",
      "Sett opp regnestykket i kolonner mentalt",
    ],
    answer: 1,
    explanation: "Kompenserende avrunding: rund én faktor opp og én ned, så blir feilen liten og lett å korrigere. 19 × 41 = (20 − 1)(40 + 1) = 800 + 20 − 40 − 1 = 779. De andre veiene virker også, men gir større mellomregninger å holde i hodet." },

  { id: "q31", ch: 6, oppg: 1, type: "mcq",
    q: "Hva er viktigst når du sier et regnestykke høyt?",
    options: [
      "At du kommer raskt fram til tallet",
      "At du oppgir framgangsmåten før svaret, og enheten sammen med det",
      "At du runder av til nærmeste hele tall",
      "At du gjentar tallene intervjueren ga deg",
    ],
    answer: 1,
    explanation: "Regner du stille og lander feil, har intervjueren ingenting å gi deg uttelling for. Sier du metoden først, ser de at tenkningen var riktig — og de fleste retter deg underveis. Manglende enhet er dessuten en av de billigste tapte poengene som finnes." },

  { id: "q32", ch: 7, oppg: 1, type: "mcq",
    q: "Hvor mange oppvaskmaskiner selges i Norge per år, omtrent?",
    options: [
      "Rundt 1,7 millioner", "Rundt 600 000", "Rundt 17 000", "Rundt 165 000",
    ],
    answer: 3,
    explanation: "Levetidstrikset: installert base delt på levetid. 2,65 millioner husholdninger med rundt 75 prosent dekning gir omtrent 2 millioner maskiner, og med 12 års levetid byttes rundt 165 000 i året. Et modent marked selger erstatninger, ikke nysalg." },

  { id: "q33", ch: 7, oppg: 1, type: "mcq",
    q: "Noe koster «én krone per nordmann per dag». Hvor stort er markedet?",
    options: [
      "Rundt 200 millioner i året", "Rundt 20 milliarder i året",
      "Rundt 560 millioner i året", "Rundt 2 milliarder i året",
    ],
    answer: 3,
    explanation: "5,6 millioner ganger 365 er omtrent 2,04 milliarder. Dette er trolig det mest brukbare norske ankeret som finnes — det oversetter en hverdagslig sum til en markedsstørrelse på ett sekund." },

  { id: "q34", ch: 7, oppg: 1, type: "mcq",
    q: "Du skal anslå antall barnehager i Norge. Hva er det beste utgangspunktet?",
    options: [
      "Antall kommuner ganget med et anslag per kommune",
      "Barnehagemarkedets omsetning delt på snittpris",
      "Antall barn i barnehagealder delt på snittstørrelsen",
      "Antall husholdninger med barn under skolealder",
    ],
    answer: 2,
    explanation: "Bygg fra gruppen tjenesten faktisk betjener. Kommuneveien er dårlig fordi kommunestørrelsen varierer enormt — Oslo og en øykommune er ikke to like enheter, og da bryter oppskaleringen sammen." },

  { id: "q35", ch: 8, oppg: 1, type: "mcq",
    q: "En graf viser at salget «har eksplodert». Hva sjekker du først?",
    options: [
      "Hvor y-aksen starter",
      "Om kilden er troverdig",
      "Om det er sesongvariasjon i tallene",
      "Hvilken enhet som brukes",
    ],
    answer: 0,
    explanation: "En avkuttet y-akse gjør en beskjeden økning til en rakett. Effekten er godt dokumentert, den forsvinner ikke med erfaring, og grafkompetanse beskytter ikke mot den — derfor er eneste motgift den mekaniske vanen å lese startverdien høyt før du sier noe om formen." },

  { id: "q36", ch: 8, oppg: 1, type: "mcq",
    q: "En stablet søyle viser samme total to år på rad. Hva er den vanligste feilen?",
    options: [
      "Å regne segmentene om til prosent",
      "Å konkludere at ingenting har endret seg",
      "Å sammenligne mot konkurrentene i stedet",
      "Å lese segmentene nedenfra og opp",
    ],
    answer: 1,
    explanation: "Flat total er nettopp fella: hele historien kan ligge i miksen. En kundebase som er identisk i antall, men der nye kunder er doblet og lojale er ned en tredjedel, er et selskap på tredemølle. Les totalen først, så miksen — det er miksen som bærer budskapet." },

  { id: "q37", ch: 8, oppg: 1, type: "mcq",
    q: "Hva bør du si først når du får et eksponat?",
    options: [
      "Den mest interessante detaljen du finner",
      "En systematisk gjennomgang av alle radene",
      "Et spørsmål om hvor tallene kommer fra",
      "Hva figuren måler, og hva aksene viser",
    ],
    answer: 3,
    explanation: "Åpningsrutinen er tittel, akser inkludert startverdi, enhet, og om serien er indeksert eller absolutt — før du kommenterer form. En rad-for-rad-opplesning er verdiløs: intervjueren kan lese. Det de vil vite er hva du ser." },

  /* ---------- Del III–V · Framføring, fit, håndverk ---------- */
  { id: "q38", ch: 9, oppg: 1, type: "mcq",
    q: "Intervjueren sier at du tar feil. Hva er det sterke svaret?",
    options: [
      "Holde på standpunktet, siden de ofte tester om du står støtt",
      "Skifte standpunkt raskt, så du ikke virker sta",
      "Avklare om det kom et nytt faktum, eller om påstanden din bare presses",
      "Be om å få gå tilbake til strukturen og begynne på nytt",
    ],
    answer: 2,
    explanation: "Skillet avgjør alt. Kom det ny informasjon, skal du oppdatere og si hva den endrer. Er det ren press-testing, skal du forsvare resonnementet rolig. Å kollapse umiddelbart og å nekte å lytte er to versjoner av samme feil: du behandler begge tilfellene likt." },

  { id: "q39", ch: 9, oppg: 1, type: "mcq",
    q: "Du oppdager at du regnet feil for to minutter siden. Hva gjør du?",
    options: [
      "Én anerkjennelse, si hva som blir riktig, og gå videre",
      "Beklag grundig, så intervjueren ser at du tar det alvorlig",
      "Fortsett, og rett det opp i syntesen hvis det fortsatt betyr noe",
      "Spør om du kan få begynne regnestykket på nytt",
    ],
    answer: 0,
    explanation: "Én anerkjennelse, ikke tre unnskyldninger. Å oppdage sin egen feil er et positivt signal — det viser at du sanity-sjekker. Det som skader, er å bruke tretti sekunder på å be om unnskyldning, eller å la et tall du vet er galt bli stående." },

  { id: "q40", ch: 10, oppg: 1, type: "mcq",
    q: "Hva er rekkefølgen i en sterk anbefaling?",
    options: [
      "Analysen, konklusjonen, forbeholdene",
      "Anbefaling, grunner, risiko, neste steg",
      "Konteksten, alternativene, valget",
      "Grunner, anbefaling, neste steg",
    ],
    answer: 1,
    explanation: "Svaret først, alltid. Klienten har vært med hele veien og trenger ikke gjenfortellingen. Risiko og neste steg til slutt er det som skiller «distinkt» fra «solid» — de viser at du vet hva du ikke vet." },

  { id: "q41", ch: 10, oppg: 1, type: "mcq",
    q: "Hva skiller en syntese fra en oppsummering?",
    options: [
      "Syntesen er kortere",
      "Syntesen gjentar tallene, oppsummeringen tolker dem",
      "Syntesen sier hva klienten skal gjøre; oppsummeringen sier hva du fant",
      "Det er to ord for det samme",
    ],
    answer: 2,
    explanation: "En oppsummering lister funnene i den rekkefølgen du gjorde dem. En syntese starter med hva klienten skal gjøre, og bruker funnene som begrunnelse. Lengden er ikke poenget — en kort oppsummering er fortsatt en oppsummering." },

  { id: "q42", ch: 11, oppg: 1, type: "mcq",
    q: "Hvor mange dimensjoner bør én fit-historie merkes med?",
    options: [
      "Så mange som den faktisk dekker",
      "Alltid nøyaktig én",
      "Minst tre, ellers er den for smal",
      "Høyst to",
    ],
    answer: 3,
    explanation: "Merker du alt, dekker du ingenting — og gjenbruk av samme historie på tvers av dimensjoner merkes fort i et dybdeintervju. Regelen er høyst to per historie, minst to historier per dimensjon, og minst fire ulike kontekster i porteføljen." },

  { id: "q43", ch: 11, oppg: 1, type: "mcq",
    q: "Hva er ex-intervjuernes egen diagnose av hvorfor fit-svar blir for tynne?",
    options: [
      "Kandidatene svarer HVA de gjorde, ikke HVORFOR",
      "Kandidatene velger for gamle historier",
      "Kandidatene snakker for lenge",
      "Kandidatene mangler lederverv",
    ],
    answer: 0,
    explanation: "Særlig på dimensjonen som handler om å overbevise noen: kandidater beskriver analysen sin i stedet for å vise at de forsto hvorfor motparten var uenig. Det er en menneske-test, ikke en problemløsningstest — og det er derfor «hvem var uenig, og hvorfor mente de det» er et eget felt i historieverktøyet." },

  { id: "q44", ch: 12, oppg: 1, type: "mcq",
    q: "Hva er byttetesten for «why this firm»?",
    options: [
      "Om svaret ditt fungerer like godt på et annet hus",
      "Om du kan bytte ut firmanavnet med ditt eget",
      "Om du klarer å si det på under ett minutt",
      "Om svaret ditt bytter mellom faglige og personlige grunner",
    ],
    answer: 0,
    explanation: "Fungerer «Why BCG» ordrett som «Why McKinsey», er det ikke et svar — det er en beskrivelse av bransjen. Den sterkeste enkeltmarkøren er å referere en faktisk, navngitt samtale med noen som jobber der." },

  { id: "q45", ch: 13, oppg: 1, type: "mcq",
    q: "Hva er det viktigste grepet i McKinseys Redrock-oppgave?",
    options: [
      "Å svare så raskt som mulig på alle deler",
      "Å bruke kalkulatoren aktivt fra start",
      "Å spare 10–15 minutter til mini-casene på slutten",
      "Å hoppe over datadelen og prioritere resonnementet",
    ],
    answer: 2,
    explanation: "Redrock er fire deler på 35 minutter, og kandidatrapporter peker samstemt på at mange bruker opp tiden i datasorteringen og aldri kommer skikkelig til mini-casene. Kalkulator finnes, men den er ikke flaskehalsen — tidsbudsjettet er." },

  { id: "q46", ch: 14, oppg: 1, type: "mcq",
    q: "Du står helt fast midt i casen. Hva er første trekk?",
    options: [
      "Be om et hint",
      "Si høyt hvor du er, og hva du har utelukket",
      "Begynne strukturen på nytt",
      "Gå videre til neste gren og komme tilbake",
    ],
    answer: 1,
    explanation: "Rekkefølgen er: si hvor du er, gå tilbake til målet, gå tilbake til identiteten, og be eventuelt om et tall. Å si hvor du står er ikke et nederlag — det gir intervjueren noe å hjelpe deg med, mens taushet gir dem ingenting å vurdere." },

  { id: "q47", ch: 15, oppg: 1, type: "mcq",
    q: "Faste kostnader er 200, pris 50 og variabel kostnad 30. Hva er nullpunktet?",
    options: [
      "4 enheter", "6,7 enheter", "40 enheter", "10 enheter",
    ],
    answer: 3,
    explanation: "Dekningsbidraget per enhet er 50 − 30 = 20, og 200 / 20 = 10 enheter. Å dele på prisen gir 4 og er den klassiske feilen: du deler alltid på dekningsbidraget, aldri på prisen." },

  /* ---------- kortsvar ---------- */
  { id: "q49", ch: 3, oppg: 1, type: "short",
    q: "Nevn de fem måtene å være MECE på, med ett eksempel hver.",
    model: [
      "Algebra — leddene i en ligning som til sammen er svaret: resultat = pris × volum − kostnader.",
      "Prosess — en sekvens med start, midt og slutt: mottak, slakting, filetering, pakking.",
      "Konseptuelt — kategorier du lager for akkurat dette problemet: sportslig, kommersielt, organisatorisk.",
      "Segmentering — skiver av samme populasjon: forretningsreisende, kurs og konferanse, fritid.",
      "Motsatte ord — et begrep og negasjonen: kunder med hjemmelading mot kunder uten.",
      "De tre første er de mest brukte; konseptuelt er den som lettest degenererer til malbruk.",
    ] },

  { id: "q50", ch: 4, oppg: 1, type: "short",
    q: "Hva må til for at en hypotese skal være falsifiserbar? Gi et eksempel på en som er det, og en som ikke er det.",
    model: [
      "Den må være en påstand om verden som et konkret tall kan motbevise.",
      "Ikke falsifiserbar: «Jeg vil se på kostnadssiden først.» Det er en rekkefølge — ingen data kan gjøre den gal.",
      "Falsifiserbar: «Jeg tror en variabel kostnad har vokst raskere enn inntekten, og at filmleie er den største kandidaten.»",
      "Testen: hvilket tall ville fått meg til å ombestemme meg? Har spørsmålet ikke noe svar, er det ingen hypotese.",
      "Sterke kandidater sier datauttrekket høyt: «Jeg vil se filmleie som andel av billettinntekt, for begge år.»",
    ] },

  { id: "q51", ch: 7, oppg: 1, type: "short",
    q: "Bygg et estimat for det norske markedet for hundefôr. Si forutsetningene høyt, og avslutt med en sanity-sjekk.",
    model: [
      "Start fra husholdninger: 2,65 millioner, med anslagsvis 15 prosent som har hund — omtrent 400 000 hunder.",
      "Forbruk: en middels hund spiser for grovt regnet 400–600 kroner i måneden, altså rundt 6 000 kroner i året.",
      "Marked: 400 000 × 6 000 ≈ 2,4 milliarder kroner.",
      "Sanity-sjekk mot noe kjent: dagligvaremarkedet er rundt 230 milliarder, så dette er omtrent én prosent av det. Rimelig for en tydelig, men smal varekategori.",
      "Si tydelig hvilket ledd som er mest usikkert — her hundeandelen — og hva du ville sjekket først.",
    ] },

  { id: "q52", ch: 10, oppg: 1, type: "short",
    q: "Skriv anbefalingen i kinocasen slik du ville sagt den på ett minutt.",
    model: [
      "Svaret først: distributørene har tatt fem prosentpoeng mer av hver billettkrone, og det koster 78 millioner i året — mer enn hele resultatfallet.",
      "Grunn 1: inntektene er ikke problemet, de vokste 160 millioner på tre år.",
      "Grunn 2: filmleie er den eneste kostnadsposten som har flyttet seg vesentlig, opp 132 millioner.",
      "Grunn 3: andre faste kostnader er allerede kuttet, så forbedringen der spises opp av satsøkningen.",
      "Handling: reforhandle med de to største distributørene, og vri programmeringen mot titler med lavere sats.",
      "Risiko og neste steg: forhandlingsmakten ligger hos distributørene. Regn på hvor mye av besøket som drives av de fem største titlene — det avgjør om dere har noe å forhandle med.",
    ] },

  { id: "q53", ch: 11, oppg: 1, type: "short",
    q: "Hvordan gjør du en studentopplevelse tung nok til en fit-historie?",
    model: [
      "Sett teller på alt som kan telles: «fra 4 til 11 medlemmer», ikke «det gikk bedre».",
      "Løft fram hva som sto på spill — hva ville skjedd hvis ingen gjorde noe?",
      "Finn mennesket som sa nei, og vis at du forsto hvorfor de mente det.",
      "Selg innflytelse uten autoritet: i et verv kan du ikke instruere noen, og det er nærmere konsulentarbeid enn et internship med sjef.",
      "Ha én «så derfor»-setning som sier hva historien viser om deg.",
      "Ikke unnskyld skalaen. En liten sak fortalt presist slår en stor sak fortalt vagt.",
    ] },

  { id: "q54", ch: 8, oppg: 1, type: "short",
    q: "Nevn minst fem av de ni fellene i caseeksponater.",
    model: [
      "Avkuttet y-akse som gjør en liten endring dramatisk.",
      "Indeksert serie lest som absolutte tall.",
      "Prosent av prosent — en andel ganget med feil grunnlag.",
      "Miksendring skjult bak en flat total.",
      "Korrelasjon presentert som årsak.",
      "Enhet gjemt i overskrift eller fotnote, typisk «tall i 1 000».",
      "Areal-illusjon i et Mekko-diagram, der bredde og høyde begge bærer informasjon.",
      "Betinget informasjon i spørsmålet som ikke gjelder hele figuren.",
    ] },

  { id: "q55", ch: 2, oppg: 1, type: "short",
    q: "Hvordan skiller du interviewer-led fra candidate-led i praksis, og hva endrer det i oppførselen din?",
    model: [
      "Interviewer-led (typisk McKinsey): de fører deg fra spørsmål til spørsmål. Din jobb er å svare skarpt på akkurat det som spørres om.",
      "Candidate-led (typisk Bain, BCG, Arkwright): du sier hva du vil se på og hvorfor, og driver casen fremover.",
      "Farligste feil hos interviewer-led: å vandre av gårde i egen retning.",
      "Farligste feil hos candidate-led: å vente på neste spørsmål.",
      "Det er legitimt å spørre: «Vil du at jeg driver casen fremover, eller foretrekker du å lede meg gjennom?»",
    ] },
]);
