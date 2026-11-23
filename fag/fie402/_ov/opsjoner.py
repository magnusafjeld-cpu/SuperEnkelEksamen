# -*- coding: utf-8 -*-
"""Øv uten stopp FIE402: opsjoner (skribent 4).

   ov-ops1  put-call-paritet: putten fra callen, syntetisk obligasjon til meglerens pris,
            arbitrasjen og hvorfor forventninger ikke kan bryte pariteten
   ov-ops2  ett binomisk steg: ρ, replikering (Δ, B) av callen, putten og hvorfor den
            reelle sannsynligheten ikke er med i prisen
   ov-ops3  først p, så ρ (PS3 E2 og E4): kursen fra CAPM, ρ og prisene, forventet
            avkastning på call og put, og hvorfor
   ov-ops4  straddle før en kunngjøring: putten fra pariteten, gevinst og nullpunkter,
            og hva handelen satser på (volatilitet)
   ov-ops5  Black-Scholes-intuisjon og amerikansk mot europeisk (mest tekst, vignetter)

   Kurbatovs konvensjoner (docs/fie402-trening-spek.md § 3b): diskret diskontering
   PV(K) = K/(1 + r_f)^T også for brøkdeler av år, ρ diskonteres med r_f, reelle
   sannsynligheter med kapitalkostnaden, ingen Black-Scholes-regning for studenten.
   Callprisene i casene er laget med Black-Scholes med diskret PV(K) bare for at de
   skal se realistiske ut. Studenten regner dem aldri.
"""
import math

from ov_lib import *  # noqa: F401,F403

AKSJER_NO = ["Ravnefjell Data ASA", "Solsnes Energi ASA", "Tindvik Biotech ASA", "Lysøy Robotics ASA",
             "Kalvåg Seafood ASA", "Brennhaug Maskin ASA", "Stordal Medtech ASA", "Hovland Shipping ASA"]
AKSJER_US = ["Ashgrove Devices Inc.", "Larkfield Pharma Inc.", "Copperline Motors Inc.", "Pinewood Analytics Inc.",
             "Redcliff Mining Inc.", "Willowmere Software Inc."]

PERIODE = {0.25: "three months", 0.5: "six months", 0.75: "nine months", 1.0: "one year", 1.5: "18 months"}
T_TEKST = {0.25: "0.25", 0.5: "0.5", 0.75: "0.75", 1.0: "1", 1.5: "1.5"}


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


def _gv(r, t):
    """(1 + r)^t som tall i teksten: kort for t = 1, seks desimaler ellers."""
    return _g(r) if t == 1 else tall((1 + r) ** t, 6)


def _g(r):
    """1 + r skrevet kort: 1.04, 1.035."""
    return tall(1 + r, 2 if abs(r * 100 - round(r * 100)) < 1e-9 else 3)


def _pot(r, t):
    """(1 + r)^t i HTML."""
    return _g(r) if t == 1 else f"{_g(r)}<sup>{T_TEKST[t]}</sup>"


def _ncdf(x):
    return 0.5 * (1 + math.erf(x / math.sqrt(2)))


def _bs_call(S, K, r, t, sigma):
    """Black-Scholes med diskret PV(K), som Kurbatovs lysbilder. Bare for realistiske kurser i casen."""
    pv = K / (1 + r) ** t
    d1 = math.log(S / pv) / (sigma * math.sqrt(t)) + sigma * math.sqrt(t) / 2
    d2 = d1 - sigma * math.sqrt(t)
    return S * _ncdf(d1) - pv * _ncdf(d2)


def _rydd(feller, svar, rel=0.002, abs_=None):
    """Fjerner feller som mangler, ligger innenfor rettetoleransen eller dupliserer en tidligere felle.
       svar: verdiene til tallene i rekkefølge. abs_: liste med absolutte toleranser (eller None)."""
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


def _valuta(navn):
    return ("NOK", "NOK ") if navn.endswith("ASA") else ("USD", "$")


# ---------------------------------------------------------------------------
# ov-ops1 · Put-call-paritet, syntetisk obligasjon og arbitrasje
# ---------------------------------------------------------------------------
@oppgave("ov-ops1", tema="opsjoner", tittel="Put-call parity and a mispriced put", antall=12,
         sjanger="d3-paritet", kilde="Lecture 9 put-call parity, HA2 E2b, 2023 MC9–10")
