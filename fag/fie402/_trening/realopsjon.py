# -*- coding: utf-8 -*-
"""Eksamenstrening FIE402: realopsjoner (skribent 3).

   Familier med tallsvar:
     reo-ven1  opsjonen på å vente: evige regimer, reell sannsynlighet, r_f bare når risikoen ikke er priset
     reo-inf1  verdien av informasjon: studie nå og studie som tar ett år (H2025 E5 b–c)
     reo-exi1  exit etter n år, sammenlignet med 0 (H2025 E5 d, D12)
     reo-mnd1  butikken med månedsrente og exit etter 24 måneder (lecture 11, B13, D3)
     reo-trn1  trinnvis finansiering (lecture 11, B13)
     reo-lik1  likegyldighet: sannsynlighet, investeringskostnad eller spredning X (H2025 E5 e, PS3 E9 c)
     reo-rho1  ρ fra et omsatt verdipapir på rentetreet (H2024 E6 c)
     reo-opt1  verdien av retten til å vente priset med ρ (H2024 E6 d)
   Statiske: reo-s01 til reo-s15.

   Konvensjoner: reelle sannsynligheter diskonteres med kapitalkostnaden, som er
   r_f bare når risikoen ikke er systematisk (A3). Nedleggelse sammenlignes med 0
   (D12). Månedsrente (1 + r)^(1/12) − 1 (A4, D3). Ingen Black-Scholes (A6).
   S0, Su og Sd priser samme kontantstrøm, og Su/Sd tar med betalingen på dato 1.
"""
from trening_lib import *  # noqa: F401,F403

FIRMA = ["Sjøholt Energi AS", "Tverrfjell Mineral AS", "Kvernes Havbruk AS", "Brattvåg Logistikk AS",
         "Hustad Datasenter AS", "Lyngør Ferger AS", "Eidsvåg Biotek AS", "Rindal Vind AS", "Torvik Bryggeri AS",
         "Myrland Solkraft AS"]
BUTIKK = ["a bakery", "a bike shop", "a climbing gym", "a coffee bar", "a padel hall", "a bookshop", "a sushi bar",
          "a fitness studio"]


def _f(x):
    return tall(x, 4)


def _m(x):
    """Beløp i millioner med to desimaler."""
    return tall(x, 2)


def _n(x):
    """Beløp i kroner, hele tall."""
    return tall(x, 0)


def _p(x, d=2):
    return pst(x, d)


def _r(r):
    return tall(r, 3 if rund(r * 1000) % 10 else 2)


def _vekst(r):
    return tall(1 + r, 3 if rund(r * 1000) % 10 else 2)


def A(r, n):
    return annuitetsfaktor(r, n)


# ---------------------------------------------------------------------------
# reo-ven1 · Opsjonen på å vente
# ---------------------------------------------------------------------------
@familie("reo-ven1", tema="realopsjon", antall=7, tittel="The option to wait: invest now or after the news",
         hjelp=hjelp3(
             "This is the option to wait. Investing now buys the average outcome; waiting a year lets you invest "
             "only in the good state, at the price of a year's delay.",
             "NPV<sub>now</sub> = E[C]/r − I. State NPVs at the investment date: C<sub>i</sub>/r − I. Waiting today: "
             "Σ p<sub>i</sub> max(0, NPV<sub>i</sub>)/(1 + r). Option to wait = waiting − max(0, NPV<sub>now</sub>). "
             "r is r<sub>f</sub> only when the risk is not systematic.",
             "<p><b>Step 1: invest now.</b> Expected cash flow as a perpetuity, minus the cost.</p>"
             "<p><b>Step 2: the state NPVs at the date you would invest.</b> Take max(0, ·) in each.</p>"
             "<p><b>Step 3: discount the waiting strategy one year,</b> at the rate that fits the risk.</p>"
             "<p><b>Step 4: compare with the best you can do now,</b> which is never below 0.</p>"
             "<p><b>Watch out:</b> take the max before you average. The cost paid at date 1 is discounted too.</p>",
         ))
def _(r):
    navn = r.choice(FIRMA)
    systematisk = r.random() < 0.4
    I = r.choice([500, 800, 1000, 1200, 1500, 2000])
    if systematisk:
        rr = r.choice([0.10, 0.12])
        rf = r.choice([0.04, 0.05])
    else:
        rr = r.choice([0.05, 0.06, 0.08, 0.10])
        rf = rr
    p = r.choice([0.4, 0.5, 0.6])
    CH = rund(I * rr * r.choice([1.3, 1.4, 1.5, 1.6]), 0)
    CL = rund(I * rr * r.choice([0.5, 0.6, 0.7]), 0)
    EC = p * CH + (1 - p) * CL
    NPVnow = EC / rr - I
    NPVH, NPVL = CH / rr - I, CL / rr - I
    if not (NPVH > 0 > NPVL):
        raise Avvis("tilstandene må gå hver sin vei")
    W = p * NPVH / (1 + rr)
    opsjon = W - max(0, NPVnow)
    typ = r.choice(["opsjon", "vent", "opsjon"])
    if typ == "opsjon" and opsjon < 1:
        raise Avvis("å vente må lønne seg")
    W_udisk = p * NPVH
    W_kost = p * (CH / rr / (1 + rr) - I)
    if systematisk:
        W_rf = p * NPVH / (1 + rf)                         # ventetiden diskontert med r_f
    if typ == "opsjon":
        riktig = opsjon
        f1 = W_udisk - max(0, NPVnow)
        n1 = ("The waiting strategy not discounted. The good state's NPV is measured at date 1, when you invest, "
              "not today.")
        f2 = W_kost - max(0, NPVnow)
        n2 = "The cost paid at date 1 left undiscounted. Waiting delays the cost as well as the cash flows."
        if systematisk:
            f3 = W_rf - max(0, NPVnow)
            n3 = (f"The year of waiting discounted at r<sub>f</sub> = {_p(rf, 1)}. The probability is a real one and "
                  f"the demand risk is systematic, so the cost of capital, {_p(rr, 0)}, applies to this year too.")
        elif NPVnow < 0:
            f3 = W - NPVnow
            n3 = ("Compared with the negative NPV of investing now. Nobody would invest now at a loss, so that is "
                  "not the alternative to waiting.")
        else:
            f3 = p * NPVH / (1 + rr) ** 2 - NPVnow
            n3 = ("The good state discounted twice. Its NPV of C/r − I is a value at date 1, when you invest, "
                  "not a value one year before that.")
        fmt = _m
        spm = (f"What is the value today of the option to wait, that is the value of waiting minus the best you can "
               f"do by deciding now? Answer in NOK million with two decimals.")
    else:
        riktig = W
        f1 = W_udisk
        n1 = ("Not discounted. You invest at date 1, so the good state's NPV is a date-1 value, not a value "
              "today.")
        f2 = NPVnow / (1 + rr)
        n2 = ("The states averaged before deciding. Waiting is worth something only because you skip the bad "
              "state. Averaging first throws that away.")
        if systematisk:
            f3 = W_rf
            n3 = (f"The year of waiting discounted at r<sub>f</sub> = {_p(rf, 1)}. The probability is a real one and "
                  f"the risk is systematic, so it goes with the cost of capital, {_p(rr, 0)}.")
        else:
            f3 = W_kost
            n3 = "The cost paid at date 1 left undiscounted. It is paid a year from now, like the cash flows."
        fmt = _m
        spm = ("What is the value today of waiting one year and then deciding? Answer in NOK million with two "
               "decimals.")
    ulike(riktig, f1, f2, f3, rel=0.02)
    if systematisk:
        rente = (f"The demand risk is systematic: the project's cost of capital is {_p(rr, 0)}, while the risk-free "
                 f"rate is {_p(rf, 1)}.")
    else:
        rente = (f"Demand is unrelated to the market, so discount at the risk-free rate of {_p(rr, 0)}.")
    q = (f"<p>{navn} can build a plant for NOK {_n(I)} million, today or in exactly one year at the same cost. Once "
         f"built, the plant pays NOK {_n(CH)} million a year forever with probability {tall(p, 1)} or NOK {_n(CL)} "
         f"million a year forever otherwise, the first payment one year after it is built. Which state holds is "
         f"revealed in one year whether or not the plant is built. It never changes. {rente} Waiting shifts the "
         f"whole project by one year.</p><p>{spm}</p>")
    alt = [R(fmt(riktig), riktig), F(fmt(f1), n1, f1), F(fmt(f2), n2, f2), F(fmt(f3), n3, f3)]
    beslutning = "wait" if W > max(0, NPVnow) else "invest now"
    kort = (f"<p><b>{fmt(riktig)}.</b> NPV<sub>now</sub> = {_m(EC)}/{_r(rr)} − {_n(I)} = {_m(NPVnow)}. Good state at "
            f"date 1: {_n(CH)}/{_r(rr)} − {_n(I)} = {_m(NPVH)}. Waiting: {tall(p, 1)} × {_m(NPVH)}/{_vekst(rr)} = "
            f"{_m(W)}"
            + (f". Option = {_m(W)} − {_m(max(0, NPVnow))} = {_m(opsjon)}.</p>" if typ == "opsjon" else ".</p>"))
    if NPVnow >= 0:
        unngatt = (1 - p) * (-NPVL)
        utsatt = p * NPVH - W
        sjekk = (f"<p><b>First check: the two forces.</b> Waiting avoids the bad state, worth {tall(1 - p, 1)} × "
                 f"{_m(-NPVL)} = {_m(unngatt)}. It delays the good state, costing {_m(p * NPVH)} − {_m(W)} = "
                 f"{_m(utsatt)}. {_m(unngatt)} − {_m(utsatt)} = {_m(unngatt - utsatt)} = the option ✓ This is a "
                 f"different route, so it catches a slip in either one.</p>")
    else:
        sjekk = (f"<p><b>First check.</b> The state NPVs average back to investing now: {tall(p, 1)} × {_m(NPVH)} + "
                 f"{tall(1 - p, 1)} × ({_m(NPVL)}) = {_m(p * NPVH + (1 - p) * NPVL)} = NPV<sub>now</sub> ✓ This "
                 f"catches a wrong perpetuity or cost. Investing now is negative, so its value is 0 and waiting "
                 f"costs you nothing you would otherwise take.</p>")
    full = (f"<p><b>Why waiting can pay.</b> Investing now commits you to the average outcome, bad state included. "
            f"If you wait a year you learn the state and invest only if it pays, so the bad state becomes a 0. The "
            f"price is that the good state's cash flows start a year later. Real probabilities go with the "
            f"project's cost of capital: {'r<sub>f</sub> because the risk is not systematic' if not systematisk else 'here ' + _p(rr, 0) + ', because the risk is priced'}.</p>"
            f"<p><b>Step 1: invest now.</b> E[C] = {tall(p, 1)} × {_n(CH)} + {tall(1 - p, 1)} × {_n(CL)} = {_m(EC)}. "
            f"NPV<sub>now</sub> = {_m(EC)}/{_r(rr)} − {_n(I)} = {_m(NPVnow)}.</p>"
            f"<p><b>Step 2: the state NPVs at date 1.</b> Good: {_n(CH)}/{_r(rr)} − {_n(I)} = {_m(NPVH)}. Bad: "
            f"{_n(CL)}/{_r(rr)} − {_n(I)} = {_m(NPVL)}, so you would not build: 0.</p>"
            f"<p><b>Step 3: waiting today.</b> {tall(p, 1)} × {_m(NPVH)}/{_vekst(rr)} = "
            f"{'<b>' + _m(W) + '</b>' if typ == 'vent' else _m(W)}.</p>"
            + (f"<p><b>Step 4: the option.</b> {_m(W)} − max(0, {_m(NPVnow)}) = <b>{_m(opsjon)}</b>.</p>"
               if typ == "opsjon" else "")
            + sjekk
            + f"<p><b>Decision:</b> {beslutning}. "
            f"{'Even a positive NPV today can mean wait.' if NPVnow > 0 and beslutning == 'wait' else ''}</p>"
            f"<p><b>Remember:</b> max(0, NPV) state by state, then average and discount one year. Compare with "
            f"max(0, NPV<sub>now</sub>).</p>")
    return sporsmal(q, alt, kort, full, tall=tallsvar(enhet="NOK million"))


# ---------------------------------------------------------------------------
# reo-inf1 · Verdien av informasjon (H2025 E5 b–c)
# ---------------------------------------------------------------------------
@familie("reo-inf1", tema="realopsjon", antall=6, tittel="The value of a market study, now or in a year",
         hjelp=hjelp3(
             "This is the value of information. A study lets you decide state by state instead of on the average. "
             "It is worth what that ability adds to the best you can do without it.",
             "Value = E[max(0, NPV<sub>i</sub>)] − max(0, E[NPV]) when the answer comes now. If it comes in a year, "
             "the informed value is discounted one year: E[max(0, NPV<sub>i</sub>)]/(1 + r) − max(0, E[NPV]).",
             "<p><b>Step 1: the state NPVs.</b> Net the costs off the revenue in each state, value the "
             "perpetuity, subtract the outlay.</p>"
             "<p><b>Step 2: informed.</b> Take max(0, ·) in each state and average.</p>"
             "<p><b>Step 3: uninformed.</b> The expected NPV, or 0 if it is negative.</p>"
             "<p><b>Step 4: the difference,</b> with one year of discounting if the study takes a year.</p>",
         ))
