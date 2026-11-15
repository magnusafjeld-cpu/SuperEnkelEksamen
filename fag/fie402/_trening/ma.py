# -*- coding: utf-8 -*-
"""Eksamenstrening FIE402: fusjoner og oppkjøp (tema «ma»).

   Familier (regnespørsmål med tallsvar):
     ma-swp1  aksjebytte med formelarket: P_new, NPV for kjøper og for målet
     ma-erx1  høyeste bytteforhold og minste synergi som rettferdiggjør et bud
     ma-csh1  kontantbud: NPV_A = S − (P − T), NPV_T = P − T (forelesning 12, s. 15)
     ma-prm1  kontanter mot aksjer når kjøperens aksje er overpriset
     ma-prb1  markedets sannsynlighet for at avtalen gjennomføres, long-short med
              (1 + r_f)^T (Mannesmann/Vodafone, H2025 E6, B12, D13)
     ma-arb1  fusjonsarbitrasje: utbetalingen ved brudd og avkastningen ved suksess
     ma-syn1  implisitte synergier: kursreaksjonen ved sikkert kontantbud, og
              Mannesmann-varianten med gitt sannsynlighet
     ma-coi1  coinsurance: overføringen fra aksjonærene til kreditorene
     ma-bid1  budgivning etter alternativer (forelesning 12, s. 26)
     ma-eps1  EPS og P/E etter et aksjebytte uten synergier

   Statiske spørsmål ma-s01 … ma-s11: hvem vinner (målet ca. 15 %, kjøper ca. 1 %),
   aksjer demper feilprising, aksjebud som signal, arbitrasje som forsikring,
   hvorfor r_f i long-short, coinsurance, EPS-bootstrapping, skjevhet i
   implisitte synergier, utsettelse av avtalen, avstemningen og
   faktisk mot tilbudt premie.

   Kilder: kj10, forelesning 12 (lecture_12.pdf), PS4, Kurbatovs nøkkel til
   H2025 E6 og docs/fie402-forelesninger-2026.md (A5, B12, D13).
"""
from trening_lib import *  # noqa: F401,F403


PAR = [("Brattfjell ASA", "Lunde Maskin AS"), ("Havørn ASA", "Strand Elektro AS"), ("Kvitstein ASA", "Myrvold Data AS"),
       ("Østhavn ASA", "Bjerkli Tekstil AS"), ("Granvik ASA", "Solsiden Bakeri AS"), ("Tverrfjord ASA", "Hagen Verktøy AS"),
       ("Steinbu ASA", "Lia Plast AS"), ("Nesvik Holding ASA", "Elvetun Software AS")]


def _p(x, d=2):
    return pst(x, d)


def _k(navn):
    """Kortnavn uten selskapsform: «Brattfjell ASA» → «Brattfjell»."""
    return navn.replace(" ASA", "").replace(" AS", "")


def _nok(x, d=2):
    """«NOK −12.30 million»: minustegnet inntil tallet, så tallsvaret leses riktig."""
    return f"NOK {tall(x, d)} million"


# ---------------------------------------------------------------------------
# ma-swp1 · Aksjebytte: P_new, NPV for kjøper og for målet
# ---------------------------------------------------------------------------
HJ_SWP = hjelp3(
    "This is the stock swap on the formula sheet. The acquirer pays with new shares, so the target's owners end up "
    "with a fraction of the merged firm.",
    "x = ER × N<sub>T</sub>, y = x/(N<sub>A</sub> + x), P<sub>new</sub> = (A + T + S)/(N<sub>A</sub> + x). "
    "NPV<sub>A</sub> = (1 − y)(A + T + S) − A, NPV<sub>T</sub> = y(A + T + S) − T.",
    "<p><b>Step 1: stand-alone values.</b> A and T are shares times pre-announcement prices.</p>"
    "<p><b>Step 2: the new shares.</b> The exchange ratio is acquirer shares per target share, so multiply by the "
    "target's share count.</p>"
    "<p><b>Step 3: split the merged firm.</b> The merged value includes the synergies. Each side owns its fraction of "
    "the shares.</p>"
    "<p><b>Watch out:</b> the shares paid are worth the merged price, not the old acquirer price. Divide by all "
    "shares after the merger.</p>",
)


@familie("ma-swp1", tema="ma", antall=5, tittel="Stock swap: the merged price and the NPV to each side", hjelp=HJ_SWP)
def _(r):
    A_n, T_n = r.choice(PAR)
    NA = r.choice([20, 25, 30, 40, 50])
    PA = r.choice([60, 80, 100, 120, 150])
    NT = r.choice([10, 12, 15, 20])
    PT = r.choice([20, 25, 30, 40, 45])
    ER = r.choice([0.30, 0.40, 0.45, 0.50, 0.60])
    S = r.choice([60, 90, 120, 180, 240])
    tilbudt = ER * PA / PT - 1
    if not 0.05 <= tilbudt <= 0.8:
        raise Avvis("premien er urimelig")
    A, T = NA * PA, NT * PT
    x = ER * NT
    tot = A + T + S
    y = x / (NA + x)
    Pn = tot / (NA + x)
    npvA = (1 - y) * tot - A
    npvT = y * tot - T
    typ = r.choice(["pnew", "npva", "npvt"])

    q = (f"<p>{A_n} has {NA} million shares at NOK {PA}. It offers {tall(ER, 2)} of its own shares for each of the "
         f"{NT} million shares of {T_n}, which trade at NOK {PT}. Both prices are from before the announcement and "
         f"reflect the stand-alone values. The synergies have a present value of NOK {S} million. There are no other "
         f"costs.</p>")
    if typ == "pnew":
        R_ = Pn
        q += "<p>What will the share price of the merged firm be, in NOK per share? Give four decimals.</p>"
        f1 = (tot / NA, f"Divided by {gen(_k(A_n))} old {NA} million shares only. The {tall(x, 2)} million new shares "
                        f"given to {gen(_k(T_n))} owners also share in the merged firm.")
        f2 = ((A + T) / (NA + x), f"The synergies of NOK {S} million left out. They are part of the merged firm's "
                                  f"value.")
        f3 = (tot / (NA + NT / ER), f"The exchange ratio inverted: {NT}/{tall(ER, 2)} million new shares. The ratio is "
                                    f"acquirer shares per target share, so multiply.")
        fmt = lambda v: f"NOK {tall(v, 4)}"  # noqa: E731
        tall_ut = tallsvar(enhet="NOK per share")
        svar = f"NOK {tall(Pn, 4)}"
    elif typ == "npva":
        R_ = npvA
        q += f"<p>What is the NPV of the deal for {gen(_k(A_n))} shareholders, in NOK million?</p>"
        f1 = (S - (x * PA - T), f"The new shares valued at the old acquirer price, as if they were cash: {S} − "
                                f"({tall(x, 2)} × {PA} − {T}). The target's owners get a fraction of the merged firm, "
                                f"synergies included, so the shares are worth the merged price.")
        f2 = (npvT, f"This is the NPV for {gen(_k(T_n))} owners, y(A + T + S) − T. The acquirer keeps the other "
                    f"fraction.")
        f3 = ((1 - y) * (A + T) - A, f"The synergies of NOK {S} million left out of the merged firm.")
        fmt = _nok
        tall_ut = tallsvar(enhet="NOK million", rel=0.001, abs=0.01)
        svar = _nok(npvA)
    else:
        R_ = npvT
        q += f"<p>What is the NPV of the deal for {gen(_k(T_n))} shareholders, in NOK million?</p>"
        f1 = (x * PA - T, f"The new shares valued at the old acquirer price: {tall(x, 2)} × {PA} − {T}. They are shares "
                          f"in the merged firm, so they are worth the merged price.")
        f2 = (y * (A + T) - T, f"The synergies of NOK {S} million left out. The target's owners own a fraction of "
                               f"them too.")
        f3 = (npvA, f"This is the NPV for {gen(_k(A_n))} shareholders, (1 − y)(A + T + S) − A.")
        fmt = _nok
        tall_ut = tallsvar(enhet="NOK million", rel=0.001, abs=0.01)
        svar = _nok(npvT)
    ulike(R_, f1[0], f2[0], f3[0], rel=0.02)
    alternativer = [R(fmt(R_), R_)] + [F(fmt(v), t, v) for v, t in (f1, f2, f3)]

    kort = (f"<p><b>{svar}.</b> x = {tall(ER, 2)} × {NT} = {tall(x, 2)} million new shares. A + T + S = {A} + {T} + "
            f"{S} = {tot}. y = {tall(x, 2)}/{tall(NA + x, 2)} = {tall(y, 4)}. "
            + {"pnew": f"P<sub>new</sub> = {tot}/{tall(NA + x, 2)} = {tall(Pn, 4)}.",
               "npva": f"NPV<sub>A</sub> = (1 − y) × {tot} − {A} = {tall(npvA, 2)}.",
               "npvt": f"NPV<sub>T</sub> = y × {tot} − {T} = {tall(npvT, 2)}."}[typ] + "</p>")
    full = (
        f"<p><b>What a stock swap does.</b> Instead of cash, the acquirer gives the target's owners new shares. They "
        f"end up owning a fraction y of the merged firm, synergies included. So the price they receive depends on what "
        f"the merged shares are worth, not on the acquirer's old price.</p>"
        f"<p><b>Step 1: stand-alone values.</b> A = {NA} × {PA} = {A}. T = {NT} × {PT} = {T}. Merged firm: {A} + {T} + "
        f"{S} = {tot}.</p>"
        f"<p><b>Step 2: the new shares.</b> x = {tall(ER, 2)} × {NT} = {tall(x, 2)} million, so {tall(NA + x, 2)} "
        f"million shares in all and y = {tall(x, 2)}/{tall(NA + x, 2)} = {tall(y, 4)}.</p>"
        f"<p><b>Step 3: the merged price.</b> P<sub>new</sub> = {tot}/{tall(NA + x, 2)} = {tall(Pn, 4)}.</p>"
        f"<p><b>Step 4: the NPVs.</b> NPV<sub>A</sub> = N<sub>A</sub>(P<sub>new</sub> − P<sub>A</sub>) = {NA} × "
        f"({tall(Pn, 4)} − {PA}) = {tall(npvA, 2)}. NPV<sub>T</sub> = x × P<sub>new</sub> − T = {tall(x, 2)} × "
        f"{tall(Pn, 4)} − {T} = {tall(npvT, 2)}.</p>"
        f"<p><b>First check.</b> {tall(npvA, 2)} + {tall(npvT, 2)} = {tall(npvA + npvT, 2)} = S. This holds for any "
        f"y, so it catches a slip in one line, not a wrong share count.</p>"
        f"<p><b>Remember:</b> the target is paid in shares of the merged firm, valued at P<sub>new</sub>.</p>"
    )
    return sporsmal(q, alternativer, kort, full, tall=tall_ut)


# ---------------------------------------------------------------------------
# ma-erx1 · Høyeste bytteforhold og minste synergi
# ---------------------------------------------------------------------------
HJ_ERX = {
    "ermax": hjelp3(
        "This is the highest exchange ratio the acquirer can offer before its own shareholders lose. You need that "
        "ratio.",
        "NPV<sub>A</sub> ≥ 0 gives x ≤ N<sub>A</sub>(T + S)/A, so ER<sub>max</sub> = (P<sub>T</sub> + "
        "S/N<sub>T</sub>)/P<sub>A</sub> = (P<sub>T</sub>/P<sub>A</sub>)(1 + S/T).",
        "<p><b>Step 1: what the target is worth to the acquirer.</b> Its stand-alone price plus the synergies per "
        "target share.</p>"
        "<p><b>Step 2: express it in acquirer shares.</b> Divide by the acquirer's price.</p>"
        "<p><b>Watch out:</b> the synergies are spread over the target's shares here, because the ratio is per "
        "target share.</p>"),
    "smin": hjelp3(
        "This is the smallest synergy that makes a given stock offer worthwhile for the acquirer's shareholders.",
        "NPV<sub>A</sub> = (1 − y)(A + T + S) − A ≥ 0 rearranges to S ≥ x × P<sub>A</sub> − T: the value of the new "
        "shares at the acquirer's price minus the target's stand-alone value.",
        "<p><b>Step 1: the new shares.</b> Exchange ratio times the target's share count.</p>"
        "<p><b>Step 2: what they are worth at the acquirer's price.</b> That is what the acquirer gives away.</p>"
        "<p><b>Step 3: subtract what it gets on its own.</b> The target's stand-alone value. The synergies must cover "
        "the rest.</p>"),
}


@familie("ma-erx1", tema="ma", antall=5, tittel="The highest exchange ratio and the synergies a bid needs",
         hjelp=HJ_ERX["ermax"])
