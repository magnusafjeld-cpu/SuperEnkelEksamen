/* kj0 · Eksamen på én side */
window.EDU_DATA.kjerne.push({
  id: "kj0",
  num: 0,
  title: "Eksamen på én side",
  chapters: [0, 19],
  html: `
<p class="lead-in">Fire timer flervalg, og fra 2026 koster et feil svar poeng. Her er når du svarer, hvordan de gale alternativene lages, og hvor poengene har ligget.</p>
<h3>Formatet og gjetteregelen</h3>
<ul>
<li>Fire timers skoleeksamen i Wiseflow, fire alternativer, kalkulator. Fra 2026: <b>3 poeng for rett, −1 for feil, 0 for ubesvart</b>.</li>
<li>Med n alternativer igjen er forventet poeng (1/n) × 3 − (1 − 1/n): <b>0</b> blindt blant fire, <b>+⅓</b> med ett utelukket, <b>+1</b> med to. Svar når du kan utelukke minst ett; stå over ellers.</li>
<li>29 til 38 spørsmål på 240 minutter, 6 til 8 minutter hvert (H2025: 29 poeng). Du taper ikke på tiden, men på å regne fort og feil.</li>
</ul>
<h3>Slik lages de gale alternativene</h3>
<p>Nesten hvert galt alternativ er én bestemt feil: ubenyttet skjerming glemt, oppjusteringen utelatt eller gjort to ganger (kj2); gjeld ikke redusert med rabatten, eller redusert også for primærbolig, og markedsverdi i stedet for formuesverdi (kj3); effektiv sats delt på skattepliktig i stedet for brutto inntekt (kj1); konsumentpris og produsentpris forvekslet (kj5).</p>
<p>Regn ferdig før du ser på alternativene, og forklar hvilken feil hvert av de tre andre er laget av; da er tallet ditt nesten sikkert riktig. Fasitene har kjente regnefeil i veiledningsteksten (H2024 oppgave 5 skriver 17,1 %, men 65 400/380 000 = 17,2 %, som alternativet sier), mens svaralternativet nesten alltid stemmer. Stol på ditt kontrollerte regnestykke og velg nærmeste alternativ. Ligger tallet ditt langt fra alle fire, har du trolig gjort en feil: regn om.</p>
<h3>Hvor poengene har ligget</h3>
<table class="data">
<tr><th>Tema</th><th>H2022</th><th>H2024</th><th>H2025</th><th>Del</th></tr>
<tr><td>Stykkskatt-insidens</td><td class="n">9 %</td><td class="n">19 %</td><td class="n">10 %</td><td>kj5</td></tr>
<tr><td>Skjerming</td><td class="n">20 %</td><td class="n">8 %</td><td class="n">5 %</td><td>kj2</td></tr>
<tr><td>Oppjustering, eierskatt, effektiv sats</td><td class="n">18 %</td><td class="n">6 %</td><td class="n">6 %</td><td>kj1, kj2</td></tr>
<tr><td>Internasjonal skatt, exit-skatt</td><td class="n">17 %</td><td class="n">19 %</td><td class="n">–</td><td>kj7</td></tr>
<tr><td>Formuesskatt som avkastningsskatt</td><td class="n">–</td><td class="n">–</td><td class="n">17 %</td><td>kj4</td></tr>
<tr><td>Merton med humankapital</td><td class="n">14 %</td><td class="n">–</td><td class="n">14 %</td><td>kj8</td></tr>
<tr><td>Forventet nytte, forsikring</td><td class="n">–</td><td class="n">8 %</td><td class="n">14 %</td><td>kj11</td></tr>
<tr><td>Bedriftens tilpasning</td><td class="n">–</td><td class="n">–</td><td class="n">10 %</td><td>kj6</td></tr>
<tr><td>Sparing: ln-nytte, tapsaversjon</td><td class="n">14 %</td><td class="n">–</td><td class="n">–</td><td>kj8</td></tr>
</table>
<p>Resten: progressivitet og implisitt skatt (til sammen 14 % i H2024; kj1, kj6), utbyttet som betaler formuesskatten (kj4), gjeldsfordeling (kj3), portefølje (kj8), pensjon (kj9) og lån (kj10).</p>
<h3>Rekkefølgen</h3>
<p>Fakta- og begrepsspørsmålene først, i én gjennomgang: et minutt eller to hver, og et sikkert gulv. Så regnespørsmålene, ett tema om gangen, og formelgjenkjenningen sist. Merk dem du hopper over, og særskilt dem der du har strøket ett eller to alternativer; dem tar du det siste kvarteret.</p>
<div class="callout tip husk"><span class="h">Må kunne</span>
<ul><li>Med +3 for rett og −1 for feil er forventet poeng 0 blindt blant fire, +⅓ med ett alternativ utelukket og +1 med to. Svar når du kan utelukke minst ett.</li>
<li>Regn ferdig før du ser på alternativene, kontroller tallet en annen vei, og forklar hvilken feil hvert galt alternativ er laget av.</li>
<li>Feilmønstrene: glemt ubenyttet skjerming, oppjustering utelatt eller doblet, gjeld ikke redusert med rabatten eller redusert også for primærbolig, markedsverdi i stedet for formuesverdi, skattepliktig i stedet for brutto i nevneren.</li>
<li>Kontrollert tall tett ved ett alternativ: velg det, selv om fasitteksten sier noe annet. Langt fra alle fire: regn om.</li></ul></div>
`,
  checks: [
    {
      id: "kj0-s1",
      q: "Du har strøket ett av de fire alternativene og har ingen formening om de tre som er igjen. Hva er forventet poeng av å svare, med 3 for rett og −1 for feil?",
      options: [
        "0, fordi minuspoengene er satt slik at gjetting aldri lønner seg",
        "+1, fordi sjansen for rett er ⅓ og ⅓ × 3 = 1",
        "+⅓, fordi ⅓ × 3 − ⅔ × 1 = ⅓",
        "−⅓, fordi du fortsatt bommer oftere enn du treffer",
      ],
      answer: 2,
      explanation: "Med tre alternativer igjen er sjansen for rett ⅓, så forventningen er ⅓ × 3 − ⅔ × 1 = +⅓, og du bør svare. Null gjelder bare når du gjetter blindt blant fire. Svaret +1 glemmer at de to gale utfallene hver koster ett poeng.",
    },
    {
      id: "kj0-s2",
      q: "Du har regnet ferdig og kontrollert, men tallet ditt ligger langt fra alle de fire alternativene. Hva gjør du?",
      options: [
        "Velger alternativet nærmest tallet ditt, siden fasitene har kjente regnefeil",
        "Leser oppgaven igjen og regner om, siden bommen trolig er din egen",
        "Lar spørsmålet stå blankt med en gang, siden gjetting gir null i forventning",
        "Velger alternativet midt i spennet, siden de gale tallene ligger rundt det riktige",
      ],
      answer: 1,
      explanation: "De gale alternativene er laget av de typiske feilene, så et tall som ikke ligner noe av dem, tyder på at du har lest eller regnet feil. Fasitfeilene som er kartlagt, ligger i veiledningsteksten og er små; der er svaralternativet nesten alltid riktig. «Velg nærmeste» gjelder derfor når tallet ditt ligger tett ved ett alternativ, ikke når det bommer på alle fire.",
    },
  ],
});