def _(r):
    sted = r.choice(BUTIKK)
    I = r.choice([160_000, 200_000, 300_000, 400_000, 500_000])
    rr = r.choice([0.06, 0.07, 0.08])
    c = r.choice([60_000, 80_000, 90_000, 120_000])
    p = r.choice([0.5, 0.5, 0.4, 0.6])
    gap_h = r.choice([20_000, 30_000, 40_000])
    gap_l = r.choice([10_000, 15_000, 20_000])
    RH, RL = c + gap_h, c - gap_l
    CH, CL = RH - c, RL - c
    NPVH = CH / rr - I
    NPVL = CL / rr - I
    ENPV = p * NPVH + (1 - p) * NPVL
    if NPVH <= 0:
        raise Avvis("det gode utfallet må lønne seg")
    Emax = p * NPVH
    senere = r.random() < 0.5
    if senere:
        riktig = Emax / (1 + rr) - max(0, ENPV)
    else:
        riktig = Emax - max(0, ENPV)
    if riktig < 2000 or abs(ENPV) < 2000:
        raise Avvis("for liten verdi")
    if not senere:
        if ENPV < 0:
            f1, n1 = Emax - ENPV, ("Compared with the negative expected NPV. Without the study you would not open, "
                                   "so a loss is not the alternative.")
        else:
            f1, n1 = Emax, ("The informed value on its own. Without the study you would still open. The study is "
                            "worth only what it adds to that.")
        f2 = Emax / (1 + rr) - max(0, ENPV)
        n2 = "Discounted one year. The study has already been done and you learn the state today, so nothing waits."
        f3 = 0.0
        n3 = ("The study changes no expected cash flow, but it changes the decision: you open only in the good "
              "state. Averaging before deciding throws that away.")
    else:
        if ENPV < 0:
            f1, n1 = Emax / (1 + rr) - ENPV, ("Compared with the negative expected NPV. Without the study you would "
                                              "not open, so a loss is not the alternative.")
        else:
            f1, n1 = Emax / (1 + rr), ("The informed value on its own. Without the study you would open now. The "
                                       "study is worth only what it adds to that.")
        f2 = Emax - max(0, ENPV)
        n2 = ("Not discounted. You learn the state in a year and open then, so the informed value arrives a year "
              "later than an immediate study would give it.")
        f3 = p * (CH / rr / (1 + rr) - I) - max(0, ENPV)
        n3 = (f"The outlay of {_n(I)} left undiscounted. If you wait for the study, you also open and pay a year "
              "later.")
    ulike(riktig, f1, f2, f3, rel=0.02)
    studie = ("The study has already been done: if you pay for it now, you learn the state at once."
              if not senere else
              "The study takes one year: you pay for it now, learn the state in one year and then decide whether "
              "to open, with the same outlay and the same cash flows shifted one year.")
    q = (f"<p>You consider opening {sted}. It costs NOK {_n(I)} to open. Running it costs NOK {_n(c)} a year. It "
         f"will bring in NOK {_n(RH)} a year with probability {tall(p, 1)} or NOK {_n(RL)} a year otherwise, forever, "
         f"from the end of year 1. You do not know which. If you open, you learn it only during year 1. Demand "
         f"is unrelated to the market: discount at the risk-free rate of {_p(rr, 0)}. A market study would reveal "
         f"the state. {studie}</p>"
         f"<p>What is the most you would pay for the study today? Answer in NOK, rounded to whole kroner.</p>")
    alt = [R(_n(riktig), riktig), F(_n(f1), n1, f1), F(_n(f2), n2, f2), F(_n(f3), n3, f3)]
    kort = (f"<p><b>NOK {_n(riktig)}.</b> NPV<sub>good</sub> = {_n(CH)}/{_r(rr)} − {_n(I)} = {_n(NPVH)}, "
            f"NPV<sub>bad</sub> = {_n(NPVL)}, E[NPV] = {_n(ENPV)}. Informed: {tall(p, 1)} × {_n(NPVH)} = {_n(Emax)}"
            + (f", a year later {_n(Emax / (1 + rr))}" if senere else "")
            + f". Value = {_n(Emax / (1 + rr) if senere else Emax)} − {_n(max(0, ENPV))} = {_n(riktig)}.</p>")
    full = (f"<p><b>Where the value of information comes from.</b> Without the study you must decide on the average. "
            f"With it you open only in the good state and stay out of the bad one. The study does not change any "
            f"cash flow; it changes the decision. Its value is the informed outcome minus the best you can do "
            f"uninformed, which is never below 0.</p>"
            f"<p><b>Step 1: the states.</b> Net cash flow {_n(CH)} or {_n(CL)} a year. NPV<sub>good</sub> = "
            f"{_n(CH)}/{_r(rr)} − {_n(I)} = {_n(NPVH)}. NPV<sub>bad</sub> = {_n(CL)}/{_r(rr)} − {_n(I)} = "
            f"{_n(NPVL)}.</p>"
            f"<p><b>Step 2: uninformed.</b> E[NPV] = {tall(p, 1)} × {_n(NPVH)} + {tall(1 - p, 1)} × ({_n(NPVL)}) = "
            f"{_n(ENPV)}, so {'you would open' if ENPV > 0 else 'you would not open: worth 0'}.</p>"
            f"<p><b>Step 3: informed.</b> Open only in the good state: {tall(p, 1)} × {_n(NPVH)} = {_n(Emax)}"
            + (f". You learn it in a year, so today: {_n(Emax)}/{_vekst(rr)} = {_n(Emax / (1 + rr))}" if senere else "")
            + f".</p>"
            f"<p><b>Step 4: the value.</b> {_n(Emax / (1 + rr) if senere else Emax)} − {_n(max(0, ENPV))} = "
            f"<b>NOK {_n(riktig)}</b>.</p>"
            + (f"<p><b>First check.</b> The study changes only the bad-state decision, avoiding a loss of "
               f"{_n(-NPVL)} with probability {tall(1 - p, 1)}: {_n((1 - p) * -NPVL)} ✓ A real check, by another "
               f"route.</p>" if (not senere and ENPV > 0) else
               f"<p><b>First check.</b> The delay costs the good state its first year: the informed value falls "
               f"from {_n(Emax)} to {_n(Emax / (1 + rr))}, a loss of {_n(Emax - Emax / (1 + rr))}. That is the "
               f"year-1 cash flow given up, {tall(p, 1)} × {_n(CH)}/{_vekst(rr)} = {_n(p * CH / (1 + rr))}, net of the "
               f"benefit of paying the outlay a year later, {tall(p, 1)} × ({_n(I)} − {_n(I)}/{_vekst(rr)}) = "
               f"{_n(p * (I - I / (1 + rr)))} ✓</p>" if senere else
               f"<p><b>First check.</b> Without the study you stay out, so the study's whole value is the good "
               f"state you would otherwise miss: {tall(p, 1)} × {_n(NPVH)} = {_n(Emax)} ✓</p>")
            + f"<p><b>Remember:</b> E[max(0, NPV<sub>i</sub>)] − max(0, E[NPV]). A study that takes a year is worth "
            f"less, because you lose the first year's cash flow in the good state.</p>")
    return sporsmal(q, alt, kort, full, tall=tallsvar(enhet="NOK"))


# ---------------------------------------------------------------------------
# reo-exi1 · Exit etter n år, sammenlignet med 0 (H2025 E5 d, D12)
# ---------------------------------------------------------------------------
@familie("reo-exi1", tema="realopsjon", antall=6, tittel="The exit option: a perpetuity cut to an annuity",
         hjelp=hjelp3(
             "This is the option to exit. In the bad state you may stop after a few years instead of running a "
             "losing business forever. You need its effect on the decision to open.",
             "Bad state with exit after n years: −I + C<sub>bad</sub> × [1 − (1 + r)<sup>−n</sup>]/r. Good state: "
             "−I + C<sub>good</sub>/r. The value of the exit right is compared with the best alternative, which "
             "is 0 if you would not open without it.",
             "<p><b>Step 1: the good state.</b> You never exit, so it is a perpetuity.</p>"
             "<p><b>Step 2: the bad state.</b> You must run it until the exit date, then you stop and get 0.</p>"
             "<p><b>Step 3: average.</b> That is the NPV of opening with the exit right.</p>"
             "<p><b>Watch out:</b> compare with not opening, worth 0, not with the negative NPV of opening without "
             "the right.</p>",
         ))
def _(r):
    sted = r.choice(BUTIKK)
    I = r.choice([150_000, 160_000, 200_000, 250_000, 300_000])
    rr = r.choice([0.06, 0.07, 0.08])
    c = r.choice([80_000, 90_000, 100_000, 120_000])
    p = 0.5
    gap_h = r.choice([20_000, 25_000, 30_000, 40_000])
    gap_l = r.choice([10_000, 15_000, 20_000])
    n = r.choice([2, 3, 2])
    RH, RL = c + gap_h, c - gap_l
    CH, CL = RH - c, RL - c
    NPVH = CH / rr - I
    NPVL_exit = -I + CL * A(rr, n)
    NPVL_evig = CL / rr - I
    NPV_exit = p * NPVH + (1 - p) * NPVL_exit
    NPV_uten = p * NPVH + (1 - p) * NPVL_evig
    if NPV_uten >= 0 or NPV_exit <= 2000:
        raise Avvis("exit-retten må snu beslutningen")
    typ = r.choice(["npv", "verdi"])
    f_straks = p * NPVH + (1 - p) * (-I)
    f_ekstra = p * NPVH + (1 - p) * (-I + CL * A(rr, n + 1))
    f_godexit = p * (-I + CH * A(rr, n)) + (1 - p) * NPVL_exit
    if typ == "npv":
        riktig = NPV_exit
        alt = [R(_n(riktig), riktig),
               F(_n(f_straks), f"Exit at once in the bad state, so only the outlay is lost. You learn the state "
                 f"during year 1 and may leave only after {n} years, so you bear {n} years of losses first.", f_straks),
               F(_n(f_ekstra), f"The bad state run for {n + 1} years. You may leave after {n} years, so the losses "
                 f"run from year 1 to year {n}.", f_ekstra),
               F(_n(f_godexit), "Exit in the good state too. There the cash flow is positive forever, so you never "
                 "leave: the good state stays a perpetuity.", f_godexit)]
        spm = (f"What is the NPV of opening now, with the exit right? Answer in NOK, rounded to whole kroner.")
    else:
        riktig = NPV_exit
        f_neg = NPV_exit - NPV_uten
        alt = [R(_n(riktig), riktig),
               F(_n(f_neg), "Compared with the NPV of opening without the right. You would never open at that loss, "
                 "so it is not the alternative. Kurbatov singled this mistake out in the wrap-up.", f_neg),
               F(_n(f_straks), f"The right valued as if you could leave at once. You may leave only after {n} years, "
                 f"so the bad state still loses {n} years of cash flow.", f_straks),
               F(_n(f_ekstra), f"The bad state run for {n + 1} years. The losses stop after year {n}.", f_ekstra)]
        spm = ("Without the programme the business would never be opened. How much is the exit programme worth to "
               "you today? Answer in NOK, rounded to whole kroner.")
    ulike(*[a.verdi for a in alt], rel=0.02)
    q = (f"<p>You consider opening {sted}. It costs NOK {_n(I)} to open. Running it costs NOK {_n(c)} a year. It "
         f"will bring in NOK {_n(RH)} or NOK {_n(RL)} a year with equal probability, from the end of year 1. You "
         f"learn which during year 1, after opening. Demand is unrelated to the market: discount at the risk-free "
         f"rate of {_p(rr, 0)}. Without help you would have to run the business forever. A new programme lets you "
         f"close at the end of year {n} and get nothing from year {n + 1} on.</p><p>{spm}</p>")
    af = A(rr, n)
    kort = (f"<p><b>NOK {_n(riktig)}.</b> Good: {_n(CH)}/{_r(rr)} − {_n(I)} = {_n(NPVH)}. Bad, closing after year "
            f"{n}: −{_n(I)} − {_n(-CL)} × {_f(af)} = {_n(NPVL_exit)}. NPV = 0.5 × {_n(NPVH)} + 0.5 × ({_n(NPVL_exit)}) "
            f"= {_n(NPV_exit)}"
            + (f", compared with 0.</p>" if typ == "verdi" else ".</p>"))
    full = (f"<p><b>What the exit right does.</b> Without it, the bad state is a loss forever and the business is not "
            f"worth opening: the NPV is {_n(NPV_uten)}. The right turns the bad state's perpetuity of losses into "
            f"an annuity of {n} years. The good state is untouched, because nobody leaves a business that makes "
            f"money.</p>"
            f"<p><b>Step 1: the good state.</b> Net {_n(CH)} a year forever: {_n(CH)}/{_r(rr)} − {_n(I)} = "
            f"{_n(NPVH)}.</p>"
            f"<p><b>Step 2: the bad state.</b> Net {_n(CL)} a year for {n} years. The annuity factor is [1 − "
            f"{_vekst(rr)}<sup>−{n}</sup>]/{_r(rr)} = {_f(af)}, so −{_n(I)} − {_n(-CL)} × {_f(af)} = "
            f"{_n(NPVL_exit)}.</p>"
            f"<p><b>Step 3: the NPV.</b> 0.5 × {_n(NPVH)} + 0.5 × ({_n(NPVL_exit)}) = {_n(NPV_exit)}: open.</p>"
            + (f"<p><b>Step 4: the value of the right.</b> Without it you would stay out, worth 0. With it you open "
               f"and get {_n(NPV_exit)}. The right is worth <b>NOK {_n(riktig)}</b>, compared with 0.</p>"
               if typ == "verdi" else "")
            + f"<p><b>First check.</b> The right removes the bad state's losses from year {n + 1} on: "
            f"0.5 × {_n(-CL)}/{_r(rr)}/{_vekst(rr)}<sup>{n}</sup> = {_n(NPV_exit - NPV_uten)}. Then {_n(NPV_uten)} + "
            f"{_n(NPV_exit - NPV_uten)} = {_n(NPV_exit)} ✓ That {_n(NPV_exit - NPV_uten)} is how much the clause "
            f"lifts a business you were going to open anyway, not what it is worth to you here.</p>"
            f"<p><b>Remember:</b> an exit option cuts the bad tail and is compared with 0, the value of not "
            f"opening, never with the negative NPV.</p>")
    return sporsmal(q, alt, kort, full, tall=tallsvar(enhet="NOK"))


