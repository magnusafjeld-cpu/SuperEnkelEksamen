/* ===================== CASETRENING · BYGG ESTIMATET =====================
   Markedsstørrelse brutt ned i steg, med sanity-sjekken som obligatorisk
   siste trinn. Rene data — visningen ligger i js/bundle-lyn.js (runEstimat).

   Tallene er drilltallene fra docs/case-research/04-matte.md, avsnitt 2.3.
   Det er de avrundede tallene som skal sitte, ikke de eksakte fra SSB.

   Distraktorene er ikke tilfeldige. Minst halvparten av trinnene har ett
   alternativ som ligger en tierpotens unna fasit — det er den vanligste
   feilen i caseintervjuet, og den eneste som må drilles mekanisk bort.
   ======================================================================== */
window.EDU_DATA = window.EDU_DATA || {};
window.EDU_DATA.lyn = window.EDU_DATA.lyn || {};
window.EDU_DATA.lyn.estimat = [

  /* ---------- 1 · topp-ned, forbruksmarked ---------- */
  { oppg: "Hvor mange kopper kaffe kjøpes på norske kafeer per år?",
    steg: [
      { sp: "Du går topp-ned fra befolkningen på 5,6 mill. Anta at 40 % kjøper kafékaffe med en viss regelmessighet. Hvor stor er brukergruppen?",
        options: ["0,22 mill.", "2,2 mill.", "4,5 mill.", "22 mill."], answer: 1,
        why: "Ankeret er befolkningstallet 5,6 mill., og første filter er bruker mot ikke-bruker — den aksen som skiller mest i et forbrukermarked. 5,6 × 0,4 = 2,24, altså ~2,2 mill. Både 0,22 og 22 ligger en tierpotens unna: sjekk potensen før sifrene." },
      { sp: "Brukerne kjøper i snitt 1,5 kopp per uke. Hvor mange kopper blir det per bruker per år?",
        options: ["18", "78", "550", "780"], answer: 1,
        why: "Frekvens ganger tid: 1,5 × 52 uker = 78. Fellen er å gange med 365 og få ~550 — da har du byttet uke mot dag uten å merke det. 780 er samme regnestykke med en tierpotens for mye. Skriv «per uke» ved siden av tallet så lenge det står der." },
      { sp: "2,2 mill. brukere à 78 kopper. Hvor stort blir årsvolumet?",
        options: ["17 mill.", "175 mill.", "600 mill.", "1,7 mrd."], answer: 1,
        why: "2,2 × 78 ≈ 172, og potensene er 10^6 — altså ~175 mill. kopper. Regn mantissen og tierpotensen hver for seg: 2 × 80 = 160 forteller deg med én gang at svaret ligger i hundretalls millioner, ikke i milliarder." },
    ],
    sanity: { sp: "Sanity-sjekk baklengs: del svaret på befolkningen. Hva blir det per nordmann, og holder det?",
      options: [
        "~3 kopper per person per år — for lavt, da hadde knapt en kafé overlevd",
        "~31 kopper per person per år, altså omtrent én annenhver uke når også alle som aldri går på kafé regnes med. Lavt nok til å være troverdig — anslaget står",
        "~300 kopper per person per år, nesten én om dagen for hele befolkningen",
        "~3 000 kopper per person per år"],
      answer: 1,
      why: "Grepet er per capita: 175 mill. / 5,6 mill. ≈ 31. Å dele svaret på befolkningen oversetter et abstrakt milliontall til noe du har egen erfaring med, og det er den raskeste måten å fange en tierpotens på avveie. Anslaget er grovt — både kafégjengerandelen og frekvensen er satt med skjønn — men størrelsesordenen tåler sjekken." } },

  /* ---------- 2 · installert base / levetid ---------- */
  { oppg: "Hvor mange oppvaskmaskiner selges i Norge per år, og hva er markedet verdt?",
    steg: [
      { sp: "Oppvaskmaskin er en husholdningsgjenstand, ikke en persongjenstand. Med 2,65 mill. husholdninger og ~75 % dekning — hvor stor er den installerte basen?",
        options: ["0,2 mill.", "2,0 mill.", "4,2 mill.", "20 mill."], answer: 1,
        why: "Riktig akse først: hvitevarer telles per husholdning. 2,65 × 0,75 ≈ 2,0 mill. maskiner. 4,2 mill. er det du får om du bruker befolkningen (5,6 × 0,75), og det er den klassiske feilen på hvitevarer, TV og bil." },
      { sp: "Snittlevetiden på en oppvaskmaskin er ~12 år. Hvor mange maskiner må erstattes per år?",
        options: ["24 mill.", "1,65 mill.", "165 000", "17 000"], answer: 2,
        why: "Levetidstrikset: årlig marked = installert base / levetid. Regn på det urundede grunnlaget: 1,99 mill. / 12 ≈ 165 000. (Bruker du det avrundede 2,0, får du 167 000 — samme størrelsesorden, og i en estimeringsoppgave er begge greie.) Dette er selve grepet i «hvor mange enheter»-oppgaver — et modent marked selger erstatninger, ikke nysalg." },
      { sp: "Snittprisen på en oppvaskmaskin er ~7 000 kr. Hvor stort er markedet i kroner?",
        options: ["115 mill. kr", "1,2 mrd. kr", "2,3 mrd. kr", "12 mrd. kr"], answer: 1,
        why: "165 000 × 7 000: strip nullene — 165 × 7 = 1 155, og 10^3 × 10^3 = 10^6 → ~1,16 mrd., som jeg runder til 1,2 mrd. kr. Nullene føres som eget tall i margen og festes tilbake til slutt." },
    ],
    sanity: { sp: "Sanity-sjekk baklengs: 1,2 mrd. fordelt på 2,65 mill. husholdninger. Hva sier tallet om forutsetningene dine?",
      options: [
        "~440 kr per husholdning per år. Med en maskin til 7 000 kr betyr det kjøp hvert sekstende år, og 12 års levetid delt på 75 % dekning er nettopp 16 — kjeden er intern konsistent",
        "~44 kr per husholdning per år, som ikke rekker til en maskin i det hele tatt",
        "~4 400 kr per husholdning per år, altså en ny maskin annethvert år",
        "~44 000 kr per husholdning per år, mer enn transportutgiften"],
      answer: 0,
      why: "Grepet er å regne baklengs til én av forutsetningene. 1,16 mrd. / 2,65 mill. ≈ 440 kr, og 7 000 / 440 ≈ 16 år. Når baklengsregningen gjenskaper en forutsetning du selv satte, er det den sterkeste sanity-sjekken du får — feilen måtte i så fall ligge i forutsetningen, ikke i regningen." } },

  /* ---------- 3 · installert base / levetid, med vekstledd ---------- */
  { oppg: "Hvor mange nye personbiler registreres i Norge per år?",
    steg: [
      { sp: "Bilparken er 2,9 mill. personbiler, og en norsk bil lever ~17 år. Hvor mange biler faller ut av parken per år?",
        options: ["17 000", "170 000", "500 000", "1,7 mill."], answer: 1,
        why: "Installert base delt på levetid: 2,9 mill. / 17 ≈ 170 000. Ikke gjør lang divisjon — 17 × 17 = 289, så 2,9 / 17 ≈ 0,17, og potensen 10^6 gir 170 000. To av alternativene er samme sifre med feil potens." },
      { sp: "Bilparken vokser fortsatt svakt, rundt 0,5 % i året. Hvor mange biler er ren vekst?",
        options: ["1 500", "15 000", "145 000", "290 000"], answer: 1,
        why: "Prosentankeret: 1 % av 2,9 mill. er 29 000, så 0,5 % er halvparten, ~15 000. Å bygge fra 1 % er raskere og tryggere enn å gange med 0,005. Merk at 290 000 er 10 %, ikke 0,5 %." },
      { sp: "Nybilsalg = erstatning + vekst. Hvor mange nye personbiler per år?",
        options: ["155 000", "185 000", "285 000", "1,85 mill."], answer: 1,
        why: "170 000 + 15 000 = 185 000. Poenget med å skille de to leddene er at de oppfører seg helt ulikt: erstatningsvolumet er stabilt og forutsigbart, mens veksten svinger med konjunktur og befolkning. En kandidat som bare deler base på levetid glemmer at markedet også vokser." },
    ],
    sanity: { sp: "Sanity-sjekk mot noe du kan utenat: 185 000 biler à ~500 000 kr er ~92 mrd. kr. Hvordan står det mot dagligvaremarkedet på 230 mrd.?",
      options: [
        "Under 1 % av dagligvare — nybil kan umulig være så lite",
        "Over dobbelt så stort som dagligvare, noe som avslører en tierpotens på avveie",
        "~40 % av dagligvaremarkedet. Bil er en av de aller største postene i norsk privatforbruk, så to femtedeler av matregningen er en troverdig størrelsesorden",
        "Omtrent like stort som fastlands-BNP"],
      answer: 2,
      why: "Grepet er benchmark mot et marked du kan utenat. Dagligvare på 230 mrd. er det beste norske ankeret, fordi nesten alle forbrukermarkeder skal ligge under det. 92 / 230 ≈ 0,4. Vær forsiktig med å dele videre på husholdninger her: en stor del av nybilene kjøpes av bedrifter og leasingselskaper, så husholdningsandelen er lavere enn 92 mrd. / 2,65 mill. antyder." } },

  /* ---------- 4 · topp-ned, aldersavgrenset marked ---------- */
  { oppg: "Hvor stort er markedet for barnehageplasser i Norge?",
    steg: [
      { sp: "Barnehagealder er 1–5 år, altså fem årskull. Med ~55 000 fødsler i året — hvor mange barn er i målgruppen?",
        options: ["55 000", "275 000", "750 000", "2,75 mill."], answer: 1,
        why: "Fødselstallet er det reneste ankeret for aldersavgrensede markeder, fordi ett årskull ≈ ett fødselskull. 5 × 55 000 = 275 000. 750 000 er hele gruppen 0–12 år: riktig tall, feil segment, og det er segmenteringsfeilen som koster mest her." },
      { sp: "Dekningsgraden i norsk barnehage er ~93 %. Hvor mange barn har plass?",
        options: ["130 000", "255 000", "275 000", "2,55 mill."], answer: 1,
        why: "275 000 × 0,93 ≈ 256 000, som jeg runder til 255 000. Når et filter ligger så nær 100 %, si det høyt: «dekningen flytter knapt svaret, jeg runder». Det viser at du vet hvilke ledd som betyr noe, og sparer tid til leddene som gjør det." },
      { sp: "Full kostnad per plass — foreldrebetaling og offentlig tilskudd til sammen — er ~250 000 kr i året. Hvor stort er markedet?",
        options: ["6,4 mrd. kr", "25 mrd. kr", "64 mrd. kr", "640 mrd. kr"], answer: 2,
        why: "255 000 × 250 000: 255 × 25 = 6 375, og 10^3 × 10^4 = 10^7 → ~64 mrd. kr. Avklar først hva som skal måles: spør oppgaven bare om foreldrebetalingen, lander du rundt 8 mrd., altså en åttendedel. Det er derfor steg 1 i estimering alltid er «hva er det vi teller»." },
    ],
    sanity: { sp: "Sanity-sjekk mot en makrostørrelse: hvor stor andel av fastlands-BNP på 4 400 mrd. er 64 mrd.?",
      options: [
        "~0,15 % — for lite for en sektor som sysselsetter titusenvis",
        "~1,5 %. Barnehage er en stor, i hovedsak offentlig finansiert sektor, og drøyt én prosent av fastlandsøkonomien er troverdig",
        "~15 %, altså på nivå med hele helsevesenet",
        "~35 %, samme størrelsesorden som statsbudsjettet"],
      answer: 1,
      why: "Grepet er benchmark mot fastlands-BNP: 64 / 4 400 ≈ 1,5 %. Kryssjekk bunn-opp med bemanning: ~255 000 plasser med rundt tre barn per ansatt gir ~85 000 årsverk, som til ~600 000 kr i årslønn er ~51 mrd. i lønn. Det er ~80 % av markedet, og 80 % lønnsandel er nettopp det du venter i en bemanningsdrevet tjenestesektor." } },

  /* ---------- 5 · topp-ned, husholdning som akse ---------- */
  { oppg: "Hvor mye brukes på hundefôr i Norge per år?",
    steg: [
      { sp: "Hund er en husholdningsgjenstand. Anta at ~20 % av de 2,65 mill. husholdningene har hund, og at de har 1,1 hund i snitt. Hvor mange hunder?",
        options: ["~0,6 mill.", "~0,06 mill.", "~1,1 mill.", "~6 mill."], answer: 0,
        why: "2,65 × 0,20 = 0,53 mill. hundehusholdninger, og × 1,1 ≈ 0,58, altså ~0,6 mill. hunder. Aksen er husholdning, ikke individ — to samboere deler hund, og teller du per person dobler du bommen. Både 0,06 og 6 mill. ligger en tierpotens unna." },
      { sp: "Fôr til en middels stor hund koster rundt 100 kr per uke. Hva blir årskostnaden per hund?",
        options: ["1 200 kr", "5 200 kr", "36 500 kr", "52 000 kr"], answer: 1,
        why: "100 × 52 uker = 5 200 kr. 36 500 er samme tall regnet per dag i stedet for per uke, og 52 000 er en tierpotens for mye. Enheten på hver linje — «kr per uke» — gjør begge feilene umulige." },
      { sp: "0,6 mill. hunder à 5 200 kr. Hvor stort er fôrmarkedet?",
        options: ["310 mill. kr", "3,1 mrd. kr", "31 mrd. kr", "310 mrd. kr"], answer: 1,
        why: "0,6 × 5,2 = 3,12, og 10^6 × 10^3 = 10^9 → ~3 mrd. kr. Behandle tierpotensen som et eget regnestykke ved siden av sifrene; det er potensdelen som ryker under tidspress, ikke multiplikasjonen." },
    ],
    sanity: { sp: "Sanity-sjekk per capita og mot dagligvare: 3,1 mrd. — hva blir det per nordmann, og hva er det som andel av matmarkedet på 230 mrd.?",
      options: [
        "~540 kr per nordmann per år og 1,3 % av dagligvaremarkedet. At hundefôr er drøyt én prosent av all mat handlet i Norge er høyt, men ikke absurd — anslaget står",
        "~5 400 kr per nordmann per år og 13 % av dagligvaremarkedet",
        "~54 kr per nordmann per år, som ikke ville fôret 600 000 hunder",
        "~10 000 kr per nordmann per år"],
      answer: 0,
      why: "To grep på én gang: del på 5,6 mill. for per capita, og på 230 mrd. for andel av et marked du kjenner. 3,1 mrd. / 5,6 mill. ≈ 540 kr, og 3,1 / 230 ≈ 1,3 %. Anslaget er grovt — fôrprisen varierer sterkt med hundens størrelse — men begge sjekkene lander der de skal. Til sammenligning: hadde du fått 56 mrd., ville det vært 10 000 kr per nordmann per år, og da er det frekvensen som er gal." } },

  /* ---------- 6 · installert base / levetid, persongjenstand ---------- */
  { oppg: "Hvor mange mobiltelefoner selges i Norge per år?",
    steg: [
      { sp: "Mobil er en persongjenstand. Trekk barn 0–12 år (0,75 mill.) fra befolkningen på 5,6 mill. Hvor stor er den installerte basen?",
        options: ["0,49 mill.", "4,85 mill.", "5,6 mill.", "49 mill."], answer: 1,
        why: "5,6 − 0,75 = 4,85 mill. Aldersaksen er den riktige her, og barn under 13 er det eneste segmentet som monner. 5,6 mill. er svaret om du hopper over segmenteringen — bare 15 % feil, men verre enn det ser ut, fordi du da har sluttet å spørre hvem brukeren er." },
      { sp: "Nordmenn bytter telefon omtrent hvert tredje år. Hvor mange telefoner selges per år?",
        options: ["4,85 mill.", "16 mill.", "160 000", "1,6 mill."], answer: 3,
        why: "Levetidstrikset igjen: 4,85 / 3 ≈ 1,6 mill. per år. Legg merke til hvor følsomt svaret er for levetiden — to år gir 2,4 mill., fire år gir 1,2 mill. Si det høyt: byttefrekvensen er den mest usikre forutsetningen i kjeden." },
      { sp: "Snittprisen er ~6 000 kr. Hvor stort er markedet i kroner?",
        options: ["96 mrd. kr", "970 mrd. kr", "960 mill. kr", "9,7 mrd. kr"], answer: 3,
        why: "1,6 mill. × 6 000: 16 × 6 = 96, og potensene gir 10^9 → ~9,7 mrd. kr. Alle fire alternativene er samme sifre med ulik tierpotens. Det er nøyaktig den feilen som må drilles bort, fordi den ikke ser gal ut når du regner videre på den." },
    ],
    sanity: { sp: "Sanity-sjekk baklengs: 9,7 mrd. delt på 5,6 mill. nordmenn. Hva forteller tallet deg?",
      options: [
        "~17 000 kr per nordmann per år, altså tre telefoner i året",
        "~170 000 kr per nordmann per år, en fjerdedel av medianinntekten",
        "~170 kr per nordmann per år, som ikke rekker til én telefon i løpet av et liv",
        "~1 730 kr per nordmann per år. Til 6 000 kr stykket svarer det til én telefon hvert tredje og et halvt år over hele befolkningen — samme byttetakt som antatt, korrigert for at barna ikke har telefon"], answer: 3,
      why: "Grepet er baklengs til forutsetningen. 9,7 mrd. / 5,6 mill. ≈ 1 730 kr, og 6 000 / 1 730 ≈ 3,5 år. Vi antok tre år for de 87 % som har telefon, og 3 / 0,87 ≈ 3,5. Når baklengsregningen gjenskaper inputen, vet du at ingen tierpotens eller enhet har falt ut underveis." } },

  /* ---------- 7 · topp-ned, abonnementsmarked ---------- */
  { oppg: "Hvor stort er markedet for treningssentre i Norge?",
    steg: [
      { sp: "Målgruppen er i praksis 13–66 år. Legg sammen 0,5 mill. (13–19), 1,9 mill. (20–44) og 1,55 mill. (45–66). Hvor stor er den?",
        options: ["~4,0 mill.", "5,6 mill.", "40 mill.", "2,4 mill."], answer: 0,
        why: "0,5 + 1,9 + 1,55 = 3,95, altså ~4,0 mill. Aldersaksen er riktig valg fordi medlemsandelen faller kraftig etter 67 — og fordi tallbanken er delt langs nettopp den aksen, så du slipper å gjette på grensene." },
      { sp: "Rundt 20 % av målgruppen har medlemskap. Hvor mange medlemmer?",
        options: ["8 mill.", "0,08 mill.", "0,8 mill.", "1,1 mill."], answer: 2,
        why: "4,0 × 0,20 = 0,8 mill. medlemmer. Prosentankeret: 20 % er to ganger 10 %, altså 0,4 + 0,4. Norge ligger høyt internasjonalt på medlemsandel, så 20 % er et bevisst valg og bør begrunnes høyt i stedet for å slenges ut." },
      { sp: "Snittkontingenten er ~450 kr per måned. Hvor stort er markedet per år?",
        options: ["5,4 mrd. kr", "43 mrd. kr", "360 mill. kr", "4,3 mrd. kr"], answer: 3,
        why: "0,8 mill. × 450 × 12 ≈ 4,3 mrd. kr. 360 mill. er nøyaktig det du får om du glemmer å gange med 12 — et månedstall levert som årstall. Den feilen ser plausibel ut og overlever derfor ofte helt til anbefalingen." },
    ],
    sanity: { sp: "Sanity-sjekk baklengs mot noe fysisk: Norge har rundt 1 100 treningssentre. Hva sier 0,8 mill. medlemmer om hvert senter?",
      options: [
        "~72 medlemmer per senter, altfor få til å bære husleien",
        "~7 200 medlemmer per senter, flere enn noe norsk senter har",
        "~720 medlemmer per senter, som passer for et blandet utvalg av små nabosentre og store bysentre. Sjekken holder",
        "~72 000 medlemmer per senter"],
      answer: 2,
      why: "Grepet er baklengs til en enhet du har fysisk erfaring med. 800 000 / 1 100 ≈ 720. Kryssjekk i kroner: 4,3 mrd. / 1 100 ≈ 3,9 mill. i omsetning per senter, rimelig for en virksomhet med noen få årsverk og tung husleie. Anslaget er grovt fordi både medlemsandel og snittpris er rent skjønn." } },

  /* ---------- 8 · topp-ned, med kapasitetssjekk som avslører skjevhet ---------- */
  { oppg: "Hvor stort er det norske frisørmarkedet?",
    steg: [
      { sp: "Hvor mange klipp per innbygger per år er et forsvarlig snitt, når også barn og de som klipper seg hjemme regnes med?",
        options: ["4", "12", "25", "1"], answer: 0,
        why: "Bygg snittet av segmenter i stedet for å gjette på totalen: voksne kvinner ~4 i året, voksne menn ~6, barn ~3, og en del går aldri til frisør. Et vektet snitt lander rundt 4. Si nedbrytningen høyt — den vurderes, ikke om du traff 4 eller 4,5." },
      { sp: "5,6 mill. innbyggere à 4 klipp. Hvor mange klipp per år?",
        options: ["67 mill.", "220 mill.", "2,2 mill.", "22 mill."], answer: 3,
        why: "5,6 × 4 = 22,4 mill. klipp. Her er det ingen segmentering igjen å gjøre: snittet i forrige steg gjelder allerede hele befolkningen, så du ganger direkte. Å legge på et brukerfilter nå ville vært å filtrere to ganger — en vanlig og usynlig feil." },
      { sp: "Snittprisen på et klipp er ~550 kr. Hvor stort er markedet?",
        options: ["1,2 mrd. kr", "6 mrd. kr", "12 mrd. kr", "120 mrd. kr"], answer: 2,
        why: "22,4 mill. × 550: halver og doble — 22,4 × 55 = 1 232, og potensene gir 10^7 → ~12,3 mrd. kr. Rund heller 550 til 500 og legg til 10 % etterpå hvis du regner høyt; da har du et grovsvar å si allerede etter to sekunder." },
    ],
    sanity: { sp: "Sanity-sjekk baklengs mot kapasitet: Norge har rundt 8 500 frisører som jobber ~250 dager i året. Hvor mange klipp per frisør per dag krever anslaget?",
      options: [
        "~10,5 klipp per dag. Det er i overkant av en normal arbeidsdag, så anslaget ligger litt høyt — enten frekvensen, prisen eller begge er satt for sjenerøst",
        "~105 klipp per dag, som er fysisk umulig",
        "~1 000 klipp per dag",
        "~1 klipp per dag, som ikke ville gitt noen frisør inntekt"], answer: 0,
      why: "Grepet er baklengs til kapasitet: 22,4 mill. / 8 500 / 250 ≈ 10,5. En frisør rekker realistisk 8–10 klipp på en dag, så anslaget ligger i øvre kant og det reelle markedet er trolig nærmere 10 mrd. Poenget er ikke å treffe, men å oppdage skjevheten selv og si den høyt — det er nettopp det en kapasitetssjekk er til for." } },

  /* ---------- 9 · bunn-opp, kapasitetsbegrenset marked ---------- */
  { oppg: "Hvor mange hurtigladepunkter trenger Norge?",
    steg: [
      { sp: "Bygg bunn-opp fra én elbil. Den kjører ~12 000 km i året og bruker ~0,2 kWh per km. Hvor mye strøm trenger den?",
        options: ["24 000 kWh", "60 000 kWh", "240 kWh", "2 400 kWh"], answer: 3,
        why: "12 000 × 0,2 = 2 400 kWh per bil per år. Bunn-opp er riktig tilnærming her fordi markedet er kapasitetsbegrenset: det er ladernes yteevne, ikke etterspørselen i kroner, som setter antallet. Topp-ned fra et markedstall ville ikke gitt deg noen ligning å regne i." },
      { sp: "Bare ~20 % av ladingen skjer på hurtiglader; resten hjemme eller på jobb. Hvor mye hurtigladet strøm trenger de 0,95 mill. elbilene til sammen?",
        options: ["456 GWh", "2 300 GWh", "4 560 GWh", "45 GWh"], answer: 0,
        why: "2 400 × 0,20 = 480 kWh per bil, og × 0,95 mill. ≈ 456 GWh. Filteret hjemme mot ute er den avgjørende segmenteringen: hopper du over den, overvurderer du behovet fem ganger, og feilen forplanter seg rett gjennom til svaret." },
      { sp: "Ett hurtigladepunkt yter 100 kW og er i bruk ~10 % av årets 8 760 timer. Hvor mye leverer det per år?",
        options: ["8 760 MWh", "8,8 MWh", "87,6 MWh", "876 MWh"], answer: 2,
        why: "100 kW × 8 760 t × 0,10 = 87 600 kWh = ~88 MWh. Tidsankeret 8 760 timer i året bør sitte som oppslag. Utnyttelsesgraden på 10 % er den mest usikre forutsetningen i hele kjeden, og det skal du si før du regner videre." },
      { sp: "456 GWh delt på ~88 MWh per punkt. Hvor mange hurtigladepunkter?",
        options: ["15 000", "52 000", "500", "5 200"], answer: 3,
        why: "456 000 000 / 87 600 ≈ 5 200 punkter. Merk at dette er et gjennomsnittsbehov: reell etterspørsel er sterkt toppet rundt ferier og helger, så det faktiske behovet ligger klart høyere — i praksis rundt det dobbelte. Anslaget er grovt, og du leverer det som et gulv, ikke som en fasit." },
    ],
    sanity: { sp: "Retningssjekk: du dobler antatt effekt per lader fra 100 kW til 200 kW. Hva må skje med svaret?",
      options: [
        "Antallet dobles til ~10 400 — mer effekt betyr mer utstyr",
        "Antallet er uendret, siden strømbehovet ikke har endret seg",
        "Antallet firedobles",
        "Antallet halveres til ~2 600. Hvert punkt leverer dobbelt så mye, så du trenger halvparten så mange. Går svaret ditt motsatt vei, har du snudd en brøk"],
      answer: 3,
      why: "Grepet er retningssjekk: endre én forutsetning og se om svaret beveger seg riktig vei. Kapasitet per enhet står i nevneren, så mer kapasitet gir færre enheter. Sjekken tar to sekunder og fanger den ene feiltypen som ellers overlever hele kjeden — en snudd brøk gir helt plausible tall og fullstendig feil svar." } },

  /* ---------- 10 · topp-ned, med potenssjekk ---------- */
  { oppg: "Hvor mye bruker norske husholdninger på strøm per år?",
    steg: [
      { sp: "2,65 mill. husholdninger bruker ~16 000 kWh hver i året. Hvor mye blir det til sammen?",
        options: ["42 TWh", "130 TWh", "420 TWh", "4,2 TWh"], answer: 0,
        why: "2,65 mill. × 16 000 = 42,4 mrd. kWh = ~42 TWh. Strip nullene: 2,65 × 16 = 42,4, og 10^6 × 10^4 = 10^10 kWh. Det norske forbruket per husholdning er høyt fordi vi varmer opp med strøm — si det, for det forklarer hvorfor tallet ikke kan lånes fra Europa." },
      { sp: "Snittprisen inkludert nettleie og avgifter er ~1,50 kr per kWh. Hvor stor blir husholdningenes samlede strømregning?",
        options: ["6,4 mrd. kr", "21 mrd. kr", "64 mrd. kr", "640 mrd. kr"], answer: 2,
        why: "42,4 mrd. kWh × 1,50 ≈ 64 mrd. kr. Avklar hva som måles før du regner: spør oppgaven om kraftprisen alene, er svaret under det halve, siden nettleie og avgifter utgjør omtrent halve regningen." },
      { sp: "Hva blir strømregningen per husholdning per år?",
        options: ["2 400 kr", "12 000 kr", "24 000 kr", "240 000 kr"], answer: 2,
        why: "To veier til samme tall: 16 000 kWh × 1,50 kr = 24 000 kr, eller 64 mrd. / 2,65 mill. ≈ 24 000 kr. At begge veier gir det samme er en gratis kontroll på at ingen tierpotens har falt ut underveis — bruk den når kjeden har mer enn to ledd." },
    ],
    sanity: { sp: "Sanity-sjekk størrelsesorden mot en post du kjenner: boutgiften er ~135 000 kr per husholdning per år. Hvor stor andel er strømmen?",
      options: [
        "~18 %. Strøm som knapt en femtedel av alt som går til bolig er troverdig i et land med elektrisk oppvarming — potensen stemmer, og sifrene ligger i riktig sjikt",
        "~1,8 %, som er for lite når vinteren varer et halvt år",
        "~50 % — strøm kan ikke være halvparten av boutgiften",
        "~180 %, altså større enn hele boutgiften"],
      answer: 0,
      why: "Grepet er størrelsesorden mot en kjent post: 24 000 / 135 000 ≈ 0,18. Sjekk potensen før sifrene — hadde svaret blitt 240 000 kr, ville det vært større enn hele boutgiften, og feilen ville vært synlig uten å regne i det hele tatt. Kryssjekk oppover: 64 mrd. er ~1,5 % av fastlands-BNP, rimelig for husholdningenes del av kraftforbruket." } },

  /* ---------- 11 · bunn-opp, B2B ---------- */
  { oppg: "Hvor stort er markedet for regnskapstjenester til norske småbedrifter?",
    steg: [
      { sp: "Norge har 0,65 mill. aktive bedrifter, men bare 0,2 mill. har ansatte. Hvilken base bør du bygge på for en tjeneste som prises etter lønnskjøring og bilagsmengde?",
        options: [
          "2,9 mill. sysselsatte, siden prisen følger antall lønnsslipper",
          "0,02 mill., altså bare de største bedriftene",
          "0,65 mill. — alle registrerte bedrifter er potensielle kunder",
          "0,2 mill. bedrifter med ansatte. De 0,45 mill. uten ansatte er i hovedsak hvilende selskaper og enkeltpersonforetak med nesten ingen bilag, og betaler i praksis ikke for løpende regnskap"], answer: 3,
        why: "Bunn-opp i B2B står og faller på at kundebasen er riktig avgrenset. Antall registrerte foretak er nesten alltid for bredt et anker. Filteret «har ansatte» kutter basen med to tredjedeler, og det er nettopp det som skiller et forsvarlig estimat fra et oppblåst." },
      { sp: "Anta at ~70 % av disse setter regnskapet ut til et byrå. Hvor mange kunder er markedet?",
        options: ["140 000", "200 000", "1,4 mill.", "14 000"], answer: 0,
        why: "0,2 mill. × 0,70 = 140 000 kunder. Andelen er satt høyt fordi små bedrifter sjelden har egen regnskapsfunksjon. De store gjør det selv, men de er få — og de ligger uansett utenfor småbedriftssegmentet vi avgrenset til i forrige steg." },
      { sp: "En liten bedrift betaler i størrelsesorden 4 000 kr per måned. Hvor stort er markedet?",
        options: ["560 mill. kr", "1,7 mrd. kr", "6,7 mrd. kr", "67 mrd. kr"], answer: 2,
        why: "140 000 × 4 000 × 12 ≈ 6,7 mrd. kr. 560 mill. er svaret uten å gange med 12 — en månedspris levert som årsmarked. La «kr/mnd» stå ved siden av tallet helt til multiplikasjonen er gjort, så er feilen umulig." },
    ],
    sanity: { sp: "Sanity-sjekk baklengs mot bransjen: regnskapsbyråer omsetter grovt 1,2 mill. kr per ansatt. Hvor mange årsverk krever 6,7 mrd.?",
      options: [
        "~56 000 årsverk, altså 2 % av alle sysselsatte i Norge",
        "~560 000 årsverk",
        "~560 årsverk, altfor få til å betjene 140 000 kunder",
        "~5 600 årsverk. Bransjen sysselsetter reelt over det dobbelte, men vi har med vilje regnet bare på småbedriftssegmentet og med lav pris — anslaget er et gulv, ikke en fasit, og størrelsesordenen står"], answer: 3,
      why: "Grepet er baklengs til en ressurs: 6,7 mrd. / 1,2 mill. ≈ 5 600 årsverk, altså ~25 kunder per ansatt. Det er en stram, men mulig portefølje for småkunder. At tallet lander under den faktiske bransjestørrelsen er informasjon, ikke en feil — det forteller deg nøyaktig hvilken avgrensning du gjorde, og den presiseringen er det intervjueren vil høre." } },

  /* ---------- 12 · topp-ned, internasjonalt abonnementsmarked ---------- */
  { oppg: "Hvor stort er det amerikanske markedet for strømmetjenester?",
    steg: [
      { sp: "USA har 130 mill. husholdninger, og strømming er et husholdningsgode. Anta ~80 % penetrasjon. Hvor mange husholdninger strømmer?",
        options: ["104 mill.", "260 mill.", "335 mill.", "10 mill."], answer: 0,
        why: "130 × 0,80 = 104 mill. Bruk husholdning som enhet, ikke person: én konto deles av flere i samme hjem. 335 mill. er befolkningen, og å bruke den er samme feil som å telle oppvaskmaskiner per innbygger." },
      { sp: "En strømmende husholdning har i snitt ~2,5 abonnementer. Hvor mange abonnementer finnes?",
        options: ["26 mill.", "104 mill.", "260 mill.", "2,6 mrd."], answer: 2,
        why: "104 × 2,5 = 260 mill. abonnementer. Legg merke til at abonnementstallet blir dobbelt så høyt som husholdningstallet: i et modent marked med mange tilbydere er stabling normen, og et estimat som antar én tjeneste per hjem bommer med det halve." },
      { sp: "Snittprisen er ~12 USD per måned. Hvor stort er markedet per år?",
        options: ["370 mrd. USD", "3,1 bill. USD", "3,1 mrd. USD", "37 mrd. USD"], answer: 3,
        why: "260 mill. × 12 USD × 12 mnd ≈ 37 mrd. USD. 3,1 mrd. er svaret uten årsmultiplikatoren. Vær ekstra våken her: pris og antall måneder er tilfeldigvis begge 12, noe som gjør regnestykket lett — og gjør det lett å utføre bare én gang." },
    ],
    sanity: { sp: "Sanity-sjekk per husholdning: 37 mrd. USD fordelt på alle 130 mill. amerikanske husholdninger. Hva blir det?",
      options: [
        "~288 USD per husholdning per år, rundt 24 USD i måneden. Det svarer til to abonnementer i snitt når også de 20 % som ikke strømmer regnes med — konsistent med forutsetningene, og lite nok til å være troverdig ved siden av kabel-TV",
        "~2 880 USD per husholdning per år, mer enn en strømregning",
        "~28 800 USD per husholdning per år",
        "~29 USD per husholdning per år, altså under tre dollar i måneden"], answer: 0,
      why: "Grepet er per husholdning, og med hele basen i nevneren — ikke bare brukerne. Det er slik du fanger om et filter ble brukt to ganger. 37 mrd. / 130 mill. ≈ 288 USD. Sett mot en median husholdningsinntekt på ~75 000 USD er det ~0,4 % av inntekten, en rimelig andel for underholdning." } },

  /* ---------- 13 · installert base / levetid, europeisk ---------- */
  { oppg: "Hvor mange vaskemaskiner selges i EU per år?",
    steg: [
      { sp: "EU har 450 mill. innbyggere og ~2,3 personer per husholdning. Hvor mange husholdninger?",
        options: ["~1 mrd.", "~20 mill.", "~195 mill.", "~450 mill."], answer: 2,
        why: "450 / 2,3 ≈ 196, altså ~195 mill. husholdninger. Husholdningsstørrelsen i EU ligger litt over den norske på 2,1 — bruk et europeisk tall når basen er europeisk, i stedet for å låne det norske ankeret uten å si fra." },
      { sp: "Nesten alle europeiske husholdninger har vaskemaskin; sett dekningen til ~95 %. Hvor stor er den installerte basen?",
        options: ["~19 mill.", "~95 mill.", "~185 mill.", "~1,85 mrd."], answer: 2,
        why: "195 × 0,95 ≈ 185 mill. maskiner. Når et filter ligger så nær 100 %, si det høyt og rund heller enn å regne presist. Det sparer tid, og det signaliserer at du vet hvilke ledd som faktisk flytter svaret." },
      { sp: "Snittlevetiden er ~11 år. Hvor mange maskiner selges per år?",
        options: ["~40 mill.", "~170 mill.", "~1,7 mill.", "~17 mill."], answer: 3,
        why: "Installert base delt på levetid: 185 / 11 ≈ 17 mill. maskiner i året. I et mettet marked er praktisk talt alt salg erstatningssalg, så nysalgsleddet kan settes til null uten å skade estimatet — og det bør du si, ikke bare gjøre." },
    ],
    sanity: { sp: "Sanity-sjekk størrelsesorden ved å skalere ned til Norge: 17 mill. i EU, og Norge er 5,6 av 450 mill. innbyggere. Hva gir det, og stemmer det med en norsk bunn-opp?",
      options: [
        "~21 000 enheter i Norge, mot ~229 000 regnet fra norske husholdninger — en tierpotens fra hverandre, så noe er galt",
        "~2,1 mill. enheter i Norge, mot ~229 000 norsk bunn-opp",
        "~210 000 enheter i Norge, mot ~229 000 regnet direkte fra 2,65 mill. norske husholdninger med 95 % dekning og 11 års levetid. Samme størrelsesorden, og avviket forklares av at norske husholdninger er mindre enn de europeiske",
        "~210 000 i Norge, mot ~23 000 norsk bunn-opp"],
      answer: 2,
      why: "Grepet er å gjøre den ene beregningen topp-ned og krysspeile med den andre bunn-opp. 17 mill. × 5,6/450 ≈ 210 000, mens 2,65 mill. × 0,95 / 11 ≈ 229 000. Under 10 % fra hverandre er langt bedre enn kravet — kravet er bare samme tierpotens. Du sier begge tallene høyt og lander på «rundt 220 000»." } },

  /* ---------- 14 · topp-ned, frekvensdrevet ---------- */
  { oppg: "Hvor mange kopper te drikkes i Storbritannia per dag?",
    steg: [
      { sp: "Storbritannia har 68 mill. innbyggere. Anta at ~60 % drikker te jevnlig. Hvor stor er brukergruppen?",
        options: ["~41 mill.", "~68 mill.", "~410 mill.", "~4 mill."], answer: 0,
        why: "68 × 0,60 ≈ 41 mill. Bruker mot ikke-bruker er alltid første filter i et forbruksestimat. Andelen er satt høyt fordi te er kulturelt dominerende der; i et land uten den tradisjonen ville du satt den langt lavere, og det valget skal begrunnes høyt." },
      { sp: "En te-drikker tar i snitt ~3 kopper om dagen. Hvor mange kopper per dag i landet?",
        options: ["~1,2 mrd.", "~45 mrd.", "~12 mill.", "~122 mill."], answer: 3,
        why: "41 × 3 ≈ 122 mill. kopper per dag. Frekvensen er den forutsetningen som svinger mest — halverer du til 1,5 kopper, halveres svaret. Oppgi derfor et spenn i stedet for et punkt: 90–150 mill. kopper per dag." },
      { sp: "Hvor mange kopper blir det på et år?",
        options: ["~45 mrd.", "~450 mrd.", "~4,5 mrd.", "~15 mrd."], answer: 0,
        why: "122 mill. × 365 ≈ 45 mrd. kopper i året. Rund 365 til 350 om du regner i hodet: 122 × 3,5 = 427, altså ~43 mrd., og du flagger at du rundet ned. Merk at spørsmålet var per dag — svar på det som ble spurt om, og gi årstallet som tillegg." },
    ],
    sanity: { sp: "Sanity-sjekk baklengs: 122 mill. kopper fordelt på hele befolkningen på 68 mill. Hva blir det?",
      options: [
        "~18 kopper per brite per dag, som er fysisk urimelig",
        "~180 kopper per brite per dag",
        "~0,18 kopper per brite per dag, for lite til å bære en tekultur",
        "~1,8 kopper per brite per dag i snitt, inkludert de 40 % som ikke drikker te i det hele tatt. Høyt, men gjenkjennelig for Storbritannia — anslaget står"], answer: 3,
      why: "Grepet er baklengs til per capita over hele basen, ikke bare brukerne. 122 / 68 ≈ 1,8. Sjekken er verdifull nettopp fordi den er intuitiv: du vet hva to kopper te om dagen betyr, mens 122 millioner ikke sier deg noe som helst. Anslaget er grovt, men ligger i samme sjikt som det som vanligvis oppgis for Storbritannia." } },

];
