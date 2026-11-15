# -*- coding: utf-8 -*-
"""Eksamenstrening FIE402, tema «skatt» (prefiks skt-): rentenes skatteskjold,
   rekapitalisering med skatt, lån med plan, trade-off, konkurskostnader og
   brannsalg. Skribent 1 (verdsettingskjeden). Kontrakten er
   docs/fie402-trening-spek.md.

   Familier (regnespørsmål med tallsvar)
     skt-perm1  kursen ved kunngjøringen med permanent gjeld (k7, kj3)
     skt-rec1   antall aksjer som kjøpes tilbake etter kunngjøringen
     skt-io1    rentelån: skjoldet er en annuitet diskontert med r_D (B8)
     skt-plan1  annuitetslån og serielån: skjoldet år for år med r_D
     skt-frac1  rente for brøkdel av år: et brolån over noen måneder (D3)
     skt-dc1    forventede direkte konkurskostnader per år (A8)
     skt-fire1  brannsalg: verdien av gjelden og dødvektstapet (D6)
     skt-to1    trade-off ved kunngjøringen: skjold minus forventede
                nødkostnader (prøveeksamen 3 e)

   Statiske: skt-s01 … skt-s13.

   Konvensjoner (Kurbatov 2026): bare renter gir skjold, aldri hovedstolen;
   fast gjeld (permanent eller med plan) diskonteres med r_D; konkurskostnader
   3–4 % for store og 20–25 % for små selskaper, ganget med en årlig
   sannsynlighet under 1 %; brannsalg og indirekte kostnader teller.
"""
from trening_lib import *  # noqa: F401,F403


NAVN = ["Hallingdal Cement", "Nordfôr", "Stordal Verft", "Fjellheim Hotels", "Brattøy Shipping",
        "Lofthus Dairy", "Vikna Aquaculture", "Ramberg Metals", "Sørkjosen Paper", "Kvitbjørn Mining",
        "Hareid Furniture", "Ålvik Smelting"]


# ---------------------------------------------------------------- tallformat
def _pct(x, d):
    return tall(round(x * 100, 9), d) + "%"


def _ep(x, mind=0, maxd=4):
    """Rente som brøk i prosent i kortest eksakte form (høyst maxd desimaler)."""
    for d in range(mind, maxd + 1):
        if abs(rund(x * 100, d) - x * 100) < 1e-7:
            return _pct(x, d)
    return _pct(x, maxd)


def _et(x, mind=0, maxd=6):
    for d in range(mind, maxd + 1):
        if abs(rund(x, d) - x) < 1e-9:
            return tall(x, d)
    return tall(x, maxd)


def _vt(x, eks=None):
    """Svaret med to desimaler fra 10 og oppover, fire under 10, så alle
       alternativene i en variant får samme form."""
    e = x if eks is None else eks
    if abs(e) >= 10 and abs(rund(x, 2) - e) <= 0.0008 * abs(e):
        return tall(x, 2)
    return tall(x, 4)


def _t4(x):
    return tall(x, 4)


def _velg(r, kandidater, n=3, rel=0.02):
    svar, rest = kandidater[0], list(kandidater[1:])
    r.shuffle(rest)
    valgt = []
    for k in rest:
        if all(not nær(k[2], v[2], rel) for v in [svar] + valgt):
            valgt.append(k)
        if len(valgt) == n:
            return valgt
    raise Avvis("for få feller som skiller seg fra svaret")


_TALLTEKST = __import__("re").compile(r"^[−-]?\d{1,3}(?:\u00a0\d{3})*(?:\.(\d+))?(%?)$")


def _alt(svartekst, svar, feller):
    """Alternativene: fasiten først, så fellene. Er fasiten et rent tall eller en
       prosent, vises fellene med like mange desimaler som fasiten."""
    m = _TALLTEKST.match(svartekst)
    ut = [R(svartekst, svar)]
    for t, f, v in feller:
        if m and _TALLTEKST.match(t):
            d = len(m.group(1) or "")
            t = _pct(v, d) if m.group(2) else tall(v, d)
        ut.append(F(t, f, v))
    return ut


def _firma(r):
    """Et selskap uten gjeld: navn, antall aksjer (millioner), V^U og hvordan
       spørsmålet oppgir verdien (kurs eller EBIT og r_U)."""
    navn = r.choice(NAVN)
    N = r.choice([20, 24, 25, 40, 50])
    tau = r.choice([0.22, 0.25, 0.40])
    if r.random() < 0.5:
        P0 = r.choice([15, 20, 25, 30, 40, 75])
        Vu = N * P0
        rU = None
        tekst = f"{navn} is all-equity financed with {N} million shares trading at NOK {P0}."
        vu_t = f"V<sup>U</sup> = {N} × {P0} = {tall(Vu)}"
    else:
        rU = r.choice([0.08, 0.09, 0.10, 0.12])
        fcf = r.choice([60, 72, 90, 120, 144])
        EBIT = fcf / (1 - tau)
        if abs(EBIT - round(EBIT, 2)) > 1e-9:
            raise Avvis("EBIT blir ikke et pent tall")
        Vu = fcf / rU
        if abs(Vu - round(Vu, 2)) > 1e-9:
            raise Avvis("V^U blir ikke et pent tall")
        P0 = Vu / N
        tekst = (f"{navn} is all-equity financed with {N} million shares. It earns EBIT of NOK {_et(EBIT, 0, 2)} "
                 f"million a year in perpetuity, capital expenditure equals depreciation and working capital does "
                 f"not change. Its unlevered cost of capital is {_ep(rU)}.")
        vu_t = (f"FCF = {_et(EBIT, 0, 2)} × (1 − {_ep(tau)}) = {_et(fcf)}, so V<sup>U</sup> = {_et(fcf)}/{_ep(rU)} = "
                f"{_et(Vu, 0, 2)} and P<sub>0</sub> = {_et(Vu, 0, 2)}/{N} = {_et(P0, 2, 4)}")
    return dict(navn=navn, N=N, tau=tau, P0=P0, Vu=Vu, rU=rU, tekst=tekst, vu_t=vu_t)


# ---------------------------------------------------------------------------
# skt-perm1 · Kursen ved kunngjøringen med permanent gjeld
# ---------------------------------------------------------------------------
@familie("skt-perm1", tema="skatt", antall=6, tittel="The share price when a permanent recap is announced",
         hjelp=hjelp3(
             "This is a leveraged recapitalisation with corporate taxes. You need the share price the moment the "
             "plan is announced, before any debt is issued or shares bought back.",
             "Fixed permanent debt: PV(TS) = τ<sub>c</sub>r<sub>D</sub>D/r<sub>D</sub> = τ<sub>c</sub>D. V<sup>L</sup> "
             "= V<sup>U</sup> + PV(TS). At the announcement P = (V<sup>U</sup> + PV(TS))/N<sub>0</sub>.",
             "<p><b>Step 1: the unlevered value.</b> Shares times price, or free cash flow over r<sub>U</sub>.</p>"
             "<p><b>Step 2: the shield.</b> The debt is fixed and permanent, so the shield is worth "
             "τ<sub>c</sub>D.</p>"
             "<p><b>Step 3: the new price.</b> All of it accrues to the shares outstanding before anything "
             "happens.</p>"
             "<p><b>Watch out:</b> the cash the firm borrows is not value. It goes straight back out to the "
             "sellers.</p>",
         ))
def _(r):
    s = _firma(r)
    N, tau, P0, Vu = s["N"], s["tau"], s["P0"], s["Vu"]
    D = round(Vu * r.choice([0.20, 0.25, 0.30, 0.40]) / 10) * 10
    rD = r.choice([0.04, 0.05, 0.06])
    ts = tau * D
    P1 = (Vu + ts) / N
    P1_x = P1

    f_none = P0
    f_one = P0 + tau * rD * D / N
    f_post = (Vu + ts - D) / (N - D / P0)
    f_cash = (Vu + ts + D) / N
    kand = [("R", None, P1),
            (_vt(f_none), "The price left unchanged, as if there were no taxes. The tax shield is new value and the "
                          "market prices it as soon as the plan is credible.", f_none),
            (_vt(f_one), f"One year's shield, {_ep(tau)} × {_ep(rD)} × {D} = {_et(tau * rD * D)}, added instead of "
                         f"its present value. The debt is permanent, so the shield lasts forever.", f_one),
            (_vt(f_post), "The shield shared among the shares left after a buyback at the old price. At the "
                          "announcement no shares have been bought yet and the buyback then runs at the new "
                          "price.", f_post),
            (_vt(f_cash), f"The {D} borrowed added to the firm's value on top of the shield. The cash is paid "
                          f"straight out to the selling shareholders, so it creates no value.", f_cash)]
    if s["rU"]:
        f_ru = P0 + tau * rD * D / s["rU"] / N
        kand.append((_vt(f_ru), f"The shield discounted at r<sub>U</sub> = {_ep(s['rU'])}. Fixed permanent debt has a "
                                f"shield as safe as the interest, so it is discounted at r<sub>D</sub>.", f_ru))
    feller = _velg(r, kand)

    q = (f"<p>{s['tekst']} Investors expect it to stay all-equity. The board announces, as a surprise, that it "
         f"will borrow NOK {tall(D)} million at r<sub>D</sub> = {_ep(rD)}, keep exactly that amount outstanding "
         f"forever and use the proceeds to buy back shares at the market price. The corporate tax rate is "
         f"{_ep(tau)}. Ignore costs of financial distress.</p>"
         f"<p>What is the share price just after the announcement, in NOK?</p>")
    n = D / P1
    kort = (f"<p><b>{_vt(P1, P1_x)}.</b> PV(TS) = τ<sub>c</sub>D = {_ep(tau)} × {tall(D)} = {_et(ts)}. "
            f"P = ({_et(Vu, 0, 2)} + {_et(ts)})/{N} = {_et(P1, 2, 4)}.</p>")
    full = (
        f"<p><b>Who gets the shield and when.</b> Interest is deductible, so the debt creates a tax saving every "
        f"year. The lenders pay a fair price for their bonds and gain nothing. The whole value of the shield goes "
        f"to the shareholders who own the firm when the plan becomes known. The market prices it at once, before "
        f"any debt is issued.</p>"
        f"<p><b>Step 1: the unlevered firm.</b> {s['vu_t']}.</p>"
        f"<p><b>Step 2: the shield.</b> TS = {_ep(tau)} × {_ep(rD)} × {tall(D)} = {_et(tau * rD * D)} a year, "
        f"forever. The amount is fixed, so the shield is as safe as the interest and is discounted at "
        f"r<sub>D</sub>: PV(TS) = {_et(tau * rD * D)}/{_ep(rD)} = {_et(ts)} = τ<sub>c</sub>D.</p>"
        f"<p><b>Step 3: the announcement price.</b> No shares have been bought yet, so the {N} million shares "
        f"share V<sup>U</sup> + PV(TS): ({_et(Vu, 0, 2)} + {_et(ts)})/{N} = <b>{_et(P1, 2, 4)}</b>.</p>"
        f"<p><b>First check.</b> The buyback runs at {_et(P1, 2, 4)}: {tall(D)}/{_et(P1, 2, 4)} = {_t4(n)} million "
        f"shares, leaving {_t4(N - n)} million. Equity after the buyback is {_et(Vu + ts - D, 0, 2)} and "
        f"{_et(Vu + ts - D, 0, 2)}/{_t4(N - n)} = {_et(P1, 2, 4)}. A buyback at the market price cannot move the "
        f"price. Buy at the old {_et(P0, 2, 4)} instead and the same check gives a different price, so it would "
        f"catch that error.</p>"
        f"<p><b>Remember:</b> with permanent debt the price jumps by τ<sub>c</sub>D/N<sub>0</sub> at the "
        f"announcement.</p>"
    )
    return sporsmal(q, _alt(_vt(P1, P1_x), P1, feller), kort, full, tall=tallsvar(verdi=P1_x, enhet="NOK per share"))