# ---------------------------------------------------------------------------
# reo-mnd1 · Butikken med månedsrente og exit (lecture 11, B13, D3)
# ---------------------------------------------------------------------------
@familie("reo-mnd1", tema="realopsjon", antall=5, tittel="Monthly cash flows, a monthly rate and an exit clause",
         hjelp=hjelp3(
             "This is an abandonment option with monthly cash flows. The annual rate must first be turned into a "
             "monthly one; then the bad state becomes an annuity that stops at the exit date.",
             "Monthly rate m = (1 + r)<sup>1/12</sup> − 1. Monthly perpetuity: C/m. Monthly annuity for n months: "
             "C × [1 − (1 + m)<sup>−n</sup>]/m. The option is compared with 0.",
             "<p><b>Step 1: the monthly rate,</b> from the effective annual rate.</p>"
             "<p><b>Step 2: the good state.</b> A monthly perpetuity minus the setup cost.</p>"
             "<p><b>Step 3: the bad state.</b> Losses each month until the lease can be left, then 0.</p>"
             "<p><b>Step 4: average the states.</b></p>"
             "<p><b>Watch out:</b> the monthly rate is not the annual rate divided by 12.</p>",
         ))
def _(r):
    sted = r.choice(BUTIKK)
    I = r.choice([300_000, 400_000, 450_000, 500_000, 600_000])
    rr = r.choice([0.06, 0.07, 0.08])
    c = r.choice([8_000, 10_000, 12_000, 15_000])
    RH = c + r.choice([4_000, 5_000, 6_000])
    RL = c - r.choice([2_000, 3_000, 4_000])
    nmnd = r.choice([24, 24, 12, 36])
    m = rund((1 + rr) ** (1 / 12) - 1, 6)                 # fire desimaler i prosent, som oppgaven sier
    CH, CL = RH - c, RL - c
    NPVH = CH / m - I
    NPVL = CL * A(m, nmnd) - I
    NPV = 0.5 * NPVH + 0.5 * NPVL
    NPV_uten = 0.5 * (CH + CL) / m - I
    if NPV_uten >= 0 or NPV < 3000:
        raise Avvis("exit-klausulen må snu beslutningen")
    m12 = rr / 12
    typ = r.choice(["npv", "verdi"])
    f_m12 = 0.5 * (CH / m12 - I) + 0.5 * (CL * A(m12, nmnd) - I)
    f_straks = 0.5 * NPVH + 0.5 * (-I)
    f_god = 0.5 * (CH * A(m, nmnd) - I) + 0.5 * NPVL
    if typ == "npv":
        riktig = NPV
        alt = [R(_n(riktig), riktig),
               F(_n(f_m12), f"The monthly rate taken as {_p(rr, 0)}/12. Rates compound within the year, so this "
                 "monthly rate is too high.", f_m12),
               F(_n(f_straks), f"The bad state ended at once, losing only the setup cost. The lease can be left only "
                 f"after {nmnd} months, so the monthly losses run until then.", f_straks),
               F(_n(f_god), f"The good state also cut off after {nmnd} months. A shop that makes money every month "
                 "stays open forever.", f_god)]
        spm = "What is the NPV of opening the shop? Answer in NOK, rounded to whole kroner."
    else:
        riktig = NPV
        f_neg = NPV - NPV_uten
        alt = [R(_n(riktig), riktig),
               F(_n(f_neg), "Compared with the NPV of opening on a lease that runs forever. You would not open on "
                 "those terms, so that NPV is not the alternative.", f_neg),
               F(_n(f_m12), f"The monthly rate taken as {_p(rr, 0)}/12. Rates compound within the year, so this "
                 "monthly rate is too high.", f_m12),
               F(_n(f_straks), f"The right valued as if you could leave at once. You are bound for {nmnd} months.",
                 f_straks)]
        spm = ("On a standard lease that runs forever you would not open the shop. How much is the right to leave "
               "the lease worth to you today? Answer in NOK, rounded to whole kroner.")
    ulike(*[a.verdi for a in alt], rel=0.02)
    q = (f"<p>You can open {sted}. Setting it up costs NOK {_n(I)} today. Rent, staff and other running costs are NOK "
         f"{_n(c)} a month. Revenue will be NOK {_n(RH)} or NOK {_n(RL)} a month forever with equal probability. "
         f"You learn which right after opening. Cash flows arrive at the end of each month. The risk is not "
         f"systematic: discount at the risk-free rate of {_p(rr, 0)} a year (effective annual rate). Use the "
         f"monthly rate in percent rounded to four decimals. The lease lets you leave at no cost after {nmnd} "
         f"months, after which you get nothing.</p><p>{spm}</p>")
    af = A(m, nmnd)
    kort = (f"<p><b>NOK {_n(riktig)}.</b> m = {_vekst(rr)}<sup>1/12</sup> − 1 = {_p(m, 4)}. Good: {_n(CH)}/{tall(m, 6)} − "
            f"{_n(I)} = {_n(NPVH)}. Bad: −{_n(-CL)} × {_f(af)} − {_n(I)} = {_n(NPVL)}. NPV = 0.5 × {_n(NPVH)} + 0.5 × "
            f"({_n(NPVL)}) = {_n(NPV)}.</p>")
    full = (f"<p><b>The setting.</b> This is Kurbatov's shop from lecture 11. Without the exit clause the expected "
            f"monthly cash flow is {_n(0.5 * (CH + CL))}. The shop would be a loss: {_n(0.5 * (CH + CL))}/"
            f"{tall(m, 6)} − {_n(I)} = {_n(NPV_uten)}. The clause caps the bad state's losses at {nmnd} months. "
            f"That is a put on the business. It is compared with not opening, worth 0.</p>"
            f"<p><b>Step 1: the monthly rate.</b> m = {_vekst(rr)}<sup>1/12</sup> − 1 = {_p(m, 4)}, not "
            f"{_p(rr, 0)}/12.</p>"
            f"<p><b>Step 2: the good state.</b> {_n(RH)} − {_n(c)} = {_n(CH)} a month forever: {_n(CH)}/{tall(m, 6)} − "
            f"{_n(I)} = {_n(NPVH)}.</p>"
            f"<p><b>Step 3: the bad state.</b> {_n(RL)} − {_n(c)} = {_n(CL)} a month for {nmnd} months. The annuity "
            f"factor is [1 − (1 + m)<sup>−{nmnd}</sup>]/m = {_f(af)}, so {_n(CL)} × {_f(af)} − {_n(I)} = "
            f"{_n(NPVL)}.</p>"
            f"<p><b>Step 4: the NPV.</b> 0.5 × {_n(NPVH)} + 0.5 × ({_n(NPVL)}) = <b>{_n(NPV)}</b>: open."
            + (f" The right is worth {_n(NPV)} − 0 = <b>{_n(riktig)}</b>, since without it you would stay out."
               if typ == "verdi" else "")
            + f"</p>"
            f"<p><b>First check.</b> The clause removes the bad state's losses after month {nmnd}: 0.5 × "
            f"{_n(-CL)}/{tall(m, 6)}/(1 + m)<sup>{nmnd}</sup> = {_n(NPV - NPV_uten)}. Then {_n(NPV_uten)} + "
            f"{_n(NPV - NPV_uten)} = {_n(NPV)} ✓ A second route through the same numbers.</p>"
            f"<p><b>Remember:</b> monthly rate (1 + r)<sup>1/12</sup> − 1. Cut the bad state at the exit date and "
            f"compare with 0.</p>")
    return sporsmal(q, alt, kort, full, tall=tallsvar(enhet="NOK"))


# ---------------------------------------------------------------------------
# reo-trn1 · Trinnvis finansiering (lecture 11, B13)
# ---------------------------------------------------------------------------
@familie("reo-trn1", tema="realopsjon", antall=6, tittel="Staged financing: pay for one stage at a time",
         hjelp=hjelp3(
             "This is staged financing. Paying for one stage at a time gives you the right to stop after a "
             "failure, so the later stages are paid only when the earlier ones succeed.",
             "Staged NPV = −c<sub>1</sub> + p<sub>1</sub> × max(0, −c<sub>2</sub> + p<sub>2</sub> × V), with the "
             "discounting the question asks for. Committing in one go: −c<sub>1</sub> − c<sub>2</sub> + "
             "p<sub>1</sub>p<sub>2</sub> × V.",
             "<p><b>Step 1: the last decision first.</b> After stage 1 succeeds, is stage 2 worth paying for?</p>"
             "<p><b>Step 2: roll back.</b> Stage 1 is paid for sure. Stage 2 is paid only if stage 1 "
             "succeeds.</p>"
             "<p><b>Step 3: discount</b> if the question gives dates and a rate.</p>"
             "<p><b>Watch out:</b> the second-stage cost is paid before the second outcome is known.</p>",
         ))
def _(r):
    disk = r.random() < 0.5
    navn = r.choice(FIRMA)
    V = r.choice([300, 400, 500, 600, 800])
    p1 = r.choice([0.2, 0.3, 0.4, 0.5])
    p2 = r.choice([0.3, 0.4, 0.5, 0.6])
    c1 = r.choice([5, 8, 10, 12, 15])
    c2 = r.choice([30, 40, 50, 60, 80, 90])
    if -c2 + p2 * V <= 0:
        raise Avvis("andre trinn må lønne seg")
    rr = r.choice([0.05, 0.06, 0.08]) if disk else 0.0
    if disk:
        verdi2 = -c2 + p2 * V / (1 + rr)                   # på dato 1
        riktig = -c1 + p1 * max(0, verdi2) / (1 + rr)
        f_bind = -c1 - c2 / (1 + rr) + p1 * p2 * V / (1 + rr) ** 2
        f_vekt = -c1 - p1 * p2 * c2 / (1 + rr) + p1 * p2 * V / (1 + rr) ** 2
        f3 = -c1 + p1 * (-c2 + p2 * V)
        n3 = (f"Not discounted. Stage 2 is paid at date 1 and the venture pays at date 2, so both must come back "
              f"to today at {_p(rr, 0)}.")
    else:
        verdi2 = -c2 + p2 * V
        riktig = -c1 + p1 * verdi2
        f_bind = -c1 - c2 + p1 * p2 * V
        f_vekt = -c1 - p1 * p2 * c2 + p1 * p2 * V
        f3 = -p1 * c1 + p1 * verdi2
        n3 = ("The first stage weighted by its success probability. It is paid up front, before anyone knows "
              "whether it works.")
    if abs(riktig) < 1:
        raise Avvis("for nær null")
    ulike(riktig, f_bind, f_vekt, f3, rel=0.02)
    if disk:
        tidslinje = (f"Stage 1 costs NOK {c1} million today and succeeds with probability {tall(p1, 1)}; the result is known "
                     f"at date 1. Stage 2 costs NOK {c2} million at date 1 and succeeds with probability {tall(p2, 1)}; "
                     f"the result is known at date 2. If both succeed, the venture is worth NOK {V} million at date 2; "
                     f"otherwise nothing. The risks are not related to the market: discount at the risk-free rate of "
                     f"{_p(rr, 0)}.")
    else:
        tidslinje = (f"Stage 1 costs NOK {c1} million and succeeds with probability {tall(p1, 1)}. Stage 2 then costs NOK "
                     f"{c2} million and succeeds with probability {tall(p2, 1)}. If both succeed, the venture is worth "
                     f"NOK {V} million; otherwise nothing. Ignore discounting.")
    q = (f"<p>{navn} is developing a new product in two stages. {tidslinje} The firm pays for one stage at a time "
         f"and may stop after stage 1.</p>"
         f"<p>What is the NPV of developing the product with staged financing? Answer in NOK million with two "
         f"decimals.</p>")
    alt = [R(_m(riktig), riktig),
           F(_m(f_bind), "Both stages paid whatever happens, as if the firm committed in one go. Paying stage by "
             "stage means stage 2 is paid only after stage 1 has worked.", f_bind),
           F(_m(f_vekt), f"The second-stage cost weighted by the overall success probability {tall(p1 * p2, 2)}. It is "
             "paid before the stage-2 result is known, so it is weighted by the stage-1 probability alone.", f_vekt),
           F(_m(f3), n3, f3)]
    if disk:
        kort = (f"<p><b>{_m(riktig)}.</b> At date 1 after success: −{c2} + {tall(p2, 1)} × {V}/{_vekst(rr)} = "
                f"{_m(verdi2)}. Today: −{c1} + {tall(p1, 1)} × {_m(verdi2)}/{_vekst(rr)} = {_m(riktig)}.</p>")
        steg = (f"<p><b>Step 1: the decision at date 1.</b> After stage 1 has worked, stage 2 is worth −{c2} + "
                f"{tall(p2, 1)} × {V}/{_vekst(rr)} = {_m(verdi2)} &gt; 0, so you go on. After a failure you stop: "
                f"0.</p>"
                f"<p><b>Step 2: roll back.</b> −{c1} + {tall(p1, 1)} × {_m(verdi2)}/{_vekst(rr)} = <b>{_m(riktig)}</b>.</p>")
    else:
        kort = (f"<p><b>{_m(riktig)}.</b> After stage 1 works: −{c2} + {tall(p2, 1)} × {V} = {_m(verdi2)}. Staged: "
                f"−{c1} + {tall(p1, 1)} × {_m(verdi2)} = {_m(riktig)}.</p>")
        steg = (f"<p><b>Step 1: the decision after stage 1.</b> If it works, stage 2 is worth −{c2} + {tall(p2, 1)} × "
                f"{V} = {_m(verdi2)} &gt; 0, so you go on. If it fails, you stop: 0.</p>"
                f"<p><b>Step 2: roll back.</b> −{c1} + {tall(p1, 1)} × {_m(verdi2)} = <b>{_m(riktig)}</b>.</p>")
    full = (f"<p><b>Why stages are worth more.</b> Committing in one go means paying for both stages whatever "
            f"happens. Paying stage by stage gives a right to stop: when stage 1 fails, stage 2 is never paid. Same "
            f"costs, same overall chance of success, but the cost of stage 2 is saved in the states where it would "
            f"have been wasted. The more stage 1 reveals, the more the right to stop is worth.</p>"
            + steg
            + f"<p><b>First check.</b> Committing in one go gives {_m(f_bind)}. The difference, {_m(riktig - f_bind)}, "
            f"is stage 2's cost saved when stage 1 fails: {tall(1 - p1, 1)} × {c2}"
            + (f"/{_vekst(rr)} = {_m((1 - p1) * c2 / (1 + rr))}" if disk else f" = {_m((1 - p1) * c2)}")
            + f" ✓ A real check: it reaches the same gap from the other side.</p>"
            f"<p><b>Remember:</b> roll back from the last decision, take max(0, ·) there and pay each stage only "
            f"when you reach it.</p>")
    return sporsmal(q, alt, kort, full, tall=tallsvar(enhet="NOK million", abs=0.005))


