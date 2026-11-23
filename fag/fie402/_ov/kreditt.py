# -*- coding: utf-8 -*-
"""Øv uten stopp FIE402: gjeld og egenkapital som opsjoner, kredittrisiko (skribent 4).

   ov-kre1  egenkapital som call og gjeld som risikofri gjeld pluss en utstedt put i et tre:
            ρ, E, D og putten, lovet rente og spread, og hvorfor gjelden er en put
   ov-kre2  senior og junior gjeld fra noterte calls (Google-oppgaven, PS3 E6)
   ov-kre3  spreaden delt i forventet tap og risikopremie, og gjeldsbetaen
   ov-kre4  CDS priset som i forelesning 10 (V2024 P3): ρ som misligholdssannsynlighet
   ov-kre5  mer risiko flytter verdi fra kreditorene: et negativt NPV-bytte sett med opsjoner

   Kurbatovs konvensjoner (docs/fie402-trening-spek.md § 3b): diskret diskontering,
   y = (K/D)^(1/T) − 1 også for brøkdeler av år, ρ med r_f, reelle sannsynligheter med
   kapitalkostnaden, midtkurs av bid og ask (B4). I CDS-oppgaven er ρ den risikonøytrale
   misligholdssannsynligheten, slik Kurbatov skriver den i forelesning 10; det står i casen.
   Gjelden er «risk-free debt plus a written put» (Kurbatov, opptak 18, 1:03:55), D = PV(K) − P.
   Callprisene i kre2 er laget med Black-Scholes med diskret PV(K) bare for realismens skyld.
"""
import math

from ov_lib import *  # noqa: F401,F403

FIRMA_NO = ["Havbris Kraft ASA", "Nordlia Bygg ASA", "Stålvik Industri ASA", "Fjellnett ASA", "Vågsøy Rederi ASA",
            "Bremnes Eiendom ASA", "Granitt Verft ASA", "Ormberg Gruppen ASA"]
FIRMA_US = ["Ridgeway Logistics Inc.", "Bannerfield Energy Inc.", "Thornbury Chemicals Inc.", "Ashcombe Media Inc.",
            "Kestrel Mining Inc."]


# ---------------------------------------------------------------- hjelpere
def _sjekk(vist, eksakt, rel=0.002):
    """Avvis varianten når kjeden regnet fra viste (avrundede) tall havner utenfor toleransen."""
    if abs(vist - eksakt) > rel * max(abs(eksakt), 1e-9):
        raise Avvis(f"avrundet kjede {vist} for langt fra eksakt {eksakt}")


def _f(x, d=4):
    return tall(x, d)


def _lik(a, b, d=4):
    """Avvis varianten når to tall som løsningen viser som like, ikke er like med d desimaler."""
    if tall(a, d) != tall(b, d):
        raise Avvis(f"viste tall summerer ikke: {tall(a, d)} mot {tall(b, d)}")


def _v46(x):
    """Verdien slik den vises: fire desimaler når det er eksakt, ellers seks (så kjeden summerer)."""
    return rund(x, 4) if abs(rund(x, 4) - x) < 1e-12 else rund(x, 6)


def _f46(x):
    return tall(x, 4) if abs(rund(x, 4) - x) < 1e-12 else tall(x, 6)


def _g(r):
    """1 + r skrevet kort: 1.04, 1.035."""
    return tall(1 + r, 2 if abs(r * 100 - round(r * 100)) < 1e-9 else 3)


def _i(x):
    """Helt tall med tusenskille: 1 250."""
    return tall(x, 0)


def _valuta(navn):
    return ("NOK", "NOK million") if navn.endswith("ASA") else ("$", "$ million")


def _bel(x, kode, d=1):
    """Beløp i millioner: «NOK 1 234.5 million» eller «$1 234.5 million»."""
    return f"{penger(x, d, kode)} million"


def _ncdf(x):
    return 0.5 * (1 + math.erf(x / math.sqrt(2)))


def _bs_call(S, K, r, t, sigma):
    pv = K / (1 + r) ** t
    d1 = math.log(S / pv) / (sigma * math.sqrt(t)) + sigma * math.sqrt(t) / 2
    return S * _ncdf(d1) - pv * _ncdf(d1 - sigma * math.sqrt(t))


def _rydd(feller, svar, rel=0.002, abs_=None):
    """Fjerner feller som mangler, ligger innenfor rettetoleransen eller dupliserer en tidligere felle."""
    ut = []
    for f in feller:
        if f is None:
            continue
        v = svar[f.i]
        a = (abs_ or [None] * len(svar))[f.i] or 0
        if abs(f.verdi - v) <= max(rel * abs(v), a) * (1 + 1e-6) + 1e-12:
            continue
        if any(g.i == f.i and abs(g.verdi - f.verdi) <= 0.001 * max(abs(f.verdi), 1e-9) for g in ut):
            continue
        ut.append(f)
    return ut


_SETTE_SVAR = {}


def _unik(oid, deler):
    """Avvis varianten når en deloppgave gir samme svar som i en tidligere variant av samme oppgave."""
    sett = _SETTE_SVAR.setdefault(oid, set())
    nøkler = [(d["l"], tuple(round(t.verdi, 6) for t in d["svar"])) for d in deler if d.get("svar")]
    if any(k in sett for k in nøkler):
        raise Avvis("en deloppgave gir samme svar som en tidligere variant")
    sett.update(nøkler)


# ---------------------------------------------------------------------------
# ov-kre1 · Egenkapital som call, gjeld som risikofri gjeld pluss en utstedt put
# ---------------------------------------------------------------------------
P_KRE1 = [0.50, 0.55, 0.60, 0.65, 0.70, 0.75, 0.80]


def _pene_traer():
    """Trær (r_f, u, d) med pen ρ (fire desimaler), ρ mellom 0.3 og 0.8 og ikke nær 0.5 (byttede grener skal ikke gi
       rett svar), der minst én reell sannsynlighet gir eiendelene en rimelig forventet avkastning. Sortert liste,
       så trekningen er deterministisk."""
    ut = []
    for rf in [0.02, 0.025, 0.03, 0.035, 0.04, 0.045, 0.05, 0.06]:
        for u in [1.10, 1.15, 1.20, 1.25, 1.30, 1.35, 1.40, 1.45, 1.50, 1.60]:
            for d in [0.55, 0.60, 0.65, 0.70, 0.75, 0.80, 0.85, 0.90]:
                g = 1 + rf
                if not d < g < u:
                    continue
                rho = (g - d) / (u - d)
                if not 0.3 <= rho <= 0.8 or abs(rund(rho, 4) - rho) > 1e-12 or abs(rho - 0.5) < 0.02:
                    continue
                if any(p >= rho + 0.05 and rf + 0.01 <= p * u + (1 - p) * d - 1 <= 0.15 for p in P_KRE1):
                    ut.append((rf, u, d))
    return ut


TRAER_KRE1 = _pene_traer()
@oppgave("ov-kre1", tema="kreditt", tittel="Equity as a call and debt as a written put in a tree", antall=12,
         sjanger="d3-gjeld", kilde="V2022 P4, Lecture 10 slides 3–7 and 11")