def _(r):
    A_n, T_n = r.choice(PAR)
    NA = r.choice([20, 30, 40, 45, 50])
    PA = r.choice([50, 60, 80, 100, 120])
    NT = r.choice([10, 12, 15, 20])
    PT = r.choice([20, 24, 30, 40, 50])
    if PT >= PA:
        raise Avvis("målet er dyrere per aksje")
    A, T = NA * PA, NT * PT
    typ = r.choice(["ermax", "ermax", "smin"])
    q = (f"<p>{A_n} has {NA} million shares at NOK {PA}. {T_n} has {NT} million shares at NOK {PT}. Both prices are "
         f"from before any news of a deal and reflect the stand-alone values.")
    if typ == "ermax":
        S = r.choice([60, 90, 120, 150, 210, 240])
        er = (PT + S / NT) / PA
        f1 = (PT / PA, f"The synergies left out: {PT}/{PA}. That is the ratio at which the acquirer pays exactly the "
                       f"target's stand-alone value. The synergies leave room for a premium.")
        f2 = ((PT + S / NA) / PA, f"The synergies spread over the acquirer's {NA} million shares. The ratio is per "
                                  f"target share, so spread them over the target's {NT} million shares.")
        f3 = (PA / (PT + S / NT), f"The ratio inverted: target shares per acquirer share. ER counts acquirer shares "
                                  f"per target share.")
        ulike(er, f1[0], f2[0], f3[0], rel=0.02)
        q += (f" The synergies of a merger have a present value of NOK {S} million.</p><p>What is the highest exchange "
              f"ratio, in {_k(A_n)} shares per {_k(T_n)} share, that {_k(A_n)} can offer before its shareholders lose "
              f"from the deal? Give four decimals.</p>")
        alt = [R(tall(er, 4), er)] + [F(tall(v, 4), t, v) for v, t in (f1, f2, f3)]
        tall_ut = tallsvar()
        kort = (f"<p><b>{tall(er, 4)}.</b> ER<sub>max</sub> = ({PT} + {S}/{NT})/{PA} = {tall(PT + S / NT, 4)}/{PA} = "
                f"{tall(er, 4)}.</p>")
        midt = (f"<p><b>Step 1: the target's worth to the acquirer.</b> Stand-alone {PT} plus synergies {S}/{NT} = "
                f"{tall(S / NT, 4)} per target share: {tall(PT + S / NT, 4)}.</p>"
                f"<p><b>Step 2: in acquirer shares.</b> {tall(PT + S / NT, 4)}/{PA} = <b>{tall(er, 4)}</b>.</p>"
                f"<p><b>First check.</b> At ER = {tall(er, 4)}, x = {tall(er * NT, 4)} million and P<sub>new</sub> = "
                f"({A} + {T} + {S})/{tall(NA + er * NT, 4)} = {tall((A + T + S) / (NA + er * NT), 4)}, the old price "
                f"of {PA}: NPV<sub>A</sub> = 0. This is the definition run backwards, so it catches arithmetic slips "
                f"only.</p>")
    else:
        ER = r.choice([0.40, 0.45, 0.50, 0.60, 0.75])
        x = ER * NT
        smin = x * PA - T
        if smin <= 5:
            raise Avvis("premien er for liten")
        f1 = (x * PA, f"The value of the new shares, {tall(x, 2)} × {PA}. The acquirer also gets the target's "
                      f"stand-alone value, so the synergies need only cover the excess.")
        f2 = (ER * PA - PT, f"The premium per target share, {tall(ER, 2)} × {PA} − {PT}. The question asks for the "
                            f"total synergies in NOK million.")
        f3 = (NT / ER * PA - T, f"The ratio inverted: {NT}/{tall(ER, 2)} million new shares. ER counts acquirer shares "
                                f"per target share.")
        ulike(smin, f1[0], f2[0], f3[0], rel=0.02)
        q += (f"</p><p>{_k(A_n)} offers {tall(ER, 2)} of its shares for each {_k(T_n)} share. How large must the "
              f"present value of the synergies be, at least, for the offer not to hurt {gen(_k(A_n))} shareholders, in "
              f"NOK million?</p>")
        alt = [R(_nok(smin), smin)] + [F(_nok(v), t, v) for v, t in (f1, f2, f3)]
        tall_ut = tallsvar(enhet="NOK million")
        kort = (f"<p><b>{_nok(smin)}.</b> x = {tall(ER, 2)} × {NT} = {tall(x, 2)} million shares worth {tall(x, 2)} × "
                f"{PA} = {tall(x * PA, 2)}. S<sub>min</sub> = {tall(x * PA, 2)} − {T} = {tall(smin, 2)}.</p>")
        midt = (f"<p><b>Step 1: the new shares.</b> x = {tall(ER, 2)} × {NT} = {tall(x, 2)} million.</p>"
                f"<p><b>Step 2: what they cost at the acquirer's price.</b> {tall(x, 2)} × {PA} = {tall(x * PA, 2)}.</p>"
                f"<p><b>Step 3: the break-even synergies.</b> The acquirer gets T = {T}, so S must be at least "
                f"{tall(x * PA, 2)} − {T} = <b>{tall(smin, 2)}</b>. That is the premium offered at pre-announcement "
                f"prices.</p>"
                f"<p><b>First check.</b> With S = {tall(smin, 2)}: P<sub>new</sub> = ({A} + {T} + {tall(smin, 2)})/"
                f"({NA} + {tall(x, 2)}) = {tall((A + T + smin) / (NA + x), 4)}, the old price. It runs the definition "
                f"backwards, so it catches arithmetic slips only.</p>")
    full = (
        f"<p><b>The acquirer's choice.</b> Its shareholders either keep their old firm, worth A = {NA} × {PA} = {A}, or "
        f"own the fraction N<sub>A</sub>/(N<sub>A</sub> + x) of the merged firm, worth A + T + S. The deal helps them "
        f"only if the second is at least as large. Rearranged, that caps the number of new shares at x ≤ "
        f"N<sub>A</sub>(T + S)/A, which is on the formula sheet.</p>"
        + midt +
        f"<p><b>Remember:</b> without synergies the highest ratio is P<sub>T</sub>/P<sub>A</sub>. The synergies are "
        f"what pays for a premium.</p>"
    )
    return sporsmal(q, alt, kort, full, hjelp=HJ_ERX[typ], tall=tall_ut)


# ---------------------------------------------------------------------------
# ma-csh1 · Kontantbud: NPV_A = S − (P − T), NPV_T = P − T
# ---------------------------------------------------------------------------
@familie("ma-csh1", tema="ma", antall=5, tittel="Cash offer: the NPV to the acquirer and to the target",
         hjelp=hjelp3(
             "This is a cash offer. The total gain is the synergy. The price decides how it is split between the two "
             "sets of owners.",
             "P = offer per share × N<sub>T</sub>, T = N<sub>T</sub> × pre-announcement price. NPV<sub>A</sub> = (A + T "
             "+ S) − P − A = S − (P − T). NPV<sub>T</sub> = P − T.",
             "<p><b>Step 1: the price paid in total.</b> Offer per share times the number of target shares.</p>"
             "<p><b>Step 2: the premium.</b> Price paid minus the target's stand-alone value at the price before the "
             "news.</p>"
             "<p><b>Step 3: the split.</b> The target's owners get the premium. The acquirer gets the synergy minus the "
             "premium.</p>"
             "<p><b>Watch out:</b> the target's price after the announcement already contains part of the premium.</p>",
         ))
def _(r):
    A_n, T_n = r.choice(PAR)
    NT = r.choice([10, 12, 15, 20, 24])
    PT0 = r.choice([20, 24, 30, 40, 45, 50])
    Po = PT0 + r.choice([5, 6, 8, 10, 12])
    PT1 = Po - r.choice([1, 1.5, 2, 3])
    S = r.choice([60, 90, 120, 150, 180, 240])
    P, T = NT * Po, NT * PT0
    npvA = S - (P - T)
    npvT = P - T
    typ = r.choice(["npva", "npva", "npvt"])
    q = (f"<p>{T_n} has {NT} million shares, which traded at NOK {PT0} before any news of a bid. {A_n} then announced a "
         f"cash offer of NOK {Po} per share. {_k(T_n)} now trades at NOK {talla(PT1)}. The synergies of the deal have a "
         f"present value of NOK {S} million.</p>")
    if typ == "npva":
        R_ = npvA
        q += f"<p>What is the NPV of the deal for {gen(_k(A_n))} shareholders, in NOK million?</p>"
        f1 = (S - (P - NT * PT1), f"The target valued at its price after the announcement, {talla(PT1)}. That price "
                                  f"already contains most of the premium. Use the stand-alone price before the news.")
        f2 = (S - P, f"The whole price subtracted from the synergies: {S} − {P}. The acquirer also gets the target, "
                     f"worth {T} on its own, so only the premium over that is a cost.")
        f3 = (S - (Po - PT0), f"The premium per share, {Po} − {PT0}, subtracted from total synergies. Multiply by the "
                              f"{NT} million shares first.")
    else:
        R_ = npvT
        q += f"<p>What is the NPV of the deal for {gen(_k(T_n))} shareholders, in NOK million?</p>"
        f1 = (P - NT * PT1, f"The gain measured from the price after the announcement, {talla(PT1)}. The owners had "
                            f"shares worth {PT0} each before the bid, so measure from there.")
        f2 = (P, f"The total price paid. The owners give up shares worth {T} on their own, so only the excess is a "
                 f"gain.")
        f3 = (npvA, f"This is the acquirer's NPV, S − (P − T). The target's owners get the premium.")
    ulike(R_, f1[0], f2[0], f3[0], rel=0.02)
    alt = [R(_nok(R_), R_)] + [F(_nok(v), t, v) for v, t in (f1, f2, f3)]
    kort = (f"<p><b>{_nok(R_)}.</b> P = {NT} × {Po} = {P}. T = {NT} × {PT0} = {T}. Premium P − T = {npvT}. "
            + (f"NPV<sub>A</sub> = {S} − {npvT} = {tall(npvA, 2)}." if typ == "npva" else
               f"NPV<sub>T</sub> = {npvT}.") + "</p>")
    full = (
        f"<p><b>How a cash deal splits the gain.</b> The merged firm is worth A + T + S. The acquirer pays P in cash. "
        f"Its owners end up with A + T + S − P, a gain of S − (P − T). The target's owners swap shares worth T for "
        f"cash P, a gain of P − T. The two add up to S whatever the price: the price only moves value between the "
        f"two sides.</p>"
        f"<p><b>Step 1: the price paid.</b> P = {NT} × {Po} = {P}.</p>"
        f"<p><b>Step 2: the stand-alone value.</b> T = {NT} × {PT0} = {T}, at the price before the news. The price "
        f"of {talla(PT1)} after the announcement already contains most of the premium, discounted for the chance "
        f"the deal fails.</p>"
        f"<p><b>Step 3: the premium.</b> P − T = {P} − {T} = {npvT}. That is NPV<sub>T</sub>.</p>"
        f"<p><b>Step 4: the acquirer.</b> NPV<sub>A</sub> = {S} − {npvT} = {tall(npvA, 2)}"
        + (f", negative: {_k(A_n)} pays away more than the synergies." if npvA < 0 else ".") + "</p>"
        f"<p><b>First check.</b> {tall(npvA, 2)} + {npvT} = {S} = S. It holds for any price, so it catches "
        f"arithmetic slips only.</p>"
        f"<p><b>Remember:</b> NPV<sub>A</sub> = S − (P − T). The target's owners take the premium.</p>"
    )
    return sporsmal(q, alt, kort, full, tall=tallsvar(enhet="NOK million", rel=0.001, abs=0.01))


# ---------------------------------------------------------------------------
# ma-prm1 · Kontanter mot aksjer når kjøperens aksje er overpriset
# ---------------------------------------------------------------------------
@familie("ma-prm1", tema="ma", antall=5, tittel="Cash or shares when the acquirer's shares are overvalued",
         hjelp=hjelp3(
             "This is the choice between cash and shares when the acquirer's managers know its shares are overpriced. "
             "You need the gain to the acquirer's owners from paying in shares.",
             "Cash: NPV<sub>A</sub> = T + S − C. Shares at true values: NPV<sub>A</sub> = [N<sub>A</sub>/(N<sub>A</sub> "
             "+ x)](A<sub>true</sub> + T + S) − A<sub>true</sub>. The gap equals x(P<sub>A</sub> − "
             "P<sub>new,true</sub>).",
             "<p><b>Step 1: the cash offer at true values.</b> The acquirer pays C and gets T + S.</p>"
             "<p><b>Step 2: the share offer at true values.</b> Use the true value of the acquirer, not its market "
             "price. Its owners keep their fraction of the true merged firm.</p>"
             "<p><b>Step 3: compare.</b> The difference is what the target's owners give up by accepting overpriced "
             "paper.</p>"
             "<p><b>Watch out:</b> at market prices the two offers look alike. The point is the true value.</p>",
         ))