# ---------------------------------------------------------------------------
# reo-lik1 · Likegyldighet: sannsynlighet, kostnad eller spredning
# ---------------------------------------------------------------------------
def _lineaer(f0, f1):
    """Nullpunktet til en rett linje gjennom (0, f0) og (1, f1)."""
    return f0 / (f0 - f1)


@familie("reo-lik1", tema="realopsjon", antall=6, tittel="The indifference point",
         hjelp=hjelp3(
             "This is an indifference point: the value of one input at which two strategies are worth the same. "
             "Write each strategy's value as a function of that input and set them equal.",
             "Build now: E[C]/r − I. Wait one year: p × max(0, C<sub>good</sub>/r − I)/(1 + r). With an exit after n "
             "years the bad state is −I + C<sub>bad</sub> × [1 − (1 + r)<sup>−n</sup>]/r. Solve the equation, then "
             "check that the answer lies where your branch decisions hold.",
             "<p><b>Step 1: each strategy as a function of the unknown.</b> Decide in each state what you would do "
             "and keep that decision fixed.</p>"
             "<p><b>Step 2: set them equal and solve.</b> The equation is linear.</p>"
             "<p><b>Step 3: check the interval.</b> The answer must agree with the decisions you assumed.</p>"
             "<p><b>Watch out:</b> indifference is between the two strategies, not where one of them breaks "
             "even.</p>",
         ))
def _(r):
    typ = r.choice(["p", "I", "X"])
    if typ in ("p", "I"):
        navn = r.choice(FIRMA)
        rr = r.choice([0.05, 0.06, 0.08, 0.10])
        I = r.choice([400, 500, 800, 1000])
        CH = rund(I * rr * r.choice([1.4, 1.5, 1.6, 1.8]), 0)
        CL = rund(I * rr * r.choice([0.3, 0.4, 0.5]), 0)
        NPVH, NPVL = CH / rr - I, CL / rr - I
        if typ == "p":
            riktig = _lineaer(NPVL, NPVH * rr / (1 + rr))
            f0 = -NPVL / (NPVH - NPVL)
            f2 = _lineaer(NPVL, NPVH - NPVH / (1 + rr) ** 2)
            vent_k = lambda p: p * (CH / rr / (1 + rr) - I)     # noqa: E731
            naa = lambda p: p * CH / rr + (1 - p) * CL / rr - I  # noqa: E731
            f3 = _lineaer(naa(0) - vent_k(0), naa(1) - vent_k(1))
            if not 0.15 < riktig < 0.88 or not 0 < f3 < 1:
                raise Avvis("p utenfor (0, 1)")
            fmt = _f
            alt = [R(fmt(riktig), riktig),
                   F(fmt(f0), "The probability at which building now breaks even, NPV<sub>now</sub> = 0. Waiting is "
                     "the alternative. It is worth more than 0, so you need a higher p before building now "
                     "beats it.", f0),
                   F(fmt(f2), "The waiting strategy discounted twice. The good state's NPV is measured at date 1, "
                     "when you build, so it needs one year of discounting, not two.", f2),
                   F(fmt(f3), f"The cost paid at date 1 left undiscounted in the waiting strategy. If you wait, the "
                     f"{_n(I)} is paid a year later too.", f3)]
            tall_sv = tallsvar()
            spm = ("For which probability p of the good state are you indifferent between building now and waiting? "
                   "Answer as a probability with four decimals.")
            oppsett = (f"The plant pays NOK {_n(CH)} million a year forever if demand is good (probability p) or NOK "
                       f"{_n(CL)} million a year forever if it is poor")
            kort = (f"<p><b>{_f(riktig)}.</b> Now: p × {_n(CH)}/{_r(rr)} + (1 − p) × {_n(CL)}/{_r(rr)} − {_n(I)} = "
                    f"{_m(NPVL)} + p × {_m(NPVH - NPVL)}. Wait: p × {_m(NPVH)}/{_vekst(rr)} = p × "
                    f"{_m(NPVH / (1 + rr))}. Equal at p = {_m(-NPVL)}/{_m(NPVH - NPVL - NPVH / (1 + rr))} = "
                    f"{_f(riktig)}.</p>")
            steg = (f"<p><b>Step 1: build now.</b> p × {_n(CH)}/{_r(rr)} + (1 − p) × {_n(CL)}/{_r(rr)} − {_n(I)} = "
                    f"{_m(NPVL)} + {_m(NPVH - NPVL)}p.</p>"
                    f"<p><b>Step 2: wait.</b> You build only if demand is good: p × ({_n(CH)}/{_r(rr)} − {_n(I)})/"
                    f"{_vekst(rr)} = {_m(NPVH / (1 + rr))}p.</p>"
                    f"<p><b>Step 3: solve.</b> {_m(NPVL)} + {_m(NPVH - NPVL)}p = {_m(NPVH / (1 + rr))}p gives p = "
                    f"{_m(-NPVL)}/{_m(NPVH - NPVL - NPVH / (1 + rr))} = <b>{_f(riktig)}</b>. Above it build now, below "
                    f"it wait.</p>"
                    f"<p><b>First check.</b> At p = {_f(riktig)} both strategies are worth "
                    f"{_m(NPVL + (NPVH - NPVL) * riktig)} = {_m(riktig * NPVH / (1 + rr))} ✓ The bad state has a "
                    f"negative NPV of {_m(NPVL)} at any p, so the branch decision assumed when waiting holds.</p>")
        else:
            p = r.choice([0.4, 0.5, 0.6])
            EC = p * CH + (1 - p) * CL
            riktig = (EC / rr - p * CH / (rr * (1 + rr))) / (1 - p / (1 + rr))
            lo, hi = CL / rr, CH / rr
            if not lo < riktig < hi:
                raise Avvis("I* utenfor intervallet")
            f0 = EC / rr
            v2 = (1 + rr) ** 2
            f2 = (EC / rr - p * CH / (rr * v2)) / (1 - p / v2)
            f3 = (EC / rr - p * CH / (rr * (1 + rr))) / (1 - p)
            fmt = _m
            alt = [R(fmt(riktig), riktig),
                   F(fmt(f0), "The cost at which building now breaks even, E[C]/r. Waiting is the alternative. "
                     "At this cost waiting is worth more than 0, so you would wait.", f0),
                   F(fmt(f2), "The waiting strategy discounted twice. You build at date 1, so the good state's NPV "
                     "needs one year of discounting.", f2),
                   F(fmt(f3), "The cost left undiscounted in the waiting strategy. If you wait, the cost is paid a "
                     "year later and is discounted with the cash flows.", f3)]
            tall_sv = tallsvar(enhet="NOK million")
            spm = ("At which investment cost I* are you indifferent between building now and waiting? Answer in "
                   "NOK million with two decimals.")
            oppsett = (f"The plant pays NOK {_n(CH)} million a year forever with probability {tall(p, 1)} or NOK "
                       f"{_n(CL)} million a year forever otherwise")
            kort = (f"<p><b>{_m(riktig)}.</b> Now: {_m(EC)}/{_r(rr)} − I. Wait (only the good state is built when "
                    f"{_m(lo)} &lt; I &lt; {_m(hi)}): {tall(p, 1)} × ({_n(CH)}/{_r(rr)} − I)/{_vekst(rr)}. Equal at "
                    f"I* = {_m(riktig)}, inside the interval.</p>")
            steg = (f"<p><b>Step 1: build now.</b> E[C] = {_m(EC)}, so {_m(EC / rr)} − I.</p>"
                    f"<p><b>Step 2: wait.</b> For {_m(lo)} &lt; I &lt; {_m(hi)} you build only in the good state: "
                    f"{tall(p, 1)} × ({_m(hi)} − I)/{_vekst(rr)}.</p>"
                    f"<p><b>Step 3: solve.</b> {_vekst(rr)} × ({_m(EC / rr)} − I) = {tall(p, 1)} × ({_m(hi)} − I), so "
                    f"I × ({_vekst(rr)} − {tall(p, 1)}) = {_m((1 + rr) * EC / rr)} − {_m(p * hi)} and I* = "
                    f"<b>{_m(riktig)}</b>. Below it build now, above it wait.</p>"
                    f"<p><b>First check.</b> I* lies in ({_m(lo)}, {_m(hi)}) ✓ and both strategies are worth "
                    f"{_m(EC / rr - riktig)} = {_m(p * (hi - riktig) / (1 + rr))} there ✓</p>")
        q = (f"<p>{navn} can build a plant for NOK {_n(I) if typ == 'p' else 'I million'}{' million' if typ == 'p' else ''}, "
             f"today or in exactly one year at the same cost. {oppsett}, the first payment one year after it is "
             f"built. Demand is revealed in one year whether or not the plant is built. It is unrelated to the "
             f"market: discount at the risk-free rate of {_p(rr, 0)}.</p><p>{spm}</p>")
    else:
        sted = r.choice(BUTIKK)
        rr = r.choice([0.06, 0.07, 0.08])
        I = r.choice([120_000, 160_000, 200_000, 250_000])
        c = r.choice([60_000, 80_000, 90_000, 100_000])
        c0 = r.choice([5_000, 8_000, 10_000])
        R0 = c + c0
        n = r.choice([2, 3])
        af = A(rr, n)
        riktig = (I - 0.5 * c0 / rr - 0.5 * c0 * af) / (0.5 / rr - 0.5 * af)
        if riktig <= c0 * 1.05:
            raise Avvis("X må være så stor at du går ut i den dårlige tilstanden")
        a1, a2 = A(rr, n - 1), A(rr, n + 1)
        f1 = (I - 0.5 * c0 / rr - 0.5 * c0 * a1) / (0.5 / rr - 0.5 * a1)
        f2 = (I - 0.5 * c0 / rr - 0.5 * c0 * a2) / (0.5 / rr - 0.5 * a2)
        f3 = float(c0)
        fmt = lambda x: tall(x, 2)  # noqa: E731
        alt = [R(fmt(riktig), riktig),
               F(fmt(f1), f"The bad state run for {n - 1} year{'s' if n - 1 != 1 else ''}. You may close at the end of year {n}, so the losses "
                 f"run from year 1 to year {n}.", f1),
               F(fmt(f2), f"The bad state run for {n + 1} years. The losses stop after year {n}.", f2),
               F(fmt(f3), f"X where the bad state's cash flow is zero, {_n(R0)} − X − {_n(c)} = 0. That is where "
                 "exiting starts to matter, not where you are indifferent about opening.", f3)]
        tall_sv = tallsvar(enhet="NOK")
        q = (f"<p>You consider opening {sted}. It costs NOK {_n(I)} to open and NOK {_n(c)} a year to run. Revenue will "
             f"be NOK {_n(R0)} − X or NOK {_n(R0)} + X a year with equal probability, forever, from the end of year 1. "
             f"You learn which during year 1, after opening. Demand is unrelated to the market: discount at the "
             f"risk-free rate of {_p(rr, 0)}. You may close at the end of year {n} and get nothing from year {n + 1} "
             f"on.</p>"
             f"<p>For which X are you indifferent about opening? Assume X is large enough that you would close in "
             f"the bad state. Check it. Answer in NOK with two decimals.</p>")
        kort = (f"<p><b>{fmt(riktig)}.</b> 0 = −{_n(I)} + 0.5 × ({_n(c0)} + X)/{_r(rr)} + 0.5 × ({_n(c0)} − X) × "
                f"{tall(af, 6)}, so X = {fmt(riktig)} &gt; {_n(c0)} ✓</p>")
        num = I - 0.5 * c0 / rr - 0.5 * c0 * af
        den = 0.5 / rr - 0.5 * af
        steg = (f"<p><b>Step 1: the state NPVs.</b> Net cash flow {_n(c0)} + X or {_n(c0)} − X. Good: −{_n(I)} + "
                f"({_n(c0)} + X)/{_r(rr)}. Bad, closing after year {n}: −{_n(I)} + ({_n(c0)} − X) × {tall(af, 6)}, "
                f"with {tall(af, 6)} = [1 − {_vekst(rr)}<sup>−{n}</sup>]/{_r(rr)}.</p>"
                f"<p><b>Step 2: expected NPV = 0.</b> −{_n(I)} + 0.5 × ({_n(c0)} + X) × {tall(1 / rr, 6)} + 0.5 × "
                f"({_n(c0)} − X) × {tall(af, 6)} = 0, so X × {tall(den, 6)} = {fmt(num)}.</p>"
                f"<p><b>Step 3: solve.</b> X = {fmt(num)}/{tall(den, 6)} = <b>{fmt(riktig)}</b>.</p>"
                f"<p><b>First check.</b> X = {fmt(riktig)} &gt; {_n(c0)}, so the bad state's cash flow, "
                f"{fmt(c0 - riktig)}, is negative and closing is right: the assumption holds ✓ Plugging in: good "
                f"{fmt(-I + (c0 + riktig) / rr)}, bad {fmt(-I + (c0 - riktig) * af)}, average 0.00 ✓</p>")
    ulike(*[a.verdi for a in alt], rel=0.02)
    full = (f"<p><b>What an indifference point is.</b> Two strategies are worth the same at one value of the "
            f"unknown. On one side of it one strategy wins, on the other side the other. You find it by writing "
            f"both values as functions of the unknown, holding the decisions in each state fixed. Then set them "
            f"equal and check that the answer is consistent with those decisions (H2025 Exercise 5).</p>"
            + steg
            + f"<p><b>Remember:</b> set the two strategies equal, not one of them to zero. Check the interval.</p>")
    return sporsmal(q, alt, kort, full, tall=tall_sv)


# ---------------------------------------------------------------------------
# reo-rho1 · ρ fra et omsatt verdipapir på rentetreet (H2024 E6 c)
# ---------------------------------------------------------------------------
def _rentetre(r):
    C = r.choice([1.5, 2.0, 2.5, 3.0])
    n = r.choice([8, 9, 10, 11, 12, 15])
    r0 = r.choice([0.04, 0.045, 0.05, 0.06])
    d = r.choice([0.015, 0.02, 0.025, 0.03])
    return C, n, r0, r0 - d, r0 + d


