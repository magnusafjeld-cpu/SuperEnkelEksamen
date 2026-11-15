# -*- coding: utf-8 -*-
"""Eksamenstrening FIE402: byråkostnader ved gjeld (tema «agent»).

   Skribent 2 (kapitalstruktur). Spesifikasjonen er docs/fie402-trening-spek.md.
   Kildene er H2024 E4, PS1 E6–E8, forelesning 4 (gjeldsoverheng, seniorlån,
   gambling for resurrection, covenants, fri kontantstrøm), tavla til
   forelesning 4 og kjernepensum kj5.

   Familier (tallsvar):
     agt-rs1   byråkostnaden ved risikoskifting (H2024 E4b, PS1 E7)
     agt-ind1  gjeldsnivået som gir likegyldighet mellom to risikable prosjekter (H2024 E4c)
     agt-ovh1  gjeldsoverheng finansiert med ny egenkapital: eierens utbetaling (PS1 E6b)
     agt-ren1  reforhandling: høyeste nye pålydende eieren godtar (PS1 E6c)
     agt-spin1 spin-off som flytter gjelden: aksjonærenes gevinst (PS1 E8)
   Statiske: agt-s01 … agt-s22.
"""
from trening_lib import *  # noqa: F401,F403


NAVN = ["Brekkvik Oil", "Dalsnes Mining", "Eidsvåg Biotech", "Fosså Airlines", "Grimstad Metals",
        "Hovden Resorts", "Jølster Holding", "Krokeide Yards", "Lauvsnes Telecom", "Midtbø Robotics"]


def _hel(x):
    return abs(x - round(x)) < 1e-9


def _dx(x, maks=4):
    if _hel(rund(x, maks)):
        return 0
    t = f"{rund(x, maks):.{maks}f}".rstrip("0")
    return max(2, len(t.split(".")[1]))


def _a(x, maks=4):
    """Et beløp: heltall uten desimaler, ellers to til fire desimaler (kursets fire)."""
    return tall(x, _dx(x, maks))


def _des(*verdier):
    """Felles desimaler i ett spørsmål: 2 når alle er hele i øre, ellers 4."""
    return 2 if all(abs(v * 100 - round(v * 100)) < 1e-7 for v in verdier) else 4


def _w(x):
    t = f"{rund(x, 4):.4f}".rstrip("0")
    return tall(x, max(2, len(t.split(".")[1])))


def _mill(x, val, d):
    return penger(x, d, val) + NBSP + "million"


# ---------------------------------------------------------------------------
# agt-rs1 · Byråkostnaden ved risikoskifting (H2024 E4b, PS1 E7)
# ---------------------------------------------------------------------------
@familie("agt-rs1", tema="agent", antall=5, tittel="The agency cost of risk shifting",
         hjelp=hjelp3(
             "This is risk shifting. With risky debt, management picks the project that is best for the "
             "shareholders. You need the value lost compared with the first-best project.",
             "Equity = E[max(CF − K, 0)] state by state. Management picks the highest equity value. Agency cost = "
             "V(first best) − V(chosen), where the first best has the highest expected payoff.",
             "<p><b>Step 1: the first best.</b> Expected payoff of each project. An all-equity firm takes the "
             "highest.</p>"
             "<p><b>Step 2: equity values.</b> In each state the shareholders get the cash flow minus the face "
             "value, or zero. Then take the expectation.</p>"
             "<p><b>Step 3: the choice.</b> The project with the highest equity value.</p>"
             "<p><b>Step 4: the cost.</b> First-best firm value minus the chosen project's firm value.</p>"
             "<p><b>Watch out:</b> the agency cost is the value destroyed, not the transfer between creditors and "
             "shareholders.</p>",
         ))
def _(r):
    mål = "B" if r.random() < 0.5 else "C"                 # halvparten der B vinner, som H2024 E4b
    navn = r.choice(NAVN)
    val = r.choice(["NOK", "$"])
    a = r.choice([50, 60, 70, 75, 80])
    dB = r.choice([2, 3, 4, 5, 6])
    EVB = a - dB
    loB = round(a * r.choice([0.15, 0.2, 0.25, 0.3, 0.35]))
    hiB = 2 * EVB - loB
    pC = r.choice([0.2, 0.25])
    dC = r.choice([12, 15, 20, 25, 30])
    EVC = a - dC
    hiC = EVC / pC
    if not _hel(hiC):
        raise Avvis("stygg C")
    hiC = round(hiC)
    if mål == "B":
        K = loB + 2 * dB + r.choice([1, 2, 3, 4, 5])
    else:
        K = loB + r.choice([12, 16, 20, 25, 30])
    if K >= a - 1:
        raise Avvis("gjelden for stor")

    E = {"A": max(a - K, 0), "B": 0.5 * max(hiB - K, 0) + 0.5 * max(loB - K, 0), "C": pC * max(hiC - K, 0)}
    V = {"A": a, "B": EVB, "C": EVC}
    valg = max(E, key=E.get)
    rest = sorted(E.values(), reverse=True)
    if valg != mål or rest[0] - rest[1] < 0.5:
        raise Avvis("ikke det valget varianten skal ha")
    annen = "C" if valg == "B" else "B"
    kost = a - V[valg]
    D = {k: V[k] - E[k] for k in E}

    f_ek = E[valg] - E["A"]                                # aksjonærenes gevinst
    f_kred = D["A"] - D[valg]                              # kreditorenes tap
    f_annen = a - V[annen]                                 # feil prosjekt
    ulike(kost, f_ek, f_kred, f_annen, rel=0.02)
    dd = 0 if all(_hel(x) for x in (kost, f_ek, f_kred, f_annen)) else 2

    q = (f"<p>{navn} must choose exactly one of three projects. Project A pays {_mill(a, val, 0)} for sure. "
         f"Project B pays {_mill(hiB, val, 0)} or {_mill(loB, val, 0)}, with probability 0.5 each. Project C pays "
         f"{_mill(hiC, val, 0)} with probability {_w(pC)} and nothing otherwise. The firm has debt with a face value "
         f"of {_mill(K, val, 0)}, due when the project pays off. Investors are risk neutral, the discount rate is "
         f"zero and management acts in the shareholders' interest.</p>"
         f"<p>What is the agency cost of the debt, in millions?</p>")

    alternativer = [
        R(_mill(kost, val, dd), kost),
        F(_mill(f_ek, val, dd),
          f"This is what the shareholders gain by choosing {valg} over A, {_a(E[valg])} − {_a(E['A'])}. It is a "
          f"transfer from the creditors, not the value the firm loses.", f_ek),
        F(_mill(f_kred, val, dd),
          f"This is what the creditors lose when {valg} replaces A, {_a(D['A'])} − {_a(D[valg])}. Part of it goes to "
          f"the shareholders, so it overstates the value destroyed.", f_kred),
        F(_mill(f_annen, val, dd),
          f"This is the cost of project {annen}, which management does not choose. Compare the equity values: "
          f"the shareholders prefer {valg}.", f_annen),
    ]

    kort = (f"<p><b>{_mill(kost, val, dd)}.</b> Equity: A {_a(E['A'])}, B {_a(E['B'])}, C {_a(E['C'])}, so "
            f"management picks {valg}. The first best is A, worth {a}. Agency cost = {a} − {_a(V[valg])} = "
            f"{_a(kost)}.</p>")

    full = (
        f"<p><b>Risk shifting.</b> With risky debt the shareholders hold a call on the firm with strike K = {K}. "
        f"They keep the upside and leave losses below K to the creditors, so they may prefer a riskier project "
        f"with a lower expected value. The agency cost is the value that disappears because of that choice.</p>"
        f"<p><b>Step 1: the first best.</b> Expected payoffs: A {a}, B 0.5 × {hiB} + 0.5 × {loB} = {EVB}, C "
        f"{_w(pC)} × {hiC} = {EVC}. An all-equity firm takes A.</p>"
        f"<p><b>Step 2: equity values.</b> A: {a} − {K} = {_a(E['A'])}. B: 0.5 × ({hiB} − {K}) + 0.5 × "
        f"max({loB} − {K}, 0) = {_a(E['B'])}. C: {_w(pC)} × ({hiC} − {K}) = {_a(E['C'])}.</p>"
        f"<p><b>Step 3: the choice.</b> The shareholders get most from {valg}, so management picks it.</p>"
        f"<p><b>Step 4: the cost.</b> {a} − {_a(V[valg])} = <b>{_a(kost)}</b>.</p>"
        f"<p><b>Check 3.</b> Moving from A to {valg}: creditors {_a(D[valg])} − {_a(D['A'])} = "
        f"{_a(D[valg] - D['A'])}, shareholders {_a(E[valg])} − {_a(E['A'])} = {_a(E[valg] - E['A'])}. Sum "
        f"{_a(V[valg] - a)}, the NPV of the switch. Debt plus equity is the cash flow in every state, so this "
        f"check catches slips in the table only.</p>"
        f"<p><b>Remember:</b> agency cost = first-best value − chosen value. Rational creditors price it in, so "
        f"the shareholders bear it when they borrow.</p>"
    )
    return sporsmal(q, alternativer, kort, full, tall=tallsvar(enhet=f"{val} million"))


# ---------------------------------------------------------------------------
# agt-ind1 · Gjeldsnivået som gir likegyldighet mellom B og C (H2024 E4c)
# ---------------------------------------------------------------------------
@familie("agt-ind1", tema="agent", antall=5, tittel="The face value at which management is indifferent",
         hjelp=hjelp3(
             "This is how risk shifting changes with leverage. You need the face value of debt at which the "
             "shareholders like two risky projects equally.",
             "Write each equity value as a function of the face value K, E = Σ p × max(CF − K, 0), inside a range "
             "of K where the same states default. Set the two equal and solve for K.",
             "<p><b>Step 1: guess the region.</b> Assume the medium project's low state defaults and the high "
             "states do not.</p>"
             "<p><b>Step 2: the two lines.</b> Each equity value is then a probability times (high payoff − "
             "K).</p>"
             "<p><b>Step 3: solve</b> for K.</p>"
             "<p><b>Step 4: check the region.</b> The answer must lie where you assumed. If not, try the other "
             "region.</p>"
             "<p><b>Watch out:</b> a solution outside its assumed region is not a solution.</p>",
         ))