def _(r):
    navn = r.choice(FIRMA_NO + FIRMA_US)
    kode, enhet = _valuta(navn)
    V0 = r.choice([400, 500, 600, 800, 1000, 1200, 1500, 2000])
    rf, u, dn = r.choice(TRAER_KRE1)
    Vu, Vd = V0 * u, V0 * dn
    if abs(Vu - round(Vu)) > 1e-9 or abs(Vd - round(Vd)) > 1e-9:
        raise Avvis("verdiene i treet er ikke hele tall")
    Vu, Vd = int(round(Vu)), int(round(Vd))
    K = int(round(V0 * r.choice([0.75, 0.80, 0.85, 0.90]) / 10) * 10)
    if not Vd + 0.04 * V0 < K < Vu:
        raise Avvis("pålydende må gi mislighold bare i den dårlige tilstanden")
    g = 1 + rf
    if not Vd < g * V0 < Vu:
        raise Avvis("treet tillater arbitrasje")
    rho = (g * V0 - Vd) / (Vu - Vd)
    if not 0.3 <= rho <= 0.8 or abs(rund(rho, 4) - rho) > 1e-12 or abs(rho - 0.5) < 0.02:
        raise Avvis("ρ er urimelig, ikke pen eller så nær 0.5 at byttede grener gir rett svar")
    p = r.choice(P_KRE1)
    if p < rho + 0.05:
        raise Avvis("den reelle sannsynligheten må ligge over ρ")
    ErV = (p * Vu + (1 - p) * Vd) / V0 - 1
    if not rf + 0.01 <= ErV <= 0.15:
        raise Avvis("analytikernes sannsynlighet gir eiendelene en urimelig forventet avkastning")
    E0 = rho * (Vu - K) / g
    D0 = (rho * K + (1 - rho) * Vd) / g
    P0 = (1 - rho) * (K - Vd) / g
    PV = K / g
    if abs(D0 - (PV - P0)) > 1e-9 or abs(E0 + D0 - V0) > 1e-9:
        raise Avvis("intern feil")
    y = K / D0 - 1
    spread = y - rf

    # viste tall og kjeden fra dem
    rho_v = rund(rho, 4)
    E4 = rund(E0, 4)
    D4 = rund(V0 - E4, 4)
    P4 = rund(P0, 4)
    PV4 = rund(PV, 4)
    _lik(D4, (rho * K + (1 - rho) * Vd) / g)
    _lik(PV4 - P4, D4)
    y4 = K / D4 - 1
    _sjekk(y4, y)

    # feller
    fa_vekst = (V0 - Vd) / (Vu - Vd)
    fb_E_p = p * (Vu - K) / g
    fb_E_ub = V0 - PV
    fb_D_safe = PV
    fb_D_p = (p * K + (1 - p) * Vd) / g
    fb_D_null = rho * K / g
    fb_P_gren = rho * (K - Vd) / g
    fb_P_udisk = (1 - rho) * (K - Vd)
    fc_y_p = (K / fb_D_p - 1) * 100

    case = (f"<p>{navn}'s assets are worth {_bel(V0, kode, 0)} today. In one year they will be worth "
            f"{_bel(Vu, kode, 0)} if the economy booms and {_bel(Vd, kode, 0)} if it goes into recession. The "
            f"firm's only debt is a zero-coupon bond with face value {_bel(K, kode, 0)} due in one year. Analysts put "
            f"the probability of a boom at {tall(p, 2)}.</p>"
            f"<p>Markets are perfect, there are no taxes and the assets can be traded (or replicated). The risk-free "
            f"rate is {prosent_tekst(rf * 100, 1)}. Give ρ and values with four decimals and rates in percent with two "
            f"decimals.</p>")

    # (a) -----------------------------------------------------------------
    a = tall_del(
        "a", poeng=3,
        q="<p>Find the risk-neutral probability ρ of the boom state.</p>",
        svar=[T("ρ", rho)],
        kort=(f"<p><b>ρ = {_f(rho)}.</b> ρ = ({_g(rf)} × {_i(V0)} − {_i(Vd)})/({_i(Vu)} − {_i(Vd)}) = {_f(g * V0 - Vd)}/{_i(Vu - Vd)}.</p>"),
        losning=(f"<p>The firm's assets play the role of the share in the binomial model. ρ is the weight on the boom "
                 f"that makes the assets earn exactly r<sub>f</sub>: their risk-neutral expected value, discounted at "
                 f"r<sub>f</sub>, must equal today's {_i(V0)}. The same ρ will price the equity, the debt and the put.</p>"
                 f"<p><b>Step 1: grow today's value at r<sub>f</sub>.</b> {_g(rf)} × {_i(V0)} = {_f(g * V0)}.</p>"
                 f"<p><b>Step 2: place it between the two outcomes.</b> ρ = ({_f(g * V0)} − {_i(Vd)})/({_i(Vu)} − {_i(Vd)}) = "
                 f"{_f(g * V0 - Vd)}/{_i(Vu - Vd)} = <b>{_f46(rho)}</b>.</p>"
                 f"<p><b>First check.</b> {_f46(rho)} × {_i(Vu)} + {_f46(1 - rho_v)} × {_i(Vd)} = "
                 f"{_f(rho_v * Vu + (1 - rho_v) * Vd)}; dividing by {_g(rf)} gives back {_i(V0)} ✓. The analysts' "
                 f"{tall(p, 2)} is not used: it is already in the market value of the assets.</p>"
                 f"<p><b>Remember:</b> ρ comes from prices. A real probability never prices a claim at "
                 f"r<sub>f</sub>.</p>"),
        feller=_rydd([
            Felle(fa_vekst, "You did not grow today's value at r<sub>f</sub>: (V<sub>0</sub> − V<sub>d</sub>)/"
                            "(V<sub>u</sub> − V<sub>d</sub>)."),
            Felle(1 - rho, "This is 1 − ρ, the weight on the recession."),
            Felle(p, "This is the analysts' real probability. ρ comes from market prices."),
        ], [rho]),
    )

    # (b) -----------------------------------------------------------------
    b = tall_del(
        "b", poeng=5,
        q=(f"<p>Value the equity E, the debt D and the shareholders' option to default, a put on the firm's assets "
           f"with strike {_i(K)}.</p>"),
        gitt=f"<p>From (a): ρ = {_f46(rho)}.</p>",
        svar=[T("E", E0, enhet), T("D", D0, enhet), T("put", P0, enhet)],
        kort=(f"<p><b>E = {_f(E4)}, D = {_f(D4)}, put = {_f(P4)}.</b> Equity pays {_i(Vu - K)} or 0: E = ρ × {_i(Vu - K)}/"
              f"{_g(rf)}; D = {_i(V0)} − E; the put pays 0 or {_i(K - Vd)}: (1 − ρ) × {_i(K - Vd)}/{_g(rf)}.</p>"),
        losning=(f"<p>Limited liability turns the balance sheet into options. At maturity the shareholders pay "
                 f"{_i(K)} and keep the rest if they can, otherwise they hand over the assets: equity pays "
                 f"max(V − {_i(K)}, 0), a call on the assets. The creditors get min(V, {_i(K)}).</p>"
                 f"<p><b>Step 1: state by state.</b> Boom: equity {_i(Vu)} − {_i(K)} = {_i(Vu - K)}, debt {_i(K)}. Recession: equity 0, "
                 f"debt {_i(Vd)} (default). The put max({_i(K)} − V, 0) pays 0 and {_i(K - Vd)}.</p>"
                 f"<p><b>Step 2: equity.</b> E = {_f46(rho)} × {_i(Vu - K)}/{_g(rf)} = <b>{_f(E4)}</b>.</p>"
                 f"<p><b>Step 3: debt.</b> D = V<sub>0</sub> − E = {_i(V0)} − {_f(E4)} = <b>{_f(D4)}</b>.</p>"
                 f"<p><b>Step 4: the put.</b> {_f46(1 - rho_v)} × {_i(K - Vd)}/{_g(rf)} = <b>{_f(P4)}</b>.</p>"
                 f"<p><b>First check (it can fail).</b> Debt valued directly: ({_f46(rho)} × {_i(K)} + {_f46(1 - rho_v)} × "
                 f"{_i(Vd)})/{_g(rf)} = {_f((rho_v * K + (1 - rho_v) * Vd) / g)} ✓. And as risk-free debt minus the put: "
                 f"PV(K) − put = {_f(PV4)} − {_f(P4)} = {_f(PV4 - P4)} ✓.</p>"
                 f"<p><b>Remember:</b> E = call on the assets with strike K; D = V − E = PV(K) − put.</p>"),
        feller=_rydd([
            Felle(fb_E_p, f"You priced the equity with the analysts' {tall(p, 2)} at r<sub>f</sub>. Use ρ.", i=0),
            Felle(fb_E_ub, f"You valued equity as V<sub>0</sub> − PV(K) = {_i(V0)} − {_f(PV)}, as if the shareholders "
                           f"had to cover the shortfall in the recession. Limited liability floors their payoff at 0.",
                  i=0),
            Felle(fb_D_safe, f"You valued the debt as risk-free, PV(K) = {_i(K)}/{_g(rf)}. In the recession the creditors "
                             f"get only {_i(Vd)}.", i=1),
            Felle(fb_D_p, f"You priced the debt with the analysts' {tall(p, 2)} at r<sub>f</sub>.", i=1),
            Felle(fb_D_null, f"You gave the creditors nothing in default. They take over the assets worth {_i(Vd)}.",
                  i=1),
            Felle(fb_P_gren, "You weighted the put's payoff with ρ. It pays in the recession, which has weight "
                             "1 − ρ.", i=2),
            Felle(fb_P_udisk, "This is the put's risk-neutral expected payoff in a year. Discount it at "
                              "r<sub>f</sub>.", i=2),
        ], [E0, D0, P0]),
    )

    # (c) -----------------------------------------------------------------
    c = tall_del(
        "c", poeng=3,
        q="<p>What promised yield does the debt offer? What is its credit spread over the risk-free rate?</p>",
        gitt=f"<p>From (b): D = {_f(D4)}.</p>",
        svar=[T("y", y * 100, "%"), T("spread", spread * 100, "%")],
        kort=(f"<p><b>y = {pst(y4, 2)}, spread = {pst(y4 - rf, 2)}.</b> y = {_i(K)}/{_f(D4)} − 1; spread = y − "
              f"{prosent_tekst(rf * 100, 1)}.</p>"),
        losning=(f"<p>The promised yield is the return the creditors get if the firm pays the full face value. Since "
                 f"the debt sells for less than PV(K), the yield exceeds r<sub>f</sub>; the gap is the credit "
                 f"spread.</p>"
                 f"<p><b>Step 1: yield.</b> y = K/D − 1 = {_i(K)}/{_f(D4)} − 1 = <b>{pst(y4, 2)}</b>.</p>"
                 f"<p><b>Step 2: spread.</b> {pst(y4, 2)} − {prosent_tekst(rf * 100, 1)} = <b>{pst(y4 - rf, 2)}</b>.</p>"
                 f"<p><b>First check.</b> Risk-free debt with the same face value would cost PV(K) = {_f(PV4)} and "
                 f"yield exactly {prosent_tekst(rf * 100, 1)}. The risky debt is cheaper by the put, {_f(P4)}. That "
                 f"discount is what pushes the yield up.</p>"
                 f"<p><b>Remember:</b> the yield is a promise, earned only if the firm does not default. It is not the "
                 f"expected return on the debt, which uses the real probabilities of both states.</p>"),
        feller=_rydd([
            Felle(fc_y_p, "This yield is built on a debt value priced with the analysts' probability at "
                          "r<sub>f</sub>.", i=0),
            Felle(rf * 100, "You valued the debt as risk-free, so the yield came out as r<sub>f</sub>. The debt pays "
                            "less than K in the recession.", i=0),
            Felle(y * 100, "This is the yield itself. The spread is the yield minus r<sub>f</sub>.", i=1),
        ], [y * 100, spread * 100]),
    )

    # (d) -----------------------------------------------------------------
    d = tekst_del(
        "d", poeng=4,
        q=(f"<p>Explain why {navn}'s debt can be described as risk-free debt plus a written put on the firm's assets. "
           f"Who holds the put? What is it worth? Use your numbers.</p>"),
        setninger="Answer in at most four sentences.",
        gitt=f"<p>From (b) and (c): D = {_f(D4)}, put = {_f(P4)}, PV(K) = {_f(PV4)}, y = {pst(y4, 2)}.</p>",
        kort=(f"<p>At maturity the creditors get min(V, {_i(K)}) = {_i(K)} − max({_i(K)} − V, 0): a sure {_i(K)} minus the payoff of a "
              f"put on the assets with strike {_i(K)}. The shareholders hold that put, because limited liability lets them "
              f"hand over the assets instead of paying {_i(K)} when V &lt; {_i(K)}; the creditors have written it. Here "
              f"D = PV(K) − put = {_f(PV4)} − {_f(P4)} = {_f(D4)}, so the put is exactly the discount of risky against "
              f"safe debt; it is what the spread of {pst(y4 - rf, 2)} pays for.</p>"),
        losning=(f"<p><b>The payoff.</b> The creditors receive min(V<sub>T</sub>, {_i(K)}). Write it as {_i(K)} − "
                 f"max({_i(K)} − V<sub>T</sub>, 0): a risk-free claim to {_i(K)} minus the payoff of a put on the firm's "
                 f"assets with strike {_i(K)}. In the boom the put pays 0 and the creditors get {_i(K)}; in the recession it "
                 f"pays {_i(K - Vd)} and they get {_i(K)} − {_i(K - Vd)} = {_i(Vd)}.</p>"
                 f"<p><b>Who holds it.</b> The shareholders. Limited liability lets them walk away and hand over the "
                 f"assets instead of paying {_i(K)}: the right to sell the assets to the creditors for {_i(K)}. The creditors "
                 f"wrote that put when they lent; the price they paid for the bond reflects it.</p>"
                 f"<p><b>What it is worth.</b> {_f(P4)}: risk-free debt would cost {_f(PV4)}, the risky debt {_f(D4)}. "
                 f"By put-call parity on the assets, D = V − call = PV(K) − put. Equity is "
                 f"E = V − PV(K) + put: the shareholders own the levered assets plus the option to default.</p>"
                 f"<p><b>Typical mistake:</b> «risk-free debt minus a written put» flips the sign. Say «plus a written "
                 f"put» (Kurbatov's words) or «minus a put», D = PV(K) − put.</p>"
                 f"<p><b>Remember:</b> the put is the value of limited liability. It is what the spread pays for.</p>"),
        kriterier=[
            "Writes the creditors' payoff as min(V, K) = K − max(K − V, 0): a sure K minus the payoff of a put on the assets with strike K (1 p)",
            "States that the shareholders hold the put (limited liability: they can hand over the assets instead of paying K) and the creditors have written it (1 p)",
            f"Uses the numbers: D = PV(K) − put = {_f(PV4)} − {_f(P4)} = {_f(D4)}, so the put is the discount of risky against safe debt (1 p)",
            "Links the put to the credit spread or to equity: the spread pays for the put, or E = V − PV(K) + put (1 p)",
        ],
    )
    _unik("ov-kre1", [a, b, c, d])
    return ovelse(case, [a, b, c, d])


