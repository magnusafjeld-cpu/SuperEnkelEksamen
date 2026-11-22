/* sjanger 109 · d3-realrho · Real options priced with a traded twin (del 3 i korte stiger) */
window.EDU_DATA.sjangre.push({
  id: "d3-realrho",
  num: 109,
  seksjon: "del3",
  emne: "Realopsjoner",
  symboler: "realopsjon",
  title: "Real options priced with a traded twin",
  summary: "ρ from a traded twin, the option valued at the risk-free rate, why real probabilities fail, rate trees and the option to wait",
  chapters: [25, 22],
  exam: "H2024 E6 · V2021 P4 · lecture 11 patent",
  intro: `<p>When the exam gives you no probabilities, Kurbatov wants a light bulb: find a traded asset that moves with the same uncertainty, back ρ out of its prices and value the real option with ρ and r<sub>f</sub>. H2024 Exercise 6 did this for a ferry whose value moved with the interest rate. Spring 2021 Problem 4 did it for a patent. Five steps go from ρ to the full option to wait.</p>`,
  steps: [
    {
      id: "d3-realrho-1",
      title: "No probabilities? Find a traded twin",
      theory: `<p>If the exercise gives no usable probabilities, or the risk is a traded price or a rate, Kurbatov says it should be "like a light bulb": find a traded twin, an asset whose value moves with the same uncertainty. ρ is the probability that makes the twin earn exactly the risk-free rate over the year. Grow today's price by (1 + r<sub>f</sub>) before you compare it with the two values at t = 1. A real probability in the text plays no role in ρ.</p>
<div class="formula"><div class="eq">ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>)</div>
<div class="where">S<sub>0</sub> is the twin's price today, S<sub>u</sub> and S<sub>d</sub> its values at t = 1 including any payment made then. r<sub>f</sub> is the one-year risk-free rate. Check that 0 &lt; ρ &lt; 1.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>ρ is not a forecast. The twin's price already holds the market's beliefs and its risk premium; ρ is the weight that turns that price into a fair bet at r<sub>f</sub>. When the twin earns a risk premium, ρ sits below the real probability of the up state.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A traded certificate costs 100 today and is worth 125 or 85 in a year. r<sub>f</sub> = 4%. ρ = (1.04 × 100 − 85)/(125 − 85) = 19/40 = 0.4750. Check: (0.475 × 125 + 0.525 × 85)/1.04 = 104/1.04 = 100 ✓</p></div>`,
      q: `<p>Aluminium trades at 2 450 USD per tonne today. In one year it will be 3 000 or 2 000. Aluminium costs nothing to store and pays nothing. The one-year risk-free rate is 5%. Analysts put the probability of 3 000 at 0.6. What is the risk-neutral probability ρ of the up state?</p>`,
      options: ["0.6000", "0.4500", "0.4275", "0.5725"],
      answer: 3,
      solution: `<p>(1 + r<sub>f</sub>)S<sub>0</sub> = 1.05 × 2 450 = 2 572.50.</p><p>ρ = (2 572.50 − 2 000)/(3 000 − 2 000) = 572.50/1 000 = <b>0.5725</b>. The analysts' 0.6 plays no role.</p>`,
      check: `<p>Reprice aluminium: (0.5725 × 3 000 + 0.4275 × 2 000)/1.05 = (1 717.50 + 855.00)/1.05 = 2 572.50/1.05 = 2 450 ✓ That only confirms the arithmetic, since ρ is built to make it hold. The sense check: under the analysts' 0.6, aluminium is expected to earn 2 600/2 450 − 1 = 6.12%, above the 5% risk-free rate, so ρ must sit below 0.6. It does ✓</p>`,
      traps: [
        "Used the analysts' real probability. ρ comes from prices, not from forecasts.",
        "Forgot to grow today's price by (1 + r<sub>f</sub>): (2 450 − 2 000)/1 000 = 0.4500.",
        "Gave 1 − ρ, the risk-neutral probability of the down state: 1 − 0.5725 = 0.4275.",
        null,
      ],
    },
    {
      id: "d3-realrho-2",
      title: "Value the real option with ρ and the risk-free rate",
      theory: `<p>Once you have ρ, every payoff that depends only on the same state is priced with the same weights. Find the option's payoff in each state at t = 1, with max(·, 0) because you are never forced to invest. Weight with ρ and discount at r<sub>f</sub>. Never mix: ρ goes with r<sub>f</sub>, a real probability goes with a risk-adjusted rate.</p>
<div class="formula"><div class="eq">C<sub>u</sub> = max(V<sub>u</sub> − I, 0) &nbsp;&nbsp; C<sub>d</sub> = max(V<sub>d</sub> − I, 0)</div>
<div class="eq">C<sub>0</sub> = [ρC<sub>u</sub> + (1 − ρ)C<sub>d</sub>]/(1 + r<sub>f</sub>)</div>
<div class="where">V<sub>u</sub> and V<sub>d</sub> are what the project is worth at t = 1 in each state, I the investment paid at t = 1. Kurbatov's H2024 key writes the same thing as ρ times the up-state NPV seen from today.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The right to invest later is a call on the project. Its payoff can be copied with the twin and the risk-free bond, so it must cost what the copy costs. That is why real probabilities and risk preferences drop out.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>The certificate from the last example gives ρ = 0.4750 at r<sub>f</sub> = 4%. A project worth 60 or 30 at t = 1 costs 45 then. C<sub>u</sub> = 15, C<sub>d</sub> = 0. C<sub>0</sub> = 0.475 × 15/1.04 = 6.85.</p></div>`,
      q: `<p>Aluminium trades at 2 450 USD per tonne and will be 3 000 or 2 000 in one year; it pays nothing. The one-year risk-free rate is 5% and analysts put the probability of 3 000 at 0.6. A firm holds the right to build a recycling plant at t = 1 for 150 (USD million). The plant's value at t = 1 moves with aluminium: 260 if aluminium is 3 000 and 60 if it is 2 000. What is the right worth today?</p>`,
      options: ["59.98", "62.86", "23.33", "44.79"],
      answer: 0,
      solution: `<p>ρ = (1.05 × 2 450 − 2 000)/(3 000 − 2 000) = 0.5725.</p><p>Payoffs at t = 1: C<sub>u</sub> = max(260 − 150, 0) = 110. C<sub>d</sub> = max(60 − 150, 0) = 0: the firm does not build.</p><p>C<sub>0</sub> = (0.5725 × 110 + 0.4275 × 0)/1.05 = 62.975/1.05 = <b>59.98</b>.</p>`,
      check: `<p>Replicate the payoff with aluminium and the bond. Δ = (110 − 0)/(3 000 − 2 000) = 0.11 million tonnes, B = (0 − 2 000 × 0.11)/1.05 = −209.52. Cost: 2 450 × 0.11 − 209.52 = 269.50 − 209.52 = 59.98 ✓ The two routes are the same equation, so this catches arithmetic slips only.</p>`,
      traps: [
        null,
        "Used the analysts' 0.6 with the risk-free rate: 0.6 × 110/1.05 = 62.86. A real probability needs a risk-adjusted rate.",
        "Kept the negative payoff in the down state, as if the firm had to build: (0.5725 × 110 − 0.4275 × 90)/1.05 = 23.33.",
        "Put 1 − ρ on the up state: 0.4275 × 110/1.05 = 44.79.",
      ],
    },
    {
      id: "d3-realrho-3",
      title: "Why the real-probability answer differs",
      theory: `<p>You can value the right with real probabilities, but then you must discount at the right's own cost of capital. That is neither the project's rate nor the twin's. A call is a levered position in the twin: long Δ units, financed partly by borrowing. So its required return is higher than the twin's. You only know it once you know the price. Risk-neutral valuation avoids the circle: ρ moves the risk premium into the weights, so r<sub>f</sub> is the right rate.</p>
<div class="formula"><div class="eq">C<sub>0</sub> = E<sub>p</sub>[C<sub>1</sub>]/(1 + r<sub>C</sub>) = E<sub>ρ</sub>[C<sub>1</sub>]/(1 + r<sub>f</sub>)</div>
<div class="where">E<sub>p</sub> uses the real probability, E<sub>ρ</sub> the risk-neutral one. r<sub>C</sub> is the option's expected return, which you can back out only after pricing the option with ρ.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Real probabilities are not wrong; they are incomplete without a discount rate that nobody hands you. The twin's price already contains both the beliefs and the premium, so it does the work in one step.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>The certificate (100 today, 125 or 85 in a year, r<sub>f</sub> = 4%) has a real probability of 0.6 for the up state. A call paying 15 or 0 costs 6.8510. Its expected return under 0.6 is 0.6 × 15/6.8510 − 1 = 31.37%, against the certificate's (0.6 × 125 + 0.4 × 85)/100 − 1 = 9%. The call needs the far higher rate.</p></div>`,
      q: `<p>Aluminium trades at 2 450 USD per tonne and will be 3 000 or 2 000 in a year; r<sub>f</sub> = 5%. A firm's right to build a recycling plant at t = 1 for 150 pays 110 if aluminium is 3 000 and 0 if it is 2 000. Priced with ρ = 0.5725 the right is worth 59.98. An analyst instead weights the payoffs with her real probability of 0.6 and discounts at r<sub>f</sub>. She gets 62.86. Which statement is right?</p>`,
      options: [
        "Hers is better: 0.6 is a forecast of the up state, while ρ is not.",
        "Hers is too high: under 0.6 the payoff must be discounted at the right's own rate, which is above aluminium's 6.12%.",
        "Both are right; they differ only because ρ was rounded to four decimals.",
        "Hers is too low: ρ already contains a risk premium, so her answer should be grossed up.",
      ],
      answer: 1,
      solution: `<p>Under 0.6, aluminium is expected to earn (0.6 × 3 000 + 0.4 × 2 000)/2 450 − 1 = 6.12%, above r<sub>f</sub>: its risk is priced, so 0.6 cannot be discounted at 5%.</p><p>The right is riskier still. Its expected return under 0.6 is 0.6 × 110/59.98 − 1 = 10.04%. Even aluminium's 6.12% gives 66/1.0612 = 62.19, still too high. Only 10.04% returns 59.98. That rate comes out of the risk-neutral price. So the analyst's 62.86 is <b>too high</b>; ρ with r<sub>f</sub> gives the price directly.</p>`,
      check: `<p>Discount her expected payoff at 10.04%: 66/1.1004 = 59.98 ✓ The leverage gives the same rate: the right holds 0.11 million tonnes worth 269.50 against a loan of 209.52, so it carries 269.50/59.98 = 4.4934 times aluminium's exposure. r<sub>C</sub> = 5% + 4.4934 × (6.1224% − 5%) = 10.04% ✓</p>`,
      traps: [
        "ρ is a pricing weight, not a forecast. Her 0.6 is fine as a forecast. The problem is the rate she discounts it at.",
        null,
        "The gap is 2.88, far more than rounding. The two methods agree only if her expected payoff is discounted at the right's own 10.04%.",
        "The premium makes ρ lower than 0.6 and her answer higher, not lower. A real probability discounted at r<sub>f</sub> overstates a call whose risk is priced.",
      ],
    },
    {
      id: "d3-realrho-4",
      title: "When the rate is the risk: the up state is the low rate",
      theory: `<p>In a rate tree the uncertain thing is the discount rate. The up state is the low rate, because a lower rate makes the same cash flows worth more. In Kurbatov's patent example "the upper case is the 5%", the lower of the two rates. The twin is a traded risk-free annuity. Three rules. First, S<sub>u</sub> and S<sub>d</sub> include the payment made at t = 1, as a share's value includes a dividend just paid. Second, grow S<sub>0</sub> at the one-year risk-free rate, which the exam states separately from today's long yield. Third, read the timing: if the right expires on a fixed date, waiting costs you a payment.</p>
<div class="formula"><div class="eq">S<sub>0</sub> = A(T, y) &nbsp;&nbsp; S<sub>u</sub> = 1 + A(T − 1, r<sub>low</sub>) &nbsp;&nbsp; S<sub>d</sub> = 1 + A(T − 1, r<sub>high</sub>)</div>
<div class="eq">ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>)</div>
<div class="where">The twin pays 1 a year for T years from year 1 and yields y today. r<sub>f</sub> is the one-year rate, not y.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Bond prices and rates move in opposite directions, so the state that is good for the project is the one where rates fall. The one-year rate is what a risk-free investor earns while the tree resolves, so that is the return ρ must give the twin.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A 5-year annuity of 1 yields 5%: S<sub>0</sub> = A(5, 5%) = 4.329477. The one-year rate is 3%. Next year rates become 4% or 7%: S<sub>u</sub> = 1 + A(4, 4%) = 4.629895, S<sub>d</sub> = 1 + A(4, 7%) = 4.387211.</p><p>ρ = (1.03 × 4.329477 − 4.387211)/(4.629895 − 4.387211) = 0.072150/0.242684 = 0.2973.</p></div>`,
      q: `<p>A patent gives the right to produce a drug that pays a risk-free 2 (NOK million) a year until the patent expires in year 15. Production costs 20, paid when you start. The first payment comes one year later; if you wait a year, you collect only the payments in years 2 to 15. A traded risk-free annuity paying 1 a year in years 1 to 15 yields 6% today. The one-year risk-free rate is 4%. In one year the yield will be 3.5% or 9% for good. Nobody knows the real probabilities. What is the risk-neutral probability of the up state?</p>`,
      options: ["0.4814", "0.7385", "0.4194", "0.5806"],
      answer: 2,
      solution: `<p>The up state is the low rate, 3.5%, since it makes the payments worth more.</p><p>Twin today: S<sub>0</sub> = A(15, 6%) = 9.712249. At t = 1 the holder gets the year-1 payment plus 14 more: S<sub>u</sub> = 1 + A(14, 3.5%) = 11.920520 and S<sub>d</sub> = 1 + A(14, 9%) = 8.786150.</p><p>ρ = (1.04 × 9.712249 − 8.786150)/(11.920520 − 8.786150) = (10.100739 − 8.786150)/3.134370 = 1.314589/3.134370 = <b>0.4194</b>.</p>`,
      check: `<p>Reprice the annuity: (0.4194 × 11.920520 + 0.5806 × 8.786150)/1.04 = 9.7122 ✓ This confirms the arithmetic only. The order test can fail: S<sub>d</sub> = 8.786150 &lt; 1.04 × S<sub>0</sub> = 10.100739 &lt; S<sub>u</sub> = 11.920520, so 0 &lt; ρ &lt; 1 ✓ Where it leads: producing today gives 2 × A(15, 6%) − 20 = −0.5755. Waiting, you produce only at 3.5%, where 2 × A(14, 3.5%) − 20 = 1.841041 at t = 1, worth 0.419411 × 1.841041/1.04 = 0.7425 today.</p>`,
      traps: [
        "Grew S<sub>0</sub> at today's 6% long yield instead of the 4% one-year rate: (1.06 × 9.712249 − 8.786150)/3.134370 = 0.4814.",
        "Left the year-1 payment out of S<sub>u</sub> and S<sub>d</sub>, though S<sub>0</sub> includes it: (10.100739 − 7.786150)/(10.920520 − 7.786150) = 0.7385.",
        null,
        "Gave the risk-neutral probability of the high rate: 1 − 0.4194 = 0.5806. The up state is the low rate.",
      ],
    },
    {
      id: "d3-realrho-5",
      title: "Exam level: the option to wait, valued risk-neutrally",
      theory: `<p>This is H2024 Exercise 6 with new numbers. Waiting gives a call on the project started at t = 1, struck at the investment cost. All three twin prices must price one stream: the cash flows the option delivers, years 2 to T + 1. When every maturity is discounted at r<sub>0</sub> today, that stream is worth the value of investing now discounted one more year. Find ρ, value the call at r<sub>f</sub>, then subtract what investing today is worth, never a negative number.</p>
<div class="formula"><div class="eq">S<sub>u</sub> = C × A(T, r<sub>low</sub>) &nbsp;&nbsp; S<sub>d</sub> = C × A(T, r<sub>high</sub>) &nbsp;&nbsp; S<sub>0</sub> = C × A(T, r<sub>0</sub>)/(1 + r<sub>0</sub>)</div>
<div class="eq">C<sub>0</sub> = [ρ·max(S<sub>u</sub> − I, 0) + (1 − ρ)·max(S<sub>d</sub> − I, 0)]/(1 + r<sub>f</sub>)</div>
<div class="eq">option to wait = C<sub>0</sub> − max(0, NPV<sub>now</sub>)</div>
<div class="where">NPV<sub>now</sub> = C × A(T, r<sub>0</sub>) − I. The H2024 key's twin, an annuity of 1 for T + 1 years from year 1, gives the same ρ: a sure payment at t = 1 adds the same amount to (1 + r<sub>f</sub>)S<sub>0</sub>, S<sub>u</sub> and S<sub>d</sub>.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>A project with a negative NPV today can still be worth something as a right: you keep the state where rates fall and walk away from the other. When investing today does not pay, the alternative to waiting is doing nothing, worth 0.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>The project started at t = 1 has S<sub>0</sub> = 50, S<sub>u</sub> = 60 and S<sub>d</sub> = 45, r<sub>f</sub> = 5%, cost I = 54. Investing now gives cash flows worth 1.05 × 50 = 52.50, so NPV<sub>now</sub> = −1.50.</p><p>ρ = (52.50 − 45)/15 = 0.5000. C<sub>0</sub> = 0.5 × 6/1.05 = 2.8571. Option to wait = 2.8571 − max(0, −1.50) = 2.8571: wait.</p></div>`,
      q: `<p>A licence lets you build a feed barge for 40 (NOK million), paid when you build. It pays 6 a year for 8 years, starting one year after you build. Today every maturity is discounted at 5%. The risk-free rate from year 0 to year 1 is 5%. If you wait a year, the rate becomes 3% or 6.5% for good; the cost is still 40 and the barge still pays for 8 years after you build. An analyst puts the real probability of 3% at 0.5. What is the value today of the option to wait, measured against the best you can do today (build now or do nothing)?</p>`,
      options: ["0.8114", "1.5117", "1.0086", "2.0322"],
      answer: 0,
      solution: `<p><b>Building today.</b> 6 × A(8, 5%) = 6 × 6.463213 = 38.7793, so NPV<sub>now</sub> = −1.2207. Do not build today.</p><p><b>Underlying: the barge built at t = 1</b>, payments in years 2 to 9. S<sub>u</sub> = 6 × A(8, 3%) = 6 × 7.019692 = 42.1182. S<sub>d</sub> = 6 × A(8, 6.5%) = 6 × 6.088751 = 36.5325. Today: S<sub>0</sub> = 38.7793/1.05 = 36.9326.</p><p><b>ρ.</b> (1.05 × 36.9326 − 36.5325)/(42.1182 − 36.5325) = (38.7793 − 36.5325)/5.5856 = 2.2468/5.5856 = 0.4022.</p><p><b>Payoffs.</b> C<sub>u</sub> = 42.1182 − 40 = 2.1182. C<sub>d</sub> = max(36.5325 − 40, 0) = 0.</p><p><b>Value.</b> C<sub>0</sub> = 0.4022 × 2.1182/1.05 = 0.8114. Option to wait = 0.8114 − max(0, −1.2207) = <b>0.8114</b>. Wait.</p>`,
      check: `<p>A second twin for the same stream must give the same ρ. The H2024 key's version is an annuity of 1 a year for 9 years from year 1: S<sub>0</sub> = A(9, 5%) = 7.107822, S<sub>u</sub> = 1 + A(8, 3%) = 8.019692, S<sub>d</sub> = 1 + A(8, 6.5%) = 7.088751, so ρ = (1.05 × 7.107822 − 7.088751)/(8.019692 − 7.088751) = 0.374462/0.930941 = 0.4022 ✓ Pairing today's 38.7793 with S<sub>u</sub> and S<sub>d</sub> gives 0.7494 and fails this test. The analyst's 0.5 sits above ρ, as it should when rate risk is priced.</p>`,
      traps: [
        null,
        "S<sub>0</sub> priced a different stream: 38.7793 is the barge built today (years 1 to 8), while S<sub>u</sub> and S<sub>d</sub> value the barge built at t = 1 (years 2 to 9). That gives ρ = 0.7494 and 0.7494 × 2.1182/1.05 = 1.5117.",
        "Used the analyst's real 0.5 with the risk-free rate: 0.5 × 2.1182/1.05 = 1.0086. Rate risk is priced, so 0.5 needs a risk-adjusted rate.",
        "Compared with the negative NPV of building today: 0.8114 − (−1.2207) = 2.0322. Building today does not pay, so the alternative is 0.",
      ],
    },
  ],
});
