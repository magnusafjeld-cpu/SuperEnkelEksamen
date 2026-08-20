# FIE402 — Course outline and exam DNA

Read together with docs/fie402-forfatterspek.md. This file tells you what your chapter must cover, what the reader
already knows when he reaches it, and which real exam questions it must prepare him for.

---

## The exam you are preparing him for

**FIE402 Corporate Finance (E), NHH. 7.5 ECTS. Autumn 2026, course responsible Andrey Kurbatov.**

3-hour closed-book school exam, pen and paper. Written in English, answered in English.
Calculator and one bilingual dictionary permitted. Grade A–F on the total; no requirement to
pass each exercise. Textbook is Berk & DeMarzo 6th ed. (the reader does not own it).

**The format changed in 2024.** Kurbatov's two papers (H2024, H2025) are what the reader will
face:

- **6 exercises, 100 points, no multiple choice**, points stated per sub-question
- Two pure discussion exercises worth 12 points each, with explicit sentence budgets
  ("2–3 sentences per action", "4–6 sentences is usually enough")
- H2025 asked for **4 decimal places** of precision
- ~1.8 minutes per point. Multi-part questions build on each other, so one arithmetic slip
  cascades. This is where points are lost.

H2024 exercises: M&A (verbal, synergies banned as an answer) · Governance (verbal) ·
MM without taxes and recapitalisation · Risk shifting and hedging · Twin firm → rU → rE → WACC →
value by WACC **and** APV · Real option with risk-neutral valuation.

H2025 exercises: Black-Scholes intuition (verbal, no computation) · Governance (verbal) ·
MM without taxes, dividends and recapitalisation · WACC ⇔ APV over two periods in 9 steps ·
Real options (value of information, exit option, indifference point) · M&A (implied deal
probability from market prices).

### Topic frequency across 11 papers (2015 → H2025)

| Topic | Hits | Note |
|---|---|---|
| Unlever/relever beta, twin firm, CAPM, MM II | 11/11 | Never absent |
| MM I & II in perfect markets, recapitalisation | 11/11 | Never absent |
| WACC method **and** APV method on the same case | 11/11 | Usually the biggest single exercise |
| Real options | 8/11 | Fixed item since 2017; 20 points in both Kurbatov papers |
| M&A: share exchange, premium, implied deal probability | 8/11 | 20–32 points in Kurbatov papers |
| Debt and equity as options, credit risk, CDS | 8/11 | Absent from Kurbatov papers so far |
| Asymmetric information, Myers-Majluf, pecking order | 8/11 | **Absent from both Kurbatov papers** but still on the syllabus — cover it, flag the risk |
| Risk shifting (asset substitution) | 5/11 | H2024 Exercise 4 |
| Debt overhang and renegotiation | 5/11 | |
| Payout policy: dividends vs repurchases | 7/11 | |
| Binomial model, risk-neutral valuation | 7/11 | |
| Corporate governance | 5/11 | **Guaranteed 12 points in the new format** |
| Trade-off theory, distress costs | 3/11 | |
| Issuance: IPO, SEO, underpricing | 4/11 | |
| Put-call parity | 4/11 | |
| Black-Scholes numerically | 2/11 | Formula sheet dropped N(d) tables in 2021 — intuition only now |
| Convertible debt, FTE, leasing, duration, auctions, DDM | 1–3/11 | Cheap to cover, low priority |

### The formula sheet handed out at the exam

FCF = EBIT(1−τc) + Depreciation − CapEx − ΔNWC + Other · PV of perpetuity and growing perpetuity ·
CAPM · rE = rU + (D/E)(rU − rD) · βU weighting · pre-tax and after-tax WACC · binomial replication
(Δ, and the risk-neutral form with ρ) · M&A stock swap NPVs and the exchange-ratio bound.

**Not on the sheet, must be memorised:** V^L = V^U + PV(TS); which rate discounts the tax shield;
D_t = d·V_t^L; put-call parity; βE = N(d1)(V/E)βU; duration formulas; the Myers-Majluf setup;
everything about real options.

### What the examiner rewards (from the solution keys)

1. **Naming the mechanism.** Not just computing — writing "this is debt overhang", "asset
   substitution", "the coinsurance effect".
2. **Consistency checks**, which the examiner performs and expects: WACC value = APV value;
   weighted average of βE and βD = βU; total gain to creditors and shareholders = the project's
   NPV; creditors' gain = shareholders' loss.