# ---------------------------------------------------------------------------
# ov-kre2 · Senior og junior gjeld fra noterte calls (Google, PS3 E6)
# ---------------------------------------------------------------------------
@oppgave("ov-kre2", tema="kreditt", tittel="Senior and junior debt priced from listed calls", antall=12,
         sjanger="d3-gjeld", kilde="PS3 E6 (Google), Lecture 10 slides 13–15")
def _(r):
    navn = r.choice(FIRMA_NO + FIRMA_US)
    kode, enhet = _valuta(navn)
    N = r.choice([200, 250, 400, 500, 800])                  # millioner aksjer
    S = r.choice([60, 75, 80, 90, 100, 120, 150])
    V = N * S
    Ktot = 5 * round(S * r.choice([0.60, 0.70, 0.75, 0.80, 0.90]) / 5)
    KS = 5 * round(Ktot * r.choice([0.50, 0.60, 0.65, 0.70]) / 5)
    KJ = Ktot - KS
    if not (10 <= KS <= Ktot - 10) or KJ == KS or KJ < 10:
        raise Avvis("innløsningskursene er urimelige")
    m = r.choice([12, 15, 18, 24, 30])
    Tm = m / 12
    rf = r.choice([0.01, 0.02, 0.03, 0.04])
    sig = r.choice([0.30, 0.35, 0.40, 0.45])
    ekstra = Ktot + r.choice([10, 15, 20])
    strikes = sorted({KJ, KS, Ktot, ekstra})
    if len(strikes) != 4:
        raise Avvis("like innløsningskurser")
    mid = {k: rund(_bs_call(S, k, rf, Tm, sig), 2) for k in strikes}
    halv = {k: r.choice([0.05, 0.10, 0.15, 0.20]) for k in strikes}
    if any(mid[k] - halv[k] < 0.3 for k in strikes):
        raise Avvis("for billig call")
    F, FS, FJ = N * Ktot, N * KS, N * KJ
    fak = (1 + rf) ** Tm
    E = N * mid[Ktot]
    D = V - E
    y = (F / D) ** (1 / Tm) - 1
    CS = N * mid[KS]
    DS = V - CS
    DJ = CS - E
    yJ = (FJ / DJ) ** (1 / Tm) - 1
    yS = (FS / DS) ** (1 / Tm) - 1
    if not (DS < FS / fak * 0.9995 and DJ < FJ / fak * 0.995 and D < F / fak * 0.995):
        raise Avvis("en gjeldsklasse er nesten risikofri eller bryter grensen")
    if not (yS < y < yJ) or yJ > 0.60 or y - rf < 0.01:
        raise Avvis("rentene er urimelige")
    eks = "" if m == 12 else f"<sup>12/{m}</sup>"
    eks_feil = f"<sup>{m}/12</sup>"

    # feller
    fa_bid = N * (mid[Ktot] - halv[Ktot])
    fa_ask = N * (mid[Ktot] + halv[Ktot])
    fa_KS = N * mid[KS]
    fa_KJ = N * mid[KJ]
    fa_ps = mid[Ktot]
    fb_safe = F / fak
    fb_FmE = F - E
    fb_ikkeann = (F / D - 1) * 100
    fb_feileks = ((F / D) ** Tm - 1) * 100
    fb_lin = (F / D - 1) / Tm * 100
    fc_DS_safe = FS / fak
    fc_DS_tot = V - E
    fc_DJ_KJ = V - N * mid[KJ]                       # junioren verdsatt som om den var eneste gjeld
    fc_DJ_safe = D - FS / fak
    fc_yJ_ikke = (FJ / DJ - 1) * 100
    fc_yJ_KJ = ((FJ / fc_DJ_KJ) ** (1 / Tm) - 1) * 100

    rad = "".join(f"<tr><td>{k}</td><td>{_f(mid[k] - halv[k], 2)}</td><td>{_f(mid[k] + halv[k], 2)}</td></tr>"
                  for k in strikes)
    case = (f"<p>{navn} has {N} million shares trading at {penger(S, 2, kode)} and no debt. Markets are perfect and there are "
            f"no taxes, so issuing debt and paying the proceeds out to the shareholders does not change the value of "
            f"the firm's assets. The risk-free rate is {prosent_tekst(rf * 100, 1)} a year, compounded annually.</p>"
            f"<p>{navn} considers issuing zero-coupon debt with total face value {_bel(F, kode, 0)} due in {m} months: "
            f"either as one bond or as a senior bond with face value {_bel(FS, kode, 0)} plus a junior bond with face "
            f"value {_bel(FJ, kode, 0)}, both due at the same date. The table shows quotes for European calls on its "
            f"shares that expire in {m} months. Since the firm has no debt today, treat them as calls on its assets "
            f"per share.</p>"
            f"<table><tr><th>Strike</th><th>Call bid</th><th>Call ask</th></tr>{rad}</table>"
            f"<p>Use the midpoint of bid and ask. Give values in {enhet} with one decimal and yields as annual rates "
            f"in percent with two decimals.</p>")

    # (a) -----------------------------------------------------------------
    a = tall_del(
        "a", poeng=3,
        q="<p>If the whole face value is issued as one bond, what is the equity worth after the issue?</p>",
        svar=[T("E", E, enhet)],
        kort=(f"<p><b>E = {_f(E, 1)}.</b> Face value per share {_i(F)}/{N} = {Ktot}, so equity is the call with "
              f"strike {Ktot}: mid ({_f(mid[Ktot] - halv[Ktot], 2)} + {_f(mid[Ktot] + halv[Ktot], 2)})/2 = "
              f"{_f(mid[Ktot], 2)}; E = {N} million × {_f(mid[Ktot], 2)}.</p>"),
        losning=(f"<p>After the issue the shareholders must pay {_bel(F, kode, 0)} at maturity before they keep "
                 f"anything. Per share that is {_i(F)}/{N} = {Ktot}: each share pays max(V<sub>T</sub>/N − {Ktot}, 0), "
                 f"a call on the assets per share with strike {Ktot}. The firm has no debt today, so the listed calls "
                 f"on the shares are exactly such calls.</p>"
                 f"<p><b>Step 1: the strike.</b> {_i(F)}/{N} = <b>{Ktot}</b> per share. Do not confuse the face value "
                 f"in total with the strike per share.</p>"
                 f"<p><b>Step 2: the price.</b> Midpoint ({_f(mid[Ktot] - halv[Ktot], 2)} + "
                 f"{_f(mid[Ktot] + halv[Ktot], 2)})/2 = {_f(mid[Ktot], 2)}, as Kurbatov recommends unless told "
                 f"otherwise.</p>"
                 f"<p><b>Step 3: all shares.</b> E = {N} million × {_f(mid[Ktot], 2)} = <b>{_f(E, 1)}</b>.</p>"
                 f"<p><b>First check.</b> E lies above V − PV(F) = {_f(V - F / fak, 1)} (the value without limited "
                 f"liability) and below the firm's value V = {N} × {_f(S, 2)} = {_f(V, 1)} ✓</p>"
                 f"<p><b>Remember:</b> strike = face value per share, price = midpoint, then multiply by the number of "
                 f"shares.</p>"),
        feller=_rydd([
            Felle(fa_bid, "You used the bid. Take the midpoint of bid and ask unless the question says otherwise."),
            Felle(fa_ask, "You used the ask. Take the midpoint of bid and ask unless the question says otherwise."),
            Felle(fa_KS, f"You used the call with strike {KS}, the senior face value per share. With one bond the "
                         f"shareholders come after the whole {Ktot} per share."),
            Felle(fa_KJ, f"You used the call with strike {KJ}. The strike is the total face value per share, {Ktot}."),
            Felle(fa_ps, f"This is the price per share. Multiply by the {N} million shares."),
        ], [E]),
    )

    # (b) -----------------------------------------------------------------
    b = tall_del(
        "b", poeng=4,
        q="<p>What is the single bond worth today? What annual yield would it pay?</p>",
        gitt=f"<p>From (a): E = {_f(E, 1)}.</p>",
        svar=[T("D", D, enhet), T("y", y * 100, "%")],
        kort=(f"<p><b>D = {_f(D, 1)}, y = {pst(y, 2)}.</b> D = V − E = {_f(V, 1)} − {_f(E, 1)}; "
              f"y = ({_i(F)}/{_f(D, 1)}){eks} − 1.</p>"),
        losning=(f"<p>In a perfect market the issue only splits the firm, so the debt is what the equity call leaves: "
                 f"D = V − E. Equivalently, D = PV(F) − put: risk-free debt plus a written put.</p>"
                 f"<p><b>Step 1: the firm.</b> V = {N} million × {_f(S, 2)} = {_f(V, 1)}.</p>"
                 f"<p><b>Step 2: the debt.</b> D = {_f(V, 1)} − {_f(E, 1)} = <b>{_f(D, 1)}</b>.</p>"
                 f"<p><b>Step 3: the yield over {m} months.</b> y = (F/D)<sup>1/T</sup> − 1 with T = {m}/12: "
                 f"({_i(F)}/{_f(D, 1)}){eks} − 1 = {_f(F / D)}{eks} − 1 = <b>{pst(y, 2)}</b> a year.</p>"
                 f"<p><b>First check.</b> Risk-free debt with the same face value would be worth PV(F) = "
                 f"{_i(F)}/{_g(rf)}<sup>{_f(Tm, 2)}</sup> = {_f(F / fak, 1)}; the risky debt is worth less and its "
                 f"spread is {pst(y, 2)} − {prosent_tekst(rf * 100, 1)} = {pst(y - rf, 2)} ✓.</p>"
                 f"<p><b>Remember:</b> read the maturity twice. Over {m} months the power is 12/{m}, not {m}/12 and "
                 f"not 1.</p>"),
        feller=_rydd([
            Felle(fb_safe, f"You valued the debt as risk-free, PV(F). The shareholders can default, so the debt is "
                           f"worth V − E.", i=0),
            Felle(fb_FmE, "You subtracted the equity from the face value. The debt is the firm's value minus the "
                          "equity.", i=0),
            Felle(fb_ikkeann, f"This is the return over {m} months, not per year.", i=1) if m != 12 else None,
            Felle(fb_feileks, f"You raised F/D to the power {m}/12. Annualising takes the power 12/{m}.", i=1)
            if m != 12 else None,
            Felle(fb_lin, f"You divided the {m}-month return by {_f(Tm, 2)}. With annual compounding use the power "
                          f"12/{m}.", i=1) if m != 12 else None,
        ], [D, y * 100]),
    )

    # (c) -----------------------------------------------------------------
    c = tall_del(
        "c", poeng=5,
        q=(f"<p>Suppose instead the debt is split into the senior and the junior bond. What are the senior and the "
           f"junior debt worth? What annual yield would the junior bond pay?</p>"),
        gitt=f"<p>From (a): E = {_f(E, 1)} (a call with strike {Ktot} per share).</p>",
        svar=[T("D<sub>S</sub>", DS, enhet), T("D<sub>J</sub>", DJ, enhet), T("y<sub>J</sub>", yJ * 100, "%")],
        kort=(f"<p><b>D<sub>S</sub> = {_f(DS, 1)}, D<sub>J</sub> = {_f(DJ, 1)}, y<sub>J</sub> = {pst(yJ, 2)}.</b> "
              f"D<sub>S</sub> = V − N × C({KS}); D<sub>J</sub> = N × [C({KS}) − C({Ktot})]; y<sub>J</sub> = "
              f"({_i(FJ)}/{_f(DJ, 1)}){eks} − 1.</p>"),
        losning=(f"<p>Value the layers from the top. The seniors are paid first, so they see the firm as if their "
                 f"bond were the only debt. The shareholders come last, after both bonds. The juniors get what lies "
                 f"between.</p>"
                 f"<p><b>Step 1: senior.</b> Strike {_i(FS)}/{N} = {KS} per share, mid "
                 f"{_f(mid[KS], 2)}: equity if only the senior bond existed would be {N} × {_f(mid[KS], 2)} = "
                 f"{_f(CS, 1)}, so D<sub>S</sub> = {_f(V, 1)} − {_f(CS, 1)} = <b>{_f(DS, 1)}</b>.</p>"
                 f"<p><b>Step 2: equity is unchanged.</b> The shareholders still come after {Ktot} per share in total: "
                 f"E = {_f(E, 1)} as in (a).</p>"
                 f"<p><b>Step 3: junior.</b> D<sub>J</sub> = V − D<sub>S</sub> − E = {_f(V, 1)} − {_f(DS, 1)} − "
                 f"{_f(E, 1)} = <b>{_f(DJ, 1)}</b>, the same as {N} × ({_f(mid[KS], 2)} − {_f(mid[Ktot], 2)}).</p>"
                 f"<p><b>Step 4: junior yield.</b> ({_i(FJ)}/{_f(DJ, 1)}){eks} − 1 = <b>{pst(yJ, 2)}</b> a year.</p>"
                 f"<p><b>First check.</b> D<sub>S</sub> + D<sub>J</sub> = {_f(DS + DJ, 1)} = D from (b) (an identity: "
                 f"the equity is the same call). The yields must line up: senior {pst(yS, 2)} &lt; single bond "
                 f"{pst(y, 2)} &lt; junior {pst(yJ, 2)} ✓.</p>"
                 f"<p><b>Remember:</b> D<sub>S</sub> = V − C(K<sub>S</sub>), E = C(K<sub>S</sub> + K<sub>J</sub>), "
                 f"D<sub>J</sub> = C(K<sub>S</sub>) − C(K<sub>S</sub> + K<sub>J</sub>). Never price the juniors with "
                 f"a call at their own face value per share.</p>"),
        feller=_rydd([
            Felle(fc_DS_safe, "You valued the senior bond as risk-free. It is safer, but it still loses if the assets "
                              "fall below its face value.", i=0),
            Felle(fc_DS_tot, f"You used the call with strike {Ktot} for the seniors. They see only their own "
                             f"{KS} per share.", i=0),
            Felle(fc_DJ_KJ, f"You valued the juniors as if their bond were the only debt: V − N × C({KJ}). The "
                            f"seniors are paid first, so the juniors' claim is riskier than that.", i=1),
            Felle(fc_DJ_safe, "You took the juniors as the total debt minus a risk-free senior bond. The senior "
                              "bond is risky too.", i=1),
            Felle(fc_yJ_ikke, f"This is the junior return over {m} months, not per year.", i=2) if m != 12 else None,
            Felle(fc_yJ_KJ, f"This yield is built on the juniors valued as the only debt, V − N × C({KJ}), "
                            f"which ignores seniority.", i=2),
        ], [DS, DJ, yJ * 100]),
    )

    # (d) -----------------------------------------------------------------
    d = tekst_del(
        "d", poeng=4,
        q=(f"<p>Explain why splitting the debt does not change its total value. Why is the junior yield so far above "
           f"the yield in (b)? Describe the junior creditors' payoff at maturity with options.</p>"),
        setninger="Answer in at most four sentences.",
        gitt=(f"<p>From (b) and (c): D = {_f(D, 1)} and y = {pst(y, 2)}; D<sub>S</sub> = {_f(DS, 1)} "
              f"(y<sub>S</sub> = {pst(yS, 2)}), D<sub>J</sub> = {_f(DJ, 1)}, y<sub>J</sub> = {pst(yJ, 2)}.</p>"),
        kort=(f"<p>Equity is still a call struck at the total {Ktot} per share, so it and the debt, V − E = {_f(D, 1)}, "
              f"are unchanged; the split only divides the debt. The seniors are paid first and are much safer than the "
              f"juniors ({pst(yS, 2)}); the juniors take the losses right after the shareholders, so they hold the riskiest "
              f"slice and demand {pst(yJ, 2)}. Per share the juniors get 0 below {KS}, V/N − {KS} up to {Ktot} and a "
              f"flat {KJ} above: long a call at {KS}, short a call at {Ktot}.</p>"),
        losning=(f"<p><b>Total value.</b> In a perfect market the split does not change the assets. The "
                 f"shareholders still own a call struck at the total face value. Since D = V − E, the total debt is "
                 f"{_f(D, 1)} with or without the split. The split only decides who bears the default losses.</p>"
                 f"<p><b>Who bears the risk.</b> The seniors are paid in full unless the assets fall below {KS} per "
                 f"share, so they are much safer than the juniors and their yield, {pst(yS, 2)}, is the lowest of the "
                 f"three. The juniors lose as soon as the "
                 f"assets fall below {Ktot} per share; they lose first after the shareholders. Their claim is small "
                 f"relative to the risk it carries, so {pst(yJ, 2)} is far above the {pst(y, 2)} on the single bond, "
                 f"which averages the two layers.</p>"
                 f"<p><b>The payoff.</b> Per share: 0 below {KS}, V/N − {KS} between {KS} and {Ktot}, {KJ} above "
                 f"{Ktot}. That is max(V/N − {KS}, 0) − max(V/N − {Ktot}, 0): long a call at {KS}, short a call at "
                 f"{Ktot}, a call spread. More volatility raises both calls, so its effect on the juniors depends on "
                 f"where the assets are.</p>"
                 f"<p><b>Remember:</b> layers of debt are differences of calls. The junior yield is the price of "
                 f"standing first in line for the losses.</p>"),
        kriterier=[
            "Explains that equity is the same call struck at the total face value with or without the split, so D = V − E is unchanged; the split only divides it (1 p)",
            "Explains that seniority moves the default risk: the seniors are paid first and are much safer than the juniors, who absorb losses right after the shareholders (1 p)",
            f"Describes the junior payoff per share: 0 below {KS}, one for one up to {Ktot}, capped at {KJ}: long a call at {KS}, short a call at {Ktot} (1 p)",
            "Ranks the yields with the numbers: senior below the single bond below junior (1 p)",
        ],
    )
    _unik("ov-kre2", [a, b, c, d])
    return ovelse(case, [a, b, c, d])


