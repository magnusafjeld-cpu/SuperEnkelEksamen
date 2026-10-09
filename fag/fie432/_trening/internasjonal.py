# -*- coding: utf-8 -*-
"""Eksamenstrening, tema «internasjonal»: internasjonal skatt (k13) og exit-skatt (k6),
   kjernepensum kj7.

   Regnerutine R12 i eksamens-DNA-en: int-kred1 (ordinær kredit for ett land) og
   int-reg1 (flere land under unntak, kredit og uten avtale). Exit-skatten:
   int-exit1 (utflytting, bunnfradrag kr 3 000 000) og int-gave1 (gave til noen
   bosatt i utlandet, terskel kr 100 000). Resten er begrep og fakta.

   Uten skatteavtale: eksamenssettene regner med ingen lettelse (H2020, H2021,
   H2024). Skatteloven § 16-20 gir likevel kreditfradrag ensidig. Regnespørsmålene
   sier derfor uttrykkelig at den ensidige kreditten skal holdes utenfor.
"""
import re
from trening_lib import *  # noqa: F401,F403

TEMA = "internasjonal"

NAVN = ["Mira", "Jonas", "Selma", "Aksel", "Ingrid", "Tobias", "Nora", "Elias", "Live", "Henrik",
        "Sigrid", "Eirik", "Hedda", "Sander", "Astrid", "Kasper", "Thea", "Vegard"]
SELSKAP = ["Nordfjell AS", "Havbris Teknologi AS", "Fjordlab AS", "Kodeskog AS", "Tindra Systems AS",
           "Brattli Industri AS", "Lysnes Software AS"]
LAND = ["Land K", "Land M", "Land S", "Land T", "Land V", "Land X", "Land Y", "Land Z"]


# ---------------------------------------------------------------- lokale hjelpere
def nb(s):
    s = re.sub(r"(\d) (?=\d{3}(?!\d))", "\\1" + NBSP, s)
    s = re.sub(r"(\d) (?=\d{3}(?!\d))", "\\1" + NBSP, s)
    s = re.sub(r"\bkr (?=[\d−])", "kr" + NBSP, s)
    s = re.sub(r"(\d) %", "\\1" + NBSP + "%", s)
    return s


def _fiks(alt):
    for a in alt:
        a.tekst = nb(a.tekst)
        if a.felle:
            a.felle = nb(a.felle)
    return alt


def sp(q, alt, kort, full, rekkefolge=None):
    return sporsmal(nb(q), _fiks(alt), nb(kort), nb(full), rekkefolge)


def st(id_, typ, q, alt, kort, full, rekkefolge=None):
    statisk(id_, tema=TEMA, type=typ, q=nb(q), alternativer=_fiks(alt), kort=nb(kort), full=nb(full),
            rekkefolge=rekkefolge)


_RUNDE = {}


def tur(nøkkel, valg):
    """Går syklisk gjennom valgene, så variantene i en familie fordeler seg jevnt."""
    return valg[_RUNDE.get(nøkkel, 0) % len(valg)]


def ferdig(nøkkel, sp_):
    _RUNDE[nøkkel] = _RUNDE.get(nøkkel, 0) + 1
    return sp_


def velg(r, riktig, kand, n=3, rel=0.02):
    kand = [k for k in kand if not nær(k[0], riktig, rel)]
    # fjern kandidater som er like hverandre, behold den første
    unike = []
    for k in kand:
        if not any(nær(k[0], u[0], rel) for u in unike):
            unike.append(k)
    if len(unike) < n:
        raise Avvis("for få feller")
    valgt = r.sample(unike, n)
    ulike(riktig, *[v for v, _ in valgt], rel=rel)
    return valgt


def p(x):
    """Brøk til prosent med så få desimaler som trengs: 0.075 → «7,5 %», 0.22 → «22 %»."""
    v = x * 100
    for d in range(3):
        if abs(v * 10 ** d - round(v * 10 ** d)) < 1e-9:
            return tall(v, d) + NBSP + "%"
    return tall(v, 2) + NBSP + "%"


HJEM = 0.22


# ---------------------------------------------------------------------------
# int-kred1 · Ordinær kredit for ett land (R12)
# ---------------------------------------------------------------------------
@familie("int-kred1", tema=TEMA, antall=6, tittel="Ordinær kredit for ett land")
def _(r):
    selskap = r.choice(SELSKAP)
    land = r.choice(LAND)
    niva, spm = tur("int-kred1", [("lav", "norge"), ("høy", "samlet"), ("lav", "samlet"), ("høy", "ukreditert"),
                                  ("høy", "norge"), ("lav", "norge")])
    Y = r.randrange(2_000_000, 40_000_001, 1_000_000)
    k = r.choice([0.05, 0.10, 0.12, 0.15, 0.16, 0.18, 0.20]) if niva == "lav" else \
        r.choice([0.25, 0.26, 0.28, 0.30, 0.35, 0.40])
    norsk, kilde = HJEM * Y, k * Y
    kred = min(kilde, norsk)
    rest = norsk - kred
    if spm == "norge" and niva == "lav":
        riktig = rest
        kand = [(0, f"Behandlet som fullstendig unntak: da får Norge ingenting. Under ordinær kredit krever Norge "
                    f"restskatten når kildesatsen er lavere enn 22 %."),
                (norsk, f"Kreditfradraget glemt: {tall(Y)} × 22 % = {tall(norsk)}. Norge trekker fra skatten som er "
                        f"betalt i {land}."),
                (kilde, f"Dette er skatten til {land}, {tall(Y)} × {p(k)} = {tall(kilde)}, ikke skatten til Norge.")]
        spørsmål = f"Hvor mye skatt betaler {selskap} til Norge av overskuddet i {land}?"
    elif spm == "norge":
        riktig = 0
        kand = [(kilde, f"Dette er skatten til {land}, {tall(Y)} × {p(k)} = {tall(kilde)}, ikke skatten til Norge."),
                (norsk, f"Ingen kredit gitt: {tall(Y)} × 22 % = {tall(norsk)}. Norge gir fradrag for skatten betalt i "
                        f"{land}, opp til den norske skatten."),
                (kilde - norsk, f"Dette er kildeskatten som ikke får kredit, {tall(kilde)} − {tall(norsk)} = "
                                f"{tall(kilde - norsk)}. Den betales ikke til Norge, den blir liggende i {land}.")]
        spørsmål = f"Hvor mye skatt betaler {selskap} til Norge av overskuddet i {land}?"
    elif spm == "samlet" and niva == "lav":
        riktig = norsk
        kand = [(kilde, f"Behandlet som fullstendig unntak: bare skatten i {land}, {tall(kilde)}. Under kredit "
                        f"løftes inntekten til norsk nivå."),
                (norsk + kilde, f"Ingen lettelse: {tall(norsk)} + {tall(kilde)} = {tall(norsk + kilde)}. Avtalen gir "
                                f"kreditfradrag for skatten i {land}."),
                (rest, f"Bare restskatten til Norge, {tall(rest)}. Skatten til {land} kommer i tillegg.")]
        spørsmål = f"Hva blir samlet skatt, i Norge og i {land}, på overskuddet i {land}?"
    elif spm == "samlet":
        riktig = kilde
        kand = [(norsk, f"Full kredit: som om Norge krediterte hele skatten i {land} og ga tilbake differansen. "
                        f"Kreditten er begrenset til norsk skatt, {tall(norsk)}."),
                (norsk + kilde, f"Ingen lettelse: {tall(norsk)} + {tall(kilde)} = {tall(norsk + kilde)}. Avtalen gir "
                                f"kreditfradrag opp til den norske skatten."),
                (kilde - norsk, f"Dette er bare den delen av kildeskatten som ikke får kredit, {tall(kilde - norsk)}. "
                                f"Samlet skatt er hele kildeskatten.")]
        spørsmål = f"Hva blir samlet skatt, i Norge og i {land}, på overskuddet i {land}?"
    else:  # ukreditert
        riktig = kilde - norsk
        kand = [(0, f"Full kredit: all skatt betalt i {land} krediteres. Under ordinær kredit er fradraget begrenset "
                    f"til norsk skatt på inntekten."),
                (kilde, f"Hele skatten i {land}, {tall(kilde)}. Opp til {tall(norsk)} får den kredit."),
                (norsk, f"Dette er kreditfradraget, {tall(norsk)}, altså den delen som får kredit.")]
        spørsmål = f"Hvor mye av skatten betalt i {land} får ikke kredit i Norge?"
    valgt = velg(r, riktig, kand)

    q = (f"<p>{selskap} er hjemmehørende i Norge. Selskapet har {kr(Y)} i overskudd gjennom et fast driftssted i "
         f"{land}, som skattlegger overskuddet med {p(k)} [eksempeltall]. Norsk selskapsskatt er 22 % [dagens regel]. "
         f"Skatteavtalen mellom Norge og {land} bygger på ordinær kredit.</p><p>{spørsmål}</p>")
    alternativer = [R(kr(riktig), riktig)] + [F(kr(v), f, v) for v, f in valgt]
    kort = (f"<p><b>{kr(riktig)}.</b> Norsk skatt {tall(norsk)}, skatt i {land} {tall(kilde)}. Kreditfradraget er "
            f"min({tall(kilde)} ; {tall(norsk)}) = {tall(kred)}. Restskatten til Norge er {tall(rest)}.</p>")
    if niva == "høy":
        kort = (f"<p><b>{kr(riktig)}.</b> Skatt i {land} {tall(kilde)}, norsk skatt {tall(norsk)}. Kreditten er "
                f"begrenset til {tall(norsk)}, så Norge får 0. {tall(kilde - norsk)} av kildeskatten får ingen "
                f"kredit.</p>")
    full = (
        "<p><b>Hva ordinær kredit er.</b> Norge skattlegger hjemmehørende selskaper for hele verdensinntekten "
        "(globalskatteplikt). Kildestaten skattlegger inntekten fra det faste driftsstedet. Under ordinær kredit gir "
        "Norge fradrag i norsk skatt for skatten betalt ute, men høyst med den norske skatten på samme inntekt. "
        "Restskatten til Norge kan derfor aldri bli negativ.</p>"
        f"<p><b>Steg 1: skattene hver for seg.</b> {land}: {tall(Y)} × {p(k)} = {tall(kilde)}. Norge før lettelse: "
        f"{tall(Y)} × 22 % = {tall(norsk)}.</p>"
        f"<p><b>Steg 2: kreditfradraget.</b> min({tall(kilde)} ; {tall(norsk)}) = {tall(kred)}.</p>"
        f"<p><b>Steg 3: restskatten til Norge.</b> {tall(norsk)} − {tall(kred)} = {tall(rest)}.</p>"
        f"<p><b>Steg 4: samlet.</b> {tall(kilde)} + {tall(rest)} = {tall(kilde + rest)}"
        + (f". Ukreditert kildeskatt: {tall(kilde)} − {tall(norsk)} = {tall(kilde - norsk)}" if niva == "høy" else "")
        + f". Svaret på spørsmålet er <b>{kr(riktig)}</b>.</p>"
        f"<p><b>Kontroll med satsene.</b> Under ordinær kredit ender samlet skatt på den høyeste av satsene: "
        f"maks(22 % ; {p(k)}) = {p(max(HJEM, k))}. {tall(Y)} × {p(max(HJEM, k))} = {tall(Y * max(HJEM, k))} ✓.</p>"
        "<p><b>Husk:</b> kreditfradrag = min(kildeskatt ; norsk skatt). Samlet skatt = maks(t<sub>hjem</sub> ; "
        "t<sub>kilde</sub>) × Y.</p>"
    )
    return ferdig("int-kred1", sp(q, alternativer, kort, full))


