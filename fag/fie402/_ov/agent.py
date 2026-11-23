# -*- coding: utf-8 -*-
"""Øv uten stopp FIE402: byråkostnader ved gjeld (tema «agent»). Skribent 2 (kapitalstruktur).

   ov-agt1  risikoskifting: verdier per tilstand med max(·, 0), hvem vinner og taper (Check 3),
            en nullverdi-sikring som eierne avviser (Check 4) og hvem som betaler på forhånd
            (H2024 E4, PS1 E7, HA1 E2 b, forelesning 4 s. 16–20)
   ov-agt2  gjeldsoverheng: positiv NPV avvist ved emisjon x = I/E_med, reforhandling av
            pålydende og hvorfor ny junior gjeld ikke hjelper (PS1 E6 MXK, V2021 P2,
            forelesning 4 s. 10–13)
   ov-agt3  «gambling for resurrection» nær mislighold: wealth transfer, likegyldighets-
            sannsynlighetene og utbytte finansiert med brannsalg av eiendeler
            (forelesning 4 s. 16–18 og 20, HA1 E2 c–d)

   Kurbatov pekte ut gjeldsoverheng, «gambling for resurrection» og «wealth transfer» som
   eksamenskandidater (signalfilen, funn 4 og 9): «the firm forgoes positive-NPV projects» og
   «wealth transfer» står i kriteriene.
"""
from ov_lib import *  # noqa: F401,F403

NOK_NAVN = ["Fossbakken Rederi AS", "Kvitsøy Havbruk AS", "Lindvik Bygg AS", "Rauma Gruve AS",
            "Sandøy Verft AS", "Tromøy Energi AS", "Vikna Fiskeri AS", "Øygarden Kjemi AS"]
USD_NAVN = ["Granite Bay Airlines", "Harrow Steel", "Kingsley Mining", "Lockwood Shipping",
            "Mercer Hill Resorts", "Norbury Drilling", "Ashby Retail", "Whitford Biotech"]


# ---------------------------------------------------------------- hjelpere
def _firma(r):
    val = r.choice(["NOK", "$"])
    return r.choice(NOK_NAVN if val == "NOK" else USD_NAVN), val


def _hel(x, eps=1e-9):
    return abs(x - round(x)) < eps


def _dx(x, maks=4):
    """Desimalene et tall trenger: 0 for heltall, ellers 2 til maks."""
    v = rund(x, maks)
    if _hel(v):
        return 0
    t = f"{v:.{maks}f}".rstrip("0")
    return max(2, len(t.split(".")[1]))


def _a(x, maks=4):
    """Et beløp eller tall uten valuta, med de desimalene det trenger: 1 600, 187.50, 1.6667."""
    return tall(x, _dx(x, maks))


def _m(x, val, d=None):
    """Et beløp i millioner med valuta: «NOK 1 350 million», «$187.50 million»."""
    return penger(x, _dx(x) if d is None else d, val) + NBSP + "million"


def _ps(x, val, d=None):
    """En pris per aksje: to desimaler når beløpet er helt i øre, ellers fire."""
    if d is None:
        d = 2 if _hel(x * 100, 1e-7) else 4
    return penger(x, d, val)


def _r(x, maks=4):
    """En rente gitt som brøk, vist i prosent med 2 til maks desimaler: 0.080625 → «8.0625%»."""
    p = x * 100
    return prosent_tekst(p, max(2, _dx(p, maks)))


def _w(x):
    """En vekt med de desimalene den trenger, høyst seks og minst to: 0.84375 → «0.84375»."""
    return tall(x, max(2, _dx(x, 6)))


def _b(x):
    """En beta med fire desimaler."""
    return tall(x, 4)


def _sjekk(vist, eksakt, rel=0.001):
    """Avvis varianten når kjeden regnet fra viste (avrundede) tall havner for langt fra den eksakte."""
    if abs(vist - eksakt) > rel * max(abs(eksakt), 1e-12):
        raise Avvis(f"avrundet kjede {vist} for langt fra eksakt {eksakt}")


def _ff(svar, feller):
    """Rydder fellene til en tall- eller blandetdel. Dropper None og rene duplikater (samme tekst).
       Avviser varianten når en felle tilfeldigvis treffer et godtatt svar, eller når to feller med
       ulik tekst gir samme tall (innenfor 2 × toleransen): da kan ikke studenten få riktig forklaring."""
    ut = []
    for f in feller:
        if f is None:
            continue
        t = svar[f.i]
        rel = t.rel if t.rel is not None else (None if t.abs is not None else STD_REL)
        for mål in [t.verdi] + list(t.alt):
            tol = max(t.abs or 0, (rel or 0) * abs(mål))
            if abs(f.verdi - mål) <= 2 * tol + 1e-12:
                raise Avvis(f"fella «{str(f.tekst)[:40]}» treffer svaret")
        dobbel = False
        for g in ut:
            if g.i != f.i:
                continue
            tol = max(t.abs or 0, (rel or 0) * abs(g.verdi))
            if abs(g.verdi - f.verdi) <= 2 * tol + 1e-12:
                if str(g.tekst) != str(f.tekst):
                    raise Avvis(f"to feller gir samme tall: «{str(g.tekst)[:30]}» og «{str(f.tekst)[:30]}»")
                dobbel = True
        if not dobbel:
            ut.append(f)
    return ut


_SETT = {}


def _ovelse(oid, case, deler):
    """ovelse(), men avviser en variant med samme svarvektor som en tidligere variant av oppgaven."""
    v = tuple(float(f"{t.verdi:.6g}") for d in deler for t in (d.get("svar") or []))
    sett = _SETT.setdefault(oid, set())
    if v in sett:
        raise Avvis("samme svar som en tidligere variant")
    sett.add(v)
    return ovelse(case, deler)


def _psg(verdier, val):
    """Priser per aksje i samme liste med felles desimaler: to når alle er hele i øre, ellers fire."""
    d = 2 if all(_hel(x * 100, 1e-7) for x in verdier) else 4
    return [penger(x, d, val) for x in verdier]


def _u(val, hva):
    """Enheten ved feltet: «NOK million», «$ per share»."""
    return f"{val} {hva}"


def _rente(rf):
    """Forutsetningen om diskontering i casen."""
    if rf == 0:
        return "Investors are risk neutral and the discount rate is zero, so every value is an expected payoff."
    return (f"All risk is diversifiable, so investors discount expected payoffs at the risk-free rate of "
            f"{_r(rf)}.")


def _pv(x, rf):
    """«x» eller «x/1.05», som tekst i løsningen."""
    return _a(x) if rf == 0 else f"{_a(x)}/{tall(1 + rf, 2)}"


# ===========================================================================
# ov-agt1 · Risikoskifting: max(·, 0) per tilstand, Check 3 og Check 4
# (H2024 E4, PS1 E7 Zymase, HA1 E2 b, forelesning 4 s. 16–20)
# ===========================================================================
@oppgave("ov-agt1", tema="agent", tittel="Risk shifting: who gains from the risky plan?", antall=12,
         sjanger="agent", kilde="H2024 E4, PS1 E7, HA1 E2 (b)")
