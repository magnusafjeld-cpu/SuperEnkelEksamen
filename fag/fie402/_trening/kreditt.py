# -*- coding: utf-8 -*-
"""Eksamenstrening FIE402: gjeld og egenkapital som opsjoner, kredittrisiko (skribent 3).

   Familier med tallsvar:
     kre-tre1  gjeld og egenkapital i et tre med to tilstander (ρ fra eiendelene)
     kre-put1  gjeld = risikofri gjeld − put, og den lovede renten over T år
     kre-cal1  gjelden og renten fra en notert call (Google-eksempelet, B4), rente over brøkdel av år
     kre-snj1  senior og junior gjeld fra to noterte calls (B4)
     kre-cds1  CDS priset med den risikonøytrale misligholdssannsynligheten (lecture 10)
     kre-exr1  forventet avkastning mot lovet rente, og gjeldsbetaen
     kre-ris1  overføring fra kreditorene ved høyere risiko med samme V
   Statiske: kre-s01 til kre-s12.

   Konvensjoner: diskret diskontering, y = (K/D)^(1/T) − 1 også for brøkdel av år
   (A4), midtkurs og strike = pålydende per aksje (B4), CDS som betaler 1 ved
   mislighold med λ = K × LGD (A13, lecture 10). Opsjonsprisene i oppgavene er
   markedsdata; ingen Black-Scholes-regning for leseren (A6).
"""
from trening_lib import *  # noqa: F401,F403
import math

FIRMA = ["Havbris Kraft ASA", "Nordlia Bygg ASA", "Stålvik Industri ASA", "Fjellnett ASA", "Vågsøy Rederi ASA",
         "Bremnes Eiendom ASA", "Lofotkraft ASA", "Granitt Verft ASA", "Skjærvik Telekom ASA", "Ormberg Gruppen ASA"]


def _f(x):
    return tall(x, 4)


def _fp(x):
    return f"({_f(x)})" if rund(x, 4) < 0 else _f(x)


def _rho(x):
    """ρ med fire desimaler når den ender der, ellers seks, så produktene går opp."""
    return tall(x, 4) if abs(rund(x, 4) - x) < 1e-9 else tall(x, 6)


def _f6(x):
    return tall(x, 6)


def _k(x):
    return tall(x, 2)


def _p(x, d=2):
    return pst(x, d)


def _r(r):
    return tall(r, 3 if rund(r * 1000) % 10 else 2)


def _vekst(r):
    return tall(1 + r, 3 if rund(r * 1000) % 10 else 2)


def _tidtall(T):
    if T == int(T):
        return tall(T, 0)
    return tall(T, 1) if T * 2 == int(T * 2) else tall(T, 2)


def _tid(T):
    return {1: "one year", 1.5: "18 months", 2: "two years", 3: "three years", 1.25: "15 months",
            1.75: "21 months", 2.5: "30 months"}[T]


def _N(x):
    """Standard normalfordeling (bare til å lage markedsdata)."""
    return 0.5 * (1 + math.erf(x / math.sqrt(2)))


def _bs(S, K, T, r, sig, call=True):
    """Black-Scholes-pris, bare for å lage realistiske noteringer. Leseren regner ikke med den."""
    rc = math.log(1 + r)
    d1 = (math.log(S / K) + (rc + sig * sig / 2) * T) / (sig * math.sqrt(T))
    d2 = d1 - sig * math.sqrt(T)
    c = S * _N(d1) - K * math.exp(-rc * T) * _N(d2)
    return c if call else c - S + K * math.exp(-rc * T)


# ---------------------------------------------------------------------------
# kre-tre1 · Gjeld og egenkapital i et tre med to tilstander
# ---------------------------------------------------------------------------
@familie("kre-tre1", tema="kreditt", antall=5, tittel="Debt and equity in a two-state tree",
         hjelp=hjelp3(
             "This is equity as a call on the firm's assets and debt as the rest. You need the market value of one "
             "of the claims, priced with the risk-neutral probability from the traded assets.",
             "E<sub>1</sub> = max(V<sub>1</sub> − K, 0), D<sub>1</sub> = min(V<sub>1</sub>, K). ρ = [(1 + r<sub>f</sub>)V<sub>0</sub> "
             "− V<sub>d</sub>]/(V<sub>u</sub> − V<sub>d</sub>). Value = [ρX<sub>u</sub> + (1 − ρ)X<sub>d</sub>]/(1 + r<sub>f</sub>).",
             "<p><b>Step 1: the payoffs.</b> In each state the lenders get the face value or the whole firm, "
             "whichever is smaller. The shareholders get the rest.</p>"
             "<p><b>Step 2: ρ from the assets.</b> The assets are traded, so they give ρ like a share does.</p>"
             "<p><b>Step 3: price.</b> Weight the payoffs with ρ and discount one year at r<sub>f</sub>.</p>"
             "<p><b>Watch out:</b> the analysts' probability is not used. The debt is not risk-free.</p>",
         ))
def _(r):
    navn = r.choice(FIRMA)
    V0 = r.choice([100, 150, 200, 250, 400, 500])
    u = r.choice([1.20, 1.25, 1.30, 1.40])
    d = r.choice([0.70, 0.75, 0.80])
    rf = r.choice([0.03, 0.04, 0.05])
    rho = ((1 + rf) - d) / (u - d)
    if abs(rund(rho, 4) - rho) > 1e-9:
        raise Avvis("ρ har mer enn fire desimaler")
    Vu, Vd = V0 * u, V0 * d
    K = round((Vd + (Vu - Vd) * r.choice([0.25, 0.35, 0.45])) / 5) * 5
    if not Vd < K < Vu:
        raise Avvis("pålydende utenfor treet")
    p = r.choice([0.60, 0.65, 0.70, 0.75])
    rho_f = (1 - d) / (u - d)
    E = rho * (Vu - K) / (1 + rf)
    D = (rho * K + (1 - rho) * Vd) / (1 + rf)
    spor_gjeld = r.random() < 0.55
    if spor_gjeld:
        riktig = D
        f_reell = (p * K + (1 - p) * Vd) / (1 + rf)
        f2 = K / (1 + rf)
        n2 = (f"The debt valued as risk-free: {tall(K, 0)}/{_vekst(rf)}. In the down state the firm is worth only "
              f"{tall(Vd, 0)}, so the lenders get {tall(Vd, 0)}, not {tall(K, 0)}.")
        f_rho = (rho_f * K + (1 - rho_f) * Vd) / (1 + rf)
        krav = "debt"
    else:
        riktig = E
        f_reell = p * (Vu - K) / (1 + rf)
        f2 = V0 - K / (1 + rf)
        n2 = (f"V<sub>0</sub> − PV(K) = {tall(V0, 0)} − {tall(K, 0)}/{_vekst(rf)}. That treats the shareholders as if "
              "they had to repay the debt in full. Limited liability lets them walk away in the down state: the "
              "equity is a call.")
        f_rho = rho_f * (Vu - K) / (1 + rf)
        krav = "equity"
    ulike(riktig, f_reell, f2, f_rho, rel=0.02)
    q = (f"<p>{navn} has assets worth NOK {tall(V0, 0)} million today. In one year they will be worth NOK "
         f"{tall(Vu, 0)} million or NOK {tall(Vd, 0)} million. The assets are traded. The firm's only debt is a "
         f"zero-coupon bond with face value NOK {tall(K, 0)} million due in one year. The one-year risk-free rate is "
         f"{_p(rf, 1)}. Analysts put the probability of the high state at {tall(p, 2)}. Markets are perfect.</p>"
         f"<p>What is the market value of {gen(navn)} {krav} today, in NOK million? Answer with four decimals.</p>")
    alt = [R(_f(riktig), riktig),
           F(_f(f_reell), f"The analysts' {tall(p, 2)} weighted and discounted at r<sub>f</sub>. The firm's risk is "
             "priced, so real probabilities do not go with the risk-free rate. The traded assets give ρ.", f_reell),
           F(_f(f2), n2, f2),
           F(_f(f_rho), f"ρ taken as ({tall(V0, 0)} − {tall(Vd, 0)})/({tall(Vu, 0)} − {tall(Vd, 0)}) = {_f(rho_f)}, "
             f"without growing the assets at r<sub>f</sub>. Under ρ the assets must earn r<sub>f</sub>.", f_rho)]
    Eu, Du = Vu - K, K
    kort = (f"<p><b>{_f(riktig)}.</b> ρ = ({_vekst(rf)} × {tall(V0, 0)} − {tall(Vd, 0)})/({tall(Vu, 0)} − "
            f"{tall(Vd, 0)}) = {_f(rho)}. "
            + (f"D = [{_f(rho)} × {tall(K, 0)} + {_f(1 - rho)} × {tall(Vd, 0)}]/{_vekst(rf)} = {_f(D)}.</p>"
               if spor_gjeld else
               f"E = {_f(rho)} × {tall(Eu, 0)}/{_vekst(rf)} = {_f(E)}.</p>"))
    full = (f"<p><b>Claims as options.</b> At maturity the lenders get min(V<sub>1</sub>, K): the face value if the "
            f"firm can pay, the whole firm if it cannot. The shareholders get max(V<sub>1</sub> − K, 0), a call on "
            f"the assets with the face value as strike. Both claims are priced on the asset tree like options on a "
            f"share.</p>"
            f"<p><b>Step 1: the payoffs.</b> High state: debt {tall(Du, 0)}, equity {tall(Eu, 0)}. Low state: the "
            f"firm is worth {tall(Vd, 0)} &lt; {tall(K, 0)}, so debt {tall(Vd, 0)}, equity 0.</p>"
            f"<p><b>Step 2: ρ.</b> ({_vekst(rf)} × {tall(V0, 0)} − {tall(Vd, 0)})/({tall(Vu, 0)} − {tall(Vd, 0)}) = "
            f"{_f((1 + rf) * V0 - Vd)}/{tall(Vu - Vd, 0)} = {_f(rho)}.</p>"
            f"<p><b>Step 3: the values.</b> E = {_f(rho)} × {tall(Eu, 0)}/{_vekst(rf)} = {_f(E)}. D = [{_f(rho)} × "
            f"{tall(K, 0)} + {_f(1 - rho)} × {tall(Vd, 0)}]/{_vekst(rf)} = {_f(D)}. The {krav} is worth "
            f"<b>{_f(riktig)}</b>.</p>"
            f"<p><b>First check.</b> E + D = {_f(E)} + {_f(D)} = {_f(E + D)} = V<sub>0</sub> ✓ The two claims were "
            f"priced separately, so this catches a slip in either one. Also D = PV(K) − Put = {tall(K, 0)}/"
            f"{_vekst(rf)} − {_f(1 - rho)} × {tall(K - Vd, 0)}/{_vekst(rf)} = {_f(K / (1 + rf))} − "
            f"{_f((1 - rho) * (K - Vd) / (1 + rf))} = {_f(D)} ✓</p>"
            f"<p><b>Remember:</b> equity is a call on the assets struck at the face value, debt is what is left. "
            f"Price both with ρ from the assets.</p>")
    return sporsmal(q, alt, kort, full, tall=tallsvar(enhet="NOK million"))