def _(r):
    navn = r.choice(AKSJER_NO + AKSJER_US)
    kode, _tegn = _valuta(navn)
    S = r.choice([40, 48, 60, 75, 80, 96, 120, 150, 180, 240])
    K = int(round(S * r.choice([0.90, 0.95, 1.00, 1.05, 1.10]) / 2) * 2)
    Tm = r.choice([0.25, 0.5, 0.5, 0.75, 1.0, 1.5])
    rf = r.choice([0.02, 0.025, 0.03, 0.035, 0.04, 0.045, 0.05])
    sig = r.choice([0.25, 0.30, 0.35, 0.40])
    C = rund(_bs_call(S, K, rf, Tm, sig), 2)
    if C < 1.0:
        raise Avvis("callen er for billig")
    fak = (1 + rf) ** Tm
    PV = K / fak
    P = C + PV - S
    if P < 1.0:
        raise Avvis("putten er for billig")
    billig = r.choice([True, False])
    gap0 = r.choice([0.40, 0.55, 0.65, 0.80, 0.95, 1.15]) * max(1.0, S / 100)
    Pq = rund(P - gap0 if billig else P + gap0, 2)
    if Pq < 0.5:
        raise Avvis("meglerens pris er for lav")
    gap = P - Pq                                     # > 0: putten er billig hos megleren
    if (gap > 0) != billig or abs(gap) < 0.3:
        raise Avvis("retningen snudde ved avrunding")
    gevinst = abs(gap)
    kost = S + Pq - C                                # syntetisk obligasjon: aksje + put − call
    R = (K / kost) ** (1 / Tm) - 1
    if R < 0.006 or R > 0.16:
        raise Avvis("den syntetiske renten blir urimelig")
    if abs(R - rf) < 0.006:
        raise Avvis("den syntetiske renten ligger for nær r_f")

    # viste mellomtall og kjeden fra dem
    PV4 = rund(PV, 4)
    P4 = rund(C + PV4 - S, 4)
    _sjekk(P4, P)
    gev4 = abs(P4 - Pq)
    _sjekk(gev4, gevinst, rel=0.01)
    # K/kost med seks desimaler når den skal opphøyes, så kjeden går opp til fasiten
    forhold_d = 4 if Tm == 1 else 6
    forhold_v = rund(K / kost, forhold_d)
    R_vist = forhold_v ** (1 / Tm) - 1
    _sjekk(R_vist, R, rel=0.0005)
    _lik(R_vist * 100, R * 100, d=2)
    eks = "" if Tm == 1 else f"<sup>1/{T_TEKST[Tm]}</sup>"
    hi = int(round(K * 1.2))
    lo = int(round(K * 0.8))
    per = PERIODE[Tm]
    Ttxt = T_TEKST[Tm]
    rpst = prosent_tekst(rf * 100, 1)

    # feller
    f_K = C + K - S
    f_aar = C + K / (1 + rf) - S if Tm != 1 else None
    f_fortegn = C + S - PV
    f_lin = C + K / (1 + rf * Tm) - S if Tm != 1 else None
    fb_ikkeann = (K / kost - 1) * 100 if Tm != 1 else None
    fb_lin = (K / kost - 1) / Tm * 100 if Tm != 1 else None
    fb_rf = rf * 100
    fc_K = abs(C + K - S - Pq)
    fc_aar = abs(C + K / (1 + rf) - S - Pq) if Tm != 1 else None
    fc_fv = gevinst * fak

    case = (f"<p>{navn} trades at {_f(S, 2)} a share and pays no dividends before the options below "
            f"expire. European options on its shares with strike K = {K} expire in {per}. The call trades at {_f(C, 2)}. The risk-free rate is "
            f"{rpst} a year, compounded annually. You can borrow and lend at that rate and short the share.</p>"
            f"<p>A dealer quotes the European put with the same strike and expiry at {_f(Pq, 2)} and will both buy "
            f"and sell at that price.</p>"
            f"<p>All prices are in {kode} per share. Give prices with four decimals and returns in percent with "
            f"two decimals.</p>")

    # (a) -----------------------------------------------------------------
    retning = ("below" if S < PV4 else "above")
    a = tall_del(
        "a", poeng=3,
        q="<p>What should the put cost according to put-call parity?</p>",
        svar=[T("P", P, kode)],
        kort=(f"<p><b>P = {_f(P4)}.</b> PV(K) = {K}/{_pot(rf, Tm)} = {_f(PV4)}; P = C + PV(K) − S = {_f(C, 2)} + "
              f"{_f(PV4)} − {_f(S, 2)}.</p>"),
        losning=(f"<p>A share plus a put pays max(S<sub>T</sub>, K) at expiry. So does a call plus a risk-free bond "
                 f"that pays K. Same payoff in every state, so the same price today: C + PV(K) = P + S. Parity needs no "
                 f"model and no probability, only European options on a share without dividends.</p>"
                 f"<p><b>Step 1: discount the strike over the option's own life.</b> The options run {per}, so "
                 f"T = {Ttxt} and PV(K) = {K}/{_pot(rf, Tm)} = {_f(PV4)}.</p>"
                 f"<p><b>Step 2: solve for the put.</b> P = C + PV(K) − S = {_f(C, 2)} + {_f(PV4)} − {_f(S, 2)} = "
                 f"<b>{_f(P4)}</b>.</p>"
                 f"<p><b>First check (a sign test that can fail).</b> C − P = S − PV(K). The share trades {retning} "
                 f"PV(K), so the call must be {'cheaper' if S < PV4 else 'dearer'} than the put: {_f(C, 2)} against "
                 f"{_f(P4)} ✓. With K instead of PV(K) the sign can come out wrong.</p>"
                 f"<p><b>Remember:</b> parity uses PV(K) over the option's own life, never K and never a full year's "
                 f"rate for a shorter option.</p>"),
        feller=_rydd([
            Felle(f_K, f"You used the strike K = {K} instead of its present value. K is paid only at expiry, so it "
                       f"must be discounted."),
            Felle(f_aar, f"You discounted K with a full year's rate ({_g(rf)}). The options run {per}, so the factor "
                         f"is {_pot(rf, Tm)}.") if f_aar is not None else None,
            Felle(f_fortegn, "You swapped the signs of S and PV(K). The put is C − S + PV(K): a share plus a put "
                             "equals a call plus a bond."),
            Felle(f_lin, f"You discounted with simple interest, 1 + r<sub>f</sub> × T. The rate is compounded "
                         f"annually, so the factor is {_pot(rf, Tm)}.") if f_lin is not None else None,
        ], [P]),
    )

    # (b) -----------------------------------------------------------------
    if billig:
        sml = (f"That is above r<sub>f</sub> = {rpst}: through the dealer's put you can lend at more than the "
               f"risk-free rate, so the put is too cheap.")
    else:
        sml = (f"That is below r<sub>f</sub> = {rpst}: nobody should hold this bond, but issuing it (the reverse "
               f"position) lets you borrow at less than the risk-free rate, so the put is too dear.")
    b = blandet_del(
        "b", poeng=4, tall_poeng=3, selvstendig=True,
        q=(f"<p>You buy one share, buy one put from the dealer at {_f(Pq, 2)} and write one call. What does this "
           f"position pay at expiry? What annual return does it earn at today's prices?</p>"),
        tekst_ledd="What does the position pay at expiry, whatever the share price? Why?",
        kriterier=[
            f"States that the position pays K = {K} in every state: share plus put is worth max(S<sub>T</sub>, {K}) "
            f"and the written call takes max(S<sub>T</sub> − {K}, 0) (1 p)",
        ],
        svar=[T("annual return", R * 100, "%")],
        kort=(f"<p><b>{pst(R, 2)} a year.</b> The position pays K = {K} in every state, since share plus put is worth "
              f"max(S<sub>T</sub>, K) and the written call takes max(S<sub>T</sub> − K, 0). It costs {_f(S, 2)} + "
              f"{_f(Pq, 2)} − {_f(C, 2)} = {_f(kost, 2)}: ({K}/{_f(kost, 2)}){eks} − 1.</p>"),
        losning=(f"<p>Rearrange parity: S + P − C = PV(K). Holding the share and the put while writing the call is "
                 f"a synthetic risk-free bond that pays K. At fair prices it must earn exactly r<sub>f</sub>. At any "
                 f"other price it earns something else. That gap is the mispricing.</p>"
                 f"<p><b>Step 1: the payoff.</b> Share plus put is worth max(S<sub>T</sub>, {K}); the written call "
                 f"takes max(S<sub>T</sub> − {K}, 0). Left: {K} in every state. At S<sub>T</sub> = {hi}: {hi} + 0 − "
                 f"{hi - K} = {K}. At S<sub>T</sub> = {lo}: {lo} + {K - lo} − 0 = {K}.</p>"
                 f"<p><b>Step 2: the cost today.</b> {_f(S, 2)} + {_f(Pq, 2)} − {_f(C, 2)} = {_f(kost, 2)}.</p>"
                 f"<p><b>Step 3: annual return.</b> ({K}/{_f(kost, 2)}){eks} − 1 = "
                 f"{tall(forhold_v, forhold_d)}{eks} − 1 = <b>{pst(R, 2)}</b> a year.</p>"
                 f"<p><b>First check.</b> {sml} At the parity price from (a) the same position earns exactly "
                 f"{rpst}.</p>"
                 f"<p><b>Remember:</b> share plus put minus call is a bond that pays K. Any return on it other than "
                 f"r<sub>f</sub> is a price error.</p>"),
        feller=_rydd([
            Felle(fb_ikkeann, f"This is the return over {per}, not per year. Raise K/cost to the power 1/T = "
                              f"1/{Ttxt}.") if fb_ikkeann is not None else None,
            Felle(fb_lin, "You annualised by dividing by T. With annual compounding the return over the period is "
                          "raised to the power 1/T.") if fb_lin is not None else None,
            Felle(fb_rf, "This is the return at the parity price from (a). The question asks about the dealer's "
                         "price, which is what you can trade at."),
        ], [R * 100]),
    )

    # (c) -----------------------------------------------------------------
    if billig:
        handel = (f"Buy the put from the dealer (−{_f(Pq, 2)}), buy the share (−{_f(S, 2)}), write the call "
                  f"(+{_f(C, 2)}) and borrow PV(K) (+{_f(PV4)})")
        krit1 = ("Buys the put from the dealer and the share, writes the call and borrows PV(K): buys the cheap "
                 "synthetic bond from (b) and borrows at r<sub>f</sub> (1 p)")
        kort_handel = "buy the put and the share, write the call, borrow PV(K)"
        ved_forfall = (f"Share plus put is worth max(S<sub>T</sub>, {K}), the written call takes "
                       f"max(S<sub>T</sub> − {K}, 0) and you repay the loan with {K}. Net 0 in every state.")
    else:
        handel = (f"Write the put to the dealer (+{_f(Pq, 2)}), short the share (+{_f(S, 2)}), buy the call "
                  f"(−{_f(C, 2)}) and lend PV(K) (−{_f(PV4)})")
        krit1 = ("Writes the put to the dealer, shorts the share, buys the call and lends PV(K): issues the dear "
                 "synthetic bond from (b) and lends at r<sub>f</sub> (1 p)")
        kort_handel = "write the put, short the share, buy the call, lend PV(K)"
        ved_forfall = (f"The loan pays {K}. The call is worth max(S<sub>T</sub> − {K}, 0), the written put costs "
                       f"max({K} − S<sub>T</sub>, 0) and closing the short costs S<sub>T</sub>: {K} + "
                       f"max(S<sub>T</sub> − {K}, 0) − max({K} − S<sub>T</sub>, 0) − S<sub>T</sub> = 0 in every state.")
    c = blandet_del(
        "c", poeng=5, tall_poeng=2,
        q="<p>Construct an arbitrage with the dealer's put. What is your profit today per put?</p>",
        tekst_ledd="Which positions do you take? Why is the profit riskless?",
        gitt=f"<p>From (a): by parity the put is worth {_f(P4)}.</p>",
        svar=[T("profit today", gevinst, kode, abs=0.005)],
        kort=(f"<p><b>{_f(gev4)} today.</b> The dealer's put is {'cheap' if billig else 'dear'} against parity "
              f"({_f(Pq, 2)} against {_f(P4)}): {kort_handel}. The legs pay 0 net at expiry.</p>"),
        losning=(f"<p>Both sides of parity, share plus put and call plus bond, pay max(S<sub>T</sub>, K). The dealer's "
                 f"quote makes one side {'cheaper' if billig else 'dearer'} today. Buy the cheap side, sell the dear "
                 f"one and keep the difference.</p>"
                 f"<p><b>Step 1: compare.</b> Parity says {_f(P4)}; the dealer quotes {_f(Pq, 2)}. The put is too "
                 f"{'cheap' if billig else 'dear'} by {_f(gev4)}.</p>"
                 f"<p><b>Step 2: the trade.</b> {handel}. Today: <b>+{_f(gev4)}</b>.</p>"
                 f"<p><b>Step 3: expiry.</b> {ved_forfall}</p>"
                 f"<p><b>First check.</b> The profit equals the gap between the dealer's price and the parity price. "
                 f"If your trade shows a loss today, you bought the dear side. It needs no view on the share and none "
                 f"of your own money.</p>"
                 f"<p><b>Remember:</b> the arbitrage profit is earned today. At expiry the positions cancel "
                 f"exactly.</p>"),
        kriterier=[
            krit1,
            "Shows that the legs cancel at expiry in every state, so nothing is owed later (1 p)",
            "States that the profit is earned today, without risk and without own money, whatever the share does (1 p)",
        ],
        feller=_rydd([
            Felle(fc_K, f"You compared the dealer's price with a parity price built on K = {K} instead of PV(K)."),
            Felle(fc_aar, f"Your parity price discounts K with a full year's rate. The options run {per}.")
            if fc_aar is not None else None,
            Felle(fc_fv, "This is what the gap is worth at expiry. The arbitrage profit is collected today."),
        ], [gevinst], abs_=[0.005]),
    )

    # (d) -----------------------------------------------------------------
    if billig:
        pastand = (f"A colleague says the put is cheap for a reason: analysts expect {navn} to rise, so the put is "
                   f"unlikely to pay off and there is no free lunch.")
        siste = "a free lunch that traders would take by buying the dealer's put until its price rises to parity"
        tro_kort = ("Optimism is already in the share price: a higher S raises the call and lowers the put while "
                    "parity holds at the new prices, so it cannot make one of two identical payoffs cheaper.")
        tro_los = ("Beliefs do matter for prices, but through S. If analysts turn optimistic, the share price rises, "
                   "the call gains and the put loses. Parity still holds at the new prices.")
        tro_krit = ("Explains that optimism is already in the share price: a higher S raises the call and lowers the "
                    "put while parity still holds, so it cannot make one of two identical payoffs cheaper (1 p)")
    else:
        pastand = (f"A colleague says the put is dear for a reason: investors fear a crash in {navn} and pay up "
                   f"for protection, so there is no free lunch.")
        siste = "a free lunch that traders would take by selling puts to the dealer until the price falls to parity"
        tro_kort = ("Fear of a crash shows up in a lower share price and a higher σ; since σ is not in parity, it "
                    "raises the call as much as the put, so fear cannot make one of two identical payoffs dearer.")
        tro_los = ("Beliefs do matter for prices, but through S and σ. Fear of a crash lowers the share price and "
                   "raises the volatility investors expect. A higher σ makes the call and the put dearer by the same "
                   "amount, because σ does not appear in C − P = S − PV(K).")
        tro_krit = ("Explains that fear shows up in a lower S and a higher σ; σ is not in parity, so it raises the call "
                    "as much as the put and cannot make one of two identical payoffs dearer (1 p)")
    d = tekst_del(
        "d", poeng=4,
        q=f"<p>{pastand} Is the colleague right? Explain.</p>",
        setninger="Answer in at most four sentences.",
        gitt=f"<p>From (a) and (c): the parity price is {_f(P4)}, the dealer's {_f(Pq, 2)}, a riskless profit of "
             f"{_f(gev4)} today.</p>",
        kort=(f"<p>No: parity compares two portfolios that pay max(S<sub>T</sub>, K) in every state, so no probability "
              f"or view enters it. {tro_kort} The trade in (c) earns "
              f"{_f(gev4)} whatever the share does, so the quote is {siste}.</p>"),
        losning=(f"<p>The mechanism is the law of one price. Share plus put and call plus bond are the same "
                 f"contract in two wrappings: both pay max(S<sub>T</sub>, {K}). Two identical payoffs must cost "
                 f"the same, whatever anyone believes about the share.</p>"
                 f"<p>{tro_los} A view can "
                 f"never make the put {'cheap' if billig else 'dear'} relative to the call, the share and the bond at "
                 f"the same time, because "
                 f"the trade in (c) does not depend on what the share does: it pays 0 at expiry in every state and "
                 f"{_f(gev4)} today.</p>"
                 f"<p>Parity can fail only for reasons outside this case: a dividend before expiry, American options "
                 f"that may be exercised early, or trading costs and short-sale limits.</p>"
                 f"<p><b>Typical mistakes:</b> arguing about whether the share will rise or fall, or calling the "
                 f"trade risky because the share might move. The share's move cancels in the hedge.</p>"
                 f"<p><b>Remember:</b> parity is a no-arbitrage identity, not a forecast. Probabilities never enter "
                 f"it.</p>"),
        kriterier=[
            "States that parity compares two portfolios with the same payoff, max(S<sub>T</sub>, K), in every state, so no probability or view enters it (1 p)",
            tro_krit,
            "Says the trade in (c) earns the gap whatever the share does, so the dealer's quote is a free lunch, not a fair price for a view (1 p)",
            "Names the consequence: arbitrageurs trade against the quote until it reaches the parity price, or notes that only dividends, early exercise or trading costs could break parity (1 p)",
        ],
    )
    _unik("ov-ops1", [a, b, c, d])
    return ovelse(case, [a, b, c, d])


# ---------------------------------------------------------------------------
# ov-ops2 · Ett binomisk steg: ρ, replikering og hvorfor p ikke er med
# ---------------------------------------------------------------------------
@oppgave("ov-ops2", tema="opsjoner", tittel="One binomial step: replicate the call, then the put", antall=12,
         sjanger="d3-replikering", kilde="Lecture 9 slides 10–17, PS3 E1, Kurbatov's wrap-up drill")
