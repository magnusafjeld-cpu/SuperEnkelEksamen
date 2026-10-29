# FIE402: three mock exams in Kurbatov's format

Three full mock exams for FIE402 Corporate Finance, autumn 2026. They appear in Eksamenssett
under «Prøveeksamener» (`kind: "mock"`) and run on the same engine as the real sets
(`js/bundle-sett.js`): self-assessed open exercises with a model solution and criteria.

Andrey Kurbatov is course responsible in 2026 and wrote the two most recent exams (H2024,
H2025). The mocks must look and feel like those two papers. Older papers (2015–V2024) supply
topics and numbers, not format.

## The format (fixed for all three)

- **180 minutes, 100 points, 6 exercises, no multiple choice**, English, pen and paper,
  calculator. Fields: `"minutes": 180, "points": 100`.
- **Points per exercise, in this order:** 12 · 12 · 18 · 18 · 20 · 20.
  - Exercise 1 (12): a verbal exercise. H2024: M&A reasons (synergies banned). H2025:
    Black-Scholes intuition, no computation.
  - Exercise 2 (12): **governance, verbal**. Present in both papers.
  - Exercises 3–6: computational, each a chain of sub-questions with points per part.
- **Verbal exercises** give explicit sentence budgets as Kurbatov does («Keep explanations
  short, 1–2 sentences per reason», «4–6 sentences should typically be enough»), and say what
  is not allowed («Reasons must be other than synergies»).
- **Computational exercises:** 3–9 parts, 2–8 points each. Parts build on each other, as in
  the real papers. State precision where it matters («Use 4 decimal places»). State every
  number the student needs; nothing from memory except the course formulas.
- **Not on the formula sheet, must be memorised** (so it is fair game): V<sup>L</sup> =
  V<sup>U</sup> + PV(TS), which rate discounts the tax shield, D<sub>t</sub> = d·V<sub>t</sub>,
  put-call parity, real options logic, Myers-Majluf. The formula sheet is in
  `FIE402_Corp_course_files/Formula sheet.docx`; the manual chapter k0/k29 lists it.
- **No N(d) tables.** If Black-Scholes is computed, give N(d<sub>1</sub>) and N(d<sub>2</sub>)
  in the text, as Home Assignment 2 effectively required. Prefer intuition.

## Sources: read before writing

1. **The two Kurbatov papers and his solution keys:** `FIE402_Corp_course_files/2024.pdf`,
   `2024 - S.pdf`, `2025.pdf`, `2025 - S.pdf` (read with PyMuPDF). The keys state the
   *minimal accepted answer* and what earns full marks. Copy that tone into `criteria`.
2. **The same papers in the app:** `h2024` and `h2025` in `fag/fie402/sett.js`. These show the
   data format, the solution style and the criteria style exactly.
3. **Kurbatov's 2026 home assignments** (his current emphasis):
   `/Users/magnusfjeld/Documents/Magnus Fjeld/NHH/7. Semester/FIE402 Corporate Finance/Arbeidskrav 1/S232502_FIE402_Home_Assignment_1.pdf`
   (MM and beta; risk shifting, continuation vs liquidation; Myers-Majluf with a credible
   certificate) and `Arbeidskrav 2/FIE402_Home_Assignment_2.docx` (WACC and APV with debt
   capacity; risk-neutral option valuation and put-call parity; Black-Scholes). The PDF of HA1
   contains the student's own answers; use only the task text.
4. **The 2026 syllabus:** capital structure I–III, payout policy, security issues, valuation
   with leverage I–II, options I–III, M&A, governance (`FIE402_Corp_course_files/Syllabus2026.xlsx`).
5. **Course outline and exam DNA:** `docs/fie402-kursplan.md` (topic frequency over 11
   papers, what the examiner rewards, errors the keys call out).
6. **Style and notation:** `docs/fie402-forfatterspek.md`.
7. **The manual** `FIE402_Manual.html` (sections `<section id="kN">`, k0–k29) is the source of
   truth for formulas, conventions and mechanisms. Extract a chapter with Python if needed.
8. Older papers `FIE402_Corp_course_files/20xx.pdf` and `20xx - S.pdf` for more topics and
   typical numbers.

## What «very similar to the real exams» means here

- Same exercise types and order as H2024/H2025, same sub-question rhythm, same kind of
  numbers (round inputs, answers that need 4 decimals), same phrasing («Find …», «What is …»,
  «Briefly explain»).
