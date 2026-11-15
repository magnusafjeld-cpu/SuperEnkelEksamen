# -*- coding: utf-8 -*-
"""Eksamenstrening FIE402: opsjoner (skribent 3).

   Familier med tallsvar:
     ops-pay1  profitt på en opsjonsposisjon ved forfall (straddle, spread, sikret aksje, skrevet put)
     ops-par1  put-call-paritet: den manglende prisen, diskret diskontering over T år
     ops-arb1  paritetsbrudd: arbitrasjegevinsten i dag
     ops-rho1  den risikonøytrale sannsynligheten ρ, også for et halvår eller et kvartal
     ops-bin1  binomisk pris på en call eller put med ett steg (reell sannsynlighet oppgitt)
     ops-rep1  replikerende portefølje: hvor mye du låner eller låner ut (B)
     ops-two1  to perioder: pris den letteste først og bruk paritet
     ops-oth1  ρ hentet fra en notert call og brukt på et annet krav på samme tre
     ops-exp1  forventet avkastning på en opsjon (PS3 E2 og E4)
   Statiske: ops-s01 til ops-s12, Black-Scholes bare som intuisjon (A6, D1).

   Konvensjoner (docs/fie402-trening-spek.md § 3b): diskret diskontering
   PV(K) = K/(1 + r_f)^T, ingen Black-Scholes-regning, ρ diskonteres med r_f.
"""
from trening_lib import *  # noqa: F401,F403
import math

AKSJER = ["Nordkapp Fisk ASA", "Brekke Solar ASA", "Hammerfjell Gruve ASA", "Lyngdal Data ASA",
          "Straumsnes Bio ASA", "Tindevik Shipping ASA", "Kvitfjell Energi ASA", "Fjordlys Media ASA",
          "Sørvik Havbruk ASA", "Ravnanger Teknologi ASA"]


def _f(x):
    """Pris eller sannsynlighet med fire desimaler, som Kurbatov."""
    return tall(x, 4)


def _fp(x):
    """Fire desimaler, med parentes rundt et negativt tall: «(−0.2933)»."""
    return f"({_f(x)})" if rund(x, 4) < 0 else _f(x)


def _w(x):
    """En nodevekt som ρ² med seks desimaler, så summene går opp."""
    return tall(x, 6)


def _k(x):
    """Notert pris med to desimaler."""
    return tall(x, 2)


def _p(x, d=2):
    return pst(x, d)


def _tid(T):
    """Løpetiden i ord."""
    return {0.25: "three months", 0.5: "six months", 0.75: "nine months", 1: "one year", 1.5: "18 months",
            2: "two years", 3: "three years"}[T]


def _tidtall(T):
    """T i år slik det skrives i en eksponent: 2, 1.5, 0.25."""
    if T == int(T):
        return tall(T, 0)
    return tall(T, 1) if T * 2 == int(T * 2) else tall(T, 2)


def _pv_tekst(K, r, T):
    """«K/(1 + r)^T» som tekst."""
    if T == 1:
        return f"{tall(K, 0)}/{tall(1 + r, 3 if rund(r * 1000) % 10 else 2)}"
    return f"{tall(K, 0)}/{tall(1 + r, 3 if rund(r * 1000) % 10 else 2)}<sup>{_tidtall(T)}</sup>"


def _r(r):
    """En rente som desimaltall: 0.06, 0.045."""
    return tall(r, 3 if rund(r * 1000) % 10 else 2)


def _vekst(r):
    """1 + r som tekst: 1.05, 1.045."""
    return tall(1 + r, 3 if rund(r * 1000) % 10 else 2)


# ---------------------------------------------------------------------------
# ops-pay1 · Profitt på en posisjon ved forfall
# ---------------------------------------------------------------------------
@familie("ops-pay1", tema="opsjoner", antall=6, tittel="Profit on an option position at expiry",
         hjelp=hjelp3(
             "This is about payoff and profit at expiry. Each leg pays only when exercising it helps its holder. "
             "Profit is the total payoff minus the net premium.",
             "Call payoff = max(S<sub>T</sub> − K, 0). Put payoff = max(K − S<sub>T</sub>, 0). A written option pays "
             "the negative of these. Profit = payoff − premiums paid + premiums received.",
             "<p><b>Step 1: each leg on its own.</b> Is the option in the money at S<sub>T</sub>? If not, its "
             "payoff is 0, never negative.</p>"
             "<p><b>Step 2: add the payoffs.</b> A written option and a share held count too.</p>"
             "<p><b>Step 3: the net premium.</b> Subtract what you paid today and add what you received. "
             "The question tells you to ignore interest on it.</p>"
             "<p><b>Watch out:</b> the payoff is not the profit. The holder's profit is the writer's loss.</p>",
         ))
def _(r):
    navn = r.choice(AKSJER)
    typ = r.choice(["straddle", "bull", "protective", "shortput"])
    if typ == "straddle":
        K = r.choice([80, 90, 100, 120, 150])
        C = rund(K * r.choice([0.05, 0.06, 0.07, 0.08]) + r.choice([0.15, 0.35, 0.55]), 2)
        P = rund(K * r.choice([0.04, 0.05, 0.06]) + r.choice([0.10, 0.30, 0.45]), 2)
        flytt = r.choice([-0.22, -0.18, -0.12, 0.12, 0.18, 0.25])
        ST = round(K * (1 + flytt))
        bet = abs(ST - K)
        riktig = bet - C - P
        if abs(riktig) < 0.5:
            raise Avvis("profitten er nær null")
        ben = "call" if ST > K else "put"
        f_utenpremie = bet
        f_begge = -(C + P)
        f_enpremie = bet - (C if ben == "call" else P)
        q = (f"<p>You buy a straddle on {navn}: one European call and one European put, both with strike K = "
             f"{K} and the same expiry. The call costs {_k(C)} and the put {_k(P)}. At expiry the share trades at "
             f"S<sub>T</sub> = {ST}. All amounts are in NOK.</p>"
             f"<p>What is your profit on the straddle at expiry, ignoring interest on the premiums?</p>")
        alt = [R(_k(riktig), riktig),
               F(_k(f_utenpremie), "This is the payoff, not the profit. The two premiums were paid today and are "
                 "part of the result.", f_utenpremie),
               F(_k(f_begge), f"Both legs exercised: ({ST} − {K}) + ({K} − {ST}) = 0, leaving only the premiums. "
                 f"The leg that is out of the money pays 0, not a negative amount.", f_begge),
               F(_k(f_enpremie), f"Only the {ben}'s premium subtracted. You bought both legs, so both premiums "
                 "count, also the one on the leg that expires worthless.", f_enpremie)]
        kort = (f"<p><b>{_k(riktig)}.</b> The {ben} pays |{ST} − {K}| = {bet}, the other leg 0. Profit = {bet} − "
                f"{_k(C)} − {_k(P)} = {_k(riktig)}.</p>")
        steg = (f"<p><b>Step 1: each leg.</b> At S<sub>T</sub> = {ST} the call pays max({ST} − {K}, 0) = "
                f"{max(ST - K, 0)} and the put pays max({K} − {ST}, 0) = {max(K - ST, 0)}.</p>"
                f"<p><b>Step 2: the payoff.</b> {max(ST - K, 0)} + {max(K - ST, 0)} = {bet}.</p>"
                f"<p><b>Step 3: the profit.</b> You paid {_k(C)} + {_k(P)} = {_k(C + P)}. Profit = {bet} − "
                f"{_k(C + P)} = <b>{_k(riktig)}</b>.</p>"
                f"<p><b>First check.</b> The straddle breaks even where |S<sub>T</sub> − {K}| = {_k(C + P)}, at "
                f"{_k(K - C - P)} and {_k(K + C + P)}. S<sub>T</sub> = {ST} lies "
                f"{'outside' if riktig > 0 else 'inside'} that band, so the profit is "
                f"{'positive' if riktig > 0 else 'negative'} ✓</p>")
        intro = ("A straddle is a bet on a large move in either direction: one leg pays when the share rises, the "
                 "other when it falls. Only one leg can be in the money at expiry.")
    elif typ == "bull":
        K1 = r.choice([60, 80, 100, 120])
        K2 = K1 + r.choice([10, 15, 20])
        C1 = rund(K1 * r.choice([0.08, 0.10, 0.12]) + r.choice([0.20, 0.40]), 2)
        C2 = rund(C1 * r.choice([0.45, 0.50, 0.55, 0.60]), 2)
        ST = K2 + r.choice([4, 6, 9, 12])
        riktig = (K2 - K1) - (C1 - C2)
        f_utenpremie = K2 - K1
        f_kortglemt = (ST - K1) - (C1 - C2)
        f_fortegn = (K2 - K1) - (C1 + C2)
        q = (f"<p>You set up a bull spread on {navn}: you buy a European call with strike {K1} for {_k(C1)} and "
             f"write a European call with strike {K2} for {_k(C2)}. Both expire on the same date. At expiry the share "
             f"trades at S<sub>T</sub> = {ST}. All amounts are in NOK.</p>"
             f"<p>What is your profit on the spread at expiry, ignoring interest on the premiums?</p>")
        alt = [R(_k(riktig), riktig),
               F(_k(f_utenpremie), "This is the payoff, not the profit. The net premium you paid today is part of "
                 "the result.", f_utenpremie),
               F(_k(f_kortglemt), f"The written call left out. At {ST} its holder exercises too. What you owe "
                 "on it caps your gain.", f_kortglemt),
               F(_k(f_fortegn), f"Both premiums subtracted: {_k(C1)} + {_k(C2)}. You received the premium on the "
                 "call you wrote, so it reduces your cost.", f_fortegn)]
        kort = (f"<p><b>{_k(riktig)}.</b> Payoff = ({ST} − {K1}) − ({ST} − {K2}) = {K2 - K1}. Net premium = "
                f"{_k(C1)} − {_k(C2)} = {_k(C1 - C2)}. Profit = {K2 - K1} − {_k(C1 - C2)} = {_k(riktig)}.</p>")
        steg = (f"<p><b>Step 1: each leg.</b> The call you bought pays {ST} − {K1} = {ST - K1}. The call you wrote "
                f"is also in the money, so you pay {ST} − {K2} = {ST - K2}.</p>"
                f"<p><b>Step 2: the payoff.</b> {ST - K1} − {ST - K2} = {K2 - K1}, the width of the spread. Above "
                f"{K2} the payoff no longer grows.</p>"
                f"<p><b>Step 3: the profit.</b> You paid {_k(C1)} and received {_k(C2)}, a net cost of "
                f"{_k(C1 - C2)}. Profit = {K2 - K1} − {_k(C1 - C2)} = <b>{_k(riktig)}</b>.</p>"
                f"<p><b>First check.</b> The profit is the same for every S<sub>T</sub> above {K2}: at "
                f"S<sub>T</sub> = {K2 + 30} the legs pay {K2 + 30 - K1} − {K2 + 30 - K2} = {K2 - K1} again ✓</p>")
        intro = ("A bull spread buys a call and writes one with a higher strike. The written call caps the "
                 "upside and its premium lowers the cost.")
    elif typ == "protective":
        S0 = r.choice([80, 100, 120, 150])
        K = S0 - r.choice([0, 5, 10])
        P = rund(S0 * r.choice([0.04, 0.05, 0.06, 0.07]) + r.choice([0.15, 0.35]), 2)
        ST = round(K * r.choice([0.70, 0.75, 0.82, 0.88]))
        riktig = K - S0 - P
        f_utenput = ST - S0 - P
        f_utenpremie = K - S0
        f_baredput = (K - ST) - P
        q = (f"<p>You buy one share of {navn} at {S0} and protect it with a European put with strike K = {K}, which "
             f"costs {_k(P)}. At expiry the share trades at S<sub>T</sub> = {ST}. All amounts are in NOK.</p>"
             f"<p>What is your profit on the share and the put together at expiry, ignoring interest on what "
             f"you paid?</p>")
        alt = [R(_k(riktig), riktig),
               F(_k(f_utenput), f"The put's payoff left out. At {ST} the put is in the money, so it pays off and "
                 "limits the loss on the share.", f_utenput),
               F(_k(f_utenpremie), f"The premium left out: {K} − {S0}. The put cost {_k(P)} today, which is the "
                 "price of the insurance.", f_utenpremie),
               F(_k(f_baredput), f"Only the put counted: ({K} − {ST}) − {_k(P)}. You also own the share, which "
                 f"you bought at {S0} and which is now worth {ST}.", f_baredput)]
        kort = (f"<p><b>{_k(riktig)}.</b> Share plus put is worth max({ST}, {K}) = {K} at expiry. Profit = {K} − "
                f"{S0} − {_k(P)} = {_k(riktig)}.</p>")
        steg = (f"<p><b>Step 1: each leg.</b> The share is worth {ST}. The put pays max({K} − {ST}, 0) = "
                f"{K - ST}.</p>"
                f"<p><b>Step 2: the payoff.</b> {ST} + {K - ST} = {K}. The put guarantees you can sell at {K}, so "
                f"the position is worth at least {K} whatever happens.</p>"
                f"<p><b>Step 3: the profit.</b> You paid {S0} + {_k(P)} = {_k(S0 + P)}. Profit = {K} − "
                f"{_k(S0 + P)} = <b>{_k(riktig)}</b>.</p>"
                f"<p><b>First check.</b> This is the worst case for the position: any S<sub>T</sub> below {K} "
                f"gives the same {_k(riktig)}. Without the put you would have lost {S0} − {ST} = {S0 - ST}.</p>")
        intro = ("A protective put is insurance: the share gives the upside and the put sets a floor at the "
                 "strike. The premium is the price of the floor.")
    else:  # skrevet put
        K = r.choice([50, 60, 75, 90, 110])
        P = rund(K * r.choice([0.05, 0.06, 0.07]) + r.choice([0.10, 0.25, 0.40]), 2)
        ST = round(K * r.choice([0.80, 0.84, 0.88, 0.92]))
        riktig = P - (K - ST)
        if abs(riktig) < 0.5:
            raise Avvis("profitten er nær null")
        f_holder = (K - ST) - P
        f_utenpremie = -(K - ST)
        f_bare = P
        q = (f"<p>You write (sell) a European put on {navn} with strike K = {K} and receive a premium of {_k(P)}. At "
             f"expiry the share trades at S<sub>T</sub> = {ST}. All amounts are in NOK.</p>"
             f"<p>What is your profit as the writer at expiry, ignoring interest on the premium?</p>")
        alt = [R(_k(riktig), riktig),
               F(_k(f_holder), f"This is the holder's profit, ({K} − {ST}) − {_k(P)}. An option is zero-sum: the "
                 "writer's profit is the holder's with the opposite sign.", f_holder),
               F(_k(f_utenpremie), f"The premium left out: −({K} − {ST}). You received {_k(P)} today and keep it "
                 "whatever happens.", f_utenpremie),
               F(_k(f_bare), f"The put treated as expiring worthless. At {ST} it is in the money, so the holder "
                 f"sells you the share at {K} and you lose on it.", f_bare)]
        kort = (f"<p><b>{_k(riktig)}.</b> The holder exercises, so you pay {K} − {ST} = {K - ST}. Profit = "
                f"{_k(P)} − {K - ST} = {_k(riktig)}.</p>")
        steg = (f"<p><b>Step 1: does the holder exercise?</b> S<sub>T</sub> = {ST} is below K = {K}, so the right "
                f"to sell at {K} is worth {K} − {ST} = {K - ST} to the holder.</p>"
                f"<p><b>Step 2: the writer's payoff.</b> You must buy the share at {K} when it is worth {ST}: "
                f"−{K - ST}.</p>"
                f"<p><b>Step 3: the profit.</b> Add the premium you received: {_k(P)} − {K - ST} = "
                f"<b>{_k(riktig)}</b>.</p>"
                f"<p><b>First check.</b> The holder's profit is {_k(f_holder)}. The two sum to zero ✓ This check "
                f"is an identity, so it catches sign slips only.</p>")
        intro = ("Writing a put means selling insurance: you collect the premium today and must buy the share at "
                 "the strike if the holder wants to sell.")
    premier = {"straddle": (C, P) if typ == "straddle" else (), "bull": (C1, C2) if typ == "bull" else (),
               "protective": (P,) if typ == "protective" else (), "shortput": (P,) if typ == "shortput" else ()}[typ]
    if any(abs(riktig - x) < 0.01 or abs(abs(riktig) - x) < 0.01 for x in premier):
        raise Avvis("svaret er lik en premie")
    full = (f"<p><b>Payoff and profit.</b> {intro} The payoff is what the contracts pay at expiry. The profit "
            f"subtracts what you paid for them and adds what you received.</p>" + steg +
            "<p><b>Remember:</b> each leg pays max(·, 0) for its holder, then the net premium comes off. The exercise "
            "decision never looks at the premium.</p>")
    ulike(*[a.verdi for a in alt], rel=0.02)
    return sporsmal(q, alt, kort, full, tall=tallsvar(enhet="NOK", abs=0.01))