# ---------------------------------------------------------------------------
# int-reg1 · Flere land: unntak, kredit og ingen avtale (R12, H2024 oppgave 10)
# ---------------------------------------------------------------------------
@familie("int-reg1", tema=TEMA, antall=6, tittel="Unntak, kredit og ingen avtale i flere land")
def _(r):
    selskap = r.choice(SELSKAP)
    regimer = tur("int-reg1", [("unntak", "kredit", "ingen"), ("kredit", "ingen"), ("unntak", "kredit"),
                               ("unntak", "ingen"), ("unntak", "kredit", "ingen"), ("kredit", "ingen")])
    spm = tur("int-reg1", ["norge", "samlet", "norge", "sats", "samlet", "norge"])
    navn_land = r.sample(LAND, len(regimer))
    N = r.randrange(5_000_000, 40_000_001, 1_000_000)
    land = []
    for reg, ln in zip(regimer, navn_land):
        Y = r.randrange(2_000_000, 30_000_001, 1_000_000)
        if reg == "unntak":
            t = r.choice([0.10, 0.15, 0.25, 0.30, 0.35])
        elif reg == "kredit":
            t = r.choice([0.10, 0.12, 0.15, 0.18, 0.25, 0.30])
        else:
            t = r.choice([0.05, 0.075, 0.10, 0.125])
        land.append(dict(reg=reg, n=ln, Y=Y, t=t))
    total = N + sum(l["Y"] for l in land)

    def norge_av(l, avvik=None):
        reg = avvik or l["reg"]
        if reg == "unntak":
            return 0.0
        if reg == "kredit":
            return max(0.0, HJEM * l["Y"] - l["t"] * l["Y"])
        if reg == "full":
            return HJEM * l["Y"] - l["t"] * l["Y"]
        return HJEM * l["Y"]  # ingen avtale, ingen lettelse

    norge = HJEM * N + sum(norge_av(l) for l in land)
    ute = sum(l["t"] * l["Y"] for l in land)
    samlet = norge + ute

    def med(endret):
        """Skatt til Norge når ett land behandles etter en gal regel."""
        return HJEM * N + sum(norge_av(l, endret.get(l["n"])) for l in land)

    feil = []   # (skatt til Norge, forklaring)
    feil.append((HJEM * total, f"Hele verdensinntekten skattlagt med 22 % uten avtalene: {tall(total)} × 22 % = "
                               f"{tall(HJEM * total)}. Det er skatteplikten etter intern rett isolert sett."))
    for l in land:
        if l["reg"] == "unntak" and l["t"] < HJEM:
            feil.append((med({l["n"]: "kredit"}), f"{l['n']} behandlet som kredit i stedet for unntak: Norge ville "
                                                   f"krevd restskatt på {tall((HJEM - l['t']) * l['Y'])}. Under "
                                                   f"fullstendig unntak gir Norge helt avkall."))
        if l["reg"] == "unntak" and l["t"] >= HJEM:
            feil.append((med({l["n"]: "ingen"}), f"{l['n']} behandlet som om det ikke fantes avtale: Norge ville "
                                                  f"krevd {tall(HJEM * l['Y'])}. Under fullstendig unntak gir Norge "
                                                  f"helt avkall."))
        if l["reg"] == "kredit":
            feil.append((med({l["n"]: "ingen"}), f"Kreditfradraget for {l['n']} glemt: Norge krever full skatt "
                                                  f"{tall(HJEM * l['Y'])} der."))
            if l["t"] > HJEM:
                feil.append((med({l["n"]: "full"}), f"Full kredit for {l['n']}: Norge betaler da tilbake "
                                                     f"{tall((l['t'] - HJEM) * l['Y'])}. Kreditten er begrenset til "
                                                     f"norsk skatt."))
            else:
                feil.append((med({l["n"]: "unntak"}), f"{l['n']} behandlet som unntak: restskatten "
                                                       f"{tall((HJEM - l['t']) * l['Y'])} mangler."))
        if l["reg"] == "ingen":
            feil.append((med({l["n"]: "unntak"}), f"{l['n']} behandlet som unntak: uten avtale gir Norge ikke avkall "
                                                   f"på de {tall(HJEM * l['Y'])}."))
            feil.append((med({l["n"]: "kredit"}), f"Kredit gitt for skatten i {l['n']}. Det gjør skatteloven § 16-20, "
                                                   f"men oppgaven sier at den skal holdes utenfor, slik eksamenssettene "
                                                   f"gjør."))
    if spm == "norge":
        riktig = norge
        kand = list(feil)
    else:
        kand = [(v + ute, f + f" Med skatten ute, {tall(ute)}, blir samlet skatt {tall(v + ute)}.") for v, f in feil]
        kand.append((norge, f"Bare skatten til Norge, {tall(norge)}. Skatten betalt i utlandet, {tall(ute)}, kommer i "
                            f"tillegg."))
        riktig = samlet
        if spm == "sats":
            riktig = samlet / total
            kand = [(v / total, f + f" Delt på {tall(total)} gir det {pst(v / total, 2)}.") for v, f in kand]
    valgt = velg(r, riktig, kand, rel=0.01 if spm == "sats" else 0.02)

    beskriv = {"unntak": "skatteavtalen bygger på fullstendig unntak",
               "kredit": "skatteavtalen bygger på ordinær kredit",
               "ingen": "Norge har ingen skatteavtale med landet"}
    liste = "<ul>" + f"<li>Norge: {kr(N)}</li>" + "".join(
        f"<li>{l['n']}: {kr(l['Y'])}, skattlagt der med {p(l['t'])}. {beskriv[l['reg']].capitalize()}.</li>"
        for l in land) + "</ul>"
    ingen = any(l["reg"] == "ingen" for l in land)
    forutsetning = (" Forutsett, slik eksamenssettene gjør, at Norge ikke gir lettelse for skatt betalt i et land uten "
                    "skatteavtale. Se altså bort fra den ensidige kreditten i skatteloven § 16-20." if ingen else "")
    if spm == "norge":
        spørsmål = f"Hvor mye skatt betaler {selskap} til Norge for året?"
        fmt = lambda v: kr(v)
    elif spm == "samlet":
        spørsmål = f"Hva blir samlet skatt for {selskap}, i Norge og i utlandet?"
        fmt = lambda v: kr(v)
    else:
        spørsmål = (f"Hva blir samlet skatt, i Norge og i utlandet, i prosent av overskuddet på {kr(total)}? Rund av "
                    f"til to desimaler.")
        fmt = lambda v: pst(v, 2)
    q = (f"<p>{selskap} er hjemmehørende i Norge og har ingen kostnader. Overskuddet fordeler seg slik. Alle "
         f"utenlandsinntektene er opptjent gjennom faste driftssteder [eksempeltall]:</p>{liste}"
         f"<p>Norsk selskapsskatt er 22 % [dagens regel].{forutsetning}</p><p>{spørsmål}</p>")
    alternativer = [R(fmt(riktig), riktig)] + [F(fmt(v), f, v) for v, f in valgt]

    rader = [f"<tr><td>Norge</td><td>intern rett</td><td class=\"n\">0</td><td class=\"n\">{tall(HJEM * N)}</td></tr>"]
    for l in land:
        rader.append(f"<tr><td>{l['n']}</td><td>{l['reg']}</td><td class=\"n\">{tall(l['t'] * l['Y'])}</td>"
                     f"<td class=\"n\">{tall(norge_av(l))}</td></tr>")
    rader.append(f"<tr><td>Sum</td><td></td><td class=\"n\">{tall(ute)}</td><td class=\"n\">{tall(norge)}</td></tr>")
    tabell = ('<table class="data"><tr><th>Marked</th><th>Metode</th><th>Skatt ute</th><th>Skatt til Norge</th></tr>'
              + "".join(rader) + "</table>")
    steg = []
    for l in land:
        if l["reg"] == "unntak":
            steg.append(f"{l['n']} (unntak): skatt der {tall(l['t'] * l['Y'])}, til Norge 0.")
        elif l["reg"] == "kredit":
            steg.append(f"{l['n']} (kredit): skatt der {tall(l['t'] * l['Y'])}. Norsk skatt {tall(HJEM * l['Y'])}, "
                        f"kreditfradrag {tall(min(l['t'], HJEM) * l['Y'])}, restskatt {tall(norge_av(l))}.")
        else:
            steg.append(f"{l['n']} (ingen avtale): skatt der {tall(l['t'] * l['Y'])} og full norsk skatt "
                        f"{tall(HJEM * l['Y'])}.")
    merbel = samlet - HJEM * total
    kilder = []
    for l in land:
        if l["reg"] == "unntak":
            kilder.append((l["t"] - HJEM) * l["Y"])
        elif l["reg"] == "kredit":
            kilder.append(max(0.0, (l["t"] - HJEM) * l["Y"]))
        else:
            kilder.append(l["t"] * l["Y"])
    if spm == "norge":
        svar = f"Skatt til Norge: <b>{kr(norge)}</b>."
    elif spm == "samlet":
        svar = f"Samlet: {tall(norge)} + {tall(ute)} = <b>{kr(samlet)}</b>."
    else:
        svar = f"Samlet: {tall(norge)} + {tall(ute)} = {tall(samlet)}. Delt på overskuddet: {tall(samlet)}/{tall(total)} = <b>{pst(riktig, 2)}</b>."
    deler = [f"{tall(HJEM * N)} (Norge)"]
    for l in land:
        if l["reg"] == "kredit":
            deler.append(f"{tall(norge_av(l))} (restskatt {l['n']})")
        elif l["reg"] == "ingen":
            deler.append(f"{tall(norge_av(l))} ({l['n']}, ingen avtale)")
    unntak_n = [l["n"] for l in land if l["reg"] == "unntak"]
    kort = (f"<p><b>{fmt(riktig)}.</b> Til Norge: " + " + ".join(deler) + f" = {tall(norge)}"
            + (f". {' og '.join(unntak_n)} gir 0 til Norge (unntak)" if unntak_n else "") + "."
            + ("" if spm == "norge" else f" Skatt ute: {tall(ute)}. Samlet: {tall(samlet)}"
               + (f", altså {pst(riktig, 2)} av {tall(total)}" if spm == "sats" else "") + ".") + "</p>")
    full = (
        "<p><b>Tre regimer.</b> Etter intern rett skattlegger Norge hele verdensinntekten til et hjemmehørende "
        "selskap. Skatteavtalene begrenser retten. Under fullstendig unntak gir Norge helt avkall, så bare kildestatens "
        "skatt står. Under ordinær kredit trekker Norge kildeskatten fra i norsk skatt, høyst med den norske skatten. "
        "Uten avtale regner eksamen med at begge land skattlegger fullt.</p>"
        f"<p><b>Steg 1: Norge.</b> {tall(N)} × 22 % = {tall(HJEM * N)}.</p>"
        + "".join(f"<p><b>Steg {i + 2}: {l['n']}.</b> {s.split(': ', 1)[1]}</p>" for i, (s, l) in enumerate(zip(steg, land)))
        + f"<p><b>Steg {len(steg) + 2}: summer.</b> {svar}</p>"
        + tabell
        + f"<p><b>Kontroll fra den andre kanten.</b> Ren norsk beskatning av alt ville gitt {tall(total)} × 22 % = "
          f"{tall(HJEM * total)}. Samlet skatt er {tall(samlet)}, en forskjell på {tall(merbel)}. Den skal kunne spores "
          f"land for land: " + " + ".join(f"({tall(x)})" if x < 0 else tall(x) for x in kilder)
        + f" = {tall(sum(kilder))} ✓. Unntak gir kildesatsen minus 22 %, kredit bare det som ligger over 22 %. "
          f"Ingen avtale gir hele kildeskatten.</p>"
        + "<p><b>Husk:</b> unntak gir kildesatsen, kredit den høyeste satsen og ingen avtale summen.</p>"
    )
    return ferdig("int-reg1", sp(q, alternativer, kort, full))


