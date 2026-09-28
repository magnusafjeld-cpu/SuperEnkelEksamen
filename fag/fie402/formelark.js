/* ===================== FIE402 · FORMELARKET =====================
   Arket som deles ut på eksamen, ordrett og i samme rekkefølge som
   FIE402_Corp_course_files/Formula sheet.docx (samme ark står bakerst i
   H2024-oppgaven). Engelsk, som på eksamen. Rett aldri et tall eller en formel
   her uten å sjekke mot docx-fila: poenget er at du øver med nøyaktig det du
   får utdelt, og ingenting mer.

   Under arket står det som IKKE er med og må kunnes, tatt fra
   docs/fie402-kursplan.md og FIE402-notatet i hjernen.

   Vises av js/bundle-formelark.js som et lite vindu bak en knapp nederst til
   høyre på alle sider. `.brok` er en stablet brøk: teller, så nevner.
   ============================================================================ */
window.EDU_DATA = window.EDU_DATA || {};
window.EDU_DATA.formelark = {
  tittel: "Formula sheet",
  kilde: "Arket som deles ut på eksamen, ordrett.",
  html: `
<div class="fa-rad">FCF = EBIT × (1 − τ<sub>c</sub>) + Depreciation − CapEx − ΔNWC + Other</div>
<div class="fa-rad">PV(C in perpetuity) = <span class="brok"><span>C</span><span>r</span></span></div>
<div class="fa-rad">PV(C in growing perpetuity) = <span class="brok"><span>C</span><span>r − g</span></span></div>
<div class="fa-rad">E[R<sub>i</sub>] = r<sub>i</sub> = r<sub>f</sub> + β<sub>i</sub><sup>Mkt</sup>(E[R<sub>Mkt</sub>] − r<sub>f</sub>)</div>
<div class="fa-rad">r<sub>E</sub> = r<sub>U</sub> + <span class="brok"><span>D</span><span>E</span></span>(r<sub>U</sub> − r<sub>D</sub>)</div>
<div class="fa-rad">β<sub>U</sub> = <span class="brok"><span>E</span><span>E + D</span></span>β<sub>E</sub> + <span class="brok"><span>D</span><span>E + D</span></span>β<sub>D</sub></div>
<div class="fa-rad"><span class="fa-navn">Pre-tax WACC:</span> r<sub>WACC</sub> = <span class="brok"><span>E</span><span>E + D</span></span>r<sub>E</sub> + <span class="brok"><span>D</span><span>E + D</span></span>r<sub>D</sub></div>
<div class="fa-rad"><span class="fa-navn">After-tax WACC:</span> r<sub>WACC</sub> = <span class="brok"><span>E</span><span>E + D</span></span>r<sub>E</sub> + <span class="brok"><span>D</span><span>E + D</span></span>r<sub>D</sub>(1 − τ<sub>C</sub>)</div>
<div class="fa-rad">C<sub>0</sub> = <span class="brok"><span>C<sub>u</sub> − C<sub>d</sub></span><span>S<sub>u</sub> − S<sub>d</sub></span></span>S<sub>0</sub> + <span class="brok"><span>C<sub>d</sub> − S<sub>d</sub>Δ</span><span>1 + r<sub>f</sub></span></span> = <span class="brok"><span>ρC<sub>u</sub> + (1 − ρ)C<sub>d</sub></span><span>1 + r<sub>f</sub></span></span></div>
<div class="fa-rad">ρ = <span class="brok"><span>(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub></span><span>S<sub>u</sub> − S<sub>d</sub></span></span></div>
<div class="fa-overskrift">Stock swap:</div>
<div class="fa-rad"><span class="fa-navn">Acquiror NPV:</span> (1 − y)(A + T + S) − A</div>
<div class="fa-rad"><span class="fa-navn">Target NPV:</span> y(A + T + S) − T</div>
<div class="fa-overskrift">Exchange ratio:</div>
<div class="fa-rad">ER = <span class="brok"><span>x</span><span>N<sub>T</sub></span></span> &lt; (<span class="brok"><span>T + S</span><span>A</span></span>)<span class="brok"><span>N<sub>A</sub></span><span>N<sub>T</sub></span></span></div>
`,
  /* Det arket ikke gir deg. Kort, fordi vinduet skal være lite. */
  ikkePaaArket: `
<ul>
<li>V<sup>L</sup> = V<sup>U</sup> + PV(TS), og renten på skjoldet: r<sub>U</sub> ved konstant D/E, r<sub>D</sub> ved fast permanent gjeld (da PV(TS) = τ<sub>c</sub>D)</li>
<li>D<sub>t</sub> = d · V<sup>L</sup><sub>t</sub> og gjeldsjusteringen mellom periodene</li>
<li>Put-call-paritet: C − P = S − PV(K)</li>
<li>β<sub>E</sub> = N(d<sub>1</sub>)(V/E)β<sub>U</sub></li>
<li>Myers-Majluf: α = I/(E[V | beliefs] + I + NPV)</li>
<li>Realopsjoner, durasjon og Black-Scholes (N(d)-tabellen ble fjernet i 2021)</li>
</ul>
`,
};
