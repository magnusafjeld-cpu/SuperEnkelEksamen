# FIE402 — Core curriculum ("Kjernepensum") authoring spec

READ THIS FULLY BEFORE WRITING. Then read `docs/fie402-forfatterspek.md` §1, §3, §4 and
**all of §9** (notation, course conventions and the errors earlier audits found; they
apply here unchanged). The exam DNA is in `docs/fie402-kursplan.md`.

---

## 1. What this is

The platform has a 109 000-word manual for FIE402 Corporate Finance (`FIE402_Manual.html`,
30 chapters, ~30 hours). The core curriculum is a **separate, short reading path of about
12 000 words**, one evening of work, that gives a solid understanding of what the exam
tests. The reader uses it in two situations:

1. **Before he tries exam exercises on his own**, to know the building blocks well enough
   to start.
2. **When there is very little time left before the exam**, to read the essentials once.

It is fine that the reader does not know the whole syllabus after this. It is not fine
that he misses something central. That trade-off is the whole job: every sentence must
earn its place by what it is worth on the exam.

**The manual is the source.** Condense it; do not invent new material. Every claim,
convention and formula must match what the manual says (the manual has been audited
several times). Where you shorten, keep the mechanism and drop the elaboration. You may
reuse the manual's worked examples with their numbers (shortened), which is often the
best choice because they are verified. The minicase must be new (see §6).

**Organised by exam building block, not by chapter.** The twelve parts below follow the
things the exam asks, and each lists the manual chapters it condenses.

The reader: a Norwegian master's student at NHH with a bachelor in business administration.
He has no textbook. Address him as "you". English throughout (the exam is in English), same
notation and conventions as the manual.

## 2. The twelve parts

Word budgets are for the `html` only (checks and minicase come on top). ±15% is fine.
Going far over defeats the purpose; if you cannot fit something, say so in your report
rather than overflowing.

| id | Title | Manual | Words | Checks |
|---|---|---|---|---|
| kj0 | The exam in one page | k0, k28 | 400 | 2 |
| kj1 | Cost of capital and the twin-firm routine | k3, k4 (k1) | 1 000 | 3 |
| kj2 | Modigliani-Miller, recapitalisations and payout | k6, k15, k16 | 1 250 | 4 |
| kj3 | Taxes, the interest tax shield and the trade-off | k7, k8 | 800 | 3 |
| kj4 | Valuing a levered firm: WACC, APV and FTE | k17, k18, k19, k20, k2 | 1 300 | 4 |
| kj5 | Agency costs of debt: risk shifting and debt overhang | k9, k10, k11 | 1 000 | 3 |
| kj6 | Asymmetric information and raising capital | k12, k13, k14 | 1 200 | 4 |
| kj7 | Options: payoffs, parity, binomial pricing, Black-Scholes | k21, k22, k23 | 1 200 | 4 |
| kj8 | Debt and equity as options, and credit risk | k5, k24 | 850 | 3 |
| kj9 | Real options | k25 | 950 | 3 |
| kj10 | Mergers and acquisitions | k26 | 1 000 | 3 |
| kj11 | Corporate governance | k27 | 750 | 3 |

### What each part must contain

**kj0 · The exam in one page** (no minicase, no "Must know" box)
- The format: 6 exercises, 100 points, 3 hours, ~1.8 minutes per point, pen and paper,
  calculator, answered in English, no multiple choice since 2024. Two verbal exercises
  of 12 points with sentence budgets; governance is one of them every time.
- What recurs: a compact table of the 11/11 topics and the 8/11 topics from the frequency
  table in the course plan, each pointing to its core part (write "kj4" etc.).
- How to score: state the method, show the computation, name the mechanism, run the check.
  The five consistency checks, numbered exactly as in forfatterspek §9.1.
- What the formula sheet gives you and the short list you must memorise.
- How to use this path: parts 1–4 are one chain (the valuation machine); 5–11 can be read
  in any order.

