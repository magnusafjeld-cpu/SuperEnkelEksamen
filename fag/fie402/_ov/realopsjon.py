# -*- coding: utf-8 -*-
"""Øv uten stopp FIE402: realopsjoner (skribent 5).

   ov-reo1  vente med investering (produksjon fra dag én, β = 0, r_f), verdien av å vente,
            likegyldig sannsynlighet X og hva som øker verdien av å vente. Forelesning 11
            eksempel 1, H2024 E6 d, H2025 E5.
   ov-reo2  nedleggelse målt mot 0: exit etter n år, verdien av retten mot 0 og høyeste
            exitgebyr (H2025 E5 d, D12 og gebyrvrien fra oppsummeringen).
   ov-reo3  trinnvis finansiering: forpliktet til begge trinn mot trinnvis, mer informativt
            første trinn og sunk cost (forelesning 11, B13).
   ov-reo4  prosjekt priset med en omsatt tvilling: patent på et rentetre, ρ fra en omsatt
            annuitet og retten til å vente (forelesning 11 patent, H2024 E6).
   ov-reo5  exit-klausul med månedlige kontantstrømmer: (1 + r)^(1/12) − 1, annuitet,
            ikke forpliktet (mot 0) og forpliktet (mot den negative NPV-en). Forelesning 11 butikken.
   ov-reo6  vekstopsjon med reelle sannsynligheter: kapitalkostnaden når risikoen er priset,
            r_f når den ikke er det (A3).

   Konvensjoner (docs/fie402-trening-spek.md § 3b): reelle sannsynligheter diskonteres med
   kapitalkostnaden, som er r_f bare når risikoen ikke er priset. Nedleggelse sammenlignes
   med 0. Månedsrente (1 + r)^(1/12) − 1. Diskret diskontering, ingen Black-Scholes.
   S0, Su og Sd priser samme kontantstrøm, og Su/Sd tar med betalingen på dato 1.

   Mellomtall vises med to desimaler (beløp) eller fire (renter, sannsynligheter), og
   løsningen regner videre fra de viste tallene. _sjekk avviser varianten når den viste
   kjeden ligger lenger fra den eksakte verdien enn toleransen.
"""
from ov_lib import *  # noqa: F401,F403

NORSK = ["Brattvåg Industri AS", "Sjøholt Mineral AS", "Vestnes Havbruk AS", "Rindal Energi AS",
         "Hjelset Bryggeri AS", "Hustad Pellets AS", "Eidsvåg Maskin AS", "Lyngør Stein AS"]
ENGELSK = ["Ashby Materials Ltd", "Halden Works Ltd", "Corran Foods Ltd", "Thornbury Power Ltd",
           "Kestrel Bottling Ltd", "Marlow Quarries Ltd"]


# ---------------------------------------------------------------- små hjelpere
def _sjekk(vist, eksakt, rel=0.002, abs_=None):
    """Avvis varianten når kjeden regnet fra viste (avrundede) tall havner utenfor toleransen."""
    grense = max(rel * abs(eksakt), abs_ or 0.0)
    if abs(vist - eksakt) > grense:
        raise Avvis(f"avrundet kjede {vist} for langt fra eksakt {eksakt}")


def _ulik(svar, *feller, rel=0.004, abs_=None):
    """Avvis når en felle ligger for nær svaret (to ganger toleransen)."""
    for f in feller:
        if f is None:
            continue
        if abs(f - svar) <= max(rel * abs(svar), abs_ or 0.0):
            raise Avvis(f"felle {f} for nær svaret {svar}")


def _nær_bort(svar, f, rel=0.006, abs_=None):
    """En felle som tilfeldigvis ligger for nær svaret i denne varianten, droppes (None)."""
    if f is None:
        return None
    if abs(f - svar) <= max(rel * abs(svar), abs_ or 0.0):
        return None
    return f


def _rt(r):
    """Rente som prosenttekst: 0.07 → 7%, 0.065 → 6.5%."""
    p = r * 100
    if abs(p - round(p)) < 1e-9:
        return prosent_tekst(p, 0)
    if abs(p * 10 - round(p * 10)) < 1e-9:
        return prosent_tekst(p, 1)
    return prosent_tekst(p, 2)


def _des(r):
    """Renten som desimaltall med nok desimaler: 0.07 → 0.07, 0.065 → 0.065."""
    for d in (2, 3, 4):
        if abs(r * 10 ** d - round(r * 10 ** d)) < 1e-9:
            return tall(r, d)
    return tall(r, 6)


def _vf(r):
    """Vekstfaktoren 1 + r som tekst: 1.07, 1.065."""
    x = 1 + r
    for d in (2, 3, 4):
        if abs(x * 10 ** d - round(x * 10 ** d)) < 1e-9:
            return tall(x, d)
    return tall(x, 6)


def _n(x):
    """Et beløp fra casen: hele tall uten desimaler, ellers én eller to."""
    if abs(x - round(x)) < 1e-9:
        return tall(x, 0)
    if abs(x * 10 - round(x * 10)) < 1e-9:
        return tall(x, 1)
    return tall(x, 2)


def _m(x):
    """Mellomtall og svar i millioner: to desimaler."""
    return tall(x, 2)


def _f4(x):
    return tall(x, 4)


def _sann(p):
    """Sannsynlighet fra casen: 0.4, 0.25."""
    return tall(p, 1) if abs(p * 10 - round(p * 10)) < 1e-9 else tall(p, 2)


def _par(x, d=2):
    """Tall i parentes når det er negativt: 0.5 × (−12.30)."""
    s = tall(x, d)
    return f"({s})" if rund(x, d) < 0 else s


def _valuta(r):
    """Firmanavn og valuta: norske navn i NOK, engelske i $."""
    if r.random() < 0.65:
        return r.choice(NORSK), "NOK"
    return r.choice(ENGELSK), "$"


def _mill(x, val, d=None):
    """Beløp med valuta i millioner: «NOK 160 million», «$1.5 million»."""
    s = _n(x) if d is None else tall(x, d)
    if val == "$":
        return ("−" if rund(x, 2) < 0 else "") + "$" + s.lstrip("−") + " million"
    return ("−" if rund(x, 2) < 0 else "") + "NOK " + s.lstrip("−") + " million"


def A(r, n):
    return annuitetsfaktor(r, n)


def _T(navn, v, enh="", a=0.015, alt=None):
    """Et beløp som svar: 0,2 % relativt, men minst a i absolutt avvik (beløp nær 0). alt: andre verdier som
       også godtas (for eksempel kjeden regnet med eksakt i stedet for avrundet månedsrente)."""
    return T(navn, v, enh, rel=STD_REL, abs=a, alt=alt)


# ---------------------------------------------------------------------------
# ov-reo1 · Vente med å investere
# ---------------------------------------------------------------------------
ANLEGG1 = [
    ("a bottling line", "line"), ("a pellet press", "press"), ("an operating gravel quarry", "quarry"),
    ("a used trawler with its fishing licence", "trawler"), ("a salmon smokehouse", "smokehouse"),
    ("a running small hydropower plant", "plant"), ("a 3D-printing line", "line"),
]


@oppgave("ov-reo1", tema="realopsjon", tittel="Buy today or wait a year", antall=12,
         sjanger="d3-vente", kilde="Lecture 11 example 1, H2025 E5, H2024 E6 d")
