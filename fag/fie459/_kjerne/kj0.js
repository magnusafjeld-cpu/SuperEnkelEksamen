/* kj0 · The exam on one page */
window.EDU_DATA.kjerne.push({
  id: "kj0",
  num: 0,
  title: "The exam on one page",
  chapters: [0],
  html: `
<p class="lead-in">FIE459 is graded on a closed-book exam (70%) and a group report (30%). This page sets out what the exam looks like, how its true/false statements are built and where each exam theme is covered in the core parts.</p>

<h3>The format</h3>
<ul>
<li>3-hour digital school exam, <b>closed book</b>, 16 December 2026.</li>
<li><b>Multiple-choice and true/false</b> questions, answered in English.</li>
<li>There are no past exams, so nobody knows the exact mix. Nothing in the course material says a wrong answer costs points; this app scores without negative marking.</li>
</ul>

<h3>What the lecturer asks for</h3>
<p>Jiaying Li puts the focus on «economic intuition, not calculation» and warns: «Memorizing definitions is not the best strategy!» Read for the mechanism (such as why a polluting market makes too much) and for the line between two concepts that sound alike. For every concept, ask what it is most easily confused with and what separates the two.</p>

<h3>How a true/false statement is built</h3>
<p>A false statement is usually correct except for one element:</p>
<ul>
<li><b>Swapped concepts:</b> the wrong side of a distinction, such as outside-in for inside-out or action for measurement.</li>
<li><b>A lost condition:</b> «a stakeholder focus creates shareholder value» where the course says it «can help firms create shareholder value».</li>
<li><b>The wrong direction:</b> a price too high where it is too low.</li>
<li><b>Absolute words:</b> «always», «never» or «only» where the course says «can».</li>
</ul>

<h3>The core parts</h3>
<table>
<tr><th>Part</th><th>What it covers</th></tr>
<tr><td>kj1</td><td>CSR, SRI and ESG; value versus values; finance as usual to SF 3.0</td></tr>
<tr><td>kj2</td><td>Ethical theories, externalities and integrated value</td></tr>
<tr><td>kj3</td><td>Shareholder versus stakeholder view; governance, voice and exit</td></tr>
<tr><td>kj4</td><td>Business models, materiality, reporting and ESG ratings</td></tr>
<tr><td>kj5</td><td>Investment strategies, ESG integration and asset prices</td></tr>
<tr><td>kj6</td><td>Bonds, banks and insurers</td></tr>
</table>
<p>The manual's chapter on governments and the transition (k13) is left out until its lecture has been held.</p>

<div class="callout tip husk"><span class="h">Must know</span>
<ul><li>A true/false statement is false if any one part of it is false: read every clause.</li>
<li>Look for the swapped concept, the dropped condition, the reversed direction and the absolute word.</li>
<li>«Always», «never» and «only» make a statement suspect; «can» usually makes it true.</li>
<li>In multiple choice, each wrong option is usually one familiar confusion: name the distinction being tested before you read the options.</li>
<li>The exam rewards mechanisms and distinctions, not recalled definitions or numbers.</li></ul></div>
`,
  checks: [
    {
      id: "kj0-s1",
      q: "A true/false statement has three clauses. Two match the course exactly; the third says «always» where the course says «can». How should you mark it?",
      options: [
        "True, because most of the statement matches the course",
        "True, because «always» and «can» describe the same tendency",
        "False only if the «always» clause is the main claim of the statement",
        "False, because one wrong clause makes the whole statement false",
      ],
      answer: 3,
      explanation: "A statement is true only if every part of it is true, so one overstated clause is enough to make it false. The tempting reading is that a statement that is mostly right is right; true/false items on this course are built exactly that way, correct except for one element.",
    },
    {
      id: "kj0-s2",
      q: "The lecturer stresses «economic intuition, not calculation» and says memorising definitions is not the best strategy. Which way of preparing fits best?",
      options: [
        "For each concept, learn what it is most easily confused with and what separates the two",
        "Learn the definitions word for word, since a closed-book exam rewards those who recall them exactly",
        "Practise the carbon-charge and NPV calculations until you can do them quickly",
        "Memorise the numbers in each table, since true/false items are built on them",
      ],
      answer: 0,
      explanation: "The exam tests distinctions and mechanisms, so knowing what separates a concept from its nearest neighbour is what answers both formats. Word-for-word definitions are exactly what the lecturer warns against. Closed book does not change that: the questions ask you to apply a concept, not recite it.",
    },
  ],
});