def _(r):
    navn, val = _firma(r)
    p = r.choice([0.4, 0.5, 0.6])
    rf = r.choice([0.0, 0.0, 0.04, 0.05])
    d = 1 + rf
    K = r.choice([80, 100, 120, 150])
    a_ = r.choice([20, 30, 40, 50])
    b_ = r.choice([x for x in (10, 15, 20, 30) if _hel(x * (1 - p) / p * 2, 1e-7) and x * (1 - p) / p <= a_]
                  or [None])
    if b_ is None:
        raise Avvis("ingen pen sikring")
    c_ = r.choice([20, 30, 40, 60])
    SH, SL = K + a_, K - b_
    RH = SH + c_
    dd = r.choice([x for x in (20, 30, 40, 50, 60, 80) if (1 - p) * x - p * c_ >= 3 - 1e-9 and x <= 0.8 * SL]
                  or [None])
    if dd is None:
        raise Avvis("ingen passende bunn for plan R")
    RL = SL - dd
    boomkost = b_ * (1 - p) / p

    VS = (p * SH + (1 - p) * SL) / d
    DS = (p * K + (1 - p) * SL) / d
    ES = p * (SH - K) / d
    VR = (p * RH + (1 - p) * RL) / d
    DR = (p * K + (1 - p) * RL) / d
    ER = p * (RH - K) / d
    NPV = VR - VS
    dD, dE = DR - DS, ER - ES
    dDh = (1 - p) * b_ / d
    dEh = -dDh

    disk = "" if rf == 0 else f"/{tall(d, 2)}"

    def par(uttrykk):
        """Et forventningsuttrykk, med parentes og deling bare når det diskonteres."""
        return f"({uttrykk}){disk}" if rf else uttrykk

    tab = (f"<table><tr><th>Plan</th><th>Boom (probability {tall(p, 1)})</th><th>Bust (probability "
           f"{tall(1 - p, 1)})</th></tr>"
           f"<tr><td>S</td><td>{_a(SH)}</td><td>{_a(SL)}</td></tr>"
           f"<tr><td>R</td><td>{_a(RH)}</td><td>{_a(RL)}</td></tr></table>")
    case = (f"<p>{navn} has debt with a face value of {_m(K, val)}, due at t = 1. Its assets can be run under one of "
            f"two plans. Neither costs anything to start. The firm's value at t = 1 ({val} million) is:</p>{tab}"
            f"<p>Management acts in the interest of the shareholders and has not yet chosen a plan. Shareholders have "
            f"limited liability. {_rente(rf)} Give values in millions with two decimals.</p>")

    # ---------------- (a) plan S
    fa = [
        Felle((p * SH + (1 - p) * SL - K) / d, "You let the equity go negative in the bust. Limited liability "
                                               "floors the shareholders' payoff at zero.", i=2),
        Felle(K / d, f"You valued the debt as if it were always repaid. In the bust the firm is worth only "
                     f"{_a(SL)}, so the creditors get {_a(SL)}.", i=1),
    ]
    if rf > 0:
        fa += [Felle(p * SH + (1 - p) * SL, "You did not discount. The payoffs come at t = 1.", i=0),
               Felle(p * (SH - K), "You did not discount. The payoffs come at t = 1.", i=2)]
    sa = [T("V", VS, _u(val, "million")), T("D", DS, _u(val, "million")), T("E", ES, _u(val, "million"))]
    a = tall_del(
        "a", poeng=3,
        q="<p>Under plan S, what are the firm, the debt and the equity worth today?</p>",
        svar=sa,
        kort=(f"<p><b>V = {_a(VS)}, D = {_a(DS)}, E = {_a(ES)}.</b> D = min(V, {_a(K)}) and E = max(V − {_a(K)}, 0) "
              f"per state: D = {par(f'{tall(p, 1)} × {_a(K)} + {tall(1 - p, 1)} × {_a(SL)}')}.</p>"),
        losning=(f"<p>The creditors are paid first, up to the face value. The shareholders get what is left, never "
                 f"less than zero: equity is a call option on the firm with strike {_a(K)}.</p>"
                 f"<p><b>Step 1: the firm.</b> V = {par(f'{tall(p, 1)} × {_a(SH)} + {tall(1 - p, 1)} × {_a(SL)}')} = "
                 f"<b>{_a(VS)}</b>.</p>"
                 f"<p><b>Step 2: the debt.</b> Boom: min({_a(SH)}, {_a(K)}) = {_a(K)}. Bust: min({_a(SL)}, {_a(K)}) = "
                 f"{_a(SL)}. D = {par(f'{tall(p, 1)} × {_a(K)} + {tall(1 - p, 1)} × {_a(SL)}')} = <b>{_a(DS)}</b>.</p>"
                 f"<p><b>Step 3: the equity.</b> Boom: {_a(SH)} − {_a(K)} = {_a(a_)}. Bust: 0. E = "
                 f"{tall(p, 1)} × {_a(a_)}{disk} = <b>{_a(ES)}</b>.</p>"
                 f"<p><b>First check.</b> D + E = {_a(DS)} + {_a(ES)} = {_a(DS + ES)} = V, since the two claims share "
                 f"the firm in every state. It is an identity, so it catches arithmetic slips only.</p>"
                 f"<p><b>Remember:</b> value the claims state by state, then take the expectation. Never subtract the "
                 f"face value from the expected firm value.</p>"),
        feller=_ff(sa, fa),
    )

    # ---------------- (b) plan R og valget
    fb = [
        Felle((p * RH + (1 - p) * RL - K) / d, "You let the equity go negative in the bust. Limited liability "
                                               "floors it at zero.", i=2),
        Felle(K / d, f"You valued the debt as if it were always repaid. In the bust the creditors get only "
                     f"{_a(RL)}.", i=1),
    ]
    if rf > 0:
        fb.append(Felle(p * RH + (1 - p) * RL, "You did not discount. The payoffs come at t = 1.", i=0))
    sb = [T("V", VR, _u(val, "million")), T("D", DR, _u(val, "million")), T("E", ER, _u(val, "million"))]
    b = blandet_del(
        "b", poeng=5, tall_poeng=3,
        q="<p>Under plan R, what are the firm, the debt and the equity worth today? Which plan does management choose?</p>",
        gitt=f"<p>From (a): under plan S, V = {_a(VS)}, D = {_a(DS)} and E = {_a(ES)}.</p>",
        svar=sb,
        tekst_ledd="Which plan does management choose, and why?".replace("choose, and why?", "choose? Why?"),
        kort=(f"<p><b>V = {_a(VR)}, D = {_a(DR)}, E = {_a(ER)}: management chooses R.</b> E<sub>R</sub> = {_a(ER)} > "
              f"E<sub>S</sub> = {_a(ES)} although V<sub>R</sub> &lt; V<sub>S</sub>. Limited liability: the shareholders "
              f"keep the extra upside, the creditors take the extra downside.</p>"),
        losning=(f"<p>Plan R is riskier: a better boom and a worse bust. Both busts default, so the worse bust costs "
                 f"the shareholders nothing. It is the creditors who lose there.</p>"
                 f"<p><b>Step 1: the firm.</b> V = {par(f'{tall(p, 1)} × {_a(RH)} + {tall(1 - p, 1)} × {_a(RL)}')} = "
                 f"<b>{_a(VR)}</b>, below the {_a(VS)} of plan S.</p>"
                 f"<p><b>Step 2: the debt.</b> D = {par(f'{tall(p, 1)} × {_a(K)} + {tall(1 - p, 1)} × {_a(RL)}')} = "
                 f"<b>{_a(DR)}</b>.</p>"
                 f"<p><b>Step 3: the equity.</b> E = {tall(p, 1)} × ({_a(RH)} − {_a(K)}){disk} = <b>{_a(ER)}</b>.</p>"
                 f"<p><b>The choice.</b> Management maximises the equity value, not the firm value: {_a(ER)} > "
                 f"{_a(ES)}, so it chooses plan R. This is risk shifting (asset substitution). Equity is a call option "
                 f"on the firm. A call gains from risk.</p>"
                 f"<p><b>First check.</b> D + E = {_a(DR + ER)} = V<sub>R</sub>.</p>"
                 f"<p><b>Remember:</b> compare equity values to predict the choice and firm values to judge it.</p>"),
        kriterier=[
            "Chooses plan R because it gives the shareholders more, even though it lowers the value of the firm (1 p)",
            "Names the mechanism: limited liability makes equity a call on the firm, so the shareholders keep the "
            "upside while the creditors bear the extra downside (a wealth transfer from the creditors) (1 p)",
        ],
        feller=_ff(sb, fb),
    )

    # ---------------- (c) Check 3
    fc = [
        Felle(dE, "This is the shareholders' gain. The NPV of the switch is the change in the value of the whole "
                  "firm.", i=0),
        Felle(-NPV, "Wrong sign: the switch lowers the firm's value.", i=0),
        Felle(-dD, "Wrong sign: the creditors lose. Give a fall in value as a negative number.", i=1),
    ]
    if rf > 0:
        fc += [Felle(NPV * d, "You did not discount. The loss happens at t = 1.", i=0),
               Felle(dD * d, "You did not discount. The loss happens at t = 1.", i=1),
               Felle(dE * d, "You did not discount. The gain happens at t = 1.", i=2)]
    sc = [T("NPV", NPV, _u(val, "million")), T("ΔD", dD, _u(val, "million")), T("ΔE", dE, _u(val, "million"))]
    c = tall_del(
        "c", poeng=4,
        q=("<p>Find the NPV of choosing plan R over plan S and the change in the value of the debt and of the equity "
           "(negative for a fall).</p>"),
        gitt=(f"<p>From (a) and (b): plan S gives V = {_a(VS)}, D = {_a(DS)}, E = {_a(ES)}; plan R gives V = "
              f"{_a(VR)}, D = {_a(DR)}, E = {_a(ER)}.</p>"),
        svar=sc,
        kort=(f"<p><b>NPV = {_a(NPV)}, ΔD = {_a(dD)}, ΔE = +{_a(dE)}.</b> Check 3: {_a(dD)} + {_a(dE)} = "
              f"{_a(dD + dE)} = NPV.</p>"),
        losning=(f"<p>The switch destroys value, yet the shareholders gain, because the creditors lose more than the "
                 f"firm does. That gap is the wealth transfer. Kurbatov asks for it in the same words: who wins, who "
                 f"loses and by how much.</p>"
                 f"<p><b>Step 1: NPV.</b> {_a(VR)} − {_a(VS)} = <b>{_a(NPV)}</b>.</p>"
                 f"<p><b>Step 2: the creditors.</b> {_a(DR)} − {_a(DS)} = <b>{_a(dD)}</b>.</p>"
                 f"<p><b>Step 3: the shareholders.</b> {_a(ER)} − {_a(ES)} = <b>+{_a(dE)}</b>.</p>"
                 f"<p><b>Check 3.</b> The creditors' gain plus the shareholders' gain is the NPV: {_a(dD)} + "
                 f"{_a(dE)} = {_a(dD + dE)}. The creditors lose {_a(-dD)}: {_a(dE)} of it goes to the shareholders "
                 f"and {_a(-NPV)} simply disappears. The {_a(-NPV)} is the agency cost of the debt.</p>"
                 f"<p><b>Remember:</b> the agency cost is the value destroyed, V<sub>S</sub> − V<sub>R</sub>, not the "
                 f"wealth transferred.</p>"),
        feller=_ff(sc, fc),
    )

    # ---------------- (d) nullverdi-sikring og Check 4
    fd = [
        Felle(-dDh, "Wrong sign: the swap makes the debt safer, so its value rises.", i=0),
        Felle(-dEh, "Wrong sign: the shareholders give up the bust-state value they were not paying for.", i=1),
    ]
    if rf > 0:
        fd += [Felle(dDh * d, "You did not discount. The payments happen at t = 1.", i=0),
               Felle(dEh * d, "You did not discount. The payments happen at t = 1.", i=1)]
    sd = [T("ΔD", dDh, _u(val, "million")), T("ΔE", dEh, _u(val, "million"))]
    d_ = blandet_del(
        "d", poeng=4, tall_poeng=2,
        q=(f"<p>Suppose instead a covenant forces plan S. A bank offers a costless swap: it pays the firm {_a(b_)} in "
           f"the bust, and the firm pays the bank {_a(boomkost)} in the boom. Find the change in the value of the debt "
           f"and of the equity if the firm signs it.</p>").replace(" in the bust, and the firm", " in the bust. The firm"),
        gitt=f"<p>From (a): under plan S, D = {_a(DS)} and E = {_a(ES)}.</p>",
        svar=sd,
        tekst_ledd="Will the shareholders accept the swap? Explain.",
        kort=(f"<p><b>ΔD = +{_a(dDh)}, ΔE = {_a(dEh)}: they refuse.</b> The swap has zero NPV, but it lifts the bust "
              f"to {_a(K)}, so the debt becomes safe. Check 4: the creditors gain exactly what the shareholders "
              f"lose.</p>"),
        losning=(f"<p>The swap moves cash from the boom to the bust and is fairly priced: {tall(1 - p, 1)} × {_a(b_)} − "
                 f"{tall(p, 1)} × {_a(boomkost)} = 0. It creates no value. It only decides who bears the bust.</p>"
                 f"<p><b>Step 1: payoffs with the swap.</b> Boom: {_a(SH)} − {_a(boomkost)} = {_a(SH - boomkost)}. "
                 f"Bust: {_a(SL)} + {_a(b_)} = {_a(SL + b_)}, exactly the face value.</p>"
                 f"<p><b>Step 2: the debt.</b> Paid in full in both states: {_pv(K, rf)} = {_a(K / d)}. ΔD = {_a(K / d)} − "
                 f"{_a(DS)} = <b>+{_a(dDh)}</b>.</p>"
                 f"<p><b>Step 3: the equity.</b> Boom: {_a(SH - boomkost)} − {_a(K)} = {_a(SH - boomkost - K)}; bust: 0. "
                 f"E = {tall(p, 1)} × {_a(SH - boomkost - K)}{disk} = {_a(ES + dEh)}. ΔE = <b>{_a(dEh)}</b>.</p>"
                 f"<p><b>Check 4.</b> Total value is fixed (zero NPV), so the creditors' gain equals the shareholders' "
                 f"loss: {_a(dDh)} = {_a(-dEh)}.</p>"
                 f"<p><b>The answer.</b> The shareholders refuse. Without the swap the creditors absorb the bust; the "
                 f"swap hands the shareholders' option value to the creditors: a wealth transfer the other way.</p>"
                 f"<p><b>Remember:</b> levered shareholders reject risk reduction that makes the debt safer, even at "
                 f"zero NPV.</p>"),
        kriterier=[
            "Says the shareholders refuse: the swap lowers the equity value although it has zero NPV (1 p)",
            "Explains that the swap makes the debt safe, so the shareholders' option value goes to the creditors: the "
            "creditors' gain equals the shareholders' loss (Check 4, a wealth transfer) (1 p)",
        ],
        feller=_ff(sd, fd),
    )

    # ---------------- (e) hvem betaler på forhånd
    e = tekst_del(
        "e", poeng=3,
        q=(f"<p>The creditors lent the money before the plan was chosen, knowing that management would choose it "
           f"later. Who "
           f"bears the agency cost of the debt in the end? Name one contract term that reduces it and explain how it "
           f"works.</p>"),
        setninger="Answer in at most four sentences.",
        gitt=f"<p>From (c): choosing plan R destroys {_a(-NPV)} and costs the creditors {_a(-dD)}.</p>",
        kort=(f"<p>Rational creditors foresee plan R and pay only what the debt is worth under it, {_a(DR)} instead of "
              f"{_a(DS)}. So the shareholders bear the agency cost of {_a(-NPV)} up front, through a lower price for "
              f"their debt. A covenant that restricts the investment policy, or convertible debt that lets the "
              f"creditors share the upside, removes the gain from gambling and makes the debt cheaper.</p>"),
        losning=(f"<p>Ex post the shareholders gain at the creditors' expense. Ex ante the creditors are not naive. "
                 f"They price the debt for the plan management will actually choose, so the shareholders receive only "
                 f"{_a(DR)} for it. Together the owners end up with V<sub>R</sub> = {_a(VR)} instead of the "
                 f"V<sub>S</sub> = {_a(VS)} that a credible promise of plan S would give. They pay the agency cost "
                 f"themselves (lecture 4, slide 20).</p>"
                 f"<p>Remedies (Kurbatov's list): covenants and dividend restrictions that limit what management can "
                 f"do with the assets; convertible debt, which lets the creditors take part of the upside so that "
                 f"gambling no longer pays; and the possibility of renegotiation.</p>"
                 f"<p><b>Typical mistakes:</b> saying the creditors bear the cost in the end, or naming a covenant "
                 f"without saying why it helps the shareholders too.</p>"
                 f"<p><b>Remember:</b> the shareholders pay for risk shifting when they issue the debt. That is why "
                 f"they accept covenants.</p>"),
        kriterier=[
            f"States that rational creditors anticipate plan R and price the debt at its value under R, {_a(DR)} (1 p)",
            f"Concludes that the shareholders bear the agency cost of {_a(-NPV)} in the end, through the lower price of "
            f"the debt (1 p)",
            "Names a remedy with its mechanism: a covenant restricting the investment or payout policy, or convertible "
            "debt that gives the creditors the upside (1 p)",
        ],
    )
    return _ovelse("ov-agt1", case, [a, b, c, d_, e])