_BRUKT_OBLIGASJON = set()                                  # samme rentetre gir samme obligasjon: ikke to ganger


@familie("reo-rho1", tema="realopsjon", antall=6, tittel="ρ from a traded security when the rate is uncertain",
         hjelp=hjelp3(
             "This is risk-neutral valuation when the uncertainty is next year's interest rate. You need ρ from a "
             "traded security whose price today and whose two values in one year refer to the same cash flows.",
             "ρ = [(1 + r<sub>0</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>), with r<sub>0</sub> the "
             "rate from date 0 to date 1. S<sub>u</sub> and S<sub>d</sub> are values at date 1 including any payment "
             "made at date 1. Annuity factor A(r, n) = [1 − (1 + r)<sup>−n</sup>]/r.",
             "<p><b>Step 1: pick the stream.</b> Today's price and the two date-1 values must price exactly the same "
             "cash flows.</p>"
             "<p><b>Step 2: value it today</b> at today's flat rate.</p>"
             "<p><b>Step 3: value it at date 1</b> in each rate state, with the payment made at date 1 included.</p>"
             "<p><b>Step 4: ρ.</b> Grow today's price one year at the current rate.</p>"
             "<p><b>Watch out:</b> the low-rate state is the good one for a stream of fixed payments.</p>",
         ))
def _(r):
    typ = r.choice(["prosjekt", "obligasjon"])
    navn = r.choice(FIRMA)
    C, n, r0, rlo, rhi = _rentetre(r)
    Su_p, Sd_p = C * A(rlo, n), C * A(rhi, n)
    S0_p = C * A(r0, n) / (1 + r0)
    rho = ((1 + r0) * S0_p - Sd_p) / (Su_p - Sd_p)
    if typ == "prosjekt":
        S0_mis = C * A(r0, n)
        f1 = ((1 + r0) * S0_mis - Sd_p) / (Su_p - Sd_p)
        n1 = (f"S<sub>0</sub> = {_m(C)} × A({_p(r0, 1)}, {n}) = {_f(S0_mis)}, the project started today, which pays in "
              f"years 1 to {n}. S<sub>u</sub> and S<sub>d</sub> value the project started at date 1, paying in years 2 "
              f"to {n + 1}. Mixing two streams gives a wrong ρ that still lies between 0 and 1.")
        f2 = (S0_p - Sd_p) / (Su_p - Sd_p)
        f3 = 1 - rho
        n3 = (f"This is the weight on the state where the rate rises to {_p(rhi, 1)}. Fixed payments are worth more "
              "when the rate is low, so the low-rate state is the up state.")
        S0, Su, Sd = S0_p, Su_p, Sd_p
        tekst = (f"<p>To value the licence with risk-neutral probabilities, use as the underlying the project started at "
                 f"date 1, which pays NOK {_m(C)} million a year in years 2 to {n + 1}.</p>")
        kort = (f"<p><b>{_f(rho)}.</b> S<sub>0</sub> = {_m(C)} × A({_p(r0, 1)}, {n})/{_vekst(r0)} = {_f(S0)}. "
                f"S<sub>u</sub> = {_m(C)} × A({_p(rlo, 1)}, {n}) = {_f(Su)}, S<sub>d</sub> = {_m(C)} × A({_p(rhi, 1)}, {n}) "
                f"= {_f(Sd)}. ρ = ({_vekst(r0)} × {_f(S0)} − {_f(Sd)})/({_f(Su)} − {_f(Sd)}) = {_f(rho)}.</p>")
    else:
        if (n, r0, rlo) in _BRUKT_OBLIGASJON:
            raise Avvis("samme obligasjon som en tidligere variant")
        S0 = A(r0, n + 1)
        Su, Sd = 1 + A(rlo, n), 1 + A(rhi, n)
        f1 = ((1 + r0) * S0 - (Sd - 1)) / (Su - Sd)
        n1 = ("The payment of 1 at date 1 left out of S<sub>u</sub> and S<sub>d</sub>. The holder receives it at date "
              "1, so it belongs in the date-1 value, just as a dividend does for a share.")
        f2 = (S0 - Sd) / (Su - Sd)
        S0_n = A(r0, n)
        f3 = ((1 + r0) * S0_n - Sd) / (Su - Sd)
        n3 = (f"S<sub>0</sub> priced with {n} payments instead of {n + 1}. Today's price must cover every payment "
              "the date-1 values come from, the one at date 1 included.")
        tekst = (f"<p>A government bond pays NOK 1 million a year for {n + 1} years, the first payment in one year. Use it "
                 f"as the underlying.</p>")
        kort = (f"<p><b>{_f(rho)}.</b> S<sub>0</sub> = A({_p(r0, 1)}, {n + 1}) = {_f(S0)}. S<sub>u</sub> = 1 + "
                f"A({_p(rlo, 1)}, {n}) = {_f(Su)}, S<sub>d</sub> = 1 + A({_p(rhi, 1)}, {n}) = {_f(Sd)}. ρ = "
                f"({_vekst(r0)} × {_f(S0)} − {_f(Sd)})/({_f(Su)} − {_f(Sd)}) = {_f(rho)}.</p>")
    n2 = ("Today's price not grown one year: (S<sub>0</sub> − S<sub>d</sub>)/(S<sub>u</sub> − S<sub>d</sub>). Under ρ "
          f"the underlying must earn the rate from date 0 to date 1, {_p(r0, 1)}.")
    if not 0.05 < rho < 0.95:
        raise Avvis("ρ utenfor (0, 1)")
    if not all(0.02 < x < 0.98 for x in (f1, f2, f3)):
        raise Avvis("en felle gir en sannsynlighet utenfor (0, 1)")
    alt = [R(_f(rho), rho), F(_f(f1), n1, f1), F(_f(f2), n2, f2), F(_f(f3), n3, f3)]
    ulike(rho, f1, f2, f3, rel=0.02)
    if typ == "obligasjon":
        _BRUKT_OBLIGASJON.add((n, r0, rlo))
    q = (f"<p>{navn} holds a licence to build a project that pays NOK {_m(C)} million a year for {n} years, starting one "
         f"year after it is built. Today every maturity is discounted at {_p(r0, 1)}. In one year the rate becomes "
         f"either {_p(rlo, 1)} or {_p(rhi, 1)} for every maturity and stays there; the rate from date 0 to date 1 is "
         f"{_p(r0, 1)}. Nobody knows the probabilities of the two rates.</p>{tekst}"
         f"<p>What is the risk-neutral probability of the state where the rate falls to {_p(rlo, 1)}? Answer with "
         f"four decimals.</p>")
    full = (f"<p><b>What ρ needs.</b> ρ makes a traded asset earn the risk-free rate from date 0 to date 1. To find it "
            f"you need one asset with a price today and its two possible values at date 1. All three must refer "
            f"to the same cash flows. A lower rate makes fixed payments worth more, so the low-rate state is the up "
            f"state (H2024 Exercise 6).</p>"
            f"<p><b>Step 1: today.</b> S<sub>0</sub> = {_f(S0)}.</p>"
            f"<p><b>Step 2: date 1.</b> At {_p(rlo, 1)}: S<sub>u</sub> = {_f(Su)}. At {_p(rhi, 1)}: S<sub>d</sub> = "
            f"{_f(Sd)}.</p>"
            f"<p><b>Step 3: ρ.</b> ({_vekst(r0)} × {_f(S0)} − {_f(Sd)})/({_f(Su)} − {_f(Sd)}) = "
            f"{_f((1 + r0) * S0 - Sd)}/{_f(Su - Sd)} = <b>{_f(rho)}</b>.</p>"
            f"<p><b>First check.</b> The other underlying gives the same ρ: "
            + (f"a bond paying 1 a year for {n + 1} years has S<sub>0</sub> = {_f(A(r0, n + 1))}, S<sub>u</sub> = "
               f"{_f(1 + A(rlo, n))}, S<sub>d</sub> = {_f(1 + A(rhi, n))} and ρ = "
               f"{_f(((1 + r0) * A(r0, n + 1) - 1 - A(rhi, n)) / (A(rlo, n) - A(rhi, n)))} ✓"
               if typ == "prosjekt" else
               f"the project started at date 1 has S<sub>0</sub> = {_f(S0_p)}, S<sub>u</sub> = {_f(Su_p)}, S<sub>d</sub> "
               f"= {_f(Sd_p)} and ρ = {_f(((1 + r0) * S0_p - Sd_p) / (Su_p - Sd_p))} ✓")
            + f" A sure payment at date 1 and a scale factor do not change ρ. This is a real check: it catches a "
            f"mismatched S<sub>0</sub>.</p>"
            f"<p><b>Remember:</b> S<sub>0</sub>, S<sub>u</sub> and S<sub>d</sub> price the same cash flows. "
            f"S<sub>u</sub> and S<sub>d</sub> include what is paid at date 1.</p>")
    return sporsmal(q, alt, kort, full, tall=tallsvar())


# ---------------------------------------------------------------------------
# reo-opt1 · Verdien av retten til å vente priset med ρ (H2024 E6 d)
# ---------------------------------------------------------------------------
@familie("reo-opt1", tema="realopsjon", antall=6, tittel="The value of the right to wait, priced with ρ",
         hjelp=hjelp3(
             "This is the option to wait valued with risk-neutral probabilities. The licence lets you invest at "
             "date 1 only in the rate state where the project pays. You need its value today.",
             "ρ = [(1 + r<sub>0</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>) from the project started "
             "at date 1. Value = [ρ × max(S<sub>u</sub> − I, 0) + (1 − ρ) × max(S<sub>d</sub> − I, 0)]/(1 + r<sub>0</sub>). "
             "The cost I is the strike.",
             "<p><b>Step 1: the project at date 1</b> in each rate state, as an annuity.</p>"
             "<p><b>Step 2: ρ</b> from the same stream valued today at today's rate.</p>"
             "<p><b>Step 3: the payoffs.</b> Invest only where the project is worth more than its cost.</p>"
             "<p><b>Step 4: weight with ρ and discount one year</b> at the current rate.</p>"
             "<p><b>Watch out:</b> you are not forced to invest in the bad state.</p>",
         ))
def _(r):
    navn = r.choice(FIRMA)
    C, n, r0, rlo, rhi = _rentetre(r)
    Su, Sd = C * A(rlo, n), C * A(rhi, n)
    S0 = C * A(r0, n) / (1 + r0)
    rho = ((1 + r0) * S0 - Sd) / (Su - Sd)
    I = rund(Sd + (Su - Sd) * r.choice([0.3, 0.45, 0.6]), 1)
    if not Sd < I < Su:
        raise Avvis("kostnaden må ligge mellom tilstandene")
    rho_r = rund(rho, 4)
    Cu = Su - I
    verdi = rho * Cu / (1 + r0)
    vis = rho_r * Cu / (1 + r0)
    S0_mis = C * A(r0, n)
    rho_mis = ((1 + r0) * S0_mis - Sd) / (Su - Sd)
    f1 = rho_mis * Cu / (1 + r0)
    f2 = 0.5 * Cu / (1 + r0)
    f3 = (rho * Cu + (1 - rho) * (Sd - I)) / (1 + r0)
    NPVnow = C * A(r0, n) - I
    if verdi < 0.02:
        raise Avvis("for liten opsjon")
    ulike(verdi, f1, f2, f3, rel=0.02)
    alt = [R(_f(vis), vis),
           F(_f(f1), f"S<sub>0</sub> taken as the value of the project started today, which pays in years 1 to {n}. "
             f"The underlying pays in years 2 to {n + 1}, so today's price and the date-1 values belong to "
             "different streams.", f1),
           F(_f(f2), "The two states weighted 0.5 each. Nobody gave you probabilities. Real ones would not go "
             "with the risk-free rate anyway. The weights come from prices: ρ.", f2),
           F(_f(f3), "The max dropped in the high-rate state, where the project is worth less than its cost. You "
             "hold a right, not a duty.", f3)]
    q = (f"<p>{navn} holds a licence to build a project for NOK {_m(I)} million, paid when it builds. The project pays "
         f"NOK {_m(C)} million a year for {n} years, starting one year after it is built. Today every maturity is "
         f"discounted at {_p(r0, 1)}. The firm can build now or wait one year. In one year the rate becomes "
         f"{_p(rlo, 1)} or {_p(rhi, 1)} for every maturity and stays there; the rate from date 0 to date 1 is "
         f"{_p(r0, 1)}. Nobody knows the probabilities of the two rates. Use risk-neutral probabilities, with the "
         f"project started at date 1 as the underlying: it would pay NOK {_m(C)} million a year in years 2 to "
         f"{n + 1}.</p>"
         f"<p>What is the value today of waiting one year and then deciding? Answer in NOK million with four "
         f"decimals.</p>")
    kort = (f"<p><b>{_f(vis)}.</b> At date 1: {_f(Su)} or {_f(Sd)}. ρ = ({_vekst(r0)} × {_f(S0)} − {_f(Sd)})/({_f(Su)} − "
            f"{_f(Sd)}) = {_f(rho_r)}. Invest only at {_p(rlo, 1)}: {_f(rho_r)} × ({_f(Su)} − {_m(I)})/{_vekst(r0)} = "
            f"{_f(vis)}.</p>")
    dlt = Cu / (Su - Sd)
    B = -dlt * Sd / (1 + r0)
    beslutning = ("wait" if vis > max(0, NPVnow) else "invest now")
    full = (f"<p><b>The licence is a call.</b> Waiting gives you the right, not the duty, to build at date 1 for "
            f"{_m(I)} once you know the rate. The underlying is the project started at date 1, the strike is its "
            f"cost. With no probabilities given, price it like an option: ρ from the underlying, discounted at the "
            f"rate from date 0 to date 1 (H2024 Exercise 6).</p>"
            f"<p><b>Step 1: the project at date 1.</b> At {_p(rlo, 1)}: {_m(C)} × A({_p(rlo, 1)}, {n}) = {_f(Su)}. At "
            f"{_p(rhi, 1)}: {_m(C)} × A({_p(rhi, 1)}, {n}) = {_f(Sd)}.</p>"
            f"<p><b>Step 2: ρ.</b> The same stream today: {_m(C)} × A({_p(r0, 1)}, {n})/{_vekst(r0)} = {_f(S0)}. ρ = "
            f"({_vekst(r0)} × {_f(S0)} − {_f(Sd)})/({_f(Su)} − {_f(Sd)}) = {_f(rho_r)}.</p>"
            f"<p><b>Step 3: the payoffs.</b> At {_p(rlo, 1)}: {_f(Su)} − {_m(I)} = {_f(Cu)}. At {_p(rhi, 1)}: "
            f"{_f(Sd)} &lt; {_m(I)}, so you do not build: 0.</p>"
            f"<p><b>Step 4: the value.</b> {_f(rho_r)} × {_f(Cu)}/{_vekst(r0)} = <b>{_f(vis)}</b>.</p>"
            f"<p><b>First check: replication.</b> Δ = {_f(Cu)}/({_f(Su)} − {_f(Sd)}) = {_f(dlt)} units of the underlying "
            f"and B = −{_f(dlt)} × {_f(Sd)}/{_vekst(r0)} = {_f(B)}: {_f(dlt)} × {_f(S0)} {'−'} {_f(-B)} = "
            f"{_f(dlt * S0 + B)}{' (the same up to the rounding of ρ)' if _f(dlt * S0 + B) != _f(vis) else ''} ✓ It uses "
            f"the same ρ implicitly, so it catches arithmetic slips only.</p>"
            f"<p><b>Decision.</b> Building now gives {_m(C)} × A({_p(r0, 1)}, {n}) − {_m(I)} = {_f(NPVnow)}. The right "
            f"to wait is worth {_f(vis)}, so {beslutning}.</p>"
            f"<p><b>Remember:</b> the cost is the strike. Take max(0, ·) in each state, weight with ρ from the same "
            f"stream and discount one year.</p>")
    return sporsmal(q, alt, kort, full, tall=tallsvar(verdi=verdi, enhet="NOK million"))