**kj1 · Cost of capital and the twin-firm routine**
- CAPM and why only systematic risk is priced (two sentences). Beta of a portfolio is the
  value-weighted average.
- r<sub>E</sub>, r<sub>D</sub>, r<sub>U</sub>; the weighted-beta identity without taxes (course
  convention); pre-tax WACC = r<sub>U</sub> under the course convention; MM II
  r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>); after-tax WACC.
- β<sub>D</sub> from r<sub>D</sub> via CAPM, and the direction of the β<sub>D</sub> = 0 error (§9.4).
- **The twin-firm routine as numbered steps**, with one complete short worked example.
- Traps: D/E versus D/V, the (1 − τ) unlevering formula this course rejects, forgetting to
  reprice r<sub>D</sub> when leverage changes; check 2 is an identity if you relevered from
  the same β<sub>U</sub>.

**kj2 · Modigliani-Miller, recapitalisations and payout**
- Perfect-market assumptions in one list. MM I with the homemade-leverage argument in a few
  sentences. MM II: risk moves to equity, WACC stays at r<sub>U</sub>.
- **Recapitalisation mechanics**: announcement versus execution, price unchanged without
  taxes, shares repurchased = cash/price, new D/E, relever r<sub>E</sub> with the new
  r<sub>D</sub>. The same cash as a special dividend: ex-dividend price, and why the
  investor is indifferent (homemade dividend). One compact worked example covering both.
- Payout in a perfect market: dividends and repurchases are equivalent; EPS changes, value
  does not.
- Payout with frictions, short: the tax disadvantage of dividends, clienteles, signalling
  and dividend smoothing, paying out free cash flow as an agency remedy, the repurchase
  methods (open market, fixed-price tender, Dutch auction).
- Exam: H2024 E3 and H2025 E3 (18 points each).

**kj3 · Taxes, the interest tax shield and the trade-off**
- Interest deductibility, TS = τ<sub>c</sub> × interest, V<sup>L</sup> = V<sup>U</sup> + PV(TS),
  permanent debt PV(TS) = τ<sub>c</sub>D. Who captures the gain and when: the price jumps at
  announcement, and the repurchase happens at the new price. One worked example.
- After-tax WACC falls with leverage (one line; the discount-rate rule is in kj4).
- Financial distress: direct and indirect costs, and that shareholders bear them up front
  through the price. The trade-off: V<sup>L</sup> = V<sup>U</sup> + PV(TS) − PV(distress costs),
  optimal leverage. Personal taxes in one or two sentences at most.

**kj4 · Valuing a levered firm: WACC, APV and FTE**
- FCF from EBIT (formula sheet), and why interest never enters FCF.
- WACC method with constant D/V: V<sup>L</sup> = FCF/(r<sub>wacc</sub> − g) and period by period;
  D<sub>t</sub> = d·V<sup>L</sup><sub>t</sub>.
- APV: V<sup>U</sup> at r<sub>U</sub> plus PV(TS). **The rule for the rate on the tax shield,
  stated so it can be recited:** r<sub>U</sub> under constant D/E, r<sub>D</sub> (or
  r<sub>f</sub>) under fixed or permanent debt.
- FTE in a few lines: FCFE = FCF − (1 − τ<sub>c</sub>) × interest + net borrowing, at
  r<sub>E</sub>.
- The debt adjustment between periods when V<sup>L</sup> changes (H2025 E4(f)).
- Equity = V<sup>L</sup> − D (+ excess cash), price per share.
- WACC = APV as check 1, described honestly (§9.2b: a fixed point that catches the wrong
  shield rate and arithmetic slips). One worked example where both give the same value.
- Exam: 11/11; H2025 E4 (nine steps), H2024 E5.

**kj5 · Agency costs of debt: risk shifting and debt overhang**
- Why the conflict exists: with risky debt, equity is a call on the firm; state-by-state
  payoffs E = max(V − F, 0).
