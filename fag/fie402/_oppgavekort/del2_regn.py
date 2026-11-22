# -*- coding: utf-8 -*-
"""
FIE402 oppgavekort, del 2: opsjoner, binomial, gjeld og egenkapital som opsjoner,
realopsjoner, M&A (regning og verbalt), governance og eksamensteknikk.

Skriptet regner alle tall på nytt og bygger kortene. Kjør:
    python3 fag/fie402/_oppgavekort/del2_regn.py
Det skriver del2_kort.json ved siden av seg selv og skriver ut kontrolltallene.
Innsettingen i data.js gjøres av del2_sett_inn.py (leser og skriver med en gang).

Kilder: sett.js (h2024, h2025), problemsett.js (ps3, ps4), sjangre.js,
FIE402_Manual.html k21 til k28, docs/fie402-forelesninger-2026.md,
Kurbatovs lysbilder (lecture 9 til 14), Home Assignment 2 og opptaket av
oppsummeringsforelesningen. Black-Scholes regnes ikke (bare intuisjon).
"""
import json
import os
import re

HER = os.path.dirname(os.path.abspath(__file__))
KORT = []
KONTROLL = []

SLUG = {
    "opsjoner og paritet": "opsjoner",
    "binomial og risikonøytral": "binomial",
    "gjeld og egenkapital som opsjoner": "gjeldek",
    "realopsjoner": "realopsjoner",
    "M&A-regning": "ma-regning",
    "M&A verbal": "ma-verbal",
    "governance": "governance",
    "eksamensteknikk": "eksamen",
}
TELLER = {}


def n(x, d=4):
    """Tall med tusenskille (komma, engelsk) og ekte minustegn."""
    return f"{x:,.{d}f}".replace("-", "−")


def p(x, d=2):
    """Prosent av en brøk."""
    return n(x * 100, d) + "%"


def kort(deck, ch, front, svar, steg, felle, kilde):
    TELLER[deck] = TELLER.get(deck, 0) + 1
    kid = f"ok-{SLUG[deck]}-{TELLER[deck]:02d}"
    back = f"<b>{svar}</b>"
    for i, s in enumerate(steg, 1):
        back += f"<br>{i}. {s}"
    back += f"<br>Trap: {felle}<br>({kilde})"
    back = back.replace("M&A", "M&amp;A")
    tusen = re.compile(r"(?<=\d),(?=\d{3}(?!\d))")
    front = tusen.sub("\u00a0", front)
    back = tusen.sub("\u00a0", back)
    KORT.append({"id": kid, "ch": ch, "deck": deck, "front": front, "back": back})


def sjekk(navn, verdi, fasit, tol=1e-4):
    ok = abs(verdi - fasit) <= tol
    KONTROLL.append((navn, verdi, fasit, ok))
    if not ok:
        raise SystemExit(f"KONTROLL FEILET: {navn}: {verdi} mot {fasit}")


def A(nn, r):
    """Annuitetsfaktor, første betaling om ett år."""
    return (1 - (1 + r) ** -nn) / r


# =====================================================================
# 1. OPSJONER OG PARITET (k21, k23)
# =====================================================================
D = "opsjoner og paritet"

kort(D, 21,
     "You buy a European put with strike 64 for 5.20. What are your payoff and profit at expiry if the share ends at 58? If it ends at 70? Where is break-even?",
     "S = 58: payoff 6.00, profit 0.80. S = 70: payoff 0, profit −5.20. Break-even at 58.80",
     ["Put payoff = max(K − S<sub>T</sub>, 0): max(64 − 58, 0) = 6.00 and max(64 − 70, 0) = 0.",
      "Profit = payoff − premium: 6.00 − 5.20 = 0.80 and 0 − 5.20 = −5.20.",
      "Break-even: K − premium = 64 − 5.20 = 58.80."],
     "−6.00 at S = 70 (exercising a put that is out of the money); 6.00 reported as the profit (premium forgotten); 69.20 as break-even (K + premium is the call holder's rule).",
     "lecture 9 p. 6, manual 21.2")

kort(D, 21,
     "You write (sell) a European call with strike 100 for a premium of 8. What is your profit at expiry if the share ends at 95, 104 or 120? At which share price do you break even?",
     "Profit +8.00, +4.00 and −12.00. Break-even at 108",
     ["The writer pays max(S<sub>T</sub> − K, 0) to the holder and keeps the premium: profit = 8 − max(S<sub>T</sub> − 100, 0).",
      "S<sub>T</sub> = 95: not exercised, profit 8.00. S<sub>T</sub> = 104: 8 − 4 = 4.00. S<sub>T</sub> = 120: 8 − 20 = −12.00.",
      "Break-even: 8 − (S<sub>T</sub> − 100) = 0 gives S<sub>T</sub> = 108. Above it the loss has no ceiling."],
     "−4.00 at 104 (that is the holder's profit, 4 − 8); 92 as break-even (K − premium is the put holder's rule).",
     "lecture 9 p. 6, manual 21.1")

S0, K, r = 150, 126, 0.05
pvk = K / (1 + r)
lb = S0 - pvk
kort(D, 21,
     "A share pays no dividends and trades at 150. The one-year risk-free rate is 5%. A one-year European call with strike 126 is quoted at 27.50. Is the quote possible? If not, what do you do?",
     f"No. The call must cost at least S − PV(K) = {n(lb, 2)}. Buy the call, short the share, lend {n(pvk, 2)}: +{n(S0 - 27.5 - pvk, 2)} today",
     [f"PV(K) = 126/1.05 = {n(pvk, 2)}. Bounds for a European call on a share without dividends: max(S − PV(K), 0) ≤ C ≤ S, so {n(lb, 2)} ≤ C ≤ 150.00.",
      f"27.50 is below {n(lb, 2)}: the call is too cheap.",
      f"Short the share (+150.00), buy the call (−27.50), lend {n(pvk, 2)} at 5%. Cash today = +{n(S0 - 27.5 - pvk, 2)}.",
      "At expiry: 126 from the loan + max(S<sub>T</sub> − 126, 0) from the call − S<sub>T</sub> to close the short = max(126 − S<sub>T</sub>, 0) ≥ 0. You never lose."],
     "S − K = 24.00 used as the lower bound (strike not discounted), which wrongly lets the quote pass. Checking only C ≤ S = 150 catches nothing here.",
     "manual 21.4")

C = 1.19
P = C - 20 + 25 / 1.05
sjekk("Harbin put via paritet", P, 5.0, 1e-3)
kort(D, 21,
     "Harbin trades at 20. A one-year European call with strike 25 is worth 1.19 and the risk-free rate is 5%. What is the European put with the same strike and maturity worth?",
     f"P = C − S + PV(K) = {n(P)} ≈ {n(P, 2)}",
     [f"PV(K) = 25/1.05 = {n(25 / 1.05)}.",
      f"P = 1.19 − 20 + {n(25 / 1.05)} = {n(P)} ≈ {n(P, 2)}.",
      f"The same put priced in the PS3 tree (30 or 18, ρ = 0.25) gives 0.75 × 7/1.05 = {n(0.75 * 7 / 1.05)} ✓ The 0.0005 gap is the call rounded to 1.19."],
     f"{n(C - 20 + 25, 2)} (K used instead of PV(K)). Parity needs European options with the same K and T on a share without dividends: say so in half a sentence.",
     "PS3 E4(e), manual 21.5")

S0, K, r, T, Pp = 75, 80, 0.04, 2, 8.50
pvk = K / (1 + r) ** T
Cc = Pp + S0 - pvk
kort(D, 21,
     "A share trades at 75 and pays no dividends. A two-year European put with strike 80 costs 8.50. The risk-free rate is 4% a year. What is the two-year European call with the same strike worth?",
     f"C = P + S − PV(K) = {n(Cc)}",
     [f"Discount the strike over two years: 1.04<sup>2</sup> = 1.0816, PV(K) = 80/1.0816 = {n(pvk)}.",
      f"C = 8.50 + 75 − {n(pvk)} = {n(Cc)}.",
      f"Check the bounds: max(S − PV(K), 0) = {n(max(S0 - pvk, 0))} ≤ C ≤ 75 ✓"],
     f"{n(Pp + S0 - K / 1.04)} (strike discounted one year only); {n(Pp + S0 - K)} (strike not discounted). The exponent is T, always.",
     "manual 21.6")

S0, Cc, Pp, K, T = 190, 13.60, 23.60, 210, 2
pvk = S0 + Pp - Cc
rf = (K / pvk) ** (1 / T) - 1
wrong = (K / (S0 + Cc - Pp)) ** (1 / T) - 1
kort(D, 21,
     "A share trades at 190. Two-year European options with strike 210 trade at 13.60 (call) and 23.60 (put). What annual risk-free rate does the option market imply?",
     f"r<sub>f</sub> = {p(rf, 4)} a year",
     [f"Parity solved for the bond: PV(K) = S + P − C = 190 + 23.60 − 13.60 = {n(pvk, 2)}.",
      f"Annualise over two years: r<sub>f</sub> = (210/{n(pvk, 2)})<sup>1/2</sup> − 1 = {p(rf, 4)}."],
     f"5.0000% (210/200 − 1, the two-year return reported as an annual rate); {p(wrong, 4)} (PV(K) = S + C − P, call and put swapped).",
     "manual 21.6")

fid = 13.60 + 210 / 1.05
prot = 23.00 + 190
kort(D, 21,
     "A share trades at 190 and rf is 5%. One-year European options with strike 210 trade at 13.60 (call) and 23.00 (put). Parity says the put should be 23.60. What trade earns an arbitrage profit and how much?",
     f"Buy the share and the put, write the call, borrow 200: +{n(fid - prot, 2)} today, zero at expiry",
     [f"Fiduciary call: C + PV(K) = 13.60 + 200.00 = {n(fid, 2)}. Protective put: P + S = 23.00 + 190.00 = {n(prot, 2)}. Both pay max(S<sub>T</sub>, 210).",
      "Buy the cheap side (share + put), sell the dear side (write the call, borrow PV(K) = 200).",
      f"Today: −190 − 23.00 + 13.60 + 200 = +{n(fid - prot, 2)}. At expiry: max(S<sub>T</sub>, 210) − max(S<sub>T</sub> − 210, 0) − 210 = 0 in every state."],
     f"Buying the expensive side gives −{n(fid - prot, 2)} today. Test the direction: the put is too cheap, so you must be buying the put.",
     "manual 21.6")

kort(D, 21,
     "A share trades at 60. A one-year European call and a one-year European put both have strike 66 and the risk-free rate is 10%. Without any model, which option is dearer?",
     "Neither. C − P = S − PV(K) = 60 − 66/1.1 = 0, so they cost the same",
     ["Parity: C − P = S − PV(K).",
      "PV(K) = 66/1.10 = 60.00 = S, so C − P = 0.",
      "This holds whatever the volatility and whatever investors expect the share to do."],
     "'The call is dearer because shares drift up.' Expected returns and beliefs do not enter parity; only S against PV(K) decides the sign.",
     "PS3 E1(g), manual 21.6")

kort(D, 21,
     "Kurbatov's slide asks: put-call parity C + PV(K) = P + S only holds for European options. Why?",
     "The two portfolios have the same payoff only on the expiry date. Early exercise breaks the match",
     ["Parity compares two portfolios that both pay max(S<sub>T</sub>, K) at T. No arbitrage then forces equal prices today.",
      "An American option can be exercised before T. An American put deep in the money may be exercised early, so the put side can pay before T while the call side does not.",
      "The equality then becomes a band: for a share without dividends, S − K ≤ C − P ≤ S − PV(K)."],
     "'American options cost more, so the formula is off by a premium.' The point is that the replication only holds at one date.",
     "lecture 9 p. 9")

kort(D, 23,
     "The volatility of a share rises from 35% to 45%, all else equal. What happens to a European call and a European put on it? Why? (No calculation)",
     "Both become more valuable, by the same amount",
     ["The payoff is one-sided: a call pays max(S<sub>T</sub> − K, 0), a put max(K − S<sub>T</sub>, 0). Losses stop at zero.",
      "More dispersion adds payoff in the tail where the option pays and costs nothing in the tail where it already pays zero.",
      "Parity: C − P = S − PV(K) contains no σ, so the call and the put must rise by exactly the same amount.",
      "Extreme case: with σ = 0 and S below PV(K) the share never reaches the strike and the call is worth zero."],
     "'A riskier share is worth less, so the call falls' (confuses the option with the share's required return); 'the put falls because the call rises' (parity rules it out).",
     "HA2 E3(b), H2025 E1, manual 23.4")

kort(D, 23,
     "Black-Scholes intuition, no numbers: what does a higher share price, a higher strike and a higher risk-free rate each do to a European call and to a European put?",
     "S up: call up, put down. K up: call down, put up. r<sub>f</sub> up: call up, put down",
     ["S: the call is the right to buy the share, so a dearer share makes it worth more; the right to sell it is worth less.",
      "K: the call holder pays K, the put holder receives K.",
      "r<sub>f</sub>: K changes hands at expiry. A higher rate lowers PV(K), which helps the one who pays it (call) and hurts the one who receives it (put).",
      "Check each row with parity: C − P = S − PV(K)."],
     "'A higher r<sub>f</sub> lowers the call because the payoff is discounted harder.' The PV(K) effect dominates and the call rises.",
     "lecture 9 p. 19, manual 23.3")

kort(D, 23,
     "No numbers: what does a longer time to expiry do to a European call and to a European put? And a dividend paid before expiry?",
     "Longer T: call up; European put ambiguous (American put up). Dividend: call down, put up",
     ["Longer T gives more dispersion and a lower PV(K). Both help a call.",
      "For a European put they pull against each other: more dispersion helps, but K arrives later. A deep in-the-money put at a high rate can lose value with T.",
      "A dividend: the share drops by the dividend on the ex-date and the option holder gets none of it. Lower S means call down, put up."],
     "'Every option is worth more with more time.' True for calls and American options, not always for a European put.",
     "PS3 E3(e)(f), manual 23.3")

kort(D, 23,
     "A share trades at 100. A one-year call with strike 110 trades at 6.04, which implies σ = 20%. A friend who knows the firm well says the true volatility is 15%. How does the true volatility affect the call price and what should you do? (4 to 6 sentences, no calculation)",
     "The fair price is lower (about 4). The call is overpriced: do not buy it; better, write it and delta-hedge",
     ["Option value rises with volatility: the payoff max(S<sub>T</sub> − K, 0) is one-sided, so a wider distribution adds upside without adding downside.",
      "The 6.04 is the Black-Scholes value at σ = 20%: that is what an implied volatility of 20% means.",
      "At the true 15% the fair value is lower, about 4, so the call trades above its value.",
      "Minimum answer: do not buy. Full answer: write (sell) the call, since you sell for 6.04 something worth about 4. Buy Δ shares as well so the bet is on volatility rather than on the direction of the share.",
      "It is not riskless arbitrage: it is a bet that your friend's estimate beats the market's."],
     "'Lower volatility means less risk, so the call is worth more' (wrong sign); answering only the first question, when the exercise said 'Please be very clear and answer both questions'; computing N(d<sub>1</sub>), which Kurbatov said will not be asked.",
     "H2025 E1, 12 points")

kort(D, 23,
     "Kurbatov's intuition question: if a call and a put on a share without dividends were American instead of European, would their prices go up or down?",
     "Call: unchanged. Put: at least as high, usually higher",
     ["Alive, a call is worth at least S − PV(K), which is more than the S − K you get by exercising now. Early exercise is never optimal, so the extra right is worth nothing.",
      "A deep in-the-money put pays K − S now. Taking K today beats waiting for at most K later, so early exercise can pay and the right has value.",
      "With dividends a call may be exercised just before the ex-date, so an American call on a dividend payer can be worth more."],
     "'Both rise because an extra right always adds value' (it adds nothing to this call); 'parity keeps both unchanged' (parity only holds for European options).",
     "lecture 14 recording, manual 23.3")

kort(D, 23,
     "What is implied volatility? How does a trader use it to decide whether to buy or sell an option?",
     "The σ that makes the Black-Scholes price equal the market price. Compare it with your own estimate",
     ["Every Black-Scholes input except σ is observable (S, K, T, r<sub>f</sub>). Solve for the σ that reproduces the quoted price.",
      "Your σ below the implied σ: the option is overpriced, so sell it. Your σ above: it is cheap, so buy it.",
      "σ is the only input on which traders really disagree, which is why option traders are called volatility traders."],
     "Treating implied volatility as historical volatility. Historical σ describes the past; implied σ is the market's price of future volatility.",
     "lecture 9 p. 22, manual 23.5")

kort(D, 21,
     "You run an airline. Oil costs 50 a barrel and you fear it will rise to 70. Which option position insures you? What does the insurance cost?",
     "Buy call options on oil with strike 50. The cost is the premium",
     ["If oil rises to 70, exercise: you pay 50, so the fuel cost is capped at 50 plus the premium.",
      "If oil falls, let the calls expire and buy cheap oil in the market: you keep the upside.",
      "The premium is the price of the insurance and is paid whether or not oil rises."],
     "Buying puts (they insure an oil producer against a fall); writing calls (you collect a premium but lose exactly when oil rises).",
     "lecture 9 p. 7")


# =====================================================================
# 2. BINOMIAL OG RISIKONØYTRAL (k22)
# =====================================================================
D = "binomial og risikonøytral"

rho = (1.05 * 100 - 60) / (120 - 60)
Cc = rho * 20 / 1.05
Pp = (1 - rho) * 40 / 1.05
sjekk("Kurbatov rho", rho, 0.75)
sjekk("paritet K100", Cc - Pp, 100 - 100 / 1.05)
kort(D, 22,
     "Kurbatov's own exercise: the risk-free rate is 5%, a share trades at 100 and will be worth 120 or 60 in one year. Find the risk-neutral probability ρ, then price a call and a put with strike 100.",
     f"ρ = 0.75. Call {n(Cc)}, put {n(Pp)}",
     ["ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>) = (105 − 60)/(120 − 60) = 45/60 = 0.75.",
      "Arithmetic check (an identity: it only confirms the sums): (0.75 × 120 + 0.25 × 60)/1.05 = 105/1.05 = 100 ✓",
      f"Call pays 20 or 0: C = 0.75 × 20/1.05 = {n(Cc)}. Put pays 0 or 40: P = 0.25 × 40/1.05 = {n(Pp)}.",
      f"Parity: C − P = {n(Cc - Pp)} = 100 − 100/1.05 ✓"],
     f"{n((100 - 60) / 60)} (S<sub>0</sub> used instead of (1 + r<sub>f</sub>)S<sub>0</sub>); discounting the option at a risky rate. ρ already carries the risk adjustment, so you discount at r<sub>f</sub>.",
     "lecture 14 recording, manual 22.3")