# ---------------------------------------------------------------------------
# int-exit1 · Exit-skatt ved utflytting (k6, skatteloven § 10-70)
# ---------------------------------------------------------------------------
@familie("int-exit1", tema=TEMA, antall=6, tittel="Exit-skatt ved utflytting")
def _(r):
    navn = r.choice(NAVN)
    dit = r.choice(["Sveits", "Portugal", "Spania", "Singapore", "Storbritannia", "Uruguay"])
    spm = tur("int-exit1", ["skatt", "skatt", "rate", "skatt", "rate", "skatt"])
    to_poster = tur("int-exit1", [False, True, False, False, True, False])
    if to_poster:
        MV1 = r.randrange(4_000_000, 30_000_001, 1_000_000)
        IV1 = r.randrange(500_000, MV1 - 1_000_000 + 1, 500_000)
        MV2 = r.randrange(1_000_000, 10_000_001, 500_000)
        IV2 = r.randrange(500_000, MV2, 500_000) if MV2 > 500_000 else 0
        MV, IV = MV1 + MV2, IV1 + IV2
    else:
        MV = r.randrange(6_000_000, 60_000_001, 1_000_000)
        IV = r.randrange(500_000, MV - 3_500_000 + 1, 500_000)
    G = MV - IV
    if G <= 3_500_000:
        raise Avvis("gevinsten er for liten")
    skatt = (G - 3_000_000) * 0.3784
    f_bf = G * 0.3784
    f_22 = (G - 3_000_000) * 0.22
    f_mv = MV * 0.3784
    f_mvbf = (MV - 3_000_000) * 0.3784
    if spm == "skatt":
        riktig = skatt
        kand = [(f_bf, f"Bunnfradraget glemt: {tall(G)} × 37,84 % = {tall(f_bf)}."),
                (f_22, f"Oppjusteringen glemt: ({tall(G)} − 3 000 000) × 22 % = {tall(f_22)}. Gevinst på aksjer "
                       f"skattlegges med 22 % × 1,72 = 37,84 %."),
                (f_mv, f"Skatten regnet av markedsverdien i stedet for gevinsten: {tall(MV)} × 37,84 % = {tall(f_mv)}."),
                (f_mvbf, f"Bunnfradraget trukket fra markedsverdien i stedet for fra gevinsten: "
                         f"({tall(MV)} − 3 000 000) × 37,84 % = {tall(f_mvbf)}.")]
        spørsmål = f"Hvor stor blir exit-skatten?"
    else:
        riktig = skatt / 12
        kand = [(skatt, f"Dette er hele exit-skatten, {tall(skatt)}. Spørsmålet gjelder den årlige raten: "
                        f"{tall(skatt)}/12."),
                (f_bf / 12, f"Bunnfradraget glemt: {tall(G)} × 37,84 %/12 = {tall(f_bf / 12)}."),
                (f_22 / 12, f"Oppjusteringen glemt: ({tall(G)} − 3 000 000) × 22 %/12 = {tall(f_22 / 12)}."),
                (f_mvbf / 12, f"Bunnfradraget trukket fra markedsverdien: ({tall(MV)} − 3 000 000) × 37,84 %/12 = "
                              f"{tall(f_mvbf / 12)}.")]
        spørsmål = f"{navn} velger å betale i tolv like, rentefrie årlige rater. Hvor stor blir hver rate?"
    valgt = velg(r, riktig, kand)
    if to_poster:
        eie = (f"{navn} eier aksjer i et norsk aksjeselskap verdt {kr(MV1)} med inngangsverdi {kr(IV1)}. I tillegg har {navn} andeler i "
               f"et aksjefond verdt {kr(MV2)} med inngangsverdi {kr(IV2)}. Verdiene gjelder dagen før utflytting.")
    else:
        eie = (f"{navn} eier aksjer verdt {kr(MV)} dagen før utflytting. Inngangsverdien er {kr(IV)}.")
    q = (f"<p>{navn} har bodd i Norge hele livet og flytter til {dit} i 2026. {eie} Hele verdistigningen er opptjent "
         f"mens {navn} bodde i Norge.</p>"
         f"<p>Latent gevinst skattlegges ved utflytting med 37,84 % (22 % × 1,72) av den delen av samlet gevinst som "
         f"overstiger et bunnfradrag på kr 3 000 000 [dagens regel]. Se bort fra skjermingsfradraget.</p>"
         f"<p>{spørsmål}</p>")
    alternativer = [R(kr(riktig), riktig)] + [F(kr(v), f, v) for v, f in valgt]
    gevinst = (f"({tall(MV1)} − {tall(IV1)}) + ({tall(MV2)} − {tall(IV2)}) = {tall(G)}" if to_poster else
               f"{tall(MV)} − {tall(IV)} = {tall(G)}")
    kort = (f"<p><b>{kr(riktig)}.</b> Gevinst {gevinst}. ({tall(G)} − 3 000 000) × 37,84 % = {tall(skatt)}"
            + (f", delt på 12 = {tall(skatt / 12)}" if spm == "rate" else "") + ".</p>")
    full = (
        "<p><b>Hva exit-skatt er.</b> Når du flytter ut, mister Norge retten til å skattlegge gevinsten når du selger "
        "senere. Derfor anses latent gevinst på aksjer, fondsandeler og lignende som realisert dagen før utflytting "
        "(skatteloven § 10-70). Fra 2024 gjelder et bunnfradrag på kr 3 000 000. Skatten er eierskatten "
        "37,84 %. Skatten fastsettes endelig: et senere verdifall setter den ikke ned.</p>"
        f"<p><b>Steg 1: latent gevinst.</b> {gevinst}.</p>"
        f"<p><b>Steg 2: bunnfradraget.</b> {tall(G)} − 3 000 000 = {tall(G - 3_000_000)}.</p>"
        f"<p><b>Steg 3: skatten.</b> {tall(G - 3_000_000)} × 37,84 % = <b>{tall(skatt)}</b>.</p>"
        + (f"<p><b>Steg 4: ratene.</b> Tolv rentefrie rater: {tall(skatt)}/12 = <b>{tall(skatt / 12)}</b> i året. "
           f"Ratene slår å betale straks så lenge {navn} kan få positiv avkastning på pengene. Mot å betale alt etter "
           f"tolv år med renter avhenger det av statens rentesats.</p>" if spm == "rate" else "")
        + f"<p><b>Kontroll.</b> {tall(G - 3_000_000)} × 1,72 × 22 % = {tall((G - 3_000_000) * 1.72)} × 22 % = "
          f"{tall(skatt)} ✓. Bunnfradraget trekkes fra gevinsten, ikke fra markedsverdien.</p>"
        "<p><b>Betalingen.</b> Skatten kan betales i tolv rentefrie årlige rater, samlet etter tolv år med renter "
        "eller straks. Flytter du tilbake innen tolv år med aksjene i behold, faller den bort.</p>"
        "<p><b>Husk:</b> (markedsverdi − inngangsverdi − 3 000 000) × 37,84 %, dagen før utflytting.</p>"
    )
    return ferdig("int-exit1", sp(q, alternativer, kort, full))


# ---------------------------------------------------------------------------
# int-gave1 · Gave til noen som bor i utlandet (terskel kr 100 000)
# ---------------------------------------------------------------------------
@familie("int-gave1", tema=TEMA, antall=5, tittel="Exit-skatt ved gave til utlandet")
def _(r):
    navn, barn = r.sample(NAVN, 2)
    dit = r.choice(["Sverige", "Danmark", "Tyskland", "Frankrike", "USA", "Australia"])
    case = tur("int-gave1", ["over", "to", "over", "under", "over"])
    if case == "to":
        G1 = r.randrange(50_000, 95_001, 5_000)
        G2 = r.randrange(50_000, 95_001, 5_000)
        G = G1 + G2
        MV1 = G1 + r.randrange(50_000, 400_001, 50_000)
        MV2 = G2 + r.randrange(50_000, 400_001, 50_000)
        MV = MV1 + MV2
        if G <= 100_000:
            raise Avvis("samlet gevinst er ikke over terskelen")
    else:
        G = r.randrange(120_000, 800_001, 10_000) if case == "over" else r.randrange(40_000, 95_001, 5_000)
        MV = G + r.randrange(100_000, 1_500_001, 50_000)
    over = G > 100_000
    skatt = G * 0.3784 if over else 0
    if over:
        kand = [((G - 100_000) * 0.3784, f"Terskelen brukt som fradrag: ({tall(G)} − 100 000) × 37,84 % = "
                                          f"{tall((G - 100_000) * 0.3784)}. Overstiger gevinsten kr 100 000, "
                                          f"skattlegges hele gevinsten."),
                (MV * 0.3784, f"Skatten regnet av markedsverdien: {tall(MV)} × 37,84 % = {tall(MV * 0.3784)}."),
                (G * 0.22, f"Oppjusteringen glemt: {tall(G)} × 22 % = {tall(G * 0.22)}.")]
        if case == "to":
            kand.append((0, "Hver gave vurdert for seg. Grensen gjelder samlet netto gevinst på gavene i året."))
        else:
            kand.append((0, "Bunnfradraget på kr 3 000 000 brukt. Det gjelder bare når du selv flytter ut."))
    else:
        kand = [(G * 0.3784, f"Terskelen oversett: {tall(G)} × 37,84 % = {tall(G * 0.3784)}. Gevinsten er under "
                             f"kr 100 000, så gaven utløser ikke exit-skatt."),
                (MV * 0.3784, f"Skatten regnet av markedsverdien: {tall(MV)} × 37,84 % = {tall(MV * 0.3784)}."),
                (G * 0.22, f"Oppjusteringen glemt og terskelen oversett: {tall(G)} × 22 % = {tall(G * 0.22)}.")]
    valgt = velg(r, skatt, kand)
    if case == "to":
        gaver = (f"I løpet av 2026 gir {navn} to poster med børsnoterte aksjer til {barn}, som er bosatt i {dit}. Den "
                 f"første posten er verdt {kr(MV1)} og har en gevinst på {kr(G1)}. Den andre er verdt {kr(MV2)} og har "
                 f"en gevinst på {kr(G2)}.")
    else:
        gaver = (f"{navn} gir en post børsnoterte aksjer til {barn}, som er bosatt i {dit}. Posten er verdt {kr(MV)} "
                 f"og har inngangsverdi {kr(MV - G)}. Det er {gen(navn)} eneste gave i 2026.")
    q = (f"<p>{navn} er bosatt i Norge. {gaver}</p>"
         f"<p>Gave til en person bosatt i utlandet utløser exit-skatt når samlet netto gevinst på slike gaver i året "
         f"overstiger kr 100 000. Gevinsten skattlegges da med 37,84 % (22 % × 1,72). Ved egen utflytting gjelder et "
         f"bunnfradrag på kr 3 000 000 [dagens regel]. Se bort fra skjermingsfradraget.</p>"
         f"<p>Hvor mye exit-skatt utløser {'gavene' if case == 'to' else 'gaven'}?</p>")
    alternativer = [R(kr(skatt), skatt)] + [F(kr(v), f, v) for v, f in valgt]
    if over:
        kort = (f"<p><b>{kr(skatt)}.</b> Samlet gevinst {tall(G)} er over kr 100 000, så hele gevinsten skattlegges: "
                f"{tall(G)} × 37,84 % = {tall(skatt)}.</p>")
    else:
        kort = (f"<p><b>kr 0.</b> Gevinsten på {tall(G)} er under terskelen på kr 100 000, så gaven utløser ikke "
                f"exit-skatt. Terskelen gjelder samlet gevinst på slike gaver i året.</p>")
    full = (
        "<p><b>Hvorfor en gave kan utløse exit-skatt.</b> Gir du aksjer til noen som bor i utlandet, forsvinner den "
        "latente gevinsten ut av norsk beskatning, akkurat som når du selv flytter. Skatteloven § 10-70 fjerde ledd "
        "skattlegger derfor gevinsten når samlet netto gevinst på slike gaver overstiger kr 100 000 i året. Grensen er "
        "en terskel, ikke et fradrag: er den passert, skattlegges hele gevinsten. Bunnfradraget på kr 3 000 000 gjelder "
        "bare når du selv flytter ut.</p>"
        + (f"<p><b>Steg 1: samlet gevinst.</b> {tall(G1)} + {tall(G2)} = {tall(G)}. Hver gave alene er under "
           f"100 000, men grensen gjelder summen i året.</p>" if case == "to" else
           f"<p><b>Steg 1: gevinsten.</b> {tall(MV)} − {tall(MV - G)} = {tall(G)}.</p>")
        + (f"<p><b>Steg 2: terskelen.</b> {tall(G)} er over 100 000, så hele gevinsten skattlegges.</p>"
           f"<p><b>Steg 3: skatten.</b> {tall(G)} × 37,84 % = <b>{kr(skatt)}</b>.</p>"
           f"<p><b>Kontroll.</b> {tall(G)} × 1,72 × 22 % = {tall(G * 1.72)} × 22 % = {tall(skatt)} ✓. Som fradrag "
           f"ville terskelen gitt {tall((G - 100_000) * 0.3784)}, som er feil.</p>" if over else
           f"<p><b>Steg 2: terskelen.</b> {tall(G)} er under 100 000. Gaven utløser ingen exit-skatt: "
           f"<b>kr 0</b>.</p>"
           f"<p><b>Kontroll.</b> Hadde {navn} gitt en post til med en gevinst på over {tall(100_000 - G)}, ville summen "
           f"passert 100 000. Da skattlegges hele summen, ikke bare det som ligger over.</p>")
        + "<p><b>Husk:</b> gave til utlandet: hele gevinsten × 37,84 % når samlet gevinst i året overstiger "
          "kr 100 000. Ingen bunnfradrag.</p>"
    )
    return ferdig("int-gave1", sp(q, alternativer, kort, full))