# ===========================================================================
# ov-agt2 · Gjeldsoverheng: emisjon x = I/E_med, reforhandling og hvorfor junior gjeld ikke hjelper
# (PS1 E6 MXK, V2021 P2, forelesning 4 s. 10–13)
# ===========================================================================
def _krav(p, H, L, K):
    """Gjeld og egenkapital (forventet utbetaling, ingen diskontering) med pålydende K."""
    D = p * min(H, K) + (1 - p) * min(L, K)
    E = p * max(H - K, 0) + (1 - p) * max(L - K, 0)
    return D, E


@oppgave("ov-agt2", tema="agent", tittel="Debt overhang: a good project nobody will fund", antall=12,
         sjanger="agent", kilde="PS1 E6, V2021 P2, lecture 4 slides 10 to 13")
def _(r):
    navn, val = _firma(r)
    p = r.choice([0.4, 0.5, 0.6])
    K = r.choice([100, 120, 150, 200])
    a_ = r.choice([30, 40, 50, 60, 80])
    c_ = r.choice([20, 30, 40])
    b_ = c_ + r.choice([10, 20, 30, 40])
    H, L = K + a_, K - b_
    if L < 0.3 * K:
        raise Avvis("for svak bunn")
    kand = [i for i in range(1, c_) if i > p * c_ + 0.99 and i < c_ - 2.99 and i % 2 == 0]
    if not kand:
        raise Avvis("ingen investering gir overheng")
    I = r.choice(kand)
    NPV = c_ - I
    D0, E0 = _krav(p, H, L, K)
    D1, E1 = _krav(p, H + c_, L + c_, K)
    if I > 0.8 * E1:
        raise Avvis("de nye aksjonærene ville fått nesten hele (eller mer enn hele) egenkapitalen")
    x = I / E1
    behold = E1 - I
    if behold >= E0:
        raise Avvis("eierne skulle sagt ja")
    # reforhandling: K' i hele femmere der begge får det strengt bedre
    mulige = []
    for Kn in range(5, K, 5):
        Dn, En = _krav(p, H + c_, L + c_, Kn)
        if Dn > D0 + 0.5 and En - I > E0 + 0.5:
            mulige.append(Kn)
    if not mulige:
        raise Avvis("ingen reforhandling hjelper begge")
    Kn = r.choice(mulige)
    Dn, En = _krav(p, H + c_, L + c_, Kn)
    xn = I / En
    gE = En - I - E0
    gD = Dn - D0
    eier = r.choice(["eier", "styre"])
    x4 = rund(x, 4)
    xn4 = rund(xn, 4)

    hvem = ("The firm is owned and run by its founder, who has no cash of her own." if eier == "eier" else
            "Management acts for the existing shareholders, who have no cash to put in.")
    tab = (f"<table><tr><th>State</th><th>Probability</th><th>Assets at t = 1 ({val} million)</th></tr>"
           f"<tr><td>Boom</td><td>{tall(p, 1)}</td><td>{_a(H)}</td></tr>"
           f"<tr><td>Bust</td><td>{tall(1 - p, 1)}</td><td>{_a(L)}</td></tr></table>")
    case = (f"<p>{navn} owes {_m(K, val)}, due at t = 1. Its assets will be worth:</p>{tab}"
            f"<p>{hvem} A new project costs {_m(I, val)} today and adds {_m(c_, val)} to the firm's value at t = 1 "
            f"in both states. The loan's covenants forbid new debt, so the project can only be financed by selling "
            f"new shares to outside investors at a fair price.</p>"
            f"<p>Investors are risk neutral and the discount rate is zero. Give values in millions with two decimals "
            f"and fractions with four decimals.</p>")

    # ---------------- (a) verdiene uten prosjektet
    fa = [
        Felle(K, f"You valued the debt at its face value. In the bust the creditors get only {_a(L)}.", i=0),
        Felle(p * H + (1 - p) * L - K, "You subtracted the face value from the expected firm value. Equity cannot "
                                       "be negative in the bust.", i=1),
    ]
    sa = [T("D", D0, _u(val, "million")), T("E", E0, _u(val, "million"))]
    a = tall_del(
        "a", poeng=3,
        q="<p>Without the project, what are the debt and the equity worth today?</p>",
        svar=sa,
        kort=(f"<p><b>D = {_a(D0)}, E = {_a(E0)}.</b> D = {tall(p, 1)} × {_a(K)} + {tall(1 - p, 1)} × {_a(L)}; "
              f"E = {tall(p, 1)} × ({_a(H)} − {_a(K)}).</p>"),
        losning=(f"<p>The creditors take the first {_a(K)} in each state. The shareholders keep the rest and have "
                 f"limited liability, so they get nothing in the bust. The debt is risky: it is worth less than its "
                 f"face value. That is what makes overhang possible.</p>"
                 f"<p><b>Step 1: the debt.</b> Boom: {_a(K)}. Bust: {_a(L)}. D = {tall(p, 1)} × {_a(K)} + "
                 f"{tall(1 - p, 1)} × {_a(L)} = <b>{_a(D0)}</b>.</p>"
                 f"<p><b>Step 2: the equity.</b> Boom: {_a(H)} − {_a(K)} = {_a(H - K)}. Bust: 0. E = {tall(p, 1)} × "
                 f"{_a(H - K)} = <b>{_a(E0)}</b>.</p>"
                 f"<p><b>First check.</b> D + E = {_a(D0 + E0)} = {tall(p, 1)} × {_a(H)} + {tall(1 - p, 1)} × "
                 f"{_a(L)}, the value of the firm. An identity, so it catches arithmetic slips only.</p>"
                 f"<p><b>Remember:</b> write each claim per state with min and max, then take the expectation.</p>"),
        feller=_ff(sa, fa),
    )

    # ---------------- (b) NPV og verdiene med prosjektet
    fb = [
        Felle(c_, "This is the project's payoff, not its NPV. Subtract the investment.", i=0),
        Felle(D0, "This is the debt without the project. With the project the bust pays the creditors more.", i=1),
        Felle(K, "You valued the debt at its face value. With the project the bust still falls short.", i=1),
        Felle(E1 - I, "You subtracted the investment. The question asks what the equity claim is worth with the "
                      "project, before anyone pays for it.", i=2),
        Felle(E0 + NPV, "You gave the whole NPV to the equity. In the bust the creditors take the project's payoff.",
              i=2),
    ]
    sb = [T("NPV", NPV, _u(val, "million")), T("D", D1, _u(val, "million")), T("E", E1, _u(val, "million"))]
    b = tall_del(
        "b", poeng=4,
        q=("<p>What is the project's NPV? If the project is done, what are the debt and the equity (old and new "
           "shareholders together) worth today?</p>"),
        gitt=f"<p>From (a): without the project D = {_a(D0)} and E = {_a(E0)}.</p>",
        svar=sb,
        kort=(f"<p><b>NPV = {_a(NPV)}, D = {_a(D1)}, E = {_a(E1)}.</b> The bust becomes {_a(L + c_)}, still below "
              f"{_a(K)}, so the creditors get it: D = {tall(p, 1)} × {_a(K)} + {tall(1 - p, 1)} × {_a(L + c_)}.</p>"),
        losning=(f"<p>The project is safe and has a positive NPV, so it should be done. The question is who gets its "
                 f"payoff. Value the claims with the project exactly as in (a), state by state, before anyone has paid "
                 f"for it.</p>"
                 f"<p><b>Step 1: NPV.</b> {_a(c_)} − {_a(I)} = <b>{_a(NPV)}</b>.</p>"
                 f"<p><b>Step 2: the debt.</b> Boom: {_a(H + c_)} ≥ {_a(K)}, paid in full. Bust: {_a(L + c_)} &lt; "
                 f"{_a(K)}, all to the creditors. D = {tall(p, 1)} × {_a(K)} + {tall(1 - p, 1)} × {_a(L + c_)} = "
                 f"<b>{_a(D1)}</b>, up {_a(D1 - D0)}.</p>"
                 f"<p><b>Step 3: the equity.</b> {tall(p, 1)} × ({_a(H + c_)} − {_a(K)}) = <b>{_a(E1)}</b>, up only "
                 f"{_a(E1 - E0)}.</p>"
                 f"<p><b>First check.</b> The project adds {_a(c_)} to the firm's value: {_a(D1 - D0)} to the "
                 f"creditors and {_a(E1 - E0)} to the equity. {_a(D1 - D0)} + {_a(E1 - E0)} = {_a(c_)}, so nothing is "
                 f"lost or double counted.</p>"
                 f"<p><b>Remember:</b> in a default state every extra unit of value goes to the creditors.</p>"),
        feller=_ff(sb, fb),
    )

    # ---------------- (c) emisjonen og avgjørelsen
    fc = [
        Felle(I / (E1 + I), "You added the investment to the equity value. The new money is spent on the project, "
                            "whose payoff is already in E.", i=0),
        Felle(I / E0, "You used the equity value without the project. The new shareholders buy into the firm with the "
                      "project.", i=0),
        Felle(E1, "This is the whole equity. The new shareholders own a fraction x of it.", i=1),
        Felle(E0 + NPV, "You assumed the existing shareholders get the whole NPV. The creditors take part of it.", i=1),
    ]
    sc = [T("x", x), T("kept", behold, _u(val, "million"))]
    hvem_t = "the founder" if eier == "eier" else "the existing shareholders"
    verb = "refuses" if eier == "eier" else "refuse"
    pron = "she" if eier == "eier" else "they"
    c = blandet_del(
        "c", poeng=5, tall_poeng=2,
        q=(f"<p>To raise {_m(I, val)}, what fraction x of the equity must the new investors receive? What is the stake of "
           f"{hvem_t} then worth?</p>"),
        gitt=f"<p>From (a) and (b): E = {_a(E0)} without the project and {_a(E1)} with it.</p>",
        svar=sc,
        tekst_ledd=f"Will {hvem_t} approve the project? Explain.",
        kort=(f"<p><b>x = {tall(x4, 4)}; the stake is worth {_a(behold)}, below {_a(E0)}: {pron} {verb}.</b> "
              f"x = {_a(I)}/{_a(E1)}. The firm forgoes a positive-NPV project because the creditors capture "
              f"{_a(D1 - D0)} of the {_a(c_)} it pays.</p>"),
        losning=(f"<p>Fair new investors must get a stake worth what they pay, so x × E = I. The existing "
                 f"shareholders keep (1 − x)E = E − I, exactly as if they had paid I themselves.</p>"
                 f"<p><b>Step 1: x.</b> x = {_a(I)}/{_a(E1)} = <b>{tall(x4, 4)}</b>.</p>"
                 f"<p><b>Step 2: what is kept.</b> (1 − {tall(x4, 4)}) × {_a(E1)} = <b>{_a(behold)}</b> = "
                 f"{_a(E1)} − {_a(I)}.</p>"
                 f"<p><b>Step 3: the decision.</b> {_a(behold)} &lt; {_a(E0)} without the project, so {hvem_t} "
                 f"{verb}. This is debt overhang: <b>the firm forgoes a positive-NPV project</b>. The new money is "
                 f"junior to the old debt, so the creditors capture {_a(D1 - D0)} of the project's payoff, more "
                 f"than the NPV of {_a(NPV)}.</p>"
                 f"<p><b>Check 3.</b> The creditors gain {_a(D1 - D0)}; {hvem_t} would gain {_a(behold - E0)}; "
                 f"the sum is {_a(D1 - D0 + behold - E0)} = NPV.</p>"
                 f"<p><b>Remember:</b> the key sentence is the firm forgoes positive-NPV projects. Then say why: the "
                 f"old creditors take the gain.</p>"),
        kriterier=[
            f"Concludes that the project is turned down because {_a(behold)} &lt; {_a(E0)}: the firm forgoes a "
            f"positive-NPV project (debt overhang) (1 p)",
            f"Explains why: the existing debt is risky and senior, so the creditors capture {_a(D1 - D0)} of the "
            f"project's payoff, more than its NPV (a wealth transfer to the creditors) (1 p)",
            "Notes that new shareholders pay a fair price, so selling shares is the same for the old owners as "
            "paying I themselves (1 p)",
        ],
        feller=_ff(sc, fc),
    )

    # ---------------- (d) reforhandling
    fd = [
        Felle(I / E1, "This is x at the old face value. With a lower face value the equity is worth more, so a "
                      "smaller fraction raises the money.", i=0),
        Felle(Dn - D1, "You compared with the debt value if the project were done at the old face value. Compare with "
                       "the debt today without the project.", i=1),
        Felle(K - Kn, "This is the cut in the face value, not the change in the value of the debt.", i=1),
        Felle(En - E0, "You forgot that the shareholders give a fraction x to the new investors, worth I.", i=2),
    ]
    sd = [T("x′", xn), T("creditors' gain", gD, _u(val, "million")),
          T("owners' gain", gE, _u(val, "million"))]
    hvem_k = "the founder's" if eier == "eier" else "the existing shareholders'"
    risikofri = Kn <= L + c_
    dtekst = (f"Both states now pay {_a(Kn)} in full, so the debt is risk-free: D = {_a(Dn)}" if risikofri else
              f"D = {tall(p, 1)} × {_a(Kn)} + {tall(1 - p, 1)} × {_a(L + c_)} = {_a(Dn)}")
    etekst = (f"E = {tall(p, 1)} × {_a(H + c_ - Kn)} + {tall(1 - p, 1)} × {_a(L + c_ - Kn)} = {_a(En)}" if risikofri else
              f"E = {tall(p, 1)} × ({_a(H + c_)} − {_a(Kn)}) = {_a(En)}")
    d = tall_del(
        "d", poeng=4,
        q=(f"<p>The creditors offer to cut the face value from {_a(K)} to {_a(Kn)} if the project goes ahead, financed "
           f"as in (c). Find the new fraction x′ for the new investors, the creditors' gain and {hvem_k} gain, both "
           f"measured against the values without the project.</p>"),
        gitt=(f"<p>From (a): without the project D = {_a(D0)} and E = {_a(E0)}. From (b): NPV = {_a(NPV)}.</p>"),
        svar=sd,
        kort=(f"<p><b>x′ = {tall(xn4, 4)}; creditors +{_a(gD)}, owners +{_a(gE)}.</b> {etekst}; x′ = "
              f"{_a(I)}/{_a(En)}. Check 3: {_a(gD)} + {_a(gE)} = {_a(NPV)} = NPV.</p>"),
        losning=(f"<p>Renegotiation trades part of a claim the creditors cannot collect anyway for a project that "
                 f"raises the firm's value. A lower face value leaves more of the project's payoff to the "
                 f"shareholders, so the project pays for them again.</p>"
                 f"<p><b>Step 1: the debt.</b> {dtekst}. The creditors gain {_a(Dn)} − {_a(D0)} = <b>{_a(gD)}</b>.</p>"
                 f"<p><b>Step 2: the equity and x′.</b> {etekst}. x′ = {_a(I)}/{_a(En)} = <b>{tall(xn4, 4)}</b>.</p>"
                 f"<p><b>Step 3: the shareholders.</b> They keep {_a(En)} − {_a(I)} = {_a(En - I)}, against {_a(E0)} "
                 f"without the project: a gain of <b>{_a(gE)}</b>.</p>"
                 f"<p><b>Check 3.</b> {_a(gD)} + {_a(gE)} = {_a(gD + gE)} = NPV. Renegotiation only changes the "
                 f"split, so this holds for any face value; both sides gain here, so both agree.</p>"
                 f"<p><b>Remember:</b> the creditors accept a lower promise because the alternative is no project and "
                 f"the old, risky claim worth {_a(D0)}.</p>"),
        feller=_ff(sd, fd),
    )

    # ---------------- (e) junior og senior gjeld
    sGE = p * (c_ - I)                 # aksjonærenes gevinst med et seniorlån på I (boom)
    sGD = (1 - p) * (c_ - I)           # de gamle kreditorenes gevinst (bust)
    e = tekst_del(
        "e", poeng=3,
        q=(f"<p>Return to the face value of {_m(K, val)}. Would it help if the firm borrowed the {_m(I, val)} from a "
           f"new lender "
           f"whose loan ranks below the old debt? What if the new loan ranked above it? Why do loan contracts "
           f"usually forbid the second?</p>"),
        setninger="Answer in at most four sentences.",
        gitt=f"<p>From (c): with new shares the old creditors capture {_a(D1 - D0)} of the project's payoff.</p>",
        kort=(f"<p>Junior debt does not help: it is paid after the old debt, so in the bust the old creditors still "
              f"take the project's payoff and the new lender would not get its money back. Senior debt would work: the "
              f"new lender is paid first and safely, the shareholders gain {_a(sGE)} from the boom and the old "
              f"creditors still gain {_a(sGD)} in the bust, so both are better off. Covenants forbid it because "
              f"otherwise a firm could always dilute its existing creditors, so nobody would lend first.</p>"),
        losning=(f"<p>Overhang is a seniority problem: the old creditors stand in front of any new money (lecture 4, "
                 f"slides 12 to 13).</p>"
                 f"<p><b>Junior debt</b> is in the same position as new equity. In the bust the old creditors take "
                 f"everything, so the junior lender is not repaid in full and would demand a promise so large that "
                 f"the shareholders are no better off.</p>"
                 f"<p><b>Senior debt</b> takes the project's payoff first. The safe project pays {_a(c_)} in both "
                 f"states, which covers a senior loan of {_a(I)}, so the new lender is safe. In the boom the "
                 f"shareholders keep {_a(H + c_ - I - K)} instead of {_a(H - K)}: worth {tall(p, 1)} × "
                 f"{_a(c_ - I)} = {_a(sGE)} to them, with no money of their own. In the bust the old creditors get "
                 f"{_a(L + c_ - I)} instead of {_a(L)}: worth {tall(1 - p, 1)} × {_a(c_ - I)} = {_a(sGD)}. Both "
                 f"sides gain and the gains add up to the NPV of {_a(NPV)}, so the project goes ahead (lecture 4, "
                 f"slide 13: all parties benefit).</p>"
                 f"<p><b>Why covenants forbid it.</b> If a firm could always issue debt ahead of existing creditors, "
                 f"those creditors could be diluted at any time, so nobody would lend first. Kurbatov calls this a "
                 f"very sharp double-edged sword: the covenant protects the creditors ex ante and blocks good "
                 f"projects ex post.</p>"
                 f"<p><b>Remember:</b> junior money never cures overhang; senior money or renegotiation can.</p>"),
        kriterier=[
            "Says new junior debt does not help: like new equity, it is paid after the old debt, so the old creditors "
            "still capture the gain (1 p)",
            "Says new senior debt would work: it is paid first, so the shareholders gain in the boom and the old "
            "creditors still gain in the bust; both are better off and the project goes ahead (1 p)",
            "Explains the covenant: without it the firm could dilute existing creditors at will, so nobody would lend "
            "in the first place (protection ex ante, cost ex post) (1 p)",
        ],
    )
    return _ovelse("ov-agt2", case, [a, b, c, d, e])