Nn = (55 - 0) / (160 - 80)
X = (0 - 80 * Nn) / 1.1
Cc = Nn * 100 + X
sjekk("lecture 9 call", Cc, 18.75)
kort(D, 22,
     "A share is worth 100 today and will be worth 160 or 80 in one year. The risk-free rate is 10%. Replicate a one-year European call with strike 105: how many shares and how much borrowing? What is the call worth?",
     f"Buy {n(Nn)} shares, borrow {n(-X, 2)}: C = {n(Cc, 2)}",
     ["Payoffs: C<sub>u</sub> = 160 − 105 = 55, C<sub>d</sub> = 0.",
      f"Shares: N = (C<sub>u</sub> − C<sub>d</sub>)/(S<sub>u</sub> − S<sub>d</sub>) = 55/80 = {n(Nn)}.",
      f"Loan: X = (C<sub>d</sub> − N·S<sub>d</sub>)/(1 + r<sub>f</sub>) = (0 − 80 × {n(Nn)})/1.1 = {n(X, 2)}, so you borrow {n(-X, 2)}.",
      f"C<sub>0</sub> = N·S<sub>0</sub> + X = {n(Nn * 100, 2)} − {n(-X, 2)} = {n(Cc, 2)}."],
     f"{n(Nn * 100 - 55, 2)} (loan not divided by 1.1); X = +50 (lending). A replicated call is always shares bought partly with borrowed money: 0 &lt; N &lt; 1 and X &lt; 0.",
     "lecture 9 p. 10 to 11, manual 22.2")

Su, Sd, K = 75, 48, 66
Pu, Pd = 0, 18
De = (Pu - Pd) / (Su - Sd)
B = (Pu - De * Su) / 1.1
Pp = 60 * De + B
sjekk("Stiawmot put", Pp, 6 / 1.1)
kort(D, 22,
     "Stiawmot trades at 60 and will rise 25% or fall 20% in a year. The risk-free rate is 10%. Replicate a one-year European put with strike 66. What is your portfolio and what is the put worth?",
     f"Short 2/3 share and lend {n(B, 2)}: P = {n(Pp, 2)}",
     ["Tree: 75 or 48. Put payoffs: P<sub>u</sub> = max(66 − 75, 0) = 0, P<sub>d</sub> = 66 − 48 = 18.",
      "Δ = (0 − 18)/(75 − 48) = −2/3.",
      f"B = (P<sub>u</sub> − Δ·S<sub>u</sub>)/1.1 = (0 + 50)/1.1 = {n(B, 2)}: you lend.",
      f"P = 60 × (−2/3) + {n(B, 2)} = {n(Pp, 2)}. Check with ρ = (66 − 48)/27 = 2/3: P = (1/3) × 18/1.1 = {n(6 / 1.1, 2)} ✓"],
     "Δ = +2/3 (call logic carried over); B = 50 without dividing by 1.1, which gives P = 10.00.",
     "PS3 E1(b) to (f)")

rho = (1.05 * 20 - 18) / (30 - 18)
Cc = rho * 5 / 1.05
sjekk("Harbin rho", rho, 0.25)
kort(D, 22,
     "Harbin trades at 20. In one year the price is equally likely to be 30 or 18. The risk-free rate is 5%. What is a one-year European call with strike 25 worth?",
     f"C = {n(Cc)}",
     ["ρ = (1.05 × 20 − 18)/(30 − 18) = 3/12 = 0.25.",
      "Payoffs: C<sub>u</sub> = 5, C<sub>d</sub> = 0.",
      f"C = (0.25 × 5 + 0.75 × 0)/1.05 = {n(Cc)}. The real 0.5 plays no role."],
     f"{n(0.5 * 5 / 1.05)} (the real 0.5 discounted at r<sub>f</sub>); {n(0.5 * 5 / 1.2)} (the real 0.5 discounted at the share's 20% expected return; the call is riskier than the share, so even 20% is too low for it).",
     "PS3 E4(b)(c), manual 22.3")

Cc = 0.25 * 5 / 1.05
Pp = 0.75 * 7 / 1.05
rC = 0.5 * 5 / Cc - 1
rP = 0.5 * 7 / Pp - 1
sjekk("Harbin rC", rC, 1.1)
sjekk("Harbin rP", rP, -0.3)
kort(D, 22,
     "Harbin again: the share is worth 20 and will be 30 or 18 with equal real probability; rf is 5%. A call with strike 25 is worth 1.19 and a put with strike 25 is worth 5.00. What are the expected returns on the share, the call and the put?",
     "Share 20%, call 110%, put −30%",
     ["Share: (0.5 × 30 + 0.5 × 18)/20 − 1 = 24/20 − 1 = 20%.",
      f"Call: real expected payoff 0.5 × 5 = 2.5, so 2.5/{n(Cc)} − 1 = {p(rC, 0)}. A call is a levered long position: high beta.",
      "Put: real expected payoff 0.5 × 7 = 3.5, so 3.5/5.00 − 1 = −30%. A put is insurance against a fall: negative beta, expected return below r<sub>f</sub>."],
     "Expecting the put to earn at least r<sub>f</sub>. Real probabilities are right here because the question asks for expected returns, not prices.",
     "PS3 E4(a)(d)(f)")

rS = 0.105 + 0.75 * (0.165 - 0.105)
S0 = (0.5 * 290 + 0.5 * 170) / (1 + rS)
De = 78 / 120
B = (0 - De * 170) / 1.105
Cc = De * S0 + B
sjekk("DJ S0", S0, 200)
sjekk("DJ C", Cc, 30)
kort(D, 22,
     "Delinquent Joe: in one year the share is worth 290 or 170 with equal probability. Its beta is 0.75, rf is 10.5% and the market's expected return is 16.5%. Find today's share price, then replicate and price a one-year call with strike 212.",
     f"S<sub>0</sub> = {n(S0, 2)}. Buy {n(De, 2)} shares and borrow {n(-B, 2)}: C = {n(Cc, 2)}",
     [f"CAPM: r = 10.5% + 0.75 × (16.5% − 10.5%) = {p(rS, 1)}.",
      f"S<sub>0</sub> = (0.5 × 290 + 0.5 × 170)/1.15 = 230/1.15 = {n(S0, 2)}.",
      f"Call payoffs 78 and 0: Δ = 78/120 = {n(De, 2)}. B = (0 − {n(De, 2)} × 170)/1.105 = {n(B, 2)}.",
      f"C = {n(De, 2)} × 200 − {n(-B, 2)} = {n(Cc, 2)}."],
     f"S<sub>0</sub> = 230/1.105 = {n(230 / 1.105, 2)} (the share discounted at r<sub>f</sub>; its beta is 0.75, so its risk is priced and the CAPM rate applies). Every later number inherits the slip.",
     "PS3 E2(a) to (c)")

bC = (De * S0 / Cc) * 0.75
rC = 0.105 + bC * 0.06
sjekk("DJ betaC", bC, 3.25)
kort(D, 22,
     "Delinquent Joe: the call (strike 212) is worth 30 and is replicated by 0.65 shares at 200 and a loan of 100. The share's beta is 0.75, rf 10.5%, market premium 6%. What are the call's beta and expected return? Show that discounting its expected payoff gives 30.",
     f"β<sub>C</sub> = {n(bC, 2)}, r<sub>C</sub> = {p(rC, 0)}",
     [f"Beta of a portfolio = value-weighted betas: β<sub>C</sub> = (0.65 × 200/30) × 0.75 + (−100/30) × 0 = {n(De * S0 / Cc)} × 0.75 = {n(bC, 2)}.",
      f"r<sub>C</sub> = 10.5% + 3.25 × 6% = {p(rC, 0)}.",
      "Expected payoff with real probabilities: 0.5 × 78 = 39. 39/1.30 = 30 ✓"],
     f"{n(39 / 1.15, 2)} (39 discounted at the share's 15%). Each claim needs its own rate. The call is a levered position in the share.",
     "PS3 E2(d)(e)")

rho = (45 * 1.1 - 20) / (55 - 20)
Cc = rho * 10 / 1.1
Pp = 45 / 1.1 + Cc - 45
sjekk("HA2 rho", rho, 29.5 / 35)
kort(D, 22,
     "A share trades at 45 and will be worth 55 or 20 in one year. The risk-free rate is 10%. What state probabilities does the market imply? What are a call and a put with strike 45 worth?",
     f"ρ = {n(rho)} (up), {n(1 - rho)} (down). Call {n(Cc)}, put {n(Pp)}",
     [f"ρ × 55 + (1 − ρ) × 20 = 45 × 1.10 = 49.5, so ρ = 29.5/35 = {n(rho, 6)}.",
      f"Call pays 10 or 0: C = {n(rho, 6)} × 10/1.10 = {n(Cc)}.",
      f"Put by parity: P = 45/1.10 + {n(Cc)} − 45 = {n(Pp)}. Directly: {n(1 - rho, 6)} × 25/1.10 = {n((1 - rho) * 25 / 1.1)} ✓"],
     f"The real probability guessed at 0.5: C = {n(0.5 * 10 / 1.1)}. Rounding ρ to 0.8429 first gives 7.6627 and 3.5718 (the key's figures); carry six decimals so parity closes exactly.",
     "Home Assignment 2 E2")

rho = (1.05 - 0.9) / (1.2 - 0.9)
Cuu, Cud, Cdd = 44, 8, 0
Cu = (rho * Cuu + (1 - rho) * Cud) / 1.05
Cd = (rho * Cud + (1 - rho) * Cdd) / 1.05
C0 = (rho * Cu + (1 - rho) * Cd) / 1.05
sjekk("to perioder", C0, (rho ** 2 * 44 + 2 * rho * (1 - rho) * 8) / 1.05 ** 2)
kort(D, 22,
     "A share trades at 100. Each year it rises by the factor 1.2 or falls by 0.9. The risk-free rate is 5% a year. What is a two-year European call with strike 100 worth?",
     f"C<sub>0</sub> = {n(C0)}",
     [f"ρ = (1.05 − 0.9)/(1.2 − 0.9) = {n(rho)}, the same at every node.",
      "Final prices: 144, 108 and 81. Payoffs 44, 8 and 0.",
      f"Date 1: C<sub>u</sub> = (0.5 × 44 + 0.5 × 8)/1.05 = {n(Cu)}; C<sub>d</sub> = 0.5 × 8/1.05 = {n(Cd)}.",
      f"Today: C<sub>0</sub> = (0.5 × {n(Cu)} + 0.5 × {n(Cd)})/1.05 = {n(C0)}. Shortcut: (0.25 × 44 + 0.50 × 8)/1.05<sup>2</sup> gives the same."],
     f"{n((0.25 * 44 + 0.25 * 8) / 1.05 ** 2)} (the middle node given weight 0.25: it can be reached two ways, so it gets 2ρ(1 − ρ) = 0.50); {n((0.25 * 44 + 0.5 * 8) / 1.05)} (two years discounted as one).",
     "manual 22.4")

rho = (1.04 - 0.8) / (1.25 - 0.8)
Pp = (1 - rho) ** 2 * 6 / 1.04 ** 2
pvk = 70 / 1.04 ** 2
Cc = Pp + 100 - pvk
direct = (rho ** 2 * 86.25 + 2 * rho * (1 - rho) * 30) / 1.04 ** 2
sjekk("lettest forst", Cc, direct)
kort(D, 22,
     "A share trades at 100 and each year rises by the factor 1.25 or falls by 0.8. The risk-free rate is 4% a year. Price a two-year European call with strike 70 the fast way.",
     f"C = {n(Cc)}: price the put first, then use parity",
     [f"ρ = (1.04 − 0.80)/(1.25 − 0.80) = {n(rho)}. Final prices 156.25, 100 and 64.",
      "The call pays at two nodes (86.25 and 30), the put with strike 70 only at one: 70 − 64 = 6. The put is easier.",
      f"P = (1 − ρ)<sup>2</sup> × 6/1.04<sup>2</sup> = {n((1 - rho) ** 2)} × 6/1.0816 = {n(Pp)}.",
      f"C = P + S − PV(K) = {n(Pp)} + 100 − 70/1.0816 = {n(Pp)} + 100 − {n(pvk)} = {n(Cc)}. Direct check gives the same."],
     "Pricing the call node by node and losing time, or using parity with PV(K) over one year instead of two. Kurbatov: price first the call or the put, whichever is easier.",
     "lecture 14 recording, manual 22.4")

rho = 1.05 * 20 / (50 - 0)
Pp = (1 - rho) * 40 / 1.05
S0impl = (rho * 150 + (1 - rho) * 80) / 1.05
kort(D, 22,
     "Nobody quotes the share, but everyone agrees it will be worth 150 or 80 in one year. A one-year European call with strike 100 trades at 20. The risk-free rate is 5%. What is a one-year European put with strike 120 worth?",
     f"P = {n(Pp)}",
     ["The call pays 50 or 0. Its price pins down ρ: 20 = ρ × 50/1.05.",
      f"ρ = 1.05 × 20/50 = {n(rho)}.",
      f"The put with strike 120 pays 0 or 40: P = {n(1 - rho)} × 40/1.05 = {n(Pp)}.",
      f"The same ρ implies a share price of ({n(rho)} × 150 + {n(1 - rho)} × 80)/1.05 = {n(S0impl)}."],
     f"{n(0.5 * 40 / 1.05)} (ρ guessed at 0.5 because no share price is given). Any traded price on the tree carries the same information as the share price.",
     "manual 22.5, sjangre opsjoner-10")

g = 1.015 ** 0.5
rho = (g * 430 - 322.50) / (573.33 - 322.50)
Cc = rho * (573.33 - 430) / g
rho_w = (1.015 * 430 - 322.50) / (573.33 - 322.50)
Cw = rho_w * 143.33 / 1.015
kort(D, 22,
     "A share trades at 430 and in six months will be worth 573.33 or 322.50. The risk-free rate is 1.5% a year. What is a six-month European call with strike 430 worth?",
     f"ρ = {n(rho)}, C = {n(Cc, 2)}",
     [f"Half a year: growth factor (1.015)<sup>0.5</sup> = {n(g, 6)}, not 1.015.",
      f"ρ = ({n(g, 6)} × 430 − 322.50)/(573.33 − 322.50) = {n(g * 430 - 322.5)}/250.83 = {n(rho)}.",
      f"C = {n(rho)} × 143.33/{n(g, 6)} = {n(Cc, 2)}. The slide shows 0.4412 and 62.76 after rounding."],
     f"A full year's 1.015 for six months: ρ = {n(rho_w)} and C = {n(Cw, 2)}. Rates for part of a year are compounded: (1 + r)<sup>T</sup>.",
     "lecture 9 p. 17")

fair = 18.75
kort(D, 22,
     "A share is worth 100 and will be worth 160 or 80 in one year; rf is 10%. A one-year call with strike 105 trades at 20, but replication (0.6875 shares and a loan of 50) gives 18.75. What do you do?",
     f"Write the call at 20, buy 0.6875 shares and borrow 50: +{n(20 - fair, 2)} today, nothing owed later",
     ["The replicating portfolio costs 0.6875 × 100 − 50 = 18.75 and pays exactly what the call pays in both states.",
      "Sell the dear asset (the call at 20), buy the cheap one (the portfolio at 18.75).",
      "Up: the shares are worth 110, you repay 55 and pay 55 on the call: 0. Down: shares 55, repay 55, call 0: 0.",
      f"Profit today: 20 − 18.75 = {n(20 - fair, 2)} with no risk."],
     "Buying the call: it trades above its replicating cost, so it is the asset to sell. Forgetting to borrow leaves you exposed to the share.",
     "manual 22.2")

kort(D, 22,
     "Explain in two or three sentences why the real probabilities of the up and down states do not enter the price of an option in the binomial model.",
     "The option can be copied with the share and a risk-free loan, so its price follows from their prices by no arbitrage",
     ["Δ shares plus a loan pay exactly what the option pays in both states, whatever the probabilities are.",
      "Two assets with the same payoffs must cost the same, so C = Δ·S<sub>0</sub> + B. The real probabilities and investors' risk aversion are already inside S<sub>0</sub>.",
      "ρ is the probability that makes the share earn r<sub>f</sub>: a pricing device, not a forecast."],
     "'Because investors are risk neutral' (nobody assumes they are); 'ρ is the market's forecast of the up move' (it mixes the forecast with the price of risk).",
     "lecture 9 p. 16, H2024 E6(c), manual 22.3")

kort(D, 22,
     "A share trades at 100 and will be worth 130 or 108 in a year; the risk-free rate is 5%. Why can this tree not be used to price options?",
     "Even the down state beats the bond: 108 is above 105. The tree has an arbitrage and ρ is negative",
     ["No arbitrage requires S<sub>d</sub> &lt; (1 + r<sub>f</sub>)S<sub>0</sub> &lt; S<sub>u</sub>. Here 108 &gt; 105.",
      "Borrow 100 at 5% and buy the share: you owe 105 and hold at least 108. A sure profit.",
      f"ρ = (105 − 108)/(130 − 108) = {n((105 - 108) / 22)}, outside 0 to 1."],
     "Pricing the call anyway with a negative ρ. A ρ outside 0 to 1 is the check that the numbers are wrong, or that S<sub>0</sub> does not price the same cash flows as S<sub>u</sub> and S<sub>d</sub>.",
     "lecture 9 p. 12")


# =====================================================================
# 3. GJELD OG EGENKAPITAL SOM OPSJONER (k24)
# =====================================================================
D = "gjeld og egenkapital som opsjoner"

