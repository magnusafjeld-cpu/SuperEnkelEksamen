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
            fasit: `<span class="own">Kontrollert mot kursets regneark PS1-E4.xlsx</span>
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
            fasit: `<span class="own">Kontrollert mot kursets regneark PS1-E4.xlsx</span>
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
            fasit: `<span class="own">Kontrollert mot kursets regneark PS1-E4.xlsx</span>
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
            fasit: `<span class="own">Kontrollert mot kursets regneark PS1-E4.xlsx</span>
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
<p>V<sub>U</sub> − V<sub>L</sub> = 10.42 mill. er nåverdien av forventede konkurskostnader.</p>` },
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
<div class="tblwrap"><table class="data"><thead><tr><th>Strategy</th><th>Probability</th><th>Payoff ($ mill.)</th></tr></thead><tbody>
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
<div class="tblwrap"><table class="data"><thead><tr><th>Division</th><th>Boom</th><th>Bust</th></tr></thead><tbody>
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
            fasit: `<span class="own">Kontrollert mot kursets regneark PS1-E8.xls</span>
<div class="calc">Samlet CF: boom 280, bust 120
D = ½(100) + ½(100) = 100  (risikofri)
E = ½(180) + ½(20) = 100
V = 200</div>` },
          { l: "b",
            ctx: `The CEO of Hillton is considering splitting the firm into two separate firms, "Nicole Corp" and "Paris Corp", in a spin-off. After reading the debt covenants carefully, the CEO has discovered that she could put all of the debt on one of the firms, making the other firm debt free. A spin-off would be costly, however, since there are synergies between the two divisions. If the divisions were separated into two firms, the cash flows would therefore decrease by 10 for each of the firms in each of the states:
