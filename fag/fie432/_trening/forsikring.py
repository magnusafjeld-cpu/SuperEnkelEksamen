# -*- coding: utf-8 -*-
"""Eksamenstrening, tema «forsikring»: forsikring og forventet nytte (k17), kjernepensum kj11
   (forsikringsdelen).

   Regnerutinen er R13 i eksamens-DNA § 4: forventet nytte med √W og ln W, kjøpe
   eller ikke, maksimal premie via sikkerhetsekvivalenten, kritisk sannsynlighet,
   delvis dekning, risikopremie og aktuarisk premie. De statiske spørsmålene dekker
   moralsk hasard, ugunstig utvalg, egenandel, hva som er lovpålagt og hvorfor
   arbeidsledighet ikke egner seg for privat forsikring.
"""
import math
import re

from trening_lib import *  # noqa: F401,F403

T = "forsikring"
exp = math.exp

PERSONER = [("Ida", "hun"), ("Jonas", "han"), ("Selma", "hun"), ("Aksel", "han"), ("Ingrid", "hun"),
            ("Tobias", "han"), ("Nora", "hun"), ("Elias", "han"), ("Maja", "hun"), ("Henrik", "han"),
            ("Sofie", "hun"), ("Emil", "han"), ("Thea", "hun"), ("Sander", "han"), ("Live", "hun"),
            ("Martin", "han"), ("Hanna", "hun"), ("Even", "han")]

# √W i hele hundretall gir pene formuer: 1 000 000, 2 250 000, 9 000 000 …
_ROT_W = [10, 12, 15, 16, 18, 20, 22, 25, 30]
_ROT_REST = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20]
# (ubestemt, bestemt, kort bestemt, verb, tillegg): «Med sannsynlighet 1 % brenner huset …»
EIENDEL = [("et hus", "huset", "huset", "brenner", ""), ("ei hytte", "hytta", "hytta", "brenner", ""),
           ("en fritidsbolig", "fritidsboligen", "fritidsboligen", "ødelegges", " i et ras"),
           ("en utleieleilighet", "utleieleiligheten", "leiligheten", "brenner", "")]


# ---------------------------------------------------------------- små hjelpere
def stor(s):
    return s[:1].upper() + s[1:]


def heltallig(x, tol=1e-7):
    return abs(x - round(x)) < tol


def pk(x):
    """Brøk til prosent uten unødige desimaler: 0.01 → «1 %», 0.015 → «1,5 %»."""
    v = x * 100
    d = 0 if heltallig(v) else (1 if heltallig(v * 10) else 2)
    return tall(v, d) + NBSP + "%"


def dk(x, maxd=4, mind=2):
    """Desimaltall uten unødige nuller: 0.99 → «0,99», 0.015 → «0,015»."""
    v = rund(abs(x), maxd)
    s = f"{v:.{maxd}f}".rstrip("0")
    hel, _, des = s.partition(".")
    des = des.ljust(mind, "0")
    neg = x < 0 and float(s or 0) != 0
    return (MINUS if neg else "") + tall(int(hel)) + "," + des


def u2(x):
    return tall(x, 2)


def u4(x):
    return tall(x, 4)


def _norm(s):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", str(s))).strip().lower()


def plukk(r, riktig, kandidater, n=3, rel=0.03):
    """Velger n feller blant kandidatene i tilfeldig rekkefølge, slik at ingen to
       alternativer har samme tekst eller for like verdier."""
    k = list(kandidater)
    r.shuffle(k)
    valgt = []
    for f in k:
        andre = valgt + [riktig]
        if any(_norm(f.tekst) == _norm(g.tekst) for g in andre):
            continue
        if f.verdi is not None and any(g.verdi is not None and nær(f.verdi, g.verdi, rel) for g in andre):
            continue
        valgt.append(f)
        if len(valgt) == n:
            break
    if len(valgt) < n:
        raise Avvis("for få ulike feller")
    return [riktig] + valgt


_BRUKT = {}


def modus_for(fid, r, modi):
    """Velger en undertype blant dem som er brukt minst så langt i familien. Kall brukt() rett før return."""
    teller = _BRUKT.setdefault(fid, {m: 0 for m in modi})
    minst = min(teller.values())
    return r.choice([m for m in modi if teller[m] == minst])


def brukt(fid, m):
    _BRUKT[fid][m] += 1


def rot(x):
    return math.sqrt(x)


def _scenario(r, delvis):
    """Formue W og formuen etter tapet, begge med √ i hele hundretall."""
    k = r.choice(_ROT_W)
    W = (100 * k) ** 2
    if delvis:
        j = r.choice([j for j in _ROT_REST if j <= k - 3])
        rest = (100 * j) ** 2
    else:
        rest = 0
    return W, W - rest, rest


def _tekst_scenario(navn, W, L, rest, p, ting, nytte="√W"):
    ubest, best, kort_, verb, tillegg = ting
    if rest == 0:
        return (f"<p>{navn} eier {ubest} til {kr(W)} og har ingen annen formue. Med sannsynlighet {pk(p)} "
                f"{verb} {kort_}{tillegg} i løpet av året og mister hele verdien. Nyttefunksjonen er U(W) = {nytte}, "
                f"der W er formuen.</p>")
    return (f"<p>{navn} har en formue på {kr(W)}, hvorav {best} utgjør {kr(L)}. Med sannsynlighet {pk(p)} {verb} "
            f"{kort_}{tillegg} i løpet av året og mister hele verdien. Formuen faller da til {kr(rest)}. Nyttefunksjonen er "
            f"U(W) = {nytte}, der W er formuen.</p>")


def _tabell(rader):
    """rader: liste av (tilstand, sannsynlighet, formue uten, formue med)."""
    hode = "<tr><th>Tilstand</th><th>Sannsynlighet</th><th>Uten forsikring</th><th>Med forsikring</th></tr>"
    linjer = "".join(f"<tr><td>{a}</td><td>{b}</td><td>{c}</td><td>{d}</td></tr>" for a, b, c, d in rader)
    return f'<table class="data">{hode}{linjer}</table>'


def _pmaks_sqrt(W, rest, p):
    """Maksimalpremie med √W. Sikkerhetsekvivalenten rundes til hele kroner først, så
       W − CE i teksten stemmer med svaret."""
    eu = (1 - p) * rot(W) + p * rot(rest)
    return W - rund(eu ** 2), eu


def _pmaks_ln(W, rest, p):
    eu = (1 - p) * ln(W) + p * ln(rest)
    return W - rund(exp(eu)), eu


def _rund_premie(x):
    steg = 1_000 if x < 100_000 else 5_000
    return round(x / steg) * steg


# ===========================================================================
# fors-eu1 · Bør du kjøpe full dekning? (√W)
# ===========================================================================
@familie("fors-eu1", tema=T, antall=5, tittel="Kjøpe full dekning eller ikke")
def _(r):
    navn, pron = r.choice(PERSONER)
    ting = r.choice(EIENDEL)
    mod = modus_for("fors-eu1", r, ["ja_del", "nei_del", "ja_tot", "nei_tot"])
    delvis = mod.endswith("del")
    kjop = mod.startswith("ja")
    W, L, rest = _scenario(r, delvis)
    p = r.choice([0.01, 0.015, 0.02, 0.025, 0.03, 0.04]) if delvis else r.choice([0.005, 0.01, 0.015, 0.02])
    pmaks, eu = _pmaks_sqrt(W, rest, p)
    f = r.uniform(0.72, 0.9) if kjop else r.uniform(1.1, 1.3)
    P = _rund_premie(pmaks * f)
    akt = p * L
    if P <= akt * 1.15:
        raise Avvis("premien for nær aktuarisk")
    a = rot(W - P)
    if abs(a - eu) < 0.02 or (a > eu) != kjop:
        raise Avvis("for tett eller feil side")
    ja = "Ja" if a > eu else "Nei"

    def alt(konkl, b):
        return f"{konkl}: med forsikring er nytten {u2(a)}, mot {u2(b)} uten"

    kand = [F(f"Nei, fordi man aldri bør betale mer enn forventet skade ({kr(akt)})",
              "En gal regel: den sammenligner forventet formue, ikke forventet nytte. En risikoavers person betaler "
              "gjerne mer enn forventet skade, opp til maksimalpremien. Svaret må avgjøres av nyttetallene.")]
    if delvis:
        b2 = (1 - p) * rot(W) + p * rot(L)
        kand.append(F(alt("Ja" if a > b2 else "Nei", b2),
                      f"Tapet satt inn i nyttefunksjonen i stedet for formuen etter tapet: {dk(p, 3)} × √{tall(L)} "
                      f"i stedet for {dk(p, 3)} × √{tall(rest)}."))
        b3 = (1 - p) * rot(W)
        kand.append(F(alt("Ja" if a > b3 else "Nei", b3),
                      f"Formuen i skadetilstanden satt til null, som om alt brant. {navn} har {kr(rest)} igjen."))
    else:
        b2 = rot(W - akt)
        kand.append(F(alt("Ja" if a > b2 else "Nei", b2),
                      f"Nytten av forventet formue, √({tall(W)} − {tall(akt)}) = {u2(b2)}, i stedet for forventet "
                      f"nytte. For en konkav nyttefunksjon er forventet nytte lavere."))
        kand.append(F("Ja: en risikoavers person forsikrer alltid sin dyreste eiendel",
                      "Risikoaversjon betyr at du betaler noe over forventet skade, ikke hva som helst. Svaret må "
                      "regnes."))
    alternativer = plukk(r, R(alt(ja, eu)), kand)
    q = (_tekst_scenario(navn, W, L, rest, p, ting) +
         f"<p>Et forsikringsselskap tilbyr full dekning for en premie på {kr(P)}. Bør {navn} kjøpe forsikringen? "
         f"Nyttetallene er avrundet til to desimaler.</p>")
    kort = (f"<p><b>{ja}.</b> Uten forsikring: E[U] = {dk(1 - p, 3)} × {tall(rot(W))} + {dk(p, 3)} × "
            f"{tall(rot(rest))} = {u2(eu)}. Med: √{tall(W - P)} = {u2(a)}.</p>")
    tab = _tabell([(f"Ingen skade", pk(1 - p), tall(W), tall(W - P)),
                   (f"Skade", pk(p), tall(rest), tall(W - P))])
    full = (
        f"<p><b>Regelen.</b> En risikoavers person sammenligner forventet nytte, ikke forventet formue. Med full dekning "
        f"er formuen den samme i begge tilstander: skaden erstattes, men premien er betalt uansett. Uten forsikring "
        f"er formuen usikker.</p>"
        f"<p><b>Steg 1: formuen i hver tilstand.</b></p>{tab}"
        f"<p><b>Steg 2: uten forsikring.</b> E[U] = {dk(1 - p, 3)} × √{tall(W)} + {dk(p, 3)} × √{tall(rest)} = "
        f"{dk(1 - p, 3)} × {tall(rot(W))} + {dk(p, 3)} × {tall(rot(rest))} = {u4(eu)}.</p>"
        f"<p><b>Steg 3: med forsikring.</b> √({tall(W)} − {tall(P)}) = √{tall(W - P)} = {u4(a)}.</p>"
        f"<p><b>Steg 4: sammenlign.</b> {u4(max(a, eu))} &gt; {u4(min(a, eu))}: <b>{ja.lower()}</b>, "
        + ("kjøp forsikringen.</p>" if ja == "Ja" else "ikke kjøp.</p>") +
        f"<p><b>Kontroll i kroner:</b> maksimalpremien er W − E[U]<sup>2</sup> = {tall(W)} − {tall(W - pmaks)} = "
        f"{kr(pmaks)}. Premien {kr(P)} ligger " + ("under" if ja == "Ja" else "over") + " den. ✓ Aktuarisk "
        f"premie er {pk(p)} × {tall(L)} = {kr(akt)}, så selskapet tar {dk(P / akt, 2)} ganger riktig pris.</p>"
        f"<p><b>Husk:</b> sammenlign U(W − P) med (1 − p) × U(W) + p × U(W − L). At premien er høyere enn forventet "
        f"skade, avgjør ingenting alene.</p>"
    )
    brukt("fors-eu1", mod)
    return sporsmal(q, alternativer, kort, full)


