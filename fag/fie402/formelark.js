/* ===================== FIE402 · FORMELARKET =====================
   Arket som deles ut på eksamen, ordrett og i samme rekkefølge som
   FIE402_Corp_course_files/Formula sheet.docx (samme ark står bakerst i
   H2024-oppgaven). Engelsk, som på eksamen. Rett aldri et tall eller en formel
   her uten å sjekke mot docx-fila: poenget er at du øver med nøyaktig det du
   får utdelt, og ingenting mer.

   Hver rad har en skjult `.fa-info-tekst`: hva formelen er, og under
   «When to use» når du bruker den. Den er ikke en del av arket. Motoren flytter
   den bak en (i) helt til høyre på raden, som viser den ved hover eller trykk
   (js/bundle-formelark.js). Engelsk som resten av FIE402-fagstoffet, og
   eksamenshenvisningene er bare dem docs/fie402-kursplan.md lister.

   Under arket står det som IKKE er med og må kunnes, tatt fra
   docs/fie402-kursplan.md og FIE402-notatet i hjernen.

   `.brok` er en stablet brøk: teller, så nevner.
   ============================================================================ */
window.EDU_DATA = window.EDU_DATA || {};
window.EDU_DATA.formelark = {
  tittel: "Formula sheet",
  kilde: "Arket som deles ut på eksamen, ordrett.",
  html: `
<div class="fa-rad">FCF = EBIT × (1 − τ<sub>c</sub>) + Depreciation − CapEx − ΔNWC + Other<div class="fa-info-tekst"><b>Unlevered free cash flow:</b> the cash the assets generate for all investors, taxed as if the firm had no debt.<div class="fa-naar"><b>When to use:</b> the starting point for WACC and APV, and for FTE once the debt flows are added. Interest never enters; debt shows up in the rate or as PV(TS). 2021 P3, 2022 P3.</div></div></div>
<div class="fa-rad">PV(C in perpetuity) = <span class="brok"><span>C</span><span>r</span></span><div class="fa-info-tekst"><b>Level perpetuity:</b> C every year forever, first payment one year from now.<div class="fa-naar"><b>When to use:</b> level cash flows with no growth, and the tax shield on fixed permanent debt: τ<sub>c</sub>r<sub>D</sub>D/r<sub>D</sub> = τ<sub>c</sub>D.</div></div></div>
<div class="fa-rad">PV(C in growing perpetuity) = <span class="brok"><span>C</span><span>r − g</span></span><div class="fa-info-tekst"><b>Growing perpetuity:</b> C next year, growing at g forever. Requires r &gt; g.<div class="fa-naar"><b>When to use:</b> terminal values, and the WACC method with constant growth, V<sup>L</sup> = FCF<sub>1</sub>/(r<sub>wacc</sub> − g). C is next year's cash flow, not this year's.</div></div></div>
<div class="fa-rad">E[R<sub>i</sub>] = r<sub>i</sub> = r<sub>f</sub> + β<sub>i</sub><sup>Mkt</sup>(E[R<sub>Mkt</sub>] − r<sub>f</sub>)<div class="fa-info-tekst"><b>CAPM:</b> the return investors require for bearing the asset's market risk.<div class="fa-naar"><b>When to use:</b> the twin-firm routine, on every paper, in both directions: a beta from a return, β = (r − r<sub>f</sub>)/(E[R<sub>Mkt</sub>] − r<sub>f</sub>), and a return from a beta.</div></div></div>
<div class="fa-rad">r<sub>E</sub> = r<sub>U</sub> + <span class="brok"><span>D</span><span>E</span></span>(r<sub>U</sub> − r<sub>D</sub>)<div class="fa-info-tekst"><b>MM Proposition II:</b> the cost of equity rises linearly with leverage. It holds with taxes too when the firm keeps a target D/E, so there is no (1 − τ<sub>c</sub>) term.<div class="fa-naar"><b>When to use:</b> relevering r<sub>U</sub> to a new capital structure, as after a recapitalisation (H2024 E3, H2025 E3). Multiply by D/E, not D/V.</div></div></div>
<div class="fa-rad">β<sub>U</sub> = <span class="brok"><span>E</span><span>E + D</span></span>β<sub>E</sub> + <span class="brok"><span>D</span><span>E + D</span></span>β<sub>D</sub><div class="fa-info-tekst"><b>Asset beta:</b> the value-weighted average of the equity beta and the debt beta.<div class="fa-naar"><b>When to use:</b> unlevering the twin firm's β<sub>E</sub> with its market values of E and D. Set β<sub>D</sub> = 0 only if its debt is risk-free; otherwise you understate β<sub>U</sub>.</div></div></div>
<div class="fa-rad"><span class="fa-navn">Pre-tax WACC:</span> r<sub>WACC</sub> = <span class="brok"><span>E</span><span>E + D</span></span>r<sub>E</sub> + <span class="brok"><span>D</span><span>E + D</span></span>r<sub>D</sub><div class="fa-info-tekst"><b>Pre-tax WACC:</b> the value-weighted average of r<sub>E</sub> and r<sub>D</sub>. With a target D/E it equals r<sub>U</sub>.<div class="fa-naar"><b>When to use:</b> backing out r<sub>U</sub> from a levered firm's r<sub>E</sub> and r<sub>D</sub>, when you are given returns rather than betas.</div></div></div>
<div class="fa-rad"><span class="fa-navn">After-tax WACC:</span> r<sub>WACC</sub> = <span class="brok"><span>E</span><span>E + D</span></span>r<sub>E</sub> + <span class="brok"><span>D</span><span>E + D</span></span>r<sub>D</sub>(1 − τ<sub>C</sub>)<div class="fa-info-tekst"><b>After-tax WACC:</b> the discount rate for FCF, with the interest tax shield entered through (1 − τ<sub>C</sub>).<div class="fa-naar"><b>When to use:</b> the WACC method, when the firm keeps a constant D/V. Use the target weights of the firm you value, never the twin's. WACC and APV on the same case is on every paper, and the two values must agree.</div></div></div>
<div class="fa-rad">C<sub>0</sub> = <span class="brok"><span>C<sub>u</sub> − C<sub>d</sub></span><span>S<sub>u</sub> − S<sub>d</sub></span></span>S<sub>0</sub> + <span class="brok"><span>C<sub>d</sub> − S<sub>d</sub>Δ</span><span>1 + r<sub>f</sub></span></span> = <span class="brok"><span>ρC<sub>u</sub> + (1 − ρ)C<sub>d</sub></span><span>1 + r<sub>f</sub></span></span><div class="fa-info-tekst"><b>One-period binomial price:</b> the first form replicates the claim with Δ shares and a bond; the second is the risk-neutral expectation discounted at r<sub>f</sub>. Both give the same price.<div class="fa-naar"><b>When to use:</b> options and real options on an up/down tree (2022 P4, H2024 E6).</div></div></div>
<div class="fa-rad">ρ = <span class="brok"><span>(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub></span><span>S<sub>u</sub> − S<sub>d</sub></span></span><div class="fa-info-tekst"><b>Risk-neutral probability:</b> the probability of the up state that makes the underlying earn exactly r<sub>f</sub>.<div class="fa-naar"><b>When to use:</b> pricing any claim on the same tree, discounting at r<sub>f</sub>. The real probabilities never enter; pairing them with r<sub>f</sub> is the classic error.</div></div></div>
<div class="fa-overskrift">Stock swap:</div>
<div class="fa-rad"><span class="fa-navn">Acquiror NPV:</span> (1 − y)(A + T + S) − A<div class="fa-info-tekst"><b>Acquirer's gain in a stock swap:</b> its old holders keep 1 − y of the merged firm. y = x/(N<sub>A</sub> + x) is the target holders' share, A and T the stand-alone values, S the synergies.<div class="fa-naar"><b>When to use:</b> M&amp;A exercises (8 of 11 papers), to decide whether the deal is good for the acquirer's shareholders.</div></div></div>
<div class="fa-rad"><span class="fa-navn">Target NPV:</span> y(A + T + S) − T<div class="fa-info-tekst"><b>Target's gain in a stock swap:</b> the target holders' share y of the merged firm, minus their stand-alone value T.<div class="fa-naar"><b>When to use:</b> alongside the acquirer's NPV. The two always sum to S, which checks the arithmetic but not y.</div></div></div>
<div class="fa-overskrift">Exchange ratio:</div>
<div class="fa-rad">ER = <span class="brok"><span>x</span><span>N<sub>T</sub></span></span> &lt; (<span class="brok"><span>T + S</span><span>A</span></span>)<span class="brok"><span>N<sub>A</sub></span><span>N<sub>T</sub></span></span><div class="fa-info-tekst"><b>Exchange ratio:</b> new acquirer shares given per target share. The right-hand side is the highest ratio at which the acquirer's NPV is still positive.<div class="fa-naar"><b>When to use:</b> judging whether an offered ratio creates or destroys value for the acquirer, or finding the most it can offer.</div></div></div>
`,
  /* Det arket ikke gir deg. Kort, fordi vinduet skal være lite. */
  ikkePaaArket: `
<ul>
<li>V<sup>L</sup> = V<sup>U</sup> + PV(TS), and the rate on the shield: r<sub>U</sub> with a constant D/E, r<sub>D</sub> with fixed permanent debt (then PV(TS) = τ<sub>c</sub>D)</li>
<li>D<sub>t</sub> = d · V<sup>L</sup><sub>t</sub> and the debt adjustment between periods</li>
<li>Put-call parity: C − P = S − PV(K)</li>
<li>β<sub>E</sub> = N(d<sub>1</sub>)(V/E)β<sub>U</sub></li>
<li>Myers-Majluf: α = I/(E[V | beliefs] + I + NPV)</li>
<li>Real options, duration and Black-Scholes (the N(d) table was removed in 2021)</li>
</ul>
`,
};