E = 25 * 20
Dm = 0.5 * E
V = E + Dm
F = Dm * 1.1 ** 5
sjekk("Wesley F", F, 402.6275, 1e-3)
kort(D, 24,
     "Wesley Corp.: 20 million shares at 25, a market debt-equity ratio of 0.5 and zero-coupon debt due in 5 years with a yield of 10%. Describe the equity as a call option: underlying, strike, maturity.",
     f"A European call on the firm's assets (V = {n(V, 0)} million), strike {n(F, 1)} million, maturity 5 years",
     [f"E = 25 × 20 = {n(E, 0)}. D = 0.5 × 500 = {n(Dm, 0)}. V = {n(V, 0)}.",
      f"The strike is the face value the shareholders must pay to keep the firm: 250 × 1.1<sup>5</sup> = {n(F, 2)}.",
      f"Payoff at maturity: max(V<sub>5</sub> − {n(F, 1)}, 0). Limited liability caps the loss at zero."],
     "Strike 250 (today's market value of the debt, not the face value); 250 × 1.1 × 5 = 1,375 (the course solution's typo for 250 × 1.1<sup>5</sup>).",
     "PS3 E7(a), lecture 10 p. 2")

kort(D, 24,
     "Describe Wesley's debt (face value 402.6 million, due in 5 years, firm assets worth 750 million) first with a call option, then with a put option.",
     "D = V − C(K) and D = PV(K) − P(K), both with K = 402.6 and T = 5",
     ["The creditors receive min(V<sub>5</sub>, 402.6).",
      "With a call: min(V, K) = V − max(V − K, 0). Debt = own the firm's assets and write a call on them struck at 402.6.",
      "With a put: min(V, K) = K − max(K − V, 0). Debt = a risk-free zero-coupon bond with face value 402.6 and a written put on the assets struck at 402.6."],
     "Face value 250 in the put version (the course solution's slip: 250 is the market value of the debt). Writing 'long a put' instead of 'short a put'.",
     "PS3 E7(b)(c), lecture 10 p. 4")

kort(D, 24,
     "Exam question Kurbatov hinted at: explain in words why corporate debt is risk-free debt minus a put option.",
     "Creditors get min(V, K) = K − max(K − V, 0). The max term is the shareholders' option to default. The creditors have written it",
     ["At maturity the creditors are paid the face value K unless the assets V are worth less, in which case they take V.",
      "So they get K minus the shortfall max(K − V, 0), which is the payoff of a put on the firm's assets struck at K.",
      "That put belongs to the shareholders: limited liability lets them hand over the assets instead of paying K. The creditors are short it: D = PV(K) − P(K).",
      "With unlimited liability the put disappears and D = PV(K). The gap between risk-free and corporate debt is the value of the default option."],
     "'The creditors own a put that protects them' (they wrote it; a CDS is what they buy for protection); 'debt is a call on the assets' (that is the equity).",
     "lecture 10 p. 6 to 7, lecture 14 recording")

V0, F, rf, put = 250, 210, 0.05, 12
Dv = F / (1 + rf) - put
y = F / Dv - 1
kort(D, 24,
     "A firm's assets are worth 250. Its only debt is a one-year zero-coupon bond with face value 210. The risk-free rate is 5%. A European put on the firm's assets with strike 210 and one year to expiry is worth 12. Value the debt and the equity. Find the yield.",
     f"D = {n(Dv, 2)}, E = {n(V0 - Dv, 2)}, yield {p(y)} (spread {p(y - rf)})",
     [f"PV(K) = 210/1.05 = {n(F / 1.05, 2)}.",
      f"D = PV(K) − P = {n(F / 1.05, 2)} − 12 = {n(Dv, 2)}.",
      f"E = V − D = 250 − {n(Dv, 2)} = {n(V0 - Dv, 2)}.",
      f"y = 210/{n(Dv, 2)} − 1 = {p(y)}."],
     f"D = {n(F / 1.05, 2)} (default ignored, the debt priced as risk-free); D = 210 − 12 = 198.00 (put subtracted from the face value instead of its PV).",
     "manual 24.1, sjangre kreditt-5")

E = 86.05 * 0.32
Dg = 135.1 - E
y = (128 / Dg) ** (1 / 1.5) - 1
y135 = (128 / (135 - E)) ** (1 / 1.5) - 1
sjekk("Google y", y, 0.122954, 1e-5)
kort(D, 24,
     "Google has 320 million shares and is worth 135.1 billion; rf is 1%. It considers issuing 128 billion of zero-coupon debt due in 18 months. A call on Google with that maturity and strike 400 is quoted at bid 85.10 and ask 87.00. What yield would the debt pay?",
     f"y = {p(y)} a year, spread {p(y - 0.01)}",
     ["Strike per share = face value per share: 128/0.32 = 400. The equity is 320 million such calls.",
      f"Midpoint of bid and ask: (85.10 + 87.00)/2 = 86.05. E = 86.05 × 0.32 = {n(E, 3)} billion.",
      f"D = V − E = 135.1 − {n(E, 3)} = {n(Dg, 3)} billion.",
      f"Annualise over 1.5 years: y = (128/{n(Dg, 3)})<sup>1/1.5</sup> − 1 = {p(y)}. The slide uses V = 135 and gets {p(y135)}."],
     f"{p(128 / Dg - 1)} (the 18-month return not annualised); bid or ask instead of the midpoint. The course solution prints the spread as 11.1%; 12.3% − 1% is 11.3%.",
     "PS3 E6(a), lecture 10 p. 15")

ES = 149.15 * 0.32
DS = 135.1 - ES
DJ = 135.1 - DS - E
yJ = (32 / DJ) ** (1 / 1.5) - 1
yS = (96 / DS) ** (1 / 1.5) - 1
sjekk("Google junior", DJ, 0.32 * (149.15 - 86.05))
kort(D, 24,
     "Same Google case (320 million shares, V = 135.1 billion, 18 months), but now 96 billion senior and 32 billion junior zero-coupon debt. Call midpoints: 149.15 for strike 300 and 86.05 for strike 400. What yield does the junior debt pay?",
     f"y<sub>J</sub> = {p(yJ)} a year (senior {p(yS)})",
     [f"Senior alone: strike 96/0.32 = 300. D<sub>S</sub> = V − C(300) = 135.1 − 149.15 × 0.32 = {n(DS, 3)}.",
      f"Equity: strike (96 + 32)/0.32 = 400. E = C(400) = {n(E, 3)}.",
      f"Junior: D<sub>J</sub> = V − D<sub>S</sub> − E = C(300) − C(400) = 0.32 × (149.15 − 86.05) = {n(DJ, 3)}.",
      f"y<sub>J</sub> = (32/{n(DJ, 3)})<sup>1/1.5</sup> − 1 = {p(yJ)}.",
      f"The PS3 written solution rounds the senior debt to 87.4 first and gets {p((96 / 87.4) ** (1 / 1.5) - 1)} and {p((32 / (135.1 - 87.4 - E)) ** (1 / 1.5) - 1, 1)}; the board notes keep 87.37 and get 35.9%."],
     "A call with strike 32/0.32 = 100 for the junior debt (the junior claim sits between 300 and 400, not at the bottom). Lecture 10 slide 15 prints 34.94%; with its own numbers (32/20.19)<sup>12/18</sup> − 1 = 35.94%.",
     "PS3 E6(b), lecture 10 p. 13 to 15")

V0, Vu, Vd, F, rf, preal = 500, 650, 380, 450, 0.04, 0.7
rho = ((1 + rf) * V0 - Vd) / (Vu - Vd)
Dv = (rho * F + (1 - rho) * Vd) / (1 + rf)
Ev = rho * (Vu - F) / (1 + rf)
y = F / Dv - 1
sjekk("tre D+E", Dv + Ev, V0)
kort(D, 24,
     "A firm's assets are worth 500 and will be worth 650 or 380 in one year (real probability of the up state 0.7). Its only debt is a one-year zero-coupon bond with face value 450. The risk-free rate is 4%. Value the debt and the equity and find the yield on the debt.",
     f"D = {n(Dv)}, E = {n(Ev)}, yield {p(y)}",
     [f"ρ = (1.04 × 500 − 380)/(650 − 380) = 140/270 = {n(rho)}.",
      f"Debt pays min(V, 450): 450 or 380. D = ({n(rho)} × 450 + {n(1 - rho)} × 380)/1.04 = {n(Dv)}.",
      f"Equity pays max(V − 450, 0): 200 or 0. E = {n(rho)} × 200/1.04 = {n(Ev)}.",
      f"Check D + E = {n(Dv + Ev, 2)} = V ✓. Yield = 450/{n(Dv)} − 1 = {p(y)}, spread {p(y - rf)}."],
     f"D = {n((0.7 * 450 + 0.3 * 380) / 1.04)} (the real 0.7 discounted at r<sub>f</sub>). The tree gives you V, so use ρ for every claim on it.",
     "manual 24.1, sjangre kreditt-6")

P1 = 100 / 1.05
P2 = 100 / 1.10
q = (100 - P2 * 1.05) / 20
cds = q / 1.05
r2 = (0.9 * 100 + 0.1 * 80) / P2 - 1
sjekk("CDS q", q, 0.227273, 1e-6)
sjekk("CDS hedge", P2 + 20 * cds, P1)
kort(D, 24,
     "Two bonds promise 100 in one year. The government bond yields 5%. The corporate bond yields 10%, defaults with real probability 10% and then loses 20. A CDS pays 1 if the firm defaults. Find the risk-neutral default probability, the price of the CDS and how many CDS hedge the corporate bond.",
     f"p = {p(q)}, CDS = {n(cds)}, buy 20 CDS",
     [f"Prices: P<sub>gov</sub> = 100/1.05 = {n(P1)}, P<sub>corp</sub> = 100/1.10 = {n(P2)}.",
      f"Risk-neutral default probability: [(1 − p) × 100 + p × 80]/1.05 = {n(P2)}, so p = {n(q, 6)}, more than twice the real 10%.",
      f"CDS = p × 1/1.05 = {n(cds)}.",
      f"Hedge: CDS needed = K × LGD = 100 × 0.20 = 20. Bond + 20 CDS = {n(P2)} + {n(20 * cds)} = {n(P1)}, the risk-free price ✓",
      f"The expected return on the corporate bond is 98/{n(P2)} − 1 = {p(r2, 1)}, below the 10% promised yield."],
     f"CDS priced with the real 10%: {n(0.1 / 1.05)}; buying 100 CDS instead of K × LGD = 20.",
     "lecture 10 p. 8 to 10, manual 24.4")

V0, Vu, Vd, F, rf = 400, 520, 300, 350, 0.04
rho = ((1 + rf) * V0 - Vd) / (Vu - Vd)
cds = (1 - rho) * (F - Vd) / (1 + rf)
Dv = (rho * F + (1 - rho) * Vd) / (1 + rf)
sjekk("CDS tre", cds, F / (1 + rf) - Dv)
kort(D, 24,
     "A firm's assets are worth 400 and will be worth 520 or 300 in one year. Its only debt is a one-year zero with face value 350. The risk-free rate is 4%. A CDS pays the creditors' shortfall at maturity if the firm defaults. What is the CDS worth today?",
     f"CDS = {n(cds)}",
     [f"ρ = (1.04 × 400 − 300)/(520 − 300) = 116/220 = {n(rho)}.",
      "Default only in the down state: shortfall 350 − 300 = 50. The CDS is the put max(K − V, 0).",
      f"CDS = {n(1 - rho)} × 50/1.04 = {n(cds)}.",
      f"Check: PV(K) − D = 350/1.04 − {n(Dv)} = {n(F / 1.04 - Dv)} ✓ Risky bond + CDS = risk-free bond."],
     f"Weighting the shortfall with ρ instead of 1 − ρ: {n(rho * 50 / 1.04)}. Draw the payoff in both states before you weight.",
     "lecture 14 recording, sjangre opsjoner-16")

V0, Vu, Vd, F, rf, bU = 400, 560, 280, 320, 0.05, 1.2
rho = ((1 + rf) * V0 - Vd) / (Vu - Vd)
Ev = rho * (Vu - F) / (1 + rf)
Dv = V0 - Ev
dE = (Vu - F - 0) / (Vu - Vd)
dD = (F - Vd) / (Vu - Vd)
bE = dE * V0 / Ev * bU
bD = dD * V0 / Dv * bU
sjekk("beta-vekter", Ev / V0 * bE + Dv / V0 * bD, bU)
kort(D, 24,
     "A firm's assets are worth 400 and will be worth 560 or 280 in one year. The asset beta is 1.2 and rf is 5%. The only debt is a one-year zero with face value 320. What are the equity beta and the debt beta?",
     f"β<sub>E</sub> = {n(bE)}, β<sub>D</sub> = {n(bD)}",
     [f"ρ = (420 − 280)/(560 − 280) = {n(rho)}. Equity pays 240 or 0: E = {n(rho)} × 240/1.05 = {n(Ev)}. D = 400 − E = {n(Dv)}.",
      f"Deltas: Δ<sub>E</sub> = 240/280 = {n(dE)}, Δ<sub>D</sub> = (320 − 280)/280 = {n(dD)}.",
      f"β<sub>E</sub> = Δ<sub>E</sub>(V/E)β<sub>U</sub> = {n(dE)} × {n(V0 / Ev)} × 1.2 = {n(bE)}. β<sub>D</sub> = {n(dD)} × {n(V0 / Dv)} × 1.2 = {n(bD)}.",
      f"Check: (E/V)β<sub>E</sub> + (D/V)β<sub>D</sub> = {n(Ev / V0 * bE)} + {n(Dv / V0 * bD)} = 1.2 ✓"],
     f"β<sub>E</sub> = (V/E)β<sub>U</sub> = {n(V0 / Ev * bU)} (Δ left out, which treats the debt as risk-free). Under Black-Scholes Δ is N(d<sub>1</sub>), but you only need it as intuition.",
     "manual 24.3, sjangre kreditt-19")

V0, Vu, Vd, F, rf = 500, 750, 375, 450, 0.05
rho = ((1 + rf) * V0 - Vd) / (Vu - Vd)
Dv = (rho * F + (1 - rho) * Vd) / (1 + rf)
Ev = rho * (Vu - F) / (1 + rf)
y = F / Dv - 1
kort(D, 24,
     "An all-equity firm is worth 500 and will be worth 750 or 375 in one year; rf is 5% and markets are perfect. It issues a one-year zero-coupon bond with face value 450 and pays the proceeds out as a special dividend. How big is the dividend and what is the equity worth afterwards? Do the shareholders gain?",
     f"Dividend {n(Dv)}, equity {n(Ev)}, total {n(Dv + Ev, 2)}: no gain (MM)",
     [f"ρ = (525 − 375)/(750 − 375) = {n(rho)}.",
      f"The bond pays 450 or 375: D = ({n(rho)} × 450 + {n(1 - rho)} × 375)/1.05 = {n(Dv)} = the dividend.",
      f"Equity pays 300 or 0: E = {n(rho)} × 300/1.05 = {n(Ev)}.",
      f"Shareholders hold {n(Dv)} + {n(Ev)} = 500 before and after. The bond yields {p(y)}, a spread of {p(y - rf)}."],
     f"Dividend = 450/1.05 = {n(450 / 1.05)} (the risky bond priced as risk-free; it defaults in the down state). That number would leave V above 500, which breaks MM.",
     "2015 P4 type, sjangre kreditt-12")

# Coinsurance, fire grupper (V2024 P4-type), egne tall, r_f = 0, like sannsynlige tilstander
A1, A2, FA = 90, 10, 40
B1, B2, FB = 10, 50, 40
dA = 0.5 * min(A1, FA) + 0.5 * min(A2, FA)
eA = 0.5 * max(A1 - FA, 0) + 0.5 * max(A2 - FA, 0)
dB = 0.5 * min(B1, FB) + 0.5 * min(B2, FB)
eB = 0.5 * max(B1 - FB, 0) + 0.5 * max(B2 - FB, 0)
M1, M2, FM = A1 + B1, A2 + B2, FA + FB
s2A = min(M2, FM) * FA / FM
s2B = min(M2, FM) * FB / FM
dA2 = 0.5 * FA + 0.5 * s2A
dB2 = 0.5 * FB + 0.5 * s2B
eM = 0.5 * max(M1 - FM, 0) + 0.5 * max(M2 - FM, 0)
eA2 = eM * eA / (eA + eB)
eB2 = eM * eB / (eA + eB)
sjekk("coinsurance sum", (dA2 - dA) + (dB2 - dB) + (eA2 - eA) + (eB2 - eB), 0)
kort(D, 24,
     "Two equally likely states, risk-neutral investors, rf = 0. Firm A is worth 90 or 10 and owes 40. Firm B is worth 10 or 50 and owes 40. They merge with no synergies; the debts rank equally and the merged equity is split in proportion to pre-merger equity values. Who gains and who loses?",
     f"Creditors A +{n(dA2 - dA)}, creditors B +{n(dB2 - dB)}, shareholders A {n(eA2 - eA)}, shareholders B {n(eB2 - eB)}. Shareholders reject",
     [f"Apart: debt A pays 40 or 10, worth {n(dA, 2)}; equity A 50 or 0, worth {n(eA, 2)}. Debt B 10 or 40, worth {n(dB, 2)}; equity B 0 or 10, worth {n(eB, 2)}. Total 80.",
      f"Merged: assets 100 or 60 against F = 80. Debt pays 80 or 60, equity 20 or 0, worth {n(eM, 2)}. Total still 80: no value created.",
      f"State 2: 60 split by face value, 30 to each group of creditors. Debt A = (40 + 30)/2 = {n(dA2, 2)}, debt B = {n(dB2, 2)}.",
      f"Equity {n(eM, 2)} split 25 : 5, so A gets {n(eA2)} and B {n(eB2)}. Creditors gain 20, shareholders lose 20."],
     "'No value is created, so nobody gains or loses.' The total is fixed, but the assets of each firm now back the other's debt: coinsurance moves value from shareholders to creditors.",
     "V2024 P4 type, manual 24.6")

kort(D, 24,
     "In option language, why do shareholders of a levered firm sometimes prefer a risky negative-NPV project and turn down a safe positive-NPV one?",
     "Equity is a call on the assets and gains from volatility; debt is short a put and loses from it",
     ["Equity = C(V, K). An option's value rises with risk, so more volatile assets raise the equity value.",
      "Debt = PV(K) − P(K). More risk makes the put dearer, so the debt loses.",
      "Anything that raises the debt's risk without destroying value moves value from creditors to shareholders: excessive risk taking, or gambling for resurrection near default.",
      "The same logic gives debt overhang: a safe project mostly makes the debt safer, so the creditors capture the gain and the shareholders, who pay for it, say no."],
     "Saying shareholders 'like risk' as a preference. They are not risk lovers; the convex payoff of limited liability makes risk pay for them at the creditors' expense.",
     "lecture 10 p. 16, manual 24.1")