# ---------------------------------------------------------------------------
# skt-rec1 · Antall aksjer som kjøpes tilbake
# ---------------------------------------------------------------------------
@familie("skt-rec1", tema="skatt", antall=6, tittel="Shares bought back in a recap with taxes",
         hjelp=hjelp3(
             "This is the buyback step of a leveraged recapitalisation with taxes. You need the number of shares "
             "the firm buys back.",
             "P<sub>1</sub> = (V<sup>U</sup> + PV(TS))/N<sub>0</sub> at the announcement, with PV(TS) = "
             "τ<sub>c</sub>D for fixed permanent debt. Shares bought back = D/P<sub>1</sub>.",
             "<p><b>Step 1: the price after the announcement.</b> The shield is priced in before any debt is "
             "issued.</p>"
             "<p><b>Step 2: the buyback.</b> Divide the cash raised by that price.</p>"
             "<p><b>Watch out:</b> the buyback does not run at the old price. Nobody sells for less than the shares "
             "are worth once the plan is known.</p>",
         ))
def _(r):
    s = _firma(r)
    N, tau, P0, Vu = s["N"], s["tau"], s["P0"], s["Vu"]
    D = round(Vu * r.choice([0.20, 0.25, 0.30, 0.40, 0.50]) / 10) * 10
    rD = r.choice([0.04, 0.05, 0.06])
    ts = tau * D
    P1 = (Vu + ts) / N
    n = D / P1

    f_old = D / P0
    f_one = D / (P0 + tau * rD * D / N)
    f_sub = D / ((Vu + ts - D) / N)
    f_cash = D / ((Vu + ts + D) / N)
    kand = [("R", None, n),
            (_t4(f_old), f"Bought back at the old price of {_et(P0, 2, 4)}. The shield is priced in at the "
                         f"announcement, so nobody sells for that any more.", f_old),
            (_t4(f_one), "The price raised by one year's shield instead of its present value. Permanent debt gives "
                         "a shield that lasts forever.", f_one),
            (_t4(f_sub), "The debt subtracted from the value while the borrowed cash is still in the firm. Before "
                         "the buyback the firm holds the cash, so the equity is still V<sup>U</sup> + PV(TS).", f_sub),
            (_t4(f_cash), "The borrowed cash added to the value of the shares on top of the shield. The cash goes "
                          "out to the sellers, so it does not raise the price.", f_cash)]
    feller = _velg(r, kand)

    q = (f"<p>{s['tekst']} Investors expect it to stay all-equity. It announces that it will borrow NOK {tall(D)} "
         f"million at r<sub>D</sub> = {_ep(rD)} as permanent debt and use all of it to buy back shares at the "
         f"market price. The market believes the plan at once. The corporate tax rate is {_ep(tau)}. Ignore costs "
         f"of financial distress.</p>"
         f"<p>How many shares does the firm buy back, in millions?</p>")
    kort = (f"<p><b>{_t4(n)}.</b> P<sub>1</sub> = ({_et(Vu, 0, 2)} + {_ep(tau)} × {tall(D)})/{N} = "
            f"{_et(P1, 2, 6)}. {tall(D)}/{_et(P1, 2, 6)} = {_t4(n)} million shares.</p>")
    full = (
        f"<p><b>The order of events.</b> The price moves when the market learns about the debt, not when the debt "
        f"is issued. At the announcement the whole PV(TS) lands on the shares already outstanding. The buyback "
        f"then runs at that higher price, so it moves nothing further.</p>"
        f"<p><b>Step 1: the shield.</b> {s['vu_t']}. Permanent debt: PV(TS) = {_ep(tau)} × {tall(D)} = "
        f"{_et(ts)}.</p>"
        f"<p><b>Step 2: the price after the announcement.</b> ({_et(Vu, 0, 2)} + {_et(ts)})/{N} = "
        f"{_et(P1, 2, 6)}.</p>"
        f"<p><b>Step 3: the buyback.</b> {tall(D)}/{_et(P1, 2, 6)} = <b>{_t4(n)}</b> million shares, leaving "
        f"{_t4(N - n)} million.</p>"
        f"<p><b>First check.</b> After the buyback the equity is {_et(Vu, 0, 2)} + {_et(ts)} − {tall(D)} = "
        f"{_et(Vu + ts - D, 0, 2)} and {_et(Vu + ts - D, 0, 2)}/{_t4(N - n)} = {_et(P1, 2, 4)}, the announcement "
        f"price. The old shareholders now hold {tall(D)} in cash plus {_et(Vu + ts - D, 0, 2)} in shares: "
        f"{_et(Vu + ts, 0, 2)}, which is {_et(ts)} more than before, the whole PV(TS). Sellers and holders gain "
        f"the same per share.</p>"
        f"<p><b>Remember:</b> shares bought back = D/P<sub>1</sub>, with P<sub>1</sub> the price after the "
        f"announcement.</p>"
    )
    return sporsmal(q, _alt(_t4(n), n, feller), kort, full, tall=tallsvar(enhet="million shares"))


# ---------------------------------------------------------------------------
# skt-io1 · Rentelån: skjoldet er en annuitet (B8, forelesning 3)
# ---------------------------------------------------------------------------
@familie("skt-io1", tema="skatt", antall=6, tittel="An interest-only loan: the tax shield as an annuity",
         hjelp=hjelp3(
             "This is the tax shield on a loan that pays interest every year and repays the principal at the end. "
             "You need the present value of the shield.",
             "TS = τ<sub>c</sub> × interest each year. The interest is fixed by contract, so PV(TS) = TS × "
             "[1 − (1 + r<sub>D</sub>)<sup>−T</sup>]/r<sub>D</sub>. The repayment of principal is not "
             "deductible.",
             "<p><b>Step 1: the yearly shield.</b> Tax rate times the interest.</p>"
             "<p><b>Step 2: the annuity factor</b> at the debt's rate over the life of the loan.</p>"
             "<p><b>Step 3: multiply.</b></p>"
             "<p><b>Watch out:</b> τ<sub>c</sub>D is the shield of debt that never ends. A loan that ends is worth "
             "less.</p>",
         ))
def _(r):
    navn = r.choice(NAVN)
    L = r.choice([200, 300, 500, 600, 1000, 2000])
    rD = r.choice([0.04, 0.05, 0.06, 0.07])
    T = r.choice([5, 8, 10])
    tau = r.choice([0.22, 0.25, 0.35])
    rU = r.choice([0.09, 0.10, 0.11])
    renter = rD * L
    TS = tau * renter
    AF_x = annuitetsfaktor(rD, T)
    AF = rund(AF_x, 6)
    pv = TS * AF
    pv_x = TS * AF_x

    f_tD = tau * L
    f_ru = TS * annuitetsfaktor(rU, T)
    f_sum = T * TS
    f_pr = pv_x + tau * L / (1 + rD) ** T
    kand = [("R", None, pv),
            (_vt(f_tD), f"The permanent-debt shortcut τ<sub>c</sub>D = {_ep(tau)} × {tall(L)} on a loan that ends "
                        f"in year {T}.", f_tD),
            (_vt(f_ru), f"Discounted at r<sub>U</sub> = {_ep(rU)}. The interest is fixed by contract, so the shield is "
                        f"as safe as the debt and is discounted at r<sub>D</sub>.", f_ru),
            (_vt(f_sum), f"The {T} shields added up without discounting.", f_sum),
            (_vt(f_pr), f"The repayment of {tall(L)} counted as deductible in year {T}. Only interest reduces "
                        f"taxable profit, never the principal.", f_pr)]
    feller = _velg(r, kand)

    if r.random() < 0.5:
        lan = (f"{navn} borrows NOK {tall(L)} million at r<sub>D</sub> = {_ep(rD)} for {T} years. It pays interest "
               f"every year and repays the full principal at the end of year {T}.")
    else:
        lan = (f"{navn} has a loan with a principal of NOK {tall(L)} million, due in {T} years. Until then it pays "
               f"interest of NOK {_et(renter)} million at the end of every year. The loan is priced at par, so "
               f"r<sub>D</sub> = {_ep(rD)}.")
    q = (f"<p>{lan} The corporate tax rate is {_ep(tau)} and the firm's unlevered cost of capital is {_ep(rU)}.</p>"
         f"<p>What is the present value of the interest tax shield, in NOK million?</p>")
    kort = (f"<p><b>{_vt(pv, pv_x)}.</b> TS = {_ep(tau)} × {_et(renter)} = {_et(TS)} a year for {T} years. "
            f"Annuity factor at {_ep(rD)}: {_et(AF)}. PV(TS) = {_et(TS)} × {_et(AF)} = {_et(pv, 2, 4)}.</p>")
    par = tau * (L - L / (1 + rD) ** T)
    full = (
        f"<p><b>Why an annuity.</b> The interest is the same every year and fixed by contract, so each year's shield "
        f"is the same safe amount until the loan ends. It is discounted at r<sub>D</sub>, the rate on the debt "
        f"that produces it. Kurbatov's lecture 3 example: 100 million of interest for 10 years at "
        f"τ<sub>c</sub> = 35% and r<sub>f</sub> = 5% gives 35 × 7.7217 = 270.26 million.</p>"
        f"<p><b>Step 1: the shield.</b> Interest = {_ep(rD)} × {tall(L)} = {_et(renter)}. TS = {_ep(tau)} × "
        f"{_et(renter)} = {_et(TS)} a year.</p>"
        f"<p><b>Step 2: the annuity factor.</b> [1 − {_et(1 + rD, 2)}<sup>−{T}</sup>]/{_ep(rD)} = {_et(AF)}.</p>"
        f"<p><b>Step 3: PV(TS).</b> {_et(TS)} × {_et(AF)} = <b>{_et(pv, 2, 4)}</b>. The {tall(L)} repaid in year "
        f"{T} adds nothing: principal is not deductible.</p>"
        f"<p><b>First check: the par route.</b> At par the shield equals τ<sub>c</sub> times the debt minus the "
        f"present value of the final repayment: {_ep(tau)} × ({tall(L)} − {tall(L)}/{_et(1 + rD, 2)}<sup>{T}</sup>) "
        f"= {_et(par, 2, 2)}. It lies below the ceiling τ<sub>c</sub>D = {_et(tau * L)}, as a loan that ends "
        f"must.</p>"
        f"<p><b>Remember:</b> only interest shields and a fixed loan's shield is discounted at r<sub>D</sub>.</p>"
    )
    return sporsmal(q, _alt(_vt(pv, pv_x), pv, feller), kort, full, tall=tallsvar(verdi=pv_x, enhet="NOK million"))