# ---------------------------------------------------------------------------
# kre-put1 · Gjeld = risikofri gjeld minus put, og den lovede renten
# ---------------------------------------------------------------------------
@familie("kre-put1", tema="kreditt", antall=5, tittel="Debt as risk-free debt minus a put and its yield",
         hjelp=hjelp3(
             "This is risky debt as risk-free debt minus a put on the firm's assets. You need the debt's value and "
             "then the annual yield it promises.",
             "D = PV(K) − Put(V, K, T), PV(K) = K/(1 + r<sub>f</sub>)<sup>T</sup>. Promised yield y = (K/D)<sup>1/T</sup> − 1, "
             "an annual rate, also when T is not a whole number of years.",
             "<p><b>Step 1: risk-free debt.</b> Discount the face value at the risk-free rate over the life of the "
             "bond.</p>"
             "<p><b>Step 2: subtract the put.</b> The put is the shareholders' right to hand over the assets "
             "instead of paying.</p>"
             "<p><b>Step 3: the yield.</b> Face value over price, to the power 1/T, minus 1.</p>"
             "<p><b>Watch out:</b> annualise the yield and discount discretely.</p>",
         ))
def _(r):
    navn = r.choice(FIRMA)
    V0 = r.choice([400, 500, 600, 800, 1000])
    K = round(V0 * r.choice([0.6, 0.7, 0.75, 0.8]) / 10) * 10
    T = r.choice([2, 3, 1.5, 2.5])
    rf = r.choice([0.03, 0.04, 0.05])
    sig = r.choice([0.30, 0.35, 0.40, 0.45])
    P = rund(_bs(V0, K, T, rf, sig, call=False), 2)
    if P < 1:
        raise Avvis("for liten put")
    pvk = K / (1 + rf) ** T
    D = pvk - P
    y = (K / D) ** (1 / T) - 1
    f_vp = (K / (K - P)) ** (1 / T) - 1                  # risikofri del ikke diskontert
    f_ann = K / D - 1
    f_kont = math.log(K / D) / T
    ulike(y, f_vp, f_ann, f_kont, rel=0.02)
    q = (f"<p>{navn} has assets worth NOK {tall(V0, 0)} million. Its only debt is a zero-coupon bond with face value "
         f"NOK {tall(K, 0)} million due in {_tid(T)}. A European put on the firm's assets with strike {tall(K, 0)} "
         f"and the same maturity is worth NOK {_k(P)} million. The risk-free rate is {_p(rf, 1)} a year (effective "
         f"annual rate). Markets are perfect.</p>"
         f"<p>What annual yield does {gen(navn)} bond promise? Answer in percent with two decimals.</p>")
    alt = [R(_p(y), y),
           F(_p(f_vp), "The debt valued as the face value minus the put. The risk-free part pays K only at "
             "maturity, so it is worth less than K today.", f_vp),
           F(_p(f_ann), f"The total return over {_tid(T)}, not an annual rate.", f_ann),
           F(_p(f_kont), "A continuously compounded yield. The course quotes yields as effective annual rates.",
             f_kont)]
    spread = y - rf
    kort = (f"<p><b>{_p(y)}.</b> PV(K) = {tall(K, 0)}/{_vekst(rf)}<sup>{_tidtall(T)}</sup> = {_f(pvk)}. D = "
            f"{_f(pvk)} − {_k(P)} = {_f(D)}. y = ({tall(K, 0)}/{_f(D)})<sup>1/{_tidtall(T)}</sup> − 1 = {_p(y)}.</p>")
    full = (f"<p><b>Why debt is risk-free debt minus a put.</b> The lenders are promised K. If the assets are worth "
            f"less than K at maturity, the shareholders walk away and hand over the assets, so the lenders get "
            f"K − max(K − V, 0). That is a risk-free bond paying K minus a put on the assets struck at K. The put is "
            f"the shareholders' option to default. The lenders have written it.</p>"
            f"<p><b>Step 1: risk-free debt.</b> PV(K) = {tall(K, 0)}/{_vekst(rf)}<sup>{_tidtall(T)}</sup> = "
            f"{_f(pvk)}.</p>"
            f"<p><b>Step 2: the debt.</b> D = {_f(pvk)} − {_k(P)} = {_f(D)}.</p>"
            f"<p><b>Step 3: the yield.</b> y = ({tall(K, 0)}/{_f(D)})<sup>1/{_tidtall(T)}</sup> − 1 = "
            f"<b>{_p(y)}</b>. The credit spread is {_p(y)} − {_p(rf, 1)} = {_p(spread)}.</p>"
            f"<p><b>First check.</b> Parity gives the equity: E = Call = Put + V − PV(K) = {_k(P)} + {tall(V0, 0)} − "
            f"{_f(pvk)} = {_f(P + V0 - pvk)}. Then E + D = {_f(P + V0 - pvk + D)} = V ✓ This is parity read "
            f"backwards, so it is an identity that catches arithmetic slips only. The yield is a promise: the "
            f"lenders expect less, because they may get only the assets.</p>"
            f"<p><b>Remember:</b> D = PV(K) − Put, y = (K/D)<sup>1/T</sup> − 1 as an annual rate.</p>")
    return sporsmal(q, alt, kort, full, tall=tallsvar(skala=100, enhet="%"))


def _tabell(rader):
    """Noteringstabell for calls: [(strike, bid, ask)]."""
    linjer = "".join(f"<tr><td>{tall(k, 0)}</td><td>{_k(b)}</td><td>{_k(a)}</td></tr>" for k, b, a in rader)
    return ("<table><thead><tr><th>Strike (NOK)</th><th>Call bid</th><th>Call ask</th></tr></thead>"
            f"<tbody>{linjer}</tbody></table>")


def _noteringer(r, v, strikes, T, rf, sig):
    """Bid og ask med midtkurs på to desimaler: mid = BS-pris rundet, ± en halv spread."""
    halv = r.choice([0.05, 0.10, 0.15])
    ut = {}
    for k in strikes:
        mid = rund(_bs(v, k, T, rf, sig), 2)
        ut[k] = (rund(mid - halv, 2), rund(mid + halv, 2), mid)
    return ut


# ---------------------------------------------------------------------------
# kre-cal1 · Gjelden og renten fra en notert call (B4)
# ---------------------------------------------------------------------------
@familie("kre-cal1", tema="kreditt", antall=5, tittel="The yield on new debt from a quoted call",
         hjelp=hjelp3(
             "This is equity as a call, read off quoted options. The equity after the debt issue is the call "
             "struck at the face value per share. The debt is the rest of the firm.",
             "E = number of shares × call price at strike K/N, with the price at the midpoint of bid and ask. "
             "D = V − E. y = (K/D)<sup>1/T</sup> − 1 with T in years, so 12/months for a part of a year.",
             "<p><b>Step 1: the strike.</b> Divide the face value by the number of shares.</p>"
             "<p><b>Step 2: the equity.</b> The midpoint of that call's bid and ask, times the number of shares.</p>"
             "<p><b>Step 3: the debt and the yield.</b> Subtract the equity from the firm value, then annualise "
             "K/D over the months to maturity.</p>"
             "<p><b>Watch out:</b> the yield is an annual rate with discrete compounding.</p>",
         ))
def _(r):
    navn = r.choice(FIRMA)
    N = r.choice([200, 250, 320, 400, 500])               # millioner aksjer
    v = r.choice([120, 150, 180, 200, 240, 300])           # verdi per aksje
    V = N * v / 1000                                       # NOK milliarder
    Kps = round(v * r.choice([0.55, 0.65, 0.75]) / 10) * 10
    K = N * Kps / 1000
    m = r.choice([15, 18, 21, 30])
    T = m / 12
    rf = r.choice([0.01, 0.02, 0.03])
    sig = r.choice([0.30, 0.35, 0.40])
    andre = sorted({Kps - 20, Kps, Kps + 20, Kps + 40} - {Kps + 40 if r.random() < 0.5 else Kps - 20})
    nt = _noteringer(r, v, andre, T, rf, sig)
    mid = nt[Kps][2]
    E = N * mid / 1000
    D = V - E
    y = (K / D) ** (12 / m) - 1
    f_ann = K / D - 1
    f_kont = math.log(K / D) * 12 / m
    f_enkel = (K / D - 1) * 12 / m
    ulike(y, f_ann, f_kont, f_enkel, rel=0.02)
    tab = _tabell([(k, nt[k][0], nt[k][1]) for k in andre])
    q = (f"<p>{navn} has {N} million shares, a total market value of NOK {tall(V, 0) if V == int(V) else tall(V, 1)} "
         f"billion and no debt. Markets are perfect and the risk-free rate is {_p(rf, 1)} a year. The firm considers "
         f"issuing a zero-coupon bond with face value NOK {tall(K, 0) if K == int(K) else tall(K, 1)} billion due in "
         f"{m} months and paying the proceeds out to the shareholders at once. European calls on its shares with "
         f"{m} months to expiry are quoted below. Treat them as options on the firm's assets per share.</p>"
         f"{tab}"
         f"<p>What annual yield would the bond pay? Answer in percent with two decimals.</p>")
    Vt = tall(V, 0) if V == int(V) else tall(V, 1)
    Kt = tall(K, 0) if K == int(K) else tall(K, 1)
    alt = [R(_p(y), y),
           F(_p(f_ann), f"The return over {m} months, not over a year.", f_ann),
           F(_p(f_kont), "A continuously compounded yield. The course quotes effective annual rates.", f_kont),
           F(_p(f_enkel), f"The {m}-month return scaled to a year in proportion to time. Returns compound, so "
             "scaling by months overstates the annual rate.", f_enkel)]
    kort = (f"<p><b>{_p(y)}.</b> Strike {Kt} billion/{N} million = {Kps}. Mid = ({_k(nt[Kps][0])} + "
            f"{_k(nt[Kps][1])})/2 = {_k(mid)}, so E = {N} × {_k(mid)} = {_f(E)} billion and D = {Vt} − {_f(E)} = "
            f"{_f(D)}. y = ({Kt}/{_f(D)})<sup>12/{m}</sup> − 1 = {_p(y)}.</p>")
    full = (f"<p><b>Why a call on the shares prices the debt.</b> After the issue the shareholders own the firm "
            f"but must pay NOK {Kt} billion first, so each share is a call on the assets per share with strike "
            f"equal to the face value per share. Before the issue the firm has no debt, so a quoted call on the "
            f"shares is a call on the assets per share. Its price today is the value of one share after the issue "
            f"(this is Kurbatov's Google example, lecture 10).</p>"
            f"<p><b>Step 1: the strike.</b> {Kt} billion/{N} million shares = NOK {Kps} per share.</p>"
            f"<p><b>Step 2: the equity.</b> The {Kps} call is quoted at {_k(nt[Kps][0])} bid and {_k(nt[Kps][1])} ask, "
            f"midpoint {_k(mid)}. E = {N} million × {_k(mid)} = NOK {_f(E)} billion.</p>"
            f"<p><b>Step 3: the debt and the yield.</b> D = {Vt} − {_f(E)} = {_f(D)}. Over {m} months, T = "
            f"{_tidtall(T)} years: y = ({Kt}/{_f(D)})<sup>12/{m}</sup> − 1 = <b>{_p(y)}</b>, a spread of "
            f"{_p(y - rf)} over r<sub>f</sub>.</p>"
            f"<p><b>First check.</b> The yield must exceed r<sub>f</sub>: {_p(y)} &gt; {_p(rf, 1)} ✓ If it did not, "
            f"the debt would be worth more than PV(K) = {_f(K / (1 + rf) ** T)}, which no risky bond can be. Here "
            f"D = {_f(D)} is below it.</p>"
            f"<p><b>Remember:</b> E = N × call at strike K/N, mid of bid and ask. D = V − E. Annualise with "
            f"(K/D)<sup>12/months</sup> − 1.</p>")
    return sporsmal(q, alt, kort, full, tall=tallsvar(skala=100, enhet="%"))


