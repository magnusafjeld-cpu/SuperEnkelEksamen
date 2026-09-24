/* ===================== FIE459 SUSTAINABLE FINANCE · FAGDATA =====================
   Fagteksten er på engelsk, som i FIE402: kurset undervises på engelsk og
   eksamen besvares på engelsk, så begrepene må være kursets egne. Appens
   grensesnitt og studieplanen er på norsk.

   Pensumteksten står IKKE her. Den parses fra FIE459_Manual.html, som bygges av
   fragmentene i fag/fie459/_fragmenter/ med tools/fie459-bygg-manual.py.

   Faget er bevisst kort: én kapittel per forelesning, skrevet for å gi en grei
   forståelse av hvert tema. Eksamen er 3 timers digital skoleeksamen med lukket
   bok, flervalg og sant/usant, 16. desember 2026. Det finnes ingen tidligere
   eksamenssett.

   Kontrakten for innholdet: docs/fie459-forfatterspek.md.
   ============================================================================= */
window.EDU_DATA = window.EDU_DATA || {};

/* ===================== STUDIEPLAN =====================
   8 moduler, fremdriftsstyrt (plan.mode = "modules"): «i dag» er første
   ufullførte modul. Modul 1–6 følger forelesningene, modul 7 er de foreløpige
   kapitlene k10–k13, og modul 8 er repetisjon i eksamensformatet.

   estMinutes settes av tools/rekalibrer-plan.py fie459 etter hva kapitlene
   faktisk inneholder.
   ====================================================== */