# ---------------------------------------------------------------------------
# skt-plan1 · Annuitetslån og serielån: skjoldet år for år
# ---------------------------------------------------------------------------
@familie("skt-plan1", tema="skatt", antall=6, tittel="A loan with a repayment plan: the shield year by year",
         hjelp=hjelp3(
             "This is the tax shield on a loan that is repaid on a fixed plan. You need the present value of the "
             "shields.",
             "TS<sub>t</sub> = τ<sub>c</sub> × r<sub>D</sub> × B<sub>t−1</sub>, with B<sub>t−1</sub> the balance "
             "outstanding during year t. PV(TS) = Σ TS<sub>t</sub>/(1 + r<sub>D</sub>)<sup>t</sup>: every balance "
             "is known today.",
             "<p><b>Step 1: the plan.</b> Write the balance at the start of each year after the previous "
             "repayment.</p>"
             "<p><b>Step 2: interest and shield</b> on each opening balance.</p>"
             "<p><b>Step 3: discount each shield</b> at the rate on the debt and add up.</p>"
             "<p><b>Watch out:</b> only the interest part of a payment is deductible, not the instalment.</p>",
         ))
def _(r):
    navn = r.choice(NAVN)
    L = r.choice([300, 400, 500, 600, 900])
    rD = r.choice([0.05, 0.06, 0.08])
    T = r.choice([3, 4])
    tau = r.choice([0.22, 0.25, 0.30])
    rU = r.choice([0.10, 0.11, 0.12])
    type_ = r.choice(["annuitet", "serie"])
    B = [float(L)]
    if type_ == "annuitet":
        A = annuitet(L, rD, T)
        for t in range(1, T + 1):
            B.append(B[-1] * (1 + rD) - A)
        B[-1] = 0.0
        B = [rund(b, 4) for b in B]
        plan_q = (f"The loan is an annuity: it is repaid with {T} equal annual payments of NOK {_et(A, 2, 4)} million, "
                  f"which cover interest and principal.")
    else:
        for t in range(1, T + 1):
            B.append(L * (1 - t / T))
        B = [rund(b, 4) for b in B]
        plan_q = f"The principal is repaid in {T} equal annual instalments of NOK {_et(L / T, 0, 4)} million."
    rente = [rund(rD * B[t - 1], 4) for t in range(1, T + 1)]
    TS = [rund(tau * x, 4) for x in rente]
    PVs = [rund(TS[t - 1] / (1 + rD) ** t, 4) for t in range(1, T + 1)]
    pv = sum(PVs)
    pv_x = sum(tau * rD * (B[t - 1]) / (1 + rD) ** t for t in range(1, T + 1))

    f_pay = tau * L
    f_io = tau * rD * L * annuitetsfaktor(rD, T)
    f_ru = sum(tau * rD * B[t - 1] / (1 + rU) ** t for t in range(1, T + 1))
    f_cl = sum(tau * rD * B[t] / (1 + rD) ** t for t in range(1, T + 1))
    kand = [("R", None, pv),
            (_vt(f_pay), "Every payment treated as deductible, principal included. In present value that is "
                         "τ<sub>c</sub> × L, the shield of debt that never ends.", f_pay),
            (_vt(f_io), "Interest charged on the original amount every year, as if nothing were repaid until the "
                        "end.", f_io),
            (_vt(f_ru), f"Discounted at r<sub>U</sub> = {_ep(rU)}. The plan is fixed by contract, so every balance is "
                        f"known and the shields are as safe as the debt.", f_ru),
            (_vt(f_cl), "Interest charged on the balance at the end of each year. Interest in year t is paid on the "
                        "balance outstanding during the year, B<sub>t−1</sub>.", f_cl)]
    feller = _velg(r, kand)

    q = (f"<p>{navn} borrows NOK {tall(L)} million today at r<sub>D</sub> = {_ep(rD)}. {plan_q} Interest is paid each "
         f"year on the balance outstanding during that year. The corporate tax rate is {_ep(tau)} and the firm's "
         f"unlevered cost of capital is {_ep(rU)}.</p>"
         f"<p>What is the present value of the interest tax shield, in NOK million?</p>")
    rader = "".join(
        f"<tr><td class=\"n\">{t}</td><td class=\"n\">{_et(B[t - 1], 0, 4)}</td><td class=\"n\">{_et(rente[t - 1], 0, 4)}</td>"
        f"<td class=\"n\">{_et(TS[t - 1], 0, 4)}</td><td class=\"n\">{_t4(PVs[t - 1])}</td></tr>"
        for t in range(1, T + 1))
    tabell = (f"<table class=\"data\"><tr><th>Year</th><th>Opening balance</th><th>Interest at {_ep(rD)}</th>"
              f"<th>TS at {_ep(tau)}</th><th>PV at {_ep(rD)}</th></tr>{rader}</table>")
    kort = (f"<p><b>{_vt(pv, pv_x)}.</b> Shields on the opening balances "
            + ", ".join(_et(b, 0, 2) for b in B[:-1][:-1]) + f" and {_et(B[T - 1], 0, 2)}, each discounted at "
            f"{_ep(rD)}: " + " + ".join(_t4(x) for x in PVs) + f" = {_t4(pv)}.</p>")
    full = (
        f"<p><b>The rule.</b> When the repayment plan is in the contract, every future balance is known today. "
        f"Each shield is then as safe as the debt and is discounted at r<sub>D</sub>. Only the interest part of a "
        f"payment is deductible. There is no shortcut: build the table.</p>"
        f"<p><b>Step 1 to 3: the table.</b></p>{tabell}"
        f"<p><b>Step 4: add up.</b> PV(TS) = " + " + ".join(_t4(x) for x in PVs) + f" = <b>{_t4(pv)}</b>.</p>"
        f"<p><b>First check.</b> Every shield is {_ep(tau)} × {_ep(rD)} = {_ep(tau * rD)} of the opening balance, "
        f"so PV(TS) = {_ep(tau * rD)} × (" + " + ".join(
            f"{_et(B[t - 1], 0, 2)}/{_et(1 + rD, 2)}" + (f"<sup>{t}</sup>" if t > 1 else "") for t in range(1, T + 1))
        + f") = {_et(pv_x, 2, 4)} without rounding. It lies between 0 and the ceiling τ<sub>c</sub> × {tall(L)} = "
          f"{_et(tau * L)}, as a loan that is repaid must.</p>"
          f"<p><b>Remember:</b> shield = τ<sub>c</sub> × r<sub>D</sub> × the balance during the year, discounted at "
          f"r<sub>D</sub> for a fixed plan.</p>"
    )
    return sporsmal(q, _alt(_vt(pv, pv_x), pv, feller), kort, full, tall=tallsvar(verdi=pv_x, enhet="NOK million"))


# ---------------------------------------------------------------------------
# skt-frac1 · Rente for brøkdel av år: et lån over noen måneder (D3)
# ---------------------------------------------------------------------------
@familie("skt-frac1", tema="skatt", antall=5, tittel="A loan for part of a year: discrete compounding",
         hjelp=hjelp3(
             "This is the tax shield on a loan that runs for a number of months, with the rate quoted per year. You "
             "need the present value of the shield.",
             "With an effective annual rate r and T in years, interest = L[(1 + r)<sup>T</sup> − 1] and PV = "
             "C/(1 + r)<sup>T</sup>, with T the number of months divided by 12.",
             "<p><b>Step 1: the time in years.</b></p>"
             "<p><b>Step 2: the interest</b> over that period with compounding, not r × T.</p>"
             "<p><b>Step 3: the shield</b> is the tax rate times the interest, paid at maturity.</p>"
             "<p><b>Step 4: discount</b> over the same fraction of a year.</p>",
         ))
def _(r):
    navn = r.choice(NAVN)
    L = r.choice([100, 200, 250, 400, 500])
    mnd = r.choice([6, 9, 18, 30])
    T = mnd / 12
    rD = r.choice([0.06, 0.08, 0.10, 0.12])
    tau = r.choice([0.22, 0.25])
    fak = (1 + rD) ** T
    I = L * (fak - 1)
    TS = tau * I
    pv = TS / fak

    f_simple = tau * L * rD * T / fak
    f_year = TS / (1 + rD)
    f_nod = TS
    f_s2 = tau * L * rD * T / (1 + rD * T)
    kand = [("R", None, pv),
            (_vt(f_simple), f"Pro-rata interest, {_ep(rD)} × {_et(T, 1, 4)}, instead of compounding over the period. "
                            f"The course compounds: (1 + r)<sup>T</sup> − 1.", f_simple),
            (_vt(f_year), "Discounted over one full year. The shield arrives when the loan ends, after "
                          f"{mnd} months.", f_year),
            (_vt(f_nod), "The shield left undiscounted. It arrives at maturity and is worth less today.", f_nod),
            (_vt(f_s2), "Simple interest both ways: interest L × r × T and discounting by 1 + r × T. The course "
                        "uses (1 + r)<sup>T</sup> for fractions of a year.", f_s2)]
    feller = _velg(r, kand)

    q = (f"<p>{navn} takes a bridge loan of NOK {tall(L)} million for {mnd} months. The lender charges an "
         f"effective annual rate of {_ep(rD)} and all interest is paid together with the principal when the loan "
         f"ends. The interest is tax-deductible at {_ep(tau)}. Assume the tax saving arrives when the interest is "
         f"paid and discount it at the loan rate.</p>"
         f"<p>What is the present value of the interest tax shield, in NOK million?</p>")
    kort = (f"<p><b>{_vt(pv)}.</b> T = {_et(T, 1, 4)}. Interest = {tall(L)} × ({_et(1 + rD, 2)}<sup>{_et(T, 1, 4)}</sup> − 1) = "
            f"{_t4(I)}. TS = {_ep(tau)} × {_t4(I)} = {_t4(TS)}, so PV = {_t4(TS)}/{_t4(fak)} = {_t4(pv)}.</p>")
    full = (
        f"<p><b>Fractions of a year.</b> An annual rate compounds, so over T years one krone grows to "
        f"(1 + r)<sup>T</sup>, also when T is not a whole number. Kurbatov's wrap-up names 1.5 years, half a year "
        f"(the square root) and months to years as things that can come up. Never use r × T: the course "
        f"discounts discretely.</p>"
        f"<p><b>Step 1: the time.</b> {mnd} months = {_et(T, 1, 4)} years.</p>"
        f"<p><b>Step 2: the interest.</b> {_et(1 + rD, 2)}<sup>{_et(T, 1, 4)}</sup> = {_t4(fak)}, so the interest "
        f"is {tall(L)} × {_t4(fak - 1)} = {_t4(I)}.</p>"
        f"<p><b>Step 3: the shield.</b> {_ep(tau)} × {_t4(I)} = {_t4(TS)}, at month {mnd}.</p>"
        f"<p><b>Step 4: discount.</b> {_t4(TS)}/{_t4(fak)} = <b>{_t4(pv)}</b>.</p>"
        f"<p><b>First check.</b> Discounting at the loan rate undoes the compounding, so PV(TS) = τ<sub>c</sub> × L "
        f"× [1 − (1 + r)<sup>−T</sup>] = {_ep(tau)} × {tall(L)} × {_t4(1 - 1 / fak)} = {_t4(tau * L * (1 - 1 / fak))}. "
        f"It is the same formula, so it catches slips only.</p>"
        f"<p><b>Remember:</b> (1 + r)<sup>T</sup> for any T in years, both to compound and to discount.</p>"
    )
    return sporsmal(q, _alt(_vt(pv), pv, feller), kort, full, tall=tallsvar(enhet="NOK million"))