# ---------------------------------------------------------------------------
# kre-snj1 · Senior og junior gjeld fra to noterte calls (B4)
# ---------------------------------------------------------------------------
@familie("kre-snj1", tema="kreditt", antall=5, tittel="Senior and junior debt from two quoted calls",
         hjelp=hjelp3(
             "This is senior and junior debt priced as options. The senior lenders are paid first, the junior "
             "lenders next and the shareholders last.",
             "D<sub>S</sub> = V − C(K<sub>S</sub>). E = C(K<sub>S</sub> + K<sub>J</sub>). D<sub>J</sub> = C(K<sub>S</sub>) − "
             "C(K<sub>S</sub> + K<sub>J</sub>). With quoted calls per share: strike = face value per share, price = "
             "midpoint, times the number of shares. y = (K/D)<sup>1/T</sup> − 1.",
             "<p><b>Step 1: two strikes.</b> The senior face value per share and all the debt per share.</p>"
             "<p><b>Step 2: the junior claim.</b> It is the gap between the two calls: what the senior lenders "
             "leave minus what the shareholders take.</p>"
             "<p><b>Step 3: scale up, then annualise if asked.</b></p>"
             "<p><b>Watch out:</b> the junior strike sits on top of the senior one.</p>",
         ))
def _(r):
    navn = r.choice(FIRMA)
    N = r.choice([200, 250, 320, 400])
    v = r.choice([150, 180, 200, 240, 300])
    V = N * v / 1000
    KSps = round(v * r.choice([0.40, 0.45, 0.50]) / 10) * 10
    KJps = r.choice([20, 30, 40])
    KTps = KSps + KJps
    KS, KJ = N * KSps / 1000, N * KJps / 1000
    m = r.choice([15, 18, 21, 24])
    T = m / 12
    rf = r.choice([0.01, 0.02, 0.03])
    sig = r.choice([0.35, 0.40, 0.45, 0.50])
    strikes = sorted({KJps, KSps, KTps})
    if len(strikes) < 3:
        raise Avvis("like strikes")
    nt = _noteringer(r, v, strikes, T, rf, sig)
    cS, cT, cJ = nt[KSps][2], nt[KTps][2], nt[KJps][2]
    DJ = N * (cS - cT) / 1000
    DS = V - N * cS / 1000
    E = N * cT / 1000
    Dtot = V - E
    f_alene = V - N * cJ / 1000
    f_pro = Dtot * KJ / (KS + KJ)
    spor_rente = r.random() < 0.5
    if DJ <= 0.05 * KJ:
        raise Avvis("for lite juniorgjeld")
    if spor_rente:
        riktig = (KJ / DJ) ** (12 / m) - 1
        f1 = (KJ / f_alene) ** (12 / m) - 1 if f_alene > 0 else -1
        f2 = (KJ / f_pro) ** (12 / m) - 1
        f3 = KJ / DJ - 1
        n3 = f"The junior bond's return over {m} months, not over a year."
        fmt = _p
        tallsv = tallsvar(skala=100, enhet="%")
        sporsmal_tekst = "What annual yield would the junior bond pay? Answer in percent with two decimals."
    else:
        riktig = DJ
        f1, f2 = f_alene, f_pro
        f3 = DS
        n3 = ("This is the value of the senior debt. The junior lenders get what is left after the senior "
              "lenders, up to their own face value.")
        fmt = _f
        tallsv = tallsvar(enhet="NOK billion")
        sporsmal_tekst = "What is the junior debt worth today, in NOK billion? Answer with four decimals."
    if f1 <= 0:
        raise Avvis("fella gir negativ verdi")
    ulike(riktig, f1, f2, f3, rel=0.02)
    tab = _tabell([(k, nt[k][0], nt[k][1]) for k in strikes])
    KSt = tall(KS, 0) if KS == int(KS) else tall(KS, 1)
    KJt = tall(KJ, 0) if KJ == int(KJ) else tall(KJ, 1)
    Vt = tall(V, 0) if V == int(V) else tall(V, 1)
    q = (f"<p>{navn} has {N} million shares, a total market value of NOK {Vt} billion and no debt. Markets are "
         f"perfect. The firm considers issuing two zero-coupon bonds due in {m} months and paying the proceeds out "
         f"to its shareholders at once: senior debt with face value NOK {KSt} billion and junior debt with face "
         f"value NOK {KJt} billion. European calls on its shares with {m} months to expiry are quoted below. Treat "
         f"them as options on the firm's assets per share.</p>{tab}<p>{sporsmal_tekst}</p>")
    alt = [R(fmt(riktig), riktig),
           F(fmt(f1), "The junior debt valued as if it were the only debt. The junior lenders are paid only after "
             "the senior lenders, so their claim does not start at zero.", f1),
           F(fmt(f2), "The total debt split in proportion to face value. The junior lenders bear the first "
             "losses, so their share of the value is smaller than their share of the face value.", f2),
           F(fmt(f3), n3, f3)]
    yJ = (KJ / DJ) ** (12 / m) - 1
    kort = (f"<p><b>{fmt(riktig)}.</b> Strikes {KSt}/{N} = {KSps} and ({KSt} + {KJt})/{N} = {KTps}. D<sub>J</sub> = "
            f"{N} × ({_k(cS)} − {_k(cT)})/1000 = {_f(DJ)} billion"
            + (f". y<sub>J</sub> = ({KJt}/{_f(DJ)})<sup>12/{m}</sup> − 1 = {_p(yJ)}.</p>" if spor_rente else ".</p>"))
    full = (f"<p><b>Seniority as strikes.</b> The shareholders get what is left after all the debt, so equity is a "
            f"call struck at the total face value. The senior lenders alone see only their own face value, so "
            f"senior debt is the firm minus a call struck there. The junior lenders get the slice in between: long "
            f"the call at the senior strike, short the call at the total strike.</p>"
            f"<p><b>Step 1: the strikes per share.</b> Senior: {KSt} billion/{N} million = {KSps}. All the debt: "
            f"({KSt} + {KJt}) billion/{N} million = {KTps}.</p>"
            f"<p><b>Step 2: the midpoints.</b> C({KSps}) = ({_k(nt[KSps][0])} + {_k(nt[KSps][1])})/2 = {_k(cS)}. "
            f"C({KTps}) = ({_k(nt[KTps][0])} + {_k(nt[KTps][1])})/2 = {_k(cT)}.</p>"
            f"<p><b>Step 3: the claims.</b> E = {N} × {_k(cT)}/1000 = {_f(E)}. D<sub>S</sub> = {Vt} − {N} × "
            f"{_k(cS)}/1000 = {_f(DS)}. D<sub>J</sub> = {N} × ({_k(cS)} − {_k(cT)})/1000 = <b>{_f(DJ)}</b> billion"
            + (f". Over {m} months: y<sub>J</sub> = ({KJt}/{_f(DJ)})<sup>12/{m}</sup> − 1 = <b>{_p(yJ)}</b>."
               if spor_rente else ".")
            + f"</p>"
            f"<p><b>First check.</b> D<sub>S</sub> + D<sub>J</sub> + E = {_f(DS)} + {_f(DJ)} + {_f(E)} = "
            f"{_f(DS + DJ + E)} = V ✓ This is an identity, so it catches arithmetic slips only. The senior yield, "
            f"({KSt}/{_f(DS)})<sup>12/{m}</sup> − 1 = {_p((KS / DS) ** (12 / m) - 1)}, is far below the junior "
            f"one, as it should be.</p>"
            f"<p><b>Remember:</b> D<sub>J</sub> = C(K<sub>S</sub>) − C(K<sub>S</sub> + K<sub>J</sub>), never V − "
            f"C(K<sub>J</sub>).</p>")
    return sporsmal(q, alt, kort, full, tall=tallsv)


# ---------------------------------------------------------------------------
# kre-cds1 · CDS priset med ρ (lecture 10)
# ---------------------------------------------------------------------------
@familie("kre-cds1", tema="kreditt", antall=5, tittel="A CDS priced with the risk-neutral default probability",
         hjelp=hjelp3(
             "This is a credit default swap. Bond prices imply a risk-neutral probability of default. That "
             "probability prices the CDS. Real default probabilities do not.",
             "Risky bond: D = [(1 − q)K + q × R]/(1 + r<sub>f</sub>), with R the payment in default. A CDS that pays 1 "
             "on default costs q/(1 + r<sub>f</sub>). To hedge the bond you need λ = K − R of them (λ = K × LGD).",
             "<p><b>Step 1: the bond's price.</b> From its promised yield.</p>"
             "<p><b>Step 2: q.</b> Set the price equal to the risk-neutral expected payment discounted at "
             "r<sub>f</sub> and solve.</p>"
             "<p><b>Step 3: the CDS.</b> Weight its payment by q and discount at r<sub>f</sub>. Scale up if you "
             "hedge the whole bond.</p>"
             "<p><b>Watch out:</b> the recovery in default lowers the loss the CDS must cover.</p>",
         ))