window.EDU_DATA.plan = {
  mode: "modules",
  totalDays: 8,
  startDate: "2026-09-24",
  examNote: "3 timer · digital skoleeksamen, lukket bok · flervalg og sant/usant · 16. desember",
  phaseColors: {
    "Grunnlaget": "slate",
    "Etikk og eksternaliteter": "teal",
    "Selskapet": "amber",
    "Investering": "indigo",
    "Resten av kurset": "green",
    "Eksamenstrening": "rose",
  },
  days: [
    { day: 1, phase: "Grunnlaget",
      title: "Kurset, og hva bærekraftig finans er",
      chapters: [0, 1], estMinutes: 85,
      goals: [
        "Vite eksamensformatet: 3 timer, lukket bok, flervalg og sant/usant, på engelsk",
        "Forklare begrepskjeden: stakeholder management settes ut i livet gjennom CSR (selskapet) og SRI (investoren), og ESG måler resultatet",
        "Skille value-motiver fra values-motiver (Starks 2023), og plassere impact, SRI, klassisk ESG og tradisjonell investering på spekteret",
        "Gjengi Schoenmaker & Schramades trapp: finance as usual, SF 1.0, SF 2.0 og SF 3.0",
      ],
      keyConcepts: ["ESG", "CSR", "SRI", "Double materiality", "Value vs values", "SF 1.0–3.0"],
      review: [],
      tasks: [
        { t: "Lær SF-tabellen utenat", sub: "Verdiskaping, rangering av faktorer, optimering og horisont for hver av de fire typene. Den kommer igjen i kapittel 5 og 9.", rute: "#/chapter/1" },
        { t: "Ta quizen på kapittel 0 og 1", sub: "Flervalg og sant/usant, samme format som eksamen", rute: "#/quiz" },
      ],
      milestone: "Kursets ryggrad, SF-tabellen, sitter",
      tip: "Et sant/usant-utsagn tester nesten alltid én distinksjon. Når du leser, legg merke til hvert par som ligner: CSR mot SRI, value mot values, SF 1.0 mot 2.0." },

    { day: 2, phase: "Etikk og eksternaliteter",
      title: "Forretningsetikk",
      chapters: [2], estMinutes: 90,
      goals: [
        "Skille normative teorier (hva som er riktig) fra deskriptive (hvordan beslutninger faktisk tas)",
        "Plassere egoisme, utilitarisme, pliktetikk og rettigheter under etisk absolutisme, og dydsetikk, omsorgsetikk og diskursetikk under relativisme",
        "Gjengi de fire stegene i etisk beslutningstaking og Kohlbergs seks stadier",
        "Kjenne igjen rasjonaliseringstaktikkene og Bénabou og Tiroles tre syn på CSR",
      ],
      keyConcepts: ["Utilitarianism", "Categorical imperative", "Moral intensity", "Cognitive moral development", "Rationalisation", "Delegated philanthropy"],
      review: [0, 1],
      tasks: [
        { t: "Bruk rammeverket på Telenor i Myanmar", sub: "Hvilken etisk teori støtter å bli, og hvilken støtter å selge?", rute: "#/chapter/2" },
        { t: "Ta quizen på kapittel 2", sub: "", rute: "#/quiz" },
      ],
      milestone: "Du kan navngi teorien bak et argument",
      tip: "Konsekvensetikk ser på utfallet, pliktetikk på handlingen selv. Det skillet alene avgjør mange spørsmål." },

    { day: 3, phase: "Etikk og eksternaliteter",
      title: "Eksternaliteter og hvordan de internaliseres",
      chapters: [3], estMinutes: 120,
      goals: [
        "Forklare hvorfor et fritt marked overproduserer når det finnes en negativ eksternalitet",
        "Gjøre rede for kanalene for internalisering og for de tre begrensningene: territorialitet, informasjonsasymmetri og politiske friksjoner",
        "Regne integrated value: F + S + E før og etter en omlegging",
        "Anslå hva en karbonpris gjør med EBIT, avhengig av hvor mye som kan veltes over på kundene",
      ],
      keyConcepts: ["Externality", "Market failure", "Internalisation", "Integrated value", "Stranded assets", "Scenario analysis"],
      review: [1],
      tasks: [
        { t: "Regn Air France-KLM-caset selv", sub: "CO₂-kostnad ved 50, 100 og 200 euro per tonn, mot EBIT", rute: "#/chapter/3" },
        { t: "Ta quizen på kapittel 3", sub: "", rute: "#/quiz" },
      ],
      milestone: "Du kan forklare hvorfor en bedrift internaliserer før staten tvinger den",
      tip: "Internalisering senker gjerne finansiell verdi litt og hever integrated value mye. Det er hele argumentet for SF 2.0." },

    { day: 4, phase: "Selskapet",
      title: "Aksjonærer, interessenter og eierstyring",
      chapters: [4, 5], estMinutes: 145,
      goals: [
        "Stille Friedman mot Freeman, og forklare kritikken av Business Roundtable-erklæringen",
        "Forklare Hart og Zingales: maksimer aksjonærenes velferd, ikke markedsverdien, når sosiale og finansielle virkninger ikke kan skilles",
        "Skille adverse selection fra moral hazard, og voice fra exit",
        "Forklare hvorfor et interessentmål kan øke agentkostnadene, og hva ESG-koblet lederlønn har vist",
      ],
      keyConcepts: ["Shareholder theory", "Stakeholder theory", "Shareholder welfare", "Agency costs", "Voice and exit", "Adaptive markets"],
      review: [1, 3],
      tasks: [
        { t: "Klarna og KI: gjør analysen fra begge sider", sub: "Hva sier aksjonærteorien, hva sier interessentteorien, og hva sa Klarna selv i 2025?", rute: "#/chapter/4" },
        { t: "Ta quizen på kapittel 4 og 5", sub: "", rute: "#/quiz" },
      ],
      milestone: "Du kan argumentere for og mot interessentmodellen",
      tip: "Kritikken av interessentteori er et agentproblem, ikke et etisk argument: et mål som ikke kan måles, kan ikke holde ledelsen ansvarlig." },

    { day: 5, phase: "Selskapet",
      title: "Forretningsmodeller, vesentlighet og rapportering",
      chapters: [6, 7], estMinutes: 150,
      goals: [
        "Analysere en forretningsmodell og verdidriverne: vekst, marginer, kapital og kontantstrøm",
        "Skille finansiell vesentlighet (SASB, ISSB) fra påvirkningsvesentlighet (GRI), og forklare dobbel vesentlighet i CSRD",
        "Gjengi de tre vilkårene for at en aktivitet er taksonomiforenlig",
        "Forklare hvorfor ESG-ratinger spriker, og hva Omnibus-pakken endret",
      ],
      keyConcepts: ["Business model", "Materiality", "Double materiality", "GRI", "TCFD", "EU Taxonomy", "CSRD", "ESG ratings"],
      review: [3, 5],
      tasks: [
        { t: "Oatly: regn DuPont selv", sub: "Margin × omløpshastighet × gearing for 2021 og 2022", rute: "#/chapter/6" },
        { t: "Ta quizen på kapittel 6 og 7", sub: "", rute: "#/quiz" },
      ],
      milestone: "Dobbel vesentlighet og taksonomien sitter",
      tip: "Når et spørsmål nevner investorer og finansiell påvirkning, er det finansiell vesentlighet. Nevner det påvirkning på mennesker og miljø, er det påvirkningsvesentlighet." },

    { day: 6, phase: "Investering",
      title: "Investeringsstrategier og hva ESG gjør med prisene",
      chapters: [8, 9], estMinutes: 135,
      goals: [
        "Skille de seks strategiene: negativ screening, best-in-class, tematisk, ESG-integrasjon, stewardship og impact",
        "Forklare SFDR artikkel 8 og 9, og hvorfor mange fond ble flyttet fra 9 til 8",
        "Gjøre rede for barrierene mot langsiktig verdiskaping og de seks vilkårene for den",
        "Skille forventet fra realisert avkastning på grønne aksjer (Pástor, Stambaugh og Taylor 2022)",
      ],
      keyConcepts: ["Investment chain", "SFDR", "Stewardship", "ESG integration", "Cash-flow channel", "Cost-of-capital channel", "Greenium", "Expected vs realised returns"],
      review: [1, 7],
      tasks: [
        { t: "Koble porteføljemålene til SF-tabellen", sub: "Max FV, Max FV s.t. SEV, Max IV, Max SEV s.t. FV: hvilken strategi og hvilken SF-type hører til hvert?", rute: "#/chapter/9" },
        { t: "Ta quizen på kapittel 8 og 9", sub: "", rute: "#/quiz" },
      ],
      milestone: "Du vet hvorfor grønne aksjer kan ha slått brune uten å ha høyere forventet avkastning",
      tip: "Dette er også stoffet gruppeoppgaven bygger på: strategien fra kapittel 8, og spørsmålet om historien allerede er priset fra kapittel 9." },

    { day: 7, phase: "Resten av kurset",
      title: "Obligasjoner, bank, forsikring og myndighetenes rolle",
      chapters: [10, 11, 12, 13], estMinutes: 110,
      goals: [
        "Skille use-of-proceeds-obligasjoner fra sustainability-linked bonds",
        "Skille fysisk risiko fra overgangsrisiko i en bankportefølje",
        "Forklare forsikringens to sider: underwriting og investering",
        "Forklare myndighetenes rolle og hva integrated thinking betyr",
      ],
      keyConcepts: ["Green bond", "Sustainability-linked bond", "Physical risk", "Transition risk", "Protection gap", "Integrated thinking"],
      review: [8, 9],
      tasks: [
        { t: "Les de foreløpige kapitlene", sub: "Skrevet før foilene kom. Ta dem som et kart, og les dem igjen når forelesningen er holdt.", rute: "#/chapter/10" },
        { t: "Ta quizen på kapittel 10–13", sub: "", rute: "#/quiz" },
      ],
      milestone: "Du har sett hele kurset én gang",
      tip: "Kapittel 10–13 oppdateres når forelesningene er holdt. Begrepene holder, men vektleggingen er en gjetning." },

    { day: 8, phase: "Eksamenstrening",
      title: "Repetisjon i eksamensformatet",
      chapters: [], estMinutes: 90,
      goals: [
        "Ta hele quizen på tvers av kapitlene, og gå tilbake til kapitlene der du bommer",
        "Gå gjennom flashcards til de sitter",
        "Øve på sant/usant: finn den ene distinksjonen utsagnet tester før du svarer",
      ],
      keyConcepts: ["Repetisjon", "Sant/usant", "Flervalg"],
      review: [1, 3, 5, 7, 9],
      tasks: [
        { t: "Ta quiz på alle kapitler", sub: "", rute: "#/quiz" },
        { t: "Gå gjennom flashcards", sub: "", rute: "#/flashcards" },
      ],
      milestone: "Klar for eksamen",
      tip: "Lukket bok: det som sitter er det du kan bruke. Skill parene som ligner, én gang til." },
  ],
};