# ---------------------------------------------------------------------------
# skt-dc1 · Forventede direkte konkurskostnader per år (A8, forelesning 4)
# ---------------------------------------------------------------------------
@familie("skt-dc1", tema="skatt", antall=5, tittel="Expected direct costs of bankruptcy",
         hjelp=hjelp3(
             "This is the size of the direct costs of bankruptcy once you weight them by how likely bankruptcy is. "
             "You need the expected cost per year.",
             "Expected direct cost per year = annual probability of bankruptcy × direct cost as a share of value × "
             "firm value. Kurbatov: about 3–4% of value for large firms and 20–25% for small ones, with a probability "
             "below 1% a year.",
             "<p><b>Step 1: pick the cost rate</b> that fits the firm's size.</p>"
             "<p><b>Step 2: the cost if bankruptcy happens</b>: that rate times the firm's value.</p>"
             "<p><b>Step 3: weight by the probability</b> of bankruptcy in a year.</p>"
             "<p><b>Watch out:</b> the costs are a share of the firm's value, not of its debt.</p>",
         ))
def _(r):
    navn = r.choice(NAVN)
    stor = r.random() < 0.5
    V = r.choice([2000, 5000, 8000, 10000]) if stor else r.choice([100, 150, 200, 400])
    c_stor, c_liten = r.choice([(0.03, 0.20), (0.04, 0.25), (0.03, 0.25), (0.04, 0.20)])
    c = c_stor if stor else c_liten
    c_feil = c_liten if stor else c_stor
    p = r.choice([0.005, 0.006, 0.008, 0.009])
    D = round(V * r.choice([0.30, 0.40, 0.50]))
    rD = r.choice([0.05, 0.06])
    tau = r.choice([0.22, 0.25])
    E_ = p * c * V

    f_nop = c * V
    f_D = p * c * D
    f_size = p * c_feil * V
    kand = [("R", None, E_),
            (_vt(f_nop), "The cost if bankruptcy happens, not weighted by its probability. The expected cost is "
                         "far smaller.", f_nop),
            (_vt(f_D), f"The cost rate applied to the debt of {tall(D)}. The direct costs are a share of the "
                       f"firm's value.", f_D),
            (_vt(f_size), f"The cost rate for a {'small' if stor else 'large'} firm used. {navn} is "
                          f"{'large' if stor else 'small'}.", f_size)]
    feller = _velg(r, kand)

    q = (f"<p>Studies find that the direct costs of bankruptcy (lawyers, courts, advisers) are about {_ep(c_stor)} of "
         f"firm value for large firms and about {_ep(c_liten)} for small firms. {navn} is a "
         f"{'large' if stor else 'small'} firm worth NOK {tall(V)} million, with NOK {tall(D)} million of debt at "
         f"{_ep(rD)}. Its probability of going bankrupt in any given year is {_ep(p)}. The corporate tax rate is "
         f"{_ep(tau)}.</p>"
         f"<p>What is {gen(navn)} expected direct cost of bankruptcy per year, in NOK million?</p>")
    TS = tau * rD * D
    kort = (f"<p><b>{_vt(E_)}.</b> {_ep(p)} × {_ep(c)} × {tall(V)} = {_et(E_, 2, 4)} a year.</p>")
    full = (
        f"<p><b>Why the number is small.</b> Direct costs are what the bankruptcy process itself costs: lawyers, "
        f"courts and advisers. Kurbatov (lecture 4) puts them at about 3–4% of value for large firms and 20–25% for "
        f"small ones. Weighted by an annual probability of bankruptcy below 1%, they shrink to almost nothing.</p>"
        f"<p><b>Step 1: the rate.</b> {navn} is {'large' if stor else 'small'}, so the cost is {_ep(c)} of "
        f"value.</p>"
        f"<p><b>Step 2: the cost if it happens.</b> {_ep(c)} × {tall(V)} = {_et(c * V, 0, 2)}.</p>"
        f"<p><b>Step 3: the expected cost.</b> {_ep(p)} × {_et(c * V, 0, 2)} = <b>{_et(E_, 2, 4)}</b> a year.</p>"
        f"<p><b>First check: against the tax shield.</b> The debt saves {_ep(tau)} × {_ep(rD)} × {tall(D)} = "
        f"{_et(TS, 0, 4)} a year in tax, "
        + (f"about {_et(TS / E_, 0, 0)} times the expected direct cost. " if TS > 1.5 * E_ else
           "a little more than the expected direct cost. " if TS > E_ else
           "less than the expected direct cost here, an unusually small shield. ")
        + f"Direct costs alone cannot explain why firms borrow so little. The costs Kurbatov stresses are the "
          f"indirect ones: fire sales, lost customers and staff, suppliers who demand cash.</p>"
          f"<p><b>Remember:</b> expected direct cost = probability × cost rate × value. It is small, so the "
          f"trade-off is driven by indirect costs.</p>"
    )
    return sporsmal(q, _alt(_vt(E_), E_, feller), kort, full, tall=tallsvar(enhet="NOK million"))


# ---------------------------------------------------------------------------
# skt-fire1 · Brannsalg: gjeldens verdi og dødvektstapet (D6)
# ---------------------------------------------------------------------------
_HJ_FIRE_A = hjelp3(
    "This is pricing risky debt when default forces a fire sale of the assets. You need the value of the debt today.",
    "D<sub>0</sub> = [p × min(K, V<sub>good</sub>) + (1 − p) × recovery<sub>bad</sub>]/(1 + r<sub>f</sub>) with "
    "risk-neutral investors. In default the lenders get what the assets fetch in the fire sale.",
    "<p><b>Step 1: the good state.</b> The lenders are paid in full.</p>"
    "<p><b>Step 2: the bad state.</b> The assets are sold for a fraction of their value and the lenders get that "
    "amount.</p>"
    "<p><b>Step 3: weight by the probabilities and discount</b> one year at the risk-free rate.</p>"
    "<p><b>Watch out:</b> the promise is not the value. Default and the fire sale both cut what lenders "
    "receive.</p>")
_HJ_FIRE_B = hjelp3(
    "This is the cost of a fire sale: the value that disappears when assets must be sold below their worth. You "
    "need its present value today.",
    "Deadweight loss in the bad state = asset value − fire-sale price. PV = (1 − p) × loss/(1 + r<sub>f</sub>) "
    "with risk-neutral investors. A transfer from lenders to owners is not a cost.",
    "<p><b>Step 1: the loss in the bad state.</b> What the assets are worth minus what they fetch.</p>"
    "<p><b>Step 2: weight by the probability</b> of the bad state.</p>"
    "<p><b>Step 3: discount</b> one year.</p>"
    "<p><b>Watch out:</b> the lenders' shortfall below the face value is mostly a transfer. Only the value nobody "
    "receives counts.</p>")


@familie("skt-fire1", tema="skatt", antall=6, tittel="Fire sales: the value of debt and the deadweight loss",
         hjelp=_HJ_FIRE_A)