# ===========================================================================
# fors-max1 · Maksimal premie med √W
# ===========================================================================
@familie("fors-max1", tema=T, antall=5, tittel="Maksimal premie med √W")
def _(r):
    navn, pron = r.choice(PERSONER)
    ting = r.choice(EIENDEL)
    mod = "del"
    delvis = True
    W, L, rest = _scenario(r, delvis)
    if (W, rest) == (4_840_000, 1_690_000):
        raise Avvis("samme tall som kjernepensum")
    p = r.choice([0.01, 0.02, 0.025, 0.03, 0.04, 0.05]) if delvis else r.choice([0.005, 0.01, 0.015, 0.02])
    pmaks, eu = _pmaks_sqrt(W, rest, p)
    ce = rund(eu ** 2)
    akt = p * L
    EW = W - akt
    rp = EW - ce
    kand = [F(kr(akt), f"Aktuarisk premie, {pk(p)} × {tall(L)}: det en risikonøytral person ville betalt. En risikoavers "
                       f"betaler mer.", akt),
            F(kr(rp), f"Risikopremien alene, forventet formue minus sikkerhetsekvivalent: {tall(EW)} − {tall(ce)}. "
                      f"Maksimalpremien er aktuarisk premie pluss risikopremien.", rp),
            F(kr(ce), f"Dette er sikkerhetsekvivalenten, E[U]<sup>2</sup> = {u2(eu)}<sup>2</sup>, ikke premien. "
                      f"Premien er W minus den.", ce)]
    if akt - rp > 0.2 * akt:
        kand.append(F(kr(akt - rp), f"Risikopremien trukket fra i stedet for lagt til: {tall(akt)} − {tall(rp)}. "
                                    f"En risikoavers betaler mer enn forventet skade, ikke mindre.", akt - rp))
    if delvis:
        e0 = (1 - p) * rot(W)
        kand.append(F(kr(W - e0 ** 2), f"Formuen i skadetilstanden satt til null: E[U] = {dk(1 - p, 3)} × "
                                       f"{tall(rot(W))} = {u2(e0)}, så {tall(W)} − {tall(e0 ** 2)}. {navn} har "
                                       f"{kr(rest)} igjen.", W - e0 ** 2))
        eL = (1 - p) * rot(W) + p * rot(L)
        if W - eL ** 2 > 0:
            kand.append(F(kr(W - eL ** 2), f"Tapet satt inn i nyttefunksjonen i stedet for formuen etter tapet: "
                                           f"√{tall(L)} i stedet for √{tall(rest)}.", W - eL ** 2))
    alternativer = plukk(r, R(kr(pmaks), pmaks), kand)
    q = (_tekst_scenario(navn, W, L, rest, p, ting) +
         f"<p>Hva er den høyeste premien {navn} er villig til å betale for full dekning? Rund av til hele kroner.</p>")
    obj = "henne" if pron == "hun" else "ham"
    kort = (f"<p><b>{kr(pmaks)}.</b> E[U] = {u2(eu)}, så sikkerhetsekvivalenten er {u2(eu)}<sup>2</sup> = {kr(ce)}. "
            f"{tall(W)} − {tall(ce)} = {kr(pmaks)}.</p>")
    full = (
        f"<p><b>Hva maksimalpremien er.</b> Den høyeste premien {navn} godtar, gjør {obj} akkurat indifferent: "
        f"nytten av sikker formue W − P skal være lik forventet nytte uten forsikring. Den sikre formuen som er like god "
        f"som lotteriet, heter sikkerhetsekvivalenten (CE). Maksimalpremien er W − CE.</p>"
        +
        f"<p><b>Steg 1: forventet nytte uten forsikring.</b> {dk(1 - p, 3)} × √{tall(W)} + {dk(p, 3)} × √{tall(rest)} "
        f"= {dk(1 - p, 3)} × {tall(rot(W))} + {dk(p, 3)} × {tall(rot(rest))} = {u4(eu)}.</p>"
        f"<p><b>Steg 2: sikkerhetsekvivalenten.</b> √CE = {u4(eu)} gir CE = {u4(eu)}<sup>2</sup> = {kr(ce)}.</p>"
        f"<p><b>Steg 3: maksimalpremien.</b> {tall(W)} − {tall(ce)} = <b>{kr(pmaks)}</b>.</p>"
        f"<p><b>Kontroll ved dekomponering:</b> aktuarisk premie er {pk(p)} × {tall(L)} = {kr(akt)}. Forventet formue er "
        f"{tall(W)} − {tall(akt)} = {kr(EW)}, så risikopremien er {tall(EW)} − {tall(ce)} = {kr(rp)}. "
        f"{tall(akt)} + {tall(rp)} = {kr(akt + rp)}. ✓ Maksimalpremien ligger over aktuarisk premie og under hele "
        f"tapet, som den skal.</p>"
        f"<p><b>Husk:</b> P<sub>maks</sub> = W − (E[U])<sup>2</sup> med √W. Kontroll: aktuarisk premie pluss "
        f"risikopremie.</p>"
    )
    return sporsmal(q, alternativer, kort, full)


# ===========================================================================
# fors-max2 · Maksimal premie med ln W
# ===========================================================================
@familie("fors-max2", tema=T, antall=5, tittel="Maksimal premie med ln W")
def _(r):
    navn, pron = r.choice(PERSONER)
    ting = r.choice(EIENDEL)
    W = r.randrange(2_000_000, 10_000_001, 500_000)
    L = r.randrange(int(W * 0.3 / 250_000) * 250_000, int(W * 0.75 / 250_000) * 250_000 + 1, 250_000)
    rest = W - L
    p = r.choice([0.01, 0.011, 0.015, 0.02, 0.025, 0.03, 0.04])
    if L <= 0 or rest <= 0 or (W, L, p) in [(6_000_000, 3_000_000, 0.011), (5_000_000, 2_000_000, 0.02)]:
        raise Avvis("ugyldig eller kjent eksempel")
    pmaks, eu = _pmaks_ln(W, rest, p)
    ce = rund(exp(eu))
    akt = p * L
    EW = W - akt
    rp = EW - ce
    ps, eus = _pmaks_sqrt(W, rest, p)
    kand = [F(kr(ps), f"√W brukt i stedet for ln W: E[U] = {dk(1 - p, 3)} × √{tall(W)} + {dk(p, 3)} × √{tall(rest)} = "
                      f"{u4(eus)}. Premien blir {tall(W)} − {u4(eus)}<sup>2</sup>. ln W er mer risikoavers og gir høyere "
                      f"premie.", ps),
            F(kr(akt), f"Aktuarisk premie, {pk(p)} × {tall(L)}. Det er det en risikonøytral person ville betalt.", akt),
            F(kr(rp), f"Risikopremien alene: {tall(EW)} − {tall(ce)}. Maksimalpremien er aktuarisk premie pluss "
                      f"risikopremie.", rp)]
    alternativer = plukk(r, R(kr(pmaks), pmaks), kand)
    q = (_tekst_scenario(navn, W, L, rest, p, ting, "ln W") +
         f"<p>Hva er den høyeste premien {navn} er villig til å betale for full dekning? Rund av til hele kroner.</p>")
    kort = (f"<p><b>{kr(pmaks)}.</b> E[U] = {dk(1 - p, 3)} × {u4(ln(W))} + {dk(p, 3)} × {u4(ln(rest))} = {dk(eu, 7)}. "
            f"CE = e<sup>{dk(eu, 7)}</sup> = {kr(ce)}. Premien er {tall(W)} − {tall(ce)} = {kr(pmaks)}.</p>")
    full = (
        f"<p><b>Samme rutine, ny nyttefunksjon.</b> Maksimalpremien gjør {navn} indifferent: ln(W − P) skal være lik "
        f"forventet nytte uten forsikring. Med ln W snur du nyttetallet tilbake til kroner med eksponentialen, ikke "
        f"ved å kvadrere.</p>"
        f"<p><b>Steg 1: nytten i hver tilstand.</b> ln {tall(W)} = {u4(ln(W))} og ln {tall(rest)} = {u4(ln(rest))}.</p>"
        f"<p><b>Steg 2: forventet nytte uten forsikring.</b> {dk(1 - p, 3)} × {u4(ln(W))} + {dk(p, 3)} × "
        f"{u4(ln(rest))} = {dk(eu, 7)}.</p>"
        f"<p><b>Steg 3: sikkerhetsekvivalenten.</b> CE = e<sup>{dk(eu, 7)}</sup> = {kr(ce)}.</p>"
        f"<p><b>Steg 4: maksimalpremien.</b> {tall(W)} − {tall(ce)} = <b>{kr(pmaks)}</b>.</p>"
        f"<p><b>Kontroll ved dekomponering:</b> aktuarisk premie {pk(p)} × {tall(L)} = {kr(akt)}. Forventet formue "
        f"{kr(EW)}, så risikopremien er {tall(EW)} − {tall(ce)} = {kr(rp)}. {tall(akt)} + {tall(rp)} = "
        f"{kr(akt + rp)}. ✓ Med √W ville maksimalpremien vært {kr(ps)}. ln W har relativ risikoaversjon 1 mot 0,5 for "
        f"√W og betaler derfor mer.</p>"
        f"<p><b>Husk:</b> med ln W er CE = e<sup>E[U]</sup>. Formuen i skadetilstanden må være positiv, ellers finnes "
        f"ikke ln.</p>"
    )
    return sporsmal(q, alternativer, kort, full)


# ===========================================================================
# fors-pkr1 · Kritisk sannsynlighet: hvor sannsynlig må skaden være?
# ===========================================================================
@familie("fors-pkr1", tema=T, antall=5, tittel="Kritisk sannsynlighet")
def _(r):
    navn, pron = r.choice(PERSONER)
    ting = r.choice(EIENDEL)
    ubest, best, kort_, verb, tillegg = ting
    mod = modus_for("fors-pkr1", r, ["sqrt", "sqrt", "ln"])
    if mod == "sqrt":
        W, L, rest = _scenario(r, True)
        U = rot
        nytte = "√W"
    else:
        W = r.randrange(2_000_000, 8_000_001, 500_000)
        L = r.randrange(int(W * 0.3 / 250_000) * 250_000, int(W * 0.7 / 250_000) * 250_000 + 1, 250_000)
        rest = W - L
        U = ln
        nytte = "ln W"
    p_mål = r.choice([0.01, 0.015, 0.02, 0.025, 0.03, 0.04])
    P = _rund_premie(p_mål * L * r.uniform(1.3, 1.9))
    if P >= L or rest <= 0:
        raise Avvis("ugyldig")
    pst_ = (U(W) - U(W - P)) / (U(W) - U(rest))
    if not 0.004 <= pst_ <= 0.08:
        raise Avvis("terskel utenfor 0,4–8 %")
    p_rn = P / L
    kand = [F(pst(p_rn, 2), f"Den risikonøytrale terskelen, premie delt på tap: {tall(P)}/{tall(L)}. En risikoavers "
                            f"kjøper ved lavere sannsynlighet.", p_rn),
            ]
    if mod == "sqrt":
        kand.append(F(pst(1 - U(W - P) / U(W), 2), f"Formelen for totaltap, 1 − U(W − P)/U(W), brukt selv om {navn} "
                                                   f"ikke mister alt: U(W − L) er U({tall(rest)}), ikke 0.",
                      1 - U(W - P) / U(W)))
        x = (rot(W) - rot(W - P)) / (rot(W) - rot(L))
        if 0 < x < 1:
            kand.append(F(pst(x, 2), f"Tapet satt inn i nyttefunksjonen i stedet for formuen etter tapet: √{tall(L)} i "
                                     f"stedet for √{tall(rest)}.", x))
    else:
        y = (ln(W) - ln(W - P)) / (ln(W) - ln(L))
        if 0 < y < 1 and L != rest:
            kand.append(F(pst(y, 2), f"Tapet satt inn i nyttefunksjonen i stedet for formuen etter tapet: ln {tall(L)} i "
                                     f"stedet for ln {tall(rest)}.", y))
        x = (rot(W) - rot(W - P)) / (rot(W) - rot(rest))
        kand.append(F(pst(x, 2), f"√W brukt i stedet for ln W: (√{tall(W)} − √{tall(W - P)})/(√{tall(W)} − "
                                 f"√{tall(rest)}).", x))
    alternativer = plukk(r, R(pst(pst_, 2), pst_), kand)
    q = (f"<p>{navn} har en formue på {kr(W)}, hvorav {best} utgjør {kr(L)}. Hvis {kort_} {verb}{tillegg}, går hele "
         f"verdien tapt. Formuen faller da til {kr(rest)}. Nyttefunksjonen er U(W) = {nytte}, der W er formuen.</p>"
         f"<p>Et selskap tilbyr full dekning for en premie på {kr(P)}. Hva er den laveste sannsynligheten for skaden "
         f"som gjør at {navn} vil kjøpe forsikringen? Rund av til to desimaler.</p>")
    uw, uwp, ur = U(W), U(W - P), U(rest)
    fmt = (lambda v: tall(v) if heltallig(v, 1e-9) else u4(v)) if mod == "sqrt" else (lambda v: dk(v, 6))
    kort = (f"<p><b>{pst(pst_, 2)}.</b> Løs (1 − p) × {fmt(uw)} + p × {fmt(ur)} = {fmt(uwp)}: p = "
            f"({fmt(uw)} − {fmt(uwp)})/({fmt(uw)} − {fmt(ur)}) = {pst(pst_, 2)}.</p>")
    p_test = rund(pst_ * 1.2, 4)
    eu_test = (1 - p_test) * uw + p_test * ur
    full = (
        f"<p><b>Hva terskelen er.</b> Med full dekning er formuen W − P uansett, så nytten med forsikring avhenger ikke "
        f"av sannsynligheten. Uten forsikring faller forventet nytte når skaden blir mer sannsynlig. Terskelen p* er "
        f"sannsynligheten der de to er like. Over p* lønner forsikringen seg.</p>"
        f"<p><b>Steg 1: høyresiden.</b> U({tall(W - P)}) = {fmt(uwp)}.</p>"
        f"<p><b>Steg 2: nytten uten forsikring i hver tilstand.</b> U({tall(W)}) = {fmt(uw)} og U({tall(rest)}) = "
        f"{fmt(ur)}.</p>"
        f"<p><b>Steg 3: indifferensen.</b> (1 − p) × {fmt(uw)} + p × {fmt(ur)} = {fmt(uwp)} gir "
        f"p × ({fmt(uw)} − {fmt(ur)}) = {fmt(uw)} − {fmt(uwp)}, altså p = {dk(pst_, 6)}, <b>{pst(pst_, 2)}</b>.</p>"
        f"<p><b>Kontroll:</b> ved p = {pst(p_test, 2)}, litt over terskelen, er forventet nytte uten forsikring "
        f"{fmt(eu_test)}, under {fmt(uwp)} med forsikring. Da kjøper {navn}. ✓ Den risikonøytrale terskelen "
        f"{pst(p_rn, 2)} ligger over, fordi en risikoavers betaler for å slippe risikoen.</p>"
        f"<p><b>Husk:</b> sett (1 − p) × U(W) + p × U(W − L) lik U(W − P) og løs for p. Formelen 1 − U(W − P)/U(W) "
        f"gjelder bare når alt går tapt og U(0) = 0.</p>"
    )
    brukt("fors-pkr1", mod)
    return sporsmal(q, alternativer, kort, full)


# ===========================================================================
# fors-del1 · Delvis dekning og egenandel: premien betales i begge tilstander
# ===========================================================================
def _pmaks_delvis(W, L, X, p):
    """Høyeste premie for en polise som utbetaler X ved skade (√W), med halvering."""
    e0 = (1 - p) * rot(W) + p * rot(W - L)
    lo, hi = 0.0, min(W - L + X, W) - 1
    for _ in range(200):
        m = (lo + hi) / 2
        if (1 - p) * rot(W - m) + p * rot(W - L + X - m) > e0:
            lo = m
        else:
            hi = m
    return lo