def _(r):
    A_n, T_n = r.choice(PAR)
    NA = r.choice([20, 40, 50, 60])
    PA = r.choice([40, 50, 60, 80])
    over = r.choice([0.10, 0.15, 0.20, 0.25])
    PAt = PA * (1 - over)
    NT = r.choice([10, 15, 20])
    PT = r.choice([20, 25, 30, 40])
    S = r.choice([60, 100, 150, 200])
    x = r.choice([4, 5, 6, 8, 10, 12, 15])
    C = x * PA
    A_t, T = NA * PAt, NT * PT
    if not 1.05 <= C / T <= 1.6:
        raise Avvis("premien er urimelig")
    kont = T + S - C
    y = x / (NA + x)
    aksje = (1 - y) * (A_t + T + S) - A_t
    diff = aksje - kont
    Pnt = (A_t + T + S) / (NA + x)
    f_mkt = -y * (T + S - C)
    f_null = 0.0
    f_over = x * (PA - PAt)
    if abs(kont) < 5:
        raise Avvis("kontant-NPV nær null")
    ulike(diff, f_mkt, f_over, rel=0.02)
    if abs(diff) < 5:
        raise Avvis("for nær null")
    q = (f"<p>{A_n} has {NA} million shares that trade at NOK {PA}. Its managers know the true value is only NOK "
         f"{talla(PAt)} per share. {T_n} has {NT} million shares worth NOK {PT} each, its true stand-alone value. The "
         f"synergies have a present value of NOK {S} million. {_k(A_n)} can pay either NOK {C} million in cash or {x} "
         f"million new shares, which are worth NOK {C} million at today's market price.</p>"
         f"<p>Measured at true values, by how much are {gen(_k(A_n))} existing shareholders better off if it pays "
         f"with the new shares rather than with cash, in NOK million?</p>")
    alt = [R(_nok(diff), diff),
           F(_nok(f_mkt), f"The comparison at the market price of {PA}: the share offer then hands the target a "
                          f"fraction of the synergies too. But {_k(A_n)} is worth only {talla(PAt)} a share. That is "
                          f"what the new shares are really worth.", f_mkt),
           F(_nok(f_null), "The two offers have the same market value, but not the same true value. The new shares are "
                           "overpriced, so paying with them costs the old owners less.", f_null),
           F(_nok(f_over), f"The overpricing on the new shares alone, {x} × ({PA} − {talla(PAt)}). The target's owners "
                           f"get shares in the merged firm, which also holds the target and the synergies, so they are "
                           f"worth the merged true price.", f_over)]
    kort = (f"<p><b>{_nok(diff)}.</b> Cash: {T} + {S} − {C} = {tall(kont, 2)}. Shares: ({NA}/{NA + x}) × "
            f"({tall(A_t, 2)} + {T} + {S}) − {tall(A_t, 2)} = {tall(aksje, 2)}. Difference {tall(diff, 2)}.</p>")
    full = (
        f"<p><b>Why overvalued acquirers like paying in shares.</b> With cash the acquirer pays a fixed amount. With "
        f"shares it pays with paper the market overprices, so the target's owners receive less true value than the "
        f"market price suggests. The lecture's point: if the acquirer thinks its stock is overvalued, it prefers a "
        f"stock swap. The market knows this, so a stock offer is read as a signal.</p>"
        f"<p><b>Step 1: cash at true values.</b> {_k(A_n)} pays {C} and gains T + S = {T} + {S}: NPV = "
        f"{tall(kont, 2)}.</p>"
        f"<p><b>Step 2: shares at true values.</b> True merged value: {tall(A_t, 2)} + {T} + {S} = "
        f"{tall(A_t + T + S, 2)}. The old owners keep {NA}/({NA} + {x}) = {tall(1 - y, 4)} of it: "
        f"{tall(aksje + A_t, 2)}. Against their true {tall(A_t, 2)} that is {tall(aksje, 2)}.</p>"
        f"<p><b>Step 3: the difference.</b> {tall(aksje, 2)} − ({tall(kont, 2)}) = <b>{tall(diff, 2)}</b>.</p>"
        f"<p><b>First check.</b> The gap equals x(P<sub>A</sub> − P<sub>new,true</sub>): the true merged price is "
        f"{tall(A_t + T + S, 2)}/{NA + x} = {tall(Pnt, 4)}. Then {x} × ({PA} − {tall(Pnt, 4)}) = "
        f"{tall(x * (PA - Pnt), 2)}. This is the same equation rearranged, an identity, so it catches arithmetic "
        f"slips only. It does show what the gain is: the target's owners accept {x} shares at {PA} that are truly "
        f"worth {tall(Pnt, 4)} each.</p>"
        f"<p><b>Remember:</b> an acquirer that believes its shares are overvalued pays in shares. The market reads "
        f"that choice as bad news about the acquirer.</p>"
    )
    return sporsmal(q, alt, kort, full, tall=tallsvar(enhet="NOK million", rel=0.001, abs=0.01))


# ---------------------------------------------------------------------------
# Felles oppsett for avtalesannsynlighet og arbitrasje
# ---------------------------------------------------------------------------
TID = {1: "in exactly one year", 0.25: "in exactly three months", 0.5: "in exactly six months",
       0.75: "in exactly nine months"}


def _avtale(r, tider=(1, 1, 0.25, 0.5, 0.75)):
    """Trekker et annonsert aksjebytte: k aksjer i målet byttes i m aksjer i kjøperen.
       Kursene etter kunngjøringen gir en sannsynlighet mellom 0.4 og 0.92."""
    A_n, T_n = r.choice(PAR)
    k, m = r.choice([(5, 1), (4, 1), (3, 2), (4, 3), (2, 1), (1, 2), (2, 5), (3, 1)])
    PA0 = r.choice([40, 48, 60, 72, 84, 96, 110, 120])
    prem = r.choice([0.15, 0.2, 0.25, 0.3, 0.35])
    PT0 = round(m * PA0 / k / (1 + prem))
    if PT0 < 8:
        raise Avvis("for lav kurs")
    sf = m * PA0 - k * PT0
    if sf <= 0:
        raise Avvis("ingen premie")
    T = r.choice(tider)
    rf = r.choice([0.03, 0.04, 0.05, 0.06])
    g = (1 + rf) ** T
    PA1 = PA0 - r.choice([-2, 1, 2, 3, 4, 5, 6])
    p_mal = r.choice([0.5, 0.6, 0.7, 0.75, 0.8, 0.85])
    PT1 = (m * PA1 - (1 - p_mal) * sf / g) / k
    PT1 = round(PT1 * 2) / 2
    if PT1 <= PT0:
        raise Avvis("målet steg ikke")
    if m * PA1 - k * PT1 <= 0:
        raise Avvis("målet over budverdien")
    cost = k * PT1
    dep = m * PA1
    suk = dep * g
    brudd = dep * g + k * PT0 - m * PA0
    p = (cost * g - brudd) / (suk - brudd)
    if not 0.4 <= p <= 0.92:
        raise Avvis("p utenfor området")
    return dict(A=A_n, T=T_n, k=k, m=m, PA0=PA0, PT0=PT0, PA1=PA1, PT1=PT1, Tt=T, rf=rf, g=g, cost=cost, dep=dep,
                suk=suk, brudd=brudd, p=p, sf=sf)


def _avtale_q(d):
    a, t = _k(d["A"]), _k(d["T"])
    bytte = (f"{d['k']} {t} share{'s' if d['k'] > 1 else ''} will be exchanged for {d['m']} {a} "
             f"share{'s' if d['m'] > 1 else ''}")
    return (f"<p>{d['A']} has announced a bid for {d['T']}. The news came as a surprise. The deal will complete or fail "
            f"{TID[d['Tt']]}. If it completes, {bytte}. If it fails, both prices return to their pre-announcement "
            f"levels. Before the announcement {a} traded at {talla(d['PA0'])} and {t} at {talla(d['PT0'])}. Immediately "
            f"after it, {a} trades at {talla(d['PA1'])} and {t} at {talla(d['PT1'])}. The risk-free rate is "
            f"{_p(d['rf'], 0)} a year.</p>")


def _gtekst(d):
    if d["Tt"] == 1:
        return f"1 + r<sub>f</sub> = {tall(d['g'], 2)}"
    return f"(1 + r<sub>f</sub>)<sup>T</sup> = {tall(1 + d['rf'], 2)}<sup>{tall(d['Tt'], 2)}</sup> = {tall(d['g'], 6)}"


def _posisjon(d):
    a, t = _k(d["A"]), _k(d["T"])
    return (f"<p><b>Step 1: the position.</b> Buy {d['k']} {t} for {d['k']} × {talla(d['PT1'])} = {tall(d['cost'], 2)}. "
            f"Short {d['m']} {a} for {d['m']} × {talla(d['PA1'])} = {tall(d['dep'], 2)} and deposit it at the risk-free "
            f"rate. Growth factor: {_gtekst(d)}.</p>"
            f"<p><b>Step 2: the payoffs.</b> Completes: the {t} shares become the {a} shares you owe, leaving the "
            f"deposit, {tall(d['dep'], 2)} × {tall(d['g'], 6)} = {tall(d['suk'], 4)}. Fails: sell {d['k']} {t} at "
            f"{talla(d['PT0'])} and buy back {d['m']} {a} at {talla(d['PA0'])}: {tall(d['suk'], 4)} + "
            f"{tall(d['k'] * d['PT0'], 2)} − {tall(d['m'] * d['PA0'], 2)} = {tall(d['brudd'], 4)}.</p>")


# ---------------------------------------------------------------------------
# ma-prb1 · Markedets sannsynlighet for at avtalen gjennomføres
# ---------------------------------------------------------------------------
@familie("ma-prb1", tema="ma", antall=6, tittel="The market's probability that the deal completes",
         hjelp=hjelp3(
             "This is the market's probability that a deal completes, read from prices with a long-short position in "
             "the two shares. You need that probability.",
             "Buy the target shares, short the acquirer shares they convert into and invest the proceeds at "
             "r<sub>f</sub>. cost × (1 + r<sub>f</sub>)<sup>T</sup> = p × payoff(completes) + (1 − p) × payoff(fails), "
             "with T in years.",
             "<p><b>Step 1: the position and its cost</b> at today's prices.</p>"
             "<p><b>Step 2: the payoffs.</b> If the deal completes the two share legs cancel and the deposit is left. "
             "If it fails, close both legs at the pre-announcement prices.</p>"
             "<p><b>Step 3: the certainty equivalent.</b> Grow the cost at r<sub>f</sub> over the time to completion.</p>"
             "<p><b>Step 4: solve for p.</b></p>"
             "<p><b>Watch out:</b> setting the expected payoff equal to the cost itself is the error the exam key names. "
             "Three months is a quarter of a year.</p>",
         ))
def _(r):
    d = _avtale(r)
    p, g, suk, brudd, cost = d["p"], d["g"], d["suk"], d["brudd"], d["cost"]
    f_kost = (cost - brudd) / (suk - brudd)
    suk2, brudd2 = d["dep"], d["dep"] + d["k"] * d["PT0"] - d["m"] * d["PA0"]
    f_dep = (cost * g - brudd2) / (suk2 - brudd2)
    feller = [(f_kost, f"The expected payoff set equal to the cost, {tall(cost, 2)}, not to the cost grown at "
                       f"r<sub>f</sub>. The money tied up in the position must earn the risk-free rate too: this is the "
                       f"error the exam key singles out."),
              (f_dep, "The short-sale proceeds left uninvested, while the cost was grown at r<sub>f</sub>. The deposit "
                      "earns the risk-free rate as well, in both outcomes.")]
    tredje = []
    if d["Tt"] != 1:
        g1 = 1 + d["rf"]
        suk1, brudd1 = d["dep"] * g1, d["dep"] * g1 + d["k"] * d["PT0"] - d["m"] * d["PA0"]
        f_1 = (cost * g1 - brudd1) / (suk1 - brudd1)
        tredje.append((f_1, f"A full year of interest. The deal resolves in {TID[d['Tt']][11:]}, so T = "
                            f"{tall(d['Tt'], 2)} and the growth factor is (1 + r<sub>f</sub>)<sup>T</sup>."))
    tredje.append((1 - p, "This is the probability that the deal fails. The position pays more when the deal "
                          "completes, so solve for the weight on that payoff."))
    valgt = None
    for kand in tredje:
        try:
            ulike(p, f_kost, f_dep, kand[0], rel=0.02)
            valgt = kand
            break
        except Avvis:
            continue
    if valgt is None:
        raise Avvis("ingen tredje felle")
    for v, _t in feller + [valgt]:
        if not 0 < v < 1:
            raise Avvis("felle utenfor [0, 1]")
    q = _avtale_q(d) + ("<p>Using the long-short strategy, with the short-sale proceeds invested at the risk-free rate, "
                        "what probability does the market assign to the deal completing? Give four decimals.</p>")
    alt = [R(tall(p, 4), p)] + [F(tall(v, 4), t, v) for v, t in feller + [valgt]]
    ce = cost * g
    kort = (f"<p><b>{tall(p, 4)}.</b> Cost {tall(cost, 2)} grows to {tall(ce, 4)}. Payoffs {tall(suk, 4)} (completes) "
            f"and {tall(brudd, 4)} (fails). p = ({tall(ce, 4)} − {tall(brudd, 4)})/({tall(suk, 4)} − "
            f"{tall(brudd, 4)}) = {tall(p, 4)}.</p>")
    sf_naa = d["dep"] - cost
    full = (
        f"<p><b>Why this works.</b> Once the deal completes, the target shares turn into exactly the acquirer shares you "
        f"are short, so the only risk left in the position is whether the deal happens. That risk is unrelated to the "
        f"market and carries no premium. The position must therefore earn the risk-free rate in expectation. The p "
        f"that makes it do so is the market's own forecast.</p>"
        + _posisjon(d) +
        f"<p><b>Step 3: the certainty equivalent.</b> {tall(cost, 2)} × {tall(g, 6)} = {tall(ce, 4)}.</p>"
        f"<p><b>Step 4: solve.</b> {tall(ce, 4)} = p × {tall(suk, 4)} + (1 − p) × {tall(brudd, 4)}, so p = "
        f"{tall(ce - brudd, 4)}/{tall(suk - brudd, 4)} = <b>{tall(p, 4)}</b>.</p>"
        f"<p><b>First check, the spread.</b> Short the target and hold the acquirer shares instead: worth "
        f"{tall(sf_naa, 2)} today, 0 if the deal completes and {tall(d['sf'], 2)} if it fails. So 1 − p = "
        f"{tall(sf_naa, 2)} × {tall(g, 6)}/{tall(d['sf'], 2)} = {tall(sf_naa * g / d['sf'], 4)} ✓. It is the same "
        f"position without the deposit, so it catches arithmetic, not a wrong set-up.</p>"
        f"<p><b>Remember:</b> cost × (1 + r<sub>f</sub>)<sup>T</sup> = expected payoff, with pre-announcement prices in "
        f"the failure branch.</p>"
    )
    return sporsmal(q, alt, kort, full, tall=tallsvar())


