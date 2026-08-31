/* ===================== CASEINTERVJU · QUIZBANK =====================
   60 spørsmål (48 flervalg, 12 kortsvar) bygget på kapitlene k0–k15 i
   Case_Manual. Alt stoffet er hentet fra det manualen faktisk sier — ikke
   fra generell bransjekunnskap.

   id-ene starter på q10 fordi q1–q4 ligger i data.js. ID-en er
   lagringsnøkkel: endres den, mister han fremdriften på spørsmålet.

   Fasitposisjonen er jevnt fordelt: 12 på hver av A, B, C og D. Motoren
   stokker ikke alternativene, så en skjevhet gjør quizen gjettbar.
   Derfor: teller du om, skal det fortsatt bli 12/12/12/12.

   Ingen forklaring refererer til bokstaver («som i alternativ B»), fordi
   rekkefølgen kan endres senere.
   ================================================================== */
window.EDU_DATA = window.EDU_DATA || {};

window.EDU_DATA._quiz = [

  /* ---------- Kapittel 0 · Slik bruker du kurset ---------- */

  { id: "q10", ch: 0, oppg: 1, type: "mcq",
    q: "Kurset ber deg si alt høyt og regne på papir, også når du trener alene. Hva er begrunnelsen?",
    options: [
      "At hoderegning på papir går raskere enn i hodet",
      "At appen ikke kan vurdere noe du bare tenker",
      "At alt du skriver i appen, skal du i virkeligheten si — og å høre din egen stemme forklare et resonnement som ennå ikke er ferdig, er det som føles rarest å øve på alene og betyr mest",
      "At intervjueren vurderer stemmebruk og tempo som en egen dimensjon",
    ],
    answer: 2,
    explanation: "Poenget er overføringen til rommet, ikke verktøyet. Papiret er ikke raskere enn hodet — det er der utregningen blir synlig for begge parter. At appen ikke kan vurdere en tanke er sant, men det er ikke grunnen: appen er treningsapparat, rommet er prøven. Og <b>stemmebruk og tempo er ikke en egen vurderingsdimensjon</b> — det som scores, er at resonnementet lar seg følge, og en kandidat som snakker gjennom utregningen får høyere uttelling enn en like nøyaktig kandidat som regner stille.",
  },

  { id: "q11", ch: 0, oppg: 1, type: "mcq",
    q: "Du har få uker igjen og rekker ikke alt. Hva står øverst i prioriteringen, og hvorfor?",
    options: [
      "Hoderegning hver dag i korte økter, fordi det er den eneste ferdigheten som blir målbart bedre av ren mengde",
      "Fit-historiene, fordi de tar én kveld å lage og redder et helt intervju",
      "Hele caser på tid, fordi de trener alle fire vurderingsdimensjonene samtidig",
      "Lesing av hele pensum, så du kjenner igjen casetypen når den kommer",
    ],
    answer: 0,
    explanation: "Alle fire står på lista, men rekkefølgen følger hva som faktisk feller folk. Fit-historiene og hele caser står som punkt fire og tre — de er verdt tiden, men de kan gjøres senere. Hoderegning står først fordi den er hard å redde i selve rommet og fordi den er den eneste ferdigheten som svarer på ren mengde. Å lese pensum er ikke trening i det hele tatt: kurset kan ikke leses, det må gjøres.",
  },

  /* ---------- Kapittel 1 · Hva caseintervjuet måler ---------- */

  { id: "q12", ch: 1, oppg: 1, type: "mcq",
    q: "Du sitter hos McKinsey. Rett etter prompten begynner du å si hvilke grener du vil undersøke og i hvilken rekkefølge du vil gå gjennom dem. Hva er risikoen?",
    options: [
      "Ingen — å drive casen fremover teller positivt hos alle hus",
      "At du bruker mer enn to minutter på struktureringen",
      "At du ikke rekker syntesen på slutten",
      "At formatet er interviewer-led: intervjueren fører deg fra spørsmål til spørsmål, og å kjøre sitt eget løp er den farlige feilen der",
    ],
    answer: 3,
    explanation: "Nøyaktig samme oppførsel er <b>påkrevd</b> i en candidate-led case og <b>farlig</b> i en interviewer-led. Derfor kan den ikke velges før formatet er kjent — og det avklares med ett spørsmål på to sekunder: «Vil du at jeg skal drive casen fremover, eller foretrekker du å lede meg gjennom?» Tidsbruk og syntese er ekte risikoer i andre sammenhenger, men de har ingenting med formatvalget å gjøre.",
  },

  { id: "q13", ch: 1, oppg: 1, type: "mcq",
    q: "Hvorfor er 3C, 4P og Porters fem krefter i dag et negativt signal i et caseintervju?",
    options: [
      "Fordi modellene er utdaterte og ikke lenger beskriver hvordan markeder fungerer",
      "Fordi det viser at du behandler et konkret problem som en kategori — og husene har brukt tjue år på å lære seg å se dem",
      "Fordi kategoriene i 3C overlapper hverandre og dermed bryter MECE",
      "Fordi de tar for lang tid å framføre innenfor tidsbudsjettet på to minutter",
    ],
    answer: 1,
    explanation: "Modellene er ikke gale, og de avvises ikke for overlapp — 3C er en helt vanlig konseptuell inndeling. Problemet er hvor de kommer fra: de er laget av noen andre, til noe annet, og lagt over denne klienten uten å bruke noe av det prompten faktisk ga deg. Tid er heller ikke grunnen; et generisk tre er like svakt om det framføres på nitti sekunder. Det som har erstattet dem, er å bygge fra en <b>identitet</b> eller en <b>verdikjede</b> som gjelder akkurat denne klienten.",
  },

  /* ---------- Kapittel 2 · Husene og prosessene ---------- */

  { id: "q14", ch: 2, oppg: 1, type: "mcq",
    q: "Hva er BCGs dokumenterte digitale screening i Norden?",
    options: [
      "Casey, en chatbot som kjører deg gjennom én klientcase og avsluttes med en innspilt videoanbefaling",
      "En logisk resonnementstest: 80 spørsmål på 30 minutter, uten kalkulator",
      "Pymetrics-spillene, som måler risikovilje og beslutningsmønstre",
      "En numerisk resonnementstest av SHL-typen, rundt 21 spørsmål på 30 minutter",
    ],
    answer: 1,
    explanation: "Dette er det punktet flest NHH-studenter trener feil på. Casey brukes i andre BCG-geografier, og Pymetrics forekommer på enkelte kontorer, men er ikke lenger standardantakelsen — trener du på dem, trener du på feil test. SHL-typen brukes bredt av Big-4 og de norske husene, ikke av BCG Norden. 80 spørsmål på 30 minutter er <b>22,5 sekunder per spørsmål</b>: ren hastighetsdrill, ikke casetrening.",
  },

  { id: "q15", ch: 2, oppg: 1, type: "mcq",
    q: "Av de store husene i høstens vindu — hvilket er det eneste som tåler å bli utsatt, slik at du kan søke der sist?",
    options: [
      "Accenture, fordi 4. oktober er den seneste fristen blant de store",
      "Bain, som har frist 13. september og deretter en prosess på 4–6 uker",
      "Deloitte, som uansett har et nytt vindu i januar",
      "BCG, som rekrutterer rullerende med portalfrist 31.12.2026",
    ],
    answer: 3,
    explanation: "Accenture har riktignok den seneste fristen og er et reelt sikkerhetsnett hvis september går galt — men 4. oktober er fortsatt en hard frist, ikke noe som tåler utsettelse. Bains 13. september ligger midt i hovedvinduet; at prosessen etterpå tar 4–6 uker endrer ikke søknadsfristen. Deloittes konsulentspor har allerede lukket i denne syklusen, så januarvinduet er ikke en utsettelse — det er neste syklus. Konsekvensen: søk først, tren mens du venter.",
  },

  { id: "q16", ch: 2, oppg: 1, type: "mcq",
    q: "McKinseys PEI gir deg én historie per økt, etterfulgt av 10–25 oppfølgingsspørsmål som graver i beslutningene dine, ikke i utfallet. Hva betyr det for hvordan du bygger historieporteføljen?",
    options: [
      "Få historier, svært dypt gjennomarbeidet, slår mange grunne — én historie skal bære hele tidsvinduet",
      "Én historie per dimensjon holder, siden McKinsey aldri spør om samme dimensjon to ganger",
      "Mange korte historier er tryggest, siden du har fire dimensjoner å dekke",
      "Historiene bør merkes med dimensjonsnavnet, så du raskt finner riktig historie i rommet",
    ],
    answer: 0,
    explanation: "Formatet er en hard designbeskrankning: en historie som ikke tåler tjuefem spørsmål om <i>hvorfor</i>, kollapser uansett hvor mange andre du har. Mange korte historier er derfor det motsatte av svaret. Å regne med at samme dimensjon aldri gjentas er feil — intervjuer to spør av og til om det samme som intervjuer én, og derfor er kravet minst to historier per dimensjon. Og dimensjonsnavnet skal du <b>aldri</b> si høyt: firmaets interne taksonomi som overskrift på ditt eget svar avslører prep-materialet.",
  },

  { id: "q17", ch: 2, oppg: 1, type: "short",
    q: "Du er invitert til Bain og har fått beskjed om en digital test. En medstudent sier «da begynner du å trene på SOVA». Hvorfor er det et dårlig førstetrekk, og hva gjør du i stedet?",
    model: [
      "Bain sender enten TestGorilla eller SOVA — det er to ulike tester med ulikt innhold",
      "Invitasjonsmailen sier hvilken av dem du faktisk får",
      "Å trene på feil test er den vanligste bortkastede uka i hele prosessen",
      "Handlingen er å åpne invitasjonen og lese hva som står der, før du kjøper et kurs eller bruker en helg",
      "Samme feil gjelder BCG: i Norden er testen logisk resonnement på 80 spørsmål på 30 minutter, ikke Casey-chatboten",
    ],
  },

  /* ---------- Kapittel 3 · Å bryte ned et problem ---------- */

  { id: "q18", ch: 3, oppg: 1, type: "mcq",
    q: "Du har skrevet grenene «marked, konkurranse, intern drift, regulering». Hva er den ordentlige testen på om nedbrytningen holder?",
    options: [
      "At ingen av grenene overlapper hverandre",
      "At du har tre eller fire hovedgrener, ikke fem eller flere",
      "At du kan sette likhetstegn mellom grenene og resultatet",
      "At grenene til sammen dekker alle temaene som finnes i bransjen",
    ],
    answer: 2,
    explanation: "Å sjekke for overlapp er bare den ene halvparten av MECE, og den overfladiske: nettopp denne temalista har ingen synlig overlapp og består derfor den testen — samtidig som den mangler <b>miks</b>, som er den vanligste årsaken til fallende margin i det hele tatt. Antall grener handler om prioritering i framføringen, ikke om dekning. Og «alle temaene i bransjen» er umulig å bevise: en temaliste kan aldri vises å være uttømmende, mens en identitet slipper unna problemet — er leddene lik svaret, kan ingenting utenfor leddene flytte det. Det er aritmetikk, ikke retorikk.",
  },

  { id: "q19", ch: 3, oppg: 1, type: "mcq",
    q: "Kirkevergen har gravplasser til rundt 2033 og ingen ledige arealer i byen. Du skriver: Arealbehov = gravlegginger per år × areal per grav × antall år før graven kan gjenbrukes. Hva ser du nå, som en temaliste ikke kunne vist deg?",
    options: [
      "At kremasjonsandelen og oppfølging av utløpte festeavtaler er verdt like mye som nytt areal, fordi alle tre leddene er multiplikative",
      "At regulering er den viktigste grenen, siden nytt areal krever en reguleringsprosess",
      "At antall gravlegginger per år er den eneste driveren kirkevergen kan påvirke",
      "At problemet uansett ikke lar seg løse innen 2033",
    ],
    answer: 0,
    explanation: "Fordi leddene multipliseres, gir en halvering av areal per grav (kremasjon) eller et kutt i det tredje leddet (festeavtaler) nøyaktig like stor effekt som nytt areal — og virker mange år tidligere. Regulering er tvert imot den svakeste veien her: en reguleringsprosess på åtte til ti år rekker ikke fram til 2033, og det er den innsikten identiteten gir deg. Gravlegginger per år er det ene leddet kirkevergen <i>ikke</i> kan påvirke. Og konklusjonen er ikke at problemet er uløselig — den er at to av tre ledd er handlingsrom.",
  },

  { id: "q20", ch: 3, oppg: 1, type: "mcq",
    q: "Hotellkjeden har 40 hoteller. Hvorfor er «del per hotell» en dårlig førsteakse?",
    options: [
      "Fordi 40 grener bryter regelen om tre til fire hovedgrener",
      "Fordi hotell ikke er noe klienten kan handle på",
      "Fordi aksen ikke gir spredning: 40 grener som ser like ut, bærer ingen informasjon",
      "Fordi hotellene overlapper — samme gjest kan bo på flere av dem",
    ],
    answer: 2,
    explanation: "Regelen om tre til fire grener handler om prioritering i framføringen; grupperte du de 40 i fire regioner, ville regelen vært oppfylt og aksen fortsatt vært verdiløs. Det er spredningen som mangler. Deler du derimot per kanal — direkte booking mot bookingportal — får du to grener som er <b>systematisk forskjellige i netto pris</b>, og det er informasjon. Klienten kan absolutt handle per hotell, så det er ikke innvendingen, og noen overlapp mellom hotellene finnes ikke: en gjest bor ett sted per natt.",
  },

  { id: "q21", ch: 3, oppg: 1, type: "mcq",
    q: "I dagligvaretreet setter du «ferskvare» og «kampanjesalg» ved siden av hverandre som to grener. Hva er galt?",
    options: [
      "Ingenting — kampanjesalg er en driver og ferskvare en kategori, og begge hører hjemme i treet",
      "Det bryter gjensidig utelukkende: en laksefilet på tilbud hører hjemme i begge. Del først på kategori, og la kampanjeandel være en driver inne i hver kategori",
      "Det bryter uttømmende: varer som verken er ferskvare eller kampanjevare, faller utenfor treet",
      "Det er greit så lenge du sier høyt at grenene overlapper litt",
    ],
    answer: 1,
    explanation: "Feilen er <b>to akser på samme nivå</b>, og den er den vanligste kilden til overlapp i det hele tatt. Følgen er dobbelttelling, ikke et hull — så det er ikke uttømmende-halvdelen som ryker. At begge er relevante er nettopp problemet: de er relevante på hvert sitt nivå, ikke ved siden av hverandre. Og å flagge overlappen høyt reparerer ingenting; et tre som teller den samme kronen to ganger, gir feil svar uansett hvor ærlig det presenteres.",
  },

  { id: "q22", ch: 3, oppg: 1, type: "short",
    q: "Du har tegnet et perfekt symmetrisk tre der alle fire hovedgrenene er utviklet like dypt. Hva forteller det intervjueren, og hvordan burde treet sett ut i stedet?",
    model: [
      "Et symmetrisk tre forteller én ting: at du ikke har en mistanke",
      "Asymmetrien er prioriteringen gjort synlig — gå tre nivåer ned i grenen du mistenker, og ett nivå i resten",
      "Tre eller fire hovedgrener holder; fem eller flere leses som manglende prioritering",
      "Gå ned til grenen navngir noe et menneske kan endre, eller et tall som finnes i klientens egne systemer: «lønnstimer per åpningstime på ferskvaredisken», ikke «kostnader»",
      "Si høyt hva du legger bort og hvorfor — det er den billigste måten å vise dømmekraft på, og den eneste måten å bevise at utelatelsen er et valg",
      "Avslutt med hypotese, startgren og datauttrekk, ellers er strukturen ferdig uten at casen har begynt",
    ],
  },

  /* ---------- Kapittel 4 · Hypotesedrevet arbeid ---------- */

  { id: "q23", ch: 4, oppg: 1, type: "mcq",
    q: "Hvilken av disse fire setningene er en ekte hypotese?",
    options: [
      "«Jeg starter på inntektssiden og går deretter til kostnadssiden.»",
      "«Marginfallet kan skyldes pris, volum eller miks.»",
      "«Jeg tror dette er et lønnsomhetsproblem.»",
      "«Marginfallet ligger i ferskvare og ikke i prisbildet: økt svinn og en større kampanjeandel har senket realisert bruttomargin i nettopp de kategoriene som vokser i andel av kurven.»",
    ],
    answer: 3,
    explanation: "Testen er todelt: peker setningen på én gren <i>og</i> bort fra minst én annen, og kan noen levere et tall i morgen som gjør den usann? Den første er en <b>rekkefølge</b> — den sier hva du skal gjøre, ikke hva du tror om verden, og ingen tall kan motbevise en rekkefølge. Den andre er en <b>mulighetsliste</b>, altså treet ditt lest baklengs; den utelukker ingenting og er sann uansett hva dataene viser. Den tredje er en <b>omformulering av prompten</b> — intervjueren fortalte deg nettopp det. Bare den siste navngir én gren, utelukker en annen i samme setning, og kan tape.",
  },

  { id: "q24", ch: 4, oppg: 1, type: "mcq",
    q: "Prompten: en hotellkjede med 40 hoteller, halvparten i by og halvparten i distrikt. Beleggsprosenten er tilbake på nivået før pandemien, men driftsresultatet ligger 30 prosent lavere. Hva gjør A-svaret aller først?",
    options: [
      "Ber om markedsstørrelse og vekst for det norske hotellmarkedet",
      "Bruker belegget til å utelukke volum, før første gren settes",
      "Deler de 40 hotellene i by og distrikt, siden det er inndelingen prompten oppgir",
      "Setter opp fire grener: marked, konkurranse, inntekt og kostnad",
    ],
    answer: 1,
    explanation: "RevPAR er belegg ganger snittpris, og belegget er oppgitt som uendret. Da er den ene faktoren <b>matematisk utelukket før du har åpnet munnen</b>, og en struktur som ikke sier det høyt, kaster bort den eneste gaven prompten ga deg. De fire temaoverskriftene er C-svaret: samme tre ville passet et stålverk, en strømmetjeneste og et aluminiumsverk, og det bruker null av de oppgitte faktaene. Markedsstørrelse er markedsinngangsarbeid på en klient som allerede er i markedet. By mot distrikt er en oppgitt inndeling, men uten forventet spredning — den informative aksen er kanal, der netto pris etter provisjon skiller seg systematisk.",
  },

  { id: "q25", ch: 4, oppg: 1, type: "mcq",
    q: "Du har sagt at fallet er kanaldrevet. Intervjueren svarer at netto snittpris er flat innenfor hver kanal. Hva er riktig trekk?",
    options: [
      "Holde fast på hypotesen og be om flere år med data, siden ett uttrekk ikke kan avkrefte den",
      "Bygge et nytt tre fra bunnen, siden strukturen åpenbart var feil",
      "Bli taus i tretti sekunder og regne på nytt før du sier noe",
      "Si at hypotesen faller, si hva det utelukker, og oppgi neste trekk: lønnstimer per solgte rom, splittet på fast og innleid",
    ],
    answer: 3,
    explanation: "Erkjenn, si hva det utelukker, oppgi neste trekk. Det tar elleve sekunder og er hele forskjellen på en kandidat som ble motbevist og en som ble stoppet. Å be om mer data for å redde påstanden er å bli glad i hypotesen — poenget er ikke å ha rett i minutt sju, men å ha tatt feil raskt i minutt elleve. Å starte en ny struktur er det dyreste trekket som finnes i rommet: du kaster fem minutters arbeid og mister alt intervjueren allerede har akseptert. Og stillhet gir vurdereren ingenting å vurdere.",
  },

  { id: "q26", ch: 4, oppg: 1, type: "short",
    q: "Intervjueren motbeviser hypotesen din. Skriv de tre delene i setningen du sier, og forklar hvorfor tidsbudsjettet gjør at dette må gå fort.",
    model: [
      "Erkjenn: «Da faller hypotesen min.»",
      "Si hva det utelukker: «Det betyr at netto pris ikke er kilden, og at kostnad per solgte rom er det eneste leddet igjen som er stort nok.»",
      "Oppgi neste trekk: «Jeg vil derfor se på lønnstimer per solgte rom, splittet på fast og innleid.»",
      "Hele setningen tar rundt elleve sekunder — forskjellen på å bli motbevist og å bli stoppet",
      "Hypotesen faller rundt minutt sju og skal styre de neste ti; løsningsbyggingen har bare 8–10 minutter totalt",
      "Tid brukt på å forsvare noe du ikke lenger tror på, tas fra analysen — ikke fra pausen",
      "Å forkaste hypotesen på et tall scorer høyere enn å få rett uten å ha risikert noe",
    ],
  },

  /* ---------- Kapittel 5 · Casetypene ---------- */

  { id: "q27", ch: 5, oppg: 1, type: "mcq",
    q: "År 1 selges 100 enheter: 80 av produkt A med 10 kr margin og 20 av B med 40 kr. År 2 er volumet fortsatt 100 enheter og prisene uendret, men miksen er blitt 90/10. Hvor mye faller samlet dekningsbidrag?",
    options: [
      "0 kr — verken pris eller volum er endret, så dekningsbidraget må være det samme",
      "100 kr — ti enheter flyttet seg, og A-marginen er 10 kr per enhet",
      "300 kr, altså 19 prosent — ti enheter flyttet fra 40 kr til 10 kr i margin",
      "400 kr — B-volumet er halvert, og B bærer 40 kr per enhet",
    ],
    answer: 2,
    explanation: "År 1: 80 × 10 + 20 × 40 = 800 + 800 = <b>1 600 kr</b>. År 2: 90 × 10 + 10 × 40 = 900 + 400 = <b>1 300 kr</b>. Fallet er 300 kr, altså 19 prosent av 1 600. Å svare 0 er nøyaktig det et rent pris/volum-tre gjør — derfor står miks som egen gren. 100 kr teller bare A-marginen på de ti enhetene som flyttet seg og glemmer at de kom fra 40 kr. 400 kr teller B-tapet riktig, men glemmer at A samtidig vant ti enheter à 10 kr, altså 100 kr tilbake.",
  },

  { id: "q28", ch: 5, oppg: 1, type: "mcq",
    q: "En kandidat har regnet ut synergiene i en M&A-case helt korrekt og anbefaler kjøp. Hva er den klassiske fellen han kan ha gått i?",
    options: [
      "Er premien høy nok, tilfaller hele synergien selger — og en teknisk korrekt synergianalyse fører da til et tapsbringende kjøp",
      "Synergier realiseres sjelden, så de burde vært satt til null i verdsettingen",
      "Kostnadssynergier er alltid sikrere enn inntektssynergier, og bare de skulle vært talt med",
      "Synergiene skal måles mot målselskapets egenverdi, ikke mot kjøpesummen",
    ],
    answer: 0,
    explanation: "Spør alltid hva som <i>betales</i>, ikke bare hva som skapes. Å sette synergiene til null er ikke rådet — de skal med, men alltid med realiseringskostnad og tid. Skillet mellom kostnads- og inntektssynergier handler om sikkerhet, og det redder deg ikke her: selv en helt sikker synergi er verdiløs for kjøperen hvis premien allerede har gitt den til selger. Og å måle mot egenverdien i stedet for kjøpesummen er å snu problemet på hodet — det er nettopp differansen mot det du betaler som avgjør.",
  },

  { id: "q29", ch: 5, oppg: 1, type: "mcq",
    q: "En kandidat har estimert markedet til 1,2 milliarder og sier: «vi tar 10 prosent og tjener 120 millioner.» Hva er den alvorligste svakheten?",
    options: [
      "At han ikke har oppgitt et usikkerhetsspenn rundt markedsanslaget",
      "At han har brukt topp-ned der bunn-opp ville gitt et sikrere marked",
      "At markedsandelen er en gjetning med to sifre — antall spillere, realistisk andel år 1 mot år 3 og kapasitet er ikke berørt — og at hele «kan vi vinne»-laget er hoppet over",
      "At han burde ha begynt med hvordan de går inn: bygge selv, kjøpe eller joint venture",
    ],
    answer: 2,
    explanation: "«Vi tar 10 prosent» er ikke en forutsetning, det er en gjetning med to sifre, og den bærer hele svaret. Rekkefølgen i en markedsinngangscase er attraktivitet → kan vi vinne → lønner det seg → hvordan; å begynne med «hvordan» forutsetter de tre foregående som besvart. Valget mellom topp-ned og bunn-opp er sekundært her — begge ville etterlatt andelen like ubegrunnet. Og et usikkerhetsspenn rundt et oppdiktet tall gjør det ikke mindre oppdiktet.",
  },

  { id: "q30", ch: 5, oppg: 1, type: "mcq",
    q: "Hvordan finner du flaskehalsen i en kapasitetscase?",
    options: [
      "Ved å finne trinnet med lengst syklustid",
      "Ved å finne trinnet der køen er lengst i en normaluke",
      "Ved å finne trinnet med lavest bemanning per enhet",
      "Ved å sammenligne hvert trinns kapasitet mot etterspørselen inn i trinnet — ikke ved å lete etter trinnet som ser tregest ut",
    ],
    answer: 3,
    explanation: "Flaskehalsen er definert relativt til etterspørselen, ikke absolutt. Lang syklustid er nettopp «trinnet som ser tregest ut» — et trinn kan ha lang syklustid og likevel ha rikelig kapasitet fordi det kjøres parallelt. Kø er et symptom som like gjerne kommer av puljekjøring eller vaktskifter. Bemanning sier ingenting om kapasitet før den holdes mot etterspørselen. I netthandelscasen var flaskehalsen pakkebordene i tre ettermiddagstimer, og testen som viste det var kapasitetsutnyttelse <b>per prosesstrinn per time</b>.",
  },

  { id: "q31", ch: 5, oppg: 1, type: "short",
    q: "Klienten spør hva de skal ta for en ny tjeneste. Hvilke ting må avklares før du nevner et tall, og hva setter gulvet og taket?",
    model: [
      "Målet må avklares først: å prise for margin og å prise for markedsandel gir motsatt svar på samme case",
      "Gulvet er variabel kostnad per enhet — under det taper du penger på hver enhet du selger",
      "Taket er kundens betalingsvillighet: kundens neste-beste alternativ pluss verdien av differansen, kvantifisert",
      "Konkurrentprisene sier hvor i intervallet markedet forventer deg — de gir verken gulv eller tak",
      "Avstanden mellom gulv og tak er prisingsmakten; er den liten, er casen egentlig en kostnadscase",
      "Ta med elastisitet og konkurrentrespons: en prisreduksjon som utløser priskrig gjør alle fattigere, inkludert klienten som «vant»",
    ],
  },

  /* ---------- Kapittel 6 · Hoderegning ---------- */

  { id: "q32", ch: 6, oppg: 1, type: "mcq",
    q: "Prisen falt 20 prosent, til 1 200 kr. Hva var opprinnelig pris?",
    options: [
      "1 500 kr",
      "1 440 kr",
      "1 000 kr",
      "960 kr",
    ],
    answer: 0,
    explanation: "1 200 er 80 prosent av det opprinnelige, så du deler deg tilbake: 1 200 / 0,8 = <b>1 500</b>. Kontroll: 20 prosent av 1 500 er 300, og 1 500 − 300 = 1 200. ✓ Feilsvaret 1 440 kommer av å legge 20 prosent på den <i>nye</i> prisen, og avsløres av samme kontroll: 240 / 1 440 = 16,7 prosent, ikke 20. 1 000 er 1 200 delt på 1,2, som svarer på et annet spørsmål — hvilket tall som vokser 20 prosent til 1 200. Og 960 trekker 20 prosent fra i stedet for å legge til, altså feil retning.",
  },

  { id: "q33", ch: 6, oppg: 1, type: "mcq",
    q: "Driftsmarginen gikk fra 8 prosent til 10 prosent. Hvordan sier du det riktig?",
    options: [
      "+2 prosent, og det er også +2 prosentpoeng — her er de to det samme tallet",
      "+2 prosentpoeng, som er +25 prosent relativt (2/8)",
      "+2 prosentpoeng, som er +20 prosent relativt (2/10)",
      "+25 prosentpoeng, siden 10 er 25 prosent større enn 8",
    ],
    answer: 1,
    explanation: "Prosentendring regnes alltid mot det <b>gamle</b> tallet: 2/8 = 25 prosent. Å dele på 10 er å bruke det nye tallet som grunnlag, og det gir 20 prosent — et fullt plausibelt feilsvar som ligger klart i enhver flervalgstest. Å si «+2 prosent» om en endring på to prosentpoeng er nettopp den sammenblandingen ordet prosentpoeng finnes for å hindre. Og 25 er den relative endringen målt i prosent, aldri i prosentpoeng — enheten kan ikke byttes ut.",
  },

  { id: "q34", ch: 6, oppg: 1, type: "mcq",
    q: "Hvor mange prosent er 55 av 440?",
    options: [
      "8 prosent",
      "12,5 prosent",
      "13,75 prosent",
      "0,125 prosent",
    ],
    answer: 1,
    explanation: "Divisjon er oppslag, ikke lang divisjon: 440 / 55 = 8, altså 1/8, altså <b>12,5 prosent</b>. Svaret 8 er selve divisoren lest som om den var svaret. 13,75 kommer av å runde nevneren ned til 400 — en avrunding på 10 prosent lagt på feil side av en divisjon, og den slår rett inn i svaret. Og 0,125 er brøken, ikke prosenten: den mangler å bli ganget med 100, altså to tierpotenser.",
  },

  { id: "q35", ch: 6, oppg: 1, type: "mcq",
    q: "20 × 40 = 800 er et godt anslag for 19 × 41, men et dårlig anslag for 19 × 39. Hvorfor?",
    options: [
      "Fordi begge faktorene rundes opp, så feilene forsterker hverandre i stedet for å motvirke: 8 prosent bom mot 2,7 prosent",
      "Fordi 39 ligger mer enn 10 prosent fra 40, og tommelfingerregelen om maks 10 prosent avrunding per ledd er brutt",
      "Fordi avrundingsfeil bare betyr noe når tallene er tosifrede; over hundre spiller den ingen rolle",
      "Fordi du alltid skal runde begge faktorene ned, slik at anslaget blir konservativt",
    ],
    answer: 0,
    explanation: "19 × 41 = 779, så 800 bommer 2,7 prosent. 19 × 39 = 741, og der bommer 800 med 8 prosent. Forskjellen er retningen, ikke størrelsen: 39 → 40 er bare 2,6 prosent, altså godt innenfor 10-prosentregelen. Å alltid runde ned er samme feil speilvendt — da peker begge feilene samme vei igjen; regelen er én opp og én ned. Og avrundingsfeil er relativ, så store tall beskytter ikke. Riktig grep her: 20 × 39 = 780, minus 39 = 741 eksakt.",
  },

  { id: "q36", ch: 6, oppg: 1, type: "short",
    q: "Du skal levere et regnestykke høyt. Ramse opp minst fem av kravene i rekkefølgen kapitlet setter, og si hvorfor stillhet er det verste alternativet.",
    model: [
      "Si formelen før tallene, så intervjueren kan korrigere oppsettet før du har brukt tid på feil regnestykke",
      "Be om lov til å runde — svaret er nesten alltid ja, og du har flagget presisjonsnivået gratis",
      "Si størrelsesorden først: «dette lander i milliarder, ikke millioner»",
      "Si enheten hver eneste gang: «åttehundre — millioner kroner — per år»",
      "Flagg retningen på avrundingen: «jeg rundet opp, så det virkelige tallet ligger litt under»",
      "Lever hodetallet først og konteksten etterpå — et tall uten tolkning er et halvt svar",
      "Aldri stille i mer enn 15–20 sekunder: si «jeg regner 24 ganger 125 millioner nå» i stedet for å gå i svart",
      "Stillhet er selvskading fordi ingen kan redde deg gjennom den — det finnes ingenting å vurdere",
      "Legg til sanity-sjekken som siste ledd: del svaret på noe du har erfaring med og si høyt om det er troverdig",
    ],
  },

  /* ---------- Kapittel 7 · Estimering og den norske tallbanken ---------- */

  { id: "q37", ch: 7, oppg: 1, type: "mcq",
    q: "Du skal anslå det norske markedet for oppvaskmaskiner. Hvilken nevner starter du fra, og hvorfor?",
    options: [
      "Befolkningen, 5,6 millioner, siden alle bruker oppvaskmaskin",
      "Sysselsatte, 2,9 millioner, siden det er de som kjøper hvitevarer",
      "Boliger i småhus, 1,4 millioner, siden maskinen monteres fast",
      "Husholdninger, 2,65 millioner, fordi maskinen kjøpes én gang per hjem — teller du per person, dobler du svaret",
    ],
    answer: 3,
    explanation: "Husholdning mot individ er den aksen som koster mest å bomme på. Med 2,1 personer per husholdning gir befolkningen som nevner mer enn dobbelt så stort marked, og feilen er usynlig i regnestykket etterpå. Sysselsatte er grunnlaget for B2B som selges per ansatt, ikke for noe som står på et kjøkken. Og småhus utelater alle leiligheter — det er en delmengde av husholdningene, ikke nevneren. Videre: 2,65 mill. × 75 prosent dekning ≈ 1,99 mill. maskiner, levetid ~12 år gir ~165 000 enheter i året.",
  },

  { id: "q38", ch: 7, oppg: 1, type: "mcq",
    q: "Bilparken er 2,9 millioner biler, en norsk bil lever rundt 17 år, og basen vokser rundt 0,5 prosent i året. Hvor mange nye personbiler registreres per år, når du tar med begge leddene?",
    options: [
      "170 000",
      "315 000",
      "185 000",
      "49 millioner",
    ],
    answer: 2,
    explanation: "Erstatning: 2,9 mill. / 17 ≈ 170 000. Vekst: 1 prosent av 2,9 mill. er 29 000, halvparten er ~15 000. Sum ≈ <b>185 000</b> — faktisk førstegangsregistrert i 2025 var 184 705. Svaret 170 000 er riktig metode med vekstleddet glemt; leddene skilles nettopp fordi de oppfører seg ulikt. 315 000 leser 0,5 prosent som 5 prosent, altså en tierpotens i vekstleddet. Og 49 millioner ganger med levetiden i stedet for å dele — sanity-sjekken avliver det umiddelbart: det er ni biler per nordmann.",
  },

  { id: "q39", ch: 7, oppg: 1, type: "mcq",
    q: "Én krone per nordmann per dag er rundt 2 milliarder i året. Estimatet ditt for ett enkelt norsk forbruksprodukt lander på 200 milliarder kroner. Hva sier ankeret deg umiddelbart?",
    options: [
      "At det tilsvarer rundt 10 kroner per nordmann per dag — høyt, men innenfor",
      "At det tilsvarer rundt 1 krone per nordmann per dag, altså trygt",
      "At ankeret ikke kan brukes her, siden det bare gjelder abonnementer",
      "At det tilsvarer rundt 100 kroner per nordmann per dag og er på nivå med hele dagligvaremarkedet — nesten sikkert en tierpotens på avveie",
    ],
    answer: 3,
    explanation: "200 mrd delt på 2 mrd per krone gir 100 kroner per nordmann per dag, og dagligvaremarkedet er ~230 mrd totalt. For ett enkelt produkt er det umiddelbart absurd. Svaret 10 kroner per dag ville vært ~20 mrd, og 1 krone ~2 mrd — begge er nøyaktig den tierpotensen ankeret finnes for å fange. Og ankeret gjelder alle norske forbruksestimater i kroner per år; husholdningsvarianten (100 kroner per husholdning per måned ≈ 3,2 mrd) er den som er laget for abonnementer.",
  },

  { id: "q40", ch: 7, oppg: 1, type: "mcq",
    q: "Du har estimert 22,4 millioner klipp i året i det norske frisørmarkedet, og regner så: 22,4 mill. / 8 500 frisører / 250 arbeidsdager ≈ 10,5 klipp per frisør per dag. Hva er poenget med det siste regnestykket?",
    options: [
      "Å gjøre anslaget mer presist ved å legge til et sjette steg",
      "Å vise at antall frisører er den egentlige driveren i markedet",
      "Å gjenskape en forutsetning baklengs: 10,5 klipp per dag er i overkant av en normal arbeidsdag, så anslaget ligger i øvre kant — og det sier du høyt",
      "Å bytte fra topp-ned til bunn-opp, siden bunn-opp alltid er sikrere",
    ],
    answer: 2,
    explanation: "Baklengsregningen er det sterkeste sanity-grepet fordi den gjenskaper en størrelse du har erfaring med, og fordi den avslører om en tierpotens har falt ut underveis. Den gjør ikke anslaget mer presist — feilen ligger alltid i forutsetningene, aldri i desimalene, og et ekstra steg legger bare til enda en gjetning. Å krysspeile med den andre retningen er et eget grep, og ingen av retningene er «alltid sikrere»; kravet er bare at de havner i samme tierpotens. Antall frisører er her en kontrollstørrelse, ikke en driver du ville anbefalt klienten å endre.",
  },

  { id: "q41", ch: 7, oppg: 1, type: "short",
    q: "Ramse opp minst fire av de fem sanity-grepene i estimeringskapitlet, og forklar hvorfor «baklengs til én forutsetning» kalles det sterkeste.",
    model: [
      "Størrelsesorden: sjekk tierpotensen før sifrene — 125 millioner ganger 24 skal havne i milliarder",
      "Per capita eller per husholdning: del på 5,6 mill. eller 2,65 mill. og se om tallet er troverdig",
      "Benchmark mot noe kjent: dagligvare ~230 mrd er den beste norske målestokken, og nesten alle forbrukermarkeder skal ligge godt under",
      "Retningssjekk: endre én forutsetning og se om svaret beveger seg riktig vei — dobler du kapasiteten per lader, skal antall ladere halveres",
      "Baklengs til én forutsetning: regn svaret tilbake til noe per butikk, per frisør eller per dag",
      "Baklengs er sterkest fordi den gjenskaper en forutsetning du selv satte — treffer den, vet du at ingen tierpotens har falt ut underveis",
      "Bruk minst to av grepene, og si begge høyt: det er ikke regnefeilen som feller kandidaten, men at hun ikke oppdager at svaret er urimelig",
    ],
  },

  /* ---------- Kapittel 8 · Figurlesing ---------- */

  { id: "q42", ch: 8, oppg: 1, type: "mcq",
    q: "Y-aksen starter på 90. Søylene står på 94 og 98, og den andre ser dobbelt så høy ut. Hva er veksten?",
    options: [
      "100 prosent — søylen er dobbelt så høy",
      "4,3 prosent — 4 av 94, fordi endringen regnes som prosent av startverdien",
      "4 prosentpoeng, som er det samme som 4 prosent",
      "8 prosent — den plottede høyden går fra fire til åtte enheter over grunnlinjen",
    ],
    answer: 1,
    explanation: "(98 − 94) / 94 = 4,3 prosent. At søylen ser dobbelt så høy ut, er nettopp poenget: den plottede høyden går fra fire til åtte enheter over grunnlinjen på 90, mens verdiene knapt har flyttet seg. Å lese høyden som verdien gir 8 prosent, og å lese høydeforholdet gir 100. Dette er den best dokumenterte fellen i figurlesing, og den <b>vedvarer etter opplæring</b> — over fem studier ble 83,5 prosent av deltakerne påvirket. Derfor hjelper det ikke å forstå den; det som virker er en mekanisk vane: les startverdien høyt, og regn endringen som prosent av startverdien. Og «prosentpoeng» hører ikke hjemme her i det hele tatt, siden 94 og 98 er nivåer og ikke prosenttall.",
  },

  { id: "q43", ch: 8, oppg: 1, type: "mcq",
    q: "Et Mekko-diagram viser et byggsegment på 18 mrd der vi har 8 prosent, og et industrisegment på 10 mrd der vi har 22 prosent. Hvilket gir mest i kroner?",
    options: [
      "Industri, med 2,20 mrd mot byggs 1,44 mrd — arealet er kroner, og den bredeste søylen er ikke størst",
      "Bygg, med 18 mrd mot industris 10 mrd — bredden er markedsstørrelsen",
      "Bygg, siden 8 prosent av 18 mrd er 1,44 mrd og 22 prosent av 10 mrd er 0,22 mrd",
      "Det kan ikke avgjøres uten å vite totalmarkedet i kroner",
    ],
    answer: 0,
    explanation: "18 × 0,08 = 1,44 mrd og 10 × 0,22 = 2,20 mrd. Bredde er markedsstørrelse og høyde er vår andel, men bare <b>arealet</b> er kroner — å lese bredden alene gir feil svar, og her er den bredeste søylen nest minst i kroner. Å regne 22 prosent av 10 mrd til 0,22 mister en tierpotens: det er 2,2. Og «manglende data» er riktig svar noen ganger, men ikke her — figuren gir begge dimensjonene, og å be om et tall du allerede har, koster deg tiden du hadde.",
  },

  { id: "q44", ch: 8, oppg: 1, type: "mcq",
    q: "Spørsmålet er: hvor stor andel av veksten kom fra region A? Region A vokste 240 mill. fra en base på 800 mill., av en samlet vekst på 520 mill. Hva svarer du?",
    options: [
      "30 prosent, som er vekstraten i regionen",
      "46 prosent — spørsmålet spør om regionens andel av veksten: 240 av 520",
      "55 prosent, som er den høyeste vekstraten i figuren",
      "Det er ikke nok informasjon — du trenger basen i den andre regionen",
    ],
    answer: 1,
    explanation: "240 / 520 = 46 prosent. Vekstraten på 240/800 = 30 prosent er også et helt riktig tall — og det er nettopp derfor fellen glir gjennom: begge tallene stemmer, men de svarer på hvert sitt spørsmål. Spør alltid hvilken <b>nevner</b> spørsmålet ber om: veksten i regionen, eller regionens andel av veksten. De 55 prosentene tilhører en annen region og er dessuten en vekstrate, ikke et bidrag. Og de to tallene du trenger, 240 og 520, er begge oppgitt.",
  },

  { id: "q45", ch: 8, oppg: 1, type: "mcq",
    q: "Spørsmålet ber om snittet for de kvartalene der omsetningen oversteg 500 mill. kr. Riktig svar er 10,0 prosent, men 8,0 prosent ligger som svaralternativ. Hvorfor?",
    options: [
      "Fordi 8,0 prosent er snittet av alle åtte kvartalene — feilalternativet er din egen slurv, ferdig utregnet og lagt fram som noe som ser rimelig ut",
      "Fordi 8,0 prosent er medianen, og median og snitt forveksles ofte",
      "Fordi 8,0 prosent er snittet av de tre kvartalene som ikke oppfyller betingelsen",
      "Fordi testleverandøren legger inn ett tilfeldig alternativ i hvert spørsmål",
    ],
    answer: 0,
    explanation: "Å tro at ett alternativ er tilfeldig, er det motsatte av hvordan disse testene faktisk er bygget: <b>feilalternativene er regnet ut fra de vanligste feilene</b> — reversert prosent, prosentpoeng lest som prosent, feil enhet, og nettopp snitt av alle rader i stedet for de betingede. Median er en annen statistikk og ikke den dokumenterte kilden her. Motgiften er mekanisk: marker radene som oppfyller betingelsen <i>før</i> du regner.",
  },

  { id: "q46", ch: 8, oppg: 1, type: "short",
    q: "Beskriv åpningsrutinen på en figur i rekkefølge, og forklar hva «én observasjon, én implikasjon» betyr i praksis.",
    model: [
      "Be om et halvt minutt til å lese — det er forventet og teller positivt",
      "Les tittelen høyt, bokstavelig",
      "Les aksene, enhetene og fotnoten høyt, og si y-aksens startverdi som eget ord",
      "Parafraser hva figuren viser, og be om bekreftelse: «Stemmer det?»",
      "Én observasjon, deretter én implikasjon — ikke les opp alle tallene",
      "Koble tilbake til spørsmålet du stilte før du fikk arket",
      "Si hva du vil vite videre: observasjon → implikasjon → neste steg",
      "«Nye kunder er doblet» er halve observasjonen uten implikasjonen og skårer nesten ingenting",
      "Sanne, men trivielle observasjoner ligger alltid som svaralternativ nettopp fordi oppramsing er den vanligste svake besvarelsen",
    ],
  },

  /* ---------- Kapittel 9 · Å snakke mens du tenker ---------- */

  { id: "q47", ch: 9, oppg: 1, type: "mcq",
    q: "Intervjueren sier at du tar feil. Hva avgjør om du skal snu eller bli stående?",
    options: [
      "Hvor sikker du var da du sa det",
      "Hvor tidlig i casen det skjer — sent i casen skal du bli stående",
      "Om det kom et faktum du ikke hadde: ny informasjon betyr snu og si hvorfor, ingen ny informasjon betyr press-testing, og da blir du stående",
      "Om du klarer å finne et motargument innen ett sekund — nøler du, har hun rett",
    ],
    answer: 2,
    explanation: "Skillet i én setning: å endre mening på grunnlag av data er styrke, å endre mening fordi intervjueren løftet et øyenbryn er svakhet. Samme handling utenfra, motsatt vurdering. Egen sikkerhet er derfor irrelevant — du kan ha vært helt sikker og likevel ha manglet et tall. Tidspunktet i casen endrer ingenting ved kriteriet. Og ettsekundsregelen er en oppskrift på refleksivt svar, som er det første kapitlet advarer mot: refleksivt forsvar leses som defensivt, refleksiv kapitulasjon som ryggradsløst.",
  },

  { id: "q48", ch: 9, oppg: 1, type: "mcq",
    q: "Hvordan ser notatsystemet ut?",
    options: [
      "Ett ark til treet, ett til fasit, og ett til fit-historiene",
      "Alt på ett ark i portrettformat, så du ser hele casen samtidig",
      "Ett ark per gren i treet, så du kan snu det aktuelle arket mot intervjueren",
      "Innsiktsarket, strukturarket og et nytt regneark for hvert regnestykke — alt i landskapsformat",
    ],
    answer: 3,
    explanation: "Tre ark med hver sin faste rolle. Landskapsformatet er ikke smak: trær og tabeller trenger bredden. Ett samlet ark i portrett garanterer at et regnestykke havner i hjørnet av noe gammelt — og det er strukturarket, ikke ett ark per gren, du eventuelt snur mot intervjueren. Det finnes heller ingen fasit i rommet. Verdien viser seg til slutt: kandidater som mister tråden i anbefalingen, mistet den i notatene, ikke i hodet.",
  },

  { id: "q49", ch: 9, oppg: 1, type: "short",
    q: "Du trenger tretti sekunder til å bygge strukturen. Hvordan ber du om tiden uten å «bli stille», og hva gjør du hvis du trenger mer?",
    model: [
      "Én setning med to deler: hvor lenge, og hva du kommer tilbake med",
      "«Kan jeg få tretti sekunder? Da kommer jeg tilbake med tre grener og hvilken jeg vil starte i.»",
      "Å ta tid er forventet; å ta tid uten å varsle er å bli stille",
      "Trenger du mer: «Jeg trenger et halvminutt til — er det greit?» Det er bedre enn å levere en halv struktur",
      "Fyll aldri pausen med lyd — har du bedt om et halvminutt, skriver du i et halvminutt og ser opp",
      "Rekapitulering er den lovlige måten å kjøpe femten sekunder på: gjenta målet og hovedtallene høyt og be om bekreftelse",
      "Normene som sirkulerer (60–120 sekunder til struktur, 30–60 før et regnestykke) er rekonstruksjon fra ex-MBB-coacher, ikke publisert av noe firma — behandle dem som størrelsesorden",
    ],
  },

  /* ---------- Kapittel 10 · Syntesen ---------- */

  { id: "q50", ch: 10, oppg: 1, type: "mcq",
    q: "I RRRN kommer risikoen etter grunnene. Hvorfor kan de to ikke bytte plass?",
    options: [
      "Fordi risikoen ofte er den svakeste delen og bør ligge bakerst",
      "Fordi risikoen krever tall, og tallene er allerede sagt i grunnene",
      "Fordi det samme forbeholdet sagt før standpunktet leses som at du ikke tør, og sagt etter leses som dømmekraft — ordene er de samme",
      "Fordi neste steg alltid følger av risikoen, og de to må stå ved siden av hverandre",
    ],
    answer: 2,
    explanation: "Rekkefølgen er ikke smak; hvert ledd står der det står av en grunn. Risikoen er ikke den svakeste delen — den er et av de to leddene som skiller deg fra flertallet, forutsatt at anbefalingen din faktisk ville endret seg om den slo til. At tallene allerede er sagt er ikke argumentet: risikoen skal kvantifiseres for seg. Og neste steg står sist fordi det er det eneste leddet som krever noe av <i>henne</i> — og fordi det siste du sier, er det som blir sittende.",
  },

  { id: "q51", ch: 10, oppg: 1, type: "mcq",
    q: "Hva er testen på om en risiko er ekte og ikke pynt?",
    options: [
      "Om den er sannsynlig nok til å nevnes — under ti prosent lar du den ligge",
      "Om anbefalingen din ville endret seg dersom den slår til",
      "Om den er nevnt i materialet du fikk av intervjueren",
      "Om den gjelder bransjen generelt, slik at den kan begrunnes uten casedata",
    ],
    answer: 1,
    explanation: "Er svaret nei, er det pynt. Den generelle bransjerisikoen er nettopp feilmodusen: «forutsatt at synergiene realiseres», «det avhenger av gjennomføringen» og «kulturell fit blir viktig» er sanne uansett hva svaret er, og tilfører derfor ingenting. En ekte risiko er skapt av anbefalingen din og finnes ikke hvis klienten lar være — og den er kvantifisert: «et volumfall på ti prosent spiser en tredjedel av synergien». Noen sannsynlighetsterskel finnes ikke, og at intervjueren nevnte noe gjør det ikke til en risiko ved ditt råd.",
  },

  { id: "q52", ch: 10, oppg: 1, type: "mcq",
    q: "Ladecasen: markedet er 1,2 mrd i dag og 1,9 mrd om tre år. Full utbygging med 60 stasjoner krever 7,5 prosent markedsandel bare for å dekke faste kostnader — fra null, mot tre etablerte som holder 80 prosent. Om tre år faller kravet til 4,7 prosent. Hvordan lander du?",
    options: [
      "Trinnvis: bygg 20 stasjoner i sør nå, og sikre opsjon på tomtene til de resterende 40 — du reduserer innsatsen i stedet for å utsette beslutningen",
      "Nei til Sverige: 7,5 prosent fra null mot tre etablerte er urealistisk",
      "Det avhenger av hvor raskt markedet faktisk vokser",
      "Ja til alle 60 stasjonene, siden kravet uansett faller til 4,7 prosent om tre år",
    ],
    answer: 0,
    explanation: "«Det avhenger» er ikke et svar, det er en beskrivelse av at du ikke har tatt stilling — og veksten er dessuten oppgitt i casen. Et rent nei kaster et reelt marked der tiden jobber for klienten. Et rent ja binder hele kapitalen i dag på et nullpunkt som først holder om tre år. Den trinnvise landingen reduserer innsatsen uten å utsette beslutningen, og den følger av det som faktisk er den knappe ressursen: <b>tomtene, ikke laderne</b>. Derfor er neste steg å kartlegge hvor de tre etablerte har søkt om nettilknytning de siste tolv månedene.",
  },

  { id: "q53", ch: 10, oppg: 1, type: "short",
    q: "Skriv de fire leddene i RRRN med sekundene sine, og forklar hvorfor «det avhenger» ikke er et svar — og hvordan du likevel kan lande nyansert.",
    model: [
      "Anbefaling, 10–15 sekunder: ett verb og ett objekt, ingen «det avhenger av»",
      "Grunner, 2–3 stykker, 25–30 sekunder: ett tall fra casen per grunn, nummerert høyt",
      "Risiko, 1–2 stykker, 10 sekunder: risikoen anbefalingen din skaper, kvantifisert",
      "Neste steg, 1–2 stykker, 10 sekunder: noe klienten kan gjøre denne uken",
      "«Det avhenger» er ikke et svar, men en beskrivelse av at du ikke har tatt stilling",
      "Betinget anbefaling med navngitt terskel: «Ja, hvis frafallet holder seg under ti prosent»",
      "Trinnvis anbefaling: «Ja til 20 stasjoner nå, opsjon på de neste 40» — du reduserer innsatsen i stedet for å utsette beslutningen",
      "Anbefal testen som avgjør: «Bruk seks uker på å måle oppetiden — er den over 90 prosent, blir dette et ja»",
      "Navngi tallet som ville snudd deg; det er det som gjør nyansert til skarpt",
    ],
  },

  /* ---------- Kapittel 11 · Historiene ---------- */

  { id: "q54", ch: 11, oppg: 1, type: "mcq",
    q: "Historien må ha sju felter. Hvilke tre er det flertallet hopper over — de som avgjør om historien overlever oppfølging nummer tre?",
    options: [
      "Situasjon, handling og resultat",
      "Navn, dato og sted",
      "Dimensjon, kontekst og lengde",
      "Hva som sto på spill, hvem som var uenig og hvorfor de mente det, og «så derfor»",
    ],
    answer: 3,
    explanation: "Situasjon, handling og resultat er derimot nøyaktig de feltene <i>alle</i> fyller ut. Dimensjon og kontekst er merkelapper matrisen bruker til å dømme porteføljen, ikke innhold i historien. De tre som avgjør, er de som gir intervjueren noe å grave i: konsekvensen hvis ingen gjorde noe, motpartens <b>begrunnelse</b> — vet du bare at noen var uenig, har du ikke undersøkt historien — og én setning om hva utfallet betydde utover deg selv.",
  },

  { id: "q55", ch: 11, oppg: 1, type: "mcq",
    q: "Hvilken feil nevner faktiske intervjuere oftest på Connection-dimensjonen?",
    options: [
      "Historier om mennesker fortalt som problemløsningsøvelser: kandidaten forklarer hva hun analyserte seg fram til, men viser aldri at hun forsøkte å forstå hvorfor den andre var mot henne",
      "For lite tall på utfallet",
      "For lang handlingsdel — over 75 sekunder",
      "At kandidaten sier «jeg» der arbeidet i realiteten var kollektivt",
    ],
    answer: 0,
    explanation: "Connection er en menneske-test, ikke en analyseoppgave. Tall på utfallet er et ekte krav, men det er ikke det som nevnes oftest her. «Jeg» er tvert imot det du skal si: McKinsey advarer mot «vi» på sin egen karriereside. Og 60–75 sekunder er nettopp der handlingsdelen <i>skal</i> ligge i tidsbudsjettet på to minutter — lengdeproblemet er en for lang oppbygging, der situasjon og oppgave til sammen skal ta 25 sekunder.",
  },

  { id: "q56", ch: 11, oppg: 1, type: "mcq",
    q: "Hvorfor krever dekningsmatrisen minst to historier per dimensjon?",
    options: [
      "Fordi hver historie bare tåler å bli fortalt én gang",
      "Fordi sondetesten krever åtte av tolv, og to historier gir flere sonder å hente fra",
      "Fordi McKinsey stiller to spørsmål per dimensjon i hver økt",
      "Fordi intervjuer to av og til spør om samme dimensjon som intervjuer én",
    ],
    answer: 3,
    explanation: "Formatet er én dimensjon per intervju og én historie per økt, så risikoen er ikke å bli spurt to ganger inne i samme økt — den er at to ulike intervjuere lander på samme dimensjon. Terskelen på åtte av tolv er et krav <b>per historie</b>, ikke noe du summerer over flere: en historie under terskelen er en reserve uansett hvor mange andre du har. Og en god historie tåler å bli fortalt igjen; den slutter bare å dekke noe hvis du merker den med alt, og derfor er den andre regelen høyst to dimensjoner per historie.",
  },

  { id: "q57", ch: 11, oppg: 1, type: "short",
    q: "Du har ikke lang yrkeserfaring. Nevn minst fire grep som gjør en studentopplevelse tung nok, og si hva du aldri skal si om skalaen.",
    model: [
      "Skalaen betyr mindre enn tettheten — kandidater undervurderer systematisk egne erfaringer",
      "Sett en teller på alt: «11 frivillige, 240 000 i budsjett, seks ukers frist», ikke «jeg ledet en komité»",
      "Løft fram innsatsen, ikke oppgaven: hva ville gått galt uten deg?",
      "Finn mennesket som sa nei — uten motstand er det ingen historie",
      "Vis at du forsto motparten, ikke bare at du vant fram",
      "Innflytelse uten autoritet slår tittel: å få medstudenter til å gjøre noe du ikke kan pålegge dem, ligger nærmere konsulenthverdagen enn et internship med tildelte oppgaver",
      "Én setning «så derfor»: hva ble varig etter at du gikk?",
      "Aldri unnskyld skalaen — «det var jo bare en studentforening, men …» ber intervjueren om å score historien lavt, og hun gjør som du sier",
      "Gruppearbeid som fungerte dårlig er gull for Connection og Growth, og de fleste kaster det",
    ],
  },

  /* ---------- Kapittel 12 · Why consulting, why this firm ---------- */

  { id: "q58", ch: 12, oppg: 1, type: "mcq",
    q: "Hva er byttetesten på «why this firm»?",
    options: [
      "Å bytte ut dine egne eksempler med firmaets egne prosjekter",
      "Å bytte rekkefølge på de tre grunnene og se om svaret fortsatt henger sammen",
      "Å skrive svaret ned, bytte firmanavnet og lese det høyt — overlever det byttet, har du beskrevet bransjen og ikke firmaet",
      "Å bytte fra norsk til engelsk og se om du fortsatt er presis",
    ],
    answer: 2,
    explanation: "Dette er den mest siterte enkeltdiagnosen i hele materialet, og den er lett å selvteste. Å øve svaret på begge språk er nyttig for seg, men det tester språk, ikke innhold. Rekkefølgen på grunnene tester struktur. De fire ordene som avslører raskest, fordi alle bruker dem og ingen skiller: <i>bratt læringskurve</i>, <i>smarte kolleger</i>, <i>utfordrende problemer</i>, <i>globalt fotavtrykk</i>.",
  },

  { id: "q59", ch: 12, oppg: 1, type: "mcq",
    q: "Hva er den sterkeste enkeltmarkøren i et «why this firm»-svar?",
    options: [
      "En rapport fra firmaet som du har lest og kan gjengi presist",
      "En faktisk samtale med en ansatt — hvem, hvilket prosjekt, og hva de sa som festet seg",
      "En presis beskrivelse av firmaets praksisområder i Norge",
      "At du sier at det er førstevalget ditt, uten forbehold",
    ],
    answer: 1,
    explanation: "En samtale kan ikke googles, og den kan ikke kopieres til neste firma — den består byttetesten av seg selv. Rapporten og praksisområdene er <b>andrevalget</b>: de er etterprøvbare og lokale og består byttetesten, men de kan slås opp, og derfor er de svakere. Å si at det er førstevalget ditt uten forbehold er noe du skal gjøre, men det er en innramming og ikke en grunn. Har du ingen slik samtale, er den fortsatt mulig å skaffe: én kaffe er verdt mer enn ti timer på karrieresidene.",
  },

  { id: "q60", ch: 12, oppg: 1, type: "short",
    q: "Nevn de tre typene spørsmål som sløser bort de siste fem minuttene, og gi minst to eksempler på spørsmål som faktisk virker.",
    model: [
      "Googlebare spørsmål: «hva slags prosjekter jobber dere med?»",
      "Selvsentrerte og for tidlige: lønn, arbeidstid, forfremmelsestempo — vent til du har tilbud",
      "Ritualspørsmål: «hvordan ser en typisk dag ut?», som intervjueren har besvart femti ganger og svarer på autopilot",
      "Om personen foran deg: «Hvem var den beste analytikeren som har jobbet for deg, og hva gjorde henne så god?»",
      "«Hva liker du best her — og hva liker du minst?» eller «Har du vært på et prosjekt som gikk galt?»",
      "Om firmaet som virksomhet, gjerne kontorspesifikt: «Oslo-kontoret jobber mye mot sjømat — endrer det hva slags analytiker som lykkes her?»",
      "Be om tilbakemelding, eller hva som ville gjort deg sterkere til neste runde — svakheter flagget i runde 1 granskes hardt i runde 2",
      "Tilpass nivået: firma- og markedsspørsmål til partneren, hverdagsspørsmål og ærlige spørsmål om det harde til den ferske analytikeren",
      "Still aldri et spørsmål du allerede vet svaret på for å vise at du har lest deg opp — det gjennomskues",
    ],
  },

  /* ---------- Kapittel 13 · De digitale testene ---------- */

  { id: "q61", ch: 13, oppg: 1, type: "mcq",
    q: "I Solves analysedel har du kalkulator på skjermen. Likevel gjør kandidatene feil. Hva er forklaringen kapitlet gir?",
    options: [
      "At mini-casene kommer helt til slutt, når tiden er i ferd med å renne ut",
      "At feilene kommer fra enhets- og tidsperiodemismatch — en månedsrate ganget med et årstall, eller en verdi i tusen mot en i hele kroner",
      "At klokka løper og kalkulatoren på skjermen er treg å bruke",
      "At Solve måler forretningskunnskap, som de fleste studenter mangler",
    ],
    answer: 1,
    explanation: "Solve straffer ikke regnehastighet, men slurv i oppsettet — og det er nøyaktig samme feil som feller folk i den levende casen. At Solve skulle måle forretningskunnskap er direkte motsatt av det som gjelder: ingen av testene måler det, de måler strukturering, prioritering og beslutning under tidspress. At mini-casene kan bli tidsskvist er en ekte risiko — rådet fra kandidater er å spare 10–15 minutter til dem — men det forklarer ikke feilene i analysedelen. Og tempoet er nettopp ikke problemet når kalkulatoren står der.",
  },

  { id: "q62", ch: 13, oppg: 1, type: "mcq",
    q: "Du finner en Solve-guide som bruker mye plass på Ecosystem Building, spillet med 39 arter. Hva gjør du?",
    options: [
      "Trener på det, siden det fortsatt er en av de tre modulene",
      "Trener på det som oppvarming til Sea Wolf, som bruker samme mekanikk",
      "Legger det bort: det er i praksis faset ut av standardoppsettet, så du ville trent på fjorårets test",
      "Trener på det bare hvis invitasjonen din er på 85 minutter",
    ],
    answer: 2,
    explanation: "Standardoppsettet i 2026 er Redrock og Sea Wolf. De 85 minuttene betyr at et tredje spill er med — <b>Sustainable Futures Lab</b>, ikke Ecosystem Building; å tro noe annet er å bruke lengden på invitasjonen som argument for feil modul. Og Sea Wolf deler ikke mekanikk med økosystemspillet: det er en optimeringsoppgave der du kategoriserer mikrober og snitter attributtverdier inn i målintervaller, altså vektede og uvektede gjennomsnitt pluss intervallsjekk. Prep-nettsteder daterer dessuten alt til inneværende år uansett alder.",
  },

  { id: "q63", ch: 13, oppg: 1, type: "mcq",
    q: "Hva er det viktigste å vite om SOVA?",
    options: [
      "At den ikke har klokke, så «ta god tid» er riktig råd der",
      "At den alltid er testen Bain sender i EMEA, så du kan planlegge for den",
      "At den erstattet TestGorilla i 2024",
      "At den ikke har synlig klokke, men at tidsbruken registreres og inngår i vurderingen sammen med treffsikkerheten",
    ],
    answer: 3,
    explanation: "Den manglende klokka er nettopp fellen: den ser ut som en invitasjon til å ta god tid, og gir motsatt effekt. Rekkefølgen er også snudd i ett av alternativene — det var TestGorilla som kom i 2024, <i>ved siden av</i> den eldre SOVA-pakken fra rundt 2019. Og du kan ikke planlegge for SOVA: Bain sender én av de to, og hvilken det er, står i innkallingen. Dette er det ene punktet der alle kildene er samstemte, og det ene punktet der en kandidat lett bruker en hel uke feil.",
  },

  /* ---------- Kapittel 14 · Uka før, dagen før, i rommet ---------- */

  { id: "q64", ch: 14, oppg: 1, type: "mcq",
    q: "Du står helt fast i minutt nitten. Hvilket trekk kommer først?",
    options: [
      "Si hvor du er: beskriv kanten av det du vet og navngi hullet — «jeg vet at marginen har falt og volumet er flatt, så fallet må ligge i kostnadene; det jeg mangler, er kostnadene fordelt på post»",
      "Bygg en ny struktur fra bunnen, siden den gamle åpenbart ikke førte fram",
      "Gjett et tall, slik at samtalen ikke stopper opp",
      "Spør «er det noe annet jeg burde se på?»",
    ],
    answer: 0,
    explanation: "Å si <i>hvor</i> du er, ikke bare <i>at</i> du er fast, løser situasjonen oftere enn noe annet — du viser intervjueren nøyaktig hvilket hull hun kan fylle, og selv når hun ikke fyller det, har du vist at du kjenner forskjellen på å mangle data og å mangle retning. En ny struktur fra bunnen er det dyreste du kan gjøre i rommet: du kaster fem minutters arbeid, mister alt hun allerede har akseptert, og bruker opp tiden du hadde igjen. Et gjettet tall må du etterpå forsvare uten å tro på det. Og «er det noe annet jeg burde se på?» ber intervjueren om å gjøre jobben din — den sterke versjonen er en konkret dataforespørsel.",
  },

  { id: "q65", ch: 14, oppg: 1, type: "mcq",
    q: "Det er uka før intervjuet. Hva er verdt tiden?",
    options: [
      "Et nytt rammeverk, så du har flere verktøy tilgjengelig",
      "Enda en casebok, for bredden",
      "Bransjekunnskap i bredden, så du ikke blir tatt på senga",
      "Hoderegning femten minutter hver dag, og én hel case høyt med en person annenhver dag — med syntese, på tid",
    ],
    answer: 3,
    explanation: "Den siste uka kan ikke gjøre deg vesentlig bedre, men den kan gjøre deg vesentlig dårligere. Et rammeverk lært på fredag og brukt på mandag er den sikreste måten å høres resitert ut. Enda en casebok rekker du ikke å gjøre noe med. Og ingen taper på å ikke kunne marginen i flybransjen. Det som fortsatt flytter noe, er mengdetrening på hoderegning, hele caser høyt med syntese, fit-historiene sagt høyt, og egne notater fra tidligere caser: hvilken svakhet gjentar seg?",
  },

  { id: "q66", ch: 14, oppg: 1, type: "short",
    q: "Hva har du med deg inn i rommet, og hva gjør du de første nitti sekundene etter at prompten kommer?",
    model: [
      "Ti til femten blanke A4-ark, egne, i landskapsformat fra første ark",
      "To penner som virker — ikke blyant, du blir fristet til å viske ut, og det koster tid",
      "En klokke på bordet du kan se uten å snu hodet",
      "Ingen kalkulator før du har spurt: «Er kalkulator greit, eller regner jeg for hånd?» Anta at svaret er nei",
      "To utskrifter av CV-en, og de fire spørsmålene dine skrevet ned",
      "Vann — å drikke er den mest legitime pausen som finnes",
      "Når prompten kommer: la pennen ligge stille, og se på personen, ikke på papiret",
      "Skriv så tre ting og bare tre: målet, tallet og spørsmålet",
      "Gjenta oppdraget tilbake med egne ord og be om bekreftelse: «Er det riktig oppfattet?»",
      "Er formatet uklart: «Vil du at jeg driver casen fremover, eller foretrekker du å lede meg gjennom?»",
    ],
  },

  /* ---------- Kapittel 15 · Tallarket ---------- */

  { id: "q67", ch: 15, oppg: 1, type: "mcq",
    q: "Faste kostnader er 200, prisen 50 og variabel kostnad per enhet 30. Hva er nullpunktet i enheter?",
    options: [
      "10 enheter",
      "4 enheter",
      "6,7 enheter",
      "40 prosent",
    ],
    answer: 0,
    explanation: "Dekningsbidraget per enhet er 50 − 30 = 20, og nullpunktet er faste kostnader delt på <b>dekningsbidraget</b>: 200 / 20 = 10 enheter. Å dele på prisen gir 200 / 50 = 4, og det er den enkeltfeilen kapitlet navngir eksplisitt — prisen dekker jo også den variable kostnaden, så den kan ikke brukes til å dekke faste. Å dele på variabel kostnad (200 / 30 ≈ 6,7) svarer ikke på noe. Og 40 prosent er dekningsgraden (20/50); den brukes til nullpunkt i <i>omsetning</i>: 200 / 0,4 = 500 kr, som stemmer med 10 enheter à 50 kr.",
  },

  { id: "q68", ch: 15, oppg: 1, type: "mcq",
    q: "Omsetningen er ned 15 prosent mens prisen er opp 5 prosent. Hva har volumet gjort?",
    options: [
      "Ned 10 prosent, siden −15 og +5 legges sammen",
      "Ned 19 prosent, fordi endringer multipliseres: 0,85 / 1,05 ≈ 0,81",
      "Ned 20 prosent, siden 15 og 5 begge er tapt volum",
      "Ned 15 prosent — prisøkningen påvirker ikke volumet",
    ],
    answer: 1,
    explanation: "Volumindeks = omsetningsindeks / prisindeks = 0,85 / 1,05 ≈ 0,81, altså ned 19 prosent. <b>Prosenter kan ikke legges sammen</b>; de multipliseres, og det gjelder begge veier — både å legge dem sammen med fortegn (−10) og å summere dem uten (−20) er samme metodefeil. Å svare −15 glemmer at omsetning er pris ganger volum: når prisen har steget, må den divideres ut før volumet kan leses, ellers tilskriver du hele omsetningsfallet til kundene.",
  },

  { id: "q69", ch: 15, oppg: 1, type: "mcq",
    q: "Klienten kutter prisen 3 prosent og har 30 prosent dekningsgrad. Hvor mye må volumet opp for at dekningsbidraget skal være uendret?",
    options: [
      "3 prosent, siden priskuttet er 3 prosent",
      "10 prosent, siden 3 av 30 er 10 prosent",
      "11 prosent — nødvendig volumøkning er priskuttet delt på (dekningsgrad − priskutt), altså 3 / 27",
      "30 prosent, siden hele dekningsgraden må dekkes inn",
    ],
    answer: 2,
    explanation: "Dekningsbidraget faller fra 30 til 27 av hver hundrelapp, så volumet må opp 30/27 = 1,11, altså 11 prosent. Feilsvaret 10 prosent regner 3 av 30 og glemmer at priskuttet også senker marginen du nå tjener på hver enhet — nevneren er 27, ikke 30. Å svare 3 prosent forutsetter at volumet bare skal matche priskuttet én til én, men det er dekningsbidraget som må erstattes, ikke prisen. Og 30 prosent forveksler nivået på dekningsgraden med den nødvendige endringen.",
  },

];