def _(r):
    fi, val = _valuta(r)
    anlegg, kort_navn = r.choice(ANLEGG1)
    rr = r.choice([0.05, 0.06, 0.08, 0.10])
    p = r.choice([0.4, 0.5, 0.6])
    Cu = r.choice([24, 30, 36, 40, 45, 50, 60])
    Cd = r.choice([6, 8, 10, 12, 15, 20])
    if Cd >= Cu * 0.6:
        raise Avvis("for liten spredning")
    C0 = p * Cu + (1 - p) * Cd
    if abs(C0 * 10 - round(C0 * 10)) > 1e-9:
        raise Avvis("dagens kontantstrøm er ikke pen")
    C0 = round(C0, 1)
    K = (1 + rr) / rr
    E = p * Cu + (1 - p) * Cd

    def _ok(I):
        now, u1, d1 = C0 * K - I, Cu * K - I, Cd * K - I
        if not (now > 3 and u1 > 0 and d1 < -2) or C0 <= I * rr / (1 + rr) + 1:
            return False
        opt = p * u1 / (1 + rr) - now
        if opt < 0.06 * now or opt < 4:
            return False
        X = (-I + C0 + Cd / rr) / (u1 / (1 + rr) - (Cu - Cd) / rr)
        return p + 0.08 < X < 0.96
    mulige = [I for I in range(10, int(C0 * K) + 10, 10) if _ok(I)]
    if not mulige:
        raise Avvis("ingen investeringskostnad passer")
    I = r.choice(mulige)

    # (a) investere i dag
    now = -I + C0 + E / rr
    Er = rund(E / rr, 2)
    now_v = rund(-I + C0 + Er, 2)
    # (b) vente
    u1 = -I + Cu + Cu / rr
    d1 = -I + Cd + Cd / rr
    if not (now > 3 and u1 > 0 and d1 < -2):
        raise Avvis("feil fortegn")
    if C0 <= I * rr / (1 + rr) + 1:
        raise Avvis("å vente skal koste noe i den gode tilstanden")
    wait = p * u1 / (1 + rr)
    opt = wait - now
    if opt < 0.06 * now or opt < 4:
        raise Avvis("å vente må lønne seg tydelig")
    u1_v = rund(u1, 2)
    wait_v = rund(p * u1_v / (1 + rr), 2)
    opt_v = rund(wait_v - now_v, 2)
    _sjekk(wait_v, wait)
    _sjekk(opt_v, opt)
    d0 = -I + C0 + Cd / rr                       # kjøpe i dag, lav tilstand
    u0 = -I + C0 + Cu / rr                       # kjøpe i dag, høy tilstand
    unngaa = (1 - p) * (-d0)
    forsink = p * (u0 - u1 / (1 + rr))
    if unngaa <= forsink + 0.01:
        raise Avvis("modellsvaret sier at det unngåtte tapet er større enn kostnaden ved å vente")
    # (c) likegyldig X
    num = -I + C0 + Cd / rr
    den = u1 / (1 + rr) - (Cu - Cd) / rr
    X = num / den
    if not (p + 0.08 < X < 0.96):
        raise Avvis("X* utenfor et godt intervall")
    a_v = rund(-I + C0 + Cd / rr, 2)             # konstantleddet, vist
    s_v = rund((Cu - Cd) / rr, 2)                 # stigningen i dag, vist
    w_v = rund(u1_v / (1 + rr), 4)                # stigningen ved å vente, vist
    X_v = rund(a_v / (w_v - s_v), 4)
    _sjekk(X_v, X)

    # feller
    fa_null = -I + E / rr                          # glemt år null
    fa_to = -I + C0 + (E / rr) / (1 + rr)          # diskontert evigrenten én gang for mye
    fa_due = -I + C0 + E * (1 + rr) / rr           # telt C0 to ganger (forskuddsrente)
    _ulik(now, fa_null, fa_to, fa_due, abs_=0.05)
    fb_behold = (p * u1 + (1 - p) * d1) / (1 + rr)
    fb_udisk = p * u1
    fb_utenC1 = p * (-I + Cu / rr) / (1 + rr)
    _ulik(wait, fb_behold, fb_udisk, fb_utenC1, abs_=0.05)
    fo_behold = fb_behold - now
    fo_udisk = fb_udisk - now
    _ulik(opt, wait, fo_behold, fo_udisk, abs_=0.05)
    fc_hold = now * (1 + rr) / u1
    num0 = -I + Cd / rr
    den0 = (-I + Cu / rr) / (1 + rr) - (Cu - Cd) / rr
    fc_null = num0 / den0 if abs(den0) > 1e-9 else None
    if fc_null is not None and not (0 < fc_null < 1):
        fc_null = None
    fc_to = num / (u1 / (1 + rr) ** 2 - (Cu - Cd) / rr)
    if not (0 < fc_to < 1):
        fc_to = None
    if not (0 < fc_hold < 1):
        raise Avvis("fella med fast NPV må være en sannsynlighet")
    _ulik(X, fc_hold, rel=0.006)
    fc_null = _nær_bort(X, fc_null)
    fc_to = _nær_bort(X, fc_to)

    M = lambda x: _mill(x, val)              # noqa: E731
    enh = "NOK million" if val == "NOK" else "$ million"
    q_ = 1 - p
    case = (f"<p>{fi} can buy {anlegg} for {M(I)}. It produces from the day it is bought: it earns a net "
            f"cash flow of {M(C0)} today and a net cash flow at the end of every year forever. "
            f"At t = 1 the yearly net cash flow moves for good to {M(Cu)} with probability {_sann(p)} or to "
            f"{M(Cd)} with probability {_sann(q_)}. The risk is unrelated to the market (β = 0), so discount "
            f"at the risk-free rate of {_rt(rr)}.</p>"
            f"<p>Instead of buying today, {fi} can wait one year, see the new cash flow level and then decide "
            f"whether to buy the {kort_navn} for the same {M(I)}. Bought at t = 1, it produces from that day: "
            f"its first cash flow comes at t = 1. Give amounts in {enh} with two decimals and probabilities "
            f"with four.</p>")

    # ---------------- (a)
    a = tall_del(
        "a", poeng=3,
        q=f"<p>What is the NPV of buying the {kort_navn} today?</p>",
        svar=[_T("NPV<sub>now</sub>", now, enh)],
        kort=(f"<p><b>NPV<sub>now</sub> = {_m(now_v)}.</b> E[C] = {_sann(p)} × {_n(Cu)} + {_sann(q_)} × {_n(Cd)} = "
              f"{_n(E)}; NPV = −{_n(I)} + {_n(C0)} + {_n(E)}/{tall(rr, 2)} = −{_n(I)} + {_n(C0)} + {_m(Er)}.</p>"),
        losning=(f"<p>Buying today commits {fi} to both future states, so only the expected cash flow counts. "
                 f"Read the timing first: the {kort_navn} produces from the day it is bought, so there is a cash "
                 f"flow at t = 0 on top of the perpetuity from t = 1.</p>"
                 f"<p><b>Step 1: expected cash flow from t = 1.</b> {_sann(p)} × {_n(Cu)} + {_sann(q_)} × {_n(Cd)} = "
                 f"{_n(E)} a year forever.</p>"
                 f"<p><b>Step 2: value it.</b> The risk is not priced (β = 0), so the cost of capital is "
                 f"r<sub>f</sub> = {_rt(rr)}: {_n(E)}/{tall(rr, 2)} = {_m(Er)}, a value at t = 0 because the "
                 f"first payment comes at t = 1.</p>"
                 f"<p><b>Step 3: add today's cash flow and subtract the price.</b> NPV<sub>now</sub> = −{_n(I)} + "
                 f"{_n(C0)} + {_m(Er)} = <b>{_m(now_v)}</b>. The plain NPV rule says buy.</p>"
                 f"<p><b>First check.</b> State by state, buying today gives −{_n(I)} + {_n(C0)} + {_n(Cu)}/{tall(rr, 2)} = "
                 f"{_m(u0)} in the high state and −{_n(I)} + {_n(C0)} + {_n(Cd)}/{tall(rr, 2)} = {_m(d0)} in the low "
                 f"state. {_sann(p)} × {_par(u0)} + {_sann(q_)} × {_par(d0)} = {_m(p * u0 + q_ * d0)} ✓. Committing "
                 f"today takes both states, so the two routes must agree.</p>"
                 f"<p><b>Remember:</b> «produces from the day it is bought» means a cash flow at t = 0. Kurbatov expects "
                 f"many students to forget year zero.</p>"),
        feller=[
            Felle(fa_null, f"You left out today's cash flow of {_n(C0)}, although the {kort_navn} produces from the day "
                           f"it is bought."),
            Felle(fa_to, f"You treated {_n(E)}/{tall(rr, 2)} as a value at t = 1 and discounted it once more, although "
                         f"the first payment of that perpetuity already comes at t = 1."),
            Felle(fa_due, "You counted today's cash flow twice: once on its own and once by valuing the stream as if "
                          "its first payment came today."),
        ],
    )

    # ---------------- (b)
    b = blandet_del(
        "b", poeng=5, tall_poeng=3,
        q=(f"<p>Suppose {fi} waits one year, sees the cash flow level and buys only if it pays. Find the value "
           f"today of this strategy and the value of the option to wait, measured against buying today.</p>"),
        gitt=f"<p>From (a): NPV<sub>now</sub> = {_m(now_v)}.</p>",
        svar=[_T("value of waiting", wait, enh), _T("option to wait", opt, enh)],
        tekst_ledd=f"Does {fi} buy today or wait? Why?",
        setninger="Answer the question in at most two sentences.",
        kort=(f"<p><b>Waiting {_m(wait_v)}, option {_m(opt_v)}: wait.</b> At t = 1: high −{_n(I)} + {_n(Cu)} + "
              f"{_n(Cu)}/{tall(rr, 2)} = {_m(u1_v)}; low {_m(d1)}, not bought. {_sann(p)} × {_m(u1_v)}/{_vf(rr)} = "
              f"{_m(wait_v)}; minus {_m(now_v)}. Avoiding the low state outweighs the cost of waiting: today's cash "
              f"flow minus the interest saved.</p>"),
        losning=(f"<p>Waiting turns the purchase into a call option: at t = 1 {fi} buys only where the NPV is "
                 f"positive and takes 0 elsewhere. The max(·, 0) sits inside the expectation. Each NPV at "
                 f"t = 1 is discounted once.</p>"
                 f"<p><b>Step 1: the decision at t = 1.</b> Bought then, the {kort_navn} earns that year's cash flow at "
                 f"t = 1 and the same amount every year after. High state: −{_n(I)} + {_n(Cu)} + {_n(Cu)}/{tall(rr, 2)} = "
                 f"{_m(u1_v)} &gt; 0, buy. Low state: −{_n(I)} + {_n(Cd)} + {_n(Cd)}/{tall(rr, 2)} = {_m(d1)} &lt; 0, "
                 f"do not buy: 0.</p>"
                 f"<p><b>Step 2: value today.</b> ({_sann(p)} × {_m(u1_v)} + {_sann(q_)} × 0)/{_vf(rr)} = <b>{_m(wait_v)}</b>.</p>"
                 f"<p><b>Step 3: the option.</b> Option to wait = value of waiting − max(0, NPV<sub>now</sub>) = "
                 f"{_m(wait_v)} − {_m(now_v)} = <b>{_m(opt_v)}</b> &gt; 0, so wait, although buying today has a "
                 f"positive NPV.</p>"
                 f"<p><b>First check: the two forces.</b> Avoiding the low state, where buying today loses "
                 f"{_m(-d0)}, is worth {_sann(q_)} × {_m(-d0)} = {_m(unngaa)}. Delaying the high state costs "
                 f"{_sann(p)} × ({_m(u0)} − {_m(u1)}/{_vf(rr)}) = {_m(forsink)}: today's {_n(C0)} is lost, while the "
                 f"price is paid a year later. {_m(unngaa)} − {_m(forsink)} = {_m(unngaa - forsink)} ✓ (up to rounding).</p>"
                 f"<p><b>Remember:</b> the option to wait is the value of waiting minus the best you can do today, "
                 f"max(0, NPV<sub>now</sub>). A positive NPV today can still mean wait.</p>"),
        kriterier=[
            f"Waits: waiting is worth more than buying today (the option is worth {_m(opt_v)} &gt; 0), although "
            f"buying today has a positive NPV of {_m(now_v)} (1 p)",
            f"Gives the reason: waiting lets {fi} skip the low state, where buying would lose money "
            f"({_m(d1)} at t = 1); the price is today's cash flow given up, minus the interest saved by paying a year "
            f"later (1 p)",
        ],
        feller=[
            Felle(fb_behold, "You kept the low state's negative NPV, although nobody forces the purchase at t = 1.",
                  i=0),
            Felle(fb_udisk, "You did not discount the t = 1 value back to today.", i=0),
            Felle(fb_utenC1, f"You left out the cash flow at t = 1, although the {kort_navn} produces from the day it "
                             f"is bought.", i=0),
            Felle(wait, "This is the value of waiting itself, not what waiting adds over buying today.", i=1),
            Felle(fo_behold, "This option value keeps the low state's negative NPV at t = 1. Nobody forces the "
                             "purchase in the low state.", i=1),
        ],
    )

    # ---------------- (c)
    c = tall_del(
        "c", poeng=5,
        q=(f"<p>Let X be the probability of the high cash flow, in place of {_sann(p)}, with everything else unchanged. "
           f"For which X is {fi} indifferent between buying today and waiting one year?</p>"),
        gitt=(f"<p>From (b): bought at t = 1 in the high state, the {kort_navn} has an NPV at t = 1 of {_m(u1_v)}; "
              f"in the low state ({_m(d1)}) it is not bought.</p>"),
        svar=[T("X*", X)],
        kort=(f"<p><b>X* = {_f4(X_v)}.</b> Buy today: {_m(a_v)} + {_m(s_v)}X. Wait: {_m(u1_v)}X/{_vf(rr)} = {_f4(w_v)}X. "
              f"X* = {_m(-a_v)}/({_m(s_v)} − {_f4(w_v)}). Above it buy today, below it wait.</p>"),
        losning=(f"<p>Kurbatov called this «a very nice exam question». The trap is that X moves both sides: it sets "
                 f"the expected cash flow after today, so it changes the NPV of buying today as well as the value "
                 f"of waiting. Write both sides as functions of X before you solve.</p>"
                 f"<p><b>Step 1: buy today.</b> −{_n(I)} + {_n(C0)} + [X × {_n(Cu)} + (1 − X) × {_n(Cd)}]/{tall(rr, 2)} = "
                 f"(−{_n(I)} + {_n(C0)} + {_n(Cd)}/{tall(rr, 2)}) + ({_n(Cu)} − {_n(Cd)})X/{tall(rr, 2)} = {_m(a_v)} + "
                 f"{_m(s_v)}X.</p>"
                 f"<p><b>Step 2: wait.</b> Only the high state is bought, so X × {_m(u1_v)}/{_vf(rr)} = {_f4(w_v)}X. "
                 f"The low state's NPV at t = 1 is {_m(d1)} whatever X is, so it stays out.</p>"
                 f"<p><b>Step 3: set them equal.</b> {_m(a_v)} + {_m(s_v)}X = {_f4(w_v)}X gives "
                 f"X* = {_m(-a_v)}/({_m(s_v)} − {_f4(w_v)}) = <b>{_f4(X_v)}</b>.</p>"
                 f"<p><b>First check.</b> At X* both sides are worth {_m(w_v * X_v)} ✓. At X = {_sann(p)} waiting wins "
                 f"({_m(wait_v)} against {_m(now_v)}), as in (b). So {_sann(p)} must lie below X* ✓. Above X* the low "
                 f"state is too unlikely for the insurance to pay for the year of delay, so buy today.</p>"
                 f"<p><b>Remember:</b> hold nothing fixed that depends on X. Holding NPV<sub>now</sub> at {_m(now_v)} "
                 f"answers a different question.</p>"),
        feller=[F for F in [
            Felle(fc_hold, f"You held the NPV of buying today at its value with probability {_sann(p)}. X also sets the "
                           f"expected cash flow, so it moves that side too."),
            Felle(fc_null, "You forgot year zero on both sides: today's cash flow when buying today and the t = 1 "
                           "cash flow when buying at t = 1.") if fc_null is not None else None,
            Felle(fc_to, "You discounted the value of waiting twice. The NPV at t = 1 is one year away from today.")
            if fc_to is not None else None,
        ] if F is not None],
    )

    # ---------------- (d)
    d = tekst_del(
        "d", poeng=4,
        q=(f"<p>Explain what happens to the value of the option to wait and to the decision (i) if the cash flow "
           f"from t = 1 becomes much less uncertain with the same expected level and (ii) if today's cash flow, "
           f"which {fi} gives up by waiting, were higher, everything else equal.</p>"),
        setninger="Answer in at most four sentences.",
        selvstendig=True,
        kort=("<p>(i) Less uncertainty lowers the option to wait, while NPV<sub>now</sub> stays the same because the "
              "mean is unchanged. The option pays only through the bad state it lets you avoid: with a narrow spread "
              "you would buy in both states, so waiting just delays the same NPV (at σ = 0 it never beats buying "
              "today). (ii) A higher cash flow today lowers the option too: NPV<sub>now</sub> rises one for one while "
              "the value of waiting is unchanged, like a dividend that makes early exercise of a call attractive. Both "
              "changes push the decision towards buying today.</p>"),
        losning=("<p><b>The mechanism.</b> The option to wait is a call on the project. Its value comes from "
                 "deciding after the uncertainty is resolved: you drop the bad state and keep the good one. Its "
                 "cost is what you lose while waiting: the cash flow you would have earned today and a year of "
                 "delay on the good state.</p>"
                 "<p><b>(i) Volatility.</b> With the same mean, a narrower spread leaves NPV<sub>now</sub> unchanged but "
                 "makes the low state less bad. Once you would buy in both states at t = 1, waiting only delays the "
                 "same project: the value of waiting is then E[NPV<sub>1</sub>]/(1 + r), which is below NPV<sub>now</sub> "
                 "because waiting gives up today's cash flow. "
                 "Kurbatov's likely follow-up after a real-option calculation is «what if σ is very, very low?»: "
                 "reason from σ = 0, where waiting has nothing to learn.</p>"
                 "<p><b>(ii) The forgone cash flow.</b> A higher cash flow today raises NPV<sub>now</sub> one for one, "
                 "while the value of waiting does not change, since waiting never collects it. In option terms it "
                 "is a dividend: a call on a stock that pays a large dividend may be worth exercising early.</p>"
                 "<p><b>Typical mistakes:</b> saying that more uncertainty lowers the value of waiting because the "
                 "project is riskier (it raises it: the downside is cut off), or forgetting that the mean, not the "
                 "spread, sets NPV<sub>now</sub>.</p>"
                 "<p><b>Remember:</b> waiting pays when the uncertainty is large and the cash flow you give up is "
                 "small. Invest now only if the NPV today is considerably high.</p>"),
        kriterier=[
            "Says that less uncertainty lowers the value of the option to wait, while NPV<sub>now</sub> is unchanged because "
            "the expected cash flow is unchanged (1 p)",
            "Explains why: the option pays through the bad state it lets you avoid; with a narrow spread you would buy in "
            "both states, so waiting only delays the same project (σ = 0 as the limit) (1 p)",
            "Says that a higher cash flow today lowers the option to wait: NPV<sub>now</sub> rises one for one while "
            "the value of waiting is unchanged, like a dividend that makes early exercise of a call attractive (1 p)",
            "Draws the decision consequence: both changes push towards buying today; waiting wins only when the "
            "uncertainty is large relative to what waiting costs (1 p)",
        ],
    )
    return ovelse(case, [a, b, c, d])


# ---------------------------------------------------------------------------
# ov-reo2 · Nedleggelse målt mot 0 (exit etter n år, gebyr)
# ---------------------------------------------------------------------------
VIRKSOMHET2 = [("a padel hall", "hall"), ("a car-wash", "car-wash"), ("a sushi bar", "bar"),
               ("a climbing gym", "gym"), ("a bike-rental kiosk", "kiosk"), ("a seasonal ferry route", "route"),
               ("a food-hall stall", "stall"), ("a bakery outlet", "outlet")]
PROGRAM2 = ["The municipality offers a start-up programme", "The landlord offers a new lease",
            "A regional business fund offers a programme", "The government offers a pilot scheme"]


def _kr(x, val):
    """Hele kroner eller dollar med valutategn: «NOK 160 000», «$160 000», «−NOK 17 143»."""
    return penger(x, 0, "NOK" if val == "NOK" else "$")


@oppgave("ov-reo2", tema="realopsjon", tittel="An exit right, measured against zero", antall=12,
         sjanger="d3-exit", kilde="H2025 E5 d, lecture 14 wrap-up (exit compared with 0, a small fee)")