# ===========================================================================
# STATISKE SPØRSMÅL
# ===========================================================================

st("int-s01", "fakta",
   q="<p>Et aksjeselskap hjemmehørende i Norge har inntekt i Norge og gjennom faste driftssteder i tre andre land. "
     "Hvor mye av inntekten er skattepliktig til Norge etter norsk intern rett isolert sett, før skatteavtalene "
     "brukes?</p>",
   alt=[
       F("Bare inntekten som er opptjent i Norge",
         "Det er kildeprinsippet. Spørsmålet gjelder globalskatteplikten, som er bostedsprinsippet."),
       F("Inntekten i Norge og i land Norge ikke har avtale med",
         "Dette blander inn avtalene. Etter intern rett isolert sett er alt skattepliktig."),
       R("Hele verdensinntekten"),
       F("Inntekten i land som skattlegger lavere enn Norge",
         "Satsen ute spiller ingen rolle for den interne skatteplikten."),
   ],
   kort="<p><b>Hele verdensinntekten.</b> Et selskap hjemmehørende i Norge har globalskatteplikt. Avtalene begrenser "
        "retten etterpå, de utvider den aldri.</p>",
   full="<p><b>Hva globalskatteplikt er.</b> Etter bostedsprinsippet skattlegger Norge personer bosatt her og "
        "selskaper hjemmehørende her for all inntekt, uansett hvor den er tjent. Etter kildeprinsippet skattlegger "
        "staten der inntekten er tjent. Begge prinsippene gjelder samtidig.</p>"
        "<p><b>Steg 1: intern rett.</b> Norsk lov sier ikke noe om hvor inntekten er tjent. Alt er skattepliktig.</p>"
        "<p><b>Steg 2: avtalene.</b> Først i neste ledd innskrenkes retten: unntak gir avkall, kredit gir fradrag.</p>"
        "<p><b>Merk.</b> H2024 oppgave 10a hadde omsetning 30 mill. i Norge og 70 mill. ute. Svaret var 100 mill. "
        "Alternativet 30 mill. var kildeprinsippet. Det fanget flest.</p>"
        "<p><b>Fast driftssted.</b> Et fast driftssted ute utvider kildestatens rett, men fjerner aldri Norges.</p>"
        "<p><b>Personer.</b> Det samme gjelder personer bosatt i Norge: lønn tjent i utlandet er skattepliktig hit etter intern rett.</p>"
        "<p><b>Husk:</b> «etter norsk intern rett isolert sett» betyr alltid hele verdensinntekten.</p>")

st("int-s02", "fakta",
   q="<p>Når blir en person som kommer til Norge, skattemessig bosatt her etter skatteloven § 2-1?</p>",
   alt=[
       F("Bare ved over 183 dager i ett og samme kalenderår",
         "Periodene er glidende, ikke kalenderår. Det finnes også en regel for 270 dager på 36 måneder."),
       R("Over 183 dager på tolv måneder eller over 270 dager på 36 måneder"),
       F("Over 61 dager i året når personen disponerer bolig her",
         "61 dager er grensen for når bostedet kan opphøre, ikke for når det begynner."),
       F("Fra den dagen personen melder flytting til Folkeregisteret",
         "Skattemessig bosted følger oppholdet, ikke registreringen."),
   ],
   kort="<p><b>Over 183 dager på tolv måneder eller over 270 på 36.</b> Periodene er glidende, ikke "
        "kalenderår.</p>",
   full="<p><b>Hvorfor bosted betyr noe.</b> Den som er bosatt i Norge, har globalskatteplikt hit. Bosted avgjør altså "
        "om Norge kan skattlegge hele inntekten.</p>"
        "<p><b>Steg 1: de to reglene.</b> Bosatt blir du ved opphold i riket i mer enn 183 dager i en "
        "tolvmånedersperiode, eller i mer enn 270 dager i en trettiseksmånedersperiode.</p>"
        "<p><b>Steg 2: glidende perioder.</b> Det er enhver periode på tolv eller 36 måneder som teller. To halvår på "
        "hver side av et årsskifte kan til sammen passere 183 dager.</p>"
        "<p><b>Merk.</b> En som er her 100 dager i året i tre år, har 300 dager på 36 måneder og blir bosatt, selv om "
        "ingen enkeltår passerer 183.</p>"
        "<p><b>Ut er vanskeligere enn inn.</b> Bostedet opphører først når du er her høyst 61 dager i året og ingen "
        "bolig disponeres her. Etter ti års bosted må det godtgjøres i tre år til.</p>"
        "<p><b>Husk:</b> inn: 183 på 12 eller 270 på 36. Ut: høyst 61 dager og ingen bolig.</p>")

st("int-s03", "fakta",
   q="<p>Sara har bodd i Norge i 15 år og flytter ut i 2025. Fra 2026 er hun i Norge høyst 30 dager i året. Verken "
     "hun eller noen nærstående disponerer bolig her. Til og med hvilket inntektsår er hun skattemessig bosatt i "
     "Norge?</p>",
   alt=[
       F("2025", "Utflyttingsåret alene er ikke nok etter minst ti års bosted. Tre år til må godtgjøres."),
       F("2026", "Ett år ute er ikke nok. Etter minst ti års bosted gjelder tre inntektsår etter utflyttingsåret."),
       R("2028"),
       F("2030", "Fem år var den opphevede femårsregelen for exit-skatt, ikke en bostedsregel."),
   ],
   kort="<p><b>2028.</b> Etter minst ti års bosted må vilkårene godtgjøres for hvert av de tre inntektsårene etter "
        "utflyttingsåret: 2026, 2027 og 2028.</p>",
   full="<p><b>Regelen.</b> Bostedet opphører når du kan godtgjøre at du har vært i Norge høyst 61 dager i året. I tillegg må "
        "verken du eller nærstående ha disponert bolig her. Har du vært bosatt i minst ti år før utflyttingsåret, må "
        "dette godtgjøres for hvert av de tre neste inntektsårene.</p>"
        + "<p><b>Steg 1: utflyttingsåret.</b> 2025.</p>"
        "<p><b>Steg 2: tre hele år etter.</b> 2026, 2027 og 2028. Sara oppfyller vilkårene alle tre årene.</p>"
        "<p><b>Steg 3: svaret.</b> Hun er bosatt til og med 2028 og ute fra 2029.</p>"
        "<p><b>Kontroll.</b> H2022 oppgave 4: flytting i 2022 ga skatteplikt til og med 2025. Tre år lagt til "
        "utflyttingsåret ✓.</p>"
        "<p><b>Hvorfor regelen finnes.</b> Den skal hindre at noen melder flytting for å slippe skatt mens tilknytningen til Norge fortsatt er sterk.</p>"
        "<p><b>Husk:</b> minst ti års bosted: utflyttingsåret pluss tre hele år.</p>")

st("int-s04", "fakta",
   q="<p>Ali har bodd i Norge i seks år og flytter ut. Hva kreves for at bostedet hans i Norge skal opphøre?</p>",
   alt=[
       R("Høyst 61 dager i Norge i året uten bolig her for ham eller nærstående"),
       F("At han melder flytting og bor over 183 dager i et annet land",
         "Opphold ute er ikke vilkåret. Det er opphold i Norge og bolig her som teller."),
       F("At han har vært ute av Norge i tre hele inntektsår",
         "Treårsregelen gjelder bare etter minst ti års bosted. Ali har bodd her i seks år."),
       F("At han ikke lenger har arbeid eller inntekt i Norge",
         "Arbeid og inntekt er ikke vilkår for bosted etter § 2-1."),
   ],
   kort="<p><b>Høyst 61 dager og ingen bolig.</b> Bostedet opphører for det inntektsåret han kan godtgjøre at han var "
        "her høyst 61 dager uten at han eller nærstående disponerte bolig her.</p>",
   full="<p><b>Hvorfor det er vanskeligere å flytte ut enn inn.</b> Loven vil hindre at noen melder flytting på papiret "
        "mens livet fortsatt er i Norge. Derfor er grensen for å komme ut mye lavere enn grensen for å komme inn.</p>"
        "<p><b>Steg 1: oppholdet.</b> Høyst 61 dager i Norge i inntektsåret.</p>"
        "<p><b>Steg 2: boligen.</b> Verken han eller nærstående (ektefelle, samboer, mindreårige barn) har disponert "
        "bolig i Norge.</p>"
        "<p><b>Steg 3: ti års bosted?</b> Nei, seks år. Da holder det å oppfylle vilkårene i ett inntektsår.</p>"
        "<p><b>Merk.</b> Hadde han bodd her i minst ti år, måtte vilkårene vært oppfylt også i de tre neste "
        "inntektsårene.</p>"
        "<p><b>Hva som ikke teller.</b> Hvor lenge han oppholder seg i det nye landet, spiller ingen rolle for om bostedet i Norge opphører. Det er dagene i Norge og boligen her som avgjør.</p>"
        "<p><b>Husk:</b> ut: høyst 61 dager og ingen bolig. Etter ti år: tre år til.</p>")

st("int-s05", "fakta",
   q="<p>En person er bosatt i både Norge og Land K etter hvert lands interne rett. Skatteavtalen følger OECDs "
     "mønsteravtale artikkel 4. I hvilken rekkefølge prøves kriteriene for hvilket land som får bostedet?</p>",
   alt=[
       F("Statsborgerskap, fast bolig, vanlig opphold, sentrum for livsinteressene",
         "Statsborgerskap kommer sist, ikke først."),
       F("Vanlig opphold, fast bolig, statsborgerskap, sentrum for livsinteressene",
         "Fast bolig prøves først. Sentrum for livsinteressene kommer før vanlig opphold."),
       F("Sentrum for livsinteressene, statsborgerskap, fast bolig, vanlig opphold",
         "Fast bolig kommer først. Sentrum for livsinteressene avgjør når det er fast bolig i begge land."),
       R("Fast bolig, sentrum for livsinteressene, vanlig opphold, statsborgerskap"),
   ],
   kort="<p><b>Fast bolig, livsinteresser, opphold, statsborgerskap.</b> Har personen fast bolig i begge land, "
        "avgjør som regel sentrum for livsinteressene.</p>",
   full="<p><b>Hvorfor artikkel 4 trengs.</b> Hvert land har sine egne bostedsregler. En person kan derfor være bosatt i "
        "to eller tre land samtidig. Uten avtale kan hvert av dem skattlegge hele inntekten. Avtalens bostedsregel "
        "peker ut ett land.</p>"
        "<p><b>Steg 1: fast bolig.</b> Har personen fast bolig bare i ett land, er det bostedslandet.</p>"
        "<p><b>Steg 2: sentrum for livsinteressene.</b> Har hun fast bolig i begge, avgjør hvor familie, hjem og arbeid "
        "er.</p>"
        "<p><b>Steg 3: vanlig opphold, så statsborgerskap.</b> Brukes bare når de første ikke avgjør.</p>"
        "<p><b>Merk.</b> En som kjøper leilighet ute, men har familien og jobben i Norge, blir bosatt i Norge etter "
        "sentrum for livsinteressene.</p>"
        "<p><b>Uten avtale.</b> I H2022 oppgave 4 var en person bosatt i tre land etter hvert lands interne rett, uten avtaler. Svaret var trippelbeskatning. Avtalenes bostedsregel løser det ved å peke ut ett land.</p>"
        "<p><b>Husk:</b> bolig, livsinteresser, opphold, statsborgerskap.</p>")

