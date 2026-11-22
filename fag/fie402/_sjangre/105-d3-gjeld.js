/* sjanger 105 · d3-gjeld · Debt and equity as options */
window.EDU_DATA.sjangre.push({
  id: "d3-gjeld",
  num: 105,
  seksjon: "del3",
  emne: "Kreditt",
  symboler: "kreditt",
  title: "Debt and equity as options",
  summary: "Equity as a call, debt as risk-free debt plus a written put, the risk-shifting transfer, senior and junior layers and coinsurance in a merger",
  chapters: [24],
  exam: "V2024 P4 · 2022 P4 · PS3 E6 (Google) flagged for 2026",
  intro: `<p>Credit risk has been on 8 of 11 papers but not yet on Kurbatov's two. For 2026 Kurbatov flagged three things: explaining why debt is risk-free debt plus a written put, the Google exercise with senior and junior debt (Problem Set 3, Exercise 6) and the coinsurance example from the M&amp;A lecture, which the spring 2024 paper used as Problem 4. This short ladder turns the balance sheet into options, values the claims in a tree, shows why shareholders like risk and splits debt into layers. At the top you can work a merger's effect on four groups of claim holders and name it.</p>`,
  steps: [
    {
      id: "d3-gjeld-1",
      title: "Equity is a call, debt is risk-free debt plus a written put",
      theory: `<p>Take a firm whose only debt is a zero-coupon bond with face value F due at T. At T the shareholders either pay F and keep the rest or hand the assets to the creditors. Limited liability means they never pay more. So equity pays max(V<sub>T</sub> − F, 0): a call on the firm's assets V with strike F. The creditors get min(V<sub>T</sub>, F) = F − max(F − V<sub>T</sub>, 0): a safe F minus the payoff of a put on the assets struck at F. The shareholders hold that put, their option to default. The creditors have written it.</p>
<div class="formula"><div class="eq">E = Call(V, F) &nbsp;·&nbsp; D = PV(F) − Put(V, F) = V − Call(V, F)</div>
<div class="where">PV(F) = F/(1 + r<sub>f</sub>)<sup>T</sup>. In Kurbatov's words, risky debt is risk-free debt plus a written put. Being short a put subtracts its value, so the formula has a minus. Never write risk-free debt minus a written put: that flips the sign. The underlying is the firm's assets V, not the debt D.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Limited liability is an option the creditors have granted. When the assets fall below F the shareholders walk away and the shortfall lands on the lender. The put is worth exactly what risky debt loses against safe debt.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>F = 100. If V<sub>T</sub> = 150: equity gets 50, debt 100 and the put pays 0.</p><p>If V<sub>T</sub> = 60: equity gets 0, debt 60 = 100 − 40 and the put pays 100 − 60 = 40. The creditors are the ones who pay that 40, through the shortfall.</p></div>`,
      q: `<p>A firm's only debt is a zero-coupon bond with face value F. An exam question asks you to describe the creditors' position with options on the firm's assets. Which description is right?</p>`,
      options: [
        "Risk-free debt with face value F minus a written put on the firm's assets, strike F",
        "Risk-free debt with face value F plus a bought put on the firm's assets, strike F",
        "Risk-free debt with face value F plus a written put on the firm's assets, strike F",
        "A call on the firm's assets with strike F, written to them by the shareholders",
      ],
      answer: 2,
      solution: `<p>The creditors receive min(V<sub>T</sub>, F) = F − max(F − V<sub>T</sub>, 0). The first term is a safe claim to F. The second is the payoff of a put on the firm's assets with strike F. It enters with a minus: the creditors pay it, so they are short the put. Short is the same as written. So the creditors hold <b>risk-free debt plus a written put</b>, worth D = PV(F) − Put.</p>`,
      check: `<p>Test with numbers: F = 80 and V<sub>T</sub> = 50. Risk-free debt pays 80 and the written put costs the creditors max(80 − 50, 0) = 30, so they get 50 = V<sub>T</sub> ✓ With minus a written put they would get 80 + 30 = 110, more than the whole firm.</p>`,
      traps: [
        "Flipped the sign. Minus a written put means plus the put's value: the creditors would gain from a default. The right wording is plus a written put, D = PV(F) − Put.",
        "Got the side of the put backwards. Risk-free debt plus a bought put pays F + (F − V<sub>T</sub>) in default, more than the firm owns. The creditors have written the put. Buying one on top of risky debt gives the risk-free bond, which is what a CDS does.",
        null,
        "Equity, not debt, is the call on the assets struck at F. Debt is the assets minus that call, D = V − Call.",
      ],
    },
    {
      id: "d3-gjeld-2",
      title: "Valuing E and D in a one-period tree",
      theory: `<p>To value the claims you need prices, not expected payoffs. In a one-period tree the firm's assets move from V<sub>0</sub> to V<sub>u</sub> or V<sub>d</sub>. The risk-neutral probability ρ is the up probability under which the assets earn exactly r<sub>f</sub>. Work state by state: equity pays max(V − F, 0) and debt pays min(V, F). Weight each payoff by ρ and 1 − ρ and discount at r<sub>f</sub>. Real probabilities never enter, because V<sub>0</sub> already contains them.</p>
<div class="formula"><div class="eq">ρ = [(1 + r<sub>f</sub>)V<sub>0</sub> − V<sub>d</sub>]/(V<sub>u</sub> − V<sub>d</sub>)</div>
<div class="eq">E<sub>0</sub> = [ρ·max(V<sub>u</sub> − F, 0) + (1 − ρ)·max(V<sub>d</sub> − F, 0)]/(1 + r<sub>f</sub>) &nbsp;·&nbsp; D<sub>0</sub> = V<sub>0</sub> − E<sub>0</sub></div>
<div class="where">ρ is on the formula sheet. Apply the max and the min in each state before you average.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The floor at zero is worth something. E<sub>0</sub> is more than V<sub>0</sub> − PV(F). The difference is the put: the value of walking away in the down state.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>V<sub>0</sub> = 100, V<sub>u</sub> = 120, V<sub>d</sub> = 80, r<sub>f</sub> = 4%, F = 90. ρ = (104 − 80)/40 = 0.60.</p><p>Equity pays 30 or 0: E<sub>0</sub> = 0.6 × 30/1.04 = 17.3077. Debt pays 90 or 80: D<sub>0</sub> = (54 + 32)/1.04 = 82.6923. Sum 100 ✓</p><p>The put pays 0 or 10, worth 0.4 × 10/1.04 = 3.8462. PV(F) − Put = 86.5385 − 3.8462 = 82.6923 ✓</p></div>`,
      q: `<p>A firm's assets are worth 400 today and will be worth 520 or 320 in one year. Analysts put the probability of the up state at 0.7. The firm's only debt is a one-year zero-coupon bond with face value 360. The risk-free rate is 4%. What is the firm's equity worth today?</p>`,
      options: ["53.8462", "73.8462", "76.8000", "107.6923"],
      answer: 1,
      solution: `<p>ρ = (1.04 × 400 − 320)/(520 − 320) = 96/200 = 0.48.</p><p>Equity pays max(520 − 360, 0) = 160 up and max(320 − 360, 0) = 0 down.</p><p>E<sub>0</sub> = 0.48 × 160/1.04 = 76.80/1.04 = <b>73.8462</b>.</p>`,
      check: `<p>Debt pays 360 or 320: D<sub>0</sub> = (0.48 × 360 + 0.52 × 320)/1.04 = 339.20/1.04 = 326.1538. Then 73.8462 + 326.1538 = 400 ✓ The put pays 0 or 40, worth 0.52 × 40/1.04 = 20.0000. PV(F) − Put = 346.1538 − 20.0000 = 326.1538 ✓ Equity also beats the no-floor value V<sub>0</sub> − PV(F) = 53.8462 by exactly that put.</p>`,
      traps: [
        "Dropped limited liability: V<sub>0</sub> − PV(F) = 400 − 346.1538 = 53.8462 charges the shareholders the shortfall of 40 in the down state.",
        null,
        "Forgot to discount the risk-neutral expectation: 0.48 × 160 = 76.8000.",
        "Used the analysts' 0.7 instead of ρ: 0.7 × 160/1.04 = 107.6923. Real probabilities never pair with r<sub>f</sub>.",
      ],
    },
    {
      id: "d3-gjeld-3",
      title: "Why shareholders like risk: the wealth transfer",
      theory: `<p>Equity is a call on the assets. A call is worth more when the underlying is more volatile. Debt is risk-free debt minus a put, which is worth more too. So if the firm makes its assets riskier without changing their value V, the equity rises and the debt falls by the same amount. No value is created; it moves from the creditors to the shareholders. The graders look for the words <b>wealth transfer</b>. Taken far enough, shareholders accept a negative-NPV gamble: asset substitution, or gambling for resurrection.</p>
<div class="formula"><div class="eq">V unchanged, σ up ⟹ ΔE = −ΔD &gt; 0</div>
<div class="where">Consistency check 4: creditors' gain = shareholders' loss when total value is fixed, here with the creditors losing. Keep ρ: it comes from market prices and does not change when one firm swaps its assets.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The shareholders keep all the extra upside and, thanks to the floor at zero, none of the extra downside. That downside lands on the creditors, whose debt was priced before the switch.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>The firm from the last example (V<sub>0</sub> = 100, 120 or 80, F = 90, r<sub>f</sub> = 4%, ρ = 0.60) swaps to assets worth 140 or 50. They are still worth (0.6 × 140 + 0.4 × 50)/1.04 = 104/1.04 = 100.</p><p>Equity: 0.6 × 50/1.04 = 28.8462, up 11.5385. Debt: (0.6 × 90 + 0.4 × 50)/1.04 = 71.1538, down 11.5385.</p></div>`,
      q: `<p>A firm's assets are worth 400 today and will be worth 520 or 320 in one year. Its only debt is a one-year zero-coupon bond with face value 360. The risk-free rate is 4%. The managers swap the assets for riskier ones that will be worth 572 or 272 in the same two states and are also worth 400 today. What happens to the values of the equity and the debt?</p>`,
      options: [
        "Equity +24.0000 and debt −24.0000: a wealth transfer to the shareholders",
        "Equity 0.0000 and debt 0.0000: V is unchanged, so no one gains or loses",
        "Equity +24.0000 and debt unchanged: the riskier assets create value",
        "Equity +24.9600 and debt −24.9600: a wealth transfer to shareholders",
      ],
      answer: 0,
      solution: `<p>ρ = (1.04 × 400 − 320)/200 = 0.48. The new assets are still worth (0.48 × 572 + 0.52 × 272)/1.04 = 416/1.04 = 400.</p><p><b>Equity.</b> Before: 0.48 × 160/1.04 = 73.8462. After it pays 572 − 360 = 212 or 0: 0.48 × 212/1.04 = 97.8462. Change +24.0000.</p><p><b>Debt.</b> Before: 326.1538. After it pays 360 or 272: (172.80 + 141.44)/1.04 = 302.1538. Change −24.0000.</p><p>Firm value is unchanged, so this is a <b>wealth transfer</b> of 24.0000 from the creditors to the shareholders.</p>`,
      check: `<p>Consistency check 4: +24.0000 − 24.0000 = 0 with V fixed at 400 ✓ The put tells the same story: it now pays 0 or 360 − 272 = 88, worth 0.52 × 88/1.04 = 44.0000 against 20.0000 before. The debt's yield jumps from 360/326.1538 − 1 = 10.3774% to 360/302.1538 − 1 = 19.1446%: new lenders would price that in, the old ones cannot.</p>`,
      traps: [
        null,
        "V is unchanged, but its split is not. The call on the assets gains from the extra spread and the debt, short a put, loses the same amount.",
        "Looked at the equity only. With V fixed at 400 the 24.0000 must come from somewhere: the debt falls by exactly that much.",
        "Forgot to discount: 0.48 × 212 − 0.48 × 160 = 24.9600 is the change in the risk-neutral expected payoff a year from now.",
      ],
    },
    {
      id: "d3-gjeld-4",
      title: "Senior and junior debt from two calls",
      theory: `<p>With two layers of debt, value them one layer at a time (lecture 10, the Google exercise). Pretend first that only the senior debt exists: equity would be the call struck at F<sub>S</sub>, so the senior debt is V − C(F<sub>S</sub>). With both layers the shareholders are paid only after F<sub>S</sub> + F<sub>J</sub>, so equity is the call struck at the total. The junior debt is what lies between the two calls.</p>
<div class="formula"><div class="eq">D<sub>S</sub> = V − C(F<sub>S</sub>) &nbsp;·&nbsp; E = C(F<sub>S</sub> + F<sub>J</sub>) &nbsp;·&nbsp; D<sub>J</sub> = C(F<sub>S</sub>) − C(F<sub>S</sub> + F<sub>J</sub>)</div>
<div class="eq">y = (F/D)<sup>1/T</sup> − 1</div>
<div class="where">If the firm has no debt today, a call on one share struck at F/n is a call on 1/n of the assets, where n is the number of shares. So C(F) = n × the quoted call price with strike F/n. Take the midpoint of bid and ask, multiply by n and say that you did. T is in years: 30 months is T = 2.5.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The junior creditors get nothing until the seniors are paid in full, then everything up to F<sub>J</sub>. They take the first losses after the shareholders, so their yield is the highest of the three layers.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>100 million shares at 80 (V = 8 billion), no debt. Plan: senior 3 billion and junior 2 billion, both due in one year. Calls: strike 30 at 50.80/51.20, strike 50 at 33.30/33.70.</p><p>Midpoints 51.00 and 33.50. D<sub>S</sub> = 8 − 0.1 × 51.00 = 2.90. E = 0.1 × 33.50 = 3.35. D<sub>J</sub> = 8 − 2.90 − 3.35 = 1.75 = 0.1 × (51.00 − 33.50).</p><p>y<sub>J</sub> = 2/1.75 − 1 = 14.2857% against y<sub>S</sub> = 3/2.90 − 1 = 3.4483%.</p></div>`,
      q: `<p>A firm has 500 million shares trading at 90 and no debt. Markets are perfect and the risk-free rate is 3%. It considers issuing two zero-coupon bonds due in 30 months: senior debt with face value 20 billion and junior debt with face value 10 billion. European calls on its shares expiring in 30 months are quoted at bid 53.95 and ask 54.35 for strike 40 and at bid 37.60 and ask 38.00 for strike 60. What annual yield would the junior bond pay?</p>`,
      options: ["5.7286%", "22.3242%", "12.0483%", "8.3939%"],
      answer: 3,
      solution: `<p><b>Strikes.</b> Senior: 20/0.5 = 40 per share. Total: (20 + 10)/0.5 = 60 per share.</p><p><b>Midpoints.</b> (53.95 + 54.35)/2 = 54.15 and (37.60 + 38.00)/2 = 37.80.</p><p><b>Layers.</b> V = 0.5 × 90 = 45 billion. D<sub>S</sub> = 45 − 0.5 × 54.15 = 45 − 27.075 = 17.925. E = 0.5 × 37.80 = 18.900. D<sub>J</sub> = 45 − 17.925 − 18.900 = 8.175 = 0.5 × (54.15 − 37.80).</p><p><b>Yield.</b> y<sub>J</sub> = (10/8.175)<sup>1/2.5</sup> − 1 = <b>8.3939%</b> a year.</p>`,
      check: `<p>Grow the junior debt back: 8.175 × 1.083939<sup>2.5</sup> = 10.000 ✓ The three yields line up as they must: senior (20/17.925)<sup>0.4</sup> − 1 = 4.4788%, all debt together (30/26.100)<sup>0.4</sup> − 1 = 5.7286%, junior 8.3939%. Neither layer is worth more than its risk-free value: 17.925 &lt; 20/1.03<sup>2.5</sup> = 18.5753 and 8.175 &lt; 9.2877 ✓</p>`,
      traps: [
        "Gave the yield on all 30 billion together: (30/26.100)<sup>0.4</sup> − 1 = 5.7286%. Splitting the debt moves the risk onto the junior layer.",
        "Did not annualise: 10/8.175 − 1 = 22.3242% is the return over 30 months.",
        "Valued the senior debt as risk-free, 20/1.03<sup>2.5</sup> = 18.5753, so D<sub>J</sub> = 45 − 18.5753 − 18.900 = 7.5247 and (10/7.5247)<sup>0.4</sup> − 1 = 12.0483%. The senior debt is risky too.",
        null,
      ],
    },
    {
      id: "d3-gjeld-5",
      title: "Coinsurance: who gains when two levered firms merge",
      theory: `<p>Merge two levered firms with no synergies whose bad states do not coincide. Each firm's assets now stand behind both firms' debt, so a surplus at one covers a shortfall at the other. The merged debt defaults less often and is worth more: the <b>coinsurance effect</b>. The old debt was priced before the merger as risky debt, so the creditors now hold a safer claim than the one they paid for. Firm value is unchanged, so the creditors' gain is the shareholders' loss: a wealth transfer.</p>
<div class="formula"><div class="eq">merged debt in state s = min(V<sub>A,s</sub> + V<sub>B,s</sub>, F<sub>A</sub> + F<sub>B</sub>)</div>
<div class="eq">Call(V<sub>A</sub> + V<sub>B</sub>) ≤ Call(V<sub>A</sub>) + Call(V<sub>B</sub>)</div>
<div class="where">Add the assets state by state first, then apply the min against the total face value. With risk-neutral investors and r<sub>f</sub> = 0, each claim is worth its average payoff.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Apart, each group of shareholders could walk away from its own bad state. Merged, the good firm's surplus must first fill the other firm's hole. Two calls are worth more than one call on the sum. The debt gains what the calls lose.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Two equally likely states, r<sub>f</sub> = 0. A is worth 30 or 12 and owes 18; B is worth 10 or 26 and owes 14.</p><p>Apart: A's debt pays 18 or 12, worth 15, with equity worth 6. B's debt pays 10 or 14, worth 12, with equity worth 6.</p><p>Merged: 40 or 38 against 32, so the debt is worth 32 and the equity (8 + 6)/2 = 7. Creditors gain 32 − 27 = 5; shareholders lose 12 − 7 = 5.</p></div>`,
      q: `<p>Two equally likely states, risk-neutral investors, r<sub>f</sub> = 0. Firm A will be worth 40 or 10 and owes 24. Firm B will be worth 8 or 26 and owes 16. Both debts are zero-coupon bonds due at the same date. The firms merge with no synergies and the merged firm takes over both debts. By how much do the creditors of the two firms gain in total?</p>`,
      options: ["−9.00", "9.00", "0.00", "11.00"],
      answer: 1,
      solution: `<p><b>Apart.</b> A's debt pays 24 or 10, worth 17. B's pays 8 or 16, worth 12. Total 29.</p><p><b>Merged.</b> Add first: 40 + 8 = 48 and 10 + 26 = 36, against 24 + 16 = 40. The debt pays 40 or 36, worth 38.</p><p>The creditors gain 38 − 29 = <b>9.00</b>.</p>`,
      check: `<p>Equity apart: A pays 16 or 0, worth 8; B pays 0 or 10, worth 5; total 13. Merged equity pays 8 or 0, worth 4: the shareholders lose 9 ✓ Firm value is 29 + 13 = 42 = 38 + 4 before and after (consistency check 4). The option route agrees: the puts the creditors have written were worth (0 + 14)/2 + (8 + 0)/2 = 11 apart and (0 + 4)/2 = 2 merged, a gain of 9 to the creditors.</p>`,
      traps: [
        "Gave the shareholders' change, not the creditors'. The merged equity is worth 4 against 13 apart; the creditors gain the same 9.",
        null,
        "No synergies means firm value is fixed, not that nothing moves. The merged assets back both bonds, so the debt is worth more and the equity less.",
        "Averaged the merged assets first: min(42, 40) = 40, as if the debt were risk-free. It falls short by 4 in state 2, so it is worth 38.",
      ],
    },
    {
      id: "d3-gjeld-6",
      title: "Exam level: coinsurance with four groups (V2024 P4)",
      theory: `<p>V2024 Problem 4 (28 points) was the coinsurance example from the M&amp;A lecture with new numbers. Kurbatov called that example a hint for this year's exam. It asked for four things: assets, debt and equity of each firm apart; the same for the merged firm; the gain or loss of each of the four groups with the check that they cancel, plus whether the shareholders would merge; the name of the effect. In the exam the merged debt became risk-free. Split the merged equity as the question says, usually in proportion to the equity values before the merger.</p>
<div class="formula"><div class="eq">ΔD<sub>A</sub> + ΔD<sub>B</sub> + ΔE<sub>A</sub> + ΔE<sub>B</sub> = 0 &nbsp;(no synergies)</div>
<div class="where">Name the coinsurance effect and say why it happens: the old debt was priced before the merger, so the creditors' gain is a wealth transfer from the shareholders. No exchange ratio rescues both groups of shareholders, since it only splits a smaller equity.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>Risk reduction is no reason to merge. Shareholders can diversify on their own. When the firm does it for them, the safer debt hands value to creditors who never paid for it.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Two equally likely states, r<sub>f</sub> = 0. A is worth 50 or 8 and owes 18; B is worth 10 or 28 and owes 12.</p><p>Apart: debt A 13, equity A 16; debt B 11, equity B 8. Merged: 60 or 36 against 30, so the debt is risk-free at 30 and the equity is (30 + 6)/2 = 18, split 16 : 8 into 12 and 6.</p><p>Creditors A +5, B +1; shareholders A −4, B −2. Sum 0 ✓ Both groups of shareholders lose.</p></div>`,
      q: `<p>Two equally likely states, risk-neutral investors, r<sub>f</sub> = 0. Firm A will be worth 52 or 10 and owes 22. Firm B will be worth 10 or 40 and owes 16. Both debts are zero-coupon bonds due at the same date. The firms merge with no synergies. Each group of shareholders gets a share of the merged equity in proportion to its equity value before the merger. Which line gives the change in value of each group and the shareholders' decision?</p>`,
      options: [
        "Creditors A +6.00, B +3.00; shareholders A −5.00, B −4.00; the shareholders reject",
        "Creditors A +6.00, B +3.00; shareholders A −6.00, B −3.00; the shareholders reject",
        "Creditors A 0.00, B 0.00; shareholders A 0.00, B 0.00; the shareholders are indifferent",
        "Creditors A +6.00, B +3.00; shareholders A −5.00, B −4.00; the shareholders are indifferent",
      ],
      answer: 0,
      solution: `<p><b>Apart.</b> A: debt pays 22 or 10, worth 16; equity 30 or 0, worth 15; V<sub>A</sub> = 31. B: debt pays 10 or 16, worth 13; equity 0 or 24, worth 12; V<sub>B</sub> = 25.</p><p><b>Merged.</b> Assets 62 or 50 against F = 38, so the debt is risk-free and worth 38. Equity pays 24 or 12, worth 18. V = 56 = 31 + 25.</p><p><b>Split.</b> Equity before was 15 : 12, so A's shareholders get 18 × 15/27 = 10 and B's get 8. Each bond is now paid in full: 22 and 16.</p>
<table class="data"><tr><th>Group</th><th>Before</th><th>After</th><th>Change</th></tr>
<tr><td>Creditors A</td><td class="n">16.00</td><td class="n">22.00</td><td class="n">+6.00</td></tr>
<tr><td>Creditors B</td><td class="n">13.00</td><td class="n">16.00</td><td class="n">+3.00</td></tr>
<tr><td>Shareholders A</td><td class="n">15.00</td><td class="n">10.00</td><td class="n">−5.00</td></tr>
<tr><td>Shareholders B</td><td class="n">12.00</td><td class="n">8.00</td><td class="n">−4.00</td></tr>
<tr><td>Total</td><td class="n">56.00</td><td class="n">56.00</td><td class="n">0.00</td></tr></table>
<p>Both groups of shareholders lose, so they <b>reject</b> the merger. The effect is coinsurance: a wealth transfer to creditors whose debt was priced before the merger.</p>`,
      check: `<p>Consistency check 4: the creditors gain 6 + 3 = 9 and the shareholders lose 5 + 4 = 9 while V stays at 56 ✓ The check cannot catch a wrong split of the equity: a 50 : 50 split gives −6 and −3, which still sums to −9. Only the proportional rule catches it. The bound that can fail: merged equity of 18 is below the 27 the two groups held apart, so no exchange ratio makes both better off.</p>`,
      traps: [
        null,
        "Split the merged equity 50 : 50, 9 each, instead of 15 : 12: A loses 15 − 9 = 6 and B 12 − 9 = 3. The four changes still sum to zero, so check 4 does not catch it.",
        "Assumed nothing moves because there are no synergies. Total value is fixed, but the merged assets now back both bonds, so value moves from the shareholders to the creditors.",
        "Judged the merger by firm value, which is unchanged, instead of by the shareholders' own claims. Both groups lose, so they reject.",
      ],
    },
  ],
});