def _(r):
    navn = r.choice(AKSJER_NO + AKSJER_US)
    kode, _tegn = _valuta(navn)
    S0 = r.choice([40, 50, 60, 80, 100, 120, 200])
    Tm = r.choice([1.0, 1.0, 0.5])
    if Tm == 1:
        u = r.choice([1.20, 1.25, 1.30, 1.40, 1.50])
        dn = r.choice([0.60, 0.70, 0.75, 0.80, 0.85])
    else:                                            # et halvt år: smalere tre, ellers blir avkastningen urimelig
        u = r.choice([1.10, 1.15, 1.20, 1.25])
        dn = r.choice([0.80, 0.85, 0.90])
    Su, Sd = S0 * u, S0 * dn
    if abs(Su - round(Su)) > 1e-9 or abs(Sd - round(Sd)) > 1e-9:
        raise Avvis("kursene i treet er ikke hele tall")
    Su, Sd = int(round(Su)), int(round(Sd))
    K = int(round(S0 * r.choice([0.90, 1.00, 1.10])))
    if not Sd < K < Su:
        raise Avvis("innløsningskursen må ligge mellom kursene i treet")
    rf = r.choice([0.03, 0.04, 0.05, 0.06, 0.08])
    g = (1 + rf) ** Tm
    if not Sd < g * S0 < Su:
        raise Avvis("treet tillater arbitrasje")
    rho = (g * S0 - Sd) / (Su - Sd)
    if not 0.2 <= rho <= 0.85 or abs(rho - 0.5) < 0.02:
        raise Avvis("ρ er urimelig")
    p = r.choice([0.50, 0.55, 0.60, 0.65, 0.70, 0.75, 0.80])
    if p < rho + 0.05:
        raise Avvis("den reelle sannsynligheten må ligge over ρ")
    ErS_aar = ((p * Su + (1 - p) * Sd) / S0) ** (1 / Tm) - 1
    if not rf + 0.01 <= ErS_aar <= 0.20:
        raise Avvis("analytikernes sannsynlighet gir aksjen en urimelig forventet avkastning")
    Cu = Su - K
    Pd = K - Sd
    delta = Cu / (Su - Sd)
    B = -Sd * delta / g
    C0 = S0 * delta + B
    dP = -Pd / (Su - Sd)
    P0 = C0 + K / g - S0
    if abs(P0 - (1 - rho) * Pd / g) > 1e-9 or abs(delta - dP - 1) > 1e-12:
        raise Avvis("intern feil i putten")
    per = PERIODE[Tm]
    gtxt = _pot(rf, Tm)
    gv = _gv(rf, Tm)

    # viste tall og kjeden fra dem (seks desimaler på Δ og ρ når fire ikke er eksakt)
    rho_v = _v46(rho)
    d_v = _v46(delta)
    rep = rund(Sd * d_v, 4)                      # det du betaler tilbake i ned-tilstanden
    B4 = rund(-rep / g, 4)
    C4 = rund(S0 * d_v + B4, 4)
    _sjekk(C4, C0)
    _sjekk(B4, B)
    PV4 = rund(K / g, 4)
    P4 = rund(C4 + PV4 - S0, 4)
    _sjekk(P4, P0)
    dP_v = _v46(dP)
    BP4 = rund((Pd - Sd * dP_v) / g, 4)
    kollega = p * Cu / g
    _lik(rho_v * Cu / g, C4)
    _lik(d_v * Su - rep, Cu)
    _lik((1 - rho_v) * Pd / g, P4)
    _lik(S0 * dP_v + BP4, P4)
    if kollega - C0 < 0.3:
        raise Avvis("kollegaens verdi ligger for nær prisen")

    # feller
    fa_vekst = (S0 - Sd) / (Su - Sd)
    fa_aar = ((1 + rf) * S0 - Sd) / (Su - Sd) if Tm != 1 else None
    fb_nivå = Cu / Su
    fb_s0 = Cu / S0
    fb_udisk = -Sd * delta
    fb_tegn = Sd * delta / g
    fb_c_udisk = S0 * delta - Sd * delta
    fb_rho_udisk = rho * Cu
    fc_K = C0 + K - S0
    fc_gren = rho * Pd / g
    fc_p = (1 - p) * Pd / g

    tid = (f"in {per}" if Tm != 1 else "in one year")
    case = (f"<p>{navn} trades at {S0} a share and pays no dividends. {tid[0].upper() + tid[1:]} the share will be worth "
            f"either {Su} (up) or {Sd} (down). The risk-free rate is {prosent_tekst(rf * 100, 1)} a year, compounded "
            f"annually. You can borrow and lend at that rate. Analysts put the probability of the up state at "
            f"{tall(p, 2)}.</p>"
            f"<p>Consider a European call and a European put on the share, both with strike K = {K} and expiry "
            f"{tid}. All prices are in {kode} per share. Give ρ, Δ and prices with four decimals.</p>")

    # (a) -----------------------------------------------------------------
    aar_tekst = (f"The tree covers {per}, so the risk-free factor is {gtxt} = {gv}, not {_g(rf)}. "
                 if Tm != 1 else "")
    a = tall_del(
        "a", poeng=3,
        q="<p>Find the risk-neutral probability ρ of the up state.</p>",
        svar=[T("ρ", rho)],
        kort=(f"<p><b>ρ = {_f(rho)}.</b> ρ = ({gtxt} × {S0} − {Sd})/({Su} − {Sd}) = "
              f"{_f(g * S0 - Sd)}/{Su - Sd}.</p>"),
        losning=(f"<p>ρ is the probability of the up state that makes a risk-neutral investor pay exactly today's "
                 f"price: the share's expected payoff under ρ, discounted at r<sub>f</sub>, must equal {S0}. It is "
                 f"a pricing weight, not a forecast.</p>"
                 f"<p><b>Step 1: grow today's price at the risk-free rate.</b> {aar_tekst}{gtxt} × {S0} = "
                 f"{_f(g * S0)}.</p>"
                 f"<p><b>Step 2: where does that sit between the two outcomes?</b> ρ = ({_f(g * S0)} − {Sd})/({Su} − "
                 f"{Sd}) = {_f(g * S0 - Sd)}/{Su - Sd} = <b>{_f46(rho)}</b>.</p>"
                 f"<p><b>First check.</b> ρ × {Su} + (1 − ρ) × {Sd} = {_f(rho * Su + (1 - rho) * Sd)}; discounted, "
                 f"{_f(rho * Su + (1 - rho) * Sd)}/{gv} = {S0} ✓. ρ lies between 0 and 1 because "
                 f"{Sd} &lt; {_f(g * S0)} &lt; {Su}: the tree allows no arbitrage. The analysts' {tall(p, 2)} is "
                 f"higher, because real investors demand a premium for the share's risk.</p>"
                 f"<p><b>Remember:</b> ρ = [(1 + r<sub>f</sub>)<sup>T</sup>S<sub>0</sub> − S<sub>d</sub>]/"
                 f"(S<sub>u</sub> − S<sub>d</sub>), with the rate for the tree's own period.</p>"),
        feller=_rydd([
            Felle(fa_vekst, "You did not grow today's price: (S<sub>0</sub> − S<sub>d</sub>)/(S<sub>u</sub> − "
                            "S<sub>d</sub>). Under ρ the share must earn the risk-free rate, so compare "
                            "(1 + r<sub>f</sub>)<sup>T</sup>S<sub>0</sub> with the outcomes."),
            Felle(fa_aar, f"You used a full year's rate for a tree that covers {per}. The factor is {gtxt}.")
            if fa_aar is not None else None,
            Felle(1 - rho, "This is 1 − ρ, the weight on the down state."),
            Felle(p, "This is the analysts' real probability. ρ comes from prices, not from forecasts."),
        ], [rho]),
    )

    # (b) -----------------------------------------------------------------
    b = tall_del(
        "b", poeng=5, selvstendig=True,
        q=(f"<p>Build a portfolio of Δ shares and an amount B in the risk-free asset (negative if you borrow) that "
           f"pays exactly what the call pays in both states. Find Δ, B and the call's price C<sub>0</sub>.</p>"),
        svar=[T("Δ", delta), T("B", B, kode), T("C<sub>0</sub>", C0, kode)],
        kort=(f"<p><b>Δ = {_f(delta)}, B = {_f(B4)}, C<sub>0</sub> = {_f(C4)}.</b> Δ = {Cu}/({Su} − {Sd}); "
              f"B = −{Sd} × Δ/{gtxt}; C<sub>0</sub> = {S0} × Δ − {_f(-B4)}.</p>"),
        losning=(f"<p>Two states and two instruments: a mix of the share and the risk-free asset can copy any payoff "
                 f"on this tree. Something that pays exactly what the call pays in every state must cost what the "
                 f"call costs, or you would sell the dear one, buy the cheap one and keep the gap.</p>"
                 f"<p><b>Step 1: payoffs.</b> C<sub>u</sub> = max({Su} − {K}, 0) = {Cu}; C<sub>d</sub> = "
                 f"max({Sd} − {K}, 0) = 0.</p>"
                 f"<p><b>Step 2: Δ sets the swing.</b> The call swings by {Cu}, one share by {Su} − {Sd} = {Su - Sd}: "
                 f"Δ = {Cu}/{Su - Sd} = <b>{_f46(delta)}</b>.</p>"
                 f"<p><b>Step 3: B sets the level.</b> In the down state the shares are worth {Sd} × {_f46(delta)} = "
                 f"{_f(rep)} and the call pays 0, so the loan must take exactly that: B = −{_f(rep)}/{gtxt} = "
                 f"<b>{_f(B4)}</b>. You borrow.</p>"
                 f"<p><b>Step 4: price.</b> C<sub>0</sub> = {S0} × {_f46(delta)} − {_f(-B4)} = <b>{_f(C4)}</b>.</p>"
                 f"<p><b>First check (it can fail).</b> Up: {_f46(delta)} × {Su} − {_f(rep)} = "
                 f"{_f(d_v * Su - rep)} = C<sub>u</sub> ✓. With ρ = {_f46(rho)}: {_f46(rho)} × {Cu}/{gv} = "
                 f"{_f(rho_v * Cu / g)} ✓, the same price by a second route.</p>"
                 f"<p><b>Remember:</b> a call is Δ shares bought partly with borrowed money: here buy {_f(delta)} "
                 f"shares and borrow {_f(-B4)}.</p>"),
        feller=_rydd([
            Felle(fb_nivå, f"You took a ratio of levels, C<sub>u</sub>/S<sub>u</sub> = {Cu}/{Su}. Δ is the change "
                           f"in the call over the change in the share.", i=0),
            Felle(fb_s0, f"You divided by today's price, {Cu}/{S0}. The denominator is the share's swing, "
                         f"{Su} − {Sd}.", i=0),
            Felle(fb_udisk, f"You did not discount the loan. B is today's amount; {_f(rep)} is what you repay "
                            f"{tid}.", i=1),
            Felle(fb_tegn, "You gave B as a positive amount. A call's copy borrows, so the amount in the risk-free "
                           "asset is negative.", i=1),
            Felle(kollega, f"You discounted the analysts' expected payoff {tall(p, 2)} × {Cu} at r<sub>f</sub>. That "
                           f"ignores the risk premium and overprices the call.", i=2),
            Felle(fb_c_udisk, "You subtracted the repayment instead of today's loan. Discount the loan to today.", i=2),
            Felle(fb_rho_udisk, "This is the risk-neutral expected payoff at expiry. Discount it at r<sub>f</sub>.",
                  i=2),
        ], [delta, B, C0]),
    )

    # (c) -----------------------------------------------------------------
    c = tall_del(
        "c", poeng=4,
        q=(f"<p>How many shares does the put's replicating portfolio hold (Δ<sub>P</sub>, negative for a short "
           f"position)? What is the put worth today?</p>"),
        gitt=f"<p>From (b): Δ = {_f46(delta)} and C<sub>0</sub> = {_f(C4)}.</p>",
        svar=[T("Δ<sub>P</sub>", dP), T("P<sub>0</sub>", P0, kode)],
        kort=(f"<p><b>Δ<sub>P</sub> = {_f(dP)}, P<sub>0</sub> = {_f(P4)}.</b> Δ<sub>P</sub> = (0 − {Pd})/{Su - Sd}; "
              f"parity: P<sub>0</sub> = {_f(C4)} + {K}/{gtxt} − {S0}.</p>"),
        losning=(f"<p>A put pays in the down state, so its copy must gain when the share falls: it is short the share "
                 f"and lends. Price the easier option first, then use parity for the other.</p>"
                 f"<p><b>Step 1: payoffs.</b> P<sub>u</sub> = max({K} − {Su}, 0) = 0; P<sub>d</sub> = max({K} − "
                 f"{Sd}, 0) = {Pd}.</p>"
                 f"<p><b>Step 2: Δ<sub>P</sub>.</b> (0 − {Pd})/{Su - Sd} = <b>{_f46(dP)}</b>: short "
                 f"{_f46(-dP)} shares. Note that Δ − Δ<sub>P</sub> = {_f46(delta)} − ({_f46(dP)}) = 1: a call minus a "
                 f"put is one share minus a bond.</p>"
                 f"<p><b>Step 3: price by parity.</b> PV(K) = {K}/{gtxt} = {_f(PV4)}. P<sub>0</sub> = C<sub>0</sub> + "
                 f"PV(K) − S<sub>0</sub> = {_f(C4)} + {_f(PV4)} − {S0} = <b>{_f(P4)}</b>.</p>"
                 f"<p><b>First check (a real one: other payoffs, other weights).</b> With ρ: (1 − {_f46(rho)}) × "
                 f"{Pd}/{gv} = {_f((1 - rho_v) * Pd / g)} ✓. The put's copy lends B<sub>P</sub> = ({Pd} − {Sd} × "
                 f"({_f46(dP)}))/{gtxt} = {_f(BP4)}; then {S0} × ({_f46(dP)}) + {_f(BP4)} = "
                 f"{_f(S0 * dP_v + BP4)} ✓.</p>"
                 f"<p><b>Remember:</b> call: buy shares and borrow. Put: short shares and lend. The put's weight in "
                 f"the risk-neutral price is 1 − ρ, because it pays in the down state.</p>"),
        feller=_rydd([
            Felle(-dP, "You gave the put a positive Δ. A put rises when the share falls, so its copy is short "
                       "the share.", i=0),
            Felle(fc_K, f"You used K = {K} instead of PV(K) in parity.", i=1),
            Felle(fc_gren, "You weighted the put's payoff with ρ. The put pays in the down state, which has weight "
                           "1 − ρ.", i=1),
            Felle(fc_p, "You used the analysts' probability with the risk-free rate. Prices come from ρ.", i=1),
        ], [dP, P0]),
    )

    # (d) -----------------------------------------------------------------
    d = tekst_del(
        "d", poeng=4,
        q=(f"<p>A colleague values the call as the analysts' expected payoff discounted at the risk-free rate: "
           f"{tall(p, 2)} × {Cu}/{gtxt} = {_f(kollega)}. Explain why your price in (b) is right and the "
           f"colleague's value is wrong.</p>"),
        setninger="Answer in at most four sentences.",
        gitt=(f"<p>From (a) and (b): ρ = {_f(rho)}; the copy holds Δ = {_f(delta)} shares and B = {_f(B4)}; "
              f"C<sub>0</sub> = {_f(C4)}.</p>"),
        kort=(f"<p>The copy in (b), {_f(delta)} shares and a loan of {_f(-B4)}, pays exactly the call's payoff in "
              f"both states, so the call must cost {_f(C4)}; at {_f(kollega)} you would write it and buy the copy. "
              f"No probability enters the copy: the analysts' {tall(p, 2)} is already in the share price of {S0}. "
              f"Pairing p with r<sub>f</sub> ignores the risk premium of a levered claim, so it overprices the "
              f"call. ρ = {_f(rho)} lies below p because it carries that premium in the weights: a price, not a "
              f"forecast.</p>"),
        losning=(f"<p>The mechanism is replication. The call's price is pinned down by what it costs to copy it, "
                 f"state by state, so beliefs about the states never enter. Beliefs matter, but only through "
                 f"S<sub>0</sub>: if investors turned more optimistic, S<sub>0</sub> would rise, ρ would rise and the "
                 f"call would follow.</p>"
                 f"<p>The colleague mixes the two routes to a price. Real probabilities must be discounted at the "
                 f"call's own expected return, which is high because the call is a levered position in the share "
                 f"(Δ shares partly financed by a loan). That rate is unknown until you have the price, so the "
                 f"route is circular. Risk-neutral pricing puts the premium into the weights instead (ρ = "
                 f"{_f(rho)} against p = {tall(p, 2)}) and then discounts at r<sub>f</sub>.</p>"
                 f"<p>If the call traded at the colleague's {_f(kollega)}, writing it and buying the copy would earn "
                 f"{_f(kollega - C0)} today with nothing owed later.</p>"
                 f"<p><b>Typical mistakes:</b> saying the colleague is wrong only because the number differs, or calling "
                 f"p &gt; ρ an arbitrage. It is the risk premium, not a free lunch.</p>"
                 f"<p><b>Remember:</b> p goes with the asset's own expected return; ρ goes with r<sub>f</sub>. Never "
                 f"pair p with r<sub>f</sub> for a priced risk.</p>"),
        kriterier=[
            "States that the replicating portfolio (buy Δ shares, borrow) pays exactly the call's payoff in both states, so the call must cost what the copy costs, or there is an arbitrage (1 p)",
            "Explains that no probability enters the copy: the real probability and investors' risk aversion are already in the share price S<sub>0</sub> (1 p)",
            "Explains that pairing p with r<sub>f</sub> ignores the risk premium: the call is a levered position with an expected return far above r<sub>f</sub>, so the colleague overprices it (1 p)",
            "Says that ρ lies below p because it carries the risk premium in the weights: a pricing weight, not a forecast (1 p)",
        ],
    )
    _unik("ov-ops2", [a, b, c, d])
    return ovelse(case, [a, b, c, d])