st("int-s06", "begrep",
   q="<p>Under hvilken metode kan det oppstå dobbelt ikke-beskatning, altså at inntekten ikke skattlegges noe sted?</p>",
   alt=[
       F("Ordinær kredit, når kildestaten skattlegger lavere enn Norge",
         "Da krever Norge restskatten. Inntekten ender på norsk nivå."),
       F("Ingen skatteavtale, fordi ingen av landene vet om inntekten",
         "Uten avtale har begge land beskatningsrett. Utgangspunktet er dobbeltbeskatning."),
       R("Fullstendig unntak, når kildestaten ikke skattlegger inntekten"),
       F("Full kredit, når kildestaten skattlegger høyere enn Norge",
         "Da betaler skattyteren kildeskatten. Inntekten er skattlagt."),
   ],
   kort="<p><b>Fullstendig unntak.</b> Norge gir avkall uten å spørre om kildestaten skattlegger. Gjør den ikke det, "
        "skattlegges inntekten ingen steder.</p>",
   full="<p><b>Hva unntak betyr.</b> Under fullstendig unntak gir hjemstaten helt avkall på inntekten. Avkallet er "
        "ubetinget: Norge spør ikke om kildestaten bruker retten sin, eller med hvilken sats.</p>"
        "<p><b>Steg 1: kildestaten skattlegger ikke.</b> Samlet skatt er t<sub>kilde</sub> × Y = 0 × Y = 0.</p>"
        "<p><b>Steg 2: sammenlign med kredit.</b> Under kredit er samlet skatt maks(22 % ; 0) × Y = 22 %. Norge har "
        "ingenting å kreditere og skattlegger fullt.</p>"
        "<p><b>Kontroll.</b> H2024 oppgave 10f: dobbelt ikke-beskatning kan bare oppstå under unntaksmetoden ✓.</p>"
        "<p><b>Hvorfor det er et problem.</b> Unntaksmetoden fjerner dobbeltbeskatning, men utjevner ikke satser. Et selskap kan da legge overskudd der satsen er lav eller null.</p>"
        "<p><b>Husk:</b> unntak følger kildesatsen helt ned til null. Kredit har et gulv på den norske satsen.</p>")

st("int-s07", "begrep",
   q="<p>Under ordinær kredit er kreditfradraget begrenset til den norske skatten på inntekten. Hva er begrunnelsen "
     "for taket?</p>",
   alt=[
       F("Taket hindrer at samlet skatt på utenlandsinntekt blir under 22 %",
         "Det er restskatten som løfter lav kildeskatt opp til 22 %. Taket gjelder høy kildeskatt."),
       R("Kreditten er en lettelse i norsk skatt, ikke et tilskudd"),
       F("Taket fjerner dobbeltbeskatning når kildestaten har høy skatt",
         "Motsatt. Over taket blir den ukrediterte kildeskatten stående som dobbeltbeskatning."),
       F("Kildestaten krever i avtalen at Norge begrenser kreditten",
         "Taket er Norges egen begrensning. Det beskytter den norske statskassen."),
   ],
   kort="<p><b>En lettelse, ikke et tilskudd.</b> Uten tak ville statskassen dekket alt over 22 % for virksomhet i et "
        "land med høyere skatt.</p>",
   full="<p><b>Hva taket gjør.</b> Kreditfradraget er min(kildeskatt ; norsk skatt på inntekten). Restskatten til "
        "Norge blir aldri negativ.</p>"
        "<p><b>Steg 1: uten tak.</b> Et selskap tjener 1 000 000 i et land med 60 % skatt. Norsk skatt er 220 000. Med "
        "full kredit ville Norge betalt tilbake 600 000 − 220 000 = 380 000.</p>"
        "<p><b>Steg 2: med tak.</b> Fradraget er 220 000, restskatten 0. Samlet skatt 600 000, altså 60 %.</p>"
        "<p><b>Kontroll.</b> Under ordinær kredit ender du alltid på den høyeste av satsene: maks(22 % ; 60 %) = "
        "60 % ✓.</p>"
        "<p><b>Konsekvensen.</b> Det overskytende, her 380 000, blir stående som dobbeltbeskatning. Det er den eneste "
        "forskjellen på ordinær og full kredit.</p>"
        "<p><b>Husk:</b> ordinær kredit: samlet skatt = maks(t<sub>hjem</sub> ; t<sub>kilde</sub>) × Y.</p>")

st("int-s08", "begrep",
   q="<p>Hva skiller ordinær kredit fra full kredit?</p>",
   alt=[
       R("Ordinær kredit krediterer bare opp til norsk skatt på inntekten"),
       F("Ordinær kredit krediterer all kildeskatt, full kredit det dobbelte",
         "Ingen metode krediterer mer enn den betalte skatten. Forskjellen er taket."),
       F("Ved ordinær kredit er det kildestaten som gir fradrag for norsk skatt",
         "Kreditten gis alltid av hjemstaten. Snudd kredit er en klassisk felle."),
       F("Ordinær kredit gjelder selskaper, full kredit gjelder personer",
         "Begge kan gjelde både selskaper og personer. Det er taket som skiller."),
   ],
   kort="<p><b>Taket.</b> Ordinær kredit gir fradrag for kildeskatten høyst med norsk skatt på samme inntekt. Full "
        "kredit ville gitt fradrag for all kildeskatt, også over den norske.</p>",
   full="<p><b>De to variantene.</b> Begge er kreditmetoder: hjemstaten skattlegger og gir fradrag for skatt betalt i "
        "kildestaten. Under full kredit er fradraget hele kildeskatten. Under ordinær kredit er det begrenset til "
        "hjemstatens egen skatt på inntekten.</p>"
        "<p><b>Steg 1: lav kildesats, 15 %.</b> Begge gir fradrag 150 000 av 220 000 på 1 000 000. Restskatt "
        "70 000. Samme svar.</p>"
        "<p><b>Steg 2: høy kildesats, 35 %.</b> Ordinær: fradrag 220 000, samlet 350 000. Full: fradrag 350 000, "
        "Norge betaler ut 130 000, samlet 220 000.</p>"
        "<p><b>Merk.</b> Forskjellen viser seg bare når kildesatsen er høyere enn den norske.</p>"
        "<p><b>Eksamen.</b> «Full kredit for all skatt betalt ute» står nesten alltid som et galt alternativ når "
        "oppgaven har sagt ordinær eller vanlig kredit.</p>"
        "<p><b>Husk:</b> ordinær kredit = fradrag opp til norsk skatt.</p>")

st("int-s09", "fakta",
   q="<p>Et selskap hjemmehørende i Norge har inntekt fra et land Norge ikke har skatteavtale med. Hva sier norsk "
     "intern rett om skatten betalt i det landet?</p>",
   alt=[
       F("Norge gir aldri lettelse uten avtale, så det blir alltid dobbeltbeskatning",
         "Skatteloven § 16-20 gir kreditfradrag også uten avtale. Eksamenssettene har likevel regnet uten."),
       F("Norge unntar inntekten, som under fullstendig unntak",
         "Uten avtale gir Norge ikke avkall på inntekten. Den er skattepliktig hit."),
       R("Norge kan gi kreditfradrag ensidig etter skatteloven § 16-20"),
       F("Bare kildestaten kan skattlegge inntekten når det ikke finnes avtale",
         "Uten avtale har begge stater beskatningsrett etter sin interne rett."),
   ],
   kort="<p><b>Ensidig kreditfradrag etter § 16-20.</b> Loven gir kredit for utenlandsk skatt også uten avtale. "
        "Eksamenssettene har likevel regnet som om det ikke gis lettelse, så les forutsetningen i oppgaven.</p>",
   full="<p><b>Utgangspunktet.</b> Uten avtale skattlegger begge stater etter sin interne rett. Norge har "
        "globalskatteplikt, kildestaten har sin kilderett. Det gir i utgangspunktet dobbeltbeskatning.</p>"
        "<p><b>Steg 1: den ensidige regelen.</b> Skatteloven § 16-20 gir en skattyter bosatt eller hjemmehørende i Norge "
        "kreditfradrag for skatt betalt i utlandet, også når det ikke finnes avtale.</p>"
        "<p><b>Steg 2: eksamenskonvensjonen.</b> H2020 oppgave 2 og H2021 oppgave 4 sier uttrykkelig at Norge ikke gir "
        "lettelse uten avtale. H2024 oppgave 10 forutsetter det. Da regner du summen av satsene.</p>"
        "<p><b>Kontroll.</b> H2024 oppgave 10: BVI med 7,5 % og ingen avtale ga 7,5 % + 22 % = 29,5 % i "
        "eksamensfasiten.</p>"
        "<p><b>Hva du gjør.</b> Les alltid hva oppgaven forutsetter om land uten avtale. Står det ingenting, er summen av satsene det eksamenssettene har regnet med.</p>"
        "<p><b>Husk:</b> loven gir kredit ensidig. Eksamen regner ofte uten. Følg forutsetningen i teksten.</p>")

st("int-s10", "begrep",
   q="<p>Et norsk selskap har en salgsavdeling i Land K som utgjør et fast driftssted. Hva er betydningen av det etter "
     "norsk intern rett og Land Ks interne rett, før en skatteavtale brukes?</p>",
   alt=[
       F("Norge mister retten til å skattlegge inntekten fra salgsavdelingen",
         "Etter intern rett består Norges globalskatteplikt. Bare en skatteavtale med fullstendig unntak kan få Norge "
         "til å gi avkall."),
       R("Land K kan skattlegge inntekten der, mens Norges rett består"),
       F("Inntekten blir skattefri i begge land inntil overskuddet tas hjem",
         "Ingen av landene utsetter skatten av den grunn."),
       F("Skatteavtalen mellom Norge og Land K slutter å gjelde for selskapet",
         "Fast driftssted er nettopp terskelen avtalen bruker. Avtalen avgjør i neste ledd hvordan dobbeltbeskatningen "
         "løses."),
   ],
   kort="<p><b>Kildestaten får beskatningsrett.</b> Fast driftssted er terskelen kildestaten må over. Norges "
        "globalskatteplikt står. Avtalen avgjør lettelsen.</p>",
   full="<p><b>Hva fast driftssted er.</b> Et fast forretningssted som virksomheten helt eller delvis drives gjennom: "
        "lokaler eller utstyr med en viss varighet. En avhengig agent som regelmessig inngår bindende kontrakter for "
        "selskapet, kan også skape fast driftssted.</p>"
        "<p><b>Steg 1: uten fast driftssted.</b> Selger selskapet fra Bergen til kunder i Land K, har Land K ingen "
        "beskatningsrett.</p>"
        "<p><b>Steg 2: med fast driftssted.</b> Land K kan skattlegge inntekten som kan tilordnes driftsstedet.</p>"
        "<p><b>Steg 3: Norge.</b> Norges rett følger av globalskatteplikten og består. Skatteavtalen avgjør om Norge "
        "gir unntak eller kredit.</p>"
        "<p><b>Merk.</b> I flervalg forteller oppgaven deg om det foreligger fast driftssted. Bruk tiden på "
        "metoden.</p>"
        "<p><b>Feilen som koster poeng.</b> Å tro at et fast driftssted ute i seg selv fjerner Norges rett. Det er bare en skatteavtale som kan begrense den, for eksempel ved fullstendig unntak.</p>"
        "<p><b>Husk:</b> fast driftssted utvider kildestatens rett. Det innskrenker aldri Norges.</p>")