def _(r):
    navn = r.choice(FIRMA)
    K = 100
    rf = r.choice([0.03, 0.04, 0.05])
    y = r.choice([0.08, 0.09, 0.10, 0.11, 0.12])
    R_ = r.choice([40, 50, 60, 70, 80])
    p = r.choice([0.04, 0.05, 0.08, 0.10])
    D = K / (1 + y)
    q = (K - (1 + rf) * D) / (K - R_)
    if not 0 < q < 0.6:
        raise Avvis("urimelig q")
    typ = r.choice(["q", "pris", "sikring"])
    q_uten = 1 - (1 + rf) * D / K
    if typ == "q":
        riktig = q
        f1, f2 = p, q_uten
        f3 = (K - D) / (K - R_)
        n3 = ("q found without growing the bond's price at r<sub>f</sub>. Under q the bond must earn the "
              "risk-free rate, not 0.")
        fmt = _f
        tallsv = tallsvar()
        spm = "What risk-neutral probability of default do the prices imply? Answer as a probability with four decimals."
    elif typ == "pris":
        riktig = q / (1 + rf)
        f1 = p / (1 + rf)
        f2 = q_uten / (1 + rf)
        f3 = q
        n3 = "The risk-neutral probability itself, which is not a price: the CDS pays only in one year."
        fmt = _f
        tallsv = tallsvar()
        spm = ("A CDS pays 1 at the end of the year if the issuer defaults and nothing otherwise. What is its price "
               "today? Answer with four decimals.")
    else:
        lam = K - R_
        riktig = lam * q / (1 + rf)
        f1 = lam * p / (1 + rf)
        f2 = K * q / (1 + rf)
        f3 = lam * q
        n3 = "The CDS payments not discounted. They arrive in one year, not today."
        fmt = _f
        tallsv = tallsvar()
        spm = ("A CDS pays 1 at the end of the year if the issuer defaults and nothing otherwise. What does it cost "
               "today to buy enough of them to hedge one bond fully? Answer with four decimals.")
    if typ == "q":
        n1 = (f"This is the real default probability. Prices imply a risk-neutral one, which is higher because "
              "defaults cluster in bad times, when a krone is worth more.")
        n2 = (f"q computed as if the bond paid nothing in default. It pays {R_} then, so a default costs the "
              "lenders less than the whole face value.")
    elif typ == "pris":
        n1 = (f"The real default probability {tall(p, 2)} discounted at r<sub>f</sub>. A CDS is priced with the "
              "risk-neutral probability implied by the bond prices.")
        n2 = (f"q computed as if the bond paid nothing in default. It pays {R_} then, so a default costs the "
              "lenders less than the whole face value.")
    else:
        n1 = (f"The hedge priced with the real default probability {tall(p, 2)}. Prices imply the risk-neutral q. "
              "The hedge must cost what it costs in the market.")
        n2 = (f"{K} CDSs, one per krone of face value. In default the bond still pays {R_}, so this insures more "
              "than the lenders can lose.")
    ulike(riktig, f1, f2, f3, rel=0.02)
    qtekst = (f"<p>Two one-year zero-coupon bonds promise to repay {K} in one year. The first is a government bond with "
         f"a yield of {_p(rf, 1)}, the risk-free rate. The second is issued by {navn} and has a promised yield of "
         f"{_p(y, 1)}. If {navn} defaults, the bond pays {R_} instead of {K}. Analysts estimate the real "
         f"probability of default at {_p(p, 0)}.</p><p>{spm}</p>")
    alt = [R(fmt(riktig), riktig), F(fmt(f1), n1, f1), F(fmt(f2), n2, f2), F(fmt(f3), n3, f3)]
    qv = (K - (1 + rf) * D) / (K - R_)
    pris = qv / (1 + rf)
    kort = (f"<p><b>{fmt(riktig)}.</b> D = {K}/{_vekst(y)} = {_f(D)}. q = ({K} − {_vekst(rf)} × {_f(D)})/({K} − "
            f"{R_}) = {_f(qv) if typ == 'q' else _f6(qv)}"
            + {"q": ".</p>",
               "pris": f". CDS = {_f6(qv)}/{_vekst(rf)} = {_f(pris)}.</p>",
               "sikring": f". One CDS = {_f6(qv)}/{_vekst(rf)} = {_f6(pris)}; λ = {K - R_} of them cost {_f(riktig)}.</p>"}[typ])
    pvk = K / (1 + rf)
    full = (f"<p><b>What a CDS is.</b> Risky debt is risk-free debt minus a put: the issuer may hand over less than "
            f"it promised. A CDS buys that put back. It pays the lender's loss in default, so the risky bond plus "
            f"enough protection is a risk-free bond. Its price comes from the risk-neutral default probability "
            f"that the bond prices imply, not from a forecast.</p>"
            f"<p><b>Step 1: the bond's price.</b> D = {K}/{_vekst(y)} = {_f(D)}.</p>"
            f"<p><b>Step 2: q.</b> {_f(D)} = [(1 − q) × {K} + q × {R_}]/{_vekst(rf)}, so q = ({K} − {_vekst(rf)} × "
            f"{_f(D)})/({K} − {R_}) = {_f(qv) if typ == 'q' else _f6(qv)}"
            + (f" = <b>{_f(qv)}</b>, against a real probability of {_p(p, 0)}.</p>" if typ == "q" else ".</p>")
            + (f"<p><b>Step 3: the CDS.</b> It pays 1 with probability q: {_f6(qv)}/{_vekst(rf)} = "
               f"{'<b>' + _f(pris) + '</b>' if typ == 'pris' else _f6(pris)}.</p>" if typ != "q" else "")
            + (f"<p><b>Step 4: the hedge.</b> In default the bond pays {R_}, so the loss is {K} − {R_} = {K - R_} and "
               f"you need λ = {K - R_} CDSs: {K - R_} × {_f6(pris)} = <b>{_f(riktig)}</b>.</p>" if typ == "sikring" else "")
            + f"<p><b>First check.</b> Bond plus full protection: {_f(D)} + {K - R_} × {_f6(pris)} = "
            f"{_f(D + (K - R_) * pris)} = {K}/{_vekst(rf)} = {_f(pvk)}, the government bond ✓ This is how q was "
            f"defined, so it is an identity: it catches arithmetic slips, not a wrong recovery.</p>"
            f"<p><b>Remember:</b> q comes from bond prices and is above the real default probability. Risky bond "
            f"+ CDS = risk-free bond.</p>")
    return sporsmal(qtekst, alt, kort, full, tall=tallsv)


# ---------------------------------------------------------------------------
# kre-exr1 · Forventet avkastning mot lovet rente, og gjeldsbetaen
# ---------------------------------------------------------------------------
@familie("kre-exr1", tema="kreditt", antall=5, tittel="Expected return against promised yield on risky debt",
         hjelp=hjelp3(
             "This is the gap between what a bond promises and what its holders can expect. The promised yield "
             "assumes full payment; the expected return weights in default.",
             "Price D = K/(1 + y). E[payment] = (1 − p) × K + p × R, with p the real default probability and R the "
             "payment in default. r<sub>D</sub> = E[payment]/D − 1. β<sub>D</sub> = (r<sub>D</sub> − r<sub>f</sub>)/"
             "(market risk premium).",
             "<p><b>Step 1: the price</b> from the promised yield.</p>"
             "<p><b>Step 2: the expected payment</b> with the real probability of default.</p>"
             "<p><b>Step 3: the expected return.</b> From it, the debt beta if asked.</p>"
             "<p><b>Watch out:</b> the expected loss is not a risk premium. The recovery is not lost.</p>",
         ))
def _(r):
    navn = r.choice(FIRMA)
    K = r.choice([100, 1000])
    y = r.choice([0.07, 0.08, 0.09, 0.10, 0.12])
    p = r.choice([0.03, 0.04, 0.05, 0.06, 0.08])
    rec = r.choice([0.40, 0.50, 0.60, 0.70])
    rf = r.choice([0.03, 0.04])
    mrp = r.choice([0.05, 0.06])
    R_ = K * rec
    D = K / (1 + y)
    EP = (1 - p) * K + p * R_
    rD = EP / D - 1
    if rD <= rf + 0.002:
        raise Avvis("forventet avkastning må ligge over r_f")
    bD = (rD - rf) / mrp
    f_alt = ((1 - p) * K) / D - 1                         # gjenvinningen glemt
    spor_beta = r.random() < 0.45
    if spor_beta:
        riktig = bD
        f1 = (y - rf) / mrp
        f2 = (f_alt - rf) / mrp
        f3 = 0.0
        n1 = (f"Beta taken from the whole spread y − r<sub>f</sub>. Part of the spread is expected loss, money the "
              "lenders never expect to get. Only r<sub>D</sub> − r<sub>f</sub> is a reward for systematic risk.")
        n2 = (f"The recovery left out: in default the lenders get {tall(R_, 0)}, not 0. That understates "
              "r<sub>D</sub> and β<sub>D</sub>.")
        n3 = ("A beta of 0 treats the debt as safe once expected loss is removed. r<sub>D</sub> is still above "
              "r<sub>f</sub>, because defaults cluster in bad times.")
        fmt = _f
        tallsv = tallsvar(abs=0.0005)
        spm = (f"The market risk premium is {_p(mrp, 1)}. Compute the expected return from the expected payment and "
               f"the price. What is the beta of {gen(navn)} debt implied by that expected return? Answer with four "
               f"decimals.")
    else:
        riktig = rD
        f1 = y
        f2 = f_alt
        f3 = rf
        n1 = ("This is the promised yield, earned only if every payment arrives. With a chance of default the "
              "lenders expect less.")
        n2 = (f"The recovery left out: in default the lenders still get {tall(R_, 0)}. Only the loss of "
              f"{tall(K - R_, 0)} is lost.")
        n3 = ("The risk-free rate is the expected return under the risk-neutral probability. With the real "
              "probability of default the lenders earn a risk premium, because defaults cluster in bad times.")
        fmt = _p
        tallsv = tallsvar(skala=100, enhet="%")
        spm = (f"Compute the expected return from the expected payment and the price. What is the expected return "
               f"on {gen(navn)} bond? Answer in percent with two decimals.")
    ulike(riktig, f1, f2, f3, rel=0.02)
    q = (f"<p>{navn} has a one-year zero-coupon bond with face value {tall(K, 0)} and a promised yield of {_p(y, 1)}. "
         f"The real probability of default is {_p(p, 0)}. In default the lenders recover {_p(rec, 0)} of the face "
         f"value. The risk-free rate is {_p(rf, 1)}.</p><p>{spm}</p>")
    alt = [R(fmt(riktig), riktig), F(fmt(f1), n1, f1), F(fmt(f2), n2, f2), F(fmt(f3), n3, f3)]
    kort = (f"<p><b>{fmt(riktig)}.</b> D = {tall(K, 0)}/{_vekst(y)} = {_f(D)}. E[payment] = {tall(1 - p, 2)} × "
            f"{tall(K, 0)} + {tall(p, 2)} × {tall(R_, 0)} = {_k(EP)}. r<sub>D</sub> = {_k(EP)}/{_f(D)} − 1 = {_p(rD)}"
            + (f". β<sub>D</sub> = ({_p(rD)} − {_p(rf, 1)})/{_p(mrp, 1)} = {_f(bD)}.</p>" if spor_beta else ".</p>"))
    full = (f"<p><b>Promised and expected.</b> The yield {_p(y, 1)} is what the bond pays if nothing goes wrong. "
            f"With a {_p(p, 0)} chance of default the holders expect less, so the expected return r<sub>D</sub> is "
            f"below the yield. The gap is the expected loss, p × L. What is left above r<sub>f</sub> is the risk "
            f"premium. Only that part says anything about β<sub>D</sub>.</p>"
            f"<p><b>Step 1: the price.</b> D = {tall(K, 0)}/{_vekst(y)} = {_f(D)}.</p>"
            f"<p><b>Step 2: the expected payment.</b> {tall(1 - p, 2)} × {tall(K, 0)} + {tall(p, 2)} × "
            f"{tall(R_, 0)} = {_k(EP)}.</p>"
            f"<p><b>Step 3: the expected return.</b> r<sub>D</sub> = {_k(EP)}/{_f(D)} − 1 = "
            f"{'<b>' + _p(rD) + '</b>' if not spor_beta else _p(rD)}.</p>"
            + (f"<p><b>Step 4: the beta.</b> β<sub>D</sub> = ({_p(rD)} − {_p(rf, 1)})/{_p(mrp, 1)} = "
               f"<b>{_f(bD)}</b>.</p>" if spor_beta else "")
            + f"<p><b>First check.</b> The spread splits in two: y − r<sub>f</sub> = {_p(y - rf)} = (y − r<sub>D</sub>) + "
            f"(r<sub>D</sub> − r<sub>f</sub>) = {_p(y - rD)} + {_p(rD - rf)} ✓ and r<sub>f</sub> &lt; r<sub>D</sub> "
            f"&lt; y. The quick formula r<sub>D</sub> ≈ y − p × L = {_p(y - p * (1 - rec))} is close but not exact, "
            f"because the loss is measured on the face value while the return is on the price.</p>"
            f"<p><b>Remember:</b> never use the promised yield as r<sub>D</sub> in a WACC. The expected loss is not "
            f"a risk premium.</p>")
    return sporsmal(q, alt, kort, full, tall=tallsv)