# ---------------------------------------------------------------------------
# ops-par1 · Put-call-paritet: den manglende prisen
# ---------------------------------------------------------------------------
@familie("ops-par1", tema="opsjoner", antall=6, tittel="Put-call parity: the missing price",
         hjelp=hjelp3(
             "This is put-call parity. A call and a put on the same share with the same strike and expiry are "
             "tied together by the share and a risk-free bond paying the strike.",
             "C − P = S − PV(K), with PV(K) = K/(1 + r<sub>f</sub>)<sup>T</sup> and T in years. It holds for "
             "European options on a share that pays no dividends before expiry, under any model.",
             "<p><b>Step 1: discount the strike.</b> Compound the annual rate over the whole life of the options, "
             "also when T is not a whole number of years.</p>"
             "<p><b>Step 2: solve parity for the missing price.</b> Keep the signs straight: the call is worth "
             "more than the put exactly when S exceeds PV(K).</p>"
             "<p><b>Watch out:</b> the strike is paid at expiry, so it is never used undiscounted. The course "
             "discounts discretely, not with e<sup>−rT</sup>.</p>",
         ))
def _(r):
    navn = r.choice(AKSJER)
    S = r.choice([48, 60, 75, 84, 96, 120, 140])
    K = round(S * r.choice([0.90, 0.95, 1.0, 1.05, 1.10, 1.15]) / 5) * 5
    rf = r.choice([0.03, 0.04, 0.045, 0.05, 0.06])
    T = r.choice([1, 2, 1.5, 3, 2, 0.5])
    pvk = K / (1 + rf) ** T
    finn_call = r.random() < 0.5
    # Den kjente prisen: en rimelig opsjonspris rundet til to desimaler.
    tidsverdi = S * r.choice([0.06, 0.08, 0.10]) * math.sqrt(T)
    if finn_call:
        P = rund(max(pvk - S, 0) + tidsverdi, 2)
        C_ex = P + S - pvk
        riktig = C_ex
        f_k = P + S - K
        f_kont = P + S - K * math.exp(-rf * T)
        if T != 1:
            f3 = P + S - K / (1 + rf * T)
            n3 = (f"Simple interest over {_tid(T)}: K/(1 + {_r(rf)} × {_tidtall(T)}). The annual rate compounds "
                  "from year to year, so simple interest discounts the strike too little.")
        else:
            f3 = P - S + pvk
            n3 = ("The sign of S − PV(K) turned round. The call is the dearer of the two exactly when the share "
                  "is worth more than the discounted strike.")
        kjent, ukjent, kjent_v = "put", "call", P
    else:
        C = rund(max(S - pvk, 0) + tidsverdi, 2)
        riktig = C - S + pvk
        f_k = C - S + K
        f_kont = C - S + K * math.exp(-rf * T)
        if T != 1:
            f3 = C - S + K / (1 + rf * T)
            n3 = (f"Simple interest over {_tid(T)}: K/(1 + {_r(rf)} × {_tidtall(T)}). The annual rate compounds "
                  "from year to year, so simple interest discounts the strike too little.")
        else:
            f3 = C + S - pvk
            n3 = ("The sign of S − PV(K) turned round. The put is the dearer of the two exactly when the "
                  "discounted strike exceeds the share price.")
        kjent, ukjent, kjent_v = "call", "put", C
    if riktig <= 0.3 or min(f_k, f_kont, f3) <= 0:
        raise Avvis("urimelig pris")
    ulike(riktig, f_k, f_kont, f3, rel=0.012)
    pvk_r = rund(pvk, 4)
    q = (f"<p>{navn} trades at NOK {S} and will pay no dividends before the options below expire. A European {kjent} on the "
         f"share with strike K = {K} and {_tid(T)} to expiry trades at NOK {_k(kjent_v)}. The risk-free rate is "
         f"{_p(rf, 1)} a year (effective annual rate).</p>"
         f"<p>What must the European {ukjent} with the same strike and expiry cost? Answer in NOK per option "
         f"with four decimals.</p>")
    alt = [R(_f(riktig), riktig),
           F(_f(f_k), f"The strike used undiscounted. K = {K} is paid only at expiry, so its value today is "
             f"lower than {K}.", f_k),
           F(_f(f_kont), f"Continuous discounting: {K} × e<sup>−{_r(rf)} × {_tidtall(T)}</sup>. The course "
             "discounts discretely with the effective annual rate.", f_kont),
           F(_f(f3), n3, f3)]
    if finn_call:
        formel = f"C = P + S − PV(K) = {_k(P)} + {S} − {_f(pvk_r)}"
    else:
        formel = f"P = C − S + PV(K) = {_k(C)} − {S} + {_f(pvk_r)}"
    kort = (f"<p><b>{_f(riktig)}.</b> PV(K) = {_pv_tekst(K, rf, T)} = {_f(pvk_r)}. {formel} = {_f(riktig)}.</p>")
    full = (f"<p><b>Why parity holds.</b> A call plus a bond paying K at expiry gives max(S<sub>T</sub>, K). So "
            f"does a share plus a put. Two portfolios with the same payoff in every state must cost the same "
            f"today: C + PV(K) = P + S. No probability, volatility or expected return enters, so parity holds "
            f"under any model.</p>"
            f"<p><b>Step 1: discount the strike.</b> The bond pays {K} in {_tid(T)}, so PV(K) = "
            f"{_pv_tekst(K, rf, T)} = {_f(pvk_r)}.</p>"
            f"<p><b>Step 2: solve for the {ukjent}.</b> {formel} = <b>{_f(riktig)}</b>.</p>"
            f"<p><b>First check.</b> S − PV(K) = {S} − {_f(pvk_r)} = {_f(S - pvk_r)}, so the call should be "
            f"{'dearer' if S > pvk else 'cheaper'} than the put by exactly that amount: "
            f"C − P = {_f((riktig - kjent_v) if finn_call else (kjent_v - riktig))} ✓ This is parity read "
            f"backwards, so it catches arithmetic slips only.</p>"
            f"<p><b>Remember:</b> C − P = S − PV(K), with the strike discounted at (1 + r<sub>f</sub>)<sup>T</sup>.</p>")
    return sporsmal(q, alt, kort, full, tall=tallsvar(enhet="NOK"))


# ---------------------------------------------------------------------------
# ops-arb1 · Paritetsbrudd og arbitrasje
# ---------------------------------------------------------------------------
@familie("ops-arb1", tema="opsjoner", antall=5, tittel="Arbitrage when quotes break put-call parity",
         hjelp=hjelp3(
             "This is an arbitrage on put-call parity. The quotes do not satisfy parity, so one portfolio is too "
             "cheap. You need the riskless profit you lock in today.",
             "Parity: C + PV(K) = P + S, with PV(K) = K/(1 + r<sub>f</sub>)<sup>T</sup>. Buy the cheap side, sell the "
             "dear side. Both pay max(S<sub>T</sub>, K) at expiry, so the profit today is the gap between them.",
             "<p><b>Step 1: price both sides today.</b> Call plus the bond on one side, put plus the share on "
             "the other.</p>"
             "<p><b>Step 2: buy the cheaper side and sell the dearer one.</b> At expiry the two cancel in every "
             "state.</p>"
             "<p><b>Step 3: the profit is the gap today.</b> Nothing is owed later, so do not compound it.</p>"
             "<p><b>Watch out:</b> the bond is worth PV(K) today, not K.</p>",
         ))
def _(r):
    navn = r.choice(AKSJER)
    S = r.choice([50, 64, 80, 95, 110, 130])
    K = round(S * r.choice([0.95, 1.0, 1.05, 1.10]) / 5) * 5
    rf = r.choice([0.03, 0.04, 0.05, 0.06])
    T = r.choice([1, 2, 1, 1.5])
    pvk = K / (1 + rf) ** T
    P = rund(max(pvk - S, 0) + S * r.choice([0.06, 0.07, 0.08]), 2)
    gap = r.choice([-1.40, -0.95, -0.70, 0.60, 0.85, 1.25])
    C = rund(P + S - pvk + gap, 2)
    if C <= 0.5:
        raise Avvis("callen blir for billig")
    venstre, hoyre = C + pvk, P + S
    g = venstre - hoyre                                   # > 0: call + obligasjon er for dyr
    riktig = abs(g)
    f_k = abs(C + K - hoyre)
    f_fv = riktig * (1 + rf) ** T
    f_kont = abs(C + K * math.exp(-rf * T) - hoyre)
    ulike(riktig, f_k, f_fv, f_kont, rel=0.02)
    pvk_r = rund(pvk, 4)
    if g > 0:
        strategi = (f"write the call, borrow PV(K) = {_f(pvk_r)}, buy the put and buy the share")
        dyr, billig = "call plus bond", "put plus share"
    else:
        strategi = (f"buy the call, lend PV(K) = {_f(pvk_r)}, write the put and short the share")
        dyr, billig = "put plus share", "call plus bond"
    q = (f"<p>{navn} trades at NOK {S} and pays no dividends. European options on the share with strike K = {K} and "
         f"{_tid(T)} to expiry are quoted at NOK {_k(C)} for the call and NOK {_k(P)} for the put. You can borrow "
         f"and lend at the risk-free rate of {_p(rf, 1)} a year (effective annual rate). There are no transaction "
         f"costs.</p>"
         f"<p>Set up the arbitrage with one call, one put, one share and a risk-free bond. What riskless profit, in "
         f"NOK, do you lock in today? Answer with four decimals.</p>")
    alt = [R(_f(riktig), riktig),
           F(_f(f_k), f"The strike used undiscounted: |{_k(C)} + {K} − {_k(P)} − {S}|. The bond pays {K} only at "
             "expiry, so it costs PV(K) today.", f_k),
           F(_f(f_fv), f"The gap compounded to expiry. The arbitrage pays its profit today and owes nothing "
             "later, so the question asks for the gap itself, not its future value.", f_fv),
           F(_f(f_kont), f"Continuous discounting: PV(K) = {K} × e<sup>−{_r(rf)} × {_tidtall(T)}</sup>. "
             "The course discounts with the effective annual rate.", f_kont)]
    kort = (f"<p><b>{_f(riktig)}.</b> PV(K) = {_pv_tekst(K, rf, T)} = {_f(pvk_r)}. C + PV(K) = "
            f"{_f(C + pvk_r)}, P + S = {_k(hoyre)}. The {dyr} side is dear: {strategi}.</p>")
    full = (f"<p><b>Why there is an arbitrage.</b> A call plus a bond paying K and a put plus the share both pay "
            f"max(S<sub>T</sub>, K) at expiry. If they cost different amounts today, you buy the cheap one and sell "
            f"the dear one. The payoffs cancel in every state, so the gap is yours today with no risk.</p>"
            f"<p><b>Step 1: the bond.</b> PV(K) = {_pv_tekst(K, rf, T)} = {_f(pvk_r)}.</p>"
            f"<p><b>Step 2: the two sides.</b> Call plus bond: {_k(C)} + {_f(pvk_r)} = {_f(C + pvk_r)}. Put plus "
            f"share: {_k(P)} + {S} = {_k(hoyre)}. The {billig} side is cheaper.</p>"
            f"<p><b>Step 3: the trade.</b> {strategi[0].upper() + strategi[1:]}. Cash today: "
            f"|{_f(C + pvk_r)} − {_k(hoyre)}| = <b>{_f(riktig)}</b>.</p>"
            f"<p><b>First check.</b> At expiry, take S<sub>T</sub> = {K + 20}: the call pays {20}, the put 0, the "
            f"share is worth {K + 20} and the bond {K}. Call plus bond = {K + 20} = put plus share, so the "
            f"positions cancel. Take S<sub>T</sub> = {K - 15}: call plus bond = {K} = put plus share again ✓ "
            f"Nothing is owed at expiry.</p>"
            f"<p><b>Remember:</b> buy the cheap side of C + PV(K) = P + S, sell the dear side and keep the gap "
            f"today.</p>")
    return sporsmal(q, alt, kort, full, tall=tallsvar(enhet="NOK"))