def _(r):
    navn = r.choice(NAVN)
    val = r.choice(["NOK", "$"])
    a = r.choice([50, 60, 70, 75])
    pB = 0.5
    hiB = r.choice([80, 90, 100, 110, 120])
    loB = r.choice([10, 16, 20, 24, 30])
    pC = r.choice([0.2, 0.25])
    hiC = r.choice([150, 160, 180, 200, 240])
    EVB = pB * hiB + (1 - pB) * loB
    EVC = pC * hiC
    if not a > EVB > EVC:
        raise Avvis("rekkefølgen A > B > C holder ikke")
    Ks = (pB * hiB - pC * hiC) / (pB - pC)
    if not loB < Ks < hiB or Ks <= 0:
        raise Avvis("likegyldigheten ligger utenfor området")
    if max(a - Ks, 0) >= pB * (hiB - Ks):
        raise Avvis("A er fortsatt best ved K*")

    f_omr = (EVB - pC * hiC) / (1 - pC)                    # regionen ikke sjekket
    f_lo = loB                                             # der B begynner å misligholde
    f_ab = (a - pB * hiB) / (1 - pB)                       # likegyldighet mellom A og B
    if f_ab <= 0 or f_omr <= 0:
        raise Avvis("negativ felle")
    ulike(Ks, f_omr, f_lo, f_ab, rel=0.02)
    dd = _des(Ks, f_omr, f_lo, f_ab)

    q = (f"<p>{navn} must choose exactly one of three projects. Project A pays {_mill(a, val, 0)} for sure. "
         f"Project B pays {_mill(hiB, val, 0)} or {_mill(loB, val, 0)}, with probability 0.5 each. Project C pays "
         f"{_mill(hiC, val, 0)} with probability {_w(pC)} and nothing otherwise. Investors are risk neutral, the "
         f"discount rate is zero and management acts in the shareholders' interest.</p>"
         f"<p>At what face value of debt, in millions, are the shareholders indifferent between projects B and C?</p>")

    alternativer = [
        R(_mill(Ks, val, dd), Ks),
        F(_mill(f_omr, val, dd),
          f"B's equity written as {_a(EVB)} − K, as if B's low state still paid the debt in full. In the region "
          f"where the two lines cross, B's low state defaults, so this solution lies outside its own region.", f_omr),
        F(_mill(f_lo, val, dd),
          f"This is where B's low state starts to default, {loB}. Below it B's equity falls one for one with K. "
          f"The indifference point is where the two equity lines cross.", f_lo),
        F(_mill(f_ab, val, dd),
          f"This is where A and B give the same equity value, ({a} − {_w(pB)} × {hiB})/(1 − {_w(pB)}). The question "
          f"compares B with C.", f_ab),
    ]

    kort = (f"<p><b>{_mill(Ks, val, dd)}.</b> With B's low state in default: {_w(pB)}({hiB} − K) = "
            f"{_w(pC)}({hiC} − K), so K = ({_a(pB * hiB)} − {_a(pC * hiC)})/({_w(pB)} − {_w(pC)}) = {_a(Ks)}, which "
            f"lies between {loB} and {hiB}.</p>")

    EB = pB * (hiB - Ks)
    EC = pC * (hiC - Ks)
    full = (
        f"<p><b>Why leverage matters.</b> The more debt, the deeper out of the money the shareholders' call is. A "
        f"project whose payoff sits in one very high state keeps its equity value best as K rises. So past some "
        f"face value the shareholders switch from the medium gamble B to the long shot C. The agency cost "
        f"jumps (H2024 Exercise 4c).</p>"
        f"<p><b>Step 1: the region.</b> Assume {loB} &lt; K &lt; {hiB}: B's low state defaults, its high state "
        f"does not. C's zero state always defaults.</p>"
        f"<p><b>Step 2: the two lines.</b> E<sub>B</sub> = {_w(pB)}({hiB} − K). E<sub>C</sub> = {_w(pC)}({hiC} − "
        f"K).</p>"
        f"<p><b>Step 3: solve.</b> {_a(pB * hiB)} − {_w(pB)}K = {_a(pC * hiC)} − {_w(pC)}K, so {_w(pB - pC)}K = "
        f"{_a(pB * hiB - pC * hiC)} and K = <b>{_a(Ks)}</b>.</p>"
        f"<p><b>Step 4: the region holds.</b> {_a(Ks)} lies between {loB} and {hiB}. At that K: E<sub>B</sub> = "
        f"{_a(EB)}, E<sub>C</sub> = {_a(EC)} and E<sub>A</sub> = {_a(max(a - Ks, 0))}, so B and C really are the "
        f"two contenders. This check can fail: a K outside the region would not give equal values.</p>"
        f"<p><b>Beyond K*.</b> E<sub>B</sub> falls by {_w(pB)} per unit of debt, E<sub>C</sub> by only "
        f"{_w(pC)}. Above {_a(Ks)} management picks C and the agency cost rises to {a} − {_a(EVC)} = "
        f"{_a(a - EVC)}.</p>"
        f"<p><b>Remember:</b> set the equity lines equal inside a region, then check the region.</p>"
    )
    return sporsmal(q, alternativer, kort, full, tall=tallsvar(enhet=f"{val} million"))


# ---------------------------------------------------------------------------
# agt-ovh1 · Gjeldsoverheng finansiert med ny egenkapital (PS1 E6b, forelesning 4 s. 11)
# ---------------------------------------------------------------------------
@familie("agt-ovh1", tema="agent", antall=5, tittel="Debt overhang when new shareholders fund the project",
         hjelp=hjelp3(
             "This is debt overhang with a project funded by new shareholders. You need what the old owner ends "
             "up with if he goes ahead.",
             "New investors break even: x × E<sub>1</sub> = I, so x = I / E<sub>1</sub>. The owner keeps (1 − x) × "
             "E<sub>1</sub> = E<sub>1</sub> − I, where E<sub>1</sub> is the equity value with the project.",
             "<p><b>Step 1: equity with the project.</b> In each state the cash flow plus the project's payoff "
             "minus the face value, or zero.</p>"
             "<p><b>Step 2: the new investors' share.</b> The investment divided by that equity value.</p>"
             "<p><b>Step 3: the owner's payoff.</b> What is left of the equity, then compare with the equity "
             "without the project.</p>"
             "<p><b>Watch out:</b> x is a share of the equity, not of the firm.</p>",
         ))
def _(r):
    navn = r.choice(NAVN)
    val = r.choice(["NOK", "$"])
    p = r.choice([0.4, 0.5, 0.6])
    hi = r.choice([150, 160, 180, 200])
    lo = r.choice([40, 50, 60])
    K = r.choice([90, 100, 110, 120])
    I = r.choice([20, 24, 25, 30])
    De = I + r.choice([4, 6, 8, 10])
    if not lo + De < K < hi:
        raise Avvis("gjelden blir ikke værende risikabel")
    if not p * De < I:
        raise Avvis("ingen gjeldsoverheng")
    E0 = p * (hi - K)
    E1 = p * (hi + De - K)
    if E1 <= I:
        raise Avvis("prosjektet kan ikke finansieres")
    x = I / E1
    eier = E1 - I
    V1 = p * (hi + De) + (1 - p) * (lo + De)

    f_E1 = E1                                              # eieren beholder alt
    f_V = (1 - I / V1) * E1                                # x regnet på firmaet
    f_npv = E0 + De - I                                    # NPV-en kreditert eieren
    ulike(eier, f_E1, f_V, f_npv, rel=0.02)
    dd = _des(eier, f_E1, f_V, f_npv)

    D0 = p * K + (1 - p) * lo
    D1 = p * K + (1 - p) * (lo + De)
    q = (f"<p>{navn} will have a cash flow of {_mill(hi, val, 0)} next year with probability {_w(p)} and "
         f"{_mill(lo, val, 0)} otherwise. It owes debt with a face value of {_mill(K, val, 0)}, due then. Its sole "
         f"owner has no cash. A project costing {_mill(I, val, 0)} today would add {_mill(De, val, 0)} to the "
         f"cash flow in both states. The owner can fund it only by selling new shares to outside investors in a "
         f"competitive market. Everyone is risk neutral and there is no discounting.</p>"
         f"<p>If the owner sells the new shares and takes the project, what is his own stake worth, in "
         f"millions?</p>")

    alternativer = [
        R(_mill(eier, val, dd), eier),
        F(_mill(f_E1, val, dd),
          f"The equity value with the project, {_a(E1)}, all of it kept by the owner. That leaves the new "
          f"investors with nothing for their money.", f_E1),
        F(_mill(f_V, val, dd),
          f"The new investors' share computed on the firm, {I}/{_a(V1)}. The firm's value includes the "
          f"creditors' claim, which the new investors do not buy.", f_V),
        F(_mill(f_npv, val, dd),
          f"The project's NPV of {De - I} added to the owner's {_a(E0)}. With risky debt the creditors take part "
          f"of the gain, so the owner does not capture the NPV.", f_npv),
    ]

    kort = (f"<p><b>{_mill(eier, val, dd)}.</b> E<sub>1</sub> = {_w(p)} × ({hi} + {De} − {K}) = {_a(E1)}. x = "
            f"{I}/{_a(E1)} = {_w(x)}. Owner: (1 − x) × {_a(E1)} = {_a(E1)} − {I} = {_a(eier)}, against "
            f"{_a(E0)} without the project.</p>")

    full = (
        f"<p><b>Debt overhang.</b> The project has a positive NPV, {De} − {I} = {De - I}. But in the bad state "
        f"the extra cash flow goes to the creditors, who are not paid in full either way. The shareholders "
        f"put up the whole investment and get only part of the gain (PS1 Exercise 6, lecture 4).</p>"
        f"<p><b>Step 1: equity with the project.</b> Good state: {hi} + {De} − {K} = {hi + De - K}. Bad state: "
        f"{lo} + {De} = {lo + De} &lt; {K}, so zero. E<sub>1</sub> = {_w(p)} × {hi + De - K} = {_a(E1)}.</p>"
        f"<p><b>Step 2: the new investors.</b> They pay {I} and break even: x = {I}/{_a(E1)} = {_w(x)}.</p>"
        f"<p><b>Step 3: the owner.</b> (1 − {_w(x)}) × {_a(E1)} = <b>{_a(eier)}</b>. Without the project he has "
        f"E<sub>0</sub> = {_w(p)} × ({hi} − {K}) = {_a(E0)}, so he turns the project down. Issuing shares is the "
        f"same as paying himself: (1 − x)E<sub>1</sub> = E<sub>1</sub> − I.</p>"
        f"<p><b>Check 3.</b> Creditors: {_w(p)} × {K} + {_w(1 - p)} × {lo + De} = {_a(D1)} against {_a(D0)}, a "
        f"gain of {_a(D1 - D0)}. Owner: {_a(eier)} − {_a(E0)} = {_a(eier - E0)}. Sum {_a(D1 - D0 + eier - E0)} = "
        f"NPV. This check can fail: a wrong x would break the sum.</p>"
        f"<p><b>Remember:</b> the owner invests only if NPV exceeds the creditors' windfall. Here it does not, so "
        f"a positive-NPV project is lost.</p>"
    )
    return sporsmal(q, alternativer, kort, full, tall=tallsvar(enhet=f"{val} million"))


# ---------------------------------------------------------------------------
# agt-ren1 · Reforhandling: høyeste nye pålydende eieren godtar (PS1 E6c)
# ---------------------------------------------------------------------------
@familie("agt-ren1", tema="agent", antall=5, tittel="Renegotiating the face value to end debt overhang",
         hjelp=hjelp3(
             "This is the cure for debt overhang: cutting the face value of the debt. You need the highest new "
             "face value at which the owner would still fund and take the project.",
             "With new face value K<sub>1</sub> the owner invests if E(K<sub>1</sub>) − I ≥ E<sub>0</sub>, where "
             "E<sub>0</sub> is his equity without the project under the old debt. The creditors accept if "
             "D(K<sub>1</sub>) ≥ D<sub>0</sub>.",
             "<p><b>Step 1: the owner's outside option.</b> Equity without the project, at the old face value.</p>"
             "<p><b>Step 2: equity with the project at K<sub>1</sub>.</b> Assume the bad state still defaults.</p>"
             "<p><b>Step 3: solve</b> E(K<sub>1</sub>) − I = E<sub>0</sub> for K<sub>1</sub>.</p>"
             "<p><b>Step 4: check the region.</b> K<sub>1</sub> must lie above the bad-state cash flow.</p>"
             "<p><b>Watch out:</b> the owner's ceiling is not the creditors' floor.</p>",
         ))