# ---------------------------------------------------------------------------
# kre-ris1 · Overføring fra kreditorene ved høyere risiko
# ---------------------------------------------------------------------------
@familie("kre-ris1", tema="kreditt", antall=5, tittel="The transfer to shareholders when asset risk rises",
         hjelp=hjelp3(
             "This is risk shifting priced with options. The firm swaps its assets for riskier ones worth the same "
             "today. You need what the shareholders gain, which is what the lenders lose.",
             "E = [ρ max(V<sub>u</sub> − K, 0) + (1 − ρ) max(V<sub>d</sub> − K, 0)]/(1 + r<sub>f</sub>), with ρ = "
             "[(1 + r<sub>f</sub>)V<sub>0</sub> − V<sub>d</sub>]/(V<sub>u</sub> − V<sub>d</sub>) taken from each asset's own "
             "tree.",
             "<p><b>Step 1: equity before.</b> ρ from the current assets, then the call.</p>"
             "<p><b>Step 2: equity after.</b> The new assets have their own tree, so they have their own ρ.</p>"
             "<p><b>Step 3: the difference.</b> V<sub>0</sub> is the same, so the lenders lose what the "
             "shareholders gain.</p>"
             "<p><b>Watch out:</b> the same value today does not mean the claims are unchanged.</p>",
         ))
def _(r):
    navn = r.choice(FIRMA)
    V0 = r.choice([200, 300, 400, 500])
    rf = r.choice([0.03, 0.04, 0.05])
    uA, dA = r.choice([(1.20, 0.90), (1.25, 0.85), (1.20, 0.85)])
    uB, dB = r.choice([(1.50, 0.70), (1.60, 0.60), (1.45, 0.65)])
    VuA, VdA, VuB, VdB = V0 * uA, V0 * dA, V0 * uB, V0 * dB
    K = round(V0 * r.choice([0.90, 0.95, 1.0]) / 10) * 10
    if not (VdA < K < VuA and VdB < K < VuB):
        raise Avvis("pålydende utenfor trærne")
    rhoA = ((1 + rf) - dA) / (uA - dA)
    rhoB = ((1 + rf) - dB) / (uB - dB)
    EA = rhoA * (VuA - K) / (1 + rf)
    EB = rhoB * (VuB - K) / (1 + rf)
    gevinst = EB - EA
    p = r.choice([0.55, 0.60, 0.65])
    f_gammelrho = rhoA * (VuB - K) / (1 + rf) - EA
    f_reell = p * (VuB - K) / (1 + rf) - p * (VuA - K) / (1 + rf)
    f_kred = -gevinst
    if gevinst < 1:
        raise Avvis("for liten overføring")
    ulike(gevinst, f_gammelrho, f_reell, f_kred, rel=0.02)
    q = (f"<p>{navn} has assets worth NOK {V0} million today. In one year they will be worth NOK {tall(VuA, 0)} million "
         f"or NOK {tall(VdA, 0)} million. Its only debt is a zero-coupon bond with face value NOK {K} million due in "
         f"one year. Management can swap the assets for a riskier set, also worth NOK {V0} million today, that will "
         f"be worth NOK {tall(VuB, 0)} million or NOK {tall(VdB, 0)} million in one year. The riskier set's outcome "
         f"depends on a different factor from the current set's. Both asset sets are traded. The risk-free rate is "
         f"{_p(rf, 1)}. Analysts put the probability of each set's high outcome at {tall(p, 2)}. Markets are perfect "
         f"and the swap costs nothing.</p>"
         f"<p>By how much does the swap change the value of the equity, in NOK million? Answer with four "
         f"decimals.</p>")
    alt = [R(_f(gevinst), gevinst),
           F(_f(f_kred), "This is the change in the debt. The lenders lose and the shareholders gain the same "
             "amount, because the firm is worth the same.", f_kred),
           F(_f(f_gammelrho), "The current assets' ρ used on the new tree. The new assets depend on a different "
             "factor, so they have their own ρ: the one that makes them earn r<sub>f</sub>.", f_gammelrho),
           F(_f(f_reell), f"The analysts' {tall(p, 2)} used with r<sub>f</sub>. The risk is priced, so the claims must "
             "be valued with ρ from each asset's own prices.", f_reell)]
    kort = (f"<p><b>{_f(gevinst)}.</b> Before: ρ = {_rho(rhoA)}, E = {_rho(rhoA)} × {tall(VuA - K, 0)}/{_vekst(rf)} = "
            f"{_f(EA)}. After: ρ = {_rho(rhoB)}, E = {_rho(rhoB)} × {tall(VuB - K, 0)}/{_vekst(rf)} = {_f(EB)}. Gain = "
            f"{_f(gevinst)}, taken from the lenders.</p>")
    DA, DB = V0 - EA, V0 - EB
    full = (f"<p><b>Why risk moves value.</b> Equity is a call on the assets struck at the face value. A call "
            f"gains from a wider spread of outcomes. Debt is risk-free debt minus a put. The put the lenders "
            f"have written gains too, which hurts them. With the firm's value unchanged the swap creates nothing: "
            f"it moves value from the lenders to the shareholders (check 4).</p>"
            f"<p><b>Step 1: before.</b> ρ<sub>A</sub> = ({_vekst(rf)} − {tall(dA, 2)})/({tall(uA, 2)} − {tall(dA, 2)}) "
            f"= {_rho(rhoA)}. The equity pays {tall(VuA - K, 0)} or 0: E = {_rho(rhoA)} × {tall(VuA - K, 0)}/{_vekst(rf)} = "
            f"{_f(EA)}.</p>"
            f"<p><b>Step 2: after.</b> ρ<sub>B</sub> = ({_vekst(rf)} − {tall(dB, 2)})/({tall(uB, 2)} − {tall(dB, 2)}) = "
            f"{_rho(rhoB)}. The equity pays {tall(VuB - K, 0)} or 0: E = {_rho(rhoB)} × {tall(VuB - K, 0)}/{_vekst(rf)} = "
            f"{_f(EB)}.</p>"
            f"<p><b>Step 3: the change.</b> {_f(EB)} − {_f(EA)} = <b>{_f(gevinst)}</b>.</p>"
            f"<p><b>Check 4.</b> Debt before: {V0} − {_f(EA)} = {_f(DA)}. After: {V0} − {_f(EB)} = {_f(DB)}. The "
            f"lenders lose {_f(DA - DB)}, exactly the shareholders' gain ✓ Here D was found as V − E, so the check is "
            f"an identity. Pricing the debt state by state, [ρ<sub>B</sub> × {K} + (1 − ρ<sub>B</sub>) × "
            f"{tall(VdB, 0)}]/{_vekst(rf)} = {_f((rhoB * K + (1 - rhoB) * VdB) / (1 + rf))}, makes it a real one.</p>"
            f"<p><b>Remember:</b> more asset risk with the same V is a transfer from lenders to shareholders. That "
            f"is why lenders write covenants and price the risk in advance.</p>")
    return sporsmal(q, alt, kort, full, tall=tallsvar(enhet="NOK million"))


# ===========================================================================
# Statiske spørsmål: verdipapirer som opsjoner, lovet mot forventet,
# CDS, overføringer og coinsurance (D11, B4, lecture 10 og 12).
# ===========================================================================
_H_OPS = hjelp3(
    "This is about the firm's claims seen as options on its assets. Ask what each claim pays at maturity, state by "
    "state.",
    "Equity at maturity: max(V − K, 0), a call on the assets with strike K. Debt: min(V, K) = K − max(K − V, 0), "
    "risk-free debt minus a put. Put-call parity: C + PV(K) = V + P.",
    "<p><b>Step 1: write the payoff.</b> What does the claim pay when V is above K and when it is below?</p>"
    "<p><b>Step 2: match it to options.</b> A call, a put, a bond or a combination.</p>"
    "<p><b>Step 3: name the parts.</b> The underlying, the strike, the maturity and who holds which side.</p>",
)

statisk(
    "kre-s01", tema="kreditt", type="tolkning",
    hjelp=hjelp3(
        "This is about a firm's debt seen as an option position. Ask what the lenders actually receive at "
        "maturity and why.",
        "Limited liability: the shareholders may hand over the assets instead of paying the face value K. A put "
        "on an asset with strike K pays max(K − V, 0).",
        "<p><b>Step 1: the two cases.</b> Write what the lenders receive when the assets are worth more than K "
        "and when they are worth less.</p>"
        "<p><b>Step 2: compare with a sure K.</b> In which case do the lenders get less than a risk-free bond? "
        "By how much?</p>"
        "<p><b>Step 3: name the option.</b> Which option pays that shortfall, who holds it and who has written "
        "it? A full answer names the underlying, the strike and the maturity.</p>",
    ),
    q="<p>An exam question asks: «Explain why a firm's risky debt can be seen as risk-free debt minus a put "
      "option.»</p>"
      "<p>Which answer earns full marks?</p>",
    alternativer=[
        F("The lenders hold a put on the firm's shares with strike equal to the share price, which they exercise "
          "when the shares fall",
          "The option is on the firm's assets, not its shares. Its strike is the face value of the debt. The "
          "lenders have written the put, they do not hold it."),
        R("The lenders get min(V, K) = K − max(K − V, 0): a sure K minus a put on the assets they have written"),
        F("The debt pays K, but inflation can erode its value, so it is risk-free debt minus the loss of "
          "purchasing power",
          "Default, not inflation, is the risk here. The put is the shareholders' right to hand over the assets "
          "instead of paying K."),
        F("The firm can buy its debt back early at market value, which acts as a put held by the shareholders "
          "against the lenders",
          "The put has nothing to do with early repurchase. It is limited liability: at maturity the shareholders "
          "can walk away and leave the assets to the lenders."),
    ],
    kort="<p><b>min(V, K) = K − max(K − V, 0).</b> A sure K minus a put on the assets struck at K. The lenders "
         "have written it; the put is the shareholders' right to default.</p>",
    full="<p><b>The payoff.</b> A zero-coupon bond promises K at maturity. If the firm's assets V are worth at "
         "least K, the lenders get K. If V is below K, limited liability lets the shareholders walk away and the "
         "lenders get V. So the lenders get min(V, K).</p>"
         "<p><b>Step 1: rewrite it.</b> min(V, K) = K − max(K − V, 0). The first term is what a risk-free bond pays. "
         "The second is the payoff of a put on the assets with strike K.</p>"
         "<p><b>Step 2: who holds what.</b> The lenders get K minus the put's payoff, so they are short the put. "
         "The shareholders hold it: it is their right to sell the assets to the lenders for K, which is what "
         "default amounts to.</p>"
         "<p><b>Step 3: the value.</b> D = PV(K) − P(V, K). The credit spread is the price of that put spread "
         "over the debt. Anything that raises the put, such as more asset volatility, lowers the debt.</p>"
         "<p><b>A full answer names</b> the underlying (the firm's assets), the strike (the face value), the "
         "maturity (the bond's) and who has written the put (the lenders). Kurbatov said in the wrap-up that this "
         "can come as a verbal question.</p>"
         "<p><b>Remember:</b> risky debt = risk-free debt − put on the assets, struck at the face value.</p>",
)