# ---------------------------------------------------------------------------
# ma-arb1 · Fusjonsarbitrasje: utbetaling ved brudd og avkastning ved suksess
# ---------------------------------------------------------------------------
HJ_ARB = {
    "brudd": hjelp3(
        "This is the merger arbitrage position. You need its payoff if the deal fails and prices return to where they "
        "were.",
        "Payoff if the deal fails = deposit × (1 + r<sub>f</sub>)<sup>T</sup> + target shares × old target price − "
        "acquirer shares × old acquirer price.",
        "<p><b>Step 1: the deposit.</b> The short-sale proceeds grow at r<sub>f</sub> until the deal resolves.</p>"
        "<p><b>Step 2: close the long leg.</b> Sell the target shares at the price they return to.</p>"
        "<p><b>Step 3: close the short leg.</b> Buy back the acquirer shares at the price they return to.</p>"
        "<p><b>Watch out:</b> on failure the prices revert, so today's prices are not the ones you trade at.</p>"),
    "ret": hjelp3(
        "This is the merger arbitrage position. You need its return if the deal completes, which is what the "
        "arbitrageur earns for carrying the deal risk.",
        "Payoff if the deal completes = deposit × (1 + r<sub>f</sub>)<sup>T</sup>. Return = payoff / cost of the "
        "target shares − 1.",
        "<p><b>Step 1: the cost.</b> What you pay today for the target shares.</p>"
        "<p><b>Step 2: the payoff if the deal completes.</b> The share legs cancel. The grown deposit is left.</p>"
        "<p><b>Step 3: the return</b> over the period to completion, not a yearly rate.</p>"
        "<p><b>Watch out:</b> this is not the premium offered to the target's owners. You buy at today's price.</p>"),
}


@familie("ma-arb1", tema="ma", antall=5, tittel="Merger arbitrage: the payoff if the deal fails, the return if it "
                                                "completes", hjelp=HJ_ARB["brudd"])
def _(r):
    d = _avtale(r)
    typ = r.choice(["brudd", "ret"])
    a, t = _k(d["A"]), _k(d["T"])
    pos = (f"<p>A merger arbitrageur buys {d['k']} {t} share{'s' if d['k'] > 1 else ''}, shorts {d['m']} {a} "
           f"share{'s' if d['m'] > 1 else ''} at today's prices and deposits the short-sale proceeds at the risk-free "
           f"rate. ")
    if typ == "brudd":
        R_ = d["brudd"]
        f1 = d["dep"] + d["k"] * d["PT0"] - d["m"] * d["PA0"]
        f2 = d["dep"] * d["g"] + d["k"] * d["PT1"] - d["m"] * d["PA1"]
        f3 = d["dep"] * d["g"] - d["m"] * d["PA0"]
        ulike(R_, f1, f2, f3, rel=0.02)
        q = _avtale_q(d) + pos + "What is the position's payoff if the deal fails? Give four decimals.</p>"
        alt = [R(tall(R_, 4), R_),
               F(tall(f1, 4), "The deposit without interest. The short-sale proceeds sit at the risk-free rate until "
                              "the deal resolves.", f1),
               F(tall(f2, 4), f"Both legs closed at today's prices, {talla(d['PT1'])} and {talla(d['PA1'])}. If the deal "
                              f"fails, prices return to where they were before the announcement.", f2),
               F(tall(f3, 4), f"The {t} shares forgotten. You still own them and sell them at {talla(d['PT0'])}.", f3)]
        kort = (f"<p><b>{tall(R_, 4)}.</b> Deposit {tall(d['dep'], 2)} × {tall(d['g'], 6)} = {tall(d['suk'], 4)}, plus "
                f"{d['k']} × {talla(d['PT0'])}, minus {d['m']} × {talla(d['PA0'])}: {tall(R_, 4)}.</p>")
        tall_ut = tallsvar()
        slutt = (f"<p><b>Step 3: the payoff if it fails.</b> <b>{tall(R_, 4)}</b>. You paid {tall(d['cost'], 2)} for "
                 f"the position, so a failed deal costs the arbitrageur money. That loss is what the target's sellers "
                 f"insure themselves against.</p>")
    else:
        R_ = d["suk"] / d["cost"] - 1
        f1 = d["dep"] / d["cost"] - 1
        f2 = d["m"] * d["PA0"] / (d["k"] * d["PT0"]) - 1
        f3 = d["suk"] / (d["k"] * d["PT0"]) - 1
        ulike(R_, f1, f2, f3, rel=0.02)
        if R_ < 0.01:
            raise Avvis("for liten avkastning")
        q = _avtale_q(d) + pos + ("What is the return on the arbitrageur's money if the deal completes, in per cent over "
                                  "the period to completion?</p>")
        alt = [R(_p(R_), R_),
               F(_p(f1), "The deposit without interest. The short-sale proceeds earn the risk-free rate until the deal "
                         "completes.", f1),
               F(_p(f2), f"This is the premium offered to {gen(t)} owners at the pre-announcement prices. The "
                         f"arbitrageur buys today, after much of the premium is in the price.", f2),
               F(_p(f3), f"The return measured from the old target price, {talla(d['PT0'])}. The arbitrageur pays "
                         f"today's price, {talla(d['PT1'])}.", f3)]
        kort = (f"<p><b>{_p(R_)}.</b> Completes: {tall(d['dep'], 2)} × {tall(d['g'], 6)} = {tall(d['suk'], 4)} "
                f"against a cost of {tall(d['cost'], 2)}: {tall(d['suk'], 4)}/{tall(d['cost'], 2)} − 1 = "
                f"{_p(R_)}.</p>")
        tall_ut = tallsvar(skala=100, enhet="%")
        slutt = (f"<p><b>Step 3: the return if it completes.</b> {tall(d['suk'], 4)}/{tall(d['cost'], 2)} − 1 = "
                 f"<b>{_p(R_)}</b>, well above the risk-free return of {_p(d['g'] - 1)} over the same period. The "
                 f"excess is the insurance premium: if the deal fails the arbitrageur gets {tall(d['brudd'], 4)} and "
                 f"loses.</p>")
    full = (
        f"<p><b>What merger arbitrage is.</b> After a stock deal is announced, the target trades below the value of "
        f"the shares it will be exchanged for. The arbitrageur buys the target and shorts the acquirer in the exchange "
        f"ratio. If the deal completes the legs cancel and he keeps the spread. If it fails he loses. Holders who fear "
        f"a collapse sell the target to him: the spread is the price of that insurance. Historically the strategy has "
        f"been profitable (Mitchell and Pulvino, 2001). Arbitrageurs spread their risk over many deals.</p>"
        + _posisjon(d) + slutt +
        f"<p><b>Remember:</b> the deposit earns r<sub>f</sub> in both outcomes. On failure both legs close at the "
        f"pre-announcement prices.</p>"
    )
    return sporsmal(q, alt, kort, full, hjelp=HJ_ARB[typ], tall=tall_ut)


# ---------------------------------------------------------------------------
# ma-syn1 · Implisitte synergier
# ---------------------------------------------------------------------------
HJ_SYN = {
    "sikker": hjelp3(
        "This is reading the market's estimate of the synergies from the price reaction to a deal everyone expects "
        "to complete.",
        "S<sub>implied</sub> = change in the combined market value = N<sub>A</sub>ΔP<sub>A</sub> + "
        "N<sub>T</sub>ΔP<sub>T</sub>, for cash or for shares.",
        "<p><b>Step 1: the acquirer's change in value.</b> Shares times the price change, with its sign.</p>"
        "<p><b>Step 2: the target's change in value.</b> The same.</p>"
        "<p><b>Step 3: add them.</b> The premium is a transfer between the two and cancels. What is left is the "
        "value the deal creates.</p>"),
    "manne": hjelp3(
        "This is the Mannesmann-Vodafone question: the synergies the market prices in once you know its probability "
        "that the deal completes.",
        "P<sub>A,today</sub> × (1 + r<sub>f</sub>)<sup>T</sup> = p × P<sub>A,completes</sub> + (1 − p) × "
        "P<sub>A,fails</sub>. S = (N<sub>A</sub> + x) × P<sub>A,completes</sub> − (A + T), with stand-alone values at "
        "the failure prices.",
        "<p><b>Step 1: the acquirer's price if the deal completes.</b> Solve the pricing equation for it.</p>"
        "<p><b>Step 2: the merged firm.</b> All shares after the deal times that price.</p>"
        "<p><b>Step 3: subtract the stand-alone values</b> at the prices the shares return to if the deal fails.</p>"
        "<p><b>Watch out:</b> grow today's price at r<sub>f</sub> before you solve. Post-announcement values double "
        "count the synergies.</p>"),
}


@familie("ma-syn1", tema="ma", antall=6, tittel="The synergies the market prices in", hjelp=HJ_SYN["sikker"])
def _(r):
    A_n, T_n = r.choice(PAR)
    a, t = _k(A_n), _k(T_n)
    typ = "manne" if r.random() < 0.45 else "sikker"
    NA = r.choice([20, 30, 40, 50, 60])
    NT = r.choice([10, 12, 15, 20, 25])
    if typ == "sikker":
        PA0 = r.choice([60, 80, 100, 120, 150])
        PT0 = r.choice([20, 25, 30, 40, 50])
        Po = PT0 + r.choice([5, 6, 8, 10, 12])
        dA = r.choice([-3, -2, -1.5, -1, 1, 2])
        PA1 = PA0 + dA
        S = NA * dA + NT * (Po - PT0)
        f1 = NT * (Po - PT0)
        f2 = NA * dA
        f3 = NT * (Po - PT0) - NA * dA
        if abs(S) < 5:
            raise Avvis("for nær null")
        ulike(S, f1, f2, f3, rel=0.02)
        q = (f"<p>{A_n} ({NA} million shares) announces a cash offer of NOK {Po} per share for {T_n} ({NT} million "
             f"shares). The market regards the deal as certain to complete. {_k(T_n)} rises from NOK {PT0} to the offer "
             f"price and {a} moves from NOK {PA0} to NOK {talla(PA1)}. Before the announcement no deal was "
             f"expected.</p><p>What present value of synergies does the market price in, in NOK million?</p>")
        alt = [R(_nok(S), S),
               F(_nok(f1), f"The target's gain only, {NT} × ({Po} − {PT0}). That is the premium, which {a} pays. The "
                           f"acquirer's change in value belongs in the total.", f1),
               F(_nok(f2), f"The acquirer's change only, {NA} × ({talla(PA1)} − {PA0}). The target's owners gain too. "
                           f"The synergies are the gain to both.", f2),
               F(_nok(f3), "The acquirer's change in value subtracted instead of added. Add the two changes with their "
                           "signs.", f3)]
        tall_ut = tallsvar(enhet="NOK million", rel=0.001, abs=0.01)
        kort = (f"<p><b>{_nok(S)}.</b> Acquirer {NA} × ({talla(PA1)} − {PA0}) = {tall(NA * dA, 2)}. Target {NT} × ({Po} "
                f"− {PT0}) = {tall(f1, 2)}. Sum {tall(S, 2)}.</p>")
        midt = (f"<p><b>Step 1: the acquirer.</b> {NA} × ({talla(PA1)} − {PA0}) = {tall(NA * dA, 2)}. That is "
                f"NPV<sub>A</sub> = S − premium.</p>"
                f"<p><b>Step 2: the target.</b> {NT} × ({Po} − {PT0}) = {tall(f1, 2)}, the premium.</p>"
                f"<p><b>Step 3: the synergies.</b> {tall(NA * dA, 2)} + {tall(f1, 2)} = <b>{tall(S, 2)}</b>. The premium "
                f"cancels: it leaves the acquirer and arrives at the target.</p>"
                f"<p><b>Caveats.</b> If the deal might fail, prices hold only part of the gain and the estimate is too "
                f"low. If the bid revealed good news about the target's own value, it is too high.</p>")
    else:
        PA0 = r.choice([20, 30, 40, 50])
        ER = r.choice([2, 2.5, 3, 4])
        PT0 = round(ER * PA0 / (1 + r.choice([0.15, 0.2, 0.25, 0.3])))
        PA1 = PA0 - r.choice([1, 2, 0.5, 1.5])
        if PA1 <= 0:
            raise Avvis("negativ kurs")
        p_mal = r.choice([0.6, 0.7, 0.75, 0.8])
        Tt = r.choice([0.25, 0.5, 1])
        rf = r.choice([0.04, 0.05, 0.06])
        g = (1 + rf) ** Tt
        sf = ER * PA0 - PT0
        PT1 = rund(ER * PA1 - (1 - p_mal) * sf / g, 2)      # målets kurs i dag, i tråd med p
        if PT1 <= PT0:
            raise Avvis("målet steg ikke")
        p = rund(1 - (ER * PA1 - PT1) * g / sf, 4)          # p med fire desimaler, som oppgitt
        As = (PA1 * g - (1 - p) * PA0) / p
        x = ER * NT
        alone = NA * PA0 + NT * PT0
        S = (NA + x) * As - alone
        As_ng = (PA1 - (1 - p) * PA0) / p
        f2 = (NA + x) * As_ng - alone
        f3 = (NA + x) * As - (NA * PA1 + NT * PT1)
        dV = NA * (PA1 - PA0) + NT * (PT1 - PT0)              # endringen i samlet markedsverdi
        f4 = dV * g / p                                        # ΔV skalert med (1 + r_f)^T/p
        S2 = ((NA * PA1 + NT * PT1) * g - alone) / p           # samme svar via begge aksjene
        if abs(S2 - S) > 0.05:
            raise Avvis("den andre veien treffer ikke på avrunding")
        if S <= 5:
            raise Avvis("synergiene er ikke positive")
        ulike(S, f2, f3, f4, rel=0.02)
        q = (f"<p>{A_n} ({NA} million shares) has bid for {T_n} ({NT} million shares): {talla(ER)} {a} shares for each "
             f"{t} share. The deal will complete or fail {TID[Tt]}; if it fails, both prices return to their "
             f"pre-announcement levels. Before the announcement {a} traded at {PA0} and {t} at {PT0}. Now {a} trades at "
             f"{talla(PA1)} and {t} at {talla(PT1)}. The risk-free rate is {_p(rf, 0)} a year. From the long-short "
             f"strategy, the market's probability that the deal completes is {tall(p, 4)}.</p>"
             f"<p>Value the synergies as in the lecture's Mannesmann example: find {gen(a)} price if the deal "
             f"completes, P<sub>c</sub>, from {gen(a)} price today × (1 + r<sub>f</sub>)<sup>T</sup> = p × "
             f"P<sub>c</sub> + (1 − p) × {PA0}. The synergies are the merged firm's value at P<sub>c</sub> minus the "
             f"stand-alone values, taken at the prices the shares return to if the deal fails. What synergies, in NOK "
             f"million and valued at the completion date, does the market price in?</p>")
        alt = [R(_nok(S), S),
               F(_nok(f4), f"The change in combined market value, {tall(dV, 2)}, grown at r<sub>f</sub> and divided by "
                           f"p. That reads the synergies from the price reaction, but it lets the stand-alone values "
                           f"grow at r<sub>f</sub> until completion as well. The question fixes them at the prices the "
                           f"shares return to if the deal fails.", f4),
               F(_nok(f2), "Today's price not grown at the risk-free rate before solving. The mix of the two outcomes "
                           "is a price at the completion date, so grow today's price to that date first.", f2),
               F(_nok(f3), f"The stand-alone values taken at today's prices. Those already contain part of the "
                           f"synergies, so the gain is double counted. Use the prices the shares return to if the deal "
                           f"fails.", f3)]
        tall_ut = tallsvar(enhet="NOK million")
        kort = (f"<p><b>{_nok(S)}.</b> {talla(PA1)} × {tall(g, 6)} = {tall(p, 4)} × P<sub>c</sub> + {tall(1 - p, 4)} × "
                f"{PA0} gives P<sub>c</sub> = {tall(As, 4)}. ({NA} + {tall(x, 2)}) × {tall(As, 4)} − {tall(alone, 2)} = "
                f"{tall(S, 2)}.</p>")
        midt = (f"<p><b>Step 1: {gen(a)} price if the deal completes.</b> Growth factor {_gtekst(dict(Tt=Tt, rf=rf, g=g))}. "
                f"{talla(PA1)} × {tall(g, 6)} = {tall(PA1 * g, 4)} = {tall(p, 4)} × P<sub>c</sub> + {tall(1 - p, 4)} × "
                f"{PA0}, so P<sub>c</sub> = ({tall(PA1 * g, 4)} − {tall((1 - p) * PA0, 4)})/{tall(p, 4)} = "
                f"{tall(As, 4)}.</p>"
                f"<p><b>Step 2: the merged firm.</b> x = {talla(ER)} × {NT} = {tall(x, 2)} million new shares, so "
                f"{tall(NA + x, 2)} million in all: {tall(NA + x, 2)} × {tall(As, 4)} = {tall((NA + x) * As, 2)}.</p>"
                f"<p><b>Step 3: the stand-alone values.</b> {NA} × {PA0} + {NT} × {PT0} = {tall(alone, 2)}, the values "
                f"the shares return to if the deal fails. S = {tall((NA + x) * As, 2)} − {tall(alone, 2)} = "
                f"<b>{tall(S, 2)}</b>.</p>"
                f"<p><b>First check, both shares at once.</b> Today's combined value grown to completion is a mix of the "
                f"two outcomes too: ({NA} × {talla(PA1)} + {NT} × {talla(PT1)}) × {tall(g, 6)} = "
                f"{tall((NA * PA1 + NT * PT1) * g, 2)} = p × (merged value) + (1 − p) × {tall(alone, 2)}. So S = "
                f"({tall((NA * PA1 + NT * PT1) * g, 2)} − {tall(alone, 2)})/{tall(p, 4)} = {tall(S2, 2)} ✓, equal up "
                f"to rounding. It also uses {gen(t)} price, so it catches a slip in step 1. Note the difference from "
                f"simply dividing the price reaction by p: there the stand-alone values would grow at r<sub>f</sub> "
                f"too.</p>"
                f"<p><b>Read it.</b> P<sub>c</sub> = {tall(As, 4)} "
                + ("is below" if As < PA0 else "is above") + f" {gen(a)} old price of {PA0}: the deal "
                + ("destroys" if As < PA0 else "creates") + f" value for {gen(a)} owners, even though the total is "
                f"positive. {gen(t)} owners take "
                + ("more than all of it." if As < PA0 else "a share of it.") + "</p>")
    full = (
        f"<p><b>The market's view of the synergies.</b> A deal creates value when the merged firm is worth more than the "
        f"two firms apart. Prices tell you how much the market thinks that is: the premium only moves value between "
        f"the two sets of owners, so the combined change is the synergy.</p>"
        + midt +
        f"<p><b>Remember:</b> synergies are the gain to both sides together, measured from stand-alone values, not "
        f"from prices that already contain the deal.</p>"
    )
    return sporsmal(q, alt, kort, full, hjelp=HJ_SYN[typ], tall=tall_ut)