- Risk shifting: why shareholders may prefer a riskier, even negative-NPV project; agency
  cost = first-best value − value of the chosen project; the debt level at which they are
  indifferent; creditors anticipate it and shareholders pay up front. Rejecting a zero-NPV
  hedge.
- Debt overhang: shareholders decline a positive-NPV project because part of the gain goes
  to creditors. Renegotiating the face value, with checks 3 and 4.
- Remedies: covenants, seniority, convertibles, shorter maturity.
- Agency benefits of debt (k11) in one short section: free cash flow, empire building, debt
  as commitment; how trade-off, agency and information combine into one argument.
- One two-state worked example.
- Exam: H2024 E4 (risk shifting and hedging), V2024 P1, 2017V P3, 2017H P1 and P4, 2021 P2.

**kj6 · Asymmetric information and raising capital** (full treatment: the reader chose it)
- Flag once, plainly: 8 of 11 papers historically, absent from both Kurbatov papers, still
  on the syllabus.
- **The Myers-Majluf template**, as numbered steps: α = I/(E[V | beliefs] + I + NPV) (the I
  is in the denominator, §9.4); old shareholders' payoff (1 − α)(V<sub>true</sub> + I + NPV)
  against V<sub>true</sub>; the issue decision; **check 5: are the beliefs rational?** Pooling
  versus separating, the right way round (§9.2c). One worked example.
- Financial slack removes the underinvestment, not the overvalued firm's wish to issue.
- Pecking order (internal → debt → equity) and why; the price drop at an equity
  announcement; market timing.
- Raising capital: the IPO process, underwriting spread and net proceeds, underpricing and
  what it costs the issuer, the winner's curse explanation, long-run underperformance; the
  SEO announcement effect; rights issues.
- Exam: 2016 P1, 2017V P1, 2020 P2, 2022 P2, 2023 P4.

**kj7 · Options: payoffs, parity, binomial pricing, Black-Scholes**
- Calls and puts, payoffs, moneyness, the simple bounds. **Put-call parity** (not on the
  formula sheet).
- One-period binomial: replication (Δ, B) and the risk-neutral form with ρ; why the real
  probabilities never appear. One worked example priced both ways.
- Black-Scholes: what N(d<sub>1</sub>) and N(d<sub>2</sub>) mean, the comparative statics
  (S, K, σ, T, r, dividends) in a table, implied volatility, and **the H2025 E1 question
  type** (a verbal question on volatility and a mispriced option). Take the answer from
  k23, not from memory.
- Exam: 2022 P4, H2024 E6, H2025 E1, 2023 MC9–10.

**kj8 · Debt and equity as options, and credit risk** (full treatment)
- Flag once: 8 of 11 historically (2015 P4 was 90 points), absent from both Kurbatov papers.
- Bonds: YTM, promised versus expected return, credit spread, r<sub>D</sub> = y − p·L, and
  that the wedge is expected loss, not beta (§9.4).
- Equity as a call on V with strike F; debt as risk-free debt minus a put, or V minus the
  call. Yield and spread from option values. β<sub>E</sub> = N(d<sub>1</sub>)(V/E)β<sub>U</sub>
  (memorise). Volatility helps equity and hurts debt (link to kj5).
- Credit default swaps priced off the risk-neutral default probability. Coinsurance in a
  merger, state by state, in two or three sentences.
- One two-state worked example.
- Exam: 2015 P4, 2016 P4, 2021 MC7–9, V2024 P3 and P4.

**kj9 · Real options**
- The option to wait, and why a positive NPV today can still mean wait. Its value.
- Value of perfect information = E[max(0, NPV<sub>i</sub>)] − max(0, E[NPV]).
- The exit or abandonment option (a truncated annuity replaces the perpetuity; it is worth
  something only where the tail is negative, §9.7b). The indifference point. Decision trees.
