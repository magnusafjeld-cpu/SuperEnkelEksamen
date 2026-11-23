# -*- coding: utf-8 -*-
"""Øv uten stopp FIE402: fusjoner og oppkjøp (skribent 3, tema «ma»).

   ov-ma1  Aksjebytte: nye aksjer og y, kurs etter fusjonen, NPV for hver side,
           høyeste og laveste bytteforhold (når sier hver side ja), og forskjellen
           mellom tilbudt og faktisk premie. Formelarket (stock swap) og forelesning 12.
   ov-ma2  Kontanter mot aksjer når synergiene er usikre: NPV for hver side med
           forventede synergier, NPV når synergiene skuffer, og hvem som bærer
           synergirisikoen. Forelesning 12 (lysbilde 13–18, 24–25).
   ov-ma3  Markedets sannsynlighet for at avtalen gjennomføres når den avgjøres om T år
           ((1 + r_f)^T), fusjonsarbitrasje, kursen på kjøperen ved gjennomføring og
           forutsetningene. H2025 E6 og Mannesmann (forelesning 12, lysbilde 20–23).
   ov-ma4  Koforsikring: risikabel gjeld i to tilstander før og etter en fusjon uten
           synergier, hvem som vinner og taper (kontroll 4). V2024 P4 og forelesning 12
           (lysbilde 27–28).
   ov-ma5  Budkamp: betalingsvilje mot «ingen handel» og mot «en rival vinner»,
           vinneren og prisen, og hvem som får gevinsten. Bank D (forelesning 12,
           lysbilde 26).

   Alle tall i casen, fasiten, løsningen og fellene kommer fra de samme variablene.
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
       - None hoppes over (feilen finnes ikke i denne varianten).
       - En felle innenfor to ganger toleransen til sitt EGET tall avviser varianten.
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


def _fire(x):
    """Sant når x har høyst fire desimaler (så en vist brøk er eksakt)."""
    return abs(x * 10000 - round(x * 10000)) < 1e-7


PAR = [
    dict(A="Nordvik Industri ASA", T="Sørhavn Teknikk ASA", cur="NOK"),
    dict(A="Hallingdal Kraft ASA", T="Lofoten Komponent ASA", cur="NOK"),
    dict(A="Vestfold Maskin ASA", T="Sunnfjord Software ASA", cur="NOK"),
    dict(A="Trondhjem Data ASA", T="Ryfylke Elektro ASA", cur="NOK"),
    dict(A="Atlas Ridge Corp", T="Redfern Systems Inc", cur="$"),
    dict(A="Blue Harbor Holdings Inc", T="Clearwater Labs Inc", cur="$"),
    dict(A="Summit Peak Inc", T="Oakmont Devices Inc", cur="$"),
    dict(A="Kestrel Group Inc", T="Willow Creek Foods Inc", cur="$"),
]

# Bytteforhold som «k A-aksjer for hver m T-aksjer»: (ER, k, m)
FORHOLD = [(0.25, 1, 4), (0.4, 2, 5), (0.5, 1, 2), (0.6, 3, 5), (0.75, 3, 4), (0.8, 4, 5),
           (1.25, 5, 4), (1.5, 3, 2), (0.3, 3, 10), (0.45, 9, 20), (0.7, 7, 10), (1.2, 6, 5)]


def _forhold_tekst(ER, k, m, A, T, r):
    """Bytteforholdet med ord, i én av to former (entall når det er én aksje)."""
    if r.random() < 0.5 or m == 1:
        return f"each {T} share is exchanged for {tall(ER, 2)} new {A} shares"
    return f"every {tall(m)} {T} shares are exchanged for {tall(k)} new {A} {'share' if k == 1 else 'shares'}"


Y_PENE = [0.1, 0.125, 0.15, 0.16, 0.2, 0.24, 0.25, 0.3, 0.32, 0.35, 0.4]


def _bytte(r):
    """Trekk N_T, bytteforholdet og y slik at x og y er eksakte og N_A blir et helt tall."""
    for _ in range(40):
        NT = r.choice([8, 10, 12, 15, 16, 20, 24, 25, 30])
        ER, k, mm = r.choice(FORHOLD)
        x = ER * NT
        if not _fire(x):
            continue
        kand = [y for y in Y_PENE if abs(x * (1 - y) / y - round(x * (1 - y) / y)) < 1e-9
                and 12 <= round(x * (1 - y) / y) <= 150]
        if kand:
            y = r.choice(kand)
            return NT, ER, k, mm, x, y, int(round(x * (1 - y) / y))
    raise Avvis("aksjetallene blir ikke pene")


def _priser(r, ER, NA, NT, pmin=0.1, pmax=0.45):
    """Trekk P_T og P_A slik at den tilbudte premien og størrelsesforholdet er rimelige."""
    par = [(PT, PA) for PT in [20, 24, 25, 30, 36, 40, 45, 50, 60, 64, 72, 80]
           for PA in [20, 25, 30, 40, 45, 50, 60, 75, 80, 90, 100, 120, 150]
           if pmin <= ER * PA / PT - 1 <= pmax and 1.5 <= NA * PA / (NT * PT) <= 10]
    if not par:
        raise Avvis("ingen pene priser")
    return r.choice(par)


# ---------------------------------------------------------------------------
# ov-ma1 · Aksjebytte
# ---------------------------------------------------------------------------
@oppgave("ov-ma1", tema="ma", tittel="A stock swap: who gains and when each side says yes", antall=12,
         sjanger="d3-aksjebytte", kilde="Lecture 12 stock swap (formula sheet)")
def _(r):
    v = _velg("ov-ma1", PAR, r, lambda z: z["A"])
    A_, T_, cur = v["A"], v["T"], v["cur"]
    NT, ER, k, mm, x, y, NA = _bytte(r)
    if NA == NT:
        raise Avvis("like aksjetall gjør feilene med aksjetall umulige å skille")
    PT, PA = _priser(r, ER, NA, NT)
    VA, VT = NA * PA, NT * PT
    S = round(r.choice([0.15, 0.2, 0.25, 0.3, 0.4]) * VT / 10) * 10
    if S <= 0:
        raise Avvis("ingen synergier")
    V = VA + VT + S
    Pn = V / (NA + x)
    Pn4 = rund(Pn, 4)
    NPVA = (1 - y) * V - VA
    NPVT = y * V - VT
    if NPVT <= 0.05 * S or abs(NPVA) < 0.05 * S:
        raise Avvis("en av sidene sier nei, eller NPV er nesten null")
    ERmax = (VT + S) / VA * NA / NT
    ERmin = VT * NA / ((VA + S) * NT)
    prem_tilb = ER * PA / PT - 1
    prem_fakt = ER * Pn / PT - 1
    prem_fakt4 = ER * Pn4 / PT - 1
    Pn0 = (VA + VT) / (NA + x)
    NPVT0 = y * (VA + VT) - VT
    ft = _forhold_tekst(ER, k, mm, A_, T_, r)
    over = NPVA > 0

    def m(z, d=2):
        return _m(z, d, cur)

    def ps(z, d=2):
        return penger(z, d, cur)

    case = (f"<p>{A_} has {tall(NA)} million shares trading at {ps(PA, 0)}. It has agreed to acquire {T_}, which has "
            f"{tall(NT)} million shares trading at {ps(PT, 0)}. Both prices are from before any news of the deal and "
            f"reflect the stand-alone values. The two boards agree that the merger creates synergies with a present "
            f"value of {m(S, 0)}.</p>"
            f"<p>{A_} pays with new shares: {ft}.</p>"
            f"<p>Give fractions and exchange ratios with four decimals and amounts with two.</p>")

    a_del = tall_del(
        "a", poeng=3,
        q=(f"<p>How many new shares does {A_} issue (in millions)? What fraction y of the merged firm will the former "
           f"{T_} shareholders own?</p>"),
        svar=(sv_a := [T("New shares", x, "million shares"), T("y", y)]),
        kort=(f"<p><b>{tall(x, 4)} million and y = {tall(y, 4)}.</b> x = {tall(ER, 4)} × {tall(NT)}; "
              f"y = {tall(x, 4)}/({tall(NA)} + {tall(x, 4)}).</p>"),
        losning=(f"<p>In a stock swap the target's shareholders are paid with new shares in the acquirer, so they end "
                 f"up owning part of the merged firm. The exchange ratio fixes how many shares they get; y is their "
                 f"share of the merged firm.</p>"
                 f"<p><b>Step 1: the exchange ratio.</b> The offer means ER = {tall(ER, 4)} new {A_} shares per "
                 f"{T_} share.</p>"
                 f"<p><b>Step 2: new shares.</b> x = ER × N<sub>T</sub> = {tall(ER, 4)} × {tall(NT)} = "
                 f"<b>{tall(x, 4)} million</b>.</p>"
                 f"<p><b>Step 3: the ownership share.</b> y = x/(N<sub>A</sub> + x) = {tall(x, 4)}/({tall(NA)} + "
                 f"{tall(x, 4)}) = <b>{tall(y, 4)}</b>. The former {T_} shareholders own {pst(y, 2)} of the merged "
                 f"firm.</p>"
                 f"<p><b>First check.</b> The old {A_} shareholders keep 1 − y = {tall(1 - y, 4)}, which is "
                 f"{tall(NA)}/{tall(NA + x, 4)}. The two shares add to one, so this only catches a wrong count.</p>"
                 f"<p><b>Remember:</b> write the ratio as a sentence (new acquirer shares per target share) before "
                 f"you use it. The new shares belong in the denominator of y.</p>"),
        feller=_rens([
            Felle(NT / ER, "You turned the exchange ratio upside down.", i=0),
            Felle(ER * NA, "You multiplied the ratio by the acquirer's own share count.", i=0),
            Felle(x / NA, "You divided by the old acquirer shares only, leaving out the new shares.", i=1),
            Felle(NT / (NA + NT), "You used the target's old share count instead of the new shares.", i=1),
            Felle(VT / (VA + VT), "This is the target's share of the combined stand-alone value, not of the shares.",
                  i=1),
        ], sv_a),
    )

    b_del = tall_del(
        "b", poeng=5,
        q=(f"<p>What is the share price of the merged firm once the deal is done? What is the NPV of the deal for the "
           f"{A_} shareholders and for the {T_} shareholders?</p>"),
        gitt=f"<p>From (a): x = {tall(x, 4)} million new shares and y = {tall(y, 4)}.</p>",
        svar=(sv_b := [T("Merged share price", Pn, f"{cur} per share"), T("NPV<sub>A</sub>", NPVA, f"{cur} million"),
                       T("NPV<sub>T</sub>", NPVT, f"{cur} million")]),
        kort=(f"<p><b>{ps(Pn4, 4)}; NPV<sub>A</sub> = {m(NPVA)}; NPV<sub>T</sub> = {m(NPVT)}.</b> "
              f"A + T + S = {tall(V)}; P = {tall(V)}/{tall(NA + x, 4)}; NPV<sub>A</sub> = {tall(1 - y, 4)} × "
              f"{tall(V)} − {tall(VA)}.</p>"),
        losning=(f"<p>The merged firm is worth the two stand-alone values plus the synergies. Each group owns its "
                 f"fraction of that. Its NPV is what it owns afterwards minus what it owned before (the formula "
                 f"sheet's stock swap).</p>"
                 f"<p><b>Step 1: the merged firm.</b> A = {tall(NA)} × {tall(PA)} = {tall(VA)} and T = {tall(NT)} × "
                 f"{tall(PT)} = {tall(VT)}, so A + T + S = {tall(VA)} + {tall(VT)} + {tall(S)} = {tall(V)}.</p>"
                 f"<p><b>Step 2: the price.</b> {tall(V)}/({tall(NA)} + {tall(x, 4)}) = <b>{ps(Pn4, 4)}</b>.</p>"
                 f"<p><b>Step 3: the NPVs.</b> NPV<sub>A</sub> = (1 − y)(A + T + S) − A = {tall(1 - y, 4)} × "
                 f"{tall(V)} − {tall(VA)} = <b>{tall(NPVA, 2)}</b>. NPV<sub>T</sub> = y(A + T + S) − T = "
                 f"{tall(y, 4)} × {tall(V)} − {tall(VT)} = <b>{tall(NPVT, 2)}</b>.</p>"
                 f"<p><b>First check.</b> {tall(NPVA, 2)} + {tall(NPVT, 2)} = {tall(NPVA + NPVT, 2)} = S, but this "
                 f"holds for any y, so it only catches a slip in one line. <b>Second check.</b> N<sub>A</sub>(P − "
                 f"P<sub>A</sub>) = {tall(NA)} × ({tall(Pn4, 4)} − {tall(PA)}) = {tall(NA * (Pn4 - PA), 2)} = "
                 f"NPV<sub>A</sub>. It skips y, so a wrong y fails it.</p>"
                 f"<p><b>Remember:</b> the new shares are worth the merged price, not the acquirer's old price.</p>"),
        feller=_rens([
            Felle((VA + VT) / (NA + x), "You left out the synergies, which belong to the merged firm.", i=0),
            Felle(V / NA, "You divided by the old acquirer shares only, leaving out the new shares.", i=0),
            Felle(V / (NA + NT), "You added the target's old share count instead of the new shares.", i=0),
            Felle((1 - y) * (VA + VT) - VA, "You left out the synergies.", i=1),
            Felle(S - (x * PA - VT), "You valued the new shares at the acquirer's old price, as if the payment were "
                                     "cash.", i=1),
            Felle(x * PA - VT, "You valued the new shares at the acquirer's old price, before the merger.", i=2),
            Felle(y * (VA + VT) - VT, "You left out the synergies.", i=2),
        ], sv_b),
    )

    c_del = tall_del(
        "c", poeng=4,
        q=(f"<p>What is the highest exchange ratio the {A_} shareholders should accept? What is the lowest exchange "
           f"ratio the {T_} shareholders should accept?</p>"),
        selvstendig=True,
        svar=(sv_c := [T("Highest ER", ERmax), T("Lowest ER", ERmin)]),
        kort=(f"<p><b>Highest {tall(ERmax, 4)}, lowest {tall(ERmin, 4)}.</b> NPV<sub>A</sub> = 0: ER = "
              f"[(T + S)/A] × (N<sub>A</sub>/N<sub>T</sub>). NPV<sub>T</sub> = 0: ER = T × N<sub>A</sub>/"
              f"[(A + S) × N<sub>T</sub>].</p>"),
        losning=(f"<p>Each side says yes as long as its NPV is not negative. The highest ratio gives all the synergies "
                 f"to the target; the lowest gives them all to the acquirer.</p>"
                 f"<p><b>Step 1: the acquirer's limit.</b> NPV<sub>A</sub> ≥ 0 means x ≤ N<sub>A</sub>(T + S)/A "
                 f"(the formula sheet). So ER ≤ [({tall(VT)} + {tall(S)})/{tall(VA)}] × ({tall(NA)}/{tall(NT)}) = "
                 f"<b>{tall(ERmax, 4)}</b>.</p>"
                 f"<p><b>Step 2: the target's limit.</b> NPV<sub>T</sub> ≥ 0 means y(A + T + S) ≥ T, which gives "
                 f"x ≥ T × N<sub>A</sub>/(A + S). So ER ≥ {tall(VT)} × {tall(NA)}/[({tall(VA)} + {tall(S)}) × "
                 f"{tall(NT)}] = <b>{tall(ERmin, 4)}</b>.</p>"
                 f"<p><b>First check.</b> The offered {tall(ER, 4)} lies "
                 + ("between the two limits, so both sides gain, as (b) showed."
                    if ERmin < ER < ERmax else
                    "above the acquirer's limit, so the acquirer's shareholders lose, as (b) showed.")
                 + f" Without synergies both limits collapse to P<sub>T</sub>/P<sub>A</sub> = {tall(PT / PA, 4)}: "
                 f"there is then nothing to share.</p>"
                 f"<p><b>Remember:</b> the bargaining range for the exchange ratio exists only because of the "
                 f"synergies.</p>"),
        feller=_rens([
            Felle(PT / PA, "You left out the synergies.", i=0),
            Felle((VT + S) / VA, "You compared total values, but the exchange ratio is shares per share: the "
                                 "share counts are missing.", i=0),
            Felle(PT / PA, "You valued the new shares at the acquirer's old price, before the synergies.", i=1),
            Felle(VT / (VA + S), "You compared total values, but the exchange ratio is shares per share: the "
                                 "share counts are missing.", i=1),
        ], sv_c),
    )

    d_del = tekst_del(
        "d", poeng=4,
        q=(f"<p>{gen(T_)} board advertises the offer as a premium of {pst(prem_tilb, 2)} over the {T_} share price. Is "
           f"that the premium the {T_} shareholders actually receive? Explain the difference. What would happen to "
           f"each side's gain if the synergies turned out to be zero?</p>"),
        setninger="Answer in at most four sentences.",
        gitt=(f"<p>From (a) and (b): y = {tall(y, 4)}; the merged share price is {ps(Pn4, 4)}, NPV<sub>A</sub> = "
              f"{tall(NPVA, 2)} and NPV<sub>T</sub> = {tall(NPVT, 2)}.</p>"),
        kort=(f"<p>The {T_} shareholders are paid in {A_} shares worth {ps(Pn4, 2)}, not {ps(PA, 0)}, so the actual "
              f"premium is {tall(ER, 4)} × {tall(Pn4, 2)}/{tall(PT)} − 1 = {pst(prem_fakt4, 2)}, "
              + ("above" if over else "below")
              + f" the advertised {pst(prem_tilb, 2)}, because the deal "
              + ("raises" if over else "lowers")
              + f" the acquirer's share price (NPV<sub>A</sub> {'above' if over else 'below'} zero). With zero synergies the "
              f"merged price would be {ps(Pn0, 2)}: the {T_} shareholders would still gain {tall(NPVT0, 2)} million "
              f"while the {A_} shareholders would lose exactly that. The exchange ratio fixes the number of shares, not "
              f"their value, so the target shares the synergy risk.</p>"),
        losning=(f"<p><b>Offered against actual.</b> The offered premium values the new shares at the acquirer's "
                 f"price before the deal: {tall(ER, 4)} × {tall(PA)}/{tall(PT)} − 1 = {pst(prem_tilb, 2)}. The "
                 f"target's holders actually receive shares in the merged firm, worth {tall(Pn4, 4)} each, so they "
                 f"get {tall(ER, 4)} × {tall(Pn4, 4)}/{tall(PT)} − 1 = {pst(prem_fakt4, 2)}. Since NPV<sub>A</sub> = "
                 f"N<sub>A</sub>(P − P<sub>A</sub>), the actual premium exceeds the offered one exactly when the deal "
                 f"is good for the acquirer. Here it "
                 + ("is, so the target gets more than advertised." if over else
                    "is not: the acquirer overpays and the target is paid in shares the deal has devalued.")
                 + "</p>"
                 f"<p><b>Zero synergies.</b> The merged firm would be worth A + T = {tall(VA + VT)}, or "
                 f"{tall(Pn0, 4)} per share. The target's holders would get y × {tall(VA + VT)} − {tall(VT)} = "
                 f"{tall(NPVT0, 2)} and the acquirer's holders the opposite, {tall(-NPVT0, 2)}: a pure transfer through "
                 f"the premium. With shares, both sides lose some of their gain when the synergies fail; with cash, "
                 f"the acquirer would bear all of it.</p>"
                 f"<p><b>Typical mistakes:</b> valuing the new shares at the acquirer's old price, or saying the "
                 f"exchange ratio protects the target's value.</p>"
                 f"<p><b>Remember:</b> a stock offer fixes the number of shares; their value moves with the deal.</p>"),
        kriterier=[
            f"Computes the actual premium with the merged price: {tall(ER, 4)} × {tall(Pn4, 2)}/{tall(PT)} − 1 = "
            f"{pst(prem_fakt4, 2)}, against the advertised {pst(prem_tilb, 2)} (1 p)",
            "Explains the difference: the payment is in acquirer shares whose value the deal changes; the actual "
            "premium is " + ("higher" if over else "lower") + " because the deal "
            + ("raises" if over else "lowers") + " the acquirer's share price (1 p)",
            f"Zero synergies: the merged firm is worth A + T, so the target's holders still gain {tall(NPVT0, 2)} while "
            f"the acquirer's holders lose the same amount (1 p)",
            "States that with a stock offer the target's shareholders share the synergy risk, because the ratio fixes "
            "the number of shares and not their value (1 p)",
        ],
    )
    _sjekk(prem_fakt4, prem_fakt)
    return _ferdig("ov-ma1", ovelse(case, [a_del, b_del, c_del, d_del]), v["A"])


# ---------------------------------------------------------------------------
# ov-ma2 · Kontanter mot aksjer når synergiene er usikre
# ---------------------------------------------------------------------------
@oppgave("ov-ma2", tema="ma", tittel="Cash or shares when the synergies are uncertain", antall=12,
         sjanger="d3-aksjebytte", kilde="Lecture 12 cash against stock")
def _(r):
    v = _velg("ov-ma2", PAR, r, lambda z: z["A"])
    A_, T_, cur = v["A"], v["T"], v["cur"]
    NT, ER, k, mm, x, y, NA = _bytte(r)
    if NA == NT:
        raise Avvis("like aksjetall")
    PT, PA = _priser(r, ER, NA, NT, 0.1, 0.4)
    VA, VT = NA * PA, NT * PT
    pi = r.choice([0.5, 0.5, 0.6, 0.75, 0.4])
    Shi = round(r.choice([0.3, 0.4, 0.5, 0.6]) * VT / 10) * 10
    Slo = round(r.choice([0, 0, 0.1, 0.2]) * Shi / 10) * 10
    ES = pi * Shi + (1 - pi) * Slo
    if abs(ES - round(ES, 2)) > 1e-9 or Shi <= Slo:
        raise Avvis("forventede synergier er ikke pene")
    Pc = PT * (1 + r.choice([0.15, 0.2, 0.25, 0.3, 0.35]))
    Pc = rund(Pc, 0) if Pc > 20 else rund(Pc, 1)
    prem = Pc * NT - VT
    NPVAc, NPVTc = ES - prem, prem
    V = VA + VT + ES
    NPVAs, NPVTs = (1 - y) * V - VA, y * V - VT
    if min(NPVAc, NPVTc, NPVAs, NPVTs) <= 0.05 * ES:
        raise Avvis("et av budene er ikke godt for begge sider i forventning")
    Vlo = VA + VT + Slo
    NPVAc_lo = Slo - prem
    NPVAs_lo = (1 - y) * Vlo - VA
    NPVTs_lo = y * Vlo - VT
    if NPVAc_lo >= 0 or abs(NPVAs_lo) < 1 or abs(NPVTs_lo) < 1:
        raise Avvis("kontantbudet tåler skuffelsen, eller et svar er nesten null")
    ft = _forhold_tekst(ER, k, mm, A_, T_, r)
    fall_c, fall_s, fall_t = ES - Slo, (1 - y) * (ES - Slo), y * (ES - Slo)

    def m(z, d=2):
        return _m(z, d, cur)

    def ps(z, d=2):
        return penger(z, d, cur)

    lav = "nothing" if Slo == 0 else m(Slo, 0)
    case = (f"<p>{A_} ({tall(NA)} million shares at {ps(PA, 0)}) wants to acquire {T_} ({tall(NT)} million shares at "
            f"{ps(PT, 0)}). Both prices reflect the stand-alone values. The synergies are uncertain: they are worth "
            f"{m(Shi, 0)} with probability {tall(pi, 2)} and {lav} otherwise. Investors are risk neutral. All amounts "
            f"are present values. Nobody learns the size of the synergies until after the deal is done.</p>" +
            f"<p>{A_} considers two offers: {ps(Pc, 2 if Pc != int(Pc) else 0)} in cash per {T_} share, or new shares "
            f"where {ft}.</p>"
            f"<p>Give amounts in millions with two decimals.</p>")

    a_del = tall_del(
        "a", poeng=3,
        q="<p>Using the expected synergies, what is the NPV of the cash offer for each group of shareholders?</p>",
        svar=(sv_a := [T("NPV<sub>A</sub>, cash", NPVAc, f"{cur} million"),
                       T("NPV<sub>T</sub>, cash", NPVTc, f"{cur} million")]),
        kort=(f"<p><b>NPV<sub>A</sub> = {m(NPVAc)}, NPV<sub>T</sub> = {m(NPVTc)}.</b> E[S] = {tall(ES, 2)}; "
              f"P − T = {tall(Pc, 2)} × {tall(NT)} − {tall(VT)} = {tall(prem, 2)}; NPV<sub>A</sub> = S − (P − T).</p>"),
        losning=(f"<p>With cash, the target's holders get a fixed price and the acquirer's holders own the whole merged "
                 f"firm. The target gains the premium over its stand-alone value. The acquirer gains the synergies "
                 f"minus that premium.</p>"
                 f"<p><b>Step 1: expected synergies.</b> E[S] = {tall(pi, 2)} × {tall(Shi)} + {tall(1 - pi, 2)} × "
                 f"{tall(Slo)} = {tall(ES, 2)}.</p>"
                 f"<p><b>Step 2: the price and the premium.</b> P = {tall(Pc, 2)} × {tall(NT)} = "
                 f"{tall(Pc * NT, 2)} against T = {tall(VT)}, so P − T = {tall(prem, 2)}.</p>"
                 f"<p><b>Step 3: the NPVs.</b> NPV<sub>T</sub> = P − T = <b>{tall(NPVTc, 2)}</b>. NPV<sub>A</sub> = "
                 f"S − (P − T) = {tall(ES, 2)} − {tall(prem, 2)} = <b>{tall(NPVAc, 2)}</b>.</p>"
                 f"<p><b>First check.</b> The two NPVs add up to E[S] = {tall(ES, 2)}. This holds by construction, so "
                 f"it only catches slips.</p>"
                 f"<p><b>Remember:</b> the acquirer gains the synergies minus the premium, not the synergies minus "
                 f"the price.</p>"),
        feller=_rens([
            Felle(Shi - prem, "You used the high synergies, not the expected synergies.", i=0),
            Felle(ES - Pc * NT, "You subtracted the whole price, not just the premium over the target's value.", i=0),
            Felle(Pc * NT, "You took the whole price, not the gain over the target's stand-alone value.", i=1),
            Felle(Pc - PT, "This is a per-share amount, not the total for all the target's shareholders.", i=1),
        ], sv_a),
    )

    b_del = tall_del(
        "b", poeng=4,
        q="<p>Using the expected synergies, what is the NPV of the share offer for each group of shareholders?</p>",
        selvstendig=True,
        svar=(sv_b := [T("NPV<sub>A</sub>, shares", NPVAs, f"{cur} million"),
                       T("NPV<sub>T</sub>, shares", NPVTs, f"{cur} million")]),
        kort=(f"<p><b>NPV<sub>A</sub> = {m(NPVAs)}, NPV<sub>T</sub> = {m(NPVTs)}.</b> x = {tall(x, 4)}, y = "
              f"{tall(y, 4)}; A + T + E[S] = {tall(V, 2)}; NPV<sub>A</sub> = (1 − y)(A + T + S) − A.</p>"),
        losning=(f"<p>With shares, the target's holders become owners of the merged firm. Each side gets its "
                 f"fraction of A + T + S (the formula sheet's stock swap).</p>"
                 f"<p><b>Step 1: the new shares.</b> x = {tall(ER, 4)} × {tall(NT)} = {tall(x, 4)} million, so "
                 f"y = {tall(x, 4)}/({tall(NA)} + {tall(x, 4)}) = {tall(y, 4)}.</p>"
                 f"<p><b>Step 2: the merged firm.</b> A + T + E[S] = {tall(VA)} + {tall(VT)} + {tall(ES, 2)} = "
                 f"{tall(V, 2)}.</p>"
                 f"<p><b>Step 3: the NPVs.</b> NPV<sub>A</sub> = {tall(1 - y, 4)} × {tall(V, 2)} − {tall(VA)} = "
                 f"<b>{tall(NPVAs, 2)}</b>. NPV<sub>T</sub> = {tall(y, 4)} × {tall(V, 2)} − {tall(VT)} = "
                 f"<b>{tall(NPVTs, 2)}</b>.</p>"
                 f"<p><b>First check.</b> The sum is {tall(NPVAs + NPVTs, 2)} = E[S], an identity. A better check: "
                 f"the merged price is {tall(V / (NA + x), 4)}. Then {tall(NA)} × ({tall(V / (NA + x), 4)} − "
                 f"{tall(PA)}) = {tall(NA * (V / (NA + x) - PA), 2)} = NPV<sub>A</sub>, which a wrong y would "
                 f"fail.</p>"
                 f"<p><b>Remember:</b> the new shares are worth the merged price, which includes the synergies.</p>"),
        feller=_rens([
            Felle(ES - (x * PA - VT), "You valued the new shares at the acquirer's old price, as if they were cash.",
                  i=0),
            Felle((1 - y) * (VA + VT) - VA, "You left out the synergies.", i=0),
            Felle(x * PA - VT, "You valued the new shares at the acquirer's old price, before the merger.", i=1),
            Felle(y * (VA + VT) - VT, "You left out the synergies.", i=1),
        ], sv_b),
    )

    c_del = tall_del(
        "c", poeng=5,
        q=(f"<p>After the deal it turns out that the synergies are worth {lav}. What is the NPV for the {A_} "
           f"shareholders under the cash offer and under the share offer? What is the NPV for the {T_} shareholders "
           f"under the share offer?</p>"),
        gitt=f"<p>From (a) and (b): the cash premium is P − T = {tall(prem, 2)}; with shares y = {tall(y, 4)}.</p>",
        svar=(sv_c := [T("NPV<sub>A</sub>, cash", NPVAc_lo, f"{cur} million"),
                       T("NPV<sub>A</sub>, shares", NPVAs_lo, f"{cur} million"),
                       T("NPV<sub>T</sub>, shares", NPVTs_lo, f"{cur} million")]),
        kort=(f"<p><b>Cash {m(NPVAc_lo)}; shares {m(NPVAs_lo)}; target {m(NPVTs_lo)}.</b> Cash: {tall(Slo)} − "
              f"{tall(prem, 2)}. Shares: (1 − y) × {tall(Vlo)} − {tall(VA)} and y × {tall(Vlo)} − {tall(VT)}.</p>"),
        losning=(f"<p>The payment method decides who bears the shortfall when the synergies disappoint. A cash price is "
                 f"fixed, so the acquirer absorbs all of it. With shares the target's holders own y of the merged "
                 f"firm, so they absorb y of it.</p>"
                 f"<p><b>Step 1: cash.</b> NPV<sub>A</sub> = S − (P − T) = {tall(Slo)} − {tall(prem, 2)} = "
                 f"<b>{tall(NPVAc_lo, 2)}</b>. The target keeps its {tall(prem, 2)}.</p>"
                 f"<p><b>Step 2: shares.</b> The merged firm is now worth {tall(VA)} + {tall(VT)} + {tall(Slo)} = "
                 f"{tall(Vlo)}. NPV<sub>A</sub> = {tall(1 - y, 4)} × {tall(Vlo)} − {tall(VA)} = "
                 f"<b>{tall(NPVAs_lo, 2)}</b>. NPV<sub>T</sub> = {tall(y, 4)} × {tall(Vlo)} − {tall(VT)} = "
                 f"<b>{tall(NPVTs_lo, 2)}</b>.</p>"
                 f"<p><b>First check.</b> The shortfall is E[S] − S = {tall(ES - Slo, 2)}. With cash the acquirer's NPV "
                 f"falls by all of it ({tall(NPVAc, 2)} to {tall(NPVAc_lo, 2)}). With shares it falls by "
                 f"(1 − y) × {tall(ES - Slo, 2)} = {tall((1 - y) * (ES - Slo), 2)} and the target's by "
                 f"{tall(y * (ES - Slo), 2)}. These follow from the same formulas, so they catch slips only.</p>"
                 f"<p><b>Remember:</b> with cash the acquirer bears all of the synergy risk; with shares it is "
                 f"split y to the target and 1 − y to the acquirer.</p>"),
        feller=_rens([
            Felle(NPVAc, "You kept the expected synergies, which turned out lower.", i=0),
            Felle(Slo, "You left out the premium the acquirer has already paid.", i=0),
            Felle(NPVAs, "You kept the expected synergies, which turned out lower.", i=1),
            Felle(Slo - (x * PA - VT), "You treated the shares as cash at the acquirer's old price.", i=1),
            Felle(NPVTs, "You kept the expected synergies, which turned out lower.", i=2),
            Felle(NPVTc, "This is the target's NPV under the cash offer, not the share offer.", i=2),
        ], sv_c),
    )

    d_del = tekst_del(
        "d", poeng=4,
        q=(f"<p>Who bears the synergy risk under each offer? {gen(A_)} managers privately believe that their own shares "
           f"are overvalued. Which offer would they prefer? How would the market react to a share offer?</p>"),
        setninger="Answer in at most four sentences.",
        gitt=(f"<p>From (a) to (c): when the synergies disappoint, the acquirer's NPV falls by {tall(fall_c, 2)} with "
              f"cash ({tall(NPVAc, 2)} to {tall(NPVAc_lo, 2)}) and by {tall(fall_s, 2)} with shares ({tall(NPVAs, 2)} "
              f"to {tall(NPVAs_lo, 2)}).</p>"),
        kort=(f"<p>With cash the target gets a fixed price, so the acquirer bears all the synergy risk: its NPV falls by "
              f"the whole shortfall of {tall(fall_c, 2)}, against {tall(fall_s, 2)} with shares, where the target's "
              f"holders own {pst(y, 2)} of the merged firm and bear {tall(fall_t, 2)} of it. Managers who think their shares are overvalued "
              f"prefer to pay with them, because the true cost of a share offer is y times the true merged value, "
              f"which is lower than it looks. Investors know this, so a share offer signals overvaluation and the "
              f"acquirer's price falls on the announcement, as with an equity issue (Myers-Majluf).</p>"),
        losning=(f"<p><b>Risk.</b> A cash price is fixed whatever the synergies turn out to be, so every {_enhet(cur)} of "
                 f"shortfall falls on the acquirer's shareholders. Paying in shares makes the target's holders part "
                 f"owners: they carry the fraction y = {tall(y, 4)} of any surprise, good or bad. That is why stock is "
                 f"the natural payment when the synergies are uncertain. It is also why a seller who wants out takes "
                 f"cash while one who stays on as manager takes shares.</p>"
                 f"<p><b>Information.</b> The true cost of a share offer is y(A + T + S) − T at true values. If the "
                 f"acquirer's shares are overvalued, the merged firm is worth less than the market thinks, so the "
                 f"shares handed over are cheap currency. Managers who believe their shares are undervalued prefer "
                 f"cash. Rational investors read the choice: a share offer is bad news about the acquirer and its "
                 f"price falls on the announcement. This is the Myers-Majluf logic of an equity issue.</p>"
                 f"<p><b>Typical mistakes:</b> saying the target always prefers cash, or forgetting the market "
                 f"reaction.</p>"
                 f"<p><b>Remember:</b> cash puts all the synergy risk on the acquirer; shares share it and carry an "
                 f"overvaluation signal.</p>"),
        kriterier=[
            f"Cash: the price is fixed, so the acquirer's shareholders bear all the synergy risk: their NPV falls by the "
            f"whole shortfall of {tall(fall_c, 2)}, against {tall(fall_s, 2)} with shares (1 p)",
            f"Shares: the target's shareholders own y = {tall(y, 4)} of the merged firm and bear that part of the "
            f"shortfall, {tall(fall_t, 2)} (1 p)",
            "Managers who believe their shares are overvalued prefer the share offer, because the shares they hand over "
            "are worth less than the market thinks (1 p)",
            "Market reaction: a share offer signals that the acquirer's shares may be overvalued, so its price falls on "
            "the announcement (adverse selection, as in an equity issue) (1 p)",
        ],
    )
    return _ferdig("ov-ma2", ovelse(case, [a_del, b_del, c_del, d_del]), v["A"])


# ---------------------------------------------------------------------------
# ov-ma3 · Markedets sannsynlighet for avtalen med T i år, og fusjonsarbitrasje
# ---------------------------------------------------------------------------
@oppgave("ov-ma3", tema="ma", tittel="The deal probability the market implies", antall=12,
         sjanger="d3-deal", kilde="H2025 E6, Lecture 12 Mannesmann example")
def _(r):
    v = _velg("ov-ma3", PAR, r, lambda z: z["A"])
    A_, B_, cur = v["A"], v["T"], v["cur"]
    ER, k, mm = r.choice(FORHOLD)
    PA0 = r.choice([40, 50, 60, 75, 80, 90, 100, 120])
    kand = [pb for pb in range(10, 200) if 0.15 <= ER * PA0 / pb - 1 <= 0.45]
    if not kand:
        raise Avvis("ingen pen målkurs")
    PB0 = r.choice(kand)
    dA = r.choice([-0.06, -0.05, -0.04, -0.03, -0.02, 0.01, 0.02, 0.03])
    PA1 = rund(PA0 * (1 + dA), 1)
    rf = r.choice([0.02, 0.025, 0.03, 0.04, 0.05])
    M = r.choice([3, 6, 9, 18])
    Tt = M / 12
    f = (1 + rf) ** Tt
    f6 = rund(f, 6)
    tilbud = ER * PA1
    suksess = tilbud * f
    fiasko = suksess + PB0 - ER * PA0
    # Målkursen etter kunngjøringen er en pen kurs (som i H2025), så p blir skjev.
    steg = 0.5 if tilbud >= 20 else 0.1
    kandidater = []
    for i in range(1, 2000):
        PB1 = rund(PB0 + i * steg, 2)
        if PB1 > tilbud - 0.2:
            break
        pk = (PB1 * f - fiasko) / (suksess - fiasko)
        if 0.45 <= pk <= 0.95 and abs(pk * 20 - round(pk * 20)) > 0.08:
            kandidater.append(PB1)
    if not kandidater:
        raise Avvis("ingen pen målkurs gir en rimelig sannsynlighet")
    PB1 = r.choice(kandidater)
    p = (PB1 * f - fiasko) / (suksess - fiasko)
    spread = (tilbud - PB1) / PB1
    # vist og avrundet kjede
    suk4, fia4 = rund(tilbud * f6, 4), rund(tilbud * f6 + PB0 - ER * PA0, 4)
    _sjekk(suk4, suksess)
    _sjekk(fia4, fiasko)
    kost4 = rund(PB1 * f6, 4)
    p4 = rund((kost4 - fia4) / (suk4 - fia4), 4)
    _sjekk(p4, p, 0.001)
    As = (PA1 * f - (1 - p) * PA0) / p
    As4 = (rund(PA1 * f6, 4) - (1 - p4) * PA0) / p4
    _sjekk(As4, As)
    if abs(As - PA0) < 0.5 or (As - PA0) * (PA1 - PA0) <= 0:
        raise Avvis("kursen ved gjennomføring peker motsatt vei av kursreaksjonen")
    god = As > PA0
    # utsatt avgjørelse: ett år til, samme kurser
    T2 = Tt + 1
    f2 = (1 + rf) ** T2
    tap = ER * PA0 - PB0
    p2 = 1 - f2 * (tilbud - PB1) / tap
    if p2 < 0.1 or p - p2 < 0.005:
        raise Avvis("utsettelsen gir en urimelig sannsynlighet")
    # feller
    f1 = 1 + rf
    suk_1 = tilbud * f1
    fia_1 = suk_1 + PB0 - ER * PA0
    p_kost = (PB1 - fia4) / (suk4 - fia4)
    p_aar = (PB1 * f1 - fia4) / (suk4 - fia4)
    As_ingen = (PA1 - (1 - p) * PA0) / p
    ft = _forhold_tekst(ER, k, mm, A_, B_, r).replace("new ", "")
    mnd = {3: "three months", 6: "six months", 9: "nine months", 18: "eighteen months"}[M]
    mnd2 = {3: "fifteen months", 6: "eighteen months", 9: "twenty-one months", 18: "thirty months"}[M]
    retning = "fell" if PA1 < PA0 else "rose"

    def ps(z, d=2):
        return penger(z, d, cur)

    case = (f"<p>{A_} has announced a bid for {B_}. The bid came as a surprise. The deal will either be completed or "
            f"fail in exactly {mnd}. If it is completed, {ft}. If it fails, both share prices return to their levels "
            f"from before the announcement.</p>"
            f"<p>Before the announcement {A_} traded at {ps(PA0, 0)} and {B_} at {ps(PB0, 0)}. Right after it, "
            f"{A_} {retning} to {ps(PA1, 2)} and {B_} rose to {ps(PB1, 2)}. The annual risk-free rate is "
            f"{prosent_tekst(rf * 100, 1)}. Grow money at (1 + r<sub>f</sub>)<sup>T</sup>, with T in years, also "
            f"for parts of a year.</p>"
            f"<p>Give the probability with four decimals and prices with two.</p>")

    sv_a = [T("Offer value", tilbud, f"{cur} per share"), T("Deal spread", spread * 100, "%")]
    a_del = tall_del(
        "a", poeng=3,
        q=(f"<p>What is the offer worth per {B_} share at today's prices? How large is the deal spread, in percent of "
           f"{gen(B_)} share price?</p>"),
        svar=sv_a,
        kort=(f"<p><b>{ps(tilbud, 2)} and {pst(spread, 2)}.</b> {tall(ER, 4)} × {tall(PA1, 2)} = {tall(tilbud, 2)}; "
              f"({tall(tilbud, 2)} − {tall(PB1, 2)})/{tall(PB1, 2)}.</p>"),
        losning=(f"<p>The offer is paid in {A_} shares, so its value moves with {gen(A_)} share price. The deal spread "
                 f"is the gap between what the offer is worth and what {B_} trades at. It exists because the deal "
                 f"may fail.</p>"
                 f"<p><b>Step 1: the ratio.</b> One {B_} share becomes {tall(ER, 4)} {A_} shares.</p>"
                 f"<p><b>Step 2: the offer value.</b> {tall(ER, 4)} × {tall(PA1, 2)} = <b>{ps(tilbud, 2)}</b> per "
                 f"{B_} share, at {gen(A_)} price after the announcement.</p>"
                 f"<p><b>Step 3: the spread.</b> ({tall(tilbud, 2)} − {tall(PB1, 2)})/{tall(PB1, 2)} = "
                 f"<b>{pst(spread, 2)}</b>.</p>"
                 f"<p><b>First check.</b> {B_} trades between its old price {tall(PB0)} and the offer value "
                 f"{tall(tilbud, 2)}: the market thinks the deal will probably, but not surely, go through. A price "
                 f"above the offer would point to a higher bid to come.</p>"
                 f"<p><b>Remember:</b> value the offer at the acquirer's price today, not the price before the bid.</p>"),
        feller=_rens([
            Felle(ER * PA0, f"You used {gen(A_)} price from before the announcement.", i=0),
            Felle(PA1 / ER, "You turned the exchange ratio upside down.", i=0),
            Felle((tilbud - PB1) / tilbud * 100, "You measured the spread in percent of the offer value, not of the "
                                                 "target's price.", i=1),
            Felle((tilbud - PB0) / PB0 * 100, "This is the premium over the price before the bid, not the spread "
                                              "that is left today.", i=1),
        ], sv_a),
    )

    sv_b = [T("Payoff if completed", suksess, f"{cur} per position"),
            T("Payoff if failed", fiasko, f"{cur} per position")]
    b_del = tall_del(
        "b", poeng=4,
        q=(f"<p>A merger arbitrageur buys one {B_} share, shorts {tall(ER, 4)} {A_} shares and puts the proceeds of the "
           f"short sale in the bank at the risk-free rate until the deal is decided. What is the position worth when "
           f"the deal is decided, if it is completed and if it fails?</p>"),
        gitt=f"<p>From (a): the offer is worth {ps(tilbud, 2)} per {B_} share at today's prices.</p>",
        svar=sv_b,
        kort=(f"<p><b>{ps(suk4, 4)} and {ps(fia4, 4)}.</b> Deposit {tall(tilbud, 2)} × {tall(1 + rf, 3)}<sup>"
              f"{tall(Tt, 2)}</sup> = {tall(suk4, 4)}; fail: {tall(suk4, 4)} + {tall(PB0)} − {tall(ER, 4)} × "
              f"{tall(PA0)}.</p>"),
        losning=(f"<p>The position is built so that the deal outcome is the only risk left. If the deal goes through, "
                 f"the {B_} share turns into exactly the {A_} shares you owe. If it fails, both prices fall back to "
                 f"their old levels.</p>"
                 f"<p><b>Step 1: the deposit.</b> The short sale brings in {tall(ER, 4)} × {tall(PA1, 2)} = "
                 f"{tall(tilbud, 2)}. Over {mnd}, T = {tall(Tt, 2)}, so it grows to {tall(tilbud, 2)} × "
                 f"{tall(1 + rf, 3)}<sup>{tall(Tt, 2)}</sup> = {tall(tilbud, 2)} × {tall(f6, 6)} = "
                 f"{tall(suk4, 4)}.</p>"
                 f"<p><b>Step 2: completed.</b> The {B_} share becomes {tall(ER, 4)} {A_} shares, which close the "
                 f"short. You keep the deposit: <b>{ps(suk4, 4)}</b>.</p>"
                 f"<p><b>Step 3: failed.</b> You sell {B_} at {tall(PB0)} and buy back the {A_} shares at "
                 f"{tall(PA0)}: {tall(suk4, 4)} + {tall(PB0)} − {tall(ER, 4)} × {tall(PA0)} = "
                 f"<b>{ps(fia4, 4)}</b>.</p>"
                 f"<p><b>First check.</b> The two payoffs differ by {tall(ER, 4)} × {tall(PA0)} − {tall(PB0)} = "
                 f"{tall(tap, 2)}, the premium at the old prices: that is what the arbitrageur loses if the deal "
                 f"fails. It follows from the set-up, so it only catches slips.</p>"
                 f"<p><b>Remember:</b> in the failure branch use the prices from before the announcement.</p>"),
        feller=_rens([
            Felle(tilbud, "You left out the interest on the deposit.", i=0),
            Felle(suk_1, f"You grew the deposit for a full year instead of {mnd}.", i=0),
            Felle(suksess + PB1 - tilbud, "You used today's prices in the failure branch.", i=1),
            Felle(PB0 - ER * PA0, "You forgot the deposit.", i=1),
            Felle(fia_1, f"You grew the deposit for a full year instead of {mnd}.", i=1),
        ], sv_b),
    )

    sv_c = [T("p", p)]
    c_del = tall_del(
        "c", poeng=4,
        q="<p>What probability that the deal is completed do the market prices imply?</p>",
        gitt=f"<p>From (b): the position pays {ps(suk4, 4)} if the deal is completed and {ps(fia4, 4)} if it fails.</p>",
        svar=sv_c,
        kort=(f"<p><b>p = {tall(p4, 4)}.</b> The position costs {tall(PB1, 2)}, worth {tall(PB1, 2)} × "
              f"{tall(1 + rf, 3)}<sup>{tall(Tt, 2)}</sup> = {tall(kost4, 4)} at the decision: {tall(kost4, 4)} = "
              f"p × {tall(suk4, 4)} + (1 − p) × {tall(fia4, 4)}.</p>"),
        losning=(f"<p>Only the deal risk is left in the position. Discounting at r<sub>f</sub> makes p the "
                 f"risk-neutral probability of completion, the probability the market prices imply. The position "
                 f"costs what you pay for the {B_} share, since the short-sale proceeds sit in the bank.</p>"
                 f"<p><b>Step 1: the certainty equivalent of the cost.</b> {tall(PB1, 2)} × {tall(1 + rf, 3)}"
                 f"<sup>{tall(Tt, 2)}</sup> = {tall(PB1, 2)} × {tall(f6, 6)} = {tall(kost4, 4)}. Do not set the "
                 f"expected payoff equal to {tall(PB1, 2)}.</p>"
                 f"<p><b>Step 2: solve.</b> {tall(kost4, 4)} = p × {tall(suk4, 4)} + (1 − p) × {tall(fia4, 4)}, so "
                 f"p = ({tall(kost4, 4)} − {tall(fia4, 4)})/({tall(suk4, 4)} − {tall(fia4, 4)}) = "
                 f"{tall(kost4 - fia4, 4)}/{tall(suk4 - fia4, 4)} = <b>{tall(p4, 4)}</b>.</p>"
                 f"<p><b>First check: Kurbatov's self-financed version.</b> Short {tall(ER, 4)} {A_} shares for "
                 f"{tall(tilbud, 2)}, buy {B_} for {tall(PB1, 2)} and deposit the {tall(tilbud - PB1, 2)} left over. "
                 f"It costs 0 and pays {tall((tilbud - PB1) * f6, 4)} if completed and "
                 f"{tall((tilbud - PB1) * f6 - tap, 4)} if it fails, so p = "
                 f"{tall(tap - (tilbud - PB1) * f6, 4)}/{tall(tap, 4)} = "
                 f"{tall((tap - (tilbud - PB1) * f6) / tap, 4)}. It is the same position without the cash, so it "
                 f"catches slips, not a wrong set-up.</p>"
                 f"<p><b>What the spread pays for.</b> {gen(B_)} holders who sell now give up the spread to avoid the "
                 f"fall to {tall(PB0)} if the deal fails: the arbitrageur sells them insurance.</p>"
                 f"<p><b>Remember:</b> the cost grows at (1 + r<sub>f</sub>)<sup>T</sup> for the time until the deal "
                 f"is decided.</p>"),
        feller=_rens([
            Felle(p_kost, f"You set the expected payoff at the decision equal to today's cost of {tall(PB1, 2)}."),
            Felle(p_aar, f"You grew the cost for a full year instead of {mnd}."),
            Felle(1 - p, "This is the probability that the deal fails."),
        ], sv_c),
    )

    sv_d = [T(f"{A_} price if completed", As, f"{cur} per share")]
    d_del = blandet_del(
        "d", poeng=4, tall_poeng=2,
        q=(f"<p>Price {gen(A_)} share with the same probability. What price of {A_} when the deal is completed is "
           f"consistent with today's {ps(PA1, 2)}? What does the market think the deal does for {gen(A_)} "
           f"shareholders? How should they vote on it?</p>"),
        gitt=f"<p>From (c): p = {tall(p4, 4)}. The growth factor to the decision date is {tall(f6, 6)}.</p>",
        svar=sv_d,
        tekst_ledd=f"What does the market think the deal does for {gen(A_)} shareholders? How should they vote?",
        setninger="Answer in at most two sentences.",
        kort=(f"<p><b>{ps(As4, 2)}.</b> {tall(PA1, 2)} × {tall(f6, 6)} = {tall(p4, 4)} × A<sub>s</sub> + "
              f"{tall(1 - p4, 4)} × {tall(PA0)}. "
              + (f"Above the failure price {ps(PA0, 0)}, as the rise at the announcement suggested: the market sees "
                 f"the deal as creating value for {gen(A_)} shareholders, who should vote for it."
                 if god else
                 f"Below the failure price {ps(PA0, 0)}, as the fall at the announcement suggested: the market sees "
                 f"{A_} overpaying, so its shareholders should vote against.")
              + "</p>"),
        losning=(f"<p>{gen(A_)} share has the same two outcomes as the deal. Pricing it with the same p tells you what "
                 f"the market expects {A_} to be worth if the deal goes through.</p>"
                 f"<p><b>Step 1: grow today's price.</b> {tall(PA1, 2)} × {tall(f6, 6)} = "
                 f"{tall(PA1 * f6, 4)}.</p>"
                 f"<p><b>Step 2: solve.</b> {tall(PA1 * f6, 4)} = {tall(p4, 4)} × A<sub>s</sub> + {tall(1 - p4, 4)} × "
                 f"{tall(PA0)}, so A<sub>s</sub> = ({tall(PA1 * f6, 4)} − {tall((1 - p4) * PA0, 4)})/{tall(p4, 4)} = "
                 f"<b>{ps(As4, 2)}</b>.</p>"
                 f"<p><b>Step 3: read it.</b> If the deal fails, {A_} is back at {tall(PA0)}. "
                 + (f"Completion is worth {tall(As4 - PA0, 2)} more per share, in line with the rise in {gen(A_)} "
                    f"price at the announcement. The market sees a deal that creates value for {gen(A_)} "
                    f"shareholders. They should vote for it."
                    if god else
                    f"Completion is worth {tall(PA0 - As4, 2)} less per share, in line with the fall in {gen(A_)} "
                    f"price at the announcement. The market sees {A_} overpaying: empire building or hubris rather "
                    f"than synergies. {gen(A_)} shareholders should vote against, while the gain goes to the target's "
                    f"holders, who would get {tall(ER, 4)} × {tall(As4, 2)} = {tall(ER * As4, 2)} against "
                    f"{tall(PB0)}.")
                 + "</p>"
                 f"<p><b>First check.</b> {tall(p4, 4)} × {tall(As4, 4)} + {tall(1 - p4, 4)} × {tall(PA0)} = "
                 f"{tall(p4 * As4 + (1 - p4) * PA0, 4)}, which is {tall(PA1, 2)} grown at r<sub>f</sub>. It is the "
                 f"same equation, so it catches slips only.</p>"
                 f"<p><b>Remember:</b> compare the completion price with the failure price, not with today's "
                 f"price.</p>"),
        kriterier=[
            (f"Compares the completion price {tall(As4, 2)} with the failure price {tall(PA0)}: the market sees the deal "
             + ("as creating value for the acquirer's shareholders (1 p)" if god else
                "as destroying value for the acquirer's shareholders, who overpay (1 p)")),
            (f"Votes {'for' if god else 'against'} the deal as a {A_} shareholder, consistent with that reading (1 p)"),
        ],
        feller=_rens([
            Felle(PA1, "You used today's price."),
            Felle(As_ingen, "You mixed today's price with prices at the decision date."),
        ], sv_d),
    )

    e_del = tekst_del(
        "e", poeng=3,
        q=(f"<p>Suppose the deal will instead be decided {mnd2} from now while today's prices stay the same. Does the "
           f"implied probability of completion rise or fall? Explain why. Which assumption behind the calculation "
           f"does a longer delay make less realistic?</p>"),
        setninger="Answer in at most three sentences.",
        gitt=f"<p>From (a) and (c): the deal spread is {pst(spread, 2)} and p = {tall(p4, 4)}.</p>",
        kort=(f"<p>It falls, to about {tall(p2, 4)}: the expected loss if the deal fails must equal the deal spread "
              f"grown at r<sub>f</sub> until the decision, so a longer wait lets the same spread cover a larger "
              f"chance of failure. In symbols, 1 − p = (1 + r<sub>f</sub>)<sup>T</sup> × (offer value − "
              f"P<sub>B</sub>)/(ER × P<sub>A</sub> before − P<sub>B</sub> before), which rises with T. A longer delay "
              f"also strains the assumption that prices return to their old levels if the deal fails, since more "
              f"news arrives in the meantime.</p>"),
        losning=(f"<p><b>The mechanism.</b> In (c) the cost grown at r<sub>f</sub> equals the expected payoff. "
                 f"Rearranged, (1 − p) × ({tall(ER, 4)} × {tall(PA0)} − {tall(PB0)}) = (1 + r<sub>f</sub>)"
                 f"<sup>T</sup> × ({tall(tilbud, 2)} − {tall(PB1, 2)}): the expected loss if the deal fails equals the "
                 f"spread grown until the decision. The spread is collected up front in the deposit. It earns "
                 f"interest until the deal is decided. Over a longer wait it grows more, so the same prices are "
                 f"consistent with a larger chance of failure.</p>"
                 f"<p><b>The numbers.</b> Today: 1 − p = {tall(f6, 6)} × {tall(tilbud - PB1, 2)}/{tall(tap, 2)}, so "
                 f"p = {tall(p4, 4)}. Decided in {mnd2}: 1 − p = {tall(1 + rf, 3)}<sup>{tall(T2, 2)}</sup> × "
                 f"{tall(tilbud - PB1, 2)}/{tall(tap, 2)} = {tall(f2 * (tilbud - PB1) / tap, 4)}, so p falls to "
                 f"<b>{tall(p2, 4)}</b>.</p>"
                 f"<p><b>The assumptions.</b> The calculation assumes that prices return to their levels before the "
                 f"announcement if the deal fails and that nothing else happens to the two firms until the decision. "
                 f"The longer the wait, the more news arrives, from regulators, rival bidders and the market, so a "
                 f"failure would rarely bring prices back to exactly where they were. In practice a delay is itself "
                 f"news, so the prices would move too (Kurbatov's tail question: what if the deal is delayed?).</p>"
                 f"<p><b>Typical mistakes:</b> saying p rises because there is more time to complete the deal, or "
                 f"forgetting that the prices are held fixed.</p>"
                 f"<p><b>Remember:</b> the deal spread, grown at r<sub>f</sub>, prices the expected loss from a failed "
                 f"deal.</p>"),
        kriterier=[
            f"States that the implied probability falls, to about {tall(p2, 4)} (1 p)",
            "Explains why: the expected loss if the deal fails must equal the deal spread grown at r<sub>f</sub> until "
            "the decision, so a longer wait implies a larger chance of failure (1 p)",
            "Names an assumption that a delay strains: prices return to their old levels if the deal fails, or nothing "
            "else happens to the firms in the meantime (1 p)",
        ],
    )
    return _ferdig("ov-ma3", ovelse(case, [a_del, b_del, c_del, d_del, e_del]), v["A"])


# ---------------------------------------------------------------------------
# ov-ma4 · Koforsikring: risikabel gjeld i to tilstander
# ---------------------------------------------------------------------------
KOFORS = [
    dict(A="Nordlys Shipping ASA", B="Solberg Hotels ASA", cur="NOK"),
    dict(A="Fjellvind Energy ASA", B="Havbris Retail ASA", cur="NOK"),
    dict(A="Brenna Mining ASA", B="Strandli Foods ASA", cur="NOK"),
    dict(A="Kaldvik Oil Service ASA", B="Grønnli Airlines ASA", cur="NOK"),
    dict(A="Ironclad Steel Inc", B="Sunbelt Travel Inc", cur="$"),
    dict(A="Copper Basin Mining Inc", B="Meadowbrook Grocers Inc", cur="$"),
    dict(A="Gulfstream Drilling Inc", B="Lakeside Leisure Inc", cur="$"),
    dict(A="Northstar Chemicals Inc", B="Bayview Apparel Inc", cur="$"),
]


@oppgave("ov-ma4", tema="ma", tittel="Coinsurance: a merger without synergies", antall=12,
         sjanger="d3-gjeld", kilde="V2024 P4, Lecture 12 coinsurance example")
def _(r):
    v = _velg("ov-ma4", KOFORS, r, lambda z: z["A"])
    A_, B_, cur = v["A"], v["B"], v["cur"]
    FA = r.choice([20, 30, 40, 50, 60])
    a1, a2 = FA + r.choice([10, 20, 30, 40, 50]), FA - r.choice([5, 10, 15, 20])
    FB = r.choice([10, 15, 20, 25, 30])
    b1, b2 = FB - r.choice([5, 10]), FB + r.choice([10, 20, 30])
    pi = r.choice([0.5, 0.5, 0.4, 0.6])
    if a2 < 5 or b1 < 0:
        raise Avvis("negativ verdi")
    VA, VB = pi * a1 + (1 - pi) * a2, pi * b1 + (1 - pi) * b2
    DA, EA = pi * FA + (1 - pi) * a2, pi * (a1 - FA)
    DB, EB = pi * b1 + (1 - pi) * FB, (1 - pi) * (b2 - FB)
    v1, v2, F = a1 + b1, a2 + b2, FA + FB
    DAB = pi * min(v1, F) + (1 - pi) * min(v2, F)
    EAB = pi * max(v1 - F, 0) + (1 - pi) * max(v2 - F, 0)
    dD = DAB - DA - DB
    if dD < 1 or EAB < 1:
        raise Avvis("for liten overføring eller ingen egenkapital igjen")
    sA = EA / (EA + EB)
    dEA, dEB = sA * EAB - EA, (1 - sA) * EAB - EB
    if min(abs(dEA), abs(dEB)) < 0.3:
        raise Avvis("et tap er nesten null")
    risikofri = min(v1, v2) >= F
    # feller
    f_vA = VA / (VA + VB)
    f_dEA_v, f_dEB_v = f_vA * EAB - EA, (1 - f_vA) * EAB - EB

    def m(z, d=2):
        return _m(z, d, cur)

    sann = ("Both states are equally likely" if pi == 0.5 else
            f"State 1 has probability {tall(pi, 2)} and state 2 probability {tall(1 - pi, 2)}")
    case = (f"<p>{A_} and {B_} each have zero-coupon debt that matures in one year. Next year the economy is in one of "
            f"two states. {sann}. The values of the firms' assets next year are (in {cur} million):</p>"
            f"<table><tr><th>State</th><th>{A_}</th><th>{B_}</th></tr>"
            f"<tr><td>1</td><td>{tall(a1)}</td><td>{tall(b1)}</td></tr>"
            f"<tr><td>2</td><td>{tall(a2)}</td><td>{tall(b2)}</td></tr></table>"
            f"<p>The face value of {gen(A_)} debt is K<sub>A</sub> = {tall(FA)} and of {gen(B_)} debt "
            f"K<sub>B</sub> = {tall(FB)}. Investors are risk "
            f"neutral and the risk-free rate is zero, so a value today is the expected value next year.</p>"
            f"<p>The two firms consider a merger without synergies: the merged firm's assets are the sum of the two in "
            f"each state. Both debts become claims of equal priority on the merged firm. The shareholders of each "
            f"firm receive a share of the merged equity in proportion to their equity values before the merger.</p>"
            f"<p>Give amounts in millions with two decimals.</p>")

    a_del = tall_del(
        "a", poeng=3,
        q=f"<p>Before the merger, what is the market value of {gen(A_)} debt and of {gen(B_)} debt?</p>",
        svar=(sv_a := [T(f"D, {A_}", DA, f"{cur} million"), T(f"D, {B_}", DB, f"{cur} million")]),
        kort=(f"<p><b>{m(DA)} and {m(DB)}.</b> {A_}: {tall(pi, 2)} × {tall(FA)} + {tall(1 - pi, 2)} × {tall(a2)}. "
              f"{B_}: {tall(pi, 2)} × {tall(b1)} + {tall(1 - pi, 2)} × {tall(FB)}.</p>"),
        losning=(f"<p>Debt gets the face value K if the firm can pay and the whole firm if it cannot: min(V, K) state "
                 f"by state. Equity gets what is left, max(V − K, 0). Value the claims state by state before "
                 f"averaging.</p>"
                 f"<p><b>Step 1: {A_}.</b> State 1: {tall(a1)} ≥ {tall(FA)}, debt gets {tall(FA)}. State 2: "
                 f"{tall(a2)} is below {tall(FA)}, debt gets {tall(a2)}. D = {tall(pi, 2)} × {tall(FA)} + {tall(1 - pi, 2)} "
                 f"× {tall(a2)} = <b>{tall(DA, 2)}</b>; equity {tall(EA, 2)}.</p>"
                 f"<p><b>Step 2: {B_}.</b> State 1: {tall(b1)} is below {tall(FB)}, debt gets {tall(b1)}. State 2: debt gets "
                 f"{tall(FB)}. D = {tall(pi, 2)} × {tall(b1)} + {tall(1 - pi, 2)} × {tall(FB)} = "
                 f"<b>{tall(DB, 2)}</b>; equity {tall(EB, 2)}.</p>"
                 f"<p><b>First check.</b> D + E = V for each firm: {tall(DA, 2)} + {tall(EA, 2)} = {tall(VA, 2)} and "
                 f"{tall(DB, 2)} + {tall(EB, 2)} = {tall(VB, 2)}. It is an identity, but it catches a state valued "
                 f"wrongly. Note that each firm defaults in a different state.</p>"
                 f"<p><b>Remember:</b> apply min and max in each state first, then take the expectation.</p>"),
        feller=_rens([
            Felle(FA, "You valued the debt at face value, as if it were paid in full in both states.", i=0),
            Felle(VA, "This is the value of the whole firm, not of its debt.", i=0),
            Felle(min(VA, FA), "You averaged the firm values first and then compared with the face value. Debt is "
                               "valued state by state.", i=0),
            Felle(FB, "You valued the debt at face value, as if it were paid in full in both states.", i=1),
            Felle(VB, "This is the value of the whole firm, not of its debt.", i=1),
            Felle(min(VB, FB), "You averaged the firm values first and then compared with the face value. Debt is "
                               "valued state by state.", i=1),
        ], sv_a),
    )

    b_del = tall_del(
        "b", poeng=4,
        q="<p>After the merger, what are the market values of the merged firm's debt and equity?</p>",
        selvstendig=True,
        svar=(sv_b := [T("D, merged", DAB, f"{cur} million"), T("E, merged", EAB, f"{cur} million")]),
        kort=(f"<p><b>D = {m(DAB)}, E = {m(EAB)}.</b> Assets {tall(v1)} and {tall(v2)} against face value "
              f"{tall(F)}: debt {tall(min(v1, F))} and {tall(min(v2, F))}.</p>"),
        losning=(f"<p>The merged firm pools the assets. Both groups of creditors now have a claim on the pool. "
                 f"Add the assets state by state before you value the claims.</p>"
                 f"<p><b>Step 1: the merged firm.</b> State 1: {tall(a1)} + {tall(b1)} = {tall(v1)}. State 2: "
                 f"{tall(a2)} + {tall(b2)} = {tall(v2)}. Face value K = {tall(FA)} + {tall(FB)} = {tall(F)}.</p>"
                 f"<p><b>Step 2: debt.</b> It gets {tall(min(v1, F))} in state 1 and {tall(min(v2, F))} in state 2, so "
                 f"D = {tall(pi, 2)} × {tall(min(v1, F))} + {tall(1 - pi, 2)} × {tall(min(v2, F))} = "
                 f"<b>{tall(DAB, 2)}</b>. "
                 + ("The merged firm can pay in both states: the debt is now risk-free."
                    if risikofri else "The merged firm still defaults in one state, but less deeply.")
                 + "</p>"
                 f"<p><b>Step 3: equity.</b> E = {tall(pi, 2)} × {tall(max(v1 - F, 0))} + {tall(1 - pi, 2)} × "
                 f"{tall(max(v2 - F, 0))} = <b>{tall(EAB, 2)}</b>.</p>"
                 f"<p><b>First check.</b> {tall(DAB, 2)} + {tall(EAB, 2)} = {tall(DAB + EAB, 2)}, the sum of the "
                 f"two firms, {tall(VA, 2)} + {tall(VB, 2)}: no value is created without synergies. The split has "
                 f"moved: debt was worth {tall(DA + DB, 2)} in total before.</p>"
                 f"<p><b>Remember:</b> pool the assets first, then apply min and max.</p>"),
        feller=_rens([
            Felle(DA + DB, "You added the two debt values from before the merger.", i=0),
            Felle(min(VA + VB, F), "You averaged first and then compared with the face value.", i=0),
            Felle(F, "You valued the debt at face value, but the merged firm cannot pay it in full in every state.",
                  i=0) if min(v1, v2) < F else None,
            Felle(EA + EB, "You added the two equity values from before the merger.", i=1),
            Felle(max(VA + VB - F, 0), "You averaged first and then subtracted the face value.", i=1),
        ], sv_b),
    )

    c_del = blandet_del(
        "c", poeng=5, tall_poeng=3,
        q=(f"<p>By how much does the merger change the wealth of {gen(A_)} shareholders and of {gen(B_)} "
           f"shareholders? Who gains? Would the shareholders vote for the merger?</p>"),
        gitt=(f"<p>From (a) and (b): before the merger the equity of {A_} is worth {tall(EA, 2)} and the equity of "
              f"{B_} {tall(EB, 2)}. The merged equity is worth {tall(EAB, 2)}; the merged debt {tall(DAB, 2)} against "
              f"{tall(DA + DB, 2)} before.</p>"),
        svar=(sv_c := [T(f"Change, {A_} shareholders", dEA, f"{cur} million", abs=0.02),
              T(f"Change, {B_} shareholders", dEB, f"{cur} million", abs=0.02)]),
        tekst_ledd="Who gains? Would the shareholders vote for the merger?",
        setninger="Answer in at most two sentences.",
        kort=(f"<p><b>{m(dEA)} and {m(dEB)}.</b> Shares {tall(EA, 2)}/{tall(EA + EB, 2)} = {tall(sA, 4)} and "
              f"{tall(1 - sA, 4)} of {tall(EAB, 2)}. The creditors gain {tall(dD, 2)}, exactly what the shareholders "
              f"lose, so both groups of shareholders vote against.</p>"),
        losning=(f"<p>Total value is unchanged, so any gain for one claim is a loss for another. Split the merged "
                 f"equity as the case says and compare.</p>"
                 f"<p><b>Step 1: the split.</b> {A_} gets {tall(EA, 2)}/({tall(EA, 2)} + {tall(EB, 2)}) = "
                 f"{tall(sA, 4)} of the merged equity, {B_} gets {tall(1 - sA, 4)}.</p>"
                 f"<p><b>Step 2: the changes.</b> {A_}: {tall(sA, 4)} × {tall(EAB, 2)} − {tall(EA, 2)} = "
                 f"<b>{tall(dEA, 2)}</b>. {B_}: {tall(1 - sA, 4)} × {tall(EAB, 2)} − {tall(EB, 2)} = "
                 f"<b>{tall(dEB, 2)}</b>.</p>"
                 f"<p><b>Step 3: who gains.</b> The creditors: {tall(DAB, 2)} − {tall(DA + DB, 2)} = "
                 f"{tall(dD, 2)}.</p>"
                 f"<p><b>Check 4.</b> Creditors' gain {tall(dD, 2)} = shareholders' loss "
                 f"{tall(-(dEA + dEB), 2)}, as it must be when total value is fixed. This check fails if a claim is "
                 f"valued wrongly. Both groups of shareholders lose, so they would vote against. No exchange ratio can "
                 f"fix it: it only splits a smaller equity pie.</p>"
                 f"<p><b>Remember:</b> with no synergies, a merger that makes debt safer is a wealth transfer from "
                 f"shareholders to creditors.</p>"),
        kriterier=[
            f"States that the creditors gain {tall(dD, 2)}, exactly the shareholders' total loss, since the merger "
            f"creates no value (Check 4) (1 p)",
            "Concludes that both groups of shareholders lose and would vote against; no exchange ratio can fix that "
            "(1 p)",
        ],
        feller=_rens([
            Felle(f_dEA_v, "You split the merged equity by firm values, not by equity values.", i=0),
            Felle(EAB - EA - EB, "This is the loss of all shareholders together, not of one group.",
                  i=0),
            Felle(dD, "This is the creditors' gain, not the shareholders' change.", i=0),
            Felle(f_dEB_v, "You split the merged equity by firm values, not by equity values.", i=1),
            Felle(EAB - EA - EB, "This is the loss of all shareholders together, not of one group.",
                  i=1),
        ], sv_c),
    )

    d_del = tekst_del(
        "d", poeng=4,
        q=("<p>Explain the effect at work. Why do the creditors gain although the merger creates no value? Is lower risk "
           "a good reason for the shareholders to merge?</p>"),
        setninger="Answer in at most four sentences.",
        gitt=(f"<p>From (b) and (c): the debt rises from {tall(DA + DB, 2)} to {tall(DAB, 2)}; the shareholders "
              f"lose the same {tall(dD, 2)}.</p>"),
        kort=(f"<p>This is coinsurance: after the merger each firm's assets also back the other firm's debt, so the "
              f"creditors are repaid more often. The old debt was priced as risky before the merger, so the creditors "
              f"collect a safer claim at no cost: a wealth transfer of {tall(dD, 2)} from the shareholders. In option "
              f"terms, equity is a call on the assets: two calls on separate firms are worth more than one call on "
              f"the pool. Lower risk is no reason to merge, since shareholders diversify more cheaply themselves; "
              f"they gain only if the merged firm re-levers, for example by borrowing more and paying it out.</p>"),
        losning=(f"<p><b>The mechanism.</b> Before the merger neither firm guarantees the other's debt: in the state "
                 f"where one firm fails, its creditors take a loss while the other firm's shareholders keep their "
                 f"surplus. After the merger the surplus of one firm covers the shortfall of the other. The "
                 f"creditors are paid more often, so the debt is worth more.</p>"
                 f"<p><b>Why it is a transfer.</b> The firm as a whole is worth the same, since there are no "
                 f"synergies. The creditors bought their bonds at a price for risky debt. That price was set "
                 f"before the merger. When the debt becomes safer, its value rises by {tall(dD, 2)} and the equity "
                 f"falls by the same amount. Kurbatov's key word is wealth transfer.</p>"
                 f"<p><b>The option view.</b> Equity is a call on the assets struck at the face value K. Two separate "
                 f"calls let the shareholders keep the upside in one firm while walking away from the other; one call "
                 f"on the sum cannot do that.</p>"
                 f"<p><b>As a motive.</b> Diversification lowers risk, but shareholders can diversify on their own "
                 f"and idiosyncratic risk is not priced. The lower risk only helps creditors, unless the merged firm "
                 f"re-levers (borrows more and pays out the proceeds, also gaining a larger tax shield).</p>"
                 f"<p><b>Typical mistakes:</b> calling lower risk a gain for shareholders, or naming coinsurance "
                 f"without saying why the creditors gain.</p>"
                 f"<p><b>Remember:</b> coinsurance moves value to the creditors; it creates none.</p>"),
        kriterier=[
            "Names coinsurance (mutual guarantee): after the merger each firm's assets back the other's debt, so the "
            "debt defaults less often (1 p)",
            "Explains the transfer: the old debt was priced as risky before the merger, so its gain is a wealth "
            "transfer from the shareholders, with total value unchanged (1 p)",
            "Uses the option view: equity is a call, so separate calls on two firms are worth more than one call on "
            "the combined firm (1 p)",
            "Concludes that lower risk is not a valid motive for shareholders, who diversify themselves; credit for "
            "re-levering or covenants as the way to recapture the transfer (1 p)",
        ],
    )
    return _ferdig("ov-ma4", ovelse(case, [a_del, b_del, c_del, d_del]), v["A"])


# ---------------------------------------------------------------------------
# ov-ma5 · Budkamp: betalingsvilje avhenger av alternativet
# ---------------------------------------------------------------------------
BANKER = [
    dict(b=["Fjordbanken ASA", "Kystbank ASA", "Vidda Sparebank"], d="Dalen Bank ASA", cur="NOK"),
    dict(b=["Nordkapp Bank ASA", "Skagerak Bank ASA", "Trøndelag Sparebank"], d="Elvebredden Bank AS", cur="NOK"),
    dict(b=["Harbor Trust Bank", "Prairie National Bank", "Summit Savings Bank"], d="Riverside Bank", cur="$"),
    dict(b=["Granite State Bank", "Pacific Crest Bank", "Old Mill Bancorp"], d="Valley Community Bank", cur="$"),
]


@oppgave("ov-ma5", tema="ma", tittel="A bidding contest: what each bidder will pay", antall=12,
         sjanger="d3-aksjebytte", kilde="Lecture 12 bank D bidding example")
def _(r):
    v = _velg("ov-ma5", BANKER, r, lambda z: z["d"])
    navn = list(v["b"])
    r.shuffle(navn)
    D_, cur = v["d"], v["cur"]
    for _ in range(60):
        VD = r.choice([40, 50, 60, 80])
        Vb = r.sample([70, 80, 90, 100, 110, 120, 150], 3)
        S = [r.choice([20, 25, 30, 40, 50, 60]) for _ in range(3)]
        L = [r.choice([5, 10, 15, 20]) for _ in range(3)]
        W0 = [VD + S[i] for i in range(3)]
        W1 = [VD + S[i] + L[i] for i in range(3)]
        rang = sorted(range(3), key=lambda i: -W1[i])
        if W1[rang[0]] - W1[rang[1]] < 5 or W1[rang[1]] - W1[rang[2]] < 3:
            continue
        w, nr2 = rang[0], rang[1]
        P = W1[nr2]
        Gw = VD + S[w] - P
        GD = P - VD
        VC = [S[i] - sum(L[j] for j in range(3) if j != i) for i in range(3)]
        if abs(Gw) < 2 or VC[w] < 10:
            continue
        break
    else:
        raise Avvis("fant ingen ryddig budkamp")

    def m(z, d=0):
        return _m(z, d, cur)

    rader = ""
    for i in range(3):
        celler = "".join(f"<td>{tall(Vb[i] + VD + S[i]) if j == i else tall(Vb[i] - L[i])}</td>" for j in range(3))
        rader += f"<tr><td>{navn[i]}</td><td>{tall(Vb[i])}</td>{celler}</tr>"
    rader += f"<tr><td>{D_}</td><td>{tall(VD)}</td>" + "<td>0</td>" * 3 + "</tr>"
    hode = "".join(f"<th>If {navn[j]} buys</th>" for j in range(3))
    case = (f"<p>Three banks, {navn[0]}, {navn[1]} and {navn[2]}, are interested in buying {D_}. The table shows the "
            f"value of each bank (in {cur} million) on its own and if each of the three buys {D_}, before the price "
            f"for {D_} is paid. A bank's value falls when a rival buys {D_}, because the rival becomes a stronger "
            f"competitor.</p>"
            f"<table><tr><th>Bank</th><th>On its own</th>{hode}</tr>{rader}</table>"
            f"<p>The banks know all these values. Amounts are in {cur} million.</p>")

    a_del = tall_del(
        "a", poeng=3,
        q=f"<p>If the alternative is that nobody buys {D_}, what is the most each bank would pay for {D_}?</p>",
        svar=(sv_a := [T(navn[i], W0[i], f"{cur} million") for i in range(3)]),
        kort=(f"<p><b>{', '.join(f'{navn[i]} {tall(W0[i])}' for i in range(3))}.</b> Value if it buys minus value on "
              f"its own: " + "; ".join(f"{tall(Vb[i] + VD + S[i])} − {tall(Vb[i])}" for i in range(3)) + ".</p>")
        .replace(f", {navn[2]} {tall(W0[2])}", f" and {navn[2]} {tall(W0[2])}"),
        losning=(f"<p>A bank pays at most what buying {D_} adds to its own value, compared with its alternative. Here "
                 f"the alternative is that nothing happens.</p>"
                 + "".join(f"<p><b>Step {i + 1}: {navn[i]}.</b> {tall(Vb[i] + VD + S[i])} − {tall(Vb[i])} = "
                           f"<b>{tall(W0[i])}</b>: {gen(D_)} own value {tall(VD)} plus synergies of "
                           f"{tall(S[i])}.</p>" for i in range(3))
                 + f"<p><b>First check.</b> Each limit is above {gen(D_)} stand-alone value of {tall(VD)}, as it must "
                 f"be when the synergies are positive. It is the same subtraction, so it catches slips only.</p>"
                 f"<p><b>Remember:</b> the most you pay is your value if you win minus your value if you do not.</p>"),
        feller=_rens([Felle(S[i], f"You counted only the synergies, without {gen(D_)} stand-alone value.", i=i)
                      for i in range(3)]
                     + [Felle(Vb[i] + VD + S[i], "This is the bank's value after buying, not what buying adds.", i=i)
                        for i in range(3)],
                     sv_a),
    )

    b_del = tall_del(
        "b", poeng=4,
        q=(f"<p>The owners of {D_} have decided to sell it to one of the three banks. What is the most each bank would "
           f"now pay?</p>"),
        selvstendig=True,
        svar=(sv_b := [T(navn[i], W1[i], f"{cur} million") for i in range(3)]),
        kort=(f"<p><b>{', '.join(f'{navn[i]} {tall(W1[i])}' for i in range(3))}.</b> Value if it buys minus value if a "
              f"rival buys: " + "; ".join(f"{tall(Vb[i] + VD + S[i])} − {tall(Vb[i] - L[i])}" for i in range(3))
              + ".</p>").replace(f", {navn[2]} {tall(W1[2])}", f" and {navn[2]} {tall(W1[2])}"),
        losning=(f"<p>Now the alternative to winning is not the status quo: if a bank does not buy {D_}, a rival "
                 f"will. Its reservation price is its value if it wins minus its value if a rival wins (Kurbatov, "
                 f"lecture 12).</p>"
                 + "".join(f"<p><b>Step {i + 1}: {navn[i]}.</b> {tall(Vb[i] + VD + S[i])} − {tall(Vb[i] - L[i])} = "
                           f"<b>{tall(W1[i])}</b>: the {tall(W0[i])} from winning plus the {tall(L[i])} it avoids "
                           f"losing.</p>" for i in range(3))
                 + f"<p><b>First check.</b> Each limit exceeds the one in (a) by exactly the bank's loss when a rival "
                 f"wins. The fear of the rival, not the synergy alone, drives the bids up.</p>"
                 f"<p><b>Remember:</b> when the target will be sold anyway, compare winning with losing, not with "
                 f"no deal.</p>"),
        feller=_rens([Felle(W0[i], f"You compared with no deal, but {D_} will be sold anyway.", i=i) for i in range(3)]
                     + [Felle(VD + S[i] - L[i], "You subtracted the loss from a rival winning instead of adding it.",
                              i=i) for i in range(3)],
                     sv_b),
    )

    c_del = blandet_del(
        "c", poeng=5, tall_poeng=3,
        q=(f"<p>{D_} is sold in an ascending auction. The price rises until one bank is left. That bank pays the "
           f"highest price the last rival would pay. At what price is {D_} sold? How much does the winning bank gain "
           f"compared with its value on its own? How much do {gen(D_)} shareholders gain compared with its value on "
           f"its own? Which bank wins and why?</p>"),
        gitt=(f"<p>From (b): the reservation prices are " + ", ".join(f"{navn[i]} {tall(W1[i])}" for i in range(3))
              + ".</p>").replace(f", {navn[2]} {tall(W1[2])}", f" and {navn[2]} {tall(W1[2])}"),
        svar=(sv_c := [T("Price", P, f"{cur} million"), T("Winner's gain", Gw, f"{cur} million", abs=0.05),
              T(f"Gain to {gen(D_)} shareholders", GD, f"{cur} million")]),
        tekst_ledd="Which bank wins and why?",
        setninger="Answer in at most two sentences.",
        kort=(f"<p><b>Price {tall(P)}; winner {tall(Gw)}; {D_} {tall(GD)}.</b> {navn[w]} has the highest limit: it "
              f"gains {tall(W0[w])} by winning and avoids losing {tall(L[w])}. It pays {gen(navn[nr2])} limit, "
              f"{tall(P)}. Gain {tall(Vb[w] + VD + S[w])} − {tall(P)} − {tall(Vb[w])}; {D_}: {tall(P)} − "
              f"{tall(VD)}.</p>"),
        losning=(f"<p>In an ascending auction the bank with the highest reservation price wins. It only has to beat "
                 f"the second-highest, so that is the price.</p>"
                 f"<p><b>Step 1: the winner and the price.</b> {navn[w]} has the highest limit, {tall(W1[w])}. "
                 f"{navn[nr2]} drops out at {tall(P)}, so {D_} sells for <b>{tall(P)}</b>.</p>"
                 f"<p><b>Step 2: the winner's gain.</b> {tall(Vb[w] + VD + S[w])} − {tall(P)} − {tall(Vb[w])} = "
                 f"<b>{tall(Gw)}</b>. "
                 + (f"It ends up worse off than before the contest, but {tall(Vb[w] + VD + S[w] - P - (Vb[w] - L[w]))} "
                    f"better off than if a rival had won." if Gw < 0 else
                    f"It keeps part of its synergies and avoids the loss of {tall(L[w])} from a rival winning.")
                 + "</p>"
                 f"<p><b>Step 3: the target's gain.</b> {tall(P)} − {tall(VD)} = <b>{tall(GD)}</b>, a premium of "
                 f"{pst(GD / VD, 2)}.</p>"
                 f"<p><b>First check.</b> The winner pays at most its own limit, {tall(W1[w])} ≥ {tall(P)}, so it does "
                 f"stay in. This comparison could fail if you picked the wrong winner.</p>"
                 f"<p><b>Remember:</b> the winner is the bank that gains most from winning plus loses most from losing. "
                 f"It pays the runner-up's limit.</p>"),
        kriterier=[
            f"Names {navn[w]} as the winner, because it has the highest reservation price ({tall(W1[w])}) (1 p)",
            f"Explains why its limit ({tall(W1[w])}) exceeds its value against no deal ({tall(W0[w])}): it also avoids "
            f"losing {tall(L[w])} if a rival wins (1 p)",
        ],
        feller=_rens([
            Felle(W1[w], "This is the winner's own reservation price, not the price at which the auction ends.", i=0),
            Felle(sorted(W0)[-2], "You used the limits against no deal.", i=0),
            Felle(Vb[w] + VD + S[w] - P - (Vb[w] - L[w]), "You measured the gain against the value if a rival wins, "
                                                           "not against the value on its own.", i=1),
            Felle(VD + S[w], "You left out the price the winner pays.", i=1),
            Felle(P, f"You left out {gen(D_)} stand-alone value.", i=2),
        ], sv_c),
    )

    rivaler = [j for j in range(3) if j != w]
    tap_r = sum(L[j] for j in rivaler)
    d_del = tekst_del(
        "d", poeng=4,
        q=(f"<p>How much total value does the acquisition create for the four banks together? Who gets it? Why do "
           f"targets capture most of the gains from acquisitions? What do the share price reactions to takeover "
           f"announcements show?</p>"),
        setninger="Answer in at most four sentences.",
        gitt=(f"<p>From (c): {navn[w]} wins at {tall(P)}; {gen(D_)} shareholders gain {tall(GD)} and the winner "
              f"{tall(Gw)}.</p>"),
        kort=(f"<p>The deal creates {navn[w]}'s synergies of {tall(S[w])} minus the rivals' losses of {tall(tap_r)}: "
              f"{tall(VC[w])} in total. {gen(D_)} shareholders take {tall(GD)}, the winner {tall(Gw)} and the two "
              f"rivals {tall(-tap_r)}, which sums to {tall(VC[w])}. Competition pushes the price to the runner-up's "
              f"limit, which the fear of a rival winning lifts above the no-deal value, so the target captures "
              f"{'more than the whole' if GD > VC[w] else 'most of the'} gain. This fits the evidence: targets earn "
              f"about 15% at the announcement, acquirers about 1% on average and negative in half the deals.</p>"),
        losning=(f"<p><b>Value created.</b> The acquisition adds {navn[w]}'s synergies, {tall(S[w])}, but the two "
                 f"rivals lose {tall(L[rivaler[0]])} and {tall(L[rivaler[1]])}, since they now face a stronger "
                 f"competitor. Net: {tall(S[w])} − {tall(tap_r)} = {tall(VC[w])}.</p>"
                 f"<p><b>Who gets it.</b> {gen(D_)} shareholders {tall(GD)}, the winner {tall(Gw)}, the rivals "
                 f"{tall(-tap_r)}. <b>First check.</b> {tall(GD)} + ({tall(Gw)}) − {tall(tap_r)} = {tall(VC[w])}: the "
                 f"price only moves value between the winner and the target, so the gains must add up to the value "
                 f"created. This check fails if a gain is measured against the wrong benchmark.</p>"
                 f"<p><b>Why targets win.</b> A firm can be sold only once and the bidders compete for it, so the price "
                 f"rises to the runner-up's limit. When a rival would win otherwise, each bidder adds the loss it "
                 f"avoids to its limit, which pushes the price above what any bidder gains against no deal. "
                 f"Overconfident bidders who overpay (hubris, the winner's curse) push the split further towards the "
                 f"target. Kurbatov's numbers: about 15% abnormal return for targets, about 1% for acquirers and "
                 f"negative in about half the deals.</p>"
                 f"<p><b>Typical mistakes:</b> calling the synergies the value created (the rivals' losses count too), "
                 f"or measuring the target's gain without subtracting its stand-alone value.</p>"
                 f"<p><b>Remember:</b> bidding depends on the alternatives. Competition hands the gains to the "
                 f"target.</p>"),
        kriterier=[
            f"Computes the total value created: the winner's synergies {tall(S[w])} minus the rivals' losses "
            f"{tall(tap_r)} = {tall(VC[w])} (1 p)",
            f"Splits it: the target's shareholders {tall(GD)}, the winner {tall(Gw)}, the rivals {tall(-tap_r)}, adding up "
            f"to {tall(VC[w])} (1 p)",
            "Explains the mechanism: competition pushes the price to the runner-up's limit, while the fear of a rival "
            "winning lifts the limits above the value against no deal (1 p)",
            "Links to the evidence: targets earn about 15% at the announcement, acquirers about 1% on average and "
            "negative in about half the deals (1 p)",
        ],
    )
    return _ferdig("ov-ma5", ovelse(case, [a_del, b_del, c_del, d_del]), v["d"])