# ---------------------------------------------------------------------------
# ma-coi1 · Coinsurance: overføringen fra aksjonærene til kreditorene
# ---------------------------------------------------------------------------
@familie("ma-coi1", tema="ma", antall=5, tittel="Coinsurance: what a merger without synergies does to equity",
         hjelp=hjelp3(
             "This is the coinsurance effect. Two firms with risky debt merge without synergies. You need what the "
             "merger does to the value of their equity.",
             "Equity = max(V − D, 0) state by state, debt = min(V, D). Take the max in each state before you weight "
             "by the probabilities. The merged firm has the sum of the values and the sum of the debts.",
             "<p><b>Step 1: each firm alone.</b> In each state, find what the creditors and the shareholders get. "
             "Weight by the probabilities.</p>"
             "<p><b>Step 2: the merged firm.</b> Add the values state by state and do the same.</p>"
             "<p><b>Step 3: compare the equity.</b> Total value does not change, so the shareholders' loss is the "
             "creditors' gain.</p>"
             "<p><b>Watch out:</b> working with expected values before the max hides the default and the "
             "transfer.</p>",
         ))
def _(r):
    q1 = r.choice([0.5, 0.5, 0.4, 0.6])
    VA1, VA2 = r.choice([80, 90, 100, 120]), r.choice([10, 20, 30])
    VB1, VB2 = r.choice([10, 15, 20, 30]), r.choice([40, 50, 60, 80])
    DA, DB = r.choice([30, 40, 50]), r.choice([20, 25, 30, 35])
    if not (VA2 < DA < VA1 and VB1 < DB < VB2):
        raise Avvis("hvert firma må misligholde i én tilstand")
    if not (VA1 + VB1 >= DA + DB and VA2 + VB2 >= DA + DB):
        raise Avvis("den sammenslåtte gjelden skal være sikker")
    q2 = 1 - q1

    def ek(v1, v2, d):
        return q1 * max(v1 - d, 0) + q2 * max(v2 - d, 0)

    def gj(v1, v2, d):
        return q1 * min(v1, d) + q2 * min(v2, d)
    EA, EB = ek(VA1, VA2, DA), ek(VB1, VB2, DB)
    DAv, DBv = gj(VA1, VA2, DA), gj(VB1, VB2, DB)
    EAB = ek(VA1 + VB1, VA2 + VB2, DA + DB)
    dE = EAB - EA - EB
    f_null = 0.0
    f_sign = -dE
    f_uv = -((DA - VA2) + (DB - VB1))
    ulike(dE, f_sign, f_uv, rel=0.02)
    if abs(dE) < 1:
        raise Avvis("for liten overføring")

    tab = (f"<table class=\"data\"><tr><th></th><th>State 1</th><th>State 2</th><th>Debt (face value)</th></tr>"
           f"<tr><td>Probability</td><td>{tall(q1, 2)}</td><td>{tall(q2, 2)}</td><td></td></tr>"
           f"<tr><td>Firm A</td><td>{VA1}</td><td>{VA2}</td><td>{DA}</td></tr>"
           f"<tr><td>Firm B</td><td>{VB1}</td><td>{VB2}</td><td>{DB}</td></tr></table>")
    q = (f"<p>Two firms, A and B, will be worth the amounts below next year, depending on the state. Each has zero-coupon "
         f"debt with the face value shown, due next year. They merge into AB, which takes over both debts; there are "
         f"no synergies. Everyone is risk neutral and there is no discounting. Figures in NOK million.</p>{tab}"
         f"<p>By how much does the merger change the total value of the shareholders' equity, in NOK million?</p>")
    alt = [R(_nok(dE), dE),
           F(_nok(f_null), "No change found because the equity was valued from expected values, E[V] − D. Equity is "
                           "max(V − D, 0) in each state. Each firm defaults in one state on its own.", f_null),
           F(_nok(f_sign), "This is the creditors' gain. With no synergies the total value is unchanged, so the "
                           "shareholders' change has the opposite sign.", f_sign),
           F(_nok(f_uv), f"The two shortfalls, {DA} − {VA2} and {DB} − {VB1}, added without weighting by the "
                         f"probabilities of the states in which they occur.", f_uv)]
    kort = (f"<p><b>{_nok(dE)}.</b> Before: E<sub>A</sub> = {tall(EA, 2)}, E<sub>B</sub> = {tall(EB, 2)}. After: the "
            f"merged debt of {DA + DB} is safe and E<sub>AB</sub> = {tall(EAB, 2)}. Change {tall(dE, 2)}, the creditors' "
            f"gain with the sign reversed.</p>")
    full = (
        f"<p><b>What coinsurance is.</b> When two firms whose cash flows are not perfectly correlated merge, one firm's "
        f"good state covers the other's bad one. The merged firm defaults less, so its debt is safer and worth more. "
        f"With no synergies the total value is unchanged, so the creditors' gain is the shareholders' loss. Equity is "
        f"a call on the firm's assets. Lower risk makes the call worth less.</p>"
        f"<p><b>Step 1: A alone.</b> State 1: creditors {min(VA1, DA)}, equity {max(VA1 - DA, 0)}. State 2: creditors "
        f"{min(VA2, DA)}, equity {max(VA2 - DA, 0)}. E<sub>A</sub> = {tall(EA, 2)}, D<sub>A</sub> = {tall(DAv, 2)}.</p>"
        f"<p><b>Step 2: B alone.</b> State 1: creditors {min(VB1, DB)}, equity {max(VB1 - DB, 0)}. State 2: creditors "
        f"{min(VB2, DB)}, equity {max(VB2 - DB, 0)}. E<sub>B</sub> = {tall(EB, 2)}, D<sub>B</sub> = {tall(DBv, 2)}.</p>"
        f"<p><b>Step 3: AB.</b> Values {VA1 + VB1} and {VA2 + VB2} against debt of {DA + DB}: the debt is paid in "
        f"full in both states, worth {DA + DB}. E<sub>AB</sub> = {tall(EAB, 2)}.</p>"
        f"<p><b>Step 4: the change.</b> {tall(EAB, 2)} − {tall(EA, 2)} − {tall(EB, 2)} = <b>{tall(dE, 2)}</b>.</p>"
        f"<p><b>Check 4.</b> Creditors gain {DA + DB} − {tall(DAv, 2)} − {tall(DBv, 2)} = "
        f"{tall(DA + DB - DAv - DBv, 2)}, exactly the shareholders' loss, because total value is fixed. The debt and "
        f"equity values were computed separately, so this check can catch a slip.</p>"
        f"<p><b>Remember:</b> a merger without synergies that lowers risk moves value from shareholders to creditors. "
        f"Diversification is no reason to merge: shareholders can diversify themselves.</p>"
    )
    return sporsmal(q, alt, kort, full, tall=tallsvar(enhet="NOK million", rel=0.001, abs=0.01))


# ---------------------------------------------------------------------------
# ma-bid1 · Budgivning etter alternativer
# ---------------------------------------------------------------------------
BANKER = [("Nordbank", "Vestbank", "Sørbank", "Østbank"), ("Fjellsparebank", "Kystbanken", "Dalbanken", "Elvebanken"),
          ("Havbank", "Skogbank", "Myrbank", "Bergbank")]


@familie("ma-bid1", tema="ma", antall=5, tittel="Bidding depends on the alternatives",
         hjelp=hjelp3(
             "This is bidding when rivals are also bidding. You need the most a bidder should pay, given what happens "
             "to it if it stops.",
             "Reservation price = value to the bidder if it wins (before paying) − value to the bidder if the rival "
             "that would otherwise win buys the target.",
             "<p><b>Step 1: the value if you win.</b> Read it from the table, before the price is paid.</p>"
             "<p><b>Step 2: the alternative.</b> If you stop, someone else buys the target. Find your value in that "
             "case.</p>"
             "<p><b>Step 3: the difference</b> is the most you should pay.</p>"
             "<p><b>Watch out:</b> the alternative is not the status quo when a rival will buy anyway.</p>",
         ))