3. **Checking whether the equilibrium is rational** in information problems — computing α is not
   enough.
4. **Shown calculations.** H2017 states plainly: no calculation, no points.
5. On verbal questions, credit for reasonable, well-explained answers; H2025 gives bonus for
   creativity.

Errors called out explicitly in the keys: using 100 instead of 100×1.03 as a certainty
equivalent; rounding drift beyond ~0.001; confusing stand-alone NPV with the change in equity
value; believing shareholders gain from reducing debt when creditors capture more than the
efficiency gain.

---

## Chapter map

Each chapter is one `<section id="kN">`. Part headings go in `<h2 class="part">`.

### Part 0 — Foundations (k0–k5)
The reader has a bachelor in business administration and remembers *that* NPV and CAPM exist,
but cannot use them fluently. Rebuild from the ground up, fast but complete.

- **k0 · The course, the exam, and how to use this manual.** What corporate finance asks: how
  firms finance themselves and how financing interacts with value. The three parts of the course.
  The exam format above, in detail: 6 exercises, 100 points, 3 hours, the point budget per
  minute, what the formula sheet gives you and what it does not. How to write an answer that
  scores: state the method, show the computation, name the mechanism, run the consistency check.
  The five consistency checks, listed once here and referenced throughout.
  *No heavy maths. This chapter sets habits.*
- **k1 · Time value, NPV and investment rules.** Discounting, perpetuities, growing perpetuities,
  annuities. NPV rule and why it dominates IRR and payback. Where each formula on the exam sheet
  comes from. Common exam use: valuing a perpetual cash flow stream, annuity-based real options.
- **k2 · Free cash flow.** Building FCF from EBIT: taxes, depreciation add-back, CapEx, ΔNWC.
  Why interest never enters FCF. NWC as a percentage of sales. Inventory reductions as a positive
  ΔNWC effect. Terminal value with growth. *Exam use: 2021 P3, 2022 P3, 2017V P4.*
- **k3 · Risk, return and the CAPM.** Systematic vs diversifiable risk, why only systematic risk
  is priced, the security market line, beta as a covariance measure. Reading a beta off a
  comparable. *Exam use: every paper.*
- **k4 · Cost of capital and the unlever/relever toolkit.** rE, rD, rU. The weighted-beta identity.
  Pre-tax WACC = rU. After-tax WACC. **The twin-firm routine**, step by step, as a named
  procedure the reader will use in almost every exam: comparable's rE → βE via CAPM →
  βU by weighting → rU via CAPM → relever to own D/E → rE → WACC. Non-zero debt beta.
  *This is the single most examined skill in the course — give it the most worked examples.*
- **k5 · Debt, yields and credit spreads.** Zero-coupon and coupon bonds, YTM, promised vs
  expected return, default probability, credit spread, expected return on risky debt
  rD = y − p·L. Sets up k24. *Exam use: 2021 MC7–9, V2024 P3.*

### Part I — Capital structure (k6–k11)
- **k6 · MM I and II in perfect markets.** The assumptions and what each one does. Proposition I
  (value is independent of capital structure) with the arbitrage argument. Proposition II
  derived. **Recapitalisation mechanics in full**: issue debt, repurchase shares; value
  unchanged, share price unchanged, shares repurchased = D/P; the announcement vs execution
  distinction; dividend per share and ex-dividend price; comparing the payoff of a shareholder
  who sold against one who held. *This is H2024 E3 and H2025 E3, 18 points each — the chapter
  must be able to answer them completely.*
- **k7 · Corporate taxes and the interest tax shield.** Interest deductibility, TS = τc·rD·D,
  V^L = V^U + PV(TS), the permanent-debt case V^L = V^U + τc·D. Who capture the gain, and the
  share price jump at announcement. The one-year tax shield case. *Exam use: 2022 P1, 2023 P1,
  2021 MC3, 2015 P3.*
- **k8 · Financial distress, bankruptcy costs and the trade-off theory.** Direct and indirect
  costs, who bears them, why they are anticipated in the price today. Personal taxes and the
  effective tax advantage. The trade-off curve and the optimal leverage figure.