def _(r):
    fi, val = _valuta(r)
    sted, kort_navn = r.choice(VIRKSOMHET2)
    prog = r.choice(PROGRAM2)
    rr = r.choice([0.05, 0.06, 0.07, 0.08])
    p = r.choice([0.4, 0.5, 0.6])
    n = r.choice([2, 2, 3])
    c = r.choice([60_000, 80_000, 90_000, 100_000, 120_000])
    gh = r.choice([20_000, 25_000, 30_000, 40_000])
    gl = r.choice([5_000, 8_000, 10_000, 12_000, 15_000])
    Rh, Rl = c + gh, c - gl
    Cg, Cb = gh, -gl
    E = p * Cg + (1 - p) * Cb
    if E <= 0:
        raise Avvis("forventet kontantstrøm må være positiv")
    a_n = A(rr, n)
    a4 = rund(a_n, 4)
    q_ = 1 - p

    def npvs(I):
        uten = E / rr - I
        g = Cg / rr - I
        b = -I + Cb * a_n
        return uten, g, b, p * g + q_ * b
    mulige = []
    for I in range(100_000, 400_001, 10_000):
        uten, g, b, med = npvs(I)
        if uten < -0.02 * I and med > 0.03 * I:
            mulige.append(I)
    if not mulige:
        raise Avvis("ingen investering passer")
    I = r.choice(mulige)
    uten, g, b, med = npvs(I)

    # viste mellomtall (hele kroner, faktorer med fire desimaler)
    E_v = rund(E, 0)
    pv_uten = rund(E / rr, 0)
    uten_v = pv_uten - I
    pv_g = rund(Cg / rr, 0)
    g_v = pv_g - I
    tap_v = rund(-Cb * a4, 0)
    b_v = -I - tap_v
    med_v = rund(p * g_v + q_ * b_v, 0)
    _sjekk(b_v, b)
    _sjekk(med_v, med)
    hale = q_ * (-Cb / rr) / (1 + rr) ** n
    verdi = med                                   # mot max(0, uten) = 0
    vf_n = rund((1 + rr) ** n, 4)
    Fstar = med * (1 + rr) ** n / q_
    F_v = rund(med_v * vf_n / q_, 0)
    _sjekk(F_v, Fstar)
    bli = -Cb / rr                                # kostnaden ved å bli, sett fra år n
    if Fstar >= bli:
        raise Avvis("gebyret må ligge under kostnaden ved å bli")

    # feller
    fa_bruttoinnt = (p * Rh + q_ * Rl) / rr - I
    fa_forskudd = E * (1 + rr) / rr - I
    _ulik(uten, fa_bruttoinnt, fa_forskudd, abs_=5)
    fb_evig = -I + Cb / rr
    fb_straks = -I
    fb_n1 = -I + Cb * A(rr, n + 1)
    fm_uten = uten
    fm_begge = p * (-I + Cg * a_n) + q_ * b
    fb_n1 = _nær_bort(b, fb_n1, abs_=5)
    _ulik(b, fb_evig, fb_straks, abs_=5)
    _ulik(med, fm_uten, fm_begge, abs_=5)
    fv_neg = med - uten
    fv_udisk = q_ * (-Cb / rr)
    _ulik(verdi, fv_neg, fv_udisk, abs_=5)
    ff_udisk = med / q_
    ff_uvekt = med * (1 + rr) ** n
    ff_bli = bli
    ff_med = med
    _ulik(Fstar, ff_udisk, ff_uvekt, ff_bli, ff_med, abs_=5)

    K = lambda x: _kr(x, val)               # noqa: E731
    H = lambda x: tall(x, 0)                # noqa: E731  (hele kroner)
    enh = "NOK" if val == "NOK" else "$"
    case = (f"<p>{fi} is considering opening {sted}. Opening costs {K(I)} today. Running it costs {K(c)} a year. "
            f"Revenue will be {K(Rh)} a year forever with probability {_sann(p)} or {K(Rl)} a year forever with "
            f"probability {_sann(q_)}. Nobody knows the state today. If {fi} opens, it learns the state during "
            f"year 1, after the opening cost is paid. Cash flows come at the end of each year, the first at t = 1. "
            f"Demand is unrelated to the market (β = 0) and the risk-free rate is {_rt(rr)}. Without help the "
            f"{kort_navn} must run forever once it is opened.</p>"
            f"<p>Give amounts in {enh} rounded to whole units and factors with four decimals.</p>")

    # ---------------- (a)
    a = tall_del(
        "a", poeng=2,
        q=f"<p>What is the NPV of opening the {kort_navn} now?</p>",
        svar=[_T("NPV<sub>0</sub>", uten, enh, a=2)],
        kort=(f"<p><b>NPV<sub>0</sub> = {K(uten_v)}.</b> Net cash flow {H(Cg)} or −{H(-Cb)}; expected "
              f"{_sann(p)} × {H(Cg)} − {_sann(q_)} × {H(-Cb)} = {H(E_v)}. {H(E_v)}/{tall(rr, 2)} − {H(I)} = "
              f"{H(pv_uten)} − {H(I)}. Do not open.</p>"),
        losning=(f"<p>Opening now commits {fi} to running the {kort_navn} forever in both states, so only the "
                 f"expected net cash flow counts.</p>"
                 f"<p><b>Step 1: net the running cost.</b> Good state: {H(Rh)} − {H(c)} = {H(Cg)}. Bad state: "
                 f"{H(Rl)} − {H(c)} = −{H(-Cb)}.</p>"
                 f"<p><b>Step 2: expected net cash flow.</b> {_sann(p)} × {H(Cg)} + {_sann(q_)} × (−{H(-Cb)}) = "
                 f"{H(E_v)} a year forever.</p>"
                 f"<p><b>Step 3: value and NPV.</b> The risk is not priced, so discount at r<sub>f</sub>: "
                 f"{H(E_v)}/{tall(rr, 2)} = {H(pv_uten)}. NPV<sub>0</sub> = {H(pv_uten)} − {H(I)} = "
                 f"<b>{K(uten_v)}</b> &lt; 0: do not open.</p>"
                 f"<p><b>First check.</b> State by state: {H(Cg)}/{tall(rr, 2)} − {H(I)} = {H(g_v)} and "
                 f"−{H(-Cb)}/{tall(rr, 2)} − {H(I)} = {H(-I + Cb / rr)}. {_sann(p)} × {_par(g_v, 0)} + {_sann(q_)} × "
                 f"{_par(-I + Cb / rr, 0)} = {H(p * g_v + q_ * (-I + Cb / rr))} ✓ (up to rounding).</p>"
                 f"<p><b>Remember:</b> net the running cost before you value anything. Value a committed "
                 f"project at its expected cash flow.</p>"),
        feller=[
            Felle(fa_bruttoinnt, f"You valued the revenue and left out the running cost of {H(c)} a year."),
            Felle(fa_forskudd, "You let the first cash flow come today, although the case puts it at the end of "
                               "year 1."),
        ],
    )

    # ---------------- (b)
    b_del = tall_del(
        "b", poeng=5,
        q=(f"<p>{prog}: after {n} years {fi} may close the {kort_navn} and exit. It then gets 0 from year {n + 1} "
           f"on. Nothing can be sold. With this right, what is the NPV of opening if the bad state occurs (opening "
           f"cost included) and what is the expected NPV of opening now?</p>"),
        gitt=f"<p>From (a): the net cash flow is {H(Cg)} or −{H(-Cb)} a year; NPV<sub>0</sub> = {H(uten_v)}.</p>",
        svar=[_T("NPV<sub>bad</sub>", b, enh, a=2), _T("NPV<sub>exit</sub>", med, enh, a=2)],
        kort=(f"<p><b>NPV<sub>bad</sub> = {K(b_v)}, NPV<sub>exit</sub> = {K(med_v)}: open.</b> A({n}, {_rt(rr)}) = "
              f"{_f4(a4)}; bad: −{H(I)} − {H(-Cb)} × {_f4(a4)}. Good: {H(Cg)}/{tall(rr, 2)} − {H(I)} = {H(g_v)}. "
              f"{_sann(p)} × {_par(g_v, 0)} + {_sann(q_)} × {_par(b_v, 0)}.</p>"),
        losning=(f"<p>{fi} still opens before it knows the state, so it pays {H(I)} and takes the first {n} years "
                 f"in both states. The right bites only at year {n}: in the bad state, staying is worth −{H(-Cb)}/"
                 f"{tall(rr, 2)} = {H(-bli)} at year {n}, leaving is worth 0, so {fi} leaves. Forgetting this escape is "
                 f"the mistake Kurbatov saw ChatGPT make: it «treated the negative value as given» instead of comparing "
                 f"with 0.</p>"
                 f"<p><b>Step 1: the good state.</b> Nobody leaves a profitable perpetuity, so nothing changes: "
                 f"{H(Cg)}/{tall(rr, 2)} − {H(I)} = {H(g_v)}.</p>"
                 f"<p><b>Step 2: the bad state.</b> {n} years of losses, then 0. A({n}, {_rt(rr)}) = [1 − {_vf(rr)}"
                 f"<sup>−{n}</sup>]/{tall(rr, 2)} = {_f4(a4)}, so NPV<sub>bad</sub> = −{H(I)} − {H(-Cb)} × {_f4(a4)} = "
                 f"−{H(I)} − {H(tap_v)} = <b>{K(b_v)}</b>.</p>"
                 f"<p><b>Step 3: expected NPV.</b> {_sann(p)} × {_par(g_v, 0)} + {_sann(q_)} × {_par(b_v, 0)} = "
                 f"<b>{K(med_v)}</b> &gt; 0: open.</p>"
                 f"<p><b>First check.</b> The right removes the bad state's losses from year {n + 1} on: a perpetuity of "
                 f"{H(-Cb)} worth {H(bli)} at year {n}, or {H(bli / (1 + rr) ** n)} today. {_sann(q_)} × "
                 f"{H(bli / (1 + rr) ** n)} = {H(hale)}. Then {H(uten_v)} + {H(hale)} = {H(uten_v + hale)} ✓ "
                 f"(up to rounding). This route never uses the annuity factor, so it catches a slip there.</p>"
                 f"<p><b>Remember:</b> an exit right cuts a perpetuity of losses to an annuity; the good state is "
                 f"untouched.</p>"),
        feller=[F for F in [
            Felle(fb_evig, "You kept the losses forever, as if the right to exit did not exist.", i=0),
            Felle(fb_straks, f"You let {fi} leave at once, although it can leave only after year {n}.", i=0),
            Felle(fb_n1, f"You counted {n + 1} years of losses, although the exit comes after year {n}.", i=0)
            if fb_n1 is not None else None,
            Felle(fm_uten, "This is the NPV without the right: the bad state still loses money forever.", i=1),
            Felle(fm_begge, f"You cut the good state off after {n} years too. Nobody leaves a profitable perpetuity.",
                  i=1),
        ] if F is not None],
    )

    # ---------------- (c)
    c_del = blandet_del(
        "c", poeng=4, tall_poeng=2,
        q=(f"<p>{fi} has committed to nothing and is free to stay out. How much is the right to exit worth to "
           f"{fi}?</p>"),
        gitt=f"<p>From (a) and (b): NPV<sub>0</sub> = {H(uten_v)} without the right and {H(med_v)} with it.</p>",
        svar=[_T("value of the right", verdi, enh, a=2)],
        tekst_ledd="Explain why you measure it this way.",
        setninger="Answer in at most two sentences.",
        kort=(f"<p><b>{K(med_v)}.</b> {H(med_v)} − max(0, {H(uten_v)}) = {H(med_v)} − 0. Free to stay out, {fi} "
              f"would not open without the right: its alternative is 0. Only a firm committed to opening would subtract "
              f"{H(uten_v)}.</p>"),
        losning=(f"<p>An option is worth what it adds to the best you can do without it. Without the right, the best "
                 f"{fi} can do is not to open, worth 0. Kurbatov's words in the wrap-up support this: the option to "
                 f"abandon is priced against the baseline case, or against zero if the baseline is negative, since then "
                 f"«we don't have to commit, we just experience zero».</p>"
                 f"<p><b>Step 1: the best alternative.</b> max(0, {H(uten_v)}) = 0.</p>"
                 f"<p><b>Step 2: the value of the right.</b> {H(med_v)} − 0 = <b>{K(med_v)}</b>.</p>"
                 f"<p><b>A committed firm.</b> A firm that had to open anyway would measure against the negative NPV "
                 f"itself: {H(med_v)} − ({H(uten_v)}) = {H(med_v - uten_v)}, the loss tail the right removes, "
                 f"{H(hale)} ✓. For {fi}, which is free to stay out, the first {H(-uten_v)} of that only lifts a negative "
                 f"NPV to 0, which {fi} gets for free by not opening. Kurbatov's store in lecture 11 is the free case "
                 f"too: on standard terms it would not be opened, so the exit clause is worth the whole NPV with the "
                 f"clause, 108 588 on the slide.</p>"
                 f"<p><b>Remember:</b> free to stay out: value = max(0, NPV<sub>with</sub>) − max(0, NPV<sub>without</sub>). "
                 f"Committed: subtract NPV<sub>without</sub>, even when it is negative.</p>"),
        kriterier=[
            f"Compares with the best alternative without the right, which is staying out (0), because {fi} would not "
            f"open without it (1 p)",
            f"Contrasts with a committed firm: the negative NPV of {H(uten_v)} would be the baseline only if {fi} had to "
            f"open anyway (then the right adds {H(med_v - uten_v)}) (1 p)",
        ],
        feller=[
            Felle(fv_neg, f"This is what the right adds for a firm that must open anyway. {fi} has committed to "
                          f"nothing."),
            Felle(fv_udisk, f"You took the losses the right removes at their year-{n} value, without discounting "
                            f"them."),
        ],
    )

    # ---------------- (d)
    d_del = tall_del(
        "d", poeng=5,
        q=(f"<p>The scheme is changed: {fi} must now pay an exit fee F when it leaves at year {n}. Nothing is paid if "
           f"it stays. What is the highest fee at which opening the {kort_navn} now is still worth it?</p>"),
        gitt=(f"<p>From (b): with a free exit, NPV<sub>bad</sub> = {H(b_v)} and NPV<sub>exit</sub> = {H(med_v)}.</p>"),
        svar=[_T("F*", Fstar, enh, a=2)],
        kort=(f"<p><b>F* = {K(F_v)}.</b> The fee costs F/{_vf(rr)}<sup>{n}</sup> in the bad state only: "
              f"{H(med_v)} − {_sann(q_)} × F/{_f4(vf_n)} = 0, so F* = {H(med_v)} × {_f4(vf_n)}/{_sann(q_)}. "
              f"Check: leaving still beats staying, {H(F_v)} &lt; {H(bli)}.</p>"),
        losning=(f"<p>With a fee the exit branch is worth −F, not 0. Two decisions change: whether {fi} leaves at year "
                 f"{n} in the bad state and whether it opens at all.</p>"
                 f"<p><b>Step 1: what the fee costs.</b> It is paid only in the bad state, at year {n}: today it costs "
                 f"{_sann(q_)} × F/{_vf(rr)}<sup>{n}</sup> = {_sann(q_)} × F/{_f4(vf_n)}. The good state is untouched.</p>"
                 f"<p><b>Step 2: indifference.</b> {H(med_v)} − {_sann(q_)} × F/{_f4(vf_n)} = 0 gives "
                 f"F* = {H(med_v)} × {_f4(vf_n)}/{_sann(q_)} = <b>{K(F_v)}</b>.</p>"
                 f"<p><b>Step 3: is leaving still right at that fee?</b> At year {n} staying is worth −{H(-Cb)}/"
                 f"{tall(rr, 2)} = {H(-bli)}, leaving −{H(F_v)}. Since {H(F_v)} &lt; {H(bli)}, {fi} still leaves "
                 f"✓, so the equation in Step 2 is the right one. Above {H(bli)} the fee would never be paid and the "
                 f"right would be worthless.</p>"
                 f"<p><b>First check.</b> With F = {H(F_v)}: NPV<sub>bad</sub> = {H(b_v)} − {H(F_v)}/{_f4(vf_n)} = "
                 f"{H(b_v - F_v / vf_n)} and {_sann(p)} × {_par(g_v, 0)} + {_sann(q_)} × {_par(b_v - F_v / vf_n, 0)} = "
                 f"{H(p * g_v + q_ * (b_v - F_v / vf_n))}, which is 0 up to rounding ✓.</p>"
                 f"<p><b>Remember:</b> with a fee, compare staying with −F and discount the fee from the date it is "
                 f"paid.</p>"),
        feller=[
            Felle(ff_udisk, f"You did not discount the fee, which is paid at year {n}."),
            Felle(ff_uvekt, f"You charged the fee in both states, although {fi} exits only in the bad state."),
            Felle(ff_bli, "This is the fee at which leaving and staying are equally bad at the exit date. The question "
                          "is when opening still pays."),
            Felle(ff_med, "You set the fee equal to today's NPV, ignoring when and in which state it is paid."),
        ],
    )

    # ---------------- (e)
    e_del = tekst_del(
        "e", poeng=4,
        q=(f"<p>The exit right turns the {kort_navn} into a project worth opening, although the expected yearly "
           f"cash flow is the same as in (a). Explain why. Then explain how the value of the right would change if (i) "
           f"the exit came later and (ii) the two states lay further apart with the same expected cash flow.</p>"),
        setninger="Answer in at most four sentences.",
        selvstendig=True,
        kort=(f"<p>The right is a put on the {kort_navn}: it leaves the good state untouched (nobody leaves a "
              f"profitable perpetuity) but cuts the bad state's endless losses to {n} years, so the gain comes from the "
              f"asymmetry, not from the average cash flow. (i) A later exit leaves more years of losses in the bad "
              f"state, so the right is worth less. (ii) A wider spread raises the good-state perpetuity by more than it "
              f"deepens the capped bad state, so the right is worth more: like any option, it gains from "
              f"volatility.</p>"),
        losning=(f"<p><b>The mechanism.</b> Committing without the right means taking the average forever. The right "
                 f"changes only the bad state, where continuing is worth less than leaving (0). That is an "
                 f"abandonment option, a put on the project struck at the exit value.</p>"
                 f"<p><b>(i) Timing.</b> The bad state bears C × A(n, r). A larger n means a larger annuity factor, so "
                 f"less of the loss tail is cut off. Exit at once would remove all of it; exit never is the case in "
                 f"(a).</p>"
                 f"<p><b>(ii) Spread.</b> Keep the mean fixed: raise the good state's cash flow by x and lower the bad "
                 f"state's by y, with p·x = (1 − p)·y. In expectation the good state gains p·x/r, while the bad state "
                 f"loses only (1 − p)·y × A(n, r) = p·x × A(n, r). Since 1/r &gt; A(n, r), the expected NPV rises: the "
                 f"upside is a perpetuity, the downside is capped. This is the sanity check in H2025 Exercise 5 (e): the wider "
                 f"the spread, the better the project.</p>"
                 f"<p><b>Typical mistakes:</b> valuing the right against the negative NPV in (a) as if {fi} had to open; "
                 f"saying a riskier project must be worth less; truncating the good state too.</p>"
                 f"<p><b>Remember:</b> an option is never worth less than 0 and is measured against your best "
                 f"alternative without it.</p>"),
        kriterier=[
            "Says the right leaves the good state untouched: nobody leaves a profitable perpetuity (1 p)",
            "Explains that it cuts the bad state's losses after the exit date, a put (abandonment option), so the gain "
            "comes from the asymmetry, not from the mean cash flow (1 p)",
            "(i) A later exit leaves more years of losses, so the right is worth less (1 p)",
            "(ii) A wider spread with the same mean makes the right worth more: the upside is a perpetuity while the "
            "downside is capped, as for any option with higher volatility (1 p)",
        ],
    )
    return ovelse(case, [a, b_del, c_del, d_del, e_del])