kort(D, 24,
     "Straight debt with face value 60: the owners prefer a gamble (190 or 40, firm value 115) to a safe project (140 or 100, firm value 120), rf = 0 and ρ = 0.5. Show why debt convertible into 50% of the firm removes the incentive.",
     "With the convertible, equity is worth 55.00 under the safe project and 47.50 under the gamble: the owners now choose the safe one",
     ["Straight debt: equity is 0.5 × 80 + 0.5 × 40 = 60.00 (safe) against 0.5 × 130 + 0 = 65.00 (gamble). The owners gamble and destroy 5 of value.",
      "Convertible: the holder converts when 0.5V &gt; 60, that is when V &gt; 120.",
      "Safe: up 140, converts, equity 70; down 100, no conversion, equity 40. E = 55.00.",
      "Gamble: up 190, converts, equity 95; down 40, default, equity 0. E = 47.50. The convertible takes the upside the gamble was built on."],
     "Comparing firm values only (120 against 115): that shows the gamble is bad, not why the owners take it. The question is always what each claim is worth under each project.",
     "manual 24.5")

kort(D, 24,
     "Use put-call parity on the firm's assets to show Modigliani-Miller: the face value K of the debt does not change the value of the firm.",
     "V = C(K) + PV(K) − P(K) = E + D for every K",
     ["Parity on the assets: C(K) + PV(K) = V + P(K), so V = C(K) + [PV(K) − P(K)].",
      "The first term is the equity, E = C(K). The bracket is the debt, D = PV(K) − P(K).",
      "Changing K moves value between the two claims, but their sum is always V."],
     "Writing D = PV(K): that is only true with unlimited liability, when the default put is worth nothing.",
     "lecture 10 p. 11")


# =====================================================================
# 4. REALOPSJONER (k25)
# =====================================================================
D = "realopsjoner"
r = 0.07
I = 160000
EC = 0.5 * 30000 + 0.5 * (-10000)
npv0 = EC / r - I
good = 30000 / r - I
bad = -10000 / r - I
vpi = 0.5 * max(good, 0) + 0.5 * max(bad, 0) - max(npv0, 0)
sjekk("H2025 a", npv0, -17142.857, 1e-2)
sjekk("H2025 b", vpi, 134285.714, 1e-2)
kort(D, 25,
     "A store costs 160,000 NOK to open. It costs 90,000 a year to run and brings in 80,000 or 120,000 a year forever with equal probability; you learn which during year 1 if you open. The risk-free rate is 7%. What is the NPV of opening now? Do you open?",
     f"NPV = {n(npv0, 0)}: do not open",
     ["Net the cost off the revenue first: +30,000 in the good state, −10,000 in the bad state.",
      "Expected net cash flow: 0.5 × 30,000 + 0.5 × (−10,000) = 10,000 a year forever.",
      f"NPV = 10,000/0.07 − 160,000 = {n(10000 / r, 0)} − 160,000 = {n(npv0, 0)}.",
      "The case discounts at the risk-free rate: the store's risk is treated as non-systematic, so real probabilities go with r<sub>f</sub>."],
     f"{n(100000 / r - I, 0)} (revenue without the operating cost); only the good state used. Opening now commits you to both states.",
     "H2025 E5(a)")

kort(D, 25,
     "Same store (cost 160,000; net +30,000 or −10,000 a year forever, equal odds; 7%; uninformed NPV −17,143). A finished market study tells you the state now if you pay C0. What is the most you would pay?",
     f"Up to {n(vpi, 0)} NOK",
     [f"Good state: 30,000/0.07 − 160,000 = {n(good, 0)}: open.",
      f"Bad state: −10,000/0.07 − 160,000 = {n(bad, 0)}: do not open, value 0.",
      f"Informed: 0.5 × {n(good, 0)} + 0.5 × 0 = {n(0.5 * good, 0)} (real probabilities at r<sub>f</sub>, since the risk is treated as non-systematic).",
      f"Value of the study = {n(0.5 * good, 0)} − max(0, −17,143) = {n(vpi, 0)}. The value comes from avoiding the bad state."],
     f"{n(0.5 * good - npv0, 0)} (subtracting the negative NPV instead of 0: uninformed you simply do not open); {n(0.5 * good + 0.5 * bad, 0)} (the bad state kept at its negative NPV instead of 0: averaging before taking the max).",
     "H2025 E5(b), manual 25.3")

c1 = 0.5 * good / 1.07
kort(D, 25,
     "Same store, but the study takes one year: you pay C1 now, learn the state in a year and then decide whether to open on the same terms. How much is the study worth now? Why is it less than 134,286?",
     f"C1 = {n(c1, 0)}, which is {n(vpi - c1, 0)} less",
     [f"Waiting gives the same project one year later. Good-state NPV at date 1 is still {n(good, 0)}; bad state 0.",
      f"Today: 0.5 × {n(good, 0)}/1.07 = {n(c1, 0)}, discounted at r<sub>f</sub> because the risk is treated as non-systematic.",
      f"Why less: in the good state you lose the year-1 cash flow, 30,000/1.07 = {n(30000 / 1.07, 0)}. You gain only from paying 160,000 a year later, 160,000 − 160,000/1.07 = {n(I - I / 1.07, 0)}. Net {n(-30000 / 1.07 + I - I / 1.07, 0)} × 0.5 = {n(0.5 * (-30000 / 1.07 + I - I / 1.07), 0)}."],
     f"{n(vpi, 0)} again (the date-1 value not discounted); {n(c1 / 1.07, 0)} (discounted twice). Mentioning the lost year-1 cash flow is enough for full marks on the comment.",
     "H2025 E5(c)")

ann2 = 1 / 1.07 + 1 / 1.07 ** 2
bad_exit = -I - 10000 * ann2
npv_exit = 0.5 * good + 0.5 * bad_exit
sjekk("H2025 d", npv_exit, 45245.62, 1e-1)
kort(D, 25,
     "Same store (no study). The government now lets you close after 2 years and walk away with nothing from year 3. You must still open before you know the state. What is the NPV of opening now? Do you open? What does the exit right add?",
     f"NPV = {n(npv_exit, 0)}: open. The exit right adds {n(npv_exit, 0)} against not opening",
     [f"Good state: never close, NPV = {n(good, 0)}.",
      f"Bad state: lose 10,000 in years 1 and 2, then close. Two-year annuity factor 1/1.07 + 1/1.07<sup>2</sup> = {n(ann2)}. NPV = −160,000 − 10,000 × {n(ann2)} = {n(bad_exit, 0)}.",
      f"Expected: 0.5 × {n(good, 0)} + 0.5 × ({n(bad_exit, 0)}) = {n(npv_exit, 0)} (real probabilities at r<sub>f</sub>: non-systematic risk).",
      f"Without the right you would not open (value 0), so the right is worth {n(npv_exit, 0)} − max(0, −17,143) = {n(npv_exit, 0)}."],
     f"{n(npv_exit - npv0, 0)} as the value of the right (comparing with the negative NPV instead of with 0, the error Kurbatov named in the wrap-up; it only measures how much the exit lifts a store you were forced to open).",
     "H2025 E5(d), lecture 14 recording")

perp = 1 / r
X = (2 * I - perp * 10000 - ann2 * 10000) / (perp - ann2)
gX = -I + (10000 + X) * perp
bX = -I + (10000 - X) * ann2
sjekk("H2025 e", 0.5 * gX + 0.5 * bX, 0, 1e-6)
sjekk("H2025 e X", X, 12747.76, 1e-2)
kort(D, 25,
     "Same store with the exit after 2 years. Revenue is now 100,000 − X or 100,000 + X with equal probability (cost still 90,000). For which X are you indifferent between opening and not opening?",
     f"X = {n(X, 2)}",
     ["Net flows: 10,000 + X (good) and 10,000 − X (bad). Assume X &gt; 10,000 so the bad state loses money and you exit.",
      f"Factors at r<sub>f</sub> (the risk is treated as non-systematic): 1/0.07 = {n(perp)} and the two-year annuity {n(ann2)}.",
      f"0 = −160,000 + 0.5[{n(perp)}(10,000 + X) + {n(ann2)}(10,000 − X)]. Multiply by 2: 320,000 = {n(perp * 10000 + ann2 * 10000, 0)} + {n(perp - ann2)}X.",
      f"X = {n(2 * I - perp * 10000 - ann2 * 10000, 0)}/{n(perp - ann2)} = {n(X, 2)}. Check: {n(X, 0)} &gt; 10,000, so the exit really is used ✓"],
     "Solving without the exit (perpetuity in both states) or forgetting to check that X lies in the region where your branch assumption holds. Sanity check: the original X = 20,000 is above the indifference point, consistent with the positive NPV in (d).",
     "H2025 E5(e), manual 25.6")

a5 = A(10, 0.05)
pv = 1.5 * a5
npv_now = pv - 12
sjekk("H2024 a", npv_now, -0.4174, 1e-4)
kort(D, 25,
     "A ferry licence and ferry cost 12 million NOK now. The ferry earns 1.5 million a year for 10 years, then has no value. The risk-free rate is 5%. What is the NPV of investing now?",
     f"NPV = {n(npv_now)} million",
     [f"A(10, 5%) = [1 − 1.05<sup>−10</sup>]/0.05 = {n(a5)}.",
      f"PV = 1.5 × {n(a5)} = {n(pv)}.",
      f"NPV = {n(pv)} − 12 = {n(npv_now)}. Keep {n(pv)}: it prices the twin in part (c)."],
     f"{n(1.5 * 10 / 1.05 ** 10 - 12)} (all ten payments discounted as one payment in year 10); an annuity due (first payment today) gives {n(1.5 * a5 * 1.05 - 12)}.",
     "H2024 E6(a)")

au = A(10, 0.03)
ad = A(10, 0.07)
Su = 1.5 * au
Sd = 1.5 * ad
nu = (Su - 12) / 1.05
nd = (Sd - 12) / 1.05
sjekk("H2024 b up", nu, 0.7574, 1e-4)
sjekk("H2024 b down", nd, -1.3949, 1e-4)
kort(D, 25,
     "Ferry again (cost 12, 1.5 a year for 10 years). If you wait one year, the rate from year 1 will be 3% or 7%; the rate from year 0 to year 1 stays 5%. The ferry still runs 10 years after you invest. What is the NPV from today's perspective of investing at date 1 in each state?",
     f"+{n(nu)} (3%) and {n(nd)} (7%) million",
     [f"3%: A(10, 3%) = {n(au)}, PV<sub>1</sub> = {n(Su)}, NPV<sub>1</sub> = {n(Su - 12)}, today {n(Su - 12)}/1.05 = {n(nu)}.",
      f"7%: A(10, 7%) = {n(ad)}, PV<sub>1</sub> = {n(Sd)}, NPV<sub>1</sub> = {n(Sd - 12)}, today {n(Sd - 12)}/1.05 = {n(nd)}.",
      "A falling rate is the good state for this project: the same annuity is worth more."],
     f"Discounting date-1 values with the new rate (3% or 7%) instead of the year-0-to-1 rate of 5%. The official key prints the 7% line as 0.7953/1.05 = −1.3949; the result is right, the input is a typo for {n(Sd - 12)}.",
     "H2024 E6(b)")

S0t = pv / 1.05
rho = (1.05 * S0t - Sd) / (Su - Sd)
rho_bad = (1.05 * pv - Sd) / (Su - Sd)
sjekk("H2024 rho", rho, 0.4634, 1e-4)
kort(D, 25,
     "Ferry again. You do not know the probabilities of 3% and 7%, so you use risk-neutral valuation. The ferry started at date 1 is worth 12.7953 or 10.5354 at date 1; the ferry started now is worth 11.5826 today. What is the risk-neutral probability of the 3% state?",
     f"ρ = {n(rho)}",
     [f"The twin must price the same cash flows the option delivers: the ferry started at date 1 (years 2 to 11). Today that stream is worth 11.5826/1.05 = {n(S0t)}.",
      f"ρ = (1.05 × {n(S0t)} − 10.5354)/(12.7953 − 10.5354) = (11.5826 − 10.5354)/2.2599 = {n(rho)}.",
      "Kurbatov's key uses a security paying 1 a year for 11 years and gets the same 0.4634. A sure payment does not change ρ.",
      "No real probabilities: the payoff is replicated with the twin and the bond."],
     f"{n(rho_bad)} (S<sub>0</sub> = 11.5826, the ferry started now, paired with S<sub>u</sub> and S<sub>d</sub> of the ferry started a year later). It lies between 0 and 1, so only the rule catches it.",
     "H2024 E6(c), manual 22.5")

opt = rho * nu
kort(D, 25,
     "Ferry again: investing now has NPV −0.4174; waiting gives NPV (today's terms) +0.7574 if rates fall and −1.3949 if they rise; ρ = 0.4634. What is the option to wait worth? Invest or wait?",
     f"{n(opt)} million: wait",
     [f"At date 1 you invest only if rates fall: payoffs max(0.7953, 0) and max(−1.4646, 0) = 0.",
      f"Value = ρ × NPV<sub>0,u</sub> + (1 − ρ) × 0 = {n(rho)} × {n(nu)} = {n(opt)}.",
      f"Against investing now: {n(opt)} − max(−0.4174, 0) = {n(opt)}. Wait.",
      "The licence is a call on the ferry: you invest only in the branch where the annuity is worth more than 12."],
     f"{n(0.5 * nu)} (the real 0.5 that nobody gave you); {n(rho_bad * nu)} (the mismatched ρ = {n(rho_bad)}); {n(opt - npv_now)} (subtracting the negative NPV of investing now instead of 0).",
     "H2024 E6(d)")

now = -1600 + 200 * 1.1 / 0.1
wait = 0.5 * (-1600 + 300 + 300 / 0.1) / 1.1
sjekk("lecture 11 wait", wait, 772.73, 1e-2)
kort(D, 25,
     "An investment costs 1,600 and produces one unit a year forever, starting when you invest. A unit sells for 200 today; next year the price will be 100 or 300 (equal odds, non-systematic risk) and then stay there. rf = 10%. Invest now or wait a year?",
     f"Now: {n(now, 0)}. Wait: {n(wait, 0)}. Wait",
     ["Now: −1,600 + 200 + 200/0.10 = −1,600 + 2,200 = 600.",
      "Wait, price 300: at date 1, −1,600 + 300 + 300/0.10 = 1,700: invest. Price 100: −1,600 + 100 + 1,000 = −500: do not invest.",
      f"Today: 0.5 × 1,700/1.10 = {n(wait, 0)} &gt; 600, so wait although the NPV now is positive.",
      "The risk is not systematic, so the real 50% is discounted at r<sub>f</sub>."],
     f"400 for investing now (the unit sold today forgotten); {n((0.5 * 1700 + 0.5 * -500) / 1.1, 0)} for waiting (investing in both states, which throws the option away).",
     "lecture 11 p. 5")

npv = -10 + (0.5 * 22 + 0.5 * 6) / 1.1
hi1 = -10 + 22 / 1.1
st = -1.5 + 0.5 * hi1 / 1.1
maxpay = 0.5 * hi1 / 1.1 - npv
kort(D, 25,
     "A project costs 10 and pays 22 or 6 one year later (equal odds; demand uncorrelated with the market, rf = 10%). A study costing 1.5 today reveals demand, but takes a year: you then decide to invest in year 1 and get the cash flow in year 2. Commission the study?",
     f"Yes: {n(st, 2)} with the study against {n(npv, 2)} without. Pay up to {n(maxpay, 2)}",
     [f"Invest now: −10 + (0.5 × 22 + 0.5 × 6)/1.1 = {n(npv, 2)}.",
      f"With the study, year 1: high demand −10 + 22/1.1 = {n(hi1, 2)}, invest; low −10 + 6/1.1 = {n(-10 + 6 / 1.1, 2)}, skip.",
      f"Today: −1.5 + 0.5 × {n(hi1, 2)}/1.1 = {n(st, 2)} &gt; {n(npv, 2)}.",
      f"Most you would pay: {n(0.5 * hi1 / 1.1, 2)} − {n(npv, 2)} = {n(maxpay, 2)}.",
      "Real probabilities with r<sub>f</sub> are right here because the risk is not systematic (β = 0)."],
     f"{n(-1.5 + 0.5 * hi1, 2)} (year-1 value not discounted); refusing to pair real probabilities with r<sub>f</sub>. Kurbatov does it whenever the risk is not priced.",
     "PS3 E8(a)(b), lecture 11")

kort(D, 25,
     "Same project and study as before (cost 10; pays 22 or 6; study reveals demand). You now believe high demand would pay much more than 22 and low demand much less than 6, with the same expected cash flow. Does the decision to buy the study change? (No calculation)",
     "No: you still buy it. It is now worth more",
     ["Investing now depends only on the expected cash flow, which is unchanged.",
      "With the study you invest only in the high state, which is now better. In the low state you do not invest, so a worse low state costs you nothing.",
      "More spread raises the value of the option the study gives, exactly as volatility raises the value of a call."],
     "'More risk makes the project less attractive, so skip the study.' The downside is cut off by the option not to invest.",
     "PS3 E8(c)")

ecf = 0.05 * 100 + 0.9 * 50
npv_h = -250 + ecf / 0.1
wait_h = (0.05 * (-250 + 1000) + 0.9 * (-250 + 500)) / 1.1
sjekk("Hatch b", wait_h, 238.636, 1e-3)
kort(D, 25,
     "Hatch can build a camp for 250 (10% discount rate). With probability 0.1 a lawsuit comes this year: dismissed (half the time) gives 100 a year forever, successful gives 0 forever. No lawsuit gives 50 a year forever. Invest now, or wait a year and decide after the lawsuit (cash flows then start in year 2)?",
     f"Invest now: {n(npv_h, 0)} against {n(wait_h, 1)} for waiting",
     [f"Now: E[CF] = 0.05 × 100 + 0.9 × 50 + 0.05 × 0 = {n(ecf, 0)}; NPV = −250 + 50/0.10 = {n(npv_h, 0)}.",
      "Wait, year-1 values: dismissed −250 + 1,000 = 750; no lawsuit −250 + 500 = 250; ban: do not invest, 0.",
      f"Today: (0.05 × 750 + 0.9 × 250)/1.10 = 262.5/1.10 = {n(wait_h, 1)}.",
      "Waiting avoids only the 5% ban branch but costs a year of cash flows: invest now."],
     f"Investing in all three branches when waiting (a ban branch of −250 is never chosen); forgetting to discount the year-1 values: 262.5.",
     "PS3 E9(a)(b)")

