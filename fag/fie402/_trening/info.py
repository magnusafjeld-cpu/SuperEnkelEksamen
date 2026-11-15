# -*- coding: utf-8 -*-
"""Eksamenstrening FIE402: asymmetrisk informasjon og emisjoner (tema «info»).

   Familier (regnespørsmål med tallsvar):
     inf-alf1  andelen α (eller antall nye aksjer) når begge typer utsteder
     inf-iss1  utstedelsesbeslutningen: endringen i de gamle eiernes formue
     inf-eqm1  likevekten med kontroll 5: α i pooling eller separering
     inf-ann1  kursreaksjonen ved kunngjøring av en emisjon (SEO)
     inf-ipo1  IPO: netto proveny etter 5,3 % honorar og 1,7 % andre kostnader,
               rettferdig pris og kostnaden for de gamle eierne (PS2 E2)
     inf-win1  vinnerens forbannelse: uinformert avkastning, break-even-pris
               og gjennomsnittlig førstedagsavkastning (forelesning 6, s. 24–27)

   Statiske spørsmål inf-s01 … inf-s20: pooling og separering, hakkeorden,
   kursfall ved SEO, finansiell slakk, sertifisering, gjeld i stedet,
   tegningsretter, teoriene for underprising, svak langsiktig avkastning,
   greenshoe, kostnader ved børsnotering og dual-class.

   Kilder: forfatterspek § 9.2c og § 9.4, kj6, forelesning 6 (lecture_6.pdf),
   PS2 E1–E2 og docs/fie402-forelesninger-2026.md (A11, A12, B10, D9).
"""
from trening_lib import *  # noqa: F401,F403


FIRMA = ["Tindefjell", "Brekkvik Data", "Solheim Bio", "Kvernes Marine", "Ravnås Media", "Lauvsnes Energi",
         "Hovden Software", "Saltnes Fiber", "Vardø Robotics", "Granli Foods"]


def _p(x, d=2):
    """En brøk vist i prosent: 0.13325 → «13.33%»."""
    return pst(x, d)


def _ev(q, VH, VL):
    """E[V] ved pooling. Avviser når den ikke er et helt tall, så brøkene i fasiten blir eksakte."""
    ev = q * VH + (1 - q) * VL
    if abs(ev - round(ev)) > 1e-9:
        raise Avvis("E[V] er ikke et helt tall")
    return round(ev)


# ---------------------------------------------------------------------------
# inf-alf1 · Andelen α eller antall nye aksjer når begge typer utsteder
# ---------------------------------------------------------------------------
@familie("inf-alf1", tema="info", antall=5, tittel="The stake new investors need when both types issue",
         hjelp=hjelp3(
             "This is the pricing step in Myers-Majluf. New investors buy a stake and must break even under what "
             "they believe. You need that stake, or the number of new shares it means.",
             "α = I / (E[V | beliefs] + I + NPV). When both types issue, E[V | beliefs] = qV<sub>H</sub> + "
             "(1 − q)V<sub>L</sub>. The new holders own n/(N + n) = α of the shares.",
             "<p><b>Step 1: the belief.</b> Both types issue, so investors value the assets in place at the "
             "probability-weighted average of the two values.</p>"
             "<p><b>Step 2: the firm after the issue, in their eyes.</b> Add the cash they pay in and the NPV of the "
             "project.</p>"
             "<p><b>Step 3: the stake.</b> Divide the money raised by that value. For shares, solve n/(N + n) = α "
             "for n.</p>"
             "<p><b>Watch out:</b> the cash raised belongs in the denominator. What the manager knows does not "
             "enter the price, because investors cannot see it.</p>",
         ))
def _(r):
    navn = r.choice(FIRMA)
    VH = r.choice([240, 280, 300, 360, 400])
    VL = r.choice([80, 100, 120, 160])
    q = r.choice([0.25, 0.4, 0.5, 0.6, 0.75])
    I = r.choice([40, 50, 60, 75, 80])
    npv = r.choice([10, 12, 15, 20, 25])
    EV = _ev(q, VH, VL)
    D = EV + I + npv
    aksjer = r.random() < 0.5

    a = I / D
    a_noI = I / (EV + npv)
    a_noN = I / (EV + I)
    a_true = I / (VH + I + npv)

    intro = (f"<p>{navn} has assets in place worth NOK {VH} million or NOK {VL} million. Investors put probability "
             f"{tall(q, 2)} on the higher value; the manager knows the assets are worth NOK {VH} million. A project "
             f"with a publicly known NPV of NOK {npv} million needs NOK {I} million, which can only be raised by "
             f"issuing new shares. Investors believe the firm issues whatever its assets are worth. They are "
             f"competitive and risk neutral and there is no discounting.")
    ev_tekst = f"{tall(q, 2)} × {VH} + {tall(1 - q, 2)} × {VL} = {EV}"

    if not aksjer:
        ulike(a, a_noI, a_noN, a_true, rel=0.02)
        q_tekst = (intro + "</p><p>What fraction α of the firm after the issue must the new investors receive? Give "
                   "four decimals.</p>")
        alternativer = [
            R(tall(a, 4), a),
            F(tall(a_noI, 4),
              f"The cash raised left out of the denominator: {I}/({EV} + {npv}). The new investors pay NOK {I} million "
              f"into the firm, so the firm they buy into is worth that much more and a smaller stake breaks them "
              f"even.", a_noI),
            F(tall(a_noN, 4),
              f"The NPV left out: {I}/({EV} + {I}). The NPV is public, so investors know the project adds it to the "
              f"firm they buy into.", a_noN),
            F(tall(a_true, 4),
              f"Priced at the manager's value: {I}/({VH} + {I} + {npv}). Investors cannot see what the manager knows. "
              f"They price off their belief, which is the average over both types.", a_true),
        ]
        kort = (f"<p><b>{tall(a, 4)}.</b> E[V | issue] = {ev_tekst}. α = {I}/({EV} + {I} + {npv}) = {I}/{D} = "
                f"{tall(a, 4)}.</p>")
        steg3 = (f"<p><b>Step 3: the stake.</b> α = {I}/{D} = <b>{tall(a, 4)}</b>.</p>"
                 f"<p><b>First check.</b> In the investors' eyes the stake is worth {tall(a, 4)} × {D} = "
                 f"{tall(a * D, 2)}, the cash they paid. That is how α was defined, so this check is an identity: it "
                 f"catches arithmetic slips only. The real test comes next in an exam: does the high type still want "
                 f"to issue at this price? That is check 5.</p>")
        tall_ut = tallsvar()
    else:
        N = r.choice([10, 20, 25, 40, 50])
        n = I * N / (EV + npv)
        f_aN = a * N
        f_pre = I * N / EV
        f_true = I * N / (VH + npv)
        ulike(n, f_aN, f_pre, f_true, rel=0.02)
        q_tekst = (intro + f" {navn} has {N} million shares outstanding.</p><p>How many new shares must it issue, in "
                   f"millions? Give four decimals.</p>")
        alternativer = [
            R(f"{tall(n, 4)} million", n),
            F(f"{tall(f_aN, 4)} million",
              f"α times the old share count, {N} million. The new shares are themselves part of the share count after "
              f"the issue, so they must make up the fraction α of the total, not α of the old count.", f_aN),
            F(f"{tall(f_pre, 4)} million",
              f"The shares priced off the assets in place alone, NOK {EV} million over {N} million shares. Investors "
              f"know the firm will take the project, so its NPV is in the price they pay.", f_pre),
            F(f"{tall(f_true, 4)} million",
              f"Priced at the manager's value of NOK {VH} million. Investors cannot see it, so they pay the price "
              f"their belief supports.", f_true),
        ]
        P = D / (N + n)
        kort = (f"<p><b>{tall(n, 4)} million.</b> E[V | issue] = {EV}, so α = {I}/{D} = {tall(a, 4)}. n/({N} + n) = "
                f"α gives n = {I} × {N}/({EV} + {npv}) = {tall(n, 4)} million.</p>")
        steg3 = (f"<p><b>Step 3: the stake as shares.</b> α = {I}/{D} = {tall(a, 4)}. The new holders must own that "
                 f"fraction of all shares: n/({N} + n) = α, so n = αN/(1 − α) = {I} × {N}/({EV} + {npv}) = "
                 f"<b>{tall(n, 4)} million</b>.</p>"
                 f"<p><b>First check.</b> The price after the issue is {D}/({N} + {tall(n, 4)}) = {tall(P, 4)}. Then "
                 f"{tall(n, 4)} × {tall(P, 4)} = {tall(n * P, 2)}, the money raised. This is an identity, so it catches "
                 f"arithmetic slips only.</p>")
        tall_ut = tallsvar(enhet="million shares")

    full = (
        f"<p><b>What the stake is.</b> New investors cannot see what the manager knows. They pay a fair price for "
        f"the firm they think they are buying into: the assets in place at their expected value, plus the cash they "
        f"bring, plus the NPV of the project. Their stake α is the money they put in divided by that value.</p>"
        f"<p><b>Step 1: the belief.</b> Both types issue, so the issue says nothing about the type: E[V | issue] = "
        f"{ev_tekst}.</p>"
        f"<p><b>Step 2: the firm after the issue.</b> {EV} + {I} + {npv} = {D}. The cash is in the firm once it is "
        f"raised. The project adds its NPV.</p>"
        + steg3 +
        f"<p><b>Remember:</b> α = I/(E[V | beliefs] + I + NPV): beliefs in the price, the cash raised in the "
        f"denominator.</p>"
    )
    return sporsmal(q_tekst, alternativer, kort, full, tall=tall_ut)


# ---------------------------------------------------------------------------
# inf-iss1 · Utstedelsesbeslutningen: endringen i de gamle eiernes formue
# ---------------------------------------------------------------------------
@familie("inf-iss1", tema="info", antall=5, tittel="Does the manager issue? The change in the old owners' wealth",
         hjelp=hjelp3(
             "This is the issue decision in Myers-Majluf. The manager acts for the old shareholders and knows the "
             "true value. You need how much issuing changes their wealth.",
             "α = I/(E[V | beliefs] + I + NPV). If the firm issues, the old shareholders keep (1 − α)(V<sub>true</sub> + "
             "I + NPV). If not, they keep V<sub>true</sub>, because the project is lost. The change equals NPV − "
             "α(V<sub>true</sub> − E[V | beliefs]).",
             "<p><b>Step 1: price the issue.</b> Use the investors' belief, not the true value, to find α.</p>"
             "<p><b>Step 2: the payoff from issuing.</b> The old shareholders keep 1 − α of the true firm after the "
             "issue: the true assets, the cash raised and the NPV.</p>"
             "<p><b>Step 3: compare with not issuing.</b> Without the issue the project is lost, so the alternative is "
             "the true value of the assets alone.</p>"
             "<p><b>Watch out:</b> the NPV is not part of the alternative. And α comes from beliefs, never from the "
             "true value.</p>",
         ))
