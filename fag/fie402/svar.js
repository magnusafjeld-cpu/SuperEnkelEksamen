/* ============== FIE402 · SVAR-DATA FOR RETTING (EKSAMENSSETT OG PROBLEM SETS) ==============
   Bygget av tools/bygg-svar.py fra fag/fie402/_svar/*.json. Ikke rediger her.
   Nøkkel "<settId>:<n>:<etikett>". Typen sier hvordan svaret rettes når brukeren
   har lagt inn en API-nøkkel: tall automatisk, tekst og blandet med Claude.
   Se docs/fie402-svar-spek.md.
   ================================================================================ */
window.EDU_DATA = window.EDU_DATA || {};
window.EDU_DATA.svar = {
 "del1-f3:1:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "β<sub>D</sub>",
    "verdi": 0.5000000000000001,
    "enhet": ""
   }
  ]
 },
 "del1-f3:1:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>E</sub>",
    "verdi": 12.5,
    "enhet": "%"
   }
  ]
 },
 "del1-f3:1:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>U</sub>",
    "verdi": 10.4,
    "enhet": "%"
   }
  ],
  "merknad": "Fellen er r_U med skatt (= WACC)."
 },
 "del1-f3:1:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>wacc</sub>",
    "verdi": 9.8995,
    "enhet": "%"
   }
  ]
 },
 "del1-f3:1:e": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>L</sup><sub>0</sub> (WACC)",
    "verdi": 106.23997461060637,
    "enhet": "NOK m",
    "tol": 0.0023
   }
  ],
  "merknad": "Toleransen er satt så V^U (diskontert med r_U) faller utenfor."
 },
 "del1-f3:1:f": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Debt adjustment",
    "verdi": -25.718970799698056,
    "enhet": "NOK m",
    "tol": 0.002,
    "alt": [
     25.718970799698056
    ]
   }
  ],
  "tallPoeng": 1.5,
  "tekstLedd": "Does the company borrow or repay?",
  "merknad": "Begge fortegn godtas for tallet (D1 − D0 eller D0 − D1). Retningen rettes i tekstdelen. Toleransen er høyst 0,2 % fordi justeringen regnet med V^U ligger under 1 % unna."
 },
 "del1-f3:1:g": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>U</sup><sub>0</sub>",
    "verdi": 105.62381852551984,
    "enhet": "NOK m",
    "tol": 0.0023
   }
  ],
  "merknad": "Toleransen er satt så V^L (diskontert med WACC) faller utenfor."
 },
 "del1-f3:1:h": {
  "type": "tall",
  "tall": [
   {
    "navn": "TS<sub>1</sub>",
    "verdi": 0.5317310729260848,
    "enhet": "NOK m"
   },
   {
    "navn": "TS<sub>2</sub>",
    "verdi": 0.16394979049040262,
    "enhet": "NOK m"
   },
   {
    "navn": "PV(TS)",
    "verdi": 0.6161560850865103,
    "enhet": "NOK m"
   }
  ]
 },
 "del1-f3:1:i": {
  "type": "blandet",
  "tall": [
   {
    "navn": "V<sup>L</sup><sub>0</sub> (APV)",
    "verdi": 106.23997461060635,
    "enhet": "NOK m",
    "tol": 0.0001
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Compare with (e) and explain in one sentence.",
  "merknad": "Toleransen er satt så skjoldet diskontert med r_D faller utenfor."
 },
 "del1-f3:2:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>U</sub>",
    "verdi": 7.928571428571429,
    "enhet": "%"
   }
  ]
 },
 "del1-f3:2:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "β<sub>E</sub>",
    "verdi": 1.5714285714285712,
    "enhet": ""
   },
   {
    "navn": "r<sub>E</sub>",
    "verdi": 10.857142857142858,
    "enhet": "%"
   }
  ]
 },
 "del1-f3:2:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>wacc</sub>",
    "verdi": 7.378571428571429,
    "enhet": "%"
   }
  ]
 },
 "del1-f3:2:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>L</sup> (WACC)",
    "verdi": 4201.35527589545,
    "enhet": "NOK m"
   }
  ]
 },
 "del1-f3:2:e": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>L</sup> (APV)",
    "verdi": 4201.355275895449,
    "enhet": "NOK m"
   }
  ],
  "merknad": "Bare V^L er spurt etter. Skjoldet med r_D gir en verdi utenfor toleransen."
 },
 "del1-f3:2:f": {
  "type": "tekst"
 },
 "del1-f4:1:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>D</sub>",
    "verdi": 5.0,
    "enhet": "%"
   }
  ]
 },
 "del1-f4:1:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "β<sub>E</sub>",
    "verdi": 1.9,
    "enhet": ""
   }
  ]
 },
 "del1-f4:1:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>U</sub>",
    "verdi": 10.333333333333334,
    "enhet": "%"
   }
  ],
  "merknad": "Fellen er r_U med skatt (= WACC) og D/E brukt som vekt."
 },
 "del1-f4:1:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>wacc</sub>",
    "verdi": 9.916666666666668,
    "enhet": "%"
   }
  ]
 },
 "del1-f4:1:e": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>L</sup><sub>0</sub> (WACC)",
    "verdi": 95.5614018247334,
    "enhet": "$ m",
    "tol": 0.0022
   }
  ],
  "merknad": "Toleransen er satt så V^U (diskontert med r_U) og D/E brukt som vekt faller utenfor."
 },
 "del1-f4:1:f": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Debt adjustment",
    "verdi": -15.174498106349088,
    "enhet": "$ m",
    "tol": 0.002,
    "alt": [
     15.174498106349088
    ]
   }
  ],
  "tallPoeng": 1.5,
  "tekstLedd": "Does the company borrow or repay?",
  "merknad": "Begge fortegn godtas for tallet (D1 − D0 eller D0 − D1). Retningen rettes i tekstdelen. Toleransen er høyst 0,2 % fordi justeringen regnet med V^U ligger under 1 % unna."
 },
 "del1-f4:1:g": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>U</sup><sub>0</sub>",
    "verdi": 95.02925311013956,
    "enhet": "$ m",
    "tol": 0.0022
   }
  ],
  "merknad": "Toleransen er satt så V^L (diskontert med WACC) faller utenfor."
 },
 "del1-f4:1:h": {
  "type": "tall",
  "tall": [
   {
    "navn": "TS<sub>1</sub>",
    "verdi": 0.3981725076030558,
    "enhet": "$ m"
   },
   {
    "navn": "TS<sub>2</sub>",
    "verdi": 0.2084912812736922,
    "enhet": "$ m"
   },
   {
    "navn": "PV(TS)",
    "verdi": 0.5321487145938404,
    "enhet": "$ m"
   }
  ]
 },
 "del1-f4:1:i": {
  "type": "blandet",
  "tall": [
   {
    "navn": "V<sup>L</sup><sub>0</sub> (APV)",
    "verdi": 95.56140182473341,
    "enhet": "$ m",
    "tol": 0.00015
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Is the colleague who discounted the tax shields at r_D right?",
  "merknad": "Toleransen er satt så skjoldet diskontert med r_D faller utenfor."
 },
 "del1-f4:2:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>U</sub>",
    "verdi": 9.85,
    "enhet": "%",
    "tol": 0.0061
   }
  ],
  "merknad": "Fellene er feil form på gjeldsgraden for ett av firmaene, bare ett firma og snitt av beta_E."
 },
 "del1-f4:2:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "β<sub>E</sub>",
    "verdi": 1.3599999999999999,
    "enhet": ""
   },
   {
    "navn": "r<sub>E</sub>",
    "verdi": 12.160000000000002,
    "enhet": "%"
   }
  ]
 },
 "del1-f4:2:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>wacc</sub>",
    "verdi": 9.287500000000001,
    "enhet": "%"
   }
  ]
 },
 "del1-f4:2:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>L</sup> (WACC)",
    "verdi": 807.5370121130551,
    "enhet": "$ m"
   }
  ]
 },
 "del1-f4:2:e": {
  "type": "tall",
  "tall": [
   {
    "navn": "PV(TS)",
    "verdi": 46.115692316100855,
    "enhet": "$ m"
   },
   {
    "navn": "V<sup>L</sup> (APV)",
    "verdi": 807.5370121130552,
    "enhet": "$ m"
   }
  ],
  "merknad": "Fellene er skjoldet med r_D og D = 0,6 × V^L."
 },
 "del1-f4:2:f": {
  "type": "tekst"
 },
 "del1-f5:1:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "β<sub>D</sub>",
    "verdi": 0.4999999999999999,
    "enhet": ""
   }
  ]
 },
 "del1-f5:1:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>E</sub>",
    "verdi": 12.8,
    "enhet": "%"
   }
  ]
 },
 "del1-f5:1:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>U</sub>",
    "verdi": 8.72,
    "enhet": "%"
   }
  ],
  "merknad": "Fellen er r_U med skatt (= WACC)."
 },
 "del1-f5:1:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>wacc</sub>",
    "verdi": 7.819999999999999,
    "enhet": "%"
   }
  ]
 },
 "del1-f5:1:e": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>L</sup><sub>0</sub> (WACC)",
    "verdi": 126.50294373775263,
    "enhet": "€ m",
    "tol": 0.0069
   }
  ],
  "merknad": "Toleransen er satt så V^U (diskontert med r_U) faller utenfor."
 },
 "del1-f5:1:f": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Debt adjustment",
    "verdi": 13.135518120175348,
    "enhet": "€ m",
    "tol": 0.002,
    "alt": [
     -13.135518120175348
    ]
   }
  ],
  "tallPoeng": 1.5,
  "tekstLedd": "Does the company borrow or repay?",
  "merknad": "Begge fortegn godtas for tallet (D1 − D0 eller D0 − D1). Retningen rettes i tekstdelen. Toleransen er høyst 0,2 % fordi justeringen regnet med V^U ligger under 1 % unna."
 },
 "del1-f5:1:g": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>U</sup><sub>0</sub>",
    "verdi": 124.32582283319823,
    "enhet": "€ m",
    "tol": 0.007
   }
  ],
  "merknad": "Toleransen er satt så V^L (diskontert med WACC) faller utenfor."
 },
 "del1-f5:1:h": {
  "type": "tall",
  "tall": [
   {
    "navn": "TS<sub>1</sub>",
    "verdi": 1.1385264936397737,
    "enhet": "€ m"
   },
   {
    "navn": "TS<sub>2</sub>",
    "verdi": 1.3355592654424038,
    "enhet": "€ m"
   },
   {
    "navn": "PV(TS)",
    "verdi": 2.1771209045543927,
    "enhet": "€ m"
   }
  ]
 },
 "del1-f5:1:i": {
  "type": "blandet",
  "tall": [
   {
    "navn": "V<sup>L</sup><sub>0</sub> (APV)",
    "verdi": 126.50294373775262,
    "enhet": "€ m",
    "tol": 0.00027
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Could a single WACC as in (e) still be used with the debt fixed at the Year-0 amount?",
  "merknad": "Toleransen er satt så skjoldet diskontert med r_D faller utenfor."
 },
 "del1-f5:2:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>U</sub>",
    "verdi": 9.0,
    "enhet": "%"
   }
  ]
 },
 "del1-f5:2:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "β<sub>E</sub>",
    "verdi": 1.6563636363636363,
    "enhet": ""
   },
   {
    "navn": "r<sub>E</sub>",
    "verdi": 11.781818181818181,
    "enhet": "%"
   }
  ]
 },
 "del1-f5:2:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>wacc</sub>",
    "verdi": 8.4708,
    "enhet": "%"
   }
  ]
 },
 "del1-f5:2:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>L</sup> (WACC)",
    "verdi": 370.8969524633739,
    "enhet": "$ m"
   }
  ]
 },
 "del1-f5:2:e": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>U</sup>",
    "verdi": 342.8571428571429,
    "enhet": "$ m"
   },
   {
    "navn": "PV(TS)",
    "verdi": 28.03980960623107,
    "enhet": "$ m"
   },
   {
    "navn": "V<sup>L</sup> (APV)",
    "verdi": 370.89695246337396,
    "enhet": "$ m",
    "tol": 0.0067
   }
  ],
  "merknad": "Fellene er skjoldet med r_D og skjoldet som flat evigrente."
 },
 "del1-f5:2:f": {
  "type": "tekst"
 },
 "del2-f3:1:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>E</sub>",
    "verdi": 6.444444444444445,
    "enhet": "%"
   },
   {
    "navn": "P<sub>0</sub>",
    "verdi": 48.0,
    "enhet": "$ per share"
   }
  ]
 },
 "del2-f3:1:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Div<sub>1</sub>",
    "verdi": 3.0933333333333333,
    "enhet": "$ per share"
   },
   {
    "navn": "P<sub>1</sub> (ex-dividend)",
    "verdi": 48.0,
    "enhet": "$ per share"
   }
  ]
 },
 "del2-f3:1:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "New debt issued",
    "verdi": 144.0,
    "enhet": "$ m"
   },
   {
    "navn": "Share price on announcement",
    "verdi": 48.0,
    "enhet": "$ per share"
   },
   {
    "navn": "Shares repurchased",
    "verdi": 3.0,
    "enhet": "m shares"
   }
  ],
  "merknad": "Alle tre spørsmålene har tallsvar. MM I ligger i at kursen er uendret."
 },
 "del2-f3:1:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "Div<sub>1</sub>",
    "verdi": 3.875555555555555,
    "enhet": "$ per share"
   },
   {
    "navn": "New r<sub>E</sub>",
    "verdi": 8.074074074074074,
    "enhet": "%"
   }
  ]
 },
 "del2-f3:1:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Original shareholder",
    "verdi": 48.0,
    "enhet": "$ per share"
   },
   {
    "navn": "Shareholder who sold",
    "verdi": 48.0,
    "enhet": "$ per share"
   },
   {
    "navn": "Shareholder who kept",
    "verdi": 47.999999999999986,
    "enhet": "$ per share"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Compare the three payoffs and comment."
 },
 "del2-f3:2:a": {
  "type": "blandet",
  "tall": [
   {
    "navn": "E[payoff] A",
    "verdi": 60.0,
    "enhet": "$ m"
   },
   {
    "navn": "E[payoff] B",
    "verdi": 58.0,
    "enhet": "$ m"
   },
   {
    "navn": "E[payoff] C",
    "verdi": 43.0,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 1.5,
  "tekstLedd": "Which project will the manager choose?"
 },
 "del2-f3:2:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Equity value A",
    "verdi": 35.0,
    "enhet": "$ m"
   },
   {
    "navn": "Equity value B",
    "verdi": 39.0,
    "enhet": "$ m"
   },
   {
    "navn": "Equity value C",
    "verdi": 33.75,
    "enhet": "$ m"
   },
   {
    "navn": "Value of the debt (project B)",
    "verdi": 19.0,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Which project will the manager choose?"
 },
 "del2-f3:2:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Debt level D (A ~ B)",
    "verdi": 15.0,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Briefly explain what happens if debt increases beyond that value."
 },
 "del2-f3:2:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Equity value B with the deal",
    "verdi": 33.0,
    "enhet": "$ m"
   },
   {
    "navn": "Debt value B with the deal",
    "verdi": 25.0,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Will the management accept the deal? Who gains and who loses if Quillmoor signs and does B?",
  "merknad": "Spørsmålet ber ikke direkte om tall, men svaret står på egenkapitalen med garantien (33 mot 39) og gjelden (25 mot 19)."
 },
 "del2-f4:1:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>U</sub>",
    "verdi": 8.916666666666668,
    "enhet": "%"
   }
  ]
 },
 "del2-f4:1:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Share price on announcement",
    "verdi": 125.0,
    "enhet": "NOK per share"
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Explain what happens to the share price upon announcement and why.",
  "merknad": "Blandet: grunnen (perfekt marked, MM I) er poenget med deloppgaven, som i h2024:3:b."
 },
 "del2-f4:1:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Share price after the dividend",
    "verdi": 95.0,
    "enhet": "NOK per share"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Are the shareholders better off or worse off?"
 },
 "del2-f4:1:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "New r<sub>E</sub>",
    "verdi": 11.184210526315791,
    "enhet": "%"
   }
  ]
 },
 "del2-f4:1:e": {
  "type": "tall",
  "tall": [
   {
    "navn": "Share price after the repurchase",
    "verdi": 125.0,
    "enhet": "NOK per share"
   },
   {
    "navn": "Shares repurchased",
    "verdi": 9.6,
    "enhet": "m shares"
   }
  ]
 },
 "del2-f4:2:a": {
  "type": "blandet",
  "tall": [
   {
    "navn": "E[value] S",
    "verdi": 73.5,
    "enhet": "NOK m"
   },
   {
    "navn": "E[value] R",
    "verdi": 62.5,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 1.5,
  "tekstLedd": "Which strategy will the manager choose?"
 },
 "del2-f4:2:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Equity value S",
    "verdi": 23.5,
    "enhet": "NOK m"
   },
   {
    "navn": "Equity value R",
    "verdi": 32.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Agency cost of debt",
    "verdi": 11.0,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Which strategy will the manager choose?"
 },
 "del2-f4:2:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Debt level D (S ~ R)",
    "verdi": 39.375,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Briefly explain what happens if debt increases beyond that value."
 },
 "del2-f4:2:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Equity value S with contract",
    "verdi": 23.5,
    "enhet": "NOK m"
   },
   {
    "navn": "Equity value R with contract",
    "verdi": 20.0,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Will the management accept the contract? Explain why or why not.",
  "merknad": "Spørsmålet ber ikke direkte om tall, men svaret står på egenkapitalen med kontrakten (23.5 og 20) mot 32 uten, som i h2024:4:d."
 },
 "del2-f5:1:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "P<sub>0</sub>",
    "verdi": 30.0,
    "enhet": "€ per share"
   },
   {
    "navn": "r<sub>U</sub>",
    "verdi": 6.75,
    "enhet": "%"
   }
  ]
 },
 "del2-f5:1:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Div<sub>1</sub>",
    "verdi": 2.4,
    "enhet": "€ per share"
   },
   {
    "navn": "Price just before",
    "verdi": 32.4,
    "enhet": "€ per share"
   },
   {
    "navn": "Price just after",
    "verdi": 30.0,
    "enhet": "€ per share"
   }
  ]
 },
 "del2-f5:1:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "New debt issued",
    "verdi": 350.0,
    "enhet": "€ m"
   },
   {
    "navn": "Share price on announcement",
    "verdi": 30.0,
    "enhet": "€ per share"
   },
   {
    "navn": "Shares repurchased",
    "verdi": 11.666666666666666,
    "enhet": "m shares"
   }
  ]
 },
 "del2-f5:1:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "Div<sub>1</sub>",
    "verdi": 3.7125,
    "enhet": "€ per share"
   },
   {
    "navn": "New r<sub>E</sub>",
    "verdi": 12.375000000000002,
    "enhet": "%"
   }
  ]
 },
 "del2-f5:1:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Ben's yearly cash flow",
    "verdi": 90.0,
    "enhet": "€"
   },
   {
    "navn": "Carla's yearly cash flow",
    "verdi": 371.25,
    "enhet": "€"
   },
   {
    "navn": "Value of each position",
    "verdi": 3000.0,
    "enhet": "€"
   },
   {
    "navn": "Shares held to recreate Ana",
    "verdi": 53.333333333333336,
    "enhet": "shares"
   },
   {
    "navn": "Amount lent to recreate Ana",
    "verdi": 1400.0,
    "enhet": "€"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Comment. How can Ana's yearly cash flow be recreated?",
  "merknad": "Anas 240 i året er målet for gjenskapingen og står i løsningen; den er utelatt for å holde fem tall. Den som oppgir at investoren selger 46.6667 aksjer, har samme svar som 53.3333 beholdt."
 },
 "del2-f5:2:a": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Value, keep the cash",
    "verdi": 40.0,
    "enhet": "€ m"
   },
   {
    "navn": "E[payoff] A",
    "verdi": 46.0,
    "enhet": "€ m"
   },
   {
    "navn": "E[payoff] B",
    "verdi": 43.0,
    "enhet": "€ m"
   },
   {
    "navn": "E[payoff] C",
    "verdi": 28.0,
    "enhet": "€ m"
   }
  ],
  "tallPoeng": 1.5,
  "tekstLedd": "What will the manager do?"
 },
 "del2-f5:2:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Equity, keep the cash",
    "verdi": 10.0,
    "enhet": "€ m"
   },
   {
    "navn": "Equity value A",
    "verdi": 16.0,
    "enhet": "€ m"
   },
   {
    "navn": "Equity value B",
    "verdi": 21.0,
    "enhet": "€ m"
   },
   {
    "navn": "Equity value C",
    "verdi": 18.0,
    "enhet": "€ m"
   }
  ],
  "tallPoeng": 2.5,
  "tekstLedd": "What will the manager do?"
 },
 "del2-f5:2:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Debt level D (B ~ C)",
    "verdi": 37.5,
    "enhet": "€ m"
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Briefly explain what happens if the debt is higher."
 },
 "del2-f5:2:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Shares if signed",
    "verdi": 16.0,
    "enhet": "€ m"
   },
   {
    "navn": "Loan if signed",
    "verdi": 30.0,
    "enhet": "€ m"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Will the management sign the contract? Explain why or why not.",
  "merknad": "Med kontrakten velges A: aksjene 16 og lånet 30. Lånet er 30 også om studenten glemmer å optimere på nytt (B med kontrakt er trygg), men da blir aksjene 13."
 },
 "del3-f4:3:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV now",
    "verdi": 0.15858769988096455,
    "enhet": "NOK m",
    "abs": 0.005
   }
  ],
  "merknad": "Nær null i forhold til investeringen på 16, derfor abs-toleranse (0,005)."
 },
 "del3-f4:3:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV<sub>0</sub>, r<sub>f</sub> = 2.5%",
    "verdi": 1.1618550018684213,
    "enhet": "NOK m",
    "abs": 0.005
   },
   {
    "navn": "NPV<sub>0</sub>, r<sub>f</sub> = 6%",
    "verdi": -1.0543219746856356,
    "enhet": "NOK m",
    "abs": 0.005
   }
  ],
  "merknad": "Spørsmålet ber om dagens perspektiv. Verdiene ved t = 1 (1,2083 og −1,0965) godtas ikke."
 },
 "del3-f4:3:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "ρ (risk-neutral probability of the 2.5% rate)",
    "verdi": 0.5445116952050908,
    "enhet": ""
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Briefly explain why you do not need the true probabilities.",
  "merknad": "Eksakt pris 743,5332 gir 0.544546, innenfor toleransen. Fellen (S0 = 16,1585 for år 1 til 8) gir 0.8250 og avvises; uten betalingen ved t = 1 blir ρ 1.5858."
 },
 "del3-f4:3:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Value today of waiting",
    "verdi": 0.6326436366498881,
    "enhet": "NOK m",
    "abs": 0.005
   },
   {
    "navn": "Value of waiting minus building now",
    "verdi": 0.47405593676892355,
    "enhet": "NOK m",
    "abs": 0.005
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Do you build now or wait? Briefly comment.",
  "merknad": "Den feilparrede ρ gir 0.9585 og avvises."
 },
 "del3-f4:4:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Government bond",
    "verdi": 966.1835748792271,
    "enhet": "NOK"
   },
   {
    "navn": "Brakstad bond",
    "verdi": 925.9259259259259,
    "enhet": "NOK"
   }
  ]
 },
 "del3-f4:4:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Expected return",
    "verdi": 5.840000000000001,
    "enhet": "%"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Why does it differ from its yield to maturity?"
 },
 "del3-f4:4:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Risk-neutral default probability ρ",
    "verdi": 0.10416666666666714,
    "enhet": ""
   },
   {
    "navn": "Price of one CDS contract",
    "verdi": 0.10064412238325329,
    "enhet": "NOK"
   }
  ],
  "merknad": "Overlevelsessannsynligheten (0.8958) og CDS-prisen med den (0.8655) er fellen og avvises."
 },
 "del3-f4:4:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "CDS contracts",
    "verdi": 20.0,
    "enhet": "m contracts",
    "alt": [
     20000000.0
    ]
   },
   {
    "navn": "Cost of the contracts",
    "verdi": 2.0128824476650657,
    "enhet": "NOK m",
    "alt": [
     2012882.4476650658
    ]
   },
   {
    "navn": "Hedged position",
    "verdi": 48.309178743961354,
    "enhet": "NOK m",
    "alt": [
     48309178.74396136
    ]
   }
  ],
  "merknad": "alt er de samme svarene i hele kontrakter og hele kroner, siden retteren ikke skalerer enheter."
 },
 "del3-f4:4:e": {
  "type": "tekst"
 },
 "del3-f4:1:": {
  "type": "tekst"
 },
 "del3-f4:2:": {
  "type": "tekst"
 },
 "del3-f5:3:a": {
  "type": "blandet",
  "tall": [
   {
    "navn": "NPV",
    "verdi": -169999.99999999907,
    "enhet": "NOK"
   }
  ],
  "tallPoeng": 1.5,
  "tekstLedd": "Will you open it?"
 },
 "del3-f5:3:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Maximum price for the study (C<sub>0</sub>)",
    "verdi": 2530000.0,
    "enhet": "NOK"
   }
  ]
 },
 "del3-f5:3:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "C<sub>1</sub>",
    "verdi": 2409523.8095238092,
    "enhet": "NOK"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Compare with (b) and comment."
 },
 "del3-f5:3:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "NPV with the exit programme",
    "verdi": 1229416.9096209912,
    "enhet": "NOK"
   },
   {
    "navn": "Value of the programme",
    "verdi": 1229416.9096209912,
    "enhet": "NOK"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Will you open it?",
  "merknad": "Verdien av programmet er målt mot 0. 1399417 (mot den negative NPV-en) er fellen og avvises."
 },
 "del3-f5:3:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Indifference probability with the programme",
    "verdi": 0.38586293691776735,
    "enhet": ""
   },
   {
    "navn": "Indifference probability without the programme",
    "verdi": 0.5660377358490566,
    "enhet": ""
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Comment briefly."
 },
 "del3-f5:4:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Probability of completion",
    "verdi": 0.5745454545454552,
    "enhet": ""
   }
  ],
  "merknad": "Fellen (240 i stedet for 249,60) gir 0.3564 og avvises."
 },
 "del3-f5:4:b": {
  "type": "tekst"
 },
 "del3-f5:4:c": {
  "type": "tekst"
 },
 "del3-f5:1:": {
  "type": "tekst"
 },
 "del3-f5:2:": {
  "type": "tekst"
 },
 "del3-f6:3:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV of ordering now",
    "verdi": 26.5,
    "enhet": "NOK m"
   }
  ],
  "merknad": "Med 65 % og r_f blir verdien 274.0442 og NPV 34.0442; det avvises."
 },
 "del3-f6:3:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV at t = 1, strong",
    "verdi": 36.32236033594779,
    "enhet": "NOK m"
   },
   {
    "navn": "NPV at t = 1, weak",
    "verdi": -38.758229748039156,
    "enhet": "NOK m"
   },
   {
    "navn": "NPV at t = 0, strong",
    "verdi": 34.925346476872875,
    "enhet": "NOK m"
   },
   {
    "navn": "NPV at t = 0, weak",
    "verdi": -37.267528603883804,
    "enhet": "NOK m"
   }
  ]
 },
 "del3-f6:3:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "ρ (risk-neutral probability of a strong market)",
    "verdi": 0.5495192526042584,
    "enhet": ""
   }
  ],
  "tallPoeng": 5,
  "tekstLedd": "Compare it with the analysts' 65% and explain the difference briefly.",
  "merknad": "Uten utbyttet ved t = 1 blir ρ 0.9547; det avvises."
 },
 "del3-f6:3:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Value today of waiting",
    "verdi": 19.19215029291595,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Do you order now or wait? Briefly comment."
 },
 "del3-f6:4:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Probability of completion",
    "verdi": 0.5730437180850162,
    "enhet": "",
    "tol": 0.005
   }
  ],
  "merknad": "Stram toleranse (0,5 %) så helårsfaktoren 1,05 (0.5625) avvises. Enkel rente (0.5729) havner innenfor og godtas som tilnærming."
 },
 "del3-f6:4:b": {
  "type": "tekst"
 },
 "del3-f6:4:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Probability of completion after the vote",
    "verdi": 0.1564398046424671,
    "enhet": ""
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "How would you have voted? Is the market reaction consistent with that? Briefly explain.",
  "merknad": "Med 6 måneder i stedet for 3 blir p 0.1461, med helt år 0.1250; begge avvises."
 },
 "del3-f6:1:": {
  "type": "tekst"
 },
 "del3-f6:2:": {
  "type": "tekst"
 },
 "h2024:1:": {
  "type": "tekst"
 },
 "h2024:2:": {
  "type": "tekst"
 },
 "h2024:3:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>U</sub>",
    "verdi": 8.062499999999998,
    "enhet": "%"
   }
  ]
 },
 "h2024:3:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Share price on announcement",
    "verdi": 90.0,
    "enhet": "$ per share"
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Explain what happens to the share price upon announcement and why.",
  "merknad": "Blandet: kriteriene sier at grunnen (perfekt marked, ingen skatt, MM I) er poenget med deloppgaven."
 },
 "h2024:3:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Share price after the dividend",
    "verdi": 80.0,
    "enhet": "$ per share"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Are the shareholders better off or worse off?"
 },
 "h2024:3:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "New r<sub>E</sub>",
    "verdi": 9.249999999999998,
    "enhet": "%"
   }
  ]
 },
 "h2024:3:e": {
  "type": "tall",
  "tall": [
   {
    "navn": "Share price after the repurchase",
    "verdi": 90.0,
    "enhet": "$ per share"
   },
   {
    "navn": "Shares repurchased",
    "verdi": 1.6666666666666667,
    "enhet": "m shares"
   }
  ]
 },
 "h2024:4:a": {
  "type": "blandet",
  "tall": [
   {
    "navn": "E[payoff] A",
    "verdi": 50.0,
    "enhet": "$ m"
   },
   {
    "navn": "E[payoff] B",
    "verdi": 48.0,
    "enhet": "$ m"
   },
   {
    "navn": "E[payoff] C",
    "verdi": 30.0,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 1.5,
  "tekstLedd": "Which project will the manager choose?"
 },
 "h2024:4:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Equity value A",
    "verdi": 25.0,
    "enhet": "$ m"
   },
   {
    "navn": "Equity value B",
    "verdi": 27.5,
    "enhet": "$ m"
   },
   {
    "navn": "Equity value C",
    "verdi": 25.0,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Which project will the manager choose?"
 },
 "h2024:4:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Debt level D (B ~ C)",
    "verdi": 33.333333333333336,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Briefly explain what happens if debt increases beyond that value."
 },
 "h2024:4:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Equity value A with hedge",
    "verdi": 25.0,
    "enhet": "$ m"
   },
   {
    "navn": "Equity value B with hedge",
    "verdi": 23.0,
    "enhet": "$ m"
   },
   {
    "navn": "Equity value C with hedge",
    "verdi": 23.0,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Will BTC management accept the project? Explain why or why not.",
  "merknad": "Spørsmålet ber ikke om tall, men svaret står og faller på egenkapitalverdiene med sikringen (25, 23, 23 mot 27,5 uten). Derfor blandet, som «which project will the manager choose?»."
 },
 "h2024:5:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>U</sub> (SoF)",
    "verdi": 12.200000000000001,
    "enhet": "%"
   }
  ]
 },
 "h2024:5:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>E</sub> (SoF)",
    "verdi": 14.857142857142858,
    "enhet": "%"
   }
  ]
 },
 "h2024:5:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>wacc</sub>",
    "verdi": 11.48,
    "enhet": "%"
   }
  ]
 },
 "h2024:5:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>L</sup> (WACC)",
    "verdi": 348.43205574912895,
    "enhet": "NOK m"
   }
  ]
 },
 "h2024:5:e": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>L</sup> (APV)",
    "verdi": 348.4320557491289,
    "enhet": "NOK m"
   }
  ],
  "merknad": "Bare V^L er spurt etter. Det er samme tall som i (d); feil rente på skatteskjoldet (r_D gir 369,68) slår ut."
 },
 "h2024:6:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV now",
    "verdi": -0.41739760622277444,
    "enhet": "NOK m",
    "abs": 0.01
   }
  ],
  "merknad": "Nær null i forhold til investeringen på 12, derfor abs-toleranse (0,01)."
 },
 "h2024:6:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV<sub>0</sub>, r<sub>f</sub> = 3%",
    "verdi": 0.7574326239654791,
    "enhet": "NOK m",
    "abs": 0.01
   },
   {
    "navn": "NPV<sub>0</sub>, r<sub>f</sub> = 7%",
    "verdi": -1.3948835129534198,
    "enhet": "NOK m",
    "abs": 0.01
   }
  ],
  "merknad": "Nær null i forhold til investeringen på 12, derfor abs-toleranse (0,01). Kurbatovs nøkkel har en skrivefeil i 7 %-linjen (0,7953/1,05 i stedet for −1,4646/1,05); resultatet −1,3949 er riktig."
 },
 "h2024:6:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "ρ (risk-neutral probability of the upside)",
    "verdi": 0.4633900968866032,
    "enhet": ""
   }
  ],
  "merknad": "Tvillingen for år 1 til 10 gir 0,4663, innenfor standardtoleransen. Fellen (S0 = 11,5826) gir 0,7197 og avvises."
 },
 "h2024:6:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Value of the option to wait",
    "verdi": 0.3509867770044374,
    "enhet": "NOK m",
    "abs": 0.005
   }
  ],
  "tallPoeng": 1.5,
  "tekstLedd": "What is your decision right now (Year 0): do you invest or wait? Briefly comment.",
  "merknad": "Abs-toleranse 0,005: ρ avrundet til 0,46 gir 0,3484. Den feilparrede ρ = 0,7197 gir 0,5451 og avvises."
 },
 "h2025:1:": {
  "type": "tekst"
 },
 "h2025:2:": {
  "type": "tekst"
 },
 "h2025:3:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>E</sub>",
    "verdi": 7.500000000000001,
    "enhet": "%"
   },
   {
    "navn": "P<sub>0</sub>",
    "verdi": 200.0,
    "enhet": "$ per share"
   }
  ]
 },
 "h2025:3:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Div<sub>1</sub>",
    "verdi": 15.0,
    "enhet": "$ per share"
   },
   {
    "navn": "P<sub>1</sub> (ex-dividend)",
    "verdi": 199.99999999999997,
    "enhet": "$ per share"
   }
  ]
 },
 "h2025:3:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "New debt issued",
    "verdi": 50.0,
    "enhet": "$ m"
   },
   {
    "navn": "Share price on announcement",
    "verdi": 200.0,
    "enhet": "$ per share"
   },
   {
    "navn": "Shares repurchased",
    "verdi": 0.25,
    "enhet": "m shares"
   }
  ],
  "merknad": "Tall og ikke blandet: alle tre spørsmålene har tallsvar. MM I (ingen skatt, kursen uendret) ligger i at kursen er 200."
 },
 "h2025:3:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "Div<sub>1</sub>",
    "verdi": 16.666666666666668,
    "enhet": "$ per share"
   },
   {
    "navn": "New r<sub>E</sub>",
    "verdi": 8.333333333333332,
    "enhet": "%"
   }
  ]
 },
 "h2025:3:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Original shareholder (no recap)",
    "verdi": 199.99999999999997,
    "enhet": "$ per share"
   },
   {
    "navn": "Shareholder who sold",
    "verdi": 200.0,
    "enhet": "$ per share"
   },
   {
    "navn": "Shareholder who kept",
    "verdi": 200.00000000000003,
    "enhet": "$ per share"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Compare the three payoffs and comment."
 },
 "h2025:4:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "β<sub>D</sub>",
    "verdi": 0.8000000000000002,
    "enhet": ""
   }
  ]
 },
 "h2025:4:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>E</sub>",
    "verdi": 18.0,
    "enhet": "%"
   }
  ]
 },
 "h2025:4:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>U</sub>",
    "verdi": 16.4,
    "enhet": "%"
   }
  ]
 },
 "h2025:4:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>wacc</sub>",
    "verdi": 15.6,
    "enhet": "%"
   }
  ]
 },
 "h2025:4:e": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>L</sup><sub>0</sub> (WACC)",
    "verdi": 72.0178158786413,
    "enhet": "$ m",
    "tol": 0.0005
   }
  ],
  "merknad": "Stram toleranse (0,05 %): feil vekter 0,25/0,75 gir 72,59, under 1 % unna. Nøkkelen godtar et avvik på om lag 0,001."
 },
 "h2025:4:f": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Debt adjustment",
    "verdi": 5.753044144586392,
    "enhet": "$ m",
    "alt": [
     -5.753044144586392
    ]
   }
  ],
  "tallPoeng": 1.5,
  "tekstLedd": "Say in words what the adjustment is: does the company borrow or repay?",
  "merknad": "Begge fortegn godtas for tallet (D0 − D1 = 5,7531 eller D1 − D0 = −5,7531). Retningen (gjelden betales ned) rettes i tekstdelen, slik kriteriene krever."
 },
 "h2025:4:g": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>U</sup><sub>0</sub>",
    "verdi": 71.26746259491503,
    "enhet": "$ m",
    "tol": 0.0005
   }
  ],
  "merknad": "Stram toleranse (0,05 %) av samme grunn som i (e)."
 },
 "h2025:4:h": {
  "type": "tall",
  "tall": [
   {
    "navn": "TS<sub>1</sub>",
    "verdi": 0.5761425270291305,
    "enhet": "$ m"
   },
   {
    "navn": "TS<sub>2</sub>",
    "verdi": 0.3460207612456748,
    "enhet": "$ m"
   },
   {
    "navn": "PV(TS)",
    "verdi": 0.7503532837262659,
    "enhet": "$ m"
   }
  ]
 },
 "h2025:4:i": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>L</sup><sub>0</sub> (APV)",
    "verdi": 72.0178158786413,
    "enhet": "$ m",
    "tol": 0.0005
   }
  ],
  "merknad": "Stram toleranse (0,05 %): skatteskjoldet diskontert med r_D gir 72,0773, 0,08 % unna."
 },
 "h2025:5:a": {
  "type": "blandet",
  "tall": [
   {
    "navn": "NPV",
    "verdi": -17142.85714285716,
    "enhet": "NOK"
   }
  ],
  "tallPoeng": 1.5,
  "tekstLedd": "Will you open it?"
 },
 "h2025:5:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Maximum price for the study (C<sub>0</sub>)",
    "verdi": 134285.71428571426,
    "enhet": "NOK"
   }
  ]
 },
 "h2025:5:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "C<sub>1</sub>",
    "verdi": 125500.6675567423,
    "enhet": "NOK"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Compare your result to the previous one and comment."
 },
 "h2025:5:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "NPV with the exit option",
    "verdi": 45245.623448086524,
    "enhet": "NOK"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Will you open it?"
 },
 "h2025:5:e": {
  "type": "tall",
  "tall": [
   {
    "navn": "X",
    "verdi": 12747.760000000002,
    "enhet": "NOK"
   }
  ]
 },
 "h2025:6:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Probability of completion",
    "verdi": 0.8283333333333331,
    "enhet": ""
   }
  ]
 },
 "h2025:6:b": {
  "type": "tekst"
 },
 "h2025:6:c": {
  "type": "tekst"
 },
 "hint1-1:1:": {
  "type": "tekst"
 },
 "hint1-1:2:": {
  "type": "tekst"
 },
 "hint1-1:3:a": {
  "type": "tekst"
 },
 "hint1-1:3:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "FCF<sub>0</sub>",
    "verdi": -62.0,
    "enhet": "NOK m"
   },
   {
    "navn": "FCF<sub>1</sub>",
    "verdi": 21.02,
    "enhet": "NOK m"
   },
   {
    "navn": "FCF<sub>2</sub>",
    "verdi": 25.02,
    "enhet": "NOK m"
   },
   {
    "navn": "FCF<sub>3</sub>",
    "verdi": 25.02,
    "enhet": "NOK m"
   },
   {
    "navn": "FCF<sub>3.5</sub> (working capital recovered)",
    "verdi": 12.0,
    "enhet": "NOK m"
   }
  ],
  "merknad": "Fellene er arbeidskapitalens nivå i stedet for endringen, leien trukket fra etter skatt, hovedkontorkostnadene tatt med og frigjøringen lagt i år 3."
 },
 "hint1-1:3:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV",
    "verdi": 7.9416480781261924,
    "enhet": "NOK m"
   }
  ],
  "merknad": "Fellene: PV uten investeringen, frigjøringen i år 3 eller år 4, sunk cost tatt med, renter trukket fra, leien etter skatt, kannibalisering eller leie utelatt, nivå i stedet for endring i arbeidskapital, hovedkontorkostnader tatt med. 1.08^3 × 1.04 for halvåret gir 7.9349 og ligger innenfor toleransen; det er en liten metodefeil, ikke en felle."
 },
 "hint1-1:3:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "NPV (cider)",
    "verdi": 1.2222222222222214,
    "enhet": "NOK m"
   },
   {
    "navn": "IRR (cider)",
    "verdi": 30.000000000000004,
    "enhet": "%"
   },
   {
    "navn": "NPV of the beer line at 30%",
    "verdi": -14.847293476702617,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Which launch should Kvernhus choose, and why do the two rules disagree?"
 },
 "hint1-1:4:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>U</sub> (Voltvei)",
    "verdi": 9.879999999999999,
    "enhet": "%"
   },
   {
    "navn": "r<sub>U</sub> (Ladeport)",
    "verdi": 10.000000000000002,
    "enhet": "%"
   },
   {
    "navn": "r<sub>U</sub> (park, average)",
    "verdi": 9.94,
    "enhet": "%"
   }
  ]
 },
 "hint1-1:4:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>E</sub>",
    "verdi": 13.900000000000002,
    "enhet": "%"
   },
   {
    "navn": "r<sub>wacc</sub>",
    "verdi": 9.588000000000001,
    "enhet": "%"
   }
  ]
 },
 "hint1-1:4:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>L</sup><sub>0</sub> (WACC)",
    "verdi": 313.85366867011,
    "enhet": "NOK m",
    "tol": 0.0024
   },
   {
    "navn": "NPV",
    "verdi": 13.853668670109982,
    "enhet": "NOK m"
   },
   {
    "navn": "D<sub>0</sub>",
    "verdi": 125.541467468044,
    "enhet": "NOK m"
   },
   {
    "navn": "D<sub>1</sub>",
    "verdi": 87.57838336888005,
    "enhet": "NOK m"
   },
   {
    "navn": "D<sub>2</sub>",
    "verdi": 41.975398766288286,
    "enhet": "NOK m"
   }
  ],
  "merknad": "Fellene: verdien med r_U, med Skarets egne 8,1 % og med r_E; PV i stedet for NPV; D/E brukt som andel av verdien; årets kontantstrøm tatt med i V_t."
 },
 "hint1-1:4:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>U</sup>",
    "verdi": 311.93318178865013,
    "enhet": "NOK m",
    "tol": 0.0025
   },
   {
    "navn": "PV(TS)",
    "verdi": 1.9204868814599032,
    "enhet": "NOK m",
    "tol": 0.003
   },
   {
    "navn": "V<sup>L</sup> (APV)",
    "verdi": 313.85366867011004,
    "enhet": "NOK m",
    "tol": 0.00023
   }
  ],
  "merknad": "PV(TS) har tol 0,003 fordi skjoldet diskontert med r_wacc gir 1.9305 (0.52% unna), en metode kriteriene avviser."
 },
 "hint1-1:4:e": {
  "type": "tekst"
 },
 "hint2-1:1:": {
  "type": "tekst"
 },
 "hint2-1:2:": {
  "type": "tekst"
 },
 "hint2-1:3:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Issue price",
    "verdi": 45.0,
    "enhet": "$ per share"
   },
   {
    "navn": "Expected first-day return",
    "verdi": 0.0,
    "enhet": "%",
    "abs": 0.05
   }
  ]
 },
 "hint2-1:3:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Expected profit per IPO",
    "verdi": -360.0,
    "enhet": "$"
   },
   {
    "navn": "Average return per share received",
    "verdi": -14.285714285714285,
    "enhet": "%"
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Will you take part?"
 },
 "hint2-1:3:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Highest issue price",
    "verdi": 38.57142857142857,
    "enhet": "$ per share"
   }
  ]
 },
 "hint2-1:3:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "Average first-day return",
    "verdi": 16.66666666666667,
    "enhet": "%"
   },
   {
    "navn": "Informed investors' return",
    "verdi": 55.55555555555556,
    "enhet": "%"
   },
   {
    "navn": "Your return",
    "verdi": 0.0,
    "enhet": "%",
    "abs": 0.05
   }
  ]
 },
 "hint2-1:3:e": {
  "type": "tekst"
 },
 "hint2-1:4:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Debt",
    "verdi": 95.0,
    "enhet": "€ m"
   },
   {
    "navn": "Equity",
    "verdi": 50.0,
    "enhet": "€ m"
   }
  ]
 },
 "hint2-1:4:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV",
    "verdi": 12.0,
    "enhet": "€ m"
   }
  ]
 },
 "hint2-1:4:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "New investors' fraction x",
    "verdi": 40.0,
    "enhet": "%"
   },
   {
    "navn": "Ingrid's payoff",
    "verdi": 42.0,
    "enhet": "€ m"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Will Ingrid install the system? Would the creditors like it installed?"
 },
 "hint2-1:4:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Creditors' gain",
    "verdi": 20.0,
    "enhet": "€ m"
   },
   {
    "navn": "Ingrid's gain",
    "verdi": -8.0,
    "enhet": "€ m"
   },
   {
    "navn": "New shareholders' gain",
    "verdi": 0.0,
    "enhet": "€ m",
    "abs": 0.01
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Explain briefly what this means for the firm."
 },
 "hint2-1:4:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Lowest face value",
    "verdi": 95.0,
    "enhet": "€ m"
   },
   {
    "navn": "Highest face value",
    "verdi": 107.0,
    "enhet": "€ m"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Why may the creditors agree to write down their claim?"
 },
 "hint2-2:1:": {
  "type": "tekst"
 },
 "hint2-2:2:": {
  "type": "tekst"
 },
 "hint2-2:3:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Interest, year 1",
    "verdi": 63.050000000000004,
    "enhet": "NOK m"
   },
   {
    "navn": "Interest, year 2",
    "verdi": 43.05000000000001,
    "enhet": "NOK m"
   },
   {
    "navn": "Interest, year 3",
    "verdi": 22.050000000000026,
    "enhet": "NOK m"
   },
   {
    "navn": "PV(TS)",
    "verdi": 25.991428571428578,
    "enhet": "NOK m"
   }
  ]
 },
 "hint2-2:3:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Share price after the announcement",
    "verdi": 36.20793142857143,
    "enhet": "NOK per share"
   }
  ]
 },
 "hint2-2:3:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Shares repurchased",
    "verdi": 34.826623622164554,
    "enhet": "m shares"
   },
   {
    "navn": "Shares remaining",
    "verdi": 90.17337637783544,
    "enhet": "m shares"
   },
   {
    "navn": "Equity after the repurchase",
    "verdi": 3264.9914285714285,
    "enhet": "NOK m"
   }
  ]
 },
 "hint2-2:3:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Seller's payoff per share",
    "verdi": 36.20793142857143,
    "enhet": "NOK per share"
   },
   {
    "navn": "Value per share for the one who stays",
    "verdi": 36.20793142857143,
    "enhet": "NOK per share"
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Who is better off? Explain briefly."
 },
 "hint2-2:3:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Wealth with the repurchase",
    "verdi": 360000.0,
    "enhet": "NOK"
   },
   {
    "navn": "Wealth with the dividend",
    "verdi": 360000.0,
    "enhet": "NOK"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Does the choice between a repurchase and a dividend matter for her?"
 },
 "hint2-2:4:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Debt",
    "verdi": 50.0,
    "enhet": "$ m"
   },
   {
    "navn": "Equity",
    "verdi": 4.0,
    "enhet": "$ m"
   },
   {
    "navn": "Expected fire-sale loss",
    "verdi": 12.0,
    "enhet": "$ m"
   }
  ]
 },
 "hint2-2:4:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Change in expected asset value",
    "verdi": -2.0,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Would the firm switch if it had no debt?"
 },
 "hint2-2:4:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Debt",
    "verdi": 37.6,
    "enhet": "$ m"
   },
   {
    "navn": "Equity",
    "verdi": 12.0,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Will the manager switch?"
 },
 "hint2-2:4:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Wealth transfer, size",
    "verdi": 8.0,
    "enhet": "$ m",
    "alt": [
     -8.0
    ]
   },
   {
    "navn": "Efficiency loss, size",
    "verdi": 4.399999999999999,
    "enhet": "$ m",
    "alt": [
     -4.399999999999999
    ]
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Where does the efficiency loss come from?",
  "merknad": "alt med negativt fortegn: begge delene er tap for kreditorene, så −8 og −4,4 godtas."
 },
 "hint2-2:4:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Price the lender pays",
    "verdi": 37.6,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Who bears the expected cost of the fire sales and of the aggressive strategy?"
 },
 "hint2-2:4:f": {
  "type": "tekst"
 },
 "hint2-3:1:": {
  "type": "tekst"
 },
 "hint2-3:2:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "P<sub>0</sub>",
    "verdi": 40.0,
    "enhet": "NOK per share"
   }
  ]
 },
 "hint2-3:2:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "New shares",
    "verdi": 0.5538461538461539,
    "enhet": "m shares"
   },
   {
    "navn": "Share price",
    "verdi": 32.5,
    "enhet": "NOK per share"
   }
  ]
 },
 "hint2-3:2:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "New shares (sponsor)",
    "verdi": 0.288,
    "enhet": "m shares"
   },
   {
    "navn": "Share price (sponsor)",
    "verdi": 62.5,
    "enhet": "NOK per share"
   },
   {
    "navn": "Share price (no sponsorship)",
    "verdi": 20.0,
    "enhet": "NOK per share"
   }
  ]
 },
 "hint2-3:2:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Threshold cost of the sponsorship",
    "verdi": 120.0,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Will a bad type sponsor, and is the belief in (c) rational? Would a good type still sponsor at the threshold cost?"
 },
 "hint2-3:2:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Highest fee",
    "verdi": 72.0,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Would a bad type buy the certificate? What does the market conclude about a firm without one?"
 },
 "hint2-3:3:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "E[X]",
    "verdi": 3.5200000000000005,
    "enhet": "NOK m"
   },
   {
    "navn": "Investors' fraction",
    "verdi": 62.5,
    "enhet": "%"
   },
   {
    "navn": "Ragnhild's expected cash flow, equity",
    "verdi": 1.3200000000000003,
    "enhet": "NOK m"
   },
   {
    "navn": "Ragnhild's expected cash flow, bank loan",
    "verdi": 1.4400000000000004,
    "enhet": "NOK m"
   }
  ]
 },
 "hint2-3:3:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Value of Ragnhild's stake (bank loan)",
    "verdi": 1.2000000000000002,
    "enhet": "NOK m"
   }
  ]
 },
 "hint2-3:3:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Risk-free asset",
    "verdi": 0.75,
    "enhet": "NOK m"
   },
   {
    "navn": "Market portfolio",
    "verdi": 0.45000000000000007,
    "enhet": "NOK m"
   },
   {
    "navn": "Value of Ragnhild's stake (equity)",
    "verdi": 1.2000000000000002,
    "enhet": "NOK m"
   }
  ]
 },
 "hint2-3:3:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Value of the investors' stake",
    "verdi": 2.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Firm value",
    "verdi": 3.2,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Who gets the NPV of the business?"
 },
 "hint2-3:3:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "α (indifference)",
    "verdi": 0.42857142857142855,
    "enhet": ""
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Which does Ragnhild prefer if a boom is more likely, and why does this not contradict (c)?",
  "merknad": "Fellen er å sammenligne forventede kontantstrømmer eller diskontere dem med r_f (gir 0.3714)."
 },
 "hint3-1:3:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Offer per B share",
    "verdi": 76.0,
    "enhet": "NOK"
   },
   {
    "navn": "Premium over the pre-rumour price",
    "verdi": 31.034482758620683,
    "enhet": "%",
    "alt": [
     18.0
    ]
   },
   {
    "navn": "Spread",
    "verdi": 4.799999999999997,
    "enhet": "NOK",
    "alt": [
     6.741573033707861
    ]
   }
  ],
  "merknad": "Spørsmålet oppgir enhetene (premie i prosent, spread i NOK). alt godtar også premien i NOK (18,00) og spreaden i prosent av dagens kurs (6,74)."
 },
 "hint3-1:3:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Value if the deal goes through",
    "verdi": 78.55083574873998,
    "enhet": "NOK",
    "alt": [
     4.961105415709891
    ]
   },
   {
    "navn": "Value if the deal fails",
    "verdi": 64.55083574873998,
    "enhet": "NOK",
    "alt": [
     -9.038894584290105
    ]
   }
  ],
  "merknad": "alt er Kurbatovs selvfinansierte variant (kjøp B med shortinntekten, sett resten i banken), som er godtatt i kriteriene."
 },
 "hint3-1:3:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Probability of completion",
    "verdi": 0.6456353274492942,
    "enhet": "",
    "tol": 0.004
   }
  ],
  "merknad": "Stram toleranse (0,4 %) så helårsfaktoren 1,045 (0.6417) avvises. Enkel rente (0.6456) havner innenfor og godtas som tilnærming. 71,20 i stedet for sikkerhetsekvivalenten gir 0.4749."
 },
 "hint3-1:3:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Probability of completion with B at 62 on failure",
    "verdi": 0.5038894584290119,
    "enhet": "",
    "tol": 0.004
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Why might B's price not fall all the way back? Explain the direction of the change.",
  "merknad": "Fellen (71,20 i stedet for sikkerhetsekvivalenten) gir 0.2649."
 },
 "hint3-1:3:e": {
  "type": "tekst"
 },
 "hint3-1:4:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Promised yield to maturity",
    "verdi": 10.53719008264462,
    "enhet": "%"
   },
   {
    "navn": "Value if risk-free",
    "verdi": 102.88461538461539,
    "enhet": "NOK"
   }
  ],
  "merknad": "Uten kupongen blir yielden 3.31 %; det avvises."
 },
 "hint3-1:4:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Expected return",
    "verdi": 6.6942148760330555,
    "enhet": "%"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Compare it with the promised yield and the risk-free rate. Explain briefly."
 },
 "hint3-1:4:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Risk-neutral default probability ρ",
    "verdi": 0.1020645161290323,
    "enhet": ""
   },
   {
    "navn": "Price of one CDS contract",
    "verdi": 0.09813895781637721,
    "enhet": "NOK"
   }
  ],
  "merknad": "Overlevelsessannsynligheten (0.8979) og CDS-prisen med den (0.8634) er fellen og avvises. Analytikernes 6 % gir 0.0577."
 },
 "hint3-1:4:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "CDS contracts per bond",
    "verdi": 62.0,
    "enhet": ""
   },
   {
    "navn": "Cost of the contracts",
    "verdi": 6.084615384615387,
    "enhet": "NOK"
   },
   {
    "navn": "Bond plus contracts",
    "verdi": 102.88461538461539,
    "enhet": "NOK"
   }
  ],
  "merknad": "55 kontrakter (pålydende minus gjenvinning) er fellen; da blir posisjonen 102.1976."
 },
 "hint3-1:4:e": {
  "type": "tekst"
 },
 "hint3-1:1:": {
  "type": "tekst"
 },
 "hint3-1:2:": {
  "type": "tekst"
 },
 "hint3-2:1:": {
  "type": "tekst"
 },
 "hint3-2:2:": {
  "type": "tekst"
 },
 "hint3-2:3:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV of buying today",
    "verdi": 14.5,
    "enhet": "NOK m"
   }
  ],
  "merknad": "Uten inntekten i t = 0 blir NPV 12.0000; det avvises."
 },
 "hint3-2:3:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV at t = 1, hospital",
    "verdi": 27.200000000000003,
    "enhet": "NOK m"
   },
   {
    "navn": "NPV at t = 1, no hospital",
    "verdi": -4.299999999999997,
    "enhet": "NOK m"
   },
   {
    "navn": "NPV of waiting (t = 0)",
    "verdi": 15.542857142857143,
    "enhet": "NOK m"
   }
  ],
  "merknad": "Med den negative grenen beholdt blir NPV av å vente 13.9048; det avvises."
 },
 "hint3-2:3:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Value of the option to wait",
    "verdi": 1.0428571428571427,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 1.5,
  "tekstLedd": "Should Kjelsnes buy today or wait?"
 },
 "hint3-2:3:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "X (indifference)",
    "verdi": 0.854651162790697,
    "enhet": ""
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Write the NPV of buying today and the NPV of waiting as functions of X.",
  "merknad": "Kurbatovs hurtigregel (NPV nå holdt fast på 14.5) gir 0.5597 og avvises; begge NPV-ene avhenger av X. Uten inntekten i t = 0 blir X 1.4651."
 },
 "hint3-2:3:e": {
  "type": "tekst"
 },
 "hint3-2:4:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Strike per share",
    "verdi": 150.0,
    "enhet": "NOK"
   },
   {
    "navn": "Equity",
    "verdi": 32.367599999999996,
    "enhet": "NOK bn",
    "alt": [
     32367.599999999995
    ]
   },
   {
    "navn": "Debt",
    "verdi": 45.032399999999996,
    "enhet": "NOK bn",
    "alt": [
     45032.399999999994
    ]
   }
  ],
  "merknad": "Strike 150 står i kurstabellen i oppgaveteksten; det er meningen, studenten skal finne raden. alt er de samme verdiene i NOK millioner."
 },
 "hint3-2:4:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Annual yield",
    "verdi": 8.405855400053452,
    "enhet": "%"
   },
   {
    "navn": "Spread over r<sub>f</sub>",
    "verdi": 4.905855400053452,
    "enhet": "%"
   }
  ],
  "merknad": "Ikke annualisert (19.91 %) og lineært (8.85 %) avvises."
 },
 "hint3-2:4:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Senior debt",
    "verdi": 32.248799999999996,
    "enhet": "NOK bn",
    "alt": [
     32248.799999999996
    ]
   },
   {
    "navn": "Junior debt",
    "verdi": 12.7836,
    "enhet": "NOK bn",
    "alt": [
     12783.6
    ]
   },
   {
    "navn": "Equity",
    "verdi": 32.367599999999996,
    "enhet": "NOK bn",
    "alt": [
     32367.599999999995
    ]
   }
  ],
  "merknad": "Junior priset med call 50 gir 16.625; det avvises."
 },
 "hint3-2:4:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Senior yield",
    "verdi": 5.012145040963123,
    "enhet": "%"
   },
   {
    "navn": "Junior yield",
    "verdi": 16.426820228155936,
    "enhet": "%"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Explain briefly how they compare with the yield in (b)."
 },
 "hint3-2:4:e": {
  "type": "tekst"
 },
 "hint3-3:1:": {
  "type": "tekst"
 },
 "hint3-3:2:a": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Monthly rate",
    "verdi": 0.40741237836483535,
    "enhet": "%"
   },
   {
    "navn": "NPV if committed forever",
    "verdi": -2290903.101183885,
    "enhet": "NOK",
    "tol": 0.002
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Will you open it?",
  "merknad": "Stram toleranse på NPV (0,2 %) så 5 %/12 (-2280000) avvises; den fanges også av månedsrenten."
 },
 "hint3-3:2:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV, good state",
    "verdi": 4336288.764798562,
    "enhet": "NOK"
   },
   {
    "navn": "NPV, bad state",
    "verdi": -2146436.9903530013,
    "enhet": "NOK"
   },
   {
    "navn": "Expected NPV with the clause",
    "verdi": 446653.311707624,
    "enhet": "NOK"
   }
  ]
 },
 "hint3-3:2:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Value of the clause",
    "verdi": 446653.311707624,
    "enhet": "NOK"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Briefly explain.",
  "merknad": "Verdien er målt mot 0. 2737556 (mot den negative NPV-en) er fellen og avvises."
 },
 "hint3-3:2:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Highest termination fee",
    "verdi": 800946.0365411458,
    "enhet": "NOK"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "With that fee, would you still close in the bad state?",
  "merknad": "Gebyr i begge tilstander gir 480568, uten diskontering 744422; begge avvises."
 },
 "hint3-3:2:e": {
  "type": "tekst"
 },
 "hint3-3:3:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Maximum bid, A",
    "verdi": 175,
    "enhet": "NOK m"
   },
   {
    "navn": "Maximum bid, B",
    "verdi": 170,
    "enhet": "NOK m"
   },
   {
    "navn": "Maximum bid, C",
    "verdi": 180,
    "enhet": "NOK m"
   }
  ],
  "merknad": "Mot frittstående verdi blir svarene 170, 160 og 150; de avvises (A: 170 mot 175 er 2,9 % unna)."
 },
 "hint3-3:3:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Price paid for D",
    "verdi": 175,
    "enhet": "NOK m"
   },
   {
    "navn": "Gain to D's shareholders",
    "verdi": 55,
    "enhet": "NOK m"
   },
   {
    "navn": "Gain or loss to the winner's shareholders",
    "verdi": -25,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Who buys D? Briefly comment."
 },
 "hint3-3:3:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Gjesvær debt",
    "verdi": 51.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Gjesvær equity",
    "verdi": 45.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Vangen debt",
    "verdi": 31.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Vangen equity",
    "verdi": 20.0,
    "enhet": "NOK m"
   }
  ]
 },
 "hint3-3:3:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "Merged debt",
    "verdi": 105.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Merged equity",
    "verdi": 42.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Change for Gjesvær's shareholders",
    "verdi": -15.923076923076923,
    "enhet": "NOK m"
   },
   {
    "navn": "Change for Vangen's shareholders",
    "verdi": -7.076923076923077,
    "enhet": "NOK m"
   },
   {
    "navn": "Total gain to the creditors",
    "verdi": 23.0,
    "enhet": "NOK m"
   }
  ]
 },
 "hint3-3:3:e": {
  "type": "tekst"
 },
 "mk-cds-1:1:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Price of bond 1",
    "verdi": 96.15384615384615,
    "enhet": "$"
   },
   {
    "navn": "Price of bond 2",
    "verdi": 92.16589861751153,
    "enhet": "$"
   }
  ]
 },
 "mk-cds-1:1:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Expected return on bond 2",
    "verdi": 5.841749999999979,
    "enhet": "%"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Why does it differ from the promised yield?"
 },
 "mk-cds-1:1:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Risk-neutral default probability ρ",
    "verdi": 0.11849901250822857,
    "enhet": ""
   }
  ],
  "merknad": "Overlevelsessannsynligheten 0.8815 er fellen og avvises."
 },
 "mk-cds-1:1:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "Price of one CDS contract",
    "verdi": 0.11394135818098901,
    "enhet": "$",
    "alt": [
     0.09615384615384616
    ]
   }
  ],
  "merknad": "alt er svaret med reserveverdien ρ = 0,10. Fellene 0.8476 (overlevelse), 0.0673 (reell p) og 0.1185 (udiskontert) avvises."
 },
 "mk-cds-1:1:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Number of CDS contracts",
    "verdi": 35.0,
    "enhet": ""
   },
   {
    "navn": "Cost of the contracts",
    "verdi": 3.987947536334615,
    "enhet": "$",
    "alt": [
     3.3653846153846154
    ]
   },
   {
    "navn": "Bond plus contracts",
    "verdi": 96.15384615384615,
    "enhet": "$"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Compare with the price of bond 1.",
  "merknad": "100 kontrakter er fellen; da blir posisjonen 103.5600. alt for kostnaden er svaret med CDS-prisen fra reserveverdien i (d) (3.3654); posisjonen med den (95.5313) ligger innenfor toleransen."
 },
 "mk-cds-1:1:f": {
  "type": "tekst"
 },
 "mk-cds-2:1:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Price of a government bond",
    "verdi": 975.6097560975611,
    "enhet": "NOK"
   },
   {
    "navn": "Price of an Oksfjord bond",
    "verdi": 925.9259259259259,
    "enhet": "NOK"
   },
   {
    "navn": "Expected return on an Oksfjord bond",
    "verdi": 6.056000000000017,
    "enhet": "%"
   }
  ],
  "merknad": "Gjenvinning 330 per obligasjon gir 5.11%; det avvises."
 },
 "mk-cds-2:1:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Risk-neutral default probability ρ",
    "verdi": 0.11316872427983576,
    "enhet": ""
   },
   {
    "navn": "Price of one CDS contract",
    "verdi": 0.1104085114925227,
    "enhet": "NOK"
   }
  ],
  "merknad": "Overlevelse 0.8868 og CDS 0.8652 med den avvises, det samme gjør reell p (0.0390)."
 },
 "mk-cds-2:1:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Value of the put",
    "verdi": 29.81029810298113,
    "enhet": "NOK m",
    "alt": [
     24.3
    ]
   },
   {
    "navn": "Risk-free issue minus Oksfjord's issue",
    "verdi": 29.81029810298105,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Compare the put with the difference between the two issue values.",
  "merknad": "alt for putten er svaret med reserveverdien 0,09 (24.30). Per obligasjon er putten 49.6838; den teller bare skalert til hele utstedelsen."
 },
 "mk-cds-2:1:d": {
  "type": "tekst"
 },
 "mk-cds-3:1:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Price of a government bond",
    "verdi": 95.66303671497991,
    "enhet": "€",
    "tol": 0.0002
   },
   {
    "navn": "Price of a Vellmar bond",
    "verdi": 89.71959482240227,
    "enhet": "€",
    "tol": 0.001
   }
  ],
  "merknad": "Stram toleranse (0,02 % og 0,1 %) så enkel rente (95.6938 og 89.8876) avvises."
 },
 "mk-cds-3:1:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Number of CDS contracts",
    "verdi": 12.0,
    "enhet": "m contracts"
   },
   {
    "navn": "Value of bonds plus contracts",
    "verdi": 28.698911014493973,
    "enhet": "€ m",
    "tol": 0.0002
   },
   {
    "navn": "Total cost of the contracts",
    "verdi": 1.7830325677732937,
    "enhet": "€ m",
    "tol": 0.003
   }
  ],
  "merknad": "Stram toleranse så enkel rente avvises: sikret verdi 28.7081, kostnad 1.7923 (bare r_f) eller 1.7418 (overalt). 30 millioner kontrakter er fellen."
 },
 "mk-cds-3:1:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Price of one CDS contract",
    "verdi": 0.14858604731444114,
    "enhet": "€",
    "tol": 0.002,
    "alt": [
     0.125
    ]
   },
   {
    "navn": "Risk-neutral default probability ρ",
    "verdi": 0.1553223192748323,
    "enhet": "",
    "tol": 0.002,
    "alt": [
     0.13066697890056234
    ]
   }
  ],
  "merknad": "alt er svarene med reserveverdien €1.5 millioner. Toleranse 0,2 % så enkel rente avvises: på r_f alene CDS 0.1494 og ρ 0.1561, overalt 0.1452 og 0.1517. Ett år gir ρ = 0.1897."
 },
 "mk-cds-3:1:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Expected annual return",
    "verdi": 5.917494959568592,
    "enhet": "%",
    "tol": 0.005
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Compare it with the promised yield and with the risk-free rate.",
  "merknad": "Toleranse 0,5 % så avkastningen over 1,5 år delt på 1,5 (6.0042%) avvises."
 },
 "mk-cds-3:1:e": {
  "type": "tekst"
 },
 "mk-deal-1:1:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Offer value per T share",
    "verdi": 106.2,
    "enhet": "€ per share"
   },
   {
    "navn": "Premium over T's price before the rumours",
    "verdi": 26.428571428571423,
    "enhet": "%"
   },
   {
    "navn": "Fraction owned by T's shareholders",
    "verdi": 42.857142857142854,
    "enhet": "%"
   }
  ]
 },
 "mk-deal-1:1:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Change in A's market value",
    "verdi": 1440.0000000000014,
    "enhet": "€ m"
   },
   {
    "navn": "Change in T's market value",
    "verdi": 2580.0000000000005,
    "enhet": "€ m"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "What do the changes suggest about the deal's total gains and who captures them?"
 },
 "mk-deal-1:1:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Value if the deal goes through",
    "verdi": 107.2464317755005,
    "enhet": "€",
    "tol": 0.005
   },
   {
    "navn": "Value if the deal fails",
    "verdi": 92.2464317755005,
    "enhet": "€",
    "tol": 0.005
   }
  ],
  "merknad": "Helt år (1.04) gir 110.4480 og 95.4480, utenfor 0,5 %. Enkel rente havner innenfor og godtas som tilnærming."
 },
 "mk-deal-1:1:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "Probability of completion",
    "verdi": 66.33821978170099,
    "enhet": "%",
    "tol": 0.002,
    "alt": [
     61.31443161837098,
     65.33333333333331
    ]
   }
  ],
  "merknad": "Toleranse 0,2 %: ingen rente (0.6667) og 101.20 i stedet for sikkerhetsekvivalenten (0.5969) avvises; enkel rente (0.6633) godtas. alt: reserveverdiene i oppgaveteksten gir 0.6131 og helt år i både (c) og (d) gir 0.6533 (følgefeil, straffet i (c))."
 },
 "mk-deal-1:1:e": {
  "type": "tekst"
 },
 "mk-deal-2:1:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Offer value per B share",
    "verdi": 27.400000000000002,
    "enhet": "$ per share"
   },
   {
    "navn": "Premium over B's price before the announcement",
    "verdi": 9.600000000000009,
    "enhet": "%"
   }
  ]
 },
 "mk-deal-2:1:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Probability of completion",
    "verdi": 75.36842105263155,
    "enhet": "%",
    "tol": 0.005
   }
  ],
  "merknad": "Stram toleranse (0,5 %): 132.50 i stedet for sikkerhetsekvivalenten gir 0.4747 og ingen rente i det hele tatt gir 0.7632; begge avvises."
 },
 "mk-deal-2:1:c": {
  "type": "tekst"
 },
 "mk-deal-2:1:d": {
  "type": "tekst"
 },
 "mk-deal-3:1:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Offer value per T share",
    "verdi": 36.5,
    "enhet": "£ per share"
   },
   {
    "navn": "Spread in £",
    "verdi": 1.3999999999999986,
    "enhet": "£"
   },
   {
    "navn": "Spread in percent of T's price",
    "verdi": 3.9886039886039844,
    "enhet": "%"
   }
  ]
 },
 "mk-deal-3:1:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Amount invested at the risk-free rate",
    "verdi": 1.3999999999999986,
    "enhet": "£"
   },
   {
    "navn": "Value if the deal goes through",
    "verdi": 1.4311533810182597,
    "enhet": "£",
    "tol": 0.005
   },
   {
    "navn": "Value if the deal fails (negative if a loss)",
    "verdi": -3.0688466189817403,
    "enhet": "£",
    "tol": 0.005
   }
  ],
  "merknad": "Helt år (1.045) gir 1.4630 og −3.0370; uten rente 1.4000 og −3.1000. Alle avvises med 0,5 %. Enkel rente godtas. Feltnavnet sier at et tap føres med minus."
 },
 "mk-deal-3:1:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Probability of completion",
    "verdi": 68.19659153292757,
    "enhet": "%",
    "tol": 0.005,
    "alt": [
     66.66666666666666,
     67.48888888888892
    ]
   }
  ],
  "merknad": "Toleranse 0,5 %: ingen rente (0.6889) avvises, enkel rente (0.6819) godtas. alt: reserveverdiene gir 0.6667, helt år fra (b) gir 0.6749 (følgefeil, straffet i (b))."
 },
 "mk-deal-3:1:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Probability of completion, colleague's position",
    "verdi": 68.1965915329275,
    "enhet": "%",
    "tol": 0.005,
    "alt": [
     67.48888888888892
    ]
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Compare with (c) in one sentence.",
  "merknad": "alt 0.6749: samme faktorfeil (1.045) som i (b), straffet bare der."
 },
 "mk-deal-3:1:e": {
  "type": "tekst"
 },
 "mk-gjeldsoverheng-1:1:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Bank loan",
    "verdi": 140.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Equity",
    "verdi": 60.0,
    "enhet": "NOK m"
   }
  ],
  "merknad": "Pålydende 170 for lånet er fellen; da blir egenkapitalen 30."
 },
 "mk-gjeldsoverheng-1:1:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV",
    "verdi": 14.0,
    "enhet": "NOK m"
   }
  ]
 },
 "mk-gjeldsoverheng-1:1:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Fraction to new investors x",
    "verdi": 47.72727272727273,
    "enhet": "%"
   },
   {
    "navn": "Sigurd's payoff",
    "verdi": 46.0,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Will Sigurd do it? Would the bank like the line to be installed?",
  "merknad": "Fellene: 42/176 = 23.86% (bare høy tilstand) og 48.84% (pålydende trukket fra forventet verdi) faller utenfor toleransen."
 },
 "mk-gjeldsoverheng-1:1:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Change for the bank",
    "verdi": 6.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Change for Sigurd",
    "verdi": 8.0,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Will the bank accept? Will Sigurd go ahead?",
  "merknad": "Bankens målestokk er 140 fra (a), ikke 170 eller 168."
 },
 "mk-gjeldsoverheng-1:1:e": {
  "type": "tekst"
 },
 "mk-gjeldsoverheng-2:1:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Bonds",
    "verdi": 102.5,
    "enhet": "$ m"
   },
   {
    "navn": "Equity",
    "verdi": 52.5,
    "enhet": "$ m"
   }
  ]
 },
 "mk-gjeldsoverheng-2:1:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "NPV",
    "verdi": 9.0,
    "enhet": "$ m"
   },
   {
    "navn": "Fraction to new shareholders x",
    "verdi": 43.47826086956522,
    "enhet": "%"
   },
   {
    "navn": "Value of the existing shareholders' shares",
    "verdi": 39.0,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Will the manager install the system?"
 },
 "mk-gjeldsoverheng-2:1:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Change for bondholders",
    "verdi": 22.5,
    "enhet": "$ m"
   },
   {
    "navn": "Change for existing shareholders",
    "verdi": -13.5,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Would the bondholders like the system to be installed? Explain briefly."
 },
 "mk-gjeldsoverheng-2:1:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "F (if it exists)",
    "verdi": 98.0,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "For which face values will the manager install the system?",
  "merknad": "Fellen L + NPV = 89 (glemt 1/(1 − p)) avvises."
 },
 "mk-gjeldsoverheng-2:1:e": {
  "type": "tekst"
 },
 "mk-gjeldsoverheng-3:1:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Bank loan",
    "verdi": 131.42857142857142,
    "enhet": "€ m"
   },
   {
    "navn": "Altmark's equity",
    "verdi": 45.714285714285715,
    "enhet": "€ m"
   }
  ],
  "merknad": "50/50 gir 138.0952 og udiskontert 138 for lånet; begge avvises."
 },
 "mk-gjeldsoverheng-3:1:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "NPV",
    "verdi": 20.0,
    "enhet": "€ m"
   },
   {
    "navn": "Change for Altmark",
    "verdi": -16.000000000000007,
    "enhet": "€ m"
   },
   {
    "navn": "Change for the bank",
    "verdi": 36.00000000000003,
    "enhet": "€ m"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Will Altmark install the panels?"
 },
 "mk-gjeldsoverheng-3:1:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Probability threshold p",
    "verdi": 66.66666666666666,
    "enhet": "%"
   }
  ],
  "merknad": "Svaret er p ≥ 2/3. Udiskontert gir 63.49%; det avvises."
 },
 "mk-gjeldsoverheng-3:1:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Face value of the new senior loan",
    "verdi": 42.0,
    "enhet": "€ m"
   },
   {
    "navn": "Bank loan",
    "verdi": 143.42857142857142,
    "enhet": "€ m"
   },
   {
    "navn": "Altmark's equity",
    "verdi": 53.714285714285715,
    "enhet": "€ m"
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Will Altmark install the panels? Is the bank better or worse off than in (a)?",
  "merknad": "Pålydende 40 (glemt renten) avvises."
 },
 "mk-gjeldsoverheng-3:1:e": {
  "type": "tekst"
 },
 "mk-governance-1:1:a": {
  "type": "tekst"
 },
 "mk-governance-1:1:b": {
  "type": "tekst"
 },
 "mk-governance-2:1:": {
  "type": "tekst"
 },
 "mk-governance-3:1:a": {
  "type": "tekst"
 },
 "mk-governance-3:1:b": {
  "type": "tekst"
 },
 "mk-governance-3:1:c": {
  "type": "tekst"
 },
 "mk-mm-rekap-1:1:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "V",
    "verdi": 450.0,
    "enhet": "€ m"
   },
   {
    "navn": "P<sub>0</sub>",
    "verdi": 36.0,
    "enhet": "€ per share"
   },
   {
    "navn": "Div<sub>1</sub>",
    "verdi": 2.52,
    "enhet": "€ per share"
   }
  ]
 },
 "mk-mm-rekap-1:1:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Year 1 dividend per share",
    "verdi": 4.0,
    "enhet": "€ per share"
   },
   {
    "navn": "Price of the new shares",
    "verdi": 34.52,
    "enhet": "€ per share"
   },
   {
    "navn": "New shares",
    "verdi": 0.5359212051,
    "enhet": "m shares"
   },
   {
    "navn": "Dividend from Year 2",
    "verdi": 2.4164,
    "enhet": "€ per share"
   }
  ]
 },
 "mk-mm-rekap-1:1:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "P<sub>0</sub> after the announcement",
    "verdi": 36.0,
    "enhet": "€ per share"
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Are the current shareholders better or worse off than under the old policy? Explain briefly."
 },
 "mk-mm-rekap-1:1:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "Buyback price",
    "verdi": 38.52,
    "enhet": "€ per share"
   },
   {
    "navn": "Shares bought back",
    "verdi": 0.8177570093,
    "enhet": "m shares"
   },
   {
    "navn": "Dividend from Year 2",
    "verdi": 2.6964,
    "enhet": "€ per share"
   }
  ]
 },
 "mk-mm-rekap-1:1:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Old policy, end of Year 1",
    "verdi": 38.52,
    "enhet": "€ per share"
   },
   {
    "navn": "Sells in the buyback",
    "verdi": 38.52,
    "enhet": "€ per share"
   },
   {
    "navn": "Keeps the share",
    "verdi": 38.52,
    "enhet": "€ per share"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Comment.",
  "merknad": "Ingen reserveverdi for (d): enhver annen tilbakekjøpskurs enn 38.52 bryter likheten som kommentaren handler om. Posisjonen under gammel politikk avhenger bare av (a)."
 },
 "mk-mm-rekap-2:1:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>U</sub>",
    "verdi": 9.1,
    "enhet": "%"
   }
  ]
 },
 "mk-mm-rekap-2:1:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "New debt issued",
    "verdi": 675.0,
    "enhet": "$ m"
   },
   {
    "navn": "Dividend per share",
    "verdi": 20.0,
    "enhet": "$ per share"
   },
   {
    "navn": "Share price on announcement",
    "verdi": 70.0,
    "enhet": "$ per share"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Why does the share price react as it does upon announcement?"
 },
 "mk-mm-rekap-2:1:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Share price after the dividend",
    "verdi": 50.0,
    "enhet": "$ per share",
    "alt": [
     52.5
    ]
   }
  ],
  "tallPoeng": 1.5,
  "tekstLedd": "Are the shareholders better or worse off?",
  "merknad": "alt 52.5 er svaret med reserveverdien $630M ny gjeld."
 },
 "mk-mm-rekap-2:1:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "New r<sub>E</sub>",
    "verdi": 11.8,
    "enhet": "%",
    "alt": [
     12.5
    ]
   }
  ],
  "merknad": "alt 12.5 er svaret med reserveverdien r_U = 9.5%. Fellene 13.3 (gammel r_D) og 10.6429 (D/V) avvises."
 },
 "mk-mm-rekap-2:1:e": {
  "type": "tall",
  "tall": [
   {
    "navn": "Share price after the repurchase",
    "verdi": 70.0,
    "enhet": "$ per share"
   },
   {
    "navn": "Shares repurchased",
    "verdi": 5.1428571429,
    "enhet": "m shares",
    "alt": [
     4.5
    ]
   }
  ],
  "merknad": "alt 4.5 er svaret med reserveverdien $630M ny gjeld (kursen er 70 uansett)."
 },
 "mk-mm-rekap-2:1:f": {
  "type": "tekst"
 },
 "mk-mm-rekap-3:1:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>U</sub>",
    "verdi": 9.5,
    "enhet": "%"
   },
   {
    "navn": "r<sub>E</sub>",
    "verdi": 11.5,
    "enhet": "%"
   }
  ]
 },
 "mk-mm-rekap-3:1:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Share price on announcement",
    "verdi": 45.0,
    "enhet": "NOK per share"
   },
   {
    "navn": "New shares",
    "verdi": 13.3333333333,
    "enhet": "m shares"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Explain briefly why the firm value changes or does not change."
 },
 "mk-mm-rekap-3:1:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "New r<sub>E</sub>",
    "verdi": 10.4705882353,
    "enhet": "%",
    "alt": [
     11.0588235294
    ]
   }
  ],
  "merknad": "alt 11.0588 er svaret med reserveverdien r_U = 10%. Fellene 10.0294 (gammel r_D) og 10.3250 (D/V) avvises."
 },
 "mk-mm-rekap-3:1:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "Div<sub>1</sub> without the refinancing",
    "verdi": 5.175,
    "enhet": "NOK per share"
   },
   {
    "navn": "Div<sub>1</sub> with the refinancing",
    "verdi": 4.7117647059,
    "enhet": "NOK per share",
    "alt": [
     4.8545454545
    ]
   },
   {
    "navn": "Share price after the refinancing",
    "verdi": 45.0,
    "enhet": "NOK per share",
    "alt": [
     44.132231405,
     42.8342245989,
     42.6063829787,
     46.3636363636
    ]
   }
  ],
  "merknad": "alt er svarene med reserveverdiene 12 millioner nye aksjer og r_E = 11%: utbyttet 4.8545, kursen 44.13 med begge, 42.83 med bare r_E-reserven og 42.61 med r_E fra reserve-r_U i (c). 46.36 med bare reserveantallet. Fellene 46.98 og 45.63 avvises."
 },
 "mk-mm-rekap-3:1:e": {
  "type": "tekst"
 },
 "mk-vente-1:1:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV of buying today",
    "verdi": 20.9,
    "enhet": "EUR m"
   }
  ],
  "merknad": "Uten salget i t = 0 blir NPV 15.5000; det avvises."
 },
 "mk-vente-1:1:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "NPV at t = 1, high price",
    "verdi": 73.55,
    "enhet": "EUR m"
   },
   {
    "navn": "NPV at t = 1, low price",
    "verdi": -7.450000000000003,
    "enhet": "EUR m"
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Would Lusoliva buy in each state?"
 },
 "mk-vente-1:1:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "NPV of waiting (t = 0)",
    "verdi": 23.83564814814814,
    "enhet": "EUR m",
    "alt": [
     22.685185185185183
    ]
   },
   {
    "navn": "Value of the option to wait",
    "verdi": 2.935648148148143,
    "enhet": "EUR m",
    "alt": [
     1.7851851851851848
    ]
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Should Lusoliva buy today or wait?",
  "merknad": "alt er svarene med reserveverdien 70 fra b). Med den negative lave tilstanden beholdt blir NPV av å vente 19.3519; det avvises."
 },
 "mk-vente-1:1:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "X",
    "verdi": 77.55704697986559,
    "enhet": "%",
    "alt": [
     52.527272727272646
    ]
   }
  ],
  "merknad": "Sannsynlighet i prosent (77.56 %; 0.7756 godtas også). alt 52.53 % er svaret med reserveverdien 70 fra b). NPV nå holdt fast på 20.9000 gir 0.3069 og avvises; begge NPV-ene avhenger av X."
 },
 "mk-vente-1:1:e": {
  "type": "tekst"
 },
 "mk-vente-2:1:a": {
  "type": "blandet",
  "tall": [
   {
    "navn": "NPV of opening now",
    "verdi": 3.9999999999999947,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 1.5,
  "tekstLedd": "Will you open it?"
 },
 "mk-vente-2:1:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "NPV at t = 1, many firms",
    "verdi": 7.33333333333333,
    "enhet": "NOK m"
   },
   {
    "navn": "NPV at t = 1, few firms",
    "verdi": 0.6666666666666652,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "In which states would you open?"
 },
 "mk-vente-2:1:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "NPV of waiting (t = 0)",
    "verdi": 3.773584905660375,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Do you open now or wait? Compare with (a) and explain briefly."
 },
 "mk-vente-2:1:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "X (indifference)",
    "verdi": 0.2687999999999997,
    "enhet": "NOK m",
    "alt": [
     268799.9999999997
    ]
   }
  ],
  "merknad": "X kan oppgis i NOK mill. (0.2688) eller i NOK (268,800). Uten diskontering fra t = 1 blir X 0.24; det avvises."
 },
 "mk-vente-2:1:e": {
  "type": "tekst"
 },
 "mk-vente-3:1:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV of building now",
    "verdi": -2.4387550612950406,
    "enhet": "USD m"
   }
  ]
 },
 "mk-vente-3:1:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV at t = 1, 3.5%",
    "verdi": 3.60260138904669,
    "enhet": "USD m"
   },
   {
    "navn": "NPV at t = 1, 7.5%",
    "verdi": -8.5542313704278,
    "enhet": "USD m"
   },
   {
    "navn": "NPV at t = 0, 3.5%",
    "verdi": 3.3986805557044244,
    "enhet": "USD m"
   },
   {
    "navn": "NPV at t = 0, 7.5%",
    "verdi": -8.070029594743207,
    "enhet": "USD m",
    "tol": 0.005
   }
  ],
  "merknad": "Med 15 betalinger etter å vente blir NPV ved 3,5 % 6.5871; det avvises."
 },
 "mk-vente-3:1:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "ρ (3.5% rate)",
    "verdi": 33.1430980846135,
    "enhet": "%"
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Briefly explain why you do not need the true probabilities.",
  "merknad": "Sannsynlighet i prosent (33.14 %; 0.3314 godtas også). Uten år 1-betalingen i S_u og S_d blir ρ 0.7427; uten (1 + r_f) 0.0918."
 },
 "mk-vente-3:1:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Value of the option to wait",
    "verdi": 1.1264280301598044,
    "enhet": "USD m",
    "alt": [
     1.35947222228177,
     1.2506829465891884,
     1.509433962264151
    ]
   }
  ],
  "tallPoeng": 1.5,
  "tekstLedd": "Do you build now or wait? Briefly comment.",
  "merknad": "alt er svarene med reserveverdiene som oppgaven gir: ρ = 0.40 (1.3595), NPV 4 (1.2507) og begge (1.5094). Målt mot den negative NPV-en blir det 3.5652; det avvises."
 },
 "mk-vente-3:1:e": {
  "type": "tekst"
 },
 "mk-wacc-apv-1:1:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "FCF<sub>0</sub>",
    "verdi": -51.0,
    "enhet": "€ m"
   },
   {
    "navn": "FCF<sub>1</sub>",
    "verdi": 21.75,
    "enhet": "€ m"
   },
   {
    "navn": "FCF<sub>2</sub>",
    "verdi": 35.25,
    "enhet": "€ m"
   },
   {
    "navn": "FCF<sub>3</sub>",
    "verdi": 26.25,
    "enhet": "€ m"
   }
  ]
 },
 "mk-wacc-apv-1:1:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>wacc</sub>",
    "verdi": 8.1,
    "enhet": "%",
    "tol": 0.0058
   }
  ],
  "merknad": "Fellene er brutto gjeld (7.98%) og r_U uten skatt (8.60%)."
 },
 "mk-wacc-apv-1:1:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV (WACC)",
    "verdi": 20.065884648163234,
    "enhet": "€ m",
    "tol": 0.0031,
    "alt": [
     20.86574767001649
    ]
   }
  ],
  "merknad": "Fellene er NPV med r_U (19.4104), med WACC fra brutto gjeld og PV uten investeringen. alt (20.8657) er svaret med reserveverdien r_wacc = 7.5 %."
 },
 "mk-wacc-apv-1:1:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "D<sub>0</sub>",
    "verdi": 28.426353859265294,
    "enhet": "€ m",
    "tol": 0.0036,
    "alt": [
     28.746299068006596
    ]
   },
   {
    "navn": "D<sub>1</sub>",
    "verdi": 22.02888852186578,
    "enhet": "€ m",
    "tol": 0.0025,
    "alt": [
     22.202271498107088
    ]
   },
   {
    "navn": "D<sub>2</sub>",
    "verdi": 9.713228492136912,
    "enhet": "€ m",
    "tol": 0.0018,
    "alt": [
     9.767441860465118
    ]
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Does Orvelle borrow or repay in Years 1 to 3?",
  "merknad": "Toleransen er stram fordi gjeld regnet fra V^U (diskontert med r_U) ligger under 1 % unna. Tekstdelen: Orvelle betaler ned gjeld hvert år. alt er gjelden med reserveverdien r_wacc = 7.5 %."
 },
 "mk-wacc-apv-1:1:e": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>U</sub>",
    "verdi": 8.600000000000001,
    "enhet": "%"
   },
   {
    "navn": "V<sup>U</sup><sub>0</sub>",
    "verdi": 70.410422553775,
    "enhet": "€ m",
    "tol": 0.0037
   },
   {
    "navn": "PV(TS)",
    "verdi": 0.6554620943882123,
    "enhet": "€ m"
   },
   {
    "navn": "NPV (APV)",
    "verdi": 20.06588464816322,
    "enhet": "€ m",
    "tol": 0.001
   }
  ],
  "merknad": "Diskonteres skjoldet med r_D, blir NPV 20.1035, 0.19 % unna, så toleransen på NPV er 0.1 %. PV(TS) med r_D (0.6931 mot 0.6555) avvises med standardtoleransen. PV(TS) diskontert med r_wacc (0.6605) ligger innenfor 1 % og godtas. alt er svarene med reserveverdien r_wacc = 7.5 %."
 },
 "mk-wacc-apv-1:1:f": {
  "type": "tekst"
 },
 "mk-wacc-apv-2:1:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "β<sub>U</sub> Cratewell",
    "verdi": 1.0,
    "enhet": ""
   },
   {
    "navn": "β<sub>U</sub> Mealmont",
    "verdi": 1.2,
    "enhet": ""
   }
  ]
 },
 "mk-wacc-apv-2:1:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>U</sub>",
    "verdi": 10.55,
    "enhet": "%"
   },
   {
    "navn": "r<sub>E</sub>",
    "verdi": 13.583333333333336,
    "enhet": "%"
   }
  ]
 },
 "mk-wacc-apv-2:1:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>wacc</sub>",
    "verdi": 10.046000000000003,
    "enhet": "%",
    "alt": [
     9.496
    ]
   }
  ],
  "merknad": "alt (9.4960%) er svaret med reserveverdien r_U = 10 %."
 },
 "mk-wacc-apv-2:1:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>L</sup> (WACC)",
    "verdi": 344.5534057778955,
    "enhet": "$ m",
    "alt": [
     371.64093767867354
    ]
   }
  ],
  "merknad": "Fellene er V^U (322.9814) og verdien uten vekst. alt er svaret med reserveverdien r_U = 10 %."
 },
 "mk-wacc-apv-2:1:e": {
  "type": "tall",
  "tall": [
   {
    "navn": "D<sub>0</sub>",
    "verdi": 137.8213623111582,
    "enhet": "$ m",
    "alt": [
     148.65637507146943
    ]
   },
   {
    "navn": "D<sub>1</sub>",
    "verdi": 141.26689636893715,
    "enhet": "$ m",
    "tol": 0.0097,
    "alt": [
     152.37278444825614
    ]
   },
   {
    "navn": "PV(TS)",
    "verdi": 21.57203931826823,
    "enhet": "$ m",
    "alt": [
     24.974271012006856
    ]
   },
   {
    "navn": "V<sup>L</sup> (APV)",
    "verdi": 344.55340577789553,
    "enhet": "$ m",
    "tol": 0.0059,
    "alt": [
     371.64093767867354
    ]
   }
  ],
  "merknad": "Fellene for D_1 er gjeld holdt fast (D_1 = D_0) og gjeld fra V^U. alt er svarene med reserveverdien r_U = 10 %."
 },
 "mk-wacc-apv-2:1:f": {
  "type": "tekst"
 },
 "mk-wacc-apv-3:1:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>E</sub>",
    "verdi": 9.0,
    "enhet": "%"
   },
   {
    "navn": "r<sub>wacc</sub>",
    "verdi": 7.470000000000001,
    "enhet": "%"
   }
  ]
 },
 "mk-wacc-apv-3:1:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "FCF<sub>0</sub>",
    "verdi": -74.0,
    "enhet": "DKK m"
   },
   {
    "navn": "FCF<sub>1</sub>",
    "verdi": 37.36,
    "enhet": "DKK m"
   },
   {
    "navn": "FCF<sub>2</sub>",
    "verdi": 60.82,
    "enhet": "DKK m"
   }
  ],
  "merknad": "Fellene er sunk cost tatt med, NWC-nivå i stedet for endring, kannibaliseringen utelatt og ΔNWC utelatt. FCF_2 med nivå og uten ΔNWC er samme tall (44.82)."
 },
 "mk-wacc-apv-3:1:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV (WACC)",
    "verdi": 13.422106124790432,
    "enhet": "DKK m",
    "alt": [
     12.178299324622998
    ]
   }
  ],
  "merknad": "Fellene er NPV med r_U (12.9938), med r_E, PV uten investeringen og sunk cost tatt med. alt (12.1783) er svaret med reservekontantstrømmene."
 },
 "mk-wacc-apv-3:1:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "D<sub>0</sub>",
    "verdi": 26.22663183743713,
    "enhet": "DKK m",
    "tol": 0.0019,
    "alt": [
     26.1534897973869
    ]
   },
   {
    "navn": "Debt adjustment, Year 1",
    "verdi": -9.248870601743448,
    "enhet": "DKK m",
    "tol": 0.0033,
    "alt": [
     9.248870601743448,
     -8.846334312135202,
     8.846334312135202
    ]
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Does Brandholm borrow or repay?",
  "merknad": "Begge fortegn godtas for justeringen (D_1 − D_0 eller D_0 − D_1). Retningen (nedbetaling) rettes i tekstdelen. Toleransen er stram fordi tallene regnet fra V^U ligger under 1 % unna. 0.3 × 74 = 22.2 (gjeld fra utlegget) er en felle. Resten av alt er svarene med reservekontantstrømmene."
 },
 "mk-wacc-apv-3:1:e": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>U</sub>",
    "verdi": 7.8,
    "enhet": "%"
   },
   {
    "navn": "PV(TS)",
    "verdi": 0.42832598497265256,
    "enhet": "DKK m"
   },
   {
    "navn": "NPV (APV)",
    "verdi": 13.422106124790425,
    "enhet": "DKK m",
    "tol": 0.001,
    "alt": [
     12.178299324622985
    ]
   }
  ],
  "merknad": "Diskonteres skjoldet med r_D, blir NPV 0.12 % høyere, så toleransen på NPV er 0.1 % (hver nåverdi rundet til to desimaler gir 13.43, innenfor). PV(TS) (0.4441 mot 0.4283) avviser r_D med standardtoleransen. alt er svarene med reservekontantstrømmene."
 },
 "mk-wacc-apv-3:1:f": {
  "type": "tekst"
 },
 "prove1:1:": {
  "type": "tekst"
 },
 "prove1:2:": {
  "type": "tekst"
 },
 "prove1:3:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>E</sub>",
    "verdi": 9.5,
    "enhet": "%"
   },
   {
    "navn": "P<sub>0</sub>",
    "verdi": 25.0,
    "enhet": "NOK per share"
   }
  ]
 },
 "prove1:3:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Debt issued",
    "verdi": 160.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Share price on announcement",
    "verdi": 25.0,
    "enhet": "NOK per share"
   },
   {
    "navn": "Shares repurchased",
    "verdi": 6.4,
    "enhet": "m shares"
   }
  ],
  "merknad": "Tall og ikke blandet: alle tre spørsmålene har tallsvar. MM I ligger i at kursen er 25."
 },
 "prove1:3:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "E[DPS<sub>1</sub>] after the transaction",
    "verdi": 3.291666666666667,
    "enhet": "NOK per share"
   },
   {
    "navn": "E[DPS<sub>1</sub>] without the transaction",
    "verdi": 2.375,
    "enhet": "NOK per share"
   },
   {
    "navn": "New β<sub>E</sub>",
    "verdi": 1.8333333333333335,
    "enhet": ""
   },
   {
    "navn": "New r<sub>E</sub>",
    "verdi": 13.166666666666666,
    "enhet": "%"
   }
  ]
 },
 "prove1:3:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Shares sold",
    "verdi": 1920.0,
    "enhet": "shares"
   },
   {
    "navn": "Debt bought",
    "verdi": 48000.0,
    "enhet": "NOK"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Show that her Year-1 cash flow is the same as without the recapitalisation in both states.",
  "merknad": "«Show how» er en utledning, men handelen har to tall (selg 1 920 aksjer, kjøp gjeld for 48 000). Kontantstrømmene per tilstand rettes i tekstdelen."
 },
 "prove1:3:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Seller: Year-1 cash flow (each state)",
    "verdi": 4800.0,
    "enhet": "NOK"
   },
   {
    "navn": "Keeper: Year-1 cash flow, FCF = 30",
    "verdi": 11800.0,
    "enhet": "NOK"
   },
   {
    "navn": "Keeper: Year-1 cash flow, FCF = 46",
    "verdi": 19800.0,
    "enhet": "NOK"
   },
   {
    "navn": "Seller: value today",
    "verdi": 120000.0,
    "enhet": "NOK"
   },
   {
    "navn": "Keeper: value today",
    "verdi": 120000.00000000001,
    "enhet": "NOK"
   }
  ],
  "tallPoeng": 2.5,
  "tekstLedd": "Is anyone better or worse off because of the recapitalisation? Explain briefly."
 },
 "prove1:4:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "β<sub>D</sub>",
    "verdi": 0.24999999999999997,
    "enhet": ""
   }
  ]
 },
 "prove1:4:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>E</sub>",
    "verdi": 14.200000000000001,
    "enhet": "%"
   }
  ]
 },
 "prove1:4:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>U</sub>",
    "verdi": 10.9375,
    "enhet": "%"
   }
  ]
 },
 "prove1:4:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>wacc</sub>",
    "verdi": 10.48375,
    "enhet": "%"
   }
  ]
 },
 "prove1:4:e": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>L</sup><sub>0</sub> (WACC)",
    "verdi": 157.80650936352416,
    "enhet": "$ m",
    "tol": 0.0005
   }
  ],
  "merknad": "Stram toleranse (0,05 %), som nøkkelens avvik på om lag 0,001 tilsier. WACC avrundet til 10,48 % gir 157,8170 og godtas."
 },
 "prove1:4:f": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Debt adjustment",
    "verdi": 3.9540149720244173,
    "enhet": "$ m",
    "alt": [
     -3.9540149720244173
    ]
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Does the company borrow or repay?",
  "merknad": "Begge fortegn godtas for tallet. Retningen (selskapet låner mer) rettes i tekstdelen, slik spørsmålet ber om."
 },
 "prove1:4:g": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>U</sup><sub>0</sub>",
    "verdi": 156.54036897440983,
    "enhet": "$ m",
    "tol": 0.0005
   }
  ],
  "merknad": "Stram toleranse (0,05 %) som i (e)."
 },
 "prove1:4:h": {
  "type": "tall",
  "tall": [
   {
    "navn": "TS<sub>1</sub>",
    "verdi": 0.7160470362369907,
    "enhet": "$ m"
   },
   {
    "navn": "TS<sub>2</sub>",
    "verdi": 0.7638906173984862,
    "enhet": "$ m"
   },
   {
    "navn": "PV(TS)",
    "verdi": 1.26614038911428,
    "enhet": "$ m"
   }
  ]
 },
 "prove1:4:i": {
  "type": "blandet",
  "tall": [
   {
    "navn": "V<sup>L</sup><sub>0</sub> (APV)",
    "verdi": 157.8065093635241,
    "enhet": "$ m",
    "tol": 0.0005
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Does it agree with your answer in (e)? Explain briefly why.",
  "merknad": "Stram toleranse (0,05 %): skatteskjoldet diskontert med r_D gir 157,9054 (0,06 % unna) og avvises."
 },
 "prove1:5:a": {
  "type": "blandet",
  "tall": [
   {
    "navn": "NPV",
    "verdi": -200000.0,
    "enhet": "NOK"
   }
  ],
  "tallPoeng": 1.5,
  "tekstLedd": "Will you open it?"
 },
 "prove1:5:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Maximum price for the study (C<sub>0</sub>)",
    "verdi": 525000.0,
    "enhet": "NOK"
   }
  ]
 },
 "prove1:5:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "C<sub>1</sub>",
    "verdi": 486111.11111111107,
    "enhet": "NOK"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Compare your result with (b) and comment."
 },
 "prove1:5:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "NPV with the offer",
    "verdi": 54629.62962962955,
    "enhet": "NOK"
   },
   {
    "navn": "Increase in NPV vs (a)",
    "verdi": 254629.62962962955,
    "enhet": "NOK",
    "alt": [
     54629.62962962955
    ]
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Will you open it?",
  "merknad": "Økningen godtar også 54 630: kriteriene gir full uttelling for verdien av kontrakten målt mot ikke å åpne (max(0, −200 000) = 0)."
 },
 "prove1:5:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "X",
    "verdi": 90560.00000000001,
    "enhet": "NOK"
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Explain briefly why, once X is large enough that you would sell in the bad state, a larger X makes the hall more attractive."
 },
 "prove1:6:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "P<sub>new</sub>",
    "verdi": 76.56903765690377,
    "enhet": "$ per share"
   },
   {
    "navn": "NPV<sub>A</sub>",
    "verdi": 62.76150627615061,
    "enhet": "$ m"
   },
   {
    "navn": "NPV<sub>T</sub>",
    "verdi": 117.2384937238495,
    "enhet": "$ m"
   }
  ]
 },
 "prove1:6:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "ER<sub>max</sub>",
    "verdi": 0.5866666666666667,
    "enhet": ""
   },
   {
    "navn": "ER<sub>min</sub>",
    "verdi": 0.4025157232704402,
    "enhet": ""
   },
   {
    "navn": "A's share of the synergies",
    "verdi": 34.86750348675034,
    "enhet": "%"
   },
   {
    "navn": "B's share of the synergies",
    "verdi": 65.13249651324972,
    "enhet": "%"
   }
  ],
  "tallPoeng": 5,
  "tekstLedd": "Where does the offer of 0.52 lie in this range?",
  "merknad": "ER_min = 32/75 = 0,4267 gir delpoeng etter kriteriene, men godtas ikke automatisk; studenten kan overstyre."
 },
 "prove1:6:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "S<sub>implied</sub>",
    "verdi": 57.19999999999982,
    "enhet": "$ m"
   },
   {
    "navn": "NPV<sub>A</sub> (market)",
    "verdi": -40.0,
    "enhet": "$ m"
   },
   {
    "navn": "NPV<sub>T</sub> (market)",
    "verdi": 97.19999999999996,
    "enhet": "$ m"
   }
  ]
 },
 "prove1:6:d": {
  "type": "tekst"
 },
 "prove10:1:": {
  "type": "tekst"
 },
 "prove10:2:": {
  "type": "tekst"
 },
 "prove10:3:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Net proceeds",
    "verdi": 334.8,
    "enhet": "NOK m"
   }
  ]
 },
 "prove10:3:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Market value after day 1",
    "verdi": 1728,
    "enhet": "NOK m"
   }
  ]
 },
 "prove10:3:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Fair price per share",
    "verdi": 58.05,
    "enhet": "NOK per share"
   },
   {
    "navn": "Cost to the original owners",
    "verdi": 97.2,
    "enhet": "NOK m"
   }
  ]
 },
 "prove10:3:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "Uninformed investor's average return",
    "verdi": -12,
    "enhet": "%"
   }
  ]
 },
 "prove10:3:e": {
  "type": "tall",
  "tall": [
   {
    "navn": "Break-even offer price",
    "verdi": 39.6,
    "enhet": "NOK per share"
   },
   {
    "navn": "Average first-day return",
    "verdi": 13.636363636363637,
    "enhet": "%"
   }
  ]
 },
 "prove10:4:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>U</sup>",
    "verdi": 1000,
    "enhet": "NOK m"
   }
  ]
 },
 "prove10:4:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>L</sup> (Policy 1)",
    "verdi": 1038.0622837370242,
    "enhet": "NOK m"
   }
  ]
 },
 "prove10:4:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "V<sup>L</sup> (Policy 2)",
    "verdi": 1066,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Which rate do you discount the tax shields at and why?"
 },
 "prove10:4:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>L</sup> (Policy 3)",
    "verdi": 1044,
    "enhet": "NOK m"
   },
   {
    "navn": "Debt today",
    "verdi": 360,
    "enhet": "NOK m"
   }
  ]
 },
 "prove10:4:e": {
  "type": "tall",
  "tall": [
   {
    "navn": "Share price after the announcement",
    "verdi": 26.65,
    "enhet": "NOK per share"
   },
   {
    "navn": "Shares bought back",
    "verdi": 11.257035647279551,
    "enhet": "m shares"
   }
  ]
 },
 "prove10:4:f": {
  "type": "blandet",
  "tall": [
   {
    "navn": "PV(TS) per NOK of debt, Policy 1",
    "verdi": 0.12222222222222222,
    "enhet": ""
   },
   {
    "navn": "PV(TS) per NOK of debt, Policy 2",
    "verdi": 0.22,
    "enhet": ""
   },
   {
    "navn": "PV(TS) per NOK of debt, Policy 3",
    "verdi": 0.12222222222222222,
    "enhet": ""
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Rank the three policies by value and explain the ranking (2-3 sentences).",
  "merknad": "Rangeringen og risikoforklaringen er tekstdelen; tallene er PV(TS) per krone gjeld, som kriteriene gir ett eget ledd."
 },
 "prove10:5:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Glimsdal's bond",
    "verdi": 857.3388203017832,
    "enhet": "NOK m"
   },
   {
    "navn": "Government zero-coupon bond",
    "verdi": 942.5959091337544,
    "enhet": "NOK m"
   }
  ]
 },
 "prove10:5:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Expected annual return",
    "verdi": 5.293076695478893,
    "enhet": "%"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Why does it differ from the yield?"
 },
 "prove10:5:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Risk-neutral default probability ρ",
    "verdi": 0.1644531737124331,
    "enhet": "",
    "regnet": true
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Why does it differ from 9%?",
  "merknad": "Sannsynlighet som desimaltall. Løsningen viser den bare i prosent (16.4453%); verdien er den samme."
 },
 "prove10:5:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Fair CDS price",
    "verdi": 85.25708883197116,
    "enhet": "NOK m"
   },
   {
    "navn": "Arbitrage profit today",
    "verdi": 15.257088831971146,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Construct the arbitrage: the positions today and the cash flows in both states.",
  "merknad": "Kriteriene gir strategien med tilstandsvise kontantstrømmer egne poeng (uten dem maks 5 av 8), så strategien er tekstdelen."
 },
 "prove10:5:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Equity value E",
    "verdi": 392.66117969821676,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Using put-call parity on the firm's assets, explain what would happen to the values of Glimsdal, its equity and its debt if it raised the face value of its debt to buy back shares in a perfect market (2-3 sentences)."
 },
 "prove10:6:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV<sub>A</sub>",
    "verdi": 300,
    "enhet": "NOK m"
   },
   {
    "navn": "NPV<sub>B</sub>",
    "verdi": 480,
    "enhet": "NOK m"
   },
   {
    "navn": "Highest cash price per B share",
    "verdi": 90,
    "enhet": "NOK per share"
   }
  ]
 },
 "prove10:6:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Return if the deal completes (6 months)",
    "verdi": 4.575163398692816,
    "enhet": "%"
   },
   {
    "navn": "Return if the deal fails (6 months)",
    "verdi": -16.33986928104575,
    "enhet": "%"
   },
   {
    "navn": "Implied probability of completion p",
    "verdi": 0.8524387795597175,
    "enhet": ""
   }
  ]
 },
 "prove10:6:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Synergies S expected by the market",
    "verdi": 361.94167430338894,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 5,
  "tekstLedd": "Are A's shareholders better or worse off from the bid?",
  "merknad": "Kriteriene: «worse off» gir sitt eget poeng uansett tall. Den enkle faktoren 1.015 gir S = 363.23, innenfor 1 %."
 },
 "prove10:6:d": {
  "type": "tekst"
 },
 "prove11:1:": {
  "type": "tekst"
 },
 "prove11:2:": {
  "type": "tekst"
 },
 "prove11:3:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Share price today P<sub>0</sub>",
    "verdi": 40,
    "enhet": "NOK per share"
   }
  ]
 },
 "prove11:3:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Shares bought",
    "verdi": 5,
    "enhet": "m shares"
   },
   {
    "navn": "Price after good news",
    "verdi": 57.142857142857146,
    "enhet": "NOK per share"
   },
   {
    "navn": "Price after bad news",
    "verdi": 28.571428571428573,
    "enhet": "NOK per share"
   }
  ]
 },
 "prove11:3:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Price after the repurchase, good news",
    "verdi": 55,
    "enhet": "NOK per share"
   },
   {
    "navn": "Price after the repurchase, bad news",
    "verdi": 30,
    "enhet": "NOK per share"
   }
  ]
 },
 "prove11:3:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Value moved from sellers to remaining shareholders (good news)",
    "verdi": 75,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "When does management repurchase if the news is good and when if it is bad? If the news is good, who gains and who loses?",
  "merknad": "Tidspunktene (nå ved gode nyheter, etter ved dårlige) og hvem som taper og vinner er tekstdelen; beløpet 75 er tallet."
 },
 "prove11:3:e": {
  "type": "tekst"
 },
 "prove11:4:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "FCF Year 1",
    "verdi": 51.8,
    "enhet": "NOK m"
   },
   {
    "navn": "FCF Year 2",
    "verdi": 67.4,
    "enhet": "NOK m"
   },
   {
    "navn": "FCF Year 3",
    "verdi": 74.1,
    "enhet": "NOK m"
   }
  ]
 },
 "prove11:4:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "β<sub>U</sub> (Fjellsport)",
    "verdi": 0.9500000000000002,
    "enhet": ""
   },
   {
    "navn": "r<sub>U</sub>",
    "verdi": 9.700000000000003,
    "enhet": "%"
   }
  ]
 },
 "prove11:4:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>wacc</sub>",
    "verdi": 9.172000000000002,
    "enhet": "%"
   }
  ]
 },
 "prove11:4:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>L</sup><sub>3</sub>",
    "verdi": 1053.8482989403233,
    "enhet": "NOK m"
   }
  ]
 },
 "prove11:4:e": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>L</sup><sub>0</sub>",
    "verdi": 970.871518166335,
    "enhet": "NOK m"
   }
  ]
 },
 "prove11:4:f": {
  "type": "tall",
  "tall": [
   {
    "navn": "D<sub>0</sub>",
    "verdi": 388.34860726653403,
    "enhet": "NOK m"
   },
   {
    "navn": "D<sub>1</sub>",
    "verdi": 403.24794152502056,
    "enhet": "NOK m"
   },
   {
    "navn": "New debt issued at the end of Year 1",
    "verdi": 14.899334258486533,
    "enhet": "NOK m"
   }
  ]
 },
 "prove11:4:g": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>U</sup><sub>0</sub>",
    "verdi": 902.903553436664,
    "enhet": "NOK m"
   }
  ]
 },
 "prove11:4:h": {
  "type": "tall",
  "tall": [
   {
    "navn": "TS<sub>1</sub>",
    "verdi": 5.126201615918249,
    "enhet": "NOK m"
   },
   {
    "navn": "TS<sub>2</sub>",
    "verdi": 5.322872828130271,
    "enhet": "NOK m"
   },
   {
    "navn": "TS<sub>3</sub>",
    "verdi": 5.455214723926379,
    "enhet": "NOK m"
   },
   {
    "navn": "TS<sub>4</sub>",
    "verdi": 5.564319018404907,
    "enhet": "NOK m"
   },
   {
    "navn": "PV(TS)",
    "verdi": 67.96796472967125,
    "enhet": "NOK m"
   }
  ]
 },
 "prove11:4:i": {
  "type": "blandet",
  "tall": [
   {
    "navn": "V<sup>L</sup><sub>0</sub> (APV)",
    "verdi": 970.8715181663352,
    "enhet": "NOK m",
    "tol": 5e-05
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Compare with e).",
  "merknad": "Stram toleranse (±0.05) fordi kriteriene sier at et avvik på 0.001 er avrunding, men 0.05 er en feil. Sammenligningen med e) har eget kriterium og er tekstdelen."
 },
 "prove11:5:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV of buying today",
    "verdi": 360,
    "enhet": "NOK m"
   }
  ]
 },
 "prove11:5:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "NPV of waiting",
    "verdi": 346.6666666666667,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Is it better or worse than buying today? Explain the intuition."
 },
 "prove11:5:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Indifference probability p",
    "verdi": 0.2,
    "enhet": ""
   }
  ]
 },
 "prove11:5:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "NPV of buying today (with resale right)",
    "verdi": 390,
    "enhet": "NOK m"
   },
   {
    "navn": "NPV of waiting (p = 30%)",
    "verdi": 373.3333333333333,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Do you buy today or wait?",
  "merknad": "NPV ved å vente spørres ikke direkte, men valget krever det og kriteriene gir det eget ledd. Valget er tekstdelen."
 },
 "prove11:5:e": {
  "type": "tekst"
 },
 "prove11:6:a": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Offer per B share at the old prices",
    "verdi": 40,
    "enhet": "NOK per share"
   },
   {
    "navn": "Offer per B share at the new prices",
    "verdi": 41.6,
    "enhet": "NOK per share"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Why does B trade below the offer?"
 },
 "prove11:6:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Probability of completion p",
    "verdi": 0.7348509852931755,
    "enhet": "",
    "tol": 0.0012
   }
  ],
  "merknad": "Stram toleranse fordi kriteriene godtar 0.7340 til 0.7355, og standard 1 % ville godtatt feilen med helt års rente (0.7296)."
 },
 "prove11:6:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "P<sub>A</sub> at completion",
    "verdi": 54.1230167775528,
    "enhet": "NOK per share"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "How do you vote as a shareholder of A? Briefly explain."
 },
 "prove11:6:d": {
  "type": "tekst"
 },
 "prove12:1:": {
  "type": "tekst"
 },
 "prove12:2:": {
  "type": "tekst"
 },
 "prove12:3:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Lind shareholders, high prices",
    "verdi": 205,
    "enhet": "NOK m"
   },
   {
    "navn": "Lind shareholders, low prices",
    "verdi": 125,
    "enhet": "NOK m"
   },
   {
    "navn": "Selje shareholders, high prices",
    "verdi": 142,
    "enhet": "NOK m"
   },
   {
    "navn": "Selje shareholders, low prices",
    "verdi": 62,
    "enhet": "NOK m"
   },
   {
    "navn": "Selje's loan today D",
    "verdi": 60,
    "enhet": "NOK m"
   }
  ]
 },
 "prove12:3:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sub>Lind</sub>",
    "verdi": 150,
    "enhet": "NOK m"
   },
   {
    "navn": "V<sub>Selje</sub>",
    "verdi": 156,
    "enhet": "NOK m"
   },
   {
    "navn": "Expected return on Lind's equity",
    "verdi": 10,
    "enhet": "%"
   },
   {
    "navn": "Expected return on Selje's equity",
    "verdi": 6.25,
    "enhet": "%"
   }
  ]
 },
 "prove12:3:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "10% of Selje, high prices",
    "verdi": 14.2,
    "enhet": "NOK m"
   },
   {
    "navn": "10% of Selje, low prices",
    "verdi": 6.2,
    "enhet": "NOK m"
   },
   {
    "navn": "10% of Lind with loan, high prices",
    "verdi": 14.83,
    "enhet": "NOK m"
   },
   {
    "navn": "10% of Lind with loan, low prices",
    "verdi": 6.83,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Which plan is better?"
 },
 "prove12:3:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Arbitrage profit today",
    "verdi": 0.6,
    "enhet": "NOK m",
    "alt": [
     0.63,
     6
    ]
   },
   {
    "navn": "Selje's equity value where the arbitrage disappears",
    "verdi": 90,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Construct the arbitrage: the positions today and the cash flows in both states.",
  "merknad": "alt: 0.63 er gevinsten målt ved t = 1, og 6 er gevinsten med alle aksjene; kriteriene godtar begge. Konstruksjonen (retning og tilstandsvise kontantstrømmer) har egne kriterier og er tekstdelen."
 },
 "prove12:3:e": {
  "type": "tekst"
 },
 "prove12:4:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Bond D",
    "verdi": 142.85714285714286,
    "enhet": "NOK m"
   },
   {
    "navn": "Equity E",
    "verdi": 119.04761904761904,
    "enhet": "NOK m"
   }
  ]
 },
 "prove12:4:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Total equity, bond on Seismikk",
    "verdi": 161.9047619047619,
    "enhet": "NOK m"
   },
   {
    "navn": "Total equity, bond on Havn",
    "verdi": 114.28571428571428,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Which firm should take the bond if the CEO acts for the shareholders? Why?"
 },
 "prove12:4:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Change in the bond's value",
    "verdi": -38,
    "enhet": "%"
   },
   {
    "navn": "Change in the shareholders' total wealth",
    "verdi": 36,
    "enhet": "%"
   }
  ]
 },
 "prove12:4:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Shareholders' gain",
    "verdi": 42.85714285714286,
    "enhet": "NOK m"
   },
   {
    "navn": "Bondholders' loss",
    "verdi": 54.28571428571429,
    "enhet": "NOK m",
    "alt": [
     -54.28571428571429
    ]
   },
   {
    "navn": "Loss in firm value (D + E)",
    "verdi": 11.428571428571429,
    "enhet": "NOK m",
    "alt": [
     -11.428571428571429
    ]
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Does the split create value? Explain the mechanism.",
  "merknad": "Tapene er oppgitt som positive tall med navnet «loss»; alt godtar samme tall med minus. Om splittingen skaper verdi og mekanismen (formuesoverføring ved risikoforskyvning) er tekstdelen."
 },
 "prove12:4:e": {
  "type": "tekst"
 },
 "prove12:5:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "FCF<sub>1</sub>",
    "verdi": 330,
    "enhet": "NOK m"
   },
   {
    "navn": "V<sup>U</sup>",
    "verdi": 6000,
    "enhet": "NOK m"
   }
  ]
 },
 "prove12:5:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Interest tax shield Year 1",
    "verdi": 22,
    "enhet": "NOK m"
   },
   {
    "navn": "PV(TS)",
    "verdi": 400,
    "enhet": "NOK m",
    "alt": [
     415.38461538461536
    ]
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Which rate do you use and why?",
  "merknad": "alt 415.3846 er Miles-Ezzell (første års skjold med r_D, resten med r_U), som kriteriene godtar hvis det er begrunnet. Følgefeil derfra er lagt inn som alt i c), d) og f)."
 },
 "prove12:5:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>L</sup> (APV)",
    "verdi": 6400,
    "enhet": "NOK m",
    "alt": [
     6415.384615384615
    ]
   },
   {
    "navn": "Equity E",
    "verdi": 3900,
    "enhet": "NOK m",
    "alt": [
     3915.3846153846152
    ]
   }
  ],
  "merknad": "alt er følgefeilen fra Miles-Ezzell i b), som kriteriene godtar."
 },
 "prove12:5:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>wacc</sub>",
    "verdi": 7.65625,
    "enhet": "%",
    "tol": 0.001,
    "abs": 0.01,
    "alt": [
     7.643884892086331
    ]
   }
  ],
  "merknad": "Stram toleranse (±0.01 prosentpoeng) fordi kriteriene sier at 0.001 prosentpoeng er greit og 0.05 for mye. alt er følgefeilen fra Miles-Ezzell i b)."
 },
 "prove12:5:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "r<sub>E</sub>",
    "verdi": 10.564102564102566,
    "enhet": "%"
   },
   {
    "navn": "β<sub>E</sub>",
    "verdi": 1.3128205128205128,
    "enhet": ""
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Do its equity and debt betas, weighted by value, average to its asset beta?",
  "merknad": "Ja-svaret med β_D = 0 og 0.6094 × 1.3128 = 0.8000 har eget kriterium og er tekstdelen. Følgefeilen fra Miles-Ezzell (r_E ≈ 10.53 %, β_E ≈ 1.307) ligger innenfor 1 %."
 },
 "prove12:5:f": {
  "type": "tall",
  "tall": [
   {
    "navn": "FCFE<sub>1</sub>",
    "verdi": 314.5,
    "enhet": "NOK m"
   },
   {
    "navn": "Equity E (FTE)",
    "verdi": 3900,
    "enhet": "NOK m",
    "alt": [
     3915.3846153846152
    ]
   }
  ],
  "merknad": "Sammenligningen med c) (samme verdi) har ikke eget kriterium, så tall holder. alt er følgefeilen fra Miles-Ezzell i b)."
 },
 "prove12:6:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV of expanding now",
    "verdi": 10,
    "enhet": "USD m"
   }
  ]
 },
 "prove12:6:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV at t = 1, high price",
    "verdi": 100,
    "enhet": "USD m",
    "alt": [
     96.15384615384616
    ]
   },
   {
    "navn": "NPV at t = 1, low price",
    "verdi": -162.5,
    "enhet": "USD m",
    "alt": [
     -156.25
    ]
   },
   {
    "navn": "Threshold price",
    "verdi": 9666.666666666666,
    "enhet": "USD per tonne"
   }
  ],
  "merknad": "alt er tilstandsverdiene diskontert til i dag (96.1538 og −156.25), som kriteriene godtar hvis det er sagt."
 },
 "prove12:6:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Risk-neutral probability ρ of the high price",
    "verdi": 0.6571428571428573,
    "enhet": ""
   }
  ],
  "tallPoeng": 6,
  "tekstLedd": "Explain briefly why true probabilities are not needed."
 },
 "prove12:6:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Value today of the right to expand at t = 1",
    "verdi": 63.18681318681319,
    "enhet": "USD m"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Do you expand now or wait? Briefly comment."
 },
 "prove2:1:": {
  "type": "tekst"
 },
 "prove2:2:": {
  "type": "tekst"
 },
 "prove2:3:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>U</sub>",
    "verdi": 9.750000000000002,
    "enhet": "%"
   }
  ]
 },
 "prove2:3:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Share price on announcement",
    "verdi": 60.0,
    "enhet": "NOK per share"
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Explain what happens to the share price upon announcement and why.",
  "merknad": "Blandet som H2024 3b: grunnen (MM I, ingen skatteskjold) er det kriteriene gir mest for."
 },
 "prove2:3:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Special dividend per share",
    "verdi": 18.0,
    "enhet": "NOK per share"
   },
   {
    "navn": "Share price after the dividend",
    "verdi": 42.0,
    "enhet": "NOK per share"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Is she right? Explain."
 },
 "prove2:3:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "New r<sub>E</sub>",
    "verdi": 13.142857142857146,
    "enhet": "%"
   },
   {
    "navn": "New β<sub>E</sub>",
    "verdi": 1.523809523809524,
    "enhet": ""
   }
  ]
 },
 "prove2:3:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Shares repurchased",
    "verdi": 7.5,
    "enhet": "m shares"
   },
   {
    "navn": "Share price after the repurchase",
    "verdi": 60.0,
    "enhet": "NOK per share"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Would a shareholder prefer the special dividend or the repurchase? Explain briefly."
 },
 "prove2:4:a": {
  "type": "blandet",
  "tall": [
   {
    "navn": "E[payoff] S",
    "verdi": 62.0,
    "enhet": "NOK m"
   },
   {
    "navn": "E[payoff] M",
    "verdi": 60.0,
    "enhet": "NOK m"
   },
   {
    "navn": "E[payoff] R",
    "verdi": 45.0,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Which plan will the manager choose?"
 },
 "prove2:4:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Debt value under the chosen plan",
    "verdi": 30.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Equity value under the chosen plan",
    "verdi": 30.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Agency cost of debt",
    "verdi": 2.0,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Which plan will the manager choose?"
 },
 "prove2:4:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Face value F (S ~ M)",
    "verdi": 24.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Upper end of the range for M",
    "verdi": 50.0,
    "enhet": "NOK m"
   }
  ],
  "merknad": "Nedre grense for intervallet er F = 24, samme tall som det første."
 },
 "prove2:4:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Creditors' gain",
    "verdi": 5.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Shareholders' gain (after paying 6)",
    "verdi": -1.0,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Will the manager carry out the upgrade?"
 },
 "prove2:4:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Lowest F′ (creditors)",
    "verdi": 30.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Highest F′ (shareholders)",
    "verdi": 38.0,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Briefly explain why such a renegotiation is hard to achieve when the debt consists of bonds held by many small investors."
 },
 "prove2:5:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>U</sub>",
    "verdi": 8.5325,
    "enhet": "%"
   }
  ]
 },
 "prove2:5:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>E</sub>",
    "verdi": 10.652,
    "enhet": "%"
   }
  ]
 },
 "prove2:5:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>wacc</sub>",
    "verdi": 8.12,
    "enhet": "%"
   }
  ]
 },
 "prove2:5:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>L</sup> (WACC)",
    "verdi": 571.8954248366014,
    "enhet": "NOK m"
   }
  ]
 },
 "prove2:5:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "V<sup>L</sup> (APV)",
    "verdi": 571.8954248366014,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Briefly explain which rate you use to discount the tax shields and why.",
  "merknad": "Bare V^L er spurt etter. Det er samme tall som i (d); r_D på skatteskjoldet gir 614,42 og avvises."
 },
 "prove2:6:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV now",
    "verdi": 75.0,
    "enhet": "NOK m"
   }
  ]
 },
 "prove2:6:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Value of waiting",
    "verdi": 81.81818181818181,
    "enhet": "NOK m"
   },
   {
    "navn": "Value of the option to wait",
    "verdi": 6.818181818181813,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 5,
  "tekstLedd": "Do you build now or wait?"
 },
 "prove2:6:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "ρ",
    "verdi": 0.38636363636363635,
    "enhet": ""
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Explain briefly why ρ differs from management's 50% and why you do not need the true probability."
 },
 "prove2:6:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Value of waiting (risk-neutral)",
    "verdi": 67.5198587819947,
    "enhet": "NOK m",
    "abs": 0.01,
    "tol": 0.0001
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Do you build now or wait? Briefly explain why your answer differs from (b).",
  "merknad": "Kriteriene godtar 67,52 ± 0,01 (ρ avrundet til 0,3864 gir 67,5262). ρ med 10 % gir 63,22 og 50 % med r_f gir 87,38."
 },
 "prove3:1:": {
  "type": "tekst"
 },
 "prove3:2:": {
  "type": "tekst"
 },
 "prove3:3:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "E[V], existing assets",
    "verdi": 132.0,
    "enhet": "NOK m"
   },
   {
    "navn": "α",
    "verdi": 0.24193548387096775,
    "enhet": ""
   }
  ]
 },
 "prove3:3:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Payoff, high-value type",
    "verdi": 177.38709677419354,
    "enhet": "NOK m"
   },
   {
    "navn": "Payoff, low-value type",
    "verdi": 86.41935483870968,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Which type or types will issue equity and undertake the project?"
 },
 "prove3:3:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "α in equilibrium",
    "verdi": 0.39473684210526316,
    "enhet": ""
   },
   {
    "navn": "Expected loss of value",
    "verdi": 5.3999999999999995,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Are the investors' beliefs in a) consistent with your answer in b)? Which type issues and invests in equilibrium?"
 },
 "prove3:3:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "Maximum K",
    "verdi": 9.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Loss recovered, net of certificate cost",
    "verdi": 2.9999999999999996,
    "enhet": "NOK m"
   }
  ]
 },
 "prove3:3:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "F",
    "verdi": 45.0,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Show which types invest. Briefly explain what this implies for the order in which firms prefer to raise external funds."
 },
 "prove3:4:a": {
  "type": "blandet",
  "tall": [
   {
    "navn": "V<sup>U</sup>",
    "verdi": 1300.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Share price today",
    "verdi": 26.0,
    "enhet": "NOK per share"
   },
   {
    "navn": "PV(TS)",
    "verdi": 88.0,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "State which rate you discount the tax shield at and why."
 },
 "prove3:4:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Share price on announcement",
    "verdi": 27.76,
    "enhet": "NOK per share"
   },
   {
    "navn": "Equity value after the debt issue",
    "verdi": 1388.0,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Show the market value balance sheet just after the debt is issued. Who captures the value of the tax shield?"
 },
 "prove3:4:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Shares repurchased",
    "verdi": 14.40922190201729,
    "enhet": "m shares"
   },
   {
    "navn": "Share price after the repurchase",
    "verdi": 27.76,
    "enhet": "NOK per share"
   }
  ]
 },
 "prove3:4:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "DPS",
    "verdi": 2.9367157894736846,
    "enhet": "NOK per share"
   },
   {
    "navn": "r<sub>E</sub>",
    "verdi": 10.578947368421053,
    "enhet": "%"
   }
  ]
 },
 "prove3:4:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Share price on announcement, 800 plan",
    "verdi": 27.12,
    "enhet": "NOK per share"
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Which plan gives the higher share price on announcement? Who bears the expected cost of financial distress?",
  "merknad": "Prisen med 400-planen (27.76) er fra b). Valget av plan og hvem som bærer kostnaden er tekstdelen."
 },
 "prove3:5:a": {
  "type": "blandet",
  "tall": [
   {
    "navn": "ρ (high state)",
    "verdi": 0.46199999999999997,
    "enhet": ""
   },
   {
    "navn": "1 − ρ (low state)",
    "verdi": 0.538,
    "enhet": ""
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Why do you not need the analysts' estimate of 70%?"
 },
 "prove3:5:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Δ",
    "verdi": 0.4,
    "enhet": ""
   },
   {
    "navn": "B",
    "verdi": -19.41747572815534,
    "enhet": "NOK",
    "alt": [
     19.41747572815534
    ]
   },
   {
    "navn": "Call price",
    "verdi": 5.382524271844662,
    "enhet": "NOK"
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Show that the portfolio replicates the call in both states.",
  "merknad": "B er negativ (lån). Alt godtar beløpet oppgitt som positivt lånebeløp, 19.4175."
 },
 "prove3:5:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Put price",
    "verdi": 9.401941747572817,
    "enhet": "NOK"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Verify that your call and put prices satisfy put-call parity."
 },
 "prove3:5:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Arbitrage profit today",
    "verdi": 0.5019417475728005,
    "enhet": "NOK"
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Describe the arbitrage strategy and show its cash flows today and in both states in one year."
 },
 "prove3:5:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Equity",
    "verdi": 5.382524271844662,
    "enhet": ""
   },
   {
    "navn": "Debt",
    "verdi": 56.61747572815534,
    "enhet": ""
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "What does the put represent for the creditors? Why would the shareholders gain if the firm's assets became riskier while their value today stayed at 62?"
 },
 "prove3:6:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>D</sub>",
    "verdi": 5.5,
    "enhet": "%"
   },
   {
    "navn": "r<sub>E</sub>",
    "verdi": 12.0,
    "enhet": "%"
   },
   {
    "navn": "r<sub>U</sub>",
    "verdi": 9.4,
    "enhet": "%"
   },
   {
    "navn": "r<sub>wacc</sub>",
    "verdi": 8.915999999999999,
    "enhet": "%"
   }
  ]
 },
 "prove3:6:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>L</sup><sub>0</sub>",
    "verdi": 103.47372985354428,
    "enhet": "NOK m"
   },
   {
    "navn": "NPV",
    "verdi": 3.4737298535442847,
    "enhet": "NOK m"
   }
  ]
 },
 "prove3:6:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "D<sub>0</sub>",
    "verdi": 41.38949194141772,
    "enhet": "NOK m"
   },
   {
    "navn": "D<sub>1</sub>",
    "verdi": 43.479779042914515,
    "enhet": "NOK m"
   },
   {
    "navn": "D<sub>2</sub>",
    "verdi": 31.35643614238077,
    "enhet": "NOK m"
   },
   {
    "navn": "D<sub>3</sub>",
    "verdi": 11.752175988835434,
    "enhet": "NOK m"
   },
   {
    "navn": "Borrowed in Year 1 (D<sub>1</sub> − D<sub>0</sub>)",
    "verdi": 2.0902871014967985,
    "enhet": "NOK m"
   }
  ],
  "merknad": "Oppgaven spør etter 3 verdier, 4 gjeldskapasiteter og 5 justeringer. Holdt til 5 tall: D_t = 0.4 × V^L_t dekker verdiene. Justeringen i år 1 (+2.0903, den overraskende) dekker låne/nedbetale-delen. De øvrige justeringene er differanser av D_t."
 },
 "prove3:6:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "V<sup>U</sup><sub>0</sub>",
    "verdi": 102.18732012742029,
    "enhet": "NOK m"
   },
   {
    "navn": "TS<sub>1</sub>",
    "verdi": 0.5008128524911544,
    "enhet": "NOK m"
   },
   {
    "navn": "PV(TS)",
    "verdi": 1.2864097261239373,
    "enhet": "NOK m"
   },
   {
    "navn": "APV (V<sup>L</sup><sub>0</sub>)",
    "verdi": 103.47372985354423,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Compare your result with b).",
  "merknad": "TS_1 sjekker tidskonvensjonen (gjelden ved starten av året); TS_2–TS_4 fanges av PV(TS). Tekstdelen er sammenligningen med b) og begrunnelsen for r_U."
 },
 "prove3:6:e": {
  "type": "tekst"
 },
 "prove4:1:": {
  "type": "tekst"
 },
 "prove4:2:": {
  "type": "tekst"
 },
 "prove4:3:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>U</sub>",
    "verdi": 8.0,
    "enhet": "%"
   },
   {
    "navn": "V<sup>U</sup>",
    "verdi": 1800.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Share price",
    "verdi": 75.0,
    "enhet": "NOK per share"
   }
  ]
 },
 "prove4:3:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "D",
    "verdi": 800.0,
    "enhet": "NOK m"
   },
   {
    "navn": "PV(TS)",
    "verdi": 200.0,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "At which rate is the tax shield discounted and why?"
 },
 "prove4:3:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Share price on announcement",
    "verdi": 83.33333333333333,
    "enhet": "NOK per share"
   },
   {
    "navn": "Shares repurchased",
    "verdi": 9.600000000000001,
    "enhet": "m shares"
   },
   {
    "navn": "Repurchase price",
    "verdi": 83.33333333333333,
    "enhet": "NOK per share"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Who gains more: sellers or keepers?"
 },
 "prove4:3:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "DPS",
    "verdi": 8.333333333333334,
    "enhet": "NOK per share"
   },
   {
    "navn": "r<sub>E</sub>",
    "verdi": 10.0,
    "enhet": "%"
   }
  ]
 },
 "prove4:3:e": {
  "type": "tekst"
 },
 "prove4:4:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "FCF<sub>0</sub>",
    "verdi": -66.0,
    "enhet": "NOK m"
   },
   {
    "navn": "FCF<sub>1</sub>",
    "verdi": 24.740000000000002,
    "enhet": "NOK m"
   },
   {
    "navn": "FCF<sub>2</sub>",
    "verdi": 31.42,
    "enhet": "NOK m"
   },
   {
    "navn": "FCF<sub>3</sub>",
    "verdi": 35.58,
    "enhet": "NOK m"
   }
  ]
 },
 "prove4:4:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>U</sub>",
    "verdi": 8.799999999999999,
    "enhet": "%"
   }
  ]
 },
 "prove4:4:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>E</sub>",
    "verdi": 10.45,
    "enhet": "%"
   },
   {
    "navn": "r<sub>wacc</sub>",
    "verdi": 8.396666666666667,
    "enhet": "%"
   }
  ]
 },
 "prove4:4:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV",
    "verdi": 11.499985946450138,
    "enhet": "NOK m"
   },
   {
    "navn": "D<sub>0</sub>",
    "verdi": 25.83332864881671,
    "enhet": "NOK m"
   },
   {
    "navn": "D<sub>1</sub>",
    "verdi": 19.755800477695686,
    "enhet": "NOK m"
   },
   {
    "navn": "D<sub>2</sub>",
    "verdi": 10.941295857806203,
    "enhet": "NOK m"
   }
  ]
 },
 "prove4:4:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "V<sup>U</sup>",
    "verdi": 76.90795128199419,
    "enhet": "NOK m"
   },
   {
    "navn": "TS<sub>1</sub>",
    "verdi": 0.3125832766506822,
    "enhet": "NOK m"
   },
   {
    "navn": "PV(TS)",
    "verdi": 0.5920346644559428,
    "enhet": "NOK m"
   },
   {
    "navn": "APV",
    "verdi": 77.49998594645012,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 2.5,
  "tekstLedd": "Compare with d).",
  "merknad": "TS_1 sjekker tidskonvensjonen (D_0); TS_2 og TS_3 fanges av PV(TS)."
 },
 "prove4:4:f": {
  "type": "tekst"
 },
 "prove4:5:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Monthly rate",
    "verdi": 0.48675505653430484,
    "enhet": "%"
   },
   {
    "navn": "NPV, standard lease",
    "verdi": -86442.07066557108,
    "enhet": "NOK"
   }
  ],
  "merknad": "Månedsrenten med full presisjon (0.486755 %); oppgaven ber om 0.4868 % og om å bruke den videre, så NPV og alle senere tall er regnet med 0.004868 slik løsningen gjør."
 },
 "prove4:5:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV with the 24-month exit",
    "verdi": 370617.7519943283,
    "enhet": "NOK"
   }
  ]
 },
 "prove4:5:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Value of the right to terminate after 24 months",
    "verdi": 370617.7519943283,
    "enhet": "NOK"
   },
   {
    "navn": "Extra value with termination after 12 months",
    "verdi": 27426.189632694295,
    "enhet": "NOK"
   }
  ],
  "merknad": "Verdien er målt mot å ikke åpne (0), som i løsningen. 457,060 (målt mot −86,442) gir bare delpoeng etter kriteriene og er derfor ikke alt."
 },
 "prove4:5:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "Maximum fee F",
    "verdi": 832861.1523153565,
    "enhet": "NOK"
   }
  ]
 },
 "prove4:5:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "p, lease with exit (b)",
    "verdi": 0.32898995221195637,
    "enhet": ""
   },
   {
    "navn": "p, standard lease",
    "verdi": 0.5280533333333334,
    "enhet": ""
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Explain briefly why the two differ."
 },
 "prove4:6:a": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Offer per B share",
    "verdi": 62.550000000000004,
    "enhet": "NOK per share"
   },
   {
    "navn": "Spread",
    "verdi": 2.950000000000003,
    "enhet": "NOK per share"
   },
   {
    "navn": "Spread in percent of B's price",
    "verdi": 4.949664429530206,
    "enhet": "%",
    "alt": [
     4.716227018385296
    ]
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Why does B trade below the offer?",
  "merknad": "Spread i prosent av tilbudet (4.7162 %) godtas også etter kriteriene."
 },
 "prove4:6:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "p (completion)",
    "verdi": 0.7017358278027508,
    "enhet": ""
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Show the long-short position, the payoffs in both states, the certainty equivalent and the equation you solve.",
  "merknad": "Kriteriene sier at de 9 poengene er for posisjonen, begge utfallene, sikkerhetsekvivalenten og likningen, så framgangsmåten er tekstdel."
 },
 "prove4:6:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "S",
    "verdi": 900.6177161618411,
    "enhet": "NOK m"
   }
  ]
 },
 "prove4:6:d": {
  "type": "tekst"
 },
 "prove5:1:": {
  "type": "tekst"
 },
 "prove5:2:": {
  "type": "tekst"
 },
 "prove5:3:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Share price",
    "verdi": 30.000000000000007,
    "enhet": "NOK per share"
   },
   {
    "navn": "Forward P/E",
    "verdi": 9.090909090909093,
    "enhet": ""
   }
  ]
 },
 "prove5:3:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Share price on announcement",
    "verdi": 30.000000000000007,
    "enhet": "NOK per share"
   },
   {
    "navn": "Shares bought back",
    "verdi": 5.999999999999998,
    "enhet": "m shares"
   },
   {
    "navn": "r<sub>E</sub>",
    "verdi": 13.999999999999996,
    "enhet": "%"
   }
  ]
 },
 "prove5:3:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "EPS, next year",
    "verdi": 4.199999999999999,
    "enhet": "NOK per share"
   }
  ],
  "tallPoeng": 1.5,
  "tekstLedd": "The CFO says the higher EPS shows that the shareholders gain. Do you agree? Explain briefly."
 },
 "prove5:3:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "Issue price",
    "verdi": 28.200000000000006,
    "enhet": "NOK per share"
   },
   {
    "navn": "New shares",
    "verdi": 1.2765957446808507,
    "enhet": "m shares"
   }
  ]
 },
 "prove5:3:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Share price today",
    "verdi": 30.000000000000007,
    "enhet": "NOK per share"
   }
  ],
  "tallPoeng": 1.5,
  "tekstLedd": "Are the original shareholders better or worse off? Explain briefly."
 },
 "prove5:4:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>U</sup>",
    "verdi": 600.0,
    "enhet": "NOK m"
   }
  ]
 },
 "prove5:4:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>L</sup>",
    "verdi": 639.6,
    "enhet": "NOK m",
    "alt": [
     641.3052631578947
    ]
   }
  ],
  "merknad": "Alt 641.3053 er Miles-Ezzell-varianten (siste år til r_D), som løsningen godtar med begrunnelse."
 },
 "prove5:4:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "D<sub>0</sub>",
    "verdi": 239.99999999999997,
    "enhet": "NOK m"
   },
   {
    "navn": "E",
    "verdi": 399.6,
    "enhet": "NOK m"
   }
  ]
 },
 "prove5:4:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>E</sub>",
    "verdi": 11.702702702702702,
    "enhet": "%"
   },
   {
    "navn": "E (FTE)",
    "verdi": 399.59999999999997,
    "enhet": "NOK m"
   }
  ]
 },
 "prove5:4:e": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>wacc</sub>",
    "verdi": 8.628517823639775,
    "enhet": "%"
   },
   {
    "navn": "V<sup>L</sup> (WACC)",
    "verdi": 639.5999999999999,
    "enhet": "NOK m"
   }
  ],
  "merknad": "Oppgaven spør bare etter verdien, men den er lik V^L fra b) og kan kopieres. r_wacc er tatt med fordi det er selve WACC-metoden og kriteriene gir den eget poeng."
 },
 "prove5:4:f": {
  "type": "tekst"
 },
 "prove5:5:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV of building today",
    "verdi": 6.0,
    "enhet": "NOK m"
   }
  ]
 },
 "prove5:5:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Value of the option to wait",
    "verdi": 15.527777777777775,
    "enhet": "NOK m"
   }
  ],
  "merknad": "Målt mot å bygge i dag (21.5278 − 6.0). Beslutningen (vent) følger direkte av tallet."
 },
 "prove5:5:c": {
  "type": "tekst"
 },
 "prove5:5:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "NPV, commit to both stages",
    "verdi": -12.201646090534979,
    "enhet": "NOK m"
   },
   {
    "navn": "NPV, staged financing",
    "verdi": 4.4650205761316855,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 6,
  "tekstLedd": "Explain the difference briefly."
 },
 "prove5:6:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV<sub>A</sub>",
    "verdi": 62.5,
    "enhet": "NOK m"
   },
   {
    "navn": "NPV<sub>B</sub>",
    "verdi": 237.5,
    "enhet": "NOK m"
   }
  ]
 },
 "prove5:6:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Highest exchange ratio",
    "verdi": 0.75,
    "enhet": ""
   }
  ]
 },
 "prove5:6:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "NPV<sub>A</sub>, cash",
    "verdi": 80.0,
    "enhet": "NOK m"
   },
   {
    "navn": "NPV<sub>A</sub>, cash, S = 100",
    "verdi": -120.0,
    "enhet": "NOK m"
   },
   {
    "navn": "NPV<sub>A</sub>, shares, S = 100",
    "verdi": -93.75,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Who bears the synergy risk under each method?"
 },
 "prove5:6:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "NPV<sub>A</sub>, shares (A worth 72)",
    "verdi": 150.0,
    "enhet": "NOK m"
   },
   {
    "navn": "NPV<sub>A</sub>, cash",
    "verdi": 80.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Shares better than cash by",
    "verdi": 70.0,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "What does the market infer from the choice?"
 },
 "prove5:6:e": {
  "type": "tekst"
 },
 "prove6:1:": {
  "type": "tekst"
 },
 "prove6:2:": {
  "type": "tekst"
 },
 "prove6:3:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "β<sub>U</sub>",
    "verdi": 1.2,
    "enhet": ""
   },
   {
    "navn": "r<sub>U</sub>",
    "verdi": 10.0,
    "enhet": "%"
   }
  ]
 },
 "prove6:3:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Share price after the announcement",
    "verdi": 50.0,
    "enhet": "NOK per share"
   },
   {
    "navn": "New shares issued",
    "verdi": 20.0,
    "enhet": "m shares"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "What happens to the share price on announcement and why?",
  "merknad": "Kriteriene gir poeng for begrunnelsen (MM I), derfor blandet."
 },
 "prove6:3:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "β<sub>E</sub> after the issue",
    "verdi": 1.3499999999999999,
    "enhet": ""
   },
   {
    "navn": "r<sub>E</sub> after the issue",
    "verdi": 10.749999999999998,
    "enhet": "%"
   }
  ],
  "tallPoeng": 2.5,
  "tekstLedd": "Why do they change in this direction?"
 },
 "prove6:3:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "WACC before",
    "verdi": 10.0,
    "enhet": "%"
   },
   {
    "navn": "WACC after",
    "verdi": 9.999999999999998,
    "enhet": "%"
   }
  ],
  "tallPoeng": 2.5,
  "tekstLedd": "Explain the result using MM."
 },
 "prove6:3:e": {
  "type": "tekst"
 },
 "prove6:4:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "D",
    "verdi": 38.0,
    "enhet": "NOK m"
   },
   {
    "navn": "E",
    "verdi": 42.0,
    "enhet": "NOK m"
   },
   {
    "navn": "V",
    "verdi": 80.0,
    "enhet": "NOK m"
   }
  ]
 },
 "prove6:4:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "D",
    "verdi": 34.0,
    "enhet": "NOK m"
   },
   {
    "navn": "E",
    "verdi": 42.0,
    "enhet": "NOK m"
   },
   {
    "navn": "V",
    "verdi": 76.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Promised yield",
    "verdi": 47.058823529411775,
    "enhet": "%"
   },
   {
    "navn": "Expected return on the loan",
    "verdi": 0.0,
    "enhet": "%",
    "abs": 0.05
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "With the loan already outstanding, who bears the cost of the fire sale?"
 },
 "prove6:4:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Equity under Plan N",
    "verdi": 35,
    "enhet": "NOK m"
   },
   {
    "navn": "Equity under Plan P",
    "verdi": 42.0,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 1.5,
  "tekstLedd": "Which plan without debt and which with the loan? Why?"
 },
 "prove6:4:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "Agency cost",
    "verdi": 9.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Part from lower expected asset value",
    "verdi": 5.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Part from the fire sale",
    "verdi": 4.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Shareholders' gain (P vs N)",
    "verdi": 7.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Bank's loss (P vs N)",
    "verdi": 16.0,
    "enhet": "NOK m"
   }
  ],
  "merknad": "Hvem vinner og taper følger direkte av tallene: aksjonærene +7, banken −16 (oppgitt som tap 16)."
 },
 "prove6:4:e": {
  "type": "tekst"
 },
 "prove6:5:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>U</sub>",
    "verdi": 9.000000000000002,
    "enhet": "%"
   },
   {
    "navn": "β<sub>U</sub>",
    "verdi": 1.0000000000000002,
    "enhet": ""
   }
  ]
 },
 "prove6:5:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>U</sup>",
    "verdi": 6000.0,
    "enhet": "NOK m"
   }
  ]
 },
 "prove6:5:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Interest next year",
    "verdi": 110.0,
    "enhet": "NOK m"
   },
   {
    "navn": "PV(TS)",
    "verdi": 372.30769230769226,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Which rate do you discount the tax shields at and why?"
 },
 "prove6:5:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>L</sup>",
    "verdi": 6372.307692307692,
    "enhet": "NOK m"
   },
   {
    "navn": "E",
    "verdi": 4372.307692307692,
    "enhet": "NOK m"
   },
   {
    "navn": "D/V",
    "verdi": 31.385803959439883,
    "enhet": "%"
   }
  ]
 },
 "prove6:5:e": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>wacc</sub>",
    "verdi": 8.620231772090778,
    "enhet": "%"
   },
   {
    "navn": "r<sub>E</sub>",
    "verdi": 10.600985221674877,
    "enhet": "%"
   }
  ]
 },
 "prove6:5:f": {
  "type": "blandet",
  "tall": [
   {
    "navn": "β<sub>E</sub>",
    "verdi": 1.3201970443349753,
    "enhet": ""
   },
   {
    "navn": "β<sub>D</sub>",
    "verdi": 0.3,
    "enhet": ""
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Show that the weighted average of the betas equals the asset beta. Briefly explain why r<sub>wacc</sub> is lower than r<sub>U</sub>."
 },
 "prove6:6:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Value now, quick method",
    "verdi": 90,
    "enhet": "USD m"
   },
   {
    "navn": "Value now, careful method",
    "verdi": 75,
    "enhet": "USD m"
   }
  ],
  "merknad": "Valget (rask metode, feltet verdt 90) følger direkte av de to verdiene."
 },
 "prove6:6:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Quick method, up",
    "verdi": 142.5,
    "enhet": "USD m"
   },
   {
    "navn": "Careful method, up",
    "verdi": 162.5,
    "enhet": "USD m"
   },
   {
    "navn": "Quick method, down",
    "verdi": 48.0,
    "enhet": "USD m"
   },
   {
    "navn": "Careful method, down",
    "verdi": 5.0,
    "enhet": "USD m"
   }
  ],
  "merknad": "Oljeprisene i treet (87,5 og 56) er ikke egne tall: de ligger i de fire verdiene, og slik holder vi oss innenfor fem tall."
 },
 "prove6:6:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Switching price P*",
    "verdi": 77.5,
    "enhet": "USD per barrel"
   }
  ],
  "tallPoeng": 1.5,
  "tekstLedd": "Which method is optimal at each end-point? Why does the careful method win at high prices?"
 },
 "prove6:6:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "ρ (risk-neutral probability)",
    "verdi": 0.5555555555555556,
    "enhet": ""
   },
   {
    "navn": "PV of extracting next year",
    "verdi": 106.29629629629629,
    "enhet": "USD m"
   },
   {
    "navn": "Δ (oil in the portfolio)",
    "verdi": 3.634920634920635,
    "enhet": "m barrels"
   },
   {
    "navn": "B (bonds; negative = borrowing)",
    "verdi": -148.14814814814812,
    "enhet": "USD m",
    "alt": [
     148.14814814814812
    ]
   }
  ],
  "merknad": "B = −148,1481 betyr lån. 148,1481 godtas også (alt), fordi «borrow 148.1481» er samme svar."
 },
 "prove6:6:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Value of the option to wait",
    "verdi": 16.29629629629629,
    "enhet": "USD m"
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Do you extract now or wait? Explain why the analysts' 60% was not needed in d) and what goes wrong if you use it."
 },
 "prove7:1:": {
  "type": "tekst"
 },
 "prove7:2:": {
  "type": "tekst"
 },
 "prove7:3:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Issue price",
    "verdi": 21.5,
    "enhet": "NOK per share"
   },
   {
    "navn": "New shares",
    "verdi": 8.372093023255815,
    "enhet": "m shares"
   }
  ]
 },
 "prove7:3:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Existing share, high type",
    "verdi": 25.841346153846153,
    "enhet": "NOK per share"
   },
   {
    "navn": "Existing share, low type",
    "verdi": 18.60576923076923,
    "enhet": "NOK per share"
   }
  ],
  "tallPoeng": 1.5,
  "tekstLedd": "Which type or types issue and why?"
 },
 "prove7:3:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Equilibrium issue price",
    "verdi": 18.0,
    "enhet": "NOK per share"
   },
   {
    "navn": "Price change on announcing an issue",
    "verdi": -15.492957746478863,
    "enhet": "%"
   }
  ]
 },
 "prove7:3:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Price change on announcing the loan",
    "verdi": 23.8317757009346,
    "enhet": "%"
   },
   {
    "navn": "Price change on announcing a share issue",
    "verdi": -15.88785046728971,
    "enhet": "%"
   }
  ],
  "tallPoeng": 2.5,
  "tekstLedd": "What does each type do now and why?"
 },
 "prove7:3:e": {
  "type": "tekst"
 },
 "prove7:4:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>wacc</sub>",
    "verdi": 7.140000000000001,
    "enhet": "%",
    "tol": 0.003
   }
  ],
  "merknad": "Strammere toleranse (0,3 %) så feilen med all kontanten trukket fra (7,2197 %) ikke godtas."
 },
 "prove7:4:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Value of the upgrade",
    "verdi": 160.2102991820075,
    "enhet": "NOK m"
   },
   {
    "navn": "NPV",
    "verdi": 70.2102991820075,
    "enhet": "NOK m"
   }
  ]
 },
 "prove7:4:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "D<sub>0</sub>",
    "verdi": 96.1261795092045,
    "enhet": "NOK m"
   },
   {
    "navn": "D<sub>1</sub>",
    "verdi": 72.98958872616168,
    "enhet": "NOK m"
   },
   {
    "navn": "D<sub>2</sub>",
    "verdi": 39.20104536120964,
    "enhet": "NOK m"
   },
   {
    "navn": "D<sub>3</sub>",
    "verdi": 0.0,
    "enhet": "NOK m",
    "abs": 0.01
   }
  ]
 },
 "prove7:4:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "New debt",
    "verdi": 26.126179509204505,
    "enhet": "NOK m"
   },
   {
    "navn": "Payout",
    "verdi": 6.126179509204505,
    "enhet": "NOK m"
   },
   {
    "navn": "Gain to the shareholders",
    "verdi": 70.21029918200752,
    "enhet": "NOK m"
   }
  ]
 },
 "prove7:4:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "V<sup>U</sup>",
    "verdi": 158.1943000119311,
    "enhet": "NOK m"
   },
   {
    "navn": "PV(TS)",
    "verdi": 2.0159991700763835,
    "enhet": "NOK m"
   },
   {
    "navn": "APV value",
    "verdi": 160.21029918200747,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Compare with b). Which rate did you use for the tax shields and why?",
  "merknad": "V<sup>U</sup> og PV(TS) er med fordi APV-verdien alene er lik b) og ikke skiller ut feilen med r<sub>D</sub> på skjoldene (160,3021)."
 },
 "prove7:5:a": {
  "type": "blandet",
  "tall": [
   {
    "navn": "E after the debt issue",
    "verdi": 9.336,
    "enhet": "USD bn"
   }
  ],
  "tallPoeng": 1.5,
  "tekstLedd": "Explain which quote you use."
 },
 "prove7:5:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "D, with the call",
    "verdi": 26.664,
    "enhet": "USD bn"
   },
   {
    "navn": "D, with the put",
    "verdi": 26.663772897431244,
    "enhet": "USD bn"
   },
   {
    "navn": "Yield (annual)",
    "verdi": 9.889643193752784,
    "enhet": "%",
    "tol": 0.005
   }
  ],
  "merknad": "Toleranse 0,5 % så rentesatsen fra put-verdien (9,8904 %) godtas, men enkel deling (10,0090 %) ikke."
 },
 "prove7:5:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Senior debt D<sub>S</sub>",
    "verdi": 19.036,
    "enhet": "USD bn"
   },
   {
    "navn": "Junior debt D<sub>J</sub>",
    "verdi": 7.627999999999998,
    "enhet": "USD bn"
   },
   {
    "navn": "Yield on the junior debt (annual)",
    "verdi": 24.185660781935738,
    "enhet": "%"
   }
  ]
 },
 "prove7:5:d": {
  "type": "tekst"
 },
 "prove7:6:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV for Vestby",
    "verdi": 50,
    "enhet": "NOK m"
   },
   {
    "navn": "NPV for Lundar",
    "verdi": 250,
    "enhet": "NOK m"
   }
  ]
 },
 "prove7:6:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV for Vestby",
    "verdi": 60.0,
    "enhet": "NOK m"
   },
   {
    "navn": "NPV for Lundar",
    "verdi": 240.0,
    "enhet": "NOK m"
   }
  ]
 },
 "prove7:6:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Vestby's NPV of the cash offer (true values)",
    "verdi": 50,
    "enhet": "NOK m"
   },
   {
    "navn": "Vestby's NPV of the share offer (true values)",
    "verdi": 168.0,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 1.5,
  "tekstLedd": "Which offer do they prefer? How will the market react to a share offer?"
 },
 "prove7:6:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "Vestby's highest price",
    "verdi": 54.0,
    "enhet": "NOK per share"
   },
   {
    "navn": "Nordkyst's highest price",
    "verdi": 50.0,
    "enhet": "NOK per share"
   },
   {
    "navn": "Winning price (Vestby wins)",
    "verdi": 50.0,
    "enhet": "NOK per share",
    "alt": [
     54.0
    ]
   }
  ],
  "merknad": "Vinneren (Vestby) følger av de to grensene. Kriteriene godtar at Vestby betaler sin egen grense på 54,00 med en kommentar, derfor alt."
 },
 "prove7:6:e": {
  "type": "tekst"
 },
 "prove8:1:": {
  "type": "tekst"
 },
 "prove8:2:": {
  "type": "tekst"
 },
 "prove8:3:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>U</sup>",
    "verdi": 150.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Share price",
    "verdi": 12.5,
    "enhet": "NOK per share"
   }
  ]
 },
 "prove8:3:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "D",
    "verdi": 100.0,
    "enhet": "NOK m"
   },
   {
    "navn": "E",
    "verdi": 35.714285714285715,
    "enhet": "NOK m"
   }
  ]
 },
 "prove8:3:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Yield to maturity",
    "verdi": 39.99999999999999,
    "enhet": "%"
   },
   {
    "navn": "Expected return on the debt",
    "verdi": 5.000000000000004,
    "enhet": "%"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Explain briefly why they differ."
 },
 "prove8:3:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Share price at announcement",
    "verdi": 11.30952380952381,
    "enhet": "NOK per share"
   },
   {
    "navn": "Shares repurchased",
    "verdi": 8.842105263157894,
    "enhet": "m shares"
   }
  ],
  "tallPoeng": 2.5,
  "tekstLedd": "Explain what happens to the share price when the plan is announced.",
  "merknad": "Kriteriene gir poeng for hvorfor kursen faller (reelle konkurskostnader), derfor blandet."
 },
 "prove8:3:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Minimum PV(tax shield)",
    "verdi": 14.285714285714278,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Who bears the expected costs of financial distress? Explain."
 },
 "prove8:4:a": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Discount rate r<sub>U</sub>",
    "verdi": 9.4,
    "enhet": "%"
   }
  ],
  "tallPoeng": 1.5,
  "tekstLedd": "Why not 7%?"
 },
 "prove8:4:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "FCF Year 1",
    "verdi": -34.8,
    "enhet": "NOK m"
   },
   {
    "navn": "FCF Year 2",
    "verdi": 15.040000000000003,
    "enhet": "NOK m"
   },
   {
    "navn": "FCF Year 3",
    "verdi": 21.520000000000003,
    "enhet": "NOK m"
   },
   {
    "navn": "FCF Year 4",
    "verdi": 23.979999999999997,
    "enhet": "NOK m"
   }
  ]
 },
 "prove8:4:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV",
    "verdi": 7.018712670609769,
    "enhet": "NOK m"
   }
  ]
 },
 "prove8:4:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV of the 18-month plan",
    "verdi": 8.581535663893865,
    "enhet": "NOK m",
    "tol": 0.003,
    "alt": [
     15.496139147010473
    ]
   },
   {
    "navn": "Better than c) by",
    "verdi": 1.5628229932840956,
    "enhet": "NOK m"
   }
  ],
  "merknad": "Valget (den nye planen er bedre) følger av differansen. alt 15,4961 er følgefeilen fra en c) uten lageret, som kriteriene godtar. Toleranse 0,3 % så diskontering over ett år (8,6352) ikke godtas."
 },
 "prove8:4:e": {
  "type": "tekst"
 },
 "prove8:5:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV of the contract",
    "verdi": -2.551020408163268,
    "enhet": "NOK m"
   }
  ]
 },
 "prove8:5:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV of staged financing",
    "verdi": 22.87755102040816,
    "enhet": "NOK m"
   }
  ]
 },
 "prove8:5:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Extra value of staging",
    "verdi": 25.428571428571427,
    "enhet": "NOK m",
    "alt": [
     29.33333333333333
    ]
   },
   {
    "navn": "Highest contract price",
    "verdi": 19.571428571428573,
    "enhet": "NOK m"
   }
  ],
  "merknad": "alt 29,3333 (mot begge stegene til egne priser) godtas av kriteriene når svaret sier at det er sammenligningen. Kriteriene gir også poeng for å forklare kilden (sparte feltforsøk), men oppgaven spør bare etter tallene, så tall."
 },
 "prove8:5:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "NPV of staged financing",
    "verdi": 27.068027210884352,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 1.5,
  "tekstLedd": "Explain the change."
 },
 "prove8:5:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "NPV of the contract with the clause",
    "verdi": 24.115646258503396,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Which financing should Lysne choose? How does the clause change the value of committing early?"
 },
 "prove8:6:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Nordlaks debt",
    "verdi": 85.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Nordlaks equity",
    "verdi": 30.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Fjellkraft debt",
    "verdi": 71.25,
    "enhet": "NOK m"
   },
   {
    "navn": "Fjellkraft equity",
    "verdi": 21.25,
    "enhet": "NOK m"
   }
  ]
 },
 "prove8:6:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Merged equity",
    "verdi": 33.75,
    "enhet": "NOK m"
   },
   {
    "navn": "Nordlaks' loan after",
    "verdi": 99.28571428571428,
    "enhet": "NOK m"
   },
   {
    "navn": "Fjellkraft's loan after",
    "verdi": 74.46428571428571,
    "enhet": "NOK m"
   },
   {
    "navn": "Nordlaks' YTM before",
    "verdi": 17.647058823529417,
    "enhet": "%"
   },
   {
    "navn": "Nordlaks' YTM after",
    "verdi": 0.7194244604316724,
    "enhet": "%",
    "abs": 0.02
   }
  ],
  "merknad": "Den sammenslåtte gjelden (173,75) er utelatt for å holde fem tall: den er summen av de to lånene. abs 0,02 prosentpoeng på renten etter, fordi den er liten og følsom for avrunding av lånets verdi."
 },
 "prove8:6:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Gain to Nordlaks' creditors",
    "verdi": 14.285714285714278,
    "enhet": "NOK m"
   },
   {
    "navn": "Gain to Fjellkraft's creditors",
    "verdi": 3.214285714285708,
    "enhet": "NOK m"
   },
   {
    "navn": "Loss to the shareholders (both firms)",
    "verdi": 17.5,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Is diversification a good motive for the merger from the shareholders' point of view?"
 },
 "prove8:6:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Torvik's EPS after the deal",
    "verdi": 3.2758620689655173,
    "enhet": "NOK per share"
   }
  ],
  "tallPoeng": 1.5,
  "tekstLedd": "Is value created for Torvik's shareholders? Explain briefly."
 },
 "prove9:1:": {
  "type": "tekst"
 },
 "prove9:2:": {
  "type": "tekst"
 },
 "prove9:3:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Loan",
    "verdi": 114.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Equity",
    "verdi": 40.0,
    "enhet": "NOK m"
   }
  ]
 },
 "prove9:3:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "x (new investors' fraction)",
    "verdi": 51.724137931034484,
    "enhet": "%"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Will the existing shareholders approve the retrofit? Why?"
 },
 "prove9:3:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "NPV",
    "verdi": 15,
    "enhet": "NOK m"
   },
   {
    "navn": "Change in the loan's value",
    "verdi": 27.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Change in the existing shareholders' stake",
    "verdi": -12.000000000000004,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 2.5,
  "tekstLedd": "Who gains and why?"
 },
 "prove9:3:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "Gain to the existing shareholders",
    "verdi": 4.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Gain to the bank",
    "verdi": 11.0,
    "enhet": "NOK m"
   }
  ],
  "merknad": "At aksjonærene godkjenner følger direkte av gevinsten på +4 mot a)."
 },
 "prove9:3:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Bank's loan (now junior)",
    "verdi": 123.0,
    "enhet": "NOK m"
   },
   {
    "navn": "Equity",
    "verdi": 46.0,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Would the shareholders retrofit and would the bank agree? Why do loan contracts contain such covenants?"
 },
 "prove9:4:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "FCF",
    "verdi": 46.800000000000004,
    "enhet": "NOK m"
   },
   {
    "navn": "V<sup>U</sup>",
    "verdi": 585.0,
    "enhet": "NOK m"
   }
  ]
 },
 "prove9:4:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "PV(TS)",
    "verdi": 55.0,
    "enhet": "NOK m"
   },
   {
    "navn": "V<sup>L</sup>",
    "verdi": 640.0,
    "enhet": "NOK m"
   },
   {
    "navn": "E",
    "verdi": 390.0,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Which rate do you discount the tax shields at and why?"
 },
 "prove9:4:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "The fund's NPV",
    "verdi": 40.0,
    "enhet": "NOK m"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Who captures the tax shield?"
 },
 "prove9:4:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>U</sub> from Fjordvarme",
    "verdi": 8.200000000000001,
    "enhet": "%"
   },
   {
    "navn": "r<sub>U</sub> from Kystvarme",
    "verdi": 7.800000000000002,
    "enhet": "%"
   },
   {
    "navn": "r<sub>U</sub>, average",
    "verdi": 8.000000000000002,
    "enhet": "%",
    "tol": 0.005
   }
  ],
  "merknad": "At 8 % er i samsvar følger direkte av snittet. Toleranse 0,5 % så feilen uten Kystvarmes gjeldsbeta (7,9 %) ikke godtas."
 },
 "prove9:4:e": {
  "type": "tekst"
 },
 "prove9:5:a": {
  "type": "blandet",
  "tall": [
   {
    "navn": "ρ (risk-neutral probability of the high state)",
    "verdi": 0.5454545454545454,
    "enhet": ""
   }
  ],
  "tallPoeng": 1.5,
  "tekstLedd": "How does it compare with the analysts' 65% and why?"
 },
 "prove9:5:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Δ (fraction of the farm)",
    "verdi": 0.7727272727272727,
    "enhet": ""
   },
   {
    "navn": "B (bonds; negative = borrowing)",
    "verdi": -297.20279720279717,
    "enhet": "NOK m",
    "alt": [
     297.20279720279717
    ]
   },
   {
    "navn": "Equity E",
    "verdi": 89.1608391608392,
    "enhet": "NOK m"
   },
   {
    "navn": "Debt D",
    "verdi": 410.8391608391608,
    "enhet": "NOK m"
   },
   {
    "navn": "Put P",
    "verdi": 21.85314685314688,
    "enhet": "NOK m"
   }
  ],
  "merknad": "D er ett tall fordi begge rutene gir 410,8392. B = −297,2028 betyr lån; 297,2028 godtas også (alt)."
 },
 "prove9:5:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Promised yield",
    "verdi": 9.53191489361702,
    "enhet": "%"
   },
   {
    "navn": "Credit spread",
    "verdi": 5.531914893617022,
    "enhet": "%"
   },
   {
    "navn": "Implied default probability",
    "verdi": 0.454545454545455,
    "enhet": "",
    "alt": [
     0.49787234042553197
    ]
   },
   {
    "navn": "Expected return on the debt",
    "verdi": 5.2723404255319295,
    "enhet": "%"
   }
  ],
  "tallPoeng": 3.5,
  "tekstLedd": "Explain the gap between the expected return and the yield.",
  "merknad": "Kredittspreaden er i prosentpoeng. alt 0,4979 (spread/LGD) godtas av kriteriene når den kalles en tilnærming."
 },
 "prove9:5:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "New equity value",
    "verdi": 125.96153846153845,
    "enhet": "NOK m",
    "alt": [
     131.1188811188811
    ]
   },
   {
    "navn": "New debt value",
    "verdi": 364.03846153846155,
    "enhet": "NOK m",
    "alt": [
     367.1328671328671
    ]
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Would the shareholders want the switch and why?",
  "merknad": "alt 131,1189 og 367,1329 er verdiene med det opprinnelige treets ρ, som kriteriene godtar når studenten begrunner det (samme to tilstander)."
 },
 "prove9:6:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV of building now",
    "verdi": 12.5,
    "enhet": "NOK m"
   }
  ]
 },
 "prove9:6:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV of waiting",
    "verdi": 18.867924528301884,
    "enhet": "NOK m"
   },
   {
    "navn": "Value of the flexibility",
    "verdi": 6.367924528301884,
    "enhet": "NOK m"
   }
  ],
  "merknad": "Beslutningen (vent) følger direkte av at fleksibiliteten er verdt mer enn null."
 },
 "prove9:6:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV of waiting",
    "verdi": 14.622641509433958,
    "enhet": "NOK m"
   }
  ],
  "merknad": "Beslutningen (vent, 14,6226 > 12,5) følger direkte av tallet."
 },
 "prove9:6:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Entry probability at indifference",
    "verdi": 0.4499999999999997,
    "enhet": "",
    "alt": [
     0.3374999999999999
    ]
   }
  ],
  "tallPoeng": 2.5,
  "tekstLedd": "Why does the rival make waiting less attractive?",
  "merknad": "alt 0,3375 er følgefeilen fra en c) med verdi 0 når rivalen kommer; kriteriene gir full uttelling for metoden."
 },
 "prove9:6:e": {
  "type": "tekst"
 },
 "ps1:1:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "β<sub>E</sub> after the transaction",
    "verdi": 2.0,
    "enhet": ""
   }
  ]
 },
 "ps1:1:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>E</sub> after the transaction",
    "verdi": 17.5,
    "enhet": "%"
   }
  ]
 },
 "ps1:1:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Expected EPS after the transaction",
    "verdi": 1.7999999999999998,
    "enhet": "$ per share"
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Does this change benefit shareholders? Explain.",
  "kriterier": [
   "States that shareholders do not benefit: the share price stays at $21 because in a perfect market the shares are repurchased at a fair price, so the recapitalization creates no value (MM I).",
   "Explains that the higher EPS is offset by higher risk: leverage raises the equity beta to 2.0 and the required return to 17.5%, so the extra expected earnings are discounted at a higher rate."
  ]
 },
 "ps1:1:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Forward P/E after the transaction",
    "verdi": 11.666666666666668,
    "enhet": ""
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Is this change in the P/E ratio reasonable? Explain.",
  "kriterier": [
   "Concludes that the fall in the P/E ratio is reasonable: the share price is unchanged at $21 while expected EPS rises, so the ratio must fall.",
   "Explains the mechanism: levered equity is riskier (beta 2.0 and r_E = 17.5%), so investors pay less per dollar of expected earnings. A higher cost of equity means a lower P/E.",
   "Notes that the higher risk is not bankruptcy risk, since the debt is risk-free. It is the higher systematic risk that leverage places on the equity."
  ]
 },
 "ps1:2:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Cash flow to A's shareholders at t = 1",
    "verdi": 110.0,
    "enhet": ""
   },
   {
    "navn": "Cash flow to B's shareholders at t = 1",
    "verdi": 66.0,
    "enhet": ""
   },
   {
    "navn": "D<sub>B</sub>",
    "verdi": 40.0,
    "enhet": ""
   },
   {
    "navn": "E<sub>B</sub>",
    "verdi": 59.99999999999999,
    "enhet": ""
   },
   {
    "navn": "E<sub>A</sub>",
    "verdi": 99.99999999999999,
    "enhet": ""
   }
  ],
  "merknad": "Sammenligningen (D_B + E_B = E_A = 100, altså V_A = V_B) følger direkte av tallene, så typen er tall."
 },
 "ps1:2:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Payoff from buying all of B's equity",
    "verdi": 66.0,
    "enhet": ""
   },
   {
    "navn": "Payoff from buying all of A's equity",
    "verdi": 59.40000000000001,
    "enhet": ""
   }
  ]
 },
 "ps1:2:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "E<sub>B</sub> in equilibrium",
    "verdi": 59.99999999999999,
    "enhet": ""
   },
   {
    "navn": "E<sub>A</sub> in equilibrium",
    "verdi": 99.99999999999999,
    "enhet": ""
   },
   {
    "navn": "V<sub>A</sub>",
    "verdi": 99.99999999999999,
    "enhet": ""
   },
   {
    "navn": "V<sub>B</sub>",
    "verdi": 100.0,
    "enhet": ""
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Propose an arbitrage strategy. Which general theorem is this an example of? State the essence of the theorem and the assumption under which it is derived.",
  "kriterier": [
   "Proposes a zero-cost arbitrage that buys the underpriced B equity and sells A equity: for example short A for 100, buy all of B for 54 and lend the remaining 46 at 10%.",
   "Shows that the strategy pays a riskless 66 + 50.6 − 110 = 6.6 at t = 1 with no own capital. Arbitrage then pushes the price of B's equity up until E_B = 60 and V_A = V_B.",
   "Names the Modigliani-Miller irrelevance theorem (MM Proposition I): in a perfect capital market the total value of a firm is independent of its capital structure.",
   "States the perfect capital market assumption: securities trade at competitive prices equal to the PV of their cash flows, with no taxes, transaction costs or issuance costs. Financing decisions do not change the investment cash flows or reveal new information."
  ]
 },
 "ps1:3:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Share price after the announcement",
    "verdi": 75.0,
    "enhet": "$ per share"
   }
  ]
 },
 "ps1:3:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Share price after the transaction",
    "verdi": 50.0,
    "enhet": "$ per share"
   }
  ]
 },
 "ps1:3:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>E</sub> after the transaction",
    "verdi": 10.1,
    "enhet": "%"
   }
  ]
 },
 "ps1:4:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Firm value",
    "verdi": 15000.0,
    "enhet": "$"
   },
   {
    "navn": "Share price",
    "verdi": 15.0,
    "enhet": "$ per share"
   }
  ]
 },
 "ps1:4:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Share price after the announcement",
    "verdi": 15.0,
    "enhet": "$ per share"
   },
   {
    "navn": "Shares repurchased",
    "verdi": 500.0,
    "enhet": "shares"
   },
   {
    "navn": "r<sub>E</sub> after the recapitalization",
    "verdi": 30.0,
    "enhet": "%"
   },
   {
    "navn": "Earnings (to equity holders)",
    "verdi": 2250.0,
    "enhet": "$"
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Show that equity value indeed equals $7,500. Does the recapitalization make shareholders better off, as the CEO claims?",
  "kriterier": [
   "Shows that equity value equals earnings to equity divided by the new cost of equity: (3000 − 0.10 × 7500) / 0.30 = 2250 / 0.30 = 7500, which matches the 500 remaining shares at $15.",
   "Concludes that the CEO is wrong: shareholders are not better off because the share price stays at $15 (MM I), so the recapitalization creates no value.",
   "Explains that the higher required return on equity (30% instead of 20%) is only compensation for the extra risk from leverage (MM II), not a gain to shareholders."
  ],
  "merknad": "E = 7500 er gitt i oppgaven og hører til tekstdelen."
 },
 "ps1:4:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Firm value (all equity)",
    "verdi": 9000.0,
    "enhet": "$"
   },
   {
    "navn": "Share price (all equity)",
    "verdi": 9.0,
    "enhet": "$ per share"
   }
  ]
 },
 "ps1:4:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Share price after the announcement",
    "verdi": 12.0,
    "enhet": "$ per share"
   },
   {
    "navn": "Shares repurchased",
    "verdi": 625.0,
    "enhet": "shares"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Who captures the value from the recapitalization?",
  "kriterier": [
   "States that the existing shareholders capture the whole gain: the share price rises from $9 to $12 when the recapitalization is announced.",
   "Identifies the source of the gain as the PV of the interest tax shield on permanent debt, t_c × D = 0.4 × 7500 = 3000, which equals the $3 per share rise over 1000 shares.",
   "Explains that the gain is priced in at the announcement, before the repurchase, so shareholders who sell in the buyback and those who keep their shares both receive $12 per share."
  ]
 },
 "ps1:5:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Equity value without leverage",
    "verdi": 109.52380952380952,
    "enhet": "$ m"
   }
  ]
 },
 "ps1:5:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Debt value",
    "verdi": 78.86904761904762,
    "enhet": "$ m"
   }
  ]
 },
 "ps1:5:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Yield to maturity",
    "verdi": 26.792452830188672,
    "enhet": "%"
   },
   {
    "navn": "Expected return on the debt",
    "verdi": 5.0,
    "enhet": "%"
   }
  ]
 },
 "ps1:5:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "Equity value with leverage",
    "verdi": 20.238095238095237,
    "enhet": "$ m"
   },
   {
    "navn": "Total firm value with leverage",
    "verdi": 99.10714285714286,
    "enhet": "$ m"
   }
  ]
 },
 "ps1:5:e": {
  "type": "tall",
  "tall": [
   {
    "navn": "Share price without debt",
    "verdi": 10.952380952380953,
    "enhet": "$ per share"
   }
  ]
 },
 "ps1:5:f": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Share price after the debt-financed repurchase",
    "verdi": 9.910714285714286,
    "enhet": "$ per share"
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Why does your answer differ from that in part (e)?",
  "kriterier": [
   "Explains that the share price is lower than in (e) because shareholders bear the PV of expected bankruptcy costs: firm value falls from 109.52 to 99.11, a loss of 10.42 (about $1.04 per share).",
   "Explains that the debt holders are not hurt: they anticipate the bankruptcy costs and pay only the fair value of 78.87 for the debt, so the whole cost lands on the shareholders when the debt is issued.",
   "Notes that with no taxes there is no benefit of debt to offset the bankruptcy costs, so leverage lowers the share price."
  ]
 },
 "ps1:6:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Debt value",
    "verdi": 75.0,
    "enhet": "$"
   },
   {
    "navn": "Equity value",
    "verdi": 25.0,
    "enhet": "$"
   }
  ]
 },
 "ps1:6:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "NPV of the project",
    "verdi": 6.0,
    "enhet": "$"
   },
   {
    "navn": "Manager's payoff if he issues equity and invests",
    "verdi": 16.0,
    "enhet": "$"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Would he want to do this? Discuss.",
  "kriterier": [
   "Concludes that the manager will not issue equity and invest: his payoff falls from 25 to 16 even though the project has a positive NPV, so the firm forgoes a positive-NPV project (debt overhang).",
   "Explains the wealth transfer: the new equity is junior to the existing debt, so the debt rises in value from 75 to 90 (+15) while the old equity falls by 9. The creditors capture more than the whole NPV of 6.",
   "Notes that the debt stays risky with the project (80 is below the face value of 100 in the recession), which is why the existing creditors gain."
  ]
 },
 "ps1:6:c": {
  "type": "tekst",
  "kriterier": [
   "Answers that the manager now wants to issue equity and invest: with a face value of 80 the new investors need 48% of the equity, which leaves him 52% × 50 = 26, more than the 25 he has without the project.",
   "Answers that the debt holders agree: the new debt pays 80 in both states and is worth 80, more than the 75 their old claim is worth, because without renegotiation the project is not undertaken (from (b)).",
   "Explains the mechanism: writing down the debt removes the debt overhang, so the positive-NPV project goes ahead and the NPV of 6 is shared, making both parties better off (debt +5 and manager +1)."
  ],
  "merknad": "Spørsmålet ber om to ja/nei-svar. Tallene (26 mot 25 og 80 mot 75) er begrunnelsen og ligger i kriteriene."
 },
 "ps1:7:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Expected payoff, strategy A",
    "verdi": 75.0,
    "enhet": "$ m"
   },
   {
    "navn": "Expected payoff, strategy B",
    "verdi": 70.0,
    "enhet": "$ m"
   },
   {
    "navn": "Expected payoff, strategy C",
    "verdi": 66.0,
    "enhet": "$ m"
   }
  ],
  "merknad": "Valget (A) følger direkte av de forventede verdiene."
 },
 "ps1:7:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Expected payoff to equity, strategy A",
    "verdi": 35.0,
    "enhet": "$ m"
   },
   {
    "navn": "Expected payoff to equity, strategy B",
    "verdi": 50.0,
    "enhet": "$ m"
   },
   {
    "navn": "Expected payoff to equity, strategy C",
    "verdi": 26.0,
    "enhet": "$ m"
   }
  ],
  "merknad": "Valget (B) følger direkte av de forventede verdiene."
 },
 "ps1:7:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Expected payoff to equity, strategy A",
    "verdi": 0.0,
    "enhet": "$ m",
    "abs": 0.01
   },
   {
    "navn": "Expected payoff to equity, strategy B",
    "verdi": 15.0,
    "enhet": "$ m"
   },
   {
    "navn": "Expected payoff to equity, strategy C",
    "verdi": 19.0,
    "enhet": "$ m"
   }
  ],
  "merknad": "Valget (C) følger direkte av de forventede verdiene."
 },
 "ps1:7:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "Agency cost with $40 million of debt",
    "verdi": 5.0,
    "enhet": "$ m"
   },
   {
    "navn": "Agency cost with $110 million of debt",
    "verdi": 9.0,
    "enhet": "$ m"
   }
  ]
 },
 "ps1:8:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Equity value",
    "verdi": 100.0,
    "enhet": ""
   },
   {
    "navn": "Debt value",
    "verdi": 100.0,
    "enhet": ""
   }
  ]
 },
 "ps1:8:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Debt value after the spin-off",
    "verdi": 70.0,
    "enhet": ""
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Which division should be allocated the debt and which one should be debt-free?",
  "kriterier": [
   "Puts all the debt on Nicole and leaves Paris debt-free, because Nicole has the riskier cash flows (140 in the boom and 40 in the bust).",
   "Justifies the choice by comparing total equity value: 110 with the debt on Nicole against 100 with the debt on Paris.",
   "Explains the mechanism: shareholders keep the upside of the riskier division while the creditors bear the shortfall in the bust (they get only 40), so value shifts from debt to equity."
  ]
 },
 "ps1:8:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Net gain to shareholders",
    "verdi": 10.0,
    "enhet": ""
   }
  ],
  "merknad": "Spørsmålet spør bare etter nettogevinsten for aksjonærene. Forklaringen om wealth transfer gir ikke egne poeng her."
 },
 "ps1:8:d": {
  "type": "tekst",
  "kriterier": [
   "Recognises that ex post (with the debt already in place) such covenants are bad for equity holders because they block the gain of 10 from the spin-off.",
   "Explains the ex ante view: rational creditors anticipate risk shifting and demand a higher interest rate when there are no covenants, so shareholders bear the expected cost in advance, including the 20 of lost synergies.",
   "Concludes that covenants let the firm commit not to destroy value, which makes debt cheaper, so in general they are good for equity holders.",
   "The basic answer (bad ex post) earns partial credit. Full credit needs the ex ante argument as well."
  ]
 },
 "ps1:9:a": {
  "type": "tekst",
  "kriterier": [
   "With a true value of $12.50, chooses to issue equity: the shares are sold at $13.50, above their true value, so existing shareholders gain about $0.27 per share (37 m in the course's calculation), which beats the $20 m ($0.20 per share) net cost of debt.",
   "With a true value of $14.50, chooses to borrow: selling shares at $13.50, below their true value, would cost existing shareholders about $0.27 per share (27 m, or 37 m in the course's calculation), more than the $20 m net cost of debt.",
   "Bases both choices on the long-run share price for existing shareholders, comparing the gain or loss from issuing mispriced equity (500 / 13.50 ≈ 37 m new shares) with the net distress cost of debt."
  ],
  "merknad": "Valgene er svaret. Både sammenligningen per aksje ($0.27 mot $0.20) og kursets totalsum (37 mill. mot 20 mill.) godtas."
 },
 "ps1:9:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Share price after an equity issue",
    "verdi": 12.5,
    "enhet": "$ per share"
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "What should investors conclude if IST issues equity?",
  "kriterier": [
   "Concludes that investors read an equity issue as a sign that the shares are overvalued (true value $12.50), because from (a) only managers who know the value is $12.50 issue equity.",
   "Explains that the equity issue is a negative signal (the lemons problem), so the price falls to $12.50 and the overvalued firm cannot sell shares at $13.50."
  ]
 },
 "ps1:9:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Share price after a debt issue",
    "verdi": 14.5,
    "enhet": "$ per share",
    "alt": [
     14.3
    ]
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "What should investors conclude if IST issues debt?",
  "kriterier": [
   "Concludes that investors read a debt issue as a sign that the shares are undervalued (true value $14.50), because from (a) only managers who know the value is $14.50 accept the $20 m net cost of debt.",
   "Explains that the debt issue is a positive signal, so the price rises to the true value of $14.50 (or $14.30 after the $0.20 per share net cost of debt)."
  ],
  "merknad": "alt 14.30: kursen når netto kostnad ved gjeld (20 mill., $0.20 per aksje) trekkes fra den sanne verdien. Kursets løsning sier 14.50 og ser bort fra kostnaden."
 },
 "ps1:9:d": {
  "type": "tekst",
  "kriterier": [
   "Recognises that without distress costs debt has no cost (only tax benefits), so a firm that knows its shares are undervalued always borrows.",
   "Explains that equity would then be issued only by overvalued firms. Investors know this and buy equity only at the lowest possible value ($12.50), so there is no benefit from issuing equity.",
   "Concludes that all firms issue debt, whatever their true value."
  ]
 },
 "ps1:10:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Share price before the repurchase",
    "verdi": 50.0,
    "enhet": "$ per share"
   }
  ]
 },
 "ps1:10:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Share price if EV goes up",
    "verdi": 75.0,
    "enhet": "$ per share"
   },
   {
    "navn": "Share price if EV declines",
    "verdi": 25.0,
    "enhet": "$ per share"
   }
  ]
 },
 "ps1:10:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Share price if EV goes up",
    "verdi": 70.0,
    "enhet": "$ per share"
   },
   {
    "navn": "Share price if EV declines",
    "verdi": 30.0,
    "enhet": "$ per share"
   }
  ]
 },
 "ps1:10:d": {
  "type": "tekst",
  "kriterier": [
   "If good news is expected, repurchases before the news: the remaining shareholders end up with $75 rather than $70 because the shares are bought back cheaply at $50.",
   "If bad news is expected, repurchases after the news: the price ends at $30 rather than $25, because buying back at $50 before bad news overpays the selling shareholders.",
   "States the principle: management repurchases when the stock is undervalued, not when it is overvalued."
  ]
 },
 "ps1:10:e": {
  "type": "tekst",
  "kriterier": [
   "Predicts that the stock price rises when a repurchase is announced.",
   "Explains the signal: managers are better informed and time repurchases for before good news or after bad news, so investors read a repurchase as a sign that the stock is undervalued."
  ]
 },
 "ps1:11:a": {
  "type": "blandet",
  "tall": [
   {
    "navn": "α (fraction sold to new investors)",
    "verdi": 0.25,
    "enhet": "",
    "regnet": true
   },
   {
    "navn": "Payoff to existing shareholders, assets worth $50",
    "verdi": 67.5,
    "enhet": "$"
   },
   {
    "navn": "Payoff to existing shareholders, assets worth $150",
    "verdi": 142.5,
    "enhet": "$"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Given that investors believe that the firm always issues equity, does the manager want to issue equity if assets in place are worth $150?",
  "kriterier": [
   "Concludes that the manager does not issue equity when assets are worth $150: existing shareholders get 142.5 with the project against 150 without it (while the $50 type issues, since 67.5 > 50).",
   "Explains the mechanism: investors price the average firm (pooling), so the $150 firm's shares are underpriced and selling them transfers value from existing shareholders to new investors.",
   "Notes that the NPV of 5 (40 − 35) is too small to make up for this wealth transfer, so the $150 firm forgoes a positive-NPV project."
  ],
  "merknad": "α: fasiten skriver 1/4. Verdien 0.25 er det samme tallet som desimal; 25 (prosent) godtas også av motoren."
 },
 "ps1:11:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "α (fraction sold to new investors)",
    "verdi": 0.3888888888888889,
    "enhet": "",
    "regnet": true
   },
   {
    "navn": "Payoff to existing shareholders, assets worth $50",
    "verdi": 55.00000000000001,
    "enhet": "$"
   },
   {
    "navn": "Payoff to existing shareholders, assets worth $150",
    "verdi": 116.11111111111111,
    "enhet": "$"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "What does the manager do when he knows that assets in place are worth $150? Will he want to issue equity?",
  "kriterier": [
   "Concludes that the $150 manager does not issue equity: existing shareholders would get about 116.1 against 150 without issuing, so he passes up the project.",
   "Explains that this is an equilibrium: only the $50 type issues, so investors' beliefs are correct. An equity issue reveals that assets are worth $50, so the share price falls on the announcement (consistent with negative announcement returns).",
   "Notes that the $50 type's issue is fairly priced: new investors break even and existing shareholders gain exactly the NPV (55 − 50 = 5)."
  ],
  "merknad": "α: fasiten skriver 35/90. Verdien er samme brøk som desimal (0.3889)."
 },
 "ps1:11:c": {
  "type": "tekst",
  "kriterier": [
   "Recognises that the outcome in (b) is inefficient because the $150 firm forgoes a positive-NPV project, which gives it a reason to pay for certification.",
   "With assets worth $150, pays for certification: the shares are then fairly priced, so existing shareholders get 190 − 35 = 155 and 155 − 2 = 153 > 150, since the cost of 2 is below the NPV of 5.",
   "With assets worth $50, does not pay (willingness to pay is zero): this issue is already fairly priced in (b), so certification adds nothing.",
   "Notes that the decision to hire or not hire the auditor itself reveals the true value to the market."
  ],
  "merknad": "To ja/nei-svar. 153 mot 150 og betalingsvilje 0 ligger i kriteriene."
 },
 "ps1:12:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>E</sub>",
    "verdi": 10.0,
    "enhet": "%"
   }
  ]
 },
 "ps1:12:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Share price now (P<sub>0</sub>)",
    "verdi": 20.0,
    "enhet": "$ per share"
   },
   {
    "navn": "Firm value at the end of year 1 (after the dividend)",
    "verdi": 21.0,
    "enhet": "$ m",
    "alt": [
     21000000.0
    ]
   },
   {
    "navn": "Dividend per share at the end of year 1",
    "verdi": 1.0,
    "enhet": "$ per share"
   }
  ],
  "merknad": "Firmaverdien godtas også i hele dollar (21 000 000), slik fasiten oppgir den."
 },
 "ps1:12:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Firm value at the end of year 1",
    "verdi": 21.0,
    "enhet": "$ m",
    "alt": [
     21000000.0
    ]
   }
  ],
  "merknad": "Godtas også i hele dollar (21 000 000), slik fasiten oppgir den."
 },
 "ps1:12:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "New shares issued",
    "verdi": 166666.66666666666,
    "enhet": "shares",
    "alt": [
     0.16666666666666666
    ]
   },
   {
    "navn": "Price per share at the end of year 1",
    "verdi": 18.0,
    "enhet": "$ per share"
   }
  ],
  "merknad": "Antall nye aksjer godtas også i millioner (0.1667)."
 },
 "ps1:12:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Dividend per share for the original shareholders",
    "verdi": 4.0,
    "enhet": "$ per share"
   },
   {
    "navn": "Fraction of future dividends to the original shareholders",
    "verdi": 0.8571428571428571,
    "enhet": "",
    "regnet": true
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Briefly explain why the original shareholders keep this fraction of future dividends.",
  "kriterier": [
   "Explains that the extra $3 m of dividend is financed by selling about 166,667 new shares at $18, so the new shareholders own 1/7 of the 1,166,667 shares.",
   "Concludes that the original shareholders keep 6/7 of all future dividends from year 2 on: the higher dividend now is paid for by diluting their claim on later dividends.",
   "Notes that the new shareholders do not take part in the extra dividend they fund. They buy at the ex-dividend price of $18."
  ],
  "merknad": "Andelen: fasiten skriver 6/7. Verdien er samme brøk som desimal (0.857); 85.7 (prosent) godtas også av motoren."
 },
 "ps1:12:f": {
  "type": "tekst",
  "kriterier": [
   "Values the original shareholders' cash flows at t = 0: the $4 m dividend plus their 6/7 share of the $21 m firm value at the end of year 1 ($18 m), discounted at 10%: (4 + 18) / 1.1 = $20 m.",
   "Explains that the higher dividend is exactly offset by the dilution of future dividends, since the new shares are sold at a fair price of $18. There is no transfer of wealth.",
   "Concludes that dividend policy is irrelevant under MM: the original shareholders' wealth stays at $20 m."
  ]
 },
 "ps1:13:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Cum-dividend share price",
    "verdi": 42.0,
    "enhet": "$ per share"
   },
   {
    "navn": "Ex-dividend share price",
    "verdi": 40.0,
    "enhet": "$ per share"
   }
  ]
 },
 "ps1:13:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Shares repurchased",
    "verdi": 0.47619047619047616,
    "enhet": "m shares",
    "alt": [
     476190.47619047615
    ]
   },
   {
    "navn": "Future dividend per share",
    "verdi": 5.04,
    "enhet": "$ per share"
   },
   {
    "navn": "Share price after the repurchase",
    "verdi": 42.0,
    "enhet": "$ per share"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Show that this payout is equivalent to paying the dividend in (a).",
  "kriterier": [
   "Shows that the repurchase leaves shareholders as well off as the dividend in (a): the shares are bought back at the cum-dividend price of $42 and the remaining shares are still worth $42, while in (a) a shareholder holds $2 in cash plus a $40 share.",
   "Explains the mechanism: with fewer shares outstanding the future dividend per share rises from $4.80 to $5.04, which keeps the price at $42.",
   "Explains homemade dividends: in a perfect market investors can replicate either payout by selling shares or reinvesting dividends, so they are indifferent between dividends and repurchases."
  ],
  "merknad": "Antall aksjer godtas også i hele aksjer (476 190)."
 },
 "ps1:13:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Cum-dividend share price",
    "verdi": 42.0,
    "enhet": "$ per share"
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Show how the higher dividend is financed and that this policy is equivalent to (a) and (b).",
  "kriterier": [
   "Sets up the issue correctly: the dividend above the $20 m of cash is raised by selling new shares at the cum-dividend price of $42 and the new shareholders also receive the dividend. With the key's $48 m dividend this means 0.67 m new shares and $4.50 per share now and later. Any dividend size financed this way is accepted.",
   "Explains why the price stays at $42: the higher dividend today is offset by lower future dividends per share because of the dilution, while the new shares are sold at a fair price.",
   "Concludes that the three policies are equivalent in a perfect capital market: payout policy only trades off dividends now against dividends later, so in practice market imperfections such as taxes should determine it."
  ],
  "merknad": "Bare P_cum er med som tall, fordi størrelsen på utbyttet er studentens valg. Fasiten bruker 48 mill. (DPS $4.50 og 0.67 mill. nye aksjer), men alle valg gir $42."
 },
 "ps2:1:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Share price",
    "verdi": 50.0,
    "enhet": "$ per share"
   }
  ]
 },
 "ps2:1:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "New shares issued",
    "verdi": 250.0,
    "enhet": "shares"
   },
   {
    "navn": "Share price after the issue",
    "verdi": 40.0,
    "enhet": "$ per share"
   }
  ]
 },
 "ps2:1:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "New shares issued",
    "verdi": 111.11111111111111,
    "enhet": "shares"
   },
   {
    "navn": "Share price after the issue",
    "verdi": 90.0,
    "enhet": "$ per share"
   }
  ]
 },
 "ps2:1:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "New shares issued",
    "verdi": 111.11111111111111,
    "enhet": "shares"
   },
   {
    "navn": "Share price after the issue",
    "verdi": 90.0,
    "enhet": "$ per share"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Would their shareholders want to do this? Explain.",
  "kriterier": [
   "States that Okhtor's shareholders want to invest: under conjecture C the market reads the investment as a signal of the good state and values the firm at $100K, so the share price rises from $50 to $90.",
   "Explains where the gain comes from: the new shareholders pay $10K for shares in a firm that is really worth 0, so the old shareholders gain at the new shareholders' expense (a wealth transfer that is reversed when the truth comes out).",
   "Compares with not investing: the price would stay at $50 (if the market keeps its 50-50 belief) or drop to 0 (if staying out reveals the bad state under C), so investing is better either way. Either baseline is accepted."
  ]
 },
 "ps2:1:e": {
  "type": "tekst",
  "kriterier": [
   "States clearly that conjecture C is not rational: it is not an equilibrium because it does not match what the firms would actually do.",
   "Gives the mechanism from (d): if the market believes C, the bad type also gains from investing (its price goes to $90 instead of $50 or 0), so the bad type has an incentive to mimic the good type.",
   "Concludes that both types invest, so the investment reveals nothing about the state and the outcome is pooling rather than the separating outcome C assumes."
  ]
 },
 "ps2:2:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Net amount raised",
    "verdi": 93.0,
    "enhet": "$ m"
   }
  ],
  "merknad": "Netto etter spread (93). Brutto 100 godtas ikke: spørsmålet er hva firmaet får inn. Del (c) bygger også på 93."
 },
 "ps2:2:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Market value after the IPO",
    "verdi": 750,
    "enhet": "$ m"
   }
  ]
 },
 "ps2:2:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Share price at fair value",
    "verdi": 65.7,
    "enhet": "$ per share"
   }
  ]
 },
 "ps2:2:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "Total cost to the original investors",
    "verdi": 157.00000000000003,
    "enhet": "$ m"
   }
  ]
 },
 "ps2:3:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>wacc</sub>",
    "verdi": 8.49125,
    "enhet": "%"
   }
  ]
 },
 "ps2:3:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Project value V<sup>L</sup><sub>0</sub>",
    "verdi": 185.86272516081615,
    "enhet": "$ m",
    "alt": [
     85.86272516081615
    ]
   }
  ],
  "merknad": "«The value of a project» kan leses som V^L_0 = 185.86 (verdien av kontantstrømmene fra år 1) eller som NPV = 85.86 etter investeringen på 100. Fasiten gir begge, så NPV godtas som alt. Oppgaven oppgir ingen enhet; $ m som i læreboka."
 },
 "ps2:3:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "D<sub>0</sub>",
    "verdi": 46.46568129020403,
    "enhet": "$ m"
   },
   {
    "navn": "D<sub>1</sub>",
    "verdi": 37.91119845275848,
    "enhet": "$ m"
   },
   {
    "navn": "D<sub>2</sub>",
    "verdi": 16.130333091378333,
    "enhet": "$ m"
   }
  ],
  "merknad": "D_3 = 0 er utelatt (prosjektet er slutt). Gjeldskapasiteten er 25 % av V^L_t."
 },
 "ps2:4:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>U</sub>",
    "verdi": 9.025,
    "enhet": "%"
   }
  ]
 },
 "ps2:4:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>U</sup>",
    "verdi": 184.00611281206955,
    "enhet": "$ m"
   }
  ]
 },
 "ps2:4:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "TS<sub>1</sub>",
    "verdi": 0.992042295545856,
    "enhet": "$ m",
    "abs": 0.005
   },
   {
    "navn": "TS<sub>2</sub>",
    "verdi": 0.8094040869663934,
    "enhet": "$ m",
    "abs": 0.005
   },
   {
    "navn": "TS<sub>3</sub>",
    "verdi": 0.34438261150092736,
    "enhet": "$ m",
    "abs": 0.005
   },
   {
    "navn": "PV(TS)",
    "verdi": 1.8566123487466055,
    "enhet": "$ m"
   }
  ],
  "merknad": "abs 0.005 på skatteskjoldene så kursets avrunding til to desimaler (0.99, 0.81, 0.34) godtas; 0.34 er 1.3 % fra 0.3444. Kursets PV(TS) 1.85 ligger innenfor 1 %."
 },
 "ps2:4:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "APV = V<sup>U</sup> + PV(TS)",
    "verdi": 185.86272516081615,
    "enhet": "$ m"
   }
  ],
  "merknad": "At APV er lik WACC-verdien 185.86 fra 3(b) følger direkte av tallet."
 },
 "ps2:5:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>U</sup>",
    "verdi": 41.666666666666664,
    "enhet": "$ m"
   }
  ]
 },
 "ps2:5:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>L</sup>",
    "verdi": 45.0,
    "enhet": "$ m"
   }
  ]
 },
 "ps2:5:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Initial debt D",
    "verdi": 10.0,
    "enhet": "$ m"
   }
  ]
 },
 "ps2:5:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "d = D/V<sup>L</sup>",
    "verdi": 0.2222222222222222,
    "enhet": ""
   },
   {
    "navn": "r<sub>wacc</sub>",
    "verdi": 9.555555555555555,
    "enhet": "%"
   }
  ]
 },
 "ps2:5:e": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>L</sup> (WACC method)",
    "verdi": 45.0,
    "enhet": "$ m"
   }
  ]
 },
 "ps2:6:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>U</sup>",
    "verdi": 13856.812933025403,
    "enhet": "$"
   }
  ]
 },
 "ps2:6:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Interest next year",
    "verdi": 250.0,
    "enhet": "$"
   },
   {
    "navn": "Growth rate of interest",
    "verdi": 3.0,
    "enhet": "%"
   }
  ]
 },
 "ps2:6:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "PV(interest tax shield)",
    "verdi": 1154.7344110854501,
    "enhet": "$"
   }
  ]
 },
 "ps2:6:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>L</sup>",
    "verdi": 15011.547344110853,
    "enhet": "$"
   },
   {
    "navn": "Equity E",
    "verdi": 10011.547344110853,
    "enhet": "$"
   }
  ]
 },
 "ps2:6:e": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>wacc</sub>",
    "verdi": 10.993846153846153,
    "enhet": "%"
   }
  ]
 },
 "ps2:6:f": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>E</sub>",
    "verdi": 14.986159169550174,
    "enhet": "%"
   }
  ]
 },
 "ps2:6:g": {
  "type": "tall",
  "tall": [
   {
    "navn": "β<sub>E</sub>",
    "verdi": 1.6643598615916955,
    "enhet": ""
   },
   {
    "navn": "E/(D+E) β<sub>E</sub> + D/(D+E) β<sub>D</sub>",
    "verdi": 1.11,
    "enhet": ""
   }
  ],
  "merknad": "β_D = 0 fordi gjelden er risikofri. At summen blir β_A = 1.11 er selve «show that»; β_E er tallet som må regnes."
 },
 "ps2:6:h": {
  "type": "tall",
  "tall": [
   {
    "navn": "Equity cash flow in year 1 (FCFE)",
    "verdi": 1200.0,
    "enhet": "$"
   },
   {
    "navn": "Growth rate of FCFE",
    "verdi": 3.0,
    "enhet": "%"
   },
   {
    "navn": "E (FTE method)",
    "verdi": 10011.547344110855,
    "enhet": "$"
   }
  ],
  "merknad": "At FTE gir samme E som APV i (d) følger direkte av tallet. Kursets E = 10 000 (fra r_E = 15 %) ligger innenfor 1 %."
 },
 "ps2:7:a": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Value of GAP's equity to H&M",
    "verdi": 322.7272727272727,
    "enhet": "$ m",
    "alt": [
     247.7272727272727
    ]
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "State the additional assumptions you make.",
  "kriterier": [
   "States that H&M is used as the comparable because GAP is private and in the same business. H&M's equity beta is unlevered with net debt (excess cash of $100 million netted against the debt) and a debt beta of zero.",
   "States the debt policy and discounts the tax shield to match it: if debt grows with the firm at 5%, the tax shield has the risk of the assets and is a growing perpetuity at r_U; if the $250 million is held fixed forever, PV(TS) = τD. Either is accepted when stated.",
   "States what is subtracted to get equity: GAP's current debt of $150 million, because the extra $100 million borrowed after the deal accrues to H&M as the new owner.",
   "Treats the cut in NWC to $40 million as a gain only H&M can realise (a cash inflow in year 1) and lets all items grow at 5% from year 2, so the terminal value starts there."
  ],
  "merknad": "Fasiten lar gjelden vokse med 5 % (PV(TS) = 200, E = 322.7). Alt 247.7 er fasitens egen variant med fast gjeld på 250 for alltid (PV(TS) = τD = 125). Oppgaven ber om å oppgi antakelsene, så begge godtas."
 },
 "ps2:8:a": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Stand-alone value of Zola per share",
    "verdi": 21.767433173806474,
    "enhet": "$ per share",
    "alt": [
     33.52417582417584
    ]
   },
   {
    "navn": "Synergy value per share",
    "verdi": 4.400718870598747,
    "enhet": "$ per share",
    "alt": [
     5.8964386753309785
    ]
   },
   {
    "navn": "Maximum price per share",
    "verdi": 26.16815204440522,
    "enhet": "$ per share",
    "alt": [
     39.42061449950682
    ]
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "State the additional assumptions you make.",
  "kriterier": [
   "States how r_U is chosen: both firms make cheese, so the equity betas are unlevered (Zola with a debt beta of 0.25 from the A-rated yield spread, Gorgon with its $425 million excess cash at beta 0) and averaged. Using Zola's own asset beta instead is accepted when stated.",
   "States the leverage assumption and what follows from it: Zola stays at its optimal debt ratio with interest growing at 3%, so the tax shields have the risk of the assets and are discounted at r_U. The synergies add no debt capacity, so they get no tax shield.",
   "States how FCF is read from the pro forma statements: capex is the change in PPE plus depreciation, NWC uses operating items only (all cash is operating and interest-bearing debt is financing) and the non-deductible amortization is left out because it is neither a cash flow nor a tax deduction."
  ],
  "merknad": "Hovedverdiene bruker snittet av eiendelsbetaene (1.6683, r_U = 15.01 %) som kurset. Alt er fasitens følsomhet med bare Zolas egen eiendelsbeta (1.1833, r_U = 12.1 %): 33.52, 5.90 og 39.42 per aksje. Kursets regneark ($25.86) godtas ikke: det bruker r_f = 5.2 % og trekker kortsiktig gjeld fra i NWC, se fasiten."
 },
 "ps2:9:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>L</sup> (APV)",
    "verdi": 21.181818181818183,
    "enhet": "$ m"
   },
   {
    "navn": "r<sub>wacc</sub>",
    "verdi": 9.44206008583691,
    "enhet": "%"
   }
  ],
  "merknad": "At WACC-metoden gir samme verdi (2 / r_wacc = 21.18) følger direkte av tallene."
 },
 "ps3:1:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Stock price, up state",
    "verdi": 75.0,
    "enhet": "$"
   },
   {
    "navn": "Stock price, down state",
    "verdi": 48.0,
    "enhet": "$"
   },
   {
    "navn": "Lending $1, both states",
    "verdi": 1.1,
    "enhet": "$"
   }
  ],
  "merknad": "Treet føres inn som tallene i nodene (60 × 1.25, 60 × 0.80 og 1 × 1.10), så det rettes automatisk."
 },
 "ps3:1:b": {
  "type": "tekst",
  "kriterier": [
   "Writes the cost as 60Δ + B: Δ shares bought at today's price of $60 plus the B dollars lent today.",
   "Treats both terms as paid today, so a short position (Δ < 0) or borrowing (B < 0) brings money in and lowers the cost."
  ]
 },
 "ps3:1:c": {
  "type": "tekst",
  "kriterier": [
   "Starts the tree at the cost from (b), 60Δ + B.",
   "Up state: 75Δ + 1.1B. Down state: 48Δ + 1.1B.",
   "Explains how the end values are built: the Δ shares take the stock price in each state from (a) while the loan grows to 1.1B in both states."
  ]
 },
 "ps3:1:d": {
  "type": "tekst",
  "kriterier": [
   "Computes the put's payoffs at maturity: max(66 − 75, 0) = 0 in the up state and max(66 − 48, 0) = 18 in the down state.",
   "Sets the portfolio equal to the put in each state: 75Δ + 1.1B = 0 and 48Δ + 1.1B = 18.",
   "Explains the replication logic: the portfolio must pay exactly what the put pays in both states, so two states give two equations for the two unknowns."
  ]
 },
 "ps3:1:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Δ (shares bought)",
    "verdi": -0.6666666666666666,
    "enhet": "",
    "regnet": true,
    "merknad": "Fasiten skriver Δ = −2/3 som brøk, som kontrollen ikke leser som desimaltall."
   },
   {
    "navn": "B (amount lent)",
    "verdi": 45.45454545454545,
    "enhet": "$"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "In words, what is your portfolio?",
  "kriterier": [
   "Describes the portfolio in words: sell short 2/3 of a share and lend $45.45 at the risk-free rate (B > 0 means lending).",
   "Explains why the stock position is short: the put pays more when the stock falls, so the replicating portfolio must lose value when the stock rises.",
   "Explains how the lending makes the payoffs match: the loan pays 50 in both states, which offsets the short position (−50) in the up state and leaves 18 (−32 + 50) in the down state."
  ]
 },
 "ps3:1:f": {
  "type": "tall",
  "tall": [
   {
    "navn": "Put price P",
    "verdi": 5.454545454545453,
    "enhet": "$"
   }
  ]
 },
 "ps3:1:g": {
  "type": "tall",
  "tall": [
   {
    "navn": "Black-Scholes put price P",
    "verdi": 5.255437505078014,
    "enhet": "$",
    "alt": [
     5.10396410011721
    ]
   }
  ],
  "merknad": "Kurset bruker PV(K) = K/(1 + r)^T, som gir 5.2554. Leses 10 % som kontinuerlig rente (PV(K) = 66e^(−0.1) = 59.72), blir putten 5.1040. Det godtas som alt. «Something else» er put-call-pariteten."
 },
 "ps3:2:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Share price S<sub>0</sub>",
    "verdi": 200.00000000000003,
    "enhet": "$ per share"
   }
  ]
 },
 "ps3:2:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Δ (shares bought)",
    "verdi": 0.65,
    "enhet": ""
   },
   {
    "navn": "B (amount lent, negative = borrowing)",
    "verdi": -100.0,
    "enhet": "$"
   }
  ],
  "merknad": "Fortegn som i oppgave 1: Δ er aksjer kjøpt og B er beløp lånt ut. Kjøp 0.65 aksjer og lån $100 gir Δ = 0.65 og B = −100. Retningen ligger i fortegnet, så typen er tall."
 },
 "ps3:2:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Call price C",
    "verdi": 30.00000000000003,
    "enhet": "$"
   }
  ]
 },
 "ps3:2:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "β<sub>C</sub>",
    "verdi": 3.249999999999998,
    "enhet": ""
   },
   {
    "navn": "r<sub>C</sub> (expected return)",
    "verdi": 29.99999999999999,
    "enhet": "%"
   }
  ]
 },
 "ps3:2:e": {
  "type": "tekst",
  "kriterier": [
   "Computes the expected payoff of the call with the true probabilities: 0.5 × 78 + 0.5 × 0 = 39.",
   "Discounts at the call's expected return of 30% from (d), not at the risk-free rate or the stock's 15%: 39 / 1.30 = 30.",
   "Concludes that this equals the price from (c) and explains why: the 30% rate reflects the call's leveraged risk (beta 3.25), so CAPM discounting and replication give the same value."
  ]
 },
 "ps3:3:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Call value C",
    "verdi": 8.503803246980205,
    "enhet": "$"
   }
  ],
  "merknad": "Kontinuerlig rente gir 8.5388, innenfor 1 %."
 },
 "ps3:3:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "C at S = 61",
    "verdi": 9.136956154084508,
    "enhet": "$"
   },
   {
    "navn": "Change in C from (a)",
    "verdi": 0.6331529071043036,
    "enhet": "$",
    "abs": 0.01
   }
  ],
  "merknad": "Endringen har abs 0.01 fordi den ofte regnes som differansen mellom avrundede priser. Med kontinuerlig rente ligger prisen innenfor 1 %."
 },
 "ps3:3:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "C at σ = 31%",
    "verdi": 8.73176288642382,
    "enhet": "$"
   },
   {
    "navn": "Change in C from (a)",
    "verdi": 0.22795963944361475,
    "enhet": "$",
    "abs": 0.01
   }
  ],
  "merknad": "Endringen har abs 0.01 fordi den ofte regnes som differansen mellom avrundede priser. Med kontinuerlig rente ligger prisen innenfor 1 %."
 },
 "ps3:3:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "C at r = 6%",
    "verdi": 8.779453214717748,
    "enhet": "$"
   },
   {
    "navn": "Change in C from (a)",
    "verdi": 0.275649967737543,
    "enhet": "$",
    "abs": 0.01,
    "alt": [
     0.29149058058208155
    ]
   }
  ],
  "merknad": "Endringen har abs 0.01 fordi den ofte regnes som differansen mellom avrundede priser. Med kontinuerlig rente blir endringen 0.2915 (godtas som alt) og prisen 8.8302, innenfor 1 %."
 },
 "ps3:3:e": {
  "type": "tall",
  "tall": [
   {
    "navn": "C with 11 months left",
    "verdi": 8.094520006779703,
    "enhet": "$"
   },
   {
    "navn": "Change in C from (a)",
    "verdi": -0.40928324020050155,
    "enhet": "$",
    "abs": 0.01
   }
  ],
  "merknad": "Endringen har abs 0.01 fordi den ofte regnes som differansen mellom avrundede priser. Med kontinuerlig rente ligger prisen innenfor 1 %."
 },
 "ps3:3:f": {
  "type": "tall",
  "tall": [
   {
    "navn": "C after the $1 dividend",
    "verdi": 7.89175431770709,
    "enhet": "$"
   },
   {
    "navn": "Change in C from (a)",
    "verdi": -0.612048929273115,
    "enhet": "$",
    "abs": 0.01
   }
  ],
  "merknad": "Endringen har abs 0.01 fordi den ofte regnes som differansen mellom avrundede priser. Med kontinuerlig rente ligger prisen innenfor 1 %."
 },
 "ps3:4:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "E[R] (expected return on the stock)",
    "verdi": 19.999999999999996,
    "enhet": "%"
   }
  ]
 },
 "ps3:4:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "ρ (risk-neutral probability of an increase)",
    "verdi": 0.25,
    "enhet": "",
    "regnet": true,
    "merknad": "Fasiten skriver 25 %, som kontrollen ikke leser som 0.25. Motoren godtar både 0.25 og 25."
   }
  ]
 },
 "ps3:4:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Call value C",
    "verdi": 1.1904761904761905,
    "enhet": "$"
   }
  ]
 },
 "ps3:4:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "E[R<sub>C</sub>] (expected return on the call)",
    "verdi": 110.00000000000001,
    "enhet": "%"
   }
  ]
 },
 "ps3:4:e": {
  "type": "tall",
  "tall": [
   {
    "navn": "Put value P",
    "verdi": 5.0,
    "enhet": "$"
   }
  ]
 },
 "ps3:4:f": {
  "type": "tall",
  "tall": [
   {
    "navn": "E[R<sub>P</sub>] (expected return on the put)",
    "verdi": -30.000000000000004,
    "enhet": "%"
   }
  ]
 },
 "ps3:5:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Call price C",
    "verdi": 23.325050906418667,
    "enhet": "$"
   }
  ],
  "merknad": "Kursets 23.29 (N avrundet til tre desimaler), kontinuerlig rente (23.36) og T = 0.25 (23.38) ligger alle innenfor 1 %."
 },
 "ps3:5:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Put price P",
    "verdi": 1.8116157484620317,
    "enhet": "$"
   }
  ],
  "merknad": "Fire desimaler i N gir 1.81 og kontinuerlig rente 1.80, begge innenfor 1 %. Kursets 1.78 bygger på callprisen 23.29 og godtas ikke, i tråd med fasiten."
 },
 "ps3:6:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Rate on the debt (yield to maturity)",
    "verdi": 12.295413090128271,
    "enhet": "%"
   }
  ],
  "merknad": "Effektiv årlig rente med T = 1.5 og midtkurs, som i fasiten. Kredittspreaden er ikke spurt om."
 },
 "ps3:6:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Rate on the junior debt (yield to maturity)",
    "verdi": 35.92951286421171,
    "enhet": "%"
   }
  ],
  "merknad": "Kursets 36.1 % (seniorgjelden avrundet til 87.4) ligger innenfor 1 %."
 },
 "ps3:7:a": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Maturity T",
    "verdi": 5,
    "enhet": "years"
   },
   {
    "navn": "Value of the underlying",
    "verdi": 750.0,
    "enhet": "$ m"
   },
   {
    "navn": "Strike price K",
    "verdi": 402.6275000000001,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 3,
  "tekstLedd": "Describe Wesley's equity as a call option.",
  "kriterier": [
   "Describes the equity as a European call option on the firm's assets with a strike equal to the face value of the debt, maturing when the debt matures.",
   "Explains the payoff at maturity: the shareholders get max(V_5 − 402.6, 0), what is left of the assets after the debt is repaid.",
   "Explains the option feature: with limited liability the shareholders can walk away if the assets are worth less than the face value, so they repay the debt (exercise) only when V_5 > 402.6."
  ]
 },
 "ps3:7:b": {
  "type": "tekst",
  "kriterier": [
   "Describes the debt as a long position in the firm's assets plus a short position in the call from (a), with strike $402.6M (the face value) and a 5-year maturity.",
   "Shows the payoff at maturity: V_5 − max(V_5 − 402.6, 0) = min(V_5, 402.6).",
   "Explains the logic: the creditors own the assets but have in effect sold the shareholders the right to buy them back for the face value, so the creditors get at most 402.6."
  ]
 },
 "ps3:7:c": {
  "type": "tekst",
  "kriterier": [
   "Describes the debt as a long risk-free zero-coupon bond with face value $402.6M maturing in 5 years plus a short put on the firm's assets with strike $402.6M and the same maturity (the face value, not today's market value of 250).",
   "Shows the payoff at maturity: 402.6 − max(402.6 − V_5, 0) = min(V_5, 402.6).",
   "Explains that the short put is the default risk: if V_5 is below 402.6 the shareholders hand the assets over to the creditors, who receive only V_5 instead of the face value."
  ]
 },
 "ps3:8:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV",
    "verdi": 2.7272727272727266,
    "enhet": "$ m"
   }
  ]
 },
 "ps3:8:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "NPV with the study",
    "verdi": 3.045454545454545,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Should you commission this study?",
  "kriterier": [
   "Concludes that you should commission the study, comparing the NPV with the study with the NPV of investing now from (a) (2.73), not with zero.",
   "Explains the decision in year 1: invest only if demand is high (worth 10 at year 1) and skip the project if demand is low (−4.55), so the study turns the investment into an option.",
   "Explains why it pays: avoiding the low-demand state is worth more than the $1.5M cost and the one-year delay. Optional: the study is worth up to 4.55 − 2.73 = $1.82M."
  ]
 },
 "ps3:8:c": {
  "type": "tekst",
  "kriterier": [
   "Answers no: you still commission the study. It only becomes more valuable.",
   "Explains that investing now is unaffected when only the spread increases: the expected cash flow is unchanged, so the NPV from (a) is unchanged.",
   "Explains the asymmetry: the higher cash flow in the high state raises the value of the study, while the lower cash flow in the low state does not matter because you do not invest then.",
   "Links it to option theory: more volatility raises the value of the option the study gives, just as for a call."
  ]
 },
 "ps3:9:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV (invest today)",
    "verdi": 250.0,
    "enhet": "$ m"
   }
  ]
 },
 "ps3:9:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "NPV of waiting (as of year 0)",
    "verdi": 238.63636363636363,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Is he better or worse off than when he invested at 0? Explain the intuition.",
  "kriterier": [
   "Concludes that he is worse off waiting (238.6 < 250), so the CEO should invest today.",
   "Explains the cost of waiting: he loses the early cash flows, since the project starts a year later (the year-1 cash flow, 50 expected).",
   "Explains that the value of the information (avoiding the $250M investment, or the expected loss, if the lawsuit succeeds) is too small to make up for the lost early cash flows. Optional: that state has a probability of only 5%."
  ]
 },
 "ps3:9:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "NPV of investing today (p = 0.3)",
    "verdi": 250.0,
    "enhet": "$ m"
   },
   {
    "navn": "NPV of waiting (p = 0.3)",
    "verdi": 261.3636363636363,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Does this change your answer to question (b)? Explain the intuition.",
  "kriterier": [
   "Concludes yes: now it pays to wait, since 261.4 > 250.",
   "Explains that the cash flows are now more volatile, which raises the value of the information. Optional: the expected cash flow is still 50, so investing today still gives 250.",
   "Links it to options: more volatility raises the value of the option to wait, just as a call rises in value with the volatility of the underlying asset."
  ]
 },
 "ps3:9:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "NPV of investing today (reversible)",
    "verdi": 284.09090909090907,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "How will this affect the timing of your investment? Explain the intuition.",
  "kriterier": [
   "Concludes that you now invest today, because 284.1 exceeds the 261.4 from waiting in (c).",
   "Explains that the value of waiting came from avoiding the investment in the bad state. Reversibility makes this option worth much less, since you get the $250M back in the bad state even if you invest now.",
   "Optional: investing now also keeps the early cash flows that waiting gives up."
  ],
  "merknad": "Verdien av å vente er uendret (261.4), fordi du uansett ikke investerer i den dårlige tilstanden når du venter."
 },
 "ps3:10:a": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Value today (best method)",
    "verdi": 24.0,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Which method would you use?",
  "kriterier": [
   "Chooses method 1 (the normal method), since it gives $24M against 2 × (60 − 52) = $16M for the careful method.",
   "Explains the trade-off: method 2 doubles the barrels but cuts the margin per barrel from $24 to $8, so at today's price the lower margin outweighs the extra volume."
  ]
 },
 "ps3:10:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Oil price, up state",
    "verdi": 72.0,
    "enhet": "$"
   },
   {
    "navn": "Oil price, down state",
    "verdi": 48.0,
    "enhet": "$"
   }
  ],
  "merknad": "Treet føres inn som tallene i nodene (60 × 1.2 og 60 × 0.8), så det rettes automatisk."
 },
 "ps3:10:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Up (72), method 1",
    "verdi": 36.0,
    "enhet": "$ m"
   },
   {
    "navn": "Up (72), method 2",
    "verdi": 40.0,
    "enhet": "$ m"
   },
   {
    "navn": "Down (48), method 1",
    "verdi": 12.0,
    "enhet": "$ m"
   },
   {
    "navn": "Down (48), method 2",
    "verdi": -8.0,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "At each end-point, which extraction method is optimal?",
  "kriterier": [
   "Picks method 2 (the careful method) in the up state at $72, since 40 > 36.",
   "Picks method 1 (the normal method) in the down state at $48, since 12 > −8. Method 2 loses money there because $48 is below its cost of $52 per barrel.",
   "Explains the pattern: the extra barrels from method 2 pay off only when the price is well above its $52 cost, so a high price favours volume and a low price favours the cheap method."
  ],
  "merknad": "Fasiten viser en tabell, men spørsmålet ber om verdiene, så de rettes som tall. Valget av metode er tekstdelen."
 },
 "ps3:10:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "PV of extracting next year",
    "verdi": 29.999999999999996,
    "enhet": "$ m"
   }
  ]
 },
 "ps3:10:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Value of the option to wait",
    "verdi": 5.9999999999999964,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "Is it better to extract the oil today or to wait until next year?",
  "kriterier": [
   "Concludes that it is better to wait, comparing the PV of waiting ($30M) with extracting today ($24M).",
   "Explains where the value comes from: waiting lets you choose the extraction method after the price is known (method 2 if the price rises, method 1 if it falls)."
  ]
 },
 "ps4:1:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "X (new V shares, offer of 53.7)",
    "verdi": 27.811230000000002,
    "enhet": "bn shares"
   },
   {
    "navn": "y (offer of 53.7)",
    "verdi": 47.204700640214085,
    "enhet": "%"
   },
   {
    "navn": "y (revised offer of 58.96)",
    "verdi": 49.53795226194568,
    "enhet": "%"
   }
  ]
 },
 "ps4:1:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Payoff if the deal goes through",
    "verdi": 269.9411396627738,
    "enhet": "€"
   },
   {
    "navn": "Payoff if the deal fails",
    "verdi": 190.28813966277377,
    "enhet": "€"
   }
  ],
  "merknad": "Lysbildets 190.261 (gjenkjøp 225.03 i stedet for 225.003) og tavlas 190 ligger innenfor standardtoleransen på 1 %. Det gjør også enkel rente (1 + 0.055/4) og kontinuerlig rente."
 },
 "ps4:1:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "p (implied probability of success)",
    "verdi": 0.5883651733955649,
    "enhet": "",
    "tol": 0.005
   }
  ],
  "merknad": "tol 0.005 skiller riktig metode fra å glemme r_f: uten diskontering blir p = 0.5938, som 1 % ville godtatt. Lysbildets 0.5885, enkel rente (0.5883) og 59 % godtas."
 },
 "ps4:1:d": {
  "type": "tekst",
  "kriterier": [
   "Explains that the spread between the offer value (266) and the Mannesmann price (234) reflects the probability that the deal goes through, the synergies and the stand-alone values: if the deal fails, the price falls back towards the stand-alone value.",
   "Explains that merger arbitrage is not riskless arbitrage: the long Mannesmann, short Vodafone position pays more than its cost if the deal succeeds but loses if it fails, so the arbitrageur bears the deal risk.",
   "Explains that shareholders who sell their Mannesmann shares before the outcome is known buy insurance against the deal failing. The spread is the price of that insurance.",
   "Explains that arbitrage traders provide liquidity and insurance against deal risk and spread their own risk across many deals, a strategy that has historically been profitable (Mitchell and Pulvino, 2001)."
  ]
 },
 "ps4:1:e": {
  "type": "tall",
  "tall": [
   {
    "navn": "Minimum synergies S",
    "verdi": 41.25228870000002,
    "enhet": "€ bn"
   }
  ]
 },
 "ps4:2:a": {
  "type": "tekst",
  "kriterier": [
   "Derives NPV_A = (A + T + S) − P − A = S − (P − T): the acquirer gets the synergies minus the premium it pays over the target's stand-alone value.",
   "Derives NPV_T = P − T (the premium) and shows that the two NPVs sum to S whatever the price.",
   "Explains that the price only decides how the synergies are split: the target gets the premium P − T and the acquirer the rest, with P set by bargaining power.",
   "Notes the evidence that targets capture most of the gain (about 15% abnormal return at the announcement against about 1% for acquirers)."
  ]
 },
 "ps4:2:b": {
  "type": "tekst",
  "kriterier": [
   "Derives NPV_A = (1 − y)(A + T + S) − A and NPV_T = y(A + T + S) − T, which again sum to S.",
   "Explains that with stock the acquirer's cost y(A + T + S) − T depends on the synergies, because the target shareholders own a fraction of the combined firm and so of the synergies.",
   "Contrasts this with cash, where the cost P − T does not depend directly on S (although P may still be a function of S).",
   "Explains that a stock swap therefore dampens the effect of mispricing: if the synergies turn out smaller than expected, the target shareholders share the loss."
  ]
 },
 "ps4:2:c": {
  "type": "tekst",
  "kriterier": [
   "Sets up the acquirer's condition N_A / (N_A + X) × (A + T + S) ≥ A: the old shareholders' stake in the new firm must be worth at least their stand-alone firm.",
   "Solves the condition to the maximum number of new shares X ≤ N_A (T + S) / A.",
   "Divides by N_T and uses A = N_A P_A and T = N_T P_T to get the maximum exchange ratio ER = X / N_T ≤ (P_T / P_A)(1 + S/T).",
   "Explains that without synergies the maximum exchange ratio is the price ratio P_T / P_A, so the synergies are what leave room for a premium."
  ]
 },
 "ps4:2:d": {
  "type": "tekst",
  "kriterier": [
   "Names at least three determinants of the choice, for example the acquirer's liquidity and debt capacity, asymmetric information, uncertainty about the synergies and stand-alone values, the seller's need for cash or tax position and timing.",
   "States that an acquirer that believes its own stock is overvalued prefers to pay with stock (and with cash if it is undervalued), because overvalued shares hand the target less real value.",
   "Explains that the choice reveals information: a stock offer is read as a signal that the acquirer's stock is overvalued, so its price falls, the same mechanism as in an equity issue (Myers-Majluf)."
  ]
 },
 "ps4:3:a": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Total value, no deal",
    "verdi": 310,
    "enhet": ""
   },
   {
    "navn": "Total value, A buys D",
    "verdi": 315,
    "enhet": ""
   },
   {
    "navn": "Total value, B buys D",
    "verdi": 315,
    "enhet": ""
   },
   {
    "navn": "Total value, C buys D",
    "verdi": 320,
    "enhet": ""
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Which acquisition creates the most value? Why?",
  "kriterier": [
   "Identifies C's acquisition of D as the one that creates the most value (total 320 against 315 when A or B buys).",
   "Explains that the buyer and D gain the same 30 together whichever bank buys, so the difference comes from the effect on the competing banks.",
   "Explains that an acquisition by A or B lowers the rivals' value by 25, while an acquisition by C lowers it by only 20."
  ],
  "merknad": "blandet fordi fasiten forklarer hvorfor C skaper mest verdi (lik synergi på 30, minst skade på konkurrentene), ikke bare at 320 er størst."
 },
 "ps4:3:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "A's willingness to pay",
    "verdi": 90,
    "enhet": ""
   },
   {
    "navn": "B's willingness to pay",
    "verdi": 90,
    "enhet": ""
   },
   {
    "navn": "C's willingness to pay",
    "verdi": 90,
    "enhet": ""
   }
  ]
 },
 "ps4:3:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "A's willingness to pay",
    "verdi": 100,
    "enhet": ""
   },
   {
    "navn": "B's willingness to pay",
    "verdi": 100,
    "enhet": ""
   },
   {
    "navn": "C's willingness to pay",
    "verdi": 105,
    "enhet": ""
   },
   {
    "navn": "Price paid for D",
    "verdi": 100,
    "enhet": ""
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Who wins the bidding? Why is the price higher than in (b)?",
  "kriterier": [
   "Identifies C as the winner, because C's willingness to pay (105) exceeds A's and B's (100).",
   "Explains that the price is set where A and B drop out (about 100), not at C's own willingness to pay of 105.",
   "Explains that willingness to pay rises from 90 because each bank's alternative is now a rival owning D, which lowers its own value: bidding depends on the alternatives."
  ],
  "merknad": "Prisen er nest høyeste betalingsvilje (stigende auksjon), som i fasiten («om lag 100»)."
 },
 "ps4:3:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Change for A",
    "verdi": -10,
    "enhet": ""
   },
   {
    "navn": "Change for B",
    "verdi": -10,
    "enhet": ""
   },
   {
    "navn": "Change for C",
    "verdi": -10,
    "enhet": ""
   },
   {
    "navn": "Change for D",
    "verdi": 40,
    "enhet": ""
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Who wins and who loses? Interpret the result.",
  "kriterier": [
   "States that D's shareholders are the only winners and that all three bidders, the winner C included, lose relative to their stand-alone values.",
   "Explains that D's gain (40) exceeds the total value created (10), so the target captures more than the whole gain and the bidders bear the difference.",
   "Explains that C still buys because its alternative is not its stand-alone value but a rival owning D (55), so winning at 100 leaves C better off than losing the auction.",
   "Links the result to the evidence that target shareholders capture most of the gains from acquisitions."
  ],
  "merknad": "Endring mot verdien alene, etter kjøpesummen på 100. C er −10 mot verdien alene (+5 mot 55 hvis en konkurrent hadde vunnet); spørsmålet ber om verdien alene, så +5 godtas ikke."
 },
 "ps4:4:a": {
  "type": "tekst",
  "kriterier": [
   "Explains that the joint bond is a claim on the cash flows of both firms, so a shortfall in one firm can be covered by the other.",
   "Names this the coinsurance effect: each firm in effect guarantees the other's debt.",
   "Concludes that the lower probability of default makes lenders demand a lower yield."
  ]
 },
 "ps4:4:b": {
  "type": "tekst",
  "kriterier": [
   "States that the firms' cash flows must not be perfectly positively correlated.",
   "Explains why: with perfect correlation both firms do badly in the same states, so merging does not reduce the default risk.",
   "Explains that a lower correlation gives a larger reduction in risk and points out that A and B move in opposite directions in the table (A strong in state 1, B in state 2)."
  ]
 },
 "ps4:4:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Debt A",
    "verdi": 25.0,
    "enhet": "$ m"
   },
   {
    "navn": "Equity A",
    "verdi": 25.0,
    "enhet": "$ m"
   },
   {
    "navn": "Debt B",
    "verdi": 12.5,
    "enhet": "$ m"
   },
   {
    "navn": "Equity B",
    "verdi": 12.5,
    "enhet": "$ m"
   },
   {
    "navn": "Debt AB",
    "verdi": 45.0,
    "enhet": "$ m"
   },
   {
    "navn": "Equity AB",
    "verdi": 30.0,
    "enhet": "$ m"
   }
  ],
  "merknad": "Seks tall fordi oppgaven ber om gjeld og egenkapital for A, B og AB. Enheten er $ m som i lysbildet (obligasjoner på $50M)."
 },
 "ps4:4:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Change in equity value",
    "verdi": -7.5,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 1,
  "tekstLedd": "How does the reduction in risk affect shareholders? Explain.",
  "kriterier": [
   "Explains that with no synergies the firm value is unchanged, so the creditors' gain is a pure transfer from the shareholders: the coinsurance effect.",
   "Explains the mechanism: equity is a call option on the firm's assets. Lower asset risk makes that call less valuable, while the old debt was priced before the merger.",
   "Concludes that risk reduction is no good reason for shareholders to merge, since they can diversify themselves by holding both stocks.",
   "Notes that shareholders can win back the transfer by borrowing more after the merger and paying out the proceeds, which also gives a larger tax shield."
  ],
  "merknad": "Bare aksjonærenes endring (−7.5) er tall, siden spørsmålet gjelder aksjonærene. Kreditorenes +7.5 og uendret firmaverdi ligger i kriteriene."
 },
 "v2021:1:1": {
  "type": "bokstav",
  "svar": "D"
 },
 "v2021:1:2": {
  "type": "bokstav",
  "svar": "B"
 },
 "v2021:1:3": {
  "type": "bokstav",
  "svar": "D"
 },
 "v2021:1:4": {
  "type": "bokstav",
  "svar": "A"
 },
 "v2021:1:5": {
  "type": "bokstav",
  "svar": "D"
 },
 "v2021:1:6": {
  "type": "bokstav",
  "svar": "C"
 },
 "v2021:1:7": {
  "type": "bokstav",
  "svar": "B"
 },
 "v2021:1:8": {
  "type": "bokstav",
  "svar": "C"
 },
 "v2021:1:9": {
  "type": "bokstav",
  "svar": "A"
 },
 "v2021:1:10": {
  "type": "bokstav",
  "svar": "B"
 },
 "v2021:2:a": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Existing shareholders' payoff, debt",
    "verdi": 130.0,
    "enhet": "$"
   },
   {
    "navn": "Existing shareholders' payoff, equity",
    "verdi": 130.0,
    "enhet": "$"
   }
  ],
  "tallPoeng": 6,
  "tekstLedd": "Will the manager undertake the new investment? Will he prefer 100% debt or 100% equity financing? Briefly comment.",
  "merknad": "Valget (investere, likegyldig mellom gjeld og egenkapital) og kommentaren er tekstdelen. Ingen investering gir 125."
 },
 "v2021:2:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Existing shareholders' payoff, debt",
    "verdi": 205.0,
    "enhet": "$"
   },
   {
    "navn": "Existing shareholders' payoff, equity",
    "verdi": 195.0,
    "enhet": "$"
   }
  ],
  "tallPoeng": 6,
  "tekstLedd": "Will the manager undertake the project? Will he prefer 100% debt or 100% equity financing? Briefly comment."
 },
 "v2021:2:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Existing shareholders' payoff, debt",
    "verdi": 55.0,
    "enhet": "$"
   },
   {
    "navn": "Existing shareholders' payoff, equity",
    "verdi": 65.0,
    "enhet": "$"
   }
  ],
  "tallPoeng": 6,
  "tekstLedd": "Will the manager undertake the project? Will he prefer 100% debt or 100% equity financing? Briefly comment."
 },
 "v2021:2:d": {
  "type": "tekst"
 },
 "v2021:3:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Firm value",
    "verdi": 150.0,
    "enhet": "$"
   },
   {
    "navn": "Equity",
    "verdi": 25.0,
    "enhet": "$"
   },
   {
    "navn": "Debt",
    "verdi": 125.0,
    "enhet": "$"
   }
  ]
 },
 "v2021:3:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "NPV<sub>A</sub>",
    "verdi": 10.0,
    "enhet": "$"
   },
   {
    "navn": "NPV<sub>B</sub>",
    "verdi": -30.0,
    "enhet": "$"
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Would the current shareholders be willing to provide the $30 for the investment? Briefly discuss."
 },
 "v2021:3:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "E<sub>A</sub> (face value 128)",
    "verdi": 62.0,
    "enhet": "$"
   },
   {
    "navn": "E<sub>B</sub> (face value 128)",
    "verdi": 61.0,
    "enhet": "$"
   },
   {
    "navn": "Debt value with project A (face value 128)",
    "verdi": 128.0,
    "enhet": "$"
   }
  ],
  "tallPoeng": 6,
  "tekstLedd": "Will the manager be able to raise $30? Which project would she choose? Will the debt holders accept the new contract? Briefly discuss.",
  "merknad": "Tallene er egenkapitalverdiene og gjeldsverdien som de tre ja/nei-svarene bygger på."
 },
 "v2021:4:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "FCF<sub>1</sub>",
    "verdi": 64.0,
    "enhet": "$ m"
   }
  ]
 },
 "v2021:4:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>U</sub>",
    "verdi": 14.000000000000002,
    "enhet": "%"
   }
  ]
 },
 "v2021:4:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Tax shield TS<sub>1</sub>",
    "verdi": 18.0,
    "enhet": "$ m"
   }
  ]
 },
 "v2021:4:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "V<sup>L</sup> at t = 0",
    "verdi": 1120.0,
    "enhet": "$ m",
    "alt": [
     1240.0
    ]
   }
  ],
  "tallPoeng": 10,
  "tekstLedd": "State your assumptions: the debt policy and the discount rate for the tax shield.",
  "merknad": "1120 med skattefordelen diskontert til r_U (konstant gjeldsgrad). 1240 med fast gjeldsplan diskontert til r_D godtas også i løsningen når antakelsen er oppgitt; tekstdelen sjekker at antakelse og tall henger sammen."
 },
 "v2021:5:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV of investing today",
    "verdi": -2.5377896574600083,
    "enhet": "$ m"
   },
   {
    "navn": "Value of the patent today",
    "verdi": 0.0,
    "enhet": "$ m",
    "abs": 0.01
   }
  ],
  "merknad": "Oppgaven spør bare etter verdien av patentet, som er 0. NPV-en (−2.5378) er tatt med fordi svaret 0 ellers kan gis uten regning. Kriteriene gir den eget poeng."
 },
 "v2021:5:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Value at date 1 if rates rise to 10%",
    "verdi": 0.0,
    "enhet": "$ m",
    "abs": 0.01
   },
   {
    "navn": "Value at date 1 if rates fall to 2%",
    "verdi": 0.6784620114890689,
    "enhet": "$ m"
   }
  ]
 },
 "v2021:5:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Risk-neutral probability of 10%",
    "verdi": 0.5253795494484262,
    "enhet": ""
   }
  ]
 },
 "v2021:5:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Value of the patent today with the option to wait",
    "verdi": 0.31263295686899895,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 8,
  "tekstLedd": "Briefly comment."
 },
 "v2022:1:1": {
  "type": "bokstav",
  "svar": "D"
 },
 "v2022:1:2": {
  "type": "bokstav",
  "svar": "C"
 },
 "v2022:1:3": {
  "type": "bokstav",
  "svar": "B"
 },
 "v2022:1:4": {
  "type": "bokstav",
  "svar": "A"
 },
 "v2022:1:5": {
  "type": "bokstav",
  "svar": "B"
 },
 "v2022:1:6": {
  "type": "bokstav",
  "svar": "D"
 },
 "v2022:1:7": {
  "type": "bokstav",
  "svar": "A"
 },
 "v2022:1:8": {
  "type": "bokstav",
  "svar": "C"
 },
 "v2022:1:9": {
  "type": "bokstav",
  "svar": "A"
 },
 "v2022:1:10": {
  "type": "bokstav",
  "svar": "C"
 },
 "v2022:2:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Share price",
    "verdi": 32.0,
    "enhet": "$ per share"
   },
   {
    "navn": "After-tax EPS",
    "verdi": 2.28,
    "enhet": "$ per share"
   }
  ],
  "merknad": "Spørsmålet spør bare etter to tall. Begrunnelsen (netto gjeld = 0, ingen skatteskjold) er det kriteriene vekter mest, men et riktig svar på 32,00 krever den."
 },
 "v2022:2:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Share price after the repurchase",
    "verdi": 32.800000000000004,
    "enhet": "$ per share"
   }
  ]
 },
 "v2022:2:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Gain per share in the third situation",
    "verdi": 0.7999999999999972,
    "enhet": "$ per share"
   },
   {
    "navn": "Total gain = PV(tax shield)",
    "verdi": 240.0,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 6,
  "tekstLedd": "In which situation(s) are the shareholders better off? Why?"
 },
 "v2022:3:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "α if good",
    "verdi": 38.46153846153847,
    "enhet": "%"
   },
   {
    "navn": "α if bad",
    "verdi": 71.42857142857143,
    "enhet": "%"
   },
   {
    "navn": "Entrepreneur's stake if good",
    "verdi": 80.0,
    "enhet": "$"
   },
   {
    "navn": "Entrepreneur's stake if bad",
    "verdi": 20.0,
    "enhet": "$"
   }
  ],
  "merknad": "«Will investors fund?» er ja i begge tilfeller og følger direkte av at α < 1; kriteriene gir det ikke egne poeng. α med enhet % så både 38,46 og 0,3846 godtas."
 },
 "v2022:3:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "α (pooled)",
    "verdi": 50.0,
    "enhet": "%"
   },
   {
    "navn": "Entrepreneur's stake if good",
    "verdi": 65.0,
    "enhet": "$"
   },
   {
    "navn": "Entrepreneur's stake if bad",
    "verdi": 35.0,
    "enhet": "$"
   }
  ],
  "tallPoeng": 6,
  "tekstLedd": "Compare your results to part a) and discuss.",
  "merknad": "α med enhet % så både 50 og 0,5 godtas."
 },
 "v2022:3:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "α if good",
    "verdi": 92.3076923076923,
    "enhet": "%"
   },
   {
    "navn": "Entrepreneur's stake if good",
    "verdi": 9.999999999999993,
    "enhet": "$"
   },
   {
    "navn": "Entrepreneur's stake if bad",
    "verdi": 0,
    "enhet": "$",
    "abs": 0.5
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Which projects are financed? Discuss your results.",
  "merknad": "α for det dårlige prosjektet (1,71) er ikke tatt med som tall: det er umulig, og poenget er at prosjektet ikke finansieres (tekstdelen)."
 },
 "v2022:3:d": {
  "type": "tekst",
  "merknad": "Svaret er at ingen finansiering skjer (α = 1,2 > 1) og at begge eierandeler er 0. Det eneste «tallet» er umulig, så hele deloppgaven er drøfting."
 },
 "v2022:4:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "FCF 2023",
    "verdi": 0.0,
    "enhet": "$ m",
    "abs": 0.1
   },
   {
    "navn": "FCF 2024",
    "verdi": 30.0,
    "enhet": "$ m"
   },
   {
    "navn": "FCF 2025",
    "verdi": 35.0,
    "enhet": "$ m"
   }
  ]
 },
 "v2022:4:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "β<sub>U</sub> (Marvel)",
    "verdi": 1.2000000000000002,
    "enhet": ""
   }
  ]
 },
 "v2022:4:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>wacc</sub>",
    "verdi": 12.733333333333336,
    "enhet": "%"
   }
  ]
 },
 "v2022:4:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "Enterprise value",
    "verdi": 379.72588924956705,
    "enhet": "$ m"
   }
  ]
 },
 "v2022:5:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Δ (fraction of the all-equity firm held)",
    "verdi": 0.6875,
    "enhet": ""
   },
   {
    "navn": "Amount borrowed risk-free",
    "verdi": 523.8095238095237,
    "enhet": "$"
   },
   {
    "navn": "Value of equity",
    "verdi": 163.69047619047626,
    "enhet": "$"
   }
  ],
  "merknad": "Oppgaven krever replikering, så porteføljen (Δ og lånebeløpet) er tatt med sammen med E. Lånet er oppgitt som positivt beløp med navnet «borrowed»."
 },
 "v2022:5:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Δ (fraction of the all-equity firm held)",
    "verdi": 0.3125,
    "enhet": ""
   },
   {
    "navn": "Amount lent risk-free",
    "verdi": 523.8095238095237,
    "enhet": "$"
   },
   {
    "navn": "Value of debt",
    "verdi": 836.3095238095237,
    "enhet": "$"
   }
  ],
  "merknad": "Som i a): replikeringsporteføljen er tatt med sammen med D."
 },
 "v2022:5:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Risk-neutral probability of the up state",
    "verdi": 0.3125,
    "enhet": ""
   },
   {
    "navn": "Value of equity",
    "verdi": 163.69047619047618,
    "enhet": "$"
   }
  ],
  "tallPoeng": 8,
  "tekstLedd": "Show that you get the same result as in part a), and explain why the two methods agree."
 },
 "v2023:1:1": {
  "type": "bokstav",
  "svar": "A"
 },
 "v2023:1:2": {
  "type": "bokstav",
  "svar": "C"
 },
 "v2023:1:3": {
  "type": "bokstav",
  "svar": "D"
 },
 "v2023:1:4": {
  "type": "bokstav",
  "svar": "D"
 },
 "v2023:1:5": {
  "type": "bokstav",
  "svar": "B"
 },
 "v2023:1:6": {
  "type": "bokstav",
  "svar": "A"
 },
 "v2023:1:7": {
  "type": "bokstav",
  "svar": "C"
 },
 "v2023:1:8": {
  "type": "bokstav",
  "svar": "A"
 },
 "v2023:1:9": {
  "type": "bokstav",
  "svar": "B"
 },
 "v2023:1:10": {
  "type": "bokstav",
  "svar": "C"
 },
 "v2023:2:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>U</sup>",
    "verdi": 150.0,
    "enhet": "$ m"
   }
  ]
 },
 "v2023:2:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Value of assets incl. tax shield",
    "verdi": 212.5,
    "enhet": "$ m"
   }
  ]
 },
 "v2023:2:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Share price before the repurchase",
    "verdi": 8.125,
    "enhet": "$ per share"
   },
   {
    "navn": "Shares repurchased",
    "verdi": 6.153846153846154,
    "enhet": "m shares"
   }
  ]
 },
 "v2023:2:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "Total assets (V<sup>L</sup>)",
    "verdi": 162.5,
    "enhet": "$ m"
   },
   {
    "navn": "Equity",
    "verdi": 112.5,
    "enhet": "$ m"
   },
   {
    "navn": "Share price after the repurchase",
    "verdi": 8.125,
    "enhet": "$ per share"
   }
  ],
  "merknad": "Balansen er representert ved totalverdien og egenkapitalen; gjelden på 50 er gitt i oppgaven."
 },
 "v2023:2:e": {
  "type": "blandet",
  "tall": [
   {
    "navn": "b) Value of assets, no tax",
    "verdi": 200.0,
    "enhet": "$ m"
   },
   {
    "navn": "c) Share price before the repurchase, no tax",
    "verdi": 7.5,
    "enhet": "$ per share"
   },
   {
    "navn": "c) Shares repurchased, no tax",
    "verdi": 6.666666666666667,
    "enhet": "m shares"
   },
   {
    "navn": "d) Equity after the repurchase, no tax",
    "verdi": 100.0,
    "enhet": "$ m"
   },
   {
    "navn": "d) Share price after the repurchase, no tax",
    "verdi": 7.500000000000001,
    "enhet": "$ per share"
   }
  ],
  "tallPoeng": 5,
  "tekstLedd": "How and why do your answers to b), c) and d) change?",
  "merknad": "Firmaverdien etter (150) er utelatt for å holde fem tall; den følger av egenkapital + gjeld."
 },
 "v2023:3:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>U</sub>",
    "verdi": 10.0,
    "enhet": "%"
   }
  ]
 },
 "v2023:3:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>U</sup> (NPV basis)",
    "verdi": 2.1036814425243904,
    "enhet": "$",
    "tol": 0.002,
    "alt": [
     202.1036814425244
    ]
   }
  ],
  "merknad": "Løsningen godtar både netto (2,10) og brutto (202,10, uten investeringen); begge godtas. tol 0,002 så brutto i d) og f) ikke forveksles."
 },
 "v2023:3:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "PV(interest tax shield)",
    "verdi": 3.1557452269022397,
    "enhet": "$"
   }
  ]
 },
 "v2023:3:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "V<sup>L</sup> (NPV basis)",
    "verdi": 5.25942666942663,
    "enhet": "$",
    "tol": 0.002,
    "alt": [
     205.25942666942663
    ]
   }
  ],
  "merknad": "Netto (5,26) eller brutto (205,26) godtas, som i b). tol 0,002 skiller brutto i d) fra f)."
 },
 "v2023:3:e": {
  "type": "tall",
  "tall": [
   {
    "navn": "PV(interest tax shield)",
    "verdi": 3.9446815336277994,
    "enhet": "$"
   }
  ]
 },
 "v2023:3:f": {
  "type": "blandet",
  "tall": [
   {
    "navn": "V<sup>L</sup> (NPV basis)",
    "verdi": 6.048362976152189,
    "enhet": "$",
    "tol": 0.002,
    "alt": [
     206.0483629761522
    ]
   },
   {
    "navn": "Difference from part d)",
    "verdi": 0.7889363067255597,
    "enhet": "$"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "Compare your result to the value in part d) and comment.",
  "merknad": "Netto (6,05) eller brutto (206,05) godtas. tol 0,002 så brutto fra d) (205,26) ikke godtas her."
 },
 "v2023:3:g": {
  "type": "tekst"
 },
 "v2023:4:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV",
    "verdi": 90909.09090909082,
    "enhet": "$"
   }
  ]
 },
 "v2023:4:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV",
    "verdi": -45454.54545454547,
    "enhet": "$"
   }
  ]
 },
 "v2023:4:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "NPV",
    "verdi": 0.0,
    "enhet": "$",
    "abs": 1000
   }
  ]
 },
 "v2023:4:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "Value of the option to do the pilot",
    "verdi": 90909.09090909082,
    "enhet": "$"
   }
  ]
 },
 "v2023:4:e": {
  "type": "tekst"
 },
 "v2023:5:a": {
  "type": "blandet",
  "tall": [
   {
    "navn": "i. Long-run price if equity",
    "verdi": 13.659420289855074,
    "enhet": "$ per share",
    "tol": 0.001
   },
   {
    "navn": "i. Long-run price if debt",
    "verdi": 13.425,
    "enhet": "$ per share",
    "tol": 0.001
   },
   {
    "navn": "ii. Long-run price if equity",
    "verdi": 15.340579710144928,
    "enhet": "$ per share",
    "tol": 0.001
   },
   {
    "navn": "ii. Long-run price if debt",
    "verdi": 15.425,
    "enhet": "$ per share",
    "tol": 0.001
   }
  ],
  "tallPoeng": 6,
  "tekstLedd": "Equity or debt in case i and in case ii? Explain the trade-off.",
  "merknad": "tol 0,001 fordi aksje- og gjeldsprisen i ii. bare skiller seg med 0,55 % (15,34 mot 15,43); standard 1 % ville godtatt feil rute."
 },
 "v2023:5:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Share price after an equity issue announcement",
    "verdi": 13.5,
    "enhet": "$ per share"
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "What should investors conclude if IST issues equity?"
 },
 "v2023:5:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Share price after a debt issue announcement",
    "verdi": 15.5,
    "enhet": "$ per share",
    "alt": [
     15.425
    ]
   }
  ],
  "tallPoeng": 2,
  "tekstLedd": "What should investors conclude if IST issues debt?",
  "merknad": "Løsningen godtar både 15,50 (ren informasjon) og 15,425 (netto etter kostnaden på 15 mill.)."
 },
 "v2023:5:d": {
  "type": "tekst",
  "merknad": "Skattefordelen er ikke tallfestet i oppgaven. Terskelen B* = 31,88 mill. er løsningens egen utledning, ikke et tall oppgaven spør etter."
 },
 "v2024:1:1": {
  "type": "ingen",
  "merknad": "Spørsmålsteksten er tapt. Sensorveiledningen har bare fasitbokstaven (C), så det finnes ikke noe å svare på. Vises med selvvurdering."
 },
 "v2024:1:2": {
  "type": "ingen",
  "merknad": "Spørsmålsteksten er tapt. Sensorveiledningen har bare fasitbokstaven (B), så det finnes ikke noe å svare på. Vises med selvvurdering."
 },
 "v2024:1:3": {
  "type": "ingen",
  "merknad": "Spørsmålsteksten er tapt. Sensorveiledningen har bare fasitbokstaven (A), så det finnes ikke noe å svare på. Vises med selvvurdering."
 },
 "v2024:1:4": {
  "type": "ingen",
  "merknad": "Spørsmålsteksten er tapt. Sensorveiledningen har bare fasitbokstaven (B), så det finnes ikke noe å svare på. Vises med selvvurdering."
 },
 "v2024:1:5": {
  "type": "ingen",
  "merknad": "Spørsmålsteksten er tapt. Sensorveiledningen har bare fasitbokstaven (B), så det finnes ikke noe å svare på. Vises med selvvurdering."
 },
 "v2024:1:6": {
  "type": "ingen",
  "merknad": "Spørsmålsteksten er tapt. Sensorveiledningen har bare fasitbokstaven (D), så det finnes ikke noe å svare på. Vises med selvvurdering."
 },
 "v2024:1:7": {
  "type": "ingen",
  "merknad": "Spørsmålsteksten er tapt. Sensorveiledningen har bare fasitbokstaven (A), så det finnes ikke noe å svare på. Vises med selvvurdering."
 },
 "v2024:1:8": {
  "type": "ingen",
  "merknad": "Spørsmålsteksten er tapt. Sensorveiledningen har bare fasitbokstaven (C), så det finnes ikke noe å svare på. Vises med selvvurdering."
 },
 "v2024:1:9": {
  "type": "ingen",
  "merknad": "Spørsmålsteksten er tapt. Sensorveiledningen har bare fasitbokstaven (D), så det finnes ikke noe å svare på. Vises med selvvurdering."
 },
 "v2024:1:10": {
  "type": "ingen",
  "merknad": "Spørsmålsteksten er tapt. Sensorveiledningen har bare fasitbokstaven (A), så det finnes ikke noe å svare på. Vises med selvvurdering."
 },
 "v2024:2:a": {
  "type": "blandet",
  "tall": [
   {
    "navn": "E[V] strategy A",
    "verdi": 50.0,
    "enhet": "$ m"
   },
   {
    "navn": "E[V] strategy B",
    "verdi": 48.0,
    "enhet": "$ m"
   },
   {
    "navn": "E[V] strategy C",
    "verdi": 42.0,
    "enhet": "$ m"
   },
   {
    "navn": "E[V] strategy D",
    "verdi": 32.0,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Which strategy maximises the expected value of the firm?",
  "merknad": "Spørsmålet er et valg; de fire forventede verdiene er tallgrunnlaget (som NPV-ene i spesifikasjonens eksempel)."
 },
 "v2024:2:b": {
  "type": "blandet",
  "tall": [
   {
    "navn": "E[equity] strategy A, F = 40",
    "verdi": 10.0,
    "enhet": "$ m"
   },
   {
    "navn": "E[equity] strategy B, F = 40",
    "verdi": 16.0,
    "enhet": "$ m"
   },
   {
    "navn": "E[equity] strategy C, F = 40",
    "verdi": 18.0,
    "enhet": "$ m"
   },
   {
    "navn": "E[equity] strategy D, F = 40",
    "verdi": 16.0,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Which strategy does management choose with (i) no debt and (ii) debt with face value $40 million? Why?",
  "merknad": "Tallene er egenkapitalverdiene ved F = 40. Uten gjeld er de lik firmaverdiene fra a), så de er ikke tatt med på nytt; valget A/C og mekanismen er tekstdelen."
 },
 "v2024:2:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Agency cost",
    "verdi": 8.0,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 4,
  "tekstLedd": "Which agency cost of debt does part (b) illustrate?"
 },
 "v2024:2:d": {
  "type": "blandet",
  "tall": [
   {
    "navn": "E[equity] strategy A, F = 5",
    "verdi": 45.0,
    "enhet": "$ m"
   },
   {
    "navn": "E[equity] strategy B, F = 5",
    "verdi": 44.0,
    "enhet": "$ m"
   },
   {
    "navn": "E[equity] strategy C, F = 5",
    "verdi": 39.0,
    "enhet": "$ m"
   },
   {
    "navn": "E[equity] strategy D, F = 5",
    "verdi": 30.0,
    "enhet": "$ m"
   },
   {
    "navn": "Expected firm value",
    "verdi": 50.0,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 5,
  "tekstLedd": "Which strategy will management choose?"
 },
 "v2024:2:e": {
  "type": "tall",
  "tall": [
   {
    "navn": "Price you accept for your bond",
    "verdi": 0.1,
    "enhet": "$ m"
   },
   {
    "navn": "Equity Petron must raise",
    "verdi": 35,
    "enhet": "$ m"
   }
  ],
  "merknad": "Spørsmålet spør bare etter to tall. Resonnementet (gjelden blir risikofri, hold-out) ligger implisitt i at prisen er pålydende."
 },
 "v2024:2:f": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Shareholders, with buy-back",
    "verdi": 10.0,
    "enhet": "$ m"
   },
   {
    "navn": "Shareholders, without buy-back",
    "verdi": 18.0,
    "enhet": "$ m"
   },
   {
    "navn": "Debt holders, with buy-back",
    "verdi": 40,
    "enhet": "$ m"
   },
   {
    "navn": "Debt holders, without buy-back",
    "verdi": 24.0,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 6,
  "tekstLedd": "Would the shareholders want to undertake the recapitalisation? Comment."
 },
 "v2024:3:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "E",
    "verdi": 125.0,
    "enhet": "$ bn"
   },
   {
    "navn": "D",
    "verdi": 25.0,
    "enhet": "$ bn"
   },
   {
    "navn": "V<sup>L</sup>",
    "verdi": 150.0,
    "enhet": "$ bn"
   }
  ]
 },
 "v2024:3:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>E</sub>",
    "verdi": 7.000000000000001,
    "enhet": "%"
   },
   {
    "navn": "r<sub>wacc</sub>",
    "verdi": 6.358333333333334,
    "enhet": "%"
   }
  ]
 },
 "v2024:3:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "g",
    "verdi": 2.358333333333334,
    "enhet": "%"
   }
  ]
 },
 "v2024:3:d": {
  "type": "tall",
  "tall": [
   {
    "navn": "r<sub>U</sub>",
    "verdi": 6.533333333333334,
    "enhet": "%"
   },
   {
    "navn": "r<sub>E</sub> (new)",
    "verdi": 7.550000000000001,
    "enhet": "%"
   },
   {
    "navn": "r<sub>wacc</sub> (new)",
    "verdi": 6.158333333333334,
    "enhet": "%"
   },
   {
    "navn": "V<sup>L</sup> (new)",
    "verdi": 157.89473684210526,
    "enhet": "$ bn"
   },
   {
    "navn": "D (new)",
    "verdi": 52.63157894736842,
    "enhet": "$ bn"
   },
   {
    "navn": "E (new)",
    "verdi": 105.26315789473685,
    "enhet": "$ bn"
   }
  ],
  "merknad": "Seks tall fordi oppgaven ber om alle seks (r_U, r_E, WACC, V, D, E)."
 },
 "v2024:4:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Price bond 1",
    "verdi": 95.23809523809524,
    "enhet": "$"
   },
   {
    "navn": "Expected return bond 1",
    "verdi": 5.000000000000004,
    "enhet": "%"
   },
   {
    "navn": "Price bond 2",
    "verdi": 90.9090909090909,
    "enhet": "$"
   },
   {
    "navn": "Expected return bond 2",
    "verdi": 7.800000000000007,
    "enhet": "%"
   }
  ]
 },
 "v2024:4:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Risk-neutral default probability",
    "verdi": 0.22727272727272735,
    "enhet": ""
   },
   {
    "navn": "CDS value (per $1 of protection)",
    "verdi": 0.2164502164502165,
    "enhet": "$"
   }
  ]
 },
 "v2024:4:c": {
  "type": "tall",
  "tall": [
   {
    "navn": "Put via the CDS (20 × CDS)",
    "verdi": 4.32900432900433,
    "enhet": "$"
   },
   {
    "navn": "Put via the bond prices (bond 1 − bond 2)",
    "verdi": 4.329004329004334,
    "enhet": "$"
   }
  ],
  "merknad": "Oppgaven ber om putten verdsatt på to måter; begge gir 1000/231. Ett felt per metode."
 },
 "v2024:5:a": {
  "type": "tall",
  "tall": [
   {
    "navn": "Firm A",
    "verdi": 25.0,
    "enhet": "$ m"
   },
   {
    "navn": "Debt A",
    "verdi": 12.5,
    "enhet": "$ m"
   },
   {
    "navn": "Equity A",
    "verdi": 12.5,
    "enhet": "$ m"
   },
   {
    "navn": "Firm B",
    "verdi": 12.5,
    "enhet": "$ m"
   },
   {
    "navn": "Debt B",
    "verdi": 6.25,
    "enhet": "$ m"
   },
   {
    "navn": "Equity B",
    "verdi": 6.25,
    "enhet": "$ m"
   }
  ],
  "merknad": "Seks tall fordi oppgaven ber om eiendeler, gjeld og egenkapital for begge foretakene."
 },
 "v2024:5:b": {
  "type": "tall",
  "tall": [
   {
    "navn": "Firm AB",
    "verdi": 37.5,
    "enhet": "$ m"
   },
   {
    "navn": "Debt AB",
    "verdi": 22.5,
    "enhet": "$ m"
   },
   {
    "navn": "Equity AB",
    "verdi": 15.0,
    "enhet": "$ m"
   }
  ]
 },
 "v2024:5:c": {
  "type": "blandet",
  "tall": [
   {
    "navn": "Gain/loss shareholders A",
    "verdi": -2.5,
    "enhet": "$ m"
   },
   {
    "navn": "Gain/loss shareholders B",
    "verdi": -1.25,
    "enhet": "$ m"
   },
   {
    "navn": "Gain/loss debt holders A",
    "verdi": 2.5,
    "enhet": "$ m"
   },
   {
    "navn": "Gain/loss debt holders B",
    "verdi": 1.25,
    "enhet": "$ m"
   }
  ],
  "tallPoeng": 5,
  "tekstLedd": "Check that the gains and losses cancel. Would the shareholders undertake the acquisition?",
  "merknad": "Tap er negative tall (aksjonærene), gevinster positive (kreditorene)."
 },
 "v2024:5:d": {
  "type": "tekst"
 }
};