@familie("fors-del1", tema=T, antall=5, tittel="Delvis dekning og egenandel")
def _(r):
    navn, pron = r.choice(PERSONER)
    ting = r.choice(EIENDEL)
    mod = modus_for("fors-del1", r, ["eu", "kjop_ja", "kjop_nei"])
    W, L, rest = _scenario(r, r.random() < 0.5)
    if rest > 0 and L > 0.75 * W:
        raise Avvis("eiendelen er en urimelig stor del av formuen")
    p = r.choice([0.02, 0.03, 0.04, 0.05])
    if r.random() < 0.5:
        a = r.choice([0.5, 0.6, 0.75, 0.8])
        X = a * L
        dekning = f"{pk(a)} av tapet, altså {kr(X)} ved skade"
    else:
        E = r.choice([100_000, 200_000, 250_000, 500_000])
        if E >= L * 0.6:
            raise Avvis("for stor egenandel")
        X = L - E
        dekning = f"tapet med en egenandel på {kr(E)}, altså {kr(X)} ved skade"
    pm = _pmaks_delvis(W, L, X, p)
    akt = p * X
    if mod == "kjop_ja":
        P = _rund_premie(pm * r.uniform(0.75, 0.9))
    elif mod == "kjop_nei":
        P = _rund_premie(pm * r.uniform(1.12, 1.35))
    else:
        P = _rund_premie(pm * r.uniform(0.8, 1.25))
    if P <= akt * 1.1:
        raise Avvis("premien for nær aktuarisk")
    god, dårlig = W - P, W - L + X - P
    eu = (1 - p) * rot(god) + p * rot(dårlig)
    e0 = (1 - p) * rot(W) + p * rot(rest)
    if abs(eu - e0) < 0.02:
        raise Avvis("for tett")
    eu_glemt = (1 - p) * rot(god) + p * rot(W - L + X)
    eu_utbet = (1 - p) * rot(god) + p * rot(X)
    EWp = (1 - p) * god + p * dårlig
    q = (_tekst_scenario(navn, W, L, rest, p, ting) +
         f"<p>Et selskap tilbyr en polise som dekker {dekning}. Premien er {kr(P)} og betales enten skaden inntreffer "
         f"eller ikke.</p>")
    if mod == "eu":
        q += f"<p>Hva er forventet nytte for {navn} med denne polisen? Rund av til to desimaler.</p>"
        kand = [F(u2(eu_glemt), f"Premien glemt i skadetilstanden: √{tall(W - L + X)} i stedet for √{tall(dårlig)}.",
                  eu_glemt),
                F(u2(eu_utbet), f"Utbetalingen {tall(X)} brukt som formue i skadetilstanden. Nyttefunksjonen tar formuen "
                                f"etter tap, utbetaling og premie.", eu_utbet),
                F(u2(rot(EWp)), f"Nytten av forventet formue, √{tall(EWp)}, i stedet for forventet nytte.", rot(EWp)),
                F(u2(e0), f"Forventet nytte uten forsikring. Spørsmålet gjelder nytten med polisen.", e0)]
        alternativer = plukk(r, R(u2(eu), eu), kand, rel=0.0002)
        kort = (f"<p><b>{u2(eu)}.</b> Formuen er {tall(god)} uten skade og {tall(dårlig)} med skade. "
                f"{dk(1 - p, 2)} × √{tall(god)} + {dk(p, 2)} × √{tall(dårlig)} = {u2(eu)}.</p>")
    else:
        q += f"<p>Bør {navn} kjøpe polisen framfor å stå uforsikret? Nyttetallene er avrundet til to desimaler.</p>"
        konkl = "Ja" if eu > e0 else "Nei"

        def alt(k, x):
            return f"{k}: med polisen er forventet nytte {u2(x)}, mot {u2(e0)} uten"
        kand = [F(alt("Ja" if eu_glemt > e0 else "Nei", eu_glemt),
                  f"Premien glemt i skadetilstanden: √{tall(W - L + X)} i stedet for √{tall(dårlig)}."),
                F(alt("Ja" if eu_utbet > e0 else "Nei", eu_utbet),
                  f"Utbetalingen {tall(X)} brukt som formue i skadetilstanden i stedet for formuen etter tapet."),
                F(f"Nei, fordi man aldri bør betale mer enn forventet utbetaling ({kr(akt)})",
                  "En gal regel: den sammenligner forventet formue, ikke forventet nytte. En risikoavers betaler gjerne "
                  "noe over forventet utbetaling. Svaret må avgjøres av nyttetallene.")]
        alternativer = plukk(r, R(alt(konkl, eu)), kand)
        kort = (f"<p><b>{konkl}.</b> Med polisen: {dk(1 - p, 2)} × √{tall(god)} + {dk(p, 2)} × √{tall(dårlig)} = "
                f"{u2(eu)}. Uten: {u2(e0)}.</p>")
    tab = _tabell([("Ingen skade", pk(1 - p), tall(W), f"{tall(W)} − {tall(P)} = {tall(god)}"),
                   ("Skade", pk(p), tall(rest), f"{tall(rest)} + {tall(X)} − {tall(P)} = {tall(dårlig)}")])
    full = (
        f"<p><b>Hva som skiller delvis dekning fra full.</b> Med full dekning er formuen lik i begge tilstander. Med "
        f"delvis dekning eller egenandel bærer {navn} fortsatt en del av tapet selv. Risikoen er dempet, ikke borte. "
        f"Premien er betalt uansett, også når skaden inntreffer.</p>"
        f"<p><b>Steg 1: tilstandstabellen.</b></p>{tab}"
        f"<p><b>Steg 2: forventet nytte med polisen.</b> {dk(1 - p, 2)} × √{tall(god)} + {dk(p, 2)} × √{tall(dårlig)} = "
        f"{dk(1 - p, 2)} × {u4(rot(god))} + {dk(p, 2)} × {u4(rot(dårlig))} = <b>{u4(eu)}</b>.</p>"
        f"<p><b>Steg 3: uten forsikring.</b> {dk(1 - p, 2)} × {tall(rot(W))} + {dk(p, 2)} × {tall(rot(rest))} = "
        f"{u4(e0)}. Polisen er " + ("bedre" if eu > e0 else "dårligere") + " enn å stå uforsikret.</p>"
        f"<p><b>Kontroll i kroner:</b> den høyeste premien {navn} ville betalt for akkurat denne dekningen, er "
        f"{kr(pm)}. Premien {kr(P)} ligger " + ("under" if eu > e0 else "over") + f" den. ✓ Aktuarisk pris er "
        f"{pk(p)} × {tall(X)} = {kr(akt)}.</p>"
        f"<p><b>Husk:</b> skriv tilstandstabellen først. Formuen i skadetilstanden er W − L + utbetaling − premie.</p>"
    )
    brukt("fors-del1", mod)
    return sporsmal(q, alternativer, kort, full)


# ===========================================================================
# fors-ce1 · Sikkerhetsekvivalent og risikopremie
# ===========================================================================
@familie("fors-ce1", tema=T, antall=5, tittel="Sikkerhetsekvivalent og risikopremie")
def _(r):
    navn, pron = r.choice(PERSONER)
    mod = modus_for("fors-ce1", r, ["ce", "rp"])
    k = r.choice([10, 12, 15, 16, 18, 20, 25])
    W = (100 * k) ** 2
    j = r.choice([j for j in [3, 4, 5, 6, 7, 8, 9, 10, 12, 14] if j <= k - 4])
    rest = (100 * j) ** 2
    L = W - rest
    p = r.choice([0.05, 0.1, 0.15, 0.2, 0.25])
    eu = (1 - p) * 100 * k + p * 100 * j
    ce = eu ** 2
    EW = (1 - p) * W + p * rest
    rp = EW - ce
    tekst = (f"<p>{navn} har en formue på {kr(W)}. Med sannsynlighet {pk(p)} rammes {pron} av et tap på {kr(L)}, slik "
             f"at formuen faller til {kr(rest)}. Nyttefunksjonen er U(W) = √W, der W er formuen.</p>")
    snitt = (0.5 * 100 * k + 0.5 * 100 * j) ** 2
    if mod == "ce":
        q = tekst + "<p>Hva er sikkerhetsekvivalenten til denne formuesposisjonen? Rund av til hele kroner.</p>"
        kand = [F(kr(EW), f"Forventet formue, ikke sikkerhetsekvivalenten. Det er svaret for en risikonøytral person.", EW),
                F(kr(((1 - p) * 100 * k) ** 2), f"Formuen i skadetilstanden satt til null: ({dk(1 - p, 2)} × "
                                                f"{tall(100 * k)})<sup>2</sup>. {navn} har {kr(rest)} igjen.",
                  ((1 - p) * 100 * k) ** 2),
                F(kr(snitt), f"Sannsynlighetene ignorert: ((√{tall(W)} + √{tall(rest)})/2)<sup>2</sup>.", snitt),
                F(kr(W - ce), f"Dette er maksimalpremien for full dekning, W − CE, ikke sikkerhetsekvivalenten.", W - ce)]
        alternativer = plukk(r, R(kr(ce), ce), kand)
        kort = (f"<p><b>{kr(ce)}.</b> E[U] = {dk(1 - p, 2)} × {tall(100 * k)} + {dk(p, 2)} × {tall(100 * j)} = "
                f"{u2(eu)}. Da er CE = {u2(eu)}<sup>2</sup> = {kr(ce)}.</p>")
    else:
        q = tekst + f"<p>Hvor stor er risikopremien {'hennes' if pron == 'hun' else 'hans'}? Rund av til hele kroner.</p>"
        kand = [F(kr(p * L), f"Forventet tap, {pk(p)} × {tall(L)}. Det er aktuarisk premie, ikke risikopremien.", p * L),
                F(kr(W - ce), f"Maksimalpremien W − CE. Den er aktuarisk premie pluss risikopremie.", W - ce),
                F(kr(-rp), f"Riktig størrelse, feil fortegn: CE − E[W]. For en risikoavers person er risikopremien alltid "
                           f"positiv.", -rp),
                F(kr(EW - snitt), f"Sannsynlighetene ignorert i sikkerhetsekvivalenten: {tall(EW)} − {tall(snitt)}.",
                  EW - snitt)]
        alternativer = plukk(r, R(kr(rp), rp), kand)
        kort = (f"<p><b>{kr(rp)}.</b> E[W] = {kr(EW)}. CE = {u2(eu)}<sup>2</sup> = {kr(ce)}. Risikopremien er "
                f"{tall(EW)} − {tall(ce)} = {kr(rp)}.</p>")
    full = (
        f"<p><b>Begrepene.</b> Sikkerhetsekvivalenten (CE) er den sikre formuen som er nøyaktig like god som den usikre "
        f"posisjonen: U(CE) = E[U]. Risikopremien er E[W] − CE, det {navn} er villig til å gi opp i forventning for å "
        f"slippe risikoen. Med √W snur du nyttetallet til kroner ved å kvadrere.</p>"
        f"<p><b>Steg 1: forventet nytte.</b> {dk(1 - p, 2)} × √{tall(W)} + {dk(p, 2)} × √{tall(rest)} = "
        f"{dk(1 - p, 2)} × {tall(100 * k)} + {dk(p, 2)} × {tall(100 * j)} = {u2(eu)}.</p>"
        f"<p><b>Steg 2: sikkerhetsekvivalenten.</b> CE = {u2(eu)}<sup>2</sup> = {kr(ce)}.</p>"
        f"<p><b>Steg 3: forventet formue og risikopremien.</b> E[W] = {dk(1 - p, 2)} × {tall(W)} + {dk(p, 2)} × "
        f"{tall(rest)} = {kr(EW)}. Risikopremien er {tall(EW)} − {tall(ce)} = {kr(rp)}.</p>"
        f"<p><b>Kontroll:</b> CE må ligge mellom det dårligste utfallet {kr(rest)} og forventet formue {kr(EW)}. Det gjør "
        f"den. ✓ Maksimalpremien for full dekning er {tall(W)} − {tall(ce)} = {kr(W - ce)}. Den skal være lik "
        f"forventet tap {kr(p * L)} pluss risikopremien {kr(rp)}: {tall(p * L)} + {tall(rp)} = {kr(p * L + rp)}. ✓</p>"
        +
        f"<p><b>Husk:</b> CE = (E[U])<sup>2</sup> med √W. Risikopremie = E[W] − CE, alltid positiv for en risikoavers "
        f"person.</p>"
    )
    brukt("fors-ce1", mod)
    return sporsmal(q, alternativer, kort, full)


# ===========================================================================
# fors-tre1 · √W mot ln W: hvem kjøper til en gitt premie?
# ===========================================================================
PAR_NAVN = [("Kari", "Lise"), ("Ola", "Per"), ("Mona", "Sara"), ("Erik", "Lars"), ("Anna", "Eva")]


