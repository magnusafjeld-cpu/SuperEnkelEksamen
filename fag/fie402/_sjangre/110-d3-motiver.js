/* sjanger 110 · d3-motiver · Why firms merge and who gains */
window.EDU_DATA.sjangre.push({
  id: "d3-motiver",
  num: 110,
  seksjon: "del3",
  emne: "M&A",
  symboler: "ma",
  title: "Why firms merge and who gains",
  summary: "Motives with their mechanism, the motives that fail, who captures the gain, cash or stock and the takeover threat, ending with an H2024 E1 answer to grade",
  chapters: [26],
  exam: "H2024 E1 (12 points, verbal) · Mock exams 2, 6 and 10, E1",
  intro: `<p>M&amp;A motives come as a theory question of about 10 points with no calculations. H2024 Exercise 1 asked for four reasons a deal can be good or bad for the acquirer and for the target, with synergies banned. Kurbatov's own example of a theory question was simply "why do firms merge?". The grader pays for the mechanism behind each reason, not the label. The ladder takes the motives that work, the ones that fail, who gains and why, cash or stock and the takeover threat. It ends by grading an H2024-style answer the way the key does.</p>`,
  steps: [
    {
      id: "d3-motiver-1",
      title: "A motive is a mechanism: say how the value arises",
      theory: `<p>A merger creates value only if the combined firm is worth more than the two firms apart: the gain is S = (A + T + S) − (A + T). Writing "the deal creates value" restates that equation. Kurbatov said in class that "value creation" alone would not be accepted: say <b>through which channel</b> the cash flows rise or the costs fall.</p>
<table class="data"><tr><th>Motive</th><th>The mechanism to write</th></tr>
<tr><td>Economies of scale and scope</td><td>Fixed costs spread over more output; one sales force or platform serves several products</td></tr>
<tr><td>Vertical integration</td><td>Buying a supplier or a customer takes the middleman's margin and ends the risk of being held up</td></tr>
<tr><td>Expertise, patents, human capital</td><td>Buy a team or a technology that would take years to build (Disney buying Pixar)</td></tr>
<tr><td>Market power</td><td>Fewer competitors, higher prices: real for the owners, paid by customers, so authorities may block it</td></tr>
<tr><td>Change of control</td><td>Replace weak managers and run the same assets better</td></tr>
<tr><td>Foothold in a new market</td><td>Local brands, contracts and relationships come with the target</td></tr>
<tr><td>Scarce resources</td><td>A licence, a site or a raw material that cannot be bought on its own</td></tr></table>
<p>Only the first row is a synergy in the narrow sense. With synergies banned, Kurbatov accepted the others in class: patents and human capital (Pixar and Disney), the middleman's margin, a foothold in a new market and scarce resources. The H2024 key even listed economies of scale, but the safest answer leads with a mechanism that is plainly not "the two firms are worth more together".</p>
<div class="callout tip"><span class="h">Intuition</span><p>Every motive ends in value creation, so naming the end earns nothing. Test your sentence: why could the firms not get this gain apart, or by a contract? If you can answer that, you have the mechanism.</p></div>`,
      example: `<div class="worked"><span class="wh">Example: a weak and a full answer</span><p>Fjellmelk ASA, a dairy, buys the firm that makes its milk cartons.</p><p>Weak: "The deal creates value because the two firms are worth more together." That is the definition of a synergy, with no channel.</p><p>Full point: "Vertical integration: Fjellmelk stops paying the supplier's margin on every carton and can no longer be held up by a supplier that raises prices before the Christmas season."</p></div>`,
      q: `<p>Nordkapp Sjømat ASA, a Norwegian salmon exporter, buys Sakura Import, a small firm that has sold Norwegian salmon to Japanese supermarket chains for 20 years. The exam question bans synergies. Which sentence earns the point?</p>`,
      options: [
        "The deal creates value for Nordkapp's owners, since the two firms together are worth more than the two firms apart",
        "Sales in Japan and Norway do not move together, so the combined firm is less risky and worth more to its owners",
        "A foothold in Japan: Sakura's contracts and supermarket relationships would take Nordkapp many years to build",
        "Sakura has posted losses for three years, so Nordkapp can set those losses against its own taxable profit",
      ],
      answer: 2,
      solution: `<p>The sentence that scores names <b>what Nordkapp buys</b> (contracts and relationships in Japan) and <b>why buying beats building</b> (they take years to build). That is the foothold motive Kurbatov accepted in class. Had Sakura been reselling Nordkapp's own salmon, "taking the middleman's margin" would also have scored with its mechanism.</p><p>The other sentences fail for three different reasons: a restated synergy, a risk argument that helps creditors rather than owners and a tax argument that does not hold in this course.</p>`,
      check: `<p>Run the test on each sentence: why could Nordkapp not get this gain alone? Only the foothold sentence answers it, since the relationships take years to build. The others name no channel, name a channel that moves value to someone else or rely on losses that vanish when the owner changes ✓.</p>`,
      traps: [
        "Restates the definition of a synergy and names no channel. Kurbatov: value creation alone is not accepted.",
        "Diversification: owners can hold both shares themselves without paying a premium. Only systematic risk is priced; the lower default risk helps creditors (coinsurance).",
        null,
        "Tax losses are erased when the owner changes (Kurbatov, lecture 13), so you cannot buy a firm for its losses in this course.",
      ],
    },
    {
      id: "d3-motiver-2",
      title: "Motives that fail: diversification, EPS and empire building",
      theory: `<p>Some motives sound like value and are not. The grader rejects the label without the reason, so learn why each one fails.</p>
<ul><li><b>Diversification.</b> The merged firm is less risky, but owners can diversify by holding both shares without paying a premium. Only systematic risk is priced, so the discount rate does not fall. The lower default risk makes the old debt safer: a <b>wealth transfer</b> from shareholders to creditors (coinsurance).</li><li><b>EPS bootstrapping.</b> An acquirer with a high P/E that buys a low-P/E target with shares reports higher earnings per share even with S = 0. The price per share does not move; the P/E falls instead.</li><li><b>Empire building.</b> The CEO gains pay, status and security from running a bigger firm and buys at a negative NPV. Kurbatov: "inefficient reasons are also reasons for M&amp;A". If the question asks why firms merge, it counts, labelled as value-destroying.</li><li><b>Tax losses.</b> Not a motive in this course: the losses are erased when the owner changes.</li></ul>
<div class="formula"><div class="eq">EPS after = (Earnings<sub>A</sub> + Earnings<sub>T</sub>)/(N<sub>A</sub> + x)</div><div class="eq">P after = (A + T + S)/(N<sub>A</sub> + x)</div><div class="where">x is the number of new shares issued to the target's owners. With S = 0 and a fair price for the target, the share price is unchanged whatever happens to EPS.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>A motive creates value only if it changes the cash flows or the risk investors are paid for. Diversification and EPS change neither; they rearrange numbers investors see through. Empire building does change the cash flows: downwards.</p></div>`,
      example: `<div class="worked"><span class="wh">Example: EPS up, nobody richer</span><p>Acquirer: earnings 60, 30 shares at 50, so A = 1 500, EPS = 2.00 and P/E = 25. Target: earnings 40, worth 400 (P/E 10). No synergies. The acquirer pays 400 in its own shares: x = 400/50 = 8.</p><p>EPS after = (60 + 40)/(30 + 8) = 100/38 = 2.6316, up 31.58%. Price after = (1 500 + 400)/38 = 1 900/38 = 50.00, unchanged. The P/E falls to 50/2.6316 = 19.00: the higher EPS is paid for with a lower multiple.</p></div>`,
      q: `<p>Brattli ASA plans to buy Holmen AS with new shares. There are no synergies and the merged firm takes on no new debt. Which statement about the possible motives is correct?</p>`,
      options: [
        "Diversification is worth a premium to Brattli's owners, since the merged firm's cash flows are less volatile than each firm's alone",
        "If EPS rises after the share deal, Brattli's owners must have gained, since each Brattli share now earns more",
        "With no synergies and no new debt, the lower default risk after the merger raises the value of the merged firm's equity",
        "Empire building counts as a reason firms merge, although it destroys value for the owners of the acquiring firm",
      ],
      answer: 3,
      solution: `<p>Kurbatov counts inefficient motives as motives. If the question is why firms merge, <b>empire building</b> is a reason. You score by naming its mechanism (the CEO gains size, pay and status while the owners pay a premium for a negative-NPV deal) and its sign.</p><p>The other three confuse a change in a number with a change in value. Less volatile cash flows are diversification the owners can do themselves. Higher EPS from a share deal is bootstrapping: the price per share does not move. Lower default risk with the same debt is coinsurance: the debt gains and the equity loses by the same amount.</p>`,
      check: `<p>Use the example: EPS rose from 2.00 to 2.6316 while the price stayed at 50.00, so EPS is no evidence of value. For coinsurance use consistency check 4: with total value fixed, the creditors' gain is the shareholders' loss ✓.</p>`,
      traps: [
        "Owners diversify for free by holding both shares. Only systematic risk is priced, so a premium paid for diversification is value given away.",
        "EPS bootstrapping: buying a lower P/E with shares lifts EPS by arithmetic. In the example EPS rose 31.58% while the price stayed at 50.00.",
        "Coinsurance runs the other way: safer debt is worth more, so with total value fixed the equity is worth less. A wealth transfer to creditors.",
        null,
      ],
    },
    {
      id: "d3-motiver-3",
      title: "Who gains: the target, because it can be sold only once",
      theory: `<p>Announcement returns (Kurbatov, lecture 12): targets earn about <b>+15%</b> on average, acquirers about <b>+1%</b> and negative in about half the deals, so roughly zero. The two together earn about +1% to +3%. Mergers create value on average and the target's owners take most of it. The 15% is a price reaction, not the premium; offered premiums are often 20–40%.</p>
<ul><li><b>Competition.</b> A target can be sold only once. Rival bidders, or the threat of one, push the price towards the full synergy. A bidder pays up to its value if it wins minus its value if a rival wins.</li><li><b>Holding out.</b> Each small target holder refuses to sell below what the share will be worth after the deal (the free-rider problem).</li><li><b>Overpayment.</b> Hubris, the winner's curse and empire building make bidders pay more than the target is worth to them.</li><li><b>Information.</b> A bid tells the market the target is better than thought, so part of its price rise is a revaluation, not a share of S.</li></ul>
<p>The exception: a target in <b>distress</b> must sell and has no bargaining power, so the acquirer keeps most of S, "even like a fire sale" (Kurbatov).</p>
<div class="callout tip"><span class="h">Intuition</span><p>The gain goes to the side that is hard to replace. There are many possible buyers but only one target, so competition hands the target the synergy, unless the target cannot wait.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A target is worth 400 alone. Two bidders each expect synergies of 100, so each will pay up to 500. Bidding pushes the price close to 500: the target's owners get almost all of the 100 and the winner keeps little. If the target must sell within weeks and only one bidder shows up, the price can stay near 400 and the acquirer keeps the 100.</p></div>`,
      q: `<p>On the announcement of a deal, targets earn about +15% on average while acquirers earn about zero. Which statement explains the pattern correctly?</p>`,
      options: [
        "Competition: a target can be sold only once, so rival bidders push the price towards the full synergy and the winner keeps little",
        "Mergers create no value on average: whatever the target's owners gain, the acquirer's owners lose in the same deal",
        "The target's owners gain because the synergies are produced inside the target's own business and belong to it",
        "Targets always win: even a distressed target that must sell quickly to a single bidder still takes most of the synergy",
      ],
      answer: 0,
      solution: `<p>Who gets S depends on the price; the price depends on bargaining power. A target can be sold only once, so competing bidders bid the price up until the winner is left with little of the synergy: that is why acquirers earn about zero. Overpayment through hubris or the winner's curse pushes the same way.</p><p>Mergers do create value on average (+1% to +3% combined), so the target's gain is not simply the acquirer's loss. The pattern also has an exception: a distressed target has no bargaining power.</p>`,
      check: `<p>Ask what would change the split. Remove the rivals and the acquirer pays less; force the target to sell and the acquirer keeps most of S. Neither change moves the place where the synergies are produced, so that place cannot be what decides the split ✓.</p>`,
      traps: [
        null,
        "The combined return is about +1% to +3%, mostly positive. Value is created; it is the split that favours the target.",
        "Where S arises does not decide who gets it. The price does: a target that must sell gets little, whichever business produces the gain.",
        "A distressed target has no bargaining power: the acquirer keeps most of the synergy, \"even like a fire sale\" (Kurbatov).",
      ],
    },
    {
      id: "d3-motiver-4",
      title: "Cash or stock: who carries the risk and what the choice signals",
      theory: `<p>With <b>cash</b> the acquirer pays a fixed price P and owns the whole merged firm. With <b>stock</b> the target's owners get a fraction y of the merged firm and become partners.</p>
<div class="formula"><div class="eq">Cash: NPV<sub>A</sub> = S − (P − T) · NPV<sub>T</sub> = P − T</div><div class="eq">Stock: NPV<sub>A</sub> = (1 − y)(A + T + S) − A · NPV<sub>T</sub> = y(A + T + S) − T</div><div class="where">A and T are the stand-alone values, S the synergies. With cash the target's payoff does not depend on S, so the acquirer carries all of the synergy risk. With stock the target carries the fraction y of it.</div></div>
<ul><li><b>Uncertain synergies</b>: pay in stock, so the sellers share the risk.</li><li><b>A seller who stays on as manager</b> takes stock; one who wants out takes cash (Kurbatov).</li><li><b>An acquirer that thinks its shares are overvalued</b> prefers stock, a cheap currency. Investors know it, so a stock offer signals overvaluation and the acquirer's price tends to fall. An acquirer that thinks its shares are cheap pays cash.</li><li><b>Liquidity and debt capacity</b>: cash needs cash or new debt.</li></ul>
<div class="callout tip"><span class="h">Intuition</span><p>Paying in shares makes the sellers partners in whatever the merged firm turns out to be worth. That is useful when you are unsure about the synergies and costly when you know your own shares are cheap.</p></div>`,
      example: `<div class="worked"><span class="wh">Example: the same deal when the synergies fail</span><p>A = 800, T = 200, expected S = 100. A cash offer of P = 250, or the equal stock offer y = 250/1 100 = 0.227273. Expected NPV<sub>A</sub> = 100 − (250 − 200) = 50 either way.</p><p>Now S turns out to be 0. Cash: NPV<sub>A</sub> = 0 − 50 = −50 while the target keeps +50. Stock: the merged firm is worth 1 000, so NPV<sub>A</sub> = (1 − 0.227273) × 1 000 − 800 = 772.73 − 800 = −27.27 and NPV<sub>T</sub> = +27.27. With stock the target bore 50 − 27.27 = 22.73 of the 100 shortfall, which is y × 100.</p></div>`,
      q: `<p>Holt Robotics AS is sold to Bjørkvik ASA. Holt's founder will stay on for five years to run the Holt division. The size of the synergies depends on whether Holt's engineers and Bjørkvik's sales force work well together. Nobody can tell yet. Bjørkvik's managers believe the market prices their shares fairly. Bjørkvik can afford either payment. Which payment does the course point to and why?</p>`,
      options: [
        "Cash: when the synergies are uncertain, the acquirer should lock in a fixed price so that it knows exactly what it pays",
        "Shares: the founder then bears part of the risk that the synergies fail and, by staying on, keeps a stake in the result",
        "Shares: a stock offer signals that Bjørkvik's managers believe their own shares are undervalued by the market",
        "Cash: a stock offer always pushes the acquirer's share price down, whatever its managers know about its shares",
      ],
      answer: 1,
      solution: `<p>Two facts point the same way. The synergies are uncertain; with shares Holt's owners carry the fraction y of any shortfall instead of leaving all of it to Bjørkvik. The founder stays on as manager. A seller who stays takes shares (Kurbatov): the founder's wealth then moves with the integration the founder now runs.</p><p>The signalling argument is neutral here, since Bjørkvik's managers think their shares are fairly priced.</p>`,
      check: `<p>Use the example: when the synergies failed, a stock offer moved 22.73 of the 100 shortfall to the sellers, while cash left all 100 with the acquirer ✓. Turn the facts around and the answer flips: certain synergies and a founder who retires would point to cash.</p>`,
      traps: [
        "Direction reversed: a fixed cash price leaves all of the synergy risk with the acquirer. In the example cash cost the acquirer the full 100 shortfall.",
        null,
        "Signal reversed: stock is the currency an acquirer uses when it thinks its shares are overvalued. An acquirer that thinks they are cheap pays cash.",
        "Overreach: the discount on a stock offer comes from investors suspecting overvaluation. It is a tendency, not a rule. Here the risk sharing and the founder's role decide.",
      ],
    },
    {
      id: "d3-motiver-5",
      title: "The takeover threat: a motive and a monitor",
      theory: `<p>A badly run firm trades below what its assets would be worth under better managers. An outside buyer can buy it, replace management and keep part of the difference: the <b>disciplinary takeover</b>, or change of control, on Kurbatov's list of motives. The gain comes from running the target's own assets better, not from combining two firms, so it survives a ban on synergies.</p>
<p>It also works when no bid comes. A CEO who wants to keep the job must close the gap before someone else does. Kurbatov calls the threat of a hostile takeover "one of the strongest forms of monitoring for corporate managers". It weakens when defences such as poison pills and staggered boards block bids and when target owners hold out for the whole improvement. Takeovers have costs too: disrupted operations and damage to the corporate culture.</p>
<div class="callout tip"><span class="h">Intuition</span><p>The discount on a badly run firm is a prize for whoever fixes it. As long as an outsider can claim the prize, the manager has a reason to claim it first.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A firm is worth 1 000 under its current CEO and 1 300 under better managers. A bidder that pays 1 150 and replaces management gains 1 300 − 1 150 = 150; the target's owners gain 1 150 − 1 000 = 150 on the sale. If the CEO lifts the value to 1 300 first, no bidder can profit, so no bid comes.</p></div>`,
      q: `<p>Granvik Inc., a US-listed firm, has traded about 20% below analysts' estimate of its value under better management for years. No bid has been made in ten years. Why does the takeover market still discipline Granvik's CEO?</p>`,
      options: [
        "It does not: the takeover market disciplines a CEO only in the years when a bid is actually on the table",
        "A poison pill would let Granvik's board bargain for a higher price in a bid, which forces the CEO to work harder today",
        "The 20% discount is a prize for any bidder who replaces management, so the CEO has a reason to close the gap first",
        "The discount lowers the value of the CEO's share options, so the CEO's own pay suffers for as long as the gap stays open",
      ],
      answer: 2,
      solution: `<p>A bidder that buys Granvik, replaces management and runs the assets well collects the 20% gap. The CEO knows this. Closing the gap first removes the prize and with it the bid that would cost the CEO the job. That is why Kurbatov counts the <b>threat</b> as one of the strongest forms of monitoring: it works in every year, not only in the year a bid arrives.</p>`,
      check: `<p>Ask what would switch the discipline off: defences that block bids. They take the prize away from outsiders and the pressure off the CEO, which is why the market reacts badly when a firm adopts a pill ✓. Pay in options is a separate channel that works through the CEO's contract.</p>`,
      traps: [
        "Ignores the threat. A CEO who expects a bid if the gap stays open acts before the bid comes.",
        "A pill blocks bids, so it weakens the threat. It may raise the price once a bid comes, but it does not discipline the CEO.",
        null,
        "A different channel: option pay disciplines through the contract. The question asks about the takeover market, which works through the threat of replacement.",
      ],
    },
    {
      id: "d3-motiver-6",
      title: "Exam level: grade a four-box answer like H2024 E1",
      theory: `<p>H2024 Exercise 1 (12 points) asked for four reasons, synergies banned: one good and one bad for the acquirer, one good and one bad for the target, 1–2 sentences each, 3 points per box. The key accepts any reasonable reason with its mechanism. Run two tests on every box:</p>
<ul><li><b>Is it the banned answer in other words?</b> "Worth more together" and "value creation" are.</li><li><b>Does the mechanism move value the way the box claims?</b> Overpayment is bad for the acquirer and good for the target. Coinsurance helps creditors, not owners. Payment in overvalued acquirer shares hurts the target.</li></ul>
<p>Also check that two boxes do not repeat one mechanism. Leave out tax losses.</p>
<div class="callout tip"><span class="h">Intuition</span><p>A box scores when it says whose wealth moves, in which direction and through which channel. A reason that is true but moves value to someone else belongs in another box or nowhere.</p></div>`,
      example: `<div class="worked"><span class="wh">Example: one box, weak and full</span><p>Bad for the target, weak: "The target loses its independence." No channel to the owners' wealth.</p><p>Full: "Entrenched managers recommend a low offer in return for a golden parachute, so the target's owners get less than the firm is worth to the bidder."</p></div>`,
      q: `<p>A student answers an H2024-style question (synergies banned, 1–2 sentences per box):</p><p>1. Good for the acquirer: replacing the target's weak managers lets the acquirer run the same assets with tighter cost control.</p><p>2. Bad for the acquirer: the winner's curse; the bidder that wins is the one that overestimated the target most, so it tends to overpay.</p><p>3. Good for the target: the merged firm is less risky, so the target's shareholders now own safer shares.</p><p>4. Bad for the target: payment in acquirer shares that later prove overvalued, so the target's owners receive less than the offer seemed worth.</p><p>Which box would the grader mark down and why?</p>`,
      options: [
        "Box 1: replacing the target's managers is a synergy in other words, so it scores nothing when synergies are banned",
        "Box 3: lower risk is diversification the owners could do themselves; the lower default risk helps the creditors",
        "Box 2: the winner's curse is good for the target, since its owners are overpaid, so it belongs in box 3 instead",
        "Box 4: it repeats box 2, since both boxes describe a price that turns out too high for one side of the deal",
      ],
      answer: 1,
      solution: `<p>Box 3 fails the direction test. A less risky merged firm is diversification, which the target's owners could get by holding both shares; only systematic risk is priced. The risk reduction that does move prices goes to the <b>creditors</b>: safer debt is worth more and equity less (coinsurance), so it cannot be good for the target's owners. A box that scores: the control premium, pushed up by competing bidders.</p><p>The other boxes pass both tests. Better management is a governance gain on the target's own assets, which the H2024 key accepts. The winner's curse moves value away from the acquirer. Overvalued paper moves value away from the target.</p>`,
      check: `<p>Score the answer box by box at 3 points each: boxes 1, 2 and 4 pass both tests and box 3 fails the direction test, so 3 × 3 = 9 of 12. Swapping box 3 for the control premium restores 12 ✓.</p>`,
      traps: [
        "Better management is a gain on the target's own assets, not a gain from combining two firms. Kurbatov's key accepts it.",
        null,
        "The winner's curse is bad for the acquirer, which is the box it is in. That the target gains from the same overpayment does not make the box wrong.",
        "Opposite directions: in box 2 the acquirer overpays and the target gains; in box 4 the target receives overpriced paper and loses.",
      ],
    },
  ],
});
