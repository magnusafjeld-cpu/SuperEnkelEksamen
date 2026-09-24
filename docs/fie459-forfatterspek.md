# FIE459 Sustainable Finance: forfatterspesifikasjon

Kontrakten for alt fagstoff i FIE459. Skrevet 24. september 2026 etter en
gjennomlesning av alle kildene: syllabus, foilene til forelesning 1–9,
PwC-gjesteforelesningen, gruppeprosjektet og artiklene til Starks (2023) og
Hart & Zingales (2017). Kildemappen `FIE459 Sustainable Finance files/` er
gitignorert, og teksten er hentet ut til `FIE459 Sustainable Finance files/_tekst/`.

## 1. Hva faget skal være

**Kort.** Brukeren vil «raskt igjennom for å ha en grei forståelse for
temaene». Én kapittel per forelesning, skrevet for forståelse, ikke for
fullstendighet. FIE432 ble 81 500 ord; FIE459 skal bli rundt 17 000.

**Eksamen** (foil 13–15 i forelesning 1, syllabus):

- 3 timers digital skoleeksamen, **lukket bok**, 16. desember 2026, 70 % av karakteren.
- **Flervalg og sant/usant** («Multiple-choice and true/false questions»).
- Gruppeoppgave 30 %: en portefølje på fem bærekraftige aksjer, maks 5 sider, frist 12. november.
- Alt besvares på engelsk.
- Foreleseren (Jiaying Li): «The focus of the course is on economic intuition,
  not calculation» og «Memorizing definitions is not the best strategy!»

Derfor: forklar mekanismer og skillelinjer, og vis at du kan bruke et begrep på
en case. Et godt sant/usant-utsagn tester en distinksjon («CSR and SRI are
actions; ESG is measurement»). Skriv stoffet slik at slike distinksjoner står
tydelig.

**Læreboka** er Schoenmaker & Schramade (2019), *Principles of Sustainable
Finance*, Oxford University Press. Den ligger ikke i kildene. Bruk foilene som
primærkilde; det du tar fra lærebokas kjente rammeverk, er gjengitt i §5.

## 2. Språk og stil

- **Engelsk** fagtekst, som FIE402, fordi eksamen skrives på engelsk og
  begrepene må være kursets egne. Grensesnittet i appen er norsk.
- Klart, direkte, aktivt. Korte avsnitt. Definer hvert begrep første gang.
- Forklar *hvorfor* før *hva*. Hver seksjon skal gi leseren en mekanisme eller
  en skillelinje de kan bruke på en ukjent case.