# ---------------------------------------------------------------------------
# ops-rho1 · Den risikonøytrale sannsynligheten
# ---------------------------------------------------------------------------
@familie("ops-rho1", tema="opsjoner", antall=5, tittel="The risk-neutral probability ρ",
         hjelp=hjelp3(
             "This is the risk-neutral probability ρ: the weight on the up state that makes the share earn the "
             "risk-free rate over one step of the tree.",
             "ρ = [(1 + r<sub>f</sub>)<sup>Δt</sup>S<sub>0</sub> − S<sub>d</sub>] / (S<sub>u</sub> − S<sub>d</sub>), "
             "with Δt the length of one step in years. ρ is a pricing weight, not a forecast.",
             "<p><b>Step 1: grow the share at the risk-free rate over one step.</b> If the step is shorter than a "
             "year, compound the annual rate over that fraction of a year only.</p>"
             "<p><b>Step 2: place that value between the two outcomes.</b> Subtract the down value and divide by the "
             "spread.</p>"
             "<p><b>Watch out:</b> analysts' probabilities do not enter. ρ is the weight on the up state, not "
             "the down state.</p>",
         ))
def _(r):
    navn = r.choice(AKSJER)
    S0 = r.choice([40, 50, 60, 80, 100, 120])
    u = r.choice([1.15, 1.20, 1.25, 1.30])
    d = r.choice([0.80, 0.85, 0.90])
    rf = r.choice([0.03, 0.04, 0.05, 0.06, 0.08])
    dt = r.choice([1, 1, 0.5, 0.25])
    Su, Sd = rund(S0 * u, 2), rund(S0 * d, 2)
    vekst = (1 + rf) ** dt
    rho = (vekst * S0 - Sd) / (Su - Sd)
    if not 0.05 < rho < 0.95:
        raise Avvis("ρ utenfor (0, 1)")
    p = r.choice([0.55, 0.60, 0.65, 0.70])
    f_uvekst = (S0 - Sd) / (Su - Sd)
    f_ned = 1 - rho
    if dt == 1:
        f3 = p
        n3 = (f"This is the analysts' probability. ρ comes from prices alone: it is the weight that makes the "
              f"share earn r<sub>f</sub>, whatever anyone believes.")
        steg = f"one year"
        vekst_tekst = f"{_vekst(rf)} × {S0}"
    else:
        f3 = ((1 + rf) * S0 - Sd) / (Su - Sd)
        n3 = (f"A full year's rate on a step of {_tid(dt)}. Over a step that short the share earns only part of "
              "a year's risk-free return.")
        steg = _tid(dt)
        vekst_tekst = f"{_vekst(rf)}<sup>{_tidtall(dt)}</sup> × {S0}"
    ulike(rho, f_uvekst, f_ned, f3, rel=0.03)
    vekst_v = rund(vekst * S0, 4)
    q = (f"<p>{navn} trades at NOK {S0} and pays no dividends. In {steg} the share will be worth either NOK "
         f"{_k(Su)} or NOK {_k(Sd)}. The risk-free rate is {_p(rf, 1)} a year (effective annual rate). Analysts put "
         f"the probability of the up move at {tall(p, 2)}.</p>"
         f"<p>What is the risk-neutral probability ρ of the up move over this step? Answer with four decimals.</p>")
    alt = [R(_f(rho), rho),
           F(_f(f_uvekst), f"The share not grown at the risk-free rate: ({S0} − {_k(Sd)})/({_k(Su)} − {_k(Sd)}). That "
             "would make the share earn 0, not r<sub>f</sub>.", f_uvekst),
           F(_f(f_ned), "This is the weight on the down move. The question asks for the up move.", f_ned),
           F(_f(f3), n3, f3)]
    kort = (f"<p><b>{_f(rho)}.</b> ρ = ({vekst_tekst} − {_k(Sd)})/({_k(Su)} − {_k(Sd)}) = ({_f(vekst_v)} − "
            f"{_k(Sd)})/{_k(Su - Sd)} = {_f(rho)}.</p>")
    full = (f"<p><b>What ρ is.</b> ρ is the probability that would make an investor who does not care about risk "
            f"willing to hold the share at today's price: under ρ the share earns exactly the risk-free rate. It "
            f"is a pricing weight, not a forecast. Any claim on the same tree is priced with it, discounted at "
            f"r<sub>f</sub>.</p>"
            f"<p><b>Step 1: grow the share at r<sub>f</sub> over one step.</b> The step is {steg}, so "
            f"{vekst_tekst} = {_f(vekst_v)}.</p>"
            f"<p><b>Step 2: where that value sits between the outcomes.</b> ρ = ({_f(vekst_v)} − {_k(Sd)})/("
            f"{_k(Su)} − {_k(Sd)}) = <b>{_f(rho)}</b>. The down state gets 1 − ρ = {_f(1 - rho)}.</p>"
            f"<p><b>First check.</b> ρ prices the share: [{_f(rho)} × {_k(Su)} + {_f(1 - rho)} × {_k(Sd)}]/"
            f"{_f(vekst)} = {_f((rho * Su + (1 - rho) * Sd) / vekst)} = S<sub>0</sub> ✓ ρ was built to do this, so "
            f"the check catches arithmetic slips only. Also check {_k(Sd)} &lt; {_f(vekst_v)} &lt; {_k(Su)}, or "
            f"the tree allows arbitrage.</p>"
            f"<p><b>Remember:</b> ρ = [(1 + r<sub>f</sub>)<sup>Δt</sup>S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> "
            f"− S<sub>d</sub>). The analysts' probability never enters.</p>")
    return sporsmal(q, alt, kort, full, tall=tallsvar())


# ---------------------------------------------------------------------------
# ops-bin1 · Binomisk pris med ett steg
# ---------------------------------------------------------------------------
@familie("ops-bin1", tema="opsjoner", antall=6, tittel="One-period binomial price of a call or a put",
         hjelp=hjelp3(
             "This is one-period binomial pricing. The option's payoff in the two states can be copied with "
             "shares and a risk-free bond, so the option costs what the copy costs.",
             "ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>). Price = [ρX<sub>u</sub> + "
             "(1 − ρ)X<sub>d</sub>]/(1 + r<sub>f</sub>). Or Δ = (X<sub>u</sub> − X<sub>d</sub>)/(S<sub>u</sub> − "
             "S<sub>d</sub>), B = (X<sub>d</sub> − ΔS<sub>d</sub>)/(1 + r<sub>f</sub>) and price = ΔS<sub>0</sub> + B.",
             "<p><b>Step 1: the payoffs.</b> Work out what the option pays in the up and the down state.</p>"
             "<p><b>Step 2: ρ from the share.</b> Grow the share at r<sub>f</sub>, place it between the two "
             "outcomes.</p>"
             "<p><b>Step 3: price.</b> Weight the payoffs with ρ and discount one period at r<sub>f</sub>. "
             "Replication gives the same number.</p>"
             "<p><b>Watch out:</b> the analysts' probability is not used. Discount the weighted payoff once.</p>",
         ))
def _(r):
    navn = r.choice(AKSJER)
    S0 = r.choice([40, 50, 60, 75, 80, 100])
    u = r.choice([1.20, 1.25, 1.30, 1.40])
    d = r.choice([0.75, 0.80, 0.85])
    rf = r.choice([0.03, 0.04, 0.05, 0.06])
    Su, Sd = rund(S0 * u, 2), rund(S0 * d, 2)
    K = round(S0 * r.choice([0.95, 1.0, 1.05, 1.10]))
    if not Sd < K < Su:
        raise Avvis("strike utenfor treet")
    call = r.random() < 0.5
    Xu, Xd = (max(Su - K, 0), max(Sd - K, 0)) if call else (max(K - Su, 0), max(K - Sd, 0))
    p = r.choice([0.55, 0.60, 0.65, 0.70])
    rho = ((1 + rf) * S0 - Sd) / (Su - Sd)
    if abs(rund(rho, 4) - rho) > 1e-9:
        raise Avvis("ρ har mer enn fire desimaler")
    if (S0, Su, Sd, K, rf) == (100, 130, 80, 105, 0.04):
        raise Avvis("samme tall som eksempelet i kj7")
    pris = (rho * Xu + (1 - rho) * Xd) / (1 + rf)
    delta = (Xu - Xd) / (Su - Sd)
    B = (Xd - delta * Sd) / (1 + rf)
    f_reell = (p * Xu + (1 - p) * Xd) / (1 + rf)
    f_udisk = rho * Xu + (1 - rho) * Xd
    f_budisk = delta * S0 + (Xd - delta * Sd)
    ulike(pris, f_reell, f_udisk, f_budisk, rel=0.02)
    if pris < 0.5:
        raise Avvis("for billig opsjon")
    navn_o = "call" if call else "put"
    rho_r = rund(rho, 4)
    pris_r = rund((rho_r * Xu + (1 - rho_r) * Xd) / (1 + rf), 4)
    q = (f"<p>{navn} trades at NOK {S0} and pays no dividends. In one year the share will be worth either NOK "
         f"{_k(Su)} or NOK {_k(Sd)}. The one-year risk-free rate is {_p(rf, 1)}. Analysts put the probability of the "
         f"up state at {tall(p, 2)}.</p>"
         f"<p>What is the price of a one-year European {navn_o} on the share with strike K = {K}? Answer in NOK with "
         f"four decimals.</p>")
    vektet = f"[{_f(rho_r)} × {_k(Xu)} + {_f(1 - rho_r)} × {_k(Xd)}]"
    alt = [R(_f(pris_r), pris_r),
           F(_f(f_reell), f"The analysts' {tall(p, 2)} weighted and discounted at r<sub>f</sub>. The risk is priced, "
             f"so a real probability does not go with the risk-free rate. The replicating portfolio fixes the "
             f"price whatever anyone believes.", f_reell),
           F(_f(f_udisk), "The ρ-weighted payoff not discounted. That is a value in one year, not a price "
             "today.", f_udisk),
           F(_f(f_budisk), "The bond position not discounted: X<sub>d</sub> − ΔS<sub>d</sub> is what the bond pays "
             "in one year, not what it costs today.", f_budisk)]
    kort = (f"<p><b>{_f(pris_r)}.</b> Payoffs {_k(Xu)} and {_k(Xd)}. ρ = ({_vekst(rf)} × {S0} − {_k(Sd)})/"
            f"({_k(Su)} − {_k(Sd)}) = {_f(rho_r)}. Price = {vektet}/{_vekst(rf)} = {_f(pris_r)}.</p>")
    full = (f"<p><b>Why the option has one price.</b> Shares and a risk-free bond can be combined to pay exactly "
            f"what the {navn_o} pays in both states. Two things with the same payoff in every state cost the same, "
            f"so the {navn_o} costs what that portfolio costs. Beliefs about the up state sit in the share price "
            f"already, so the analysts' {tall(p, 2)} is never needed.</p>"
            f"<p><b>Step 1: the payoffs.</b> Up: {'max(' + _k(Su) + ' − ' + str(K) + ', 0)' if call else 'max(' + str(K) + ' − ' + _k(Su) + ', 0)'} = "
            f"{_k(Xu)}. Down: {'max(' + _k(Sd) + ' − ' + str(K) + ', 0)' if call else 'max(' + str(K) + ' − ' + _k(Sd) + ', 0)'} = "
            f"{_k(Xd)}.</p>"
            f"<p><b>Step 2: ρ.</b> ({_vekst(rf)} × {S0} − {_k(Sd)})/({_k(Su)} − {_k(Sd)}) = "
            f"{_f((1 + rf) * S0 - Sd)}/{_k(Su - Sd)} = {_f(rho_r)}.</p>"
            f"<p><b>Step 3: the price.</b> {vektet}/{_vekst(rf)} = {_f(rho_r * Xu + (1 - rho_r) * Xd)}/"
            f"{_vekst(rf)} = <b>{_f(pris_r)}</b>.</p>"
            f"<p><b>First check: replication.</b> Δ = ({_k(Xu)} − {_k(Xd)})/({_k(Su)} − {_k(Sd)}) = {_f(delta)} and "
            f"B = ({_k(Xd)} − {_fp(delta)} × {_k(Sd)})/{_vekst(rf)} = {_f(B)}, so ΔS<sub>0</sub> + B = "
            f"{_f(delta * S0)} {'+' if B >= 0 else '−'} {_f(abs(B))} = {_f(delta * S0 + B)} ✓ The two routes "
            f"always agree, so this catches arithmetic slips. Kurbatov writes N and X for Δ and B.</p>"
            f"<p><b>Remember:</b> weight the payoffs with ρ, not with the real probability. Discount once at "
            f"r<sub>f</sub>.</p>")
    return sporsmal(q, alt, kort, full, tall=tallsvar(verdi=pris, enhet="NOK"))