def _(r):
    navn = r.choice(NAVN)
    K = r.choice([30, 40, 50, 60])
    Ag = r.choice([80, 100, 120])
    Ab = r.choice([15, 20, 24, 30])
    if Ab >= K:
        raise Avvis("ingen mislighold")
    p = r.choice([0.5, 0.6, 0.7, 0.75])
    f = r.choice([0.5, 0.6])
    rf = r.choice([0.02, 0.03, 0.04, 0.05])
    type_ = r.choice(["A", "B"])
    rec = f * Ab
    tap = (1 - f) * Ab

    if type_ == "A":
        svar = (p * K + (1 - p) * rec) / (1 + rf)
        f_nofs = (p * K + (1 - p) * Ab) / (1 + rf)
        f_prom = K / (1 + rf)
        f_nod = p * K + (1 - p) * rec
        kand = [("R", None, svar),
                (_vt(f_nofs), f"The fire sale left out: the lenders get the full {Ab} in the bad state. They get "
                              f"only what the assets fetch.", f_nofs),
                (_vt(f_prom), f"The promised {K} discounted as if it were safe. The loan defaults in the bad "
                              f"state.", f_prom),
                (_vt(f_nod), "The expected payoff left undiscounted. It arrives in one year.", f_nod)]
        feller = _velg(r, kand)
        sporsm = f"What is the bank loan worth today, in NOK million?"
        kort = (f"<p><b>{_vt(svar)}.</b> Bad state: the lenders get {_et(f, 1)} × {Ab} = {_et(rec)}. D<sub>0</sub> = "
                f"({_et(p, 1)} × {K} + {_et(1 - p, 1, 2)} × {_et(rec)})/{_et(1 + rf, 2)} = {_et(svar, 2, 4)}.</p>")
        midt = (f"<p><b>Step 1: the good state.</b> The assets are worth {Ag}, more than the {K} owed, so the bank "
                f"gets {K}.</p>"
                f"<p><b>Step 2: the bad state.</b> The assets are worth {Ab}, less than {K}, so the firm defaults. The "
                f"fire sale fetches {_et(f, 1)} × {Ab} = {_et(rec)} and that is all the bank gets.</p>"
                f"<p><b>Step 3: the value.</b> ({_et(p, 1)} × {K} + {_et(1 - p, 1, 2)} × {_et(rec)})/{_et(1 + rf, 2)} = "
                f"({_et(p * K)} + {_et((1 - p) * rec)})/{_et(1 + rf, 2)} = <b>{_et(svar, 2, 4)}</b>.</p>"
                f"<p><b>First check.</b> Without the fire sale the loan would be worth "
                f"{_et(f_nofs, 2, 4)}. The gap, {_et(f_nofs - svar, 2, 4)}, is the present value of the fire-sale "
                f"loss, {_et(1 - p, 1, 2)} × {_et(tap)}/{_et(1 + rf, 2)}. With the loan already outstanding the bank "
                f"bears it: the shareholders get nothing in the bad state either way. Before the loan is made, a "
                f"bank that sees this coming pays only {_et(svar, 2, 4)} for the promise, so the shareholders bear "
                f"it up front.</p>")
        hj = _HJ_FIRE_A
    else:
        svar = (1 - p) * tap / (1 + rf)
        f_tr = (1 - p) * (K - rec) / (1 + rf)
        f_nod = (1 - p) * tap
        f_nop = tap / (1 + rf)
        kand = [("R", None, svar),
                (_vt(f_tr), f"The lenders' whole shortfall, {K} − {_et(rec)}, counted as the cost. Most of it, "
                            f"{K} − {Ab}, is a transfer: the assets were worth only {Ab} anyway. Only the value "
                            f"nobody receives is a cost.", f_tr),
                (_vt(f_nod), "The expected loss left undiscounted. It happens in one year.", f_nod),
                (_vt(f_nop), "The loss in the bad state not weighted by its probability.", f_nop)]
        feller = _velg(r, kand)
        sporsm = (f"By how much does the possibility of a fire sale reduce the total value of the firm's debt and "
                  f"equity today, in NOK million?")
        kort = (f"<p><b>{_vt(svar)}.</b> In the bad state {_et(1 - f, 1)} × {Ab} = {_et(tap)} of value is lost. "
                f"PV = {_et(1 - p, 1, 2)} × {_et(tap)}/{_et(1 + rf, 2)} = {_et(svar, 2, 4)}.</p>")
        midt = (f"<p><b>Step 1: the loss in the bad state.</b> The assets are worth {Ab} but fetch only {_et(f, 1)} × "
                f"{Ab} = {_et(rec)}. The difference, {_et(tap)}, goes to nobody: it is the deadweight cost.</p>"
                f"<p><b>Step 2: weight it.</b> The bad state has probability {_et(1 - p, 1, 2)}: {_et(1 - p, 1, 2)} × "
                f"{_et(tap)} = {_et((1 - p) * tap)}.</p>"
                f"<p><b>Step 3: discount.</b> {_et((1 - p) * tap)}/{_et(1 + rf, 2)} = <b>{_et(svar, 2, 4)}</b>.</p>"
                f"<p><b>First check: value by claim.</b> Without the fire sale the firm is worth "
                f"({_et(p, 1)} × {Ag} + {_et(1 - p, 1, 2)} × {Ab})/{_et(1 + rf, 2)} = {_et((p * Ag + (1 - p) * Ab) / (1 + rf), 2, 4)}. "
                f"With it, ({_et(p, 1)} × {Ag} + {_et(1 - p, 1, 2)} × {_et(rec)})/{_et(1 + rf, 2)} = "
                f"{_et((p * Ag + (1 - p) * rec) / (1 + rf), 2, 4)}. The difference is {_et(svar, 2, 4)}. The equity "
                f"gets 0 in the bad state either way, so with the loan in place the whole loss falls on the bank. A "
                f"bank that prices the loan in advance passes it back to the shareholders.</p>")
        hj = _HJ_FIRE_B

    q = (f"<p>{navn} has a bank loan with a face value of NOK {K} million due in one year. In one year its assets will "
         f"be worth NOK {Ag} million with probability {_et(p, 1, 2)} and NOK {Ab} million otherwise. If it cannot "
         f"repay, the bank takes over and must sell the assets at once in a fire sale, which fetches only "
         f"{_ep(f)} of their value. Investors are risk-neutral and the risk-free rate is {_ep(rf)}.</p>"
         f"<p>{sporsm}</p>")
    full = (
        f"<p><b>What a fire sale is.</b> A firm in default often has to sell its assets quickly. The natural buyers "
        f"are its competitors, who are short of cash in the same downturn, so the assets go far below their value. "
        f"Kurbatov stresses these indirect costs over the small direct ones. His example: debt of 30, assets worth "
        f"80 or 15 and a bankruptcy sale that fetches half.</p>" + midt
        + f"<p><b>Remember:</b> in default the lenders get what the assets fetch. The fire-sale loss is value that "
          f"nobody receives.</p>"
    )
    return sporsmal(q, _alt(_vt(svar), svar, feller), kort, full, hjelp=hj, tall=tallsvar(enhet="NOK million"))


# ---------------------------------------------------------------------------
# skt-to1 · Trade-off ved kunngjøringen: skjold minus forventede nødkostnader
# ---------------------------------------------------------------------------
@familie("skt-to1", tema="skatt", antall=5, tittel="The trade-off at the announcement: shield minus distress costs",
         hjelp=hjelp3(
             "This is the trade-off theory applied to a recapitalisation. You need the share price when the plan is "
             "announced, once expected distress costs are counted.",
             "V<sup>L</sup> = V<sup>U</sup> + PV(TS) − PV(distress costs). PV(distress costs) = probability of "
             "distress × present value of the costs if it happens. Price = V<sup>L</sup>/N<sub>0</sub> at the "
             "announcement.",
             "<p><b>Step 1: the shield</b> of fixed permanent debt.</p>"
             "<p><b>Step 2: the expected distress cost.</b> Weight the cost by its probability.</p>"
             "<p><b>Step 3: the price</b> on the shares outstanding before the buyback.</p>"
             "<p><b>Watch out:</b> the creditors take over in distress, but the shareholders bear the expected cost "
             "today, through the price they get for the debt.</p>",
         ))
def _(r):
    s = _firma(r)
    N, tau, P0, Vu = s["N"], s["tau"], s["P0"], s["Vu"]
    D = round(Vu * r.choice([0.40, 0.50, 0.60]) / 10) * 10
    rD = r.choice([0.04, 0.05])
    q_ = r.choice([0.10, 0.20, 0.25, 0.30])
    C = round(Vu * r.choice([0.20, 0.25, 0.30]) / 10) * 10
    ts = tau * D
    dc = q_ * C
    P1 = (Vu + ts - dc) / N

    f_nodc = (Vu + ts) / N
    f_noq = (Vu + ts - C) / N
    f_post = (Vu + ts - dc - D) / (N - D / P0)
    f_none = P0
    kand = [("R", None, P1),
            (_vt(f_nodc), "Distress costs left out. At this much debt the trade-off says the expected costs reduce "
                          "the value the shield creates.", f_nodc),
            (_vt(f_noq), f"The full cost of {tall(C)} subtracted, as if distress were certain. Weight it by the "
                         f"probability {_ep(q_)}.", f_noq),
            (_vt(f_post), "The value shared among the shares left after a buyback at the old price. At the "
                          "announcement no shares have been bought yet.", f_post),
            (_vt(f_none), "The price left unchanged. The shield and the expected distress costs are both priced "
                          "in at the announcement.", f_none)]
    feller = _velg(r, kand)

    q = (f"<p>{s['tekst']} Investors expect it to stay all-equity. It announces that it will borrow NOK {tall(D)} "
         f"million of permanent debt at r<sub>D</sub> = {_ep(rD)} and use it all to buy back shares at the market "
         f"price. The corporate tax rate is {_ep(tau)}. At this debt level analysts estimate a {_ep(q_)} probability "
         f"of financial distress, which would cost the firm NOK {tall(C)} million in present value terms. Treat the "
         f"tax shield as τ<sub>c</sub>D.</p>"
         f"<p>What is the share price just after the announcement, in NOK?</p>")
    kort = (f"<p><b>{_vt(P1)}.</b> PV(TS) = {_ep(tau)} × {tall(D)} = {_et(ts)}. PV(distress) = {_ep(q_)} × {tall(C)} = "
            f"{_et(dc)}. P = ({_et(Vu, 0, 2)} + {_et(ts)} − {_et(dc)})/{N} = {_et(P1, 2, 4)}.</p>")
    netto = ts - dc
    full = (
        f"<p><b>The trade-off.</b> Debt adds value through the tax shield and takes it away through the expected "
        f"costs of financial distress: V<sup>L</sup> = V<sup>U</sup> + PV(TS) − PV(distress costs). Both are "
        f"priced the moment the plan is announced.</p>"
        f"<p><b>Step 1: the unlevered firm.</b> {s['vu_t']}.</p>"
        f"<p><b>Step 2: the shield.</b> Permanent debt: PV(TS) = {_ep(tau)} × {tall(D)} = {_et(ts)}.</p>"
        f"<p><b>Step 3: the distress costs.</b> {_ep(q_)} × {tall(C)} = {_et(dc)}.</p>"
        f"<p><b>Step 4: the price.</b> ({_et(Vu, 0, 2)} + {_et(ts)} − {_et(dc)})/{N} = <b>{_et(P1, 2, 4)}</b>.</p>"
        f"<p><b>First check: does the plan pay?</b> The debt adds {_et(ts)} − {_et(dc)} = {_et(netto)} "
        + ("in total, so the price rises above " if netto > 0 else "in total, a loss, so the price falls below ")
        + f"{_et(P0, 2, 4)}. A smaller debt with no distress costs might add more: the trade-off compares the "
          f"marginal shield with the marginal distress cost.</p>"
          f"<p><b>Who bears it.</b> In distress the creditors take over, but they foresee the costs and pay less for "
          f"the debt. The shareholders bear the expected cost today, in the price.</p>"
          f"<p><b>Remember:</b> V<sup>L</sup> = V<sup>U</sup> + τ<sub>c</sub>D − probability × cost, all on the "
          f"original shares.</p>"
    )
    return sporsmal(q, _alt(_vt(P1), P1, feller), kort, full, tall=tallsvar(enhet="NOK per share"))


# ===========================================================================
# Statiske spørsmål
# ===========================================================================

statisk(
    "skt-s01", tema="skatt", type="begrep",
    hjelp=hjelp3(
        "This is about who captures the value of the interest tax shield in a recapitalisation.",
        "V<sup>L</sup> = V<sup>U</sup> + PV(TS). Lenders pay a fair price for the debt. The price moves when the "
        "plan becomes known.",
        "<p><b>Step 1:</b> do the lenders get a bargain?</p>"
        "<p><b>Step 2:</b> who owns the firm at the moment the market learns about the shield?</p>"
        "<p><b>Step 3:</b> compare what a seller receives with what a holder keeps. <b>Watch out:</b> the buyback runs at the price that already includes the shield.</p>",
    ),
    q="<p>An all-equity firm announces that it will borrow and use the money to buy back shares. The debt creates "
      "a tax shield worth PV(TS). Who captures that value?</p>",
    alternativer=[
        R("The shareholders at the announcement, sellers and holders alike"),
        F("The new lenders, because the shield comes from the interest they receive",
          "Lenders pay a fair price for the bonds. Their deal is zero-NPV."),
        F("Only the shareholders who sell in the buyback, because they receive the cash",
          "The sellers are paid the post-announcement price, which already contains the shield. Holders keep "
          "shares worth the same price."),
        F("Only the shareholders who keep their shares, because the shield arrives in future years",
          "The market prices the future shields today. Sellers get their share through the higher price."),
    ],
    kort="<p><b>The shareholders at the announcement.</b> The price jumps by PV(TS)/N<sub>0</sub> at once, so sellers "
         "and holders gain the same per share. The lenders gain nothing.</p>",
    full="<p><b>Where the value comes from.</b> Taxes add a third claimant, the government. Debt shrinks its slice, "
         "so more of the same cash flow reaches investors. That is PV(TS).</p>"
         "<p><b>Who gets it.</b> The lenders buy bonds at a fair price and earn a fair return. The shareholders own "
         "the firm when the plan becomes credible, so the whole PV(TS) lands on them: the price jumps by "
         "PV(TS)/N<sub>0</sub> at the announcement.</p>"
         "<p><b>Sellers and holders.</b> The buyback runs at the new price. A seller gets the new price in cash. A "
         "holder keeps a share worth the new price. Both gain PV(TS)/N<sub>0</sub>.</p>"
         "<p><b>A worked line.</b> V<sup>U</sup> = 600 on 20 million shares, permanent debt of 200, τ<sub>c</sub> = "
         "25%: PV(TS) = 50, so the price goes from 30.00 to 32.50 and stays there through the buyback.</p>"
         "<p><b>Remember:</b> the shield goes to the shareholders at the announcement, not to the lenders.</p>",
)