# ---------------------------------------------------------------------------
# ov-ops3 · Først p, så ρ: kursen fra CAPM, prisene og forventet avkastning
# ---------------------------------------------------------------------------
def _kurs(x):
    """Kurs i treet: heltall uten desimaler, ellers to."""
    return tall(x, 0) if abs(x - round(x)) < 1e-9 else tall(x, 2)


@oppgave("ov-ops3", tema="opsjoner", tittel="First p, then ρ: option prices and expected returns", antall=12,
         sjanger="d3-rho", kilde="PS3 E2 (Delinquent Joe) and E4 (Harbin), Lecture 9 slide 16")
def _(r):
    navn = r.choice(AKSJER_NO + AKSJER_US)
    kode, _tegn = _valuta(navn)
    # Treet og CAPM gir kursen, så S0 blir sjelden et rundt tall (rundt svar røper fasiten)
    skala = r.choice([50, 60, 80, 100, 120, 150, 200])
    Su = skala * r.choice([1.30, 1.35, 1.40, 1.45, 1.50, 1.60])
    Sd = skala * r.choice([0.60, 0.65, 0.70, 0.75, 0.80])
    if abs(Su - round(Su)) > 1e-9 or abs(Sd - round(Sd)) > 1e-9:
        raise Avvis("kursene i treet er ikke hele tall")
    Su, Sd = int(round(Su)), int(round(Sd))
    rf = r.choice([0.03, 0.04, 0.05])
    beta = r.choice([0.8, 1.0, 1.2, 1.4, 1.5])
    mrp = r.choice([0.05, 0.06])
    rS = rf + beta * mrp
    p = r.choice([0.5, 0.6, 0.7, 0.75])
    ES1 = p * Su + (1 - p) * Sd
    S0 = ES1 / (1 + rS)
    if not Sd < (1 + rf) * S0 < Su:
        raise Avvis("treet tillater arbitrasje")
    K = int(round(S0 * r.choice([0.90, 1.00, 1.10])))
    if not Sd < K < Su:
        raise Avvis("innløsningskursen må ligge mellom kursene i treet")
    rho = ((1 + rf) * S0 - Sd) / (Su - Sd)
    if not 0.15 < rho < p - 0.05 or abs(rho - 0.5) < 0.02:
        raise Avvis("ρ er urimelig eller så nær 0.5 at byttede grener gir rett svar")
    S0_4 = rund(S0, 4)
    Cu, Pd = Su - K, K - Sd
    C0 = rho * Cu / (1 + rf)
    P0 = (1 - rho) * Pd / (1 + rf)
    rC = p * Cu / C0 - 1
    rP = (1 - p) * Pd / P0 - 1
    if rC > 2.5:
        raise Avvis("callens forventede avkastning blir urimelig høy")
    delta = Cu / (Su - Sd)
    betaC = delta * S0 / C0 * beta
    betaP = (-Pd / (Su - Sd)) * S0 / P0 * beta

    # viste tall, regnet videre fra S0 med fire desimaler
    rho_v = _v46(((1 + rf) * S0_4 - Sd) / (Su - Sd))
    _sjekk(rho_v, rho, rel=0.0005)
    C4 = rund(rho_v * Cu / (1 + rf), 4)
    P4 = rund((1 - rho_v) * Pd / (1 + rf), 4)
    _sjekk(C4, C0)
    _sjekk(P4, P0)
    rC4 = p * Cu / C4 - 1
    rP4 = (1 - p) * Pd / P4 - 1
    _sjekk(rC4, rC)
    _sjekk(rP4, rP, rel=0.004)
    rpst = prosent_tekst(rf * 100, 1)
    neg = rP < 0
    _lik(C4 + K / (1 + rf), P4 + S0_4)
    if pst(rf + betaC * mrp, 2) != pst(rC4, 2) or pst(rf + betaP * mrp, 2) != pst(rP4, 2):
        raise Avvis("betaruten gir et annet vist tall")
    putfrase = "a negative expected return" if neg else "an expected return below the risk-free rate"

    # feller
    fa_rf = ES1 / (1 + rf)
    fa_ingen_rf = ES1 / (1 + beta * mrp)
    fa_udisk = ES1
    fb_C_p = p * Cu / (1 + rf)
    fb_C_rS = p * Cu / (1 + rS)
    fb_P_p = (1 - p) * Pd / (1 + rf)
    fb_P_gren = rho * Pd / (1 + rf)
    fc_aksje = rS * 100
    fc_rho = rf * 100
    fc_P_gren = p * Pd / P0 * 100 - 100

    case = (f"<p>Analysts expect {navn}'s share to be worth {_kurs(Su)} in one year if the economy booms "
            f"(probability {tall(p, 2)}) and {_kurs(Sd)} if it goes into recession. The share pays no dividends and has "
            f"a beta of {tall(beta, 1)}. The risk-free rate is {rpst} and the market risk premium is "
            f"{prosent_tekst(mrp * 100, 1)}; the CAPM holds and you can borrow and lend at the risk-free rate.</p>"
            f"<p>European call and put options on the share have strike K = {K} and expire in one year. All prices "
            f"are in {kode} per share. Give prices and ρ with four decimals and returns in percent with two "
            f"decimals.</p>")

    # (a) -----------------------------------------------------------------
    a = tall_del(
        "a", poeng=3,
        q="<p>What should the share trade at today?</p>",
        svar=[T("S<sub>0</sub>", S0, kode)],
        kort=(f"<p><b>S<sub>0</sub> = {_f(S0_4)}.</b> r<sub>S</sub> = {rpst} + {tall(beta, 1)} × "
              f"{prosent_tekst(mrp * 100, 1)} = {pst(rS, 1)}; S<sub>0</sub> = ({tall(p, 2)} × {_kurs(Su)} + "
              f"{tall(1 - p, 2)} × {_kurs(Sd)})/{_g(rS)}.</p>"),
        losning=(f"<p>Real probabilities belong with the share's own expected return, which the CAPM gives. This is "
                 f"the first half of Kurbatov's pattern: use p to find the share price, then switch to ρ for the "
                 f"options.</p>"
                 f"<p><b>Step 1: the share's required return.</b> r<sub>S</sub> = r<sub>f</sub> + β × MRP = {rpst} + "
                 f"{tall(beta, 1)} × {prosent_tekst(mrp * 100, 1)} = {pst(rS, 1)}.</p>"
                 f"<p><b>Step 2: expected value in a year.</b> {tall(p, 2)} × {_kurs(Su)} + {tall(1 - p, 2)} × "
                 f"{_kurs(Sd)} = {_f(ES1)}.</p>"
                 f"<p><b>Step 3: discount at r<sub>S</sub>.</b> S<sub>0</sub> = {_f(ES1)}/{_g(rS)} = "
                 f"<b>{_f(S0_4)}</b>.</p>"
                 f"<p><b>First check.</b> The share earns {_f(ES1)}/{_f(S0_4)} − 1 = {pst(ES1 / S0_4 - 1, 2)} in expectation, above "
                 f"{rpst} because its beta is positive.</p>"
                 f"<p><b>Remember:</b> p goes with the asset's own risk-adjusted rate. Discounting the expected value "
                 f"at r<sub>f</sub> would overprice a share with systematic risk.</p>"),
        feller=_rydd([
            Felle(fa_rf, f"You discounted the expected value at r<sub>f</sub>. The share has a beta of "
                         f"{tall(beta, 1)}, so its expected payoff is discounted at the CAPM return."),
            Felle(fa_ingen_rf, "You left r<sub>f</sub> out of the CAPM: r<sub>S</sub> = r<sub>f</sub> + β × MRP."),
            Felle(fa_udisk, "This is the expected value in a year. Discount it to today."),
        ], [S0]),
    )

    # (b) -----------------------------------------------------------------
    b = tall_del(
        "b", poeng=5,
        q=(f"<p>Find the risk-neutral probability ρ of the boom state and the prices of the call C<sub>0</sub> and "
           f"the put P<sub>0</sub>.</p>"),
        gitt=f"<p>From (a): S<sub>0</sub> = {_f(S0_4)}.</p>",
        svar=[T("ρ", rho), T("C<sub>0</sub>", C0, kode), T("P<sub>0</sub>", P0, kode)],
        kort=(f"<p><b>ρ = {_f(rho)}, C<sub>0</sub> = {_f(C4)}, P<sub>0</sub> = {_f(P4)}.</b> ρ = ({_g(rf)} × {_f(S0_4)} − "
              f"{_kurs(Sd)})/({_kurs(Su)} − {_kurs(Sd)}); C<sub>0</sub> = ρ × {_kurs(Cu)}/{_g(rf)}; P<sub>0</sub> = "
              f"(1 − ρ) × {_kurs(Pd)}/{_g(rf)}.</p>"),
        losning=(f"<p>Now switch to ρ. With S<sub>0</sub> known, the options are priced relative to the share: ρ is "
                 f"the weight that makes the share earn r<sub>f</sub>. The same ρ prices every claim on the "
                 f"tree.</p>"
                 f"<p><b>Step 1: ρ.</b> ({_g(rf)} × {_f(S0_4)} − {_kurs(Sd)})/({_kurs(Su)} − {_kurs(Sd)}) = "
                 f"{_f((1 + rf) * S0_4 - Sd)}/{_kurs(Su - Sd)} = <b>{_f46(rho_v)}</b>, below p = {tall(p, 2)}.</p>"
                 f"<p><b>Step 2: payoffs.</b> Call: {_kurs(Cu)} in the boom, 0 in the recession. Put: 0 in the boom, "
                 f"{_kurs(Pd)} in the recession.</p>"
                 f"<p><b>Step 3: prices.</b> C<sub>0</sub> = {_f46(rho_v)} × {_kurs(Cu)}/{_g(rf)} = <b>{_f(C4)}</b>. "
                 f"P<sub>0</sub> = {_f46(1 - rho_v)} × {_kurs(Pd)}/{_g(rf)} = <b>{_f(P4)}</b>.</p>"
                 f"<p><b>First check (it can fail).</b> Parity: C<sub>0</sub> + PV(K) = {_f(C4)} + "
                 f"{_f(K / (1 + rf))} = {_f(C4 + K / (1 + rf))}; P<sub>0</sub> + S<sub>0</sub> = {_f(P4)} + {_f(S0_4)} = "
                 f"{_f(P4 + S0_4)} ✓.</p>"
                 f"<p><b>Remember:</b> p found the share price; ρ prices the options. Using p for the options too "
                 f"would need each option's own expected return, which you do not know yet.</p>"),
        feller=_rydd([
            Felle(p, "This is the real probability. The risk-neutral one makes the share earn r<sub>f</sub>.", i=0),
            Felle(fb_C_p, "You priced the call with the real probability at r<sub>f</sub>. That ignores the risk "
                          "premium.", i=1),
            Felle(fb_C_rS, f"You discounted the call's real expected payoff at the share's {pst(rS, 1)}. The call is "
                           f"levered and far riskier than the share, so its rate is much higher.", i=1),
            Felle(fb_P_p, "You priced the put with the real probability at r<sub>f</sub>.", i=2),
            Felle(fb_P_gren, "You weighted the put's payoff with ρ. It pays in the recession, which has weight "
                             "1 − ρ.", i=2),
        ], [rho, C0, P0]),
    )

    # (c) -----------------------------------------------------------------
    putord = "negative" if neg else "below the risk-free rate"
    c = tall_del(
        "c", poeng=4,
        q="<p>What are the expected returns on the call and on the put over the year?</p>",
        gitt=(f"<p>From (b): C<sub>0</sub> = {_f(C4)} and P<sub>0</sub> = {_f(P4)}.</p>"),
        svar=[T("E[r<sub>C</sub>]", rC * 100, "%"), T("E[r<sub>P</sub>]", rP * 100, "%")],
        kort=(f"<p><b>E[r<sub>C</sub>] = {pst(rC4, 2)}, E[r<sub>P</sub>] = {pst(rP4, 2)}.</b> Real probabilities: "
              f"{tall(p, 2)} × {_kurs(Cu)}/{_f(C4)} − 1 and {tall(1 - p, 2)} × {_kurs(Pd)}/{_f(P4)} − 1.</p>"),
        losning=(f"<p>Expected returns are about what really happens, so the real probabilities come back here. ρ "
                 f"would give r<sub>f</sub> for every asset, which is exactly why it prices but does not "
                 f"forecast.</p>"
                 f"<p><b>Step 1: the call.</b> Expected payoff {tall(p, 2)} × {_kurs(Cu)} = {_f(p * Cu)}. "
                 f"E[r<sub>C</sub>] = {_f(p * Cu)}/{_f(C4)} − 1 = <b>{pst(rC4, 2)}</b>.</p>"
                 f"<p><b>Step 2: the put.</b> Expected payoff {tall(1 - p, 2)} × {_kurs(Pd)} = {_f((1 - p) * Pd)}. "
                 f"E[r<sub>P</sub>] = {_f((1 - p) * Pd)}/{_f(P4)} − 1 = <b>{pst(rP4, 2)}</b>, {putord}.</p>"
                 f"<p><b>First check (a second route; an identity once S<sub>0</sub> came from the CAPM).</b> The "
                 f"call's copy holds Δ = {_kurs(Cu)}/{_kurs(Su - Sd)} = {_f(delta)} shares, so β<sub>C</sub> = "
                 f"Δ × S<sub>0</sub>/C<sub>0</sub> × β = {_f(delta)} × {_f(S0_4)}/{_f(C4)} × {tall(beta, 1)} = "
                 f"{_f(betaC)} and r<sub>f</sub> + β<sub>C</sub> × MRP = {pst(rf + betaC * mrp, 2)} ✓. The put's beta "
                 f"is negative: {_f(betaP)}, which gives {pst(rf + betaP * mrp, 2)} ✓.</p>"
                 f"<p><b>Remember:</b> ρ for prices, p for expected returns. A call earns more than its share; a put "
                 f"earns less than r<sub>f</sub>.</p>"),
        feller=_rydd([
            Felle(fc_aksje, "This is the share's expected return. The call is a levered claim on the share and "
                            "earns far more.", i=0),
            Felle(fc_rho, "You used ρ. Under ρ every asset earns r<sub>f</sub>; expected returns need the real "
                          "probabilities.", i=0),
            Felle(fc_rho, "You used ρ. Under ρ every asset earns r<sub>f</sub>; expected returns need the real "
                          "probabilities.", i=1),
            Felle(fc_P_gren, f"You weighted the put's payoff with the boom probability {tall(p, 2)}. The put pays in "
                             f"the recession.", i=1),
        ], [rC * 100, rP * 100]),
    )

    # (d) -----------------------------------------------------------------
    d = tekst_del(
        "d", poeng=4,
        q=(f"<p>Explain why the call's expected return is above the share's {pst(rS, 1)} while the put's is "
           f"{putord}. Why did you need the analysts' probabilities in (a) and (c), but not to price the options in "
           f"(b)?</p>"),
        setninger="Answer in at most four sentences.",
        gitt=(f"<p>From (a) to (c): r<sub>S</sub> = {pst(rS, 1)}, ρ = {_f(rho)} against p = {tall(p, 2)}, "
              f"E[r<sub>C</sub>] = {pst(rC4, 2)} and E[r<sub>P</sub>] = {pst(rP4, 2)}.</p>"),
        kort=(f"<p>The call is {_f(delta)} shares bought partly with borrowed money, so its beta ({_f(betaC)} against "
              f"{tall(beta, 1)}) and expected return are scaled up. The put is short the share plus lending: it pays in "
              f"the recession, has a negative beta and works as insurance, so investors accept {putfrase}. p and the "
              f"CAPM say what investors expect to earn, which gives S<sub>0</sub> and the returns; the option prices "
              f"need only ρ and r<sub>f</sub>, because once S<sub>0</sub> is known the options are priced relative "
              f"to the share.</p>"),
        losning=(f"<p><b>Leverage.</b> A call is replicated by Δ shares financed partly with a risk-free loan. The "
                 f"loan has beta zero, so the call's beta is the share's beta scaled up by Δ × S<sub>0</sub>/C<sub>0</sub>: "
                 f"here {_f(delta * S0 / C0)}. That is why E[r<sub>C</sub>] = {pst(rC4, 2)} dwarfs "
                 f"r<sub>S</sub> = {pst(rS, 1)}.</p>"
                 f"<p><b>Insurance.</b> The put's copy is short the share and lends. It pays exactly when the economy "
                 f"is bad, when money is worth most, so investors hold it for protection and accept a low or negative "
                 f"expected return, like an insurance premium.</p>"
                 f"<p><b>Two jobs, two probabilities.</b> The real probability p, with the CAPM, answers what investors "
                 f"expect to earn: the share price in (a) and the returns in (c). Pricing an option needs no "
                 f"expectation, only the cost of copying it, which ρ = {_f(rho)} and r<sub>f</sub> reproduce. "
                 f"Kurbatov's pattern: first use p, then switch to ρ.</p>"
                 f"<p><b>Typical mistakes:</b> saying the call earns more because it is likely to pay, or calling "
                 f"p &gt; ρ an arbitrage. The gap is the risk premium.</p>"
                 f"<p><b>Remember:</b> options carry the share's systematic risk, magnified (call) or reversed "
                 f"(put).</p>"),
        kriterier=[
            "Explains the call as a levered position: Δ shares partly financed by borrowing, so its beta and expected return are scaled up from the share's (1 p)",
            f"Explains the put as insurance: short the share plus lending, it pays in the recession, has a negative beta and so has {putfrase} (1 p)",
            "States that p (with the CAPM) is needed for what investors expect to earn: the share price in (a) and the expected returns in (c) (1 p)",
            "States that option prices need only ρ and r<sub>f</sub> once S<sub>0</sub> is known, because the option is priced relative to the share (replication) (1 p)",
        ],
    )
    _unik("ov-ops3", [a, b, c, d])
    return ovelse(case, [a, b, c, d])


