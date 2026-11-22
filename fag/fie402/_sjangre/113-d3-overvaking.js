/* sjanger 113 · d3-overvaking · Monitoring the CEO: who and with what */
window.EDU_DATA.sjangre.push({
  id: "d3-overvaking",
  num: 113,
  seksjon: "del3",
  emne: "Governance",
  symboler: "governance",
  title: "Monitoring the CEO: who and with what",
  summary: "The agency problem and its names, the board, the monitors outside the boardroom, the cost of monitoring too hard, ending with H2024 Exercise 2",
  chapters: [27],
  exam: "H2024 E2 (12 points, verbal) · Mock exams 1, 6 and 11, E2",
  intro: `<p>Governance is "pretty much always" one of the two theory questions (Kurbatov), about 10 points with no calculations. H2024 Exercise 2 asked for two distinct ways to monitor the CEO: who monitors and with which tools, at most 3–4 sentences each. Per method the grader looks for a named monitor and a named tool. The ladder gives you the agency problem, the board, the monitors outside the boardroom and the cost of monitoring too hard. It ends by grading answers to the H2024 question.</p>`,
  steps: [
    {
      id: "d3-overvaking-1",
      title: "The agency problem: what the CEO does when nobody watches",
      theory: `<p>In a listed firm the owners and the people who run it are different people. The CEO bears the full cost of effort but keeps only a small share of the value it creates, while perks cost the CEO almost nothing. Kurbatov's names for what that gap produces (lecture 1):</p>
<ul><li><b>Empire building</b>: acquisitions and projects that make the firm bigger, not more valuable.</li><li><b>Shirking</b>: low effort, too many outside activities.</li><li><b>Entrenchment</b>: making yourself hard to replace, including manipulating reports so that problems stay hidden.</li><li><b>Private benefits</b>: perks paid for by the firm, insider trading.</li></ul>
<p><b>Monitoring</b> means that someone watches the CEO and can act on what they see. Small shareholders rarely do it: each would bear the full cost and get only a sliver of the gain (the free-rider problem).</p>
<div class="callout tip"><span class="h">Intuition</span><p>A CEO with 0.5% of the shares pays the whole cost of a hard decision and gets half a per cent of its value. A perk that costs the firm 10 costs the CEO 0.05. Without a monitor the cheap choice wins.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A CEO moves a loss-making division's results into a footnote and pushes through a rule that removing a director needs 80% of the votes. Both make the CEO harder to replace: <b>entrenchment</b>. The agency cost is the value lost because a weak CEO stays, not what the CEO earns by staying.</p></div>`,
      q: `<p>Sørvik ASA's CEO owns 0.3% of the shares. Over two years the CEO (i) moved the head office into a tower with a private gym and a chef, (ii) bought a ski resort and a regional airline while the share price fell on each announcement and (iii) now leaves most days at two to sit on outside boards. Which matching of behaviour and name is right?</p>`,
      options: [
        "(i) empire building, (ii) private benefits, (iii) shirking",
        "(i) private benefits, (ii) entrenchment, (iii) shirking",
        "(i) shirking, (ii) empire building, (iii) private benefits",
        "(i) private benefits, (ii) empire building, (iii) shirking",
      ],
      answer: 3,
      solution: `<p>(i) A tower with a gym and a chef is consumption paid for by the firm: <b>private benefits</b>. (ii) Buying unrelated businesses while the market marks the price down each time makes the firm bigger and less valuable: <b>empire building</b>. (iii) Little time for the firm because of outside activities: <b>shirking</b>. Nothing in the case protects the CEO's job, so entrenchment does not fit.</p>`,
      check: `<p>Ask what the CEO gets from each: (i) comfort, (ii) size and status, (iii) time. Comfort is a private benefit, size is the empire and time taken from the job is shirking ✓. Entrenchment would show up as defences or hidden information, which the case does not mention.</p>`,
      traps: [
        "Swapped (i) and (ii). A luxury office is consumption, a private benefit; buying businesses that lower the share price is empire building.",
        "Nothing in (ii) makes the CEO harder to replace. Value-destroying acquisitions that grow the firm are empire building.",
        "Swapped (i) and (iii). Outside board seats that take the CEO's time are shirking; a firm-paid tower with a chef is a private benefit.",
        null,
      ],
    },
    {
      id: "d3-overvaking-2",
      title: "The board: the monitor that can fire the CEO",
      theory: `<p>The board hires and fires the CEO, sets the CEO's pay, approves the big decisions and has the best access to internal reports. It monitors only as well as it is independent. Directors come in three kinds: <b>insiders</b> (executives who report to the CEO), <b>gray directors</b> (outsiders with ties, such as the firm's lawyer, its banker or a former executive) and <b>independent directors</b>, who monitor best.</p>
<ul><li><b>CEO as chair</b> is the red flag: the CEO then runs the body that monitors the CEO. A seat on the board alone is fine: "The only red flag is if the CEO is also chair of the board" (Kurbatov).</li><li><b>Size</b>: 7 to 11 directors. Too small lacks capacity; too large invites free riding among the directors.</li><li><b>Captive board</b>: directors who owe their seats to the CEO approve whatever the CEO proposes. Who picks the board? Mostly the board itself.</li><li><b>Busy directors</b> with many seats have little time for each.</li><li><b>Nordic nomination committee</b>: in Norway and Sweden a committee of the largest shareholders nominates directors. Kurbatov: research shows it "really increases transparency and independence of the board".</li></ul>
<div class="callout tip"><span class="h">Intuition</span><p>A director who owes the CEO a seat, a salary or fees pays a personal price for voting against the CEO. Independence removes that price; a sensible size stops each director from leaving the work to the others.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A US-listed firm has nine directors: the CEO (not chair), the CFO, the firm's banker and six with no ties, one of whom chairs the board. Insiders 2, gray 1, independent 6 of 9. The size is inside 7 to 11 and the chair is independent, so the CEO's seat is no problem on its own.</p></div>`,
      q: `<p>Elmwood Inc., a US-listed firm, has 15 directors: the CEO (not the chair), the CFO, a former CEO of the firm and 12 directors with no ties to the firm. An independent director chairs the board. Seven of the 12 independent directors also sit on five or more other boards. Which statement is correct?</p>`,
      options: [
        "The main red flag is the CEO's seat: a CEO should not be a director, even with an independent director as chair",
        "Twelve independent directors out of 15 make this a strong monitor; how many other boards they sit on does not matter",
        "The board is too large: with 15 seats each director can leave the work to the others, so 7 to 11 would monitor better",
        "The former CEO counts as independent, since a former CEO no longer works for the firm or reports to the current CEO",
      ],
      answer: 2,
      solution: `<p>Kurbatov's sweet spot is 7 to 11 directors. Fifteen is above it: with many seats each director assumes someone else will do the work, the free-rider problem inside the board. The board has a second weakness: seven independent directors are busy with five or more other boards and have little time to monitor. The CEO's seat is not a problem while someone else chairs the board. The former CEO is gray, not independent.</p>`,
      check: `<p>Count by kind: insiders 2 (CEO, CFO), gray 1 (former CEO), independent 12; 2 + 1 + 12 = 15 ✓. Independence on paper is high, so the weaknesses must come from elsewhere: the size and the busy directors.</p>`,
      traps: [
        "Kurbatov: the only red flag is a CEO who also chairs the board. Here an independent director is chair.",
        "Busy directors with five or more other boards have little time for each. Independence on paper does not make up for absent directors.",
        null,
        "A former CEO has ties to the firm and to the people the former CEO hired: a gray director.",
      ],
    },
    {
      id: "d3-overvaking-3",
      title: "Monitors outside the boardroom and their tools",
      theory: `<p>A monitor needs a reason to watch and a tool to act. Kurbatov's list beyond the board (lecture 13 and the wrap-up):</p>
<table class="data"><tr><th>Monitor</th><th>Tool</th><th>Weak point</th></tr>
<tr><td>Block holders</td><td>Vote the block, board seats, campaigns, proxy fights</td><td>May take private benefits from minority holders</td></tr>
<tr><td>Institutions</td><td>Votes across many holdings, engagement teams</td><td>Index funds hold a stock only because it is in the index, cannot sell and spread a small budget thinly: weak monitors</td></tr>
<tr><td>Analysts and the press</td><td>Questions, public scrutiny, reputation</td><td>No formal power; analysts need access to management</td></tr>
<tr><td>Auditors</td><td>An independent check of the accounts</td><td>Paid by the firm they audit</td></tr>
<tr><td>Creditors</td><td>Covenants, reporting duties, refusing new credit</td><td>Care about repayment, not value</td></tr>
<tr><td>Regulators</td><td>SOX (2002): independent auditors, disclosure, the CEO and CFO answer for the accounts. Dodd-Frank (2010): independent pay committees, large holders may nominate directors</td><td>Target fraud, not legal waste</td></tr>
<tr><td>Employees</td><td>See problems first, blow the whistle</td><td>Speaking up is risky</td></tr>
<tr><td>Takeover market</td><td>A bidder buys a badly run firm and replaces management; the threat alone disciplines</td><td>Blocked by defences, slow and costly</td></tr></table>
<p>Kurbatov calls the takeover threat "one of the strongest forms of monitoring for corporate managers".</p>
<div class="callout tip"><span class="h">Intuition</span><p>Monitoring pays only for someone with enough at stake and a way to act. A holder of 5% gets 5% of the gain and may act; a holder of 0.01% waits for others. An index fund holds a large stake but has no option to sell and no budget to look closely.</p></div>`,
      example: `<div class="worked"><span class="wh">Example: does a holder bother?</span><p>A campaign to replace a weak CEO would raise firm value by 400 and cost 10. A fund with 5% gains 0.05 × 400 = 20 &gt; 10 and acts. A holder of 0.5% gains 2 &lt; 10 and free-rides. The break-even stake is 10/400 = 2.5%.</p></div>`,
      q: `<p>An index fund owns 2% of Brakstad ASA, one of the largest stakes on the register. Kurbatov calls index funds weak monitors. Which statement explains why?</p>`,
      options: [
        "It holds Brakstad only because Brakstad is in the index, cannot sell to punish the CEO and has a tiny budget per firm",
        "Its portfolio is well diversified, so a badly run Brakstad costs the fund nothing and it has no reason to care about the CEO",
        "The free-rider problem is worst for the largest holders, so a 2% stake makes the fund monitor less than a holder of 0.01%",
        "It exits instead: a fund unhappy with the CEO simply sells its shares, which is far cheaper than monitoring the firm",
      ],
      answer: 0,
      solution: `<p>An index fund's reason to own Brakstad is the index, not a view on the CEO. It cannot sell without leaving the index, so the threat to exit is gone. Its governance team covers thousands of firms, so the budget per firm is tiny. A large stake with no exit and no budget makes a weak monitor, which is Kurbatov's point.</p>`,
      check: `<p>Run the free-rider test from the example: 2% of a gain of 400 is 8, below a campaign cost of 10, so even a 2% holder stays put ✓. Voting is cheap, so the fund votes; a campaign is not, so it rarely runs one.</p>`,
      traps: [
        null,
        "Diversification removes the risk of one firm, not its losses: a badly run Brakstad still lowers the fund's value by 2% of the loss.",
        "Direction reversed: a larger stake captures more of the gain, so the free-rider problem is weaker for large holders, not stronger.",
        "An index fund must hold every firm in the index, so it cannot sell. Exit is what active funds can do.",
      ],
    },
    {
      id: "d3-overvaking-4",
      title: "Monitoring has a cost: too much makes the CEO passive",
      theory: `<p>Monitoring is not free. Directors and owners spend time and money on it. Independent directors also know less about the business than insiders do. It also changes what the CEO does. A CEO who is second-guessed on every decision and punished for every visible failure protects the job by avoiding risk, including risky projects with positive NPV. Kurbatov: "Monitor someone too harshly, they will be just not doing anything." Good governance picks a point between freedom for the manager and tight control: monitor more only while the agency cost it removes exceeds what it costs.</p>
<div class="callout tip"><span class="h">Intuition</span><p>A failed project costs the CEO the job; a success earns the CEO a small share of the gain. The harder failures are punished, the more the CEO prefers doing nothing to doing something good but risky.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A board makes every contract above NOK 2 million need its approval and reviews the CEO after each quarter. Shirking falls. But the CEO stops proposing a new plant with positive NPV because it could show losses in its first two years. The board has traded a little shirking for a lost project.</p></div>`,
      q: `<p>At the annual meeting a shareholder says: "More monitoring is always better for the owners." Which reply earns the point?</p>`,
      options: [
        "Agree: each extra check removes some shirking, so firm value keeps rising for as long as monitoring grows",
        "Disagree: monitoring costs money, while a CEO punished for every failure stops taking risky positive-NPV projects",
        "Disagree: monitoring never changes behaviour, since the CEO always knows more than the monitors do",
        "Agree, as long as the monitors are independent: independent monitors remove all of the costs of monitoring",
      ],
      answer: 1,
      solution: `<p>The reply that scores names the <b>trade-off</b>. Monitoring has a direct cost in time and money. It also has an indirect cost: a CEO who loses the job after a visible failure avoids good risky projects, which Kurbatov sums up as monitoring so harshly that "they will be just not doing anything". Past some point extra monitoring lowers value.</p>`,
      check: `<p>Test the claim on the example: tighter control removed some shirking and cost the owners a plant with positive NPV. If more monitoring were always better, that plant could not have been lost ✓.</p>`,
      traps: [
        "Ignores the cost. Past some point the CEO protects the job by taking less risk and value falls.",
        null,
        "Overreach: monitoring does change behaviour, which is exactly why too much of it makes the CEO passive.",
        "Independent monitors still cost time and money and know less about the business than insiders. Independence does not stop a CEO from turning passive.",
      ],
    },
    {
      id: "d3-overvaking-5",
      title: "Exam level: two ways to monitor the CEO, who and with what",
      theory: `<p>H2024 Exercise 2 (12 points): select and describe two distinct ways of monitoring the CEO, explain who monitors and which tools they have, at most 3–4 sentences per method. Each method carries about half the points. The grader checks three things:</p>
<ul><li><b>Who</b>: a named monitor (the board's independent directors, lenders, a bidder), not "governance".</li><li><b>With what</b>: concrete tools (fire the CEO and set pay; covenants; a tender offer).</li><li><b>Distinct</b>: two different monitors. An activist's vote and a proxy fight are both shareholder voice, so they count as one method.</li></ul>
<p>A sentence on the weak point (a captive board, lenders who care only about repayment, defences) lifts a good answer. Selling the shares is exit, not monitoring the CEO.</p>
<div class="callout tip"><span class="h">Intuition</span><p>The grader reads each method as a pair: who monitors and what they can do to the CEO. A monitor without a tool cannot touch the CEO, so it disciplines nobody and earns half the points at most.</p></div>`,
      example: `<div class="worked"><span class="wh">Example: one method in full</span><p><b>Auditors and the audit committee.</b> An independent auditor checks the accounts each year and reports to the board's audit committee, which meets the auditor without management in the room. Tools: a qualified opinion and direct access to the committee; under SOX the CEO and CFO answer personally for the accounts. Weak point: the firm pays its own auditor.</p></div>`,
      q: `<p>Which answer to the H2024 question (two distinct ways of monitoring the CEO, who monitors and with which tools) earns full marks?</p>`,
      options: [
        "1. Lenders: banks write covenants that cap debt, payouts and acquisitions and demand quarterly reports; a breach lets them call the loan.<br>2. The takeover market: a bidder can buy a badly run firm by a tender offer to the shareholders and replace the CEO; the threat alone disciplines.",
        "1. Activist funds: they buy a stake in the firm, vote against the directors at the annual meeting and go public with their criticism of the CEO.<br>2. Proxy fights: shareholders nominate their own candidates for the board, solicit the other owners for their votes and replace the directors.",
        "1. The board: it monitors the CEO on behalf of the shareholders and makes sure the CEO always acts in their best interest, which is its main task.<br>2. Regulators: they make sure that listed firms and their CEOs follow the law at all times and that the shareholders are protected from abuse.",
        "1. Index funds: they hold the largest stakes in most listed firms, so they watch the CEO more closely than any other shareholder can.<br>2. Unhappy shareholders: they can sell their shares, which pushes the share price down and shows the CEO that they disagree with the strategy.",
      ],
      answer: 0,
      solution: `<p>The winning answer passes all three tests for both methods. Lenders are named and given tools: covenants, reporting duties and the right to call the loan. The takeover market is named with its tool (a tender offer that goes over the board's head) and its mechanism (the threat). One monitor sits inside the financing contract and the other outside the firm, so they are clearly distinct.</p><p>Each of the others fails at least one test: two versions of shareholder voice, monitors without tools, a weak monitor paired with an exit that is not monitoring.</p>`,
      check: `<p>Mark each method on two counts, who (named?) and with what (tools?). The winning answer scores on both counts for both methods. The activist pair counts as one method; the board and the regulators come without tools; index funds are weak monitors and selling is exit ✓.</p>`,
      traps: [
        null,
        "Two versions of one mechanism: voting, campaigning and proxy fights are all shareholder voice. The key wants two distinct monitors.",
        "Names monitors without tools. Say what the board can do (fire the CEO, set pay, approve big decisions) and how regulators act (disclosure rules, SOX certification, penalties).",
        "Index funds are weak monitors: no exit and a tiny budget per firm. Selling the shares is exit, not monitoring the CEO.",
      ],
    },
  ],
});