statisk(
    "skt-s02", tema="skatt", type="paastand",
    rekkefolge="fast",
    hjelp=hjelp3(
        "This is about the timing of the price change in a recapitalisation with taxes.",
        "Announcement: P<sub>1</sub> = (V<sup>U</sup> + PV(TS))/N<sub>0</sub>. Buyback: n = D/P<sub>1</sub> and "
        "the price after the buyback is (V<sup>L</sup> − D)/(N<sub>0</sub> − n).",
        "<p><b>Step 1:</b> when does the market learn about the shield?</p>"
        "<p><b>Step 2:</b> does buying shares at their market price change their value?</p>"
        "<p><b>Step 3:</b> follow the cash and the number of shares through the buyback. <b>Watch out:</b> equity and shares fall in the same proportion.</p>",
    ),
    q="<p>A firm announces a debt-financed buyback that creates a tax shield.</p>"
      "<p>I. The share price rises when the plan is announced, before any debt is issued.</p>"
      "<p>II. The share price rises again when the shares are bought back, because fewer shares share the "
      "shield.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        R("Only I"),
        F("Only II", "Statement I holds: markets price a credible plan at once. Statement II fails: a buyback at the "
                     "market price is zero-NPV."),
        F("Both I and II", "Statement II fails: the buyback removes cash and shares in the same proportion as the "
                           "price, so the price stays put."),
        F("Neither I nor II", "Statement I holds: the shield is new value and it is priced the moment the plan is "
                              "known."),
    ],
    kort="<p><b>Only I.</b> The price jumps at the announcement. The buyback then runs at that price and leaves it "
         "unchanged.</p>",
    full="<p><b>Statement I.</b> True. As soon as the plan is credible, investors know the firm will pay less tax. "
         "The value of that saving, PV(TS), is priced at once, on the shares outstanding at the time.</p>"
         "<p><b>Statement II.</b> False. The firm then issues debt and buys shares at the new price P<sub>1</sub>. It "
         "pays out D in cash and retires D/P<sub>1</sub> shares. Equity falls by D and the number of shares falls in "
         "proportion, so the price stays at P<sub>1</sub>.</p>"
         "<p><b>A worked line.</b> V<sup>U</sup> = 1 300 on 50 million shares, D = 400 permanent, τ<sub>c</sub> = "
         "22%: PV(TS) = 88 and P<sub>1</sub> = 27.76. Shares bought: 400/27.76 = 14.4092 million. Equity after: "
         "988 on 35.5908 million shares, still 27.76.</p>"
         "<p><b>The error to avoid.</b> Buying back at the old price would imply two prices for one share.</p>"
         "<p><b>Remember:</b> the price moves on news, not on the transaction.</p>",
)

statisk(
    "skt-s03", tema="skatt", type="begrep",
    hjelp=hjelp3(
        "This is about which part of a loan payment reduces the firm's taxes.",
        "TS = τ<sub>c</sub> × interest. A loan payment = interest + repayment of principal.",
        "<p><b>Step 1:</b> split each payment into interest and principal.</p>"
        "<p><b>Step 2:</b> which part is a cost in the income statement?</p>"
        "<p><b>Step 3:</b> follow the interest part over the life of the loan. <b>Watch out:</b> repaying principal hands the lenders their own money back.</p>",
    ),
    q="<p>A firm repays a loan with equal annual payments that cover both interest and principal. Which part of "
      "each payment creates a tax shield?</p>",
    alternativer=[
        R("Only the interest part, which shrinks each year as the balance falls"),
        F("The whole payment, since it is a cash outflow the firm must make",
          "Repaying principal returns the lenders' money. It is not a cost and is not deductible."),
        F("Only the principal part, since it reduces the firm's debt",
          "It is the other way round: the interest is deductible, the principal is not."),
        F("The whole payment in the first year, then nothing once the balance starts to fall",
          "Interest is paid every year on the balance outstanding, so there is a shield every year until the loan "
          "is repaid."),
    ],
    kort="<p><b>Only the interest.</b> TS<sub>t</sub> = τ<sub>c</sub> × r<sub>D</sub> × the balance during year t. "
         "As the balance falls, so does the shield.</p>",
    full="<p><b>The rule.</b> Interest is a cost of borrowing and is deducted from taxable profit. Repaying the "
         "principal hands the lenders back their own money: it is not a cost and saves no tax (lecture 3).</p>"
         "<p><b>For an annuity loan.</b> The payments are equal, but the split changes. Early on most of the payment "
         "is interest. Later most of it is principal. The shield therefore falls year by year: τ<sub>c</sub> × "
         "r<sub>D</sub> × B<sub>t−1</sub>, with B<sub>t−1</sub> the balance at the start of the year.</p>"
         "<p><b>The value.</b> Every balance is fixed by the plan, so each shield is discounted at r<sub>D</sub>. "
         "Treating the whole payment as deductible would give τ<sub>c</sub> × L in present value, the shield of "
         "debt that never ends.</p>"
         "<p><b>Remember:</b> only interest shields, never principal.</p>",
)

statisk(
    "skt-s04", tema="skatt", type="begrep",
    hjelp=hjelp3(
        "This is about when the shortcut PV(TS) = τ<sub>c</sub>D applies.",
        "PV(TS) = τ<sub>c</sub>r<sub>D</sub>D/r<sub>D</sub> = τ<sub>c</sub>D for a fixed amount of debt that is "
        "never repaid. Any debt that ends or shrinks has fewer shields.",
        "<p><b>Step 1:</b> how many years of shields does each loan produce?</p>"
        "<p><b>Step 2:</b> compare with the perpetuity behind τ<sub>c</sub>D.</p>"
        "<p><b>Step 3:</b> value the shields as an annuity at the debt's rate. <b>Watch out:</b> principal is never deductible, so it never adds to the shield.</p>",
    ),
    q="<p>A firm borrows 500 for ten years with interest-only payments and the principal due at the end. A colleague "
      "values the tax shield at τ<sub>c</sub> × 500. What is wrong?</p>",
    alternativer=[
        R("τ<sub>c</sub>D assumes the debt is never repaid. A ten-year loan has ten shields, so it is worth less"),
        F("Nothing: τ<sub>c</sub>D holds for any fixed loan, because r<sub>D</sub> cancels",
          "r<sub>D</sub> cancels only in a perpetuity. A ten-year annuity of shields is worth less than the "
          "perpetuity."),
        F("τ<sub>c</sub>D understates the shield, because the principal repaid at the end is also deductible",
          "Principal is never deductible. The error runs the other way."),
        F("The shield must be discounted at r<sub>U</sub>, which makes it worth more than τ<sub>c</sub>D",
          "A fixed loan's shield is discounted at r<sub>D</sub>. A higher rate would make it worth less, not more."),
    ],
    kort="<p><b>The loan ends.</b> τ<sub>c</sub>D is the value of a shield that lasts forever. Ten years of shields "
         "are an annuity worth less.</p>",
    full="<p><b>Where τ<sub>c</sub>D comes from.</b> Debt D that is never repaid gives a shield τ<sub>c</sub>"
         "r<sub>D</sub>D every year forever. Discounted at r<sub>D</sub>, the perpetuity is τ<sub>c</sub>"
         "r<sub>D</sub>D/r<sub>D</sub> = τ<sub>c</sub>D.</p>"
         "<p><b>A loan that ends.</b> Ten years of interest give ten shields: an annuity, τ<sub>c</sub>r<sub>D</sub>D "
         "× [1 − (1 + r<sub>D</sub>)<sup>−10</sup>]/r<sub>D</sub>. At par that equals τ<sub>c</sub>[D − "
         "D/(1 + r<sub>D</sub>)<sup>10</sup>]: the shield on everything except the final repayment.</p>"
         "<p><b>In numbers.</b> D = 500, r<sub>D</sub> = 6%, τ<sub>c</sub> = 25%: the annuity is 7.50 × 7.3601 = "
         "55.20, against τ<sub>c</sub>D = 125.</p>"
         "<p><b>Remember:</b> τ<sub>c</sub>D is a ceiling for debt that never grows. Use it only for permanent "
         "debt.</p>",
)

statisk(
    "skt-s05", tema="skatt", type="begrep",
    hjelp=hjelp3(
        "This is about who bears the expected costs of financial distress and at what point in time.",
        "The price of debt = PV of what lenders expect to receive. Expected distress costs lower what they receive "
        "in default.",
        "<p><b>Step 1:</b> what do rational lenders pay for a bond that may lose value in distress?</p>"
        "<p><b>Step 2:</b> who receives that price?</p>"
        "<p><b>Step 3:</b> separate who pays after default from who bears the cost before the debt is sold. "
        "<b>Watch out:</b> prices reflect expected costs.</p>",
    ),
    q="<p>Lenders expect that if a firm defaults, legal fees and a fire sale will destroy part of its assets. The "
      "firm now sells new bonds to these lenders and uses the money to buy back shares. Which statement is "
      "correct?</p>",
    alternativer=[
        R("The shareholders bear the expected cost now, because the bonds sell for less"),
        F("The lenders bear it when default happens, so the share price is unaffected today",
          "That is who pays after the fact. Lenders who foresee the loss pay less for the bonds, so the cost moves "
          "to the shareholders up front."),
        F("No one bears it unless default actually occurs, since until then it is only a probability",
          "Expected costs are priced today. Probabilities are what prices are made of."),
        F("The lenders bear it now, because they buy bonds that may lose value",
          "They buy at a price that already allows for the loss, so they earn a fair return. The shortfall lands on "
          "the sellers of the bonds."),
    ],
    kort="<p><b>The shareholders, now.</b> Lenders foresee the loss and pay less for the debt. The shortfall reaches "
         "the share price when the debt is announced.</p>",
    full="<p><b>Ex post.</b> If default happens, the creditors own the assets and the costs are paid out of what "
         "would have been theirs. That is why the creditors seem to bear them.</p>"
         "<p><b>Ex ante.</b> Rational lenders see this coming. They pay only the present value of what they expect "
         "to receive, distress costs included. The firm raises less for the same promise, so the shareholders, who "
         "sell the debt, bear the expected cost in full.</p>"
         "<p><b>Where it shows.</b> At the announcement: V<sup>L</sup> = V<sup>U</sup> + PV(TS) − PV(distress costs). "
         "The price is V<sup>L</sup>/N<sub>0</sub>.</p>"
         "<p><b>With the debt already outstanding.</b> A surprise increase in distress costs falls on whoever holds "
         "the claims at the time. If the shareholders get nothing in default, it is the creditors.</p>"
         "<p><b>Remember:</b> ex post the creditors pay, ex ante the shareholders bear it.</p>",
)