# ---------------------------------------------------------------------------
# ov-ops4 · Straddle før en kunngjøring: kostnad, gevinst, nullpunkter og hva den satser på
# ---------------------------------------------------------------------------
# Selskap og kunngjøring hører sammen (et legemiddelforsøk hos et biotekselskap, ikke hos et maskinverksted)
STRADDLE_CASER = [
    ("Tindvik Biotech ASA", "the result of a phase III drug trial"),
    ("Larkfield Pharma Inc.", "the result of a phase III drug trial"),
    ("Stordal Medtech ASA", "the regulator's approval decision for its new implant"),
    ("Ashgrove Devices Inc.", "the regulator's decision on its new medical device"),
    ("Ravnefjell Data ASA", "the verdict in a patent lawsuit"),
    ("Willowmere Software Inc.", "the verdict in a patent lawsuit"),
    ("Redcliff Mining Inc.", "the regulator's decision on its mining licence"),
    ("Solsnes Energi ASA", "the licence decision for its new wind farm"),
    ("Copperline Motors Inc.", "the result of the shareholder vote on a takeover bid"),
    ("Lysøy Robotics ASA", "the result of the shareholder vote on a takeover bid"),
    ("Kalvåg Seafood ASA", "its first results after a profit warning"),
    ("Pinewood Analytics Inc.", "its first results after a profit warning"),
    ("Hovland Shipping ASA", "the outcome of a large tender for offshore vessels"),
    ("Brennhaug Maskin ASA", "the outcome of a large public tender"),
]


