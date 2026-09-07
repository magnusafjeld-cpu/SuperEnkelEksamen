/* ===================== FIE432 PERSONLIG ØKONOMI · FAGDATA =====================
   Alt innhold på norsk: kurset undervises på norsk og eksamen besvares på norsk.

   Pensumteksten står IKKE her. Den parses fra FIE432_Manual.html.
   Studieplanen er modulbasert (plan.mode = "modules"): «i dag» er første
   ufullførte modul, ikke en dato. Eksamen er 4 timers digital flervalgseksamen
   i Wiseflow, fra høsten 2026 med minuspoeng for feil svar.

   Kontrakten for alt innhold: docs/fie432-forfatterspek.md og
   docs/fie432-kursplan.md. Kartleggingen ligger i docs/fie432-research/.
   ============================================================================= */
window.EDU_DATA = window.EDU_DATA || {};

/* ===================== STUDIEPLAN =====================
   21 moduler, fremdriftsstyrt. Modul 1–18 bygger faget fra bunnen i
   kapittelrekkefølge, 19–21 er ren eksamenstrening på ekte sett.

   Vektingen følger frekvensanalysen i docs/fie432-research/01-eksamens-dna.md:
   aksjonærmodellen, formuesskatten og insidens får egne moduler fordi de er de
   mest testede temaene, mens de lettere kapitlene deler modul.

   estMinutes er foreløpige. Kjør tools/rekalibrer-plan.py fie432 når manualen
   er skrevet, så settes de av faktisk ordantall og antall gjennomregnede
   eksempler — det var den korreksjonen som avslørte at to FIE402-moduler var
   feilvektet med over 200 minutter.
   ====================================================== */
