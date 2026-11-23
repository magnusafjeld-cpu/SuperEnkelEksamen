# -*- coding: utf-8 -*-
"""Øv uten stopp FIE402: asymmetrisk informasjon og emisjoner (skribent 3, tema «info»).

   ov-inf1  Myers-Majluf med to typer: α ved pooling, hvem som utsteder, kontroll 5,
            den separerende likevekten (kurs og antall nye aksjer) og verdien som går
            tapt. Bygd etter PS1 E11, V2022 P2 og kj6.
   ov-inf2  Egenkapital mot risikofri gjeld (hakkeordenen): kursen i dag og antall nye
            aksjer, langsiktig kurs per type med aksjer og med lån, gjeldskostnaden som
            gjør den gode typen likegyldig, og hva markedet leser av valget. Bygd etter
            V2023 P4 (IST) og SEO-eksempelet i forelesning 6.
   ov-inf3  Vinnerens forbannelse og kostnaden ved en børsnotering: uinformert
            avkastning, break-even-pris og førstedagsavkastning, netto proveny og
            kostnaden for de gamle eierne i en god emisjon. Bygd etter forelesning 6
            (lysbilde 24–27, tavle s. 1) og PS2 E2. Honorar 5.3 % og andre kostnader
            1.7 % (forelesning 6, lysbilde 13).

   Alle tall i casen, fasiten, løsningen og fellene kommer fra de samme variablene.
   Mellomtall vises med fire desimaler, og kjeden regnes videre fra de viste tallene.
   _sjekk avviser varianten når de to ligger lenger fra hverandre enn toleransen.
"""
from ov_lib import *  # noqa: F401,F403


def _sjekk(vist, eksakt, rel=0.002):
    """Avvis varianten når kjeden regnet fra viste (avrundede) tall havner utenfor toleransen."""
    if abs(vist - eksakt) > rel * max(abs(eksakt), 1e-9):
        raise Avvis(f"avrundet kjede {vist} for langt fra eksakt {eksakt}")


def _tol(t):
    """Toleransen byggeren bruker for et svar T."""
    rel = t.rel if t.rel is not None else (STD_REL if t.abs is None else 0)
    return max(t.abs or 0, rel * abs(t.verdi))


def _rens(feller, svar):
    """Sjekk fellene mot svarene (T-objekter) i delen.
       - None hoppes over (feilen finnes ikke i denne varianten, for eksempel q = 0.5).
       - En felle innenfor to ganger toleransen til sitt EGET tall avviser varianten:
         da kan ikke studenten skilles fra feilen.
       - En felle som treffer et ANNET tall i delen, fjernes (diagnosen blir tvetydig).
       - En felle som er lik en tidligere felle for samme tall, fjernes."""
    ut = []
    for f in feller:
        if f is None:
            continue
        if abs(f.verdi - svar[f.i].verdi) <= 2 * _tol(svar[f.i]) + 1e-12:
            raise Avvis(f"fella «{f.tekst[:40]}» gir nesten riktig svar")
        if any(j != f.i and abs(f.verdi - t.verdi) <= 2 * _tol(t) + 1e-12 for j, t in enumerate(svar)):
            continue
        if any(g.i == f.i and abs(g.verdi - f.verdi) <= _tol(svar[f.i]) for g in ut):
            continue
        ut.append(f)
    return ut


_BRUKT = {}


def _velg(oid, liste, r, nøkkel):
    """Velg blant de minst brukte vignettene, så navnene sprer seg over variantene."""
    tell = _BRUKT.setdefault(oid, {"navn": {}, "svar": set()})["navn"]
    minst = min(tell.get(nøkkel(x), 0) for x in liste)
    return r.choice([x for x in liste if tell.get(nøkkel(x), 0) == minst])


def _ferdig(oid, ov, navn):
    """Avvis varianten når en deloppgave får samme svar som i en tidligere variant.
       Ellers registreres svarene og navnet."""
    b = _BRUKT.setdefault(oid, {"navn": {}, "svar": set()})
    nøkler = {(d["l"], tuple(round(t.verdi, 4) for t in d["svar"])) for d in ov["deler"] if d.get("svar")}
    if nøkler & b["svar"]:
        raise Avvis("samme svar som i en tidligere variant")
    b["svar"] |= nøkler
    b["navn"][navn] = b["navn"].get(navn, 0) + 1
    return ov


def _enhet(cur):
    """Valutaenheten i løpende tekst."""
    return "krone" if cur == "NOK" else "dollar"


def _m(x, d, cur):
    """Beløp i millioner: «NOK 120 million» eller «$120.50 million»."""
    return f"{penger(x, d, cur)} million"


# ---------------------------------------------------------------------------
# ov-inf1 · Myers-Majluf: pooling, kontroll 5 og den separerende likevekten
# ---------------------------------------------------------------------------
INF1 = [
    dict(navn="Tindheim Petroleum ASA", cur="NOK",
         info="whether its production licence on the Tindheim field will be extended",
         prosjekt="a new gas compressor"),
    dict(navn="Solvik Biotech ASA", cur="NOK",
         info="the results of the clinical trial of its main drug",
         prosjekt="a second production line"),
    dict(navn="Kvalnes Seafood ASA", cur="NOK",
         info="the health of the salmon at its new farming sites",
         prosjekt="a new harvesting vessel"),
    dict(navn="Brekke Mining AS", cur="NOK",
         info="the ore grade in the new section of its main mine",
         prosjekt="a new crushing plant"),
    dict(navn="Haldor Systems ASA", cur="NOK",
         info="whether its largest customer will renew a five-year contract",
         prosjekt="a new data centre"),
    dict(navn="Ironbridge Patents Inc", cur="$",
         info="the outcome of a patent dispute it is a party to",
         prosjekt="a new research laboratory"),
    dict(navn="Northwind Robotics Inc", cur="$",
         info="the true defect rate of its new robot model",
         prosjekt="an automated warehouse"),
    dict(navn="Cedar Lake Energy Inc", cur="$",
         info="the size of the reserves found by its latest well",
         prosjekt="a new pipeline connection"),
]


@oppgave("ov-inf1", tema="info", tittel="Myers-Majluf: who issues and the equilibrium", antall=12,
         sjanger="myers", kilde="PS1 E11, V2022 P2")