def _(r):
    navn = r.choice(NAVN)
    val = r.choice(["NOK", "$"])
    p = r.choice([0.4, 0.5, 0.6])
    hi = r.choice([150, 160, 180, 200])
    lo = r.choice([30, 40, 50, 60])
    K = r.choice([90, 100, 110, 120])
    I = r.choice([20, 24, 25, 30])
    De = I + r.choice([4, 6, 8, 10])
    if not lo + De < K < hi or not p * De < I:
        raise Avvis("ingen gjeldsoverheng med risikabel gjeld")
    E0 = p * (hi - K)
    D0 = p * K + (1 - p) * lo
    V1 = p * (hi + De) + (1 - p) * (lo + De)
    Kmax = hi + De - (E0 + I) / p
    if not lo + De < Kmax < K:
        raise Avvis("taket ligger utenfor området")
    # kreditorenes gulv: D(K1) = p·K1 + (1 − p)·min(lo + Δ, K1) ≥ D0
    Kmin = D0 if D0 <= lo + De else (D0 - (1 - p) * (lo + De)) / p
    if Kmin > Kmax:
        raise Avvis("ingen avtale mulig")

    f_gulv = Kmin                                          # kreditorenes gulv
    f_utenI = hi + De - E0 / p                             # investeringen glemt
    f_trygg = V1 - I - E0                                  # begge tilstander antatt å betale
    ulike(Kmax, f_gulv, f_utenI, f_trygg, rel=0.02)
    dd = _des(Kmax, f_gulv, f_utenI, f_trygg)

    q = (f"<p>{navn} will have a cash flow of {_mill(hi, val, 0)} next year with probability {_w(p)} and "
         f"{_mill(lo, val, 0)} otherwise. It owes debt with a face value of {_mill(K, val, 0)}, due then. Its sole "
         f"owner has no cash. A project costing {_mill(I, val, 0)} today would add {_mill(De, val, 0)} to the "
         f"cash flow in both states. It can be funded only by selling new shares in a competitive market. Everyone "
         f"is risk neutral and there is no discounting. At the current face value the owner would not take the "
         f"project.</p>"
         f"<p>The owner asks the creditors to cut the face value to K<sub>1</sub> if the project goes ahead. What "
         f"is the highest K<sub>1</sub>, in millions, at which the owner would still fund and take the "
         f"project?</p>")

    alternativer = [
        R(_mill(Kmax, val, dd), Kmax),
        F(_mill(f_gulv, val, dd),
          "This is the lowest face value the creditors would accept, the point where their claim is worth what it "
          "is worth today. The question asks for the owner's limit.", f_gulv),
        F(_mill(f_utenI, val, dd),
          f"The investment left out: {_w(p)}({hi} + {De} − K<sub>1</sub>) = {_a(E0)}. This comparison ignores "
          f"what funding the project costs the owner.", f_utenI),
        F(_mill(f_trygg, val, dd),
          f"Both states assumed to pay K<sub>1</sub> in full: {_a(V1)} − K<sub>1</sub> − {I} = {_a(E0)}. At that "
          f"face value the bad state still defaults, so the assumption fails.", f_trygg),
    ]

    kort = (f"<p><b>{_mill(Kmax, val, dd)}.</b> E<sub>0</sub> = {_w(p)} × ({hi} − {K}) = {_a(E0)}. With the bad "
            f"state in default: {_w(p)}({hi + De} − K<sub>1</sub>) − {I} = {_a(E0)}, so K<sub>1</sub> = {hi + De} − "
            f"{_a(E0 + I)}/{_w(p)} = {_a(Kmax)}.</p>")

    E1max = p * (hi + De - Kmax)
    D1max = p * Kmax + (1 - p) * (lo + De)
    full = (
        f"<p><b>Why renegotiation can work.</b> The project creates {De} − {I} = {De - I}. Under the old debt the "
        f"creditors would take more than that, so the owner says no and the value is lost. Cutting the face value "
        f"hands part of the creditors' windfall back to the owner. Both sides can gain, because the NPV is there "
        f"to share (PS1 Exercise 6c).</p>"
        f"<p><b>Step 1: the owner's outside option.</b> E<sub>0</sub> = {_w(p)} × ({hi} − {K}) = {_a(E0)}.</p>"
        f"<p><b>Step 2: equity with the project.</b> With K<sub>1</sub> above {lo + De} the bad state defaults: "
        f"E(K<sub>1</sub>) = {_w(p)}({hi + De} − K<sub>1</sub>). Funding with new shares costs him I, as if he "
        f"paid himself.</p>"
        f"<p><b>Step 3: solve.</b> {_w(p)}({hi + De} − K<sub>1</sub>) − {I} = {_a(E0)} gives K<sub>1</sub> = "
        f"<b>{_a(Kmax)}</b>.</p>"
        f"<p><b>Step 4: the region and the deal.</b> {_a(Kmax)} &gt; {lo + De}, so the bad state does default, as "
        f"assumed. The creditors accept any K<sub>1</sub> that keeps their claim at {_a(D0)} or more, from "
        f"{_a(Kmin)} up. Any K<sub>1</sub> between {_a(Kmin)} and {_a(Kmax)} works for both.</p>"
        f"<p><b>Check 3.</b> At K<sub>1</sub> = {_a(Kmax)}: creditors {_a(D1max)} − {_a(D0)} = {_a(D1max - D0)}, "
        f"owner {_a(E1max - I)} − {_a(E0)} = {_a(E1max - I - E0)}. Sum {_a(D1max - D0 + E1max - I - E0)} = NPV. "
        f"The split moves with K<sub>1</sub>, the sum does not.</p>"
        f"<p><b>Remember:</b> the owner's ceiling solves E(K<sub>1</sub>) − I = E<sub>0</sub>. The creditors' floor "
        f"solves D(K<sub>1</sub>) = D<sub>0</sub>.</p>"
    )
    return sporsmal(q, alternativer, kort, full, tall=tallsvar(enhet=f"{val} million"))


# ---------------------------------------------------------------------------
# agt-spin1 · Spin-off som flytter gjelden (PS1 E8, forelesning 4 s. 18)
# ---------------------------------------------------------------------------
@familie("agt-spin1", tema="agent", antall=5, tittel="A spin-off that leaves the debt with the risky division",
         hjelp=hjelp3(
             "This is risk shifting by restructuring. The firm splits in two and loads all its debt on one "
             "division. You need the change in the shareholders' wealth.",
             "Before: D and E from the combined cash flow. After: debt backed by one division only, D = Σ p × "
             "min(CF, K), the other division debt-free. Change in equity = E<sub>after</sub> − "
             "E<sub>before</sub>.",
             "<p><b>Step 1: before.</b> Add the two divisions state by state and split between debt and "
             "equity.</p>"
             "<p><b>Step 2: after.</b> Subtract the lost synergies. Try the debt on each division and keep the "
             "one the shareholders prefer.</p>"
             "<p><b>Step 3: the change.</b> Equity after minus equity before.</p>"
             "<p><b>Watch out:</b> the shareholders' gain is not the creditors' loss and not the value "
             "destroyed.</p>",
         ))
def _(r):
    navn = r.choice(NAVN)
    val = r.choice(["NOK", "$"])
    p = 0.5
    hiX = r.choice([140, 150, 160, 180])
    loX = r.choice([30, 40, 50])
    hiY = r.choice([110, 120, 130])
    loY = r.choice([60, 70, 80])
    K = r.choice([80, 90, 100, 110, 120])
    s = r.choice([5, 8, 10])
    if loX + loY < K:
        raise Avvis("gjelden er ikke trygg før")
    if not loX - s < K < hiX - s or not loY - s < K < hiY - s:
        raise Avvis("gjelden blir ikke risikabel på en enkelt divisjon")
    Ebef = p * (hiX + hiY - K) + (1 - p) * (loX + loY - K)

    def etter(hiG, loG, hiF, loF):
        """Gjelden på divisjonen G, F er gjeldfri. Gir (D, E)."""
        D = p * min(hiG - s, K) + (1 - p) * min(loG - s, K)
        EG = p * max(hiG - s - K, 0) + (1 - p) * max(loG - s - K, 0)
        EF = p * (hiF - s) + (1 - p) * (loF - s)
        return D, EG + EF

    DX, EX = etter(hiX, loX, hiY, loY)
    DY, EY = etter(hiY, loY, hiX, loX)
    if EX <= EY:
        raise Avvis("gjelden bør ligge på den risikable divisjonen")
    gev = EX - Ebef
    if gev <= 0:
        raise Avvis("aksjonærene taper")
    f_kred = K - DX                                        # kreditorenes tap
    f_syn = 2 * s                                          # verditapet
    f_Y = EY - Ebef                                        # gjelden på den trygge divisjonen
    ulike(gev, f_kred, f_syn, f_Y, abs(f_Y), rel=0.02)
    dd = _des(gev, f_kred, f_syn, f_Y)

    q = (f"<p>{navn} has two divisions. Division X pays {_mill(hiX, val, 0)} in a boom and {_mill(loX, val, 0)} "
         f"in a bust. Division Y pays {_mill(hiY, val, 0)} in a boom and {_mill(loY, val, 0)} in a bust. Boom and "
         f"bust are equally likely. The firm has debt with a face value of {_mill(K, val, 0)}, due next year and "
         f"backed by both divisions. Investors are risk neutral, the discount rate is zero and there are no "
         f"taxes.</p>"
         f"<p>The CEO plans a spin-off: the divisions become separate firms and all of the debt stays with one of "
         f"them, chosen to maximise the shareholders' wealth. Lost synergies cut each division's cash flow by "
         f"{_mill(s, val, 0)} in every state. By how much does the spin-off change the shareholders' wealth, in "
         f"millions?</p>")

    alternativer = [
        R(_mill(gev, val, dd), gev),
        F(_mill(f_kred, val, dd),
          f"This is what the creditors lose, {K} − {_a(DX)}. Part of their loss is value destroyed, not value "
          f"passed to the shareholders.", f_kred),
        F(_mill(f_syn, val, dd),
          f"This is the value destroyed by the lost synergies, 2 × {s}. It is a loss to the firm as a whole, not "
          f"the change in the shareholders' wealth.", f_syn),
        F(_mill(f_Y, val, dd),
          "This puts the debt on division Y, the safer one. The shareholders gain more by leaving the debt with "
          "the riskier division, where its bust state defaults.", f_Y),
    ]

    kort = (f"<p><b>{_mill(gev, val, dd)}.</b> Before: debt safe, E = {_a(Ebef)}. After, debt on X: D = 0.5 × {K} + "
            f"0.5 × {loX - s} = {_a(DX)}, E = {_a(EX)}. Change {_a(EX)} − {_a(Ebef)} = {_a(gev)}.</p>")

    full = (
        f"<p><b>The mechanism.</b> Together the divisions always cover the debt, so it is safe. Split up, the debt "
        f"is backed by one division only. Put it on the risky one and it defaults in the bust. The shareholders "
        f"keep the safe division whole. The creditors lose. The lost synergies destroy value on top (PS1 "
        f"Exercise 8, Marriott in 1993).</p>"
        f"<p><b>Step 1: before.</b> Boom {hiX + hiY}, bust {loX + loY}, both above {K}: D = {K}. E = 0.5 × "
        f"{hiX + hiY - K} + 0.5 × {loX + loY - K} = {_a(Ebef)}.</p>"
        f"<p><b>Step 2: after, debt on X.</b> X pays {hiX - s} or {loX - s}. D = 0.5 × {K} + 0.5 × {loX - s} = "
        f"{_a(DX)}. Equity in X: 0.5 × {hiX - s - K} = {_a(0.5 * (hiX - s - K))}. Y is debt-free: 0.5 × "
        f"{hiY - s} + 0.5 × {loY - s} = {_a(0.5 * (hiY - s) + 0.5 * (loY - s))}. Total equity {_a(EX)}. With the "
        f"debt on Y instead, equity would be {_a(EY)}, so X it is.</p>"
        f"<p><b>Step 3: the change.</b> {_a(EX)} − {_a(Ebef)} = <b>{_a(gev)}</b>.</p>"
        f"<p><b>Check 3.</b> Creditors {_a(DX)} − {K} = {_a(DX - K)}, shareholders +{_a(gev)}. Sum "
        f"{_a(DX - K + gev)} = −2 × {s}, the synergies lost. Value falls, yet the shareholders gain.</p>"
        f"<p><b>Remember:</b> who wins and who loses: the shareholders gain, the creditors lose more and the firm "
        f"is worth less. A covenant against it makes the debt cheaper up front.</p>"
    )
    return sporsmal(q, alternativer, kort, full, tall=tallsvar(enhet=f"{val} million"))


# ===========================================================================
# Statiske spørsmål
# ===========================================================================

# agt-s01 · Navnet på mekanismen (H2024 E4b)
statisk(
    "agt-s01", tema="agent", type="begrep",
    hjelp=hjelp3(
        "This is about naming the mechanism, which the examiner rewards: what a levered firm does when it swaps a "
        "safe project for a riskier one.",
        "With risky debt, equity = max(V − K, 0) is a call on the firm. Shareholders gain from risk at the "
        "creditors' expense, even when the riskier project is worth less.",
        "<p><b>Step 1: what changes.</b> The risk of the assets goes up, the expected value goes down.</p>"
        "<p><b>Step 2: who gains.</b> The shareholders, through the upside.</p>"
        "<p><b>Step 3: the name.</b> Which agency cost of debt is about choosing the assets, not about skipping a "
        "project?</p>"
        "<p><b>Watch out:</b> debt overhang is the opposite case, where a good project is turned down.</p>",
    ),
    q="<p>A firm with risky debt switches from a safe project to a riskier one with a lower expected payoff. The "
      "switch raises the value of its equity and lowers the value of its debt.</p>"
      "<p>What is this mechanism called?</p>",
    alternativer=[
        R("Risk shifting, also called asset substitution"),
        F("Debt overhang, also called underinvestment",
          "Debt overhang is turning down a positive-NPV project because the creditors would take much of the "
          "gain. Here a project is not skipped, it is swapped for a riskier one."),
        F("The free cash flow problem of empire building",
          "That is a conflict between managers and shareholders: spending spare cash on growth for its own sake. "
          "Here the conflict is between shareholders and creditors."),
        F("The coinsurance effect of combining cash flows",
          "Coinsurance makes debt safer when two firms with imperfectly correlated cash flows merge. Here the "
          "debt becomes riskier."),
    ],
    kort="<p><b>Risk shifting (asset substitution).</b> Shareholders hold a call on the firm. More risk raises its "
         "value even when expected cash flow falls, at the creditors' expense.</p>",
    full="<p><b>The mechanism.</b> With risky debt the shareholders are paid max(V − K, 0). They keep the whole "
         "upside, while losses below the face value fall on the creditors. A riskier project spreads the outcomes, "
         "which adds to the upside the shareholders keep and to the downside the creditors bear. So the "
         "shareholders can prefer it even when its expected value is lower.</p>"
         "<p><b>The name.</b> Risk shifting, or asset substitution: the shareholders substitute riskier assets "
         "for safer ones. H2024 Exercise 4 and the spring 2024 Problem 1 are exactly this.</p>"
         "<p><b>The cost.</b> The agency cost is the value destroyed: first-best value minus the value of the "
         "project chosen. Rational creditors anticipate it and lend on worse terms, so the shareholders bear it "
         "in the end.</p>"
         "<p><b>The other agency costs of debt.</b> Debt overhang: a good project is turned down. Cashing out: "
         "paying out assets as dividends before default. Gambling for resurrection: an extreme case of risk "
         "shifting close to default.</p>"
         "<p><b>Remember:</b> name the mechanism in the answer. «This is risk shifting» earns points on its "
         "own.</p>",
)