# ---------------------------------------------------------------------------
# ov-reo3 · Trinnvis finansiering
# ---------------------------------------------------------------------------
PROSJEKT3 = [
    ("a new fish vaccine", "lab trials", "field trials"),
    ("a seabed-mapping drone", "a prototype", "a sea trial with a paying customer"),
    ("a battery-recycling process", "a lab-scale test", "a pilot plant"),
    ("a new drama series", "a pilot episode", "the first season"),
    ("a medical app", "a clinical pilot", "the approval study"),
    ("a carbon-capture membrane", "a lab test", "a field test at a cement plant"),
]
SANNPAR3 = [  # (p1, p2, p1', p2') med samme samlede sannsynlighet
    (0.5, 0.2, 0.2, 0.5), (0.4, 0.25, 0.2, 0.5), (0.4, 0.3, 0.2, 0.6), (0.3, 0.4, 0.15, 0.8),
    (0.5, 0.3, 0.25, 0.6), (0.6, 0.3, 0.3, 0.6), (0.5, 0.4, 0.25, 0.8), (0.6, 0.4, 0.3, 0.8),
    (0.4, 0.4, 0.2, 0.8), (0.3, 0.6, 0.2, 0.9),
]


@oppgave("ov-reo3", tema="realopsjon", tittel="Staged financing and the right to stop", antall=12,
         sjanger="d3-exit", kilde="Lecture 11 staged financing (slides 10–12)")
def _(r):
    fi, val = _valuta(r)
    prod, st1, st2 = r.choice(PROSJEKT3)
    rr = r.choice([0.03, 0.04, 0.05, 0.06])
    p1, p2, p1n, p2n = r.choice(SANNPAR3)
    I2 = r.choice([40, 50, 60, 80, 90, 100])
    V = r.choice([200, 240, 300, 400, 500, 600, 800])
    vf = 1 + rr
    lav = p1 * p2 * V / vf ** 2 - I2 / vf + 1          # NPV forpliktet < −1
    hoy = p1 * (-I2 + p2 * V / vf) / vf - 1            # NPV trinnvis > 1
    mulige = [x for x in range(2, 41) if lav < x < hoy and x <= 0.4 * I2]
    pene = [x for x in mulige if x % 5 == 0]
    if not mulige:
        raise Avvis("ingen kostnad for trinn 1 passer")
    I1 = r.choice(pene or mulige)
    C2 = -I2 + p2 * V / vf
    npv_c = -I1 - I2 / vf + p1 * p2 * V / vf ** 2
    npv_s = -I1 + p1 * C2 / vf
    C2n = -I2 + p2n * V / vf
    npv_n = -I1 + p1n * C2n / vf
    if not (C2 > 5 and npv_c < -1 and npv_s > 1 and C2n > 0):
        raise Avvis("tallene gir ikke en god trinnhistorie")
    if npv_s > 0.6 * V * p1 * p2:
        raise Avvis("for stor NPV")
    gevinst = (p1 - p1n) * I2 / vf

    # viste mellomtall
    pv_V2 = rund(p2 * V / vf, 2)
    C2_v = rund(-I2 + pv_V2, 2)
    s_v = rund(npv_s, 2)
    s_v = rund(-I1 + p1 * C2_v / vf, 2)
    _sjekk(C2_v, C2)
    _sjekk(s_v, npv_s, abs_=0.02)
    pvI2 = rund(I2 / vf, 2)
    pvV = rund(p1 * p2 * V / vf ** 2, 2)
    c_v = rund(-I1 - pvI2 + pvV, 2)
    _sjekk(c_v, npv_c, abs_=0.02)
    pv_V2n = rund(p2n * V / vf, 2)
    C2n_v = rund(-I2 + pv_V2n, 2)
    n_v = rund(-I1 + p1n * C2n_v / vf, 2)
    _sjekk(n_v, npv_n, abs_=0.02)
    spart_v = rund((1 - p1) * I2 / vf, 2)

    # feller
    fa_udisk = -I1 - I2 + p1 * p2 * V
    fa_en = -I1 - I2 / vf + p1 * p2 * V / vf
    fa_p2 = -I1 - I2 / vf + p2 * V / vf ** 2
    _ulik(npv_c, fa_udisk, fa_en, fa_p2, abs_=0.05)
    fb_udiskV = -I2 + p2 * V
    fb_sunk = C2 - I1
    _ulik(C2, fb_udiskV, fb_sunk, abs_=0.05)
    fs_udisk = -I1 + p1 * (-I2 + p2 * V)
    fs_sunk = -I1 + p1 * (C2 - I1) / vf
    _ulik(npv_s, npv_c, fs_udisk, fs_sunk, abs_=0.05)
    fn_gammel = -I1 + p1n * C2 / vf
    _ulik(npv_n, fn_gammel, npv_s, abs_=0.05)

    M = lambda x: _mill(x, val)              # noqa: E731
    enh = "NOK million" if val == "NOK" else "$ million"
    case = (f"<p>{fi} is developing {prod}. Stage 1, {st1}, costs {M(I1)} today and succeeds with probability "
            f"{_sann(p1)}; the result is known at t = 1. If stage 1 succeeds, stage 2, {st2}, costs {M(I2)} at "
            f"t = 1 and succeeds with probability {_sann(p2)}; the result is known at t = 2. If both stages succeed, "
            f"the business is worth {M(V)} at t = 2. Otherwise it is worth nothing. The risks are technical and "
            f"unrelated to the market, so discount at the risk-free rate of {_rt(rr)}.</p>"
            f"<p>Give amounts in {enh} with two decimals.</p>")

    # ---------------- (a)
    a = tall_del(
        "a", poeng=3,
        q=(f"<p>A contractor offers to run both stages. {fi} would then pay {_n(I1)} today and {_n(I2)} at t = 1 "
           f"whatever stage 1 shows. What is the NPV of committing to both stages?</p>"),
        svar=[_T("NPV<sub>committed</sub>", npv_c, enh)],
        kort=(f"<p><b>NPV = {_m(c_v)}.</b> −{_n(I1)} − {_n(I2)}/{_vf(rr)} + {_sann(p1)} × {_sann(p2)} × {_n(V)}/"
              f"{_vf(rr)}<sup>2</sup> = −{_n(I1)} − {_m(pvI2)} + {_m(pvV)}.</p>"),
        losning=(f"<p>Committing to both stages means paying for stage 2 even when stage 1 has already failed. The "
                 f"payoff needs both stages to succeed (probability {_sann(p1)} × {_sann(p2)} = "
                 f"{tall(p1 * p2, 2)}) and arrives at t = 2.</p>"
                 f"<p><b>Step 1: the costs.</b> {_n(I1)} today and {_n(I2)} at t = 1 for sure: {_n(I1)} + "
                 f"{_n(I2)}/{_vf(rr)} = {_n(I1)} + {_m(pvI2)}.</p>"
                 f"<p><b>Step 2: the payoff.</b> {tall(p1 * p2, 2)} × {_n(V)}/{_vf(rr)}<sup>2</sup> = {_m(pvV)}.</p>"
                 f"<p><b>Step 3: NPV.</b> −{_n(I1)} − {_m(pvI2)} + {_m(pvV)} = <b>{_m(c_v)}</b>. Committed, the "
                 f"project destroys value.</p>"
                 f"<p><b>First check, path by path.</b> Both stages succeed ({tall(p1 * p2, 2)}): −{_n(I1)} − "
                 f"{_m(pvI2)} + {_n(V)}/{_vf(rr)}<sup>2</sup> = {_m(-I1 - pvI2 + V / vf ** 2)}. Any failure "
                 f"({tall(1 - p1 * p2, 2)}): −{_n(I1)} − {_m(pvI2)} = {_m(-I1 - pvI2)}. {tall(p1 * p2, 2)} × "
                 f"{_m(-I1 - pvI2 + V / vf ** 2)} + {tall(1 - p1 * p2, 2)} × ({_m(-I1 - pvI2)}) = "
                 f"{_m(p1 * p2 * (-I1 - pvI2 + V / vf ** 2) + (1 - p1 * p2) * (-I1 - pvI2))} ✓. A second route "
                 f"through the same numbers: both costs are paid on every path.</p>"
                 f"<p><b>Remember:</b> discount each amount from the date it is paid: stage 2 at t = 1, the payoff at "
                 f"t = 2.</p>"),
        feller=[
            Felle(fa_udisk, "You did not discount, although stage 2 is paid at t = 1 and the payoff comes at t = 2."),
            Felle(fa_en, "You discounted the payoff only one year, although it arrives at t = 2."),
            Felle(fa_p2, "You used only stage 2's probability, as if stage 1 could not fail."),
        ],
    )

    # ---------------- (b)
    b = tall_del(
        "b", poeng=5,
        q=(f"<p>Instead {fi} pays for one stage at a time and decides at t = 1 whether to run stage 2. Find the NPV at "
           f"t = 1 of going on after a successful stage 1 (stage 2's cost included) and the NPV today of staged "
           f"financing.</p>"),
        selvstendig=True,
        svar=[_T("NPV at t = 1", C2, enh), _T("NPV<sub>staged</sub>", npv_s, enh)],
        kort=(f"<p><b>{_m(C2_v)} at t = 1; NPV = {_m(s_v)}.</b> −{_n(I2)} + {_sann(p2)} × {_n(V)}/{_vf(rr)} = "
              f"{_m(C2_v)} &gt; 0, go on. −{_n(I1)} + {_sann(p1)} × {_m(C2_v)}/{_vf(rr)} = {_m(s_v)}.</p>"),
        losning=(f"<p>Staging gives {fi} the right to stop after stage 1. Roll the tree back from the end and, at "
                 f"t = 1, ignore what stage 1 cost: that money is spent whatever {fi} does now. Kurbatov: «you "
                 f"should ignore the previous stages».</p>"
                 f"<p><b>Step 1: at t = 1 after a success.</b> Going on: −{_n(I2)} + {_sann(p2)} × {_n(V)}/{_vf(rr)} = "
                 f"−{_n(I2)} + {_m(pv_V2)} = <b>{_m(C2_v)}</b> &gt; 0, so {fi} pays for stage 2. After a failure it stops "
                 f"and gets 0.</p>"
                 f"<p><b>Step 2: today.</b> NPV = −{_n(I1)} + {_sann(p1)} × {_m(C2_v)}/{_vf(rr)} = <b>{_m(s_v)}</b>.</p>"
                 f"<p><b>First check: where the gain comes from.</b> Staging changes only one thing: stage 2's "
                 f"{_n(I2)} is paid only after a success. It saves {_sann(1 - p1)} × {_n(I2)}/{_vf(rr)} = {_m(spart_v)} "
                 f"in expected cost. {_m(c_v)} + {_m(spart_v)} = {_m(c_v + spart_v)} ✓ (up to rounding). This route "
                 f"does not use the value at t = 1, so it can catch a slip there.</p>"
                 f"<p><b>Remember:</b> same costs and same chance of success, but the expensive stage is paid only in "
                 f"the branch where it can still pay off.</p>"),
        feller=[
            Felle(fb_udiskV, f"You did not discount the payoff from t = 2 to t = 1.", i=0),
            Felle(fb_sunk, f"You charged stage 1's {_n(I1)} again at t = 1, although it is sunk by then.", i=0),
            Felle(npv_c, "This is the NPV of committing to both stages: stage 2 is paid even after a failure.", i=1),
            Felle(fs_udisk, "You did not discount, although stage 2's value is at t = 1 and the payoff at t = 2.",
                  i=1),
            Felle(fs_sunk, f"You charged stage 1's {_n(I1)} twice: today and again in the decision at t = 1.", i=1),
        ],
    )

    # ---------------- (c)
    c = blandet_del(
        "c", poeng=5, tall_poeng=3,
        q=(f"<p>{fi} redesigns stage 1 so that it tells more: it now succeeds with probability {_sann(p1n)} and stage 2 "
           f"then with {_sann(p2n)}. The costs, the value {_n(V)} and the overall chance of success "
           f"({tall(p1 * p2, 2)}) are unchanged. What is the NPV of staged financing now?</p>"),
        gitt=f"<p>From (b): staged financing had an NPV of {_m(s_v)}.</p>",
        svar=[_T("NPV<sub>staged, new</sub>", npv_n, enh)],
        tekst_ledd="Why does the NPV change, although the overall chance of success is the same?",
        setninger="Answer in at most two sentences.",
        kort=(f"<p><b>NPV = {_m(n_v)}.</b> At t = 1: −{_n(I2)} + {_sann(p2n)} × {_n(V)}/{_vf(rr)} = {_m(C2n_v)}; "
              f"−{_n(I1)} + {_sann(p1n)} × {_m(C2n_v)}/{_vf(rr)} = {_m(n_v)}. Stage 1 now weeds out more failures, so "
              f"the {_n(I2)} of stage 2 is paid less often.</p>"),
        losning=(f"<p>The chance that both stages succeed is the same, so the expected payoff is the same. What "
                 f"changes is how often {fi} pays for stage 2.</p>"
                 f"<p><b>Step 1: at t = 1.</b> −{_n(I2)} + {_sann(p2n)} × {_n(V)}/{_vf(rr)} = −{_n(I2)} + {_m(pv_V2n)} = "
                 f"{_m(C2n_v)} &gt; 0, so {fi} still goes on after a success.</p>"
                 f"<p><b>Step 2: today.</b> −{_n(I1)} + {_sann(p1n)} × {_m(C2n_v)}/{_vf(rr)} = <b>{_m(n_v)}</b>, up from "
                 f"{_m(s_v)}.</p>"
                 f"<p><b>First check.</b> The payoff term is unchanged, so the whole change is stage 2's cost saved: "
                 f"({_sann(p1)} − {_sann(p1n)}) × {_n(I2)}/{_vf(rr)} = {_m(gevinst)}. Then {_m(s_v)} + {_m(gevinst)} = "
                 f"{_m(s_v + gevinst)} ✓ (up to rounding).</p>"
                 f"<p><b>Why.</b> A more informative first stage resolves more of the uncertainty before the expensive "
                 f"stage. The right to stop is used more often and saves more. The more informative the early stages, "
                 f"the more staging is worth.</p>"
                 f"<p><b>Remember:</b> put the cheap stage that reveals most at the start.</p>"),
        kriterier=[
            f"Says that the NPV rises by about {_m(gevinst)}, because stage 2's {_n(I2)} is now paid with probability "
            f"{_sann(p1n)} instead of {_sann(p1)}, while the expected payoff is unchanged (1 p)",
            "Explains the mechanism: a more informative first stage weeds out more failures before the expensive "
            "stage, so the right to stop is worth more (1 p)",
        ],
        feller=[
            Felle(fn_gammel, f"You kept the old value at t = 1, although stage 2 now succeeds with probability "
                             f"{_sann(p2n)}."),
            Felle(npv_s, "This is the NPV with the old probabilities."),
        ],
    )

    # ---------------- (d)
    d = tekst_del(
        "d", poeng=4,
        q=(f"<p>At t = 1, after a successful stage 1, a board member says: «We have spent {_n(I1)} on stage 1, so we "
           f"must go on to recover it.» Comment on the argument. Then explain why staged financing is worth more "
           f"than committing to both stages and give one real-world example of staged financing.</p>"),
        setninger="Answer in at most four sentences.",
        gitt=f"<p>From (a) and (b): committing gives {_m(c_v)}, staging {_m(s_v)}.</p>",
        kort=(f"<p>The argument is wrong: the {_n(I1)} is sunk and is lost whatever {fi} does, so at t = 1 the only "
              f"question is whether −{_n(I2)} + {_sann(p2)} × {_n(V)}/{_vf(rr)} beats 0 (here it does, so going on is right, "
              f"but for that reason only). Staging is worth more because it is an option to stop: the expensive stage 2 is paid "
              f"only after stage 1 has succeeded, which saves {_m(spart_v)} in expected cost with the same chance of "
              f"success. Venture capital is a standard example: each funding round is paid only if the start-up "
              f"has met the milestones of the round before.</p>"),
        losning=("<p><b>Sunk cost.</b> Money already spent cannot be recovered by any decision taken now, so it "
                 "cannot affect which decision is best. Kurbatov: at stage 2 «you should ignore the previous "
                 "stages». Going on can still be right, but only because the expected value of what lies ahead "
                 "beats its cost.</p>"
                 "<p><b>Why staging pays.</b> Each stage buys information and the right to continue. That is an "
                 "option: you exercise it (pay for the next stage) only in the branch where it pays. The total cost "
                 "and the overall chance of success are the same as when you commit; the expected cost is lower.</p>"
                 "<p><b>Examples Kurbatov gave in class:</b> drug development (trial phases), construction, venture "
                 "capital rounds, TV seasons (a pilot before a full season) and football contracts. Say what each "
                 "stage reveals.</p>"
                 "<p><b>Typical mistakes:</b> letting the sunk cost decide, saying staging raises the chance of "
                 "success (it does not) or naming an example without the information the stage reveals.</p>"
                 "<p><b>Remember:</b> decide each stage on what is still ahead of you.</p>"),
        kriterier=[
            "Rejects the argument: the stage 1 cost is sunk, spent whatever the firm does, so it plays no role at t = 1 (1 p)",
            "States the right decision rule at t = 1: go on only if the value of stage 2 and the payoff beat 0 (1 p)",
            "Explains why staging is worth more: an option to stop, so the expensive stage is paid only after a success "
            "(lower expected cost, same chance of success) (1 p)",
            "Gives a real example of staged financing (venture capital rounds, drug trials, construction, a TV pilot) "
            "and what a stage reveals (1 p)",
        ],
    )
    return ovelse(case, [a, b, c, d])