pstar = (1.1 * 250 - 250) / (0.5 * 750 - 250)
wait3 = (0.15 * 750 + 0.7 * 250) / 1.1
sjekk("Hatch p*", pstar, 0.2)
kort(D, 25,
     "Hatch again (cost 250, 10%; lawsuit with probability p, half dismissed giving 100 forever, half a ban giving 0; no lawsuit 50 forever). For which p is Hatch indifferent between investing now and waiting? Wait at p = 0.3?",
     f"p* = {n(pstar, 2)}. At p = 0.3 waiting is worth {n(wait3, 1)} &gt; 250: wait",
     ["Now: E[CF] = (p/2) × 100 + (1 − p) × 50 = 50 for every p, so NPV = 250 always.",
      "Wait: [(p/2) × 750 + (1 − p) × 250]/1.10 = (250 + 125p)/1.10.",
      f"Indifference: 250 + 125p = 275 gives p* = {n(pstar, 2)}. Below it invest now, above it wait.",
      f"p = 0.3: (0.15 × 750 + 0.7 × 250)/1.10 = {n(wait3, 1)}. Same mean, more spread: the option to wait is worth more."],
     "Expecting the NPV of investing now to fall with p. The mean is unchanged; only the dispersion grows. Dispersion is what the option to wait is paid for.",
     "PS3 E9(c), practice session 3")

rev = -250 + 0.15 * 100 / 0.1 + 0.7 * 50 / 0.1 + 0.15 * 250 / 1.1
sjekk("Hatch d", rev, 284.09, 1e-2)
kort(D, 25,
     "Hatch with p = 0.3 (waiting is worth 261.4, investing now 250). Now the investment is reversible: in any state you can sell the land and equipment for 250 after year 1. Invest now or wait?",
     f"Invest now: {n(rev, 1)} &gt; 261.4",
     ["Invest now and sell out in the ban state: the ban branch is worth 250/1.10 instead of 0.",
      f"NPV = −250 + 0.15 × 100/0.1 + 0.7 × 50/0.1 + 0.15 × 250/1.1 = −250 + 150 + 350 + {n(0.15 * 250 / 1.1, 1)} = {n(rev, 1)}.",
      "The value of waiting came from avoiding the bad state. Reversibility gives that protection while you invest, so you do not have to give up the year-1 cash flow."],
     "Adding the 250 resale in all states (you sell only where the camp is worth less than 250).",
     "PS3 E9(d)")

rho = (1.1 * 60 - 48) / (72 - 48)
up = max(1 * (72 - 36), 2 * (72 - 52))
dn = max(1 * (48 - 36), 2 * (48 - 52))
wait_o = (rho * up + (1 - rho) * dn) / 1.1
sjekk("olje", wait_o, 30)
kort(D, 25,
     "Oil field: extract now or next year (then it is worthless). Method 1 costs 36 a barrel and gets 1M barrels; method 2 costs 52 and gets 2M barrels. Oil is 60 today and will be 72 or 48 next year; rf = 10%. What is the option to wait worth?",
     f"{n(wait_o - 24, 0)} million: wait",
     ["Now: method 1 gives 1 × (60 − 36) = 24, method 2 gives 2 × (60 − 52) = 16. Take 24.",
      "Next year: at 72, method 2 gives 2 × 20 = 40 (method 1: 36); at 48, method 1 gives 12 (method 2: −8).",
      f"ρ = (1.1 × 60 − 48)/(72 − 48) = {n(rho, 2)}. PV of waiting = (0.75 × 40 + 0.25 × 12)/1.1 = {n(wait_o, 0)}.",
      "Option to wait = 30 − 24 = 6. Waiting lets you pick the method after you see the price."],
     f"Fixing the method before the tree (method 1 in both states gives (0.75 × 36 + 0.25 × 12)/1.1 = {n((0.75 * 36 + 0.25 * 12) / 1.1, 2)}); using 0.5 instead of ρ: {n((0.5 * 40 + 0.5 * 12) / 1.1, 2)}.",
     "PS3 E10")

kort(D, 25,
     "Bringing a start-up to an IPO costs 100 and succeeds with probability 10% (IPO worth 800). Alternatively: 10 for product development (50% success), then 90 for the IPO stage (20% success). Same total cost and odds; ignore discounting. NPV of each plan?",
     "All at once: −20. In stages: +25",
     ["At once: −100 + 0.10 × 800 = −20.",
      "Stages: after a successful first stage, 90 buys 0.20 × 800 = 160 &gt; 90, so continue; after a failure, stop.",
      "Outcomes: both succeed 0.10 × (800 − 100) = 70; product works, IPO fails 0.40 × (−100) = −40; product fails 0.50 × (−10) = −5. Total +25.",
      "Staging is worth 45 = 0.50 × 90: the second payment you avoid when the first stage fails."],
     "Treating the stages as the same project because the cost and the odds are unchanged. The value is the option to stop; the more a stage reveals, the more it is worth.",
     "lecture 11 p. 12, manual 25.7")

rm = 1.07 ** (1 / 12) - 1
a24 = A(24, rm)
wr = 0.07 / 12
kort(D, 25,
     "Convert 7% a year to a monthly rate. Then value 2,000 a month for 24 months and 2,000 a month forever, first payment in one month.",
     f"r<sub>m</sub> = {p(rm, 4)}. 24 months: {n(2000 * a24, 0)}. Forever: {n(2000 / rm, 0)}",
     [f"r<sub>m</sub> = 1.07<sup>1/12</sup> − 1 = {n(rm, 8)}.",
      f"A(24, r<sub>m</sub>) = [1 − (1 + r<sub>m</sub>)<sup>−24</sup>]/r<sub>m</sub> = {n(a24)}; 2,000 × {n(a24)} = {n(2000 * a24, 0)}.",
      f"Perpetuity: 2,000/{n(rm, 8)} = {n(2000 / rm, 0)}.",
      "Back again: (1 + r<sub>m</sub>)<sup>12</sup> − 1 = 7%. Six months: 1.07<sup>0.5</sup> − 1; 18 months: discount with 1.07<sup>1.5</sup>."],
     f"7%/12 = {p(wr, 4)}, which gives {n(2000 * A(24, wr), 0)} and {n(2000 / wr, 0)}. A perpetuity at a monthly rate moves a lot with the fourth decimal.",
     "lecture 11 p. 16, lecture 14 recording")

good_s = 6000 / rm - 400000
bad_s = -2000 * a24 - 400000
nofl = 2000 / rm - 400000
withx = 0.5 * good_s + 0.5 * bad_s
kort(D, 25,
     "A shop costs 400,000 to open. Running costs are 10,000 a month; inflow is 16,000 or 8,000 a month forever (50% each, revealed right after opening, not related to the market). The lease can be ended at no cost after 2 years. rf = 7% a year. Open? What is the exit right worth?",
     f"NPV with the exit = {n(withx, 0)}: open. The right is worth {n(withx, 0)}",
     [f"Monthly rate {p(rm, 4)}. Without the exit: 2,000/{n(rm, 8)} − 400,000 = {n(nofl, 0)}: you would not open.",
      f"Good: 6,000/{n(rm, 8)} − 400,000 = {n(good_s, 0)}. Bad, leave after 24 months: −2,000 × {n(a24)} − 400,000 = {n(bad_s, 0)}.",
      f"With the exit: 0.5 × {n(good_s, 0)} + 0.5 × ({n(bad_s, 0)}) = {n(withx, 0)}.",
      f"The right is worth {n(withx, 0)} − max(0, {n(nofl, 0)}) = {n(withx, 0)}."],
     f"{n(withx - nofl, 0)} (compared with the negative {n(nofl, 0)} instead of with 0: the mistake Kurbatov said ChatGPT made). The slide rounds the rate to 0.565% and gets 108,588.",
     "lecture 11 p. 16, lecture 14 recording")

c_good = 150 + 150 / 0.1
c_bad = 50 + 50 / 0.1
comm = (0.5 * c_good + 0.5 * c_bad) / 1.1
withs = (0.5 * c_good + 0.5 * (50 + 600)) / 1.1
I_pl = 950
kort(D, 25,
     "A plant costs 950. From year 1 it pays 150 a year forever or 50 a year forever (equal odds, 10%); the year-1 cash flow reveals which. After year 1 you can sell the plant for 600. What is the abandonment option worth?",
     f"{n(withs - comm, 2)}: NPV rises from {n(comm - I_pl, 2)} to {n(withs - I_pl, 2)}",
     [f"Committed, date-1 values: 150 + 1,500 = {n(c_good, 0)} and 50 + 500 = {n(c_bad, 0)}. NPV = {n(0.5 * c_good + 0.5 * c_bad, 0)}/1.1 − 950 = {n(comm - I_pl, 2)}.",
      "At date 1 in the bad state: continuing is worth 500, selling 600. Sell: 50 + 600 = 650.",
      f"With the option: (0.5 × 1,650 + 0.5 × 650)/1.1 − 950 = {n(withs - I_pl, 2)}.",
      f"Check: 0.5 × (600 − 500)/1.1 = {n(0.5 * 100 / 1.1, 2)} ✓ The exit is a put on the project struck at the salvage value."],
     "Selling in the good state as well, or adding 600 on top of continuing. Compare continue and sell at each node, then take the maximum, then average.",
     "manual 25.4")

kort(D, 25,
     "When is the option to wait worth most? What does waiting cost? Answer in words, the way Kurbatov does.",
     "Waiting pays when uncertainty is high and resolves soon; it costs the cash flows you forgo and the risk that a rival moves first",
     ["Waiting lets you invest only in the good states. The more dispersed the outcomes, the more that is worth (like σ for a call).",
      "The cash flow you give up while you wait works like a dividend on the underlying: a large one pushes you to invest now, as a large dividend pushes early exercise of a call.",
      "Competitors, an expiring licence or a closing market window also make waiting costly.",
      "Rule of thumb: with an option to wait, invest now only if the NPV is considerably high. A negative NPV today can become positive later."],
     "'A positive NPV means invest now.' Compare investing now with the value of waiting, never with zero alone.",
     "lecture 11 p. 9, manual 25.1")


# =====================================================================
# 5. M&A-REGNING (k26)
# =====================================================================
D = "M&A-regning"

cost = 5 * 20
dep = 105 * 1.03
fail = dep + 5 * 16 - 110
ce = cost * 1.03
pd = (ce - fail) / (dep - fail)
p_wrong = (cost - fail) / (dep - fail)
sjekk("H2025 E6 p", pd, 0.828333, 1e-6)
kort(D, 26,
     "A announces a bid for B. In exactly one year the deal completes (5 B shares are exchanged for 1 A share) or fails (prices return to their pre-announcement levels). Before: A 110, B 16. After the announcement: A 105, B 20. rf = 3%. What completion probability does the market imply?",
     f"p = {n(pd)} = {p(pd)}",
     ["Long-short position at today's prices: buy 5 B for 100, short 1 A for 105, deposit the 105 at 3%. Net outlay 100.",
      f"Completes: the 5 B become the 1 A you owe, the equity legs cancel, you keep 105 × 1.03 = {n(dep, 2)}.",
      f"Fails: {n(dep, 2)} + 5 × 16 − 110 = {n(fail, 2)} (pre-announcement prices).",
      f"Certainty equivalent of the outlay: 100 × 1.03 = {n(ce, 2)}. {n(ce, 2)} = p × {n(dep, 2)} + (1 − p) × {n(fail, 2)}, so p = 24.85/30 = {n(pd)}.",
      "Arithmetic check (an identity): 0.8283 × 108.15 + 0.1717 × 78.15 = 103.00 ✓"],
     f"{n(p_wrong)} (expected payoff set equal to 100 instead of 100 × 1.03, the error the key singles out); post-announcement prices in the failure branch; the ratio turned around (5 A against 1 B).",
     "H2025 E6(a), 12 points")

g = 1.055 ** 0.25
dep = 53.7 * 4.96 * g
fail = 145.35 - 53.7 * 4.19 + dep
pm = (234 * g - fail) / (dep - fail)
fail_sl = 145.35 - 225.03 + dep
pm_sl = (234 * g - fail_sl) / (dep - fail_sl)
sjekk("Mannesmann p", pm, 0.5884, 1e-4)
kort(D, 26,
     "Vodafone offers 53.7 of its shares for each Mannesmann share; the outcome comes in 3 months. On 17 December: Mannesmann 234, Vodafone 4.96. If the deal fails, prices revert to the 21 October levels (145.35 and 4.19). rf = 5.5% a year. What success probability does Mannesmann's price imply?",
     f"p = {n(pm)}, about 59%",
     ["Buy 1 Mannesmann for 234, short 53.7 Vodafone for 53.7 × 4.96 = 266.352, deposit the 266.352.",
      f"Three months at 5.5% a year: 1.055<sup>0.25</sup> = {n(g, 6)}. Deposit grows to {n(dep)}.",
      f"Completes: the Mannesmann share becomes the 53.7 Vodafone shares you owe: {n(dep)}. Fails: 145.35 − 53.7 × 4.19 + {n(dep)} = 145.35 − 225.003 + {n(dep)} = {n(fail)}.",
      f"234 × {n(g, 6)} = {n(234 * g)} = p × {n(dep)} + (1 − p) × {n(fail)}, so p = {n(pm)}."],
     f"Growing at 1.055 for a full year instead of 1.055<sup>0.25</sup>; discounting nothing. The slide writes 225.03 for 53.7 × 4.19 = 225.003 and gets {n(pm_sl)}.",
     "PS4 E1(b)(c), lecture 12 p. 21")

ER, PA1, PT1, PA0, PT0, rf, T = 0.8, 48, 36, 50, 30, 0.06, 0.5
fac = (1 + rf) ** T
one_m_p = fac * (ER * PA1 - PT1) / (ER * PA0 - PT0)
dep = ER * PA1 * fac
fail = dep + PT0 - ER * PA0
pp = (PT1 * fac - fail) / (dep - fail)
sjekk("snarvei", 1 - one_m_p, pp)
kort(D, 26,
     "Fast route: an acquirer offers 0.8 of its shares for each target share; the deal is settled in 6 months. Prices revert if it fails. Before: acquirer 50, target 30. Now: acquirer 48, target 36. rf = 6% a year. Implied completion probability?",
     f"p = {n(pp)}",
     ["Merger spread per target share = ER × P<sub>A</sub> − P<sub>T</sub>. Today: 0.8 × 48 − 36 = 2.40. If the deal fails: 0.8 × 50 − 30 = 10.00. If it completes: 0.",
      f"1 − p = (1 + r<sub>f</sub>)<sup>T</sup> × spread today/spread on failure = 1.06<sup>0.5</sup> × 2.40/10 = {n(fac, 6)} × 0.24 = {n(one_m_p)}.",
      f"p = {n(pp)}. The long-short position (buy 1 target, short 0.8 acquirer) gives the same number."],
     f"Using 1.06 for six months: p = {n(1 - 1.06 * 0.24)}; dividing today's spread by the offer value (38.40) instead of by the spread if the deal fails: p = {n(1 - fac * 2.4 / 38.4)}.",
     "manual 26.6, lecture 12 p. 21")

X = 0.5179 * 53.7
y = X / (31.105 + X)
X2 = 0.5179 * 58.96
y2 = X2 / (31.105 + X2)
kort(D, 26,
     "Vodafone (31.105 billion shares) offers 53.7 new Vodafone shares for each of Mannesmann's 517.9 million shares. How many new shares are issued? What fraction y of the combined firm do Mannesmann's owners get? And at the revised 58.96?",
     f"{n(X, 3)} billion new shares, y = {p(y, 1)}. Revised: {n(X2, 3)} billion, y = {p(y2, 1)}",
     [f"New shares X = ER × N<sub>T</sub> = 53.7 × 0.5179 = {n(X, 3)} billion.",
      f"y = X/(N<sub>A</sub> + X) = {n(X, 3)}/({n(31.105 + X, 3)}) = {p(y, 1)}.",
      f"Revised: 58.96 × 0.5179 = {n(X2, 3)} billion, y = {p(y2, 1)}. Both match the slide."],
     f"y = X/N<sub>A</sub> = {p(X / 31.105, 1)} (new shares divided by the old count instead of the new total).",
     "PS4 E1(a), lecture 12 p. 20")

Aval = 31.105 * 4.19
Tval = 0.5179 * 145.35
Smin = X * 4.19 - Tval
ermax_check = (145.35 / 4.19) * (1 + Smin / Tval)
sjekk("Mannesmann ERmax", ermax_check, 53.7, 1e-3)
kort(D, 26,
     "Vodafone offers 53.7 shares for each Mannesmann share. Using the 21 October prices as stand-alone values (Vodafone 4.19, 31.105 billion shares; Mannesmann 145.35, 517.9 million shares), how large must the synergies be for Vodafone's owners not to lose?",
     f"S ≥ {n(Smin, 2)} billion EUR",
     [f"A = 31.105 × 4.19 = {n(Aval, 2)}. T = 0.5179 × 145.35 = {n(Tval, 2)}.",
      "Acquirer's condition: X ≤ N<sub>A</sub>(T + S)/A, so S ≥ X·A/N<sub>A</sub> − T = X·P<sub>A</sub> − T.",
      f"S ≥ {n(X, 3)} × 4.19 − {n(Tval, 2)} = {n(X * 4.19, 2)} − {n(Tval, 2)} = {n(Smin, 2)}.",
      f"Check with the exchange ratio: ER ≤ (P<sub>T</sub>/P<sub>A</sub>)(1 + S/T) = 34.69 × (1 + {n(Smin / Tval)}) = 53.7 ✓"],
     "Using the 17 December prices as stand-alone values: they already contain the bid.",
     "PS4 E1(e), lecture 12 p. 17 to 18")