- **New numbers, new firms, new twists.** Never reuse the numbers or the scenario of H2024,
  H2025 or the home assignments. A student who has done those must still have to compute.
- Every computational exercise has at least one **consistency check** the examiner expects
  (WACC value = APV value; βU = weighted βE and βD; creditors' gain + shareholders' gain =
  NPV; share price unchanged in a perfect-market recap). Put it in the solution.
- Every computational exercise ends with **one verbal sub-question** («Are shareholders better
  off? Explain briefly.»), as the real papers do.

## Data format

One JSON object per exam in `fag/fie402/_prove/<id>.json`, built by a Python script
`fag/fie402/_prove/<id>_regn.py` that computes every number and writes the JSON:

```
{ "id": "prove1", "kind": "mock", "label": "Mock exam 1",
  "minutes": 180, "points": 100,
  "format": "6 exercises · no multiple choice · calculator permitted",
  "note": "<what this mock resembles and emphasises; that it is written for the app, not an official exam>",
  "facts": ["Mock exam in Kurbatov's format (H2024, H2025): …", "…"],
  "exercises": [
    { "n": 1, "title": "…", "points": 12, "topic": "…", "chapters": [27],
      "body": "<p>full text of a verbal exercise</p>",
      "solution": "<p>model answer</p>", "criteria": ["…", "…"] },
    { "n": 3, "title": "Capital Structure", "points": 18, "topic": "MM in perfect markets, recapitalisation",
      "chapters": [4, 6], "body": "<p>common text</p>",
      "parts": [ { "label": "a", "points": 3, "body": "<p>…</p>",
                   "solution": "<p>…</p>", "criteria": ["…", "…"] }, … ] }
  ] }
```

- ids `prove1`, `prove2`, `prove3` are storage keys and never change.
- `topic` reuses the names in `h2024`/`h2025` where they fit.
- `chapters` are manual chapter numbers (0–29).
- **Solutions** in the style of `h2025`: `<p><b>Step 1. …</b> …</p>`, the answer in `<b>`, a
  numeric table where useful (`<table class="data">`, `<td class="n">`), and a `<b>Check.</b>`
  paragraph. Verbal exercises: a model answer at full-mark length plus what else would be
  accepted.
- **Criteria:** 3–7 short items per part, as in `h2025`: what earns the points, the minimal
  accepted answer, the classic error, and «Show the calculation» where relevant.
- HTML: `p`, `b`, `i`, `br`, `sub`, `sup`, `ul`/`ol`/`li`, `table class="data"`.

## Writing rules

English. **No em dash (—)**: use a colon, a full stop or «·». **No comma before «and».**
Minus sign «−». Precise and short, as an exam paper.

## Checks before delivery

1. Every number in the text, the solutions and the criteria computed in the script
   (`python3 -I`). The script also asserts the consistency checks.
2. Valid JSON, no «—», no «, and».
3. Points: exercises 12/12/18/18/20/20, parts sum to their exercise.
4. Structure check:
   ```
   node -e 'const f=require("fs");f.writeFileSync(process.argv[2],"window.EDU_DATA={};window.EDU_DATA.sets=["+f.readFileSync(process.argv[1],"utf8")+"];")' fag/fie402/_prove/<id>.json <scratch>/check-<id>.js
   node tools/sjekk-sett.js <scratch>/check-<id>.js
   ```
   No errors.

## The three exams

Across the three: MM in perfect markets in all three, WACC and APV in all three, governance in
all three, plus real options ×2, M&A ×2, risk shifting and debt overhang, Myers-Majluf, payout
policy, trade-off with taxes, binomial pricing and put-call parity, Black-Scholes intuition,
debt and equity as options.

### Mock exam 1: «like H2025»

1. **Options intuition, verbal (12).** E.g. how a put and a call react to volatility, the
   interest rate and an announced dividend; or what an investor with a different volatility
   view should do. No computation. Sentence budget. (k21, k23)
2. **Governance, verbal (12).** A specific agency problem (empire building, free cash flow or
   entrenchment): two distinct mechanisms, who performs them, how they work, one weakness each.
   (k27)
3. **MM in perfect markets, recapitalisation (18; 3/3/4/4/4).** All-equity firm with perpetual
   FCF recapitalises with debt and repurchases shares: rE, share price, debt issued and shares
   bought back, new rE and dividend per share, and a homemade-leverage comparison of payoffs
   for an investor who sells versus keeps. (k4, k6, k15)