# ---------------------------------------------------------------------------
# ops-rep1 · Den replikerende porteføljen: B
# ---------------------------------------------------------------------------
@familie("ops-rep1", tema="opsjoner", antall=5, tittel="The replicating portfolio: how much you borrow or lend",
         hjelp=hjelp3(
             "This is the replicating portfolio: Δ shares and a risk-free position B that pay exactly what the "
             "option pays in both states. You need the size of the bond position.",
             "Δ = (X<sub>u</sub> − X<sub>d</sub>)/(S<sub>u</sub> − S<sub>d</sub>). B = (X<sub>d</sub> − "
             "ΔS<sub>d</sub>)/(1 + r<sub>f</sub>). B &lt; 0 means you borrow, B &gt; 0 that you lend. Kurbatov writes "
             "C<sub>0</sub> = N × S<sub>0</sub> + X.",
             "<p><b>Step 1: the payoffs.</b> What the option pays in each state.</p>"
             "<p><b>Step 2: Δ.</b> The change in the payoff divided by the change in the share price. For a put "
             "it is negative.</p>"
             "<p><b>Step 3: B.</b> What the bond must pay in one state after the shares, discounted one "
             "period.</p>"
             "<p><b>Watch out:</b> B is a value today, so discount it.</p>",
         ))
def _(r):
    navn = r.choice(AKSJER)
    S0 = r.choice([40, 50, 60, 80, 100])
    u = r.choice([1.20, 1.25, 1.30])
    d = r.choice([0.75, 0.80, 0.85])
    rf = r.choice([0.04, 0.05, 0.06, 0.10])
    Su, Sd = rund(S0 * u, 2), rund(S0 * d, 2)
    K = round(S0 * r.choice([0.95, 1.0, 1.05, 1.10]))
    if not Sd < K < Su:
        raise Avvis("strike utenfor treet")
    call = r.random() < 0.55
    p = r.choice([0.55, 0.60, 0.70])
    Xu, Xd = (Su - K, 0.0) if call else (0.0, K - Sd)
    delta = (Xu - Xd) / (Su - Sd)
    B = (Xd - delta * Sd) / (1 + rf)
    riktig = abs(B)
    f_udisk = abs(Xd - delta * Sd)
    reell = (p * Xu + (1 - p) * Xd) / (1 + rf)
    f_reell = abs(reell - delta * S0)
    if call:
        d2 = Xu / Su
        f2 = abs((Xd - d2 * Sd) / (1 + rf))
        n2 = ("Δ taken as the up payoff per krone of share price. Δ measures how much the payoff changes when "
              "the share price changes, not the payoff itself.")
        verb = "borrow"
    else:
        d2 = -delta
        f2 = abs((Xd - d2 * Sd) / (1 + rf))
        n2 = ("Δ taken as positive. A put pays more when the share falls, so it is copied with a short "
              "position: its Δ is negative.")
        verb = "lend"
    ulike(riktig, f_udisk, f_reell, f2, rel=0.02)
    navn_o = "call" if call else "put"
    q = (f"<p>{navn} trades at NOK {S0} and pays no dividends. In one year the share will be worth either NOK "
         f"{_k(Su)} or NOK {_k(Sd)}. The one-year risk-free rate is {_p(rf, 1)}. The probability of the up state is "
         f"{tall(p, 2)}. You want to replicate a one-year European {navn_o} with strike K = {K} using shares and "
         f"risk-free borrowing or lending.</p>"
         f"<p>How much do you {verb} at the risk-free rate today, in NOK? Answer with four decimals.</p>")
    alt = [R(_f(riktig), riktig),
           F(_f(f_udisk), f"The bond's payoff in one year, not discounted. B is the amount you {verb} today, "
             "not the amount repaid.", f_udisk),
           F(_f(f2), n2, f2),
           F(_f(f_reell), f"B backed out of a price built from the probability {tall(p, 2)} discounted at "
             f"r<sub>f</sub>. That price is wrong, because the risk is priced, so the B behind it is wrong too.", f_reell)]
    kort = (f"<p><b>{_f(riktig)}.</b> Δ = ({_k(Xu)} − {_k(Xd)})/({_k(Su)} − {_k(Sd)}) = {_f(delta)}. B = "
            f"({_k(Xd)} − {_fp(delta)} × {_k(Sd)})/{_vekst(rf)} = {_f(B)}, so you {verb} {_f(riktig)}.</p>")
    pris = delta * S0 + B
    full = (f"<p><b>What replication does.</b> You build a portfolio that pays exactly what the {navn_o} pays in "
            f"both states: Δ shares and a risk-free position B. Kurbatov writes N and X for Δ and B. A call is "
            f"copied by buying shares on borrowed money. A put is copied by shorting shares and lending the "
            f"proceeds.</p>"
            f"<p><b>Step 1: the payoffs.</b> Up: {_k(Xu)}. Down: {_k(Xd)}.</p>"
            f"<p><b>Step 2: Δ.</b> ({_k(Xu)} − {_k(Xd)})/({_k(Su)} − {_k(Sd)}) = {_f(delta)}"
            f"{'' if call else ', a short position'}.</p>"
            + (f"<p><b>Step 3: B.</b> In the down state the call pays 0, but the shares are worth {_f(delta)} × "
               f"{_k(Sd)} = {_f(delta * Sd)}. The bond must cancel that, so it pays −{_f(delta * Sd)} in one year: "
               f"you owe that amount. Today it is −{_f(delta * Sd)}/{_vekst(rf)} = {_f(B)}. You borrow "
               f"<b>{_f(riktig)}</b>.</p>" if call else
               f"<p><b>Step 3: B.</b> In the down state you must buy back the shorted shares for {_f(-delta)} × "
               f"{_k(Sd)} = {_f(-delta * Sd)} and the put pays {_k(Xd)}. The bond must cover both: it pays "
               f"{_k(Xd)} + {_f(-delta * Sd)} = {_f(Xd - delta * Sd)} in one year. Today that is "
               f"{_f(Xd - delta * Sd)}/{_vekst(rf)} = {_f(B)}. You lend <b>{_f(riktig)}</b>.</p>")
            + f"<p><b>First check.</b> Up state: {_fp(delta)} × {_k(Su)} {'+' if B >= 0 else '−'} {_f(abs(B))} × "
            f"{_vekst(rf)} = {_f(delta * Su + B * (1 + rf))} = {_k(Xu)} ✓ This is a real check: B came from the down "
            f"state, so a wrong Δ would fail here. The {navn_o} costs ΔS<sub>0</sub> + B = {_f(pris)}.</p>"
            f"<p><b>Remember:</b> B = (X<sub>d</sub> − ΔS<sub>d</sub>)/(1 + r<sub>f</sub>), a value today. A call "
            f"is copied by buying shares with borrowed money, a put by shorting shares and lending.</p>")
    return sporsmal(q, alt, kort, full, tall=tallsvar(enhet="NOK"))


# ---------------------------------------------------------------------------
# ops-two1 · To perioder: pris den letteste først, så paritet
# ---------------------------------------------------------------------------
@familie("ops-two1", tema="opsjoner", antall=6, tittel="Two-period tree: price the easier option first",
         hjelp=hjelp3(
             "This is a two-period binomial tree. One of the call and the put pays in only one end node, so it is "
             "quick to price. Put-call parity then gives the other.",
             "ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>) per period. End-node "
             "weights ρ², 2ρ(1 − ρ) and (1 − ρ)². Price = weighted payoff/(1 + r<sub>f</sub>)². Parity: C − P = "
             "S<sub>0</sub> − K/(1 + r<sub>f</sub>)².",
             "<p><b>Step 1: the end nodes.</b> Multiply up twice, once each way and down twice.</p>"
             "<p><b>Step 2: find the option that pays in one node only.</b> Price it with that node's weight, "
             "discounted over both periods.</p>"
             "<p><b>Step 3: parity for the other one.</b> The strike is paid after two years.</p>"
             "<p><b>Watch out:</b> discount for two periods, not one, both in the price and in PV(K).</p>",
         ))
def _(r):
    lett_call = r.random() < 0.5
    navn = r.choice(AKSJER)
    S0 = r.choice([50, 60, 80, 100, 120])
    u = r.choice([1.20, 1.25, 1.30])
    d = r.choice([0.80, 0.85])
    rf = r.choice([0.03, 0.04, 0.05, 0.06])
    rho = ((1 + rf) - d) / (u - d)
    if abs(rund(rho, 4) - rho) > 1e-9 or not 0.1 < rho < 0.9:
        raise Avvis("ρ har mer enn fire desimaler")
    Suu, Sud, Sdd = rund(S0 * u * u, 2), rund(S0 * u * d, 2), rund(S0 * d * d, 2)
    if lett_call:
        K = round((Sud + (Suu - Sud) * r.choice([0.35, 0.5, 0.65])) / 5) * 5
        if not Sud < K < Suu:
            raise Avvis("strike utenfor intervallet")
    else:
        K = round((Sdd + (Sud - Sdd) * r.choice([0.35, 0.5, 0.65])) / 5) * 5
        if not Sdd < K < Sud:
            raise Avvis("strike utenfor intervallet")
    p = r.choice([0.55, 0.60, 0.65])
    w = (rho * rho, 2 * rho * (1 - rho), (1 - rho) ** 2)
    wp = (p * p, 2 * p * (1 - p), (1 - p) ** 2)
    noder = (Suu, Sud, Sdd)
    C_pay = [max(s - K, 0) for s in noder]
    P_pay = [max(K - s, 0) for s in noder]
    v2 = (1 + rf) ** 2
    C = sum(a * b for a, b in zip(w, C_pay)) / v2
    P = sum(a * b for a, b in zip(w, P_pay)) / v2
    pvk = K / v2
    if lett_call:
        sporres, pay, lett, lett_v = "put", P_pay, "call", C
        riktig = P
        f_paritet1 = C - S0 + K / (1 + rf)
    else:
        sporres, pay, lett, lett_v = "call", C_pay, "put", P
        riktig = C
        f_paritet1 = P + S0 - K / (1 + rf)
    f_en = sum(a * b for a, b in zip(w, pay)) / (1 + rf)
    f_reell = sum(a * b for a, b in zip(wp, pay)) / v2
    if riktig < 0.5 or f_paritet1 <= 0:
        raise Avvis("for billig opsjon")
    ulike(riktig, f_en, f_reell, f_paritet1, rel=0.02)
    q = (f"<p>{navn} trades at NOK {S0} and pays no dividends. Each year the share price either rises by the factor "
         f"u = {tall(u, 2)} or falls by the factor d = {tall(d, 2)}. The risk-free rate is {_p(rf, 1)} a year. Analysts "
         f"put the probability of an up move at {tall(p, 2)} each year.</p>"
         f"<p>What is the price of a two-year European {sporres} on the share with strike K = {K}? Answer in NOK with "
         f"four decimals.</p>")
    lett_node = "uu" if lett_call else "dd"
    lett_vekt = w[0] if lett_call else w[2]
    lett_pay = C_pay[0] if lett_call else P_pay[2]
    alt = [R(_f(riktig), riktig),
           F(_f(f_en), f"The weighted payoff discounted for one year only. The {sporres} pays after two "
             "years.", f_en),
           F(_f(f_paritet1), "Parity with the strike discounted for one year only. The bond in parity pays K at "
             "expiry, two years out.", f_paritet1),
           F(_f(f_reell), f"The analysts' {tall(p, 2)} used as the node probabilities. The price comes from ρ, "
             f"which makes the share earn r<sub>f</sub>. Real probabilities of a priced risk do not go with "
             f"r<sub>f</sub>.", f_reell)]
    if lett_call:
        formel = f"P = C − S<sub>0</sub> + K/{_vekst(rf)}² = {_f(C)} − {S0} + {_f(pvk)}"
    else:
        formel = f"C = P + S<sub>0</sub> − K/{_vekst(rf)}² = {_f(P)} + {S0} − {_f(pvk)}"
    kort = (f"<p><b>{_f(riktig)}.</b> ρ = {_f(rho)}. The {lett} pays only in node {lett_node}: {lett} = "
            f"{_w(lett_vekt)} × {_k(lett_pay)}/{_vekst(rf)}² = {_f(lett_v)}. {formel} = {_f(riktig)}.</p>")
    direkte = " + ".join(f"{_w(a)} × {_k(b)}" for a, b in zip(w, pay))
    full = (f"<p><b>Why price the easier one first.</b> In a two-period tree you can price any European option by "
            f"weighting its three end payoffs with ρ², 2ρ(1 − ρ) and (1 − ρ)² and discounting over two years. When "
            f"one of the call and the put pays in a single node, it takes one line. Put-call parity, which holds "
            f"for European options on a share without dividends, then gives the other.</p>"
            f"<p><b>Step 1: the tree.</b> End nodes: {_k(Suu)}, {_k(Sud)} and {_k(Sdd)}. ρ = ({_vekst(rf)} − "
            f"{tall(d, 2)})/({tall(u, 2)} − {tall(d, 2)}) = {_f(rho)} each period.</p>"
            f"<p><b>Step 2: the {lett}.</b> With K = {K} it pays only in node {lett_node}: {_k(lett_pay)}. Its "
            f"weight is {'ρ²' if lett_call else '(1 − ρ)²'} = {_w(lett_vekt)}, so {lett} = {_w(lett_vekt)} × "
            f"{_k(lett_pay)}/{_f(v2)} = {_f(lett_v)}.</p>"
            f"<p><b>Step 3: parity.</b> PV(K) = {K}/{_vekst(rf)}² = {_f(pvk)}. {formel} = <b>{_f(riktig)}</b>.</p>"
            f"<p><b>First check: the long way.</b> The {sporres} pays {_k(pay[0])}, {_k(pay[1])} and {_k(pay[2])}. "
            f"({direkte})/{_f(v2)} = {_f(riktig)} ✓ This is a real check: it uses other payoffs and a different "
            f"route, so it catches a wrong PV(K) or a wrong sign in parity.</p>"
            f"<p><b>Remember:</b> price the option that pays in fewer nodes, then use parity with the strike "
            f"discounted over the full life of the options.</p>")
    return sporsmal(q, alt, kort, full, tall=tallsvar(enhet="NOK"))