# ===========================================================================
# Statiske spørsmål: mekanismene bak realopsjonene (B13, D12, A3, H2024 E6,
# H2025 E5, PS3 E8–E9, lecture 11).
# ===========================================================================
_H_VENT = hjelp3(
    "This is about what makes the option to wait or to learn valuable: the chance to skip the bad outcome, set "
    "against what the delay costs.",
    "Option to wait = Σ p<sub>i</sub> max(0, NPV<sub>i</sub>)/(1 + r) − max(0, NPV<sub>now</sub>). The max cuts off "
    "the bad states; the discounting and any cash flow lost while waiting are the cost.",
    "<p><b>Step 1: the good states.</b> What happens to their NPV when you invest a year later?</p>"
    "<p><b>Step 2: the bad states.</b> If you wait, you do not invest there. What does that do to their "
    "contribution?</p>"
    "<p><b>Step 3: the cost of waiting.</b> List everything you give up during the year, then compare it with the "
    "gain from Step 2.</p>",
)

statisk(
    "reo-s01", tema="realopsjon", type="tolkning",
    hjelp=hjelp3(
        "This is about how to value an exit option when the project is not worth starting without it.",
        "Value of an option = value with the option − value of the best alternative without it. The alternative to "
        "a negative-NPV project is not to start it, worth 0.",
        "<p><b>Step 1: without the option.</b> What would you do? What is that decision worth?</p>"
        "<p><b>Step 2: with the option.</b> What would you do now? What is that decision worth?</p>"
        "<p><b>Step 3: the difference.</b> Compare the two decisions you would actually take, not the NPV with the "
        "option against a number you would never accept.</p>",
    ),
    q="<p>Without an exit clause, opening a shop has an NPV of −17 000, so you would not open it. With a clause that "
      "lets you close after two years, the NPV of opening is +45 000. A colleague says the clause is worth 62 000 to "
      "you.</p>"
      "<p>What is the clause worth to you?</p>",
    alternativer=[
        F("62 000, the difference between the two NPVs",
          "That compares with −17 000, the value of opening without the clause. You would never open on "
          "those terms."),
        F("17 000, because the clause only has to remove the loss",
          "Removing the loss would only bring you to 0. The clause does more than that: with it, opening has a "
          "positive NPV."),
        R("45 000, compared with not opening at all"),
        F("107 000, the colleague's figure plus the NPV with the clause",
          "That counts the gain twice. The clause turns a decision worth 0 into the NPV of opening with the "
          "clause, nothing more."),
    ],
    kort="<p><b>45 000.</b> Without the clause you stay out, worth 0. With it you open, worth 45 000. 62 000 is how "
         "much the clause lifts a shop you were going to open anyway.</p>",
    full="<p><b>The rule.</b> An option's value is what you gain from having it, measured against the best you "
         "could do without it. The best alternative to a project with a negative NPV is not to start it, which is "
         "worth 0, not the negative NPV.</p>"
         "<p><b>Step 1: without the clause.</b> Opening is worth −17 000, so you stay out: 0.</p>"
         "<p><b>Step 2: with the clause.</b> Opening is worth +45 000, so you open.</p>"
         "<p><b>Step 3: the value.</b> 45 000 − 0 = 45 000.</p>"
         "<p><b>What the 62 000 is.</b> It is the value of the bad-state losses the clause removes, which is how "
         "much the clause would add to a shop you had already committed to open. That is a different question. "
         "Kurbatov singled out this mistake in the 2026 wrap-up. Part d of H2025 Exercise 5 turns on it.</p>"
         "<p><b>Remember:</b> compare with 0 when you would not invest without the option. An option is never worth "
         "less than 0.</p>",
)

statisk(
    "reo-s02", tema="realopsjon", type="begrep", hjelp=_H_VENT,
    q="<p>A project has a positive NPV if you invest today. You could instead wait a year, learn which of two "
      "permanent demand states holds and invest only if it pays.</p>"
      "<p>When is it right to wait even though the NPV today is positive?</p>",
    alternativer=[
        F("Never: a positive NPV means the project creates value, so you should take it now",
          "The NPV rule compares investing now with never investing. Waiting is a third choice. It can be "
          "worth more than investing now."),
        R("When the bad-state loss avoided outweighs the cost of delay"),
        F("When the NPV today is small compared with the cost of the investment",
          "The size of today's NPV alone does not decide it. What matters is the loss avoided against the cost "
          "of the delay."),
        F("When the future is uncertain, since waiting reveals information",
          "Information alone is not enough. It must change a decision. It also comes at a cost."),
    ],
    kort="<p><b>When avoiding the bad state is worth more than the delay costs.</b> Waiting replaces the bad state's "
         "negative NPV by 0 but pushes the good state a year out.</p>",
    full="<p><b>Two forces.</b> Investing today commits you to the average, bad state included. Waiting a year lets "
         "you invest only in the good state, so the bad state's loss disappears. The price is that the good state's "
         "cash flows arrive a year later. Anything lost during the year is gone.</p>"
         "<p><b>Step 1: the gain.</b> The probability of the bad state times its loss, which waiting avoids.</p>"
         "<p><b>Step 2: the cost.</b> The good state's NPV loses a year of discounting, plus any cash flow or "
         "market share given up while you wait.</p>"
         "<p><b>Step 3: the rule.</b> Option to wait = Σ p<sub>i</sub> max(0, NPV<sub>i</sub>)/(1 + r) − max(0, "
         "NPV<sub>now</sub>). Wait if it is positive, even when NPV<sub>now</sub> is positive. In kj9's wind farm "
         "the NPV now is 100 and waiting is worth 227.27, so you wait.</p>"
         "<p><b>Remember:</b> a positive NPV says the project beats never investing. It does not say it beats "
         "waiting.</p>",
)

statisk(
    "reo-s03", tema="realopsjon", type="tolkning", hjelp=_H_VENT,
    q="<p>You value a study that will tell you whether demand is high or low before you invest. You then learn that "
      "the high-demand cash flow is much higher and the low-demand cash flow much lower than you thought, with the "
      "expected cash flow unchanged.</p>"
      "<p>What happens to the NPV of investing without the study and to the value of the study?</p>",
    alternativer=[
        F("Both are unchanged, since the expected cash flow is the same",
          "The NPV of investing blind is unchanged. Ask what the wider spread does in the state where you "
          "would invest."),
        F("The NPV falls and the study is worth less, since the project is riskier",
          "With the expected cash flow unchanged, the NPV of investing blind does not move. Think of the "
          "study as an option."),
        R("The NPV is unchanged and the study is worth more"),
        F("The NPV rises and the study is worth the same",
          "The NPV depends only on the expected cash flow, which is unchanged."),
    ],
    kort="<p><b>NPV unchanged, study worth more.</b> The study lets you skip the low state, so a lower low state "
         "costs nothing and a higher high state adds value. Like a call, it gains from spread.</p>",
    full="<p><b>Information is an option.</b> The study gives you the right to invest only when it pays. That right "
         "has the same shape as a call: you keep the upside and walk away from the downside.</p>"
         "<p><b>Step 1: investing without the study.</b> You take both states, so only the expected cash flow "
         "matters. It is unchanged, so the NPV is unchanged.</p>"
         "<p><b>Step 2: with the study.</b> You invest only in the high state, whose cash flow is now higher. The "
         "low state was already a 0 for you, so making it worse changes nothing.</p>"
         "<p><b>Step 3: the value of the study</b> = informed value − uninformed value rises. This is PS3 "
         "Exercise 8, part c: you still buy the study, it is only worth more.</p>"
         "<p><b>Remember:</b> more spread with the same mean raises the value of every real option, the option to "
         "wait and the value of information included.</p>",
)

statisk(
    "reo-s04", tema="realopsjon", type="begrep", hjelp=_H_VENT,
    q="<p>A firm holds an exclusive right to build a plant now or in one year. Which change makes waiting less "
      "attractive compared with building now?</p>",
    alternativer=[
        F("The uncertainty about demand grows, with the same expected demand",
          "More spread makes waiting more valuable: you skip a worse bad state and keep a better good one."),
        F("A new rule bars rivals from entering the market for the next two years",
          "That removes a cost of waiting: you can now wait without losing market share, so waiting becomes more "
          "attractive, not less."),
        R("A rival may enter during the year if you have not built"),
        F("The risk-free rate falls while the cash flows stay the same",
          "A lower rate makes the year of delay cheaper, so waiting becomes more attractive, not less."),
    ],
    kort="<p><b>A rival who may enter.</b> Waiting then costs part of the market, not just a year of discounting. "
         "Lost cash flow while you wait works like a dividend you give up.</p>",
    full="<p><b>The cost of waiting.</b> Waiting is valuable because you avoid the bad state. It costs a year of "
         "delay on the good state, plus anything you lose during the year. The bigger that loss, the less "
         "attractive waiting is.</p>"
         "<p><b>Step 1: a rival.</b> If a competitor may enter while you wait, you risk a smaller market in every "
         "state. That raises the cost of waiting and can make building now the better choice.</p>"
         "<p><b>Step 2: the other changes.</b> More uncertainty raises the value of waiting. A lower rate makes "
         "the delay cheaper. A rule that keeps rivals out removes the threat of losing market share, so waiting "
         "costs less.</p>"
         "<p><b>Step 3: the parallel.</b> Cash flows lost while you hold the option work like dividends on a share: "
         "they are why an American call on a dividend-paying share may be exercised early (lecture 11).</p>"
         "<p><b>Remember:</b> anything you lose by waiting is the price of the option to wait.</p>",
)

statisk(
    "reo-s05", tema="realopsjon", type="begrep", hjelp=_H_VENT,
    q="<p>A firm can invest now or wait a year until a lawsuit is decided. It then learns that if it invests now, it "
      "can get the full investment back at the end of the year by selling the assets, giving up the later cash "
      "flows.</p>"
      "<p>How does this change the timing decision?</p>",
    alternativer=[
        R("Investing now gains: it is protected too and keeps the year-1 cash flow"),
        F("Waiting becomes more attractive, since the firm now has two options instead of one",
          "The resale right protects an early investment. Ask which of the two strategies it changes."),
        F("Nothing changes: the expected cash flows are the same as before",
          "The expected cash flows of investing now change: in the bad state you now get the investment back "
          "instead of a loss forever."),
        F("Investing now becomes less attractive, because the firm may be forced to sell at a loss",
          "The firm is not forced to sell. It may sell and will do so only when that beats continuing."),
    ],
    kort="<p><b>Invest now.</b> The value of waiting came from avoiding the bad state. The resale right gives the "
         "same protection to an early investment. Investing now also keeps the first year's cash flow.</p>",
    full="<p><b>Where the value of waiting came from.</b> Waiting is worth something because it lets you avoid the "
         "bad outcome. If you can invest now and still escape the bad outcome, waiting has lost its edge.</p>"
         "<p><b>Step 1: the resale right.</b> Investing now now comes with an exit: in the bad state you sell the "
         "assets at the end of the year and get the investment back.</p>"
         "<p><b>Step 2: compare.</b> Both strategies now avoid the bad state's losses. Investing now also earns the "
         "first year's cash flow, which waiting gives up.</p>"
         "<p><b>Step 3: the decision.</b> Invest now. This is PS3 Exercise 9, part d, where the NPV of investing now "
         "rises to 284.1 against 261.4 for waiting.</p>"
         "<p><b>Remember:</b> a reversible investment needs no waiting. Irreversibility is what makes the option "
         "to wait valuable.</p>",
)