statisk(
    "skt-s06", tema="skatt", type="begrep",
    hjelp=hjelp3(
        "This is about how large direct bankruptcy costs are and why they cannot explain low leverage.",
        "Expected direct cost per year = probability × cost rate × value. Kurbatov: 3–4% for large firms, 20–25% "
        "for small, probability under 1% a year.",
        "<p><b>Step 1:</b> multiply a cost rate by a probability under 1%.</p>"
        "<p><b>Step 2:</b> compare with the yearly tax saving.</p>"
        "<p><b>Step 3:</b> name the costs that start before any court is involved. <b>Watch out:</b> fire sales, lost customers and suppliers who demand cash grow fast with leverage.</p>",
    ),
    q="<p>A CFO argues that bankruptcy costs are small: legal fees are about 3% of value and the annual chance of "
      "bankruptcy is below 1%. So the firm should borrow far more. What is the best response?</p>",
    alternativer=[
        R("Direct costs are small, but indirect costs such as fire sales are large"),
        F("The direct costs are in fact large, since 3% of value is lost every year whether or not the firm goes "
          "bankrupt",
          "3% is lost only if bankruptcy happens. Weighted by a probability under 1%, the expected direct cost is "
          "tiny."),
        F("She is right: with costs this small, the optimal capital structure is almost all debt",
          "That ignores indirect costs and agency costs, which are what limit leverage in the trade-off."),
        F("Bankruptcy costs do not matter, because the creditors bear them when they take over",
          "Creditors price the expected costs into the debt, so the shareholders bear them up front."),
    ],
    kort="<p><b>Indirect costs.</b> She is right about direct costs: about 3% × under 1% a year. The large costs are "
         "indirect: fire sales, lost customers and staff, suppliers who demand cash.</p>",
    full="<p><b>Direct costs.</b> Lawyers, courts and advisers cost about 3–4% of value for large firms and 20–25% "
         "for small ones (lecture 4). Weighted by an annual probability of bankruptcy around 0.8–0.9%, the expected "
         "cost is a few hundredths of a percent of value a year, far below the tax shield.</p>"
         "<p><b>Indirect costs.</b> These start when distress becomes likely, long before any court: customers who "
         "fear for warranties leave, good staff leave, suppliers demand cash. The largest is the fire sale: assets "
         "sold quickly to buyers who are short of cash in the same downturn. Kurbatov's example: debt of 30, assets "
         "worth 80 or 15 and a bankruptcy sale that fetches half.</p>"
         "<p><b>The answer to the CFO.</b> Agree on the direct costs, then name the indirect ones, which grow fast "
         "with leverage and with how specialised the assets are.</p>"
         "<p><b>Remember:</b> direct costs are small, indirect costs drive the trade-off.</p>",
)

statisk(
    "skt-s07", tema="skatt", type="tolkning",
    hjelp=hjelp3(
        "This is about choosing the debt level in the trade-off theory from a table of costs.",
        "Each step of debt adds τ<sub>c</sub> × step of shield. Take the step while the shield it adds exceeds the "
        "distress cost it adds.",
        "<p><b>Step 1:</b> for each step, find the extra distress cost.</p>"
        "<p><b>Step 2:</b> stop at the last step where the extra shield is larger.</p>"
        "<p><b>Step 3:</b> check the totals at the levels around your answer. <b>Watch out:</b> a positive total gain can hide a negative last step.</p>",
    ),
    q="<p>A firm chooses permanent debt in steps of 100. With τ<sub>c</sub> = 25%, each step adds 25 of tax shield. "
      "PV(distress costs) is 2 at D = 100, 8 at D = 200, 20 at D = 300, 42 at D = 400 and 78 at D = 500. Which debt "
      "level, in NOK million, maximises firm value?</p>",
    alternativer=[
        R("400", 400),
        F("500", "At 500 the total shield (125) still exceeds the total distress cost (78), but the last step adds "
                 "25 of shield against 36 of distress cost. Compare steps, not totals.", 500),
        F("300", "The next step after 300 still adds 25 of shield against 22 of distress cost, so it raises "
                 "value.", 300),
        F("200", "The value added per step shrinks from the first step on, but it stays positive for two more "
                 "steps after 200. Stop when it turns negative, not when it starts to shrink.", 200),
    ],
    kort="<p><b>400.</b> The step to 400 adds 25 − 22 = 3. The step to 500 adds 25 − 36 = −11. Stop at 400.</p>",
    full="<p><b>The marginal rule.</b> The trade-off theory says borrow while the next step adds more shield than "
         "distress cost. The shield rises in a straight line with D, while distress costs accelerate, so the value "
         "peaks at an interior D.</p>"
         "<p><b>The steps.</b> Extra distress cost per step: 2, 6, 12, 22, 36. Net value added: 23, 19, 13, 3, −11.</p>"
         "<p><b>The answer.</b> Every step up to 400 adds value. The step to 500 destroys 11. So D* = 400, where firm "
         "value is V<sup>U</sup> + 100 − 42 = V<sup>U</sup> + 58.</p>"
         "<p><b>First check: the totals.</b> At 500 the gain over V<sup>U</sup> is 125 − 78 = 47, at 300 it is "
         "75 − 20 = 55. Both are below 58, so 400 is the maximum.</p>"
         "<p><b>Remember:</b> compare marginal shield with marginal distress cost.</p>",
    tall=tallsvar(verdi=400, enhet="NOK million"),
)

statisk(
    "skt-s08", tema="skatt", type="begrep",
    hjelp=hjelp3(
        "This is about what makes fire-sale losses large for some firms and small for others.",
        "Fire-sale loss = value of the assets − price they fetch in a forced sale. The price depends on who can buy "
        "them and when.",
        "<p><b>Step 1:</b> who are the natural buyers of the firm's assets?</p>"
        "<p><b>Step 2:</b> are those buyers short of cash at the moment the firm must sell?</p>"
        "<p><b>Step 3:</b> compare how far below value each firm would have to sell. <b>Watch out:</b> the amount of debt sets how likely distress is, not how much a sale loses.</p>",
    ),
    q="<p>Two firms have the same value and the same debt. Firm A owns office buildings in a large city. Firm B owns "
      "specialised plants that only firms in its own industry can use. Which firm should expect the larger "
      "fire-sale losses in distress?</p>",
    alternativer=[
        R("B, because its only buyers are rivals hit by the same downturn"),
        F("A, because buildings lose more value than machines in a recession",
          "Office buildings have many buyers outside any one industry, so they can be sold close to their value."),
        F("Neither, because a fire sale moves value to the buyer and destroys nothing",
          "From the firm's side, assets sold below their value are lost to its investors. That loss is the cost "
          "the trade-off counts."),
        F("Both equally, because fire-sale losses depend only on the amount of debt",
          "The amount of debt sets how likely distress is. How much is lost in a forced sale depends on the "
          "assets."),
    ],
    kort="<p><b>B.</b> Specialised assets can only be sold to firms in the same industry, which are hit by the same "
         "downturn. The forced price falls far below value.</p>",
    full="<p><b>Why fire sales happen.</b> A firm in distress must sell quickly. The best users of its assets are "
         "usually its competitors. When the whole industry is in a downturn, they are short of cash too, so the "
         "assets go to outsiders at a deep discount.</p>"
         "<p><b>Firm A.</b> Office buildings can be used by many kinds of tenants and bought by many investors. A "
         "forced sale fetches close to their value.</p>"
         "<p><b>Firm B.</b> Specialised plants have few possible buyers, all in the same industry. In a downturn the "
         "price collapses: the fire-sale loss is large.</p>"
         "<p><b>For the trade-off.</b> Firms with specialised assets and cyclical industries face larger expected "
         "distress costs, so they should borrow less.</p>"
         "<p><b>Remember:</b> fire-sale losses are largest when the assets are specialised and the buyers are hit "
         "at the same time.</p>",
)

statisk(
    "skt-s09", tema="skatt", type="begrep",
    hjelp=hjelp3(
        "This is about whether borrowing to hold safe bonds creates a tax shield of value.",
        "Net debt = debt − excess cash. Interest paid is deductible, interest received is taxed.",
        "<p><b>Step 1:</b> what happens to net debt?</p>"
        "<p><b>Step 2:</b> net the interest paid against the interest received.</p>"
        "<p><b>Step 3:</b> ask whether the firm's tax bill changes at all. <b>Watch out:</b> the leverage that matters for the shield is net debt.</p>",
    ),
    q="<p>A firm with no debt borrows NOK 500 million and puts all of it in government bonds that pay the same rate. "
      "What happens to its value through the interest tax shield?</p>",
    alternativer=[
        R("Nothing: net debt stays at zero and the taxed interest income cancels the deduction"),
        F("It rises by τ<sub>c</sub> × 500, since the firm now has 500 of debt",
          "The firm also holds 500 of bonds. Its net debt is zero and so is the net tax saving."),
        F("It falls, because the firm now risks default on the 500",
          "The bonds cover the debt in every state, so the risk of default does not change."),
        F("It rises by the interest on the bonds, which is new income",
          "The interest received is offset by the interest paid. No new value is created."),
    ],
    kort="<p><b>Nothing.</b> The interest paid is deductible, but the same amount of interest received is taxed. Net "
         "debt is zero, so there is no shield.</p>",
    full="<p><b>Leverage is net.</b> The tax shield comes from the net interest the firm deducts. A firm that "
         "borrows 500 and holds 500 of bonds at the same rate pays and receives the same interest. The deduction on "
         "one is cancelled by the tax on the other.</p>"
         "<p><b>Net debt.</b> This is the same rule Kurbatov uses in the weights: excess cash or bonds are negative "
         "debt. Net debt here is 500 − 500 = 0.</p>"
         "<p><b>What creates the shield.</b> Debt that replaces equity in financing the operating assets, as in a "
         "debt-financed buyback. Then net debt rises and so does the shield.</p>"
         "<p><b>Remember:</b> borrowing to hold safe bonds is not leverage. The price does not move.</p>",
)

