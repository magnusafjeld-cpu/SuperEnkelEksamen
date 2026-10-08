/* ============== FIE402 · SYMBOLENE I KJERNEPENSUM ==============
   Hva hvert symbol i formellinjene står for. Motoren (js/bundle-symboler.js)
   viser teksten når du holder over symbolet eller trykker på det.

   Nøkler: grunnform, ^hevet og _senket, som «r_U», «V^L», «P^post_A». En nøkkel
   uten senket skrift dekker alle tidspunktene: «FCF» forklarer FCF_1 og FCF_t.
   «E[» er E foran en hakeparentes, altså forventningen.

   `alle` gjelder i hele kjernepensum. `deler` overstyrer for én del, der samme
   bokstav betyr noe annet: C er en kjøpsopsjon i kj7, en årlig kontantstrøm i
   kj9 og en kostnad i kj11.

   `ikke` er ord som står i formlene uten å være symboler («max», «payoff»). De
   får ingen forklaring, men står her så tools/sjekk-symboler.js vet at de er
   vurdert. Kontrollen melder alt i en formel som verken er forklart eller her.
   ================================================================ */
window.EDU_DATA = window.EDU_DATA || {};
window.EDU_DATA.symboler = {
  alle: {
    /* Verdier */
    "V": "firm value: the market value of all the firm's assets, debt plus equity.",
    "V^L": "value of the levered firm, the firm with its debt.",
    "V^U": "value of the unlevered firm: the same assets financed only with equity.",
    "V_true": "the firm's true value, known to the managers but not to investors.",
    "E": "market value of the equity.",
    "E_0": "equity value today.",
    "E_1": "equity value after the transaction.",
    "D": "market value of the debt.",
    "D_0": "debt value today.",
    "D_t": "debt outstanding at date t.",
    "D_t−1": "debt outstanding at date t−1, the balance carried into year t.",
    "D_new": "the new debt the firm issues.",
    "d": "the target debt ratio D/V, held constant by rebalancing.",
    "E[": "expected value: the probability-weighted average.",
    "I": "the investment: what the project costs up front.",
    "K": "face value of the debt: what the firm has promised to repay.",
    "K_1": "the renegotiated face value of the debt.",
    "F": "face value of the debt, the amount promised at maturity.",

    /* Avkastning og risiko */
    "r_f": "risk-free interest rate.",
    "r_D": "cost of debt: the expected return lenders require.",
    "r_E": "cost of equity: the expected return shareholders require.",
    "r_U": "unlevered cost of capital: the required return on the assets alone, as if the firm had no debt.",
    "r_wacc": "weighted average cost of capital after tax.",
    "WACC": "weighted average cost of capital.",
    "r_i": "expected return on asset i.",
    "R_mkt": "return on the market portfolio.",
    "β_i": "beta of asset i: its sensitivity to the market.",
    "β_U": "unlevered (asset) beta: the risk of the business alone.",
    "β_E": "equity beta.",
    "β_D": "debt beta.",
    "g": "growth rate of the cash flows.",

    /* Skatt og kontantstrøm */
    "τ_c": "corporate tax rate.",
    "TS": "interest tax shield: the tax saved because interest is deductible.",
    "PV": "present value: what future cash flows are worth today.",
    "NPV": "net present value: present value of the cash flows minus the investment.",
    "FCF": "free cash flow: the cash the assets generate for all investors, debt and equity together.",
    "FCFE": "free cash flow to equity: what is left for shareholders after debt payments.",
    "EBIT": "earnings before interest and taxes.",
    "Depreciation": "depreciation: a non-cash charge, added back to get cash flow.",
    "CapEx": "capital expenditure: investment in fixed assets.",
    "NWC": "net working capital.",
    "Other": "other non-cash items.",
    "Interest": "interest paid on the debt.",

    /* Aksjer og utbetaling */
    "N": "number of shares outstanding.",
    "N_0": "number of shares before the transaction.",
    "N_1": "number of shares after the transaction.",
    "n": "number of shares bought back.",
    "P": "share price.",
    "P_0": "share price before the announcement.",
    "P_1": "share price after the announcement.",
    "P_ex": "ex-dividend share price, just after the dividend is paid.",
    "DPS": "dividend per share.",

    /* Opsjoner */
    "S": "price of the underlying share.",
    "T": "time to maturity, in years.",
    "ρ": "risk-neutral probability of the up state.",
    "σ": "volatility: the annual standard deviation of returns.",
    "ln": "natural logarithm.",

    /* Tegn */
    "Δ": "change in.",
    "Σ": "sum over all periods.",
    "Σ_i": "sum over the states i.",
  },

  deler: {
    kj5: {
      "D_0": "value of the old debt without the project.",
      "E_0": "value of the equity without the project.",
    },
    kj6: {
      "α": "the fraction of the firm the new shareholders get.",
      "q": "probability that the firm is the high (good) type.",
      "N": "number of shares sold in the offering.",
      "P_offer": "offer price per share.",
      "P_close": "closing price on the first trading day.",
      "N_primary": "number of new shares the firm sells.",
      "TERP": "theoretical ex-rights price: the share price after the rights issue.",
      "N_old": "shares outstanding before the rights issue.",
      "N_new": "new shares issued in the rights issue.",
      "P_cum": "share price with the right attached (cum rights).",
      "P_sub": "subscription price the new shares are sold at.",
    },
    kj7: {
      "C": "price of a call option.",
      "P": "price of a put option.",
      "K": "strike price: what you pay (call) or get (put) if you exercise.",
      "S_0": "share price today.",
      "S_T": "share price at maturity.",
      "S_u": "share price in the up state.",
      "S_d": "share price in the down state.",
      "C_u": "call value in the up state.",
      "C_d": "call value in the down state.",
      "Δ": "hedge ratio: shares held per option in the replicating portfolio.",
      "B": "amount in risk-free bonds in the replicating portfolio. Negative means borrowing.",
      "N": "cumulative standard normal distribution: N(x) is the probability that a standard normal variable is below x.",
      "d_1": "Black-Scholes term. N(d₁) is the hedge ratio.",
      "d_2": "d₁ − σ√T. N(d₂) is the risk-neutral probability of finishing in the money.",
    },
    kj8: {
      "y": "yield to maturity: the promised return if the debt is paid in full.",
      "p": "probability of default.",
      "L": "loss given default, as a fraction of what was promised.",
      "V": "value of the firm's assets.",
      "V_T": "value of the firm's assets at maturity.",
      "E_T": "equity payoff at maturity.",
      "D_T": "debt payoff at maturity.",
      "T": "maturity of the debt, in years.",
      "Call": "value of a call option on the firm's assets, with the face value as strike.",
      "Put": "value of a put option on the firm's assets, with the face value as strike.",
      "N": "cumulative standard normal distribution.",
      "d_1": "Black-Scholes term. N(d₁) is the equity's delta with respect to the firm value.",
      "CDS": "credit default swap: insurance that pays the lender's loss if the borrower defaults.",
      "s": "CDS spread: the yearly price of the protection.",
      "q": "risk-neutral probability of default.",
    },
    kj9: {
      "p_i": "real probability of state i.",
      "r": "the project's cost of capital.",
      "NPV_i": "the project's NPV in state i, at the date you would invest.",
      "NPV_now": "NPV of investing today.",
      "VOI": "value of information: what knowing the state before deciding is worth.",
      "S": "salvage value: what you get if you exit.",
      "C": "yearly cash flow while the project runs.",
      "n": "the date you exit, in years.",
    },
    kj10: {
      "A": "value of the acquirer on its own.",
      "T": "value of the target on its own.",
      "S": "synergies: the extra value the combination creates.",
      "ER": "exchange ratio: acquirer shares given per target share.",
      "ER_max": "highest exchange ratio the acquirer can offer without losing value.",
      "N_A": "acquirer's shares outstanding before the deal.",
      "N_T": "target's shares outstanding before the deal.",
      "P_A": "acquirer's share price before the announcement.",
      "P_T": "target's share price before the announcement.",
      "P^post_A": "acquirer's share price after the announcement.",
      "P^post_T": "target's share price after the announcement.",
      "P_new": "share price of the merged firm.",
      "x": "number of new acquirer shares issued to the target's owners.",
      "y": "the target owners' share of the merged firm.",
      "NPV_A": "NPV of the deal for the acquirer's shareholders.",
      "NPV_T": "NPV of the deal for the target's shareholders.",
      "S_implied": "the synergies implied by the market prices.",
      "p": "probability that the deal completes.",
    },
    kj11: {
      "α": "your ownership stake.",
      "α*": "the smallest stake at which monitoring pays for itself.",
      "C": "full cost of the intervention.",
    },
  },

  ikke: [
    "a", "actual", "agency", "and", "at", "beliefs", "benefits", "best", "both", "call", "cash", "chosen",
    "completes", "constant", "continuing", "cost", "costs", "credit", "date", "debt", "direct", "discounted",
    "distress", "dividend", "exceeds", "excess", "exit", "fails", "financial", "first", "fixed", "for", "gain",
    "get", "high", "if", "interest", "issue", "left", "loss", "low", "max", "min", "money", "monitor", "Net",
    "of", "offered", "Old", "on", "option", "or", "other", "payoff", "per", "permanent", "pre", "premium", "price",
    "proceeds", "put", "repurchase", "right", "share", "shareholders", "shield", "special", "spread", "table",
    "tax", "Tax", "the", "this", "to", "type", "type's", "unchanged", "under", "Underpricing", "upfront",
    "value", "wait", "wealth", "with", "shareholders'", "creditors'",
  ],
};