/* ===================== FLASHCARDS =====================
   Skrevne kort per kapittel, i tre kortstokker som FIE402: begrep, mekanisme og
   intuisjon. Første versjon ble flettet inn fra agentutkast; nå er denne blokken
   kilden. id-ene er lagringsnøkler og endres aldri.
   ====================================================== */
/* <FLASHCARDS> */
window.EDU_DATA.flashcards = [
  {
    "id": "fc0-1",
    "ch": 0,
    "deck": "begrep",
    "front": "FIE459 exam format",
    "back": "<b>3-hour closed-book digital school exam</b>, 16 December 2026, 70% of the grade.<br>Multiple-choice and true/false questions, answered in English.<br>Focus: economic intuition, not calculation."
  },
  {
    "id": "fc0-2",
    "ch": 0,
    "deck": "begrep",
    "front": "The group project in brief",
    "back": "Groups of five choose <b>one of five industries</b>, <b>one strategy from Lecture 8</b> and <b>five listed stocks</b> with weights summing to 100% (no short selling), and judge whether the sustainability story is <b>already priced</b> (Lecture 9).<br>Max 5 pages, deadline 12 November, 30% of the grade.<br>Points: 20 mandate and strategy, 30 stocks, 15 evidence, 20 portfolio, 15 pricing and reflection."
  },
  {
    "id": "fc0-3",
    "ch": 0,
    "deck": "intuisjon",
    "front": "How is a false true/false statement usually built?",
    "back": "It is correct except for <b>one swapped element</b>: the wrong side of a distinction (outside-in vs inside-out, action vs measurement, moral hazard vs adverse selection) or an absolute word such as «always» or «only».<br>Check every clause."
  },
  {
    "id": "fc1-1",
    "ch": 1,
    "deck": "begrep",
    "front": "Sustainable finance: the two definitions",
    "back": "<b>Schoenmaker and Schramade (2019):</b> how finance (investing and lending) interacts with economic, social and environmental issues. Broad and two-way.<br><b>European Commission:</b> taking ESG considerations into account in investment decisions, leading to more long-term investment in sustainable activities. A process with an intended result."
  },
  {
    "id": "fc1-2",
    "ch": 1,
    "deck": "mekanisme",
    "front": "The concept chain: how are stakeholders, CSR, SRI and ESG related?",
    "back": "Sustainability requires taking care of stakeholders → <b>stakeholder management</b> → put into practice through <b>CSR</b> (corporate side) and <b>SRI</b> (investor side) → outcomes measured by <b>ESG metrics</b>.<br>CSR and SRI are actions; ESG is measurement. Most empirical problems arise at the measurement step."
  },
  {
    "id": "fc1-3",
    "ch": 1,
    "deck": "begrep",
    "front": "Double materiality",
    "back": "<b>Financial materiality</b> (outside-in): how sustainability issues affect the firm. Primary audience: investors.<br><b>Impact materiality</b> (inside-out): how the firm affects people and planet.<br>An impact can become financially material over time."
  },
  {
    "id": "fc1-4",
    "ch": 1,
    "deck": "begrep",
    "front": "Value versus values (Starks 2023)",
    "back": "<b>Value:</b> ESG matters because it is financially material to risk and return.<br><b>Values:</b> nonpecuniary preferences, e.g. not wanting to finance or profit from objectionable firms.<br>Spectrum from values towards value: impact investing → SRI → classic ESG → traditional investing."
  },
  {
    "id": "fc1-5",
    "ch": 1,
    "deck": "intuisjon",
    "front": "Why is the evidence on whether ESG «pays» so mixed?",
    "back": "Studies pool funds with different motives. A <b>values</b> fund may knowingly accept lower returns; a <b>value</b> fund aims to earn more. The average describes neither, so Starks wants the motives separated before performance is judged.<br>Similarly, most ESG ratings assess business processes and risk (what value investors want), not outcomes for society (what values investors want)."
  },
  {
    "id": "fc1-6",
    "ch": 1,
    "deck": "begrep",
    "front": "Schoenmaker and Schramade: finance as usual, SF 1.0, 2.0 and 3.0",
    "back": "<b>Finance as usual:</b> max F, short term.<br><b>SF 1.0:</b> max F subject to S and E, short term.<br><b>SF 2.0:</b> optimise I = F + S + E (triple bottom line), medium term.<br><b>SF 3.0:</b> optimise S and E subject to F (common good), long term."
  },
  {
    "id": "fc1-7",
    "ch": 1,
    "deck": "begrep",
    "front": "Adverse selection vs moral hazard",
    "back": "Both stem from information asymmetry in the principal–agent problem.<br><b>Adverse selection:</b> taking advantage of undisclosed information in a contract.<br><b>Moral hazard:</b> one party takes on extra risk that hurts the other.<br>Remedies: governance, disclosure, regulation, auditing, ratings (including ESG ratings)."
  },
  {
    "id": "fc2-1",
    "ch": 2,
    "deck": "begrep",
    "front": "Normative vs descriptive ethical theories",
    "back": "<b>Normative:</b> what is right or wrong. Absolutism (eternal, universal principles: egoism, utilitarianism, duty, rights and justice) vs relativism (context-dependent: virtue, care, discourse, postmodern ethics).<br><b>Descriptive:</b> how ethical decisions are actually made, and which individual and situational factors influence them."
  },
  {
    "id": "fc2-2",
    "ch": 2,
    "deck": "begrep",
    "front": "Consequentialist vs non-consequentialist theories",
    "back": "<b>Consequentialist</b> (judge by outcomes): ethical egoism (one's own interest), utilitarianism (collective welfare; act or rule).<br><b>Non-consequentialist</b> (judge by principles): ethics of duty (Kant: act only on principles that could become universal law), rights and justice."
  },
  {
    "id": "fc2-3",
    "ch": 2,
    "deck": "mekanisme",
    "front": "The four stages of ethical decision-making (Rest 1986, Jones 1991)",
    "back": "Recognise the moral issue → make a moral judgement → establish moral intent → engage in moral behaviour.<br>Individual and situational factors act on every stage, so the chain can break anywhere."
  },
  {
    "id": "fc2-4",
    "ch": 2,
    "deck": "begrep",
    "front": "Kohlberg's stages of cognitive moral development",
    "back": "<b>Pre-conventional:</b> 1 obedience and punishment, 2 instrumental purpose and exchange.<br><b>Conventional:</b> 3 interpersonal accord and conformity, 4 social accord and system maintenance.<br><b>Post-conventional:</b> 5 social contract and individual rights, 6 universal ethical principles."
  },
  {
    "id": "fc2-5",
    "ch": 2,
    "deck": "begrep",
    "front": "Moral intensity: the six factors (Jones 1991)",
    "back": "Magnitude of consequences, social consensus, probability of effect, temporal immediacy, proximity, concentration of effect.<br>An issue-related situational factor: low intensity makes a moral issue less likely to be recognised at all."
  },
  {
    "id": "fc2-6",
    "ch": 2,
    "deck": "begrep",
    "front": "The six rationalisation tactics",
    "back": "<b>Denial of responsibility</b> («I had no choice»), <b>denial of injury</b> («no one lost anything»), <b>denial of victim</b> («they knew the risks»), <b>social weighting</b> («others are worse; who are you to judge?»), <b>appeal to higher loyalties</b> («I did it for the team»), <b>metaphor of the ledger</b> («I've earned it»)."
  },
  {
    "id": "fc2-7",
    "ch": 2,
    "deck": "intuisjon",
    "front": "Bénabou and Tirole (2010): which view of CSR is an agency problem?",
    "back": "<b>Insider-initiated corporate philanthropy</b>: managers spend other people's money on their own values.<br>By contrast, <b>win-win</b> CSR pays for itself (reputation, employee retention, lower risk), and <b>delegated philanthropy</b> carries out stakeholders' own prosocial preferences."
  },
  {
    "id": "fc3-1",
    "ch": 3,
    "deck": "begrep",
    "front": "Externality",
    "back": "A positive or negative effect on agents <b>not involved</b> in the production or consumption of the product or service. Because prices leave it out, the free market allocates resources at a socially suboptimal level: a <b>market failure</b>."
  },
  {
    "id": "fc3-2",
    "ch": 3,
    "deck": "mekanisme",
    "front": "Why does a negative production externality lead to overproduction?",
    "back": "Supply reflects only the <b>marginal production cost</b>; the <b>marginal societal cost</b> lies above it. The market clears where demand meets supply, so Q<sub>e</sub> &gt; Q<sub>so</sub> and P<sub>e</sub> &lt; P<sub>so</sub>: too much, too cheap."
  },
  {
    "id": "fc3-3",
    "ch": 3,
    "deck": "intuisjon",
    "front": "Two-firm example: why does the free market choose the polluting option?",
    "back": "Option 1 earns a firm 100 − 20 = 80 but costs the other firm 10; option 2 earns 75 and harms no one. Each firm picks option 1 (80 &gt; 75).<br>Social welfare: 2 × (100 − 20 − 10) = 140 against 2 × 75 = 150. The 10 lands outside the decision, so nobody counts it."
  },
  {
    "id": "fc3-4",
    "ch": 3,
    "deck": "begrep",
    "front": "Internalisation",
    "back": "Bringing the costs or benefits of external effects into the decisions and prices of those responsible. Channels: <b>government</b> (taxes, quotas, subsidies), <b>civil society</b> (media), <b>investors</b> (strategy, engagement), <b>corporates</b>, <b>consumers</b>. Innovation by competitors can also force it."
  },
  {
    "id": "fc3-5",
    "ch": 3,
    "deck": "mekanisme",
    "front": "Three limitations to internalising externalities",
    "back": "<b>Territoriality of jurisdiction:</b> production moves to weaker regimes (California cap-and-trade; Bartram, Hou &amp; Kim 2022).<br><b>Information asymmetry, greenwashing:</b> e.g. selling polluting assets to less monitored private firms (Duchin, Gao &amp; Xu 2024).<br><b>Political frictions:</b> policy uncertainty and lobbying (USD 277k anti- vs 185k pro-climate a year; Leippold, Sautner &amp; Yu 2024)."
  },
  {
    "id": "fc3-6",
    "ch": 3,
    "deck": "begrep",
    "front": "Integrated value and stranded assets",
    "back": "I = F + S + E. Original process: F 15, S −3, E −3, so I = 9. Optimised: F 14, S −1, E −1, so I* = 12. Internalising costs 1 in F but adds 3 in I.<br>Firms may do it early to avoid <b>stranded assets</b> once government, employees or the public make them pay."
  },
  {
    "id": "fc3-7",
    "ch": 3,
    "deck": "mekanisme",
    "front": "Air France-KLM: carbon charge and pass-on",
    "back": "Charge = carbon price × emissions: at EUR 100/t, 32.7 million t gives about EUR 3.3 billion, more than twice 2017 EBIT of EUR 1,423 million.<br>EBIT hit = charge × (1 − pass-on): the full charge at 0%, zero at 100%. Pass-on is likely low in a price-competitive industry."
  },
  {
    "id": "fc4-1",
    "ch": 4,
    "deck": "begrep",
    "front": "Shareholder theory vs stakeholder theory",
    "back": "<b>Shareholder theory</b> (Friedman 1970): the social responsibility of business is to increase its profits, within law and ethical custom.<br><b>Stakeholder theory</b> (Freeman): the firm is also responsible to employees, creditors, customers, suppliers, the community and the environment. The Business Roundtable statement (2019, about 200 CEOs): serve all stakeholders."
  },
  {
    "id": "fc4-2",
    "ch": 4,
    "deck": "mekanisme",
    "front": "Why do critics say a stakeholder objective raises agency costs?",
    "back": "<b>Jensen (2002):</b> managers get to design their own objective function.<br><b>Mehrotra &amp; Morck (2017):</b> shareholder value is a bright line; stakeholder welfare an ill-defined charge.<br><b>Bebchuk &amp; Tallarita (2020):</b> no answer to who counts, trade-offs overlooked, no aggregation method, so everything is left to managers' discretion."
  },
  {
    "id": "fc4-3",
    "ch": 4,
    "deck": "intuisjon",
    "front": "Why did the Harvard Law School Forum call the Business Roundtable statement legally incorrect and unnecessary?",
    "back": "<b>Incorrect:</b> under Delaware law directors owe fiduciary duties to the shareholders.<br><b>Unnecessary:</b> the business judgement rule already protects directors' decisions if they meet their duties of care and loyalty, so they can pursue the statement's aims without it."
  },
  {
    "id": "fc4-4",
    "ch": 4,
    "deck": "begrep",
    "front": "Hart &amp; Zingales (2017): shareholder welfare vs market value",
    "back": "Shareholders care about money <i>and</i> values, so firms should maximise shareholder <b>welfare</b>. Friedman's separation (firms make money, people do good) holds only if the activity is <b>separable</b> (charity) or government fully internalises the externality. When profit and damage are <b>non-separable</b>, the firm can avoid harm that shareholders cannot undo. Remedy: shareholder votes on broad policy."
  },
  {
    "id": "fc4-5",
    "ch": 4,
    "deck": "mekanisme",
    "front": "Amoral drift",
    "back": "Dispersed shareholders tender to a bidder who will turn a clean firm dirty, because none is pivotal and so none feels responsible. The reverse deal (buy a dirty firm, clean it up) loses money, so nobody makes it. Unrestricted, public firms drift towards <b>social indifference</b>. A vote fixes it, because a potentially pivotal voter feels responsible."
  },
  {
    "id": "fc4-6",
    "ch": 4,
    "deck": "begrep",
    "front": "Edmans (2020): grow the pie",
    "back": "<b>Pie-splitting</b> mentality: what stakeholders gain, shareholders lose. <b>Pie-growing</b> mentality: companies can deliver both purpose and profit.<br>Purpose = the answer to <i>how is the world a better place by your company being here?</i>"
  },
  {
    "id": "fc4-7",
    "ch": 4,
    "deck": "intuisjon",
    "front": "How do supply chains carry ESG risk to a firm?",
    "back": "Nestlé stopped buying Cargill soy it could not trace to specific plantations (deforestation risk). Heat exposure hurts a firm's performance and its customers' operating income. After E&amp;S incidents at foreign suppliers, US firms cut imports by around 30% (Bisetti et al. 2024). The lecture points to the EU Corporate Sustainability Due Diligence Directive."
  },
  {
    "id": "fc5-1",
    "ch": 5,
    "deck": "begrep",
    "front": "Agency costs, and why the principal–agent problem arises",
    "back": "<b>Agency costs:</b> what owners (principals) incur to make managers (agents) act in their interest.<br>The problem arises because the agent has <b>superior information</b>, chooses her behaviour <b>after the contract</b> and can conceal the outcome, and <b>cannot be monitored</b> efficiently or costlessly."
  },
  {
    "id": "fc5-2",
    "ch": 5,
    "deck": "begrep",
    "front": "Adverse selection vs moral hazard",
    "back": "<b>Adverse selection:</b> before the transaction; hidden information is exploited (the riskiest borrowers seek loans; Akerlof's lemons).<br><b>Moral hazard:</b> after the transaction; behaviour changes because others bear the risk (debt overhang, asset substitution)."
  },
  {
    "id": "fc5-3",
    "ch": 5,
    "deck": "mekanisme",
    "front": "Voice vs exit",
    "back": "<b>Voice:</b> voting at the annual meeting and engagement ('jawboning').<br><b>Exit:</b> selling. It hurts a value-destroying manager ex post through a lower share price, and the <b>threat</b> of it makes him maximise value ex ante."
  },
  {
    "id": "fc5-4",
    "ch": 5,
    "deck": "begrep",
    "front": "Corporate governance",
    "back": "The system of controls, regulations and incentives that minimises agency costs between managers and investors and prevents corporate fraud, without unduly burdening managers with the firm's risk. OECD: it builds <b>trust, transparency and accountability</b> for long-term investment, financial stability and business integrity."
  },
  {
    "id": "fc5-5",
    "ch": 5,
    "deck": "mekanisme",
    "front": "Efficient vs adaptive markets hypothesis",
    "back": "<b>EMH (Fama 1970):</b> prices incorporate all relevant information and reflect long-term fundamental value.<br><b>AMH (Lo 2017):</b> efficiency depends on the number and nature of market participants adapting to a changing environment. With few groups or a new risk, markets are less efficient, so <b>carbon may not yet be fully priced</b>."
  },
  {
    "id": "fc5-6",
    "ch": 5,
    "deck": "intuisjon",
    "front": "Governance challenges of SF 1.0 vs SF 2.0",
    "back": "<b>SF 1.0:</b> managers less accountable (several objectives are hard to measure and control); conflicts between shareholders and stakeholders unresolved; S and E hard to measure.<br><b>SF 2.0:</b> how to balance all stakeholders; more subjectivity, so potentially higher agency costs; how to measure integrated value.<br>The broader the objective, the harder it is to hold managers to it."
  },
  {
    "id": "fc5-7",
    "ch": 5,
    "deck": "intuisjon",
    "front": "Does ESG-linked executive pay work?",
    "back": "Evidence: a <b>weak, non-causal</b> correlation between ESG pay and ESG performance. Concerns: short-term tactical targets, vague discretionary measures, low transparency.<br>Starbucks's fix: sustainability moved from the annual bonus to a <b>three-year modifier</b> of performance-based equity awards."
  },
  {
    "id": "fc6-1",
    "ch": 6,
    "deck": "begrep",
    "front": "Business model: definition and three components",
    "back": "How a firm <b>creates, delivers and captures value</b> (Osterwalder and Pigneur, 2010).<br>Johnson et al. (2008): <b>customer value proposition</b> (does a job alternatives do not), <b>profit formula</b> (revenue model, cost structure, margins, inventory turnover), <b>key resources and processes</b> (people, products, facilities, equipment, brand)."
  },
  {
    "id": "fc6-2",
    "ch": 6,
    "deck": "begrep",
    "front": "Intangible assets vs intangible resources",
    "back": "<b>Intangible assets</b> (e.g. goodwill) are on the balance sheet. <b>Intangible resources</b> (e.g. human capital) are not.<br>Goodwill = acquisition price above the book value of the assets; not necessarily a good measure of intangible resources.<br>Haskel and Westlake (2017): intangibles are sunk costs, generate spillovers, are often scalable and have synergies."
  },
  {
    "id": "fc6-3",
    "ch": 6,
    "deck": "mekanisme",
    "front": "The DuPont formula, and what Oatly's 2022 numbers show",
    "back": "ROE = (net profit / sales) × (sales / assets) × (assets / equity) = <b>net profit margin × asset turnover × financial leverage</b>.<br>Oatly 2022: −57% × 0.58 × 1.5 = −50%.<br>0.58 is <b>asset turnover</b>, not a return. With a negative margin, higher turnover and leverage make ROE more negative: the margin is the root problem."
  },
  {
    "id": "fc6-4",
    "ch": 6,
    "deck": "begrep",
    "front": "Financial vs impact vs double materiality",
    "back": "<b>Financial</b> (SASB): information reasonably likely to be important to investors. Outside-in.<br><b>Impact</b> (GRI): topics that affect economic, environmental and social value for the firm, its stakeholders and society. Inside-out.<br><b>Double</b>: both lenses; an issue is material if either applies."
  },
  {
    "id": "fc6-5",
    "ch": 6,
    "deck": "intuisjon",
    "front": "Does good performance on every ESG issue pay?",
    "back": "No. Khan, Serafeim and Yoon (2016): firms that perform well on <b>material</b> issues outperform; performance on <b>immaterial</b> issues does not matter.<br>And materiality moves: issues can become financially material over time (Rogers and Serafeim, pathways to materiality)."
  },
  {
    "id": "fc6-6",
    "ch": 6,
    "deck": "begrep",
    "front": "The three impact criteria",
    "back": "<b>Material:</b> relevant to value drivers (sales, profits, investment, cost of capital).<br><b>Intentional:</b> a deliberate choice, part of strategy and purpose.<br><b>Transformational:</b> drives major change for the better through business model, technology, scale or standards."
  },
  {
    "id": "fc6-7",
    "ch": 6,
    "deck": "begrep",
    "front": "Seven guidelines for long-term value creation (Schoenmaker and Schramade, 2019)",
    "back": "1. Make purpose a key part of strategy.<br>2. Integrate sustainability and externalities in all functions.<br>3. Communicate long-term goals to all stakeholders.<br>4. Deliver on what you promise.<br>5. Build long-term intangibles for transformational change.<br>6. Measure performance on the long term and on meeting the purpose.<br>7. Long-term incentives; <b>get rid of short-term variable pay</b>."
  },
  {
    "id": "fc7-1",
    "ch": 7,
    "deck": "begrep",
    "front": "Who is the report for? GRI vs SASB, ISSB and TCFD vs CSRD",
    "back": "<b>GRI</b>: impact materiality (inside-out), for all stakeholders.<br><b>SASB, ISSB, TCFD</b>: financial materiality (outside-in), for investors.<br><b>CSRD/ESRS</b>: double materiality, both lenses at once."
  },
  {
    "id": "fc7-2",
    "ch": 7,
    "deck": "begrep",
    "front": "The six capitals of Integrated Reporting",
    "back": "Financial, manufactured, intellectual, human, social and relationship, natural.<br>Integrated Reporting widens reporting from the first two to all six.<br>Evidence: it beats no ESG reporting and ESG reporting in the annual report, but switching from a stand-alone ESG report brings no benefit."
  },
  {
    "id": "fc7-3",
    "ch": 7,
    "deck": "begrep",
    "front": "TCFD's four pillars",
    "back": "<b>Governance:</b> board oversight and management's role.<br><b>Strategy:</b> impact of climate risks and opportunities; resilience under scenarios, including 2°C or lower.<br><b>Risk management:</b> how climate risks are identified, assessed and managed.<br><b>Metrics and targets:</b> Scope 1, 2 and, if appropriate, 3 emissions; targets.<br>Investor-focused, disclosed in annual financial filings."
  },
  {
    "id": "fc7-4",
    "ch": 7,
    "deck": "mekanisme",
    "front": "When is an economic activity taxonomy-aligned?",
    "back": "It must pass all three tests:<br>1. <b>Substantial contribution</b> to at least one of six environmental objectives.<br>2. <b>Do no significant harm</b> to the other five.<br>3. <b>Minimum safeguards</b> (OECD Guidelines, UN Guiding Principles).<br>Measured by technical screening criteria. Objectives: climate mitigation, climate adaptation, water and marine resources, circular economy, pollution prevention and control, biodiversity and ecosystems."
  },
  {
    "id": "fc7-5",
    "ch": 7,
    "deck": "begrep",
    "front": "NFRD, CSRD, ESRS and the Omnibus",
    "back": "NFRD (about 12,000 companies) was replaced by <b>CSRD</b> (about 50,000), reporting under <b>ESRS</b> with double materiality and IROs (impacts, risks, opportunities).<br><b>Omnibus</b> (26 February 2025): scope narrowed to at least 1,000 employees and net turnover above EUR 450m, from financial year 2027. The Commission estimates 80% of previously covered companies fall out."
  },
  {
    "id": "fc7-6",
    "ch": 7,
    "deck": "intuisjon",
    "front": "Why do ESG ratings disagree, and does more disclosure fix it?",
    "back": "Companies report in varied, inconsistent ways, and <b>benchmarking</b> (the choice of peers) drives the ranking.<br>Kotsantonis (2019): disagreement among data providers is large and <b>increases</b> with the quantity of public information. More data does not bring more agreement."
  },
  {
    "id": "fc7-7",
    "ch": 7,
    "deck": "intuisjon",
    "front": "Does a low carbon footprint mean low climate risk?",
    "back": "No (PwC guest lecture). A firm's carbon footprint is irrelevant to its exposure to <b>physical</b> climate risk, which arrives through own operations, supply chains and customer markets.<br>Climate risk is a today issue: global natural-disaster losses were estimated at USD 417 billion in 2024."
  },
  {
    "id": "fc8-1",
    "ch": 8,
    "deck": "begrep",
    "front": "The investment chain",
    "back": "<b>Beneficiaries/clients</b> → <b>asset owners</b> (pension funds, insurers, investment funds) → <b>asset managers</b> → <b>companies</b> (shares and bonds).<br>Each link is a principal–agent relationship with its own horizon and incentives, which is why long chains are a barrier to sustainability."
  },
  {
    "id": "fc8-2",
    "ch": 8,
    "deck": "begrep",
    "front": "SFDR: Article 8 versus Article 9",
    "back": "<b>Article 8:</b> promotes environmental or social characteristics (typically exclusions + ESG integration + engagement).<br><b>Article 9:</b> sustainable investment is the objective, with do no significant harm and good governance (often thematic or impact).<br>Article 9 is the stricter claim; many funds moved from 9 to 8 to avoid greenwashing accusations."
  },
  {
    "id": "fc8-3",
    "ch": 8,
    "deck": "intuisjon",
    "front": "Can a best-in-class ESG fund hold an oil company?",
    "back": "Yes. Best-in-class ranks firms <i>within</i> each sector and keeps those above a hurdle, so the best oil producer can qualify.<br>Excluding the whole sector would be <b>negative screening</b>; picking firms top-down from a trend would be <b>thematic investing</b>."
  },
  {
    "id": "fc8-4",
    "ch": 8,
    "deck": "mekanisme",
    "front": "Why can an ESG constraint never raise the maximum Sharpe ratio?",
    "back": "A constraint shrinks the menu of portfolios, and the best on a smaller menu cannot beat the best on the full menu.<br><b>Not binding:</b> no cost. <b>Binding:</b> lower return or more risk.<br>This is the ESG-efficient frontier (Pedersen, Fitzgibbons and Pomorski 2021)."
  },
  {
    "id": "fc8-5",
    "ch": 8,
    "deck": "mekanisme",
    "front": "Overreliance on market metrics: the three layers",
    "back": "<b>Pricing:</b> the EMH says everything is priced, so invest passively.<br><b>Allocation:</b> MPT and CAPM measure risk by past volatility, so diversify.<br><b>Performance:</b> benchmarking to a market index.<br>Result: no role for E and S, and a passive investor can vote but cannot exit."
  },
  {
    "id": "fc8-6",
    "ch": 8,
    "deck": "begrep",
    "front": "Limits of ESG tools (ratings and indices)",
    "back": "<b>Add-ons</b> that do not address core issues.<br><b>Design limits:</b> little focus on materiality, reported data and policies only, industry-neutral, operations rather than products.<br><b>More problems:</b> bias to large companies, intuitively wrong scores, failure to spot material weaknesses."
  },
  {
    "id": "fc8-7",
    "ch": 8,
    "deck": "begrep",
    "front": "The six conditions for long-term value creation (LTVC)",
    "back": "1. Long investment horizons<br>2. Active management in a concentrated portfolio<br>3. Effective engagement<br>4. Performance analysis of value added in the real economy<br>5. Long-term alignment of the mandate between asset owner and manager<br>6. Keep the investment chain short"
  },
  {
    "id": "fc9-1",
    "ch": 9,
    "deck": "begrep",
    "front": "The two channels from ESG to firm value",
    "back": "<b>Cash-flow channel:</b> revenues, costs (including litigation), capex, stranded assets.<br><b>Cost-of-capital channel:</b> the discount rate. Evidence: better CSR goes with a lower cost of capital and better access to finance."
  },
  {
    "id": "fc9-2",
    "ch": 9,
    "deck": "mekanisme",
    "front": "Why should green assets have lower expected returns than brown?",
    "back": "<b>Taste premium:</b> investors like green, so demand pushes prices up and returns down.<br><b>Risk premium:</b> green assets hedge climate risk, so they are safer and earn less.<br>(Pástor, Stambaugh and Taylor 2022)"
  },
  {
    "id": "fc9-3",
    "ch": 9,
    "deck": "intuisjon",
    "front": "Green stocks beat brown by 174% cumulatively. Does green have higher expected returns?",
    "back": "No. Realised return = expected return + surprise. Climate concerns rose <i>unexpectedly</i> and repriced green upwards; purged of those shocks, green-minus-brown is essentially flat.<br>After the repricing, green's expected return is <b>lower</b>. That is the question behind «is the sustainability story already priced?»"
  },
  {
    "id": "fc9-4",
    "ch": 9,
    "deck": "begrep",
    "front": "The four portfolio objectives (Schoenmaker and Schramade)",
    "back": "<b>Max FV:</b> risk/return optimisation, finance as usual<br><b>Max FV s.t. SEV ≥ min:</b> exclusionary screening, SF 1.0<br><b>Max IV = FV + SEV:</b> ESG integration, SF 2.0<br><b>Max SEV s.t. FV ≥ min:</b> impact investing, SF 3.0"
  },
  {
    "id": "fc9-5",
    "ch": 9,
    "deck": "begrep",
    "front": "Is ESG a systematic factor?",
    "back": "Three tests (Research Affiliates): grounded in a deep literature, robust across definitions, robust across geographies.<br>Evidence is mixed (some studies: ESG adds to returns; others: it detracts), with no agreed risk or behavioural explanation. Europe 2009–2020 long-short: ESG −0.1% a year, nothing significant."
  },
  {
    "id": "fc9-6",
    "ch": 9,
    "deck": "mekanisme",
    "front": "The «washing machine» (Gollier and Pouget 2014)",
    "back": "A large activist investor buys non-responsible firms and makes them responsible, earning positive abnormal returns as the discount disappears.<br>Needs a <b>long horizon</b> and a <b>credible pro-social orientation</b>. The other channel is voting with your feet, which raises polluters' cost of capital."
  },
  {
    "id": "fc9-7",
    "ch": 9,
    "deck": "intuisjon",
    "front": "Does divesting from low-ESG energy firms help the green transition?",
    "back": "Not necessarily. Cohen, Gurun and Nguyen (2020): oil, gas and energy firms, low-ESG and often excluded from ESG funds, produce more and higher-quality green patents.<br>Blanket exclusion can starve key green innovators; reward-based incentives may work better."
  },
  {
    "id": "fc10-1",
    "ch": 10,
    "deck": "begrep",
    "front": "Use-of-proceeds bond (green, social, sustainability)",
    "back": "A bond whose money is <b>earmarked</b> for eligible projects: green (renewables, efficiency, clean transport), social (affordable housing, health, education) or a mix of both (sustainability bond).<br>Usually still a claim on the whole issuer, so the credit risk is the <b>issuer's</b>, not the project's."
  },
  {
    "id": "fc10-2",
    "ch": 10,
    "deck": "mekanisme",
    "front": "How does a sustainability-linked bond work?",
    "back": "The proceeds are free to use (general corporate purposes). The issuer sets <b>KPIs</b> and <b>sustainability performance targets</b>; if a target is missed by the observation date, the coupon usually <b>steps up</b>.<br>Weak spots: easy targets, small step-ups, late test dates."
  },
  {
    "id": "fc10-3",
    "ch": 10,
    "deck": "intuisjon",
    "front": "Why is ESG mainly a downside-risk issue for bondholders?",
    "back": "Debt has an <b>asymmetric payoff</b>: capped upside (coupons and principal), full downside in default. ESG matters when it raises the probability of default or lowers recovery, and most for <b>long maturities</b> and <b>weak credit</b>."
  },
  {
    "id": "fc10-4",
    "ch": 10,
    "deck": "begrep",
    "front": "Greenium",
    "back": "The <b>lower yield</b> on a green bond than on an otherwise identical conventional bond from the same issuer.<br>Both carry the same credit risk, so the greenium reflects investor demand for the label (taste), not lower default risk."
  },
  {
    "id": "fc11-1",
    "ch": 11,
    "deck": "begrep",
    "front": "Physical risk vs transition risk",
    "back": "<b>Physical</b>: damage from climate change itself, acute (floods, storms, wildfires) or chronic (heat, drought, sea-level rise).<br><b>Transition</b>: losses from the move to a low-carbon economy: policy and carbon prices, technology, consumer preferences, litigation.<br>They trade off across NGFS scenarios: a hot house world means high physical and low transition risk."
  },
  {
    "id": "fc11-2",
    "ch": 11,
    "deck": "begrep",
    "front": "Financed emissions",
    "back": "A bank's real footprint: the emissions of the firms it finances, attributed to the bank in proportion to its share of their financing. Far larger than the emissions from its own offices."
  },
  {
    "id": "fc11-3",
    "ch": 11,
    "deck": "mekanisme",
    "front": "How does a carbon price reach a bank's loan book?",
    "back": "Carbon price → borrower's costs rise → cash flows fall if the cost cannot be passed on → higher <b>probability of default</b>. A stranded plant as collateral → higher <b>loss given default</b>.<br>Result: higher expected losses, provisions, capital and loan prices. Climate risk drives existing credit risk rather than forming a new category."
  },
  {
    "id": "fc11-4",
    "ch": 11,
    "deck": "intuisjon",
    "front": "Why can dropping polluting clients be paper decarbonisation?",
    "back": "The bank's financed emissions fall, but the plant keeps running if another, often less-monitored, lender finances it, so real emissions may not fall at all. Financing a credible transition plan can cut more."
  },
  {
    "id": "fc12-1",
    "ch": 12,
    "deck": "begrep",
    "front": "Underwriting side vs investing side of an insurer",
    "back": "<b>Underwriting</b> (liabilities): pricing and carrying risk in return for premiums; hit by physical risk through claims.<br><b>Investing</b> (assets): premiums invested until claims are paid; hit by transition risk through holdings that strand."
  },
  {
    "id": "fc12-2",
    "ch": 12,
    "deck": "begrep",
    "front": "Protection gap",
    "back": "The part of economic losses from disasters that is <b>not insured</b>. It widens when cover becomes unaffordable or unavailable, and the loss then falls on households, firms and ultimately taxpayers.<br>Not the same as premiums minus claims."
  },
  {
    "id": "fc12-3",
    "ch": 12,
    "deck": "mekanisme",
    "front": "Why does climate change strain insurability?",
    "back": "An insurable risk needs estimable losses, many independent policyholders and affordable premiums. Climate change strains all three: the <b>past is a poor guide</b> to future claims, losses are <b>correlated</b> (one storm hits a whole region), and premiums rise beyond what people can pay."
  },
  {
    "id": "fc12-4",
    "ch": 12,
    "deck": "intuisjon",
    "front": "Why doesn't annual repricing make climate risk irrelevant for non-life insurers?",
    "back": "Repricing protects the insurer's balance sheet in the short run, but it <b>moves</b> the risk rather than removing it: policyholders and governments carry it, the protection gap widens, and the insurer's market shrinks."
  },
  {
    "id": "fc13-1",
    "ch": 13,
    "deck": "begrep",
    "front": "Carbon tax vs cap-and-trade",
    "back": "<b>Carbon tax</b>: the government fixes the price; the quantity emitted is uncertain.<br><b>Cap-and-trade</b> (e.g. EU ETS): the government fixes the quantity; the allowance price is uncertain."
  },
  {
    "id": "fc13-2",
    "ch": 13,
    "deck": "begrep",
    "front": "Taxonomy, CSRD and SFDR: who and what?",
    "back": "<b>Taxonomy</b>: defines which economic activities count as environmentally sustainable.<br><b>CSRD</b>: companies report on sustainability with double materiality (ESRS).<br><b>SFDR</b>: asset managers, pension funds and insurers disclose how their products handle sustainability (Articles 8 and 9)."
  },
  {
    "id": "fc13-3",
    "ch": 13,
    "deck": "intuisjon",
    "front": "Integrated thinking vs integrated reporting",
    "back": "<b>Integrated thinking</b>: managing financial, social and environmental value together in core decisions.<br><b>Integrated reporting</b> (IR framework): the report that describes how the firm uses and affects the six capitals.<br>Thinking is the practice; the report shows it."
  },
  {
    "id": "fc13-4",
    "ch": 13,
    "deck": "begrep",
    "front": "Binding regulation vs voluntary initiatives",
    "back": "<b>Binding</b>: EU law (Taxonomy, CSRD, SFDR) and supervisors' rules.<br><b>Voluntary</b>: UN PRI, ICMA Green Bond Principles, UNEP FI principles for banking and insurance; the NGFS is a voluntary network of central banks and supervisors.<br>Voluntary initiatives set norms and reduce free-riding, but carry no legal penalty, and members can leave."
  }
];
/* </FLASHCARDS> */

window.EDU_DATA.activeLearning = {};
window.EDU_DATA.glossary = { economists: [], symbols: [] };