def _(r):
    navn = r.choice(FIRMA)
    VH = r.choice([250, 300, 320, 360, 400, 450])
    VL = r.choice([100, 120, 150, 180])
    q = r.choice([0.4, 0.5, 0.6])
    I = r.choice([50, 60, 80, 100])
    npv = r.choice([10, 15, 20, 25, 30])
    EV = _ev(q, VH, VL)
    D = EV + I + npv
    hoy = r.random() < 0.7
    V = VH if hoy else VL

    a = I / D
    payoff = (D - I) / D * (V + I + npv)
    dV = payoff - V
    if abs(dV) < 1.5:
        raise Avvis("for nær likegyldighet")
    f_vnpv = dV - npv                                       # sammenlignet med V + NPV
    a_noI = I / (EV + npv)
    f_noI = (1 - a_noI) * (V + I + npv) - V                 # α uten I
    f_fair = npv                                            # priset til sann verdi
    ulike(dV, f_vnpv, f_noI, f_fair, rel=0.02)

    hva = "issues" if dV > 0 else "does not issue"
    q_tekst = (f"<p>{navn} has assets in place worth NOK {VH} million or NOK {VL} million. Investors put probability "
               f"{tall(q, 2)} on the higher value; the manager knows the assets are worth NOK {V} million. A project "
               f"with a publicly known NPV of NOK {npv} million needs NOK {I} million. It can only be raised by issuing "
               f"new shares and without the issue the project is lost. Investors believe the firm issues whatever its "
               f"assets are worth. They are competitive and risk neutral and there is no discounting. The manager acts "
               f"for the existing shareholders.</p>"
               f"<p>Measured at the true value, by how much does issuing and investing change the existing "
               f"shareholders' wealth compared with not issuing, in NOK million?</p>")
    alternativer = [
        R(tall(dV, 2), dV),
        F(tall(f_vnpv, 2),
          f"The payoff compared with {V} + {npv}, the true assets plus the NPV. Without the issue the project is lost, "
          f"so the old shareholders' alternative is the true value of the assets alone.", f_vnpv),
        F(tall(f_noI, 2),
          f"α computed without the cash raised: {I}/({EV} + {npv}) = {tall(a_noI, 4)}. That stake is too large, so "
          f"the dilution is overstated.", f_noI),
        F(tall(f_fair, 2),
          f"This is the NPV, what the old shareholders would gain if the shares were sold at their true value. "
          f"Investors price off their belief, so the shares are sold at the average and the manager's type gains or "
          f"loses from that.", f_fair),
    ]
    kort = (f"<p><b>{tall(dV, 2)}, so the manager {hva}.</b> α = {I}/({EV} + {I} + {npv}) = {I}/{D}. Payoff "
            f"({D - I}/{D}) × ({V} + {I} + {npv}) = {tall(payoff, 2)} against {V} without the issue.</p>")
    rett = "above" if dV > 0 else "below"
    full = (
        f"<p><b>Why a good project can be turned down.</b> Investors cannot tell the two types apart, so they buy "
        f"shares from both at a price based on the average. A firm worth more than the average sells its shares too "
        f"cheaply: that is dilution. It still issues if the NPV outweighs the dilution. A firm worth less than the "
        f"average sells overpriced shares and gains twice.</p>"
        f"<p><b>Step 1: price the issue at the belief.</b> E[V | issue] = {tall(q, 2)} × {VH} + {tall(1 - q, 2)} × "
        f"{VL} = {EV}. α = {I}/({EV} + {I} + {npv}) = {I}/{D} = {tall(a, 4)}.</p>"
        f"<p><b>Step 2: the payoff from issuing, at the true value.</b> The true firm after the issue is {V} + {I} + "
        f"{npv} = {V + I + npv}. The old shareholders keep ({D - I}/{D}) × {V + I + npv} = {tall(payoff, 2)}.</p>"
        f"<p><b>Step 3: compare with not issuing.</b> {tall(payoff, 2)} − {V} = <b>{tall(dV, 2)}</b>, {rett} zero, "
        f"so the manager {hva}.</p>"
        f"<p><b>First check.</b> The change is the NPV minus the dilution: {npv} − ({I}/{D}) × ({V} − {EV}) = "
        f"{tall(npv - a * (V - EV), 2)}. This is the same equation rearranged, so it catches arithmetic slips only. "
        f"It does show why: the dilution term is {tall(a * (V - EV), 2)}.</p>"
        f"<p><b>Remember:</b> issue if (1 − α)(V<sub>true</sub> + I + NPV) beats V<sub>true</sub>, that is if the NPV "
        f"exceeds α(V<sub>true</sub> − E[V | beliefs]).</p>"
    )
    return sporsmal(q_tekst, alternativer, kort, full, tall=tallsvar(enhet="NOK million", rel=0.001, abs=0.01))


# ---------------------------------------------------------------------------
# inf-eqm1 · Likevekten med kontroll 5: α i pooling eller separering
# ---------------------------------------------------------------------------
@familie("inf-eqm1", tema="info", antall=5, tittel="Check 5: the stake in the equilibrium",
         hjelp=hjelp3(
             "This is check 5 in Myers-Majluf. An equilibrium needs beliefs that match what each type does. You need "
             "the stake new investors receive in that equilibrium.",
             "Pooling: E[V | issue] = qV<sub>H</sub> + (1 − q)V<sub>L</sub>. Separating: E[V | issue] = V<sub>L</sub>. "
             "α = I/(E[V | issue] + I + NPV). The high type issues if NPV ≥ α(V<sub>H</sub> − E[V | issue]).",
             "<p><b>Step 1: start from pooling.</b> Price the issue as if both types issue.</p>"
             "<p><b>Step 2: check the high type.</b> Compare its dilution at that price with the NPV. The low type "
             "always issues, since it sells overpriced or fairly priced shares.</p>"
             "<p><b>Step 3: if the high type stays out, reprice.</b> Only the low type issues, so an issue reveals it. "
             "Price at its value and confirm that the high type still stays out.</p>"
             "<p><b>Watch out:</b> stopping at the pooling price without the check, or jumping to separating without "
             "showing that pooling fails.</p>",
         ))
def _(r):
    navn = r.choice(FIRMA)
    VH = r.choice([200, 240, 300, 360, 400, 500])
    VL = r.choice([100, 120, 150, 160, 200])
    if VL >= VH:
        raise Avvis("V_L må være lavere")
    q = r.choice([0.25, 0.4, 0.5, 0.6])
    I = r.choice([40, 50, 60, 80, 100])
    npv = r.choice([10, 15, 20, 25, 30, 40])
    EV = _ev(q, VH, VL)
    vil_pool = r.random() < 0.6

    Dp, Ds = EV + I + npv, VL + I + npv
    a_p, a_s = I / Dp, I / Ds
    dil_p = a_p * (VH - EV)
    dil_s = a_s * (VH - VL)
    pool_ok = npv >= dil_p + 1
    pool_nei = npv <= dil_p - 1
    sep_ok = npv <= dil_s - 1
    sep_nei = npv >= dil_s + 1
    if vil_pool and not (pool_ok and sep_nei):
        raise Avvis("ikke entydig pooling")
    if not vil_pool and not pool_nei:
        raise Avvis("ikke klar separering")
    if not vil_pool and not sep_ok:
        raise Avvis("separering ikke klar")

    if vil_pool:
        a = a_p
        f1 = (a_s, f"This is the separating price, {I}/({VL} + {I} + {npv}). You assumed only the low type issues "
                   f"without first checking whether the high type would issue at the pooling price.")
        f2 = (I / (EV + npv), f"The pooling belief without the cash raised: {I}/({EV} + {npv}). The new investors' "
                              f"money is part of the firm they buy into.")
        f3 = (I / (EV + I), f"The pooling belief without the NPV: {I}/({EV} + {I}). The project's NPV is public and "
                            f"belongs in the value investors buy into.")
    else:
        a = a_s
        f1 = (a_p, f"This is the pooling price, {I}/({EV} + {I} + {npv}). You stopped before check 5: a price is "
                   f"only an equilibrium if the high type actually issues at it.")
        f2 = (I / (VL + npv), f"The low type's value without the cash raised: {I}/({VL} + {npv}). The new investors' "
                              f"money is part of the firm they buy into.")
        f3 = (I / (VH + I + npv), f"Priced at the high type's value: {I}/({VH} + {I} + {npv}). The high type is the "
                                  f"one that stays out, so an issue tells investors the firm is the low type.")
    ulike(a, f1[0], f2[0], f3[0], rel=0.02)

    q_tekst = (f"<p>{navn} has assets in place worth NOK {VH} million or NOK {VL} million. Investors put probability "
               f"{tall(q, 2)} on the higher value; the manager knows the true value and acts for the existing "
               f"shareholders. A project with a publicly known NPV of NOK {npv} million needs NOK {I} million, which "
               f"can only be raised by issuing new shares. Without the issue the project is lost. Investors are "
               f"competitive and risk neutral and there is no discounting.</p>"
               f"<p>Find the equilibrium, in which investors' beliefs are rational. What fraction α of the firm after the "
               f"issue do the new investors receive in it? Give four decimals.</p>")
    alternativer = [R(tall(a, 4), a)] + [F(tall(v, 4), t, v) for v, t in (f1, f2, f3)]

    pool_tekst = (f"<p><b>Step 1: start from pooling.</b> E[V | issue] = {tall(q, 2)} × {VH} + {tall(1 - q, 2)} × "
                  f"{VL} = {EV}, so α = {I}/({EV} + {I} + {npv}) = {I}/{Dp} = {tall(a_p, 4)}.</p>"
                  f"<p><b>Step 2: does the high type issue?</b> Its dilution is α(V<sub>H</sub> − E[V]) = "
                  f"{tall(a_p, 4)} × ({VH} − {EV}) = {tall(dil_p, 2)}")
    if vil_pool:
        kort = (f"<p><b>{tall(a, 4)}: pooling.</b> α = {I}/({EV} + {I} + {npv}) = {I}/{Dp}. The high type's dilution "
                f"{tall(dil_p, 2)} is below the NPV of {npv}, so both types issue and the belief holds.</p>")
        midt = (pool_tekst + f", below the NPV of {npv}. It issues. The low type issues too, so the belief that both "
                f"issue is rational: <b>{tall(a, 4)}</b>.</p>"
                f"<p><b>Step 3: is separating an equilibrium too?</b> At the separating price {I}/{Ds} = "
                f"{tall(a_s, 4)} the high type's dilution would be {tall(a_s, 4)} × ({VH} − {VL}) = "
                f"{tall(dil_s, 2)}, still below {npv}. It would issue, so the belief that only the low type issues "
                f"cannot hold. Pooling is the only equilibrium.</p>"
                f"<p><b>What it costs.</b> Nothing is lost: both types invest. The high type's old shareholders "
                f"transfer value to the low type's through the new investors, who break even on average.</p>")
    else:
        hoy_s = (Ds - I) / Ds * (VH + I + npv)
        kort = (f"<p><b>{tall(a, 4)}: separating.</b> At pooling the high type's dilution {tall(dil_p, 2)} exceeds "
                f"the NPV of {npv}, so it stays out. Only the low type issues: α = {I}/({VL} + {I} + {npv}) = "
                f"{I}/{Ds}.</p>")
        midt = (pool_tekst + f", above the NPV of {npv}. It stays out, so the belief that both issue is not "
                f"rational (check 5).</p>"
                f"<p><b>Step 3: reprice at separating.</b> Only the low type issues, so E[V | issue] = {VL} and α = "
                f"{I}/({VL} + {I} + {npv}) = {I}/{Ds} = <b>{tall(a, 4)}</b>. The low type keeps ({Ds - I}/{Ds}) × {Ds} "
                f"= {Ds - I} = {VL} + {npv}, more than {VL}, so it issues. The high type would keep ({Ds - I}/{Ds}) × "
                f"{VH + I + npv} = {tall(hoy_s, 2)}, less than {VH}, so it stays out. Both act as the belief "
                f"says.</p>"
                f"<p><b>What it costs.</b> The high type's project is never undertaken: an expected loss of q × NPV = "
                f"{tall(q, 2)} × {npv} = {tall(q * npv, 2)}. That is underinvestment, the same family as debt "
                f"overhang.</p>")
    full = (
        f"<p><b>What an equilibrium needs.</b> Investors set the price from what they believe about who issues. "
        f"The belief must then match what each type actually does at that price. That is check 5. A belief that the "
        f"behaviour contradicts cannot be the equilibrium.</p>"
        + midt +
        f"<p><b>Remember:</b> price at pooling, check the high type and reprice at V<sub>L</sub> only if the high type "
        f"stays out. Then verify both types.</p>"
    )
    return sporsmal(q_tekst, alternativer, kort, full, tall=tallsvar())


# ---------------------------------------------------------------------------
# inf-ann1 · Kursreaksjonen ved kunngjøring av en emisjon
# ---------------------------------------------------------------------------
@familie("inf-ann1", tema="info", antall=5, tittel="The price reaction when an equity issue is announced",
         hjelp=hjelp3(
             "This is the price reaction to an equity issue. Find who issues in equilibrium, then compare the value "
             "of the old shares before and after the announcement.",
             "Before: P<sub>pre</sub> = q × (value of the old shares if high) + (1 − q) × (value if low), each given "
             "what that type does. After: the value of the type the issue reveals. Return = "
             "P<sub>post</sub>/P<sub>pre</sub> − 1.",
             "<p><b>Step 1: the equilibrium.</b> Price at pooling and check whether the high type issues (check 5).</p>"
             "<p><b>Step 2: each type's value to the old shareholders.</b> A type that stays out keeps its assets. A "
             "type revealed by its issue sells at a fair price and keeps its assets plus the NPV.</p>"
             "<p><b>Step 3: the price before.</b> Weight the two values by the probabilities.</p>"
             "<p><b>Step 4: the price after.</b> The issue reveals the type, so the price jumps to that type's value.</p>"
             "<p><b>Watch out:</b> the low type's NPV is already in the price before the announcement.</p>",
         ))