st("int-s11", "fakta",
   q="<p>Hvilken av disse gir typisk <b>ikke</b> fast driftssted for et norsk selskap i et annet land?</p>",
   alt=[
       F("Et salgskontor med egne ansatte som inngår kontrakter",
         "Et fast sted der kjernevirksomheten drives, er et fast driftssted."),
       F("En byggeplass der arbeidet varer i to år",
         "Byggeplasser blir typisk fast driftssted når arbeidet varer ut over tolv måneder."),
       R("Et rent lager eller et innkjøpskontor"),
       F("En agent som regelmessig inngår bindende kontrakter for selskapet",
         "Agentregelen: en avhengig agent med fullmakt kan skape fast driftssted uten lokaler."),
   ],
   kort="<p><b>Lager og innkjøpskontor.</b> Forberedende virksomhet og hjelpevirksomhet gir ikke fast driftssted, "
        "fordi verdien ikke skapes der.</p>",
   full="<p><b>Terskelen.</b> Kildestaten kan bare skattlegge et utenlandsk foretak som har fast driftssted der: et "
        "fast forretningssted som virksomheten drives gjennom.</p>"
        "<p><b>Steg 1: det som gir fast driftssted.</b> Kontorer og avdelinger der kjernevirksomheten drives, byggeplasser "
        "over tolv måneder og avhengige agenter som inngår kontrakter.</p>"
        "<p><b>Steg 2: unntaket.</b> Forberedende virksomhet og hjelpevirksomhet: et rent lager, et utstillingslokale, et "
        "innkjøpskontor.</p>"
        "<p><b>Merk.</b> Unntaket forklarer at rene nettbutikker lenge kunne selge inn i et land uten å bli "
        "skattepliktige der. Det er et av hullene BEPS-arbeidet skal tette.</p>"
        "<p><b>Hvorfor grensen går der.</b> Fast driftssted skal fange stedene der verdien skapes. Et lager eller et innkjøpskontor støtter virksomheten, men selger ikke og produserer ikke.</p>"
        "<p><b>Husk:</b> der verdien skapes, er det fast driftssted. Lager og innkjøp er ikke nok.</p>")

st("int-s12", "tolkning",
   q="<p>Et norsk selskap tjener penger gjennom et fast driftssted i et land med 30 % skatt. Norsk sats er 22 %. "
     "Hva betyr det for samlet skatt om avtalen bygger på fullstendig unntak eller på ordinær kredit?</p>",
   alt=[
       R("Ingenting: begge gir 30 %"),
       F("Kredit gir 22 %, unntak gir 30 %",
         "22 % ville krevd full kredit. Under ordinær kredit er fradraget begrenset til 22 %."),
       F("Unntak gir 22 %, kredit gir 30 %", "Under unntak står kildeskatten alene: 30 %."),
       F("Kredit gir 52 %, unntak gir 30 %", "52 % er summen, altså ingen lettelse. Kreditten fjerner den norske "
                                             "skatten."),
   ],
   kort="<p><b>Ingenting.</b> Unntak gir kildesatsen, 30 %. Ordinær kredit gir maks(22 % ; 30 %) = 30 %.</p>",
   full="<p><b>De to metodene.</b> Under fullstendig unntak skattlegger bare kildestaten. Under ordinær kredit "
        "skattlegger begge, men Norge trekker kildeskatten fra i norsk skatt, høyst med den norske skatten.</p>"
        "<p><b>Steg 1: unntak.</b> 30 % i kildestaten, 0 i Norge. Samlet 30 %.</p>"
        "<p><b>Steg 2: kredit.</b> 30 % i kildestaten. Norsk skatt 22 %, kreditfradrag 22 %, restskatt 0. Samlet 30 %.</p>"
        "<p><b>Merk.</b> Kredit og unntak faller sammen for enhver kildesats over 22 %. Valget betyr bare noe når "
        "kildestaten skattlegger lavere enn Norge: da gir unntak kildesatsen, kredit 22 %.</p>"
        "<p><b>Med lav kildesats.</b> Var kildesatsen 15 %, ville unntak gitt 15 % og kredit 22 %. Da betyr valget mye.</p>"
        "<p><b>Eksamen.</b> Kredit og unntak gir bare ulikt svar når kildesatsen er lavere enn 22 %. Se på satsen før du regner.</p>"
        "<p><b>Husk:</b> unntak = kildesatsen. Kredit = den høyeste satsen.</p>")

st("int-s13", "fakta",
   q="<p>Ola flytter fra Norge til et land Norge har skatteavtale med. Når utløses exit-skatten på aksjene hans "
     "[dagens regel]?</p>",
   alt=[
       F("Først når aksjene selges, hvis skatteavtalen tillater det",
         "Gevinsten anses realisert ved utflyttingen, uten salg."),
       R("Dagen før utflytting, uansett skatteavtale"),
       F("Ved utgangen av utflyttingsåret, med mindre avtalen sier noe annet",
         "Tidspunktet er dagen før utflytting."),
       F("Aldri, fordi skatteavtalen gir det nye landet beskatningsretten",
         "Avtalen beskytter ikke mot exit-skatten. Den skattlegger gevinsten som ble opptjent i Norge."),
   ],
   kort="<p><b>Dagen før utflytting.</b> Latent gevinst anses realisert da. En skatteavtale beskytter ikke "
        "(H2022 oppgave 4).</p>",
   full="<p><b>Hvorfor exit-skatt.</b> Etter utflyttingen mister Norge retten til å skattlegge gevinsten når aksjene "
        "selges. Exit-skatten sikrer at gevinsten opptjent mens du bodde her, blir skattlagt.</p>"
        "<p><b>Steg 1: tidspunktet.</b> Latent gevinst på aksjer, fondsandeler, aksjesparekonto og lignende anses "
        "realisert dagen før utflytting (skatteloven § 10-70).</p>"
        "<p><b>Steg 2: avtalen.</b> Skatten fastsettes før bostedet flyttes. En skatteavtale med det nye landet "
        "hindrer den ikke.</p>"
        + "<p><b>Steg 3: beløpet.</b> (Markedsverdi − inngangsverdi − 3 000 000) × 37,84 %.</p>"
        "<p><b>Merk.</b> Skatten er fastsatt endelig. Faller aksjene senere, settes den ikke ned.</p>"
        "<p><b>Eksempel.</b> Aksjer verdt 25 mill. med inngangsverdi 5 mill. gir (25 − 5 − 3) mill. × 37,84 % = 6 432 800 i exit-skatt. Beløpet låses dagen før utflytting.</p>"
        "<p><b>Husk:</b> dagen før utflytting, uansett avtale.</p>")

st("int-s14", "fakta",
   q="<p>Hvilke betalingsmåter kan en skattyter velge mellom for exit-skatten [dagens regel]?</p>",
   alt=[
       F("Fem rentefrie årlige rater eller hele beløpet straks",
         "Ordningen er tolv år, ikke fem. Femårsregelen var noe annet og er opphevet."),
       F("Hele beløpet straks, uten mulighet for utsettelse",
         "Skatten kan betales over tolv år, rentefritt i rater."),
       R("Tolv rentefrie rater, alt etter tolv år med renter, eller alt straks"),
       F("Skatten betales først når aksjene faktisk selges, uten renter og uten frist",
         "Skatten forfaller uavhengig av salg. Utsettelsen er begrenset til tolv år."),
   ],
   kort="<p><b>Tolv rentefrie rater, alt etter tolv år med renter, eller straks.</b> Ratene slår å betale straks når "
        "du får positiv avkastning. Mot alt etter tolv år avhenger det av statens rentesats.</p>",
   full="<p><b>Ordningen.</b> Etter innstrammingen fra 20. mars 2024 kan exit-skatten betales på tre måter: (1) "
        "tolv rentefrie årlige rater, (2) hele beløpet etter tolv år med renter, eller (3) alt med en gang.</p>"
        "<p><b>Steg 1: verdien av ratene.</b> Skatt 6 432 800 i tolv rater gir 536 067 i året. Med 5 % avkastning er "
        "nåverdien 536 067 × 8,8633 = 4 751 323. Det sparer om lag 26 % av skatten.</p>"
        "<p><b>Steg 2: alt etter tolv år.</b> Krever staten samme rente som du får selv, er nåverdien den samme som å "
        "betale straks.</p>"
        "<p><b>Merk.</b> Ratene er alltid bedre enn å betale straks så lenge avkastningen er positiv. Om de også slår "
        "valg 2, avhenger av statens rentesats: er din avkastning høyere enn statens rente, kan det lønne seg å vente "
        "og betale alt etter tolv år.</p>"
        "<p><b>Sikkerhet og utbytte.</b> Utsettelse forutsetter i utgangspunktet sikkerhet. Tar du utbytte etter "
        "utflyttingen, forfaller 0,7 × utbyttet av den utsatte skatten.</p>"
        "<p><b>Husk:</b> tolv år, rentefritt i rater.</p>")

st("int-s15", "tolkning",
   q="<p>Ola flyttet ut i 2025 og fikk exit-skatten fastsatt på grunnlag av verdien dagen før. To år senere har aksjene "
     "falt 40 % i verdi. Hva skjer med exit-skatten?</p>",
   alt=[
       F("Den settes ned forholdsmessig med verdifallet", "Skatten fastsettes endelig. Verdifall etter utflytting "
                                                         "reduserer den ikke."),
       F("Den faller bort hvis aksjene selges med tap", "Den faller bort bare ved tilbakeflytting innen tolv år med "
                                                       "aksjene i behold."),
       F("Den regnes på nytt med salgsprisen når aksjene selges", "Grunnlaget er verdien dagen før utflytting, ikke "
                                                                 "salgsprisen."),
       R("Ingenting: skatten er fastsatt endelig"),
   ],
   kort="<p><b>Ingenting.</b> Exit-skatten fastsettes endelig ved utflytting. Et senere verdifall setter den ikke "
        "ned.</p>",
   full="<p><b>Regelen.</b> Etter reglene fra 2024 fastsettes exit-skatten endelig ved utflyttingen. Tidligere kunne "
        "et senere verdifall redusere den. Det kan det ikke lenger.</p>"
        "<p><b>Steg 1: grunnlaget.</b> Verdien dagen før utflytting minus inngangsverdien og bunnfradraget.</p>"
        "<p><b>Steg 2: verdifallet.</b> Skjer etter utflyttingen og påvirker ikke skatten.</p>"
        "<p><b>Merk.</b> Det eneste som får skatten til å falle bort, er at Ola flytter tilbake innen tolv år og "
        "fortsatt eier aksjene.</p>"
        "<p><b>Konsekvens.</b> Risikoen for verdifall etter flyttingen ligger hos skattyteren. Det gjør det dyrere å "
        "flytte ut med store latente gevinster.</p>"
        "<p><b>Med tall.</b> Aksjer verdt 25 mill. og inngangsverdi 5 mill. gir (25 − 5 − 3) mill. × 37,84 % = 6 432 800. Faller aksjene til 15 mill. etter flyttingen, er skatten fortsatt 6 432 800.</p>"
        "<p><b>Husk:</b> exit-skatten er låst ved utflyttingen.</p>")