statisk(
    "kre-s02", tema="kreditt", type="begrep", hjelp=_H_OPS,
    q="<p>A firm's equity is worth NOK 500 million and its only debt, a zero-coupon bond due in five years, has a "
      "market value of NOK 250 million. The bond was issued at 10% a year compounded, so it will repay NOK 402.6 "
      "million at maturity.</p>"
      "<p>Seen as a call option, what are the underlying, the strike and the maturity of the equity?</p>",
    alternativer=[
        F("A call on the shares with strike NOK 250 million and five years to maturity",
          "The equity is the call, so its underlying cannot be the shares. And 250 is the debt's market value today, "
          "not what must be repaid."),
        F("A call on the firm's assets with strike NOK 250 million and five years to maturity",
          "The strike is what the shareholders must pay to keep the assets at maturity: the face value of 402.6, "
          "not the debt's market value of 250."),
        R("A call on the firm's assets, worth NOK 750 million, with strike NOK 402.6 million and five years to "
          "maturity"),
        F("A call on the firm's assets, worth NOK 750 million, with strike NOK 402.6 million discounted to today and "
          "no maturity",
          "The strike is paid at maturity, so it is the face value itself. Discounting happens when the option "
          "is priced, not in its definition."),
    ],
    kort="<p><b>A call on the assets, strike 402.6, five years.</b> V = 500 + 250 = 750. The shareholders keep "
         "the assets at maturity only if they pay the face value.</p>",
    full="<p><b>Equity as a call.</b> At maturity the shareholders get max(V − K, 0): if the assets are worth more "
         "than what the debt must repay, they pay it and keep the rest. Otherwise they hand over the assets. "
         "That is a call on the assets with the face value as strike.</p>"
         "<p><b>Step 1: the underlying.</b> The firm's assets, worth E + D = 500 + 250 = NOK 750 million today.</p>"
         "<p><b>Step 2: the strike.</b> What must be repaid at maturity: 250 × 1.10<sup>5</sup> = NOK 402.6 million. "
         "The market value today, 250, is the price of the debt, not its face value.</p>"
         "<p><b>Step 3: the maturity.</b> The bond's, five years.</p>"
         "<p><b>The same firm, debt as options.</b> Debt = assets minus the call, or a risk-free bond paying 402.6 "
         "minus a put on the assets struck at 402.6. This is PS3 Exercise 7 (Wesley), where the course key also "
         "slips and writes the face value as 250 for the put.</p>"
         "<p><b>Remember:</b> the strike is the face value at maturity, never the debt's market value today.</p>",
)

statisk(
    "kre-s03", tema="kreditt", type="begrep",
    hjelp=hjelp3(
        "This is the difference between a bond's promised yield and its expected return: which one belongs "
        "in a cost of capital.",
        "Promised yield y: the return if every payment arrives. Expected return r<sub>D</sub> = y − p × L "
        "approximately, with p the default probability and L the loss given default. r<sub>wacc</sub> uses "
        "r<sub>D</sub>.",
        "<p><b>Step 1: what each rate assumes.</b> Does it assume full payment, or the average outcome with "
        "defaults included?</p>"
        "<p><b>Step 2: the gap.</b> What is the difference between the two rates made of?</p>"
        "<p><b>Step 3: the WACC.</b> The WACC weights the investors' required returns. Which of the two rates is "
        "the lenders' required return?</p>",
    ),
    q="<p>An analyst values a firm with the WACC and uses the promised yield on its bonds, 11%, as r<sub>D</sub>. "
      "The bonds have a meaningful chance of default.</p>"
      "<p>What is wrong with this?</p>",
    alternativer=[
        F("Nothing: the yield is what the market demands, so it is the cost of debt",
          "The yield is what the firm promises, not what lenders expect. With default possible they expect less. "
          "r<sub>D</sub> is that expected return."),
        F("The yield understates r<sub>D</sub>, because lenders also demand a premium for default risk",
          "The premium for default risk is already part of the yield. Adding it on top counts it twice."),
        F("The yield should be lowered by the full credit spread to the risk-free rate",
          "That removes the risk premium too and sets r<sub>D</sub> = r<sub>f</sub>. Only the expected loss comes "
          "off; the part of the spread that rewards systematic risk stays."),
        R("The yield overstates r<sub>D</sub>: it assumes full payment, so it includes the expected loss"),
    ],
    kort="<p><b>The yield includes the expected loss.</b> r<sub>D</sub> ≈ y − p × L. Using y overstates the cost of "
         "debt and the WACC.</p>",
    full="<p><b>Promised and expected.</b> A bond's yield is the discount rate that makes its promised payments "
         "equal its price. It is earned only if the firm pays in full. With a chance of default the lenders expect "
         "less, so their expected return r<sub>D</sub> is below the yield.</p>"
         "<p><b>Step 1: the gap.</b> y − r<sub>D</sub> is roughly p × L, the expected loss: money the lenders never "
         "expect to get. It is not a reward for anything.</p>"
         "<p><b>Step 2: what stays.</b> r<sub>D</sub> − r<sub>f</sub> is a risk premium, because defaults cluster in "
         "bad times. That is why β<sub>D</sub> &gt; 0 even after removing the expected loss.</p>"
         "<p><b>Step 3: the WACC.</b> The WACC weights the investors' expected returns. Using y for r<sub>D</sub> "
         "counts the expected loss as if it were a cost of capital, which overstates the WACC and understates the "
         "firm's value. Kurbatov's CDS example: a promised yield of 10% with an expected return of 7.8%.</p>"
         "<p><b>Remember:</b> y is promised, r<sub>D</sub> is expected. Only r<sub>D</sub> goes into the WACC and "
         "into β<sub>D</sub>.</p>",
)

statisk(
    "kre-s04", tema="kreditt", type="tolkning",
    hjelp=hjelp3(
        "This is about the default probability implied by bond prices compared with the real default "
        "probability.",
        "The risk-neutral probability q makes the bond earn r<sub>f</sub>: D = [(1 − q)K + qR]/(1 + r<sub>f</sub>). "
        "The real probability p makes it earn r<sub>D</sub> &gt; r<sub>f</sub>.",
        "<p><b>Step 1: compare the discount rates.</b> Which probability goes with r<sub>f</sub> and which with "
        "r<sub>D</sub>?</p>"
        "<p><b>Step 2: the weights.</b> To bring the bond's expected return down to r<sub>f</sub>, which state "
        "needs more weight?</p>"
        "<p><b>Step 3: why.</b> When do defaults tend to happen?</p>",
    ),
    q="<p>From bond prices you back out a risk-neutral default probability of 12% for a firm. Rating agencies, "
      "using decades of data, put its real default probability at 4%.</p>"
      "<p>How do you explain the gap?</p>",
    alternativer=[
        R("Defaults hit in recessions, so prices put extra weight on default"),
        F("The market forecasts more defaults than the agencies, so one of the two estimates must be wrong",
          "Both can be right. The risk-neutral probability is a pricing weight, not a forecast. It is above "
          "the real one whenever default risk is priced."),
        F("The risk-neutral probability includes the recovery rate, which the real probability leaves out",
          "Recovery enters both calculations as the payment in default. The gap comes from the risk premium, not "
          "from recovery."),
        F("Bond prices fall when rates rise, which mechanically inflates the implied default probability",
          "The implied probability uses the risk-free rate at the same date. A change in rates moves both bonds "
          "and does not create a gap of this kind."),
    ],
    kort="<p><b>The risk premium.</b> q makes the bond earn r<sub>f</sub>. Because defaults hit in bad times, the "
         "bond must earn more than r<sub>f</sub> under the real probability, so q &gt; p.</p>",
    full="<p><b>Two probabilities, two discount rates.</b> With the real probability p the bond's expected payment, "
         "discounted at r<sub>D</sub>, gives its price. With the risk-neutral q the expected payment discounted at "
         "r<sub>f</sub> gives the same price. Since r<sub>D</sub> &gt; r<sub>f</sub>, q must make the expected "
         "payment smaller, which means more weight on default.</p>"
         "<p><b>Step 1: why r<sub>D</sub> &gt; r<sub>f</sub>.</b> Defaults cluster in recessions, when investors' "
         "other income is low and a krone is worth more. Lenders demand a premium for bearing losses then.</p>"
         "<p><b>Step 2: the consequence.</b> q &gt; p. The gap measures the price of default risk, not a "
         "disagreement about how often firms default.</p>"
         "<p><b>Step 3: what each is for.</b> q prices claims such as CDSs and is discounted at r<sub>f</sub>. p "
         "forecasts losses and goes with the risky rate. The same logic makes ρ for a share differ from the real "
         "probability of the up state (opsjoner).</p>"
         "<p><b>Remember:</b> the risk-neutral default probability exceeds the real one. It prices, it does not "
         "forecast.</p>",
)