- Ingen fyllfraser («It is important to note that…», «In today's world…»).
- Tall og funn skal komme fra kildene, med kilden oppgitt slik foilene gjør
  (forfatter, år). **Ikke dikt opp statistikk, år eller sitater.** Legger du til
  noe fra allmenn fagkunnskap som ikke står i kildene, hold det kort og
  generelt, og merk det «(general background, not from the lecture)».
- Desimalpunktum, engelsk tallformat (3.3 billion, 58.8%).

## 3. HTML-formatet (parseren er streng, se fallgruvene)

Hver fil `fag/fie459/_fragmenter/kN.html` er nøyaktig én seksjon:

```html
<section id="k3">
<a class="backtotop" href="#toc">↑ contents</a>
<h2 class="chap">3 · Externalities: when prices lie</h2>

<p class="lead-in">Two or three sentences: what the chapter is about, why it
matters, and what the exam is likely to test.</p>

<h3>3.1 What an externality is</h3>
<p>…</p>

<div class="callout mech"><span class="h">Why the free market overproduces</span>
Text…</div>

<div class="worked"><span class="wh">Case: Air France-KLM and a carbon price</span>
<p>…</p>
</div>

<table class="data">
<tr><th>…</th><th>…</th></tr>
<tr><td>…</td><td>…</td></tr>
</table>
</section>
```

Regler:

- `h3` skal stå direkte i `section`, aldri inne i en `div`, og begynne med `N.M `.
- Callout-typer: `tip` (eksamensråd), `mistake` (vanlig feil / felle i
  sant/usant), `mech` (mekanismen bak), `link` (kobling til et annet kapittel),
  `warn`. Hver callout har `<span class="h">Overskrift</span>`.
- `worked` for caser og regneeksempler, med `<span class="wh">`.
- `table.data` for sammenligninger. Bruk `class="n"` på tallkolonner.
- **Aldri rå `<` eller `>` i tekst.** Skriv `&lt;` og `&gt;`, og `&amp;` for &.
- Ingen `h2.part` (byggeverktøyet setter deltitlene), ingen inline-stiler, ingen skript.
- Hvert kapittel: 1–2 `mistake`-bokser med feller som egner seg for sant/usant,
  minst én `mech`, og en `tip` om hva eksamen sannsynligvis spør om.

Bygg og kontroller:

```bash
python3 tools/fie459-bygg-manual.py fag/fie459/_fragmenter
python3 tools/sjekk-manual.py FIE459_Manual.html
```

## 4. Kapittelkartet

| Kap | Forelesning | Kilde | Mål (ord) |
|---|---|---|---|
| k0 | Kurset og eksamen | L1 foil 1–15, syllabus, gruppeprosjektet | 400–600 |
| k1 | Sustainable finance and ESG issues | L1, Starks (2023) | 1 200–1 800 |
| k2 | Business ethics | L2 (Crane et al. 2019) | 1 200–1 800 |
| k3 | Externalities | L3 | 1 200–1 800 |
| k4 | Shareholder vs stakeholder theory | L4, Hart & Zingales (2017) | 1 200–1 800 |
| k5 | Governance and behaviour | L5 | 1 200–1 800 |
| k6 | Business models and materiality | L6 | 1 200–1 800 |
| k7 | Metrics and reporting | L7 + PwC-gjesteforelesningen | 1 200–1 800 |
| k8 | Investing for long-term value creation | L8 | 1 200–1 800 |
| k9 | ESG integration and asset prices | L9 | 1 200–1 800 |
| k10 | Non-equity asset classes | **foreløpig**: syllabus + lærebokas kap. 9 | 600–1 000 |
| k11 | Banking | **foreløpig**: syllabus + kap. 10 | 600–1 000 |
| k12 | Insurance | **foreløpig**: syllabus + kap. 11 | 600–1 000 |
| k13 | Governments, transition management, integrated thinking | **foreløpig**: syllabus + kap. 4 og 12 | 600–1 000 |

**Foreløpige kapitler (k10–k13)** begynner rett etter lead-in med:

```html
<div class="callout warn"><span class="h">Provisional chapter</span>
Written before the lecture slides for this topic were available, from the
syllabus and the textbook chapter's standard content. It will be revised when
the lecture is out. Treat the concepts as reliable and the emphasis as a guess.</div>
```

Hold dem til godt etablerte begreper. Ingen tall eller årstall du ikke er sikker på.

## 5. Hva hvert kapittel skal dekke

Dette er stoffet slik det faktisk står i foilene, inkludert rammeverkene som bare
finnes som bilder. Les også `_tekst/FIE459_H26_N_*.txt` for forelesningen din.

### k0 · The course and the exam
Tre deler, 13 forelesninger, seks gjesteforelesninger (PwC i september, Folketrygdfondet
29/9, Fonds Finans 6/10, DNB 13/10, Sustainability Hub, Heidelberg Materials 23/10;
gjesteforelesninger tas ikke opp). Eksamensformatet (§1). Gruppeprosjektet i
korte trekk: én bransje av fem, én strategi fra L8, fem aksjer med vekter som
summerer til 100 %, «is the sustainability story already priced?» (L9),
poengfordeling 20/30/15/20/15. Hvordan appen brukes for dette faget.

### k1 · Sustainable finance and ESG issues (L1)
- Finance in a nutshell: investment decisions (NPV > 0), financing decisions (MM I
  and II, and why real-world frictions matter), shareholder value (P₀ as PV of
  dividends), CAPM (no free lunch), the principal–agent problem (adverse
  selection, moral hazard).
- Definitions: Schoenmaker & Schramade («how finance interacts with economic,
  social and environmental issues») and the European Commission (ESG in
  investment decisions → long-term investment in sustainable activities).
- How ESG enters valuation: revenues, costs, depreciation, taxation; tools
  (externalities, intangibles, business models, stakeholder analysis,
  materiality, scenario/sensitivity analysis, real options).
- Traditional vs sustainable finance (foil 32): same goals, but long-term
  allocation, sometimes less diversification for good reasons, stakeholder
  welfare.
- **The concept chain (foil 33):** sustainability requires taking care of
  stakeholders → stakeholder management → put into practice through **CSR
  (corporate side)** and **SRI (investor side)** → **ESG metrics measure the
  outcomes**. «CSR and SRI are actions; ESG is measurement.» Most empirical
  problems arise at the measurement step.
- Drivers: planetary boundaries (Steffen et al. 2015), doughnut economics
  (Raworth 2017), SDGs and Paris Agreement (2015), Kunming-Montreal Global
  Biodiversity Framework (2022), regulatory pressure, public awareness, employees
  and consumers, investor demand (USD 37.5+ trillion SRI assets by 2021).
- **Double materiality** (introduced here, deepened in k6/k7): financial
  materiality (outside-in: how sustainability affects the firm) and impact
  materiality (inside-out: how the firm affects people and planet).
- Giglio et al. (2025), ~30 000 Vanguard clients: 48% see no reason to invest in
  ESG, 24% ethical motives, 22% climate hedging, 6% return expectations; on
  average they expect ESG to *underperform* by about 2% a year. Demand is driven
  by values more than by expected value.
- **Starks (2023), value versus values.** *Value* motives: ESG as financially
  material risk and return. *Values* motives: nonpecuniary preferences. The
  spectrum (her Figure 1, Panel C): Impact investing (some accept lower returns
  for impact, some expect risk-adjusted market returns) – Socially responsible
  investing (closer to market returns, some accept lower) – Classic ESG
  investing and Traditional investing (expect risk-adjusted market returns or
  more). Confusion about ESG comes from mixing the two motives.
- **Schoenmaker & Schramade's framework (Table 1.3):**

| Typology | Value created | Ranking of factors | Optimisation | Horizon |
|---|---|---|---|---|
| Finance as usual | Shareholder value | F | Max F | Short term |
| SF 1.0 | Refined shareholder value | F » S and E | Max F subject to S and E | Short term |
| SF 2.0 | Stakeholder value (triple bottom line) | I = F + S + E | Optimise I | Medium term |
| SF 3.0 | Common good value | S and E > F | Optimise S and E subject to F | Long term |

F = financial, S = social, E = environmental, I = integrated value. This table
returns in k5 and k9 and is the course's backbone.

### k2 · Business ethics (L2, Crane et al. 2019)
- Definition (Cambridge): rules, principles and standards for deciding what is
  morally right or wrong when working.
- **Normative theories.** Ethical absolutism (eternal, universal principles) vs
  ethical relativism (context-dependent). Absolutism splits into
  *consequentialist* (ethical egoism: individual self-interest; utilitarianism:
  collective welfare, act/rule) and *non-consequentialist* (ethics of duty:
  Kant's categorical imperative, act on rules that could become universal law;
  rights and justice). Relativist/contemporary theories: virtue ethics
  (character), ethics of care (relationships), discourse ethics (honest open
  argumentation), postmodern ethics (moral impulse, context-specific).
- **Descriptive theories:** how decisions are actually made. Schwartz (2016):
  rationalist vs intuitionist/sentimentalist perspective.
- **Rest (1986) / Jones (1991) four stages:** recognise moral issue → make moral
  judgement → establish moral intent → engage in moral behaviour, each influenced
  by individual and situational factors.
- Individual factors (and evidence): age and gender (mixed evidence), national
  and cultural characteristics (significant), education and employment (somewhat
  unclear), cognitive moral development (small but significant), locus of
  control (limited, but matters for blame), personal values (significant),
  personal integrity (likely significant), moral imagination (new, untested).
- **Kohlberg's cognitive moral development:** Pre-conventional (1 obedience and
  punishment; 2 instrumental purpose and exchange), Conventional (3 interpersonal
  accord and conformity; 4 social accord and system maintenance),
  Post-conventional (5 social contract and individual rights; 6 universal
  ethical principles).