@familie("fors-tre1", tema=T, antall=5, tittel="√W mot ln W: hvem kjøper?")
def _(r):
    sq, ln_ = r.choice(PAR_NAVN)
    if r.random() < 0.5:
        sq, ln_ = ln_, sq
    sone = modus_for("fors-tre1", r, ["begge", "ln", "ingen"])
    W = r.randrange(1_000_000, 6_000_001, 250_000)
    L = r.randrange(int(W * 0.5 / 250_000) * 250_000, int(W * 0.85 / 250_000) * 250_000 + 1, 250_000)
    rest = W - L
    p = r.choice([0.01, 0.02, 0.03, 0.05])
    if rest <= 0:
        raise Avvis("ingen formue igjen")
    ps, eus = _pmaks_sqrt(W, rest, p)
    pl, eul = _pmaks_ln(W, rest, p)
    akt = p * L
    if pl - ps < 0.12 * ps:
        raise Avvis("for liten forskjell mellom personene")
    if sone == "begge":
        lav, høy = max(akt * 1.08, ps * 0.6), ps * 0.95
    elif sone == "ln":
        lav, høy = ps * 1.05, pl * 0.95
    else:
        lav, høy = pl * 1.05, pl * 1.3
    if høy <= lav:
        raise Avvis("tom sone")
    P = _rund_premie(r.uniform(lav, høy))
    if not lav <= P <= høy or P <= akt:
        raise Avvis("premien havnet utenfor sonen")
    tall_ = (f"{sq} vil betale inntil {kr(ps)}, {ln_} inntil {kr(pl)}")
    t_begge = f"Begge kjøper"
    t_ln = f"Bare {ln_} kjøper"
    t_sq = f"Bare {sq} kjøper"
    t_ingen = "Ingen av dem kjøper"
    riktig_tekst = {"begge": t_begge, "ln": t_ln, "ingen": t_ingen}[sone]
    felle = {
        t_sq: (f"Snudd. ln W er mer risikoavers enn √W, så {ln_} betaler alltid mer enn {sq}. {tall_}."),
        t_begge: (f"{sq} vil bare betale inntil {kr(ps)}, under premien." if sone == "ln" else
                  f"Begge vil betale mindre enn premien: {tall_}."),
        t_ln: (f"{sq} kjøper også: maksimalpremien {kr(ps)} er over premien." if sone == "begge" else
               f"{ln_} vil bare betale inntil {kr(pl)}, under premien."),
        t_ingen: (f"Regelen om at ingen betaler mer enn forventet skade, {kr(akt)}. Den gjelder bare en risikonøytral "
                  f"person. {tall_}."),
    }
    alternativer = [R(riktig_tekst)] + [F(t, felle[t]) for t in (t_begge, t_ln, t_sq, t_ingen) if t != riktig_tekst]
    q = (f"<p>{sq} og {ln_} har hver en formue på {kr(W)}, hvorav en fritidsbolig til {kr(L)}. Med sannsynlighet "
         f"{pk(p)} brenner fritidsboligen og blir verdiløs. {sq} har nyttefunksjonen U(W) = √W. {ln_} har "
         f"U(W) = ln W. Et selskap tilbyr full dekning for en premie på {kr(P)}.</p><p>Hvem kjøper forsikringen?</p>")
    kort = (f"<p><b>{riktig_tekst}.</b> {tall_}. Premien er {kr(P)}.</p>")
    full = (
        f"<p><b>Samme risiko, ulik pris.</b> Maksimalpremien er ikke en egenskap ved risikoen, men ved personen som "
        f"bærer den. ln W har relativ risikoaversjon 1, √W har 0,5. Den mest risikoaverse betaler mest for å slippe "
        f"risikoen.</p>"
        f"<p><b>Steg 1: {sq}, √W.</b> E[U] = {dk(1 - p, 2)} × √{tall(W)} + {dk(p, 2)} × √{tall(rest)} = {u4(eus)}. "
        f"CE = {u4(eus)}<sup>2</sup> = {kr(W - ps)}, så maksimalpremien er {kr(ps)}.</p>"
        f"<p><b>Steg 2: {ln_}, ln W.</b> E[U] = {dk(1 - p, 2)} × ln {tall(W)} + {dk(p, 2)} × ln {tall(rest)} = "
        f"{dk(eul, 6)}. CE = e<sup>{dk(eul, 6)}</sup> = {kr(W - pl)}, så maksimalpremien er {kr(pl)}.</p>"
        f"<p><b>Steg 3: sammenlign med premien {kr(P)}.</b> " +
        {"begge": f"Begge maksimalpremiene er over premien. Begge kjøper.",
         "ln": f"Premien er over {gen(sq)} grense og under {gen(ln_)}. Bare {ln_} kjøper.",
         "ingen": f"Premien er over begges grense. Ingen kjøper."}[sone] + "</p>"
        f"<p><b>Kontroll:</b> forventet skade er {pk(p)} × {tall(L)} = {kr(akt)}. Begge maksimalpremiene ligger over den. "
        f"{gen(ln_)} ligger over {gen(sq)}. ✓ En risikonøytral person ville betalt nøyaktig {kr(akt)}.</p>"
        +
        f"<p><b>Husk:</b> jo mer risikoavers, jo høyere maksimalpremie. ln W betaler mer enn √W. √W betaler mer enn "
        f"forventet skade.</p>"
    )
    brukt("fors-tre1", sone)
    return sporsmal(q, alternativer, kort, full)


# ===========================================================================
# STATISKE SPØRSMÅL
# ===========================================================================
statisk(
    "fors-s01", tema=T, type="fakta",
    q="<p>Hvilken av disse forsikringene er en privatperson pålagt ved lov å ha?</p>",
    alternativer=[
        R("Ansvarsforsikring for en bil som brukes på vei"),
        F("Innboforsikring for den som leier bolig", "Frivillig. Den dekker dine egne ting, ikke skade på andre."),
        F("Reiseforsikring for alle reiser utenfor Norden og Europa", "Frivillig. Den dekker deg selv, ikke tredjepart."),
        F("Livsforsikring for den som har boliglån", "Frivillig. Ingen lov pålegger privatpersoner å livsforsikre "
                                                      "seg."),
    ],
    kort="<p><b>Ansvarsforsikring for bil.</b> Den er lovpålagt fordi skaden rammer tredjepart. De andre dekker deg selv og "
         "er frivillige.</p>",
    full="<p><b>Hovedregelen.</b> Blant de vanlige privatforsikringene er bare ansvarsforsikringen for motorvogn "
         "lovpålagt. Bilansvarsloven krever at kjøretøy som brukes på vei, er forsikret for skade de påfører "
         "andre.</p>"
         "<p><b>Steg 1: hvem skaden rammer.</b> Kjører du på en fotgjenger eller en annen bil, er det den andre som "
         "lider tapet. Hadde du ikke vært forsikret og manglet penger, ville den skadelidte stått uten dekning. Loven "
         "beskytter tredjepart.</p>"
         "<p><b>Steg 2: de andre.</b> Innbo, reise og liv dekker tap for deg selv eller familien din. Der er det din "
         "egen avveining om risikoen er verdt premien. Ingen lov krever dem.</p>"
         "<p><b>Steg 3: en vanlig forveksling.</b> Boligforsikring er heller ikke lovpålagt, men banken krever den som "
         "vilkår for boliglånet. Et krav i en låneavtale er ikke en lovplikt.</p>"
         "<p><b>Kontroll:</b> still spørsmålet «hvem står uten dekning hvis jeg ikke er forsikret?». Er svaret «noen "
         "andre», er det typisk der loven griper inn. H2025 oppgave 12 spurte om nettopp dette.</p>"
         "<p><b>Husk:</b> lovpålagt for privatpersoner: ansvarsforsikring for bil. Skade på andre kan pålegges, skade "
         "på deg selv er ditt valg.</p>",
)

statisk(
    "fors-s02", tema=T, type="begrep",
    q="<p>Hva er den prinsipielle grunnen til at ansvarsforsikring for bil er lovpålagt, mens kaskoforsikring av din "
      "egen bil er frivillig?</p>",
    alternativer=[
        R("Ansvarsskaden rammer andre, som ellers kunne stått uten dekning"),
        F("Ansvarsskader er de vanligste skadene i trafikken",
          "Hyppighet er ikke grunnen. Poenget er at skaden rammer en tredjepart."),
        F("Uten tvang ville ingen bilister kjøpt ansvarsforsikring",
          "Tvang mot ugunstig utvalg er argumentet for folketrygden. Bilansvaret begrunnes med at skaden rammer "
          "andre."),
        F("Kaskoskader er så små at de aldri bør forsikres",
          "En kaskoskade kan være stor, for eksempel at hele bilen går tapt. Den er frivillig fordi tapet er ditt eget."),
    ],
    kort="<p><b>Skaden rammer andre.</b> Ansvarsforsikringen beskytter den skadelidte. Kasko dekker bare ditt eget tap. "
         "Det er ditt valg å bære det.</p>",
    full="<p><b>To slags tap.</b> Kasko dekker skade på din egen bil. Ansvarsforsikring dekker skade bilen din påfører "
         "andre: personer, andre biler, gjerder og hus.</p>"
         "<p><b>Steg 1: ditt eget tap.</b> Om du vil forsikre din egen bil, er en vanlig avveining mellom premie og "
         "risiko. Har du råd til å bære tapet, kan det være fornuftig å la være. Tapet rammer bare deg.</p>"
         "<p><b>Steg 2: andres tap.</b> Skader du en annen trafikant og mangler penger, står den skadelidte uten "
         "dekning. Det er en kostnad du påfører noen som ikke har valgt risikoen. Derfor krever loven forsikring.</p>"
         "<p><b>Steg 3: hva de gale svarene blander.</b> Tvang kan også brukes mot ugunstig utvalg, slik folketrygden "
         "gjør. Men bilansvaret begrunnes med tredjepart, ikke med at de beste risikoene ellers ville latt være.</p>"
         "<p><b>Kontroll:</b> samme logikk gjelder yrkesskadeforsikring, som arbeidsgivere er pålagt for de ansatte. "
         "Også der rammer skaden andre enn den som må forsikre.</p>"
         "<p><b>Husk:</b> forsikring mot skade du påfører andre er ofte lovpålagt. Forsikring av deg selv og dine egne "
         "ting er frivillig.</p>",
)

statisk(
    "fors-s03", tema=T, type="fakta",
    q="<p>Nesten alle boligeiere med boliglån har boligforsikring. Hva er grunnen?</p>",
    alternativer=[
        R("Banken krever den som vilkår for lånet, siden boligen er pant"),
        F("Den er lovpålagt for alle som eier bolig",
          "Boligforsikring er ikke lovpålagt. Kravet kommer fra låneavtalen med banken."),
        F("Folketrygden dekker ikke brann uten at boligen også er privat forsikret",
          "Folketrygden dekker ikke brann på boliger i det hele tatt. Det er banken som stiller kravet."),
        F("Kommunen krever den som del av eiendomsskatten",
          "Eiendomsskatt og forsikring har ingenting med hverandre å gjøre. Kravet kommer fra banken."),
    ],
    kort="<p><b>Banken krever den.</b> Boligen er pant for lånet. Boligforsikring er avtalepålagt, ikke lovpålagt.</p>",
    full="<p><b>Lovplikt mot avtaleplikt.</b> En lovplikt gjelder alle. En avtaleplikt gjelder bare den som har inngått "
         "avtalen. Boligforsikring er det siste.</p>"
         "<p><b>Steg 1: bankens interesse.</b> Når du tar opp boliglån, stiller du boligen som pant. Brenner huset "
         "uforsikret, forsvinner sikkerheten banken har for lånet. Banken krever derfor forsikring som vilkår.</p>"
         "<p><b>Steg 2: hva det betyr i praksis.</b> Nesten alle med lån har forsikringen. Det ser ut som en lovplikt, "
         "men det er en kontraktsforpliktelse overfor banken.</p>"
         "<p><b>Steg 3: hvorfor det er riktig valg uansett.</b> Huset er for de fleste den største eiendelen. Et "
         "totaltap kan ikke bæres av husholdningen selv. Kursets regel om å forsikre det du ikke kan bære, peker på "
         "boligforsikring også uten bankens krav.</p>"
         "<p><b>Kontroll:</b> en eier uten lån står fritt. Ingen lov hindrer henne i å la huset stå uforsikret. "
         "Ansvarsforsikring for bil er derimot påkrevd også for den som eier bilen kontant.</p>"
         "<p><b>Husk:</b> boligforsikring er avtalepålagt av banken, ikke lovpålagt. Bilansvar er lovpålagt.</p>",
)

statisk(
    "fors-s04", tema=T, type="begrep",
    q="<p>En kunde med full tyveriforsikring låser sykkelen sjeldnere enn før. Selskapet kan ikke se hvor forsiktig hun "
      "er. Hvilket navn og hvilken løsning hører sammen med dette problemet?</p>",
    alternativer=[
        R("Moralsk hasard, som dempes med egenandel"),
        F("Ugunstig utvalg, som dempes med egenandel",
          "Ugunstig utvalg handler om hvem som kjøper forsikring, ikke om atferd etter kjøpet."),
        F("Moralsk hasard, som dempes med obligatorisk medlemskap",
          "Riktig navn, feil løsning. Tvang hindrer at de gode risikoene lar være å kjøpe. Den endrer ikke atferd."),
        F("Manglende diversifisering, som dempes med høyere premie",
          "Manglende diversifisering betyr at skaden rammer mange samtidig. Her er problemet én kundes atferd."),
    ],
    kort="<p><b>Moralsk hasard, egenandel.</b> Med egenandel bærer kunden en del av tapet selv. Det gir henne en grunn "
         "til å låse sykkelen.</p>",
    full="<p><b>Hva moralsk hasard er.</b> Moralsk hasard er at forsikringen endrer atferden etter at avtalen er inngått. "
         "Den som er fullt forsikret, taper ingenting på å være uforsiktig. Selskapet kan ikke observere atferden og "
         "kan derfor ikke prise den.</p>"
         "<p><b>Steg 1: hvorfor det er et problem.</b> Når kundene blir mindre forsiktige, stiger skadene. Premien må "
         "opp for alle, også for de forsiktige.</p>"
         "<p><b>Steg 2: løsningen.</b> En egenandel gjør at kunden bærer den første delen av tapet selv. Da lønner det "
         "seg igjen å låse sykkelen. Egenandelen gjenoppretter en del av insentivet uten at selskapet trenger å "
         "observere noe.</p>"
         "<p><b>Steg 3: skill de tre markedssviktene.</b> Moralsk hasard handler om atferd etter kjøpet: egenandel. "
         "Ugunstig utvalg handler om hvem som kjøper: tvang eller obligatorisk medlemskap. Manglende diversifisering "
         "handler om risiko som rammer alle samtidig: privat forsikring bryter sammen.</p>"
         "<p><b>Kontroll:</b> spør om problemet oppstår før eller etter at avtalen er inngått. Etter: moralsk hasard. "
         "Før: ugunstig utvalg.</p>"
         "<p><b>Husk:</b> moralsk hasard dempes med egenandel. Koble mekanismen til navnet, ikke omvendt.</p>",
)