statisk(
    "kre-s05", tema="kreditt", type="begrep",
    hjelp=hjelp3(
        "This is about what a credit default swap is in option terms and what it does to a lender's position.",
        "Risky debt: D = PV(K) − P. A CDS pays the lender's loss in default, max(K − V, 0) on the whole issue. "
        "D + CDS = PV(K).",
        "<p><b>Step 1: the CDS payoff.</b> In which states does it pay? How much does it pay there?</p>"
        "<p><b>Step 2: match it.</b> Which option on the firm's assets has the same payoff?</p>"
        "<p><b>Step 3: add it to the bond.</b> Write the bond's payoff plus the CDS payoff state by state. What "
        "does the lender hold then?</p>",
    ),
    q="<p>A pension fund holds a corporate bond and buys a CDS that covers the full loss on it if the issuer "
      "defaults.</p>"
      "<p>What does the fund now hold, in option terms?</p>",
    alternativer=[
        F("A risky bond plus a call on the firm's assets, so it now shares in the upside",
          "The CDS pays only in default, when the assets are worth less than the face value. That is a put, not "
          "a call. It adds no upside."),
        R("A risk-free bond: the CDS buys back the put the bond holder had written"),
        F("A bond that is still risky, since a CDS only pays a fixed amount of 1 per contract",
          "A contract that pays 1 can be bought in the right number, λ = K × LGD, to cover the full loss. The "
          "question says the loss is fully covered."),
        F("The firm's equity, since it now bears the firm's default risk",
          "The fund has handed the default risk to the CDS seller. The equity holders still hold the call."),
    ],
    kort="<p><b>A risk-free bond.</b> Risky debt = PV(K) − put. The CDS is that put, so bond + CDS = PV(K).</p>",
    full="<p><b>What the lender has written.</b> A corporate bond pays K − max(K − V, 0): risk-free debt minus a put "
         "on the assets struck at the face value. The lender carries that put.</p>"
         "<p><b>Step 1: the CDS.</b> It pays the loss in default, max(K − V, 0) on the whole issue. That is exactly "
         "the put.</p>"
         "<p><b>Step 2: add them.</b> Bond plus CDS pays K − max(K − V, 0) + max(K − V, 0) = K in every state. The "
         "fund holds a risk-free bond. The CDS price must equal PV(K) − D.</p>"
         "<p><b>Step 3: in Kurbatov's form.</b> His CDS pays 1 on default. If the bond pays K or R, the loss is "
         "K − R, so you buy λ = K × LGD = K − R contracts. Each costs q/(1 + r<sub>f</sub>), with q the "
         "risk-neutral default probability from the bond prices.</p>"
         "<p><b>Remember:</b> a CDS is the lender's put bought back. Risky bond + CDS = risk-free bond.</p>",
)

statisk(
    "kre-s06", tema="kreditt", type="tolkning",
    hjelp=hjelp3(
        "This is about who gains and who loses when a levered firm changes the risk of its assets but not their "
        "value.",
        "E = Call(V, K): rises with asset volatility. D = PV(K) − Put(V, K): falls with asset volatility. With V "
        "fixed, ΔE = −ΔD (check 4).",
        "<p><b>Step 1: for each action, ask what it does to V.</b> Is value created, destroyed or unchanged?</p>"
        "<p><b>Step 2: ask what it does to risk.</b> Does the spread of outcomes widen or narrow?</p>"
        "<p><b>Step 3: who gains.</b> With V fixed, more risk helps the call and hurts the written put.</p>",
    ),
    q="<p>A levered firm's managers act for the shareholders. Its debt is a zero-coupon bond. Which action moves "
      "value from the lenders to the shareholders without changing the total value of the firm?</p>",
    alternativer=[
        F("Hedging the firm's exposure to oil prices with futures at fair prices",
          "Hedging narrows the spread of outcomes. With V unchanged that makes the debt safer, so value moves "
          "from the shareholders to the lenders."),
        R("Selling a safe business and buying a riskier one at the same fair price"),
        F("Issuing new equity at a fair price and using it to repay part of the debt",
          "Less debt makes the remaining debt safer, so the lenders gain. The shareholders pay for that out of "
          "their own pockets."),
        F("Investing in a positive-NPV project financed with cash",
          "That raises V, so it is not a pure transfer. Both claims can gain."),
    ],
    kort="<p><b>Swapping into riskier assets at a fair price.</b> V is unchanged, the call on the assets gains, the "
         "lenders' written put gains too: a transfer from lenders to shareholders (check 4).</p>",
    full="<p><b>The option view of risk shifting.</b> Equity is a call on the assets with the face value as strike. "
         "Debt is risk-free debt minus a put the lenders have written. A call and a put both gain from a wider "
         "spread of outcomes. With V fixed, the shareholders' gain is the lenders' loss.</p>"
         "<p><b>Step 1: the asset swap.</b> Selling a safe business and buying a risky one at fair prices leaves V "
         "unchanged but widens the spread. The equity gains, the debt loses by the same amount: check 4.</p>"
         "<p><b>Step 2: the other actions.</b> Hedging narrows the spread, so the transfer runs the other way. Repaying "
         "debt with new equity makes the rest of the debt safer and also benefits the lenders. A positive-NPV "
         "project raises V, so it is not a pure transfer.</p>"
         "<p><b>Step 3: why lenders care.</b> Rational lenders expect this and charge for it in advance, or write "
         "covenants that forbid it. In the end the shareholders pay through the interest rate.</p>"
         "<p><b>Remember:</b> more asset risk at a fair price moves value from lenders to shareholders, never "
         "creating any.</p>",
)

statisk(
    "kre-s07", tema="kreditt", type="begrep",
    hjelp=hjelp3(
        "This is the coinsurance effect: what a merger without synergies does to the debt and the equity of two "
        "levered firms.",
        "Combined firm value = sum of the two (no synergies). Combined equity = call on the sum of the assets, "
        "worth no more than the sum of the two calls. Debt = V − E.",
        "<p><b>Step 1: think state by state.</b> When one firm defaults alone, can the other cover the "
        "shortfall after the merger?</p>"
        "<p><b>Step 2: the debt.</b> Fewer defaults make the lenders better off.</p>"
        "<p><b>Step 3: the equity.</b> With total value fixed, someone pays for that.</p>",
    ),
    q="<p>Two levered firms with imperfectly correlated cash flows merge. There are no synergies and no costs. "
      "The merged firm takes over both firms' debt.</p>"
      "<p>What happens to the value of the debt and of the equity?</p>",
    alternativer=[
        F("Both rise, because the merged firm is less risky",
          "With no synergies the total value is unchanged, so both claims cannot rise at once."),
        F("Nothing changes, because the merger creates no value",
          "Total value is unchanged, but its split need not be. Ask whether the merger changes how often "
          "the debt defaults."),
        F("The debt falls and the equity rises, because the merged firm can take on more risk",
          "That is the wrong way round. After the merger one firm's good outcome covers the other's shortfall, so "
          "the debt becomes safer."),
        R("The debt rises and the equity falls by the same amount"),
    ],
    kort="<p><b>Debt up, equity down.</b> Each firm now backs the other's debt, so defaults are rarer. A call on a "
         "portfolio is worth less than a portfolio of calls.</p>",
    full="<p><b>Coinsurance.</b> Before the merger each firm's shareholders can walk away from their own debt when "
         "their own assets fall short. After the merger a shortfall in one business is covered by the other's "
         "surplus, unless both do badly at once. Defaults become rarer and the lenders are better off.</p>"
         "<p><b>Step 1: the debt.</b> Fewer and smaller defaults: the debt is worth more.</p>"
         "<p><b>Step 2: the equity.</b> Without synergies the total value is the sum of the two firms. The lenders' "
         "gain must come from the shareholders, who lose their option to default on one firm's debt while the "
         "other does well (check 4).</p>"
         "<p><b>Step 3: in option terms.</b> Before: two calls, one on each firm's assets. After: one call on the "
         "sum. A call on a portfolio is worth no more than a portfolio of calls. Kurbatov's example in lecture 12: "
         "the debt goes from 37.5 to 45 and the equity from 37.5 to 30.</p>"
         "<p><b>Remember:</b> a diversifying merger without synergies helps the lenders and hurts the "
         "shareholders. It is one reason such mergers are not a gift to shareholders.</p>",
)

statisk(
    "kre-s08", tema="kreditt", type="formel",
    hjelp=hjelp3(
        "This is about writing the junior lenders' payoff with options. They are paid after the senior lenders "
        "and before the shareholders.",
        "Senior face value K<sub>S</sub>, junior K<sub>J</sub>. Junior payoff = min(max(V − K<sub>S</sub>, 0), "
        "K<sub>J</sub>). A call C(K) pays max(V − K, 0).",
        "<p><b>Step 1: below the senior face value.</b> What do the junior lenders get?</p>"
        "<p><b>Step 2: between the two.</b> How does their payoff grow with V?</p>"
        "<p><b>Step 3: above the total face value.</b> What caps it? Combine two calls to get that shape.</p>",
    ),
    q="<p>A firm has senior zero-coupon debt with face value K<sub>S</sub> and junior zero-coupon debt with face "
      "value K<sub>J</sub>, both due on the same date. V is the value of its assets today and C(K) denotes a "
      "call on the assets with strike K.</p>"
      "<p>Which expression gives the value of the junior debt today?</p>",
    alternativer=[
        F("V − C(K<sub>J</sub>)",
          "That treats the junior debt as if it were the only debt. The junior lenders are paid only after the "
          "senior lenders, so their claim starts at K<sub>S</sub>, not at 0."),
        F("C(K<sub>J</sub>) − C(K<sub>S</sub> + K<sub>J</sub>)",
          "This puts the junior slice at the bottom, from K<sub>J</sub> up. The junior lenders are paid "
          "after the senior lenders, not before them."),
        R("C(K<sub>S</sub>) − C(K<sub>S</sub> + K<sub>J</sub>)"),
        F("V − C(K<sub>S</sub>) − C(K<sub>J</sub>)",
          "V − C(K<sub>S</sub>) is the senior debt. Subtracting a call struck at K<sub>J</sub> does not give the "
          "junior slice."),
    ],
    kort="<p><b>C(K<sub>S</sub>) − C(K<sub>S</sub> + K<sub>J</sub>).</b> The junior lenders get V − K<sub>S</sub> "
         "once the seniors are paid, capped at K<sub>J</sub>: long the call at K<sub>S</sub>, short the call at the "
         "total face value.</p>",
    full="<p><b>Seniority as layers.</b> At maturity the assets are split in order: the senior lenders take up to "
         "K<sub>S</sub>, the junior lenders the next K<sub>J</sub> and the shareholders whatever is left.</p>"
         "<p><b>Step 1: the payoff.</b> Below K<sub>S</sub> the juniors get 0. Between K<sub>S</sub> and "
         "K<sub>S</sub> + K<sub>J</sub> they get V − K<sub>S</sub>. Above that they get K<sub>J</sub>.</p>"
         "<p><b>Step 2: as options.</b> A call at K<sub>S</sub> pays V − K<sub>S</sub> above K<sub>S</sub>. "
         "Subtracting a call at K<sub>S</sub> + K<sub>J</sub> cuts the payoff off at K<sub>J</sub>. So "
         "D<sub>J</sub> = C(K<sub>S</sub>) − C(K<sub>S</sub> + K<sub>J</sub>).</p>"
         "<p><b>Step 3: the other claims.</b> D<sub>S</sub> = V − C(K<sub>S</sub>) and E = C(K<sub>S</sub> + "
         "K<sub>J</sub>). The three add up to V. In Kurbatov's Google example: D<sub>J</sub> = (149.15 − 86.05) × "
         "0.32 = 20.19 billion.</p>"
         "<p><b>Remember:</b> the junior strike sits on top of the senior one.</p>",
)

