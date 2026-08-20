# FIE402 — Authoring spec (READ FULLY BEFORE WRITING)

You are writing one or more chapters of `FIE402_Manual.html`, the single source of truth for a
learning platform. The platform parses this HTML in the browser and builds study plans, quizzes,
flashcards and search on top of it. **Markup errors silently destroy content — follow this spec
exactly.**

Write your chapter(s) to the file path you are given, as a **fragment** — one
`<section id="kN">…</section>` per chapter, nothing else. No `<html>`, `<head>`, `<body>`.
The assembler concatenates the fragments.

---

## 1. Language and audience

- **Everything in English.** The exam is written in English and must be answered in English.
- The reader is one person: a Norwegian master's student at NHH who has a bachelor in business
  administration but has **never studied corporate finance beyond the basics**. He has no
  textbook. This manual is his only source. If you don't explain it, he doesn't know it.
- Address him as **"you"**. Active voice. Direct.
- Never assume a concept has been introduced unless it was introduced in an earlier chapter
  (see docs/fie402-kursplan.md for what comes before you). If you need something from a later chapter,
  give the one-line version and add a `.callout.link` pointing forward.

## 2. Required HTML skeleton

```html
<section id="k7">
<a class="backtotop" href="#toc">↑ contents</a>
<h2 class="part">Part I — Capital structure</h2>
<h2 class="chap">7 · Corporate taxes and the interest tax shield</h2>

<p class="lead-in">One-paragraph opener. Say why this chapter matters ON THE EXAM, naming
concrete exam years or exercise types. Not "this chapter is about taxes".</p>

<h3>7.1 Section title here</h3>
<p>Body text …</p>

</section>
```

Hard rules — each one, if broken, loses content with no error message:

| Rule | Why |
|---|---|
| `<section id="kN">` — lowercase `k`, digits only, no suffix | `/^k\d+$/` filter; `<div>` is not matched |
| `<h2 class="chap">N · Title</h2>` — separator must be `·` or `.` | Anything else leaves "7 -" in the title |
| **Nothing before `<h2 class="chap">` survives** except what's stripped | Body starts after it |
| `<h3>` must be a **direct child** of `<section>`, and start with `N.M ` | Nested in a `<div>` = section vanishes |
| Sections numbered `7.1`, `7.2`, … matching the chapter number | Prefix is parsed off |
| Chapter numbers **contiguous** — no gaps | Prev/next navigation uses `num±1` |
| Never write a raw `<` or `>` inside text or formulas | DOMParser eats the rest of the document. Use `&lt;` `&gt;` |
| Never nest `<section>` | Closes the wrong level |

`<h2 class="part">`, `<a class="backtotop">` and `<hr class="sec">` are stripped by the parser
but keep the file readable standalone. Include them.

## 3. The content elements

### Formula block
```html
<div class="formula">
  <div class="eq">r<sub>E</sub> = r<sub>U</sub> + (D/E)(r<sub>U</sub> − r<sub>D</sub>)</div>
  <div class="where">MM Proposition II. Leverage raises the cost of equity linearly in D/E,
  because equity holders absorb the firm's business risk over a smaller base.</div>
</div>
```
- Multiple `<div class="eq">` allowed in one block.
- A `.formula` with **neither** `.eq` nor `.where` is discarded. Always include at least one.
- Always introduce a formula with a sentence ending in a colon, and explain it immediately after.

### The five callout types — each has one job
```html
<div class="callout mech"><span class="h">Why does leverage raise r<sub>E</sub>?</span>
Explanation of the mechanism.</div>
```
| Class | Job | Frequency |
|---|---|---|
| `mech` | **Why does this work?** The mechanism. Heading is often a question. This is the workhorse — the examiner rewards naming mechanisms | 3–5 per chapter |
| `tip` | Examiner's perspective: how this is tested, what earns points, what a full answer contains | 1–2 per chapter |
| `link` | Connection to another chapter or exam exercise | 1–2 per chapter |
| `warn` | Direct warning about a point-losing error | 1–2 per chapter |
| `mistake` | Reserved for genuinely large misconceptions. Rare | 0–1 per chapter |

Every callout needs `<span class="h">Heading</span>` as its first child.