# ---------------------------------------------------------------------------
# ov-reo4 · Prosjekt priset med en omsatt tvilling (patent på et rentetre)
# ---------------------------------------------------------------------------
PATENT4 = ["a heart-valve coating", "a salmon-lice treatment", "an enzyme for paper mills",
           "a battery electrolyte", "a de-icing fluid for aircraft", "a bone-cement additive"]


@oppgave("ov-reo4", tema="realopsjon", tittel="A patent priced with a traded annuity", antall=12,
         sjanger="d3-realrho", kilde="Lecture 11 patent (slides 14–15), H2024 E6")
def _(r):
    fi, val = _valuta(r)
    prod = r.choice(PATENT4)
    C = r.choice([1, 1.2, 1.5, 2, 2.5, 3])
    N = r.choice([8, 10, 12, 14, 15, 16, 18, 20])
    y = r.choice([0.045, 0.05, 0.055, 0.06, 0.065, 0.07, 0.075, 0.08])
    rf = round(y - r.choice([0.0, 0.005, 0.01, 0.015, 0.02]), 4)
    rl = round(y - r.choice([0.015, 0.02, 0.025, 0.03]), 4)
    rh = round(y + r.choice([0.015, 0.02, 0.025, 0.03]), 4)
    if (y, rf, rl, rh, N) in ((0.06, 0.04, 0.035, 0.09, 15), (0.08, 0.06, 0.05, 0.1, 17)):
        raise Avvis("samme rentetre som stige 109 eller forelesningens patent")
    S0, Su, Sd = A(y, N), 1 + A(rl, N - 1), 1 + A(rh, N - 1)
    rho = ((1 + rf) * S0 - Sd) / (Su - Sd)
    if not 0.15 < rho < 0.85:
        raise Avvis("ρ utenfor et godt intervall")
    lo, hi = C * A(y, N), C * A(rl, N - 1)
    mulige = [x / 2 for x in range(int(lo * 2) + 1, int(hi * 2) + 1)
              if C * A(y, N) - x / 2 < -0.05 * x / 2 and C * A(rl, N - 1) - x / 2 > 0.03 * x / 2]
    if not mulige:
        raise Avvis("ingen investering passer")
    I = r.choice(mulige)
    vf = 1 + rf

    now = C * A(y, N) - I
    u1 = C * A(rl, N - 1) - I
    d1 = C * A(rh, N - 1) - I
    u0, d0 = u1 / vf, d1 / vf
    C0 = rho * u0
    if d1 >= 0:
        raise Avvis("den høye renten må gi negativ NPV")

    # viste tall (fire desimaler)
    aT = rund(A(y, N), 4)
    au = rund(A(rl, N - 1), 4)
    ad = rund(A(rh, N - 1), 4)
    now_v = rund(C * aT - I, 4)
    u1_v, d1_v = rund(C * au - I, 4), rund(C * ad - I, 4)
    u0_v, d0_v = rund(u1_v / vf, 4), rund(d1_v / vf, 4)
    S0_v, Su_v, Sd_v = aT, rund(1 + au, 4), rund(1 + ad, 4)
    gS0_v = rund(vf * S0_v, 4)
    rho_v = rund((gS0_v - Sd_v) / (Su_v - Sd_v), 4)
    C0_v = rund(rho_v * u0_v, 4)
    _sjekk(now_v, now, abs_=0.0005)
    _sjekk(u0_v, u0, abs_=0.0005)
    _sjekk(rho_v, rho)
    _sjekk(C0_v, C0)

    # feller
    fa_rf = C * A(rf, N) - I if rf != y else None
    fa_T1 = C * A(y, N - 1) - I
    fa_evig = C / y - I
    fa_rf = _nær_bort(now, fa_rf, rel=0.004, abs_=0.0005)
    _ulik(now, fa_T1, fa_evig, abs_=0.0005)
    fu_lav = u1 / (1 + rl)
    fu_t1 = u1
    fu_T = (C * A(rl, N) - I) / vf
    _ulik(u0, fu_lav, fu_t1, fu_T, abs_=0.0005)
    fd_hoy = d1 / (1 + rh)
    fd_t1 = d1
    _ulik(d0, fd_hoy, fd_t1, abs_=0.0005)
    fr_y = ((1 + y) * S0 - Sd) / (Su - Sd) if rf != y else None
    fr_uten1 = ((1 + rf) * S0 - (Sd - 1)) / ((Su - 1) - (Sd - 1))
    fr_snu = 1 - rho
    fr_y = _nær_bort(rho, fr_y)
    fr_uten1 = fr_uten1 if 0 < fr_uten1 < 1.5 else None
    _ulik(rho, fr_snu, rel=0.01)
    fr_uten1 = _nær_bort(rho, fr_uten1)
    fc_snu = (1 - rho) * u0
    fc_beh = rho * u0 + (1 - rho) * d0
    fc_neg = C0 - now
    _ulik(C0, fc_snu, fc_beh, fc_neg, abs_=0.0005)

    M = lambda x: _mill(x, val)              # noqa: E731
    enh = "NOK million" if val == "NOK" else "$ million"
    valtekst = "NOK 1" if val == "NOK" else "$1"
    case = (f"<p>{fi} owns a patent on {prod}. If it builds a production line for {M(I)}, a partner pays it a "
            f"fixed, risk-free royalty of {M(C)} a year until the patent expires at the end of year {N}. The first "
            f"royalty comes one year after the line is built. {fi} can build today or at t = 1, not later. If it "
            f"waits, it collects only the royalties for years 2 to {N}; the cost is still {M(I)}, paid at t = 1.</p>"
            f"<p>A traded risk-free annuity that pays {valtekst} at the end of each of the years 1 to {N} has a "
            f"yield of {_rt(y)} today. The one-year risk-free rate is {_rt(rf)}. At t = 1 the yields on all "
            f"maturities move for good to either {_rt(rl)} or {_rt(rh)}. Nobody knows the probabilities. Give "
            f"amounts (in {enh}) and probabilities with four decimals.</p>")

    # ---------------- (a)
    a = tall_del(
        "a", poeng=3,
        q=f"<p>What is the NPV of building the line today?</p>",
        svar=[_T("NPV<sub>now</sub>", now, enh, a=0.0005)],
        kort=(f"<p><b>NPV<sub>now</sub> = {_f4(now_v)}.</b> {_n(C)} × A({N}, {_rt(y)}) − {_n(I)} = {_n(C)} × "
              f"{_f4(aT)} − {_n(I)}. Negative: do not build today.</p>"),
        losning=(f"<p>The royalties are risk-free and fall on exactly the dates of the traded annuity, so they are worth "
                 f"{_n(C)} units of it. Price them at the annuity's yield of {_rt(y)}.</p>"
                 f"<p><b>Step 1: the annuity factor.</b> A({N}, {_rt(y)}) = [1 − {_vf(y)}<sup>−{N}</sup>]/{_des(y)} = "
                 f"{_f4(aT)}.</p>"
                 f"<p><b>Step 2: NPV.</b> {_n(C)} × {_f4(aT)} − {_n(I)} = {_f4(C * aT)} − {_n(I)} = <b>{_f4(now_v)}</b>. "
                 f"Out of the money today: on the plain NPV rule {fi} would not build. That is not the end of the "
                 f"story, because the right to build at t = 1 is still worth something if rates may fall.</p>"
                 f"<p><b>First check.</b> A({N}, {_rt(y)}) must lie below the perpetuity factor 1/{_des(y)} = "
                 f"{_f4(1 / y)} and above {N}/{_vf(y)}<sup>{N}</sup> = {_f4(N / (1 + y) ** N)}, the value if every payment "
                 f"came at the end ✓.</p>"
                 f"<p><b>Remember:</b> the annuity formula is not on the formula sheet: A(n, r) = [1 − (1 + r)"
                 f"<sup>−n</sup>]/r.</p>"),
        feller=[F for F in [
            Felle(fa_rf, f"You discounted all {N} royalties at the one-year rate of {_rt(rf)}, which applies only to "
                         f"the first year.") if fa_rf is not None else None,
            Felle(fa_T1, f"You counted only {N - 1} royalties for a line built today."),
            Felle(fa_evig, f"You valued the royalty as a perpetuity, although the patent expires after year {N}."),
        ] if F is not None],
    )

    # ---------------- (b)
    b = tall_del(
        "b", poeng=4,
        q=(f"<p>Suppose {fi} waits and builds at t = 1. Measured today (t = 0), what is the NPV of building at t = 1 "
           f"if the yield falls to {_rt(rl)} and if it rises to {_rt(rh)}?</p>"),
        selvstendig=True,
        svar=[_T(f"NPV<sub>0</sub> at {_rt(rl)}", u0, enh, a=0.0005), _T(f"NPV<sub>0</sub> at {_rt(rh)}", d0, enh, a=0.0005)],
        kort=(f"<p><b>{_f4(u0_v)} and {_f4(d0_v)}.</b> At t = 1: {_n(C)} × A({N - 1}, {_rt(rl)}) − {_n(I)} = "
              f"{_f4(u1_v)} and {_n(C)} × A({N - 1}, {_rt(rh)}) − {_n(I)} = {_f4(d1_v)}; divide each by {_vf(rf)}.</p>"),
        losning=(f"<p>Waiting shifts the outlay to t = 1 but loses the year-1 royalty, because the patent still expires "
                 f"after year {N}: only {N - 1} royalties remain, years 2 to {N}. Value each state at t = 1 at that "
                 f"state's yield, then bring it back one year at the rate that applies from t = 0 to t = 1, the "
                 f"one-year rate of {_rt(rf)}.</p>"
                 f"<p><b>Step 1: low yield, {_rt(rl)}.</b> A({N - 1}, {_rt(rl)}) = {_f4(au)}, so {_n(C)} × {_f4(au)} − "
                 f"{_n(I)} = {_f4(u1_v)} at t = 1, or {_f4(u1_v)}/{_vf(rf)} = <b>{_f4(u0_v)}</b> today.</p>"
                 f"<p><b>Step 2: high yield, {_rt(rh)}.</b> A({N - 1}, {_rt(rh)}) = {_f4(ad)}, so {_n(C)} × {_f4(ad)} − "
                 f"{_n(I)} = {_f4(d1_v)} at t = 1, or <b>{_f4(d0_v)}</b> today.</p>"
                 f"<p><b>First check.</b> The low yield is the good state: a lower rate makes the same royalties worth "
                 f"more. In Kurbatov's patent example the up state was the lower rate too («the upper case is the 5%») ✓. Here "
                 f"{_f4(u0_v)} &gt; 0 &gt; "
                 f"{_f4(d0_v)}, so the decision at t = 1 depends on the state.</p>"
                 f"<p><b>Remember:</b> the first year is discounted at the one-year rate, not at {_rt(rl)} or {_rt(rh)}, "
                 f"which start at t = 1.</p>"),
        feller=[
            Felle(fu_lav, f"You discounted the first year at {_rt(rl)}, a yield that only applies from t = 1.", i=0),
            Felle(fu_t1, "This is the NPV at t = 1, not measured today.", i=0),
            Felle(fu_T, f"You counted {N} royalties for a line built at t = 1.", i=0),
            Felle(fd_hoy, f"You discounted the first year at {_rt(rh)}, a yield that only applies from t = 1.", i=1),
            Felle(fd_t1, "This is the NPV at t = 1, not measured today.", i=1),
        ],
    )

    # ---------------- (c)
    c = tall_del(
        "c", poeng=6,
        q=f"<p>Use the traded annuity to find the risk-neutral probability ρ that the yield falls to {_rt(rl)}.</p>",
        selvstendig=True,
        svar=[T("ρ", rho)],
        kort=(f"<p><b>ρ = {_f4(rho_v)}.</b> S<sub>0</sub> = A({N}, {_rt(y)}) = {_f4(S0_v)}; S<sub>u</sub> = 1 + "
              f"A({N - 1}, {_rt(rl)}) = {_f4(Su_v)}; S<sub>d</sub> = 1 + A({N - 1}, {_rt(rh)}) = {_f4(Sd_v)}. "
              f"ρ = ({_vf(rf)} × {_f4(S0_v)} − {_f4(Sd_v)})/({_f4(Su_v)} − {_f4(Sd_v)}).</p>"),
        losning=(f"<p>Nobody knows the probabilities, which should be a light bulb (Kurbatov): find a traded asset driven "
                 f"by the same uncertainty and back ρ out of its prices. ρ is the probability that makes the annuity "
                 f"earn exactly the one-year risk-free rate.</p>"
                 f"<p><b>Step 1: today.</b> S<sub>0</sub> = A({N}, {_rt(y)}) = {_f4(S0_v)}.</p>"
                 f"<p><b>Step 2: at t = 1.</b> The holder receives the year-1 payment of 1 and keeps {N - 1} payments, "
                 f"valued at the new yield. S<sub>u</sub> = 1 + {_f4(au)} = {_f4(Su_v)} and S<sub>d</sub> = 1 + "
                 f"{_f4(ad)} = {_f4(Sd_v)}. The payment at t = 1 belongs in S<sub>u</sub> and S<sub>d</sub>, as a "
                 f"dividend just paid belongs in a share's value.</p>"
                 f"<p><b>Step 3: ρ.</b> ρ = [(1 + r<sub>f</sub>)S<sub>0</sub> − S<sub>d</sub>]/(S<sub>u</sub> − "
                 f"S<sub>d</sub>) = ({_f4(gS0_v)} − {_f4(Sd_v)})/({_f4(Su_v)} − {_f4(Sd_v)}) = <b>{_f4(rho_v)}</b>, "
                 f"with r<sub>f</sub> = {_rt(rf)}, the one-year rate"
                 + (f", not today's {_rt(y)} yield.</p>" if rf != y else " (here equal to today's yield).</p>")
                 + f"<p><b>First check.</b> S<sub>d</sub> = {_f4(Sd_v)} &lt; {_vf(rf)} × S<sub>0</sub> = {_f4(gS0_v)} &lt; "
                 f"S<sub>u</sub> = {_f4(Su_v)}, so 0 &lt; ρ &lt; 1 ✓. Repricing the annuity, [ρS<sub>u</sub> + (1 − ρ)"
                 f"S<sub>d</sub>]/{_vf(rf)} = {_f4((rho_v * Su_v + (1 - rho_v) * Sd_v) / vf)} ≈ {_f4(S0_v)}, confirms "
                 f"only the arithmetic, since ρ is built to make it hold.</p>"
                 f"<p><b>Remember:</b> S<sub>0</sub>, S<sub>u</sub> and S<sub>d</sub> must price the same payments. "
                 f"The up state is the low yield.</p>"),
        feller=[F for F in [
            Felle(fr_y, f"You grew S<sub>0</sub> at today's {_rt(y)} yield, which is not what a risk-free investor "
                        f"earns over the first year.") if fr_y is not None else None,
            Felle(fr_uten1, "You left the year-1 payment out of S<sub>u</sub> and S<sub>d</sub>, although S<sub>0</sub> "
                            "includes it. All three must price the same payments.") if fr_uten1 is not None else None,
            Felle(fr_snu, f"This is the risk-neutral probability of the high yield. The question asks for the fall to "
                          f"{_rt(rl)}."),
        ] if F is not None],
    )

    # ---------------- (d)
    d = blandet_del(
        "d", poeng=4, tall_poeng=2,
        q=(f"<p>What is the value today of the right to wait, measured against the best {fi} can do today (build now "
           f"or do nothing)?</p>"),
        gitt=(f"<p>From (a) to (c): NPV<sub>now</sub> = {_f4(now_v)}; measured today, building at t = 1 gives "
              f"{_f4(u0_v)} at {_rt(rl)} and {_f4(d0_v)} at {_rt(rh)}; ρ = {_f4(rho_v)}.</p>"),
        svar=[_T("option to wait", C0, enh, a=0.0005)],
        tekst_ledd=f"Does {fi} build today or wait? Comment briefly.",
        setninger="Answer in at most two sentences.",
        kort=(f"<p><b>{_f4(C0_v)}: wait.</b> {_f4(rho_v)} × {_f4(u0_v)} + {_f4(1 - rho_v)} × 0 = {_f4(C0_v)}, minus "
              f"max(0, {_f4(now_v)}) = 0. The right is a call: {fi} builds only if yields fall, so it is worth "
              f"something although building today has a negative NPV.</p>"),
        losning=(f"<p>Waiting gives a call on the line built at t = 1, struck at the cost of {_n(I)}. In the high-yield "
                 f"state {fi} does not build, so that branch pays 0, not {_f4(d0_v)}.</p>"
                 f"<p><b>Step 1: the payoffs.</b> Measured today: {_f4(u0_v)} if yields fall, 0 if they rise.</p>"
                 f"<p><b>Step 2: value.</b> {_f4(rho_v)} × {_f4(u0_v)} = <b>{_f4(C0_v)}</b>. The same as "
                 f"[{_f4(rho_v)} × {_f4(u1_v)} + {_f4(1 - rho_v)} × 0]/{_vf(rf)}, since {_f4(u0_v)} already carries the "
                 f"discounting.</p>"
                 f"<p><b>Step 3: against the best today.</b> Building today gives {_f4(now_v)} &lt; 0, so the best today "
                 f"is to do nothing, worth 0. The option to wait is {_f4(C0_v)} − 0 = {_f4(C0_v)}: wait.</p>"
                 f"<p><b>First check.</b> Replicate the payoff at t = 1 ({_f4(u1_v)} or 0) with the annuity and the "
                 f"one-year bond: Δ = {_f4(u1_v)}/({_f4(Su_v)} − {_f4(Sd_v)}) = {_f4(u1_v / (Su_v - Sd_v))} annuities, "
                 f"B = −{_f4(Sd_v)} × Δ/{_vf(rf)}. Cost: {_f4(S0_v)}Δ + B = "
                 f"{_f4(S0_v * u1_v / (Su_v - Sd_v) - Sd_v * u1_v / (Su_v - Sd_v) / vf)} ✓. Replication uses the same "
                 f"prices as ρ, so it catches arithmetic slips only.</p>"
                 f"<p><b>Remember:</b> option to wait = value of waiting − max(0, NPV<sub>now</sub>). Compare with 0, "
                 f"never with a negative NPV.</p>"),
        kriterier=[
            f"Waits: the right to wait is worth {_f4(C0_v)} &gt; 0, while building today has a negative NPV ({_f4(now_v)}) (1 p)",
            f"Comments: the right is a call, {fi} builds only if yields fall and walks away otherwise, so a negative "
            f"NPV today does not make the opportunity worthless (1 p)",
        ],
        feller=[
            Felle(fc_snu, "You put 1 − ρ on the low-yield state."),
            Felle(fc_beh, f"You kept the high-yield branch's negative NPV, although nobody forces {fi} to build."),
            Felle(fc_neg, f"You subtracted the negative NPV of building today, which {fi} would never do."),
        ],
    )

    # ---------------- (e)
    e = tekst_del(
        "e", poeng=3,
        q=(f"<p>Waiting has a cost in this case. What is it? And why does {fi} not need the true probability that "
           f"yields fall to value the right?</p>"),
        setninger="Answer in at most three sentences.",
        selvstendig=True,
        kort=(f"<p>Waiting loses the year-1 royalty of {_n(C)}, because the patent expires after year {N} whatever "
              f"{fi} does; like a dividend on a stock, a lost cash flow pushes towards exercising early. The right's "
              f"payoff depends only on the yield, so it can be replicated with the traded annuity and the one-year "
              f"bond: it must cost what the replication costs. ρ is a pricing weight that already contains the "
              f"market's risk premium, so no forecast or risk-adjusted rate is needed.</p>"),
        losning=("<p><b>The cost of waiting.</b> With a fixed expiry date, every year of waiting removes a royalty. "
                 "Kurbatov's slides compare lost cash flows to dividends: a call on a stock that pays dividends may be "
                 "worth exercising early. The more the cash flow you give up, the less waiting is worth.</p>"
                 "<p><b>Why no true probability.</b> The payoff of the right at t = 1 is a function of the yield "
                 "only. Holding Δ annuities and borrowing B at the one-year rate gives the same payoff in both "
                 "states, so the right must cost the same as that portfolio. The market's beliefs and risk premium "
                 "are already inside the annuity's price, which is why ρ differs from the true probability and is "
                 "used with r<sub>f</sub>.</p>"
                 "<p><b>Typical mistakes:</b> calling ρ a forecast, using a true probability with r<sub>f</sub> when "
                 "the risk is priced, or saying waiting is free.</p>"
                 "<p><b>Remember:</b> no probabilities given means a light bulb: a traded twin, ρ and r<sub>f</sub>.</p>"),
        kriterier=[
            f"Names the cost: waiting loses the year-1 royalty of {_n(C)} because the patent expires at a fixed date "
            f"(like a dividend that favours exercising early) (1 p)",
            "Explains replication: the right's payoff depends only on the yield, so it can be copied with the traded "
            "annuity and the risk-free bond and must cost what the copy costs (1 p)",
            "Says ρ is a pricing weight that contains the risk premium, not a forecast, so it goes with r<sub>f</sub> "
            "and the true probability is not needed (1 p)",
        ],
    )
    return ovelse(case, [a, b, c, d, e])