def _(r):
    X, Y, Z, Mal = r.choice(BANKER)
    d = r.choice([40, 50, 60])
    a = {X: r.choice([100, 110, 120, 130]), Y: r.choice([80, 90, 95]), Z: r.choice([60, 70, 75])}
    s = {b: r.choice([20, 25, 30, 40]) for b in (X, Y, Z)}
    tap = {b: {v: r.choice([5, 10, 15, 20, 25]) for v in (X, Y, Z) if v != b} for b in (X, Y, Z)}

    def verdi(b, vinner):
        return a[b] + d + s[b] if b == vinner else a[b] - tap[b][vinner]
    res = verdi(X, X) - verdi(X, Y)
    f_status = verdi(X, X) - a[X]
    f_feil = verdi(X, X) - verdi(X, Z)
    f_syn = s[X]
    ulike(res, f_status, f_feil, f_syn, rel=0.02)
    rader = "".join(f"<tr><td>{b}</td><td>{a[b]}</td>" + "".join(f"<td>{verdi(b, v)}</td>" for v in (X, Y, Z)) + "</tr>"
                    for b in (X, Y, Z))
    tab = (f"<table class=\"data\"><tr><th>Value of</th><th>Alone</th><th>If {X} buys {Mal}</th>"
           f"<th>If {Y} buys {Mal}</th><th>If {Z} buys {Mal}</th></tr>{rader}</table>")
    q = (f"<p>{X}, {Y} and {Z} are bidding for {Mal}, which is worth {d} on its own. The table gives each bidder's value "
         f"in each outcome, before any price is paid. The winner's value includes {Mal}. A rival's purchase hurts the "
         f"others through competition.</p>{tab}"
         f"<p>{Z} has dropped out. If {X} stops bidding, {Y} buys {Mal}. What is the most {X} should bid?</p>")
    alt = [R(tall(res), res),
           F(tall(f_status), f"Measured against {gen(X)} value alone, {a[X]}. That is the alternative only if nobody "
                             f"buys {Mal}. Here {Y} buys it if {X} stops, which leaves {X} worse off than alone.",
             f_status),
           F(tall(f_feil), f"Measured against {Z} winning. {Z} has dropped out: if {X} stops, {Y} is the buyer.", f_feil),
           F(tall(f_syn), f"Only the synergy {X} gets with {Mal}. {X} also pays for the target's own value and for "
                          f"keeping {Y} from winning.", f_syn)]
    kort = (f"<p><b>{tall(res)}.</b> If {X} wins it is worth {verdi(X, X)}. If {Y} wins, {X} is worth {verdi(X, Y)}. "
            f"{verdi(X, X)} − {verdi(X, Y)} = {res}.</p>")
    full = (
        f"<p><b>Bidding depends on the alternatives.</b> What a bidder should pay is the difference between its value if "
        f"it wins and its value if it does not. When a rival will buy the target anyway, losing is worse than the "
        f"status quo, because the rival grows stronger. Fear of a rival winning drives prices up (lecture 12).</p>"
        f"<p><b>Step 1: the value if {X} wins.</b> {verdi(X, X)}, before paying: its own {a[X]}, the target's {d} and "
        f"the synergy {s[X]}.</p>"
        f"<p><b>Step 2: the alternative.</b> If {X} stops, {Y} buys {Mal} and {X} is worth {verdi(X, Y)}, {tap[X][Y]} "
        f"less than alone.</p>"
        f"<p><b>Step 3: the reservation price.</b> {verdi(X, X)} − {verdi(X, Y)} = <b>{res}</b>. Against the status quo "
        f"it would be only {f_status}: the rival adds {tap[X][Y]} to what {X} is willing to pay.</p>"
        f"<p><b>Who gains.</b> The target's owners can extract up to the losing bidder's limit and more. That is why "
        f"targets gain most in mergers and bidders often pay more than the synergies alone justify.</p>"
        f"<p><b>Remember:</b> the most to pay is value if you win minus value if the relevant rival wins.</p>"
    )
    return sporsmal(q, alt, kort, full, tall=tallsvar())


# ---------------------------------------------------------------------------
# ma-eps1 · EPS og P/E etter et aksjebytte uten synergier
# ---------------------------------------------------------------------------
@familie("ma-eps1", tema="ma", antall=5, tittel="EPS after a stock swap without synergies",
         hjelp=hjelp3(
             "This is EPS after a stock swap. Buying earnings at a lower P/E with your own shares changes EPS. You "
             "need the merged EPS or P/E.",
             "x = ER × N<sub>T</sub>. EPS<sub>new</sub> = (E<sub>A</sub> + E<sub>T</sub>)/(N<sub>A</sub> + x). Without "
             "synergies and with no premium, P<sub>new</sub> = P<sub>A</sub>.",
             "<p><b>Step 1: the new shares.</b> Exchange ratio times the target's share count.</p>"
             "<p><b>Step 2: combined earnings over all shares.</b> Both firms' earnings, divided by the old and the new "
             "shares.</p>"
             "<p><b>Step 3: the price.</b> Without synergies and premium the merged price equals the acquirer's old "
             "price. P/E is that price over the new EPS.</p>"
             "<p><b>Watch out:</b> a higher EPS is not a higher value.</p>",
         ))
def _(r):
    A_n, T_n = r.choice(PAR)
    a, t = _k(A_n), _k(T_n)
    NA = r.choice([20, 40, 50, 60])
    PA = r.choice([40, 50, 60, 80, 100])
    peA = r.choice([16, 18, 20, 24, 25])
    EA = NA * PA / peA
    ER = r.choice([0.25, 0.4, 0.5, 0.6, 0.75])
    PT = ER * PA
    peT = r.choice([8, 10, 12, 15])
    if peT >= peA - 3:
        raise Avvis("P/E for like")
    NT = r.choice([10, 15, 20, 25])
    ET = NT * PT / peT
    for e in (EA, ET):
        if abs(e * 100 - round(e * 100)) > 1e-6:
            raise Avvis("resultatet er ikke et rundt tall")
    x = ER * NT
    eps = (EA + ET) / (NA + x)
    epsA = EA / NA
    pe_new = PA / eps
    typ = r.choice(["eps", "eps", "pe"])
    q = (f"<p>{A_n} has {NA} million shares at NOK {PA} and earnings of NOK {tall(EA, 2)} million (a P/E of {peA}). "
         f"{T_n} has {NT} million shares at NOK {talla(PT)} and earnings of NOK {tall(ET, 2)} million (a P/E of "
         f"{peT}). {a} buys {t} by giving {tall(ER, 2)} of its shares for each {t} share, which is no premium at the "
         f"current prices. The merger creates no synergies and both prices are fair.</p>")
    if typ == "eps":
        R_ = eps
        f1 = EA / (NA + x)
        f2 = (EA + ET) / NA
        f3 = epsA + ET / NT
        q += "<p>What is the EPS of the merged firm, in NOK? Give four decimals.</p>"
        alt = [R(f"NOK {tall(eps, 4)}", eps),
               F(f"NOK {tall(f1, 4)}", f"{gen(t)} earnings left out. The merged firm earns both firms' profits.", f1),
               F(f"NOK {tall(f2, 4)}", f"Divided by {gen(a)} old {NA} million shares only. The {tall(x, 2)} million new "
                                       f"shares share in the earnings too.", f2),
               F(f"NOK {tall(f3, 4)}", "The two firms' EPS added. EPS is total earnings over the total number of shares "
                                       "after the merger.", f3)]
        tall_ut = tallsvar(enhet="NOK")
        svar = f"NOK {tall(eps, 4)}"
    else:
        R_ = pe_new
        f1 = float(peA)
        f2 = (peA + peT) / 2
        f3 = PA / (EA / (NA + x))                          # bare kjøperens resultat over alle aksjer
        q += "<p>What is the P/E ratio of the merged firm? Give four decimals.</p>"
        alt = [R(tall(pe_new, 4), pe_new),
               F(tall(f1, 4), f"{gen(a)} old P/E of {peA}. The market does not apply the acquirer's multiple to the "
                              f"target's earnings: the merged firm adds slower-growing earnings.", f1),
               F(tall(f2, 4), f"The simple average of the two P/E ratios. Weight by value: the merged price over the "
                              f"merged EPS.", f2),
               F(tall(f3, 4), f"The price divided by {gen(a)} earnings over all shares. The merged firm also earns "
                              f"{gen(t)} profits.", f3)]
        tall_ut = tallsvar()
        svar = tall(pe_new, 4)
    ulike(*[x_.verdi for x_ in alt], rel=0.02)
    kort = (f"<p><b>{svar}.</b> x = {tall(ER, 2)} × {NT} = {tall(x, 2)} million. EPS = ({tall(EA, 2)} + {tall(ET, 2)})/"
            f"({NA} + {tall(x, 2)}) = {tall(eps, 4)}, up from {tall(epsA, 4)}"
            + (f". P/E = {PA}/{tall(eps, 4)} = {tall(pe_new, 4)}." if typ == "pe" else ".") + "</p>")
    full = (
        f"<p><b>The bootstrap.</b> An acquirer with a high P/E that buys a firm with a lower P/E using its own shares "
        f"always raises its EPS: each new share buys more earnings than an old share carries. That is arithmetic, not "
        f"value. Without synergies and with no premium nothing real has changed, so the price stays where it was and "
        f"the P/E falls.</p>"
        f"<p><b>Step 1: the new shares.</b> x = {tall(ER, 2)} × {NT} = {tall(x, 2)} million, so {tall(NA + x, 2)} "
        f"million shares in all.</p>"
        f"<p><b>Step 2: the merged EPS.</b> ({tall(EA, 2)} + {tall(ET, 2)})/{tall(NA + x, 2)} = {tall(eps, 4)}. Before "
        f"the merger {a} earned {tall(EA, 2)}/{NA} = {tall(epsA, 4)} per share.</p>"
        f"<p><b>Step 3: the price and the P/E.</b> P<sub>new</sub> = ({NA * PA} + {tall(NT * PT, 2)})/{tall(NA + x, 2)} "
        f"= {tall((NA * PA + NT * PT) / (NA + x), 4)}, the old price. P/E = {PA}/{tall(eps, 4)} = {tall(pe_new, 4)}, "
        f"down from {peA}.</p>"
        f"<p><b>First check.</b> The merged P/E is the value-weighted harmonic mix of the two: total value "
        f"{tall(NA * PA + NT * PT, 2)} over total earnings {tall(EA + ET, 2)} = "
        f"{tall((NA * PA + NT * PT) / (EA + ET), 4)} ✓. A different route, so it can catch a slip.</p>"
        f"<p><b>Remember:</b> EPS accretion from a lower P/E is not value creation. EPS manipulation is one of the "
        f"motives on the lecture's list.</p>"
    )
    return sporsmal(q, alt, kort, full, tall=tall_ut)


# ===========================================================================
# Statiske spørsmål
# ===========================================================================

statisk(
    "ma-s01", tema="ma", type="fakta",
    hjelp=hjelp3(
        "This is the evidence on who gains in mergers and acquisitions, as the lecture reports it.",
        "Announcement return = abnormal change in the share price when the deal is announced. The combined return "
        "tells you whether value is created. The split tells you who gets it.",
        "<p><b>Step 1: the target.</b> Does it gain a lot or a little?</p>"
        "<p><b>Step 2: the acquirer.</b> On average and how often negative?</p>"
        "<p><b>Step 3: the two together.</b> Is value created on average?</p>",
    ),
    q="<p>What does the evidence in the lecture say about announcement returns in mergers and acquisitions?</p>",
    alternativer=[
        R("Targets earn about 15% abnormal return, acquirers about 1% and negative in about half the deals"),
        F("Targets and acquirers both earn about 15%, since the synergies are shared equally between them",
          "The split is very uneven. Targets can hold out for most of the gain, so acquirers earn little."),
        F("Targets earn about 1% and acquirers about 15%, since the acquirer is the one creating the synergies",
          "The roles are reversed. Creating the synergies does not mean capturing them: competition between bidders "
          "and holdout by target shareholders hand most of the gain to the target."),
        F("Targets earn about 15% and acquirers lose about 15%, so mergers destroy value on average",
          "Acquirers do far better than that on average. The combined return is positive, so mergers usually create "
          "value."),
    ],
    kort="<p><b>Targets about 15%, acquirers about 1%.</b> Acquirer returns are negative in about half the deals. "
         "Combined returns are 1–3% and mostly positive: deals usually create value and the target's owners get most "
         "of it.</p>",
    full="<p><b>The evidence.</b> The lecture summarises the economic effects of M&amp;A: targets are the big winners "
         "with abnormal returns of about 15% on average at the announcement. Acquirers earn about 1% on average and "
         "are negative in about half the cases. Combined returns are about 1–3% and mostly positive.</p>"
         "<p><b>The conclusion.</b> Mergers usually create value. Most of it goes to the target's "
         "shareholders.</p>"
         "<p><b>Why the target gets most of it.</b> Each target shareholder can refuse to sell below what the share "
         "will be worth after the deal (the free-rider problem in takeovers). Rival bidders push the price up. "
         "Bidding depends on the alternatives: a bidder pays more to keep a rival from winning. The acquirer's "
         "managers may also overpay out of ambition or hubris.</p>"
         "<p><b>Do not confuse.</b> The premium over the market price is often 20–40%. That is a premium, not an "
         "abnormal return: part of it is expected before the announcement and the deal may fail.</p>"
         "<p><b>Remember:</b> targets about 15%, acquirers about 1%, the total small but positive.</p>",
)