# agt-s02 · Hvorfor eierne liker risiko (konveks utbetaling)
statisk(
    "agt-s02", tema="agent", type="begrep",
    hjelp=hjelp3(
        "This is the reason behind risk shifting: why shareholders of a firm with risky debt like risk.",
        "Equity pays max(V − K, 0) in each state: a call on the firm's assets with the face value K as the strike. "
        "A call is worth more when the assets are riskier.",
        "<p><b>Step 1: draw the payoff.</b> Zero below K, rising one for one above it.</p>"
        "<p><b>Step 2: spread the outcomes.</b> What happens to the shareholders' payoff in a better good state "
        "and a worse bad state?</p>"
        "<p><b>Step 3: who pays.</b> Where does the extra downside land?</p>",
    ),
    q="<p>Why do the shareholders of a firm with risky debt like risk, even when it lowers the firm's total "
      "value?</p>",
    alternativer=[
        R("Their payoff is convex: the upside is theirs, the extra downside the creditors'"),
        F("Higher risk raises the firm's expected cash flow, which the shareholders receive first",
          "Risk need not raise the expected cash flow. The shareholders are paid last, not first. The gain "
          "comes from the shape of their payoff."),
        F("Riskier projects lower the interest rate the creditors can charge on existing debt",
          "The rate on existing debt is fixed by contract. More risk lowers the value of that debt, which is the "
          "shareholders' gain."),
        F("Shareholders are diversified, so the extra risk costs them nothing at all",
          "Diversification removes idiosyncratic risk, but it does not explain a preference for risk. The "
          "preference comes from limited liability."),
    ],
    kort="<p><b>Convexity.</b> Equity = max(V − K, 0). More risk adds to the upside the shareholders keep. The "
         "extra downside below K lands on the creditors, so the call gains value.</p>",
    full="<p><b>Equity is a call.</b> Limited liability means the shareholders are paid last and never less than "
         "zero. Against debt with face value K, they receive max(V − K, 0) in each state: a call option on the "
         "firm's assets with strike K.</p>"
         "<p><b>Step 1: an example.</b> Debt K = 100. A safe project pays 110 in both states: equity gets 10. A "
         "risky one pays 170 or 30 (expected 100): equity gets 70 or 0, on average 35.</p>"
         "<p><b>Step 2: who pays.</b> The creditors get 100 for sure under the safe project, but 100 or 30 (on "
         "average 65) under the risky one. They lose 35. The shareholders gain 25. The firm loses 10.</p>"
         "<p><b>Step 3: the shape.</b> Pushing the good state up helps the shareholders one for one. Pushing the "
         "bad state down costs them nothing once they are at zero. That asymmetry is convexity. It is why a "
         "call rises with volatility.</p>"
         "<p><b>Check 3.</b> Creditors −35 + shareholders +25 = −10, the NPV of the switch.</p>"
         "<p><b>Remember:</b> limited liability turns equity into a call. Calls like risk.</p>",
)

# agt-s03 · Byråkostnaden: verditap, ikke overføring
statisk(
    "agt-s03", tema="agent", type="begrep",
    hjelp=hjelp3(
        "This is the definition of the agency cost of debt in a risk-shifting problem.",
        "Agency cost = V(first best) − V(chosen): the firm value lost because of the choice. The shareholders' "
        "gain and the creditors' loss are transfers that sum to the change in firm value.",
        "<p><b>Step 1: firm values.</b> Which project is first best and what is each worth?</p>"
        "<p><b>Step 2: the transfer.</b> How much moves from the creditors to the shareholders?</p>"
        "<p><b>Step 3: separate them.</b> The agency cost is what disappears, not what moves.</p>",
    ),
    q="<p>Management of a firm with risky debt switches from project S (firm value 120: debt 90, equity 30) to "
      "project R (firm value 112: debt 70, equity 42).</p>"
      "<p>What is the agency cost of the debt, in millions?</p>",
    alternativer=[
        R("8, the fall in firm value", 8.0),
        F("12, the gain to the shareholders",
          "The shareholders' gain is a transfer from the creditors. It is not value that disappears.", 12.0),
        F("20, the loss to the creditors",
          "Part of the creditors' loss goes to the shareholders. Only what neither side gets is a cost.", 20.0),
        F("Zero, since value only moves from the creditors to the shareholders",
          "The firm is worth less after the switch. A pure transfer would leave the total unchanged.", 0.0),
    ],
    kort="<p><b>8.</b> Agency cost = V(S) − V(R) = 120 − 112 = 8. The creditors lose 20, the shareholders gain 12: "
         "−20 + 12 = −8.</p>",
    full="<p><b>The definition.</b> The agency cost of debt is the deadweight loss: the value that disappears "
         "because debt distorts the investment choice. It is first-best firm value minus the firm value of what "
         "management actually picks (kj5).</p>"
         "<p><b>Step 1: firm values.</b> S is worth 120, R 112. An all-equity firm would take S, so S is the first "
         "best.</p>"
         "<p><b>Step 2: the transfer.</b> The creditors go from 90 to 70, a loss of 20. The shareholders go from "
         "30 to 42, a gain of 12. They prefer R, so management picks it.</p>"
         "<p><b>Step 3: the cost.</b> 120 − 112 = <b>8</b>.</p>"
         "<p><b>Check 3.</b> Creditors' gain + shareholders' gain = −20 + 12 = −8 = the NPV of the switch. The "
         "transfer is 12 of the creditors' 20. The rest is destroyed.</p>"
         "<p><b>Who pays in the end.</b> Creditors who foresee the switch lend less, so the shareholders bear the "
         "8 when they issue the debt.</p>"
         "<p><b>Remember:</b> agency cost = value destroyed, never the transfer.</p>",
    tall=tallsvar(enhet="million"),
)

# agt-s04 · Hva får eierne til å godta sikringen? (H2024 E4d)
statisk(
    "agt-s04", tema="agent", type="tolkning",
    hjelp=hjelp3(
        "This follows the zero-NPV hedge in H2024 Exercise 4d. The debt is already in place. What could make the "
        "shareholders accept a hedge that makes the firm worth more?",
        "Check 3: creditors' gain + shareholders' gain = change in firm value. When the change is positive, some "
        "split of it leaves both sides better off.",
        "<p><b>Step 1: why they refuse.</b> Who captures the value the hedge creates?</p>"
        "<p><b>Step 2: the surplus.</b> Is there value left to share between the two sides?</p>"
        "<p><b>Step 3: test each option.</b> Does it give the shareholders part of the gain, given that the debt "
        "has already been priced?</p>"
        "<p><b>Watch out:</b> a promise made after the debt is sold does not change what the creditors paid.</p>",
    ),
    q="<p>A firm with risky debt rejects a zero-NPV hedge. The hedge would stop the firm from risk shifting and "
      "raise its value, but the creditors would gain more than the whole rise. The debt is already in place.</p>"
      "<p>Which step could make the hedge worthwhile for the shareholders?</p>",
    alternativer=[
        R("Renegotiating: creditors give up some face value in return for the hedge"),
        F("Committing to the hedge now, so that the creditors pay more for the debt",
          "The debt has already been sold. Its price was set when it was issued, so a commitment now earns the "
          "shareholders nothing from the creditors."),
        F("Borrowing more first, so that the hedge protects a larger amount of debt",
          "More debt makes the shareholders' call even more sensitive to risk. Hedging then hands the creditors "
          "even more."),
        F("Paying out the firm's cash as a dividend before the hedge is put in place",
          "Paying out cash raises the default risk the creditors bear. It does not give the shareholders a share "
          "of the hedge's gain."),
    ],
    kort="<p><b>Renegotiate the debt.</b> The hedge creates value, so the creditors can give up some face value "
         "and still gain. Lecture 4 lists renegotiation as a remedy (slide 20).</p>",
    full="<p><b>Why the hedge is refused.</b> In H2024 Exercise 4d the hedge lifts the bad state above the face "
         "value of 25. The debt becomes safe, the shareholders' option value disappears and the creditors gain "
         "4.5 while firm value rises only 2. The shareholders lose 2.5, so they say no.</p>"
         "<p><b>Renegotiation.</b> The 2 of new value is there to share. Without the hedge the creditors hold "
         "debt worth 20.5 and the shareholders equity worth 27.5. With the hedge the firm runs project A, worth 50 "
         "for sure, so any new face value K<sub>1</sub> is paid in full. The creditors accept if K<sub>1</sub> ≥ "
         "20.5. The shareholders accept if 50 − K<sub>1</sub> ≥ 27.5, that is K<sub>1</sub> ≤ 22.5. Any "
         "K<sub>1</sub> between 20.5 and 22.5 makes both sides better off.</p>"
         "<p><b>Check 3.</b> The two gains always sum to +2, the efficiency gain. Renegotiation only moves the "
         "split.</p>"
         "<p><b>Why the other options fail.</b> A commitment now is too late: the debt was priced when it was "
         "issued. Had the firm committed before borrowing, the creditors would have paid for safe debt up front. "
         "More debt or a dividend make risk shifting worse.</p>"
         "<p><b>Remember:</b> levered shareholders reject value-creating risk reduction unless they are paid for "
         "it: up front before the debt is issued, or by renegotiation afterwards.</p>",
)

# agt-s05 · Hvor mye taper eierne på en nullnåverdisikring?
statisk(
    "agt-s05", tema="agent", type="begrep",
    hjelp=hjelp3(
        "This is the zero-NPV hedge in numbers. You need how much the shareholders lose if the firm hedges.",
        "Equity = Σ p × max(CF − K, 0) with and without the hedge. Loss = E(without) − E(with). With firm value "
        "fixed, the shareholders' loss equals the creditors' gain (check 4).",
        "<p><b>Step 1: equity without the hedge.</b> State by state, then the average.</p>"
        "<p><b>Step 2: the hedged cash flows.</b> Add the hedge's payoff in each state.</p>"
        "<p><b>Step 3: equity with the hedge.</b> State by state again.</p>"
        "<p><b>Step 4: the difference.</b> Then run check 4 on the debt.</p>",
    ),
    q="<p>A firm's cash flow next year will be 150 or 30 with probability 0.5 each. It owes debt with a face value "
      "of 60, due then. A bank offers a costless contract under which the firm pays 40 in the good state and "
      "receives 40 in the bad state. Investors are risk neutral and the discount rate is zero.</p>"
      "<p>How much would the shareholders lose if the firm signed the contract?</p>",
    alternativer=[
        R("15", 15.0),
        F("0",
          "The contract has an NPV of zero for the firm, but not for the shareholders. It moves value between the "
          "claims.", 0.0),
        F("20",
          "Only the good-state loss counted, 0.5 × 40. In the bad state the hedge lifts equity from zero, which "
          "offsets part of it.", 20.0),
        F("40",
          "The good-state loss with no probability. Value is the expected payoff across the two states.", 40.0),
    ],
    kort="<p><b>15.</b> Without: 0.5 × (150 − 60) + 0.5 × 0 = 45. With: 0.5 × (110 − 60) + 0.5 × (70 − 60) = 30. "
         "Loss 45 − 30 = 15.</p>",
    full="<p><b>Why a zero-NPV hedge is not neutral.</b> The hedge does not change the firm's expected cash flow "
         "(0.5 × −40 + 0.5 × 40 = 0). But it lifts the bad state above the face value, which makes the debt "
         "safe. The shareholders' call loses its option value. The creditors get it.</p>"
         "<p><b>Step 1: without the hedge.</b> Equity 90 or 0, worth 45. Debt 60 or 30, worth 45.</p>"
         "<p><b>Step 2: the hedged cash flows.</b> 150 − 40 = 110 and 30 + 40 = 70.</p>"
         "<p><b>Step 3: with the hedge.</b> Equity 50 or 10, worth 30. Debt 60 for sure, worth 60.</p>"
         "<p><b>Step 4: the loss.</b> 45 − 30 = <b>15</b>.</p>"
         "<p><b>Check 4.</b> Firm value is 90 either way, so the creditors' gain must equal the shareholders' "
         "loss: 60 − 45 = 15 ✓. This can fail: count the good state alone and you get 20, which the creditors' "
         "side does not match.</p>"
         "<p><b>Remember:</b> with risky debt, shareholders refuse a hedge that makes the debt safer, unless they "
         "are paid for it.</p>",
    tall=tallsvar(),
)