def _(r):
    navn = r.choice(FIRMA)
    VH = r.choice([300, 360, 400, 450, 500])
    VL = r.choice([100, 120, 150, 180, 200])
    q = r.choice([0.25, 0.4, 0.5, 0.6])
    I = r.choice([50, 60, 80, 100])
    npv = r.choice([15, 10, 20, 12, 25])
    EV = _ev(q, VH, VL)
    a_p = I / (EV + I + npv)
    dil_p = a_p * (VH - EV)
    if not dil_p > npv + 1:
        raise Avvis("pooling holder")

    pre = q * VH + (1 - q) * (VL + npv)
    post = VL + npv
    ret = post / pre - 1
    f_prior = post / EV - 1
    f_post = VL / pre - 1
    f_pool = npv / EV
    ulike(ret, f_prior, f_post, f_pool, rel=0.02)

    q_tekst = (f"<p>{navn} has assets in place worth NOK {VH} million or NOK {VL} million. Investors put probability "
               f"{tall(q, 2)} on the higher value; the manager knows the true value and acts for the existing "
               f"shareholders. Investors know that the firm has a project with an NPV of NOK {npv} million that needs "
               f"NOK {I} million, which can only be raised by issuing new shares. Without the issue the project is "
               f"lost. Investors are competitive and risk neutral and there is no discounting.</p>"
               f"<p>Find the equilibrium. By how much, in per cent, does the market value of the existing shares "
               f"change when the firm announces an equity issue?</p>")
    alternativer = [
        R(_p(ret), ret),
        F(_p(f_prior),
          f"The price before measured as {tall(q, 2)} × {VH} + {tall(1 - q, 2)} × {VL} = {EV}. Investors know the low "
          f"type will issue and capture the NPV, so that NPV is already in the price before the announcement.", f_prior),
        F(_p(f_post),
          f"The price after set to {VL}, the low type's assets alone. Once revealed, the low type sells its shares at "
          f"a fair price and its old shareholders keep the NPV as well.", f_post),
        F(_p(f_pool),
          f"The pooling belief kept: the issue says nothing about the type and only adds the NPV, ({EV} + {npv})/{EV} "
          f"− 1. But at the pooling price the high type stays out, so an issue reveals the low type.", f_pool),
    ]
    kort = (f"<p><b>{_p(ret)}.</b> Separating: only the low type issues. Before: {tall(q, 2)} × {VH} + "
            f"{tall(1 - q, 2)} × ({VL} + {npv}) = {tall(pre, 2)}. After: {VL} + {npv} = {post}. {post}/{tall(pre, 2)} − "
            f"1 = {_p(ret)}.</p>")
    full = (
        f"<p><b>Why the price falls.</b> In equilibrium only a firm whose shares are worth less than the average "
        f"wants to sell them. Investors know this, so an issue announcement is news that the firm is the low type. "
        f"The fall is the market learning something that was true all along, not value destroyed by the issue.</p>"
        f"<p><b>Step 1: the equilibrium.</b> At pooling, E[V] = {EV} and α = {I}/({EV} + {I} + {npv}) = "
        f"{tall(a_p, 4)}. The high type's dilution is {tall(a_p, 4)} × ({VH} − {EV}) = {tall(dil_p, 2)}, more than the "
        f"NPV of {npv}, so it stays out. Pooling fails check 5 and the equilibrium is separating.</p>"
        f"<p><b>Step 2: each type's value to the old shareholders.</b> High: it does not issue, so {VH}. Low: it is "
        f"revealed and sells at a fair price, so it keeps {VL} + {npv} = {post}.</p>"
        f"<p><b>Step 3: the price before.</b> {tall(q, 2)} × {VH} + {tall(1 - q, 2)} × {post} = {tall(pre, 2)}.</p>"
        f"<p><b>Step 4: the reaction.</b> {post}/{tall(pre, 2)} − 1 = <b>{_p(ret)}</b>.</p>"
        f"<p><b>First check.</b> Without an announcement the price must rise to {VH}, the high type's value: "
        f"{tall(q, 2)} × {VH} + {tall(1 - q, 2)} × {post} = {tall(pre, 2)} again. Prices must average back to the "
        f"price before. The check uses the same numbers, so it catches arithmetic slips only.</p>"
        f"<p><b>Remember:</b> the low type's NPV is in the price before. The issue reveals the type, it does not "
        f"destroy value.</p>"
    )
    return sporsmal(q_tekst, alternativer, kort, full, tall=tallsvar(skala=100, enhet="%"))


# ---------------------------------------------------------------------------
# inf-ipo1 · IPO: netto proveny, rettferdig pris og kostnaden for de gamle eierne
# ---------------------------------------------------------------------------
HJ_IPO = {
    "net": hjelp3(
        "This is the cash an IPO brings in. The underwriter keeps a fee and the firm pays other costs. You need "
        "what is left for the firm.",
        "Gross proceeds = new shares × offer price. Net proceeds = gross × (1 − fee rate − other cost rate), with "
        "both rates as a share of gross proceeds.",
        "<p><b>Step 1: gross proceeds.</b> Only the new shares bring money into the firm. Use the offer price, the "
        "price the firm sells at.</p>"
        "<p><b>Step 2: subtract both costs.</b> The underwriter's fee and the other costs, each a percentage of "
        "gross.</p>"
        "<p><b>Watch out:</b> the first-day price is what investors pay each other afterwards. The firm never sees "
        "it.</p>"),
    "fair": hjelp3(
        "This is the price the old shares would have had if the firm had raised the same money at a fair price, with "
        "no costs and no underpricing.",
        "V<sub>post</sub> = all shares × first-day price. P<sub>fair</sub> = (V<sub>post</sub> − net proceeds) / old "
        "shares.",
        "<p><b>Step 1: net proceeds.</b> Gross proceeds less the fee and the other costs.</p>"
        "<p><b>Step 2: the firm after the IPO.</b> All shares at the first-day price, which is the fair value.</p>"
        "<p><b>Step 3: strip out the money raised.</b> What is left belongs to the old shares. Divide by the old "
        "share count.</p>"
        "<p><b>Watch out:</b> subtract the net proceeds rather than the gross. Divide by the old shares only.</p>"),
    "cost": hjelp3(
        "This is the total cost of the IPO to the original owners: the fees plus the underpricing.",
        "Cost = (P<sub>fair</sub> − P<sub>close</sub>) × old shares, with P<sub>fair</sub> = (V<sub>post</sub> − net "
        "proceeds)/old shares. The same: fee + other costs + new shares × (P<sub>close</sub> − P<sub>offer</sub>).",
        "<p><b>Step 1: net proceeds</b> after both costs.</p>"
        "<p><b>Step 2: the fair price</b> of the old shares had the same money been raised at a fair price.</p>"
        "<p><b>Step 3: the loss per old share</b> is the fair price minus the first-day price. Multiply by the old "
        "shares.</p>"
        "<p><b>Watch out:</b> both the direct costs and the money left on the table count. Only the old shares bear "
        "them.</p>"),
}


@familie("inf-ipo1", tema="info", antall=6, tittel="IPO: net proceeds, the fair price and the cost to the old owners",
         hjelp=HJ_IPO["cost"])
def _(r):
    navn = r.choice(FIRMA)
    sym = r.choice(["$", "NOK"])
    No = r.choice([10, 12, 15, 20, 25, 30])
    Nn = r.choice([4, 5, 6, 8, 10])
    Po = r.choice([12, 15, 18, 20, 24, 25, 30])
    Pc = Po + r.choice([3, 4, 5, 6, 8, 10])
    typ = r.choice(["net", "fair", "cost"])

    gross = Nn * Po
    fee, other = 0.053 * gross, 0.017 * gross
    net = gross - fee - other
    Vpost = (No + Nn) * Pc
    Pfair = (Vpost - net) / No
    cost = (Pfair - Pc) * No

    def m(x):
        return f"{penger(x, 2, sym)} million"

    q_tekst = (f"<p>{navn} has {No} million shares, all held by its founders and a venture fund. It goes public by "
               f"selling {Nn} million new shares at an offer price of {penger(Po, 0, sym)}. The underwriting fee is "
               f"5.3% of gross proceeds and the other costs of the issue are 1.7% of gross proceeds. The shares close "
               f"at {penger(Pc, 0, sym)} on the first day of trading, which is their fair value.</p>")
    if typ == "net":
        R_ = net
        q_tekst += f"<p>What are the net proceeds to {navn}, in {sym} million?</p>"
        alt = [R(m(net), net),
               F(m(gross * 0.947), f"Only the fee subtracted: {tall(gross, 2)} × (1 − 0.053). The other costs of 1.7% "
                                   f"are paid out of the same proceeds.", gross * 0.947),
               F(m(Nn * Pc * 0.93), f"The first-day price used: {Nn} × {Pc} less costs. The firm sells at the offer "
                                    f"price. The first-day price is what investors pay each other afterwards.",
                 Nn * Pc * 0.93),
               F(m(gross), f"The gross proceeds, {Nn} × {Po}. The fee and the other costs come out of them before the "
                           f"firm gets the money.", gross)]
        tall_ut = tallsvar(enhet=f"{sym} million")
        kort = (f"<p><b>{m(net)}.</b> Gross {Nn} × {Po} = {tall(gross, 2)}. Fee {tall(fee, 2)} and other costs "
                f"{tall(other, 2)}. Net {tall(gross, 2)} − {tall(fee, 2)} − {tall(other, 2)} = {tall(net, 2)}.</p>")
        slutt = (f"<p><b>Step 3: net proceeds.</b> {tall(gross, 2)} − {tall(fee, 2)} − {tall(other, 2)} = "
                 f"<b>{tall(net, 2)}</b>, that is {tall(gross, 2)} × 0.93.</p>"
                 f"<p><b>What it does not show.</b> The shares closed at {Pc}, not {Po}. The {tall(Nn * (Pc - Po), 2)} "
                 f"left on the table never reaches the firm. It falls on the old owners, who sold part of their firm too "
                 f"cheaply.</p>")
    elif typ == "fair":
        R_ = Pfair
        q_tekst += (f"<p>Suppose {navn} could instead have raised the same net proceeds by selling shares directly to "
                    f"investors at their fair value, with no fees, no other costs and no underpricing. What would the "
                    f"price per share have been, in {sym}?</p>")
        f_gross = (Vpost - gross) / No
        f_alle = (Vpost - net) / (No + Nn)
        alt = [R(penger(Pfair, 2, sym), Pfair),
               F(penger(f_gross, 2, sym), f"The gross proceeds stripped out: ({tall(Vpost, 2)} − {tall(gross, 2)})/{No}. "
                                          f"The firm only keeps the net proceeds, so only they are part of the value "
                                          f"after the IPO.", f_gross),
               F(penger(f_alle, 2, sym), f"Divided by all {No + Nn} million shares. The question is what the old shares "
                                         f"are worth, so divide what is left by the {No} million old shares.", f_alle),
               F(penger(Pc, 2, sym), f"The first-day price. That is the price after an IPO with fees and underpricing, "
                                     f"which is exactly what the fair issue avoids.", Pc)]
        tall_ut = tallsvar(enhet=f"{sym} per share")
        kort = (f"<p><b>{penger(Pfair, 2, sym)}.</b> Net proceeds {tall(net, 2)}. V<sub>post</sub> = {No + Nn} × {Pc} = "
                f"{tall(Vpost, 2)}. P<sub>fair</sub> = ({tall(Vpost, 2)} − {tall(net, 2)})/{No} = "
                f"{tall(Pfair, 2)}.</p>")
        slutt = (f"<p><b>Step 3: the fair price.</b> Strip out the cash the IPO brought in and divide by the old shares: "
                 f"({tall(Vpost, 2)} − {tall(net, 2)})/{No} = <b>{tall(Pfair, 2)}</b>.</p>"
                 f"<p><b>First check.</b> At that price the firm needs {tall(net, 2)}/{tall(Pfair, 2)} = "
                 f"{tall(net / Pfair, 4)} million new shares. Then ({tall(Vpost, 2)})/({No} + {tall(net / Pfair, 4)}) = "
                 f"{tall(Vpost / (No + net / Pfair), 2)}, the same price. It rearranges the same definition, so it "
                 f"catches arithmetic slips only.</p>")
    else:
        R_ = cost
        q_tekst += (f"<p>What is the total cost of the IPO to {gen(navn)} original owners, in {sym} million, compared "
                    f"with raising the same net proceeds at a fair price with no costs?</p>")
        f_under = Nn * (Pc - Po)
        f_dir = 0.07 * gross
        f_alle = (Pfair - Pc) * (No + Nn)
        alt = [R(m(cost), cost),
               F(m(f_under), f"Only the underpricing: {Nn} × ({Pc} − {Po}). The fee and the other costs are a cost to "
                             f"the old owners too.", f_under),
               F(m(f_dir), f"Only the direct costs, 7% of {tall(gross, 2)}. The money left on the table is a cost as "
                           f"well, paid in shares rather than in cash.", f_dir),
               F(m(f_alle), f"The loss per share multiplied by all {No + Nn} million shares. The new investors bought "
                            f"at the offer price and gained. Only the {No} million old shares bear the cost.", f_alle)]
        tall_ut = tallsvar(enhet=f"{sym} million")
        kort = (f"<p><b>{m(cost)}.</b> Net {tall(net, 2)}. P<sub>fair</sub> = ({tall(Vpost, 2)} − {tall(net, 2)})/{No} "
                f"= {tall(Pfair, 4)}. Cost ({tall(Pfair, 4)} − {Pc}) × {No} = {tall(cost, 2)}.</p>")
        slutt = (f"<p><b>Step 3: the fair price.</b> ({tall(Vpost, 2)} − {tall(net, 2)})/{No} = {tall(Pfair, 4)}.</p>"
                 f"<p><b>Step 4: the cost.</b> Each old share is worth {Pc} instead of {tall(Pfair, 4)}: "
                 f"({tall(Pfair, 4)} − {Pc}) × {No} = <b>{tall(cost, 2)}</b>.</p>"
                 f"<p><b>First check.</b> Fee {tall(fee, 2)} + other costs {tall(other, 2)} + money left on the table "
                 f"{Nn} × ({Pc} − {Po}) = {tall(f_under, 2)} gives {tall(fee + other + f_under, 2)}. The two routes "
                 f"are the same identity, so this catches arithmetic slips only. It shows the split: the underpricing "
                 f"is {tall(f_under / cost * 100, 1)}% of the cost.</p>")
    ulike(*[a.verdi for a in alt], rel=0.02)

    full = (
        f"<p><b>Who pays for an IPO.</b> The firm sells new shares at the offer price and pays a fee to the underwriter "
        f"and other costs. When the shares then trade higher on the first day, the new investors have bought part of "
        f"the firm too cheaply. Both the costs and that underpricing fall on the original owners, the first in cash "
        f"and the second in shares.</p>"
        f"<p><b>Step 1: gross proceeds.</b> {Nn} × {Po} = {tall(gross, 2)} (in {sym} million).</p>"
        f"<p><b>Step 2: the costs.</b> Fee 0.053 × {tall(gross, 2)} = {tall(fee, 2)}. Other costs 0.017 × "
        f"{tall(gross, 2)} = {tall(other, 2)}. Net proceeds {tall(net, 2)}. After the IPO the firm is worth {No + Nn} × "
        f"{Pc} = {tall(Vpost, 2)}.</p>"
        + slutt +
        f"<p><b>Remember:</b> the firm gets the net proceeds at the offer price. The old owners pay the fees and the "
        f"underpricing.</p>"
    )
    return sporsmal(q_tekst, alt, kort, full, hjelp=HJ_IPO[typ], tall=tall_ut)