window.EDU_DATA.plan = {
  mode: "modules",
  totalDays: 21,
  startDate: "2026-08-19",
  examNote: "4 timer · digital flervalgseksamen i Wiseflow · minuspoeng for feil svar",
  phaseColors: {
    "Grunnlaget": "slate",
    "Aktiva og avkastning": "teal",
    "Aksjonær- og formuesbeskatning": "amber",
    "Skatteteori": "indigo",
    "Personlig finans": "green",
    "Eksamenshåndverk": "slate",
    "Eksamenstrening": "rose",
  },
  days: [
    { day: 1, phase: "Grunnlaget",
      title: "Eksamens-DNA og skattesystemets satser",
      chapters: [0, 1], estMinutes: 215,
      goals: [
        "Gjøre rede for eksamensformatet — 4 timer, flervalg, fire alternativer, minuspoeng — og regne ut når det lønner seg å svare",
        "Skille progressivt fra proporsjonalt: et system er progressivt når gjennomsnittsskatten stiger med inntekten, ikke når de rike betaler flere kroner",
        "Regne gjennomsnittsskatt i et trinnsystem, trinn for trinn",
        "Regne effektiv skattesats som betalt skatt delt på bruttoinntekt, og forklare hvorfor en eiers andel av selskapets skatt hører med",
      ],
      keyConcepts: ["Alminnelig inntekt 22 %", "Trinnskatt", "Personfradrag", "Progressivitet", "Effektiv skattesats", "Minuspoeng"],
      review: [],
      tasks: [
        { t: "Regn ut gjettestrategien selv", sub: "Med 3 for rett og −1 for feil: hva er forventet poeng ved å gjette blant fire, tre og to alternativer?", rute: "#/chapter/0" },
        { t: "Ta quizen på kapittel 0 og 1", sub: "Særlig progressivitet og effektiv skattesats", rute: "#/quiz" },
      ],
      milestone: "Eksamensformatet og gjettestrategien sitter",
      tip: "Skriv regelen på et ark: svar når du kan utelukke minst ett alternativ, la stå blankt ellers. Den er verdt poeng i seg selv." },

    { day: 2, phase: "Grunnlaget",
      title: "Avkastning før og etter skatt, og tidsverdien av et fradrag",
      chapters: [2], estMinutes: 130,
      goals: [
        "Dekomponere totalavkastning i kapitalgevinst og direkteavkastning, alltid delt på inngangsverdien",
        "Gå fra nominell til etter skatt til realavkastning — i den rekkefølgen",
        "Regne nåverdien av et fradrag, og forklare hvorfor det lønner seg å ta det med en gang",
        "Sette opp to-periodemodellen og skille substitusjons- fra inntektseffekt av en renteendring",
      ],
      keyConcepts: ["Totalavkastning", "Realavkastning", "Superprofitt", "Nåverdi av fradrag", "Låntaker mot långiver"],
      review: [1],
      tasks: [
        { t: "Regn Norske Furutrær og Milla", sub: "De to oppgavene til forelesning 2, begge veier: eksakt og approksimert", rute: "#/chapter/2" },
        { t: "Dybdetrening: Grunnlaget", sub: "Nivå 1–2 først", rute: "#/dybde" },
      ],
      milestone: "Etter-skatt-tenkningen er på plass",
      tip: "Rekkefølgen felles folk: nominelt → etter skatt → realt. Deflaterer du før skatten er trukket fra, får du feil svar." },

    { day: 3, phase: "Aktiva og avkastning",
      title: "Avkastningen på ulike aktiva over tid, og hvem som eier hva",
      chapters: [3], estMinutes: 110,
      goals: [
        "Gjengi Jordà et al.: realavkastning 1870–2015 på eiendom, aksjer, obligasjoner og statssertifikater, med risiko",
        "Forklare hvorfor porteføljetallet for eiendom ikke gjelder for den som eier ett hus",
        "Bruke SSB-tallene: hva topp 1 %-andelen blir når tilbakeholdt overskudd regnes med, og hvorfor effektiv skatt faller på toppen",
        "Sammenligne Norge og USA på inntektsvekst og skatteprogressivitet",
      ],
      keyConcepts: ["r > g", "Risikopremie", "Idiosynkratisk risiko", "Tilbakeholdt overskudd", "Regressiv på toppen"],
      review: [2],
      tasks: [
        { t: "Lær tallene som fakta", sub: "Eiendom 7,3 % og aksjer 6,7 % realt; topp 1 % fra 8 til 19 % av markedsinntekten", rute: "#/flashcards" },
      ],
      milestone: "Empirien du kan bli spurt om direkte",
      tip: "Dette kapitlet er faktatungt, og flervalg spør om tall. Kortene er viktigere her enn noe annet sted i kurset." },

    { day: 4, phase: "Aktiva og avkastning",
      title: "Investeringscaser: bolig, utleie, aksjer og folkefinansiering",
      chapters: [4], estMinutes: 150,
      goals: [
        "Regne en boliginvestering med lån, skatt på leie og egenkapitalavkastning",
        "Bruke fritakene: halvparten-regelen for egen bolig, bo- og eiertid ved salg",
        "Sammenligne aksjefond og eiendomsfond etter skatt",
        "Sette opp utlånsforskriftens krav som en beskrankning: gjeldsgrad, egenkapital, stresstest",
      ],
      keyConcepts: ["Sekundærbolig", "Halvparten-regelen", "Dokumentavgift", "Utlånsforskriften", "Folkefinansiering"],
      review: [2, 3],
      tasks: [
        { t: "Regn investeringscaset med gjeld", sub: "Regnearket fra forelesning 3, for hånd", rute: "#/chapter/4" },
      ],
      milestone: "Del I ferdig",
      tip: "Skriv alltid opp hvilken skattesats som gjelder hvilken inntekt før du regner. Det er der feilene oppstår, ikke i aritmetikken." },

    { day: 5, phase: "Aksjonær- og formuesbeskatning",
      title: "Aksjonærmodellen: skjerming, utbytte og gevinst",
      chapters: [5], estMinutes: 155,
      goals: [
        "Kjøre skjermingsrutinen: skjermingsgrunnlag → skjermingsfradrag → skattepliktig utbytte → ubenyttet rest framført OG lagt til grunnlaget",
        "Regne flere år på rad, der ubenyttet skjerming akkumulerer",
        "Regne gevinst ved salg med kostpris, ubenyttet skjerming og oppjustering",
        "Vise at oppjustering på grunnlaget og på satsen gir samme svar",
        "Forklare hvorfor oppjusteringsfaktoren finnes: 22 % + 78 % × 37,84 % = 51,52 % mot 47,4 % marginalskatt på lønn",
      ],
      keyConcepts: ["Skjermingsgrunnlag", "Skjermingsrente", "Ubenyttet skjerming", "Oppjusteringsfaktor 1,72", "Eierskatt 37,84 %", "Inntektsskifting"],
      review: [1],
      examFocus: "Skjerming og oppjustering",
      pastExam: { exam: "H2024", task: "Oppgave 1", topic: "Fire delspørsmål gjennom tre år med framført skjerming" },
      tasks: [
        { t: "Regn H2024 oppgave 1 og H2025 oppgave 4", sub: "Begge er laget for den som glemmer at ubenyttet skjerming legges til grunnlaget", rute: "#/sett" },
        { t: "Dybdetrening: Aksjonærbeskatning", sub: "Nivå 3–4 er regnetrening", rute: "#/dybde" },
      ],
      milestone: "Kursets mest sentrale rutine sitter",
      tip: "Det siste leddet er det som felles folk: den ubenyttede resten framføres og legges til neste års skjermingsgrunnlag. Skriv tabellen med én rad per år." },

    { day: 6, phase: "Aksjonær- og formuesbeskatning",
      title: "Fritaksmetoden, aksjonærlån og exit-skatt",
      chapters: [6], estMinutes: 125,
      goals: [
        "Forklare fritaksmetoden og regne treprosentregelen: 3 % × 22 % = 0,66 % effektiv skatt",
        "Begrunne holdingselskap som utsettelse, ikke som fritak",
        "Redegjøre for exit-skatten: latent gevinst, bunnfradrag, 12-årsordningen, og at gave til nærstående i utlandet utløser den",
        "Forklare hva som skjer når selskapet flyttes ut i stedet for eieren",
      ],
      keyConcepts: ["Fritaksmetoden", "Treprosentregelen", "Aksjonærlån", "Exit-skatt", "Kontinuitetsprinsippet"],
      review: [5],
      examFocus: "Fritaksmetoden og exit-skatt",
      pastExam: { exam: "H2024", task: "Oppgave 10i–j", topic: "Exit-skatt ved gave til datter i Sveits, og ved utflytting av selskapet" },
      tasks: [
        { t: "Les H2024 oppgave 10 i sin helhet", sub: "Ti delspørsmål, 10 av 48 poeng", rute: "#/sett" },
      ],
      milestone: "Selskapssiden av aksjonærbeskatningen dekket",
      tip: "Exit-skatten ble strammet inn i mars 2024. Oppgaver fra før det bruker de gamle reglene — sjekk årstallet på settet." },

    { day: 7, phase: "Aksjonær- og formuesbeskatning",
      title: "Formuesskatten: verdsetting, rabatter og gjeldsfordeling",
      chapters: [7], estMinutes: 170,
      goals: [
        "Verdsette hver aktivaklasse riktig: børsnoterte aksjer og fond 80 %, primærbolig 25 % under terskelen, sekundærbolig 100 %, unoterte til bokført verdi",
        "Fordele gjeld forholdsmessig etter bruttoverdi, og redusere den henførte gjelden med rabatten — men ikke for primærbolig",
        "Regne skattepliktig nettoformue per aktivum og som sum, og vise at de to gir samme svar",
        "Forklare Anine-regnestykket: hvorfor et unotert selskap verdsettes helt annerledes enn et børsnotert",
      ],
      keyConcepts: ["Verdsettingsrabatt", "Forholdsmessig gjeldsfordeling", "Bunnfradrag", "Bokført verdi", "Aksjerabatt"],
      review: [1, 5],
      examFocus: "Gjeldsfordeling",
      pastExam: { exam: "H2024", task: "Oppgave 6", topic: "Gjeld på 1,8 mill. fordelt på primærbolig, aksjer og bank" },
      tasks: [
        { t: "Regn H2024 oppgave 6 og H2025 oppgave 2", sub: "H2025 godtok to svar — forstå hvorfor", rute: "#/sett" },
      ],
      milestone: "Gjeldsfordelingen kan gjøres uten mal",
      tip: "Sett opp tabellen med én kolonne per aktivum og én rad per steg: bruttoverdi, andel, formuesverdi, andel gjeld, fradragsberettiget gjeld, netto. Da går den aldri galt." },

    { day: 8, phase: "Aksjonær- og formuesbeskatning",
      title: "Formuesskatt som avkastningsskatt",
      chapters: [8], estMinutes: 160,
      goals: [
        "Vise at en formuesskatt som faller på inngående formue tilsvarer en avkastningsskatt τ_w/r",
        "Regne avkastning etter formuesskatt, og verdsette en evig kontantstrøm under formuesskatt",
        "Regne hvor stort utbytte som må tas for å dekke både formuesskatten og eierskatten på utbyttet",
        "Gjengi argumentene for og mot formuesskatt som argumenter, ikke som standpunkt",
      ],
      keyConcepts: ["τ_w/r", "Verdsetting under formuesskatt", "Alternativkostnad", "Utbytte for å betale formuesskatt", "Effektiv skatt på de rikeste"],
      review: [2, 7],
      examFocus: "Formuesskatt som avkastningsskatt",
      pastExam: { exam: "H2025", task: "Oppgave 3, 6 og 9", topic: "17 % av settets poeng — det tyngste enkelttemaet i H2025" },
      tasks: [
        { t: "Regn H2025 oppgave 3 helt gjennom", sub: "Fire delspørsmål som bygger på hverandre", rute: "#/sett" },
      ],
      milestone: "Del II ferdig — kursets tyngste del",
      tip: "Dette temaet var fraværende før 2021 og var 17 prosent av poengene i 2025. Behandle det som om det kommer igjen." },

    { day: 9, phase: "Skatteteori",
      title: "Nøytralitet, skattearbitrasje, progressivitet og flat skatt",
      chapters: [9, 10], estMinutes: 225,
      goals: [
        "Forklare hva nøytral kapitalbeskatning betyr, og hvorfor brudd på den flytter kapital etter skatt i stedet for etter avkastning",
        "Sette opp bedriftens førsteordensbetingelse med delvis rentefradrag: F′(K) = r(1 − At)/(1 − t)",
        "Vise at gjeld blir billigere enn egenkapital når bare renter er fradragsberettiget, og at E* < G* følger av det",
        "Gjengi argumentene for og mot flat skatt, og hva som skjer med progressiviteten når bunnfradraget endres",
      ],
      keyConcepts: ["Nøytralitet", "Skattearbitrasje", "Dobbeltbeskatning", "F′(K) = r(1 − At)/(1 − t)", "Flat skatt", "Evneprinsippet"],
      review: [1, 5],
      examFocus: "Bedriftens tilpasning",
      pastExam: { exam: "H2025", task: "Oppgave 7", topic: "Tre delspørsmål om kapitalbruk og gjeld mot egenkapital" },
      tasks: [
        { t: "Utled førsteordensbetingelsen selv", sub: "Fra V = F(K) − rK − t(F(K) − rAK)", rute: "#/chapter/9" },
      ],
      milestone: "Skatteteoriens grunnbegreper",
      tip: "Forelesning 6, 7 og 8 har ingen lysbilder i materialet. Disse kapitlene er skrevet fra pensumartiklene og eksamensoppgavene — de er derfor viktigere å lese enn resten." },

    { day: 10, phase: "Skatteteori",
      title: "Hvem betaler skatten: insidens og elastisiteter",
      chapters: [11], estMinutes: 165,
      goals: [
        "Utlede ∂p/∂t = D′/(S′ − D′) og ∂P/∂t = S′/(S′ − D′) fra likevekten D(P) = S(p + t)",
        "Bruke fortegnene: D′ < 0, S′ > 0, så nevneren er positiv og de to derivertene har motsatt fortegn",
        "Håndtere grensetilfellene: perfekt uelastisk etterspørsel gir hele byrden til konsumenten, perfekt elastisk til produsenten",
        "Formulere elastisitetsregelen: den minst elastiske siden bærer skatten",
      ],
      keyConcepts: ["Stykkskatt", "Insidens", "Konsumentpris mot produsentpris", "Elastisitet", "Dødvektstap"],
      review: [9],
      examFocus: "Insidens",
      pastExam: { exam: "H2024", task: "Oppgave 8", topic: "Ni poeng på selve derivasjonen — settets største enkeltoppgave" },
      tasks: [
        { t: "Regn H2024 oppgave 8 og H2025 oppgave 8", sub: "Den ene spør etter uttrykket, den andre etter tallet", rute: "#/sett" },
        { t: "Tegn de fire grensetilfellene", sub: "Uelastisk og elastisk på begge sider", rute: "#/chapter/11" },
      ],
      milestone: "Kursets mest testede enkelttema sitter",
      tip: "Insidens er i åtte av ni eksamenssett og nesten tolv prosent av poengene. Kan du utlede formelen, kjenner du igjen feil fortegn på et blunk." },

    { day: 11, phase: "Skatteteori",
      title: "Skatt, risiko og implisitte skatter",
      chapters: [12], estMinutes: 135,
      goals: [
        "Forklare Domar–Musgrave: proporsjonal skatt med fullt tapsfradrag gjør staten til stille partner, og investoren øker den risikable andelen",
        "Oppgi betingelsen for at resultatet holder, og hva som skjer uten fullt tapsfradrag",
        "Regne implisitt skatt: t* = 1 − r_skattefri/r_skattlagt, og bruke likevekten r_A = r_B(1 − t)",
        "Avgjøre hvem som tjener på et skattefavorisert aktivum",
      ],
      keyConcepts: ["Domar–Musgrave", "Tapsfradrag", "Implisitt skatt", "Skattefavorisering", "Marginalskatt mot implisitt sats"],
      review: [2, 9],
      examFocus: "Implisitt skatt",
      pastExam: { exam: "H2024", task: "Oppgave 9", topic: "To obligasjoner med samme risiko, én skattefri" },
      tasks: [
        { t: "Regn ut når du bør velge det skattefrie", sub: "Velg det skattefrie hvis din marginalskatt overstiger den implisitte satsen", rute: "#/chapter/12" },
      ],
      milestone: "Koblingen skatt–risiko–pris",
      tip: "Den implisitte skatten er markedets, ikke din. Det er nettopp forskjellen mellom de to som avgjør hva du bør eie." },

    { day: 12, phase: "Skatteteori",
      title: "Internasjonal skatt og skatteparadiser",
      chapters: [13], estMinutes: 150,
      goals: [
        "Skille globalskatteplikt fra kildeskatt, og forklare når et fast driftssted oppstår",
        "Bruke unntaksmetoden og kreditmetoden på samme inntekt, og se hva som skiller dem",
        "Forklare dobbelt-ikke-beskatning under fullstendig unntak, og hvorfor kredit begrenses til hjemstatens skatt",
        "Redegjøre for skatteparadisenes mekanismer og for tiltakene mot dem",
      ],
      keyConcepts: ["Fast driftssted", "Unntaksmetoden", "Kreditmetoden", "Secrecy jurisdiction", "Internprising", "Global minimumsskatt"],
      review: [6],
      examFocus: "Internasjonal skatt",
      pastExam: { exam: "H2024", task: "Oppgave 10", topic: "Ti delspørsmål om et selskap med avdelinger i USA, BVI og Japan" },
      tasks: [
        { t: "Regn H2024 oppgave 10 land for land", sub: "USA unntak, Japan kredit, BVI ingen avtale", rute: "#/sett" },
      ],
      milestone: "Del III ferdig",
      tip: "Dette temaet var 17–19 prosent av poengene i 2022 og 2024, men fraværende i 2025 — og årets plan navngir ingen gjesteforeleser i skatterett. Dekk det, men prioriter det under formuesskatt og insidens." },

    { day: 13, phase: "Personlig finans",
      title: "Sparing og porteføljevalg",
      chapters: [14], estMinutes: 140,
      goals: [
        "Regne forventning og varians for en portefølje av to aktiva, og se hva korrelasjonen gjør",
        "Bruke Mertons formel w* = (μ − r_f)/(γσ²) og løse den for hvilken som helst av variablene",
        "Justere aksjeandelen for humankapital: risikofri humankapital gir høyere andel, aksjemarkedsnær gir lavere",
        "Forklare hvorfor giring av markedsporteføljen slår enkeltaksjer når du vil ha mer risiko",
        "Gjengi hva Forbrukerrådet fant om aktive fond mot indeksfond",
      ],
      keyConcepts: ["Merton-andelen", "Humankapital", "Kapitalmarkedslinjen", "Korrelasjon", "Indeksfond", "Valutasikring"],
      review: [2, 3],
      examFocus: "Merton og humankapital",
      pastExam: { exam: "H2025", task: "Oppgave 11", topic: "Fire delspørsmål: γ, risikofri humankapital, beta 1, og alder" },
      tasks: [
        { t: "Regn H2025 oppgave 11 og H2024 oppgave 12", sub: "Sammen dekker de hele temaet", rute: "#/sett" },
      ],
      milestone: "Porteføljevalget kan begrunnes, ikke bare regnes",
      tip: "Ved perfekt positiv korrelasjon finnes ingen diversifiseringsgevinst — da velger du bare den med lavest standardavvik. Det spørsmålet har kommet ordrett." },

    { day: 14, phase: "Personlig finans",
      title: "Pensjon: folketrygd, tjenestepensjon og IPS",
      chapters: [15], estMinutes: 140,
      goals: [
        "Regne pensjonsbeholdning: 18,1 prosent av inntekt opp til 7,1 G, alle år",
        "Forklare delingstallet og levealdersjusteringen, og hvorfor utsatt uttak gir høyere årlig pensjon",
        "Skille innskuddspensjon fra ytelsespensjon på hvem som bærer risikoen",
        "Forklare IPS som utsatt skatt og rentefritt lån fra staten, med formuesskattefritak",
      ],
      keyConcepts: ["Alleårsregel", "7,1 G", "Delingstall", "Levealdersjustering", "OTP-minimum", "IPS", "BSU"],
      review: [13],
      examFocus: "Pensjon",
      pastExam: { exam: "H2025", task: "Oppgave 14 og 17", topic: "Delingstall ved utsatt uttak, og innskudd mot ytelse" },
      tasks: [
        { t: "Regn din egen pensjonsbeholdning", sub: "Med dagens G og en antatt lønnsbane", rute: "#/chapter/15" },
      ],
      milestone: "Pensjonssystemet kan forklares uten oppslag",
      tip: "Utsatt uttak senker delingstallet og hever den årlige utbetalingen. Ordningen er nøytral, så det er levealderen din, ikke staten, som avgjør om det lønner seg." },

    { day: 15, phase: "Personlig finans",
      title: "Lån og risikostyring",
      chapters: [16], estMinutes: 165,
      goals: [
        "Regne terminbeløp på annuitetslån med månedsrente, og skille renter fra avdrag",
        "Regne effektiv rente med gebyrer, og forklare hvorfor den avviker fra nominell",
        "Bruke utlånsforskriften som beskrankning: fem ganger inntekt, ti prosent egenkapital, tre prosentpoeng stresstest, avdrag over seksti prosent belåning",
        "Vurdere avdragsfrihet, fastrente og rammelån som risikostyring, ikke som besparelse",
      ],
      keyConcepts: ["Annuitet", "Effektiv rente", "Gjeldsgrad", "Stresstest", "Avdragsfrihet", "Rentefradrag"],
      review: [4],
      examFocus: "Lån",
      pastExam: { exam: "H2024", task: "Oppgave 14", topic: "Når avdragsfrihet er fornuftig" },
      tasks: [
        { t: "Regn et lån på 3 millioner over 20 år", sub: "Terminbeløp, første måneds renter, og det samme etter skatt", rute: "#/chapter/16" },
      ],
      milestone: "Lånematematikken sitter",
      tip: "Bare renten gir fradrag, ikke avdraget. Og annuitetsformelen tar månedsrenten, ikke årsrenten — det er de to feilene som går igjen." },

    { day: 16, phase: "Personlig finans",
      title: "Forsikring og forventet nytte",
      chapters: [17], estMinutes: 160,
      goals: [
        "Regne forventet nytte med og uten forsikring for U = √W og U = ln W",
        "Vise at en risikoavers person fullforsikrer til aktuarisk pris",
        "Finne maksimal premie som sikkerhetsekvivalent, og laveste skadesannsynlighet som gjør forsikringen lønnsom",
        "Forklare hvorfor halv dekning til samme premie ikke lenger er attraktiv",
      ],
      keyConcepts: ["Risikoaversjon", "Forventet nytte", "Sikkerhetsekvivalent", "Aktuarisk pris", "Maksimal premie", "Lovpålagt forsikring"],
      review: [13],
      examFocus: "Forventet nytte",
      pastExam: { exam: "H2025", task: "Oppgave 13", topic: "Hus til 9 millioner, premie 160 000, og hvor lav sannsynligheten kan være" },
      tasks: [
        { t: "Løs H2025 oppgave 13 begge veier", sub: "Både ved å løse ligningen og ved å sette alternativene inn — begge er godkjent metode", rute: "#/sett" },
      ],
      milestone: "Nytteteorien kan brukes, ikke bare gjengis",
      tip: "Sensor godtar prøve-og-feile her: sett alternativene inn i nyttefunksjonen og se hvilket som stemmer. På en flervalgseksamen er det ofte raskere enn å løse ligningen." },

    { day: 17, phase: "Personlig finans",
      title: "Finansiell psykologi",
      chapters: [18], estMinutes: 115,
      goals: [
        "Navngi atferdsfeilene og si hva hver av dem koster",
        "Forklare disposisjonseffekten og hvorfor den er dyrere enn den ser ut",
        "Begrunne hjemmebias som et diversifiseringsproblem, ikke en preferanse",
        "Peke på hvilke regler og ordninger som beskytter mot hvilke feil",
      ],
      keyConcepts: ["Overconfidence", "Disposisjonseffekt", "Hjemmebias", "Mental regnskapsføring", "Tapsaversjon", "Flokkatferd"],
      review: [13, 14],
      tasks: [
        { t: "Finn din egen", sub: "Hvilke to av feilene kjenner du igjen fra egne beslutninger?", rute: "#/chapter/18" },
      ],
      milestone: "Del IV ferdig — hele pensum er lest",
      tip: "Dette kapitlet er kort og testes som begreper. Kortene holder." },

    { day: 18, phase: "Eksamenshåndverk",
      title: "Flervalg med minuspoeng, og formelarket",
      chapters: [19, 20], estMinutes: 165,
      goals: [
        "Bruke utelukkingsrutinen: svar når du kan utelukke minst ett alternativ, la stå blankt ellers",
        "Kjenne igjen hvordan de tre gale alternativene lages i dette kurset",
        "Sette et tidsbudsjett for fire timer",
        "Gå gjennom regnerutinene som sjekkliste, med kontrollen for hver",
      ],
      keyConcepts: ["Utelukking", "Forventet verdi av gjetting", "Distraktormønstre", "Tidsbudsjett", "Kontrollregning"],
      review: [5, 7, 11],
      milestone: "Klar for kursgodkjenningstesten",
      tasks: [
        { t: "Ta kursgodkjenningstesten på Canvas", sub: "17 av 20 rett kreves. Tre forsøk, samarbeid tillatt, individuell levering", rute: "#/progress" },
        { t: "Gå gjennom alle regnerutinene", sub: "Én per linje, med kontrollen for hver", rute: "#/chapter/19" },
      ],
      tip: "Kursgodkjenningen er en forutsetning for å gå opp til eksamen, og fristen er den samme som oppmeldingsfristen. Ikke la den gli." },

    { day: 19, phase: "Eksamenstrening",
      title: "Høsten 2022 i øvingsmodus",
      chapters: [], estMinutes: 150,
      goals: [
        "Kjøre et helt sett med fasit underveis, én oppgave om gangen",
        "Kjenne igjen skjermings- og oppjusteringsrutinene under tidspress",
        "Legge merke til at satsene er 2022-satser, ikke dagens",
      ],
      keyConcepts: [], review: [5, 6, 13],
      examFocus: "Hele settet",
      pastExam: { exam: "H2022", task: "Hele settet", topic: "Hjemmeeksamen — tyngre oppgaver enn skoleeksamen" },
      tasks: [{ t: "Kjør H2022 i øvingsmodus", sub: "Skriv svaret før du åpner fasiten", rute: "#/sett" }],
      milestone: "Første hele sett gjennomført",
      tip: "Dette var hjemmeeksamen, så oppgavene er tyngre enn det du møter. Bruk det til å bygge rutine, ikke til å måle deg selv." },

    { day: 20, phase: "Eksamenstrening",
      title: "Høsten 2024 på tid",
      chapters: [], estMinutes: 240,
      goals: [
        "Kjøre et helt sett på fire timer uten fasit tilgjengelig",
        "Bruke utelukkingsrutinen på ekte spørsmål",
        "Se hva minuspoeng ville gjort med resultatet",
      ],
      keyConcepts: [], review: [5, 7, 11, 13],
      examFocus: "Hele settet",
      pastExam: { exam: "H2024", task: "Hele settet", topic: "48 poeng, 14 oppgaver, tung internasjonal skatt" },
      tasks: [{ t: "Kjør H2024 i eksamensmodus med minuspoeng på", sub: "Resultatkortet viser hva settet ville gitt uten straff også", rute: "#/sett" }],
      milestone: "Første ekte tidsprøve",
      tip: "Slå på minuspoeng selv om settet ikke hadde det. Det er 2026-forholdene du skal trene til." },

    { day: 21, phase: "Eksamenstrening",
      title: "Generalprøve: Høsten 2025 på tid",
      chapters: [], estMinutes: 240,
      goals: [
        "Gjennomføre den beste enkeltmålingen av hvor du står",
        "Bruke hele tidsbudsjettet uten å haste",
        "Gå gjennom hver bom og finne ut hvilken feil alternativet svarte til",
      ],
      keyConcepts: [], review: [5, 7, 8, 11, 13, 14],
      examFocus: "Hele settet",
      pastExam: { exam: "H2025", task: "Hele settet", topic: "Formatet du faktisk møter, satt av samme foreleser" },
      tasks: [{ t: "Kjør H2025 i eksamensmodus med minuspoeng", sub: "Gå gjennom hver eneste bom etterpå", rute: "#/sett" }],
      milestone: "Klar til eksamen",
      tip: "H2025 er satt av Schjelderup, som også setter din eksamen. Av alt materialet er dette det som ligner mest på det du møter." },
  ],
};

/* ---------- quiz ----------
   Skrives sammen med kapitlene. Type "mcq" (options + answer) eller "short"
   (krever model:[…]). ch = kapittelnummer, oppg = 1 for alle (faget har ingen
   oppgaveinndeling på eksamen). */
window.EDU_DATA.quizzes = [];

/* ---------- flashcards ----------
   deck: "begrep" | "sats" | "regel" | "formel". Formelkortene genereres
   automatisk fra tabellene i k20 og skal ikke skrives her. */
window.EDU_DATA.flashcards = [];

/* ---------- aktiv læring ---------- */
window.EDU_DATA.activeLearning = {};

/* ---------- ordliste ----------
   Symbolene brukes av søket og av lynspillet «Match formelen». */
window.EDU_DATA.glossary = { economists: [], symbols: [] };