- Whistleblowing: exposing ethical or legal violations; needs protection
  (Sarbanes-Oxley requires anonymous reporting channels).
- Situational factors: *issue-related* (moral intensity, moral framing) and
  *context-related* (rewards, authority, bureaucracy, work roles, organisational
  culture, national context).
- **Moral intensity (Jones 1991), six factors:** magnitude of consequences,
  social consensus, probability of effect, temporal immediacy, proximity,
  concentration of effect.
- Moral framing and moral muteness (Bird & Walters 1989: fear for harmony,
  efficiency, image of power).
- **Rationalisation tactics:** denial of responsibility, denial of injury,
  denial of victim, social weighting, appeal to higher loyalties, metaphor of the
  ledger.
- **Bénabou and Tirole (2010), three economic views of CSR:** win-win (doing well
  by doing good), delegated philanthropy (stakeholders use the firm to act on
  their values), insider-initiated corporate philanthropy (management spends
  other people's money on its own values: an agency problem).
- Cases: Tesla reopening its factory against state orders (2020); Telenor in
  Myanmar (entry 2014, coup Feb 2021, sale Aug 2021 to a junta-linked buyer,
  criticised as irresponsible disengagement).

### k3 · Externalities (L3)
- Definition: a positive or negative effect on agents not involved in producing
  or consuming the good. Market failure: the free market allocates at a
  socially suboptimal level.
- **Two-firm example (foil 6–7):** option 1 (revenue 100, cost 20, cost 10 to the
  other firm) vs option 2 (revenue 100, cost 25, no external cost).
  Profit-maximisers choose 1 (80 > 75); social welfare is 2 × (100 − 20 − 10) =
  140 under option 1 vs 2 × 75 = 150 under option 2.
- Supply/demand with marginal societal cost above marginal private cost:
  negative production externality → Q_e > Q_so and P_e < P_so.
- 2×2: production/consumption × negative/positive (pollution, smoking, R&D,
  vaccines).
- Enlarged production function q + w = F(K, L, N, S, H; r, e): output plus
  waste, from financial capital, labour, natural, social and human capital, and
  flows of resources and energy. Root cause: effects not physically embodied in
  the product.
- Internalisation: making those responsible bear the costs. Channels:
  government (taxes, quotas, subsidies, campaigns), civil society (media),
  investors (strategy, engagement), corporates, consumers; innovation by
  competitors can force internalisation.
- **Limitations:** territoriality of jurisdiction (firms shift production to
  weaker regimes: California cap-and-trade 2013, Bartram, Hou & Kim 2022; EU
  ETS), information asymmetry/greenwashing (Shell adverts banned by the UK ASA;
  public firms sell polluting assets to less-monitored private firms, Duchin,
  Gao & Xu 2024), political frictions (lobbying: on average USD 277k a year
  anti-climate vs 185k pro-climate, Leippold, Sautner & Yu 2024).
- **Integrated value (S&S Figure 2.3):** original process F 15, S −3, E −3 → I = 9.
  Optimised process F 14, S −1, E −1 → I* = 12. Internalising lowers financial
  value by 1 but raises integrated value by 3. The firm may do it before
  government, employees or the public force it, to avoid **stranded assets**.
- Uncertainty in internalisation: technology, policy, consumer behaviour.
  Scenario analysis (identify uncertainties, build scenarios, weigh
  probabilities) and stress testing («what if everything goes wrong?»). NGFS
  climate scenarios.
- **Case Air France-KLM (2017):** scope 1 and 2 emissions 32.7 million tonnes,
  sales EUR 25 784 million, EBIT EUR 1 423 million, net income EUR −274 million.
  The CO₂ charge is carbon price × emissions: at EUR 100/t it is about EUR 3.3
  billion, more than twice EBIT, if none can be passed on. The EBIT hit falls
  with the ability to pass on the cost (0% pass-on = full hit, 100% = none), and
  pass-on is likely low in a price-competitive industry. Peer data are
  incomplete and hard to compare.
- Velsicol case (pesticide water pollution) as the discussion example.

### k4 · Shareholder vs stakeholder theory (L4)
- Friedman (1970): «The social responsibility of business is to increase its
  profits». Freeman: stakeholder theory.
- Business Roundtable 2019 statement (about 200 CEOs): purpose is to serve all
  stakeholders. Criticism: Jensen (2002), stakeholder objectives let managers
  design their own objective function → higher agency costs; Mehrotra & Morck
  (2017), shareholder value is a «bright line», stakeholder welfare an
  «ill-defined charge»; Bebchuk & Tallarita (2020), stakeholderists avoid saying
  who counts, ignore trade-offs and give no aggregation method, which insulates
  management. Harvard Law School Forum: under Delaware law directors owe
  fiduciary duties to shareholders, and the business judgement rule already lets
  them consider other interests, so the statement is legally incorrect and
  unnecessary.
- Accountable Capitalism Act proposal (federal charter, workers elect ≥ 40% of
  the board, limits on insider share sales, 75% approval for political
  spending). Codetermination: Germany (one-third of the supervisory board above
  500 employees, half above 2 000), Norway (employees may elect board members
  above 30 employees, mandatory above 200 unless there is a corporate assembly),
  Sweden.
- Graham (2022) CFO survey; Klarna's AI decision (2024: AI does the work of 700
  agents, workforce from about 5 000 towards 3 000; May 2025: «we went too far»
  and rehiring).