statisk(
    "fors-s05", tema=T, type="begrep",
    q="<p>I et forsikringsmarked kjøper de med høy risiko forsikring, mens de med lav risiko lar være. Selskapet kan ikke "
      "skille dem. Premien må settes etter de dårlige risikoene. I verste fall bryter markedet sammen. Hvilket navn og "
      "hvilken løsning hører sammen med dette?</p>",
    alternativer=[
        R("Ugunstig utvalg, som dempes med tvang eller obligatorisk medlemskap"),
        F("Moralsk hasard, som dempes med egenandel",
          "Moralsk hasard handler om atferd etter kjøpet. Her er problemet hvem som kjøper."),
        F("Ugunstig utvalg, som dempes med lavere premie",
          "Riktig navn, feil løsning. Kan selskapet ikke skille kundene, trekker lavere premie bare inn flere med høy "
          "risiko og gir underskudd."),
        F("Manglende diversifisering, som dempes med egenandel",
          "Manglende diversifisering betyr at alle rammes samtidig. Her er problemet at risikoene er ulike og skjult."),
    ],
    kort="<p><b>Ugunstig utvalg, tvang.</b> Når alle må være med, kan ikke de gode risikoene velge seg ut. Folketrygden er "
         "kursets eksempel.</p>",
    full="<p><b>Hva ugunstig utvalg er.</b> Kunden vet mer om sin egen risiko enn selskapet. De som vet at de er gode "
         "risikoer, synes premien er for høy og lar være. Igjen står de dårlige risikoene.</p>"
         "<p><b>Steg 1: spiralen.</b> Når de gode forsvinner, stiger snittskaden. Premien må opp. Da faller enda flere "
         "gode risikoer fra. I verste fall er det ingen igjen som vil kjøpe til en pris selskapet kan leve med.</p>"
         "<p><b>Steg 2: løsningen.</b> Gjør medlemskap obligatorisk. Da kan ingen velge seg ut. Premien kan da settes "
         "etter snittet av alle. Folketrygdens alderspensjon og uføretrygd er eksempler: en livsvarig forsikring alle "
         "må være med i.</p>"
         "<p><b>Steg 3: hvorfor ikke egenandel.</b> Egenandel endrer atferd etter kjøpet. Den sier ingenting om hvem "
         "som kjøper. Den løser moralsk hasard, ikke ugunstig utvalg.</p>"
         "<p><b>Kontroll:</b> spør når informasjonsproblemet oppstår. Skjult risiko før avtalen: ugunstig utvalg. "
         "Skjult atferd etter avtalen: moralsk hasard.</p>"
         "<p><b>Husk:</b> ugunstig utvalg dempes med tvang eller obligatorisk medlemskap.</p>",
)

statisk(
    "fors-s06", tema=T, type="begrep",
    q="<p>Hvorfor egner arbeidsledighet seg dårlig for privat forsikring, ifølge kurset?</p>",
    alternativer=[
        R("Den rammer mange samtidig, så risikoen kan ikke spres over kundene"),
        F("Arbeidsledighet er for sjelden til at noen vil kjøpe forsikringen",
          "Den er ikke sjelden. Problemet er at den kommer samtidig for mange."),
        F("Folketrygden forbyr private forsikringer mot inntektstap",
          "Det finnes ikke noe slikt forbud. Forklaringen er at risikoen ikke kan diversifiseres."),
        F("Tapet ved arbeidsledighet er for lite til at det lønner seg å forsikre",
          "Tapet av lønn er stort for de fleste. Det er derfor behovet for dekning er så stort."),
    ],
    kort="<p><b>Manglende diversifisering.</b> I en lavkonjunktur mister mange jobben samtidig. Et privat selskap kan ikke "
         "spre den risikoen, så dekningen ligger i folketrygden.</p>",
    full="<p><b>Hvorfor forsikring vanligvis virker.</b> Et forsikringsselskap samler mange uavhengige risikoer. Det "
         "brenner i noen få hus hvert år, ikke i alle. Med mange kunder blir det samlede tapet forutsigbart. Premiene "
         "fra alle betaler for de få.</p>"
         "<p><b>Steg 1: hva som skiller arbeidsledighet.</b> Arbeidsledighet skyldes ofte konjunkturer. Når økonomien "
         "går dårlig, mister mange jobben samtidig. Risikoene er sterkt korrelert, ikke uavhengige.</p>"
         "<p><b>Steg 2: hva det gjør med selskapet.</b> I en krise kommer kravene fra en stor del av kundemassen på én "
         "gang. Premiene fra de gode årene strekker ikke til. Et privat selskap kan gå konkurs nettopp når "
         "forsikringen trengs mest.</p>"
         "<p><b>Steg 3: hvem som bærer den.</b> Staten kan spre risikoen over tid og over hele befolkningen. Derfor "
         "ligger dekningen ved arbeidsledighet i folketrygden, ikke i markedet. H2019 oppgave 7c hadde dette som riktig "
         "svar.</p>"
         "<p><b>Kontroll:</b> sammenlign med husbrann. Én brann sier lite om hvorvidt naboens hus brenner. Én oppsigelse i "
         "en krise sier mye om sjansen for at naboen også blir oppsagt.</p>"
         "<p><b>Husk:</b> forsikring krever uavhengige risikoer. Risiko som rammer alle samtidig, kan ikke "
         "diversifiseres privat.</p>",
)

statisk(
    "fors-s07", tema=T, type="paastand", rekkefolge="fast",
    q="<p>I: Egenandel demper moralsk hasard.</p><p>II: Obligatorisk medlemskap demper ugunstig utvalg.</p>"
      "<p>Hvilke påstander er riktige?</p>",
    alternativer=[
        F("Bare I", "II er også riktig: når alle må være med, kan ikke de gode risikoene velge seg ut."),
        F("Bare II", "I er også riktig: egenandelen gir kunden en grunn til å være forsiktig."),
        R("Både I og II"),
        F("Ingen av dem", "Begge koblingene er kursets standardsvar på de to markedssviktene."),
    ],
    kort="<p><b>Både I og II.</b> Egenandel retter atferd etter kjøpet. Tvang hindrer at de gode risikoene faller fra.</p>",
    full="<p><b>To informasjonsproblemer, to løsninger.</b> Begge markedssviktene skyldes at kunden vet noe selskapet ikke "
         "ser. De skiller seg i hva som er skjult og når.</p>"
         "<p><b>Påstand I.</b> Moralsk hasard er skjult atferd etter kjøpet: den fullt forsikrede passer dårligere på. "
         "Egenandelen lar kunden bære en del av tapet selv. Da lønner forsiktighet seg igjen. Påstanden er riktig.</p>"
         "<p><b>Påstand II.</b> Ugunstig utvalg er skjult risiko før kjøpet: de med høy risiko kjøper, de med lav lar "
         "være. Obligatorisk medlemskap gjør at alle er med, så premien kan settes etter snittet. Påstanden er "
         "riktig.</p>"
         "<p><b>Kontroll:</b> bytt løsningene og se at det ikke virker. Tvang endrer ikke hvor forsiktig noen er. "
         "Egenandel endrer ikke hvem som kjøper. Koblingene kan altså ikke byttes.</p>"
         "<p><b>Den tredje svikten.</b> Manglende diversifisering, som ved arbeidsledighet, har ingen av disse "
         "løsningene. Der må staten bære risikoen.</p>"
         "<p><b>Husk:</b> moralsk hasard: egenandel. Ugunstig utvalg: tvang.</p>",
)

statisk(
    "fors-s08", tema=T, type="begrep",
    q="<p>Et selskap tilbyr forsikring av sykkelen din til aktuarisk pris: premien er lik forventet utbetaling. Du har "
      "nyttefunksjonen U(W) = ln W. Bør du kjøpe?</p>",
    alternativer=[
        R("Ja: til aktuarisk pris kjøper enhver risikoavers person forsikring"),
        F("Nei: ln W gir for svak risikoaversjon til å betale for småting",
          "ln W er tvert imot mer risikoavers enn √W. Til aktuarisk pris kjøper begge."),
        F("Bare hvis sykkelen er en stor del av formuen",
          "Størrelsen avgjør hvor mye du ville betalt over aktuarisk pris, ikke om du kjøper til aktuarisk pris."),
        F("Det spiller ingen rolle, siden forventet formue er den samme",
          "Det er svaret for en risikonøytral person. En risikoavers foretrekker den sikre formuen."),
    ],
    kort="<p><b>Ja.</b> Forventet formue er den samme med og uten forsikring, men risikoen forsvinner. En risikoavers tar "
         "gratis risikoreduksjon.</p>",
    full="<p><b>Hva aktuarisk pris betyr.</b> Premien er lik forventet utbetaling: sannsynligheten for tyveri ganger "
         "verdien av sykkelen. Selskapet går i null i forventning.</p>"
         "<p><b>Steg 1: forventet formue.</b> Uten forsikring mister du sykkelen med sannsynlighet p. Med forsikring "
         "betaler du p × verdien sikkert. Forventet formue er nøyaktig den samme.</p>"
         "<p><b>Steg 2: risikoen.</b> Uten forsikring er formuen usikker. Med full dekning er den sikker.</p>"
         "<p><b>Steg 3: nytten.</b> ln W er konkav. Da gir Jensens ulikhet E[ln W] &lt; ln E[W]: et sikkert beløp er "
         "bedre enn et usikkert med samme forventning. Forsikringen gir deg nettopp det sikre beløpet.</p>"
         "<p><b>Kontroll med tall:</b> formue 800 000, sykkel 40 000 og 10 % sannsynlighet for tyveri. Uten forsikring: "
         "0,9 × ln 800 000 + 0,1 × ln 760 000 = 13,58724. Med forsikring til aktuarisk premie 4 000: ln 796 000 = "
         "13,58735. Nytten er høyere med forsikring. ✓</p>"
         "<p><b>Husk:</b> til aktuarisk pris kjøper enhver risikoavers person full dekning, med √W og med ln W. "
         "H2024 oppgave 11a hadde ln W-alternativet som felle.</p>",
)

statisk(
    "fors-s09", tema=T, type="begrep",
    q="<p>Selskapet lar deg selv velge hvor stor andel av verdien til elsykkelen din du vil forsikre. Prisen per forsikret "
      "krone er aktuarisk riktig. Du er risikoavers. Hvor stor andel bør du forsikre?</p>",
    alternativer=[
        R("100 % av verdien"),
        F("Mellom 50 % og 99 %, for å beholde litt egenrisiko",
          "Det er svaret når prisen har påslag. Til aktuarisk pris er hver krone dekning gratis i forventning."),
        F("Under 50 %, fordi små tap kan bæres selv",
          "Det er et praktisk råd når premiene har påslag, ikke teoriens svar til aktuarisk pris."),
        F("Det avhenger av hvor mye sykkelen er verdt",
          "Resultatet gjelder uansett beløp og uansett konkav nyttefunksjon."),
    ],
    kort="<p><b>100 %.</b> Til aktuarisk pris er forventet formue lik ved enhver dekningsgrad. Risikoen blir null først ved "
         "full dekning.</p>",
    full="<p><b>Resultatet.</b> Til aktuarisk pris er full dekning optimalt for enhver risikoavers person. Det er Mossins "
         "resultat. Det var svaret i H2024 oppgave 11b.</p>"
         "<p><b>Steg 1: forventet formue.</b> Hver krone dekning koster nøyaktig det den forventes å gi tilbake. Om du "
         "forsikrer 30 %, 70 % eller 100 %, er forventet formue den samme.</p>"
         "<p><b>Steg 2: risikoen.</b> Jo mer du forsikrer, jo mindre svinger formuen. Ved 100 % er den sikker.</p>"
         "<p><b>Steg 3: valget.</b> En risikoavers person foretrekker mindre risiko når forventningen er lik. Den siste "
         "kronen dekning fjerner fortsatt litt risiko og koster ingenting i forventning. Derfor går du helt til "
         "100 %.</p>"
         "<p><b>Kontroll med tall:</b> formue 90 000, sykkel 50 000, 20 % tyveri og √W. Ingen dekning gir forventet "
         "nytte 280,00, halv dekning 282,23 og full dekning 282,84. Nytten stiger hele veien til full dekning. ✓</p>"
         "<p><b>Når svaret endres.</b> Legger selskapet på et påslag, koster den siste kronen dekning mer enn den er "
         "verdt. Da blir egenandel optimal. Det er grunnen til at ekte forsikringer har egenandel.</p>"
         "<p><b>Husk:</b> aktuarisk pris gir full dekning. Påslag gir egenandel.</p>",
)