### Worked example — the most important element in this manual
```html
<div class="worked"><span class="wh">Worked example: unlever, relever, value</span>
<p>Setup sentence with concrete numbers.</p>
<table class="data">
<tr><th>Input</th><th>Value</th></tr>
<tr><td>Equity beta of twin firm</td><td class="n">1.40</td></tr>
</table>
<p><b>Step 1 — unlever the twin.</b> β<sub>U</sub> = 0.6(1.40) + 0.4(0.20) = <b>0.920</b></p>
<p><b>Step 2 — …</b></p>
<p><b>Check:</b> the WACC method and the APV method both give 412.4. ✓</p>
</div>
```
- **At least 2 worked examples per quantitative chapter.** They are how the reader learns to
  compute, and they are what the exam actually demands.
- Number every intermediate result. Show every step. The exam gives zero points without
  shown calculations.
- End with the **consistency check** the examiner would make (WACC = APV, weighted betas = βU,
  gains to debt + equity = NPV). This is a scoring habit, teach it everywhere.

### Tables
`<table class="data">` with a `<tr><th>…</th></tr>` header row. Numeric cells get `class="n"`.

### Figures — inline SVG only
```html
<figure>
<svg viewBox="0 0 520 320" xmlns="http://www.w3.org/2000/svg"
     role="img" aria-label="Short screen-reader description"
     font-family="Georgia,serif" font-size="13">
  <line x1="60" y1="270" x2="490" y2="270" stroke="#333" stroke-width="1.4"/>
  <line x1="60" y1="270" x2="60"  y2="30"  stroke="#333" stroke-width="1.4"/>
  <text x="275" y="300" text-anchor="middle">Leverage, D/V</text>
  <text x="22" y="150" text-anchor="middle" transform="rotate(-90 22 150)">Cost of capital</text>
  <path d="M60,240 C160,205 300,150 480,70" stroke="#6b1f2a" stroke-width="2.3" fill="none"/>
  <text x="430" y="62" fill="#6b1f2a" font-weight="bold">r_E</text>
  <line x1="300" y1="270" x2="300" y2="150" stroke="#999" stroke-dasharray="4 4"/>
  <circle cx="300" cy="150" r="4" fill="#000"/>
</svg>
<figcaption>Figure 7.1 — Two to four sentences explaining what the figure shows and what the
reader should take from it.</figcaption>
</figure>
```
- Use `<figure>`, **never** `<div class="figure">` (that is a bug in the SAM3 manual).
- Palette, fixed: `#6b1f2a` primary curve, `#2f5a3f` secondary, `#1f3a5f` tertiary,
  `#b06000` annotation, `#999` guides, `#555` small text, `#333` axes.
- Dashed (`stroke-dasharray="5 4"`) = shifted or alternative curve. Label curves at their end.
- **This is a visual subject.** Draw: MM I and II, the trade-off theory, payoff diagrams,
  binomial trees, decision trees for real options, state-by-state payoff splits between debt
  and equity. Aim for **1–2 figures per chapter**, more in the options chapters.

## 4. Notation — use these exactly, every chapter

| Symbol | Meaning | Written as |
|---|---|---|
| r<sub>f</sub> | risk-free rate | `r<sub>f</sub>` |
| r<sub>E</sub>, r<sub>D</sub>, r<sub>U</sub> | cost of equity / debt / unlevered | `r<sub>E</sub>` etc. |
| r<sub>wacc</sub> | after-tax WACC unless stated | `r<sub>wacc</sub>` |
| β<sub>E</sub>, β<sub>D</sub>, β<sub>U</sub> | equity / debt / unlevered (asset) beta | `β<sub>U</sub>` |
| τ<sub>c</sub> | corporate tax rate | `τ<sub>c</sub>` |
| V<sup>L</sup>, V<sup>U</sup> | levered / unlevered firm value | `V<sup>L</sup>` |
| E, D, V | market values of equity, debt, firm (V = E + D) | plain |
| FCF<sub>t</sub> | free cash flow in period t | `FCF<sub>t</sub>` |
| PV(TS) | present value of the interest tax shield | plain |
| ρ | risk-neutral probability | `ρ` |
| Δ | replicating share position | `Δ` |
| ER | exchange ratio (M&A) | plain |
| g | growth rate | plain |

Use **`−`** (U+2212 minus) in mathematics, not a hyphen. Use `×` for multiplication.
Decimal point, not comma: `0.35`, not `0,35`. Percentages as `6%`.