# ---------------------------------------------------------------------------
# inf-win1 · Vinnerens forbannelse
# ---------------------------------------------------------------------------
HJ_WIN = {
    "ret": hjelp3(
        "This is the winner's curse. An uninformed investor gets a different number of shares in good and bad IPOs. "
        "You need the return on what he actually receives.",
        "Your return = Σ shares received × (value − price) / Σ shares received × price. Shares received = shares "
        "ordered / oversubscription.",
        "<p><b>Step 1: your allocation.</b> Divide the shares you order by how many times each kind of IPO is "
        "oversubscribed.</p>"
        "<p><b>Step 2: profit in each kind.</b> Shares received times value minus price.</p>"
        "<p><b>Step 3: return.</b> Total profit over total money invested, with one good and one bad IPO in each "
        "pair since they are equally likely.</p>"
        "<p><b>Watch out:</b> the average return across IPOs is not the return on your shares.</p>"),
    "pris": hjelp3(
        "This is the winner's curse. You need the offer price at which an uninformed investor just breaks even on "
        "the shares he actually receives.",
        "Break even: n<sub>good</sub>(V<sub>good</sub> − P) + n<sub>bad</sub>(V<sub>bad</sub> − P) = 0, so P = "
        "(n<sub>good</sub>V<sub>good</sub> + n<sub>bad</sub>V<sub>bad</sub>)/(n<sub>good</sub> + n<sub>bad</sub>).",
        "<p><b>Step 1: your allocation.</b> Shares ordered divided by the oversubscription in each kind of IPO.</p>"
        "<p><b>Step 2: weight the values by the shares you get.</b> That weighted average is the price at which your "
        "profit is zero.</p>"
        "<p><b>Watch out:</b> the plain average of the two values ignores that you get more of the bad IPOs.</p>"),
    "forste": hjelp3(
        "This is what the winner's curse does to measured underpricing. You need the average first-day return "
        "across IPOs once they are priced so uninformed investors break even.",
        "P = (n<sub>good</sub>V<sub>good</sub> + n<sub>bad</sub>V<sub>bad</sub>)/(n<sub>good</sub> + n<sub>bad</sub>). "
        "Average first-day return = ½(V<sub>good</sub>/P − 1) + ½(V<sub>bad</sub>/P − 1).",
        "<p><b>Step 1: the break-even price.</b> Weight the values by the shares an uninformed investor receives.</p>"
        "<p><b>Step 2: the first-day return in each kind of IPO</b> at that price.</p>"
        "<p><b>Step 3: average them across IPOs</b>, each kind with its probability.</p>"
        "<p><b>Watch out:</b> this is the underpricing an observer measures in the data. It is not anyone's "
        "profit.</p>"),
}


@familie("inf-win1", tema="info", antall=5, tittel="The winner's curse: why IPOs are underpriced", hjelp=HJ_WIN["pris"])
def _(r):
    Vg = r.choice([115, 120, 125, 130, 140])
    Vb = r.choice([70, 75, 80, 85])
    if (Vg + Vb) % 2:
        raise Avvis("snittet er ikke et helt tall")
    kg = r.choice([4, 5, 10])
    kb = r.choice([1, 2])
    ng, nb = 100 // kg, 100 // kb
    mid = (Vg + Vb) // 2
    typ = r.choice(["ret", "pris", "forste"])

    Pst = (ng * Vg + nb * Vb) / (ng + nb)
    tildel = (f"Good IPOs are {kg} times oversubscribed, so you receive {ng} shares in each. Bad IPOs are "
              + (f"{kb} times oversubscribed, so you receive {nb}." if kb > 1 else "not oversubscribed, so you receive "
                 "all 100."))
    q_tekst = (f"<p>You are an uninformed investor. You order 100 shares in each of many IPOs. Each IPO's shares turn "
               f"out to be worth ${Vg} or ${Vb} at the end of the first day, with equal probability. Informed investors "
               f"bid only for the good ones. {tildel} All IPOs are priced the same.</p>")
    steg_alloc = (f"<p><b>Step 1: your allocation.</b> In a good IPO you get {ng} shares, in a bad one {nb}. Of every "
                  f"{ng + nb} shares you end up holding, only {ng} are in good IPOs.</p>")
    if typ == "ret":
        P = mid
        ret = (ng * (Vg - P) + nb * (Vb - P)) / (P * (ng + nb))
        f_avg = 0.0
        f_rev = (nb * (Vg - P) + ng * (Vb - P)) / (P * (ng + nb))
        f_ord = (ng * (Vg - P) + nb * (Vb - P)) / (P * 200)
        ulike(ret, f_rev, f_ord, rel=0.02)
        if abs(ret) < 0.01:
            raise Avvis("for nær null")
        q_tekst += (f"<p>Every IPO is priced at ${P}, the expected value. What is the average return on your IPO "
                    f"investments, in per cent?</p>")
        alt = [R(_p(ret), ret),
               F(_p(f_avg), f"The average first-day return across IPOs: half gain ${Vg - P} and half lose ${P - Vb}. "
                            f"That is the return on the IPOs, not on your shares, because you get fewer shares in the good "
                            f"ones.", f_avg),
               F(_p(f_rev), f"The allocations swapped: {nb} shares in good IPOs and {ng} in bad ones. Informed investors "
                            f"crowd into the good ones, so those are the ones where you are rationed.", f_rev),
               F(_p(f_ord), f"The profit divided by what you ordered, 100 shares in each IPO at ${P}. Your money is in "
                            f"the shares you received, {ng} plus {nb}.", f_ord)]
        tall_ut = tallsvar(skala=100, enhet="%")
        prof = ng * (Vg - P) + nb * (Vb - P)
        kort = (f"<p><b>{_p(ret)}.</b> Profit per pair {ng} × ({Vg} − {P}) + {nb} × ({Vb} − {P}) = {tall(prof)}. Invested "
                f"{ng + nb} × {P} = {tall((ng + nb) * P)}. {tall(prof)}/{tall((ng + nb) * P)} = {_p(ret)}.</p>")
        slutt = (f"<p><b>Step 2: profit per good and bad pair.</b> {ng} × ({Vg} − {P}) + {nb} × ({Vb} − {P}) = "
                 f"{tall(ng * (Vg - P))} + ({tall(nb * (Vb - P))}) = {tall(prof)}.</p>"
                 f"<p><b>Step 3: the return.</b> You invested {ng + nb} × {P} = {tall((ng + nb) * P)}, so {tall(prof)}/"
                 f"{tall((ng + nb) * P)} = <b>{_p(ret)}</b>. Priced at their expected value, IPOs lose you money, so you would "
                 f"not take part.</p>")
    elif typ == "pris":
        ulike(Pst, mid, (nb * Vg + ng * Vb) / (ng + nb), Vb, rel=0.02)
        q_tekst += ("<p>At what offer price per share do you just break even on average, in $? Give two "
                    "decimals.</p>")
        f_rev = (nb * Vg + ng * Vb) / (ng + nb)
        alt = [R(penger(Pst, 2, "$"), Pst),
               F(penger(mid, 2, "$"), f"The plain average of {Vg} and {Vb}. You receive more shares in the bad IPOs "
                                      f"than in the good ones, so the average over your shares is lower.", mid),
               F(penger(f_rev, 2, "$"), f"The weights swapped: {nb} shares on the good value and {ng} on the bad. You are "
                                        f"rationed in the good IPOs, not the bad ones.", f_rev),
               F(penger(Vb, 2, "$"), f"The bad value. At that price you never lose, so you earn a positive return: more "
                                     f"underpricing than you need to take part.", Vb)]
        tall_ut = tallsvar(enhet="$ per share")
        kort = (f"<p><b>{penger(Pst, 2, '$')}.</b> ({ng} × {Vg} + {nb} × {Vb})/({ng} + {nb}) = "
                f"{ng * Vg + nb * Vb}/{ng + nb} = {tall(Pst, 2)}.</p>")
        slutt = (f"<p><b>Step 2: break even.</b> {ng}({Vg} − P) + {nb}({Vb} − P) = 0, so P = ({ng} × {Vg} + {nb} × {Vb})/"
                 f"{ng + nb} = <b>{tall(Pst, 2)}</b>.</p>"
                 f"<p><b>First check.</b> {ng} × ({Vg} − {tall(Pst, 2)}) = {tall(ng * (Vg - Pst), 2)} and {nb} × ({Vb} − "
                 f"{tall(Pst, 2)}) = {tall(nb * (Vb - Pst), 2)} sum to zero. The check rearranges the same equation, so "
                 f"it catches arithmetic slips only.</p>")
    else:
        forste = 0.5 * Vg / Pst + 0.5 * Vb / Pst - 1
        f_null = 0.0
        f_god = Vg / Pst - 1
        f_rab = 1 - Pst / mid
        ulike(forste, f_god, f_rab, rel=0.02)
        q_tekst += ("<p>The IPOs are priced so that you, the uninformed investor, just break even. What is the average "
                    "first-day return across all IPOs, in per cent?</p>")
        alt = [R(_p(forste), forste),
               F(_p(f_null), "Your own return, which is zero at the break-even price. The average across IPOs weights "
                             "good and bad equally, while you hold more of the bad ones.", f_null),
               F(_p(f_god), f"The first-day return on the good IPOs only, {Vg}/{tall(Pst, 2)} − 1. Half the IPOs are bad "
                            f"and fall on the first day.", f_god),
               F(_p(f_rab), f"The discount to the expected value, 1 − {tall(Pst, 2)}/{mid}. Underpricing is measured "
                            f"as a return from the offer price.", f_rab)]
        tall_ut = tallsvar(skala=100, enhet="%")
        kort = (f"<p><b>{_p(forste)}.</b> Break-even price ({ng} × {Vg} + {nb} × {Vb})/{ng + nb} = {tall(Pst, 4)}. "
                f"Average first-day return ½({Vg} + {Vb})/{tall(Pst, 4)} − 1 = {_p(forste)}.</p>")
        slutt = (f"<p><b>Step 2: the break-even price.</b> ({ng} × {Vg} + {nb} × {Vb})/{ng + nb} = {tall(Pst, 4)}.</p>"
                 f"<p><b>Step 3: the first-day returns.</b> Good: {Vg}/{tall(Pst, 4)} − 1 = {_p(Vg / Pst - 1)}. Bad: "
                 f"{Vb}/{tall(Pst, 4)} − 1 = {_p(Vb / Pst - 1)}. Average: <b>{_p(forste)}</b>.</p>"
                 f"<p><b>Read it.</b> An observer sees large average first-day gains, yet the uninformed investor earns "
                 f"nothing. The underpricing pays him for being stuck with the bad issues.</p>")
    full = (
        f"<p><b>The winner's curse.</b> Informed investors bid only when an IPO is good, so good IPOs are heavily "
        f"oversubscribed and an uninformed investor is rationed in them. In bad IPOs the informed stay away and he "
        f"gets most of what he ordered. His return depends on the shares he actually receives. Those lean towards "
        f"the bad issues. To keep him in the market, IPOs must be priced below their expected value: underpricing.</p>"
        + steg_alloc + slutt +
        f"<p><b>Remember:</b> weight by the shares you receive, not by the IPOs. The gap between the two is the "
        f"underpricing.</p>"
    )
    return sporsmal(q_tekst, alt, kort, full, hjelp=HJ_WIN[typ], tall=tall_ut)


# ===========================================================================
# Statiske spørsmål
# ===========================================================================