statisk(
    "ma-s02", tema="ma", type="begrep",
    hjelp=hjelp3(
        "This is about how the means of payment shares the risk that the synergies were misjudged.",
        "Cash: NPV<sub>A</sub> = S − (P − T). Shares: NPV<sub>A</sub> = (1 − y)(A + T + S) − A and NPV<sub>T</sub> = "
        "y(A + T + S) − T.",
        "<p><b>Step 1: cash.</b> If S turns out smaller, whose NPV falls?</p>"
        "<p><b>Step 2: shares.</b> Use the two formulas. Which NPVs change when S changes?</p>",
    ),
    q="<p>Why does paying in shares rather than cash protect an acquirer that may have overestimated the "
      "synergies?</p>",
    alternativer=[
        R("The target's owners hold part of the merged firm, so they bear part of any shortfall in synergies"),
        F("With shares the acquirer pays nothing until the synergies have actually been realised",
          "The shares are handed over when the deal closes, not later. What changes is that their value depends on "
          "the merged firm."),
        F("Shares are cheaper than cash, because the acquirer avoids paying interest on borrowed money",
          "Under MM the financing does not make the purchase cheaper. The point is who carries the risk of the "
          "synergies."),
        F("With shares the exchange ratio is adjusted automatically when the synergies turn out to be smaller",
          "A fixed exchange ratio fixes the number of shares. It is their value that falls when the synergies "
          "disappoint."),
    ],
    kort="<p><b>The target shares the risk.</b> Paid in shares, the target's owners get y(A + T + S). If S is "
         "smaller, so is their payment. With cash the acquirer bears the whole shortfall.</p>",
    full="<p><b>Cash.</b> The acquirer pays a fixed P. Its gain is S − (P − T). If the synergies turn out smaller "
         "than expected, the acquirer's owners bear all of the shortfall: the target's owners have their cash.</p>"
         "<p><b>Shares.</b> The target's owners receive a fraction y of the merged firm, worth y(A + T + S). The "
         "acquirer's cost, y(A + T + S) − T, now depends on the synergies. If S disappoints, the merged shares are "
         "worth less and the target's owners carry the fraction y of the loss.</p>"
         "<p><b>The lecture's point.</b> With a stock swap the acquirer's costs depend on the synergies; with cash "
         "they do not directly. Stock financing mitigates the effects of potential misvaluation. The same logic "
         "applies to the acquirer's own shares: if they are overvalued, paying with them shifts part of that "
         "overvaluation onto the target.</p>"
         "<p><b>The other side.</b> Because the market knows this, choosing shares can signal that the acquirer "
         "doubts the synergies or thinks its own shares are expensive.</p>"
         "<p><b>Remember:</b> shares share the risk of misvaluation with the target. Cash leaves it with the "
         "acquirer.</p>",
)

statisk(
    "ma-s03", tema="ma", type="tolkning",
    hjelp=hjelp3(
        "This is cash against shares under asymmetric information: what an acquirer prefers when it thinks its own "
        "shares are overvalued and what the market learns.",
        "Stock swap cost to the acquirer = y(T + A + S) − T. If A's shares are overvalued, the true cost is lower "
        "than the market value of the shares paid.",
        "<p><b>Step 1: the preference.</b> Which currency is cheaper for an acquirer whose shares are "
        "overpriced?</p>"
        "<p><b>Step 2: the inference.</b> Investors know the incentive. What does the choice tell them?</p>",
    ),
    q="<p>The managers of an acquirer believe its own shares are overvalued. Which way of paying do they prefer? How "
      "is the market likely to react to that choice?</p>",
    alternativer=[
        R("Shares; the market reads a stock offer as a sign of overvaluation and marks the acquirer down"),
        F("Cash; paying cash shows confidence in the deal, so the market marks the acquirer's price up",
          "With overpriced shares, cash is the expensive currency. Paying in shares lets the acquirer spend its "
          "overpriced paper."),
        F("Shares; the market cannot tell why shares were chosen, so the acquirer's price does not move",
          "Investors know the incentive. The choice of currency reveals information, as an equity issue does."),
        F("Cash; the target's owners prefer cash, so the deal is more likely to complete and the price rises",
          "The question is what the acquirer prefers given what it knows about its own shares. Overpriced shares "
          "are the cheaper way to pay."),
    ],
    kort="<p><b>Shares; the price falls.</b> Overvalued shares are a cheap currency. Investors know this, so a "
         "stock offer signals overvaluation, as in Myers-Majluf.</p>",
    full="<p><b>What the acquirer prefers.</b> In a stock swap the acquirer's cost is y(T + A + S) − T. If its shares "
         "are overvalued, the target's owners receive shares worth less than they appear. Paying in shares is then "
         "cheaper than paying the same market value in cash. If the managers instead think their shares are "
         "undervalued, they prefer cash. The lecture calls this a win-win for the acquirer, but...</p>"
         "<p><b>What the market learns.</b> ...the choice reveals information. Investors know that an overvalued "
         "acquirer prefers shares, so a stock offer is read as a sign that the acquirer's shares are expensive. The "
         "acquirer's price falls when a stock offer is announced. This is the same mechanism as the price fall at "
         "an equity issue (Myers-Majluf).</p>"
         "<p><b>Other factors.</b> The lecture's list of what decides cash or stock: the acquirer's liquidity and "
         "debt capacity, who has the information advantage, uncertainty about the synergies and the stand-alone "
         "values, whether the sellers need cash or face taxes and timing.</p>"
         "<p><b>Remember:</b> overvalued acquirers pay in shares. The market knows it.</p>",
)

statisk(
    "ma-s04", tema="ma", type="begrep",
    hjelp=hjelp3(
        "This is merger arbitrage: buying the target and shorting the acquirer after a stock deal is announced. "
        "You need why it has paid on average.",
        "Per target share: payoff if the deal completes = the deposit grown at r<sub>f</sub>. Payoff if it fails = "
        "the grown deposit + the old target price − ER × the old acquirer price. Deal spread = value of the offer − "
        "target price.",
        "<p><b>Step 1: is the position risk-free?</b> Look at what happens if the deal fails.</p>"
        "<p><b>Step 2: who is on the other side?</b> Why would a target holder sell before the deal closes?</p>",
    ),
    q="<p>Why has merger arbitrage, buying the target and shorting the acquirer after a stock deal is announced, "
      "historically been profitable?</p>",
    alternativer=[
        R("Holders who fear the deal failing sell the target to the arbitrageurs, so the deal spread is an insurance "
          "premium"),
        F("The strategy is risk-free, because the two legs cancel each other out whatever happens to the deal",
          "The legs cancel only if the deal completes. If it fails, the target falls back and the arbitrageur "
          "loses."),
        F("Arbitrageurs learn the outcome of the deal before the market does and trade on that inside information",
          "The strategy needs no private information. It pays on average across many public deals."),
        F("The acquirer's shares always fall after a merger closes, so the short position earns a steady premium",
          "On completion the target shares become acquirer shares and close the short. The acquirer's later price "
          "does not matter to the position."),
    ],
    kort="<p><b>Insurance.</b> The target can drop sharply if the deal fails. Holders sell to arbitrageurs to avoid "
         "that risk. The spread is the price they pay. Arbitrageurs spread the risk over many deals.</p>",
    full="<p><b>The position.</b> After a stock deal is announced, buy the target and short the acquirer in the "
         "exchange ratio, investing the proceeds at r<sub>f</sub>. If the deal completes, the target shares become "
         "the acquirer shares you owe and you keep the spread. If it fails, prices revert and you lose.</p>"
         "<p><b>Why it pays.</b> The lecture: target prices may drop sharply if the deal is called off. People sell "
         "the target to get insurance against that. The deal spread, the price the acquirer pays minus the target "
         "price, is the cost of the insurance. Merger arbitrage traders provide liquidity and insurance against "
         "deal risk. They reduce their own risk by covering many deals. Historically the strategy has been "
         "profitable (Mitchell and Pulvino, 2001).</p>"
         "<p><b>The behaviour of the spread.</b> It narrows towards zero as completion becomes certain and widens "
         "again before a deal fails.</p>"
         "<p><b>Link to the deal probability.</b> On the exam the same position is priced so that it earns "
         "r<sub>f</sub>: Kurbatov treats deal risk as unrelated to the market (A3) and reads p as the market's "
         "probability that the deal completes. The two views fit together. The pricing rule is the course's model; "
         "the insurance premium is the practical side, the somewhat higher return that arbitrageurs who carry deal "
         "risk and provide liquidity have earned historically.</p>"
         "<p><b>Remember:</b> merger arbitrage is not arbitrage. In practice it has earned a premium for carrying "
         "deal risk and providing liquidity.</p>",
)

statisk(
    "ma-s05", tema="ma", type="begrep",
    hjelp=hjelp3(
        "This is the logic behind the deal-probability calculation: why the expected payoff equals the cost grown at "
        "the risk-free rate.",
        "cost × (1 + r<sub>f</sub>)<sup>T</sup> = p × payoff(completes) + (1 − p) × payoff(fails). A risk that is "
        "unrelated to the market earns no premium.",
        "<p><b>Step 1: what risk is left in the position?</b> Compare the two outcomes.</p>"
        "<p><b>Step 2: is that risk systematic?</b> What decides whether a deal completes?</p>"
        "<p><b>Step 3: what does that make p?</b></p>",
    ),
    q="<p>In the long-short calculation of a deal probability, why is the expected payoff set equal to the cost grown at "
      "the risk-free rate?</p>",
    alternativer=[
        R("Only deal risk is left, treated as diversifiable, so the position earns r<sub>f</sub> and p is the market's "
          "own probability"),
        F("The two legs cancel in both outcomes, so the position carries no risk at all and must therefore earn r<sub>f</sub>",
          "If the deal fails the legs do not cancel: prices revert and the payoff differs. Some risk is left."),
        F("The risk-free rate is a convention; the acquirer's cost of capital would give exactly the same probability of "
          "completion",
          "A different rate gives a different p. The rate follows from what risk is left in the position."),
        F("Deal risk is systematic, so p is a risk-neutral probability that understates the true chance of "
          "completion",
          "The direction would be right if deal risk were priced, but the premise is not the course's. Whether a deal "
          "completes depends on regulators, votes and rival bidders, which have little to do with the market. "
          "Kurbatov treats such risk as unsystematic, so it carries no premium."),
    ],
    kort="<p><b>Deal risk is treated as diversifiable.</b> Once the legs are set up, only the yes-or-no of the deal "
         "is left. That risk earns no premium, so the position earns r<sub>f</sub> and p reads as the market's own "
         "probability of completion.</p>",
    full="<p><b>What is left in the position.</b> If the deal completes, the target shares turn into exactly the "
         "acquirer shares you are short, so the market's moves cancel. If it fails, both prices return to known "
         "levels. Either way you know the payoff. The only uncertainty is which outcome happens.</p>"
         "<p><b>Is that risk priced?</b> Whether a deal completes depends on regulators, shareholder votes and "
         "rival bids. Those are largely unrelated to the market as a whole, so the risk can be diversified across "
         "many deals and carries no premium. The position's expected payoff must then grow at the risk-free rate: "
         "cost × (1 + r<sub>f</sub>)<sup>T</sup>.</p>"
         "<p><b>What p is.</b> Since no risk premium is involved, the probability that makes the equation hold is the "
         "market's belief about completion, not just a pricing device. Kurbatov calls it the probability of success "
         "as perceived by the market. This is the course's rule for real probabilities of unsystematic risk (A3).</p>"
         "<p><b>A caveat from practice.</b> If arbitrageurs did earn a premium for carrying deal risk, as the "
         "historical profits of merger arbitrage suggest, the position would be priced below its value at the true "
         "probability. Then p read with r<sub>f</sub> would come out somewhat below the true chance. The course "
         "ignores this.</p>"
         "<p><b>The classic error.</b> Setting the expected payoff equal to the cost without growing it. In H2025 E6 "
         "that moves p from 0.8283 to 0.7283, the error the exam key singles out.</p>"
         "<p><b>Remember:</b> deal risk is not market risk, so discount at r<sub>f</sub> over the time to "
         "completion.</p>",
)

statisk(
    "ma-s06", tema="ma", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is the coinsurance effect: what a merger of two firms with risky debt does to the debt and to the "
        "equity.",
        "Debt = min(V, D) and equity = max(V − D, 0) state by state. With no synergies, total value is fixed, so a "
        "gain for one claim is a loss for the other (check 4).",
        "<p><b>Step 1: statement I.</b> When one firm's good state covers the other's bad one, what happens to "
        "default?</p>"
        "<p><b>Step 2: statement II.</b> If the debt becomes safer and total value is unchanged, who pays for "
        "it?</p>",
    ),
    q="<p>Two firms with risky debt merge. There are no synergies.</p>"
      "<p>I. If their cash flows are not perfectly correlated, the merged firm's debt is safer than the two old "
      "debts.</p>"
      "<p>II. The shareholders gain, because the merged firm can borrow at a lower rate.</p>"
      "<p>Which statements are correct?</p>",
    alternativer=[
        R("Only I"),
        F("Only II", "Statement II fails: the lower rate means the debt is worth more. With total value fixed, that "
                     "gain comes out of the shareholders' pockets."),
        F("Both I and II", "Statement II fails: safer debt is worth more to the creditors. With no synergies that "
                           "value comes from the shareholders."),
        F("Neither", "Ask what happens to default when one firm's strong state can cover the other's weak one."),
    ],
    kort="<p><b>Only I.</b> The merged firm defaults less, so the debt is worth more. With no synergies, that gain is "
         "the shareholders' loss: coinsurance moves value to the creditors.</p>",
    full="<p><b>Statement I: the coinsurance effect.</b> When two firms merge, the joint debt is backed by both sets "
         "of cash flows. If one firm does badly, the other can cover the debt. The condition (lecture 12) is that "
         "the cash flows are not perfectly positively correlated: if they always move together, both do badly at the "
         "same time and nothing is gained. The lower the correlation, the larger the fall in default risk, so the "
         "joint bond has a lower yield.</p>"
         "<p><b>Statement II: who pays.</b> With no synergies the merged firm is worth exactly the sum of the two. "
         "If the debt is safer, it is worth more, so the equity must be worth less: check 4, the creditors' gain is "
         "the shareholders' loss. In the lecture's example debt rises from 37.5 to 45 and equity falls from 37.5 to "
         "30. Equity is a call on the assets. Lower risk lowers the value of a call.</p>"
         "<p><b>What shareholders can do.</b> Borrow more after the merger and pay out the proceeds, which can also "
         "raise the tax shield. And diversification is no reason to merge: shareholders can hold both firms "
         "themselves.</p>"
         "<p><b>Remember:</b> coinsurance makes debt safer and moves value from shareholders to creditors.</p>",
)

