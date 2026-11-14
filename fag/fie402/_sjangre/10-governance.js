/* sjanger 10 · governance · Governance and the verbal M&A questions */
window.EDU_DATA.sjangre.push({
  id: "governance",
  num: 10,
  title: "Governance and the verbal M&A questions",
  summary: "From the agency problem and its names to monitors, boards, pay, takeovers, payout and the SEO puzzle, ending with H2024 and H2025 Exercise 2",
  chapters: [27, 26, 16, 14],
  exam: "5 of 11 papers · H2024 E2, H2025 E2 (and H2024 E1)",
  intro: `<p>Every Kurbatov paper opens with two verbal theory questions worth about 12 points each. The second has been governance both times: H2024 Exercise 2 asked for two ways to monitor the CEO, who does it and with which tools; H2025 Exercise 2 asked for three actions open to a shareholder with 5–10%. In the wrap-up lecture Kurbatov said these questions can be answered with common sense but in the course's terms. His examples: why firms merge beyond synergies, an SEO that sends the price down 12% and the four ways to use free cash flow. The ladder gives you the terms one at a time (the names of the agency problems, the four tools, the monitors, the board, pay, shareholder action, entrenchment, regulation, stakeholders, merger motives, takeover defences, who gains, payout and the SEO) and ends with the two governance exercises themselves, where your job is to pick the answer that earns full marks or to find what an answer is missing.</p>`,
  steps: [
    {
      id: "governance-1",
      title: "The agency problem and the names of the misbehaviour",
      theory: `<p>In a perfect world everyone with a claim on the firm wants the same thing and the manager maximises its value. In a listed firm the owners and the people who run it are different people. The manager has motives of his own: pay, status, job security, an easy life. Corporate governance is the set of measures that narrow the gap. Kurbatov's list of what the gap produces (lecture 1, slide 29) gives you the names to use on the exam:</p>
<ul><li><b>Empire building</b>: inefficient acquisitions and projects that make the firm bigger, not more valuable.</li><li><b>Shirking</b>: low effort, too many outside activities.</li><li><b>Entrenchment</b>: making yourself hard to replace, including manipulating reports so that problems stay hidden.</li><li><b>Private benefits</b>: perks paid for by the firm, insider trading.</li></ul>
<p>The agency cost is the value destroyed, not what the manager gains: a perk that gives him 2 and costs the firm 10 destroys 10.</p>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A CEO with a large cash pile buys a ski resort, a regional airline and a football club in three years. The share price falls on each announcement. The deals make the firm bigger and him more prominent, while the market says they destroy value: <b>empire building</b>. Had he used the firm's jet for family holidays instead, that would be <b>private benefits</b>.</p></div>`,
      q: `<p>A CEO has run a listed firm for twelve years. He persuades the board to require a 75% vote to remove a director. He also stops reporting the results of the division he built, which has lost money for three years. Which name fits his behaviour best?</p>`,
      options: [
        "Empire building: he grows the firm beyond the size that maximises its value",
        "Shirking: he puts too little effort into running the firm well",
        "Entrenchment: he makes himself hard to replace and hides bad news",
        "Private benefits: he consumes the firm's resources for his own gain",
      ],
      answer: 2,
      solution: `<p>Both actions protect his job rather than the firm's value. The 75% rule makes it harder for the owners to change the board that could fire him. Hiding the losing division keeps from them the information that would justify firing him. Kurbatov lists exactly this pair together: <b>entrenchment and report manipulation</b>.</p>`,
      check: `<p>Test each name against the facts. Nothing is bought, so it is not empire building. Nothing in the facts suggests low effort or perks. What the two actions share is that they lower the chance that he is replaced ✓.</p>`,
      traps: [
        "The division was built earlier; the actions in the question buy nothing new. Empire building is about acquisitions and projects that grow the firm.",
        "Rewriting the voting rule and the reporting takes effort. The problem is not how hard he works but that he shields himself from removal.",
        null,
        "No firm resources go to his personal use. Perks and insider trading are private benefits; protecting his job is entrenchment.",
      ],
    },
    {
      id: "governance-2",
      title: "The four tools: monitoring, contracts, shareholder action and regulation",
      theory: `<p>Every governance measure tries to align the manager's interests with the owners'. Kurbatov sorts the measures into four tools (lecture 13, slide 3). Name the tool before you describe it: the exam rewards naming the mechanism.</p>
<ul><li><b>Better monitoring</b>: someone watches the manager and can act on what they see. The board, large shareholders, lenders, the takeover market.</li><li><b>Better contracts</b>: the manager's pay is designed so that his payoff moves with the owners'. Performance targets, shares and options, golden parachutes.</li><li><b>Shareholder action</b>: the owners use their votes. Voting against directors, items on the agenda, coordinated voting, activist campaigns, proxy contests.</li><li><b>Regulation</b>: the state sets and enforces rules. Disclosure, independent auditors, penalties for fraud and insider trading.</li></ul>
<p>Monitoring changes what the owners know about the manager and what they can do about it. A contract changes what the manager wants.</p>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Four measures at one firm. The board adds three directors with no ties to management: monitoring. The CEO's cash bonus is replaced by shares that vest over four years: a contract. A fund with 4% puts a proposal on the agenda of the annual meeting: shareholder action. The law requires the accounts to be checked by an independent auditor: regulation.</p></div>`,
      q: `<p>A firm's board replaces the CEO's fixed salary with restricted shares that vest over five years and are lost if he leaves early. Nothing else changes: the same board, the same owners, the same rules. Which of the four tools does this measure use?</p>`,
      options: [
        "Better contracts",
        "Better monitoring",
        "Shareholder action",
        "Regulation",
      ],
      answer: 0,
      solution: `<p>The measure changes what the CEO earns when the share price moves, so it changes what he <b>wants</b>: a <b>better contract</b>. Long vesting ties his wealth to value five years out. Losing the shares if he leaves makes walking away costly. The board decides it, but setting a contract is not monitoring: nobody watches him more closely than before.</p>`,
      check: `<p>Ask what is different the day after. The same people watch him with the same information (no change in monitoring), no owner has voted (no shareholder action) and no law has changed (no regulation). Only his payoff has changed ✓.</p>`,
      traps: [
        null,
        "The board designs the contract, but nobody observes or controls the CEO more than before. Monitoring changes who watches; this changes what he is paid for.",
        "No shareholder voted, proposed or campaigned. The board acted on its own.",
        "No law or regulator is involved. The firm chose the pay scheme itself.",
      ],
    },
    {
      id: "governance-3",
      title: "Who monitors the CEO and with which tools",
      theory: `<p>H2024 Exercise 2 asked for two ways of monitoring the CEO: <b>who</b> monitors and <b>which tools</b> they have. Kurbatov's list (lecture 13, slide 4, plus his key): the board; shareholders, especially big institutions; to a lesser degree lenders, employees and the authorities; and external monitoring by the takeover market.</p>
<table class="data"><tr><th>Monitor</th><th>Tools</th></tr>
<tr><td>Board</td><td>Hires and fires the CEO, sets pay, takes the major decisions, has the best access to reports and files</td></tr>
<tr><td>Large shareholders, institutions, activists</td><td>Request materials, put items on the ballot, vote, run activist campaigns and proxy fights</td></tr>
<tr><td>Lenders</td><td>Covenants, reporting requirements, the threat of not renewing the loan</td></tr>
<tr><td>Employees</td><td>See problems first and can blow the whistle</td></tr>
<tr><td>Authorities</td><td>Disclosure rules, fraud investigations, penalties</td></tr>
<tr><td>Takeover market</td><td>A badly run firm is cheap, so an acquirer buys it and installs better management</td></tr></table>
<p>Small dispersed shareholders rarely monitor: each would bear the whole cost and get only his small share of the gain. That is the free-rider problem.</p>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A bank lends to a firm on condition that debt stays below 3 times EBITDA and that it receives quarterly accounts. When the CEO proposes a debt-financed acquisition that would breach the limit, the bank can refuse to waive it. Monitor: the lender. Tools: the covenant and the reporting requirement.</p></div>`,
      q: `<p>Which pairing of a monitor with its tools is correct?</p>`,
      options: [
        "Lenders: they vote against the directors at the annual shareholders' meeting",
        "The board: it launches a hostile bid for the firm to replace the CEO",
        "Small dispersed shareholders: they check each large project in detail",
        "Large institutional holders: they vote their block and run proxy fights",
      ],
      answer: 3,
      solution: `<p>A shareholder with a large block gains enough from a better-run firm to make monitoring worth its cost. Its tools are the owners' tools: <b>votes, proposals, campaigns and proxy fights</b>. This is the second channel in Kurbatov's key to H2024 Exercise 2.</p>`,
      check: `<p>Ask of each pairing whether that monitor holds that tool. Lenders hold covenants, not votes. The board can fire the CEO directly and needs no bid; a hostile bid comes from outside. A small shareholder bears the whole cost of checking a project and gets a tiny share of the gain, so he free-rides ✓.</p>`,
      traps: [
        "Lenders have no votes at the shareholders' meeting. Their tools are covenants, reporting requirements and the threat of not renewing the loan.",
        "The board can fire the CEO itself. A hostile bid is external monitoring by the takeover market: an outside acquirer buys the firm and replaces management.",
        "The free-rider problem: a holder of 0.01% pays the whole cost of checking and gets 0.01% of the gain, so he does not monitor.",
        null,
      ],
    },
    {
      id: "governance-4",
      title: "The board: independence, captive boards and staggered terms",
      theory: `<p>The board hires the executives, sets their pay and takes the major decisions. Who picks the board? Mostly the board itself, which is the first problem (lecture 13, slide 5). Directors come in three kinds:</p>
<ul><li><b>Insiders</b>: executives of the firm, who report to the CEO.</li><li><b>Gray directors</b>: outsiders with ties to the firm, such as its lawyer, its banker or a former executive.</li><li><b>Independent directors</b>: no ties. They monitor best.</li></ul>
<p>Warning signs: a <b>captive board</b> that owes its seats to the CEO and approves what he proposes; the <b>CEO as chair</b>, who then runs the body that monitors him; a <b>staggered board</b> (a US arrangement) where only part of the seats is elected each year, so replacing a majority takes several annual meetings. Size matters too: a large board may be slow; directors who sit on many boards have less time to monitor.</p>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Six directors: the CEO as chair, the CFO, a retired partner of the firm's audit firm and three with no ties. Insiders: 2. Gray: 1. Independent: 3 of 6, not a majority. If two seats were elected each year, an activist who won every contested seat would hold 2 seats after one meeting and 4 of 6, a majority, after two.</p></div>`,
      q: `<p>A US-listed firm has nine directors. The CEO chairs the board and two other executives sit on it. One director is the firm's outside lawyer, who has billed the firm for fifteen years. Five directors have no ties to the firm. The board is staggered: three seats are elected each year for three-year terms. An activist holding 8% wants a board majority that will replace the CEO. Which statement is correct?</p>`,
      options: [
        "Six of the nine directors are independent, so the board is already well placed to monitor the CEO",
        "Even if the activist wins every contested seat, it needs two annual meetings to hold a majority",
        "Insiders hold four of the nine seats, so the CEO controls the board's decisions",
        "The staggered terms slow down a hostile bid, but they do not affect a proxy fight",
      ],
      answer: 1,
      solution: `<p>A majority of nine is five seats. Only three seats are up each year. Winning all three at the first meeting gives the activist 3 seats, short of 5; the second meeting brings it to 6. So it takes <b>two annual meetings</b>, which is what Kurbatov means when he says a staggered board makes incumbents much harder to replace.</p><p>The others, counted: insiders are the CEO and two executives, 3. The lawyer is gray, 1. Independent: 5 of 9, a bare majority, with the CEO in the chair.</p>`,
      check: `<p>3 insiders + 1 gray + 5 independent = 9 ✓. Seats after one meeting: 3 &lt; 5. After two: 6 ≥ 5 ✓.</p>`,
      traps: [
        "Counted the lawyer as independent. A director paid by the firm for fifteen years is gray: 5 of 9 are independent and the CEO chairs the board.",
        null,
        "Counted the lawyer as an insider. Insiders are the CEO and two executives, 3 of 9, short of control.",
        "A staggered board slows any change in the board majority, by vote or by bid. A proxy fight to replace directors runs into the same three-seats-a-year limit.",
      ],
    },
    {
      id: "governance-5",
      title: "Pay for performance: why targets make the manager short-sighted",
      theory: `<p>Is a perfect contract possible? Kurbatov's slide on pay (lecture 13, slide 7) lists the pieces: performance targets, stock-based pay, golden parachutes. Each helps and each can backfire. Pay tied to the share price over many years aligns the CEO with the owners. Pay tied to a short-term number, a KPI such as this year's earnings per share (EPS), invites him to move the number rather than the value. The classic case is a buyback paid with cash: it raises EPS whenever the earnings yield is above the interest the cash earned, while under MM the share price does not move.</p>
<div class="formula"><div class="eq">EPS after = (Earnings − r × Cash)/(N − Cash/P)</div>
<div class="where">Cash is the amount spent on the buyback, r the rate it earned, N the number of shares before and P the price paid per share. No taxes. Under MM the price after the buyback is still P: the owners are no richer even though EPS rose.</div></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Earnings 300, of which 20 is interest on cash of 500 at 4%. N = 100 shares at P = 40, so EPS = 3.00. The CEO's bonus pays out if EPS reaches 3.20.</p><p>He spends the 500 on a buyback: 500/40 = 12.5 shares. Earnings 300 − 20 = 280 over 87.5 shares: EPS = 3.20. The bonus is paid. Equity value 4 000 − 500 = 3 500 over 87.5 shares = 40: the price has not moved.</p></div>`,
      q: `<p>A firm earns 600 a year, of which 60 is interest on cash of 1 200 at 5%. It has 250 shares at a price of 40. There are no taxes and markets are perfect. The CEO uses all the cash to buy back shares at 40. What is EPS after the buyback? Give four decimals.</p>`,
      options: ["2.7273", "2.4545", "2.4000", "2.1600"],
      answer: 1,
      solution: `<p>Shares bought: 1 200/40 = 30, so 250 − 30 = 220 remain.</p><p>Earnings lose the interest on the cash: 600 − 0.05 × 1 200 = 600 − 60 = 540.</p><p>EPS = 540/220 = <b>2.4545</b>, up from 600/250 = 2.4000.</p><p>The price stays at 40: equity was 250 × 40 = 10 000, the firm paid out 1 200 and 8 800/220 = 40. EPS rose 2.27% while the owners gained nothing. A bonus on an EPS target pays the CEO for a move that creates no value. It can also make him prefer such moves to a long-term project that would lower this year's EPS.</p>`,
      check: `<p>EPS rises because the earnings yield, 600/10 000 = 6%, is above the 5% the cash earned. Had the cash earned 6%, the lost interest would be 72 and EPS = 528/220 = 2.4000, unchanged ✓.</p>`,
      traps: [
        "Forgot that the cash stops earning interest once it is spent: 600/220 = 2.7273.",
        null,
        "Assumed EPS cannot change because value does not change under MM. The price stays at 40, but EPS rises.",
        "Took out the interest but kept 250 shares: 540/250 = 2.1600.",
      ],
    },
    {
      id: "governance-6",
      title: "Shareholder action, the free-rider problem and proxy advisers",
      theory: `<p>When the board does not act, the owners can (lecture 13, slide 8): vote no on directors or pay, put items on the agenda of the annual meeting, coordinate their votes, run an activist campaign or a proxy contest with their own candidates for the board. Each costs money and time, while the gain goes to all owners. So only a holder with a large enough stake acts:</p>
<div class="formula"><div class="eq">act if α × ΔV &gt; C</div>
<div class="where">α is the fraction of the shares you own, ΔV the increase in firm value the action would bring and C its cost to you.</div></div>
<p>Most institutions hold hundreds of firms and cannot study every ballot. They buy research and voting recommendations from <b>proxy advisers</b> such as ISS and Glass Lewis. Many simply follow them (slide 9). Kurbatov asks whether that is optimal: it is cheap, but one standard policy then decides votes at thousands of firms, whatever the facts at each.</p>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A campaign to replace a weak CEO would raise firm value by 200 and cost 6. A fund with 5% gains 0.05 × 200 = 10 &gt; 6 and acts. A holder of 1% gains 2 &lt; 6 and free-rides. The voting data Kurbatov showed (Broadridge, 2024 season) fit the picture: retail investors held 31.7% of the shares but voted only 29.8% of them. Directors received 91.2% support on average.</p></div>`,
      q: `<p>A pension fund owns shares in 3 000 listed firms. At each annual meeting it votes as ISS recommends. What is the best description of this practice?</p>`,
      options: [
        "ISS holds large stakes itself, so its own votes decide most director elections",
        "The fund saves little, since retail investors cast most of the votes anyway",
        "It solves the free-rider problem, since ISS bears the cost of a proxy fight",
        "Cheap voting at thousands of firms, but one standard policy replaces local judgment",
      ],
      answer: 3,
      solution: `<p>The fund holds small stakes in very many firms, so studying every ballot would cost more than its share of the gain: α × ΔV &lt; C at each firm. Buying a recommendation spreads the cost of research over all of the adviser's clients. The price is that the vote follows one standard policy rather than the facts at each firm. Many funds following the same adviser also give it influence without ownership. That is Kurbatov's question whether it is optimal.</p>`,
      check: `<p>ISS distributes materials and issues recommendations; it does not own the shares or vote them. Retail investors voted only about 30% of their shares in 2024, so the institutions' votes carry most elections. The advice behind those votes matters for the same reason ✓.</p>`,
      traps: [
        "Proxy advisers own no stakes. They sell research and recommendations; the votes are cast by the funds that follow them.",
        "Retail investors voted only 29.8% of their shares in 2024. Institutions cast most votes, which is why their advisers matter.",
        "ISS recommends; it does not run campaigns or proxy fights. The fund still bears none of the cost of acting, so the free-rider problem remains.",
        null,
      ],
    },
    {
      id: "governance-7",
      title: "Entrenchment and the cost of monitoring too hard",
      theory: `<p>Managers resist being monitored (lecture 13, slide 15). They adopt anti-takeover provisions that block external monitoring, protect a friendly board with staggered terms and negotiate golden parachutes. Each makes them harder to remove: <b>entrenchment</b>. The cure is not maximal control. Kurbatov's trade-off: "a manager who is monitored too strongly will be too passive". A CEO who is second-guessed on every decision and fired after one bad outcome avoids risky projects, even those with positive NPV, because he carries the blame for a failure and gets little of the gain. Good governance picks a point between freedom for the manager and tight control (slide 18).</p>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A project costs 100 and pays 300 or 0 with equal probability: NPV = 0.5 × 300 − 100 = 50 (no discounting). Under a board that fires the CEO after a loss, he loses his job with probability 0.5. If the job is worth more to him than his share of the 50, he turns the project down and the owners lose 50.</p></div>`,
      q: `<p>A new board requires its approval for every project above a small limit and announces that it will replace the CEO after a quarter with a loss. What is the most likely effect on the firm?</p>`,
      options: [
        "He passes up risky positive-NPV projects, since one visible loss costs him his job",
        "The CEO works harder, since more monitoring brings more effort and more value",
        "Value rises, since the board now captures the private benefits the CEO enjoyed",
        "Little changes, since a closely watched CEO already acts for the owners",
      ],
      answer: 0,
      solution: `<p>The rule punishes a visible failure hard and rewards success little. A risky project with positive NPV can lose money in some quarter. The CEO now carries that risk with his job while the owners keep the gain. He chooses safe, low-value projects instead: the passivity Kurbatov warns about. Tighter control buys less shirking at the cost of less risk-taking, so past some point it lowers value.</p>`,
      check: `<p>Run the example: a project with NPV 50 and a 50% chance of a loss is rejected by a CEO who loses his job on a loss. The owners lose 50 of value, so the rule destroys value even though it may reduce shirking ✓.</p>`,
      traps: [
        null,
        "Assumed effort keeps rising with monitoring. Past some point the CEO protects himself by taking less risk. Value falls.",
        "The rule does not target perks; it targets losses. Losses from good risky projects are what the CEO now avoids.",
        "Monitoring changes behaviour; that is its purpose. Here it changes it in the wrong direction, towards safe projects.",
      ],
    },
    {
      id: "governance-8",
      title: "Regulation: Sarbanes-Oxley and Dodd-Frank",
      theory: `<p>The state can make monitoring easier by law (lecture 13, slide 17). Kurbatov's US history: the Insider Trading Sanctions Act of 1984 focused on punishing insiders. In the early 2000s came a wave of managerial abuse and fraud, with Enron as the landmark case ($11 billion in shareholder losses). The response came in two acts:</p>
<ul><li><b>Sarbanes-Oxley (SOX, 2002)</b>: independent auditors, enhanced disclosure and corporate responsibility, meaning that top executives answer personally for the accounts.</li><li><b>Dodd-Frank (2010)</b>: many provisions for financial stability and, for governance, independent compensation committees and a legal basis for letting large shareholders nominate directors (proxy access). That last point is simplified: Dodd-Frank gave the SEC the power to write the rule, a court struck the SEC's rule down in 2011 and proxy access later spread firm by firm through shareholder proposals.</li></ul>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Enron hid debt in entities off its balance sheet while its auditor also earned large consulting fees from it. SOX attacks both sides: the auditor must be independent of the firm it audits. The CEO and CFO certify the accounts personally.</p></div>`,
      q: `<p>Which pairing of each act with its governance provisions is correct?</p>`,
      options: [
        "SOX: independent pay committees, board nominations by large holders. Dodd-Frank: independent auditors, more disclosure",
        "SOX: penalties for insider trading. Dodd-Frank: independent auditors, more disclosure",
        "SOX: independent auditors, more disclosure. Dodd-Frank: independent pay committees, nominations by large holders",
        "SOX: independent auditors, more disclosure. Dodd-Frank: penalties for insider trading",
      ],
      answer: 2,
      solution: `<p>SOX answered the accounting frauds of the early 2000s, so it targets the numbers: <b>independent auditors, enhanced disclosure and personal responsibility for the accounts</b>. Dodd-Frank came after the financial crisis and, among many stability rules, strengthened shareholders against the board: <b>independent compensation committees and a legal basis for board nominations by large shareholders</b>.</p>`,
      check: `<p>Dates: the act built around insider-trading penalties came in 1984, long before either act. The order of the problems, fraud first and the financial crisis second, matches the order of the acts ✓.</p>`,
      traps: [
        "Swapped the two acts. Auditors and disclosure are SOX, the response to Enron; pay committees and nominations are Dodd-Frank.",
        "Insider-trading penalties were the focus of the 1984 Sanctions Act. SOX raised some penalties too, but its core is auditors and disclosure, which belong to SOX, not Dodd-Frank.",
        null,
        "Gave Dodd-Frank the insider-trading focus of the 1984 act. Its governance provisions are pay committees and nominations by large holders.",
      ],
    },
    {
      id: "governance-9",
      title: "Shareholders or stakeholders?",
      theory: `<p>Most governance measures make managers accountable. To whom? Mostly to shareholders. The <b>stakeholder view</b> says the firm should also weigh employees, communities, customers and suppliers. Milton Friedman (1970) argued that a manager who spends on "social responsibility" spends the owners' money on goals they did not choose; the owners can support causes themselves. Kurbatov's criticism of the stakeholder view: <b>too many missions, conflicting interests</b>, so a manager who answers to everyone can justify any choice. The debate is open and culture plays a role (lecture 1, slides 31–32). The Stanford survey of 209 CEOs and CFOs (2019): 89% say stakeholder interests are important in their planning, 23% say shareholder interests are significantly more important. Employees are seen as the most important stakeholders.</p>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A CEO spends 50 of the firm's money on a sponsorship he likes and calls it CSR (corporate social responsibility). If it raises sales by more than 50 in present value, it is ordinary marketing that creates value. Both views approve. If it does not, Friedman would say the CEO taxed the owners for his own preference. The stakeholder critique would add that the CSR label makes him hard to hold to account.</p></div>`,
      q: `<p>A CEO keeps an unprofitable plant open to protect local jobs. The owners lose 30 in present value. Which statement applies Friedman's argument correctly?</p>`,
      options: [
        "It is justified, since the Stanford survey shows that 89% of CEOs see stakeholders as important",
        "It is part of his duty, since Friedman counts social responsibility as part of the job",
        "It is justified if the employees at the plant outnumber the firm's shareholders",
        "He spends the owners' 30 on a goal they did not choose; they could fund it themselves",
      ],
      answer: 3,
      solution: `<p>Friedman's point is about whose money is spent. The 30 belongs to the shareholders. The CEO is their agent. Spending it on a social goal is a decision the owners can make for themselves, with their own money, if they share the goal. The survey describes what CEOs believe; it does not settle whose money it is.</p>`,
      check: `<p>The stakeholder critique reaches the same place from another side: with jobs as a second mission, the owners cannot tell a social choice from a bad decision. Neither argument depends on how many people are affected ✓.</p>`,
      traps: [
        "Took a survey of what CEOs believe as an argument for what they should do. The survey says nothing about whose money it is.",
        "Reversed Friedman: he argued that the manager's responsibility is to the owners. Spending their money on social goals is not his decision.",
        "Counted heads. Friedman's argument is about who owns the money, not how many people are affected.",
        null,
      ],
    },
    {
      id: "governance-10",
      title: "Why firms merge: synergies and the other motives",
      theory: `<p>Kurbatov's list of merger motives (lecture 12, slide 4): economies of scale and scope, supply chain optimisation, complementary goods, industry consolidation and market power, changes in corporate control, EPS manipulation and manager ambitions. The first three are <b>synergies</b> in the narrow sense: the combined firm produces more or at lower cost than the two apart. H2024 Exercise 1 banned "synergies" as an answer, yet the key accepted economies of scale and supply-chain gains when they were explained: name the specific source, not the word. Mergers also have costs: integration can damage the corporate culture or a unique management vision. Long-term plans can also be bent towards immediate returns.</p>
<div class="formula"><div class="eq">(A + T + S) − (A + T) = S</div>
<div class="where">A and T are the acquirer's and the target's values before the deal and S the synergy (lecture 12, slide 13). The economic gain from the merger is S. A motive that adds no S can still raise a number such as EPS.</div></div>`,
      example: `<div class="worked"><span class="wh">Example: EPS manipulation</span><p>Acquirer: earnings 100, 100 shares at 20 (P/E 20). Target: earnings 50, value 500 (P/E 10). The acquirer issues 500/20 = 25 shares to pay. With no synergy, combined earnings of 150 over 125 shares give EPS 1.20, up from 1.00. Combined value 2 000 + 500 = 2 500 over 125 shares: still 20 per share. EPS rose 20% and nobody is richer; the P/E fell from 20 to 16.67.</p></div>`,
      q: `<p>Which merger motive creates no value for anyone, not even at someone else's expense?</p>`,
      options: [
        "Economies of scale: spreading fixed costs over more output cuts the cost per unit",
        "EPS manipulation: buying a firm with a lower P/E lifts the combined earnings per share",
        "Change of control: new managers raise the profit margin on the target's assets",
        "Market power: with fewer rivals the merged firm can raise its prices",
      ],
      answer: 1,
      solution: `<p>Buying a firm with a lower P/E than your own raises combined EPS by arithmetic alone: you issue a few expensive shares for a lot of cheap earnings. Value per share does not change, so the higher EPS is matched by a lower P/E. That is <b>EPS manipulation</b>, also called bootstrapping.</p>`,
      check: `<p>For each motive, ask who gains. Economies of scale lower costs: S &gt; 0. Better management raises the cash flows from the target's assets. Market power raises profits at the customers' expense: a gain for shareholders, a loss for others. EPS manipulation gains nobody: 2 500/125 = 20 per share before and after ✓.</p>`,
      traps: [
        "Economies of scale lower costs and create real value. It is a synergy. The H2024 key accepted it when explained.",
        null,
        "Better management raises the cash flows from the target's assets: a real gain from a change of control, not a cosmetic number.",
        "Market power raises profits. The gain is real for shareholders even though customers pay for it.",
      ],
    },
    {
      id: "governance-11",
      title: "Hostile takeovers, defences and the threat of a bid",
      theory: `<p>A hostile bidder goes over the board's head and offers to buy the shares directly. Kurbatov's two sides (lecture 12, slide 11): a takeover can bring new management and new ideas. <b>Even the threat</b> of one disciplines current managers, because a badly run firm is cheap to buy. But a takeover can also disrupt operations and endanger soft assets such as the corporate culture. The threat can also push managers to entrench themselves with defences (slide 29): poison pills, staggered boards and supermajority rules in the charter; scorched earth, selling or destroying the asset the bidder wants; a white knight, a friendlier bidder; greenmail, buying back the raider's block at a premium; regulatory barriers; golden parachutes. The charter defences are features of US firms. The key question: does a defence raise value by letting the board bargain for a higher price, or does it protect the managers?</p>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A bidder offers 50 for a target trading at 40. The board adopts a poison pill, negotiates and recommends a revised offer of 56. The pill won the target's owners 6 a share: bargaining. Had the board kept the pill and refused every offer, the owners would have lost the premium of 10 on the table: entrenchment.</p></div>`,
      q: `<p>A US firm receives a bid at a 30% premium. Which response points to entrenchment rather than bargaining for a better price?</p>`,
      options: [
        "The board uses a poison pill to make the bidder raise its offer, then recommends the higher bid",
        "The board invites a white knight, a second bidder who pays more than the first",
        "The board refuses to talk, adds a staggered board and the share price falls on the news",
        "The board delays its recommendation by two weeks to get an outside opinion on the price",
      ],
      answer: 2,
      solution: `<p>A defence serves the owners when it gets them a better deal and serves the managers when it removes the deal. Refusing to talk and adding a staggered board removes this bid and weakens the threat of the next one; the falling price is the market's verdict that the owners lost the premium. That is <b>entrenchment</b>.</p>`,
      check: `<p>Ask what the owners end up with. A higher bid or a rival bid: more than 30%. A short delay for an outside opinion: the same bid, better informed. Refusal plus a new defence: no premium and a lower price ✓.</p>`,
      traps: [
        "A pill used to extract a higher price that the board then accepts is the bargaining case: the owners get more.",
        "A white knight who pays more gives the owners a better price. That is bargaining, even though the first bidder loses.",
        null,
        "A short delay to check the price is ordinary diligence. The bid stays on the table.",
      ],
    },
    {
      id: "governance-12",
      title: "Who gains from a merger and what paying in shares signals",
      theory: `<p>Announcement returns tell you who gains (lecture 12, slide 12): targets earn about <b>15%</b> abnormal return on average, acquirers about <b>1%</b> on average and a negative return in about half the cases. The two combined earn about <b>1–3%</b>, mostly positive. So mergers usually create value, most of it going to the target's shareholders. The premium offered over the market price, often 20–40%, is a different number from the abnormal return; keep them apart.</p>
<p>How the acquirer pays matters too (slides 24–25): time pressure, the acquirer's liquidity and debt capacity, who has better information, uncertainty about the synergies, the sellers' need for cash and their taxes. In a stock swap the target's owners receive a fraction y of the combined firm, so the acquirer's true cost is y(A + T + S) − T. The ratio y is set at market prices, so if the market overprices the acquirer, its true A is lower than the price says and the true cost falls. An acquirer that thinks its shares are overvalued prefers to pay in stock and one that thinks they are cheap pays cash. Investors know this, so the choice reveals information.</p>`,
      example: `<div class="worked"><span class="wh">Example</span><p>Acquirer worth 6 000, target worth 1 500. On the announcement the target rises 16% and the acquirer falls 0.5%. Target gain: 0.16 × 1 500 = 240. Acquirer loss: 0.005 × 6 000 = 30. Combined: 210 on 7 500, or 2.80%. Value is created; the target's owners get more than all of it.</p></div>`,
      q: `<p>An acquirer worth 9 000 announces that it will buy a target worth 3 000 and pay entirely in its own shares. On the announcement the target's price rises 18% and the acquirer's falls 2%. Which statement is consistent with the course?</p>`,
      options: [
        "Combined value rose 3.00%; paying in stock hints the acquirer sees its shares as overvalued",
        "Combined value fell, since the acquirer's 2% loss is on a firm three times the target's size",
        "The deal destroys value because the acquirer's price fell; the payment method is beside the point",
        "Combined value rose 16.00%; paying in shares signals that the acquirer sees its shares as cheap",
      ],
      answer: 0,
      solution: `<p>Weight the returns by value. Target: 0.18 × 3 000 = +540. Acquirer: −0.02 × 9 000 = −180. Combined: +360 on 12 000 = <b>+3.00%</b>, at the top of Kurbatov's 1–3% range, with the target's owners taking more than all of it. The acquirer's fall fits the stock payment: a swap is cheapest for an acquirer whose shares are overpriced, so investors read a stock offer as a hint that they are and mark the shares down.</p>`,
      check: `<p>The pattern, a large gain for the target, a small loss for the acquirer and a small positive total, is the typical one on slide 12. Three times the size at 2% is 6% of the target's value, well below its 18% gain, so the total must rise ✓.</p>`,
      traps: [
        null,
        "The acquirer's loss of 180 is smaller than the target's gain of 540, even though the acquirer is three times as big. Weight by value before you compare.",
        "The acquirer's return is not the deal's value: weighted, the total is +360. And the choice of payment does carry information.",
        "Added the percentages, 18% − 2% = 16%, without weighting them. The signal is also reversed: an acquirer that thinks its shares are cheap pays cash.",
      ],
    },
    {
      id: "governance-13",
      title: "Four ways to use free cash flow",
      theory: `<p>A firm with free cash flow has four choices (lecture 14, slide 14): pay a <b>dividend</b>, <b>buy back</b> shares, <b>hold</b> the cash or <b>reinvest</b> it. In a perfect market the choice is irrelevant. In practice each has a governance side. Holding cash avoids the cost of raising capital, makes distress less likely and avoids the costs of asymmetric information, but it gives no tax advantage and makes it harder to keep the manager disciplined. Reinvesting sounds good, but without positive-NPV projects it becomes <b>empire building</b>. Dividends are <b>sticky</b>: managers smooth them and are reluctant to cut them, so a dividend is a commitment and a cut is punished. A buyback is flexible and can <b>signal</b> that management thinks the shares are undervalued (lecture 5, slides 20–24). Kurbatov named this topic as a possible theory question in the wrap-up.</p>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A firm earns a one-off windfall of 200 on top of its usual 100 a year. Raising the dividend from 100 to 300 would commit it to a level it cannot keep; the later cut would be read as bad news. A buyback of 200 pays the windfall out once. Investors may read it as a sign that the shares are cheap.</p></div>`,
      q: `<p>A mature firm generates 400 of free cash flow a year and has no projects with positive NPV. Its CEO, who owns 0.2% of the shares, wants to "reinvest all of it to grow". Which statement is right?</p>`,
      options: [
        "Paying it out is best: without positive-NPV projects, reinvesting is empire building",
        "Reinvesting is best, since cash kept inside the firm saves the cost of raising capital later",
        "Holding the cash is best, since a cash buffer makes financial distress less likely",
        "Under MM the use of cash is irrelevant, so the CEO's plan leaves firm value unchanged",
      ],
      answer: 0,
      solution: `<p>With no positive-NPV projects, every reinvestment has negative NPV, so "growth" here means a bigger firm that is worth less: <b>empire building</b>, the use Kurbatov flagged. A dividend or a buyback takes the cash out of the manager's hands. With 0.2% of the shares the CEO bears almost none of the loss while he gains the size: the agency problem in miniature.</p>`,
      check: `<p>MM's irrelevance holds the investment policy fixed: it compares ways of paying out, not paying out against wasting the money. Holding the cash is not free either: no tax advantage and less discipline ✓.</p>`,
      traps: [
        null,
        "Saving future issue costs is a real benefit of retention, but it cannot justify investing now in projects with negative NPV.",
        "A buffer does lower distress risk, but cash brings no tax advantage and weakens the manager's discipline, the very problem in this firm.",
        "MM's payout irrelevance assumes the investment policy is fixed. Spending the cash on negative-NPV projects destroys value.",
      ],
    },
    {
      id: "governance-14",
      title: "Exam level: an equity issue and a 12% fall in the share price",
      theory: `<p>Kurbatov's own example of a theory question: the firm announces a seasoned equity offering (SEO) and its share price falls 12%. What are the potential reasons? What would have been better? About five sentences. The course gives you the pieces:</p>
<ul><li><b>Asymmetric information</b>: managers know more than investors and prefer to issue equity when they think the shares are overvalued. An issue is a signal. Investors mark the price down (lecture 6, slides 33–37).</li><li><b>Pecking order</b>: internal cash first, then debt, then equity. Choosing equity also tells investors that the cheaper sources were not available, for instance no spare debt capacity.</li><li><b>Agency</b>: fresh cash in the hands of a manager with no good projects invites empire building.</li><li><b>Issue costs</b>: fees of a few per cent of the money raised (Kurbatov quotes 5.3% + 1.7% for a US IPO), small relative to the value of the whole firm.</li></ul>
<p>Better alternatives: retained earnings or debt, or a rights offer to the existing shareholders, which costs less and is underpriced less (slide 31).</p>`,
      example: `<div class="worked"><span class="wh">Example: Kurbatov's numbers</span><p>A firm is worth 140 or 40 with equal probability. It can invest 8 today to get 10 tomorrow. Outsiders value it at 100 after the investment, so selling 8% raises 8. If insiders know it is worth 140, the old shareholders get 0.92 × 150 = 138 &lt; 140, so they would not issue. If it is worth 40, they get 0.92 × 50 = 46 &gt; 40: they issue. The firm that wants to issue is the overvalued one, so an issue is bad news.</p></div>`,
      q: `<p>Your firm announces an SEO and its share price falls 12%. Which five-sentence answer to "what are the potential reasons and what would have been better?" earns full marks?</p>`,
      options: [
        "The new shares dilute the old ones: the same earnings are shared by more shares, so each is worth less. The firm should have split the issue into several smaller ones over time.",
        "Investors suspect that managers issue because they see the shares as overvalued and that the firm lacks cheaper funding. The fresh cash may also be wasted on poor projects.",
        "Investors infer that managers issue because the shares are overpriced and that cheaper funds ran out. Better: use retained cash, then debt, or a rights offer.",
        "The bank's fees of about 7% of the proceeds explain the fall. The firm should have issued more shares in one go, so that the fixed fees were spread over a larger amount.",
      ],
      answer: 2,
      solution: `<p>The question has two parts. A full answer does both. The reasons: <b>adverse selection</b> (managers issue when the shares are overpriced, so investors lower the price) and what choosing equity says about the alternatives (no spare cash or debt capacity), possibly with agency (cash for a manager with no good projects). The alternative: <b>follow the pecking order</b>, internal funds and then debt, or use a rights offer. The answer that gives sound reasons and stops there loses about half the points.</p>`,
      check: `<p>Size test for the fee story: fees of 7% on an issue worth 20% of the firm cost about 0.07 × 20% = 1.4% of firm value, far below 12%. The fall is about information, not fees ✓.</p>`,
      traps: [
        "The dilution fallacy: new shares sold at a fair price bring in cash worth what they cost, so they do not dilute value. Splitting the issue changes nothing.",
        "Good reasons, but the question also asks what would have been better. Without an alternative, half the answer is missing.",
        null,
        "Fees are a few per cent of the money raised, a small fraction of firm value. And a larger equity issue makes the signal worse, not better.",
      ],
    },
    {
      id: "governance-15",
      title: "Exam level: two ways to monitor the CEO, who and with what",
      theory: `<p>H2024 Exercise 2 (12 points): select and describe two distinct ways of monitoring the CEO, explain who monitors and which tools they have, 3–4 sentences per method. Kurbatov's key lists four channels: the <b>board</b> (takes the key decisions including hiring and firing the CEO and has the best access to reports and files; independent directors monitor best); <b>shareholders</b> (request materials, submit items to the ballot and, if ignored, start activist campaigns and proxy fights); the <b>government</b> (legislation and monitoring systems such as anti-fraud services); <b>external monitoring</b> (a badly performing firm can be bought by a competitor who installs better management). Two groups described in enough detail earn full points. Three things lose points: two methods that are really one (the board and its pay committee), a method without its monitor or its tools and a general essay on governance.</p>`,
      example: `<div class="worked"><span class="wh">Example: one method in full detail</span><p><b>Lenders.</b> Banks and bondholders monitor because they lose if the firm fails. Their tools are covenants (limits on debt, payouts and asset sales), regular financial reports and the threat of not renewing the loan. A CEO who wants a risky acquisition must first persuade the lender to waive the covenant.</p></div>`,
      q: `<p>Which answer to H2024 Exercise 2 would earn full marks?</p>`,
      options: [
        "1. The board: it is elected by the shareholders and monitors the CEO on their behalf, which is central to good governance in any listed firm. 2. The board's pay committee: it sets the CEO's pay so that he works harder.",
        "1. Shareholders: if they are unhappy with the CEO, they can sell their shares. 2. Norwegian company law: under the ASA rules the general meeting can remove the directors.",
        "1. Corporate governance aligns managers with shareholders through monitoring, contracts and regulation. 2. Monitoring matters because of the agency problem between owners and managers.",
        "1. The board, via its independent directors: hires and fires the CEO, sets his pay, sees internal reports. 2. Large shareholders: request materials, file ballot items, run campaigns and proxy fights.",
      ],
      answer: 3,
      solution: `<p>The winning answer names two distinct monitors and gives each its tools, which is what the key asks: the board (independent directors, hiring and firing, pay, access to reports) and large shareholders (materials, ballot items, campaigns, proxy fights). The board and its pay committee count as one method. Saying that the board "monitors" names no tool. A general paragraph on governance answers a question that was not asked. Selling shares is exit, not monitoring the CEO. The exercise names no country, so one country's company law is beside the point.</p>`,
      check: `<p>Run the key's two tests on each method: is the monitor named? Are its tools named? The winning answer passes both tests for both methods; each of the others fails at least one ✓.</p>`,
      traps: [
        "The board and its pay committee are one method. The first item also names no tools. The key wants two distinct groups described in detail.",
        "Selling the shares is exit, not monitoring the CEO. The exercise names no jurisdiction either. Neither item describes a monitor with its tools.",
        "A general account of governance names no monitor and no tools. It answers a question that was not asked.",
        null,
      ],
    },
    {
      id: "governance-16",
      title: "Exam level: three actions for a shareholder with 5–10%",
      theory: `<p>H2025 Exercise 2 (12 points): you hold 5–10% of a firm whose management exerts low effort and enjoys private benefits; select three actions, 2–3 sentences each, 4 points each. Kurbatov's key accepts any reasonable action with an explanation, for example active monitoring, an activist campaign, making the board more independent by replacing insider directors, a better pay contract, voting or pressing to fire the manager, an LBO that replaces the manager, finding an acquirer that would save the firm, or legal action if there is good evidence of misbehaviour. As a bonus for creativity it also accepts exiting by selling the shares. A full-mark action says <b>what</b> you do, <b>through which channel</b> and <b>why it changes the manager's behaviour</b>. It also uses the size of your stake: large enough to make acting worth its cost, too small to decide alone.</p>`,
      example: `<div class="worked"><span class="wh">Example: one action in full detail</span><p><b>A pay contract with long-term shares.</b> Through the compensation committee, or by voting down the current pay plan, I push for restricted shares that vest over several years. The CEO's wealth then moves with firm value, so shirking and perks cost him personally. With 5–10% my vote carries weight in the pay vote, more so with support from other institutions.</p></div>`,
      q: `<p>A student answers H2025 Exercise 2 as follows.</p><p>"1. I vote against re-electing the directors at the annual meeting, because they have let management shirk. With 5–10% my votes carry weight. I can also persuade other institutions to vote the same way.</p><p>2. I run a proxy fight: I nominate my own candidates for the board and ask the other shareholders to vote for them. A new board can then replace the CEO.</p><p>3. I write a letter to the CEO asking him to work harder and cut his perks. He will see that a large shareholder is watching."</p><p>What is the main weakness of the answer?</p>`,
      options: [
        "It cites no Norwegian company law, which the key expects in governance answers",
        "The first two actions overlap heavily; the letter has no tool behind it",
        "It leaves out selling the shares, which the key expects as one of the three",
        "Three actions are one too many; the key gives full marks for two explained ones",
      ],
      answer: 1,
      solution: `<p>Each action is explained and the stake is used, so the answer is not weak on form. Its weaknesses are two. Voting against the directors and running a proxy fight to replace them both aim at the same result, a new board through the shareholder vote, so a grader may read them as one action. And the letter has no tool behind it: nothing in it changes what the CEO earns or risks, so "he will see" is hope, not a mechanism. Fix both: keep one of the voting actions and add a channel with teeth, for example a pay contract with long-vesting shares or replacing insider directors with independent ones.</p>`,
      check: `<p>The key accepts any reasonable action with an explanation, so how many points the overlap costs depends on the grader; the letter is the clearer weakness, since it explains no mechanism. Three plainly distinct channels, each explained, remove both risks and leave nothing for the grader to discount ✓.</p>`,
      traps: [
        "The exercise names no country. Answer in general terms and bring in national company law only when the exercise says the firm is, for example, a Norwegian ASA.",
        null,
        "Exit is a bonus for creativity in the key, not a requirement. Three well-explained actions earn full marks without it.",
        "The exercise asks for three actions at 4 points each. Two actions can earn at most 8 of 12.",
      ],
    },
  ],
});