# ===========================================================================
# ov-agt3 · «Gambling for resurrection» nær mislighold: wealth transfer, likegyldighets-
# sannsynligheter og utbytte finansiert med brannsalg (forelesning 4 s. 16–18 og 20, HA1 E2 c–d)
# ===========================================================================
# Selskap, valuta og et sjansespill som passer bransjen.
GAMBLE = [
    ("Fossbakken Rederi AS", "NOK", "ordering six new ships on spot contracts, with no charters signed"),
    ("Kvitsøy Havbruk AS", "NOK", "an untested offshore fish farm far out at sea"),
    ("Lindvik Bygg AS", "NOK", "a large speculative housing project with no buyers signed up"),
    ("Rauma Gruve AS", "NOK", "an all-in push into an unproven deep ore body"),
    ("Sandøy Verft AS", "NOK", "a fixed-price bid for a contract far larger than any it has won"),
    ("Tromøy Energi AS", "NOK", "a large leveraged position in electricity futures"),
    ("Granite Bay Airlines", "$", "a bet-the-company expansion into new long-haul routes"),
    ("Kingsley Mining", "$", "an untested drilling programme at a new deposit"),
    ("Norbury Drilling", "$", "an untested deep-water drilling programme"),
    ("Whitford Biotech", "$", "an all-in launch of an unproven drug"),
    ("Ashby Retail", "$", "an all-in roll-out of a new store chain in markets it does not know"),
    ("Harrow Steel", "$", "a large leveraged position in steel futures"),
]