statisk(
    "ma-s07", tema="ma", type="tolkning",
    hjelp=hjelp3(
        "This is EPS after a merger paid in shares: the bootstrap, or EPS manipulation, on the lecture's list of "
        "motives.",
        "EPS<sub>new</sub> = (E<sub>A</sub> + E<sub>T</sub>)/(N<sub>A</sub> + x). P<sub>new</sub> = (A + T + "
        "S)/(N<sub>A</sub> + x). At no premium the new shares are worth T at the acquirer's price: x × P<sub>A</sub> = "
        "T.",
        "<p><b>Step 1: earnings per new share.</b> Each new share buys the target's earnings at the target's "
        "P/E. Is that more or less than an old share carries?</p>"
        "<p><b>Step 2: the price.</b> Put S = 0 and x × P<sub>A</sub> = T into the formula for P<sub>new</sub>.</p>",
    ),
    q="<p>An acquirer with a P/E of 20 buys a target with a P/E of 10 by paying in its own shares, at no premium. There "
      "are no synergies. What happens to the acquirer's EPS and share price?</p>",
    alternativer=[
        R("EPS rises and the share price is unchanged, since no value is created or moved"),
        F("EPS and the share price both rise, because the market applies the acquirer's P/E to the target's earnings",
          "That is the bootstrap illusion. The merged firm carries slower-growing earnings, so its P/E falls."),
        F("EPS falls, because new shares are issued to the target's owners",
          "The new shares come with the target's earnings. At a lower P/E those earnings exceed what the new "
          "shares dilute."),
        F("EPS and the share price both fall, because the acquirer gives away shares worth more than the earnings "
          "it buys",
          "At no premium the shares given away are worth exactly the target's value. Nothing is given away."),
    ],
    kort="<p><b>EPS up, price unchanged.</b> Buying earnings at a P/E of 10 with shares priced at 20 raises EPS. With "
         "no synergies and no premium the price stays put and the P/E falls.</p>",
    full="<p><b>Why EPS rises.</b> The acquirer's shares sell at 20 times earnings. Each new share it issues buys "
         "target earnings at 10 times earnings, so it brings in twice the earnings an old share carries. Average them "
         "and EPS goes up. This is arithmetic.</p>"
         "<p><b>Why the price does not.</b> The merged firm is worth A + T, no more: there are no synergies. The "
         "target's owners got shares worth exactly T at no premium, so P<sub>new</sub> = (A + T)/(N<sub>A</sub> + x) "
         "= P<sub>A</sub>. Higher EPS at an unchanged price means a lower P/E. The market values the target's "
         "earnings at the target's multiple, not the acquirer's.</p>"
         "<p><b>Why it matters.</b> EPS manipulation is on the lecture's list of merger motives. A CEO paid on EPS "
         "growth can buy it this way without creating any value, the same governance problem as a buyback to hit an "
         "EPS target.</p>"
         "<p><b>Remember:</b> EPS accretion from a lower P/E is not value creation.</p>",
)

statisk(
    "ma-s08", tema="ma", type="tolkning",
    hjelp=hjelp3(
        "This is reading the synergies from the price reaction to a deal and when that estimate is biased.",
        "S<sub>implied</sub> = change in combined market value. The prices after the announcement reflect the "
        "chance that the deal completes and any news the bid reveals.",
        "<p><b>Step 1: if the deal may fail,</b> how much of the gain is in the prices?</p>"
        "<p><b>Step 2: if the bid reveals news about the target,</b> what else is in its price change?</p>",
    ),
    q="<p>You estimate a deal's synergies as the change in the combined market value of the acquirer and the target "
      "when the deal is announced. When does this <i>understate</i> the synergies?</p>",
    alternativer=[
        R("When the market thinks the deal may fail, since prices then hold only part of the gain"),
        F("When the bid reveals good news about the target's own stand-alone value",
          "That overstates the synergies: part of the target's rise is news about its own value, not a gain from "
          "the merger."),
        F("When the deal is paid in cash rather than in the acquirer's shares",
          "The change in combined value is the market's synergy estimate whatever the means of payment."),
        F("When the acquirer's price falls, since a fall means the synergies are negative",
          "A fall in the acquirer's price can mean it overpays. The synergies are the change in the two values "
          "together."),
    ],
    kort="<p><b>When the deal may fail.</b> Prices then weight the gain by the probability of completion, so the "
         "combined change is less than the full synergy. News about the target biases it the other way.</p>",
    full="<p><b>The estimate.</b> The premium moves value between the two sets of owners, so it cancels in the "
         "combined change. What is left is the market's estimate of the synergies: S<sub>implied</sub> = "
         "N<sub>A</sub>ΔP<sub>A</sub> + N<sub>T</sub>ΔP<sub>T</sub>, for cash or for shares.</p>"
         "<p><b>Biased down.</b> If the deal might fail, today's prices are a mix of the two outcomes. Only part of "
         "the gain is priced in, so the combined change understates the synergies. That is why the Mannesmann "
         "approach first backs out the probability of completion and then values the synergies at completion.</p>"
         "<p><b>Biased up.</b> If the bid tells the market that the target was undervalued, part of the target's rise "
         "is news about its own value, not a gain from merging. The estimate is then too high.</p>"
         "<p><b>Other problems.</b> The lecture also asks whether market values can be used at all: the deal may "
         "have leaked or been anticipated, so the prices before the announcement already contain part of it.</p>"
         "<p><b>Remember:</b> the price reaction understates the synergies when completion is uncertain and "
         "overstates them when the bid is news about the target.</p>",
)

statisk(
    "ma-s09", tema="ma", type="tolkning",
    hjelp=hjelp3(
        "This is the option to wait applied to an acquisition: what argues for closing a positive-NPV deal now "
        "instead of waiting for news.",
        "Value of waiting = value of deciding after the news − NPV of deciding now. Waiting gains from resolved "
        "uncertainty and costs lost cash flows and the risk of losing the deal.",
        "<p><b>Step 1: sort the factors.</b> Which make the information more valuable, which make waiting more "
        "costly?</p>"
        "<p><b>Step 2: pick the one that makes waiting costly.</b></p>",
    ),
    q="<p>An acquirer can close a positive-NPV cash deal now or wait a year for a regulator's review that will settle "
      "most of the uncertainty about the synergies. Which factor argues most strongly for closing now?</p>",
    alternativer=[
        R("A rival bidder who may buy the target in the meantime"),
        F("High uncertainty about the size of the synergies",
          "Uncertainty that the review resolves makes waiting more valuable: you buy only if the synergies turn out "
          "large."),
        F("A positive NPV of the deal today",
          "A positive NPV is needed to close now at all, but waiting can be worth more: the option to wait."),
        F("A review that will resolve the uncertainty about the synergies completely",
          "The more the review tells you, the more the information is worth. That favours waiting."),
    ],
    kort="<p><b>A rival bidder.</b> Waiting is an option that is lost if someone else buys the target. That and the "
         "synergies forgone during the year are the costs of waiting.</p>",
    full="<p><b>An acquisition as a real option.</b> If the acquirer waits for the review, it buys only if the "
         "synergies turn out large and walks away otherwise. Like any option, that is worth more the more "
         "uncertain the synergies are and the more the review will reveal. A positive NPV today does not settle "
         "the question: the deal may be worth more after the news.</p>"
         "<p><b>The costs of waiting.</b> A year of synergy cash flows is lost. More important here, a rival may buy "
         "the target in the meantime. Then the option expires worthless. The acquirer may also be worse off "
         "competing against a stronger rival (bidding depends on the alternatives). A real option to wait is "
         "valuable only if it is exclusive.</p>"
         "<p><b>The exam twist.</b> Kurbatov gave \"what if we can delay this M&amp;A by one year?\" as an example "
         "of a short intuition question. Name the option to wait, say what raises its value (uncertainty, "
         "information) and what lowers it (lost cash flows, rivals).</p>"
         "<p><b>Remember:</b> uncertainty and information favour waiting. Competition and lost cash flows favour "
         "acting now.</p>",
)

statisk(
    "ma-s10", tema="ma", type="tolkning",
    hjelp=hjelp3(
        "This is the follow-up to a deal-probability question: what happens to prices when the acquirer's "
        "shareholders block the deal.",
        "Today's prices weight the two outcomes by the market's probability that the deal completes. A bid can also "
        "carry news about the target's stand-alone value.",
        "<p><b>Step 1: why did the prices move at the announcement?</b></p>"
        "<p><b>Step 2: what happens to that probability after the vote?</b></p>"
        "<p><b>Step 3: what could keep the prices from moving all the way?</b></p>",
    ),
    q="<p>After a stock offer is announced, the acquirer's share price falls from 84 to 79 and the target's rises from 30 "
      "to 36. Most of the acquirer's shareholders then vote against the deal and it is dropped. What should happen to "
      "the two prices?</p>",
    alternativer=[
        R("Back towards 84 and 30, unless some chance of completion remains or the bid was news about the target"),
        F("They stay near 79 and 36, since the announcement is already in the prices, unless a new bidder appears",
          "The prices moved because of the deal. If the deal is dead, the reason for the move is gone."),
        F("The acquirer rises well above 84, since the vote shows strong governance, at least until the next deal",
          "The vote removes a value-destroying deal. It restores the old value; it does not create a new one."),
        F("The target rises further, since the vote shows it is worth more than offered, at least if rivals exist",
          "The vote says the deal is bad for the acquirer, not that the target is worth more. The premium "
          "disappears with the deal."),
    ],
    kort="<p><b>Back towards 84 and 30.</b> The repricing was the deal. Kill it and the prices revert, minus any "
         "remaining chance the deal goes ahead and any lasting news about the target.</p>",
    full="<p><b>Reading the reaction.</b> The acquirer fell and the target rose: the market thinks the deal destroys "
         "value for the acquirer's shareholders and hands it to the target's. Empire building or hubris fits that "
         "pattern; synergies alone would not push the acquirer down.</p>"
         "<p><b>The vote.</b> An acquirer shareholder votes against a deal that takes value out of his pocket. If most "
         "do the same, the deal is blocked and the reason for the repricing disappears. Prices should return to "
         "their pre-announcement levels, which is the minimal answer the H2025 key accepts.</p>"
         "<p><b>Why the reversal may be incomplete.</b> If management is strong enough, it may still press on, so "
         "the market keeps a small probability of completion and the prices stop short of 84 and 30. The bid may "
         "also have told the market something: the target may be undervalued or attractive to other bidders, so it "
         "stays above 30. The key mentions both as bonus thoughts.</p>"
         "<p><b>Consistency.</b> The vote and the prediction must follow from the motive you gave. What is graded "
         "is the internal logic.</p>"
         "<p><b>Remember:</b> a blocked deal undoes the repricing, apart from any remaining chance and any news.</p>",
)

statisk(
    "ma-s11", tema="ma", type="begrep",
    hjelp=hjelp3(
        "This is the difference between the premium offered in a stock swap and the premium the target's owners "
        "actually get.",
        "Offered premium = ER × P<sub>A</sub>/P<sub>T</sub> − 1. Actual premium = ER × P<sub>new</sub>/P<sub>T</sub> "
        "− 1. NPV<sub>A</sub> = N<sub>A</sub>(P<sub>new</sub> − P<sub>A</sub>).",
        "<p><b>Step 1: compare the two formulas.</b> What is the only difference?</p>"
        "<p><b>Step 2: when is P<sub>new</sub> above P<sub>A</sub>?</b> Link it to the acquirer's NPV.</p>",
    ),
    q="<p>In a stock swap at a fixed exchange ratio, when is the premium the target's owners actually receive larger "
      "than the premium offered at the pre-announcement prices?</p>",
    alternativer=[
        R("When the deal has a positive NPV for the acquirer, so the merged price ends above its old price"),
        F("Always, because the target's own share price rises when the deal is announced",
          "The target's price after the announcement is not part of either premium. Both are measured against its "
          "price before the news."),
        F("When the acquirer's share price falls, because each target share then buys a larger number of acquirer shares",
          "A fixed exchange ratio fixes the number of shares. A lower acquirer price makes them worth less."),
        F("Never, because the exchange ratio fixes the premium at the level that was offered",
          "The ratio fixes the number of shares. Their value depends on what the merged shares are worth."),
    ],
    kort="<p><b>When NPV<sub>A</sub> &gt; 0.</b> The target is paid in merged shares. The actual premium beats the "
         "offered one exactly when P<sub>new</sub> &gt; P<sub>A</sub>, that is when the deal is good for the "
         "acquirer.</p>",
    full="<p><b>Two premiums.</b> The offered premium values the shares at the acquirer's old price: ER × "
         "P<sub>A</sub>/P<sub>T</sub> − 1. But the target's owners receive shares of the merged firm, worth "
         "P<sub>new</sub> = (A + T + S)/(N<sub>A</sub> + x). The actual premium is ER × P<sub>new</sub>/P<sub>T</sub> "
         "− 1.</p>"
         "<p><b>When they differ.</b> The only difference is P<sub>new</sub> against P<sub>A</sub>. Since NPV<sub>A</sub> "
         "= N<sub>A</sub>(P<sub>new</sub> − P<sub>A</sub>), the merged price is above the old acquirer price exactly "
         "when the deal has a positive NPV for the acquirer. Then the target's owners get more than offered: they "
         "share in the synergies through their shares.</p>"
         "<p><b>The other way.</b> If the deal destroys value for the acquirer, P<sub>new</sub> &lt; P<sub>A</sub> and "
         "the target is paid in a currency the deal has debased. A fixed ratio protects the number of shares, not "
         "their value. A fixed-value offer, where the number of shares adjusts, is a different contract.</p>"
         "<p><b>Exam use.</b> Read whether the question asks for the offered or the actual premium. Giving the "
         "offered one when the actual was asked is a standard error.</p>"
         "<p><b>Remember:</b> actual premium &gt; offered premium ⇔ NPV<sub>A</sub> &gt; 0.</p>",
)