- One worked example (wait versus invest now with two states).
- Exam: fixed 20-point item since 2017; H2024 E6 and H2025 E5.

**kj10 · Mergers and acquisitions**
- Motives that create value and motives that do not. H2024 banned synergies as an answer,
  so give the others: undervaluation, agency and empire building, market power, tax,
  diversification and coinsurance, hubris, disciplinary takeovers.
- Stock-swap arithmetic: new shares, post-merger price, the target's ownership, NPV to the
  acquirer and the target and that they sum to S, the maximum exchange ratio, actual versus
  offered premium. EPS accretion is not value creation.
- Implied synergies from the announcement reaction, and **the market-implied probability
  that a deal closes** (H2025 E6, 20 points). One worked example.

**kj11 · Corporate governance**
- The manager-shareholder agency problem, and why small shareholders free-ride on
  monitoring.
- The monitors: board, blockholders, institutional investors, the market for corporate
  control, compensation, debt, auditors and analysts, regulation.
- **A repertoire of at least eight actions a blockholder can take**, one sentence each, in a
  table or list. Takeover defences and whose interest they serve, with the Norwegian ASA
  rules from forfatterspek §9.7b (jurisdiction matters).
- How a 12-point verbal answer is written: three actions × four points, sentence budgets.
- Exam: H2024 E2, H2025 E2.

### Shape of every part (kj1–kj11)

1. `<p class="lead-in">` — two or three sentences: what this is and why it is core, with the
   real exam references above. Only cite sittings listed in the course plan (§9.6).
2. Two to four `<h3>` subsections (plain titles, **no numbering**).
3. The formulas the exam needs, in `.formula` blocks, each followed at once by what it means.
4. `.callout.mech` for the mechanism behind the central result (1–2 per part).
5. **One** `.worked` example, short and complete, ending in the check the examiner makes.
   Two only where the part covers two separate exam routines.
6. `.callout.warn` with the errors that lose points (1 per part).
7. **Last: exactly one "Must know" box** with 3–5 bullets, the part in the fewest words.
   The app also collects these boxes into a ten-minute last-day sheet, so each bullet must
   stand alone:

```html
<div class="callout tip husk"><span class="h">Must know</span>
<ul><li>…</li><li>…</li><li>…</li></ul></div>
```

Figures are optional. Use at most one per part, and only where it saves words (a payoff
diagram, a decision tree). You may copy an SVG figure verbatim from the manual.

## 3. The fragment format

Write one file per part: `fag/fie402/_kjerne/kjN.js`. Nothing else in it.

```js
/* kj3 · Taxes, the interest tax shield and the trade-off */
window.EDU_DATA.kjerne.push({
  id: "kj3",
  num: 3,
  title: "Taxes, the interest tax shield and the trade-off",
  chapters: [7, 8],
  html: `
<p class="lead-in">…</p>
<h3>The tax shield</h3>
<p>…</p>
<div class="formula"><div class="eq">V<sup>L</sup> = V<sup>U</sup> + PV(TS)</div>
<div class="where">…</div></div>
…
<div class="callout tip husk"><span class="h">Must know</span><ul><li>…</li></ul></div>
`,
  checks: [
    {
      id: "kj3-s1",
      q: "…",
      options: ["…", "…", "…", "…"],
      answer: 3,
      explanation: "…",
    },
  ],
  case: {
    id: "kj3-m1",
    open: true,
    topic: "Permanent debt and the share price",
    points: 6,
    minutes: 8,
    body: `<p>…</p><p>(a) … (2 points)</p><p>(b) … (4 points)</p>`,
    solution: `<p><b>(a) …</b> …</p><p><b>(b) …</b> …</p>`,
    criteria: ["…", "…", "…"],
  },
});
```

