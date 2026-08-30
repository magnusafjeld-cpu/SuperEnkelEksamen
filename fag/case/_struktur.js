/* ===================== CASETRENING · STRUKTURERINGSDRILL =====================
   Prompt inn, struktur ut. Grenene er klientens egne drivere, ikke en temaliste
   — bygget fra en identitet eller en verdikjede, slik at strukturen er MECE av
   konstruksjon. Hypotesen skal kunne avkreftes av et konkret datauttrekk.

   Ingen HTML-tagger — motoren escaper tekst, så alt skrives som ren tekst.
   ============================================================================ */
window.EDU_DATA = window.EDU_DATA || {};
window.EDU_DATA._struktur = [

  /* ================= LØNNSOMHET ================= */

  { prompt: "Klienten er en norsk dagligvarekjede med 320 butikker i tre formater: nærbutikk, supermarked og lavpris. Driftsmarginen har falt fra 3,4 til 2,1 prosent på to år, mens omsetningen har vokst nominelt. Konsernsjefen vil vite hvor marginen har blitt av, og hva som skal gjøres.",
    grener: [
      "Bruttomargin per varekategori — ferskvare, kolonial, frukt og grønt, non-food — og hvor mye hver kategori har flyttet på seg i andel av kurven",
      "Andel egne merkevarer mot leverandørmerker i hver kategori, siden egne merkevarer bærer flere marginpoeng",
      "Kampanjeandel: hvor stor del av omsetningen som selges på tilbud, og realisert pris etter kampanje mot listepris",
      "Kurvmekanikk per format: kundetrafikk, kurvstørrelse i kroner, varelinjer per kurv",
      "Svinn og nedskrivning, som treffer ferskvare langt hardere enn tørrvare",
      "Lønnstimer per åpningstime og per omsatt krone, splittet på kasse, varepåfylling og ferskvaredisk",
      "Faste kostnader per butikk: husleie eller omsetningsleie, energi, distribusjon fra grossistlager"
    ],
    hypotese: "Marginfallet ligger i ferskvare og ikke i prisbildet: økt svinn og en større kampanjeandel har senket realisert bruttomargin i nettopp de kategoriene som vokser i andel. Testen er bruttomargin per kategori mot i fjor, holdt opp mot kategorienes andel av kurven.",
    felle: "Å regne på kjedens totale bruttomargin. Både pris og innkjøp kan være uendret i hver enkelt kategori mens totalen faller, fordi vekten har flyttet seg — miks-effekten er usynlig i snittet.",
    sek: 90 },

  { prompt: "Klienten er et norsk oppdrettsselskap med 28 konsesjoner i Trøndelag og Nordland. EBIT per kilo har falt fra 21 til 9 kroner på ett år, mens to sammenliknbare konkurrenter har holdt seg over 18. Styret vil vite om dette er markedet eller dem selv.",
    grener: [
      "Realisert pris per kilo: kontraktsandel mot spot, og hvordan kontraktene ble priset i forhold til spotåret",
      "Kvalitetsmiks: andel superior mot ordinær og produksjonsfisk, siden nedgradering slår rett inn i realisert pris",
      "Fôrkostnad per kilo, dekomponert i fôrpris og fôrfaktor — det er fôrfaktoren som er selskapets egen",
      "Biologi: dødelighet gjennom generasjonen, tilvekst og sjøtid, og kostnaden ved lusebehandling",
      "Faste kostnader per kilo: slaktevolum mot kapasitet i slakteri og brønnbåt, og utnyttelse av tillatt biomasse",
      "Slakting, frakt og salgskostnad per kilo ut til kunde"
    ],
    hypotese: "Fallet er biologisk og ikke kommersielt: økt dødelighet og flere behandlinger har hevet fôrfaktoren og senket superior-andelen, slik at både kostnad og pris per kilo forverres samtidig. Testen er kostnad per kilo og dødelighet per lokalitet og generasjon, mot bransjesnittet.",
    felle: "Å forklare fallet med laksepris. Alle aktørene selger i samme marked, så en pris som er lik for alle kan ikke forklare at klienten faller og konkurrentene ikke gjør det.",
    sek: 120 },

  { prompt: "Klienten driver 14 fly på det norske kortbanenettet. Halvparten av rutene er statlig kjøpte anbudsruter, resten er kommersielle. Selskapet gikk fra overskudd til å tape 180 millioner i fjor, og eierne vil vite hvilke ruter som skal bort.",
    grener: [
      "Dekningsbidrag per rute: billettinntekt minus de kostnadene som faktisk forsvinner hvis ruten legges ned",
      "Yield per passasjer og kabinfaktor per rute, splittet på forretningsreisende og fritidsreisende",
      "Flyutnyttelse: blokktimer per fly per dag, som avgjør hvor mange ruter de faste kapitalkostnadene fordeles på",
      "Drivstoff og vedlikehold per blokktime, og hvordan de skiller seg mellom kort og lang etappe",
      "Bemanning: crew-baser, hviletidsregler og hvor mange sett besetning rutetabellen krever",
      "Kontraktsøkonomi på anbudsrutene: vederlag, hvem som bærer passasjerrisikoen, og når kontrakten løper ut"
    ],
    hypotese: "Tapet er konsentrert i de kommersielle rutene der kabinfaktoren ligger under nivået som dekker variable kostnader, mens anbudsrutene dekker sitt. Testen er dekningsbidrag per rute rangert stigende, sammenholdt med hvilke faste kostnader som blir liggende igjen.",
    felle: "Å kutte rutene med lavest fullfordelt margin. Flyene, basene og administrasjonen blir igjen, så de faste kostnadene flytter bare over på de gjenværende rutene og gjør flere av dem ulønnsomme.",
    sek: 90 },

  { prompt: "Klienten er en nordisk treningskjede med 190 sentre. Medlemstallet har vokst fire prosent i året, men resultatet per senter har falt tre år på rad. Daglig leder tror prisene er for lave og vil ha en prisøkning.",
    grener: [
      "Medlemsbestand som bevegelse: brutto innmeldinger minus utmeldinger per måned, ikke nettotallet",
      "Churn per kohort og per medlemstype, og hvor i medlemsforholdet folk faller fra — første kvartal eller etter bindingstiden",
      "Snittinntekt per medlem: grunnpris, tilleggsprodukter, og hvor stor andel som ligger på gamle billige avtaler",
      "Bruksmønster: besøk per medlem per uke og belegg i rushtiden, siden fulle sentre driver churn hos akkurat de medlemmene som betaler mest",
      "Anskaffelseskostnad per nytt medlem, målt mot forventet levetidsverdi",
      "Kostnad per senter: husleie per kvadratmeter, instruktørtimer, resepsjonsbemanning og vedlikehold av utstyr"
    ],
    hypotese: "Problemet er retensjon og ikke pris: churn har steget i de sentrene som har passert kapasitetstaket mellom 16 og 19, slik at kjeden betaler for å verve inn igjen de medlemmene den nettopp mistet. Testen er churn per senter holdt opp mot belegg i rushtiden.",
    felle: "Å lese medlemsvekst som inntektsvekst. Med høy churn kan bestanden vokse mens gjennomsnittlig medlemslevetid faller, og da synker inntekten per vervet krone selv om medlemstallet peker oppover.",
    sek: 90 },

  { prompt: "Klienten er en norsk byggevarekjede med 60 varehus som selger både til håndverksbedrifter og til privatpersoner. Omsetningen er flat, men dekningsgraden har falt 2,3 prosentpoeng på halvannet år. Ledelsen mistenker at selgerne gir for mye rabatt til proffkundene.",
    grener: [
      "Omsetning og dekningsbidrag delt på de to kundetypene: proffkunde på avtale og kredittkonto, mot privatkunde i butikk",
      "Realisert rabatt per proffavtale mot avtalt rabattmatrise — gis det mer enn kontrakten sier",
      "Sortimentsmiks per kundetype: trelast og konstruksjon har helt andre marginer enn interiør og verktøy",
      "Ordremekanikk: antall ordrer, ordreverdi og leveringsandel, siden levering til byggeplass er en kostnad kjeden ofte gir bort",
      "Innkjøpssiden: trelastpriser som svinger, og hvor raskt prisendringer sendes videre i hver av de to kanalene",
      "Varehuskostnad: lager og ukurant vare, transportbiler, bemanning i drive-in mot butikk"
    ],
    hypotese: "Dekningsgraden faller på grunn av miks og ikke rabatt: privatsalget med høy margin har falt med boligmarkedet mens proffvolumet står, slik at snittmarginen synker uten at én eneste pris er endret. Testen er dekningsgrad per kundetype over tid — er begge flate, er hele fallet miks.",
    felle: "Å behandle en fallende snittmargin som et prisproblem. Strammer man rabattene til proff mens det er privatvolumet som er borte, kutter man i den kanalen som fortsatt leverer, og problemet blir større.",
    sek: 90 },

  { prompt: "Klienten er en norsk hotellkjede med 40 hoteller, halvparten i by og halvparten i distrikt. Beleggsprosenten er tilbake på nivået før pandemien, men driftsresultatet ligger 30 prosent lavere. Eieren spør hvorfor fulle hoteller ikke gir penger.",
    grener: [
      "RevPAR splittet i sine to ledd: belegg og snittpris per solgte rom, per hotell og per ukedag",
      "Segmentmiks: forretningsreisende midtuke, kurs og konferanse, gruppe og turoperatør, og fritid i helgen — helt ulik pris og ulik forutsigbarhet",
      "Kanalmiks: andel direkte booking mot bookingportaler, og netto snittpris etter provisjon",
      "Mat og drikke per gjestedøgn, med dekningsbidraget på frokost, restaurant og møtemat hver for seg",
      "Lønnstimer per solgte rom i renhold og resepsjon, og hvor mye av bemanningen som er innleid",
      "Faste kostnader: husleie eller omsetningsleie, energi og vedlikehold per tilgjengelig rom"
    ],
    hypotese: "Fallet er kanaldrevet: listeprisen står, men andelen som bookes via portaler har steget, slik at netto snittpris etter provisjon har falt selv med fullt hus. Testen er netto snittpris per kanal over tre år, mot listepris i samme periode.",
    felle: "Å bruke belegg som suksessmål. Et hotell kan alltid fylles ved å senke prisen, og hvert ekstra rom koster renhold og frokost — det er netto snittpris og RevPAR som avgjør, ikke hvor mange nøkler som er ute.",
    sek: 90 },

  { prompt: "Klienten er en norsk regionsparebank med 60 milliarder i utlån. Egenkapitalavkastningen har falt fra 12 til 7,5 prosent på to år, i en periode der styringsrenten har vært stabil. Styret vil vite hva som har skjedd, og hva de kan gjøre med det.",
    grener: [
      "Rentenetto brutt ned i utlånsvolum og rentemargin, per portefølje: bolig i personmarkedet mot bedriftsmarkedet",
      "Utlånsrenten og fundingrenten hver for seg — marginen er en differanse, og de to sidene kan bevege seg ulikt",
      "Fundingmiks: innskuddsdekning, obligasjoner med fortrinnsrett og seniorgjeld, og påslaget banken faktisk betaler",
      "Provisjonsinntekter: betalingsformidling, forsikring, eiendomsmegling og fondssalg per kunde",
      "Tapsavsetninger og misligholdte engasjementer, fordelt på bransje og på lånestørrelse",
      "Kostnad i forhold til inntekt: bemanning, filialnett og IT-avtaler, målt mot sammenliknbare banker"
    ],
    hypotese: "Fallet ligger på fundingsiden og ikke i utlånsprisen: innskuddsdekningen har falt fordi kundene har flyttet penger til høyrentekonto og fond, slik at en større del av utlånene finansieres dyrere i markedet. Testen er utlånsrente og fundingrente hver for seg over 24 måneder, ikke marginen som ett tall.",
    felle: "Å bygge et vanlig pris ganger volum-tre. En bank har ingen enhetspris og ingen varekostnad — inntekten er en rentedifferanse, og resultatet avgjøres like mye av tap og av kostnad i forhold til inntekt som av volumet.",
    sek: 120 },

  { prompt: "Klienten er en privat tannhelsekjede med 45 klinikker og 210 behandlingsstoler. Omsetningen per behandler har steget, men resultatet er svakere enn i fjor. Eieren, et oppkjøpsfond, vil vite hvor lekkasjen er.",
    grener: [
      "Kapasitetsidentiteten: stoler ganger åpne timer ganger utnyttelsesgrad ganger pris per behandlet time",
      "Hull i timeboka: uteblivelser, sene avbestillinger og tid som ikke fylles, per klinikk og per ukedag",
      "Behandlingsmiks: undersøkelse og hygienist mot protetikk og implantat, som har helt ulikt dekningsbidrag per stoltime",
      "Behandlerlønn, som i stor grad er en prosent av egen omsetning og dermed variabel — ikke fast",
      "Materiell og teknikerkostnad per behandlingstype, særlig kjøpt tannteknisk arbeid",
      "Faste klinikkostnader: husleie, utstyrsleasing og resepsjon per stol"
    ],
    hypotese: "Lekkasjen er stolutnyttelse og ikke pris: omsetningen per behandler stiger fordi behandlerne jobber mer, mens stolene står tomme deler av dagen og bærer full leie og leasing uansett. Testen er dekningsbidrag per stoltime per klinikk, ikke omsetning per behandler.",
    felle: "Å måle på behandler når det er stolen som er den knappe ressursen. Og å anta at en prisøkning går rett på bunnlinjen — når behandleren har prosentlønn, deles påslaget umiddelbart.",
    sek: 90 },

  /* ================= MARKEDSINNGANG ================= */

  { prompt: "Klienten er en europeisk lavpriskjede innen dagligvare med 4 000 butikker og en hardt drevet kostnadsmodell. De vurderer å etablere seg i Norge, der tre kjeder kontrollerer nesten hele markedet. Spørsmålet til deg er om de skal gå inn, og i så fall hvordan.",
    grener: [
      "Prisgapet som faktisk kan skapes: hvor stor del av en norsk handlekurv er importvarer, og hvor stor del er beskyttet av tollvern på kjøtt, meieri og korn",
      "Kostnadsmodellen oversatt til norske forhold: lønnsnivå per butikktime, husleie, og transportavstand i et langstrakt land",
      "Tilgang til fysiske flater: regulering, tomteeierskap og hvor mange lokasjoner som allerede er bundet av de tre etablerte",
      "Forsyningskjeden: eget grossistledd eller kjøp fra en norsk leverandørstruktur der forhandlingsmakten er samlet på få hender",
      "Enhetsøkonomi per butikk: omsetning ganger bruttomargin mot lønn, leie og distribusjon — og hvor mange butikker som trengs før distribusjonen bærer seg",
      "Konkurrentrespons: de etablerte kan matche pris i akkurat de kommunene du åpner, uten å røre prisen nasjonalt",
      "Inngangsform: egen utrulling, kjøp av en eksisterende kjede, eller ingenting"
    ],
    hypotese: "Etterspørselen finnes, men kostnadsfordelen lar seg ikke importere: tollvern og norsk lønnsnivå spiser prisgapet før første butikk åpner, og uten et synlig prisgap har lavprismodellen ingen inngang. Testen er en prissammenlikning på en identisk kurv der importandelen er kjent.",
    felle: "Å regne markedet ovenfra og gange med en antatt andel. I Norge er tomter og regulering den bindende beskrankningen, ikke etterspørselen — strukturen må starte med hvor butikkene fysisk kan stå.",
    sek: 120 },

  { prompt: "Klienten er en nordisk operatør av hurtigladere for elbil med 900 ladepunkter hjemme. De vurderer å gå inn i Polen, der elbilandelen er lav, men vokser raskt. Ledelsen vil vite om markedet er verdt det, og hvordan de eventuelt kommer inn.",
    grener: [
      "Etterspørselen definert riktig: ikke antall elbiler, men antall elbiler uten tilgang til hjemmelading, pluss langturtrafikk gjennom korridorene",
      "Enhetsøkonomien per ladepunkt: kilowattimer solgt per punkt per dag ganger marginen per kilowattime, mot tomteleie og drift",
      "Marginen per kilowattime dekomponert: utsalgspris minus kraftinnkjøp minus nettleie, der effekttariffen straffer nettopp korte og kraftige uttak",
      "Lokasjonstilgang: hvem har allerede eksklusivavtaler med bensinkjeder, kjøpesentre og veiserviceanlegg langs hovedveiene",
      "Nettilknytning: ledetid og anleggsbidrag fra nettselskapet, som i praksis er den bindende beskrankningen på utrullingstakt",
      "Inngangsform: egen utbygging, kjøp av en lokal aktør med lokasjonsportefølje, eller drift på vegne av en bensinkjede"
    ],
    hypotese: "Markedet er attraktivt, men ikke inngangsbart organisk: de lokasjonene som gir høy utnyttelse er allerede bundet, så eneste realistiske vei inn er oppkjøp eller et lokasjonspartnerskap. Testen er å kartlegge de 200 mest trafikkerte lokasjonene og telle hvor mange som er bundet i eksklusivavtale.",
    felle: "Å bruke elbilandelen som markedsstørrelse. Kunden er bilisten uten hjemmelading eller på langtur — brukes hele elbilparken som nevner, får du et marked som er flere ganger for stort og en utnyttelsesgrad som aldri inntreffer.",
    sek: 120 },

  { prompt: "Klienten er en stor internasjonal strømmetjeneste som vurderer full lansering i Norden med eget lokalprodusert innhold. De har i dag en liten abonnentbase som kom av seg selv, uten markedsføring. Spørsmålet er om de skal investere for alvor, og med hvilken modell.",
    grener: [
      "Abonnentpotensialet bygget nedenfra: husholdninger ganger andel som allerede har minst to tjenester ganger vår andel av det neste valget",
      "Betalingsvilje som allerede er bundet: hvor mange abonnementer en nordisk husholdning har plass til, og hvilken tjeneste vi eventuelt fortrenger",
      "Innholdsøkonomi: kostnaden ved lokal produksjon er tilnærmet fast per marked, og skal bæres av et lite befolkningsgrunnlag",
      "Det som faktisk er lokalt uerstattelig: sportsrettigheter og allmennkringkasternes gratistilbud, som setter taket for hva folk vil betale for resten",
      "Distribusjon: eget abonnement, pakking gjennom teleoperatørene, eller lisensiering av innhold til en etablert nordisk aktør",
      "Regulatorisk: krav til andel europeisk innhold og investeringsplikt i lokal produksjon"
    ],
    hypotese: "Markedet er for lite til å bære lokal innholdsproduksjon på egen hånd, så eneste modell med positiv nåverdi er distribusjon gjennom teleoperatørenes pakker. Testen er kostnaden for én lokal dramaserie per marked, delt på hvor mange abonnenter den må holde og hvor lenge.",
    felle: "Å bruke total betalingsvilje for underholdning som markedet. Den er allerede fordelt på eksisterende abonnementer, så det relevante spørsmålet er hvilken tjeneste du erstatter — ikke hvor mange som har råd.",
    sek: 90 },

  { prompt: "Klienten er en europeisk togoperatør som vurderer å by på en norsk persontogpakke. Materiellet leies av et statlig selskap, og dagens personale følger med gjennom virksomhetsoverdragelse. Ledelsen spør om de skal bruke seks måneder og et tosifret millionbeløp på å levere bud.",
    grener: [
      "Kontraktsøkonomien: er dette en bruttokontrakt der staten tar billettrisikoen, eller en nettokontrakt der operatøren gjør det",
      "Kostnadsbasen post for post, med spørsmålet hvilke av dem vi faktisk kan påvirke når både tog og personale er gitt",
      "De påvirkbare postene: turnusplanlegging, vedlikeholdsavtaler, energiforbruk i kjøring, og salgs- og støtteapparat",
      "Risikopostene: bøter for innstillinger og forsinkelser som skyldes en infrastruktur vi ikke kontrollerer",
      "Kapabilitet: har vi driftsorganisasjon, sikkerhetsgodkjenning og norsk trafikkforståelse, eller må alt bygges fra null",
      "Budstrategi: hvem andre byr, hva vant forrige gang, og hva er laveste bud vi kan levere og fortsatt tåle"
    ],
    hypotese: "Det finnes ingen strukturell kostnadsfordel å hente når materiell og personale er låst, så et vinnende bud vinner ved å prise risiko lavere enn de andre — ikke ved å drifte billigere. Testen er å dekomponere forrige vinnerbud i poster og telle hvor mange kroner som i det hele tatt er påvirkelige.",
    felle: "Å strukturere det som en vanlig markedsinngang med markedsstørrelse og markedsandel. Her er andelen null eller hundre, avgjort på én dag av én kjøper — strukturen må være en budkalkyle med risikopåslag, ikke en attraktivitetsanalyse.",
    sek: 120 },

  { prompt: "Klienten er en amerikansk produsent av kirurgisk utstyr som vil inn i det norske og nordiske sykehusmarkedet. Produktet er CE-merket og koster 40 prosent mer per inngrep enn det som brukes i dag. Spørsmålet er om og hvordan de skal gå inn.",
    grener: [
      "Hvem kunden faktisk er: nasjonale rammeavtaler gjennom felles innkjøp, ikke den enkelte kirurg eller det enkelte sykehus",
      "Anbudssyklusen: når løper gjeldende rammeavtaler ut, og hvor lenge er markedet stengt hvis vi kommer ett år for sent",
      "Verdiargumentet i sykehusets egne kroner: kostnad per behandlet pasient inkludert operasjonstid, liggedøgn, komplikasjoner og reoperasjoner — ikke pris per enhet",
      "Dokumentasjonskravet: hvilke kliniske data en metodevurdering krever, og om vi har dem i nordisk populasjon",
      "Leveranseapparat: opplæring av operasjonsteam, service, konsignasjonslager, og hvem som bærer den kostnaden",
      "Inngangsvei: egen salgsorganisasjon, distributør som allerede har rammeavtalen, eller partnerskap med etablert leverandør"
    ],
    hypotese: "Barrieren er innkjøpssyklusen og ikke produktet: er avtalen nettopp fornyet, er markedet stengt i fire år, og riktig trekk er å gå via distributør nå og bygge helseøkonomiske data til neste utlysning. Testen er utløpsdatoene på gjeldende rammeavtaler i hver helseregion.",
    felle: "Å estimere markedet som antall inngrep ganger pris. Innkjøpsstrukturen bestemmer hvor mye av det som er tilgjengelig og når — et stort marked som er kontraktsbundet i fire år er null marked i planperioden.",
    sek: 90 },

  /* ================= VEKST OG INNTEKT ================= */

  { prompt: "Klienten er en av tre mobiloperatører i Norge. Abonnentbasen er stabil, snittinntekten per kunde har stått stille i fire år, og styret har bedt om en plan for tre prosent årlig vekst i tjenesteinntekt. Administrerende direktør vil vite hvor de tre prosentene skal komme fra.",
    grener: [
      "Privat mobil: bevegelse opp datastigen hos eksisterende kunder, mot netto tilvekst gjennom portering",
      "Kostnaden ved en portert kunde: kampanjerabatt og terminalstøtte målt mot dekningsbidrag over bindingstiden",
      "Fast bredbånd og fiber: husstander passert ganger andel tilkoblet — vekst her er utrullingstakt, ikke salgsarbeid",
      "Bedriftsmarkedet: kontraktsfornyelser, mobilt bredbånd, og maskin-til-maskin-abonnementer med lav snittinntekt, men svært lav churn",
      "Tilleggstjenester: sikkerhet, forsikring, TV og strøm — hvor mye som er egen margin og hvor mye som bare er churn-demping",
      "Engrossalg til virtuelle operatører, og hvor mye av det som er egne kunder som flytter til et billigere merke i eget konsern"
    ],
    hypotese: "Veksten ligger i å flytte eksisterende kunder oppover i prisplanene, ikke i å ta kunder fra konkurrentene: i et tremannsmarked koster en portert kunde mer i rabatt enn hun bidrar med over kontraktstiden. Testen er dekningsbidrag over 24 måneder for en oppgradert kunde mot en nyvervet.",
    felle: "Å telle engrossalg og vekst hos egne lavprismerker som inntektsvekst. Mye av det er kannibalisering, og konsernets tjenesteinntekt kan falle mens hvert enkelt merke rapporterer vekst.",
    sek: 90 },

  { prompt: "Klienten er en programvareleverandør med 40 millioner euro i årlig gjentakende inntekt, solgt både som selvbetjening til småbedrifter og som avtalesalg til større kunder. Eierne vil doble inntekten på tre år. Du skal si hvor doblingen realistisk kan komme fra.",
    grener: [
      "Ny inntekt fra nye kunder, delt på de to bevegelsene: selvbetjening med lav kontraktsverdi og kort syklus, mot avtalesalg med høy verdi og lang syklus",
      "Salgskapasiteten som faktisk begrenser: antall selgere ganger kvote ganger oppnåelsesgrad, justert for opplæringstid før en ny selger leverer",
      "Ekspansjon i eksisterende base: flere brukere per kunde, prisopptrapping ved fornyelse, og salg av tilleggsmoduler",
      "Retensjon målt i kroner og ikke i logoer, siden en stor kunde som halverer bruken ikke synes i churn-tallet",
      "Anskaffelseskostnad og tilbakebetalingstid per segment, som avgjør hvilken vekst selskapet har råd til å finansiere",
      "Kanal og geografi: partnere og forhandlere som alternativ til å bygge egen salgsstyrke"
    ],
    hypotese: "Doblingen kommer fra ekspansjon i basen og ikke fra nysalg: å løfte netto inntektsretensjon fra 105 til 120 prosent gir mer enn å doble salgsapparatet, og binder mindre kapital. Testen er to kohortmodeller stilt opp mot hverandre, med kroner investert per krone ny inntekt.",
    felle: "Å planlegge veksten som ansettelser. En selger ansatt i mars leverer først året etter, så en bemanningsplan uten opplæringstid og oppnåelsesgrad gir en inntektskurve som er forskjøvet et helt år.",
    sek: 90 },

  { prompt: "Klienten er en norsk sjømateksportør som selger 95 prosent av volumet som hel, fersk laks til foredlingsanlegg i Polen og Danmark. Styret vil vokse i verdi og ikke i volum, og spør om selskapet skal flytte seg oppover i verdikjeden. Du skal si om det er riktig, og hvor de i så fall skal stoppe.",
    grener: [
      "Verdikjeden ledd for ledd: rund fisk, filet, porsjonspakket, røkt og ferdigrett — hva som legges til i pris og hva som legges til i kostnad i hvert steg",
      "Marginen per ledd og ikke prisen per kilo: svinn i filetering, kapitalbinding og holdbarhet som krymper for hvert steg",
      "Tollmuren inn i EU, som er lav for hel fersk fisk og høy for bearbeidet — den ene grunnen til at foredlingen ligger der den ligger",
      "Kundeforholdet: kundene våre i dag er foredlerne, så et steg opp betyr å konkurrere med dem vi selger til",
      "Kapabilitet og kapital: eget anlegg i Norge, kjøp av et anlegg inne i EU, eller leieproduksjon",
      "Sluttmarkedet: kjedeavtaler, og hvem som eier merkevaren i butikkhyllen"
    ],
    hypotese: "Verdiøkningen finnes, men er allerede beskattet bort: tollsatsen på bearbeidede produkter inn i EU er større enn foredlingsmarginen, så et steg opp lønner seg bare hvis anlegget står inne i EU. Testen er marginen per ledd regnet med og uten toll, for de tre viktigste produktformene.",
    felle: "Å lese høyere pris per kilo som høyere margin. Foredling er en lavmarginindustri med høy kapitalbinding og mye svinn — prisen stiger, men kostnaden og risikoen stiger raskere.",
    sek: 120 },

  { prompt: "Klienten er en norsk bilforhandlerkjede med 22 anlegg. Importøren legger om til agentmodell, der forhandleren får en fast provisjon per bil i stedet for å eie bilen selv, og nybilmarginen forsvinner nesten helt. Eierne vil vite hvor inntjeningen skal komme fra i stedet.",
    grener: [
      "Kundens livsløp som prosess: kjøp, finansiering, forsikring, service, dekk, reparasjon, innbytte, og neste kjøp",
      "Nybil under agentmodellen: fast provisjon per enhet, ingen prisspak, og volum som ikke lenger oversettes til margin",
      "Bruktbil, som fortsatt er egen handelsvirksomhet: innkjøpsdisiplin, liggetid og margin per enhet",
      "Finansiering og forsikring: andel av solgte biler som tar produktet, ganger provisjonen per avtale",
      "Ettermarked: fakturerbare verkstedtimer ganger timepris ganger belegg, og hva elbilovergangen gjør med servicebehovet per bil",
      "Gjentakende bindinger: dekkhotell, serviceavtaler og abonnement som holder bilen i vårt verksted mellom kjøpene"
    ],
    hypotese: "Inntjeningen må flyttes fra transaksjonen til eierperioden, og den er truet fra to kanter samtidig: elbiler krever færre servicetimer, så veksten må komme fra å holde en større andel av bilene i eget verksted lenger. Testen er dekningsbidrag over fem års eierskap for en kunde med serviceavtale mot en uten.",
    felle: "Å måle vekst i antall solgte biler når marginen per bil er kontraktsfestet av importøren. Volumet kan vokse betydelig uten at én krone treffer bunnlinjen.",
    sek: 90 },

  /* ================= M&A ================= */

  { prompt: "Klienten er et nordisk oppkjøpsfond som vurderer å kjøpe en norsk elektroinstallatør med 600 millioner i omsetning, som plattform for å kjøpe opp 15 til 20 mindre lokale installatører. Selger vil ha ni ganger driftsresultat. Fondet spør om planen holder.",
    grener: [
      "Plattformens egen inntjening: andel prosjekt mot service, fakturerbar grad per montør, og utviklingen i timepris",
      "Etterspørselsbildet: nybygg mot rehabilitering, elbilladning og oppgradering av eldre anlegg — og hvilke av dem som er sykliske",
      "Kilden til synergi ved å eie mange: innkjøp fra grossist, felles administrasjon og systemer, kryssbemanning mellom byer — og hvilke av dem som er reelle når monteringen uansett skjer lokalt",
      "Multippelgapet: hva plattformen koster mot hva små installatører koster, siden hele avkastningen kan ligge i differansen",
      "Tilfanget av mål: hvor mange kjøpbare selskaper finnes, hvem eier dem, og hvorfor skulle de selge",
      "Risiko: verdien går hjem hver kveld, så nøkkelpersoner, lærlingtilgang og garantiansvar på utført arbeid",
      "Exit: hvem kjøper en samling installatører om fem år, og til hvilken multippel"
    ],
    hypotese: "Avkastningen ligger i multippelforskjellen og i innkjøpssynergi, ikke i organisk vekst — dermed står dealen og faller på om det finnes nok mål til vesentlig lavere multippel enn plattformen. Testen er å kartlegge de 50 største uavhengige og telle hvor mange som har eier over 60 år uten arvefølge.",
    felle: "Å prise synergiene inn i budet. Betaler du for dem, har du gitt dem til selger — og en oppkjøpsstrategi gir bare avkastning så lenge kjøpsmultippelen faktisk er lavere enn den du selv verdsettes til.",
    sek: 120 },

  { prompt: "Klienten er det nest største rederiet i norsk fergedrift og vurderer å slå seg sammen med den tredje største. Begge lever av anbud fra fylkeskommuner og staten, og de møtes i budrunder flere ganger i året. Styret vil vite hva sammenslåingen faktisk er verdt.",
    grener: [
      "Budhistorikken: i hvor mange av de siste 20 anbudene var begge blant budgiverne, og hva skjer med vinnerprisen når én budgiver forsvinner",
      "Flåten som knapp ressurs: hvor mange fartøy som frigjøres når to reservefartøyparker slås sammen, og hva de kan brukes til",
      "Kostnadssynergi: mannskapspool på tvers av samband, felles verkstedavtaler, og innkjøp av batteri og landstrømanlegg",
      "Kontraktsporteføljen: løpetid og fornyelsestidspunkt, siden verdien først realiseres i neste budrunde",
      "Konkurransemyndighetene: på hvor mange samband synker antall reelle budgivere under tre",
      "Integrasjon: to tariffområder, to vedlikeholdssystemer og to sikkerhetsstyringssystemer"
    ],
    hypotese: "Den reelle verdien er høyere flåteutnyttelse og felles mannskapspool, ikke markedsmakt — og lå mesteparten av verdien i markedsmakt, ville dealen uansett bli stoppet, siden kjøperen er en offentlig oppdragsgiver med full innsikt i budhistorikken. Testen er å regne synergien med og uten antatt høyere budpriser.",
    felle: "Å behandle en sammenslåing av to like aktører som et spørsmål om selskapene passer sammen. Når A og B er direkte konkurrenter om de samme kontraktene, er hovedspørsmålet hva som skjer med prisen når kapasitet konsolideres.",
    sek: 120 },

  { prompt: "Klienten er et industrikonsern med fire divisjoner. Den minste leverer 12 prosent av omsetningen og 4 prosent av driftsresultatet, og en investeringsbank har uoppfordret levert et indikativt bud. Konsernsjefen vil vite om de skal selge, og hva de i så fall bør kreve.",
    grener: [
      "Divisjonens frittstående inntjening: hvilke kostnader som i dag er allokert fra konsernet, og hvilke som er reelle når den står alene",
      "Bindingene som må klippes: felles IT, felles fabrikk, felles salgsapparat og felles kunder — hva som må dupliseres, og hva det koster",
      "Overgangsavtaler: hvor lenge vi må levere tjenester til kjøper, til hvilken pris, og hva det binder av vår egen organisasjon",
      "Restkonsernet etter salget: hvilke faste kostnader som blir liggende igjen uten omsetning å bære dem",
      "Kjøperlandskapet: industriell kjøper med synergi mot oppkjøpsfond med gjeldskapasitet — de betaler for helt ulike ting",
      "Alternativene som skal slås: behold og forbedre, delvis salg, eller sammenslåing med en konkurrent"
    ],
    hypotese: "Divisjonen er verdt mer for en industriell kjøper enn for oss, men de gjenværende faste kostnadene spiser en betydelig del av gevinsten — så minsteprisen er divisjonens verdi pluss hullet den etterlater. Testen er restkonsernets kostnadsbase satt opp med og uten divisjonen.",
    felle: "Å verdsette divisjonen på dens rapporterte driftsresultat. Det tallet er beregnet med internpriser og konsernallokeringer, og både allokeringen og de fastlåste kostnadene må fram i lyset før tallet betyr noe.",
    sek: 120 },

  { prompt: "Klienten er en nordisk bank som vurderer å kjøpe en leverandør av regnskapsprogramvare for småbedrifter, med 90 000 kunder. Prisen tilsvarer 14 ganger årlig gjentakende inntekt, og hele budsjettet er begrunnet med kryssalg av bankprodukter. Ledelsen vil vite om det er en god handel.",
    grener: [
      "Hva vi faktisk kjøper: distribusjon til en kundebase, data om bedriftenes kontantstrøm, eller et produkt vi trenger",
      "Målselskapet frittstående: gjentakende inntekt, veksttakt, churn, og hvor mye av inntekten som er lisens mot transaksjonsgebyr",
      "Kryssalgsregnestykket: antall kunder ganger konverteringsrate ganger margin per bankprodukt, minus kostnaden ved å selge det",
      "Overlappet, som er den kritiske ukjente: hvor stor andel av de 90 000 som allerede er kunder hos oss",
      "Kanalrisikoen: regnskapsførerne er den faktiske salgskanalen, og de kan reagere negativt på en bankeier",
      "Teknologi og regulering: to helt ulike utviklingstakter, og krav til utkontraktering og driftsstabilitet som tvinger fram ombygging"
    ],
    hypotese: "Hele verdien avhenger av overlappet i kundebasen: er halvparten allerede våre kunder, halveres kryssalgssynergien og prisen er for høy. Testen er en samkjøring av organisasjonsnumre i de to basene før budet leveres.",
    felle: "Å telle inntektssynergier uten å si hvem som skal selge dem og hva det koster å realisere dem. Inntektssynergier svikter langt oftere enn kostnadssynergier, og bør prises med langt større rabatt.",
    sek: 90 },

  /* ================= PRISING ================= */

  { prompt: "Klienten er en norsk strømleverandør med 300 000 husholdningskunder, nesten alle på spotavtale med påslag. De vil lansere en toårig fastprisavtale og spør hva den skal koste. Målet er oppgitt som lønnsom vekst, ikke volum for enhver pris.",
    grener: [
      "Gulvet: hva det koster å sikre volumet i terminmarkedet for riktig prisområde, med riktig månedsprofil",
      "Profilrisikoen som ligger over gulvet: kunden bruker mest i de timene prisen er høyest, så et rent snitt underpriser sikringen",
      "Volumrisikoen: en kald vinter gir merforbruk vi må dekke i spot, en mild vinter gir sikret volum vi må selge tilbake",
      "Taket: kundens alternativ er spot med påslag, så betalingsviljen er i praksis en forsikringspremie mot en vinter som 2022",
      "Konkurranseposisjonen: prisportalen gjør at avtalen sammenliknes på ett tall, så plasseringen i listen avgjør volumet",
      "Segmentering etter forbruksprofil: leilighet uten varmepumpe, enebolig med varmepumpe og elbil, og hytte — helt ulik sikringskostnad"
    ],
    hypotese: "Betalingsviljen for prissikring er høyere enn sikringskostnaden hos kunder med jevnt og lite forbruk, og lavere hos dem med varmepumpe og elbil — så prisen må differensieres på forbruksprofil i stedet for å settes som ett påslag. Testen er sikringskostnad og betalingsvilje regnet ut for hver av de tre profilene.",
    felle: "Å prise fastpris som gjennomsnittlig terminpris pluss margin. Profil- og volumrisiko er reelle kostnader som ikke synes i gjennomsnittet, og de treffer akkurat i de månedene avtalen er verdt mest for kunden.",
    sek: 120 },

  { prompt: "Klienten er et internasjonalt legemiddelselskap som skal sette norsk pris på en ny behandling. Behandlingen erstatter et forløp som i dag krever gjentatte sykehusinnleggelser. Prisen skal forhandles med det offentlige, og selskapet spør hvor den bør ligge.",
    grener: [
      "Verditaket sett fra betaleren: hva dagens standardforløp koster i legemidler, liggedøgn, komplikasjoner og oppfølging over pasientens forløp",
      "Betalingsviljen slik den faktisk beregnes: kostnad per vunnet kvalitetsjustert leveår, som det finnes et tallfestet nivå for",
      "Gulvet, som ikke er produksjonskostnad: marginalkostnaden per dose er nær null, mens forskningen allerede er pådratt",
      "Referanseprisrisikoen: Norge inngår i andre lands referansekurver, så en lav norsk pris lekker ut i større markeder",
      "Volumet: pasientpopulasjon ganger andel som får diagnosen stilt ganger behandlingslengde, og hvor raskt innføringen skjer",
      "Avtaleform: listepris med konfidensiell rabatt, pris- og volumavtale, eller betaling knyttet til dokumentert effekt"
    ],
    hypotese: "Den optimale norske prisen er ikke den som maksimerer norsk inntjening, men den laveste listeprisen selskapet trygt kan bli referert på i de store markedene — derfor bør rabatten være konfidensiell og ligge under listeprisen. Testen er tapt inntekt i referanselandene regnet ut for hvert norsk prisnivå.",
    felle: "Å prise mot kostnad. Nesten hele kostnaden er allerede pådratt forskning og marginalkostnaden er nær null, så et kostnadspluss-tall er meningsløst i begge retninger — her er alternativkostnaden hos betaleren hele grunnlaget.",
    sek: 120 },

  { prompt: "Klienten produserer maskineri til offshore- og skipsindustrien og selger 14 000 ulike reservedeler. Alle deler prises i dag som produksjonskostnad pluss et fast påslag. Ledelsen mistenker at ordningen koster dem penger, og vil vite hvordan porteføljen bør prises.",
    grener: [
      "Segmentér delene etter kundens nedetidskostnad: en del som stanser produksjonen har helt annen betalingsvilje enn en planlagt slitedel",
      "Segmentér dem etter konkurranseutsatthet: hvilke deler kan en tredjepart kopiere, og hvilke er beskyttet av toleranse, sertifisering eller garanti",
      "Leveringstid som egen prisdimensjon: hastelevering fra lager og ordinær leveranse er to ulike produkter",
      "Livsløpsøkonomien: maskinen selges nær kost for å plassere installert base, og hele inntjeningen ligger i de neste 20 årene",
      "Avtaleform: transaksjonssalg per del mot serviceavtale med garantert oppetid, som flytter inntekten fra deler til tilgjengelighet",
      "Kannibaliseringsgrensen: for høy pris på en kopierbar del sender kunden permanent til en tredjepart, og da mister vi også servicen"
    ],
    hypotese: "Dagens prisspredning følger produksjonskostnad, mens den burde følge nedetidskostnad — det betyr at de kritiske og ikke-kopierbare delene er systematisk underpriset og de enkle overpriset. Testen er å plotte dagens pris mot en grov klassifisering på kritikalitet og kopierbarhet, og se om det finnes noen sammenheng i det hele tatt.",
    felle: "Å behandle det som én prisbeslutning. En reservedelsportefølje er tusenvis av beslutninger, og strukturen må være en segmentering som gjør dem til en håndfull regler noen faktisk kan innføre.",
    sek: 90 },

  { prompt: "Klienten er et norsk mediehus med 210 000 abonnenter fordelt på papir, digitalt og en kombinasjonsavtale. Antall abonnenter er stabilt, men inntekten per abonnent faller fordi flere nedgraderer ved fornyelse. Kommersiell direktør vil ha en ny pakking, og spør hvordan den bør se ut.",
    grener: [
      "Pakkearkitekturen: hva som ligger i hvert nivå, og hvilken enkeltdel som faktisk får noen til å velge ett trinn opp",
      "Gjerdene mellom nivåene: antall enheter, deling i husstanden, tilgang til arkiv og direktesport — det som hindrer at alle velger det billigste",
      "Betalingsvilje per segment: den lojale papirleseren, kombinasjonskunden, og den unge som kommer inn på enkeltartikler",
      "Prisstigen over tid: introduksjonspris, hva som skjer ved første fornyelse, og churn per kohort ved hvert prishopp",
      "Nedgraderingsstrømmen: hvem flytter ned, fra hvilket nivå, og på hvilket tidspunkt i abonnementet",
      "Kannibalisering: papirabonnenten er dyrest å betjene, men betaler mest, så en flytting digitalt kan koste mer enn den sparer"
    ],
    hypotese: "Inntekten per abonnent faller ved fornyelse og ikke ved førstegangskjøp, så gevinsten ligger i å bygge gjerder som gjør nedgradering mindre attraktiv — ikke i å heve listeprisen. Testen er nedgraderingsrate per kohort ved fornyelse, brutt ned på hvilken funksjon kunden ga fra seg.",
    felle: "Å teste prisen mot nye kunder alene. De fleste kronene ligger i basen, og elastisiteten ved fornyelse i en lojal base er en helt annen enn ved førstegangskjøp.",
    sek: 90 },
