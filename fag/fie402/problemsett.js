/* ===================== FIE402 · PROBLEM SETS =====================
   Øvingssettene fra kurset, ett per sett, i samme rekkefølge som de deles ut.
   Oppgaveteksten er ordrett på engelsk, som på eksamen. Hint og fasit er på
   norsk.

   Hvert delspørsmål har fire hint som blir gradvis mer konkrete (trinn):
   retning, verktøy, oppsett og til slutt oppskriften uten tall. Fasiten
   ligger bak en egen knapp.

   niva er stjernene fra settet: 1 = gjennomgås i tutorial, 2 = i
   forelesningen, 3 = egen trening.

   Settets id og oppgavenes nr er lagringsnøkler («ps:ps1:3»). De må aldri
   endres. Motoren: js/bundle-problemsett.js.
   ============================================================================ */
window.EDU_DATA = window.EDU_DATA || {};
window.EDU_DATA.problemsett = [
  {
    id: "ps1", nr: 1, tittel: "Problem Set 1", tema: "Capital structure and payout policy",
    trinn: ["Retning","Verktøy","Oppsett","Oppskrift"],
    nivaer: { 1: ["*", "Tutorial"], 2: ["**", "Forelesning"], 3: ["***", "Egen trening"] },
    oppgaver: [
      /* ---------------- 1 ---------------- */
      { nr: 1, niva: 1, tema: "M&M", tittel: "Yerba Industries",
        intro: `<p>Yerba Industries is an all-equity firm whose stock has a beta of 1.2 and an expected return of 12.5%. Suppose it issues new risk-free debt with a 5% yield and repurchases 40% of its stock. Assume perfect capital markets.</p>`,
        deler: [
          { l: "a",
            q: `<p>What is the beta of Yerba stock after this transaction?</p>`,
            hint: [
              `<p>Refinansieringen endrer ikke eiendelene til firmaet. Det er bare risikoen som fordeles annerledes mellom gjeld og egenkapital.</p>`,
              `<p>Firmaet er helt egenkapitalfinansiert i dag, så dagens aksjebeta er lik <span class="f">β<sub>U</sub></span>. Bruk MM-sammenhengen for beta: <span class="f">β<sub>E</sub> = β<sub>U</sub> + D/E (β<sub>U</sub> − β<sub>D</sub>)</span>.</p>`,
              `<p>Gjelden er risikofri, så <span class="f">β<sub>D</sub> = 0</span> og formelen blir <span class="f">β<sub>E</sub> = β<sub>U</sub>(1 + D/E)</span>. Du trenger D/E etter transaksjonen. Andelen aksjer som kjøpes tilbake tilsvarer D/V.</p>`,
              `<ol><li>Sett <span class="f">β<sub>U</sub></span> lik dagens aksjebeta.</li><li>Andel tilbakekjøpt = <span class="f">D/V</span>. Da er <span class="f">E/V = 1 − D/V</span>.</li><li>Regn <span class="f">D/E = (D/V) / (E/V)</span>.</li><li>Sett inn: <span class="f">β<sub>E</sub> = β<sub>U</sub> × (1 + D/E)</span>.</li></ol>`,
            ],
            fasit: `<div class="calc">D/V = 0.4, E/V = 0.6  →  D/E = 2/3
β_E = 1.2 × (1 + 0.4/0.6) = 2.0</div>` },
          { l: "b",
            q: `<p>What is the expected return of Yerba stock after this transaction?</p>`,
            hint: [
              `<p>Høyere beta betyr høyere forventet avkastning. Det finnes to veier til svaret og begge gir det samme.</p>`,
              `<p>Vei 1: CAPM, <span class="f">r<sub>E</sub> = r<sub>f</sub> + β(r<sub>m</sub> − r<sub>f</sub>)</span>. Vei 2: MM Proposition II, <span class="f">r<sub>E</sub> = r<sub>U</sub> + D/E (r<sub>U</sub> − r<sub>D</sub>)</span>.</p>`,
              `<p>For CAPM mangler du markedsrisikopremien. Den finner du fra situasjonen før transaksjonen, der du kjenner både avkastning og beta. Gjeldsrenten er lik <span class="f">r<sub>f</sub></span> fordi gjelden er risikofri.</p>`,
              `<ol><li>Markedsrisikopremie: <span class="f">(r<sub>U</sub> − r<sub>f</sub>) / β<sub>U</sub></span>.</li><li>Ny forventet avkastning: <span class="f">r<sub>f</sub> + β<sub>E,ny</sub> × premie</span>.</li><li>Kontroller med <span class="f">r<sub>U</sub> + D/E × (r<sub>U</sub> − r<sub>D</sub>)</span>.</li></ol>`,
            ],
            fasit: `<div class="calc">r_m − r_f = (12.5 − 5) / 1.2 = 6.25%
r_E = 5 + 2 × 6.25 = 17.5%

Kontroll: 12.5 + (2/3)(12.5 − 5) = 17.5%</div>` },
          { l: "c",
            ctx: `Suppose that prior to this transaction, Yerba expected earnings per share this coming year of $1.50, with a forward P/E ratio (that is, the share price divided by the expected earnings for the coming year) of 14.`,
            q: `<p>What is Yerba's expected earnings per share after this transaction? Does this change benefit shareholders? Explain.</p>`,
            hint: [
              `<p>Under MM endres ikke aksjekursen av refinansieringen. Det enkleste er å regne alt per opprinnelig aksje.</p>`,
              `<p>Pris = forward P/E × EPS. Tilbakekjøpet finansieres med lån og rentene på lånet trekkes fra inntjeningen før den fordeles på færre aksjer.</p>`,
              `<p>Per opprinnelig aksje: lånebeløp = andel tilbakekjøpt × pris. Renter = gjeldsrente × lån. Inntjening etter renter fordeles så på andelen aksjer som er igjen.</p>`,
              `<ol><li><span class="f">P = (P/E) × EPS</span>.</li><li>Lån per opprinnelig aksje = andel tilbakekjøpt × P.</li><li>Rentekostnad = <span class="f">r<sub>D</sub></span> × lån.</li><li>Inntjening til egenkapital per opprinnelig aksje = EPS − rentekostnad.</li><li>Ny EPS = dette beløpet / (1 − andel tilbakekjøpt).</li><li>Vurder: kursen er uendret, så den høyere EPS-en er kun kompensasjon for høyere risiko.</li></ol>`,
            ],
            fasit: `<div class="calc">P = 14 × 1.50 = 21
Lån per aksje = 0.4 × 21 = 8.40
Renter = 0.05 × 8.40 = 0.42
Inntjening = 1.50 − 0.42 = 1.08
EPS = 1.08 / 0.6 = 1.80</div>
<p>Ingen gevinst for aksjonærene. Aksjekursen er uendret og den høyere EPS-en veies opp av høyere risiko.</p>
<p>Utregningen er per aksje: 40 % tilbakekjøp tilsvarer 8.40 per aksje og man deler på 0.6 fordi inntjeningen fordeles på færre aksjer.</p>` },
          { l: "d",
            q: `<p>What is Yerba's forward P/E ratio after this transaction? Is this change in the P/E ratio reasonable? Explain.</p>`,
            hint: [
              `<p>P/E henger sammen med risiko og avkastningskrav. Hva skjedde med avkastningskravet i (b)?</p>`,
              `<p>Ny P/E = uendret pris / ny EPS.</p>`,
              `<p>Bruk prisen og EPS fra (c). Forklaringen handler om at høyere <span class="f">r<sub>E</sub></span> gir lavere multippel. Merk at gjelden er risikofri, så det er ikke konkursrisiko som driver dette.</p>`,
              `<ol><li>Ta prisen fra (c), som er uendret.</li><li>Del på ny EPS fra (c).</li><li>Forklar retningen med økningen i <span class="f">r<sub>E</sub></span> fra (b): mer finansiell risiko per aksje, men ingen konkursrisiko.</li></ol>`,
            ],
            fasit: `<div class="calc">P/E = 21 / 1.80 = 11.67</div><p>P/E faller fordi egenkapitalen er mer risikabel (men ikke på grunn av konkursrisiko). Rimelig.</p>` },
        ] },
      /* ---------------- 2 ---------------- */
      { nr: 2, niva: 3, tema: "M&M", tittel: "To firmaer, samme kontantstrøm",
        intro: `<p>Consider two firms i = A, B that generate an identical cash flow X = 110 at t = 1 but have different capital structures. Firm A is all equity financed, whereas firm B has debt maturing at t = 1 with a principal of K = 40. The discount rate is 0.1 which is also the rate at which money can be borrowed or lent by households and firms. The value of firm i at t = 0 is denoted by V<sub>i</sub>. The value of firm i's equity and debt at t = 0 are respectively E<sub>i</sub> and D<sub>i</sub>. Finally, assume that the firms operate in a perfect capital market.</p>`,
        deler: [
          { l: "a",
            q: `<p>What are the respective cash flows to the shareholders of firm A and B at t = 1? Compute and compare D<sub>B</sub>, E<sub>B</sub> and E<sub>A</sub>.</p>`,
            hint: [
              `<p>Aksjonærene får det som er igjen etter at gjeldseierne har fått sitt. Firma A har ingen gjeld.</p>`,
              `<p>Gjelden i B er risikofri siden X er langt større enn gjeldsbetalingen. Gjeldseierne får hovedstol pluss rente i t = 1. Verdier i t = 0 er kontantstrøm i t = 1 diskontert med <span class="f">1 + r</span>.</p>`,
              `<p>Tre kontantstrømmer i t = 1: til A-aksjonærer, til B-gjeld og til B-aksjonærer. Diskonter hver av dem og legg sammen for å få firmaverdiene.</p>`,
              `<ol><li>CF til A-aksjonærer = <span class="f">X</span>.</li><li>CF til B-gjeld = <span class="f">K(1 + r)</span>.</li><li>CF til B-aksjonærer = <span class="f">X − K(1 + r)</span>.</li><li>Diskonter hver med <span class="f">(1 + r)</span> for å få <span class="f">E<sub>A</sub></span>, <span class="f">D<sub>B</sub></span> og <span class="f">E<sub>B</sub></span>.</li><li>Sammenlign <span class="f">V<sub>A</sub> = E<sub>A</sub></span> med <span class="f">V<sub>B</sub> = D<sub>B</sub> + E<sub>B</sub></span>.</li></ol>`,
            ],
            fasit: `<div class="calc">CF til A-aksjonærer = 110
CF til B-aksjonærer = 110 − 40(1.1) = 66

E_A = 110/1.1 = 100
D_B = 44/1.1 = 40
E_B = 66/1.1 = 60
V_A = V_B = 100</div>` },
          { l: "b",
            q: `<p>Suppose that the market value of firm A's equity at t = 0 is E<sub>A</sub> as derived in (a) and the market value of firm B's equity is E<sub>B</sub> = 54. Consider an investor who has own wealth W = 54 to invest. Suppose she decides to buy all of firm B's equity. What is her final payoff? What is her final payoff if she buys all of firm A's equity?</p>`,
            hint: [
              `<p>Å kjøpe B gir en giret posisjon gjennom firmaet. For å kjøpe A må hun låne selv, altså lage giringen på egen hånd.</p>`,
              `<p>Kjøp av B: formuen dekker akkurat prisen, så hun får hele kontantstrømmen til B-aksjonærene. Kjøp av A: hun må låne differansen mellom prisen og formuen til samme rente som firmaene.</p>`,
              `<p>Payoff ved A-kjøp = hele firmaets kontantstrøm minus tilbakebetaling av det personlige lånet med renter.</p>`,
              `<ol><li>B: siden <span class="f">W = E<sub>B</sub></span> trenger hun ikke låne. Payoff = CF til B-aksjonærer fra (a).</li><li>A: personlig lån = <span class="f">E<sub>A</sub> − W</span>.</li><li>Tilbakebetaling = lån × <span class="f">(1 + r)</span>.</li><li>Payoff = <span class="f">X</span> − tilbakebetaling.</li><li>Sammenlign de to.</li></ol>`,
            ],
            fasit: `<p><b>Kjøper all egenkapital i B:</b> formuen dekker prisen og hun får 66 i t = 1.</p>
<p><b>Kjøper all egenkapital i A:</b> hun må låne 100 − 54 = 46.</p>
<div class="calc">Tilbakebetaling = 46 × 1.1 = 50.6
Payoff = 110 − 50.6 = 59.4</div>` },
          { l: "c",
            q: `<p>Propose an arbitrage strategy for the investor in (b). If we assume that rational investors do not leave arbitrage opportunities unexploited, what should be the equilibrium values for E<sub>B</sub> and E<sub>A</sub> as well as V<sub>A</sub> and V<sub>B</sub>? Which general theorem is this an example of? State the essence of the theorem and the assumption under which it is derived.</p>`,
            hint: [
              `<p>Like kontantstrømmer skal ha lik pris. Hvilken av aksjene er for billig sammenlignet med (a)?</p>`,
              `<p>Arbitrasje: selg det som er for dyrt (short), kjøp det som er for billig og plasser resten risikofritt. Strategien skal ikke kreve egen kapital og gi positiv payoff.</p>`,
              `<p>Short A gir et proveny. Bruk en del til å kjøpe B og lån ut resten til r. I t = 1 får du B-kontantstrømmen og det utlånte beløpet med rente, men må betale A-kontantstrømmen tilbake.</p>`,
              `<ol><li>Short all egenkapital i A og få <span class="f">E<sub>A</sub></span>.</li><li>Kjøp all egenkapital i B for <span class="f">E<sub>B</sub></span>.</li><li>Lån ut <span class="f">E<sub>A</sub> − E<sub>B</sub></span> til rente r.</li><li>t = 1: <span class="f">CF<sub>B,EK</sub> + (E<sub>A</sub> − E<sub>B</sub>)(1 + r) − X</span>.</li><li>Likevekt: <span class="f">E<sub>B</sub></span> stiger til nåverdien av B-aksjonærenes kontantstrøm, slik at <span class="f">V<sub>A</sub> = V<sub>B</sub></span>.</li><li>Navngi teoremet og list forutsetningene for perfekt kapitalmarked.</li></ol>`,
            ],
            fasit: `<p>B er undervurdert. Short A og kjøp B:</p>
<div class="calc">Short A:            +100
Kjøp B:              −54
Lån ut resten:       −46
Netto i t = 0:         0

t = 1: 66 + 46(1.1) − 110 = 66 + 50.6 − 110 = 6.6</div>
<p>Ingen egen kapital trengs. Arbitrasjen presser kursen på B opp til E<sub>B</sub> = 60, slik at E<sub>A</sub> = 100 og V<sub>A</sub> = V<sub>B</sub> = 100.</p>
<p><b>MM I (irrelevansteoremet):</b> i et perfekt kapitalmarked er firmaets totale verdi uavhengig av kapitalstrukturen.</p>
<p>Perfekt kapitalmarked (forelesning 2): investorer og firmaer handler de samme verdipapirene til konkurransedyktige priser lik nåverdien av kontantstrømmene, ingen skatter, transaksjonskostnader eller emisjonskostnader og finansieringsvalget endrer verken kontantstrømmene fra investeringene eller avslører ny informasjon.</p>` },
        ] },
      /* ---------------- 3 ---------------- */
      { nr: 3, niva: 2, tema: "M&M", tittel: "Mercer Corp.",
        intro: `<p>Mercer Corp. is a firm with 10 million shares outstanding and $100 million worth of debt outstanding. Its current share price is $75. Mercer's equity cost of capital is 8.5%. Mercer has just announced that it will issue $350 million worth of debt. It will use the proceeds from this debt to pay off its existing debt and use the remaining $250 million to pay an immediate dividend. Assume perfect capital markets.</p>`,
        deler: [
          { l: "a",
            q: `<p>Estimate Mercer's share price just after the recapitalization is announced, but before the transaction occurs.</p>`,
            hint: [
              `<p>Hva skjer med firmaverdien ved en ren refinansiering i et perfekt marked?</p>`,
              `<p>MM I: firmaverdien endres ikke. Kunngjøringen gir ingen ny informasjon om eiendelene.</p>`,
              `<p>Aksjonærene vil få utbyttet, men verdien av det er allerede deres. Totalverdien per aksje er derfor den samme.</p>`,
              `<ol><li>Fastslå at dette er en ren rekapitalisering.</li><li>Under MM endres ikke V og aksjonærene eier fortsatt det samme.</li><li>Kursen etter kunngjøring = dagens kurs.</li></ol>`,
            ],
            fasit: `<p>MM: ingen endring. Kursen er $75.</p>` },
          { l: "b",
            q: `<p>Estimate Mercer's share price at the conclusion of the transaction. (Hint: use the market value balance sheet.)</p>`,
            hint: [
              `<p>Utbyttet tar verdi ut av aksjene. Sett opp markedsverdibalansen før og etter.</p>`,
              `<span class="f">V = E + D</span>. V er uendret, men D øker.`,
              `<p>Finn V fra dagens aksjeverdi og gammel gjeld. Etter transaksjonen er egenkapitalen V minus ny gjeld. Antall aksjer er uendret, siden dette er utbytte og ikke tilbakekjøp.</p>`,
              `<ol><li><span class="f">V = P × n + D<sub>gammel</sub></span>.</li><li><span class="f">E<sub>ny</sub> = V − D<sub>ny</sub></span>.</li><li><span class="f">P<sub>ny</sub> = E<sub>ny</sub> / n</span>.</li><li>Kontroll: <span class="f">P<sub>ny</sub></span> + utbytte per aksje skal bli gammel kurs.</li></ol>`,
            ],
            fasit: `<div class="calc">V = 75 × 10 + 100 = 850 mill.
Ny gjeld = 350 mill.
E = 850 − 350 = 500 mill.
P = 500 / 10 = $50

Kontroll: 50 + 250/10 = 75</div>` },
          { l: "c",
            q: `<p>Suppose Mercer's existing debt was risk-free with a 4.25% expected return, and its new debt is risky with a 5% expected return. Estimate Mercer's equity cost of capital after the transaction.</p>`,
            hint: [
              `<p>Avkastningskravet på eiendelene (<span class="f">r<sub>U</sub></span>) endres ikke av refinansieringen. Finn det først.</p>`,
              `<span class="f">r<sub>U</sub></span> er WACC før skatt med gammel struktur. Deretter MM II med ny struktur.`,
              `<p>Før: <span class="f">r<sub>U</sub> = (E/V) r<sub>E</sub> + (D/V) r<sub>D</sub></span>. Etter: <span class="f">r<sub>E</sub> = r<sub>U</sub> + D/E (r<sub>U</sub> − r<sub>D</sub>)</span> med ny gjeldsrente og nye verdier fra (b).</p>`,
              `<ol><li>Vekter før: E/V og D/V med gamle markedsverdier.</li><li><span class="f">r<sub>U</sub></span> = vektet snitt av gammel <span class="f">r<sub>E</sub></span> og gammel <span class="f">r<sub>D</sub></span>.</li><li>D/E etter: ny gjeld delt på ny egenkapital fra (b).</li><li><span class="f">r<sub>E,ny</sub> = r<sub>U</sub> + D/E × (r<sub>U</sub> − r<sub>D,ny</sub>)</span>.</li></ol>`,
            ],
            fasit: `<div class="calc">r_U = (750/850)(8.5%) + (100/850)(4.25%) = 8%
r_E = 8% + (350/500)(8% − 5%) = 10.1%</div>` },
        ] },
      /* ---------------- 4 ---------------- */
      { nr: 4, niva: 2, tema: "Leveraged Recapitalization", tittel: "XYZ Co.",
        intro: `<p>The XYZ Co. is assessing its current capital structure and its implications for the welfare of its security holders. XYZ is currently financed entirely with equity, of which 1,000 shares are outstanding. Given the risk of the underlying cash flows generated by XYZ, investors currently require a 20% return on equity. The company pays out all free cash flows as dividends to shareholders. XYZ estimates that earnings may be either $1000, $2000, or $4200 with respective probabilities of 0.1, 0.4, and 0.5 depending on future economic conditions. Further, the firm expects to produce a constant stream of cash flows in perpetuity. There are no capital expenditures or changes in net working capital. Assume that corporate taxes are zero and that the firm operates in a perfect capital market.</p>`,
        deler: [
          { l: "a",
            q: `<p>Compute firm value and the firm's stock price.</p>`,
            hint: [
              `<p>Alt betales ut som utbytte og kontantstrømmen er konstant for alltid.</p>`,
              `<p>Forventet kontantstrøm, deretter evigvarende annuitet: <span class="f">V = E[CF] / r</span>.</p>`,
              `<span class="f">E[CF] = Σ p<sub>i</sub> × CF<sub>i</sub></span>. Siden firmaet er helt egenkapitalfinansiert er <span class="f">r = r<sub>U</sub> = r<sub>E</sub></span>. Kurs = V / antall aksjer.`,
              `<ol><li>Regn forventet inntjening som sannsynlighetsvektet snitt.</li><li><span class="f">V = E[inntjening] / r<sub>E</sub></span>.</li><li><span class="f">P = V / n</span>.</li></ol>`,
            ],
            fasit: `<span class="own">Egen utregning. Offisiell fasit: Excel-filen «PS1-E4» på Canvas</span>
<div class="calc">E[CF] = 0.1(1000) + 0.4(2000) + 0.5(4200) = 3000
V = 3000 / 0.20 = 15 000
P = 15 000 / 1000 = $15</div>` },
          { l: "b",
            q: `<p>The CEO of XYZ has come to the conclusion that shareholders would be better off if the company had equal proportions of debt and equity. He therefore proposes to issue $7,500 of debt at an interest rate of 10% and to use the proceeds to repurchase equity. Analyze this proposition:</p><ul><li>Calculate the share price following the announcement</li><li>How many shares does the company repurchase?</li><li>What is the required rate of return on equity? What are the firm's earnings? Show that equity value indeed equals 7500</li></ul>`,
            hint: [
              `<p>Ingen skatt og perfekt marked. Hva sier MM om kursen og om avkastningskravet?</p>`,
              `<p>Kunngjøringen endrer ikke kursen (MM I). Avkastningskravet på egenkapitalen følger MM II: <span class="f">r<sub>E</sub> = r<sub>U</sub> + D/E (r<sub>U</sub> − r<sub>D</sub>)</span>.</p>`,
              `<p>Tilbakekjøp til uendret kurs. Inntjening til aksjonærer = forventet inntjening minus rentekostnad. Egenkapitalverdi = den inntjeningen / <span class="f">r<sub>E</sub></span> (evigvarende).</p>`,
              `<ol><li>Kurs etter kunngjøring = kursen fra (a).</li><li>Antall tilbakekjøpt = <span class="f">D / P</span>.</li><li><span class="f">E = V − D</span>, regn D/E.</li><li><span class="f">r<sub>E</sub> = r<sub>U</sub> + D/E × (r<sub>U</sub> − r<sub>D</sub>)</span>.</li><li>Inntjening til aksjonærer = <span class="f">E[CF] − r<sub>D</sub> × D</span>.</li><li>Kontroller: inntjening / <span class="f">r<sub>E</sub></span> skal bli lik <span class="f">V − D</span>.</li></ol>`,
            ],
            fasit: `<span class="own">Egen utregning. Offisiell fasit: Excel-filen «PS1-E4» på Canvas</span>
<div class="calc">Kurs etter kunngjøring = $15 (MM)
Tilbakekjøp = 7500 / 15 = 500 aksjer

D/E = 7500 / 7500 = 1
r_E = 20% + 1 × (20% − 10%) = 30%

Inntjening til EK = 3000 − 0.10 × 7500 = 2250
E = 2250 / 0.30 = 7500  ✓</div>
<p>Aksjonærene blir ikke bedre stilt. Kursen er uendret og høyere forventet avkastning er kompensasjon for høyere risiko.</p>` },
          { l: "c",
            ctx: `Lift the assumption of no corporate taxes and instead assume that the corporate tax rate is 40%.`,
            q: `<p>Compute firm value and the firm's stock price in case of all-equity financing.</p>`,
            hint: [
              `<p>Skatten tar en del av kontantstrømmen før den når aksjonærene.</p>`,
              `<p>Kontantstrøm etter skatt = <span class="f">EBIT × (1 − τ)</span>. <span class="f">V<sub>U</sub></span> = forventet kontantstrøm etter skatt / <span class="f">r<sub>U</sub></span>.</p>`,
              `<p>Samme oppsett som (a), men med kontantstrøm etter skatt.</p>`,
              `<ol><li>Forventet inntjening før skatt (fra (a)).</li><li>Gang med <span class="f">(1 − τ)</span>.</li><li>Del på <span class="f">r<sub>U</sub></span>.</li><li>Del på antall aksjer.</li></ol>`,
            ],
            fasit: `<span class="own">Egen utregning. Offisiell fasit: Excel-filen «PS1-E4» på Canvas</span>
<div class="calc">CF etter skatt = 3000 × (1 − 0.4) = 1800
V_U = 1800 / 0.20 = 9000
P = 9000 / 1000 = $9</div>` },
          { l: "d",
            q: `<p>Assume the firm goes through with the recapitalization and adds $7,500 of permanent (fixed) debt:</p><ul><li>Calculate the share price following the announcement</li><li>How many shares does the company repurchase?</li><li>Who captures the value from the recapitalization?</li></ul>`,
            hint: [
              `<p>Nå gir gjelden et rentefradrag. Hva er verdien av det?</p>`,
              `<p>Permanent gjeld: <span class="f">PV(skatteskjold) = τ × D</span>. <span class="f">V<sub>L</sub> = V<sub>U</sub> + τD</span>.</p>`,
              `<p>Markedet priser inn skatteskjoldet ved kunngjøring, før tilbakekjøpet skjer. Ny kurs = <span class="f">V<sub>L</sub></span> fordelt på det opprinnelige antallet aksjer. Tilbakekjøpet skjer til den nye kursen.</p>`,
              `<ol><li><span class="f">PV(skatteskjold) = τ × D</span>.</li><li><span class="f">V<sub>L</sub> = V<sub>U</sub> + τD</span>.</li><li>Kurs etter kunngjøring = <span class="f">V<sub>L</sub> / n<sub>opprinnelig</sub></span>.</li><li>Antall tilbakekjøpt = <span class="f">D / P<sub>ny</sub></span>.</li><li>Kontroll: <span class="f">V<sub>L</sub> − D</span> = ny kurs × gjenværende aksjer.</li><li>Sammenlign kursen før og etter kunngjøring for å se hvem som får gevinsten.</li></ol>`,
            ],
            fasit: `<span class="own">Egen utregning. Offisiell fasit: Excel-filen «PS1-E4» på Canvas</span>
<div class="calc">PV(skatteskjold) = 0.4 × 7500 = 3000
V_L = 9000 + 3000 = 12 000
Kurs etter kunngjøring = 12 000 / 1000 = $12
Tilbakekjøp = 7500 / 12 = 625 aksjer

Kontroll: E = 12 000 − 7500 = 4500 = 375 × 12  ✓</div>
<p>De eksisterende aksjonærene tar hele gevinsten. Kursen stiger fra $9 til $12 ved kunngjøring, altså 3 × 1000 = 3000, som er nåverdien av skatteskjoldet. Både de som selger i tilbakekjøpet og de som blir sittende får $12 per aksje.</p>` },
        ] },
      /* ---------------- 5 ---------------- */
      { nr: 5, niva: 1, tema: "Costs of Distress", tittel: "Gladstone Corporation",
        intro: `<p>Gladstone Corporation is about to launch a new product. Depending on the success of the new product, Gladstone may have one of four values next year: $150 million, $135 million, $95 million, or $80 million. These outcomes are all equally likely, and this risk is diversifiable. Suppose the risk-free interest rate is 5% and that, in the event of default, 25% of the value of Gladstone's assets will be lost to bankruptcy costs. (Ignore all other market imperfections, such as taxes.)</p>`,
        deler: [
          { l: "a",
            q: `<p>What is the initial value of Gladstone's equity without leverage?</p>`,
            hint: [
              `<p>Risikoen er diversifiserbar. Hvilken rente skal du da diskontere med?</p>`,
              `<p>Diversifiserbar risiko gir ingen risikopremie, så diskonter med <span class="f">r<sub>f</sub></span>. <span class="f">V = E[V<sub>1</sub>] / (1 + r<sub>f</sub>)</span>.</p>`,
              `<p>Alle utfallene er like sannsynlige, så forventet verdi er et vanlig gjennomsnitt.</p>`,
              `<ol><li>Ta gjennomsnittet av de fire verdiene.</li><li>Del på <span class="f">1 + r<sub>f</sub></span>.</li></ol>`,
            ],
            fasit: `<div class="calc">E = 0.25 × (150 + 135 + 95 + 80) / 1.05 = $109.52 mill.</div>` },
          { l: "b",
            ctx: `Now suppose Gladstone has zero-coupon debt with a $100 million face value due next year.`,
            q: `<p>What is the initial value of Gladstone's debt?</p>`,
            hint: [
              `<p>Gjeldseierne får full pålydende når firmaet er verdt nok. Ellers overtar de det som er igjen etter konkurskostnadene.</p>`,
              `<p>Payoff til gjeld per utfall: <span class="f">F</span> hvis <span class="f">V ≥ F</span>, ellers <span class="f">(1 − c) × V</span>, der c er andelen tapt i konkurs.</p>`,
              `<p>Finn hvilke utfall som er under pålydende. Ta forventet payoff over alle fire og diskonter med <span class="f">r<sub>f</sub></span>.</p>`,
              `<ol><li>For hvert utfall: sjekk om <span class="f">V ≥ F</span>.</li><li>Hvis ja: gjelden får <span class="f">F</span>. Hvis nei: gjelden får <span class="f">(1 − c) × V</span>.</li><li>Ta snittet av de fire payoffene.</li><li>Del på <span class="f">1 + r<sub>f</sub></span>.</li></ol>`,
            ],
            fasit: `<div class="calc">D = 0.25 × (100 + 100 + 0.75×95 + 0.75×80) / 1.05 = $78.87 mill.</div>` },
          { l: "c",
            q: `<p>What is the yield-to-maturity of the debt? What is its expected return?</p>`,
            hint: [
              `<p>YTM er den lovte avkastningen hvis alt betales. Forventet avkastning tar hensyn til mislighold.</p>`,
              `<span class="f">YTM = F / D<sub>0</sub> − 1</span>. For forventet avkastning: hva sier diversifiserbar risiko om avkastningskravet?`,
              `<p>Gjelden er priset ved å diskontere forventet payoff med <span class="f">r<sub>f</sub></span>, så forventet avkastning blir per konstruksjon lik <span class="f">r<sub>f</sub></span>.</p>`,
              `<ol><li><span class="f">YTM = pålydende / pris − 1</span>.</li><li>Forventet avkastning = <span class="f">E[payoff] / pris − 1</span>, som blir <span class="f">r<sub>f</sub></span>.</li><li>Forklar gapet: YTM er høyere fordi den forutsetter full betaling i alle utfall.</li></ol>`,
            ],
            fasit: `<div class="calc">YTM = 100 / 78.87 − 1 = 26.79%
Forventet avkastning = 5%</div>` },
          { l: "d",
            q: `<p>What is the initial value of Gladstone's equity? What is Gladstone's total value with leverage?</p>`,
            hint: [
              `<p>Egenkapitalen får det som er igjen etter gjelden og ingenting ved konkurs.</p>`,
              `<p>Payoff til egenkapital per utfall: <span class="f">max(V − F, 0)</span>.</p>`,
              `<p>Ta forventet payoff, diskonter og legg til gjeldsverdien fra (b). Sammenlign med (a): differansen er nåverdien av konkurskostnadene.</p>`,
              `<ol><li>For hvert utfall: <span class="f">max(V − F, 0)</span>.</li><li>Ta snittet og del på <span class="f">1 + r<sub>f</sub></span>.</li><li><span class="f">V<sub>L</sub> = D + E</span>.</li><li>Sammenlign med <span class="f">V<sub>U</sub></span> fra (a).</li></ol>`,
            ],
            fasit: `<div class="calc">E = 0.25 × (50 + 35 + 0 + 0) / 1.05 = $20.24 mill.
V = D + E = 78.87 + 20.24 = $99.11 mill.</div>
<p>V<sub>U</sub> − V<sub>L</sub> = 10.41 mill. er nåverdien av forventede konkurskostnader.</p>` },
          { l: "e",
            ctx: `Suppose Gladstone has 10 million shares outstanding and no debt at the start of the year.`,
            q: `<p>If Gladstone does not issue debt, what is its share price?</p>`,
            hint: [
              `<p>Uten gjeld er egenkapitalen hele firmaet.</p>`,
              `<p>Kurs = <span class="f">V<sub>U</sub> / n</span>.</p>`,
              `<p>Bruk verdien fra (a).</p>`,
              `<ol><li>Ta <span class="f">V<sub>U</sub></span> fra (a).</li><li>Del på antall aksjer.</li></ol>`,
            ],
            fasit: `<div class="calc">P = 109.52 / 10 = $10.95 per aksje</div>` },
          { l: "f",
            q: `<p>If Gladstone issues debt of $100 million due next year and uses the proceeds to repurchase shares, what will its share price be? Why does your answer differ from that in part (e)?</p>`,
            hint: [
              `<p>Aksjonærene bærer de forventede konkurskostnadene og markedet priser dem inn med en gang.</p>`,
              `<p>Gjelden selges for verdien i (b), ikke for pålydende. Etter transaksjonen gjelder <span class="f">P<sub>1</sub> = E<sub>1</sub> / (n − g)</span> og <span class="f">D<sub>0</sub> = P<sub>1</sub> × g</span>, der g er antall tilbakekjøpte aksjer.</p>`,
              `<p>Kombiner de to likningene: <span class="f">P<sub>1</sub> × n = E<sub>1</sub> + D<sub>0</sub> = V<sub>L</sub></span>. Kursen blir altså giret firmaverdi per opprinnelig aksje.</p>`,
              `<ol><li>Proveny = gjeldsverdien fra (b).</li><li>Sett opp <span class="f">P<sub>1</sub> = E<sub>1</sub> / (n − g)</span> og <span class="f">D = P<sub>1</sub> × g</span>.</li><li>Løs: <span class="f">P<sub>1</sub> = (E<sub>1</sub> + D) / n = V<sub>L</sub> / n</span>.</li><li><span class="f">g = D / P<sub>1</sub></span>.</li><li>Forklar forskjellen fra (e) med nåverdien av konkurskostnadene.</li></ol>`,
            ],
            fasit: `<div class="calc">Proveny fra gjeld = 78.87 mill.
P_1 = (20.24 + 78.87) / 10 = $9.91
g = 78.87 / 9.91 = 7.96 mill. aksjer
Kontroll: 20.24 / (10 − 7.96) = 9.91</div>
<p>Kursen er lavere enn i (e) fordi aksjonærene bærer nåverdien av de forventede konkurskostnadene og dette prises inn når gjelden tas opp.</p>` },
        ] },
      /* ---------------- 6 ---------------- */
      { nr: 6, niva: 2, tema: "Debt Overhang", tittel: "MXK",
        intro: `<p>Consider the company MXK that generates the following risky cash flow: With probability ½ the company is in a boom next year and free cash flow equals $150. With probability ½ the company is in a recession next year and free cash flow equals $50. MXK has a debt obligation that is due next year with a face value of $100. Suppose that the manager is the sole equity owner of the company. Everyone is risk neutral and there is no discounting.</p>`,
        deler: [
          { l: "a",
            q: `<p>Calculate the present value of MXK's debt and equity claims.</p>`,
            hint: [
              `<p>Gjelden får full betaling bare i boom. I resesjon tar gjeldseierne alt.</p>`,
              `<span class="f">D = E[min(CF, F)]</span> og <span class="f">E = E[max(CF − F, 0)]</span>. Ingen diskontering.`,
              `<p>Regn payoff til gjeld og egenkapital i hver tilstand og vekt med ½.</p>`,
              `<ol><li>Gjeld per tilstand: <span class="f">min(CF, F)</span>.</li><li>Egenkapital per tilstand: <span class="f">max(CF − F, 0)</span>.</li><li>Ta forventning med sannsynlighetene.</li><li>Kontroll: <span class="f">D + E = E[CF]</span>.</li></ol>`,
            ],
            fasit: `<div class="calc">D = ½(100) + ½(50) = 75
E = ½(50) + ½(0) = 25
V = 100</div>` },
          { l: "b",
            q: `<p>MXK can undertake an investment project that requires an investment of $24. If this project is undertaken, the company's cash flow increases from $150 to $180 in a boom, and from $50 to $80 in a recession. What is the NPV of this investment project? Suppose the manager considers financing the project by selling equity to new investors in a competitive stock market. What is the manager's payoff if he issues equity and undertakes the project? Would he want to do this? Discuss.</p>`,
            hint: [
              `<p>Prosjektet er lønnsomt for firmaet. Men hvem får gevinsten når gjelden ligger foran egenkapitalen?</p>`,
              `<p>NPV = forventet økning i kontantstrøm − investering. Nye investorer må få en andel x som akkurat gir dem tilbake investeringen (konkurranse).</p>`,
              `<p>Break-even: <span class="f">x × E[EK-payoff med prosjekt] = I</span>. Managerens payoff er <span class="f">(1 − x)</span> av den samme egenkapitalverdien. Sammenlign med egenkapitalverdien uten prosjekt fra (a).</p>`,
              `<ol><li><span class="f">NPV = E[ΔCF] − I</span>.</li><li>Egenkapital-payoff med prosjekt per tilstand: <span class="f">max(CF<sub>ny</sub> − F, 0)</span>.</li><li>Forventet egenkapitalverdi med prosjekt.</li><li><span class="f">x = I / E[EK med prosjekt]</span>.</li><li>Managerens payoff = <span class="f">(1 − x) × E[EK med prosjekt]</span>.</li><li>Sammenlign med (a) og forklar ved å se på hva som skjer med gjeldsverdien.</li></ol>`,
            ],
            fasit: `<div class="calc">NPV = 30 − 24 = 6

Break-even nye investorer:
x × [½(180 − 100) + ½ × 0] = 24  →  x = 24/40 = 60%

Managerens payoff: 40% × 40 = 16 < 25</div>
<p>Nei, manageren vil ikke investere. Med prosjektet blir gjelden risikofri (verdi 100 mot 75), så gjeldseierne får en gevinst på 25 mens prosjektet bare skaper 6. Aksjonærene taper differansen. Dette er debt overhang.</p>` },
          { l: "c",
            q: `<p>Suppose the manager offers existing debt holders to renegotiate their current claim which has a face value of $100: He offers to replace the existing debt contract with a new contract that stipulates a lower face value of $80. Suppose that if the debt holders reject the offer, the old contract remains in place and the face value remains at $100. If the debt holders accept the offer, will the manager subsequently want to issue equity to undertake the investment project described in part b)? Will the debtholders agree to renegotiate?</p>`,
            hint: [
              `<p>Lavere pålydende gjør at mer av prosjektgevinsten tilfaller egenkapitalen.</p>`,
              `<p>Gjenta beregningen fra (b) med ny pålydende. Gjeldseierne sammenligner verdien av ny gjeld (med prosjekt) med verdien av gammel gjeld (uten prosjekt).</p>`,
              `<p>Hvis de avslår, investerer ikke manageren, så alternativet deres er gjeldsverdien fra (a).</p>`,
              `<ol><li>Egenkapital-payoff med prosjekt og ny pålydende per tilstand.</li><li>Ny <span class="f">x = I / E[EK]</span>.</li><li>Managerens payoff = <span class="f">(1 − x) × E[EK]</span>. Sammenlign med (a).</li><li>Hvis han investerer: gjeldsverdi = <span class="f">E[min(CF<sub>ny</sub>, F<sub>ny</sub>)]</span>.</li><li>Sammenlign med gjeldsverdien i (a).</li></ol>`,
            ],
            fasit: `<div class="calc">x × [½(180 − 80) + ½ × 0] = 24  →  x = 24/50 = 48%
Managerens payoff: 52% × 50 = 26 > 25

Ny gjeld: ½(80) + ½(80) = 80 > 75</div>
<p>Ja, manageren investerer og gjeldseierne aksepterer fordi 80 > 75.</p>` },
        ] },
      /* ---------------- 7 ---------------- */
      { nr: 7, niva: 1, tema: "Risk Shifting", tittel: "Zymase",
        intro: `<p>Zymase is a biotechnology start-up firm. Researchers at Zymase must choose one of three different research strategies. The payoffs (after-tax) and their likelihood for each strategy are shown below. The risk of each project is diversifiable.</p>
<div class="tblwrap"><table class="tbl"><thead><tr><th>Strategy</th><th>Probability</th><th>Payoff ($ mill.)</th></tr></thead><tbody>
<tr><td>A</td><td>100%</td><td>75</td></tr>
<tr><td rowspan="2">B</td><td>50%</td><td>140</td></tr><tr><td>50%</td><td>0</td></tr>
<tr><td rowspan="2">C</td><td>10%</td><td>300</td></tr><tr><td>90%</td><td>40</td></tr>
</tbody></table></div>`,
        deler: [
          { l: "a",
            q: `<p>Which project has the highest expected payoff?</p>`,
            hint: [
              `<p>Forventet payoff for hele firmaet, uten å tenke på hvem som eier hva.</p>`,
              `<span class="f">E[payoff] = Σ p × payoff</span> for hver strategi.`,
              `<p>Regn ut for A, B og C og sammenlign.</p>`,
              `<ol><li>Sannsynlighetsvektet snitt for A.</li><li>Det samme for B.</li><li>Det samme for C.</li><li>Velg den høyeste.</li></ol>`,
            ],
            fasit: `<div class="calc">E(A) = 75
E(B) = 0.5 × 140 = 70
E(C) = 0.1 × 300 + 0.9 × 40 = 66</div><p>A har høyest forventet payoff.</p>` },
          { l: "b",
            q: `<p>Suppose Zymase has debt of $40 million due at the time of the project's payoff. Which project has the highest expected payoff for equity holders?</p>`,
            hint: [
              `<p>Egenkapitalen er en kjøpsopsjon på firmaet. Den bryr seg bare om utfallene over gjeldsnivået.</p>`,
              `<p>Egenkapital-payoff = <span class="f">max(payoff − D, 0)</span> i hvert utfall.</p>`,
              `<p>Trekk gjelden fra i hvert utfall (aldri under null) og ta forventning for hver strategi.</p>`,
              `<ol><li>For hvert utfall i hver strategi: <span class="f">max(payoff − D, 0)</span>.</li><li>Ta sannsynlighetsvektet snitt per strategi.</li><li>Velg den som gir mest til egenkapitalen.</li></ol>`,
            ],
            fasit: `<div class="calc">E(A) = 75 − 40 = 35
E(B) = 0.5 × (140 − 40) = 50
E(C) = 0.1 × (300 − 40) + 0.9 × (40 − 40) = 26</div><p>B er best for aksjonærene.</p>` },
          { l: "c",
            q: `<p>Suppose Zymase has debt of $110 million due at the time of the project's payoff. Which project has the highest expected payoff for equity holders?</p>`,
            hint: [
              `<p>Samme logikk som (b), men nå er gjelden høyere. Hvilke utfall gir fortsatt noe til egenkapitalen?</p>`,
              `<span class="f">max(payoff − D, 0)</span> med ny gjeld.`,
              `<p>Merk at strategi A nå gir null til egenkapitalen. Jo høyere gjeld, desto mer attraktiv blir høy risiko for aksjonærene.</p>`,
              `<ol><li>For hvert utfall: <span class="f">max(payoff − D, 0)</span> med ny D.</li><li>Ta snittet per strategi.</li><li>Velg den høyeste.</li></ol>`,
            ],
            fasit: `<div class="calc">E(A) = 0
E(B) = 0.5 × (140 − 110) = 15
E(C) = 0.1 × (300 − 110) = 19</div><p>C er best for aksjonærene.</p>` },
          { l: "d",
            q: `<p>If management chooses the strategy that maximizes the payoff to equity holders, what is the expected agency cost to the firm from having $40 million in debt due? What is the expected agency cost to the firm from having $110 million in debt due?</p>`,
            hint: [
              `<p>Agentkostnaden er verdien firmaet taper fordi aksjonærene ikke velger det beste prosjektet for firmaet.</p>`,
              `<p>Agentkostnad = forventet firmapayoff for beste prosjekt − forventet firmapayoff for prosjektet aksjonærene velger.</p>`,
              `<p>Bruk firmaverdiene fra (a) og valgene fra (b) og (c).</p>`,
              `<ol><li>Beste prosjekt for firmaet fra (a).</li><li>Prosjekt valgt av aksjonærene ved hvert gjeldsnivå fra (b) og (c).</li><li>Agentkostnad = differansen i forventet firmapayoff fra (a).</li></ol>`,
            ],
            fasit: `<div class="calc">D = 40:  B velges  →  75 − 70 = $5 mill.
D = 110: C velges  →  75 − 66 = $9 mill.</div>` },
        ] },
      /* ---------------- 8 ---------------- */
      { nr: 8, niva: 2, tema: "Risk Shifting", tittel: "Hillton Hotels",
        intro: `<p>Assume a firm called "Hillton Hotels", which is only active for one period. All investors are risk-neutral, the discount rate is zero, and there are no taxes. Hillton Hotels consists of two divisions, "Paris Hotel Management" and "Nicole Property Development." The cash flows that each division will give depends on whether there is a boom or a bust in the economy, as follows:</p>
<div class="tblwrap"><table class="tbl"><thead><tr><th>Division</th><th>Boom</th><th>Bust</th></tr></thead><tbody>
<tr><td>Nicole</td><td>150</td><td>50</td></tr><tr><td>Paris</td><td>130</td><td>70</td></tr></tbody></table></div>
<p>Boom and bust are equally likely and occur with probability ½. Hillton currently has 100 of debt outstanding, due next period, which is backed by the combined cash flow of the two divisions.</p>`,
        deler: [
          { l: "a",
            q: `<p>What is currently the value of the equity and debt of Hillton Hotels?</p>`,
            hint: [
              `<p>Gjelden er sikret i den samlede kontantstrømmen fra begge divisjonene.</p>`,
              `<p>Slå sammen kontantstrømmene per tilstand. <span class="f">D = E[min(CF, F)]</span> og <span class="f">E = E[max(CF − F, 0)]</span>.</p>`,
              `<p>Sjekk om den samlede kontantstrømmen dekker gjelden også i bust.</p>`,
              `<ol><li>Samlet CF i boom og i bust.</li><li>Gjeld per tilstand: <span class="f">min(CF, F)</span>.</li><li>Egenkapital per tilstand: <span class="f">max(CF − F, 0)</span>.</li><li>Ta forventning.</li></ol>`,
            ],
            fasit: `<span class="own">Egen utregning. Offisiell fasit: Excel-filen «PS1-E8» på Canvas</span>
<div class="calc">Samlet CF: boom 280, bust 120
D = ½(100) + ½(100) = 100  (risikofri)
E = ½(180) + ½(20) = 100
V = 200</div>` },
          { l: "b",
            ctx: `The CEO of Hillton is considering splitting the firm into two separate firms, "Nicole Corp" and "Paris Corp", in a spin-off. After reading the debt covenants carefully, the CEO has discovered that she could put all of the debt on one of the firms, making the other firm debt free. A spin-off would be costly, however, since there are synergies between the two divisions. If the divisions were separated into two firms, the cash flows would therefore decrease by 10 for each of the firms in each of the states:
<div class="tblwrap"><table class="tbl"><thead><tr><th>Division</th><th>Boom</th><th>Bust</th></tr></thead><tbody>
<tr><td>Nicole</td><td>140</td><td>40</td></tr><tr><td>Paris</td><td>120</td><td>60</td></tr></tbody></table></div>`,
            q: `<p>If the CEO wants to maximize shareholder value, which of the two divisions should be allocated the debt and which one should be debt-free? What would the value of the debt (which will now only be backed by the cash flows of one division) be after the spin-off?</p>`,
            hint: [
              `<p>Aksjonærene tjener på å legge gjelden der den er mest risikabel, fordi da overføres mer tap til gjeldseierne.</p>`,
              `<p>Regn ut begge alternativene. For selskapet med gjeld: <span class="f">D = E[min(CF, F)]</span> og <span class="f">E = E[max(CF − F, 0)]</span>. Det gjeldfrie selskapet har <span class="f">E = E[CF]</span>.</p>`,
              `<p>Total egenkapital = egenkapital i selskapet med gjeld + verdien av det gjeldfrie selskapet. Velg alternativet med høyest total egenkapital.</p>`,
              `<ol><li>Alternativ 1: gjeld på Nicole. Regn D og E for Nicole og E for Paris.</li><li>Alternativ 2: gjeld på Paris. Regn D og E for Paris og E for Nicole.</li><li>Summer egenkapitalen i hvert alternativ.</li><li>Velg det høyeste og oppgi gjeldsverdien i det alternativet.</li></ol>`,
            ],
            fasit: `<span class="own">Egen utregning. Offisiell fasit: Excel-filen «PS1-E8» på Canvas</span>
<div class="calc">Gjeld på Nicole (140 / 40):
  D = ½(100) + ½(40) = 70
  E_Nicole = ½(40) + ½(0) = 20
  E_Paris = ½(120) + ½(60) = 90
  Total EK = 110

Gjeld på Paris (120 / 60):
  D = ½(100) + ½(60) = 80
  E_Paris = ½(20) + ½(0) = 10
  E_Nicole = ½(140) + ½(40) = 90
  Total EK = 100</div>
<p>Legg gjelden på Nicole (den mest risikable divisjonen) og la Paris være gjeldfri. Gjelden er da verdt 70.</p>` },
          { l: "c",
            q: `<p>What would the net gain or loss be to shareholders if the CEO went ahead with the spin-off?</p>`,
            hint: [
              `<p>Sammenlign egenkapitalverdien før og etter spin-off.</p>`,
              `<p>Gevinst = total egenkapital etter (fra (b)) − egenkapital før (fra (a)).</p>`,
              `<p>Se også på hva som skjer med total firmaverdi og gjeldsverdi. Hvem betaler for aksjonærenes gevinst?</p>`,
              `<ol><li>Total egenkapital etter spin-off fra (b).</li><li>Trekk fra egenkapital før fra (a).</li><li>Sjekk endringen i firmaverdi (synergitap) og i gjeldsverdi.</li><li>Forklar at aksjonærene vinner på bekostning av gjeldseierne selv om firmaet samlet taper verdi.</li></ol>`,
            ],
            fasit: `<span class="own">Egen utregning. Offisiell fasit: Excel-filen «PS1-E8» på Canvas</span>
<div class="calc">Aksjonærer:  110 − 100 = +10
Gjeldseiere:  70 − 100 = −30
Firma:       180 − 200 = −20 (tapte synergier)</div>
<p>Aksjonærene tjener 10, selv om transaksjonen ødelegger 20 i verdi. Gjeldseierne taper 30.</p>` },
          { l: "d",
            q: `<p>In general, are debt covenants that prohibit these types of transactions good or bad for equity holders?</p>`,
            hint: [
              `<p>Skill mellom ex post (gjelden er allerede tatt opp) og ex ante (når gjelden prises).</p>`,
              `<p>Kreditorer er rasjonelle og forventer at aksjonærene kan gjøre slike transaksjoner.</p>`,
              `<p>Uten covenants krever kreditorene høyere rente for å kompensere for risk shifting. Hvem bærer da kostnaden av verdiødeleggende transaksjoner?</p>`,
              `<ol><li>Ex post: covenants hindrer aksjonærene i å ta gevinsten i (c).</li><li>Ex ante: kreditorer priser inn muligheten for risk shifting.</li><li>Uten covenants: høyere lånekostnad og aksjonærene bærer det forventede verditapet.</li><li>Konkluder: covenants er generelt gode for aksjonærene fordi de senker lånekostnaden og hindrer verdiødeleggelse.</li></ol>`,
            ],
            fasit: `<span class="own">Egen vurdering. Offisiell fasit: Excel-filen «PS1-E8» på Canvas</span>
<p>Ex post er slike covenants dårlige for aksjonærene, fordi de hindrer gevinsten på 10. Ex ante er de gode: kreditorene forutser risk shifting og krever høyere rente når det ikke finnes covenants. Da bærer aksjonærene den forventede kostnaden uansett, inkludert verditapet på 20. Covenants lar firmaet forplikte seg til ikke å ødelegge verdi og det gir billigere gjeld. Generelt er de derfor gode for aksjonærene.</p>` },
        ] },
      /* ---------------- 9 ---------------- */
      { nr: 9, niva: 1, tema: "Asymmetric Information", tittel: "Info Systems Technology",
        intro: `<p>Info Systems Technology (IST) manufactures microprocessor chips for use in appliances and other applications. IST has no debt and 100 million shares outstanding. The correct price for these shares is either $14.50 or $12.50 per share. Investors view both possibilities as equally likely, so the shares currently trade for $13.50. IST must raise $500 million to build a new production facility. Because the firm would suffer a large loss of both customers and engineering talent in the event of financial distress, managers believe that if IST borrows the $500 million, the present value of financial distress costs will exceed any tax benefits by $20 million. At the same time, because investors believe that managers know the correct share price, IST faces a lemons problem if it attempts to raise the $500 million by issuing equity.</p>`,
        deler: [
          { l: "a",
            q: `<p>Suppose that if IST issues equity, the share price will remain $13.50. To maximize the long term share price of the firm once its true value is known, would managers choose to issue equity or borrow the $500 million if</p><ul><li>they know the correct value of the shares is $12.50?</li><li>they know the correct value of the shares is $14.50?</li></ul>`,
            hint: [
              `<p>Gjeld har en netto kostnad. Egenkapital solgt til feil pris overfører verdi mellom gamle og nye aksjonærer.</p>`,
              `<p>Antall nye aksjer = beløp / emisjonskurs. Overføring per ny aksje = emisjonskurs − sann verdi.</p>`,
              `<p>Er aksjen overpriset, er salget en gevinst for de gamle aksjonærene. Er den underpriset, er det en kostnad. Sammenlign med netto kostnad ved gjeld.</p>`,
              `<ol><li><span class="f">n<sub>ny</sub> = beløp / emisjonskurs</span>.</li><li>Total overføring = <span class="f">n<sub>ny</sub> × (emisjonskurs − sann verdi)</span>.</li><li>Netto kostnad ved gjeld er oppgitt.</li><li>Lav sann verdi: overføringen er en gevinst. Velg det som gir mest.</li><li>Høy sann verdi: overføringen er en kostnad. Velg det billigste.</li><li>Eventuelt per aksje: del gjeldskostnaden på gamle aksjer og overføringen på totalt antall etter emisjon.</li></ol>`,
            ],
            fasit: `<div class="calc">Nye aksjer = 500 / 13.50 ≈ 37 mill.
Gjeld: netto kostnad 20 mill. = $0.20 per aksje</div>
<ul><li><b>Sann verdi $12.50:</b> salg til $1 over verdi gir gevinst 37 mill., eller 37/137 = $0.27 per aksje. Velg egenkapital.</li>
<li><b>Sann verdi $14.50:</b> salg til $1 under verdi gir kostnad 37 mill., eller $0.27 per aksje. Velg gjeld.</li></ul>` },
          { l: "b",
            q: `<p>Given your answer to part (a), what should investors conclude if IST issues equity? What will happen to the share price?</p>`,
            hint: [
              `<p>Investorene vet hvilke typer firma som velger egenkapital i (a).</p>`,
              `<p>Valget av finansiering er et signal om hva ledelsen vet.</p>`,
              `<p>Bare den overprisede typen utsteder egenkapital.</p>`,
              `<ol><li>Se hvilken type som valgte egenkapital i (a).</li><li>Investorene trekker samme slutning.</li><li>Kursen justeres til den typens sanne verdi.</li></ol>`,
            ],
            fasit: `<p>Investorene konkluderer at IST er overpriset og kursen faller til $12.50.</p>` },
          { l: "c",
            q: `<p>Given your answer to part (a), what should investors conclude if IST issues debt? What will happen to the share price in that case?</p>`,
            hint: [
              `<p>Samme logikk som (b), bare motsatt.</p>`,
              `<p>Hvilken type valgte gjeld i (a)?</p>`,
              `<p>Gjeld er et signal om at ledelsen mener aksjen er underpriset.</p>`,
              `<ol><li>Se hvilken type som valgte gjeld i (a).</li><li>Kursen justeres til den typens sanne verdi.</li></ol>`,
            ],
            fasit: `<p>Investorene konkluderer at IST er undervurdert og kursen stiger til $14.50.</p>` },
          { l: "d",
            q: `<p>How would your answers change if there were no distress costs, but only tax benefits of leverage?</p>`,
            hint: [
              `<p>Nå er gjeld ikke lenger kostbart. Hvorfor skulle noen da velge egenkapital?</p>`,
              `<p>Uten kostnad ved gjeld er eneste grunn til å utstede egenkapital at aksjen er overpriset.</p>`,
              `<p>Investorene vet dette og priser enhver emisjon til laveste verdi. Hva blir da gevinsten ved å utstede egenkapital?</p>`,
              `<ol><li>Gjeld har nå en netto fordel.</li><li>Egenkapital velges bare av overprisede firmaer.</li><li>Investorene priser emisjoner deretter, så gevinsten forsvinner.</li><li>Konkluder om hva alle firmaer gjør (pecking order).</li></ol>`,
            ],
            fasit: `<p>Uten kostnader ved gjeld utstedes egenkapital bare hvis firmaet er overpriset. Investorene vet dette og kjøper bare til laveste verdi. Da er det ingen fordel ved egenkapital og alle firmaer utsteder gjeld.</p>` },
        ] },
      /* ---------------- 10 ---------------- */
      { nr: 10, niva: 3, tema: "Asymmetric Information", tittel: "AMC Corporation",
        intro: `<p>AMC Corporation currently has an enterprise value of $400 million and $100 million in excess cash. The firm has 10 million shares outstanding and no debt. Suppose AMC uses its excess cash to repurchase shares. After the share repurchase, news will come out that will change AMC's enterprise value to either $600 million or $200 million.</p>`,
        deler: [
          { l: "a",
            q: `<p>What is AMC's share price prior to the share repurchase?</p>`,
            hint: [
              `<p>Enterprise value tar ikke med kontantene.</p>`,
              `<span class="f">EV = E + D − kontanter</span>.`,
              `<p>Uten gjeld: <span class="f">E = EV + kontanter</span>.</p>`,
              `<ol><li><span class="f">E = EV + kontanter</span> (ingen gjeld).</li><li><span class="f">P = E / n</span>.</li></ol>`,
            ],
            fasit: `<div class="calc">E = 400 + 100 = 500 mill.
P = 500 / 10 = $50</div>` },
          { l: "b",
            q: `<p>What is AMC's share price after the repurchase if its enterprise value goes up? What is AMC's share price after the repurchase if its enterprise value declines?</p>`,
            hint: [
              `<p>Tilbakekjøpet skjer før nyheten, til dagens kurs. Etterpå har firmaet ingen kontanter og færre aksjer.</p>`,
              `<p>Antall tilbakekjøpt = kontanter / kurs fra (a). Etter nyheten: <span class="f">E = EV<sub>ny</sub></span> (ingen kontanter, ingen gjeld).</p>`,
              `<p>Del den nye egenkapitalverdien på gjenværende aksjer, for hvert av de to scenarioene.</p>`,
              `<ol><li>Antall tilbakekjøpt = kontanter / P fra (a).</li><li>Gjenværende aksjer = n − tilbakekjøpt.</li><li>Kurs = <span class="f">EV<sub>ny</sub></span> / gjenværende aksjer, for begge utfall.</li></ol>`,
            ],
            fasit: `<div class="calc">Tilbakekjøp = 100 / 50 = 2 mill. aksjer → 8 mill. igjen
EV opp:  600 / 8 = $75
EV ned:  200 / 8 = $25</div>` },
          { l: "c",
            q: `<p>Suppose AMC waits until after the news comes out to do the share repurchase. What is AMC's share price after the repurchase if its enterprise value goes up? What is AMC's share price after the repurchase if its enterprise value declines?</p>`,
            hint: [
              `<p>Nå kommer nyheten først, mens firmaet fortsatt har kontantene.</p>`,
              `<p>Kurs etter nyhet = <span class="f">(EV<sub>ny</sub> + kontanter) / n</span>. Et tilbakekjøp til riktig pris endrer ikke kursen.</p>`,
              `<p>Regn kursen for hvert utfall før tilbakekjøpet. Den blir den samme etter.</p>`,
              `<ol><li>For hvert utfall: <span class="f">P = (EV<sub>ny</sub> + kontanter) / n</span>.</li><li>Tilbakekjøp til denne kursen endrer ikke kursen.</li><li>Sammenlign med (b) og tenk på hvorfor spennet er mindre.</li></ol>`,
            ],
            fasit: `<div class="calc">EV opp:  (600 + 100) / 10 = $70
EV ned:  (200 + 100) / 10 = $30</div>
<p>Kursen er den samme etter tilbakekjøpet. Spennet er mindre enn i (b) fordi kontanter (en risikofri eiendel) demper volatiliteten.</p>` },
          { l: "d",
            q: `<p>Suppose AMC management expects good news to come out. Based on your answers to parts (b) and (c), if management desires to maximize AMC's ultimate share price, will they undertake the repurchase before or after the news comes out? When would management undertake the repurchase if they expect bad news to come out?</p>`,
            hint: [
              `<p>Sammenlign kursene i (b) og (c) for hvert utfall.</p>`,
              `<p>Tilbakekjøp før nyheten gir mest til de gjenværende når aksjen er undervurdert.</p>`,
              `<p>God nyhet: velg det som gir høyest kurs. Dårlig nyhet: det samme.</p>`,
              `<ol><li>God nyhet: sammenlign (b) og (c) i opp-scenarioet.</li><li>Dårlig nyhet: sammenlign i ned-scenarioet.</li><li>Formuler intuisjonen: kjøp tilbake når aksjen er undervurdert.</li></ol>`,
            ],
            fasit: `<p>Ved forventet god nyhet: kjøp tilbake før ($75 mot $70). Ved forventet dårlig nyhet: kjøp tilbake etter ($30 mot $25). Ledelsen vil kjøpe tilbake når aksjen er undervurdert, ikke når den er overvurdert.</p>` },
          { l: "e",
            q: `<p>Given your answer to part (d), what effect would you expect an announcement of a share repurchase to have on the stock price? Why?</p>`,
            hint: [
              `<p>Hva forteller timingen av et tilbakekjøp om hva ledelsen vet?</p>`,
              `<p>Signalteori: investorer tolker handlingene til bedre informerte ledere.</p>`,
              `<p>Fra (d): tilbakekjøp skjer før god nyhet og etter at dårlig nyhet er kjent.</p>`,
              `<ol><li>Koble timingen fra (d) til hva ledelsen forventer.</li><li>Investorer som forstår dette tolker kunngjøringen som et signal.</li><li>Konkluder om retningen på kursreaksjonen.</li></ol>`,
            ],
            fasit: `<p>Ledere kjøper tilbake før god nyhet og etter dårlig nyhet. Hvis investorene tror ledelsen er bedre informert og timer tilbakekjøpene, vil en kunngjøring om tilbakekjøp føre til at kursen stiger.</p>` },
        ] },
      /* ---------------- 11 ---------------- */
      { nr: 11, niva: 2, tema: "Asymmetric Information", tittel: "Emisjon med lemons-problem",
        intro: `<p>Consider an all-equity firm that is run by a manager who acts in the best interest of existing shareholders. The value of the firm's assets in place is either $50 or $150. While the manager knows the true value of the assets in place, investors view both possibilities as equally likely. That is, investors believe that the assets are worth $50 with probability ½ and $150 with probability ½. The firm has an investment project that requires an investment of $35. The only way to finance this project is by issuing equity to new investors in a competitive stock market. The project generates a sure, risk-free cash flow of $40 next year (i.e. this cash flow does not depend on the value of assets in place). Everyone is risk neutral and there is no discounting.</p>`,
        deler: [
          { l: "a",
            q: `<p>Suppose that investors believe that the manager always issues equity. That is, investors expect the manager to issue equity regardless of the true value of assets in place. What fraction α of the firm's equity has to be issued to new investors to raise $35? What are the payoffs to existing shareholders if the manager issues equity and undertakes the project? Given that investors believe that the firm always issues equity, does a manager want to issue equity if assets in place are worth $150? Remember that the objective of the manager is to maximize payoffs for existing shareholders.</p>`,
            hint: [
              `<p>Investorene priser det gjennomsnittlige firmaet (pooling). Manageren vet hvilken type han er.</p>`,
              `<p>Break-even for nye investorer: <span class="f">α × (E[eiendeler] + prosjekt-CF) = I</span>.</p>`,
              `<p>Gamle aksjonærer får <span class="f">(1 − α) × (A<sub>sann</sub> + prosjekt-CF)</span>. Sammenlign med <span class="f">A<sub>sann</sub></span> uten emisjon, for begge typer.</p>`,
              `<ol><li>Forventet verdi av eiendeler med investorenes sannsynligheter.</li><li><span class="f">α = I / (E[A] + prosjekt-CF)</span>.</li><li>Lav type: gamle får <span class="f">(1 − α)(A<sub>lav</sub> + CF)</span>. Sammenlign med <span class="f">A<sub>lav</sub></span>.</li><li>Høy type: gamle får <span class="f">(1 − α)(A<sub>høy</sub> + CF)</span>. Sammenlign med <span class="f">A<sub>høy</sub></span>.</li><li>Forklar med verdioverføring mot NPV.</li></ol>`,
            ],
            fasit: `<div class="calc">α × (0.5×150 + 0.5×50 + 40) = 35  →  α = 35/140 = 1/4

A = 50:  0.75 × (50 + 40)  = 67.5  > 50  → utsteder
A = 150: 0.75 × (150 + 40) = 142.5 < 150 → utsteder ikke</div>
<p>Når eiendelene er verdt 50 (150), overvurderer (undervurderer) investorene firmaet. NPV på 5 er for liten til å kompensere de gamle aksjonærene for verdioverføringen når underprisede aksjer selges.</p>` },
          { l: "b",
            q: `<p>Suppose now that investors have different beliefs. Investors believe that the manager only issues equity if he knows that assets in place are worth $50. What fraction α of the firm's equity has to be issued to new investors to raise $35? What are the payoffs to existing shareholders if the manager issues equity and undertakes the project? Given that investors believe that the firm only issues equity when assets in place are worth $50, what does the manager do when he knows that the true value of assets in place is in fact $150? Will he want to issue equity?</p>`,
            hint: [
              `<p>Nå priser investorene enhver emisjon som om firmaet er den lave typen.</p>`,
              `<p>Break-even: <span class="f">α × (A<sub>lav</sub> + prosjekt-CF) = I</span>.</p>`,
              `<p>Regn payoff til gamle aksjonærer for begge typer med den nye α og sammenlign med verdien uten emisjon. Er investorenes tro konsistent med det manageren gjør?</p>`,
              `<ol><li><span class="f">α = I / (A<sub>lav</sub> + CF)</span>.</li><li>Lav type: <span class="f">(1 − α)(A<sub>lav</sub> + CF)</span> mot <span class="f">A<sub>lav</sub></span>.</li><li>Høy type: <span class="f">(1 − α)(A<sub>høy</sub> + CF)</span> mot <span class="f">A<sub>høy</sub></span>.</li><li>Sjekk at troen er rasjonell (likevekt).</li><li>Kommenter kursreaksjonen ved emisjon.</li></ol>`,
            ],
            fasit: `<div class="calc">α × (50 + 40) = 35  →  α = 35/90

A = 50:  (55/90) × 90  = 55    > 50  → utsteder
A = 150: (55/90) × 190 ≈ 116.1 < 150 → utsteder ikke</div>
<p>Dette er en likevekt: investorenes forventninger er korrekte. En emisjon avslører at eiendelene er verdt 50 og kursen faller. Det stemmer med empirien om negative kursreaksjoner ved emisjoner.</p>
<p>Gevinsten for gamle aksjonærer i lav type er 55 − 50 = 5, som er nøyaktig NPV. Emisjonen er riktig priset, så de nye investorene går i null.</p>` },
          { l: "c",
            q: `<p>Suppose that the manager can remove the information asymmetry by hiring an auditing firm that certifies the true value of assets in place. The auditing firm can credibly communicate the true value of assets in place to investors. This certification service costs $2. Would the manager want to pay $2 for certification when assets in place are worth $150? Would he want to do so when assets in place are worth $50? Remember that only equity financing is available.</p>`,
            hint: [
              `<p>I (b) går høy type glipp av et lønnsomt prosjekt. Hva er det verdt å slippe det?</p>`,
              `<p>Med sertifisering prises egenkapitalen riktig, så gamle aksjonærer får hele NPV. Sammenlign NPV med kostnaden.</p>`,
              `<p>Høy type: sammenlign payoff med sertifisering (minus kostnad) med payoff uten (fra (b)). Lav type: blir den allerede riktig priset i (b)?</p>`,
              `<ol><li>Høy type med sertifisering: <span class="f">α = I / (A<sub>høy</sub> + CF)</span>, gamle får <span class="f">(1 − α)(A<sub>høy</sub> + CF)</span> minus kostnaden.</li><li>Sammenlign med <span class="f">A<sub>høy</sub></span> (ingen investering i (b)).</li><li>Lav type: sammenlign med payoff i (b), der den allerede er riktig priset.</li><li>Merk at selve valget om å sertifisere avslører typen.</li></ol>`,
            ],
            fasit: `<p>Utfallet i (b) er ineffektivt fordi høy type dropper et prosjekt med positiv NPV.</p>
<div class="calc">A = 150 med sertifisering:
  α = 35/190, gamle får 190 − 35 = 155
  155 − 2 = 153 > 150  → betaler gjerne (kostnad 2 < NPV 5)

A = 50: allerede riktig priset i (b) (får 55)
  betalingsvilje = 0</div>
<p>Selve beslutningen om å hyre (eller ikke hyre) revisor avslører all informasjon til markedet.</p>` },
        ] },
      /* ---------------- 12 ---------------- */
      { nr: 12, niva: 1, tema: "Payout Policy", tittel: "Nilpoj Corporation",
        intro: `<p>The Nilpoj Corporation has 1 million shares outstanding with a total market value of $20 million. The company is all-equity financed. Nilpoj is expected to generate free cash flows of $1 million in the first year. Thereafter free cash flows are expected to grow by 5% a year in perpetuity. Nilpoj pays out all free cash flows as dividends to shareholders. Thus, Nilpoj is expected to pay $1 million of dividends at the end of the first year (i.e. one year from now), and thereafter the amount paid out is expected to grow by 5% a year in perpetuity. Thus the expected dividend at the end of the second year is $1.05 million, and so on. Assume that Nilpoj operates in a perfect capital market, that is, the Modigliani-Miller Propositions hold.</p>`,
        deler: [
          { l: "a",
            q: `<p>What is Nilpoj's equity cost of capital, r<sub>E</sub>? Hint: The present value today of a FCF in one year that will grow at an annual rate of g% after the first year is: PV = FCF/(r − g) where r is the appropriate discount rate.</p>`,
            hint: [
              `<p>Du kjenner verdien og kontantstrømmene. Det ukjente er diskonteringsrenten.</p>`,
              `<p>Gordons vekstmodell: <span class="f">V<sub>0</sub> = Div<sub>1</sub> / (r − g)</span>.</p>`,
              `<p>Løs for r.</p>`,
              `<ol><li>Sett opp <span class="f">V<sub>0</sub> = Div<sub>1</sub> / (r − g)</span>.</li><li>Løs: <span class="f">r = Div<sub>1</sub> / V<sub>0</sub> + g</span>.</li></ol>`,
            ],
            fasit: `<div class="calc">20 000 000 = 1 000 000 / (r − 0.05)
r = 10%</div>` },
          { l: "b",
            q: `<p>What is the price per share of Nilpoj right now? What will the total value of the firm be at the end of the first year (after the $1 million dividend is paid out)? At the end of the first year, what is the dividend per share?</p>`,
            hint: [
              `<p>Kurs i dag er enkel. Verdien om ett år er nåverdien av alle utbytter fra og med år 2.</p>`,
              `<span class="f">P<sub>0</sub> = V<sub>0</sub> / n</span>. <span class="f">V<sub>1</sub> = Div<sub>2</sub> / (r − g)</span>.`,
              `<span class="f">Div<sub>2</sub> = Div<sub>1</sub>(1 + g)</span>. Utbytte per aksje = totalt utbytte / antall aksjer.`,
              `<ol><li><span class="f">P<sub>0</sub> = V<sub>0</sub> / n</span>.</li><li><span class="f">V<sub>1</sub> = Div<sub>1</sub>(1 + g) / (r − g)</span>.</li><li><span class="f">DPS<sub>1</sub> = Div<sub>1</sub> / n</span>.</li><li>Gjerne også <span class="f">P<sub>1</sub> = V<sub>1</sub> / n</span>.</li></ol>`,
            ],
            fasit: `<div class="calc">P_0 = 20 000 000 / 1 000 000 = $20
V_1 = 1 000 000 × 1.05 / (0.10 − 0.05) = $21 000 000
DPS = $1
P_1 = $21</div>` },
          { l: "c",
            ctx: `The company announces that the first year's dividend will be increased to $4 million (from $1 million), and that the extra cash will be raised at the end of the first year by an issue of shares. After that, the total amount paid out in dividends each year will be as previously forecast, i.e. $1.05 million at the end of year 2 and increasing at 5% a year in each subsequent year.`,
            q: `<p>What will the total value of the firm be at the end of the year (after the extra cash is raised and after the $4 million dividend is paid out)?</p>`,
            hint: [
              `<p>Firmaverdien er nåverdien av fremtidige utbytter. Har de endret seg?</p>`,
              `<p>Utbyttene fra år 2 og utover er de samme som før.</p>`,
              `<p>Pengene som hentes inn går rett ut som utbytte, så de blir ikke værende i firmaet.</p>`,
              `<ol><li>Fastslå at fremtidige utbytter (fra år 2) er uendret.</li><li><span class="f">V<sub>1</sub></span> = samme som i (b).</li></ol>`,
            ],
            fasit: `<p>Firmaverdien er nåverdien av fremtidige utbytter, som er uendret. V<sub>1</sub> = $21 000 000.</p>` },
          { l: "d",
            q: `<p>How many shares will the firm need to issue, and what is the price per share at the end of the first year (after the extra cash is raised and after the $4 million dividend is paid out)?</p>`,
            hint: [
              `<p>De nye aksjonærene får ikke det ekstra utbyttet de selv finansierer. To ukjente: antall nye aksjer og kursen.</p>`,
              `<p>To likninger: <span class="f">P<sub>1</sub> = V<sub>1</sub> / (n<sub>gammel</sub> + n<sub>ny</sub>)</span> og <span class="f">n<sub>ny</sub> × P<sub>1</sub></span> = ekstra utbytte.</p>`,
              `<p>Gang ut den første likningen og sett inn den andre. Da forsvinner <span class="f">n<sub>ny</sub></span> og du kan løse for <span class="f">P<sub>1</sub></span>.</p>`,
              `<ol><li>Ekstra beløp = nytt utbytte − opprinnelig utbytte.</li><li><span class="f">(n<sub>gammel</sub> + n<sub>ny</sub>) × P<sub>1</sub> = V<sub>1</sub></span>.</li><li>Sett inn <span class="f">n<sub>ny</sub> × P<sub>1</sub></span> = ekstra beløp: <span class="f">n<sub>gammel</sub> × P<sub>1</sub> = V<sub>1</sub> − ekstra</span>.</li><li>Løs for <span class="f">P<sub>1</sub></span>.</li><li><span class="f">n<sub>ny</sub> = ekstra / P<sub>1</sub></span>.</li></ol>`,
            ],
            fasit: `<div class="calc">P_1 = 21 000 000 / (1 000 000 + n)
n × P_1 = 3 000 000

1 000 000 × P_1 + 3 000 000 = 21 000 000
P_1 = $18
n = 3 000 000 / 18 = 166 666.67 aksjer</div>` },
          { l: "e",
            q: `<p>At the end of the first year, what is the dividend per share for the original shareholders? What fraction of future dividends (starting with the second-year dividends) belongs to the original shareholders? Please provide a brief explanation.</p>`,
            hint: [
              `<p>Bare de opprinnelige aksjonærene mottar utbyttet i år 1.</p>`,
              `<p>DPS = totalt utbytte / opprinnelige aksjer. Eierandel = opprinnelige aksjer / totalt antall aksjer.</p>`,
              `<p>Fra og med år 2 deles utbyttene med de nye aksjonærene.</p>`,
              `<ol><li><span class="f">DPS<sub>1</sub></span> = nytt totalt utbytte / <span class="f">n<sub>gammel</sub></span>.</li><li>Nye aksjonærers andel = <span class="f">n<sub>ny</sub> / (n<sub>gammel</sub> + n<sub>ny</sub>)</span>.</li><li>Opprinnelige aksjonærers andel = 1 minus dette.</li></ol>`,
            ],
            fasit: `<div class="calc">DPS = 4 000 000 / 1 000 000 = $4
Nye aksjonærer: 166 667 / 1 166 667 = 1/7
Opprinnelige aksjonærer: 6/7 av fremtidige utbytter</div>` },
          { l: "f",
            q: `<p>Show that the original shareholders are not made better off by this decision (i.e. show that the present value of the cash flows to original shareholders remains $20 million). Please provide a brief explanation.</p>`,
            hint: [
              `<p>Høyere utbytte nå betyr lavere andel av utbytter senere.</p>`,
              `<p>PV = nåverdien av utbyttet i år 1 + nåverdien av deres andel av firmaet i år 1.</p>`,
              `<p>Begge deler mottas om ett år, så begge diskonteres med <span class="f">1 + r</span>.</p>`,
              `<ol><li>Utbytte i år 1 til opprinnelige aksjonærer.</li><li>Deres andel × <span class="f">V<sub>1</sub></span>.</li><li>Summer og del på <span class="f">1 + r</span>.</li><li>Sammenlign med <span class="f">V<sub>0</sub></span>.</li></ol>`,
            ],
            fasit: `<div class="calc">PV = 1 000 000 × [4/1.1 + (6/7) × (1/1.1) × 1.05/(0.10 − 0.05)]
   = (4 000 000 + 18 000 000) / 1.1
   = $20 000 000</div>
<p>Det ekstra utbyttet betales med en tilsvarende utvanning av fremtidige utbytter. Utbyttepolitikk er irrelevant under MM.</p>` },
        ] },
      /* ---------------- 13 ---------------- */
      { nr: 13, niva: 3, tema: "Payout Policy", tittel: "Genron Corporation",
        intro: `<p>Consider Genron Corporation. The firm's board is meeting to decide how to pay out $20 million in excess cash to shareholders. Genron has no debt, its equity cost of capital equals its unlevered cost of capital of 12%. With 10 million shares outstanding, Genron will be able to pay a $2 dividend immediately. The firm expects to generate future free cash flows of $48 million per year, thus it anticipates paying a dividend of $4.80 per share each year thereafter. Consider these 3 alternative payout policies, and show their equivalence under perfect market conditions.</p>`,
        deler: [
          { l: "a",
            q: `<p>Pay dividend with excess cash.</p>`,
            hint: [
              `<p>Skill mellom kursen før og etter at utbyttet går ut (cum og ex).</p>`,
              `<span class="f">P<sub>cum</sub> = Div<sub>0</sub> + PV(fremtidige utbytter)</span>. Fremtidige utbytter er en evigvarende annuitet.`,
              `<span class="f">PV = Div / r</span> for flat evigvarende annuitet. <span class="f">P<sub>ex</sub></span> er bare nåverdien av fremtidige utbytter.`,
              `<ol><li><span class="f">P<sub>ex</sub> = Div<sub>fremtid</sub> / r</span>.</li><li><span class="f">P<sub>cum</sub> = Div<sub>0</sub> + P<sub>ex</sub></span>.</li></ol>`,
            ],
            fasit: `<div class="calc">P_cum = 2 + 4.80/0.12 = $42
P_ex  = 4.80/0.12 = $40</div>` },
          { l: "b",
            q: `<p>Repurchase shares with excess cash.</p>`,
            hint: [
              `<p>Kontantene brukes til å kjøpe aksjer i stedet for utbytte. Hvilken kurs kjøpes de til?</p>`,
              `<p>Tilbakekjøp skjer til <span class="f">P<sub>cum</sub></span> fra (a). Færre aksjer betyr høyere utbytte per aksje senere.</p>`,
              `<p>Antall tilbakekjøpt = kontanter / <span class="f">P<sub>cum</sub></span>. Nytt DPS = fremtidig FCF / gjenværende aksjer. Ny kurs = DPS / r.</p>`,
              `<ol><li>Antall tilbakekjøpt = kontanter / <span class="f">P<sub>cum</sub></span>.</li><li>Gjenværende aksjer = n − tilbakekjøpt.</li><li>Nytt DPS = årlig FCF / gjenværende aksjer.</li><li>Kurs = nytt DPS / r.</li><li>Sammenlign med (a).</li></ol>`,
            ],
            fasit: `<div class="calc">Tilbakekjøp = 20M / 42 = 0.476M aksjer
Igjen: 10M − 0.476M = 9.524M
Nytt DPS = 48M / 9.524M = $5.04
P = 5.04 / 0.12 = $42</div>
<p>Kursen er uendret og lik cum-kursen ved utbytte. I perfekte markeder er investorer indifferente mellom utbytte og tilbakekjøp, fordi de kan gjenskape begge selv ved å reinvestere utbytte eller selge aksjer.</p>` },
          { l: "c",
            q: `<p>Pay a high dividend (greater than excess cash) by issuing shares. (Assume that the new shareholders, who participate in the issuance, will also participate in the dividend, which they fund.)</p>`,
            hint: [
              `<p>Utbyttet er større enn kontantene, så resten hentes inn ved emisjon. De nye aksjonærene får også utbyttet.</p>`,
              `<p>Velg et totalt utbytte nå (fasiten bruker ett års FCF). Emisjonsbehov = utbytte − kontanter. Emisjon skjer til <span class="f">P<sub>cum</sub></span>.</p>`,
              `<p>Nye aksjer = emisjonsbehov / <span class="f">P<sub>cum</sub></span>. Både dagens og fremtidige utbytter fordeles på det nye totale antallet.</p>`,
              `<ol><li>Velg totalt utbytte nå.</li><li>Emisjonsbehov = utbytte − kontanter.</li><li>Nye aksjer = emisjonsbehov / <span class="f">P<sub>cum</sub></span>.</li><li>DPS nå og senere = beløp / totalt antall aksjer.</li><li><span class="f">P<sub>cum</sub> = DPS<sub>nå</sub> + DPS<sub>fremtid</sub> / r</span>.</li><li>Sammenlign med (a) og (b).</li></ol>`,
            ],
            fasit: `<div class="calc">Totalt utbytte nå = 48M  →  trenger 48M − 20M = 28M
Nye aksjer = 28M / 42 = 0.67M  →  totalt 10.67M
DPS = 48M / 10.67M = $4.50 (nå og senere)
P_cum = 4.50 + 4.50/0.12 = $42</div>
<p>Kursen er igjen uendret. Merk forskjellen fra oppgave 12(d), der de nye aksjonærene ikke får det ekstra utbyttet de finansierer.</p>
<p><b>Oppsummert:</b> det er en avveining mellom utbytte nå og senere. I et perfekt kapitalmarked er utbetalingsformen irrelevant. I virkeligheten er det markedsimperfeksjonene som bør bestemme utbyttepolitikken.</p>` },
        ] },
    ],
  },
];