# ---------------------------------------------------------------------------
# ops-oth1 · ρ fra en notert call, brukt på et annet krav
# ---------------------------------------------------------------------------
@familie("ops-oth1", tema="opsjoner", antall=5, tittel="One ρ prices every claim on the tree",
         hjelp=hjelp3(
             "This is about pricing a new claim on a binomial tree. Any traded claim on the tree reveals the "
             "risk-neutral probability ρ. The same ρ then prices every other claim.",
             "Price = [ρX<sub>u</sub> + (1 − ρ)X<sub>d</sub>]/(1 + r<sub>f</sub>). Turn it round for the traded call: "
             "ρ = C(1 + r<sub>f</sub>)/C<sub>u</sub> when the call pays nothing in the down state.",
             "<p><b>Step 1: the traded call's payoffs.</b> What it pays up and down.</p>"
             "<p><b>Step 2: ρ from its price.</b> Grow the price at r<sub>f</sub> to the end of the period, then "
             "divide by the up payoff.</p>"
             "<p><b>Step 3: the new claim.</b> Weight its payoffs with ρ and discount at r<sub>f</sub>.</p>"
             "<p><b>Watch out:</b> the analysts' probability is not used. The call price must be grown before "
             "you divide.</p>",
         ))
def _(r):
    typ = r.choice(["put", "lavcall", "aksje"])
    navn = r.choice(AKSJER)
    Sd = r.choice([60, 70, 80, 90])
    Su = Sd + r.choice([40, 50, 60])
    K1 = Sd + r.choice([20, 25, 30])
    rf = r.choice([0.03, 0.04, 0.05])
    rho0 = r.choice([0.35, 0.40, 0.45, 0.55, 0.60])
    C1 = rund(rho0 * (Su - K1) / (1 + rf), 2)
    rho = C1 * (1 + rf) / (Su - K1)
    rho_r = rund(rho, 4)                                  # vist med fire desimaler, som Kurbatov
    p = r.choice([0.60, 0.65, 0.70, 0.75])
    rho_feil = C1 / (Su - K1)
    if typ == "put":
        K2 = Sd + r.choice([10, 15, 20])
        Xu, Xd = 0.0, float(K2 - Sd)
        krav = f"a one-year European put on the share with strike K = {K2}"
        kravnavn = "put"
    elif typ == "lavcall":
        K2 = Sd - r.choice([10, 20, 30])
        Xu, Xd = float(Su - K2), float(Sd - K2)
        krav = f"a one-year European call on the share with strike K = {K2}"
        kravnavn = "low-strike call"
    else:
        Xu, Xd = float(Su), float(Sd)
        krav = "one share today, if the market priced it consistently with the call"
        kravnavn = "share"
    riktig = (rho * Xu + (1 - rho) * Xd) / (1 + rf)
    vis = (rho_r * Xu + (1 - rho_r) * Xd) / (1 + rf)
    f_rho = (rho_feil * Xu + (1 - rho_feil) * Xd) / (1 + rf)
    f_reell = (p * Xu + (1 - p) * Xd) / (1 + rf)
    f_udisk = rho * Xu + (1 - rho) * Xd
    ulike(riktig, f_rho, f_reell, f_udisk, rel=0.008 if typ == "aksje" else 0.02)
    S0 = (rho_r * Su + (1 - rho_r) * Sd) / (1 + rf)       # fra den viste ρ, så tallene går opp
    if typ == "put":
        Ck2 = rho_r * (Su - K2) / (1 + rf)
        sjekk = (f"<p><b>First check: parity.</b> The share's implied price is [{_f(rho_r)} × {Su} + {_f(1 - rho_r)} × "
                 f"{Sd}]/{_vekst(rf)} = {_f(S0)} and a call with strike {K2} is worth {_f(rho_r)} × {Su - K2}/"
                 f"{_vekst(rf)} = {_f(Ck2)}. P = C − S + PV(K) = {_f(Ck2)} − {_f(S0)} + {K2}/{_vekst(rf)} = "
                 f"{_f(Ck2 - S0 + K2 / (1 + rf))} ✓ Everything uses the same ρ, so this catches arithmetic slips "
                 f"only.</p>")
    elif typ == "lavcall":
        sjekk = (f"<p><b>First check.</b> This call is exercised in both states, so it is the share minus a bond "
                 f"paying {K2}. The implied share price is [{_f(rho_r)} × {Su} + {_f(1 - rho_r)} × {Sd}]/{_vekst(rf)} "
                 f"= {_f(S0)}. Then {_f(S0)} − {K2}/{_vekst(rf)} = {_f(S0 - K2 / (1 + rf))} ✓ The same ρ sits in both "
                 f"routes, so this catches arithmetic slips only.</p>")
    else:
        dlt = (Su - K1) / (Su - Sd)
        sjekk = (f"<p><b>First check: replication.</b> The call equals Δ = {Su - K1}/{Su - Sd} = {_f(dlt)} shares and "
                 f"a loan of {_f(dlt)} × {Sd}/{_vekst(rf)} = {_f(dlt * Sd / (1 + rf))}. At the share price you found, "
                 f"{_f(dlt)} × {_f(vis)} − {_f(dlt * Sd / (1 + rf))} = {_f(dlt * vis - dlt * Sd / (1 + rf))}, the "
                 f"call's price up to the rounding of ρ ✓ Any other share price would let you arbitrage the share "
                 f"against the call.</p>")
    q = (f"<p>Nobody quotes {navn} today, but everyone agrees that in one year its share will be worth NOK {Su} or "
         f"NOK {Sd}. A one-year European call on the share with strike K = {K1} trades at NOK {_k(C1)}. The one-year "
         f"risk-free rate is {_p(rf, 1)}. Analysts put the probability of the high outcome at {tall(p, 2)}.</p>"
         f"<p>What is the price of {krav}? Answer in NOK with four decimals.</p>")
    vektet = f"[{_f(rho_r)} × {_k(Xu)} + {_f(1 - rho_r)} × {_k(Xd)}]"
    alt = [R(_f(vis), vis),
           F(_f(f_rho), "ρ taken as the call price over the call's up payoff. The price is a value today, the "
             "payoff a value in one year, so the two cannot be divided as they stand.", f_rho),
           F(_f(f_reell), f"The analysts' {tall(p, 2)} weighted and discounted at r<sub>f</sub>. The risk is priced, "
             "so the traded call's price is what tells you the weights, not anyone's forecast.", f_reell),
           F(_f(f_udisk), "The ρ-weighted payoff not discounted. That is a value in one year, not a price "
             "today.", f_udisk)]
    kort = (f"<p><b>{_f(vis)}.</b> The call pays {Su - K1} or 0, so ρ = {_k(C1)} × {_vekst(rf)}/{Su - K1} = "
            f"{_f(rho_r)}. The {kravnavn} pays {_k(Xu)} or {_k(Xd)}: {vektet}/{_vekst(rf)} = {_f(vis)}.</p>")
    full = (f"<p><b>Why one traded claim is enough.</b> In a one-period tree every claim is a mix of the same two "
            f"state payments, so all of them share the same ρ. A traded call tells you ρ as well as the share "
            f"price would. Neither the share price nor the analysts' forecast is needed.</p>"
            f"<p><b>Step 1: the call's payoffs.</b> High: {Su} − {K1} = {Su - K1}. Low: 0.</p>"
            f"<p><b>Step 2: ρ.</b> {_k(C1)} = ρ × {Su - K1}/{_vekst(rf)}, so ρ = {_k(C1)} × {_vekst(rf)}/{Su - K1} = "
            f"{_f(rho_r)}.</p>"
            f"<p><b>Step 3: the {kravnavn}.</b> It pays {_k(Xu)} in the high state and {_k(Xd)} in the low state. "
            f"Price = {vektet}/{_vekst(rf)} = {_f(rho_r * Xu + (1 - rho_r) * Xd)}/{_vekst(rf)} = "
            f"<b>{_f(vis)}</b>.</p>"
            + sjekk
            + f"<p><b>Remember:</b> back ρ out of any traded claim on the tree, then price everything else with it "
            f"and discount at r<sub>f</sub>.</p>")
    return sporsmal(q, alt, kort, full, tall=tallsvar(verdi=riktig, enhet="NOK"))


# ---------------------------------------------------------------------------
# ops-exp1 · Forventet avkastning på en opsjon (PS3 E2 og E4)
# ---------------------------------------------------------------------------
@familie("ops-exp1", tema="opsjoner", antall=5, tittel="The expected return on a call or a put",
         hjelp=hjelp3(
             "This is about the risk of an option. Price the option first, then compare its expected payoff under "
             "the real probabilities with that price.",
             "Price = [ρX<sub>u</sub> + (1 − ρ)X<sub>d</sub>]/(1 + r<sub>f</sub>). E[R] = [pX<sub>u</sub> + (1 − "
             "p)X<sub>d</sub>]/price − 1, with p the real probability. Also E[R] = r<sub>f</sub> + (ΔS<sub>0</sub>/price)"
             "(E[R<sub>S</sub>] − r<sub>f</sub>).",
             "<p><b>Step 1: the price.</b> Use ρ from the share and discount at r<sub>f</sub>.</p>"
             "<p><b>Step 2: the expected payoff.</b> Now the real probability belongs here, because you want "
             "what the holder can expect to receive.</p>"
             "<p><b>Step 3: the return.</b> Expected payoff over price, minus 1.</p>"
             "<p><b>Watch out:</b> the option's expected return is not the share's and not r<sub>f</sub>.</p>",
         ))