statisk(
    "inf-s01", tema="info", type="begrep",
    hjelp=hjelp3(
        "This is about what asymmetric information costs when only one type issues: is value lost or only moved?",
        "Separating: E[V | issue] = V<sub>L</sub> and the high type stays out. Pooling: both types invest and the "
        "high type's old owners subsidise the low type's through the new investors.",
        "<p><b>Step 1: what does each type do?</b> One issues and invests, one does not.</p>"
        "<p><b>Step 2: is any share mispriced?</b> Once an issue reveals the type, ask what price the new investors "
        "pay.</p>"
        "<p><b>Step 3: what real investment is missing?</b> A cost to society is a project that never happens, not a "
        "price that favours one side.</p>",
    ),
    q="<p>In a Myers-Majluf setting the equilibrium is separating: only the firm with low-value assets issues equity "
      "and invests. Which statement describes the cost of the information problem correctly?</p>",
    alternativer=[
        R("The high type never undertakes its positive-NPV project, so that NPV is lost to everyone"),
        F("The low type's old shareholders transfer wealth to the new investors, so value moves but none is lost",
          "Once the issue reveals the low type, its shares sell at a fair price. In a separating outcome nobody "
          "transfers anything to anyone."),
        F("The new investors overpay for the low type's shares, so they bear the loss in expectation",
          "New investors know that an issue comes from the low type and price the shares at its value. They break "
          "even."),
        F("Nothing is lost, because investors' beliefs are rational and every share is fairly priced",
          "Rational beliefs make prices fair. They do not make the outcome efficient: a good project that is skipped "
          "is gone."),
    ],
    kort="<p><b>The high type's NPV is lost.</b> It stays out rather than sell undervalued shares. That is "
         "underinvestment: an expected loss of q × NPV, with q the probability of the high type.</p>",
    full="<p><b>What separating means.</b> At the pooling price the high type's dilution exceeds the NPV, so it does "
         "not issue. Investors then know that only the low type issues and price an issue at V<sub>L</sub>. The low "
         "type issues at that fair price and keeps V<sub>L</sub> + NPV.</p>"
         "<p><b>Step 1: is anything mispriced?</b> No. The issue reveals the type, so the new investors pay exactly "
         "what the shares are worth. Nobody transfers wealth to anybody.</p>"
         "<p><b>Step 2: what is missing?</b> The high type had a positive-NPV project and skipped it. That value never "
         "exists. With probability q of the high type the expected loss is q × NPV.</p>"
         "<p><b>Step 3: compare with pooling.</b> Under pooling both types invest. The high type's old owners lose "
         "and the low type's gain through the new investors, who break even on average: a transfer, no loss. So "
         "pooling is efficient and separating is not. It is the same family as debt overhang: a good project dies "
         "because the people deciding would not capture its value.</p>"
         "<p><b>Remember:</b> separating destroys q × NPV, pooling only moves value. Rational beliefs do not make the "
         "outcome efficient.</p>",
)

statisk(
    "inf-s02", tema="info", type="begrep",
    hjelp=hjelp3(
        "This is the pecking order: the ranking of financing sources when managers know more than investors.",
        "The cost to old owners of selling a claim is how much outsiders underprice it. The more a claim's payoff "
        "depends on the hidden value, the larger that cost.",
        "<p><b>Step 1: which source involves no outside investor?</b> That one cannot be underpriced.</p>"
        "<p><b>Step 2: compare debt and equity.</b> Which payoff changes more with the true value of the assets?</p>"
        "<p><b>Step 3: watch for the wrong theory.</b> Taxes and distress costs belong to the trade-off theory, not "
        "to the pecking order.</p>",
    ),
    q="<p>Managers know more about the firm's assets than outside investors do. The firm needs money for a "
      "positive-NPV project. According to the pecking order, in which order should it use internal funds, debt and "
      "new equity? Why?</p>",
    alternativer=[
        R("Internal funds, then debt, then equity: the more a claim depends on what managers know, the more it is "
          "underpriced"),
        F("Debt, then internal funds, then equity, because interest is tax-deductible, which makes debt the cheapest "
          "source of all",
          "The tax shield is the trade-off theory's argument. The pecking order ranks sources by how badly outsiders "
          "can misprice them. Internal funds involve no outsider at all."),
        F("Equity, then debt, then internal funds, because equity has no fixed payments and therefore creates no "
          "distress costs",
          "This ranks by distress risk. Equity is the claim whose value depends most on what managers know, so "
          "outsiders discount it most."),
        F("Internal funds, then equity, then debt, because creditors demand covenants and collateral that tie the "
          "firm's hands",
          "Covenants are a cost of debt, but the pecking order is about information. A fixed promise to pay is less "
          "sensitive to the hidden value than a share of everything."),
    ],
    kort="<p><b>Internal funds, debt, equity.</b> Equity's value depends most on what managers know, so outsiders "
         "underprice it most. Debt's fixed promise depends less. Internal funds involve no outsider.</p>",
    full="<p><b>The idea.</b> Selling a claim to investors who know less than you costs your existing owners the "
         "amount by which that claim is underpriced. Rank the sources by how badly they can be underpriced and you "
         "have the pecking order.</p>"
         "<p><b>Step 1: internal funds.</b> No outside investor, so nothing can be mispriced. First choice.</p>"
         "<p><b>Step 2: debt.</b> Lenders get a fixed promise, paid in full unless the firm defaults. Its value moves "
         "little with the hidden value of the assets, so it is little underpriced. Safe debt is not underpriced at "
         "all.</p>"
         "<p><b>Step 3: equity.</b> Shareholders get a share of everything, so the value of equity moves krone for "
         "krone with what managers know. It is the most underpriced and the last resort.</p>"
         "<p><b>What the pecking order is not.</b> It is not the trade-off theory: no tax shield, no distress costs, "
         "no target leverage. It also explains why the most profitable firms borrow least: they need no outside "
         "money. And it rests on asymmetric information, not on inefficient markets.</p>"
         "<p><b>Remember:</b> internal funds, then debt, then equity, ranked by sensitivity to what managers "
         "know.</p>",
)

statisk(
    "inf-s03", tema="info", type="tolkning",
    hjelp=hjelp3(
        "This is the verbal question on why a share price falls when a firm announces an equity issue. One of the "
        "proposed reasons is a fallacy.",
        "Channels a fall can work through: news about the firm's value (Myers-Majluf), the ranking of financing "
        "sources (pecking order), what managers do with new cash (agency) and the direct costs of issuing.",
        "<p><b>Step 1: for each reason, name the channel it works through.</b></p>"
        "<p><b>Step 2: check any reason that rests on arithmetic with small numbers.</b> A firm worth 100 with 10 "
        "shares sells 5 new shares at what they are worth. What is each share worth afterwards?</p>",
    ),
    q="<p>Your firm announces a seasoned equity offering (SEO) and its share price falls 12% the same day. An exam "
      "question asks for the potential reasons in about five sentences. Which proposed reason should you leave "
      "out?</p>",
    alternativer=[
        R("New shares dilute the old ones, so each share must be worth less even when they are sold at a fair price"),
        F("Managers sell equity when they think it is overpriced, so the market lowers its view of the firm's assets",
          "Keep this one. It is the core reason (Myers-Majluf): the issue tells investors that managers think the "
          "shares are expensive."),
        F("Equity is last in the pecking order, so choosing it suggests the firm had no cash or spare debt capacity",
          "Keep this one. The choice of equity hints that the cheaper sources were exhausted."),
        F("Investors may fear that fresh cash in the hands of managers without good projects will fund empire "
          "building",
          "Keep this one. It is an agency reason: cash without good projects invites growth that destroys value."),
    ],
    kort="<p><b>Leave out dilution.</b> Shares sold at a fair price take nothing from the old owners, because the cash "
         "comes in with them. The fall is news about the firm, not arithmetic.</p>",
    full="<p><b>Why dilution is a fallacy.</b> If the new shares are sold at what they are worth, the firm receives "
         "cash equal to the value it gives away. The old owners own a smaller share of a larger firm and their "
         "wealth is unchanged. A fall in price needs news or a real cost.</p>"
         "<p><b>What a five-sentence answer says.</b> First, adverse selection: managers know more and issue when "
         "they believe the shares are overpriced, so the market reads the issue as bad news about the assets. Second, "
         "the pecking order: equity is the last resort, so its choice suggests weak cash flow or no debt capacity "
         "left. Third, agency: cash in the hands of managers without good projects may be wasted on empire building. "
         "Fourth, real costs: the underwriting fee, the other issue costs and any offer discount. "
         "Fifth, the better alternative: internal funds or debt if capacity allows, or a rights issue that sells to "
         "the existing owners.</p>"
         "<p><b>Read the fall correctly.</b> Most of the 12% is the market learning something that was already true. "
         "It is not value destroyed by the issue.</p>"
         "<p><b>Remember:</b> an SEO announcement is news. Dilution at a fair price is not a cost.</p>",
)

statisk(
    "inf-s04", tema="info", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about financial slack (cash or unused debt capacity) and what it does to the two incentives in "
        "Myers-Majluf.",
        "Undervalued type: issues only if NPV ≥ α(V<sub>true</sub> − E[V]). Overvalued type: gains α(E[V] − "
        "V<sub>true</sub>) from selling shares.",
        "<p><b>Step 1: the undervalued firm.</b> Why did it skip the project? Does cash change that?</p>"
        "<p><b>Step 2: the overvalued firm.</b> Where does its gain from issuing come from? Does cash in the bank "
        "remove that gain?</p>",
    ),
    q="<p>Consider two statements about financial slack (cash or unused debt capacity) in Myers-Majluf.</p>"
      "<p>I. Slack removes the underinvestment problem: a firm whose shares are undervalued can fund its project "
      "without issuing.</p>"
      "<p>II. Slack removes the incentive of an overvalued firm to issue equity.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        R("Only I"),
        F("Only II", "Statement II fails: an overvalued firm gains from selling shares above their worth whether or not "
                     "it holds cash."),
        F("Both I and II", "Statement II fails: cash takes away the need to issue, not the gain from selling "
                           "overpriced shares."),
        F("Neither", "Ask what the undervalued firm needed outside money for. With enough cash it no longer faces the "
                     "choice between dilution and skipping the project."),
    ],
    kort="<p><b>Only I.</b> Slack lets the undervalued firm invest without selling cheap shares. An overvalued firm "
         "still gains α(E[V] − V<sub>true</sub>) by issuing, so its wish to issue remains.</p>",
    full="<p><b>Two different incentives.</b> Myers-Majluf has two sides. The undervalued firm may skip a good "
         "project because the only money on offer comes with dilution. The overvalued firm wants to issue because it "
         "sells shares for more than they are worth.</p>"
         "<p><b>Statement I.</b> With enough cash or safe debt capacity, the undervalued firm funds the project "
         "itself. No shares are sold, so there is no dilution and its old owners keep the whole NPV. The "
         "underinvestment is gone. This is why firms value slack and why the pecking order puts internal funds "
         "first.</p>"
         "<p><b>Statement II.</b> The overvalued firm's gain from issuing does not depend on needing the money. It "
         "sells a claim worth less than the price. Cash in the bank does not change that, so the incentive to issue "
         "remains. Saying that with slack no issue would ever be attractive is a known error. It also contradicts "
         "market timing.</p>"
         "<p><b>Remember:</b> slack cures the underinvestment, not the overvalued firm's wish to sell shares.</p>",
)

statisk(
    "inf-s05", tema="info", type="begrep",
    hjelp=hjelp3(
        "This is certification: why a third party can shrink the discount investors demand when they know less than "
        "managers.",
        "The discount comes from α(V<sub>true</sub> − E[V | beliefs]). Anything that moves investors' beliefs "
        "towards the true value shrinks it. A signal is credible only if sending a false one is costly.",
        "<p><b>Step 1: who loses if a bad issue is sold as good?</b> The firm sells once, the bank sells every "
        "month.</p>"
        "<p><b>Step 2: separate the roles.</b> Distribution and placement risk are one thing. Information is "
        "another.</p>",
    ),
    q="<p>Why can a reputable underwriter reduce the discount an issuing firm suffers when investors know less than "
      "its managers?</p>",
    alternativer=[
        R("It is a repeat player whose reputation suffers if it sells overpriced issues, so its backing is "
          "informative"),
        F("It guarantees investors a minimum return on the new shares, so they no longer need a discount to buy "
          "them",
          "Underwriters do not guarantee returns to investors. Under firm commitment they guarantee the firm its "
          "proceeds, which is a different promise."),
        F("It buys the whole issue under firm commitment, so the issuing firm bears no risk of unsold shares",
          "That moves the risk of a failed sale from the firm to the bank. It tells investors nothing about what the "
          "firm is worth."),
        F("It sets the price through book building, which always reveals the firm's true value to every investor",
          "Book building collects information about demand from investors. It does not reveal what managers know "
          "and offerings are still underpriced on average."),
    ],
    kort="<p><b>Reputation.</b> The bank sells issues to the same investors again and again. Backing a bad issue "
         "costs it future business, so its backing tells investors something the firm cannot say credibly "
         "itself.</p>",
    full="<p><b>The problem.</b> A firm that says \"our shares are worth more than you think\" is not believed: every "
         "firm would say it. Investors price at their belief and a good firm sells too cheaply.</p>"
         "<p><b>Why the bank is different.</b> The underwriter is a repeat player. It sells offerings to the same "
         "institutions every month. If it sells an overpriced issue, it loses credibility and future deals. That "
         "cost makes its backing a credible signal: it is cheaper for the bank to certify a good firm than a bad "
         "one.</p>"
         "<p><b>What it changes.</b> Certification moves investors' belief E[V | beliefs] closer to the true value. "
         "The dilution term α(V<sub>true</sub> − E[V | beliefs]) shrinks, so the good firm loses less. Auditors and "
         "analysts play the same role. The fee buys certification, not only distribution.</p>"
         "<p><b>What does not do it.</b> Firm commitment shifts placement risk to the bank. Book building gathers "
         "demand. Neither tells investors what managers know.</p>"
         "<p><b>Remember:</b> a certifier works because lying would cost it its reputation.</p>",
)