# ---------------------------------------------------------------------------
# ov-reo5 · Exit-klausul med månedlige kontantstrømmer: ikke forpliktet og forpliktet
# ---------------------------------------------------------------------------
BUTIKK5 = [("a bakery-café", "café"), ("a bike shop", "shop"), ("a padel hall", "hall"), ("a sushi bar", "bar"),
           ("a fitness studio", "studio"), ("a bookshop", "shop"), ("a coffee bar", "bar"), ("a pet shop", "shop")]


@oppgave("ov-reo5", tema="realopsjon", tittel="A monthly exit clause: free or committed", antall=12,
         sjanger="d3-exit", kilde="Lecture 11 store (slide 16), H2025 E5 d, prove4 E5")
def _(r):
    fi, val = _valuta(r)
    sted, kort_navn = r.choice(BUTIKK5)
    rr = r.choice([0.05, 0.06, 0.07, 0.08])
    p = r.choice([0.4, 0.5, 0.5, 0.6])
    Nm = r.choice([12, 18, 24, 36])
    c = r.choice([8_000, 10_000, 12_000, 15_000])
    Rh = c + r.choice([4_000, 5_000, 6_000, 8_000])
    Rl = c - r.choice([1_500, 2_000, 2_500, 3_000])
    Cg, Cb = Rh - c, Rl - c
    q_ = 1 - p
    rm_eks = (1 + rr) ** (1 / 12) - 1
    rm = rund(rm_eks * 100, 4) / 100            # månedsrenten slik casen ber om: fire desimaler i prosent
    E = p * Cg + q_ * Cb
    aN = A(rm, Nm)

    def verdier(I):
        uten = E / rm - I
        g = Cg / rm - I
        b = Cb * aN - I
        return uten, g, b, p * g + q_ * b
    mulige = [I for I in range(200_000, 900_001, 50_000)
              if verdier(I)[0] < -0.03 * I and verdier(I)[3] > 0.03 * I]
    if not mulige:
        raise Avvis("ingen oppstartskostnad passer")
    I = r.choice(mulige)
    uten, g, b, med = verdier(I)
    hale = q_ * (-Cb / rm) / (1 + rm) ** Nm
    v_fri = med                                  # mot max(0, uten) = 0
    v_bundet = med - uten                        # mot den negative NPV-en
    if abs(v_bundet - hale) > 1:
        raise Avvis("halen og differansen skal stemme")
    # Samme kjede med eksakt månedsrente. Casen ber om renten avrundet til fire desimaler i prosent, men den
    # som regner med eksakt rente, skal også få rett (avviket kan bli større enn toleransen når NPV-en er en
    # liten differanse mellom store tall).
    uten_x = E / rm_eks - I
    b_x = Cb * A(rm_eks, Nm) - I
    med_x = p * (Cg / rm_eks - I) + q_ * b_x
    if uten_x >= 0 or med_x <= 0:
        raise Avvis("eksakt rente må gi samme beslutninger")
    bund_x = med_x - uten_x

    def _alt(v, x):
        return [x] if abs(x - v) > 1e-6 else None

    # viste tall
    a4 = rund(aN, 4)
    pvE = rund(E / rm, 0)
    uten_v = pvE - I
    pvg = rund(Cg / rm, 0)
    g_v = pvg - I
    tap_v = rund(-Cb * a4, 0)
    b_v = -I - tap_v
    med_v = rund(p * g_v + q_ * b_v, 0)
    bund_v = med_v - uten_v
    _sjekk(b_v, b)
    _sjekk(med_v, med)
    _sjekk(bund_v, v_bundet)
    hale_n = rund((-Cb / rm), 0)
    disk_n = rund((1 + rm) ** Nm, 4)

    # feller
    r12 = rr / 12
    fa_r12 = r12 * 100
    fa_aar = rr * 100
    fn_r12 = E / r12 - I
    fn_aar = E / rr - I
    _ulik(rm * 100, fa_r12, fa_aar, rel=0.004)
    _ulik(uten, fn_r12, fn_aar, abs_=5)
    fb_evig = Cb / rm - I
    fb_straks = -I
    fb_r12 = Cb * A(r12, Nm) - I
    _ulik(b, fb_evig, fb_straks, abs_=5)
    fb_r12 = _nær_bort(b, fb_r12, rel=0.004, abs_=5)
    fm_uten = uten
    fm_begge = p * (Cg * aN - I) + q_ * b
    fm_r12 = p * (Cg / r12 - I) + q_ * (Cb * A(r12, Nm) - I)
    _ulik(med, fm_uten, fm_begge, fm_r12, abs_=5)
    _ulik(v_fri, v_bundet, abs_=5)

    K = lambda x: _kr(x, val)               # noqa: E731
    H = lambda x: tall(x, 0)                # noqa: E731
    enh = "NOK" if val == "NOK" else "$"
    case = (f"<p>{fi} can open {sted} now or never: the location will be let to someone else. The fit-out costs "
            f"{K(I)} today and has no resale value. Running costs are {K(c)} a month. Monthly revenue will be "
            f"{K(Rh)} forever with probability {_sann(p)} or {K(Rl)} forever with probability {_sann(q_)}; {fi} "
            f"learns which right after opening. Cash flows come at the end of each month. Demand is unrelated to the "
            f"market, so discount at the risk-free rate of {_rt(rr)} a year (effective annual rate). The standard lease "
            f"runs forever and cannot be ended.</p>"
            f"<p>Use the monthly rate in percent rounded to four decimals (as in 0.1234%) throughout. Give amounts in "
            f"{enh} rounded to whole units.</p>")

    # ---------------- (a)
    a = tall_del(
        "a", poeng=3,
        q=f"<p>Find the monthly discount rate and the NPV of opening the {kort_navn} on the standard lease.</p>",
        svar=[T("r<sub>m</sub>", rm * 100, "%", alt=[rm_eks * 100]),
              _T("NPV<sub>standard</sub>", uten, enh, a=2, alt=_alt(uten, uten_x))],
        kort=(f"<p><b>r<sub>m</sub> = {tall(rm * 100, 4)}%, NPV = {K(uten_v)}.</b> {_vf(rr)}<sup>1/12</sup> − 1 = "
              f"{tall(rm * 100, 4)}%. Expected net cash flow {_sann(p)} × {H(Cg)} − {_sann(q_)} × {H(-Cb)} = {H(E)} a month: "
              f"{H(E)}/{tall(rm, 6)} − {H(I)} = {H(pvE)} − {H(I)}.</p>"),
        losning=(f"<p>The rate is annual, the cash flows monthly. Convert the rate by compounding, never by dividing by "
                 f"12: twelve months at r<sub>m</sub> must give the annual {_rt(rr)}.</p>"
                 f"<p><b>Step 1: monthly rate.</b> r<sub>m</sub> = {_vf(rr)}<sup>1/12</sup> − 1 = <b>{tall(rm * 100, 4)}%</b>.</p>"
                 f"<p><b>Step 2: net cash flows.</b> Good: {H(Rh)} − {H(c)} = {H(Cg)} a month. Bad: {H(Rl)} − {H(c)} = "
                 f"−{H(-Cb)}. Expected: {_sann(p)} × {H(Cg)} + {_sann(q_)} × (−{H(-Cb)}) = {H(E)}.</p>"
                 f"<p><b>Step 3: NPV on the standard lease.</b> The lease commits {fi} to both states forever: "
                 f"{H(E)}/{tall(rm, 6)} − {H(I)} = {H(pvE)} − {H(I)} = <b>{K(uten_v)}</b> &lt; 0. On these terms {fi} "
                 f"stays out.</p>"
                 f"<p><b>First check.</b> (1 + {tall(rm, 6)})<sup>12</sup> = {tall((1 + rm) ** 12, 4)} ≈ {_vf(rr)} ✓. "
                 f"{_rt(rr)}/12 = {tall(r12 * 100, 4)}% is too high, because monthly interest earns interest within "
                 f"the year.</p>"
                 f"<p><b>Remember:</b> r<sub>m</sub> = (1 + r)<sup>1/12</sup> − 1. A monthly perpetuity is C/r<sub>m</sub>.</p>"),
        feller=[
            Felle(fa_r12, f"You divided the annual rate by 12. Monthly interest compounds, so {_rt(rr)}/12 is too high.",
                  i=0),
            Felle(fa_aar, "You used the annual rate as a monthly rate.", i=0),
            Felle(fn_r12, f"This NPV uses {_rt(rr)}/12 as the monthly rate, which is too high.", i=1),
            Felle(fn_aar, "You discounted monthly cash flows at the annual rate, as if they came once a year.", i=1),
        ],
    )

    # ---------------- (b)
    b_del = tall_del(
        "b", poeng=5,
        q=(f"<p>The landlord offers a lease that {fi} may leave at no cost after {Nm} months; after that it gets "
           f"nothing. With this lease, what is the NPV of opening if the bad state occurs (fit-out included) and what "
           f"is the expected NPV of opening?</p>"),
        gitt=(f"<p>From (a): r<sub>m</sub> = {tall(rm * 100, 4)}%; the net cash flow is {H(Cg)} or −{H(-Cb)} a month; "
              f"on the standard lease NPV = {H(uten_v)}.</p>"),
        svar=[_T("NPV<sub>bad</sub>", b, enh, a=2, alt=_alt(b, b_x)),
              _T("NPV<sub>clause</sub>", med, enh, a=2, alt=_alt(med, med_x))],
        kort=(f"<p><b>NPV<sub>bad</sub> = {K(b_v)}, NPV<sub>clause</sub> = {K(med_v)}: open.</b> A({Nm}, "
              f"{tall(rm * 100, 4)}%) = {_f4(a4)}; bad: −{H(-Cb)} × {_f4(a4)} − {H(I)}. Good: {H(Cg)}/{tall(rm, 6)} − "
              f"{H(I)} = {H(g_v)}. {_sann(p)} × {_par(g_v, 0)} + {_sann(q_)} × {_par(b_v, 0)}.</p>"),
        losning=(f"<p>{fi} still opens before it knows the state, so it pays {H(I)} and bears the first {Nm} months in "
                 f"both states. At month {Nm} in the bad state, staying is worth −{H(-Cb)}/{tall(rm, 6)} = "
                 f"−{H(hale_n)} and leaving 0, so {fi} leaves. Compare with 0, not with the negative value of "
                 f"staying: forgetting this escape is the mistake Kurbatov saw ChatGPT make, which «treated the "
                 f"negative value as given».</p>"
                 f"<p><b>Step 1: the good state.</b> {fi} never leaves: {H(Cg)}/{tall(rm, 6)} − {H(I)} = {H(pvg)} − {H(I)} "
                 f"= {H(g_v)}.</p>"
                 f"<p><b>Step 2: the bad state.</b> A({Nm}, {tall(rm * 100, 4)}%) = [1 − (1 + {tall(rm, 6)})<sup>−{Nm}</sup>]/"
                 f"{tall(rm, 6)} = {_f4(a4)}. NPV<sub>bad</sub> = −{H(-Cb)} × {_f4(a4)} − {H(I)} = −{H(tap_v)} − {H(I)} = "
                 f"<b>{K(b_v)}</b>.</p>"
                 f"<p><b>Step 3: expected NPV.</b> {_sann(p)} × {_par(g_v, 0)} + {_sann(q_)} × {_par(b_v, 0)} = "
                 f"<b>{K(med_v)}</b> &gt; 0: open.</p>"
                 f"<p><b>First check.</b> The clause removes the bad state's losses after month {Nm}: {H(hale_n)} at month "
                 f"{Nm}, or {H(hale_n)}/{_f4(disk_n)} = {H(hale_n / disk_n)} today. {_sann(q_)} × {H(hale_n / disk_n)} = "
                 f"{H(q_ * hale_n / disk_n)}. Then {H(uten_v)} + {H(q_ * hale_n / disk_n)} = "
                 f"{H(uten_v + q_ * hale_n / disk_n)} ✓ (up to rounding).</p>"
                 f"<p><b>Remember:</b> the clause turns the bad state's perpetuity of losses into a {Nm}-month annuity.</p>"),
        feller=[F for F in [
            Felle(fb_evig, "You kept the losses forever, as if there were no clause.", i=0),
            Felle(fb_straks, f"You let {fi} leave at once, although the lease binds it for {Nm} months.", i=0),
            Felle(fb_r12, f"You used {_rt(rr)}/12 as the monthly rate.", i=0) if fb_r12 is not None else None,
            Felle(fm_uten, "This is the NPV on the standard lease: the bad state still loses money forever.", i=1),
            Felle(fm_begge, f"You cut the good state off after {Nm} months too. Nobody leaves a profitable shop.", i=1),
            Felle(fm_r12, f"This NPV uses {_rt(rr)}/12 as the monthly rate, which is too high.", i=1),
        ] if F is not None],
    )

    # ---------------- (c)
    c_del = blandet_del(
        "c", poeng=4, tall_poeng=2,
        q=(f"<p>{fi} has signed nothing yet and can simply stay out. How much is the clause worth to {fi}?</p>"),
        gitt=f"<p>From (a) and (b): NPV = {H(uten_v)} on the standard lease and {H(med_v)} with the clause.</p>",
        svar=[_T("value of the clause, free", v_fri, enh, a=2, alt=_alt(v_fri, med_x))],
        tekst_ledd="Why do you measure it this way?",
        setninger="Answer in at most two sentences.",
        kort=(f"<p><b>{K(med_v)}.</b> {H(med_v)} − max(0, {H(uten_v)}) = {H(med_v)} − 0. Free to stay out, {fi} would "
              f"not open on the standard lease, so its alternative is 0, not {H(uten_v)}.</p>"),
        losning=(f"<p>The value of an option is what it adds to the best you can do without it. Without the clause, "
                 f"the best {fi} can do is to stay out, worth 0.</p>"
                 f"<p><b>Step 1: the best alternative.</b> max(0, {H(uten_v)}) = 0.</p>"
                 f"<p><b>Step 2: the value.</b> {H(med_v)} − 0 = <b>{K(med_v)}</b>.</p>"
                 f"<p><b>Why not {H(med_v)} − ({H(uten_v)})?</b> That subtracts the NPV of a {kort_navn} {fi} would never "
                 f"open. The first {H(-uten_v)} of that difference only lifts a negative NPV to 0, which {fi} gets for "
                 f"free by staying out. Kurbatov's words in the wrap-up support this: the option is priced against the "
                 f"baseline case, or against zero if the baseline is negative, since then «we don't have to commit, "
                 f"we just experience zero». Kurbatov's store in lecture 11 is this case: on standard terms it would not be "
                 f"opened, so the clause is worth the whole NPV with the clause, 108 588 on the slide.</p>"
                 f"<p><b>Remember:</b> value of the clause = max(0, NPV<sub>with</sub>) − max(0, NPV<sub>without</sub>) "
                 f"for a firm that is free to stay out.</p>"),
        kriterier=[
            f"Uses the best alternative without the clause, staying out (0), because {fi} would not open on the "
            f"standard lease (1 p)",
            f"Says why subtracting the negative NPV ({H(uten_v)}) is wrong here: {fi} is not forced to open, so that "
            f"loss would never be suffered (1 p)",
        ],
        feller=[
            Felle(v_bundet, f"This is the clause's value to a firm that is obliged to open. {fi} has signed "
                            f"nothing."),
        ],
    )

    # ---------------- (d)
    d_del = blandet_del(
        "d", poeng=5, tall_poeng=2,
        q=(f"<p>Suppose instead that {fi} has already signed a franchise agreement that obliges it to open the "
           f"{kort_navn} now, on the standard lease unless the clause is added. How much is the clause worth now?</p>"),
        gitt=f"<p>From (a) and (b): NPV = {H(uten_v)} on the standard lease and {H(med_v)} with the clause.</p>",
        svar=[_T("value of the clause, committed", v_bundet, enh, a=2, alt=_alt(v_bundet, bund_x))],
        tekst_ledd="Why is this answer different from the value to a firm that is free to stay out?",
        setninger="Answer in at most three sentences.",
        kort=(f"<p><b>{K(bund_v)}.</b> Committed, the alternative is the standard lease: {H(med_v)} − ({H(uten_v)}). "
              f"The clause removes the same losses after month {Nm} in both cases; only the baseline differs. A free "
              f"firm avoids the {H(uten_v)} by staying out, a committed firm cannot.</p>"),
        losning=(f"<p>This is not the situation in Kurbatov's store in lecture 11, which was free to stay out. Here "
                 f"{fi} must open whatever happens, so the alternative to the clause is the forced opening on the "
                 f"standard lease. The rule is the same as in (c): compare with the best alternative without the "
                 f"clause.</p>"
                 f"<p><b>Step 1: the alternative.</b> Open on the standard lease: {H(uten_v)}.</p>"
                 f"<p><b>Step 2: the value.</b> {H(med_v)} − ({H(uten_v)}) = <b>{K(bund_v)}</b>.</p>"
                 f"<p><b>First check.</b> This must equal the value today of the losses the clause removes: "
                 f"{_sann(q_)} × {H(hale_n)}/{_f4(disk_n)} = {H(q_ * hale_n / disk_n)} ✓ (up to rounding). That number "
                 f"never uses the free firm's 0, so it shows that the clause itself is the same in both cases.</p>"
                 f"<p><b>Why (c) and (d) differ.</b> The gap is {H(bund_v)} − {H(med_v)} = {H(-uten_v)}, exactly the loss a "
                 f"committed firm cannot avoid without the clause and a free firm avoids by staying out.</p>"
                 f"<p><b>Remember:</b> first ask whether the firm is committed. Free: subtract max(0, NPV<sub>without</sub>). "
                 f"Committed: subtract NPV<sub>without</sub>, even when it is negative.</p>"),
        kriterier=[
            f"Uses the committed baseline: the alternative is opening on the standard lease, so the value is "
            f"{H(med_v)} − ({H(uten_v)}) (1 p)",
            f"Explains the gap of {H(-uten_v)}: a committed firm would really bear the negative NPV, while a free firm "
            f"avoids it by staying out (0) (1 p)",
            "States the common rule: an option is worth what it adds to the best alternative without it; the clause "
            "removes the same losses in both cases, only the baseline differs (1 p)",
        ],
        feller=[
            Felle(v_fri, f"You compared with staying out (0), which {fi} can no longer do after signing the "
                         f"agreement."),
        ],
    )
    return ovelse(case, [a, b_del, c_del, d_del])