def _(r):
    navn = r.choice(AKSJER)
    S0 = r.choice([20, 40, 50, 60, 100])
    u = r.choice([1.25, 1.30, 1.40, 1.50])
    d = r.choice([0.80, 0.85, 0.90])
    rf = r.choice([0.03, 0.04, 0.05])
    rho = ((1 + rf) - d) / (u - d)
    if abs(rund(rho, 4) - rho) > 1e-9:
        raise Avvis("ρ har mer enn fire desimaler")
    p = r.choice([0.50, 0.55, 0.60, 0.65])
    if p <= rho + 0.05:
        raise Avvis("aksjen må ha en risikopremie")
    Su, Sd = rund(S0 * u, 2), rund(S0 * d, 2)
    call = r.random() < 0.6
    K = round(S0 * r.choice([1.0, 1.05, 1.10, 0.95]))
    if not Sd < K < Su:
        raise Avvis("strike utenfor treet")
    Xu, Xd = (Su - K, 0.0) if call else (0.0, K - Sd)
    pris = (rho * Xu + (1 - rho) * Xd) / (1 + rf)
    pris_r = rund(pris, 4)
    Epay = p * Xu + (1 - p) * Xd
    ER = Epay / pris - 1
    ERS = (p * Su + (1 - p) * Sd) / S0 - 1
    delta = (Xu - Xd) / (Su - Sd)
    f_aksje = ERS
    f_rf = rf
    f_delta = rf + delta * (ERS - rf)
    ulike(ER, f_aksje, f_rf, f_delta, rel=0.03)
    navn_o = "call" if call else "put"
    q = (f"<p>{navn} trades at NOK {S0} and pays no dividends. In one year the share will be worth NOK {_k(Su)} with "
         f"probability {tall(p, 2)} or NOK {_k(Sd)} otherwise. The one-year risk-free rate is {_p(rf, 1)}.</p>"
         f"<p>What is the expected return over the year on a one-year European {navn_o} on the share with strike "
         f"K = {K}? Answer in percent with two decimals.</p>")
    alt = [R(_p(ER), ER),
           F(_p(f_aksje), f"This is the share's expected return: [{tall(p, 2)} × {_k(Su)} + {tall(1 - p, 2)} × "
             f"{_k(Sd)}]/{S0} − 1. The {navn_o} is a {'levered long' if call else 'short'} position in the share, "
             f"so its return differs.",
             f_aksje),
           F(_p(f_rf), "The risk-free rate. Only under ρ does every asset earn r<sub>f</sub>. With the real "
             f"probability the {navn_o} carries the risk of the share, amplified.", f_rf),
           F(_p(f_delta), "The share's risk premium scaled by Δ. Δ is the number of shares per option, not the "
             "weight of the shares in the option's value, so it understates the leverage.", f_delta)]
    vektet = f"[{_f(rho)} × {_k(Xu)} + {_f(1 - rho)} × {_k(Xd)}]"
    kort = (f"<p><b>{_p(ER)}.</b> ρ = {_f(rho)}, price = {vektet}/{_vekst(rf)} = {_f(pris_r)}. Expected payoff = "
            f"{tall(p, 2)} × {_k(Xu)} + {tall(1 - p, 2)} × {_k(Xd)} = {_f(Epay)}. E[R] = {_f(Epay)}/{_f(pris_r)} − 1 "
            f"= {_p(ER)}.</p>")
    omega = delta * S0 / pris
    full = (f"<p><b>Why an option is riskier than its share.</b> An option is equivalent to Δ shares and a "
            f"risk-free position B. {'A call buys shares with borrowed money, so it is a levered bet on the share: a higher beta and a higher expected return.' if call else 'A put shorts shares and lends, so it moves against the share: a negative beta and an expected return below r<sub>f</sub>, the price of insurance.'} "
            f"The real probability prices nothing here. It only tells you what the holder can expect.</p>"
            f"<p><b>Step 1: the price.</b> ρ = ({_vekst(rf)} × {S0} − {_k(Sd)})/({_k(Su)} − {_k(Sd)}) = {_f(rho)}. "
            f"Price = {vektet}/{_vekst(rf)} = {_f(pris_r)}.</p>"
            f"<p><b>Step 2: the expected payoff.</b> {tall(p, 2)} × {_k(Xu)} + {tall(1 - p, 2)} × {_k(Xd)} = "
            f"{_f(Epay)}.</p>"
            f"<p><b>Step 3: the return.</b> {_f(Epay)}/{_f(pris_r)} − 1 = <b>{_p(ER)}</b>. The share earns "
            f"{_p(ERS)} and r<sub>f</sub> is {_p(rf, 1)}.</p>"
            f"<p><b>First check.</b> The option's risk premium is the share's scaled by ΔS<sub>0</sub>/price = "
            f"{_fp(delta)} × {S0}/{_f(pris_r)} = {_f(omega)}: {_p(rf, 1)} + {_fp(omega)} × ({_p(ERS)} − {_p(rf, 1)}) "
            f"= {_p(rf + omega * (ERS - rf))} ✓ Both routes rest on the same replication, so this is an identity "
            f"that catches arithmetic slips only.</p>"
            f"<p><b>Remember:</b> price with ρ at r<sub>f</sub>, then measure the expected return with the real "
            f"probability. A call is a levered long position, a put a short one.</p>")
    return sporsmal(q, alt, kort, full, tall=tallsvar(skala=100, enhet="%"))


# ===========================================================================
# Statiske spørsmål: Black-Scholes som intuisjon (A6, D1), amerikansk mot
# europeisk, og hva binomialmodellen sier og ikke sier.
# ===========================================================================
_H_BS = hjelp3(
    "This is Black-Scholes intuition: which way one input moves an option's value when everything else is held "
    "fixed. No formula is needed.",
    "A call pays max(S<sub>T</sub> − K, 0), a put max(K − S<sub>T</sub>, 0). Parity: C − P = S − PV(K). An input "
    "that is absent from parity moves the call and the put by the same amount.",
    "<p><b>Step 1: ask what the input does to the payoff.</b> Does it change S<sub>T</sub>, K or the spread of "
    "outcomes?</p>"
    "<p><b>Step 2: ask what it does to the timing.</b> The strike is paid or received at expiry, so its present "
    "value matters.</p>"
    "<p><b>Step 3: check with parity.</b> If the call and the put move apart, the change must show up in S or "
    "PV(K).</p>",
)

statisk(
    "ops-s01", tema="opsjoner", type="begrep", hjelp=_H_BS,
    q="<p>An investor says: «A riskier share is worth less to risk-averse people like me, so options on it must be "
      "worth less too.» The volatility of a share that pays no dividends rises, while its price today, the strike, "
      "the expiry and the risk-free rate stay the same.</p>"
      "<p>What happens to a European call and a European put on the share?</p>",
    alternativer=[
        R("Both rise by the same amount, because the payoffs are cut off at zero"),
        F("Both fall, because investors demand a higher return on a riskier claim",
          "Risk aversion is already in today's share price, which is held fixed. With S given, more spread only "
          "adds to the payoff of an option, since its downside is cut off at zero."),
        F("The call rises and the put falls, since they are bets in opposite directions",
          "That describes a change in S, not in σ. A wider spread adds both very high and very low prices. Each "
          "option gains from one tail without losing from the other."),
        F("Neither changes, because put-call parity contains no volatility",
          "Parity has no σ in it. That tells you how the two changes relate to each other, not that there "
          "are none."),
    ],
    kort="<p><b>Both rise, equally.</b> More spread adds upside to each option without adding downside. σ is not "
         "in C − P = S − PV(K), so the two changes are equal.</p>",
    full="<p><b>Why volatility helps an option holder.</b> An option's payoff is a hockey stick: the holder takes "
         "the gains on one side and walks away from the losses on the other. Spreading out the possible share "
         "prices at expiry adds more very good and more very bad outcomes. The option gets the good ones in full and "
         "pays nothing extra for the bad ones, because its payoff is already zero there.</p>"
         "<p><b>Step 1: the call.</b> Higher prices raise its payoff without limit; lower prices cost nothing below "
         "zero. Its value rises.</p>"
         "<p><b>Step 2: the put.</b> The mirror image: lower prices raise its payoff, higher prices cost nothing. Its "
         "value rises too.</p>"
         "<p><b>Step 3: by how much.</b> Put-call parity, C − P = S − PV(K), holds for any σ. S and PV(K) are "
         "unchanged, so C − P is unchanged and the two must rise by the same amount.</p>"
         "<p><b>Where the investor goes wrong.</b> Risk aversion is priced into the share. With S held fixed, the "
         "option's value comes from replication. The kink in the payoff is what makes spread valuable. This is "
         "also why shareholders of a levered firm like risk (kreditt) and why uncertainty makes the option to wait "
         "worth more (realopsjon).</p>"
         "<p><b>Remember:</b> σ up, call up and put up by the same amount.</p>",
)

statisk(
    "ops-s02", tema="opsjoner", type="begrep", hjelp=_H_BS,
    q="<p>The central bank raises rates and the one-year risk-free rate rises by one percentage point. The share "
      "price of a firm that pays no dividends, its volatility and the strike and expiry of the options are "
      "unchanged.</p>"
      "<p>What happens to a one-year European call and a one-year European put on the share?</p>",
    alternativer=[
        R("The call rises and the put falls: the present value of the strike falls"),
        F("Both fall: their payoffs are discounted at a higher rate",
          "The share price is held fixed, so only the strike's present value changes. Ask who pays the "
          "strike and who receives it."),
        F("Both rise: a higher rate makes the share grow faster under ρ",
          "The put loses: it pays K − S<sub>T</sub>. K received at expiry is worth less today when rates are "
          "higher."),
        F("The call falls and the put rises: higher rates push share prices down",
          "The question holds the share price fixed. Look at what the rate does to the strike's present "
          "value."),
    ],
    kort="<p><b>Call up, put down.</b> PV(K) = K/(1 + r<sub>f</sub>) falls. Parity: C − P = S − PV(K) rises with S "
         "fixed.</p>",
    full="<p><b>Where the rate enters.</b> The strike is paid at expiry. What matters today is its present value, "
         "PV(K) = K/(1 + r<sub>f</sub>)<sup>T</sup>. A higher rate makes that smaller.</p>"
         "<p><b>Step 1: the call.</b> The holder will pay K to get the share. Paying a fixed amount later is cheaper "
         "in today's money when rates are higher, so the call is worth more. In replication terms, the call is "
         "shares bought with borrowed money. The amount you must borrow to promise K is smaller.</p>"
         "<p><b>Step 2: the put.</b> The holder will receive K. Receiving a fixed amount later is worth less "
         "today, so the put is worth less.</p>"
         "<p><b>Step 3: parity agrees.</b> C − P = S − PV(K). With S fixed and PV(K) lower, C − P rises: the call "
         "gains relative to the put.</p>"
         "<p><b>What the wrong answers mix up.</b> In a real economy higher rates may also lower share prices, but "
         "the question holds S fixed, which is how the comparative static is defined. Discounting the payoff at a "
         "higher rate is only half the story, since the replicating portfolio changes too.</p>"
         "<p><b>Remember:</b> r<sub>f</sub> up, call up and put down, through PV(K).</p>",
)

statisk(
    "ops-s03", tema="opsjoner", type="begrep", hjelp=_H_BS,
    q="<p>A firm unexpectedly announces a special cash dividend to be paid in three months. Its European options "
      "expire in six months. Today's share price does not move on the announcement.</p>"
      "<p>What happens to the value of the firm's European calls and puts?</p>",
    alternativer=[
        F("Nothing: a dividend is a transfer within the firm, irrelevant under MM",
          "MM makes the dividend irrelevant to shareholders, who get the cash. Option holders get nothing, while "
          "the share they have a claim on drops by the dividend."),
        R("Calls fall and puts rise: the share drops by the dividend on the ex date"),
        F("Both rise: the dividend signals that the firm is doing well",
          "The question holds today's price fixed, so there is no signal to price. The mechanical effect is the "
          "drop in the share price on the ex date."),
        F("Both fall: cash leaves the firm, so its value falls",
          "Both options are claims on the same share, but they gain from opposite moves in its price."),
    ],
    kort="<p><b>Calls down, puts up.</b> On the ex date the share drops by the dividend. The option holders do not "
         "receive it.</p>",
    full="<p><b>Why a dividend matters to options.</b> An option is a claim on the share price at expiry, not on the "
         "cash the share pays out. A dividend takes value out of the share before expiry: on the ex-dividend date "
         "the price falls by roughly the dividend. The shareholders are no worse off, because they get the cash. "
         "The option holders get nothing.</p>"
         "<p><b>Step 1: the call.</b> It pays max(S<sub>T</sub> − K, 0). A lower S<sub>T</sub> lowers it.</p>"
         "<p><b>Step 2: the put.</b> It pays max(K − S<sub>T</sub>, 0). A lower S<sub>T</sub> raises it.</p>"
         "<p><b>Step 3: parity.</b> With a dividend, parity becomes C − P = S − PV(Div) − PV(K): the call loses "
         "relative to the put by the present value of the dividend.</p>"
         "<p><b>A side effect.</b> With a dividend before expiry, early exercise of an American call just before "
         "the ex date can pay, so an American call can be worth more than a European one.</p>"
         "<p><b>Remember:</b> dividends before expiry lower calls and raise puts. A buyback at the market price does "
         "not lower the share price, so option holders are indifferent to it.</p>",
)

statisk(
    "ops-s04", tema="opsjoner", type="tolkning",
    hjelp=hjelp3(
        "This is about how a payout reaches option holders. A payout can lower the share price or leave it "
        "unchanged, depending on its form.",
        "A dividend lowers the share price by the dividend on the ex date. A buyback at the market price leaves "
        "the price per share unchanged. Calls gain from a higher S<sub>T</sub>, puts from a lower one.",
        "<p><b>Step 1: the dividend.</b> What happens to the share price on the ex date?</p>"
        "<p><b>Step 2: the buyback.</b> The firm pays cash and retires shares at the market price. What happens to "
        "the price per share?</p>"
        "<p><b>Step 3: each holder.</b> Which outcome raises the call's payoff and which the put's?</p>",
    ),
    q="<p>A firm with listed European options will pay out NOK 20 per share next month, before the options expire. "
      "The board can pay it as a dividend or as a share buyback at the market price. Markets are perfect.</p>"
      "<p>Which form does a holder of the firm's calls prefer and which does a holder of its puts prefer?</p>",
    alternativer=[
        F("Both prefer the dividend, since it puts cash in investors' hands",
          "The cash goes to the shareholders, not to the option holders. The call holder loses when the share "
          "drops by the dividend."),
        F("Both are indifferent: under MM the form of the payout does not matter",
          "MM makes the shareholders indifferent. Option holders are not shareholders: they care only "
          "about what the payout does to the share price."),
        F("The call holder prefers the dividend, the put holder the buyback",
          "This is the wrong way round. Ask which of the two payouts lowers the share price."),
        R("The call holder prefers the buyback, the put holder the dividend"),
    ],
    kort="<p><b>Calls prefer the buyback, puts the dividend.</b> A dividend drops the share price by NOK 20 per "
         "share; a fair-price buyback leaves the price unchanged.</p>",
    full="<p><b>What each payout does to the price.</b> Both payouts send the same cash to the shareholders, so "
         "under MM the shareholders do not care. The share price is a different matter. A dividend leaves the "
         "number of shares unchanged and takes cash out of the firm, so the price per share falls by the dividend. "
         "A buyback at the market price takes out the same cash and retires shares in proportion, so the price per "
         "share stays where it was.</p>"
         "<p><b>Step 1: the call holder.</b> The call pays max(S<sub>T</sub> − K, 0). The buyback keeps "
         "S<sub>T</sub> higher, so the call holder prefers it.</p>"
         "<p><b>Step 2: the put holder.</b> The put pays max(K − S<sub>T</sub>, 0). The dividend pushes "
         "S<sub>T</sub> down, so the put holder prefers it.</p>"
         "<p><b>Step 3: who cares.</b> This is also why managers paid in call options have a reason to favour "
         "buybacks over dividends.</p>"
         "<p><b>Remember:</b> option holders get no cash from a payout, only its effect on the share price. A "
         "dividend lowers it, a fair buyback does not.</p>",
)