@oppgave("ov-ops4", tema="opsjoner", tittel="A straddle before an announcement", antall=12,
         sjanger="opsjoner", kilde="Lecture 9 (payoff diagrams and parity), H2025 E1 (volatility)")
def _(r):
    navn, hendelse = r.choice(STRADDLE_CASER)
    kode, _tegn = _valuta(navn)
    S = r.choice([50, 80, 100, 120, 150, 200])
    K = int(round(S * r.choice([0.95, 1.00, 1.00, 1.05])))
    Tm = r.choice([0.25, 0.5, 0.5, 1.0])
    rf = r.choice([0.02, 0.03, 0.04, 0.05])
    sig = r.choice([0.35, 0.45, 0.55, 0.65])
    C = rund(_bs_call(S, K, rf, Tm, sig), 2)
    fak = (1 + rf) ** Tm
    PV = K / fak
    P = C + PV - S
    if C < 1 or P < 1:
        raise Avvis("en av opsjonene er for billig")
    kost = C + P
    flytt = r.choice([-0.35, -0.28, -0.20, -0.10, -0.06, 0.06, 0.10, 0.20, 0.28, 0.35])
    ST = int(round(K * (1 + flytt)))
    utb = abs(ST - K)
    gev = utb - kost
    if abs(gev) < 1.0 or ST == K:
        raise Avvis("gevinsten ligger for nær null")
    lav, hoy = K - kost, K + kost
    per = PERIODE[Tm]
    ned, opp = (S - lav) / S, (hoy - S) / S              # bevegelsen fra dagens kurs til nullpunktene

    # viste tall
    PV4 = rund(PV, 4)
    P4 = rund(C + PV4 - S, 4)
    k4 = rund(C + P4, 4)
    _sjekk(k4, kost)
    gev4 = utb - k4
    _sjekk(gev4, gev, rel=0.003)
    ben = "call" if ST > K else "put"

    # feller
    fa_K = C + (C + K - S)
    fa_2C = 2 * C
    fa_C = C
    fb_null = 0.0
    fb_premie = utb - (C if ben == "call" else P)
    fc_C = (K - C, K + C)
    fc_S = (S - kost, S + kost)

    case = (f"<p>{navn} trades at {_f(S, 2)} a share and pays no dividends. Before its options expire, the firm will "
            f"announce {hendelse}. The market expects a large move in the share in one direction or the other. A "
            f"European call on the share with strike K = {K} expiring in {per} trades at {_f(C, 2)}. The European put "
            f"with the same strike and expiry is not quoted. The risk-free rate is {prosent_tekst(rf * 100, 1)} a year, "
            f"compounded annually.</p>"
            f"<p>You consider a straddle: buy one call and one put, both with strike {K} and the same expiry. When "
            f"you compute profits at expiry, ignore interest on the premiums. All prices are in {kode} per share. "
            f"Give prices with four decimals.</p>")

    # (a) -----------------------------------------------------------------
    a = tall_del(
        "a", poeng=3,
        q="<p>What does the straddle cost today?</p>",
        svar=[T("cost of the straddle", kost, kode)],
        kort=(f"<p><b>{_f(k4)}.</b> Put by parity: P = {_f(C, 2)} + {K}/{_pot(rf, Tm)} − {_f(S, 2)} = {_f(P4)}; "
              f"straddle = C + P = {_f(C, 2)} + {_f(P4)}.</p>"),
        losning=(f"<p>Kurbatov's rule: price whichever option is easier first, then get the other from put-call "
                 f"parity. Here the call is quoted, so the put follows from C + PV(K) = P + S.</p>"
                 f"<p><b>Step 1: PV(K) over the option's life.</b> {K}/{_pot(rf, Tm)} = {_f(PV4)}.</p>"
                 f"<p><b>Step 2: the put.</b> P = C + PV(K) − S = {_f(C, 2)} + {_f(PV4)} − {_f(S, 2)} = "
                 f"{_f(P4)}.</p>"
                 f"<p><b>Step 3: the straddle.</b> C + P = {_f(C, 2)} + {_f(P4)} = <b>{_f(k4)}</b>.</p>"
                 f"<p><b>First check.</b> C − P = {_f(C - P4)} must equal S − PV(K) = {_f(S - PV4)} ✓ (an identity, "
                 f"since P came from parity; it catches arithmetic slips only). Both prices are positive and below "
                 f"the share price.</p>"
                 f"<p><b>Remember:</b> a straddle is two separate rights. You pay for both, even though at most one "
                 f"can end in the money.</p>"),
        feller=_rydd([
            Felle(fa_K, f"Your put uses K = {K} instead of PV(K) in parity."),
            Felle(fa_2C, "You priced the put at the call's price. They cost the same only when S = PV(K)."),
            Felle(fa_C, "This is the call alone. The straddle also contains the put."),
        ], [kost]),
    )

    # (b) -----------------------------------------------------------------
    b = tall_del(
        "b", poeng=4,
        q=(f"<p>After the announcement the share ends at S<sub>T</sub> = {ST} at expiry. What is the straddle's payoff? "
           f"What is your profit?</p>"),
        gitt=f"<p>From (a): the straddle costs {_f(k4)}.</p>",
        svar=[T("payoff", utb, kode), T("profit", gev, kode, abs=0.01)],
        kort=(f"<p><b>Payoff {_f(utb, 2)}, profit {_f(gev4)}.</b> The {ben} pays |{ST} − {K}| = {utb}, the other leg 0; "
              f"profit = {utb} − {_f(k4)}.</p>"),
        losning=(f"<p>A payoff is never negative: each leg pays only if exercising it helps its holder. The payoff is "
                 f"what the contracts pay at expiry; the profit subtracts what you paid for them.</p>"
                 f"<p><b>Step 1: each leg.</b> Call: max({ST} − {K}, 0) = {max(ST - K, 0)}. Put: max({K} − {ST}, 0) = "
                 f"{max(K - ST, 0)}.</p>"
                 f"<p><b>Step 2: payoff.</b> {max(ST - K, 0)} + {max(K - ST, 0)} = <b>{utb}</b> = |S<sub>T</sub> − K|.</p>"
                 f"<p><b>Step 3: profit.</b> {utb} − {_f(k4)} = <b>{_f(gev4)}</b>"
                 f"{': the move was large enough' if gev > 0 else ': the move was too small to cover the two premiums'}"
                 f".</p>"
                 f"<p><b>First check (it can fail).</b> The profit is positive exactly when S<sub>T</sub> lies outside "
                 f"K ± cost = {K} ± {_f(k4)}. S<sub>T</sub> = {ST} lies {'outside' if gev > 0 else 'inside'} that band, "
                 f"so the profit is {'positive' if gev > 0 else 'negative'} ✓</p>"
                 f"<p><b>Remember:</b> the {('put' if ben == 'call' else 'call')} expires worthless but its premium is "
                 f"still gone. Draw the V-shaped payoff before you compute.</p>"),
        feller=_rydd([
            Felle(fb_null, f"You let both legs pay: ({ST} − {K}) + ({K} − {ST}) = 0. The leg that is out of the money "
                           f"pays 0, never a negative amount.", i=0),
            Felle(utb, "This is the payoff, not the profit. You paid both premiums today.", i=1),
            Felle(fb_premie, f"You subtracted only the {ben}'s premium. You bought both legs, so both premiums count.",
                  i=1),
            Felle(-kost, "You let both legs pay so that the payoff is 0, leaving only the premiums. The leg in the "
                         "money pays.", i=1),
        ], [utb, gev], abs_=[None, 0.01]),
    )

    # (c) -----------------------------------------------------------------
    c = tall_del(
        "c", poeng=4,
        q=("<p>Below which share price and above which share price at expiry does the straddle make a profit? Give the "
           "lower and the upper break-even price.</p>"),
        gitt=f"<p>From (a): the straddle costs {_f(k4)}.</p>",
        svar=[T("lower break-even", lav, kode), T("upper break-even", hoy, kode)],
        kort=(f"<p><b>{_f(K - k4)} and {_f(K + k4)}.</b> Break-even where |S<sub>T</sub> − {K}| = {_f(k4)}: "
              f"{K} − {_f(k4)} and {K} + {_f(k4)}.</p>"),
        losning=(f"<p>The payoff |S<sub>T</sub> − K| is a V with its tip at the strike. The straddle breaks even where "
                 f"the V reaches the cost of the two premiums, once on each side.</p>"
                 f"<p><b>Step 1: lower break-even.</b> Below K the put pays K − S<sub>T</sub>. Set it equal to the cost: "
                 f"S<sub>T</sub> = {K} − {_f(k4)} = <b>{_f(K - k4)}</b>.</p>"
                 f"<p><b>Step 2: upper break-even.</b> Above K the call pays S<sub>T</sub> − K: S<sub>T</sub> = {K} + "
                 f"{_f(k4)} = <b>{_f(K + k4)}</b>.</p>"
                 f"<p><b>First check.</b> The straddle costs {pst(k4 / S, 1)} of the share price. From today's "
                 f"{_f(S, 2)} the share must fall {pst(ned, 1)} or rise {pst(opp, 1)} before the straddle pays for "
                 f"itself. The worst case is S<sub>T</sub> = {K}: both legs expire worthless and you lose "
                 f"{_f(k4)}.</p>"
                 f"<p><b>Remember:</b> both break-evens are measured from the strike, with the cost of both legs.</p>"),
        feller=_rydd([
            Felle(fc_C[0], f"You used only the call's premium. Both premiums must be recovered.", i=0),
            Felle(fc_C[1], f"You used only the call's premium. Both premiums must be recovered.", i=1),
            Felle(fc_S[0], f"You measured from today's share price {S}. The payoff kinks at the strike {K}.", i=0),
            Felle(fc_S[1], f"You measured from today's share price {S}. The payoff kinks at the strike {K}.", i=1),
        ], [lav, hoy]),
    )

    # (d) -----------------------------------------------------------------
    bev = f"fall {pst(ned, 1)} or rise {pst(opp, 1)} from today's price"
    d = tekst_del(
        "d", poeng=4,
        q=(f"<p>Your analyst expects the announcement to move {navn}'s share much more than the market does. What "
           f"exactly does the straddle bet on? Should you buy it on the analyst's view? Is it an arbitrage?</p>"),
        setninger="Answer in at most four sentences.",
        gitt=f"<p>From (a) and (c): the straddle costs {_f(k4)} and breaks even at {_f(K - k4)} and {_f(K + k4)}.</p>",
        kort=(f"<p>The straddle pays |S<sub>T</sub> − K|, so it bets on the size of the move, not its direction: on "
              f"volatility. Both legs rise with volatility, so its price of {_f(k4)} already reflects the move the "
              f"market expects (the implied volatility): the share must {bev} just to break even. Yes, buy it if you "
              f"trust the analyst: a larger expected move means your σ is above the implied one, so the straddle is "
              f"cheap to you. It is not an arbitrage: if the share ends near {K}, you lose up to the full "
              f"{_f(k4)}.</p>"),
        losning=(f"<p><b>What it bets on.</b> One leg gains when the share rises, the other when it falls. The "
                 f"loss on each is capped at its premium. So the straddle gains from a large move either way and "
                 f"loses when nothing happens. That is a pure bet on volatility.</p>"
                 f"<p><b>Why the market already charges for it.</b> An option's value rises with volatility, because "
                 f"its payoff is floored at zero. Before a big announcement the market expects a large move, so both "
                 f"options are dear. The cost of {_f(k4)} is the market's expected move in price form, the implied "
                 f"volatility of the two options.</p>"
                 f"<p><b>The decision.</b> Compare your view with the price, not with zero: you need a move beyond "
                 f"{_f(K - k4)} or {_f(K + k4)}: the share must {bev}. If your analyst's volatility is above "
                 f"the implied one, the straddle is cheap in your view and you buy; if below, the H2025 logic says "
                 f"write it instead.</p>"
                 f"<p><b>Typical mistakes:</b> calling it a bet on the share rising, or calling it riskless because it "
                 f"pays in both directions. It loses whenever the move is small.</p>"
                 f"<p><b>Remember:</b> a straddle is a volatility position. It pays only if the move beats what the "
                 f"price already expects.</p>"),
        kriterier=[
            "States that the payoff |S<sub>T</sub> − K| gains from a large move in either direction: a bet on volatility, not on direction (1 p)",
            "Explains that the price already reflects the volatility the market expects (both legs rise with σ), so the straddle is dear before an announcement (1 p)",
            "Answers the question: yes, buy if you trust the analyst, because a larger expected move than the price implies means your σ is above the implied one (the break-evens show the move needed) (1 p)",
            "States that it is not an arbitrage: a small move (S<sub>T</sub> near K) loses up to the whole premium (1 p)",
        ],
    )
    _unik("ov-ops4", [a, b, c, d])
    return ovelse(case, [a, b, c, d])