A0, T0, P, S = 50 * 80, 10 * 30, 10 * 38, 120
kort(D, 26,
     "An acquirer (50 million shares at 80) offers 38 in cash for each of the target's 10 million shares, which traded at 30 before the bid and trade at 37 now. Synergies are worth 120 million. What is the NPV for each side?",
     f"Target {n(P - T0, 0)} million, acquirer {n(S - (P - T0), 0)} million. Sum = S = 120",
     [f"T = 10 × 30 = {n(T0, 0)} (pre-announcement), P = 10 × 38 = {n(P, 0)}.",
      f"NPV<sub>T</sub> = P − T = {n(P - T0, 0)}: the premium.",
      f"NPV<sub>A</sub> = (A + T + S) − P − A = S − (P − T) = 120 − 80 = {n(S - (P - T0), 0)}.",
      "With cash the acquirer's cost does not depend on S: if the synergies disappoint, the acquirer bears it all."],
     "T measured at today's 37 (the price already contains the bid): premium 10, NPV<sub>A</sub> 110. NPV<sub>A</sub> = S, which forgets that the premium is paid out of the synergies.",
     "PS4 E2(a), lecture 12 p. 15")

A0, T0, S, ER, NA, NT = 40 * 100, 20 * 25, 300, 0.3, 40, 20
x = ER * NT
yy = x / (NA + x)
V = A0 + T0 + S
npvA = (1 - yy) * V - A0
npvT = yy * V - T0
sjekk("swap sum", npvA + npvT, S)
kort(D, 26,
     "Stock swap: the acquirer has 40 million shares at 100, the target 20 million at 25 (pre-announcement). The offer is 0.3 acquirer shares per target share and synergies are worth 300 million. What fraction y do target owners get? What is the NPV to each side?",
     f"y = {n(yy)}. NPV<sub>A</sub> = {n(npvA, 2)}, NPV<sub>T</sub> = {n(npvT, 2)} million",
     [f"New shares x = 0.3 × 20 = {n(x, 0)} million. y = 6/46 = {n(yy)}.",
      f"Combined value A + T + S = 4,000 + 500 + 300 = {n(V, 0)}. New price 4,800/46 = {n(V / (NA + x))}.",
      f"NPV<sub>A</sub> = (1 − y)(A + T + S) − A = {n(npvA, 2)}. NPV<sub>T</sub> = y(A + T + S) − T = {n(npvT, 2)}.",
      "Sum = 300 = S ✓ With shares the target shares in the synergies, so a disappointment hurts both sides."],
     f"y = x/N<sub>A</sub> = 0.15 instead of x/(N<sub>A</sub> + x); valuing the 6 million new shares at the acquirer's old price of 100: 6 × 100 − 500 = 100 instead of {n(npvT, 2)}.",
     "PS4 E2(b), lecture 12 p. 16 to 17")

NA, PA, NT, PT, S = 60, 50, 20, 30, 150
Aval, Tval = NA * PA, NT * PT
Xmax = NA * (Tval + S) / Aval
ERmax = (PT / PA) * (1 + S / Tval)
sjekk("ERmax", ERmax, Xmax / NT)
kort(D, 26,
     "The acquirer has 60 million shares at 50, the target 20 million shares at 30; synergies are worth 150 million. What is the largest number of new shares and the highest exchange ratio the acquirer can offer before its owners lose?",
     f"X ≤ {n(Xmax, 0)} million shares, ER ≤ {n(ERmax, 2)}",
     ["Condition: N<sub>A</sub>/(N<sub>A</sub> + X) × (A + T + S) ≥ A, which gives X ≤ N<sub>A</sub>(T + S)/A.",
      f"A = 3,000, T = 600: X ≤ 60 × 750/3,000 = {n(Xmax, 0)} million.",
      f"ER = X/N<sub>T</sub> ≤ (P<sub>T</sub>/P<sub>A</sub>)(1 + S/T) = 0.6 × 1.25 = {n(ERmax, 2)}.",
      "Without synergies the cap is the price ratio 0.6. Synergies are what make room for a premium."],
     "(P<sub>A</sub>/P<sub>T</sub>)(1 + S/T) = 2.08 (prices upside down); using post-announcement prices.",
     "PS4 E2(c), formula sheet")

offered = ER * 100 / 25 - 1
pn = V / (40 + x)
actual = ER * pn / 25 - 1
pn0 = (A0 + T0) / (40 + x)
actual0 = ER * pn0 / 25 - 1
kort(D, 26,
     "The acquirer (40 million shares at 100) offers 0.3 of its shares for each of the target's 20 million shares at 25. Synergies are 300 million. What premium do the target's owners actually receive? How does it compare with the offered premium?",
     f"Actual {p(actual)} against offered {p(offered)}",
     [f"Offered premium uses the acquirer's price before the deal: 0.3 × 100/25 − 1 = {p(offered)}.",
      f"Actual premium uses the price after the deal: P<sub>new</sub> = (4,000 + 500 + 300)/46 = {n(pn)}; 0.3 × {n(pn)} = {n(ER * pn)} per target share, {p(actual)} above 25.",
      f"With no synergies P<sub>new</sub> = 4,500/46 = {n(pn0)} and the actual premium falls to {p(actual0)}: the target pays part of its own premium.",
      "Measure every premium against the pre-announcement price of the target."],
     "Reporting the offered premium when the actual one is asked, or measuring the premium against the target's post-announcement price.",
     "manual 26.4")

before = 30 * 200 + 10 * 60
after = 30 * 196 + 10 * 75
kort(D, 26,
     "On the announcement of a bid, the acquirer (30 million shares) falls from 200 to 196 and the target (10 million shares) rises from 60 to 75. What synergies does the market expect? Who captures them?",
     f"S = {n(after - before, 0)} million. The target gains 150, the acquirer loses 120",
     [f"Combined value before: 30 × 200 + 10 × 60 = {n(before, 0)}. After: 30 × 196 + 10 × 75 = {n(after, 0)}.",
      f"Implied synergies = change in combined value = {n(after - before, 0)}.",
      "Target: 10 × 15 = +150. Acquirer: 30 × (−4) = −120. The acquirer pays more than the deal creates: overpayment, the signature of empire building or hubris.",
      "Caveats: if the deal may fail, prices are probability-weighted; if the bid revealed news about the target, part of its jump is not synergy."],
     "Reading the acquirer's fall as value destruction for the whole deal. The combined change is positive; the problem is how it is split.",
     "manual 26.6, lecture 12 p. 12")

EA, NA_, PA_ = 300, 100, 60
ET, NT_, PT_ = 50, 25, 20
ER0 = PT_ / PA_
x0 = ER0 * NT_
eps_new = (EA + ET) / (NA_ + x0)
p_new = (NA_ * PA_ + NT_ * PT_) / (NA_ + x0)
sjekk("EPS pris uendret", p_new, 60)
kort(D, 26,
     "A earns 300 million on 100 million shares at 60 (P/E 20). T earns 50 million on 25 million shares at 20 (P/E 10). A buys T with shares at no premium and there are no synergies. What happens to A's EPS and share price?",
     f"EPS rises from 3.0000 to {n(eps_new)}; the price stays at {n(p_new, 2)}",
     [f"ER = 20/60 = 1/3, so x = 25/3 = {n(x0)} million new shares.",
      f"EPS = (300 + 50)/{n(NA_ + x0)} = {n(eps_new)}, up {p(eps_new / 3 - 1)}.",
      f"Value: (6,000 + 500)/{n(NA_ + x0)} = {n(p_new, 2)}, unchanged. The P/E falls to {n(p_new / eps_new)}.",
      "Buying a lower P/E always lifts EPS by arithmetic alone: bootstrapping. EPS accretion is not value creation."],
     "'The deal is accretive, so it creates value.' Kurbatov lists EPS manipulation among the motives precisely because it creates nothing.",
     "manual 26.5, lecture 12 p. 4")

# Bank D (PS4 E3)
st_alone = {"A": 100, "B": 80, "C": 70, "D": 60}
with_D = {"A": {"A": 190, "B": 70, "C": 55}, "B": {"A": 90, "B": 170, "C": 55}, "C": {"A": 90, "B": 70, "C": 160}}
# with_D[vinner][bank] = verdien av bank når vinner kjøper D
res_vs_none = {b: with_D[b][b] - st_alone[b] for b in "ABC"}
res_vs_rival = {"A": 190 - 90, "B": 170 - 70, "C": 160 - 55}
kort(D, 26,
     "Banks A, B and C (stand-alone 100, 80, 70) bid for bank D (60). If A wins, the banks are worth A 190, B 70, C 55. If B wins: A 90, B 170, C 55. If C wins: A 90, B 70, C 160. D will be sold to one of them for sure. How much will each bid? Who wins at what price?",
     "A and B stop at 100, C bids up to 105: C wins at about 100",
     ["Reservation price = value if you win − value if a rival wins, not value if nobody buys.",
      "A: 190 − 90 = 100. B: 170 − 70 = 100. C: 160 − 55 = 105.",
      "C outbids the others and pays just above 100: 40 above D's stand-alone value.",
      "Against 'nobody buys D' each would pay only 90 (190 − 100, 170 − 80, 160 − 70). Fear of a rival owning D drives the price up."],
     "90 for everybody (the status quo used as the alternative, but the question says D will be sold anyway).",
     "PS4 E3(b)(c), lecture 12 p. 26")

kort(D, 26,
     "Bank D (stand-alone 60) is bought by C for 100. Before the deal A, B and C were worth 100, 80 and 70; after C's purchase they are worth 90, 70 and 160 (before paying). Who wins and who loses? How much value is created?",
     "D +40, A −10, B −10, C −10. Value created: +10",
     ["D's owners: 100 − 60 = +40.",
      "C: 160 − 100 − 70 = −10, but +5 against the 55 it would be worth if a rival had won.",
      "A: 90 − 100 = −10. B: 70 − 80 = −10.",
      "Total: 40 − 30 = +10 = (90 + 70 + 160) − (100 + 80 + 70 + 60) ✓ The target's owners take more than all of the gain, as in the data."],
     "C's NPV computed against 'nothing happens' only. Its real choice was between buying and watching a rival buy.",
     "PS4 E3(a)(d)")

dA = 0.5 * 30 + 0.5 * 20
eA = 0.5 * 50
dB = 0.5 * 10 + 0.5 * 15
eB = 0.5 * 25
dAB = 45
eAB = 0.5 * 45 + 0.5 * 15
sjekk("coins PS4", dA + eA + dB + eB, dAB + eAB)
kort(D, 26,
     "No synergies, two equally likely states, risk-neutral investors, rf = 0. Firm A is worth 80 or 20 and owes 30; firm B is worth 10 or 40 and owes 15. They merge and take over both debts. What happens to the value of debt and equity?",
     f"Debt {n(dA + dB, 1)} → {n(dAB, 1)}, equity {n(eA + eB, 1)} → {n(eAB, 1)}. Shareholders lose 7.5",
     [f"Apart: A's debt pays 30 or 20 ({n(dA, 1)}), equity 50 or 0 ({n(eA, 1)}). B's debt pays 10 or 15 ({n(dB, 1)}), equity 0 or 25 ({n(eB, 1)}).",
      "Merged: assets 90 or 60 against debt 45. The debt is now risk-free: 45. Equity pays 45 or 15: 30.",
      f"Firm value 75 before and after. Creditors +7.5, shareholders −7.5: a pure transfer (coinsurance).",
      "The condition: the two firms' cash flows must not be perfectly correlated. Shareholders can win it back by borrowing more after the merger."],
     "'Lower risk makes the merger good for shareholders.' Equity is a call: less risk lowers its value. Shareholders can diversify on their own by holding both shares.",
     "PS4 E4, lecture 12 p. 27 to 28")

gain = 0.20 * 2000 - 0.015 * 10000
kort(D, 26,
     "On a bid announcement the target (worth 2,000 million) rises 20% and the acquirer (worth 10,000 million) falls 1.5%. Did the deal create value? Compare with Kurbatov's averages.",
     f"Yes: combined +{n(gain, 0)} million, {p(gain / 12000)} of the combined value",
     ["Weight the returns by value: target +0.20 × 2,000 = +400; acquirer −0.015 × 10,000 = −150.",
      f"Combined +250 on 12,000 = {p(gain / 12000)}.",
      "Kurbatov's numbers: targets about +15% on announcement, acquirers about +1% on average and negative in half the cases, combined 1 to 3% and mostly positive. Value is usually created and mostly goes to the target."],
     "Averaging the two percentages ((20 − 1.5)/2 = 9.25%) or concluding the deal destroys value because the acquirer fell.",
     "lecture 12 p. 12")

NA, NT, ER, rf = 200, 40, 2, 0.04
PA0, PT0, PA1, PT1 = 30, 50, 29, 55
dep = ER * PA1 * (1 + rf)
fail = dep + PT0 - ER * PA0
ce = PT1 * (1 + rf)
pp = (ce - fail) / (dep - fail)
Ac = (PA1 * (1 + rf) - (1 - pp) * PA0) / pp
Ssyn = (NA + ER * NT) * Ac - (NA * PA0 + NT * PT0)
kort(D, 26,
     "Fjord (200 million shares) bids 2 Fjord shares for each of Li's 40 million shares; the deal is settled in one year. Prices revert if it fails. Before: Fjord 30, Li 50. Now: Fjord 29, Li 55. rf = 4%. What synergies does the market price in?",
     f"p = {n(pp)}; synergies about {n(Ssyn, 2)} million (at the completion date)",
     [f"Position: buy 1 Li for 55, short 2 Fjord for 58, deposit → {n(dep, 2)}. Fails: {n(dep, 2)} + 50 − 60 = {n(fail, 2)}. Certainty equivalent 55 × 1.04 = {n(ce, 2)}.",
      f"p = ({n(ce, 2)} − {n(fail, 2)})/({n(dep, 2)} − {n(fail, 2)}) = {n(pp)}.",
      f"Fjord's price if the deal completes: 29 × 1.04 = p × P<sub>c</sub> + (1 − p) × 30, so P<sub>c</sub> = {n(Ac)}.",
      f"Merged firm: (200 + 80) × {n(Ac)} = {n((NA + ER * NT) * Ac, 2)}. Stand-alone: 200 × 30 + 40 × 50 = 8,000. S = {n(Ssyn, 2)}."],
     "Using today's Fjord price (29) as the post-merger price: it mixes the completion and failure outcomes. Kurbatov's Mannesmann exercise asks for exactly this chain: probability, arbitrage, risk-neutral valuation, then the synergies.",
     "lecture 12 p. 20 to 22, lecture 14 recording")

prem = 62 / 50 - 1
kort(D, 26,
     "The target has 30 million shares that traded at 50 before any news of a bid. The bidder offers 62 in cash; the target now trades at 60. What is the premium in per cent and in NOK?",
     f"{p(prem)} and {n(30 * 12, 0)} million NOK",
     ["Measure against the pre-announcement price, 50, not today's 60.",
      f"Premium per share = 62 − 50 = 12, or 62/50 − 1 = {p(prem)}.",
      "In total: 30 million × 12 = 360 million.",
      "The 2 between 60 and 62 is the market's doubt that the deal completes (and the time value until it does)."],
     f"{p(62 / 60 - 1)} and 60 million (measured against today's price).",
     "manual 26.1, sjangre ma-1")


# =====================================================================
# 6. M&A VERBAL (k26)
# =====================================================================
D = "M&A verbal"

kort(D, 26,
     "H2024 type, 12 points: give four reasons, none of them synergies: one why an acquisition can be good for the acquirer, one why it can be bad for the acquirer, one good for the target, one bad for the target. 1 to 2 sentences each.",
     "One mechanism per box, named and explained",
     ["Good for the acquirer: a disciplinary takeover. It buys a badly run target at a price that reflects poor management, replaces the managers and unlocks the difference.",
      "Bad for the acquirer: empire building and hubris. A CEO paid for size, or sure he values the target better than the market, overpays; in an auction the winner is the most optimistic bidder (winner's curse).",
      "Good for the target: the control premium. To get control the bidder must pay well above the market price. The free-rider problem pushes it up further.",
      "Bad for the target: damage to what made it valuable. The new owner can destroy its corporate culture, lose its unique management vision or bend its long-term plans towards immediate returns."],
     "Leaving one box empty (a quarter of the points); 'the firms are worth more together' (that is a synergy); naming a reason without saying what it does. The key also accepts market power, supply chain and access to new markets; for the last box a low price accepted in return for a golden parachute also works.",
     "H2024 E1, manual 26.2")

kort(D, 26,
     "List Kurbatov's merger motives and the merger types. Which motives create value?",
     "Seven motives, four types",
     ["Economies of scale and scope, supply chain optimisation, complementary goods: real gains from combining (synergies).",
      "Industry consolidation and market power: profit for the merged firm, taken from customers.",
      "Changes in corporate control: better managers run the same assets better.",
      "EPS manipulation: no value, only arithmetic. Manager ambitions: an agency cost that destroys value for the acquirer's owners.",
      "Types: horizontal (same industry), vertical (along the supply chain), conglomerate (unrelated), reverse (a private firm takes over a listed one to get listed)."],
     "Listing only synergies, when the exam bans them, or treating EPS growth as a motive that creates value.",
     "lecture 12 p. 2 and 4")

kort(D, 26,
     "H2025 type: after a bid announcement the acquirer falls from 110 to 105 and the target rises from 16 to 20. Give one possible reason for the deal other than synergies and explain it in 2 to 3 sentences.",
     "Empire building: the acquirer's managers overpay to run a bigger firm",
     ["Read the reaction first: the acquirer fell and the target rose, so the market thinks the acquirer pays more than the target is worth to it. A value-creating motive would not push the acquirer down.",
      "A's CEO wants a larger company, for pay, prestige or a new market. He is willing to overpay. The target's owners capture the premium.",
      "This is an agency problem between A's managers and A's shareholders, not a synergy."],
     "A reason that would make the acquirer's price rise (better management of the target with a fair price, market power); synergies, which the question bans. Hubris or the winner's curse also fit the prices.",
     "H2025 E6(b), manual 26.6")

kort(D, 26,
     "H2025 type, continued: you own shares in the acquirer, whose price fell on the announcement. Management calls a shareholder vote on the deal. How do you vote? How do prices react if most owners vote the same way?",
     "Vote against. Prices move back towards their pre-announcement levels",
     ["Following the reason given before (empire building), the deal moves value from me to the target's owners, so I vote against.",
      "If most owners agree, the deal dies and prices revert towards 110 and 16, as the case assumes for a failed deal.",
      "Bonus: reversion may be incomplete if the market thinks entrenched managers will push on, or if the bid revealed that the target is undervalued or attractive to other bidders."],
     "A vote that does not follow from your own reason in the previous part. Consistency with part (b) is what is graded.",
     "H2025 E6(c)")