statisk(
    "fors-s10", tema=T, type="begrep",
    q="<p>Ekte skadeforsikringer har nesten alltid egenandel. Hvilken forklaring passer med teorien om forventet nytte i "
      "kurset?</p>",
    alternativer=[
        R("Med påslag over aktuarisk pris er den siste kronen dekning dyrere enn den er verdt"),
        F("Risikoaverse personer foretrekker å bære små tap selv, uansett pris",
          "Til aktuarisk pris forsikrer en risikoavers person alt. Det er påslaget som gjør egenandel optimal."),
        F("Egenandel gjør forsikringen billigere for selskapet uten at kunden taper noe på det",
          "Kunden bærer en del av risikoen selv. Det er en kostnad, som bare lønner seg når premien har påslag."),
        F("Loven krever egenandel på alle skadeforsikringer",
          "Ingen lov krever egenandel. Den er et valg i avtalen."),
    ],
    kort="<p><b>Påslaget.</b> Ekte premier ligger over aktuarisk pris. Nær full dekning er det lite risiko igjen å fjerne, "
         "så den siste kronen dekning er ikke verdt prisen.</p>",
    full="<p><b>Utgangspunktet.</b> Til aktuarisk pris er full dekning optimalt. Ekte premier ligger likevel over "
         "aktuarisk pris, fordi selskapet har kostnader og skal tjene penger.</p>"
         "<p><b>Steg 1: verdien av den siste kronen dekning.</b> Med lite dekning fjerner en ekstra krone mye risiko. "
         "Nær full dekning er nesten all risiko alt borte. Den siste kronen fjerner nesten ingenting.</p>"
         "<p><b>Steg 2: prisen på den siste kronen.</b> Med påslag koster hver krone dekning mer enn den forventes å gi "
         "tilbake. Den prisen er den samme for den siste kronen som for den første.</p>"
         "<p><b>Steg 3: valget.</b> Når gevinsten av den siste kronen faller under prisen, stopper du før full dekning. "
         "Det du lar være å forsikre, er egenandelen.</p>"
         "<p><b>Kontroll med tall:</b> formue 800 000, sykkel 40 000, 10 % tyveri og ln W. Optimal dekningsgrad er "
         "100 % uten påslag, 78 % med et påslag på 1 % av aktuarisk pris, 57 % med 2 % og 0 % med 5 %. ✓</p>"
         "<p><b>En annen grunn.</b> Egenandelen demper også moralsk hasard. Den gir kunden en grunn til å være "
         "forsiktig.</p>"
         "<p><b>Husk:</b> aktuarisk pris gir full dekning. Påslag gir egenandel.</p>",
)

statisk(
    "fors-s11", tema=T, type="paastand",
    q="<p>Emma har nyttefunksjonen U(W) = √W og vurderer full dekning av huset. Hvilken påstand er riktig?</p>",
    alternativer=[
        R("Hun kan rasjonelt betale mer enn forventet skade for full dekning"),
        F("Hun bør aldri betale mer enn forventet skade",
          "Det er regelen for en risikonøytral person. En risikoavers betaler gjerne mer, opp til maksimalpremien."),
        F("Hun kjøper full dekning uansett hvor høy premien er",
          "Risikoaversjon gir en øvre grense, maksimalpremien W − CE. Over den sier hun nei."),
        F("Hun betaler mer enn forventet skade bare hvis hun har ln W i stedet",
          "√W er også konkav og dermed risikoavers. ln W betaler bare enda mer."),
    ],
    kort="<p><b>Hun kan betale mer enn forventet skade.</b> Maksimalpremien er forventet skade pluss risikopremien.</p>",
    full="<p><b>Den store misforståelsen.</b> «Premien er høyere enn forventet skade, altså kjøper jeg ikke» er en gal "
         "regel. Den sammenligner kroner, ikke nytte. H2024 oppgave 11c hadde den som eget alternativ.</p>"
         "<p><b>Steg 1: maksimalpremien.</b> Den høyeste premien Emma godtar, er W − CE, der CE er "
         "sikkerhetsekvivalenten. Den kan deles i to: forventet skade pluss risikopremien E[W] − CE.</p>"
         "<p><b>Steg 2: risikopremien er positiv.</b> √W er konkav, så CE ligger under forventet formue. Risikopremien "
         "er derfor positiv. Emma betaler gjerne mer enn forventet skade.</p>"
         "<p><b>Kontroll med tall:</b> hus til 1 000 000, 1 % brannsannsynlighet, ingen annen formue. Forventet skade "
         "er 10 000. E[U] uten forsikring er 0,99 × 1 000 = 990. Med premie 15 000 er nytten √985 000 = 992,47, "
         "høyere. Emma kjøper, selv om premien er 50 % over forventet skade. ✓ Med premie 25 000 er nytten "
         "√975 000 = 987,42, lavere. Da sier hun nei. Maksimalpremien er 19 900.</p>"
         "<p><b>Husk:</b> sammenlign forventet nytte. En risikoavers betaler opp til forventet skade pluss "
         "risikopremien.</p>",
)

statisk(
    "fors-s12", tema=T, type="begrep",
    q="<p>Hvilken egenskap ved en nyttefunksjon U(W) gjør en person risikoavers?</p>",
    alternativer=[
        R("Den er konkav: grensenytten avtar med formuen"),
        F("Den er stigende: mer formue er alltid bedre",
          "Alle nyttefunksjonene i kurset er stigende, også den risikonøytrale U = W. Risikoaversjon krever krumning."),
        F("Den er konveks: hver ny krone er verdt mer enn den forrige",
          "Konveks nytte gir risikosøking: personen foretrekker lotteriet framfor det sikre beløpet."),
        F("Den er lineær i formuen", "Lineær nytte, U = W, er risikonøytral. Bare forventet formue teller da."),
    ],
    kort="<p><b>Konkav.</b> U″ &lt; 0: den siste kronen er verdt mindre enn den første. Da veier et tap tyngre enn en like "
         "stor gevinst.</p>",
    full="<p><b>Risikoaversjon er krumning.</b> En nyttefunksjon rangerer formuesnivåer. To egenskaper avgjør alt i "
         "forsikringsdelen. U′ &gt; 0 betyr at mer er bedre. U″ &lt; 0 betyr avtakende grensenytte. Den andre er "
         "risikoaversjon.</p>"
         "<p><b>Steg 1: kursets to funksjoner.</b> √W har U″ = −¼W<sup>−3/2</sup> &lt; 0. ln W har U″ = −1/W<sup>2</sup> "
         "&lt; 0. Begge er konkave og altså risikoaverse.</p>"
         "<p><b>Steg 2: hvorfor krumning gir risikoaversjon.</b> Har du 50 000 og kan vinne eller tape 40 000 med lik "
         "sannsynlighet, tas tapet fra de første kronene dine. De er mest verdt. Gevinsten legges på toppen, der hver "
         "krone er verdt minst. Snittet av nyttene blir lavere enn nytten av å bli stående.</p>"
         "<p><b>Kontroll med tall:</b> med √W er √50 000 = 223,6. Lotteriet gir (√10 000 + √90 000)/2 = (100 + 300)/2 "
         "= 200. Det sikre beløpet gir høyere nytte. ✓</p>"
         "<p><b>Husk:</b> konkav nytte er risikoaversjon. Lineær er risikonøytral. Konveks er risikosøkende.</p>",
)

statisk(
    "fors-s13", tema=T, type="formel",
    q="<p>W er en usikker formue. Nyttefunksjonen er U(W) = √W. Hvilken ulikhet gjelder alltid?</p>",
    alternativer=[
        R("E[√W] &lt; √E[W]"),
        F("E[√W] &gt; √E[W]", "Snudd. For en konkav funksjon ligger forventet nytte under nytten av forventningen."),
        F("E[√W] = √E[W]", "Likhet gjelder bare for en lineær funksjon, altså en risikonøytral person."),
        F("E[W] &lt; (E[√W])<sup>2</sup>", "(E[√W])<sup>2</sup> er sikkerhetsekvivalenten. Den ligger under "
                                             "forventet formue, ikke over."),
    ],
    kort="<p><b>E[√W] &lt; √E[W].</b> Jensens ulikhet for en konkav funksjon: forventet nytte er lavere enn nytten av "
         "forventet formue.</p>",
    full="<p><b>Jensens ulikhet.</b> For en konkav funksjon U og en usikker W er E[U(W)] &lt; U(E[W]). Med ord: et sikkert "
         "beløp er bedre enn et usikkert beløp med samme forventning. Det er hele grunnlaget for at forsikring "
         "finnes.</p>"
         "<p><b>Steg 1: et eksempel.</b> W er 10 000 eller 90 000 med 50 % hver. E[√W] = (100 + 300)/2 = 200.</p>"
         "<p><b>Steg 2: nytten av forventningen.</b> E[W] = 50 000. Nytten av det er √50 000 = 223,6, mer enn 200.</p>"
         "<p><b>Steg 3: sikkerhetsekvivalenten.</b> CE = (E[√W])<sup>2</sup> = 200<sup>2</sup> = 40 000. Den ligger "
         "under E[W] = 50 000. Forskjellen, 10 000, er risikopremien.</p>"
         "<p><b>Kontroll:</b> den siste påstanden, E[W] &lt; (E[√W])<sup>2</sup>, ville sagt 50 000 &lt; 40 000. Det er "
         "galt. ✓</p>"
         "<p><b>Husk:</b> konkav nytte gir E[U(W)] &lt; U(E[W]). Derfor betaler en risikoavers for å bytte et usikkert "
         "beløp mot et sikkert.</p>",
)

statisk(
    "fors-s14", tema=T, type="begrep",
    q="<p>Hva er sikkerhetsekvivalenten til en usikker formue?</p>",
    alternativer=[
        R("Den sikre formuen som gir samme nytte som den usikre"),
        F("Forventet formue i den usikre posisjonen",
          "Det er svaret for en risikonøytral person. For en risikoavers ligger sikkerhetsekvivalenten under."),
        F("Den laveste formuen du kan ende opp med",
          "Sikkerhetsekvivalenten ligger mellom det dårligste utfallet og forventet formue, ikke i bunnen."),
        F("Formuen etter at du har betalt aktuarisk premie for full dekning",
          "Det er forventet formue, W − pL. Sikkerhetsekvivalenten er lavere."),
    ],
    kort="<p><b>Den sikre formuen med samme nytte.</b> U(CE) = E[U]. Med √W er CE = (E[U])<sup>2</sup>, med ln W er "
         "CE = e<sup>E[U]</sup>.</p>",
    full="<p><b>Definisjonen.</b> Sikkerhetsekvivalenten (CE) er det sikre beløpet som er nøyaktig like godt som den "
         "usikre posisjonen: U(CE) = E[U(W)]. Den gjør et nyttetall om til kroner.</p>"
         "<p><b>Steg 1: hvordan du regner den.</b> Regn forventet nytte. Snu deretter nyttefunksjonen. Med √W kvadrerer du. "
         "Med ln W tar du eksponentialen.</p>"
         "<p><b>Steg 2: hvor den ligger.</b> For en risikoavers person er CE lavere enn forventet formue, men høyere "
         "enn det dårligste utfallet.</p>"
         "<p><b>Steg 3: hva den brukes til.</b> Maksimalpremien for full dekning er W − CE. Risikopremien er "
         "E[W] − CE.</p>"
         "<p><b>Kontroll med tall:</b> formue 1 000 000, 1 % sjanse for å miste alt og √W. E[U] = 990, så "
         "CE = 990<sup>2</sup> = 980 100. Forventet formue er 990 000. CE ligger under den og over 0. ✓ "
         "Maksimalpremien er 1 000 000 − 980 100 = 19 900.</p>"
         "<p><b>Husk:</b> regn deg alltid tilbake til kroner. Nyttetallene sier lite alene. Sikkerhetsekvivalenten "
         "sier hva risikoen koster.</p>",
)

statisk(
    "fors-s15", tema=T, type="formel",
    q="<p>E[W] er forventet formue, CE sikkerhetsekvivalenten, W formuen uten skade, p sannsynligheten for skade og L "
      "tapet. Hvilket uttrykk er risikopremien?</p>",
    alternativer=[
        R("E[W] − CE"),
        F("CE − E[W]", "Riktig størrelse, feil fortegn. For en risikoavers er risikopremien alltid positiv."),
        F("W − CE", "Det er maksimalpremien for full dekning. Den er aktuarisk premie pluss risikopremie."),
        F("p × L", "Det er forventet skade, den aktuariske premien. Risikopremien kommer i tillegg."),
    ],
    kort="<p><b>E[W] − CE.</b> Det du er villig til å gi opp i forventning for å slippe risikoen.</p>",
    full="<p><b>Hva risikopremien måler.</b> En risikoavers person verdsetter en usikker formue til mindre enn "
         "forventningen. Forskjellen, målt i kroner, er risikopremien: E[W] − CE.</p>"
         "<p><b>Steg 1: de tre størrelsene.</b> W er formuen om ingenting skjer. E[W] = W − pL er forventet formue. "
         "CE er sikkerhetsekvivalenten.</p>"
         "<p><b>Steg 2: dekomponeringen.</b> Maksimalpremien er W − CE. Den kan skrives (W − E[W]) + (E[W] − CE) = "
         "pL + risikopremien. Forventet skade pluss risikopremie.</p>"
         "<p><b>Kontroll med tall:</b> formue 2 250 000, 10 % sjanse for at den faller til 250 000, √W. "
         "E[U] = 0,9 × 1 500 + 0,1 × 500 = 1 400, CE = 1 960 000. E[W] = 2 050 000. Risikopremien er 90 000. "
         "Maksimalpremien er 2 250 000 − 1 960 000 = 290 000, som er 200 000 i forventet skade pluss 90 000. ✓</p>"
         "<p><b>Husk:</b> risikopremie = E[W] − CE. Maksimalpremie = W − CE = forventet skade + risikopremie.</p>",
)