def _(r):
    v = _velg("ov-inf1", INF1, r, lambda x: x["navn"])
    fi, cur = v["navn"], v["cur"]
    VL = r.choice([80, 100, 120, 150, 160, 200])
    VH = VL + r.choice([120, 150, 200, 240, 300])
    q = r.choice([0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75])
    I = r.choice([40, 50, 60, 80, 100])
    npv = r.choice([6, 8, 10, 12, 14, 15, 16, 18, 20, 24, 25])
    N = r.choice([10, 20, 25, 40, 50])
    EV = q * VH + (1 - q) * VL
    if abs(EV - round(EV)) > 1e-9:
        raise Avvis("E[V] er ikke et helt tall")
    EV = round(EV)

    # (a) pooling
    D = EV + I + npv
    a = I / D
    a4 = rund(a, 4)
    dil = a * (VH - EV)
    if dil < 1.1 * npv:
        raise Avvis("pooling holder eller er nesten likegyldig for den gode typen")
    # (b) utbetaling til gamle eiere, regnet fra vist α
    payH, payL = (1 - a) * (VH + I + npv), (1 - a) * (VL + I + npv)
    payH4, payL4 = (1 - a4) * (VH + I + npv), (1 - a4) * (VL + I + npv)
    _sjekk(payH4, payH)
    _sjekk(payL4, payL)
    if VH - payH < 0.01 * VH:
        raise Avvis("den gode typen er for nær likegyldig")
    dil4 = a4 * (VH - EV)
    gev4 = a4 * (EV - VL)
    # (c) separerende likevekt
    P = (VL + npv) / N
    n = I / P
    a_sep = I / (VL + I + npv)
    devH = (1 - a_sep) * (VH + I + npv)
    if P < 1.5:
        raise Avvis("for lav kurs per aksje")
    # (d) forventet tap
    tap = q * npv

    # feller
    f_a_utenI = I / (EV + npv)
    f_a_utenNPV = I / (EV + I)
    f_a_hoy = I / (VH + I + npv)
    f_a_sep = a_sep
    f_tro = EV + npv                      # (1 − α)(E[V] + I + NPV): verdsatt etter troen
    f_H_utenI, f_L_utenI = (1 - a4) * (VH + npv), (1 - a4) * (VL + npv)
    f_H_uten, f_L_uten = (1 - a4) * VH, (1 - a4) * VL
    P_pool = (EV + npv) / N
    f_P_utenNPV = VL / N
    f_P_medI = (VL + I + npv) / N
    f_n_pool = I / P_pool
    f_n_aN = a_sep * N
    f_n_utenNPV = I * N / VL

    def m(x, d=2):
        return _m(x, d, cur)

    case = (f"<p>{fi} has {tall(N)} million shares, no debt and no cash. Its assets in place are worth either "
            f"{m(VH, 0)} or {m(VL, 0)}, depending on {v['info']}. The manager already knows which. Investors do not: "
            f"they put probability {tall(q, 2)} on the higher value.</p>"
            f"<p>{fi} can invest {m(I, 0)} today in {v['prosjekt']} with a publicly known NPV of {m(npv, 0)}. "
            f"The only way to finance it is to sell new shares to competitive, risk-neutral investors. Without the "
            f"issue the project is lost. The manager acts for the existing shareholders, who buy none of the new "
            f"shares. There is no discounting.</p>"
            f"<p>Give fractions with four decimals and amounts with two.</p>")

    ev_tekst = f"{tall(q, 2)} × {tall(VH)} + {tall(1 - q, 2)} × {tall(VL)} = {tall(EV)}"

    a_del = tall_del(
        "a", poeng=3,
        q="<p>Suppose investors believe that both types issue. What fraction α of the firm after the issue must "
          "the new investors receive?</p>",
        svar=(sv_a := [T("α", a)]),
        kort=(f"<p><b>α = {tall(a4, 4)}.</b> E[V | issue] = {ev_tekst}; α = {tall(I)}/({tall(EV)} + {tall(I)} + "
              f"{tall(npv)}) = {tall(I)}/{tall(D)}.</p>"),
        losning=(f"<p>New investors cannot see the type. They pay a fair price for the firm they believe they are "
                 f"buying into: the assets in place at their expected value, plus the cash they bring, plus the "
                 f"NPV of the project. Their stake α is the money they put in divided by that value.</p>"
                 f"<p><b>Step 1: the belief.</b> Both types issue, so an issue says nothing about the type: "
                 f"E[V | issue] = {ev_tekst}.</p>"
                 f"<p><b>Step 2: the firm after the issue, in investors' eyes.</b> {tall(EV)} + {tall(I)} + "
                 f"{tall(npv)} = {tall(D)}. The cash is inside the firm once it is raised. The project adds its "
                 f"NPV.</p>"
                 f"<p><b>Step 3: the stake.</b> α = I/(E[V | issue] + I + NPV) = {tall(I)}/{tall(D)} = "
                 f"<b>{tall(a4, 4)}</b>.</p>"
                 f"<p><b>First check.</b> In investors' eyes the stake is worth {tall(a4, 4)} × {tall(D)} ≈ "
                 f"{tall(I)}, the cash they pay. That is how α was defined, so the check is an identity and "
                 f"only catches arithmetic slips. The real test is whether both types want to issue at this price "
                 f"(Check 5).</p>"
                 f"<p><b>Remember:</b> α is priced off the investors' belief, with the cash raised in the "
                 f"denominator.</p>"),
        feller=_rens([
            Felle(f_a_utenI, f"You left the cash raised out of the denominator: {tall(I)}/({tall(EV)} + "
                             f"{tall(npv)})."),
            Felle(f_a_utenNPV, f"You left out the NPV: {tall(I)}/({tall(EV)} + {tall(I)})."),
            Felle(f_a_hoy, f"You priced the issue at the high value, {tall(VH)}, which investors cannot see."),
            Felle(f_a_sep, "You priced the issue as if only the low type issues, but in this part investors believe "
                           "both types issue."),
        ], sv_a),
    )

    b_del = blandet_del(
        "b", poeng=5, tall_poeng=3,
        q=("<p>On these terms, what is the old shareholders' stake worth after the issue if the assets are worth "
           f"{m(VH, 0)} and if they are worth {m(VL, 0)}? Which type or types issue? Is the belief in (a) "
           "rational?</p>"),
        gitt=f"<p>From (a): α = {tall(a4, 4)}.</p>",
        svar=(sv_b := [T("Old shareholders, high type", payH, f"{cur} million"),
                       T("Old shareholders, low type", payL, f"{cur} million")]),
        tekst_ledd="Which type or types issue? Is the belief in (a) rational?",
        setninger="Answer in at most three sentences.",
        kort=(f"<p><b>High: {m(payH4)}; low: {m(payL4)}.</b> (1 − {tall(a4, 4)}) × ({tall(VH)} + {tall(I)} + "
              f"{tall(npv)}) and (1 − {tall(a4, 4)}) × ({tall(VL)} + {tall(I)} + {tall(npv)}). The high type gets "
              f"less than {tall(VH)} and does not issue, so the belief that both issue is not rational.</p>"),
        losning=(f"<p>The old shareholders keep 1 − α of the firm. The firm is worth what it is truly worth, not "
                 f"what investors believe. Each type compares that with the value of not issuing, which is its "
                 f"assets alone, since the project is lost without the issue.</p>"
                 f"<p><b>Step 1: high type.</b> (1 − {tall(a4, 4)}) × ({tall(VH)} + {tall(I)} + {tall(npv)}) = "
                 f"<b>{tall(payH4, 2)}</b>, below {tall(VH)}. It sells shares worth more than investors pay: the "
                 f"dilution α(V<sub>H</sub> − E[V]) = {tall(a4, 4)} × ({tall(VH)} − {tall(EV)}) = {tall(dil4, 2)} "
                 f"exceeds the NPV of {tall(npv)}. It does not issue.</p>"
                 f"<p><b>Step 2: low type.</b> (1 − {tall(a4, 4)}) × ({tall(VL)} + {tall(I)} + {tall(npv)}) = "
                 f"<b>{tall(payL4, 2)}</b>, above {tall(VL)}. It gains the NPV plus α(E[V] − V<sub>L</sub>) = "
                 f"{tall(gev4, 2)} from selling overpriced shares. It issues.</p>"
                 f"<p><b>Check 5.</b> The belief was that both types issue, but only the low type does. Investors "
                 f"would lose money on such a belief, so it is not rational and pooling is not an equilibrium. This "
                 f"check can fail. Here it does.</p>"
                 f"<p><b>Remember:</b> price with the belief and pay out with the truth. Compare with the value of "
                 f"not issuing.</p>"),
        kriterier=[
            f"Concludes that the high type does not issue: {tall(payH4, 2)} is below the {tall(VH)} it keeps without "
            f"the issue, because its dilution of {tall(dil4, 2)} exceeds the NPV of {tall(npv)} (1 p)",
            f"Concludes that only the low type issues ({tall(payL4, 2)} above {tall(VL)}), so the belief that both "
            f"types issue is not rational and fails Check 5 (1 p)",
        ],
        feller=_rens([
            Felle(f_tro, f"You valued the stake at the investors' belief, {tall(EV)} + {tall(npv)}, not at what the "
                         f"high type's firm is truly worth.", i=0),
            Felle(f_H_utenI, "You left the cash raised out of the firm's value after the issue.", i=0),
            Felle(f_H_uten, "You left out both the cash raised and the project.", i=0),
            Felle(f_tro, f"You valued the stake at the investors' belief, {tall(EV)} + {tall(npv)}, not at what the "
                         f"low type's firm is truly worth.", i=1),
            Felle(f_L_utenI, "You left the cash raised out of the firm's value after the issue.", i=1),
            Felle(f_L_uten, "You left out both the cash raised and the project.", i=1),
        ], sv_b),
    )

    c_del = tall_del(
        "c", poeng=4,
        q=("<p>Find the equilibrium. At what price per share are the new shares sold? How many new shares (in "
           "millions) does the issuer sell?</p>"),
        gitt=(f"<p>From (b): at α = {tall(a4, 4)} the high type's old shareholders would get {tall(payH4, 2)} "
              f"(against {tall(VH)} without the issue) and the low type's {tall(payL4, 2)} (against {tall(VL)}).</p>"),
        svar=(sv_c := [T("Issue price", P, f"{cur} per share"), T("New shares", n, "million shares")]),
        kort=(f"<p><b>{penger(P, 2, cur)} per share, {tall(n, 4)} million shares.</b> Only the low type issues: "
              f"P = ({tall(VL)} + {tall(npv)})/{tall(N)}; n = {tall(I)}/{tall(P, 4)}.</p>"),
        losning=(f"<p>In equilibrium the belief must match behaviour. Since only the low type issues, an issue "
                 f"reveals the low type and investors price the new shares at the low type's value. That is a "
                 f"separating equilibrium.</p>"
                 f"<p><b>Step 1: the price.</b> The old shares of an issuer are worth V<sub>L</sub> + NPV = "
                 f"{tall(VL)} + {tall(npv)} = {tall(VL + npv)}, so P = {tall(VL + npv)}/{tall(N)} = "
                 f"<b>{penger(P, 2, cur)}</b>.</p>"
                 f"<p><b>Step 2: the shares.</b> n = I/P = {tall(I)}/{tall(P, 4)} = <b>{tall(n, 4)} million</b>. As a "
                 f"fraction, α = I/(V<sub>L</sub> + I + NPV) = {tall(I)}/{tall(VL + I + npv)} = {tall(a_sep, 4)}.</p>"
                 f"<p><b>Step 3: verify both types (Check 5).</b> The low type now sells at a fair price and keeps "
                 f"V<sub>L</sub> + NPV = {tall(VL + npv)}, above {tall(VL)}: it issues. The high type would get "
                 f"(1 − {tall(a_sep, 4)}) × {tall(VH + I + npv)} = {tall(devH, 2)}, below {tall(VH)}: it stays out. "
                 f"Both act as the belief assumes, so the belief is rational. This check could have failed, as it "
                 f"did for pooling.</p>"
                 f"<p><b>First check.</b> After the issue the firm is worth {tall(VL + I + npv)} over "
                 f"{tall(N + n, 4)} million shares, {tall((VL + I + npv) / (N + n), 2)} per share: the issue price. "
                 f"This is an identity.</p>"
                 f"<p><b>Remember:</b> reprice an issuer as the low type, then check that the low type still issues "
                 f"and the high type still abstains.</p>"),
        feller=_rens([
            Felle(P_pool, "You priced the new shares at the pooling belief, which is not an equilibrium here.", i=0),
            Felle(f_P_utenNPV, "You left out the project's NPV.", i=0),
            Felle(f_P_medI, "You divided the firm after the issue, cash included, by the old shares only.", i=0),
            Felle(f_n_pool, "This share count uses the pooling price, which is not the equilibrium price.", i=1),
            Felle(f_n_aN, "You took α of the old share count, but the new shares are themselves part of the total.",
                  i=1),
            Felle(f_n_utenNPV, "This share count uses a price without the project's NPV.", i=1),
        ], sv_c),
    )

    d_del = blandet_del(
        "d", poeng=4, tall_poeng=1,
        q=("<p>How much value does the information problem destroy in expectation (in millions)? Name the mechanism and "
           "explain why the high type passes up a project with a positive NPV. Would value also be lost if both types "
           "issued? How could the loss have been avoided?</p>"),
        gitt=(f"<p>From (c): in equilibrium only the low type issues, at {penger(P, 2, cur)} per share. The high "
              f"type stays out.</p>"),
        svar=(sv_d := [T("Expected loss", tap, f"{cur} million")]),
        tekst_ledd="Name the mechanism and explain why the high type passes up a positive-NPV project. Would value also "
                   "be lost if both types issued? How could the loss have been avoided?",
        setninger="Answer in at most four sentences.",
        kort=(f"<p><b>Expected loss {m(tap)}</b> = {tall(q, 2)} × {tall(npv)}. Underinvestment from adverse "
              f"selection: selling underpriced shares would cost the high type more than the NPV. Pooling loses "
              f"nothing: it only moves value between the two types' old shareholders. Financial slack "
              f"(internal funds or safe debt) avoids the loss.</p>"),
        losning=(f"<p>Only the separating outcome destroys value. The low type invests in both outcomes. The high "
                 f"type invests under pooling but not under separating. Its project is then never taken: the "
                 f"loss is q × NPV = {tall(q, 2)} × {tall(npv)} = <b>{tall(tap, 2)}</b>.</p>"
                 f"<p><b>The mechanism.</b> The price of an issue reflects the average issuer. The high type is "
                 f"not average. Selling a stake at a price below its true value hands part of the old shareholders' "
                 f"wealth to the new investors. When that transfer exceeds the NPV, the manager, acting for the old "
                 f"shareholders, lets a good project die. This is underinvestment, the same family as debt overhang.</p>"
                 f"<p><b>If both types issued.</b> Pooling destroys nothing: both projects are taken. The high type's "
                 f"loss is the low type's gain, passed on through new investors who break even on average.</p>"
                 f"<p><b>The remedy.</b> Financial slack: cash built up from retained earnings, or unused safe debt "
                 f"capacity, lets the high type invest without selling claims that are sensitive to what the manager "
                 f"knows. Credible certification of the asset value, or a rights issue to the existing owners, "
                 f"also works.</p>"
                 f"<p><b>Typical mistakes:</b> calling pooling the inefficient outcome, or saying that the low type is "
                 f"the one that loses its project.</p>"
                 f"<p><b>Remember:</b> separating destroys q × NPV; pooling only transfers value.</p>"),
        kriterier=[
            "Names underinvestment from adverse selection (Myers-Majluf): the high type forgoes a positive-NPV project "
            "because the dilution from selling underpriced shares exceeds the NPV (1 p)",
            "Says that no value would be lost if both types issued: pooling only transfers value from the high type's "
            "old shareholders to the low type's (1 p)",
            "Gives a remedy with its mechanism: financial slack (cash or safe debt) lets the high type invest without "
            "selling underpriced shares; certification or a rights issue is also accepted (1 p)",
        ],
        feller=_rens([
            Felle(npv, "You counted the whole NPV as lost, as if the project were always passed up."),
            Felle((1 - q) * npv, "You weighted the NPV by the probability of the low type, which invests in "
                                 "equilibrium.") if q != 0.5 else None,
        ], sv_d),
    )
    return _ferdig("ov-inf1", ovelse(case, [a_del, b_del, c_del, d_del]), fi)