# ---------------------------------------------------------------------------
# ov-ops5 · Black-Scholes-intuisjon og amerikansk mot europeisk (mest tekst)
# ---------------------------------------------------------------------------
# Vignettene: selskap, hva som har skjedd med aksjen og nyheten i (a). «fall»: putten er dypt i pengene;
# «stige»: callen er dypt i pengene. Begge gir tall til amerikansk mot europeisk i (c), og (b) varierer.
VIGNETTER_OPS5 = [
    dict(firma="Kvitnes Offshore ASA", retning="fall", hva="after losing its largest drilling contract", nyhet="vol_opp"),
    dict(firma="Barentshav Fiskeri ASA", retning="fall", hva="after a disease outbreak at two of its farms",
         nyhet="vol_ned"),
    dict(firma="Granholt Retail ASA", retning="fall", hva="after two weak quarters", nyhet="rente_opp"),
    dict(firma="Stavsnes Batteri ASA", retning="fall", hva="after its new factory was delayed", nyhet="rente_ned"),
    dict(firma="Ironbridge Steel Inc.", retning="fall", hva="after a slump in steel prices", nyhet="utbytte"),
    dict(firma="Clearwater Biotech Inc.", retning="fall", hva="after a failed drug trial", nyhet="vol_opp"),
    dict(firma="Harlow Airlines Inc.", retning="fall", hva="after a jump in fuel prices", nyhet="rente_opp"),
    dict(firma="Saltdal Eiendom ASA", retning="fall", hva="after vacancies rose in its office buildings",
         nyhet="utbytte"),
    dict(firma="Torvik Telecom ASA", retning="fall", hva="after losing a spectrum auction", nyhet="vol_ned"),
    dict(firma="Tussefoss Kraft ASA", retning="stige", hva="after a sharp rise in power prices", nyhet="vol_opp"),
    dict(firma="Brightwater Software Inc.", retning="stige", hva="after winning a large government contract",
         nyhet="rente_opp"),
    dict(firma="Nordkapp Aqua ASA", retning="stige", hva="after record salmon prices", nyhet="utbytte"),
    dict(firma="Ashfield Gold Inc.", retning="stige", hva="after a jump in the gold price", nyhet="vol_ned"),
    dict(firma="Haugland Elektro ASA", retning="stige", hva="after a strong quarter", nyhet="rente_ned"),
]


def _nyhet_ops5(typ, firma, D):
    """Teksten, modellsvaret, løsningen og kriteriene for nyheten i (a)."""
    if typ == "vol_opp":
        tekst = (f"A rival has made a surprise bid for {firma}'s main customer and a court ruling on its licence is "
                 f"pending. Analysts now expect much larger swings in the share, while today's share price is unchanged.")
        kort = ("Both the call and the put rise. An option's payoff is floored at zero, so a wider spread of outcomes adds "
                "larger good outcomes while the bad ones still cost the holder nothing beyond the premium. Since σ does "
                "not appear in put-call parity, C − P = S − PV(K) is unchanged, so both rise by the same amount.")
        krit = ["Says the call rises (1 p)", "Says the put rises as well (1 p)",
                "Explains the mechanism: the payoff is floored at zero, so more spread adds upside without adding downside (1 p)",
                "Notes that σ is not in put-call parity, so the call and the put rise by the same amount (1 p)"]
        mek = ("Higher volatility means a wider spread of share prices at expiry with the same average. The holder "
               "collects the extra good outcomes and walks away from the extra bad ones, because the payoff cannot fall "
               "below zero. So both options gain. Parity C − P = S − PV(K) contains no σ, so with S and r<sub>f</sub> "
               "fixed the call and the put must move by exactly the same amount.")
    elif typ == "vol_ned":
        tekst = (f"{firma} signs a ten-year fixed-price contract that removes most of the uncertainty about its "
                 f"earnings. The share price itself does not change.")
        kort = ("Both the call and the put fall. Their value above the floor comes from the chance of large moves, "
                "because the payoff is floored at zero; less spread means less of that. σ is not in put-call parity, "
                "so C − P = S − PV(K) is unchanged and both fall by the same amount.")
        krit = ["Says the call falls (1 p)", "Says the put falls as well (1 p)",
                "Explains the mechanism: with the payoff floored at zero, the value comes from the spread of outcomes, which shrinks (1 p)",
                "Notes that σ is not in put-call parity, so the call and the put fall by the same amount (1 p)"]
        mek = ("Lower volatility narrows the spread of share prices at expiry. The holder of an option profits from the "
               "tails, because the payoff is floored at zero, so a narrower spread removes value from both the call and "
               "the put. With S and r<sub>f</sub> fixed, parity C − P = S − PV(K) does not move, so both lose the same "
               "amount.")
    elif typ in ("rente_opp", "rente_ned"):
        opp = typ == "rente_opp"
        tekst = (f"The central bank unexpectedly {'raises' if opp else 'cuts'} its policy rate. The one-year risk-free "
                 f"rate {'rises' if opp else 'falls'} by one percentage point, while {firma}'s share price does not change.")
        kort = (f"The call {'rises' if opp else 'falls'} and the put {'falls' if opp else 'rises'}. A "
                f"{'higher' if opp else 'lower'} rate {'lowers' if opp else 'raises'} PV(K): the call holder pays K "
                f"at expiry, so a {'smaller' if opp else 'larger'} present value of what you pay "
                f"{'helps' if opp else 'hurts'} the call, while the put holder receives K, so it "
                f"{'hurts' if opp else 'helps'} the put. Parity shows the same: C − P = S − PV(K) "
                f"{'rises' if opp else 'falls'}.")
        krit = [f"Says the call {'rises' if opp else 'falls'} (1 p)", f"Says the put {'falls' if opp else 'rises'} (1 p)",
                f"Explains the mechanism: the rate changes PV(K); the call holder pays K and the put holder receives K at expiry (1 p)",
                f"Uses parity or the floor S − PV(K) to confirm the direction: C − P = S − PV(K) {'rises' if opp else 'falls'} (1 p)"]
        mek = (f"The strike is paid (call) or received (put) at expiry, so what matters today is PV(K). A "
               f"{'higher' if opp else 'lower'} rate makes PV(K) {'smaller' if opp else 'larger'}. For the call holder "
               f"that is a {'cheaper' if opp else 'dearer'} purchase price in today's money; for the put holder a "
               f"{'smaller' if opp else 'larger'} sale price. With S fixed, C − P = S − PV(K) "
               f"{'rises' if opp else 'falls'}, consistent with the call {'gaining' if opp else 'losing'} and the put "
               f"{'losing' if opp else 'gaining'}.")
    else:  # utbytte
        tekst = (f"{firma} announces a special dividend of {D} per share, to be paid in six months, before the options "
                 f"expire. Today's share price does not change on the announcement.")
        kort = ("The call falls and the put rises. On the ex-dividend date the share drops by the dividend, but the "
                "option holder gets none of the cash: the call holder buys a share that is worth less, the put holder "
                "sells one that is worth less. Parity with a dividend shows it: C − P = S − PV(Div) − PV(K) falls.")
        krit = ["Says the call falls (1 p)", "Says the put rises (1 p)",
                "Explains the mechanism: the share drops by the dividend on the ex-date and the option holder receives none of it (1 p)",
                "Uses parity with a dividend, C − P = S − PV(Div) − PV(K), or the expected share price at expiry to confirm the direction (1 p)"]
        mek = ("A dividend moves value out of the share before expiry: the share price drops by the dividend on the "
               "ex-dividend date, but only the shareholder receives the cash. An option is written on the share price, "
               "so the call is worth less and the put more. Parity with a known dividend, "
               "C − P = S − PV(Div) − PV(K), shows C − P falling by PV(Div).")
    return tekst, kort, krit, mek


_OPS5_BRUK = {"nyhet": {}, "firma": {}}


def _velg_vignett_ops5(r):
    """Trekker nyhetstypen først blant de minst brukte, så selskapet blant de minst brukte med den typen.
       Over tolv varianter kommer hver av de fem typene minst to ganger. Telleren øker bare når en variant
       er godtatt (rett før return), og rekkefølgen er sortert, så byggingen er deterministisk."""
    typer = sorted({x["nyhet"] for x in VIGNETTER_OPS5})
    minst = min(_OPS5_BRUK["nyhet"].get(t, 0) for t in typer)
    typ = r.choice([t for t in typer if _OPS5_BRUK["nyhet"].get(t, 0) == minst])
    kandidater = [x for x in VIGNETTER_OPS5 if x["nyhet"] == typ]
    minst_f = min(_OPS5_BRUK["firma"].get(x["firma"], 0) for x in kandidater)
    return r.choice([x for x in kandidater if _OPS5_BRUK["firma"].get(x["firma"], 0) == minst_f])


@oppgave("ov-ops5", tema="opsjoner", tittel="Option intuition: news, zero volatility and American options", antall=12,
         sjanger="d3-bs", kilde="H2025 E1, Lecture 9 slides 19–23, wrap-up (American options)")