- `html`, `body` and `solution` are template literals (backticks). Never write `${` in them.
- Allowed tags in `html`: p, h3, h4, div, span, b, i, sub, sup, ul, ol, li, table, tr, th, td,
  br, figure, figcaption, svg and its children. Allowed classes: lead-in, formula, eq, where,
  callout, mech, tip, warn, link, mistake, h, husk, worked, wh, data, n. Every callout starts
  with `<span class="h">`, every `.worked` with `<span class="wh">`.
- **Never a raw `<` or `>` in text.** Write `&lt;` and `&gt;`.
- To point into the manual for depth, write the chapter code: "k17". The app turns it into a
  link. To point to another core part, write "kj4". Use both sparingly; the part must stand
  on its own.
- Use `−` (U+2212) for minus, `×` for multiplication, decimal points, 4 decimals for rates.
- No em-dashes as sentence connectors (forfatterspek §8).

## 4. The checks

Quick understanding checks, shown right after the text. Each takes under a minute.

- **Test understanding, not recall.** Good: "If you set β<sub>D</sub> = 0 when the debt is
  risky, your value estimate is…", "Which rate discounts the tax shield when the firm keeps
  D/E constant?", "At announcement of a debt-financed buyback without taxes, the share
  price…". Bad: "Who proposed the pecking order?"
- Exactly four options, one correct. Each wrong option is a specific, common misconception
  (the ones the manual's warn and mistake boxes name), not filler.
- **The answer position is fixed in advance** (fallgruve 7c). Your positions are in your
  brief, as 0–3 (A–D). Write the correct option in that slot.
- **Length must not give the key away** (fallgruve 7y): aim for the correct option to be the
  longest in about one check in four, as chance would have it. The first FIE402 draft had it
  longest in 26 of 39; the first FIE432 draft, told to avoid that, in 0 of 38. Both are tells.
- `explanation`: two to four sentences. Say why the right answer is right **and** what the
  most tempting wrong one gets wrong. **Refer to options by their content, never by letter**
  ("the answer that uses D/V", not "option B").
- `q`, `options` and `explanation` may contain only b, i, sub, sup and br.
- ids: `kjN-s1`, `kjN-s2`, … in order.

## 5. The minicase

One short exercise in exam format after each part (not kj0). It checks that you can **do**
the routine, not only recognise it.

- 2–3 sub-questions (a), (b), (c), 4–8 points in total, 6–10 minutes (`minutes`). Points in
  parentheses after each sub-question, as on the exam.
- **New numbers.** Not a copy of the manual's worked example or of a chapter task
  (`fag/fie402/kapitteloppgaver.js`); the reader has seen those.
- Self-contained: every number it needs is in the text. It is shown alone.
- `solution`: each sub-part starts with `<p><b>(a) …</b>` (the app reveals one part at a
  time and splits on exactly that pattern). Show every step with numbers, state the method,
  name the mechanism, and end with the check where one exists. Keep it tight: a model answer,
  not a lecture.
- `criteria`: 2–4 plain-text strings (no tags; write r_E, beta_U, tau_c), each one thing the
  examiner would give points for, with the key number.
- Verbal minicase (kj11): sentence budget in the question, a model answer that obeys it.
- The question must admit only the answer you wrote (§9.7b).

## 6. Accuracy

- **Compute every number with python3 before you write it**, including the minicase and any
  number in a check. Four decimals for rates. Printed intermediates must sum to printed
  totals (§9.5).
- Re-read the manual chapters for your parts. Where the manual states a rule (which rate on
  the shield, the direction of an error, pooling versus separating), your text must say the
  same. If you believe the manual is wrong somewhere, do not silently deviate: follow it and
  report the suspected error.
- Run the validator on your files and fix every FEIL:
  `node tools/sjekk-kjerne.js fag/fie402/_kjerne/kj3.js fag/fie402/_kjerne/kj4.js`

## 7. What to report back

For each part: word count (from the validator), the minicase in one line with its answer,
**what you chose to leave out of the manual chapters and why**, and any error or ambiguity
you found in the manual. Keep the report short.