st("int-s16", "fakta",
   q="<p>Ola flyttet ut i 2025 og betaler exit-skatten i rentefrie rater. I 2031 flytter han tilbake til Norge og eier "
     "fortsatt aksjene. Hva skjer med exit-skatten?</p>",
   alt=[
       F("Resten forfaller straks, siden han er bosatt i Norge igjen",
         "Tilbakeflytting innen tolv år med aksjene i behold fører til at skatten faller bort."),
       R("Den faller bort, siden han kom tilbake innen tolv år med aksjene"),
       F("Den faller bort bare hvis han har bodd ute i minst fem år",
         "Femårsregelen er opphevet. Vilkåret er tilbakeflytting innen tolv år."),
       F("Han må betale resten med renter fra utflyttingsåret",
         "Ratene er rentefrie. Skatten faller bort ved tilbakeflytting innen tolv år."),
   ],
   kort="<p><b>Den faller bort.</b> Flytter du tilbake innen tolv år og fortsatt eier aksjene, bortfaller "
        "exit-skatten.</p>",
   full="<p><b>Hvorfor.</b> Exit-skatten skal sikre at Norge får skattlagt gevinsten opptjent her. Kommer skattyteren "
        "tilbake med aksjene i behold, kan Norge skattlegge gevinsten ved et senere salg som vanlig.</p>"
        "<p><b>Steg 1: tolvårsfristen.</b> 2025 til 2031 er seks år, innenfor tolv.</p>"
        "<p><b>Steg 2: aksjene.</b> Han eier dem fortsatt.</p>"
        "<p><b>Steg 3: følgen.</b> Skatten faller bort.</p>"
        "<p><b>Merk.</b> Hadde han solgt aksjene mens han bodde ute, ville vilkåret om aksjene i behold sviktet.</p>"
        "<p><b>Hvor tolv år kommer fra.</b> Tolvårsordningen kom med innstrammingen fra 20. mars 2024, sammen med bunnfradraget på kr 3 000 000. Den erstattet femårsregelen, som ble opphevet 29. november 2022.</p><p><b>Feilen.</b> Et alternativ som bygger på fem år, er foreldet.</p>"
        "<p><b>Gave.</b> Tolvårsregelen gjelder ikke mottakeren av en gave i utlandet.</p>"
        "<p><b>Husk:</b> tilbake innen tolv år med aksjene: exit-skatten bortfaller.</p>")

st("int-s17", "tolkning",
   q="<p>Ola har flyttet ut og har fått utsettelse med en exit-skatt på kr 3 000 000. Året etter tar han kr 1 000 000 i "
     "utbytte fra aksjene. Hvor mye av den utsatte exit-skatten forfaller til betaling [dagens regel]?</p>",
   alt=[
       F("kr 378 400", "Utbyttet ganget med 37,84 %. Regelen er ikke en skatt på utbyttet, men at 0,7 × utbyttet av "
                       "den utsatte skatten forfaller."),
       F("kr 264 880", "0,7 × utbyttet × 37,84 %. Tallet 0,7 × utbyttet er alt et skattebeløp og skal ikke ganges med "
                       "en sats."),
       R("kr 700 000"),
       F("kr 1 000 000", "Hele utbyttet. Faktoren er 0,7, for å gi rom for kildeskatten på selve utbyttet."),
   ],
   kort="<p><b>kr 700 000.</b> Utsettelsen faller bort for et skattebeløp lik utdelingen ganget med 0,7 (skatteloven "
        "§ 10-70 åttende ledd).</p>",
   full="<p><b>Regelen.</b> Utbytte etter utflytting tar ut verdier fra aksjene. Da forfaller en del av den utsatte "
        "exit-skatten: et beløp lik utbyttet ganget med 0,7.</p>"
        "<p><b>Steg 1: regn.</b> 1 000 000 × 0,7 = 700 000.</p>"
        "<p><b>Steg 2: sjekk taket.</b> Den utsatte skatten er 3 000 000, så 700 000 kan forfalle.</p>"
        "<p><b>Merk.</b> 0,7 × utbyttet er selve skattebeløpet. Ganger du med 37,84 % i tillegg, får du 264 880 og "
        "bruker satsen to ganger.</p>"
        "<p><b>Hvorfor 0,7.</b> Faktoren er under 1 for å gi rom for kildeskatten som trekkes av selve utbyttet.</p>"
        "<p><b>Resten.</b> Etter utbyttet er 3 000 000 − 700 000 = 2 300 000 av exit-skatten fortsatt utsatt.</p>"
        "<p><b>Husk:</b> utbytte etter utflytting: 0,7 × utbyttet av den utsatte exit-skatten forfaller.</p>")

st("int-s18", "fakta",
   q="<p>H2022 hadde et spørsmål der fasiten var at exit-skatten bortfaller hvis aksjene ikke selges innen fem år etter "
     "utflytting. Hva gjelder i 2026?</p>",
   alt=[
       R("Femårsregelen er opphevet. Skatten står"),
       F("Femårsregelen gjelder fortsatt, men fristen er nå tolv år",
         "Tolv år er utsettelsen for betalingen, ikke en frist for bortfall uten salg."),
       F("Exit-skatten er avskaffet ved flytting innenfor EØS",
         "Exit-skatten gjelder også ved flytting i EØS. Bare kravet til sikkerhet er lempeligere."),
       F("Femårsregelen gjelder, men bare for gevinster under 3 mill.",
         "Regelen er opphevet for alle. Bunnfradraget på 3 mill. er noe annet."),
   ],
   kort="<p><b>Femårsregelen er opphevet.</b> Den falt 29. november 2022. Fra 20. mars 2024 gjelder bunnfradraget på "
        "kr 3 000 000 og tolvårsordningen.</p>",
   full="<p><b>Historien.</b> Fram til 29. november 2022 kunne latente gevinster slippe norsk skatt etter mer enn fem år i "
        "utlandet. Regelen er opphevet. Innstrammingen med virkning fra 20. mars 2024 ga dagens ordning.</p>"
        "<p><b>Steg 1: dagens regel.</b> Exit-skatt = (markedsverdi − inngangsverdi − 3 000 000) × 37,84 %, fastsatt "
        "endelig dagen før utflytting.</p>"
        "<p><b>Steg 2: betaling.</b> Tolv rentefrie rater, alt etter tolv år med renter eller straks.</p>"
        "<p><b>Steg 3: bortfall.</b> Bare ved tilbakeflytting innen tolv år med aksjene i behold.</p>"
        "<p><b>Merk.</b> Et gammelt eksamenssett kan ha en fasit som var riktig da, men gal nå. En foreldet regel "
        "koster like mye som en glemt.</p>"
        "<p><b>Lærdommen.</b> Fasiten i H2022 var riktig da settet ble laget. Bruk alltid reglene som gjelder nå når spørsmålet spør etter dagens regel.</p>"
        "<p><b>Husk:</b> femårsregelen er borte. Tolv år og 3 mill. gjelder.</p>")

st("int-s19", "fakta",
   q="<p>Et aksjeselskap stiftet etter norsk lov flytter ledelsen til et land Norge ikke har skatteavtale med. Er "
     "selskapet fortsatt hjemmehørende i Norge?</p>",
   alt=[
       F("Nei, hjemstedet følger alltid ledelsens sete", "For selskaper stiftet i Norge er stiftelsen avgjørende når "
                                                          "det ikke finnes avtale."),
       F("Nei, det blir hjemmehørende der flertallet av aksjonærene bor", "Aksjonærenes bosted avgjør ikke hvor "
                                                                          "selskapet hører hjemme."),
       F("Det blir hjemmehørende i begge land med skatten delt likt",
         "Ingen regel deler skatten likt. Uten avtale skattlegger hvert land etter sin rett."),
       R("Ja, et selskap stiftet i Norge forblir hjemmehørende her"),
   ],
   kort="<p><b>Ja.</b> Et selskap stiftet etter norsk lov er hjemmehørende i Norge. Uten avtale er det ingenting som "
        "flytter hjemstedet (H2022 oppgave 4).</p>",
   full="<p><b>Regelen.</b> Selskaper stiftet i samsvar med norsk lov anses som hjemmehørende i Norge. En skatteavtale "
        "kan legge hjemstedet til et annet land, men her finnes det ingen avtale.</p>"
        "<p><b>Steg 1: stiftelsen.</b> Selskapet er stiftet etter norsk lov.</p>"
        "<p><b>Steg 2: avtalen.</b> Ingen avtale med det nye landet, så ingenting endrer hjemstedet.</p>"
        "<p><b>Steg 3: følgen.</b> Selskapet har fortsatt globalskatteplikt til Norge. Det nye landet kan i tillegg "
        "skattlegge etter sin rett.</p>"
        "<p><b>Merk.</b> H2022 oppgave 4 hadde dette som eget spørsmål, med svaret at selskapet fortsatt er "
        "hjemmehørende her.</p>"
        "<p><b>Når selskapet flytter ut.</b> Kursets fasiter (H2022 og H2024) gir poeng for oppgjør på både selskaps- og aksjonærnivå, som ved likvidasjon. Skatteloven § 10-71 er smalere og nevner bare selskapets eiendeler.</p>"
        "<p><b>Husk:</b> stiftet i Norge og ingen avtale: hjemmehørende i Norge.</p>")

st("int-s20", "begrep",
   q="<p>Hva mener Schjelderup er det sentrale kjennetegnet ved et skatteparadis?</p>",
   alt=[
       F("Null skatt på selskapsoverskudd for alle selskaper i landet",
         "Mange skatteparadiser har skatt. Mauritius og Jersey har satser over null for noen."),
       R("Hemmeligholdet: det er produktet, ikke skattesatsen"),
       F("At landet ikke er medlem av OECD eller EU", "Medlemskap avgjør ikke. Flere sekretessestater er i Europa."),
       F("At landet ikke har skatteavtale med Norge", "Avtaler finnes med mange av dem. Det er hemmeligholdet som "
                                                      "teller."),
   ],
   kort="<p><b>Hemmeligholdet.</b> Schjelderup bruker begrepet secrecy jurisdiction: skattesatsen er et instrument, "
        "hemmeligholdet er varen.</p>",
   full="<p><b>Tre kjennetegn.</b> En sekretessestat har (1) inngjerdet regelverk: ett sett regler for lokale, et "
        "gunstigere for utlendinger som ikke får drive der, (2) sikret skattemessig hjemsted for de skattefrie "
        "selskapene og (3) privat informasjon: ingen offentlige regnskaper, stråmenn og truster.</p>"
        "<p><b>Steg 1: satsen er ikke poenget.</b> Mauritius har 15 % nominell sats for utenlandskeide selskaper, men et "
        "automatisk fradrag som gir 3 %. Jersey har 0 % som standard, men "
        "10 % for finansforetak og 20 % for kraftselskaper og Jersey-eiendom, altså virksomhet som drives lokalt.</p>"
        "<p><b>Steg 2: avslørte preferanser.</b> Var regelverket vekstfremmende, ville landet brukt det på egen økonomi. "
        "At det er forbeholdt utlendinger, viser at det skal hente inntekter fra andre land.</p>"
        "<p><b>Merk.</b> Et alternativ som bare peker på lav sats, overser hovedpoenget.</p>"
        "<p><b>Husk:</b> secrecy jurisdiction: hemmeligholdet er produktet.</p>")