def _(r):
    v = _velg_vignett_ops5(r)
    fall = v["retning"] == "fall"
    if fall:
        K = r.choice([40, 50, 60, 80, 100, 120])
        m = r.choice([0.70, 0.75, 0.80])
        sig = r.choice([0.20, 0.25, 0.30])
    else:
        K = r.choice([40, 50, 60, 80, 100])
        m = r.choice([1.20, 1.25, 1.30])
        sig = r.choice([0.25, 0.30, 0.35])
    S = K * m
    if abs(S - round(S)) > 1e-9:
        raise Avvis("kursen er ikke et helt tall")
    S = int(round(S))
    rf = r.choice([0.04, 0.05, 0.06])
    PV = K / (1 + rf)
    C = rund(_bs_call(S, K, rf, 1.0, sig), 2)
    P = rund(C + PV - S, 2)
    if C < 0.3 or P < 0.3:
        raise Avvis("en av opsjonene er for billig")
    if fall and K - S - P < 0.8:
        raise Avvis("putten er ikke dypt nok i pengene")
    if not fall and C - (S - PV) < 0.3:
        raise Avvis("callen ligger for nær gulvet")
    D = rund(S * r.choice([0.04, 0.05, 0.06]), 2)
    firma = v["firma"]
    kode, _tegn = _valuta(firma)
    tekst, kort_a, krit_a, mek_a = _nyhet_ops5(v["nyhet"], firma, _f(D, 2))
    Cgulv = max(S - PV, 0.0)
    Pgulv = max(PV - S, 0.0)
    PV4 = rund(PV, 4)
    ST = S * (1 + rf)                                   # kursen ved forfall når σ = 0
    _lik(S - PV4, S - PV)

    case = (f"<p>{firma} has {'fallen' if fall else 'risen'} to {S} a share {v['hva']}. European call and put options "
            f"on the share have strike K = {K} and expire in one year. The call trades at {_f(C, 2)} and the put at "
            f"{_f(P, 2)}. The risk-free rate is {prosent_tekst(rf * 100, 1)} a year, compounded annually. The firm has "
            f"never paid a dividend.</p>"
            f"<p>Treat each part separately. Unless a part says otherwise, nothing else changes and no dividend is paid "
            f"before expiry. No Black-Scholes calculations are needed. All prices are in {kode} per share.</p>")

    # (a) -----------------------------------------------------------------
    a = tekst_del(
        "a", poeng=4,
        q=f"<p>{tekst} What happens to the prices of the call and the put? Explain.</p>",
        setninger="Answer in at most three sentences.",
        kort=f"<p>{kort_a}</p>",
        losning=(f"<p><b>The mechanism.</b> {mek_a}</p>"
                 f"<p><b>How to reason without a formula.</b> Ask two questions about any news: does it change the share "
                 f"the holder ends up with? Does it change what K is worth today? Then check the direction with "
                 f"parity, C − P = S − PV(K). Kurbatov: the Black-Scholes calculation will not be on the exam, but the "
                 f"intuition can be. You do not need to explain N(d<sub>1</sub>).</p>"
                 f"<p><b>Typical mistakes:</b> «volatility up: call up, put down» (both rise), «a higher rate lowers "
                 f"every price» (it helps the call) and forgetting that the share drops on the ex-dividend date.</p>"
                 f"<p><b>Remember:</b> σ moves the call and the put the same way; S, K, r<sub>f</sub> and dividends move "
                 f"them in opposite directions.</p>"),
        kriterier=krit_a,
    )

    # (b) -----------------------------------------------------------------
    verdi = (f"The market prices are higher, {_f(C, 2)} and {_f(P, 2)}, because uncertainty lets the holder keep large "
             f"gains and walk away from large losses: that excess is volatility value.")
    if fall:
        kort_b = (f"<p><b>Call 0.0000, put {_f(PV4 - S)}.</b> In a year the share is worth {S} × {_g(rf)} = "
                  f"{_f(ST, 2)} for sure, below K = {K}: the call is never exercised, the put pays "
                  f"{_f(K - ST, 2)} for sure, worth PV(K) − S = {_f(PV4)} − {S}. {verdi}</p>")
        steg_b = (f"<p><b>Step 1: the share at expiry.</b> {S} × {_g(rf)} = {_f(ST, 2)}, below the strike {K}.</p>"
                  f"<p><b>Step 2: the call.</b> It will surely not be exercised: worth <b>0</b>. In general "
                  f"C = max(S − PV(K), 0), where S − PV(K) = {S} − {_f(PV4)} is negative.</p>"
                  f"<p><b>Step 3: the put.</b> It surely pays {K} − {_f(ST, 2)} = {_f(K - ST, 2)}, worth "
                  f"{_f(K - ST, 2)}/{_g(rf)} = PV(K) − S = <b>{_f(PV4 - S)}</b> today.</p>")
        feller_b = [
            Felle(S - PV, "You forgot the max(·, 0). An option can never be worth less than zero: the holder simply "
                          "does not exercise.", i=0),
            Felle(K - S, f"You used K = {K} instead of PV(K). K is paid at expiry, so discount K.", i=1),
            Felle(K - ST, "This is what the put pays in a year. Discount it to today.", i=1),
        ]
    else:
        kort_b = (f"<p><b>Call {_f(S - PV4)}, put 0.0000.</b> In a year the share is worth {S} × {_g(rf)} = "
                  f"{_f(ST, 2)} for sure, above K = {K}: the call is surely exercised, worth S − PV(K) = {S} − "
                  f"{_f(PV4)}; the put is never exercised. {verdi}</p>")
        steg_b = (f"<p><b>Step 1: the share at expiry.</b> {S} × {_g(rf)} = {_f(ST, 2)}, above the strike {K}.</p>"
                  f"<p><b>Step 2: the call.</b> It surely pays {_f(ST, 2)} − {K} = {_f(ST - K, 2)}, worth "
                  f"{_f(ST - K, 2)}/{_g(rf)} = S − PV(K) = <b>{_f(S - PV4)}</b> today.</p>"
                  f"<p><b>Step 3: the put.</b> It will surely not be exercised: worth <b>0</b>. In general "
                  f"P = max(PV(K) − S, 0), where PV(K) − S = {_f(PV4)} − {S} is negative.</p>")
        feller_b = [
            Felle(S - K, f"You used K = {K} instead of PV(K). K is paid at expiry, so discount K.", i=0),
            Felle(ST - K, "This is what the call pays in a year. Discount it to today.", i=0),
            Felle(PV - S, "You forgot the max(·, 0). An option can never be worth less than zero: the holder simply "
                          "does not exercise.", i=1),
        ]
    tol_c = 0.01 if Cgulv == 0 else None
    tol_p = 0.01 if Pgulv == 0 else None
    b = blandet_del(
        "b", poeng=4, tall_poeng=2, selvstendig=True,
        q=(f"<p>Suppose the share's volatility were zero, so that it grows at the risk-free rate for sure. What would "
           f"the European call and the European put be worth today?</p>"),
        tekst_ledd="Why is the gap between their market prices and these values called volatility value?",
        svar=[T("call at σ = 0", Cgulv, kode, abs=tol_c), T("put at σ = 0", Pgulv, kode, abs=tol_p)],
        kort=kort_b,
        losning=(f"<p>Kurbatov's tip for intuition questions: test the edge case σ = 0. With no uncertainty the share must "
                 f"earn the risk-free rate, so its price at expiry is known today.</p>"
                 f"{steg_b}"
                 f"<p><b>Why «volatility value».</b> With σ = 0 the decision to exercise is known today, so the right to "
                 f"walk away is worth nothing and each option is a sure payoff discounted at r<sub>f</sub>. The market "
                 f"prices are higher, {_f(C, 2)} against {_f(Cgulv)} and {_f(P, 2)} against {_f(Pgulv)}. The excess is "
                 f"what the chance of large moves is worth to a holder who keeps the good outcomes and drops the bad "
                 f"ones.</p>"
                 f"<p><b>Remember:</b> the floors are max(S − PV(K), 0) and max(PV(K) − S, 0), with PV(K), not K.</p>"),
        kriterier=[
            "Explains that with σ = 0 the outcome and so the exercise decision are known today: each option is a sure payoff discounted at r<sub>f</sub> and the right to walk away is worth nothing (1 p)",
            "Explains that the market prices exceed these floors because uncertainty lets the holder keep large gains and walk away from large losses: that excess is volatility value (1 p)",
        ],
        feller=_rydd(feller_b, [Cgulv, Pgulv], abs_=[tol_c, tol_p]),
    )

    # (c) -----------------------------------------------------------------
    if fall:
        kort_c = (f"<p>An American option gives every right of the European one plus early exercise, so it can never "
                  f"be worth less. The call stays the same: on a share without dividends a call is worth at least "
                  f"S − PV(K) alive, more than the S − K from exercising, so early exercise never pays. The put goes up: "
                  f"exercising today gives {K} − {S} = {K - S}, more than the European price of {_f(P, 2)}, because K "
                  f"received now earns interest, so the American put is worth at least {K - S}.</p>")
        los_c = (f"<p><b>The call.</b> Alive, a European call on a share without dividends is worth at least "
                 f"S − PV(K), which is more than S − K, the payoff from exercising now, because K is paid later. So "
                 f"exercising early throws value away: you pay K sooner and give up the protection below K. The right is "
                 f"never used and the American call is worth the same as the European one.</p>"
                 f"<p><b>The put.</b> Deep in the money the put holder wants K as soon as possible: exercising today "
                 f"gives {K} − {S} = {K - S} now, which grows to {_f((K - S) * (1 + rf), 2)} by expiry. The European put "
                 f"costs only {_f(P, 2)}, because its K comes in a year and is worth PV(K) = {_f(PV4)} today. An "
                 f"American put would therefore be exercised now and must be worth at least {K - S}: its price goes "
                 f"up.</p>")
        krit4 = (f"Uses the numbers: K − S = {K - S} &gt; {_f(P, 2)}, the European put price, so the American put is "
                 f"worth at least {K - S} (1 p)")
    else:
        kort_c = (f"<p>An American option gives every right of the European one plus early exercise, so it can never "
                  f"be worth less. The call stays the same: exercising now gives only S − K = {S - K}, while alive it "
                  f"is worth at least S − PV(K) = {_f(S - PV4)} and trades at {_f(C, 2)}, so early exercise never pays "
                  f"on a share without dividends. The put goes up, if only a little: receiving K early earns interest, "
                  f"so the right to exercise early has value in case the share falls far before expiry.</p>")
        los_c = (f"<p><b>The call.</b> Exercising today gives {S} − {K} = {S - K}. Alive, a European call on a share "
                 f"without dividends is worth at least S − PV(K) = {S} − {_f(PV4)} = {_f(S - PV4)}, because K is paid "
                 f"only at expiry; it trades at {_f(C, 2)}. Exercising early throws that difference away: you pay K "
                 f"sooner and give up the protection below K. The right is never used and the American call is worth "
                 f"the same as the European one.</p>"
                 f"<p><b>The put.</b> Out of the money today, exercising now gives nothing. But if the share fell far "
                 f"before expiry, the holder of an American put could take K at once and earn interest on it. That "
                 f"right has some value, so the American put is worth a little more than the European {_f(P, 2)}.</p>")
        krit4 = (f"Uses the numbers: exercising the call now gives S − K = {S - K}, less than its floor "
                 f"S − PV(K) = {_f(S - PV4)} and its price {_f(C, 2)}, so the American call is never exercised early "
                 f"(1 p)")
    c = tekst_del(
        "c", poeng=4,
        q=("<p>What if the options were American instead of European? Do you expect each price to go up, go down or "
           "stay the same? Explain, using the numbers in the case.</p>"),
        setninger="Answer in at most four sentences.",
        gitt=f"<p>From (b): with σ = 0 the call would be worth {_f(Cgulv)} and the put {_f(Pgulv)}.</p>",
        kort=kort_c,
        losning=(f"<p><b>The general rule.</b> An American option adds a right and removes none, so American ≥ "
                 f"European. The question is whether the extra right is ever used.</p>"
                 f"{los_c}"
                 f"<p><b>Typical mistakes:</b> «American options are always worth more» without the call exception, "
                 f"or «the call is exercised early when it is in the money». Kurbatov: only European options will be "
                 f"calculated; the direction can be asked.</p>"
                 f"<p><b>Remember:</b> American call on a share without dividends = European call. American put ≥ "
                 f"European put, strictly more when it pays to get K early.</p>"),
        kriterier=[
            "States that an American option is worth at least as much as the European one, because it adds the right to exercise early (1 p)",
            "Says the call stays the same: on a share without dividends it is worth at least S − PV(K) &gt; S − K alive, so early exercise never pays (1 p)",
            "Says the put goes up: receiving K early earns interest, so exercising early can pay when the put is deep in the money (1 p)",
            krit4,
        ],
    )
    _unik("ov-ops5", [a, b, c])
    _OPS5_BRUK["nyhet"][v["nyhet"]] = _OPS5_BRUK["nyhet"].get(v["nyhet"], 0) + 1
    _OPS5_BRUK["firma"][v["firma"]] = _OPS5_BRUK["firma"].get(v["firma"], 0) + 1
    return ovelse(case, [a, b, c])