statisk(
    "ops-s05", tema="opsjoner", type="begrep",
    hjelp=hjelp3(
        "This is about early exercise of an American call on a share that pays no dividends: whether the "
        "right to exercise early adds value.",
        "Lower bound for a European call on a share without dividends: C ≥ S − PV(K), with PV(K) = K/(1 + "
        "r<sub>f</sub>)<sup>T</sup>. Exercising an American call today gives S − K.",
        "<p><b>Step 1: what exercising gives.</b> Write down what you hold the moment after you exercise and what "
        "it cost you.</p>"
        "<p><b>Step 2: what selling the call gives.</b> Use the lower bound for its price.</p>"
        "<p><b>Step 3: compare the two numbers.</b> Ask which is larger and why paying the strike early matters.</p>"
        "<p><b>Watch out:</b> a view that the share will fall can be acted on without exercising.</p>",
    ),
    q="<p>You hold an American call on a share that pays no dividends. The call is deep in the money and has six "
      "months left. You expect the share to fall and want to lock in your gain now.</p>"
      "<p>What should you do?</p>",
    alternativer=[
        F("Exercise now: that locks in S − K before the share can fall",
          "Exercising pays the strike early and gives up the protection the call gives against a crash. "
          "There is a better way to act on your view."),
        R("Sell the call: it is worth at least S − PV(K), more than S − K"),
        F("Exercise now if S − K is above the call's market price",
          "That cannot happen for a call on a share without dividends: its price never falls below what "
          "exercising would give."),
        F("It does not matter: the price of a deep in-the-money call equals S − K",
          "Even deep in the money the call is worth more than its exercise value, because the strike is "
          "paid only at expiry."),
    ],
    kort="<p><b>Sell, do not exercise.</b> C ≥ S − PV(K) &gt; S − K, so an American call on a share without "
         "dividends is never exercised early and is worth the same as a European one.</p>",
    full="<p><b>Why early exercise never pays here.</b> Compare two ways to get rid of the call. Exercising pays K "
         "now for a share worth S, so you get S − K. Selling the call gets you its price. A call on a share that "
         "pays no dividends is always worth at least S − PV(K): a portfolio of the call and a bond paying K is "
         "worth at least the share at expiry. Since PV(K) is below K, S − PV(K) is above S − K.</p>"
         "<p><b>Step 1: exercise.</b> S − K. You pay the strike early and give up the interest on it. You also "
         "give up the insurance the call gives you if the share collapses.</p>"
         "<p><b>Step 2: sell.</b> At least S − PV(K), more than exercising. If you want to bet on a fall, sell "
         "the call, or keep it and short the share.</p>"
         "<p><b>Step 3: the consequence.</b> Since nobody exercises early, the right to do so is worth nothing: an "
         "American call on a share without dividends is worth exactly the European call. Kurbatov said this "
         "intuition can come on the exam.</p>"
         "<p><b>When it changes.</b> A large dividend before expiry can make exercise just before the ex date "
         "worthwhile, because the share drops and the call holder gets none of the cash.</p>"
         "<p><b>Remember:</b> American call without dividends = European call. Sell it rather than exercise it.</p>",
)

statisk(
    "ops-s06", tema="opsjoner", type="begrep",
    hjelp=hjelp3(
        "This is about the American put: whether the right to sell at the strike before expiry adds value, on a "
        "share that pays no dividends.",
        "Exercising a put today gives K − S now. Holding it gives max(K − S<sub>T</sub>, 0) at expiry. An "
        "American option carries every right of the European option with the same terms.",
        "<p><b>Step 1: take an extreme case.</b> Let the share fall close to zero while the put still has a long "
        "time to run.</p>"
        "<p><b>Step 2: compare in today's money.</b> What does exercising now give? What is the most that "
        "waiting can give?</p>"
        "<p><b>Step 3: draw the conclusion for the extra right.</b> Then ask whether a call on the same share has "
        "a similar case.</p>",
    ),
    q="<p>A share pays no dividends. Compare an American put and a European put on it with the same strike and "
      "expiry.</p>"
      "<p>Which statement is correct?</p>",
    alternativer=[
        F("They are worth the same: early exercise is never optimal on a share without dividends",
          "That holds for calls, where the holder pays the strike. Ask what changes when the holder "
          "receives it."),
        F("The American put is worth less, because exercising early gives up the time value",
          "Early exercise is a right, not a duty. A holder who would lose by it simply does not use it."),
        R("The American put is worth at least as much and can be worth more"),
        F("The American put is worth exactly K − PV(K) more than the European put",
          "The premium for early exercise is not a fixed amount. It depends on how likely early exercise is to "
          "pay. It is zero when the put is far out of the money."),
    ],
    kort="<p><b>At least as much, sometimes more.</b> Deep in the money, taking K now beats waiting for at most K "
         "later. A call on a share without dividends has no such case.</p>",
    full="<p><b>Why calls and puts differ.</b> A call holder pays K at expiry. Paying later is good, so "
         "exercising early only gives up interest. A put holder receives K. Receiving it sooner is good. That "
         "creates a case where exercising early wins.</p>"
         "<p><b>Step 1: the extreme case.</b> Say the share has fallen close to zero. Exercising the put gives "
         "almost K today. Waiting gives at most K at expiry, worth PV(K) today, which is less. You should "
         "exercise.</p>"
         "<p><b>Step 2: the comparison.</b> An American put is a European put plus the right to exercise early. "
         "Since that right sometimes pays, the American put is worth at least as much and sometimes more. A "
         "European put deep in the money can even be worth less than K − S, which an American put never is.</p>"
         "<p><b>Step 3: no formula.</b> There is no simple formula for the early-exercise premium. On a tree you "
         "would take max(exercise now, keep) at every node, but the course does not ask you to compute it.</p>"
         "<p><b>Remember:</b> American call on a share without dividends = European call. American put ≥ European "
         "put.</p>",
)

statisk(
    "ops-s07", tema="opsjoner", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about time to expiry: whether more time always makes an option worth more, for a call and for a "
        "European put.",
        "More time means a wider spread of S<sub>T</sub>, which helps every option. It also means a smaller PV(K), "
        "which helps a call and hurts a put. PV(K) = K/(1 + r<sub>f</sub>)<sup>T</sup>.",
        "<p><b>Step 1: the call.</b> Do both effects of more time point the same way?</p>"
        "<p><b>Step 2: the European put.</b> Do they point the same way, or can one beat the other?</p>"
        "<p><b>Step 3: think of a put deep in the money</b> when rates are high: the holder is waiting to "
        "receive K.</p>",
    ),
    q="<p>Consider options on a share that pays no dividends, with everything else held fixed.</p>"
      "<p>I. A longer time to expiry always makes a European call worth more.<br>"
      "II. A longer time to expiry always makes a European put worth more.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        R("Only I"),
        F("Only II", "II fails for a put deep in the money: waiting longer to receive K lowers its present value, "
          "which can outweigh the extra spread. Check I again."),
        F("Both I and II", "II is not always true. A European put holder receives K at expiry. A later expiry lowers its "
          "present value."),
        F("Neither I nor II", "Look at I again. For a call, more time widens the spread of S<sub>T</sub> and lowers PV(K). "
          "What does each do to a call?"),
    ],
    kort="<p><b>Only I.</b> For a call both effects of time help. For a European put the smaller PV(K) hurts. "
         "Deep in the money it can win.</p>",
    full="<p><b>Two effects of time.</b> A later expiry gives the share more time to move, which widens the spread "
         "of outcomes and helps any option. It also pushes the strike further into the future, so PV(K) = "
         "K/(1 + r<sub>f</sub>)<sup>T</sup> falls.</p>"
         "<p><b>Step 1: the call.</b> The holder pays K. A smaller PV(K) helps. So does the wider spread. "
         "Statement I is true.</p>"
         "<p><b>Step 2: the European put.</b> The holder receives K. The wider spread helps, but the smaller PV(K) "
         "hurts. When the put is deep in the money and rates are high, most of its value is the strike it will "
         "receive, so delaying it lowers the value. Statement II is not always true.</p>"
         "<p><b>Step 3: American options.</b> An American option with more time has every right the shorter one "
         "has, plus more, so it is never worth less. That is why the rule «more time is worth more» needs the "
         "words «for a call» or «for an American option».</p>"
         "<p><b>Remember:</b> T up, call up. European put: ambiguous.</p>",
)

statisk(
    "ops-s08", tema="opsjoner", type="tolkning",
    hjelp=hjelp3(
        "This is the implied-volatility question from the exam: the market price of an option implies one "
        "volatility while you believe in another.",
        "Option value rises with σ. The implied volatility is the σ that makes the model reproduce the market "
        "price. A position is hedged against the share price by holding the opposite of its Δ in shares.",
        "<p><b>Step 1: direction.</b> Is the option worth more or less at your σ than at the implied σ?</p>"
        "<p><b>Step 2: action.</b> Buy what is cheap, sell what is dear.</p>"
        "<p><b>Step 3: isolate the view.</b> Hedge the exposure to the share price so you bet on volatility only. "
        "Say why this is not an arbitrage.</p>",
    ),
    q="<p>A one-year call on a share that pays no dividends trades at a price that implies a volatility of 25%. "
      "After careful work you are convinced that the share's true volatility is 35%.</p>"
      "<p>What does this mean for the call and what should you do?</p>",
    alternativer=[
        F("The call is overpriced: write it, since higher volatility makes the share riskier",
          "Option value rises with σ, so at 35% the call is worth more than a price set at 25%. It is cheap, not "
          "dear."),
        R("The call is underpriced: buy it and short shares to hedge the exposure to S"),
        F("The call is underpriced: buy it and hold it, a riskless profit",
          "A naked long call is a bet on the share's direction as well as on volatility. Even hedged, it is not "
          "an arbitrage: your 35% may be wrong."),
        F("Nothing: the price already reflects all public information about the share",
          "The question says you are convinced the market's volatility is wrong. That is a view you can "
          "act on."),
    ],
    kort="<p><b>Underpriced: buy and delta-hedge.</b> Value rises with σ, so at 35% the call is worth more than its "
         "price. Short Δ shares per call to bet on volatility alone.</p>",
    full="<p><b>What implied volatility is.</b> Every input to the Black-Scholes model except σ can be observed. "
         "The implied volatility is the σ that makes the model give the market price. Here the market prices the "
         "call as if σ were 25%.</p>"
         "<p><b>Step 1: direction.</b> A call's value rises with σ, because its payoff is cut off at zero. At your "
         "35% the call is worth more than the market price, so it is underpriced.</p>"
         "<p><b>Step 2: action.</b> Buy the call. By parity the put is underpriced by the same amount, so buying "
         "the put would express the same view.</p>"
         "<p><b>Step 3: isolate the view.</b> A long call also gains when the share rises and loses when it "
         "falls. To bet only on volatility, short the call's Δ in shares and adjust the hedge as the share "
         "moves. This mirrors H2025 Exercise 1, where the true volatility was below the implied one and the "
         "answer was to write the call.</p>"
         "<p><b>Step 4: the limit.</b> It is not an arbitrage. Your estimate may be wrong, rebalancing costs money "
         "and the market can keep its view for a long time.</p>"
         "<p><b>Remember:</b> true σ above implied, buy the option. Below implied, write it. Hedge to isolate the "
         "view. No Black-Scholes calculation is needed on the exam.</p>",
)