Course conventions that differ between textbooks — this course uses:
- **βU weighted without taxes**: β<sub>U</sub> = [E/(E+D)]β<sub>E</sub> + [D/(E+D)]β<sub>D</sub>
  (target-leverage / rebalancing assumption). Never the (1−τ) version.
- Pre-tax WACC = r<sub>U</sub>.
- Tax shield discounted at **r<sub>U</sub>** under constant D/E, at **r<sub>D</sub>** (or r<sub>f</sub>)
  under fixed permanent debt. Say which assumption you are using, every time.

## 5. Length and shape per chapter

**Coverage comes first. There is no word limit.**

The reader has no textbook. If a chapter leaves something out, he has no way to learn
it, and the exam does not care that the chapter was tidy. So the binding constraint is
completeness against the chapter brief in `docs/fie402-kursplan.md`: every mechanism,
every formula, every question type listed there must be taught well enough to answer
an exam question on it.

Use the space the material needs. As a rough guide, most chapters land between 1 200
and 2 500 words, and the heaviest ones more, but treat that as description rather than
a target. **Never drop required content to hit a number.**

Shape per chapter: 4–6 `<h3>` sections, 3–6 formula blocks, **at least 2 worked
examples** (3 where the chapter carries a multi-step exam routine), 4–8 callouts,
1–2 figures, 1–2 tables.

Section rhythm: short setup paragraph → formula → `.callout.mech` explaining why →
worked numbers. Rarely more than two paragraphs of unbroken prose.

### What to spend words on, and what to cut

Spend them on: the numbered steps of a worked example, the consistency check that
closes it, the mechanism behind a result, and the named errors that lose points.
Those are what the exam rewards.

Cut: prose that restates a formula already shown, the exam context repeated in three
places, and mechanism boxes that have quietly become two ideas. Tighten the writing
before you cut the teaching.

## 6. Exam grounding — non-negotiable

Every chapter must connect to the real exam. The course is examined as **six exercises,
100 points, 3 hours, no multiple choice**, set by Andrey Kurbatov (autumn 2024 and 2025 papers).
A formula sheet is handed out; anything not on it must be memorised.

In each chapter include at least one `.callout.tip` that says concretely how this material has
been tested — reference real exam sittings by name (H2025 Exercise 4, V2023 Problem 2, and so on)
using the exam DNA in docs/fie402-kursplan.md. Do not invent exam references; only use what docs/fie402-kursplan.md lists.

## 7. Accuracy

Every number you write will be independently recomputed by a checking agent. Before you write a
worked example, **compute it yourself** (you have Bash — use `python3`). Round consistently to
4 decimals for rates, 1–2 decimals for money. If a check fails, fix the numbers, not the check.

## 8. What NOT to do

- Do not reproduce text from Berk & DeMarzo or any textbook. Write original explanations.
- Do not use Markdown. This is an HTML fragment.
- Do not add `<script>`, `<style>`, external images, or links to external sites.
- Do not use em-dashes as sentence connectors; prefer a comma, a colon, or a new sentence.
- Do not write "In this chapter we will…". Start with substance.

---

# 9. Lessons from the wave-1 audit — read this, it is where the real errors were

An independent checker recomputed every number in k0–k5 and k29. **All arithmetic
was correct.** Every error was a *claim about* the mathematics, or an
inconsistency between chapters written in parallel. Those are the ones to guard
against.

## 9.1 The five consistency checks are numbered, and the numbering is fixed

k0 § 0.5 defines them, and every later chapter refers to them **by number**:

1. Value by WACC = value by APV
2. [E/V]β<sub>E</sub> + [D/V]β<sub>D</sub> = β<sub>U</sub>
3. Creditors' gain + shareholders' gain = the project's NPV
4. Creditors' gain = shareholders' loss when total value is fixed
5. Are investors' beliefs rational given the action taken?

Do not invent a different list, reorder it, or substitute other checks. Other
useful identities (state-by-state D + E = V, NPV<sub>A</sub> + NPV<sub>T</sub> = S)
may be stated, but not as members of the numbered five.

## 9.2 Distinguish a real check from a trivial one

Several wave-1 checks pass by algebraic identity and can never fail — for example
"weighted betas return β<sub>U</sub>" when β<sub>E</sub> was itself produced by
relevering from that β<sub>U</sub>. **If a check cannot fail, say so.** k4 does
this well: a `.callout.mistake` shows that both standard checks still pass on a
wrong answer if you forget to reprice r<sub>D</sub> after a recapitalisation.
A check the reader believes in but that cannot catch anything is worse than none.

