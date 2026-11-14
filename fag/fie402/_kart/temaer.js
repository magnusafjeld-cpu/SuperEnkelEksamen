/* FIE402 · KARTLEGGING · temalista
   Hvert flervalgsledd i kartleggingen har tema: "<id>". Rapporten samler leddene
   per tema, og øv-lenkene sier hvor du øver på det som ikke satt. vekt er hvor
   tungt temaet er på eksamen (1 til 5, fra emnefrekvensen i docs/fie402-kursplan.md)
   og bestemmer rekkefølgen i rapporten. */
window.EDU_DATA = window.EDU_DATA || {};
window.EDU_DATA.kartlegging = {
  temaer: [
    /* Del 1 · Grunnlag og verdsetting med gjeld */
    { id: "tid", del: 1, navn: "Nåverdi, annuiteter og evigvarende strømmer", kap: [1], vekt: 2,
      øv: [["Kapitteloppgaver, kapittel 1", "#/kapitteloppgaver/1"]] },
    { id: "fcf", del: 1, navn: "Fri kontantstrøm (FCF)", kap: [2], vekt: 2,
      øv: [["Kapitteloppgaver, kapittel 2", "#/kapitteloppgaver/2"], ["Kjernepensum 4: verdsetting med gjeld", "#/kjerne/4"]] },
    { id: "capm", del: 1, navn: "CAPM og beta", kap: [3], vekt: 3,
      øv: [["Sjangertrening: tvillingfirma", "#/sjangre/tvilling/1"], ["Kapitteloppgaver, kapittel 3", "#/kapitteloppgaver/3"]] },
    { id: "tvilling", del: 1, navn: "Tvillingfirma: unlever og relever", kap: [4], vekt: 5,
      øv: [["Sjangertrening: tvillingfirma", "#/sjangre/tvilling/1"], ["Kjernepensum 1: kapitalkostnad", "#/kjerne/1"], ["Kapitteloppgaver, kapittel 4", "#/kapitteloppgaver/4"]] },
    { id: "gjeld", del: 1, navn: "Gjeld: yield, kredittspread og gjeldskostnad", kap: [5], vekt: 2,
      øv: [["Sjangertrening: kredittrisiko", "#/sjangre/kreditt/1"], ["Kapitteloppgaver, kapittel 5", "#/kapitteloppgaver/5"]] },
    { id: "wacc", del: 1, navn: "WACC-metoden", kap: [17], vekt: 5,
      øv: [["Sjangertrening: WACC og APV", "#/sjangre/wacc-apv/1"], ["Kjernepensum 4: verdsetting med gjeld", "#/kjerne/4"], ["Kapitteloppgaver, kapittel 17", "#/kapitteloppgaver/17"]] },
    { id: "apv", del: 1, navn: "APV og renten på skatteskjoldet", kap: [18], vekt: 5,
      øv: [["Sjangertrening: WACC og APV", "#/sjangre/wacc-apv/1"], ["Kapitteloppgaver, kapittel 18", "#/kapitteloppgaver/18"]] },
    { id: "fte", del: 1, navn: "FTE, gjeldspolitikk og D = d·V", kap: [19, 20], vekt: 3,
      øv: [["Kapitteloppgaver, kapittel 19", "#/kapitteloppgaver/19"], ["Kapitteloppgaver, kapittel 20", "#/kapitteloppgaver/20"]] },

    /* Del 2 · Kapitalstruktur, agentkostnader og informasjon */
    { id: "mm", del: 2, navn: "MM I og II, rekapitalisering", kap: [6], vekt: 5,
      øv: [["Sjangertrening: MM og rekapitalisering", "#/sjangre/mm/1"], ["Kjernepensum 2: MM og utbytte", "#/kjerne/2"], ["Kapitteloppgaver, kapittel 6", "#/kapitteloppgaver/6"]] },
    { id: "skatt", del: 2, navn: "Skatteskjoldet på renter", kap: [7], vekt: 4,
      øv: [["Sjangertrening: WACC og APV", "#/sjangre/wacc-apv/1"], ["Kjernepensum 3: skatt og trade-off", "#/kjerne/3"], ["Kapitteloppgaver, kapittel 7", "#/kapitteloppgaver/7"]] },
    { id: "tradeoff", del: 2, navn: "Konkurskostnader, trade-off og gjeldens fordeler", kap: [8, 11], vekt: 2,
      øv: [["Kjernepensum 3: skatt og trade-off", "#/kjerne/3"], ["Kapitteloppgaver, kapittel 8", "#/kapitteloppgaver/8"], ["Kapitteloppgaver, kapittel 11", "#/kapitteloppgaver/11"]] },
    { id: "risikoskift", del: 2, navn: "Risk shifting (asset substitution)", kap: [9], vekt: 3,
      øv: [["Sjangertrening: agentkostnader", "#/sjangre/agent/1"], ["Kjernepensum 5: agentkostnader", "#/kjerne/5"], ["Kapitteloppgaver, kapittel 9", "#/kapitteloppgaver/9"]] },
    { id: "overheng", del: 2, navn: "Debt overhang og reforhandling", kap: [10], vekt: 3,
      øv: [["Sjangertrening: agentkostnader", "#/sjangre/agent/1"], ["Kapitteloppgaver, kapittel 10", "#/kapitteloppgaver/10"]] },
    { id: "myers", del: 2, navn: "Myers-Majluf og pecking order", kap: [12, 13], vekt: 4,
      øv: [["Sjangertrening: Myers-Majluf", "#/sjangre/myers/1"], ["Kjernepensum 6: informasjon og emisjon", "#/kjerne/6"], ["Kapitteloppgaver, kapittel 12", "#/kapitteloppgaver/12"]] },
    { id: "emisjon", del: 2, navn: "IPO og SEO", kap: [14], vekt: 2,
      øv: [["Kjernepensum 6: informasjon og emisjon", "#/kjerne/6"], ["Kapitteloppgaver, kapittel 14", "#/kapitteloppgaver/14"]] },
    { id: "utbytte", del: 2, navn: "Utbytte og tilbakekjøp", kap: [15, 16], vekt: 3,
      øv: [["Sjangertrening: MM og rekapitalisering", "#/sjangre/mm/1"], ["Kapitteloppgaver, kapittel 15", "#/kapitteloppgaver/15"], ["Kapitteloppgaver, kapittel 16", "#/kapitteloppgaver/16"]] },

    /* Del 3 · Opsjoner, M&A og governance */
    { id: "opsjon", del: 3, navn: "Opsjoner: payoff, grenser og put-call-paritet", kap: [21], vekt: 3,
      øv: [["Sjangertrening: opsjoner", "#/sjangre/opsjoner/1"], ["Kapitteloppgaver, kapittel 21", "#/kapitteloppgaver/21"]] },
    { id: "binomial", del: 3, navn: "Binomialmodellen og risikonøytral prising", kap: [22], vekt: 4,
      øv: [["Sjangertrening: opsjoner", "#/sjangre/opsjoner/4"], ["Kjernepensum 7: opsjoner", "#/kjerne/7"], ["Kapitteloppgaver, kapittel 22", "#/kapitteloppgaver/22"]] },
    { id: "bs", del: 3, navn: "Black-Scholes og volatilitet", kap: [23], vekt: 2,
      øv: [["Sjangertrening: opsjoner", "#/sjangre/opsjoner/8"], ["Kapitteloppgaver, kapittel 23", "#/kapitteloppgaver/23"]] },
    { id: "kreditt", del: 3, navn: "Egenkapital og gjeld som opsjoner, kredittrisiko", kap: [24], vekt: 3,
      øv: [["Sjangertrening: kredittrisiko", "#/sjangre/kreditt/1"], ["Kjernepensum 8: kredittrisiko", "#/kjerne/8"], ["Kapitteloppgaver, kapittel 24", "#/kapitteloppgaver/24"]] },
    { id: "realopsjon", del: 3, navn: "Realopsjoner", kap: [25], vekt: 5,
      øv: [["Sjangertrening: realopsjoner", "#/sjangre/realopsjon/1"], ["Kjernepensum 9: realopsjoner", "#/kjerne/9"], ["Kapitteloppgaver, kapittel 25", "#/kapitteloppgaver/25"]] },
    { id: "ma", del: 3, navn: "M&A: aksjebytte, premie og avtalesannsynlighet", kap: [26], vekt: 5,
      øv: [["Sjangertrening: M&A", "#/sjangre/ma/1"], ["Kjernepensum 10: M&A", "#/kjerne/10"], ["Kapitteloppgaver, kapittel 26", "#/kapitteloppgaver/26"]] },
    { id: "governance", del: 3, navn: "Corporate governance", kap: [27], vekt: 4,
      øv: [["Sjangertrening: governance", "#/sjangre/governance/1"], ["Kjernepensum 11: corporate governance", "#/kjerne/11"], ["Kapitteloppgaver, kapittel 27", "#/kapitteloppgaver/27"]] },
  ],
};