statisk(
    "fors-s16", tema=T, type="formel",
    q="<p>W er formuen uten skade, p sannsynligheten for et tap L, E[W] forventet formue og CE sikkerhetsekvivalenten. "
      "Hvilket uttrykk er den maksimale premien for full dekning?</p>",
    alternativer=[
        R("P<sub>maks</sub> = p × L + (E[W] − CE)"),
        F("P<sub>maks</sub> = p × L − (E[W] − CE)", "Fortegnet er snudd. Risikopremien legges til forventet skade, den "
                                                     "trekkes ikke fra."),
        F("P<sub>maks</sub> = E[W] − CE", "Det er risikopremien alene. Forventet skade mangler."),
        F("P<sub>maks</sub> = W − E[W]", "Det er forventet skade, p × L. Risikopremien mangler."),
    ],
    kort="<p><b>p × L + (E[W] − CE).</b> Forventet skade pluss risikopremien. Det er det samme som W − CE.</p>",
    full="<p><b>To veier til samme tall.</b> Maksimalpremien løser U(W − P) = E[U uten forsikring]. Det gir "
         "P<sub>maks</sub> = W − CE. Dekomponeringen er kontrollen.</p>"
         "<p><b>Steg 1: del opp.</b> W − CE = (W − E[W]) + (E[W] − CE). Det første leddet er forventet skade, p × L. "
         "Det andre er risikopremien.</p>"
         "<p><b>Steg 2: tolk.</b> En risikonøytral person betaler bare forventet skade. En risikoavers betaler i "
         "tillegg for å slippe risikoen. Maksimalpremien ligger derfor alltid over aktuarisk premie og under hele "
         "tapet.</p>"
         "<p><b>Kontroll med H2024 oppgave 11d:</b> hus til 1 000 000, 1 % brann, √W. CE = 990<sup>2</sup> = 980 100. "
         "W − CE = 19 900. Forventet skade er 10 000, E[W] = 990 000 og risikopremien 9 900. 10 000 + 9 900 = 19 900. "
         "✓</p>"
         "<p><b>Husk:</b> P<sub>maks</sub> = W − CE = p × L + (E[W] − CE). Regn den begge veier når du kan.</p>",
)

statisk(
    "fors-s17", tema=T, type="formel",
    q="<p>Formuen er W. Med sannsynlighet p inntreffer et tap L. En polise dekker andelen α av tapet mot premien P. Hvilket "
      "uttrykk er forventet nytte med polisen?</p>",
    alternativer=[
        R("(1 − p) × U(W − P) + p × U(W − L + αL − P)"),
        F("(1 − p) × U(W − P) + p × U(W − L + αL)", "Premien glemt i skadetilstanden. Den betales også når skaden "
                                                    "inntreffer."),
        F("(1 − p) × U(W) + p × U(W − L + αL − P)", "Premien bare trukket i skadetilstanden. Den betales uansett."),
        F("U(W − P − p(1 − α)L)", "Det er nytten av forventet formue. Med delvis dekning er formuen fortsatt usikker."),
    ],
    kort="<p><b>(1 − p) × U(W − P) + p × U(W − L + αL − P).</b> Premien trekkes i begge tilstander. Utbetalingen αL "
         "kommer bare ved skade.</p>",
    full="<p><b>Tilstandstabellen først.</b> Skriv formuen i hver tilstand før du setter inn i nyttefunksjonen. Med "
         "delvis dekning er risikoen dempet, ikke borte.</p>"
         "<p><b>Steg 1: ingen skade.</b> Du har betalt premien: W − P.</p>"
         "<p><b>Steg 2: skade.</b> Du taper L, får αL utbetalt og har betalt premien: W − L + αL − P.</p>"
         "<p><b>Steg 3: forventet nytte.</b> Vekt nyttene med sannsynlighetene: (1 − p) × U(W − P) + p × "
         "U(W − L + αL − P).</p>"
         "<p><b>Kontroll med H2025 oppgave 13.3:</b> W = 9 000 000, alt brenner, α = 50 %, P = 160 000, p = 1 %, √W. "
         "0,99 × √8 840 000 + 0,01 × √4 340 000 = 2 943,48 + 20,83 = 2 964,31. Glemmer du premien i skadetilstanden, "
         "får du √4 500 000 og 2 964,69. ✓ Begge er under 2 970,00 uten forsikring, men i andre tall kan feilen snu "
         "svaret.</p>"
         "<p><b>Husk:</b> premien betales i begge tilstander. Ved full dekning ser du det ikke, ved delvis dekning er "
         "det avgjørende.</p>",
)

statisk(
    "fors-s18", tema=T, type="formel",
    q="<p>Huset er hele formuen W og går helt tapt med sannsynlighet p. U(0) = 0. Full dekning koster P. Hvilket uttrykk "
      "gir den kritiske sannsynligheten p* der forsikringen akkurat lønner seg?</p>",
    alternativer=[
        R("p* = 1 − U(W − P)/U(W)"),
        F("p* = U(W − P)/U(W)", "Det er 1 − p*, sannsynligheten for at huset står."),
        F("p* = P/W", "Det er terskelen for en risikonøytral person. En risikoavers kjøper ved lavere p."),
        F("p* = [U(W) − U(W − P)]/[U(W) − U(P)]", "Premien satt inn i nyttefunksjonen i nevneren i stedet for "
                                                 "formuen etter tapet. Ved totaltap er U(W − L) = U(0) = 0."),
    ],
    kort="<p><b>p* = 1 − U(W − P)/U(W).</b> Fra (1 − p*) × U(W) + p* × 0 = U(W − P).</p>",
    full="<p><b>Indifferensen.</b> Uten forsikring er forventet nytte (1 − p) × U(W) + p × U(0). Med full dekning er "
         "den U(W − P). Terskelen p* gjør de to like.</p>"
         "<p><b>Steg 1: sett inn U(0) = 0.</b> (1 − p*) × U(W) = U(W − P).</p>"
         "<p><b>Steg 2: løs.</b> 1 − p* = U(W − P)/U(W), altså p* = 1 − U(W − P)/U(W).</p>"
         "<p><b>Steg 3: retningen.</b> Høyresiden avhenger ikke av p. Venstresiden faller når p øker. Forsikringen "
         "lønner seg for alle p over p*.</p>"
         "<p><b>Kontroll med H2025 oppgave 13.2:</b> W = 9 000 000, P = 160 000, √W. p* = 1 − 2 973,2137/3 000 = "
         "0,89 %. Det er under 1 %, i tråd med at forsikringen lønner seg ved 1 %. ✓ Den risikonøytrale terskelen "
         "P/W = 1,78 % ligger over.</p>"
         "<p><b>Husk:</b> formelen gjelder bare når alt går tapt og U(0) = 0. Mister du bare en del, løser du "
         "(1 − p) × U(W) + p × U(W − L) = U(W − P).</p>",
)

statisk(
    "fors-s19", tema=T, type="begrep",
    q="<p>To personer har samme formue og står overfor samme risiko for tap. Den ene har U(W) = √W, den andre "
      "U(W) = ln W. Hvem er villig til å betale mest for full dekning?</p>",
    alternativer=[
        R("Den med ln W, fordi relativ risikoaversjon er 1 mot 0,5"),
        F("Den med √W, fordi kvadratroten krummer mest",
          "Snudd. ln W har relativ risikoaversjon 1, √W har 0,5. ln W krummer mest."),
        F("De betaler det samme, siden formuen og risikoen er helt den samme",
          "Maksimalpremien avhenger av personen, ikke bare av risikoen."),
        F("Det avhenger bare av premien, ikke av nyttefunksjonen",
          "Premien er det selskapet krever. Hva personen er villig til å betale, bestemmes av nyttefunksjonen."),
    ],
    kort="<p><b>Den med ln W.</b> ln W er mer risikoavers enn √W og har lavere sikkerhetsekvivalent. Da blir "
         "maksimalpremien høyere.</p>",
    full="<p><b>Samme familie, ulik krumning.</b> Kursets nyttefunksjoner hører til familien U(W) = W<sup>1−γ</sup>/"
         "(1 − γ), der γ er den relative risikoaversjonen. √W svarer til γ = 0,5, ln W til γ = 1. Det er samme γ som i "
         "Mertons formel.</p>"
         "<p><b>Steg 1: hva γ betyr.</b> Høyere γ gir mer krum nyttefunksjon. Et tap trekker nytten mer ned. "
         "Sikkerhetsekvivalenten havner da lenger under forventet formue.</p>"
         "<p><b>Steg 2: maksimalpremien.</b> P<sub>maks</sub> = W − CE. Lavere CE gir høyere maksimalpremie.</p>"
         "<p><b>Kontroll med tall:</b> formue 6 000 000, hus til 3 000 000, 1,1 % brann. Med ln W er maksimalpremien "
         "45 574. Med √W er den 38 600. Aktuarisk premie er 33 000. ✓ ln W betaler mest. Begge betaler mer enn "
         "forventet skade.</p>"
         "<p><b>Husk:</b> rekkefølgen følger γ: risikonøytral (γ = 0) betaler forventet skade, √W litt mer, ln W enda "
         "mer.</p>",
)

statisk(
    "fors-s20", tema=T, type="begrep",
    q="<p>Kurset gir rådet «forsikre huset og ansvaret, ikke mobilen». Hva er den beste begrunnelsen?</p>",
    alternativer=[
        R("Risikopremien på småtap er nesten null, men premiene har høyt påslag"),
        F("Teorien sier at små tap ikke bør forsikres, heller ikke til aktuarisk pris",
          "Til aktuarisk pris sier teorien full dekning, også for småting. Det er påslaget som gjør det ulønnsomt."),
        F("Mobiler blir sjeldnere stjålet enn hus brenner",
          "Sannsynligheten er ikke kriteriet. En mobil blir oftere borte enn et hus brenner. Det er størrelsen på tapet "
          "som avgjør."),
        F("Huset er lovpålagt å forsikre, mobilen er det ikke",
          "Boligforsikring er ikke lovpålagt. Banken krever den som vilkår for boliglånet."),
    ],
    kort="<p><b>Lite tap, høyt påslag.</b> Et tap på noen tusen flytter deg knapt på nyttekurven. Da er du nesten "
         "risikonøytral og bør ikke betale påslag. Huset kan du ikke bære selv.</p>",
    full="<p><b>Regelen.</b> Forsikre det du ikke kan bære selv. Bær det du kan. Regelen følger av forventet nytte når "
         "premiene har påslag, slik ekte premier har.</p>"
         "<p><b>Steg 1: små tap.</b> Et tap på 10 000 av en formue på 3 millioner flytter deg nesten ingenting på "
         "nyttekurven. Kurven er nesten rett over et så kort stykke. Risikopremien blir noen kroner. Forsikringen er "
         "verdt omtrent forventet skade for deg. Mobilforsikringer koster gjerne langt mer.</p>"
         "<p><b>Steg 2: store tap.</b> Et tap på 2,8 millioner flytter deg langt ned, der kurven er bratt. "
         "Risikopremien blir stor. Du er villig til å betale godt over forventet skade.</p>"
         "<p><b>Kontroll med tall:</b> formue 3 000 000 og √W. Mobil til 10 000 med 10 % tap: maksimalpremien er "
         "1 000,75, nesten nøyaktig forventet skade på 1 000. Bolig til 2 800 000 med 0,2 % brann: maksimalpremien er "
         "8 895, mot forventet skade 5 600. Risikopremien er 75 øre for mobilen og 3 295 kroner for boligen. ✓</p>"
         "<p><b>Hva som ikke er grunnen.</b> Teorien sier ikke at små tap aldri skal forsikres. Til aktuarisk pris er "
         "full dekning best også for mobilen. Det er påslaget som gjør det dumt.</p>"
         "<p><b>Husk:</b> forsikre store tap du ikke kan bære. For små tap er risikopremien for liten til å forsvare "
         "påslaget.</p>",
)

statisk(
    "fors-s21", tema=T, type="tolkning",
    q="<p>Kari har funnet ut at full dekning til en gitt premie lønner seg ved dagens brannsannsynlighet på 2 %. Nå skal "
      "hun finne den laveste sannsynligheten som gjør forsikringen lønnsom. Alternativene er 0,8 %, 1,6 %, 2,4 % og "
      "3,1 %. Hva kan hun slå fast uten å regne?</p>",
    alternativer=[
        R("At terskelen ikke kan være 2,4 % eller 3,1 %"),
        F("At terskelen må være 2,4 % eller 3,1 %, siden den ligger over dagens sannsynlighet",
          "Snudd. Forsikringen lønner seg ved 2 %, så terskelen må ligge under 2 %."),
        F("At terskelen må være 0,8 %, den laveste",
          "Både 0,8 % og 1,6 % er forenlige med kjøpet ved 2 %. Du må teste én av dem."),
        F("Ingenting, terskelen må regnes ut fra bunnen",
          "Retningen gir deg to av fire alternativer gratis. Prøve-og-feile er godkjent av sensor."),
    ],
    kort="<p><b>2,4 % og 3,1 % stryker seg selv.</b> Forsikringen lønner seg for alle sannsynligheter over terskelen. Den "
         "lønner seg ved 2 %, så terskelen ligger under.</p>",
    full="<p><b>Retningen.</b> Med full dekning er nytten U(W − P), uavhengig av sannsynligheten. Uten forsikring er "
         "forventet nytte (1 − p) × U(W) + p × U(W − L). Den faller når p øker. Forsikringen lønner seg derfor for "
         "alle p over terskelen p*.</p>"
         "<p><b>Steg 1: bruk det du vet.</b> Forsikringen lønner seg ved p = 2 %. Da er 2 % over p*. Terskelen må ligge "
         "under 2 %.</p>"
         "<p><b>Steg 2: stryk.</b> 2,4 % og 3,1 % ligger over 2 %. De er uforenlige med kjøpet og kan strykes uten "
         "regning.</p>"
         "<p><b>Steg 3: test én av de to som står igjen.</b> Sett p = 1,6 % inn i forventet nytte uten forsikring. Er "
         "den lavere enn U(W − P), lønner forsikringen seg der også. Da er svaret 0,8 %. Er den høyere, er svaret "
         "1,6 %.</p>"
         "<p><b>Kontroll:</b> sensorveiledningen til H2025 oppgave 13.2 anbefalte nettopp dette. Der lønnet "
         "forsikringen seg ved 1 %. Alternativene over 1 % kunne strykes.</p>"
         "<p><b>Husk:</b> terskelen ligger under enhver sannsynlighet der forsikringen alt lønner seg. Med minuspoeng er "
         "eliminering verdt mye.</p>",
)