# agt-s06 · Hvem bærer byråkostnaden på forhånd? (forelesning 4 s. 15, 20)
statisk(
    "agt-s06", tema="agent", type="begrep",
    hjelp=hjelp3(
        "This is about who pays for the agency costs of debt once creditors see them coming.",
        "Debt is priced when it is issued, on the strategy the lenders expect. Compare what the owners raise "
        "plus what their equity is worth with the firm's value under a safe strategy.",
        "<p><b>Step 1: what the creditors expect.</b> They know the owners will shift risk later.</p>"
        "<p><b>Step 2: the price.</b> What do they pay for the debt, given that?</p>"
        "<p><b>Step 3: who ends up poorer.</b> Compare with a world where the owners could promise not to shift "
        "risk.</p>",
    ),
    q="<p>Before lending, creditors foresee that the owners will later switch the firm's assets into a riskier "
      "strategy with a lower expected value.</p>"
      "<p>Who bears the agency cost?</p>",
    alternativer=[
        R("The owners: lenders pay less for the debt, so the owners raise less"),
        F("The creditors: they lose when the risky strategy turns out badly",
          "Creditors who foresee the switch lend on terms that cover their expected loss. On average they break "
          "even."),
        F("Nobody: risk shifting only moves value between the two groups",
          "Risk shifting destroys value as well as moving it. The destroyed value has to be borne by someone."),
        F("The creditors and owners in equal shares, since both are claimants",
          "There is no rule of equal shares. The creditors are priced to break even, so the cost lands on the "
          "owners."),
    ],
    kort="<p><b>The owners.</b> Rational creditors anticipate risk shifting and pay less for the debt (or demand a "
         "higher rate). The shareholders bear the cost up front (lecture 4, slides 15 and 20).</p>",
    full="<p><b>The logic.</b> Creditors are rational and know the incentives. They value the debt on the "
         "strategy the owners will actually follow, not the one they promise. So the debt is fairly priced. "
         "the creditors break even on average.</p>"
         "<p><b>Step 1: an example.</b> If the owners could commit to the safe strategy, the firm would be worth "
         "110 and the debt 100. Creditors who expect the risky one (worth 100 in total) pay only 65 for the "
         "debt.</p>"
         "<p><b>Step 2: the owners.</b> They raise 65 instead of 100 and keep equity worth 35: 65 + 35 = 100, not "
         "the 110 a credible promise would give. The 10 of value destroyed is theirs.</p>"
         "<p><b>Step 3: what follows.</b> Owners have a reason to tie their own hands: covenants, secured or "
         "senior debt, convertibles. These make the debt cheaper and so pay for themselves. Lecture 4 calls "
         "covenants a «necessary evil».</p>"
         "<p><b>Remember:</b> creditors anticipate, so the shareholders pay. That is why firms accept "
         "covenants.</p>",
)

# agt-s07 · Gjeldsoverheng: når avslås et lønnsomt prosjekt?
statisk(
    "agt-s07", tema="agent", type="begrep",
    hjelp=hjelp3(
        "This is debt overhang: when shareholders of a firm with risky debt turn down a project with a positive "
        "NPV.",
        "The shareholders pay the whole investment. Debt = Σ p × min(CF, K) and equity = Σ p × max(CF − K, "
        "0), state by state. Work out how the project changes each of them.",
        "<p><b>Step 1: who pays.</b> The shareholders put up the whole investment.</p>"
        "<p><b>Step 2: who gains.</b> In the default states the extra cash flow goes to the creditors.</p>"
        "<p><b>Step 3: the condition.</b> Compare the NPV with the creditors' windfall.</p>"
        "<p><b>Watch out:</b> a positive NPV is not enough. What counts is the part the shareholders keep.</p>",
    ),
    q="<p>The shareholders of a firm with risky debt turn down a project with a positive NPV.</p>"
      "<p>When does that happen?</p>",
    alternativer=[
        R("When the old debt's rise in value exceeds the project's NPV"),
        F("When the project is riskier than the firm's existing assets",
          "That is the condition for risk shifting, which runs the other way: shareholders like risk. Overhang "
          "is about who captures a safe gain."),
        F("When the project has to be financed with new equity rather than debt",
          "Financing with new equity at a fair price leaves the owners exactly as if they paid themselves. The "
          "problem is the old debt, not the new equity."),
        F("When the project's NPV is smaller than the investment it requires",
          "That compares the NPV with the cost, which is already inside the NPV. The question is how much of "
          "the NPV the creditors take."),
    ],
    kort="<p><b>When ΔD &gt; NPV.</b> The shareholders pay the whole investment, but in default states the extra "
         "cash flow goes to the creditors. If the creditors' windfall exceeds the NPV, the shareholders lose.</p>",
    full="<p><b>Debt overhang.</b> When the firm's debt is risky, part of any new cash flow goes to the existing "
         "creditors, because they are not paid in full in the bad states. The shareholders put up the whole "
         "investment and get only what is left.</p>"
         "<p><b>The condition.</b> Shareholders' gain = NPV − ΔD. They invest only if the NPV exceeds the rise "
         "in the value of the old debt. Overhang is the case ΔD &gt; NPV &gt; 0: value is lost because a good "
         "project is skipped.</p>"
         "<p><b>Lecture 4's example.</b> Debt of 1M, assets worth 900K. A project costing 100K returns 50%, risk "
         "free: firm value 1.05M, equity 50K. Shareholders pay 100K for 50K, so they refuse, although the NPV is "
         "+50K.</p>"
         "<p><b>The cures.</b> Renegotiating the face value, senior or secured debt for the project, or "
         "restructuring the old debt.</p>"
         "<p><b>Remember:</b> judge the project by what the shareholders get, not by its NPV. Underinvestment is "
         "an indirect cost of distress.</p>",
)

# agt-s08 · Ny egenkapital løser ikke overheng (PS1 E6b)
statisk(
    "agt-s08", tema="agent", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about whether selling new shares to outsiders changes the debt overhang problem.",
        "New investors who break even take a share x = I / E<sub>1</sub>. The owner keeps (1 − x)E<sub>1</sub> "
        "= E<sub>1</sub> − I.",
        "<p><b>Step 1: the new investors.</b> What stake do they need for their money?</p>"
        "<p><b>Step 2: the owner.</b> Compare his payoff with paying the investment himself.</p>"
        "<p><b>Step 3: judge each statement</b> on its own.</p>"
        "<p><b>Watch out:</b> outsiders who pay a fair price carry none of the cost. The creditors' windfall still comes out of the owner's stake.</p>",
    ),
    q="<p>The owner of a firm with risky debt has no cash. He can fund a positive-NPV project only by selling new "
      "shares to outside investors at a fair price.</p>"
      "<p>I. His payoff is the same as if he had paid for the project himself.<br>"
      "II. Selling shares solves the debt overhang, because the outsiders bear the cost of the investment.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        R("Only I"),
        F("Only II",
          "Statement II is false: the outsiders are paid in full for what they put in, so the cost stays with "
          "the owner. Statement I holds."),
        F("Both I and II",
          "Statement II is false: new investors who break even do not carry any of the cost."),
        F("Neither I nor II",
          "Statement I holds: (1 − x)E<sub>1</sub> = E<sub>1</sub> − I, exactly what he gets by paying "
          "himself."),
    ],
    kort="<p><b>Only I.</b> x = I/E<sub>1</sub>, so the owner keeps E<sub>1</sub> − I. Fair-price equity changes "
         "nothing: the creditors' windfall still comes out of the owner's pocket (PS1 Exercise 6b).</p>",
    full="<p><b>The arithmetic.</b> Outside investors pay I and demand a stake worth I: x × E<sub>1</sub> = I. The "
         "owner keeps (1 − x)E<sub>1</sub> = E<sub>1</sub> − I. That is exactly what he would have if he had paid "
         "I himself and kept all the equity.</p>"
         "<p><b>PS1 Exercise 6.</b> Boom 150, recession 50, debt 100, no discounting. A project costing 24 adds "
         "30 in both states. With it, equity is 0.5 × 80 = 40. The outsiders need x = 24/40 = 60%. The owner "
         "keeps 0.4 × 40 = 16 = 40 − 24, less than the 25 he has without the project. He refuses.</p>"
         "<p><b>Statement I</b> is true. <b>Statement II</b> is false: the outsiders break even, so they bear "
         "none of the cost. The creditors' windfall (their claim rises from 75 to 90) is paid by the owner.</p>"
         "<p><b>Check 3.</b> Creditors +15, owner 16 − 25 = −9. Sum 6 = NPV.</p>"
         "<p><b>Remember:</b> how the project is funded does not matter. What matters is that the old debt "
         "captures part of the gain. Cure it by renegotiation or senior debt.</p>",
)

# agt-s09 · Kreditorenes gevinst ved et prosjekt i en nødlidende bedrift (forelesning 4 s. 11)
statisk(
    "agt-s09", tema="agent", type="begrep",
    hjelp=hjelp3(
        "This is debt overhang in a firm close to default. You need how much the existing creditors gain if the "
        "project goes ahead.",
        "Debt = min(V, K) at maturity. Creditors' gain = D(with the project) − D(without). Check 3: creditors' "
        "gain + shareholders' gain = NPV.",
        "<p><b>Step 1: without the project.</b> What do the creditors get at maturity?</p>"
        "<p><b>Step 2: with the project.</b> Add the project's payoff to the firm's value and apply min(V, K).</p>"
        "<p><b>Step 3: the difference.</b> Then compare it with the NPV.</p>"
        "<p><b>Watch out:</b> the creditors' gain is not the NPV.</p>",
    ),
    q="<p>A firm owes debt with a face value of 500, due in one year. Its assets will be worth 420 then, for sure. "
      "The shareholders can put 60 into a project today that pays 100 for sure at the same date. There is no "
      "discounting.</p>"
      "<p>By how much do the existing creditors gain if the project goes ahead?</p>",
    alternativer=[
        R("80", 80.0),
        F("40",
          "This is the project's NPV, 100 − 60. The creditors take more than the NPV here, which is the "
          "overhang.", 40.0),
        F("100",
          "The project's whole payoff given to the creditors. They are capped at the face value of 500.", 100.0),
        F("20",
          "This is what is left for the equity at maturity, 520 − 500, not what the creditors gain.", 20.0),
    ],
    kort="<p><b>80.</b> Without: the creditors get 420. With: firm value 520, so they get the full 500. Gain 80, "
         "twice the NPV of 40.</p>",
    full="<p><b>The setting.</b> Lecture 4 uses this example: a firm in distress with debt above its asset value "
         "and a safe project with a positive NPV.</p>"
         "<p><b>Step 1: without the project.</b> Assets 420 &lt; 500, so the creditors take 420 and the "
         "shareholders nothing.</p>"
         "<p><b>Step 2: with the project.</b> Firm value 420 + 100 = 520 ≥ 500. Creditors 500, shareholders "
         "20.</p>"
         "<p><b>Step 3: the creditors' gain.</b> 500 − 420 = <b>80</b>.</p>"
         "<p><b>Check 3.</b> Shareholders: 20 − 60 = −40. Creditors +80. Sum 40 = NPV ✓. The creditors take "
         "more than the whole NPV, so the shareholders refuse and the 40 is lost.</p>"
         "<p><b>The cure.</b> Lecture 4 suggests funding the project with senior debt, so the old creditors no "
         "longer take the new cash flow first.</p>"
         "<p><b>Remember:</b> in distress the old debt captures the safe part of any new cash flow. Overhang "
         "means ΔD &gt; NPV.</p>",
    tall=tallsvar(),
)

