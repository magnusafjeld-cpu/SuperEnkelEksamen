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
   ufullførte modul. Modul 1–7 følger forelesningene (modul 7 er k10–k13,
   skrevet om fra foilene i oktober 2026), og modul 8 er repetisjon i
   eksamensformatet.

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
      title: "Obligasjoner, bank, forsikring, koalisjoner og omstilling",
      chapters: [10, 11, 12, 13], estMinutes: 200,
      goals: [
        "Skille grønne, sosiale og bærekraftige obligasjoner (use of proceeds) fra sustainability-linked bonds, og forklare hvorfor ESG kommer inn i gjeld som risiko",
        "Skille risk-based fra value-based banking, og green loans, transition loans og sustainability-linked loans",
        "Forklare forsikringsbalansen (avsetninger mot egenkapital), katastrofemodellen og VaR = EL + UL",
        "Forklare hvorfor investorer går i koalisjoner, Ostroms designprinsipper og backcasting",
      ],
      keyConcepts: ["Green bond", "Sustainability-linked bond", "Risk-based vs value-based banking", "Pillar 3", "Catastrophe model", "Cat bond", "Coalition", "Backcasting"],
      review: [8, 9],
      tasks: [
        { t: "Les kapittel 10–13", sub: "Skrevet fra foilene til forelesning 10–13. Kapittel 11 har også DNB-gjesteforelesningen.", rute: "#/chapter/10" },
        { t: "Ta quizen på kapittel 10–13", sub: "", rute: "#/quiz" },
      ],
      milestone: "Du har sett hele kurset én gang",
      tip: "Foreleseren deler ut noen eksempelspørsmål på de to gjesteforelesningene etter forelesning 13. Skaff dem: de er det nærmeste faget har en gammel eksamen." },

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
    "id": "fc10-5",
    "ch": 10,
    "deck": "begrep",
    "front": "Bond valuation drivers: sovereign vs corporate",
    "back": "Price moves with the <b>yield to maturity</b>, which reflects risk, which is summarised in <b>ratings</b>.<br><b>Sovereign:</b> GDP, GDP growth, GDP per capita, inflation, external debt, default history.<br><b>Corporate:</b> default risk, loss given default, liquidity risk, credit migration risk."
  },
  {
    "id": "fc10-6",
    "ch": 10,
    "deck": "mekanisme",
    "front": "Why is ESG a downside story for debt holders?",
    "back": "Debt holders get at most the promised amount D; equity holders keep everything above it. An ESG strength adds little for the bondholder, but an ESG problem that pushes asset value below D causes a loss. So ESG enters bonds through <b>default risk, loss given default and the rating</b>."
  },
  {
    "id": "fc10-7",
    "ch": 10,
    "deck": "begrep",
    "front": "The four components of the Green Bond Principles (GBP, 2017)",
    "back": "1. <b>Use of proceeds</b>: exclusively green projects, described in the legal documentation.<br>2. <b>Project evaluation and selection</b>: objectives, process and eligibility criteria.<br>3. <b>Management of proceeds</b>: sub-account, tracked and verified.<br>4. <b>Reporting</b>: mandatory, on the use of proceeds."
  },
  {
    "id": "fc10-8",
    "ch": 10,
    "deck": "begrep",
    "front": "ICMA's four voluntary sets of principles plus the regulation beside them",
    "back": "Green Bond Principles (GBP), Social Bond Principles (SBP), Sustainability Bond Guidelines (SBG) and Sustainability-Linked Bond Principles (SLBP).<br>Regulation: the EU's <b>European Green Bond Standard</b>.<br>Green, social and sustainability bonds are <i>use of proceeds</i>; sustainability-linked bonds are not."
  },
  {
    "id": "fc10-9",
    "ch": 10,
    "deck": "mekanisme",
    "front": "Five reasons bonds matter for sustainability",
    "back": "1. <b>Maturity</b>: issuers must refinance, so investors can set terms.<br>2. <b>Market size</b>: larger than equities.<br>3. <b>Short «bad» bonds</b> (Adani in the FT).<br>4. <b>Engagement</b>.<br>5. <b>Signaling</b> (Flammer 2021)."
  },
  {
    "id": "fc10-10",
    "ch": 10,
    "deck": "intuisjon",
    "front": "Flammer (2021): why is the green bond effect strongest for first-time and certified issuers?",
    "back": "Her reading is <b>signaling</b>. A first green bond carries the most new information while third-party certification makes the signal harder to fake. After issuance, environmental performance improves and long-term, green ownership rises, so the signal is credible."
  },
  {
    "id": "fc10-11",
    "ch": 10,
    "deck": "begrep",
    "front": "Sustainability-linked derivative (ING and SBM Offshore, 2019)",
    "back": "An interest rate swap hedging SBM's floating rate credit facility: SBM pays fixed. ING sets a yearly ESG target (scored by Sustainalytics). Met: fixed rate <b>5–10 bp lower</b>. Missed: <b>5–10 bp penalty</b>.<br>Contrast: in HSBC's swap with Siemens Gamesa the rate never changes; ESG rating changes trigger donations."
  },
  {
    "id": "fc11-5",
    "ch": 11,
    "deck": "begrep",
    "front": "Risk-based vs value-based banking",
    "back": "<b>Risk-based</b>: sustainability enters credit risk management and the risk premium. SF 1.0 (exclusion) and SF 2.0 (ESG integration).<br><b>Value-based</b>: the bank lends to create social and environmental value. SF 3.0 (impact lending, microfinance).<br><i>Schoenmaker &amp; Schramade (2019)</i>"
  },
  {
    "id": "fc11-6",
    "ch": 11,
    "deck": "mekanisme",
    "front": "How does ESG reach a bank's credit decision?",
    "back": "Through <b>creditworthiness</b> (ESG factors move the credit risk indicators) and through <b>collateral value</b> (e.g. real estate).<br>Four-step credit score: (1) analyse the industry, (2) paths for the average company, (3) material ESG issues, (4) weight and combine.<br>Weber (2010): sustainability criteria improve the predictive validity of credit ratings."
  },
  {
    "id": "fc11-7",
    "ch": 11,
    "deck": "begrep",
    "front": "Green loan vs transition loan vs sustainability-linked loan (DNB guest lecture)",
    "back": "<b>Green</b>: proceeds earmarked for environmental investments (LMA Green Loan Principles).<br><b>Transition</b>: proceeds earmarked for investments that cut emissions (LMA guide for transition loans).<br><b>SLL</b>: general corporate purposes; margin rises or falls with pre-agreed targets (LMA SLL Principles)."
  },
  {
    "id": "fc11-8",
    "ch": 11,
    "deck": "intuisjon",
    "front": "Why are a bank's most important ESG issues indirect?",
    "back": "A bank's ESG relates primarily to its <b>clients' activities</b>. SASB lists no environmental issue for commercial banks; the lecture calls <b>credits and investments</b> the bank's indirect material issues. Credit risk is «indirectly all risks a counterparty faces»."
  },
  {
    "id": "fc11-9",
    "ch": 11,
    "deck": "begrep",
    "front": "Equator Principles vs UN Principles for Responsible Banking",
    "back": "<b>Equator Principles</b>: benchmark for environmental and social risk in <i>projects</i>; ten principles; 116 institutions in 37 countries (March 2021).<br><b>PRB</b> (UNEP FI, 2019): six principles for the whole bank (alignment, impact and target setting, clients, stakeholders, governance and culture, transparency); impact analysis, target setting, reporting."
  },
  {
    "id": "fc11-10",
    "ch": 11,
    "deck": "begrep",
    "front": "EBA Pillar 3 ESG disclosures: what do banks report?",
    "back": "<b>Risk</b>: transition (fossil fuel exposures, real estate by energy performance) and physical (chronic and acute, by sector and geography).<br><b>Mitigating actions</b> outside the taxonomy.<br><b>GAR</b> and <b>BTAR</b>: share of exposures financing taxonomy-aligned activities.<br><b>Qualitative</b>: governance, business model, risk management."
  },
  {
    "id": "fc11-11",
    "ch": 11,
    "deck": "intuisjon",
    "front": "Does value-based banking cost return?",
    "back": "Not in the GABV data (2006–15): values-based banks had an ROE of 8.3% vs 8.7% for global banks, but an ROE standard deviation of only 4.9% vs 7.7%. They lend more (76.8% vs 41.6% of assets in 2015) and fund with deposits. <i>Similar return, more stable.</i>"
  },
  {
    "id": "fc12-5",
    "ch": 12,
    "deck": "begrep",
    "front": "Technical provisions versus equity in an insurer's balance sheet",
    "back": "<b>Technical provisions</b> cover <b>expected</b> claims.<br><b>Equity</b> covers <b>unexpected</b> claims.<br>Profit and loss: premium income + investment income − claims − expenses."
  },
  {
    "id": "fc12-6",
    "ch": 12,
    "deck": "begrep",
    "front": "The five components of the catastrophe model (Schoenmaker & Schramade 2019)",
    "back": "1. <b>Hazard</b>: extent and intensity of the catastrophe<br>2. <b>Vulnerability</b>: relative damage to the assets<br>3. <b>Exposure</b>: building, contents and business interruption values<br>4. <b>Financial loss</b>: physical damage into monetary loss, before insurance<br>5. <b>Platform</b>: integrates the four"
  },
  {
    "id": "fc12-7",
    "ch": 12,
    "deck": "mekanisme",
    "front": "How is value at risk (VaR) built up on the lecture's loss distribution?",
    "back": "<b>VaR = expected loss (EL) + unexpected loss (UL)</b> at a chosen confidence level.<br>Losses beyond VaR occur with probability 100% minus the confidence level.<br>EL matches the technical provisions, UL the equity buffer."
  },
  {
    "id": "fc12-8",
    "ch": 12,
    "deck": "mekanisme",
    "front": "How is a catastrophe too big for one insurer shared?",
    "back": "1. Divided among <b>insurers and reinsurers</b><br>2. <b>Government programmes</b> when insurance and reinsurance do not suffice (US NFIP)<br>3. <b>Cat bonds</b>: corporate bonds that let the issuer <b>skip or defer scheduled payments</b> after a catastrophic loss"
  },
  {
    "id": "fc12-9",
    "ch": 12,
    "deck": "intuisjon",
    "front": "What does DNB (2017), De Nederlandsche Bank's Waterproof report, show for climate-related claims on homeowner's policies?",
    "back": "2016: 409 of 1,858 in claims (EUR millions).<br>2085: <b>+10% to +52%</b> at 1.5 °C, <b>+25% to +131%</b> at 3.5 °C.<br>Storm stays at 187; rain and hail drive the rise. Claims rise even in the 1.5 °C scenario."
  },
  {
    "id": "fc12-10",
    "ch": 12,
    "deck": "begrep",
    "front": "The four UN Principles for Sustainable Insurance (PSI)",
    "back": "1. Embed ESG issues in decision-making<br>2. Work with <b>clients and business partners</b> on awareness, risk and solutions<br>3. Work with <b>governments, regulators and other stakeholders</b> for action across society<br>4. <b>Disclose progress</b> regularly and publicly"
  },
  {
    "id": "fc12-11",
    "ch": 12,
    "deck": "intuisjon",
    "front": "Microinsurance: what, who and with what impact?",
    "back": "Financial protection of <b>low-income people and micro-enterprises</b> against health and property risks, to avoid the poverty trap.<br>Suppliers: commercial insurers, community-based organisations and cooperatives, microfinance institutions.<br>Impact: <b>social</b> gains (healthcare access, fewer catastrophic expenditures), but the firms are <b>hard to make profitable</b>."
  },
  {
    "id": "fc13-5",
    "ch": 13,
    "deck": "begrep",
    "front": "Coalition for sustainable finance",
    "back": "A group of like-minded organisations (investors, banks or companies) forming a non-profit platform to pursue sustainable business and finance practices.<br>Examples: <b>PRI</b>, FCLT Global, GIIN (asset management); <b>Equator Principles</b>, GABV (banking); WEF, <b>WBCSD</b> (corporates)."
  },
  {
    "id": "fc13-6",
    "ch": 13,
    "deck": "begrep",
    "front": "The six motives to join a coalition",
    "back": "1. <b>Collective advocacy</b>: lobby for policy, less policy uncertainty<br>2. <b>Reputation</b>: be seen as a leader<br>3. <b>Peer effect</b>: peers joined, avoid a competitive disadvantage<br>4. <b>Outside pressure</b>: consumers, investors, NGOs<br>5. <b>Risk avoidance</b>: stranded assets<br>6. <b>Collective engagement</b>: higher engagement success"
  },
  {
    "id": "fc13-7",
    "ch": 13,
    "deck": "mekanisme",
    "front": "Why does free riding threaten a coalition and what does Ostrom's design do about it?",
    "back": "Each member bears its own compliance cost, but the benefits are shared, so it pays to join and shirk.<br>Ostrom (1990): <b>clear boundaries</b>, <b>membership rules</b>, <b>collective choice</b>, <b>monitoring</b>, <b>sanctions and rewards</b>, <b>conflict resolution</b>.<br>Monitoring makes shirking visible; sanctions make it costly."
  },
  {
    "id": "fc13-8",
    "ch": 13,
    "deck": "intuisjon",
    "front": "Why do the largest coalitions have the least ambitious SF type?",
    "back": "Size and ambition are <b>inversely related</b> (Table 4.3). Coalitions covering 20 to 40% of their sector sit at SF 1.0/2.0; SF 3.0 coalitions (GIIN, GABV at 2.0/3.0) cover under 1%.<br>A broad coalition must accept members who still put profit first. <i>Trap:</i> biggest is not most ambitious."
  },
  {
    "id": "fc13-9",
    "ch": 13,
    "deck": "mekanisme",
    "front": "Dimson, Karakaş & Li: what makes engagements succeed?",
    "back": "<b>2015:</b> success is followed by positive abnormal returns (failure by zero); more likely with reputational concerns and capacity to change; <b>collaboration among activists raises success</b>.<br><b>2020:</b> two-tier strategy (lead plus supporting investors). Best with domestic leads, international supporters and an influential coalition."
  },
  {
    "id": "fc13-10",
    "ch": 13,
    "deck": "begrep",
    "front": "Backcasting",
    "back": "Planning from the end point back to today (Figure 12.2, after Loorbach 2010):<br>1. Describe the <b>vision and ambitions</b><br>2. Create <b>pathways with stepping stones</b><br>3. Formulate <b>concrete actions</b> now<br>Forecasting extrapolates trends; backcasting fixes the goal first (e.g. a 1.5°C pathway)."
  },
  {
    "id": "fc13-11",
    "ch": 13,
    "deck": "intuisjon",
    "front": "What can government do that coalitions cannot and where is it weak?",
    "back": "Strong leadership role: <b>taxation, regulation, carbon pricing</b>, monitoring and sanctioning, supranational coalitions (IPCC) and action via the UN, the OECD and the Paris Agreement.<br>Weak spots in Table 3.1: horizon of <b>up to four years</b>, shortfall of efforts, <b>free-rider behaviour</b>.<br>Gates: pull technology, policy and markets at the same time."
  }
];
/* </FLASHCARDS> */

window.EDU_DATA.activeLearning = {};
window.EDU_DATA.glossary = { economists: [], symbols: [] };