- **k9 · Agency costs of debt I: risk shifting.** State-by-state equity payoff E = E[max(CF−K,0)].
  Choosing between projects with and without debt. Finding the debt level at which management is
  indifferent. **Quantifying the agency cost** as first-best value minus chosen value. Whether
  shareholders accept a zero-NPV hedge. *H2024 E4 and V2024 P1 are exactly this, 18–52 points.*
- **k10 · Agency costs of debt II: debt overhang and renegotiation.** Why shareholders decline a
  positive-NPV project when debt is risky. Renegotiating the face value so both sides gain, and
  the check that **total gain equals the project's NPV**. Covenants, seniority, convertible debt
  as a disciplining device. *Exam use: 2017V P3, 2017H P1 and P4, 2021 P2.*
- **k11 · Agency benefits of debt, and the theories combined.** Free cash flow and empire
  building, debt as commitment. Assembling trade-off + agency + information into one framework:
  what predicts leverage in practice, and how to argue it in an exam answer.

### Part II — Information and issuance (k12–k14)
- **k12 · Asymmetric information: Myers-Majluf.** The full template: α = I/(E[V | beliefs] + NPV);
  payoff to old shareholders = (1−α)(V_true + payoff); issue if that exceeds V_true; then
  **check whether investors' beliefs are rational**. Pooling and separating outcomes. Why the
  outcome can be inefficient even when beliefs are rational. *Repeated almost identically in
  2016 P1, 2017V P1, 2020 P2, 2022 P2, 2023 P4 — the reader should recognise it instantly.*
- **k13 · Pecking order, signalling and market timing.** The order internal → debt → equity and
  what it does and does not assume. Debt vs equity under private information (2021 P1). The
  market reaction to an equity issue. Spin-offs as signals.