# agt-s10 · Seniorlån som kur mot overheng (forelesning 4 s. 13)
statisk(
    "agt-s10", tema="agent", type="begrep",
    hjelp=hjelp3(
        "This is the senior-debt cure for debt overhang. You need what the old creditors receive when the project "
        "is funded with new debt that ranks ahead of them.",
        "At maturity the senior lender is paid first, min(V, senior face). The old debt gets min(V − senior, "
        "old face). Equity gets what is left.",
        "<p><b>Step 1: firm value at maturity</b> with the project.</p>"
        "<p><b>Step 2: the senior lender.</b> Paid first.</p>"
        "<p><b>Step 3: the old creditors.</b> What is left, up to their face value.</p>"
        "<p><b>Watch out:</b> compare with what they would get without the project.</p>",
    ),
    q="<p>A firm owes debt with a face value of 500, due in one year. Its assets will be worth 420 then, for sure. "
      "A project costing 60 today pays 100 for sure at the same date. The firm funds it with a new loan of 60, "
      "due at the same date with no interest and senior to the existing debt. There is no discounting.</p>"
      "<p>How much do the existing creditors receive at maturity?</p>",
    alternativer=[
        R("460", 460.0),
        F("420",
          "This is what they get without the project. With it, the firm is worth more even after the senior "
          "lender is repaid.", 420.0),
        F("500",
          "Their full face value. The senior lender takes 60 first, which leaves less than 500.", 500.0),
        F("520",
          "The whole firm value at maturity. The senior loan is paid before the existing debt.", 520.0),
    ],
    kort="<p><b>460.</b> Firm value 420 + 100 = 520. Senior lender 60 first. Old creditors min(460, 500) = 460, "
         "up from 420.</p>",
    full="<p><b>Why seniority helps.</b> The overhang arises because new money is junior to the old debt, so the "
         "old creditors take the safe part of the new cash flow first. If the new money is senior, it is repaid "
         "first and the project can be financed (lecture 4, slide 13).</p>"
         "<p><b>Step 1: firm value.</b> 420 + 100 = 520.</p>"
         "<p><b>Step 2: the senior lender.</b> Paid 60 in full, so it breaks even.</p>"
         "<p><b>Step 3: the old creditors.</b> 520 − 60 = 460 &lt; 500, so they get <b>460</b>, 40 more than "
         "without the project.</p>"
         "<p><b>Check 3.</b> Senior lender 0, old creditors +40, shareholders 0 (nothing either way). Sum 40 = "
         "NPV. Nobody loses, so the project goes ahead.</p>"
         "<p><b>The twist.</b> Real debt contracts often forbid new debt of equal or higher seniority. Lecture 4 "
         "asks why: without the covenant the owners could also issue senior debt for value-destroying ends, so "
         "the creditors protect themselves in advance.</p>"
         "<p><b>Remember:</b> senior new money stops the old debt from free-riding on the project.</p>",
    tall=tallsvar(),
)

# agt-s11 · Covenants før og etter (PS1 E8d)
statisk(
    "agt-s11", tema="agent", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about debt covenants that forbid risk-shifting deals such as a spin-off that leaves the debt "
        "behind. Are they good for the shareholders?",
        "Ex post: compare the shareholders' payoff with and without the forbidden deal. Ex ante: the price "
        "creditors pay for the debt depends on what they expect the owners to do.",
        "<p><b>Step 1: after the debt is issued.</b> What does the covenant stop the shareholders from "
        "taking?</p>"
        "<p><b>Step 2: before the debt is issued.</b> What do the creditors pay with and without the "
        "covenant?</p>"
        "<p><b>Step 3: judge each statement</b> on its own.</p>",
    ),
    q="<p>Consider a covenant that forbids the firm from spinning off a division in a way that leaves all its debt "
      "with the riskier part.</p>"
      "<p>I. Once the debt is in place, the covenant costs the shareholders the gain they would have made.<br>"
      "II. Before the debt is issued, such covenants are bad for the shareholders, because they limit what the "
      "firm may do.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        R("Only I"),
        F("Only II",
          "Statement II is false: ex ante the covenant makes the debt cheaper, which helps the shareholders. "
          "Statement I holds."),
        F("Both I and II",
          "Statement II is false: creditors pay more for protected debt, so the owners raise more when they "
          "borrow."),
        F("Neither I nor II",
          "Statement I holds: after the debt is issued the covenant blocks a transfer the shareholders would "
          "have captured."),
    ],
    kort="<p><b>Only I.</b> Ex post the covenant blocks the shareholders' gain. Ex ante it makes the debt cheaper "
         "and stops value being destroyed, so it is good for them: a «necessary evil» (PS1 Exercise 8d, lecture "
         "4).</p>",
    full="<p><b>Ex post.</b> Once the debt is issued, a spin-off that leaves the debt with the risky division "
         "moves value from the creditors to the shareholders. In PS1 Exercise 8 the shareholders gain 10 while "
         "the creditors lose 30 and lost synergies destroy 20. A covenant blocks that gain. Statement I is "
         "true.</p>"
         "<p><b>Ex ante.</b> Creditors foresee what the owners can do. Without the covenant they lend on worse "
         "terms, so the owners bear the expected cost anyway, including the 20 destroyed. With the covenant the "
         "debt is safer and cheaper. The owners commit not to destroy value and are paid for it. Statement II is "
         "false.</p>"
         "<p><b>The general point.</b> Covenants, seniority and secured debt let the owners tie their own hands. "
         "They pay for themselves in the bond price, unless they bind in a case where the forbidden action "
         "would have created value.</p>"
         "<p><b>Remember:</b> bad ex post, good ex ante. That is why lecture 4 calls covenants a necessary "
         "evil.</p>",
)

# agt-s12 · Gambling for resurrection i tall (forelesning 4 s. 16–17, tavla s. 3)
statisk(
    "agt-s12", tema="agent", type="begrep",
    hjelp=hjelp3(
        "This is gambling for resurrection. A firm sure to default can switch to a long shot. You need the "
        "creditors' loss.",
        "Debt = E[min(V, K)], equity = E[max(V − K, 0)], compared before and after the switch. Check 3: "
        "creditors' gain + shareholders' gain = change in firm value.",
        "<p><b>Step 1: before.</b> The firm defaults for sure. Who gets what?</p>"
        "<p><b>Step 2: after.</b> In each state of the gamble, split the value between debt and equity.</p>"
        "<p><b>Step 3: the creditors' change.</b> Expected debt after minus before.</p>"
        "<p><b>Watch out:</b> the creditors' loss is not the value destroyed.</p>",
    ),
    q="<p>A firm owes 800, due in one year. Its assets will be worth 650 then, for sure. Management can switch to "
      "a strategy that leaves the firm worth 1 000 or 250, with probability 0.5 each. Investors are risk neutral "
      "and there is no discounting.</p>"
      "<p>If management switches, how much do the creditors lose?</p>",
    alternativer=[
        R("125", 125.0),
        F("100",
          "This is what the shareholders gain, 0.5 × (1 000 − 800). The creditors lose more, because value is "
          "also destroyed.", 100.0),
        F("25",
          "This is the value destroyed, 650 − 625. The creditors also lose what is transferred to the "
          "shareholders.", 25.0),
        F("150",
          "This is the shortfall against the face value, 800 − 650, which the creditors bear without any "
          "switch.", 150.0),
    ],
    kort="<p><b>125.</b> Before: debt 650. After: 0.5 × 800 + 0.5 × 250 = 525. Loss 650 − 525 = 125. Equity gains "
         "100, value falls 25.</p>",
    full="<p><b>Gambling for resurrection.</b> A firm certain to default has nothing left for its shareholders. A "
         "gamble with a lower expected value still gives them a chance of something. It gives the manager a chance "
         "that the firm survives. The downside falls on the creditors (lecture 4, slides 16 and 17).</p>"
         "<p><b>Step 1: before.</b> V = 650 &lt; 800: debt 650, equity 0.</p>"
         "<p><b>Step 2: after.</b> Good state: debt 800, equity 200. Bad state: debt 250, equity 0. Debt = 0.5 × "
         "800 + 0.5 × 250 = 525. Equity = 0.5 × 200 = 100.</p>"
         "<p><b>Step 3: the creditors.</b> 650 − 525 = <b>125</b>.</p>"
         "<p><b>Check 3.</b> Creditors −125, shareholders +100. Sum −25 = 625 − 650, the value destroyed.</p>"
         "<p><b>Who wins and who loses.</b> The shareholders gain, the creditors lose and the firm is worth less. "
         "The manager keeps his job with probability 0.5, against zero.</p>"
         "<p><b>Remember:</b> close to default, equity gains from risk itself. Eastern Airlines delayed an "
         "efficient liquidation for years this way.</p>",
    tall=tallsvar(),
)

# agt-s13 · Hvorfor ledelsen gambler (forelesning 4 s. 17, forelesning 14 s. 12)
statisk(
    "agt-s13", tema="agent", type="begrep",
    hjelp=hjelp3(
        "This is gambling for resurrection: why a firm close to default takes a long shot that lowers its "
        "expected value.",
        "Equity = max(V − K, 0) and debt = min(V, K), state by state. Compute both with and without the "
        "gamble. Then ask what the manager's job depends on.",
        "<p><b>Step 1: the status quo.</b> What do the shareholders and the manager get if nothing changes?</p>"
        "<p><b>Step 2: the gamble.</b> What can they gain? What can they lose?</p>"
        "<p><b>Step 3: who bears the downside.</b> Then test each option.</p>"
        "<p><b>Watch out:</b> the manager's own stake, keeping his job, points the same way as the shareholders'.</p>",
    ),
    q="<p>A firm that is certain to default next year can switch to a long-shot strategy with a lower expected "
      "value than its current plan.</p>"
      "<p>Why does management take it?</p>",
    alternativer=[
        R("Equity has nothing to lose: the gamble's downside falls on the creditors"),
        F("The gamble has a positive NPV once the firm's survival is counted in",
          "The gamble lowers the firm's expected value, so its NPV is negative. Survival matters to the manager, "
          "not to the firm's value."),
        F("Creditors prefer it, since it gives them a chance of full repayment",
          "The creditors lose on average: they give up a sure recovery for a lottery with a lower expected "
          "value."),
        F("It lowers the probability of default, which raises the value of the debt",
          "Default is certain without the gamble and likely with it. The debt loses value."),
    ],
    kort="<p><b>Nothing to lose.</b> Without the gamble the shareholders get zero and the manager loses the firm. "
         "With it they have a chance of something. The loss in the bad state falls on the creditors.</p>",
    full="<p><b>The mechanism.</b> Gambling for resurrection is risk shifting at its most extreme. When default is "
         "certain, equity is a call that is far out of the money. Its value comes only from the chance of a big "
         "outcome, so any added risk helps it, even risk that destroys value.</p>"
         "<p><b>Who wins and who loses</b> (lecture 4, slide 17).</p>"
         "<p><b>The shareholders</b> go from nothing to a chance of something. Their expected payoff rises.</p>"
         "<p><b>The manager</b> goes from a firm that is sure to be shut down to one that survives in the good "
         "state. That is a strong private reason to gamble.</p>"
         "<p><b>The creditors</b> give up a sure recovery for a lottery with a lower average. They pay for the "
         "gamble.</p>"
         "<p><b>Examples.</b> Eastern Airlines delayed an efficient liquidation from about 1975 to 1991 in the "
         "hope of a recovery. The wrap-up lecture lists gambling for resurrection among the ideas to know.</p>"
         "<p><b>Remember:</b> check all three parties: manager, shareholders and creditors.</p>",
)

# agt-s14 · Risikoskifting øker med gjelden (H2024 E4c)
statisk(
    "agt-s14", tema="agent", type="tolkning",
    hjelp=hjelp3(
        "This is how risk shifting changes as debt rises: why more debt pushes management from a medium gamble to "
        "a long shot.",
        "In the region where both projects' low states default, E<sub>B</sub> = "
        "p<sub>B</sub>(B<sub>high</sub> − K) and E<sub>C</sub> = p<sub>C</sub>(C<sub>high</sub> − K).",
        "<p><b>Step 1: the slopes.</b> How fast does each equity value fall as K rises?</p>"
        "<p><b>Step 2: the shape of C.</b> Where does the long shot's payoff sit?</p>"
        "<p><b>Step 3: test each option.</b> Does expected value depend on K?</p>"
        "<p><b>Watch out:</b> the expected payoff of a project does not depend on how it is financed.</p>",
    ),
    q="<p>A firm can choose a medium gamble B, which pays well with probability 0.5, or a long shot C, which pays "
      "a very large amount with probability 0.2. Below a certain face value of debt management prefers B. Above "
      "it, management prefers C.</p>"
      "<p>Why does more debt push management towards C?</p>",
    alternativer=[
        R("C's equity value falls more slowly as debt rises, since only its rare state pays"),
        F("C's expected value rises with debt, while B's expected value falls",
          "A project's expected payoff does not depend on how it is financed. Only the split between debt and "
          "equity does."),
        F("With more debt the creditors require the firm to take more risk",
          "Creditors want less risk, not more. The push comes from the shareholders' call option."),
        F("C's low state pays the shareholders more than B's low state does",
          "C's low state pays nothing at all. Both low states leave the shareholders with zero once debt is "
          "high."),
    ],
    kort="<p><b>C's equity value falls more slowly as debt rises.</b> Each extra unit of face value costs the "
         "shareholders the probability of the states where they are paid: 0.5 for B, 0.2 for C. So C overtakes "
         "B.</p>",
    full="<p><b>The mechanism.</b> More debt pushes the shareholders' call deeper out of the money. A project that "
         "pays in a single, very high state keeps its equity value best, because the debt is subtracted only in "
         "that unlikely state.</p>"
         "<p><b>H2024 Exercise 4c.</b> B pays 80 or 16, C pays 150 with probability 0.2. With B's low state in "
         "default: E<sub>B</sub> = 0.5(80 − K), E<sub>C</sub> = 0.2(150 − K). They are equal at K = 33.3333. "
         "Above it management picks C.</p>"
         "<p><b>What it costs.</b> At K = 25 management picks B and the agency cost is 50 − 48 = 2. Above 33.3333 "
         "it picks C and the cost jumps to 50 − 30 = 20.</p>"
         "<p><b>Why the other options fail.</b> Expected payoffs do not depend on financing. Creditors dislike "
         "risk. Both low states pay the shareholders nothing at high debt.</p>"
         "<p><b>Remember:</b> risk shifting escalates with leverage. That is why highly levered firms need "
         "covenants.</p>",
)