# ---------------------------------------------------------------------------
# ov-inf2 · Egenkapital mot risikofri gjeld: hakkeordenen
# ---------------------------------------------------------------------------
INF2 = [
    dict(navn="Aurland Chips ASA", cur="NOK", prosjekt="a new wafer plant"),
    dict(navn="Fosen Aqua ASA", cur="NOK", prosjekt="a new smolt facility"),
    dict(navn="Vestre Elektro ASA", cur="NOK", prosjekt="a new battery factory"),
    dict(navn="Hamar Logistics ASA", cur="NOK", prosjekt="a new distribution terminal"),
    dict(navn="Bluewater Semiconductors Inc", cur="$", prosjekt="a new fabrication line"),
    dict(navn="Redstone Pharma Inc", cur="$", prosjekt="a new sterile filling plant"),
    dict(navn="Pinecrest Foods Inc", cur="$", prosjekt="a new packaging plant"),
    dict(navn="Granite Telecom Inc", cur="$", prosjekt="a new fibre network"),
]


@oppgave("ov-inf2", tema="info", tittel="Equity or a loan: the pecking order", antall=12,
         sjanger="myers", kilde="V2023 P4, Lecture 6 SEO example")
def _(r):
    v = _velg("ov-inf2", INF2, r, lambda x: x["navn"])
    fi, cur = v["navn"], v["cur"]
    N = r.choice([50, 80, 100, 120, 150, 200])
    PL = r.choice([12, 15, 16, 18, 20, 24, 25, 30, 36, 40])
    PH = PL + r.choice([2, 3, 4, 5, 6, 8, 10])
    if not 0.1 <= (PH - PL) / PL <= 0.4:
        raise Avvis("spredningen mellom typene er urimelig")
    q = r.choice([0.5, 0.5, 0.4, 0.6, 0.25, 0.75])
    P0 = q * PH + (1 - q) * PL
    if abs(P0 * 100 - round(P0 * 100)) > 1e-6:
        raise Avvis("dagens kurs har mer enn to desimaler")
    P0 = round(P0, 2)
    I = round(N * P0 * r.choice([0.15, 0.2, 0.25, 0.3]) / 50) * 50
    if I < 100:
        raise Avvis("for lite beløp")
    n = I / P0
    n4 = rund(n, 4)
    _sjekk(n4, n)
    # (b) langsiktig kurs med egenkapital, regnet fra vist n
    PLE, PHE = (N * PL + I) / (N + n), (N * PH + I) / (N + n)
    PLE4, PHE4 = rund((N * PL + I) / (N + n4), 4), rund((N * PH + I) / (N + n4), 4)
    _sjekk(PLE4, PLE)
    _sjekk(PHE4, PHE)
    # (d) gjeldskostnaden som gjør den gode typen likegyldig
    Cst = N * (PH - PHE)
    Cst4 = N * (PH - PHE4)
    _sjekk(Cst4, Cst)
    steg = 5 if Cst >= 20 else 1
    kand = [k * steg for k in range(1, int(Cst // steg) + 1) if 0.3 * Cst <= k * steg <= 0.75 * Cst]
    if not kand:
        raise Avvis("ingen pen gjeldskostnad")
    C = r.choice(kand)
    # (c) langsiktig kurs med lån
    PLD, PHD = PL - C / N, PH - C / N
    if not (PLE > PLD and PHD > PHE):
        raise Avvis("valget snur")
    if C / N < 3 * STD_REL * PH:
        raise Avvis("lånekostnaden per aksje er for liten til å skille fra toleransen")

    def m(x, d=2):
        return _m(x, d, cur)

    def ps(x, d=2):
        return penger(x, d, cur)

    case = (f"<p>{fi} has {tall(N)} million shares and no debt. The managers know that its existing assets are worth "
            f"either {ps(PH)} or {ps(PL)} per share. Investors cannot tell which: "
            + ("they consider the two values equally likely" if q == 0.5 else
               f"they put probability {tall(q, 2)} on the higher value")
            + f". The shares trade at the expected value.</p>"
            f"<p>{fi} must raise {m(I, 0)} to build {v['prosjekt']}, which is worth exactly what it costs (zero NPV). "
            f"It can issue new shares, or it can borrow. The loan is risk-free and fairly priced whatever the type, "
            f"but its covenants and fees cost the existing shareholders {m(C, 0)} in present value. The managers act "
            f"for the existing shareholders and want the highest long-run share price, once the true value is "
            f"known. There is no discounting.</p>"
            f"<p>Give share prices with four decimals and share counts in millions with four decimals.</p>")

    p0_tekst = f"{tall(q, 2)} × {tall(PH, 2)} + {tall(1 - q, 2)} × {tall(PL, 2)}"
    a_del = tall_del(
        "a", poeng=3,
        q=(f"<p>What is the share price today? If {fi} issues new shares at that price, how many must it sell (in "
           f"millions)?</p>"),
        svar=(sv_a := [T("P<sub>0</sub>", P0, f"{cur} per share"), T("New shares", n, "million shares")]),
        kort=(f"<p><b>P<sub>0</sub> = {ps(P0)}, n = {tall(n4, 4)} million.</b> P<sub>0</sub> = {p0_tekst}; "
              f"n = {tall(I)}/{tall(P0, 2)}.</p>"),
        losning=(f"<p>Investors price the shares at what they expect them to be worth, given what they know. The "
                 f"managers know more, but that does not enter the price. Both types would therefore sell new shares "
                 f"at the same price, which is what creates a transfer between old and new shareholders once the "
                 f"truth comes out.</p>"
                 f"<p><b>Step 1: today's price.</b> P<sub>0</sub> = {p0_tekst} = <b>{ps(P0)}</b>.</p>"
                 f"<p><b>Step 2: the shares.</b> To raise {tall(I)} million at {tall(P0, 2)} per share, {fi} sells "
                 f"n = {tall(I)}/{tall(P0, 2)} = <b>{tall(n4, 4)} million</b> new shares, giving "
                 f"{tall(N + n4, 4)} million shares in total.</p>"
                 f"<p><b>First check.</b> {tall(n4, 4)} × {tall(P0, 2)} ≈ {tall(I)}, the amount needed. This is an "
                 f"identity, so it only catches slips.</p>"
                 f"<p><b>Remember:</b> the issue is priced at what investors believe, not at what the managers "
                 f"know.</p>"),
        feller=_rens([
            Felle((PH + PL) / 2, "You took the simple average of the two values, ignoring their probabilities.",
                  i=0) if q != 0.5 else None,
            Felle((1 - q) * PH + q * PL, "You swapped the probabilities of the two values.", i=0) if q != 0.5 else None,
            Felle(PH, "You used the managers' high value, which investors cannot see.", i=0),
            Felle(I / PL, "You priced the new shares at the low value, which investors cannot see.", i=1),
            Felle(I / PH, "You priced the new shares at the high value, which investors cannot see.", i=1),
        ], sv_a),
    )

    b_del = tall_del(
        "b", poeng=4,
        q=(f"<p>Suppose {fi} issues the shares at today's price. Once the true value is known, what is the share "
           f"price if the true value of the existing assets is {ps(PL)} per share and if it is {ps(PH)}?</p>"),
        gitt=f"<p>From (a): P<sub>0</sub> = {ps(P0)} and n = {tall(n4, 4)} million new shares.</p>",
        svar=(sv_b := [T("Long-run price, low type", PLE, f"{cur} per share"),
                       T("Long-run price, high type", PHE, f"{cur} per share")]),
        kort=(f"<p><b>Low: {ps(PLE4, 4)}; high: {ps(PHE4, 4)}.</b> ({tall(N)} × {tall(PL, 2)} + {tall(I)})/"
              f"{tall(N + n4, 4)} and ({tall(N)} × {tall(PH, 2)} + {tall(I)})/{tall(N + n4, 4)}.</p>"),
        losning=(f"<p>Once the truth is out, the firm is worth its true existing assets plus the plant, which is worth "
                 f"the {tall(I)} it cost. That value is shared by all shares, old and new.</p>"
                 f"<p><b>Step 1: low type.</b> ({tall(N)} × {tall(PL, 2)} + {tall(I)})/({tall(N)} + {tall(n4, 4)}) = "
                 f"{tall(N * PL + I)}/{tall(N + n4, 4)} = <b>{ps(PLE4, 4)}</b>, above its value of {ps(PL)}. The "
                 f"new investors paid {tall(P0, 2)} for shares worth {tall(PL, 2)}. The difference goes to the "
                 f"old shareholders.</p>"
                 f"<p><b>Step 2: high type.</b> ({tall(N)} × {tall(PH, 2)} + {tall(I)})/({tall(N)} + {tall(n4, 4)}) = "
                 f"{tall(N * PH + I)}/{tall(N + n4, 4)} = <b>{ps(PHE4, 4)}</b>, below {ps(PH)}. It sold shares "
                 f"worth more than {tall(P0, 2)}, so its old shareholders are diluted.</p>"
                 f"<p><b>First check.</b> Weighted by the investors' probabilities, the two prices average to "
                 f"{tall(q, 2)} × {tall(PHE4, 4)} + {tall(1 - q, 2)} × {tall(PLE4, 4)} = "
                 f"{tall(q * PHE4 + (1 - q) * PLE4, 4)}, which is P<sub>0</sub> up to rounding. If both types "
                 f"issued, investors would just break even on average.</p>"
                 f"<p><b>Remember:</b> after the truth is known, value = (true assets + cash raised)/(old + new "
                 f"shares).</p>"),
        feller=_rens([
            Felle((N * PL + I) / N, "You divided by the old shares only, leaving out the new shares.", i=0),
            Felle(N * PL / (N + n4), "You left out the plant bought with the money raised.", i=0),
            Felle(P0, "You kept today's price, which does not reflect the true value.", i=0),
            Felle((N * PH + I) / N, "You divided by the old shares only, leaving out the new shares.", i=1),
            Felle(N * PH / (N + n4), "You left out the plant bought with the money raised.", i=1),
            Felle(P0, "You kept today's price, which does not reflect the true value.", i=1),
        ], sv_b),
    )

    c_del = blandet_del(
        "c", poeng=4, tall_poeng=2,
        q=(f"<p>Suppose instead {fi} borrows the {m(I, 0)}. What is the long-run share price with the loan if the true "
           f"value is {ps(PL)} per share and if it is {ps(PH)}? Which way of financing does each type prefer?</p>"),
        gitt=(f"<p>From (b): with new shares the long-run price is {ps(PLE4, 4)} for the low type and {ps(PHE4, 4)} "
              f"for the high type.</p>"),
        svar=(sv_c := [T("Price with the loan, low type", PLD, f"{cur} per share"),
                       T("Price with the loan, high type", PHD, f"{cur} per share")]),
        tekst_ledd="Which way of financing does each type prefer and why?",
        setninger="Answer in at most two sentences.",
        kort=(f"<p><b>Low: {ps(PLD, 4)}; high: {ps(PHD, 4)}.</b> The plant pays for the loan, so only the covenants "
              f"cost: {tall(C)}/{tall(N)} = {tall(C / N, 4)} per share. The low type issues shares ({tall(PLE4, 4)} against "
              f"{tall(PLD, 4)}); the high type borrows ({tall(PHD, 4)} against {tall(PHE4, 4)}).</p>"),
        losning=(f"<p>A risk-free loan is fairly priced whatever the managers know, so it transfers nothing between old "
                 f"and new investors. Its only cost is the covenants and fees.</p>"
                 f"<p><b>Step 1: the loan.</b> The plant is worth the {tall(I)} borrowed, so plant and loan cancel. "
                 f"The old shareholders keep the existing assets less {tall(C)}, which is {tall(C)}/{tall(N)} = "
                 f"{tall(C / N, 4)} per share.</p>"
                 f"<p><b>Step 2: the prices.</b> Low: {tall(PL, 2)} − {tall(C / N, 4)} = <b>{ps(PLD, 4)}</b>. High: "
                 f"{tall(PH, 2)} − {tall(C / N, 4)} = <b>{ps(PHD, 4)}</b>.</p>"
                 f"<p><b>Step 3: the choice.</b> The low type gets {tall(PLE4, 4)} with shares and {tall(PLD, 4)} "
                 f"with the loan: it issues shares, because it sells them for more than they are worth and avoids the "
                 f"fees. The high type gets {tall(PHE4, 4)} with shares and {tall(PHD, 4)} with the loan: it "
                 f"borrows, because the dilution of {tall(PH - PHE4, 4)} per share is larger than the "
                 f"{tall(C / N, 4)} the loan costs.</p>"
                 f"<p><b>First check.</b> Each type compared its own two prices, so a slip in (b) would flip a "
                 f"choice. This comparison can fail, which is why it is worth one line.</p>"
                 f"<p><b>Remember:</b> safe debt carries no information cost, only its direct costs.</p>"),
        kriterier=[
            f"The low type prefers new shares ({tall(PLE4, 4)} against {tall(PLD, 4)}): it sells overpriced shares and "
            f"avoids the cost of the loan (1 p)",
            f"The high type prefers the loan ({tall(PHD, 4)} against {tall(PHE4, 4)}): the dilution from selling "
            f"underpriced shares costs more per share than the covenants (1 p)",
        ],
        feller=_rens([
            Felle(PL + I / N, "You added the plant but forgot the loan that must be repaid.", i=0),
            Felle(PL - (I + C) / N, "You subtracted the loan but forgot the plant it pays for.", i=0),
            Felle(PL, "You left out the cost of the covenants and fees.", i=0),
            Felle(PH + I / N, "You added the plant but forgot the loan that must be repaid.", i=1),
            Felle(PH - (I + C) / N, "You subtracted the loan but forgot the plant it pays for.", i=1),
            Felle(PH, "You left out the cost of the covenants and fees.", i=1),
        ], sv_c),
    )

    d_del = tall_del(
        "d", poeng=3,
        q=(f"<p>What is the highest present value of covenants and fees (in millions) at which the high type still "
           f"prefers to borrow rather than issue shares at today's price?</p>"),
        gitt=f"<p>From (b): with new shares the high type's long-run price is {ps(PHE4, 4)}.</p>",
        svar=(sv_d := [T("Highest cost of the loan", Cst, f"{cur} million")]),
        kort=(f"<p><b>{m(Cst4)}.</b> Indifferent when {tall(PH, 2)} − C/{tall(N)} = {tall(PHE4, 4)}: "
              f"C = {tall(N)} × ({tall(PH, 2)} − {tall(PHE4, 4)}).</p>"),
        losning=(f"<p>The high type borrows as long as the loan costs its old shareholders less than the dilution "
                 f"from selling underpriced shares. At the limit the two are equal: an indifference condition.</p>"
                 f"<p><b>Step 1: set up the indifference.</b> With the loan the price is {tall(PH, 2)} − C/{tall(N)}; "
                 f"with shares it is {tall(PHE4, 4)}. Set them equal.</p>"
                 f"<p><b>Step 2: solve.</b> C = {tall(N)} × ({tall(PH, 2)} − {tall(PHE4, 4)}) = {tall(N)} × "
                 f"{tall(PH - PHE4, 4)} = <b>{tall(Cst4, 2)}</b> million.</p>"
                 f"<p><b>First check.</b> The same number is the wealth the high type hands to the new investors: "
                 f"{tall(n4, 4)} new shares worth {tall(PHE4, 4)} each, bought for {tall(P0, 2)}, give "
                 f"{tall(n4, 4)} × ({tall(PHE4, 4)} − {tall(P0, 2)}) = {tall(n4 * (PHE4 - P0), 2)}. The two routes "
                 f"agree because the firm's value is only split differently, so this check catches slips, not a "
                 f"wrong model. The actual cost, {tall(C)}, is below the limit, so the high type borrows.</p>"
                 f"<p><b>Remember:</b> an indifference question sets the two payoffs equal and solves for the "
                 f"unknown.</p>"),
        feller=_rens([
            Felle(PH - PHE, "This is a per-share figure, not the total cost in millions."),
            Felle(n * (PH - P0), "You valued each new share at the old high value, as if the issue did not dilute it."),
            Felle(N * (PH - P0), "You valued the dilution as if every old share fell to today's price."),
        ], sv_d),
    )

    e_del = tekst_del(
        "e", poeng=4,
        q=(f"<p>Investors understand these choices. What do they conclude when {fi} announces a share issue? What do "
           f"they conclude when it announces a loan? What happens to the share price in each case? Can the shares "
           f"then be sold at today's price, as assumed in (b)? Use the results to explain the pecking order.</p>"),
        setninger="Answer in at most four sentences.",
        gitt=(f"<p>From (c): the low type issues shares and the high type borrows. With the loan the high type's price "
              f"is {ps(PHD, 4)}.</p>"),
        kort=(f"<p>Only the low type issues shares, so a share issue tells investors the assets are worth {ps(PL)} and "
              f"the price falls from {ps(P0)} to {ps(PL)} at once. A loan reveals the high type, so the price rises "
              f"to {ps(PHD, 4)}. The low type therefore cannot sell at {ps(P0)} after all: it sells at its true value "
              f"and gains nothing from mispricing. Equity is the claim most sensitive to what managers know, so firms "
              f"use internal funds first, then safe debt and equity last: the pecking order.</p>"),
        losning=(f"<p><b>The mechanism.</b> A financing choice is information. Only a firm that knows its shares are "
                 f"overvalued wants to sell them at the average price, so rational investors treat a share issue "
                 f"as bad news about the existing assets and a loan as good news. The price reacts at the "
                 f"announcement, before any money changes hands.</p>"
                 f"<p><b>The prices.</b> Share issue: the price falls from {tall(P0, 2)} to {tall(PL, 2)}. Loan: it "
                 f"rises to {tall(PH, 2)} − {tall(C / N, 4)} = {tall(PHD, 4)}. The premise of (b), that shares can "
                 f"be sold at {tall(P0, 2)}, therefore cannot survive (Check 5): in equilibrium the low type sells at "
                 f"{tall(PL, 2)}, its true value. The high type separates by borrowing.</p>"
                 f"<p><b>Why the loan is a credible signal.</b> It costs {tall(C)} million. Only the high type is "
                 f"willing to pay that to escape a dilution of {tall(Cst4, 2)} million. For the low type the "
                 f"mispricing is a gain, so it never copies the loan.</p>"
                 f"<p><b>The pecking order.</b> Internal funds need no outside investor; safe debt does not depend "
                 f"on what the managers know; equity depends on every {_enhet(cur)} of it. So firms use internal funds, "
                 f"then debt and equity last. Share issues therefore meet negative price reactions on average.</p>"
                 f"<p><b>Typical mistakes:</b> saying the share price falls because the new shares dilute the old "
                 f"ones (a fair-priced issue does not), or that it falls when the shares are sold rather than at the "
                 f"announcement.</p>"
                 f"<p><b>Remember:</b> the price moves on what the financing choice reveals.</p>"),
        kriterier=[
            f"Share issue: only the low type issues shares, so investors conclude the assets are worth {ps(PL)} per "
            f"share and the price falls from {ps(P0)} to {ps(PL)} at the announcement (1 p)",
            f"Loan: only the high type borrows, so the price rises to about {ps(PHD, 2)} at the announcement "
            f"({ps(PH)} less the cost of the loan per share) (1 p)",
            "Answers that the shares cannot be sold at today's price: rational investors will not pay it to an issuer, "
            "so the low type sells at its true value (Check 5) (1 p)",
            "Explains the pecking order with the mechanism: internal funds, then debt, then equity, because equity is "
            "the claim most sensitive to the managers' private information; credit for saying the loan is a credible "
            "signal because it is costly (1 p)",
        ],
    )
    return _ferdig("ov-inf2", ovelse(case, [a_del, b_del, c_del, d_del, e_del]), fi)


# ---------------------------------------------------------------------------
# ov-inf3 · Vinnerens forbannelse og kostnaden ved børsnotering
# ---------------------------------------------------------------------------
INF3 = [
    dict(marked="the Norwegian market for technology IPOs", firma="Lyngen Software ASA", cur="NOK",
         eiere="Its founders hold"),
    dict(marked="the Norwegian market for seafood IPOs", firma="Brattvåg Marine ASA", cur="NOK",
         eiere="Two founding families hold"),
    dict(marked="the Nordic market for renewable-energy IPOs", firma="Skarsvåg Energy ASA", cur="NOK",
         eiere="Its founders and a venture fund hold"),
    dict(marked="the Nordic market for biotech IPOs", firma="Hjelmeland Bio ASA", cur="NOK",
         eiere="Its founders and two venture funds hold"),
    dict(marked="the US market for small-cap software IPOs", firma="Copperleaf Analytics Inc", cur="$",
         eiere="Its founders hold"),
    dict(marked="the US market for medical-device IPOs", firma="Silverline Medical Inc", cur="$",
         eiere="Its founders and a private-equity fund hold"),
    dict(marked="the US market for consumer-brand IPOs", firma="Maplewood Brands Inc", cur="$",
         eiere="Its founding family holds"),
    dict(marked="the US market for fintech IPOs", firma="Harborview Payments Inc", cur="$",
         eiere="Its founders and early employees hold"),
]


@oppgave("ov-inf3", tema="info", tittel="The winner's curse and the cost of an IPO", antall=12,
         sjanger="myers", kilde="Lecture 6 winner's curse, PS2 E2")
def _(r):
    v = _velg("ov-inf3", INF3, r, lambda x: x["firma"])
    cur, fi = v["cur"], v["firma"]
    Vg = r.choice([110, 115, 120, 125, 130, 140, 150])
    Vb = r.choice([60, 70, 75, 80, 85, 90])
    q = r.choice([0.5, 0.5, 0.4, 0.6])
    kg = r.choice([4, 5, 10, 20])
    kb = r.choice([1, 2])
    ng, nb = 100 // kg, 100 // kb
    EV = q * Vg + (1 - q) * Vb
    if abs(EV * 2 - round(EV * 2)) > 1e-9 or Vg - Vb < 30:
        raise Avvis("forventet verdi er ikke pen eller spredningen er for liten")
    # (a) avkastning for uinformert ved pris = forventet verdi
    gevinst = q * ng * (Vg - EV) + (1 - q) * nb * (Vb - EV)
    investert = EV * (q * ng + (1 - q) * nb)
    ret = gevinst / investert
    if ret > -0.03:
        raise Avvis("for liten forbannelse")
    # (b) break-even-pris og snittlig førstedagsavkastning
    Pst = (q * ng * Vg + (1 - q) * nb * Vb) / (q * ng + (1 - q) * nb)
    Pst2 = rund(Pst, 2)
    snitt = EV / Pst - 1
    snitt2 = EV / Pst2 - 1
    _sjekk(snitt2, snitt)
    inf_ret = Vg / Pst - 1
    # (c) en god emisjon: proveny og kostnad for de gamle eierne
    No = r.choice([20, 25, 30, 40, 50])
    Nn = r.choice([5, 8, 10, 12, 15])
    if Nn >= No:
        raise Avvis("for mange nye aksjer")
    brutto, brutto2 = Nn * Pst, Nn * Pst2
    netto, netto2 = 0.93 * brutto, 0.93 * brutto2
    Vpost = (No + Nn) * Vg
    Pfair, Pfair2 = (Vpost - netto) / No, (Vpost - netto2) / No
    kost, kost2 = (Pfair - Vg) * No, (Pfair2 - Vg) * No
    _sjekk(netto2, netto)
    _sjekk(kost2, kost)
    under2 = Nn * (Vg - Pst2)
    gebyr2, andre2 = 0.053 * brutto2, 0.017 * brutto2

    def ps(x, d=2):
        return penger(x, d, cur)

    def m(x, d=2):
        return _m(x, d, cur)

    andel = ("Good and bad IPOs are equally common" if q == 0.5 else
             f"A fraction {tall(q, 2)} of the IPOs are good")
    case = (f"<p>In {v['marked']}, every IPO is either good or bad. The shares of a good IPO are worth "
            f"{ps(Vg, 0)} at the end of the first trading day, those of a bad IPO {ps(Vb, 0)}. {andel}. Informed "
            f"investors know which is which and bid only in good IPOs, so good IPOs are {tall(kg)} times "
            f"oversubscribed. Bad IPOs are "
            + ("not oversubscribed." if kb == 1 else f"{tall(kb)} times oversubscribed.")
            + f" Shares are allocated pro rata to the orders.</p>"
            f"<p>You are an uninformed investor. You order 100 shares in every IPO. Every IPO is offered at the "
            f"same price per share.</p>"
            f"<p>Give prices with two decimals and returns in percent with two decimals.</p>")

    tildel = (f"In a good IPO you receive 100/{tall(kg)} = {tall(ng)} shares, in a bad one "
              + (f"all 100." if kb == 1 else f"100/{tall(kb)} = {tall(nb)}."))
    vekt = (f"Per pair of one good and one bad IPO" if q == 0.5 else
            f"Weighting each kind by its probability")
    a_del = tall_del(
        "a", poeng=3,
        q=(f"<p>Suppose every IPO is offered at the expected first-day value, {ps(EV)} per share. What is your "
           f"average return on the shares you are allocated, in percent?</p>"),
        svar=(sv_a := [T("Your return", ret * 100, "%")]),
        kort=(f"<p><b>{pst(ret, 2)}.</b> {tildel} Profit {tall(gevinst, 2)} on {tall(investert, 2)} invested "
              f"(per IPO, weighted by probability).</p>"),
        losning=(f"<p>Your return depends on the shares you actually receive, not on the IPOs you apply for. "
                 f"Informed investors crowd into the good IPOs, so you are rationed exactly where the profit is.</p>"
                 f"<p><b>Step 1: your allocation.</b> {tildel}</p>"
                 f"<p><b>Step 2: profit and money invested per IPO.</b> {vekt}: profit {tall(q, 2)} × {tall(ng)} × "
                 f"({tall(Vg)} − {tall(EV, 2)}) + {tall(1 - q, 2)} × {tall(nb)} × ({tall(Vb)} − {tall(EV, 2)}) = "
                 f"{tall(gevinst, 2)}. Money invested {tall(EV, 2)} × ({tall(q, 2)} × {tall(ng)} + "
                 f"{tall(1 - q, 2)} × {tall(nb)}) = {tall(investert, 2)}.</p>"
                 f"<p><b>Step 3: the return.</b> {tall(gevinst, 2)}/{tall(investert, 2)} = <b>{pst(ret, 2)}</b>. "
                 f"At this price an uninformed investor loses money and stays away.</p>"
                 f"<p><b>First check.</b> The average first-day return across IPOs is {tall(q, 2)} × "
                 f"({tall(Vg)}/{tall(EV, 2)} − 1) + {tall(1 - q, 2)} × ({tall(Vb)}/{tall(EV, 2)} − 1) = 0, since the "
                 f"price is the expected value. Your return is negative only because of the allocation, which is "
                 f"the winner's curse.</p>"
                 f"<p><b>Remember:</b> weight each IPO by the shares you receive in it.</p>"),
        feller=_rens([
            Felle(0.0, "This is the average return across IPOs, not the return on the shares you are allocated."),
            Felle((q * nb * (Vg - EV) + (1 - q) * ng * (Vb - EV)) / (EV * (q * nb + (1 - q) * ng)) * 100,
                  "You swapped the allocations between good and bad IPOs."),
            Felle(gevinst / (100 * EV) * 100, "You divided the profit by the money for the 100 shares you ordered, not "
                                              "for the shares you were allocated."),
        ], sv_a),
    )

    b_del = tall_del(
        "b", poeng=4,
        q=("<p>At what offer price per share do you just break even? If all IPOs are offered at that price, what is "
           "the average first-day return across all IPOs, in percent?</p>"),
        selvstendig=True,
        svar=(sv_b := [T("Break-even price", Pst, f"{cur} per share"),
                       T("Average first-day return", snitt * 100, "%")]),
        kort=(f"<p><b>{ps(Pst2)} and {pst(snitt2, 2)}.</b> P = ({tall(q, 2)} × {tall(ng)} × {tall(Vg)} + "
              f"{tall(1 - q, 2)} × {tall(nb)} × {tall(Vb)})/({tall(q, 2)} × {tall(ng)} + {tall(1 - q, 2)} × "
              f"{tall(nb)}); average = {tall(EV, 2)}/{tall(Pst2, 2)} − 1.</p>"),
        losning=(f"<p>To keep uninformed investors in the market, the issuer must price the shares so that they "
                 f"break even on what they are actually allocated. That price is the allocation-weighted average "
                 f"value, below the plain expected value.</p>"
                 f"<p><b>Step 1: break even.</b> {tall(q, 2)} × {tall(ng)} × ({tall(Vg)} − P) + {tall(1 - q, 2)} × "
                 f"{tall(nb)} × ({tall(Vb)} − P) = 0, so P = {tall(q * ng * Vg + (1 - q) * nb * Vb, 2)}/"
                 f"{tall(q * ng + (1 - q) * nb, 2)} = <b>{ps(Pst2)}</b>.</p>"
                 f"<p><b>Step 2: the first-day returns.</b> Good IPOs: {tall(Vg)}/{tall(Pst2, 2)} − 1 = "
                 f"{pst(Vg / Pst2 - 1, 2)}. Bad IPOs: {tall(Vb)}/{tall(Pst2, 2)} − 1 = {pst(Vb / Pst2 - 1, 2)}. "
                 f"Across IPOs: {tall(q, 2)} × {pst(Vg / Pst2 - 1, 2)} + {tall(1 - q, 2)} × "
                 f"({pst(Vb / Pst2 - 1, 2)}) = <b>{pst(snitt2, 2)}</b>.</p>"
                 f"<p><b>First check.</b> At {tall(Pst2, 2)} your profit is {tall(ng)} × ({tall(Vg)} − "
                 f"{tall(Pst2, 2)}) = {tall(ng * (Vg - Pst2), 2)} in a good IPO and {tall(nb)} × ({tall(Vb)} − "
                 f"{tall(Pst2, 2)}) = {tall(nb * (Vb - Pst2), 2)} in a bad one; weighted by "
                 f"{tall(q, 2)} and {tall(1 - q, 2)} they sum to zero up to rounding. It rearranges the same "
                 f"equation, so it only catches slips.</p>"
                 f"<p><b>Remember:</b> the average first-day return is what an observer measures as underpricing; "
                 f"the uninformed investor earns nothing.</p>"),
        feller=_rens([
            Felle(EV, "You used the plain expected value, which ignores how the shares are allocated.", i=0),
            Felle((q * nb * Vg + (1 - q) * ng * Vb) / (q * nb + (1 - q) * ng),
                  "You swapped the allocation weights between good and bad IPOs.", i=0),
            Felle(Vb, "At the bad value you never lose: that is more underpricing than you need to take part.", i=0),
            Felle(0.0, "This is your own return at the break-even price, not the average across IPOs.", i=1),
            Felle(inf_ret * 100, "This is the return on the good IPOs only, which is what informed investors earn.", i=1),
            Felle((1 - Pst / EV) * 100, "You measured the discount to the expected value, not a return from the offer "
                                        "price.", i=1),
        ], sv_b),
    )

    c_del = tall_del(
        "c", poeng=5,
        q=(f"<p>{fi} is one of the good IPOs and is offered at the break-even price. {v['eiere']} "
           f"{tall(No)} million shares. It sells {tall(Nn)} million new shares. The underwriting fee is 5.3% of "
           f"the gross proceeds and other direct costs are 1.7%. The shares close at {ps(Vg, 0)} on the first day, "
           f"which is their fair value. What are {gen(fi)} net proceeds, in millions? What is the total cost of the "
           f"IPO to the original owners, in millions, compared with raising the same net proceeds at the fair price "
           f"with no costs?</p>"),
        gitt=f"<p>From (b): the break-even offer price is {ps(Pst2)} per share.</p>",
        svar=(sv_c := [T("Net proceeds", netto, f"{cur} million"),
                       T("Cost to the original owners", kost, f"{cur} million")]),
        kort=(f"<p><b>Net {m(netto2)}; cost {m(kost2)}.</b> Net = {tall(Nn)} × {tall(Pst2, 2)} × 0.93. Fair price "
              f"= ({tall(Vpost)} − {tall(netto2, 2)})/{tall(No)} = {tall(Pfair2, 4)}; cost = ({tall(Pfair2, 4)} − "
              f"{tall(Vg)}) × {tall(No)}.</p>"),
        losning=(f"<p>The firm receives the offer price less the costs. The first-day price shows what the new shares "
                 f"were really worth. Both the costs and the underpricing fall on the original owners, the costs in "
                 f"cash and the underpricing in shares.</p>"
                 f"<p><b>Step 1: proceeds.</b> Gross {tall(Nn)} × {tall(Pst2, 2)} = {tall(brutto2, 2)}. Fee "
                 f"{tall(gebyr2, 2)} and other costs {tall(andre2, 2)}, so net = <b>{tall(netto2, 2)}</b>.</p>"
                 f"<p><b>Step 2: the fair price.</b> After the IPO the firm is worth {tall(No + Nn)} × {tall(Vg)} = "
                 f"{tall(Vpost)}. Without the net cash it brought in, the old shares are worth "
                 f"({tall(Vpost)} − {tall(netto2, 2)})/{tall(No)} = {tall(Pfair2, 4)} each.</p>"
                 f"<p><b>Step 3: the cost.</b> Each old share is worth {tall(Vg)} instead of {tall(Pfair2, 4)}: "
                 f"({tall(Pfair2, 4)} − {tall(Vg)}) × {tall(No)} = <b>{tall(kost2, 2)}</b>.</p>"
                 f"<p><b>First check.</b> Money left on the table {tall(Nn)} × ({tall(Vg)} − {tall(Pst2, 2)}) = "
                 f"{tall(under2, 2)} plus direct costs {tall(gebyr2 + andre2, 2)} gives "
                 f"{tall(under2 + gebyr2 + andre2, 2)}, the same total. The two routes are one identity, so the "
                 f"check catches slips; it also shows that the underpricing is the larger part.</p>"
                 f"<p><b>Remember:</b> the visible fee is the small part of what an IPO costs the old owners.</p>"),
        feller=_rens([
            Felle(brutto, "You took the gross proceeds, before the fee and the other costs.", i=0),
            Felle(0.947 * brutto, "You subtracted only the underwriting fee, not the other direct costs.", i=0),
            Felle(0.93 * Nn * Vg, "You used the first-day price for the shares the firm sells.", i=0),
            Felle(Nn * (Vg - Pst), "You counted only the underpricing, not the fee and the other costs.", i=1),
            Felle(0.07 * brutto, "You counted only the direct costs, not the money left on the table.", i=1),
            Felle((Pfair - Vg) * (No + Nn), "You multiplied the loss per share by all shares after the IPO, including "
                                            "the new investors' shares.", i=1),
        ], sv_c),
    )

    d_del = tekst_del(
        "d", poeng=4,
        q=("<p>Explain why IPOs are underpriced on average even though uninformed investors earn nothing. Who gains "
           "from the underpricing and who pays for it? Name one other explanation of underpricing that Kurbatov "
           "lists.</p>"),
        setninger="Answer in at most four sentences.",
        gitt=(f"<p>From (a) and (b): at the expected value your return is {pst(ret, 2)}; the break-even price is "
              f"{ps(Pst2)}, which gives an average first-day return of {pst(snitt2, 2)}.</p>"),
        kort=(f"<p>Informed investors bid only for good IPOs, so an uninformed investor is rationed in the good ones and "
              f"filled in the bad ones: at the expected value the investor earns {pst(ret, 2)}. To keep such investors in the "
              f"market, issuers must price at about {ps(Pst2)}, which makes the average first-day return "
              f"{pst(snitt2, 2)} while uninformed investors only break even and informed investors earn "
              f"{pst(Vg / Pst2 - 1, 2)} on good issues. The original owners of the issuing firms pay for it. Another "
              f"explanation is control: excess demand lets the firm pick a dispersed owner base that will not "
              f"interfere with management.</p>"),
        losning=(f"<p><b>The mechanism.</b> This is the winner's curse. When you get a large allocation it is "
                 f"because the informed investors stayed away, which is bad news about the issue. Priced at the "
                 f"expected value, IPOs give uninformed investors a negative return ({pst(ret, 2)} here), so they would "
                 f"leave. The price must fall to the level where they break even, {ps(Pst2)}. At that price the "
                 f"IPOs on average jump {pst(snitt2, 2)} on the first day. The underpricing is the price of keeping "
                 f"uninformed money in the market. Informed investors collect it, {pst(Vg / Pst2 - 1, 2)} on the good "
                 f"issues. The original owners of good firms pay it, as in (c).</p>"
                 f"<p><b>Kurbatov's other explanations.</b> Investment-bank conflicts: the underwriter hands cheap "
                 f"shares to favoured clients and the owners pay (Kurbatov doubts this one). Control: excess demand "
                 f"lets the firm choose a dispersed owner base that will not interfere. Behavioural: over-optimistic "
                 f"investors bid up the first-day price, a story weakened by the fact that prices do not fall back "
                 f"after day one. Also accepted: under a firm commitment the underwriter must buy unsold shares, so "
                 f"a low price insures it against a flop.</p>"
                 f"<p><b>Typical mistakes:</b> saying the uninformed investor earns the average first-day return, or "
                 f"naming a theory without its mechanism.</p>"
                 f"<p><b>Remember:</b> underpricing pays uninformed investors for being stuck with the bad issues.</p>"),
        kriterier=[
            f"Explains the allocation: informed investors bid only in good IPOs, so an uninformed investor is rationed "
            f"in good issues and filled in bad ones and loses at the expected value ({pst(ret, 2)}) (1 p)",
            f"States that issuers must underprice until uninformed investors break even ({ps(Pst2)}), which makes the "
            f"average first-day return positive ({pst(snitt2, 2)}) (1 p)",
            "Says who gains and who pays: informed investors earn the underpricing on good issues while the original "
            "owners of the issuing firms bear it (1 p)",
            "Names one other explanation with its mechanism: investment-bank conflicts, control over the owner base, "
            "behavioural over-optimism, or insurance for the underwriter under a firm commitment (1 p)",
        ],
    )
    return _ferdig("ov-inf3", ovelse(case, [a_del, b_del, c_del, d_del]), fi)
