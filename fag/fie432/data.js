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
  examNote: "4 timer · digital flervalgseksamen i Wiseflow · minuspoeng for feil svar · 12. november",
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
   Oppgavekortene (id fo-*): forsiden er en oppgavetype fra eksamen, baksiden
   regelen, framgangsmåten, fellen og kilden. deck = kategori. Bygd 10. november
   2026 av generatorene i skrapemappen og kontrollert uavhengig. Formelkortene
   genereres automatisk fra tabellene i k20 og skal ikke skrives her. */
window.EDU_DATA.flashcards = [
 {
  "id": "fo-skj-01",
  "ch": 5,
  "deck": "skjerming og gevinst",
  "front": "Skjermingsfradraget i år 1: hva er det? (Aksjen kjøpt for kr 10 000, skjermingsrente 2 %)",
  "back": "<b>Fradrag = kostpris × skjermingsrente = 200</b><br>1. Grunnlaget i år 1 er kostprisen. Ingenting er framført ennå.<br>2. 10 000 × 2 % = 200.<br>Felle: 100 (halv rente) og 300 (skattepliktig utbytte, svaret på neste ledd). Markedsverdi brukes aldri.<br>(H2024 1a, manual 5.3)"
 },
 {
  "id": "fo-skj-02",
  "ch": 5,
  "deck": "skjerming og gevinst",
  "front": "Skattepliktig utbytte når utbyttet er større enn skjermingen. (Kostpris 10 000, rente 2 %, utbytte 500)",
  "back": "<b>Skattepliktig = utbytte − skjerming = 300</b><br>1. Skjerming 10 000 × 2 % = 200.<br>2. 500 − 200 = 300. Ingenting framføres.<br>3. Spør de om skatten: 300 × 37,84 % = 113,52.<br>Felle: 200 (fradraget) og 400. Sjekk om spørsmålet gjelder grunnlaget eller skatten.<br>(H2024 1b, manual 5.3)"
 },
 {
  "id": "fo-skj-03",
  "ch": 5,
  "deck": "skjerming og gevinst",
  "front": "Utbyttet er lavere enn skjermingen. Hva er skattepliktig utbytte og hva skjer med resten? (Skjerming 200, utbytte 100)",
  "back": "<b>Skattepliktig = 0. Ubenyttet 100 framføres</b><br>1. 100 − 200 = −100, men skattepliktig utbytte blir aldri negativt.<br>2. Resten framføres som ubenyttet skjerming på samme aksje.<br>Felle: 100 eller −100. Ubrukt skjerming gir aldri tap eller fradrag i annen inntekt.<br>(H2024 1c, manual 5.3)"
 },
 {
  "id": "fo-skj-04",
  "ch": 5,
  "deck": "skjerming og gevinst",
  "front": "Skattepliktig utbytte i år 3 med ubenyttet skjerming fra år 2. (Kostpris 10 000, rente 2 %, framført 100, utbytte 400)",
  "back": "<b>Skattepliktig = 98</b><br>1. Grunnlag: 10 000 + 100 = 10 100.<br>2. Årets fradrag: 10 100 × 2 % = 202.<br>3. Samlet: 202 + 100 = 302. 400 − 302 = 98.<br>Felle: 198 (framført bare lagt til grunnlaget), 200 (framføring glemt). 202, 302 og 100 er mellomtall.<br>(H2024 1d, manual 5.3)"
 },
 {
  "id": "fo-skj-05",
  "ch": 5,
  "deck": "skjerming og gevinst",
  "front": "Ingen utbytte i år 1, utbytte i år 2 med ny rente. Skattepliktig utbytte i år 2? (Kostpris 100, rente 3,5 % og 4 %, utbytte 20)",
  "back": "<b>Skattepliktig = 12,36</b><br>1. År 1: 100 × 3,5 % = 3,50 framføres.<br>2. År 2: grunnlag 103,50 × 4 % = 4,14.<br>3. 20 − 3,50 − 4,14 = 12,36.<br>Kontroll: 100 × 1,035 × 1,04 − 100 = 7,64.<br>Felle: 12,50 (årets fradrag regnet av kostprisen), 16,50 og 15,86 (bare ett av fradragene).<br>(H2025 4, manual 5.3)"
 },
 {
  "id": "fo-skj-06",
  "ch": 5,
  "deck": "skjerming og gevinst",
  "front": "Utbyttet i år 1 er nøyaktig lik skjermingen. Skattepliktig utbytte i år 2? (Kostpris 100, rente 4 % og 2 %, utbytte 4 begge år, kurs 120)",
  "back": "<b>Skattepliktig = 2</b><br>1. År 1: skjerming 4, utbytte 4. Skattepliktig 0 og ingenting framføres.<br>2. År 2: 100 × 2 % = 2. 4 − 2 = 2.<br>Felle: Kursen 120 er støy (grunnlaget er kostpris). 0 krever framført skjerming som ikke finnes. 4 glemmer årets skjerming.<br>(Kursgodkjenning 2026 1, manual 5.3)"
 },
 {
  "id": "fo-skj-07",
  "ch": 5,
  "deck": "skjerming og gevinst",
  "front": "Akkumulert ubenyttet skjerming etter tre år. (Kostpris 2 000; rente 3 %, 4 %, 5 %; utbytte 100, 40, 50)",
  "back": "<b>Ubenyttet etter år 3 = 92</b><br>1. År 1: skjerming 60, utbytte 100. Skattepliktig 40, ingenting framført.<br>2. År 2: skjerming 80 mot utbytte 40. Framført 40.<br>3. År 3: (2 000 + 40) × 5 % = 102, pluss 40 = 142. Utbytte 50. Framført 92.<br>Felle: 52 (bare årets rest, de framførte 40 glemt), 93 og 40.<br>(H2023 1b, manual 5.3)"
 },
 {
  "id": "fo-skj-08",
  "ch": 5,
  "deck": "skjerming og gevinst",
  "front": "Gevinst ved salg med ubenyttet skjerming og oppjustering. (Kjøpt 100, solgt 160, ubenyttet skjerming 10, sats 22 %, faktor 1,72)",
  "back": "<b>Skatt = (160 − 100 − 10) × 1,72 × 22 % = 18,92</b><br>1. Gevinst: 160 − 100 − 10 = 50.<br>2. 50 × 1,72 × 22 % = 18,92 (= 50 × 37,84 %).<br>Felle: 11 (oppjustering glemt, alltid 58 % av riktig svar), 22,70 (skjermingen glemt), 17,60 (gammel faktor 1,6).<br>(H2025 10, manual 5.4)"
 },
 {
  "id": "fo-skj-09",
  "ch": 5,
  "deck": "skjerming og gevinst",
  "front": "Liten gevinst der ubenyttet skjerming halverer grunnlaget. (Kjøpt 50, solgt 60, ubenyttet 5, 22 % og faktor 1,72)",
  "back": "<b>Skatt = 5 × 37,84 % = 1,89</b><br>1. Gevinst: 60 − 50 − 5 = 5.<br>2. 5 × 1,72 × 22 % = 1,89.<br>Felle: 3,78 (skjermingen glemt, gevinst 10). 3,89 ligger rett ved og svarer ikke til noen ren regnevei. 0 hvis du tror skjermingen dekker alt.<br>(H2024 2, manual 5.4)"
 },
 {
  "id": "fo-skj-10",
  "ch": 5,
  "deck": "skjerming og gevinst",
  "front": "Aksjen selges i år 3 før årsskiftet. Gis det skjerming for salgsåret? (Kostpris 500 000, framført 50 000, solgt for 550 000)",
  "back": "<b>Nei. Bare framført skjerming brukes: skatt = 0</b><br>1. Skjermingen går til den som eier aksjen 31.12. Selges den før, faller årets fradrag bort.<br>2. Gevinst: 550 000 − 500 000 − 50 000 = 0.<br>Felle: Å trekke fra et skjermingsfradrag for salgsåret også. Det gir et negativt tall.<br>(H2022 1f, manual 5.4)"
 },
 {
  "id": "fo-skj-11",
  "ch": 5,
  "deck": "skjerming og gevinst",
  "front": "Salg med tap når aksjen har ubenyttet skjerming. Hvor mye lavere blir skatten? (Kjøpt 900, solgt 790, ubenyttet 50, 22 % og faktor 1,72)",
  "back": "<b>Skatten faller med 110 × 37,84 % = 41,62</b><br>1. Tap: 790 − 900 = −110.<br>2. Skjermingen kan ikke skape eller øke et tap. Den går tapt.<br>3. 110 × 1,72 × 22 % = 41,62.<br>Felle: 60,54 (skjermingen lagt til tapet), 24,20 (oppjustering glemt).<br>(Prøveeksamen 16 2, manual 5.3)"
 },
 {
  "id": "fo-skj-12",
  "ch": 5,
  "deck": "skjerming og gevinst",
  "front": "Delsalg: skatt når bare en del av aksjeposten selges. (200 aksjer, kostpris 150, skjerming 6 per aksje, 120 aksjer selges til 210)",
  "back": "<b>Skatt = 120 × (210 − 150 − 6) × 37,84 % = 2 452,03</b><br>1. Skjermingen følger hver aksje. Bare de solgte aksjenes skjerming brukes.<br>2. Gevinst per aksje 54, totalt 6 480.<br>3. 6 480 × 1,72 × 22 % = 2 452,03.<br>Felle: 4 086,72 (alle 200 regnet som solgt), 2 724,48 (skjermingen glemt), 1 425,60 (oppjustering glemt).<br>(Prøveeksamen 17 2, manual 5.3)"
 },
 {
  "id": "fo-skj-13",
  "ch": 5,
  "deck": "skjerming og gevinst",
  "front": "Skjerming på to aksjer, den ene utenlandsk. Samlet eierskatt? (Kostpris 100 og 200, rente 3 %, utbytte 5 og 10, eierskatt 40 %)",
  "back": "<b>Eierskatt = (2 + 4) × 40 % = 2,4</b><br>1. Skjermingen regnes per aksje. Den gjelder også utenlandske aksjer en personlig aksjonær i Norge eier.<br>2. Norsk: 5 − 3 = 2. Utenlandsk: 10 − 6 = 4.<br>3. 6 × 40 % = 2,4.<br>Felle: 4,80 (skjerming bare på den norske aksjen) og 0,8. Skjerming kan ikke flyttes mellom aksjer.<br>(H2023 5, manual 5.3)"
 },
 {
  "id": "fo-skj-14",
  "ch": 5,
  "deck": "skjerming og gevinst",
  "front": "Hvem får skjermingsfradraget?",
  "back": "<b>Personlig aksjonær som eier aksjen 31.12 i inntektsåret</b><br>1. Skjermingen tilordnes eieren ved årsskiftet. Utbytte tilordnes den som eier aksjen når utbyttet vedtas.<br>2. Selskapsaksjonærer har fritaksmetoden, ikke skjerming.<br>Felle: «Alle som eier aksjer», «selskapsaksjonærer», «utenlandske investorer».<br>(Kursgodkjenning 2026 10, manual 5.4)"
 },
 {
  "id": "fo-skj-15",
  "ch": 5,
  "deck": "skjerming og gevinst",
  "front": "Aksjen kjøpes 28. desember og eies ved årsskiftet. Hvor stor skjerming får eieren for året? (Kostpris 100 000, rente 3,6 %)",
  "back": "<b>Hele årets skjerming: 3 600</b><br>1. Eieren 31.12 får fradraget for hele året.<br>2. 100 000 × 3,6 % = 3 600. Det fordeles ikke etter eiertid.<br>Felle: «Ingen, eid i fire dager», «om lag 39 kr», «ingen fordi det ikke kom utbytte» (ubenyttet skjerming framføres).<br>(Prøveeksamen 4 8b, skatteloven § 10-12)"
 },
 {
  "id": "fo-skj-16",
  "ch": 5,
  "deck": "skjerming og gevinst",
  "front": "Hvor mye utbytte kan eieren ta ut uten å betale eierskatt? (Kostpris 500 000, skjermingsrente 5 %)",
  "back": "<b>Utbytte opp til skjermingen: 25 000</b><br>1. 500 000 × 5 % = 25 000.<br>2. Utbytte innenfor skjermingen er skattefritt. Grunnlaget er kostprisen, ikke overskuddet.<br>Felle: 20 000 eller 30 000 (feil rente eller feil grunnlag) og 7 500.<br>(H2022 1b, manual 5.2)"
 },
 {
  "id": "fo-skj-17",
  "ch": 5,
  "deck": "skjerming og gevinst",
  "front": "Hvordan fastsettes skjermingsrenten?",
  "back": "<b>rs = (3-mnd statskasseveksel + 0,5 pp) × (1 − 22 %)</b><br>1. Skattedirektoratet fastsetter den i januar året etter inntektsåret.<br>2. Den er en rente etter skatt. 2023: 3,2 %, 2024: 3,9 %, 2025: 3,6 %.<br>3. Formål: normalavkastningen skal være skattefri, så eierskatten treffer bare meravkastningen.<br>Felle: Å bruke en rente fra hukommelsen. Bruk oppgavens rente for hvert år.<br>(Manual 5.2, k20)"
 },
 {
  "id": "fo-skj-18",
  "ch": 5,
  "deck": "skjerming og gevinst",
  "front": "Skatt på utbytte: oppjustere grunnlaget eller satsen? (Skattepliktig grunnlag 300, sats 22 %, faktor 1,72)",
  "back": "<b>Skatt = grunnlag × 1,72 × 22 % = grunnlag × 37,84 %</b><br>1. 300 × 1,72 × 22 % = 113,52.<br>2. Samme tall: 300 × 37,84 % = 113,52. Regn begge veier som kontroll.<br>Felle: Å oppjustere to ganger eller ikke i det hele tatt. Glemt oppjustering gir alltid 58 % av riktig svar (22/37,84).<br>(Manual 5.1, k20)"
 },
 {
  "id": "fo-skj-19",
  "ch": 6,
  "deck": "skjerming og gevinst",
  "front": "Aksjonærmodellen og fritaksmetoden: hvem gjelder hva for?",
  "back": "<b>Personlig eier: aksjonærmodellen. Aksjeselskap som eier: fritaksmetoden</b><br>1. Aksjonærmodellen: utbytte og gevinst over skjermingen skattlegges med 37,84 %. Tap gir fradrag.<br>2. Fritaksmetoden: AS betaler i hovedsak ikke skatt på utbytte og gevinst fra aksjer i EØS. Tap gir ikke fradrag.<br>Felle: «Personlig skattyter slipper gevinstskatt», «gevinst skattlegges bare på selskapets hånd». Fritaksmetoden er ikke en fordel i alle tilfeller (tapet).<br>(Kursgodkjenning 2026 6, manual 6.1)"
 },
 {
  "id": "fo-skj-20",
  "ch": 6,
  "deck": "skjerming og gevinst",
  "front": "Hva er begrunnelsen for fritaksmetoden?",
  "back": "<b>Å hindre kjedebeskatning</b><br>1. Uten fritak skattlegges samme overskudd på nytt i hvert selskap i kjeden.<br>2. Med fritak: én gang i selskapssektoren (22 %) og én gang hos personen (37,84 %). Samlet 51,52 % uansett antall ledd.<br>Felle: «Billigere å eie gjennom selskap» og «skjerme normalavkastningen» (det er skjermingen).<br>(Prøveeksamen 4 8a, manual 6.1)"
 },
 {
  "id": "fo-skj-21",
  "ch": 6,
  "deck": "skjerming og gevinst",
  "front": "Treprosentregelen: hvor mye skatt betaler et holdingselskap på mottatt utbytte? (Eier under 90 %, utbytte 100)",
  "back": "<b>3 % × 22 % = 0,66 % av utbyttet: 0,66</b><br>1. 3 % av utbyttet inntektsføres: 3. Skatt 3 × 22 % = 0,66.<br>2. Gjelder bare utbytte, ikke gevinst.<br>3. Over 90 % eierskap og stemmer: helt skattefritt.<br>Felle: 3 % lest som skattesats, eller 0,66 % også på gevinst.<br>(Manual 6.2)"
 },
 {
  "id": "fo-skj-22",
  "ch": 6,
  "deck": "skjerming og gevinst",
  "front": "Sparer et holdingselskap skatt for en eier som til slutt tar ut pengene? (Overskudd 1 000 000, selskapsskatt 22 %, eierskatt 37,84 %)",
  "back": "<b>Nei. Det utsetter skatten: samlet 51,52 % uansett</b><br>1. Selskapsskatt 220 000. Utbytte 780 000.<br>2. Eierskatt 780 000 × 37,84 % = 295 152. Samlet 51,52 %.<br>3. Under 90 % eierskap: treprosentregelen gir 51,84 %.<br>Fordelen er utsettelsen: et rentefritt lån fra staten (lock-in).<br>Felle: 22 % («fritaket er endelig») og 62,18 % (holdingselskapet skattlagt ordinært).<br>(Manual 6.3 og 6.4)"
 },
 {
  "id": "fo-skj-23",
  "ch": 6,
  "deck": "skjerming og gevinst",
  "front": "Du gir aksjer med stor latent gevinst til barna dine. Forsvinner gevinstskatten?",
  "back": "<b>Nei. Kontinuitet: mottakeren overtar giverens inngangsverdi</b><br>1. Arveavgiften er borte (2014), men skatten kommer når mottakeren selger.<br>2. Unntak: bolig giveren kunne solgt skattefritt får ny inngangsverdi.<br>3. Bor mottakeren i utlandet, utløses exit-skatt.<br>Felle: «Gave fjerner skatten».<br>(Manual 6.6, skatteloven § 9-7)"
 },
 {
  "id": "fo-skj-24",
  "ch": 6,
  "deck": "skjerming og gevinst",
  "front": "Aksjonærlån: en personlig aksjonær låner 500 000 av eget AS. Hvordan skattlegges lånet?",
  "back": "<b>Som utbytte: 500 000 × 37,84 % = 189 200</b><br>1. Fra 2015 skattlegges lån til personlig aksjonær som utbytte.<br>2. Unntak: lån under 100 000 som tilbakebetales innen 60 dager (for eksempel reiseutgifter).<br>3. Gjelden består, så aksjonærlån lønner seg ikke.<br>Felle: «Lån er ikke inntekt» og «renten skattlegges bare med 22 %».<br>(F4 lb 57, F5 lb 13, manual 6.5)"
 },
 {
  "id": "fo-eff-01",
  "ch": 1,
  "deck": "effektiv skatt",
  "front": "Effektiv skattesats for et selskap med avskrivning. (Driftsinntekt 100 000, avskrivning 25 000, sats 22 %)",
  "back": "<b>Effektiv sats = betalt skatt / brutto inntekt = 16,5 %</b><br>1. Grunnlag 100 000 − 25 000 = 75 000. Skatt 16 500.<br>2. 16 500/100 000 = 16,5 %.<br>Kontroll: 22 % × (1 − 0,25) = 16,5 %.<br>Felle: 22 % (delt på skattepliktig overskudd) og 11 % (hele maskinen trukket fra i år 1).<br>(H2025 5, manual 1.5)"
 },
 {
  "id": "fo-eff-02",
  "ch": 1,
  "deck": "effektiv skatt",
  "front": "AERT: hvorfor ligger effektiv skattesats under 22 %? (Inntekt 300 000, printer 100 000 utgiftsført straks eller saldo 30 %)",
  "back": "<b>Fradrag som ikke er utbetalinger senker satsen</b><br>1. Straks: skatt 44 000. AERT 44 000/300 000 = 14,67 % (lysbildet avkorter til 14,6 %; begge er riktige).<br>2. Saldo 30 %: fradrag 30 000, skatt 59 400. AERT 19,8 %.<br>3. AERT = betalt skatt / brutto inntekt. Nominell sats er den vedtatte 22 %.<br>Felle: Å dele på skattepliktig overskudd gir alltid 22 %.<br>(F5 lb 17, manual 1.5)"
 },
 {
  "id": "fo-eff-03",
  "ch": 1,
  "deck": "effektiv skatt",
  "front": "Samlet skatt på et selskapsoverskudd som deles ut, uten skjerming. (Overskudd 1 000 000, selskapsskatt 22 %, eierskatt 37,84 %)",
  "back": "<b>22 % + 78 % × 37,84 % = 51,52 %</b><br>1. Selskapsskatt 220 000. Utbytte 780 000.<br>2. Eierskatt 780 000 × 37,84 % = 295 152.<br>3. 515 152/1 000 000 = 51,52 %. Lønn: 47,4 %.<br>Felle: 59,84 % (satsene lagt sammen), 37,84 % (eierskatten alene), 29,52 % (selskapsskatten utelatt).<br>(Manual 1.5, k20)"
 },
 {
  "id": "fo-eff-04",
  "ch": 5,
  "deck": "effektiv skatt",
  "front": "Eierskatt når alt overskudd etter selskapsskatt tas ut som utbytte. (Overskudd 100 000, sats 23 %, faktor 1,33, nominell eierskatt 20 %)",
  "back": "<b>Eierskatt = 77 000 × 1,33 × 20 % = 20 482</b><br>1. Selskapsskatt 23 000. Utbytte 77 000.<br>2. 77 000 × 1,33 × 20 % = 20 482.<br>Felle: Å oppjustere hele overskuddet uten å trekke fra selskapsskatten (26 600), eller glemme oppjusteringen (15 400).<br>(Kursgodkjenning 2026 3, manual 5.1)"
 },
 {
  "id": "fo-eff-05",
  "ch": 5,
  "deck": "effektiv skatt",
  "front": "Eierskatt og effektiv skatt på utbyttet med skjerming. (Overskudd 150 000, 22 %, kostpris 500 000, skjerming 5 %, eierskatt 25 %, faktor 1,6)",
  "back": "<b>Eierskatt 36 800. Effektiv skatt på utbyttet 31,5 %</b><br>1. Selskapsskatt 33 000. Utbytte 117 000.<br>2. Grunnlag 117 000 − 25 000 = 92 000.<br>3. 92 000 × 1,6 × 25 % = 36 800.<br>4. 36 800/117 000 = 31,5 %.<br>Felle: 23 000 (oppjustering glemt). Nevneren er utbyttet i dette spørsmålet, ikke overskuddet.<br>(H2022 1c og 1d, manual 5.6)"
 },
 {
  "id": "fo-eff-06",
  "ch": 5,
  "deck": "effektiv skatt",
  "front": "Samlet effektiv skattesats for selskap og eier. (Selskapsskatt 33 000, eierskatt 36 800, overskudd før skatt 150 000)",
  "back": "<b>(33 000 + 36 800)/150 000 = 46,5 %</b><br>1. Begge skattene i telleren.<br>2. Bruttooverskuddet i nevneren.<br>Skjermingen trekker satsen under 51,52 %.<br>Felle: 31,5 % er svaret på nabospørsmålet (eierskatt delt på utbytte). De står som alternativ i hverandres spørsmål.<br>(H2022 1e, manual 5.6)"
 },
 {
  "id": "fo-eff-07",
  "ch": 9,
  "deck": "effektiv skatt",
  "front": "Samlet effektiv sats når skjermingen tar en del av utbyttet. (Kostpris 1 000 000, rente 3,6 %, overskudd 100 000, 22 % og 37,84 %)",
  "back": "<b>22 % + (utbytte − skjerming)/overskudd × 37,84 % = 37,89 %</b><br>1. Selskapsskatt 22 000. Utbytte 78 000.<br>2. Skjerming 36 000. Grunnlag 42 000.<br>3. Eierskatt 15 892,80. Samlet 37 892,80/100 000.<br>Systemet ligger mellom 22 % (alt skjermet) og 51,52 % (ingen skjerming).<br>Felle: 51,52 % (skjermingen glemt).<br>(Manual 9.3)"
 },
 {
  "id": "fo-eff-08",
  "ch": 5,
  "deck": "effektiv skatt",
  "front": "Inntektsskiftingslikningen: finn oppjusteringsfaktoren. (Toppskatt lønn 47,4 %, arbeidsgiveravgift 12,4 %, selskapsskatt 22 %, sats 22 %)",
  "back": "<b>tw + a = tA + y·t gir y = 1,72</b><br>1. 47,4 + 12,4 = 59,8.<br>2. 59,8 = 22 + 22y, altså y = 37,8/22 = 1,72.<br>3. Eierskatt 1,72 × 22 % = 37,84 %.<br>Nominelle satser lagt sammen. Forutsetter at arbeidstakeren bærer hele avgiften.<br>Felle: Den eldre formen t + (1 − t)·t·y (H2020) gir et annet tall.<br>(F5, manual 5.1)"
 },
 {
  "id": "fo-eff-09",
  "ch": 5,
  "deck": "effektiv skatt",
  "front": "Ny selskapsskatt: hva blir oppjusteringsfaktoren og eierskatten? (Lønn 47 %, avgift 13 %, selskapsskatt 20 %, eierskatt 20 %)",
  "back": "<b>y = 2. Effektiv nominell eierskatt 40 %</b><br>1. 47 + 13 = 60.<br>2. 60 = 20 + 20y, altså y = 2.<br>3. 2 × 20 % = 40 %.<br>Felle: 1,6 og 32 % (den eldre effektive formen), 2,1 og 1,8.<br>(Kursgodkjenning 2026 2, manual 5.1)"
 },
 {
  "id": "fo-eff-10",
  "ch": 5,
  "deck": "effektiv skatt",
  "front": "Hvem bærer arbeidsgiveravgiften? Hva gjør det med oppjusteringsfaktoren? (Lønn 47,4 %, avgift 12,4 %, selskapsskatt 22 %)",
  "back": "<b>Mindre overvelting på arbeidstakeren gir lavere faktor</b><br>1. Arbeidstakeren alt: 47,4 + 12,4 = 22 + 22y gir 1,72.<br>2. Delt 50/50: 47,4 + 6,2 = 22 + 6,2 + 22y gir 1,15.<br>3. Bedriften alt: 47,4 = 22 + 12,4 + 22y gir 0,59.<br>Bedriftens del legges til selskapsskatten. Empirien: 15 til 30 % veltes over.<br>Felle: Å la hele avgiften stå på lønnssiden uansett.<br>(F5, manual 5.1)"
 },
 {
  "id": "fo-eff-11",
  "ch": 5,
  "deck": "effektiv skatt",
  "front": "Faktoren som gir en bestemt effektiv eierskatt. Hva blir samlet sats? (Selskapsskatt og nominell eierskatt 20 %, ønsket effektiv eierskatt 30 %, overskudd 200 000)",
  "back": "<b>y = 1,5. Samlet sats 44 %</b><br>1. 20 % × y = 30 %, altså y = 1,5.<br>2. Utbytte 160 000. Oppjustert grunnlag 240 000.<br>3. Samlet: 20 % + 80 % × 30 % = 44 %.<br>Felle: 50 % (satsene lagt sammen) og 51,5 % (dagens tall fra hukommelsen).<br>(H2023 2, manual 5.1)"
 },
 {
  "id": "fo-eff-12",
  "ch": 5,
  "deck": "effektiv skatt",
  "front": "Hvor stort overskudd før skatt trengs for at eieren skal sitte igjen med et bestemt beløp? (Ønsker 300 000, selskapsskatt 20 %, eierskatt 40 %)",
  "back": "<b>Overskudd = beløp / [(1 − tA)(1 − te)] = 625 000</b><br>1. Av én krone overskudd blir 0,80 × 0,60 = 0,48 igjen.<br>2. 300 000/0,48 = 625 000.<br>Felle: 500 000 (bare eierskatten), 750 000 (satsene lagt sammen til 60 %), 480 000 (skattene lagt oppå).<br>(Prøveeksamen 17 3, manual 5.1)"
 },
 {
  "id": "fo-eff-13",
  "ch": 5,
  "deck": "effektiv skatt",
  "front": "Hvorfor finnes oppjusteringsfaktoren? Hva ville samlet skatt på utdelt overskudd vært uten den?",
  "back": "<b>For å hindre inntektsskifting fra lønn til utbytte</b><br>1. Uten faktor: 22 % + 78 % × 22 % = 39,16 %, mot 47,4 % på lønn.<br>2. Eiere som jobber i eget selskap ville tatt lønnen som utbytte.<br>3. Med faktor: 51,52 % effektivt, 4,12 pp over lønn.<br>Felle: Å tro at faktoren gir lik effektiv skatt. Kurset legger nominelle satser sammen (59,8 = 59,8).<br>(Manual 5.1, F5)"
 },
 {
  "id": "fo-eff-14",
  "ch": 2,
  "deck": "effektiv skatt",
  "front": "Ta hele fradraget nå eller fordele det over ti år? (Fradrag 100 000, sats 22 %, rente 10 %)",
  "back": "<b>Ta alt nå: 22 000 mot 13 518</b><br>1. Nå: 100 000 × 22 % = 22 000.<br>2. Fordelt: 2 200 × annuitetsfaktor 6,1446 = 13 518.<br>3. Udiskontert er begge 22 000. Bare tidsverdien skiller.<br>Forbehold: du må ha inntekt å føre fradraget mot.<br>Felle: «Det spiller ingen rolle» (riktig bare ved rente 0). Faktoren 1,72 i teksten er støy.<br>(H2024 3, H2020 1a, manual 2.4)"
 },
 {
  "id": "fo-eff-15",
  "ch": 2,
  "deck": "effektiv skatt",
  "front": "Realavkastning etter skatt på en aksje. (Kjøpt 100, solgt 110, utbytte 5, eierskatt 37,84 %, inflasjon 3 %)",
  "back": "<b>Nominelt, så etter skatt, så realt: 6,14 %</b><br>1. Nominell: 15/100 = 15 %.<br>2. Etter skatt: 15 % × 0,6216 = 9,324 %.<br>3. Realt: 1,09324/1,03 − 1 = 6,14 %.<br>Felle: 7,24 % (skatt lagt på realavkastningen), 13,64 % (delt på salgskursen), approksimasjonen når desimaler kreves.<br>(F2, manual 2.1 og 2.2)"
 },
 {
  "id": "fo-eff-16",
  "ch": 2,
  "deck": "effektiv skatt",
  "front": "Effektiv skatt på realavkastningen. (Nominell rente 4 %, inflasjon 3 %, skatt 22 %)",
  "back": "<b>treal = t × i/(i − π) = 88 %</b><br>1. 22 % × 4/(4 − 3) = 88 %.<br>2. Skatten tas av nominell avkastning, også av inflasjonskompensasjonen.<br>Inflasjon øker den reelle skatten uten at satsen endres.<br>Felle: Å svare 22 %.<br>(Manual 2.2, k20)"
 },
 {
  "id": "fo-eff-17",
  "ch": 2,
  "deck": "effektiv skatt",
  "front": "Nominell og realavkastning på en utleieeiendom. (Kjøpt 5 mill., netto leie etter skatt 150 000, dokumentavgift 125 000, solgt 6 mill., inflasjon 10 %, forenklet formel)",
  "back": "<b>Nominell 20,5 %. Real ≈ 10,5 %</b><br>1. (6 000 000 − 5 000 000 + 150 000 − 125 000)/5 000 000 = 20,5 %.<br>2. Forenklet: 20,5 − 10 = 10,5 %.<br>Felle: Leien eller dokumentavgiften glemt, eller delt på salgsprisen. Nevneren er alltid inngangsverdien.<br>(H2023 6, manual 2.1)"
 },
 {
  "id": "fo-eff-18",
  "ch": 4,
  "deck": "effektiv skatt",
  "front": "Renteinntekt mot aksjegevinst: hvor stor aksjegevinst gir samme beløp etter skatt som 100 000 i renter? (22 % og 37,84 %)",
  "back": "<b>100 000 × 0,78/0,6216 = 125 483</b><br>1. Renter: igjen 78 000.<br>2. Aksjegevinst må gi 78 000/0,6216.<br>3. Forholdet 1,2548: aksjer må gi 25,5 % mer før skatt.<br>Felle: Å sammenligne avkastningene før skatt.<br>(F1, manual 4.5)"
 },
 {
  "id": "fo-for-01",
  "ch": 7,
  "deck": "formuesskatt",
  "front": "Formuesskatt for en enslig med høy nettoformue. (Nettoformue 30 mill., bunnfradrag 1,9 mill., 1,0 % opp til 21,5 mill., 1,1 % over)",
  "back": "<b>1 % × (21,5 − 1,9) mill. + 1,1 % × (30 − 21,5) mill. = 289 500</b><br>1. Trinn 1: 196 000.<br>2. Trinn 2: 93 500.<br>Kontroll: 1 % × 28,1 mill. + 0,1 % × 8,5 mill. = 289 500.<br>Felle: 1,1 % på alt eller bunnfradraget glemt. Grunnlaget er formuesverdi, aldri markedsverdi.<br>(Manual 7.1, k20)"
 },
 {
  "id": "fo-for-02",
  "ch": 7,
  "deck": "formuesskatt",
  "front": "Formuesskatt for et ektepar med samlet nettoformue 30 mill. (Bunnfradrag 3,8 mill., innslagspunkt 43 mill.)",
  "back": "<b>1 % × (30 − 3,8) mill. = 262 000</b><br>1. Begge grensene dobles for ektefeller.<br>2. 30 mill. er under 43 mill., så bare 1 %.<br>Felle: 270 500 (doblet bunnfradrag, men innslagspunktet ikke doblet).<br>(Manual 7.1)"
 },
 {
  "id": "fo-for-03",
  "ch": 7,
  "deck": "formuesskatt",
  "front": "Verdsettingsrabattene: hva teller hvert aktivum med i formuesskatten (2026)?",
  "back": "<b>Aksjer og aksjefond 80 %. Primærbolig 25 % opp til 14 mill., 70 % over. Sekundærbolig og bank 100 %</b><br>1. Unoterte aksjer: 80 % av selskapets skattemessige verdi (bokført).<br>2. Næringseiendom 80 %. Fritidsbolig maks 30 %.<br>3. Primærboligterskelen var 10 mill. i H2024 og H2025.<br>Felle: Å bruke dagens rabatt der oppgaven oppgir en annen (aksjer 45 % rabatt i 2021).<br>(Manual 7.2, k20)"
 },
 {
  "id": "fo-for-04",
  "ch": 7,
  "deck": "formuesskatt",
  "front": "Formuesverdi av en dyr primærbolig. (Markedsverdi 18 mill., 25 % opp til terskelen 14 mill., 70 % over)",
  "back": "<b>0,25 × 14 mill. + 0,70 × 4 mill. = 6 300 000</b><br>1. Del boligen i to sjikt.<br>2. 3 500 000 + 2 800 000.<br>3. Med terskel 10 mill. (H2024 og H2025): 8 100 000.<br>Felle: 4 500 000 (25 % på alt) og 12 600 000 (70 % på alt).<br>(Manual 7.3)"
 },
 {
  "id": "fo-for-05",
  "ch": 7,
  "deck": "formuesskatt",
  "front": "Formuesverdi av et kombinasjonsfond. (Andelsverdi 1 000 000, 70 % aksjer)",
  "back": "<b>700 000 × 80 % + 300 000 × 100 % = 860 000 (86 %)</b><br>1. Bare aksjedelen får rabatt.<br>2. Bare aksjedelens rabatt (140 000) teller i gjeldsreduksjonen.<br>Felle: 800 000 (80 % på hele fondet).<br>(Manual 7.2)"
 },
 {
  "id": "fo-for-06",
  "ch": 7,
  "deck": "formuesskatt",
  "front": "Formuesskatt på en unotert aksjepost. (45 % av et selskap priset til 100 mill. i emisjon, bokførte eiendeler 10 mill., ingen gjeld, bunnfradrag 1,9 mill., 1 %)",
  "back": "<b>(45 % × 10 mill. × 0,8 − 1,9 mill.) × 1 % = 17 000</b><br>1. Unotert: bokført egenkapital, ikke markedsverdi: 4,5 mill.<br>2. Aksjerabatt: 3,6 mill.<br>3. Over bunnfradraget: 1,7 mill. × 1 %.<br>Felle: 495 000 (45 mill. × 1,1 %), 26 000 (rabatten glemt), 36 000 (bunnfradraget glemt).<br>(F1, manual 7.5)"
 },
 {
  "id": "fo-for-07",
  "ch": 7,
  "deck": "formuesskatt",
  "front": "Hvor mye reduseres gjelden? (Gjeld 1,8 mill.; primærbolig 4,8 mill. med 75 % rabatt, aksjer 1 mill. med 20 %, bank 0,2 mill.)",
  "back": "<b>Reduksjon = 60 000</b><br>1. Fordel gjelden etter bruttoverdi: 80 %, 16⅔ % og 3⅓ %.<br>2. Gjeld på aksjene: 300 000.<br>3. Bare den avkortes: 300 000 × 20 % = 60 000. Boliggjelden avkortes ikke.<br>Felle: 145 000, 150 000 og 165 000 ligger over taket 20 % × 300 000.<br>(H2024 6a, manual 7.4)"
 },
 {
  "id": "fo-for-08",
  "ch": 7,
  "deck": "formuesskatt",
  "front": "Skattepliktig nettoformue med gjeldsfordeling. (Gjeld 1,8 mill.; primærbolig 4,8 mill. med 75 %, aksjer 1 mill. med 20 %, bank 0,2 mill.)",
  "back": "<b>Nettoformue = 2 200 000 − 1 740 000 = 460 000</b><br>1. Formuesverdier: 1 200 000 + 800 000 + 200 000.<br>2. Fradragsberettiget gjeld: 1 440 000 + 240 000 + 60 000.<br>Kontroll: 1,8 mill. × (1 − 200 000/6 000 000) = 1 740 000.<br>Felle: 600 000 (rabatt og avkorting glemt), 400 000 (avkorting glemt), 1 540 000 (boliggjelden avkortet).<br>(H2024 6b, manual 7.4)"
 },
 {
  "id": "fo-for-09",
  "ch": 7,
  "deck": "formuesskatt",
  "front": "Nettoformue når oppgaven ikke sier om gjelden skal avkortes. (Gjeld 5 mill.; primærbolig 5 mill. med 75 % rabatt, aksjefond 5 mill. med 20 %)",
  "back": "<b>750 000 etter loven (250 000 ble også godtatt)</b><br>1. Gjelden fordeles 50/50: 2,5 mill. hver.<br>2. Formuesverdier 1 250 000 + 4 000 000.<br>3. Fondsgjelden avkortes til 2 000 000. Netto 5 250 000 − 4 500 000.<br>Uten avkorting: 250 000.<br>Felle: −250 000 og −750 000 (fortegnet snudd). Velg lovens svar med avkorting.<br>(H2025 2, manual 7.4)"
 },
 {
  "id": "fo-for-10",
  "ch": 7,
  "deck": "formuesskatt",
  "front": "Formuesskatt når gjelden er like stor som bruttoformuen. (Aksjefond 10 mill. med 20 %, primærbolig 10 mill. med 75 %, gjeld 10 mill., bunnfradrag 1,5 mill., 1 %)",
  "back": "<b>Skatt = 0</b><br>1. Formuesverdi: 8 + 2,5 = 10,5 mill.<br>2. Gjeld 5 + 5. Fondsgjelden avkortes til 4. Fradrag 9 mill.<br>3. Netto 1,5 mill. minus bunnfradrag 1,5 mill. = 0.<br>Felle: 15 000 (bunnfradraget glemt) eller boliggjelden avkortet.<br>(H2023 3, manual 7.4)"
 },
 {
  "id": "fo-for-11",
  "ch": 7,
  "deck": "formuesskatt",
  "front": "Primærboligkolonnen gir negativ netto i formuesskatten. Skal den settes til null?",
  "back": "<b>Nei. Negative kolonner motregnes mot positive</b><br>1. Bolig: 25 % formuesverdi, men full gjeld. Negativt bidrag er tilsiktet.<br>2. Skatten regnes av summen over alle aktiva.<br>Eksempel H2024 6: −240 000 + 560 000 + 140 000 = 460 000.<br>Felle: Å «rette» kolonnen til null gir 700 000.<br>(Manual 7.4)"
 },
 {
  "id": "fo-for-12",
  "ch": 7,
  "deck": "formuesskatt",
  "front": "Hvilke aktiva utløser forholdsmessig gjeldsreduksjon i formuesskatten?",
  "back": "<b>Rabatterte aktiva unntatt bolig: aksjer, aksjefond, næringseiendom, driftsmidler, varelager</b><br>1. Primærbolig og fritidsbolig: gjelden avkortes ikke (§ 4-19).<br>2. Sekundærbolig og bank: ingen rabatt, ingen reduksjon.<br>3. Gjelden fordeles etter bruttoverdi, ikke formuesverdi. Unntak: fritidsbolig går inn i fordelingsnøkkelen med formuesverdien.<br>Felle: Å avkorte boliggjelden er den dyreste enkeltfeilen.<br>(Manual 7.4, k20)"
 },
 {
  "id": "fo-for-13",
  "ch": 8,
  "deck": "formuesskatt",
  "front": "Formuesskatt som avkastningsskatt: hvilken gevinstskatt gir samme proveny? (W = 100, r = 5 %, formuesskatt 1 % på formuen ved periodens begynnelse)",
  "back": "<b>WT = W·r·t gir t = T/r = 20 %</b><br>1. Formuesskatt: 100 × 1 % = 1.<br>2. Avkastning 5. 5t = 1, altså t = 20 %.<br>Felle: 21 % (skatten lagt på formuen ved periodens slutt: 1,05/5) og 22 % (satsen på alminnelig inntekt).<br>(H2025 9, manual 8.1)"
 },
 {
  "id": "fo-for-14",
  "ch": 8,
  "deck": "formuesskatt",
  "front": "Formuesskatten faller på formuen ved periodens slutt. Hvilken formuesskattesats tilsvarer en avkastningsskatt? (t = 22 %, r = 3 %)",
  "back": "<b>τ = t·r/(1 + r) = 0,64 %</b><br>1. τ·W(1 + r) = t·r·W.<br>2. 0,22 × 0,03/1,03 = 0,64 %.<br>Ved begynnelsen: τ = r·t = 0,66 %.<br>Felle: Å bytte tidspunkt. Les setningen om når skatten faller.<br>(H2021 3, manual 8.1)"
 },
 {
  "id": "fo-for-15",
  "ch": 8,
  "deck": "formuesskatt",
  "front": "Avkastning før og etter formuesskatt. (Kjøpt for 200 mill., kontantstrøm 10 mill., solgt for 200 mill., formuesskatt 1 %)",
  "back": "<b>5 % før, 4 % etter</b><br>1. Uten skatt: 10/200 = 5 %.<br>2. Formuesskatt 2 mill.: (10 − 2)/200 = 4 %.<br>3. Generelt: r − τw.<br>Felle: 4 % i spørsmålet uten skatt (nabosvaret), 6 % (skatten lagt til), 3 % (trukket fra to ganger).<br>(H2025 3a og 3b, manual 8.2)"
 },
 {
  "id": "fo-for-16",
  "ch": 8,
  "deck": "formuesskatt",
  "front": "Verdien av en evig kontantstrøm med formuesskatt når alternativet også rammes. (CF 5 mill., r = 5 %, formuesskatt 1 % av markedsverdien)",
  "back": "<b>V = 100 mill. Verdien er uendret</b><br>1. Uten formuesskatt: 5/0,05 = 100.<br>2. Med: (5 − 0,01V)/V = 4 % gir V = 100.<br>3. Skatten senker kontantstrømmen og avkastningskravet like mye.<br>Felle: 80 mill. (halv justering: (5 − 1)/0,05), 95 mill. («litt lavere»), 50 mill.<br>(H2025 3c og 3d, BS4, manual 8.3)"
 },
 {
  "id": "fo-for-17",
  "ch": 8,
  "deck": "formuesskatt",
  "front": "Børsnotert mot unotert aksje for en norsk investor med formuesskatt. (Begge gir 3 mill. evig, markedsavkastning 6 %, formuesskatt 1 %, unotert verdsatt til 50 %)",
  "back": "<b>Børsnotert 50 mill. Unotert 55 mill.</b><br>1. Alternativet (børs) gir 6 % − 1 % = 5 %.<br>2. Børs: (3 − 0,5)/0,05 = 50.<br>3. Unotert: (3 − 0,25)/0,05 = 55.<br>Lav verdsetting gjør unotert mer verdt for nordmannen.<br>Felle: 50 og 50 (verdsettingsforskjellen glemt).<br>(Prøveeksamen 18 6, manual 8.3)"
 },
 {
  "id": "fo-for-18",
  "ch": 8,
  "deck": "formuesskatt",
  "front": "Hvor mye trekker formuesskatten fra avkastningen på børsaksjer? (Aksjerabatt 20 %, sats 1 %, avkastning 5 %)",
  "back": "<b>τ × (1 − ρ) = 0,8 prosentpoeng, altså 16 % av avkastningen</b><br>1. Formuesverdi 80 %: 0,8 × 1 %.<br>2. 0,8/5 = 16 %. Uten rabatt: 20 %.<br>Felle: Å trekke fra hele prosentpoenget på aksjer.<br>(Manual 8.2)"
 },
 {
  "id": "fo-for-19",
  "ch": 8,
  "deck": "formuesskatt",
  "front": "Formuesskatt i prosent av avkastningen. (Børsaksjer 20 mill. til 80 %, bunnfradrag 1,9 mill., 1 %, avkastning 5 % av markedsverdien)",
  "back": "<b>141 000 / 1 000 000 = 14,10 %</b><br>1. (16 000 000 − 1 900 000) × 1 % = 141 000.<br>2. Avkastning: 20 mill. × 5 % = 1 mill.<br>Felle: 16 % (bunnfradraget glemt) og 20 % (rabatt og bunnfradrag glemt).<br>(Prøveeksamen 14 4c, manual 8.2)"
 },
 {
  "id": "fo-for-20",
  "ch": 8,
  "deck": "formuesskatt",
  "front": "Hvor stort utbytte trengs for å betale formuesskatten? (Formuesverdi 100 000, formuesskatt 1 %, eierskatt 50 %)",
  "back": "<b>D = F/(1 − te) = 1 000/0,5 = 2 000</b><br>1. Formuesskatt 1 000.<br>2. D × (1 − 0,5) = 1 000.<br>Kontroll: 2 000 − 1 000 i eierskatt = 1 000.<br>Felle: 1 500 (skatten lagt oppå), 1 600 (dagens 37,84 % i stedet for oppgavens 50 %), 2 500.<br>(H2025 6, manual 8.4)"
 },
 {
  "id": "fo-for-21",
  "ch": 8,
  "deck": "formuesskatt",
  "front": "Utbytte til formuesskatt med eierskatt under 50 %. (Formuesverdi 100, formuesskatt 1 %, eierskatt 37,8 %, én desimal)",
  "back": "<b>D = 1/0,622 = 1,6</b><br>1. Formuesskatt 1.<br>2. 1/(1 − 0,378) = 1,6077.<br>Snarvei: med sats under 50 % kan D aldri bli dobbelt så stort som F. Stryk 2 og 2,1.<br>Felle: 1,2 (gir bare 0,75 etter skatt).<br>(H2024 7, manual 8.4)"
 },
 {
  "id": "fo-for-22",
  "ch": 8,
  "deck": "formuesskatt",
  "front": "Utbytte til formuesskatt når aksjene har skjerming. (Formuesverdi 3 750 000 til 80 %, 1 %, eierskatt 40 %, kostpris 500 000, skjerming 3 %)",
  "back": "<b>D = (F − S × te)/(1 − te) = 40 000</b><br>1. F = 3 750 000 × 0,8 × 1 % = 30 000.<br>2. Skjerming 15 000 sparer 6 000 i skatt.<br>3. (30 000 − 6 000)/0,6 = 40 000.<br>Kontroll: (40 000 − 15 000) × 40 % = 10 000. Igjen 30 000.<br>Felle: 50 000 (skjermingen glemt), 52 500 (rabatten glemt), 42 000 (lagt oppå).<br>(Prøveeksamen 6 6, manual 8.4)"
 },
 {
  "id": "fo-for-23",
  "ch": 8,
  "deck": "formuesskatt",
  "front": "Formuesskatt fra et AS, utbyttet som dekker den og selskapsskatten som kunne erstattet den. (Formuesverdi 300 000 til 80 %, 1 %, eierskatt 20 % × faktor 2, overskudd 10 000, 22 %)",
  "back": "<b>Formuesskatt 2 400. Utbytte 4 000. Ny selskapsskatt 46 %</b><br>1. 300 000 × 0,8 × 1 % = 2 400.<br>2. te = 40 %: 2 400/0,6 = 4 000.<br>3. (2 200 + 2 400)/10 000 = 46 %.<br>Felle: 3 000 (rabatten glemt), 5 000 (feil formuesskatt dratt videre), 45 %.<br>(H2023 4, manual 8.4)"
 },
 {
  "id": "fo-for-24",
  "ch": 5,
  "deck": "formuesskatt",
  "front": "Utbytte, skjerming og formuesskatt over to år: hva sitter eieren igjen med? (Kostpris 10 mill., utbytte 500 000 og 600 000, skjerming 2 % og 4 %, eierskatt 40 %, formuesskatt 1 %, rabatt 20 %)",
  "back": "<b>Igjen 740 000</b><br>1. Eierskatt: 300 000 × 40 % + 200 000 × 40 % = 200 000.<br>2. Formuesskatt: 8 mill. × 1 % = 80 000 per år, 160 000.<br>3. 1 100 000 − 200 000 − 160 000.<br>Felle: 580 000 (skjerming bare i år 1). To skatter med hvert sitt grunnlag.<br>(H2025 1, manual 5.5)"
 },
 {
  "id": "fo-for-25",
  "ch": 8,
  "deck": "formuesskatt",
  "front": "Hvorfor rammer formuesskatten hardest når avkastningen er lav? (Formuesskatt 1 %, avkastning 2 %)",
  "back": "<b>Ekvivalent avkastningsskatt τ/r = 50 %</b><br>1. Ved 10 %: 10 %. Ved 5 %: 20 %. Ved 2 %: 50 %. Ved 0: uendelig.<br>2. Den er et fast kronebeløp uansett avkastning.<br>Adam og Miller: den treffer normalavkastningen hardt og meravkastningen ikke.<br>Felle: «Formuesskatten tilsvarer en avkastningsskatt med fast sats».<br>(Manual 8.1 og 8.5)"
 },
 {
  "id": "fo-for-26",
  "ch": 8,
  "deck": "formuesskatt",
  "front": "Effektiv skatt (AERT) for de rikeste: børsnotert mot unotert eier. (Selskap verdt 100/0,1222 = 818, formuesskatt 1,1 %, faktisk selskapsskatt 13,1 %)",
  "back": "<b>Børsnotert 24,7 %. Unotert 18,1 %. Topp 1 % vektet 20,3 %</b><br>1. Børs: 818 × 0,8 × 1,1 % = 7,20. Utbytteskatt 4,38. Sum med 13,10: 24,7.<br>2. Unotert (35 % av markedsverdien): 3,10 + 1,90 + 13,10 = 18,1.<br>3. Topp 1 %: 24,7 × ⅓ + 18,1 × ⅔ = 20,3 %, mot Aaberge 22 %. Topp 0,1 %: 9 til 17 %.<br>Felle: «Hovedforklaringen er omgåelse av utbytteskatt». Det er verdsettingen. Lysbildet runder til 18,1 (eksakt 18,2).<br>(F5 lb 37 til 42, manual 8.6)"
 },
 {
  "id": "fo-for-27",
  "ch": 7,
  "deck": "formuesskatt",
  "front": "Eiendomsskatt: hvem bestemmer den og hva er satsgrensene?",
  "back": "<b>Kommunal og frivillig objektskatt. Maks 4 promille, maks 1 promille første år</b><br>1. Betales uansett gjeld og nettoformue. 323 av 357 kommuner hadde den i 2024.<br>2. Kan gjelde næring, bolig og fritid eller all eiendom.<br>3. Manualen: grunnlag 0,7 × beregnet verdi, økning høyst 1 promille per år.<br>Eksempel: bolig 4 mill. × 0,7 × 3 promille = 8 400.<br>Felle: Å bruke formuesskattens 25 % som grunnlag. 4 promille er 0,4 %.<br>(F8 lb 58 og 59, manual 7.6)"
 },
 {
  "id": "fo-for-28",
  "ch": 8,
  "deck": "formuesskatt",
  "front": "Guvenen m.fl. (2023): flytter formuesskatt eller gevinstskatt kapital raskest til de produktive? (To brødre arver 1 000. Mike får 20 %, Fredo 0 %. Gevinstskatt 25 % eller formuesskatt 2,27 %)",
  "back": "<b>Formuesskatten</b><br>1. Gevinstskatt: Mike 1 150, Fredo 1 000. Forhold 1,15.<br>2. Formuesskatt: Mike 1 200 − 27,24 = 1 172,76, Fredo 977,30. Forhold 1,20.<br>3. Begge gir om lag 50 i proveny. Formuesskatten straffer lav avkastning.<br>Felle: «Formuesskatten reduserer ulikheten». Den gir effektivitetsgevinst, men øker ulikheten.<br>(F8 lb 30 til 37, manual 8.5)"
 },
 {
  "id": "fo-ins-01",
  "ch": 11,
  "deck": "skatteinsidens",
  "front": "Stykkskatt: hvilket uttrykk viser effekten på produsentprisen, ∂p/∂t?",
  "back": "<b>∂p/∂t = D′/(S′ − D′)</b><br>1. Likevekt D(p + t) = S(p). Deriver: D′(∂p/∂t + 1) = S′·∂p/∂t.<br>2. Løs: ∂p/∂t = D′/(S′ − D′), mellom −1 og 0.<br>Felle: (D′ − S′)/(S′ − D′) = −1 (konstant), D′/S′ (nevner mangler), S′/(S′ − D′) (det er ∂P/∂t).<br>(H2024 8a, manual 11.2)"
 },
 {
  "id": "fo-ins-02",
  "ch": 11,
  "deck": "skatteinsidens",
  "front": "Stykkskatt: hvilket uttrykk viser endringen i konsumentprisen, ∂P/∂t?",
  "back": "<b>∂P/∂t = S′/(S′ − D′)</b><br>1. P = p + t gir ∂P/∂t = ∂p/∂t + 1.<br>2. D′/(S′ − D′) + 1 = S′/(S′ − D′), mellom 0 og 1.<br>Felle: (S′ − D′)/S′ (over 1), D′/(S′ − D′) (det er ∂p/∂t), nevneren snudd til D′ − S′.<br>(H2024 8b, H2023 7a, manual 11.2)"
 },
 {
  "id": "fo-ins-03",
  "ch": 11,
  "deck": "skatteinsidens",
  "front": "Kontrollen som stryker gale insidensformler: hva må alltid gjelde?",
  "back": "<b>∂P/∂t − ∂p/∂t = 1. ∂p/∂t negativ, ∂P/∂t positiv</b><br>1. D′ &lt; 0 og S′ &gt; 0, så nevneren S′ − D′ er alltid positiv.<br>2. ∂p/∂t ligger mellom −1 og 0, ∂P/∂t mellom 0 og 1.<br>3. Et uttrykk som er en konstant, kan ikke være det generelle svaret.<br>Felle: Positivt uttrykk for ∂p/∂t, eller over 1 for ∂P/∂t.<br>(Manual 11.3)"
 },
 {
  "id": "fo-ins-04",
  "ch": 11,
  "deck": "skatteinsidens",
  "front": "Hvem bærer hvor mye av stykkskatten? (D′ = −2, S′ = 3)",
  "back": "<b>Konsumenten 60 %, produsenten 40 %</b><br>1. Nevner: 3 − (−2) = 5.<br>2. ∂P/∂t = 3/5 = 0,60. ∂p/∂t = −2/5 = −0,40.<br>3. Kontroll: 0,60 − (−0,40) = 1.<br>Den siden som reagerer minst på prisen, bærer mest.<br>Felle: Fortegnsfeil i nevneren (3 − 2 = 1).<br>(Manual 11.3)"
 },
 {
  "id": "fo-ins-05",
  "ch": 11,
  "deck": "skatteinsidens",
  "front": "Hvem bærer stykkskatten når etterspørselen er perfekt uelastisk? (Likevektspris 1,50, skatt 0,50 på tilbyderne)",
  "back": "<b>Konsumenten alt: P = 2,00, p = 1,50</b><br>1. D′ = 0 gir ∂P/∂t = 1 og ∂p/∂t = 0.<br>2. P = 1,50 + 0,50.<br>Felle: 2,50 (skatten lagt på to ganger), 3,00 (prisen doblet). P kan aldri stige mer enn t.<br>(H2025 8a, manual 11.4)"
 },
 {
  "id": "fo-ins-06",
  "ch": 11,
  "deck": "skatteinsidens",
  "front": "Perfekt elastisk etterspørsel: hva blir konsumentprisen og produsentprisen? (Likevektspris 1,50, skatt 0,50)",
  "back": "<b>P = 1,50 uendret. p = 1,00</b><br>1. D′ → −∞ gir ∂P/∂t = 0 og ∂p/∂t = −1.<br>2. Produsenten bærer alt: p = P − t.<br>Felle: 1,50 og 1,00 står i hverandres spørsmål. 2,00 er svaret fra forrige ledd. Skriv ned om spørsmålet gjelder P eller p.<br>(H2025 8b og 8c, manual 11.4)"
 },
 {
  "id": "fo-ins-07",
  "ch": 11,
  "deck": "skatteinsidens",
  "front": "∂p/∂t når etterspørselen er perfekt uelastisk (som formel)?",
  "back": "<b>∂p/∂t = 0</b><br>1. D′ = 0 i telleren: 0/(S′ − 0) = 0.<br>2. Produsentprisen endres ikke. Konsumenten bærer alt (∂P/∂t = 1).<br>Felle: −1 (tilfellet med uelastisk tilbud), 1/2, det generelle uttrykket.<br>(H2024 8c, H2023 7b, manual 11.4)"
 },
 {
  "id": "fo-ins-08",
  "ch": 11,
  "deck": "skatteinsidens",
  "front": "Grensetilfellene på tilbudssiden: hvem bærer skatten ved perfekt uelastisk og ved perfekt elastisk tilbud?",
  "back": "<b>S′ = 0: produsenten alt. S′ → ∞: konsumenten alt</b><br>1. S′ = 0 gir ∂p/∂t = −1 (fast tomtegrunn).<br>2. Vannrett tilbud gir ∂P/∂t = 1 (gitt verdensmarkedspris).<br>Regel: den minst elastiske siden bærer skatten.<br>Felle: Å bytte om tilbuds- og etterspørselstilfellene.<br>(Manual 11.4)"
 },
 {
  "id": "fo-ins-09",
  "ch": 11,
  "deck": "skatteinsidens",
  "front": "Strømstøtten fjernes. Etterspørselen er helt uelastisk og grensekostnaden konstant. Hva skjer med pris og kvantum?",
  "back": "<b>Kvantum uendret. Konsumentprisen stiger med hele støttebeløpet</b><br>1. Fjernet støtte virker som en stykkskatt.<br>2. Loddrett etterspørsel: kvantum står fast.<br>3. Vannrett tilbud: produsentprisen står fast, så husholdningene tar hele endringen.<br>Felle: «Kvantum faller» og «de deler kostnaden».<br>(H2022 3, manual 11.4)"
 },
 {
  "id": "fo-ins-10",
  "ch": 11,
  "deck": "skatteinsidens",
  "front": "Stykkskatt med lineære kurver: konsumentpris, produsentpris og kvantum. (x = 1 200 − 40P, x = −300 + 60p, t = 5, før skatt P = 15)",
  "back": "<b>p = 13, P = 18, x = 480</b><br>1. Sett inn P = p + 5: 1 200 − 40(p + 5) = −300 + 60p.<br>2. 1 300 = 100p, altså p = 13.<br>3. P = 18. x = 1 200 − 720 = 480.<br>Felle: 13 er produsentprisen. 20 er hele skatten veltet over.<br>(Prøveeksamen 1 7a, manual 11.2)"
 },
 {
  "id": "fo-ins-11",
  "ch": 11,
  "deck": "skatteinsidens",
  "front": "Andeler fra helningene: hvem bærer mest av skatten? (|D′| = 40, S′ = 60)",
  "back": "<b>Konsumentene 60 %, produsentene 40 %</b><br>1. Konsument: S′/(S′ − D′) = 60/100.<br>2. Produsent: |D′|/(S′ − D′) = 40/100.<br>3. I elastisiteter: εS/(εS + |εD|).<br>Etterspørselen reagerer minst og bærer mest.<br>Felle: «Produsentene bærer alt fordi de betaler inn skatten».<br>(Prøveeksamen 1 7b, manual 11.4)"
 },
 {
  "id": "fo-ins-12",
  "ch": 11,
  "deck": "skatteinsidens",
  "front": "Vannrett tilbud ved p = 15 og etterspørsel x = 1 200 − 40P. Stykkskatt 5. Konsumentpris og kvantum?",
  "back": "<b>P = 20, x = 400</b><br>1. S′ → ∞: produsentprisen står fast på 15.<br>2. P = 15 + 5 = 20.<br>3. Kvantum fra etterspørselen: 1 200 − 800 = 400.<br>Felle: P = 15 og x = 600 (tilfellene byttet), P = 20 og x = 600 (kvantumet ikke justert).<br>(Prøveeksamen 1 7c, manual 11.4)"
 },
 {
  "id": "fo-ins-13",
  "ch": 11,
  "deck": "skatteinsidens",
  "front": "Spiller det noen rolle om stykkskatten kreves inn fra kjøperne eller selgerne?",
  "back": "<b>Nei. Formell insidens avgjør ikke reell insidens</b><br>1. I begge tilfeller er P = p + t og D(p + t) = S(p).<br>2. Bare helningene avgjør fordelingen.<br>Eksempel: den amerikanske arbeidsgiveravgiften deles formelt likt, men standardsynet er at arbeidstakeren bærer den.<br>Felle: «Den som betaler inn skatten, bærer den».<br>(Manual 11.1)"
 },
 {
  "id": "fo-ins-14",
  "ch": 11,
  "deck": "skatteinsidens",
  "front": "Proveny og dødvektstap av en stykkskatt. (Før: P = 5, x = 100. Skatt 1. Etter: P = 5,60, p = 4,60, x = 90)",
  "back": "<b>Proveny 90. Dødvektstap 5</b><br>1. Proveny = t × nytt kvantum = 1 × 90.<br>2. Dødvektstap = ½ × t × (x0 − xt) = ½ × 1 × 10.<br>3. Konsumentene taper 57, produsentene 38. 95 − 90 = 5.<br>Felle: 100 (gammelt kvantum), 10 (glemt ½), produsentens byrde 1,00 (kilen forvekslet med byrden).<br>(F9, manual 11.5)"
 },
 {
  "id": "fo-ins-15",
  "ch": 11,
  "deck": "skatteinsidens",
  "front": "Når er dødvektstapet null? Hvordan vokser det med skattesatsen?",
  "back": "<b>Null når én side er perfekt uelastisk. Vokser med t²</b><br>1. Tapet er en pris på tilpasning. Faller ikke kvantum, finnes ingen trekant.<br>2. ½ × t² × |S′D′|/(S′ − D′): dobbel sats gir fire ganger tapet.<br>Ramsey: høyest sats der elastisiteten er lavest. Effektivitet og fordeling trekker hver sin vei.<br>Felle: «Tapet er proporsjonalt med satsen».<br>(Manual 11.5, k20)"
 },
 {
  "id": "fo-ins-16",
  "ch": 11,
  "deck": "skatteinsidens",
  "front": "Monopolist med lineær etterspørsel får en stykkskatt. Ny pris? (P = 3 − Q, grensekostnad 1, t = 1)",
  "back": "<b>Prisen går fra 2,00 til 2,50: halve skatten veltes over</b><br>1. Uten skatt: MR = 3 − 2Q = 1 gir Q = 1 og P = 2.<br>2. Med skatt: 3 − 2Q = 2 gir Q = 0,5 og P = 2,50.<br>3. Lineær etterspørsel: ∂P/∂t = ½.<br>Felle: 3,00 («markedsmakt gir full overvelting»).<br>(H2021 2, manual 11.6)"
 },
 {
  "id": "fo-ins-17",
  "ch": 11,
  "deck": "skatteinsidens",
  "front": "Hvem bærer selskapsskatten?",
  "back": "<b>Ikke nødvendigvis selskapene. Et empirisk spørsmål om elastisiteter</b><br>1. Harberger: kapitalen bærer det meste. Det gjelder all kapital fordi den er mobil.<br>2. Over tid kan arbeidskraften bære mye gjennom lavere lønn.<br>3. CBO legger til grunn at 50 % veltes over på lønn og priser.<br>Felle: «Selskapsskatten betales av selskapene» (formell insidens).<br>(F9, manual 11.6)"
 },
 {
  "id": "fo-bed-01",
  "ch": 9,
  "deck": "bedriften",
  "front": "Bedriften kan trekke fra andelen A (mellom 0 og 1) av rentene. Hvordan tilpasses kapitalen K?",
  "back": "<b>F′(K) = r(1 − At)/(1 − t)</b><br>1. V = F(K) − rK − t[F(K) − ArK].<br>2. F′(1 − t) = r − trA.<br>Grensetest: A = 1 skal gi r. A = 0 gir r/(1 − t).<br>Felle: rA/(1 − t) (gir r/(1 − t) ved A = 1), r/[(1 − t)A], r.<br>(H2025 7a, F6, manual 9.4)"
 },
 {
  "id": "fo-bed-02",
  "ch": 9,
  "deck": "bedriften",
  "front": "Avgrenset rentefradrag med tall. (r = 6 %, t = 22 %, A = 0,5)",
  "back": "<b>F′(K) = 6 % × 0,89/0,78 = 6,85 %</b><br>1. Ligger mellom r = 6,00 % og r/(1 − t) = 7,69 %.<br>2. Uttrykket er lineært i A: midt mellom.<br>3. Høyere krav gir mindre kapital (F″ &lt; 0).<br>Felle: 3,85 % (rA/(1 − t)) og 15,38 % (delt på A).<br>(Manual 9.4)"
 },
 {
  "id": "fo-bed-03",
  "ch": 9,
  "deck": "bedriften",
  "front": "Overskuddsskatt med fullt rentefradrag: påvirker den investeringen?",
  "back": "<b>Nei. F′(K) = r: overskuddsskatten er nøytral</b><br>1. V = (1 − t)[F(K) − rK].<br>2. Å maksimere andelen (1 − t) av overskuddet er det samme som å maksimere overskuddet.<br>3. Gjelder for enhver sats, også 50 %. Nøytral betyr ikke lav.<br>Felle: «Høyere sats gir alltid mindre investering».<br>(H2020 3a, manual 9.4)"
 },
 {
  "id": "fo-bed-04",
  "ch": 9,
  "deck": "bedriften",
  "front": "Gjeld mot egenkapital: hvilke førsteordensbetingelser gjelder når bare gjeldsrentene gir fradrag?",
  "back": "<b>F′G = r og F′E = r/(1 − t). Dermed E* &lt; G*</b><br>1. Gjeld: inntekten beskattes og renten gir fradrag. t-ene stryker hverandre.<br>2. Egenkapital: alternativkostnaden gir ikke fradrag.<br>Felle: F′G = r(1 − t) (et etter-skatt-tall), kravene byttet om, (1/2)E* &gt; G* (modellen gir bare en ulikhet).<br>(H2025 7b og 7c, manual 9.5)"
 },
 {
  "id": "fo-bed-05",
  "ch": 9,
  "deck": "bedriften",
  "front": "Krav til egenkapitalfinansiert kapital. (r = 6 %, t = 25 %)",
  "back": "<b>F′E = r/(1 − t) = 8,00 %</b><br>1. F′E(1 − t) = r.<br>2. 6 %/0,75 = 8 %.<br>Felle: 6,00 % (gjeldskravet), 4,50 % (r(1 − t)), 7,50 % (r(1 + t)).<br>(Prøveeksamen 6 7a, manual 9.5)"
 },
 {
  "id": "fo-bed-06",
  "ch": 9,
  "deck": "bedriften",
  "front": "Et prosjekt gir 7 % før skatt. Lønnsomt med gjeld? Med egenkapital? (1 000 000, r = 6 %, t = 22 %)",
  "back": "<b>Gjeld: +7 800. Egenkapital: −5 400</b><br>1. Gjeld: 70 000 − 60 000 − 2 200 = 7 800.<br>2. Egenkapital: 70 000 × 0,78 − 60 000 = −5 400.<br>3. Nullpunkt for egenkapital: 60 000/0,78 = 76 923, altså 7,69 %.<br>Felle: Å sammenligne 7 % med 6 % uten å skille på finansieringen.<br>(Manual 9.5)"
 },
 {
  "id": "fo-bed-07",
  "ch": 9,
  "deck": "bedriften",
  "front": "Rentebegrensning: bare andelen A av gjeldsrentene kan trekkes fra. Hva skjer med F′G og F′E?",
  "back": "<b>F′G = r(1 − At)/(1 − t). F′E = r/(1 − t) uendret</b><br>1. Bare gjeldsleddet endres.<br>2. Gjeld blir dyrere, men fortsatt billigere enn egenkapital.<br>Med r = 6 %, t = 25 %, A = 0,5: F′G = 7,00 % og F′E = 8,00 %.<br>Felle: «Kravet til gjeld blir likt» eller «høyere enn kravet til egenkapital».<br>(Prøveeksamen 6 7b og 18 8a, manual 9.5)"
 },
 {
  "id": "fo-bed-08",
  "ch": 9,
  "deck": "bedriften",
  "front": "Bedriften får fradrag for en beregnet avkastning på egenkapitalen i tillegg til gjeldsrentene. Førsteordensbetingelser?",
  "back": "<b>F′G = F′E = r. Nøytral for finansiering og investering</b><br>1. V = (1 − t)[F(G + E) − r(G + E)].<br>2. Alle kapitalkostnader gir fradrag.<br>Skjermingsfradraget gjør noe beslektet på eierens hånd.<br>Felle: F′E = r/(1 − t) (gjelder uten fradraget).<br>(Prøveeksamen 1 8b, manual 9.6)"
 },
 {
  "id": "fo-bed-09",
  "ch": 9,
  "deck": "bedriften",
  "front": "Kontantstrømskatt: investeringen utgiftsføres straks, renter holdes utenfor. Hvordan tilpasses K? (Kapitalslit δ)",
  "back": "<b>F′(K) = r + δ. Skatten er nøytral</b><br>1. V = (1 − t)[−K + (F(K) + (1 − δ)K)/(1 + r)].<br>2. (1 − t) forkortes bort.<br>3. Staten dekker t av investeringen og tar t av inntektene. Kan skattlegge grunnrente.<br>Felle: (r + δ)/(1 − t) og «kontantstrømskatten gir rentefradrag».<br>(Prøveeksamen 18 8b, F6 lb 40, manual 9.6)"
 },
 {
  "id": "fo-bed-10",
  "ch": 9,
  "deck": "bedriften",
  "front": "Hvilken omlegging gir nøytralitet både for gjeld mot egenkapital og for investeringsnivået?",
  "back": "<b>Kontantstrømskatt (eller fradrag for egenkapitalens kostnad)</b><br>1. Kontantstrømskatt: F′G = F′E = r.<br>2. Rentefradrag i tillegg til straks utgiftsføring: gjeld subsidiert, r(1 − 2t)/(1 − t) = 3,59 % ved r = 5 %.<br>3. Lavere sats: kilen blir mindre, men den er der.<br>Felle: «Senk satsen» og «halvt fradrag for egenkapitalkostnaden».<br>(Prøveeksamen 13 8b, F6)"
 },
 {
  "id": "fo-bed-11",
  "ch": 9,
  "deck": "bedriften",
  "front": "Modellen med eierens renteskatt tᵃ, selskapsskatt tᵏ og rentefradragsandel α: når er skatten nøytral?",
  "back": "<b>F′(K) = r(1 − tᵃ − tᵏα)/(1 − tᵏ) + δ. Nøytral når tᵏ(1 − α) = tᵃ</b><br>1. Egenkapital (α = 0): r(1 − tᵃ)/(1 − tᵏ) + δ. Nøytral når tᵏ = tᵃ, som i Norge.<br>2. Gjeld (α = 1): r[1 − tᵃ/(1 − tᵏ)] + δ: subsidiert.<br>Eksempel r = 5 %, δ = 10 %, 22 %: egenkapital 15,00 %, gjeld 13,59 %.<br>Felle: Å la tᵃ øke kravet, eller glemme tᵃ (16,41 %).<br>(F6 lb 12 til 14, F6 2c)"
 },
 {
  "id": "fo-bed-12",
  "ch": 9,
  "deck": "bedriften",
  "front": "Skattemessig avskrivning lavere enn kapitalslitet. Hva skjer med kravet? (r = 5 %, δ = 10 %, avskrivning 6 %, t = 22 %)",
  "back": "<b>F′(K) = r + δ + t(δ − δˢ)/(1 − t) = 16,13 %</b><br>1. Uten avvik: 15 %.<br>2. Kile: 0,22 × 0,04/0,78 = 1,13 pp.<br>For lav avskrivning er en skatt på investering. Raskere enn slitet er en subsidie.<br>Felle: 15 % («avskrivning påvirker bare timingen»).<br>(F4 lb 61, F5 lb 21)"
 },
 {
  "id": "fo-bed-13",
  "ch": 9,
  "deck": "bedriften",
  "front": "β-kilen: hvilken pris krever bedriften når bare andelen β av kostnaden kommer til fradrag i nåverdi? (t = 22 %, β = 0,75, c′ = 200)",
  "back": "<b>p = c′(1 − tβ)/(1 − t) = 214,10</b><br>1. Teller 1 − 0,165 = 0,835. Nevner 0,78.<br>2. 200 × 1,0705.<br>β = 1 (straks utgiftsføring) gir p = c′: nøytralt.<br>Felle: 186,83 (kilen snudd), 256,41 (β = 0), 200 (β = 1).<br>(F5 lb 18 til 21)"
 },
 {
  "id": "fo-bed-14",
  "ch": 9,
  "deck": "bedriften",
  "front": "Skattearbitrasje: eieren låner privat og skyter beløpet inn som egenkapital. Gevinst per år? (Lån 1,5 mill., r = 6 %, personskatt 22 %, bedriftsskatt 16 %)",
  "back": "<b>Gevinst = rK(tᵖ − tᵏ) = 5 400</b><br>1. Rente etter skatt: 90 000 × 0,78 = 70 200.<br>2. Avkastning i bedriften: 90 000 × 0,84 = 75 600.<br>Lik sats på begge nivåer gir 0, som i Norge.<br>Felle: 90 000 (rentene), −14 400 (rentefradraget glemt), «betaling for risiko».<br>(F6 lb 4 til 6, manual 9.2)"
 },
 {
  "id": "fo-bed-15",
  "ch": 9,
  "deck": "bedriften",
  "front": "Lån med rentefradrag og plasser i et skattefritt papir med samme rente. Hva tjener du? Hvorfor forsvinner gevinsten? (Lån 1 mill., 5 %, fradrag 22 %)",
  "back": "<b>11 000 i året. Stenges av symmetri eller av markedsprisen</b><br>1. Kostnad etter fradrag 39 000, avkastning 50 000.<br>2. Symmetri: skattlegges avkastningen med 22 %, blir gevinsten 0.<br>3. Markedet: papirets rente bys ned til 3,9 %. Fallet er en implisitt skatt på 22 %.<br>Felle: 23 700 (fradrag med 47,4 %). Rentefradraget er verdt 22 %.<br>(Manual 9.2)"
 },
 {
  "id": "fo-bed-16",
  "ch": 9,
  "deck": "bedriften",
  "front": "Hva betyr nøytralitet i skattesystemet (Sandmo)?",
  "back": "<b>Rangeringen av alternativer før skatt er lik rangeringen etter skatt</b><br>1. Krever like effektive satser på tvers av aktiva, finansieringsformer og organisasjonsformer.<br>2. Effektive satser, ikke nominelle.<br>3. Nøytral betyr verken lav eller rettferdig skatt.<br>Felle: «Nøytral skatt har ingen kile» (også en nøytral kapitalinntektsskatt vrir sparingen).<br>(Sandmo AS1, manual 9.1)"
 },
 {
  "id": "fo-teo-01",
  "ch": 10,
  "deck": "skatteteori",
  "front": "Flat sats 28 % på all inntekt, uten bunnfradrag. Er systemet progressivt? (Kari 500, Per 1 000)",
  "back": "<b>Verken progressivt eller regressivt (proporsjonalt)</b><br>1. Kari: 140/500 = 28 %. Per: 280/1 000 = 28 %.<br>2. Progressivitet avgjøres av gjennomsnittsskatten, ikke av kronebeløpet.<br>Felle: «Progressivt fordi Per betaler dobbelt så mye».<br>(H2024 4a, manual 1.3)"
 },
 {
  "id": "fo-teo-02",
  "ch": 10,
  "deck": "skatteteori",
  "front": "Samme flate sats med bunnfradrag 50. Progressivt? (28 %, Kari 500, Per 1 000)",
  "back": "<b>Progressivt: 25,2 % mot 26,6 %</b><br>1. Kari: 450 × 28 % = 126, altså 25,2 %.<br>2. Per: 950 × 28 % = 266, altså 26,6 %.<br>3. t̄ = t(1 − B/Y) stiger med Y for alle B &gt; 0.<br>Felle: «En flat skatt kan ikke være progressiv».<br>(H2024 4b, manual 1.3)"
 },
 {
  "id": "fo-teo-03",
  "ch": 10,
  "deck": "skatteteori",
  "front": "Bunnfradraget økes fra 50 til 200. Sterkere eller svakere progressivitet? (28 %, inntekt 500 og 1 000)",
  "back": "<b>Sterkere: forskjellen går fra 1,4 til 5,6 pp</b><br>1. Kari 16,8 %, Per 22,4 %.<br>2. Snarvei: t × B × (1/Ylav − 1/Yhøy) er proporsjonal med B. Firedoblet B gir firedoblet spredning.<br>Felle: «Like progressivt», «svakere», «regressivt».<br>(H2024 4c, manual 1.3)"
 },
 {
  "id": "fo-teo-04",
  "ch": 1,
  "deck": "skatteteori",
  "front": "Gjennomsnittsskatt i et trinnsystem. (12 % under 100 000, 18 % til 350 000, 28 % over; inntekt 450 000 og 380 000)",
  "back": "<b>18,9 % og 17,2 %</b><br>1. Felles bunn: 12 000 + 45 000 = 57 000.<br>2. Topp: 28 000 og 8 400.<br>3. 85 000/450 000 og 65 400/380 000.<br>Snarvei: begge må ligge over 57 000/350 000 = 16,3 %.<br>Felle: 28 % på hele inntekten, 15,0 % (toppsjiktet glemt).<br>(H2024 5, manual 1.4)"
 },
 {
  "id": "fo-teo-05",
  "ch": 1,
  "deck": "skatteteori",
  "front": "Marginalskatt mot gjennomsnittsskatt på en lønn. (700 000 i 2026: 22 %, trygdeavgift 7,6 %, inntekten ligger i trinn 2 på 4,0 %)",
  "back": "<b>Marginal 33,6 %. Gjennomsnitt 25,4 %</b><br>1. Marginal: 22 + 7,6 + 4,0 = 33,6 %.<br>2. Fradrag 210 240. Skatt 107 747,20 + 53 200 + 16 835,40 = 177 782,60.<br>3. 177 782,60/700 000 = 25,4 %.<br>Felle: Marginalsatsen brukt på hele inntekten. Trinnsatsen gjelder bare inntekten inne i trinnet.<br>(Manual 1.2)"
 },
 {
  "id": "fo-teo-06",
  "ch": 10,
  "deck": "skatteteori",
  "front": "Hvilket skattesystem gir samme gjennomsnittsskatt for alle uansett inntekt?",
  "back": "<b>Flat sats uten bunnfradrag</b><br>1. Proporsjonalt: t̄ = t for alle.<br>2. Bunnfradrag, borgerlønn eller barnefradrag gjør gjennomsnittsskatten ulik.<br>Felle: «Flat sats med bunnfradrag» og «flat sats med borgerlønn» er flate, men ikke proporsjonale.<br>(Kursgodkjenning 2026 8, manual 10.3)"
 },
 {
  "id": "fo-teo-07",
  "ch": 10,
  "deck": "skatteteori",
  "front": "Negativ inntektsskatt (borgerlønn): gjennomsnittsskatt? (40 % av all inntekt, overføring 60 000 til alle, inntekt 100 000 og 200 000)",
  "back": "<b>−20 % og 10 %</b><br>1. 40 000 − 60 000 = −20 000.<br>2. 80 000 − 60 000 = 20 000.<br>3. T = tY − G = t(Y − G/t): som et bunnfradrag på 150 000.<br>Gjennomsnittsskatten nærmer seg 40 % nedenfra.<br>Felle: Overføringen trukket fra inntekten: 28 %.<br>(Sandmo AS3, manual 10.3)"
 },
 {
  "id": "fo-teo-08",
  "ch": 10,
  "deck": "skatteteori",
  "front": "Er «flat skatt» og «proporsjonal skatt» det samme?",
  "back": "<b>Nei</b><br>1. Flat: én marginalsats.<br>2. Proporsjonal: konstant gjennomsnittsskatt.<br>3. Flat med bunnfradrag (Hall og Rabushka) og negativ inntektsskatt (Friedman) er flate og progressive.<br>Teorien gir ingen klar spådom om flat skatt og arbeidstilbudet.<br>Felle: «Progressivt fordi det har flere trinn».<br>(Manual 10.2 og 10.3)"
 },
 {
  "id": "fo-teo-09",
  "ch": 10,
  "deck": "skatteteori",
  "front": "Optimal marginalskatt (Mirrlees): når er den høyere?",
  "back": "<b>Lavere elastisitet, større spredning i produktivitet, sterkere ulikhetsaversjon</b><br>1. Simuleringene gir tilnærmet konstant marginalskatt. Omfordelingen kommer fra bunnfradraget.<br>2. Effektivitetstapet vokser med t²: dobbel sats gir fire ganger tapet.<br>Felle: «Høyere jo mer elastisk arbeidstilbudet er» og «optimal skatt har stigende satser».<br>(Sandmo AS4, manual 10.5)"
 },
 {
  "id": "fo-teo-10",
  "ch": 12,
  "deck": "skatteteori",
  "front": "Implisitt skatt: to obligasjoner med samme risiko. A er skattefri med rente r, B skattlegges med 22 % og har rente R. Hva er riktig?",
  "back": "<b>r &lt; R</b><br>1. Lik risiko krever lik avkastning etter skatt: r = R(1 − 0,22).<br>2. Skattefritaket er priset inn: lavere avkastning før skatt.<br>Felle: r &gt; R («skattefritt må gi mer»), r = R, «ikke sammenlignbare».<br>(H2024 9a, H2019 4, manual 12.4)"
 },
 {
  "id": "fo-teo-11",
  "ch": 12,
  "deck": "skatteteori",
  "front": "Formelen for den implisitte skatten på den skattefrie obligasjonen. (R = 10 %, r = 7,8 %)",
  "back": "<b>t = (R − r)/R = 22 %</b><br>1. Fra r = R(1 − t).<br>2. (10 − 7,8)/10 = 22 %.<br>Felle: (R − r)/r = 28,2 %, R − r (ikke en sats), (R − r × 22 %)/R. Nevneren er avkastningen på det skattlagte papiret.<br>(H2024 9b, manual 12.4)"
 },
 {
  "id": "fo-teo-12",
  "ch": 12,
  "deck": "skatteteori",
  "front": "Valgregelen ved implisitt skatt: skattlagt papir gir 8 %, skattefritt 6 %. Hva velger en investor med 30 % marginalskatt?",
  "back": "<b>Det skattefrie: t* = 25 % er lavere enn hans 30 %</b><br>1. t* = (8 − 6)/8 = 25 %.<br>2. Skattlagt etter 30 %: 5,6 % mot 6 %.<br>3. Under 25 %: velg det skattlagte. Lik t*: likegyldig.<br>Det er utstederen som tjener på fritaket.<br>Felle: «Velg alltid det skattefrie» og 33,3 % (feil nevner).<br>(F10, manual 12.5)"
 },
 {
  "id": "fo-teo-13",
  "ch": 12,
  "deck": "skatteteori",
  "front": "Domar og Musgrave: skatten på avkastning øker fra 0 til 40 % med fullt tapsfradrag. Hva skjer med beløpet i det risikable aktivumet? (600 000 før)",
  "back": "<b>Det øker til x/(1 − t) = 1 000 000</b><br>1. Med fullt tapsfradrag krymper hvert utfall med (1 − t).<br>2. Investoren gjenoppretter samme fordeling ved å skalere opp med 1/(1 − t).<br>Staten er stille partner. Gjelder uansett risikoholdning.<br>Felle: 600 000 uendret, 360 000 (ganget med 0,6), 840 000.<br>(F10, Sandmo AS2, manual 12.2)"
 },
 {
  "id": "fo-teo-14",
  "ch": 12,
  "deck": "skatteteori",
  "front": "Prosjektvalg med 40 % skatt, med og uten tapsfradrag. (A gir sikkert 20 000. B gir +100 000 eller −50 000 med like sannsynlighet)",
  "back": "<b>Uten tapsfradrag A (12 000 mot 5 000). Med tapsfradrag B (15 000 mot 12 000)</b><br>1. Uten: B = 0,5 × 60 000 − 0,5 × 50 000 = 5 000.<br>2. Med: B = 0,6 × 25 000 = 15 000.<br>Fullt tapsfradrag ganger alle prosjekter med (1 − t). Rangeringen står.<br>Felle: Å sammenligne B etter skatt med A før skatt (20 000).<br>(F10, manual 12.1)"
 },
 {
  "id": "fo-teo-15",
  "ch": 12,
  "deck": "skatteteori",
  "front": "Tap kan bare delvis trekkes fra. Hva skjer med risikotakingen til en risikonøytral investor?",
  "back": "<b>Han tar mindre risiko</b><br>1. Staten deler gevinsten fullt, men tapet bare delvis.<br>2. Uten tapsfradrag blir forventningen E − t × G: oppsiden straffes.<br>3. Oppstartsbedrifter uten annen inntekt rammes hardest.<br>Felle: «Påvirkes ikke fordi han bare bryr seg om forventningen» og «tar mer risiko».<br>(Kursgodkjenning 2026 7, manual 12.3)"
 },
 {
  "id": "fo-teo-16",
  "ch": 4,
  "deck": "skatteteori",
  "front": "Folkefinansiering: forventet avkastning med og uten tapsfradrag. (Lån 1 mill. til 20 %, 90 % sannsynlighet for full betaling, ellers alt tapt, 22 %)",
  "back": "<b>Før skatt 8,0 %. Med tapsfradrag 6,24 %. Uten 4,04 %</b><br>1. 0,9 × 200 000 − 0,1 × 1 mill. = 80 000.<br>2. Med fradrag: 80 000 × 0,78 = 62 400.<br>3. Uten: 140 400 − 100 000 = 40 400.<br>Felle: 20 % (den lovede renten) og 15,6 % (misligholdet glemt).<br>(F3, manual 4.6)"
 },
 {
  "id": "fo-teo-17",
  "ch": 4,
  "deck": "skatteteori",
  "front": "Når er leieinntekt ved utleie av en del av egen bolig skattefri?",
  "back": "<b>Når du selv bruker minst halvparten, målt etter utleieverdi</b><br>1. Gjelder langtidsutleie (30 dager eller mer).<br>2. Leier du ut mer: skattefritt bare opp til 20 000 i året, ellers alt skattepliktig.<br>3. Skattefri utleie gir ingen fradrag for kostnader.<br>Felle: «Målt etter areal», «uten egen inngang», «eid over ett år».<br>(Kursgodkjenning 2026 5, H2021 1d, manual 4.4)"
 },
 {
  "id": "fo-teo-18",
  "ch": 4,
  "deck": "skatteteori",
  "front": "Korttidsutleie (under 30 dager) av egen bolig: hvordan skattlegges den?",
  "back": "<b>10 000 skattefritt. 85 % av resten skattlegges med 22 %</b><br>1. Effektiv sats over grensen: 85 % × 22 % = 18,7 %.<br>2. Gjelder uansett hvor mye av boligen du bruker selv.<br>Felle: Å bruke halvparten-regelen for langtidsutleie.<br>(Manual 4.4)"
 },
 {
  "id": "fo-teo-19",
  "ch": 4,
  "deck": "skatteteori",
  "front": "Aksjefond mot utleiebolig: hvem vinner før skatt, etter inntektsskatt og etter formuesskatt? (1 mill., fond 8 %, bolig 6,5 %, formuesskatt 1 %)",
  "back": "<b>Fondet, så boligen, så fondet igjen</b><br>1. Før skatt: 80 000 mot 65 000.<br>2. Etter: 49 728 (37,84 %) mot 50 700 (22 %).<br>3. Formuesskatt: fond 80 % (8 000), sekundærbolig 100 % (10 000). 41 728 mot 40 700.<br>Felle: 22 % på fondet, eller aksjerabatten glemt.<br>(F3, manual 4.5)"
 },
 {
  "id": "fo-teo-20",
  "ch": 3,
  "deck": "skatteteori",
  "front": "Realavkastning per år 1870 til 2015 (Jordà m.fl.): rangeringen av de fire aktivaklassene?",
  "back": "<b>Bolig 7,3 % &gt; aksjer 6,7 % &gt; statsobligasjoner ca. 2,5 % &gt; sertifikater ca. 1,0 %</b><br>1. Standardavvik: bolig ca. 10, aksjer ca. 24.<br>2. Bare ca. 1 pp av boligavkastningen er prisstigning. Resten er leie.<br>3. r &gt; g: 6,28 % mot 2,87 %.<br>Felle: «Bolig gir best risikojustert avkastning, så kjøp ett hus» (ett hus har idiosynkratisk risiko).<br>(F2, manual 3.1)"
 },
 {
  "id": "fo-teo-21",
  "ch": 10,
  "deck": "skatteteori",
  "front": "Hva sier filosofene om progressiv skatt: utilitarister, Smith, Nozick, Rawls og Pettit?",
  "back": "<b>Utilitaristene, Rawls og Pettit for. Nozick mot. Smith forsiktig</b><br>1. Utilitarister: avtakende grensenytte gir et betinget argument for omfordeling.<br>2. Smith: skatt etter evne, men varsom med omfordeling.<br>3. Nozick: skatt er tvangsarbeid, progressivitet særlig forkastelig.<br>4. Rawls: differanseprinsippet og sløret av uvitenhet. Pettit: hindre dominans fra store formuer.<br>Felle: Å gi Nozick eller Smith et sterkt forsvar for progressivitet.<br>(F7 lb 48 til 53)"
 },
 {
  "id": "fo-teo-22",
  "ch": 10,
  "deck": "skatteteori",
  "front": "Borgerlønn: argumenter for og mot? Hvem vil Moene gi den til?",
  "back": "<b>For: mindre fattigdom, frihet, enklere velferd. Mot: kostnad, arbeidsinsentiver, administrasjon</b><br>1. For: sikret minsteinntekt, entreprenørskap, erstatter byråkrati, inntekt ved teknologisk ledighet.<br>2. Mot: høyere skatter, behovet for NAV forsvinner ikke, svakere arbeidsetikk, kan trekke til seg flyktninger.<br>3. Moene: borgerlønn til dem som har stemmerett ved kommunevalg.<br>Felle: Å tro at borgerlønn gjør systemet mindre progressivt. Negativ inntektsskatt er den mest progressive flate varianten.<br>(F7 lb 42 til 45)"
 },
 {
  "id": "fo-teo-23",
  "ch": 9,
  "deck": "skatteteori",
  "front": "Politisk system og offentlig sektor: parlamentarisme mot president og kongress (Persson, Roland og Tabellini)?",
  "back": "<b>Parlamentarisme gir større offentlig sektor: 37 % mot 19,8 % av BNP</b><br>1. Parlamentarisme: én votering, samme flertall avgjør inntekter og utgifter.<br>2. President og kongress: skattekomité og utgiftskomité hver for seg. Inntektskomiteen holder skattene lave.<br>3. Mindretallsregjeringer og store koalisjoner gir mer utgiftsvekst (hestehandel).<br>Felle: Å snu retningen: USA-systemet gir minst offentlig sektor.<br>(F6 lb 47 til 52)"
 },
 {
  "id": "fo-int-01",
  "ch": 13,
  "deck": "internasjonal skatt",
  "front": "Når er du skattemessig bosatt i Norge?",
  "back": "<b>Opphold over 183 dager i en tolvmånedersperiode eller over 270 dager i en 36-månedersperiode</b><br>1. Periodene er glidende, ikke kalenderår.<br>2. Statsborgerskap, fødested og pass avgjør ikke.<br>Felle: «Norsk pass», «født i Norge», «bostedsadresse», «ektefelle i Norge».<br>(Kursgodkjenning 2026 4, skatteloven § 2-1)"
 },
 {
  "id": "fo-int-02",
  "ch": 13,
  "deck": "internasjonal skatt",
  "front": "Bodd i Norge over ti år, flytter i januar 2022. Fra hvilket år er du skattemessig utflyttet?",
  "back": "<b>Fra og med 2026</b><br>1. Utflyttingsåret pluss tre hele år (2023, 2024, 2025) må godtgjøres.<br>2. Krav: maks 61 dager i Norge per år. Verken du eller nærstående kan disponere bolig her.<br>Felle: 2022, 2024 og 2025.<br>(H2022 4a, kursgodkjenning 2026 9, manual 13.1)"
 },
 {
  "id": "fo-int-03",
  "ch": 13,
  "deck": "internasjonal skatt",
  "front": "En som har emigrert, er i Norge 92 dager hver sommer fra 2026. Blir han skattemessig bosatt igjen? Fra når?",
  "back": "<b>Ja, fra 1. januar i det året han passerer 270 dager på 36 måneder: 1.1.2028</b><br>1. Han er aldri over 183 dager på tolv måneder.<br>2. 3 × 92 = 276: terskelen passeres sommeren 2028.<br>3. 270-regelen tillater i snitt bare 90 dager i året.<br>Felle: «Fra dagen han passerer 270 dager» og «ikke bosatt, aldri 183 dager».<br>(F7 lb 10, prøveeksamen 16 9)"
 },
 {
  "id": "fo-int-04",
  "ch": 6,
  "deck": "internasjonal skatt",
  "front": "Exit-skatt ved utflytting. (Aksjer verdt 25 mill., inngangsverdi 5 mill., bunnfradrag 3 mill., eierskatt 37,84 %)",
  "back": "<b>(25 − 5 − 3) mill. × 37,84 % = 6 432 800</b><br>1. Latent gevinst 20 mill. Grunnlag 17 mill.<br>2. Gevinsten anses realisert dagen før utflytting og fastsettes endelig.<br>F7 lb 11 kaller 3 mill. en grense: exit-skatt utløses ved potensiell gevinst over 3 mill.<br>Felle: 7 568 000 (bunnfradrag glemt), 3 740 000 (22 %), 9 460 000 (av markedsverdien), 8 324 800 (bunnfradrag trukket fra markedsverdien).<br>(Manual 6.6)"
 },
 {
  "id": "fo-int-05",
  "ch": 6,
  "deck": "internasjonal skatt",
  "front": "Exit-skatt: hvordan kan den betales? Hva skjer ved utbytte etter utflytting?",
  "back": "<b>Tolv rentefrie årsrater, alt etter tolv år med renter, eller straks</b><br>1. Utbytte etter utflytting: utdelingen × 0,7 av den utsatte skatten forfaller.<br>2. Senere verdifall senker ikke skatten.<br>3. Flytter du tilbake innen tolv år med aksjene i behold, faller den bort.<br>Felle: Å blande regimene. Utflytting før 29.11.2022 (som i H2022-saken): femårsregelen, skatten falt bort hvis aksjene ikke ble solgt innen fem år. Senere: ingen slik bortfall, tolvårsordningen gjelder.<br>(Manual 6.6, F7 lb 11)"
 },
 {
  "id": "fo-int-06",
  "ch": 6,
  "deck": "internasjonal skatt",
  "front": "Utløses exit-skatt om en eier gir aksjene til et barn bosatt i utlandet?",
  "back": "<b>Ja. Gave til en mottaker bosatt i utlandet utløser exit-skatt</b><br>1. Terskel: netto gevinst over 100 000 i året. Da skattlegges hele gevinsten.<br>2. Bunnfradraget på 3 mill. gjelder bare egen utflytting.<br>3. Giveren trenger ikke flytte selv.<br>Felle: «Utløses bare når han selv flytter», «først når datteren selger», «ikke i skatteavtaleland».<br>(H2024 10h, manual 6.6)"
 },
 {
  "id": "fo-int-07",
  "ch": 6,
  "deck": "internasjonal skatt",
  "front": "Kan exit-skatt unngås ved å flytte selve aksjeselskapet ut av landet?",
  "back": "<b>Nei. Selskapet beskattes som om det var likvidert</b><br>1. Kursets fasit: realisasjonsbeskatning på både selskaps- og aksjonærnivå.<br>2. Eieren selv utløser ikke personlig exit-skatt ved dette.<br>Felle: «Ja, da unngår man skatt» og «aksjene anses også utflyttet».<br>(H2024 10i, H2022 4h, manual 6.6)"
 },
 {
  "id": "fo-int-08",
  "ch": 6,
  "deck": "internasjonal skatt",
  "front": "Beskytter en skatteavtale mot norsk exit-skatt ved utflytting?",
  "back": "<b>Nei. Skatten inntrer dagen før utflytting</b><br>1. Da er du fortsatt bosatt i Norge. Avtalen har ikke fått virkning.<br>2. H2022 (utflytting januar 2022): fasit var femårsregelen, bortfall om aksjene ikke selges innen fem år. Den gjelder ikke for utflytting fra 29.11.2022.<br>Felle: «Hjemstaten har eksklusiv rett til aksjegevinster etter OECDs mønsteravtale».<br>(H2022 4b og 4c, manual 6.6)"
 },
 {
  "id": "fo-int-09",
  "ch": 13,
  "deck": "internasjonal skatt",
  "front": "Etter norsk intern rett isolert sett: hvor mye av et norsk AS sin globale omsetning er skattepliktig hit? (100 mill. totalt, 30 mill. i Norge)",
  "back": "<b>Hele 100 mill. (globalskatteplikt)</b><br>1. Bosatt person eller hjemmehørende selskap: all inntekt uansett hvor den er tjent.<br>2. Skatteavtalene er ikke hensyntatt ennå.<br>Felle: 30 mill. (bare Norge, kildeprinsippet) og 90 mill.<br>(H2024 10a, manual 13.1)"
 },
 {
  "id": "fo-int-10",
  "ch": 13,
  "deck": "internasjonal skatt",
  "front": "Skatteavtale med fullstendig unntak: hvem beskatter inntekten fra kildestaten? (20 mill. fra USA, 35 %)",
  "back": "<b>Bare kildestaten: T = tkilde × Y = 7 mill.</b><br>1. Norge ser bort fra inntekten.<br>2. Samlet sats er kildestatens, også når den er høyere enn 22 %.<br>Felle: «Fordeles 50/50», «Norge pga. globalskatteplikt», «ingen får beskatte».<br>(H2024 10b, manual 13.3)"
 },
 {
  "id": "fo-int-11",
  "ch": 13,
  "deck": "internasjonal skatt",
  "front": "Vanlig kreditmetode når kildesatsen er lavere: skatt til Norge? (40 mill. fra Japan, 15 %, Norge 22 %)",
  "back": "<b>Restskatt til Norge = 8,8 mill. − 6 mill. = 2,8 mill.</b><br>1. Japan: 6 mill.<br>2. Norge: 8,8 mill. minus kredit min(6; 8,8).<br>3. Samlet 22 %.<br>Felle: «Japan krediterer norsk skatt» (kreditten gis av hjemstaten) og «bare om det ble utlignet skatt».<br>(H2024 10c, manual 13.3)"
 },
 {
  "id": "fo-int-12",
  "ch": 13,
  "deck": "internasjonal skatt",
  "front": "Vanlig kreditmetode når kildestaten har høyere sats enn hjemstaten. Hvor stor kredit?",
  "back": "<b>Kredit = min(tkilde; thjem) × Y. Det overskytende blir stående</b><br>1. Kredit opp til det hjemstaten selv ville krevd.<br>2. Samlet sats = maks(thjem; tkilde).<br>Eksempel: 1 mill., kilde 35 %, Norge 22 %: kredit 220 000, ukreditert 130 000.<br>Felle: «Full kredit for all utenlandsk skatt» og «kildestaten må senke satsen».<br>(H2024 10g, manual 13.3)"
 },
 {
  "id": "fo-int-13",
  "ch": 13,
  "deck": "internasjonal skatt",
  "front": "Ingen skatteavtale: hvem beskatter inntekten? (10 mill. fra BVI, 7,5 %, Norge 22 %)",
  "back": "<b>Begge land etter intern rett: 29,5 %</b><br>1. BVI 750 000 + Norge 2 200 000 = 2 950 000.<br>2. Ingen avtale gir dobbeltbeskatning (slik eksamenssettene regner).<br>Med Japan på kredit og USA på unntak er BVI det eneste stedet med dobbeltbeskatning.<br>Felle: «Bare kildestaten», «bare Norge», «ingen».<br>(H2024 10d og 10e, manual 13.3)"
 },
 {
  "id": "fo-int-14",
  "ch": 13,
  "deck": "internasjonal skatt",
  "front": "Unntaksmetoden når kildestaten ikke beskatter inntekten: hva blir resultatet?",
  "back": "<b>Dobbelt ikke-beskatning</b><br>1. Unntaket er ubetinget: Norge ser bort fra inntekten uansett.<br>2. Under kredit gir samme situasjon full norsk skatt.<br>Felle: «Unntaksmetoden gjelder ikke da» og «hjemstaten får full rett».<br>(H2024 10f, manual 13.3)"
 },
 {
  "id": "fo-int-15",
  "ch": 13,
  "deck": "internasjonal skatt",
  "front": "Samme inntekt gjennom tre regimer: samlet sats? (Norge 22 %, kildestat 15 %)",
  "back": "<b>Ingen avtale 37 %. Unntak 15 %. Kredit 22 %</b><br>1. Ingen avtale: satsene legges sammen.<br>2. Unntak: kildestatens sats.<br>3. Kredit: den høyeste av de to.<br>Med kilde 35 %: 57 %, 35 % og 35 %.<br>Felle: Full kredit (gir 22 % ved kilde 35 %).<br>(Manual 13.3)"
 },
 {
  "id": "fo-int-16",
  "ch": 13,
  "deck": "internasjonal skatt",
  "front": "Lønn fra flere land. Betalbar skatt til Norge? (1,6 mill., sats 46,4 %; Irland 200 000 til 35 %; USA 200 000 til 55 %; skatteparadis uten avtale)",
  "back": "<b>742 400 − 70 000 − 92 800 = 579 600</b><br>1. Global skatt: 1,6 mill. × 46,4 %.<br>2. Irland: full kredit 70 000.<br>3. USA: kredit begrenset til 200 000 × 46,4 % = 92 800.<br>4. Skatteparadis: ingen kredit.<br>Felle: Full kredit for USA (110 000).<br>(H2021 4, manual 13.4)"
 },
 {
  "id": "fo-int-17",
  "ch": 13,
  "deck": "internasjonal skatt",
  "front": "Bosatt i tre land etter intern rett og ingen skatteavtaler. Hvem beskatter lønnen? Hva avgjør bosted etter en avtale?",
  "back": "<b>Alle tre: trippelbeskatning. Avtalen følger OECD art. 4</b><br>1. Uten avtale har ingen plikt til kredit eller unntak.<br>2. Avtalens rekkefølge: fast bolig, sentrum for livsinteressene, vanlig opphold, statsborgerskap.<br>3. Familie, hjem og arbeid avgjør sentrum for livsinteressene.<br>Felle: «Der han har meldt flytting» og «der han har vært mest».<br>(H2022 4d til 4f, manual 13.4)"
 },
 {
  "id": "fo-int-18",
  "ch": 13,
  "deck": "internasjonal skatt",
  "front": "Hva kjennetegner et skatteparadis ifølge Schjelderup?",
  "back": "<b>Hemmelighold (secrecy jurisdiction), ikke bare lav sats</b><br>1. Inngjerdet regelverk for utlendinger.<br>2. Sikret skattemessig hjemsted.<br>3. Privat informasjon: ingen regnskaper, stråmenn, truster.<br>Avslørte preferanser: var reglene vekstfremmende, ville landet brukt dem selv.<br>Felle: «Skatteparadis betyr null skatt».<br>(GS1, F11, manual 13.5)"
 },
 {
  "id": "fo-int-19",
  "ch": 13,
  "deck": "internasjonal skatt",
  "front": "Hvordan flyttes overskudd til lavskatteland? (Banan eksportert for 13 p, importert for 60 p, 1 p overskudd i hver ende)",
  "back": "<b>Internprising, tynn kapitalisering, skallselskap og stråmenn</b><br>1. Seks konserntjenester belastes 47 p i lavskattejurisdiksjoner.<br>2. Skattbart: 2/60 = 3,3 % av verdien.<br>3. Besparelse = flyttet overskudd × (thøy − tlav).<br>Felle: 7,7 % (1/13, feil nevner). Mekanismene er ofte lovlige: avoidance, ikke evasion.<br>(F11, manual 13.5)"
 },
 {
  "id": "fo-int-20",
  "ch": 13,
  "deck": "internasjonal skatt",
  "front": "Hvem bruker skatteparadisene i Norge (Alstadsæter, Johannesen og Zucman)?",
  "back": "<b>De 0,01 % rikeste unndrar 25 til 30 % av skatten sin</b><br>1. Hele befolkningen unndrar i snitt 3 %.<br>2. 50 % av formuen i skatteparadis eies av de 0,01 % rikeste.<br>3. Formuesandelen til de 0,01 % rikeste øker med om lag 25 % når skjult formue tas med.<br>Felle: Tallene byttet om, eller 3 % brukt om de rikeste. Global minimumsskatt (15 %) står i manualen 13.6, ikke på F11 2026.<br>(F11 lb 49)"
 },
 {
  "id": "fo-int-21",
  "ch": 6,
  "deck": "internasjonal skatt",
  "front": "Et AS stiftet i Norge ledes nå fra et land uten skatteavtale med Norge. Er det fortsatt hjemmehørende her? Utløses exit-skatt for selskapet?",
  "back": "<b>Ja, fortsatt hjemmehørende. Ingen exit-skatt</b><br>1. Stiftet i Norge og ingen avtale som flytter bostedet: statusen opphører ikke.<br>2. Reell ledelse i utlandet endrer ikke det.<br>Felle: «Utflyttet fordi ledelsen sitter i Dubai» og «exit-skatt gjelder bare personer».<br>(H2022 4g, manual 6.6)"
 },
 {
  "id": "fo-int-22",
  "ch": 13,
  "deck": "internasjonal skatt",
  "front": "Hvilke vilkår må oppfylles samtidig for å bli skattemessig emigrert? Hva er boligunntaket?",
  "back": "<b>Fast opphold i utlandet, maks 61 dager i Norge per år, ingen bolig i Norge</b><br>1. Verken du eller nærstående kan disponere bolig her.<br>2. Unntak: bolig anskaffet minst fem år før utflytting og ikke brukt av deg eller nærstående de siste fem årene.<br>3. Du er ikke emigrert før Skatteetaten godkjenner det.<br>Felle: «Det holder å melde flytting» og «hytta du beholder spiller ingen rolle».<br>(F7 lb 4 til 7)"
 },
 {
  "id": "fo-int-23",
  "ch": 13,
  "deck": "internasjonal skatt",
  "front": "Over 183 dager i en tolvmånedersperiode, men dagene fordeler seg over to inntektsår. Fra når er du bosatt?",
  "back": "<b>Fra 1. januar det andre året</b><br>1. 183 dager innenfor ett inntektsår: bosatt fra første dag.<br>2. Fordelt over to år: fra 1. januar det andre året.<br>3. 270 dager på 36 måneder: fra 1. januar i året terskelen passeres.<br>En mellomlanding på norsk flyplass teller ett døgn.<br>Felle: Å telle kalenderår i stedet for en glidende tolvmånedersperiode.<br>(F7 lb 10)"
 },
 {
  "id": "fo-int-24",
  "ch": 6,
  "deck": "internasjonal skatt",
  "front": "Exit-skatt og utbytte etter utflytting: hva sitter eieren igjen med i dag? Hva med skattekommisjonens forslag? (Utbytte 1 mill., kildeskatt 15 %, avdrag 70 % mot forslag 37,84 %)",
  "back": "<b>I dag 150 000. Med forslaget 471 600</b><br>1. Kildeskatt 150 000.<br>2. I dag: avdrag 700 000. 1 000 000 − 150 000 − 700 000 = 150 000.<br>3. Forslaget: avdrag 378 400. Igjen 471 600.<br>Forslaget strekker nedbetalingen fra 12 til om lag 20 år.<br>Felle: Å regne 70 % som en skattesats på utbyttet. Det er avdrag på det utsatte kravet.<br>(F7 lb 12 til 16)"
 },
 {
  "id": "fo-port-01",
  "ch": 14,
  "deck": "porteføljevalg",
  "front": "Mertons aksjeandel: meravkastning 4 %, standardavvik 20 %, γ = 3. Hvor stor andel av totalformuen skal stå i aksjer?",
  "back": "<b>w = (μ − r<sub>f</sub>)/(γσ²) = 33,3 %</b><br>1. Kvadrer σ: 0,2² = 0,04.<br>2. w = 0,04/(3 × 0,04) = 33,3 %.<br>Felle: glemme å kvadrere gir 6,7 %. Formelen har ingen tidshorisont. (Aksjesparing lb 12, k14.4)"
 },
 {
  "id": "fo-port-02",
  "ch": 14,
  "deck": "porteføljevalg",
  "front": "Meravkastning 0,05 og markedets varians 0,10. Merton sier at Kari bør ha 50 % i aksjer. Hva er γ?",
  "back": "<b>γ = (μ − r<sub>f</sub>)/(wσ²) = 1</b><br>1. 0,10 er variansen, ikke σ. Ikke kvadrer.<br>2. γ = 0,05/(0,5 × 0,10) = 1.<br>Felle: kvadrere 0,10 gir γ = 10. Snudd brøk gir 2. «Umulig å avgjøre» er feil når tre av fire størrelser er gitt. (H2025 11.1)"
 },
 {
  "id": "fo-port-03",
  "ch": 14,
  "deck": "porteføljevalg",
  "front": "Pensjonist uten humankapital med U = c^(1−γ)/(1−γ) og γ = 4. Aksjefond: 6 % forventet, standardavvik 20 %. Bank 2 %. Optimal andel i aksjefondet?",
  "back": "<b>w = (0,06 − 0,02)/(4 × 0,2²) = 25 %</b><br>1. γ i CRRA-nytten er γ i Merton.<br>2. Ingen humankapital, så totalformue = finansformue.<br>3. 0,04/(4 × 0,04) = 25 %.<br>Felle: 5 % (σ ikke kvadrert), 37,5 % (glemt å trekke fra r<sub>f</sub>), 100 %. (Kursgodkjenning 2026 12)"
 },
 {
  "id": "fo-port-04",
  "ch": 14,
  "deck": "porteføljevalg",
  "front": "Merton gir w = 50 %. Kari har 1 mill. i finansformue og risikofri humankapital verdt 1 mill. Hvor stor andel av finansformuen skal i aksjer?",
  "back": "<b>100 %</b><br>1. Totalformue = F + H = 2 mill.<br>2. Aksjebeløp = 0,5 × 2 mill. = 1 mill.<br>3. Risikofri H er et implisitt bankinnskudd, så alle aksjene må ligge i F: 1 mill./1 mill. = 100 %.<br>Felle: 50 % (w brukt på F alene). Kontroll: 1 mill. aksjer av 2 mill. totalt = 50 %. (H2025 11.2)"
 },
 {
  "id": "fo-port-05",
  "ch": 14,
  "deck": "porteføljevalg",
  "front": "Samme Kari (w = 50 %, F = 1 mill., H = 1 mill.), men humankapitalen varierer i takt med aksjemarkedet (β = 1). Andel av finansformuen i aksjer?",
  "back": "<b>0 %</b><br>1. Ønsket aksjebeløp er fortsatt 0,5 × 2 mill. = 1 mill.<br>2. Aksjelik H leverer allerede 1 × 1 mill. i aksjeeksponering.<br>3. Aksjer i F = 1 mill. − 1 mill. = 0. Hele F risikofritt.<br>Felle: 100 % (svaret fra forrige ledd dratt videre), 50 %. (H2025 11.3, Aksjesparing lb 15)"
 },
 {
  "id": "fo-port-06",
  "ch": 14,
  "deck": "porteføljevalg",
  "front": "w = 50 %. Jonas har F = 2 000′ og risikofri H = 2 000′. Ti år senere er F = 3 000′ og H = 1 000′. Aksjebeløp og andel av finansformuen ti år senere?",
  "back": "<b>2 000′ i aksjer, α = 66,7 %</b><br>1. Totalformuen er 4 000′ begge ganger, så aksjebeløpet er 0,5 × 4 000′ = 2 000′ begge ganger.<br>2. I dag: α = 2 000/2 000 = 100 %. Senere: 2 000/3 000 = 66,7 %.<br>Felle: 1 000′ (w × F i dag), 1 500′ (w × F senere). H faller med alderen, så α faller. (H2022 7.3 til 7.6)"
 },
 {
  "id": "fo-port-07",
  "ch": 14,
  "deck": "porteføljevalg",
  "front": "Anne er lik Kari (sikker humankapital, 100 % av finansformuen i aksjer), men skal straks gå av med pensjon. Hva er riktig om Annes optimale aksjeandel?",
  "back": "<b>Lavere andel, hovedsakelig fordi humankapitalen er mindre verdt</b><br>1. H ≈ 0 gir α = w = 50 %, mot Karis 100 %.<br>2. Sensor godtok også «lik»: andelen av totalformuen er 50 % for begge.<br>Felle: «lavere fordi aksjerisikoen forsvinner over lang tid». Riktig konklusjon, galt argument: økonomene avviser tidsdiversifisering. «Høyere» er alltid galt. (H2025 11.4, Aksjesparing lb 19)"
 },
 {
  "id": "fo-port-08",
  "ch": 14,
  "deck": "porteføljevalg",
  "front": "Nina har fast stilling i det offentlige, Kari er aksjemegler. De er ellers helt like (formue, lønn, risikopreferanser). Hvem bør ha mest i aksjer?",
  "back": "<b>Nina</b><br>1. Ninas humankapital samvarierer lite med aksjemarkedet og virker som et bankinnskudd.<br>2. Karis humankapital er allerede aksjelik (β nær 1), så hun bør ha mindre i aksjer.<br>Felle: «Kari, fordi hun tåler risiko» og «like mye fordi samme preferanser eller formue». Samme logikk: 30-åring over 60-åring med samme jobb. (H2023 9, prove4 14, kursgodkjenning 2026 17)"
 },
 {
  "id": "fo-port-09",
  "ch": 14,
  "deck": "porteføljevalg",
  "front": "Risikofri rente 3 %, markedsporteføljen M gir 8 % med standardavvik 20 %. Eva vil ha standardavvik 10 %, Leif 30 %. Hva gjør de?",
  "back": "<b>Begge holder M, andel i M = σ<sub>p</sub>/σ<sub>M</sub></b><br>1. Eva: 50 % i M og 50 % i bank. E = 3 + 0,5 × 5 = 5,5 %.<br>2. Leif: 150 % i M, låner 50 % av egenkapitalen. E = 3 + 1,5 × 5 = 10,5 %.<br>3. Sharpe = 5/20 = 0,25 for begge.<br>Felle: Leif kjøper volatile enkeltaksjer, eller Leif får høyere Sharpe. (prove4 14, Aksjesparing lb 48)"
 },
 {
  "id": "fo-port-10",
  "ch": 14,
  "deck": "porteføljevalg",
  "front": "Idun har 800 000, låner 200 000 til 4 % og setter 1 000 000 i markedsporteføljen (10 %, standardavvik 20 %). Forventet avkastning og standardavvik på egenkapitalen?",
  "back": "<b>11,5 % og 25,0 %</b><br>1. Vekt i M = 1 000/800 = 1,25. Vekt i lån = −0,25.<br>2. E = 1,25 × 10 − 0,25 × 4 = 11,5 %.<br>3. σ = 1,25 × 20 = 25,0 % (lånet er risikofritt).<br>Felle: 12,5 % (glemt lånerenten), 20 % (glemt at giring øker σ). (prove14 12, k14.3)"
 },
 {
  "id": "fo-port-11",
  "ch": 14,
  "deck": "porteføljevalg",
  "front": "Du ønsker høyere forventet avkastning enn markedsporteføljen og tåler mer risiko. Hva sier porteføljeteorien at du bør gjøre?",
  "back": "<b>Låne og investere mer i markedsporteføljen (gire)</b><br>1. Kapitalmarkedslinjen er den beste linjen for alle. Punkter til høyre for M nås med lån.<br>2. Ekstra risiko i enkeltaksjer eller én start-up er usystematisk og gir ikke betaling.<br>3. Giring krever lav lånerente: med forbrukslån til 12 % gir 150 % i M (8 %) bare 1,5 × 8 − 0,5 × 12 = 6 %.<br>Felle: «de mest risikable enkeltaksjene», «alt i én start-up», «aldri mer risiko enn M». (H2025 15, prove10 16)"
 },
 {
  "id": "fo-port-12",
  "ch": 14,
  "deck": "porteføljevalg",
  "front": "Knut vurderer å ta opp lån for å investere i aksjemarkedet. Hvilket råd gir faget?",
  "back": "<b>Ikke lån til enkeltaksjer. Lån til aksjefond kan passe for den som er lite risikoavers og har risikofri humankapital</b><br>1. Enkeltaksjer gir usystematisk risiko uten betaling.<br>2. Fond gir markedsrisiko, som betales.<br>3. Lånerenten må være lav (ikke forbrukslån).<br>Felle: «aldri lån», «lån til både enkeltaksjer og fond», «bare hvis lånerenten er under risikofri rente». (H2023 8, Aksjesparing lb 54 og 57)"
 },
 {
  "id": "fo-port-13",
  "ch": 14,
  "deck": "porteføljevalg",
  "front": "Du er mindre risikoavers enn de fleste. Bør du eie mer risikable aksjer enn andre?",
  "back": "<b>Nei. Du bør eie mer av indeksfondet (markedsporteføljen)</b><br>1. Separasjonsteoremet: alle holder samme risikable portefølje, M.<br>2. Risikoviljen bestemmer bare blandingen med bank eller lån.<br>Felle: «mer i risikable enkeltaksjer og mindre i indeksfond», «låne og sette på høyrentekonto». (H2023 14, Aksjesparing lb 51)"
 },
 {
  "id": "fo-port-14",
  "ch": 14,
  "deck": "porteføljevalg",
  "front": "Hvorfor gir ikke en svært volatil enkeltaksje høyere forventet avkastning? Avkastningskrav med β = 1,5, risikofri rente 3 % og markedspremie 5 %?",
  "back": "<b>Bare systematisk risiko betales: r = r<sub>f</sub> + β(r<sub>m</sub> − r<sub>f</sub>) = 10,5 %</b><br>1. Selskapsspesifikk risiko kan diversifiseres bort gratis, så ingen betaler for å bære den.<br>2. 3 + 1,5 × 5 = 10,5 %.<br>3. Lotto og Tesla på forbrukslån: stor risiko, men ubetalt.<br>Felle: høyt standardavvik betyr høy forventet avkastning. (Aksjesparing lb 59, 60 og 66)"
 },
 {
  "id": "fo-port-15",
  "ch": 14,
  "deck": "porteføljevalg",
  "front": "Aksje A: 10 % og standardavvik 20 %. Aksje B: 2 % og standardavvik 30 %. Korrelasjon 1. Du kan bare eie disse to. Andel i A for lavest mulig standardavvik?",
  "back": "<b>100 % i A</b><br>1. Ved ρ = 1 er σ<sub>p</sub> lineær: 0,30 − 0,10w. Ingen diversifiseringsgevinst.<br>2. Lavest ved alt i aksjen med lavest σ.<br>3. Svaret må være et hjørne, aldri en indre løsning.<br>Felle: 69 % er minimum-varians-vekten med ρ = 0. 51 % er «halvparten i hver». (H2024 12d, k14.2)"
 },
 {
  "id": "fo-port-16",
  "ch": 14,
  "deck": "porteføljevalg",
  "front": "Samme aksjer (A: 10 %, σ 20 %; B: 2 %, σ 30 %), men uavhengige. Andel i A for lavest standardavvik? Og for en venn som er risikonøytral?",
  "back": "<b>Minimum varians: 69 % i A. Risikonøytral: 100 % i A</b><br>1. ρ = 0: s* = σ<sub>B</sub>²/(σ<sub>A</sub>² + σ<sub>B</sub>²) = 0,09/0,13 = 69,2 %.<br>2. Generelt: s* = (σ<sub>B</sub>² − ρσ<sub>A</sub>σ<sub>B</sub>)/(σ<sub>A</sub>² + σ<sub>B</sub>² − 2ρσ<sub>A</sub>σ<sub>B</sub>).<br>3. Den risikonøytrale maksimerer forventning: alt i A.<br>Felle: 100 % på første ledd (gjelder ρ = 1). (H2023 13)"
 },
 {
  "id": "fo-port-17",
  "ch": 14,
  "deck": "porteføljevalg",
  "front": "Aksje 1: 8 % og standardavvik 10 %. Aksje 2: 4 % og standardavvik 20 %. Korrelasjon −1. Hvilket utsagn er riktig?",
  "back": "<b>Det finnes en portefølje med standardavvik 0, men den er ikke nødvendigvis optimal</b><br>1. ρ = −1: s* = σ<sub>2</sub>/(σ<sub>1</sub> + σ<sub>2</sub>) = 20/30 = 66,7 % i aksje 1, med E = 6,7 %.<br>2. Alt i aksje 1 gir 8 % med mer risiko. Valget avhenger av risikoaversjonen.<br>Felle: «50/50 gir σ = 15 %» (gjelder ρ = 1, riktig er 5 %), «aksje 2 lønner seg aldri», «lavest risiko med alt i aksje 1». (prove14 12, Aksjesparing lb 32)"
 },
 {
  "id": "fo-port-18",
  "ch": 14,
  "deck": "porteføljevalg",
  "front": "Hvilken påstand om aksjeporteføljer kan være korrekt? (a) Diversifisering kan lønne seg med positiv korrelasjon. (b) Alle bør eie samme portefølje, mer jo mer de tåler risiko. (c) 50/50 i A og B kan ha lavere σ enn bare A selv om A har lavest σ.",
  "back": "<b>Alle tre kan være korrekte</b><br>1. Diversifisering hjelper for enhver ρ under 1.<br>2. (b) er separasjonsteoremet.<br>3. (c): ρ = 0, σ<sub>A</sub> = 1 og σ<sub>B</sub> = 1,2 gir 50/50 σ = √(0,25 + 0,36) = 0,78, under 1.<br>Kjennetegn: «kan» krever ett tilfelle. (Kursgodkjenning 2026 13)"
 },
 {
  "id": "fo-port-19",
  "ch": 14,
  "deck": "porteføljevalg",
  "front": "Du eier et globalt indeksfond i utenlandsk valuta. Arbeidsinntekten din er høyere når kronen er sterk. Bør du valutasikre fondet?",
  "back": "<b>Nei, ikke valutasikre</b><br>1. Svak krone: fondet stiger i kroner når lønnen er lav. Sterk krone: omvendt.<br>2. Usikret fond samvarierer negativt med lønnen og demper svingningene i samlet inntekt.<br>3. Sikring fjerner denne forsikringen, selv om fondets egen σ faller.<br>Felle: «sikre», «bare hvis svært risikoavers», «indifferent». Kvadsheim: «Valutasikring øker risikoen». (H2024 12c, Kvadsheim lb 49)"
 },
 {
  "id": "fo-port-20",
  "ch": 14,
  "deck": "porteføljevalg",
  "front": "Hvilken påstand om «home bias» kan være riktig? Typiske alternativer: norske aksjer har lavere standardavvik, nordmenn kjenner markedet bedre, eller noe om arbeidsinntekten.",
  "back": "<b>Mye norske aksjer kan øke samlet risiko når arbeidsinntekten også er knyttet til norsk økonomi</b><br>1. Går AS Norge dårlig, faller aksjene samtidig som jobben er truet.<br>2. Norge er 0,2 % av verdens aksjemarked.<br>Felle: «lavere standardavvik i Norge» og «vi kjenner markedet, så høyere avkastning». Døskeland og Hvide: nordmenn har ca. 32 % i egen bransje og får lavere avkastning der. (Kursgodkjenning 2026 18, Psykologi lb 34)"
 },
 {
  "id": "fo-fors-01",
  "ch": 17,
  "deck": "forsikring",
  "front": "Hus 9 mill. (eneste formue) brenner med sannsynlighet 1 %. U = √W. Full dekning koster 160 000. Bør du kjøpe?",
  "back": "<b>Ja: U(W − P) &gt; E[U uten]</b><br>1. Uten: 0,99 × √9 000 000 + 0,01 × 0 = 2 970,0.<br>2. Med: √8 840 000 = 2 973,2. Ingen sannsynlighet, formuen er sikker.<br>3. 2 973,2 er høyest: kjøp, selv om premien er 1,78 × aktuarisk (90 000).<br>Felle: «nei, premien er høyere enn forventet skade» (sammenligner kroner, ikke nytte). (H2025 13.1)"
 },
 {
  "id": "fo-fors-02",
  "ch": 17,
  "deck": "forsikring",
  "front": "Hus 1 mill., brannsannsynlighet 1 %, U = √W. Premie 25 000: kjøpe? Hva er høyeste premie du vil betale?",
  "back": "<b>Nei. Maks premie = W − (E[U])² = 19 900</b><br>1. E[U uten] = 0,99 × 1 000 = 990. Med: √975 000 = 987,42, under 990: nei.<br>2. √(1 000 000 − P) = 990 gir P = 1 000 000 − 980 100 = 19 900.<br>Felle: 27 100 og 29 900 er over 25 000 som du avviste. 23 100 gir √976 900 = 988,38, under 990. (H2024 11c og 11d)"
 },
 {
  "id": "fo-fors-03",
  "ch": 17,
  "deck": "forsikring",
  "front": "Hus 9 mill., U = √W, full dekning til 160 000. Hva er den laveste brannsannsynligheten som gjør at du kjøper? Alternativer 0,52 %, 0,89 %, 1,52 %, 2,01 %.",
  "back": "<b>p* = 1 − U(W − P)/U(W) = 0,89 %</b><br>1. (1 − p) × 3 000 = 2 973,2.<br>2. 1 − p = 0,9911, altså p = 0,89 %.<br>3. Eliminering: kjøp lønte seg ved 1 %, så terskelen må ligge under 1 %. Stryk 1,52 og 2,01.<br>Felle: 0,52 % gir E[U uten] = 2 984,4, over 2 973,2: ikke kjøp. (H2025 13.2)"
 },
 {
  "id": "fo-fors-04",
  "ch": 17,
  "deck": "forsikring",
  "front": "Hus 9 mill., brann 1 %, U = √W. Selskapet dekker nå bare 50 % (4,5 mill.) til samme premie 160 000. Bør du kjøpe?",
  "back": "<b>Nei: 2 964,3 under 2 970,0</b><br>1. Premien betales i begge tilstander: 8 840 000 (99 %) og 4 500 000 − 160 000 = 4 340 000 (1 %).<br>2. E[U] = 0,99 × √8 840 000 + 0,01 × √4 340 000 = 2 964,3.<br>3. Under 2 970: nei. Påslaget per krone dekning er doblet.<br>Felle: «ja» (dratt videre fra full dekning). Glemt premie i brann gir 2 964,7. (H2025 13.3)"
 },
 {
  "id": "fo-fors-05",
  "ch": 17,
  "deck": "forsikring",
  "front": "Du får tilbud om å forsikre mobilen til riktig pris: premie lik forventet utbetaling. U = √W. Bør du takke ja?",
  "back": "<b>Ja, en risikoavers person kjøper alltid forsikring til riktig (aktuarisk) pris</b><br>1. Riktig pris = p × L: forventet formue er lik med og uten.<br>2. Konkav nytte (Jensen): sikker formue slår usikker med samme forventning.<br>Felle: «ja med √W, men ikke med ln W» (begge er konkave), «nei, aldri forsikre lav verdi». (H2024 11a, k17.2)"
 },
 {
  "id": "fo-fors-06",
  "ch": 17,
  "deck": "forsikring",
  "front": "Du kan forsikre en valgfri andel av mobilen til riktig pris. Hvor stor andel bør en risikoavers forsikre?",
  "back": "<b>100 %</b><br>1. Hver krone dekning til aktuarisk pris koster det den forventes å gi tilbake.<br>2. Forventet formue er uendret, risikoen faller helt til null ved full dekning (Mossins resultat).<br>3. Med påslag over aktuarisk pris blir egenandel optimal.<br>Felle: «umulig å si uten å kjenne verdien» og 50 til 99 %. (H2024 11b)"
 },
 {
  "id": "fo-fors-07",
  "ch": 17,
  "deck": "forsikring",
  "front": "U = √W. Pensjonskontrakt A gir 620 000 sikkert. B gir 360 000 eller 1 000 000 med 50 % hver. Hva er sikkerhetsekvivalenten til B? Hvilken velges?",
  "back": "<b>CE = (E[U])² = 640 000. Velg B</b><br>1. E[U] = 0,5 × 600 + 0,5 × 1 000 = 800.<br>2. CE = 800² = 640 000, over sikre 620 000.<br>3. Forventet utbetaling er 680 000, risikopremie 40 000.<br>Felle: «A fordi risikoavers alltid velger sikkert», 680 000 (forventning, ikke CE). (prove15 14)"
 },
 {
  "id": "fo-fors-08",
  "ch": 17,
  "deck": "forsikring",
  "front": "Risikoavers person velger mellom pensjonskontrakter: A 500 000 sikkert. B 400 000 (75 %) eller 800 000 (25 %). C 350 000 (25 %) eller 550 000 (75 %). Hvilken velges?",
  "back": "<b>A</b><br>1. E(B) = 0,75 × 400 000 + 0,25 × 800 000 = 500 000.<br>2. E(C) = 0,25 × 350 000 + 0,75 × 550 000 = 500 000.<br>3. Lik forventning: konkav nytte gir høyest nytte til det sikre beløpet.<br>Felle: «alle like gode» gjelder bare risikonøytral. Er forventningene ulike, må du regne CE. (Kursgodkjenning 2026 11)"
 },
 {
  "id": "fo-fors-09",
  "ch": 17,
  "deck": "forsikring",
  "front": "Formue 6 mill., hvorav hus 3 mill. Brann med 1,1 % gir formue 3 mill. U = ln W. Høyeste premie for full dekning?",
  "back": "<b>ln(W − P) = E[ln W], P = W − e<sup>E[U]</sup> = 45 574</b><br>1. E[U] = 0,989 × ln 6 000 000 + 0,011 × ln 3 000 000 = 15,5997.<br>2. CE = e<sup>15,5997</sup> = 5 954 426. P = 45 574, intervallet 40 000 til 50 000.<br>Felle: √W av vane gir 38 600. ln W er mer risikoavers (γ = 1 mot 0,5) og betaler mer. Formuen ved brann er 3 mill., ikke 0. (H2019 7a)"
 },
 {
  "id": "fo-fors-10",
  "ch": 17,
  "deck": "forsikring",
  "front": "Bank 1,6 mill. og verksted 2 mill. som brenner med 2 %. U = √W. Full dekning koster 45 000. Alternativ: egenandel 400 000 (utbetaler 1,6 mill.) til premie 33 000. Hva velges?",
  "back": "<b>Egenandelen gir høyest forventet nytte</b><br>1. Ingen: 0,98 × √3 600 000 + 0,02 × √1 600 000 = 1 884,72.<br>2. Full: √3 555 000 = 1 885,47.<br>3. Egenandel: 0,98 × √3 567 000 + 0,02 × √3 167 000 = 1 886,47.<br>Felle: «full dekning, risikoavers forsikrer alltid fullt» (bare til aktuarisk pris). Husk premien i brann-tilstanden. (prove10 14.3)"
 },
 {
  "id": "fo-fors-11",
  "ch": 17,
  "deck": "forsikring",
  "front": "Bank 1,6 mill. og verksted 2 mill. U = √W. Full dekning koster 45 000. Laveste brannsannsynlighet som gjør forsikringen lønnsom, når tapet ikke er hele formuen?",
  "back": "<b>(1 − p)√W + p√(W − L) = √(W − P)</b><br>1. p* = (√W − √(W − P))/(√W − √(W − L)).<br>2. (√3 600 000 − √3 555 000)/(√3 600 000 − √1 600 000) = 1,88 %.<br>Felle: snarveien p* = 1 − U(W − P)/U(W) gjelder bare når U(W − L) = 0. Her gir den 0,63 %, som er feil. (prove10 14.2)"
 },
 {
  "id": "fo-fors-12",
  "ch": 17,
  "deck": "forsikring",
  "front": "Hvilke forsikringer er lovpålagt i Norge? Boligforsikring, uføreforsikring, ansvarsforsikring på bil eller ingen av dem?",
  "back": "<b>Ansvarsforsikring på bil</b><br>1. Skade på tredjepart: den skadelidte står ellers uten dekning.<br>2. Boligforsikring er frivillig (men banken krever den ved boliglån).<br>3. Uføre: grunndekning ligger i folketrygden, privat er frivillig.<br>Felle: «ingen av dem». OTP er lovpålagt for arbeidsgiver, ikke en forsikring du må kjøpe. (H2025 12, k17.6)"
 },
 {
  "id": "fo-fors-13",
  "ch": 17,
  "deck": "forsikring",
  "front": "Hvorfor kan det være gunstig for et forsikringsselskap å selge forsikring med egenandel, selv om premien blir lavere?",
  "back": "<b>Alle tre: mindre moralsk hasard, gunstigere utvalg og lavere skadebehandlingskostnader</b><br>1. Moralsk hasard: kunden bærer en del av tapet og passer bedre på.<br>2. Utvalg: forsiktige kunder velger egenandel mot lavere premie.<br>3. Færre små krav å behandle.<br>H2019-varianten: egenandel er gunstig når uforsiktig atferd påvirker skadesannsynligheten. (Kursgodkjenning 2026 15, H2019 7b)"
 },
 {
  "id": "fo-fors-14",
  "ch": 17,
  "deck": "forsikring",
  "front": "Hvilket eksempel er moralsk hasard? (a) Mons lar mobilen ligge på kafébordet etter full reiseforsikring. (b) Fride med dårlig helse kjøper uføreforsikring. (c) Selskap vil ikke forsikre arbeidsledighet.",
  "back": "<b>(a) Mons: moralsk hasard</b><br>1. Moralsk hasard: atferden endres etter at du er forsikret. Selskapet ser det ikke. Kur: egenandel.<br>2. (b) er ugunstig utvalg: de med høy risiko kjøper. Kur: tvang eller obligatorisk ordning.<br>3. (c) er manglende diversifisering: risikoen rammer alle samtidig.<br>Kjennetegn: før kontrakten (utvalg) eller etter (hasard). (prove15 19)"
 },
 {
  "id": "fo-fors-15",
  "ch": 17,
  "deck": "forsikring",
  "front": "Selskapet ser ikke hvor forsiktige kundene er. Det tilbyr full dekning til høy premie og høy egenandel til lavere premie. Hvem velger egenandelen?",
  "back": "<b>Særlig de forsiktige kundene</b><br>1. De venter sjelden å måtte betale egenandelen, så lavere premie veier tyngst.<br>2. Kunder med høy risiko vil ha full dekning.<br>3. Menyen skiller kundene og demper ugunstig utvalg.<br>Felle: «særlig de med høy risiko», «alle, fordi premien er lavere». (prove18 15, k17.6)"
 },
 {
  "id": "fo-fors-16",
  "ch": 17,
  "deck": "forsikring",
  "front": "Hvorfor tilbyr et selskap brannforsikring, men ikke forsikring mot arbeidsledighet, pandemi eller tørke, selv om tapet for den enkelte er like stort?",
  "back": "<b>Manglende diversifisering: risikoen rammer mange samtidig</b><br>1. Brann og vannskade rammer uavhengig, så selskapet sprer risikoen over mange kunder.<br>2. Arbeidsledighet, pandemi og tørke treffer hele kundemassen på én gang (systematisk risiko).<br>3. Da blir forsikringen dyr eller fraværende. Staten tar den.<br>Felle: moralsk hasard eller «tørke skjer oftere». (H2019 7c, H2023 12, prove13 14)"
 },
 {
  "id": "fo-fors-17",
  "ch": 17,
  "deck": "forsikring",
  "front": "Du er mer forsiktig enn folk flest. Lønner det seg å forsikre tingene dine når premien ligger over forventet erstatning?",
  "back": "<b>Det kan likevel være lurt å forsikre de dyre tingene</b><br>1. Forsikre det du ikke kan bære selv: hus og ansvar, ikke mobil og bagasje.<br>2. Store tap gir stort nyttefall (konkavitet). Små tap koster lite i nytte. Påslaget på små forsikringer er høyt.<br>Felle: «ikke forsikre noe, premien er for høy» og «velg lav egenandel» (den forsiktige bør velge høy). (H2023 11, prove4 16)"
 },
 {
  "id": "fo-fors-18",
  "ch": 17,
  "deck": "forsikring",
  "front": "Folketrygdens alderspensjon er en forsikring mot å leve lenge. Alle må være med. Hvilket problem oppstår hvis ordningen var frivillig?",
  "back": "<b>Ugunstig utvalg</b><br>1. De som venter å leve lenge, ville blitt med. De med kort forventet levetid ville latt være.<br>2. Ordningen måtte prises etter de langlevende og kunne bryte sammen.<br>3. Kur: obligatorisk medlemskap.<br>Felle: moralsk hasard, systematisk risiko, «overforsikring». (prove16 15, Pensjon lb 21)"
 },
 {
  "id": "fo-pens-01",
  "ch": 15,
  "deck": "pensjon",
  "front": "Knut er født etter 1962 og utsetter uttaket av alderspensjon fra folketrygden. Hva skjer med delingstallet og den årlige utbetalingen?",
  "back": "<b>Delingstallet synker, årlig utbetaling øker</b><br>1. Årlig pensjon = beholdning/delingstall.<br>2. Delingstallet ≈ forventede gjenstående leveår ved uttak: færre år når du venter.<br>3. Med fast teller kan ikke nevner og resultat stige samtidig.<br>Felle: «delingstallet øker» (forveksling med levealdersjustering mellom kull) og «uendret». (H2025 14)"
 },
 {
  "id": "fo-pens-02",
  "ch": 15,
  "deck": "pensjon",
  "front": "Forventet levealder øker. Hva skjer med delingstallet for yngre årskull og med pensjonen deres?",
  "back": "<b>Delingstallet blir høyere, årlig pensjon lavere for samme beholdning</b><br>1. Levealdersjusteringen fra pensjonsreformen 2011.<br>2. Delingstallet fastsettes endelig når kullet fyller 61 år, likt for kvinner og menn.<br>3. Yngre kull må jobbe lenger for samme årlige pensjon.<br>Felle: «høyere delingstall gir mer i pensjon». Retning innen ett kull (synker med uttaksalder) er noe annet. (H2023 10, Pensjon lb 15)"
 },
 {
  "id": "fo-pens-03",
  "ch": 15,
  "deck": "pensjon",
  "front": "Født 1970, pensjonsbeholdning 4 670 000. Delingstall 21,15 ved uttak 62 år og 17,08 ved 67 år. Årlig pensjon i hvert tilfelle? Hvor mye høyere ved 67?",
  "back": "<b>Årlig pensjon = beholdning/delingstall</b><br>1. 62 år: 4 670 000/21,15 = 220 804.<br>2. 67 år: 4 670 000/17,08 = 273 419.<br>3. Forskjell 52 615 kr, 23,8 % høyere. Forventet samlet utbetaling er lik (nøytralt).<br>Felle: byttet om delingstallene. Bruddpunkt udiskontert ved ca. 88 år. (Pensjon lb 19, k15.3)"
 },
 {
  "id": "fo-pens-04",
  "ch": 15,
  "deck": "pensjon",
  "front": "Pål er 22 år, tjener 400 000 og lønnen følger lønnsveksten til han går av som 66-åring. Delingstall 22. Pensjon fra folketrygden i % av sluttlønn?",
  "back": "<b>Kompensasjonsgrad = 18,1 % × n/delingstall = 36,2 %</b><br>1. n = 66 − 22 = 44 år, lønnen under 7,1 G.<br>2. 0,181 × 44/22 = 36,2 %.<br>3. Snarveien virker fordi beholdning og sluttlønn måles i samme G.<br>Felle: 18,1 % (ett år), 44 % (glemt satsen), «kommer an på aksjemarkedet» (folketrygden følger lønnsveksten). (Kursgodkjenning 2026 19)"
 },
 {
  "id": "fo-pens-05",
  "ch": 15,
  "deck": "pensjon",
  "front": "Snarvei: 40 år i arbeid med lønn under taket og delingstall 18,02. Kompensasjonsgrad? Hva skjer hvis lønnen er 9 G?",
  "back": "<b>Under taket: 0,181 × 40/18,02 = 40,2 %. Med 9 G: 31,7 %</b><br>1. Under taket gjelder snarveien 18,1 % × n/delingstall.<br>2. Over taket teller bare 7,1 av 9 G: 0,181 × 7,1 × 40/(18,02 × 9) = 31,7 %.<br>3. Tillegg: med delingstall 17,08 gir 5 G 42,39 % og 9 G 33,44 %.<br>Felle: samme prosent for to ulike lønner over taket betyr at taket er glemt. (H2021 7a, k15.2)"
 },
 {
  "id": "fo-pens-06",
  "ch": 15,
  "deck": "pensjon",
  "front": "Beholdning 1.1: 1 200 000. Lønn 840 000, G = 100 000, lønnsvekst 3 %. Hva er beholdningen ved årets slutt?",
  "back": "<b>B<sub>t</sub> = B<sub>t−1</sub>(1 + g) + 0,181 × min(lønn; 7,1 G) = 1 364 510</b><br>1. Reguler først: 1 200 000 × 1,03 = 1 236 000.<br>2. Taket 7,1 G = 710 000 binder: 0,181 × 710 000 = 128 510.<br>3. Sum 1 364 510.<br>Felle: glemt tak 1 388 040, glemt regulering 1 328 510. (H2019 6c)"
 },
 {
  "id": "fo-pens-07",
  "ch": 15,
  "deck": "pensjon",
  "front": "Beholdning ved inngangen til 2026: 2 400 000. Lønnsvekst 4 %. Inntekt 1 100 000, 7,1 G = 920 000. Beholdning ved utgangen av 2026?",
  "back": "<b>2 662 520 kr</b><br>1. 2 400 000 × 1,04 = 2 496 000.<br>2. Opptjening 0,181 × 920 000 = 166 520.<br>3. Sum 2 662 520.<br>Felle: hele lønnen 2 695 100, opptjening regulert også 2 669 181. Reguler først, legg til etterpå. (prove15 16.1)"
 },
 {
  "id": "fo-pens-08",
  "ch": 15,
  "deck": "pensjon",
  "front": "Oddrun tjener 1 000 000 i 2026, 7,1 G = 920 000. Delingstall ved uttak 20. Hvor mye årlig pensjon gir opptjeningen fra 2026 alene, uten regulering?",
  "back": "<b>8 326 kr i året</b><br>1. Opptjening = 0,181 × 920 000 = 166 520.<br>2. Delt på delingstallet: 166 520/20 = 8 326.<br>Felle: 9 050 (hele lønnen), 166 520 (glemt delingstallet), 46 000 (920 000/20). (prove17 15)"
 },
 {
  "id": "fo-pens-09",
  "ch": 15,
  "deck": "pensjon",
  "front": "Hvilket utsagn om alderspensjonen i folketrygden (født etter 1962) er riktig? Får du tilbake det du har betalt inn?",
  "back": "<b>Pensjonen utbetales så lenge du lever: forsikring mot å leve lenge</b><br>1. «Få tilbake det du betalte inn» og «pensjon så lenge du lever» kan ikke begge være sanne.<br>2. Folketrygden gir det siste: de som lever lenge, får mer.<br>3. Folketrygden er pay-as-you-go, ikke fondert.<br>Felle: «delingstallet er høyere for dem som lever lenge», «arvingene får resten». (H2023 10, prove18 16a, Pensjon lb 11 til 13)"
 },
 {
  "id": "fo-pens-10",
  "ch": 15,
  "deck": "pensjon",
  "front": "Hva er hovedforskjellen på innskuddspensjon og ytelsespensjon? Hvem bærer avkastningsrisikoen? Hvem sin pensjon arves?",
  "back": "<b>Innskudd: fast innskudd avtalt, den ansatte bærer risikoen og pensjonen arves. Ytelse: utbetalingen avtalt, arbeidsgiver bærer risikoen</b><br>1. Den parten som ikke har fått noe avtalt, bærer risikoen.<br>2. Lav avkastning: innskuddspensjonen blir lavere, ved ytelse må arbeidsgiver betale mer.<br>Felle: beskrivelsene byttet om, «ytelse er obligatorisk, innskudd frivillig», «hver sin sektor». (H2024 13a, prove17 16, prove10 18)"
 },
 {
  "id": "fo-pens-11",
  "ch": 15,
  "deck": "pensjon",
  "front": "Hvilken påstand om innskuddspensjon er riktig? (garantert andel av sluttlønn, valg av risikoprofil, uttak ved likviditetsbehov, kollektiv forvaltning)",
  "back": "<b>Du kan normalt velge og endre risikoprofil</b><br>1. Garantert andel av sluttlønn er ytelsespensjon.<br>2. Pengene er bundet til pensjonsalder.<br>3. Kollektiv forvaltning uten valg er det motsatte av innskudd.<br>Standardprofil 50/50 er ofte for forsiktig for unge. Privat innskudd utbetales som regel i minst 10 år, offentlig tjenestepensjon livsvarig. (H2025 17, Pensjon lb 26 og 27)"
 },
 {
  "id": "fo-pens-12",
  "ch": 15,
  "deck": "pensjon",
  "front": "Du bytter jobb. Hva skjer med opptjent tjenestepensjon ved innskuddspensjon og ved privat ytelsespensjon?",
  "back": "<b>Innskudd: pensjonskapitalbevis. Privat ytelse: fripolise</b><br>1. Pensjonskapitalbevis samles normalt på egen pensjonskonto hos ny arbeidsgiver med innskuddspensjon.<br>2. Fripolise sikrer opptjente rettigheter (krever minst 12 måneders medlemskap). Den inngår ikke på egen pensjonskonto.<br>3. Offentlig: rettighetene beholdes etter ordningens regler.<br>Felle: «mister opptjeningen», «utbetales som lønn». (prove16 17, Pensjon lb 29 og 30)"
 },
 {
  "id": "fo-pens-13",
  "ch": 15,
  "deck": "pensjon",
  "front": "Lønn 600 000 i en privat bedrift med innskuddspensjon på lovens minstenivå. Hvor mye sparer arbeidsgiver minst?",
  "back": "<b>OTP-minimum: 2 % av lønn opp til 12 G = 12 000 kr</b><br>1. 2 % × 600 000 = 12 000, fra første krone.<br>2. Den ansatte velger plassering.<br>Felle: «7 % av hele lønnen» og «små bedrifter kan velge bort» (alle må ha ordning). (prove13 16, Pensjon lb 24)"
 },
 {
  "id": "fo-pens-14",
  "ch": 15,
  "deck": "pensjon",
  "front": "Hvilken påstand om IPS er riktig? (virker som BSU, rentefritt lån fra staten, uttak ved 35 til bolig, fritak for formuesskatt på hele formuen)",
  "back": "<b>IPS gir utsatt skatt (et rentefritt lån fra staten) og fritak for formuesskatt</b><br>1. Fradrag 22 % for innskudd, maks 25 000 kr i 2026.<br>2. Ingen løpende skatt, uttak skattes som alminnelig inntekt (22 %). Bundet til minst 62 år.<br>3. Fordelen er utsatt skatt og lavere skatt på gevinst (22 % mot 37,84 %). Ulemper: bindingstid, ingen skjermingsfradrag, lang nedtrapping.<br>Felle: «som BSU», «uttak ved 35 til bolig», «formuesskattfritak på hele formuen». (H2024 13b, Pensjon lb 33, Kvadsheim lb 51 og 52)"
 },
 {
  "id": "fo-pens-15",
  "ch": 15,
  "deck": "pensjon",
  "front": "Eskil er 29 år, eier ikke bolig og har satt inn 280 000 på BSU tidligere år. Han vil sette inn 35 000 i 2026. Hvor stort skattefradrag får han?",
  "back": "<b>2 000 kr</b><br>1. Maks 27 500 per år og 300 000 totalt: bare 20 000 igjen.<br>2. Fradrag 10 % × 20 000 = 2 000.<br>3. Vilkår: til og med året du fyller 33. Du kan ikke eie bolig.<br>Felle: 2 750 (glemt totaltaket), 3 500 (10 % av 35 000). (prove7 14, Pensjon lb 37)"
 },
 {
  "id": "fo-pens-16",
  "ch": 15,
  "deck": "pensjon",
  "front": "Hvilken del av pensjonsformuen er mest utsatt for svingninger i aksjemarkedet: folketrygden, ytelsespensjon, en gjennomsnittlig innskuddspensjon eller fripolise?",
  "back": "<b>En gjennomsnittlig innskuddspensjon</b><br>1. Innskudd plasseres i fond (ofte 50 % aksjer). Den ansatte bærer risikoen.<br>2. Folketrygden reguleres med lønnsveksten. Faller børsen 30 %, faller bare innskuddspensjonen.<br>3. Ytelse og fripolise er garanterte rettigheter.<br>Felle: «folketrygden er plassert i oljefondet». (Kursgodkjenning 2026 20, prove18 16b)"
 },
 {
  "id": "fo-pens-17",
  "ch": 15,
  "deck": "pensjon",
  "front": "Beate tjener 4,5 G og forventer lønnsvekst lik samfunnets. Hva skjer med kompensasjonsgraden fra folketrygden hvis hennes egen lønnsvekst blir høyere enn samfunnets?",
  "back": "<b>Alltid lavere</b><br>1. Kompensasjonsgraden måler opptjeningen mot sluttlønnen. Tidlige år er da lavere i G enn sluttlønnen og gir under 18,1 % av den.<br>2. Kommer lønnen over 7,1 G, kutter taket i tillegg.<br>3. Tall: 50 år og delingstall 15,26 gir 59,3 % med lik vekst. Med 4,5 % egen vekst mot 4 % ender hun på 5,7 G og 52,9 %.<br>Felle: «høyere», «likt», «lavere bare under taket». (H2019 6b)"
 },
 {
  "id": "fo-pens-18",
  "ch": 15,
  "deck": "pensjon",
  "front": "Innskuddspensjon: konto 100 000 nå, 2 % av lønn 500 000 spares i 22 år til 3 %. Utbetales over 10 år. Andel av sluttlønn? Folketrygden gir 40,18 %.",
  "back": "<b>S = K(1 + r)<sup>n</sup> + a[(1 + r)<sup>n</sup> − 1]/r, delt på 10 og på sluttlønn</b><br>1. 100 000 × 1,03<sup>22</sup> = 191 610. 10 000 × (1,03<sup>22</sup> − 1)/0,03 = 305 368. S = 496 978.<br>2. Per år 49 698, altså 9,94 % av lønn.<br>3. Samlet med folketrygden: 50,12 %.<br>Felle: nåverdifaktor i stedet for sluttverdifaktor, glemt startkontoen. (H2020 5b og 5c, H2021 7b til 7d)"
 },
 {
  "id": "fo-pens-19",
  "ch": 15,
  "deck": "pensjon",
  "front": "Hvordan reguleres pensjonen i folketrygden før uttak og under utbetaling?",
  "back": "<b>Før uttak: beholdningen med lønnsveksten. Under utbetaling: snittet av lønns- og prisvekst</b><br>1. Under utbetaling gir det normalt lavere vekst enn lønningene når reallønnen stiger.<br>2. 2026: alderspensjonen steg 4,69 % mot 4,91 % for G.<br>Felle: «reguleres med lønnsveksten hele livet», «følger aksjemarkedet». Folketrygden faller ikke når børsen faller. (Pensjon lb 18, k15.3)"
 },
 {
  "id": "fo-fond-01",
  "ch": 14,
  "deck": "aksjesparing og fond",
  "front": "Hvilken påstand om indeksfond er feil? (bedre diversifisering, høyere avkastning enn vektet snitt av aksjene, billigere enn aktive, bedre når andre har innsideinformasjon)",
  "back": "<b>Feil: «indeksfond gir høyere avkastning enn et vektet snitt av enkeltaksjene»</b><br>1. Et indeksfond eier aksjene i markedsverdivekter og gir per definisjon det vektede snittet, minus gebyr.<br>2. De andre tre er riktige.<br>Kjennetegn: les «feil» i spørsmålet. Alt som påstår at indeksfondet slår markedet, er galt av aritmetikk. (H2024 12a, k14.6)"
 },
 {
  "id": "fo-fond-02",
  "ch": 14,
  "deck": "aksjesparing og fond",
  "front": "Hvilken påstand om aktive og passive aksjefond er riktig? (aktivitet lønner seg alltid, aktive har høyere kostnader, passive er mer risikable, aktive har lavere avkastning før kostnader)",
  "back": "<b>Aktive fond har som regel høyere forvaltningskostnader</b><br>1. Indeksfond ca. 0,1 til 0,3 % i året, aktive ofte 1 til 2 %, cirka fem ganger mer.<br>2. Berk og DeMarzo: aktive slår gjerne indeks før gebyrer, men ikke etter. Gevinsten går til forvalteren.<br>3. Markedet er snittet av alle: alle kan ikke slå det.<br>Felle: «lavere avkastning før kostnader». (Kursgodkjenning 2026 14, Aksjesparing lb 73 og 76)"
 },
 {
  "id": "fo-fond-03",
  "ch": 14,
  "deck": "aksjesparing og fond",
  "front": "Forbrukerrådet (2018) sammenlignet norske aktive fond med indeks over 20 år. Hva fant de?",
  "back": "<b>Aktive svakere på globale, europeiske og nordiske aksjer, bedre på norske</b><br>Årlig differanseavkastning: globale −0,89, europeiske −1,08, nordiske −3,48, norske +0,86 prosentpoeng.<br>Felle: «dårligere i alle kategorier», «bedre på globale, dårligere på norske», «nordiske slo indeks». (H2025 16, Aksjesparing lb 81)"
 },
 {
  "id": "fo-fond-04",
  "ch": 14,
  "deck": "aksjesparing og fond",
  "front": "300 000 i fond i 30 år. Begge gir 7,0 % før kostnader. Indeksfond koster 0,2 %, aktivt fond 1,7 % i året. Hvor stor andel av indeksfondets sluttverdi taper du med det aktive?",
  "back": "<b>1 − (1,053/1,068)<sup>30</sup> = 34,6 %</b><br>1. Netto avkastning: 6,8 % og 5,3 %.<br>2. Sluttverdier: 2 159 031 og 1 412 448.<br>3. Tap 34,6 %. Startbeløpet faller ut.<br>Felle: 45,0 % (1,5 pp × 30 år), å trekke kostnaden bare én gang. Kostnader rammer renters rente. (prove15 15.1)"
 },
 {
  "id": "fo-fond-05",
  "ch": 14,
  "deck": "aksjesparing og fond",
  "front": "100 000 i 25 år, begge fond gir 6,0 % før kostnader. Indeksfondet koster 0,4 %, det aktive 1,4 %. Hvor mange prosent mer har du i indeksfondet?",
  "back": "<b>(1,056/1,046)<sup>25</sup> − 1 = 27 %</b><br>1. Netto 5,6 % og 4,6 %.<br>2. 390 479 mot 307 817.<br>3. Forholdet minus 1: 26,9 %.<br>Felle: 25 % (1 pp × 25 år), 21 % (tapet målt mot indeksfondet: 1 − 1/1,27). Les om spørsmålet ber om «mer enn» eller «tap av». (prove17 17.1)"
 },
 {
  "id": "fo-fond-06",
  "ch": 14,
  "deck": "aksjesparing og fond",
  "front": "Hva betyr survivorship bias i statistikken over aktive fond?",
  "back": "<b>Dårlige fond legges ned og faller ut, så aktive fond ser bedre ut enn de var</b><br>1. Malkiel (1995): gjør bildet av aktive fond enda verre enn Jensen (1969) fant.<br>2. «De fleste fond som har eksistert i 20 år slo indeks» sier lite: taperne er borte.<br>Felle: snudd retning («ser dårligere ut»), «overlevelse beviser dyktighet», «indeksfond legges oftere ned». (prove16 18, Aksjesparing lb 74)"
 },
 {
  "id": "fo-fond-07",
  "ch": 14,
  "deck": "aksjesparing og fond",
  "front": "Truls vil kjøpe fondet som har slått markedet de siste ti årene. Hva sier forelesningen om persistens?",
  "back": "<b>Fond som slo markedet ett tiår, gjør det sjelden det neste</b><br>1. De 20 beste investorene på 70-tallet gjorde det dobbelt så bra som indeks, men ble slått av markedet på 80-tallet.<br>2. De beste på 80-tallet var under middels på 90-tallet.<br>Felle: «høyt gebyr betyr dyktig forvalter», «overlevde fond er trygge», «nordiske fond slo indeks». (prove18 17, prove8 18, Aksjesparing lb 74 og 75)"
 },
 {
  "id": "fo-fond-08",
  "ch": 14,
  "deck": "aksjesparing og fond",
  "front": "Agnar vil velge et aktivt fond med en stjerneforvalter som har slått markedet. Hva skjer typisk med flinke forvaltere som får ny og bedre jobb?",
  "back": "<b>De gjør det som regel ikke like godt etterpå</b><br>1. Tidligere meravkastning er i stor grad flaks og predikerer lite.<br>2. Kvadsheim: Morningstar gir stjerner på 3 års historikk (10 % får 5 stjerner), som heller ikke sier mye om framtiden.<br>Felle: «aktive tar 0,1 til 0,2 %», «survivorship bias gjør aktive dårligere i statistikken». (prove13 17, Aksjesparing lb 78)"
 },
 {
  "id": "fo-fond-09",
  "ch": 14,
  "deck": "aksjesparing og fond",
  "front": "Hvordan sparer vanlige folk i Norge i fond ifølge forelesningene?",
  "back": "<b>Over halvparten av fondspengene står i aktive fond, som koster ca. fem ganger mer enn indeksfond</b><br>1. Halvparten av nordmenn har aksjefond.<br>2. DN: norske kunder har betalt 34 milliarder for mye i gebyrer.<br>Felle: «under en firedel», «dobbelt så dyre». (prove17 17.2, Psykologi lb 49)"
 },
 {
  "id": "fo-fond-10",
  "ch": 18,
  "deck": "aksjesparing og fond",
  "front": "Ca. 590 norske fondskunder, en tilfeldig halvpart fikk Forbrukerrådets funn om indeksfond. Hva viste eksperimentet?",
  "back": "<b>Indeksandelen steg fra ca. 11 til 15 %. Færre trodde de kunne slå markedet</b><br>1. +4 prosentpoeng, en effekt på ca. 30 %.<br>2. Effekten var like stor to år senere.<br>3. Andelen som trodde de selv kunne slå markedet, falt med 12 %.<br>Felle: «ingen endret porteføljen» (det var home bias-forsøket), «effekten var borte etter to år», «flyttet halvparten». (prove15 15.2, Psykologi lb 51 til 53)"
 },
 {
  "id": "fo-fond-11",
  "ch": 14,
  "deck": "aksjesparing og fond",
  "front": "Hvordan er typisk eksponeringen i et globalt indeksfond (DNB, Nordnet) fordelt på regioner?",
  "back": "<b>Ca. 70 % USA, lite eller ingen Kina, resten andre land</b><br>1. Standardindeksene dekker utviklede markeder.<br>2. Norge er 0,2 % av verdens aksjemarked.<br>3. Et globalt fond er i praksis en stor dollarposisjon.<br>Felle: 40 % USA, eller 20 til 30 % Kina. (H2024 12b, k14.6)"
 },
 {
  "id": "fo-fond-12",
  "ch": 14,
  "deck": "aksjesparing og fond",
  "front": "Iselin satte inn 400 000 på aksjesparekonto og tok senere ut 100 000. Kontoen er nå verdt 650 000. Hun tar ut 450 000. Hvor mye av uttaket er skattepliktig?",
  "back": "<b>150 000 kr: uttak regnes først som tilbakebetaling av innskudd</b><br>1. Gjenværende innskudd: 400 000 − 100 000 = 300 000.<br>2. Skattefritt: 300 000. Skattepliktig: 450 000 − 300 000 = 150 000.<br>3. Skattes med 37,84 % (1,72 × 22 %), etter skjermingsfradrag.<br>Felle: 50 000 (glemt det første uttaket), forholdsmessig fordeling (242 308). (prove7 2, k14.6)"
 },
 {
  "id": "fo-fond-13",
  "ch": 14,
  "deck": "aksjesparing og fond",
  "front": "Didrik vil spare i aksjefond og vurderer IPS og aksjesparekonto (ASK). Hvilket utsagn er riktig?",
  "back": "<b>IPS gir fradrag for innskudd og fritak for formuesskatt, men pengene er bundet til pensjonsalder</b><br>1. ASK: gevinst inne på kontoen er skattefri, uttak over innskudd skattes med 37,84 %. Formuesverdi 80 %, ikke fritak.<br>2. ASK krever aksjefond med over 80 % aksjer, hjemmehørende i EØS.<br>Felle: «ASK gir formuesskattfritak», «skatt ved bytte av fond inne på ASK», «IPS-uttak skattes med 37,84 %» (det er 22 %). (prove15 17.2)"
 },
 {
  "id": "fo-fond-14",
  "ch": 14,
  "deck": "aksjesparing og fond",
  "front": "Boligindeksen steg fra 100 til 273,1 over 13,67 år. Huset kostet 2 197′. Verdi nå og årlig prisvekst (CAGR)?",
  "back": "<b>CAGR = (W<sub>T</sub>/W<sub>0</sub>)<sup>1/T</sup> − 1 = 7,63 %</b><br>1. Verdi: 2 197 × 2,731 = 6 000′.<br>2. 2,731<sup>1/13,67</sup> − 1 = 7,63 %.<br>Felle: 173,1 %/13,67 = 12,7 % (lineært snitt), feil antall år (bruk faktisk tid). Bank: 500 000 til 903 056 på 20 år gir 3,0 %. (H2016 3a, H2022 5.1)"
 },
 {
  "id": "fo-fond-15",
  "ch": 14,
  "deck": "aksjesparing og fond",
  "front": "γ = 3, aksjepremie 5 %, σ = 14 %, risikofri rente 1 %. Forventet porteføljeavkastning? Sparer 36 000 i året i 20 år: sluttverdi?",
  "back": "<b>E(r<sub>p</sub>) = r<sub>f</sub> + w × premie. Sluttverdi = a[(1 + r)<sup>T</sup> − 1]/r</b><br>1. w = 0,05/(3 × 0,0196) = 85,03 %.<br>2. E = 1 + 0,8503 × 5 = 5,2517 %.<br>3. 36 000 × [(1 + r)<sup>20</sup> − 1]/r = 1 222 537.<br>Felle: avrundet rente 5,25 % gir 1 222 316. Ikke bland med nåverdifaktoren [1 − (1 + r)<sup>−T</sup>]/r. (H2021 6e og 6f)"
 },
 {
  "id": "fo-fond-16",
  "ch": 14,
  "deck": "aksjesparing og fond",
  "front": "Verdiaksjer (lav P/E, høy book-to-market) og små selskaper har historisk gitt høyere avkastning (Fama og French 1992). Bør du kjøpe dem?",
  "back": "<b>Ikke nødvendigvis: meravkastningen kan være betaling for risiko som β ikke fanger</b><br>1. Tolkning 1: aksjene er bedre (gode aksjetips).<br>2. Tolkning 2: de er mer risikable. CAPM fanger det ikke. Asness og Liew: billige aksjer er ofte dårlige selskaper.<br>3. Er det risiko, gir de ikke bedre risikojustert avkastning. Rådet står: kjøp globalt indeksfond.<br>Felle: «verdiaksjer slår alltid markedet». (Aksjesparing lb 83 til 91)"
 },
 {
  "id": "fo-fond-17",
  "ch": 14,
  "deck": "aksjesparing og fond",
  "front": "Kvadsheim: hvordan skattes gevinst på rentefond mot aksjefond? Trenger du mange fond for å spre risikoen?",
  "back": "<b>Rentefond 22 %, aksjefond 37,84 %. Ett globalt fond er godt diversifisert</b><br>1. Gevinst på 100 000 gir 22 000 i skatt på rentefond og 37 840 på aksjefond (1,72 × 22 %).<br>2. Aksjefond har skjermingsfradrag og kan ligge på ASK.<br>3. Et globalt indeksfond eier tusenvis av selskaper. Flere globale fond gir lite ekstra spredning.<br>Felle: «legg eggene i mange fond». (Kvadsheim lb 37 og 58 til 60)"
 },
 {
  "id": "fo-fond-18",
  "ch": 14,
  "deck": "aksjesparing og fond",
  "front": "Elling vil investere ansvarlig. Hva er de to hovedalternativene, med fordeler og ulemper?",
  "back": "<b>Utelukkelse (selge seg ut) eller aktivt eierskap (bli og påvirke)</b><br>1. Utelukkelse: enkelt og tydelig. Ulemper: dårligere diversifisering og liten effekt, fordi andre kjøper aksjen billigere.<br>2. Aktivt eierskap: stemme og dialog kan endre selskapet. Ulemper: krever stor eierandel og ressurser. Du eier fortsatt selskapet.<br>Felle: «utelukkelse gir alltid høyere avkastning». (H2021 6d)"
 },
 {
  "id": "fo-lan-01",
  "ch": 16,
  "deck": "lån og sparing",
  "front": "Annuitetslån 400 000, nominell rente 4,99 %, 5 år, én etterskuddsvis betaling i året. Hva er årlig terminbeløp?",
  "back": "<b>A = L × r/(1 − (1 + r)<sup>−n</sup>) = 92 364</b><br>1. Teller: 400 000 × 0,0499 = 19 960.<br>2. Nevner: 1 − 1,0499<sup>−5</sup> = 0,2161.<br>3. A = 92 364. Rentesum 5A − L = 61 822.<br>Felle: 80 000 (bare avdrag, nedre grense), 101 815. (H2022 6.1)"
 },
 {
  "id": "fo-lan-02",
  "ch": 16,
  "deck": "lån og sparing",
  "front": "Samme lån (400 000, 4,99 %, 5 år, A = 92 364). Etableringsgebyr 5 990, termingebyr 1 020 per år. Effektiv rente?",
  "back": "<b>Internrenten i kontantstrømmen = 5,94 %</b><br>1. År 0: 400 000 − 5 990 = 394 010 inn.<br>2. År 1 til 5: 92 364 + 1 020 = 93 384 ut.<br>3. Prøv alternativene: ved 5,94 % er annuitetsfaktoren 4,2192 og 394 010/4,2192 = 93 384.<br>Felle: 4,99 % (nominell), bare termingebyr 5,39 %, bare etableringsgebyr 5,54 %. (H2022 6.2)"
 },
 {
  "id": "fo-lan-03",
  "ch": 16,
  "deck": "lån og sparing",
  "front": "Samme billån (400 000, A = 92 364 i 5 år, etableringsgebyr 5 990, termingebyr 1 020). Hva er kredittkostnaden?",
  "back": "<b>Alle betalinger og gebyrer minus lånebeløpet, udiskontert = 72 912</b><br>1. 5 × 92 364 + 5 × 1 020 + 5 990 = 472 912.<br>2. Minus 400 000 = 72 912. Regnet med A = 92 364,38 uavrundet.<br>3. Kontroll: renter 61 822 + gebyrer 11 090.<br>Felle: 472 912 (lånet ikke trukket fra), 61 822 (bare renter), 5 100 (bare termingebyr). (H2022 6.3)"
 },
 {
  "id": "fo-lan-04",
  "ch": 16,
  "deck": "lån og sparing",
  "front": "Annuitetslån 2 400 000 over 20 år, rente 4 %, én betaling i året. Hvor mye av første terminbeløp er avdrag?",
  "back": "<b>Avdrag<sub>1</sub> = A − L × r = 80 596</b><br>1. A = 176 596.<br>2. Rente i termin 1: 2 400 000 × 4 % = 96 000.<br>3. Avdrag = 176 596 − 96 000 = 80 596.<br>Felle: 120 000 (serielånets avdrag L/n), 96 000 (renten), 176 596 (hele terminen). (prove13 18)"
 },
 {
  "id": "fo-lan-05",
  "ch": 16,
  "deck": "lån og sparing",
  "front": "Serielån 3 000 000, 5 %, 300 månedlige terminer. Første terminbeløp og samlet rentesum? Sammenlign med annuitetslån.",
  "back": "<b>Avdrag = L/n. Rentesum = m × L × (n + 1)/2</b><br>1. Avdrag 10 000, første termin 10 000 + 12 500 = 22 500.<br>2. Rentesum 12 500 × 301/2 = 1 881 250.<br>3. Annuitet: 2 261 310 i renter, altså 380 060 mer. Prisen er tyngre start.<br>Felle: renter av hele lånet i alle terminer (3 750 000). (k16.2)"
 },
 {
  "id": "fo-lan-06",
  "ch": 16,
  "deck": "lån og sparing",
  "front": "Kredittkortgjeld med 1,5 % rente per måned, renten legges til hver måned. Effektiv årlig rente?",
  "back": "<b>r<sub>eff</sub> = (1 + m)<sup>12</sup> − 1 = 19,56 %</b><br>1. 1,015<sup>12</sup> = 1,1956.<br>2. Minus 1: 19,56 %.<br>3. Nominelt 18 %, men renten forrentes hver måned.<br>Felle: 18,00 % (12 × 1,5), 70,91 % (forrentet over tre år, ikke årlig). (prove14 15)"
 },
 {
  "id": "fo-lan-07",
  "ch": 16,
  "deck": "lån og sparing",
  "front": "Hvilken påstand om avdragsfrihet er riktig? (likviditetsproblemer, rentefritt lån fra banken, staten betaler avdragene, samme kostnad så bare irrasjonelle ber om det)",
  "back": "<b>Det kan være lurt ved midlertidige likviditetsproblemer</b><br>1. Du betaler bare renter. Lånet krymper ikke. Du betaler mer renter i kroner.<br>2. Likviditet nå er billigere enn forbrukslån eller kredittkort.<br>Felle: «rentefritt lån fra banken» (motsatt), «staten betaler avdragene» (staten dekker bare 22 % av rentene), «samme kostnad, så bare irrasjonelle» (likviditet har verdi). (H2024 14, k16.6)"
 },
 {
  "id": "fo-lan-08",
  "ch": 16,
  "deck": "lån og sparing",
  "front": "Serielån 2 400 000, 5 %, 120 000 i avdrag per år. Avdragsfrihet i år 1. Rentefradrag 22 %. Hvor mye høyere blir rentekostnaden etter skatt i år 2?",
  "back": "<b>Δ restgjeld × r × (1 − 0,22) = 4 680</b><br>1. Gjelden er 120 000 høyere inn i år 2.<br>2. Ekstra rente 120 000 × 5 % = 6 000.<br>3. Etter skatt: 6 000 × 0,78 = 4 680.<br>Felle: 6 000 (glemt fradraget), 120 000 (avdraget), 93 600. Fradraget gjelder renter, aldri avdrag. (prove18 18)"
 },
 {
  "id": "fo-lan-09",
  "ch": 16,
  "deck": "lån og sparing",
  "front": "Didrik tjener 680 000 og har 450 000 i egenkapital, 260 000 i studielån og 140 000 i billån. Krav: gjeld høyst 5 × inntekt og minst 10 % egenkapital. Høyeste boligpris?",
  "back": "<b>Det strengeste kravet binder: 3 450 000 kr</b><br>1. Gjeldsgrad: 5 × 680 000 = 3 400 000 minus 400 000 eksisterende gjeld = 3 000 000 nytt lån.<br>2. Pris = lån + egenkapital = 3 450 000.<br>3. Egenkapitalkravet: 450 000/0,10 = 4 500 000, binder ikke.<br>Felle: 3 850 000 (glemt billånet), 4 500 000, 3 000 000 (glemt egenkapitalen). (prove15 17.1, Kvadsheim lb 13)"
 },
 {
  "id": "fo-lan-10",
  "ch": 16,
  "deck": "lån og sparing",
  "front": "Bruttolønn 650 000, 60 % går til skatt, konsum og studielån. Stresstest: rente 3 % + 5 pp, annuitetslån over 30 år. Maksimalt lån?",
  "back": "<b>L<sub>maks</sub> = disponibelt × [1 − (1 + r)<sup>−30</sup>]/r = 2 927 024</b><br>1. Disponibelt 650 000 × 40 % = 260 000.<br>2. Stresset rente 8 %, faktor 11,2578.<br>3. Bindende krav er det laveste av dette og femgangeren.<br>Felle: 25 års løpetid gir 2 775 442. Uten påslag (3 %) gir 5 096 115. Dagens forskrift: +3 pp og minst 7 %. Bruk oppgavens påslag. (H2021 5, k16.5)"
 },
 {
  "id": "fo-lan-11",
  "ch": 16,
  "deck": "lån og sparing",
  "front": "Lån 3 mill., rente 4 %. Bruttoinntekt 650 000, skatt 20 %. Gjeldsbelastningen er definert som gjeld delt på inntekt etter skatt og renter. Hva blir den?",
  "back": "<b>Gjeld/(inntekt − skatt − renter) = 7,5</b><br>1. Etter skatt: 650 000 × 0,8 = 520 000.<br>2. Renter: 3 000 000 × 4 % = 120 000, igjen 400 000.<br>3. 3 000 000/400 000 = 7,5.<br>Felle: 4,6 (bruttoinntekt), 5,8 (netto før renter). Les nevneren oppgaven definerer. (H2019 8a)"
 },
 {
  "id": "fo-lan-12",
  "ch": 16,
  "deck": "lån og sparing",
  "front": "Silje har lånt maksimalt og har ingen buffer, Amund har lav belåning og god buffer. Fastrenten ligger litt over flytende. Hvem bør binde renten?",
  "back": "<b>Fast rente er en forsikring mot renteøkning, mest verdt for Silje</b><br>1. Fastrenten inneholder en premie og er i snitt litt dyrere.<br>2. Den er verdt det for den som tåler en renteøkning dårligst.<br>3. Flytende gir høyest forventet nytte for mange, men det varierer fra person til person.<br>Felle: «fast rente er et veddemål», «alltid billigst», «bind når ekspertene sier det». (prove7 15, H2019 8b)"
 },
 {
  "id": "fo-lan-13",
  "ch": 16,
  "deck": "lån og sparing",
  "front": "Aslak har kredittkortgjeld 24 %, billån 7 %, boliglån 5 % og studielån 5 %. I hvilken rekkefølge bør arven betale ned gjeld?",
  "back": "<b>Høyest rente først: kredittkort, billån, boliglån, studielån sist</b><br>1. Lån flytter penger over tid. Det skal gjøres billigst mulig.<br>2. Studielånet sist: slettes ved dødsfall og har rentefritak ved sykdom.<br>3. Eneste unntak: ulike konsekvenser ved mislighold.<br>Felle: snøballmetoden (minste først) er et atferdsargument, lik andel på hvert lån. (prove12 18.1, Lån lb 13 til 15)"
 },
 {
  "id": "fo-lan-14",
  "ch": 18,
  "deck": "lån og sparing",
  "front": "Martin sparer 500 000 i 20 år. Bank gir 903 056. Aksjer gir 2 330 479 (40 %) eller 333 804 (60 %). U = ln W. Forventet sluttverdi for aksjer? Hva velger han?",
  "back": "<b>Sammenlign forventet nytte, ikke forventet sluttverdi</b><br>1. E[W aksjer] = 0,4 × 2 330 479 + 0,6 × 333 804 = 1 132 474.<br>2. Bank: ln 903 056 = 13,714. Aksjer: 0,4 ln 2 330 479 + 0,6 ln 333 804 = 13,496.<br>3. 13,714 er høyest: bank, selv om aksjer har høyest forventning.<br>Felle: alternativene bytter om tallene 13,714/13,496/13,690. Les hvilke to som sammenlignes. (H2022 5.2 og 5.3)"
 },
 {
  "id": "fo-lan-15",
  "ch": 18,
  "deck": "lån og sparing",
  "front": "Samme Martin, men han tror nå at gode og dårlige tider har 50 % sannsynlighet hver (subjektive sannsynligheter). Hva skjer med sluttverdiene og valget?",
  "back": "<b>Sluttverdiene er uendret. Bare forventet nytte endres</b><br>1. Aksjer: 0,5 ln 2 330 479 + 0,5 ln 333 804 = 13,690.<br>2. Bank fortsatt 13,714: velger fortsatt bank.<br>3. Grensen for valget er den p som gjør nyttene like.<br>Felle: alternativer der sluttverdiene endres (lesefelle i 5.4). 13,690 tilskrevet banken. (H2022 5.4 og 5.5)"
 },
 {
  "id": "fo-lan-16",
  "ch": 18,
  "deck": "lån og sparing",
  "front": "Samme Martin, med tapsaversjon: nytten i utfall under referansepunktet (innskuddet) ganges med 1/1,03. Sannsynlighet 40/60. Hva blir aksjenytten?",
  "back": "<b>Bare utfall under referansepunktet nedvektes: 13,273</b><br>1. 333 804 er under 500 000: ln 333 804 × 1/1,03.<br>2. 0,4 ln 2 330 479 + 0,6 × ln 333 804/1,03 = 13,273.<br>3. Bank 13,714 berøres ikke (over referansepunktet). Bank vinner klarere.<br>Felle: alle fire alternativer sier «bank». Velg det med riktig par: 13,714 mot 13,273. (H2022 5.6)"
 },
 {
  "id": "fo-lan-17",
  "ch": 16,
  "deck": "lån og sparing",
  "front": "Kvadsheim: fondsindeksen ga 8,93 % i året 1994 til 2018, men sparerne fikk bare 6,6 %. Hva vokste 100 kr til? Hvorfor er det slik?",
  "back": "<b>Selg lavt, kjøp høyt: sparerne timer markedet feil</b><br>1. 100 × 1,0893<sup>24</sup> = 779 kr. 100 × 1,066<sup>24</sup> = 464 kr.<br>2. Sparerne kjøper etter oppgang og selger etter fall.<br>3. Råd: «time in the market beats timing the market».<br>Variant: 9,0 % mot 6,5 % i 25 år på 100 000 gir 380 000 kr i forskjell. (Kvadsheim lb 27 og 34, prove12 18.2)"
 },
 {
  "id": "fo-lan-18",
  "ch": 16,
  "deck": "lån og sparing",
  "front": "Kvadsheim: hva er rekkefølgen for privatøkonomien? Hva sjekker banken før boliglån?",
  "back": "<b>Først buffer, så dyre lån ned, så fondssparing</b><br>1. Bufferkonto: 1 til 2 månedslønner på egen konto uten kort.<br>2. Betal ned dyre lån.<br>3. Spar i fond: finn sparemål og risikovilje, lur deg selv (automatisk), ASK eller IPS.<br>Banken sjekker: sikkerhet (10 % egenkapital), betalingsevne (maks 5 × inntekt) og betalingsvilje (ingen betalingsanmerkninger). (Kvadsheim lb 13, 23 og 27)"
 },
 {
  "id": "fo-lan-19",
  "ch": 16,
  "deck": "lån og sparing",
  "front": "Hvorfor er renten på boliglån lav og på forbrukslån høy? Kan et payday-lån til 260 til 1 000 % i året være rasjonelt?",
  "back": "<b>Renten speiler bankens risiko: pant gir lav rente</b><br>1. Boliglån har pant i boligen. Forbrukslån har ingen sikkerhet, så renten blir høy.<br>2. Den som mangler billige alternativer og trenger penger nå, kan rasjonelt ta svært dyre lån. I Norge finnes som regel alternativer.<br>3. Kredittkort: forsikringer og fordeler, men dyrt om du ikke betaler hele beløpet hver måned.<br>Felle: «høy rente er alltid irrasjonelt». (Lån lb 5 til 12)"
 },
 {
  "id": "fo-lan-20",
  "ch": 16,
  "deck": "lån og sparing",
  "front": "Bør det være lov å sette så høy rente man vil? Hvorfor er boliglån strengere regulert enn forbrukslån?",
  "back": "<b>Standard teori: ikke regulere frivillige avtaler med full informasjon og uten eksternaliteter</b><br>1. Regulering kan forsvares når låntakerne er desperate eller ikke forstår hva de gjør.<br>2. Risikable prosjekter bør betale høy rente, ellers feilallokeres kapital.<br>3. Boliglånsforskriften begrunnes med systemrisiko, ikke forbrukerbeskyttelse: forbrukslån til høy rente er lov.<br>Felle: «reguleringen beskytter den enkelte». (Lån lb 24 til 27, k16.5)"
 },
 {
  "id": "fo-psyk-01",
  "ch": 18,
  "deck": "finansiell psykologi",
  "front": "Sunniva ser en uke med nyheter om folk som tapte sparepengene i et krakk i et annet land. Hun anslår 40 % sjanse for at fondet halveres. Hun selger alt. Hvilken skjevhet?",
  "back": "<b>Tilgjengelighetsbias</b><br>Kjennetegn: overvurderer sannsynligheten for noe fordi det er nylig, levende eller lett å komme på.<br>Ikke anker (et bestemt tall styrer), ikke bekreftelse (leter etter støtte for egen mening), ikke disposisjon (kjøpskurs styrer salget). (prove12 19, Psykologi lb 16)"
 },
 {
  "id": "fo-psyk-02",
  "ch": 18,
  "deck": "finansiell psykologi",
  "front": "Megleren nevner at kursen var 400 kr for et år siden. Nå er den 180. Lydia synes aksjen er billig og kjøper uten å se på inntjening og utsikter. Hvilken skjevhet?",
  "back": "<b>Ankereffekt (forankring)</b><br>Kjennetegn: det første tallet du ser, blir målestokken. Kjøpskurs og prisantydning leses som «riktig» pris.<br>Ikke disposisjonseffekten: den gjelder salg av egne aksjer ut fra egen kjøpskurs. Motgift: automatisk månedlig sparing. (prove17 18, Psykologi lb 16)"
 },
 {
  "id": "fo-psyk-03",
  "ch": 18,
  "deck": "finansiell psykologi",
  "front": "Alfhild eier en hydrogenaksje. Hun leser alle analyser som anbefaler kjøp, men hopper over artikler om problemer i selskapet. Hvilken skjevhet?",
  "back": "<b>Bekreftelsesbias</b><br>Kjennetegn: søker og vekter informasjon som bekrefter det du allerede tror.<br>Ikke overkonfidens (tro på egne evner, viser seg i hyppig handel), ikke flokk (følger andre), ikke anker (ett tall). (prove15 18, Psykologi lb 16)"
 },
 {
  "id": "fo-psyk-04",
  "ch": 18,
  "deck": "finansiell psykologi",
  "front": "Investoren selger aksjene som har steget og beholder dem som har falt «til de tar seg opp igjen». Hva heter dette? Hvorfor er det dyrt med norsk skatt?",
  "back": "<b>Disposisjonseffekten</b><br>1. Kjøpskursen blir referansepunkt. Å realisere tap gjør vondt (tapsaversjon). Kjøpskursen er sunk cost.<br>2. Gevinst skattes nå, tapsfradraget utsettes. Selge gevinst 60 000 mot tap 60 000: 45 408 kr forskjell i skatt i år (120 000 × 37,84 %).<br>Kjennetegn: handler om egne posisjoner og egen kjøpskurs. (Psykologi lb 27, k18.3)"
 },
 {
  "id": "fo-psyk-05",
  "ch": 18,
  "deck": "finansiell psykologi",
  "front": "Stian er sikker på at han plukker vinneraksjer. Han gjør 50 handler i måneden til 79 kr i kurtasje. Hvilken skjevhet? Hva koster det i året?",
  "back": "<b>Overkonfidens: 79 × 50 × 12 = 47 400 kr</b><br>1. Better-than-average: 93 % av amerikanske bilførere og 94 % av professorer tror de er bedre enn snittet.<br>2. Markedet er et nullspill før kostnader, så kurtasjen er rent tap. Forelesningen: 3 600 handler gir 284 400 kr.<br>Felle: 94 800 (dobbelttelt), flokkatferd. (prove4 18, Psykologi lb 21 til 25)"
 },
 {
  "id": "fo-psyk-06",
  "ch": 18,
  "deck": "finansiell psykologi",
  "front": "Ola er oljeingeniør i Stavanger og har nesten hele porteføljen i norske oljeserviceaksjer fordi han «kjenner bransjen». Hvilken skjevhet? Hva er problemet?",
  "back": "<b>Hjemmebias: porteføljen faller gjerne samtidig som jobben er truet</b><br>1. Humankapitalen er allerede en stor posisjon i samme bransje.<br>2. Kan være bias (50-50-heuristikk, tilgjengelighet) eller preferanse (tilhørighet).<br>3. Forsøk: folk forsto at Norge-tung portefølje er risikabel, men endret den ikke.<br>Felle: «norske aksjer har høyere standardavvik», overkonfidens. (prove6 18, prove11 15, Psykologi lb 56 til 58)"
 },
 {
  "id": "fo-psyk-07",
  "ch": 18,
  "deck": "finansiell psykologi",
  "front": "I en pensjonsordning stiger aksjeandelen jo flere aksjefond som tilbys. Hvilken irrasjonell atferd skyldes det mest sannsynlig?",
  "back": "<b>Menyeffekt</b><br>1. Valget styres av hvordan menyen ser ut, ikke av kvalitet: det som står øverst på listen, velges oftere.<br>2. Beslektet: 1/N-regelen, å fordele likt på alternativene som tilbys.<br>Felle: tapsaversjon, preferanse for det kjente (hjemmebias), overkonfidens. (Kursgodkjenning 2026 16, Psykologi lb 30)"
 },
 {
  "id": "fo-psyk-08",
  "ch": 18,
  "deck": "finansiell psykologi",
  "front": "Sara har 60 000 på en konto kalt «feriepenger» til 3 % og 50 000 i kredittkortgjeld til 21 %. Hun rører ikke feriepengene. Skjevhet og kostnad i året?",
  "back": "<b>Mentalt regnskap: 50 000 × (21 % − 3 %) = 9 000 kr</b><br>1. Penger merkes etter kilde og formål i stedet for å telles som én formue.<br>2. Ved nedbetaling sparer hun 10 500 i rente, men taper 1 500 i innskuddsrente.<br>3. Debt puzzle: 30 % av amerikanske husholdninger har kredittkortgjeld og sparepenger samtidig.<br>Felle: 10 500 (glemt tapt innskuddsrente), overkonfidens. (prove2 15, Lån lb 18 og 19)"
 },
 {
  "id": "fo-psyk-09",
  "ch": 18,
  "deck": "finansiell psykologi",
  "front": "50 000 i kredittkortgjeld til 20 % rente, ingenting betales på ti år. Hvor stor er gjelden? Hvilken skjevhet får folk til å gjette for lavt?",
  "back": "<b>Eksponentiell vekst-bias: 50 000 × 1,2<sup>10</sup> = 309 587</b><br>1. Intuisjonen regner lineært: 50 000 + 10 × 10 000 = 150 000.<br>2. Riktig er 2,06 ganger så mye.<br>3. Forelesningen: 1 krone til 1 % daglig rente i ti år blir ca. 6 millioner milliarder.<br>Felle: 600 000 (50 000 × 1,2 × 10). Stango og Zinman (2009). (Lån lb 21, k18.4)"
 },
 {
  "id": "fo-psyk-10",
  "ch": 18,
  "deck": "finansiell psykologi",
  "front": "Viktor har god råd. Myntkast: kron gir 1 500 kr, mynt koster 1 000 kr. Han vet at det lønner seg i snitt, men takker nei. Hvilken skjevhet?",
  "back": "<b>Tapsaversjon</b><br>1. Et tap veier tyngre enn en like stor gevinst, målt fra et referansepunkt.<br>2. For så små beløp er nyttefunksjonen nær lineær, så risikoaversjon forklarer ikke et nei.<br>3. Prospektteori: konkav for gevinst, konveks for tap, brattere for tap rundt referansepunktet.<br>Felle: overkonfidens, tilgjengelighet. (prove18 19, Psykologi lb 28)"
 },
 {
  "id": "fo-psyk-11",
  "ch": 18,
  "deck": "finansiell psykologi",
  "front": "Hvilke tre egenskaper har prospektteoriens verdifunksjon (Kahneman og Tversky)?",
  "back": "<b>Referansepunkt, tapsaversjon og avtakende følsomhet</b><br>1. Nytten måles som gevinst og tap fra startformuen, ikke som formuesnivå.<br>2. Brattere for tap enn for gevinst rundt referansepunktet.<br>3. Konkav for gevinst, konveks for tap. Folk legger også stor vekt på hendelser med lav sannsynlighet.<br>Konveks tapsgren forklarer at det føles billigere å risikere mer tap enn å realisere. (H2019 9h, Psykologi lb 28)"
 },
 {
  "id": "fo-psyk-12",
  "ch": 18,
  "deck": "finansiell psykologi",
  "front": "Norwegian-aksjen sto i ca. 60 kr i januar 2021 mens emisjon til 6 til 10 kr var varslet. Kursen falt ikke på flere dager. Over halvparten av eierne trodde på oppgang. Forklaring?",
  "back": "<b>Flokkatferd. Feilprisingen varte fordi aksjen var vanskelig å shorte</b><br>1. Flokk: følge mengden uten egen analyse. Gir bobler og krakk (dotcom, krypto).<br>2. Meglerhus nektet å låne ut aksjer, så rasjonelle investorer kunne ikke presse prisen ned.<br>3. Først etter en ekspertvideo solgte 21 % dagen etter.<br>Felle: «markedet priset alt riktig», «tapsaverse eiere solgte raskt». (prove8 17, prove9 17, Psykologi lb 36)"
 },
 {
  "id": "fo-psyk-13",
  "ch": 18,
  "deck": "finansiell psykologi",
  "front": "Mikkel finansierer forbruk med kredittkort til 22 % i stedet for å betale ned. Hvilken forklaring gir pensum på at mange gjør slik?",
  "back": "<b>Present bias (nåtidsskjevhet)</b><br>1. Folk legger for mye vekt på nå framfor senere: all framtidig nytte vektes med en ekstra faktor under 1.<br>2. De med present bias har oftere kredittgjeld. Kredittkortselskapene kan utnytte det.<br>3. Ausubel: folk velger lav startrente og høy rente senere.<br>Felle: rasjonell konsumutjevning, tapsaversjon. (prove9 17, Lån lb 20 og 23)"
 },
 {
  "id": "fo-psyk-14",
  "ch": 18,
  "deck": "finansiell psykologi",
  "front": "Ti rådgivere vurderer de samme lånesøknadene. I snitt treffer de, men to rådgivere gir ofte samme søker svært ulik rente. Bias eller støy? Hva hjelper?",
  "back": "<b>Støy, som dempes med faste skjemaer eller enkle modeller</b><br>1. Bias: systematisk feil i én retning. Rettes med en regel som peker motsatt vei.<br>2. Støy: feil uten retning. Kahneman: ledelsen ventet 10 % uenighet om forsikringspremier, fant ca. 50 % (700 mot 1 250).<br>Felle: «spredning spiller ingen rolle når snittet treffer», «forsvinner med erfaring». (prove7 17, Psykologi lb 8 til 12)"
 },
 {
  "id": "fo-psyk-15",
  "ch": 18,
  "deck": "finansiell psykologi",
  "front": "Arbeidsgiveren melder alle nyansatte automatisk inn i en frivillig pensjonsspareordning. De kan melde seg ut gratis. Hva er dette? Virker det?",
  "back": "<b>Dulting (nudging) via standardvalg: det virker</b><br>1. Valgfrihet og insentiver er uendret, bare standardvalget er nytt.<br>2. Automatisk innmelding gir ca. 50 % større sjanse for å spare til pensjon (Thaler og Sunstein).<br>3. Generell finansundervisning forklarer bare ca. 0,1 % av atferden (Fernandes mfl. 2014). Konkrete råd virker bedre.<br>Felle: «er tvang», «virker bare med økt innskudd». (prove9 17, Psykologi lb 46 og 61)"
 },
 {
  "id": "fo-psyk-16",
  "ch": 18,
  "deck": "finansiell psykologi",
  "front": "Vetle har 300 000 på sparekonto og sier han er for risikoavers til å eie aksjer. Under halvparten eier aksjer i nesten alle land. Hva er pensums forklaring?",
  "back": "<b>Risikoaversjon alene forklarer det ikke. Hindringen er faste kostnader, manglende kunnskap og treghet</b><br>1. For små beløp er nytten nær lineær: de første kronene i aksjer gir positiv premie nesten uten nyttekostnad.<br>2. Derfor virker standardvalg så godt.<br>Felle: «risikoaverse bør ikke eie aksjer», «aksjer har lavere forventet avkastning enn bank». (prove8 17, Psykologi lb 18)"
 },
 {
  "id": "fo-psyk-17",
  "ch": 18,
  "deck": "finansiell psykologi",
  "front": "Du har 100 000 og spør banken om du bør betale ned boliglånet eller kjøpe et aktivt aksjefond. Hva bør du ha i bakhodet? Hvor mye kan folk om finans?",
  "back": "<b>Banken er ikke uavhengig: nedbetaling gir den null produkter, et aktivt fond gir to</b><br>1. Det kan forklare at banker sjelden anbefaler nedbetaling som sparing.<br>2. «Big 3»-spørsmålene (rente, inflasjon, diversifisering): folk kan lite om finans.<br>3. Generell undervisning virker lite (0,1 % av atferden). Konkrete råd i konkrete situasjoner virker bedre.<br>Felle: «bankrådgiveren gir nøytrale råd». (Psykologi lb 40 til 44 og 47)"
 },
 {
  "id": "fo-psyk-18",
  "ch": 18,
  "deck": "finansiell psykologi",
  "front": "Påvirker følelser aksjemarkedet? Hva viser studiene om vær og fotball?",
  "back": "<b>Ja: dårlig vær og tap i viktige fotballkamper gir lavere avkastning</b><br>1. Hirshleifer og Shumway (2003): dårlig vær henger sammen med lavere avkastning.<br>2. Edmans mfl. (2007): tap i en viktig fotballkamp gir 0,2 % lavere avkastning.<br>3. Humøret påvirker priser selv om fundamentale verdier er uendret.<br>Felle: «effisiente markeder gjør at følelser ikke slår ut». (Psykologi lb 37)"
 }
];

/* ---------- aktiv læring ---------- */
window.EDU_DATA.activeLearning = {};

/* ---------- ordliste ----------
   Symbolene brukes av søket og av lynspillet «Match formelen». */
window.EDU_DATA.glossary = { economists: [], symbols: [] };