# agt-s15 · Reforhandling: kreditorenes gevinst (PS1 E6c, kontroll 3)
statisk(
    "agt-s15", tema="agent", type="begrep",
    hjelp=hjelp3(
        "This is renegotiation of debt overhang. After a cut in the face value the project goes ahead. You need "
        "the creditors' gain.",
        "D = Σ p × min(CF, K<sub>1</sub>) with the project and the new face value, against D<sub>0</sub> under "
        "the old contract without the project. Check 3: creditors' gain + owner's gain = NPV.",
        "<p><b>Step 1: the old debt value.</b> Old face value, no project.</p>"
        "<p><b>Step 2: the new debt value.</b> New face value, with the project's cash flow added.</p>"
        "<p><b>Step 3: the difference.</b> Then check that it and the owner's gain sum to the NPV.</p>"
        "<p><b>Watch out:</b> the cut in face value is not the creditors' loss.</p>",
    ),
    q="<p>A firm's cash flow next year will be 200 or 40 with probability 0.5 each. It owes debt with a face value "
      "of 120. A project costing 20 today adds 30 to the cash flow in both states, funded by new shares at a fair "
      "price. There is no discounting. The creditors agree to cut the face value to 105 if the project goes "
      "ahead. It goes ahead.</p>"
      "<p>By how much do the creditors gain, compared with the old contract and no project?</p>",
    alternativer=[
        R("7.50", 7.5),
        F("10.00",
          "This is the project's whole NPV, 30 − 20. The owner gains too, so the creditors get only part of it.",
          10.0),
        F("2.50",
          "This is the owner's gain, 62.50 − 20 − 40. The creditors' gain is the rest of the NPV.", 2.5),
        F("−15.00",
          "The cut in face value, 120 − 105, read as the creditors' loss. Their claim is worth more after the "
          "deal, because the bad state now pays them more.", -15.0),
    ],
    kort="<p><b>7.50.</b> Before: 0.5 × 120 + 0.5 × 40 = 80. After: 0.5 × 105 + 0.5 × 70 = 87.50. Gain 7.50. "
         "Owner: 0.5 × (230 − 105) − 20 − 40 = 2.50. Sum 10 = NPV.</p>",
    full="<p><b>Why both sides gain.</b> Without the project the creditors get 40 in the bad state. With it they "
         "get 70 there, even with a lower face value. The owner gives up some of the good-state cash to the "
         "creditors' cut, but keeps enough to invest. The NPV is shared.</p>"
         "<p><b>Step 1: the old debt.</b> No project, face 120: 0.5 × 120 + 0.5 × 40 = 80. The owner has 0.5 × "
         "(200 − 120) = 40.</p>"
         "<p><b>Step 2: the new debt.</b> With the project the states are 230 and 70. Face 105: 0.5 × 105 + 0.5 × "
         "70 = 87.50.</p>"
         "<p><b>Step 3: the creditors' gain.</b> 87.50 − 80 = <b>7.50</b>.</p>"
         "<p><b>Check 3.</b> Owner: equity 0.5 × (230 − 105) = 62.50, minus the 20 paid for the project (new "
         "shares cost him the same as paying himself), minus his old 40: +2.50. Sum 7.50 + 2.50 = 10 = 30 − 20 "
         "= NPV ✓. This check can fail: count the face value cut as a loss and the sum breaks.</p>"
         "<p><b>Remember:</b> renegotiation only splits the NPV. The sum of the gains is fixed by the "
         "project.</p>",
    tall=tallsvar(),
)

# agt-s16 · Konvertible lån som kur (forelesning 4 s. 20)
statisk(
    "agt-s16", tema="agent", type="begrep",
    hjelp=hjelp3(
        "This is about the remedies for risk shifting and which one works by giving the lenders part of the "
        "upside.",
        "Shareholders like risk because their payoff is convex. A remedy that lets the lenders share in the "
        "upside removes the convexity the shareholders exploit.",
        "<p><b>Step 1: the source of the problem.</b> Who keeps the upside of a risky project?</p>"
        "<p><b>Step 2: the remedies.</b> Covenants, seniority, convertibles, renegotiation. What does each one "
        "change?</p>"
        "<p><b>Step 3: match</b> the description in the question.</p>"
        "<p><b>Watch out:</b> several remedies protect the lenders, but only one lets them share the good outcomes.</p>",
    ),
    q="<p>Which feature of a debt contract removes the shareholders' incentive to gamble by giving the lenders a "
      "share of the upside?</p>",
    alternativer=[
        R("Making the debt convertible into shares"),
        F("Making the debt senior to all other claims",
          "Seniority decides who is paid first in the bad states. It does not give the lenders any of the "
          "upside."),
        F("A covenant that caps the dividends the firm may pay",
          "A dividend covenant stops cash from leaving the firm. It restricts actions rather than sharing the "
          "upside."),
        F("A collateral clause that pledges the firm's plant to the lenders",
          "Collateral protects the lenders in default. It does not let them share in the good outcomes."),
    ],
    kort="<p><b>Convertible debt.</b> If a gamble pays off, the lenders convert and share the upside, so the "
         "shareholders no longer keep it all. The payoff that made gambling attractive is gone.</p>",
    full="<p><b>The problem.</b> Shareholders gamble because they keep the upside while the lenders bear the "
         "downside. Any remedy has to change that split or forbid the gamble.</p>"
         "<p><b>Convertibles.</b> The lenders can swap their bonds for shares. In the good states they convert "
         "and take part of the upside. Gambling now helps the lenders too, so the shareholders gain less from "
         "it. Lecture 4 lists convertibles for their «discipline-related benefits and shared upside».</p>"
         "<p><b>Covenants.</b> Restrict actions: no new senior debt, limits on dividends, limits on asset sales "
         "or spin-offs. They forbid the gamble rather than remove the incentive.</p>"
         "<p><b>Seniority and collateral.</b> Protect the lenders in the bad states, which makes new projects "
         "easier to fund and helps against overhang.</p>"
         "<p><b>Renegotiation.</b> Shares a gain after the fact, as in PS1 Exercise 6.</p>"
         "<p><b>Remember:</b> convertibles share the upside, covenants forbid the action, seniority protects the "
         "downside.</p>",
)

# agt-s17 · Gjeld disiplinerer: fri kontantstrøm (forelesning 4 s. 21–23)
statisk(
    "agt-s17", tema="agent", type="begrep",
    hjelp=hjelp3(
        "This is the agency benefit of debt: how borrowing can raise firm value even without taxes.",
        "Debt involves two conflicts of interest: shareholders against creditors and managers against "
        "shareholders. Without taxes, any gain from debt must come from a friction that changes the firm's "
        "cash flows.",
        "<p><b>Step 1: the conflict.</b> Between whom: managers and shareholders, or shareholders and "
        "creditors?</p>"
        "<p><b>Step 2: what debt does.</b> What happens to the cash that would otherwise stay with the "
        "manager?</p>"
        "<p><b>Step 3: test each option.</b> Which ones are MM fallacies?</p>",
    ),
    q="<p>Why can borrowing raise a firm's value even when there are no taxes?</p>",
    alternativer=[
        R("It forces out cash that managers might waste on empire building"),
        F("It lowers the cost of capital, since debt is cheaper than equity",
          "Cheaper debt makes the equity dearer. Without taxes the WACC does not fall (MM II)."),
        F("It raises EPS, which pushes the share price up",
          "That is the EPS fallacy. The higher EPS is riskier and the price does not move in a perfect "
          "market."),
        F("It lets the firm issue fewer shares, so the old shares are not diluted",
          "Shares sold at a fair price do not dilute the old ones. The gain from debt has to come from a "
          "friction."),
    ],
    kort="<p><b>Discipline.</b> Debt forces the firm to pay out cash. A skipped dividend costs managers little, a "
         "missed coupon hands control to the creditors. So debt curbs empire building (Jensen 1986, lecture "
         "4).</p>",
    full="<p><b>The free cash flow problem.</b> Managers with more cash than positive-NPV projects tend to spend it "
         "on empire building and poor acquisitions. This is a conflict between managers and shareholders, not "
         "between shareholders and creditors.</p>"
         "<p><b>What debt does.</b> Interest must be paid. Missing a dividend is not as serious as missing an "
         "interest payment. So debt takes cash out of the manager's hands and makes him run the firm "
         "efficiently, cut costs and spend less on perks (lecture 4, slide 22).</p>"
         "<p><b>Ownership.</b> Debt also lets managers hold a larger share of the equity, which ties their "
         "interests closer to the shareholders'.</p>"
         "<p><b>Where it matters most.</b> Mature, cash-rich firms in slow-growth industries. The LBO wave of the "
         "1980s is read partly as a way to capture these benefits.</p>"
         "<p><b>In the trade-off.</b> V<sup>L</sup> = V<sup>U</sup> + PV(TS) − PV(DC) + PV(IB) − PV(IC): the "
         "incentive benefits enter with a plus.</p>"
         "<p><b>Remember:</b> debt disciplines managers. That benefit exists even without taxes.</p>",
)

# agt-s18 · Den utvidede avveiningsteorien (forelesning 4 s. 24)
statisk(
    "agt-s18", tema="agent", type="formel",
    hjelp=hjelp3(
        "This is Kurbatov's augmented static trade-off theory: the full list of what debt adds to and subtracts "
        "from firm value.",
        "Start from MM's V<sup>U</sup>. Add one term for each friction of debt: corporate taxes, financial "
        "distress and the incentive effects of debt on managers and owners. Give each term the sign of its "
        "effect on value.",
        "<p><b>Step 1: the base.</b> The unlevered value.</p>"
        "<p><b>Step 2: the classic trade-off.</b> Which term is a gain, which a cost?</p>"
        "<p><b>Step 3: the agency terms.</b> Which are benefits of debt and which are costs?</p>"
        "<p><b>Watch out:</b> every term's sign must make economic sense.</p>",
    ),
    q="<p>Which expression is the augmented static trade-off theory from lecture 4?</p>",
    alternativer=[
        R("V<sup>L</sup> = V<sup>U</sup> + PV(TS) − PV(DC) + PV(IB) − PV(IC)"),
        F("V<sup>L</sup> = V<sup>U</sup> + PV(TS) − PV(DC)",
          "This is the static trade-off theory before the augmentation. The agency terms, incentive benefits and "
          "incentive costs, are missing."),
        F("V<sup>L</sup> = V<sup>U</sup> − PV(TS) + PV(DC) + PV(IB) − PV(IC)",
          "The tax shield and the distress costs have the wrong signs: the shield adds value, distress costs "
          "subtract."),
        F("V<sup>L</sup> = V<sup>U</sup> + PV(TS) − PV(DC) − PV(IB) + PV(IC)",
          "The incentive terms have the wrong signs: benefits of debt add value, incentive costs subtract."),
    ],
    kort="<p><b>V<sup>L</sup> = V<sup>U</sup> + PV(TS) − PV(DC) + PV(IB) − PV(IC).</b> The tax shield and the "
         "incentive benefits add value. Distress costs and incentive costs subtract (lecture 4, slide 24).</p>",
    full="<p><b>The terms.</b></p>"
         "<p><b>PV(TS)</b>, the interest tax shield: interest is deductible, so debt saves corporate tax.</p>"
         "<p><b>PV(DC)</b>, distress costs: direct costs (3–4% for large firms, 20–25% for small ones, times a "
         "default probability below 1% a year) and indirect costs such as fire sales, lost customers and debt "
         "overhang.</p>"
         "<p><b>PV(IB)</b>, incentive benefits: debt disciplines managers who would waste free cash flow.</p>"
         "<p><b>PV(IC)</b>, incentive costs: risk shifting, debt overhang and cashing out.</p>"
         "<p><b>Using it in an answer.</b> Sign each term for the firm in the question, say which dominates and "
         "conclude. Stable, tangible, cash-rich firms carry more debt. Intangible growth firms carry little.</p>"
         "<p><b>The caveat.</b> Lecture 4 stresses that the agency terms are very hard to quantify, for example "
         "what counts as empire building.</p>"
         "<p><b>Remember:</b> plus the shield and the benefits, minus the distress and the incentive costs.</p>",
)