# ---------------------------------------------------------------------------
# ov-kre3 · Spreaden delt i forventet tap og risikopremie, og gjeldsbetaen
# ---------------------------------------------------------------------------
@oppgave("ov-kre3", tema="kreditt", tittel="Promised yield, expected return and the debt beta", antall=12,
         sjanger="kreditt", kilde="V2024 P3a, Lecture 10 slide 10, Lectures 7–8 (r_D in the WACC)")
def _(r):
    navn = r.choice(FIRMA_NO + FIRMA_US)
    kode, _enh = _valuta(navn)
    F = r.choice([100, 1000])
    Tm = r.choice([1, 1, 2])
    rf = r.choice([0.025, 0.03, 0.035, 0.04])
    y = rf + r.choice([0.025, 0.03, 0.035, 0.04, 0.05, 0.06])
    p = r.choice([0.02, 0.03, 0.04, 0.05, 0.06, 0.08] + ([0.10] if Tm == 2 else []))
    R = r.choice([0.40, 0.50, 0.60, 0.70])
    mrp = r.choice([0.05, 0.06])
    LGD = 1 - R
    P = F / (1 + y) ** Tm
    EX = F * (1 - p * LGD)
    rD = (EX / P) ** (1 / Tm) - 1
    EL = y - rD
    RP = rD - rf
    beta = RP / mrp
    if RP < 0.004 or EL < 0.004 or not 0.08 <= beta <= 0.5:
        raise Avvis("delingen av spreaden blir urimelig")
    aar = "one year" if Tm == 1 else "two years"
    ytxt = _g(y)
    pot = "" if Tm == 1 else "<sup>2</sup>"
    rot = "" if Tm == 1 else "<sup>1/2</sup>"

    # viste tall
    P4 = rund(P, 4)
    rD4 = rund((EX / P4) ** (1 / Tm) - 1, 6)
    _sjekk(rD4, rD)
    EL4 = y - rD4
    RP4 = rD4 - rf
    b4 = RP4 / mrp
    if abs(rund(EL4 * 100, 2) + rund(RP4 * 100, 2) - rund((y - rf) * 100, 2)) > 1e-9:
        raise Avvis("delene av spreaden summerer ikke med to desimaler")
    _sjekk(b4, beta, rel=0.003)

    # feller
    fa_rf = F / (1 + rf) ** Tm
    fa_lin = F / (1 + y * Tm) if Tm == 2 else None
    fa_EF = F
    fa_E0 = F * (1 - p)
    fb_ikkeann = (EX / P - 1) * 100 if Tm == 2 else None
    fb_kort = (y - p * LGD) * 100 if Tm == 1 else None
    fb_EL_kort = p * LGD * 100 if Tm == 1 else None
    fb_EL_alt = (y - rf) * 100
    fc_beta_y = (y - rf) / mrp
    fc_beta_rD = rD / mrp

    case = (f"<p>{navn} has zero-coupon bonds outstanding with face value {penger(F, 0, kode)} each, maturing in "
            f"{aar}. They trade at a promised yield of {pst(y, 1)} a year. Default can only happen at maturity: rating "
            f"analysts put its probability at {pst(p, 0)}; in default the bondholders recover {pst(R, 0)} of face "
            f"value. The risk-free rate is {pst(rf, 1)} a year and the market risk premium is {pst(mrp, 1)}; the CAPM "
            f"holds.</p>"
            f"<p>Give prices with four decimals, returns and spreads in percent with two decimals and betas with four "
            f"decimals.</p>")

    # (a) -----------------------------------------------------------------
    a = tall_del(
        "a", poeng=3,
        q="<p>What does one bond cost today? What payoff do its holders expect at maturity?</p>",
        svar=[T("price", P, kode), T("expected payoff", EX, kode)],
        kort=(f"<p><b>Price {_f(P4)}, expected payoff {_f(EX, 2)}.</b> {_i(F)}/{ytxt}{pot}; "
              f"{tall(1 - p, 2)} × {_i(F)} + {tall(p, 2)} × {_f(F * R, 0)}.</p>"),
        losning=(f"<p>A bond's price is its promised payment discounted at the promised yield. What the holders expect "
                 f"to receive is something else: the promised payment if the firm survives, the recovery if it "
                 f"defaults.</p>"
                 f"<p><b>Step 1: price.</b> P = {_i(F)}/{ytxt}{pot} = <b>{_f(P4)}</b>.</p>"
                 f"<p><b>Step 2: the two branches.</b> No default ({pst(1 - p, 0)}): {_i(F)}. Default "
                 f"({pst(p, 0)}): {pst(R, 0)} × {_i(F)} = {_f(F * R, 0)}.</p>"
                 f"<p><b>Step 3: expected payoff.</b> {tall(1 - p, 2)} × {_i(F)} + {tall(p, 2)} × {_f(F * R, 0)} = "
                 f"<b>{_f(EX, 2)}</b>.</p>"
                 f"<p><b>First check.</b> The expected shortfall is {_i(F)} − {_f(EX, 2)} = {_f(F - EX, 2)} = "
                 f"p × LGD × F = {tall(p, 2)} × {tall(LGD, 2)} × {_i(F)} ✓. It is money the holders never expect to "
                 f"get, whatever their attitude to risk.</p>"
                 f"<p><b>Remember:</b> the price comes from the yield; the expected payoff comes from the real "
                 f"probabilities.</p>"),
        feller=_rydd([
            Felle(fa_rf, "You discounted at the risk-free rate. The bond is priced at its promised yield.", i=0),
            Felle(fa_lin, "You discounted with simple interest, 1 + 2y. Compound over the two years.", i=0)
            if fa_lin is not None else None,
            Felle(fa_EF, "This is the promised payment. In default the holders get only the recovery.", i=1),
            Felle(fa_E0, "You gave the holders nothing in default. They recover part of the face value.", i=1),
        ], [P, EX]),
    )

    # (b) -----------------------------------------------------------------
    b = tall_del(
        "b", poeng=4,
        q=("<p>What is the expected annual return r<sub>D</sub> on the bond? How much of the credit spread "
           "y − r<sub>f</sub> is expected loss, that is y − r<sub>D</sub>?</p>"),
        gitt=f"<p>From (a): price {_f(P4)}, expected payoff {_f(EX, 2)}.</p>",
        svar=[T("r<sub>D</sub>", rD * 100, "%"), T("y − r<sub>D</sub>", EL * 100, "%", abs=0.006)],
        kort=(f"<p><b>r<sub>D</sub> = {pst(rD4, 2)}, expected loss {pst(EL4, 2)}.</b> r<sub>D</sub> = "
              f"({_f(EX, 2)}/{_f(P4)}){rot} − 1; {pst(y, 2)} − {pst(rD4, 2)}.</p>"),
        losning=(f"<p>The promised yield assumes every payment arrives. The expected return counts the default branch "
                 f"too, so it is lower. The gap between them is the expected loss, expressed as a rate.</p>"
                 f"<p><b>Step 1: expected return.</b> r<sub>D</sub> = (E[payoff]/P){rot} − 1 = "
                 f"({_f(EX, 2)}/{_f(P4)}){rot} − 1 = <b>{pst(rD4, 2)}</b>"
                 f"{' a year (two years, so the square root)' if Tm == 2 else ''}.</p>"
                 f"<p><b>Step 2: expected loss.</b> y − r<sub>D</sub> = {pst(y, 2)} − {pst(rD4, 2)} = "
                 f"<b>{pst(EL4, 2)}</b> of the spread of {pst(y - rf, 2)}.</p>"
                 f"<p><b>First check (it can fail).</b> r<sub>f</sub> &lt; r<sub>D</sub> &lt; y: {pst(rf, 2)} &lt; "
                 f"{pst(rD4, 2)} &lt; {pst(y, 2)} ✓. A bond whose expected return fell below r<sub>f</sub> would "
                 f"offer a negative risk premium.</p>"
                 f"<p><b>Remember:</b> y is a promise; r<sub>D</sub> is an expectation. The shortcut y − p × LGD is "
                 f"only an approximation when the payoffs are given; use them.</p>"),
        feller=_rydd([
            Felle(y * 100, "This is the promised yield. The expected return counts the default branch too.", i=0),
            Felle(fb_ikkeann, "This is the return over two years, not per year.", i=0) if fb_ikkeann is not None
            else None,
            Felle(fb_kort, f"You used the shortcut y − p × LGD = {pst(y, 2)} − {tall(p, 2)} × {pst(LGD, 0)}. The loss "
                           f"in default is LGD × F, which is a larger share of the price than of F; use the payoffs.",
                  i=0) if fb_kort is not None else None,
            Felle(fb_EL_kort, "This is p × LGD measured on face value. The expected-loss part of the yield is "
                              "y − r<sub>D</sub>, measured on the price.", i=1) if fb_EL_kort is not None else None,
            Felle(fb_EL_alt, "This is the whole credit spread. Part of it is a risk premium, not expected loss.",
                  i=1),
        ], [rD * 100, EL * 100], abs_=[None, 0.006]),
    )

    # (c) -----------------------------------------------------------------
    c = tall_del(
        "c", poeng=4,
        q="<p>How much of the spread is a risk premium, r<sub>D</sub> − r<sub>f</sub>? What debt beta does it imply?</p>",
        gitt=f"<p>From (b): r<sub>D</sub> = {pst(rD4, 2)}.</p>",
        svar=[T("r<sub>D</sub> − r<sub>f</sub>", RP * 100, "%", abs=0.006), T("β<sub>D</sub>", beta, abs=0.0015)],
        kort=(f"<p><b>Risk premium {pst(RP4, 2)}, β<sub>D</sub> = {_f(b4)}.</b> {pst(rD4, 2)} − {pst(rf, 2)}; "
              f"β<sub>D</sub> = {pst(RP4, 4)}/{pst(mrp, 1)}.</p>"),
        losning=(f"<p>Expected loss is not a reward for risk: it is money the lenders do not expect to get. What remains "
                 f"of the spread, r<sub>D</sub> − r<sub>f</sub>, is the premium investors demand because defaults "
                 f"cluster in bad times. In the CAPM that premium is β<sub>D</sub> × MRP.</p>"
                 f"<p><b>Step 1: risk premium.</b> r<sub>D</sub> − r<sub>f</sub> = {pst(rD4, 2)} − {pst(rf, 2)} = "
                 f"<b>{pst(RP4, 2)}</b>.</p>"
                 f"<p><b>Step 2: debt beta.</b> β<sub>D</sub> = (r<sub>D</sub> − r<sub>f</sub>)/MRP = {pst(RP4, 4)}/"
                 f"{pst(mrp, 1)} = <b>{_f(b4)}</b>.</p>"
                 f"<p><b>First check (an identity).</b> Expected loss plus risk premium = {pst(EL4, 2)} + "
                 f"{pst(RP4, 2)} = {pst(y - rf, 2)}, the whole spread ✓. It cannot fail once r<sub>D</sub> is fixed; it "
                 f"catches only arithmetic slips.</p>"
                 f"<p><b>Remember:</b> β<sub>D</sub> comes from r<sub>D</sub> − r<sub>f</sub>, never from the whole "
                 f"spread. The expected loss never enters β<sub>D</sub>.</p>"),
        feller=_rydd([
            Felle((y - rf) * 100, "This is the whole spread. The expected loss is not a risk premium.", i=0),
            Felle(fc_beta_y, "You built the beta on the whole spread y − r<sub>f</sub>. Expected loss carries no "
                             "beta.", i=1),
            Felle(fc_beta_rD, "You divided r<sub>D</sub> itself by the market risk premium. The CAPM explains only "
                              "the excess over r<sub>f</sub>.", i=1),
        ], [RP * 100, beta], abs_=[0.006, 0.0015]),
    )

    # (d) -----------------------------------------------------------------
    d = tekst_del(
        "d", poeng=4,
        q=(f"<p>A colleague wants to use the bonds' {pst(y, 1)} yield as {navn}'s cost of debt r<sub>D</sub> in its "
           f"WACC. Comment.</p>"),
        setninger="Answer in at most four sentences.",
        gitt=(f"<p>From (b) and (c): r<sub>D</sub> = {pst(rD4, 2)}, expected loss {pst(EL4, 2)}, risk premium "
              f"{pst(RP4, 2)}, β<sub>D</sub> = {_f(b4)}.</p>"),
        kort=(f"<p>The {pst(y, 1)} yield is a promise, earned only if {navn} never defaults; investors expect "
              f"{pst(rD4, 2)}, because {pst(EL4, 2)} of the yield only covers the expected loss. The WACC must use "
              f"the expected return investors require, so the yield overstates the cost of debt and the WACC and "
              f"undervalues the firm. Only the {pst(RP4, 2)} above r<sub>f</sub> is a premium for systematic default "
              f"risk, which is why β<sub>D</sub> = {_f(b4)} and r<sub>D</sub> = r<sub>f</sub> + β<sub>D</sub> × MRP "
              f"is the rate to use.</p>"),
        losning=(f"<p><b>What the WACC needs.</b> The WACC discounts expected free cash flows, so each component must "
                 f"be an expected return. For debt that is r<sub>D</sub>, not the promised yield.</p>"
                 f"<p><b>Why the yield is too high.</b> The yield of {pst(y, 1)} is earned only in the no-default "
                 f"branch. Part of it, {pst(EL4, 2)}, merely offsets the expected loss: money the lenders never expect "
                 f"to receive. Using y counts that part as a cost of capital, so the WACC is too high and the firm's "
                 f"value too low.</p>"
                 f"<p><b>What is left.</b> r<sub>D</sub> − r<sub>f</sub> = {pst(RP4, 2)} is a genuine risk premium: "
                 f"defaults cluster in recessions, when money is worth most, so default risk is systematic. That gives "
                 f"β<sub>D</sub> = {_f(b4)} and r<sub>D</sub> = {pst(rf, 1)} + {_f(b4)} × {pst(mrp, 1)} = "
                 f"{pst(rD4, 2)}, the rate for the WACC. For safe, investment-grade debt the gap is small and y is a "
                 f"fair shortcut; near distress it is not.</p>"
                 f"<p><b>Typical mistakes:</b> putting y in the WACC, or treating the whole spread as risk premium and "
                 f"getting a far too high β<sub>D</sub>.</p>"
                 f"<p><b>Remember:</b> y − r<sub>D</sub> is expected loss; r<sub>D</sub> − r<sub>f</sub> is risk "
                 f"premium. Only the second has a beta.</p>"),
        kriterier=[
            "States that y is a promised return earned only without default, while the expected return r<sub>D</sub> is lower by the expected loss (1 p)",
            "Says the WACC needs expected returns, so using y overstates the cost of debt and the WACC and undervalues the firm (1 p)",
            "Explains that only r<sub>D</sub> − r<sub>f</sub> is a premium for systematic risk (defaults cluster in bad times); the expected loss carries no beta (1 p)",
            f"Recommends r<sub>D</sub> = {pst(rD4, 2)} (expected cash flows or r<sub>f</sub> + β<sub>D</sub> × MRP) as the cost of debt (1 p)",
        ],
    )
    _unik("ov-kre3", [a, b, c, d])
    return ovelse(case, [a, b, c, d])


