/* sjanger 6 · agent · Risk shifting and debt overhang */
window.EDU_DATA.sjangre.push({
  id: "agent",
  num: 6,
  title: "Risk shifting and debt overhang",
  summary: "From the state-by-state split of cash flow to risk shifting, hedging, debt overhang and renegotiation",
  chapters: [9, 10],
  exam: "Risk shifting 5 of 11 papers, debt overhang 5 of 11 · H2024 E4, V2024 P1, 2021 P2",
  intro: `<p>Risky debt gives shareholders two bad incentives. Each has appeared on 5 of 11 papers. In <b>risk shifting</b> they choose a riskier project with a lower value because the creditors bear its downside: H2024 Exercise 4 (18 points) and V2024 Problem 1 (52 points). In <b>debt overhang</b> they refuse a good project because the creditors collect part of its value: 2017V Problem 3, 2017H Problems 1 and 4 plus 2021 Problem 2, which put both problems in one firm and ended with a renegotiation of the face value. The ladder starts with who gets paid in each state. At the top you can find the project management picks, the agency cost, the indifference face value, the fate of a hedge or a debt buyback and the write-down that leaves both sides better off.</p>`,
  steps: [
    {
      id: "agent-1",
      title: "Who gets paid: debt and equity state by state",
      theory: `<p>A firm with debt has two claims on the same cash flow. At maturity the creditors are paid first, up to the face value K of the debt. The shareholders get what is left, but never less than zero: limited liability lets them walk away from a firm that owes more than it has. Work state by state. In every state the two payoffs add up to the firm's cash flow.</p>
<div class="formula"><div class="eq">D<sub>1</sub> = min(CF, K) &nbsp;&nbsp; E<sub>1</sub> = max(CF − K, 0)</div>
<div class="where">CF is the firm's cash flow in one state at maturity and K the face value, the amount promised to the creditors. In a state where CF &lt; K the firm defaults: the creditors take all of CF and the shareholders get nothing. D<sub>1</sub> + E<sub>1</sub> = CF in every state.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Face value K = 100. Cash flow is 140 in a good state and 70 in a bad state.</p><p>Good state: D<sub>1</sub> = min(140, 100) = 100 and E<sub>1</sub> = max(140 − 100, 0) = 40. Bad state: D<sub>1</sub> = min(70, 100) = 70 and E<sub>1</sub> = max(70 − 100, 0) = 0. The 30 shortfall in the bad state is the creditors' loss, not the shareholders'.</p></div>`,
      q: `<p>Lysefjord AS has zero-coupon debt with face value 120, due in one year. In one year its cash flow will be 200 in a boom and 90 in a bust. What do the creditors and the shareholders receive in the bust?</p>`,
      options: ["Debt 90, equity 0", "Debt 120, equity −30", "Debt 90, equity −30", "Debt 0, equity 90"],
      answer: 0,
      solution: `<p>In the bust the cash flow of 90 is below the face value of 120, so the firm defaults.</p><p>Creditors: min(90, 120) = <b>90</b>. Shareholders: max(90 − 120, 0) = <b>0</b>.</p><p>For comparison, in the boom the creditors get min(200, 120) = 120 and the shareholders max(200 − 120, 0) = 80.</p>`,
      check: `<p>The claims add up to the cash flow in each state: 90 + 0 = 90 in the bust and 120 + 80 = 200 in the boom ✓. The sum alone cannot rule out debt 120 with equity −30, which also adds to 90. Limited liability does: equity is never negative.</p>`,
      traps: [
        null,
        "Assumed the creditors are always paid in full and let the shareholders absorb the shortfall: 90 − 120 = −30. Limited liability floors equity at zero.",
        "Dropped the floor on equity, 90 − 120 = −30, while paying the creditors 90. The two claims then add to 60, not the 90 the firm has.",
        "Reversed the priority and paid the shareholders first. Creditors rank ahead of equity.",
      ],
    },
    {
      id: "agent-2",
      title: "Valuing debt and equity today",
      theory: `<p>Today each claim is worth its expected payoff discounted at the risk-free rate. That works because the course gives you risk-neutral probabilities or risk-neutral investors, so no risk premium is needed. The order matters: apply min and max in each state first, then take the expectation. Subtracting K from the expected cash flow skips the floor and gets equity wrong whenever some state defaults.</p>
<div class="formula"><div class="eq">E = E[max(CF − K, 0)]/(1 + r<sub>f</sub>) &nbsp;&nbsp; D = E[min(CF, K)]/(1 + r<sub>f</sub>)</div>
<div class="where">E[·] is the probability-weighted average over the states. V = E + D = E[CF]/(1 + r<sub>f</sub>). Not on the formula sheet. When the exam sets the discount rate to zero, every value is simply an expected payoff.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>K = 100. Cash flow 140 or 70 with probability 0.5 each, investors risk neutral, r<sub>f</sub> = 5%.</p><p>Equity: 0.5 × 40 + 0.5 × 0 = 20, so E = 20/1.05 = 19.05. Debt: 0.5 × 100 + 0.5 × 70 = 85, so D = 85/1.05 = 80.95. Firm: 105/1.05 = 100.00 = 19.05 + 80.95.</p></div>`,
      q: `<p>Brekke AS has zero-coupon debt with face value 120, due in one year. Its cash flow in one year will be 240 with probability 0.4 and 100 with probability 0.6. Investors are risk neutral and r<sub>f</sub> = 4%. What is the equity worth today?</p>`,
      options: ["34.62", "30.00", "48.00", "46.15"],
      answer: 3,
      solution: `<p>State by state: equity gets max(240 − 120, 0) = 120 in the good state and max(100 − 120, 0) = 0 in the bad state.</p><p>Expected payoff: 0.4 × 120 + 0.6 × 0 = 48.</p><p>E = 48/1.04 = <b>46.15</b>.</p>`,
      check: `<p>Value the debt on its own: 0.4 × 120 + 0.6 × 100 = 108, so D = 108/1.04 = 103.85. The firm: 0.4 × 240 + 0.6 × 100 = 156, so V = 156/1.04 = 150.00. Then 46.15 + 103.85 = 150.00 ✓. This check fails on the no-floor answer: 34.62 + 103.85 = 138.47, not 150.</p>`,
      traps: [
        "Took the expectation first and subtracted K afterwards: (156 − 120)/1.04 = 34.62. That lets the bad state's −20 drag equity down.",
        "Subtracted the face value from today's firm value, 150 − 120 = 30.00, as if the debt were risk-free and due today.",
        "Forgot to discount: the expected payoff 0.4 × 120 = 48.00 arrives in one year.",
        null,
      ],
    },
    {
      id: "agent-3",
      title: "Which project? Firm value without debt, equity value with debt",
      theory: `<p>Management acts for the shareholders, so it picks the project that maximises the value of equity. With no debt, equity is the whole firm and management picks the highest expected value: the <b>first best</b>. With risky debt, equity is worth E[max(CF − K, 0)] and the two rankings can differ. Equity keeps all the upside above K but loses nothing below it, so a riskier project can be worth more to the shareholders even with a lower expected value. This is <b>risk shifting</b>, also called asset substitution.</p>
<div class="formula"><div class="eq">no debt: maximise V = E[CF] &nbsp;&nbsp; with debt: maximise E = E[max(CF − K, 0)]</div>
<div class="where">The discount rate is zero here, so values are expected payoffs. Equity's payoff is a call option on the firm's cash flow with strike K: flat below K, one for one above it.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Project S pays 100 for sure. Project R pays 160 or 20 with probability 0.5 each.</p><p>No debt: V<sub>S</sub> = 100 and V<sub>R</sub> = 0.5 × 160 + 0.5 × 20 = 90, so management picks S. With face value K = 80: E<sub>S</sub> = 100 − 80 = 20 and E<sub>R</sub> = 0.5 × 80 + 0.5 × 0 = 40, so management picks R, although R is worth 10 less.</p></div>`,
      q: `<p>Hovland AS can run exactly one of three projects. A pays 75 for sure. B pays 125 or 20 with probability 0.5 each. C pays 185 with probability 0.25 and 0 otherwise. The firm has debt with face value 50, due when the project pays off. Investors are risk neutral, the discount rate is zero and management acts for the shareholders. Which project does management choose and what is the equity worth?</p>`,
      options: ["Project B, equity 37.50", "Project A, equity 25.00", "Project C, equity 33.75", "Project B, equity 72.50"],
      answer: 0,
      solution: `<p>Equity state by state with K = 50:</p><p>A: max(75 − 50, 0) = 25.00. B: 0.5 × max(125 − 50, 0) + 0.5 × max(20 − 50, 0) = 0.5 × 75 + 0 = 37.50. C: 0.25 × max(185 − 50, 0) + 0.75 × 0 = 0.25 × 135 = 33.75.</p><p>Management chooses <b>project B, equity 37.50</b>. Firm values are 75, 72.50 and 46.25, so without debt A would be chosen: B is risk shifting and destroys 2.50.</p>`,
      check: `<p>Value the debt and add: A 50 + 25 = 75, B 0.5 × 50 + 0.5 × 20 = 35 and 35 + 37.50 = 72.50, C 0.25 × 50 = 12.50 and 12.50 + 33.75 = 46.25, the three firm values ✓. Moving from A to B, the creditors lose 50 − 35 = 15 and the shareholders gain 37.50 − 25 = 12.50: −15 + 12.50 = −2.50, the value B destroys.</p>`,
      traps: [
        null,
        "Maximised firm value, the all-equity rule: A has the highest expected value, 75, but with debt it gives equity only 75 − 50 = 25.00.",
        "Assumed shareholders always want the riskiest project. C has the largest upside, but with a 25% chance it gives only 0.25 × 135 = 33.75.",
        "Picked B but reported its firm value, 0.5 × 125 + 0.5 × 20 = 72.50, not its equity value.",
      ],
    },
    {
      id: "agent-4",
      title: "The agency cost: value destroyed, not value transferred",
      theory: `<p>Risk shifting moves value between the claims and destroys some along the way. Keep three numbers apart: the creditors' loss, the shareholders' gain and the agency cost. The <b>agency cost of debt</b> is the deadweight loss, the value that disappears because the decision maximises equity instead of the firm. The creditors' loss is larger: it pays for the shareholders' gain and for the value destroyed. Consistency check 3 ties the three together.</p>
<div class="formula"><div class="eq">agency cost = V(first best) − V(chosen)</div><div class="eq">ΔD + ΔE = V(chosen) − V(first best)</div>
<div class="where">ΔD and ΔE are the changes in the values of debt and equity when the firm moves from the first-best project to the one actually chosen. ΔD is negative. Compute both firm values first, then split each into D and E.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S pays 100 for sure, R pays 160 or 20 with probability 0.5 each, K = 80 and the discount rate is zero. Management picks R.</p><p>Agency cost = V<sub>S</sub> − V<sub>R</sub> = 100 − 90 = 10. Debt falls from 80 to 0.5 × 80 + 0.5 × 20 = 50, a loss of 30. Equity rises from 20 to 40, a gain of 20. Check 3: −30 + 20 = −10 ✓.</p></div>`,
      q: `<p>Skjold AS can run its assets as project S or project R. A boom has probability 0.6 and a bust 0.4. S pays 125 in the boom and 75 in the bust. R pays 160 in the boom and 0 in the bust. The firm has debt with face value 90. Investors are risk neutral, the discount rate is zero and management acts for the shareholders. What is the agency cost of debt?</p>`,
      options: ["30.00", "9.00", "21.00", "0.00"],
      answer: 1,
      solution: `<p>First best: V<sub>S</sub> = 0.6 × 125 + 0.4 × 75 = 75 + 30 = 105 and V<sub>R</sub> = 0.6 × 160 + 0.4 × 0 = 96. An all-equity firm picks S.</p><p>With the debt: E<sub>S</sub> = 0.6 × (125 − 90) = 21 and E<sub>R</sub> = 0.6 × (160 − 90) = 42, so management picks R.</p><p>Agency cost = 105 − 96 = <b>9.00</b>.</p>`,
      check: `<p>Debt: D<sub>S</sub> = 0.6 × 90 + 0.4 × 75 = 84 and D<sub>R</sub> = 0.6 × 90 + 0.4 × 0 = 54. Creditors' gain 54 − 84 = −30, shareholders' gain 42 − 21 = +21. Check 3: −30 + 21 = −9 = 96 − 105 ✓.</p>`,
      traps: [
        "Reported the creditors' loss, 84 − 54 = 30.00. That is the transfer to the shareholders plus the value destroyed.",
        null,
        "Reported the shareholders' gain, 42 − 21 = 21.00. That is why R is chosen, not what it costs.",
        "Treated risk shifting as a pure transfer between the claims. The creditors lose 30 but the shareholders gain only 21, so 9 disappears.",
      ],
    },
    {
      id: "agent-5",
      title: "The face value at which management is indifferent",
      theory: `<p>Risk shifting needs enough debt. While no state defaults, equity is V − K under every project and the shareholders rank projects as the firm does. As K rises, the risky project's bad state defaults first. From some face value K* on, the equity values cross. Write each project's equity as a function of K on an interval where the same states default, set the two equal and check that the solution lies inside that interval. Because of max(·, 0) the functions are piecewise linear, so an equation solved on the wrong piece gives a number that is not an answer.</p>
<div class="formula"><div class="eq">E<sub>1</sub>(K) = E<sub>2</sub>(K) on an interval where the same states default ⟹ K*</div>
<div class="where">Each project's equity falls by the probability of its solvent states for every extra krone of K. The project with the higher probability of default loses equity more slowly, so it wins above K*. State the interval and verify both equity values at K*.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S pays 100 for sure. R pays 160 or 20 with probability 0.5 each. The discount rate is zero.</p><p>For 20 &lt; K ≤ 100, R defaults in its bad state and S never does: E<sub>S</sub> = 100 − K and E<sub>R</sub> = 0.5(160 − K) = 80 − 0.5K. Setting them equal: 100 − K = 80 − 0.5K, so K* = 40. That lies inside (20, 100] and both equal 60 ✓. Below 40 management picks S, above it R.</p></div>`,
      q: `<p>Hovland AS can run exactly one of three projects. A pays 75 for sure. B pays 125 or 20 with probability 0.5 each. C pays 185 with probability 0.25 and 0 otherwise. Investors are risk neutral, the discount rate is zero and management acts for the shareholders. At which face value of debt K is management indifferent between B and C?</p>`,
      options: ["K = 35.00", "K = 20.00", "K = 65.00", "No such K exists"],
      answer: 2,
      solution: `<p>For 20 &lt; K ≤ 125, B's bad state defaults and C's bad state pays nothing anyway:</p><p>E<sub>B</sub> = 0.5(125 − K) = 62.5 − 0.5K and E<sub>C</sub> = 0.25(185 − K) = 46.25 − 0.25K.</p><p>62.5 − 0.5K = 46.25 − 0.25K ⟹ 16.25 = 0.25K ⟹ <b>K = 65.00</b>, inside (20, 125] ✓.</p><p>There E<sub>B</sub> = E<sub>C</sub> = 30.00, while E<sub>A</sub> = 75 − 65 = 10, so B and C really are the contenders. Above 65 management switches to C and the agency cost jumps from 75 − 72.50 = 2.50 to 75 − 46.25 = 28.75.</p>`,
      check: `<p>Evaluate on both sides. At K = 50: E<sub>B</sub> = 0.5 × 75 = 37.50 &gt; E<sub>C</sub> = 0.25 × 135 = 33.75, so B. At K = 80: E<sub>B</sub> = 0.5 × 45 = 22.50 &lt; E<sub>C</sub> = 0.25 × 105 = 26.25, so C ✓. The ranking flips between 50 and 80, consistent with 65.</p>`,
      traps: [
        "Solved on the wrong interval: treating B's debt as safe gives 72.5 − K = 46.25 − 0.25K and K = 35.00. That formula holds only for K ≤ 20, so 35 is not a solution.",
        "Gave the face value at which B's debt turns risky, 20.00. Above it B gains from risk shifting, but B still beats C until 65.",
        null,
        "Forgot the floor: with E = V − K for both projects the gap 72.50 − 46.25 = 26.25 never closes. Equity is max(CF − K, 0) state by state.",
      ],
    },
    {
      id: "agent-6",
      title: "Will shareholders accept a zero-NPV hedge?",
      theory: `<p>A hedge moves cash flow from the good state to the bad state. A fair hedge has zero NPV: what the firm pays in the good state equals, in expectation, what it receives in the bad state. Firm value is unchanged, but the split between the claims is not. If the bad state defaults, the cash received there goes to the creditors first, while the shareholders give up cash in the good state. With risky debt the shareholders therefore lose and refuse a hedge that costs the firm nothing.</p>
<div class="formula"><div class="eq">zero NPV: p<sub>good</sub> × paid = p<sub>bad</sub> × received</div><div class="eq">V unchanged ⟹ ΔE = −ΔD</div>
<div class="where">Value both claims with and without the hedge, state by state. Total value is fixed, so consistency check 4 applies: the creditors' gain equals the shareholders' loss. With risk-free debt the hedge is neutral for equity.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Cash flow 120 or 20 with probability 0.5 each, K = 50, discount rate zero. Without a hedge: E = 0.5 × 70 = 35 and D = 0.5 × 50 + 0.5 × 20 = 35.</p><p>A hedge pays 50 in the good state and receives 50 in the bad, so the firm has 70 for sure. Then E = 20 and D = 50. The shareholders lose 15, the creditors gain 15 and V = 70 both ways. They refuse.</p></div>`,
      q: `<p>Grønli AS has debt with face value 70, due in one year. Its cash flow will be 160 with probability 0.4 and 50 with probability 0.6. A bank offers a contract at no cost: the firm pays 36 in the good state and receives 24 in the bad state. Investors are risk neutral, the discount rate is zero and management acts for the shareholders. Will management accept the contract and what happens to the equity value?</p>`,
      options: ["Indifferent: equity stays at 36.00", "Accept: equity rises by 2.40", "Reject: equity falls by 14.40", "Reject: equity falls by 12.00"],
      answer: 3,
      solution: `<p>Zero NPV: 0.4 × (−36) + 0.6 × 24 = −14.40 + 14.40 = 0.</p><p>Without the contract: E = 0.4 × (160 − 70) + 0.6 × 0 = 36.</p><p>With it the cash flows are 124 and 74, both above 70: E = 0.4 × 54 + 0.6 × 4 = 21.60 + 2.40 = 24.</p><p>Equity falls by 36 − 24 = 12, so management <b>rejects: equity falls by 12.00</b>.</p>`,
      check: `<p>Debt: 0.4 × 70 + 0.6 × 50 = 58 without the contract and 70 with it, since 74 now covers the face value. Creditors +12 = shareholders' loss of 12 (consistency check 4) ✓. Firm value: 0.4 × 160 + 0.6 × 50 = 94 and 0.4 × 124 + 0.6 × 74 = 49.60 + 44.40 = 94 ✓.</p>`,
      traps: [
        "Treated a zero-NPV hedge as neutral for every claim. It is neutral for the firm, not for equity once the debt is risky.",
        "Looked only at the bad state, where equity now gets 74 − 70 = 4: 0.6 × 4 = 2.40. The 36 paid in the good state costs equity 0.4 × 36 = 14.40.",
        "Kept equity at zero in the hedged bad state out of habit: 0.4 × 54 = 21.60, a fall of 14.40. The hedged bad state pays 74 − 70 = 4 to equity.",
        null,
      ],
    },
    {
      id: "agent-7",
      title: "Debt overhang: the creditors' windfall",
      theory: `<p>Now the firm can take a new project with positive NPV that the shareholders must pay for themselves. When the debt is risky, part of the project's cash flow lands in default states, where every extra krone goes to the creditors. The market value of the existing debt rises although the creditors put up nothing. That windfall ΔD is the root of <b>debt overhang</b>. With risk-free debt ΔD = 0, nothing leaks and overhang cannot arise.</p>
<div class="formula"><div class="eq">ΔD = E[min(CF + X, K) − min(CF, K)]/(1 + r<sub>f</sub>)</div>
<div class="where">X is the project's cash flow in each state and the face value K is unchanged. In a state that stays in default, all of X goes to the creditors. In a state already solvent, none of it does.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Cash flow 60 or 180 with probability 0.5 each, K = 120, investors risk neutral, r<sub>f</sub> = 5%. A project costs 15 and adds 20 in both states.</p><p>D<sub>0</sub> = (0.5 × 60 + 0.5 × 120)/1.05 = 90/1.05 = 85.7143. With the project the bad state pays 80, still below 120: D<sub>1</sub> = (0.5 × 80 + 0.5 × 120)/1.05 = 100/1.05 = 95.2381. ΔD = 10/1.05 = 9.5238, while the NPV is 20/1.05 − 15 = 4.0476.</p></div>`,
      q: `<p>Vatne AS has debt with face value 120, due in one year. Its cash flow will be 40 with probability 0.4 and 180 with probability 0.6. A project costs 25 today, is paid for by the shareholders and adds 30 to the cash flow in both states. The face value is not changed. Investors are risk neutral and r<sub>f</sub> = 4%. By how much does the market value of the existing debt rise if the project is taken?</p>`,
      options: ["11.54", "0.00", "28.85", "12.00"],
      answer: 0,
      solution: `<p>Without the project: D<sub>0</sub> = (0.4 × 40 + 0.6 × 120)/1.04 = 88/1.04 = 84.6154.</p><p>With it the bad state pays 70, still below 120, while the good state still pays 120: D<sub>1</sub> = (0.4 × 70 + 0.6 × 120)/1.04 = 100/1.04 = 96.1538.</p><p>ΔD = (100 − 88)/1.04 = 12/1.04 = <b>11.54</b>.</p>`,
      check: `<p>Shortcut: only the bad state's extra 30 reaches the creditors, 0.4 × 30/1.04 = 11.54 ✓. The project's NPV is 30/1.04 − 25 = 28.85 − 25 = 3.85. The shareholders' equity rises by 0.6 × 30/1.04 = 17.31, so they gain 17.31 − 25 = −7.69. Check 3: 11.54 + (−7.69) = 3.85 ✓. They refuse a project that creates value: debt overhang.</p>`,
      traps: [
        null,
        "Thought the debt is unaffected because its face value is unchanged. Its market value rises because the bad state now pays 70 instead of 40.",
        "Gave the creditors the whole present value of the project's cash flow, 30/1.04 = 28.85. In the good state they are already paid in full, so that 30 goes to the shareholders.",
        "Forgot to discount: 0.4 × 30 = 12.00 arrives in one year.",
      ],
    },
    {
      id: "agent-8",
      title: "The shareholders' gain is the NPV minus the windfall",
      theory: `<p>The shareholders pay the whole outlay I but receive only the part of the project's value that does not leak to the creditors. Their gain is the rise in equity value minus I, which equals the project's NPV minus ΔD. Debt overhang is the case ΔD &gt; NPV &gt; 0: the project creates value, but the owners who fund it lose. The solution keys single out one error: using the stand-alone NPV as the change in equity value. The two differ by exactly the transfer to the creditors.</p>
<div class="formula"><div class="eq">ΔE − I = NPV − ΔD &nbsp;&nbsp; invest only if NPV &gt; ΔD</div>
<div class="where">NPV = PV(X) − I is the project's stand-alone NPV. ΔE is the rise in the market value of equity before the outlay is paid. ΔD is the creditors' windfall from the previous step.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Cash flow 60 or 180 with probability 0.5 each, K = 120, r<sub>f</sub> = 5%. The project costs 15 and adds 20 in both states, so NPV = 4.0476 and ΔD = 9.5238.</p><p>Equity rises from 0.5 × 60/1.05 to 0.5 × 80/1.05, so ΔE = 0.5 × 20/1.05 = 9.5238 and ΔE − I = 9.5238 − 15 = −5.4762. Same number the short way: 4.0476 − 9.5238 = −5.4762. The shareholders refuse.</p></div>`,
      q: `<p>Tjelta AS has debt with face value 110, due in one year. Its cash flow will be 70 or 170 with probability 0.5 each. A project costs 30 today, is paid for by the shareholders and adds 20 to the cash flow in the bad state and 50 in the good state. The face value is not changed. Investors are risk neutral and r<sub>f</sub> = 5%. What is the change in the shareholders' wealth if they take the project?</p>`,
      options: ["+3.33", "−6.19", "+23.81", "−5.00"],
      answer: 1,
      solution: `<p>NPV = (0.5 × 20 + 0.5 × 50)/1.05 − 30 = 35/1.05 − 30 = 33.33 − 30 = 3.33.</p><p>Bad state: 70 rises to 90, still below 110, so all 20 goes to the creditors. Good state: 170 rises to 220, already above 110, so all 50 goes to the shareholders.</p><p>ΔE = 0.5 × 50/1.05 = 23.81. The shareholders' change is 23.81 − 30 = <b>−6.19</b>.</p>`,
      check: `<p>The creditors' windfall is ΔD = 0.5 × 20/1.05 = 9.52. Check 3: 9.52 + (−6.19) = 3.33 = NPV ✓. Equivalently NPV − ΔD = 3.33 − 9.52 = −6.19. A positive-NPV project is refused: debt overhang.</p>`,
      traps: [
        "Used the stand-alone NPV as the change in equity value: 35/1.05 − 30 = +3.33. It ignores the 9.52 that leaks to the creditors.",
        null,
        "Forgot to subtract the outlay: equity rises by 0.5 × 50/1.05 = 23.81, but the shareholders paid 30 for it.",
        "Forgot to discount: 0.5 × 50 − 30 = −5.00.",
      ],
    },
    {
      id: "agent-9",
      title: "Renegotiation: how far must the face value fall?",
      theory: `<p>The creditors want the project, since it lifts their claim for free, but the shareholders decide. Cutting the face value from K to K′ hands value back to equity, but only in the states where the debt is paid in full: in a default state the creditors take the whole cash flow whatever K′ is. So each krone of write-down is worth only the probability of the solvent states to the shareholders, discounted. The smallest write-down leaves them exactly as well off as without the project.</p>
<div class="formula"><div class="eq">E(K′) − I ≥ E<sub>0</sub> ⟹ K′ ≤ K′<sub>max</sub> &nbsp;&nbsp; write-down = K − K′<sub>max</sub></div>
<div class="where">E<sub>0</sub> is the equity value with the old face value and no project: the shareholders' fallback, not zero. E(K′) is the equity value with the project and face value K′. Solve on the interval where the same states default and check it.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Cash flow 60 or 180 with probability 0.5 each, K = 120, r<sub>f</sub> = 5%. The project costs 15 and adds 20 in both states, so the cash flows become 80 and 200. E<sub>0</sub> = 0.5 × 60/1.05 = 28.57.</p><p>For K′ ≥ 80 the bad state still defaults, so E(K′) = 0.5(200 − K′)/1.05. The condition 0.5(200 − K′)/1.05 ≥ 15 + 30/1.05 gives 0.5(200 − K′) ≥ 15.75 + 30 = 45.75, so K′ ≤ 108.50, inside the interval. The face value must fall by 120 − 108.50 = 11.50.</p></div>`,
      q: `<p>Rørslett AS has debt with face value 110, due in one year. Its cash flow will be 50 with probability 0.4 and 170 with probability 0.6. A project costs 21 today, is paid for by the shareholders and adds 30 to the cash flow in both states. Investors are risk neutral and the discount rate is zero. At the face value of 110 the shareholders refuse the project. They fund it if that leaves them no worse off. What is the smallest cut in the face value that makes them fund the project?</p>`,
      options: ["3.00", "5.00", "12.00", "15.00"],
      answer: 1,
      solution: `<p>Fallback: E<sub>0</sub> = 0.6 × (170 − 110) = 36.</p><p>At K = 110 with the project: E = 0.6 × (200 − 110) = 54. Net of the outlay that is 54 − 21 = 33, short of 36 by 3, so they refuse.</p><p>For 80 ≤ K′ ≤ 110 the bad state (80) still defaults, so E(K′) = 0.6(200 − K′) = 120 − 0.6K′. Then 120 − 0.6K′ − 21 ≥ 36 gives 0.6K′ ≤ 63 and K′ ≤ 105, inside the interval.</p><p>The face value must fall by 110 − 105 = <b>5.00</b>.</p>`,
      check: `<p>Shortfall route: 3 is missing and each krone of write-down is worth 0.6 to the shareholders, so 3/0.6 = 5 ✓. At K′ = 105: E = 0.6 × 95 = 57 and 57 − 21 = 36 = E<sub>0</sub> ✓. The creditors still gain: 0.4 × 80 + 0.6 × 105 = 95 against 0.4 × 50 + 0.6 × 110 = 86 before, so they keep the whole NPV of 30 − 21 = 9.</p>`,
      traps: [
        "Cut the face value by the shareholders' shortfall of 3 krone for krone. A cut is worth only 0.6 per krone to them, because in the bad state the creditors take everything anyway.",
        null,
        "Cut the face value by the creditors' windfall, 98 − 86 = 12. That hands the shareholders 0.6 × 12 − 3 = 4.20 more than they need, so it is not the smallest cut.",
        "Assumed the debt becomes safe after the cut, so E = 152 − K′ and K′ ≤ 95. At 95 the bad state's 80 still defaults, so that formula does not apply.",
      ],
    },
    {
      id: "agent-10",
      title: "Both sides gain and the gains sum to the NPV",
      theory: `<p>A renegotiated face value is a deal both sides sign when two conditions hold. The creditors' claim must be worth at least what it was without the project. The shareholders' equity net of I must be at least their fallback. Where the deal lands between those bounds is bargaining power. Wherever it lands, consistency check 3 must hold. Renegotiation only divides the payoff and the project decides how much there is to divide, so the two gains sum to the NPV at every K′.</p>
<div class="formula"><div class="eq">[D(K′) − D<sub>0</sub>] + [E(K′) − I − E<sub>0</sub>] = NPV</div>
<div class="where">D<sub>0</sub> and E<sub>0</sub>: the values with the old face value and no project. D(K′) and E(K′): the values with the project and the new face value. The check catches a forgotten I and a creditor paid K′ in a state where the firm has less.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Cash flow 60 or 180 with probability 0.5 each, K = 120, r<sub>f</sub> = 5%. The project costs 15 and adds 20 in both states, so the cash flows become 80 and 200. D<sub>0</sub> = 90/1.05 and E<sub>0</sub> = 30/1.05. The face value is cut to K′ = 102.</p><p>Debt now pays 80 or 102, expected 91: creditors gain (91 − 90)/1.05 = 0.95. Equity pays 0 or 98, expected 49: shareholders gain (49 − 30)/1.05 − 15 = 18.10 − 15 = 3.10. Sum: 0.95 + 3.10 = 4.05 = 20/1.05 − 15 ✓.</p></div>`,
      q: `<p>Haugland AS has debt with face value 100, due in one year. Its cash flow will be 40 or 140 with probability 0.5 each. A project costs 25 today, is paid for by the shareholders and adds 35 to the cash flow in both states. Investors are risk neutral and r<sub>f</sub> = 5%. At the face value of 100 the shareholders refuse the project. The creditors offer to cut the face value to 80 if the shareholders fund it. What does each side gain from the deal?</p>`,
      options: ["Creditors +7.14, shareholders +26.19", "Creditors +9.52, shareholders +1.19", "Creditors +7.14, shareholders +1.19", "Creditors +9.52, shareholders +26.19"],
      answer: 2,
      solution: `<p>Before: D<sub>0</sub> = (0.5 × 40 + 0.5 × 100)/1.05 = 70/1.05 = 66.67 and E<sub>0</sub> = 0.5 × 40/1.05 = 19.05.</p><p>With the project the cash flows are 75 and 175. At K′ = 80 the bad state still defaults: the creditors get 75 and 80, the shareholders 0 and 95.</p><p>D = (0.5 × 75 + 0.5 × 80)/1.05 = 77.5/1.05 = 73.81, so the creditors gain 73.81 − 66.67 = <b>+7.14</b>.</p><p>E = 0.5 × 95/1.05 = 45.24, so the shareholders gain 45.24 − 19.05 − 25 = <b>+1.19</b>.</p>`,
      check: `<p>NPV = 35/1.05 − 25 = 33.33 − 25 = 8.33. Check 3: 7.14 + 1.19 = 8.33 ✓. Second route: without the cut the creditors would gain 16.6667 and the shareholders lose 8.3333. Cutting the face value by 20 in the good state moves 0.5 × 20/1.05 = 9.5238 between them: 16.6667 − 9.5238 = 7.1429 and −8.3333 + 9.5238 = 1.1905 ✓.</p>`,
      traps: [
        "Forgot to subtract the outlay of 25: 45.24 − 19.05 = 26.19. The gains then sum to 33.33, not the NPV of 8.33.",
        "Paid the creditors the new face value of 80 in the bad state, where the firm has only 75: 80/1.05 − 66.67 = 9.52. The gains then sum to 10.71, not 8.33.",
        null,
        "Made both slips: forgot the outlay of 25 and paid the creditors 80 in the bad state, where the firm has only 75. The gains then sum to 35.71, not 8.33.",
      ],
    },
    {
      id: "agent-11",
      title: "Covenants, seniority and who pays ex ante",
      theory: `<p>Creditors who can foresee risk shifting or overhang price it into the bond when they lend: they pay less for the same promise. The owners then raise less today, so they bear the agency cost themselves, ex ante, which is why they accept contracts that tie their own hands. <b>Covenants</b> restrict the actions that create the cost: caps on dividends and new debt, limits on asset sales, required hedging. <b>Seniority</b> attacks overhang: if a new project can be funded with debt that ranks ahead of the old claim or is secured on the new asset, the new lender takes the bad-state cash first and the old creditors get no windfall. <b>Convertible debt</b> gives the creditors a share of the upside, which takes the gain out of gambling.</p>
<div class="formula"><div class="eq">bond proceeds today = D(project the creditors expect) ⟹ owners' wealth = V(project chosen)</div>
<div class="where">The owners collect the bond proceeds plus their equity, so they end up with the firm's value under the project that will actually be chosen. A credible covenant raises that value by the agency cost it removes. Its cost is lost flexibility where the forbidden action would have been efficient.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S pays 100 for sure, R pays 160 or 20 with probability 0.5 each and the bond has face value 80. Creditors who expect R pay 0.5 × 80 + 0.5 × 20 = 50 for it. The owners end up with 50 + 40 = 90.</p><p>With a covenant that forbids R, the creditors pay 80 and the owners end up with 80 + 20 = 100. The covenant is worth 10 to the owners: exactly the agency cost.</p></div>`,
      q: `<p>Ulvik AS is about to issue debt. Once the debt is in place, its owners could switch the assets into a riskier strategy with a lower expected value. The prospective creditors know it. Which statement is correct?</p>`,
      options: [
        "Creditors who foresee the switch pay less for the bond, so the owners bear the agency cost when the debt is issued. A covenant that rules out the switch raises the owners' wealth.",
        "The creditors bear the agency cost, since their claim is the one that loses value when the firm switches after the debt is issued. The owners keep what they gain from the switch.",
        "A covenant that rules out the switch only moves value from the owners to the creditors. It can raise the price the bond fetches, but never the owners' wealth.",
        "If overhang arises later, fund the new project with debt junior to the existing bond. The old creditors then keep their priority and collect no windfall from the project.",
      ],
      answer: 0,
      solution: `<p>Rational creditors price the switch they expect, so the bond fetches only what it will be worth under the riskier strategy. The owners collect proceeds plus equity, which is the firm's value under the strategy actually chosen: they bear the whole deadweight loss <b>ex ante</b>. A covenant that credibly rules out the switch raises the bond's price by more than the owners give up in equity. The difference is the agency cost removed.</p>`,
      check: `<p>Put numbers on it with the example: the covenant lifts the bond from 50 to 80 (+30) and lowers the owners' equity from 40 to 20 (−20). Net for the owners: −20 + 30 = +10 = 100 − 90, the agency cost ✓. The creditors pay a fair price either way and gain nothing, so the whole change in firm value lands on the owners.</p>`,
      traps: [
        null,
        "Ignores pricing at issue: creditors who foresee the switch pay less for the bond, so the loss comes back to the owners.",
        "A covenant is priced: it lifts the bond's price by more than the equity the owners give up, because it removes a deadweight loss. The owners gain.",
        "Junior new debt does not help: the old creditors still take the bad-state cash first, so their windfall remains. The new debt must rank ahead of the old claim or be secured on the new asset.",
      ],
    },
    {
      id: "agent-12",
      title: "Exam level: a zero-NPV hedge when the project can change",
      theory: `<p>H2024 Exercise 4 ended with a hedge offered to a firm that already runs a risky project because of its debt. The trap is to test the hedge only on the project currently chosen. With the hedge in place the manager re-optimises: compute equity for every project with the hedge, take the best and compare it with the best equity without the hedge. Then close with check 3 on the change of regime: creditors' gain + shareholders' gain = change in firm value.</p>
<div class="formula"><div class="eq">accept ⟺ max<sub>j</sub> E(project j + hedge) ≥ max<sub>j</sub> E(project j)</div>
<div class="where">Both sides are evaluated at the same face value K. The hedge has zero NPV for each project, so firm value changes only through the project choice.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>S pays 75 for sure, R pays 120 or 20 with probability 0.5 each, K = 50 and the discount rate is zero. Without a hedge: E<sub>S</sub> = 25 and E<sub>R</sub> = 0.5 × 70 = 35, so R. A zero-NPV hedge for R pays 30 in the good state and receives 30 in the bad, giving 90 or 50: E = 0.5 × 40 + 0.5 × 0 = 20.</p><p>The best with the hedge is S with 25, against 35 without, so the hedge is rejected. Creditors would go from 0.5 × 50 + 0.5 × 20 = 35 to 50 (+15), the firm from 70 to 75 (+5): −10 + 15 = 5 ✓.</p></div>`,
      q: `<p>Sletta ASA can run exactly one of three projects. A pays 60 for sure. B pays 110 or 8 with probability 0.5 each. C pays 160 with probability 0.25 and 0 otherwise. The firm has debt with face value 30. Investors are risk neutral, the discount rate is zero and the manager acts for the shareholders. A counterparty offers a contract at no cost. Under B the firm pays 24 in B's good state and receives 24 in its bad state. Under C it pays 18 in C's good state and receives 6 in its bad state. Under A nothing changes hands. Will management accept the contract and what happens to the equity value?</p>`,
      options: ["Reject: equity would fall from 40.00 to 29.00", "Reject: equity would fall from 40.00 to 30.00", "Accept: equity would rise from 40.00 to 41.00", "Indifferent: equity stays at 40.00"],
      answer: 1,
      solution: `<p><b>Without the contract.</b> E<sub>A</sub> = 60 − 30 = 30, E<sub>B</sub> = 0.5 × (110 − 30) + 0.5 × 0 = 40, E<sub>C</sub> = 0.25 × (160 − 30) = 32.50. The manager runs B, equity 40.</p><p><b>Zero NPV.</b> Under B: 0.5 × (−24) + 0.5 × 24 = 0. Under C: 0.25 × (−18) + 0.75 × 6 = −4.50 + 4.50 = 0.</p><p><b>With the contract.</b> B pays 86 or 32: E = 0.5 × 56 + 0.5 × 2 = 29. C pays 142 or 6: E = 0.25 × 112 = 28. A still gives 30. The best is A with 30.</p><p>30 &lt; 40, so management <b>rejects: equity would fall from 40.00 to 30.00</b>.</p>`,
      check: `<p>Compare the two regimes. Without the contract (B): equity 40, debt 0.5 × 30 + 0.5 × 8 = 19, firm 59. With it (A): equity 30, debt 30, firm 60. Shareholders −10, creditors +11, firm +1: −10 + 11 = +1 ✓ (check 3). The creditors take more than the whole efficiency gain, so the shareholders refuse a contract that makes the firm better off.</p>`,
      traps: [
        "Tested the contract only on B, the project already chosen: 40 to 29. With the contract in place the manager switches to A, which gives 30.",
        null,
        "Gave the shareholders the efficiency gain: the contract moves the firm from B, worth 59, to A, worth 60. But the creditors gain 11, so equity falls by 10.",
        "Treated a zero-NPV contract as neutral for equity. It is zero NPV for the firm, but it makes the debt safer and moves value to the creditors.",
      ],
    },
    {
      id: "agent-13",
      title: "Exam level: buying back debt and who captures the gain",
      theory: `<p>V2024 Problem 1 (52 points) ended with a firm whose debt makes it run a value-destroying strategy. It can raise equity and buy back debt until the remaining debt is safe and the first-best strategy returns. The efficiency gain is real, but it does not go to the shareholders. Every bondholder knows the bonds left behind will be paid in full, so none sells below face value: the hold-out problem. The shareholders pay full face value for debt worth far less today. The creditors capture more than the whole gain. The solution keys call out the belief that shareholders gain from cutting inefficient debt.</p>
<div class="formula"><div class="eq">shareholders' change = E<sub>new</sub>(K<sub>low</sub>) − cash injected − E<sub>old</sub>(K<sub>high</sub>)</div><div class="eq">creditors' change = cash received + D<sub>new</sub>(K<sub>low</sub>) − D<sub>old</sub>(K<sub>high</sub>)</div>
<div class="where">With bonds bought at par, the cash injected is the face value retired, K<sub>high</sub> − K<sub>low</sub>. Re-run the strategy choice at K<sub>low</sub> first. The two changes sum to the change in firm value (check 3).</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Strategy A pays 60 for sure, strategy R pays 100 with probability 0.5 and 0 otherwise, K = 50, discount rate zero. E<sub>A</sub> = 10 and E<sub>R</sub> = 0.5 × 50 = 25, so R runs and the firm is worth 50.</p><p>Buy back 40 of face at par, so K = 10: E<sub>A</sub> = 50 and E<sub>R</sub> = 0.5 × 90 = 45, so A runs. Shareholders: 50 − 40 = 10 against 25, a change of −15. Creditors: 40 cash + 10 safe = 50 against 0.5 × 50 = 25, a change of +25. Firm: 50 to 60. Check 3: −15 + 25 = 10 ✓.</p></div>`,
      q: `<p>Strand ASA must pick one of four strategies. If a strategy fails, the firm is worth nothing.</p><table class="data"><tr><th>Strategy</th><th>Probability of success</th><th>Firm value if successful</th></tr><tr><td>A</td><td class="n">100%</td><td class="n">70</td></tr><tr><td>B</td><td class="n">75%</td><td class="n">85</td></tr><tr><td>C</td><td class="n">50%</td><td class="n">100</td></tr><tr><td>D</td><td class="n">25%</td><td class="n">115</td></tr></table><p>Strand has debt with face value 60, maturing when the strategy pays off. Management maximises the value of equity. Investors are risk neutral and the discount rate is zero. Strand considers raising cash from its existing shareholders and buying back debt until the face value is 20. The bonds are held by many small investors. The firm must pay whatever price makes them willing to sell. By how much does the existing shareholders' wealth change if the buyback goes ahead?</p>`,
      options: ["+30.00", "+10.00", "−20.00", "−10.00"],
      answer: 3,
      solution: `<p><b>Before.</b> At K = 60: E<sub>A</sub> = 10, E<sub>B</sub> = 0.75 × 25 = 18.75, E<sub>C</sub> = 0.5 × 40 = 20, E<sub>D</sub> = 0.25 × 55 = 13.75. Management runs C. Debt is worth 0.5 × 60 = 30 and the firm 0.5 × 100 = 50.</p><p><b>After.</b> At K = 20: E<sub>A</sub> = 50, E<sub>B</sub> = 0.75 × 65 = 48.75, E<sub>C</sub> = 0.5 × 80 = 40, E<sub>D</sub> = 0.25 × 95 = 23.75. Management runs A, which pays 70 for sure, so the remaining debt is risk-free.</p><p><b>The price.</b> A bond kept is worth its full face value after the deal, so no holder sells for less. Retiring 60 − 20 = 40 of face costs 40.</p><p><b>Shareholders.</b> 50 − 40 = 10 against 20 without the buyback: a change of <b>−10.00</b>.</p>`,
      check: `<p>Creditors: 40 in cash plus 20 of safe debt = 60, against 30 before, a gain of 30. Firm value rises from 50 to 70. Check 3: −10 + 30 = +20 ✓, which is also the agency cost 70 − 50 that the buyback removes. The creditors capture 30, more than the whole gain of 20, so the shareholders will not deleverage although the leverage is inefficient.</p>`,
      traps: [
        "Forgot the 40 the shareholders inject: 50 − 20 = +30.00. That is the equity value after the deal, not the wealth net of the cash put in.",
        "Bought the bonds at today's market value, 0.5 × 40 = 20, so 50 − 20 − 20 = +10.00. No holder sells at 50% when the bonds left behind become safe.",
        "Skipped re-running the strategy choice and kept C at K = 20: 0.5 × 80 − 40 = 0 against 20, a change of −20.00. At K = 20 management switches to A, worth 50 to the shareholders.",
        null,
      ],
    },
    {
      id: "agent-14",
      title: "Exam level: overhang, risk shifting and the renegotiation range",
      theory: `<p>2021 Problem 2 (48 points) put both agency costs in one firm: risky debt, a good project A and a gamble B, each with the same cost and funded by the shareholders because a covenant bans new debt. At the old face value the manager prefers the gamble but funds neither. A new face value K′ must meet three conditions at once. The creditors are no worse off than with no project. The shareholders' equity net of I is at least their fallback. The manager prefers A to B at K′. Without the third, the creditors write down their claim and then find themselves funding a gamble.</p>
<div class="formula"><div class="eq">D<sub>A</sub>(K′) ≥ D<sub>0</sub> &nbsp;&nbsp; E<sub>A</sub>(K′) − I ≥ E<sub>0</sub> &nbsp;&nbsp; E<sub>A</sub>(K′) ≥ E<sub>B</sub>(K′)</div>
<div class="where">D<sub>0</sub> and E<sub>0</sub>: the values at the old face value with no project, the fallback if talks fail. Each condition is piecewise linear in K′, so say which states default under A and under B.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Cash flow 160 or 60, equally likely, K = 120, discount rate zero: E<sub>0</sub> = 20 and D<sub>0</sub> = 90. Each project costs 30. A adds 45 in both states (160 + 45 = 205 or 60 + 45 = 105). B adds 50 or subtracts 50 (210 or 10). At K = 120: E<sub>A</sub> = 42.5 and E<sub>B</sub> = 45, so the shareholders' gains are 42.5 − 30 − 20 = −7.5 and 45 − 30 − 20 = −5. The manager prefers B and funds neither.</p><p>For K′ ≤ 105, A's debt is safe. Creditors: K′ ≥ 90. Shareholders: E<sub>A</sub> = 155 − K′, so 155 − K′ − 30 ≥ 20 gives K′ ≤ 105. Choice: 155 − K′ ≥ 0.5(210 − K′) gives K′ ≤ 100. The range is 90 ≤ K′ ≤ 100.</p></div>`,
      q: `<p>Tveit AS will have a cash flow at t = 2 of 280 or 120 with equal probability. It has debt with face value 190, due at t = 2. At t = 1 it can take one of two mutually exclusive projects, each costing 35 and funded by the current shareholders, since covenants prohibit new debt. Project A adds 55 to the cash flow in both states. Project B adds 60 in the high state and subtracts 60 in the low state. Investors are risk neutral, the discount rate is zero and the manager acts for the current shareholders.</p><p>The manager offers to replace the face value of 190 by K′; if the creditors refuse, the old contract stays. A party that is exactly as well off accepts. A manager indifferent between A and B picks A. For which K′ do the shareholders fund 35, the manager choose A and the creditors accept?</p>`,
      options: ["155.00 ≤ K′ ≤ 175.00", "No K′ satisfies both sides", "155.00 ≤ K′ ≤ 162.50", "155.00 ≤ K′ ≤ 170.00"],
      answer: 3,
      solution: `<p><b>Fallback.</b> E<sub>0</sub> = 0.5 × (280 − 190) = 45 and D<sub>0</sub> = 0.5 × 190 + 0.5 × 120 = 155.</p><p><b>At 190.</b> A gives 335 or 175: E<sub>A</sub> = 0.5 × 145 = 72.5, net 72.5 − 35 = 37.5. B gives 340 or 60: E<sub>B</sub> = 0.5 × 150 = 75, net 40. Both are below 45, so nothing is funded. Given the choice, the manager would rather gamble. The creditors would take 0.5 × 190 + 0.5 × 175 − 155 = 27.5 of A's NPV of 55 − 35 = 20: debt overhang.</p><p><b>The three conditions</b>, for K′ ≤ 175 (A's low state covers the debt) and K′ &gt; 60 (B's low state defaults): D<sub>A</sub> = K′, E<sub>A</sub> = 0.5(335 − K′) + 0.5(175 − K′) = 255 − K′, E<sub>B</sub> = 0.5(340 − K′) = 170 − 0.5K′.</p><p>Creditors: K′ ≥ 155. Shareholders: 255 − K′ − 35 ≥ 45, so K′ ≤ 175. Choice: 255 − K′ ≥ 170 − 0.5K′, so K′ ≤ 170. All inside the assumed interval.</p><p>The renegotiation works for <b>155.00 ≤ K′ ≤ 170.00</b>.</p>`,
      check: `<p>At K′ = 160: creditors 160 − 155 = +5, shareholders 255 − 160 − 35 − 45 = +15: 5 + 15 = 20 = NPV of A ✓ (check 3). The choice condition is the one that binds. At K′ = 172, E<sub>A</sub> = 83 but E<sub>B</sub> = 84, so the manager funds B (84 − 35 = 49 &gt; 45) and the debt is worth 0.5 × 172 + 0.5 × 60 = 116, far below the creditors' 155.</p>`,
      traps: [
        "Dropped the manager's choice between A and B. Above 170 the manager prefers B. With B the debt is worth only 0.5K′ + 30, at most 117.50 and far below the creditors' 155.",
        "Used the creditors' value with A at the old face value, 182.5, as their fallback. Without a deal no project is funded, so their fallback is 155.",
        "Cut the face value by the creditors' windfall at the old face value, 190 − 27.5 = 162.50. The shareholders need only K′ ≤ 175. The limit that binds is the manager's choice between A and B, at 170.",
        null,
      ],
    },
  ],
});