statisk(
    "reo-s06", tema="realopsjon", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about which discount rate goes with real probabilities: when is the risk-free rate the right "
        "one.",
        "Real probabilities: discount at the cost of capital, which is r<sub>f</sub> only when the risk is not "
        "systematic (β = 0). Risk-neutral probabilities: always discount at r<sub>f</sub>.",
        "<p><b>Step 1: statement I.</b> Does the trial's outcome move with the market? If not, what premium does "
        "its risk carry?</p>"
        "<p><b>Step 2: statement II.</b> Does the mine's revenue move with the market? What rate must real "
        "probabilities go with then?</p>"
        "<p><b>Step 3: combine.</b> Decide each statement on its own before you pick an answer.</p>",
    ),
    q="<p>I. A biotech firm's trial outcome is unrelated to the market. Discounting its expected payoff under the real "
      "probability of success at the risk-free rate is correct.<br>"
      "II. A mine's revenue rises and falls with the economy. Discounting its expected revenue under the real "
      "probabilities at the risk-free rate is correct.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        R("Only I"),
        F("Only II", "II pairs real probabilities of a priced risk with r<sub>f</sub>, which overvalues the mine. "
          "Look at I again: what premium does a risk unrelated to the market carry?"),
        F("Both I and II", "II is wrong. Revenue that moves with the economy is systematic risk."),
        F("Neither I nor II", "Look at I again. When the risk is not systematic, what is the cost of capital?"),
    ],
    kort="<p><b>Only I.</b> Real probabilities go with the cost of capital. It equals r<sub>f</sub> when the risk is "
         "not systematic, as for the trial. It exceeds it when the risk is systematic, as for the mine.</p>",
    full="<p><b>The rule.</b> A discount rate must match the risk of what it discounts. With real probabilities the "
         "expected cash flow still carries its risk, so it is discounted at the cost of capital: r<sub>f</sub> plus "
         "a premium for systematic risk. If the risk is unrelated to the market, β = 0 and the cost of capital is "
         "r<sub>f</sub>.</p>"
         "<p><b>Step 1: the trial.</b> Its outcome is unrelated to the market, so there is no premium. Real "
         "probability with r<sub>f</sub> is right (statement I).</p>"
         "<p><b>Step 2: the mine.</b> Its revenue moves with the economy, so it carries a premium. Real "
         "probabilities with r<sub>f</sub> overvalue it (statement II is wrong). Either use the cost of capital, "
         "or switch to risk-neutral probabilities, which go with r<sub>f</sub>.</p>"
         "<p><b>Step 3: the course.</b> The rule «never pair a real probability with r<sub>f</sub>» is too strict: "
         "Kurbatov does it whenever the risk is not systematic (H2025 Exercise 5, PS3 Exercise 8).</p>"
         "<p><b>Remember:</b> the error is a real probability with r<sub>f</sub> when the risk is priced.</p>",
)

statisk(
    "reo-s07", tema="realopsjon", type="tolkning",
    hjelp=hjelp3(
        "This is about choosing the underlying for risk-neutral valuation of a real option: its price today and "
        "its two values in one year.",
        "ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>), with S<sub>0</sub> the "
        "price today of an asset whose possible values at date 1 are S<sub>u</sub> and S<sub>d</sub>.",
        "<p><b>Step 1: list the cash flows behind each number.</b> For S<sub>0</sub>, S<sub>u</sub> and S<sub>d</sub>, "
        "write down the years in which the stream pays.</p>"
        "<p><b>Step 2: compare the three lists.</b> What would the formula measure if they differed?</p>"
        "<p><b>Step 3: decide what to change.</b> Then value that stream today at the flat rate.</p>",
    ),
    q="<p>A licence lets you build a ferry for 12 that pays 1.5 a year for 10 years from one year after it is built. "
      "If you build at date 1, the ferry pays in years 2 to 11; its date-1 value is 12.7953 or 10.5354 depending on "
      "the rate. A student backs out ρ with S<sub>0</sub> = 11.5826, the value today of the ferry built now, paying "
      "in years 1 to 10.</p>"
      "<p>What is wrong?</p>",
    alternativer=[
        F("Nothing: 11.5826 is the value of the ferry today, which is what S<sub>0</sub> should be",
          "That is the value of the ferry built now. Check which years of payments each of the three "
          "numbers covers."),
        R("S<sub>0</sub> prices a different stream: it must be the ferry built at date 1, valued today"),
        F("S<sub>u</sub> and S<sub>d</sub> should be discounted to today before they are used",
          "They enter the formula as date-1 values; the formula grows S<sub>0</sub> to date 1 itself."),
        F("The investment cost of 12 should be subtracted from all three values first",
          "The cost is the strike, not part of the underlying. It enters the option's payoff at date 1, not the "
          "values ρ is backed out from."),
    ],
    kort="<p><b>A mismatched S<sub>0</sub>.</b> Use 11.5826/1.05 = 11.0310, the ferry built at date 1 valued today. "
         "That gives ρ = 0.4634, the key's answer; 11.5826 gives a wrong 0.7197.</p>",
    full="<p><b>What ρ needs.</b> ρ makes one traded asset earn the risk-free rate over the year. You need that "
         "asset's price today and its two possible values in one year. If today's price belongs to a different "
         "stream of cash flows, the «return» you compute mixes two assets and ρ is wrong.</p>"
         "<p><b>Step 1: the date-1 values.</b> 12.7953 and 10.5354 value the ferry built at date 1, paying in years 2 "
         "to 11.</p>"
         "<p><b>Step 2: today's price of that stream.</b> At the flat 5% it is the value of the ferry built now, "
         "discounted one more year: 11.5826/1.05 = 11.0310.</p>"
         "<p><b>Step 3: ρ.</b> (1.05 × 11.0310 − 10.5354)/(12.7953 − 10.5354) = 0.4634. With 11.5826 you get 0.7197, "
         "which still lies between 0 and 1, so only the rule catches it.</p>"
         "<p><b>Remember:</b> S<sub>0</sub>, S<sub>u</sub> and S<sub>d</sub> price the same cash flows. This is H2024 "
         "Exercise 6, part c.</p>",
)

statisk(
    "reo-s08", tema="realopsjon", type="begrep",
    hjelp=hjelp3(
        "This is about when information has value: what has to happen for a study to be worth paying for.",
        "Value of information = E[max(0, NPV<sub>i</sub>)] − max(0, E[NPV]): the best decision in each state "
        "against the best single decision taken without the study.",
        "<p><b>Step 1: without the study.</b> What do you do, given the expected NPV?</p>"
        "<p><b>Step 2: with the study.</b> For each state, what would you do once you know it?</p>"
        "<p><b>Step 3: compare the decisions state by state.</b> Where do they differ? What is that difference "
        "worth?</p>",
    ),
    q="<p>A project has a positive NPV in every possible demand state. A consultant offers a study, delivered today, "
      "that reveals which state will occur.</p>"
      "<p>What is the study worth?</p>",
    alternativer=[
        F("The spread between the best and the worst state's NPV",
          "The study would be worth that only if it changed what you do."),
        F("The expected NPV, since it confirms that the project is profitable",
          "Confirming what you would do anyway adds nothing to the value of the project."),
        F("The probability-weighted NPV of the worst state",
          "The worst state still has a positive NPV. Ask what you would do there with and without the "
          "study."),
        R("Nothing: you invest in every state, so no decision changes"),
    ],
    kort="<p><b>Nothing.</b> E[max(0, NPV<sub>i</sub>)] = E[NPV] when every NPV<sub>i</sub> is positive. "
         "Information has value only when it changes a decision.</p>",
    full="<p><b>Why information can be worthless.</b> A study does not change any cash flow. Its value comes "
         "entirely from letting you act differently in different states: invest where it pays, stay out where it "
         "does not. If the same action is best everywhere, there is nothing to act on.</p>"
         "<p><b>Step 1: without the study.</b> The expected NPV is positive, so you invest.</p>"
         "<p><b>Step 2: with the study.</b> Every state has a positive NPV, so you invest in each. Your decision is "
         "the same.</p>"
         "<p><b>Step 3: the value.</b> E[max(0, NPV<sub>i</sub>)] = E[NPV<sub>i</sub>] = max(0, E[NPV]), so the "
         "value of information is 0.</p>"
         "<p><b>Remember:</b> information is worth what it changes. It needs at least one state where you would "
         "act differently.</p>",
)

statisk(
    "reo-s09", tema="realopsjon", type="tolkning", hjelp=_H_VENT,
    q="<p>Without information you would not open a shop. A market study reveals the state of demand. Delivered today "
      "it is worth 134 286 to you. A version that takes a year (you pay now, learn the state in a year and then "
      "decide) is worth 125 501.</p>"
      "<p>Why is the delayed study worth less?</p>",
    alternativer=[
        F("Because the outlay is paid a year later, which is a cost",
          "Paying the outlay later is a benefit: it is worth less today. It partly offsets the real cost of the "
          "delay."),
        F("Because the information is less reliable when it arrives later",
          "The delayed study is just as accurate. It only arrives later."),
        F("Because the study's price must be paid a year earlier than its result",
          "Both versions are paid for today. The difference is in the project, not in the study's fee."),
        R("Because the good state then loses its first year's cash flow"),
    ],
    kort="<p><b>The lost year in the good state.</b> Opening a year later gives up the year-1 cash flow, partly offset "
         "by paying the outlay later. The key accepts the lost cash flow as the reason.</p>",
    full="<p><b>What the delay does.</b> With the immediate study you open at once in the good state. With the "
         "delayed one you open a year later, so the whole good-state project shifts by a year.</p>"
         "<p><b>Step 1: what you lose.</b> The first year's cash flow in the good state: in H2025 Exercise 5, 30 000 "
         "worth 30 000/1.07 = 28 037 today.</p>"
         "<p><b>Step 2: what you gain.</b> The outlay of 160 000 is paid a year later, saving 160 000 − 160 000/1.07 "
         "= 10 467.</p>"
         "<p><b>Step 3: the net.</b> 28 037 − 10 467 = 17 570 in the good state, times its probability of 0.5: "
         "8 785. And 134 286 − 8 785 = 125 501 ✓</p>"
         "<p><b>Remember:</b> information that arrives later is worth the informed value discounted a year, minus "
         "the best you can do without it. The key says the lost year-1 cash flow is enough as an explanation.</p>",
)

statisk(
    "reo-s10", tema="realopsjon", type="begrep",
    hjelp=hjelp3(
        "This is staged financing: funding a venture one milestone at a time with the right to stop after each "
        "stage.",
        "Staged NPV = −c<sub>1</sub> + p<sub>1</sub> × max(0, −c<sub>2</sub> + p<sub>2</sub>V). Committing at once = "
        "−c<sub>1</sub> − c<sub>2</sub> + p<sub>1</sub>p<sub>2</sub>V. The gain is the stage-2 cost saved when stage 1 "
        "fails.",
        "<p><b>Step 1: hold the total cost and the overall chance of success fixed.</b> Only the split between the "
        "stages changes.</p>"
        "<p><b>Step 2: make stage 1 more informative:</b> let it fail more often but at a low cost.</p>"
        "<p><b>Step 3: count the savings.</b> How often is the expensive second stage then avoided? What does that "
        "save?</p>",
    ),
    q="<p>A venture fund finances a start-up in two stages. The total cost and the overall probability of reaching "
      "the IPO are fixed.</p>"
      "<p>Which design of the stages makes staged financing most valuable?</p>",
    alternativer=[
        F("A first stage that almost always succeeds, so that the fund rarely has to stop",
          "If stage 1 almost always succeeds, you almost always pay for stage 2 anyway. The right to stop is then "
          "rarely used and worth little."),
        R("A cheap first stage that weeds out most failures before the expensive second stage"),
        F("Two stages of equal cost, so the risk is spread evenly",
          "Equal costs do not maximise the value. Ask how often the expensive spending is avoided."),
        F("It makes no difference, since the total cost and the overall probability are fixed",
          "The total cost is fixed, but with stages you pay the second part only when stage 1 succeeds. How often "
          "that happens depends on the design."),
    ],
    kort="<p><b>A cheap, informative first stage.</b> The more failures it reveals before the big spending, the more "
         "of the second-stage cost you save.</p>",
    full="<p><b>Staging as an option.</b> Paying in stages gives the right to stop. Its value is the second-stage "
         "cost you do not pay when stage 1 fails: (1 − p<sub>1</sub>) × c<sub>2</sub>.</p>"
         "<p><b>Step 1: Kurbatov's example.</b> 100 for a 10% chance of an IPO worth 800 is −20 committed at once. "
         "Split as 10 for development (50%) and 90 for marketing (20%), it is −10 + 0.5 × (−90 + 0.2 × 800) = "
         "25.</p>"
         "<p><b>Step 2: why.</b> Half the time the fund stops after spending 10, saving 90. The cheaper and more "
         "revealing the first stage, the more is saved.</p>"
         "<p><b>Step 3: the design.</b> A first stage that fails often and costs little, followed by an expensive "
         "stage that is paid only for survivors, maximises the value (lecture 11: «as the stages become more "
         "informative, the value of staged financing rises»).</p>"
         "<p><b>Remember:</b> staging is a sequence of options to stop. Put cheap tests first.</p>",
)

statisk(
    "reo-s11", tema="realopsjon", type="begrep",
    hjelp=hjelp3(
        "This is about mapping a real option onto a financial one: what plays the role of the share and what "
        "plays the role of the strike.",
        "A call pays max(S<sub>T</sub> − K, 0). For the option to invest: the value of the project's cash flows "
        "when you invest against the cost you pay to get them.",
        "<p><b>Step 1: what do you receive if you exercise?</b> Think of what the licence lets you own once you "
        "build.</p>"
        "<p><b>Step 2: what do you pay to exercise?</b> Think of what you must spend at that moment.</p>"
        "<p><b>Step 3: match them to S and K.</b> Then check that the payoff has the shape max(S − K, 0).</p>",
    ),
    q="<p>A licence gives a firm the right to build a plant at date 1 for a fixed cost. Seen as a call option, what "
      "are the underlying and the strike?</p>",
    alternativer=[
        F("The underlying is the plant's NPV; the strike is zero",
          "The NPV already has the cost subtracted. An option's payoff subtracts the strike itself."),
        F("The underlying is the cost of the plant; the strike is the value of its cash flows",
          "That is the wrong way round: the firm receives the cash flows and pays the cost."),
        R("The underlying is the value of the plant's cash flows; the strike is its cost"),
        F("The underlying is the firm's share price; the strike is the licence fee",
          "The licence fee is the option's price, paid to get the right. The option itself is on the project."),
    ],
    kort="<p><b>Cash flows as the underlying, cost as the strike.</b> The licence pays max(V − I, 0) at date 1.</p>",
    full="<p><b>The mapping.</b> A call gives the right to pay K for something worth S. The licence gives the right "
         "to pay the investment cost I for a plant whose cash flows are worth V when you build. So the payoff at "
         "date 1 is max(V − I, 0): V is the underlying, I the strike.</p>"
         "<p><b>Step 1: the underlying.</b> The value at date 1 of the cash flows you get by building, which is what "
         "is uncertain today. In H2024 Exercise 6 that is 12.7953 or 10.5354.</p>"
         "<p><b>Step 2: the strike.</b> The cost you pay when you build, 12 in that exercise. It is not part of "
         "the underlying, so ρ is backed out from the cash flows alone.</p>"
         "<p><b>Step 3: what follows.</b> Everything you know about calls carries over: the option gains from "
         "uncertainty in V, its value is never below 0 and it is exercised only when V &gt; I.</p>"
         "<p><b>Remember:</b> the investment cost is the strike. The value of the cash flows is the underlying.</p>",
)

