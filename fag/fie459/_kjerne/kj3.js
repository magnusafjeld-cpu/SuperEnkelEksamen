/* kj3 · Shareholders, stakeholders and keeping managers in check */
window.EDU_DATA.kjerne.push({
  id: "kj3",
  num: 3,
  title: "Shareholders, stakeholders and keeping managers in check",
  chapters: [4, 5],
  html: `
<div class="callout kort"><span class="h">In short</span>A company is owned by shareholders but run by managers. Whose interests should the firm serve: the owners' profits, everyone the firm affects or the owners' wider wishes? And how do owners make managers do their job? One idea ties the two together: the broader and vaguer the goal you give managers, the harder it is to check whether they met it.</div>

<p class="lead-in">Lecture 4 sets Friedman against stakeholder theory and offers Hart and Zingales's way out; lecture 5 turns the same tension into the agency problem. Good true/false material: who made which critique, when Friedman's argument holds and whether a case is adverse selection or moral hazard.</p>

<h3>Shareholder versus stakeholder</h3>
<p><b>Friedman (1970)</b>: the social responsibility of business is to increase its profits. Managers maximise shareholder value "while conforming to the basic rules of the society", both law and ethical custom. <b>Stakeholder theory</b> (Freeman) holds the firm responsible also to employees, creditors, customers, suppliers, the community and the environment. In 2019 about 200 CEOs signed the <b>Business Roundtable</b> statement that a corporation's purpose is to serve all its stakeholders.</p>
<p>The critics attack accountability:</p>
<table>
<tr><th>Critic</th><th>Argument</th></tr>
<tr><td>Jensen (2002)</td><td>Managers get to design their own objective function; replacing a measurable goal with a less measurable one can raise agency costs</td></tr>
<tr><td>Mehrotra &amp; Morck (2017)</td><td>Shareholder value is a "bright line"; stakeholder welfare is an "ill-defined charge"</td></tr>
<tr><td>Bebchuk &amp; Tallarita (2020)</td><td>No answer to which groups count, the trade-offs or how to aggregate them, so management is insulated from shareholders</td></tr>
<tr><td>Harvard Law School Forum</td><td>Under Delaware law directors owe a fiduciary duty to shareholders, so the statement is legally incorrect; the business judgement rule makes it unnecessary</td></tr>
</table>

<div class="callout mech"><span class="h">Why a vaguer objective raises agency costs</span>An objective disciplines a manager only if some outcome can show it was missed, as the share price can for shareholder value. "Serve all stakeholders", with no list and no weights, can justify almost any decision: a lower dividend helps employees, a lower wage helps shareholders. When every choice is defensible, nobody is accountable.</div>

<h3>Hart and Zingales: shareholder welfare, not market value</h3>
<p>Hart &amp; Zingales (2017) keep shareholders as the principal but refuse to equate their <i>welfare</i> with market <i>value</i>: shareholders care about money but not only about money. Friedman's reply is <b>separation</b>: firms make money while shareholders and governments deal with externalities. That works when the social activity is <b>separable</b> from money-making, as with charity. It fails when profit and damage are <b>non-separable</b> (tied together by the firm's technology, so shareholders cannot undo the damage themselves) and government does not internalise the damage.</p>

<div class="worked"><span class="wh">Example: the clean-or-dirty vote</span><p>Clean gives profit 100 and no damage. Dirty gives profit 150 and damage of 60 to others, a social surplus of 90. A market-value maximiser picks dirty; society is better off with clean. A shareholder who puts weight λ on the damage votes clean if 100 &gt; 150 − 60λ, that is if λ &gt; 5/6.</p></div>

<p>Without a vote, public firms suffer <b>amoral drift</b>: a small shareholder is almost never pivotal in a tender offer, so he feels no responsibility and sells to a bidder who will make a clean firm dirty. The remedy is a shareholder <b>vote on the broad outlines of corporate policy</b>; they also prefer invest and engage to divestment. <b>Edmans (2020)</b> contrasts pie-splitting, where stakeholders gain only at shareholders' expense, with pie-growing, where firms deliver both purpose and profit.</p>

<h3>Keeping managers in check</h3>
<p>Governance problems come from the <b>separation of ownership and control</b>. The owner (principal) delegates to a manager (agent) who knows more, acts after the contract is set and is costly to monitor. <b>Agency costs</b> are what owners incur to keep the agent acting in their interest. <b>Adverse selection</b> is hidden information before the contract (the lemons problem). <b>Moral hazard</b> is hidden action after it (debt overhang, asset substitution). Governance practices include board monitoring (CEO not also chair), stock-based pay, shareholder rights (no dual-class shares) and whistleblowing procedures.</p>
<p>Shareholders act directly through <b>voice</b> (voting and engagement) or <b>exit</b> (selling).</p>

<div class="callout mech"><span class="h">Why exit works even when nobody sells</span>A manager who destroys value knows shareholders will sell and the falling price will hurt him, so the threat disciplines him ex ante. Exit works through the price, not through the sale itself. A passive investor who cannot sell keeps only voice.</div>

<p>Each step along the SF typology (kj1) widens the objective and weakens accountability. Under SF 1.0, several objectives at once are hard to measure and control; SF 2.0 must balance all stakeholders and adds subjectivity that can raise agency costs. Finance as usual leans on the efficient markets hypothesis (Fama 1970), where carbon risk is already priced; under the adaptive markets hypothesis (Lo 2017) a new risk may not yet be.</p>
<p>The lecture is sceptical of ESG-linked executive pay: the correlation between ESG pay and ESG performance is weak and not causal. Targets tend to be short-term, vague ("improving sustainability") and opaque. Starbucks moved sustainability from the annual bonus into a three-year modifier on equity awards, the longer horizon Schoenmaker and Schramade ask for.</p>

<div class="callout warn"><span class="h">Confusions that cost points</span><ul>
<li>Hart and Zingales are not stakeholder theorists. They widen what shareholders want; for separable activities such as charity they agree with Friedman.</li>
<li>Timing decides adverse selection versus moral hazard: a riskier project chosen after the loan is moral hazard.</li>
<li>ESG-linked pay has not been shown to improve ESG performance.</li>
<li>A stakeholder <i>focus</i> can create shareholder value; stakeholder value as the <i>objective</i> can raise agency costs.</li>
</ul></div>

<div class="callout tip husk"><span class="h">Must know</span><ul>
<li>Friedman: maximise profit within law and ethical custom. Stakeholder theory: serve all stakeholders, which critics such as Jensen and Bebchuk &amp; Tallarita say leaves managers unaccountable.</li>
<li>Hart &amp; Zingales maximise shareholder welfare, not market value. Friedman's separation holds for separable activities such as charity and fails for non-separable damage that government does not internalise.</li>
<li>Adverse selection is hidden information before the contract; moral hazard is hidden action after it.</li>
<li>Voice is voting and engagement. Exit is selling; its threat disciplines managers ex ante through the share price.</li>
<li>ESG-linked pay shows only a weak, non-causal link to ESG performance; its targets are often short-term, vague and opaque.</li>
</ul></div>
`,
  checks: [
    {
      id: "kj3-s1",
      q: "In which situation do Hart and Zingales accept Friedman's argument that firms should simply maximise profit and leave social goals to shareholders?",
      options: [
        "When the damage is tied to the firm's technology, so shareholders cannot undo it themselves",
        "When the social activity, such as charity, is separable from how the firm makes money",
        "Whenever shareholders are prosocial, since they can then donate the profit themselves",
        "Never, since they replace shareholder value with the value of all stakeholders",
      ],
      answer: 1,
      explanation: "With a separable activity such as charity, paying out the profit for shareholders to donate is as good as the firm donating, so Friedman's separation works. Damage tied to the firm's technology is the non-separable case where it fails. Hart and Zingales keep shareholders as the principal, so they are not stakeholder theorists.",
    },
    {
      id: "kj3-s2",
      q: "After a bank grants a loan, the borrowing firm shifts the money into a much riskier project, keeping the upside while the bank bears most of the downside. What is this?",
      options: [
        "Adverse selection, because the firm knows more than the bank",
        "The lemons problem, because the bank cannot tell good borrowers from bad",
        "Debt overhang, because the bank captures most of the gain",
        "Moral hazard, because the hidden action comes after the contract",
      ],
      answer: 3,
      explanation: "Moral hazard is hidden action after the contract; this switch is asset substitution. Information is asymmetric here too, which tempts the adverse selection answer, but adverse selection is hidden information before the contract. Debt overhang is passing up good projects, not taking riskier ones.",
    },
    {
      id: "kj3-s3",
      q: "A board ties part of the CEO's annual bonus to \"improving sustainability\", judged by the board. What does the course say about this kind of pay?",
      options: [
        "It is a strong tool, since ESG-linked pay has been shown to cause better ESG performance",
        "It lengthens the CEO's horizon, since sustainability is a long-term goal",
        "It breaches directors' fiduciary duty to shareholders under Delaware law",
        "It has the flaws the lecture flags: a vague, discretionary and short-term target",
      ],
      answer: 3,
      explanation: "The lecture's concerns are short-term tactical targets, vague discretionary measures and low transparency. The link between ESG pay and ESG performance is weak and not causal. An annual bonus is short-term pay whatever it rewards; Starbucks fixed this by moving sustainability into a three-year modifier on equity awards. The Delaware argument belongs to the critique of the stakeholder statement, not to pay.",
    },
  ],
  case: {
    id: "kj3-m1",
    topic: "Shareholder welfare, stakeholder accountability and exit at a mining company",
    minutes: 8,
    body: `<p>Brekke Minerals ASA is a listed mining company with thousands of small shareholders. Management plans to switch to a cheaper method of disposing of mine waste in a nearby fjord. The switch raises profit but harms local fishermen and the fjord. Current regulation neither prevents nor taxes it. Shareholders cannot undo the damage on their own.</p>
<p>The CEO defends the plan: "We serve all our stakeholders: employees, customers, the local community and owners. Management will balance their interests." A group of shareholders proposes a shareholder vote on whether to adopt the new method, arguing that many owners would accept a lower profit to keep the fjord clean. An active fund that owns 3% threatens to sell its shares if the switch goes ahead. An index fund that tracks an index containing Brekke owns 4%.</p>`,
    ledd: [
      {
        id: "kj3-m1a",
        points: 3,
        q: `<p>Which view of the firm's objective does the shareholder group's proposal express?</p>`,
        options: [
          "Friedman's view: maximise profit and let owners deal with the fjord privately",
          "Stakeholder theory, since the fishermen's interests are to be balanced with the owners'",
          "Edmans's pie-growing, since cleaning up will raise profit as well",
          "Hart and Zingales: maximise shareholder welfare, with a vote on broad policy",
        ],
        answer: 3,
        solution: `<p>The proposal keeps shareholders as the decision-makers and asks the firm to follow their preferences, including their concern for the fjord. That is Hart and Zingales's shareholder welfare. Their vote fits because the damage is non-separable and not internalised by regulation, so Friedman's separation fails.</p>`,
        traps: [
          "Misses that the damage is non-separable, so owners cannot handle it privately as Friedman's separation assumes.",
          "Mistakes Hart and Zingales for stakeholder theorists; the owners decide here, not management balancing groups.",
          "Applies pie-growing where the case states a trade-off: the clean method costs profit.",
          null,
        ],
      },
      {
        id: "kj3-m1b",
        points: 3,
        q: `<p>What is the main concern the course raises about the CEO's statement?</p>`,
        options: [
          "It breaks Norwegian law, which requires workers on the board of all listed firms",
          "With no list of who counts and no weights, managers become harder to hold to account",
          "It produces amoral drift, since small shareholders will tender their shares to a bidder",
          "It is adverse selection, since the CEO knew more than shareholders when he was hired",
        ],
        answer: 1,
        solution: `<p>This is the accountability critique of stakeholder theory (Jensen; Bebchuk &amp; Tallarita). A goal with no list of stakeholders and no weights cannot show that it was missed, so managers can justify their own choices and agency costs can rise.</p>`,
        traps: [
          "Invents a legal rule: codetermination gives workers board seats in larger firms; it does not forbid a stakeholder purpose.",
          null,
          "Borrows amoral drift, which is about tender offers in Hart and Zingales's model, not about a CEO's stated objective.",
          "Confuses the stakeholder critique with adverse selection, which concerns hidden information before a contract.",
        ],
      },
      {
        id: "kj3-m1c",
        points: 2,
        q: `<p>True or false? Unlike the active fund, the index fund cannot use the threat of exit to discipline Brekke's management, so its direct tools are voting and engagement.</p>`,
        options: ["True", "False"],
        answer: 0,
        solution: `<p>True. An index fund must hold the stocks in its index, so it cannot credibly threaten to sell. Exit disciplines through the expected fall in the share price, which only an investor free to sell can trigger. The index fund keeps voice: voting and engagement.</p>`,
        traps: [null, "Treats exit as open to any shareholder, missing that a fund tracking an index must hold Brekke."],
      },
    ],
  },
});