# ---------------------------------------------------------------------------
# ov-kre4 · CDS priset som i forelesning 10 (V2024 P3): ρ er misligholdssannsynligheten
# ---------------------------------------------------------------------------
_KRE4_PAR = set()                                    # par av r_f og y som alt er brukt i ov-kre4


@oppgave("ov-kre4", tema="kreditt", tittel="Pricing a CDS with the risk-neutral default probability", antall=12,
         sjanger="d3-cds", kilde="Lecture 10 CDS example, V2024 P3")
def _(r):
    navn = r.choice(FIRMA_NO + FIRMA_US)
    kode, _enh = _valuta(navn)
    F = r.choice([100, 100, 1000])
    rf = r.choice([0.02, 0.025, 0.03, 0.035, 0.04, 0.05])
    y = rf + r.choice([0.025, 0.03, 0.035, 0.04, 0.05, 0.06])
    par = (rf, rund(y, 4))
    if par in _KRE4_PAR:
        raise Avvis("samme r_f og y som en tidligere variant gir samme obligasjonspriser")
    R = r.choice([0.50, 0.60, 0.70, 0.75, 0.80])
    p = r.choice([0.03, 0.04, 0.05, 0.06, 0.08, 0.10])
    LGD = 1 - R
    Rb = F * R                                       # det obligasjonen betaler ved mislighold
    lam = F * LGD                                    # antall CDS-kontrakter som dekker tapet
    P1 = F / (1 + rf)
    P2 = F / (1 + y)
    EX = (1 - p) * F + p * Rb
    r2 = EX / P2 - 1
    rho = (F - P2 * (1 + rf)) / lam
    if not p + 0.04 <= rho <= min(0.6, 4 * p):
        raise Avvis("ρ er urimelig")
    cds = rho / (1 + rf)
    vern = lam * cds
    if abs(vern - (P1 - P2)) > 1e-9:
        raise Avvis("intern feil i CDS-prisen")
    if not rf < r2 < y:
        raise Avvis("forventet avkastning må ligge mellom r_f og y")

    # viste tall og kjeden fra dem
    P1_4, P2_4 = rund(P1, 4), rund(P2, 4)
    vekst4 = rund(P2_4 * (1 + rf), 4)
    rho_v = _v46((F - vekst4) / lam)
    _sjekk(rho_v, rho)
    cds_v = _v46(rho_v / (1 + rf))
    _sjekk(cds_v, cds)
    vern4 = rund(lam * cds_v, 4)
    _sjekk(vern4, vern)
    r2_4 = EX / P2_4 - 1
    rpst = prosent_tekst(rf * 100, 1)
    _lik(((1 - rho_v) * F + rho_v * Rb) / (1 + rf), P2_4)
    _lik(P2_4 + vern4, P1_4)

    # feller
    fa_P2rf = P1
    fa_r2_y = y * 100
    fa_r2_null = ((1 - p) * F / P2 - 1) * 100
    fb_ikkevekst = (F - P2) / lam
    fb_null = (F - P2 * (1 + rf)) / F
    fc_p = p / (1 + rf)
    fc_snu = (1 - rho) / (1 + rf)
    fc_udisk = rho
    fc_F = F * cds
    fc_R = Rb * cds
    fc_p_vern = lam * p / (1 + rf)
    fc_snu_vern = lam * (1 - rho) / (1 + rf)

    case = (f"<p>Two one-year zero-coupon bonds have face value {penger(F, 0, kode)}. Bond 1 is a government bond "
            f"yielding {rpst}, the risk-free rate. Bond 2 is issued by {navn}: it promises {penger(F, 0, kode)} but "
            f"pays only {penger(Rb, 0, kode)} if {navn} defaults. Bond 2 has a promised yield of {pst(y, 1)}. Rating "
            f"analysts put the real probability that {navn} defaults at {pst(p, 0)}.</p>"
            f"<p>A credit default swap (CDS) contract on {navn} pays {penger(1, 0, kode)} at the end of the year if "
            f"{navn} defaults and nothing otherwise; its price is paid today. As in lecture 10, ρ denotes the "
            f"risk-neutral probability of <b>default</b>, the bottom branch of the tree. Give prices and ρ with four "
            f"decimals and returns in percent with two decimals.</p>")

    # (a) -----------------------------------------------------------------
    a = tall_del(
        "a", poeng=4,
        q="<p>What do the two bonds cost today? What is the expected return on bond 2?</p>",
        svar=[T("bond 1", P1, kode), T("bond 2", P2, kode), T("E[r<sub>2</sub>]", r2 * 100, "%")],
        kort=(f"<p><b>Bond 1 {_f(P1_4)}, bond 2 {_f(P2_4)}, E[r<sub>2</sub>] = {pst(r2_4, 2)}.</b> {_i(F)}/{_g(rf)}; "
              f"{_i(F)}/{_g(y)}; ({tall(1 - p, 2)} × {_i(F)} + {tall(p, 2)} × {_i(Rb)})/{_f(P2_4)} − 1.</p>"),
        losning=(f"<p>Draw the tree first: Kurbatov says it takes about ten seconds and helps a lot. Top branch, no "
                 f"default: bond 2 pays {_i(F)} and the CDS 0. Bottom branch, default: bond 2 pays {_i(Rb)} and the "
                 f"CDS 1. A price comes from the promised payment and the yield; an expected return needs the real "
                 f"probabilities of both branches.</p>"
                 f"<p><b>Step 1: bond 1.</b> {_i(F)}/{_g(rf)} = <b>{_f(P1_4)}</b>, earning {rpst} for sure.</p>"
                 f"<p><b>Step 2: bond 2.</b> {_i(F)}/{_g(y)} = <b>{_f(P2_4)}</b>.</p>"
                 f"<p><b>Step 3: expected return on bond 2.</b> Expected payoff {tall(1 - p, 2)} × {_i(F)} + "
                 f"{tall(p, 2)} × {_i(Rb)} = {_f(EX, 2)}. E[r<sub>2</sub>] = {_f(EX, 2)}/{_f(P2_4)} − 1 = "
                 f"<b>{pst(r2_4, 2)}</b>.</p>"
                 f"<p><b>First check (it can fail).</b> {rpst} &lt; {pst(r2_4, 2)} &lt; {pst(y, 1)}: the expected "
                 f"return lies below the promise (expected loss) but above r<sub>f</sub> (default risk is "
                 f"priced) ✓.</p>"
                 f"<p><b>Remember:</b> the yield is a promise, never the expected return of a risky bond.</p>"),
        feller=_rydd([
            Felle(fa_P2rf, "You discounted bond 2 at the risk-free rate. It is priced at its promised yield.", i=1),
            Felle(fa_r2_y, "This is the promised yield. In the default branch bond 2 pays less.", i=2),
            Felle(fa_r2_null, f"You gave bond 2 nothing in default. It still pays {_i(Rb)}.", i=2),
        ], [P1, P2, r2 * 100]),
    )

    # (b) -----------------------------------------------------------------
    b = tall_del(
        "b", poeng=4,
        q="<p>Find the risk-neutral probability of default ρ implied by the price of bond 2.</p>",
        gitt=f"<p>From (a): bond 2 costs {_f(P2_4)}.</p>",
        svar=[T("ρ", rho)],
        kort=(f"<p><b>ρ = {_f(rho)}.</b> [(1 − ρ) × {_i(F)} + ρ × {_i(Rb)}]/{_g(rf)} = {_f(P2_4)}: "
              f"ρ = ({_i(F)} − {_f(vekst4)})/{_i(lam)}.</p>"),
        losning=(f"<p>Under risk-neutral pricing every asset earns r<sub>f</sub>, so bond 2's expected payoff under the "
                 f"risk-neutral probabilities, discounted at r<sub>f</sub>, must equal its price. Put ρ in the default "
                 f"branch, next to {_i(Rb)}; keep it there to the end. Kurbatov: more than half lost points on "
                 f"this exercise by mixing up ρ and 1 − ρ.</p>"
                 f"<p><b>Step 1: grow the price at r<sub>f</sub>.</b> {_f(P2_4)} × {_g(rf)} = {_f(vekst4)}.</p>"
                 f"<p><b>Step 2: solve.</b> (1 − ρ) × {_i(F)} + ρ × {_i(Rb)} = {_f(vekst4)}, so "
                 f"{_i(F)} − {_i(lam)}ρ = {_f(vekst4)} and ρ = {_f(F - vekst4)}/{_i(lam)} = <b>{_f46(rho_v)}</b>.</p>"
                 f"<p><b>First check (it can fail).</b> Reprice: ({_f46(1 - rho_v)} × {_i(F)} + {_f46(rho_v)} × "
                 f"{_i(Rb)})/{_g(rf)} = {_f(((1 - rho_v) * F + rho_v * Rb) / (1 + rf))} = bond 2 ✓. With ρ in the top "
                 f"branch the same numbers give {_f((rho_v * F + (1 - rho_v) * Rb) / (1 + rf))}, nowhere near the "
                 f"price.</p>"
                 f"<p><b>Remember:</b> ρ = {_f(rho)} is more than the analysts' {pst(p, 0)}: it is a price, not a "
                 f"forecast.</p>"),
        feller=_rydd([
            Felle(1 - rho, "This is 1 − ρ, the risk-neutral probability of survival. Define ρ as the default branch "
                           "and keep it there."),
            Felle(p, "This is the analysts' real probability. ρ comes from the bond's price."),
            Felle(fb_ikkevekst, f"You did not grow the price at r<sub>f</sub>: {_i(F)} − {_i(lam)}ρ must equal the "
                                f"price × {_g(rf)}, since the payoff arrives in a year."),
            Felle(fb_null, f"You let bond 2 pay nothing in default. It pays {_i(Rb)}, so the loss is {_i(lam)}, not "
                           f"{_i(F)}."),
        ], [rho]),
    )

    # (c) -----------------------------------------------------------------
    c = tall_del(
        "c", poeng=5,
        q=(f"<p>What is the price of one CDS contract? What does it cost to protect one bond 2 fully against "
           f"default?</p>"),
        gitt=f"<p>From (b): ρ = {_f46(rho_v)}.</p>",
        svar=[T("CDS", cds, kode), T("protection", vern, kode)],
        kort=(f"<p><b>CDS = {_f(cds)}, protection = {_f(vern4)}.</b> CDS = ρ/{_g(rf)}; the bond loses "
              f"{_i(F)} − {_i(Rb)} = {_i(lam)} in default, so buy λ = {_i(lam)} contracts: {_i(lam)} × CDS.</p>"),
        losning=(f"<p>A CDS is insurance on the bond: it pays in the default branch. Price it like any claim on the "
                 f"tree: risk-neutral expected payoff, discounted at r<sub>f</sub>.</p>"
                 f"<p><b>Step 1: one contract.</b> It pays 1 with risk-neutral probability ρ: CDS = {_f46(rho_v)}/"
                 f"{_g(rf)} = <b>{_f46(cds_v)}</b> per unit of protection.</p>"
                 f"<p><b>Step 2: how many contracts.</b> In default bond 2 still pays {_i(Rb)}, so the loss to cover is "
                 f"λ = F × LGD = {_i(F)} × {tall(LGD, 2)} = {_i(lam)} (Kurbatov's «exposure»).</p>"
                 f"<p><b>Step 3: protection.</b> {_i(lam)} × {_f46(cds_v)} = <b>{_f(vern4)}</b>.</p>"
                 f"<p><b>First check.</b> Bond 2 plus the protection pays {_i(F)} in both branches, so it must cost "
                 f"bond 1: {_f(P2_4)} + {_f(vern4)} = {_f(P2_4 + vern4)}, the price of bond 1 ✓. This is an identity once ρ "
                 f"came from the bond prices, but it catches a swap of ρ and 1 − ρ or a wrong λ.</p>"
                 f"<p><b>Remember:</b> CDS = ρ/(1 + r<sub>f</sub>) per unit; cover only what you can lose, "
                 f"λ = F × LGD.</p>"),
        feller=_rydd([
            Felle(fc_p, "You used the analysts' real probability at r<sub>f</sub>. That underprices the protection.",
                  i=0),
            Felle(fc_snu, "You priced the contract with the survival probability 1 − ρ. The CDS pays in the default "
                          "branch.", i=0),
            Felle(fc_udisk, "This is ρ itself. The CDS pays in a year, so discount it at r<sub>f</sub>.", i=0),
            Felle(fc_F, f"You bought one contract per unit of face value. Bond 2 still pays {_i(Rb)} in default, so "
                        f"only the loss of {_i(lam)} needs cover.", i=1),
            Felle(fc_R, f"You covered the recovery ({_i(Rb)}) instead of the loss ({_i(lam)}).", i=1),
            Felle(fc_p_vern, "This protection is priced with the analysts' real probability at r<sub>f</sub>.", i=1),
            Felle(fc_snu_vern, "This protection is priced with the survival probability 1 − ρ.", i=1),
        ], [cds, vern]),
    )

    # (d) -----------------------------------------------------------------
    d = tekst_del(
        "d", poeng=4,
        q=(f"<p>Explain why ρ is so much higher than the analysts' {pst(p, 0)}. Why must bond 2 plus the protection "
           f"cost exactly as much as bond 1?</p>"),
        setninger="Answer in at most four sentences.",
        gitt=(f"<p>From (a) to (c): bond 1 costs {_f(P1_4)}, bond 2 {_f(P2_4)}; ρ = {_f(rho)}; the protection costs "
              f"{_f(vern4)}.</p>"),
        kort=(f"<p>ρ is not a forecast: risk-neutral pricing discounts at r<sub>f</sub>, so the premium investors "
              f"demand for default risk must sit in the probability, so ρ = {_f(rho)} exceeds {pst(p, 0)}. Defaults come in bad times, when money is worth most, so insurance that pays then is "
              f"worth more than its expected payout: at the real {pst(p, 0)} the protection would cost only "
              f"{_f(fc_p_vern)}. Bond 2 plus {_i(lam)} contracts pays {_i(F)} in both branches, a synthetic "
              f"risk-free bond, so it must cost what bond 1 costs, {_f(P1_4)}, or there is an arbitrage.</p>"),
        losning=(f"<p><b>Why ρ is high.</b> Real investors are risk averse and defaults cluster in recessions. A "
                 f"claim that pays in default is insurance against bad times, so it is worth more than its "
                 f"probability-weighted payout. Risk-neutral pricing keeps the discount rate at r<sub>f</sub>, so the "
                 f"whole premium has to go into the weights: the default branch gets ρ = {_f(rho)} against a real "
                 f"{pst(p, 0)}. The protection costs {_f(vern4)}, while the expected loss at the real probability, "
                 f"discounted, is only {_f(fc_p_vern)}: the gap is the risk premium.</p>"
                 f"<p><b>Why the sum equals bond 1.</b> Without default bond 2 pays {_i(F)} and the CDS contracts 0. "
                 f"With default bond 2 pays {_i(Rb)} and the {_i(lam)} contracts pay {_i(lam)}: again {_i(F)}. Two "
                 f"positions that pay {_i(F)} for sure must cost the same, so bond 2 + protection = bond 1. The CDS "
                 f"is the put the bondholders wrote, bought back: D = PV(F) − put.</p>"
                 f"<p><b>Typical mistakes:</b> reading ρ as the market's forecast, or calling the gap between ρ and p "
                 f"an arbitrage. Selling protection earns the premium on average but pays out in the worst state.</p>"
                 f"<p><b>Remember:</b> risky bond + CDS = risk-free bond.</p>"),
        kriterier=[
            "States that ρ is not a forecast: with discounting at r<sub>f</sub>, the risk premium for default risk sits in the probability, so ρ exceeds p (1 p)",
            "Explains why investors pay that premium: defaults cluster in bad times, when money is worth most, so protection is worth more than its expected payout (1 p)",
            f"Shows that bond 2 plus λ = {_i(lam)} contracts pays {_i(F)} in both branches: a synthetic risk-free bond (1 p)",
            "Concludes that it must cost the same as bond 1, otherwise buying the cheap side and selling the dear side is an arbitrage (1 p)",
        ],
    )
    _unik("ov-kre4", [a, b, c, d])
    _KRE4_PAR.add(par)
    return ovelse(case, [a, b, c, d])


