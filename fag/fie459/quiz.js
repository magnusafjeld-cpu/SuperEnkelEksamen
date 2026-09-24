/* ===================== FIE459 · QUIZ =====================
   95 spørsmål over kapittel 0–13, i eksamensformatet: flervalg med fire
   alternativer og sant/usant («True or false?», alternativene True/False).
   Alle har oppg: 1 — faget har ingen oppgaveinndeling på eksamen.

   Fasitposisjonen er trukket på forhånd fra en fast seed og kontrolleres av
   tools/sjekk-drill.js, flervalg og sant/usant hver for seg (Fallgruver 7c).

   id-ene er lagringsnøkler for fremdrift og må aldri endres.
   Første versjon ble flettet inn fra agentutkast som ikke er tatt vare på.
   Denne fila er nå kilden: rett spørsmålene her.
   ========================================================= */
window.EDU_DATA = window.EDU_DATA || {};
window.EDU_DATA.quizzes = [
  {
    "id": "q0-1",
    "ch": 0,
    "oppg": 1,
    "type": "mcq",
    "q": "Your group's report argues that its five renewable-energy stocks are a good buy because they beat the market over the past five years. Under which part of the marking scheme does this argument most directly lose marks?",
    "options": [
      "Mandate and strategy, because the benchmark does not match the scope",
      "Pricing and critical reflection, because past returns are used as proof",
      "Evidence, because the figures are drawn from a single ESG rating",
      "Portfolio, because the weights are not justified against a benchmark"
    ],
    "answer": 1,
    "explanation": "The pricing and critical reflection part (15 points) explicitly penalises using past returns as proof of future returns and claiming that sustainable stocks always outperform. Past outperformance may reflect good news that is already in today's price, so it says little about expected returns (Lecture 9). The other options are real ways to lose marks, but they do not describe this argument."
  },
  {
    "id": "q0-2",
    "ch": 0,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? In the group project, equal portfolio weights are not accepted, because the weights must reflect the group's conviction in each stock.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "explanation": "False. The project description says equal weights are acceptable if you justify them. What loses marks is arbitrary weights with no reason and no view of the portfolio as a whole. The weights must sum to 100 percent, and short selling is not allowed."
  },
  {
    "id": "q0-3",
    "ch": 0,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? A group report can earn full marks without a DCF model, factor tests or portfolio optimisation.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "explanation": "True. The FAQ states that technical work is not required and that a simple, well-supported analysis can earn full marks. DCF, factor tests or optimisation are welcome if they are explained clearly and used to support a decision. This matches the course's focus on economic intuition rather than calculation."
  },
  {
    "id": "q1-1",
    "ch": 1,
    "oppg": 1,
    "type": "mcq",
    "q": "A pension fund sells its shares in coal miners. An oil company adopts a human-rights policy for its suppliers. A rating agency then scores both companies. Using the lecture's concept chain, which labelling is correct?",
    "options": [
      "The sale is CSR, the supplier policy is SRI and the score is ESG",
      "The sale is ESG, the supplier policy is CSR and the score is SRI",
      "The sale is SRI, the supplier policy is CSR and the score is ESG",
      "The sale is SRI, the supplier policy is ESG and the score is CSR"
    ],
    "answer": 2,
    "explanation": "In the concept chain, stakeholder management is put into practice through CSR on the corporate side and SRI on the investor side, and ESG metrics measure the outcomes. The pension fund's sale is an investor action (SRI), the supplier policy is a corporate action (CSR), and the rating is measurement (ESG). The other options mix up actions and measurement, or the corporate and investor sides."
  },
  {
    "id": "q1-2",
    "ch": 1,
    "oppg": 1,
    "type": "mcq",
    "q": "An asset manager overweights firms with strong human-capital management because it expects lower staff turnover and fewer lawsuits. It has no view on whether this is good for society. In Starks' (2023) terms, what motivates this strategy?",
    "options": [
      "Values, because human-capital management is a social issue",
      "Impact, because the manager is targeting a social outcome",
      "Value, because ESG is used as information on risk and return",
      "Values, because the manager screens positively, not negatively"
    ],
    "answer": 2,
    "explanation": "Starks separates value motives, where ESG matters because it is financially material to risk and return, from values motives, which are nonpecuniary preferences. This manager cares only about turnover costs and litigation risk, so the motive is value. A social topic does not make a motive values-based, impact investing requires an intentional focus on E or S outcomes, and the type of screen does not settle the motive."
  },
  {
    "id": "q1-3",
    "ch": 1,
    "oppg": 1,
    "type": "mcq",
    "q": "A firm adds up the financial, social and environmental value of two projects and chooses the one with the higher total, although the other project is more profitable. Which typology in Schoenmaker and Schramade's framework fits best?",
    "options": [
      "Finance as usual, since it maximises a single measure of value",
      "SF 1.0, since profit is maximised subject to S and E constraints",
      "SF 3.0, since social and environmental value rank above profit",
      "SF 2.0, since it optimises integrated value I = F + S + E"
    ],
    "answer": 3,
    "explanation": "SF 2.0 optimises integrated value, I = F + S + E, so a less profitable project can win if it creates more social and environmental value. SF 1.0 would still pick the most profitable project, subject only to minor S and E constraints. SF 3.0 ranks S and E above F rather than adding them with equal weight, and finance as usual looks at F alone."
  },
  {
    "id": "q1-4",
    "ch": 1,
    "oppg": 1,
    "type": "mcq",
    "q": "A beverage company reports (i) how water scarcity could raise its production costs and (ii) how its water extraction affects local communities. Which statement is correct?",
    "options": [
      "(i) is financial materiality (outside-in); (ii) is impact materiality (inside-out)",
      "(i) is impact materiality (inside-out); (ii) is financial materiality (outside-in)",
      "Both are financial materiality, since both can end up affecting cash flows",
      "Both are impact materiality, since both concern the natural environment"
    ],
    "answer": 0,
    "explanation": "Financial materiality runs outside-in: how sustainability issues affect the firm, as when water scarcity raises costs. Impact materiality runs inside-out: how the firm affects people and planet, as with the effect on local communities. An impact can later become financially material, but the classification follows the direction of the effect, so C and D blur the distinction and B reverses it."
  },
  {
    "id": "q1-5",
    "ch": 1,
    "oppg": 1,
    "type": "mcq",
    "q": "Giglio et al. (2025) surveyed about 30,000 Vanguard clients. Nearly half saw no reason to invest in ESG, and on average respondents expected ESG to underperform by about 2% a year. What does the lecture conclude?",
    "options": [
      "ESG demand is return-driven, since most ESG investors expect to outperform",
      "ESG demand is mainly climate hedging, so ESG is best seen as insurance",
      "ESG demand will fade, since few investors will accept lower expected returns",
      "ESG demand is driven far more by values than by expected financial value"
    ],
    "answer": 3,
    "explanation": "Only 6% cited return expectations, while 24% were driven mainly by ethics and 22% by climate hedging, and the average respondent expected ESG to underperform. Investors who buy ESG while expecting lower returns are driven by something other than expected value, so the lecture concludes that demand is driven far more by values. Climate hedging motivates 22%, not most, and the survey says nothing about demand fading."
  },
  {
    "id": "q1-6",
    "ch": 1,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? Under SF 1.0 in Schoenmaker and Schramade's framework, the objective is still to maximise financial value; social and environmental factors enter only as constraints.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "explanation": "True. SF 1.0 is refined shareholder value: maximise F subject to S and E, with F ranked far above S and E and a short horizon. It is still profit maximisation, only with limits such as excluding the worst offenders. Adding F, S and E into one integrated value belongs to SF 2.0."
  },
  {
    "id": "q1-7",
    "ch": 1,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? A manager who, after raising a bank loan, shifts the firm into riskier projects whose losses would fall on the bank is an example of adverse selection.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "explanation": "False. This is moral hazard: one party takes on extra risk that negatively affects the other party once the contract is in place. Adverse selection is taking advantage of undisclosed information when the contract is made, for example hiding how risky the firm already is. Both stem from information asymmetry between principal and agent."
  },
  {
    "id": "q1-8",
    "ch": 1,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? The lecture notes that sustainable finance may accept less diversification than traditional finance, for example by avoiding «sin stocks».",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "explanation": "True. Traditional finance stresses diversification and risk sharing, while sustainable finance sometimes gives up some diversification for good reasons, such as avoiding sin stocks. It also shifts the objective from shareholder value towards stakeholder welfare and directs allocation towards long-term sustainability."
  },
  {
    "id": "q2-1",
    "ch": 2,
    "oppg": 1,
    "type": "mcq",
    "q": "A CFO argues: «Reopening the plant is right, because the jobs and output it saves outweigh the added risk to workers, counted across everyone affected.» Which normative theory is she using?",
    "options": [
      "Ethics of duty, because she applies a rule she believes is universal",
      "Ethical egoism, because she maximises the firm's own self-interest",
      "Virtue ethics, because she asks what a good manager would do",
      "Utilitarianism, because she weighs outcomes for everyone affected"
    ],
    "answer": 3,
    "explanation": "Utilitarianism is a consequentialist theory that judges an act by its outcomes for collective welfare, which is exactly this weighing of benefits and harms across everyone affected. Ethical egoism is also consequentialist but counts only one's own interests. Ethics of duty judges the principle behind the act regardless of outcomes, and virtue ethics focuses on character."
  },
  {
    "id": "q2-2",
    "ch": 2,
    "oppg": 1,
    "type": "mcq",
    "q": "An analyst says: «I won't report the problem in the model. Nobody else on my team would, and I want to fit in.» Which stage of Kohlberg's cognitive moral development does this reasoning reflect?",
    "options": [
      "Stage 3, interpersonal accord and conformity (conventional)",
      "Stage 2, instrumental purpose and exchange (pre-conventional)",
      "Stage 4, social accord and system maintenance (conventional)",
      "Stage 5, social contract and individual rights (post-conventional)"
    ],
    "answer": 0,
    "explanation": "At stage 3, individuals live up to what their immediate peers and those close to them expect, which is the analyst's reason. Stage 2 would rest on a personal deal or exchange, stage 4 on the expectations of society more broadly, and stage 5 on basic rights, values and the social contract."
  },
  {
    "id": "q2-3",
    "ch": 2,
    "oppg": 1,
    "type": "mcq",
    "q": "A factory's emissions add to flood risk decades from now, spread thinly across millions of people in other countries. Which moral intensity factors are low here, making the issue less likely to be recognised as a moral one?",
    "options": [
      "Magnitude of consequences, social consensus and proximity",
      "Temporal immediacy, proximity and concentration of effect",
      "Magnitude of consequences, probability of effect and proximity",
      "Social consensus, temporal immediacy and magnitude of consequences"
    ],
    "answer": 1,
    "explanation": "The harm is decades away (low temporal immediacy), falls on distant people (low proximity) and is spread thinly over many (low concentration of effect). The total magnitude is large because millions are affected, so every option that lists magnitude of consequences as low is wrong. Low moral intensity weakens the first stage of the Rest/Jones model: recognising the moral issue."
  },
  {
    "id": "q2-4",
    "ch": 2,
    "oppg": 1,
    "type": "mcq",
    "q": "A bank employee caught mis-selling says: «Our competitors do far worse, and the regulator criticising us has had its own scandals.» Which rationalisation tactic is this?",
    "options": [
      "Denial of injury",
      "Social weighting",
      "Appeal to higher loyalties",
      "Metaphor of the ledger"
    ],
    "answer": 1,
    "explanation": "Social weighting plays down wrongdoing in two ways: condemning the condemners and making selective social comparisons, and the employee does both. Denial of injury would claim that no one was harmed, an appeal to higher loyalties would invoke a more important cause, and the metaphor of the ledger would claim credit earned by past good behaviour."
  },
  {
    "id": "q2-5",
    "ch": 2,
    "oppg": 1,
    "type": "mcq",
    "q": "A CEO directs a large share of profits to an arts foundation he personally cares about. No customers, employees or shareholders asked for it, and it does not help sales. In Bénabou and Tirole's (2010) terms, this is best described as:",
    "options": [
      "Win-win CSR, since giving builds a reputation that pays off later",
      "Insider-initiated philanthropy, which is an agency problem",
      "Delegated philanthropy, since the firm acts as an agent for society",
      "Delegated philanthropy, since shareholders own the profits given"
    ],
    "answer": 1,
    "explanation": "Insider-initiated corporate philanthropy is management spending other people's money on its own values, an agency problem rather than an ethical achievement. It is not win-win, because the donation does not pay for itself, and it is not delegated philanthropy, because no stakeholder asked the firm to act on their values. Owning the profits does not make shareholders the source of the preference."
  },
  {
    "id": "q2-6",
    "ch": 2,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? Ethical egoism is a non-consequentialist theory, because it focuses on the individual rather than on society as a whole.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "explanation": "False. Ethical egoism is consequentialist: it judges acts by their outcomes, namely the maximisation of one's own interests. It differs from utilitarianism in whose outcomes count, not in whether outcomes count. The non-consequentialist theories are ethics of duty and rights and justice."
  },
  {
    "id": "q2-7",
    "ch": 2,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? In the ethical decision-making framework of Crane et al. (2019), moral intensity and moral framing are individual factors.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "explanation": "False. Moral intensity and moral framing are situational factors of the issue-related kind: they belong to the problem, not the person. Individual factors include age and gender, national and cultural characteristics, education and employment, cognitive moral development, locus of control, personal values, personal integrity and moral imagination."
  },
  {
    "id": "q2-8",
    "ch": 2,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? In the Rest (1986) and Jones (1991) framework, once a person has made a correct moral judgement, moral behaviour follows automatically.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "explanation": "False. Moral judgement is the second of four stages; the person must also establish moral intent and then engage in moral behaviour. Individual and situational factors can break the chain at any stage, so someone can judge correctly and still not act."
  },
  {
    "id": "q3-1",
    "ch": 3,
    "oppg": 1,
    "type": "mcq",
    "q": "A chemical plant's wastewater harms a downstream fishery that neither buys from nor sells to the plant. Compared with the social optimum, the free-market outcome for the plant's product has:",
    "options": [
      "A lower quantity and a higher price, because the harm raises costs",
      "A higher quantity and a higher price, because demand is overstated",
      "The same quantity and price, because the fishery is outside the market",
      "A higher quantity and a lower price, because the harm is left out of cost"
    ],
    "answer": 3,
    "explanation": "The fishery's loss is a negative production externality: marginal societal cost lies above the marginal production cost that sets supply, so the market settles at Qe > Qso and Pe < Pso. A reverses both directions and B gets the price wrong. C confuses 'outside the transaction', which is what makes it an externality, with 'irrelevant'."
  },
  {
    "id": "q3-2",
    "ch": 3,
    "oppg": 1,
    "type": "mcq",
    "q": "A pharmaceutical firm's research creates knowledge that other firms use without paying for it. How is this best classified?",
    "options": [
      "A negative production externality, because rivals gain market share",
      "A positive consumption externality, because patients benefit from drugs",
      "Not an externality, because other firms use the knowledge voluntarily",
      "A positive production externality, because non-paying firms benefit"
    ],
    "answer": 3,
    "explanation": "The benefit arises when the good (research) is produced and reaches firms outside the transaction without payment, so it is a positive production externality; R&D is the lecture's example for this cell. Patients who buy the drug are part of the transaction, so B is not external at all. A mislabels a benefit to others as a harm, and C misses that what defines an externality is the effect on outsiders who do not pay."
  },
  {
    "id": "q3-3",
    "ch": 3,
    "oppg": 1,
    "type": "mcq",
    "q": "A firm can keep its current process (F 20, S −4, E −6) or switch to a cleaner one (F 17, S −1, E −2). What does the integrated value approach imply?",
    "options": [
      "Keep the current process, because its financial value is higher (20 vs 17)",
      "Switch, because integrated value rises from 10 to 14 even though F falls by 3",
      "Switch, because integrated value rises from 10 to 17 once S and E disappear",
      "Be indifferent, because the fall in F exactly offsets the gain in S and E"
    ],
    "answer": 1,
    "explanation": "Integrated value is I = F + S + E: 20 − 4 − 6 = 10 for the current process and 17 − 1 − 2 = 14 for the cleaner one. Switching costs 3 in F but improves S and E by 7, so I rises by 4. A is the finance-as-usual answer, C ignores the S and E costs that remain, and D misjudges the size of the S and E gain."
  },
  {
    "id": "q3-4",
    "ch": 3,
    "oppg": 1,
    "type": "mcq",
    "q": "A country introduces a steep carbon tax, and its cement producers respond by moving production to a neighbouring country without one. Which limitation of internalisation does this illustrate?",
    "options": [
      "Territoriality of jurisdiction",
      "Information asymmetry and greenwashing",
      "Political frictions such as lobbying",
      "Uncertainty about future technology"
    ],
    "answer": 0,
    "explanation": "Regulation stops at the border, so firms can shift production to regions with weaker rules; the lecture's evidence is firms moving production and emissions out of California after its 2013 cap-and-trade programme (Bartram, Hou & Kim 2022). Greenwashing is about misleading outsiders and lobbying about shaping the policy itself. Technology is a source of uncertainty for scenario analysis, not this limitation."
  },
  {
    "id": "q3-5",
    "ch": 3,
    "oppg": 1,
    "type": "mcq",
    "q": "In the Air France-KLM case, how does the airline's EBIT hit from a carbon charge change as its ability to pass the charge on to customers rises from 0% to 100%?",
    "options": [
      "It rises, because higher fares reduce passenger numbers",
      "It stays the same, because the charge depends only on emissions",
      "It falls, but only to half the charge at full pass-on",
      "It falls from the full charge at 0% to zero at 100%"
    ],
    "answer": 3,
    "explanation": "The charge is carbon price × emissions (about EUR 3.3 billion at EUR 100 per tonne), but the EBIT hit is the part the airline cannot pass on: charge × (1 − pass-on rate). B confuses the charge with the hit. A and C have no basis in the case, which adds that pass-on is likely low in a price-competitive industry."
  },
  {
    "id": "q3-6",
    "ch": 3,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? A public firm that sells a polluting plant to a less monitored private buyer can report lower emissions even though total emissions need not fall.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "explanation": "True. Duchin, Gao & Xu (2024) find that selling polluting assets to private firms, which are much less monitored, is a common way for public firms to become 'greener'. The plant keeps operating, so this is the information-asymmetry (greenwashing) limitation, not a real reduction."
  },
  {
    "id": "q3-7",
    "ch": 3,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? Scenario analysis weighs the probabilities of several scenarios, whereas a stress test asks how the company would fare in a drastic scenario.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "explanation": "True. Scenario analysis identifies the most important uncertainties, elaborates scenarios and weighs the probability of each. Stress testing asks 'what if everything goes wrong?'. Both handle uncertainty about technology, policy and consumer behaviour."
  },
  {
    "id": "q3-8",
    "ch": 3,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? In an analysis, a carbon price can be applied to a firm's emissions even if no carbon tax is in place, in order to make its negative externality visible.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "explanation": "True. The Air France-KLM case multiplies emissions by a carbon price regardless of whether such a tax actually exists. That turns the externality into a number that can be compared with EBIT, and the pass-on rate then shows how much of it would hit profits."
  },
  {
    "id": "q4-1",
    "ch": 4,
    "oppg": 1,
    "type": "mcq",
    "q": "Which pairing of critic and criticism of the Business Roundtable's stakeholder statement is correct?",
    "options": [
      "Jensen (2002): the statement is legally incorrect under Delaware law",
      "Mehrotra and Morck (2017): workers should elect 40% of the board",
      "Harvard Law School Forum: managers get to design their own objective",
      "Bebchuk and Tallarita (2020): no method to weigh stakeholders is given"
    ],
    "answer": 3,
    "explanation": "Bebchuk and Tallarita argue that stakeholderists avoid saying who counts, overlook trade-offs and give no method to aggregate interests, leaving all of it to managers. The Delaware argument belongs to the Harvard Law School Forum and the 'own objective function' argument to Jensen. The 40% board rule is from the proposed Accountable Capitalism Act, not Mehrotra and Morck."
  },
  {
    "id": "q4-2",
    "ch": 4,
    "oppg": 1,
    "type": "mcq",
    "q": "According to Hart and Zingales (2017), in which situation is Friedman's advice to maximise market value still right?",
    "options": [
      "When the social activity is separable from profit-making, as with charitable giving",
      "When shareholders are prosocial and the firm's pollution is tied to its technology",
      "When government regulation of the externality is weak or politically blocked",
      "When most shareholders would vote for a cleaner but less profitable technology"
    ],
    "answer": 0,
    "explanation": "If the social activity is separable, the firm can pay out its profit and shareholders can give or act themselves at no loss, so value maximisation is right; corporate charity is their example. B is the non-separable case where Friedman fails. C is their reason for not leaving everything to government, and D is exactly when a shareholder vote departs from value maximisation."
  },
  {
    "id": "q4-3",
    "ch": 4,
    "oppg": 1,
    "type": "mcq",
    "q": "In Hart and Zingales's model, why do prosocial but dispersed shareholders tender to a bidder who plans to turn a clean firm into a dirty one?",
    "options": [
      "Each is unlikely to be pivotal, so none feels responsible for the outcome",
      "Once a bid is announced, prosocial shareholders stop caring about damage",
      "The dirty technology is more socially efficient, so tendering is ethical",
      "Delaware law obliges shareholders to accept any bid above market price"
    ],
    "answer": 0,
    "explanation": "Shareholders weigh damage only when they feel responsible, and a small shareholder is almost never pivotal in a tender offer, so he tenders even if a majority would vote against the switch. This amoral drift pushes public firms towards social indifference, which is why Hart and Zingales want shareholder votes. B misstates their preferences, C contradicts the set-up and D is not a legal rule."
  },
  {
    "id": "q4-4",
    "ch": 4,
    "oppg": 1,
    "type": "mcq",
    "q": "Klarna shrank its workforce as an AI assistant took over customer service, then in 2025 began rehiring human agents. Which reading fits the lecture's account?",
    "options": [
      "It shows that shareholder value and stakeholder interests never conflict",
      "Cost was weighted too heavily over quality, and customers lost out",
      "It shows that stakeholder theory forbids replacing workers with AI",
      "It shows that Friedman's view rules out automation that harms staff"
    ],
    "answer": 1,
    "explanation": "The CEO said Klarna 'went too far': cost had been weighted too heavily over quality, and human agents were rehired so customers could always reach a person. The case is a trade-off between stakeholders, so A is wrong. Neither theory forbids automation outright (C), and Friedman's view favours automation that raises profit (D)."
  },
  {
    "id": "q4-5",
    "ch": 4,
    "oppg": 1,
    "type": "mcq",
    "q": "Which statement best captures Edmans's (2020) 'grow the pie' argument?",
    "options": [
      "Value is fixed, so any gain for stakeholders is a loss for shareholders",
      "Directors should poll shareholders and follow their social preferences",
      "Firms can deliver purpose and profit together by enlarging the pie",
      "Firms should maximise profit and leave social goals to government"
    ],
    "answer": 2,
    "explanation": "Edmans contrasts a pie-growing with a pie-splitting mentality and argues that companies can deliver both purpose and profit. A is the pie-splitting mentality he rejects, B is Hart and Zingales's remedy, and D is Friedman's separation argument."
  },
  {
    "id": "q4-6",
    "ch": 4,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? Hart and Zingales (2017) argue that companies should maximise the welfare of all stakeholders rather than that of their shareholders.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "explanation": "False. They keep shareholders as the principal and argue for maximising shareholder welfare, which includes shareholders' social preferences, instead of market value. Balancing all stakeholders is stakeholder theory, which they do not adopt."
  },
  {
    "id": "q4-7",
    "ch": 4,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? The Harvard Law School Forum analysis calls the Business Roundtable statement necessary, because Delaware law bars directors from considering interests other than shareholders'.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "explanation": "False. It calls the statement legally incorrect, since directors owe fiduciary duties to the shareholders, and unnecessary, since under the business judgement rule directors can already accomplish what the statement intends if they meet their duties of care and loyalty."
  },
  {
    "id": "q4-8",
    "ch": 4,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? Jensen (2002) argues that a stakeholder objective lowers agency costs, because managers must answer to more groups.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "explanation": "False. Jensen argues the opposite: replacing a measurable objective (shareholder value) with a less measurable one (stakeholder value) lets managers design their own objective function and can raise agency costs. Answering to everyone in general means answering to no one in particular."
  },
  {
    "id": "q5-1",
    "ch": 5,
    "oppg": 1,
    "type": "mcq",
    "q": "A firm takes out a bank loan and afterwards switches to a much riskier project, because the lender will bear much of the downside. What is this?",
    "options": [
      "Adverse selection, because information is hidden before the contract",
      "Moral hazard, because behaviour changes after the contract is signed",
      "Adverse selection, because the riskiest borrowers seek loans most eagerly",
      "Moral hazard, because the lender cannot observe the borrower's type"
    ],
    "answer": 1,
    "explanation": "The problem arises after the transaction: the firm alters its behaviour because others bear the cost of its risk-taking. That is moral hazard, in the form of asset substitution. A and C describe adverse selection, which happens before the contract; D puts the right label on an adverse-selection reason (a hidden type rather than a hidden action)."
  },
  {
    "id": "q5-2",
    "ch": 5,
    "oppg": 1,
    "type": "mcq",
    "q": "How can the threat of exit discipline a manager even if shareholders never actually sell?",
    "options": [
      "Anticipating that selling would push the price down, the manager maximises value",
      "Selling transfers the shares' voting rights to the board, which removes the CEO",
      "Exit gives shareholders the right to propose resolutions at the annual meeting",
      "Exit obliges the firm to buy back the shares at their original issue price"
    ],
    "answer": 0,
    "explanation": "Exit works through the share price: if the manager destroys value, shareholders sell, the price falls and the manager is hurt ex post. Knowing this, the manager maximises value ex ante. B and D invent mechanisms, and the right to propose resolutions (C) is a shareholder right that belongs with voice, not exit."
  },
  {
    "id": "q5-3",
    "ch": 5,
    "oppg": 1,
    "type": "mcq",
    "q": "Why does the adaptive markets hypothesis (Lo 2017) help explain why carbon risk may not yet be fully priced?",
    "options": [
      "Efficiency depends on who trades, so new risks are priced only as markets adapt",
      "Prices always reflect all relevant information, so carbon risk is already priced",
      "Markets are efficient for listed assets but never for carbon-intensive firms",
      "Investors are fully rational, so any carbon mispricing is quickly arbitraged away"
    ],
    "answer": 0,
    "explanation": "Under the AMH, prices reflect as much information as the number and nature of distinct groups of market participants allow; with few groups or a new risk the market is less efficient. B is the efficient markets hypothesis (Fama 1970), which the Schoenmaker and Schramade guidelines say to challenge. C and D are claims of neither hypothesis."
  },
  {
    "id": "q5-4",
    "ch": 5,
    "oppg": 1,
    "type": "mcq",
    "q": "Which governance challenge belongs specifically to the stakeholder model (SF 2.0) rather than to finance as usual?",
    "options": [
      "Contracts cannot anticipate every circumstance, externalities included",
      "Major externalities are not fully incorporated in public policy",
      "A narrow focus on shareholder value invites morally dubious decisions",
      "Balancing many stakeholders adds subjectivity and can raise agency costs"
    ],
    "answer": 3,
    "explanation": "The lecture lists balancing all stakeholders, increased subjectivity with potentially higher agency costs, and measuring integrated value as the challenges of SF 2.0. A, B and C are the three challenges of finance as usual: contractual issues, public policy and business ethics."
  },
  {
    "id": "q5-5",
    "ch": 5,
    "oppg": 1,
    "type": "mcq",
    "q": "Which change to executive pay best addresses the lecture's concerns about ESG-linked compensation?",
    "options": [
      "Adding a broad 'improve sustainability' goal to the annual bonus",
      "Moving sustainability targets from the annual bonus into multi-year equity awards",
      "Tying each year's bonus to short-term operational-efficiency targets",
      "Letting the board judge sustainability progress at its own discretion"
    ],
    "answer": 1,
    "explanation": "The concerns are short-term tactical targets, vague discretionary measures and low transparency. Starbucks removed sustainability from its annual bonus and made it a three-year modifier of performance-based equity awards, shifting the incentive to the long term. A and D are the vague discretionary measures the lecture criticises, and C is the short-term tactical focus."
  },
  {
    "id": "q5-6",
    "ch": 5,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? The board practices in the lecture include separating the roles of CEO and chair, or appointing a lead independent director where the roles are combined.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "explanation": "True. Board leadership (CEO not chair, otherwise a lead independent director) is listed under board monitoring, together with board independence, diversity and committees for remuneration, audit and nominations."
  },
  {
    "id": "q5-7",
    "ch": 5,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? The evidence shown in the lecture establishes that linking executive pay to ESG targets causes better ESG performance.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "explanation": "False. The lecture reports only a weak correlation between ESG pay and ESG performance and stresses that it is not causal. Concerns about short-term targets, vague measures and low transparency add to the doubt."
  },
  {
    "id": "q5-8",
    "ch": 5,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? According to the lecture, a stakeholder focus can help create shareholder value, while defining the firm's objective as stakeholder value maximisation can increase agency costs.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "explanation": "True. This is the lecture's conclusion: internalising externalities ex ante can create shareholder value, but an objective defined as stakeholder value adds subjectivity and room for manipulation, such as moral hazard and greenwashing. The distinction is between focus and objective."
  },
  {
    "id": "q6-1",
    "ch": 6,
    "oppg": 1,
    "type": "mcq",
    "q": "Oatly's 2022 figures (USD billion) are sales 0.7, assets 1.2, net profit −0.4 and equity 0.8. In the DuPont decomposition of ROE, what does the ratio 0.7/1.2 = 0.58 measure?",
    "options": [
      "Asset turnover: sales generated per dollar of total assets",
      "Return on assets: net profit earned per dollar of assets",
      "Financial leverage: assets financed per dollar of equity",
      "Net profit margin: net profit earned per dollar of sales"
    ],
    "answer": 0,
    "explanation": "Sales divided by assets is asset turnover. It contains no profit, so it cannot be a return, even though the lecture slide labels it return on assets. Return on assets is net profit / assets (−0.4/1.2 = −33%), leverage is assets / equity (1.5) and the net profit margin is net profit / sales (−57%)."
  },
  {
    "id": "q6-2",
    "ch": 6,
    "oppg": 1,
    "type": "mcq",
    "q": "An analyst covering a food producer ranks ESG issues only by how likely they are to change the firm's growth, costs or cost of capital. She drops issues that matter to local communities but will not affect the firm's cash flows. Which concept is she applying?",
    "options": [
      "Financial materiality, as in SASB's investor-focused definition",
      "Impact materiality, as in GRI's definition of effects on society",
      "Double materiality, as required under the EU's CSRD and ESRS",
      "Transformational impact, as in the three impact criteria"
    ],
    "answer": 0,
    "explanation": "SASB defines material information as what is reasonably likely to be important to investors: the outside-in, financial lens the analyst uses. Impact materiality (GRI) would keep the community issues, and double materiality would require both lenses. Transformational is one of the three impact criteria, not a definition of materiality."
  },
  {
    "id": "q6-3",
    "ch": 6,
    "oppg": 1,
    "type": "mcq",
    "q": "Two firms are in the same industry. Firm X performs well on the sustainability issues that are material for its industry; firm Y performs well only on issues that are immaterial for its industry. What does Khan, Serafeim and Yoon (2016) lead you to expect?",
    "options": [
      "Both outperform, since any ESG strength reduces risk",
      "X outperforms, while Y's ESG strength does not matter",
      "Y outperforms, since immaterial issues are not yet priced",
      "Neither outperforms, since ESG strength is already priced"
    ],
    "answer": 1,
    "explanation": "Khan, Serafeim and Yoon (2016) find that firms performing well on material sustainability issues outperform, while performance on immaterial issues does not matter. Only X's strength should show up in returns. The other options either treat all ESG issues alike or reverse the finding."
  },
  {
    "id": "q6-4",
    "ch": 6,
    "oppg": 1,
    "type": "mcq",
    "q": "A company has made an environmental programme a deliberate part of its strategy and purpose. The programme changes little beyond the company's own sites and has no noticeable effect on its sales, profits, investment or cost of capital. How does its impact score on the three impact criteria?",
    "options": [
      "High on material and transformational, low on intentional",
      "High on material, low on intentional and transformational",
      "High on intentional, low on material and transformational",
      "High on transformational, low on material and intentional"
    ],
    "answer": 2,
    "explanation": "Intentional asks whether the impact is a deliberate choice, part of strategy and purpose, and it is. Material asks whether the impact matters for value drivers such as sales, profits, investment and cost of capital, and it does not. Transformational asks whether the firm drives major change through its business model, technology, scale or standards, which a programme confined to its own sites does not."
  },
  {
    "id": "q6-5",
    "ch": 6,
    "oppg": 1,
    "type": "mcq",
    "q": "A board wants executive pay to follow Schoenmaker and Schramade's seven guidelines for long-term value creation. Which design fits best?",
    "options": [
      "An annual cash bonus tied to next year's earnings per share",
      "A quarterly bonus linked to the share price over the quarter",
      "Pay tied to long-term objectives, with no short-term bonus",
      "A fixed salary only, with no link to any company objective"
    ],
    "answer": 2,
    "explanation": "The seventh guideline is to base incentives for management and employees on meeting long-term objectives and to get rid of short-term variable pay. The annual and quarterly bonuses are exactly the short-term variable pay the guideline removes. A fixed salary removes incentives altogether instead of aligning them with the long term."
  },
  {
    "id": "q6-6",
    "ch": 6,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? Under double materiality, an issue can be material because of the company's effect on people or the environment, even if it is unlikely to affect the company's own cash flows.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "explanation": "True. Double materiality combines financial materiality (outside-in: how sustainability affects the firm, as in SASB) with impact materiality (inside-out: how the firm affects the economy, environment and people, as in GRI). Either lens is enough to make an issue material."
  },
  {
    "id": "q6-7",
    "ch": 6,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? Goodwill is an intangible asset on the balance sheet, but it need not reflect the value of the company's intangible resources, such as its human capital.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "explanation": "True. Intangible assets such as goodwill show up on the balance sheet; intangible resources such as human capital do not. Goodwill is the price paid in an acquisition above the book value of the assets, so it is not necessarily a good reflection of the value of the intangible resources."
  },
  {
    "id": "q6-8",
    "ch": 6,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? Once a company has identified its material ESG issues, the list stays valid, so the materiality assessment does not need to be repeated.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "explanation": "False. Materiality changes over time: Rogers and Serafeim describe the pathways by which sustainability issues become financially material. In the CCBJH case, the firm identified its material issues in 2023 and keeps reviewing them while monitoring for new issues as social conditions change."
  },
  {
    "id": "q7-1",
    "ch": 7,
    "oppg": 1,
    "type": "mcq",
    "q": "A cement producer's new kiln cuts emissions enough to meet the technical screening criteria for climate change mitigation. The plant complies with the OECD Guidelines and the UN Guiding Principles, but it discharges untreated wastewater that significantly harms a river. Under the EU Taxonomy, the activity is:",
    "options": [
      "Aligned, because it substantially contributes to one objective",
      "Aligned, because it complies with the minimum safeguards",
      "Not aligned, because it fails do no significant harm for water",
      "Not aligned, because it contributes to only one of six objectives"
    ],
    "answer": 2,
    "explanation": "Taxonomy alignment requires all three tests: substantial contribution to at least one objective, no significant harm to the other five, and minimum safeguards. The kiln passes the first and third but significantly harms water and marine resources, so it fails DNSH. One objective is enough for the contribution test, and the two 'aligned' answers ignore the DNSH test."
  },
  {
    "id": "q7-2",
    "ch": 7,
    "oppg": 1,
    "type": "mcq",
    "q": "An asset manager wants companies to disclose, in their annual financial filings, how climate change could affect their business, how the board oversees climate risk, and which emission metrics and targets they use. It cares about the effect on firm value, not the firm's impact on society. Which framework is designed for this?",
    "options": [
      "GRI's topic standards",
      "CDP's online platform",
      "Integrated Reporting (IR)",
      "TCFD's recommendations"
    ],
    "answer": 3,
    "explanation": "TCFD is built for investors: four pillars (governance, strategy, risk management, metrics and targets) on climate-related risks and opportunities, disclosed in annual financial filings. GRI takes the impact view for all stakeholders, CDP collects carbon, water and forest data through its own platform, and IR is about value creation across six capitals rather than climate risk in particular."
  },
  {
    "id": "q7-3",
    "ch": 7,
    "oppg": 1,
    "type": "mcq",
    "q": "Company Q replaces a thin sustainability report with a very detailed one, so much more information about Q becomes public. Based on Kotsantonis (2019), what tends to happen to the disagreement among ESG data providers about Q?",
    "options": [
      "It narrows, because raters now start from the same facts",
      "It disappears, because benchmarking against peers stops mattering",
      "It stays the same, because ratings ignore company disclosures",
      "It tends to grow, because disagreement rises with more information"
    ],
    "answer": 3,
    "explanation": "Kotsantonis (2019) finds large disagreement among ESG data providers, and the disagreement increases with the quantity of publicly available information: more information gives raters more to interpret and weigh differently. Benchmarking remains crucial for rankings, and the idea that more facts bring agreement is the intuitive but wrong answer."
  },
  {
    "id": "q7-4",
    "ch": 7,
    "oppg": 1,
    "type": "mcq",
    "q": "According to the PwC guest lecture, how did the EU's Omnibus package (adopted 26 February 2025) change the Corporate Sustainability Reporting Directive (CSRD)?",
    "options": [
      "It narrowed scope to firms with 1,000+ staff and EUR 450m+ turnover",
      "It widened scope from about 12,000 companies to about 50,000 firms",
      "It exempted the largest firms and kept only listed SMEs in scope",
      "It extended reporting duties to every firm with over 250 employees"
    ],
    "answer": 0,
    "explanation": "Post-Omnibus, CSRD covers companies with at least 1,000 employees and net turnover above EUR 450 million, from financial year 2027; the Commission estimates that 80% of previously covered companies fall outside. The widening from about 12,000 to about 50,000 companies describes the earlier move from NFRD to CSRD. The other two options contradict the new thresholds."
  },
  {
    "id": "q7-5",
    "ch": 7,
    "oppg": 1,
    "type": "mcq",
    "q": "A software company with a very small carbon footprint depends on one key supplier in a flood-prone region. What does the PwC guest lecture imply about its physical climate risk?",
    "options": [
      "It is low, because physical risk scales with the firm's own emissions",
      "It can be high, because physical risk can arrive through supply chains",
      "It is a 2050 issue, because the main climate impacts lie decades ahead",
      "It is removed by a net-zero target, since cutting emissions ends exposure"
    ],
    "answer": 1,
    "explanation": "PwC stressed that a company's carbon footprint is irrelevant to its exposure to physical climate risk, which can arise through owned operations, supply chains and customer markets. Climate risk is a today issue, not a 2050 issue, and impacts will worsen for decades regardless of how fast we decarbonise, so a net-zero target does not remove the exposure."
  },
  {
    "id": "q7-6",
    "ch": 7,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? According to the evidence in the lecture, Integrated Reporting beats having no ESG reporting, but a firm that already publishes a stand-alone ESG report gains nothing by switching to Integrated Reporting.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "explanation": "True. The lecture compares four groups: no ESG reporting, stand-alone ESG reporting, ESG reporting in the annual report, and Integrated Reporting. Integrated Reporting is superior to no ESG reporting and to ESG reporting in the annual report, but companies do not benefit from switching from stand-alone ESG reporting to it."
  },
  {
    "id": "q7-7",
    "ch": 7,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? Under CSRD, companies report under ESRS on the basis of double materiality, so a topic can be reportable because of the company's impact on people or the environment even if it is not financially material.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "explanation": "True. CSRD requires reporting under the European Sustainability Reporting Standards (ESRS), based on double materiality and covering impacts, risks and opportunities (IROs). Impact materiality alone is enough, which separates CSRD from investor-focused frameworks such as ISSB and TCFD."
  },
  {
    "id": "q7-8",
    "ch": 7,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? The review of greenwashing research in the lecture concludes that a purely voluntary approach to CSR reporting is the best way to prevent greenwashing.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "explanation": "False. The review finds that an entirely voluntary CSR approach facilitates the diffusion of greenwashing, and proposes a combination of voluntary and mandatory elements to prevent it. That is part of the case for mandatory reporting such as CSRD."
  },
  {
    "id": "q8-1",
    "ch": 8,
    "oppg": 1,
    "type": "mcq",
    "q": "A fund ranks the companies in every sector by ESG rating and holds only the top fifth of each sector, including the highest-rated oil producer. Which strategy is this?",
    "options": [
      "Negative screening, since it removes the worst ESG performers",
      "Best-in-class screening, since it ranks firms within each sector",
      "Thematic investing, since it targets the energy transition trend",
      "Impact investing, since it seeks measurable environmental effects"
    ],
    "answer": 1,
    "explanation": "Ranking firms against their sector peers and admitting those above a hurdle is positive or best-in-class screening, which is why an oil producer can qualify. Negative screening excludes on undesirable activities or sectors, not on relative rank. Thematic investing starts top-down from a trend, and impact investing requires the intention to create and measure impact."
  },
  {
    "id": "q8-2",
    "ch": 8,
    "oppg": 1,
    "type": "mcq",
    "q": "An investor adds a cap on portfolio carbon emissions to a mean-variance optimisation. By the logic of the ESG-efficient frontier, what happens to the highest attainable Sharpe ratio?",
    "options": [
      "It rises, because low-emission stocks carry less systematic risk",
      "It falls or stays the same, depending on whether the cap binds",
      "It stays the same, because emissions are unrelated to returns",
      "It always falls, because any cap removes some diversification"
    ],
    "answer": 1,
    "explanation": "A constraint shrinks the set of portfolios the investor can choose from, and the best portfolio in a smaller set cannot beat the best in the full set. If the optimal portfolio already meets the cap, nothing is lost; if it does not, the Sharpe ratio falls. The cap can never raise it, but it does not always lower it."
  },
  {
    "id": "q8-3",
    "ch": 8,
    "oppg": 1,
    "type": "mcq",
    "q": "Many funds have recently moved from Article 9 to Article 8 under the EU's SFDR. What is the best explanation?",
    "options": [
      "Article 8 is the stricter category, so the move signals more ambition",
      "Article 9 claims a sustainable objective, which is harder to substantiate",
      "Article 9 covers only bond funds, so equity funds had to move to Article 8",
      "Article 8 lets funds drop exclusions, ESG integration and engagement"
    ],
    "answer": 1,
    "explanation": "Article 9 funds have sustainable investment as their objective, with do-no-significant-harm and good-governance requirements, while Article 8 funds only promote environmental or social characteristics. Managers downgraded to avoid accusations of greenwashing. Article 8 is the weaker claim, it is not tied to an asset class, and its typical strategies are exclusions, ESG integration and engagement."
  },
  {
    "id": "q8-4",
    "ch": 8,
    "oppg": 1,
    "type": "mcq",
    "q": "A large passive index fund disagrees with a portfolio company's climate strategy. Which governance mechanism that active investors have is not available to it?",
    "options": [
      "Voting against the board at the annual general meeting",
      "Engaging in dialogue with management on climate targets",
      "Supporting a shareholder resolution filed by other investors",
      "Selling the shares, the exit known as the Wall Street Walk"
    ],
    "answer": 3,
    "explanation": "A passive fund must hold the index, so it cannot sell a company it dislikes: exit is closed. It can still vote, and the lecture marks its room to engage with a question mark rather than a no. Losing exit also weakens its voice, because the threat of exit is part of what gives voice its force."
  },
  {
    "id": "q8-5",
    "ch": 8,
    "oppg": 1,
    "type": "mcq",
    "q": "Which combination describes investing for long-term value creation (LTVC) in Schoenmaker and Schramade's comparison with traditional investing?",
    "options": [
      "Efficient markets view, extremely diversified portfolio, 12-month horizon",
      "Adaptive markets view, extremely diversified portfolio, judged by alpha",
      "Efficient markets view, concentrated portfolio, benchmarked to an index",
      "Adaptive markets view, concentrated portfolio, DCF with internalisation"
    ],
    "answer": 3,
    "explanation": "LTVC rests on the adaptive markets hypothesis (S and E are priced as markets learn), holds more concentrated portfolios and values firms with a DCF that includes scenarios for internalisation, over years or a decade. The efficient markets view, extreme diversification, Sharpe or alpha as the value indicator and a 12-month horizon belong to traditional investing. Each wrong option mixes in at least one traditional feature."
  },
  {
    "id": "q8-6",
    "ch": 8,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? ESG integration means removing companies with low ESG scores from the investable universe.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "explanation": "Removing companies on ESG criteria is negative or exclusionary screening. ESG integration keeps the universe open and feeds material ESG information into the analysis, for example into cash-flow forecasts and cost-of-capital estimates. A low-ESG firm can still be bought if its price is low enough."
  },
  {
    "id": "q8-7",
    "ch": 8,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? In LGIM's stewardship of Glencore, divestment from selected funds came as the final escalation after years of engagement and a shareholder resolution.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "explanation": "LGIM engaged with Glencore on climate from 2016, filed a shareholder resolution on thermal coal in 2023, and after judging progress insufficient put Glencore on the divestment list of selected funds in 2024. Exit came as an escalation of voice, not as an alternative to it."
  },
  {
    "id": "q8-8",
    "ch": 8,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? One design limitation of ESG ratings is that they focus on a company's products rather than its operations.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "explanation": "It is the other way round: Schoenmaker and Schramade criticise ESG ratings for focusing on operations, not products. A firm can score well on how it runs its plants while selling products that do harm. The other design limitations are little focus on materiality, reliance on reported data and policies, and industry-neutral scoring."
  },
  {
    "id": "q9-1",
    "ch": 9,
    "oppg": 1,
    "type": "mcq",
    "q": "Green stocks strongly outperformed brown stocks in recent years. How do Pástor, Stambaugh and Taylor (2022) explain this?",
    "options": [
      "Green stocks bear more climate risk, so they earn a higher risk premium",
      "Climate concerns rose unexpectedly and repriced green stocks upwards",
      "Green stocks are persistently underpriced, so they earn a positive alpha",
      "Investors' taste for green raises green expected returns above brown"
    ],
    "answer": 1,
    "explanation": "Theory says green assets should have lower expected returns, because investors like them (taste premium) and because they hedge climate risk. The outperformance came from unexpected shifts in demand as climate concerns strengthened; purged of those shocks, the green-minus-brown return is essentially flat. A taste premium lowers expected returns rather than raising them, and green assets are the better hedge, not the riskier ones."
  },
  {
    "id": "q9-2",
    "ch": 9,
    "oppg": 1,
    "type": "mcq",
    "q": "An analyst cuts a firm's revenue forecast because of expected litigation and raises its capex to meet new environmental rules, but leaves the discount rate unchanged. Which channel is she using?",
    "options": [
      "The cost-of-capital channel, since litigation makes the firm riskier",
      "A systematic ESG risk factor, priced through the firm's APT beta",
      "The cash-flow channel, since revenues and capital expenditure change",
      "Exclusionary screening, since the firm now fails an ESG criterion"
    ],
    "answer": 2,
    "explanation": "Revenues, costs including litigation, capex and stranded assets make up the cash-flow channel. The cost-of-capital channel, and any priced risk factor, would work through the discount rate, which she leaves untouched. Screening is a portfolio decision, not a valuation channel."
  },
  {
    "id": "q9-3",
    "ch": 9,
    "oppg": 1,
    "type": "mcq",
    "q": "An investor maximises social and environmental value, subject to earning at least a minimum financial return. Which strategy and typology does this match?",
    "options": [
      "Impact investing, which corresponds to SF 3.0",
      "ESG integration, which corresponds to SF 2.0",
      "Exclusionary screening, which corresponds to SF 1.0",
      "Risk/return optimisation, that is, finance as usual"
    ],
    "answer": 0,
    "explanation": "Max SEV subject to a minimum FV is impact investing, the portfolio version of SF 3.0, where S and E are optimised subject to F. ESG integration maximises integrated value FV + SEV (SF 2.0), exclusionary screening maximises FV subject to a minimum SEV (SF 1.0), and finance as usual maximises FV alone."
  },
  {
    "id": "q9-4",
    "ch": 9,
    "oppg": 1,
    "type": "mcq",
    "q": "A passive index investor wants to apply a sustainability method. According to Schoenmaker and Schramade's suitability table, which fits best?",
    "options": [
      "Exclusionary screening, because it can be done on ESG scores",
      "ESG integration, because it needs only index-level ESG data",
      "Impact investing, because an index already holds every firm",
      "Active ownership, because it needs no fundamental analysis"
    ],
    "answer": 0,
    "explanation": "Exclusionary screening is rated medium-high for passive equities because it can be done on scores. ESG integration is rated not at all and impact investing very low for passive investors, since both need fundamental analysis. Active ownership is rated low, and it does need fundamental analysis, which can only be bought externally with some loss of quality."
  },
  {
    "id": "q9-5",
    "ch": 9,
    "oppg": 1,
    "type": "mcq",
    "q": "Under the CAPM, a stock's expected return lies below the security market line given its beta. What does this imply?",
    "options": [
      "It is underpriced with a positive alpha, so its price should rise",
      "It is fairly priced, because beta explains its whole return",
      "It is overpriced with a negative alpha, so its price should fall",
      "It carries an extra risk factor, so its expected return is fair"
    ],
    "answer": 2,
    "explanation": "An expected return that is too low for the asset's risk means investors are paying too much: the asset is overpriced and its alpha is negative. As the price falls, the expected return rises back to the security market line. An underpriced asset would lie above the line, and a fairly priced one would lie on it."
  },
  {
    "id": "q9-6",
    "ch": 9,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? Research Affiliates' long-short tests in Europe (2009 to 2020) found a statistically significant ESG return premium, so ESG qualifies as a systematic factor.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "explanation": "The ESG long-short strategy returned about -0.1% a year, and none of the ESG, E, S or G strategies was statistically significant. The literature is split between studies where ESG adds to returns and studies where it detracts, with no agreed risk-based or behavioural explanation. ESG does not clearly pass the tests of robustness across definitions and geographies."
  },
  {
    "id": "q9-7",
    "ch": 9,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? Cohen, Gurun and Nguyen (2020) find that the energy firms most often excluded from ESG funds produce few and low-quality green patents, which supports blanket divestment.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "explanation": "They find the opposite: oil, gas and energy firms, with low ESG scores and often excluded from ESG funds, produce more and higher-quality green patents. Blanket exclusion may therefore cut capital from key green innovators, and reward-based incentives may work better."
  },
  {
    "id": "q9-8",
    "ch": 9,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? If better ESG performance lowers a firm's cost of capital, investors in high-ESG stocks should expect higher future returns than investors in comparable low-ESG stocks.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "explanation": "The cost of capital is the return investors expect, so a lower cost of capital means a lower expected return. High-ESG stocks can still show higher realised returns when demand shifts unexpectedly towards them, but that is a surprise, not an expectation. Mixing up expected and realised returns is the classic trap here."
  },
  {
    "id": "q10-1",
    "ch": 10,
    "oppg": 1,
    "type": "mcq",
    "q": "A steel producer issues a bond whose proceeds can be used for general corporate purposes. If it has not cut its emission intensity to a set target by a fixed date, the coupon rises. How should the bond be classified?",
    "options": [
      "A green bond, because the target concerns the issuer's emissions",
      "A sustainability bond, because it mixes green and general purposes",
      "A sustainability-linked bond, because the coupon depends on a KPI target",
      "A conventional bond, because the proceeds are not earmarked for any project"
    ],
    "answer": 2,
    "explanation": "The money is free to use, and what is tied to sustainability is the coupon, through a KPI (emission intensity) and a target with a step-up if it is missed. That is a sustainability-linked bond. Green and sustainability bonds earmark the money for projects, so neither fits. The missing earmark does not make the bond conventional, because its terms are tied to a sustainability target."
  },
  {
    "id": "q10-2",
    "ch": 10,
    "oppg": 1,
    "type": "mcq",
    "q": "Why do ESG risks typically matter more for a long-dated bond from a low-rated issuer than for a short-dated bond from a highly rated issuer?",
    "options": [
      "Bondholders bear only the downside, and long maturity and weak credit give ESG risks time and room to cause default",
      "Bondholders share in the upside, so ESG opportunities raise the value of long-dated, low-rated bonds the most",
      "Only low-rated issuers are required to publish ESG data, so investors can assess ESG risks for them alone",
      "Short-dated bonds from strong issuers fall outside the SFDR, so investors may not consider ESG for them"
    ],
    "answer": 0,
    "explanation": "A bond's payoff is asymmetric: the upside is capped at coupons and principal, so ESG matters mainly as credit risk. A risk such as a carbon price or stranded assets needs time to hit cash flows (long maturity) and only hurts the lender if it pushes the issuer into default (weak credit). Bondholders do not share in the upside, and neither disclosure duties nor the SFDR explain the difference."
  },
  {
    "id": "q10-3",
    "ch": 10,
    "oppg": 1,
    "type": "mcq",
    "q": "Which statement about the greenium is correct?",
    "options": [
      "It is the extra yield investors demand for holding a green bond instead of a conventional one",
      "It arises because a green bond gives investors a claim on the green project's cash flows only",
      "It is large because green bonds carry much lower default risk than the issuer's other bonds",
      "It is the lower yield on a green bond than on a comparable conventional bond from the same issuer"
    ],
    "answer": 3,
    "explanation": "The greenium is a yield discount: investors accept a lower return on the green bond than on an otherwise identical conventional bond of the same issuer. A standard green bond is a claim on the whole issuer, so it carries the same credit risk; the discount reflects demand for the label, not lower default risk. An extra yield would be the opposite sign."
  },
  {
    "id": "q10-4",
    "ch": 10,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? The proceeds of a sustainability-linked bond can be used for general corporate purposes; what is tied to sustainability is the bond's terms, such as the coupon.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "explanation": "True. A sustainability-linked bond ties the coupon to the issuer's KPIs and targets, usually with a step-up if a target is missed, but it does not earmark the money. Earmarking is the defining feature of use-of-proceeds bonds such as green bonds."
  },
  {
    "id": "q10-5",
    "ch": 10,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? A firm can issue a green bond without any change in its overall environmental performance.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "explanation": "True. Money is fungible: the firm can finance green projects it would have undertaken anyway and use the freed-up funds elsewhere. The label documents where the bond's money goes, not whether the firm as a whole becomes greener, so investors must also judge the issuer's strategy."
  },
  {
    "id": "q11-1",
    "ch": 11,
    "oppg": 1,
    "type": "mcq",
    "q": "A bank has lent to a coal-fired power producer. A steep new carbon price makes the plant unprofitable long before the end of its planned life. How is the bank's risk best described?",
    "options": [
      "Physical risk, because the plant's emissions contribute to climate change",
      "Physical risk, because a carbon price is a chronic climate hazard",
      "Transition risk, and the plant is at risk of becoming a stranded asset",
      "Operational risk, because the bank's own offices run on coal power"
    ],
    "answer": 2,
    "explanation": "The loss comes from the move to a low-carbon economy (a carbon price), not from climate damage itself, so it is transition risk. A plant that loses its value before the end of its economic life is a stranded asset; for the bank it raises the borrower's default probability and lowers the collateral value. Physical risk would be damage from floods, storms or heat, and the bank's own electricity use is not the channel."
  },
  {
    "id": "q11-2",
    "ch": 11,
    "oppg": 1,
    "type": "mcq",
    "q": "Which statement best describes a climate stress test of a bank's loan book?",
    "options": [
      "It estimates loan losses under severe but plausible climate scenarios, such as those of the NGFS",
      "It measures the bank's own scope 1 and 2 emissions and compares them with its net-zero target",
      "It forecasts the single most likely climate path and holds capital for that path only",
      "It checks whether the bank's green loans meet the taxonomy's technical screening criteria"
    ],
    "answer": 0,
    "explanation": "A stress test translates severe but plausible scenarios, typically from the NGFS, into variables such as carbon prices and property values and maps them onto borrowers' default probabilities and losses. It is not a forecast of the most likely path, it concerns the loan book rather than the bank's own emissions, and checking green loans against taxonomy criteria is classification, not stress testing."
  },
  {
    "id": "q11-3",
    "ch": 11,
    "oppg": 1,
    "type": "mcq",
    "q": "What is the key difference between a green loan and a sustainability-linked loan?",
    "options": [
      "A green loan's margin depends on KPIs, while a sustainability-linked loan funds specific eligible projects",
      "A green loan funds specific eligible projects, while a sustainability-linked loan's margin depends on KPIs",
      "A green loan falls under the SFDR, while a sustainability-linked loan falls under the CSRD",
      "A green loan is a bank product, while a sustainability-linked loan exists only in the bond market"
    ],
    "answer": 1,
    "explanation": "A green loan is a use-of-proceeds instrument: the money goes to eligible projects such as a solar park or an energy-efficient home. A sustainability-linked loan leaves the money free to use and adjusts the interest margin to the borrower's performance on KPIs. Option A swaps the two, neither the SFDR nor the CSRD defines the difference, and the bond-market counterpart is the sustainability-linked bond."
  },
  {
    "id": "q11-4",
    "ch": 11,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? A bank with a very small operational carbon footprint can still be heavily exposed to climate risk through the firms and properties it finances.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "explanation": "True. A bank's own offices emit little; its exposure sits in the loan book, through transition risk at carbon-intensive borrowers and physical risk at borrowers and collateral in exposed locations. Its impact is likewise measured by financed emissions, not by its own operations."
  },
  {
    "id": "q11-5",
    "ch": 11,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? In a hot house world scenario with no new climate policy, transition risk stays low while physical risk grows.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "explanation": "True. Physical and transition risk trade off across the NGFS scenarios. Without new policy there is little transition shock, but climate change continues and physical damage grows; a disorderly transition, by contrast, brings high transition risk."
  },
  {
    "id": "q12-1",
    "ch": 12,
    "oppg": 1,
    "type": "mcq",
    "q": "An insurer sees more frequent flood claims on its home insurance. At the same time, the coal-company bonds in its portfolio fall in value after a new carbon tax. Which classification is correct?",
    "options": [
      "Both are physical risks: climate damage shows up on each side of the balance sheet",
      "Both are transition risks: climate policy shows up on each side of the balance sheet",
      "The claims are physical risk in underwriting; the bond losses are transition risk in investing",
      "The claims are transition risk in investing; the bond losses are physical risk in underwriting"
    ],
    "answer": 2,
    "explanation": "Flood claims come from climate damage itself and hit the liability side, where the insurer carries risk for premiums: physical risk in underwriting. The bonds lose value because of climate policy, which is transition risk on the asset side, where the insurer invests its premiums. The case shows the double hit: climate change can strike both sides at once."
  },
  {
    "id": "q12-2",
    "ch": 12,
    "oppg": 1,
    "type": "mcq",
    "q": "What is the insurance protection gap?",
    "options": [
      "The difference between the premiums an insurer collects and the claims it pays in a year",
      "The shortfall between an insurer's investment assets and its long-term liabilities",
      "The part of the economic losses from disasters that is not covered by insurance",
      "The gap between an insurer's capital and the capital its supervisor requires"
    ],
    "answer": 2,
    "explanation": "The protection gap is the uninsured share of economic losses. It widens when cover becomes unaffordable or insurers withdraw from high-risk areas, and the loss then falls on households, firms and ultimately taxpayers. Premiums minus claims is underwriting profit, and the other two options describe an insurer's solvency, not a gap in society's cover."
  },
  {
    "id": "q12-3",
    "ch": 12,
    "oppg": 1,
    "type": "mcq",
    "q": "Most non-life policies run for one year and can be repriced at renewal. What follows for physical climate risk?",
    "options": [
      "Repricing shifts the risk to policyholders and governments, and rising premiums widen the protection gap",
      "Repricing removes the risk entirely, so physical climate risk is only a reputational issue for insurers",
      "Repricing is not allowed for climate-related perils, so insurers are locked into today's premiums",
      "Repricing matters only for life insurers, whose long contracts are renewed and repriced each year"
    ],
    "answer": 0,
    "explanation": "Annual contracts let a non-life insurer raise premiums or withdraw as risk rises, which protects its balance sheet in the short run. But the risk does not disappear: it moves to households, firms and governments, and the insurer's market shrinks as cover becomes unaffordable. Life contracts run for decades rather than one year, and option C describes a restriction that does not generally exist."
  },
  {
    "id": "q12-4",
    "ch": 12,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? Climate change affects insurers only through the underwriting side, because physical damage leads to claims.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "explanation": "False. Underwriting is hit by physical risk through claims, but the investment side is also exposed: fossil-fuel holdings can strand under transition risk, and real estate the insurer owns can be damaged. The danger is a double hit, where one scenario raises claims and lowers asset values at the same time."
  },
  {
    "id": "q12-5",
    "ch": 12,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? A risk-based insurance premium can discourage building in flood-prone areas, which makes it a form of internalisation.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "explanation": "True. A premium that reflects flood risk makes a hidden cost visible to the person who creates the exposure, much as a carbon price does for emissions. The signal weakens if premiums are capped or subsidised, or if full cover removes the incentive to adapt (moral hazard)."
  },
  {
    "id": "q13-1",
    "ch": 13,
    "oppg": 1,
    "type": "mcq",
    "q": "A government wants certainty about the total quantity of emissions. Which instrument delivers that, and what is left uncertain?",
    "options": [
      "A carbon tax, which leaves the carbon price uncertain",
      "A carbon tax, which leaves the quantity of emissions uncertain",
      "Cap-and-trade, which leaves the carbon price uncertain",
      "Cap-and-trade, which leaves the quantity of emissions uncertain"
    ],
    "answer": 2,
    "explanation": "Cap-and-trade, such as the EU ETS, fixes the total quantity through the number of allowances and lets the market set the allowance price, so the price is what is uncertain. A carbon tax does the opposite: it fixes the price per tonne, and the quantity emitted depends on how firms respond. Options A and D mix up which variable each instrument fixes."
  },
  {
    "id": "q13-2",
    "ch": 13,
    "oppg": 1,
    "type": "mcq",
    "q": "An asset manager commits to six principles for incorporating ESG issues and to report on its progress. It faces no legal penalty if it falls short and can leave at any time. What has it most likely joined?",
    "options": [
      "The EU Taxonomy for sustainable activities",
      "The Corporate Sustainability Reporting Directive",
      "The UN Principles for Responsible Investment",
      "The Sustainable Finance Disclosure Regulation"
    ],
    "answer": 2,
    "explanation": "The UN PRI is a voluntary investor initiative built on six principles; signatories report on implementation, but there is no legal penalty and they can withdraw. The Taxonomy, the CSRD and the SFDR are EU law: binding for those in scope, and not something a firm joins or leaves."
  },
  {
    "id": "q13-3",
    "ch": 13,
    "oppg": 1,
    "type": "mcq",
    "q": "Which statement best describes integrated thinking?",
    "options": [
      "Publishing financial and sustainability information together in one combined annual report",
      "Maximising financial value first and then offsetting the social and environmental harm",
      "Letting social and environmental goals replace financial viability as the firm's objective",
      "Managing financial, social and environmental value together in the firm's core decisions"
    ],
    "answer": 3,
    "explanation": "Integrated thinking is a management practice: strategy, capital allocation and pay take financial, social and environmental value into account together. A combined report is integrated reporting, which describes the result. Maximising financial value first is closer to finance as usual or SF 1.0, and even SF 3.0 keeps financial value as a constraint rather than dropping it."
  },
  {
    "id": "q13-4",
    "ch": 13,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? In the EU framework, the SFDR sets sustainability disclosure duties for companies, while the CSRD sets them for asset managers, pension funds and insurers.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "explanation": "False: the two are swapped. The CSRD requires companies to report on sustainability with double materiality, and the SFDR requires financial market participants such as asset managers, pension funds and insurers to disclose how their products handle sustainability (Articles 8 and 9). Investors rely on company reporting to fill their own disclosures."
  },
  {
    "id": "q13-5",
    "ch": 13,
    "oppg": 1,
    "type": "mcq",
    "q": "True or false? If social and environmental costs are gradually charged to firms, a firm that optimises integrated value today is less exposed to stranded assets than one that maximises financial value only.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "explanation": "True. Under full internalisation a firm's financial value converges to its integrated value (F + S + E), so processes with large social and environmental costs lose value. In the chapter 3 example the original process falls from F 15 to 9 while the optimised one keeps 12; the firm that chose on integrated value has already avoided the asset that strands."
  }
];