<div class="tblwrap"><table class="data"><thead><tr><th>Division</th><th>Boom</th><th>Bust</th></tr></thead><tbody>
<tr><td>Nicole</td><td>140</td><td>40</td></tr><tr><td>Paris</td><td>120</td><td>60</td></tr></tbody></table></div>`,
            q: `<p>If the CEO wants to maximize shareholder value, which of the two divisions should be allocated the debt and which one should be debt-free? What would the value of the debt (which will now only be backed by the cash flows of one division) be after the spin-off?</p>`,
            hint: [
              `<p>Aksjonærene tjener på å legge gjelden der den er mest risikabel, fordi da overføres mer tap til gjeldseierne.</p>`,
              `<p>Regn ut begge alternativene. For selskapet med gjeld: <span class="f">D = E[min(CF, F)]</span> og <span class="f">E = E[max(CF − F, 0)]</span>. Det gjeldfrie selskapet har <span class="f">E = E[CF]</span>.</p>`,
              `<p>Total egenkapital = egenkapital i selskapet med gjeld + verdien av det gjeldfrie selskapet. Velg alternativet med høyest total egenkapital.</p>`,
              `<ol><li>Alternativ 1: gjeld på Nicole. Regn D og E for Nicole og E for Paris.</li><li>Alternativ 2: gjeld på Paris. Regn D og E for Paris og E for Nicole.</li><li>Summer egenkapitalen i hvert alternativ.</li><li>Velg det høyeste og oppgi gjeldsverdien i det alternativet.</li></ol>`,
            ],
            fasit: `<span class="own">Kontrollert mot kursets regneark PS1-E8.xls</span>
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
            fasit: `<span class="own">Kontrollert mot kursets regneark PS1-E8.xls</span>
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
  {
    id: "ps2", nr: 2, tittel: "Problem Set 2", tema: "Security issuance and valuation",
    trinn: ["Retning","Verktøy","Oppsett","Oppskrift"],
    nivaer: { 1: ["*", "Tutorial"], 2: ["**", "Forelesning"], 3: ["***", "Egen trening"] },
    oppgaver: [
      /* ---------------- 1 ---------------- */
      { nr: 1, niva: 2, tema: "Asymmetric Information", tittel: "Rothko Inc.",
        intro: `<p>Rothko Inc. is a small collective of artists, mainly painters. The market knows that the value of Rothko's current assets (mainly modern experimental paintings) is either $0 ("bad art state") or $100K ("good art state"). Rothko's managers know for certain they are in the "good state," and that the value of the art is $100K. Now, artists are often misunderstood, so Rothko's managers cannot convince the market of this, and the market simply believes that there is a 50-50 chance that Rothko is in the good or the bad art state. Like most firms run by artists turned managers, Rothko has no internal funds. Further, its management insists that all investments must be financed by equity, since borrowing jeopardizes their artistic freedom and integrity. Thus, Rothko currently has 1000 shares outstanding and no debt. All agents are risk neutral and the discount rate is zero.</p>`,
        deler: [
          { l: "a",
            q: `<p>What is the price per share of Rothko?</p>`,
            hint: [
              `<p>Markedet vet ikke hvilken tilstand Rothko er i. Kursen settes ut fra det markedet tror, ikke ut fra det ledelsen vet.</p>`,
              `<p>Risikonøytrale investorer og null diskontering: verdi = forventet verdi med markedets sannsynligheter. <span class="f">P = V / n</span>.</p>`,
              `<p>Markedet gir god og dårlig tilstand 50% hver. Firmaet har ingen gjeld, så hele verdien tilhører aksjonærene.</p>`,
              `<ol><li>Forventet verdi = sannsynlighet for dårlig tilstand × verdien der + sannsynlighet for god tilstand × verdien der.</li><li>Del på antall aksjer.</li></ol>`,
            ],
            fasit: `<div class="calc">V = 0.5 × 0 + 0.5 × 100 000 = 50 000
P = 50 000 / 1000 = $50</div>` },
          { l: "b",
            ctx: `Now, Rothko is considering investing $10K in an exhibition of modern experimental paintings. Both Rothko and the market know perfectly well that this project will generate no cash flow whatsoever.`,
            q: `<p>Suppose that the market conjectures that Rothko would invest in this "project" regardless of whether it is in the good state or the bad state. How many new shares must Rothko sell to raise $10k and what is the share price afterwards?</p>`,
            hint: [
              `<p>Investerer begge typer, sier investeringen ingenting om tilstanden. Markedet priser fortsatt snittet. Prosjektet bruker opp pengene uten å gi noe tilbake.</p>`,
              `<p>Nye aksjonærer skal få verdier for nøyaktig det de betaler. Andelen deres er beløpet delt på firmaverdien etter emisjonen: <span class="f">N / (n + N) = 10 000 / V</span>.</p>`,
              `<p>V etter emisjonen er markedets forventede verdi av eiendelene. De 10 000 som hentes inn, legges ikke til, fordi prosjektet gir 0.</p>`,
              `<ol><li>V etter emisjonen = forventet verdi av eiendelene, som i (a).</li><li>Andel til nye = beløpet som hentes inn / V.</li><li>Løs <span class="f">N / (n + N)</span> = andelen for N.</li><li>Kurs = <span class="f">V / (n + N)</span>.</li><li>Kontroll: N × kurs = beløpet som hentes inn.</li></ol>`,
            ],
            fasit: `<div class="calc">V = 50 000 (ingen ny informasjon, prosjektet gir 0)
Andel til nye = 10 000 / 50 000 = 20%
N / (1000 + N) = 0.20  →  N = 250 aksjer
P = 50 000 / 1250 = $40

Kontroll: 250 × 40 = 10 000</div>
<p>Kursen faller med $10 fordi pengene går til et prosjekt med NPV = −10 000. Det tapet bærer de gamle aksjonærene: 1000 × 10 = 10 000.</p>` },
          { l: "c",
            q: `<p>Suppose that the market conjectures that Rothko would only invest in this project if it is in the good state. Call this expectation "Conjecture C". When Rothko is in the bad state, it would simply do nothing. Under this conjecture, how many new shares must Rothko sell to raise $10k and what is the share price afterwards?</p>`,
            hint: [
              `<p>Nå er investeringen et signal. Hva slutter markedet når det ser at Rothko investerer?</p>`,
              `<p>Under conjecture C betyr investering god tilstand. Bruk samme break-even som i (b): <span class="f">N / (n + N) = 10 000 / V</span>, men med den nye verdien.</p>`,
              `<p>V etter emisjonen er verdien i god tilstand. Prosjektet gir fortsatt 0.</p>`,
              `<ol><li>Sett V lik verdien i god tilstand.</li><li>Andel til nye = beløpet som hentes inn / V.</li><li>Løs for N.</li><li>Kurs = <span class="f">V / (n + N)</span>.</li><li>Kontroll: N × kurs = beløpet som hentes inn.</li></ol>`,
            ],
            fasit: `<div class="calc">Investering = signal om god tilstand  →  V = 100 000
Andel til nye = 10 000 / 100 000 = 10%
N / (1000 + N) = 0.10  →  N = 111.1 ≈ 111 aksjer
P = 100 000 / 1111.1 = $90

Kontroll: 111.1 × 90 = 10 000</div>
<p>Kursen stiger fra $50 til $90. Signalet løfter verdien til 100 000. De gamle aksjonærene sitter igjen med 100 000 − 10 000 = 90 000, altså $90 per aksje.</p>` },
          { l: "d",
            ctx: `Under conjecture C, and after observing the success of the exhibition (in particular on Rothko's share price), Okhtor is considering investing in a similar exhibition. Okhtor Inc. is a small collective of modern experimental sculptors. Their firm is an exact replica of Rothko, except they know they are in the bad state. The market has not realized this yet, and the market still thinks that there is a 50-50 chance that Okhtor is in the good or the bad state.`,
            q: `<p>Okhtor is considering investing in a similar exhibition. Under conjecture C, how many shares do they need to issue and what is the impact on the share price? Would their shareholders want to do this?</p>`,
            hint: [
              `<p>Markedet kan ikke se forskjell på Rothko og Okhtor. Hvordan tolker markedet en investering under conjecture C?</p>`,
              `<p>Prisingen avhenger bare av hva markedet tror, ikke av den sanne tilstanden. Regnestykket blir det samme som i (c).</p>`,
              `<p>Sammenlign kursen før (fra (a)) med kursen etter. Tenk også på hvem som betaler når Okhtor egentlig er verdt 0.</p>`,
              `<ol><li>Fastslå at markedet tolker investeringen som god tilstand.</li><li>Antall nye aksjer og kurs blir som i (c).</li><li>Sammenlign med kursen i (a).</li><li>Vurder hvem som vinner og hvem som taper når sannheten kommer fram.</li></ol>`,
            ],
            fasit: `<div class="calc">Markedet tror: investering = god tilstand  →  V = 100 000
N = 111 aksjer, P = $90 (som i c)
Kurs før: $50  →  kurs etter: $90</div>
<p>Ja, aksjonærene i Okhtor vil gjøre dette. Kursen stiger fra $50 til $90. De nye aksjonærene betaler 10 000 for aksjer i et firma som egentlig er verdt 0. De taper når sannheten kommer fram.</p>` },
          { l: "e",
            q: `<p>Is conjecture C rational/correct?</p>`,
            hint: [
              `<p>En forventning er rasjonell bare hvis firmaene faktisk gjør det markedet tror de gjør. Da er det en likevekt.</p>`,
              `<p>Sjekk hver type: vil den gode typen investere og vil den dårlige la være, gitt at markedet tror på C?</p>`,
              `<p>Bruk svaret i (d). Hva gjør den dårlige typen?</p>`,
              `<ol><li>Skriv opp hva C sier at hver type gjør.</li><li>Sjekk med (c) og (d) hva hver type faktisk vil gjøre gitt C.</li><li>Stemmer det ikke for én av typene, er C ingen likevekt.</li></ol>`,
            ],
            fasit: `<p>Nei. C sier at bare den gode typen investerer. Men (d) viser at den dårlige typen også tjener på å investere når markedet tror på C. Begge typer investerer, så C stemmer ikke med det firmaene gjør. C er ingen likevekt.</p>` },
        ] },
      /* ---------------- 2 ---------------- */
      { nr: 2, niva: 1, tema: "IPO", tittel: "Kostnaden ved en IPO",
        intro: `<p>Your firm has 10 million shares outstanding, and you are about to issue 5 million new shares in an IPO. The IPO price has been set at $20 per share, and the underwriting spread is 7%. The IPO is a big success with investors, and the share price rises to $50 on the first day of trading.</p>`,
        deler: [
          { l: "a",
            q: `<p>How much did your firm raise from the IPO?</p>`,
            hint: [
              `<p>Firmaet får IPO-prisen, ikke kursen etter første handelsdag. Og tilretteleggeren tar sin del.</p>`,
              `<p>Netto proveny = nye aksjer × IPO-pris × <span class="f">(1 − spread)</span>.</p>`,
              `<p>Spreaden er en prosent av bruttoprovenyet. Kursoppgangen til $50 går til dem som kjøpte i emisjonen, ikke til firmaet.</p>`,
              `<ol><li>Brutto = nye aksjer × IPO-pris.</li><li>Netto = brutto × <span class="f">(1 − spread)</span>.</li></ol>`,
            ],
            fasit: `<div class="calc">Brutto = 5 mill. × $20 = $100 mill.
Netto = 100 × (1 − 0.07) = $93 mill.</div>` },
          { l: "b",
            q: `<p>What is the market value of the firm after the IPO?</p>`,
            hint: [
              `<p>Markedsverdi er kurs ganger antall aksjer, etter at de nye aksjene er utstedt.</p>`,
              `<span class="f">MV = P × (gamle + nye aksjer)</span>.`,
              `<p>Bruk kursen etter første handelsdag.</p>`,
              `<ol><li>Totalt antall aksjer etter emisjonen.</li><li>Gang med kursen etter første handelsdag.</li></ol>`,
            ],
            fasit: `<div class="calc">MV = (10 + 5) mill. × $50 = $750 mill.</div>` },
          { l: "c",
            q: `<p>Assume that the post-IPO value of your firm is its fair market value. Suppose your firm could have issued shares directly to investors at their fair market value, in a perfect market with no underwriting spread and no underpricing. What would the share price have been in this case, if you raise the same amount as in part (a)?</p>`,
            hint: [
              `<p>I et perfekt marked selges aksjene til riktig pris. Da beholder de gamle aksjonærene all verdien de hadde før emisjonen.</p>`,
              `<p>Firmaets verdi uten de nye pengene = MV etter IPO − proveny. Den verdien tilhører de opprinnelige aksjene.</p>`,
              `<p>De nye pengene gir like mye verdi som de nye aksjene koster. Kursen er derfor verdien uten de nye pengene delt på de opprinnelige aksjene.</p>`,
              `<ol><li>Verdi uten nye penger = MV fra (b) − proveny fra (a).</li><li>Kurs = denne verdien / opprinnelige aksjer.</li><li>Kontroll: nye aksjer = proveny / kurs. MV / totalt antall aksjer skal gi samme kurs.</li></ol>`,
            ],
            fasit: `<div class="calc">Verdi uten nye penger = 750 − 93 = $657 mill.
P = 657 / 10 = $65.70

Kontroll: 93 / 65.70 = 1.4155 mill. nye aksjer
          750 / 11.4155 = $65.70</div>` },
          { l: "d",
            q: `<p>Comparing part (b) and part (c), what is the total cost to the firm's original investors due to market imperfections from the IPO?</p>`,
            hint: [
              `<p>De opprinnelige aksjonærene sitter med aksjer verdt $50 i stedet for kursen de kunne hatt i (c).</p>`,
              `<p>Kostnad = (kurs i perfekt marked − faktisk kurs) × opprinnelige aksjer.</p>`,
              `<p>Kostnaden består av spreaden og underprisingen. Summen av de to skal gi det samme.</p>`,
              `<ol><li>Differanse per aksje = kursen fra (c) − kursen etter IPO.</li><li>Gang med opprinnelige aksjer.</li><li>Kontroll: spread (brutto × spreadsatsen) + underprising (nye aksjer × (førstedagskurs − IPO-pris)).</li></ol>`,
            ],
            fasit: `<div class="calc">Kostnad = (65.70 − 50) × 10 mill. = $157 mill.

Kontroll:
Spread:        5 mill. × 20 × 0.07 = $7 mill.
Underprising:  5 mill. × (50 − 20) = $150 mill.
Sum                                = $157 mill.</div>` },
        ] },
      /* ---------------- 3 ---------------- */
      { nr: 3, niva: 1, tema: "WACC", tittel: "Alcatel-Lucent",
        intro: `<p>Suppose Alcatel-Lucent has an equity cost of capital of 10%, market capitalization of $10.8 billion, and an enterprise value of $14.4 billion. Suppose Alcatel-Lucent's debt cost of capital is 6.1% and its marginal tax rate is 35%.</p>`,
        deler: [
          { l: "a",
            q: `<p>What is Alcatel-Lucent's WACC?</p>`,
            hint: [
              `<p>WACC etter skatt er snittet av avkastningskravene, vektet med markedsverdier. Gjeldskostnaden justeres for skatteskjoldet.</p>`,
              `<span class="f">r<sub>wacc</sub> = E/V × r<sub>E</sub> + D/V × r<sub>D</sub>(1 − τ<sub>c</sub>)</span>.`,
              `<p>Enterprise value er egenkapital pluss netto gjeld. Netto gjeld er derfor <span class="f">D = EV − E</span> og <span class="f">V = EV</span>.</p>`,
              `<ol><li><span class="f">D = EV − E</span>.</li><li>Vekter <span class="f">E/V</span> og <span class="f">D/V</span> med V = EV.</li><li>Sett inn i formelen.</li></ol>`,
            ],
            fasit: `<div class="calc">D = 14.4 − 10.8 = 3.6
E/V = 10.8 / 14.4 = 0.75,  D/V = 0.25

r_wacc = 0.75 × 10% + 0.25 × 6.1% × (1 − 0.35)
       = 7.5% + 0.99125% = 8.49%</div>` },
          { l: "b",
            q: `<p>If Alcatel-Lucent maintains a constant debt-equity ratio, what is the value of a project with average risk and the following expected free cash flows?</p>
<table class="data"><tr><th>Year</th><th>0</th><th>1</th><th>2</th><th>3</th></tr>
<tr><td>FCF</td><td class="n">−100</td><td class="n">50</td><td class="n">100</td><td class="n">70</td></tr></table>`,
            hint: [
              `<p>Gjennomsnittlig risiko og konstant gjeldsgrad: da kan prosjektet diskonteres med firmaets WACC.</p>`,
              `<span class="f">V<sup>L</sup><sub>0</sub> = Σ FCF<sub>t</sub> / (1 + r<sub>wacc</sub>)<sup>t</sup></span> for t = 1, 2, 3. NPV = <span class="f">V<sup>L</sup><sub>0</sub> + FCF<sub>0</sub></span>.`,
              `<p>Regn gjerne baklengs: <span class="f">V<sup>L</sup><sub>t</sub> = (FCF<sub>t+1</sub> + V<sup>L</sup><sub>t+1</sub>) / (1 + r<sub>wacc</sub>)</span>. Da får du verdien på hver dato. Den trenger du i (c).</p>`,
              `<ol><li><span class="f">V<sup>L</sup><sub>3</sub> = 0</span>.</li><li><span class="f">V<sup>L</sup><sub>2</sub> = FCF<sub>3</sub> / (1 + r<sub>wacc</sub>)</span>.</li><li><span class="f">V<sup>L</sup><sub>1</sub> = (FCF<sub>2</sub> + V<sup>L</sup><sub>2</sub>) / (1 + r<sub>wacc</sub>)</span>.</li><li><span class="f">V<sup>L</sup><sub>0</sub> = (FCF<sub>1</sub> + V<sup>L</sup><sub>1</sub>) / (1 + r<sub>wacc</sub>)</span>.</li><li>NPV = <span class="f">V<sup>L</sup><sub>0</sub></span> − investeringen.</li></ol>`,
            ],
            fasit: `<div class="calc">r_wacc = 8.49125%

V_2 = 70 / 1.08491 = 64.52
V_1 = (100 + 64.52) / 1.08491 = 151.64
V_0 = (50 + 151.64) / 1.08491 = 185.86

NPV = 185.86 − 100 = 85.86</div>
<p>Kontantstrømmene fra år 1 er verdt 185.86 i dag. Etter investeringen på 100 er NPV = 85.86.</p>` },
          { l: "c",
            q: `<p>If Alcatel-Lucent maintains its debt-equity ratio, what is the debt capacity of the project in part b?</p>`,
            hint: [
              `<p>Konstant gjeldsgrad betyr at gjelden følger prosjektets verdi over tid.</p>`,
              `<p>Gjeldskapasitet <span class="f">D<sub>t</sub> = d × V<sup>L</sup><sub>t</sub></span>, der <span class="f">d = D/V</span>.</p>`,
              `<p>Bruk <span class="f">V<sup>L</sup><sub>t</sub></span> på hver dato fra (b). Når prosjektet er ferdig, er både verdien og gjelden 0.</p>`,
              `<ol><li><span class="f">d = D/V</span> fra (a).</li><li><span class="f">D<sub>t</sub> = d × V<sup>L</sup><sub>t</sub></span> for t = 0, 1, 2, 3.</li></ol>`,
            ],
            fasit: `<div class="calc">d = 3.6 / 14.4 = 0.25

År             0        1        2       3
V^L_t     185.86   151.64    64.52       0
D_t        46.47    37.91    16.13       0</div>` },
        ] },
      /* ---------------- 4 ---------------- */
      { nr: 4, niva: 1, tema: "APV", tittel: "Alcatel-Lucent med APV",
        intro: `<p>Consider Alcatel-Lucent's project in Exercise 3.</p>
<p class="tiny muted">Fra oppgave 3: r<sub>E</sub> = 10%, E = $10.8 mrd., EV = $14.4 mrd., r<sub>D</sub> = 6.1%, τ<sub>c</sub> = 35%, konstant gjeldsgrad.</p>
<table class="data"><tr><th>Year</th><th>0</th><th>1</th><th>2</th><th>3</th></tr>
<tr><td>FCF</td><td class="n">−100</td><td class="n">50</td><td class="n">100</td><td class="n">70</td></tr></table>`,
        deler: [
          { l: "a",
            q: `<p>What is Alcatel-Lucent's unlevered cost of capital?</p>`,
            hint: [
              `<p><span class="f">r<sub>U</sub></span> er avkastningskravet på eiendelene. Med konstant gjeldsgrad er det WACC før skatt.</p>`,
              `<span class="f">r<sub>U</sub> = E/V × r<sub>E</sub> + D/V × r<sub>D</sub></span> (kursets konvensjon: vekter uten skatt).`,
              `<p>Samme vekter som i 3(a), men uten <span class="f">(1 − τ<sub>c</sub>)</span> på gjeldskostnaden.</p>`,
              `<ol><li>Vekter <span class="f">E/V</span> og <span class="f">D/V</span> fra 3(a).</li><li><span class="f">r<sub>U</sub></span> = vektet snitt av <span class="f">r<sub>E</sub></span> og <span class="f">r<sub>D</sub></span>.</li></ol>`,
            ],
            fasit: `<div class="calc">r_U = 0.75 × 10% + 0.25 × 6.1% = 7.5% + 1.525% = 9.025%</div>` },
          { l: "b",
            q: `<p>What is the unlevered value of the project?</p>`,
            hint: [
              `<p>Ugiret verdi er verdien av prosjektet som om det var finansiert bare med egenkapital.</p>`,
              `<span class="f">V<sup>U</sup> = Σ FCF<sub>t</sub> / (1 + r<sub>U</sub>)<sup>t</sup></span>.`,
              `<p>Samme kontantstrømmer som i oppgave 3, men diskontert med <span class="f">r<sub>U</sub></span> i stedet for <span class="f">r<sub>wacc</sub></span>.</p>`,
              `<ol><li>Diskonter FCF for hvert år med <span class="f">r<sub>U</sub></span> fra (a).</li><li>Summer.</li></ol>`,
            ],
            fasit: `<div class="calc">V^U = 50/1.09025 + 100/1.09025² + 70/1.09025³
    = 45.861 + 84.129 + 54.016 = 184.006</div>` },
          { l: "c",
            q: `<p>What are the interest tax shields from the project? What is their present value?</p>`,
            hint: [
              `<p>Gjelden fra 3(c) gir rentefradrag hvert år. Skatteskjoldet er rentene ganger skattesatsen.</p>`,
              `<p>Renter i år t = <span class="f">r<sub>D</sub> × D<sub>t−1</sub></span>, altså gjelden ved starten av året. <span class="f">TS<sub>t</sub> = τ<sub>c</sub> × renter<sub>t</sub></span>.</p>`,
              `<p>Med konstant gjeldsgrad følger gjelden prosjektverdien. Skatteskjoldet har da samme risiko som eiendelene og diskonteres med <span class="f">r<sub>U</sub></span>.</p>`,
              `<ol><li>Ta <span class="f">D<sub>0</sub></span>, <span class="f">D<sub>1</sub></span> og <span class="f">D<sub>2</sub></span> fra 3(c).</li><li>Renter<sub>t</sub> = <span class="f">r<sub>D</sub> × D<sub>t−1</sub></span>.</li><li><span class="f">TS<sub>t</sub> = τ<sub>c</sub></span> × renter<sub>t</sub>.</li><li><span class="f">PV(TS) = Σ TS<sub>t</sub> / (1 + r<sub>U</sub>)<sup>t</sup></span>.</li></ol>`,
            ],
            fasit: `<div class="calc">År                  1         2         3
D_(t−1)        46.466    37.911    16.130
Renter (6.1%)  2.8344    2.3126    0.9840
TS (35%)       0.9920    0.8094    0.3444

PV(TS) = 0.9920/1.09025 + 0.8094/1.09025² + 0.3444/1.09025³
       = 0.910 + 0.681 + 0.266 = 1.857</div>
<p><b>Merknad:</b> Kursets løsning får 1.85 fordi den diskonterer skatteskjoldene avrundet til to desimaler (0.99, 0.81, 0.34). Uavrundet er PV(TS) = 1.857.</p>` },
          { l: "d",
            q: `<p>Show that the APV of Alcatel-Lucent's project matches the value computed using the WACC method.</p>`,
            hint: [
              `<p>APV er ugiret verdi pluss nåverdien av skatteskjoldet.</p>`,
              `<span class="f">V<sup>L</sup> = V<sup>U</sup> + PV(TS)</span>.`,
              `<p>Legg sammen (b) og (c) og sammenlign med <span class="f">V<sup>L</sup><sub>0</sub></span> fra 3(b).</p>`,
              `<ol><li><span class="f">V<sup>U</sup></span> fra (b).</li><li>PV(TS) fra (c).</li><li>Summer.</li><li>Sammenlign med verdien fra WACC-metoden.</li></ol>`,
            ],
            fasit: `<div class="calc">APV = 184.006 + 1.857 = 185.863
WACC-metoden (3b): 185.863  ✓</div>
<p>Metodene gir samme svar fordi begge bygger på konstant gjeldsgrad. Da har skatteskjoldet eiendelenes risiko og WACC-en er <span class="f">r<sub>U</sub> − d τ<sub>c</sub> r<sub>D</sub></span>. Kontrollen er et fast punkt: gjelden <span class="f">D<sub>t</sub></span> i 3(c) er hentet fra WACC-verdiene, så likheten følger av algebraen. Den avslører likevel feil rente på skatteskjoldet og regnefeil.</p>` },
        ] },
      /* ---------------- 5 ---------------- */
      { nr: 5, niva: 2, tema: "APV", tittel: "Tybo Corporation",
        intro: `<p>Tybo Corporation adjusts its debt so that its interest expenses are 20% of its free cash flow. Tybo is considering an expansion that will generate free cash flows of $2.5 million this year and is expected to grow at a rate of 4% per year from then on. Suppose Tybo's marginal corporate tax rate is 40%.</p>`,
        deler: [
          { l: "a",
            q: `<p>If the unlevered cost of capital for this expansion is 10%, what is its unlevered value?</p>`,
            hint: [
              `<p>Kontantstrømmen vokser med en fast rate for alltid.</p>`,
              `<p>Voksende evigvarende annuitet: <span class="f">V<sup>U</sup> = FCF<sub>1</sub> / (r<sub>U</sub> − g)</span>.</p>`,
              `<p>FCF i år 1 er 2.5 mill. og veksten er 4%.</p>`,
              `<ol><li>Sett inn FCF<sub>1</sub>, <span class="f">r<sub>U</sub></span> og g i formelen.</li></ol>`,
            ],
            fasit: `<div class="calc">V^U = 2.5 / (0.10 − 0.04) = $41.67 mill.</div>` },
          { l: "b",
            q: `<p>What is the levered value of the expansion?</p>`,
            hint: [
              `<p>Rentene er en fast andel av FCF. Da er også skatteskjoldet en fast andel av FCF og har samme risiko.</p>`,
              `<p><span class="f">TS<sub>t</sub> = τ<sub>c</sub> × k × FCF<sub>t</sub></span>, der k = renter / FCF. Da er <span class="f">PV(TS) = τ<sub>c</sub> k V<sup>U</sup></span> og <span class="f">V<sup>L</sup> = (1 + τ<sub>c</sub> k) V<sup>U</sup></span>.</p>`,
              `<p>Her er k = 20% og <span class="f">τ<sub>c</sub></span> = 40%.</p>`,
              `<ol><li>Regn <span class="f">τ<sub>c</sub> × k</span>.</li><li><span class="f">V<sup>L</sup> = (1 + τ<sub>c</sub> k) × V<sup>U</sup></span>.</li><li>Kontroll: <span class="f">PV(TS) = τ<sub>c</sub> k FCF<sub>1</sub> / (r<sub>U</sub> − g)</span> og <span class="f">V<sup>U</sup> + PV(TS)</span>.</li></ol>`,
            ],
            fasit: `<div class="calc">V^L = (1 + 0.40 × 0.20) × 41.67 = 1.08 × 41.67 = $45.00 mill.

Kontroll: PV(TS) = 0.40 × 0.20 × 2.5 / 0.06 = 3.33
          41.67 + 3.33 = 45.00</div>` },
          { l: "c",
            q: `<p>If Tybo pays 5% interest on its debt, what amount of debt will it take on initially for the expansion?</p>`,
            hint: [
              `<p>Regelen om 20% av FCF bestemmer rentene i år 1. Gjelden må være akkurat så stor at den gir de rentene.</p>`,
              `<span class="f">renter = k × FCF<sub>1</sub> = r<sub>D</sub> × D</span>.`,
              `<p>Løs for D.</p>`,
              `<ol><li>Renter = k × FCF<sub>1</sub>.</li><li><span class="f">D = renter / r<sub>D</sub></span>.</li></ol>`,
            ],
            fasit: `<div class="calc">Renter = 0.20 × 2.5 = 0.5 mill.
D = 0.5 / 0.05 = $10 mill.</div>` },
          { l: "d",
            q: `<p>What is the debt-to-value ratio for this expansion? What is its WACC?</p>`,
            hint: [
              `<p>Gjeldsgraden er gjelden delt på giret verdi. WACC kan regnes fra <span class="f">r<sub>U</sub></span> og gjeldsgraden.</p>`,
              `<span class="f">d = D / V<sup>L</sup></span>. <span class="f">r<sub>wacc</sub> = r<sub>U</sub> − d τ<sub>c</sub> r<sub>D</sub></span>.`,
              `<p>Bruk D fra (c) og <span class="f">V<sup>L</sup></span> fra (b). Formelen følger av at WACC før skatt er lik <span class="f">r<sub>U</sub></span>.</p>`,
              `<ol><li><span class="f">d = D / V<sup>L</sup></span>.</li><li><span class="f">r<sub>wacc</sub> = r<sub>U</sub> − d × τ<sub>c</sub> × r<sub>D</sub></span>.</li></ol>`,
            ],
            fasit: `<div class="calc">d = 10 / 45 = 0.2222
r_wacc = 10% − 0.2222 × 0.40 × 5% = 9.556%</div>` },
          { l: "e",
            q: `<p>What is the levered value of the expansion using the WACC method?</p>`,
            hint: [
              `<p>WACC-metoden diskonterer FCF med WACC.</p>`,
              `<span class="f">V<sup>L</sup> = FCF<sub>1</sub> / (r<sub>wacc</sub> − g)</span>.`,
              `<p>Svaret skal bli det samme som i (b).</p>`,
              `<ol><li>Sett inn <span class="f">r<sub>wacc</sub></span> fra (d).</li><li>Sammenlign med (b).</li></ol>`,
            ],
            fasit: `<div class="calc">V^L = 2.5 / (0.09556 − 0.04) = $45.00 mill.  ✓ samme som APV i (b)</div>
<p>Likheten er et fast punkt, fordi d er regnet med <span class="f">V<sup>L</sup></span> fra (b). Den fanger regnefeil og feil WACC-formel.</p>` },
        ] },
      /* ---------------- 6 ---------------- */
      { nr: 6, niva: 2, tema: "APV, WACC and FTE", tittel: "AMC",
        intro: `<p>In year 1, AMC will earn $2000 before interest and taxes. The market expects these earnings to grow at a rate of 3% per year. The firm will make no net investments (i.e., capital expenditures will equal depreciation) or changes to net working capital. Assume that the corporate tax rate equals 40%. Right now, the firm has $5000 in risk-free debt. It plans to keep a constant ratio of debt to equity every year, so that on average the debt will also grow by 3% per year. Suppose the risk-free rate equals 5%, and the expected return on the market equals 11%. The asset beta for this industry is 1.11.</p>`,
        deler: [
          { l: "a",
            q: `<p>If AMC were an all-equity (unlevered) firm, what would its market value be?</p>`,
            hint: [
              `<p>Ugiret verdi: kontantstrømmen etter skatt uten renter, diskontert med <span class="f">r<sub>U</sub></span>.</p>`,
              `<p><span class="f">FCF = EBIT(1 − τ<sub>c</sub>)</span> når capex = avskrivninger og NWC er uendret. <span class="f">r<sub>U</sub></span> fra CAPM med eiendelsbetaen. <span class="f">V<sup>U</sup> = FCF<sub>1</sub> / (r<sub>U</sub> − g)</span>.</p>`,
              `<p>FCF vokser med 3% for alltid.</p>`,
              `<ol><li><span class="f">FCF<sub>1</sub> = EBIT × (1 − τ<sub>c</sub>)</span>.</li><li><span class="f">r<sub>U</sub> = r<sub>f</sub> + β<sub>A</sub>(r<sub>m</sub> − r<sub>f</sub>)</span>.</li><li><span class="f">V<sup>U</sup> = FCF<sub>1</sub> / (r<sub>U</sub> − g)</span>.</li></ol>`,
            ],
            fasit: `<div class="calc">FCF_1 = 2000 × (1 − 0.40) = 1200
r_U = 5% + 1.11 × (11% − 5%) = 11.66%
V^U = 1200 / (0.1166 − 0.03) = 13 857</div>` },
          { l: "b",
            q: `<p>Assuming the debt is fairly priced, what is the amount of interest AMC will pay next year? If AMC's debt is expected to grow by 3% per year, at what rate are its interest payments expected to grow?</p>`,
            hint: [
              `<p>Gjelden er risikofri. Hvilken rente gir det?</p>`,
              `<p>Riktig priset risikofri gjeld har <span class="f">r<sub>D</sub> = r<sub>f</sub></span>. Renter<sub>1</sub> = <span class="f">r<sub>D</sub> × D<sub>0</sub></span>.</p>`,
              `<p>Renten er fast, så rentebeløpet vokser i takt med gjelden.</p>`,
              `<ol><li><span class="f">r<sub>D</sub> = r<sub>f</sub></span>.</li><li>Renter = <span class="f">r<sub>f</sub></span> × dagens gjeld.</li><li>Vekst i renter = vekst i gjeld.</li></ol>`,
            ],
            fasit: `<div class="calc">Renter_1 = 5% × 5000 = $250
Vekst: 3% per år, som gjelden</div>` },
          { l: "c",
            q: `<p>Even though AMC's debt is riskless (the firm will not default), the future growth of AMC's debt is uncertain, so the exact amount of the future interest payments is risky. Assuming the future interest payments have the same beta as AMC's assets, what is the present value of AMC's interest tax shield?</p>`,
            hint: [
              `<p>Skatteskjoldet er rentene ganger skattesatsen. Det vokser med gjelden og har eiendelenes risiko.</p>`,
              `<p><span class="f">TS<sub>1</sub> = τ<sub>c</sub> × renter<sub>1</sub></span>. <span class="f">PV(TS) = TS<sub>1</sub> / (r<sub>U</sub> − g)</span>.</p>`,
              `<p>Diskonter med <span class="f">r<sub>U</sub></span> fra (a), fordi oppgaven sier at rentebetalingene har samme beta som eiendelene.</p>`,
              `<ol><li><span class="f">TS<sub>1</sub> = τ<sub>c</sub></span> × renter fra (b).</li><li><span class="f">PV(TS) = TS<sub>1</sub> / (r<sub>U</sub> − g)</span>.</li></ol>`,
            ],
            fasit: `<div class="calc">TS_1 = 0.40 × 250 = 100
PV(TS) = 100 / (0.1166 − 0.03) = 1155</div>` },
          { l: "d",
            q: `<p>Using the APV method, what is AMC's total market value, V<sup>L</sup>? What is the market value of AMC's equity?</p>`,
            hint: [
              `<p>APV: legg verdien av skatteskjoldet til den ugirede verdien.</p>`,
              `<span class="f">V<sup>L</sup> = V<sup>U</sup> + PV(TS)</span>. <span class="f">E = V<sup>L</sup> − D</span>.`,
              `<p>Bruk (a) og (c). Gjelden i dag er 5000.</p>`,
              `<ol><li><span class="f">V<sup>L</sup></span> = (a) + (c).</li><li><span class="f">E = V<sup>L</sup></span> − dagens gjeld.</li></ol>`,
            ],
            fasit: `<div class="calc">V^L = 13 857 + 1155 = 15 012
E = 15 012 − 5000 = 10 012</div>` },
          { l: "e",
            q: `<p>What is AMC's WACC? (Hint: Work backward from the FCF and V<sup>L</sup>.)</p>`,
            hint: [
              `<p>WACC er den renten som gir <span class="f">V<sup>L</sup></span> når du diskonterer FCF.</p>`,
              `<span class="f">V<sup>L</sup> = FCF<sub>1</sub> / (r<sub>wacc</sub> − g)</span>, så <span class="f">r<sub>wacc</sub> = FCF<sub>1</sub> / V<sup>L</sup> + g</span>.`,
              `<p>Bruk <span class="f">V<sup>L</sup></span> fra (d) uten å runde den av til 15 000.</p>`,
              `<ol><li>Del FCF<sub>1</sub> på <span class="f">V<sup>L</sup></span>.</li><li>Legg til g.</li></ol>`,
            ],
            fasit: `<div class="calc">r_wacc = 1200 / 15 012 + 0.03 = 7.994% + 3% = 10.994%</div>
<p><b>Merknad:</b> Kursets løsning runder <span class="f">V<sup>L</sup></span> til 15 000 og får <span class="f">r<sub>wacc</sub></span> = 1200 / 15 000 + 3% = 11%. Uavrundet er den 10.994%. Avrundingen følger med i (f) til (h).</p>` },
          { l: "f",
            q: `<p>Using the WACC method, what is the expected return for AMC equity?</p>`,
            hint: [
              `<p>WACC er et vektet snitt av <span class="f">r<sub>E</sub></span> og gjeldskostnaden etter skatt. Kjenner du resten, kan du løse for <span class="f">r<sub>E</sub></span>.</p>`,
              `<span class="f">r<sub>wacc</sub> = E/V × r<sub>E</sub> + D/V × r<sub>D</sub>(1 − τ<sub>c</sub>)</span>.`,
              `<p>E og V fra (d), D = 5000 og <span class="f">r<sub>D</sub></span> = 5%. Kontroller med MM II: <span class="f">r<sub>E</sub> = r<sub>U</sub> + D/E (r<sub>U</sub> − r<sub>D</sub>)</span>.</p>`,
              `<ol><li>Sett inn <span class="f">r<sub>wacc</sub></span> fra (e).</li><li>Trekk fra gjeldsleddet <span class="f">D/V × r<sub>D</sub>(1 − τ<sub>c</sub>)</span>.</li><li>Del på <span class="f">E/V</span>.</li><li>Kontroller med MM II.</li></ol>`,
            ],
            fasit: `<div class="calc">r_wacc × V = r_E × E + r_D(1 − τ) × D
0.10994 × 15 012 = r_E × 10 012 + 0.05 × 0.6 × 5000
1650.4 = r_E × 10 012 + 150
r_E = 1500.4 / 10 012 = 14.986%

Kontroll (MM II): 11.66% + (5000 / 10 012)(11.66% − 5%) = 14.986%  ✓</div>
<p>MM II-kontrollen kan ikke feile her. <span class="f">r<sub>wacc</sub></span> kommer fra APV-verdien i (d), der skatteskjoldet er diskontert med <span class="f">r<sub>U</sub></span>. Da er MM II en identitet. Kontrollen fanger bare regnefeil.</p>
<p><b>Merknad:</b> Med <span class="f">V<sup>L</sup></span> rundet til 15 000 og E = 10 000 får kursets løsning <span class="f">r<sub>E</sub></span> = (11% − 1%) × 15 000 / 10 000 = 15%. Uavrundet er <span class="f">r<sub>E</sub></span> = 14.986%.</p>` },
          { l: "g",
            q: `<p>Show that the following holds for AMC: <span class="f">β<sub>A</sub> = E/(D+E) × β<sub>E</sub> + D/(D+E) × β<sub>D</sub></span></p>`,
            hint: [
              `<p>Du trenger <span class="f">β<sub>E</sub></span>. Den finner du fra <span class="f">r<sub>E</sub></span> i (f) med CAPM.</p>`,
              `<p><span class="f">β<sub>E</sub> = (r<sub>E</sub> − r<sub>f</sub>) / (r<sub>m</sub> − r<sub>f</sub>)</span>. Gjelden er risikofri, så <span class="f">β<sub>D</sub> = 0</span>.</p>`,
              `<p>Sett inn <span class="f">E/(D+E)</span> og <span class="f">β<sub>E</sub></span> på høyre side og sjekk at du får 1.11.</p>`,
              `<ol><li><span class="f">β<sub>E</sub></span> fra CAPM.</li><li>Vekter fra (d).</li><li>Regn høyre side med <span class="f">β<sub>D</sub> = 0</span>.</li><li>Sammenlign med den oppgitte <span class="f">β<sub>A</sub></span>.</li></ol>`,
            ],
            fasit: `<div class="calc">β_E = (14.986% − 5%) / 6% = 1.664

(10 012 / 15 012) × 1.664 + (5000 / 15 012) × 0 = 1.110 = β_A  ✓</div>
<p>Også dette er en identitet når <span class="f">r<sub>E</sub></span> kommer fra MM II i (f).</p>
<p><b>Merknad:</b> Kursets løsning bruker <span class="f">r<sub>E</sub></span> = 15% og får <span class="f">β<sub>E</sub></span> = (15% − 5%) / 6% = 1.67 (skrevet 1.66) og (10 000 / 15 000) × 1.67 = 1.11. Uavrundet er <span class="f">β<sub>E</sub></span> = 1.664.</p>` },
          { l: "h",
            q: `<p>Assuming that the proceeds from any increases in debt are paid out to equity holders, what cash flows do the equity holders expect to receive in one year? At what rate are those cash flows expected to grow? Use that information plus your answer to part (f) to derive the market value of equity using the FTE method. How does that compare to your answer in part (d)?</p>`,
            hint: [
              `<p>FTE verdsetter egenkapitalen direkte: kontantstrømmen til egenkapitalen diskontert med <span class="f">r<sub>E</sub></span>.</p>`,
              `<span class="f">FCFE = FCF − renter × (1 − τ<sub>c</sub>) + netto ny gjeld</span>.`,
              `<p>Gjelden vokser med 3%, så netto ny gjeld i år 1 er 3% av dagens gjeld. Alle leddene vokser med 3%. Da er <span class="f">E = FCFE<sub>1</sub> / (r<sub>E</sub> − g)</span>.</p>`,
              `<ol><li>Netto ny gjeld = g × <span class="f">D<sub>0</sub></span>.</li><li><span class="f">FCFE<sub>1</sub> = (EBIT − renter)(1 − τ<sub>c</sub>)</span> + netto ny gjeld.</li><li>Vekst = g, som for gjelden og EBIT.</li><li><span class="f">E = FCFE<sub>1</sub> / (r<sub>E</sub> − g)</span> med <span class="f">r<sub>E</sub></span> fra (f).</li><li>Sammenlign med E i (d).</li></ol>`,
            ],
            fasit: `<div class="calc">Netto ny gjeld = 5000 × 0.03 = 150
FCFE_1 = (2000 − 250) × (1 − 0.40) + 150 = 1050 + 150 = 1200
Vekst: 3%

E = 1200 / (0.14986 − 0.03) = 10 012  = E fra APV i (d)  ✓</div>
<p>Også FTE = APV er en identitet når <span class="f">r<sub>E</sub></span> kommer fra MM II. Kontrollen fanger likevel feil i FCFE, for eksempel glemt netto ny gjeld.</p>
<p><b>Merknad:</b> Kursets løsning bruker <span class="f">r<sub>E</sub></span> = 15% fra den avrundede <span class="f">V<sup>L</sup></span> og får E = 1200 / 0.12 = 10 000. Det er ikke helt likt (d), der E = 10 012, selv om løsningen sier at det er det. Uavrundet er FTE og APV nøyaktig like.</p>` },
        ] },
      /* ---------------- 7 ---------------- */
      { nr: 7, niva: 3, tema: "APV", tittel: "Herring & Moose kjøper GAP",
        intro: `<p>The publicly traded retail firm Herring & Moose (H&M) is thinking about acquiring the privately owned firm Greens And mashed Potatoes (GAP), which operates in the exact same business as H&M. The CFO of H&M, Mr. Unbefrick N. Lievable is in charge of providing a valuation of GAP in order to decide on an acquisition price. Mr. Lievable has access to the following information:</p>
<ul><li>The corporate tax rate is 50% and there are no personal taxes.</li>
<li>The long-term government bond rate is 4% and the expected market risk premium is 6%.</li>
<li>H&M currently has book value of equity of $600 million and $400 million of debt. H&M's stock is trading at $100 per share and there are 12 million shares outstanding. H&M's equity beta is estimated to be equal to 1.25. H&M's debt is rated AA and is estimated to have a debt beta of zero. H&M also keeps $150 million in cash on their balance sheet, but only needs $50 million of cash in order to run their operations efficiently.</li>
<li>GAP is expected to have revenues next year of $110 million and operating expenses (not including depreciation) next year of $60 million. Depreciation is expected to be $10 million next year, and capital expenditures are expected to be $15 million. Revenues, expenses, capital expenditures and depreciation are expected to grow at 5% per year after that point for the foreseeable future.</li>
<li>GAP currently has $50 million of net working capital. If H&M acquires GAP, this amount can be reduced to $40 million in one year due to economies of scale between the two companies. After this, net working capital is expected to increase at 5% per year.</li>
<li>GAP has no equity beta since it is not publicly traded. GAP currently has $150 million of debt outstanding and pays $12 million in interest expense. GAP has no excess cash. Mr. Lievable thinks that GAP has too little debt, and that the optimal leverage for GAP should be to have total debt of $250 million which would result in interest expense of $20 million one year from now.</li></ul>`,
        deler: [
          { l: "a",
            q: `<p>How much is the equity of GAP worth to H&M? Base your answer on a discounted cash flow valuation using either the APV or the WACC method (although I prefer if you use APV). Clearly state any additional assumptions you make.</p>`,
            hint: [
              `<p>GAP er ikke børsnotert, så risikoen må hentes fra H&M, som driver i samme bransje. Verdsett deretter GAP med APV: først <span class="f">V<sup>U</sup></span>, så skatteskjoldet. Til slutt trekker du fra gjelden.</p>`,
              `<p>Ugir H&M med overskuddskassen C trukket fra gjelden: <span class="f">β<sub>A</sub> = E/(E + D − C) × β<sub>E</sub> + (D − C)/(E + D − C) × β<sub>D</sub></span>. <span class="f">r<sub>U</sub></span> fra CAPM. <span class="f">FCF = EBIT(1 − τ<sub>c</sub>)</span> + avskrivninger − capex − ΔNWC.</p>`,
              `<p>År 1: NWC faller fra 50 til 40, det gir +10 i FCF. Fra år 2 vokser alt med 5%, også NWC. Regn FCF for år 1 og 2 og sett en terminalverdi i år 2. Rentene er 20 neste år. Vokser gjelden med firmaet, har skatteskjoldet eiendelenes risiko.</p>`,
              `<ol><li>H&M: E = kurs × aksjer, overskuddskasse = kontanter − det driften trenger.</li><li><span class="f">β<sub>A</sub></span> og <span class="f">r<sub>U</sub> = r<sub>f</sub> + β<sub>A</sub></span> × markedsrisikopremien.</li><li>FCF for de to første årene. Husk ΔNWC i begge.</li><li><span class="f">TV<sub>2</sub> = FCF<sub>2</sub>(1 + g) / (r<sub>U</sub> − g)</span>. <span class="f">V<sup>U</sup></span> = nåverdien av FCF<sub>1</sub>, FCF<sub>2</sub> og TV<sub>2</sub>.</li><li>Skatteskjoldet hvis gjelden vokser i takt med firmaet (g): <span class="f">PV(TS) = τ<sub>c</sub> × renter<sub>1</sub> / (r<sub>U</sub> − g)</span>.</li><li><span class="f">V<sup>L</sup> = V<sup>U</sup> + PV(TS)</span>. Egenkapitalen = <span class="f">V<sup>L</sup></span> − dagens gjeld.</li></ol>`,
            ],
            fasit: `<p><b>Steg 1: diskonteringsrente fra H&M.</b></p>
<div class="calc">E = 100 × 12 = 1200,  D = 400,  overskuddskasse C = 150 − 50 = 100
β_A = 1200 / (1200 + 400 − 100) × 1.25 = 0.8 × 1.25 = 1.0
r_U = 4% + 1.0 × 6% = 10%</div>
<p><b>Steg 2: FCF og V<sup>U</sup>.</b></p>
<div class="calc">                       År 1      År 2
Inntekter             110.0     115.5
Driftskostnader       −60.0     −63.0
Avskrivninger         −10.0     −10.5
EBIT                   40.0      42.0
EBIT × (1 − 0.5)       20.0      21.0
+ Avskrivninger        10.0      10.5
− Capex               −15.0    −15.75
− ΔNWC                +10.0      −2.0
FCF                    25.0     13.75

TV_2 = 13.75 × 1.05 / (0.10 − 0.05) = 288.75
V^U = 25 / 1.1 + (13.75 + 288.75) / 1.1² = 22.73 + 250.00 = 272.73</div>
<p><b>Steg 3: skatteskjoldet.</b> Antakelse: gjelden vokser med firmaet (5%), så skatteskjoldet har eiendelenes risiko og diskonteres med <span class="f">r<sub>U</sub></span>.</p>
<div class="calc">PV(TS) = 0.5 × 20 / (0.10 − 0.05) = 200
V^L = 272.73 + 200 = 472.73
E = 472.73 − 150 = $322.7 mill.</div>
<p>Vi trekker fra dagens gjeld på 150. De ekstra 100 i gjeld som tas opp etter kjøpet, tilfaller H&M som ny eier.</p>
<p>Holdes gjelden i stedet fast på 250 for alltid, er PV(TS) = τD = 0.5 × 250 = 125. Da blir <span class="f">V<sup>L</sup></span> = 397.73 og E = 247.7.</p>
<p><b>Merknad:</b> Kursets løsning skriver «E = 472.5 − 150 = 322.7». <span class="f">V<sup>L</sup></span> er 472.7, så det er en skrivefeil. Svaret 322.7 stemmer.</p>` },
        ] },
      /* ---------------- 8 ---------------- */
      { nr: 8, niva: 3, tema: "APV", tittel: "Gorgon kjøper Zola",
        intro: `<p>You are the CFO of Gorgon Inc., a publicly traded cheese manufacturing company. The CEO of Gorgon is considering acquiring your competitor Zola Industries, which is also a publicly traded cheese manufacturer and has asked you to evaluate this acquisition opportunity. Below are the most recent financials (fiscal year 2008) for the two companies, as well as the 2009 pro forma financials for Zola Industries.</p>
<table class="data">
<tr><th></th><th>Gorgon Inc</th><th>Zola Industries</th><th></th><th></th></tr>
<tr><th>Balance sheet (millions of $'s)</th><th>2008</th><th>2008</th><th>2009E</th><th>% of revenues</th></tr>
<tr><td>Operating cash</td><td class="n">75</td><td class="n">50</td><td class="n">51.5</td><td class="n">12.5%</td></tr>
<tr><td>Excess cash</td><td class="n">425</td><td class="n">0</td><td class="n">34.1</td><td></td></tr>
<tr><td>Inventory</td><td class="n">100</td><td class="n">60</td><td class="n">61.8</td><td class="n">15.0%</td></tr>
<tr><td>Accounts receivable</td><td class="n">50</td><td class="n">40</td><td class="n">41.2</td><td class="n">10.0%</td></tr>
<tr><td>PPE</td><td class="n">300</td><td class="n">200</td><td class="n">206.0</td><td class="n">50.05</td></tr>
<tr><td>Total assets</td><td class="n">950</td><td class="n">350</td><td class="n">394.6</td><td></td></tr>
<tr><td>Accounts payable</td><td class="n">80</td><td class="n">40</td><td class="n">41.2</td><td class="n">10.0%</td></tr>
<tr><td>Interest bearing debt due within 1yr</td><td class="n">0</td><td class="n">15</td><td class="n">15.5</td><td></td></tr>
<tr><td>Long-term interest bearing debt</td><td class="n">0</td><td class="n">135</td><td class="n">139.1</td><td></td></tr>
<tr><td>Book value of equity</td><td class="n">870</td><td class="n">160</td><td class="n">198.9</td><td></td></tr>
<tr><td>Total liabilities</td><td class="n">950</td><td class="n">350</td><td class="n">394.6</td><td></td></tr>
<tr><th>Income statement (millions of $'s)</th><th></th><th></th><th></th><th></th></tr>
<tr><td>Revenues</td><td class="n">600</td><td class="n">400</td><td class="n">412.0</td><td class="n">100.0%</td></tr>
<tr><td>COGS</td><td class="n">400</td><td class="n">300</td><td class="n">309.0</td><td class="n">75.0%</td></tr>
<tr><td>Depreciation (tax deductible)</td><td class="n">30</td><td class="n">20</td><td class="n">20.6</td><td class="n">5.0%</td></tr>
<tr><td>Amortization (not tax deductible)</td><td class="n">0</td><td class="n">10</td><td class="n">10.0</td><td class="n">2.5%</td></tr>
<tr><td>Interest income</td><td class="n">30</td><td class="n">0</td><td class="n">0.0</td><td></td></tr>
<tr><td>Interest expense</td><td class="n">0</td><td class="n">9.75</td><td class="n">10.0</td><td></td></tr>
<tr><td>Profit before tax</td><td class="n">200</td><td class="n">60.25</td><td class="n">62.4</td><td class="n">15.1%</td></tr>
<tr><td>Tax</td><td class="n">80</td><td class="n">28.1</td><td class="n">28.9</td><td></td></tr>
<tr><td>Net income</td><td class="n">120</td><td class="n">32.15</td><td class="n">33.4</td><td class="n">8.0%</td></tr>
<tr><td>Equity beta</td><td class="n">1.2</td><td class="n">1.65</td><td></td><td></td></tr>
<tr><td>Number of shares (millions)</td><td class="n">30</td><td class="n">10</td><td></td><td></td></tr>
<tr><td>Current stock price ($'s)</td><td class="n">32</td><td class="n">30</td><td></td><td></td></tr>
<tr><td>Current debt rating</td><td class="n">AAA</td><td class="n">A</td><td></td><td></td></tr>
</table>
<ul><li>The corporate tax rate is 40% and there are no personal taxes.</li>
<li>The 30-year government bond rate is 5%, the A-rated corporate bond yield is 6.5%, and the expected equity risk premium over 30-year bonds is 6%.</li>
<li>Next year's expected free cash flow for Zola Industries can be calculated from the pro forma 2009 financial statement above. Note that next year's capital expenditures and changes in net working capital can be inferred from the pro forma income statement and balance sheet. After 2009, Zola Inc's free cash flows are expected to grow at 3% per year in perpetuity.</li>
<li>Zola Industries is currently operating at its optimal debt ratio, which involves growing the interest expense at 3% per year. All the cash that Zola Industries holds on its balance sheet is needed for operating purposes.</li>
<li>Gorgon Inc. potentially has unused debt capacity, however, and also has $425 million of excess cash. Gorgon is planning to finance the acquisition of Zola with the excess cash and (if needed) by taking on new debt.</li>
<li>If Gorgon acquires Zola, some additional synergies would be realized, which are not incorporated in the pro forma numbers for Zola. Specifically, the merger would bring additional net after-tax free cash flows of $3.0 million in 2009, $4.8 million in 2010, and $6.0 million in 2011. After 2011, the synergy cash flows would grow at 3% per year in perpetuity. The risk of the synergy cash flows is the same as the risk of the cash flows from Zola's cheese manufacturing business. The synergies would not increase the debt capacity of the company.</li></ul>`,
        deler: [
          { l: "a",
            q: `<p>What is the maximum price per share that Gorgon should be willing to pay to acquire Zola's equity? Hint: you do not need to do a valuation of Gorgon in order to solve this question. Instead, proceed in two steps. First, value Zola as a stand-alone company, using the 2009 Pro Forma financials, and calculate a value per share. Second, value the synergies and calculate the synergy value per share. If you need to make additional assumptions, make sure to state them clearly in your answer.</p>`,
            hint: [
              `<p>Maksprisen er det Zola er verdt for Gorgon: verdien av Zola alene pluss verdien av synergiene. Verdsett Zola med APV ut fra proformatallene for 2009.</p>`,
              `<p><span class="f">FCF = EBIT(1 − τ<sub>c</sub>)</span> + avskrivninger − capex − ΔNWC. Capex = ΔPPE + avskrivninger. NWC = driftskontanter + varelager + kundefordringer − leverandørgjeld. Amortiseringen er verken kontant eller fradragsberettiget, så den påvirker verken FCF eller skatten.</p>`,
              `<p>Risiko: ugir egenkapitalbetaene. Zolas gjeldsbeta finner du fra A-renten med CAPM. Gorgon har ingen gjeld, men en overskuddskasse med beta 0. Kurset bruker snittet av de to eiendelsbetaene som bransjebeta. Rentene vokser med 3%, så skatteskjoldet diskonteres med <span class="f">r<sub>U</sub></span>.</p>`,
              `<ol><li>FCF for neste år fra proformatallene.</li><li><span class="f">β<sub>D</sub></span> for Zola = (A-rente − <span class="f">r<sub>f</sub></span>) / markedsrisikopremien. <span class="f">β<sub>A</sub></span> for Zola med markedsverdier.</li><li><span class="f">β<sub>A</sub></span> for Gorgon = <span class="f">E/(E − C) × β<sub>E</sub></span>. Ta snittet av de to.</li><li><span class="f">r<sub>U</sub> = r<sub>f</sub> + β<sub>A</sub></span> × markedsrisikopremien.</li><li><span class="f">V<sup>U</sup> = FCF<sub>1</sub> / (r<sub>U</sub> − g)</span>.</li><li><span class="f">TS = τ<sub>c</sub></span> × neste års renter. <span class="f">PV(TS) = TS / (r<sub>U</sub> − g)</span>.</li><li>Egenkapital = <span class="f">V<sup>U</sup> + PV(TS)</span> − gjeld. Del på antall aksjer.</li><li>Synergier: diskonter de tre eksplisitte årene og en terminalverdi i det siste av dem med <span class="f">r<sub>U</sub></span>. Del på antall aksjer.</li><li>Makspris = summen av de to verdiene per aksje.</li></ol>`,
            ],
            fasit: `<p><b>Steg 1: FCF for 2009.</b></p>
<div class="calc">EBIT = 412 − 309 − 20.6 = 82.4

EBIT × (1 − 0.40)                49.44
+ Avskrivninger                  20.60
− Capex = (206 − 200) + 20.6    −26.60
− ΔNWC = 113.3 − 110             −3.30
FCF                              40.14

NWC = driftskontanter + varelager + kundefordringer − leverandørgjeld
2008: 50 + 60 + 40 − 40 = 110
2009: 51.5 + 61.8 + 41.2 − 41.2 = 113.3</div>
<p><b>Steg 2: <span class="f">r<sub>U</sub></span>.</b> Begge firmaene lager ost. Kurset bruker snittet av eiendelsbetaene.</p>
<div class="calc">Zola:    β_D = (6.5% − 5%) / 6% = 0.25
         E = 30 × 10 = 300,  D = 15 + 135 = 150
         β_A = (300/450) × 1.65 + (150/450) × 0.25 = 1.1833
Gorgon:  E = 32 × 30 = 960, ingen gjeld, overskuddskasse 425 (beta 0)
         β_A = 960 / (960 − 425) × 1.2 = 2.1533
Snitt:   β_A = (1.1833 + 2.1533) / 2 = 1.6683

r_U = 5% + 1.6683 × 6% = 15.0098%</div>
<p><b>Steg 3: Zola alene (APV).</b> Rentene for 2009 er 9.75 × 1.03 = 10.04.</p>
<div class="calc">V^U = 40.14 / (0.150098 − 0.03) = 334.23
TS = 0.40 × 10.04 = 4.017
PV(TS) = 4.017 / (0.150098 − 0.03) = 33.45
V^L = 334.23 + 33.45 = 367.68
E = 367.68 − 150 = 217.68  →  $21.77 per aksje</div>
<p><b>Steg 4: synergiene.</b></p>
<div class="calc">TV_2011 = 6.0 × 1.03 / (0.150098 − 0.03) = 51.46
PV = 3.0/1.1501 + 4.8/1.1501² + (6.0 + 51.46)/1.1501³
   = 2.61 + 3.63 + 37.77 = 44.01  →  $4.40 per aksje

Makspris = 21.77 + 4.40 = $26.17 per aksje</div>
<p>Det er under dagens kurs på $30. Med disse forutsetningene bør ikke Gorgon by markedskursen.</p>
<p>Svaret er følsomt for betavalget. Bruker du bare Zolas egen eiendelsbeta (1.1833), blir <span class="f">r<sub>U</sub></span> = 12.1% og maksprisen $39.42.</p>
<p><b>Merknad:</b> Kursets regneark (PS2-E8) får $25.86. Forskjellen kommer av to feil i arket:</p>
<div class="calc">Denne fasiten (r_f = 5%, NWC uten gjeld)       $26.17
Bare r_f = 5.2%                                $25.49
Bare kortsiktig gjeld i NWC (FCF = 40.59)      $26.54
Begge (regnearket)                             $25.86</div>
<p>Oppgaven sier at 30-årsrenten er 5%. Gjeldsbetaen 0.25 i arket forutsetter også 5%. Den kortsiktige rentebærende gjelden er finansiering og er allerede med i de 150 som trekkes fra som gjeld. Oppgavens egen proformatabell bygger dessuten på FCF = 40.14: overskuddskassen for 2009E er 34.1 = 40.14 − 0.6 × 10.04, altså FCF minus rentene etter skatt. Med arkets FCF ville den vært 40.59 − 6.03 = 34.56.</p>` },
        ] },
      /* ---------------- 9 ---------------- */
      { nr: 9, niva: 2, tema: "APV", tittel: "Stable Stable",
        intro: `<p>Stable Stable company is trying to expand its stable and is considering a project that will generate $2 million per year, with an unlevered cost of capital of 11%. The company only has permanent debt, as a result of this acquisition the debt will increase by $12 million. Tax rate is 25%.</p>`,
        deler: [
          { l: "a",
            q: `<p>Find the project value using APV method. Use WACC method to verify that the two methods produce the same result.</p>`,
            hint: [
              `<p>APV er verdien uten gjeld pluss verdien av skatteskjoldet. Med permanent gjeld er skatteskjoldet like sikkert som gjelden.</p>`,
              `<p>Flat evigvarende annuitet: <span class="f">V<sup>U</sup> = FCF / r<sub>U</sub></span>. Permanent gjeld: <span class="f">PV(TS) = τ<sub>c</sub> × D</span>. WACC ved permanent gjeld: <span class="f">r<sub>wacc</sub> = r<sub>U</sub>(1 − d τ<sub>c</sub>)</span> med <span class="f">d = D / V<sup>L</sup></span>.</p>`,
              `<p>Regn <span class="f">V<sup>L</sup></span> med APV først. Bruk den til å finne d og <span class="f">r<sub>wacc</sub></span>. Sjekk så at <span class="f">FCF / r<sub>wacc</sub></span> gir samme verdi.</p>`,
              `<ol><li><span class="f">V<sup>U</sup> = FCF / r<sub>U</sub></span>.</li><li><span class="f">PV(TS) = τ<sub>c</sub> × D</span>.</li><li><span class="f">V<sup>L</sup> = V<sup>U</sup> + PV(TS)</span>.</li><li><span class="f">d = D / V<sup>L</sup></span>.</li><li><span class="f">r<sub>wacc</sub> = r<sub>U</sub>(1 − d τ<sub>c</sub>)</span>.</li><li><span class="f">V<sup>L</sup> = FCF / r<sub>wacc</sub></span>. Sammenlign med APV.</li></ol>`,
            ],
            fasit: `<div class="calc">APV:
V^U = 2 / 0.11 = 18.182
PV(TS) = 0.25 × 12 = 3.000
V^L = 18.182 + 3.000 = 21.182 ≈ $21.18 mill.

WACC:
d = 12 / 21.182 = 0.5665
r_wacc = 11% × (1 − 0.5665 × 0.25) = 9.442%
V^L = 2 / 0.09442 = $21.18 mill.  ✓</div>
<p>Formelen <span class="f">r<sub>wacc</sub> = r<sub>U</sub>(1 − d τ<sub>c</sub>)</span> gjelder for permanent gjeld, der skatteskjoldet er τD. Kurset viser til seksjon 18.8 i boka (likning 18.21). Kontrollen er et fast punkt, fordi d er regnet med <span class="f">V<sup>L</sup></span> fra APV.</p>` },
        ] },
    ],
  },
  {
    id: "ps3", nr: 3, tittel: "Problem Set 3", tema: "Options",
    trinn: ["Retning","Verktøy","Oppsett","Oppskrift"],
    nivaer: { 1: ["*", "Tutorial"], 2: ["**", "Forelesning"], 3: ["***", "Egen trening"] },
    oppgaver: [
      /* ---------------- 1 ---------------- */
      { nr: 1, niva: 2, tema: "Binomial Model", tittel: "Stiawmot",
        intro: `<p>Suppose that the stock of Stiawmot is currently trading at $60. Suppose also that it can only take two possible values in a year from now: It can either go up by 25% or down by 20%. The annual risk-free rate is 10%. Assume that the stock pays no dividend.</p>
<p class="tiny muted">Black-Scholes i (g) regnes ikke på eksamen (Kurbatov i oppsummeringsforelesningen). Øv på intuisjonen: retningen på endringene.</p>`,
        deler: [
          { l: "a",
            q: `<p>Draw the one-period tree for the evolution of the stock price and the one-period tree for lending $1</p>`,
            hint: [
              `<p>Et ettperiodetre har én node i dag og to noder om ett år: opp og ned.</p>`,
              `<p>Opp: <span class="f">S<sub>0</sub> × (1 + 25%)</span>. Ned: <span class="f">S<sub>0</sub> × (1 − 20%)</span>. Et risikofritt lån vokser med <span class="f">(1 + r<sub>f</sub>)</span> uansett tilstand.</p>`,
              `<p>Lånet gir samme beløp i begge grenene. Det er det som gjør det risikofritt.</p>`,
              `<ol><li>Aksjen: <span class="f">S<sub>0</sub></span> i dag, <span class="f">S<sub>0</sub> × (1 + oppgang)</span> og <span class="f">S<sub>0</sub> × (1 − nedgang)</span> om ett år.</li><li>Lånet: beløpet i dag, beløpet × <span class="f">(1 + r<sub>f</sub>)</span> i begge grenene.</li></ol>`,
            ],
            fasit: `<div class="calc">Aksjen:                         Lån av $1:

        75  (= 60 × 1.25)              1.10
       /                              /
    60                              1
       \\                              \\
        48  (= 60 × 0.80)              1.10</div>` },
          { l: "b",
            ctx: `Suppose that we are interested in pricing a European put option on this stock. The option has a strike price of $66, and its maturity is exactly one year from now.`,
            q: `<p>In order to price the option, we first form a replicating portfolio by buying Δ shares of the stock and by lending B dollars at the risk-free rate. What is the cost of this portfolio as a function of Δ and B?</p>`,
            hint: [
              `<p>Kostnaden er det porteføljen koster i dag.</p>`,
              `<p>Δ aksjer koster <span class="f">Δ × S<sub>0</sub></span>. Å låne ut B koster B.</p>`,
              `<p>Legg sammen de to postene.</p>`,
              `<ol><li>Aksjene: <span class="f">Δ × S<sub>0</sub></span>.</li><li>Utlånet: B.</li><li>Summer.</li></ol>`,
            ],
            fasit: `<div class="calc">Kostnad = 60Δ + B</div>` },
          { l: "c",
            q: `<p>Draw the one-period binomial tree for this portfolio.</p>`,
            hint: [
              `<p>Porteføljen er verdt det aksjene og lånet er verdt i hver gren.</p>`,
              `<p>Opp: <span class="f">Δ × S<sub>u</sub> + B(1 + r<sub>f</sub>)</span>. Ned: <span class="f">Δ × S<sub>d</sub> + B(1 + r<sub>f</sub>)</span>.</p>`,
              `<p>Bruk <span class="f">S<sub>u</sub></span> og <span class="f">S<sub>d</sub></span> fra (a).</p>`,
              `<ol><li>I dag: kostnaden fra (b).</li><li>Opp: <span class="f">Δ × S<sub>u</sub> + B × (1 + r<sub>f</sub>)</span>.</li><li>Ned: <span class="f">Δ × S<sub>d</sub> + B × (1 + r<sub>f</sub>)</span>.</li></ol>`,
            ],
            fasit: `<div class="calc">           75Δ + 1.1B
          /
   60Δ + B
          \\
           48Δ + 1.1B</div>` },
          { l: "d",
            q: `<p>What are the two equations that will have to be satisfied by Δ and B?</p>`,
            hint: [
              `<p>Porteføljen skal replikere putten: den skal gi nøyaktig samme payoff i begge tilstandene.</p>`,
              `<p>Put-payoff: <span class="f">max(K − S, 0)</span>. Sett porteføljens verdi i hver gren lik put-payoffen der.</p>`,
              `<p>Regn <span class="f">P<sub>u</sub></span> og <span class="f">P<sub>d</sub></span> med K = 66.</p>`,
              `<ol><li><span class="f">P<sub>u</sub> = max(K − S<sub>u</sub>, 0)</span>.</li><li><span class="f">P<sub>d</sub> = max(K − S<sub>d</sub>, 0)</span>.</li><li><span class="f">Δ S<sub>u</sub> + (1 + r<sub>f</sub>)B = P<sub>u</sub></span>.</li><li><span class="f">Δ S<sub>d</sub> + (1 + r<sub>f</sub>)B = P<sub>d</sub></span>.</li></ol>`,
            ],
            fasit: `<div class="calc">P_u = max(66 − 75, 0) = 0
P_d = max(66 − 48, 0) = 18

75Δ + 1.1B = 0
48Δ + 1.1B = 18</div>` },
          { l: "e",
            q: `<p>Solve the equations for Δ and B. In words, what is your portfolio?</p>`,
            hint: [
              `<p>To likninger og to ukjente. Trekk den ene fra den andre, så forsvinner B.</p>`,
              `<span class="f">Δ = (P<sub>u</sub> − P<sub>d</sub>) / (S<sub>u</sub> − S<sub>d</sub>)</span>. <span class="f">B = (P<sub>u</sub> − Δ S<sub>u</sub>) / (1 + r<sub>f</sub>)</span>.`,
              `<p>For en put er Δ negativ: du shorter aksjen. Fortegnet på B sier om du låner ut (+) eller låner (−).</p>`,
              `<ol><li>Finn Δ fra differansen mellom likningene.</li><li>Sett Δ inn i en av likningene og løs for B.</li><li>Tolk fortegnene.</li></ol>`,
            ],
            fasit: `<div class="calc">27Δ = −18  →  Δ = −2/3
B = (0 − 75 × (−2/3)) / 1.1 = 50 / 1.1 = 45.45</div>
<p>Short 2/3 aksje og lån ut $45.45 til risikofri rente.</p>` },
          { l: "f",
            q: `<p>Using your answer from part (e), what should the price of the put option be?</p>`,
            hint: [
              `<p>Samme payoff i alle tilstander betyr samme pris. Ellers finnes det arbitrasje.</p>`,
              `<span class="f">P = Δ S<sub>0</sub> + B</span>.`,
              `<p>Sett Δ og B fra (e) inn i kostnaden fra (b).</p>`,
              `<ol><li><span class="f">P = Δ S<sub>0</sub> + B</span>.</li><li>Kontroll med risikonøytral sannsynlighet: <span class="f">ρ = ((1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>) / (S<sub>u</sub> − S<sub>d</sub>)</span> og <span class="f">P = (ρ P<sub>u</sub> + (1 − ρ) P<sub>d</sub>) / (1 + r<sub>f</sub>)</span>.</li></ol>`,
            ],
            fasit: `<div class="calc">P = 60 × (−2/3) + 45.45 = −40 + 45.45 = $5.45

Kontroll: ρ = (66 − 48) / (75 − 48) = 2/3
          P = (2/3 × 0 + 1/3 × 18) / 1.1 = 6 / 1.1 = 5.45  ✓</div>` },
          { l: "g",
            q: `<p>Since the stock price can only take two possible values at the end of the year in this binomial world, you are not perfectly satisfied with this price. Calculate a more reasonable price for this put option using the Black-Scholes formula (and something else...!). In your calculations, use a stock price volatility (σ) of 0.22.</p>`,
            hint: [
              `<p>Black-Scholes gir prisen på en call. «Something else» er put-call-pariteten.</p>`,
              `<p><span class="f">C = S N(d<sub>1</sub>) − PV(K) N(d<sub>2</sub>)</span>, <span class="f">d<sub>1</sub> = ln(S / PV(K)) / (σ√T) + σ√T / 2</span>, <span class="f">d<sub>2</sub> = d<sub>1</sub> − σ√T</span>. Paritet: <span class="f">P = C − S + PV(K)</span>.</p>`,
              `<p>Kurset bruker <span class="f">PV(K) = K / (1 + r<sub>f</sub>)<sup>T</sup></span>. Her er PV(K) = 66 / 1.1 = 60 = S, så logaritmen blir 0.</p>`,
              `<ol><li>Regn PV(K).</li><li>Regn <span class="f">d<sub>1</sub></span> og <span class="f">d<sub>2</sub></span>.</li><li>Slå opp <span class="f">N(d<sub>1</sub>)</span> og <span class="f">N(d<sub>2</sub>)</span>.</li><li>Regn C.</li><li><span class="f">P = C − S + PV(K)</span>.</li></ol>`,
            ],
            fasit: `<div class="calc">PV(K) = 66 / 1.1 = 60  →  ln(60/60) = 0
d_1 = 0 + 0.22/2 = 0.11
d_2 = 0.11 − 0.22 = −0.11
N(0.11) = 0.5438,  N(−0.11) = 0.4562

C = 60 × 0.5438 − 60 × 0.4562 = 32.628 − 27.372 = 5.256
P = C − S + PV(K) = 5.256 − 60 + 60 = $5.26</div>
<p>Siden S = PV(K), er putten og callen like mye verdt.</p>` },
        ] },
      /* ---------------- 2 ---------------- */
      { nr: 2, niva: 3, tema: "Binomial Model", tittel: "Delinquent Joe Inc.",
        intro: `<p>During the upcoming year, the stock price of Delinquent Joe Inc. (DJ) is expected to go up to $290 or down to $170 with equal probabilities. The beta of the stock is equal to 0.75. The annual risk-free rate is 10.5%, and the expected annual return on the market is 16.5%. You are interested in replicating and pricing a European call option on DJ's stock. The option has a strike price of $212 and will mature in one year.</p>`,
        deler: [
          { l: "a",
            q: `<p>What is the current price of DJ's stock?</p>`,
            hint: [
              `<p>Kursen i dag er forventet kurs om ett år, diskontert med aksjens avkastningskrav.</p>`,
              `<p>CAPM: <span class="f">r = r<sub>f</sub> + β(r<sub>m</sub> − r<sub>f</sub>)</span>. <span class="f">S<sub>0</sub> = E[S<sub>1</sub>] / (1 + r)</span>.</p>`,
              `<p>Opp og ned er like sannsynlige. Aksjen betaler ikke utbytte.</p>`,
              `<ol><li>Avkastningskrav fra CAPM.</li><li>Forventet kurs om ett år med de virkelige sannsynlighetene.</li><li>Diskonter.</li></ol>`,
            ],
            fasit: `<div class="calc">r = 10.5% + 0.75 × (16.5% − 10.5%) = 15%
S_0 = (0.5 × 290 + 0.5 × 170) / 1.15 = 230 / 1.15 = $200</div>` },
          { l: "b",
            q: `<p>Using the stock and borrowing/lending (at the riskfree rate), form a portfolio that will replicate the call option. How many shares of DJ will you buy/sell, and how much money will you borrow/lend?</p>`,
            hint: [
              `<p>Finn en portefølje av aksjer og lån som gir samme payoff som callen i begge tilstandene.</p>`,
              `<span class="f">Δ = (C<sub>u</sub> − C<sub>d</sub>) / (S<sub>u</sub> − S<sub>d</sub>)</span>. <span class="f">B = (C<sub>d</sub> − Δ S<sub>d</sub>) / (1 + r<sub>f</sub>)</span>.`,
              `<p><span class="f">C<sub>u</sub> = max(290 − 212, 0)</span> og <span class="f">C<sub>d</sub> = max(170 − 212, 0)</span>. Negativ B betyr at du låner.</p>`,
              `<ol><li>Call-payoff i begge tilstandene.</li><li>Δ fra differansen i payoff og kurs.</li><li>B fra ned-tilstanden.</li><li>Tolk fortegnene.</li></ol>`,
            ],
            fasit: `<div class="calc">C_u = 290 − 212 = 78,  C_d = 0
Δ = (78 − 0) / (290 − 170) = 0.65
B = (0 − 0.65 × 170) / 1.105 = −110.5 / 1.105 = −100</div>
<p>Kjøp 0.65 aksjer og lån $100 til risikofri rente.</p>` },
          { l: "c",
            q: `<p>Use the portfolio derived in part (b) to price the call option.</p>`,
            hint: [
              `<p>Samme payoff gir samme pris.</p>`,
              `<span class="f">C = Δ S<sub>0</sub> + B</span>.`,
              `<p><span class="f">S<sub>0</sub></span> fra (a), Δ og B fra (b).</p>`,
              `<ol><li>Sett inn i <span class="f">C = Δ S<sub>0</sub> + B</span>.</li></ol>`,
            ],
            fasit: `<div class="calc">C = 0.65 × 200 − 100 = $30</div>` },
          { l: "d",
            q: `<p>What is the beta and expected return of the call option?</p>`,
            hint: [
              `<p>Callen er en portefølje av aksjen og et risikofritt lån. Betaen til en portefølje er det verdivektede snittet av betaene.</p>`,
              `<span class="f">β<sub>C</sub> = (Δ S<sub>0</sub> / C) β<sub>S</sub> + (B / C) β<sub>rf</sub></span>, med <span class="f">β<sub>rf</sub> = 0</span>. Deretter CAPM.`,
              `<p>Vektene er aksjeposisjonen delt på callprisen og lånet delt på callprisen. Lånevekten er negativ. Vektene summerer til 1.</p>`,
              `<ol><li>Vekt på aksjen = <span class="f">Δ S<sub>0</sub> / C</span>.</li><li><span class="f">β<sub>C</sub></span> = vekt × <span class="f">β<sub>S</sub></span>.</li><li><span class="f">r<sub>C</sub> = r<sub>f</sub> + β<sub>C</sub>(r<sub>m</sub> − r<sub>f</sub>)</span>.</li></ol>`,
            ],
            fasit: `<div class="calc">β_C = (0.65 × 200 / 30) × 0.75 + (−100 / 30) × 0 = 4.333 × 0.75 = 3.25
r_C = 10.5% + 3.25 × 6% = 30%</div>
<p>Callen er en giret posisjon i aksjen. Derfor er betaen mye høyere enn aksjens.</p>` },
          { l: "e",
            q: `<p>Using the result from part (d), show that the price of the call option found in part (c) can also be derived by discounting the expected cash flow of the option.</p>`,
            hint: [
              `<p>Bruk de virkelige sannsynlighetene og callens eget avkastningskrav.</p>`,
              `<span class="f">C = E[payoff] / (1 + r<sub>C</sub>)</span>.`,
              `<p>Forventet payoff med 50/50. <span class="f">r<sub>C</sub></span> fra (d).</p>`,
              `<ol><li>Forventet payoff = sannsynlighet for opp × <span class="f">C<sub>u</sub></span> + sannsynlighet for ned × <span class="f">C<sub>d</sub></span>.</li><li>Del på <span class="f">1 + r<sub>C</sub></span>.</li><li>Sammenlign med (c).</li></ol>`,
            ],
            fasit: `<div class="calc">E[payoff] = 0.5 × 78 + 0.5 × 0 = 39
C = 39 / 1.30 = $30  ✓ samme som (c)</div>` },
        ] },
      /* ---------------- 3 ---------------- */
      { nr: 3, niva: 3, tema: "Black-Scholes", tittel: "Roslin Robotics",
        intro: `<p>Roslin Robotics stock has a volatility of 30% and a current stock price of $60 per share. Roslin pays no dividends. The risk-free interest is 5%.</p>
<p class="tiny muted">Black-Scholes regnes ikke på eksamen (Kurbatov i oppsummeringsforelesningen). Øv på intuisjonen: retningen på endringene.</p>`,
        deler: [
          { l: "a",
            q: `<p>Determine the Black-Scholes value of a one-year, at-the-money call option on Roslin stock.</p>`,
            hint: [
              `<p>At-the-money betyr at strike er lik dagens kurs.</p>`,
              `<p><span class="f">C = S N(d<sub>1</sub>) − PV(K) N(d<sub>2</sub>)</span>, <span class="f">d<sub>1</sub> = ln(S / PV(K)) / (σ√T) + σ√T / 2</span>, <span class="f">d<sub>2</sub> = d<sub>1</sub> − σ√T</span>.</p>`,
              `<p>K = 60, T = 1 og σ = 0.30. Kurset bruker <span class="f">PV(K) = K / (1 + r<sub>f</sub>)<sup>T</sup></span>.</p>`,
              `<ol><li>PV(K).</li><li><span class="f">d<sub>1</sub></span> og <span class="f">d<sub>2</sub></span>.</li><li><span class="f">N(d<sub>1</sub>)</span> og <span class="f">N(d<sub>2</sub>)</span>.</li><li>C.</li></ol>`,
            ],
            fasit: `<div class="calc">PV(K) = 60 / 1.05 = 57.143
d_1 = ln(60 / 57.143) / 0.30 + 0.30/2 = 0.1626 + 0.15 = 0.3126
d_2 = 0.3126 − 0.30 = 0.0126
N(d_1) = 0.62272,  N(d_2) = 0.50504

C = 60 × 0.62272 − 57.143 × 0.50504 = 37.363 − 28.860 = $8.50</div>` },
          { l: "b",
            ctx: `What is the impact on the value of this call option of each of the following changes (evaluated separately)?`,
            q: `<p>The stock price increases by $1 to $61.</p>`,
            hint: [
              `<p>En call er retten til å kjøpe. Høyere kurs gjør den mer verdt.</p>`,
              `<p>Regn Black-Scholes på nytt med S = 61. Endringen er omtrent <span class="f">N(d<sub>1</sub>)</span> per dollar, altså callens delta.</p>`,
              `<p>Bare S endres. PV(K), σ og T er som i (a).</p>`,
              `<ol><li>Nye <span class="f">d<sub>1</sub></span> og <span class="f">d<sub>2</sub></span> med den nye kursen.</li><li>Ny C.</li><li>Sammenlign med (a) og med <span class="f">N(d<sub>1</sub>)</span> fra (a).</li></ol>`,
            ],
            fasit: `<div class="calc">d_1 = ln(61 / 57.143) / 0.30 + 0.15 = 0.2177 + 0.15 = 0.3677
d_2 = 0.0677
C = 61 × 0.64346 − 57.143 × 0.52700 = 39.251 − 30.114 = $9.14   (+0.63)</div>
<p>Økningen ligger nær <span class="f">N(d<sub>1</sub>)</span> = 0.62 fra (a).</p>` },
          { l: "c",
            q: `<p>The volatility of the stock goes up by 1% to 31%.</p>`,
            hint: [
              `<p>Høyere volatilitet gir mer oppside. For den som eier opsjonen, er nedsiden fortsatt begrenset til 0.</p>`,
              `<p>Regn Black-Scholes på nytt med σ = 0.31.</p>`,
              `<p>σ√T endres i både <span class="f">d<sub>1</sub></span> og <span class="f">d<sub>2</sub></span>. PV(K) er som i (a).</p>`,
              `<ol><li>Nye <span class="f">d<sub>1</sub></span> og <span class="f">d<sub>2</sub></span> med den nye volatiliteten.</li><li>Ny C.</li><li>Sammenlign med (a).</li></ol>`,
            ],
            fasit: `<div class="calc">d_1 = ln(60 / 57.143) / 0.31 + 0.31/2 = 0.1574 + 0.155 = 0.3124
d_2 = 0.3124 − 0.31 = 0.0024
C = 60 × 0.62263 − 57.143 × 0.50095 = 37.358 − 28.626 = $8.73   (+0.23)</div>
<p>Opsjonsverdien stiger med volatiliteten.</p>` },
          { l: "d",
            q: `<p>Interest rates go up by 1% to 6%.</p>`,
            hint: [
              `<p>Høyere rente gjør nåverdien av strike lavere. Det er bra for den som skal betale strike senere.</p>`,
              `<p>Regn Black-Scholes på nytt med <span class="f">PV(K) = 60 / 1.06</span>.</p>`,
              `<p>Bare PV(K) endres, men den inngår både i <span class="f">d<sub>1</sub></span> og i selve formelen.</p>`,
              `<ol><li>Ny PV(K).</li><li>Nye <span class="f">d<sub>1</sub></span> og <span class="f">d<sub>2</sub></span>.</li><li>Ny C.</li><li>Sammenlign med (a).</li></ol>`,
            ],
            fasit: `<div class="calc">PV(K) = 60 / 1.06 = 56.604
d_1 = ln(60 / 56.604) / 0.30 + 0.15 = 0.1942 + 0.15 = 0.3442
d_2 = 0.0442
C = 60 × 0.63466 − 56.604 × 0.51764 = 38.080 − 29.300 = $8.78   (+0.28)</div>` },
          { l: "e",
            q: `<p>One month elapses, with no other change.</p>`,
            hint: [
              `<p>Kortere løpetid gir mindre tid for kursen til å bevege seg. Strike betales også tidligere.</p>`,
              `<p>Regn Black-Scholes på nytt med T = 11/12.</p>`,
              `<p>Både σ√T og <span class="f">PV(K) = 60 / 1.05<sup>T</sup></span> endres.</p>`,
              `<ol><li>Ny T = gjenværende løpetid i år.</li><li>Ny PV(K) og ny σ√T.</li><li>Nye <span class="f">d<sub>1</sub></span> og <span class="f">d<sub>2</sub></span>.</li><li>Ny C. Sammenlign med (a).</li></ol>`,
            ],
            fasit: `<div class="calc">T = 11/12,  σ√T = 0.30 × √(11/12) = 0.2872
PV(K) = 60 / 1.05^(11/12) = 57.376
d_1 = ln(60 / 57.376) / 0.2872 + 0.2872/2 = 0.1557 + 0.1436 = 0.2993
d_2 = 0.2993 − 0.2872 = 0.0121
C = 60 × 0.61765 − 57.376 × 0.50483 = 37.059 − 28.965 = $8.09   (−0.41)</div>` },
          { l: "f",
            q: `<p>The firm announces a $1 dividend, paid immediately.</p>`,
            hint: [
              `<p>Utbyttet tas ut av aksjen. Kursen faller med utbyttet når det betales. Opsjonseieren får ikke utbyttet.</p>`,
              `<p>Regn Black-Scholes på nytt med kursen etter utbytte. Strike er fortsatt 60.</p>`,
              `<p>Kursen etter utbytte er <span class="f">S − Div</span>. Alt annet er som i (a).</p>`,
              `<ol><li>Kurs etter utbytte.</li><li>Nye <span class="f">d<sub>1</sub></span> og <span class="f">d<sub>2</sub></span>.</li><li>Ny C. Sammenlign med (a).</li></ol>`,
            ],
            fasit: `<div class="calc">S_ex = 60 − 1 = 59
d_1 = ln(59 / 57.143) / 0.30 + 0.15 = 0.1066 + 0.15 = 0.2566
d_2 = −0.0434
C = 59 × 0.60126 − 57.143 × 0.48270 = 35.474 − 27.583 = $7.89   (−0.61)</div>` },
        ] },
      /* ---------------- 4 ---------------- */
      { nr: 4, niva: 3, tema: "Risk-Neutral Pricing", tittel: "Harbin Manufacturing",
        intro: `<p>Harbin Manufacturing has 10 million shares outstanding with a current share price of $20 per share. In one year, the share price is equally likely to be $30 or $18. The risk-free interest rate is 5%.</p>`,
        deler: [
          { l: "a",
            q: `<p>What is the expected return on Harbin stock?</p>`,
            hint: [
              `<p>Forventet avkastning bruker de virkelige sannsynlighetene.</p>`,
              `<span class="f">E[R] = E[S<sub>1</sub>] / S<sub>0</sub> − 1</span>.`,
              `<p>De to utfallene er like sannsynlige.</p>`,
              `<ol><li>Forventet kurs om ett år.</li><li>Del på dagens kurs og trekk fra 1.</li></ol>`,
            ],
            fasit: `<div class="calc">E[R] = (0.5 × 30 + 0.5 × 18) / 20 − 1 = 24 / 20 − 1 = 20%</div>` },
          { l: "b",
            q: `<p>What is the risk neutral probability that Harbin's stock price will increase?</p>`,
            hint: [
              `<p>Den risikonøytrale sannsynligheten er den som gjør at aksjen gir risikofri avkastning i forventning.</p>`,
              `<span class="f">ρ = ((1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>) / (S<sub>u</sub> − S<sub>d</sub>)</span>.`,
              `<p>Det tilsvarer å løse <span class="f">S<sub>0</sub>(1 + r<sub>f</sub>) = ρ S<sub>u</sub> + (1 − ρ) S<sub>d</sub></span>.</p>`,
              `<ol><li><span class="f">(1 + r<sub>f</sub>)S<sub>0</sub></span>.</li><li>Trekk fra <span class="f">S<sub>d</sub></span>.</li><li>Del på <span class="f">S<sub>u</sub> − S<sub>d</sub></span>.</li></ol>`,
            ],
            fasit: `<div class="calc">ρ = (1.05 × 20 − 18) / (30 − 18) = 3 / 12 = 25%</div>` },
          { l: "c",
            q: `<p>Using the risk neutral probabilities, what is the value of a one-year call option on Harbin stock with a strike price of $25?</p>`,
            hint: [
              `<p>Med risikonøytrale sannsynligheter diskonterer du med den risikofrie renten.</p>`,
              `<span class="f">C = (ρ C<sub>u</sub> + (1 − ρ) C<sub>d</sub>) / (1 + r<sub>f</sub>)</span>.`,
              `<p><span class="f">C<sub>u</sub> = max(30 − 25, 0)</span> og <span class="f">C<sub>d</sub> = max(18 − 25, 0)</span>.</p>`,
              `<ol><li>Call-payoff i begge tilstandene.</li><li>Vekt med ρ og 1 − ρ.</li><li>Diskonter med <span class="f">r<sub>f</sub></span>.</li></ol>`,
            ],
            fasit: `<div class="calc">C_u = 5,  C_d = 0
C = (0.25 × 5 + 0.75 × 0) / 1.05 = $1.19</div>` },
          { l: "d",
            q: `<p>What is the expected return of the call option?</p>`,
            hint: [
              `<p>Forventet avkastning bruker de virkelige sannsynlighetene, ikke de risikonøytrale.</p>`,
              `<span class="f">E[R<sub>C</sub>] = E[payoff] / C − 1</span>.`,
              `<p>Virkelige sannsynligheter er 50/50. C fra (c).</p>`,
              `<ol><li>Forventet payoff med de virkelige sannsynlighetene.</li><li>Del på callprisen og trekk fra 1.</li></ol>`,
            ],
            fasit: `<div class="calc">E[R_C] = (0.5 × 5 + 0.5 × 0) / 1.19 − 1 = 2.5 / 1.19 − 1 = 110%</div>
<p>Callen er en giret posisjon i aksjen, så den har mye høyere forventet avkastning enn aksjen (20%).</p>` },
          { l: "e",
            q: `<p>Using the risk neutral probabilities, what is the value of a one-year put option on Harbin stock with a strike price of $25?</p>`,
            hint: [
              `<p>Samme metode som (c), men med put-payoff.</p>`,
              `<span class="f">P = (ρ P<sub>u</sub> + (1 − ρ) P<sub>d</sub>) / (1 + r<sub>f</sub>)</span>.`,
              `<p><span class="f">P<sub>u</sub> = max(25 − 30, 0)</span> og <span class="f">P<sub>d</sub> = max(25 − 18, 0)</span>. Kontroller med put-call-pariteten.</p>`,
              `<ol><li>Put-payoff i begge tilstandene.</li><li>Vekt med ρ og 1 − ρ.</li><li>Diskonter med <span class="f">r<sub>f</sub></span>.</li><li>Kontroll: <span class="f">C − P = S − PV(K)</span>.</li></ol>`,
            ],
            fasit: `<div class="calc">P_u = 0,  P_d = 7
P = (0.25 × 0 + 0.75 × 7) / 1.05 = 5.25 / 1.05 = $5.00

Kontroll: C − P = 1.19 − 5.00 = −3.81
          S − PV(K) = 20 − 25/1.05 = −3.81  ✓</div>` },
          { l: "f",
            q: `<p>What is the expected return of the put option?</p>`,
            hint: [
              `<p>Samme metode som (d). Putten betaler mest når aksjen faller.</p>`,
              `<span class="f">E[R<sub>P</sub>] = E[payoff] / P − 1</span> med virkelige sannsynligheter.`,
              `<p>P fra (e). Putten har negativ beta, så forventet avkastning kan være under risikofri rente.</p>`,
              `<ol><li>Forventet payoff med de virkelige sannsynlighetene.</li><li>Del på putprisen og trekk fra 1.</li></ol>`,
            ],
            fasit: `<div class="calc">E[R_P] = (0.5 × 0 + 0.5 × 7) / 5 − 1 = 3.5 / 5 − 1 = −30%</div>
<p>Putten er en forsikring mot kursfall. Den har negativ beta og derfor lavere forventet avkastning enn risikofri rente.</p>` },
        ] },
      /* ---------------- 5 ---------------- */
      { nr: 5, niva: 3, tema: "Black-Scholes", tittel: "Up, Inc.",
        intro: `<p>Rebecca is interested in purchasing a European call on a hot new stock, Up, Inc. The call has a strike price of $100 and expires in 90 days. The current price of Up stock is $120, and the stock has a standard deviation of 40% per year. The risk-free interest rate is 6.38% per year.</p>
<p class="tiny muted">Black-Scholes regnes ikke på eksamen (Kurbatov i oppsummeringsforelesningen). Øv på intuisjonen: retningen på endringene.</p>`,
        deler: [
          { l: "a",
            q: `<p>Using the Black-Scholes formula, compute the price of the call.</p>`,
            hint: [
              `<p>Løpetiden er oppgitt i dager, men volatilitet og rente er per år. Gjør T om til år.</p>`,
              `<p><span class="f">C = S N(d<sub>1</sub>) − PV(K) N(d<sub>2</sub>)</span>, <span class="f">d<sub>1</sub> = ln(S / PV(K)) / (σ√T) + σ√T / 2</span>, <span class="f">d<sub>2</sub> = d<sub>1</sub> − σ√T</span>.</p>`,
              `<p>T = 90/365. Kurset bruker <span class="f">PV(K) = K / (1 + r<sub>f</sub>)<sup>T</sup></span>.</p>`,
              `<ol><li>T i år.</li><li>PV(K).</li><li>σ√T.</li><li><span class="f">d<sub>1</sub></span> og <span class="f">d<sub>2</sub></span>.</li><li><span class="f">N(d<sub>1</sub>)</span> og <span class="f">N(d<sub>2</sub>)</span>.</li><li>C.</li></ol>`,
            ],
            fasit: `<div class="calc">T = 90/365 = 0.2466
PV(K) = 100 / 1.0638^(90/365) = 98.4866
σ√T = 0.40 × √(90/365) = 0.19863
d_1 = ln(120 / 98.4866) / 0.19863 + 0.19863/2 = 0.9947 + 0.0993 = 1.0940
d_2 = 1.0940 − 0.19863 = 0.8954
N(d_1) = 0.863024,  N(d_2) = 0.814708

C = 120 × 0.863024 − 98.4866 × 0.814708 = 103.5629 − 80.2378 = 23.3251 ≈ $23.33</div>
<p><b>Merknad:</b> Kursets løsning runder N(d<sub>1</sub>) og N(d<sub>2</sub>) til 0.863 og 0.815 og får $23.29. Med fire desimaler (0.8630 og 0.8147) blir det 23.32. Svaret er følsomt for avrundingen i N, så bruk minst fem desimaler.</p>` },
          { l: "b",
            q: `<p>Use put-call parity to compute the price of the put with the same strike and expiration date.</p>`,
            hint: [
              `<p>Put-call-pariteten binder sammen call, put, aksje og risikofritt lån med samme strike og forfall.</p>`,
              `<span class="f">C + PV(K) = P + S</span>, så <span class="f">P = C + PV(K) − S</span>.`,
              `<p>C fra (a) og samme PV(K) som i (a).</p>`,
              `<ol><li>C fra (a).</li><li>Legg til PV(K).</li><li>Trekk fra S.</li></ol>`,
            ],
            fasit: `<div class="calc">P = 23.3251 + 98.4866 − 120 = 1.8117 ≈ $1.81</div>
<p><b>Merknad:</b> Kursets løsning får $1.78 fordi den bruker callprisen 23.29 fra (a).</p>` },
        ] },
      /* ---------------- 6 ---------------- */
      { nr: 6, niva: 1, tema: "Equity and Debt as Options", tittel: "Google",
        intro: `<p>Suppose Google currently had 320 million shares outstanding, implying a market value of $135.1 billion. Assume perfect capital markets and a risk-free rate of 1%.</p>`,
        deler: [
          { l: "a",
            q: `<p>Use the option data from July 13, 2009 in the following figure to determine the rate Google would have paid if it had issued $128 billion in zero-coupon debt due in January 2011.</p>
<p><b>GOOG</b> 422.27 +7.87 · Jul 13 2009 @ 13:10 ET · Vol 2177516</p>
<table class="data"><tr><th>Calls</th><th>Bid</th><th>Ask</th><th>Open Int</th></tr>
<tr><td>11 Jan 150.0 (OZF AJ)</td><td class="n">273.60</td><td class="n">276.90</td><td class="n">100</td></tr>
<tr><td>11 Jan 160.0 (OZF AL)</td><td class="n">264.50</td><td class="n">267.20</td><td class="n">82</td></tr>
<tr><td>11 Jan 200.0 (OZF AA)</td><td class="n">228.90</td><td class="n">231.20</td><td class="n">172</td></tr>
<tr><td>11 Jan 250.0 (OZF AU)</td><td class="n">186.50</td><td class="n">188.80</td><td class="n">103</td></tr>
<tr><td>11 Jan 280.0 (OZF AX)</td><td class="n">162.80</td><td class="n">165.00</td><td class="n">98</td></tr>
<tr><td>11 Jan 300.0 (OZF AT)</td><td class="n">148.20</td><td class="n">150.10</td><td class="n">408</td></tr>
<tr><td>11 Jan 320.0 (OZF AD)</td><td class="n">133.90</td><td class="n">135.90</td><td class="n">63</td></tr>
<tr><td>11 Jan 340.0 (OZF AI)</td><td class="n">120.50</td><td class="n">122.60</td><td class="n">99</td></tr>
<tr><td>11 Jan 350.0 (OZF AK)</td><td class="n">114.10</td><td class="n">116.10</td><td class="n">269</td></tr>
<tr><td>11 Jan 360.0 (OZF AM)</td><td class="n">107.90</td><td class="n">110.00</td><td class="n">66</td></tr>
<tr><td>11 Jan 380.0 (OZF AZ)</td><td class="n">95.80</td><td class="n">98.00</td><td class="n">88</td></tr>
<tr><td>11 Jan 400.0 (OZF AU)</td><td class="n">85.10</td><td class="n">87.00</td><td class="n">2577</td></tr>
<tr><td>11 Jan 420.0 (OUP AG)</td><td class="n">74.60</td><td class="n">76.90</td><td class="n">66</td></tr>
<tr><td>11 Jan 450.0 (OUP AV)</td><td class="n">61.80</td><td class="n">63.30</td><td class="n">379</td></tr>
</table>`,
            hint: [
              `<p>Egenkapitalen i et firma med gjeld er en call på eiendelene med strike lik gjeldens pålydende. Calls på dagens gjeldfrie Google-aksje viser derfor hva egenkapitalen ville vært verdt med gjeld.</p>`,
              `<p>Pålydende per aksje = 128 mrd. / 320 mill. Finn callen med den strike og forfall i januar 2011. Bruk midtkursen (snittet av bid og ask). <span class="f">D = V − E</span>. <span class="f">YTM = (F / D)<sup>1/T</sup> − 1</span>.</p>`,
              `<p>Hver aksje etter gjeldsopptaket tilsvarer en call på én aksje i dagens Google. E = callpris × antall aksjer. Fra 13. juli 2009 til januar 2011 er det 18 måneder, så T = 1.5.</p>`,
              `<ol><li>Strike = pålydende / antall aksjer.</li><li>Callpris = (bid + ask) / 2.</li><li>E = callpris × antall aksjer.</li><li><span class="f">D = V − E</span>.</li><li><span class="f">YTM = (F / D)<sup>1/T</sup> − 1</span>, med T i år.</li></ol>`,
            ],
            fasit: `<div class="calc">Pålydende per aksje = 128 / 0.32 = $400
Call 11 Jan 400: (85.10 + 87.00) / 2 = 86.05

E = 86.05 × 320 mill. = $27.54 mrd.
D = 135.1 − 27.54 = $107.56 mrd.
YTM = (128 / 107.56)^(1/1.5) − 1 = 12.3%</div>
<p>Kredittspreaden er 12.3% − 1% = 11.3%.</p>
<p><b>Merknad:</b> Kursets løsning skriver at spreaden er 12.3% − 1% = 11.1%. Det er en regnefeil.</p>` },
          { l: "b",
            q: `<p>Suppose that in July 2009, Google were to issue $96 billion in zero-coupon senior debt and another $32 billion in zero-coupon junior debt, both due in January 2011. Use the option data above to determine the rate Google would pay on the junior debt issue. (Assume perfect capital markets.)</p>`,
            hint: [
              `<p>Seniorgjelden får betalt først, akkurat som gjelden i (a), bare med lavere pålydende. Juniorgjelden får det som ligger mellom seniorgjeldens pålydende og samlet pålydende.</p>`,
              `<p>Senior: strike = 96 mrd. / 320 mill. per aksje. <span class="f">D<sub>senior</sub> = V − n × C(300)</span>. Junior: <span class="f">n × (C(300) − C(400))</span>. <span class="f">YTM = (F / D)<sup>1/T</sup> − 1</span>.</p>`,
              `<p>Samlet pålydende er 128 mrd. som i (a), så egenkapitalen er den samme som i (a). Junior = V − senior − egenkapital.</p>`,
              `<ol><li><span class="f">K<sub>senior</sub> = F<sub>senior</sub> / n</span>. Callprisen med den strike = snittet av bid og ask.</li><li><span class="f">D<sub>senior</sub> = V − n × C(K<sub>senior</sub>)</span>.</li><li>E = n × C(K<sub>total</sub>) fra (a), der <span class="f">K<sub>total</sub> = (F<sub>senior</sub> + F<sub>junior</sub>) / n</span>.</li><li><span class="f">D<sub>junior</sub> = V − D<sub>senior</sub> − E</span>.</li><li><span class="f">YTM<sub>junior</sub> = (F<sub>junior</sub> / D<sub>junior</sub>)<sup>1/T</sup> − 1</span>.</li></ol>`,
            ],
            fasit: `<div class="calc">Strike senior = 96 / 0.32 = $300
Call 11 Jan 300: (148.20 + 150.10) / 2 = 149.15

D_senior = 135.1 − 149.15 × 0.32 = 135.1 − 47.728 = 87.372 mrd.
E = 86.05 × 0.32 = 27.536 mrd. (som i a)
D_junior = 135.1 − 87.372 − 27.536 = 20.192 mrd.
         = 0.32 × (149.15 − 86.05)  ✓

YTM_junior = (32 / 20.192)^(1/1.5) − 1 = 35.9%
(YTM_senior = (96 / 87.372)^(1/1.5) − 1 = 6.48%)</div>
<p><b>Merknad:</b> Kursets skriftlige løsning runder seniorgjelden til 87.4 før den trekkes fra. Da blir juniorgjelden 20.16 og renten 36.1% (og 6.46% på seniorgjelden). Tavlenotatene fra gjennomgangen av settet (s3.pdf, s. 2) viser 87.37, 20.19 og 35.9%, som her.</p>` },
        ] },
      /* ---------------- 7 ---------------- */
      { nr: 7, niva: 1, tema: "Equity and Debt as Options", tittel: "Wesley Corp.",
        intro: `<p>Wesley Corp. stock is trading for $25/share. Wesley has 20 million shares outstanding and a market debt-equity ratio of 0.5. Wesley's debt is zero-coupon debt with a 5-year maturity and a yield to maturity of 10%.</p>`,
        deler: [
          { l: "a",
            q: `<p>Describe Wesley's equity as a call option. What is the maturity of the call option? What is the market value of the asset underlying this call option? What is the strike price of this call option?</p>`,
            hint: [
              `<p>Aksjonærene får det som er igjen når gjelden er betalt. Er eiendelene verdt mindre enn gjelden, får de ingenting.</p>`,
              `<p>Egenkapital = call på firmaets eiendeler: payoff <span class="f">max(V<sub>T</sub> − F, 0)</span>. Løpetid = gjeldens forfall. Strike = gjeldens pålydende F.</p>`,
              `<p>Eiendelene er <span class="f">V = E + D</span>, med D fra gjeldsgraden. Pålydende er markedsverdien av gjelden vokst med YTM i fem år.</p>`,
              `<ol><li>E = kurs × aksjer.</li><li>D = (D/E) × E.</li><li>V = E + D.</li><li><span class="f">F = D × (1 + YTM)<sup>T</sup></span>, der T er gjeldens løpetid.</li><li>Beskriv: call på V med strike F og løpetid T.</li></ol>`,
            ],
            fasit: `<div class="calc">E = 25 × 20 = $500 mill.
D = 0.5 × 500 = $250 mill.
V = 500 + 250 = $750 mill.
F = 250 × 1.10^5 = $402.6 mill.</div>
<p>Egenkapitalen er en europeisk call på firmaets eiendeler. Løpetid 5 år, underliggende verdi $750 mill. og strike $402.6 mill. (gjeldens pålydende). Payoff ved forfall: <span class="f">max(V<sub>5</sub> − 402.6, 0)</span>.</p>
<p><b>Merknad:</b> Kursets løsning skriver strike som «250 × (1.1) × 5». Det skal være 250 × 1.1<sup>5</sup>. Tallet 402.6 er riktig.</p>` },
          { l: "b",
            q: `<p>Describe Wesley's debt using a call option.</p>`,
            hint: [
              `<p>Eiendelene deles mellom gjeld og egenkapital. Gjelden er det som er igjen når egenkapitalen er tatt ut.</p>`,
              `<span class="f">D = V − E = V − C(V, F)</span>.`,
              `<p>Bruk callen fra (a). Sjekk payoff ved forfall: <span class="f">V<sub>T</sub> − max(V<sub>T</sub> − F, 0) = min(V<sub>T</sub>, F)</span>.</p>`,
              `<ol><li>Lang posisjon i eiendelene.</li><li>Kort posisjon i callen fra (a).</li><li>Vis at payoffen er <span class="f">min(V<sub>T</sub>, F)</span>.</li></ol>`,
            ],
            fasit: `<p>Gjelden = lang i firmaets eiendeler + kort i callen fra (a) (callen på eiendelene med strike $402.6 mill. og 5 års løpetid, som er egenkapitalen).</p>
<div class="calc">Payoff ved forfall: V_5 − max(V_5 − 402.6, 0) = min(V_5, 402.6)</div>` },
          { l: "c",
            q: `<p>Describe Wesley's debt using a put option.</p>`,
            hint: [
              `<p>Risikabel gjeld er risikofri gjeld minus det långiverne taper ved mislighold. Det tapet ser ut som en put.</p>`,
              `<p><span class="f">D = PV(F) − P(V, F)</span>: risikofri obligasjon minus en put på eiendelene.</p>`,
              `<p>Den risikofrie obligasjonen og putten har samme pålydende og strike som gjelden og samme løpetid. Sjekk payoff: <span class="f">F − max(F − V<sub>T</sub>, 0) = min(V<sub>T</sub>, F)</span>.</p>`,
              `<ol><li>Lang i en risikofri nullkupongobligasjon med pålydende F.</li><li>Kort i en put på eiendelene med strike F og samme løpetid.</li><li>Vis at payoffen er <span class="f">min(V<sub>T</sub>, F)</span>.</li></ol>`,
            ],
            fasit: `<p>Gjelden = lang i en risikofri nullkupongobligasjon med pålydende $402.6 mill. og 5 års løpetid + kort i en put på firmaets eiendeler med strike $402.6 mill. og 5 års løpetid.</p>
<div class="calc">Payoff ved forfall: 402.6 − max(402.6 − V_5, 0) = min(V_5, 402.6)</div>
<p><b>Merknad:</b> Kursets løsning sier «$250 million face value». 250 er markedsverdien av gjelden i dag. Pålydende og strike er 402.6.</p>` },
        ] },
      /* ---------------- 8 ---------------- */
      { nr: 8, niva: 3, tema: "Real Options", tittel: "Widget-prosjektet",
        intro: `<p>You are planning to invest in a project for the production of widgets. The cost of the project is $10M and the project generates a single cash flow one year after the investment. Demand for widgets can be either high or low with equal probability. If demand is high, the cash flow that the project generates is $22M. If demand is low, this cash flow is only $6M. Assume demand is uncorrelated with the market so that you can discount at the risk free rate of 10%.</p>`,
        deler: [
          { l: "a",
            q: `<p>What is the NPV of the project?</p>`,
            hint: [
              `<p>Investeringen skjer i dag og kontantstrømmen kommer om ett år.</p>`,
              `<span class="f">NPV = −I + E[CF<sub>1</sub>] / (1 + r<sub>f</sub>)</span>.`,
              `<p>Høy og lav etterspørsel er like sannsynlige. Risikoen er ikke markedsrisiko, så du diskonterer med risikofri rente.</p>`,
              `<ol><li>Forventet kontantstrøm.</li><li>Diskonter ett år.</li><li>Trekk fra investeringen.</li></ol>`,
            ],
            fasit: `<div class="calc">NPV = −10 + (0.5 × 22 + 0.5 × 6) / 1.1 = −10 + 12.73 = $2.73M</div>` },
          { l: "b",
            q: `<p>Suppose that you can commission a study that costs $1.5M today (year 0). This study will tell you whether demand is high or low. However, the study will take one year to complete. That is, if you commission the study, you pay the $1.5M today (year 0), then you decide whether or not to invest in year 1, and if you invest, the cash flow arrives at year 2. Should you commission this study?</p>`,
            hint: [
              `<p>Studien gir deg en opsjon: du kan la være å investere når etterspørselen er lav. Prisen er studiekostnaden og ett års utsettelse.</p>`,
              `<p>Lag et beslutningstre. I år 1 investerer du bare hvis verdien av å investere er positiv: <span class="f">max(−I + CF<sub>2</sub> / (1 + r<sub>f</sub>), 0)</span>.</p>`,
              `<p>Regn verdien i år 1 i hver tilstand, ta forventningen og diskonter ett år. Trekk fra studiekostnaden og sammenlign med (a).</p>`,
              `<ol><li>År 1, høy: <span class="f">−I + CF<sub>høy</sub> / (1 + r<sub>f</sub>)</span>. År 1, lav: <span class="f">−I + CF<sub>lav</sub> / (1 + r<sub>f</sub>)</span>.</li><li>Velg max(verdi, 0) i hver tilstand.</li><li>Forventning med de virkelige sannsynlighetene, diskontert ett år.</li><li>Trekk fra studiekostnaden.</li><li>Sammenlign med NPV i (a).</li></ol>`,
            ],
            fasit: `<div class="calc">År 1, høy:  −10 + 22 / 1.1 = 10     → invester
År 1, lav:  −10 + 6 / 1.1 = −4.55   → ikke invester (0)

NPV med studie = −1.5 + (0.5 × 10 + 0.5 × 0) / 1.1 = −1.5 + 4.55 = $3.05M</div>
<p>3.05 > 2.73, så du bør kjøpe studien. Du kan betale opptil 4.55 − 2.73 = $1.82M for den.</p>` },
          { l: "c",
            q: `<p>Suppose that you discover that your estimate of the cash flows was wrong. You now believe that if demand is high the cash flow will be much higher than $22M and if demand is low the cash flow will be much lower than $6M. Will your decision to buy the study change? Explain. (You do not need any calculations here.)</p>`,
            hint: [
              `<p>Studien er en opsjon. Hva skjer med verdien av en opsjon når usikkerheten øker?</p>`,
              `<p>Se på de to alternativene hver for seg: å investere nå og å kjøpe studien.</p>`,
              `<p>Investerer du nå, avhenger NPV bare av forventet kontantstrøm. Med studien investerer du bare ved høy etterspørsel. Hvilken av de to grenene påvirker deg da?</p>`,
              `<ol><li>Invester nå: anta at bare spredningen øker, slik at forventet kontantstrøm er uendret. Da er NPV uendret.</li><li>Studie: høy gren blir bedre. Lav gren betyr ingenting, du investerer ikke der.</li><li>Konkluder om beslutningen.</li></ol>`,
            ],
            fasit: `<p>Nei, du kjøper fortsatt studien. Den blir bare mer verdt.</p>
<ul><li><b>Invester nå:</b> vi antar at bare spredningen øker, slik at forventet kontantstrøm er uendret. Da er NPV uendret.</li>
<li><b>Studien:</b> ved høy etterspørsel er kontantstrømmen høyere, så verdien i den grenen stiger. Ved lav etterspørsel investerer du ikke, så det spiller ingen rolle at kontantstrømmen er lavere.</li></ul>
<p>Høyere volatilitet øker verdien av opsjonen studien gir, akkurat som for en call.</p>` },
        ] },
      /* ---------------- 9 ---------------- */
      { nr: 9, niva: 3, tema: "Real Options", tittel: "Hatch Corporation",
        intro: `<p>Hatch Corporation is thinking of building a Survivor Camp far out in the corn fields outside of Chicago. Similar camps already exist around the US. The investment will cost $250M and cash flows will start arriving one year after the investment. Because of the violent and dangerous nature of such camps, the CEO of Hatch Corporation estimates that there is a probability p = .1 of the industry being subject to a lawsuit this year. The lawsuit is equally likely to be successful and to be dismissed. In case the lawsuit is successful, all such camps will be banned and cash flows will be 0 forever. If the lawsuit is dismissed, the extra attention created will increase demand and cash flows are expected to go up to $100M per year forever. If there is no lawsuit at all this year, the cash flows are expected to be $50M forever. The cash flows and timing if you invest in year 0 are given in the tree below.</p>
<table class="data"><tr><th>Year 0</th><th>Probability</th><th>Year 1 to ∞</th></tr>
<tr><td rowspan="3">−250</td><td>p/2</td><td>100 each year</td></tr>
<tr><td>(1−p)</td><td>50 each year</td></tr>
<tr><td>p/2</td><td>0 each year</td></tr></table>
<p>For the calculations below, use a 10% rate for discounting all cash flows.</p>`,
        deler: [
          { l: "a",
            q: `<p>Assuming the CEO decides to invest today, what is the NPV of the project?</p>`,
            hint: [
              `<p>Investerer du i dag, får du den forventede kontantstrømmen hvert år for alltid fra år 1.</p>`,
              `<p>Forventet årlig kontantstrøm, deretter evigvarende annuitet: <span class="f">NPV = −I + E[CF] / r</span>.</p>`,
              `<p>Sannsynlighetene er p/2, 1 − p og p/2 med p = 0.1.</p>`,
              `<ol><li><span class="f">E[CF] = (p/2) × CF<sub>avvist</sub> + (1 − p) × CF<sub>ingen</sub> + (p/2) × CF<sub>vunnet</sub></span>.</li><li>Nåverdi = <span class="f">E[CF] / r</span>.</li><li>Trekk fra investeringen.</li></ol>`,
            ],
            fasit: `<div class="calc">E[CF] = 0.05 × 100 + 0.9 × 50 + 0.05 × 0 = 50
NPV_0 = −250 + 50 / 0.1 = $250M</div>` },
          { l: "b",
            q: `<p>Now assume that the CEO decides to wait until year 1 to make the investment. (Of course, cash flows will not start arriving until in year 2 then.) Assume that the CEO can make the investment decision after observing whether there was a lawsuit or not and the outcome of the lawsuit. What is the NPV (as of year 0) of this strategy? Is he better or worse off than when he invested at 0? Explain the intuition.</p>`,
            hint: [
              `<p>Venter du, kan du la være å investere i tilstanden der kontantstrømmen blir 0. Men du mister kontantstrømmen i år 1.</p>`,
              `<p>NPV i år 1 i hver tilstand: <span class="f">max(−I + CF / r, 0)</span>. Ta forventningen og diskonter ett år.</p>`,
              `<p>Verdien i år 1 er <span class="f">−250 + CF / 0.1</span>, fordi kontantstrømmene starter i år 2. Sammenlign med (a).</p>`,
              `<ol><li>År 1, søksmål avvist: <span class="f">−I + CF<sub>avvist</sub> / r</span>.</li><li>År 1, ikke søksmål: <span class="f">−I + CF<sub>ingen</sub> / r</span>.</li><li>År 1, søksmål vunnet: ikke invester (verdi 0).</li><li>Vekt med p/2, 1 − p og p/2 og diskonter ett år.</li><li>Sammenlign med (a) og forklar avveiningen.</li></ol>`,
            ],
            fasit: `<div class="calc">År 1, søksmål avvist:  −250 + 100 / 0.1 = 750
År 1, ikke søksmål:    −250 + 50 / 0.1 = 250
År 1, søksmål vunnet:  ikke invester    = 0

NPV_vent = (0.05 × 750 + 0.9 × 250 + 0.05 × 0) / 1.1 = 262.5 / 1.1 = $238.6M</div>
<p>238.6 < 250, så det lønner seg ikke å vente. Du mister kontantstrømmen i år 1. Informasjonen er ikke verdt nok til å veie opp for det. Det er lite sannsynlig (5%) at prosjektet blir verdiløst.</p>` },
          { l: "c",
            q: `<p>Now assume the risk of the lawsuit is p=.3 instead of .1. Does this change your answer to question (b)? Explain the intuition (and do the numbers, of course).</p>`,
            hint: [
              `<p>Høyere p gjør utfallene mer spredt. Hva gjør det med verdien av å vente?</p>`,
              `<p>Gjenta (a) og (b) med p = 0.3.</p>`,
              `<p>Sjekk først om forventet kontantstrøm endrer seg. Den bestemmer NPV ved å investere i dag.</p>`,
              `<ol><li><span class="f">E[CF]</span> og NPV i dag med den nye p.</li><li>NPV ved å vente med den nye p (verdiene i år 1 er som i (b)).</li><li>Sammenlign og forklar med volatilitet.</li></ol>`,
            ],
            fasit: `<div class="calc">E[CF] = 0.15 × 100 + 0.7 × 50 + 0.15 × 0 = 50  →  NPV_0 = 250 (uendret)

NPV_vent = (0.15 × 750 + 0.7 × 250 + 0.15 × 0) / 1.1 = 287.5 / 1.1 = $261.4M</div>
<p>Ja, nå bør du vente (261.4 > 250). Forventet kontantstrøm er den samme, men utfallene er mer spredt. Da er informasjonen mer verdt og opsjonen på å vente stiger i verdi, akkurat som en call stiger i verdi med volatiliteten.</p>` },
          { l: "d",
            q: `<p>Now assume that the investment is reversible, meaning that you will be able to get your $250M investment back in any of the three scenarios by selling the land and the equipment if you so choose (of course, you would miss out on the later revenues then). Assume p=.3 as in (c). How will this affect the timing of your investment? Explain the intuition.</p>`,
            hint: [
              `<p>Kan du få investeringen tilbake, mister ventingen mye av poenget sitt. Du kan jo snu i den dårlige tilstanden.</p>`,
              `<p>Invester i dag og selg i år 1 hvis søksmålet vinner fram. NPV = <span class="f">−I</span> + nåverdien av kontantstrømmene + nåverdien av salget i den dårlige tilstanden.</p>`,
              `<p>I de to gode tilstandene beholder du prosjektet, fordi det er verdt mer enn 250. I den dårlige får du 250 tilbake i år 1.</p>`,
              `<ol><li>Gode tilstander: <span class="f">(p/2) × CF<sub>avvist</sub> / r + (1 − p) × CF<sub>ingen</sub> / r</span>.</li><li>Dårlig tilstand: du selger og får investeringen tilbake i år 1, <span class="f">(p/2) × I / (1 + r)</span>.</li><li>NPV i dag = <span class="f">−I</span> + summen.</li><li>Sammenlign med NPV ved å vente fra (c).</li></ol>`,
            ],
            fasit: `<div class="calc">NPV_0 = −250 + 0.15 × 100 / 0.1 + 0.7 × 50 / 0.1 + 0.15 × 250 / 1.1
      = −250 + 150 + 350 + 34.1 = $284.1M</div>
<p>284.1 > 261.4, så du investerer i dag. Verdien av å vente kommer fra muligheten til å unngå den dårlige tilstanden. Når investeringen kan reverseres, har du den beskyttelsen også om du investerer nå. Da slipper du å miste kontantstrømmen i år 1.</p>` },
        ] },
      /* ---------------- 10 ---------------- */
      { nr: 10, niva: 1, tema: "Real Options", tittel: "Dansk oljefelt",
        intro: `<p>You own a minor Danish oil field (yes, Denmark is a net oil exporter). You can either extract all your oil this year, or you can wait until next year. After that, a dramatic collapse of the oil markets causes an immediate shift to ethanol and windmills as the world's main energy sources and leaves your oil field entirely worthless (a slightly unrealistic, but simplifying assumption). There are two ways to extract oil: The first is the normal way, which only costs $36 per barrel, relies on massive injections of salt water and causes the oil field to partly collapse. This method allows you to extract a total of 1M barrels of oil from your oil field. The second, more careful way, allows you to extract 2M barrels of oil, however this method costs $52 per barrel. Today, oil is trading at $60 per barrel, but next year the price may increase by 20% or decline by 20%. The risk-free rate is 10%.</p>`,
        deler: [
          { l: "a",
            q: `<p>If you have to extract the oil today, which method would you use and what is the value of the oil minus the extraction cost?</p>`,
            hint: [
              `<p>Sammenlign de to metodene ved dagens pris.</p>`,
              `<p>Verdi = antall fat × (oljepris − kostnad per fat).</p>`,
              `<p>Metode 1 gir få fat med høy margin. Metode 2 gir mange fat med lav margin.</p>`,
              `<ol><li>For hver metode: antall fat × (dagens pris − kostnad per fat).</li><li>Velg den høyeste.</li></ol>`,
            ],
            fasit: `<div class="calc">Metode 1: 1M × (60 − 36) = $24M
Metode 2: 2M × (60 − 52) = $16M</div>
<p>Velg metode 1. Verdien er $24M.</p>` },
          { l: "b",
            q: `<p>Set up a binomial tree for the price of oil.</p>`,
            hint: [
              `<p>Ett steg: dagens pris og to mulige priser neste år.</p>`,
              `<p>Opp: <span class="f">S<sub>0</sub> × 1.2</span>. Ned: <span class="f">S<sub>0</sub> × 0.8</span>.</p>`,
              `<p>Dagens pris er $60.</p>`,
              `<ol><li>Rot: dagens pris.</li><li>Opp: dagens pris × (1 + endringen). Ned: dagens pris × (1 − endringen).</li></ol>`,
            ],
            fasit: `<div class="calc">        72  (= 60 × 1.2)
       /
    60
       \\
        48  (= 60 × 0.8)</div>` },
          { l: "c",
            q: `<p>At each end-point of the tree, for each extraction method, what is the value of the extracted oil minus the extraction cost? At each end-point, which extraction method is optimal?</p>`,
            hint: [
              `<p>Samme regnestykke som i (a), men ved prisene neste år.</p>`,
              `<p>Verdi = antall fat × (pris − kostnad per fat) for hver metode og hver tilstand.</p>`,
              `<p>Ved høy pris lønner det seg å få ut flest fat. Ved lav pris er marginen viktigst.</p>`,
              `<ol><li>Opp: metode 1 og metode 2.</li><li>Ned: metode 1 og metode 2.</li><li>Velg den beste i hver tilstand.</li></ol>`,
            ],
            fasit: `<div class="calc">                 Metode 1            Metode 2
Opp (72):   1 × (72 − 36) = 36   2 × (72 − 52) = 40   → metode 2
Ned (48):   1 × (48 − 36) = 12   2 × (48 − 52) = −8   → metode 1</div>
<p>Ved høy pris er metode 2 best (40). Ved lav pris er metode 1 best (12).</p>` },
          { l: "d",
            q: `<p>What is the present value of extracting the oil next year?</p>`,
            hint: [
              `<p>Retten til å utvinne neste år er et derivat på oljeprisen. Prising med risikonøytrale sannsynligheter.</p>`,
              `<span class="f">ρ = ((1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>) / (S<sub>u</sub> − S<sub>d</sub>)</span>. <span class="f">PV = (ρ V<sub>u</sub> + (1 − ρ) V<sub>d</sub>) / (1 + r<sub>f</sub>)</span>.`,
              `<p>Bruk den beste metoden i hver tilstand fra (c) som <span class="f">V<sub>u</sub></span> og <span class="f">V<sub>d</sub></span>.</p>`,
              `<ol><li>ρ fra oljeprisene.</li><li><span class="f">V<sub>u</sub></span> og <span class="f">V<sub>d</sub></span> fra (c).</li><li>Vekt med ρ og 1 − ρ.</li><li>Diskonter med <span class="f">r<sub>f</sub></span>.</li></ol>`,
            ],
            fasit: `<div class="calc">ρ = (1.1 × 60 − 48) / (72 − 48) = 18 / 24 = 0.75
PV = (0.75 × 40 + 0.25 × 12) / 1.1 = 33 / 1.1 = $30M</div>` },
          { l: "e",
            q: `<p>Is it better to extract the oil today or to wait until next year? What is the value of the option to wait?</p>`,
            hint: [
              `<p>Sammenlign verdien av å utvinne i dag med nåverdien av å vente.</p>`,
              `<p>Opsjonen på å vente = verdi ved å vente − verdi ved å utvinne nå.</p>`,
              `<p>Bruk (a) og (d).</p>`,
              `<ol><li>Verdi i dag fra (a).</li><li>Nåverdi ved å vente fra (d).</li><li>Velg den høyeste.</li><li>Opsjonsverdien er differansen.</li></ol>`,
            ],
            fasit: `<div class="calc">Utvinne i dag:  $24M
Vente:          $30M
Verdi av opsjonen på å vente = 30 − 24 = $6M</div>
<p>Det lønner seg å vente. Venter du, kan du velge metode etter at prisen er kjent.</p>` },
        ] },
    ],
  },
  {
    id: "ps4", nr: 4, tittel: "Problem Set 4", tema: "Mergers and acquisitions (from lecture 12)",
    trinn: ["Retning","Verktøy","Oppsett","Oppskrift"],
    nivaer: { 1: ["*", "Tutorial"], 2: ["**", "Forelesning"], 3: ["***", "Egen trening"] },
    oppgaver: [
      /* ---------------- 1 ---------------- */
      { nr: 1, niva: 2, tema: "Merger Arbitrage", tittel: "Vodafone og Mannesmann",
        intro: `<p><b>Vodafone's bid for Mannesmann</b></p>
<ul><li>November 14, 1999: first offer is rejected</li>
<li>November 19: second offer is presented: 53.7 V shares for each M share</li>
<li>SHROUT: 517.9M for Mannesmann and 31.105B for Vodafone</li>
<li>December 17: Vodafone board decides over a formal hostile bid</li>
<li>Proposed number of newly issued shares: 27.811B (47.2% of the new firm)</li>
<li>Oct 21: P<sub>M</sub> = 145.35, P<sub>V</sub> = 4.19 (all prices are in EUR)</li>
<li>Dec 17: P<sub>M</sub> = 234, P<sub>V</sub> = 4.96</li>
<li>Dec 23: the offer is formalized at 53.7 shares, 3 months deadline</li>
<li>Feb 3, 2000: Mannesmann CEO accepts a revised offer of 58.96 shares (49.5% of the combined firm, 350 EUR per share)</li>
<li>Both CEOs got awards and bonuses (∼ 10M for Vodafone and ∼ 20M for Mannesmann), largest M&A at the time</li></ul>
<p class="tiny muted">Kurbatovs eksempel fra forelesning 12 (lysbilde 20 til 22 og tavla). Lysbildeteksten er gjengitt ordrett. Spørsmålene er formulert ut fra lysbildene.</p>`,
        deler: [
          { l: "a",
            q: `<p>How many new Vodafone shares does the offer of 53.7 V shares for each M share require, and what fraction y of the new firm do Mannesmann shareholders get? What fraction does the revised offer of 58.96 shares give?</p>`,
            hint: [
              `<p>I et aksjebytte betaler Vodafone med nye aksjer. Mannesmann-aksjonærene ender opp med en andel av det sammenslåtte firmaet.</p>`,
              `<p>Nye aksjer = antall M-aksjer × bytteforholdet. <span class="f">y = X / (N<sub>V</sub> + X)</span>.</p>`,
              `<p>Vodafone-aksjonærene beholder aksjene sine. Det sammenslåtte firmaet har derfor <span class="f">N<sub>V</sub> + X</span> aksjer.</p>`,
              `<ol><li><span class="f">X = N<sub>M</sub></span> × bytteforholdet.</li><li><span class="f">y = X / (N<sub>V</sub> + X)</span>.</li><li>Gjenta med det reviderte bytteforholdet.</li></ol>`,
            ],
            fasit: `<div class="calc">X = 0.5179 mrd. × 53.7 = 27.811 mrd. nye V-aksjer
y = 27.811 / (31.105 + 27.811) = 47.2%

Revidert: X = 0.5179 × 58.96 = 30.535 mrd.
          y = 30.535 / (31.105 + 30.535) = 49.5%</div>
<p>Begge tallene stemmer med lysbildet.</p>` },
          { l: "b",
            ctx: `<ul><li>Let's look closely at the deal as the market perceived it on Dec 17th</li>
<li>Mannesmann share price is 234 while Vodafone offers 266.352 = 4.96 × 53.7</li>
<li>This spread (266 to 234) reflects the probability of success, synergies of merger and standalone values</li>
<li>Assume r<sub>f</sub> = 5.5% and that prices revert to Oct 21 if the deal fails in 3 months</li>
<li>Strategy: buy M share at 234, short sell 53.7 V shares for 266 and invest it at risk-free rate</li></ul>`,
            q: `<p>What is the payoff of this strategy in 3 months if the deal goes through, and if the deal fails?</p>`,
            hint: [
              `<p>Strategien er en innsats på at avtalen går gjennom. Følg de tre postene (M-aksjen, shortposisjonen i V og det risikofrie innskuddet) til hvert av de to utfallene.</p>`,
              `<p>Suksess: M-aksjen byttes i V-aksjer som lukker shorten, så bare innskuddet er igjen. Fiasko: M-aksjen faller tilbake til kursen 21. oktober. Du må da kjøpe tilbake V-aksjene til kursen den dagen.</p>`,
              `<p>Innskuddet vokser med <span class="f">(1 + r<sub>f</sub>)<sup>T</sup></span> med T = 3/12. Hver M-aksje tilsvarer 53.7 V-aksjer i shortposisjonen.</p>`,
              `<ol><li>Innskudd ved forfall = bytteforhold × <span class="f">P<sub>V</sub></span> i dag × <span class="f">(1 + r<sub>f</sub>)<sup>T</sup></span>.</li><li>Suksess: bare innskuddet.</li><li>Fiasko: gammel <span class="f">P<sub>M</sub></span> − bytteforhold × gammel <span class="f">P<sub>V</sub></span> + innskuddet.</li></ol>`,
            ],
            fasit: `<div class="calc">I dag: kjøp M for 234, short 53.7 V for 266.352 og sett beløpet i banken
Netto i dag: −234

Innskudd om 3 mnd. = 266.352 × 1.055^0.25 = 266.352 × 1.013475 = 269.941

Suksess:  M byttes i 53.7 V som lukker shorten  →  269.941
Fiasko:   145.35 − 53.7 × 4.19 + 269.941
        = 145.35 − 225.003 + 269.941 = 190.288</div>
<p><b>Merknad:</b> Lysbildet skriver 225.03 for gjenkjøpet og får 190.261. Siden 53.7 × 4.19 = 225.003, er fiasko-payoffen 190.288. Tavla viser de avrundede tallene 225 og 190.</p>` },
          { l: "c",
            q: `<p>What probability of success p does the Mannesmann share price on Dec 17 imply?</p>`,
            hint: [
              `<p>Posisjonen koster 234 i dag og betaler ett av to beløp om tre måneder. Prisen må være nåverdien av de to utfallene.</p>`,
              `<span class="f">P<sub>M</sub> = [p × suksess + (1 − p) × fiasko] / (1 + r<sub>f</sub>)<sup>T</sup></span>. Løs for p.`,
              `<p>Du diskonterer med risikofri rente. Da er p en risikonøytral sannsynlighet (ρ i kursets notasjon), ikke den virkelige.</p>`,
              `<ol><li>Gang dagens M-kurs med <span class="f">(1 + r<sub>f</sub>)<sup>T</sup></span>.</li><li>Trekk fra fiasko-payoffen.</li><li>Del på suksess − fiasko.</li></ol>`,
            ],
            fasit: `<div class="calc">234 = [p × 269.941 + (1 − p) × 190.288] / 1.055^0.25
234 × 1.013475 = 237.153
p = (237.153 − 190.288) / (269.941 − 190.288) = 46.865 / 79.653 = 0.5884  ≈ 59%</div>
<p>Markedet priser budet som om sjansen for at det går gjennom er om lag 59%. Det er en risikonøytral sannsynlighet, fordi vi diskonterer med <span class="f">r<sub>f</sub></span>. Lysbildet får 0.5885 med fiasko-payoffen 190.261, også 59%.</p>` },
          { l: "d",
            q: `<p>What does the spread between the offer and the Mannesmann share price reflect, and what role do merger arbitrage traders play?</p>`,
            hint: [
              `<p>Var avtalen sikker, ville M-aksjen handlet til verdien av tilbudet. Hva gjør at den ikke gjør det?</p>`,
              `<p>Tenk på hva som skjer med M-kursen hvis avtalen faller bort. Tenk også på hvem som vil selge aksjen før det er avklart.</p>`,
              `<p>Den som selger M-aksjen før avklaringen, slipper risikoen for kursfall. Den som kjøper, tar risikoen og får spreaden betalt.</p>`,
              `<ol><li>Forklar hva som bestemmer spreaden.</li><li>Forklar at strategien i (b) er en innsats, ikke risikofri arbitrasje.</li><li>Forklar hvem som tar risikoen og hva de får betalt.</li><li>Nevn hvordan arbitrasjørene begrenser sin egen risiko.</li></ol>`,
            ],
            fasit: `<ul><li><b>Spreaden</b> (266 mot 234) reflekterer sannsynligheten for at avtalen går gjennom, synergiene og verdiene alene. Faller avtalen bort, faller M-kursen tilbake mot verdien alene.</li>
<li><b>Merger arbitrage</b> er ikke risikofri arbitrasje. Strategien koster 234 og betaler 269.94 ved suksess eller 190.29 ved fiasko.</li>
<li>Aksjonærer som selger M-aksjen før avklaringen, kjøper forsikring mot at avtalen faller bort. Spreaden er prisen på den forsikringen.</li>
<li>Arbitrasjørene gir likviditet og forsikring mot avtalerisiko. De sprer egen risiko over mange avtaler. Historisk har strategien vært lønnsom (Mitchell og Pulvino, 2001).</li></ul>` },
          { l: "e",
            q: `<p>Use the stock swap condition X ≤ N<sub>A</sub> (T + S)/A with the Oct 21 prices as stand-alone values. How large must the synergies S be for the offer of 53.7 V shares for each M share not to hurt Vodafone's shareholders?</p>`,
            hint: [
              `<p>Vodafone-aksjonærene bytter hele det gamle firmaet mot en andel av et større firma. De taper ikke så lenge andelen er verdt minst like mye.</p>`,
              `<p><span class="f">(1 − y)(A + T + S) ≥ A</span> gir <span class="f">X ≤ N<sub>A</sub> (T + S) / A</span>, eller <span class="f">ER ≤ (P<sub>T</sub> / P<sub>A</sub>)(1 + S / T)</span>.</p>`,
              `<p>Her er Vodafone kjøper (A) og Mannesmann mål (T). <span class="f">A = N<sub>V</sub> × P<sub>V</sub></span> og <span class="f">T = N<sub>M</sub> × P<sub>M</sub></span> med kursene 21. oktober. X fra (a).</p>`,
              `<ol><li>Regn A og T med kursene før budet.</li><li>Løs ulikheten for S: <span class="f">S ≥ X × A / N<sub>A</sub> − T</span>.</li><li>Kontroller med bytteforholdsformen.</li></ol>`,
            ],
            fasit: `<div class="calc">A = 31.105 × 4.19 = 130.33 mrd. EUR
T = 0.5179 × 145.35 = 75.28 mrd. EUR

S ≥ X × A / N_A − T = X × P_V − T
  = 27.811 × 4.19 − 75.28 = 116.53 − 75.28 = 41.25 mrd. EUR

Kontroll: ER ≤ (P_T / P_A)(1 + S/T)
53.7 ≤ (145.35 / 4.19)(1 + S/T) = 34.69 × (1 + S/T)
S/T ≥ 53.7 / 34.69 − 1 = 0.548  →  S ≥ 0.548 × 75.28 = 41.25</div>
<p>Vodafone må tro på synergier på minst om lag 41 mrd. EUR, 55% av Mannesmanns verdi alene, for at budet ikke skal skade egne aksjonærer.</p>
<p><b>Merknad:</b> Denne delen er ikke regnet på lysbildene. Den bruker formelen fra lysbilde 17 og 18 på tallene fra lysbilde 20.</p>` },
        ] },
      /* ---------------- 2 ---------------- */
      { nr: 2, niva: 2, tema: "Payment Method", tittel: "Kontanter eller aksjer",
        intro: `<p><b>Notation</b></p>
<ul><li>A is the pre-acquisition acquiror value</li>
<li>T is the pre-acquisition target value</li>
<li>S is the synergy value</li>
<li>P is the price paid by the acquiror</li>
<li>A + T + S is the combined firm value after acquisition</li>
<li>A + T + S − (A + T) = S: the economic gains from the merger equal the synergies</li></ul>
<p class="tiny muted">Fra forelesning 12 (lysbilde 13 til 18, 24 og 25). Lysbildeteksten er gjengitt ordrett. Spørsmålene er formulert ut fra lysbildene, og fasiten er lysbildenes egen.</p>`,
        deler: [
          { l: "a",
            q: `<p>Cash payment: what are the acquiror's NPV and the target's NPV, and what is their sum? The total gain is equal to synergies, but how is it distributed?</p>`,
            hint: [
              `<p>Kjøperen betaler P i kontanter og eier hele det sammenslåtte firmaet. Målselskapets aksjonærer får P i stedet for T.</p>`,
              `<p>NPV for hver side = verdi etter − verdi før.</p>`,
              `<p>Kjøper: verdi etter er <span class="f">A + T + S − P</span>. Mål: verdi etter er P. Legg sammen og se hva som skjer med P.</p>`,
              `<ol><li><span class="f">NPV<sub>A</sub> = (A + T + S) − P − A</span>.</li><li><span class="f">NPV<sub>T</sub> = P − T</span>.</li><li>Summer.</li><li>Forklar hva som bestemmer P og dermed fordelingen.</li></ol>`,
            ],
            fasit: `<div class="calc">NPV_A = (A + T + S) − P − A = S + (T − P) = S − (P − T)
NPV_T = P − T
Sum   = S</div>
<p>Den samlede gevinsten er synergiene uansett pris. Prisen avgjør bare fordelingen: målselskapet får premien <span class="f">P − T</span> og kjøperen resten av synergiene. Forhandlingsmakt bestemmer P. Empirisk får målselskapene det meste (om lag 15% unormal avkastning ved kunngjøring mot om lag 1% for kjøperne).</p>` },
          { l: "b",
            q: `<p>Stock swap: denote the fraction of the new firm offered to target shareholders as y. What are the acquiror's NPV and the target's NPV? How does this differ from a cash payment?</p>`,
            hint: [
              `<p>Nå betaler kjøperen med en andel av det sammenslåtte firmaet i stedet for kontanter.</p>`,
              `<p>Målselskapets aksjonærer eier y av <span class="f">A + T + S</span>, kjøperens gamle aksjonærer eier <span class="f">1 − y</span>.</p>`,
              `<p>Sammenlign med (a): hvem bærer risikoen hvis synergiene blir mindre enn ventet?</p>`,
              `<ol><li><span class="f">NPV<sub>A</sub> = (1 − y)(A + T + S) − A</span>.</li><li><span class="f">NPV<sub>T</sub> = y(A + T + S) − T</span>.</li><li>Summer.</li><li>Forklar hvordan kjøperens kostnad nå avhenger av S og hva det betyr ved feilprising.</li></ol>`,
            ],
            fasit: `<div class="calc">NPV_A = (1 − y)(A + T + S) − A
NPV_T = y(A + T + S) − T
Sum   = S</div>
<p>Med aksjer avhenger kjøperens kostnad <span class="f">y(A + T + S) − T</span> av synergiene, fordi målselskapet får en andel av dem. Med kontanter avhenger kostnaden ikke direkte av S (men P kan fortsatt være en funksjon av S). Aksjebytte demper derfor effekten av feilprising: blir synergiene mindre enn ventet, deler målselskapet tapet.</p>` },
          { l: "c",
            q: `<p>Denote N<sub>A</sub>, N<sub>T</sub> the number of shares for the firms, P<sub>A</sub> and P<sub>T</sub> the pre-merger prices and X the number of new shares. What is the maximum number of new shares and the maximum exchange ratio the acquiror is willing to offer?</p>`,
            hint: [
              `<p>Kjøperen gjennomfører bare hvis de gamle aksjonærene er minst like godt stilt med en andel av det nye firmaet som med hele det gamle.</p>`,
              `<p><span class="f">y = X / (N<sub>A</sub> + X)</span>. Betingelse: <span class="f">N<sub>A</sub> / (N<sub>A</sub> + X) × (A + T + S) ≥ A</span>.</p>`,
              `<p>Gang ut og løs for X. Bytteforholdet er <span class="f">ER = X / N<sub>T</sub></span>. Bruk <span class="f">A = P<sub>A</sub> N<sub>A</sub></span> og <span class="f">T = P<sub>T</sub> N<sub>T</sub></span>.</p>`,
              `<ol><li>Sett opp betingelsen.</li><li>Løs for X.</li><li>Del på <span class="f">N<sub>T</sub></span>.</li><li>Sett inn A og T uttrykt med kurser og aksjetall og forenkle.</li></ol>`,
            ],
            fasit: `<div class="calc">N_A / (N_A + X) × (A + T + S) ≥ A
N_A (A + T + S) ≥ A (N_A + X)
N_A (T + S) ≥ A × X

X ≤ N_A × (T + S) / A

ER = X / N_T ≤ (N_A / N_T) × (T + S) / A = (P_T / P_A) × (1 + S/T)</div>
<p>Uten synergier er det høyeste bytteforholdet forholdet mellom kursene. Synergiene gir rom for en premie. Valget for kjøperens aksjonærer er å eie det gamle firmaet eller en andel av det nye.</p>` },
          { l: "d",
            q: `<p>Cash or stock? What determines the choice, and which does an acquiror prefer if it believes its own stock is overvalued?</p>`,
            hint: [
              `<p>Tenk både praktisk (har kjøperen pengene?) og informasjonsmessig (hvem vet mest om hva aksjene er verdt?).</p>`,
              `<p>Med aksjebytte er kjøperens kostnad <span class="f">y(T + A + S) − T</span>. Er egne aksjer overpriset, er det en billig valuta.</p>`,
              `<p>Markedet vet at kjøperen velger betalingsform ut fra hva den vet. Hva sier valget da om kjøperen?</p>`,
              `<ol><li>List de praktiske faktorene.</li><li>Overpriset egen aksje: hvilken betalingsform er billigst?</li><li>Undervurdert egen aksje: hvilken er billigst?</li><li>Forklar hva markedet slutter av valget.</li></ol>`,
            ],
            fasit: `<p>Valget avhenger av:</p>
<ul><li>kjøperens likviditet og gjeldskapasitet</li>
<li>asymmetrisk informasjon: hvem som vet mest</li>
<li>usikkerhet om synergiene og verdiene alene</li>
<li>selgerens behov: trenger de kontanter? Hva med skatt?</li>
<li>tid</li></ul>
<p>Tror kjøperen at egen aksje er overpriset, foretrekker den aksjebytte. Tror den at aksjen er undervurdert, foretrekker den kontanter. Men valget avslører informasjon: et aksjebud tolkes som et signal om at kjøperens aksje er overpriset. Kursen faller. Det er samme mekanisme som ved en emisjon (Myers-Majluf).</p>` },
        ] },
      /* ---------------- 3 ---------------- */
      { nr: 3, niva: 2, tema: "Bidding", tittel: "Budkamp om bank D",
        intro: `<table class="data">
<tr><th></th><th>Stand-Alone Value</th><th colspan="3">Value with bank D</th></tr>
<tr><th></th><th></th><th>A</th><th>B</th><th>C</th></tr>
<tr><td>A</td><td class="n">100</td><td class="n">190</td><td class="n">90</td><td class="n">90</td></tr>
<tr><td>B</td><td class="n">80</td><td class="n">70</td><td class="n">170</td><td class="n">70</td></tr>
<tr><td>C</td><td class="n">70</td><td class="n">55</td><td class="n">55</td><td class="n">160</td></tr>
<tr><td>D</td><td class="n">60</td><td class="n">0</td><td class="n">0</td><td class="n">0</td></tr>
</table>
<p><b>Bidding depends on alternatives!</b></p>
<p class="tiny muted">Fra forelesning 12 (lysbilde 26). Lysbildet har bare tabellen, så spørsmålene og fasiten er laget ut fra den. Kolonnene under «Value with bank D» viser verdien av hver bank når A, B eller C har kjøpt bank D, før kjøpesummen er betalt.</p>`,
        deler: [
          { l: "a",
            q: `<p>What is the total value of the four banks if no deal happens, and if A, B or C buys bank D? Which acquisition creates the most value?</p>`,
            hint: [
              `<p>Summer verdiene av alle bankene i hvert scenario. Kjøpesummen er bare en overføring og påvirker ikke summen.</p>`,
              `<p>Ingen avtale: kolonnen med verdiene alene. Kjøp: kolonnen for kjøperen, der D er 0 fordi D er slått sammen med kjøperen.</p>`,
              `<p>Skill mellom gevinsten for kjøper og D sammen og effekten på konkurrentene.</p>`,
              `<ol><li>Summer verdiene alene.</li><li>Summer hver kolonne under «Value with bank D».</li><li>Sammenlign.</li><li>Del opp i kjøperens verdi − kjøperens og Ds verdier alene. Se så på endringen for de andre bankene.</li></ol>`,
            ],
            fasit: `<div class="calc">Ingen avtale:  100 + 80 + 70 + 60 = 310
A kjøper D:    190 + 70 + 55 = 315   (+5)
B kjøper D:    90 + 170 + 55 = 315   (+5)
C kjøper D:    90 + 70 + 160 = 320   (+10)

Gevinst for kjøper og D sammen:
  A: 190 − (100 + 60) = 30,  B: 170 − (80 + 60) = 30,  C: 160 − (70 + 60) = 30
Tap for konkurrentene: A eller B kjøper: −25,  C kjøper: −20</div>
<p>Kjøpet til C skaper mest verdi. Alle tre får samme synergi med D, men kjøpet til C skader konkurrentene minst.</p>` },
          { l: "b",
            q: `<p>How much would each bank be willing to pay for D if the alternative is that nobody buys D?</p>`,
            hint: [
              `<p>Betalingsviljen er gevinsten ved å kjøpe sammenlignet med alternativet.</p>`,
              `<p>Betalingsvilje = verdi med D − verdi i alternativet.</p>`,
              `<p>Her er alternativet at ingen kjøper. Da beholder banken verdien alene.</p>`,
              `<ol><li>For hver bank: verdien når den selv kjøper D.</li><li>Trekk fra verdien alene.</li></ol>`,
            ],
            fasit: `<div class="calc">A: 190 − 100 = 90
B: 170 − 80 = 90
C: 160 − 70 = 90</div>
<p>Mot status quo er alle tre villige til å betale 90.</p>` },
          { l: "c",
            q: `<p>Suppose D will be sold to one of the other banks anyway. How much is each bank willing to pay now? Who wins the bidding and at what price?</p>`,
            hint: [
              `<p>Nå er alternativet ikke status quo. Taper du budkampen, får en konkurrent D. Det koster deg verdi.</p>`,
              `<p>Betalingsvilje = verdi hvis du kjøper − verdi hvis en konkurrent kjøper.</p>`,
              `<p>Les av tabellen hva hver bank er verdt når en av de andre kjøper. I en stigende budrunde vinner den med høyest betalingsvilje til en pris lik den nest høyeste.</p>`,
              `<ol><li>For hver bank: verdien når den selv kjøper.</li><li>Trekk fra verdien når en konkurrent kjøper.</li><li>Ranger betalingsviljene.</li><li>Vinneren betaler om lag den nest høyeste betalingsviljen.</li></ol>`,
            ],
            fasit: `<div class="calc">A: 190 − 90 = 100
B: 170 − 70 = 100
C: 160 − 55 = 105</div>
<p>A og B gir seg ved 100. C vinner og betaler om lag 100. Det er 40 mer enn Ds verdi alene og 10 mer enn det noen ville betalt i (b). Bud avhenger av alternativene: frykten for at en konkurrent får D, driver prisen opp.</p>` },
          { l: "d",
            q: `<p>Who wins and who loses relative to the stand-alone values?</p>`,
            hint: [
              `<p>Sammenlign hver banks verdi etter budkampen (etter betalt pris) med verdien alene.</p>`,
              `<p>Kjøperen: verdi med D − pris. D: prisen. De andre: verdien når kjøperen har D.</p>`,
              `<p>Bruk vinneren og prisen fra (c). Summen av endringene skal være verdiskapingen fra (a).</p>`,
              `<ol><li>D: pris − verdi alene.</li><li>Kjøperen: verdi med D − pris − verdi alene.</li><li>De to andre: verdien i kjøperens kolonne − verdi alene.</li><li>Kontroller at summen er lik endringen i samlet verdi.</li></ol>`,
            ],
            fasit: `<div class="calc">D:  100 − 60 = +40
C:  (160 − 100) − 70 = −10   (men +5 mot 55 hvis en konkurrent hadde vunnet)
A:  90 − 100 = −10
B:  70 − 80 = −10
Sum = +10 = verdiskapingen når C kjøper  ✓</div>
<p>Målselskapets aksjonærer tar mer enn hele gevinsten. Alle tre kjøperne taper mot verdiene alene, men C taper mindre enn den ville gjort uten å kjøpe. Det stemmer med empirien: målselskapene vinner mest ved oppkjøp.</p>` },
        ] },
      /* ---------------- 4 ---------------- */
      { nr: 4, niva: 2, tema: "Risk Reduction", tittel: "Coinsurance",
        intro: `<p><b>Risk reduction from mergers</b></p>
<ul><li>When two firms merge, they might borrow at a lower rate than separately</li>
<li>Consider a case of firms A and B issuing $50M in bonds each</li>
<li>Alternative: they merge and issue $100M in bonds instead</li></ul>
<table class="data">
<tr><th></th><th>State 1</th><th>State 2</th><th>Market Value</th></tr>
<tr><td>Probability</td><td class="n">0.5</td><td class="n">0.5</td><td></td></tr>
<tr><th>Values before merger:</th><th></th><th></th><th></th></tr>
<tr><td>Firm A</td><td class="n">80</td><td class="n">20</td><td class="n">50</td></tr>
<tr><td>Firm B</td><td class="n">10</td><td class="n">40</td><td class="n">25</td></tr>
<tr><th>Value after merger</th><th></th><th></th><th></th></tr>
<tr><td>Firm AB</td><td class="n">90</td><td class="n">60</td><td class="n">75</td></tr>
</table>
<p>The merger has no synergies. Assume that firm A has 30 debt and firm B has 15.</p>
<p class="tiny muted">Fra forelesning 12 (lysbilde 27 og 28). Spørsmålene i (a), (b) og (d) står på lysbildet. Lysbildene har ingen utregning, så fasiten er laget ut fra dem.</p>`,
        deler: [
          { l: "a",
            q: `<p>The joint bond will have a lower yield (why?)</p>`,
            hint: [
              `<p>Hva står bak den felles obligasjonen som ikke står bak hver av de to separate?</p>`,
              `<p>Etter sammenslåingen er hele gjelden sikret i begge firmaenes kontantstrømmer.</p>`,
              `<p>Går det dårlig i det ene firmaet, kan det andre dekke gjelden. Hva skjer da med sannsynligheten for mislighold?</p>`,
              `<ol><li>Forklar hva som sikrer den felles obligasjonen.</li><li>Forklar hva det gjør med sannsynligheten for mislighold.</li><li>Koble lavere mislighold til lavere avkastningskrav.</li></ol>`,
            ],
            fasit: `<p>Den felles obligasjonen er sikret i kontantstrømmene til begge firmaene. Går det dårlig i det ene, kan det andre dekke gjelden (coinsurance). Sannsynligheten for mislighold faller. Da krever långiverne lavere rente.</p>` },
          { l: "b",
            q: `<p>What is the condition for the joint firm to be less risky?</p>`,
            hint: [
              `<p>Sammenslåingen hjelper bare hvis firmaene ikke går dårlig samtidig.</p>`,
              `<p>Diversifisering: tenk på korrelasjonen mellom kontantstrømmene.</p>`,
              `<p>Se på tabellen: når går det dårlig for A og når går det dårlig for B?</p>`,
              `<ol><li>Formuler betingelsen med korrelasjon.</li><li>Forklar grensetilfellet med perfekt korrelasjon.</li><li>Knytt det til tabellen.</li></ol>`,
            ],
            fasit: `<p>Kontantstrømmene må ikke være perfekt positivt korrelert. Er de perfekt korrelert, går begge dårlig samtidig. Da reduserer ikke sammenslåingen risikoen. Jo lavere korrelasjon, desto større reduksjon. I tabellen går A og B i motsatt retning: A er sterk i tilstand 1, B i tilstand 2.</p>` },
          { l: "c",
            q: `<p>Using the table, find the value of debt and equity of firm A and firm B before the merger and of firm AB after the merger.</p>`,
            hint: [
              `<p>Gjelden får det den er lovet, eller hele firmaet hvis firmaet er verdt mindre. Egenkapitalen får resten.</p>`,
              `<p>Per tilstand: gjeld = <span class="f">min(V, F)</span>, egenkapital = <span class="f">max(V − F, 0)</span>. Verdi = sannsynlighetsvektet snitt.</p>`,
              `<p>Markedsverdiene i tabellen er forventede verdier uten diskontering. Etter sammenslåingen er pålydende summen av de to lånene.</p>`,
              `<ol><li>A: gjeld og egenkapital i hver tilstand, så forventning.</li><li>B: det samme.</li><li>AB: med samlet pålydende.</li><li>Sammenlign summene før og etter.</li></ol>`,
            ],
            fasit: `<div class="calc">Før:
A (gjeld 30):   tilstand 1: 80 → gjeld 30, EK 50    tilstand 2: 20 → gjeld 20, EK 0
                D_A = 0.5 × 30 + 0.5 × 20 = 25,    E_A = 0.5 × 50 = 25
B (gjeld 15):   tilstand 1: 10 → gjeld 10, EK 0     tilstand 2: 40 → gjeld 15, EK 25
                D_B = 0.5 × 10 + 0.5 × 15 = 12.5,  E_B = 0.5 × 25 = 12.5
Sum før:        D = 37.5,  E = 37.5,  V = 75

Etter (AB, gjeld 45):
                tilstand 1: 90 → gjeld 45, EK 45    tilstand 2: 60 → gjeld 45, EK 15
                D_AB = 45 (risikofri),  E_AB = 0.5 × 45 + 0.5 × 15 = 30
Sum etter:      D = 45,  E = 30,  V = 75</div>
<p>Før sammenslåingen misligholder ett av firmaene i hver tilstand. Etter er gjelden risikofri.</p>` },
          { l: "d",
            q: `<p>How does reduction in risk affect shareholders?</p>`,
            hint: [
              `<p>Sammenslåingen skaper ingen verdi. Hvis gjelden blir mer verdt, hvem betaler for det?</p>`,
              `<p>Egenkapital er en call på eiendelene. Hva skjer med verdien av en call når risikoen faller?</p>`,
              `<p>Sammenlign summene fra (c) før og etter. Tenk også på hva aksjonærene kan gjøre etter sammenslåingen for å hente tilbake verdien.</p>`,
              `<ol><li>Endring i gjeldsverdien.</li><li>Endring i egenkapitalverdien.</li><li>Forklar overføringen med opsjonslogikk.</li><li>Nevn hva aksjonærene kan gjøre med det.</li></ol>`,
            ],
            fasit: `<div class="calc">Gjeld:         37.5 → 45   (+7.5)
Egenkapital:   37.5 → 30   (−7.5)
Firma:         75   → 75   (0)</div>
<p>Aksjonærene taper 7.5 og långiverne vinner 7.5. Det er ingen synergier, så dette er en ren overføring (coinsurance-effekten). Egenkapitalen er en call på eiendelene. Lavere risiko gjør callen mindre verdt.</p>
<p>Risikoreduksjon er derfor ingen god grunn til en fusjon for aksjonærene. De kan diversifisere selv ved å eie begge aksjene. Aksjonærene kan hente tilbake overføringen ved å ta opp mer gjeld etter sammenslåingen og dele ut provenyet. Den økte gjeldskapasiteten gir også et større skatteskjold.</p>` },
        ] },
    ],
  },
];