statisk(
    "skt-s10", tema="skatt", type="begrep",
    hjelp=hjelp3(
        "This is about what counts as a cost of financial distress.",
        "Firm value = value of all claims. A cost of distress is value that no investor receives. A transfer "
        "between investors leaves the total unchanged.",
        "<p><b>Step 1:</b> for each item, ask whether the total of debt plus equity falls.</p>"
        "<p><b>Step 2:</b> or does value only move from one claim to another?</p>"
        "<p><b>Step 3:</b> keep only what reduces the total. <b>Watch out:</b> the creditors' shortfall below the face value is mostly a transfer.</p>",
    ),
    q="<p>A firm defaults. Its assets are worth 60 and it owes 100. Which of these is a cost of financial distress in "
      "the trade-off theory?</p>",
    alternativer=[
        R("The 12 the assets lose because they must be sold quickly to buyers outside the industry"),
        F("The 40 the creditors do not get back, since they were owed 100 and the assets are worth 60",
          "That shortfall is the risk the creditors priced when they lent. The assets were worth 60 anyway, so "
          "nothing is destroyed."),
        F("The shareholders' loss of their whole stake when the creditors take over",
          "Equity is worth 0 because the assets are worth less than the debt. That is a transfer of control, not "
          "lost value."),
        F("The interest the firm stops paying once it defaults",
          "Unpaid interest is part of the creditors' shortfall against what they were promised. It says what the "
          "assets cannot cover, not what the bankruptcy destroys."),
    ],
    kort="<p><b>The 12 lost in the forced sale.</b> It is value nobody receives. The creditors' shortfall below 100 "
         "is a transfer: the assets were only worth 60.</p>",
    full="<p><b>The definition.</b> In V<sup>L</sup> = V<sup>U</sup> + PV(TS) − PV(distress costs), the last term is "
         "deadweight loss: value that leaves the firm and goes to no investor. Lawyers' fees, lost customers and "
         "fire-sale discounts qualify.</p>"
         "<p><b>The transfer.</b> When assets of 60 meet debt of 100, the creditors take the 60 and the shareholders "
         "get nothing. The creditors lose 40 against their claim, but that loss reflects the bad state of the "
         "assets, not the bankruptcy. Without any bankruptcy costs the total value would still be 60.</p>"
         "<p><b>The deadweight loss.</b> If the forced sale fetches only 48, the claims together are worth 48. The "
         "12 that vanished is the cost of distress.</p>"
         "<p><b>Remember:</b> only value nobody receives counts as a distress cost.</p>",
)

statisk(
    "skt-s11", tema="skatt", type="begrep",
    hjelp=hjelp3(
        "This is about when the interest tax shield is worth less than the statutory tax rate suggests.",
        "TS = τ × interest only if the firm has taxable profit to deduct the interest from. Losses carried forward "
        "lower the effective tax rate.",
        "<p><b>Step 1:</b> does the firm pay tax this year?</p>"
        "<p><b>Step 2:</b> what is a deduction worth to a firm that pays no tax?</p>"
        "<p><b>Step 3:</b> compare the statutory rate with the rate the firm actually pays on its marginal profit. <b>Watch out:</b> a deduction saved for later is worth less today.</p>",
    ),
    q="<p>A firm has large tax losses carried forward from past years and expects to pay no corporate tax for "
      "several years. How does this affect the value of the tax shield on new debt?</p>",
    alternativer=[
        R("It lowers it: interest deductions save no tax until the losses are used up"),
        F("It has no effect: the shield is always τ<sub>c</sub> times the interest",
          "That uses the statutory rate. A firm that pays no tax saves nothing from an extra deduction now."),
        F("It raises it: losses and interest deductions add up to a larger saving",
          "Deductions are only worth something against taxable profit. More deductions do not help a firm that "
          "has none."),
        F("It turns the shield negative, since the firm pays interest without a tax saving",
          "The shield cannot be negative. At worst a deduction saves nothing or saves it later."),
    ],
    kort="<p><b>It lowers it.</b> A deduction is worth τ only when there is profit to deduct it from. With losses "
         "carried forward, the effective tax rate on the interest is low for years.</p>",
    full="<p><b>Nominal against effective tax rate.</b> The formula TS = τ<sub>c</sub> × interest assumes the firm "
         "pays tax at τ<sub>c</sub> on its marginal profit. Kurbatov (lecture 3) distinguishes the nominal rate from "
         "the effective one.</p>"
         "<p><b>Losses carried forward.</b> A firm with past losses can deduct them from future profits. Until they "
         "are used up it pays no tax, so an extra interest deduction saves nothing now. It may save something later, "
         "which is worth less in present value.</p>"
         "<p><b>Other cases.</b> Firms with low or volatile profits, or large other deductions such as depreciation, "
         "also get less from interest deductions. For them debt adds less value and the trade-off points to less "
         "debt.</p>"
         "<p><b>Remember:</b> the shield is worth the tax actually saved, at the effective rate.</p>",
)

statisk(
    "skt-s12", tema="skatt", type="begrep",
    hjelp=hjelp3(
        "This is about the value of the shield on permanent debt that is risky.",
        "Fixed permanent debt: PV(TS) = τ<sub>c</sub>r<sub>D</sub>D/r<sub>D</sub> = τ<sub>c</sub>D. The shield is "
        "as risky as the interest, so it takes the debt's rate.",
        "<p><b>Step 1:</b> what is the yearly shield?</p>"
        "<p><b>Step 2:</b> which rate prices a cash flow as risky as the interest on this debt?</p>"
        "<p><b>Step 3:</b> divide the yearly shield by that rate. <b>Watch out:</b> the risk-free rate prices only cash flows that cannot be lost.</p>",
    ),
    q="<p>A firm has NOK 300 million of permanent debt that is risky: its expected return is r<sub>D</sub> = 7%, "
      "while the risk-free rate is 4%. The corporate tax rate is 25%. What is PV(TS), in NOK million?</p>",
    alternativer=[
        R("75.00", 75),
        F("131.25", "The shield discounted at r<sub>f</sub>. The interest on risky debt is as risky as the debt, so "
                    "the shield is discounted at r<sub>D</sub>.", 0.25 * 0.07 * 300 / 0.04),
        F("5.25", "One year's shield, not its present value. Permanent debt gives a shield every year.", 5.25),
        F("42.86", "The risk-free rate used for the interest but r<sub>D</sub> for discounting. The interest is "
                   "paid at r<sub>D</sub>.", 0.25 * 0.04 * 300 / 0.07),
    ],
    kort="<p><b>75.00.</b> TS = 0.25 × 0.07 × 300 = 5.25 a year, discounted at r<sub>D</sub>: 5.25/0.07 = 75.00 = "
         "τ<sub>c</sub>D.</p>",
    full="<p><b>Which rate.</b> The shield each year is τ<sub>c</sub> times the interest the firm actually pays. If "
         "the firm defaults on the interest, it loses the shield too, so the shield is as risky as the debt. Its "
         "rate is r<sub>D</sub>, not r<sub>f</sub>.</p>"
         "<p><b>Step 1: the yearly shield.</b> 0.25 × 7% × 300 = 5.25.</p>"
         "<p><b>Step 2: the present value.</b> A perpetuity at r<sub>D</sub>: 5.25/0.07 = <b>75.00</b>.</p>"
         "<p><b>Why r<sub>D</sub> cancels.</b> τ<sub>c</sub>r<sub>D</sub>D/r<sub>D</sub> = τ<sub>c</sub>D whatever "
         "r<sub>D</sub> is, risky or not. The rule PV(TS) = τ<sub>c</sub>D needs only fixed, permanent debt.</p>"
         "<p><b>Remember:</b> permanent debt: PV(TS) = τ<sub>c</sub>D, because the shield is discounted at the "
         "same rate that sets the interest.</p>",
    tall=tallsvar(verdi=75, enhet="NOK million"),
)

statisk(
    "skt-s13", tema="skatt", type="begrep",
    hjelp=hjelp3(
        "This is about what a debt-financed buyback with permanent debt does to the shares that remain.",
        "Permanent debt: r<sub>E</sub> = r<sub>U</sub> + (D/E)(1 − τ<sub>c</sub>)(r<sub>U</sub> − r<sub>D</sub>). "
        "A buyback at the market price leaves the price unchanged.",
        "<p><b>Step 1:</b> who carries the business risk after the buyback? On how much equity?</p>"
        "<p><b>Step 2:</b> what does that do to the return shareholders require?</p>"
        "<p><b>Step 3:</b> does the buyback itself move the price? <b>Watch out:</b> a higher expected return is "
        "not a higher price.</p>",
    ),
    q="<p>An all-equity firm with corporate taxes announces permanent debt and buys back shares at the market price. "
      "Compare a remaining share just after the buyback with the same share just after the announcement. Which "
      "statement is correct?</p>",
    alternativer=[
        R("Riskier, with a higher expected return, but at an unchanged price"),
        F("The share is safer, because the tax shield adds a risk-free asset to the firm",
          "The safe shield softens the rise in risk, which is why (1 − τ<sub>c</sub>) enters MM II. The leverage "
          "still makes the equity riskier than before."),
        F("The price rises, because earnings per share go up when there are fewer shares",
          "The higher EPS is riskier and is discounted at a higher r<sub>E</sub>. A buyback at the market price "
          "cannot move the price."),
        F("Its expected return is unchanged, because the firm's assets have not changed",
          "That holds for r<sub>U</sub>. The same business risk now sits on a smaller equity base."),
    ],
    kort="<p><b>Riskier, higher r<sub>E</sub>, same price.</b> r<sub>E</sub> = r<sub>U</sub> + (D/E)(1 − "
         "τ<sub>c</sub>)(r<sub>U</sub> − r<sub>D</sub>) rises with D/E. The buyback runs at the market price, so "
         "the price stays where the announcement put it.</p>",
    full="<p><b>The risk.</b> Before the recap the shareholders carried all the business risk. After it, the "
         "lenders take a fixed claim and the same business risk sits on a smaller equity base. The equity is "
         "riskier, so its required return rises.</p>"
         "<p><b>How much.</b> With permanent debt the shield τ<sub>c</sub>D is safe, which softens the effect: "
         "r<sub>E</sub> = r<sub>U</sub> + (D/E)(1 − τ<sub>c</sub>)(r<sub>U</sub> − r<sub>D</sub>). For "
         "example, r<sub>U</sub> = 8%, r<sub>D</sub> = 4%, D/E = 800/1 200 and τ<sub>c</sub> = 25% give "
         "r<sub>E</sub> = 8% + 0.6667 × 0.75 × 4% = 10.00%.</p>"
         "<p><b>The price.</b> The shield was priced at the announcement. The buyback then pays the market price for "
         "each share, a zero-NPV deal, so the price after it is the same.</p>"
         "<p><b>The EPS trap.</b> Earnings per share do rise, but they are riskier. The higher r<sub>E</sub> offsets "
         "the higher EPS, so the price does not move for that reason.</p>"
         "<p><b>Remember:</b> leverage raises the risk and the expected return of each share, not its price.</p>",
)