statisk(
    "inf-s06", tema="info", type="begrep",
    hjelp=hjelp3(
        "This is debt against equity under asymmetric information: which claim costs the old owners less when "
        "outsiders cannot see the true value.",
        "Cost to the old owners = how much the new claim is underpriced. Compare how each claim's payoff changes "
        "with the true value of the assets.",
        "<p><b>Step 1: write each claim's payoff as a function of the true value of the assets.</b></p>"
        "<p><b>Step 2: which payoff changes more when the true value is higher than investors think?</b></p>"
        "<p><b>Step 3: strike the arguments from other theories.</b> Cost of capital and taxes are not about "
        "information.</p>",
    ),
    q="<p>A firm's managers know its assets are worth more than the market thinks. The firm must raise money for a "
      "positive-NPV project. Why do its existing shareholders lose less if it raises the money with debt rather than "
      "with equity?</p>",
    alternativer=[
        R("Its payoff depends less on the hidden value, so it is less underpriced; safe debt is not underpriced at all"),
        F("Debt is cheaper because r<sub>D</sub> is below r<sub>E</sub>, so the firm pays a lower rate for the same "
          "money",
          "That ignores risk: under MM cheaper debt makes the equity riskier. The information argument is about how "
          "badly each claim is mispriced."),
        F("Debt investors cannot see the hidden value either, so they have no basis on which to demand a discount for it",
          "Equity investors cannot see it either. What differs is how much each claim's payoff depends on it."),
        F("Interest is tax-deductible, so the tax shield offsets whatever discount the lenders demand",
          "The tax shield is a separate argument from the trade-off theory. It does not explain why information "
          "makes equity costlier than debt."),
    ],
    kort="<p><b>Debt is less information-sensitive.</b> Lenders get a fixed promise, so their claim moves little "
         "with the hidden value and is little underpriced. Debt paid in every state is not underpriced at all.</p>",
    full="<p><b>Where the loss comes from.</b> When investors cannot see that the assets are worth more, they price "
         "any new claim at their belief. The good firm's old owners lose the gap between what the claim is truly "
         "worth and what the investors pay.</p>"
         "<p><b>Equity.</b> New shareholders get a fraction of everything. If the assets are truly worth more, so is "
         "their fraction, krone for krone. The gap is large.</p>"
         "<p><b>Debt.</b> Lenders get a fixed promise. If the firm repays in every state, the true value of the debt "
         "is its promised payment whatever the assets are worth. The lenders' price is then right and nothing is "
         "transferred. Risky debt is underpriced only in the states where the firm defaults, so the gap is smaller "
         "than for equity.</p>"
         "<p><b>The consequence.</b> A good firm prefers debt and a bad firm would rather mimic than reveal itself by "
         "issuing equity (check 5). This is the pecking order. It is what an exam question that sets debt "
         "against equity asks you to show.</p>"
         "<p><b>Remember:</b> the less a claim depends on the hidden value, the less it costs the old owners to sell "
         "it.</p>",
)

statisk(
    "inf-s07", tema="info", type="begrep",
    hjelp=hjelp3(
        "This is the rights issue: new shares offered only to the existing shareholders, in proportion to what they "
        "own.",
        "The Myers-Majluf transfer is the gap between what new shares are worth and what their buyers pay for them.",
        "<p><b>Step 1: who buys the new shares in a rights issue?</b></p>"
        "<p><b>Step 2: if the shares are underpriced, who gains and who loses?</b></p>"
        "<p><b>Step 3: check the discount.</b> Does a lower subscription price move value, or only change the "
        "number of shares?</p>",
    ),
    q="<p>A firm whose shares the market may undervalue raises equity through a rights issue instead of a public "
      "offering. Why does this avoid the wealth transfer of Myers-Majluf?</p>",
    alternativer=[
        R("The new shares go to the existing owners pro rata, so any underpricing is paid by and to the same people"),
        F("The subscription price is set at a discount to the market price, which compensates the owners for the dilution",
          "The discount is cosmetic. It decides how many new shares are created, not how much value changes hands."),
        F("Exercised rights are not taxed, so the owners keep more of the value of the new shares",
          "The tax treatment is a side benefit. It does not stop value moving from old owners to new ones."),
        F("Exchanges require shareholder approval for large offerings, so managers cannot issue overpriced shares",
          "The approval rule limits large offerings. It does nothing about who stands on the other side of an "
          "underpriced sale."),
    ],
    kort="<p><b>Same people on both sides.</b> The old owners buy the new shares themselves, so if they are cheap, the "
         "owners gain as buyers what they lose as sellers.</p>",
    full="<p><b>Where the transfer comes from.</b> In a public offering an undervalued firm sells shares to new "
         "investors below their true worth. Value moves from the old owners to the new ones.</p>"
         "<p><b>What a rights issue changes.</b> Each existing shareholder gets the right to buy new shares in "
         "proportion to what he holds. If the shares are underpriced, the buyer and the seller are the same person, "
         "so the transfer cancels. That is why it is the clean answer to \"how can the firm avoid the adverse "
         "selection cost of an equity issue?\"</p>"
         "<p><b>The discount does not matter.</b> A lower subscription price means more new shares and a lower "
         "price after the issue, but an owner who subscribes or sells his rights ends up exactly as well off. Only "
         "an owner who lets his rights lapse loses. The lecture also notes that rights offers cost less and are "
         "less underpriced. Exercised rights are not taxed either.</p>"
         "<p><b>The condition.</b> It works only if the owners have the cash to subscribe or can sell their rights. "
         "Standard in Norway and much of Europe.</p>"
         "<p><b>Remember:</b> a rights issue sells any underpricing to the people who bear it.</p>",
)

statisk(
    "inf-s08", tema="info", type="begrep",
    hjelp=hjelp3(
        "This is about the four theories of IPO underpricing in the lecture. You need the one called control.",
        "The four: investment bank conflicts, control, behavioural, asymmetric information. Each names a different "
        "reason the offer price is set low.",
        "<p><b>Step 1: match each option to a theory.</b> Who benefits from the low price in each?</p>"
        "<p><b>Step 2: control.</b> Which option is about who ends up owning the firm?</p>",
    ),
    q="<p>The lecture lists four theories of IPO underpricing. Which statement describes the <i>control</i> "
      "theory?</p>",
    alternativer=[
        R("Excess demand lets the issuer pick its owners and spread the shares so thinly that nobody interferes"),
        F("Underwriters price low so that favoured institutional clients get cheap access to the shares",
          "That is the investment bank conflict theory: the bank serves its repeat clients at the issuer's "
          "expense."),
        F("Irrational investors bid the first-day price above the true value, so the offer only looks underpriced",
          "That is the behavioural theory. Part of the first-day jump is then overpricing, not underpricing."),
        F("Uninformed investors are filled in bad issues and rationed in good ones, so all issues must be priced low",
          "That is the asymmetric information theory, the winner's curse among investors."),
    ],
    kort="<p><b>Control.</b> A cheap, oversubscribed issue lets the firm pick its owners and spread the shares thinly, "
         "so no outside holder is large enough to interfere with management.</p>",
    full="<p><b>The four theories.</b> The lecture sorts the explanations into four groups. Know all four: verbal "
         "answers are graded on breadth.</p>"
         "<p><b>Investment bank conflicts.</b> The bank sells to the same institutions again and again. A cheap issue "
         "is an easy sale and a favour it can call in later. The firm's owners pay.</p>"
         "<p><b>Control.</b> When the issue is oversubscribed, the issuer decides who gets shares. It can spread them "
         "across many small holders, so no one gets a block large enough to challenge management. Underpricing buys "
         "that excess demand. It reduces outside intervention, a governance cost to the shareholders.</p>"
         "<p><b>Behavioural.</b> Over-optimistic investors bid the first-day price above true value, so part of the "
         "measured underpricing is first-day overpricing.</p>"
         "<p><b>Asymmetric information.</b> The winner's curse: informed investors bid only for good issues, so "
         "uninformed ones end up with more of the bad ones. Issues must be priced below their expected value to keep "
         "the uninformed in.</p>"
         "<p><b>Remember:</b> conflicts, control, behaviour and information. Control is about who owns the firm "
         "afterwards.</p>",
)

statisk(
    "inf-s09", tema="info", type="tolkning",
    hjelp=hjelp3(
        "This is an IPO priced low for the bank's favoured clients. Name the theory and find who bears the cost.",
        "Underpricing cost = new shares × (first-day price − offer price). It falls on whoever sold the shares, not "
        "on the company's accounts.",
        "<p><b>Step 1: whose interest set the price?</b> The issuer's, the bank's or the investors'?</p>"
        "<p><b>Step 2: who sold shares below their value?</b> That is who pays.</p>",
    ),
    q="<p>An underwriter prices an IPO well below what demand would bear and allocates most of the shares to hedge "
      "funds that trade with it every day. The shares jump on the first day. Which theory of underpricing is this "
      "and who pays for it?</p>",
    alternativer=[
        R("Investment bank conflicts; the pre-IPO owners pay, since they sold part of their firm too cheaply"),
        F("Investment bank conflicts; the underwriter pays, since its fee is a share of a lower offer price",
          "The fee does shrink a little, but the bank gains far more from the clients it favours. The cost lies with "
          "whoever sold shares below their value."),
        F("The winner's curse; the uninformed investors pay, since they are rationed in the good issues",
          "The winner's curse is about investors who know less than others. Here the bank decides who gets the "
          "cheap shares."),
        F("The control theory; nobody pays, since the firm raises the same amount of cash whatever the offer price is",
          "The firm raises less cash for the shares it sells. Selling shares below their value is a cost to someone "
          "even if no invoice shows it."),
    ],
    kort="<p><b>Investment bank conflicts; the pre-IPO owners pay.</b> The bank serves its repeat clients with cheap "
         "shares. The owners sold part of their firm below its value.</p>",
    full="<p><b>The theory.</b> An underwriter is a repeat player with two sets of clients: the firm that goes public "
         "once and the institutions it sells to every week. A low offer price makes the issue easy to sell and hands "
         "its favoured clients a first-day gain. That is the investment bank conflict theory of underpricing. The "
         "lecture's illustration is a blog post on LinkedIn's IPO, headlined that LinkedIn had been done out of "
         "about $130 million.</p>"
         "<p><b>Who pays.</b> The company's accounts never show the underpricing: it books the proceeds it received. "
         "The cost falls on the pre-IPO owners. They gave up a fraction of their firm worth the first-day price and "
         "got only the offer price for it. In shares, they sold more of the firm than the money required.</p>"
         "<p><b>Why it persists.</b> The issuer has little bargaining power: it goes public once, while the bank "
         "and its clients deal with each other repeatedly. The lecture also notes that underwriters benefit from "
         "underpricing because it helps them manage their risks.</p>"
         "<p><b>Remember:</b> the pre-IPO owners pay for underpricing, whichever theory explains it.</p>",
)

statisk(
    "inf-s10", tema="info", type="begrep",
    hjelp=hjelp3(
        "This is the puzzle of weak returns after an IPO. You need the mechanism the lecture gives.",
        "A price reflects the views of those who can trade on them. Selling a share you do not own requires borrowing "
        "it first.",
        "<p><b>Step 1: whose views can show up in the price of a newly listed share?</b></p>"
        "<p><b>Step 2: whose views cannot, at first?</b></p>"
        "<p><b>Step 3: what changes over time?</b></p>",
    ),
    q="<p>Shares of firms that have recently gone public earn lower returns than comparable firms over the following "
      "years. Which mechanism does the lecture give?</p>",
    alternativer=[
        R("Optimists buy while pessimists cannot short yet, so the price starts too high and drifts down once shorting "
          "begins"),
        F("Underwriters support the price just after the IPO and the price falls back once the support ends",
          "Price support lasts days or weeks. It cannot explain weak returns over years."),
        F("The winner's curse makes uninformed investors overpay in every issue, so returns stay low afterwards",
          "The winner's curse explains why issues are priced below their value, the opposite of overpaying. It says "
          "nothing about later returns."),
        F("Newly listed firms are riskier than comparable firms, so they must earn lower returns afterwards",
          "More risk means a higher expected return, not a lower one. The puzzle is that the returns are lower."),
    ],
    kort="<p><b>Short-sale constraints.</b> The optimists set the price at first, because pessimists cannot short a new "
         "share yet. As bad news spreads and shorting starts, the price falls towards fundamental value.</p>",
    full="<p><b>The puzzle.</b> Buying recent IPOs earns less than buying comparable firms. That looks like a free "
         "lunch: short the IPOs and buy the comparables. Why does it persist?</p>"
         "<p><b>The lecture's mechanism.</b> Right after the IPO, the most optimistic investors buy the shares. The "
         "pessimists would like to sell short, but shares of a newly listed firm are hard or impossible to borrow at "
         "first. So the price reflects only the optimists' view and sits above fundamental value. Over time, negative "
         "information spreads and short selling begins. The price converges to fundamental value, which shows up as "
         "weak returns compared with similar firms.</p>"
         "<p><b>The other reading.</b> The result is sensitive to the benchmark. Issuers differ from non-issuers in "
         "size, age and growth, so part of the effect may be a measurement problem. In an exam, give the mechanism "
         "and mention the caveat.</p>"
         "<p><b>Do not confuse it with underpricing.</b> Underpricing is the jump on day one. Long-run "
         "underperformance is what happens over the following years. They point in opposite directions.</p>"
         "<p><b>Remember:</b> optimists buy, pessimists cannot short yet, the price drifts down when they can.</p>",
)