statisk(
    "ops-s09", tema="opsjoner", type="begrep",
    hjelp=hjelp3(
        "This is about why the real probability of the up state does not enter the binomial price of an "
        "option.",
        "Δ = (C<sub>u</sub> − C<sub>d</sub>)/(S<sub>u</sub> − S<sub>d</sub>), B = (C<sub>d</sub> − ΔS<sub>d</sub>)/(1 + "
        "r<sub>f</sub>), C = ΔS<sub>0</sub> + B. Two portfolios with the same payoff in every state must cost the "
        "same.",
        "<p><b>Step 1: build the replicating portfolio.</b> List every input you need for Δ, for B and for the "
        "price.</p>"
        "<p><b>Step 2: check the list against the question.</b> Which of those inputs do the two analysts agree "
        "on?</p>"
        "<p><b>Step 3: ask where beliefs enter the market.</b> Where would the market's view of the up state show "
        "up, if not in your formula?</p>",
    ),
    q="<p>Two analysts value the same one-year European call with a one-period binomial tree. They agree on today's "
      "share price, on the two possible prices in one year and on the risk-free rate. One puts the probability of "
      "the up state at 0.40, the other at 0.80.</p>"
      "<p>What do they find for the call's price?</p>",
    alternativer=[
        F("The optimist finds a higher price, because the call pays in the up state",
          "The replicating portfolio of Δ shares and B in bonds pays the call's payoff in both states. "
          "Ask which inputs its cost depends on."),
        R("The same price: the replicating portfolio does not depend on the probability"),
        F("They cannot agree until they agree on the probability",
          "They need not agree. Both can build the same portfolio of shares and bonds from prices they already "
          "agree on."),
        F("The average of their two expected payoffs, discounted at r<sub>f</sub>",
          "That pairs real probabilities with the risk-free rate for a priced risk and would overprice "
          "the call."),
    ],
    kort="<p><b>The same price.</b> Δ and B come from the payoffs and prices alone. Beliefs about the up state are "
         "already in S<sub>0</sub>.</p>",
    full="<p><b>Why beliefs drop out.</b> The call can be copied with Δ shares and B in risk-free bonds. That "
         "portfolio pays exactly what the call pays in the up state and in the down state. Since the copy matches "
         "the call state by state, not just on average, it must cost what the call costs, or there is an "
         "arbitrage.</p>"
         "<p><b>Step 1: the inputs.</b> Δ needs the two payoffs and the two share prices. B needs the down payoff, "
         "the down price and r<sub>f</sub>. The price is ΔS<sub>0</sub> + B. No probability appears.</p>"
         "<p><b>Step 2: where the beliefs went.</b> They are not lost. They sit in S<sub>0</sub>: the market's "
         "view of the up state and its attitude to risk set today's share price. The analysts take that price "
         "as given.</p>"
         "<p><b>Step 3: the risk-neutral route.</b> The same price comes out of ρ, a weight built from prices, "
         "discounted at r<sub>f</sub>. ρ is not either analyst's forecast.</p>"
         "<p><b>Remember:</b> the binomial price needs prices, not probabilities. A real probability of a priced "
         "risk never goes with r<sub>f</sub>.</p>",
)

statisk(
    "ops-s10", tema="opsjoner", type="tolkning",
    hjelp=hjelp3(
        "This is about what the risk-neutral probability ρ is and why it differs from the real probability of the "
        "up state.",
        "ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>) makes the share earn "
        "r<sub>f</sub>. The real probability p makes it earn its expected return, which includes a risk premium.",
        "<p><b>Step 1: compare the returns.</b> Under p the share earns more than r<sub>f</sub>. Under ρ it earns "
        "exactly r<sub>f</sub>.</p>"
        "<p><b>Step 2: what that does to the weights.</b> To lower the expected return, which state must get less "
        "weight?</p>"
        "<p><b>Step 3: why there is a gap at all.</b> Who demands the premium?</p>",
    ),
    q="<p>For a share in a one-period tree you find ρ = 0.45, while analysts put the real probability of the up "
      "state at 0.70. The share pays no dividends.</p>"
      "<p>Why is ρ below the real probability?</p>",
    alternativer=[
        F("Because ρ is the market's forecast and the market is more pessimistic than the analysts",
          "ρ is not a forecast. It is the weight that makes the share earn r<sub>f</sub>. It would differ "
          "from p even if everyone agreed on p."),
        F("Because the down state is more likely than the analysts think",
          "Nothing in ρ says how likely the states are. Ask what makes ρ differ from p even when everyone "
          "agrees on p."),
        R("Because the share has a risk premium: ρ shifts weight to the bad state so the share earns r<sub>f</sub>"),
        F("Because ρ must lie below 0.50 when the share can fall",
          "ρ can take any value between 0 and 1. It depends on how (1 + r<sub>f</sub>)S<sub>0</sub> sits between "
          "the two outcomes."),
    ],
    kort="<p><b>The risk premium.</b> Under p the share earns more than r<sub>f</sub>. ρ puts less weight on the "
         "good state, so the share earns only r<sub>f</sub>.</p>",
    full="<p><b>What ρ is for.</b> Investors are risk averse, so they price the share below its expected payoff "
         "discounted at r<sub>f</sub>: the share must offer a risk premium. ρ builds that premium into the "
         "weights instead of into the discount rate. It is the probability that would make a risk-neutral "
         "investor pay today's price.</p>"
         "<p><b>Step 1: the returns.</b> With p = 0.70 the share's expected payoff gives a return above "
         "r<sub>f</sub>. With ρ the expected payoff, discounted at r<sub>f</sub>, is exactly S<sub>0</sub>.</p>"
         "<p><b>Step 2: the weights.</b> To bring the expected return down to r<sub>f</sub>, the good state must "
         "get less weight, so ρ &lt; p. The bad state gets more weight, 1 − ρ &gt; 1 − p.</p>"
         "<p><b>Step 3: the meaning.</b> The bad state is where money is scarce, so a krone there is worth more. "
         "ρ is a price of state payments, not a forecast. That is why ρ is discounted at r<sub>f</sub> and p "
         "with the risk-adjusted rate. The same logic makes a risk-neutral default probability higher than the "
         "real one (kreditt).</p>"
         "<p><b>Remember:</b> ρ &lt; p when the share carries a risk premium. ρ prices, p forecasts.</p>",
)

statisk(
    "ops-s11", tema="opsjoner", type="begrep",
    hjelp=hjelp3(
        "This is about the exercise decision at expiry and the role of the premium you paid.",
        "Call payoff at expiry = max(S<sub>T</sub> − K, 0). Profit = payoff − premium. The premium is paid "
        "already, whatever you decide.",
        "<p><b>Step 1: list the two choices at expiry.</b> Exercise or let the call lapse.</p>"
        "<p><b>Step 2: what each gives you from now on.</b> Leave out what is already spent.</p>"
        "<p><b>Step 3: pick the larger.</b> Then work out the profit separately.</p>",
    ),
    q="<p>You bought a European call with strike K = 100 for a premium of 6. At expiry the share trades at 103.</p>"
      "<p>Should you exercise and what is the result?</p>",
    alternativer=[
        F("No: the share is below K + premium = 106, so exercising would lose money",
          "The premium is sunk. The break-even of 106 tells you whether the trade made money, not whether "
          "to exercise."),
        R("Yes: exercising gives 3 instead of 0, so the loss is cut from 6 to 3"),
        F("Yes: the profit is 3, the payoff of the call",
          "Exercising is right, but the payoff is not the profit: the premium still counts."),
        F("It does not matter: you lose the premium either way",
          "It matters. Compare what you hold after exercising with what you hold if the call lapses."),
    ],
    kort="<p><b>Exercise: −3 instead of −6.</b> The decision compares 3 with 0. The premium is sunk and does not "
         "enter it.</p>",
    full="<p><b>Payoff and profit are different things.</b> The payoff is what the option delivers at expiry, "
         "max(S<sub>T</sub> − K, 0). The profit subtracts the premium paid at the start. The exercise decision "
         "is made at expiry and compares only what each choice gives from then on.</p>"
         "<p><b>Step 1: the choices.</b> Exercise: pay 100 for a share worth 103, a gain of 3. Lapse: 0.</p>"
         "<p><b>Step 2: the decision.</b> 3 beats 0, so exercise. The premium of 6 was paid long ago and is the "
         "same under both choices, so it cannot change the ranking.</p>"
         "<p><b>Step 3: the result.</b> Profit = 3 − 6 = −3. Without exercising it would be −6.</p>"
         "<p><b>First check.</b> The break-even for the trade is K + premium = 106. At 103 the trade loses money, "
         "but less than the full premium, which is what an in-the-money call that still lost money looks like.</p>"
         "<p><b>Remember:</b> exercise a call whenever S<sub>T</sub> &gt; K. The premium decides the profit, never "
         "the exercise.</p>",
)

statisk(
    "ops-s12", tema="opsjoner", type="begrep",
    hjelp=hjelp3(
        "This is about the risk of an option compared with the risk of its share, seen through the replicating "
        "portfolio.",
        "C = ΔS + B with Δ &gt; 0 and B &lt; 0 for a call. P = ΔS + B with Δ &lt; 0 and B &gt; 0 for a put. The beta "
        "of a portfolio is the value-weighted beta of its parts. The bond has beta 0.",
        "<p><b>Step 1: the call's weights.</b> The call is shares bought partly with borrowed money. How large "
        "is ΔS compared with C?</p>"
        "<p><b>Step 2: the put's weights.</b> The put is a short position plus lending. What sign does ΔS "
        "have?</p>"
        "<p><b>Step 3: the betas.</b> Weight the share's beta by ΔS/C or ΔS/P; the bond adds nothing.</p>",
    ),
    q="<p>A share has a beta of 1.2. Consider a one-year European call and a one-year European put on it, both at "
      "the money.</p>"
      "<p>How do the betas of the call and the put compare with the share's?</p>",
    alternativer=[
        F("Both have a beta of 1.2, since both are written on the same share",
          "An option is a levered position in the share, so its beta is not the share's beta."),
        F("Both have a beta of 0, since options are priced with ρ and r<sub>f</sub>",
          "Pricing with ρ discounted at r<sub>f</sub> is a valuation shortcut. The option's real returns still move "
          "with the share."),
        R("The call's beta is well above 1.2 and the put's is negative"),
        F("The call's beta is below 1.2 and the put's lies between 0 and 1.2",
          "The call is shares bought partly with borrowed money. Ask what borrowing does to risk. The put "
          "is a short position: ask what that does to the sign."),
    ],
    kort="<p><b>Call above 1.2, put negative.</b> β<sub>C</sub> = (ΔS/C) × 1.2 with ΔS &gt; C. β<sub>P</sub> = "
         "(ΔS/P) × 1.2 with Δ &lt; 0.</p>",
    full="<p><b>An option is a portfolio.</b> Replication says a call is Δ shares bought partly with borrowed money. "
         "A put is a short position in Δ shares plus lending. The beta of a portfolio is the value-weighted "
         "average of its parts' betas. A risk-free bond has beta 0.</p>"
         "<p><b>Step 1: the call.</b> β<sub>C</sub> = (ΔS/C) × β<sub>S</sub>. Because you borrow, the shares are "
         "worth more than the call: ΔS &gt; C. So β<sub>C</sub> is a multiple of 1.2, often several times it. PS3 "
         "Exercise 2 gets a call beta of 3.25 on a share with beta 0.75.</p>"
         "<p><b>Step 2: the put.</b> Δ &lt; 0, so ΔS/P is negative and so is β<sub>P</sub>. The put rises when the "
         "share falls: it is insurance.</p>"
         "<p><b>Step 3: the returns.</b> With the CAPM, the call's expected return is well above the share's and "
         "the put's is below r<sub>f</sub>. In PS3 Exercise 4 the call expects 110% and the put −30%.</p>"
         "<p><b>Remember:</b> a call is a levered long position, a put a short one. Neither has the share's "
         "beta.</p>",
)

statisk(
    "ops-s13", tema="opsjoner", type="begrep",
    hjelp=hjelp3(
        "This is about how the share price moves a call and a put. Put-call parity then says what the two moves "
        "add up to.",
        "Call payoff max(S<sub>T</sub> − K, 0), put payoff max(K − S<sub>T</sub>, 0). Parity: C − P = S − PV(K) for "
        "European options on a share without dividends.",
        "<p><b>Step 1: the call.</b> Does a higher share price today make a high S<sub>T</sub> more or less "
        "likely? What does that do to the call?</p>"
        "<p><b>Step 2: the put.</b> Ask the same question for the put.</p>"
        "<p><b>Step 3: parity.</b> Which term on the right-hand side changes when S rises by 1? Is it "
        "discounted or not?</p>",
    ),
    q="<p>A share that pays no dividends rises from NOK 80 to NOK 81. The strike, the expiry, the risk-free rate "
      "and the volatility are unchanged.</p>"
      "<p>What happens to a European call and a European put on the share?</p>",
    alternativer=[
        F("Both rise, because both are options on a share that is now worth more",
          "The put pays K − S<sub>T</sub>. A higher share price makes a low S<sub>T</sub> less likely, so the put "
          "loses value."),
        F("The call rises by exactly 1 and the put is unchanged",
          "The call rises by less than 1, because it moves with only part of the share. The put does not "
          "stay where it was either."),
        R("The call rises, the put falls and C − P rises by exactly 1"),
        F("The call rises, the put falls and C − P rises by 1/(1 + r<sub>f</sub>)<sup>T</sup>",
          "Discounting belongs to the strike, which is paid at expiry. The share is held today, so it enters "
          "parity undiscounted."),
    ],
    kort="<p><b>Call up, put down, C − P up by exactly 1.</b> Parity: C − P = S − PV(K), so S moves C − P one "
         "for one. A higher strike works the other way, through PV(K).</p>",
    full="<p><b>Two inputs that pull in opposite directions.</b> A call pays when the share ends above the strike, "
         "a put when it ends below. So the share price and the strike move the two options in opposite "
         "directions.</p>"
         "<p><b>Step 1: the call.</b> A higher share price today makes high prices at expiry more likely, so "
         "the call is worth more. It rises by less than 1, because a call moves with only Δ &lt; 1 shares.</p>"
         "<p><b>Step 2: the put.</b> Low prices at expiry become less likely, so the put is worth less.</p>"
         "<p><b>Step 3: parity.</b> C − P = S − PV(K). S enters undiscounted, so C − P rises by exactly 1. The "
         "call's gain plus the put's loss add up to the share's move of 1.</p>"
         "<p><b>The strike.</b> A higher K lowers the call, whose holder now pays more to exercise. It raises the put, "
         "which now receives more. By parity C − P falls by the present value of the change in K, because K is paid at "
         "expiry.</p>"
         "<p><b>Remember:</b> S up, call up and put down. K up, call down and put up. Parity ties the two moves "
         "together.</p>",
)