- **k14 · Raising capital: IPO and SEO.** The process, underwriting spread, net proceeds,
  underpricing and its cost to the issuer, the winner's curse explanation, long-run performance.
  Rights issues. *Exam use: 2016 MC8–9, V2024 (six of ten MCs came from this lecture's exercise).*

### Part III — Payout policy (k15–k16)
- **k15 · Dividends vs repurchases in a perfect market.** Payout irrelevance, the ex-dividend
  price drop, the arithmetic of a repurchase, why the two are equivalent when markets are perfect.
- **k16 · Payout with frictions.** Taxes and the dividend puzzle, clienteles, signalling,
  the agency argument for paying out free cash flow, share repurchase methods including the
  fixed-price tender offer.

### Part IV — Valuation with leverage (k17–k20)
- **k17 · The WACC method.** Discounting FCF at the after-tax WACC, the constant D/V assumption,
  V^L = FCF/(rwacc − g), period-by-period discounting, and the backwards variants the exam
  likes: solving for g, solving for a break-even price. *Exam use: 2016 MC3, V2024 P2.*
- **k18 · The APV method.** V^U first at rU, then PV(TS) added. **Which rate discounts the tax
  shield, and why** — rU under constant D/E, rD or rf under fixed permanent debt. The
  APV multiple-choice question appeared in all eight papers that had multiple choice; the reader
  must be able to state the rule cold. Fixed amortisation schedules, debt scaled to FCF.
- **k19 · FTE, debt policy and debt adjustments.** Flow to equity. The constant-D/V simultaneity
  problem, D_t = d·V_t^L. **Debt adjustment between periods** when V^L falls — H2025 E4(f),
  a step almost everyone gets wrong. Choosing the method for the situation.
- **k20 · A full valuation, end to end.** One long case worked completely: build FCF from
  projections, unlever a comparable, relever, compute WACC, value by WACC, value by APV, show
  the two agree, add excess cash. Structured exactly like H2025 Exercise 4's nine steps.

### Part V — Options (k21–k25)
- **k21 · Option basics.** Calls and puts, payoff and profit diagrams, moneyness, intrinsic and
  time value, the bounds (a call is worth at most S), **put-call parity** C = P + S − PV(K),
  and how the exam uses parity numerically. *Exam use: 2023 MC9–10, V2024.*
- **k22 · The binomial model and risk-neutral valuation.** Replication: Δ = (Cu−Cd)/(Su−Sd),
  B = (Cd − Sd·Δ)/(1+rf), C = SΔ + B. The risk-neutral probability
  ρ = [(1+rf)S₀ − Sd]/(Su − Sd) and why real probabilities never appear. Two-period trees.
  Backing risk-neutral probabilities out of observed prices. *Exam use: 2022 P4, H2024 E6.*
- **k23 · Black-Scholes and volatility.** The formula, what N(d1) and N(d2) mean, and above all
  **the comparative statics** — especially that option value rises with volatility. The formula
  sheet no longer includes N(d) tables, so the exam now tests intuition: H2025 Exercise 1 asked
  what happens to a call's value if true volatility is lower than implied, and what to do about
  a mispriced option. Cover implied volatility as the answer to that question.
- **k24 · Equity and debt as options.** Equity as a call on firm value, debt as risk-free debt
  minus a put (equivalently firm value minus a call). Yield to maturity and credit spread from
  option values. βE = N(d1)(V/E)βU. Credit default swaps priced off the risk-neutral default
  probability. Convertible debt. Coinsurance in mergers, state by state.
  *Exam use: 2015 P4 (90 points), 2016 P4, 2021 MC7–9, V2024 P3 and P4.*
- **k25 · Real options.** The option to wait, and why a positive NPV today can still mean wait.
  Value of the option to wait = Σp_i·max(0,NPV_i)/(1+r) − max(0,NPV_now). **Value of perfect
  information** = E[max(0,NPV_i)] − max(0,E[NPV]), and how a one-year delay changes it.
  The option to abandon or exit, replacing a perpetuity with a truncated annuity. Switching
  costs. Solving for the indifference point. Decision trees, drawn.
  *Exam use: 2017H MC1–5, 2020 P3, 2021 P4, 2023 P3, H2024 E6, H2025 E5. Fixed 20-point item.*

### Part VI — Transactions and governance (k26–k27)
- **k26 · Mergers and acquisitions.** Motives that are real and motives that are not — and note
  that H2024 explicitly **banned synergies as an answer**, so the reader needs the others:
  undervaluation, agency and empire building, market power, tax, diversification and coinsurance,
  managerial hubris, disciplinary takeovers. Stock-swap arithmetic: new shares x = ER·N_T,
  P_new = (A+T+S)/(N_A+x), target's ownership y, NPV to acquirer and target, the maximum
  exchange ratio, **actual premium vs offered premium**. EPS after the merger and why EPS
  accretion is not value creation. Implied synergies from the announcement reaction. **Deriving
  the market's implied probability that a deal closes** from the long-short strategy — H2025
  Exercise 6, 20 points.
- **k27 · Corporate governance.** The agency problem between managers and shareholders.
  Monitoring: the board (composition, independence, committees), large blockholders,
  institutional investors, auditors, analysts, lenders, the market for corporate control.
  Shareholder tools: voting, proxy fights, shareholder proposals, activism, selling out,
  litigation, engaging the board, compensation design. Takeover defences (poison pill,
  staggered board, golden parachutes) and whose interest they serve. LBOs as a governance
  mechanism. Say-on-pay and regulation. *Guaranteed 12-point verbal exercise. H2025 Exercise 2
  asked what a 5–10% blockholder can do about a shirking CEO — three actions, four points each.
  Give the reader a repertoire of at least eight actions he can explain in three sentences.*

### Part VII — Exam craft (k28)
- **k28 · Answering the exam.** The six-exercise anatomy. A time budget per exercise. Answer
  templates for the recurring question types: the twin-firm valuation, the recapitalisation,
  the real option, the state-by-state agency problem, the M&A swap, and the two verbal exercise
  types. What a 12-point verbal answer looks like versus a 6-point one. The five consistency
  checks as a closing ritual. The specific errors the solution keys call out. Rounding
  discipline (4 decimals for rates). What to do when you are stuck on a chained sub-question:
  carry a symbol forward and state the assumption.

### Reference (k29)
- **k29 · Formula reference.** *Special structure — see the reference-chapter spec.* Sections
  numbered `29.1`, `29.2`, … each immediately followed by a sibling `<table class="data">` with
  exactly three columns: **Concept | Formula | Key point**. These rows are converted into
  flashcards and feed two mini-games, so every row must stand alone as a study item. Grouping:
  29.1 Time value and cash flow · 29.2 Risk and cost of capital · 29.3 Capital structure and
  the tax shield · 29.4 Agency and information · 29.5 Valuation with leverage · 29.6 Options ·
  29.7 Credit risk · 29.8 Real options · 29.9 Mergers and acquisitions.
  **Order is permanent** — flashcard identities are positional, so reordering later destroys the
  reader's spaced-repetition history.