statisk(
    "kre-s09", tema="kreditt", type="tolkning",
    hjelp=hjelp3(
        "This is about how the risk of a firm's equity changes as the firm approaches distress, seen with equity "
        "as a call.",
        "β<sub>E</sub> = Δ × (V/E) × β<sub>U</sub>, with Δ the call's hedge ratio: how many kroner the equity "
        "gains when the assets gain one krone.",
        "<p><b>Step 1: what happens to V/E</b> when the assets fall and the face value of the debt stays the "
        "same?</p>"
        "<p><b>Step 2: what happens to Δ</b> while the call is still close to the money?</p>"
        "<p><b>Step 3: combine.</b> Is the equity more or less risky than the assets? Roughly by how much? "
        "Only the direction is examined.</p>",
    ),
    q="<p>A firm's assets have a beta of 1.0 and are steady, but a series of losses has brought their value close "
      "to the face value of the firm's debt.</p>"
      "<p>What has happened to the beta of its equity?</p>",
    alternativer=[
        R("It has risen far above 1.0: the equity is a levered call"),
        F("It is still 1.0, because the beta of the assets has not changed",
          "The asset beta is unchanged, but the equity is a levered claim on the assets. As V/E rises, the equity "
          "beta rises with it."),
        F("It has fallen towards 0, because the equity is close to worthless",
          "A low price does not mean low risk. A small change in V now moves a small E by a large percentage."),
        F("It has turned negative, because shareholders now gain from risk",
          "Shareholders gain from asset volatility, but the equity still rises when the assets rise. Its beta is "
          "positive and large."),
    ],
    kort="<p><b>Far above 1.0.</b> β<sub>E</sub> = Δ(V/E)β<sub>U</sub>. Near distress E is small relative to V, so "
         "the equity behaves like a highly levered call.</p>",
    full="<p><b>Equity as a levered call.</b> Equity is a call on the assets with the face value as strike. Its "
         "beta is the asset beta scaled by how much the equity moves for a given move in the assets, in percent: "
         "β<sub>E</sub> = Δ × (V/E) × β<sub>U</sub>.</p>"
         "<p><b>Step 1: V/E.</b> When the assets fall towards the face value, E shrinks much faster than V, so V/E "
         "rises sharply.</p>"
         "<p><b>Step 2: Δ.</b> The call is near the money, so Δ is still substantial: a krone more in assets is "
         "worth a good part of a krone to the shareholders.</p>"
         "<p><b>Step 3: the product.</b> A sizeable Δ times a large V/E: the equity beta explodes, even though the "
         "business is as risky as before. Small changes in V move E by large percentages.</p>"
         "<p><b>Why it matters.</b> Using a historical equity beta from calm times understates the cost of equity "
         "of a distressed firm. Unlevering with the option view is consistent with the twin-firm formulas in "
         "spirit: leverage multiplies risk.</p>"
         "<p><b>Remember:</b> near distress β<sub>E</sub> rises steeply. Know the direction; no option-formula "
         "computation is examined.</p>",
)

statisk(
    "kre-s10", tema="kreditt", type="begrep", hjelp=_H_OPS,
    q="<p>In a perfect market a firm raises the face value of its zero-coupon debt and uses the extra proceeds to "
      "buy back shares at a fair price.</p>"
      "<p>Using put-call parity on the firm's assets, what happens to the value of the firm, its equity and its "
      "debt?</p>",
    alternativer=[
        F("The firm is worth more, because the debt is cheaper than equity",
          "Parity says V = C(K) + PV(K) − P(K) for every K. The firm's value does not depend on K, which is MM I."),
        F("The firm, the equity and the debt are all unchanged, since the buyback is at a fair price",
          "The total is unchanged, but the split between the call and the debt depends on the strike."),
        R("The firm is unchanged; the equity falls and the debt rises by the same amount"),
        F("The firm is unchanged; the debt falls because it is riskier while the equity rises",
          "Each krone of debt is riskier, but there is more of it. Look at the debt's total value, not "
          "its value per krone."),
    ],
    kort="<p><b>V unchanged, E down, D up.</b> V = C(K) + PV(K) − P(K) for any K. A higher K lowers the call "
         "(equity) and raises PV(K) − P(K) (debt).</p>",
    full="<p><b>Put-call parity as MM.</b> For options on the firm's assets, C(K) + PV(K) = V + P(K). Rearranged: "
         "V = C(K) + [PV(K) − P(K)] = E + D. The left side does not depend on K, so the firm's value does not "
         "depend on how much it borrows. That is MM I in option language (lecture 10).</p>"
         "<p><b>Step 1: the equity.</b> It is the call. A higher strike lowers the call: the shareholders' claim "
         "after the buyback is worth less in total. They received the cash from the buyback, so they are no worse "
         "off.</p>"
         "<p><b>Step 2: the debt.</b> PV(K) − P(K) rises with K. The new debt is riskier per krone of face value, "
         "but there is more of it, so its total value rises by what the equity loses.</p>"
         "<p><b>Step 3: the check.</b> E + D = V before and after: check 4 in the form of a split.</p>"
         "<p><b>Remember:</b> in a perfect market the strike K moves value between E and D, never the total.</p>",
)

statisk(
    "kre-s11", tema="kreditt", type="begrep",
    hjelp=hjelp3(
        "This is about splitting a bond's credit spread and deciding which part tells you about the debt's "
        "systematic risk.",
        "y − r<sub>f</sub> = (y − r<sub>D</sub>) + (r<sub>D</sub> − r<sub>f</sub>). The first part is the expected "
        "loss, the second the risk premium. β<sub>D</sub> = (r<sub>D</sub> − r<sub>f</sub>)/(market risk "
        "premium).",
        "<p><b>Step 1: name the two parts.</b> Which is compensation for losses expected on average?</p>"
        "<p><b>Step 2: which is a reward for risk?</b> Only that part relates to beta.</p>"
        "<p><b>Step 3: the beta.</b> Divide that part by the market risk premium.</p>",
    ),
    q="<p>A bond's credit spread over the risk-free rate is 5 percentage points. You want the debt's beta for a "
      "WACC.</p>"
      "<p>Which part of the spread determines β<sub>D</sub>?</p>",
    alternativer=[
        F("The whole spread, divided by the market risk premium",
          "The spread contains the expected loss, which the lenders never expect to receive. That part is "
          "not a reward for risk."),
        F("The expected loss, p × L, because that is the risk the lenders bear",
          "The expected loss is an average outcome, not a premium. It comes off the yield to get r<sub>D</sub> and "
          "never enters β<sub>D</sub>."),
        R("Only r<sub>D</sub> − r<sub>f</sub>, the part left after the expected loss"),
        F("None of it: debt beta is zero by definition because debt is senior",
          "Debt is senior to equity, but defaults cluster in bad times, so lenders demand a premium. That premium "
          "gives β<sub>D</sub> &gt; 0."),
    ],
    kort="<p><b>r<sub>D</sub> − r<sub>f</sub>.</b> The spread = expected loss + risk premium. Only the risk premium "
         "reflects systematic risk: β<sub>D</sub> = (r<sub>D</sub> − r<sub>f</sub>)/MRP.</p>",
    full="<p><b>Two parts of the spread.</b> A bond's yield exceeds the risk-free rate for two reasons. First, the "
         "lenders expect to lose money in default: on average they get less than promised, so the yield must "
         "exceed their expected return by p × L. Second, defaults cluster in recessions, so the lenders require "
         "an expected return above r<sub>f</sub>.</p>"
         "<p><b>Step 1: the expected loss.</b> y − r<sub>D</sub> ≈ p × L. It is not a reward; it is money the "
         "lenders never expect to receive.</p>"
         "<p><b>Step 2: the risk premium.</b> r<sub>D</sub> − r<sub>f</sub>. This is what the CAPM explains.</p>"
         "<p><b>Step 3: the beta.</b> β<sub>D</sub> = (r<sub>D</sub> − r<sub>f</sub>)/MRP. With a spread of 5 "
         "points of which, say, 3 are expected loss, the premium is 2 points and with a market premium of 5% "
         "β<sub>D</sub> = 0.40.</p>"
         "<p><b>Remember:</b> the expected loss never enters β<sub>D</sub>. Using the whole spread overstates the "
         "debt beta.</p>",
)

statisk(
    "kre-s12", tema="kreditt", type="begrep",
    hjelp=hjelp3(
        "This is Kurbatov's method for pricing new debt from quoted options on an unlevered firm's shares: which "
        "option and which price to use.",
        "After the issue, E = N × C(K/N), with N the number of shares and K the total face value. The call "
        "price is the midpoint of bid and ask. D = V − E, y = (K/D)<sup>1/T</sup> − 1.",
        "<p><b>Step 1: the strike.</b> How much of the debt stands in front of each share before the "
        "shareholders get anything?</p>"
        "<p><b>Step 2: the price.</b> Use neither the buyer's nor the seller's quote alone.</p>"
        "<p><b>Step 3: scale up.</b> One call per share gives the equity. The debt is what is left of the firm.</p>",
    ),
    q="<p>An unlevered firm with N shares and total value V plans to issue zero-coupon debt with face value K due in "
      "18 months and pay the proceeds out to its shareholders. Calls on its shares with 18 months to expiry are "
      "quoted with bid and ask prices at many strikes.</p>"
      "<p>How do you value the equity after the issue?</p>",
    alternativer=[
        F("N times the ask price of the call with strike V/N",
          "V/N is today's value per share, not what must be repaid per share. And the ask is only the "
          "seller's quote."),
        F("N times the midpoint of the call with strike equal to the debt's market value per share",
          "The debt's market value is what you are trying to find. The strike is set by what must be "
          "repaid."),
        F("V minus N times the midpoint of the call with strike K/N",
          "That is the debt, D = V − E. The equity is the call itself."),
        R("N times the midpoint of bid and ask of the call with strike K/N"),
    ],
    kort="<p><b>E = N × mid C(K/N).</b> Each share becomes a call on the assets per share struck at the face value "
         "per share. Then D = V − E.</p>",
    full="<p><b>Why a call on today's shares prices tomorrow's equity.</b> Today the firm has no debt, so a share is "
         "a claim on V/N of the assets and a call on the share is a call on the assets per share. After the issue "
         "each share pays out only once K/N per share has been repaid. Its value is a call on the assets per share "
         "with strike K/N.</p>"
         "<p><b>Step 1: the strike.</b> K/N, the face value per share.</p>"
         "<p><b>Step 2: the price.</b> The midpoint of bid and ask, as in Kurbatov's Google example: the 400 call at "
         "(85.10 + 87.00)/2 = 86.05.</p>"
         "<p><b>Step 3: the claims.</b> E = N × 86.05 = 27.536 billion, D = 135 − 27.536 = 107.464 and y = "
         "(128/107.464)<sup>12/18</sup> − 1 = 12.37% a year.</p>"
         "<p><b>Remember:</b> strike = face value per share, price = midpoint, E = N × call, D = V − E. Then "
         "annualise the yield with discrete compounding.</p>",
)