4. **WACC and APV over two periods (18; nine parts × 2).** Debt beta from a given rD, rE,
   rU, after-tax WACC, value by WACC, debt adjustment at the end of year 1 under a constant
   D/V, unlevered value, tax shield each year and PV(TS) at rU, value by APV. WACC = APV. (k17–k19)
5. **Real options (20; e.g. 2/4/4/4/6).** A project with two states: NPV now, value of
   perfect information available now, information after one year, an abandonment or exit
   option, and a final part that changes the spread of payoffs with the same expectation.
   (k25)
6. **M&A, stock swap (20; e.g. 6/6/4/4).** Acquirer and target with synergies: exchange
   ratio given, NPV to acquirer and target (formula sheet), the maximum exchange ratio the
   acquirer can accept, what the price reaction implies, and one verbal part. (k26)

### Mock exam 2: «like H2024»

1. **M&A, verbal (12).** Reasons a deal can be positive or negative for acquirer and target,
   synergies banned, 1–2 sentences each; or takeover defences. Different angle from H2024 E1.
   (k26)
2. **Governance, verbal (12).** Executive compensation or board monitoring: two distinct
   designs, the incentive each creates, how each can backfire. (k27)
3. **MM, no taxes, risky debt, dividend recap (18; 3/3/6/3/3).** rU, debt-financed special
   dividend, share price and shareholder wealth after the transaction, new rE when debt
   becomes risky (rD > rf), repurchase instead of dividend. (k4, k6, k15)
4. **Risk shifting and debt overhang (18; e.g. 3/5/5/5).** Manager choosing between projects
   with and without debt, the debt level that makes the manager indifferent, a positive-NPV
   project shareholders reject because of debt overhang, and how renegotiation or hedging
   fixes it. Use HA1 Exercise 2 and H2024 E4 as type, new numbers. (k9, k10, k24)
5. **WACC and APV (20; 6/3/3/2/6).** rU from a comparable firm (unlever its beta), rE, WACC,
   value by WACC, value by APV with debt from the WACC method. (k4, k17, k18)
6. **Real option to wait with risk-neutral valuation (20; 3/6/8/3).** NPV now, value of
   waiting with known probabilities, risk-neutral probability from a traded security when the
   true probabilities are unknown, value of the option to wait. (k22, k25)

### Mock exam 3: «Kurbatov's 2026 emphasis» (home assignments and the syllabus)

1. **Payout policy, verbal (12).** Special dividend versus repurchase: equivalence in perfect
   markets, then what changes with personal taxes and signalling. Sentence budget. (k15, k16)
2. **Governance, verbal (12).** Shareholder activism, blockholders or takeover defences
   (e.g. a poison pill adopted without a vote): whose interest, consequences. (k27)
3. **Asymmetric information, Myers-Majluf (18; 3/3/4/4/4).** Two types of firm, a positive-NPV
   project needing equity: pooling price, which type issues, the equilibrium, the value of a
   credible certificate, and debt versus equity (pecking order). Check that beliefs are
   consistent with behaviour. HA1 Exercise 3 is the type; new numbers. (k12, k13)
4. **Capital structure with taxes and distress (18; e.g. 4/4/4/3/3).** Leveraged recap with
   permanent debt: PV(TS), share price on announcement, shares repurchased, rE after (MM II
   with taxes), and expected distress costs that make a larger recap value-destroying.
   (k7, k8)
5. **Binomial option pricing and put-call parity (20; e.g. 4/5/4/4/3).** Risk-neutral
   probability, call and put by replication or ρ, put-call parity check, an arbitrage if a
   quoted price is off, and equity as a call on firm assets (or the option-value intuition).
   HA2 Exercise 2 is the type; new numbers. (k22, k23, k24)
6. **WACC and APV for a project with debt capacity (20; e.g. 4/4/6/6).** Firm with risky debt
   (debt beta given), constant D/E, a project with uneven FCF over four years: WACC, project
   value and debt capacity each year, unlevered value, PV(TS), APV. WACC = APV. HA2 Exercise 1
   is the type; new numbers. (k17–k19)

## Review

Each exam is then solved blind by an independent reviewer from a version without solutions,
who checks every number, the consistency checks, whether each part has one defensible answer,
and whether it reads like a Kurbatov paper. Findings are fixed before the sets are merged into
`fag/fie402/sett.js`.
