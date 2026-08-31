/* ===================== CASEINTERVJU · FLASHCARDS =====================
   Begrepskortene til hele kurset. Formelkortene lages IKKE her — de
   genereres automatisk fra de 44 radene i tallarket (k15), så alt som står
   der skal du ikke skrive inn på nytt.

   id-ene er lagringsnøkler for spaced repetition. Endrer du en id, mister
   kortet hele repetisjonshistorikken sin. De begynner derfor på fc10:
   fc1–fc4 er allerede tatt i fag/case/data.js.

   Formen på et kort:
     front  spørsmålsstilling i ren tekst, kort nok til å leses på et blunk.
            «MECE» er en overskrift, ikke et kort — det tvinger ikke fram
            gjenkalling. Spør etter noe du må hente opp.
     back   rå HTML, fire til seks linjer. Ett kort svarer på én ting; må
            baksiden ha to avsnitt om ulike temaer, er det to kort.

   Ingenting som er ferskvare skal inn her — rekrutteringsfrister, portaler
   og testleverandører endrer seg og hører ikke hjemme i en repetisjonskø.
   ===================================================================== */
window.EDU_DATA = window.EDU_DATA || {};
/* Legges TIL, ikke tilordnes: fc1–fc4 ligger i data.js. Id-ene er
   lagringsnøkler for spaced repetition og må aldri endres i ettertid. */

