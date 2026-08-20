/* ===================== FIE402 CORPORATE FINANCE · FAGDATA =====================
   Innholdet er på engelsk fordi eksamen skrives og besvares på engelsk. Appen
   rundt er norsk — se hjernen, 20 Fag/FIE402 Corporate Finance.

   Pensumteksten står IKKE her. Den parses fra FIE402_Manual.html.
   Studieplanen er modulbasert (plan.mode = "modules"): «i dag» er første
   ufullførte modul, ikke en dato.
   ============================================================================= */
window.EDU_DATA = window.EDU_DATA || {};

/* ===================== FIE402 · STUDIEPLAN =====================
   24 moduler, fremdriftsstyrt (mode: "modules") — ingen datoer.
   «I dag» = første ufullførte modul. Modul 1–20 dekker kapittel k0–k29
   i rekkefølge; modul 21–24 er ren eksamenstrening på ekte sett.
   ================================================================ */

window.EDU_DATA.plan = {
  mode: "modules",
  totalDays: 25,
  startDate: "2026-08-19",
  phaseColors: { "Grunnlag": "slate", "Kapitalstruktur": "teal", "Informasjon og utbytte": "green", "Verdsetting med gjeld": "indigo", "Opsjoner": "amber", "M&A og governance": "rose", "Eksamenshåndverk": "slate", "Eksamenstrening · tema": "teal", "Eksamenstrening · hele sett": "amber", "Generalprøve": "rose" },
  days: [
    { day: 1,
      phase: "Grunnlag",
      title: "Eksamens-DNA og time value: slik gjøres arbeid om til poeng",
      chapters: [0, 1],
      estMinutes: 125,
      goals: ["Gjøre rede for eksamensformatet — 6 oppgaver, 100 poeng, 3 timer — og regne ut ditt eget poengbudsjett på ca. 1,8 minutter per poeng", "Skrive et svar etter malen: oppgi metoden, vis utregningen, navngi mekanismen, kjør consistency check", "Ramse opp de fem consistency checks og vite når hver av dem brukes", "Diskontere perpetuities, growing perpetuities og annuities uten å slå opp", "Begrunne hvorfor NPV-regelen slår IRR og payback"],
      keyConcepts: ["NPV rule", "Perpetuity", "Growing perpetuity", "Annuity", "Consistency checks", "Point budget"],
      review: [],
      examFocus: null,
      pastExam: null,
      milestone: "Eksamensformatet og de fem consistency checks sitter",
      tip: "Skriv poengbudsjettet ditt — 1,8 minutter per poeng — på et ark og heng det over pulten i dag." },
    { day: 2,
      phase: "Grunnlag",
      title: "Free cash flow og CAPM: de to inngangsverdiene alt annet hviler på",
      chapters: [2, 3],
      estMinutes: 225,
      goals: ["Bygge FCF fra EBIT: skatt, depreciation add-back, CapEx og ΔNWC", "Forklare hvorfor renter aldri inngår i FCF", "Håndtere NWC som prosent av salg, og en inventory reduction som positiv effekt", "Lese beta av en comparable og bruke CAPM til å gå fra beta til avkastningskrav", "Skille systematisk fra diversifiserbar risiko og plassere et selskap på security market line"],
      keyConcepts: ["Free cash flow", "ΔNWC", "Terminal value with growth", "Systematic vs diversifiable risk", "CAPM", "Security market line"],
      review: [1],
      examFocus: "FCF og avkastningskrav",
      pastExam: { exam: "2021", task: "P3", topic: "FCF bygget fra prognoser" },
      milestone: "Inngangsverdiene til all verdsetting på plass",
      tip: "Bygg FCF for ett tallcase i dag og skriv én setning per linje om hvorfor linjen er der." },
    { day: 3,
      phase: "Grunnlag",
      title: "Unlever og relever: twin firm-rutinen, kursets mest eksaminerte ferdighet",
      chapters: [4],
      estMinutes: 120,
      goals: ["Kjøre twin firm-rutinen i seks steg: comparable rE → βE via CAPM → βU ved vekting → rU → relever til egen D/E → rE → WACC", "Bruke pre-tax WACC = rU og skille den skarpt fra after-tax WACC", "Håndtere non-zero debt beta i vektingen i stedet for å anta βD = 0", "Kontrollere arbeidet ved å vise at vektet snitt av βE og βD gir βU tilbake"],
      keyConcepts: ["Unlevered beta", "rE = rU + (D/E)(rU − rD)", "Pre-tax WACC", "After-tax WACC", "Twin firm routine", "Debt beta"],
      review: [1, 3],
      examFocus: "Twin firm → rU → rE → WACC",
      pastExam: { exam: "H2024", task: "Oppgave 5", topic: "Twin firm → rU → rE → WACC → verdi ved WACC og APV" },
      milestone: "Twin firm-rutinen kan kjøres uten notater",
      tip: "Kjør rutinen på tre ulike tallsett i dag, og skriv de seks stegene ned fra minnet før du starter på hvert av dem." },
    { day: 4,
      phase: "Grunnlag",
      title: "Gjeld, yield og credit spread: lovet mot forventet avkastning",
      chapters: [5],
      estMinutes: 115,
      goals: ["Regne YTM på zero-coupon og coupon bonds", "Skille promised yield fra expected return og bruke rD = y − p·L", "Utlede default probability og credit spread fra prisen på gjelden", "Begrunne hvorfor rD i WACC-formelen er expected return, ikke YTM"],
      keyConcepts: ["Yield to maturity", "Promised vs expected return", "Default probability", "Credit spread", "rD = y − p·L"],
      review: [2, 4],
      examFocus: "Credit risk",
      pastExam: { exam: "V2024", task: "P3", topic: "Credit spread og forventet avkastning på risky debt" },
      milestone: "Credit-spread-verktøyet klart — grunnlaget for k24",
      tip: "Regn rD både som YTM og som expected return på samme obligasjon i dag, og forklar avviket med én setning." },
    { day: 5,
      phase: "Kapitalstruktur",
      title: "MM I og II i perfekte markeder — og recapitalisation steg for steg",
      chapters: [6],
      estMinutes: 85,
      goals: ["Gjengi MM-forutsetningene og forklare hva hver enkelt av dem gjør i beviset", "Føre arbitrageargumentet for Proposition I og utlede Proposition II", "Gjennomføre en recapitalisation: utstede debt, kjøpe tilbake aksjer, vise at antall tilbakekjøpte aksjer = D/P og at kursen er uendret", "Skille announcement fra execution og regne ex-dividend price", "Sammenligne payoff for en aksjonær som solgte med en som holdt"],
      keyConcepts: ["MM Proposition I", "MM Proposition II", "Homemade leverage", "Recapitalisation", "Shares repurchased = D/P", "Ex-dividend price"],
      review: [3, 5],
      examFocus: "MM uten skatt og recapitalisation",
      pastExam: { exam: "H2025", task: "Oppgave 3", topic: "MM uten skatt, dividends og recapitalisation — 18 poeng" },
      milestone: "Recapitalisation-mekanikken komplett — 18 poeng som går igjen hvert år",
      tip: "Regn gjennom H2024 Exercise 3 og H2025 Exercise 3 side ved side i dag; de spør om det samme med ulike ord." },
    { day: 6,
      phase: "Kapitalstruktur",
      title: "Tax shield, financial distress og trade-off-teorien",
      chapters: [7, 8],
      estMinutes: 140,
      goals: ["Regne TS = τc·rD·D og V^L = V^U + PV(TS), inkludert permanent-debt-tilfellet V^L = V^U + τc·D", "Vise hvem som fanger gevinsten, og hvorfor kursen hopper allerede ved announcement", "Håndtere one-year tax shield-tilfellet uten å gjøre det om til en evighet", "Skille direkte fra indirekte distress costs og forklare hvorfor de er priset inn i dag", "Tegne trade-off-kurven og peke ut optimal leverage"],
      keyConcepts: ["Interest tax shield", "V^L = V^U + PV(TS)", "Permanent debt", "Effective tax advantage", "Distress costs", "Trade-off theory"],
      review: [4, 6],
      examFocus: "Tax shield",
      pastExam: { exam: "2022", task: "P1", topic: "Tax shield og verdi med leverage" },
      milestone: "Skatt og distress er inne i kapitalstrukturbildet",
      tip: "Lær V^L = V^U + PV(TS) utenat i dag — den står ikke på formelarket du får utdelt." },
    { day: 7,
      phase: "Kapitalstruktur",
      title: "Agency costs of debt: risk shifting og debt overhang",
      chapters: [9, 10],
      estMinutes: 140,
      goals: ["Sette opp state-by-state equity payoff E = E[max(CF − K, 0)] og velge mellom prosjekter med og uten gjeld", "Finne gjeldsnivået der ledelsen er indifferent mellom to prosjekter", "Tallfeste agency cost som first-best value minus valgt verdi", "Vise hvorfor aksjonærene avslår et positivt-NPV-prosjekt under debt overhang, og reforhandle face value slik at begge parter vinner", "Kjøre sjekken: samlet gevinst til kreditorer og aksjonærer = prosjektets NPV"],
      keyConcepts: ["Risk shifting", "Asset substitution", "State-by-state payoff", "Debt overhang", "Renegotiation", "Covenants"],
      review: [5, 6],
      examFocus: "Risk shifting og hedging",
      pastExam: { exam: "H2024", task: "Oppgave 4", topic: "Risk shifting, og om aksjonærene aksepterer en zero-NPV hedge" },
      milestone: "Begge agency-mekanismene kan navngis og tallfestes",
      tip: "Skriv ordene «asset substitution» og «debt overhang» eksplisitt i hvert svar du produserer i dag — sensor gir poeng for navnet på mekanismen." },
    { day: 8,
      phase: "Informasjon og utbytte",
      title: "Agency benefits av gjeld, og Myers-Majluf-malen",
      chapters: [11, 12],
      estMinutes: 205,
      goals: ["Argumentere for free cash flow-disiplin og debt as commitment", "Sette sammen trade-off, agency og informasjon til ett rammeverk som forklarer observert leverage", "Kjøre Myers-Majluf-malen: α = I/(E[V | beliefs] + NPV) og payoff til gamle aksjonærer = (1−α)(V_true + payoff)", "Sjekke om investorenes beliefs er rasjonelle — det holder ikke å regne α", "Skille pooling fra separating og forklare hvorfor utfallet kan være ineffisient selv med rasjonelle beliefs"],
      keyConcepts: ["Free cash flow hypothesis", "Debt as commitment", "Myers-Majluf", "Pooling vs separating", "Rational beliefs", "Adverse selection"],
      review: [6, 9],
      examFocus: "Asymmetrisk informasjon",
      pastExam: { exam: "2022", task: "P2", topic: "Myers-Majluf med sjekk av om beliefs er rasjonelle" },
      milestone: "Myers-Majluf-oppsettet gjenkjennes på sekunder",
      tip: "Regn 2022 P2 og 2023 P4 rett etter hverandre i dag — oppsettet er nesten identisk, og poenget er at du skal kjenne det igjen." },
    { day: 9,
      phase: "Informasjon og utbytte",
      title: "Pecking order, signalling og kapitalinnhenting: IPO og SEO",
      chapters: [13, 14],
      estMinutes: 260,
      goals: ["Forklare rekkefølgen internt → debt → equity og hva den faktisk forutsetter", "Analysere valget debt vs. equity under private information", "Regne net proceeds med underwriting spread og tallfeste hva underpricing koster utstederen", "Forklare underpricing med winner's curse og drøfte long-run performance"],
      keyConcepts: ["Pecking order", "Market timing", "Underwriting spread", "IPO underpricing", "Winner's curse", "Rights issue"],
      review: [4, 10, 12],
      examFocus: "Issuance",
      pastExam: { exam: "V2024", task: "MC", topic: "Seks av ti MC-spørsmål kom fra IPO/SEO-øvingen" },
      milestone: "Informasjonsdelen (k12–k14) komplett",
      tip: "Regn ut hva underpricing kostet utstederen i kroner i ett konkret case — tallet gjør argumentet ditt vanskelig å trekke poeng fra." },
    { day: 10,
      phase: "Informasjon og utbytte",
      title: "Utbyttepolitikk: dividends mot repurchases, med og uten friksjoner",
      chapters: [15, 16],
      estMinutes: 255,
      goals: ["Vise payout irrelevance i et perfekt marked og regne ex-dividend price drop", "Gjennomføre aritmetikken i et share repurchase og vise ekvivalensen med dividend", "Drøfte dividend puzzle, clienteles og signalling når skatt kommer inn", "Bruke agency-argumentet for å betale ut free cash flow", "Regne gjennom en fixed-price tender offer"],
      keyConcepts: ["Payout irrelevance", "Ex-dividend price drop", "Share repurchase", "Dividend clienteles", "Dividend signalling", "Fixed-price tender offer"],
      review: [6, 12],
      examFocus: "MM, dividends og recapitalisation",
      pastExam: { exam: "H2025", task: "Oppgave 3", topic: "Dividends og recapitalisation i samme oppgave" },
      milestone: "Innlevering 1 levert — kapitalstruktur og payout er ferdig",
      tip: "Lever innlevering 1 i dag: den krever en full recapitalisation regnet steg for steg, en tax shield-beregning med V^L = V^U + PV(TS), og en kort drøfting av dividend mot repurchase. Vis alle mellomregninger — ingen utregning, ingen poeng." },
    { day: 11,
      phase: "Verdsetting med gjeld",
      title: "WACC-metoden: å verdsette FCF under constant D/V",
      chapters: [17],
      estMinutes: 145,
      goals: ["Diskontere FCF med after-tax WACC og forsvare constant D/V-forutsetningen", "Bruke V^L = FCF/(rwacc − g) og periode-for-periode-diskontering på samme case", "Løse baklengs: finne g eller en break-even pris når verdien er gitt", "Gå fra enterprise value til equity value og legge til excess cash riktig"],
      keyConcepts: ["After-tax WACC", "Constant D/V", "V^L = FCF/(rwacc − g)", "Enterprise vs equity value", "Excess cash"],
      review: [2, 4, 7],
      examFocus: "WACC-metoden",
      pastExam: { exam: "V2024", task: "P2", topic: "Verdsetting med WACC, løst baklengs" },
      milestone: "WACC-metoden kan kjøres på et hvilket som helst tallsett",
      tip: "Løs én WACC-oppgave forlengs og én baklengs i dag — eksamen liker den baklengse varianten best." },
    { day: 12,
      phase: "Verdsetting med gjeld",
      title: "APV, FTE og debt policy: hvilken rate diskonterer tax shield?",
      chapters: [18, 19],
      estMinutes: 240,
      goals: ["Verdsette V^U ved rU og legge til PV(TS) — og begrunne rate-valget: rU under constant D/E, rD eller rf ved fast permanent gjeld", "Håndtere fixed amortisation schedules og gjeld skalert til FCF", "Regne flow to equity og avgjøre når FTE er den riktige metoden", "Løse simultanitetsproblemet med D_t = d·V_t^L og gjøre debt adjustment mellom perioder når V^L faller"],
      keyConcepts: ["APV", "PV(tax shield)", "Discount rate for the tax shield", "D_t = d·V_t^L", "Flow to equity", "Debt adjustment"],
      review: [7, 17],
      examFocus: "WACC ⇔ APV",
      pastExam: { exam: "H2025", task: "Oppgave 4(f)", topic: "Debt adjustment mellom perioder — steget nesten alle bommer på" },
      milestone: "Alle tre metodene for verdsetting med gjeld på plass",
      tip: "Skriv regelen for hvilken rate som diskonterer tax shield på ett kort og si den høyt til du kan den kaldt — den finnes ikke på formelarket." },
    { day: 13,
      phase: "Verdsetting med gjeld",
      title: "Full verdsetting fra ende til annen — de ni stegene i H2025 Exercise 4",
      chapters: [20],
      estMinutes: 175,
      goals: ["Bygge FCF fra prognoser, unlever en comparable og relever til målselskapets D/E", "Regne WACC og verdsette hele caset med WACC-metoden", "Verdsette det samme caset med APV og vise at de to svarene møtes", "Legge til excess cash og gå fra enterprise value til pris per aksje", "Kjøre alle consistency checks til slutt og fange egne regnefeil før sensor gjør det"],
      keyConcepts: ["End-to-end valuation", "WACC = APV check", "Weighted beta check", "Excess cash", "Value per share"],
      review: [4, 17, 18],
      examFocus: "WACC ⇔ APV på samme case",
      pastExam: { exam: "H2025", task: "Oppgave 4", topic: "WACC ⇔ APV over to perioder, ni steg" },
      milestone: "Kursets største enkeltoppgave kan løses i ett strekk",
      tip: "Kjør hele caset på tid i dag, i ett strekk, uten å bla — én aritmetisk glipp forplanter seg gjennom alle ni steg." },
    { day: 14,
      phase: "Opsjoner",
      title: "Opsjoner: payoff, bounds og put-call parity",
      chapters: [21],
      estMinutes: 160,
      goals: ["Tegne payoff- og profit-diagrammer for calls, puts og enkle kombinasjoner", "Skille intrinsic value fra time value og bruke bounds — en call er verdt høyst S", "Bruke put-call parity C = P + S − PV(K) numerisk, løst for hver av de fire variablene", "Gjenkjenne når et eksamensspørsmål egentlig spør om parity"],
      keyConcepts: ["Call and put payoff", "Moneyness", "Intrinsic vs time value", "Put-call parity", "No-arbitrage bounds"],
      review: [3, 19],
      examFocus: "Opsjoner",
      pastExam: { exam: "2023", task: "MC9–10", topic: "Put-call parity numerisk" },
      milestone: "Opsjonsspråket sitter — parity brukes uten nøling",
      tip: "Snu parity-formelen for C, P, S og K i dag, én gang hver, så du slipper å gjøre algebraen under tidspress." },
    { day: 15,
      phase: "Opsjoner",
      title: "Binomialmodellen og risk-neutral valuation",
      chapters: [22],
      estMinutes: 170,
      goals: ["Replikere en opsjon: Δ = (Cu−Cd)/(Su−Sd), B = (Cd − Sd·Δ)/(1+rf), C = SΔ + B", "Regne risk-neutral probability ρ = [(1+rf)S₀ − Sd]/(Su − Sd) og forklare hvorfor virkelige sannsynligheter aldri dukker opp", "Rulle et to-periode-tre bakover uten å miste et ledd", "Bakke risk-neutral probabilities ut av observerte priser"],
      keyConcepts: ["Replicating portfolio", "Delta", "Risk-neutral probability", "Two-period tree", "Backward induction"],
      review: [5, 21],
      examFocus: "Binomial og risk-neutral valuation",
      pastExam: { exam: "H2024", task: "Oppgave 6", topic: "Real option verdsatt risk-neutralt" },
      milestone: "Risk-neutral valuation brukes like trygt på real options som på finansopsjoner",
      tip: "Verdsett samme opsjon både med replikering og med risk-neutral sannsynlighet i dag — samme svar er din innebygde kontroll." },
    { day: 16,
      phase: "Opsjoner",
      title: "Black-Scholes: intuisjon, comparative statics og implied volatility",
      chapters: [23],
      estMinutes: 150,
      goals: ["Forklare hva N(d1) og N(d2) betyr, uten tabeller", "Gjøre rede for comparative statics, særlig at opsjonsverdien stiger med volatilitet", "Svare på hva som skjer med en call når faktisk volatilitet er lavere enn implied", "Forklare hva du gjør med en feilpriset opsjon, og hvordan posisjonen hedges"],
      keyConcepts: ["Black-Scholes", "N(d1) and N(d2)", "Comparative statics", "Implied volatility", "Delta hedging"],
      review: [21, 22],
      examFocus: "Black-Scholes, verbal",
      pastExam: { exam: "H2025", task: "Oppgave 1", topic: "Black-Scholes-intuisjon uten utregning — 12 poeng" },
      milestone: "Den verbale opsjonsoppgaven kan besvares innenfor setningsbudsjettet",
      tip: "Skriv svaret på H2025 Exercise 1 i dag og tell setningene: 4–6 er budsjettet, og overskuddstekst gir null ekstra poeng." },
    { day: 17,
      phase: "Opsjoner",
      title: "Equity og debt som opsjoner: kredittrisiko, CDS og coinsurance",
      chapters: [24],
      estMinutes: 225,
      goals: ["Se equity som en call på firm value og debt som risikofri gjeld minus en put", "Utlede yield to maturity og credit spread fra opsjonsverdier", "Bruke βE = N(d1)(V/E)βU", "Prise en credit default swap ut fra risk-neutral default probability, og verdsette convertible debt", "Vise coinsurance-effekten i en fusjon, state by state"],
      keyConcepts: ["Equity as a call", "Debt as risk-free debt minus a put", "Credit spread", "βE = N(d1)(V/E)βU", "Credit default swap", "Coinsurance"],
      review: [5, 22, 23],
      examFocus: "Debt og equity som opsjoner",
      pastExam: { exam: "2015", task: "P4", topic: "Equity som call, credit spread og CDS — 90 poeng" },
      milestone: "Kredittrisiko og opsjonsteori er koblet sammen",
      tip: "Kurbatov har ikke testet dette ennå, men 8 av 11 eldre sett gjorde det. Bruk dagen på grunnmekanikken — equity = call, debt = risk-free minus put — og la detaljene ligge." },
    { day: 18,
      phase: "Opsjoner",
      title: "Real options: vente, avbryte, bytte — og verdien av informasjon",
      chapters: [25],
      estMinutes: 195,
      goals: ["Regne verdien av option to wait = Σp_i·max(0,NPV_i)/(1+r) − max(0,NPV_now), og forklare hvorfor positiv NPV i dag likevel kan bety vent", "Regne value of perfect information = E[max(0,NPV_i)] − max(0,E[NPV]), også når informasjonen først kommer om ett år", "Verdsette en exit- eller abandonment-opsjon ved å bytte en perpetuity mot en truncated annuity", "Løse for indifference point og håndtere switching costs", "Tegne beslutningstreet før du regner på det"],
      keyConcepts: ["Option to wait", "Value of information", "Abandonment option", "Truncated annuity", "Switching costs", "Indifference point"],
      review: [1, 22, 24],
      examFocus: "Real options",
      pastExam: { exam: "H2025", task: "Oppgave 5", topic: "Value of information, exit option og indifference point — 20 poeng" },
      milestone: "Opsjonsblokken k21–k25 komplett — 20 faste poeng sikret",
      tip: "Tegn treet først og regn etterpå, på alle tre oppgavene du gjør i dag. De fleste feilene på real options kommer av at treet aldri ble tegnet." },
    { day: 19,
      phase: "M&A og governance",
      title: "M&A: aksjebytte, premie og markedets implisitte dealsannsynlighet",
      chapters: [26],
      estMinutes: 215,
      goals: ["Regne et aksjebytte helt ut: nye aksjer, ny kurs, eierandel og NPV for begge parter", "Skille faktisk premie fra tilbudt premie, og vite hvorfor de to spriker", "Utlede markedets implisitte sannsynlighet for at handelen går gjennom, via long/short og sikkerhetsekvivalent", "Vise at EPS-vekst ikke er verdiskaping, med et nullpremie-moteksempel", "Ha minst fire oppkjøpsmotiver som IKKE er synergier, klare til et verbalt svar"],
      keyConcepts: ["Exchange ratio", "Actual vs offered premium", "Implied deal probability", "EPS accretion", "Coinsurance", "Free-rider problem"],
      review: [4, 20, 24],
      examFocus: "M&A og governance",
      pastExam: { exam: "H2025", task: "Oppgave 2 og 6", topic: "Blockholder mot shirking CEO (12 p) og implied deal probability (20 p)" },
      milestone: "Innlevering 2 levert — opsjonsblokken er bak deg",
      tip: "Regn WE5 i k26 to ganger: én gang med long/short-porteføljen, én gang ved å prise begge aksjene under samme p. Får du 82,83 % begge veier, sitter H2025 oppgave 6." },
    { day: 20,
      phase: "M&A og governance",
      title: "Corporate governance: repertoaret til den garanterte drøftingsoppgaven",
      chapters: [27],
      estMinutes: 205,
      goals: ["Forklare agentproblemet mellom ledelse og aksjonærer, og hvorfor det ikke løser seg selv", "Beskrive minst fem overvåkingsmekanismer med hvem som overvåker og med hvilke verktøy", "Ha tretten handlinger en eier med 5–10 % kan ta, og kunne forklare tre av dem på tre setninger hver", "Regne break-even-eierandelen for at overvåking skal lønne seg, og forklare hvorfor 5–10 % er det interessante nivået", "Vurdere overtakelsesforsvar etter hvem sin interesse de tjener"],
      keyConcepts: ["Agency problem", "Board independence", "Blockholder", "Proxy fight", "Poison pill", "LBO as governance"],
      review: [11, 26, 9],
      examFocus: "M&A og governance",
      pastExam: { exam: "H2025", task: "Oppgave 2 og 6", topic: "Blockholder mot shirking CEO (12 p) og implied deal probability (20 p)" },
      milestone: "Eierstyring dekket — de 12 garanterte poengene er sikret",
      tip: "Skriv ut tre handlinger for 5–10 %-eieren på papir, tre setninger hver, uten å se på kapitlet. Det er nøyaktig oppgaveformatet fra H2025." },
    { day: 21,
      phase: "Eksamenshåndverk",
      title: "Eksamenshåndverk og formelarket: slik skrives 100 poeng",
      chapters: [28, 29],
      estMinutes: 220,
      goals: ["Fordele tre timer på seks oppgaver etter poeng, og bestemme på forhånd når du forlater en oppgave", "Bruke svarmalene for twin firm-verdsettingen, recapitalisation, real option, state-by-state agency og M&A-swappen", "Skrive et 12-poengs verbalt svar og se forskjellen fra et 6-poengs", "Avslutte hvert numerisk svar med de fem consistency checks", "Bære et symbol videre og oppgi forutsetningen når du står fast i en kjedet deloppgave"],
      keyConcepts: ["Time budget", "Answer templates", "Consistency checks", "Rounding to 4 decimals", "Carry a symbol forward"],
      review: [6, 17, 25],
      examFocus: "Alle",
      pastExam: null,
      milestone: "Hele pensum (k0–k29) gjennomgått",
      tip: "Test deg selv på hele formelarket i k29 med høyre kolonne dekket — særlig på det som IKKE deles ut på eksamen." },
    { day: 22,
      phase: "Eksamenstrening · tema",
      title: "Temaøkt: twin firm, WACC og APV på ekte eksamensoppgaver",
      chapters: [],
      estMinutes: 200,
      goals: ["Kjøre twin firm-rutinen på tre ulike eksamensoppgaver uten notater", "Verdsette samme case med både WACC og APV og vise at svarene møtes", "Gjøre debt adjustment mellom perioder korrekt når V^L faller", "Runde konsekvent til fire desimaler gjennom hele kjeden"],
      keyConcepts: ["Twin firm", "WACC vs APV", "Debt adjustment", "Four-decimal precision", "Weighted beta check"],
      review: [4, 17, 18],
      examFocus: "WACC ⇔ APV",
      pastExam: { exam: "H2024", task: "Oppgave 5", topic: "Twin firm → rU → rE → WACC → verdi ved WACC og APV" },
      milestone: "Den største enkeltoppgaven trent til sikkerhet",
      tip: "Ta H2024 Exercise 5 og H2025 Exercise 4 etter hverandre i dag, med klokke, og sammenlign mot fasiten linje for linje." },
    { day: 23,
      phase: "Eksamenstrening · tema",
      title: "Temaøkt: real options, M&A og de to verbale oppgavene",
      chapters: [],
      estMinutes: 200,
      goals: ["Løse en real option-oppgave på 35 minutter, med treet tegnet først", "Regne en stock swap og en implied deal probability på reelle tall", "Skrive et governance-svar med tre konkrete grep, fire poeng per grep", "Holde setningsbudsjettet i begge de verbale oppgavene"],
      keyConcepts: ["Real options", "Stock swap", "Implied deal probability", "Governance actions", "Sentence budget"],
      review: [22, 25, 26],
      examFocus: "Real options, M&A og governance",
      pastExam: { exam: "H2024", task: "Oppgave 1 og 6", topic: "M&A der synergier er forbudt som svar, og real option risk-neutralt" },
      milestone: "De faste temaene i det nye formatet er trent",
      tip: "Skriv de verbale svarene for hånd, på tid, og tell setningene etterpå: 2–3 per grep er budsjettet, ikke en anbefaling." },
    { day: 24,
      phase: "Eksamenstrening · hele sett",
      title: "Hele H2024 på tid: tre timer, seks oppgaver, 100 poeng",
      chapters: [],
      estMinutes: 240,
      goals: ["Gjennomføre H2024 på tid, uten notater, med kalkulator og ordbok som eneste hjelpemidler", "Holde poengbudsjettet og faktisk forlate en oppgave når tiden er ute", "Rette mot fasit og skille regnefeil fra metodefeil i hvert tapt poeng", "Notere de tre svakeste temaene og legge en konkret plan for dem"],
      keyConcepts: ["Full paper under time", "Point budget", "Self-marking", "Calculation vs method errors"],
      review: [6, 9, 27],
      examFocus: "Alle",
      pastExam: { exam: "H2024", task: "Hele settet", topic: "M&A · governance · MM · risk shifting · WACC og APV · real option" },
      milestone: "Første fullstendige sett gjennomført på tid",
      tip: "Sett klokka på nøyaktig tre timer og legg notatene i et annet rom. Rett etterpå med fasit i hånd, og skriv opp hvert tapte poeng med årsak." },
    { day: 25,
      phase: "Generalprøve",
      title: "Generalprøve: H2025 på tid, og siste runde på consistency checks",
      chapters: [],
      estMinutes: 240,
      goals: ["Gjennomføre H2025 på tid som generalprøve", "Kjøre de fem consistency checks på hvert eneste numeriske svar", "Gå gjennom feilene fasitene kaller ut: certainty equivalent 100 mot 100×1,03, avrundingsdrift, stand-alone NPV mot endring i equity value", "Repetere formelarket i k29 en siste gang, med vekt på det som ikke deles ut"],
      keyConcepts: ["Mock exam", "Consistency checks", "Rounding discipline", "Common marking errors", "Formula recall"],
      review: [4, 20, 25],
      examFocus: "Alle",
      pastExam: { exam: "H2025", task: "Hele settet", topic: "Black-Scholes verbal · governance · MM · WACC og APV · real options · M&A" },
      milestone: "Klar for eksamen",
      tip: "Avslutt hvert svar i dag med de fem consistency checks. Det er dem som fanger den ene regnefeilen som ellers forplanter seg gjennom hele oppgaven." },
  ],
};

/* ---------- Quiz pool (ch = chapter, oppg = exam-task band) ----------
   oppg 1 = chapters 0-2 · oppg 2 = chapters 3-4 · oppg 3 = chapter 5
   All rates carried to 4 decimals, as H2025 demanded.                  */
window.EDU_DATA.quizzes = [
  {
    "id": "q1",
    "ch": 0,
    "oppg": 1,
    "type": "mcq",
    "q": "Under the format Kurbatov set in H2024 and repeated in H2025, the FIE402 paper consists of:",
    "options": [
      "10 multiple-choice questions plus two long problems",
      "6 exercises worth 100 points in total, with no multiple choice at all",
      "4 exercises of 25 points each, all quantitative",
      "3 exercises, each of which must be passed separately"
    ],
    "answer": 1,
    "explanation": "Six exercises, 100 points, three hours, closed book, no multiple choice. Option A describes the pre-2024 papers, where MC blocks were standard; the format changed in 2024 and MC is gone. There is no 4x25 structure, and the 'each exercise must be passed' rule belongs to other courses: here the grade A-F is set on the total, so a weak exercise can be carried by the others."
  },
  {
    "id": "q2",
    "ch": 0,
    "oppg": 1,
    "type": "mcq",
    "q": "Which of these is NOT printed on the exam formula sheet?",
    "options": [
      "The free cash flow definition, FCF = EBIT(1 - tau_c) + Dep - CapEx - dNWC",
      "The CAPM, r_i = r_f + beta_i(E[Rmkt] - r_f)",
      "V^L = V^U + PV(TS), and which rate discounts the tax shield",
      "rE = rU + (D/E)(rU - rD)"
    ],
    "answer": 2,
    "explanation": "The sheet gives FCF, the perpetuity and growing perpetuity, the CAPM, MM II in rate form, the betaU weighting, pre- and after-tax WACC, binomial replication and the M&A stock-swap NPVs. So A, B and D are all handed to you. V^L = V^U + PV(TS) is not on it, and neither is the far more valuable fact of which rate discounts the shield (rU under constant D/E, rD or rf under fixed permanent debt). That line has to be memorised, and it has been worth 20-40 points in recent papers."
  },
  {
    "id": "q3",
    "ch": 0,
    "oppg": 1,
    "type": "mcq",
    "q": "The consistency check [E/(E+D)]betaE + [D/(E+D)]betaD = betaU is designed to catch:",
    "options": [
      "A wrong forecast of next year's free cash flow",
      "A wrong weight, or use of the (1 - tau_c) version of the weighting that this course rejects",
      "An incorrect corporate tax rate in the FCF line",
      "Investors holding irrational beliefs after an equity issue"
    ],
    "answer": 1,
    "explanation": "Check 2 is a redundant recomputation of betaU from the relevered numbers, so it breaks exactly when a weight is wrong or when the (1 - tau_c) unlevering has crept in. It says nothing about the cash flow forecast (A) or the tax rate used in FCF (C), because neither enters the beta weighting. Rationality of beliefs (D) is check 5 and belongs to Myers-Majluf, not to the cost of capital."
  },
  {
    "id": "q4",
    "ch": 0,
    "oppg": 1,
    "type": "short",
    "q": "List the five consistency checks from chapter 0, and say in one line each what they catch.",
    "model": [
      "1. Value by WACC = value by APV. Catches the wrong tax-shield discount rate, the wrong debt level, or stale weights.",
      "2. [E/V]betaE + [D/V]betaD = betaU (equivalently [E/V]rE + [D/V]rD = rU). Catches wrong weights, or the (1 - tau_c) unlevering this course rejects.",
      "3. Creditors' gain + shareholders' gain = the project's NPV. Catches double counting, or a pure transfer mistaken for value creation.",
      "4. Creditors' gain = shareholders' loss when total value is fixed. Catches the belief that shareholders profit from an action that only moves value between claimants.",
      "5. Are investors' beliefs rational given the action actually taken? Catches stopping once alpha has been computed in an information problem.",
      "Checks 1 and 2 are redundant computations; 3 and 4 are conservation laws; 5 is an equilibrium question, and the keys single it out as the step candidates skip."
    ]
  },
  {
    "id": "q5",
    "ch": 0,
    "oppg": 1,
    "type": "mcq",
    "q": "In the organising identity V^L = V^U + PV(TS) - PV(distress costs) - PV(agency costs) + PV(agency benefits), the terms after V^U represent:",
    "options": [
      "Alternative ways of measuring the same set of cash flows",
      "One named market imperfection each, added back to the perfect-market benchmark",
      "Accounting adjustments required by the reporting standard",
      "Different investors' subjective valuations of the same firm"
    ],
    "answer": 1,
    "explanation": "MM I says that with no taxes, no bankruptcy costs, no conflicts and no private information, V^L = V^U: financing is irrelevant. The course then removes the 'no' one friction at a time, and each removal opens exactly one channel: interest deductibility, costly bankruptcy, the shareholder-creditor conflict, and debt as discipline. They are not remeasurements of the same thing (A), they are genuinely different value effects; they are economic, not accounting (C); and they are objective market values, not subjective opinions (D)."
  },
  {
    "id": "q6",
    "ch": 0,
    "oppg": 1,
    "type": "mcq",
    "q": "H2025 asked for four decimal places. The manual's rule on precision in a chained exercise is:",
    "options": [
      "Round every rate to two decimals so the arithmetic stays clean",
      "Carry four decimals on every rate, because the keys penalise drift beyond about 0.001",
      "Precision does not matter provided the method is stated correctly",
      "Round only the final answer, to the nearest whole percentage point"
    ],
    "answer": 1,
    "explanation": "Kurbatov chains sub-questions - H2025 Exercise 4 ran to nine linked steps - so rounding at step two contaminates steps three to nine. Two decimals (A) and whole percentage points (D) both produce drift the keys flag as an error. C is the most dangerous answer: method earns marks, but the keys explicitly deduct for rounding drift beyond roughly 0.001, so a correct method with sloppy precision still loses points."
  },
  {
    "id": "q7",
    "ch": 0,
    "oppg": 1,
    "type": "short",
    "q": "Name the four moves, in order, that the solution keys reward on every quantitative sub-question.",
    "model": [
      "1. State the method first, in one sentence: 'I value this by APV: V^U at rU, then the tax shield at rU because the firm rebalances to a constant D/E.' The examiner then knows the choice was deliberate.",
      "2. Show the arithmetic - write the substituted expression, not only the result: 40/(0.09 - 0.02) = 571.43. H2017's key states it flatly: no calculation, no points.",
      "3. Name the mechanism in words: 'this is debt overhang', 'this is asset substitution', 'this is the coinsurance effect'. The keys award marks for the label itself, because it is the cheapest signal that separates understanding from pattern matching.",
      "4. Run the relevant consistency check and write one line saying it passed."
    ]
  },
  {
    "id": "q8",
    "ch": 1,
    "oppg": 1,
    "type": "mcq",
    "q": "A perpetuity pays 25 per year with the FIRST payment at date 5. The discount rate is 8%. Its value today is:",
    "options": [
      "312.5000, because C/r is always a date-0 value",
      "229.6968, because C/r = 312.5000 is a date-4 value and must be discounted four periods",
      "248.0726, because C/r must be discounted three periods",
      "212.6822, because C/r must be discounted five periods"
    ],
    "answer": 1,
    "explanation": "C/r lands one period BEFORE the first cash flow, never on the same date. First payment at date 5 puts 25/0.08 = 312.5000 at date 4, so PV0 = 312.5000/1.08^4 = 229.6968. Option A treats C/r as automatically dated 0, the single most expensive convention error in the course. Option C discounts three periods (a first payment at date 4), option D discounts five (a first payment at date 6). Count periods on a drawn timeline, not in your head."
  },
  {
    "id": "q9",
    "ch": 1,
    "oppg": 1,
    "type": "mcq",
    "q": "A concession pays a free cash flow of 60 at date 1, growing 3% per year forever. The discount rate is 10%. Its value at date 0 is:",
    "options": [
      "857.1429",
      "882.8571",
      "600.0000",
      "461.5385"
    ],
    "answer": 0,
    "explanation": "PV0 = C1/(r - g) = 60/(0.10 - 0.03) = 857.1429, and because the first flow is at date 1, that is already a date-0 value. Option B grows the 60 by one more period (60 x 1.03/0.07), which double-counts growth: C1 is defined as the flow that has ALREADY grown once. Option C ignores growth entirely (60/0.10). Option D adds g to r instead of subtracting it (60/0.13) - a sign slip that always makes the firm look cheaper."
  },
  {
    "id": "q10",
    "ch": 1,
    "oppg": 1,
    "type": "mcq",
    "q": "In a growing perpetuity, the condition r > g should be read as:",
    "options": [
      "A technicality with no economic content",
      "A diagnostic: if terminal growth exceeds the cost of capital, one of the two has been mis-estimated",
      "A restriction that can be relaxed for high-growth firms",
      "A requirement that only applies when g is negative"
    ],
    "answer": 1,
    "explanation": "Each year the flow is (1+g) times larger while the discount factor is 1/(1+r) times smaller, so present values shrink at roughly the net rate r - g; that net rate is what makes the sum converge. Push g towards r and the sum diverges, and above r the formula returns a negative number that is not a value at all. So it is not a technicality (A) and cannot be relaxed (C): a perpetual growth rate above the cost of capital would mean the firm eventually becomes the whole economy. It applies for every g, not just negative ones (D)."
  },
  {
    "id": "q11",
    "ch": 1,
    "oppg": 1,
    "type": "mcq",
    "q": "The annuity formula PV = (C/r)[1 - (1+r)^-N] is best understood as:",
    "options": [
      "A separate result that must be memorised on its own",
      "A perpetuity starting at date 1 minus an identical perpetuity starting at date N+1",
      "The sum of N independent NPV calculations that happens to have a closed form",
      "An approximation that is only accurate for large N"
    ],
    "answer": 1,
    "explanation": "Buy a perpetuity worth C/r today and sell one that starts at date N+1; the second is worth C/r at date N, hence (C/r)/(1+r)^N today. What you keep is exactly dates 1 to N, which is the annuity formula. This construction is why the formula does not need memorising (A) and is exact for every N, not an approximation (D). It matters far beyond arithmetic: an exit or abandonment option in k25 converts a perpetuity into a truncated annuity, and the option is worth precisely the tail you gave up."
  },
  {
    "id": "q12",
    "ch": 1,
    "oppg": 1,
    "type": "mcq",
    "q": "Two mutually exclusive projects each cost 200 today. M pays 42 per year for 8 years (NPV 32.4624 at r = 9%, IRR 13.2258%). W pays a single 500 at date 8 (NPV 50.9331, IRR 12.1353%). Which do you take, and why?",
    "options": [
      "M, because its IRR is higher",
      "W, because NPV measures the money the decision adds at date 0, and IRR ranks by project shape rather than by the actual cost of capital",
      "M, because it pays back faster",
      "Neither can be chosen without knowing the reinvestment rate"
    ],
    "answer": 1,
    "explanation": "W adds 50.9331 of value at 9%, M only 32.4624, so W is worth 18.4707 more today. IRR reverses the ranking because it is the rate at which a project's own cash flows break even, so it describes the project's shape, not the market it lives in: M's early flows are barely discounted at any rate, giving a high break-even rate but little gain when capital is cheap. Payback (C) is worse still - it discards everything after the cutoff, so a project whose value arrives late can never pass. D is a distraction: NPV already discounts at the market rate, so no separate reinvestment assumption is needed."
  },
  {
    "id": "q13",
    "ch": 1,
    "oppg": 1,
    "type": "short",
    "q": "Explain why ranking mutually exclusive projects by IRR can reverse the NPV ranking, and state the three ways IRR fails as a decision rule.",
    "model": [
      "The IRR is the discount rate at which a project's own cash flows break even, so it is a property of the project's timing, not of the market. Early cash flows are barely discounted at any rate: high break-even rate, but little value created when capital is cheap. Late cash flows are crushed at high rates and rewarded enormously at low ones: low break-even rate, steep NPV profile.",
      "The two NPV profiles therefore cross. Ranking by IRR is ranking as though the discount rate were always the crossover rate; when the true rate lies on the other side of the crossing, IRR gets it backwards.",
      "Failure 1 - blind to scale: it prefers a tiny project at 40% to a large one at 15%.",
      "Failure 2 - sign reversal: on a project that takes money in first and pays out later, a HIGH IRR is bad news.",
      "Failure 3 - non-uniqueness: two sign changes in the cash flows give two IRRs and no rule at all.",
      "Use IRR to describe a project; use NPV to choose between projects. NPV is additive, which is what makes firm value decomposable and all five consistency checks possible."
    ]
  },
  {
    "id": "q14",
    "ch": 1,
    "oppg": 1,
    "type": "mcq",
    "q": "The same concession (60 growing at 3%, r = 10%) is delayed by permits so that the FIRST cash flow now arrives at date 4. Its value today is:",
    "options": [
      "585.4401",
      "643.9841",
      "708.3825",
      "857.1429"
    ],
    "answer": 1,
    "explanation": "The formula is unchanged, but its output moves with the stream: C1/(r - g) = 857.1429 now sits at date 3, one period before the first flow, so PV0 = 857.1429/1.10^3 = 643.9841. Option A discounts four periods, the classic off-by-one that treats the formula's output as dated at the first cash flow. Option C discounts only two. Option D forgets to discount at all. Check by ratio: 643.9841/857.1429 = 0.7513 = 1/1.10^3."
  },
  {
    "id": "q15",
    "ch": 1,
    "oppg": 1,
    "type": "short",
    "q": "State the date convention for C/r and C1/(r - g), and explain the certainty-equivalent error the solution keys call out.",
    "model": [
      "Both formulas return a value dated ONE PERIOD BEFORE the first cash flow they price. C/r is a date-0 value only when the first payment arrives at date 1; if the first payment lands at date 3, C/r is a date-2 value with two more periods of discounting to go.",
      "The same applies to a terminal value: TV_T = FCF_(T+1)/(r - g) sits at date T even though the first flow inside it arrives at T+1, so it is discounted T periods, not T+1.",
      "The keys call out candidates who used 100 rather than 100 x 1.03 as a certainty equivalent: the cash flow was taken from the wrong date. Growing perpetuities need the flow that has already grown one period, and delayed streams need the discounting that the delay creates.",
      "Practical rule: draw the timeline, mark where the formula's output lands, and verify a second way - value the stream one period forward and roll it back. Two routes agreeing to four decimals is a minute well spent, because a misplaced date cascades through every later sub-question."
    ]
  },
  {
    "id": "q16",
    "ch": 2,
    "oppg": 1,
    "type": "mcq",
    "q": "EBIT = 180, tau_c = 22%, depreciation = 45, CapEx = 60, dNWC = +12, and interest expense = 20. Free cash flow is:",
    "options": [
      "97.8000",
      "113.4000",
      "117.8000",
      "125.4000"
    ],
    "answer": 1,
    "explanation": "FCF = 180(0.78) + 45 - 60 - 12 = 140.4000 + 45 - 60 - 12 = 113.4000. Option A subtracts interest before tax, (180 - 20)(0.78) + 45 - 60 - 12 = 97.8000: financing costs never enter the numerator, because rwacc in the denominator already pays the lenders. Option C adds the interest tax shield 0.22 x 20 = 4.4 back into the cash flow, which double-counts the shield once you discount at the after-tax WACC or add PV(TS) in APV. Option D forgets dNWC entirely."
  },
  {
    "id": "q17",
    "ch": 2,
    "oppg": 1,
    "type": "mcq",
    "q": "Interest is excluded from free cash flow because:",
    "options": [
      "Interest is not a real cash outflow",
      "Financing costs live in the discount rate, so charging them in the numerator too would pay lenders twice",
      "Interest is already inside depreciation",
      "The tax authorities do not allow interest as a deduction"
    ],
    "answer": 1,
    "explanation": "rwacc is a weighted average of rE and rD, so the cost of borrowing is already in the denominator; subtracting interest from the numerator as well would value the firm far too low. Interest certainly IS a cash outflow (A) - it is simply a payment to a claim holder, and FCF measures the pot before the split. It has nothing to do with depreciation (C). And interest is deductible (D) - that is precisely why the shield exists, and why FCF's deliberate omission of it has to be repaired later, either through rwacc or through a separate PV(TS)."
  },
  {
    "id": "q18",
    "ch": 2,
    "oppg": 1,
    "type": "mcq",
    "q": "A firm permanently cuts inventory, taking net working capital from 16% of sales to 11% of sales on sales of 750. The effect on that year's free cash flow is:",
    "options": [
      "-37.5000, because working capital is subtracted",
      "+37.5000, because dNWC = -37.5000 and FCF subtracts the change",
      "Zero, because the balance sheet does not affect cash flow",
      "+37.5000, but only after tax, so +29.2500"
    ],
    "answer": 1,
    "explanation": "NWC falls from 0.16 x 750 = 120.0000 to 0.11 x 750 = 82.5000, so dNWC = -37.5000, and -dNWC = +37.5000 raises FCF. Inventory on the shelf is cash already spent and not yet recovered; selling it down without replacing it brings that cash back. Option A subtracts the level or the wrong sign - the formula subtracts the CHANGE, and -(-37.5000) = +37.5000. Option C is wrong because working capital is exactly where the balance sheet touches cash flow. Option D taxes it, but this is a balance-sheet release, not profit, so no tax applies."
  },
  {
    "id": "q19",
    "ch": 2,
    "oppg": 1,
    "type": "mcq",
    "q": "Net working capital is held at 15% of sales. Sales rise from 400 to 460. dNWC for the year is:",
    "options": [
      "+69.0000",
      "+9.0000",
      "+60.0000",
      "-9.0000"
    ],
    "answer": 1,
    "explanation": "NWC_t = w x Sales_t, so dNWC_t = w(Sales_t - Sales_(t-1)) = 0.15(460 - 400) = 9.0000. Option A subtracts the LEVEL 0.15 x 460 = 69.0000 instead of the change, one of the two fatal sign errors in this material. Option C subtracts the change in sales without the 15%. Option D has the sign backwards: sales are growing, so the firm is tying MORE cash up, and growth is not free. Write the levels in a row of their own, difference them, then feed the difference in."
  },
  {
    "id": "q20",
    "ch": 2,
    "oppg": 1,
    "type": "mcq",
    "q": "Depreciation is deducted inside EBIT and then added back in full. The net effect on cash is:",
    "options": [
      "Zero, so the treatment is purely cosmetic",
      "tau_c x Depreciation of tax saved - the deduction lowers the tax bill, and the add-back corrects the cash",
      "The full depreciation amount, because it is a cash outflow",
      "(1 - tau_c) x Depreciation"
    ],
    "answer": 1,
    "explanation": "Depreciation is not a payment - nobody receives it - but the tax authority allows it as a deduction, so it genuinely lowers cash tax paid. Running it through EBIT gets the tax bill right; adding the full amount back gets the cash right; the residue is tau_c x Depreciation of tax saved. It is therefore not cosmetic (A). It is not an outflow (C). Option D is what you would get if you added back only the after-tax amount, which under-adds by exactly the shield you were trying to capture. Same logic as the interest tax shield in k7: a deduction is worth its tax rate times its size."
  },
  {
    "id": "q21",
    "ch": 2,
    "oppg": 1,
    "type": "short",
    "q": "Students object that a levered firm does not actually pay tax on EBIT. Why does the FCF formula tax EBIT anyway, and where is the missing deduction returned?",
    "model": [
      "The objection is correct as accounting: the firm pays tax on EBIT minus interest, so its real tax bill is lower than tau_c x EBIT. The formula ignores this on purpose.",
      "Reason: FCF must be financing-neutral. The same assets, run the same way, must produce the same FCF whether the firm is all-equity or heavily levered. That is what makes one stream of cash flows valuable by two routes.",
      "The value of the interest deduction is handed back in exactly one place, never two. In the WACC method it arrives through the reduced discount rate, rwacc = [E/V]rE + [D/V]rD(1 - tau_c). In APV it arrives as a separate PV(TS) term added to V^U.",
      "If you also lowered the tax in the FCF line you would count the shield twice, both methods would break, and the check that value by WACC equals value by APV - which the examiner performs - would become meaningless. Take the tax hit on full EBIT and move on."
    ]
  },
  {
    "id": "q22",
    "ch": 2,
    "oppg": 1,
    "type": "mcq",
    "q": "You compute TV_3 = FCF_4/(r - g). Over how many periods must it be discounted, and how is it combined with the explicit forecast?",
    "options": [
      "Four periods, because the first cash flow inside it arrives at date 4",
      "Three periods, because the growing-perpetuity formula returns a date-3 value; it is normally added to FCF_3 before discounting",
      "Three periods, but it must be discounted separately and never added to FCF_3",
      "It needs no discounting, because it is already a present value"
    ],
    "answer": 1,
    "explanation": "The growing perpetuity returns a value one period before its first flow, so TV_3 sits at date 3 even though FCF_4 is the first flow inside it. Discounting over four periods (A) is the single most common terminal-value error and understates the firm by one full period of discounting. Whether you add TV_3 to FCF_3 and discount the sum, or discount them separately and add, is arithmetically identical (C is a false restriction). And it is a date-3 value, not a date-0 value (D)."
  },
  {
    "id": "q23",
    "ch": 2,
    "oppg": 1,
    "type": "mcq",
    "q": "Year 3 FCF is 120.00, but it was inflated by a one-off inventory release of 20.8. A normalised year 4 gives FCF_4 = 99.224. With r = 9% and g = 2%, the correct TV_3 and the naive one are:",
    "options": [
      "1 417.4857 correct; the naive 120.00 x 1.02/0.07 = 1 748.5714 overstates it by 331.0857",
      "1 748.5714 correct; the normalised figure ignores growth",
      "1 714.2857 correct; growth should not be applied to a terminal year",
      "Both give the same answer, because the release is only a timing difference"
    ],
    "answer": 0,
    "explanation": "TV_3 = 99.224/0.07 = 1 417.4857. Growing the reported FCF_3 instead gives 120.00 x 1.02/0.07 = 1 748.5714, which assumes the one-off 20.8 release recurs every year forever - an overstatement of 331.0857. Option B has the roles reversed. Option C (120/0.07 = 1 714.2857) drops growth but keeps the contaminated flow, so it is wrong twice. Option D is the trap: the release IS a timing difference, which is exactly why it must not be capitalised into a perpetuity. Build a normalised FCF_(T+1) from its components. Check: 1 417.4857 x 0.07 = 99.2240."
  },
  {
    "id": "q24",
    "ch": 2,
    "oppg": 1,
    "type": "short",
    "q": "Define net working capital, state what enters dNWC, and give the two sign errors that destroy a multi-part answer.",
    "model": [
      "NWC = cash required for operations + accounts receivable + inventory - accounts payable. Receivables and inventory are cash spent and not yet recovered; payables are goods held but not yet paid for, so suppliers are financing you and the amount is subtracted.",
      "The FCF line uses dNWC_t = NWC_t - NWC_(t-1): the CHANGE, never the level. Exam problems usually give a policy rather than the change - 'NWC is w percent of sales' - so NWC_t = w x Sales_t and dNWC_t = w(Sales_t - Sales_(t-1)). In a steady state with growth g this settles to dNWC = g x NWC, which is why growth is not free.",
      "Error 1: subtracting NWC_t itself instead of the difference.",
      "Error 2: reading 'working capital falls by 20.8' and subtracting 20.8. It is dNWC = -20.8, and -(-20.8) = +20.8, so FCF RISES.",
      "Discipline: write the level in a row of its own, difference it in the next row, then feed the difference in. Never do it in your head. Cross-check that the changes sum to the change in level over the whole horizon."
    ]
  },
  {
    "id": "q25",
    "ch": 3,
    "oppg": 2,
    "type": "mcq",
    "q": "A stock has volatility 35% and correlation 0.45 with the market; market volatility is 20%. Its beta is:",
    "options": [
      "1.7500",
      "0.7875",
      "0.4500",
      "0.0315"
    ],
    "answer": 1,
    "explanation": "beta = Corr x sigma_i/sigma_mkt = 0.45 x 0.35/0.20 = 0.7875. Equivalently Cov = 0.45 x 0.35 x 0.20 = 0.031500 and Var(Rmkt) = 0.20^2 = 0.040000, so beta = 0.031500/0.040000 = 0.7875. Option A is sigma_i/sigma_mkt with the correlation dropped, which treats total volatility as if it were all systematic. Option C reports the correlation itself. Option D reports the covariance without dividing by the market variance. Beta is correlation SCALED by relative volatility: high volatility raises beta only to the extent it comes with correlation."
  },
  {
    "id": "q26",
    "ch": 3,
    "oppg": 2,
    "type": "mcq",
    "q": "Firm-specific risk carries no risk premium because:",
    "options": [
      "It is small relative to systematic risk",
      "A diversified investor can delete it for free, so anyone paid for bearing it would be collecting a return for no risk, and the price would be bid up until the extra return vanished",
      "Regulators forbid pricing it",
      "It has a beta of exactly 1"
    ],
    "answer": 1,
    "explanation": "If a stock offered extra return purely for erratic own-earnings, a diversified investor would buy it, hold it beside forty others, watch the erratic part disappear from his portfolio, and collect the premium bearing nothing. Every diversified investor would want that trade, so the price rises until the extra return is gone. It is not about magnitude (A) - firm-specific risk is often the LARGER part of a single stock's volatility, as at n = 1 in the diversification table. It is a market equilibrium result, not regulation (C). And firm-specific risk by definition has zero market beta, not one (D). An undiversified investor genuinely bears more risk, but the market does not pay him for a cost he chose."
  },
  {
    "id": "q27",
    "ch": 3,
    "oppg": 2,
    "type": "mcq",
    "q": "A comparable's cost of equity is 12.8%. The risk-free rate is 2.5% and the EXPECTED RETURN ON THE MARKET is 8.0%. Its equity beta is:",
    "options": [
      "1.8727",
      "2.3273",
      "1.2875",
      "1.6000"
    ],
    "answer": 0,
    "explanation": "Run the CAPM backwards: betaE = (rE - rf)/(E[Rmkt] - rf) = (0.1280 - 0.0250)/(0.0800 - 0.0250) = 0.1030/0.0550 = 1.8727. Option B divides by the premium without subtracting rf from rE (0.1280/0.0550). Option C divides the excess return by the market's EXPECTED RETURN rather than by its PREMIUM (0.1030/0.0800) - the single most contaminating slip in the course, since it feeds every downstream number. Option D makes both errors at once (0.1280/0.0800). Underline which of E[Rmkt] and the premium you were given before writing anything."
  },
  {
    "id": "q28",
    "ch": 3,
    "oppg": 2,
    "type": "mcq",
    "q": "rf = 3%, the EXPECTED RETURN ON THE MARKET is 8%, and a stock has beta 1.40. Its required return is:",
    "options": [
      "14.2000%",
      "10.0000%",
      "11.2000%",
      "8.0000%"
    ],
    "answer": 1,
    "explanation": "The market risk premium is E[Rmkt] - rf = 0.08 - 0.03 = 0.05, so r = 0.03 + 1.40(0.05) = 0.1000 = 10.0000%. Option A uses E[Rmkt] as if it were the premium: 0.03 + 1.40(0.08) = 0.1420, an overstatement of 4.2 percentage points that then propagates into betas, rU, rE and every WACC downstream. Option C is 1.40 x 0.08 with no risk-free rate. Option D ignores beta. 'The market risk premium is 6%' and 'the expected return on the market is 6%' are different sentences and give different answers."
  },
  {
    "id": "q29",
    "ch": 3,
    "oppg": 2,
    "type": "mcq",
    "q": "An investor holds betas 1.35, 0.80 and 1.60 in weights 40%, 35% and 25%. With rf = 2.5% and a market risk premium of 5.5%, the portfolio's beta and required return are:",
    "options": [
      "1.2500 and 9.3750%",
      "1.2200 and 9.2100%",
      "1.2200 and 9.2100%, but only if the stocks are uncorrelated",
      "1.2200 and 9.2100% only for equally weighted portfolios"
    ],
    "answer": 1,
    "explanation": "betaP = 0.40(1.35) + 0.35(0.80) + 0.25(1.60) = 0.6000 + 0.2800 + 0.4000 = 1.2200, and rP = 0.025 + 1.2200(0.055) = 0.0921 = 9.2100%. Check by the other route: 0.40(0.099250) + 0.35(0.069000) + 0.25(0.113000) = 0.0921. The two agree because the CAPM is linear in beta. Option A averages the betas without weights (1.2500). Options C and D attach false conditions: betas add linearly by market-value weights regardless of correlations or weighting scheme - it is volatilities that do not add, and that linearity is exactly what makes the unlever/relever machinery of k4 possible."
  },
  {
    "id": "q30",
    "ch": 3,
    "oppg": 2,
    "type": "short",
    "q": "'This stock is very volatile, so it must have a high required return.' Explain why this is false, and what a question must give you if it wants a cost of capital from sigma.",
    "model": [
      "Volatility and required return are linked only through the part of volatility that correlates with the market. Formally beta = Corr(R_i, Rmkt) x sigma_i/sigma_mkt, so a large sigma_i with a small correlation produces a small beta.",
      "Concrete case: Alfa with sigma = 40% and correlation 0.35 has beta = 0.35 x 0.40/0.18 = 0.7778, while Bravo with sigma = 22% and correlation 0.80 has beta = 0.80 x 0.22/0.18 = 0.9778. The wilder stock has the LOWER required return, because most of its 40% is noise a diversified holder never feels.",
      "A biotech whose fortunes hang on one trial result can have a lower beta than a utility whose earnings track the business cycle.",
      "Consequence for exam technique: if a question hands you sigma and asks for a cost of capital, it MUST also give a correlation or a covariance with the market, otherwise the question is unanswerable. Look for it before assuming you are missing a formula."
    ]
  },
  {
    "id": "q31",
    "ch": 3,
    "oppg": 2,
    "type": "mcq",
    "q": "Every stock has volatility 30% and every pair correlates 0.25. As the number of equally weighted holdings grows without limit, portfolio volatility approaches:",
    "options": [
      "0.0000%",
      "15.0000%",
      "7.5000%",
      "30.0000%"
    ],
    "answer": 1,
    "explanation": "sigma_P = sigma x sqrt(1/n + (1 - 1/n)rho), which tends to sigma x sqrt(rho) = 0.30 x sqrt(0.25) = 0.30 x 0.5000 = 15.0000%. The 1/n term is firm-specific risk and dies at rate 1/n; the second term converges to the average covariance and no amount of diversification touches it. Option A is the common belief that diversification removes all risk - it removes only the diversifiable half. Option C halves the wrong quantity (0.30 x 0.25). Option D is a single stock. Note how fast it converges: at n = 10, sigma_P = 17.1026%, already within 2.1 points of the floor."
  },
  {
    "id": "q32",
    "ch": 3,
    "oppg": 2,
    "type": "mcq",
    "q": "Which statement about betas and volatilities is correct?",
    "options": [
      "Both add linearly in value weights",
      "Betas add linearly in value weights; volatilities do not, and that linearity is what makes unlevering possible",
      "Volatilities add linearly; betas do not",
      "Neither adds linearly, so portfolios must always be rebuilt from covariances"
    ],
    "answer": 1,
    "explanation": "betaP = w1beta1 + ... + wnbetan exactly, because beta is a covariance divided by a constant and covariance is linear. Volatilities are not additive: combining two 40% stocks with correlation 0.20 gives 30.98%, not 40%. This is not a curiosity - a firm is a portfolio of its debt and its equity, so betaU = [E/(E+D)]betaE + [D/(E+D)]betaD, which is the entire unlever/relever machinery of chapter 4. If volatilities added (C) there would be no diversification benefit at all, and if nothing added (D) the twin-firm routine could not exist."
  },
  {
    "id": "q33",
    "ch": 4,
    "oppg": 2,
    "type": "mcq",
    "q": "In this course, the pre-tax WACC equals:",
    "options": [
      "The after-tax WACC grossed up by 1/(1 - tau_c)",
      "rU, the unlevered cost of capital - identically, not approximately",
      "rE, because equity is the residual claim",
      "The yield to maturity on the firm's debt"
    ],
    "answer": 1,
    "explanation": "[E/V]rE + [D/V]rD is the definition of the pre-tax WACC and also the definition of rU: if you own all the equity and all the debt you own the assets. It is an arithmetic identity, flat in leverage, and it is a free consistency check on every leverage question. Option A is a plausible-looking rearrangement but false: the two WACCs differ by exactly (D/V)rD x tau_c, not by a scaling factor. Option C confuses the whole with a part. Option D confuses debt's promised yield with anything at all - see chapter 5, where even rD is not y."
  },
  {
    "id": "q34",
    "ch": 4,
    "oppg": 2,
    "type": "mcq",
    "q": "A comparable has betaE = 1.7333, betaD = 0.5000, E/V = 0.60 and D/V = 0.40, with tau_c = 25%. Following FIE402 convention, betaU is:",
    "options": [
      "1.3222, weighting debt by D(1 - tau_c)",
      "1.2400",
      "1.0400",
      "1.7333"
    ],
    "answer": 1,
    "explanation": "This course weights WITHOUT any tax term: betaU = 0.60(1.7333) + 0.40(0.5000) = 1.0400 + 0.2000 = 1.2400. The assumption is that the firm rebalances to a target debt-to-value ratio, so the tax shield carries the same risk as the assets and gets no separate treatment. Option A is the textbook (1 - tau_c) version some courses use: 0.60/0.90 x 1.7333 + 0.30/0.90 x 0.5000 = 1.3222, which would give rU = 9.9333% instead of 9.4400% and would break the check that value by WACC equals value by APV. Option C sets betaD = 0 and drops the debt term. Option D forgets to unlever at all."
  },
  {
    "id": "q35",
    "ch": 4,
    "oppg": 2,
    "type": "mcq",
    "q": "A listed twin has rE = 12.40%, rD = 5.00%, E/V = 0.60 and D/V = 0.40. rf = 2.00% and the market risk premium is 6.00%. rU is:",
    "options": [
      "9.4400%",
      "9.9333%",
      "8.2400%",
      "12.4000%"
    ],
    "answer": 0,
    "explanation": "betaE = (0.1240 - 0.0200)/0.0600 = 1.7333; betaD = (0.0500 - 0.0200)/0.0600 = 0.5000; betaU = 0.60(1.7333) + 0.40(0.5000) = 1.2400; rU = 0.0200 + 1.2400(0.0600) = 0.0944. Confirm directly: 0.60(0.1240) + 0.40(0.0500) = 0.0744 + 0.0200 = 0.0944, because pre-tax WACC = rU. Option B is the (1 - tau_c) unlevering this course rejects. Option C sets betaD = 0 despite rD = 5.00% > rf, giving betaU = 1.0400. Option D takes the twin's rE as if leverage did not matter."
  },
  {
    "id": "q36",
    "ch": 4,
    "oppg": 2,
    "type": "mcq",
    "q": "With betaU = 1.2400 you relever to your own D/E = 0.50, and your own debt has betaD = 0.4000. Your equity beta is:",
    "options": [
      "1.8600",
      "1.6600",
      "1.2400",
      "1.4400"
    ],
    "answer": 1,
    "explanation": "betaE = betaU + (D/E)(betaU - betaD) = 1.2400 + 0.50(1.2400 - 0.4000) = 1.2400 + 0.4200 = 1.6600. Check: with D/V = 1/3 and E/V = 2/3, (2/3)(1.6600) + (1/3)(0.4000) = 1.2400 = betaU. Option A sets your betaD to zero, 1.2400 + 0.50(1.2400) = 1.8600, which overstates equity risk because debt is then assumed to absorb none of the business risk. Option C forgets to relever. Option D uses D/V = 1/3 in place of D/E, a slip that recurs constantly - the multiplier in MM II is D/E, never D/V."
  },
  {
    "id": "q37",
    "ch": 4,
    "oppg": 2,
    "type": "mcq",
    "q": "rU = 10%, rD = 5%, and the target capital structure is D/V = 0.40. rE is:",
    "options": [
      "12.0000%",
      "13.3333%",
      "15.0000%",
      "10.0000%"
    ],
    "answer": 1,
    "explanation": "MM II uses D/E, not D/V. D/V = 0.40 means D/E = 0.40/0.60 = 0.6667, so rE = 0.10 + 0.6667(0.10 - 0.05) = 0.13333 = 13.3333%. Check: 0.60(0.133333) + 0.40(0.05) = 0.0800 + 0.0200 = 0.1000 = rU. Option A substitutes D/V = 0.40 straight into the formula, the single most common arithmetic slip in the course, and it fails the check: 0.60(0.12) + 0.40(0.05) = 0.0920, not 0.1000. Option C doubles the spread. Option D forgets that leverage raises rE at all."
  },
  {
    "id": "q38",
    "ch": 4,
    "oppg": 2,
    "type": "mcq",
    "q": "With rE = 11.9600%, rD = 4.4000%, D/V = 1/3, E/V = 2/3 and tau_c = 25%, the after-tax WACC is:",
    "options": [
      "9.4400%",
      "9.0733%",
      "7.0800%",
      "7.6300%"
    ],
    "answer": 1,
    "explanation": "rwacc = (2/3)(0.1196) + (1/3)(0.0440)(0.75) = 0.079733 + 0.011000 = 0.090733 = 9.0733%. Equivalently rU - (D/V)tau_c rD = 0.0944 - (1/3)(0.25)(0.0440) = 0.090733, which shows the whole effect of debt is the tax subsidy. Option A is the PRE-tax WACC, which equals rU and is the right rate for the APV numerator but not for discounting FCF. Option C applies (1 - tau_c) to the entire WACC, 0.0944 x 0.75, which wrongly shields the equity return too. Option D uses D/E = 0.50 as if it were D/V."
  },
  {
    "id": "q39",
    "ch": 4,
    "oppg": 2,
    "type": "short",
    "q": "Write out the seven rungs of the Twin-Firm Ladder, with the formula on each rung.",
    "model": [
      "Rung 1 - read the twin's cost of equity rE (or get it from share price data).",
      "Rung 2 - CAPM backwards: betaE = (rE - rf)/(E[Rmkt] - rf).",
      "Rung 3 - the twin's debt beta, betaD = (rD - rf)/(E[Rmkt] - rf), and set it to zero ONLY if the question says the debt is risk-free.",
      "Rung 4 - UNLEVER at the twin's weights: betaU = (E/V)betaE + (D/V)betaD, with no (1 - tau_c) term.",
      "Rung 5 - back to a rate: rU = rf + betaU(E[Rmkt] - rf).",
      "Rung 6 - RELEVER to your own target: betaE = betaU + (D/E)(betaU - betaD), then CAPM; or equivalently rE = rU + (D/E)(rU - rD).",
      "Rung 7 - build the WACC you need: pre-tax = rU; after-tax = (E/V)rE + (D/V)rD(1 - tau_c).",
      "betaU and rU are the only quantities that cross from the twin's world to yours, because they belong to the business and not to either balance sheet. Close by checking [E/V]betaE + [D/V]betaD = betaU and pre-tax WACC = rU."
    ]
  },
  {
    "id": "q40",
    "ch": 4,
    "oppg": 2,
    "type": "mcq",
    "q": "A question states the comparable's debt has an expected return of 5.00% while rf = 2.00%. You set betaD = 0 out of habit. What happens?",
    "options": [
      "Nothing - betaD is a second-order effect",
      "betaU is understated (1.0400 instead of 1.2400), because debt is assumed to bear none of the business risk, and every number downstream is wrong",
      "betaU is overstated, because debt then carries all the risk",
      "Only the after-tax WACC is affected"
    ],
    "answer": 1,
    "explanation": "With E/V = 0.60 and betaE = 1.7333, dropping betaD = 0.5000 gives betaU = 1.0400 rather than 1.2400, so rU falls from 9.4400% to 8.2400% and the whole valuation inflates. Debt is risk-free only if it is repaid in every state; whenever default is a real possibility the shortfall is correlated with the market, so betaD > 0 and it must be carried. It is not second-order (A) - 0.14 of missing rU compounds through a perpetuity. Option C has the direction backwards: carrying a positive betaD makes betaU HIGHER for a given betaE, not lower. And the error hits rU, rE and both WACCs, not just the after-tax one (D). This was tested directly in 2017H MC6 and H2025 Exercise 4(a)."
  },
  {
    "id": "q41",
    "ch": 4,
    "oppg": 2,
    "type": "mcq",
    "q": "After a recapitalisation you keep the OLD rD by mistake, relever with it, and both consistency checks (pre-tax WACC = rU, and the weighted betas = betaU) still pass. What does that tell you?",
    "options": [
      "The answer must be right, since both checks passed",
      "The checks only verify that rE, rD and rU hang together algebraically; they cannot detect a wrong INPUT such as a stale borrowing rate",
      "The checks were applied incorrectly",
      "Consistency checks are useless and should be skipped"
    ],
    "answer": 1,
    "explanation": "Checks 1 and 2 are redundant computations of a number you already have: they confirm internal algebraic consistency, nothing more. Feed in rD = 4.5000% after leverage has doubled and you get betaE = 2.10 and rE = 13.5000%, and 0.5(0.1350) + 0.5(0.0450) = 9.0000% = rU passes cleanly on a wrong answer. So A is exactly the false comfort the chapter warns about. The checks were applied correctly (C). And they remain worth the two minutes (D) - they catch weights, rates and the (1 - tau_c) slip - but if the question says the borrowing rate rises with leverage, you must use the new rate; no identity will rescue you."
  },
  {
    "id": "q42",
    "ch": 4,
    "oppg": 2,
    "type": "short",
    "q": "Explain why leverage raises rE but leaves rU unchanged, and why that makes the twin-firm method valid.",
    "model": [
      "rU is a property of the assets. Leverage does not change the cash flows the assets produce, and does not change how risky those cash flows are - it only changes who receives them first. Slicing a cake into a safe slice and a risky slice does not change the cake.",
      "Debt holders are paid first, so their claim absorbs little of the swing in firm value. Whatever swing the assets produce therefore lands almost entirely on equity, and equity is now a smaller base: same absolute risk, smaller slice, so more risk per krone of equity, hence a higher required return.",
      "The rise in rE is exactly large enough that the weighted average stays at rU. That is the whole content of MM Proposition II, rE = rU + (D/E)(rU - rD), and it is why the pre-tax WACC is dead flat in leverage while only the after-tax WACC slopes down - and it slopes down solely because interest is deductible, not because business risk fell.",
      "Validity of the twin-firm method: two firms in the same business share rU even when their debt ratios differ wildly. So you can lift business risk from a listed comparable, strip its financing off to reach betaU and rU, and bolt your own financing on. betaU and rU are the only quantities that legitimately cross between the two balance sheets."
    ]
  },
  {
    "id": "q43",
    "ch": 4,
    "oppg": 2,
    "type": "mcq",
    "q": "Which values must be used for E and D in every weight in this chapter?",
    "options": [
      "Book values from the balance sheet, because they are audited",
      "Market values - share price times share count for E; debt is usually close enough to book, but say so explicitly if you rely on it",
      "The average of book and market values",
      "Whichever produces a D/V closest to the industry average"
    ],
    "answer": 1,
    "explanation": "Every weight is a market value. If the exam gives a share price and a share count, multiply them: that is E. Book equity is a historical accounting residual that can differ from market equity by a factor of several, and using it propagates into betaU, rU, rE and both WACCs. Being audited (A) makes book equity reliable as history, not as a valuation. Averaging (C) and matching an industry benchmark (D) are inventions with no basis in the theory - the weights must reflect the actual claims investors hold today."
  },
  {
    "id": "q44",
    "ch": 4,
    "oppg": 2,
    "type": "short",
    "q": "When may you set betaD = 0, where does a positive betaD come from, and what does carrying it do to the unlevering?",
    "model": [
      "Permission: set betaD = 0 only when the question states that the debt is risk-free, or gives you no way to find betaD. As soon as you are told the firm's debt has an expected return above rf, its beta is positive and must appear in the weighting.",
      "Source: debt is risk-free only if it is repaid in every state of the world. In bad states - and bad states for the whole economy in particular - a levered firm may not repay in full. That shortfall is correlated with the market, so it is systematic risk, and systematic risk carries a beta. A positive betaD is therefore the normal case whenever leverage makes default a real possibility, not an exotic special case.",
      "Effect on the unlevering: debt now carries part of the business risk, so a given betaE implies a HIGHER betaU than it would under betaD = 0. Numerically, with betaE = 1.7333 and E/V = 0.60, betaD = 0.5000 gives betaU = 1.2400 while betaD = 0 gives only 1.0400 - and rU falls from 9.4400% to 8.2400%, inflating the whole valuation.",
      "Compute it the right way round: betaD = (rD - rf)/(E[Rmkt] - rf), using the EXPECTED return on debt, never the promised yield (see chapter 5). Tested directly in 2017H MC6 and H2025 Exercise 4(a)."
    ]
  },
  {
    "id": "q45",
    "ch": 5,
    "oppg": 3,
    "type": "mcq",
    "q": "A one-year zero-coupon bond with face value 1 000 trades at 940. Its promised yield is:",
    "options": [
      "6.0000%",
      "6.3830%",
      "5.6000%",
      "6.3830% only if there is no default risk"
    ],
    "answer": 1,
    "explanation": "y = F/P - 1 = 1 000/940 - 1 = 0.063830 = 6.3830%. Option A computes the discount as a percentage of face (60/1 000) rather than of what you paid. Option C is a plausible-looking expected return, not the yield. Option D attaches a false condition: the PROMISED yield is defined by the price and the promised payment regardless of default risk - default risk is precisely why the promised yield exceeds the expected return, and separating the two is what this chapter is about."
  },
  {
    "id": "q46",
    "ch": 5,
    "oppg": 3,
    "type": "mcq",
    "q": "That same bond has a 5% default probability with a 35% recovery rate. Using the course formula, the expected return on the debt is:",
    "options": [
      "6.3830%",
      "3.1330%",
      "2.9255%",
      "5.8830%"
    ],
    "answer": 1,
    "explanation": "L = 1 - R = 0.65, so p x L = 0.05 x 0.65 = 0.0325, and rD = y - p x L = 0.063830 - 0.032500 = 0.031330 = 3.1330%. Option A is the promised yield, which is a best case and not an average. Option C is the exact cash-flow route, [0.95(1 000) + 0.05(350)]/940 - 1 = 2.9255%; both are defensible if you SAY which you used, and the gap of 0.2074 percentage points is exactly p x L x y, because the course formula applies the loss rate to the amount invested while the exact route applies it to the promised payment, which is (1 + y) times larger. Option D uses p alone and forgets the recovery rate."
  },
  {
    "id": "q47",
    "ch": 5,
    "oppg": 3,
    "type": "mcq",
    "q": "Which rate belongs in the WACC, and why?",
    "options": [
      "The promised yield y, because that is what the firm contracts to pay",
      "The expected return rD, because the WACC averages what investors expect to earn - the promised yield is the return in the states where nothing goes wrong",
      "The risk-free rate, because default risk is diversifiable",
      "The coupon rate, because it is fixed by contract"
    ],
    "answer": 1,
    "explanation": "The WACC is a weighted average of expected returns, since that is what the firm's cash flows must cover on average. Using y (A) inflates the discount rate and undervalues the firm, and the error grows with credit risk - in the worked case, using y = 8.4000% instead of rD = 5.4000% pushes the pre-tax WACC from 8.2750% to 9.4750%, an overstatement of 1.2000 percentage points and roughly a 9% valuation error on a perpetuity. Option C is wrong because default clusters in bad states for the whole economy, which is systematic. Option D confuses a contract term with a market outcome."
  },
  {
    "id": "q48",
    "ch": 5,
    "oppg": 3,
    "type": "mcq",
    "q": "A bond yields 7.2% while rf = 2.0%. Default probability is 4% with loss given default 70%. The credit spread splits into:",
    "options": [
      "5.2000 pp of spread = 2.8000 pp expected loss + 2.4000 pp risk premium; rD = 4.4000%",
      "5.2000 pp of spread, all of it risk premium; rD = 7.2000%",
      "2.8000 pp of spread = the whole risk premium; rD = 2.0000%",
      "5.2000 pp of spread = 4.0000 pp expected loss + 1.2000 pp risk premium"
    ],
    "answer": 0,
    "explanation": "Spread = y - rf = 5.2000 pp. Expected loss = p x L = 0.04 x 0.70 = 2.8000 pp, which is not a premium at all - it is money the lender simply does not expect to receive, so it is subtracted on the way from y to rD = 4.4000%. The remaining 2.4000 pp is genuine compensation for bearing systematic default risk, and only that block belongs in a beta. Option B reads the whole spread as premium, the most common error in this material. Option C throws away the premium. Option D uses p alone as the loss rate and ignores the 30% that is never recovered anyway."
  },
  {
    "id": "q49",
    "ch": 5,
    "oppg": 3,
    "type": "short",
    "q": "Distinguish the promised return from the expected return on debt, give the course formula, and say why the exam awards marks for the distinction itself.",
    "model": [
      "The promised yield y is the single discount rate that reconciles today's price with the promised payments: P = F/(1 + y)^n for a zero. It is the return you earn if, and only if, every promised krone arrives - a best case, not an average.",
      "The expected return rD is what investors expect to receive on average once default is allowed for. With default probability p and loss given default L = 1 - R, the expected payment is F[1 - pL], and the course writes rD = y - p x L. This is NOT on the formula sheet; memorise it. rD is always at most y, with equality only when p = 0 or L = 0.",
      "The credit spread y - rf contains two economically different blocks: the expected loss pL, which is compensation for nothing, and the true risk premium rD - rf, which the CAPM prices as betaD(E[Rmkt] - rf). Never compute betaD from the yield - compute rD first, then betaD = (rD - rf)/(E[Rmkt] - rf).",
      "The exam awards marks for the distinction because it decides whether the WACC is right: the WACC averages expected returns, so y in the WACC inflates the discount rate and undervalues the firm, badly so for junk credits. Write the words 'promised' and 'expected' next to your two numbers - 2021 MC7-9 and V2024 Problem 3 marked exactly that."
    ]
  },
  {
    "id": "q50",
    "ch": 5,
    "oppg": 3,
    "type": "mcq",
    "q": "A firm's bonds have a promised yield of 8.0% and rf = 2.5%, with a market risk premium of 5.5%. Expected default losses are 2.0 percentage points per year. betaD is:",
    "options": [
      "1.0000, from (0.0800 - 0.0250)/0.0550",
      "0.6364, from (0.0600 - 0.0250)/0.0550",
      "0.3636, from (0.0800 - 0.0600)/0.0550",
      "Zero, because debt is a fixed claim"
    ],
    "answer": 1,
    "explanation": "First strip the expected loss: rD = y - pL = 0.0800 - 0.0200 = 0.0600. Then betaD = (rD - rf)/(E[Rmkt] - rf) = (0.0600 - 0.0250)/0.0550 = 0.6364. Option A computes beta from the PROMISED yield, treating the whole spread as a risk premium and overstating betaD by more than half - which then overstates betaU and every downstream rate. Option C prices the expected-loss block, which is compensation for nothing and carries no beta. Option D is the reflex that debt is risk-free; a fixed claim is only risk-free if it is always paid in full."
  },
  {
    "id": "q51",
    "ch": 5,
    "oppg": 3,
    "type": "mcq",
    "q": "A 5-year bond has face value 1 000 and a 5% annual coupon. The market yield is 6.5%. Its price is:",
    "options": [
      "1 000.0000, because a bond always trades at face at issue",
      "937.6648, a discount, because the coupon rate is below the yield",
      "1 044.5182, a premium, because coupons are certain",
      "The price cannot be determined without knowing the recovery rate"
    ],
    "answer": 1,
    "explanation": "P = 50 x [1 - 1.065^-5]/0.065 + 1 000/1.065^5 = 50 x 4.155679 + 729.8808 = 207.7840 + 729.8808 = 937.6648. The coupon rate is a contract term that fixes the krone amount; the yield is a market outcome. When the market demands more than the coupon rate, the only way for the bond to compete is to be cheap, so it trades at a discount. Option A confuses par issuance with market pricing after rates move. Option C is the price at a 4% yield and has the direction backwards. Option D is false: the yield already embeds whatever the market believes about default, which is why y is a PROMISED return."
  },
  {
    "id": "q52",
    "ch": 5,
    "oppg": 3,
    "type": "mcq",
    "q": "For the bond in q45 (P = 940, F = 1 000, rf = 2.5%, L = 0.65), the risk-neutral default probability q is 5.6154%, while the true probability is 5.0000%. Why is q the larger number?",
    "options": [
      "Because analysts systematically underestimate default",
      "Because discounting at rf pushes all the risk adjustment into the probability, so bad states are deliberately overweighted",
      "Because q includes the recovery rate and p does not",
      "Because q is measured over a longer horizon"
    ],
    "answer": 1,
    "explanation": "q solves P = F[1 - qL]/(1 + rf): [1 - 940(1.025)/1 000]/0.65 = 0.0524/0.65 = 0.056154. Since the expected payment is discounted at the RISK-FREE rate rather than at a rate above it, the compensation for risk has to enter somewhere else - and it enters by overweighting the states where default happens. Default clusters in bad states, and a krone in a bad state is worth more to investors, so q exceeds p. It is a pricing device, not a forecast, and that is why real probabilities never appear in binomial option pricing in k22. Option A confuses a pricing convention with a forecasting bias; both q and p use the same L (C) and the same horizon (D)."
  },
  {
    "id": "q53",
    "ch": 5,
    "oppg": 3,
    "type": "short",
    "q": "You are given a bond price and a credit assumption, and three sub-questions later you need a WACC. Set out the route, and name the error the examiner is watching for.",
    "model": [
      "Step 1 - promised yield from the price: for a zero, y = (F/P)^(1/n) - 1; for a coupon bond, solve P = C x annuity factor + F/(1+y)^n by interpolating between two brackets and SAY that you interpolated.",
      "Step 2 - expected return: rD = y - p x L, with L = 1 - R. Write 'promised' next to y and 'expected' next to rD.",
      "Step 3 - debt beta from the EXPECTED return: betaD = (rD - rf)/(E[Rmkt] - rf).",
      "Step 4 - rU from betaU via the CAPM, then relever to your own D/E: betaE = betaU + (D/E)(betaU - betaD), and rE by the CAPM.",
      "Step 5 - WACC: pre-tax = [E/V]rE + [D/V]rD, which must equal rU; after-tax = [E/V]rE + [D/V]rD(1 - tau_c).",
      "The error being watched for is putting the promised yield y into the WACC or into betaD. In the worked case that turns a pre-tax WACC of 8.2750% into 9.4750% - 1.2000 percentage points too high, roughly a 9% valuation error on a perpetuity. Close with both checks: pre-tax WACC = rU, and [E/V]betaE + [D/V]betaD = betaU."
    ]
  },
  {
    "id": "q101",
    "ch": 6,
    "oppg": 1,
    "type": "mcq",
    "q": "Of the three perfect-market conditions behind MM Proposition I, the one that does most of the work is:",
    "options": [
      "No taxes and no issuance costs",
      "Asset cash flows are independent of the financing mix",
      "Firms and investors trade the same securities at the same prices, so an investor can build homemade leverage",
      "All investors have the same risk preferences"
    ],
    "answer": 2,
    "explanation": "If you can borrow on the firm's terms, you can lever an unlevered share yourself: buy it and fund part with a personal loan. No firm can charge for a service you can perform for free, which is what kills the value gap. A and B are genuine assumptions but they are removed later (taxes in k7, financing affecting investment in k9-k11) and the propositions survive the arbitrage argument in the meantime. D is not an MM assumption at all: the result is enforced by trade, not by preferences, which is precisely why it does not depend on what investors happen to like."
  },
  {
    "id": "q102",
    "ch": 6,
    "oppg": 1,
    "type": "mcq",
    "q": "rU = 9.00%, rD = 5.00% and the firm runs at D/E = 1.5000. MM Proposition II gives rE =",
    "options": [
      "15.0000%",
      "11.4000%",
      "16.5000%",
      "3.0000%"
    ],
    "answer": 0,
    "explanation": "rE = rU + (D/E)(rU - rD) = 0.0900 + 1.5000(0.0900 - 0.0500) = 0.0900 + 0.0600 = 0.1500. Option B substitutes D/V = 1.5/2.5 = 0.6000 into a formula that takes D/E, the single commonest slip on this line; it also fails the check, since 0.4(0.1140) + 0.6(0.0500) = 0.0756, not rU. Option C adds rD instead of the spread (0.09 + 1.5 x 0.05). Option D reverses the spread to (rD - rU) and produces a cost of equity below the cost of debt, which is impossible for a levered firm."
  },
  {
    "id": "q103",
    "ch": 6,
    "oppg": 1,
    "type": "mcq",
    "q": "An all-equity firm has 25 million shares at 40.00, so E = 1000. It issues 400 of risk-free perpetual debt at rD = 5.00% and repurchases shares. No taxes. What happens?",
    "options": [
      "It buys 10.0000 million shares at 40.00, leaving 15.0000 million, and the price stays at 40.00",
      "It buys 10.0000 million shares, but the price then falls to 33.33 because the remaining equity is riskier",
      "It buys 16.6667 million shares, because the repurchase executes at the ex-dividend price of 24.00",
      "It buys 8.0000 million shares, because the announcement lifts the price to 50.00"
    ],
    "answer": 0,
    "explanation": "With no taxes and no costs there is no news at the announcement, so V stays 1000 and the price stays 40.00: n = 400/40.00 = 10.0000 million, N1 = 15.0000 million and E1 = 1000 - 400 = 600, giving 600/15 = 40.00. Option B is the standard misreading of MM II: rE does rise, from 10.0000% to 13.3333%, but it rises exactly enough to compensate for the extra risk, so the price does not move. Option C imports the ex-dividend price of the special-dividend route, which belongs to a different transaction. Option D imports the announcement jump of k7, which needs a tax shield; here there is none."
  },
  {
    "id": "q104",
    "ch": 6,
    "oppg": 1,
    "type": "mcq",
    "q": "Same firm (25 million shares at 40.00, rU = 10.00%, FCF = 100), but the 400 of new debt is paid out as a special dividend instead. The ex-dividend price and the ongoing dividend per share are:",
    "options": [
      "24.00 and 3.20",
      "40.00 and 3.20",
      "24.00 and 5.3333",
      "16.00 and 4.00"
    ],
    "answer": 0,
    "explanation": "DPS_special = 400/25 = 16.00, so the ex-dividend price is 40.00 - 16.00 = 24.00 on an unchanged 25 million shares, and 25 x 24.00 = 600 = E1. Interest is 0.05 x 400 = 20, leaving 80 for equity, so the ongoing DPS is 80/25 = 3.20, and 3.20/0.133333 = 24.00 confirms it. Option B leaves the price at 40.00, which is the repurchase route's answer. Option C pairs the right price with the repurchase route's DPS of 80/15 = 5.3333. Option D reports the dividend itself as the price."
  },
  {
    "id": "q105",
    "ch": 6,
    "oppg": 1,
    "type": "mcq",
    "q": "After a leveraged recapitalisation the cost of equity has risen from 10.0000% to 13.3333%. The correct interpretation is:",
    "options": [
      "Shareholders are worse off, because their required return rose",
      "The rise exactly compensates for the extra risk equity now bears, so the share price does not move",
      "The firm's weighted average cost of capital has risen by the same amount",
      "The firm should reverse the recapitalisation to bring rE back down"
    ],
    "answer": 1,
    "explanation": "Every recapitalisation raises rE, and every year candidates read that as bad news. Equity now stands behind a fixed interest claim, so its cash flow is more volatile and the market prices that; the dividend per share rises in exactly the ratio needed to leave the price unchanged (80/15 = 5.3333 discounted at 13.3333% is 40.00). Option C is wrong twice over: the pre-tax WACC is flat at rU by construction, since the weights shift towards the cheaper claim by exactly as much as rE climbs. Option D would be a recommendation to undo a transaction that changed nothing."
  },
  {
    "id": "q106",
    "ch": 6,
    "oppg": 1,
    "type": "mcq",
    "q": "Under MM in a perfect market, at which moment can the share price move?",
    "options": [
      "At execution, when the debt is issued and the shares are bought",
      "At the announcement, because that is when information reaches the market - and under MM the announcement carries no news, so nothing moves at either date",
      "At both dates, in proportion to the amount of debt issued",
      "On the record date, when the register is read"
    ],
    "answer": 1,
    "explanation": "The announcement is the only moment a price can jump, because it is the only moment information arrives; execution merely swaps cash for securities at prices already set. Under MM the announcement carries no news, so nothing moves at either date, and the composition of a shareholder's wealth changes while its size does not. Option A has the logic backwards. Option C would make the price a function of leverage, which is what Proposition I denies. Option D confuses the payout calendar of k15, where the record date is explicitly not a price event."
  },
  {
    "id": "q107",
    "ch": 6,
    "oppg": 1,
    "type": "mcq",
    "q": "Firm U is all-equity and worth 1200; identical Firm L has 500 of risk-free perpetual debt at 4.00% plus equity of 800, so V^L = 1300. Both sets of assets pay 120 a year forever. Trading 1% of each, the arbitrage profit today is:",
    "options": [
      "1.00, with a net cash flow of zero in every year thereafter",
      "1.00 today plus 0.20 a year forever",
      "Zero, because L's higher cost of equity justifies the higher value",
      "13.00, the value of 1% of Firm L"
    ],
    "answer": 0,
    "explanation": "Short 1% of L's equity (+8.00), borrow 1% of L's debt level at 4.00% (+5.00), buy 1% of U (-12.00): net +1.00 today, which is 1% of the 100 mispricing. Each year afterwards you receive 0.01 x 120 = 1.20 from U, pay 0.04 x 5.00 = 0.20 of interest and owe the short 0.01 x 100 = 1.00, netting exactly zero in every state. Option B would mean a money pump, and it appears when the personal loan is sized wrongly - borrow the wrong amount and step three stops cancelling, which is the line to verify. Option C confuses the implied rE of 100/800 = 12.5000% with a reason for a higher firm value: the higher rE is the consequence of leverage, not a source of value. Option D reports a position size as a profit."
  },
  {
    "id": "q108",
    "ch": 6,
    "oppg": 1,
    "type": "short",
    "q": "State MM Proposition II, derive it in two lines from the definition of rU, and say what its slope and intercept are.",
    "model": [
      "Start from the definition of the unlevered cost of capital as the weighted average of what the firm's claims require: rU = (E/V)rE + (D/V)rD. That is the pre-tax WACC, and it is an identity about how a fixed pot of cash flow is shared.",
      "Multiply through by V = E + D: (E + D)rU = E x rE + D x rD. Solve for rE: E x rE = (E + D)rU - D x rD = E x rU + D(rU - rD), so rE = rU + (D/E)(rU - rD).",
      "It is a straight line in D/E with intercept rU and slope (rU - rD). With rU = 8.0000% and risk-free debt at 4.0000%, rE gains 4 percentage points per unit of D/E.",
      "Read the geometry back as economics: rE rises, rD stays flat, and the weights shift towards debt at exactly the rate that keeps the average pinned at rU. That flat average line IS Proposition I. If rD itself starts rising at high leverage, debt holders begin absorbing business risk and rE climbs more gently, but the average is still rU.",
      "Consistency check to write out: (E/V)rE + (D/V)rD must return rU. If it does not, a weight is wrong or D/V has been substituted where D/E belongs."
    ]
  },
  {
    "id": "q109",
    "ch": 6,
    "oppg": 1,
    "type": "short",
    "q": "A firm with 25 million shares at 40.00 issues 400 of risk-free perpetual debt at 5.00% and repurchases shares; rU = 10.00% and FCF = 100, all paid out. Compare a shareholder who sold into the buyback with one who held, and with one at a firm that did nothing.",
    "model": [
      "The three positions, each starting from one share worth 40.00. No recapitalisation: a share paying 100/25 = 4.00 forever, discounted at rU = 10.0000%, worth 40.00. Sold into the buyback: 40.00 in cash. Held through it: after the recap D/E = 400/600 = 0.6667, so rE = 0.1000 + 0.6667(0.1000 - 0.0500) = 0.1333, interest is 20, equity receives 80 on 15 million shares, DPS = 5.3333, and 5.3333/0.133333 = 40.00.",
      "All three are worth exactly 40.00. The seller did not beat the holder, and the recapitalisation did not beat doing nothing.",
      "Say WHY, do not merely say that: no taxes and no issuance costs, so the transaction is purely financial and MM Proposition I applies. The examiner marks the reason.",
      "The check that can actually fail is discounting the NEW dividend per share at the NEW rE, because neither number entered the price when you computed it. Forget to relever and you discount 5.3333 at 10.0000%, get 53.33, and the clash tells you which step was wrong. P = E1/N1 cannot fail, since n was defined as 400/P, so it re-divides what you already assumed.",
      "Close with the sentence the key rewards: leverage divided the cash flow, it did not enlarge it, so every shareholder is equally well off whichever side of the transaction he took."
    ]
  },
  {
    "id": "q110",
    "ch": 7,
    "oppg": 1,
    "type": "mcq",
    "q": "A firm states that it maintains a constant debt-to-equity ratio. Its interest tax shield should be discounted at:",
    "options": [
      "rD, because the shield comes out of the interest payments",
      "rU, because rebalancing makes next year's debt move with firm value, so the shield carries asset risk",
      "The after-tax WACC, because that is the rate used for levered cash flows",
      "rf, because the tax authority is a risk-free counterparty"
    ],
    "answer": 1,
    "explanation": "Under a target ratio the firm borrows more when it is worth more and repays when it is worth less, so future debt is unknown today and moves with the assets. A cash flow with asset risk gets the asset rate, rU. Option A is right only for fixed permanent debt, where D is a contract number and only default can stop the shield; applying it under rebalancing overstates value and breaks the WACC-equals-APV check. Option C double-counts: the after-tax WACC already contains the shield through the (1 - tau_c) factor, so discounting the shield with it counts the same benefit twice. Option D confuses who pays the tax with how risky the deduction is: the amount deducted depends on the firm's own interest bill, which is not risk-free."
  },
  {
    "id": "q111",
    "ch": 7,
    "oppg": 1,
    "type": "mcq",
    "q": "V^U = 800, D = 200 permanent at rD = 6.00%, rU = 10.00%, tau_c = 25%. Now suppose instead that the firm rebalances to a constant D/E while keeping D at 200. PV(TS) under the two policies is:",
    "options": [
      "50.0000 permanent and 30.0000 rebalanced",
      "50.0000 under both, since the annual shield is the same",
      "30.0000 permanent and 50.0000 rebalanced",
      "12.5000 permanent and 7.5000 rebalanced"
    ],
    "answer": 0,
    "explanation": "The annual shield is tau_c x rD x D = 0.25 x 0.06 x 200 = 3.0000 under either policy. Permanent debt discounts it at rD: 3.0000/0.06 = 50.0000 = tau_c x D. Rebalancing discounts the same 3.0000 at rU: 3.0000/0.10 = 30.0000. Option B is the error the chapter warns about - the cash flow is identical, the risk is not, and the risk is what sets the rate. Option C reverses the two rates, which always makes the rebalancing firm look more valuable than the fixed-debt one; since rU exceeds rD the permanent case must be worth more. Option D applies tau_c to the shield a second time."
  },
  {
    "id": "q112",
    "ch": 7,
    "oppg": 1,
    "type": "mcq",
    "q": "The shortcut V^L = V^U + tau_c x D is valid:",
    "options": [
      "For any firm with debt outstanding",
      "Only for debt that is fixed in amount and never repaid, since only then does rD cancel out of PV(TS) = tau_c x rD x D / rD",
      "Only when the debt is risk-free",
      "For any firm whose tax rate is constant"
    ],
    "answer": 1,
    "explanation": "The shortcut is the permanent-debt case with the discount rate cancelled: a level perpetuity of tau_c x rD x D discounted at rD leaves tau_c x D, and rD disappears, which is why it looks so simple. Applied to a firm that rebalances to a target ratio it overstates value - 850 instead of 830 on the numbers of the chapter - and it breaks consistency check 1. Option C is close but not the condition: fixed permanent debt that is mildly risky still discounts at rD; what matters is that the amount is a contract number, not that default is impossible. Option D confuses a constant rate with a constant debt level."
  },
  {
    "id": "q113",
    "ch": 7,
    "oppg": 1,
    "type": "mcq",
    "q": "An all-equity firm worth 900 on 30 million shares announces a permanent issue of 300 of risk-free debt at 5.00% to fund a repurchase; tau_c = 22%. The number of shares repurchased is:",
    "options": [
      "10.0000 million, at the pre-announcement price of 30.00",
      "9.3168 million, at the post-announcement price of 32.20",
      "9.0909 million, at the post-repurchase price of 33.00",
      "8.9552 million, at a price of 33.50"
    ],
    "answer": 1,
    "explanation": "PV(TS) = 0.22 x 300 = 66, so V^L = 966 and the price jumps at once to 966/30 = 32.20, a rise of 2.20 = 66/30. The buyback executes at that price: n = 300/32.20 = 9.3168 million, leaving 20.6832 million, and E1 = 966 - 300 = 666 gives 666/20.6832 = 32.20. Option A uses the stale price, which is the standard way to lose this sub-question: it implies 666/20 = 33.30, so the share would have two prices after one transaction. Options C and D invent later prices; there is no second jump, because the debt issue itself is zero NPV to the lenders and adds no information."
  },
  {
    "id": "q114",
    "ch": 7,
    "oppg": 1,
    "type": "mcq",
    "q": "In the recapitalisation above, who captures the 66 of tax shield?",
    "options": [
      "The new lenders, who financed it",
      "The pre-announcement shareholders, seller and holder alike, because value moves when the information moves",
      "Only the shareholders who hold through the repurchase",
      "It is split between shareholders and the tax authority"
    ],
    "answer": 1,
    "explanation": "New lenders hand over 300 and receive a claim worth 300 at a fair rD, so their NPV is zero and they gain nothing. The shield accrues to whoever owns the firm at the moment the plan becomes credible, and both the seller (who receives 32.20 in cash) and the holder (whose share is worth 32.20) are in that group. Option C is the frequent guess and it contradicts the arithmetic: the price had already risen before anyone tendered. Option D reverses the mechanism - the whole point is that the government's claim shrinks, so it is the tax authority that loses the 66."
  },
  {
    "id": "q115",
    "ch": 7,
    "oppg": 1,
    "type": "mcq",
    "q": "The same firm borrows 200 at rD = 6.00% with tau_c = 25%, but the debt will be repaid in full after one year. PV(TS) is:",
    "options": [
      "50.0000",
      "30.0000",
      "2.8302",
      "3.0000"
    ],
    "answer": 2,
    "explanation": "One shield of tau_c x rD x D = 0.25 x 0.06 x 200 = 3.0000 arrives at the end of year 1, and it is as safe as the debt itself, so PV(TS) = 3.0000/1.06 = 2.8302. Option A capitalises a single payment as a perpetuity, the classic overstatement, and option B does the same at rU. Option D forgets to discount at all - the shield arrives at date 1, not date 0. Read the sentence describing the debt before choosing a formula: 'repaid after one year' is a schedule, not a perpetuity."
  },
  {
    "id": "q116",
    "ch": 7,
    "oppg": 1,
    "type": "mcq",
    "q": "A firm with V^U = 800 rebalances to a constant D/E with D = 200, rD = 6.00%, rU = 10.00%, tau_c = 25%, and unlevered FCF of 80 a year in perpetuity. Which number confirms that PV(TS) = 30.0000 rather than 50.0000?",
    "options": [
      "D + E = 830, which adds up either way",
      "The after-tax WACC route gives 850 exactly, since E = 650, D/E = 0.3077, rE = 11.2308% and rwacc = 9.6471%",
      "The after-tax WACC route gives 830 exactly, since E = 630, D/E = 0.3175, rE = 11.2698% and rwacc = 9.6386%",
      "Nothing confirms it; the choice of rate is a matter of taste"
    ],
    "answer": 2,
    "explanation": "V^L = 800 + 30 = 830, so E = 630 and D/E = 200/630 = 0.3175. Then rE = 0.1000 + 0.3175(0.1000 - 0.0600) = 0.1127, and rwacc = (630/830)(0.112698) + (200/830)(0.0600)(0.75) = 0.085542 + 0.010843 = 0.096386, giving 80/0.096386 = 830.00. That is consistency check 1 and it is a real second computation, because it never uses PV(TS). Option A is an identity: E was defined as V^L - D, so it cannot fail and proves nothing. Option B is what you get by assuming the answer: at V^L = 850 the same route returns rwacc = 9.6471% and 80/0.096471 = 829.27, not 850, so the claim is self-contradicting - which is exactly how the check exposes the wrong discount rate. Option D is the answer the keys punish hardest: the rate follows from the stated debt policy, and stating that policy in one line earns marks."
  },
  {
    "id": "q117",
    "ch": 7,
    "oppg": 1,
    "type": "short",
    "q": "State the rule for which rate discounts the interest tax shield, in all three cases the exam uses, and say in one line why each rate is the right one.",
    "model": [
      "Case 1 - constant D/E or D/V, rebalanced. Discount at rU. The firm borrows more when it is worth more and repays when it is worth less, so next year's debt is unknown today and moves with firm value; a cash flow carrying asset risk gets the asset rate.",
      "Case 2 - a fixed amount, permanent, never repaid. Discount at rD (or rf if the debt is risk-free). D is a contract number and the interest is known, so only default can interrupt the shield, and that is exactly the risk rD prices. This is the case that collapses to PV(TS) = tau_c x D.",
      "Case 3 - a known repayment schedule. Discount each year's shield at rD, period by period, for the same reason as case 2: each amount is contractual.",
      "This is a choice of assumption, not a choice of formula. Read the sentence describing the debt: 'maintains a debt-to-equity ratio of 25%' is rebalancing; '200 million of perpetual debt outstanding' is fixed. If the question is ambiguous, state the policy you assume in one line and then compute - that sentence earns marks.",
      "Write V^L = V^U + PV(TS) and say which rate you used. Neither the identity nor the rule is on the formula sheet, and the rule has been multiple choice in every mapped paper that had multiple choice."
    ]
  },
  {
    "id": "q118",
    "ch": 7,
    "oppg": 1,
    "type": "short",
    "q": "Explain why leverage can create value under corporate taxes even though the assets have not changed, and say who loses.",
    "model": [
      "In a perfect market the cash flow has two claimants, debt and equity, and dividing it differently cannot enlarge it - that is MM I. Corporate taxes add a third claimant, the government, and its slice depends on the financing mix, because interest is deductible from taxable profit and dividends are not.",
      "A firm paying rD x D of interest pays tau_c x rD x D less tax than an identical all-equity firm. That is a real cash flow to investors, and it is the whole of the gain: TS_t = tau_c x rD x D_t.",
      "So leverage creates no cash, it redirects a payment. What the government does not take is left for the firm's own investors, which is why V^L = V^U + PV(TS).",
      "Who loses is the tax authority, and only the tax authority. The new lenders hand over D and receive a claim worth D at a fair rD, so their NPV is zero. The gain therefore accrues to whoever owns the equity when the plan becomes credible - the pre-announcement shareholders, whether they later sell into the buyback or hold.",
      "The obvious follow-up, and the one the examiner asks next: if the shield always adds value, why is no firm entirely debt-financed? Because k8 subtracts expected distress costs and nets off the personal tax penalty on interest income."
    ]
  },
  {
    "id": "q119",
    "ch": 8,
    "oppg": 1,
    "type": "mcq",
    "q": "Direct and indirect costs of financial distress differ mainly in that:",
    "options": [
      "Direct costs are borne by creditors and indirect costs by shareholders",
      "Direct costs are close to a fixed fee and bite hardest on small firms, while indirect costs are behavioural, far larger, and mostly arrive before any court is involved",
      "Indirect costs are tax deductible and direct costs are not",
      "Direct costs are estimated at 10-20% of firm value and indirect costs at 3-4%"
    ],
    "answer": 1,
    "explanation": "Direct costs are lawyers, advisers, court and trustee fees and management time, typically 3-4% and roughly fixed in size, so they hurt small firms disproportionately. Indirect costs are what everyone dealing with the firm does the moment default looks likely - customers needing warranties leave, suppliers demand cash, staff leave, assets are fire-sold - and they are typically estimated at 10-20% and largely precede any formal proceeding. Option D has the two estimates swapped. Option A confuses the timing question with the type question: ex post both fall on creditors, ex ante both fall on shareholders. Option C invents a tax treatment that has nothing to do with the distinction."
  },
  {
    "id": "q120",
    "ch": 8,
    "oppg": 1,
    "type": "mcq",
    "q": "tau_c = 25%, the personal rate on equity income is tau_e = 20% and on interest income tau_i = 35%. The effective tax advantage of debt is:",
    "options": [
      "25.0000%",
      "7.6923%",
      "10.0000%",
      "40.0000%"
    ],
    "answer": 1,
    "explanation": "tau* = 1 - (1 - tau_c)(1 - tau_e)/(1 - tau_i) = 1 - (0.75 x 0.80)/0.65 = 1 - 0.60/0.65 = 1 - 0.923077 = 0.076923. One krone of pre-tax profit delivers 0.60 through the equity route and 0.65 through the debt route, so the debt route saves 0.05 on 0.65, which is 7.6923%. Option A ignores personal taxes entirely and is the number k7 would have used. Option C subtracts tau_e from tau_i as if the corporate layer did not exist. Option D adds rates. Note the direction: tau_i above tau_e drives tau* below tau_c, and a large enough personal penalty drives the advantage to zero."
  },
  {
    "id": "q121",
    "ch": 8,
    "oppg": 1,
    "type": "mcq",
    "q": "Bankruptcy costs are paid out of the assets, which creditors end up owning. Who actually bears them?",
    "options": [
      "Creditors, since it is their collateral that is consumed",
      "Shareholders, ex ante: creditors who expect to lose in some state pay less for the bond, so the firm raises less cash and the shortfall lands on the seller of the claim",
      "The court and the advisers, who are paid out of the estate",
      "Nobody, because bankruptcy only transfers ownership and MM says transfers are free"
    ],
    "answer": 1,
    "explanation": "The direction is fixed and it is worth writing down: ex post the costs fall on creditors, ex ante entirely on shareholders. Debt is sold at a fair price, so lenders who anticipate a loss in some state simply pay less today by the present value of that loss. Option A describes the ex post incidence and stops there, which is the half-answer the keys penalise. Option D is right that a transfer of ownership is free under MM and wrong that nothing else happens: the process consumes real resources, and only that deadweight part is a distress cost. Option C confuses who receives the money with who ends up poorer."
  },
  {
    "id": "q122",
    "ch": 8,
    "oppg": 1,
    "type": "mcq",
    "q": "Assets will be worth 300 or 120 in a year, equally likely under the risk-neutral probability, rf = 5.00%, and default consumes 20% of asset value. The firm has debt with face value 150. The present value of the distress cost is:",
    "options": [
      "11.4286",
      "24.0000",
      "28.5714",
      "51.4286"
    ],
    "answer": 0,
    "explanation": "Only the bad state defaults: 120 < 150, so the process burns 0.20 x 120 = 24.00 and creditors collect 96.00. The expected burn is 0.50 x 24.00 = 12.00, and PV = 12.00/1.05 = 11.4286. Confirm it from the other side: V^U = 210/1.05 = 200.00 while D = 123/1.05 = 117.1429 and E = 75/1.05 = 71.4286, so V^L = 188.5714 and the gap is 11.4286. Option B is the undiscounted state loss, and it is not probability-weighted either. Option D is the shortfall to creditors, 150 - 96 = 54 discounted - a transfer, not a cost. Option C mixes the two."
  },
  {
    "id": "q123",
    "ch": 8,
    "oppg": 1,
    "type": "mcq",
    "q": "In that same firm, the creditors promise 150 and pay 117.1429 for the bond. The 32.8571 difference is:",
    "options": [
      "A deadweight loss caused by the bankruptcy process",
      "The compensation creditors demand for the states in which they are not paid in full, which shows up as a promised yield of 28.0488% against a risk-free 5.00%",
      "The value of the tax shield on the debt",
      "The agency cost of debt"
    ],
    "answer": 1,
    "explanation": "The promised yield is 150/117.1429 - 1 = 0.280488, and the spread over rf is not profit: it is the price of a claim that pays 150 in one state and 96 in the other. Creditors gain exactly zero on the deal, since they pay 117.1429 for a claim worth 117.1429. Option A confuses the discount with the deadweight loss, which is only the 11.4286 that nobody receives. Option C is a different chapter's term entirely and this example has no taxes. Option D belongs to k9 and k10, where the loss comes from a decision, not from the bankruptcy process."
  },
  {
    "id": "q124",
    "ch": 8,
    "oppg": 1,
    "type": "mcq",
    "q": "A firm has V^U = 500 and tau* = 12.00%. PV(financial distress) is 0 at D = 0, 2 at 100, 7 at 200, 16 at 300 and 30 at 400. The optimal debt level is:",
    "options": [
      "D = 200, where V^L = 517",
      "D = 300, where V^L = 520",
      "D = 400, where V^L = 518",
      "D = 100, where the marginal distress cost is smallest"
    ],
    "answer": 1,
    "explanation": "Compute differences, not levels. Each extra 100 of debt buys 0.12 x 100 = 12 of shield. It costs 2, then 5, then 9, then 14. Take every step whose marginal cost is below 12 and stop at the first one that is not: 14 > 12, so stop at 300, where V^L = 500 + 36 - 16 = 520. Option A stops one step early and leaves 3 of value on the table; option C takes one step too many and gives 2 of it back. Option D is the rule misread as 'minimise the cost' rather than 'equate cost with benefit at the margin' - at D = 100 the marginal shield still exceeds the marginal cost by 10, so the firm should borrow more."
  },
  {
    "id": "q125",
    "ch": 8,
    "oppg": 1,
    "type": "mcq",
    "q": "Ignoring personal taxes in a trade-off calculation typically:",
    "options": [
      "Has no effect, because personal taxes wash out in equilibrium",
      "Overstates the marginal benefit of debt, pushing the computed optimum to too much leverage and overstating firm value",
      "Understates the benefit of debt, because personal taxes on equity are usually higher",
      "Changes the distress schedule but not the optimum"
    ],
    "answer": 1,
    "explanation": "tau* REPLACES tau_c and is normally smaller, because interest is taxed more heavily in the investor's hands than equity income is - capital gains are taxed only on realisation. Using tau_c = 22% instead of tau* = 16% in the chapter's example makes each 50 of debt appear to buy 11.00 of shield rather than 8.00, and against the same distress schedule the apparent optimum moves from 150 to 250, with value overstated by 11.50. Option C reverses the usual inequality. Option A is what would be true if tau_i equalled tau_e. Option D is wrong because the schedule is an input; it is the benefit line that moves."
  },
  {
    "id": "q126",
    "ch": 8,
    "oppg": 1,
    "type": "short",
    "q": "A firm defaults with assets worth 120 against debt of face value 150, and the process consumes 20% of asset value. Which part of that is a distress cost, and which is not? Explain the distinction and why it matters.",
    "model": [
      "The distress cost is 0.20 x 120 = 24.00 and nothing else. That is the deadweight loss: value that leaves the firm entirely and is received by nobody inside it.",
      "The 54.00 shortfall - creditors promised 150 and collecting 96 - is a TRANSFER. It moves from creditors to nobody in particular; it is simply the part of the promise the assets could not cover. Subtracting it as a cost is the error the chapter names explicitly, and it double-counts massively.",
      "The test is conservation. Consistency check 3 says creditors' gain plus shareholders' gain equals the NPV of the decision, and consistency check 4 says the two are equal and opposite when total value is fixed. Here total value is NOT fixed, because 24.00 was burned, so check 4 correctly fails while check 3 still holds.",
      "Why it matters for a mark: V^L = V^U + PV(TS) - PV(distress costs) has the deadweight term in it, and only the deadweight term. Put the transfer in and you would conclude that any risky debt destroys enormous value, which is false - fairly priced debt with no bankruptcy costs destroys nothing.",
      "Say the incidence out loud too: ex post the 24.00 falls on creditors, ex ante entirely on shareholders, because creditors price the expected loss into what they pay for the bond today."
    ]
  },
  {
    "id": "q127",
    "ch": 8,
    "oppg": 1,
    "type": "short",
    "q": "You have just computed a tax shield and the examiner asks why the firm does not simply double its debt. Write the answer.",
    "model": [
      "Frame it as the identity: V^L = V^U + PV(TS) - PV(distress costs), so the question is whether the next krone of debt buys more shield than it adds expected deadweight loss.",
      "Name both cost types. Direct costs - lawyers, advisers, court and trustee fees, management time - are close to a fixed fee, typically 3-4% of value. Indirect costs - customers leaving, suppliers demanding cash, staff departing, assets fire-sold, projects shelved - are behavioural, far larger at 10-20%, and most of them arrive before any court is involved.",
      "Separate deadweight loss from transfer: only value that leaves the firm entirely counts, never the shortfall between what creditors were promised and what they collect.",
      "State the incidence: creditors price the expected loss, so they pay less for the bond today, so the firm raises less cash and shareholders bear the cost ex ante. That is why a firm restrains its own leverage without anyone forcing it to.",
      "Close with the marginal condition rather than a slogan: borrow while tau* exceeds the increase in PV(distress) per krone of debt. Add that the benefit line is linear and the cost curve convex, which is what makes the optimum interior, and that personal taxes lower the benefit line from tau_c to tau*, which lowers the optimum further.",
      "One sentence on cross-section, since it is nearly always the follow-up: distress is expensive for intangible-heavy firms with growth options and cheap for firms holding redeployable tangible assets, which is why shipping and property borrow and biotech does not."
    ]
  },
  {
    "id": "q128",
    "ch": 9,
    "oppg": 2,
    "type": "mcq",
    "q": "Limited liability makes the equity claim E = E[max(CF - K, 0)]. The consequence for a levered firm's project choice is:",
    "options": [
      "Shareholders become more cautious, because they are paid last",
      "The payoff is convex, so a mean-preserving spread raises equity value: the upside is collected in full while the downside is capped at zero",
      "Shareholders are indifferent to risk, because expectations pass through the max operator",
      "Creditors capture the upside, so shareholders prefer safe projects"
    ],
    "answer": 1,
    "explanation": "Push the good state up and the shareholder collects every krone of it; push the bad state below K and he gains nothing extra, being already at zero. That asymmetry is Jensen's inequality, and it is the whole mechanism - name it risk shifting or asset substitution. Option A confuses being paid last with being risk averse; being paid last is exactly what creates the option. Option C is true only when the debt is risk-free, because then equity is linear in CF and expectations do pass straight through, which is why the incentive disappears at low leverage. Option D reverses the claims: creditors are capped at K, so they hold the concave side."
  },
  {
    "id": "q129",
    "ch": 9,
    "oppg": 2,
    "type": "mcq",
    "q": "Face value K = 120, rf = 0, two equally likely states. Project S pays 150 or 130; project R pays 220 or 30. Management acting for shareholders chooses:",
    "options": [
      "S, because V_S = 140 exceeds V_R = 125",
      "R, because equity is worth 50 under R against 20 under S, even though R destroys 15 of firm value",
      "S, because R defaults in the bad state and default is costly",
      "Either, since both give creditors the same expected payoff"
    ],
    "answer": 1,
    "explanation": "Under S the bad state still covers 120, so debt is risk-free at 120 and equity is 0.50(30) + 0.50(10) = 20. Under R the bad state pays creditors only 30, so debt is 0.50(120) + 0.50(30) = 75 and equity is 0.50(100) = 50. Management maximises the EQUITY value, not firm value, so it takes R. Option A answers the wrong question - what is efficient rather than what is chosen - which the chapter names as the first of three ways to lose the points. Option D is arithmetically false: creditors get 120 under S and 75 under R."
  },
  {
    "id": "q130",
    "ch": 9,
    "oppg": 2,
    "type": "mcq",
    "q": "In that firm the agency cost of the risk-shifting decision is:",
    "options": [
      "15, the first-best value minus the value actually chosen",
      "30, the gain to shareholders",
      "45, the loss to creditors",
      "75, the value of the debt under R"
    ],
    "answer": 0,
    "explanation": "Agency cost = V(first best) - V(chosen) = 140 - 125 = 15, a deadweight loss. Option B reports the transfer captured by shareholders (50 - 20 = 30) and option C the mirror image lost by creditors (75 - 120 = -45); neither is the cost, and reporting a transfer as an agency cost is the second of the three named errors. Consistency check 3 ties them together: -45 + 30 = -15, which is the NPV of switching to R, and that identity is the line to write out. Option D is a claim value, not a change."
  },
  {
    "id": "q131",
    "ch": 9,
    "oppg": 2,
    "type": "mcq",
    "q": "Same two projects (150/130 and 220/30, rf = 0, equal probabilities). The face value at which management is indifferent is:",
    "options": [
      "K* = 30, where R's debt first becomes risky",
      "K* = 60, where E_S(K) = 140 - K equals E_R(K) = 110 - 0.5K, both worth 80",
      "K* = 120, the actual face value",
      "K* = 130, the lowest payoff under S"
    ],
    "answer": 1,
    "explanation": "Work inside one linear piece: for 30 < K <= 130 project S covers its debt in both states, so E_S(K) = 0.50(150 - K) + 0.50(130 - K) = 140 - K, while R defaults in the bad state, so E_R(K) = 0.50(220 - K) = 110 - 0.5K. Setting them equal gives 30 = 0.5K, K* = 60, and both sides equal 80. Option A marks where R's debt turns risky, but risky debt alone is not enough: below 60 the transfer from creditors is smaller than the 15 the gamble destroys, so there is still no conflict. Option D is the upper end of the interval, where the algebra stops being valid, not the solution. State the interval when you answer, because max(., 0) makes both functions piecewise linear."
  },
  {
    "id": "q132",
    "ch": 9,
    "oppg": 2,
    "type": "mcq",
    "q": "At K = 120 with project R in place, a costless forward would convert R's payoff into a certain 125 in both states. Do shareholders take this zero-NPV hedge?",
    "options": [
      "Yes, because reducing risk always raises firm value",
      "No: equity falls from 50 to 5 while debt rises from 75 to 120, so the whole benefit goes to creditors",
      "Yes, because the hedge has zero NPV and therefore cannot hurt them",
      "It depends on whether the firm is risk averse"
    ],
    "answer": 1,
    "explanation": "Hedged, the firm pays 125 with certainty, creditors are paid 120 in full and equity keeps 5. Unhedged, equity was worth 50. Removing the risk removes the option value, and 45 moves to the lenders. Consistency check 4 confirms it is pure transfer: total value is fixed at 125, and creditors' gain of 120 - 75 = 45 equals shareholders' loss of 50 - 5 = 45. Option C is the trap the exam sets - zero NPV means zero change in FIRM value, which says nothing about the split. Option A is false whenever the claims are non-linear. Only with risk-free debt is a hedge neutral to shareholders, which is why they hedge willingly at low leverage and refuse in deep distress."
  },
  {
    "id": "q133",
    "ch": 9,
    "oppg": 2,
    "type": "mcq",
    "q": "If creditors anticipate at issue that management will choose the risky project, what happens?",
    "options": [
      "They lend anyway at the risk-free rate and lose 45",
      "They pay 75 rather than 120 for the bond, so the firm raises 45 less today and shareholders bear the 15 agency cost ex ante",
      "The agency cost disappears, because it was only a transfer",
      "They demand equity instead of debt"
    ],
    "answer": 1,
    "explanation": "Rational lenders price the behaviour they expect. Paying 75 means the owners end up with 75 raised plus 50 of equity, that is 125, against the 140 they would have had if they could credibly promise S. The 15 deadweight loss lands on them, exactly as k8's distress costs did. Option C confuses the transfer with the loss: the transfer vanishes once it is priced in, the deadweight loss does not. Option A assumes creditors do not anticipate, which contradicts the rational-pricing assumption used throughout. This is also why shareholders willingly accept covenants and collateral - they are buying back their own credibility."
  },
  {
    "id": "q134",
    "ch": 9,
    "oppg": 2,
    "type": "mcq",
    "q": "Under project R the bad state produces 30 against a face value of 120. Equity's payoff in that state is:",
    "options": [
      "-90, and it must be carried into the expectation",
      "0, because of limited liability",
      "30, since shareholders are residual claimants",
      "-90, but only if the firm is liquidated"
    ],
    "answer": 1,
    "explanation": "Equity is max(CF - K, 0), so it is 0, never negative. Forgetting the zero is the third of the three named ways to lose the points, and it is fatal because it destroys the convexity that generates the entire result: with -90 carried through, E_R would be 0.50(100) + 0.50(-90) = 5, below E_S, and you would conclude that management takes the safe project. Options A and D both assume shareholders can be pursued for the shortfall, which limited liability forbids. Option C hands equity the creditors' recovery."
  },
  {
    "id": "q135",
    "ch": 9,
    "oppg": 2,
    "type": "short",
    "q": "Set out the routine for a risk-shifting exercise, from the table to the closing consistency check, using K = 120 with S paying 150 or 130 and R paying 220 or 30, both equally likely at rf = 0.",
    "model": [
      "Step 1 - build the table, never argue it verbally. For each project and each state write the cash flow, then debt = min(CF, K) and equity = max(CF - K, 0). S: debt 120 and 120, equity 30 and 10. R: debt 120 and 30, equity 100 and 0.",
      "Step 2 - the first best. V_S = 0.50(150) + 0.50(130) = 140 and V_R = 0.50(220) + 0.50(30) = 125. An all-equity firm takes S; switching to R has NPV = 125 - 140 = -15.",
      "Step 3 - value the claims. D_S = 120 and E_S = 0.50(30) + 0.50(10) = 20. D_R = 0.50(120) + 0.50(30) = 75 and E_R = 0.50(100) = 50.",
      "Step 4 - what management does. It acts for shareholders, and 50 > 20, so it takes R and destroys 15 of firm value. Write the words RISK SHIFTING or ASSET SUBSTITUTION - the keys award the label.",
      "Step 5 - the agency cost. First-best value minus chosen value = 140 - 125 = 15. Not the 30 shareholders gained and not the 45 creditors lost.",
      "Step 6 - close with consistency check 3. Creditors' gain = 75 - 120 = -45; shareholders' gain = 50 - 20 = +30; the sum is -15, the NPV of the switch. Write the line out; it is on the examiner's own list.",
      "If rf is not zero, divide every figure by (1 + rf). No comparison changes, so set it aside and say so."
    ]
  },
  {
    "id": "q136",
    "ch": 9,
    "oppg": 2,
    "type": "short",
    "q": "Explain why a zero-NPV hedge is not value-neutral for shareholders of a levered firm, and say when it would be.",
    "model": [
      "A zero-NPV transaction leaves total firm value unchanged. It says nothing about how that value is divided, and with risky debt the division is exactly what moves.",
      "Equity is max(CF - K, 0), a convex claim, so its value depends on the whole distribution of CF and not only on its mean. A hedge is a mean-preserving contraction: it removes the spread that the convexity was converting into value. In the chapter's firm, hedging project R to a certain 125 drops equity from 50 to 5 and lifts debt from 75 to 120.",
      "So shareholders refuse a zero-NPV hedge, and creditors are the ones who want it. Consistency check 4 is the closing line: total value is fixed at 125, so creditors' gain of 45 equals shareholders' loss of 45 - a pure transfer, and no deadweight loss at all.",
      "It would be neutral if the debt were risk-free. Then equity is CF - K in every state, a linear claim, expectations pass straight through, and only the mean matters. That is why shareholders of a lightly levered firm hedge willingly and shareholders of a firm in deep distress do not.",
      "H2024 Exercise 4 asked precisely this, and the answer is not 'no, because it costs nothing' but 'no, because with risky debt it hands the option value to the lenders'. Name the mechanism and run check 4."
    ]
  },
  {
    "id": "q137",
    "ch": 10,
    "oppg": 2,
    "type": "mcq",
    "q": "Shareholders fund a new project themselves. The change in their wealth is:",
    "options": [
      "The project's NPV",
      "NPV minus the rise in the market value of the existing debt",
      "NPV minus the face value of the debt",
      "The NPV multiplied by the equity share of the firm"
    ],
    "answer": 1,
    "explanation": "Delta(shareholders' wealth) = NPV - Delta D, where Delta D is the increase in the MARKET value of the debt already outstanding. Shareholders pay for the rise in the value of their own claim, not for projects, and when debt is risky part of any new value lands on creditors who paid nothing towards it. Debt overhang is the case Delta D > NPV > 0. Option A is true only when the debt is risk-free, so that Delta D = 0. Option C confuses the face value, a contractual number that does not move, with the market value, which does. Option D would be right if new value were split pro rata, but it is not: in default states creditors take the whole increment."
  },
  {
    "id": "q138",
    "ch": 10,
    "oppg": 2,
    "type": "mcq",
    "q": "Debt of face value 120 matures in a year; cash flow will be 60 or 180, equally likely, rf = 4.00%. A project costing 25 today, funded by the owners, adds a safe 40 in both states. The shareholders':",
    "options": [
      "Wealth rises by 13.4615, so they invest",
      "Wealth falls by 5.7692, so they reject a project with NPV 13.4615",
      "Wealth rises by 19.2308, which is the creditors' gain",
      "Wealth is unchanged, because the project is fairly priced"
    ],
    "answer": 1,
    "explanation": "Before: D = (0.5 x 60 + 0.5 x 120)/1.04 = 86.5385 and E = (0.5 x 0 + 0.5 x 60)/1.04 = 28.8462. After: cash flows are 100 and 220, so D = 110/1.04 = 105.7692 and E = 50/1.04 = 48.0769. Shareholders: 48.0769 - 28.8462 - 25 = -5.7692, so they reject. Option A gives them the whole NPV, which would need risk-free debt. Option C is the creditors' gain of 105.7692 - 86.5385 = 19.2308, and check 3 ties the two together: 19.2308 - 5.7692 = 13.4615 = NPV = 40/1.04 - 25. The bad-state increment, worth 0.5(40)/1.04 = 19.2308, went wholly to the lenders while the owners paid all 25."
  },
  {
    "id": "q139",
    "ch": 10,
    "oppg": 2,
    "type": "mcq",
    "q": "In that example the agency cost of debt overhang is:",
    "options": [
      "5.7692, the loss to shareholders",
      "13.4615, the NPV of the project that never happens",
      "19.2308, the transfer to creditors",
      "25.0000, the investment that is not made"
    ],
    "answer": 1,
    "explanation": "Measure the agency cost as first-best value minus value under the chosen action, exactly as in k9. The first best takes the project and gains 13.4615; the chosen action is to skip it, so 13.4615 of value is destroyed. Option A is a transfer that never happens, because the investment is never made - if the project is not taken there is no 5.7692 loss and no 19.2308 gain (option C). Option D is the outlay, not a loss: spending 25 to receive 38.4615 is not a cost. Note also that consistency check 4 does NOT apply here, because total value is not fixed - value is destroyed, not moved."
  },
  {
    "id": "q140",
    "ch": 10,
    "oppg": 2,
    "type": "mcq",
    "q": "Same firm. The creditors offer to cut the face value from 120 to K1 if the owners inject the 25. The range of face values both sides accept is:",
    "options": [
      "90 <= K1 <= 108",
      "75 <= K1 <= 120",
      "100 <= K1 <= 120",
      "86.5385 <= K1 <= 105.7692"
    ],
    "answer": 0,
    "explanation": "Creditors need D(K1) >= 86.5385, so the expected payoff must reach 90; with the project the bad state pays 100, so for K1 <= 100 the debt is safe and pays K1 in both states, giving K1 >= 90. Shareholders need E(K1) - 25 >= 28.8462, so the expected equity payoff must reach 56.00; for K1 >= 100 that is 110 - 0.5K1 >= 56, hence K1 <= 108. Option B uses undiscounted or pre-project payoffs. Option D mistakes market values for face values - K1 is a face value throughout this chapter, never a market value and never a strike. At K1 = 90 the owners take the whole 13.4615; at 108 the creditors do."
  },
  {
    "id": "q141",
    "ch": 10,
    "oppg": 2,
    "type": "mcq",
    "q": "Why must the creditors' gain and the shareholders' gain from a renegotiation always sum to the project's NPV?",
    "options": [
      "Because the debt is fairly priced",
      "Because renegotiation changes only the division of the payoff while the project changes only how much there is to divide, so every division term cancels",
      "Because creditors and shareholders have equal bargaining power",
      "Because the risk-neutral probabilities sum to one"
    ],
    "answer": 1,
    "explanation": "Add the two changes and the face value drops out of the algebra, leaving the change in total firm value, which is the NPV. That is why consistency check 3 holds at ANY K1 in the acceptable range, and why gains summing to anything else mean an arithmetic error - typically forgetting to subtract the investment I, or writing K1 instead of the actual cash flow in the default state. Option C is irrelevant: bargaining power decides where in the range the deal lands, not what the total is. Option A is a different fact and option D a different model. Note what check 3 cannot catch: a wrong rho or rf scales both claims alike and passes."
  },
  {
    "id": "q142",
    "ch": 10,
    "oppg": 2,
    "type": "mcq",
    "q": "A covenant restricting further borrowing, dividends and asset sales raises firm value because:",
    "options": [
      "It transfers value from shareholders to creditors, which is efficient",
      "Anything the borrower promises today is priced today: the debt is worth more at issue, so the same money is raised against a smaller promised repayment, and the owners recover the deadweight loss that no longer occurs",
      "It lets the firm borrow at the risk-free rate",
      "It removes the need for renegotiation later"
    ],
    "answer": 1,
    "explanation": "The gain is not a transfer to lenders; it is the elimination of a deadweight loss, and it returns to the shareholders through the price of the bond. That is why shareholders accept covenants voluntarily rather than having them imposed. Option A treats a transfer as a gain, the standard confusion of this material. Option C overstates: covenants reduce the probability and severity of the agency problems, they do not make the debt risk-free. Option D is wrong in fact - renegotiation is often still needed, and covenants have a real cost of their own, since a covenant that binds where the forbidden action was efficient destroys value itself."
  },
  {
    "id": "q143",
    "ch": 10,
    "oppg": 2,
    "type": "mcq",
    "q": "Funding the new project with debt that is SENIOR to the existing claim, or secured on the new asset, addresses overhang because:",
    "options": [
      "It lowers the interest rate on the whole capital structure",
      "The new lender takes the bad-state cash flow first, so the old creditor collects no windfall and the owners are willing to invest",
      "It converts the old debt into equity",
      "Senior debt has no agency costs at all"
    ],
    "answer": 1,
    "explanation": "Overhang exists because the project's cash in default states flows to the incumbent lender krone for krone while the owners pay the whole outlay. Give the new financing priority over that cash and the windfall disappears, so the investment decision returns to something close to first best. This is exactly why incumbent lenders forbid it by covenant. Option C describes a different remedy entirely - a debt-for-equity swap, which is renegotiation. Option D is far too strong: senior debt is still debt and still creates risk-shifting incentives on the assets it stands behind."
  },
  {
    "id": "q144",
    "ch": 10,
    "oppg": 2,
    "type": "mcq",
    "q": "Convertible debt blunts both agency costs of debt at once because:",
    "options": [
      "It carries a lower coupon",
      "The lender shares the upside, so risk shifting no longer pays the owners, and he is readier to fund, which softens overhang",
      "It is senior to all other claims",
      "It cannot default"
    ],
    "answer": 1,
    "explanation": "A conversion right hands the lender a slice of the good states, which is precisely the region shareholders were trying to enlarge at his expense, so the gain from raising asset risk shrinks; and because the lender expects to participate in success he requires less to fund, which is what makes the overhang problem smaller. That combination is why it is the standard instrument for young, volatile firms. Option A is a consequence, not the mechanism. Options C and D are simply false: convertibles have whatever seniority they are given and default like any other bond. k24 prices the instrument as debt plus a call on the equity."
  },
  {
    "id": "q145",
    "ch": 10,
    "oppg": 2,
    "type": "short",
    "q": "Distinguish debt overhang from risk shifting: what each one is, what the agency cost is in each case, and which consistency check closes the answer.",
    "model": [
      "Risk shifting (asset substitution, k9): the firm has debt outstanding and CHOOSES A WORSE PROJECT because the gamble's upside belongs to shareholders and its downside is absorbed by creditors. The distortion is in which project is taken.",
      "Debt overhang (k10): the firm SKIPS A GOOD PROJECT because the new value lands disproportionately on the existing creditors while the owners pay the whole outlay. The distortion is in whether any project is taken.",
      "In both cases the agency cost is first-best value minus value under the chosen action - a deadweight loss. Risk shifting: 140 - 125 = 15 in the chapter's example. Overhang: the forgone NPV itself, 13.4615.",
      "In both cases the transfer between claimants is NOT the agency cost. The 30 shareholders gain from the gamble, or the 19.2308 creditors would gain from the project, are separate numbers and reporting them costs marks.",
      "Both close with consistency check 3: creditors' gain plus shareholders' gain equals the NPV of the action. Check 4 - creditors' gain equals shareholders' loss - applies only when total value is fixed, so it fits the zero-NPV hedge of k9 and does NOT fit either the gamble or the skipped project.",
      "Both are borne ex ante by shareholders, because lenders price the incentives they expect, which is why covenants, collateral, seniority and convertible debt exist and why shareholders accept them."
    ]
  },
  {
    "id": "q146",
    "ch": 11,
    "oppg": 2,
    "type": "mcq",
    "q": "The complete organising identity of the course is:",
    "options": [
      "V^L = V^U + PV(TS)",
      "V^L = V^U + PV(TS) - PV(distress costs) - PV(agency costs of debt) + PV(agency benefits of debt)",
      "V^L = V^U + PV(TS) - PV(distress costs) + PV(agency costs of debt)",
      "V^L = V^U(1 + tau_c x D/V)"
    ],
    "answer": 1,
    "explanation": "Each term after V^U is one named market imperfection put back into the perfect-market benchmark: interest deductibility (k7), costly bankruptcy (k8), risk shifting and debt overhang (k9-k10), and debt as a commitment against empire building (k11). Option A stops at the trade-off's benefit side and would recommend 100% debt. Option C gets the sign on the agency costs of debt backwards - risk shifting and overhang destroy value and are subtracted. Option D is not a result in this course. None of this is on the formula sheet, so it has to be memorised."
  },
  {
    "id": "q147",
    "ch": 11,
    "oppg": 2,
    "type": "mcq",
    "q": "An all-equity firm has V^U = 1000 and 200 of excess cash; the CEO intends to spend the 200 on a project worth 175. Instead it borrows 400 of permanent debt and pays out the proceeds and the cash; tau_c = 25% and PV(distress) at that leverage is 30. Shareholder wealth rises by:",
    "options": [
      "100, the tax shield",
      "95, decomposing into +25 of agency benefit, +100 of tax shield and -30 of distress cost",
      "70, the tax shield net of distress",
      "130, the cash paid out minus the bad project"
    ],
    "answer": 1,
    "explanation": "If the cash stays inside, wealth is 1000 + 175 = 1175, because the market prices the -25 NPV project in today. With the recapitalisation, PV(TS) = 0.25 x 400 = 100, so V^L = 1000 + 100 - 30 = 1070, of which 400 is debt and 670 equity, plus 600 paid out (400 of proceeds and 200 of cash): 1270. The gain is 95, and the decomposition 25 + 100 - 30 = 95 is the check that can actually fail. Option A counts only the shield and ignores both the avoided waste and the distress cost. Option C omits the agency benefit, which is the point of the chapter. D + E = 1070 cannot fail, since E was computed as V^L - D, so it proves nothing."
  },
  {
    "id": "q148",
    "ch": 11,
    "oppg": 2,
    "type": "mcq",
    "q": "In that firm, the recapitalisation stops being worthwhile once PV(distress costs) reaches:",
    "options": [
      "100",
      "125",
      "95",
      "400"
    ],
    "answer": 1,
    "explanation": "The two benefits are the avoided waste of 25 and the tax shield of 100, so the recapitalisation adds value while distress costs stay below 125. Quoting that break-even is what separates an answer that understood the trade-off from one that memorised it. Option A counts only the shield and forgets that the discipline is worth something in its own right. Option C is the net gain at the stated distress level of 30, not the break-even. Option D is the debt level."
  },
  {
    "id": "q149",
    "ch": 11,
    "oppg": 2,
    "type": "mcq",
    "q": "Debt commits a manager to return cash, while a promise to pay dividends does not, because:",
    "options": [
      "Dividends are taxed and interest is not",
      "A missed interest payment puts the firm in default, hands control to creditors and usually ends the manager's career, whereas a quietly abandoned dividend costs him nothing enforceable",
      "Debt contracts are longer than dividend policies",
      "Creditors monitor better than shareholders"
    ],
    "answer": 1,
    "explanation": "The commitment is credible precisely BECAUSE the penalty is severe and outside the manager's control - which is the same feature that made debt costly in k9 and k10. One friction, two signs. Option D is a real effect but not the mechanism: the discipline works through the enforceability of the claim, not through superior monitoring. Option A confuses a tax argument with a governance argument. Option C is not generally true and would not create commitment even if it were. Leveraged buyouts apply this mechanism deliberately."
  },
  {
    "id": "q150",
    "ch": 11,
    "oppg": 2,
    "type": "mcq",
    "q": "The free cash flow problem is worst in:",
    "options": [
      "Young firms with many growth options and no revenue",
      "Mature, cash-rich firms in shrinking industries with weak governance",
      "Firms with high asset volatility and risky debt",
      "Firms whose shares are held by a single concentrated owner"
    ],
    "answer": 1,
    "explanation": "Free cash flow is what remains after every positive-NPV project has been funded. A firm with many good projects has nothing left over, so discipline is not needed and flexibility is worth more - which is why option A points to the firm that should be all-equity. A mature firm generating cash it has nowhere good to put is exactly the setup that finances diversifying acquisitions and vanity capacity. Option C names the firm where the agency COSTS of debt bite hardest, the opposite side of the ledger. Option D describes a firm where the monitoring problem is already partly solved (k27)."
  },
  {
    "id": "q151",
    "ch": 11,
    "oppg": 2,
    "type": "mcq",
    "q": "Which firm does the assembled framework predict should carry the most debt?",
    "options": [
      "A biotechnology firm with no revenue and a value made almost entirely of growth options",
      "A mature shipping company with stable cash flows, a fleet other operators would buy, no attractive expansion and a large cash balance",
      "A software firm growing 40% a year and funding it from an equity issue",
      "A firm whose assets are mostly intangible but which is highly profitable"
    ],
    "answer": 1,
    "explanation": "Sign every term for the shipping firm and they all point one way: the tax shield is large because taxable profits are stable; distress costs are small because cash flows are steady and ships are redeployable, so a default transfers assets rather than destroying a business; agency costs of debt are small because there are few growth options to distort; and the agency benefit is large because idle cash with no projects is the empire-building setup. For the biotech in option A every term points the other way. Option D is the interesting trap: profitability raises the shield but intangibility raises expected distress costs sharply, and the intangibility usually dominates."
  },
  {
    "id": "q152",
    "ch": 11,
    "oppg": 2,
    "type": "mcq",
    "q": "The most profitable firms in an industry often carry the LEAST debt. Which theory explains this, and how?",
    "options": [
      "The trade-off theory: profitable firms have more to lose in distress",
      "The pecking order: profits accumulate as retained earnings, which sit at the top of the financing ladder, so a firm funding everything internally never has to borrow",
      "The trade-off theory: profitable firms need the deduction more",
      "The agency benefit of debt: profitable firms have less free cash flow"
    ],
    "answer": 1,
    "explanation": "The tax story predicts the opposite sign - profitable, taxable firms should use the deduction most - which is why this regularity is the pecking order's best evidence. It explains the sign through a mechanism rather than through a target: leverage falls not because the firm wants less of it but because it never had to ask for it. Option C states the trade-off prediction correctly and it is the one contradicted by the data. Option D reverses the facts: profitable firms have more free cash flow, not less."
  },
  {
    "id": "q153",
    "ch": 11,
    "oppg": 2,
    "type": "short",
    "q": "Two all-equity firms: A is a mature shipping company with stable cash flows, redeployable ships, no attractive expansion and a large cash balance; B is a biotech with no revenue, volatile prospects and value made almost entirely of growth options. Which should carry more debt?",
    "model": [
      "Move 1 - state the frame in one sentence. Capital structure matters only through the terms of V^L = V^U + PV(TS) - distress - agency costs of debt + agency benefits, so the question is which terms are large for each firm.",
      "Move 2 - sign every term for A. Tax shield large: stable taxable profits use the deduction every year. Distress small: steady cash flows, and tangible assets mean a default transfers ships rather than destroying a business. Agency cost of debt small: with no growth options there is little scope for overhang or risk shifting. Agency benefit large: idle cash and no good projects is the empire-building setup, and debt service removes the cash. Every term points one way, so A should be highly levered.",
      "Move 3 - sign every term for B. Tax shield near zero: no taxable income, so the deduction shields nothing. Distress large: the value is intangible growth options that evaporate if the researchers leave. Agency cost of debt large: overhang would block exactly the risky positive-NPV research the firm exists to do. Agency benefit small: B has no free cash flow to waste and needs to raise money, not disburse it. Every term points the other way, so B should be all-equity.",
      "Move 4 - close with a prediction and one caveat. The prediction is a wide leverage gap driven by asset tangibility and growth options. The caveat is information: under the pecking order B still prefers internal funds to an equity issue, which is why such firms use staged financing from informed investors and convertible debt.",
      "About five sentences per firm fits the stated budgets, and every move ends in a DIRECTION rather than a description. Listing the theories and stopping is the commonest way to lose points here."
    ]
  },
  {
    "id": "q154",
    "ch": 11,
    "oppg": 2,
    "type": "short",
    "q": "Name the three empirical regularities about observed leverage that the chapter says to carry into an exam, and say what each one tells you.",
    "model": [
      "1. Leverage differs far more BETWEEN industries than within them. Utilities, property and shipping carry heavy debt; software and biotech almost none. The last column of the forces table explains this in one pass, through asset tangibility, cash flow stability and the size of the growth-option component.",
      "2. The most PROFITABLE firms often borrow least. The tax story gets this backwards; the pecking order explains it, because profits are retained and retained earnings are the cheapest source of funds. A firm that funds everything internally never issues debt at all.",
      "3. Leverage is PERSISTENT. Adjusting it is costly, so what you observe is a lagged target rather than today's optimum. This is why the trade-off theory can be right about the target and still fit the cross-section loosely.",
      "What they tell you jointly: firms sit NEAR a target rather than on it, and no single theory predicts everything. The marginal condition is marginal PV(TS) = marginal distress + marginal agency cost - marginal agency benefit.",
      "In an answer, use them as evidence rather than as a list. Name the mechanism, sign it for the firm in front of you, say which term dominates, and conclude in the direction the question asked."
    ]
  },
  {
    "id": "q155",
    "ch": 12,
    "oppg": 3,
    "type": "mcq",
    "q": "New investors buy a fraction alpha of the post-issue firm for I. The correct pricing condition is:",
    "options": [
      "alpha = I/(E[V | beliefs] + NPV)",
      "alpha = I/(E[V | beliefs] + I + NPV)",
      "alpha = I/(V_true + I + NPV)",
      "alpha = I/(E[V | beliefs] + I)"
    ],
    "answer": 1,
    "explanation": "The firm after the issue is worth the assets in place as investors assess them, PLUS the cash that just came in, PLUS what the project adds beyond its cost - that is E[V | beliefs] + I + NPV. Option A leaves out the cash raised, which is the single most common way to wreck this exercise: the denominator is too small, alpha too large, and every payoff after it wrong in the same direction. Option C prices off the manager's private V, but alpha is priced off BELIEFS; the truth enters only in the payoff line, and the two being different numbers is the whole point. Option D drops the project's NPV, which is public information in this setup. Sanity check: a firm raising 80 against assets of 225 and a project adding 20 has sold about a quarter of itself, not a third."
  },
  {
    "id": "q156",
    "ch": 12,
    "oppg": 3,
    "type": "mcq",
    "q": "Assets in place are worth 300 (high) or 150 (low), the market puts q = 0.50 on high, I = 80 must be raised by a share issue and the project's NPV of 20 is public. At the pooling belief, alpha and the high type's dilution are:",
    "options": [
      "alpha = 0.2462 and dilution 18.4615, so the high type issues",
      "alpha = 0.2462 and dilution 18.4615, so the high type abstains",
      "alpha = 0.3200 and dilution 24.0000, so the high type abstains",
      "alpha = 0.2667 and dilution 20.0000, so the high type is indifferent"
    ],
    "answer": 0,
    "explanation": "E[V | issue] = 0.50(300) + 0.50(150) = 225, so the post-issue firm is worth 225 + 80 + 20 = 325 and alpha = 80/325 = 0.2462. Dilution = alpha(V_H - E[V | issue]) = 0.246154 x 75 = 18.4615, which is BELOW the NPV of 20, so the high type issues: its payoff is 300 + 20 - 18.4615 = 301.5385 against 300 by abstaining, and the direct form (1 - 0.246154)(400) = 301.5385 agrees. The low type gains 18.4615 and issues too, so the pooling belief is confirmed by the behaviour it priced - a rational pooling equilibrium. Option C computes alpha = 80/250, dropping the project entirely from the denominator."
  },
  {
    "id": "q157",
    "ch": 12,
    "oppg": 3,
    "type": "mcq",
    "q": "Same firm (V_H = 300, V_L = 150, q = 0.50, I = 80) but the project's NPV is only 10. The equilibrium is:",
    "options": [
      "Pooling at alpha = 0.2540, both types issue",
      "Separating: only the low type issues, at alpha = 0.3333, and its old shareholders end with 160.00",
      "Neither type issues, so no shares are sold",
      "Separating: only the high type issues, since it has the better assets"
    ],
    "answer": 1,
    "explanation": "Test pooling first: E[V | issue] = 225 gives alpha = 80/315 = 0.2540 and a dilution for the high type of 0.253968 x 75 = 19.0476, above the NPV of 10, so the high type refuses - the belief is contradicted by the behaviour it predicts, and consistency check 5 kills it. Reprice with E[V | issue] = 150: alpha = 80/240 = 0.3333, the low type keeps (2/3)(240) = 160.00 against 150, so it still issues; the high type would get (2/3)(390) = 260.00 against 300 and stays out. Both act as assumed, so the belief is rational. Note the shortcut: when the issuer's type is revealed the dilution term is zero and the payoff must be exactly V_L + NPV = 160. Option D inverts the model - the low type is the one that gains from being sold at any pooled or revealed price."
  },
  {
    "id": "q158",
    "ch": 12,
    "oppg": 3,
    "type": "mcq",
    "q": "Consistency check 5 in a Myers-Majluf exercise means:",
    "options": [
      "Verifying that alpha lies between zero and one",
      "Asking whether the belief you priced the issue at is consistent with the actions each type actually takes, and repricing if it is not",
      "Checking that the payoff to old shareholders exceeds the investment",
      "Confirming that new investors earn a positive return"
    ],
    "answer": 1,
    "explanation": "An equilibrium here is a pair, not a number: an action for each type and a belief for the market that is correct given those actions. Computing alpha and stopping there is described in the solution keys as the standard incomplete answer, which is exactly why it is on the k0 list of checks. Option D contradicts competitive pricing - new investors break even by construction. Options A and C are arithmetic hygiene, not equilibrium conditions. The check runs both ways: a pooling belief is rational only if BOTH types issue at the pooled price, and a separating belief only if the low type still issues at the harsher price AND the high type still prefers to abstain at it."
  },
  {
    "id": "q159",
    "ch": 12,
    "oppg": 3,
    "type": "mcq",
    "q": "An issue is refused. The correct comparison for the high type's old shareholders is the issue payoff against:",
    "options": [
      "V + NPV, the value of the firm with the project",
      "V, the assets alone, because the project is lost if it is not funded now",
      "E[V | beliefs], what the market thinks the firm is worth",
      "V + I, the assets plus the cash"
    ],
    "answer": 1,
    "explanation": "One of the two assumptions carrying the whole result is that the project disappears if it is not funded now: no cash in the bank, no bank loan, no waiting for the information to become public. So abstaining means keeping the assets and losing the project. Option A is the standard slip and it makes an issue look unattractive to everyone: if the firm could fund the project from cash instead, the comparison WOULD be V + NPV and no issue would ever be worth doing - which is precisely why financial slack is the first remedy on the list. Option C applies the market's belief where the manager's truth belongs; alpha is priced off beliefs, the payoff is computed off the truth."
  },
  {
    "id": "q160",
    "ch": 12,
    "oppg": 3,
    "type": "mcq",
    "q": "Compare the two inefficiencies in this model. Which statement is right?",
    "options": [
      "Pooling destroys value while separating only transfers it",
      "Separating destroys value, because the high type abandons a positive-NPV project; pooling only transfers value between two groups of old shareholders",
      "Both destroy value in equal measure",
      "Neither is inefficient, because all prices are fair"
    ],
    "answer": 1,
    "explanation": "Under separating the high type walks away and its NPV simply never happens: with q = 0.50 and NPV = 10 the expected loss is 0.50 x 10 = 5. That is underinvestment through adverse selection, the same family as the debt overhang of k10. Under pooling both types invest, so nothing real is lost; the good firm's owners hand a sum to the new investors and the bad firm's owners receive the same sum through them, and new investors break even - a transfer in the sense of consistency check 4. Option A has them swapped. Option D confuses fair pricing with efficiency: nobody is fooled and the outcome is still inefficient, which is what makes adverse selection different from mispricing."
  },
  {
    "id": "q161",
    "ch": 12,
    "oppg": 3,
    "type": "mcq",
    "q": "With V_H = 300, V_L = 150, I = 80 and NPV = 10, the prior at which the outcome flips from separating to pooling is:",
    "options": [
      "q* = 0.5000",
      "q* = 0.7111",
      "q* = 0.6000",
      "q* = 0.8000"
    ],
    "answer": 1,
    "explanation": "Write E[V] = 150 + 150q and set the high type's dilution equal to its NPV: 80(300 - 150 - 150q) = 10(150 + 150q + 80 + 10), so 12000 - 12000q = 2400 + 1500q, 13500q = 9600 and q* = 0.7111. Verify: at q* the pooled belief is 256.6667, alpha = 80/346.6667 = 0.2308, and the dilution is 0.230769 x 43.3333 = 10.0000, exactly the NPV. Above q* the market is confident enough for the good firm to sell shares and everyone issues; below it the outcome separates. The other options are guesses that fail this substitution, which is the check to run on any threshold you derive."
  },
  {
    "id": "q162",
    "ch": 12,
    "oppg": 3,
    "type": "short",
    "q": "Set out the four-step Myers-Majluf template, and say what each step is for.",
    "model": [
      "Step 1 - state the belief you are pricing at, and why, in one sentence: 'Suppose investors expect both types to issue, so E[V | issue] equals the prior.' Always test the naive pooling belief first.",
      "Step 2 - compute alpha from that belief, to four decimals, with the cash raised in the denominator: alpha = I/(E[V | beliefs] + I + NPV). Leaving I out is the single commonest wreck.",
      "Step 3 - the payoff to old shareholders for EACH type, compared with the value of not issuing. Use the dilution form, payoff = V + NPV - alpha(V - E[V | beliefs]), and confirm with the direct form (1 - alpha)(V + I + NPV). Compare against V alone, not V + NPV, because refusing means losing the project. Do both types even if the question asks about one, because step 4 needs both.",
      "Step 4 - check the belief. Name the outcome: 'the high type does not issue, so the pooling belief is not rational; the equilibrium is separating with E[V | issue] = V_L'. Then reprice and re-verify that the low type still issues at the harsher price and the high type still prefers to abstain.",
      "Two shortcuts worth carrying. If the issuer's type ends up revealed, the dilution term is zero and its payoff must be exactly V + NPV. And prices must average back: the probability-weighted post-announcement prices equal the prior plus the expected NPV actually captured.",
      "Read the whole model as one comparison: issue if and only if NPV > alpha(V - E[V | beliefs]) - project value against transferred value."
    ]
  },
  {
    "id": "q163",
    "ch": 12,
    "oppg": 3,
    "type": "short",
    "q": "Explain why a firm the market undervalues can rationally refuse free money, and say what it should do about it.",
    "model": [
      "The project has a positive NPV, the financing is fairly priced given what investors know, and the answer can still be no. The reason is that the price is fair ON AVERAGE and the manager is not average: he knows the firm is the good type and the market does not.",
      "Selling a fraction alpha of a firm the market undervalues by (V - E[V | beliefs]) hands the new investors alpha(V - E[V | beliefs]) of the old owners' wealth. That is the dilution cost - a transfer, not a cost of production. The rule is: issue if and only if NPV > alpha(V - E[V | beliefs]).",
      "Nobody is fooled and nothing is irrational. That is what makes adverse selection different from mispricing, and it is why 'the market is undervaluing us, so an issue is a bad idea' is only half an answer: the other half is whether the dilution actually outweighs the NPV. Two exercises with identical V_H, V_L and q can have opposite answers because the projects differ.",
      "What to do about it, which is the list the exam expects: hold FINANCIAL SLACK (cash or unused debt capacity funds the project with no dilution, but idle cash invites the empire building of k11); ISSUE DEBT instead (a fixed claim is worth nearly the same whichever type the firm is, so little is transferred - k13 - at the price of the distress and agency costs of k8-k10); use a RIGHTS ISSUE (sell to the existing owners, who are then on both sides of the transfer - k14); WAIT until the information is public, if the project survives the delay; or CERTIFY through underwriters, auditors and analysts, which is costly and only as credible as the certifier.",
      "Close by naming what the loss is: in the separating outcome the high type's NPV is destroyed, not transferred, so anything that shrinks the asymmetry is worth real money."
    ]
  },
  {
    "id": "q164",
    "ch": 13,
    "oppg": 3,
    "type": "mcq",
    "q": "The pecking order ranks financing sources as:",
    "options": [
      "Equity, then debt, then retained earnings, ranked by cost of capital",
      "Retained earnings, then debt (safest first), then hybrids, then equity - ranked by how badly the claim can be underpriced when the manager knows more",
      "Whatever keeps the firm closest to its target debt ratio",
      "Debt, then equity, then retained earnings, ranked by tax efficiency"
    ],
    "answer": 1,
    "explanation": "The ranking falls straight out of the dilution term of k12. Internal cash sells no outside claim, so the cost is zero. Riskless debt promises a fixed amount the firm pays whichever type it is, so the buyer's ignorance is irrelevant and the cost is zero again. Risky debt differs across types only over the range where the firm cannot pay - a slice of the outcomes. Equity is the residual, so every krone of hidden value belongs to it. Option C describes the trade-off theory, which the pecking order explicitly does not contain: there is no target ratio, and observed leverage is a residue of past deficits. Option D reverses the ranking and gives the wrong reason."
  },
  {
    "id": "q165",
    "ch": 13,
    "oppg": 3,
    "type": "mcq",
    "q": "Which statement about the pecking order is correct?",
    "options": [
      "It requires markets to be inefficient, since otherwise the mispricing could not exist",
      "It rests on asymmetric information: prices are efficient with respect to the market's information set, and the cost arises because the manager's set is larger",
      "It forbids firms from ever issuing equity",
      "It predicts that profitable firms borrow most"
    ],
    "answer": 1,
    "explanation": "This is the standard wrong answer inverted. Every price in the model is fair GIVEN THE INFORMATION INVESTORS HAVE; investors are rational and anticipate that a firm issuing equity is more likely to be the low type, and they price that in before the shares are sold. Nothing requires prices to be wrong, only that the two sides know different things. Market timing is where inefficiency may or may not enter, and keeping the two apart is worth points. Option C confuses ranking with prohibition - a firm with no cash, no debt capacity and a large positive-NPV project issues equity and should. Option D is the trade-off prediction, and it is the one the data contradicts."
  },
  {
    "id": "q166",
    "ch": 13,
    "oppg": 3,
    "type": "mcq",
    "q": "A firm must raise 120. Next year it is worth 500 or 260 (high type) or 340 or 80 (low type), each state equally likely, rf = 0, and the market puts q = 0.50 on each type. The good firm's transfer to new investors is:",
    "options": [
      "34.5763 with equity and 13.3333 with debt, so it prefers debt by 21.2430",
      "The same under both, since the amount raised is the same",
      "13.3333 with equity and 34.5763 with debt, so it prefers equity",
      "Zero under debt, because debt is a fixed claim"
    ],
    "answer": 0,
    "explanation": "Equity: the pooled expectation is 0.50(380) + 0.50(210) = 295, so alpha = 120/295 = 0.4068 and the stake sold is worth 0.406780 x 380 = 154.5763 against the 120 received - a transfer of 34.5763, which is also alpha(380 - 295). Debt: the face value raising 120 solves 0.75K + 20 = 120, so K = 133.3333, worth 133.3333 to the high type (safe, since 260 > 133.3333) and 0.5K + 40 = 106.6667 to the low type, so the transfer is 13.3333. With q = 0.50 the transfer must be half the spread between the two true values, and it is: (133.3333 - 106.6667)/2 = 13.3333 and (154.5763 - 85.4237)/2 = 34.5763. Option D would be right only for RISKLESS debt: here the face value exceeds the low type's worst payoff of 80, so it is risky and the transfer is positive but small."
  },
  {
    "id": "q167",
    "ch": 13,
    "oppg": 3,
    "type": "mcq",
    "q": "In that firm, how much can be raised with no adverse-selection cost at all?",
    "options": [
      "Nothing, because the manager always knows more",
      "Up to 80, the lowest payoff either type can produce, since debt of that face value is repaid with certainty by both",
      "Up to 120, the amount needed",
      "Up to 260, the high type's worst state"
    ],
    "answer": 1,
    "explanation": "Any face value up to 80 is repaid in full in every state by both types, so the two types' claims are worth exactly the same and the buyer's ignorance is irrelevant: the transfer is zero. That is the bottom rung of the ladder made concrete - the information cost of this firm's financing is zero for the first 80, 13.3333 at 120 in the form of debt, and 34.5763 in the form of equity. Option D uses the wrong type's floor: the low type can produce only 80, and the market cannot tell them apart. Option A ignores that a claim insensitive to the private information costs nothing to sell, which is the entire mechanism of the pecking order."
  },
  {
    "id": "q168",
    "ch": 13,
    "oppg": 3,
    "type": "mcq",
    "q": "Assets in place are worth 600, 500 or 400, equally likely, I = 150 must be raised by an equity issue and the project's NPV is 20. In the equilibrium the top type abstains and the other two pool. The announcement return is:",
    "options": [
      "-4.0000%",
      "-8.4416%",
      "-2.9126%",
      "-10.0000%"
    ],
    "answer": 1,
    "explanation": "With E[V | issue] = 450, alpha = 150/620 = 0.2419; the 600 type's dilution is 36.2903, above the NPV of 20, so it abstains, while the 500 and 400 types issue - all three act as the belief assumes. After an issue the market prices the firm at 450 + 20 = 470; after no issue at 600. Before the announcement P0 = (1/3)(600) + (2/3)(470) = 513.3333, so the return is -43.3333/513.3333 = -8.4416%. Decompose it: the assets in place are revised from 500 to 450, worth -50, and the project moves from an expected (2/3)(20) = 13.3333 to a certain 20, worth +6.6667. Check that prices average back to the prior plus the expected NPV actually captured: 500 + 13.3333 = 513.3333."
  },
  {
    "id": "q169",
    "ch": 13,
    "oppg": 3,
    "type": "mcq",
    "q": "In that example the price fell 43.3333 on the announcement while the issuing firm's dilution cost was 12.0968. The gap is:",
    "options": [
      "A deadweight loss caused by the issue",
      "Not a cost to anybody: it is the market discovering something that was already true before the announcement was made",
      "The underwriter's fee",
      "The value of the project transferred to new investors"
    ],
    "answer": 1,
    "explanation": "Saying 'the issue destroyed 43.33 of value' is the standard error on this question. The firm of type 500 was always worth 500; before the announcement the market held a blend that still gave weight to its being the top type, and the issue revealed that it is not. The revision is information, not destruction. The real cost to the issuing firm's old shareholders is the dilution of 12.0968, which is 2.36% of the pre-announcement price. Option D confuses the transfer with the revision. Note the symmetry that makes the whole thing an equilibrium: the firms that do NOT issue are repriced upward, and the probability-weighted average returns to the price that prevailed before anyone acted."
  },
  {
    "id": "q170",
    "ch": 13,
    "oppg": 3,
    "type": "mcq",
    "q": "An action is a credible signal when:",
    "options": [
      "Management states publicly that the firm is undervalued",
      "The cost to the low type of imitating exceeds the gain from being taken for the high type, which in turn exceeds the cost to the high type",
      "The action is costly to both types in equal measure",
      "The market has previously rewarded the same action"
    ],
    "answer": 1,
    "explanation": "That double inequality is the single-crossing condition and it is the whole theory: if both hold, only the high type signals and the market reads it correctly. Option A is cheap talk - it costs nothing to say, so a low-type manager says the same words and investors learn nothing from either. Option C fails the condition: if the cost is the same for both, everyone signals and the action conveys nothing. Option D is history, not a mechanism. Test any action you propose in a verbal answer against this line - taking on debt, repurchasing shares, raising the dividend and refusing to issue equity all pass it, and an announcement does not."
  },
  {
    "id": "q171",
    "ch": 13,
    "oppg": 3,
    "type": "mcq",
    "q": "A conglomerate cannot get its opaque technology division valued properly, but its property portfolio trades against monthly comparables. To fund a project it should:",
    "options": [
      "Issue equity, because that spreads the cost over the whole firm",
      "Sell the property, because the transparent asset fetches its full value while equity in the opaque firm does not",
      "Sell the technology division, since the market does not appreciate it anyway",
      "Do nothing, because any transaction reveals information"
    ],
    "answer": 1,
    "explanation": "Fund from the asset the market values correctly and keep the one it cannot see. In the chapter's case an equity issue costs the old shareholders alpha times the undervaluation, while selling the transparent division at its full value transfers nothing at all. Option C sells the asset that is undervalued, which realises the loss rather than avoiding it. Option D ignores that the choice itself is informative in the right direction: a management that sells property rather than shares behaves like a firm whose shares are underpriced, which is why divestiture and carve-out announcements are typically met with a POSITIVE price reaction while equity issues are met with a negative one."
  },
  {
    "id": "q172",
    "ch": 13,
    "oppg": 3,
    "type": "short",
    "q": "Distinguish a spin-off, an equity carve-out and a divestiture, say which raises cash, and explain how a spin-off can raise value while raising none.",
    "model": [
      "Spin-off: the shares of a subsidiary are distributed to the parent's own shareholders, who end up holding two shares where they held one. NO cash reaches the parent.",
      "Equity carve-out: a minority stake in the subsidiary is sold to the public in its own IPO, so the parent raises the value of the stake sold while keeping control.",
      "Divestiture: the unit is sold outright, usually to another company, and the parent receives the agreed price.",
      "Only the last two fund anything. That makes the spin-off the interesting case, because it is a pure information event.",
      "Why it can still create value: one share in a conglomerate forces investors to value a bundle they cannot decompose, and the safe response is to mark the whole thing down. Split it and each part is priced against its own comparables, gets its own analysts and its own reporting, and each management team is paid on a share price reflecting what it actually controls. The bundling discount disappears, cross-subsidy between units stops, and any future issue by either part is a less opaque transaction.",
      "The cost, which belongs in a full answer: the group loses the coinsurance between the units' cash flows (k24, k26) and the internal capital market that let a cash-rich unit fund a cash-poor one. So a spin-off is not automatically good, only informative."
    ]
  },
  {
    "id": "q173",
    "ch": 14,
    "oppg": 3,
    "type": "mcq",
    "q": "A firm sells 4,000,000 new shares at an offer price of 75. The underwriting spread is 7% and other direct costs are 9 million. Net proceeds are:",
    "options": [
      "300.0 million",
      "279.0 million",
      "270.0 million",
      "291.0 million"
    ],
    "answer": 2,
    "explanation": "Gross proceeds are 4,000,000 x 75 = 300.0 million; the spread is 0.07 x 300.0 = 21.0, so the bank pays the company 279.0; other direct costs of 9.0 leave 270.0. That, not the 300.0, is the number that funds the business. Option A is gross proceeds. Option B stops after the spread and forgets the billed costs, which are largely fixed and therefore hurt small issues most. Option D subtracts the other costs but not the spread. The bank does not invoice for its fee - it keeps a slice of the offer price, which is exactly why it is easy to leave out."
  },
  {
    "id": "q174",
    "ch": 14,
    "oppg": 3,
    "type": "mcq",
    "q": "The shares in that offering close their first day at 90. The total cost to the pre-IPO owners is:",
    "options": [
      "21.0 million, the underwriting spread",
      "90.0 million, or 30.00% of gross proceeds: the spread of 21.0, other costs of 9.0 and 60.0 of money left on the table",
      "60.0 million, the money left on the table",
      "30.0 million, the spread plus other direct costs"
    ],
    "answer": 1,
    "explanation": "Total cost = N_primary x P_close - net proceeds = 4,000,000 x 90 - 270.0 = 360.0 - 270.0 = 90.0, and it decomposes exactly into 21.0 + 9.0 + 60.0. That decomposition is the check to run at the end of any offering question. Underpricing is (90 - 75)/75 = 20.00% and it is more than twice the bank's fee, yet it never appears on an invoice, which is why candidates leave it out - options A, C and D each report one piece. Cross-check from the other direction: to net the same 270.0 at a price of 90 with a 7% spread the firm needed (270 + 9)/(90 x 0.93) = 3,333,333 shares, so it handed over 666,667 shares more than necessary, worth 60.0 at 90."
  },
  {
    "id": "q175",
    "ch": 14,
    "oppg": 3,
    "type": "mcq",
    "q": "The cost of IPO underpricing falls on:",
    "options": [
      "The company, which receives less cash than the shares were worth",
      "The pre-issue shareholders, in shares, in proportion to how many PRIMARY shares were sold",
      "Nobody, since no cash changes hands",
      "The underwriter, who bought the shares at the offer price"
    ],
    "answer": 1,
    "explanation": "State it precisely, as the examiner does. The company's accounts never see the underpricing - its cash position is the net proceeds either way - so option A confuses the balance sheet with the shareholders. Option C is worse: the pre-IPO owners' stake was diluted by more shares than it needed to be, and 'underpricing is not a payment, it is shares' is the sentence to write. Option D inverts the firm-commitment arrangement: the bank buys at the offer price less the spread and resells, so a first-day rise is a gain for its clients, not a loss for it. Watch the primary/secondary split: if part of the offering is EXISTING shares sold by a venture fund, that fund bears its slice of the underpricing personally, not the company."
  },
  {
    "id": "q176",
    "ch": 14,
    "oppg": 3,
    "type": "mcq",
    "q": "Half of offerings turn out to be worth 140 per share and half 100. Informed investors know which; you order 1,000 shares in every one and are cut back to 25% in good offerings and filled in full in bad ones. The offer price at which you break even is:",
    "options": [
      "120.00, the unconditional expected value",
      "108.00",
      "112.00",
      "100.00, the value of the bad offering"
    ],
    "answer": 1,
    "explanation": "Work in shares RECEIVED, not shares ordered: 0.50(250)(140 - P) + 0.50(1000)(100 - P) = 0, so 125(140 - P) + 500(100 - P) = 0, hence 17500 + 50000 = 625P and P = 108.00. Option A is the naive benchmark, and at that price you would lose 0.50(250)(20) + 0.50(1000)(-20) = -7,500 per round while the average first-day return across offerings is exactly 0.00% - that contrast is the winner's curse in one line. Option D over-corrects. Check at 108: 125(32) = +4,000 and 500(-8) = -4,000, summing to zero."
  },
  {
    "id": "q177",
    "ch": 14,
    "oppg": 3,
    "type": "mcq",
    "q": "At that price the measured average first-day return is 0.50(29.6296%) + 0.50(-7.4074%) = 11.1111%. This number is:",
    "options": [
      "The profit uninformed investors earn on the shares they receive",
      "Compensation for adverse allocation: uninformed investors break even, and the issuer gives up 12.00 per share against an unconditional value of 120",
      "The underwriter's total fee expressed as a return",
      "Evidence that the market is inefficient"
    ],
    "answer": 1,
    "explanation": "The measured underpricing is not a profit anyone earns. Uninformed investors make a large percentage return on the offerings they barely get into and lose a small one on the offerings they are stuffed with, and it exactly cancels - that is what setting expected profit to zero produced. The cost to the issuer is real, though: shares worth 120 on average are sold for 108, which is 12.00 per share, 8.5714% of the value and 11.1111% of the offer price. Option D confuses adverse selection with mispricing, exactly as in k13. Note that the issuer cannot escape by excluding the informed, because their bids are what builds the book and tells the bank what the offering is worth."
  },
  {
    "id": "q178",
    "ch": 14,
    "oppg": 3,
    "type": "mcq",
    "q": "A company with 50,000,000 shares trading at 60 raises 450 million in a 1-for-5 rights issue at a subscription price of 45. The theoretical ex-rights price and the value of one right are:",
    "options": [
      "TERP = 57.50 and each right is worth 2.50",
      "TERP = 60.00 and each right is worth 15.00",
      "TERP = 52.50 and each right is worth 7.50",
      "TERP = 45.00 and each right is worth zero"
    ],
    "answer": 0,
    "explanation": "New shares = 50,000,000/5 = 10,000,000 at 45, which raises 450 million. TERP = (3,000 + 450)/60 million shares = 57.50, and the right is worth P_cum - TERP = 60 - 57.50 = 2.50. Cross-check the other way: five rights plus 45 buy a share worth 57.50, a gain of 12.50 spread over five rights, so 2.50 each. Option B denies that the price falls at all, which is arithmetic rather than opinion: the share count rises by 20% while the value inside the firm rises by 15%. Every valuation after the ex-rights date uses TERP, not the cum price; keep using 60 where 57.50 belongs and every later sub-question inherits the error."
  },
  {
    "id": "q179",
    "ch": 14,
    "oppg": 3,
    "type": "mcq",
    "q": "The same 450 million is instead raised at a subscription price of 30, requiring 15,000,000 new shares. A holder of 1,000 shares who subscribes in full ends up with:",
    "options": [
      "Less wealth, because the deeper discount dilutes him more",
      "60,000 either way; the discount changes TERP from 57.50 to 53.0769 and the right from 2.50 to 6.9231, but not his wealth",
      "More wealth, because he buys shares more cheaply",
      "60,000 only if he sells the rights instead of subscribing"
    ],
    "answer": 1,
    "explanation": "TERP = 3,450/65 = 53.0769 and the right is worth 60 - 53.0769 = 6.9231. Subscribing for 300 new shares costs 9,000 and leaves 1,300 shares worth 1,300 x 53.0769 = 69,000, so wealth is 60,000 - exactly the 1,000 x 60 he started with, and exactly what the 1-for-5 at 45 produced. The subscription discount is a choice about how many new shares to create, not about how much value to give away. What it DOES change is the penalty for inaction: letting the rights lapse now costs 6,923.08 instead of 2,500. Option A is the most common misreading of a Norwegian rights issue; the only shareholder who loses is the one who neither subscribes nor sells."
  },
  {
    "id": "q180",
    "ch": 14,
    "oppg": 3,
    "type": "short",
    "q": "Explain the winner's curse in three sentences, as an exam answer, and then say what a rights issue does about the problem in k12.",
    "model": [
      "Sentence 1: some investors are informed about which offerings are worth more than the offer price, so they bid for the good ones and stay away from the bad ones.",
      "Sentence 2: an uninformed investor who bids for everything therefore has his order rationed precisely when the deal is good and filled completely when it is bad, so the average return on the shares he ACTUALLY RECEIVES is far worse than the average return across offerings.",
      "Sentence 3: the offering must therefore be priced below its expected value for his participation constraint to hold, and that gap is equilibrium underpricing - compensation for adverse allocation, not a profit anyone earns.",
      "Three supporting explanations worth a sentence each, since verbal answers are graded on breadth: LITIGATION RISK, since an offering that breaks its issue price attracts lawsuits and underpricing is cheap insurance; CASCADES, since early investors' willingness to buy is observed by later ones and a weak start can kill the deal; and CONFLICTED UNDERWRITERS, since the bank sells to the same institutions repeatedly and an underpriced offering is an easy sale and a favour it can call in. Book building itself is a fourth: it buys information from investors and pays for it with allocations of underpriced stock.",
      "The rights issue answer: a rights offer sells the new shares to the people who ALREADY OWN the firm, so the wealth transfer from old shareholders to new investors has nobody to flow to - the two groups are the same group. That is the clean answer to 'how can the firm avoid the adverse-selection cost of an equity issue?', and it is why rights offers are standard in Norway and much of Europe. The limit is that it requires owners with cash who will take up the rights."
    ]
  },
  {
    "id": "q181",
    "ch": 14,
    "oppg": 3,
    "type": "short",
    "q": "State the two post-issue regularities the chapter says to carry into a verbal answer, with the caveat each one needs.",
    "model": [
      "1. CYCLES. The number of offerings and the average underpricing move together, and both move with the market: issuance clusters in windows where valuations are high and investor appetite is strong, and dries up almost completely in downturns. This is k13's market timing seen from the aggregate - firms issue when equity is expensive.",
      "2. LONG-RUN UNDERPERFORMANCE. Firms that have just issued equity, at an IPO or in a seasoned offering, have historically underperformed comparable non-issuing firms over the following three to five years.",
      "Give both readings of the second, because the caveat is where the marks are. The BEHAVIOURAL reading: investors were over-optimistic at the offering and the price drifts back, so managers were timing a genuine mispricing. The RATIONAL reading: the result is sensitive to how comparables and risk adjustments are chosen, and issuers differ systematically from non-issuers in size, age and growth, so part of the effect is a benchmark problem rather than an anomaly.",
      "Keep the two versions of market timing apart, exactly as in k13. The information version is Myers-Majluf again and needs no inefficiency at all; only the behavioural version requires prices to be wrong, and only it predicts systematic post-issue underperformance. State which version you mean and the answer is complete.",
      "First-day returns have averaged in the high teens in the United States over recent decades, with enormous variation across time and markets - quote it as an order of magnitude, not as a precise figure."
    ]
  },
  {
    "id": "q182",
    "ch": 15,
    "oppg": 3,
    "type": "mcq",
    "q": "In a perfect market the ex-dividend price falls by exactly the dividend because:",
    "options": [
      "Accounting rules require the equity account to be reduced",
      "Buying cum-dividend, collecting the dividend and selling ex would otherwise be a riskless profit, so trade closes the gap",
      "Investors dislike dividends and sell before the ex-date",
      "The firm's assets fall in value by the amount paid out"
    ],
    "answer": 1,
    "explanation": "At a cum price of 30.00 with a 5.00 dividend, an ex price of 26.00 would let you pay 30.00 and receive 31.00 overnight with no risk and no capital tied up. Everyone would do it, the cum price is bid up or the ex price driven down, and the gap closes at exactly 5.00. The drop is enforced by trade, the same way MM Proposition I was in k6. Option D is nearly right but says it backwards: the CASH falls by the amount paid, and the operating assets are untouched - it is the claim on the cash that leaves with it. Option C would predict a drop of the wrong size and is a tax story, which belongs to k16, where the drop becomes Div x (1 - tau_d)/(1 - tau_g)."
  },
  {
    "id": "q183",
    "ch": 15,
    "oppg": 3,
    "type": "mcq",
    "q": "A firm has 25 million shares, operations worth 500 (FCF 50 at rU = 10.00%) and 125 of excess cash, so P0 = 25.00. Compare paying the 125 as a dividend with using it to repurchase shares.",
    "options": [
      "Dividend: ex-price 20.00 on 25 million shares. Repurchase: 5 million shares bought, 20 million left, price still 25.00. Both leave a holder with 2,500 per 100 shares",
      "Dividend: ex-price 20.00. Repurchase: price rises to 31.25 because fewer shares share the same firm",
      "Dividend: price unchanged at 25.00, since the cash was already in the price. Repurchase: price falls to 20.00",
      "Both leave the price at 25.00, since payout is irrelevant"
    ],
    "answer": 0,
    "explanation": "A dividend changes the NUMERATOR and a repurchase changes the DENOMINATOR, and per share the two arrive at the same place. Dividend: DPS = 125/25 = 5.00, ex-price 20.00, market capitalisation 500. Repurchase: n = 125/25.00 = 5 million, N1 = 20 million, E1 = 500, price 500/20 = 25.00. Option B forgets that the firm handed over cash worth exactly what it bought, so a repurchase at a fair price is a zero-NPV transaction. Option D confuses irrelevance of WEALTH with constancy of the quoted price: the two routes leave different prices and different share counts, and identical wealth. Confirm through the ongoing dividend: 50/25 = 2.00 at 10% is 20.00, and 50/20 = 2.50 at 10% is 25.00."
  },
  {
    "id": "q184",
    "ch": 15,
    "oppg": 3,
    "type": "mcq",
    "q": "A shareholder holding 100 shares receives the 5.00 dividend and does not want the cash. He rebuilds his position by reinvesting the 500 at:",
    "options": [
      "25.00, the cum-dividend price, buying 20 shares",
      "20.00, the ex-dividend price, buying 25 shares and ending with 125",
      "The average of the two prices",
      "He cannot: once paid, the dividend cannot be undone"
    ],
    "answer": 1,
    "explanation": "Reinvestment happens at the price at which the shares now trade, which is the ex-dividend price of 20.00, so he buys 25 shares and holds 125 worth 2,500 - identical to the 100 shares worth 2,500 he would have held under the repurchase route. Check by OWNERSHIP FRACTION rather than by share count, since the two routes leave different totals outstanding: 125/25,000,000 and 100/20,000,000 are both 0.0000060. Option A is the mirror image of the standard repurchase error and it makes the check fail, since 120 shares out of 25 million is a smaller claim. Option D denies homemade dividends: a shareholder who wants cash under the repurchase route sells 500/25.00 = 20 shares and ends in exactly the dividend position."
  },
  {
    "id": "q185",
    "ch": 15,
    "oppg": 3,
    "type": "mcq",
    "q": "An all-equity firm has 50 million shares, FCF of 120 in perpetuity and rU = 8.00%, so P0 = 30.00. It issues 600 of permanent risk-free debt at 4.00% and pays it out. No taxes. Afterwards rE is:",
    "options": [
      "8.0000%",
      "10.6667%",
      "12.0000%",
      "6.6667%"
    ],
    "answer": 1,
    "explanation": "V stays 1500, so E1 = 900 and D/E = 600/900 = 0.6667. Then rE = 0.0800 + 0.666667(0.0800 - 0.0400) = 0.0800 + 0.026667 = 0.106667. Check it: (900/1500)(0.106667) + (600/1500)(0.0400) = 0.0640 + 0.0160 = 0.0800 = rU, so the pre-tax WACC is flat. Option A forgets to relever - the firm is no longer all-equity. Option C substitutes D/V = 0.40 into a formula that takes D/E, and the check then fails. Option D subtracts the spread instead of adding it. rE is the same on both payout routes, because leverage D/E is the same on both."
  },
  {
    "id": "q186",
    "ch": 15,
    "oppg": 3,
    "type": "mcq",
    "q": "Same firm and same 600 of debt, paid out as a special dividend rather than a buyback. The ex-dividend price and the ongoing dividend per share are:",
    "options": [
      "18.00 and 1.92",
      "30.00 and 3.20",
      "18.00 and 3.20",
      "12.00 and 2.40"
    ],
    "answer": 0,
    "explanation": "DPS_special = 600/50 = 12.00, so the ex-dividend price is 30.00 - 12.00 = 18.00 on an unchanged 50 million shares, and 50 x 18.00 = 900 = E1. Interest is 0.04 x 600 = 24, leaving 96 for equity, so the ongoing DPS is 96/50 = 1.92 and 1.92/0.106667 = 18.00 confirms it. Option B is the repurchase route (price 30.00, 96/30 = 3.20 per share on 30 million shares). Option C mixes one from each. The two routes split differently between price and share count and are identical in every other respect, which is the sentence the exam wants."
  },
  {
    "id": "q187",
    "ch": 15,
    "oppg": 3,
    "type": "mcq",
    "q": "The board considers holding 125 of cash for one year at rf = 4.00% and paying it out then instead of now. A shareholder who wants his money today:",
    "options": [
      "Is worse off by the year's interest",
      "Does not care: he borrows 500 against his 100 shares at 4.00%, and the 520 he receives next year exactly repays 520",
      "Is better off, because deferral defers his tax",
      "Cannot replicate the immediate payout without selling shares"
    ],
    "answer": 1,
    "explanation": "The account pays 125 x 1.04 = 130 in a year, risk-free, worth 130/1.04 = 125 today, so today's price does not move: retaining cash is negative debt and creates nothing. A holder of 100 shares wanting 500 now borrows 500 at 4.00%; next year he receives 100 x (130/25) = 520 and repays 500 x 1.04 = 520, exactly cancelling. Option C imports a friction that this chapter has assumed away and k16 prices. Option D is wrong twice: selling shares is one homemade route and borrowing is another, and both are available at the same prices the firm faces. The step that can fail is borrowing the PRESENT VALUE of what you will receive - borrow 520 instead and the year-end receipt falls 20.80 short."
  },
  {
    "id": "q188",
    "ch": 15,
    "oppg": 3,
    "type": "short",
    "q": "An all-equity firm with 50 million shares at 30.00 (FCF 120, rU = 8.00%) issues 600 of permanent risk-free debt at 4.00% and pays it out. Run the exercise both ways and answer the question the exam ends on: did the shareholder who sold beat the one who held?",
    "model": [
      "Step 1 - the starting point. V = 120/0.08 = 1500, all equity, so P0 = 30.00 and the current DPS is 120/50 = 2.40, with 2.40/0.08 = 30.00. Being unlevered, rE = rU = 8.0000%.",
      "Step 2 - the announcement. No taxes, no issuance costs, no change to the assets, so there is no news to price: V stays 1500 and the price stays 30.00. Say this AND say why, naming MM Proposition I - it is the sub-question's whole content.",
      "Step 3 - the capital structure afterwards, common to both routes. E1 = 900, D/E = 0.6667, rE = 0.0800 + 0.666667(0.0800 - 0.0400) = 10.6667%. Pre-tax WACC check: 0.60(0.106667) + 0.40(0.0400) = 0.0800 = rU. Interest is 24, so equity now receives 96 a year.",
      "Step 4 - route A, special dividend. DPS = 600/50 = 12.00, ex-price 18.00 on 50 million shares, and 50 x 18.00 = 900. Ongoing DPS = 96/50 = 1.92, and 1.92/0.106667 = 18.00.",
      "Step 5 - route B, repurchase. n = 600/30.00 = 20 million, N1 = 30 million, and 900/30 = 30.00, unchanged. Ongoing DPS = 96/30 = 3.20, and 3.20/0.106667 = 30.00.",
      "Step 6 - the four positions, each from one share worth 30.00. Do nothing: a share paying 2.40 forever at 8.0000%, worth 30.00. Special dividend: a share paying 1.92 forever at 10.6667% (18.00) plus 12.00 in cash, worth 30.00. Tendered into the buyback: 30.00 in cash. Held through the buyback: a share paying 3.20 forever at 10.6667%, worth 30.00. All four are 30.00.",
      "The answer sentence: the seller did not beat the holder, the dividend did not beat the repurchase, and the recapitalisation did not beat doing nothing. The check that can fail is discounting each NEW dividend per share at the NEW rE, because neither number entered the price; P = E1/N1 cannot fail and proves nothing."
    ]
  },
  {
    "id": "q189",
    "ch": 15,
    "oppg": 3,
    "type": "short",
    "q": "List the assumptions payout irrelevance needs, and say for each which later friction removes it.",
    "model": [
      "1. No taxes on dividends or capital gains. Removes: k16, where the effective dividend tax rate tau*_d = (tau_d - tau_g)/(1 - tau_g) makes the price fall by LESS than the dividend, and the repurchase becomes the cheaper route.",
      "2. No transaction or issuance costs. Removes: k16. Homemade dividends are only free if selling shares is free, and an investor needing regular income with costly trading genuinely prefers a dividend.",
      "3. Symmetric information. Removes: k16's signalling, and k13 more generally. Once the payout tells the market something, an announcement moves the price - and the movement is information about existing value, not value created.",
      "4. Investment policy fixed and value-maximising. Removes: k11 section 11.1 and k16's agency argument. If cash inside the firm is spent badly, paying it out creates value; if paying it out forces the firm to skip a positive-NPV project, value falls - but through INVESTMENT, not through payout.",
      "5. The cash earns a fair return while retained. Removes: k16. Otherwise value leaks away while the firm sits on the money.",
      "Why the result is useful even though its assumptions are false: it is a benchmark, not a description. Because the perfect-market answer is exactly zero, any observed price reaction to a payout announcement must be attributable to one of these five lines, and naming which one is the answer. Without the benchmark, 'the price rose after the buyback' has a hundred explanations."
    ]
  },
  {
    "id": "q190",
    "ch": 16,
    "oppg": 3,
    "type": "mcq",
    "q": "An investor pays tau_d = 35% on dividends and tau_g = 25% on realised capital gains. The effective dividend tax rate is:",
    "options": [
      "10.0000%",
      "13.3333%",
      "35.0000%",
      "26.6667%"
    ],
    "answer": 1,
    "explanation": "tau*_d = (tau_d - tau_g)/(1 - tau_g) = (0.3500 - 0.2500)/0.7500 = 0.1000/0.7500 = 0.133333. Option A is the raw difference in rates and ignores that the capital gain is itself taxed, which is what makes the penalty RELATIVE to a gain larger than the gap between the rates. Option C is the dividend rate itself, which would be the answer only if capital gains were untaxed. Option D divides by (1 - tau_d) instead. When tau_d equals tau_g the measure is zero and k15's full ex-dividend drop returns."
  },
  {
    "id": "q191",
    "ch": 16,
    "oppg": 3,
    "type": "mcq",
    "q": "A share trades at 80.00 the day before it goes ex on a dividend of 6.00, with tau_d = 35% and tau_g = 25%. The ex-dividend price is:",
    "options": [
      "74.00",
      "74.80",
      "76.10",
      "80.00"
    ],
    "answer": 1,
    "explanation": "P_cum - P_ex = Div x (1 - tau_d)/(1 - tau_g) = 6.00 x 0.65/0.75 = 5.20, so P_ex = 74.80: the price falls by LESS than the dividend, because a krone of dividend is worth less in the hand than a krone of price given up. Verify with a cost basis of 50: selling cum yields 80.00 - 0.25(30.00) = 72.50, while holding through yields 6.00(0.65) + 74.80 - 0.25(24.80) = 3.90 + 68.60 = 72.50, so the investor is indifferent and 74.80 is the equilibrium. Option A is k15's perfect-market drop, and at that price holding through pays only 71.90 against 72.50 for selling first, so everyone would sell cum-dividend - not an equilibrium. The leak to the tax authority is 6.00 - 5.20 = 0.80 = 6.00 x tau*_d."
  },
  {
    "id": "q192",
    "ch": 16,
    "oppg": 3,
    "type": "mcq",
    "q": "A repurchase is taxed more lightly than a dividend for three separate reasons. They are:",
    "options": [
      "A lower rate, a smaller base, and deferral for everyone who does not tender",
      "A lower rate, a larger base, and no withholding",
      "Deferral, a lower rate, and exemption for institutional holders",
      "A smaller base, a lower rate, and the fact that the firm deducts the payment"
    ],
    "answer": 0,
    "explanation": "Rate: tau_g instead of tau_d. Base: only the gain (P minus basis), not the whole payment. Deferral: shareholders who do not tender pay nothing until they eventually sell. Name all three; an answer giving one earns a fraction of the marks. Option B has the base backwards - the base is smaller, which is the point. Option D invents a corporate deduction: neither dividends nor repurchases are deductible, which is why the interest shield of k7 exists at all. Value the deferral as a present value rather than assuming it away: it is a delay, not a saving, and the shares that remain carry a LARGER unrealised gain under the repurchase."
  },
  {
    "id": "q193",
    "ch": 16,
    "oppg": 3,
    "type": "mcq",
    "q": "25 million shares trade at 40.00 with a basis of 25.00; the firm distributes 200. tau_d = 30%, tau_g = 20%, remaining shares are expected to be sold in 8 years and the deferred liability is discounted at 5.00%. The present value of tax paid is:",
    "options": [
      "60.00 as a dividend and 15.00 as a repurchase, a saving of 45.00",
      "83.69 as a dividend and 55.61 as a repurchase, a saving of 28.08",
      "60.00 as a dividend and 55.61 as a repurchase, a saving of 4.39",
      "The same under both, since the same 200 leaves the firm"
    ],
    "answer": 1,
    "explanation": "Dividend: DPS = 8.00, ex-price 32.00, tax now 0.30 x 200 = 60.00; the 25 million shares then carry an unrealised gain of 7.00 each, so 35.00 of future tax with a present value of 35.00/1.05^8 = 23.69, giving 83.69. Repurchase: 5 million shares bought at 40.00 realise a gain of 15.00 each, so 15.00 of tax now; the remaining 20 million carry a gain of 15.00 each, so 60.00 of future tax worth 40.61 today, giving 55.61. The saving is 28.08, about 14% of the amount distributed. Option A stops at the immediate tax and ignores the larger embedded gain the repurchase leaves behind, which is the half of the comparison candidates drop. Pre-tax wealth is 1000 on both routes, which is the check that the comparison is measuring tax and nothing else."
  },
  {
    "id": "q194",
    "ch": 16,
    "oppg": 3,
    "type": "mcq",
    "q": "30 million shares trade at 25.00. The firm makes a fixed-price tender offer for 6 million shares at 28.00 and every holder tenders, so the purchase is pro rata. Afterwards:",
    "options": [
      "The price is 28.00, since that is what the firm paid",
      "The price is 24.25, and a holder who tenders pro rata is left with exactly 25.00 per original share",
      "The price is 25.00, because a repurchase is always price-neutral",
      "The price is 24.25, and every shareholder gains the 12% premium"
    ],
    "answer": 1,
    "explanation": "Outlay = 6 x 28.00 = 168, so E1 = 750 - 168 = 582 on 24 million shares, giving P1 = 24.25 - BELOW the 25.00 it started at, because the premium was paid out of the shares that remain. Wealth per original share = 0.20(28.00) + 0.80(24.25) = 5.60 + 19.40 = 25.00. Option D is the error the mechanism is designed to expose: the premium is a TRANSFER from those who stay to those who sell, which is why fixed-price offers are almost always oversubscribed and pro-rated. Option A produces a firm that gained 60 by handing out its own cash (168 + 24 x 28.00 = 840 against 750), which is the contradiction that catches the mistake. A holder who does not tender loses 0.75 per share."
  },
  {
    "id": "q195",
    "ch": 16,
    "oppg": 3,
    "type": "mcq",
    "q": "The same 6 million shares are instead bought by Dutch auction. Shareholders offer 1.5 million at 25.50, 2.0 million at 26.00 and 3.5 million at 26.50. The clearing price and the resulting share price are:",
    "options": [
      "26.50 and 24.625, with the 26.50 bids pro-rated to 71.4286%",
      "25.50 and 24.625, since the firm pays the lowest price offered",
      "26.50 and 24.25, the same as the fixed-price offer",
      "26.00 and 24.50, where supply first exceeds demand"
    ],
    "answer": 0,
    "explanation": "Cumulative supply reaches 1.5, then 3.5, then 7.0 million, so the lowest price at which it reaches 6.0 million is 26.50. Everyone who tendered at or below 26.50 is paid 26.50, and the 26.50 bids are pro-rated: 2.5 of the 3.5 million offered there, or 71.4286%. Outlay = 159, so E1 = 591 on 24 million shares and P1 = 24.625. Option B misreads the mechanism - a single clearing price is paid to all successful tenderers, not each holder's own bid. Compared with the fixed-price offer the auction bought the same 6 million shares for 159 rather than 168, and the remaining price is higher by exactly 9/24 = 0.375. That saving to the shareholders who stay is why a firm that does not need speed prefers the auction."
  },
  {
    "id": "q196",
    "ch": 16,
    "oppg": 3,
    "type": "mcq",
    "q": "A firm announces a repurchase and the share price rises. The correct interpretation is:",
    "options": [
      "The repurchase created value equal to the price rise",
      "The announcement is read as management saying the shares are undervalued, so the price moved towards a value that was already there",
      "The remaining shareholders gained at the expense of those who tendered",
      "Earnings per share rose, and the price followed"
    ],
    "answer": 1,
    "explanation": "Everything the repurchase itself does is the k15 arithmetic, which is neutral. Buying shares at the market price is profitable for the remaining holders precisely when the shares are cheap, so the announcement is informative - and the shares were already worth more than the market thought. Keep the two claims apart in your writing: 'this is a signal about existing value' scores, and 'this creates value' is the error the keys look for. Option D confuses accounting with value: the shares that would have shared those earnings were bought and cancelled, and the holders paid for that out of the firm's own cash. The signal is weaker than a dividend increase, because an open-market programme is an announcement of intent rather than a commitment, and stronger when management's own large holdings are not tendered."
  },
  {
    "id": "q197",
    "ch": 16,
    "oppg": 3,
    "type": "mcq",
    "q": "Which instrument disciplines a cash-rich management more, and which do managers prefer?",
    "options": [
      "The repurchase disciplines more, and managers prefer the dividend",
      "The regular dividend disciplines more because it is sticky and forces the firm back to the capital market, while managers prefer the open-market repurchase because it commits to nothing",
      "Both discipline equally, since the same cash leaves",
      "Neither disciplines, since payout is irrelevant"
    ],
    "answer": 1,
    "explanation": "The two instruments differ in COMMITMENT, and that is the only difference that matters here. A regular dividend is sticky, so raising it hands the market a stick to beat management with next year and forces the firm back to outside investors for funding, where every project is priced by people who are not on the payroll. An open-market programme can be quietly abandoned - programmes are routinely only partly completed. Option C ignores the commitment asymmetry. Option D applies k15's benchmark where a friction has been restored: with agency costs of equity present, forcing cash out creates real value. The same feature explains the observed pattern: repurchases absorb the transitory part of earnings, the regular dividend the part management believes is permanent."
  },
  {
    "id": "q198",
    "ch": 16,
    "oppg": 3,
    "type": "short",
    "q": "Explain the clientele argument, say what it does and does not solve, and state the condition under which the tax preference for repurchases reverses.",
    "model": [
      "Investors do not share a tax rate. A pension fund or a sheltered account pays nothing on either dividends or gains; a taxable individual pays both; a long-horizon investor who rarely sells values deferral most. Each therefore has a different tau*_d and a different opinion about the payout policy.",
      "They sort themselves: investors who dislike dividends buy firms that do not pay them, and investors who do not care buy the firms that do. Once the sorting is complete the MARGINAL investor - the one who is indifferent at the current price - is by construction one who does not mind the policy, so the price shows no penalty.",
      "What it explains: why the ex-dividend drop in real data sits closer to the full dividend than a top personal tax rate would predict. The marginal holder over the ex-date is often a tax-exempt institution or a trader with a low effective rate.",
      "What it does NOT explain: why the firm chose the policy in the first place. Supplying a clientele that is already well served creates nothing, so the puzzle survives at the aggregate level.",
      "The reversal condition, which a full answer states rather than assumes: the tax argument has a sign only relative to a specified pair of rates and a specified investor. It is silent for a tax-exempt holder, and it reverses in any system that taxes gains at least as heavily as dividends - through imputation or shareholder credits, for instance. Write the condition, then the conclusion: 'if tau_d exceeds tau_g, as here, the repurchase is the cheaper route by 28.08'. An unconditional answer invites the counter-example.",
      "A related inequality worth quoting: retaining cash carries a tax disadvantage when tau_c > tau_i and an advantage when tau_c < tau_i, because the dividend tax cancels on both routes and only the tax on the interim interest differs."
    ]
  },
  {
    "id": "q199",
    "ch": 16,
    "oppg": 3,
    "type": "short",
    "q": "Write the payout discussion answer: what shape does it take, and what earns the marks?",
    "model": [
      "Open with the benchmark in one sentence: in a perfect market the form and timing of payout are irrelevant, so anything the question is asking about must come from a named friction. That sentence alone frames the whole answer and it is the first thing the key looks for.",
      "Then SIGN two or three frictions for THIS firm, not in general. Taxes: are the holders taxable and long-horizon, so that tau*_d bites and repurchases dominate? Clienteles: does the firm have a stable, identifiable shareholder base already served? Signalling: are earnings hard for outsiders to observe, so that a smoothed sustainable dividend carries information? Agency: is there free cash flow and no good project, so that the COMMITMENT value of a dividend is large? Transaction costs and flexibility: are investment needs lumpy, so retention or the non-committal repurchase is worth more?",
      "Say which force DOMINATES, and conclude in the direction the question asked. Listing forces and stopping is the commonest way to lose points here, exactly as with capital structure in k11.",
      "Two sentences that reliably earn marks. On signalling: a payout announcement is information about value that already existed, not value created; a dividend increase is credible because cutting it later is punished hard, and the reaction to a cut is much larger than to an equivalent increase because managers avoid cutting until they have to. On agency: a payout removes the cash that funded empire building, debt service becomes a hard constraint, and the firm must return to outside investors to fund anything new.",
      "Close with a limitation, since the keys credit it: a payout also removes flexibility and can force the firm to skip genuinely good projects later. Four to six sentences is the stated budget, and a well-argued unusual point is credited rather than penalised."
    ]
  },
  {
    "id": "q200",
    "ch": 7,
    "oppg": 1,
    "type": "short",
    "q": "A firm with V^U = 800 borrows 200 at rD = 6.00% with tau_c = 25% and rU = 10.00%. Value it under a constant D/E policy and prove the answer by a route that does not use PV(TS).",
    "model": [
      "Annual shield: TS = tau_c x rD x D = 0.25 x 0.06 x 200 = 3.0000. Constant D/E means rebalancing, so the shield carries asset risk and is discounted at rU: PV(TS) = 3.0000/0.10 = 30.0000, hence V^L = 830.00.",
      "Now the independent route, consistency check 1. E = 830 - 200 = 630, so D/E = 200/630 = 0.3175.",
      "rE = 0.1000 + 0.3175(0.1000 - 0.0600) = 0.1000 + 0.012698 = 0.112698 = 11.2698%.",
      "rwacc = (630/830)(0.112698) + (200/830)(0.0600)(0.75) = 0.085542 + 0.010843 = 0.096386 = 9.6386%.",
      "The unlevered free cash flow is 80 a year (800 x 0.10), so V^L = 80/0.096386 = 830.00. Same answer, and PV(TS) never entered - that is what makes it a real check rather than an identity.",
      "Show that it can fail: discount at rD while still rebalancing, claim V^L = 850, and the same route gives E = 650, D/E = 0.3077, rE = 0.112308, rwacc = 0.096471 and V^L = 829.27, a mismatch the examiner will spot. Say in one line which debt policy you assumed before you compute - that sentence earns marks on its own."
    ]
  },
  {
    "id": "q201",
    "ch": 10,
    "oppg": 2,
    "type": "short",
    "q": "Debt of face value 120 matures in a year against cash flows of 60 or 180, equally likely, rf = 4.00%. A project costing 25 adds a safe 40 in both states. Show the overhang, then find a renegotiated face value both sides accept.",
    "model": [
      "Step 1 - the claims as they stand. Debt pays min(CF, 120): 60 and 120, expected 90, so D0 = 90/1.04 = 86.5385. Equity pays max(CF - 120, 0): 0 and 60, expected 30, so E0 = 30/1.04 = 28.8462. V0 = 115.3846.",
      "Step 2 - the NPV. 40/1.04 - 25 = 38.4615 - 25 = 13.4615, comfortably positive.",
      "Step 3 - revalue with the project. Cash flows 100 and 220. Debt: 100 and 120, expected 110, D1 = 105.7692. Equity: 0 and 100, expected 50, E1 = 48.0769.",
      "Step 4 - who gains. Creditors +19.2308; shareholders 48.0769 - 28.8462 - 25 = -5.7692, so they REJECT. Write the words DEBT OVERHANG. Check 3: 19.2308 - 5.7692 = 13.4615 = NPV. The bad-state increment, worth 0.5(40)/1.04 = 19.2308, went wholly to the lenders while the owners paid all 25.",
      "Step 5 - the bargaining range. Creditors need D(K1) >= 86.5385, so the expected payoff must reach 90; for K1 <= 100 the debt is safe and pays K1 in both states, hence K1 >= 90. Shareholders need the expected equity payoff to reach 1.04(28.8462 + 25) = 56.00; for K1 >= 100 that is 110 - 0.5K1 >= 56, hence K1 <= 108. Range: 90 <= K1 <= 108.",
      "Step 6 - take K1 = 100. Debt pays 100 in both states, so D = 96.1538 and creditors gain 9.6154. Equity pays 0 and 120, so E = 57.6923 and shareholders gain 57.6923 - 28.8462 - 25 = 3.8462. Both positive, the project proceeds. Check 3 again: 9.6154 + 3.8462 = 13.4615 = NPV. At the endpoints one side takes everything.",
      "Note what check 3 cannot catch: a wrong rho or rf scales both claims alike and passes. What it does catch is forgetting to subtract I, and writing K1 rather than the actual cash flow in the default state."
    ]
  },
  {
    "id": "q202",
    "ch": 12,
    "oppg": 3,
    "type": "short",
    "q": "V_H = 300, V_L = 150, q = 0.50, I = 80 raised by a share issue, project NPV = 20. Work the equilibrium, then say what changes if the NPV is only 10.",
    "model": [
      "Test pooling first. E[V | issue] = 0.50(300) + 0.50(150) = 225, so the post-issue firm is worth 225 + 80 + 20 = 325 and alpha = 80/325 = 0.2462.",
      "High type: dilution = 0.246154(300 - 225) = 18.4615, below the NPV of 20, so it issues. Payoff = 300 + 20 - 18.4615 = 301.5385 against 300 by abstaining. Direct form: (1 - 0.246154)(400) = 301.5385.",
      "Low type: it gains 18.4615, so its payoff is 150 + 20 + 18.4615 = 188.4615 against 150. It issues. Direct form: (0.753846)(250) = 188.4615.",
      "Consistency check 5: both types issue, which is exactly what the pooling belief assumed, so the belief is confirmed by the behaviour it priced. Rational POOLING equilibrium, both firms invest, no NPV lost - only a transfer of 18.4615 between two groups of old shareholders, with new investors breaking even.",
      "With NPV = 10 the answer flips. Pooling would give alpha = 80/315 = 0.2540 and a dilution of 19.0476 for the high type, above 10, so it abstains and the pooling belief collapses. Reprice at E[V | issue] = 150: alpha = 80/240 = 0.3333, the low type keeps (2/3)(240) = 160.00 against 150 and still issues, while the high type would get (2/3)(390) = 260.00 against 300 and stays out. Rational SEPARATING equilibrium.",
      "The cost of the information problem is then real: the high type abandons a project worth 10, so an expected 0.50 x 10 = 5 is destroyed. Sanity check that prices average back: 0.50(300) + 0.50(160) = 230 = the prior 225 plus the expected NPV actually captured, 0.50(10) = 5.",
      "The threshold: with these V_H, V_L and I, the outcome pools above q* = 0.7111 and separates below it. Verify any threshold by substituting it back - at q* the dilution equals the NPV exactly."
    ]
  },
  {
    "id": "q203",
    "ch": 13,
    "oppg": 3,
    "type": "short",
    "q": "A firm must raise 120 and could sell debt or equity. Its value next year is 500 or 260 if it is the high type, 340 or 80 if it is the low type, each state equally likely at rf = 0, with the market putting q = 0.50 on each type. Show which security the good firm prefers and why.",
    "model": [
      "Expected values: high 380, low 210, pooled 295. Investors who cannot tell the types apart price off 295.",
      "EQUITY. Selling a fraction alpha for 120 requires alpha = 120/295 = 0.4068. The high type's old shareholders keep (1 - alpha)(380) = 0.593220 x 380 = 225.4237, against a full-information benchmark of 380 - 120 = 260.00, so they transfer 34.5763. Cross-check two ways: the stake sold is worth 0.406780 x 380 = 154.5763 for 120 of cash, and the k12 dilution formula gives alpha(380 - 295) = 34.5763.",
      "DEBT. Find the face value that raises 120. For K between 80 and 260 the high type pays K in both states, so its debt is worth K; the low type pays K in the up state and hands over 80 in the down state, so its debt is worth 0.5K + 40. The pooled price is 0.50(K) + 0.50(0.5K + 40) = 0.75K + 20 = 120, hence K = 133.3333, which is indeed inside the interval.",
      "The high type's debt is truly worth 133.3333 and it received 120, so it transfers 13.3333. The low type's is worth 106.6667 and it received 120, so it gains 13.3333.",
      "Check A - with q = 0.50 the transfer must be half the spread between the two true values. Debt: (133.3333 - 106.6667)/2 = 13.3333. Equity: (154.5763 - 85.4237)/2 = 34.5763. The gap IS the information sensitivity of the security, and the pecking order is the observation that 26.6667 is smaller than 69.1526.",
      "Check B - conservation. Investors break even on average: 0.50(-13.3333) + 0.50(+13.3333) = 0 for debt, and the same for equity. Nothing is created; what the good firm loses the bad firm gains, which is consistency check 4.",
      "The answer: the good firm prefers debt by 34.5763 - 13.3333 = 21.2430. The bad firm would rather issue equity but cannot say so without revealing itself, so in equilibrium it mimics and issues debt too. Add the investment consequence, which is the pecking order's real claim: the hurdle for the good firm's project is 13.3333 with debt against 34.5763 with equity, so debt rescues every project whose NPV lies between the two - less underinvestment, not merely a cheaper transaction.",
      "Finally, note the free rung: the lowest payoff either type can produce is 80, so any face value up to 80 is riskless, both types' claims are worth exactly the same, and the first 80 raised costs nothing at all in information terms."
    ]
  },
  {
    "id": "q204",
    "ch": 14,
    "oppg": 3,
    "type": "short",
    "q": "A company with 12,000,000 shares sells 4,000,000 new shares at 75 with a 7% spread and 9 million of other direct costs; the stock closes its first day at 90. Work out what the offering cost the founders, and split the cost into its parts.",
    "model": [
      "Gross proceeds = 4,000,000 x 75 = 300.0 million. Spread = 0.07 x 300.0 = 21.0, so the bank pays the company 279.0. Net proceeds = 279.0 - 9.0 = 270.0, and that is what funds the business.",
      "Underpricing = (90 - 75)/75 = 20.00%. Money left on the table = 4,000,000 x 15 = 60.0.",
      "Total cost to the pre-IPO owners = value surrendered at the market's own price minus what the company received = 4,000,000 x 90 - 270.0 = 360.0 - 270.0 = 90.0. It decomposes exactly: 21.0 spread + 9.0 other + 60.0 left on the table, which is 7.00% + 3.00% + 20.00% = 30.00% of gross proceeds. Run that decomposition as the closing check on any offering question.",
      "Position afterwards: 16,000,000 shares at 90 gives a market capitalisation of 1,440.0, of which the pre-IPO owners hold 12/16 = 75%, worth 1,080.0.",
      "Second route to the same 60.0, and the one that shows what underpricing IS. To net the same 270.0 at a price of 90 with a 7% spread, the firm needed (270.0 + 9.0)/(90 x 0.93) = 279.0/83.70 = 3,333,333 shares. It sold 4,000,000, so it handed over 666,667 shares more than necessary, worth 60.0 at 90. Underpricing is not a payment, it is shares.",
      "State the incidence precisely, as the examiner does: the cost of underpricing falls on the PRE-ISSUE SHAREHOLDERS, in shares, in proportion to how many PRIMARY shares were sold. The company's cash position is 270.0 either way. Had 1,000,000 of the four million been SECONDARY shares sold by a venture fund, that fund would have received 75 x 0.93 = 69.75 per share instead of the 90 the market paid within hours, and it would bear that slice of the underpricing itself."
    ]
  }
];

/* ---------- Conceptual flashcards (formula cards are auto-generated from k29) ---------- */
window.EDU_DATA.flashcards = [
  {
    "id": "fc1",
    "ch": 0,
    "deck": "begrep",
    "front": "The exam format from 2024 onwards",
    "back": "<b>6 exercises, 100 points, 3 hours, closed book, no multiple choice.</b><br>Two pure discussion exercises at 12 points each, so 24 of 100 points are prose with no computation. Calculator and one bilingual dictionary permitted. Grade A-F on the total, so no exercise has to be passed on its own."
  },
  {
    "id": "fc2",
    "ch": 0,
    "deck": "begrep",
    "front": "The organising identity of the course",
    "back": "V<sup>L</sup> = V<sup>U</sup> + PV(TS) &minus; PV(distress costs) &minus; PV(agency costs) + PV(agency benefits)<br><br>V<sup>U</sup> is what MM I says is all there is. Each later term is one named imperfection put back: interest deductibility (k7), costly bankruptcy (k8), the shareholder-creditor conflict (k9-k10), debt as discipline (k11). <b>Not on the formula sheet.</b>"
  },
  {
    "id": "fc3",
    "ch": 0,
    "deck": "mekanisme",
    "front": "The five consistency checks",
    "back": "<b>1.</b> Value by WACC = value by APV.<br><b>2.</b> [E/V]&beta;<sub>E</sub> + [D/V]&beta;<sub>D</sub> = &beta;<sub>U</sub>.<br><b>3.</b> Creditors' gain + shareholders' gain = the project's NPV.<br><b>4.</b> Creditors' gain = shareholders' loss when total value is fixed.<br><b>5.</b> Are investors' beliefs rational given the action taken?<br><br>1 and 2 are redundant computations, 3 and 4 are conservation laws, 5 is an equilibrium question."
  },
  {
    "id": "fc4",
    "ch": 0,
    "deck": "mekanisme",
    "front": "The four moves that score on a quantitative sub-question",
    "back": "<b>1. State the method</b> in one sentence.<br><b>2. Show the arithmetic</b> - the substituted expression, not only the result. H2017: no calculation, no points.<br><b>3. Name the mechanism</b> - write 'debt overhang', 'asset substitution', 'coinsurance'. The keys award marks for the label.<br><b>4. Run the check</b> and write one line saying it passed."
  },
  {
    "id": "fc5",
    "ch": 0,
    "deck": "intuisjon",
    "front": "Why naming the mechanism earns marks on its own",
    "back": "An examiner cannot see your reasoning, only your page. Two candidates can produce the same number, one by understanding and one by pattern matching. <b>The label commits you to a claim about who gains and who loses</b>, so it is the cheapest signal that separates them. It is also why the verbal exercises exist: they strip the arithmetic away so only the mechanism is left to grade."
  },
  {
    "id": "fc6",
    "ch": 0,
    "deck": "intuisjon",
    "front": "The chained sub-question trap",
    "back": "Kurbatov builds (b) on (a) and (c) on (b) - H2025 Exercise 4 ran to <b>nine linked steps</b>. One slip propagates through everything after it, and that is where the largest blocks of points are lost.<br><br>Defences: carry <b>4 decimals</b> on every rate (the keys penalise drift beyond ~0.001), and if a sub-answer will not come, give it a symbol, state the assumption and carry it forward - later steps are marked on method."
  },
  {
    "id": "fc7",
    "ch": 0,
    "deck": "begrep",
    "front": "What is NOT on the exam formula sheet",
    "back": "V<sup>L</sup> = V<sup>U</sup> + PV(TS) and <b>which rate discounts the shield</b> &middot; the permanent-debt result &tau;<sub>c</sub>D &middot; D<sub>t</sub> = d&middot;V<sub>t</sub><sup>L</sup> and the debt adjustment &middot; put-call parity &middot; &beta;<sub>E</sub> = N(d<sub>1</sub>)(V/E)&beta;<sub>U</sub> &middot; the Myers-Majluf setup &middot; <b>everything</b> about real options.<br><br>Those six lines have been worth 20-40 points in recent papers."
  },
  {
    "id": "fc8",
    "ch": 1,
    "deck": "mekanisme",
    "front": "Why an infinite stream is worth a finite amount",
    "back": "Do not sum the series - use <b>self-similarity</b>, which is the argument the examiner wants. Stand at date 0 holding the perpetuity. One period later you have collected C and are looking at an identical perpetuity worth PV<sub>0</sub> again, because nothing has changed. So PV<sub>0</sub> = (C + PV<sub>0</sub>)/(1 + r), hence PV<sub>0</sub>&middot;r = C, hence <b>PV<sub>0</sub> = C/r</b>. The same argument gives V<sup>L</sup> = FCF/(r<sub>wacc</sub> &minus; g)."
  },
  {
    "id": "fc9",
    "ch": 1,
    "deck": "begrep",
    "front": "The date convention for C/r and C1/(r - g)",
    "back": "Both return a value <b>one period BEFORE the first cash flow</b>, never on the same date.<br><br>First payment at date 1 &rarr; C/r is a date-0 value.<br>First payment at date 3 &rarr; C/r is a <b>date-2</b> value, with two more periods of discounting to go.<br><br>This convention costs more points than any piece of algebra in the chapter."
  },
  {
    "id": "fc10",
    "ch": 1,
    "deck": "mekanisme",
    "front": "What r - g is actually measuring",
    "back": "Each year the cash flow is (1+g) times larger while the discount factor is 1/(1+r) times smaller, so successive payments shrink in present value at roughly the <b>net rate r &minus; g</b>. That net rate, not r alone, makes the sum converge.<br><br>So r &gt; g is a <b>diagnostic, not a technicality</b>: if terminal growth exceeds the cost of capital you have mis-estimated one of them, and should say so rather than report a negative firm value."
  },
  {
    "id": "fc11",
    "ch": 1,
    "deck": "mekanisme",
    "front": "The annuity as a perpetuity minus a perpetuity",
    "back": "Buy a perpetuity starting at date 1, worth C/r today. Sell an identical one starting at date N+1: at date N it is worth C/r, so today (C/r)/(1+r)<sup>N</sup>. What you keep is exactly dates 1 to N:<br><br>PV = (C/r)[1 &minus; (1+r)<sup>&minus;N</sup>]<br><br><b>Learn the construction, not the formula</b> - abandoning a project at date N converts a perpetuity into an annuity, and the exit option is worth precisely the tail you gave up (k25)."
  },
  {
    "id": "fc12",
    "ch": 1,
    "deck": "intuisjon",
    "front": "Why IRR reverses the NPV ranking",
    "back": "The IRR is the rate at which a project's own cash flows break even, so it describes <b>the shape of the project, not the market it lives in</b>. Early cash flows are barely discounted at any rate: high break-even rate, small gain when capital is cheap. Late cash flows are crushed at high rates and rewarded enormously at low ones: low break-even rate, steep profile.<br><br>The profiles cross, and ranking by IRR is ranking as though the discount rate were always the crossover rate."
  },
  {
    "id": "fc13",
    "ch": 1,
    "deck": "begrep",
    "front": "The three ways IRR fails as a decision rule",
    "back": "<b>1. Blind to scale</b> - prefers a tiny project at 40% to a large one at 15%.<br><b>2. Sign reversal</b> - on a project that takes money in first and pays out later, a high IRR is bad news.<br><b>3. Non-uniqueness</b> - two sign changes give two IRRs and no rule at all.<br><br>Use IRR to <i>describe</i> a project, never to <i>choose</i> between projects."
  },
  {
    "id": "fc14",
    "ch": 1,
    "deck": "intuisjon",
    "front": "Why NPV additivity matters for the whole course",
    "back": "NPV is money at date 0, and money at the same date adds. <b>Returns are not additive</b>, so none of the following could be done with percentages:<br><br>&bull; assembling firm value from parts (V<sup>U</sup> + PV(TS) in k18)<br>&bull; splitting value between claimants (k9, k10)<br>&bull; all five consistency checks in k0<br><br>This is the structural reason the course values in kroner, not in rates."
  },
  {
    "id": "fc15",
    "ch": 2,
    "deck": "begrep",
    "front": "Free cash flow - what it is and whose money it is",
    "back": "The cash operations generate in a period, after paying for everything the operations need, and <b>before any of it is handed to the people who financed the firm</b>. 'Free' means free to be distributed - to lenders as interest and principal, to shareholders as dividends or repurchases.<br><br>Because it is measured before the split, FCF does not depend on financing. Hence <b>unlevered</b> free cash flow, and hence the rest of the course works."
  },
  {
    "id": "fc16",
    "ch": 2,
    "deck": "mekanisme",
    "front": "Why interest never enters FCF",
    "back": "<b>Otherwise it is charged twice.</b> r<sub>wacc</sub> is already a weighted average of r<sub>E</sub> and r<sub>D</sub>, so the cost of borrowing lives in the denominator. Subtracting interest in the numerator too pays the lenders once in the cash flow and again in the discount rate.<br><br>Deeper reason: keeping FCF financing-neutral separates 'what are the assets worth' from 'what does the financing add', which is what lets WACC and APV value the same stream two ways and agree."
  },
  {
    "id": "fc17",
    "ch": 2,
    "deck": "mekanisme",
    "front": "Why depreciation goes through the tax line and then straight back out",
    "back": "Depreciation is not a payment - nobody receives it - but the tax authority allows it as a deduction, so it genuinely lowers cash tax paid.<br><br>The formula lets it reduce EBIT (so the tax bill is right) and then adds the full amount back (so the cash flow is right). Net effect on cash: <b>&tau;<sub>c</sub> &times; Depreciation of tax saved</b>. Same logic as the interest tax shield in k7 - a deduction is worth its tax rate times its size."
  },
  {
    "id": "fc18",
    "ch": 2,
    "deck": "intuisjon",
    "front": "Why FCF taxes EBIT and not EBT, even though the firm pays less",
    "back": "The objection is correct as accounting and <b>ignored on purpose</b>. The value of the interest deduction is handed back in exactly one place: through the reduced discount rate in the after-tax WACC (k17), or as a separate PV(TS) term in APV (k18).<br><br>Lower the tax in the FCF line as well and you count the shield twice, both methods break, and the WACC = APV check becomes meaningless."
  },
  {
    "id": "fc19",
    "ch": 2,
    "deck": "begrep",
    "front": "Net working capital and its change",
    "back": "NWC = operating cash + receivables + inventory &minus; payables.<br>&Delta;NWC<sub>t</sub> = NWC<sub>t</sub> &minus; NWC<sub>t&minus;1</sub><br><br>Receivables and inventory are cash spent but not yet recovered; payables are the reverse, so suppliers finance you and the amount is subtracted.<br>Policy form: NWC<sub>t</sub> = w &times; Sales<sub>t</sub>, so &Delta;NWC<sub>t</sub> = w(Sales<sub>t</sub> &minus; Sales<sub>t&minus;1</sub>). In steady state at growth g: <b>&Delta;NWC = g &times; NWC</b>."
  },
  {
    "id": "fc20",
    "ch": 2,
    "deck": "mekanisme",
    "front": "Why cutting inventory increases free cash flow",
    "back": "Inventory on the shelf is cash you already spent and have not recovered. Sell it down without replacing it and that cash comes back into the bank account.<br><br>Formally NWC falls, so &Delta;NWC is negative, so <b>&minus;&Delta;NWC is positive</b> and FCF rises. Nothing has changed about profit - it is purely a balance-sheet release. The reverse holds too: a firm letting receivables balloon can be highly profitable and haemorrhaging cash."
  },
  {
    "id": "fc21",
    "ch": 2,
    "deck": "intuisjon",
    "front": "The two working-capital sign errors that are fatal",
    "back": "<b>1.</b> Subtracting NWC<sub>t</sub> itself instead of NWC<sub>t</sub> &minus; NWC<sub>t&minus;1</sub>. The formula subtracts <i>the change</i>, not the level.<br><b>2.</b> Reading 'working capital falls by 20.8' and subtracting 20.8. It is &Delta;NWC = &minus;20.8, and &minus;(&minus;20.8) = <b>+20.8</b>.<br><br>Discipline: write the level in a row of its own, difference it, then feed the difference in. Never do it in your head."
  },
  {
    "id": "fc22",
    "ch": 2,
    "deck": "intuisjon",
    "front": "The terminal-year trap the examiner plants",
    "back": "Two errors, both worth whole sub-questions.<br><b>1.</b> Discounting TV<sub>T</sub> over T+1 periods - it already sits at date T.<br><b>2.</b> <b>Capitalising a year that contains a one-off item.</b> If FCF<sub>T</sub> was inflated by an asset sale or a working-capital release, FCF<sub>T</sub>(1+g) assumes that windfall repeats forever.<br><br>In the worked case the shortcut gave 1 748.5714 instead of 1 417.4857 - an overstatement of 331.0857. Build a normalised FCF<sub>T+1</sub> from its components."
  },
  {
    "id": "fc23",
    "ch": 3,
    "deck": "begrep",
    "front": "Firm-specific versus systematic risk",
    "back": "<b>Firm-specific</b> (idiosyncratic, unique, diversifiable): a failed drug trial, a fire, a founder resigning. Unrelated across firms, so it cancels in a portfolio - it dies at rate 1/n.<br><b>Systematic</b> (market, undiversifiable): recession, oil price collapse, a shift in the general level of rates. Hits every firm at once, so it never cancels - it converges to the average covariance between stocks."
  },
  {
    "id": "fc24",
    "ch": 3,
    "deck": "mekanisme",
    "front": "Why the market refuses to pay for firm-specific risk",
    "back": "Suppose a stock offered extra return purely because its own earnings are erratic. A diversified investor buys it, holds it beside forty others, watches that component vanish from his portfolio, and <b>collects the extra return bearing none of the risk</b>.<br><br>Every diversified investor wants that trade, so the price is bid up until the extra return disappears. You are compensated only for risk you cannot avoid - and firm-specific risk is avoidable for free."
  },
  {
    "id": "fc25",
    "ch": 3,
    "deck": "begrep",
    "front": "Beta - the two forms and what each one tells you",
    "back": "&beta;<sub>i</sub> = Cov(R<sub>i</sub>, R<sub>mkt</sub>)/Var(R<sub>mkt</sub>) = Corr(R<sub>i</sub>, R<sub>mkt</sub>) &times; &sigma;<sub>i</sub>/&sigma;<sub>mkt</sub><br><br>The second form is the one to internalise: <b>beta is correlation scaled by relative volatility</b>. High volatility raises beta only to the extent that it comes with correlation. &beta; = 0 earns r<sub>f</sub> however wild the returns are; negative betas exist and are valuable, because such assets pay off when everything else does not."
  },
  {
    "id": "fc26",
    "ch": 3,
    "deck": "intuisjon",
    "front": "Why the more volatile stock can be the safer one",
    "back": "With &sigma;<sub>mkt</sub> = 18%: Alfa has &sigma; = 40% and correlation 0.35, so &beta; = 0.35 &times; 0.40/0.18 = <b>0.7778</b>. Bravo has &sigma; = 22% and correlation 0.80, so &beta; = 0.80 &times; 0.22/0.18 = <b>0.9778</b>.<br><br>Alfa is almost twice as volatile and carries the smaller beta, so the lower required return. Most of its 40% is noise a diversified holder never feels.<br><br><b>Exam rule:</b> a question giving you &sigma; and asking for a cost of capital MUST also give a correlation or covariance."
  },
  {
    "id": "fc27",
    "ch": 3,
    "deck": "mekanisme",
    "front": "Why the security market line must be straight",
    "back": "You can manufacture <b>any</b> beta from two ingredients. Put a fraction w in the market portfolio and the rest in the risk-free asset: the result has beta w and expected return r<sub>f</sub> + w(E[R<sub>mkt</sub>] &minus; r<sub>f</sub>), which <i>is</i> the line. Borrow at r<sub>f</sub> and lever up to extend it past &beta; = 1.<br><br>A stock above the line at its beta would be bought until the gap closed; one below would be sold. In equilibrium every asset sits on the line."
  },
  {
    "id": "fc28",
    "ch": 3,
    "deck": "begrep",
    "front": "E[Rmkt] versus the market risk premium",
    "back": "'The market risk premium is 6%' means E[R<sub>mkt</sub>] &minus; r<sub>f</sub> = 6%.<br>'The expected return on the market is 6%' means E[R<sub>mkt</sub>] = 6%, and with r<sub>f</sub> = 3% the premium is only <b>3%</b>.<br><br>Confusing them halves or doubles every cost of capital in the exercise, and since the exam chains sub-questions, one slip contaminates everything downstream. <b>Underline which one you were given before you write anything.</b>"
  },
  {
    "id": "fc29",
    "ch": 3,
    "deck": "mekanisme",
    "front": "The CAPM run backwards",
    "back": "&beta;<sub>i</sub> = (r<sub>i</sub> &minus; r<sub>f</sub>)/(E[R<sub>mkt</sub>] &minus; r<sub>f</sub>)<br><br>The excess return the asset offers, divided by the excess return the market offers. Works on equity (r<sub>E</sub> &rarr; &beta;<sub>E</sub>), on debt (r<sub>D</sub> &rarr; &beta;<sub>D</sub>) and on the unlevered firm (r<sub>U</sub> &rarr; &beta;<sub>U</sub>).<br><br><b>This is the direction the exam actually uses</b>, because the firm being valued is private, new, or about to change its capital structure and has no usable return history."
  },
  {
    "id": "fc30",
    "ch": 3,
    "deck": "intuisjon",
    "front": "Betas add, volatilities do not",
    "back": "&beta;<sub>P</sub> = w<sub>1</sub>&beta;<sub>1</sub> + w<sub>2</sub>&beta;<sub>2</sub> + &hellip;, exactly, weighted by market values. Two 40% stocks with correlation 0.20 combine to 30.98%, not 40%.<br><br>This one property is what makes the whole unlever/relever machinery possible: <b>a firm is a portfolio of its debt and its equity</b>, so its asset beta is the value-weighted average of &beta;<sub>D</sub> and &beta;<sub>E</sub>."
  },
  {
    "id": "fc31",
    "ch": 4,
    "deck": "begrep",
    "front": "The three rates and the identity that links them",
    "back": "r<sub>U</sub> = (E/V)&middot;r<sub>E</sub> + (D/V)&middot;r<sub>D</sub><br><br>Not a theory - arithmetic. Own all the equity and all the debt and you own the assets, so your return is the value-weighted average. r<sub>U</sub> is the unlevered / asset / opportunity cost of capital, and in this course the right-hand side is also the definition of the <b>pre-tax WACC</b>.<br><br><b>pre-tax WACC = r<sub>U</sub>.</b> Write that on your exam paper: a free check on every leverage question."
  },
  {
    "id": "fc32",
    "ch": 4,
    "deck": "mekanisme",
    "front": "Why rU is unaffected by leverage",
    "back": "Leverage does not change the cash flows the assets produce, and does not change how risky those cash flows are. <b>It only changes who receives them first.</b> Slicing a cake into a safe slice and a risky slice does not change the cake.<br><br>So r<sub>U</sub> is a property of the business while r<sub>E</sub> and r<sub>D</sub> are properties of the financing. This is exactly why the twin-firm method works: two firms in the same business share r<sub>U</sub> even when their debt ratios differ wildly."
  },
  {
    "id": "fc33",
    "ch": 4,
    "deck": "begrep",
    "front": "The betaU weighting - and the tax term this course rejects",
    "back": "&beta;<sub>U</sub> = [E/(E+D)]&beta;<sub>E</sub> + [D/(E+D)]&beta;<sub>D</sub><br><br><b>No (1 &minus; &tau;<sub>c</sub>).</b> FIE402 assumes the firm rebalances to a target debt-to-value ratio, so the tax shield carries the same risk as the assets and gets no separate treatment in the weighting.<br><br>Use the (1 &minus; &tau;<sub>c</sub>) version and you get a different &beta;<sub>U</sub>, a different r<sub>U</sub>, a different APV, and your WACC value stops matching your APV value. <b>The examiner runs that check.</b>"
  },
  {
    "id": "fc34",
    "ch": 4,
    "deck": "mekanisme",
    "front": "The Twin-Firm Ladder, seven rungs",
    "back": "<b>1.</b> Twin's r<sub>E</sub> (observed) &rarr; <b>2.</b> &beta;<sub>E</sub> = (r<sub>E</sub>&minus;r<sub>f</sub>)/MRP &rarr; <b>3.</b> &beta;<sub>D</sub> = (r<sub>D</sub>&minus;r<sub>f</sub>)/MRP &rarr; <b>4.</b> UNLEVER: &beta;<sub>U</sub> = (E/V)&beta;<sub>E</sub> + (D/V)&beta;<sub>D</sub> &rarr; <b>5.</b> r<sub>U</sub> = r<sub>f</sub> + &beta;<sub>U</sub>&middot;MRP &rarr; <b>6.</b> RELEVER to your D/E &rarr; <b>7.</b> WACC, pre- and after-tax.<br><br>&beta;<sub>U</sub> and r<sub>U</sub> are the <b>only</b> quantities that cross from the twin's world to yours. If a question seems to skip a rung, that rung's input was handed to you."
  },
  {
    "id": "fc35",
    "ch": 4,
    "deck": "mekanisme",
    "front": "Why leverage raises rE but leaves rU alone",
    "back": "Debt holders are paid first, so their claim absorbs little of the swing in firm value. Whatever swing the assets produce lands almost entirely on equity - and equity is now a <b>smaller base</b>. Same absolute risk, smaller slice, so more risk per krone of equity, so a higher required return.<br><br>The rise in r<sub>E</sub> is exactly large enough that the weighted average stays at r<sub>U</sub>. That is the whole content of MM Proposition II."
  },
  {
    "id": "fc36",
    "ch": 4,
    "deck": "begrep",
    "front": "MM II in rates and in betas - and the multiplier that trips people",
    "back": "r<sub>E</sub> = r<sub>U</sub> + <b>(D/E)</b>(r<sub>U</sub> &minus; r<sub>D</sub>)<br>&beta;<sub>E</sub> = &beta;<sub>U</sub> + <b>(D/E)</b>(&beta;<sub>U</sub> &minus; &beta;<sub>D</sub>)<br><br>Same statement, different units. Use whichever the question gives you inputs for, and <b>never convert twice</b>.<br><br>The multiplier is <b>D/E, not D/V</b>. With D/V = 0.40 the multiplier is 0.40/0.60 = 0.6667. Using 0.40 is the single most common arithmetic slip in the course."
  },
  {
    "id": "fc37",
    "ch": 4,
    "deck": "begrep",
    "front": "After-tax WACC, and when to use which WACC",
    "back": "r<sub>wacc</sub> = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 &minus; &tau;<sub>c</sub>)&nbsp;&nbsp;&middot;&nbsp;&nbsp;pre-tax = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub> = r<sub>U</sub><br><br>They differ by exactly <b>(D/V)&middot;r<sub>D</sub>&middot;&tau;<sub>c</sub></b>, the per-krone value of the interest tax shield; equivalently r<sub>wacc</sub> = r<sub>U</sub> &minus; (D/V)&tau;<sub>c</sub>r<sub>D</sub>.<br><br>Discount FCF at r<sub>wacc</sub> in the WACC method (FCF ignores the shield). Discount the unlevered firm at r<sub>U</sub> in APV, where the shield is added separately."
  },
  {
    "id": "fc38",
    "ch": 4,
    "deck": "mekanisme",
    "front": "Where a positive debt beta comes from",
    "back": "Debt is risk-free only if it is repaid in <b>every</b> state of the world. In bad states - and bad states for the whole economy in particular - a levered firm may not repay in full. That shortfall is correlated with the market, so it is systematic risk, and systematic risk carries a beta.<br><br>Consequence for unlevering: debt now bears part of the business risk, so a given &beta;<sub>E</sub> implies a <b>higher</b> &beta;<sub>U</sub> than it would under &beta;<sub>D</sub> = 0. Set &beta;<sub>D</sub> = 0 only when told the debt is risk-free."
  },
  {
    "id": "fc39",
    "ch": 4,
    "deck": "intuisjon",
    "front": "What the consistency check does NOT verify",
    "back": "Keep a stale r<sub>D</sub> after a recapitalisation and you get &beta;<sub>E</sub> = 2.10, r<sub>E</sub> = 13.5000% - and <b>both checks still pass</b>: 0.5(0.1350) + 0.5(0.0450) = 9.0000% = r<sub>U</sub>, and 0.5(2.10) + 0.5(0.30) = 1.20 = &beta;<sub>U</sub>.<br><br>The checks verify that r<sub>E</sub>, r<sub>D</sub> and r<sub>U</sub> hang together <b>algebraically</b>, nothing more. They confirm your arithmetic, not your assumptions. If the question says the borrowing rate rises with leverage, use the new rate."
  },
  {
    "id": "fc40",
    "ch": 4,
    "deck": "intuisjon",
    "front": "Market values, never book values",
    "back": "Every weight in the cost-of-capital chapter is a <b>market</b> value. Share price &times; share count = E. Book equity from a balance sheet is the wrong number and propagates into &beta;<sub>U</sub>, r<sub>U</sub>, r<sub>E</sub> and both WACCs.<br><br>Debt is usually close enough to book value that the exam lets you use it - but say so <b>explicitly</b> if you rely on it."
  },
  {
    "id": "fc41",
    "ch": 5,
    "deck": "begrep",
    "front": "Yield to maturity on a zero-coupon bond",
    "back": "P = F/(1 + y)<sup>n</sup>&nbsp;&nbsp;&rArr;&nbsp;&nbsp;y = (F/P)<sup>1/n</sup> &minus; 1<br><br>y is the <b>promised</b> return: what you earn if, and only if, every promised krone arrives. Price and yield always move in opposite directions.<br><br>If the bond is default-free its yield <i>is</i> the risk-free rate for that maturity - the r<sub>f</sub> you put in the CAPM is nothing more than a government zero's yield."
  },
  {
    "id": "fc42",
    "ch": 5,
    "deck": "mekanisme",
    "front": "Coupon rate versus yield",
    "back": "The <b>coupon rate is a contract term</b>: it fixes the krone amount the borrower must pay and never changes. The <b>yield is a market outcome</b>: whatever discount rate reconciles today's price with those fixed payments.<br><br>Market demands more than the coupon rate &rarr; the bond must be cheap to compete &rarr; <b>discount</b> (P &lt; F).<br>Market demands less &rarr; <b>premium</b>. Exactly at the coupon rate &rarr; <b>par</b>."
  },
  {
    "id": "fc43",
    "ch": 5,
    "deck": "begrep",
    "front": "Promised is not expected - rD = y - p x L",
    "back": "With default probability p, recovery rate R and loss given default L = 1 &minus; R:<br>E[payment] = F[1 &minus; p&middot;L]<br><b>r<sub>D</sub> = y &minus; p&middot;L</b><br><br>The expected return is the promised yield minus the expected annual loss. <b>Not on the formula sheet - memorise it.</b> r<sub>D</sub> &le; y always, with equality only if p = 0 or L = 0."
  },
  {
    "id": "fc44",
    "ch": 5,
    "deck": "mekanisme",
    "front": "Why the WACC needs rD and not y",
    "back": "The WACC averages what investors <b>expect</b> to earn, because that is what the firm's cash flows must cover on average. The promised yield is a best case - the return in the states where nothing goes wrong.<br><br>Using y inflates the discount rate and undervalues the firm, and the error grows with credit risk. In the worked case it pushed the pre-tax WACC from 8.5000% to 9.2700%, roughly a 9% valuation error on a perpetuity."
  },
  {
    "id": "fc45",
    "ch": 5,
    "deck": "begrep",
    "front": "What sits inside a credit spread",
    "back": "spread = y &minus; r<sub>f</sub>, and it contains <b>two economically different things</b>:<br><br>&bull; <b>r<sub>f</sub> &rarr; r<sub>D</sub>: the risk premium</b>, priced by the CAPM, r<sub>D</sub> &minus; r<sub>f</sub> = &beta;<sub>D</sub>(E[R<sub>mkt</sub>] &minus; r<sub>f</sub>). Only this block belongs in a beta.<br>&bull; <b>r<sub>D</sub> &rarr; y: the expected loss p&middot;L</b>, which is compensation for nothing - money the lender simply does not expect to receive.<br><br><b>Never compute &beta;<sub>D</sub> from the yield.</b> Compute r<sub>D</sub> first."
  },
  {
    "id": "fc46",
    "ch": 5,
    "deck": "intuisjon",
    "front": "Course formula versus exact cash-flow route for rD",
    "back": "On the worked one-year zero the two gave 5.0957% and 4.7826% - a gap of 0.3130 pp, which is exactly <b>p&middot;L&middot;y</b>.<br><br>Reason: the course formula applies the loss rate to the <i>amount invested</i>, while the exact calculation applies it to the <i>promised payment</i>, which is (1 + y) times larger.<br><br>Use r<sub>D</sub> = y &minus; p&middot;L when the question gives you y, p and L; use the cash-flow route when you are given the payoffs. <b>Say which you used.</b>"
  },
  {
    "id": "fc47",
    "ch": 5,
    "deck": "begrep",
    "front": "Backing a default probability out of a price",
    "back": "P = F[1 &minus; q&middot;L]/(1 + r<sub>f</sub>)&nbsp;&nbsp;&rArr;&nbsp;&nbsp;q = [1 &minus; P(1 + r<sub>f</sub>)/F]/L<br><br>q is the <b>risk-neutral</b> default probability, not the true one, because discounting at r<sub>f</sub> pushes all the risk adjustment into q instead of into the discount rate. In the worked case q = 8.7333% against a true p = 6.0000%."
  },
  {
    "id": "fc48",
    "ch": 5,
    "deck": "mekanisme",
    "front": "Why the risk-neutral probability is the larger one",
    "back": "Default clusters in bad states of the world, and <b>a krone in a bad state is worth more to investors</b> than a krone in a good state. Rather than discount the expected payment at a rate above r<sub>f</sub>, you can equivalently overweight the bad state and discount at r<sub>f</sub>. Both routes give the same price.<br><br>So q is not a forecast of anything - it is a pricing device that already contains the compensation for risk. Exactly the trick behind binomial option pricing in k22, and why real probabilities never appear there either."
  },
  {
    "id": "fc101",
    "ch": 6,
    "deck": "begrep",
    "front": "The three perfect-market conditions, and what each one rules out",
    "back": "<b>1. No taxes, no transaction or issuance costs</b> &mdash; rules out a wedge between what the firm pays and what investors get. Removed in k7, k8.<br><b>2. Asset cash flows independent of financing</b> &mdash; rules out financing changing investment. Removed in k9&ndash;k11.<br><b>3. Firms and investors trade the same securities at the same prices</b> &mdash; rules out the firm doing something investors cannot. Removed in k12, k13.<br><br>The third does most of the work: it is what makes <b>homemade leverage</b> free."
  },
  {
    "id": "fc102",
    "ch": 6,
    "deck": "mekanisme",
    "front": "The arbitrage that enforces MM Proposition I",
    "back": "Firm L is overvalued at V<sup>L</sup> = 1100 against V<sup>U</sup> = 1000 on identical assets paying 100 forever, with 400 of debt at 4%.<br><br><b>Short 1% of L's equity (+7.00) &middot; borrow 1% of L's debt level (+4.00) &middot; buy 1% of U (&minus;10.00).</b> Net today <b>+1.00</b>, which is 1% of the gap.<br>Every year after: +1.00 from U, &minus;0.16 of interest, &minus;0.84 owed on the short = <b>0.00</b> in every state.<br><br>Not an identity: borrow the wrong amount and the annual flows stop cancelling. That is the line to verify."
  },
  {
    "id": "fc103",
    "ch": 6,
    "deck": "mekanisme",
    "front": "MM Proposition II read as a graph",
    "back": "r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> &minus; r<sub>D</sub>)<br><br>A straight line: <b>intercept r<sub>U</sub>, slope (r<sub>U</sub> &minus; r<sub>D</sub>), running variable D/E</b>. With r<sub>U</sub> = 8% and risk-free debt at 4%, r<sub>E</sub> gains 4 percentage points per unit of D/E.<br><br>As the weights shift towards the cheap claim, the average of the two lines stays pinned at r<sub>U</sub>. <b>That flat average line IS Proposition I.</b> The beta version is the same statement."
  },
  {
    "id": "fc104",
    "ch": 6,
    "deck": "intuisjon",
    "front": "Why a higher cost of equity is not bad news",
    "back": "Every recapitalisation raises r<sub>E</sub>, and candidates routinely conclude that shareholders lost. They did not.<br><br>Equity now stands behind a fixed interest claim, so its cash flow is more volatile, and <b>the rise in r<sub>E</sub> exactly compensates for the extra risk</b>. The dividend per share rises in the same ratio, so the price does not move.<br><br>Nor does the pre-tax WACC fall with leverage. It is <b>flat at r<sub>U</sub></b>. 'Debt is cheaper than equity' ignores the equity left behind."
  },
  {
    "id": "fc105",
    "ch": 6,
    "deck": "begrep",
    "front": "Recapitalisation mechanics: repurchase and special dividend",
    "back": "<b>Repurchase:</b> n = D<sub>new</sub>/P &middot; N<sub>1</sub> = N<sub>0</sub> &minus; n &middot; P = E<sub>1</sub>/N<sub>1</sub>, unchanged.<br><b>Special dividend:</b> DPS = D<sub>new</sub>/N<sub>0</sub> &middot; ex-dividend price = P<sub>0</sub> &minus; DPS, share count unchanged.<br><br>P is the price the shares are bought <i>at</i>, i.e. the <b>post-announcement</b> price. Under MM it equals P<sub>0</sub> because nothing was created to announce. <b>In k7 it does not</b>, and that is where the marks are."
  },
  {
    "id": "fc106",
    "ch": 6,
    "deck": "mekanisme",
    "front": "Announcement versus execution",
    "back": "The <b>announcement</b> is when information reaches the market, so it is the only moment a price can jump. <b>Execution</b> swaps cash for securities at prices already set.<br><br>Under MM the announcement carries no news, so nothing moves at either date; execution changes the <i>composition</i> of your wealth, not its size.<br><br>Once a tax shield exists (k7), the announcement moves the price and the buyback executes at the <b>new</b> price &mdash; the only difference between the two chapters."
  },
  {
    "id": "fc107",
    "ch": 6,
    "deck": "intuisjon",
    "front": "The check that can fail in a recapitalisation, and the one that cannot",
    "back": "<b>Cannot fail:</b> P = E<sub>1</sub>/N<sub>1</sub>. You defined n as D<sub>new</sub>/P, so this re-divides what you already assumed.<br><br><b>Can fail:</b> discount the <b>new</b> dividend per share at the <b>new</b> r<sub>E</sub>. Neither number entered the price when you computed it, so agreement is real evidence. Forget to relever and 6.00 discounted at the old 9.3333% gives 64.29 instead of 50.00, and the clash finds the error.<br><br>Write the failing check, not the identity."
  },
  {
    "id": "fc108",
    "ch": 7,
    "deck": "begrep",
    "front": "The interest tax shield, and the identity it sits in",
    "back": "TS<sub>t</sub> = &tau;<sub>c</sub> &middot; r<sub>D</sub> &middot; D<sub>t</sub>, with D<sub>t</sub> the debt outstanding at the start of the period.<br><br>V<sup>L</sup> = V<sup>U</sup> + PV(TS), where V<sup>U</sup> is the free cash flow discounted at r<sub>U</sub>. This split is the APV method of k18.<br><br><b>Neither line is on the formula sheet. Memorise both.</b> Whenever you write the identity, say which rate you discounted the shield at."
  },
  {
    "id": "fc109",
    "ch": 7,
    "deck": "mekanisme",
    "front": "Which rate discounts the tax shield - the three cases",
    "back": "<b>Constant D/E or D/V, rebalanced &rarr; r<sub>U</sub>.</b> Future debt moves with firm value, so the shield carries asset risk.<br><b>Fixed amount, permanent &rarr; r<sub>D</sub></b> (or r<sub>f</sub>). D is a contract number; only default can stop the shield.<br><b>Known repayment schedule &rarr; r<sub>D</sub>, period by period.</b><br><br>This has been multiple choice in <b>every mapped paper that had multiple choice</b>. It is a choice of assumption, not of formula: read the sentence describing the debt, and if it is ambiguous state your assumption in one line."
  },
  {
    "id": "fc110",
    "ch": 7,
    "deck": "mekanisme",
    "front": "Why rebalancing makes the shield risky",
    "back": "Under a target ratio the firm <b>borrows more when it is worth more</b> and repays when it is worth less, so next year's debt is unknown today and moves with firm value.<br><br>A cash flow that moves with the assets has their risk, hence their rate: <b>r<sub>U</sub></b>.<br><br>Under fixed debt, D is a contract number and the interest is known, so the only thing that can interrupt the shield is default &mdash; and that is exactly what r<sub>D</sub> prices."
  },
  {
    "id": "fc111",
    "ch": 7,
    "deck": "begrep",
    "front": "The permanent-debt shortcut, and where it is illegal",
    "back": "PV(TS) = &tau;<sub>c</sub>r<sub>D</sub>D / r<sub>D</sub> = <b>&tau;<sub>c</sub>&middot;D</b> &nbsp;&rArr;&nbsp; V<sup>L</sup> = V<sup>U</sup> + &tau;<sub>c</sub>D<br><br>r<sub>D</sub> cancels, which is why it looks so simple. Valid <b>only</b> for permanently fixed debt.<br><br>Apply it to a rebalancing firm and you overstate value &mdash; 650 against the correct 630 on the chapter's numbers &mdash; and consistency check 1 breaks. The slopes are the giveaway: permanent &tau;<sub>c</sub>, rebalanced &tau;<sub>c</sub>r<sub>D</sub>/r<sub>U</sub>."
  },
  {
    "id": "fc112",
    "ch": 7,
    "deck": "mekanisme",
    "front": "The price jump at announcement, and the price the buyback executes at",
    "back": "&Delta;P = PV(TS)/N<sub>0</sub> &nbsp;&middot;&nbsp; n = D<sub>new</sub>/P<sub>1</sub>, where P<sub>1</sub> = P<sub>0</sub> + &Delta;P<br><br>N<sub>0</sub> is the count <b>before anything happens</b>. The repurchase executes at the <b>post-announcement</b> price, not the stale one.<br><br>Worked: V<sup>U</sup> = 600 on 20m shares, &tau;<sub>c</sub>D = 50, so P<sub>1</sub> = 32.50 and n = 200/32.50 = 6.1538m. Use 30.00 instead and you get 6.6667m, implying 33.75 &mdash; <b>two prices for one share after one transaction</b>."
  },
  {
    "id": "fc113",
    "ch": 7,
    "deck": "intuisjon",
    "front": "Why the lenders capture none of the tax shield",
    "back": "New lenders hand over 200 and receive debt worth 200. At a fair r<sub>D</sub> that is <b>zero NPV</b>, so they gain nothing.<br><br>The shield accrues to whoever owns the firm when the plan becomes credible &mdash; the <b>pre-announcement shareholders</b>, seller and holder alike, since the price had already risen before anyone tendered.<br><br>The loser is the tax authority, and only the tax authority. Leverage creates no cash; it redirects a payment."
  },
  {
    "id": "fc114",
    "ch": 7,
    "deck": "intuisjon",
    "front": "Why a firm can gain from leverage when its assets did not change",
    "back": "In k6 the cash flow had <b>two</b> claimants and dividing it differently could not enlarge it.<br><br>Taxes add a <b>third</b> claimant, the government, whose slice depends on the financing mix, because interest is deductible and dividends are not.<br><br>Debt shrinks the government's slice by &tau;<sub>c</sub>r<sub>D</sub>D a year, and what the government does not take is left for investors. <b>Nothing was produced; a payment was redirected.</b>"
  },
  {
    "id": "fc115",
    "ch": 8,
    "deck": "begrep",
    "front": "Direct and indirect costs of financial distress",
    "back": "<b>Direct</b> &mdash; lawyers, advisers, court and trustee fees, management time. Typically <b>3&ndash;4%</b>, close to a fixed fee, so they bite hardest on small firms.<br><b>Indirect</b> &mdash; customers needing warranties leave, suppliers demand cash, staff leave, assets are fire-sold, projects shelved. Typically <b>10&ndash;20%</b>.<br><br>The indirect ones matter more: they are behavioural, and most arrive <b>before any court is involved</b>. Distress is expensive for intangible-heavy firms and cheap for firms holding redeployable assets."
  },
  {
    "id": "fc116",
    "ch": 8,
    "deck": "mekanisme",
    "front": "Why shareholders pay for a bankruptcy they will not attend",
    "back": "Debt is sold at a fair price. Creditors who expect to lose in some state <b>pay less for the bond</b>, by the present value of that loss, so the firm raises less cash today and the shortfall lands on whoever sold the claim.<br><br>The direction is fixed and worth writing down: <b>ex post the costs fall on creditors, ex ante entirely on shareholders</b>.<br><br>Same logic returns in k9 and k10 for the agency costs, and in k12 for the dilution cost."
  },
  {
    "id": "fc117",
    "ch": 8,
    "deck": "intuisjon",
    "front": "Deadweight loss versus transfer in a default",
    "back": "Assets 120 against a face value of 150, with 20% consumed by the process.<br><br><b>Distress cost = 0.20 &times; 120 = 24.00</b> and nothing else &mdash; value that leaves the firm entirely.<br><b>Not</b> the 54.00 shortfall between the promise and the recovery. That is a transfer, and subtracting it double counts massively.<br><br>Test: consistency check 3 still holds (gains sum to the NPV of the decision); check 4 correctly <b>fails</b>, because total value is not fixed when something was burned."
  },
  {
    "id": "fc118",
    "ch": 8,
    "deck": "begrep",
    "front": "The effective tax advantage of debt",
    "back": "&tau;* = 1 &minus; (1 &minus; &tau;<sub>c</sub>)(1 &minus; &tau;<sub>e</sub>)/(1 &minus; &tau;<sub>i</sub>)<br><br>One krone of pre-tax profit delivers (1 &minus; &tau;<sub>c</sub>)(1 &minus; &tau;<sub>e</sub>) through equity and (1 &minus; &tau;<sub>i</sub>) through debt; &tau;* is what the debt route saves.<br><br>With &tau;<sub>c</sub> = 25%, &tau;<sub>e</sub> = 20%, &tau;<sub>i</sub> = 35%: &tau;* = 1 &minus; 0.60/0.65 = <b>7.6923%</b>.<br><br><b>&tau;* replaces &tau;<sub>c</sub>; it does not multiply it.</b> Not on the formula sheet."
  },
  {
    "id": "fc119",
    "ch": 8,
    "deck": "mekanisme",
    "front": "Why an investor's own tax bill changes a corporate decision",
    "back": "Investors price claims on <b>what they keep</b>, not on what the firm pays.<br><br>Interest is taxed more heavily in their hands than equity income is, because capital gains are taxed only on realisation and the holder chooses when. So &tau;<sub>i</sub> &gt; &tau;<sub>e</sub> in most systems, hence <b>&tau;* &lt; &tau;<sub>c</sub></b>, and a big enough personal penalty drives the advantage to zero.<br><br>Ignore it and the computed optimum lands at too much leverage: in the chapter's case D* moves from 150 to 250 and value is overstated by 11.50."
  },
  {
    "id": "fc120",
    "ch": 8,
    "deck": "mekanisme",
    "front": "The trade-off optimum is a marginal condition, read off differences",
    "back": "V<sup>L</sup>(D) = V<sup>U</sup> + &tau;*&middot;D &minus; PV(FD)(D) &nbsp;&rArr;&nbsp; <b>borrow while &tau;* &gt; &Delta;PV(FD)/&Delta;D</b><br><br>The benefit is linear, the cost convex, so the optimum is interior.<br><br>The exam hands you the schedule as a table: <b>compute the differences, do not eyeball the levels</b>. With &tau;* = 12% each extra 100 buys 12 of shield; take every step costing less and stop at the first that costs more."
  },
  {
    "id": "fc121",
    "ch": 8,
    "deck": "intuisjon",
    "front": "How the distress material is actually examined",
    "back": "Almost never as a standalone computation. It arrives as <b>the qualification a number needs</b>: you compute a tax shield and are asked why the firm does not double its debt.<br><br>The four moves that score: name both cost types &middot; separate <b>deadweight loss from transfer</b> &middot; say creditors price the loss so shareholders bear it <b>ex ante</b> &middot; end with the <b>marginal condition</b>.<br><br>One sentence of cross-section closes it: shipping and property borrow, biotech does not, and the reason is tangibility and growth options."
  },
  {
    "id": "fc122",
    "ch": 9,
    "deck": "begrep",
    "front": "Equity and debt as state-by-state claims",
    "back": "E = E[max(CF &minus; K, 0)]/(1 + r<sub>f</sub>) &nbsp;and&nbsp; D = E[min(CF, K)]/(1 + r<sub>f</sub>)<br><br><b>K is the face value of the debt</b>, and also the strike of the shareholders' option, so the two words coincide here. Expectations are under the risk-neutral probability &rho;.<br><br>The claims sum to CF in every state, D + E = V, which is exactly what makes consistency check 3 work. Not on the formula sheet."
  },
  {
    "id": "fc123",
    "ch": 9,
    "deck": "mekanisme",
    "front": "Why convexity makes shareholders love risk",
    "back": "A convex payoff turns a <b>mean-preserving spread into a gain</b>. Push the good state up and the shareholder collects all of it; push the bad state below K and he gains nothing extra, being already at zero.<br><br>Downside capped, upside not. That is Jensen's inequality, and it is the whole mechanism.<br><br>Name it: <b>risk shifting</b> or <b>asset substitution</b>. The keys award the label."
  },
  {
    "id": "fc124",
    "ch": 9,
    "deck": "begrep",
    "front": "The agency cost, and the two numbers it is not",
    "back": "<b>agency cost = V(first best) &minus; V(chosen)</b> &mdash; a deadweight loss, the value destroyed because the decision maximises equity rather than the firm.<br><br>On the chapter's numbers: 140 &minus; 125 = <b>15</b>.<br>It is <b>not</b> the 30 shareholders gained and <b>not</b> the 45 creditors lost. Those are the transfer, and reporting a transfer as the agency cost is one of the three named ways to lose the points.<br><br>Compute both firm values first, then split each into D and E."
  },
  {
    "id": "fc125",
    "ch": 9,
    "deck": "mekanisme",
    "front": "The indifference face value K*",
    "back": "Write both equity values as functions of K and set them equal: E<sub>S</sub>(K) = E<sub>R</sub>(K).<br><br>With S paying 150 or 130 and R paying 220 or 30, inside 30 &lt; K &le; 130: E<sub>S</sub> = 140 &minus; K and E<sub>R</sub> = 110 &minus; 0.5K, so <b>K* = 60</b>, both worth 80.<br><br>max(&middot;, 0) makes the functions <b>piecewise linear</b>, so the algebra holds only within one piece &mdash; <b>state the interval</b>. Below K* the transfer from creditors does not yet cover the value the gamble destroys, so there is no conflict."
  },
  {
    "id": "fc126",
    "ch": 9,
    "deck": "intuisjon",
    "front": "Why a zero-NPV hedge is not neutral",
    "back": "Zero NPV means zero change in <b>firm</b> value. It says nothing about the split.<br><br>Equity is convex, so it depends on the whole distribution, not its mean. Hedging project R to a certain payoff drops equity from 50 to 5 and lifts debt from 75 to 120: shareholders <b>refuse a free hedge</b>, and creditors are the ones who want it.<br><br>Neutral only with <b>risk-free debt</b>, where equity is linear and expectations pass straight through. So shareholders hedge willingly at low leverage and refuse in deep distress. H2024 Exercise 4 asked exactly this."
  },
  {
    "id": "fc127",
    "ch": 9,
    "deck": "mekanisme",
    "front": "Why the shareholders' gain vanishes once creditors see it coming",
    "back": "If creditors know at issue that the gamble will be taken, they pay <b>75 for the bond, not 120</b>, so the firm raises 45 less today.<br><br>Shareholders then own everything: 75 raised plus 50 of equity is 125, against 140 had they been able to promise the safe project. They bear the <b>agency cost of 15 ex ante</b>, exactly as they bore k8's distress costs.<br><br>Hence covenants and collateral &mdash; and hence shareholders accept them voluntarily. They are buying back their own credibility."
  },
  {
    "id": "fc128",
    "ch": 9,
    "deck": "intuisjon",
    "front": "Three ways to lose the points on a risk-shifting question",
    "back": "<b>1.</b> Comparing the projects' NPVs instead of the <b>equity values</b>. The question is what management chooses, not what is efficient.<br><b>2.</b> Reporting the <b>transfer</b> as the agency cost.<br><b>3.</b> Forgetting the zero: equity in the bust state is max(30 &minus; 120, 0) = <b>0</b>, never &minus;90. Carry the negative through and the convexity disappears, and you conclude the opposite.<br><br>Build the table, value both claims, compare, then close with check 3 or 4 <b>by name</b>."
  },
  {
    "id": "fc129",
    "ch": 10,
    "deck": "begrep",
    "front": "Debt overhang, in one line",
    "back": "&Delta;(shareholders' wealth) = <b>NPV &minus; &Delta;D</b><br><br>&Delta;D is the rise in the <b>market value of the existing debt</b>, so shareholders invest only when NPV &gt; &Delta;D.<br><br><b>Debt overhang</b> is the case &Delta;D &gt; NPV &gt; 0: the project creates value and the owners who would fund it lose. Not on the formula sheet.<br><br>Shareholders pay for the rise in the value of <i>their own claim</i>, never for projects."
  },
  {
    "id": "fc130",
    "ch": 10,
    "deck": "mekanisme",
    "front": "Why the creditor captures value he did not pay for",
    "back": "In <b>default states</b> creditors take the whole cash flow, so every extra krone produced there goes to them krone for krone, while shareholders &mdash; wiped out anyway &mdash; see none of it.<br><br>The outlay today, however, is paid in full by the owners.<br><br>If enough of the project's cash arrives in those states, the owners are funding a <b>transfer to the lenders</b>. Left of the face value the equity line is flat: that band is the overhang zone."
  },
  {
    "id": "fc131",
    "ch": 10,
    "deck": "intuisjon",
    "front": "What the agency cost of overhang is, and what it is not",
    "back": "The agency cost is the value lost because the project is <b>skipped</b>, so it is the <b>NPV itself</b> &mdash; 13.4615 in the worked case.<br><br>It is <b>not</b> the 5.7692 the shareholders would have lost, because that transfer never happens: the investment is never made.<br><br>Measure it as first-best value minus value under the chosen action, exactly as in k9. And note that <b>check 4 does not apply</b> here: total value is not fixed, it is destroyed."
  },
  {
    "id": "fc132",
    "ch": 10,
    "deck": "mekanisme",
    "front": "Renegotiating the face value: the two constraints",
    "back": "D(K<sub>1</sub>) &ge; D<sub>0</sub> &nbsp;and&nbsp; E(K<sub>1</sub>) &minus; I &ge; E<sub>0</sub><br><br>Cut K and the equity line shifts left, putting more of the project's cash on equity. Any K<sub>1</sub> meeting both is signable; where in the range it lands is <b>bargaining power</b>.<br><br>Worked case: 90 &le; K<sub>1</sub> &le; 108. At 90 the owners take the whole NPV, at 108 the creditors do. K is a <b>face value</b> throughout this chapter, never a strike and never a market value."
  },
  {
    "id": "fc133",
    "ch": 10,
    "deck": "mekanisme",
    "front": "Why the total gain from a renegotiation must equal the NPV exactly",
    "back": "Renegotiation changes only the <b>division</b> of the payoff; the project changes only <b>how much there is to divide</b>. Add the two gains and every division term cancels, leaving the NPV.<br><br>So consistency check 3 holds at <b>any</b> K<sub>1</sub> in the acceptable range, and gains summing to anything else mean an error &mdash; typically forgetting to subtract I, or writing K<sub>1</sub> instead of the actual cash flow in default.<br><br>What it <b>cannot</b> catch: a wrong &rho; or r<sub>f</sub>, which scale both claims alike."
  },
  {
    "id": "fc134",
    "ch": 10,
    "deck": "begrep",
    "front": "The contracts that pre-empt overhang",
    "back": "<b>Covenants</b> &mdash; caps on further debt, dividends, repurchases and asset sales; minimum coverage ratios. They bind where the owners' incentives are worst.<br><b>Seniority or security on the new asset</b> &mdash; the new lender takes the bad-state cash flow first, so the old creditor collects no windfall and the owners invest. This is why lenders forbid it.<br><b>Convertible debt</b> &mdash; the lender shares the upside, blunting risk shifting, and funds more readily, softening overhang. Standard for young, volatile firms."
  },
  {
    "id": "fc135",
    "ch": 10,
    "deck": "intuisjon",
    "front": "Why a covenant raises firm value rather than just the lender's recovery",
    "back": "Anything the borrower promises today is <b>priced today</b>. Commit not to shift risk, strip assets or skip good projects, and the debt is worth more at issue, so the same money is raised against a <b>smaller promised repayment</b>.<br><br>The owners get back the deadweight loss that no longer occurs. That is why shareholders accept covenants voluntarily.<br><br>The cost is lost flexibility: a covenant that binds where the forbidden action was <i>efficient</i> destroys value itself."
  },
  {
    "id": "fc136",
    "ch": 11,
    "deck": "begrep",
    "front": "The complete organising identity",
    "back": "V<sup>L</sup> = V<sup>U</sup> + PV(TS) &minus; PV(distress costs) &minus; PV(agency costs of debt) + PV(agency benefits of debt)<br><br>Terms 2 and 3 are the trade-off theory (k7, k8), term 4 is risk shifting and overhang (k9, k10), term 5 is the free cash flow discipline of this chapter.<br><br><b>Not on the formula sheet.</b> Every term after V<sup>U</sup> is one named imperfection put back into the perfect-market benchmark."
  },
  {
    "id": "fc137",
    "ch": 11,
    "deck": "mekanisme",
    "front": "Why a debt contract commits when a promise does not",
    "back": "A manager can announce that surplus cash will be returned and quietly stop next year; a missed dividend costs him nothing enforceable.<br><br>A <b>missed interest payment puts the firm in default, hands control to creditors and usually ends his career</b>.<br><br>The commitment is credible precisely <i>because</i> the penalty is severe and outside his control &mdash; the same feature that made debt costly in k9 and k10. <b>One friction, two signs.</b> Leveraged buyouts apply this deliberately."
  },
  {
    "id": "fc138",
    "ch": 11,
    "deck": "mekanisme",
    "front": "Why the free cash flow problem is worst in cash-rich mature firms",
    "back": "Free cash flow is what remains <b>after every positive-NPV project is funded</b>.<br><br>A firm with many good projects has nothing left over, so discipline is not needed and flexibility is worth more. A mature firm in a shrinking industry generates cash it has nowhere good to put &mdash; and that is the cash that finances diversifying acquisitions and vanity capacity.<br><br>A larger firm brings a larger salary, more status and more security, so the manager has a private reason to spend it. That is the <b>agency cost of equity</b>."
  },
  {
    "id": "fc139",
    "ch": 11,
    "deck": "intuisjon",
    "front": "Decomposing the gain from a disciplining recapitalisation",
    "back": "All-equity firm: V<sup>U</sup> = 1000 plus 200 of cash the CEO would sink into a project worth 175. Borrow 400 permanent at &tau;<sub>c</sub> = 25% with PV(distress) = 30.<br><br>Cash stays: 1000 + 175 = <b>1175</b>. Recapitalise: V<sup>L</sup> = 1000 + 100 &minus; 30 = 1070, of which 670 equity, plus 600 paid out = <b>1270</b>.<br><br>Gain <b>+95</b>, and it must rebuild from the three named terms: <b>agency benefit +25, tax shield +100, distress &minus;30</b>. D + E = 1070 cannot fail and proves nothing. It stops paying once distress reaches <b>125</b>."
  },
  {
    "id": "fc140",
    "ch": 11,
    "deck": "begrep",
    "front": "The forces table, learned by its last column",
    "back": "<b>Tax shield</b> &rarr; up &rarr; profitable firms with reliable taxable income.<br><b>Distress</b> &rarr; down &rarr; stable cash flow, tangible redeployable assets.<br><b>Agency costs of debt</b> &rarr; down &rarr; few growth options, low asset volatility.<br><b>Agency benefits</b> &rarr; up &rarr; mature, cash-rich firms, weak governance.<br><b>Asymmetric information</b> &rarr; debt before equity &rarr; opaque firms that must fund externally.<br><br>The last column is the one an exam question hands you."
  },
  {
    "id": "fc141",
    "ch": 11,
    "deck": "intuisjon",
    "front": "Three regularities about observed leverage",
    "back": "<b>1.</b> Leverage differs far more <b>between industries than within them</b>: utilities, property and shipping heavy; software and biotech almost none.<br><b>2.</b> The most <b>profitable</b> firms often borrow least &mdash; the tax story gets this backwards, and the pecking order explains it (profits are retained, and retained earnings are the cheapest source).<br><b>3.</b> Leverage is <b>persistent</b>, because adjusting it is costly, so what you observe is a lagged target rather than today's optimum."
  },
  {
    "id": "fc142",
    "ch": 11,
    "deck": "mekanisme",
    "front": "How to write the capital-structure discussion answer",
    "back": "<b>Move 1.</b> State the frame in one sentence: capital structure matters only through the terms of the identity, so the question is which terms are large here.<br><b>Move 2 and 3.</b> <b>Sign every term for each firm</b>, one clause each.<br><b>Move 4.</b> Close with a prediction and one caveat.<br><br>Listing the theories and stopping is the commonest way to lose points. The examiner wants a <b>sign</b>, a statement of which term <b>dominates</b>, and a <b>conclusion in the direction asked</b>. Name it, sign it, net it."
  },
  {
    "id": "fc143",
    "ch": 12,
    "deck": "begrep",
    "front": "The Myers-Majluf pricing condition",
    "back": "&alpha; &times; (E[V | beliefs] + I + NPV) = I &nbsp;&rArr;&nbsp; <b>&alpha; = I / (E[V | beliefs] + I + NPV)</b><br><br>&alpha; is the fraction of the <b>post-issue</b> firm the new shareholders receive; the denominator is the post-issue market value of the whole firm: assets as investors assess them, plus the cash raised, plus what the project adds beyond its cost.<br><br><b>The cash raised belongs in the denominator.</b> Leave I out and &alpha; is too large and every payoff after it is wrong in the same direction. Not on the formula sheet."
  },
  {
    "id": "fc144",
    "ch": 12,
    "deck": "mekanisme",
    "front": "The dilution form, and the issue rule",
    "back": "Payoff to old shareholders = (1 &minus; &alpha;)(V + I + NPV) = <b>V + NPV &minus; &alpha;(V &minus; E[V | beliefs])</b><br><br><b>Issue if and only if NPV &gt; &alpha;(V &minus; E[V | beliefs])</b>.<br><br>V is the <b>true</b> value known to the manager, while the &alpha; multiplying it was priced off the market's <b>belief</b>. The second term is the dilution cost &mdash; a transfer, not a cost of production. If beliefs happen to be correct, it is zero and the old shareholders capture the entire NPV."
  },
  {
    "id": "fc145",
    "ch": 12,
    "deck": "mekanisme",
    "front": "Pooling versus separating, and how to test each",
    "back": "<b>Pooling:</b> both types issue &rArr; E[V | issue] = qV<sub>H</sub> + (1 &minus; q)V<sub>L</sub>. Rational only if <b>both</b> types find it optimal to issue at the pooled price.<br><b>Separating:</b> only the low type issues &rArr; E[V | issue] = V<sub>L</sub> and E[V | no issue] = V<sub>H</sub>. Rational only if the low type still issues at the harsher price <b>and</b> the high type still prefers to abstain at it.<br><br>The low type never breaks pooling &mdash; it is always sold at or above what it is worth. <b>Everything turns on the high type.</b>"
  },
  {
    "id": "fc146",
    "ch": 12,
    "deck": "intuisjon",
    "front": "Why an undervalued firm refuses free money",
    "back": "The project has a positive NPV, the financing is fairly priced given what investors know, and the answer can still be <b>no</b>.<br><br>The price is fair <i>on average</i> and the manager is not average. Selling a quarter of a firm the market undervalues by 75 costs the owners about 18 in transferred wealth; if the project only adds 15 they are better off <b>letting a good project die than selling a good firm cheaply</b>.<br><br>Nobody is fooled and nothing is irrational. That is what separates adverse selection from mispricing."
  },
  {
    "id": "fc147",
    "ch": 12,
    "deck": "mekanisme",
    "front": "Why the pooling candidate falls apart from the top down",
    "back": "Pooling prices every issuer at the average: a <b>subsidy to the worst firm</b> in the pool and a <b>tax on the best</b>. So the best firm leaves first.<br><br>Once it leaves, the remaining pool is worse, the price drops, and the new best firm faces the tax the departing one just escaped.<br><br>This is <b>Akerlof's used-car market</b> with a share issue in place of a car, and it is why equilibria always take the form 'the top slice abstains, the rest pool'. With two types you are done in one round."
  },
  {
    "id": "fc148",
    "ch": 12,
    "deck": "intuisjon",
    "front": "Separating destroys value; pooling only moves it",
    "back": "<b>Separating:</b> the high type abandons a positive-NPV project. That NPV is transferred to nobody &mdash; it simply never happens. Expected loss = q &times; NPV. This is <b>underinvestment through adverse selection</b>, the same shape as debt overhang in k10.<br><br><b>Pooling:</b> both types invest, so nothing real is lost. The good firm's old shareholders hand a sum to the new investors and the bad firm's receive the same sum through them; new investors break even. A transfer in the sense of <b>check 4</b>, not a deadweight loss."
  },
  {
    "id": "fc149",
    "ch": 12,
    "deck": "begrep",
    "front": "The five remedies for adverse selection, with their limits",
    "back": "<b>Financial slack</b> &mdash; cash or unused debt capacity, no issue and no dilution. <i>Limit:</i> idle cash invites the empire building of k11.<br><b>Issue debt</b> &mdash; a fixed claim is worth nearly the same whichever type the firm is. <i>Limit:</i> distress and agency costs return (k8&ndash;k10).<br><b>Rights issue</b> &mdash; sell to the existing owners, who are on both sides. <i>Limit:</i> they must have cash.<br><b>Wait</b> &mdash; issue once the information is public. <i>Limit:</i> the project must survive.<br><b>Certify</b> &mdash; underwriters, auditors, analysts. <i>Limit:</i> costly, and only as credible as the certifier."
  },
  {
    "id": "fc150",
    "ch": 13,
    "deck": "begrep",
    "front": "The pecking order, and what it actually ranks",
    "back": "<b>1. Retained earnings &rarr; 2. Debt, safest first &rarr; 3. Hybrids, convertibles &rarr; 4. Equity, last.</b><br><br>Not a preference over capital structures &mdash; a preference over <b>transactions</b>. A firm follows it every time it needs money, and its leverage is whatever falls out of a history of such choices.<br><br>There is <b>no target D/V, no optimum and no margin being balanced</b>. Observed leverage is a residue. Not on the formula sheet."
  },
  {
    "id": "fc151",
    "ch": 13,
    "deck": "mekanisme",
    "front": "The adverse-selection cost of any security",
    "back": "cost = S(V<sub>true</sub>) &minus; E[S(V) | beliefs]<br><br>where S(V) is the payoff of the claim you are selling when the firm turns out to be worth V. It is the k12 dilution written so that it also covers debt.<br><br><b>Zero</b> for a claim whose payoff does not depend on V at all; <b>largest</b> for the claim that tracks V one for one. The pecking order is a <b>ladder of exposure to the manager's private information</b>, nothing more."
  },
  {
    "id": "fc152",
    "ch": 13,
    "deck": "intuisjon",
    "front": "Why riskless debt costs nothing to sell to an uninformed buyer",
    "back": "Riskless debt promises a fixed amount the firm pays whichever type it is, so S(V<sub>H</sub>) = S(V<sub>L</sub>) = K: <b>the buyer's ignorance is irrelevant, because the payoff does not depend on what he is ignorant about</b>.<br><br>Risky debt is fixed except in default, so the two types' claims differ only over the range where the firm cannot pay &mdash; a slice of the outcomes, not all of them.<br><br>In the worked firm the lowest payoff either type can produce is 60, so the <b>first 60 raised is free</b>."
  },
  {
    "id": "fc153",
    "ch": 13,
    "deck": "intuisjon",
    "front": "The myth: 'the pecking order works because markets are inefficient'",
    "back": "It <b>inverts the model</b>. Every price is fair <i>given the information investors have</i>. Investors are rational, they anticipate that a firm issuing equity is more likely to be the low type, and they price that in before the shares are sold.<br><br>Write this sentence: <i>the pecking order rests on <b>asymmetric information</b>, not on market inefficiency; prices are efficient with respect to the market's information set, and the cost arises because the manager's set is larger.</i><br><br>Market timing is where inefficiency may enter. Keep the two apart &mdash; it is worth points."
  },
  {
    "id": "fc154",
    "ch": 13,
    "deck": "mekanisme",
    "front": "What an issue announcement is worth, and how to decompose the drop",
    "back": "After an issue, the old shares are worth (1 &minus; &alpha;)(E[V | issue] + I + NPV) = <b>E[V | issue] + NPV</b>. The cash raised cancels, because investors paid full price for their slice.<br><br>Every announcement effect is the difference between that and the price before. Decompose it into <b>(i) the revision of the assets in place</b> and <b>(ii) the project moving from expected to certain</b>.<br><br>Empirically: seasoned equity offers meet a fall of roughly <b>3%</b>; straight debt issues move the price by an amount indistinguishable from zero."
  },
  {
    "id": "fc155",
    "ch": 13,
    "deck": "intuisjon",
    "front": "Why the announcement drop is not a cost to anybody",
    "back": "In the worked case the price falls 45 while the issuing firm's dilution cost is 10.36. <b>The gap is the market discovering something that was already true.</b><br><br>'The issue destroyed 45 of value' is the standard error on this question.<br><br>The equilibrium test: the firms that do <b>not</b> issue are repriced <b>upwards</b>, and the probability-weighted average of the two returns to the price that prevailed before anyone acted. A market cannot expect to be surprised in one direction."
  },
  {
    "id": "fc156",
    "ch": 13,
    "deck": "begrep",
    "front": "The single-crossing condition, and the four credible signals",
    "back": "cost to the low type &gt; gain from being taken for the high type &gt; cost to the high type.<br><br>If both inequalities hold, only the high type signals and the types separate. If the middle term dominates both, everybody signals and it conveys nothing.<br><br><b>Take on debt</b> &middot; <b>repurchase shares</b> &middot; <b>raise the dividend</b> &middot; <b>refuse to issue equity</b>. Cheap talk is not a signal, because it costs nothing and the low type says the same words."
  },
  {
    "id": "fc157",
    "ch": 13,
    "deck": "mekanisme",
    "front": "Why debt signals quality when k8 said debt threatens the firm",
    "back": "Both are true, and they are the <b>same fact from two sides</b>.<br><br>The threat of distress is what makes the promise <b>expensive</b>, and expensive is what makes it <b>informative</b>. A manager who knows the cash flows are strong is buying a cheap signal; one who knows they are weak is buying an expensive one.<br><br>The signal is credible <i>because</i> the penalty in k8 is real. <b>If bankruptcy were free, borrowing would tell the market nothing.</b>"
  },
  {
    "id": "fc158",
    "ch": 14,
    "deck": "begrep",
    "front": "The IPO arithmetic, in the order the exam asks for it",
    "back": "Gross proceeds = N &times; P<sub>offer</sub><br>Net proceeds = N &times; P<sub>offer</sub> &times; (1 &minus; spread) &minus; other direct costs<br>Underpricing = (P<sub>close</sub> &minus; P<sub>offer</sub>)/P<sub>offer</sub><br>Money left on the table = N<sub>primary</sub> &times; (P<sub>close</sub> &minus; P<sub>offer</sub>)<br><b>Total cost to the pre-IPO owners = N<sub>primary</sub> &times; P<sub>close</sub> &minus; net proceeds</b><br><br>The last line automatically equals spread + other costs + money left on the table. <b>That is the closing check.</b>"
  },
  {
    "id": "fc159",
    "ch": 14,
    "deck": "intuisjon",
    "front": "Who bears IPO underpricing",
    "back": "Two errors, in opposite directions.<br>&bull; <i>'It cost the company 60'</i> confuses the balance sheet with the shareholders: the company's cash is the net proceeds either way.<br>&bull; <i>'It cost nobody anything, no cash moved'</i> is worse: the owners' stake was diluted by more shares than it needed to be.<br><br>Say it as the examiner does: the cost falls on the <b>pre-issue shareholders, in shares, in proportion to how many PRIMARY shares were sold</b>. Underpricing is not a payment, it is shares. Secondary shares put the cost on the selling holder instead."
  },
  {
    "id": "fc160",
    "ch": 14,
    "deck": "mekanisme",
    "front": "The winner's curse, in three sentences",
    "back": "<b>1.</b> Informed investors know which offerings are worth more than the offer price, so they bid for the good ones and stay away from the bad ones.<br><b>2.</b> An uninformed investor bidding for everything is therefore <b>rationed when the deal is good and filled when it is bad</b>, so the average return on the shares he actually receives is far worse than the average return across offerings.<br><b>3.</b> The offering must be priced below its expected value for his participation constraint to hold, and that gap is <b>equilibrium underpricing</b> &mdash; compensation for adverse allocation, not a profit."
  },
  {
    "id": "fc161",
    "ch": 14,
    "deck": "intuisjon",
    "front": "Why the measured first-day return is not a profit anyone earns",
    "back": "Set expected profit to zero and the uninformed investor <b>breaks even</b>: a large percentage return on the offerings he barely gets into, a small loss on the ones he is stuffed with.<br><br>The measured average first-day return &mdash; high teens in US data over recent decades &mdash; is the number an outside observer computes, not a number anyone banks.<br><br>The <b>issuer's</b> cost is real: shares worth their expected value are sold for less, and the difference is a transfer to whoever is allocated them."
  },
  {
    "id": "fc162",
    "ch": 14,
    "deck": "begrep",
    "front": "The rights issue: TERP and the value of a right",
    "back": "TERP = (N<sub>old</sub> &times; P<sub>cum</sub> + N<sub>new</sub> &times; P<sub>sub</sub>)/(N<sub>old</sub> + N<sub>new</sub>)<br>Value of one right = <b>P<sub>cum</sub> &minus; TERP</b><br><br>One right attaches to each existing share, and it is worth exactly the drop it compensates for.<br><br><b>Every valuation after the ex-rights date uses TERP, not P<sub>cum</sub>.</b> Keep using the cum price and every later sub-question inherits the error. Not on the formula sheet."
  },
  {
    "id": "fc163",
    "ch": 14,
    "deck": "mekanisme",
    "front": "Why the subscription discount is cosmetic",
    "back": "Raising 400 at a subscription price of 40 or of 25 produces TERP of 48.0000 or 42.8571 and rights worth 2.0000 or 7.1429 &mdash; and <b>identical wealth</b> for every shareholder who acts.<br><br>The discount is a choice about <b>how many new shares to create</b>, not about how much value to give away.<br><br>What it does change is the <b>penalty for inaction</b>: letting the rights lapse costs 8 000 in the first case and 28 571.43 in the second. That is why deeply discounted issues are announced loudly."
  },
  {
    "id": "fc164",
    "ch": 14,
    "deck": "intuisjon",
    "front": "Why a rights issue escapes the Myers-Majluf transfer",
    "back": "A rights offer sells the underpriced shares to the people who <b>already own the firm</b>, so the wealth transfer from old shareholders to new investors has nobody to flow to: the two groups are the same group.<br><br>That is the clean answer to <i>how can the firm avoid the adverse-selection cost of an equity issue?</i>, and it is why rights offers are standard in Norway and much of Europe while cash offers dominate in the United States.<br><br>The limit: it requires owners with cash who will take up the rights."
  },
  {
    "id": "fc165",
    "ch": 15,
    "deck": "begrep",
    "front": "The payout calendar: which date is a price event",
    "back": "<b>Declaration date</b> &mdash; the board announces and it becomes a liability. Only the news content moves the price, which under MM is nothing.<br><b>Ex-dividend date</b> &mdash; buy from here on and you do <b>not</b> receive the dividend. <b>This is the event: the price falls by the dividend.</b><br><b>Record date</b> &mdash; the register is read. No effect.<br><b>Payable date</b> &mdash; the cash arrives. No effect; the claim was priced out at the ex-date."
  },
  {
    "id": "fc166",
    "ch": 15,
    "deck": "mekanisme",
    "front": "Why the ex-dividend drop is exactly the dividend",
    "back": "A share at 30.00 cum with a 5.00 dividend, expected to open at 26.00 ex: buy cum for 30.00, collect 5.00, sell ex for 26.00 &mdash; you paid 30.00 and received <b>31.00</b>, riskless and overnight.<br><br>Everyone does it, the cum price is bid up or the ex price driven down, and the gap closes at exactly 5.00.<br><br><b>Enforced by trade</b>, the same way MM Proposition I was. Taxes and trading costs blunt it in the real market, which is k16."
  },
  {
    "id": "fc167",
    "ch": 15,
    "deck": "mekanisme",
    "front": "Why an open-market repurchase leaves the price where it was",
    "back": "n = R/P &middot; N<sub>1</sub> = N<sub>0</sub> &minus; n &middot; P<sub>1</sub> = (E<sub>0</sub> &minus; R)/(N<sub>0</sub> &minus; R/P) = <b>P</b><br><br>Buying an asset at its fair value is a <b>zero-NPV transaction</b>, and a firm buying its own shares is no exception. Equity falls by R and the count falls by R/P, so the ratio is untouched.<br><br>A repurchase changes the <b>denominator</b>; a dividend changes the <b>numerator</b>. Per share they arrive at the same place. If the price moves in a perfect-market repurchase, you divided by the wrong share count."
  },
  {
    "id": "fc168",
    "ch": 15,
    "deck": "intuisjon",
    "front": "Homemade dividends, in both directions",
    "back": "Under a <b>repurchase</b>, a holder wanting cash sells 500/30.00 = 16.6667 shares and lands exactly where the dividend route would have put him.<br>Under a <b>dividend</b>, a holder who did not want the cash reinvests it at the <b>ex-dividend price</b> &mdash; 500/25.00 = 20 shares, not 500/30.00 = 16.6667.<br><br>Check by <b>ownership fraction</b>, never by share count, because the two routes leave different totals outstanding.<br><br>The firm has exactly one financial capability its shareholders lack: <b>none</b>."
  },
  {
    "id": "fc169",
    "ch": 15,
    "deck": "intuisjon",
    "front": "'The price fell on the ex-date, so the dividend destroyed value'",
    "back": "The holder was handed the difference <b>in cash the same day</b>; his wealth did not move by a krone.<br><br>The mirror error: calling a repurchase good news because the price holds up and earnings per share rise. The shares that would have shared those earnings were <b>bought and cancelled</b>, paid for out of the firm's own cash.<br><br>In a perfect market neither route creates or destroys anything, which is exactly why any real price reaction has to be explained by a <b>named friction</b> (k16)."
  },
  {
    "id": "fc170",
    "ch": 15,
    "deck": "begrep",
    "front": "The debt-financed payout, both routes at once",
    "back": "<b>Special dividend:</b> DPS = D<sub>new</sub>/N<sub>0</sub> &middot; P<sub>ex</sub> = P<sub>0</sub> &minus; DPS &middot; N unchanged.<br><b>Repurchase:</b> n = D<sub>new</sub>/P<sub>0</sub> &middot; N<sub>1</sub> = N<sub>0</sub> &minus; n &middot; P unchanged.<br><b>Both:</b> E<sub>1</sub> = V &minus; D<sub>new</sub> and r<sub>E</sub> = r<sub>U</sub> + (D<sub>new</sub>/E<sub>1</sub>)(r<sub>U</sub> &minus; r<sub>D</sub>).<br><br>r<sub>E</sub> is the <b>same on both routes</b>, because leverage D/E is the same on both. This is H2024 Exercise 3 and H2025 Exercise 3, 18 points each."
  },
  {
    "id": "fc171",
    "ch": 15,
    "deck": "mekanisme",
    "front": "Timing irrelevance: cash is negative debt",
    "back": "PV(pay C(1 + r<sub>f</sub>) in one year) = C(1 + r<sub>f</sub>)/(1 + r<sub>f</sub>) = <b>C</b>. The growth and the discounting cancel exactly.<br><br>A shareholder who wants the money today borrows its present value against his shares; next year's dividend repays the loan to the krone. The reverse works too.<br><br>The step that can fail: borrow <b>exactly the present value</b> of what you will receive. Borrow more and the positions stop matching &mdash; the same discipline that made the k6 arbitrage close."
  },
  {
    "id": "fc172",
    "ch": 16,
    "deck": "begrep",
    "front": "The effective dividend tax rate and the ex-dividend drop with taxes",
    "back": "P<sub>cum</sub> &minus; P<sub>ex</sub> = Div &times; (1 &minus; &tau;<sub>d</sub>)/(1 &minus; &tau;<sub>g</sub>) = Div &times; (1 &minus; &tau;*<sub>d</sub>)<br><b>&tau;*<sub>d</sub> = (&tau;<sub>d</sub> &minus; &tau;<sub>g</sub>)/(1 &minus; &tau;<sub>g</sub>)</b><br><br>With &tau;<sub>d</sub> = 35% and &tau;<sub>g</sub> = 25%: &tau;*<sub>d</sub> = 0.10/0.75 = <b>13.3333%</b>, so a 6.00 dividend moves the price only 5.20.<br><br>When &tau;<sub>d</sub> = &tau;<sub>g</sub> it is zero and k15's full drop returns. Not on the formula sheet."
  },
  {
    "id": "fc173",
    "ch": 16,
    "deck": "mekanisme",
    "front": "Why the price falls by less than the dividend",
    "back": "The seller and the holder compare <b>what they keep</b>, not gross amounts. A krone of dividend is worth (1 &minus; &tau;<sub>d</sub>) in the hand; a krone of price given up saves (1 &minus; &tau;<sub>g</sub>) of taxable gain.<br><br>If dividends are taxed more heavily, a krone of dividend is worth less than a krone of price, so the price <b>cannot</b> fall by the full amount &mdash; nobody would hold through the date.<br><br>The drop measures the dividend at its <b>after-tax exchange rate against a capital gain</b>. That ratio is the whole content of &tau;*<sub>d</sub>."
  },
  {
    "id": "fc174",
    "ch": 16,
    "deck": "begrep",
    "front": "Three reasons a repurchase is taxed more lightly",
    "back": "dividend: tax = &tau;<sub>d</sub> &times; (amount distributed)<br>repurchase: tax = &tau;<sub>g</sub> &times; (P &minus; basis) &times; n, with n = R/P<br><br><b>1. A lower rate</b> &mdash; &tau;<sub>g</sub> instead of &tau;<sub>d</sub>.<br><b>2. A smaller base</b> &mdash; only the gain, not the whole payment.<br><b>3. Deferral</b> &mdash; everyone who does not tender pays nothing until he sells.<br><br>Name all three. Deferral is a delay, not a saving, so value it as a present value: the shares that remain carry a <b>larger</b> unrealised gain."
  },
  {
    "id": "fc175",
    "ch": 16,
    "deck": "mekanisme",
    "front": "Clienteles: why the puzzle disappears at the margin but not in aggregate",
    "back": "Investors sort themselves: those who dislike dividends buy firms that do not pay them, those who do not care buy the firms that do. Once sorting is complete, the <b>marginal</b> investor is by construction one who does not mind the policy, so the price shows no penalty.<br><br>That is why the observed ex-dividend drop sits closer to the full dividend than a top personal rate would predict.<br><br>What it does <b>not</b> explain: why the firm chose the policy at all. Supplying a clientele that is already well served creates nothing."
  },
  {
    "id": "fc176",
    "ch": 16,
    "deck": "mekanisme",
    "front": "Why a payout announcement is credible when talk is not",
    "back": "Raising the <b>regular dividend</b> commits the firm to a stream the market will punish it for cutting, so a manager without the earnings to sustain it faces a bigger loss later than the price gain today. That asymmetry makes the raise informative &mdash; and it is why a <b>cut</b> provokes a much larger reaction than an increase: managers avoid cutting until they have run out of alternatives.<br><br>A <b>repurchase</b> signals undervaluation, but more weakly: an open-market programme is an announcement of intent, not a commitment. Stronger when management's own large holdings are not tendered."
  },
  {
    "id": "fc177",
    "ch": 16,
    "deck": "intuisjon",
    "front": "Confusing the signal with the thing it signals",
    "back": "<i>'The repurchase raised the share price, so the repurchase created value'</i> &mdash; the most expensive sentence in a payout answer.<br><br>It did not. The shares were <b>already worth more than the market thought</b>, and the announcement moved the price towards a value that was there all along. Everything the repurchase itself does is the k15 arithmetic, which is neutral.<br><br>Keep the claims apart: <i>this is a signal about existing value</i> scores; <i>this creates value</i> is the error the keys look for. It is consistency check 5 in a different costume."
  },
  {
    "id": "fc178",
    "ch": 16,
    "deck": "begrep",
    "front": "The four ways a repurchase is actually done",
    "back": "<b>Open-market</b> &mdash; bought on the exchange at the market price over months. The great majority, and no commitment: programmes are often only partly completed.<br><b>Fixed-price tender offer</b> &mdash; a stated number at a stated premium, oversubscription handled pro rata. Large and fast.<br><b>Dutch auction</b> &mdash; holders state their lowest acceptable price; one clearing price is paid to everyone who tendered at or below it. Usually a smaller premium.<br><b>Targeted repurchase</b> &mdash; a negotiated block, used to remove a hostile blockholder. Paying a premium to do so is <b>greenmail</b>."
  },
  {
    "id": "fc179",
    "ch": 16,
    "deck": "intuisjon",
    "front": "Why a tender-offer premium is not a gift",
    "back": "30m shares at 25.00, an offer for 6m at 28.00, everyone tenders pro rata.<br>Outlay 168, so E<sub>1</sub> = 582 on 24m shares and <b>P<sub>1</sub> = 24.25</b>, below where it started.<br>Wealth per original share = 0.20(28.00) + 0.80(24.25) = <b>25.00</b> &mdash; exactly where it began.<br><br>The premium is a <b>transfer from those who stay to those who sell</b>: the non-tenderer loses 0.75, a full tenderer gains 3.00. That is why fixed-price offers are almost always oversubscribed and pro-rated.<br><br>The identity cannot fail, so it proves nothing; the check that can is conservation: 168 + 582 = 750."
  },
  {
    "id": "fc180",
    "ch": 16,
    "deck": "mekanisme",
    "front": "Why a dividend disciplines more, and why managers prefer the repurchase",
    "back": "They differ in one respect that matters: <b>commitment</b>.<br><br>A regular dividend is <b>sticky</b>, so raising it hands the market a stick to beat management with next year and forces the firm back to the capital market, where outsiders price every project. An open-market programme commits to nothing and can be quietly abandoned.<br><br>Hence the data: repurchases absorb the <b>transitory</b> part of earnings, the regular dividend the part management believes is <b>permanent</b>. And hence 'force a payout' is a strong answer on a governance question (k27)."
  }
];

/* ---------- Active-learning prompts per chapter ---------- */
window.EDU_DATA.activeLearning = {
  "1": [
    {
      "type": "calc",
      "q": "A concession pays a free cash flow of 55 at date 1, growing 2.5% per year forever. The discount rate is 8.5%. (a) Value it at date 0. (b) Permits now push the FIRST cash flow to date 3, size and growth unchanged. Value it again. (c) What did the delay cost, in money and in percent?",
      "hint": "(a) PV0 = 55/(0.085 - 0.025) = 55/0.06 = 916.6667. The first flow is at date 1, so this is already a date-0 value.\n(b) The formula is unchanged, but the first flow is now at date 3, so its output is dated 2: PV2 = 916.6667. With 1.085^2 = 1.177225, PV0 = 916.6667/1.177225 = 778.6673.\n(c) Cost = 916.6667 - 778.6673 = 137.9994, i.e. 15.0545% of the undelayed value.\nCheck: 778.6673/916.6667 = 0.8495 and 1/1.177225 = 0.8495. Had you discounted three periods the ratio would have been 0.7830 and the check would have caught it."
    },
    {
      "type": "calc",
      "q": "A machine produces a free cash flow of 18 at the end of each of the next 10 years, then is worthless. The cost of capital is 6%. Value it, and verify the answer by the two-perpetuity route.",
      "hint": "Annuity factor: 1.06^10 = 1.790848, so 1/1.790848 = 0.558395 and the factor is (1/0.06)(1 - 0.558395) = 16.6667 x 0.441605 = 7.3601.\nPV = 18 x 7.3601 = 132.4816.\nTwo-perpetuity check: a perpetuity of 18 is worth 18/0.06 = 300.0000. The tail from date 11 onward is worth 300.0000 at date 10, so 300.0000/1.790848 = 167.5184 today. Subtract: 300.0000 - 167.5184 = 132.4816. Same answer from different intermediate numbers."
    },
    {
      "type": "calc",
      "q": "A project throws off 30 per year forever, discounted at 9%. Management can abandon it at the end of year 12, after which it is worth nothing. (a) What is the perpetuity worth? (b) What is the truncated project worth? (c) What is the tail you gave up worth, and verify it two ways.",
      "hint": "(a) 30/0.09 = 333.3333.\n(b) 1.09^12 = 2.812665, so the annuity factor is (1/0.09)(1 - 1/2.812665) = 11.1111 x 0.644465 = 7.1607, and PV = 30 x 7.1607 = 214.8218.\n(c) Tail = 333.3333 - 214.8218 = 118.5116.\nSecond route: the tail is a perpetuity of 30 starting at date 13, worth 333.3333 at date 12, so 333.3333/2.812665 = 118.5116. The two agree.\nThis is the mechanical core of the exit option in k25: exit converts a perpetuity into an annuity, and the option is worth exactly the tail."
    },
    {
      "type": "calc",
      "q": "Two mutually exclusive projects each cost 200 today. M pays 42 per year for 8 years; W pays a single 500 at date 8. The cost of capital is 9%. Rank them by NPV and by IRR, and say which rule you follow.",
      "hint": "M: 1.09^8 = 1.992563, annuity factor = (1/0.09)(1 - 1/1.992563) = 11.1111 x 0.498134 = 5.5348. PV = 42 x 5.5348 = 232.4624, NPV = 32.4624. IRR solves 42 x AF(y,8) = 200, i.e. AF = 4.7619, giving y = 13.2258%.\nW: PV = 500/1.992563 = 250.9331, NPV = 50.9331. IRR = (500/200)^(1/8) - 1 = 12.1353%.\nNPV picks W (50.9331 > 32.4624); IRR picks M (13.2258% > 12.1353%). Follow NPV: it measures the money the decision adds at date 0, while IRR ranks by the project's own break-even rate, which is a property of its timing rather than of the 9% market. The profiles cross, and at 9% we are on W's side of the crossing."
    },
    {
      "type": "control",
      "q": "Where does the formula C/r land on the timeline, and what does that imply for a terminal value TV_T = FCF_(T+1)/(r - g)?",
      "solution": "C/r returns a value ONE PERIOD BEFORE the first cash flow it prices - it is a date-0 value only when the first payment arrives at date 1. If the first payment lands at date 3, C/r is a date-2 value with two more periods of discounting to go.\n\nThe same convention governs the terminal value: TV_T = FCF_(T+1)/(r - g) sits at date T, even though the first cash flow inside it arrives at T+1. So it is discounted over T periods, not T+1, and it is normally added to FCF_T before discounting. Discounting it T+1 periods understates the firm by one full period and is one of the two standard terminal-value errors."
    },
    {
      "type": "explain",
      "q": "Explain, without summing a series, why an infinite stream of payments is worth a finite amount.",
      "solution": "Use self-similarity, which is faster and is the argument the examiner wants to see. Stand at date 0 holding the perpetuity. One period later you have collected C and are looking at an identical perpetuity, worth PV0 again, because nothing about it has changed. So PV0 = (C + PV0)/(1 + r), hence PV0(1 + r) = C + PV0, hence PV0 x r = C, hence PV0 = C/r.\n\nThe economic reason the sum is finite is that the discount factor shrinks geometrically while the cash flow stays flat, so distant payments contribute almost nothing. The same argument gives V^L = FCF/(rwacc - g) in k17: at any date the levered firm looks like the same growing perpetuity again."
    },
    {
      "type": "reflect",
      "q": "Why does the exam almost never ask you to state the NPV or perpetuity formulas, and where do the marks actually sit?",
      "solution": "Because they are printed on the formula sheet. Writing down a formula the examiner handed you earns nothing. The marks sit before the last line: in getting rwacc right (V2024 Problem 2, 2016 MC3), in identifying which cash flow belongs in the numerator (k2), and above all in which DATE the answer sits on.\n\nH2025 Exercise 5 replaces a perpetuity with a truncated annuity when an exit option is exercised; 2023 Problem 3 and 2021 Problem 4 start a stream at a later date, which is the option to wait. In each case the discounting formula is trivial and the timeline is not. Write the timeline before the formula, and value every stream a second way - a minute that stands between one misplaced date and a whole exercise of cascaded errors."
    }
  ],
  "2": [
    {
      "type": "calc",
      "q": "EBIT = 95, tau_c = 22%, depreciation = 30, CapEx = 42, dNWC = +6, interest expense = 14. Compute free cash flow, and verify the unlevered net income from the bottom of the income statement.",
      "hint": "EBIT(1 - tau_c) = 95 x 0.78 = 74.1000.\nFCF = 74.1000 + 30 - 42 - 6 = 56.1000.\nThe interest of 14 is deliberately ignored: financing costs live in the discount rate, never in the numerator.\nCheck from the bottom up: net income = (95 - 14) x 0.78 = 81 x 0.78 = 63.1800, and after-tax interest added back = 14 x 0.78 = 10.9200, giving 63.1800 + 10.9200 = 74.1000 - exactly the unlevered net income. Both routes give FCF = 56.1000."
    },
    {
      "type": "calc",
      "q": "Net working capital is held at 12% of sales. Sales are 250 in year 0, 290 in year 1 and 310 in year 2. Compute the NWC levels and dNWC for years 1 and 2, and check them against the change in level over the whole horizon.",
      "hint": "Levels: NWC0 = 0.12 x 250 = 30.0000; NWC1 = 0.12 x 290 = 34.8000; NWC2 = 0.12 x 310 = 37.2000.\ndNWC1 = 34.8000 - 30.0000 = +4.8000; dNWC2 = 37.2000 - 34.8000 = +2.4000. Equivalently 0.12(290 - 250) = 4.8000 and 0.12(310 - 290) = 2.4000.\nCheck: 4.8000 + 2.4000 = 7.2000, and NWC2 - NWC0 = 37.2000 - 30.0000 = 7.2000.\nBoth are positive because sales are growing: a growing firm is permanently investing in working capital, which is why growth is not free. Write the levels in a row of their own, difference them, then feed the difference in."
    },
    {
      "type": "calc",
      "q": "A firm has sales of 750 and net working capital at 16% of sales. A new logistics system permanently cuts NWC to 11% of sales. EBIT that year is 200, tau_c = 25%, depreciation 50, CapEx 55. Compute that year's free cash flow, and say why the following year's terminal value must NOT be built by growing it.",
      "hint": "NWC before = 0.16 x 750 = 120.0000; after = 0.11 x 750 = 82.5000; dNWC = 82.5000 - 120.0000 = -37.5000.\nEBIT(1 - tau_c) = 200 x 0.75 = 150.0000.\nFCF = 150.0000 + 50 - 55 - (-37.5000) = 150.0000 + 50 - 55 + 37.5000 = 182.5000.\nThe 37.5000 is a ONE-OFF balance-sheet release, not recurring profit. Growing this FCF into a perpetuity assumes the firm releases 37.5000 of inventory every year forever, which is impossible. Build a normalised next-year FCF from its components instead - EBIT grown, depreciation grown, CapEx grown, and dNWC computed from the NEW policy of 11% of sales."
    },
    {
      "type": "calc",
      "q": "After the explicit forecast, free cash flow at date 5 is expected to be 88 and to grow at 2.5% forever. The discount rate is 8.5%. Compute the terminal value at date 4 and its present value at date 0, and verify the terminal value.",
      "hint": "TV4 = FCF5/(r - g) = 88/(0.085 - 0.025) = 88/0.06 = 1 466.6667. Note that this sits at date 4, one period before the first flow inside it, even though FCF5 arrives at date 5.\n1.085^4 = 1.385859, so PV0 = 1 466.6667/1.385859 = 1 058.3090.\nCheck: TV4 x (r - g) must return the date-5 flow: 1 466.6667 x 0.06 = 88.0000.\nThe common error is discounting five periods instead of four, which would give 975.4001 and understate the firm by 82.9089."
    },
    {
      "type": "control",
      "q": "State the free cash flow formula line by line, and say what each term is doing.",
      "solution": "FCF_t = EBIT_t(1 - tau_c) + Depreciation_t - CapEx_t - dNWC_t + Other_t\n\nFour moves. (1) Take operating profit and tax it AS IF the firm had no debt at all: EBIT(1 - tau_c) is unlevered net income. (2) Add depreciation back: it is not a payment, but the tax authority allows it as a deduction, so running it through both lines gets the tax bill right and the cash right, leaving tau_c x Depreciation of tax saved. (3) Subtract the cash actually spent on long-lived assets, at full cash cost in the year paid. (4) Subtract the cash tied up in the balance sheet, i.e. the CHANGE in net working capital. 'Other' is any one-off after-tax item the problem gives you, such as proceeds from selling a machine.\n\nLay it out vertically, one labelled line per term, so partial credit survives an arithmetic slip."
    },
    {
      "type": "explain",
      "q": "Explain why interest never enters free cash flow, giving both the double-counting reason and the deeper structural reason.",
      "solution": "Double counting: the discount rate applied to FCF already contains the cost of borrowing, because rwacc is a weighted average of rE and rD. Subtract interest from the numerator too and you pay the lenders once in the cash flow and again in the discount rate, and the value comes out far too low. Financing costs live in the denominator, never in the numerator.\n\nStructural reason: keeping FCF financing-neutral separates the two questions the course keeps asking - what are the assets worth, and what does the financing add or subtract. One stream of FCF can then be valued two ways that must agree: discount at the after-tax WACC (k17), or discount at rU and add PV(TS) separately (k18). If interest were baked into FCF, the two methods would be valuing different things and the consistency check the examiner runs would be meaningless."
    },
    {
      "type": "reflect",
      "q": "Free cash flow is never a whole exercise on its own. How is it actually examined, and what two habits earn the points?",
      "solution": "It is sub-question (a) of a long chained problem, worth 4 to 6 points, and every later part depends on it - exactly as in 2021 Problem 3, 2022 Problem 3, 2017V Problem 4, and step one of the nine-step valuation in H2025 Exercise 4. The formula is on the sheet, so the points are not for remembering it; they are for the three places people reliably go wrong: taxing the wrong profit line, getting the working-capital sign backwards, and capitalising a terminal year that contains a one-off item.\n\nHabit 1: lay the calculation out vertically, one labelled line per term, so partial credit survives an arithmetic slip and the grader can follow you. H2017's key states plainly that a number with no calculation shown earns nothing.\n\nHabit 2: state your assumptions in one line - 'NWC held at 18% of sales; the year 3 policy change is treated as a one-off release, so the terminal year is normalised'. The discipline is what is being marked."
    }
  ],
  "3": [
    {
      "type": "calc",
      "q": "Market volatility is 18%. A stock has volatility 28% and correlation 0.60 with the market. Compute its beta two ways, then its required return if rf = 2.5% and the market risk premium is 5.5%.",
      "hint": "Covariance route: Cov = 0.60 x 0.28 x 0.18 = 0.030240 and Var(Rmkt) = 0.18^2 = 0.032400, so beta = 0.030240/0.032400 = 0.9333.\nShortcut route: beta = Corr x sigma_i/sigma_mkt = 0.60 x 0.28/0.18 = 0.9333. The two agree.\nCAPM: r = 0.025 + 0.9333(0.055) = 0.025 + 0.051333 = 0.076333 = 7.6333%.\nNote that a stock 1.56 times as volatile as the market still has a beta below 1, because only 60% of its movement is shared with the market."
    },
    {
      "type": "calc",
      "q": "An investor holds three stocks with betas 1.35, 0.80 and 1.60 in weights 40%, 35% and 25%. rf = 2.5% and the market risk premium is 5.5%. Find the portfolio's beta and required return, and verify by a second route.",
      "hint": "betaP = 0.40(1.35) + 0.35(0.80) + 0.25(1.60) = 0.6000 + 0.2800 + 0.4000 = 1.2200.\nrP = 0.025 + 1.2200(0.055) = 0.025 + 0.067100 = 0.092100 = 9.2100%.\nSecond route - apply the CAPM first, then weight: r1 = 0.025 + 1.35(0.055) = 0.099250; r2 = 0.025 + 0.80(0.055) = 0.069000; r3 = 0.025 + 1.60(0.055) = 0.113000. Then 0.40(0.099250) + 0.35(0.069000) + 0.25(0.113000) = 0.039700 + 0.024150 + 0.028250 = 0.092100.\nThe routes agree because the CAPM is linear in beta. Remember that: weighting betas then applying the CAPM equals applying the CAPM then weighting returns."
    },
    {
      "type": "calc",
      "q": "Every stock has volatility 30% and every pair correlates 0.25. Compute portfolio volatility for n = 2, n = 10 and n = 20 equally weighted holdings, and the floor as n grows without limit. How much of the single-stock risk is removable?",
      "hint": "sigma_P = sigma x sqrt(1/n + (1 - 1/n)rho).\nn = 2: 0.30 x sqrt(0.5 + 0.5 x 0.25) = 0.30 x sqrt(0.625) = 0.30 x 0.790569 = 23.7171%.\nn = 10: 0.30 x sqrt(0.1 + 0.9 x 0.25) = 0.30 x sqrt(0.325) = 0.30 x 0.570088 = 17.1026%.\nn = 20: 0.30 x sqrt(0.05 + 0.95 x 0.25) = 0.30 x sqrt(0.2875) = 0.30 x 0.536190 = 16.0857%.\nFloor: sigma x sqrt(rho) = 0.30 x 0.500000 = 15.0000%.\nOf the 30.0000% a single stock carries, 15.0000 percentage points survive infinite diversification and the rest is removable. Twenty holdings get you within 1.09 points of the floor, and it costs nothing to capture."
    },
    {
      "type": "calc",
      "q": "A listed comparable has a cost of equity of 12.8%. rf = 2.5% and the EXPECTED RETURN ON THE MARKET is 8.0%. Recover its equity beta, and state the answer you would have got had you used 8.0% as if it were the premium.",
      "hint": "The market risk premium is E[Rmkt] - rf = 0.080 - 0.025 = 0.055. Underline which of the two the question gave you before writing anything.\nCAPM backwards: betaE = (rE - rf)/(E[Rmkt] - rf) = (0.128 - 0.025)/0.055 = 0.103/0.055 = 1.8727.\nUsing 8.0% as the premium instead gives (0.128 - 0.025)/0.080 = 1.2875, which is 31% too low and would contaminate betaU, rU, rE and every WACC downstream.\nAnother common slip is forgetting to subtract rf from rE: 0.128/0.055 = 2.3273."
    },
    {
      "type": "control",
      "q": "Split the risk in a single stock into its two components, and say precisely what diversification does to each.",
      "solution": "Firm-specific risk (idiosyncratic, unique, diversifiable) is everything that happens to that firm alone: a failed drug trial, a fire at the plant, a founder resigning, a lawsuit won. These events are unrelated across firms.\n\nSystematic risk (market, undiversifiable) is everything that hits the whole economy at once: a recession, an oil price collapse, a shift in the general level of interest rates. Every firm is exposed, though not equally.\n\nFormally Var(RP) = (1/n)(average variance) + (1 - 1/n)(average covariance). The first term is the firm-specific part and it dies at rate 1/n. The second converges to the average covariance, which is positive, and no amount of diversification touches it. With equal sigma and pairwise correlation rho, sigma_P = sigma x sqrt(1/n + (1 - 1/n)rho), with a floor of sigma x sqrt(rho).\n\nOnly the surviving part is priced, because only it cannot be avoided."
    },
    {
      "type": "explain",
      "q": "A classmate says: 'This biotech has 60% volatility, so its cost of capital must be enormous.' Correct him, and say what a question must supply if it wants a cost of capital from sigma.",
      "solution": "Volatility and required return are linked only through the part of the volatility that correlates with the market, because beta = Corr x sigma_i/sigma_mkt. A biotech whose fortunes depend on one trial result has enormous sigma but low correlation with the business cycle, so it can carry a LOWER beta than a utility with 20% volatility whose earnings track the cycle closely.\n\nWorked case from the chapter: Alfa with sigma = 40% and correlation 0.35 has beta 0.7778; Bravo with sigma = 22% and correlation 0.80 has beta 0.9778. The wilder stock has the lower required return, because most of its 40% is noise a diversified holder never feels.\n\nConsequence: if an exam question gives you sigma and asks for a cost of capital, it MUST also give a correlation or a covariance with the market - otherwise the question is not answerable. Look for it before assuming you have forgotten a formula. And note that an undiversified investor genuinely bears more risk than a diversified one, but the market does not pay him for it: he is bearing a cost he chose."
    },
    {
      "type": "reflect",
      "q": "The CAPM has appeared in all eleven mapped papers, yet almost never as 'state the CAPM'. In what direction is it actually used, and why does the exam need that direction?",
      "solution": "It is used backwards: betaE = (rE - rf)/(E[Rmkt] - rf). You are told what a firm's securities are expected to return and asked to recover the risk that justifies it. That is the opening move of H2024 Exercise 5 and it is buried inside the nine steps of H2025 Exercise 4 - if you can only run the CAPM forwards you cannot start those exercises at all.\n\nWhy the exam needs it: the firm you are asked to value is typically private, newly formed, or about to change its capital structure, so it has no usable return history. What you do have is a listed comparable in the same business with an observable rE and a known D/E. Business risk is a property of the assets, not of the financing, so you lift it from the comparable, strip out the comparable's leverage to get betaU, and reapply your own. Every step runs through the CAPM, and the first one runs through it backwards.\n\nIt works equally on equity (rE gives betaE), on debt (rD gives betaD) and on the unlevered firm (rU gives betaU)."
    }
  ],
  "4": [
    {
      "type": "calc",
      "q": "A listed twin has rE = 12.40%, rD = 5.00%, E/V = 0.60 and D/V = 0.40. rf = 2.00% and the market risk premium is 6.00%. Your division will run at D/E = 0.50 and can borrow at 4.40%; tau_c = 25%. Run the whole Twin-Firm Ladder to a pre-tax and an after-tax WACC, with all checks.",
      "hint": "Rung 2 - betaE = (0.1240 - 0.0200)/0.0600 = 1.7333.\nRung 3 - betaD = (0.0500 - 0.0200)/0.0600 = 0.5000. Not zero, so it must be carried.\nRung 4 - UNLEVER, no (1 - tau_c) term: betaU = 0.60(1.7333) + 0.40(0.5000) = 1.0400 + 0.2000 = 1.2400.\nRung 5 - rU = 0.0200 + 1.2400(0.0600) = 0.094400 = 9.4400%. Sanity check on the twin: 0.60(0.1240) + 0.40(0.0500) = 0.0744 + 0.0200 = 0.094400.\nRung 6 - your betaD = (0.0440 - 0.0200)/0.0600 = 0.4000. betaE = 1.2400 + 0.50(1.2400 - 0.4000) = 1.6600, so rE = 0.0200 + 1.6600(0.0600) = 0.119600 = 11.9600%. MM II cross-check: 0.094400 + 0.50(0.094400 - 0.044000) = 0.094400 + 0.025200 = 0.119600.\nRung 7 - D/E = 0.50 gives D/V = 1/3 and E/V = 2/3. Pre-tax: (2/3)(0.119600) + (1/3)(0.044000) = 0.079733 + 0.014667 = 0.094400 = rU. After-tax: (2/3)(0.119600) + (1/3)(0.044000)(0.75) = 0.079733 + 0.011000 = 0.090733 = 9.0733%.\nBeta check: (2/3)(1.6600) + (1/3)(0.4000) = 1.106667 + 0.133333 = 1.2400 = betaU."
    },
    {
      "type": "calc",
      "q": "Take the same twin (betaE = 1.7333, betaD = 0.5000, E/V = 0.60, D/V = 0.40) and unlever it the way some textbooks do, weighting debt by D(1 - tau_c) with tau_c = 25%. Compare betaU and rU with the FIE402 answer, and say which check would expose the difference.",
      "hint": "FIE402 convention: betaU = 0.60(1.7333) + 0.40(0.5000) = 1.2400, so rU = 0.0200 + 1.2400(0.0600) = 9.4400%.\n(1 - tau_c) version: the weights become E = 0.60 and D(1 - tau_c) = 0.40 x 0.75 = 0.30, summing to 0.90. betaU = (0.60/0.90)(1.7333) + (0.30/0.90)(0.5000) = 1.155556 + 0.166667 = 1.3222, so rU = 0.0200 + 1.3222(0.0600) = 0.099333 = 9.9333%.\nDifference: 0.0822 on the beta and 0.4933 percentage points on rU - which on a perpetuity is a valuation error of several percent.\nThe check that exposes it is 'value by WACC = value by APV'. This course assumes rebalancing to a target D/V, so the tax shield carries the same risk as the assets and gets no separate weighting; use the (1 - tau_c) version and the two methods stop agreeing. The examiner runs that check."
    },
    {
      "type": "calc",
      "q": "Your firm has E = 900, D = 300 (market values), rE = 13.20% and rD = 5.40%. rf = 3.00%, the market risk premium is 6.00%, tau_c = 25%. The board recapitalises to D/V = 0.50, and the bank reprices the debt at 6.60%. Find rU, the new rE, and the after-tax WACC before and after.",
      "hint": "Today: E/V = 0.75, D/V = 0.25. betaE = (0.1320 - 0.0300)/0.0600 = 1.7000; betaD = (0.0540 - 0.0300)/0.0600 = 0.4000.\nbetaU = 0.75(1.7000) + 0.25(0.4000) = 1.2750 + 0.1000 = 1.3750, so rU = 0.0300 + 1.3750(0.0600) = 0.112500 = 11.2500%. Check: 0.75(0.1320) + 0.25(0.0540) = 0.0990 + 0.0135 = 0.112500.\nAfter-tax WACC today: 0.75(0.1320) + 0.25(0.0540)(0.75) = 0.099000 + 0.010125 = 0.109125 = 10.9125%.\nAfter the recap, D/E = 1.0000 and the new betaD = (0.0660 - 0.0300)/0.0600 = 0.6000.\nbetaE = 1.3750 + 1.0000(1.3750 - 0.6000) = 2.1500, so rE = 0.0300 + 2.1500(0.0600) = 0.159000 = 15.9000%. MM II check: 0.112500 + 1.0000(0.112500 - 0.066000) = 0.159000.\nNew pre-tax: 0.50(0.159000) + 0.50(0.066000) = 0.112500 = rU, unchanged.\nNew after-tax: 0.50(0.159000) + 0.50(0.066000)(0.75) = 0.079500 + 0.024750 = 0.104250 = 10.4250%.\nEconomics: rU did not move, rE rose from 13.2000% to 15.9000%, and the after-tax WACC fell from 10.9125% to 10.4250% - entirely the larger tax shield, not any reduction in business risk. Note that you MUST use the repriced 6.60%; keeping 5.40% would still pass both consistency checks on a wrong answer."
    },
    {
      "type": "calc",
      "q": "A twin has rE = 15.00%, D/E = 1.00 and rD = 6.00%; rf = 3.00% and the market risk premium is 6.00%. Your firm will run at D/V = 0.25 and borrow at 4.80%, with tau_c = 22%. Find your after-tax WACC, then value a free cash flow of 50 growing at 2% forever.",
      "hint": "betaE = (0.1500 - 0.0300)/0.0600 = 2.0000; betaD = (0.0600 - 0.0300)/0.0600 = 0.5000.\nD/E = 1.00 means E/V = D/V = 0.50, so betaU = 0.50(2.0000) + 0.50(0.5000) = 1.2500 and rU = 0.0300 + 1.2500(0.0600) = 0.105000 = 10.5000%. Check on the twin: 0.50(0.1500) + 0.50(0.0600) = 0.105000.\nYour betaD = (0.0480 - 0.0300)/0.0600 = 0.3000. D/V = 0.25 gives E/V = 0.75 and D/E = 0.25/0.75 = 0.3333.\nbetaE = 1.2500 + 0.3333(1.2500 - 0.3000) = 1.2500 + 0.3167 = 1.5667, so rE = 0.0300 + 1.5667(0.0600) = 0.124000 = 12.4000%. MM II check: 0.105000 + 0.3333(0.105000 - 0.048000) = 0.124000.\nPre-tax WACC: 0.75(0.124000) + 0.25(0.048000) = 0.093000 + 0.012000 = 0.105000 = rU.\nAfter-tax WACC: 0.75(0.124000) + 0.25(0.048000)(0.78) = 0.093000 + 0.009360 = 0.102360 = 10.2360%.\nValue: V = 50/(0.102360 - 0.020000) = 50/0.082360 = 607.0908.\nBeta check: 0.75(1.5667) + 0.25(0.3000) = 1.175000 + 0.075000 = 1.2500 = betaU."
    },
    {
      "type": "calc",
      "q": "rU = 10.00%, rD = 5.00%, and the target capital structure is D/V = 0.40 with tau_c = 22%. Compute rE, the pre-tax WACC and the after-tax WACC, and state what you would have got by substituting D/V into MM II.",
      "hint": "MM II uses D/E: D/V = 0.40 gives E/V = 0.60 and D/E = 0.40/0.60 = 0.6667.\nrE = 0.10 + 0.6667(0.10 - 0.05) = 0.10 + 0.033333 = 0.133333 = 13.3333%.\nPre-tax WACC: 0.60(0.133333) + 0.40(0.05) = 0.080000 + 0.020000 = 0.100000 = rU. The identity holds.\nAfter-tax WACC: 0.60(0.133333) + 0.40(0.05)(0.78) = 0.080000 + 0.015600 = 0.095600 = 9.5600%. Cross-check with rU - (D/V)tau_c rD = 0.100000 - 0.40(0.22)(0.05) = 0.100000 - 0.004400 = 0.095600.\nSubstituting D/V = 0.40 directly gives rE = 0.10 + 0.40(0.05) = 12.0000%, and the check then fails: 0.60(0.12) + 0.40(0.05) = 0.0920, not 0.1000. That failure is exactly what the consistency check exists to catch."
    },
    {
      "type": "control",
      "q": "Reproduce the Twin-Firm Ladder from memory: seven rungs, the formula on each, and which two quantities cross from the comparable's world to yours.",
      "solution": "1. Read the twin's cost of equity rE (or derive it from share price data).\n2. CAPM backwards: betaE = (rE - rf)/(E[Rmkt] - rf).\n3. The twin's debt beta: betaD = (rD - rf)/(E[Rmkt] - rf); set it to zero ONLY if the question says the debt is risk-free.\n4. UNLEVER at the twin's weights: betaU = (E/V)betaE + (D/V)betaD, with no (1 - tau_c) term.\n5. Turn it into a rate: rU = rf + betaU(E[Rmkt] - rf).\n6. RELEVER to your target: betaE = betaU + (D/E)(betaU - betaD), then CAPM; or equivalently rE = rU + (D/E)(rU - rD).\n7. Build the WACC you need: pre-tax = rU; after-tax = (E/V)rE + (D/V)rD(1 - tau_c).\n\nbetaU and rU are the only quantities that cross, because they depend on the business and not on how it happens to be financed. If a question seems to skip a rung, that rung's input was handed to you directly.\n\nClose with the two checks: [E/V]betaE + [D/V]betaD = betaU, and pre-tax WACC = rU. Both are on the examiner's own list and writing them out earns points."
    },
    {
      "type": "control",
      "q": "Both consistency checks passed, yet your relevered rE is wrong. How is that possible, and what does it tell you about what the checks do?",
      "solution": "Suppose a recapitalisation doubles leverage and the question states that the borrowing rate rises, but you lazily keep the old rD = 4.5000%. You get betaE = 1.20 + 1.00(1.20 - 0.30) = 2.10 and rE = 13.5000%. Now run the checks: pre-tax WACC = 0.5(0.1350) + 0.5(0.0450) = 9.0000% = rU, and 0.5(2.10) + 0.5(0.30) = 1.20 = betaU. Both pass cleanly on a wrong answer.\n\nWhat this tells you: checks 1 and 2 are REDUNDANT COMPUTATIONS. They recompute a number you already have along a different route using the same inputs, so they verify that rE, rD and rU hang together algebraically - nothing more. They confirm your arithmetic, not your assumptions.\n\nThey remain worth the two minutes, because they catch wrong weights, D/V used where D/E belongs, and the (1 - tau_c) unlevering. But if the question tells you the borrowing rate changes with leverage, you must use the new rate; no identity will rescue you."
    },
    {
      "type": "explain",
      "q": "Explain why the pre-tax WACC is flat in leverage while the after-tax WACC slopes down, and what that says about where the value of debt comes from.",
      "solution": "The pre-tax WACC is (E/V)rE + (D/V)rD, which is the definition of rU. It is flat in leverage not as an approximation but as an identity: leverage changes who receives the cash flows first, not what the cash flows are or how risky they are. As D/E rises, rE climbs exactly enough - by (D/E)(rU - rD) - to keep the weighted average at rU. Once leverage is high enough that rD itself starts rising, debt holders begin absorbing business risk and rE climbs more gently, but the average is unchanged.\n\nThe after-tax WACC is (E/V)rE + (D/V)rD(1 - tau_c), which differs from the pre-tax version by exactly (D/V)rD tau_c - equivalently rwacc = rU - (D/V)tau_c rD. So the entire downward slope is the tax subsidy on interest and nothing else.\n\nConclusion for an exam answer: in this framework the ONLY reason debt lowers the cost of capital is that interest is deductible. There is no reduction in business risk, and any claim that debt is 'cheaper than equity' because rD < rE ignores that the equity left behind is riskier."
    },
    {
      "type": "reflect",
      "q": "This skill appears in all eleven mapped papers and is usually sub-questions (a) to (c) of the largest exercise. Given that the marks are attached to the steps, how should you write the answer, and what do you do if a number will not come?",
      "solution": "Write each rung on its own line, with the method NAMED before the arithmetic: 'unlevering the comparable', 'MM II', 'CAPM backwards to get betaE'. Then the substituted numbers, then the result to four decimals. The grader can then award the step even when the arithmetic slips, and H2025 explicitly asked for four decimal places while the keys flag rounding drift beyond about 0.001.\n\nIf a number will not come, carry it forward as a SYMBOL and state the assumption: 'taking rU as given, rE = rU + 0.5(rU - 0.044)'. The later sub-questions are marked on method, so they still earn their points; abandoning the exercise because step (b) broke is how candidates lose 20 points instead of 3.\n\nAlways close with the identity pre-tax WACC = rU and the beta weighting check. They cost one line each and are stated consistency checks in the solution keys, so they earn marks on their own as well as catching your errors."
    }
  ],
  "5": [
    {
      "type": "calc",
      "q": "A two-year zero-coupon bond with face value 1 000 trades at 880. Compute its yield to maturity, and its credit spread if the two-year government yield is 2.60%.",
      "hint": "y = (F/P)^(1/n) - 1 = (1 000/880)^(1/2) - 1 = (1.136364)^(0.5) - 1 = 1.066004 - 1 = 0.066004 = 6.6004%.\nCheck by pricing it back: 1 000/1.066004^2 = 1 000/1.136364 = 880.0000.\nCredit spread = 6.6004% - 2.6000% = 4.0004%, or about 400 basis points.\nRemember what this number is: a PROMISED yield, earned only if every promised krone arrives, and a spread that still contains both the expected loss and the risk premium. It is not yet anything you can put in a WACC."
    },
    {
      "type": "calc",
      "q": "A corporate bond has a promised yield of 9.20%. The default probability is 6.00% per year and creditors expect to recover 45% of the promised payment. rf = 2.50% and the market risk premium is 5.50%. Find the expected return on the debt and its beta.",
      "hint": "Loss given default: L = 1 - R = 1 - 0.45 = 0.5500. Expected loss rate: p x L = 0.06 x 0.55 = 0.033000 = 3.3000%.\nrD = y - p x L = 0.092000 - 0.033000 = 0.059000 = 5.9000%.\nbetaD = (rD - rf)/(E[Rmkt] - rf) = (0.059000 - 0.025000)/0.055000 = 0.034000/0.055000 = 0.6182.\nThe error to avoid: computing beta from the promised yield, (0.092000 - 0.025000)/0.055000 = 1.2182, which is almost double. The block from rD to y is expected loss - money the lender does not expect to receive - and it is compensation for nothing, so it carries no beta. Only rD - rf is a risk premium."
    },
    {
      "type": "calc",
      "q": "A one-year zero with face value 1 000 trades at 900. The one-year risk-free rate is 3.00% and creditors would recover 50% of face in default. What default probability is the market pricing in, and why is it not a forecast?",
      "hint": "Set price = expected payment discounted at rf: P = F[1 - qL]/(1 + rf).\nq = [1 - P(1 + rf)/F]/L = [1 - 900(1.03)/1 000]/0.50 = [1 - 0.927000]/0.50 = 0.073000/0.50 = 0.146000 = 14.6000%.\nCheck by pricing back: [0.854000(1 000) + 0.146000(500)]/1.03 = [854.000 + 73.000]/1.03 = 927.000/1.03 = 900.0000.\nq is the RISK-NEUTRAL probability, not the true one. Discounting at rf pushes all the risk adjustment into the probability, so the bad state is deliberately overweighted - default clusters in bad states and a krone in a bad state is worth more to investors. q will therefore always exceed the true p. It is a pricing device, and it is exactly the trick behind binomial option pricing in k22."
    },
    {
      "type": "calc",
      "q": "A bond has a promised yield of 8.40% with a 5.00% default probability and 60% loss given default. rf = 2.50%, the market risk premium is 5.50%, the firm's asset beta is 1.05, its target is D/V = 0.40 and tau_c = 22%. Take it all the way to a pre-tax and an after-tax WACC, and quantify the error of using y instead of rD.",
      "hint": "Step 1 - rD = y - pL = 0.084000 - 0.05(0.60) = 0.084000 - 0.030000 = 0.054000 = 5.4000%.\nStep 2 - betaD = (0.054000 - 0.025000)/0.055000 = 0.5273.\nStep 3 - rU = 0.025000 + 1.05(0.055000) = 0.082750 = 8.2750%.\nStep 4 - D/V = 0.40 gives E/V = 0.60 and D/E = 0.40/0.60 = 0.6667. betaE = 1.05 + 0.6667(1.05 - 0.5273) = 1.05 + 0.3485 = 1.3985, so rE = 0.025000 + 1.3985(0.055000) = 0.101917 = 10.1917%.\nStep 5 - pre-tax: 0.60(0.101917) + 0.40(0.054000) = 0.061150 + 0.021600 = 0.082750 = rU. After-tax: 0.60(0.101917) + 0.40(0.054000)(0.78) = 0.061150 + 0.016848 = 0.077998 = 7.7998%.\nThe error avoided: using the promised yield gives 0.061150 + 0.40(0.084000) = 0.094750 = 9.4750% pre-tax, overstating it by 1.2000 percentage points. On a perpetuity that is roughly a 9% valuation error.\nBeta check: 0.60(1.3985) + 0.40(0.5273) = 0.839100 + 0.210920 = 1.0500 = betaU."
    },
    {
      "type": "control",
      "q": "Set out the anatomy of a credit spread. Which block is a risk premium, which is not, and what follows for computing betaD?",
      "solution": "spread = y - rf, and it contains two economically different things.\n\nBlock 1, rf to rD: the RISK PREMIUM on debt, priced by the CAPM as rD - rf = betaD(E[Rmkt] - rf). This is genuine compensation for bearing systematic default risk - default clusters in recessions, which is why it is systematic and not diversifiable.\n\nBlock 2, rD to y: the EXPECTED LOSS p x L. This is not a premium at all. It is money the lender simply does not expect to receive - padding the borrower must promise so that the average payment comes out right. It is compensation for nothing.\n\nWhat follows: never compute betaD from the yield. Compute rD = y - pL first, then betaD = (rD - rf)/(E[Rmkt] - rf). Reading a spread as if it were all risk premium is the single most common error in this material, and it inflates betaD, betaU, rU and every rate downstream. Numerically, on a 480 bp spread with rf = 3.00%, p x L = 2.20% and rD = 5.60%, only 2.60 percentage points are a premium."
    },
    {
      "type": "explain",
      "q": "Explain why the promised yield must not be used in the WACC, and quantify what it costs.",
      "solution": "The WACC is a weighted average of what investors EXPECT to earn, because that is what the firm's cash flows must cover on average. The promised yield is a best case, not an average: it is the return realised in the states where nothing goes wrong. Corporate borrowers sometimes default, and in default lenders recover only part of what they were promised, so the average payment is F[1 - pL] and the expected return is rD = y - pL, which is at most y and equal to it only when p = 0 or L = 0.\n\nUsing y therefore inflates the discount rate, which undervalues the firm, and the higher the credit risk the worse the error. In the chapter's worked case, y = 7.8000% against rD = 5.6000% with D/V = 0.35: the pre-tax WACC comes out at 9.2700% instead of 8.5000%, an overstatement of 0.7700 percentage points - roughly a 9% valuation error on a perpetuity. In a junk-bond case the gap runs to several percentage points.\n\nExam technique: write the words 'promised' and 'expected' explicitly next to your two numbers. The marks in 2021 MC7-9 and V2024 Problem 3 were for the distinction itself."
    },
    {
      "type": "reflect",
      "q": "Kurbatov has not used credit risk in H2024 or H2025. Is this chapter worth studying, and what does it set up?",
      "solution": "It is insurance rather than a guaranteed 20 points, and it should be treated as such - but it should not be skipped, for three reasons.\n\nFirst, it appears in eight of the eleven mapped papers, including 2021 MC7-9 and V2024 Problem 3, so its absence from two papers is a small sample rather than evidence of removal.\n\nSecond, it is cheap. The whole chapter is four ideas: y from a price, rD = y - pL, the split of the spread into expected loss plus risk premium, and q backed out of a price. An hour buys all of it.\n\nThird, and decisively, it is the entry ticket to k24, which has carried up to 90 points in older papers. Everything here takes p, L and R as given; k24 derives them. Equity becomes a call option on the firm's assets with strike equal to the face value of debt, risky debt becomes risk-free debt minus a put written on those assets, and the yield, the credit spread and the risk-neutral default probability all fall out of an option-pricing model instead of an analyst's assumption. Credit default swaps are then insurance priced off q, and betaE = N(d1)(V/E)betaU replaces the linear relevering of k4. Read chapter 5 as the vocabulary lesson for that chapter."
    }
  ],
  "6": [
    {
      "type": "calc",
      "q": "Fjellstrand ASA is all-equity in a perfect market with no taxes: 25 million shares at 40.00, free cash flow of 100 a year in perpetuity, all paid out. It issues 400 of risk-free perpetual debt at rD = rf = 5.00% and buys back shares. Give rU, the price at announcement, the shares repurchased, the new rE, and the dividend per share before and after.",
      "hint": "rU: all 100 goes to investors and E0 = 25 x 40.00 = 1000, so rU = 100/1000 = 0.100000 = 10.0000%.\nAnnouncement: no taxes, no costs, assets unchanged, so there is no news to price. V stays 1000 and the price stays 40.00. Say MM Proposition I, and say why - that is the sub-question's content.\nRepurchase: n = 400/40.00 = 10.0000 million shares, so N1 = 15.0000 million and E1 = 1000 - 400 = 600, giving 600/15 = 40.00.\nNew rE: D/E = 400/600 = 0.666667, so rE = 0.100000 + 0.666667(0.100000 - 0.050000) = 0.100000 + 0.033333 = 0.133333 = 13.3333%.\nPre-tax WACC check: 0.60(0.133333) + 0.40(0.050000) = 0.080000 + 0.020000 = 0.100000 = rU.\nDividend per share: before, 100/25 = 4.00, and 4.00/0.100000 = 40.00. After, interest = 0.05 x 400 = 20, so equity receives 80 and DPS = 80/15 = 5.3333, with 5.3333/0.133333 = 40.00.\nThe check that can fail is that last line: both 5.3333 and 13.3333% are numbers that never entered the price. Discount 5.3333 at the old 10.0000% and you get 53.33, and the clash tells you the relevering was skipped."
    },
    {
      "type": "calc",
      "q": "Same firm, same 400 of debt, but the proceeds are paid out as a special dividend instead. Give the dividend per share, the ex-dividend price, the ongoing dividend per share and the new rE, and then compare a shareholder on this route with one who tendered into the buyback and one at a firm that did nothing.",
      "hint": "Special dividend: DPS = 400/25 = 16.00, so the ex-dividend price is 40.00 - 16.00 = 24.00 on an unchanged 25 million shares. Check: 25 x 24.00 = 600 = E1.\nrE is the SAME as on the repurchase route, because D/E is the same: 400/600 = 0.666667 gives rE = 13.3333%. The two routes split differently between price and share count and are identical in every other respect.\nOngoing DPS = 80/25 = 3.20, and 3.20/0.133333 = 24.00.\nThe four positions, each starting from one share worth 40.00:\n  no recapitalisation - a share paying 4.00 forever at 10.0000% = 40.00\n  special dividend - a share paying 3.20 forever at 13.3333% (24.00) plus 16.00 of cash = 40.00\n  tendered into the buyback - 40.00 of cash\n  held through the buyback - a share paying 5.3333 forever at 13.3333% = 40.00\nAll four are 40.00. Write the sentence: the seller did not beat the holder, the dividend did not beat the repurchase, and the recapitalisation did not beat doing nothing."
    },
    {
      "type": "calc",
      "q": "Firm U is all-equity and worth 1200. Firm L owns identical assets, both sets paying 120 a year in perpetuity, and has 500 of risk-free perpetual debt at 4.00% plus equity worth 800. Show that L is overpriced, build the arbitrage at 1% scale, and verify it closes.",
      "hint": "V^L = 800 + 500 = 1300 against V^U = 1200, so leverage has supposedly created 100. It has not.\nWhat L's equity receives: interest = 0.04 x 500 = 20.00, so equity gets 120 - 20 = 100.00 a year, an implied rE of 100/800 = 0.125000 = 12.5000%.\nThe trade at 1% scale. Short 1% of L's equity: +8.00. Borrow 1% of L's debt level, 5.00, at 4.0000%: +5.00. Buy 1% of U's equity: -12.00. Net today: 8.00 + 5.00 - 12.00 = +1.00.\nEvery year afterwards: receive 0.01 x 120 = 1.20 from U, pay 0.04 x 5.00 = 0.20 on your own loan, owe the short 0.01 x 100.00 = 1.00. Net = 1.20 - 0.20 - 1.00 = 0.00, in every state.\nCheck: the profit is 1% of the mispricing, 0.01(1300 - 1200) = 1.00.\nThis is not an identity - borrow the wrong amount and step three stops cancelling, so that is the line to verify. Scaled up, the trade closes the gap and V^L is driven back to 1200."
    },
    {
      "type": "calc",
      "q": "rU = 9.00% and rD = 5.00%. Compute rE at D/E = 0, 0.5, 1.0 and 2.0, verify that the pre-tax WACC is flat, and state what you would have got by substituting D/V = 0.60 into MM II instead.",
      "hint": "rE = rU + (D/E)(rU - rD) = 0.090000 + (D/E)(0.040000).\n  D/E = 0.0: rE = 0.090000 = 9.0000%, weights E/V = 1.0000, D/V = 0.0000\n  D/E = 0.5: rE = 0.110000 = 11.0000%, E/V = 0.6667, D/V = 0.3333\n  D/E = 1.0: rE = 0.130000 = 13.0000%, E/V = 0.5000, D/V = 0.5000\n  D/E = 2.0: rE = 0.170000 = 17.0000%, E/V = 0.3333, D/V = 0.6667\nPre-tax WACC at each: (2/3)(0.110000) + (1/3)(0.050000) = 0.073333 + 0.016667 = 0.090000. (0.5)(0.130000) + (0.5)(0.050000) = 0.090000. (1/3)(0.170000) + (2/3)(0.050000) = 0.056667 + 0.033333 = 0.090000. Flat at rU in every case, as an identity rather than an approximation.\nThe slip: at D/E = 1.5 the correct rE is 0.090000 + 1.5(0.040000) = 15.0000%, but substituting D/V = 1.5/2.5 = 0.6000 gives 0.090000 + 0.6000(0.040000) = 11.4000%, and the check then fails - 0.40(0.114000) + 0.60(0.050000) = 0.075600, not 0.090000. That failure is exactly what the consistency check exists to catch."
    },
    {
      "type": "control",
      "q": "Reproduce the recapitalisation routine from memory: the two payout routes, the formula on each line, and which quantity is unchanged in each.",
      "solution": "REPURCHASE. n = D_new/P, where P is the price the shares are actually bought at, i.e. the POST-ANNOUNCEMENT price. Then N1 = N0 - n and P1 = E1/N1, which comes back to P. The SHARE PRICE is unchanged; the share count falls.\n\nSPECIAL DIVIDEND. DPS = D_new/N0 and the ex-dividend price is P0 - DPS. The SHARE COUNT is unchanged; the price falls.\n\nBOTH. E1 = V - D_new, and rE = rU + (D_new/E1)(rU - rD). Since V does not move in a perfect market, equity absorbs the whole of the new debt, and rE is the same on both routes because D/E is the same on both.\n\nThe distinction that earns marks: the ANNOUNCEMENT is the only moment a price can jump, because it is the only moment information arrives; EXECUTION swaps cash for securities at prices already set. Under MM the announcement carries no news, so nothing moves at either date. In k7 the announcement does carry news, and then n = D_new/P1 with P1 = P0 + PV(TS)/N0 - the single most valuable difference between the two chapters."
    },
    {
      "type": "explain",
      "q": "A classmate says: 'The recapitalisation pushed rE from 10% to 13.33%, so shareholders are clearly worse off, and the firm should undo it.' Correct him.",
      "solution": "He has confused a required return with a change in wealth. Equity now stands behind a fixed interest claim, so its cash flow is more volatile in every state, and the market prices exactly that: the rise in rE is compensation for risk the shareholder is now bearing, not a penalty imposed on him.\n\nShow it with the numbers. Before the recap a share paid 4.00 forever and was worth 4.00/0.100000 = 40.00. After it, the 15 million remaining shares each receive 80/15 = 5.3333, and 5.3333/0.133333 = 40.00. The dividend per share rose in exactly the ratio the discount rate rose, which is why the price did not move.\n\nAdd the second half, which is where the marks are: the pre-tax WACC did not rise either. It is (E/V)rE + (D/V)rD = 0.60(0.133333) + 0.40(0.050000) = 0.100000 = rU, flat as an identity. As leverage rises, rE climbs by exactly (D/E)(rU - rD) while the weights shift towards the cheaper claim, and the two effects cancel.\n\nSo there is nothing to undo. And the mirror argument is worth stating too: 'debt is cheaper than equity because rD < rE' ignores the equity left behind, which is precisely what got more expensive."
    },
    {
      "type": "reflect",
      "q": "H2024 Exercise 3 and H2025 Exercise 3 are 18 points each and are this chapter alone. What separates a full-mark answer from one that gets the arithmetic right?",
      "solution": "The arithmetic is a routine and most candidates can run it. The marks that go missing sit in three places.\n\nFirst, saying WHY the price holds rather than merely that it does. 'No taxes and no issuance costs, so this is a purely financial transaction and MM Proposition I applies' is the sentence the key rewards. A number with no reason attached is worth less than half of the sub-question.\n\nSecond, giving the dividend per share BOTH BEFORE AND AFTER. The question asks for a comparison and roughly half of the answers give only one of the two, which makes the comparison unanswerable and costs the following sub-question as well.\n\nThird, setting the three shareholders side by side in one small table: the one who did nothing, the one who sold into the buyback, and the one who held through it. All three end at the same wealth, and stating that explicitly is the exercise's actual conclusion.\n\nOne habit protects everything: run the check that CAN fail. Discounting the new dividend per share at the new rE uses two numbers that never entered the price, so agreement is real evidence, while P = E1/N1 is an identity and proves nothing. And carry four decimals on every rate: these sub-questions are chained, so one rounding slip contaminates everything downstream."
    }
  ],
  "7": [
    {
      "type": "calc",
      "q": "Fjellheim AS earns an unlevered free cash flow of 80 a year in perpetuity at rU = 10.00%. It borrows D = 200 at rD = 6.00% with tau_c = 25%. Value the firm under three debt policies: fixed and permanent, rebalanced to a constant D/E, and repaid in full after one year.",
      "hint": "V^U = 80/0.100000 = 800.00.\nThe annual shield is common to all three: TS = tau_c x rD x D = 0.25 x 0.06 x 200 = 3.0000.\nPolicy A, fixed permanent debt. The shield is a level perpetuity as safe as the interest, so discount at rD: PV(TS) = 3.0000/0.060000 = 50.0000 = tau_c x D. V^L = 850.00.\nPolicy B, rebalanced to a constant D/E. Future debt moves with firm value, so the shield carries asset risk: PV(TS) = 3.0000/0.100000 = 30.0000 and V^L = 830.00.\nPolicy C, repaid after one year. One shield of 3.0000 at date 1, as safe as the debt: PV(TS) = 3.0000/1.060000 = 2.8302, so V^L = 802.8302.\nSame cash flow, three answers, and the only thing that changed is the sentence describing the debt. Write that sentence down before you choose a rate - if the question is ambiguous, state the policy you assume in one line and compute. That earns marks; guessing does not."
    },
    {
      "type": "calc",
      "q": "Take policy B from the previous exercise (V^L = 830.00, D = 200, rU = 10.00%, rD = 6.00%, tau_c = 25%, unlevered FCF 80). Prove the answer by the WACC route, then show what the same route returns if you had wrongly used rD.",
      "hint": "E = 830.00 - 200 = 630.00, so D/E = 200/630 = 0.317460.\nrE = 0.100000 + 0.317460(0.100000 - 0.060000) = 0.100000 + 0.012698 = 0.112698 = 11.2698%.\nrwacc = (630/830)(0.112698) + (200/830)(0.060000)(0.75) = 0.085542 + 0.010843 = 0.096386 = 9.6386%.\nV^L = 80/0.096386 = 830.00. Consistency check 1 passes, and it is a REAL second computation because PV(TS) never entered it.\nNow the wrong version. Claim V^L = 850.00 by discounting at rD while still rebalancing. Then E = 650.00, D/E = 0.307692, rE = 0.100000 + 0.307692(0.040000) = 0.112308, and rwacc = (650/850)(0.112308) + (200/850)(0.060000)(0.75) = 0.085882 + 0.010588 = 0.096471. That gives 80/0.096471 = 829.27, against the 850.00 you claimed - a mismatch of 20.73 that the examiner will spot immediately.\nThe check can fail, which is what makes it worth the two minutes."
    },
    {
      "type": "calc",
      "q": "Nordkapp ASA is all-equity: V^U = 900 on 30 million shares, tau_c = 22%. It announces a PERMANENT issue of 300 of risk-free debt at rD = rf = 5.00%, with the proceeds used to repurchase shares. Give the price at announcement, the shares repurchased, the price afterwards, and where the gain went.",
      "hint": "Step 1 - value the shield. TS = 0.22 x 0.05 x 300 = 3.30 a year, permanent, so discount at rD: PV(TS) = 3.30/0.050000 = 66.00 = tau_c x D. V^L = 966.00.\nStep 2 - the announcement. No debt has been issued yet, so all 966.00 is equity on the original 30 million shares: P1 = 966.00/30 = 32.20, a jump of 2.20 = 66.00/30 from P0 = 30.00.\nStep 3 - issue the debt. The firm holds 300 of cash plus 666.00 of operating value: still 966.00 of equity on 30 million shares, so nothing moves.\nStep 4 - repurchase, at 32.20. n = 300/32.20 = 9.3168 million shares, leaving N1 = 20.6832 million. E1 = 966.00 - 300 = 666.00, and 666.00/20.6832 = 32.20.\nStep 5 - where the 66.00 went. The original shareholders hold 666.00 of shares plus the 300 they were paid: 966.00 against 900.00, a gain of 66.00, the whole PV(TS). New lenders paid 300 for a claim worth 300 and gained nothing.\nThe check that can fail is step 4's price. Repurchase at the stale 30.00 and you buy 10.0000 million shares, leaving 20.0000 million and implying 666.00/20 = 33.30. Two prices for one share after one transaction is a contradiction, and that is how you catch it."
    },
    {
      "type": "calc",
      "q": "A firm with V^U = 1000 and rU = 12.00% will hold D = 400 of debt at rD = 7.00% with tau_c = 22%. Compute V^L, rE and the after-tax WACC under a constant D/V policy, and cross-check the WACC two ways.",
      "hint": "Shield: TS = 0.22 x 0.07 x 400 = 6.16 a year. Constant D/V is rebalancing, so discount at rU: PV(TS) = 6.16/0.120000 = 51.3333, and V^L = 1051.3333.\nE = 1051.3333 - 400 = 651.3333, so D/E = 400/651.3333 = 0.614125 and D/V = 400/1051.3333 = 0.380469.\nrE = 0.120000 + 0.614125(0.120000 - 0.070000) = 0.120000 + 0.030706 = 0.150706 = 15.0706%.\nAfter-tax WACC, route 1: (651.3333/1051.3333)(0.150706) + (400/1051.3333)(0.070000)(0.78) = 0.093367 + 0.020774 = 0.114141 = 11.4141%.\nRoute 2, the shortcut: rwacc = rU - (D/V)tau_c x rD = 0.120000 - 0.380469(0.22)(0.070000) = 0.120000 - 0.005859 = 0.114141. The two agree.\nFinal check, consistency check 1: unlevered FCF is 1000 x 0.12 = 120, so V^L = 120/0.114141 = 1051.3333. Same number by a route that never used PV(TS)."
    },
    {
      "type": "control",
      "q": "State which rate discounts the interest tax shield in each of the three debt policies the exam uses, and give the one-line reason for each.",
      "solution": "CONSTANT D/E OR D/V, REBALANCED - discount at rU. Under a target ratio the firm borrows more when it is worth more and repays when it is worth less, so next year's debt is unknown today and moves with firm value. A cash flow that moves with the assets has their risk, hence their rate.\n\nFIXED AMOUNT, PERMANENT, NEVER REPAID - discount at rD, or rf if the debt is risk-free. D is a contract number and the interest is known, so the only thing that can interrupt the shield is default, and that is exactly what rD prices. This is the case that collapses to PV(TS) = tau_c x D, because rD cancels.\n\nKNOWN REPAYMENT SCHEDULE - discount at rD, period by period, for the same reason: each year's shield is a contractual amount.\n\nThis is a choice of ASSUMPTION, not a choice of formula. Read the sentence describing the debt: 'maintains a debt-to-equity ratio of 25%' is rebalancing; '200 million of perpetual debt outstanding' is fixed. If the question is ambiguous, state the policy you assume in one line, then compute - the sentence earns marks by itself.\n\nNeither V^L = V^U + PV(TS) nor this rule is on the formula sheet, and the rule has been multiple choice in every mapped paper that had multiple choice."
    },
    {
      "type": "explain",
      "q": "Explain why applying V^L = V^U + tau_c x D to a firm that rebalances to a target ratio overstates its value, and quantify the error on a firm with V^U = 800, D = 200, rD = 6% and rU = 10%.",
      "solution": "The shortcut is the permanent-debt case with the discount rate cancelled: a level perpetuity of tau_c x rD x D discounted at rD leaves tau_c x D. It is valid only when the amount of debt is fixed by contract and never repaid, because only then is the shield as safe as the interest payments.\n\nA rebalancing firm has a different shield. It borrows more when the firm is worth more and less when it is worth less, so next year's deduction is unknown today and rises and falls with the assets. That risk deserves the asset rate rU, not rD, and since rU exceeds rD the same cash flow is worth less.\n\nThe numbers: TS = 0.25 x 0.06 x 200 = 3.0000 a year either way. Permanent: 3.0000/0.060000 = 50.0000, so V^L = 850.00. Rebalanced: 3.0000/0.100000 = 30.0000, so V^L = 830.00. The overstatement is 20.00, or 2.4% of firm value, on a single 200 of debt - and it scales with D.\n\nThe geometry says the same thing: V^L rises in D with slope tau_c = 0.25 under permanent debt and slope tau_c x rD/rU = 0.15 under rebalancing.\n\nAnd it is not a private error. Discount at rD while still rebalancing and the WACC route returns 829.27 against the 850.00 you claimed, so consistency check 1 breaks and the examiner sees it."
    },
    {
      "type": "reflect",
      "q": "Which single sentence in this chapter has been worth the most exam points, and how should you deploy it under time pressure?",
      "solution": "'Which rate discounts the tax shield.' It was multiple choice in all eight mapped papers that had multiple choice, it is the pivot of the APV method in k18, and H2025 Exercise 4 makes you apply it inside a nine-step valuation where getting it wrong contaminates every later step.\n\nDeploy it as a reading habit rather than as a formula. Before writing anything, underline the sentence in the question that describes the debt, and write one line of your own next to it: 'constant D/E, so the shield is discounted at rU' or 'fixed perpetual debt, so at rD, hence PV(TS) = tau_c x D'. That line takes fifteen seconds and it is marked in its own right.\n\nWhen the question is genuinely ambiguous - and Kurbatov's are sometimes terse - state the assumption and proceed. A stated assumption with a correct computation under it scores nearly full marks; a silent guess scores whatever the guess was worth.\n\nThe two lines to have memorised cold, because neither is on the formula sheet: V^L = V^U + PV(TS), and the three-case rule. Write both at the top of the answer page for any valuation exercise, before you have read the numbers."
    }
  ],
  "8": [
    {
      "type": "calc",
      "q": "Nordvik AS owns assets worth 300 or 120 in one year, equally likely under the risk-neutral probability, and rf = 5.00%. There are no taxes; default consumes 20% of asset value. The firm proposes one-year debt with face value 150. Value both claims, find the distress cost, and say who bears it.",
      "hint": "Unlevered benchmark: V^U = [0.50(300) + 0.50(120)]/1.05 = 210/1.05 = 200.00.\nSort the states. Good: 300 > 150, paid in full, shareholders keep 150. Bad: 120 < 150, default, so the process burns 0.20 x 120 = 24.00 and creditors collect 96.00.\nValue the claims. D = [0.50(150) + 0.50(96.00)]/1.05 = 123.00/1.05 = 117.1429. E = [0.50(150) + 0.50(0)]/1.05 = 75.00/1.05 = 71.4286. V^L = 188.5714.\nThe distress cost: PV(FD) = [0.50(24.00)]/1.05 = 12.00/1.05 = 11.4286, and V^U - V^L = 200.00 - 188.5714 = 11.4286. The missing value is exactly the deadweight loss.\nWho lost it. Creditors pay 117.1429 for a claim worth 117.1429 and gain 0.00; their protection is the promised yield 150/117.1429 - 1 = 0.280488 = 28.0488%. The owner ends with 117.1429 of cash plus 71.4286 of equity, that is 188.5714 against 200.00 all-equity: a loss of 11.4286.\nCheck 3: 0.00 + (-11.4286) = -11.4286 = the NPV of the financing decision. Check 4 would correctly FAIL here, because value was burned rather than transferred, so total value is not fixed."
    },
    {
      "type": "calc",
      "q": "Sorland ASA is worth V^U = 500 unlevered, with tau_c = 22%, tau_e = 25% and tau_i = 40%. Debt is permanent, and PV(financial distress) is 0 at D = 0, then 2 at 100, 7 at 200, 16 at 300 and 30 at 400. Find tau*, the optimal debt level, and what you would have concluded ignoring personal taxes.",
      "hint": "tau* = 1 - (1 - 0.22)(1 - 0.25)/(1 - 0.40) = 1 - (0.78 x 0.75)/0.60 = 1 - 0.5850/0.6000 = 1 - 0.975000 = 0.025000 = 2.5000%. A striking result: with interest taxed at 40% in the investor's hands against 25% on equity income, almost the whole corporate advantage is eaten away.\nEach extra 100 of debt now buys 0.025 x 100 = 2.50 of shield, while the marginal distress cost is 2, then 5, then 9, then 14. Only the first step is worth taking: 2.50 > 2.00 but 2.50 < 5.00. D* = 100, and V^L = 500 + 2.50 - 2.00 = 500.50.\nIgnoring personal taxes: at tau_c = 22% each 100 buys 22.00, and the levels become 500, 520, 537, 550, 558 - the schedule never catches up within the table, so you would borrow 400 or more.\nThe lesson to write down: tau* REPLACES tau_c, it does not multiply it, and the whole optimum moves. Compute the differences, never eyeball the levels."
    },
    {
      "type": "calc",
      "q": "A firm has V^U = 500 and tau* = 12.00%, with PV(FD) of 0, 2, 7, 16 and 30 at debt levels 0, 100, 200, 300 and 400. Build the trade-off table, find D*, and state the marginal condition in words.",
      "hint": "V^L(D) = 500 + 0.12D - PV(FD):\n  D = 0:   shield 0.00,  FD 0.00,  V^L = 500.00\n  D = 100: shield 12.00, FD 2.00,  V^L = 510.00   marginal shield 12.00, marginal FD 2.00\n  D = 200: shield 24.00, FD 7.00,  V^L = 517.00   marginal shield 12.00, marginal FD 5.00\n  D = 300: shield 36.00, FD 16.00, V^L = 520.00   marginal shield 12.00, marginal FD 9.00\n  D = 400: shield 48.00, FD 30.00, V^L = 518.00   marginal shield 12.00, marginal FD 14.00\nTake every step whose marginal cost is below 12 and stop at the first that is not: 14 > 12, so D* = 300 and V^L = 520.00.\nThe marginal condition in words: borrow while the extra krone of debt buys as much tax shield as it adds in expected deadweight distress cost, i.e. while tau* > delta PV(FD)/delta D. The benefit is linear and the cost convex, which is what makes the optimum interior rather than at a corner.\nConsistency check 3 at the optimum: the debt is fairly priced, so creditors pay 300 for a claim worth 300 and gain 0.00, while shareholders hold 300 of cash plus equity of 520 - 300 = 220, that is 520 against 500, a gain of 20 - and 0.00 + 20.00 = 20.00 = 520 - 500."
    },
    {
      "type": "control",
      "q": "In a default where assets are worth 120 against a face value of 150 and the process consumes 20% of asset value, name every number and say which of them is a distress cost.",
      "solution": "The numbers are: assets 120, face value 150, burn 0.20 x 120 = 24.00, creditor recovery 96.00, shortfall against the promise 150 - 96 = 54.00, and shareholder recovery 0.\n\nOnly the 24.00 is a distress cost. It is the DEADWEIGHT LOSS: value that leaves the firm entirely and is received by nobody inside it - lawyers, advisers, court and trustee fees, plus the indirect costs that arrived before any court was involved.\n\nThe 54.00 shortfall is a TRANSFER, or rather the part of the promise the assets could not cover. Subtracting it as a cost is the error the chapter names, and it double counts massively: fairly priced debt with no bankruptcy costs destroys no value at all, and treating the shortfall as a loss would say otherwise.\n\nThe test is conservation. Consistency check 3 holds - the gains sum to the NPV of the financing decision, here -11.4286 in present value. Consistency check 4 correctly FAILS, because total value is not fixed once something has been burned. Knowing which check should fail is itself a piece of understanding worth stating.\n\nIncidence, in one line: ex post the 24.00 falls on creditors, ex ante entirely on shareholders, because creditors price the expected loss into what they pay for the bond today."
    },
    {
      "type": "explain",
      "q": "Explain the effective tax advantage tau* to someone who already knows the k7 tax shield, and say when it drives the advantage of debt to zero.",
      "solution": "k7's shield is corporate only: interest is deductible from taxable profit, so a levered firm hands the government tau_c x rD x D less each year. But investors are taxed AGAIN on what reaches them, and interest and equity income carry different personal rates.\n\nTrack one krone of pre-tax corporate profit. Through the equity route it is taxed at the corporate level and then in the investor's hands, delivering (1 - tau_c)(1 - tau_e). Through the debt route it escapes corporate tax and is taxed once, delivering (1 - tau_i). The saving from the debt route is what defines tau*:\n\ntau* = 1 - (1 - tau_c)(1 - tau_e)/(1 - tau_i)\n\nWhy an investor's own tax bill changes a corporate decision: investors price claims on what they KEEP, not on what the firm pays. Interest is typically taxed more heavily in their hands than equity income, because capital gains are taxed only on realisation and the holder chooses when to realise. So tau_i > tau_e in most systems and tau* < tau_c.\n\nIt hits zero when (1 - tau_c)(1 - tau_e) = (1 - tau_i), that is when the personal penalty on interest exactly offsets the corporate deduction. With tau_c = 22% and tau_e = 25% that requires tau_i = 1 - 0.78 x 0.75 = 41.5%. Above that the advantage turns negative and debt is tax-DISADVANTAGED.\n\nThe operating rule: tau* replaces tau_c throughout k7 - it does not multiply it - and neither the formula nor the substitution is on the formula sheet."
    },
    {
      "type": "reflect",
      "q": "Distress costs reach only three of the eleven mapped papers and neither Kurbatov paper. Why is this chapter still worth learning properly?",
      "solution": "Because it almost never arrives as a standalone computation. It arrives as the QUALIFICATION a number needs. You compute a tax shield worth 66 and the next sub-question asks why the firm does not double its debt, or you value a levered firm and are asked to comment on the leverage. Those interpretation parts are graded like the verbal exercises, and both Kurbatov papers put 24 of their 100 points into prose.\n\nIt is also load-bearing for two chapters that ARE heavily examined. k9 and k10 are built on the possibility of default, and the deadweight-versus-transfer distinction you learn here is exactly the distinction that separates the agency cost from the transfer in both of them. Get it wrong here and you will report the wrong number there, in an 18-point exercise.\n\nAnd it supplies the answer to the question the tax shield begs. If leverage is free money, why is no firm entirely debt-financed? Without this chapter the honest answer is 'I do not know', which is not a scoring position.\n\nWhat to have ready: the two cost types with their rough magnitudes, the sentence about ex ante versus ex post incidence, the deadweight-versus-transfer test, tau*, and the marginal condition. Five items, each one sentence, and they cover every way this material has been asked."
    }
  ],
  "9": [
    {
      "type": "calc",
      "q": "Vestbre AS has debt of face value K = 120 maturing in a year, rf = 0, and two mutually exclusive projects with equally likely payoffs under the risk-neutral probability: S pays 150 or 130, R pays 220 or 30. Value both claims under each project, say what management does, and compute the agency cost.",
      "hint": "First best: V_S = 0.50(150) + 0.50(130) = 140.00 and V_R = 0.50(220) + 0.50(30) = 125.00. An all-equity firm takes S; switching to R has NPV = 125 - 140 = -15.00.\nSplit the payoffs. Under S the bad state still covers 120, so debt is risk-free: D_S = 120.00 and E_S = 0.50(30) + 0.50(10) = 20.00. Under R the bad state pays creditors only 30: D_R = 0.50(120) + 0.50(30) = 75.00 and E_R = 0.50(100) + 0.50(0) = 50.00.\nWhat management does: it acts for shareholders, and 50.00 > 20.00, so it takes R and destroys 15.00 of firm value. Write RISK SHIFTING, or asset substitution - the keys award the label.\nAgency cost = first-best value minus chosen value = 140.00 - 125.00 = 15.00. Not the 30.00 shareholders gained, and not the 45.00 creditors lost.\nCheck 3: creditors' gain = 75 - 120 = -45.00, shareholders' gain = 50 - 20 = +30.00, and -45 + 30 = -15.00 = the NPV of switching.\nNever forget the zero: equity in R's bad state is max(30 - 120, 0) = 0, not -90. Carry the negative through and you conclude the opposite."
    },
    {
      "type": "calc",
      "q": "Same firm and same two projects. At which face value is management indifferent between S and R? State the interval your algebra is valid on, and tabulate the choice at K = 0, 30, 60, 90 and 120.",
      "hint": "Pick the interval first. For 30 < K <= 130, project S covers its debt in BOTH states while R defaults in the bad state. Inside that piece:\n  E_S(K) = 0.50(150 - K) + 0.50(130 - K) = 140 - K\n  E_R(K) = 0.50(220 - K) + 0.50(0) = 110 - 0.5K\nSolve: 140 - K = 110 - 0.5K, so 30 = 0.5K and K* = 60.00. Both sides equal 140 - 60 = 80.00 and 110 - 30 = 80.00.\nThe table:\n  K = 0:   E_S = 140.00, E_R = 125.00  ->  S\n  K = 30:  E_S = 110.00, E_R =  95.00  ->  S\n  K = 60:  E_S =  80.00, E_R =  80.00  ->  indifferent\n  K = 90:  E_S =  50.00, E_R =  65.00  ->  R\n  K = 120: E_S =  20.00, E_R =  50.00  ->  R\nRead it: below 30 nothing defaults and the gap is a constant 15.00 favouring S. Debt turns risky at 30, but only at K* = 60 does the transfer from creditors finally cover the 15.00 the gamble destroys. Below 60 there is no conflict at all.\nBecause max(., 0) makes both functions piecewise linear, the algebra holds only within one piece - state the interval when you answer."
    },
    {
      "type": "calc",
      "q": "At K = 120 with project R in place, a costless forward would convert R's payoff into a certain 125 in both states. Its NPV is zero. Do shareholders take it? Value both claims before and after and close with the right consistency check.",
      "hint": "Unhedged (project R): boom 220 gives creditors 120 and equity 100; bust 30 gives creditors 30 and equity 0. D = 75.00 and E = 50.00, summing to 125.00.\nHedged: 125 in both states, so creditors are paid 120 in full and equity keeps 5 in both states. D = 120.00 and E = 5.00, summing to 125.00.\nSo hedging drops equity from 50.00 to 5.00. Shareholders REFUSE a zero-NPV project. Removing the risk removes the option value, and the whole 45.00 goes to the creditors.\nCheck 4 is the one that fits: total value is fixed at 125.00, so this is pure transfer. Creditors' gain = 120 - 75 = +45.00 equals shareholders' loss = 50 - 5 = 45.00. Check 3 also holds, weakly: +45 - 45 = 0 = the hedge's NPV.\nWhy it is not neutral: only with RISK-FREE debt is a hedge neutral, because then equity is linear in the cash flow and expectations pass straight through. Once debt is risky the claim is convex, so equity depends on the whole distribution and not on its mean. Shareholders hedge willingly at low leverage and refuse in deep distress; the creditors are the ones who want the hedge. H2024 Exercise 4 asked exactly this."
    },
    {
      "type": "calc",
      "q": "Same firm at K = 120 with project R. Suppose creditors anticipate the gamble at the moment the debt is issued. What do they pay, and what do the owners end up with? Compare with the case where the firm could credibly promise project S.",
      "hint": "If creditors expect R, they pay what R's debt is worth: D_R = 0.50(120) + 0.50(30) = 75.00, not the 120.00 that S's debt would be worth.\nThe owners then hold everything: 75.00 raised in cash plus equity worth E_R = 50.00, that is 125.00.\nHad they been able to promise S credibly, creditors would have paid 120.00 for risk-free debt and the owners would hold 120.00 plus E_S = 20.00, that is 140.00.\nDifference: 140.00 - 125.00 = 15.00, which is exactly the agency cost. The 30.00 transfer that looked like a shareholder victory has vanished, because it was priced in before the money changed hands.\nThe conclusion to write: shareholders bear the agency cost EX ANTE, exactly as they bore k8's distress costs. That is why they voluntarily accept covenants, collateral and convertible debt - those devices are not impositions, they are the owners buying back their own credibility, and anything the borrower promises today is priced today."
    },
    {
      "type": "control",
      "q": "Reproduce the risk-shifting routine from memory: the six steps, and the two numbers you must not confuse.",
      "solution": "1. BUILD THE TABLE. Never argue this verbally. For each project and each state, write the cash flow, then debt = min(CF, K) and equity = max(CF - K, 0). If rf is not zero, divide every figure by (1 + rf) - it changes no comparison, and saying so earns a line.\n\n2. THE FIRST BEST. Compute each project's total value under the risk-neutral probabilities. That is what an all-equity firm would choose.\n\n3. VALUE THE CLAIMS. Split each project's payoff into D and E. They must sum to V in every state; that identity is what makes check 3 work.\n\n4. WHAT MANAGEMENT DOES. Compare the EQUITY values, not the project NPVs. The question is what is chosen, not what is efficient.\n\n5. THE AGENCY COST. First-best value minus chosen value. A deadweight loss.\n\n6. THE CHECK, BY NAME. Creditors' gain plus shareholders' gain equals the NPV of the action (check 3); or, when total value is fixed as in a hedge, creditors' gain equals shareholders' loss (check 4).\n\nThe two numbers not to confuse: the AGENCY COST, which is value destroyed, and the TRANSFER between creditors and shareholders, which is value moved. In the standard example they are 15 and 30/45 respectively, and reporting the transfer as the cost is the single commonest way to lose the marks. Write the words RISK SHIFTING or ASSET SUBSTITUTION somewhere in the answer."
    },
    {
      "type": "explain",
      "q": "Explain why limited liability makes shareholders of a levered firm prefer risk, using the shape of the payoff rather than an example.",
      "solution": "Shareholders are paid last and never less than nothing, so their claim against a face value K is max(CF - K, 0). That function is FLAT while the firm is insolvent and rises one for one above K: it is convex, and it is the payoff diagram of a call option struck at K.\n\nConvexity is the entire mechanism. Take any mean-preserving spread of the cash flow - push the good state up and the bad state down by amounts that leave the mean unchanged. In the good state the shareholder collects every krone of the improvement. In the bad state, once he is below K, he is already at zero and cannot lose anything more. Downside capped, upside not. Formally this is Jensen's inequality: for a convex payoff, E[f(CF)] rises with the spread of CF even when E[CF] does not move.\n\nThe corollary that makes it an agency problem: the value of the firm did not rise. The extra equity value came out of the debt, because debt is the mirror claim min(CF, K), which is concave and therefore falls with spread by exactly the same amount, less any deadweight loss.\n\nName it in the answer: RISK SHIFTING or ASSET SUBSTITUTION. And note where it bites hardest - deep in distress, where equity is nearly worthless and almost any gamble is worth taking, which is precisely when covenants matter most. k24 makes the option interpretation formal: equity is a call on firm value, and option value rises with volatility."
    },
    {
      "type": "reflect",
      "q": "H2024 Exercise 4 and V2024 Problem 1 are this chapter, worth 18 points and more. What is the fixed shape of the question, and where do the marks leak?",
      "solution": "The pattern is fixed: two projects, one levered balance sheet, then sub-questions in a chain. Which project would an all-equity firm take. Which does the levered firm take. What is the gain or loss to each claim. At what debt level is management indifferent. And finally, would shareholders accept a zero-NPV hedge.\n\nBecause it is chained, a slip in the first table propagates through every later part, which is where the largest blocks of points go. Build the table once, carefully, with a row per state and a column per claim, and check that D + E equals the cash flow in every state before you go on.\n\nThe four specific leaks. First, comparing project NPVs instead of equity values - that answers what is efficient, not what is chosen. Second, reporting the transfer as the agency cost. Third, carrying a negative equity value instead of zero, which destroys the convexity and reverses the answer. Fourth, answering the hedge question with 'yes, it has zero NPV' - zero NPV means zero change in FIRM value and says nothing about the split.\n\nThe two habits that collect what is left behind: write the mechanism's name in words, and close with the consistency check BY NAME. Check 3 for the project choice, check 4 for the hedge. Both are on the examiner's own list, and writing them out is the cheapest mark in the exercise."
    }
  ],
  "10": [
    {
      "type": "calc",
      "q": "Fjordhus AS has one year to maturity on debt of face value 120. Next year's cash flow is 60 in the bad state and 180 in the good, each with risk-neutral probability 0.5, and rf = 4.00%. A project costing 25 today, funded by the owners, adds a safe 40 in both states. Value both claims with and without the project, and say what the owners do.",
      "hint": "Without the project. Debt = min(CF, 120): 60 and 120, expected 90.00, so D0 = 90/1.04 = 86.5385. Equity = max(CF - 120, 0): 0 and 60, expected 30.00, so E0 = 30/1.04 = 28.8462. V0 = 115.3846.\nThe NPV: 40/1.04 - 25 = 38.4615 - 25 = 13.4615, comfortably positive.\nWith the project. Cash flows 100 and 220. Debt: 100 and 120, expected 110.00, so D1 = 105.7692. Equity: 0 and 100, expected 50.00, so E1 = 48.0769.\nWho gained. Creditors: 105.7692 - 86.5385 = +19.2308. Shareholders: 48.0769 - 28.8462 - 25 = -5.7692, so they REJECT. This is DEBT OVERHANG - write the words.\nCheck 3: 19.2308 + (-5.7692) = 13.4615 = NPV.\nWhere it went: the bad-state increment is worth 0.5(40)/1.04 = 19.2308, and every krone of it went to the lenders because the shareholders are wiped out in that state anyway - while the owners paid all 25 of the outlay.\nNote what the agency cost is: the NPV of 13.4615 that never happens, NOT the 5.7692, which is a transfer that never occurs because the investment is never made."
    },
    {
      "type": "calc",
      "q": "Same firm. The creditors offer to cut the face value to K1 if the owners inject the 25. Find the range of face values both sides accept, pick one inside it, and verify the deal with consistency check 3.",
      "hint": "The creditors' floor. They need D(K1) >= 86.5385, so the expected payoff must reach 1.04 x 86.5385 = 90.00. With the project the bad state pays 100, so for K1 <= 100 the debt is safe and pays K1 in both states: K1 >= 90.\nThe shareholders' ceiling. They need E(K1) - 25 >= 28.8462, so the expected equity payoff must reach 1.04(28.8462 + 25) = 56.00. For K1 >= 100 the bad state still defaults, so equity pays 0 and 220 - K1, expected 110 - 0.5K1 >= 56, giving K1 <= 108.\nRange: 90 <= K1 <= 108. (Between 90 and 100 the shareholder constraint is 160 - K1 >= 56, i.e. K1 <= 104, which is slack.)\nTake K1 = 100. Debt pays 100 in both states, so D = 100/1.04 = 96.1538 and creditors gain 96.1538 - 86.5385 = +9.6154. Equity pays 0 and 120, so E = 60/1.04 = 57.6923 and shareholders gain 57.6923 - 28.8462 - 25 = +3.8462. Both positive: the project proceeds and the overhang is resolved.\nCheck 3: 9.6154 + 3.8462 = 13.4615 = NPV. At the endpoints one side takes everything - K1 = 90 gives the owners all 13.4615, K1 = 108 gives it to the creditors.\nWhat the check catches: forgetting to subtract I, and writing K1 rather than the actual cash flow in the default state. What it cannot catch: a wrong rho or rf, which scale both claims alike."
    },
    {
      "type": "calc",
      "q": "Take the same firm but suppose the existing debt has face value 50 rather than 120, everything else unchanged. Do the owners now fund the project? Explain what changed, and at roughly what face value the overhang begins.",
      "hint": "Without the project, cash flows 60 and 180 against K = 50: the debt is paid in full in BOTH states, so D0 = 50/1.04 = 48.0769 and E0 = [0.5(10) + 0.5(130)]/1.04 = 70/1.04 = 67.3077.\nWith the project, cash flows 100 and 220: the debt is still safe, D1 = 48.0769, unchanged.\nShareholders: E1 = [0.5(50) + 0.5(170)]/1.04 = 110/1.04 = 105.7692, so their gain is 105.7692 - 67.3077 - 25 = +13.4615 - exactly the whole NPV. They invest.\nWhat changed: delta D = 0. When the debt is risk-free the project's cash cannot land on the creditors, so shareholders capture all of it, and delta(shareholders' wealth) = NPV - delta D collapses to NPV.\nWhere the overhang begins: it needs the debt to be risky, i.e. the face value to exceed the bad-state cash flow of 60 without the project. Above 60 part of the project's bad-state increment starts accruing to the lenders, and the shareholders' share of the NPV starts falling; by K = 120 it has gone negative.\nThe general lesson: overhang is a problem of RISKY debt, and it is why lenders to highly levered firms accept covenants that permit senior new financing, and why a firm expecting to invest keeps debt capacity in reserve."
    },
    {
      "type": "control",
      "q": "State the debt-overhang condition in symbols, say what each term means, and explain why the agency cost is not the shareholders' loss.",
      "solution": "delta(shareholders' wealth) = NPV - delta D, where delta D is the increase in the MARKET value of the debt already outstanding. Shareholders invest only when NPV > delta D. Debt overhang is the case delta D > NPV > 0: the project creates value and the owners who would fund it lose.\n\nWhy the creditor captures value he did not pay for: in default states creditors take the whole cash flow, so every extra krone produced there goes to them krone for krone, while shareholders - wiped out anyway - see none of it. The outlay today is paid in full by the owners. If enough of the project's cash arrives in those states, they are funding a transfer to the lenders.\n\nWhy the agency cost is not the shareholders' loss: the loss is a transfer that NEVER HAPPENS, because the project is never taken. If the investment is not made there is no 19.2308 gain to creditors and no 5.7692 loss to shareholders; there is simply no project. Measure the agency cost the same way as in k9 - first-best value minus value under the chosen action - which here is the forgone NPV itself.\n\nOne consequence worth stating: consistency check 4 does NOT apply to overhang, because total value is not fixed. It is destroyed, not moved. Knowing which check should fail is part of the answer."
    },
    {
      "type": "explain",
      "q": "Explain how covenants, seniority and convertible debt each attack the agency costs of debt, and name the cost of each remedy.",
      "solution": "COVENANTS restrict the borrower: caps on further debt, on dividends and repurchases, on asset sales, minimum coverage ratios. They bind precisely where the owners' incentives are worst. Why they raise FIRM value rather than just the lender's recovery: anything the borrower promises today is priced today, so the debt is worth more at issue and the same money is raised against a smaller promised repayment - the owners get back the deadweight loss that no longer occurs. The cost is lost flexibility: a covenant binding where the forbidden action was efficient destroys value itself.\n\nSENIORITY attacks overhang head on. Fund the project with debt senior to the old claim, or secured on the new asset, and the new lender takes the bad-state cash flow first, so the old creditor collects no windfall and the owners invest. The cost falls on the incumbent lender, which is exactly why incumbents forbid it by covenant - and why the two remedies are in tension.\n\nCONVERTIBLE DEBT blunts both costs at once. The lender can swap the bond for shares, so he shares the upside and risk shifting no longer pays the owners; and because he expects to participate in success he is readier to fund, which softens overhang. That combination makes it the standard instrument for young, volatile firms. The cost is dilution of the existing equity if conversion happens, and a more complex claim to price - k24 values it as debt plus a call on the equity.\n\nThe unifying sentence: all three work by making a promise credible today, and all three are accepted voluntarily by shareholders, because the price of the bond is where the benefit comes back."
    },
    {
      "type": "reflect",
      "q": "Overhang and renegotiation appear in five of the eleven mapped papers but in neither Kurbatov paper. How should that shape your preparation?",
      "solution": "Treat it as high-probability, not certain, and prepare it as a ROUTINE rather than as a topic. The listed sittings - 2017V Problem 3, 2017H Problems 1 and 4, 2021 Problem 2 - run the same three moves every time: value both claims with and without the project, show that the shareholders' change is negative, then solve for the face value that flips its sign. If those three moves are automatic, the exercise takes fifteen minutes whatever numbers it uses.\n\nThe reason not to drop it is that its neighbour IS in a Kurbatov paper: H2024 Exercise 4 was risk shifting, and the two share a table, a valuation method and a closing consistency check. Practising one prepares most of the other, so the marginal cost of covering overhang is small.\n\nWhat to have ready cold: the split D1 = min(V1, K) and E1 = max(V1 - K, 0); the condition delta(wealth) = NPV - delta D; the two renegotiation constraints; and the fact that the total gain must equal the NPV, which is the check that closes the answer at any K1 in the range.\n\nAnd write the words DEBT OVERHANG. Both the k0 list and the solution keys reward naming the mechanism, and it costs three seconds."
    }
  ],
  "11": [
    {
      "type": "calc",
      "q": "Vestland Marine is all-equity, generates a free cash flow of 80 a year in perpetuity with rU = 8.00%, and holds 200 of excess cash. The CEO intends to spend the 200 on a terminal returning 14 a year in perpetuity. tau_c = 25%. The alternative is to borrow 400 of PERMANENT debt and pay out both the proceeds and the cash; at that leverage PV(distress costs) = 30. Value both courses and decompose the difference.",
      "hint": "Step 1 - the firm as it stands. V^U = 80/0.080000 = 1000.00, plus 200 of cash.\nStep 2 - the CEO's project. PV = 14/0.080000 = 175.00, so NPV = 175 - 200 = -25.00, and the market prices that in today.\nStep 3 - wealth if the cash stays inside. 1000 + 175 = 1175.00.\nStep 4 - value the recapitalisation. Permanent fixed debt means the shield is discounted at rD, so PV(TS) = tau_c x D = 0.25 x 400 = 100.00.\n  V^U, operations        1000.00\n  + PV(TS)                100.00\n  - PV(distress costs)    -30.00\n  = V^L                  1070.00, of which debt 400.00 and equity 670.00\n  + paid out              600.00 (the 400 of proceeds plus the 200 of cash)\n  = shareholder wealth   1270.00\nStep 5 - the gain, decomposed. 1270 - 1175 = +95.00, which splits into the three named terms: agency benefit +25.00, tax shield +100.00, distress -30.00, and 25 + 100 - 30 = 95.00.\nStep 6 - the check that can actually fail. D + E = 400 + 670 = 1070 cannot fail, since E was computed as V^L - D. The DECOMPOSITION can: if the three terms do not rebuild the 95 you have double counted or dropped a friction. New creditors gain nothing, paying 400 for a claim worth 400, so by check 3 the shareholders take the whole 95.\nStep 7 - how far it stretches. The recapitalisation stops paying once distress costs reach 25 + 100 = 125.00. Quoting that break-even separates an answer that understood the trade-off from one that memorised it."
    },
    {
      "type": "calc",
      "q": "Same firm, but now suppose the CEO's project returns 17 a year in perpetuity instead of 14, and PV(distress costs) at 400 of debt is 55. Redo the comparison and say what has changed qualitatively.",
      "hint": "The CEO's project: PV = 17/0.080000 = 212.50, so NPV = 212.50 - 200 = +12.50. It is no longer value-destroying, so there is no waste for the debt to discipline.\nCash stays inside: 1000 + 212.50 = 1212.50.\nRecapitalise: V^L = 1000 + 100.00 - 55.00 = 1045.00, of which 400 debt and 645.00 equity, plus 600 paid out = 1245.00.\nGain = 1245.00 - 1212.50 = +32.50. Decompose: agency benefit is now NEGATIVE, -12.50, because paying out the cash forces the firm to skip a project worth +12.50; tax shield +100.00; distress -55.00. Sum: -12.50 + 100.00 - 55.00 = +32.50.\nWhat changed qualitatively: the discipline term flipped sign. Debt is only a benefit when the cash would otherwise be WASTED; when the firm has good projects, forcing the cash out is a cost, and the recapitalisation now survives only on its tax shield.\nThat is exactly the cross-section the chapter predicts: a firm with many good projects should be lightly levered because flexibility is worth more than discipline, while a mature firm with idle cash and nowhere to put it is the empire-building setup that leverage cures."
    },
    {
      "type": "control",
      "q": "Write the complete organising identity of the course, name the chapter behind each term, and give the marginal condition at the optimum.",
      "solution": "V^L = V^U + PV(TS) - PV(distress costs) - PV(agency costs of debt) + PV(agency benefits of debt)\n\nV^U - the perfect-market benchmark of k6: value is independent of capital structure, because leverage divides the cash flow rather than enlarging it.\n+ PV(TS) - k7: interest is deductible, so the government's slice shrinks. The rate that discounts it depends on the debt policy.\n- PV(distress costs) - k8: the deadweight loss of the bankruptcy process, direct and indirect, priced in today by creditors and therefore borne ex ante by shareholders.\n- PV(agency costs of debt) - k9 and k10: risk shifting and debt overhang, the value destroyed because decisions maximise equity rather than the firm.\n+ PV(agency benefits of debt) - k11: free cash flow discipline. A debt contract commits where a promise does not, because a missed interest payment hands control to creditors.\n\nAt the optimum: marginal PV(TS) = marginal distress + marginal agency cost - marginal agency benefit. The last krone of debt should add as much tax shield as it costs in expected deadweight loss net of discipline.\n\nIt is a TARGET, and firms sit near it rather than on it, because adjusting leverage is costly. None of this is on the formula sheet."
    },
    {
      "type": "explain",
      "q": "Firm A is a mature shipping company with stable cash flows, a fleet other operators would buy, no attractive expansion and a large cash balance. Firm B is a biotechnology firm with no revenue, volatile prospects and a value made almost entirely of growth options. Both are all-equity. Which should carry more debt?",
      "solution": "Move 1 - state the frame, one sentence. Capital structure matters only through the terms of V^L = V^U + PV(TS) - distress - agency costs of debt + agency benefits, so the question is which terms are large for each firm.\n\nMove 2 - sign every term for A. Tax shield large: stable taxable profits use the deduction every year. Distress small: steady cash flows, and tangible assets mean a default transfers ships rather than destroying a business. Agency cost of debt small: with no growth options there is little scope for overhang or risk shifting. Agency benefit large: idle cash and no good projects is the empire-building setup, and debt service removes the cash. Every term points one way, so A should be highly levered.\n\nMove 3 - sign every term for B. Tax shield near zero: no taxable income, so the deduction shields nothing. Distress large: the value is intangible growth options that evaporate if the researchers leave. Agency cost of debt large: overhang would block exactly the risky positive-NPV research the firm exists to do. Agency benefit small: B has no free cash flow to waste and needs to raise money, not disburse it. Every term points the other way, so B should be all-equity.\n\nMove 4 - close with a prediction and one caveat. The prediction is a wide leverage gap driven by asset tangibility and growth options. The caveat is information: under the pecking order B still prefers internal funds to an equity issue, which is why such firms use staged financing from informed investors and convertible debt.\n\nFour moves, about five sentences per firm, and every move ends in a direction rather than a description. That is what fits the stated sentence budgets on these questions."
    },
    {
      "type": "reflect",
      "q": "Both Kurbatov papers put 24 of their 100 points into pure prose. What does that change about how you prepare and how you write?",
      "solution": "It changes the unit of preparation from a formula to a SENTENCE. Twenty-four points with no arithmetic means the examiner is grading whether you can name a mechanism, sign it for a specific firm and reach a conclusion - and those are three separate skills from computing a WACC.\n\nWhat to prepare: for each of the five terms in the identity, one sentence saying what the friction is, one saying which firms it is large for, and one saying which direction it pushes leverage. Fifteen sentences cover the whole of Part I and they are the raw material for any capital-structure discussion.\n\nHow to write. Respect the stated budget - H2025 asked for two to three sentences per action and states that four to six sentences is usually enough - because writing past it wastes minutes you need elsewhere and earns nothing. Open with the frame in one sentence. Sign the terms for THIS firm, not in general. Say which term dominates. Conclude in the direction the question asked. Add one caveat, since the keys credit a well-argued unusual point and H2025 explicitly rewarded creativity.\n\nThe failure mode to avoid: a paragraph per theory and then a full stop. That is a summary, not an answer, and it is the commonest way to score half marks on a question you knew everything about. Name the mechanism, sign it, net it."
    }
  ],
  "12": [
    {
      "type": "calc",
      "q": "Fjellstrand ASA has assets in place worth 300 if the drilling programme succeeded and 150 if it did not; only management knows which, and the market puts q = 0.50 on the good outcome. A project requires I = 80 raised by issuing shares today, and its NPV of 20 is public. Without the issue the project is lost. Does Fjellstrand issue?",
      "hint": "Step 1 - start from the pooling belief. Always test the naive belief first: if investors expect both types to issue, seeing an issue teaches them nothing, so E[V | issue] = 0.50(300) + 0.50(150) = 225.00.\nStep 2 - price the issue. Post-issue value under that belief = 225 + 80 + 20 = 325.00, so alpha = 80/325 = 0.246154. The cash raised is in the denominator.\nStep 3 - payoffs, both types, dilution form and direct form.\n  High, V = 300: dilution = 0.246154(300 - 225) = 18.4615. Payoff = 300 + 20 - 18.4615 = 301.5385, against 300.00 by walking away. Direct: (1 - 0.246154)(400) = 301.5385. It ISSUES.\n  Low, V = 150: dilution = 0.246154(150 - 225) = -18.4615, i.e. a gain. Payoff = 150 + 20 + 18.4615 = 188.4615, against 150.00. Direct: (0.753846)(250) = 188.4615. It ISSUES.\nStep 4 - consistency check 5. Both types issue, which is exactly what the pooling belief assumed, so E[V | issue] = 225 is confirmed by the behaviour it priced. Rational POOLING equilibrium.\nStep 5 - read the economics. Nothing real is lost: both firms invest. The good firm's old shareholders hand 18.4615 to the new investors and the bad firm's receive the same amount through them, and the new investors break even. A transfer in the sense of check 4, not a deadweight loss.\nCheck: the new investors pay 80 for a stake worth 0.246154(400) = 98.4615 if high and 0.246154(250) = 61.5385 if low, expected 0.50(98.4615) + 0.50(61.5385) = 80.0000."
    },
    {
      "type": "calc",
      "q": "Same firm and same inputs, except that the project's NPV is only 10. Find the equilibrium, and say how much value the information problem destroys.",
      "hint": "Step 1 - test pooling. E[V | issue] = 225.00, post-issue value = 225 + 80 + 10 = 315.00, so alpha = 80/315 = 0.253968.\nStep 2 - the high type. Dilution = 0.253968(300 - 225) = 19.0476, which EXCEEDS the NPV of 10, so its payoff would be 300 + 10 - 19.0476 = 290.9524 against 300.00. It refuses.\nStep 3 - consistency check 5 kills the candidate. The belief that produced alpha = 0.2540 was 'both types issue', and the high type will not. A belief contradicted by the behaviour it predicts cannot be an equilibrium.\nStep 4 - reprice under the belief that survives: only the low type issues, so E[V | issue] = 150.00 and E[V | no issue] = 300.00. alpha = 80/(150 + 80 + 10) = 80/240 = 0.333333.\nStep 5 - verify both directions. The low type keeps (2/3)(240) = 160.00 against 150.00, so it still issues. The high type would receive (2/3)(390) = 260.00 against 300.00, so it stays out. Both act as the belief assumes: a rational SEPARATING equilibrium.\nShortcut check: when the issuer's type is revealed the dilution is zero, so the payoff must be exactly V_L + NPV = 150 + 10 = 160.00.\nValue destroyed: the high type abandons a project worth 10, so the expected loss is 0.50 x 10 = 5.00. It is not transferred to anyone; it simply never happens - underinvestment through adverse selection, the same shape as debt overhang in k10.\nPrices must average back: 0.50(300) + 0.50(160) = 230.00 = the prior 225 plus the expected NPV actually captured, 0.50(10) = 5.00."
    },
    {
      "type": "calc",
      "q": "With V_H = 300, V_L = 150 and I = 80, find the prior q at which the outcome flips between pooling and separating when the project's NPV is 10, and verify the threshold.",
      "hint": "Write E[V] = 150 + 150q and set the high type's dilution equal to its NPV, using the compact rule NPV = alpha(V_H - E[V]) = I(V_H - E[V])/(E[V] + I + NPV):\n  80(300 - 150 - 150q) = 10(150 + 150q + 80 + 10)\n  80(150 - 150q) = 10(240 + 150q)\n  12000 - 12000q = 2400 + 1500q\n  13500q = 9600, so q* = 9600/13500 = 0.711111 (32/45 exactly).\nVerify by substitution, which is the check to run on any threshold you derive. At q*: E[V] = 150 + 150(0.711111) = 256.666667, so alpha = 80/(256.666667 + 80 + 10) = 80/346.666667 = 0.230769, and the dilution is 0.230769(300 - 256.666667) = 0.230769 x 43.333333 = 10.0000, exactly the NPV.\nRead it: ABOVE q* the market is confident enough that the pooled price is close to the truth, the dilution is small, and everyone issues. BELOW q* the market is too pessimistic for the good firm to sell shares, and the outcome separates. The exercise with q = 0.50 sits on the separating side of 0.7111, which is why the answer there was separation."
    },
    {
      "type": "calc",
      "q": "Fjellstrand once more, with q = 0.50, V_H = 300, V_L = 150 and I = 80, but a much better project with NPV = 40. Show that the outcome pools, and find the NPV at which it flips.",
      "hint": "Pooled belief and price: E[V | issue] = 225.00, but the post-issue value is now 225 + 80 + 40 = 345.00, so alpha = 80/345 = 0.231884. Note that the better project has LOWERED alpha: the firm sells a smaller slice for the same 80, because the firm it is selling a slice of is worth more.\nHigh type: dilution = 0.231884(75) = 17.3913, comfortably under 40. Payoff = 300 + 40 - 17.3913 = 322.6087 against 300.00. Direct form: (0.768116)(420) = 322.6087. It issues.\nLow type: gain = 17.3913, payoff = 150 + 40 + 17.3913 = 207.3913 against 150.00. Direct form: (0.768116)(270) = 207.3913. It issues.\nCheck 5: both types issue, matching the belief that priced the shares, so a rational pooling equilibrium. No NPV is lost.\nThe NPV that flips it. With q = 0.50 the high type is indifferent when NPV = n solves n(225 + 80 + n) = 80(300 - 225) = 6000, that is n^2 + 305n - 6000 = 0. The positive root is n = (-305 + sqrt(93025 + 24000))/2 = (-305 + sqrt(117025))/2 = (-305 + 342.0890)/2 = 18.5445.\nBelow 18.5445 the outcome separates, above it pools. So an NPV of 10 separates and an NPV of 20 pools - identical asymmetric information, opposite answers, because the project differs. That is why 'we are undervalued, so an issue is a bad idea' is only half an answer."
    },
    {
      "type": "control",
      "q": "Write the Myers-Majluf template from memory: the five inputs, the sequence of events, the two formulas, and the four answer steps.",
      "solution": "THE FIVE INPUTS. V, the value of assets in place, high or low - known to the MANAGER ONLY. q, the market's probability on the high type - public. I, the cash to be raised - public. NPV, the project's value over and above I - public. alpha, the fraction of the post-issue firm sold - set by the market. Note which is private: the PROJECT is transparent, the FIRM is not, and that is what makes the problem bite.\n\nTHE SEQUENCE. Nature draws the type; the manager sees it, the market does not. The manager either issues equity worth I and takes the project, or does neither. Investors observe the ACTION, form a belief about V, and price the new shares to break even in expectation. The truth comes out and payoffs are realised.\n\nTWO ASSUMPTIONS TO NAME. The manager acts for the EXISTING shareholders, not for the whole firm. And the project DISAPPEARS if it is not funded now - no cash, no bank loan, no waiting. Relax either and the problem softens, which is what k13 and k14 are about.\n\nTHE TWO FORMULAS. alpha = I/(E[V | beliefs] + I + NPV). Payoff to old shareholders = (1 - alpha)(V + I + NPV) = V + NPV - alpha(V - E[V | beliefs]), so issue if and only if NPV > alpha(V - E[V | beliefs]).\n\nTHE FOUR ANSWER STEPS. 1. State the belief you are pricing at, and why. 2. Compute alpha from that belief, four decimals, cash raised in the denominator. 3. Payoff for EACH type against the value of not issuing. 4. Check the belief, name the outcome, reprice if it fails.\n\nNone of it is on the formula sheet."
    },
    {
      "type": "explain",
      "q": "Why can a manager not simply announce that the firm is the high type, and what does that tell you about which corporate actions carry information?",
      "solution": "Because the announcement costs nothing to make. A low-type manager gains from being taken for a high type, so he says exactly the same words; investors who know this learn nothing from either announcement, and the statement conveys no information at all. Cheap talk is not a signal.\n\nTalk moves prices only when it is expensive in a way that DIFFERS BY TYPE. That is the single-crossing condition: the cost to the low type of imitating must exceed the gain from being taken for the high type, which must in turn exceed the cost to the high type. If both inequalities hold, only the high type acts and the market reads it correctly. If the middle term dominates both, everybody acts and it conveys nothing.\n\nSo the credible responses are all ACTIONS WITH A COST. Taking on debt you must service, where a missed payment hands control to creditors. Buying back stock with real cash, which is expensive if the stock is dear. Raising a dividend you will be punished for cutting. And refusing to issue equity at all - walking away from a positive-NPV project is only worth doing if the firm really is undervalued, which is precisely the separating outcome of this chapter.\n\nWrite that sentence in a verbal answer and you have named the mechanism. It also explains why underwriters, auditors and analysts are worth their fees: they are repeat players whose reputation is a hostage, so their certification is expensive in a way the firm's own words are not."
    },
    {
      "type": "reflect",
      "q": "Five listed sittings run this template almost unchanged, yet neither Kurbatov paper used it. How should you prepare it, and which step do the keys say candidates skip?",
      "solution": "Prepare it as a RECOGNITION problem. 2016 Problem 1, 2017V Problem 1, 2020 Problem 2, 2022 Problem 2 and 2023 Problem 4 are the same exercise with different numbers, so the goal is that the four steps run automatically the moment you see 'assets are worth V_H or V_L, only management knows which'. It is the largest single block of examinable material that has not yet appeared in the new format, and eight of eleven mapped papers used it, so it is not a certainty but it is a strong bet.\n\nThe step the keys single out is STEP 4: checking whether investors' beliefs are rational. Computing alpha and stopping there is described as the standard incomplete answer, which is exactly why it is consistency check 5 in the k0 list. Check it in both directions - a pooling belief needs BOTH types to issue at the pooled price, and a separating belief needs the low type to issue at the harsher price AND the high type to prefer abstaining at it.\n\nThree slips that cost more than they should. Comparing the issue payoff with V + NPV rather than with V, when the project is lost if the issue does not happen. Applying the market's expected value where the manager's true V belongs - alpha is priced off beliefs, the payoff off the truth, and the two are different on purpose. And asserting a separating equilibrium without verifying that the low type still wants to issue.\n\nPrecision: H2025's four-decimal rule applies here too, so write 0.3333, not 'about a third', and keep the exact fraction in the margin if you have to carry it forward."
    }
  ],
  "13": [
    {
      "type": "calc",
      "q": "Havbruk AS must raise I = 120 today; investors are risk neutral and rf = 0, with each state next year carrying risk-neutral probability 0.50. Management knows the type, the market puts q = 0.50 on each. Next year's firm value, project included: high type 500 or 260, low type 340 or 80. Compare raising the 120 by equity with raising it by debt.",
      "hint": "Expected values: high 0.50(500) + 0.50(260) = 380.00, low 0.50(340) + 0.50(80) = 210.00, pooled 295.00. Setting rf to zero strips out discounting so that only the information effect is left; nothing below depends on it.\nROUTE A, EQUITY. Investors who cannot tell the types apart value the firm at 295.00, so selling a fraction alpha for 120 requires alpha = 120/295 = 0.406780.\n  High type: old shareholders keep (1 - alpha)(380) = 0.593220 x 380 = 225.4237, against the full-information benchmark of 380 - 120 = 260.00. Transfer OUT = 34.5763.\n  Low type: they keep 0.593220 x 210 = 124.5763, against a benchmark of 210 - 120 = 90.00. Transfer IN = 34.5763.\n  Cross-check two ways. The stake sold is worth alpha x 380 = 154.5763 to the high type and alpha x 210 = 85.4237 to the low type, both handed over for 120.00 of cash. And the k12 dilution formula gives alpha(V - E[V | beliefs]) = 0.406780(380 - 295) = 34.5763.\nROUTE B, DEBT. Find the face value K that raises 120. Try K between 80 and 260: the high type then pays K in both states, so its debt is riskless and worth K; the low type pays K in the up state and hands over 80 in the down state, so its debt is worth 0.5K + 40. Investors pay the average:\n  0.50(K) + 0.50(0.5K + 40) = 0.75K + 20 = 120, so K = 133.3333, which is indeed inside the interval.\n  The high type's debt is truly worth 133.3333 and it received 120.00, so it transfers 13.3333. The low type's is worth 0.5(133.3333) + 40 = 106.6667 and it received 120.00, so it gains 13.3333.\nTHE ANSWER. The good firm loses 34.5763 by issuing equity and 13.3333 by issuing debt, so it prefers DEBT, by 21.2430. The bad firm would rather issue equity, since it gains more from it, but it cannot say so without revealing itself, so in equilibrium it mimics and issues debt too.\nCheck A - the transfer is half the spread. With q = 0.50 the pooled price is the midpoint of the two true values, so the transfer must be half the gap between them. Debt: (133.3333 - 106.6667)/2 = 13.3333. Equity: (154.5763 - 85.4237)/2 = 34.5763. The gap IS the information sensitivity of the security, and the whole pecking order is the observation that 26.6667 is smaller than 69.1526.\nCheck B - conservation. Investors break even on average: 0.50(-13.3333) + 0.50(+13.3333) = 0 for debt and the same for equity. Nothing is created here, so what the good firm loses the bad firm gains - consistency check 4.\nHow far down the ladder is free: the lowest payoff either type can produce is 80, so any face value up to 80 is repaid with certainty by both, both claims are worth exactly the same, and the transfer is zero. The information cost of this firm's financing is zero for the first 80, 13.3333 at 120 with debt, and 34.5763 at 120 with equity.\nWhat it means for investment: in k12 the good firm invests only when the NPV exceeds the transfer, so the hurdle is 13.3333 with debt against 34.5763 with equity. Switching to debt does not only save the old shareholders money, it also rescues every project whose NPV lies between the two. Debt causes less underinvestment, which is the pecking order's real claim."
    },
    {
      "type": "calc",
      "q": "Nordvik ASA's assets in place are worth 600, 500 or 400, each equally likely as far as the market is concerned, and management knows which. A project needs I = 150 raised by a share issue and has a publicly known NPV of 20. Find the equilibrium, the announcement return, and decompose it.",
      "hint": "Step 1 - test pooling. If all three types issue, E[V | issue] = 500.00 and alpha = 150/(500 + 150 + 20) = 150/670 = 0.223881. The top type's dilution is 0.223881(600 - 500) = 22.3881, which exceeds the NPV of 20, so it will not issue. Pooling fails consistency check 5.\nStep 2 - the belief that survives. Take out the top type: E[V | issue] = (500 + 400)/2 = 450.00 and E[V | no issue] = 600.00. Then alpha = 150/(450 + 150 + 20) = 150/620 = 0.241935.\nStep 3 - check every type against that price.\n  600: dilution +36.2903, payoff 583.7097 against 600.00 -> abstains, as assumed\n  500: dilution +12.0968, payoff 507.9032 against 500.00 -> issues, as assumed\n  400: dilution -12.0968, payoff 432.0968 against 400.00 -> issues, as assumed\nAll three behave as the belief assumed, so this partial pooling IS an equilibrium: the best firm stays out, the other two are lumped together.\nStep 4 - the prices. After an issue the market cannot tell 500 from 400, so it prices both at E[V | issue] + NPV = 470.00. After no issue it prices the firm at 600.00. Before the announcement it holds neither belief: P0 = (1/3)(600) + (2/3)(470) = 200.00 + 313.3333 = 513.3333.\nStep 5 - the announcement return. (470 - 513.3333)/513.3333 = -43.3333/513.3333 = -0.084416 = -8.4416%.\nDecompose it and the two forces separate: the market revises the assets in place from 500 down to 450, worth -50.00, and it learns the project will definitely be taken, replacing the expected NPV of (2/3)(20) = 13.3333 with the full 20.00, worth +6.6667. -50.00 + 6.6667 = -43.3333.\nStep 6 - what the drop is NOT. The issuing firm of type 500 loses 12.0968 in dilution, which is 2.3565% of the pre-announcement price, while the price fell 8.4416%. The gap is not a cost to anybody: it is the market discovering something that was already true. 'The issue destroyed 43.33 of value' is the standard error.\nCheck: prices must average back. (1/3)(600) + (2/3)(470) = 513.3333 = the prior 500 plus the expected NPV actually captured, (2/3)(20) = 13.3333."
    },
    {
      "type": "calc",
      "q": "Bergen Industrier is two businesses. Division A is a technology unit management values at 500 while the market, unable to see inside it, values it at 420. Division B is a property portfolio worth 300, and everyone agrees on that figure. A project needs I = 150 and has a publicly known NPV of 40. Compare funding it with a share issue against funding it by selling division B.",
      "hint": "ROUTE A, the share issue. The market values the assets in place at 420 + 300 = 720.00, so the post-issue firm is worth 720 + 150 + 40 = 910.00 in its eyes and alpha = 150/910 = 0.164835.\nWhat the old shareholders keep: the firm is truly worth 500 + 300 + 150 + 40 = 990.00, so they hold (1 - 0.164835)(990) = 0.835165 x 990 = 826.8132.\nThe benchmark: with no information problem they would hold 500 + 300 + 40 = 840.00. The issue therefore costs them 840.0000 - 826.8132 = 13.1868, and the dilution formula agrees: alpha(800 - 720) = 0.164835 x 80 = 13.1868.\nROUTE B, sell division B. It fetches its full value of 300.00, because nobody is uninformed about it. The old shareholders now hold division A at its true 500.00, plus 300.00 of cash of which 150.00 goes into the project, plus the project's NPV of 40.00: 500 + 300 + 40 = 840.00, with 150.00 of cash left over. The transfer is ZERO.\nThe comparison: selling the transparent asset beats issuing opaque equity by 840.0000 - 826.8132 = 13.1868, precisely the transfer avoided.\nThe rule generalises: FUND FROM THE ASSET THE MARKET VALUES CORRECTLY, AND KEEP THE ONE IT CANNOT SEE.\nThe signal in the choice: investors observing a management that sells property rather than shares infer that its shares are underpriced, which is why divestiture and carve-out announcements typically meet a positive price reaction while equity issues meet a negative one. Both reactions come out of the same model."
    },
    {
      "type": "control",
      "q": "State the pecking order, the general cost that produces it, and the four things it does NOT contain.",
      "solution": "THE ORDER: 1. Retained earnings. 2. Debt, safest first. 3. Hybrids and convertibles. 4. Equity, last.\n\nTHE COST THAT PRODUCES IT: write S(V) for the payoff of the security you are selling when the firm turns out to be worth V. Competitive investors pay E[S(V) | beliefs]; the existing owners give up S(V_true). The adverse-selection cost is S(V_true) - E[S(V) | beliefs], and the ranking is a ranking of how badly that can bite.\n\nWHY EACH RUNG SITS WHERE IT DOES. Internal cash sells no outside claim, so the cost is zero. Riskless debt promises a fixed amount the firm pays whichever type it is, so the buyer's ignorance is irrelevant - it does not bear on the payoff. Risky debt is fixed except in default, so the two types differ only over the range where the firm cannot pay, a slice of the outcomes. Equity is the residual: every krone of hidden value belongs to it. It is a ladder of exposure to the manager's private information, nothing more.\n\nFOUR THINGS IT DOES NOT CONTAIN. No target leverage ratio. No optimum. No trade-off balanced at the margin. And no prohibition on equity - it RANKS, it does not forbid; a firm with no cash, no debt capacity and a large positive-NPV project issues equity and should.\n\nObserved leverage is a RESIDUE: the accumulation of past deficits funded from the top of the ladder down. That is why the theory predicts the profitability regularity without any optimisation at all."
    },
    {
      "type": "explain",
      "q": "A classmate writes: 'The pecking order works because markets are inefficient - managers know the shares are mispriced.' Correct him, and say where inefficiency genuinely could enter.",
      "solution": "He has inverted the model. Every price in k12 and in the debt-versus-equity comparison is FAIR GIVEN THE INFORMATION INVESTORS HAVE. Investors are rational; they anticipate that a firm issuing equity is more likely to be the low type, and they price that in before the shares are sold. Nothing in the theory requires prices to be wrong - only that the two sides know different things.\n\nThe sentence to write on a script: 'the pecking order rests on ASYMMETRIC INFORMATION, not on market inefficiency; prices are efficient with respect to the market's information set, and the cost arises because the manager's set is larger.'\n\nWhere inefficiency could genuinely enter is MARKET TIMING, and there are two versions of it. The INFORMATION version is Myers-Majluf again: the manager knows more, the price is fair given the market's information, and issuing when the shares are relatively dear is simply the pooling outcome. No inefficiency at all. The BEHAVIOURAL version says the market is genuinely wrong, investors are over-optimistic, and the manager exploits it.\n\nOnly the second requires prices to be inefficient, and only the second predicts that new issues will systematically underperform afterwards - which is the evidence k14 takes up, with the caveat that the result is sensitive to how comparables and risk adjustments are chosen.\n\nState which version you mean and the answer is complete; blur them and it reads as the myth. Keeping the two apart is worth points in its own right."
    },
    {
      "type": "reflect",
      "q": "In the new format this material is most likely to appear as prose. Prepare three sentences on each of the three questions the chapter says to expect.",
      "solution": "WHY THE ORDER IS INTERNAL, DEBT, EQUITY. Selling a claim to outsiders who know less than you costs the existing owners the amount by which that claim is underpriced. Internal cash sells nothing and riskless debt promises a fixed amount the firm pays whichever type it is, so neither transfers anything; equity is the residual claim, so every krone of hidden value belongs to it. The ranking is therefore a ranking of information sensitivity, and the choice of security is a choice of how much to hand to the buyer.\n\nWHY AN ISSUE ANNOUNCEMENT MOVES THE PRICE DOWN. Because an issue is a last resort, announcing one tells the market that the firm is more likely to be one of the types that finds issuing attractive at the current price. The revision is to the assets in place, not to the project, and the firms that do NOT issue are repriced upwards by exactly enough that the probability-weighted average returns to the pre-announcement price. Empirically seasoned equity offers meet a fall of roughly three percent, while straight debt issues move the price by an amount indistinguishable from zero - which is the ladder showing up in prices.\n\nWHAT MAKES A SIGNAL CREDIBLE. An action is informative only when imitating it is expensive for a firm that does not have the cash flow to back it: the cost to the low type must exceed the gain from being mistaken for the high type, which must exceed the cost to the high type. That is why taking on debt, repurchasing shares and raising a dividend all work, and why an announcement does not - talk is free, so both types make it. Debt signals quality precisely BECAUSE the distress penalty of k8 is real; if bankruptcy were free, borrowing would tell the market nothing.\n\nUse the labels explicitly: asymmetric information, adverse selection, pecking order, signalling. And never claim inefficiency where information is what you mean."
    }
  ],
  "14": [
    {
      "type": "calc",
      "q": "Skagen Teknologi AS is owned by founders and a venture fund holding 12,000,000 shares. It lists by selling 4,000,000 NEW shares at an offer price of 75. The underwriting spread is 7%, other direct costs are 9 million, and the shares close their first day at 90. Work out gross proceeds, net proceeds, underpricing, money left on the table and the total cost to the pre-IPO owners.",
      "hint": "Gross proceeds = 4,000,000 x 75 = 300.0 million.\nThe spread = 0.07 x 300.0 = 21.0, so the bank pays the company 279.0 for the shares.\nNet proceeds = 279.0 - 9.0 = 270.0. That, not the 300.0, is what funds the business.\nUnderpricing = (90 - 75)/75 = 0.200000 = 20.00%. Money left on the table = 4,000,000 x 15 = 60.0.\nTotal cost, the way the examiner wants it: the founders handed over 4,000,000 shares which the market immediately valued at 90 each, that is 360.0, and the company received 270.0.\n  value surrendered  360.0\n  - spread            21.0   (7.00% of gross)\n  - other costs        9.0   (3.00%)\n  - left on the table 60.0   (20.00%)\n  = net proceeds     270.0\n  total cost          90.0   (30.00% of gross)\nThe underpricing alone is nearly three times the bank's fee, and it never appears on an invoice.\nPosition afterwards: 16,000,000 shares at 90 gives a market capitalisation of 1,440.0, of which the pre-IPO owners hold 12/16 = 75%, worth 1,080.0.\nCheck - the same 60.0 from the other direction. Had the shares been sold at the price the market turned out to be willing to pay, the company would have needed (270.0 + 9.0)/(90 x 0.93) = 279.0/83.70 = 3,333,333 shares to raise the same 270.0 net. It sold 4,000,000, so it handed over 666,667 shares more than necessary, worth 60.0 at 90. Underpricing is not a payment, it is shares."
    },
    {
      "type": "calc",
      "q": "Half of all offerings turn out to be worth 140 per share once they trade and half 100. Informed investors observe which before bidding; you do not, and you order 1,000 shares in every offering. In good offerings your order is scaled back to 25%; in bad ones you are filled in full. Find the price at which you would participate, and the underpricing an outside observer would then measure.",
      "hint": "The naive benchmark: the unconditional expected value is 0.50(140) + 0.50(100) = 120.00. Suppose the bank priced there.\nYour expected profit at 120, working in SHARES RECEIVED rather than shares ordered:\n  good, worth 140: probability 0.50, allocated 250, profit per share +20  ->  +2,500\n  bad,  worth 100: probability 0.50, allocated 1,000, profit per share -20  ->  -10,000\n  total: -7,500 per round.\nThe average first-day return across the two offerings is 0.50(16.6667%) + 0.50(-16.6667%) = 0.00%, which looks like a fair deal, and you would still lose 7,500. That contrast is the winner's curse in one line: the average return across OFFERINGS is not the average return on the SHARES YOU GET.\nThe price at which you would participate. Set expected profit to zero: 0.50(250)(140 - P) + 0.50(1000)(100 - P) = 0, that is 125(140 - P) + 500(100 - P) = 0, so 17,500 + 50,000 = 625P and P = 108.00.\nWhat that implies. First-day returns become (140 - 108)/108 = 29.6296% on good offerings and (100 - 108)/108 = -7.4074% on bad ones, so the unconditional average first-day return is 0.50(29.6296%) + 0.50(-7.4074%) = 11.1111% - the underpricing an outside observer would measure in the data.\nThe cost to the issuer: shares worth 120.00 on average are sold for 108.00, so the issuer gives up 12.00 per share, which is 10.00% of the value and 11.1111% of the offer price.\nCheck - the uninformed break even at 108: 125(32) = +4,000 and 500(-8) = -4,000, summing to zero. The measured 11.1111% is NOT a profit anyone earns; it is compensation for adverse allocation."
    },
    {
      "type": "calc",
      "q": "Fjord Energi ASA has 50,000,000 shares trading at 60, a market capitalisation of 3,000 million. It raises 450 million through a 1-for-5 rights issue at a subscription price of 45. Nils holds 1,000 shares. Compute TERP, the value of a right, and Nils's wealth under each of his three options.",
      "hint": "Check the issue raises what it should: new shares = 50,000,000/5 = 10,000,000 at 45 each = 450.0 million.\nTERP = (3,000 + 450)/(50 + 10) million shares = 3,450/60 = 57.5000. The price falls from 60 to 57.50 on the ex-rights date, and none of that fall is a loss.\nValue of a right: five rights plus 45 buy a share worth 57.50, a gain of 12.50 per new share, so each of the five rights is worth 12.50/5 = 2.5000. Cross-check: P_cum - TERP = 60 - 57.50 = 2.5000.\nNils starts with 1,000 x 60 = 60,000.\n  Subscribes for all 200 new shares: holds 1,200 x 57.50 = 69,000, paid 9,000, so wealth = 60,000\n  Sells all 1,000 rights at 2.50: holds 1,000 x 57.50 = 57,500 plus 2,500 of cash = 60,000\n  Does nothing and lets them lapse: holds 1,000 x 57.50 = 57,500, so he loses 2,500\nA rights issue does not dilute anyone who ACTS, and it does dilute anyone who does not.\nThe discount is cosmetic. Raise the same 450 at a subscription price of 30 and you need 15,000,000 new shares, a 3-for-10 issue. Then TERP = 3,450/65 = 53.0769 and each right is worth 60 - 53.0769 = 6.9231. Nils subscribes for 300 shares at 30 for 9,000 and holds 1,300 x 53.0769 = 69,000, so his wealth is 60,000 again. What the deeper discount DOES change is the penalty for inaction: letting the rights lapse now costs 6,923.08 instead of 2,500.\nCheck - total value is conserved. Market capitalisation after the issue is 3,450 million on either structure: 60 million x 57.5000 = 3,450 and 65 million x 53.0769 = 3,450. The number of slices changed, the cake did not."
    },
    {
      "type": "control",
      "q": "Set out the IPO sequence and vocabulary an exam question can use, and say which single moment matters for the arithmetic.",
      "solution": "THE SHARES. Primary shares are newly created and the cash goes to the COMPANY. Secondary shares are existing shares sold by founders or venture investors, and that cash goes to THEM. Most offerings mix the two, and the split decides who bears the cost of underpricing - always read which kind the question means.\n\nTHE UNDERWRITER'S COMMITMENT. Firm commitment, the standard arrangement: the bank buys the whole issue at the offer price less the spread and resells it, so placement risk is the bank's. Best efforts: it only promises to try, and the issue may be withdrawn - used for small and risky offerings. Auction: investors bid and the price is set where the issue clears; rare.\n\nPRICING. Book building. During the roadshow the bank collects non-binding indications of interest, builds a book of demand at various prices, and sets the offer price the night before trading starts, typically below what the book says the market will bear.\n\nTHREE FEATURES THAT APPEAR IN QUESTIONS. The over-allotment option or greenshoe lets the underwriter sell about 15% more shares than planned and buy them back in the market for roughly a month, which is how it supports the price without risk. The lock-up bars insiders from selling for a period, commonly 180 days. The quiet period restricts what the company may say around the offering.\n\nTHE ONE MOMENT THAT MATTERS. Everything before the first trading day is negotiation between the company, the bank and a few dozen institutions; everything after is a public price. The gap between the price set on the last evening and the price observed on the first day IS the underpricing, and it is where the largest cost sits."
    },
    {
      "type": "explain",
      "q": "Explain why the underwriter is worth its fee in the language of k12, and why the issuer cannot escape underpricing by simply excluding informed investors.",
      "solution": "WHY THE BANK IS WORTH ITS FEE. The bank is a repeat player and the issuer is not. It sells offerings every month to the same institutions, so its reputation is a hostage: certifying a bad issue costs it the next twenty deals. That is exactly the type-dependent cost that makes a signal credible under the single-crossing rule of k13, and it means the bank can say something about the firm's quality that the firm cannot say about itself. In k12's language, certification moves E[V | beliefs] towards the truth and therefore shrinks the dilution term alpha(V - E[V | beliefs]). The fee buys certification, not just distribution - which is also why auditors and analysts matter, and why the same logic reappears in the remedies list of k12.\n\nWHY THE INFORMED CANNOT BE EXCLUDED. If the bank could sell only to uninformed investors it could price at the unconditional expected value and lose nothing, so the entire cost of underpricing comes from the informed being in the room. But they cannot be kept out: they are the institutions whose demand builds the book in the first place, and their bids are what tells the bank what the offering is worth. Book building BUYS information from investors and pays for it with allocations of underpriced stock.\n\nThat is a second, complementary explanation of underpricing, and it predicts what the data shows: offerings priced ABOVE the indicated range - the ones where investors revealed the most positive information - are underpriced most.\n\nThree further explanations, one sentence each, since verbal answers are graded on breadth: litigation risk, cascades, and conflicted underwriters whose repeat relationships with buyers are not the issuer's interest."
    },
    {
      "type": "reflect",
      "q": "In V2024 six of ten multiple-choice questions came from this lecture's exercise, and the format has since dropped multiple choice. Where will this material now appear, and what should you have ready?",
      "solution": "It will appear in two places. As a SHORT COMPUTATION inside a larger financing exercise - gross proceeds through to total cost, or a rights issue where a later sub-question needs the ex-rights price. And as a VERBAL SUB-QUESTION on why underpricing exists or what it costs whom, inside one of the two discussion exercises.\n\nWhat to have ready, and it is short. First, the five arithmetic lines: gross proceeds, net proceeds, underpricing as a return, money left on the table, and total cost = N_primary x P_close - net proceeds, with the decomposition into spread plus other costs plus money left on the table as the closing check.\n\nSecond, the incidence sentence, stated as precisely as the examiner does: the cost of underpricing falls on the PRE-ISSUE SHAREHOLDERS, in shares, in proportion to how many PRIMARY shares were sold. Not on the company, whose cash position is the net proceeds either way, and not on nobody.\n\nThird, the winner's curse in three sentences, and one sentence each on litigation risk, cascades and conflicted underwriters.\n\nFourth, TERP and the value of a right, plus the two things about rights issues that reliably get misread: the subscription discount is cosmetic, and the only shareholder who loses is the one who neither subscribes nor sells.\n\nFifth, the long-run evidence WITH its caveat, and the two versions of market timing kept apart.\n\nThe arithmetic here is addition and division, which makes this the cheapest chapter in the manual to convert into points. The failure mode is leaving out the item nobody invoices for."
    }
  ],
  "15": [
    {
      "type": "calc",
      "q": "Nordfjord Kraft ASA is all-equity in a perfect market with no taxes: 25 million shares, a free cash flow of 50 a year in perpetuity paid out in full, rU = 10.00%, plus 125 of excess cash the board has decided to distribute now. Compute the price before, then run both payout routes and compare three shareholders.",
      "hint": "Step 1 - the price before anything happens. The operations are worth 50/0.100000 = 500.00 and the cash is worth its face value, so E0 = 625.00 and P0 = 625/25 = 25.00.\nStep 2 - route A, a special dividend. DPS = 125/25 = 5.00, so the ex-dividend price is 25.00 - 5.00 = 20.00. The share count is unchanged at 25 million and the capitalisation is 500.00, which is the operations and nothing else.\nStep 3 - route B, an open-market repurchase. n = 125/25.00 = 5.0000 million shares, leaving 20.0000 million. E1 = 625 - 125 = 500.00, so the price is 500/20 = 25.00, unchanged.\nStep 4 - the ongoing dividend per share, which is what actually differs. Route A: 50/25 = 2.00, and 2.00/0.100000 = 20.00. Route B: 50/20 = 2.50, and 2.50/0.100000 = 25.00. Fewer shares means a bigger slice each, and the price picks that up exactly.\nStep 5 - three shareholders, each holding 100 shares beforehand, each starting at 2,500.\n  Route A, takes the dividend: 100 shares at 20.00 = 2,000 plus 500 of cash = 2,500\n  Route B, tenders 500/25.00 = 20 shares: 80 shares at 25.00 = 2,000 plus 500 of cash = 2,500\n  Route B, tenders nothing: 100 shares at 25.00 = 2,500\nThe second row is a HOMEMADE DIVIDEND. It works in reverse too: a route-A shareholder who did not want the cash reinvests 500 at the EX-dividend price of 20.00, buying 25 shares to hold 125, worth 2,500.\nCheck by OWNERSHIP FRACTION, not by share count, because the routes leave different totals outstanding: 125/25,000,000 = 0.0000050 and 100/20,000,000 = 0.0000050. Reinvest at the stale 25.00 and you buy only 20 shares, the fractions stop agreeing, and that is how the error is caught."
    },
    {
      "type": "calc",
      "q": "Haugesund Marine ASA is all-equity in a perfect market with no taxes: 40 million shares, a free cash flow of 90 a year in perpetuity paid out in full, rU = 9.00%. The board announces an issue of 400 of permanent risk-free debt at rD = rf = 4.00%, proceeds paid to shareholders. Run both routes end to end.",
      "hint": "Step 1 - the starting point. V = 90/0.090000 = 1000.00, all equity, so P0 = 1000/40 = 25.00. The current dividend per share is 90/40 = 2.25, and 2.25/0.090000 = 25.00. Unlevered, so rE = rU = 9.0000%.\nStep 2 - the announcement. No taxes, no issuance costs, no change to the assets, so there is no news to price: V stays 1000.00 and the price stays 25.00. Say this in one sentence and name MM Proposition I - it is the sub-question's whole content.\nStep 3 - the capital structure afterwards, common to both routes. D = 400.00, so E1 = 600.00 and D/E = 0.666667. rE = 0.090000 + 0.666667(0.090000 - 0.040000) = 0.090000 + 0.033333 = 0.123333 = 12.3333%. Pre-tax WACC: 0.60(0.123333) + 0.40(0.040000) = 0.074000 + 0.016000 = 0.090000 = rU. Interest is 0.04 x 400 = 16.00, so equity now receives 74.00 a year.\nStep 4 - route A, a special dividend. DPS = 400/40 = 10.00, ex-dividend price 25.00 - 10.00 = 15.00 on an unchanged 40 million shares, and 40 x 15.00 = 600.00 = E1. Ongoing DPS = 74/40 = 1.85, and 1.85/0.123333 = 15.00.\nStep 5 - route B, a repurchase. n = 400/25.00 = 16.0000 million shares, leaving 24.0000 million, and 600/24 = 25.00, unchanged. Ongoing DPS = 74/24 = 3.0833, and 3.0833/0.123333 = 25.00.\nStep 6 - the comparison the question ends on, from one share worth 25.00:\n  no recapitalisation - a share paying 2.25 forever at 9.0000%              25.00\n  route A, special dividend - a share paying 1.85 at 12.3333% plus 10.00    25.00\n  route B, tenders his share - cash                                        25.00\n  route B, holds his share - a share paying 3.0833 at 12.3333%             25.00\nAll four are 25.00. Write that sentence out: it is the answer, and the numbers are the evidence.\nThe checks that CAN fail are in steps 4 and 5, where the new dividend per share is discounted at the new rE - both inputs never entered the price. Skip the relevering and discount 3.0833 at 9.0000% and you get 34.26 instead of 25.00, and the clash tells you which step was wrong. P = E1/N1 cannot fail, since n was defined as 400/P."
    },
    {
      "type": "calc",
      "q": "Nordfjord Kraft again, with 125 of cash, 25 million shares and rU = 10.00%. The board now considers holding the cash for one year in a bank account at rf = 4.00% and paying it out then. Show that a shareholder who wants his money today does not care.",
      "hint": "Step 1 - value the deferred payout. The account pays 125 x 1.040000 = 130.00 in one year, risk-free, so its value today is 130.00/1.040000 = 125.00. Total equity is 500.00 + 125.00 = 625.00 and the price is still 25.00. Deferring changed nothing about today's price: retaining cash is NEGATIVE DEBT.\nStep 2 - what the deferral pays per share. In one year the firm pays 130.00/25 = 5.20 per share.\nStep 3 - the shareholder builds his own immediate dividend. Holding 100 shares and wanting 500 today, he borrows 500 at 4.0000% against them. He now has 500 of cash and 100 shares worth 2,500, against a debt of 500: net wealth 2,500.\nStep 4 - one year later the loan clears itself. He receives 100 x 5.20 = 520.00 and repays 500 x 1.040000 = 520.00. The two cancel to the krone, and he holds 100 shares of the operating business - exactly the position of a shareholder who was paid 500 immediately and spent it.\nStep 5 - the reverse direction. A shareholder paid 500 today who wanted it next year lends it at 4.0000% and has 520.00 in a year, again identical.\nCheck: step 4 is a REAL check, not an identity. It works only because he borrowed exactly the present value of what he was going to receive. Borrow 520 instead and the year-end receipt of 520 falls short of the 540.80 repayment, so the positions differ. The same discipline made the k6 arbitrage close."
    },
    {
      "type": "control",
      "q": "Give the payout vocabulary an exam question can use, and the four dates of a dividend with the price effect of each.",
      "solution": "THE METHODS. Regular dividend - a per-share cash payment repeated each quarter or year, the visible sticky part of payout, cut only under pressure. Special dividend - a one-off, much larger per-share payment, used to disgorge a windfall or the proceeds of a recapitalisation. Liquidating dividend - payment of the proceeds of selling the business itself. Open-market repurchase - the firm buys its own shares on the exchange at the market price, and this is the great majority of repurchases. Fixed-price tender offer - an offer to all holders at a stated price above market for a stated quantity, with the arithmetic in k16. Targeted repurchase - a privately negotiated purchase of one holder's block, sometimes at a premium, used to remove a hostile blockholder.\n\nTHE FOUR DATES. Declaration date: the board announces and it becomes a liability; only the news content moves the price, which under MM is nothing. EX-DIVIDEND DATE: buy from here on and you do NOT receive this dividend, so the price falls by the dividend - this is the only price event. Record date: the register is read to decide who is paid; no effect. Payable date: the cash reaches shareholders; no effect, because the claim was priced out at the ex-date.\n\nTHE ONE DISTINCTION THAT CARRIES THE CHAPTER. A dividend pays EVERY share. A repurchase pays only the shares TENDERED, and the shareholders who stay receive nothing at all - what they get instead is a larger fraction of a smaller firm. Every result here is that trade, priced."
    },
    {
      "type": "explain",
      "q": "Explain why homemade transactions defeat every payout argument in a perfect market, and give the two most common arithmetic slips.",
      "solution": "The firm has exactly one financial capability its shareholders lack: none. Whatever pattern of cash the payout policy delivers, a shareholder can undo it by selling a slice of his holding, buying more shares, borrowing or lending - all at the same prices the firm faces. A service you can perform for yourself at no cost has a market value of zero, so no payout policy can be worth paying for.\n\nThis is the same argument that killed homemade leverage in k6, applied to the timing and the form of cash rather than to the debt ratio. It is why irrelevance is stronger than 'dividends equal repurchases': even the TIMING does not matter, as long as cash held inside earns the market rate on its risk and investment policy is unchanged. Cash retained is negative debt, and PV(C(1 + rf) in one year) = C exactly.\n\nTHE TWO SLIPS. First, computing the shares repurchased at the wrong price. Use n = R/P1, where P1 is the price AFTER any announcement effect. In this chapter there is none, so P1 = P0 and it makes no difference; in k7, where the announcement creates value, using the stale price is the standard way to lose the sub-question.\n\nSecond, the mirror image: a dividend is reinvested at the EX-dividend price, because that is the price at which the shares now trade. Reinvest 500 at the cum price of 30.00 rather than the ex price of 25.00 and you buy 16.6667 shares instead of 20, your ownership fraction no longer matches the repurchase route, and the irrelevance result appears to fail when it is your arithmetic that has.\n\nCompare OWNERSHIP FRACTIONS rather than share counts, since the two routes leave different totals outstanding. That check catches both slips."
    },
    {
      "type": "reflect",
      "q": "'The share price fell on the ex-date, so the dividend destroyed value.' Diagnose this and its mirror error, and say what the irrelevance benchmark is actually for.",
      "solution": "Every large dividend is followed by a fall in the quoted price, and it never means what it appears to mean: the holder was handed the difference IN CASH THE SAME DAY, so his wealth did not move by a krone. The drop is enforced by arbitrage - buy cum, collect, sell ex, and any gap smaller than the dividend is a riskless profit that trade removes.\n\nThe mirror error is to call a repurchase good news because the price stays up and earnings per share rise. The shares that would have shared those earnings were bought and cancelled, and the holder paid for the privilege out of the firm's own cash. A firm buying its own shares at fair value is doing a zero-NPV transaction, exactly like buying anything else at fair value.\n\nWhat the benchmark is for. In a perfect market neither route creates or destroys anything, so the perfect-market answer is EXACTLY ZERO - and that is what makes the benchmark useful even though its assumptions are false. Any observed price reaction to a payout announcement must be attributable to one of five named lines: taxes, transaction and issuance costs, asymmetric information, investment policy being affected, or the retained cash not earning a fair return. Your job in an exam answer is to say WHICH ONE.\n\nWithout the benchmark, 'the price rose after the buyback' has a hundred explanations. With it, there is a short list, and naming the item on the list is the answer. That is why the verbal payout question is answerable at all, and why k15 and k16 are examined together."
    }
  ],
  "16": [
    {
      "type": "calc",
      "q": "A share trades at 80.00 the day before it goes ex-dividend on a dividend of 6.00. The investor deciding whether to sell now or after the dividend pays tau_d = 35% on dividends and tau_g = 25% on realised gains, and his cost basis is 50.00. Find the effective dividend tax rate, the ex-dividend price, and verify by pricing both strategies after tax.",
      "hint": "Step 1 - the effective dividend tax rate. tau*_d = (0.3500 - 0.2500)/(1 - 0.2500) = 0.1000/0.7500 = 0.133333 = 13.3333%. Dividends are taxed 10 percentage points harder than gains, but the penalty RELATIVE TO A CAPITAL GAIN is 13.3333%, because the gain itself is taxed.\nStep 2 - the drop. P_cum - P_ex = 6.00 x (1 - 0.3500)/(1 - 0.2500) = 6.00 x 0.866667 = 5.20, so P_ex = 80.00 - 5.20 = 74.80. Under k15's perfect market it would have been 74.00.\nStep 3 - sell cum-dividend. Proceeds 80.00, taxable gain 80.00 - 50.00 = 30.00, tax 0.2500 x 30.00 = 7.50. After tax: 72.50.\nStep 4 - hold through the dividend, then sell. Dividend after tax = 6.00 x 0.6500 = 3.90. Sale at 74.80 with a gain of 24.80 and tax 6.20, leaving 68.60. Total: 3.90 + 68.60 = 72.50.\nCheck: the two strategies pay 72.50 and 72.50, so the investor is indifferent and 74.80 is the equilibrium ex-price. This check CAN fail, and it is worth knowing how: assume the naive drop of the full 6.00 and the ex-price becomes 74.00, at which holding through pays 3.90 + 74.00 - 0.2500(24.00) = 71.90 against 72.50 for selling first. Everyone would sell cum-dividend, which is not an equilibrium.\nStep 5 - read off the cost of the dividend form. The dividend transferred 6.00 of value but only 5.20 of price, so 6.00 x 0.133333 = 0.80 per share leaked to the tax authority purely because the payment was labelled a dividend. On 20 million shares that is 16.0 million.\nNote: the basis is whatever the question says the investor paid. If no basis is given, say you assume the shares were bought at the current price so the gain is zero, and compute on that - stating the assumption earns the mark."
    },
    {
      "type": "calc",
      "q": "A firm with 25 million shares trading at 40.00 distributes 200. Its shareholders bought at 25.00 and face tau_d = 30% and tau_g = 20%. Whatever shares they still hold they expect to sell in 8 years, and the deferred tax liability is discounted at 5.00%. Compare the present value of tax on the two routes.",
      "hint": "Assume the price falls by the full dividend, which is the right assumption when the MARGINAL investor setting the price is tax-exempt, as pension funds largely are. Millions throughout.\nRoute A, a dividend. DPS = 200/25 = 8.00, so the ex-price is 32.00 and the tax paid at once is 0.3000 x 200 = 60.00.\n  What stays embedded: all 25 million shares are still held, now at 32.00 against a basis of 25.00, so the unrealised gain is 7.00 x 25 = 175.00 and the tax that will be due is 0.2000 x 175.00 = 35.00. With 1.05^8 = 1.477455, PV = 35.00/1.477455 = 23.69.\n  Route A total: 60.00 + 23.69 = 83.69.\nRoute B, a repurchase. n = 200/40.00 = 5.0000 million shares bought at 40.00 from holders with a basis of 25.00, so the realised gain is 5 x 15.00 = 75.00 and the tax is 0.2000 x 75.00 = 15.00.\n  What stays embedded: the remaining 20 million shares still trade at 40.00 against a basis of 25.00, an unrealised gain of 15.00 x 20 = 300.00 carrying a future tax of 60.00, with a present value of 60.00/1.477455 = 40.61.\n  Route B total: 15.00 + 40.61 = 55.61.\nThe answer: the repurchase saves 83.69 - 55.61 = 28.08 on a distribution of 200.00, roughly 14% of the amount distributed, without changing the firm's assets, its investment policy or anyone's pre-tax wealth.\nCheck: pre-tax wealth must be identical on the two routes, or the comparison is measuring something else. Route A: 25 million x 32.00 = 800.00 plus 200.00 of cash = 1000.00. Route B: 20 million x 40.00 = 800.00 plus 200.00 of cash = 1000.00. Only the tax column differs.\nName all three advantages: a lower RATE, a smaller BASE, and DEFERRAL - and note that the deferral is a delay, not a saving, which is why the embedded column is larger under the repurchase."
    },
    {
      "type": "calc",
      "q": "Fjellstrand ASA has 30 million shares trading at 25.00, so E = 750 million, and enough cash to fund a buyback. Compare a fixed-price tender offer for 6 million shares at 28.00 with a Dutch auction for the same 6 million, where holders offer 1.5 million at 25.50, 2.0 million at 26.00 and 3.5 million at 26.50.",
      "hint": "PART A, the fixed-price tender offer. The premium is (28.00 - 25.00)/25.00 = 12.00%. Assume it is fully subscribed and everyone tenders, so the firm buys pro rata.\n  Outlay = 6.00 x 28.00 = 168.00, so E1 = 750.00 - 168.00 = 582.00 on N1 = 24.00 million shares, giving P1 = 582/24 = 24.25 - BELOW the 25.00 it started at. The premium was paid out of the shares that remain.\n  What a shareholder actually gets: each holder has 6/30 = 20% of his shares taken at 28.00 and keeps 80%. Wealth per original share = 0.2000 x 28.00 + 0.8000 x 24.25 = 5.60 + 19.40 = 25.00, exactly where he started, premium and all.\n  The shareholder who does NOT tender keeps a share worth 24.25 and receives nothing, losing 0.75. One who could tender everything would receive 28.00 and gain 3.00. So the premium is a TRANSFER from those who stay to those who sell, which is why fixed-price offers are almost always oversubscribed and pro-rated.\n  Check: 168.00 + 582.00 = 750.00, conserved. The step that can fail is P1: price the remaining shares at the tender price of 28.00 and you get 24.00 x 28.00 = 672.00, so 168.00 + 672.00 = 840.00 - a firm that gained 90.00 by handing out its own cash. That contradiction is how you catch the error.\nPART B, the Dutch auction. Cumulative supply is 1.5, then 3.5, then 7.0 million, so the lowest price at which it reaches 6.0 million is 26.50. Everyone who tendered at or below 26.50 is paid 26.50, and the 26.50 bids are pro-rated: 6.0 - 3.5 = 2.5 of the 3.5 million offered there, or 71.4286% of each.\n  Outlay = 6.00 x 26.50 = 159.00, so E1 = 591.00 on 24.00 million shares, giving P1 = 24.625.\n  Check: the auction bought the same 6 million shares for 159.00 rather than 168.00, and the remaining price is higher by exactly 9.00/24.00 = 0.375. The saving accrues entirely to the shareholders who stay, which is why a firm that does not need speed prefers the auction.\nNote which line is an identity: wealth per original share = P0 whenever everyone tenders pro rata, because substituting P1 collapses both terms to E0/N0. It can never fail, so it proves nothing about your arithmetic - it is a statement, not a check."
    },
    {
      "type": "calc",
      "q": "tau_c = 22% and the investor's tax rate on interest income is tau_i = 35%. The firm can invest idle cash at r = 5.00% for one year. Should it hold 100 of cash or pay it out and let shareholders invest privately? Then redo it with tau_c = 40%.",
      "hint": "Compare one krone retained for a year against one krone paid out now:\n  retain: 1 + r(1 - tau_c)\n  pay out and invest privately: 1 + r(1 - tau_i)\nThe dividend tax cancels, because the same krone is eventually taxed as a dividend on both routes. Only the tax on the interim interest differs.\nWith tau_c = 22% and tau_i = 35%: the firm keeps 78% of the interest while the investor would keep only 65%. On 100 for one year at 5.0000%: 100 x 0.050000 x (0.7800 - 0.6500) = 5.00 x 0.1300 = 0.65 MORE inside the firm. Retaining has a tax ADVANTAGE here.\nWith tau_c = 40% and tau_i = 35%: 100 x 0.050000 x (0.6000 - 0.6500) = 5.00 x (-0.0500) = -0.25, so holding the cash costs 0.25 a year. Retaining is now a slow leak.\nThe rule to state rather than recite: retaining cash carries a tax disadvantage when tau_c > tau_i and an advantage when tau_c < tau_i. Say which inequality the question's rates satisfy, then conclude.\nAnd add the non-tax half of the answer, because the examiner wants both: whatever the tax sign, idle cash invites the empire building of k11, so the agency argument may point the other way and dominate a small tax advantage."
    },
    {
      "type": "control",
      "q": "Name the four repurchase methods, the price paid in each, and the one thing that separates them for exam purposes.",
      "solution": "OPEN-MARKET REPURCHASE. The firm buys on the exchange over months, usually under an announced programme, at the market price. The great majority of repurchases. No commitment: programmes are often only partly completed, which is precisely why the signal is weaker than a dividend increase.\n\nFIXED-PRICE TENDER OFFER. An offer to all shareholders to buy a stated number of shares at a stated price, open for a few weeks, at a premium above market. Oversubscription is handled pro rata. Large and fast, and it has arithmetic of its own: P1 = (E0 - Q x P_T)/(N0 - Q), which is BELOW P0 whenever P_T is above it.\n\nDUTCH AUCTION TENDER OFFER. Shareholders state the lowest price at which they will sell; the firm finds the price that fills the quantity, and everyone who tendered at or below it is paid that one clearing price. Usually a smaller premium than a fixed-price offer, because the market reveals the supply curve.\n\nTARGETED REPURCHASE. A privately negotiated purchase of one large holder's block, at a negotiated price sometimes far above market. Used to remove a hostile blockholder; paying a premium to do so is GREENMAIL, and it transfers value from the remaining shareholders.\n\nWHAT SEPARATES THEM. The price paid relative to the market, and therefore who bears the difference. In an open-market repurchase the firm pays fair value and nobody gains or loses. In a tender offer the premium comes out of the shares that remain, so it is a transfer from those who stay to those who sell.\n\nTwo events that look like this and are not: a stock dividend pays shareholders in new shares and a stock split divides each share into several. No cash leaves and no claim changes hands, so both are pure relabelling - twice as many shares at half the price."
    },
    {
      "type": "explain",
      "q": "Explain the information content of dividends: why changes move prices, why cuts move them more than increases, and why this is not a claim that dividends create value.",
      "solution": "Managers know more about the firm's prospects than investors do, which is the k12 and k13 setting applied to payout. Two regularities follow.\n\nDIVIDENDS ARE SMOOTHED. Firms set the regular dividend at a level they believe they can sustain, raise it slowly and only partially towards long-run earnings, and cut it only under real pressure. Dividends are therefore far less volatile than the earnings they are paid from.\n\nCHANGES CARRY INFORMATION. On average an initiation or an increase is received as good news and a cut as very bad news.\n\nWhy it is credible when talk is not: a signal is informative only if imitating it is expensive for a firm that lacks the cash flow to back it. Raising the regular dividend commits the firm to a stream the market will punish it for cutting, so a manager without the earnings to sustain it faces a bigger loss later than the price gain today. That asymmetry is what makes the raise informative, and it is the single-crossing condition of k13 in another costume.\n\nWhy a cut moves the price more: BECAUSE managers avoid cutting until they have to, a cut reveals that they have run out of alternatives. The action is more informative precisely because it is more reluctantly taken.\n\nWhy this is not value creation. The dividend does not make the firm worth more; it reveals what the firm was already worth. Everything the payout itself does is the k15 arithmetic, which is neutral. Keep the claims apart in your writing: 'this is a signal about existing value' scores; 'this creates value' is the error the keys look for. The same distinction is consistency check 5 in disguise - ask whether investors' inference is rational given what management knows."
    },
    {
      "type": "reflect",
      "q": "H2025 Exercise 2 asked what a shareholder holding 5 to 10% can do about a CEO who is not acting in shareholders' interest, three actions at four points each. Write the payout action as it should appear on the script.",
      "solution": "The action: push for a payout - a special dividend, a leveraged recapitalisation, or a commitment to a higher regular dividend.\n\nThe mechanism, which is what the four points are actually for. The cash leaves the firm, so the free cash flow that funded the empire building is gone. If the payout is debt-financed, debt service becomes a hard constraint the manager cannot quietly abandon: a missed interest payment puts the firm in default and hands control to creditors, which is a penalty severe enough and far enough outside his control to be credible. And because the firm must now return to outside investors to fund anything new, every future project is priced by people who are not on the payroll.\n\nThe limitation, which the keys credit. A payout also removes flexibility and can force the firm to skip genuinely good projects later, and if the firm has real growth options the discipline is a cost rather than a benefit. So the action is strongest for a mature, cash-rich firm in an industry with few projects - which is exactly the firm the question describes when it describes a CEO with nothing better to do with the money.\n\nTwo to three sentences per action is the stated budget, so this is roughly: what the action is, how the mechanism bites, what it costs. Name it - free cash flow, agency cost of equity, commitment - and finish in a direction.\n\nThe general lesson for these questions: the marks are for the mechanism, not for the action. 'Pay out the cash' with no explanation is worth almost nothing; the same words with the commitment argument attached are worth the full four."
    }
  ]
};

/* ---------- tidligere eksamener ----------
   Modulen /exam er slått av for dette faget; eksamenstreningen ligger i /sett.
   Feltet må likevel finnes, siden repetisjonsmotoren leser exams.tasks. */
window.EDU_DATA.exams = { format: { duration: "3 hours", tasks: 6, weights: [], keyInsight: "" }, tasks: [] };

/* FIE402 · glossary — economists/thinkers and symbols */
window.EDU_DATA.glossary = {
  economists: [
    { name:"Franco Modigliani", note:"With Miller: capital structure irrelevance in perfect markets (MM I) and the linear cost of equity (MM II).", chapters:[6,7] },
    { name:"Merton Miller", note:"Co-author of the MM propositions, and author of the personal-tax correction that shrinks the effective tax advantage of debt to τ*.", chapters:[6,7,8] },
    { name:"Stewart Myers", note:"Named the APV method, modelled debt overhang (shareholders reject positive-NPV projects when debt is risky), and co-wrote the pecking order.", chapters:[10,13,18] },
    { name:"Nicholas Majluf", note:"With Myers: the adverse-selection model of equity issuance that the exam repeats almost verbatim, including the rationality-of-beliefs check.", chapters:[12,13] },
    { name:"Michael Jensen", note:"Agency costs of debt with Meckling, the free cash flow hypothesis (debt as a commitment against empire building), and the market for corporate control.", chapters:[9,11,27] },
    { name:"William Meckling", note:"With Jensen: the firm as a nexus of contracts, and the two agency costs of debt this course quantifies, risk shifting and monitoring.", chapters:[9,11] },
    { name:"Fischer Black", note:"With Scholes: the closed-form call price whose comparative statics, not its arithmetic, are what the exam now tests.", chapters:[23,24] },
    { name:"Myron Scholes", note:"With Black: option pricing by continuous replication, which is the binomial hedge argument taken to the limit.", chapters:[23,24] },
    { name:"Robert C. Merton", note:"Extended Black-Scholes and built the structural model of credit risk: equity is a call on firm value, risky debt is safe debt minus a put.", chapters:[23,24] },
    { name:"Stephen Ross", note:"Signalling with debt (leverage as a credible signal of quality) and the arbitrage logic behind risk-neutral valuation.", chapters:[13,22] },
    { name:"William Sharpe", note:"The CAPM and the security market line, which turn a beta into the discount rate in every twin-firm exercise.", chapters:[3,4] },
    { name:"Eugene Fama", note:"Market efficiency, which is what makes the MM arbitrage argument bite and what lets you read implied synergies off an announcement-day price move.", chapters:[6,13,26] },
    { name:"Richard Roll", note:"The hubris hypothesis: acquirers overpay because managers overestimate their own valuations. One of the non-synergy motives H2024 demanded.", chapters:[26] },
    { name:"René Stulz", note:"Managerial discretion in financing and takeovers: managers resist control transfers, which explains takeover defences and over-investment.", chapters:[11,26,27] },
    { name:"Oliver Hart", note:"Incomplete contracts and control rights: why covenants, seniority and creditor control exist, and why the board matters more than the contract text.", chapters:[10,27] },
    { name:"Sanford Grossman", note:"With Hart: the free-rider problem in takeovers, which explains why bidders need a toehold or a premium and why dispersed ownership weakens monitoring.", chapters:[26,27] },
    { name:"George Akerlof", note:"The market for lemons. The adverse-selection engine underneath Myers-Majluf and the negative price reaction to an equity issue.", chapters:[12,13] },
    { name:"Michael Spence", note:"Costly signalling: an action is informative only if it would hurt a low-quality firm more. The test to apply to any signalling story on the exam.", chapters:[13] },
    { name:"Kevin Rock", note:"The winner's curse explanation of IPO underpricing: uninformed investors get full allocations of the bad deals, so they must be compensated.", chapters:[14] },
    { name:"John Lintner", note:"Dividend smoothing: managers raise dividends only when they believe the increase is sustainable, which is why cuts carry so much information.", chapters:[16] },
    { name:"John Cox and Mark Rubinstein", note:"With Ross: the binomial option pricing model, the replication argument and the risk-neutral probability ρ that the formula sheet gives you.", chapters:[22] },
    { name:"Sheridan Titman", note:"Indirect costs of financial distress: customers, suppliers and employees withdraw before any default, so the cost is priced in today.", chapters:[8] },
    { name:"Andrei Shleifer and Robert Vishny", note:"Large shareholders as monitors, and market-timing-driven merger waves. Both feed the governance exercise on blockholder action.", chapters:[26,27] },
    { name:"Irving Fisher", note:"The separation theorem: with a capital market the firm should maximise present value regardless of owners' consumption preferences. The reason the NPV rule exists.", chapters:[1] },
    { name:"Jonathan Berk and Peter DeMarzo", note:"Authors of the course textbook. Their conventions are the ones this course follows, except that βU here is weighted without (1 − τc).", chapters:[0,4] },
  ],
  symbols: [
    { sym:"r<sub>f</sub>", name:"Risk-free rate — the return on default-free debt, and the only rate you may discount at once risk-neutral probabilities are in use", chapters:[3,22] },
    { sym:"r", name:"A generic discount rate — it must match the risk and the period length of the cash flow it is applied to", chapters:[1] },
    { sym:"r<sub>E</sub>", name:"Cost of equity — the return shareholders require; rises linearly in D/E under MM II", chapters:[4,6] },
    { sym:"r<sub>D</sub>", name:"Cost of debt — the expected return on debt, which sits below the promised yield y whenever default is possible", chapters:[4,5] },
    { sym:"r<sub>U</sub>", name:"Unlevered cost of capital — the rate for the firm's business risk alone; equals the pre-tax WACC and is unchanged by financing", chapters:[4,18] },
    { sym:"r<sub>wacc</sub>", name:"Weighted average cost of capital, after tax unless stated otherwise — the discount rate for the WACC method", chapters:[4,17] },
    { sym:"E[R<sub>mkt</sub>]", name:"Expected return on the market portfolio — the CAPM input the exam usually gives you directly", chapters:[3] },
    { sym:"E[R<sub>mkt</sub>] − r<sub>f</sub>", name:"Market risk premium — the price of one unit of systematic risk, multiplied by beta in the CAPM", chapters:[3] },
    { sym:"Cov(R<sub>i</sub>, R<sub>mkt</sub>)", name:"Covariance of an asset's return with the market — the numerator of beta, which is why total volatility is the wrong risk measure", chapters:[3] },
    { sym:"β<sub>E</sub>", name:"Equity beta — the systematic risk borne by shareholders, containing both business risk and financing risk", chapters:[4] },
    { sym:"β<sub>D</sub>", name:"Debt beta — small but not zero whenever the debt is risky; setting it to zero inflates βU and everything computed from it", chapters:[4,5] },
    { sym:"β<sub>U</sub>", name:"Unlevered (asset) beta — the beta of the firm's business risk, independent of financing", chapters:[4] },
    { sym:"τ<sub>c</sub>", name:"Corporate tax rate — the size of the interest deduction, and the only channel through which debt affects the WACC", chapters:[7] },
    { sym:"τ<sub>e</sub>", name:"Personal tax rate on equity income (dividends and capital gains)", chapters:[8,16] },
    { sym:"τ<sub>i</sub>", name:"Personal tax rate on interest income — high enough values erase the corporate tax advantage of debt", chapters:[8] },
    { sym:"τ*", name:"Effective tax advantage of debt after personal taxes: 1 − (1 − τc)(1 − τe)/(1 − τi)", chapters:[8] },
    { sym:"V<sup>L</sup>", name:"Levered firm value — what the WACC method and the APV method must both return", chapters:[7,17] },
    { sym:"V<sup>U</sup>", name:"Unlevered firm value — free cash flow discounted at rU, always, in the first step of an APV", chapters:[7,18] },
    { sym:"V", name:"Total market value of the firm, V = E + D — market values throughout, never book values", chapters:[6] },
    { sym:"E", name:"Market value of equity — in the agency chapters, the expected value of max(CF − K, 0)", chapters:[6,9] },
    { sym:"D", name:"Market value of debt — in the agency chapters, the expected value of min(CF, K)", chapters:[6,9] },
    { sym:"D/E", name:"Debt-to-equity ratio — the multiplier in MM II and in every relevering step; confusing it with D/V is the most common slip in this course", chapters:[4,6] },
    { sym:"D/V", name:"Debt-to-value ratio — the weight in the WACC, held constant by the rebalancing assumption", chapters:[4,17] },
    { sym:"d", name:"Target debt-to-value ratio in D<sub>t</sub> = d·V<sub>t</sub><sup>L</sup> — the assumption that forces you to work a valuation backwards from the final period", chapters:[19] },
    { sym:"PV(TS)", name:"Present value of the interest tax shield — the entire difference between levered and unlevered value in this course", chapters:[7,18] },
    { sym:"TS<sub>t</sub>", name:"Interest tax shield in period t, τc·rD·D — based on interest actually paid, so it shrinks as debt amortises", chapters:[7] },
    { sym:"FCF<sub>t</sub>", name:"Unlevered free cash flow in period t — never contains interest; financing enters through the discount rate", chapters:[2,17] },
    { sym:"FCFE", name:"Free cash flow to equity — discount at rE in the flow-to-equity method, and remember it values equity only", chapters:[19] },
    { sym:"EBIT", name:"Earnings before interest and taxes — the starting line of the free cash flow build-up", chapters:[2] },
    { sym:"CapEx", name:"Capital expenditure — subtracted in full in the year it is paid, which is why depreciation has to be added back", chapters:[2] },
    { sym:"NWC", name:"Net working capital — often specified as a percentage of sales, so it grows with the business", chapters:[2] },
    { sym:"ΔNWC", name:"Change in net working capital — subtract the change, not the level; running down inventory releases cash and raises FCF", chapters:[2] },
    { sym:"g", name:"Growth rate of cash flows — must be strictly below the discount rate for a growing perpetuity to converge", chapters:[1,17] },
    { sym:"N<sub>0</sub>", name:"Shares outstanding before a recapitalisation, issue or repurchase", chapters:[6,15] },
    { sym:"P", name:"Share price in the capital-structure and payout chapters; the value of a put option in the option chapters", chapters:[6,15,21] },
    { sym:"n", name:"Shares repurchased in a leveraged recapitalisation, n = D/P — using the wrong P is the standard error here", chapters:[6] },
    { sym:"C", name:"A periodic cash flow in the time-value formulas; the value of a call option in the option chapters", chapters:[1,21] },
    { sym:"K", name:"Face value of debt in the credit and agency chapters; the strike price of an option in the option chapters — deliberately the same symbol, because they are the same thing", chapters:[9,21,24] },
    { sym:"S", name:"Price of the underlying share or asset today", chapters:[21,23] },
    { sym:"S<sub>u</sub>, S<sub>d</sub>", name:"Value of the underlying in the up and down state of a binomial tree", chapters:[22] },
    { sym:"C<sub>u</sub>, C<sub>d</sub>", name:"Option value in the up and down state — the two numbers the hedge ratio is built from", chapters:[22] },
    { sym:"Δ", name:"Replicating share position, the hedge ratio (C<sub>u</sub> − C<sub>d</sub>)/(S<sub>u</sub> − S<sub>d</sub>); equals N(d1) in Black-Scholes", chapters:[22,23] },
    { sym:"B", name:"The borrowing in a replicating portfolio, C = SΔ + B — a negative B means you borrow at the risk-free rate", chapters:[22] },
    { sym:"ρ", name:"Risk-neutral probability — a pricing weight derived from no arbitrage, not a forecast; real probabilities never enter an option price", chapters:[22,25] },
    { sym:"σ", name:"Volatility of the underlying — the only Black-Scholes input that cannot be observed, and the one the comparative-statics questions target", chapters:[23] },
    { sym:"N(d<sub>1</sub>)", name:"Standard normal CDF at d1 — the option's delta, and the term that makes equity beta explode near distress in βE = N(d1)(V/E)βU", chapters:[23,24] },
    { sym:"N(d<sub>2</sub>)", name:"Risk-neutral probability that the option finishes in the money; 1 − N(d2) is the risk-neutral probability of default", chapters:[23,24] },
    { sym:"T", name:"Time to maturity of an option or a bond, in years", chapters:[21,23] },
    { sym:"y", name:"Yield to maturity — a promised return, earned only if the borrower does not default; never use it as an expected return", chapters:[5,24] },
    { sym:"y − r<sub>f</sub>", name:"Credit spread — compensation for expected loss plus the systematic component of default risk, so it exceeds expected loss alone", chapters:[5,24] },
    { sym:"p", name:"Probability of default in the credit chapters; the probability of a state in a real-options decision tree", chapters:[5,25] },
    { sym:"L", name:"Loss given default as a fraction of face value, in rD = y − p·L", chapters:[5] },
    { sym:"CF", name:"The firm's total cash flow in a given state, split between debt and equity — the two pieces must add back to it", chapters:[9] },
    { sym:"α", name:"Fraction of the firm sold to new investors in a Myers-Majluf equity issue, α = I/(E[V | beliefs] + NPV)", chapters:[12] },
    { sym:"I", name:"Required investment outlay — the amount to be raised in Myers-Majluf, and the cost of exercising a real option", chapters:[12,25] },
    { sym:"NPV", name:"Net present value — in real options, always computed state by state before any maximum is taken", chapters:[1,25] },
    { sym:"VOI", name:"Value of perfect information, E[max(0, NPV)] − max(0, E[NPV]) — zero whenever the decision would be the same in every state", chapters:[25] },
    { sym:"ER", name:"Exchange ratio in a stock-financed merger: acquirer shares offered per target share", chapters:[26] },
    { sym:"ER<sub>max</sub>", name:"The exchange ratio at which the acquirer's NPV is exactly zero, (N<sub>A</sub>/N<sub>T</sub>)(T + S)/A — the most the acquirer can afford to offer", chapters:[26] },
    { sym:"x", name:"New acquirer shares issued in a stock swap, x = ER × N<sub>T</sub>", chapters:[26] },
    { sym:"y (mergers)", name:"The target shareholders' fraction of the combined firm after a swap, y = x/(N<sub>A</sub> + x) — what determines who captures the synergy", chapters:[26] },
    { sym:"A, T", name:"Stand-alone market values of the acquirer and the target — pre-announcement values, or the synergy gets counted twice", chapters:[26] },
    { sym:"S (synergy)", name:"Total value created by a merger — the acquirer's NPV and the target's NPV must sum to it", chapters:[26] },
    { sym:"N<sub>A</sub>, N<sub>T</sub>", name:"Shares outstanding of acquirer and target before the deal", chapters:[26] },
    { sym:"P<sub>new</sub>", name:"Share price of the combined firm, (A + T + S)/(N<sub>A</sub> + x)", chapters:[26] },
    { sym:"P<sub>deal</sub>, P<sub>fail</sub>", name:"Target share price if the deal closes and if it collapses — the two ends of the implied-probability calculation", chapters:[26] },
    { sym:"EPS", name:"Earnings per share after a merger — accretion is arithmetic from a low-P/E target, not evidence of value creation", chapters:[26] },
  ],
};