## 9.2b The WACC-versus-APV check is a fixed point, not two routes

The second audit found this claimed as "a real check, not an identity" in three
places. It is not. The APV route takes its debt levels D<sub>t</sub> = d·V<sup>L</sup><sub>t</sub>
from the WACC answer, and with r<sub>wacc</sub> = r<sub>U</sub> − d·r<sub>D</sub>·τ<sub>c</sub>
the sum V<sup>U</sup> + PV(TS) collapses back to V<sup>L</sup> algebraically.

It is still worth running — it catches the wrong discount rate on the shield and
plain arithmetic slips, which are the two errors that actually happen. Just
describe it honestly. Likewise "pre-tax WACC = r<sub>U</sub> ✓" is an identity
whenever r<sub>E</sub> came from MM II, and must be labelled as one.

The genuinely independent check is the one that **fails** on a wrong answer.
Chapter 18 does it right: it shows the check breaking at 726.46 against 755.00,
and states plainly where the check cannot be run at all.

## 9.2c Pooling is efficient, separating is not

Getting this backwards is a conceptual error, not a rounding one. In Myers-Majluf:

- **Separating** destroys value: the good type declines a positive-NPV project, and
  that NPV simply never happens. This is underinvestment, the same family as debt
  overhang.
- **Pooling** moves value: both types invest, nothing real is lost, and the good
  type's old shareholders transfer to the bad type's through the new investors.
  Competition forces new investors to break even *on average*, so
  q × (good type's loss) = (1 − q) × (bad type's gain). The two sides are equal in
  size only when q = 0.5.

Related: financial slack removes the *underinvestment*, but not the incentive for an
**overvalued** firm to issue. Saying "with cash, no issue would ever be attractive"
is wrong, and it contradicts the market-timing material in k13.

## 9.3 Reserved symbols

- **ρ is the risk-neutral probability, always.** For correlation write `Corr`.
- **D is the market value of debt.** For depreciation write `Dep`.
- **K is a strike price or a face value** — if you use it for both in one chapter,
  say which is which.

## 9.4 Getting these three right matters more than they look

- **β<sub>D</sub> = 0 when debt is actually risky *understates* β<sub>U</sub>**
  (you drop a positive term), and therefore understates r<sub>U</sub> and the
  WACC, and *over*values the firm. Get the direction right.
- **The wedge y − r<sub>D</sub> = p·L is expected loss.** It never enters
  β<sub>D</sub>. β<sub>D</sub> is positive because r<sub>D</sub> exceeds
  r<sub>f</sub>, that is because default risk is systematic.
- **Myers-Majluf:** α = I/(E[V | beliefs] + **I** + NPV). The denominator is the
  post-issue value and includes the cash raised. Dropping the I makes α too large.

## 9.5 Rounding

The manual preaches four-decimal discipline, so it must practise it. **The
intermediate figures you print must sum to the total you print.** If
0.0788 + 0.0113 does not equal the 0.0900 you claim, show 0.078750 + 0.011250.

## 9.6 Never invent an exam reference

Only cite sittings and exercises that docs/fie402-kursplan.md actually lists. Wave 1 produced
exactly one fabricated citation ("2017H MC6"), and it was indistinguishable from
the twenty real ones. If you want to say something is heavily examined but cannot
point to a listed instance, say it in general terms instead.

## 9.7 Claims that overreach

- Pre-tax WACC = r<sub>U</sub> is **not** pure arithmetic. It needs the tax shield
  to carry asset risk, that is rebalancing to constant D/V. It fails under fixed
  permanent debt. Say the identity holds *under this course's convention*.
- The security market line is **not** an arbitrage result. Buying one stock rather
  than the market portfolio leaves you holding idiosyncratic risk. It is an
  equilibrium argument that assumes diversified, mean-variance investors — state
  the CAPM's assumptions rather than implying they are unnecessary.

## 9.8 Length

Wave 1 landed at 1 800–2 800 words per chapter. That was briefly capped at 1 400,
then the cap was removed: **coverage of the curriculum is the binding constraint,
not length** (see section 5). A chapter that is short because it left material out
is a failed chapter. Report what you covered, not how few words it took.