statisk(
    "inf-s11", tema="info", type="tolkning",
    hjelp=hjelp3(
        "This is about who bears the cost of IPO underpricing when both new and existing shares are sold.",
        "The cost of underpricing = shares sold × (first-day price − offer price). It falls on whoever owned what was "
        "sold below its value.",
        "<p><b>Step 1: the new shares.</b> Whose stake do they dilute when sold too cheaply?</p>"
        "<p><b>Step 2: the existing shares.</b> Who sold them and at what price?</p>"
        "<p><b>Step 3: the buyers.</b> Did they lose or gain?</p>",
    ),
    q="<p>In an IPO the company sells 4 million new shares and a venture fund sells 2 million of its existing shares, "
      "all at the offer price. The shares close well above the offer price on the first day, at their fair value. "
      "Who bears the cost of the underpricing?</p>",
    alternativer=[
        R("The pre-IPO owners: all of them through the cheap new shares and the fund also on its own shares sold"),
        F("Only the company, which books a loss equal to the money left on the table",
          "Underpricing never appears in the company's accounts. Its cash is the proceeds it received either way."),
        F("Only the venture fund, because the company itself sold no existing shares and so gave nothing away below value",
          "The company's new shares were sold below their value too. That dilutes every pre-IPO owner, the fund "
          "included."),
        F("The investors who bought at the offer price, because they paid before the price was known",
          "They bought below the first-day price and gained. The cost falls on whoever sold."),
    ],
    kort="<p><b>The pre-IPO owners.</b> The cheap new shares dilute all of them. The venture fund also sold its own 2 "
         "million shares below their value, so it bears that slice too.</p>",
    full="<p><b>Two kinds of shares.</b> Primary shares are new: the money goes to the company. Secondary shares are "
         "existing shares sold by their owners: the money goes to the sellers. Always read which kind is sold before "
         "you allocate the cost.</p>"
         "<p><b>The new shares.</b> The company sold 4 million shares at the offer price when they were worth the "
         "first-day price. It needed more shares to raise its money than a fair price would have required. That "
         "dilutes every pre-IPO owner, the fund included, in proportion to their stakes.</p>"
         "<p><b>The existing shares.</b> The fund sold 2 million of its own shares at the offer price. The gap to the "
         "first-day price on those shares is a loss to the fund alone.</p>"
         "<p><b>What it is not.</b> The company books its proceeds and no loss: underpricing is a cost in shares, not "
         "in the accounts. The buyers at the offer price gained.</p>"
         "<p><b>Remember:</b> underpricing falls on the pre-IPO owners, through the new shares on all of them and "
         "through secondary shares on the sellers.</p>",
)

statisk(
    "inf-s12", tema="info", type="fakta",
    hjelp=hjelp3(
        "This is a fact from the lecture on IPOs: what first-day returns look like in US data.",
        "First-day return = (first-day closing price − offer price) / offer price. Underpricing means this is "
        "positive on average.",
        "<p><b>Step 1: the sign.</b> Are IPOs on average priced below or above where they trade on day one?</p>"
        "<p><b>Step 2: the size.</b> Recall the share that are positive and the average.</p>",
    ),
    q="<p>What does the lecture report about first-day returns on US IPOs?</p>",
    alternativer=[
        R("About three in four are positive and the average is about 18%"),
        F("About half are positive and the average is close to zero, as fair pricing would imply",
          "That is what fair pricing would give. The data show a large positive average: underpricing."),
        F("Almost all are positive and the average is about 40%",
          "Too high. A few hot years came close to that, but the lecture's figures are lower."),
        F("About three in four are negative, because underwriters overprice to raise the most money",
          "The sign is wrong. Underwriters gain from underpricing, which makes the issue easier to sell."),
    ],
    kort="<p><b>About 75% positive, average about 18%.</b> IPOs are underpriced on average. The pre-IPO owners pay; the "
         "underwriters benefit because cheap issues are easier to manage.</p>",
    full="<p><b>The fact.</b> The lecture reports that about 75% of US first-day returns are positive and that the "
         "average is about 18%. IPOs are set at an offer price that is low enough for the first trading day to "
         "deliver a large gain on average. This is the IPO underpricing puzzle.</p>"
         "<p><b>Who gains and who pays.</b> Underwriters benefit: a cheap issue sells easily and lowers the risk of "
         "being stuck with unsold shares. The buyers at the offer price gain. The pre-IPO shareholders pay, because "
         "they sold part of their firm below what the market paid a few hours later.</p>"
         "<p><b>Why it is a puzzle.</b> If the firm could sell at the first-day price, it would raise more money for "
         "the same shares. The four theories (bank conflicts, control, behavioural, asymmetric information) are "
         "attempts to explain why issuers accept it.</p>"
         "<p><b>Related numbers.</b> On top of the underpricing come the direct costs: an underwriting fee of about "
         "5.3% and other expenses of about 1.7% of gross proceeds.</p>"
         "<p><b>Remember:</b> most IPOs jump on day one. The average jump is the cost to the old owners.</p>",
)

statisk(
    "inf-s13", tema="info", type="begrep",
    hjelp=hjelp3(
        "This is the winner's curse explanation of IPO underpricing. You need the mechanism, not just the name.",
        "Your return depends on the shares you receive. Shares received = shares ordered / oversubscription. The "
        "oversubscription depends on whether informed investors bid.",
        "<p><b>Step 1: where do informed investors bid?</b></p>"
        "<p><b>Step 2: what does that do to an uninformed investor's allocation</b> in good and in bad issues?</p>"
        "<p><b>Step 3: what price keeps the uninformed investor willing to take part?</b></p>",
    ),
    q="<p>In the winner's curse explanation, why must IPOs be priced below their expected value?</p>",
    alternativer=[
        R("Informed investors bid only for good issues, so the uninformed get few good shares and many bad ones"),
        F("The issuing firm knows more than investors, so investors discount every issue the firm makes to protect themselves",
          "That is Myers-Majluf, an asymmetry between the firm and investors. The winner's curse is an asymmetry "
          "among investors."),
        F("Underwriters cannot estimate the expected value well, so they shade the price for safety",
          "The argument holds even if the bank knows the expected value exactly. The problem is who ends up holding "
          "which shares."),
        F("Investors bid more aggressively in hot markets, so prices overshoot on the first day",
          "That is a behavioural story about overpricing on day one, not the winner's curse."),
    ],
    kort="<p><b>Adverse allocation.</b> Good issues are oversubscribed by informed investors, so the uninformed are "
         "rationed there and filled in the bad ones. At the expected value they lose, so the price must be lower.</p>",
    full="<p><b>The setting.</b> Some investors know which IPOs are good. Others do not. All IPOs are priced the "
         "same.</p>"
         "<p><b>Step 1: informed demand.</b> Informed investors bid for the good issues and stay away from the bad "
         "ones. Good issues are heavily oversubscribed, bad ones are not.</p>"
         "<p><b>Step 2: the uninformed allocation.</b> An uninformed investor orders the same in every issue. He is "
         "rationed in the good ones and gets most of what he ordered in the bad ones. His portfolio leans towards the "
         "bad issues.</p>"
         "<p><b>Step 3: the price.</b> If every issue is priced at its expected value, the average issue is fairly "
         "priced, but the average share he receives is not: he loses money. In the lecture's example he loses about "
         "13.3%. To keep him in the market, the price must fall to where he breaks even, about 86.6 in that example. "
         "At that price the average first-day return across issues is about 15%, which is the underpricing we "
         "observe.</p>"
         "<p><b>Remember:</b> the average return across IPOs is not the return on the shares you get.</p>",
)

statisk(
    "inf-s14", tema="info", type="tolkning",
    hjelp=hjelp3(
        "This is check 5 run on the separating belief: what follows when the high type would also issue at the low "
        "type's price.",
        "Separating needs the low type to issue and the high type to stay out at α = I/(V<sub>L</sub> + I + NPV). "
        "A lower α means less dilution for the high type.",
        "<p><b>Step 1: which part of the separating belief failed?</b></p>"
        "<p><b>Step 2: if the high type issues at a price this unfavourable, what does it do at a better price?</b></p>"
        "<p><b>Step 3: which belief is left to test?</b></p>",
    ),
    q="<p>You price an equity issue at the separating belief, E[V | issue] = V<sub>L</sub>. At this price you find "
      "that the high type's old shareholders are better off issuing. What follows?</p>",
    alternativer=[
        R("The separating belief is not rational: the high type would issue too, so price at pooling and check "
          "again"),
        F("Separating holds, because the low type still gains from issuing at this price",
          "Check 5 needs both types to act as the belief says. You checked only one of them."),
        F("The high type issues and the low type stays out, so the equilibrium is separating the other way round",
          "The low type always issues: at a price based on an average or on its own value, its shares are never "
          "underpriced."),
        F("No equilibrium exists, so the firm cannot raise money for the project",
          "If the high type issues at a low price, ask what happens at a higher one. An equilibrium exists."),
    ],
    kort="<p><b>The separating belief fails.</b> The high type would mimic. Since it issues even at the worst price, "
         "it issues at the pooling price too: price at pooling and verify both types.</p>",
    full="<p><b>What check 5 asks.</b> A belief is an equilibrium only if, at the price it implies, every type does "
         "what the belief assumes. Separating assumes the low type issues and the high type stays out.</p>"
         "<p><b>Step 1: what failed.</b> At the separating price the high type is better off issuing. Its NPV is large "
         "enough to outweigh even this heavy dilution. So the belief \"only the low type issues\" is wrong.</p>"
         "<p><b>Step 2: the next belief.</b> If both types issue, investors price at the average, qV<sub>H</sub> + "
         "(1 − q)V<sub>L</sub>. That price is better for the high type than the separating one, so if it issued "
         "before, it issues now. The low type issues at any price. Pooling holds.</p>"
         "<p><b>Step 3: what it means.</b> Both types invest, so no NPV is lost. The high type's old owners still "
         "transfer value to the low type's through the new investors, who break even on average.</p>"
         "<p><b>The usual order.</b> In an exam, start from pooling, check the high type and move to separating only "
         "if it stays out. Then verify both types at the new price.</p>"
         "<p><b>Remember:</b> a belief survives only if every type behaves as it says.</p>",
)

statisk(
    "inf-s15", tema="info", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about what an equity issue announcement means in Myers-Majluf and why a firm might issue.",
        "An overvalued firm gains α(E[V] − V<sub>true</sub>) from selling shares. A price change at an "
        "announcement can be news about value that already existed.",
        "<p><b>Step 1: statement I.</b> When the low type issues, is any real value lost? What does the price "
        "learn?</p>"
        "<p><b>Step 2: statement II.</b> Where does the overvalued firm's gain from issuing come from? Does it need "
        "a project?</p>",
    ),
    q="<p>Consider two statements about Myers-Majluf.</p>"
      "<p>I. The share price falls when an issue is announced because issuing destroys value.</p>"
      "<p>II. A firm whose managers believe its shares are overpriced has a reason to issue even without a profitable "
      "project.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        F("Only I", "Statement I fails: the fall is news about the type, revealed by the decision to issue. Nothing "
                    "real is lost when the low type issues."),
        R("Only II"),
        F("Both I and II", "Statement I fails: the announcement reveals bad news that was already true. It does not "
                           "destroy value."),
        F("Neither", "Think about what an overpriced firm gains when it sells shares above their worth, project or "
                     "not."),
    ],
    kort="<p><b>Only II.</b> The price falls because the issue reveals that the shares were worth less, not because "
         "value is destroyed. Selling overpriced shares pays the old owners whatever the money is used for.</p>",
    full="<p><b>Statement I.</b> In a separating equilibrium only the low type issues. The issue tells investors which "
         "type the firm is, so the price drops to the low type's value. The low type was always worth that: the "
         "price learns, it does not fall because something was destroyed. In fact the low type gains the NPV when it "
         "invests. The only real loss in Myers-Majluf is the high type's skipped project. That one is never "
         "announced.</p>"
         "<p><b>Statement II.</b> If managers believe the shares are priced above their true value, every share sold "
         "transfers wealth from the new investors to the old owners. That gain does not depend on a project: the "
         "firm can hold the cash. This is the market-timing motive. Investors know it, which is exactly why they "
         "read an issue as bad news and why the price falls.</p>"
         "<p><b>Exam use.</b> In the 12% SEO question, say that the fall is the market revising its view of the "
         "assets. Do not say the issue destroyed 12% of the value.</p>"
         "<p><b>Remember:</b> an announcement return measures news. The overvalued firm's motive to issue does not "
         "need a project.</p>",
)

