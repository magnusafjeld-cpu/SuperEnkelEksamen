/* sjanger 114 · d3-eierverktoy · The owner's toolkit: pay, voice and defences */
window.EDU_DATA.sjangre.push({
  id: "d3-eierverktoy",
  num: 114,
  seksjon: "del3",
  emne: "Governance",
  symboler: "governance",
  title: "The owner's toolkit: pay, voice and defences",
  summary: "Pay for performance, shareholder voice, what a 5–10% holder can do, the poison pill in numbers and when protecting a manager helps, ending with Kurbatov's owner template",
  chapters: [27],
  exam: "H2025 E2 (12 points, verbal) · Mock exams 2, 3, 4, 7, 9, 10 and 12, E2",
  intro: `<p>Kurbatov expects governance in one of the two theory questions and "probably" from a new angle. H2025 Exercise 2 asked what a holder of 5–10% can do about a shirking CEO: three actions at 4 points each. In class Kurbatov tried a new template and graded the answers live: you are the owner, so choose three measures that make the manager act in your interest "but not scare them too much". The ladder takes the tools one at a time: pay, voice, the block holder's actions, the takeover defences with the poison pill in numbers and the cases where protecting a manager helps. It ends by grading an answer to the new template.</p>`,
  steps: [
    {
      id: "d3-eierverktoy-1",
      title: "Pay for performance: the CEO maximises what you measure",
      theory: `<p>A contract changes what the CEO wants. Pay that moves with long-run firm value aligns the CEO with the owners. Pay tied to a number that can move without value moving invites the CEO to move the number. Kurbatov's points (lecture 13):</p>
<ul><li><b>EPS targets</b> make the manager short-sighted: a buyback or a cut in R&amp;D lifts this year's EPS without creating value.</li><li><b>Shares with long vesting</b> tie the CEO's wealth to value years ahead, but load firm-specific risk on a manager who cannot diversify, which can make the manager cautious. <b>Options</b> reward the upside only and can push towards too much risk.</li><li><b>ESG-based pay</b> is "much less abusable than, let's say, EPS". Long-term metrics are possible but harder to set.</li><li><b>Golden parachutes</b> pay the CEO who loses the job. In an R&amp;D-heavy firm with high-risk, high-reward projects they make sure the CEO "will not be afraid to take those risks". Set too generously, they reward failure.</li></ul>
<div class="callout tip"><span class="h">Intuition</span><p>Pay is a measuring stick and the CEO will grow whatever it measures. Measure something only real value moves. Then soften the personal downside of the risks you want taken.</p></div>`,
      example: `<div class="worked"><span class="wh">Example: hitting an EPS target</span><p>A bonus pays if EPS reaches 3.00. EPS is heading for 2.90. The firm has idle cash that earns nothing and uses it to buy back 4% of the shares. Same earnings over fewer shares: EPS = 2.90/0.96 = 3.0208. The bonus is paid, while under MM the share price does not move.</p></div>`,
      q: `<p>Kvernes Biotech is ten years into developing new drugs. Most trials fail, but a success is worth many times its cost. The board wants a CEO contract that keeps the CEO working for the owners and willing to start bold trials. Which design fits best?</p>`,
      options: [
        "An annual bonus on EPS: earnings are easy to measure and audited, so the CEO cannot move them without creating value",
        "Mostly fixed salary: without pressure from pay, the CEO feels free to take the long view on the firm's research",
        "Long-vesting shares plus a golden parachute: the CEO shares in success and need not fear losing the job after a failed trial",
        "A large grant of options only: options reward risk, so the more options the CEO holds, the better it is for the owners of the firm",
      ],
      answer: 2,
      solution: `<p>The owners want two things: effort aimed at long-run value and a CEO willing to start trials that usually fail. <b>Shares with long vesting</b> handle the first: the CEO's wealth moves with value years ahead. A <b>golden parachute</b> handles the second: a failed trial that costs the CEO the job no longer costs the CEO everything, so the CEO "will not be afraid to take those risks" (Kurbatov).</p>`,
      check: `<p>Test each design against what a drug developer needs. An EPS bonus rewards cutting R&amp;D, the opposite of what the owners want. A fixed salary pays the same for effort and for shirking. Options alone reward any risk, good or bad. They also lose their pull when far out of the money ✓.</p>`,
      traps: [
        "An EPS target is easy to game: an R&amp;D cut or a buyback lifts EPS without creating value. Kurbatov: targets make the manager short-sighted.",
        "A fixed salary does not move with value, so effort and shirking pay the same. Freedom without alignment invites shirking.",
        null,
        "Options push towards risk of any kind, bad bets included. They stop working when deep out of the money; more is not always better.",
      ],
    },
    {
      id: "d3-eierverktoy-2",
      title: "Shareholder voice: proposals, votes and proxy advisers",
      theory: `<p>Owners can use their votes: vote against directors or pay (<b>say on pay</b>), put a <b>proposal</b> on the agenda, coordinate votes with other holders or run a <b>proxy fight</b> with their own candidates for the board. Three limits:</p>
<ul><li><b>Free riding.</b> The holder who campaigns pays the full cost; every owner shares the gain.</li><li><b>Most proposals fail and most are advisory</b>: a passed proposal is a request to the board, not an order. Low support is not only laziness: many proposals cater "to a certain small group" (Kurbatov). At Microsoft's 2023 meeting all nine shareholder proposals failed.</li><li><b>Proxy advisers</b> such as ISS and Glass Lewis give voting advice that many institutions simply follow. That is cheap, but one standard policy then decides votes at very different firms. There is also some evidence that the advice caters to the bigger institutions.</li></ul>
<div class="callout tip"><span class="h">Intuition</span><p>A vote rarely wins outright, but it is counted and published. Voice works through visibility and coalitions: a board that sees a third of the votes go against it tends to act before the next meeting.</p></div>`,
      example: `<div class="worked"><span class="wh">Example</span><p>A proposal asks the board to separate the roles of CEO and chair. It gets 38% of the votes and fails. The board is not bound, but 38% is public: directors who want to keep their seats often meet the large holders and make a concession before next year.</p></div>`,
      q: `<p>At a large listed firm a shareholder proposal asking for a report on the firm's lobbying gets 8% of the votes. Which reading is best?</p>`,
      options: [
        "Owners are lazy: support of only 8% shows that almost nobody reads the proposals they are asked to vote on each year",
        "Low support need not be laziness: many proposals serve a small group's agenda, so most owners side with the board",
        "Had the proposal won 51% of the votes, the board would have been legally bound to publish the report",
        "Proxy advisers would have backed it, since their advice is written mainly for the small retail holders",
      ],
      answer: 1,
      solution: `<p>Kurbatov's point: low support for shareholder proposals is not only laziness. Many proposals cater to a small group; owners who read them may simply disagree. A proposal like this is also usually advisory, so even a majority would only put pressure on the board, not bind it.</p>`,
      check: `<p>Compare with the data Kurbatov showed: directors get about 91% support on average and Microsoft's nine proposals all failed, the best one at 33.57%. Low support is the normal result, not proof that nobody reads ✓.</p>`,
      traps: [
        "Laziness is not the only reason: many proposals cater to a small group, so informed owners vote against them.",
        null,
        "Most shareholder proposals are advisory (precatory): a passed one is a request to the board, which then faces strong pressure to act, not a legal order. Write “pressure, not binding”.",
        "Reversed: there is some evidence that proxy advice caters to the bigger institutions.",
      ],
    },
    {
      id: "d3-eierverktoy-3",
      title: "Exam level: what a holder of 5–10% can do",
      theory: `<p>H2025 Exercise 2 (12 points): you hold 5–10% of a firm whose managers shirk and enjoy private benefits; give three actions, 2–3 sentences each, 4 points each. The key accepts any reasonable action with an explanation: active monitoring, an activist campaign, replacing insider directors with independent ones, a better pay contract, voting or pressing to fire the manager, an LBO or a friendly acquirer, legal action if there is good evidence. As a bonus for creativity it also accepts <b>exit</b>.</p>
<p>Exit works as a threat: selling a large block pushes the price down, which hurts a CEO paid in shares and makes the firm cheaper for a bidder. A full-mark action says what you do, through which channel and why it changes the CEO's behaviour. It also uses your stake: 5–10% makes acting worth its cost, but you cannot decide alone, so you need allies.</p>
<div class="callout tip"><span class="h">Intuition</span><p>Your stake is too big to sell quietly and too small to give orders. That pushes you towards voice with allies, with exit as the threat you keep in reserve.</p></div>`,
      example: `<div class="worked"><span class="wh">Example: one action in full</span><p><b>Replace insider directors.</b> With 8% I nominate two independent directors at the annual meeting and ask the other large holders to back them. Independent directors can cut the CEO's perks and tie pay to results, so shirking starts to cost the CEO. My stake makes the campaign worth its cost; the allies make it winnable.</p></div>`,
      q: `<p>You hold 7% of Lyngstad ASA. Its CEO shirks and uses the firm's cabin and jet for private trips. Which action, as written, earns the full 4 points?</p>`,
      options: [
        "I would make the CEO work harder and stop the private trips. The CEO is clearly shirking, which hurts every shareholder in the firm.",
        "I would sell all my shares at once. An unhappy owner should leave; the buyer of the shares can then deal with the CEO.",
        "I would vote to fire the CEO at the annual meeting. With 7% of the votes I can remove the CEO on my own, without any allies.",
        "I would nominate two independent directors and ask other large holders to back them. A new board can cut the perks and tie pay to results.",
      ],
      answer: 3,
      solution: `<p>The action that scores has the three parts the key rewards. <b>What</b>: nominate two independent directors. <b>Channel</b>: the board, the body that can cut the CEO's perks, change the CEO's pay or replace the CEO. <b>Why it works with 7%</b>: the stake makes the campaign worth its cost, while the call for allies admits that 7% cannot win a vote alone.</p>`,
      check: `<p>Ask of each action: what do I do, through which channel and why does the CEO change? Only the board action answers all three ✓. Exit could also score, but only with its mechanism: a block sold pushes the price down and invites a bidder.</p>`,
      traps: [
        "Names the goal, not an action: no channel and no tool. \"Make the CEO work harder\" gives the grader nothing to mark.",
        "Exit can score (the H2025 key gave a bonus for it), but only with the mechanism: a block sold pushes the price down, hurts a CEO paid in shares and invites a bidder.",
        "Owners elect the board; the board fires the CEO. And 7% cannot decide a vote alone.",
        null,
      ],
    },
    {
      id: "d3-eierverktoy-4",
      title: "Takeover defences: the poison pill in numbers",
      theory: `<p>Managers can resist the takeover market with defences (Kurbatov, lecture 12). Most belong in a US firm:</p>
<ul><li><b>Poison pill</b>: if a raider crosses a trigger stake, every <i>other</i> shareholder gets new shares cheaply. The raider is diluted, so a hostile bid cannot succeed unless the board removes the pill.</li><li><b>Staggered board</b>: only a third of the seats are elected each year, so winning a majority takes two annual meetings.</li><li><b>Supermajority</b>: a merger or the removal of a director needs, say, 75% of the votes, so a minority can block it.</li><li><b>Golden parachutes, white knights and greenmail</b> complete the list.</li></ul>
<p>The key question for each: does it raise value by giving the board bargaining power, or does it entrench the managers? The market's reaction when a firm adopts a pill is "super negative" (Kurbatov). Since 1985 a pill has been triggered only once, by accident.</p>
<div class="formula"><div class="eq">raider's stake after = s/(s + (1 − s)(1 + n))</div><div class="where">s is the raider's stake when the pill triggers and n the number of new shares each other shareholder gets per share owned. The raider gets no new shares.</div></div>
<div class="callout tip"><span class="h">Intuition</span><p>The pill is built never to be used. Its power is the threat: a bidder that crosses the line loses much of its stake, so it must negotiate with the board instead of buying from the shareholders.</p></div>`,
      example: `<div class="worked"><span class="wh">Example: Kurbatov's numbers</span><p>Trigger 10%; each other shareholder gets one new share per share owned. Per 100 old shares the raider holds 10 and the others 90, which become 180. Raider's stake: 10/(10 + 180) = 0.1/1.9 = 5.26%.</p></div>`,
      q: `<p>Brekke Industries Inc., a US-listed firm, adopts a poison pill with a 15% trigger. If a raider crosses it, every other shareholder receives two new shares for each share owned; the raider receives none. A raider buys exactly 15% and triggers the pill. What is the raider's stake afterwards?</p>`,
      options: ["5.56%", "8.11%", "5.00%", "15.00%"],
      answer: 0,
      solution: `<p>Per 100 old shares the raider holds 15 and the others 85. The others get 2 × 85 = 170 new shares, so they now hold 85 + 170 = 255.</p><p>Total shares: 15 + 255 = 270. Raider's stake = 15/270 = <b>5.56%</b>.</p><p>With the formula: 0.15/(0.15 + 0.85 × 3) = 0.15/2.70 = 0.0556.</p>`,
      check: `<p>Backwards: 5.5556% of 270 shares is 15.00, the raider's own shares ✓. If the new shares are free, as in Kurbatov's version, the raider's claim on the firm falls by 1 − 5.5556/15 = 62.96%. That loss is the deterrent.</p>`,
      traps: [
        null,
        "Used Kurbatov's one new share per share instead of two: 0.15/(0.15 + 0.85 × 2) = 0.15/1.85 = 8.11%.",
        "Tripled every share, the raider's too: 15/(100 × 3) = 5.00%. The raider gets no new shares, so the total is 270, not 300.",
        "Let the raider take part in the issue, so its stake does not change. The pill excludes the raider; that is what dilutes it.",
      ],
    },
    {
      id: "d3-eierverktoy-5",
      title: "When protecting the manager can help: long projects and dual-class shares",
      theory: `<p>Entrenchment usually destroys value: it switches off the takeover threat and makes a weak manager hard to replace. Kurbatov's exception: a firm with "absolutely crystal clear reputation, very transparent long-term vision" and a stable group of shareholders. The lecture example is year 7 of 10 towards a cancer drug, where a raider would cut the research for a quick profit. Protection keeps the scientists and the trusted manager in place. The cost is the usual one: external monitoring is greatly reduced.</p>
<p><b>Dual-class shares</b> build the same trade-off into the share structure. The founders keep voting control with a small part of the capital, so the firm can raise equity without giving up control: Ford raised capital while the family kept control with about 3% of the equity and about 40% of the votes. The price: the vote and the takeover threat no longer discipline the controlling owners. Ford also shows the other side. Its board added a low-trigger pill to protect the firm's tax losses, but with about 40% of the votes in the family's hands the losses were never at risk. The pill "was just entrenching the inefficient management" and the market punished it.</p>
<div class="callout tip"><span class="h">Intuition</span><p>Protection buys time. Time is worth something only when the plan is clear, close to paying off and backed by stable owners; otherwise it just shelters a manager from the people who could replace the manager.</p></div>`,
      example: `<div class="worked"><span class="wh">Example: control with a tenth of the capital</span><p>A founder owns 10% of the capital in B shares with 10 votes each; the public owns 90% in A shares with one vote each. Votes: 10 × 10 = 100 against 90, so the founder holds 100/190 = 52.63% of the votes with 10% of the capital. The firm can sell more A shares without the founder losing control.</p></div>`,
      q: `<p>Four US-listed firms want to protect their managers from hostile bids. In which case does the course see a possible gain for the owners?</p>`,
      options: [
        "Granite Tools Inc. has lagged its peers for five years; its CEO needs time to turn the firm around without pressure from bidders",
        "Medivo Inc. is in year 6 of 9 towards a vaccine, with a transparent plan, a trusted CEO and a stable group of owners",
        "Harbor Foods Inc.'s board adopts a pill without a shareholder vote in the week after a bid at a 30% premium",
        "Stanton Motors Inc.'s founding family holds 60% of the votes; the board adds a pill so that no raider can ever take control",
      ],
      answer: 1,
      solution: `<p>Medivo fits Kurbatov's conditions: a transparent long-term plan close to paying off, a trusted manager and stable owners. A raider who bought it now could cut the programme for a quick profit just before the value arrives, so protection can keep the value for the owners. The cost, weaker external monitoring, is still there; the case is that the plan is worth more.</p>`,
      check: `<p>Test each firm against the three conditions (clear plan near its payoff, trusted manager, stable owners). Granite has a record of failure, the very case the takeover market exists for. Harbor's pill, adopted without a vote right after a bid, points to entrenchment. Stanton repeats Ford: 60% of the votes already blocks any raider, so the pill only protects the managers ✓.</p>`,
      traps: [
        "A firm that has lagged for years is exactly where a bidder adds value by replacing management. Protection shelters the failure.",
        null,
        "A pill adopted without a vote right after a premium bid takes the premium off the table: the classic sign of entrenchment.",
        "The Ford lesson: with 60% of the votes no raider can win anyway, so the pill adds no protection to the firm, only to the managers.",
      ],
    },
    {
      id: "d3-eierverktoy-6",
      title: "Exam level: you are the owner, choose three measures",
      theory: `<p>Kurbatov's new template, tried in class: you own a company and design the manager's contract. Choose three measures that make the manager act in the shareholders' interest "but not scare them too much", about three sentences each. How Kurbatov graded the class's answers live:</p>
<ul><li><b>An independent board</b>: "one of the first check marks". Add a chair who is not the CEO and 7 to 11 directors.</li><li><b>A ban on dual-class shares</b>: "not a completely stupid measure", but the shares also have benefits: Ford raised capital while the family kept control. Give both sides.</li><li><b>"Make shareholders vote"</b>: "my question is how". Say how: meetings and visits with the largest institutions, since small retail holders are hard to reach.</li><li><b>Communication and transparency</b> such as press releases and newsletters: "this is good".</li></ul>
<p>Strong extras: long-vesting shares or ESG-based pay instead of an EPS target; a golden parachute in an R&amp;D-heavy firm. Close with the trade-off: a manager monitored too hard turns passive.</p>
<div class="callout tip"><span class="h">Intuition</span><p>The question has two halves: align the manager and keep the manager willing to act. A measure scores when it says how it works and what it costs; a measure that only adds pressure misses the second half.</p></div>`,
      example: `<div class="worked"><span class="wh">Example: one measure with both sides</span><p><b>Ban dual-class shares.</b> With one vote per share the controlling owners can be outvoted, so the vote and the takeover threat reach them too. The cost: a founder who would lose control may never list the firm or raise new equity, while Ford raised capital and kept control. I would ban it in a mature firm whose founders no longer run a long-term plan.</p></div>`,
      q: `<p>A student answers the template with three measures: (1) an independent board, with a chair who is not the CEO; (2) "make shareholders vote more, because voting disciplines the manager"; (3) monthly newsletters and open results calls, so that the owners can see what the manager does. Which comment matches how Kurbatov graded such measures in class?</p>`,
      options: [
        "Measure 3 earns nothing: newsletters and results calls change nothing in what the CEO is paid or risks",
        "Measure 1 is weak: the CEO must leave the board entirely before the board can count as independent at all",
        "Add a fourth measure that dismisses the CEO after any loss-making quarter, since owners want the tightest control",
        "Measure 2 needs a how: say who is reached and by what means, for example meetings with the largest institutions",
      ],
      answer: 3,
      solution: `<p>Kurbatov's reply to "make shareholders vote" was "my question is how". A measure without a channel cannot be marked. Say who is reached and how: meetings and visits with the largest institutions before the annual meeting, since small retail holders are hard to reach. Measures 1 and 3 match what Kurbatov rewarded: an independent board is one of the first check marks and transparency "is good".</p>`,
      check: `<p>Run each measure through the template's two halves. Does it make the manager act for the owners and does it say how? Does it avoid scaring the manager into passivity? Measures 1 and 3 pass both; measure 2 fails the "how". A rule that fires the CEO after one bad quarter fails the second half ✓.</p>`,
      traps: [
        "Kurbatov called better communication and transparency good: owners who can see what the manager does can monitor and vote on facts.",
        "A CEO with a board seat is fine; only the CEO as chair is the red flag. The student already has an independent chair.",
        "Fails the template's second half: a manager fired after one bad quarter turns passive. Kurbatov asked for measures that do not scare the manager too much.",
        null,
      ],
    },
  ],
});