# agt-s19 · Tilbakekjøp av gjeld: hvem vinner? (kursplanen: feil sensor påpeker)
statisk(
    "agt-s19", tema="agent", type="tolkning",
    hjelp=hjelp3(
        "This is a firm that raises equity and buys back part of its risky debt. Who captures the gain?",
        "Bond value = Σ p × min(CF, K). A bondholder compares the price offered with what her bond is worth if she "
        "keeps it after the deal. Check 3: creditors' gain + shareholders' gain = change in firm value.",
        "<p><b>Step 1: the debt after the deal.</b> With less debt the firm stops shifting risk. What is a "
        "remaining bond worth then?</p>"
        "<p><b>Step 2: the price sellers accept.</b> Would a bondholder sell for less than that?</p>"
        "<p><b>Step 3: the shareholders.</b> They pay for the buyback. Compare what they pay with the rise in their "
        "equity, then run check 3.</p>"
        "<p><b>Watch out:</b> a rise in firm value is not the same as a gain to the shareholders.</p>",
    ),
    q="<p>A firm with risky debt raises new equity from its shareholders and uses it to buy back most of its "
      "bonds. With less debt the firm will stop risk shifting, so it will be worth more. The bondholders "
      "understand this.</p>"
      "<p>Who captures the gain?</p>",
    alternativer=[
        R("The bondholders, both those who sell and those who keep their bonds"),
        F("The shareholders, since the firm is worth more after the deal",
          "The bonds become safer and so worth more. Bondholders sell only at that higher value. Paying it can cost "
          "the shareholders more than the whole gain."),
        F("Only the bondholders who keep their bonds; the sellers get the old price",
          "A seller knows the bonds will be safer after the deal, so she holds out for their value after the "
          "transaction. The old market price reflected the old risk."),
        F("Nobody: buying bonds at their market value is a zero-NPV trade",
          "The deal changes the firm: risk shifting stops and firm value rises. The bondholders take that rise and "
          "more."),
    ],
    kort="<p><b>The bondholders, sellers and holders alike.</b> Sellers hold out for the bonds' value after the "
         "deal, so the shareholders pay that value for every bond they retire. In spring 2024 Problem 1 the "
         "bondholders gain 16, the firm 8 and the shareholders lose 8.</p>",
    full="<p><b>The hold-out problem.</b> Before the deal the bonds are priced for the risk shifting the firm will "
         "do. Once the deal is known, every bondholder sees that the remaining bonds will be safer. Selling below "
         "that higher value would be a gift to the shareholders, so nobody does. The shareholders must pay the "
         "post-deal value for every bond they retire (spring 2024 Problem 1e).</p>"
         "<p><b>Step 1: before.</b> In that problem the firm owes face value 40 and runs strategy C, which "
         "succeeds with probability 0.6. Debt is worth 0.6 × 40 = 24, equity 18, the firm 42.</p>"
         "<p><b>Step 2: the deal.</b> Cutting the face value to 5 makes management switch to the safe strategy A, "
         "worth 50 for sure. The remaining debt is risk-free, so each bond is worth its face value and sellers "
         "demand it. The shareholders must put in 35 to retire face value 35.</p>"
         "<p><b>Step 3: who gains.</b> Bondholders: 35 in cash plus 5 of safe debt = 40, up 16. Shareholders: "
         "equity 50 − 5 = 45, minus the 35 they put in = 10, down 8. Firm: 50, up 8.</p>"
         "<p><b>Check 3.</b> +16 − 8 = +8, the agency cost removed. The bondholders capture more than the whole "
         "efficiency gain.</p>"
         "<p><b>Remember:</b> buying back risky debt helps the bondholders first, sellers included. Run check 3, "
         "then read the shareholders' column alone. The solution keys call the opposite belief an error.</p>",
)

# agt-s20 · Hvem vinner og taper ved en spin-off (PS1 E8, D7)
statisk(
    "agt-s20", tema="agent", type="tolkning",
    hjelp=hjelp3(
        "This is the «who wins and who loses» check from the wrap-up lecture, applied to a spin-off that leaves "
        "the debt with the risky division.",
        "Check 3: creditors' gain + shareholders' gain = change in firm value. Here the change in firm value is "
        "the lost synergies.",
        "<p><b>Step 1: the firm.</b> What does it lose?</p>"
        "<p><b>Step 2: the creditors.</b> Given in the question.</p>"
        "<p><b>Step 3: the shareholders.</b> Solve check 3 for their gain.</p>"
        "<p><b>Step 4: who is the winner?</b> A deal can destroy value and still make one group richer.</p><p><b>Watch out:</b> the shareholders' gain is neither the creditors' loss nor the value destroyed.</p>",
    ),
    q="<p>A firm splits into a safe and a risky company and leaves all of its debt with the risky one. The lost "
      "synergies destroy 16 of value. The creditors' claim falls in value by 24.</p>"
      "<p>Who wins and who loses?</p>",
    alternativer=[
        R("The shareholders gain 8, the creditors lose 24, the firm loses 16"),
        F("The shareholders lose 16 with the synergies, the creditors lose 24",
          "Then the firm would lose 40, not 16. Check 3: the creditors' and shareholders' gains must sum to the "
          "change in firm value."),
        F("The shareholders gain 24, the creditors lose 24, the firm is unchanged",
          "The synergies are lost, so the firm is worth 16 less. The shareholders capture the creditors' loss "
          "minus that."),
        F("Both groups lose, since the firm as a whole is worth less",
          "A deal that destroys value can still make one side richer. Here the shareholders gain at the "
          "creditors' expense."),
    ],
    kort="<p><b>Shareholders +8.</b> Check 3: −24 + E = −16, so E = +8. The deal destroys value but the shareholders "
         "gain, because the creditors lose more than the firm does.</p>",
    full="<p><b>The routine.</b> The wrap-up lecture asks you to check all parties: the manager, the shareholders "
         "and the creditors. For a spin-off that moves the debt, the numbers follow from check 3.</p>"
         "<p><b>Step 1: the firm.</b> Lost synergies: −16.</p>"
         "<p><b>Step 2: the creditors.</b> Their debt is now backed by the risky company only and defaults in its "
         "bad state: −24.</p>"
         "<p><b>Step 3: the shareholders.</b> −24 + gain = −16, so gain = <b>+8</b>.</p>"
         "<p><b>The mechanism.</b> This is risk shifting by restructuring (PS1 Exercise 8, Marriott in 1993). "
         "The shareholders keep the safe company whole and hold a call on the risky one. The creditors lose the "
         "cross-support of the safe cash flows.</p>"
         "<p><b>The ex ante view.</b> Creditors who foresee this lend on worse terms. A covenant that forbids it "
         "makes the debt cheaper, so it is good for the owners up front.</p>"
         "<p><b>Remember:</b> value destroyed and shareholders better off can both be true. Check 3 sorts it "
         "out.</p>",
)

# agt-s21 · Gjeldsoverheng og seniorgjeld (forelesning 4 s. 9–13)
statisk(
    "agt-s21", tema="agent", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about when debt overhang arises and whether new senior debt can help the old creditors.",
        "Debt = Σ p × min(CF, K). A senior claim is paid before the old debt in every state. Compute what "
        "the old creditors receive with and without a new project.",
        "<p><b>Step 1: safe debt.</b> If the old debt is paid in full anyway, who gets a project's gain?</p>"
        "<p><b>Step 2: senior debt.</b> In lecture 4's example, what did the old creditors recover with and "
        "without it?</p>"
        "<p><b>Step 3: judge each statement</b> on its own.</p>",
    ),
    q="<p>I. Debt overhang can arise only when the existing debt is risky.<br>"
      "II. Issuing new debt senior to the old can never leave the old creditors better off.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        R("Only I"),
        F("Only II",
          "Statement II is false: in lecture 4's example the old creditors recover more once a senior loan funds "
          "the project. Statement I holds."),
        F("Both I and II",
          "Statement II is false: senior money that funds a positive-NPV project can raise what the old "
          "creditors recover."),
        F("Neither I nor II",
          "Statement I holds: with safe debt the old creditors are paid in full anyway, so the whole gain goes "
          "to the shareholders."),
    ],
    kort="<p><b>Only I.</b> Overhang needs risky debt. And senior new money can make everyone better off: in lecture "
         "4 the old creditors recover 950K instead of 900K.</p>",
    full="<p><b>Statement I.</b> True. If the old debt is safe, it is paid in full whether or not the project goes "
         "ahead, so the whole NPV goes to the shareholders. Overhang needs debt that is not paid in full in some "
         "states (lecture 4, slide 12).</p>"
         "<p><b>Statement II.</b> False. Lecture 4's firm owes 1M and has assets worth 900K. A project costing "
         "100K returns 50%. Funded with new equity it would leave equity at 50K, so the shareholders refuse. "
         "Funded with 100K of senior debt, the firm is worth 1.05M, the senior lender is repaid first and the "
         "old creditors recover 950K instead of 900K. Everyone gains (slide 13).</p>"
         "<p><b>The twist.</b> Real debt contracts often forbid new debt of equal or higher seniority. The reason "
         "is that senior debt could also fund value-destroying gambles at the old creditors' expense, so they "
         "protect themselves in advance.</p>"
         "<p><b>Remember:</b> overhang needs risky debt. Senior new money is one cure, renegotiation another.</p>",
)

# agt-s22 · Eksemplene fra forelesning 4 (s. 18)
statisk(
    "agt-s22", tema="agent", type="fakta",
    hjelp=hjelp3(
        "This is about the real cases lecture 4 gives for the agency costs of debt.",
        "Lecture 4 lists four firms, each for a different form of excessive risk-taking: a split into two "
        "companies, a long delay of liquidation, excessive dividends and a leveraged buyout.",
        "<p><b>Step 1: the mechanism in the question.</b> Delaying an efficient liquidation in the hope of a "
        "miracle.</p>"
        "<p><b>Step 2: the cases.</b> A split into a safe and a risky part, excessive dividends, an LBO that "
        "sank the bonds, a long struggle to survive.</p>"
        "<p><b>Step 3: match</b> the mechanism to the case.</p>",
    ),
    q="<p>Lecture 4 gives several real cases of excessive risk-taking by firms with debt. Which case illustrates "
      "gambling for resurrection: delaying an efficient liquidation for years in the hope of a recovery?</p>",
    alternativer=[
        R("Eastern Airlines, 1975 to 1991"),
        F("Marriott Corporation in 1993",
          "Marriott split itself into a safer and a riskier company, a spin-off that moved value away from the "
          "creditors."),
        F("RJR Nabisco's leveraged buyout in 1989",
          "In the RJR Nabisco LBO the new debt made the existing public bonds sink in value. It is not a delayed "
          "liquidation."),
        F("KB Toys and Bain Capital in 2002",
          "KB Toys paid out excessive dividends to its owners, cashing out at the creditors' expense."),
    ],
    kort="<p><b>Eastern Airlines.</b> It delayed an efficient liquidation for years, hoping for a miracle: the "
         "creditors bore the downside while the owners and managers kept a chance of survival.</p>",
    full="<p><b>The cases in lecture 4</b> (slide 18). Kurbatov notes that it is hard to catch a firm openly "
         "gambling, but the decisions are visible at a subtler level.</p>"
         "<p><b>Marriott, 1993.</b> Split the business in two, one part considerably safer. That is the spin-off "
         "of PS1 Exercise 8: the debt is left with the risky part.</p>"
         "<p><b>Eastern Airlines, about 1975 to 1991.</b> Delayed an efficient liquidation as long as possible, "
         "hoping for a miracle: gambling for resurrection.</p>"
         "<p><b>KB Toys and Bain Capital, 2002.</b> Excessive dividends led to financial trouble: cashing out.</p>"
         "<p><b>RJR Nabisco, 1989.</b> A leveraged buyout made the value of the existing public debt sink: a "
         "transfer from old bondholders to the new owners.</p>"
         "<p><b>Remember:</b> each case is one agency cost of debt. In an essay, name the mechanism first and use "
         "the case as an illustration.</p>",
)