statisk(
    "inf-s16", tema="info", type="begrep",
    hjelp=hjelp3(
        "This is about the ways an underwriter can sell an IPO and what separates them.",
        "An IPO involves several separate choices: the pricing mechanism (book building or a fixed price), the size "
        "of the offering and who carries the risk that shares go unsold.",
        "<p><b>Step 1: match each option to one of these choices.</b></p>"
        "<p><b>Step 2: which choice do the terms firm commitment and best efforts describe?</b></p>",
    ),
    q="<p>What is the difference between a firm-commitment and a best-efforts IPO?</p>",
    alternativer=[
        R("Under firm commitment the bank buys the whole issue and bears the risk of unsold shares; under best efforts "
          "it only tries"),
        F("Under firm commitment the bank promises investors a first-day return; under best efforts it promises "
          "nothing",
          "No underwriter promises investors a return. The commitment is made to the issuing firm."),
        F("Under firm commitment the firm sells all its shares at once; under best efforts it sells them over "
          "several years",
          "Both are ways to sell one offering. They differ in who carries the risk that the shares do not sell."),
        F("Under firm commitment the price is fixed in advance; under best efforts it is set by book building",
          "The pricing mechanism, book building or a fixed price, is a separate choice from who bears the placement "
          "risk."),
    ],
    kort="<p><b>Who bears the placement risk.</b> Under firm commitment the bank buys the issue and resells it, so "
         "unsold shares are its problem. Under best efforts the firm bears that risk.</p>",
    full="<p><b>The underwriter's jobs.</b> The lecture lists them: preparing the issue, choosing its structure, "
         "choosing the mechanism (book building or a fixed price), marketing it through a roadshow, selling the "
         "shares and supporting the price after the IPO.</p>"
         "<p><b>Firm commitment.</b> The bank commits to buy the whole issue from the firm at the offer price less "
         "its fee and to resell it. If demand is weak, the bank is left holding the shares. The firm knows what it "
         "will raise. This is the standard arrangement for large IPOs.</p>"
         "<p><b>Best efforts.</b> The bank promises only to try. Shares it cannot sell are not sold, so the firm "
         "bears the risk of raising less.</p>"
         "<p><b>Why it matters.</b> Under firm commitment the bank has a strong reason to set a low price: it reduces "
         "the risk of being stuck with unsold shares. That is one reason underwriters benefit from underpricing, at "
         "the old owners' expense.</p>"
         "<p><b>Remember:</b> firm commitment moves the placement risk from the firm to the bank.</p>",
)

statisk(
    "inf-s17", tema="info", type="fakta",
    hjelp=hjelp3(
        "This is a term from the lecture's IPO example: the greenshoe option.",
        "An offering has an announced size. Some features of the deal change that size, others change who can sell "
        "afterwards or who bears the risk.",
        "<p><b>Step 1: what changed in the example?</b> The amount raised went up.</p>"
        "<p><b>Step 2: which option could do that?</b></p>",
    ),
    q="<p>In Alibaba's 2014 IPO the underwriters exercised a greenshoe option, which lifted the offering from about "
      "$21.8 billion to about $25 billion. What is a greenshoe option?</p>",
    alternativer=[
        R("The right to sell more shares than the offering first stated"),
        F("A lock-up that stops insiders from selling their shares for some months",
          "A lock-up limits insiders' sales after the IPO. It does not change the size of the offering."),
        F("The right of existing owners to buy new shares pro rata before outsiders",
          "That describes a rights offer, a seasoned issue sold to the existing shareholders."),
        F("The underwriter's promise to buy any unsold shares at the offer price",
          "That is firm commitment, which concerns the shares already in the offering."),
    ],
    kort="<p><b>An over-allotment option.</b> It lets the underwriters sell more shares than first stated when demand is "
         "strong, as in Alibaba's IPO.</p>",
    full="<p><b>The term.</b> A greenshoe option gives the underwriters the right to sell more shares than the "
         "offering first stated, typically up to a fixed percentage more. It is used when demand is strong. In the "
         "lecture's example, Alibaba's 2014 IPO on the NYSE, the initial capital of about $21.8 billion rose to about "
         "$25 billion once the greenshoe was exercised.</p>"
         "<p><b>The rest of the example.</b> The initial price range was $60 to $66, the shares opened at $92.70 and "
         "closed at $93.89 on the first day. Underwriting fees came to about $300 million.</p>"
         "<p><b>Why it exists.</b> It gives the underwriters flexibility. If demand is strong they can meet it. The "
         "extra shares are also linked to price support after the IPO, one of the underwriter's tasks.</p>"
         "<p><b>Do not confuse it with.</b> A lock-up, which restricts insiders' sales after the IPO. A rights offer, "
         "which sells new shares to existing owners in a seasoned issue. Firm commitment, which is about who bears "
         "the risk of unsold shares.</p>"
         "<p><b>Remember:</b> greenshoe means the right to sell more shares than first stated.</p>",
)

statisk(
    "inf-s18", tema="info", type="fakta",
    hjelp=hjelp3(
        "This is about the costs and benefits of being a publicly traded firm, as the lecture lists them.",
        "The stock market's primary role is raising capital. Its secondary role is trading: liquidity, "
        "diversification and price discovery. Listing also has costs.",
        "<p><b>Step 1: sort each option.</b> Is it a role the market plays for the firm, or a burden it puts on "
        "it?</p>"
        "<p><b>Step 2: pick the burden.</b></p>",
    ),
    q="<p>Which item does the lecture list as a <i>cost</i> of being a publicly traded firm?</p>",
    alternativer=[
        R("Market pressure that can push managers towards short-termism"),
        F("Price discovery, which gives managers feedback on their decisions",
          "Price discovery is a benefit of listing: the share price tells managers what investors think."),
        F("Liquidity, which lets the founders sell their shares when they want to",
          "Liquidity is a benefit: shareholders can trade and diversify."),
        F("Access to capital, which lets the firm issue shares to the public again later",
          "Raising capital is the stock market's primary role, a benefit of listing."),
    ],
    kort="<p><b>Short-termism.</b> Public market pressure can make managers chase the next quarter. The other three are "
         "benefits of listing.</p>",
    full="<p><b>Benefits of listing.</b> The lecture gives the stock market a primary role, capital formation: firms "
         "raise money by selling shares to the public. Its secondary role is trading. That gives shareholders "
         "liquidity, which lets them diversify. It also produces prices that give managers feedback on their "
         "decisions.</p>"
         "<p><b>Costs of listing.</b> The lecture lists: governance rules, regulatory burdens, public market pressure "
         "that may lead to short-termism, loss of control (which dual-class shares can limit), dispersed ownership "
         "that leads to free-riding among investors and the costs of the IPO itself. In the US these are typically "
         "underwriter fees of about 5.3% plus about 1.7% of other expenses.</p>"
         "<p><b>Exam use.</b> A verbal question on whether a firm should go public wants both sides: the access to "
         "capital and liquidity against the costs, the loss of control and the pressure from the market. The "
         "short-termism point connects to governance: targets and KPIs can push a manager the same way.</p>"
         "<p><b>Remember:</b> listing buys capital and liquidity and costs control, money and patience.</p>",
)

statisk(
    "inf-s19", tema="info", type="fakta",
    hjelp=hjelp3(
        "This is about dual-class shares: what they separate and the lecture's example.",
        "By default one share carries one vote, so voting power is proportional to ownership. A dual-class structure "
        "breaks that link.",
        "<p><b>Step 1: what is separated?</b> Votes from cash flow.</p>"
        "<p><b>Step 2: in which direction?</b> Insiders hold more votes than equity, or the reverse?</p>",
    ),
    q="<p>What does a dual-class share structure let a founding family do? What example does the lecture give?</p>",
    alternativer=[
        R("Keep control with a minority of the equity: the Ford family holds about 4% of the equity and 40% of the "
          "votes"),
        F("Keep the cash flow while giving up control: the Ford family holds about 40% of the equity and 4% of the "
          "votes",
          "The numbers are reversed. Dual-class shares let insiders hold more votes than equity, not the other way "
          "round."),
        F("Pay itself a higher dividend than outside owners: the Ford family's shares pay ten times the dividend",
          "Dual-class shares separate votes from cash flow. The cash flow rights are the ones outsiders buy."),
        F("Block any takeover by law: the Ford family can veto every bid with its 4% of the equity",
          "There is no legal veto. The family's power comes from its share of the votes."),
    ],
    kort="<p><b>Control with little equity.</b> One class carries more votes than the other. The Ford family holds about "
         "4% of the equity and controls about 40% of the votes.</p>",
    full="<p><b>The mechanism.</b> By default one share gives one vote. A dual-class structure creates share classes "
         "with no votes, ordinary votes or boosted votes (ten votes per share is common). Insiders keep the "
         "high-vote class and sell the rest. They can raise a lot of equity and still control the firm.</p>"
         "<p><b>The example.</b> The lecture's case is Ford Motor Company: the Ford family holds about 4% of the "
         "equity and controls about 40% of the voting power.</p>"
         "<p><b>Pros.</b> It protects a founder's long-term vision from short-term market pressure and from hostile "
         "bids, which matters for a firm that goes public to raise capital but does not want to lose control.</p>"
         "<p><b>Cons.</b> It weakens governance: outside shareholders bear most of the cash-flow risk but cannot "
         "discipline management through votes, proxy contests or a takeover. The market for corporate control is "
         "switched off. Insiders can pursue private benefits at the outsiders' expense.</p>"
         "<p><b>Remember:</b> dual-class shares separate votes from cash flow. Control stays with a minority of the "
         "equity.</p>",
)

statisk(
    "inf-s20", tema="info", type="begrep",
    hjelp=hjelp3(
        "This is the lecture's SEO example with new numbers. The low type gains from issuing in two ways. You need "
        "the part that comes from selling overpriced shares.",
        "α = I/(E[V] + I + NPV). The old owners' gain = NPV + α(E[V] − V<sub>true</sub>): the project plus the "
        "transfer from the new investors.",
        "<p><b>Step 1: the market's view.</b> Average the two values, add the cash and the NPV, find α.</p>"
        "<p><b>Step 2: the low type's payoff.</b> Its old owners keep 1 − α of its true value after the "
        "investment.</p>"
        "<p><b>Step 3: split the gain.</b> The project gives the NPV. The rest is the transfer.</p>",
    ),
    q="<p>A firm is worth $200 million or $50 million with equal probability; only its managers know which. It can "
      "invest $20 million today to receive $25 million tomorrow and must raise the money by selling new shares. "
      "Everyone is risk neutral and there is no discounting. Investors believe the firm issues whatever its value. "
      "The firm is in fact worth $50 million and issues. How much of its old shareholders' gain comes from selling "
      "overpriced shares rather than from the project, in $ million?</p>",
    alternativer=[
        R("$10.00 million", 10.0),
        F("$15.00 million", "This is the old owners' whole gain, 65 − 50. Part of it is the project's NPV of 5, which "
                            "they would get even at a fair price.", 15.0),
        F("$5.00 million", "This is the project's NPV, 25 − 20. The question asks for the other part of the gain.", 5.0),
        F("$20.00 million", "The stake times the gap between the two possible values, (2/15) × 150. The new investors "
                            "pay for the average firm, so the transfer is measured against the average, not against "
                            "the high value.", 20.0),
    ],
    tall=tallsvar(enhet="$ million"),
    kort="<p><b>$10.00 million.</b> E[V] = 125, so α = 20/(125 + 20 + 5) = 20/150. The low type keeps (13/15) × 75 = "
         "65, a gain of 15: NPV 5 plus (20/150) × (125 − 50) = 10 from overpriced shares.</p>",
    full="<p><b>The lecture's example.</b> Kurbatov's SEO example uses a firm worth 140 or 40 that invests 8 to get 10. "
         "Selling 8% of the firm raises the money. If the firm is really worth 40, its old owners get 0.92 × 50 = 46: "
         "a gain of 6, of which 2 is the project and 4 comes from selling overvalued shares. These are new numbers "
         "for the same logic.</p>"
         "<p><b>Step 1: the market's view.</b> E[V] = 0.5 × 200 + 0.5 × 50 = 125. After the issue investors see 125 "
         "+ 20 + 5 = 150 (the cash is invested and returns 25). α = 20/150 = 0.1333.</p>"
         "<p><b>Step 2: the low type's payoff.</b> True value after investing: 50 + 25 = 75. Old owners keep (13/15) "
         "× 75 = 65. Without the issue they have 50, so they gain 15.</p>"
         "<p><b>Step 3: split the gain.</b> The project's NPV is 25 − 20 = 5. The rest, 10, is the transfer: "
         "α(E[V] − V<sub>true</sub>) = (2/15) × (125 − 50) = <b>10.00</b>. The new investors paid 20 for a stake "
         "truly worth (2/15) × 75 = 10, so they lose 50% of their money, as in the lecture.</p>"
         "<p><b>First check.</b> 5 + 10 = 15, the gain from step 2 ✓. Two different routes, so this one can "
         "fail.</p>"
         "<p><b>Remember:</b> an overvalued issuer gains the NPV plus the transfer. That is why the market reads an "
         "issue as bad news.</p>",
)