kort(D, 26,
     "Cash or shares: what decides how an acquirer pays? What does the choice signal?",
     "Liquidity, information, uncertainty, the seller's needs and time. Paying in shares signals that the acquirer finds its own shares overvalued",
     ["Kurbatov's list: the acquirer's liquidity and debt capacity; who has the information advantage; uncertainty about synergies and stand-alone values; whether the sellers need cash and how they are taxed; time.",
      "With shares the cost y(A + T + S) − T depends on the synergies, so the target shares the risk of misvaluation.",
      "An acquirer that thinks its shares are overpriced prefers to pay with them; one that thinks they are cheap pays cash.",
      "Investors know this, so a share offer is read as a sign of overvaluation and the acquirer's price falls (the Myers-Majluf logic)."],
     "'Shares are cheaper because no cash leaves the firm.' The target's owners get a fraction of the merged firm, which can cost far more than cash.",
     "PS4 E2(d), lecture 12 p. 24 to 25")

kort(D, 26,
     "Hostile takeovers: what can they do for a firm? What can they cost?",
     "They discipline management, but can disrupt the firm and provoke entrenchment",
     ["Benefits: new management, new ideas, better performance. Even the threat of a bid disciplines current managers.",
      "Costs: disruption of operations; 'soft' assets such as corporate culture can be destroyed (Kurbatov: Twitter).",
      "Takeover threats can push managers to entrench themselves with anti-takeover defences."],
     "Calling hostile takeovers simply good or simply bad. The exam wants both sides and the mechanism behind each.",
     "lecture 12 p. 11")

kort(D, 26,
     "Name the main anti-takeover defences. Which question does Kurbatov ask about all of them?",
     "Charter provisions, scorched earth, white knights, greenmail, regulatory barriers, golden parachutes. Do they raise value or entrench managers?",
     ["Charter provisions: poison pills, staggered boards, supermajority rules.",
      "Scorched earth: sell or destroy the asset the bidder wants. White knight: invite a friendlier bidder.",
      "Greenmail: buy back the raider's block at a premium. Regulatory barriers. Golden parachutes.",
      "Test: a defence used to extract a higher price serves the owners; one used to kill the bid serves the managers. A falling share price on its adoption points to entrenchment."],
     "Listing defences without the key question. The points come from saying whose interest the defence serves.",
     "lecture 12 p. 29")

kort(D, 26,
     "Who wins in mergers and acquisitions on average? Why do targets earn such high returns?",
     "Targets about +15% on announcement, acquirers about +1% (negative in half the cases), combined +1 to 3%",
     ["Kurbatov's figures: mergers usually create value. Most of it goes to the target's owners.",
      "Competition among bidders: the reservation price is the value if you win minus the value if a rival wins, which pushes bids up.",
      "The free-rider problem: target owners will not sell below the post-takeover value, so the bidder must hand over most of the gain.",
      "Acquirer-side agency and hubris: some acquirers overpay."],
     "Quoting the 20 to 40% offer premium as the targets' abnormal return. The premium is over the old price; the announcement return is about 15%.",
     "lecture 12 p. 5 and 12, PS4 E3")

kort(D, 26,
     "What is merger arbitrage? Why is it not risk-free? What role do the arbitrageurs play?",
     "Buy the target, short the acquirer in the exchange ratio. It is a bet on completion that pays like insurance",
     ["The position earns the deal spread if the deal completes and loses if it fails and prices revert.",
      "Target owners who sell before the outcome buy insurance against a failure; the spread is the price of that insurance.",
      "Arbitrageurs provide liquidity and carry deal risk, spread over many deals. Historically the strategy has been profitable (Mitchell and Pulvino, 2001).",
      "The risk left is mostly whether the deal goes through, which is why the implied p is found by discounting at r<sub>f</sub>."],
     "Calling it riskless arbitrage. The payoff depends on whether the deal completes.",
     "lecture 12 p. 22 to 23, PS4 E1(d)")

kort(D, 26,
     "Kurbatov's twist: 'What if we can delay this M&A by one year?' Answer with intuition.",
     "Delay is an option to wait: buy only if the synergies prove large. Worth most when uncertainty is high and no rival is near",
     ["Waiting turns the deal into a call: you buy later if the news is good and walk away if it is bad.",
      "Uncertainty that resolves within the year (a regulator, a test, the market) makes the option valuable.",
      "Costs: a year of lost synergies (like a dividend forgone) and the risk that a rival buys the target, which can also raise the price you would pay later."],
     "'Close now because the NPV is positive' or 'always delay because an option gains from time'. Weigh the option against the cost of waiting.",
     "lecture 14 recording, manual 25.1")

kort(D, 26,
     "A CEO argues that merging with an unrelated firm reduces risk and therefore benefits shareholders. Evaluate the argument.",
     "Weak: shareholders can diversify themselves. Lower risk also moves value from shareholders to creditors",
     ["Diversification inside the firm adds nothing that shareholders cannot get by holding both shares.",
      "Coinsurance: each firm's assets now back the other's debt, so the debt gets safer and is worth more. With firm value fixed, the equity loses (PS4: 37.5 to 30).",
      "The real gain is higher debt capacity and a larger tax shield if the merged firm borrows more, or lower distress costs: say so if you defend the deal.",
      "Risk reduction can serve the CEO, whose human capital is undiversified: an agency motive."],
     "Agreeing that 'less risk is worth a premium'. Only systematic risk is priced. Diversification does not reduce it.",
     "lecture 12 p. 27 to 28, manual 26.2")

kort(D, 26,
     "Beyond the price paid, what can make a merger fail even when its strategic logic is sound? Give the costs Kurbatov and the H2024 key name.",
     "Integration costs: culture, people, vision and horizon",
     ["Corporate culture: two ways of working collide. The 'soft' assets that made the target valuable can be lost.",
      "People and vision: key employees leave. A founder's unique management vision disappears with the founder.",
      "Horizon: long-term plans are bent towards immediate returns to justify the price.",
      "Disruption: management attention goes to the deal instead of the business while integration drags on."],
     "Answering only with overpayment. The question asks for costs that hit even a fairly priced deal; the H2024 key lists these under 'negative for the target'.",
     "lecture 14 recording, lecture 12 p. 11, H2024 E1 key")

kort(D, 26,
     "Why do mergers come in waves?",
     "Shocks to the business environment hit many firms in an industry at once",
     ["M&A activity clusters in short periods in some industries.",
      "Waves usually coincide with periods of sustained growth.",
      "Triggers: technological innovation, deregulation and other changes in legislation that make a new industry structure efficient."],
     "Explaining waves only by managers copying each other. Kurbatov points to changes in the business environment.",
     "lecture 12 p. 6")


# =====================================================================
# 7. GOVERNANCE (k27)
# =====================================================================
D = "governance"

kort(D, 27,
     "H2024 type, 12 points: select and describe two distinct ways of monitoring the CEO. Say who monitors and which tools they have. At most 3 to 4 sentences per method.",
     "1. The board, through its independent directors. 2. Large shareholders and institutions",
     ["Board: elected by the shareholders to act for them; the independent (outside) directors are the ones who can confront the CEO, since insiders report to him.",
      "Board tools: it hires and fires the CEO, sets his pay through the compensation committee, approves major investments and acquisitions. It oversees the accounts through the audit committee.",
      "Large shareholders (a founding family, a pension fund, an activist with a few per cent): big enough to overcome the free-rider problem, since they keep enough of any improvement to make monitoring pay.",
      "Their tools: voting their block against directors or the pay plan, putting items on the agenda, coordinated voting, public campaigns, proxy fights for board seats and, at the limit, backing a takeover or an LBO."],
     "Two methods that are really one ('the board' and 'the compensation committee'); describing the mechanism without naming the tools; citing one country's company law when the question names none.",
     "H2024 E2, lecture 13 p. 4 to 9")

kort(D, 27,
     "H2025 type, 12 points: you hold 5 to 10% of a firm whose managers shirk and enjoy private benefits. Select three actions and explain each in 2 to 3 sentences.",
     "Three actions from three channels: monitor from the board, rewrite pay, escalate to a proxy fight or a buyer",
     ["Monitor and take a board seat (internal monitoring): with 5 to 10% I keep enough of any gain to make monitoring pay, which a 0.1% holder does not. I demand access to management, nominate a director and push to replace insiders with independent directors.",
      "Rewrite the CEO's contract (better contracts): through the compensation committee or a vote against the pay plan I push for long-vesting shares, performance targets against peers and clawbacks, so shirking and perks cost him personally.",
      "Escalate (shareholder action and the market for corporate control): if quiet talks fail, I go public, gather other institutions and run a proxy fight to replace the board and the CEO, or find a buyer or LBO fund that will replace management."],
     "Two actions that overlap (voting against directors and a proxy fight to replace them); an action with no tool behind it ('write a letter asking him to work harder'); ignoring the size of the stake. Selling the shares counts as a creative bonus.",
     "H2025 E2, manual 27.5")

kort(D, 27,
     "Name the ways a manager can act against the shareholders, with an example of each.",
     "Shirking, private benefits, empire building, entrenchment and the wrong amount of risk",
     ["Shirking: low effort (H2025 E2: a CEO who designs exam tasks instead of running the firm).",
      "Private benefits: perks, jets, pet projects paid for by the owners.",
      "Empire building: growing the firm beyond its value-maximising size because pay and prestige grow with size.",
      "Entrenchment: making himself hard to replace (staggered board, defences) and hiding bad news (report manipulation).",
      "Risk: too little (a passive manager protecting his job) or too much (gambling when his options are out of the money)."],
     "Naming only 'the agency problem'. The exam rewards the specific name of the behaviour and the tool that fixes it.",
     "lecture 13 p. 2 and 15, sjangre governance-1")

kort(D, 27,
     "Kurbatov's four governance tools. Classify each: (a) restricted shares that vest over five years, (b) an activist runs a proxy fight, (c) the board adds two independent directors, (d) a law requires independent auditors.",
     "(a) Better contracts. (b) Shareholder action. (c) Better monitoring. (d) Regulation",
     ["Better monitoring: someone watches the manager more closely (board, large holders, lenders, employees, authorities, outsiders).",
      "Better contracts: change what the manager wants by changing what he earns (pay, vesting, targets).",
      "Shareholder action: owners use their votes and voice (agenda items, coordinated voting, campaigns, proxy contests).",
      "Regulation: the state sets rules that make monitoring easier (SOX, Dodd-Frank)."],
     "Calling a pay change 'monitoring' because the board decides it. Nobody watches the CEO more closely; his incentives change.",
     "lecture 13 p. 3")

kort(D, 27,
     "According to Kurbatov, who can monitor the managers of a firm and with what?",
     "Shareholders (especially big institutions) and the board; to a degree also lenders, employees, authorities and outsiders",
     ["Shareholders, above all large institutions: votes, proposals, engagement, proxy fights.",
      "The board: hires, fires and pays the executives and takes the major decisions.",
      "Lenders: covenants and the threat of calling the loan. Employees: they see problems first and can blow the whistle. Authorities: fraud cases.",
      "External monitoring: the market for corporate control (the threat of a takeover), analysts and the press."],
     "Listing small dispersed shareholders as monitors: each keeps too little of the gain to pay the cost, so they free-ride.",
     "lecture 13 p. 4, lecture 14 p. 24")

kort(D, 27,
     "What makes a board good or bad at monitoring? Use Kurbatov's list.",
     "Independence above all; watch for captive boards, a CEO as chair, staggered terms, size and busy directors",
     ["Directors can be insiders (employees), gray (ties to the firm, such as its lawyer or banker) or independent. Independent boards monitor better.",
      "A captive board was picked by the CEO it should watch. A CEO who chairs the board sets its agenda.",
      "A staggered board elects only some seats each year, which makes incumbents much harder to replace.",
      "Size and time: Kurbatov puts a good board at 7 to 11 members. Too small lacks capacity, too large invites free riding. Directors with many seats are too busy to monitor."],
     "Counting gray directors as independent; treating a board as independent because it has a majority of outsiders while the CEO chairs it.",
     "lecture 13 p. 5, manual 27.2")

kort(D, 27,
     "A board has 9 seats with staggered three-year terms (3 seats elected each year). An activist wants a majority to replace the CEO. How many annual meetings does it need, even if it wins every contested seat?",
     "Two meetings",
     ["A majority of 9 is 5 seats.",
      "First meeting: 3 seats, short of 5.",
      "Second meeting: 6 seats, a majority.",
      "That delay is why Kurbatov calls a staggered board 'much harder to replace incumbent members'. It is also why it works as a takeover defence."],
     "One meeting (forgetting that only a third of the seats are up); three (thinking every seat must be replaced).",
     "lecture 13 p. 5, sjangre governance-4")

eps0 = 500 / 200
eps1 = (500 - 0.04 * 1000) / (200 - 1000 / 50)
kort(D, 27,
     "A firm earns 500 a year, including 40 of interest on 1,000 of cash (4%). It has 200 shares at 50; no taxes, perfect markets. The CEO's bonus depends on EPS. He spends all the cash buying back shares at 50. What happens to EPS and to the share price?",
     f"EPS rises from {n(eps0)} to {n(eps1)}; the price stays at 50",
     ["Shares bought: 1,000/50 = 20, leaving 180.",
      f"Earnings lose the interest: 500 − 40 = 460. EPS = 460/180 = {n(eps1)}.",
      "Equity was 200 × 50 = 10,000; 1,000 is paid out; 9,000/180 = 50. Owners gain nothing.",
      "Kurbatov's point: KPI targets make managers short-sighted. They may prefer such moves, or cut long-term projects, to hit this year's number."],
     "'EPS is up, so value is up.' The buyback moves cash from the firm to the sellers at a fair price; the bonus pays for nothing.",
     "lecture 14 recording, lecture 13 p. 7")

kort(D, 27,
     "Can you design a perfect pay contract for a CEO? Discuss performance metrics, stock-based pay and golden parachutes.",
     "No: every tool fixes one problem and creates another",
     ["Performance metrics (EPS, KPIs): easy to observe, but the manager targets the number rather than the value. He becomes short-sighted.",
      "Stock-based pay: ties his wealth to the share price, but short vesting invites timing and options can reward risk taking. Use long vesting and clawbacks.",
      "Golden parachutes: can stop a CEO from blocking a good takeover to save his job, but can also reward failure or buy his consent to a low offer.",
      "Monitor too hard and the manager becomes too passive; give him freedom and he may shirk. That is the trade-off."],
     "Claiming more stock-based pay always aligns interests. It aligns him with the share price, which he can move in the short run.",
     "lecture 13 p. 6 to 7 and 15")

c, gain_pct, Vf = 2, 0.02, 2000
kort(D, 27,
     "A firm is worth 2,000 million. Active monitoring costs 2 million a year and would raise the value by 2%. Does a 7% owner monitor? A 0.1% owner?",
     "The 7% owner does (2.8 &gt; 2); the 0.1% owner does not (0.04 &lt; 2)",
     [f"Value created: 2% × 2,000 = {n(gain_pct * Vf, 0)} million.",
      f"7% owner keeps 0.07 × 40 = {n(0.07 * 40, 1)} &gt; 2: monitoring pays.",
      f"0.1% owner keeps 0.001 × 40 = {n(0.001 * 40, 2)} &lt; 2: he free-rides.",
      "Rule: monitor if α × ΔV &gt; C. This is why large holders and institutions monitor and dispersed owners do not."],
     "Comparing the full 40 with the cost: everyone gains from monitoring, but each pays the whole cost alone.",
     "manual 27.1, H2025 E2")

kort(D, 27,
     "What can shareholders do, beyond selling? List Kurbatov's forms of shareholder action.",
     "'Just vote no', agenda items, coordinated voting, activist campaigns, proxy contests",
     ["'Just vote no': vote against directors or the pay plan. It rarely wins outright, but a large protest vote is a signal.",
      "Add items to the agenda of the meeting (shareholder proposals).",
      "Coordinated voting: institutions vote together.",
      "Activist campaigns: public letters and plans. Proxy contests: run your own slate of directors.",
      "Facts from the readings: retail investors vote little. Institutions often delegate to proxy advisers."],
     "Treating exit (selling) as monitoring. It can discipline through the share price, but it gives up the voice.",
     "lecture 13 p. 8")

kort(D, 27,
     "Many funds vote as the proxy adviser ISS or Glass Lewis recommends. Is that optimal?",
     "Cheap but not obviously optimal: one standard policy replaces judgment at each firm",
     ["A fund with small stakes in thousands of firms would spend more on research than it gains at each one (α × ΔV &lt; C), so buying a recommendation is rational.",
      "The cost of research is shared across all the adviser's clients.",
      "But votes follow a template rather than the facts at each firm. Advisers also gain influence without owning anything or bearing the consequences.",
      "Kurbatov's question 'is that optimal?' wants both sides."],
     "Saying advisers solve the free-rider problem completely, or that they hold the shares themselves.",
     "lecture 13 p. 9")

kort(D, 27,
     "A new board demands approval for every project and says it will fire the CEO after one loss-making quarter. What is the likely effect on firm value?",
     "Probably lower: the CEO becomes too passive and drops risky positive-NPV projects",
     ["A risky project with positive NPV can lose money in some quarter. The CEO now bears that risk with his job; the owners keep the upside.",
      "He picks safe, low-value projects instead.",
      "Kurbatov: 'a manager who is monitored too strongly will be too passive'. The trade-off is freedom for the manager or tight control.",
      "Entrenchment is the opposite failure: a manager protected by a staggered board or defences is monitored too little."],
     "'More monitoring always means more value.' Past some point it buys less shirking at the price of less risk taking.",
     "lecture 13 p. 15 and 18")

kort(D, 27,
     "What did Sarbanes-Oxley and Dodd-Frank change in corporate governance? Why did they come?",
     "SOX: independent auditors, more disclosure, personal responsibility. Dodd-Frank: independent pay committees, nominations by large holders",
     ["Background: the frauds of the early 2000s, with Enron (about 11 billion dollars of shareholder losses) as the landmark case. Earlier, the 1984 Insider Trading Sanctions Act targeted insiders.",
      "Sarbanes-Oxley: independent auditors, enhanced disclosure, corporate responsibility for the accounts.",
      "Dodd-Frank (after the financial crisis): many stability rules, plus independent compensation committees and a right for large shareholders to nominate board members.",
      "Regulation supports monitoring; it does not replace it."],
     "Swapping the two acts. SOX is about the numbers; Dodd-Frank strengthened shareholders against the board.",
     "lecture 13 p. 17")