- **Hart & Zingales (2017): maximise shareholder welfare, not market value.**
  Friedman's separation argument (firms maximise profit, shareholders do good
  themselves) fails when social and financial effects are non-separable, i.e.
  when the firm can do good (or avoid harm) more efficiently than shareholders
  can on their own. Shareholders care about more than money, so the firm should
  follow their preferences (e.g. via voting).
- **Edmans (2020), Grow the pie:** pie-splitting vs pie-growing mentality;
  purpose = «how is the world a better place by your company being here?»
- Employees: job applicants accept lower pay at a socially responsible firm
  (field experiment in the slides). Supply chains: Nestlé stops buying Cargill
  soy that could not be traced; heat exposure hurts suppliers and propagates to
  customers; after E&S incidents at foreign suppliers, US firms cut imports by
  about 30% (Bisetti et al. 2024); EU Corporate Sustainability Due Diligence
  Directive.

### k5 · Governance and behaviour (L5)
- Separation of ownership and control; agency costs; why the problem arises
  (superior information, hidden action, costly monitoring).
- Adverse selection (before the contract; Akerlof's lemons) vs moral hazard
  (after; debt overhang, asset substitution). CEO–shareholder conflicts and
  solutions (equity pay, EBIT-linked pay).
- Corporate governance definition; OECD purpose («trust, transparency and
  accountability»).
- Shareholder direct action: **voice** (voting, engagement/«jawboning») and
  **exit** (selling; the threat of exit disciplines ex ante).
- Practices: board monitoring (CEO not chair, independence, diversity,
  committees), compensation, shareholder rights (avoid dual-class shares),
  culture (compliance, anti-bribery, whistleblowing), transparency.
- Governance of sustainability pays through better decisions, risk mitigation
  and improved capital flow (lower cost of capital).
- Finance as usual and its challenges (business ethics, public policy,
  incomplete contracts); forces for the status quo (lobbying, agency problems,
  behavioural biases); climate litigation.
- **EMH (Fama 1970) vs adaptive markets hypothesis (Lo 2017):** efficiency
  depends on the number and nature of market participants; new risks such as
  carbon may not yet be fully priced.
- Challenges of SF 1.0 (managers less accountable, conflicts unresolved, S and E
  hard to measure) and SF 2.0 (balancing stakeholders, subjectivity, higher
  agency costs, measuring integrated value).
- S&S guidelines: stakeholder focus with long-term value creation in executive
  contracts; lengthen horizons (e.g. shares that must be held after leaving);
  investor engagement and coalitions; adaptive market view; supervisory
  treatment (buy-and-hold, carbon stress tests).
- ESG-linked executive pay: PwC survey 2021; weak and not causal correlation
  between ESG pay and ESG performance; concerns (short-term tactical targets,
  vague discretionary measures, low transparency). Starbucks moved
  sustainability from the annual bonus to a three-year modifier on equity
  awards.
- Conclusion: stakeholder focus can create shareholder value, but defining the
  objective as stakeholder value can increase agency costs and room for
  greenwashing.

### k6 · Business models and materiality (L6), Oatly as running case
- Goal: assess a company's ability to generate free cash flows sustainably.
- Business model (Osterwalder & Pigneur 2010: create, deliver, capture value;
  Johnson et al. 2008: customer value proposition, profit formula, key
  resources and processes). Competitive position (Porter 1985; sources:
  resources, knowledge, human capital and culture, networks/access).
- Intangibles: intangible assets (on the balance sheet, e.g. goodwill) vs
  intangible resources (not, e.g. human capital). Haskel & Westlake (2017): sunk
  cost, spillovers, scalability, synergies. Employee satisfaction and stock
  returns.
- Strategy (Hambrick & Fredrickson 2001): arenas, vehicles, differentiators,
  staging, economic logic.
- Value drivers: sales growth, margins, invested capital and return on capital,
  cost of capital, OCF vs FCF. DuPont ROE = margin × asset turnover × leverage.
  Oatly: ROE −17% (2021) and −50% (2022); gross margin 19.4% (2023) → 28.7%
  (2024). DuPont 2022: −0.4/0.7 × 0.7/1.2 × 1.2/0.8 = −57% × 0.58 × 1.5 = −50%. **Foil 35 calls 0.58 «return on assets»; it is asset turnover (sales/assets). Call it asset turnover.**
- Sustainable business model innovation.
- Purpose; stakeholder analysis (identify, categorise, prioritise with an
  interest–power matrix; stakeholder impact map).
- **Materiality:** SASB's financial definition (important to investors) vs GRI's
  impact definition (effect on economy, environment, people) → **double
  materiality**. SASB materiality map; Khan, Serafeim & Yoon (2016): firms that
  perform well on *material* issues outperform, performance on immaterial issues
  does not matter; Rogers & Serafeim, pathways to materiality; materiality
  matrix (Unilever, CCBJH).
- **Impact criteria:** material (relevant to value drivers), intentional
  (deliberate, part of strategy and purpose), transformational (drives major
  change via business model, technology, scale or standards).
- Top-down (sector exposure) vs bottom-up (company's own management) sustainability rating, 1–5.
- **Seven guidelines for LTVC (S&S 2019):** purpose part of strategy; integrate
  sustainability and externalities in all functions; communicate long-term
  goals; deliver on promises; build long-term intangibles for transformational
  change; long-term performance measurement; long-term incentives, get rid of
  short-term variable pay.

### k7 · Metrics and reporting (L7 + PwC guest lecture)
- Voluntary standards: **GRI** (impact, all stakeholders), **Integrated
  Reporting <IR>** (six capitals: financial, manufactured, intellectual, human,
  social and relationship, natural; guiding principles; <IR> beats no ESG
  reporting and ESG in the annual report, but switching from stand-alone ESG to
  <IR> brings no benefit), **TCFD** (four pillars: governance, strategy, risk
  management, metrics and targets; seven principles for effective disclosure),
  **CDP** (carbon, water, forests via online platform), **ISSB/IFRS**
  (investor-focused, aligned with TCFD).
- Mandatory EU: **EU Taxonomy**: an activity is taxonomy-aligned if it
  (1) substantially contributes to at least one of six environmental objectives
  (climate change mitigation, climate change adaptation, water and marine
  resources, circular economy, pollution prevention and control, biodiversity
  and ecosystems), (2) does no significant harm (DNSH) to the other five and
  (3) complies with minimum safeguards (OECD guidelines, UN Guiding Principles),
  measured by technical screening criteria. **NFRD (about 12 000 companies) →
  CSRD (about 50 000)**, reporting under ESRS with double materiality and IROs
  (impacts, risks, opportunities). SFDR is for investors (k8).
- **Omnibus package (26 February 2025):** simplification. PwC: post-omnibus scope
  ≥ 1 000 employees and net turnover > EUR 450 million, from financial year
  2027; the Commission estimates about 80% of companies previously in scope fall
  out. Pre-omnibus waves 1–3 (PwC foil 41).
- Effects of reporting: purely voluntary CSR reporting facilitates greenwashing;
  a mix of voluntary and mandatory works better; Krueger, Sautner, Tang & Zhong
  (2021) on mandatory disclosure. HBR «Overselling sustainability reporting»:
  problems with reporting and sustainable investing; «measure less, better».
- ESG ratings: MSCI method; large disagreement among providers, which
  increases with more public information (Kotsantonis 2019); benchmarking
  drives rankings.
- **PwC:** 94% of investors think corporate sustainability reporting contains
  unsupported claims (PwC Global Investor Survey 2023); CSRD cost estimates (NOU
  2023:15); practical data-quality problems (unclear definitions, manual
  spreadsheets, weak controls); integrate sustainability into strategy rather
  than beside it; «you can't manage what you don't measure»; climate risk is a
  today issue (USD 417 billion natural-disaster losses in 2024).

### k8 · Investing for long-term value creation (L8)
- Portfolio optimisation with an emission constraint; the ESG-efficient
  frontier (Pedersen, Fitzgibbons & Pomorski 2021): adding a constraint can only
  lower (or keep) the maximum Sharpe ratio for a given risk.
- Financing lifecycle; the **investment chain**: beneficiaries/clients → asset
  owners (pension funds, insurers, funds) → asset managers → companies. Top
  asset managers vs NBIM (USD 1.4 trillion).
- Investment company business model (fee-based income); material issues for
  asset managers (selling practices and product labelling, employee engagement
  and diversity, product design, business ethics, systemic risk management,
  plus the ESG issues of the portfolio).
- **SFDR:** **Article 8** (promotes E or S
  characteristics; exclusions + ESG integration + engagement), **Article 9**
  (sustainable investment objective, do no significant harm, good governance;
  often thematic/impact). Mass reclassification from 9 to 8 to avoid
  greenwashing accusations. Article 8 and 9 funds: EUR 7.1 trillion, 58.8% of
  EU fund assets (Morningstar, December 2025).
- SRI definition and asset classes; growth (Bloomberg Intelligence: > USD 30
  trillion in 2022, on track for > 40 trillion by 2030).
- Why investors buy SRI: Riedl & Smeets (2017, social preferences and
  signalling), Hartzmark & Sussman (2019, Morningstar globes shift flows),
  Amel-Zadeh & Serafeim (2018, 82.1% consider ESG information).
- **Strategies** (CFA/GSIA): negative/exclusionary screening, positive/
  best-in-class screening, thematic investing, ESG integration, stewardship
  (engagement, voting), impact investing. BlackRock «avoid vs advance».
  Stewardship case LGIM–Glencore (engagement since 2016, shareholder resolution
  2023 on thermal coal, divestment from selected funds 2024 across about GBP 176
  billion). Dimson, Karakaş & Li (2015, 2020) on active ownership and
  coordinated engagement.
- **Barriers:** (1) overreliance on market metrics (pricing: EMH says all is
  priced → passive; allocation: MPT/CAPM → diversify; performance: benchmarks
  and past risk/return); passive investors can vote but cannot exit; (2) long
  investment chains (NBIM has 111 external mandates); (3) limits of ESG tools
  (add-ons that do not address core issues; design limits: limited focus on
  materiality, reported data and policies only, industry-neutral, operations
  not products; bias to large companies, intuitively wrong scores, failure to
  spot material weaknesses).
- **Traditional vs LTVC investing (S&S):** SF 1.0 vs SF 2.0; EMH vs AMH; S and E
  irrelevant or priced vs priced as markets learn; max F vs max IV = F + S + E;
  IR/Sharpe/alpha vs DCF with internalisation scenarios; long vs short chains;
  extremely diversified vs concentrated; limited vs deep dialogue; 12 months vs
  years or a decade.
- **Six conditions for LTVC:** long horizons, active management in concentrated
  portfolios, effective engagement, performance analysis of value added in the
  real economy, long-term alignment of mandates between owner and manager, keep
  the investment chain short.
- UN PRI.

### k9 · ESG integration and asset prices (L9)
- ESG reaches firm value through the **cash-flow channel** (revenues, costs
  including litigation, capex, stranded assets) and the **cost-of-capital
  channel**.
- DCF with ESG adjustments (CESGA example: ESG-adjusted equity value 16 per
  share vs 20 without the corrections; adjustments to revenues, taxes, capex).
  Value drivers: sales growth, margins, capex, cost of capital; the material-ESG
  table (performance, competitive edge, value driver affected).
- Cost of capital evidence: better CSR → lower implied cost of capital (El Ghoul
  et al. 2011), cheaper after CSR disclosure (Dhaliwal et al. 2011), better access
  to finance (Cheng, Ioannou & Serafeim 2014), environmental risk management →
  lower cost of capital and more debt (Sharfman & Fernando 2008).
- **Pástor, Stambaugh & Taylor (2022), Dissecting green returns:** green assets
  should have *lower expected* returns (taste premium; hedge against climate
  risk), but had *higher realised* returns because climate concerns rose
  unexpectedly. Green-minus-brown cumulative return 174%, monthly Sharpe 0.33
  vs 0.30 for the market; purged of climate-concern shocks it is flat. The
  greenium in bonds widened. Expected ≠ realised: the key exam distinction.
- CAPM, alpha and the security market line (overpriced → α < 0 → price falls);
  APT and systematic factors. **Is ESG a factor?** Criteria: grounded in
  literature, robust across definitions, robust across geographies. Evidence is
  mixed (some find ESG adds to returns, some that it detracts), no agreed risk
  or behavioural explanation; Research Affiliates Europe 2009–2020 long-short:
  ESG −0.1% a year, E +2.2%, S −0.9%, G −1.9%, none significant.
- **Portfolio objectives (S&S):** Max FV (finance as usual) · Max FV s.t. SEV ≥
  minimum (exclusionary screening, SF 1.0) · Max IV = FV + SEV (ESG
  integration, SF 2.0) · Max SEV s.t. FV ≥ minimum (impact investing, SF 3.0).
- Strategy usage (Amel-Zadeh & Serafeim 2018): engagement 37.1%, full
  integration 34.4%, negative screening 30.0%, thematic 20.8%, … 16.6% do not
  use ESG information.
- Gollier & Pouget (2014), «washing machine»: a large activist investor can earn
  abnormal returns by buying non-responsible firms and making them responsible.
  Gollier & Pouget also contrast the two channels: voting with your feet (avoiding
  polluters raises their cost of capital) and activism; the washing machine needs
  a long horizon and a credible pro-social orientation. **Does divestment work?**
  The lecture's evidence is Cohen, Gurun & Nguyen (2020), «The ESG-Innovation
  Disconnect»: oil, gas and energy firms, with low ESG scores and often excluded
  from ESG funds, are key green innovators and produce more and higher-quality
  green patents. Blanket exclusion may therefore cut capital from the firms that
  do the most green innovation; reward-based incentives may work better.
- **Suitability of methods (S&S Table 8.3)** for fundamental / quant / passive
  equities: exclusionary screening high / medium-high / medium-high; best in
  class high / medium / medium-low; thematic high / medium / low; active
  ownership high / low / low; impact high / very low / very low; ESG integration
  high / very low / not at all. Fundamental analysis is needed for everything
  except screening on scores.
- Impact investing (GIIN).

### k10–k13 (foreløpige)
- **k10 Non-equity asset classes:** bonds and loans as debt stakes (downside
  risk focus: ESG as credit risk), green bonds (use of proceeds), social and
  sustainability bonds, sustainability-linked bonds (coupon tied to KPIs, not
  use of proceeds), greenium, and briefly private equity and real assets. Link
  to k8 (SRI asset classes) and k9 (greenium).
- **k11 Banking:** banks' role in financing the transition; climate risk as
  physical and transition risk to loan books; stranded assets; scenario
  analysis and climate stress tests (NGFS); sustainable lending and
  sustainability-linked loans; financed emissions.
- **k12 Insurance:** underwriting (pricing risks) and investing (assets) sides;
  physical climate risk and rising losses (link to PwC's USD 417 billion);
  insurability and the protection gap; insurers as long-term investors.
- **k13 Governments, transition management and integrated thinking:** the
  public role (carbon pricing, regulation, disclosure mandates: taxonomy, CSRD,
  SFDR), supranational bodies and associations (e.g. UN PRI, NGFS), the
  transition as a system change over decades, integrated thinking (managing
  financial, social and environmental value together, tying back to SF 2.0/3.0
  and integrated reporting).

## 6. Quiz og flashcards

Skrives som JSON i `…/scratchpad/fie459/utkast/kN.json`:

```json
{
  "quiz": [
    { "id": "q3-1", "ch": 3, "type": "mcq",
      "q": "…", "options": ["…", "…", "…", "…"], "answer": 2,
      "explanation": "…" },
    { "id": "q3-6", "ch": 3, "type": "mcq",
      "q": "True or false? …", "options": ["True", "False"], "answer": 1,
      "explanation": "…" }
  ],
  "flashcards": [
    { "id": "fc3-1", "ch": 3, "deck": "begrep", "front": "…", "back": "…" }
  ]
}
```

- **Antall per kapittel:** k0: 1 flervalg + 2 sant/usant, 3 kort. k1–k9: 5 flervalg
  + 3 sant/usant, 7 kort. k10–k13: 3 flervalg + 2 sant/usant, 4 kort.
- **Fasitposisjonen er pålagt** i `…/scratchpad/fie459/fasitplan.json` (bokstav per
  flervalgsspørsmål i rekkefølge, True/False per sant/usant). Følg den nøyaktig.
- Flervalg: fire alternativer, alle plausible, like lange, ingen «all of the
  above». Sant/usant: `"options": ["True", "False"]`, spørsmålet begynner med
  «True or false?», og utsagnet tester én distinksjon. Usanne utsagn skal være
  gale på én konkret måte, ikke åpenbart tull.
- `explanation`: ren tekst uten HTML, 2–4 setninger. Si hvorfor svaret er riktig
  og hva som gjør de gale alternativene gale.
- Spørsmålene skal ligne eksamen: begreper brukt på korte caser, skillelinjer,
  «which statement is correct», mekanismer. Unngå rene husk-tall.
- Flashcards: `deck` er `begrep` (definisjon), `mekanisme` (hvordan/hvorfor)
  eller `intuisjon` (hvorfor det betyr noe / vanlig misforståelse). `back` kan
  ha enkel HTML (`<b>`, `<br>`, `<i>`). Front er et begrep eller et spørsmål.
- id-er er lagringsnøkler og endres aldri etter publisering.

## 7. Kontroll før levering

1. Kjør byggeverktøyet og `sjekk-manual.py`, og rett alle feil i kapitlene dine.
2. Sjekk hvert tall og hvert funn mot `_tekst`-filene. Et funn som ikke står der,
   skal ut eller merkes som allmenn bakgrunn.
3. `python3 -c "import json; json.load(open('…/kN.json'))"` for hver JSON-fil.
4. Tell ordene i kapitlene dine og hold deg innenfor målet.