statisk(
    "fors-s22", tema=T, type="tolkning",
    q="<p>Ola har U(W) = √W. Han har nettopp regnet ut at han ikke vil kjøpe full dekning av huset for en premie på "
      "kr 25 000. Forventet skade er kr 10 000. Hvor må maksimalpremien hans ligge?</p>",
    alternativer=[
        R("Mellom kr 10 000 og kr 25 000"),
        F("Over kr 25 000", "Da ville han kjøpt til 25 000. Han sa nei, så grensen ligger under."),
        F("Under kr 10 000", "En risikoavers person betaler minst forventet skade. Grensen ligger over 10 000."),
        F("Nøyaktig kr 10 000", "Det er grensen for en risikonøytral person. √W er risikoavers og betaler mer."),
    ],
    kort="<p><b>Mellom 10 000 og 25 000.</b> Over forventet skade fordi han er risikoavers. Under 25 000 fordi han sa nei "
         "til den premien.</p>",
    full="<p><b>To grenser du alltid har.</b> Maksimalpremien er forventet skade pluss risikopremien. For en risikoavers "
         "person er risikopremien positiv. Maksimalpremien ligger derfor over forventet skade og under hele tapet.</p>"
         "<p><b>Steg 1: nedre grense.</b> Forventet skade er 10 000. √W er konkav, så risikopremien er positiv. "
         "Maksimalpremien er over 10 000.</p>"
         "<p><b>Steg 2: øvre grense.</b> Ola takket nei til 25 000. Hadde maksimalpremien vært over 25 000, ville han "
         "sagt ja. Den er derfor under 25 000.</p>"
         "<p><b>Steg 3: bruk det på alternativene.</b> I H2024 oppgave 11d var alternativene 19 900, 23 100, 27 100 og "
         "29 900. De to over 25 000 stryker seg selv. Bare 19 900 og 23 100 står igjen. Den ene må testes.</p>"
         "<p><b>Kontroll:</b> med hus til 1 000 000, 1 % brann og ingen annen formue er E[U] = 990. "
         "√(1 000 000 − 23 100) = 988,38, under 990, så 23 100 er for høyt. √(1 000 000 − 19 900) = 990,00. "
         "Maksimalpremien er 19 900. ✓</p>"
         "<p><b>Husk:</b> forventet skade &lt; maksimalpremie &lt; en premie du har sagt nei til. Stryk først, regn "
         "etterpå.</p>",
)

statisk(
    "fors-s23", tema=T, type="tolkning",
    q="<p>Med full dekning skriver vi forventet nytte som U(W − P), uten noen sannsynlighet. Hvorfor?</p>",
    alternativer=[
        R("Formuen er W − P i begge tilstander, så utfallet er sikkert"),
        F("Sannsynligheten er alt bakt inn i premien, så den kan strykes",
          "Premien avhenger ofte av sannsynligheten, men det er ikke grunnen. Grunnen er at formuen er lik i begge "
          "tilstander."),
        F("Fordi en forsikret person ikke bryr seg om sannsynligheten for skade",
          "Hun bryr seg, men formuen blir den samme uansett. Derfor faller sannsynligheten ut av regnestykket."),
        F("Fordi skaden ikke kan skje når du er forsikret",
          "Skaden kan fortsatt skje. Den blir bare erstattet fullt ut."),
    ],
    kort="<p><b>Formuen er sikker.</b> Uten skade har du W − P. Med skade har du W − L + L − P = W − P. Sannsynlighetene "
         "summerer til 1.</p>",
    full="<p><b>Tilstandstabellen.</b> Skriv opp formuen i hver tilstand før du setter inn i nyttefunksjonen. Da ser du "
         "hva forsikringen gjør.</p>"
         "<p><b>Steg 1: ingen skade.</b> Du har betalt premien. Formuen er W − P.</p>"
         "<p><b>Steg 2: skade.</b> Du taper L, får L erstattet og har betalt premien. Formuen er W − L + L − P = "
         "W − P.</p>"
         "<p><b>Steg 3: forventet nytte.</b> (1 − p) × U(W − P) + p × U(W − P) = U(W − P). Sannsynlighetene faller "
         "bort fordi begge tilstandene gir samme formue.</p>"
         "<p><b>Hvorfor det betyr noe.</b> Det er nettopp dette som gjør full dekning verdifull for en risikoavers "
         "person: risikoen er borte. Det er også grunnen til at den kritiske sannsynligheten kan løses med en "
         "høyreside som ikke avhenger av p.</p>"
         "<p><b>Kontroll:</b> med delvis dekning er formuen ulik i de to tilstandene. Da står sannsynlighetene igjen på "
         "begge sider. Premien må trekkes i begge tilstander.</p>"
         "<p><b>Husk:</b> full dekning gir sikker formue W − P. Delvis dekning gir fortsatt to tilstander.</p>",
)

statisk(
    "fors-s24", tema=T, type="begrep",
    q="<p>Full dekning av huset til en gitt premie lønner seg for Nora. Selskapet tilbyr i stedet 50 % dekning til samme "
      "premie. Hvorfor kan svaret nå bli nei?</p>",
    alternativer=[
        R("Prisen per krone dekning dobles, mens risikoen bare dempes"),
        F("Med delvis dekning betales ikke premien hvis huset brenner",
          "Premien betales i begge tilstander, også ved delvis dekning."),
        F("Delvis dekning er aldri lønnsom for en risikoavers person",
          "Til en lav nok premie kan delvis dekning lønne seg. Her er problemet prisen."),
        F("Forventet skade dobles når dekningen halveres",
          "Forventet skade avhenger av sannsynligheten og tapet, ikke av dekningen."),
    ],
    kort="<p><b>Dobbel pris per krone dekning.</b> Samme premie kjøper halvparten så mye dekning. Påslaget over aktuarisk "
         "pris dobles.</p>",
    full="<p><b>Hva du får for premien.</b> Med full dekning kjøper premien hele tapet. Med 50 % dekning kjøper samme "
         "premie halvparten. Det du betaler per krone dekning, er doblet.</p>"
         "<p><b>Steg 1: H2025 oppgave 13.</b> Hus til 9 000 000, 1 % brann, premie 160 000, √W. Aktuarisk pris for full "
         "dekning er 90 000. Premien er 1,78 ganger det. Full dekning lønner seg: √8 840 000 = 2 973,21 mot 2 970,00 "
         "uten.</p>"
         "<p><b>Steg 2: halv dekning.</b> Aktuarisk pris er nå 45 000. Premien er 3,56 ganger det. Formuen er "
         "8 840 000 om huset står og 4 340 000 om det brenner. Forventet nytte er 0,99 × 2 973,21 + 0,01 × 2 083,27 = "
         "2 964,31, under 2 970,00. Svaret er nei.</p>"
         "<p><b>Steg 3: hvorfor.</b> Risikoaversjonen rakk til et påslag på 1,78 ganger aktuarisk pris, men ikke til "
         "3,56 ganger. Halv dekning fjerner dessuten bare en del av risikoen.</p>"
         "<p><b>Kontroll:</b> maksimalpremien for halv dekning er rundt 126 000, under 160 000. ✓ Konklusjonen fra full "
         "dekning kan ikke dras videre. Regn på nytt.</p>"
         "<p><b>Husk:</b> delvis dekning til samme premie er en dyrere forsikring per krone. Svaret kan snu.</p>",
)

statisk(
    "fors-s25", tema=T, type="fakta",
    q="<p>Hvilken påstand om økonomisk dekning ved uførhet i Norge er riktig?</p>",
    alternativer=[
        R("Grunndekningen ligger i folketrygdens uføretrygd. Privat uføreforsikring er frivillig."),
        F("Alle arbeidstakere er pålagt ved lov å kjøpe privat uføreforsikring i tillegg til folketrygden",
          "Privat uføreforsikring er frivillig. Den kjøpes for å tette gapet mellom uføretrygden og tidligere lønn."),
        F("Obligatorisk tjenestepensjon er en lovpålagt uføreforsikring for den ansatte",
          "OTP er pensjonssparing arbeidsgiveren er pålagt. Den er ikke det samme som en uføreforsikring du må ha."),
        F("Uføreforsikring er lovpålagt for alle som har boliglån",
          "Ingen lov krever det. Banken kan tilby slike forsikringer, men de er frivillige."),
    ],
    kort="<p><b>Folketrygden gir grunndekningen.</b> Uføretrygd følger av medlemskapet i folketrygden. Privat "
         "uføreforsikring er et frivillig tillegg.</p>",
    full="<p><b>Tre lag.</b> Dekning ved uførhet kan komme fra folketrygden, fra arbeidsgiveren og fra private "
         "forsikringer du kjøper selv. Bare det første gjelder alle automatisk.</p>"
         "<p><b>Steg 1: folketrygden.</b> Alle medlemmer av folketrygden kan få uføretrygd. Medlemskapet er "
         "obligatorisk. Det hindrer ugunstig utvalg: de med lav risiko kan ikke velge seg ut.</p>"
         "<p><b>Steg 2: privat forsikring.</b> Uføretrygden dekker ikke hele den tidligere lønnen. Mange kjøper derfor "
         "privat uføreforsikring for å tette gapet. Den er frivillig.</p>"
         "<p><b>Steg 3: OTP.</b> Obligatorisk tjenestepensjon er lovpålagt for arbeidsgiveren og gjelder pensjonssparing. "
         "Den må ikke forveksles med en uføreforsikring du selv er pålagt å ha.</p>"
         "<p><b>Kontroll:</b> sammenlign med lista over lovpålagte privatforsikringer. Blant de vanlige er bare "
         "ansvarsforsikring for bil lovpålagt. Uføreforsikring står ikke der.</p>"
         "<p><b>Husk:</b> uføretrygd i folketrygden er grunnmuren. Privat uføreforsikring er frivillig.</p>",
)

statisk(
    "fors-s26", tema=T, type="begrep",
    q="<p>Per er risikonøytral, med U(W) = W. Han risikerer et tap L med sannsynlighet p. Hva er det meste han vil betale "
      "for full dekning?</p>",
    alternativer=[
        R("p × L, den forventede skaden"),
        F("Mer enn p × L, fordi tapet kan bli stort", "Det gjelder en risikoavers person. Den risikonøytrale bryr seg "
                                                      "bare om forventet formue."),
        F("Ingenting, fordi en risikonøytral person aldri forsikrer",
          "Til en premie under p × L øker forsikringen forventet formue. Da kjøper også Per."),
        F("L, hele tapet", "Ingen betaler hele tapet for å forsikre en skade som ikke er sikker."),
    ],
    kort="<p><b>p × L.</b> Med lineær nytte teller bare forventet formue. Risikopremien er null, så maksimalpremien er "
         "forventet skade.</p>",
    full="<p><b>Hva risikonøytral betyr.</b> Med U(W) = W er nytten lik formuen. Forventet nytte er forventet formue. "
         "Personen bryr seg ikke om risiko, bare om snittet.</p>"
         "<p><b>Steg 1: uten forsikring.</b> E[W] = W − p × L.</p>"
         "<p><b>Steg 2: med forsikring.</b> Formuen er W − P, sikkert.</p>"
         "<p><b>Steg 3: grensen.</b> W − P = W − p × L gir P = p × L. Over det taper Per i forventning. Under det "
         "tjener han.</p>"
         "<p><b>Kontroll mot dekomponeringen:</b> maksimalpremien er forventet skade pluss risikopremien. Med lineær "
         "nytte er sikkerhetsekvivalenten lik forventet formue, så risikopremien er null. Da står bare p × L igjen. ✓</p>"
         "<p><b>Hvorfor det er nyttig.</b> Den risikonøytrale grensen er den nedre grensen for alle risikoaverse. En "
         "maksimalpremie under forventet skade er alltid feil for √W og ln W.</p>"
         "<p><b>Husk:</b> risikonøytral: betaler forventet skade. Risikoavers: betaler forventet skade pluss "
         "risikopremie.</p>",
)

statisk(
    "fors-s27", tema=T, type="begrep",
    q="<p>Hvorfor kan et forsikringsselskap ta på seg risiko som ville vært altfor stor for én husholdning?</p>",
    alternativer=[
        R("Det samler mange uavhengige risikoer, så det samlede tapet blir forutsigbart"),
        F("Det er risikonøytralt av natur og bryr seg derfor ikke om hvor store tapene blir",
          "Selskapet kan oppføre seg nesten risikonøytralt nettopp fordi det sprer risikoen. Spredningen er "
          "forklaringen."),
        F("Staten garanterer for alle tap i forsikringsselskaper",
          "Det finnes ingen slik generell garanti. Selskapet bærer tapene selv."),
        F("Premiene er alltid høyere enn det største tapet som kan inntreffe",
          "Da ville ingen kjøpt forsikring. Premien er litt over forventet skade, ikke over det største tapet."),
    ],
    kort="<p><b>Spredning.</b> Med mange uavhengige kunder jevner tapene seg ut. Andelen som rammes, blir nær "
         "sannsynligheten.</p>",
    full="<p><b>Store talls lov.</b> Brenner ett av hundre hus i snitt, vet du ikke om ditt hus brenner. Men et selskap "
         "med 100 000 kunder kan regne med rundt 1 000 branner. Usikkerheten for den enkelte blir forutsigbarhet for "
         "selskapet.</p>"
         "<p><b>Steg 1: for husholdningen.</b> Et totaltap kan ruinere familien. Med konkav nytte er det svært dyrt i "
         "nytte. Husholdningen betaler derfor gjerne mer enn forventet skade for å slippe.</p>"
         "<p><b>Steg 2: for selskapet.</b> Summen av mange uavhengige tap svinger lite i forhold til størrelsen. "
         "Selskapet trenger bare å kreve litt over forventet skade for å dekke tap og kostnader.</p>"
         "<p><b>Steg 3: gevinsten.</b> Kunden betaler litt over forventet skade og får bort en stor risiko. Selskapet "
         "tjener påslaget. Begge vinner.</p>"
         "<p><b>Kontroll:</b> mekanismen svikter når risikoene ikke er uavhengige. Arbeidsledighet i en lavkonjunktur "
         "rammer mange samtidig. Derfor ligger den dekningen i folketrygden.</p>"
         "<p><b>Husk:</b> forsikring virker fordi uavhengige risikoer kan spres. Korrelert risiko kan ikke spres "
         "privat.</p>",
)