st("int-s21", "begrep",
   q="<p>Hva er forskjellen på skatteplanlegging (tax avoidance) og skatteunndragelse (tax evasion)?</p>",
   alt=[
       F("Planlegging gjelder selskaper, unndragelse gjelder personer",
         "Begge kan gjelde både selskaper og personer."),
       R("Planlegging er lovlig, unndragelse er ulovlig"),
       F("Begge er ulovlige, men unndragelse straffes hardere",
         "Skatteplanlegging innenfor loven er lovlig."),
       F("Planlegging skjer i Norge, unndragelse skjer i skatteparadiser",
         "Skatteparadiser brukes til begge deler. Skillet er om det er lovlig."),
   ],
   kort="<p><b>Lovlig mot ulovlig.</b> Skatteplanlegging utnytter reglene. Unndragelse skjuler inntekt eller formue i "
        "strid med loven.</p>",
   full="<p><b>Skillet.</b> Tax avoidance er å tilpasse seg reglene for å betale mindre, for eksempel gjennom "
        "internprising eller finansiering. Tax evasion er å skjule inntekt eller formue for myndighetene.</p>"
        "<p><b>Steg 1: skatteparadisene.</b> De brukes til begge deler. BEPS-arbeidet påpeker at de fleste oppleggene "
        "for overskuddsflytting ikke er ulovlige.</p>"
        "<p><b>Steg 2: unndragelsen.</b> Alstadsæter, Johannesen og Zucman anslår at de 0,01 % rikeste i Norge skjuler "
        "om lag 20 % av formuen og unndrar om lag 25 % av skatten.</p>"
        "<p><b>Merk.</b> Et alternativ som slår de to sammen, er galt.</p>"
        "<p><b>Eksempler.</b> Internprising og tynn kapitalisering er som regel lovlig planlegging, selv om armlengdeprinsippet og rentebegrensningen strammer inn. Å skjule en konto i et skatteparadis for skattemyndighetene er unndragelse.</p>"
        "<p><b>Husk:</b> avoidance er lovlig, evasion er ulovlig.</p>")

st("int-s22", "fakta",
   q="<p>Hva er en svakhet ved CRS, OECDs standard for automatisk utveksling av kontoinformasjon, ifølge pensum?</p>",
   alt=[
       F("Informasjonen er offentlig, så kontohavere flytter til land utenfor",
         "Informasjonen er ikke offentlig. Det er nettopp en av svakhetene."),
       F("Bare EU-land deltar i utvekslingen", "Om lag 160 land deltar."),
       F("Den gjelder bare personkontoer, ikke kontoer eid av selskaper",
         "Standarden omfatter også kontoer eid av selskaper og andre enheter."),
       R("Bare skattemyndighetene får informasjonen og USA deltar ikke"),
   ],
   kort="<p><b>Bare skattemyndighetene får informasjonen og USA deltar ikke.</b> Ingen tredjepart får innsyn.</p>",
   full="<p><b>Hva CRS er.</b> Common Reporting Standard er OECDs program for automatisk informasjonsutveksling "
        "mellom skattemyndigheter i om lag 160 land.</p>"
        "<p><b>Steg 1: svakhetene.</b> USA deltar ikke. Sanksjonene brukes nesten aldri. Dataene er ofte forsinket og "
        "kostbare å bearbeide. Over 100 metoder for å unngå rapportering er identifisert.</p>"
        "<p><b>Steg 2: den viktigste.</b> Bare skattemyndighetene får informasjonen. Ingen tredjepart får innsyn.</p>"
        "<p><b>Merk.</b> Legger man CRS til grunn, er det nesten ingen skatteparadiser igjen. Måles det med "
        "Financial Secrecy Index, ligger Caymanøyene øverst. Formell etterlevelse er ikke reell åpenhet.</p>"
        "<p><b>TIEA.</b> Informasjonsutvekslingsavtalene har en lignende svakhet: de krever at du alt vet hvem det gjelder og hvor pengene er, før du kan spørre.</p>"
        "<p><b>Husk:</b> CRS: bare til skattemyndighetene, USA er ikke med.</p>")

st("int-s23", "tolkning",
   q="<p>Et konsern har kr 100 000 000 i overskudd i en jurisdiksjon der den effektive skattesatsen er 3 %. Den globale "
     "minimumsskatten er 15 %. Toppskatten er maks(0 ; 15 % − effektiv sats) × overskudd. Hvor stor toppskatt "
     "utløses?</p>",
   alt=[
       F("kr 15 000 000", "Hele minimumssatsen. Skatten som alt er betalt, 3 %, trekkes fra."),
       F("kr 3 000 000", "Dette er skatten som alt er betalt, 3 %."),
       R("kr 12 000 000"),
       F("kr 18 000 000", "Satsene lagt sammen. Toppskatten fyller bare opp til 15 %."),
   ],
   kort="<p><b>kr 12 000 000.</b> (15 % − 3 %) × 100 000 000 = 12 000 000.</p>",
   full="<p><b>Hva minimumsskatten gjør.</b> Den globale minimumsskatten på 15 % angriper satsen: er den effektive "
        "skatten i en jurisdiksjon under 15 %, hentes differansen inn et annet sted i konsernet.</p>"
        "<p><b>Steg 1: differansen.</b> 15 % − 3 % = 12 prosentpoeng.</p>"
        "<p><b>Steg 2: toppskatten.</b> 12 % × 100 000 000 = 12 000 000.</p>"
        "<p><b>Kontroll.</b> Samlet skatt blir 3 000 000 + 12 000 000 = 15 000 000, altså 15 % ✓.</p>"
        "<p><b>Mekanismen.</b> Det er kredittaket med et gulv i stedet for et tak: gevinsten ved å flytte overskudd "
        "nedover forsvinner når bunnen heves. Den rører ikke hemmeligholdet.</p>"
        "<p><b>Grensen.</b> Er den effektive satsen 15 % eller mer, er toppskatten null.</p>"
        "<p><b>Husk:</b> toppskatt = (15 % − effektiv sats) × overskudd, aldri under null.</p>")

st("int-s24", "fakta",
   q="<p>Hva fant Alstadsæter, Johannesen og Zucman om de 0,01 % rikeste i Norge?</p>",
   alt=[
       F("De skjuler om lag 25 % av formuen og unndrar om lag 20 % av skatten",
         "Tallene er byttet. Det er 20 % av formuen og 25 % av skatten."),
       F("De skjuler om lag 2 % av formuen og unndrar om lag 3 % av skatten",
         "For lavt. Studien fant om lag 20 og 25 %."),
       R("De skjuler om lag 20 % av formuen og unndrar om lag 25 % av skatten"),
       F("De eier om lag halvparten av all formue nordmenn skjuler i skatteparadis",
         "Halvparten gjelder den rikeste prosenten, ikke de 0,01 % rikeste. Spørsmålet gjelder andelen av deres "
         "egen formue og skatt: 20 og 25 %."),
   ],
   kort="<p><b>20 % av formuen, 25 % av skatten.</b> Halvparten av all formue nordmenn skjuler i skatteparadis, tilhører "
        "den rikeste prosenten.</p>",
   full="<p><b>Studien.</b> Alstadsæter, Johannesen og Zucman koblet lekkede data og amnestisaker med skatteregistre. "
        "Funnet er at skjult formue er sterkt konsentrert på toppen.</p>"
        "<p><b>Steg 1: formuen.</b> De 0,01 % rikeste skjuler om lag 20 % av formuen sin.</p>"
        "<p><b>Steg 2: skatten.</b> De unndrar om lag 25 % av skatten de skulle betalt.</p>"
        "<p><b>Merk.</b> Tallene måler ulike ting: andel av formuen skjult mot andel av skatten unndratt. Et "
        "flervalgsalternativ bytter dem gjerne om.</p>"
        "<p><b>Hvorfor det betyr noe.</b> Halvparten av all formue nordmenn skjuler i skatteparadis, tilhører den rikeste prosenten. Unndragelsen forsterker bildet av at den effektive skatten faller på toppen.</p><p><b>Feilene.</b> Byttede tall er den vanligste fellen. Et alternativ med halvparten blander inn tallet for den rikeste prosenten.</p>"
        "<p><b>Husk:</b> 20 % formue, 25 % skatt.</p>")

st("int-s25", "tolkning",
   q="<p>Et konsern setter internprisen slik at kr 10 000 000 i overskudd flyttes fra et datterselskap i Norge "
     "(22 % skatt) til et datterselskap i et land med 5 % skatt. Hvor mye sparer konsernet i skatt?</p>",
   alt=[
       F("kr 2 200 000", "Dette er den norske skatten på beløpet. Konsernet betaler 5 % i det andre landet."),
       R("kr 1 700 000"),
       F("kr 500 000", "Dette er skatten i lavskattelandet, ikke besparelsen."),
       F("kr 2 700 000", "Satsene lagt sammen. Besparelsen er differansen."),
   ],
   kort="<p><b>kr 1 700 000.</b> Besparelse = flyttet overskudd × (t<sub>høy</sub> − t<sub>lav</sub>) = "
        "10 000 000 × 17 %.</p>",
   full="<p><b>Internprising.</b> Konsernselskaper handler med hverandre til priser konsernet selv setter. Settes "
        "prisen høyt på det som selges inn i høyskattelandet, flyttes overskuddet dit satsen er lav.</p>"
        "<p><b>Steg 1: satsforskjellen.</b> 22 % − 5 % = 17 prosentpoeng.</p>"
        "<p><b>Steg 2: besparelsen.</b> 10 000 000 × 17 % = 1 700 000.</p>"
        "<p><b>Kontroll.</b> Uten flytting: 2 200 000 i Norge. Med flytting: 500 000 ute. 2 200 000 − 500 000 = "
        "1 700 000 ✓.</p>"
        "<p><b>Motmiddelet.</b> Armlengdeprinsippet krever at internprisen er som mellom uavhengige parter. For "
        "varemerker og konserntjenester finnes ofte ingen markedspris.</p>"
        "<p><b>Hvorfor lavere sats hjelper.</b> Senker et land selskapsskatten, krymper differansen og dermed motivet til å flytte overskudd ut. En global minstesats på 15 % virker på samme måte fra den andre siden.</p>"
        "<p><b>Husk:</b> gevinsten er proporsjonal med satsforskjellen, ikke med satsnivået.</p>")

st("int-s26", "begrep",
   q="<p>Hva er tynn kapitalisering som metode for å flytte overskudd mellom land?</p>",
   alt=[
       F("Lite egenkapital i morselskapet, slik at utbyttet blir skattefritt",
         "Utbyttets skattefritak følger av fritaksmetoden, ikke av kapitalstrukturen."),
       F("Internprisen settes høyt på varer som selges inn i høyskattelandet",
         "Det er internprising, den andre mekanismen for overskuddsflytting."),
       F("Selskapet låner i banken for å kjøpe tilbake egne aksjer",
         "Ekstern gjeld til tilbakekjøp flytter ikke overskudd mellom land."),
       R("Konsernintern gjeld legger rentefradraget der satsen er høy"),
   ],
   kort="<p><b>Konsernintern gjeld.</b> Datterselskapet i høyskattelandet betaler renter til et finansieringsselskap "
        "der satsen er lav. Ingen krone forlater konsernet, bare skattegrunnlaget flytter seg.</p>",
   full="<p><b>Mekanismen.</b> Konsernet legger egenkapitalen i et finansieringsselskap i en lavskattejurisdiksjon. Det "
        "låner så ut til datterselskapet i høyskattelandet.</p>"
        "<p><b>Steg 1: høyskattelandet.</b> Rentene er fradragsberettigede, så overskuddet og skatten der faller.</p>"
        "<p><b>Steg 2: lavskattelandet.</b> Renteinntekten skattlegges lavt eller ikke.</p>"
        "<p><b>Merk.</b> Konsernet som helhet har samme kontantstrøm. Bare fordelingen av skattegrunnlaget er "
        "endret. Besparelsen er derfor rentebeløpet ganger satsforskjellen, se eksempelet under.</p>"
        "<p><b>Motmiddelet.</b> Rentebegrensningsregler kutter fradraget for netto konserninterne renter over en andel "
        "av resultatet.</p>"
        "<p><b>Eksempel.</b> Datterselskapet i Norge betaler 10 000 000 i renter til et finansieringsselskap med 0 % skatt. Fradraget sparer 10 000 000 × (22 % − 0 %) = 2 200 000 i norsk skatt, mens renteinntekten ikke skattlegges. Pengene har ikke forlatt konsernet.</p>"
        "<p><b>Husk:</b> tynn kapitalisering: gjeld der satsen er høy, egenkapital der den er lav.</p>")