kort(D, 27,
     "Shareholders or stakeholders? A CEO keeps an unprofitable plant open to protect local jobs. Discuss.",
     "Friedman: the CEO spends the owners' money on a goal they did not choose. The counterargument: firms have many constituencies",
     ["Friedman (1970): the manager is the owners' agent. Social goals are for owners to fund with their own money if they want them.",
      "Kurbatov's worry about the stakeholder view: too many missions and conflicting interests make the manager accountable to no one.",
      "The other side: CSR and the Stanford survey. 89% of executives call stakeholders important and only 23% say shareholders clearly come first; employees are ranked most important.",
      "A balanced answer: stakeholder care that raises long-run value is consistent with value maximisation; spending that does not is an agency cost."],
     "Using the survey as proof that the plant should stay open. It describes what CEOs believe, not whose money it is.",
     "lecture 1 p. 28 to 32, lecture 13 p. 2")

kort(D, 27,
     "A mature firm generates 400 a year of free cash flow and has no positive-NPV projects. The CEO, who owns 0.2% of the shares, wants to reinvest it all to grow. What are the four uses of free cash flow? Which is best here?",
     "Dividend, buyback, hold cash, reinvest. Pay it out: reinvesting here is empire building",
     ["Under MM the choice is irrelevant. With frictions it is not.",
      "Without positive-NPV projects, every reinvestment has a negative NPV: a bigger firm worth less.",
      "The CEO bears 0.2% of the loss but enjoys all of the size and prestige: the agency problem in miniature.",
      "Dividends or buybacks take the cash out of his hands. Dividends are sticky (cutting them is punished); buybacks are flexible and can signal undervaluation."],
     "'Under MM it does not matter.' The question is about agency, where it does.",
     "lecture 14 recording, lecture 5")

kort(D, 27,
     "Why can an LBO or a takeover threat work as governance?",
     "It replaces or disciplines management from outside the firm",
     ["A badly run firm trades below what it would be worth under good managers. A bidder or LBO fund can buy it, replace the managers and keep the gain.",
      "In an LBO the new owners hold a large stake (no free-rider problem) and the heavy debt commits the managers to pay out cash instead of building empires.",
      "Even the threat of a bid disciplines current managers, which is why defences that remove the threat are a governance concern."],
     "Treating the market for corporate control as a monitor with daily tools. It works through the threat and the occasional bid.",
     "manual 27.6, lecture 12 p. 11")

kort(D, 27,
     "A governance question names no country. Which framework do you answer in? When do you bring in Norwegian company law?",
     "Answer in the general (Kurbatov's) framework; bring in Norwegian law only if the question says ASA or Norway",
     ["Kurbatov teaches governance in a general, largely American frame: boards, staggered boards, proxy fights, ISS, SOX, Dodd-Frank.",
      "H2024 E2 and H2025 E2 name no jurisdiction. The keys accept any reasonable mechanism with an explanation.",
      "If the case is a Norwegian ASA, one sentence on the general meeting or the board's duties can add precision, but it does not replace the mechanism."],
     "Building the answer on Norwegian law, or calling an American mechanism 'wrong' because Norwegian law differs. The points are for mechanisms, tools and who uses them.",
     "lecture 13, docs forelesninger A7")


# =====================================================================
# 8. EKSAMENSTEKNIKK (k28)
# =====================================================================
D = "eksamensteknikk"

kort(D, 0,
     "What does Kurbatov's exam look like? Structure, points, time and grading.",
     "The same structure as H2024 and H2025: two theory questions, four problems, every block covered",
     ["Two theory questions of about 10 points each (12 in H2024 and H2025), answerable with sound reasoning; four computational problems, about 80% of the paper, several ending with 3 to 5 points of intuition.",
      "The topics can move between the questions, so do not count on the order of H2024 and H2025. Three-star exercises from the problem sets can come.",
      "Every block gets at least one exercise or sub-question: capital structure and payout, valuation with leverage, options and real options, M&A and governance.",
      "Part (a) is easy. No multiple choice. The formula sheet is the last page; your own sheets are not allowed. Calculator (ideally scientific with powers) and one bilingual dictionary.",
      "Three hours (NHH course page for autumn 2026), written and answered in English. Graded on a curve by examiners; the A line has been about 90 to 91 points."],
     "Preparing from pre-2024 exams as if they were his: 2022 is close and 2016 only with care. Their M&A and governance parts are not representative.",
     "lecture 14 recording")

kort(D, 0,
     "How do you budget time across the six exercises?",
     "About 1.6 minutes per point on a 3-hour paper, 2.2 on a 4-hour one, with a stop time written next to each exercise",
     ["Spend the first 10 minutes reading every exercise and writing the points next to each.",
      "Three hours: 180 − 10 reading − 10 checking = 160 minutes for 100 points, 1.6 a point. A 12-point exercise gets about 19 minutes, a 20-point one about 32.",
      "Four hours: 240 − 10 − 10 = 220 minutes, 2.2 a point. A 12-point exercise gets about 26 minutes, a 20-point one 44.",
      "Write the closing minute in the margin. When the clock passes it, move on and come back later.",
      "Early sub-questions are the easy ones, so a started exercise beats perfecting a hard part."],
     "Starting with the biggest exercise and reaching minute 150 with both theory questions unwritten.",
     "manual 28.1")

kort(D, 28,
     "The question says 'evaluate the project'. You have the firm's levered value and the project's PV. What do you report?",
     "The project's NPV: its PV minus its investment, not the firm's value",
     ["Kurbatov: 'if it says evaluate the project, I want the NPV of the project, not the firm'. Reporting firm value costs a lot of points.",
      "PV is not NPV: subtract the investment before you report.",
      "Underline 'project' or 'firm' and 'PV' or 'NPV' in the question before you compute."],
     "Firm value reported as the answer, or a PV with the investment never subtracted.",
     "lecture 14 recording, manual 28.7")

kort(D, 28,
     "How many decimals? When do you round?",
     "Typically four decimals, at most four for small numbers; round only when you write the final number",
     ["Kurbatov: typically four decimals, at most four for small numbers; no cents when the numbers are in billions.",
      "H2025 E4: 'Recommended precision is 4 decimal places (as in, 1.2345 instead of 1.23)', for amounts such as 72.0178 as well as for rates.",
      "Carry six decimals inside a chain. A rate rounded early moves a perpetuity by whole units and spreads through every later step."],
     "Rounding ρ, a monthly rate or a discount factor mid-chain, or reporting small amounts with two decimals. The H2025 key accepts a drift of about 0.001 but calls about 0.05 too much.",
     "lecture 14 recording, H2025 E4, manual 28.7")

kort(D, 28,
     "You cannot get part (b), but parts (c) and (d) build on it. What do you do?",
     "Name the missing number as a symbol or a labelled assumption and carry on: follow-on errors are not punished twice",
     ["Kurbatov: a later part that uses your wrong earlier number correctly gets full marks.",
      "Write 'I could not obtain β<sub>U</sub> in (b); I carry it forward as β<sub>U</sub>' and do the algebra.",
      "If a number is needed, assume one and label it: 'Assume β<sub>U</sub> = 1.4, since (b) is unresolved.'",
      "Leave nothing blank: an empty sub-question is the only guaranteed zero."],
     "Stopping at the broken part, or inventing a number silently, which makes later parts look wrong rather than consistent.",
     "lecture 14 recording, manual 28.8")

kort(D, 28,
     "Which discount rate goes with which valuation method? And why is r_wacc below r_U?",
     "FCFE at r<sub>E</sub>, APV at r<sub>U</sub>, WACC method at r<sub>wacc</sub>",
     ["Given r<sub>wacc</sub>: expect the WACC method. Given r<sub>U</sub>: expect APV. Maybe both: then they must agree.",
      "FCF never subtracts interest; the tax benefit of debt enters through r<sub>wacc</sub> or through PV(TS), never twice. FCFE = FCF − (1 − τ) × interest + net borrowing, discounted at r<sub>E</sub>.",
      "r<sub>wacc</sub> = r<sub>U</sub> − (D/V)τr<sub>D</sub> under constant leverage: the after-tax cost of debt carries the tax shield, so r<sub>wacc</sub> is below r<sub>U</sub> whenever there is debt and tax. Example: 10% − 0.4 × 0.22 × 5% = 9.56%."],
     "Discounting FCF at r<sub>E</sub>, subtracting interest from FCF and then also using r<sub>wacc</sub> (tax shield counted twice).",
     "lecture 14 recording, lecture 14 p. 16 to 18")

r8 = 0.08
kort(D, 28,
     "The annual rate is 8%. What do you use for 6 months, for 18 months and for one month?",
     f"6 months: {p(r8 and 1.08 ** 0.5 - 1, 4)}. 18 months: factor 1.08<sup>1.5</sup> = {n(1.08 ** 1.5, 6)}. One month: {p(1.08 ** (1 / 12) - 1, 4)}",
     ["Compound, never divide: (1 + r)<sup>T</sup> with T in years.",
      f"Six months: √1.08 − 1 = {p(1.08 ** 0.5 - 1, 4)}.",
      f"18 months: discount with 1.08<sup>1.5</sup> = {n(1.08 ** 1.5, 6)}. This is how Kurbatov annualises Google's 18-month yield.",
      f"Monthly: 1.08<sup>1/12</sup> − 1 = {p(1.08 ** (1 / 12) - 1, 4)}; back again (1 + r<sub>m</sub>)<sup>12</sup> − 1 = 8%."],
     f"8%/2 = 4% and 8%/12 = {p(0.08 / 12, 4)}. Kurbatov said he would not be surprised to see this on the exam.",
     "lecture 14 recording, manual 28.7")

kort(D, 28,
     "Read what is asked: which small words in a question change the answer you must give?",
     "'Most you would pay', 'from today's perspective', 'as perceived by the market', 'answer both questions', 'actual premium'",
     ["'How much would you pay': a maximum, the value of the information or option, not a price.",
      "'NPV from today's perspective': discount date-1 values back to date 0.",
      "'Probability as perceived by the market': a risk-neutral (or r<sub>f</sub>-discounted) probability backed out of prices.",
      "'Answer both questions': two answers, each stated in words. H2025 E1 said it outright: 'Please be very clear and answer both questions'.",
      "'Offered' or 'actual' premium; 'stand-alone' or 'combined'; 'value of the option' (against the best alternative, which is often 0)."],
     "Answering a nearby question correctly. The key gives no points for the number that was not asked.",
     "lecture 14 recording, manual 28.7")

kort(D, 28,
     "How do you write a 12-point verbal answer (governance or M&A motives)?",
     "Exactly the number of items asked, each in its own paragraph: the mechanism named first, then who, how and why, within the sentence budget",
     ["Count the items: 'two methods', 'three actions', 'four boxes'. Each is graded on its own, so three solid items beat one brilliant one.",
      "First line of each item: the name of the mechanism ('the board', 'disciplinary takeover', 'winner's curse').",
      "Then explain it with the case facts (the 5 to 10% stake, the price reaction).",
      "Keep to the budget: 2 to 3 or 3 to 4 sentences. Length is not rewarded."],
     "Overlapping items, items without a mechanism, a general essay on governance, or synergies when they are banned.",
     "manual 28.5, H2024 E1 and E2, H2025 E2")

kort(D, 23,
     "The exam asks about Black-Scholes. What will you have to do? What not?",
     "No Black-Scholes calculation; explain directions and mechanisms",
     ["Kurbatov, repeatedly: 'Black-Scholes calculation will not be in the exam. Intuition can be there.' You need not explain N(d<sub>1</sub>).",
      "Expect: what a change in σ, T, r<sub>f</sub>, S or K does to a call or a put and why; implied against true volatility (H2025 E1); American against European.",
      "Option prices you must compute come from parity or the binomial model.",
      "No American options to price, only the intuition."],
     "Spending exam minutes computing d<sub>1</sub> and N(d<sub>1</sub>). It earns nothing and costs time.",
     "lecture 14 recording")

kort(D, 28,
     "A strategy costs 100 today and pays 108.15 or 78.15 in a year (rf = 3%). Which equation gives the implied probability? What error do the keys name here?",
     f"100 × 1.03 = p × 108.15 + (1 − p) × 78.15, so p = {n((103 - 78.15) / 30)}",
     ["Move every amount to the same date before you compare. Today's 100 is worth 103 in a year.",
      f"103 − 78.15 = 30p gives p = {n((103 - 78.15) / 30)}.",
      "The same habit applies everywhere: a certainty equivalent, a date-1 NPV brought back to date 0, an amount paid later in a real option."],
     f"100 = p × 108.15 + (1 − p) × 78.15, which gives {n((100 - 78.15) / 30)}: p comes out 10 percentage points too low, the error the H2025 key singles out.",
     "H2025 E6, manual 28.7")

kort(D, 28,
     "Which checks close an answer? What does each catch?",
     "Run a check that can fail and write one line saying it passed",
     ["Valuation: WACC value = APV value; weighted betas (E/V)β<sub>E</sub> + (D/V)β<sub>D</sub> = β<sub>U</sub>.",
      "Agency: creditors' gain + shareholders' gain = the project's NPV; with fixed total value, one side's gain is the other's loss.",
      "Options: ρ between 0 and 1; parity C − P = S − PV(K); D + E = V; a second twin for the same stream gives the same ρ.",
      "Real options: the option's value equals the probability of the branch it changes times the improvement there, discounted.",
      "M&A: the NPVs to acquirer and target sum to S; the long-short route and the spread shortcut give the same p."],
     "Running a check that is an identity by construction and believing it tests the inputs: ρ always reprices the S<sub>0</sub> it came from; p always reprices the outlay. Those lines only confirm the arithmetic.",
     "manual 28.6")

kort(D, 28,
     "Which words in a question tell you which method to use?",
     "Match the cue to the routine before you touch the numbers",
     ["'Assume perfect capital markets': MM; show that debt and equity give the same value.",
      "'Uncorrelated with the market', 'the probability is known': real probabilities discounted at r<sub>f</sub>.",
      "'You do not know the probabilities', 'traded price', 'up and down': risk-neutral ρ from the twin.",
      "'Maintains a target D/E': tax shield at r<sub>U</sub>. 'Permanent debt of X': tax shield at r<sub>D</sub>, PV(TS) = τD.",
      "'Invest now or wait', 'may exit': fold the tree back, max at each node, compare with 0."],
     "Choosing the method from the topic heading instead of from the wording. The paper gives no headings.",
     "lecture 14 recording, manual 28.2")

kort(D, 28,
     "What is on the formula sheet? What must you know by heart for blocks 3 and 4?",
     "On the sheet: binomial replication and ρ, the stock-swap NPVs and the exchange-ratio cap. By heart: everything else in options, real options and deal probabilities",
     ["On the sheet: Δ, B and ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>); the M&A swap NPVs and ER = x/N<sub>T</sub> ≤ [(T + S)/A](N<sub>A</sub>/N<sub>T</sub>). Nothing else from blocks 3 and 4.",
      "By heart: put-call parity C + PV(K) = P + S; E = C(K) and D = PV(K) − P(K); senior and junior debt from calls; the CDS from ρ.",
      "By heart: everything about real options (max at each node, value of information, exit as a put, compare with 0).",
      "By heart: cash NPVs S − (P − T) and P − T; the deal probability from the long-short position with (1 + r<sub>f</sub>)<sup>T</sup>."],
     "Assuming parity or the deal-probability set-up will be printed. Write the unprinted formulas on scrap paper in the first minute.",
     "formula sheet, manual 28.7")

kort(D, 25,
     "Kurbatov said decision trees help but are unlikely to earn points by themselves. How should you use one in a real-option answer?",
     "As a tool: maximum at each decision node first, then probability-weight and discount. Report the option as a difference",
     ["Squares for decisions, circles for chance, numbers on every branch.",
      "At each decision node take max(continue, stop, 0) before averaging; averaging first erases the option.",
      "Report the option's value as the difference between two strategies you have both computed.",
      "Compare with the best alternative, which is often doing nothing (0), not a negative NPV."],
     "A beautiful tree with no numbers or no conclusion. Points are for values and the decision in words ('wait', 'open').",
     "lecture 14 recording, manual 25.7")

kort(D, 28,
     "How should you prepare in the last weeks, according to Kurbatov?",
     "His two exams, then the problem sets, then the slides; the textbook last",
     ["H2024 and H2025: same structure and spirit, not identical questions.",
      "Problem sets: anything solvable in a few lines can come, often with a twist; big Excel exercises will not. The stars say nothing about difficulty. Three-star exercises can come too.",
      "The M&A lecture is Problem Set 4 (the Mannesmann example and the three at the end). Governance has no computations.",
      "Slides: 'understand everything in this presentation, preferably in all the presentations'. Textbook chapters and exercises have lower priority."],
     "Treating pre-2024 exams as his. M&A and governance there are not representative.",
     "lecture 14 recording")


# =====================================================================
# Kontroll og utskrift
# =====================================================================
def kontroller():
    ids = [k["id"] for k in KORT]
    assert len(ids) == len(set(ids)), "doble id-er"
    for k in KORT:
        for felt in ("front", "back"):
            t = k[felt]
            assert "—" not in t, f"tankestrek i {k['id']} {felt}"
            assert " – " not in t, f"tankestrek (en dash) i {k['id']} {felt}"
            assert not re.search(r",\s+and\b", t), f"komma foran and i {k['id']} {felt}: {t}"
            assert "Felle" not in t
        assert not re.search(r"<[a-zA-Z/]", k["front"]), f"HTML i front {k['id']}"
        assert "Trap:" in k["back"] and k["back"].startswith("<b>")
        assert k["deck"] in SLUG
        assert isinstance(k["ch"], int) and 0 <= k["ch"] <= 29


if __name__ == "__main__":
    import sys
    if "--liste" in sys.argv:
        for k in KORT:
            for felt in ("front", "back"):
                for m in re.finditer(r".{0,40},\s+and\b.{0,20}", k[felt]):
                    print(k["id"], felt, "|", m.group(0))
        raise SystemExit
    kontroller()
    ut = os.path.join(HER, "del2_kort.json")
    with open(ut, "w", encoding="utf-8") as fh:
        json.dump(KORT, fh, ensure_ascii=False, indent=1)
    print(f"{len(KORT)} kort skrevet til {ut}")
    for d in SLUG:
        print(f"  {d}: {TELLER.get(d, 0)}")
    print(f"{len(KONTROLL)} kontrolltall stemte")