window.EDU_DATA.flashcards = (window.EDU_DATA.flashcards || []).concat([

  /* ---------- k1 · Hva caseintervjuet faktisk måler ---------- */
  { id: "fc10", ch: 1, deck: "begrep",
    front: "Hvilke fire ting vurderes i et caseintervju, uansett hvilket hus du sitter hos?",
    back: "<b>Struktur.</b> Deler du et ukjent problem i biter som verken overlapper eller etterlater hull — og er bitene <i>dette</i> problemets biter?<br><b>Kvantitativt håndverk.</b> Regner du riktig, raskt nok, og sier du framgangsmåten høyt så noen kan følge deg?<br><b>Dømmekraft.</b> Ser du hva tallet betyr, skiller du symptom fra årsak, og vet du når du har nok til å konkludere?<br><b>Kommunikasjon.</b> Kommer svaret først, tåler du å bli motsagt?<br><br>Ordene varierer mellom husene. Innholdet gjør det ikke." },

  { id: "fc11", ch: 1, deck: "begrep",
    front: "Du vet ikke om casen er interviewer-led eller candidate-led. Hva spør du om, og hva endrer svaret?",
    back: "«Vil du at jeg skal drive casen fremover, eller foretrekker du å lede meg gjennom?» Det er helt legitimt, og tar to sekunder.<br><br><b>Interviewer-led:</b> svar skarpt på akkurat det som spørres om. Farligste feil er å vandre av gårde i egen retning.<br><b>Candidate-led:</b> si hva du vil se på og hvorfor, uten å bli bedt om det. Farligste feil er å vente på neste spørsmål.<br><br>Å bomme på modusen er å bomme på hele intervjuet — samme svar scorer motsatt i de to." },

  /* ---------- k2 · Husene og prosessene ---------- */
  { id: "fc12", ch: 2, deck: "begrep",
    front: "Hvorfor er McKinsey-casen interviewer-led, og hva betyr det for oppførselen din?",
    back: "Fordi casen er skrevet av et sentralt team og distribuert med manus: alle kandidater får de samme spørsmålene i samme rekkefølge.<br><br>Du eier <b>innholdet i hvert delsvar</b> — ikke prosessen. Å kjøre ditt eget løp gjennom treet leses ikke som initiativ, men som at du har bommet på formatet.<br><br>Konsekvensen: avbrytelser er normalen, ikke et faresignal. Tren på å bli avbrutt, ikke på uforstyrrede monologer." },

  /* ---------- k3 · Å bryte ned et problem ---------- */
  { id: "fc13", ch: 3, deck: "begrep",
    front: "Hvilke fem snittflater gir garantert MECE-dekning?",
    back: "<b>Algebra</b> — en ligning der leddene til sammen <i>er</i> svaret.<br><b>Prosess</b> — en sekvens med start, midt og slutt.<br><b>Konseptuelt</b> — idékategorier du lager for akkurat dette problemet.<br><b>Segmentering</b> — skiver av samme populasjon.<br><b>Motsatte ord</b> — et begrep og komplementet.<br><br>De er verktøy, ikke maler. «Motsatte ord» er den raskeste og den svakeste; kombinasjonen algebra + prosess + segmentering er det som produserer driverbaserte trær." },

  { id: "fc14", ch: 3, deck: "begrep",
    front: "Hva er den ordentlige testen på om nedbrytningen din er MECE?",
    back: "<b>Kan du sette likhetstegn mellom grenene og resultatet?</b><br><br>Er leddene lik svaret, kan ingenting utenfor leddene flytte svaret. Det er aritmetikk, ikke retorikk — og derfor er en identitet tryggere enn enhver temaliste.<br><br>«Marked, konkurranse, intern drift, regulering» har ingen synlig overlapp og består derfor den <i>overfladiske</i> testen. Men det er en innholdsfortegnelse, og innholdsfortegnelser har hull du ikke kan se: her mangler for eksempel miks." },

  { id: "fc15", ch: 3, deck: "begrep",
    front: "Hvilke fire regler avgjør hvilken akse du deler treet langs?",
    back: "<b>1. Start med målfunksjonen.</b> Hva maksimeres, under hvilken beskrankning? Er den bindende beskrankningen tid eller tilgang, bygges treet rundt den — ikke rundt markedet.<br><b>2. Velg aksen der du venter spredning.</b> 40 hoteller gir 40 like grener; direkte booking mot portal gir to systematisk ulike.<br><b>3. Én akse per nivå.</b> «Ferskvare» og «kampanjesalg» side om side gir overlapp.<br><b>4. Velg aksen klienten kan handle på.</b> «Kostnad per kilo» er et tall; «fôrfaktor per lokalitet» er et tall noen kan gjøre noe med i morgen." },

  { id: "fc16", ch: 3, deck: "begrep",
    front: "Hvor dypt skal en gren gå før du stopper?",
    back: "Ned til grenen navngir <b>noe et menneske kan endre</b>, eller <b>et tall som finnes i klientens egne systemer</b>.<br><br>«Kostnader» er ingen av delene. «Lønnstimer per åpningstime på ferskvaredisken» er begge.<br><br>På bredden: tre eller fire hovedgrener holder. Fem eller flere leses som manglende prioritering." },

  { id: "fc17", ch: 3, deck: "begrep",
    front: "Hvorfor er et perfekt symmetrisk issue tree et svakhetstegn?",
    back: "Fordi symmetrien forteller intervjueren én ting: at du <b>ikke har en mistanke</b>.<br><br>Et godt tre er asymmetrisk. Du går tre nivåer ned i grenen du mistenker, og ett nivå i resten — resten står der som sammenlikningsgrunnlag.<br><br>Asymmetrien <i>er</i> prioriteringen, gjort synlig. Og prioritering er en av tingene som faktisk vurderes." },

  { id: "fc18", ch: 3, deck: "begrep",
    front: "Hva må være med når du framfører strukturen høyt?",
    back: "<b>Top-down.</b> Alle overskriftene først, så dybden — intervjueren skal vite hvor mange grener som kommer.<br><b>Si hva du legger bort, og hvorfor.</b> Billigste måten å vise dømmekraft på, og eneste måte å bevise at utelatelsen var et valg.<br><b>Avslutt med hypotese, startgren og datauttrekk.</b> Uten dette er strukturen ferdig, men casen har ikke begynt.<br><b>Snakk i hele setninger.</b> Stikkord høres ut som en huskeliste uansett hvor god nedbrytningen er.<br><br>Hardt tak: rundt to minutter." },

  /* ---------- k4 · Hypotesedrevet arbeid ---------- */
  { id: "fc19", ch: 4, deck: "begrep",
    front: "Tre ting sies stadig i stedet for en hypotese. Hvilke, og hva er galt med dem?",
    back: "«Jeg starter på inntektssiden og går så til kostnadene» — en <b>rekkefølge</b>. Den sier hva du skal gjøre, ikke hva du tror om verden, og kan ikke motbevises av noe tall.<br>«Fallet kan skyldes pris, volum eller miks» — en <b>mulighetsliste</b>, treet lest baklengs. Sann uansett hva dataene viser.<br>«Jeg tror dette er et lønnsomhetsproblem» — en <b>omformulering av prompten</b>.<br><br>En hypotese er en påstand om hvilken gren som bærer problemet, formulert så den kan tape." },

  { id: "fc20", ch: 4, deck: "begrep",
    front: "Hvordan tester du på to sekunder om det du sa faktisk var en hypotese?",
    back: "<b>1. Peker den på én gren og bort fra minst én annen?</b> «Det ligger i ferskvare og ikke i prisbildet» gjør begge deler. «Det kan være flere ting» gjør ingen av dem.<br><b>2. Kan noen levere deg et tall i morgen som gjør den usann?</b> Kan du ikke navngi det tallet, har du skrevet en formulering.<br><br>Derfor følges hypotesen alltid av en setning som begynner med «<b>Testen er …</b>» og navngir en tabell et menneske faktisk kunne trukket ut av klientens systemer." },

  { id: "fc21", ch: 4, deck: "begrep",
    front: "Hva er poenget med hypotesen — å få rett, eller noe annet?",
    back: "Å ha <b>tatt feil raskt</b>. Hypotesen er en søkeretning, ikke et standpunkt du skal forsvare.<br><br>Poenget er ikke å ha rett i minutt sju. Det er å bli motbevist i minutt elleve, slik at de siste ti minuttene brukes riktig sted.<br><br>En kandidat som forkaster hypotesen sin på et tall og sier hva hun gjør i stedet, scorer <b>høyere</b> enn en som fikk rett uten å ha risikert noe. Den vanligste måten å ødelegge en god hypotese på, er å bli glad i den." },

  { id: "fc22", ch: 4, deck: "begrep",
    front: "Et tall velter hypotesen din. Hvilke tre ledd har svaret, i rekkefølge?",
    back: "<b>1. Erkjenn.</b> «Da faller hypotesen min.»<br><b>2. Si hva det utelukker.</b> «Det betyr at netto pris ikke er kilden, og at kostnad per solgte rom er det eneste leddet igjen som er stort nok.»<br><b>3. Oppgi neste trekk.</b> «Jeg vil derfor se på lønnstimer per solgte rom, splittet på fast og innleid.»<br><br>Elleve sekunder — og hele forskjellen på en kandidat som ble <i>motbevist</i> og en som ble <i>stoppet</i>." },

  { id: "fc23", ch: 4, deck: "begrep",
    front: "Hvordan fordeles tiden i en case på 20–25 minutter?",
    back: "<b>2–3 min</b> bakgrunn, oppsett og gjentakelse.<br><b>4–5 min</b> struktur — men under to minutter på selve framføringen.<br><b>8–10 min</b> løsningsbygging: grave etter tall og teste hypotesen.<br><b>3–5 min</b> matte og eksponater.<br><b>2–3 min</b> syntese og anbefaling.<br><br>Konsekvensen: bruker du fire minutter på strukturen, stjeler du dem fra løsningsbyggingen — ikke fra pausen." },

  /* ---------- k5 · Casetypene ---------- */
  { id: "fc24", ch: 5, deck: "begrep",
    front: "De sju casetypene — hvilket spørsmål ligger bak hver av dem?",
    back: "<b>Lønnsomhet:</b> hvilken gren bærer matematisk fallet?<br><b>Markedsinngang:</b> er markedet attraktivt — og hvorfor akkurat oss?<br><b>M&amp;A:</b> er A+B verdt mer enn A og B hver for seg, og klarer vi å hente det ut?<br><b>Prising:</b> hvor ligger gulvet, taket — og hva er egentlig målet?<br><b>Vekst:</b> hvilke vekstveier er store nok til å bety noe?<br><b>Kostnad og operations:</b> hvor er flaskehalsen, og er kuttet strukturelt?<br><b>Estimering:</b> hvilken kjede av kjente størrelser lander på dette tallet?" },

  { id: "fc25", ch: 5, deck: "begrep",
    front: "Hvorfor må miks stå som egen gren i et lønnsomhetstre?",
    back: "Fordi et rent pris/volum-tre ikke fanger den i det hele tatt.<br><br><b>År 1:</b> 100 enheter — 80 av A (10 kr margin) og 20 av B (40 kr) = 800 + 800 = <b>1 600 kr</b>.<br><b>År 2:</b> fortsatt 100 enheter og uendrede priser, men miksen er 90/10 = 900 + 400 = <b>1 300 kr</b>.<br><br>Volum flatt, pris urørt, margin ned 19 %. Miksforskyvning er den vanligste årsaken til fallende margin overhodet." },

  { id: "fc26", ch: 5, deck: "begrep",
    front: "Markedsinngang: hvilke fire spørsmål, og hvor ryker de fleste?",
    back: "<b>1. Er markedet attraktivt?</b> Størrelse, vekst, segmenter, konsentrasjon, regulering, barrierer.<br><b>2. Kan vi vinne der?</b> Kapabilitet, differensiering, konkurrentenes sannsynlige respons.<br><b>3. Lønner det seg?</b> Marked × oppnåelig andel × margin − inngangskostnad, breakeven, alternativkostnad.<br><b>4. Hvordan går vi inn?</b> Bygge, kjøpe eller joint venture — og timing.<br><br>De fleste ryker i punkt 2: de regner grundig på markedet og glemmer kapabiliteten." },

  { id: "fc27", ch: 5, deck: "begrep",
    front: "Hvordan kan en teknisk korrekt synergianalyse føre til et tapsbringende oppkjøp?",
    back: "Ved å telle hva som <b>skapes</b>, uten å spørre hva som <b>betales</b>.<br><br>Kjøper betaler en premie. Er prisen høy nok, tilfaller hele synergien selger — og analysen kan være riktig regnet hele veien.<br><br>Ta derfor alltid med realiseringskostnaden og tiden det tar. En synergi uten pris og uten kalender er en påstand, ikke et tall." },

  { id: "fc28", ch: 5, deck: "begrep",
    front: "Hvordan finner du flaskehalsen — og hvordan finner du den ikke?",
    back: "Du finner den ved å sammenligne <b>hvert trinns kapasitet mot etterspørselen inn i trinnet</b>.<br><br>Du finner den <i>ikke</i> ved å lete etter trinnet som ser tregest ut.<br><br>Siden flaskehalsen bestemmer gjennomstrømningen for hele systemet, gir det null effekt å optimalisere et trinn som ikke er den — og det er den vanligste feilen i operations-caser. Regn heller aldri med full utnyttelse; ingen anlegg har det." },

  /* ---------- k6 · Hoderegning ---------- */
  { id: "fc29", ch: 6, deck: "begrep",
    front: "Hvilken hoderegningsfeil er den vanligste, og hva er den mekaniske motgiften?",
    back: "<b>Å miste en tierpotens.</b> Symptomet er at svaret er tusen ganger for stort eller for lite, mens kandidaten regner videre uanfektet.<br><br>Motgiften: del hvert tall i <b>sifre og tierpotens</b>, regn de to som atskilte regnestykker, og sett dem sammen først til slutt. Skriv potensen som eget tall i margen, og kontroller den før du kontrollerer sifrene.<br><br>32 × 25 000: sifrene 32 × 25 = 800, nullene 10³ → 800 000.<br>1,4 mrd × 350: 1,4 × 3,5 = 4,9, og 10⁹ × 10² = 10¹¹ → 490 mrd." },

  { id: "fc30", ch: 6, deck: "begrep",
    front: "Hvordan bygger du enhver prosent i hodet?",
    back: "Ingen prosentregning gjøres direkte. Alt bygges av to ankere: <b>10 % er å dele på 10</b>, <b>1 % er å dele på 100</b>. Resten er addisjon og subtraksjon.<br><br>5 % = halve 10 %-en · 15 % = 10 % + 5 % · 18 % = 20 % − 2 % · 35 % = 25 % + 10 %.<br><br>18 % av 250: ta 20 % = 50. Du rundet 18 opp til 20, altså 10 % for mye (2 av 20). Trekk fra 10 %: 50 − 5 = <b>45</b>." },

  { id: "fc31", ch: 6, deck: "begrep",
    front: "Prisen falt 20 % til 1 200 kr. Hva var opprinnelig pris — og hvorfor er 1 440 galt?",
    back: "<b>1 500 kr.</b> 1 200 er 80 % av det opprinnelige, altså 1 200 / 0,8.<br><br>Regelen: <b>opprinnelig = ny verdi / (1 − fallet)</b>, ikke ny verdi × (1 + fallet).<br><br>Feilsvaret avsløres av kontrollen: 1 200 × 1,2 = 1 440, og 240 / 1 440 = 16,7 % — ikke 20 %. Prosenten ble regnet av det <i>gamle</i> tallet, så du må dele deg tilbake. 1 440 ligger ferdig utregnet som svaralternativ i enhver flervalgstest." },

  { id: "fc32", ch: 6, deck: "begrep",
    front: "Hvilken vei skal du runde av, og hvorfor?",
    back: "<b>Rund én faktor opp og den andre ned</b>, så feilene motvirker hverandre. Runder du begge samme vei, dobler du feilen i stedet for å nulle den ut.<br><br>19 × 41 → 20 × 40 = 800. Fasit 779, altså 2,7 % bom. Godt nok.<br>19 × 39 → 20 × 40 = 800 er derimot 8 % bom (fasit 741), fordi begge ble rundet opp. Riktig her: 20 × 39 = 780, minus 39 = <b>741</b> eksakt.<br><br>Tommelfingerregel: ikke rund mer enn 10 % på ett enkelt ledd." },

  { id: "fc33", ch: 6, deck: "begrep",
    front: "Hvordan gjør du «hvor mange prosent er 55 av 440» til et oppslag?",
    back: "Snu brøken: 440 / 55 = 8, altså 1/8, altså <b>12,5 %</b>. Gjør aldri lang divisjon i et intervju — gjenkjenn brøken.<br><br>Tabellen må sitte begge veier: 1/6 = 16,7 · 1/7 = 14,3 · 1/8 = 12,5 · 1/9 = 11,1 · 1/11 = 9,1 · 1/12 = 8,3 · 3/8 = 37,5 · 5/8 = 62,5.<br><br>Snarveien som følger: å dele på 9 er å dele på 10 og legge til rundt 11 %. 4 500 / 10 = 450, pluss 11 % ≈ 500." },

  { id: "fc34", ch: 6, deck: "begrep",
    front: "Hvordan sier du et regnestykke høyt så det faktisk scorer?",
    back: "<b>1. Si formelen før tallene.</b> Da kan intervjueren korrigere oppsettet før du har brukt tid på feil regnestykke.<br><b>2. Si størrelsesorden først.</b> «Dette lander i milliarder, ikke millioner — la meg finne sifrene.»<br><b>3. Si enheten hver gang.</b> «Åttehundre — <i>millioner kroner</i> — <i>per år</i>.»<br><b>4. Aldri stille i mer enn 15–20 sekunder.</b> Si hva du regner på i stedet for å gå i svart.<br><b>5. Lever hodetallet først, tolkningen etterpå.</b> Et tall uten tolkning er et halvt svar." },

  /* ---------- k7 · Estimering ---------- */
  { id: "fc35", ch: 7, deck: "begrep",
    front: "Topp-ned eller bunn-opp — hva avgjør valget, og hva gjør du etterpå?",
    back: "Har markedet en naturlig <b>makrostørrelse over seg</b> (befolkning, husholdninger, BNP), går du topp-ned. Er det <b>kapasitet som setter grensen</b>, går du bunn-opp fra én enhet — et markedstall gir deg ingen ligning å regne i.<br><br>Best praksis er å gjøre den ene og <b>krysspeile</b> med den andre. Kravet er ikke at de to møtes, men at de havner i samme tierpotens.<br><br>Den vanligste svakheten er ikke å velge feil, men å velge uten å si at man valgte." },

  { id: "fc36", ch: 7, deck: "begrep",
    front: "Hva er levetidstrikset, og hvorfor er det tryggere enn å gjette kjøpsfrekvens?",
    back: "<b>Årlig marked = installert base / gjennomsnittlig levetid (+ vekst i basen)</b><br><br>Du snur oppgaven: i stedet for å gjette hvor mange som kjøper i år, teller du hvor mange som <i>eier</i>, og lar levetiden fortelle hvor mange som må skiftes ut. Et modent marked selger nesten bare erstatninger — og eierskap har du egen erfaring med, mens kjøpsfrekvens ikke er noe du kjenner.<br><br>Nye personbiler: 2,9 mill. / 17 år ≈ 170 000, pluss ~15 000 i vekst = <b>185 000</b>. Faktisk 2025: 184 705." },

  { id: "fc37", ch: 7, deck: "begrep",
    front: "Hvilken segmenteringsakse koster mest å bomme på i en estimering?",
    back: "<b>Husholdning mot individ.</b><br><br>TV, bil, vaskemaskin, hund og strømmeabonnement kjøpes én gang per <i>hjem</i>. Teller du dem per person, dobler du svaret — og feilen ser plausibel ut hele veien ned.<br><br>Andre akser som betaler seg: alder, by mot land, bruker mot ikke-bruker, og nysalg mot erstatningssalg.<br><br>Og segmenter ikke for langt: tre filtre er som regel nok, fire er ett for mye. Hvert filter må gjøre svaret <i>mer presist</i>, ikke bare mer detaljert." },

  { id: "fc38", ch: 7, deck: "begrep",
    front: "Hvilke fem sanity-grep avslutter en estimering, og hvorfor er sluttsteget obligatorisk?",
    back: "<b>1. Størrelsesorden</b> — sjekk potensen før sifrene.<br><b>2. Per capita eller per husholdning</b> — del på 5,6 mill. eller 2,65 mill. og hør om tallet er absurd.<br><b>3. Benchmark</b> — dagligvare er den beste norske målestokken; nesten alle forbrukermarkeder skal ligge godt under den.<br><b>4. Retningssjekk</b> — endre én forutsetning og se om svaret beveger seg riktig vei.<br><b>5. Baklengs til én forutsetning</b> — det sterkeste grepet.<br><br>Det er ikke regnefeilen som feller kandidaten, men at hun ikke oppdager at svaret er urimelig. Bruk minst to, og si begge høyt." },

  /* ---------- k8 · Figurlesing ---------- */
  { id: "fc39", ch: 8, deck: "begrep",
    front: "Du får et ark med en figur. Hva gjør du de første tretti sekundene?",
    back: "<b>1.</b> Be om et halvt minutt — det er forventet og teller positivt.<br><b>2.</b> Les tittelen høyt, bokstavelig.<br><b>3.</b> Les akser, enheter og fotnote høyt — og si y-aksens <b>startverdi</b> som eget ord. Det er der fellen ligger, hver gang.<br><b>4.</b> Parafraser hva figuren viser, og be om bekreftelse.<br><b>5.</b> Én observasjon, så én implikasjon — ikke les opp alle tallene.<br><b>6.</b> Koble tilbake til spørsmålet du stilte, og si hva du vil vite videre." },

  { id: "fc40", ch: 8, deck: "begrep",
    front: "Hvilke ni feller er caseeksponater konstruert rundt?",
    back: "<b>1</b> Aksekutt · <b>2</b> Indeks lest som absolutt · <b>3</b> Prosent av prosent<br><b>4</b> Miksendring skjult bak flat total · <b>5</b> Korrelasjon lest som årsak<br><b>6</b> Enhet i overskrift eller fotnote · <b>7</b> Betinget informasjon i spørsmålet<br><b>8</b> Areal-illusjon i Mekko · <b>9</b> Manglende data — der riktig svar er å be om tallet du mangler<br><br>Figuren er nesten alltid laget slik at den <i>nærmeste</i> tolkningen er den gale. Ikke for å lure deg, men fordi det er nettopp den forskjellen som skal vurderes." },

  { id: "fc41", ch: 8, deck: "begrep",
    front: "Hvorfor kan du ikke forstå deg ut av aksekutt-fellen?",
    back: "Fordi persepsjonen leverer svaret sitt før tenkningen slipper til. Effekten <b>vedvarer etter opplæring</b>, og grafkompetanse beskytter ikke — over fem studier ble 83,5 % av deltakerne påvirket.<br><br>Det eneste som virker er en mekanisk vane, sagt ordrett hver gang: «<i>Y-aksen starter på 90, ikke på null, så jeg leser tallene og ikke høyden. Fra 94 til 98 er 4 av 94, altså 4,3 prosent.</i>»<br><br>Si den også når aksen faktisk starter på null. Da er den gratis og tar to sekunder." },

  { id: "fc42", ch: 8, deck: "begrep",
    front: "Segment A går fra indeks 100 til 130, B fra 100 til 110. Hvem vokser mest?",
    back: "<b>Det kan du ikke vite.</b> En indeks sier ingenting om nivå.<br><br>Er A 200 mill. kr i basisåret, vokser det 60 mill. Er B 3 000 mill., vokser det 300 mill. — fem ganger så mye, med en tredjedel av vekstraten.<br><br>Den bratteste kurven kan altså tilhøre det minste segmentet. Spør etter <b>basisåret i kroner</b> før du sier noe som helst om hvem som er størst, og husk at 120 ikke er 120 enheter." },

  { id: "fc43", ch: 8, deck: "begrep",
    front: "Mekko: bredeste søyle er 18 mrd med 8 % andel, en smalere er 10 mrd med 22 %. Hvilken er størst for oss?",
    back: "<b>Den smale.</b> 18 mrd × 8 % = <b>1,44 mrd</b>, mens 10 mrd × 22 % = <b>2,20 mrd</b>.<br><br>I et mekko er bredden markedsstørrelse, høyden vår andel — og det er <b>arealet</b> som er kroner. Den bredeste søylen er her nest minst i kroner.<br><br>Regn arealet før du peker. Øyet leser bredde, ikke produkt." },

  { id: "fc44", ch: 8, deck: "begrep",
    front: "En region vokser 30 %, en annen 55 %. Hvilken bidrar mest til veksten?",
    back: "<b>Det avhenger av hvilken nevner spørsmålet ber om</b> — vekstrate og vekstbidrag er to ulike tall, og begge kan være riktige.<br><br>Regionen som vokser 240 mill. fra en base på 800 har en vekstrate på 30 %, men står for 240 av 520 mill. i samlet vekst, altså <b>46 % av veksten</b>. Den som vokser 55 %, bidrar bare 220 mill.<br><br>Dette er fellen som glir lettest gjennom, nettopp fordi ingen av tallene er gale." },

  { id: "fc45", ch: 8, deck: "begrep",
    front: "Hva er den vanligste svake figurbesvarelsen, og hvilken form har en sterk?",
    back: "Den svake er ikke feil — den er en <b>oppramsing</b>. Kandidaten leser høyt det figuren allerede sier, og stopper der. «Nye kunder er doblet» er halve observasjonen, og skårer nesten ingenting.<br><br>Formen som scorer: <b>observasjon → implikasjon → hva du vil vite videre.</b><br><br>«Totalen er uendret, men lojale kunder er ned en tredjedel. Vi lekker kunder like fort som vi skaffer dem, så anskaffelseskostnaden er doblet uten at basen har vokst. Jeg vil se churn per kohort før jeg konkluderer.»" },

  /* ---------- k9 · Å snakke mens du tenker ---------- */
  { id: "fc46", ch: 9, deck: "begrep",
    front: "«Tenk høyt» — hva betyr det, og hva betyr det ikke?",
    back: "Det betyr <b>ikke</b> at hver halvtenkte idé skal ut. Ta en pause, velg hva som er verdt å dele, og del det ferdig formet.<br><br>Regelen som holder begge deler sammen er <b>topp-ned</b>: hver gang du åpner munnen, kommer konklusjonen først.<br><br>Bunn-opp: «Det er kaldt, og de fleste har gått, så jeg tror vi bør dra.» Topp-ned: «Jeg mener vi bør dra. For det første er det kaldt, for det andre har de fleste gått.» Rekkefølgen er den <i>eneste</i> forskjellen — men en lytter som får konklusjonen sist, gjetter." },

  { id: "fc47", ch: 9, deck: "begrep",
    front: "Hvilke tre ark ligger på bordet, og hva gjør hvert av dem?",
    back: "Alle i <b>landskapsformat</b>, så trær og tabeller får plass.<br><br><b>Innsiktsarket:</b> klientnavn, prompt og mål øverst til venstre, alt du får vite underveis på høyre side. Dette arket forlater du aldri — det er dette du synteserer fra.<br><b>Strukturarket:</b> issue-treet. Det er dette du eventuelt snur mot intervjueren.<br><b>Regnearket:</b> nytt ark for hvert regnestykke, ikke et hjørne av et gammelt.<br><br>Kandidater som mister tråden i anbefalingen, mistet den i notatene — ikke i hodet." },

  { id: "fc48", ch: 9, deck: "begrep",
    front: "Intervjueren sier at du tar feil. Hvilket ene spørsmål avgjør hva du gjør?",
    back: "<b>Kom det et faktum jeg ikke hadde?</b> Det er hele skillet.<br><br><b>Ny informasjon</b> → du skal snu, og si høyt hvorfor: «Med den kostnadsstrukturen faller argumentet mitt. Jeg reviderer til …»<br><b>Ingen ny informasjon</b> → det er press-testing, og da blir du stående: «Jeg har tenkt på det, og jeg blir stående — av to grunner.»<br><br>Å endre mening på grunnlag av data er styrke. Å endre mening fordi intervjueren løftet et øyenbryn, er svakhet. Samme handling utenfra, motsatt vurdering." },

  /* ---------- k10 · Syntesen ---------- */
  { id: "fc49", ch: 10, deck: "begrep",
    front: "Hva er RRRN, og hvorfor kan ikke rekkefølgen byttes om?",
    back: "<b>R</b>ecommendation · <b>R</b>easoning · <b>R</b>isks · <b>N</b>ext steps.<br><br><b>Anbefalingen først</b>, fordi den bestemmer hvordan alt annet blir hørt. Får lytteren den sist, bygger hun sin egen hypotese underveis og gjetter halve tiden feil.<br><b>Grunnene etter</b>, fordi et funn ikke betyr noe før man vet hva det skal bære.<br><b>Risikoen etter grunnene:</b> et forbehold sagt <i>før</i> standpunktet leses som at du ikke tør — det samme forbeholdet etter leses som dømmekraft.<br><b>Neste steg sist</b>, fordi det er det eneste leddet som krever noe av henne." },

  { id: "fc50", ch: 10, deck: "begrep",
    front: "Hvordan skiller du en syntese fra en oppsummering?",
    back: "<b>Testen:</b> kan første setning stå alene i et styrereferat, uten resten? Da er det syntese. Må den ha med seg de fem foregående setningene for å bety noe, er det oppsummering.<br><br>Fire forskjeller: <b>verbene</b> (hva du gjorde, mot hva klienten skal gjøre), <b>rekkefølgen</b> (kronologisk mot topp-ned), <b>tallene</b> («steget en del» mot «fem prosentpoeng, 78 millioner i året») og <b>standpunktet</b> («det ser ut som» mot «jeg anbefaler»)." },

  { id: "fc51", ch: 10, deck: "begrep",
    front: "Hvordan fordeles de seksti sekundene i anbefalingen?",
    back: "<b>10–15 sek anbefaling:</b> ett verb og ett objekt. «Kjøp Sørbakst.» Ingen «det avhenger av».<br><b>25–30 sek grunner (2–3):</b> ett tall fra casen per grunn, nummerert høyt.<br><b>10 sek risiko (1–2):</b> risikoen <i>anbefalingen din skaper</i>, ikke en generisk risiko.<br><b>10 sek neste steg:</b> noe klienten kan gjøre denne uken.<br><br>Be om et halvminutt og skriv to–tre stikkord per ledd først. Å improvisere syntesen er unødvendig risiko på det tidspunktet som teller mest." },

  { id: "fc52", ch: 10, deck: "begrep",
    front: "Hva skiller en grunn som teller fra en som ikke gjør det?",
    back: "En grunn må være et <b>funn fra de siste 25 minuttene</b> — ikke en sannhet om verden.<br><br>«Markedet vokser raskt» → «markedet er 1,2 milliarder i dag og 1,9 om tre år».<br>«Kostnadene har økt betydelig» → «filmleien er opp 132 millioner; ingen annen post har flyttet seg mer enn 10».<br><br>Tre regler: si tallet som tall og ikke som adjektiv, stopp på tre grunner (fire signaliserer at du ikke har prioritert), og nummerer dem høyt så lytteren vet når du er ferdig med én." },

  { id: "fc53", ch: 10, deck: "begrep",
    front: "Tallene peker begge veier. Hvordan lander du nyansert uten å bli vag?",
    back: "«Det avhenger» er ikke et svar — det er en beskrivelse av at du ikke har tatt stilling. Tre måter:<br><b>Betinget anbefaling med navngitt terskel:</b> «Ja, hvis frafallet holder seg under ti prosent.»<br><b>Trinnvis:</b> «Ja til 20 stasjoner nå, opsjon på de neste 40» — du reduserer innsatsen i stedet for å utsette beslutningen.<br><b>Anbefal testen som avgjør:</b> «Bruk seks uker på å måle oppetiden; er den over 90 prosent, blir dette et ja.»<br><br>Og navngi alltid <b>tallet som ville snudd deg</b>." },

  /* ---------- k11 · Historiene ---------- */
  { id: "fc54", ch: 11, deck: "begrep",
    front: "Hvilke fire dimensjoner er PEI bygget på — og hva het de før?",
    back: "<b>Leadership</b> (før Inclusive Leadership) — du fikk folk til å trekke sammen, særlig noen som ikke måtte høre på deg.<br><b>Connection</b> (før Personal Impact) — du overbeviste noen som var uenig, og forsto hvorfor de mente det.<br><b>Drive</b> (før Entrepreneurial Drive) — du satte i gang noe selv og drev det gjennom motstand.<br><b>Growth</b> (før Courageous Change) — du tok en risiko eller feilet, og vet hva du lærte.<br><br>Navnene ble byttet i 2025 uten at innholdet endret seg. Si aldri dimensjonsnavnet høyt i rommet — det avslører prep-materialet." },

  { id: "fc55", ch: 11, deck: "begrep",
    front: "Hva graver oppfølgingsspørsmålene i en PEI-økt egentlig etter?",
    back: "Du får <b>én dimensjon per intervju</b>, og intervjueren graver i <b>én historie</b> i hele tidsvinduet — typisk 10–25 oppfølgingsspørsmål.<br><br>De graver i <b>beslutningene dine, ikke i utfallet</b>. Diagnosen er entydig: kandidaten svarer på HVA, intervjueren spør om HVORFOR.<br><br>Det er en hard designbeskrankning på porteføljen: få historier, svært dypt gjennomarbeidet, slår mange grunne." },

  { id: "fc56", ch: 11, deck: "begrep",
    front: "Hvilke tre felter hopper flertallet over når de skriver en fit-historie?",
    back: "<b>Hva sto på spill.</b> Ikke oppgaven, men konsekvensen: hva ville gått galt hvis ingen gjorde noe?<br><b>Hvem var uenig, og hvorfor mente de det.</b> Halve jobben ligger i siste ledd — vet du bare <i>at</i> noen var uenig, har du ikke undersøkt historien.<br><b>Så derfor.</b> Én setning om hva utfallet betydde utover deg selv: ble rutinen beholdt året etter?<br><br>Det er disse tre som avgjør om historien overlever oppfølging nummer tre." },

  { id: "fc57", ch: 11, deck: "begrep",
    front: "Hvordan fordeles de to minuttene i åpningssvaret på en fit-historie?",
    back: "<b>Situasjon 15 sek:</b> hvor, når, hvem — ikke hva studentforeningen er.<br><b>Oppgave 10 sek:</b> ditt ansvar, og hva som sto på spill.<br><b>Handling 60–75 sek:</b> det du gjorde, sa og valgte bort. Dette <i>er</i> historien.<br><b>Resultat 15–25 sek:</b> tall, og «så derfor».<br><br>Så stopper du og lar dem grave. Begrunnelsene er ammunisjon til oppfølgingene, ikke til åpningen — for lang oppbygging er den vanligste formfeilen." },

  { id: "fc58", ch: 11, deck: "begrep",
    front: "Hvilke fire tall dømmer historieporteføljen din?",
    back: "<b>≥ 2 historier per dimensjon</b> — intervjuer to spør av og til om samme dimensjon som intervjuer én.<br><b>≤ 2 dimensjoner per historie</b> — merker du én historie med alt, dekker den ingenting.<br><b>≥ 4 ulike kontekster</b> — fire historier fra samme verv leses som ett liv med én erfaring.<br><b>≥ 8 av 12 sonder besvart</b> — under terskelen finner dybdeintervjuet bunnen før tiden er ute.<br><br>Mål: åtte distinkte historier, pluss to reserver." },

  { id: "fc59", ch: 11, deck: "begrep",
    front: "Hvilken feil nevner faktiske intervjuere oftest på fit-historier?",
    back: "<b>Analyse i stedet for empati</b> — historier om mennesker fortalt som problemløsningsøvelser.<br><br>Kandidaten forklarer hva hun analyserte seg fram til, men viser aldri at hun forsøkte å forstå <i>hvorfor</i> den andre var mot henne. Connection er en menneske-test, ikke en case.<br><br>Den beslektede feilen er å unnskylde skalaen: «det var jo bare en studentforening, men …» er den raskeste måten å devaluere en god historie. Du har bedt intervjueren om å score den lavt, og hun gjør som du sier." },

  /* ---------- k12 · Why consulting, why this firm ---------- */
  { id: "fc60", ch: 12, deck: "begrep",
    front: "Hva er byttetesten på «why this firm», og hva avslører den?",
    back: "Skriv svaret ned, <b>bytt firmanavnet</b>, og les det høyt. Overlever det byttet, har du beskrevet konsulentbransjen — ikke firmaet.<br><br>Fungerer «why BCG» ordrett på «why McKinsey», er det ikke et svar. Dette er den mest siterte enkeltdiagnosen i hele materialet, og den tar tretti sekunder å selvteste.<br><br>De fire ordene som avslører raskest, fordi alle bruker dem og ingen skiller: <i>bratt læringskurve, smarte kolleger, utfordrende problemer, globalt fotavtrykk</i>." },

  { id: "fc61", ch: 12, deck: "begrep",
    front: "Hva er den sterkeste enkeltmarkøren i et «why this firm»-svar?",
    back: "<b>En navngitt samtale med en ansatt</b> — hvem, hvilket prosjekt, og hva de sa som festet seg.<br><br>En samtale kan ikke googles og kan ikke kopieres til neste firma. Den består byttetesten av seg selv.<br><br>Andrevalget, hvis du ikke får tak i noen: koble deg til noe etterprøvbart og lokalt — en praksisgruppe, en rapport du faktisk har lest, eller hvordan Oslo-kontoret jobber mot norsk energi eller sjømat. Og si at det er førstevalget ditt, uten forbehold." },

  { id: "fc62", ch: 12, deck: "begrep",
    front: "Hva kreves av et «why consulting»-svar for at det skal si noe om deg?",
    back: "<b>Tre grunner, hver forankret i en konkret hendelse fra ditt eget liv.</b> Ikke tre adjektiver.<br><br>Sikt på 60–90 sekunder, og la det høres <i>ferdig</i> ut — ikke som om du gikk tom.<br><br>«Jeg liker variasjon og komplekse problemer, læringskurven er bratt, man jobber med flinke folk» er fire setninger med null informasjon om personen som sier dem. Alt kunne vært skrevet før du hadde en eneste erfaring." },

  { id: "fc63", ch: 12, deck: "begrep",
    front: "Hvilke tre typer spørsmål sløser bort de siste fem minuttene?",
    back: "<b>Googlebare:</b> «hva slags prosjekter jobber dere med?»<br><b>Selvsentrerte og for tidlige:</b> lønn, arbeidstid, forfremmelsestempo — vent til du har tilbud.<br><b>Ritualspørsmål:</b> «hvordan ser en typisk dag ut?» — besvart femti ganger, og svaret kommer på autopilot.<br><br>Det som virker er spørsmål <b>om personen foran deg</b> («hva liker du minst her?», «har du vært på et prosjekt som gikk galt?»), og ett om firmaet som virksomhet. Ha to til fire klare, tilpasset nivået på den du møter." },

  /* ---------- k13 · De digitale testene ---------- */
  { id: "fc64", ch: 13, deck: "begrep",
    front: "Feilalternativene i en numerisk test — hvor kommer de fra?",
    back: "De er ikke tilfeldige. De er <b>regnet ut fra dine egne vanligste feil</b>, ferdig utregnet og lagt fram som et alternativ som ser rimelig ut.<br><br>Reversert prosent · prosentpoeng forvekslet med prosent · feil enhet · snitt av alle rader i stedet for de betingede.<br><br>Marginen gikk fra 8 % til 10 %: økningen er <b>25 %</b>, men «2» står som alternativ, fordi det er økningen i prosentpoeng. Å øve mot slike alternativer er å øve mot egen slurv, ikke mot testen." },

  { id: "fc65", ch: 13, deck: "begrep",
    front: "Du har kalkulator på skjermen i Solve. Hvorfor gjør kandidatene feil likevel?",
    back: "Fordi feilene ikke er aritmetiske. De kommer fra <b>enhets- og tidsperiodemismatch</b>: en månedsrate ganget med et årstall, eller en verdi i tusen holdt mot en i hele kroner.<br><br>Testen straffer altså ikke regnehastighet, men slurv i <b>oppsettet</b> — nøyaktig samme feil som feller folk i den levende casen.<br><br>Ingen av de digitale testene måler forretningskunnskap. De måler filtrering, prosentlogikk og tempo, og alle tre kan drilles." },

  { id: "fc66", ch: 13, deck: "begrep",
    front: "Hva er den vanligste bortkastede uka i hele rekrutteringsprosessen?",
    back: "<b>Å trene på feil test.</b> Leverandøren varierer mellom hus og mellom geografier, og flere hus sender én av to ulike tester til ulike kandidater.<br><br>Motgiften tar to minutter: <b>åpne invitasjonsmailen og les hva som faktisk står der</b> før du kjøper et kurs eller bruker en helg.<br><br>På tabelloppgaver: les <i>spørsmålet</i> før tabellen, og hent så nøyaktig de to–tre tallene du trenger. Sjekk alltid enheten i overskriften eller fotnoten." },

  /* ---------- k14 · I rommet ---------- */
  { id: "fc67", ch: 14, deck: "begrep",
    front: "Prompten kommer. Hvilke tre ting skriver du ned, og hva gjør du så?",
    back: "Pennen ligger stille de første sekundene — se på personen, ikke på papiret. Skriv så tre ting og bare tre: <b>målet, tallet og spørsmålet</b>.<br><br>Deretter gjentar du det tilbake: «La meg gjenta, så jeg er sikker: resultatet har falt fra 111 til 78 millioner på tre år, mens besøket er flatt. Dere vil vite hvorfor, og hva de skal gjøre. Er det riktig oppfattet?»<br><br>Det kjøper deg femten sekunder og fanger misforståelser før de rekker å vokse." },

  { id: "fc68", ch: 14, deck: "begrep",
    front: "Du står helt fast midt i casen. Hvilke fire trekk, i rekkefølge?",
    back: "<b>1. Si hvor du er</b> — ikke <i>at</i> du er fast. Beskriv kanten av det du vet og navngi hullet. Dette løser situasjonen oftere enn noe annet, fordi du viser nøyaktig hvilket hull hun kan fylle.<br><b>2. Gå tilbake til målet.</b> Å stå fast betyr nesten alltid at du har drevet bort fra spørsmålet — og målet er også en filtreringsregel.<br><b>3. Gå tilbake til identiteten.</b> Hvilken gren har jeg ikke rørt? Et tre kan gås systematisk gjennom; en temaliste kan ikke.<br><b>4. Be om et tall.</b> En konkret dataforespørsel er aldri et dårlig trekk." },

  { id: "fc69", ch: 14, deck: "begrep",
    front: "Hvilke to trekk gjør det verre når du står fast?",
    back: "<b>Å gjette et tall for å fylle stillheten.</b> Nå må du forsvare noe du ikke tror på.<br><b>Å starte en ny struktur fra bunnen.</b> Det dyreste du kan gjøre i rommet: du kaster fem minutters arbeid, mister alt intervjueren allerede har akseptert, og bruker opp tiden du hadde igjen. Bygg videre på treet du har, selv om det ikke er perfekt.<br><br>Og skill de to måtene å stå fast på: står du fast i <b>regningen</b>, gå til formelen i ord øverst på regnearket. Står du fast i <b>retningen</b>, gå til målet." },

]);