# ---------------------------------------------------------------------------
# ov-reo6 · Vekstopsjon med reelle sannsynligheter: priset risiko og ikke priset risiko
# ---------------------------------------------------------------------------
ENHET6 = [("a first charging hub", "hub", "a second hub on the coast road"),
          ("a first fish-feed line", "line", "a second line for a new species"),
          ("a first data hall", "hall", "a second hall for a large cloud customer"),
          ("a first store", "store", "a second store in the next town"),
          ("a first ferry route", "route", "a second route to the outer islands"),
          ("a first solar park", "park", "a second park on the neighbouring plot")]
RENTER6 = [(0.04, 0.8, 0.05), (0.05, 0.6, 0.05), (0.04, 1.0, 0.05), (0.05, 1.0, 0.05), (0.03, 1.2, 0.05),
           (0.04, 1.2, 0.05), (0.05, 0.8, 0.05), (0.03, 1.0, 0.06), (0.04, 0.5, 0.06)]


@oppgave("ov-reo6", tema="realopsjon", tittel="A growth option: which discount rate?", antall=12,
         sjanger="d3-vente", kilde="Lecture 11 growth options (slide 14), PS3 E8, prove2 E6")
def _(r):
    fi, val = _valuta(r)
    forste, kort_navn, andre = r.choice(ENHET6)
    rf, beta, mrp = r.choice(RENTER6)
    rk = round(rf + beta * mrp, 4)
    p = r.choice([0.4, 0.5, 0.6])
    q_ = 1 - p
    C1 = r.choice([6, 8, 10, 12, 15])
    C2h = r.choice([15, 18, 20, 24, 30])
    C2l = r.choice([2, 3, 4, 5, 6])
    mulige = [x for x in range(50, 600, 10)
              if C2h / rk - x > 0.05 * x and C2l / rf - x < -0.05 * x]
    if not mulige:
        raise Avvis("ingen pris på andre enhet passer")
    I2 = r.choice(mulige)
    go_x = p * (C2h / rk - I2) / (1 + rk)          # vekstopsjonen ved kapitalkostnaden
    skal_apne = r.random() < 0.6
    kand = []
    for x in range(60, 400, 10):
        n1_x = C1 / rk - x
        if not (n1_x < -0.04 * x and C1 / rf - x > 0):
            continue
        tot_x = n1_x + go_x
        if (skal_apne and tot_x > 0.03 * x) or (not skal_apne and tot_x < -0.03 * x and go_x > 0.05 * x):
            kand.append(x)
    if not kand:
        raise Avvis("ingen pris på første enhet passer")
    I1 = r.choice(kand)

    def verdi(rate):
        n1 = C1 / rate - I1
        u = C2h / rate - I2
        d = C2l / rate - I2
        go = (p * max(u, 0) + q_ * max(d, 0)) / (1 + rate)
        return n1, u, d, go, n1 + go
    n1, u, d, go, tot = verdi(rk)
    n1f, uf, df, gof, totf = verdi(rf)
    if abs(tot) < 0.03 * I1 or totf <= 0:
        raise Avvis("totalen for nær null")
    apner = tot > 0

    # viste tall
    pv1 = rund(C1 / rk, 2)
    n1_v = rund(pv1 - I1, 2)
    pvu = rund(C2h / rk, 2)
    u_v = rund(pvu - I2, 2)
    go_v = rund(p * u_v / (1 + rk), 2)
    tot_v = rund(n1_v + go_v, 2)
    pv1f = rund(C1 / rf, 2)
    n1f_v = rund(pv1f - I1, 2)
    pvuf = rund(C2h / rf, 2)
    uf_v = rund(pvuf - I2, 2)
    gof_v = rund(p * uf_v / (1 + rf), 2)
    totf_v = rund(n1f_v + gof_v, 2)
    for v_, e_ in ((go_v, go), (tot_v, tot), (gof_v, gof), (totf_v, totf)):
        _sjekk(v_, e_, abs_=0.02)

    # feller
    fr_utenrf = beta * mrp * 100
    fr_rf = rf * 100
    _ulik(rk * 100, fr_utenrf, fr_rf, rel=0.004)
    fn_rf = n1f
    fn_forskudd = C1 * (1 + rk) / rk - I1
    _ulik(n1, fn_rf, fn_forskudd, abs_=0.05)
    fg_rf = p * uf / (1 + rf)                  # reelle sannsynligheter med r_f: A3-feilen
    fg_beh = (p * u + q_ * d) / (1 + rk)
    fg_udisk = p * u
    _ulik(go, fg_rf, fg_beh, fg_udisk, abs_=0.05)
    ft_bare1 = n1
    ft_blandet = n1 + fg_rf
    _ulik(tot, ft_bare1, ft_blandet, abs_=0.05)
    fc_r = go
    fc_gammel1 = n1 + gof
    fc_beh = (p * uf + q_ * df) / (1 + rf)
    _ulik(gof, fc_r, fc_beh, abs_=0.05)
    _ulik(totf, tot, fc_gammel1, abs_=0.05)

    M = lambda x: _mill(x, val)              # noqa: E731
    enh = "NOK million" if val == "NOK" else "$ million"
    case = (f"<p>{fi} can open {forste} today for {M(I1)}. It earns an expected {M(C1)} a year forever, the first "
            f"at t = 1. Opening it also gives {fi} the right, at t = 1 only, to open {andre} for {M(I2)}. That second "
            f"step pays only if demand turns out high, which {fi} learns at t = 1: with probability {_sann(p)} it "
            f"earns {M(C2h)} a year forever from t = 2, otherwise {M(C2l)} a year forever. Without the first "
            f"{kort_navn}, the second cannot be opened.</p>"
            f"<p>Demand moves with the business cycle: the project's cash flows have a beta of {tall(beta, 1)}. The "
            f"risk-free rate is {_rt(rf)} and the market risk premium {_rt(mrp)}. Use the CAPM cost of capital for "
            f"all of the project's cash flows. Give rates in percent with two decimals and amounts in {enh} with "
            f"two decimals.</p>")

    # ---------------- (a)
    a = tall_del(
        "a", poeng=3,
        q=f"<p>Find the project's cost of capital and the NPV of the first {kort_navn} on its own.</p>",
        svar=[T("r", rk * 100, "%"), _T("NPV<sub>1</sub>", n1, enh)],
        kort=(f"<p><b>r = {pst(rk, 2)}, NPV<sub>1</sub> = {_m(n1_v)}.</b> r = {_rt(rf)} + {tall(beta, 1)} × {_rt(mrp)}; "
              f"{_n(C1)}/{tall(rk, 2)} − {_n(I1)} = {_m(pv1)} − {_n(I1)}.</p>"),
        losning=(f"<p>Real probabilities and expected cash flows are discounted at the cost of capital. The risk here "
                 f"is priced (β = {tall(beta, 1)}), so that rate is above r<sub>f</sub>.</p>"
                 f"<p><b>Step 1: CAPM.</b> r = r<sub>f</sub> + β × MRP = {_rt(rf)} + {tall(beta, 1)} × {_rt(mrp)} = "
                 f"<b>{pst(rk, 2)}</b>.</p>"
                 f"<p><b>Step 2: the first {kort_navn} alone.</b> {_n(C1)}/{tall(rk, 2)} − {_n(I1)} = {_m(pv1)} − {_n(I1)} = "
                 f"<b>{_m(n1_v)}</b>. On its own it destroys value, so a plain NPV analysis would reject it. Whether "
                 f"{fi} should still open it depends on what the right to the second step is worth.</p>"
                 f"<p><b>First check.</b> The same perpetuity at r<sub>f</sub> would be worth {_n(C1)}/{tall(rf, 2)} = "
                 f"{_m(pv1f)}. A priced risk must make it worth less. It does ✓.</p>"
                 f"<p><b>Remember:</b> r<sub>f</sub> is the cost of capital only when β = 0.</p>"),
        feller=[F for F in [
            Felle(fr_utenrf, "You left out the risk-free rate in the CAPM.", i=0)
            if abs(fr_utenrf - fr_rf) > 1e-9 else
            Felle(fr_rf, "You used only one of the two terms in the CAPM.", i=0),
            Felle(fr_rf, f"You used the risk-free rate. The cash flows have a beta of {tall(beta, 1)}, so their risk is "
                         f"priced.", i=0) if abs(fr_utenrf - fr_rf) > 1e-9 else None,
            Felle(fn_rf, "You discounted at the risk-free rate, although the risk is priced.", i=1),
            Felle(fn_forskudd, "You let the first cash flow come today, although the case puts it at t = 1.", i=1),
        ] if F is not None],
    )

    # ---------------- (b)
    if apner:
        krit_b = [
            f"Opens the first {kort_navn}: the growth option ({_m(go_v)}) outweighs its negative stand-alone NPV "
            f"({_m(n1_v)}), so the total NPV is {_m(tot_v)} &gt; 0 (1 p)",
            f"Explains: the first {kort_navn} buys a call on the second, used only if demand is high, so the "
            f"low-demand state costs nothing extra (1 p)",
        ]
        valg = f"Open: the growth option outweighs the negative NPV of the first {kort_navn} alone."
    else:
        krit_b = [
            f"Does not open: even with the growth option ({_m(go_v)}) the total NPV is {_m(tot_v)} &lt; 0 at the "
            f"cost of capital (1 p)",
            f"Explains: the first {kort_navn} buys a call on the second, used only if demand is high, but at the "
            f"cost of capital that option is too small to cover the first step's loss (1 p)",
        ]
        valg = f"Do not open: the growth option is too small to cover the first {kort_navn}'s loss."
    b = blandet_del(
        "b", poeng=5, tall_poeng=3,
        q=(f"<p>Find the value today of the right to open the second step and the NPV of opening the first "
           f"{kort_navn} including that right.</p>"),
        gitt=f"<p>From (a): r = {pst(rk, 2)} and NPV<sub>1</sub> = {_m(n1_v)}.</p>",
        svar=[_T("growth option", go, enh), _T("NPV<sub>total</sub>", tot, enh)],
        tekst_ledd=f"Should {fi} open the first {kort_navn}? Why?",
        setninger="Answer in at most two sentences.",
        kort=(f"<p><b>Option {_m(go_v)}, total {_m(tot_v)}.</b> At t = 1: high {_n(C2h)}/{tall(rk, 2)} − {_n(I2)} = "
              f"{_m(u_v)}, open; low {_m(d)}, do not. {_sann(p)} × {_m(u_v)}/{_vf(rk)} = {_m(go_v)}; {_m(n1_v)} + "
              f"{_m(go_v)} = {_m(tot_v)}. {valg}</p>"),
        losning=(f"<p>The second step is a call option: {fi} pays {_n(I2)} at t = 1 only if demand is high. Value it "
                 f"with the real probability and, since the risk is priced, the cost of capital.</p>"
                 f"<p><b>Step 1: at t = 1.</b> High demand: {_n(C2h)}/{tall(rk, 2)} − {_n(I2)} = {_m(pvu)} − {_n(I2)} = "
                 f"{_m(u_v)} &gt; 0, open. Low demand: {_n(C2l)}/{tall(rk, 2)} − {_n(I2)} = {_m(d)} &lt; 0, do not "
                 f"open: 0.</p>"
                 f"<p><b>Step 2: the option today.</b> ({_sann(p)} × {_m(u_v)} + {_sann(q_)} × 0)/{_vf(rk)} = "
                 f"<b>{_m(go_v)}</b>.</p>"
                 f"<p><b>Step 3: total.</b> {_m(n1_v)} + {_m(go_v)} = <b>{_m(tot_v)}</b>. "
                 + ("Positive: the first step is worth taking for the option it carries.</p>" if apner else
                    "Still negative: the option does not rescue the first step at this rate.</p>")
                 + f"<p><b>First check.</b> The max(·, 0) matters: keeping the low state's {_m(d)} would give "
                 f"{_m(fg_beh)} instead of {_m(go_v)}. An option is never worth less than 0 in a state where you can "
                 f"walk away ✓.</p>"
                 f"<p><b>A caution.</b> This is the course's decision-tree method: real probabilities with the "
                 f"project's cost of capital. Strictly, a call is riskier than the project, so a traded twin and "
                 f"risk-neutral probabilities would price it more exactly.</p>"
                 f"<p><b>Remember:</b> the max goes inside the expectation; the rate follows the risk.</p>"),
        kriterier=krit_b,
        feller=[
            Felle(fg_rf, f"You discounted the real probabilities at the risk-free rate, although the risk is priced "
                         f"(β = {tall(beta, 1)}).", i=0),
            Felle(fg_beh, "You kept the low-demand state's negative NPV, although nobody forces the second step.",
                  i=0),
            Felle(fg_udisk, "You did not discount the t = 1 value back to today.", i=0),
            Felle(ft_bare1, "This is the first step alone. The right to the second step comes with it.", i=1),
            Felle(ft_blandet, "Your growth option is discounted at the risk-free rate, although the risk is priced.",
                  i=1),
        ],
    )

    # ---------------- (c)
    c = tall_del(
        "c", poeng=4,
        q=(f"<p>Suppose instead that demand depends only on local factors that are unrelated to the market "
           f"(β = 0). Everything else is unchanged. What are the growth option and the NPV including it worth "
           f"now?</p>"),
        selvstendig=True,
        svar=[_T("growth option", gof, enh), _T("NPV<sub>total</sub>", totf, enh)],
        kort=(f"<p><b>Option {_m(gof_v)}, total {_m(totf_v)}.</b> With β = 0 the cost of capital is r<sub>f</sub> = "
              f"{_rt(rf)}: high {_n(C2h)}/{tall(rf, 2)} − {_n(I2)} = {_m(uf_v)}; {_sann(p)} × {_m(uf_v)}/{_vf(rf)} = "
              f"{_m(gof_v)}; first {kort_navn} {_n(C1)}/{tall(rf, 2)} − {_n(I1)} = {_m(n1f_v)}.</p>"),
        losning=(f"<p>With β = 0 the risk is not priced, so the cost of capital is r<sub>f</sub> and the real "
                 f"probabilities are discounted at {_rt(rf)}. Every cash flow of the project changes rate, the first "
                 f"{kort_navn} included.</p>"
                 f"<p><b>Step 1: at t = 1.</b> High: {_n(C2h)}/{tall(rf, 2)} − {_n(I2)} = {_m(pvuf)} − {_n(I2)} = "
                 f"{_m(uf_v)}, open. Low: {_n(C2l)}/{tall(rf, 2)} − {_n(I2)} = {_m(df)} &lt; 0, do not open.</p>"
                 f"<p><b>Step 2: the option.</b> {_sann(p)} × {_m(uf_v)}/{_vf(rf)} = <b>{_m(gof_v)}</b>.</p>"
                 f"<p><b>Step 3: total.</b> {_n(C1)}/{tall(rf, 2)} − {_n(I1)} = {_m(n1f_v)}, so {_m(n1f_v)} + {_m(gof_v)} = "
                 f"<b>{_m(totf_v)}</b>.</p>"
                 f"<p><b>First check.</b> A lower rate must raise every value: {_m(gof_v)} &gt; {_m(go_v)} and "
                 f"{_m(totf_v)} &gt; {_m(tot_v)} ✓. The growth option here is also what you get in (b) if you wrongly "
                 f"discount the real probabilities at r<sub>f</sub> although the risk is priced.</p>"
                 f"<p><b>Remember:</b> the same real probabilities give very different values depending on whether "
                 f"the risk is priced.</p>"),
        feller=[
            Felle(fc_r, f"You kept the CAPM rate of {pst(rk, 2)}, although β = 0 now.", i=0),
            Felle(fc_beh, "You kept the low-demand state's negative NPV, although nobody forces the second step.",
                  i=0),
            Felle(tot, f"This total keeps the cost of capital of {pst(rk, 2)}.", i=1),
            Felle(fc_gammel1, f"You moved the growth option to r<sub>f</sub> but kept the first {kort_navn}'s NPV at the "
                              f"CAPM rate.", i=1),
        ],
    )

    # ---------------- (d)
    kol_v = rund(n1_v + gof_v, 2)                  # kollegaen: første trinn ved CAPM-renten, opsjonen ved r_f
    if tot_v < 0 < kol_v:
        kol_tekst = "flips the decision from staying out to opening"
    elif tot_v < 0:
        kol_tekst = "overstates the value, although here the decision does not change"
    else:
        kol_tekst = "overstates the gain from opening"
    d_del = tekst_del(
        "d", poeng=4,
        q=(f"<p>Back to the original case (β = {tall(beta, 1)}). A colleague valued the second step with the same "
           f"probabilities but at the risk-free rate, arguing: «The probabilities are real, so no risk adjustment is "
           f"needed.» Explain what is wrong, when the risk-free rate would be right and why a growth option can "
           f"justify a first step with a negative NPV of its own. Use the numbers to show what the colleague's "
           f"error does to the decision.</p>"),
        setninger="Answer in at most four sentences.",
        gitt=(f"<p>From (a) to (c): at the CAPM rate NPV<sub>1</sub> = {_m(n1_v)}, the growth option is {_m(go_v)} and "
              f"the total {_m(tot_v)}. Discounted at r<sub>f</sub>, the growth option would be {_m(gof_v)}.</p>"),
        kort=(f"<p>Real probabilities say how likely each state is, not what the risk costs: with a beta of "
              f"{tall(beta, 1)} investors demand a premium, so expected cash flows must be discounted at the cost of "
              f"capital; r<sub>f</sub> ignores the premium and overstates the option ({_m(gof_v)} against "
              f"{_m(go_v)}). The risk-free rate is right only if the risk is not systematic (β = 0) or with "
              f"risk-neutral probabilities ρ, which already contain the premium. The first {kort_navn} buys a call "
              f"on the second, used only if demand is high, so its value can outweigh a negative stand-alone NPV. "
              f"Here the colleague gets {_m(n1_v)} + {_m(gof_v)} = {_m(kol_v)} against {_m(tot_v)} at the right "
              f"rate, so the error {kol_tekst}.</p>"),
        losning=("<p><b>The rule (Kurbatov, 2026).</b> Real probabilities are discounted at the cost of capital. That "
                 "cost of capital is r<sub>f</sub> only when the risk is not systematic, as in Kurbatov's store and "
                 "PS3 E8 («uncorrelated with the market so that you can discount at the risk free rate»). Pairing "
                 "real probabilities with r<sub>f</sub> when the risk is priced is the error. Risk-neutral "
                 "probabilities always go with r<sub>f</sub>.</p>"
                 "<p><b>Why it overstates.</b> A real probability is a forecast. The CAPM premium compensates for the "
                 "systematic risk of the cash flows. Dropping it treats a risky stream like a bond.</p>"
                 "<p><b>Growth options.</b> A first step can be a ticket to later projects. The ticket's value is the "
                 "call on those projects. Kurbatov's slides note that younger firms hold more of them, which helps "
                 "explain their higher returns; market conditions such as interest rates drive their value.</p>"
                 "<p><b>Typical mistakes:</b> «probabilities are real, so use r<sub>f</sub>»; averaging the second "
                 "step's NPV over both states (no max); valuing the first step without its option.</p>"
                 "<p><b>Remember:</b> real probabilities with the cost of capital, ρ with r<sub>f</sub>. Never mix "
                 "them.</p>"),
        kriterier=[
            "Says the argument is wrong: real probabilities measure likelihood, not the price of risk; with priced "
            "(systematic) risk the expected cash flows must be discounted at the cost of capital, so r<sub>f</sub> "
            "overstates the value (1 p)",
            "States when r<sub>f</sub> is right: when the risk is not systematic (β = 0) or with risk-neutral "
            "probabilities ρ (1 p)",
            "Explains the growth option: the first step buys a call on the second, used only in the good state, so "
            "its value can outweigh a negative stand-alone NPV (1 p)",
            f"Shows with the numbers what the error does: the colleague gets {_m(n1_v)} + {_m(gof_v)} = {_m(kol_v)} "
            f"against {_m(tot_v)} at the right rate, so the error {kol_tekst} (1 p)",
        ],
    )
    return ovelse(case, [a, b, c, d_del])