# ---------------------------------------------------------------------------
# ov-kre5 · Mer risiko flytter verdi fra kreditorene: et negativt NPV-bytte sett med opsjoner
# ---------------------------------------------------------------------------
@oppgave("ov-kre5", tema="kreditt", tittel="A riskier venture: value moves from the creditors", antall=12,
         sjanger="d3-gjeld", kilde="Lecture 10 slide 16 (option view of agency), Lecture 4 (gambling for resurrection)")
def _(r):
    navn = r.choice(FIRMA_NO + FIRMA_US)
    kode, enhet = _valuta(navn)
    V0 = r.choice([500, 600, 800, 1000])
    u = r.choice([1.20, 1.25, 1.30])
    dn = r.choice([0.70, 0.75, 0.80])
    Vu, Vd = V0 * u, V0 * dn
    if abs(Vu - round(Vu)) > 1e-9 or abs(Vd - round(Vd)) > 1e-9:
        raise Avvis("verdiene i treet er ikke hele tall")
    Vu, Vd = int(round(Vu)), int(round(Vd))
    K = int(round(V0 * r.choice([0.80, 0.85, 0.90]) / 10) * 10)
    if not (Vd + 0.04 * V0 <= K < Vu):
        raise Avvis("gjelden må misligholdes bare i resesjonen")
    rf = r.choice([0.03, 0.04, 0.05])
    g = 1 + rf
    if not Vd < g * V0 < Vu:
        raise Avvis("treet tillater arbitrasje")
    rho = (g * V0 - Vd) / (Vu - Vd)
    if not 0.3 <= rho <= 0.8 or abs(rund(rho, 4) - rho) > 1e-12 or abs(rho - 0.5) < 0.02:
        raise Avvis("ρ er urimelig, ikke pen eller så nær 0.5 at byttede grener gir rett svar")
    a_ = int(round(V0 * r.choice([0.10, 0.15, 0.20, 0.25])))
    b_ = int(round(V0 * r.choice([0.25, 0.30, 0.35, 0.40])))
    Vu2, Vd2 = Vu + a_, Vd - b_
    if Vd2 <= 0.15 * V0:
        raise Avvis("satsingen er urimelig dårlig i resesjonen")
    E0 = rho * (Vu - K) / g
    D0 = V0 - E0
    P0 = (1 - rho) * (K - Vd) / g
    V2 = (rho * Vu2 + (1 - rho) * Vd2) / g
    E2 = rho * (Vu2 - K) / g
    D2 = V2 - E2
    P2 = (1 - rho) * (K - Vd2) / g
    npv = V2 - V0
    dE, dD, dP = E2 - E0, D2 - D0, P2 - P0
    if not (-0.08 * V0 <= npv <= -0.01 * V0) or dE <= 0:
        raise Avvis("byttet må ha negativ NPV og likevel gi eierne gevinst")
    if abs(dD + dP) > 1e-9 or abs(dE - (npv + dP)) > 1e-9:
        raise Avvis("intern feil")
    PV = K / g

    # viste tall og kjeden fra dem
    rho_v = rund(rho, 4)
    E04 = rund(E0, 4)
    D04 = rund(V0 - E04, 4)
    V24 = rund(V2, 4)
    E24 = rund(E2, 4)
    D24 = rund(V24 - E24, 4)
    P04 = rund(P0, 4)
    P24 = rund(P2, 4)
    npv4 = rund(V24 - V0, 4)
    dE4, dD4, dP4 = rund(E24 - E04, 4), rund(D24 - D04, 4), rund(P24 - P04, 4)
    PV4 = rund(PV, 4)
    # alt løsningen viser som like, må være like med fire desimaler
    _lik(dE4 + dD4, npv4)
    _lik(-dD4, dP4)
    _lik(PV4 - P04, D04)
    _lik(PV4 - P24, D24)
    _lik(dE4 - dP4, npv4)
    _lik(D04, (rho * K + (1 - rho) * Vd) / g)
    y0, y2 = K / D04 - 1, K / D24 - 1

    # feller
    fa_E_ub = V0 - PV
    fa_D_safe = PV
    fa_E_udisk = rho * (Vu - K)
    fb_V_lik = float(V0)
    fb_V_udisk = rho * Vu2 + (1 - rho) * Vd2
    fb_E_gml = E0
    fb_D_safe = PV
    fb_D_V0 = V0 - E2
    fc_gren0 = rho * (K - Vd) / g
    fc_gren2 = rho * (K - Vd2) / g
    fc_udisk0 = (1 - rho) * (K - Vd)
    fc_udisk2 = (1 - rho) * (K - Vd2)

    case = (f"<p>{navn}'s assets are worth {_bel(V0, kode, 0)} today. In one year they will be worth {_bel(Vu, kode, 0)} "
            f"in a boom and {_bel(Vd, kode, 0)} in a recession. The firm owes a zero-coupon bond with face value "
            f"{_bel(K, kode, 0)} due in one year. Markets are perfect apart from the conflict below, there are no taxes "
            f"and the risk-free rate is {prosent_tekst(rf * 100, 1)}.</p>"
            f"<p>Management can sell all the assets at their market value and put the proceeds into a venture that "
            f"will be worth {_bel(Vu2, kode, 0)} in a boom and {_bel(Vd2, kode, 0)} in a recession. The venture's "
            f"payoffs depend on the same two states, so the same risk-neutral probabilities price it. The bond's "
            f"covenants do not forbid the switch. Give values with four decimals.</p>")

    # (a) -----------------------------------------------------------------
    a = tall_del(
        "a", poeng=3,
        q="<p>What are the equity and the debt worth today, before any switch?</p>",
        svar=[T("E", E0, enhet), T("D", D0, enhet)],
        kort=(f"<p><b>E = {_f(E04)}, D = {_f(D04)}.</b> ρ = ({_g(rf)} × {_i(V0)} − {_i(Vd)})/({_i(Vu)} − {_i(Vd)}) = "
              f"{_f46(rho)}; E = ρ × {_i(Vu - K)}/{_g(rf)}; D = {_i(V0)} − E.</p>"),
        losning=(f"<p>Equity is a call on the firm's assets with the face value as strike; debt is what is left. Price "
                 f"both with the risk-neutral probability from the assets.</p>"
                 f"<p><b>Step 1: ρ.</b> ({_g(rf)} × {_i(V0)} − {_i(Vd)})/({_i(Vu)} − {_i(Vd)}) = "
                 f"{_f(g * V0 - Vd)}/{_i(Vu - Vd)} = {_f46(rho)}.</p>"
                 f"<p><b>Step 2: payoffs.</b> Boom: equity {_i(Vu)} − {_i(K)} = {_i(Vu - K)}, debt {_i(K)}. Recession: "
                 f"the firm defaults, so equity gets 0 and the creditors take the assets, {_i(Vd)}.</p>"
                 f"<p><b>Step 3: values.</b> E = {_f46(rho)} × {_i(Vu - K)}/{_g(rf)} = <b>{_f(E04)}</b>; "
                 f"D = {_i(V0)} − {_f(E04)} = <b>{_f(D04)}</b>.</p>"
                 f"<p><b>First check (it can fail).</b> Debt directly: ({_f46(rho)} × {_i(K)} + {_f46(1 - rho_v)} × "
                 f"{_i(Vd)})/{_g(rf)} = {_f((rho_v * K + (1 - rho_v) * Vd) / g)} ✓.</p>"
                 f"<p><b>Remember:</b> E = call on V with strike K; D = V − E. The real probabilities are not needed: they "
                 f"are already in the market value of the assets.</p>"),
        feller=_rydd([
            Felle(fa_E_ub, f"You valued equity as V − PV(K), as if the shareholders covered the shortfall in the "
                           f"recession. Limited liability floors their payoff at 0.", i=0),
            Felle(fa_E_udisk, "This is the risk-neutral expected payoff in a year. Discount it at r<sub>f</sub>.", i=0),
            Felle(fa_D_safe, f"You valued the debt as risk-free. In the recession the creditors get only {_i(Vd)}.",
                  i=1),
        ], [E0, D0]),
    )

    # (b) -----------------------------------------------------------------
    b = tall_del(
        "b", poeng=5,
        q="<p>What is the venture worth today? What would the equity and the debt be worth after the switch?</p>",
        gitt=f"<p>From (a): ρ = {_f46(rho)}.</p>",
        svar=[T("venture", V2, enhet), T("E after", E2, enhet), T("D after", D2, enhet)],
        kort=(f"<p><b>Venture {_f(V24)}, E {_f(E24)}, D {_f(D24)}.</b> Venture = ({_f46(rho)} × {_i(Vu2)} + "
              f"{_f46(1 - rho_v)} × {_i(Vd2)})/{_g(rf)}; E = ρ × {_i(Vu2 - K)}/{_g(rf)}; D = venture − E.</p>"),
        losning=(f"<p>The venture is just another claim on the same two states, so ρ prices it. The switch changes the "
                 f"firm's assets; the bond's face value stays at {_i(K)}.</p>"
                 f"<p><b>Step 1: the venture.</b> ({_f46(rho)} × {_i(Vu2)} + {_f46(1 - rho_v)} × {_i(Vd2)})/{_g(rf)} = "
                 f"<b>{_f(V24)}</b>, against {_i(V0)} for the assets it replaces: the switch has an NPV of "
                 f"{_f(npv4)}.</p>"
                 f"<p><b>Step 2: equity after.</b> Boom: {_i(Vu2)} − {_i(K)} = {_i(Vu2 - K)}; recession: 0. "
                 f"E = {_f46(rho)} × {_i(Vu2 - K)}/{_g(rf)} = <b>{_f(E24)}</b>.</p>"
                 f"<p><b>Step 3: debt after.</b> D = {_f(V24)} − {_f(E24)} = <b>{_f(D24)}</b>. The creditors get "
                 f"{_i(K)} in a boom but only {_i(Vd2)} in a recession.</p>"
                 f"<p><b>First check.</b> Equity rises by {_f(dE4)}, debt falls by {_f(-dD4)}; the sum, {_f(dE4 + dD4)}, "
                 f"equals the NPV of {_f(npv4)} (Check 3). Here it is an identity, since D = venture − E, so it catches "
                 f"arithmetic slips only; part (c) gives a check that can fail.</p>"
                 f"<p><b>Remember:</b> value the new assets first, then split them with the same call and the same "
                 f"face value.</p>"),
        feller=_rydd([
            Felle(fb_V_lik, "You assumed the venture is worth what was paid for it. Price its payoffs with ρ.", i=0),
            Felle(fb_V_udisk, "This is the venture's risk-neutral expected value in a year. Discount it at "
                              "r<sub>f</sub>.", i=0),
            Felle(fb_E_gml, "This is the equity before the switch. The call is now on the venture.", i=1),
            Felle(fb_D_safe, "You valued the debt as risk-free.", i=2),
            Felle(fb_D_V0, f"You subtracted the new equity from the old asset value {_i(V0)}. After the switch the "
                           f"firm owns the venture.", i=2),
        ], [V2, E2, D2]),
    )

    # (c) -----------------------------------------------------------------
    c = tall_del(
        "c", poeng=3,
        q=(f"<p>Value the shareholders' option to default, a put on the firm's assets with strike {_i(K)}, before and "
           f"after the switch.</p>"),
        gitt=f"<p>From (a): ρ = {_f46(rho)}.</p>",
        svar=[T("put before", P0, enhet), T("put after", P2, enhet)],
        kort=(f"<p><b>Before {_f(P04)}, after {_f(P24)}.</b> The put pays only in the recession: (1 − ρ) × {_i(K - Vd)}/"
              f"{_g(rf)} and (1 − ρ) × {_i(K - Vd2)}/{_g(rf)}.</p>"),
        losning=(f"<p>Limited liability gives the shareholders the right to hand the assets to the creditors instead "
                 f"of paying {_i(K)}: a put on the assets with strike {_i(K)}. It pays K − V in the recession and "
                 f"nothing in a boom.</p>"
                 f"<p><b>Step 1: before.</b> {_f46(1 - rho_v)} × ({_i(K)} − {_i(Vd)})/{_g(rf)} = <b>{_f(P04)}</b>.</p>"
                 f"<p><b>Step 2: after.</b> {_f46(1 - rho_v)} × ({_i(K)} − {_i(Vd2)})/{_g(rf)} = <b>{_f(P24)}</b>.</p>"
                 f"<p><b>First check (it can fail).</b> Debt is risk-free debt plus a written put, D = PV(K) − put: "
                 f"{_f(PV4)} − {_f(P04)} = {_f(PV4 - P04)} before and {_f(PV4)} − {_f(P24)} = {_f(PV4 - P24)} after, "
                 f"matching (a) and (b) ✓. The debt falls by exactly the rise in the put, {_f(dP4)}.</p>"
                 f"<p><b>Remember:</b> a riskier, worse recession state makes the default option more valuable. "
                 f"Every unit the put gains comes out of the debt.</p>"),
        feller=_rydd([
            Felle(fc_gren0, "You weighted the put's payoff with ρ. It pays in the recession, weight 1 − ρ.", i=0),
            Felle(fc_gren2, "You weighted the put's payoff with ρ. It pays in the recession, weight 1 − ρ.", i=1),
            Felle(fc_udisk0, "This is the put's risk-neutral expected payoff in a year. Discount it.", i=0),
            Felle(fc_udisk2, "This is the put's risk-neutral expected payoff in a year. Discount it.", i=1),
        ], [P0, P2]),
    )

    # (d) -----------------------------------------------------------------
    d = tekst_del(
        "d", poeng=5,
        q=(f"<p>Will the shareholders vote for the switch? Use option language to explain why value moves between the "
           f"claim holders. What can creditors do about it?</p>"),
        setninger="Answer in at most five sentences.",
        gitt=(f"<p>From (a) to (c): E {_f(E04)} → {_f(E24)}, D {_f(D04)} → {_f(D24)}, put {_f(P04)} → {_f(P24)}; the "
              f"switch has an NPV of {_f(npv4)}.</p>"),
        kort=(f"<p>Yes: their equity rises by {_f(dE4)} although the switch destroys {_f(-npv4)} of value. Equity is a "
              f"call on the assets, so limited liability cuts the extra downside at zero while the shareholders keep "
              f"the extra upside. Debt is risk-free debt plus a written put: the put gains {_f(dP4)}, so the debt "
              f"falls by exactly that, a wealth transfer larger than the NPV loss: {_f(dE4)} − {_f(dP4)} = "
              f"{_f(npv4)}. Creditors who foresee this pay less for the bond (demand a higher yield) or write "
              f"covenants that forbid asset substitution, so in the end the shareholders bear the cost.</p>"),
        losning=(f"<p><b>The vote.</b> The shareholders decide by looking at their own claim, not at firm value. "
                 f"E rises from {_f(E04)} to {_f(E24)}, so they vote for a switch with an NPV of {_f(npv4)}.</p>"
                 f"<p><b>Why, in option language.</b> Equity is a call on the assets with strike {_i(K)}. The venture "
                 f"has a better boom and a worse recession. The call keeps the better boom in full, while the worse "
                 f"recession costs the shareholders nothing, because their payoff is already zero there. Debt is "
                 f"risk-free debt plus a written put. The worse recession raises the put the creditors have written, "
                 f"from {_f(P04)} to {_f(P24)}, so the debt falls by {_f(dP4)}.</p>"
                 f"<p><b>Who wins and who loses.</b> Shareholders +{_f(dE4)}, creditors {_f(dD4)}, firm {_f(npv4)}: "
                 f"Check 3 holds. This is asset substitution, the same logic as gambling for resurrection: a wealth "
                 f"transfer from the creditors that more than pays for the destroyed value. The bond's promised yield "
                 f"at its new price would jump from {pst(y0, 2)} to {pst(y2, 2)}.</p>"
                 f"<p><b>The creditors' answer.</b> Rational lenders anticipate it: they demand a higher yield up front "
                 f"or covenants that restrict asset sales and new investments. Then the shareholders bear the expected "
                 f"cost, so covenants are good for them ex ante.</p>"
                 f"<p><b>Remember:</b> more risk raises the call (equity) and the put (which the debt is short). With "
                 f"firm value fixed, it is a pure transfer; with negative NPV, it is a transfer plus a loss.</p>"),
        kriterier=[
            f"Says the shareholders vote yes: their equity rises by {_f(dE4)} although the switch has a negative NPV of {_f(npv4)} (1 p)",
            "Explains equity as a call: limited liability cuts the extra downside at zero, so a wider spread of outcomes raises its value (1 p)",
            f"Explains debt as risk-free debt plus a written put: the put gains {_f(dP4)}, so the debt falls by exactly that amount, a wealth transfer from the creditors (1 p)",
            "Checks that the gains add up to the NPV (shareholders' gain + creditors' loss = NPV, Check 3) (1 p)",
            "Names the creditors' answer: a higher yield (lower price) up front or covenants against asset substitution, so the shareholders bear the cost in the end (1 p)",
        ],
    )
    _unik("ov-kre5", [a, b, c, d])
    return ovelse(case, [a, b, c, d])