@oppgave("ov-agt3", tema="agent", tittel="Gambling for resurrection near default", antall=12,
         sjanger="agent", kilde="Lecture 4 slides 16 to 18, HA1 E2 (c) and (d)")
def _(r):
    navn, val, strat = r.choice(GAMBLE)
    K = r.choice([100, 120, 150, 200, 250])
    A = K * r.choice([f for f in (0.80, 0.85, 0.90) if _hel(K * f, 1e-7)])
    A = round(A)
    q = r.choice([0.2, 0.25, 0.3, 0.4, 0.5])
    GH = K + r.choice([20, 30, 40, 50, 80, 100])
    GL = r.choice([x for x in range(10, int(A), 5) if -0.30 * A <= q * GH + (1 - q) * x - A <= -0.04 * A] or [None])
    if GL is None:
        raise Avvis("ingen passende bunn")
    S = r.choice([x for x in (10, 15, 20, 25, 30, 40, 50) if 0.08 * A <= x <= 0.25 * A] or [None])
    if S is None:
        raise Avvis("ingen passende salg")
    dl = r.choice([0.3, 0.4, 0.6, 0.7])                     # 0.5 gir to like feller
    if not _hel(dl * S * 2, 1e-7):
        raise Avvis("stygt salg")
    y = K / A - 1
    Vg = q * GH + (1 - q) * GL
    Dg = q * K + (1 - q) * GL
    Eg = q * (GH - K)
    NPV = Vg - A
    dD, dE = Dg - A, Eg
    qV = (A - GL) / (GH - GL)
    qD = (A - GL) / (K - GL)
    pris = (1 - dl) * S
    y4 = rund(y, 6)

    case = (f"<p>{navn} owes {_m(K, val)}, due at t = 1. If it carries on as now, its assets will be worth "
            f"{_m(A, val)} at t = 1 for sure, so it will default. Management acts for the shareholders and would like "
            f"to keep the firm alive. At no cost it can switch to {strat}: the firm will then be worth "
            f"{_m(GH, val)} at t = 1 with probability {tall(q, 2)} or {_m(GL, val)} with probability "
            f"{tall(1 - q, 2)}.</p>"
            f"<p>Shareholders have limited liability. Investors are risk neutral and the discount rate is zero. Give "
            f"values in millions with two decimals and rates and probabilities with four decimals.</p>")

    # ---------------- (a) i dag uten sjansespillet
    fa = [
        Felle(K, f"You valued the debt at its face value. The firm will only be worth {_a(A)}.", i=0),
        Felle(A - K, "You let the equity go negative. Limited liability floors it at zero.", i=1),
        Felle((K - A) / K * 100, "You divided the shortfall by the face value. The yield is the promised payment over "
                                 "the price, minus one.", i=2),
        Felle(K / A * 100, "You forgot to subtract one: this is the gross return.", i=2),
    ]
    sa = [T("D", A, _u(val, "million")), T("E", 0.0, _u(val, "million"), abs=0.05),
          T("promised yield", y * 100, "%")]
    a = tall_del(
        "a", poeng=3,
        q=("<p>If the firm carries on as now, what are the debt and the equity worth today? If the debt trades at "
           "that value, what is its promised yield?</p>"),
        svar=sa,
        kort=(f"<p><b>D = {_a(A)}, E = 0, promised yield = {_r(y4)}.</b> The creditors get min({_a(A)}, {_a(K)}) = "
              f"{_a(A)}; yield = {_a(K)}/{_a(A)} − 1.</p>"),
        losning=(f"<p>The firm is under water: its assets will not cover the debt in any state. The creditors take "
                 f"everything and the shareholders get nothing. Limited liability means they owe nothing more.</p>"
                 f"<p><b>Step 1: the debt.</b> min({_a(A)}, {_a(K)}) = {_a(A)} for sure, so D = <b>{_a(A)}</b>.</p>"
                 f"<p><b>Step 2: the equity.</b> max({_a(A)} − {_a(K)}, 0) = <b>0</b>.</p>"
                 f"<p><b>Step 3: the yield.</b> The debt promises {_a(K)} and costs {_a(A)}: {_a(K)}/{_a(A)} − 1 = "
                 f"<b>{_r(y4)}</b>. The expected return is 0%, since the creditors are certain to receive {_a(A)}. "
                 f"The whole gap is the expected shortfall, not a reward for risk.</p>"
                 f"<p><b>First check.</b> D + E = {_a(A)}, the value of the assets. An identity.</p>"
                 f"<p><b>Remember:</b> the promised yield is face value over price minus one. It is not the expected "
                 f"return when default is possible.</p>"),
        feller=_ff(sa, fa),
    )

    # ---------------- (b) sjansespillet
    fb = [
        Felle(Vg - K, "You subtracted the face value from the expected firm value. Equity is zero in the bad state, "
                      "never negative.", i=2),
        Felle(K, "You valued the debt at its face value. In the bad state the creditors get only "
                 f"{_a(GL)}.", i=1),
        Felle(A, "This is the debt without the gamble. With it the creditors are paid in full only if it "
                 "succeeds.", i=1),
    ]
    sb = [T("V", Vg, _u(val, "million")), T("D", Dg, _u(val, "million")), T("E", Eg, _u(val, "million"))]
    b = tall_del(
        "b", poeng=4,
        q="<p>If management switches to the high-risk strategy, what are the firm, the debt and the equity worth today?</p>",
        gitt=f"<p>From (a): without the switch D = {_a(A)} and E = 0.</p>",
        svar=sb,
        kort=(f"<p><b>V = {_a(Vg)}, D = {_a(Dg)}, E = {_a(Eg)}.</b> D = {tall(q, 2)} × {_a(K)} + {tall(1 - q, 2)} × "
              f"{_a(GL)}; E = {tall(q, 2)} × ({_a(GH)} − {_a(K)}).</p>"),
        losning=(f"<p>The strategy spreads the outcome: a chance of paying the debt in full and something left over, "
                 f"against a deeper default otherwise.</p>"
                 f"<p><b>Step 1: the firm.</b> V = {tall(q, 2)} × {_a(GH)} + {tall(1 - q, 2)} × {_a(GL)} = "
                 f"<b>{_a(Vg)}</b>, below the {_a(A)} of carrying on.</p>"
                 f"<p><b>Step 2: the debt.</b> Success: {_a(K)} in full. Failure: {_a(GL)}. D = {tall(q, 2)} × "
                 f"{_a(K)} + {tall(1 - q, 2)} × {_a(GL)} = <b>{_a(Dg)}</b>.</p>"
                 f"<p><b>Step 3: the equity.</b> Success: {_a(GH)} − {_a(K)} = {_a(GH - K)}. Failure: 0. E = "
                 f"{tall(q, 2)} × {_a(GH - K)} = <b>{_a(Eg)}</b>.</p>"
                 f"<p><b>First check.</b> D + E = {_a(Dg + Eg)} = V. An identity, so it catches arithmetic slips "
                 f"only.</p>"
                 f"<p><b>Remember:</b> in the bad state the shareholders are at zero either way. Making that state "
                 f"worse costs them nothing.</p>"),
        feller=_ff(sb, fb),
    )

    # ---------------- (c) hvem vinner og taper
    fc = [
        Felle(-NPV, "Wrong sign: the strategy lowers the firm's value.", i=0),
        Felle(Dg - K, "You measured the creditors' change from the face value. Today the debt is worth "
                      f"{_a(A)}, not {_a(K)}.", i=1),
        Felle(-dD, "Wrong sign: the creditors lose. Give a fall in value as a negative number.", i=1),
    ]
    sc = [T("NPV", NPV, _u(val, "million")), T("ΔD", dD, _u(val, "million")), T("ΔE", dE, _u(val, "million"))]
    c = blandet_del(
        "c", poeng=4, tall_poeng=2,
        q=("<p>Find the NPV of the switch and the change in the value of the debt and of the equity (negative for a "
           "fall).</p>"),
        gitt=(f"<p>From (a) and (b): carrying on gives D = {_a(A)}, E = 0; the switch gives V = {_a(Vg)}, D = "
              f"{_a(Dg)}, E = {_a(Eg)}.</p>"),
        svar=sc,
        tekst_ledd="Will management switch? Explain who wins, who loses and why.",
        kort=(f"<p><b>NPV = {_a(NPV)}, ΔD = {_a(dD)}, ΔE = +{_a(dE)}: management switches.</b> Limited liability: the "
              f"shareholders get {_a(Eg)} instead of 0 and the firm survives with probability {tall(q, 2)}, while the "
              f"creditors bear the downside. A wealth transfer from creditors to shareholders.</p>"),
        losning=(f"<p>This is gambling for resurrection (lecture 4, slides 16 to 17). Near default the shareholders "
                 f"own an option that is out of the money. Any chance of an upside is worth something to them. The "
                 f"downside belongs to the creditors.</p>"
                 f"<p><b>Step 1: NPV.</b> {_a(Vg)} − {_a(A)} = <b>{_a(NPV)}</b>.</p>"
                 f"<p><b>Step 2: the creditors.</b> {_a(Dg)} − {_a(A)} = <b>{_a(dD)}</b>.</p>"
                 f"<p><b>Step 3: the shareholders.</b> {_a(Eg)} − 0 = <b>+{_a(dE)}</b>.</p>"
                 f"<p><b>Check 3.</b> {_a(dD)} + {_a(dE)} = {_a(dD + dE)} = NPV. The creditors lose {_a(-dD)}: "
                 f"{_a(dE)} is transferred to the shareholders and {_a(-NPV)} is destroyed.</p>"
                 f"<p><b>Who wins and who loses.</b> The shareholders win. The creditors lose. The manager, who would "
                 f"otherwise lose the firm for sure, keeps it alive with probability {tall(q, 2)}. So management "
                 f"switches, although the switch destroys value.</p>"
                 f"<p><b>Remember:</b> name the mechanism (limited liability) and use the words wealth transfer.</p>"),
        kriterier=[
            f"Says management switches because the shareholders get {_a(Eg)} instead of nothing: limited liability "
            f"puts the downside on the creditors (and the manager keeps the firm alive with some probability) (1 p)",
            "Calls it a wealth transfer from the creditors to the shareholders, on a switch that destroys value "
            "(negative NPV) (1 p)",
        ],
        feller=_ff(sc, fc),
    )

    # ---------------- (d) likegyldighetssannsynlighetene
    fd = [
        Felle(qD, "This is the probability that makes the creditors indifferent. Firm value uses the whole payoff "
                  f"{_a(GH)} in the good state, not just the {_a(K)} the creditors get.", i=0),
        Felle(qV, "This is the probability that leaves the firm's value unchanged. The creditors get only "
                  f"{_a(K)} in the good state.", i=1),
        Felle(1 - qD, "You solved for the probability of failure. The question asks for the probability of "
                      "success.", i=1),
        Felle(1 - qV, "You solved for the probability of failure. The question asks for the probability of "
                      "success.", i=0),
    ]
    sd = [T("q for firm value", qV), T("q for creditors", qD)]
    d = tall_del(
        "d", poeng=3,
        q=("<p>Keep everything else as in the case but let the probability of success q vary. For which q does the "
           "switch leave the firm's value unchanged? For which q are the creditors indifferent to the switch?</p>"),
        gitt=f"<p>From (a): carrying on gives the firm and the creditors {_a(A)}.</p>",
        svar=sd,
        kort=(f"<p><b>q = {tall(qV, 4)} for firm value; q = {tall(qD, 4)} for the creditors.</b> "
              f"q × {_a(GH)} + (1 − q) × {_a(GL)} = {_a(A)} and q × {_a(K)} + (1 − q) × {_a(GL)} = {_a(A)}.</p>"),
        losning=(f"<p>Kurbatov likes indifference questions: write each side as a function of q and solve. The "
                 f"shareholders get q × ({_a(GH)} − {_a(K)}) &gt; 0 for any q above zero, so they want the switch at "
                 f"every q, however small.</p>"
                 f"<p><b>Step 1: firm value.</b> q × {_a(GH)} + (1 − q) × {_a(GL)} = {_a(A)} gives q = "
                 f"({_a(A)} − {_a(GL)})/({_a(GH)} − {_a(GL)}) = <b>{tall(qV, 4)}</b>.</p>"
                 f"<p><b>Step 2: the creditors.</b> q × {_a(K)} + (1 − q) × {_a(GL)} = {_a(A)} gives q = "
                 f"({_a(A)} − {_a(GL)})/({_a(K)} − {_a(GL)}) = <b>{tall(qD, 4)}</b>.</p>"
                 f"<p><b>Step 3: read it.</b> Below {tall(qV, 4)} the switch destroys value, yet the shareholders "
                 f"still want it: here q = {tall(q, 2)}. Between {tall(qV, 4)} and {tall(qD, 4)} the switch creates "
                 f"value, but the creditors would still lose, because the upside above {_a(K)} goes to the "
                 f"shareholders.</p>"
                 f"<p><b>First check.</b> At q = {tall(qD, 4)}: {tall(qD, 4)} × {_a(K)} + {tall(1 - qD, 4)} × "
                 f"{_a(GL)} = {_a(qD * K + (1 - qD) * GL)}, what the creditors get by carrying on. It can fail if "
                 f"the wrong payoff goes into the good state.</p>"
                 f"<p><b>Remember:</b> the creditors' break-even q is always above the firm's: they bear the downside "
                 f"but are capped at the face value in the upside.</p>"),
        feller=_ff(sd, fd),
    )

    # ---------------- (e) utbytte finansiert med brannsalg
    fe = [
        Felle(-pris, "You counted only the cash paid out. The creditors lose the whole value the assets would have "
                     "had at t = 1.", i=0),
        Felle(S, "You valued the dividend at what the assets were worth. They were sold in a fire sale for less.",
              i=1),
        Felle(-(S - pris), "This is the fire-sale loss, not the change in the value of the debt.", i=0),
    ]
    se = [T("ΔD", -S, _u(val, "million")), T("ΔE", pris, _u(val, "million"))]
    e = blandet_del(
        "e", poeng=5, tall_poeng=2,
        q=(f"<p>Return to the original case and suppose the switch is not possible. Instead the shareholders propose "
           f"to sell assets that would be worth {_m(S, val)} at t = 1 for {_m(pris, val)} in cash today (a fire sale) "
           f"and pay the cash out at once as a dividend. The loan contract does not forbid it. Find the change in the "
           f"value of the debt and of the equity.</p>"),
        gitt=f"<p>From (a): carrying on gives D = {_a(A)} and E = 0.</p>",
        svar=se,
        tekst_ledd=("Who wins and who loses? What can creditors do, before they lend, about this and about the "
                    "switch in (b)?"),
        kort=(f"<p><b>ΔD = −{_a(S)}, ΔE = +{_a(pris)}.</b> A wealth transfer from the creditors, with {_a(S - pris)} "
              f"lost in the fire sale (Check 3). Creditors price this in, so the shareholders pay ex ante. Law and "
              f"covenants on payouts and asset sales stop it; convertible debt removes the gain from gambling.</p>"),
        losning=(f"<p>Paying out assets just before default is the cash version of the same conflict (KB Toys in "
                 f"lecture 4). The shareholders get cash now. The creditors lose assets they would have received.</p>"
                 f"<p><b>Step 1: the debt.</b> At t = 1 the firm is worth {_a(A)} − {_a(S)} = {_a(A - S)}, still below "
                 f"{_a(K)}, so D = {_a(A - S)}. ΔD = <b>−{_a(S)}</b>.</p>"
                 f"<p><b>Step 2: the equity.</b> The shareholders receive {_a(pris)} today and still nothing at t = 1. "
                 f"ΔE = <b>+{_a(pris)}</b>.</p>"
                 f"<p><b>Check 3.</b> −{_a(S)} + {_a(pris)} = −{_a(S - pris)}, the value lost by selling at "
                 f"{tall((1 - dl) * 100, 0)}% of what the assets are worth. Fire sales are a deadweight cost of "
                 f"distress.</p>"
                 f"<p><b>What creditors can do.</b> They anticipate both moves and price the debt for them, so the "
                 f"shareholders bear the cost when they borrow. To prevent it: the law, which Kurbatov calls the "
                 f"strongest protection; covenants with dividend restrictions and limits on asset sales; convertible "
                 f"debt, which hands creditors the upside and so removes the gain from gambling.</p>"
                 f"<p><b>Remember:</b> near default, anything that moves value out of the firm or adds risk is a "
                 f"wealth transfer from the creditors.</p>"),
        kriterier=[
            f"Identifies a wealth transfer from the creditors (−{_a(S)}) to the shareholders (+{_a(pris)}), with "
            f"{_a(S - pris)} destroyed in the fire sale (Check 3) (1 p)",
            "Says rational creditors anticipate such moves and price the debt accordingly, so the shareholders bear "
            "the cost ex ante (1 p)",
            "Names remedies with their mechanism: covenants restricting dividends and asset sales (or the law) for "
            "the payout; covenants or convertible debt for the gamble (1 p)",
        ],
        feller=_ff(se, fe),
    )
    return _ovelse("ov-agt3", case, [a, b, c, d, e])