statisk(
    "reo-s12", tema="realopsjon", type="tolkning",
    hjelp=hjelp3(
        "This is about an exit or salvage option in one branch of a project: when it adds value and when it does "
        "not.",
        "Value at the exit date = max(value of continuing, salvage value). The option adds max(salvage − value of "
        "continuing, 0).",
        "<p><b>Step 1: value continuing</b> in the weak branch as a perpetuity at the cost of capital.</p>"
        "<p><b>Step 2: compare it with selling.</b> Which do you choose? What do you get?</p>"
        "<p><b>Step 3: what does the right to sell add</b> over what you would get without it? An option is never "
        "worth less than 0.</p>",
    ),
    q="<p>In a project's weak branch the cash flow is 30 a year forever from next year, worth 300 at a 10% cost of "
      "capital. The assets could instead be sold now for 240.</p>"
      "<p>What does the right to sell add in this branch?</p>",
    alternativer=[
        F("60, the value given up by selling instead of continuing",
          "That is a cost you would bear only if you sold. Compare continuing with selling first."),
        F("240, the salvage value you can collect by selling the assets now",
          "You would collect 240 only by giving up 300. You would not do that."),
        R("Nothing: continuing beats selling, so the right goes unused"),
        F("−60, because selling destroys 60 of value",
          "An option is never worth less than 0: you are not forced to use it."),
    ],
    kort="<p><b>Nothing.</b> max(300, 240) = 300, which is what continuing gives without the right. An exit option "
         "has value only where continuing is worth less than the salvage.</p>",
    full="<p><b>An exit option is a put.</b> The right to sell the assets for a salvage value is a put on the "
         "project, struck at that value. A put is used only when the asset is worth less than the strike.</p>"
         "<p><b>Step 1: continuing.</b> 30/0.10 = 300.</p>"
         "<p><b>Step 2: selling.</b> 240.</p>"
         "<p><b>Step 3: the choice.</b> max(300, 240) = 300: you continue. Without the right you would also get "
         "300, so the right adds 0 here.</p>"
         "<p><b>Where it would matter.</b> If the weak branch were worth less than 240, say 150, the right would "
         "add 240 − 150 = 90. Giving up a positive tail by selling is a cost you avoid by not exercising, never an "
         "option value.</p>"
         "<p><b>Remember:</b> an exit option is worth max(salvage − continuing, 0). Never negative.</p>",
)

statisk(
    "reo-s13", tema="realopsjon", type="tolkning",
    hjelp=hjelp3(
        "This is about checking an indifference point: whether the value you solved for agrees with the decision "
        "your equation assumed in each state.",
        "Closing in the bad state is optimal only if its yearly cash flow is negative. A state kept open is worth "
        "−I + C/r. A state closed after n years is worth −I + C × [1 − (1 + r)<sup>−n</sup>]/r.",
        "<p><b>Step 1: the assumption.</b> For which X is closing in the bad state optimal? Does the solution lie "
        "there?</p>"
        "<p><b>Step 2: the other decision.</b> Write the expected NPV with the bad state kept open. How does it "
        "depend on X?</p>"
        "<p><b>Step 3: the sign.</b> Is that NPV positive or negative? What does that mean for the decision to "
        "open, for small X and for large X?</p>",
    ),
    q=(f"<p>A shop costs NOK {tall(114283, 0)} to open and NOK {tall(90000, 0)} a year to run. Revenue will be NOK "
       f"{tall(100000, 0)} − X or NOK {tall(100000, 0)} + X a year with equal probability, forever, from the end of "
       f"year 1. You learn which during year 1, after opening. Discount at 8%. You may close at the end of year 2 "
       f"and get nothing from year 3 on. You set up the indifference equation for X assuming that you close in the "
       f"bad state. It gives X = {tall(8000, 0)} (rounded).</p>"
       f"<p>What should you conclude?</p>"),
    alternativer=[
        F(f"X = {tall(8000, 0)} is the indifference point, since the equation was solved correctly",
          f"At X = {tall(8000, 0)} the bad state earns {tall(100000, 0)} − {tall(8000, 0)} − {tall(90000, 0)} = "
          f"+{tall(2000, 0)} a year, so you would not close it. The equation describes a decision you would not "
          f"take."),
        F("Re-solve with the bad state kept open: that equation gives the indifference point",
          "With both states kept open the X terms cancel: the expected cash flow is the same whatever X is. That "
          "equation has no X to solve for."),
        R("There is no indifference point: the NPV is positive for every X"),
        F(f"X = {tall(10000, 0)}, where the bad state breaks even, is the indifference point",
          "Break-even in the bad state is where closing starts to matter. It is not where the NPV of opening "
          "is 0."),
    ],
    kort=(f"<p><b>No indifference point.</b> At X = {tall(8000, 0)} the bad state earns +{tall(2000, 0)} a year, so "
          f"you would not close. Kept open, the NPV is −{tall(114283, 0)} + {tall(10000, 0)}/0.08 = {tall(10717, 0)} "
          f"for every X up to {tall(10000, 0)}. It is higher still above that. You always open.</p>"),
    full=(f"<p><b>Why the check matters.</b> An indifference equation fixes a decision in each state before you "
          f"solve it. The answer counts only if that decision is optimal at the answer.</p>"
          f"<p><b>Step 1: the assumption fails.</b> Closing is right only if the bad state's cash flow, "
          f"{tall(10000, 0)} − X, is negative: X &gt; {tall(10000, 0)}. At X = {tall(8000, 0)} the bad state earns "
          f"+{tall(2000, 0)} a year, so you would keep it open.</p>"
          f"<p><b>Step 2: the other branch.</b> With both states open the expected NPV is 0.5 × (−{tall(114283, 0)} "
          f"+ ({tall(10000, 0)} + X)/0.08) + 0.5 × (−{tall(114283, 0)} + ({tall(10000, 0)} − X)/0.08) = "
          f"−{tall(114283, 0)} + {tall(10000, 0)}/0.08 = {tall(10717, 0)}. X cancels, so this NPV is the same for "
          f"every X up to {tall(10000, 0)}. It is positive.</p>"
          f"<p><b>Step 3: above {tall(10000, 0)}.</b> With closing, the NPV rises with X: a wider spread adds to the "
          f"good state's perpetuity, while the bad state's losses are capped at two years. At X = {tall(10000, 0)} "
          f"it equals {tall(10717, 0)}, so it is positive for every larger X too. The equation's root of "
          f"{tall(8000, 0)} lies outside the region where closing is optimal.</p>"
          f"<p><b>Conclusion.</b> The NPV of opening is positive for every X. There is no indifference point: you "
          f"always open. In part e of H2025 Exercise 5 the answer, {tall(12747.76, 2)}, passes the same check "
          f"because it exceeds {tall(10000, 0)}.</p>"
          f"<p><b>Remember:</b> after solving, check that the answer lies where your branch decisions hold. If it "
          f"does not, rebuild the equation with the other decision. It may have no solution at all.</p>"),
)

statisk(
    "reo-s14", tema="realopsjon", type="begrep",
    hjelp=hjelp3(
        "This is about why risk-neutral valuation of a real option needs no real probabilities of the states.",
        "If a traded asset's price today and its values in each state are known, ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> "
        "− S<sub>d</sub>]/(S<sub>u</sub> − S<sub>d</sub>) prices any other claim on the same states, discounted at "
        "r<sub>f</sub>.",
        "<p><b>Step 1: what does the traded asset's price already contain?</b> Think of the market's beliefs and "
        "its attitude to risk.</p>"
        "<p><b>Step 2: can the option be copied</b> with that asset and a bond, state by state?</p>"
        "<p><b>Step 3: what does the copy cost?</b> Does that cost depend on probabilities?</p>",
    ),
    q="<p>In H2024 Exercise 6 nobody knows the probabilities that next year's interest rate will be 3% or 7%. Yet the "
      "option to wait can be valued.</p>"
      "<p>Why are the real probabilities not needed?</p>",
    alternativer=[
        F("Because interest-rate risk is not systematic, so 0.5 can be used for each state",
          "Nothing says the states are equally likely. Nothing requires it either. The weights come from prices, "
          "not from beliefs."),
        F("Because the option to wait has no risk, so it is discounted at the risk-free rate",
          "The option is risky: it pays only in one state. It is discounted at r<sub>f</sub> because it is weighted "
          "with ρ, not because it is safe."),
        R("Because a traded stream on the same states copies the option; its price holds the beliefs"),
        F("Because the risk-neutral probability equals the real probability when the rate is risk-free",
          "ρ is a pricing weight. It differs from the real probability whenever the states carry a risk premium. "
          "It never needs to equal it."),
    ],
    kort="<p><b>Replication.</b> A traded stream on the same two rate states gives ρ = 0.4634. The option is "
         "priced with that weight at r<sub>f</sub>; beliefs sit in the stream's price.</p>",
    full="<p><b>The logic of risk-neutral valuation.</b> If a traded asset pays different amounts in the two states, "
         "a portfolio of it and a bond can copy any claim on those states. The claim must cost what the copy costs. "
         "The copy's cost depends only on prices.</p>"
         "<p><b>Step 1: the traded asset.</b> In the exercise, a stream of fixed payments priced at today's flat rate, "
         "worth more if the rate falls to 3% and less if it rises to 7%.</p>"
         "<p><b>Step 2: ρ.</b> Its price today and its two date-1 values give ρ = 0.4634. That weight makes the "
         "stream earn the risk-free rate.</p>"
         "<p><b>Step 3: the option.</b> It pays 0.7953 if the rate is 3% and 0 if it is 7%. Its value today is "
         "0.4634 × 0.7953/1.05 = 0.3510. The market's beliefs and its attitude to risk are already inside the "
         "stream's price.</p>"
         "<p><b>Remember:</b> with a traded asset on the same states, prices replace probabilities. Weight with ρ and "
         "discount at r<sub>f</sub>.</p>",
)

statisk(
    "reo-s15", tema="realopsjon", type="formel",
    hjelp=hjelp3(
        "This is about turning an effective annual rate into a monthly rate for monthly cash flows.",
        "An effective annual rate r compounds: (1 + m)<sup>12</sup> = 1 + r for the monthly rate m. Solve for m.",
        "<p><b>Step 1: write the compounding condition.</b> Twelve monthly periods must give the same growth as one "
        "year at the annual rate.</p>"
        "<p><b>Step 2: take the twelfth root</b> of both sides.</p>"
        "<p><b>Step 3: subtract one</b> and give the answer in percent with four decimals.</p>",
    ),
    q="<p>A shop's cash flows arrive at the end of each month. The effective annual discount rate is 7%.</p>"
      "<p>What monthly discount rate should you use? Answer in percent with four decimals.</p>",
    alternativer=[
        R(pst(1.07 ** (1 / 12) - 1, 4), 1.07 ** (1 / 12) - 1),
        F(pst(0.07 / 12, 4), "7%/12 ignores compounding: twelve months at that rate grow to more than 7% over the "
          "year.", 0.07 / 12),
        F(pst((1 + 0.07 / 12) ** 12 - 1, 4), "This is the effective annual rate of a 7% nominal rate compounded "
          "monthly, (1 + 0.07/12)<sup>12</sup> − 1. The question goes the other way: from an annual rate to a monthly "
          "one.", (1 + 0.07 / 12) ** 12 - 1),
        F(pst(1.07 ** (-1 / 12), 4), "This is the monthly discount factor, 1.07<sup>−1/12</sup>, not a rate.",
          1.07 ** (-1 / 12)),
    ],
    kort=f"<p><b>{pst(1.07 ** (1 / 12) - 1, 4)}.</b> (1 + m)<sup>12</sup> = 1.07, so m = 1.07<sup>1/12</sup> − 1 = "
         f"{pst(1.07 ** (1 / 12) - 1, 4)}.</p>",
    full=f"<p><b>Why not 7%/12.</b> An effective annual rate already includes compounding. A monthly rate m must "
         f"grow 1 into 1.07 over twelve months: (1 + m)<sup>12</sup> = 1.07. Dividing 7% by 12 gives a rate that "
         f"compounds to more than 7%.</p>"
         f"<p><b>Step 1: the condition.</b> (1 + m)<sup>12</sup> = 1.07.</p>"
         f"<p><b>Step 2: solve.</b> m = 1.07<sup>1/12</sup> − 1 = <b>{pst(1.07 ** (1 / 12) - 1, 4)}</b>.</p>"
         f"<p><b>First check.</b> {tall(1 + (1.07 ** (1 / 12) - 1), 6)}<sup>12</sup> = 1.0700 ✓ Kurbatov uses "
         f"0.565% in lecture 11; keep four decimals, 0.5654%, so a monthly perpetuity does not drift.</p>"
         f"<p><b>Why it matters.</b> A monthly perpetuity C/m is sensitive to m. With 7%/12 = 0.5833% instead of "
         f"0.5654%, the value of NOK {tall(6000, 0)} a month forever falls from about {tall(1061000, 0)} to about {tall(1029000, 0)}, some 3% "
         f"less, which is enough to flip the sign of an NPV.</p>"
         f"<p><b>Remember:</b> monthly rate = (1 + r)<sup>1/12</sup> − 1. The same rule gives (1 + r)<sup>1.5</sup> for "
         f"18 months and the square root for half a year.</p>",
    tall=tallsvar(skala=100, enhet="%"),
)
