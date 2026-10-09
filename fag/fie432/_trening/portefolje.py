# -*- coding: utf-8 -*-
"""Eksamenstrening, tema «portefolje»: sparing og porteføljevalg (k14 og avsnitt 18.2),
   kjernepensum kj8.

   Regnerutinene fra eksamens-DNA § 4 som hører hit: R14 (Merton med og uten
   humankapital), R15 (sparevalg med ln-nytte, subjektive sannsynligheter og
   tapsaversjon), R16 (CAGR og sluttverdi) og R20 (minimum varians ved ρ = 1).
   I tillegg porteføljevarians og kapitalmarkedslinjen. De statiske spørsmålene
   dekker indeksfond, valutasikring, aktiv mot passiv forvaltning, livssyklusen
   og formelgjenkjenning.
"""
import math
import re

from trening_lib import *  # noqa: F401,F403

exp = math.exp

T = "portefolje"

PERSONER = [("Ida", "hun"), ("Jonas", "han"), ("Selma", "hun"), ("Aksel", "han"), ("Ingrid", "hun"),
            ("Tobias", "han"), ("Nora", "hun"), ("Elias", "han"), ("Maja", "hun"), ("Henrik", "han"),
            ("Sofie", "hun"), ("Emil", "han"), ("Thea", "hun"), ("Sander", "han"), ("Live", "hun"),
            ("Martin", "han"), ("Hanna", "hun"), ("Even", "han")]


# ---------------------------------------------------------------- små hjelpere
def stor(s):
    return s[:1].upper() + s[1:]


def heltallig(x, tol=1e-7):
    return abs(x - round(x)) < tol


def pk(x):
    """Brøk til prosent uten unødige desimaler: 0.05 → «5 %», 0.035 → «3,5 %»."""
    v = x * 100
    d = 0 if heltallig(v) else (1 if heltallig(v * 10) else 2)
    return tall(v, d) + NBSP + "%"


def ppo(x):
    """Brøk til prosentpoeng: 0.05 → «5 prosentpoeng»."""
    v = x * 100
    d = 0 if heltallig(v) else (1 if heltallig(v * 10) else 2)
    return tall(v, d) + NBSP + "prosentpoeng"


def dk(x, maxd=4, mind=2):
    """Desimaltall uten unødige nuller: 0.05 → «0,05», 0.0225 → «0,0225», 2.5 → «2,50»."""
    v = rund(abs(x), maxd)
    s = f"{v:.{maxd}f}".rstrip("0")
    hel, _, des = s.partition(".")
    des = des.ljust(mind, "0")
    neg = x < 0 and float(s or 0) != 0
    return (MINUS if neg else "") + tall(int(hel)) + "," + des


def gtxt(g):
    """Risikoaversjon: 2 → «2», 2.5 → «2,5»."""
    return tall(g, 0 if heltallig(g) else 1)


def ledd(x, d=6):
    """Et ledd med fortegn foran: 0.0027 → «+ 0,0027», −0.0045 → «− 0,0045»."""
    return ("− " if x < 0 else "+ ") + dk(abs(x), d)


def u3(x):
    return tall(x, 3)


def u4(x):
    return tall(x, 4)


def _norm(s):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", str(s))).strip().lower()


def plukk(r, riktig, kandidater, n=3, rel=0.03):
    """Velger n feller blant kandidatene (F-objekter) i tilfeldig rekkefølge, slik at
       ingen to alternativer har samme tekst eller for like verdier."""
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
    """Velger en undertype blant dem som er brukt minst så langt i familien, så variantene
       fordeler seg jevnt. Kall brukt() rett før return."""
    teller = _BRUKT.setdefault(fid, {m: 0 for m in modi})
    minst = min(teller.values())
    return r.choice([m for m in modi if teller[m] == minst])


def brukt(fid, m):
    _BRUKT[fid][m] += 1


SIGMA2 = "σ<sup>2</sup>"
RF = "r<sub>f</sub>"
BH = "β<sub>H</sub>"
MERTON = f"w* = (μ − {RF})/(γ{SIGMA2})"


# ===========================================================================
# prt-mer1 · Mertons aksjeandel forlengs
# ===========================================================================
@familie("prt-mer1", tema=T, antall=5, tittel="Mertons aksjeandel w*")
def _(r):
    navn, pron = r.choice(PERSONER)
    modus = modus_for("prt-mer1", r, ["premie", "mu", "varians"])
    gamma = r.choice([1.5, 2, 2.5, 3, 4, 5])
    rf = r.choice([0.02, 0.025, 0.03, 0.035, 0.04])
    premie = r.choice([0.03, 0.035, 0.04, 0.045, 0.05, 0.06])
    mu = rf + premie
    if modus == "varians":
        var = r.choice([0.02, 0.03, 0.04, 0.05, 0.06, 0.08, 0.10])
        sigma = sqrt(var)
    else:
        sigma = r.choice([0.15, 0.16, 0.18, 0.20, 0.22, 0.25])
        var = sigma ** 2
    w = premie / (gamma * var)
    if not 0.2 <= w <= 1.0:
        raise Avvis("w* utenfor 20–100 %")

    f_gamma = F(pst(premie / var, 1),
                f"Risikoaversjonen er utelatt: {dk(premie)}/{dk(var)}. Da er γ satt til 1 uansett hva "
                f"oppgaven sier.", premie / var)
    if modus == "premie":
        tekst = (f"<p>Risikofri rente er {pk(rf)}. Aksjemarkedets meravkastning over risikofri rente er "
                 f"{ppo(premie)}. Markedets standardavvik er {pk(sigma)}.</p>")
        steg1 = (f"<p><b>Steg 1: telleren.</b> Meravkastningen er oppgitt direkte: μ − {RF} = {dk(premie)}. "
                 f"Den risikofrie renten på {pk(rf)} er alt trukket fra og skal ikke trekkes fra en gang til.</p>")
        feller = [F(pst(premie / (gamma * sigma), 1),
                    f"Standardavviket brukt i stedet for variansen: {dk(premie)}/({gtxt(gamma)} × {dk(sigma)}).",
                    premie / (gamma * sigma)), f_gamma]
        if premie - rf > 0.005:
            feller.append(F(pst((premie - rf) / (gamma * var), 1),
                            f"Risikofri rente trukket fra en gang til: ({dk(premie)} − {dk(rf)})/({gtxt(gamma)} × "
                            f"{dk(var)}). Meravkastningen er alt over risikofri rente.", (premie - rf) / (gamma * var)))
    elif modus == "mu":
        tekst = (f"<p>Et globalt indeksfond har forventet avkastning {pk(mu)} og standardavvik {pk(sigma)}. "
                 f"Risikofri rente er {pk(rf)}.</p>")
        steg1 = (f"<p><b>Steg 1: telleren.</b> Telleren er risikopremien, ikke hele avkastningen: "
                 f"μ − {RF} = {pk(mu)} − {pk(rf)} = {ppo(premie)}, altså {dk(premie)}.</p>")
        feller = [F(pst(premie / (gamma * sigma), 1),
                    f"Standardavviket brukt i stedet for variansen: {dk(premie)}/({gtxt(gamma)} × {dk(sigma)}).",
                    premie / (gamma * sigma)),
                  F(pst(mu / (gamma * var), 1),
                    f"Forventet avkastning i telleren i stedet for risikopremien: {dk(mu)}/({gtxt(gamma)} × "
                    f"{dk(var)}). Risikofri rente må trekkes fra først.", mu / (gamma * var)),
                  f_gamma]
    else:
        tekst = (f"<p>Aksjemarkedet har forventet avkastning {pk(mu)}. Markedets varians er {dk(var)}. "
                 f"Risikofri rente er {pk(rf)}.</p>")
        steg1 = (f"<p><b>Steg 1: telleren.</b> Risikopremien er μ − {RF} = {pk(mu)} − {pk(rf)} = "
                 f"{ppo(premie)}, altså {dk(premie)}.</p>")
        feller = [F(pst(premie / (gamma * sqrt(var)), 1),
                    f"Roten av variansen i nevneren, altså standardavviket: {dk(premie)}/({gtxt(gamma)} × "
                    f"√{dk(var)}). Formelen skal ha variansen.", premie / (gamma * sqrt(var))),
                  F(pst(mu / (gamma * var), 1),
                    f"Forventet avkastning i telleren i stedet for risikopremien: {dk(mu)}/({gtxt(gamma)} × "
                    f"{dk(var)}).", mu / (gamma * var)),
                  f_gamma]
    if modus == "varians":
        steg2 = (f"<p><b>Steg 2: nevneren.</b> Variansen er oppgitt direkte, {SIGMA2} = {dk(var)}. Den skal ikke "
                 f"kvadreres en gang til. γ{SIGMA2} = {gtxt(gamma)} × {dk(var)} = {dk(gamma * var, 5)}.</p>")
    else:
        steg2 = (f"<p><b>Steg 2: nevneren.</b> Standardavviket må kvadreres: {SIGMA2} = {dk(sigma)}<sup>2</sup> = "
                 f"{dk(var)}. Da er γ{SIGMA2} = {gtxt(gamma)} × {dk(var)} = {dk(gamma * var, 5)}.</p>")

    q = (tekst + f"<p>{navn} har risikoaversjon γ = {gtxt(gamma)} og ingen humankapital. {stor(pron)} følger "
         f"Mertons formel for optimal aksjeandel. Hvor stor andel av formuen bør {navn} ha i aksjer? "
         f"Rund av til én desimal.</p>")
    alternativer = plukk(r, R(pst(w, 1), w), feller)
    kort = (f"<p><b>{pst(w, 1)}.</b> w* = {dk(premie)}/({gtxt(gamma)} × {dk(var)}) = {dk(w)}. "
            + ("Variansen brukes som den er.</p>" if modus == "varians"
               else f"Nevneren har variansen {dk(var)}, ikke standardavviket {dk(sigma)}.</p>"))
    full = (
        f"<p><b>Hva formelen sier.</b> Mertons formel {MERTON} gir andelen av totalformuen som bør stå i "
        f"aksjer. Telleren er risikopremien, det aksjer forventes å gi utover risikofri rente. Nevneren er "
        f"prisen på risiko for akkurat deg: risikoaversjonen γ ganget med markedets varians. Mer premie gir "
        f"mer aksjer. Mer risiko eller mer risikoaversjon gir mindre.</p>"
        + steg1 + steg2 +
        f"<p><b>Steg 3: andelen.</b> w* = {dk(premie)}/{dk(gamma * var, 5)} = {dk(w)}, altså <b>{pst(w, 1)}</b>. "
        f"Med kr 1 000 000 i formue betyr det {kr(w * 1e6)} i aksjer og resten i bank.</p>"
        f"<p><b>Kontroll:</b> sett svaret inn igjen. {dk(w)} × {gtxt(gamma)} × {dk(var)} = "
        f"{dk(w * gamma * var)}, som er risikopremien. Ligger svaret over 100 %, har du nesten alltid glemt å "
        f"kvadrere standardavviket eller glemt γ.</p>"
        f"<p><b>Husk:</b> {SIGMA2} er varians. Står det standardavvik, kvadrerer du. Står det varians, bruker du "
        f"tallet som det er.</p>"
    )
    brukt("prt-mer1", modus)
    return sporsmal(q, alternativer, kort, full)


# ===========================================================================
# prt-mer2 · Mertons formel baklengs: finn γ
# ===========================================================================
_MER2 = []
for _p in (0.03, 0.035, 0.04, 0.045, 0.05, 0.06):
    for _s in (0.10, 0.15, 0.20, 0.25):
        for _g in (1, 1.5, 2, 2.5, 3, 4, 5):
            _w = _p / (_g * _s ** 2)
            if 0.25 <= _w <= 1 and heltallig(_w * 100):
                _MER2.append((_p, _s ** 2, _g, round(_w * 100) / 100, _s))
_MER2V = []
for _p in (0.03, 0.035, 0.04, 0.045, 0.05, 0.06):
    for _v in (0.02, 0.03, 0.04, 0.05, 0.06, 0.08, 0.10):
        for _g in (1, 1.5, 2, 2.5, 3, 4, 5):
            _w = _p / (_g * _v)
            if 0.25 <= _w <= 1 and heltallig(_w * 100) and (_p, _v, _w) != (0.05, 0.10, 0.5):
                _MER2V.append((_p, _v, _g, round(_w * 100) / 100))


@familie("prt-mer2", tema=T, antall=5, tittel="Merton baklengs: risikoaversjonen γ")
def _(r):
    navn, pron = r.choice(PERSONER)
    modus = modus_for("prt-mer2", r, ["varians", "sigma"])
    _MER2_BRUKT = _BRUKT.setdefault("prt-mer2-gamma", set())
    if modus == "varians":
        premie, var, gamma, w = r.choice(_MER2V)
        sigma = sqrt(var)
        tekst = (f"<p>Aksjemarkedets meravkastning over risikofri rente er {dk(premie)}. Markedets varians er "
                 f"{dk(var)}.</p>")
        steg1 = (f"<p><b>Steg 1: tallene.</b> Premien er {dk(premie)}. Variansen er oppgitt direkte: "
                 f"{SIGMA2} = {dk(var)}. Den skal ikke kvadreres.</p>")
        feller = [F(tall(premie / (w * sqrt(var)), 2),
                    f"Roten av variansen i nevneren, altså standardavviket: {dk(premie)}/({dk(w)} × √{dk(var)}). "
                    f"Formelen skal ha variansen.", premie / (w * sqrt(var))),
                  F(tall(w * var / premie, 2),
                    f"Brøken snudd: ({dk(w)} × {dk(var)})/{dk(premie)}. Det gir 1/γ, ikke γ.", w * var / premie),
                  F("Umulig å avgjøre uten å kjenne tidshorisonten",
                    "Tidshorisonten står ikke i Mertons formel. Tre av de fire størrelsene er oppgitt. Da er den "
                    "fjerde entydig bestemt.")]
    else:
        premie, var, gamma, w, sigma = r.choice(_MER2)
        rf = r.choice([0.02, 0.025, 0.03])
        mu = rf + premie
        tekst = (f"<p>Aksjemarkedet har forventet avkastning {pk(mu)} og standardavvik {pk(sigma)}. "
                 f"Risikofri rente er {pk(rf)}.</p>")
        steg1 = (f"<p><b>Steg 1: tallene.</b> Premien er μ − {RF} = {pk(mu)} − {pk(rf)} = {dk(premie)}. "
                 f"Variansen er {SIGMA2} = {dk(sigma)}<sup>2</sup> = {dk(var)}.</p>")
        feller = [F(tall(premie / (w * sigma), 2),
                    f"Standardavviket brukt i stedet for variansen: {dk(premie)}/({dk(w)} × {dk(sigma)}).",
                    premie / (w * sigma)),
                  F(tall(mu / (w * var), 2),
                    f"Forventet avkastning brukt i stedet for risikopremien: {dk(mu)}/({dk(w)} × {dk(var)}).",
                    mu / (w * var)),
                  F(tall(w * var / premie, 2),
                    f"Brøken snudd: ({dk(w)} × {dk(var)})/{dk(premie)}. Det gir 1/γ, ikke γ.", w * var / premie)]
    if gamma in _MER2_BRUKT:
        raise Avvis("samme γ som en tidligere variant")
    q = (tekst + f"<p>Ifølge Mertons formel bør {navn} ha {pk(w)} av formuen i aksjer. Hva er {gen(navn)} "
         f"risikoaversjon γ? Rund av til to desimaler.</p>")
    alternativer = plukk(r, R(tall(gamma, 2), gamma), feller)
    kort = (f"<p><b>γ = {tall(gamma, 2)}.</b> Snu formelen: γ = (μ − {RF})/(w* × {SIGMA2}) = "
            f"{dk(premie)}/({dk(w)} × {dk(var)}) = {tall(gamma, 2)}.</p>")
    full = (
        f"<p><b>Hva du gjør.</b> Mertons formel {MERTON} knytter sammen fire størrelser: aksjeandelen, "
        f"risikopremien, variansen og risikoaversjonen γ. Er tre av dem oppgitt, er den fjerde bestemt. Her er "
        f"aksjeandelen kjent. Du løser for γ: γ = (μ − {RF})/(w* × {SIGMA2}).</p>"
        + steg1 +
        f"<p><b>Steg 2: nevneren.</b> w* × {SIGMA2} = {dk(w)} × {dk(var)} = {dk(w * var, 5)}.</p>"
        f"<p><b>Steg 3: γ.</b> {dk(premie)}/{dk(w * var, 5)} = <b>{tall(gamma, 2)}</b>.</p>"
        f"<p><b>Kontroll:</b> sett γ tilbake i formelen: {dk(premie)}/({gtxt(gamma)} × {dk(var)}) = "
        f"{dk(premie / (gamma * var))}, altså {pk(w)}. ✓ Til sammenligning: γ = 1 svarer til ln-nytte. "
        f"Empiriske anslag ligger gjerne på 2 til 5.</p>"
        f"<p><b>Husk:</b> skriv ned om tallet du får, er σ eller {SIGMA2}, før du setter inn. Variansfeilen "
        f"gir et svar som er helt feil, ikke litt feil.</p>"
    )
    brukt("prt-mer2", modus)
    _MER2_BRUKT.add(gamma)
    return sporsmal(q, alternativer, kort, full)


# ===========================================================================
# prt-hk1 · Merton med risikofri humankapital (β_H = 0)
# ===========================================================================
JOBBER_TRYGG = ["lektor i den offentlige skolen", "sykepleier med fast stilling", "fast ansatt i staten",
                "politibetjent", "fast ansatt i en kommune", "lege i et offentlig sykehus"]


@familie("prt-hk1", tema=T, antall=5, tittel="Merton med risikofri humankapital")
def _(r):
    navn, pron = r.choice(PERSONER)
    alder = r.choice([27, 29, 31, 33, 36, 40])
    jobb = r.choice(JOBBER_TRYGG)
    w = r.choice([0.25, 0.30, 0.35, 0.40, 0.45, 0.50, 0.60])
    F_ = r.randrange(300_000, 1_800_001, 100_000)
    H = r.randrange(2_500_000, 6_000_001, 250_000)
    tot = F_ + H
    belop = w * tot
    andel = belop / F_
    if F_ > 0.6 * H:
        raise Avvis("urealistisk stor finansformue mot humankapitalen")
    if andel > 2.5:
        raise Avvis("urimelig høy giring")
    laan = andel > 1
    modus = modus_for("prt-hk1", r, ["andel", "belop"])
    q = (f"<p>{navn} er {alder} år og {jobb}. Lønnen svinger ikke med aksjemarkedet, så humankapitalen er "
         f"risikofri ({BH} = 0). Finansformuen er {kr(F_)}. Nåverdien av framtidig arbeidsinntekt, "
         f"humankapitalen, er {kr(H)}. Mertons formel gir {navn} en optimal aksjeandel på w* = {pk(w)} av "
         f"totalformuen.")
    if laan:
        q += f" {stor(pron)} kan låne til risikofri rente og følger formelen fullt ut."
    q += "</p>"
    if modus == "andel":
        q += f"<p>Hvor stor andel av finansformuen bør {navn} ha i aksjer? Rund av til én desimal.</p>"
        riktig = R(pst(andel, 1), andel)
        b1 = max(0.0, (belop - H) / F_)
        kand = [F(pst(w, 1), f"w* brukt direkte på finansformuen. Merton gjelder totalformuen "
                             f"{tall(F_)} + {tall(H)} = {tall(tot)}. Da er humankapitalen utelatt.", w),
                F(pst(b1, 1), f"Humankapitalen behandlet som aksjer ({BH} = 1): "
                              f"({tall(belop)} − {tall(H)})/{tall(F_)}"
                              + (", kappet ved 0" if belop < H else "") + f". Lønnen til {navn} er trygg, så {BH} = 0.",
                  b1),
                F(pst(belop / H, 1), f"Aksjebeløpet delt på humankapitalen i stedet for på finansformuen: "
                                     f"{tall(belop)}/{tall(H)}.", belop / H)]
        if laan:
            kand.append(F(pst(1.0, 1), f"Andelen kappet ved 100 %. {navn} kan låne og følger formelen fullt ut, så "
                                       f"svaret er {pst(andel, 1)}, finansiert delvis med lån.", 1.0))
        alternativer = plukk(r, riktig, kand)
        svar = pst(andel, 1)
        kort = (f"<p><b>{svar}.</b> Aksjebeløpet er {pk(w)} × ({tall(F_)} + {tall(H)}) = {kr(belop)}. Alt må tas i "
                f"finansformuen: {tall(belop)}/{tall(F_)} = {svar}.</p>")
    else:
        q += f"<p>Hvor mange kroner bør {navn} ha i aksjer?</p>"
        riktig = R(kr(belop), belop)
        b1 = max(0.0, belop - H)
        kand = [F(kr(w * F_), f"w* brukt direkte på finansformuen: {pk(w)} × {tall(F_)}. Humankapitalen er en del "
                              f"av totalformuen og må med.", w * F_),
                F(kr(b1), f"Humankapitalen behandlet som aksjer ({BH} = 1): {tall(belop)} − {tall(H)}"
                          + (", kappet ved 0" if belop < H else "") + f". Lønnen er trygg, så {BH} = 0.", b1),
                F(kr(w * H), f"Bare humankapitalen ganget med w*: {pk(w)} × {tall(H)}. Finansformuen er glemt.", w * H)]
        if laan:
            kand.append(F(kr(F_), f"Beløpet kappet ved hele finansformuen. {navn} kan låne, så formelen gir "
                                  f"{kr(belop)}.", F_))
        alternativer = plukk(r, riktig, kand)
        svar = kr(belop)
        kort = (f"<p><b>{svar}.</b> Merton gjelder totalformuen: {pk(w)} × ({tall(F_)} + {tall(H)}) = {svar}. "
                f"Humankapitalen er trygg og bidrar ikke med aksjeeksponering.</p>")
    bank = F_ - belop
    balanse = (f"aksjer {tall(belop)}, " + (f"lån {tall(-bank)}" if bank < 0 else f"bank {tall(bank)}")
               + f" og humankapital {tall(H)}")
    full = (
        f"<p><b>Hva humankapitalen gjør.</b> Humankapitalen er nåverdien av all framtidig arbeidsinntekt. For en "
        f"ung arbeidstaker er den den største posten på balansen, selv om den ikke kan selges. Mertons w* gjelder "
        f"totalformuen, finansformuen pluss humankapitalen. En trygg lønn ({BH} = 0) virker som et stort "
        f"bankinnskudd. Da må hele aksjeeksponeringen tas i finansformuen.</p>"
        f"<p><b>Steg 1: totalformuen.</b> {tall(F_)} + {tall(H)} = {kr(tot)}.</p>"
        f"<p><b>Steg 2: ønsket aksjebeløp.</b> {pk(w)} × {tall(tot)} = {kr(belop)}.</p>"
        f"<p><b>Steg 3: hvor beløpet tas.</b> Humankapitalen gir ingen aksjeeksponering når {BH} = 0, så hele "
        f"beløpet står i finansformuen: {tall(belop)}/{tall(F_)} = <b>{pst(andel, 1)}</b> av finansformuen"
        + (f". Over 100 % betyr at {navn} låner {kr(belop - F_)} til risikofri rente." if laan else ".") + "</p>"
        f"<p><b>Kontroll:</b> balansen etterpå er {balanse}. Aksjer delt på alt: {tall(belop)}/{tall(tot)} = "
        f"{pk(belop / tot)}, som er w*. ✓ Bruker du w* på finansformuen alene, blir aksjeandelen av alt bare "
        f"{pst(w * F_ / tot, 1)}.</p>"
        f"<p><b>Husk:</b> w* × (F + H) er beløpet. Trygg humankapital er en obligasjon du alt eier, så "
        f"finansformuen skal ha mer aksjer, ikke mindre.</p>"
    )
    brukt("prt-hk1", modus)
    return sporsmal(q, alternativer, kort, full)


# ===========================================================================
# prt-hk2 · Merton med delvis risikabel humankapital (β_H mellom 0 og 1)
# ===========================================================================
JOBBER_RISIKO = [("selger med provisjonslønn", "Provisjonen følger konjunkturene"),
                 ("aksjemegler", "Bonusen følger aksjemarkedet"),
                 ("konsulent i et oppstartsselskap", "Lønnen og opsjonene følger markedet"),
                 ("eiendomsmegler", "Inntekten følger bolig- og aksjemarkedet"),
                 ("ansatt i en investeringsbank", "Bonusen følger markedet"),
                 ("selvstendig næringsdrivende", "Overskuddet følger konjunkturene")]


@familie("prt-hk2", tema=T, antall=5, tittel="Merton med risikabel humankapital")
def _(r):
    navn, pron = r.choice(PERSONER)
    jobb, grunn = r.choice(JOBBER_RISIKO)
    w = r.choice([0.30, 0.35, 0.40, 0.45, 0.50, 0.60])
    beta = r.choice([0.25, 0.4, 0.5, 0.6, 0.75, 1.0])
    F_ = r.randrange(800_000, 4_000_001, 100_000)
    H = r.randrange(500_000, 4_000_001, 250_000)
    tot = F_ + H
    belop_tot = w * tot
    fra_h = beta * H
    belop = belop_tot - fra_h
    andel = belop / F_
    if not 0.05 <= andel <= 0.95 or nær(andel, w, 0.03):
        raise Avvis("andel utenfor 5–95 % eller lik w*")
    q = (f"<p>{navn} er {jobb}. {grunn}, så humankapitalen har beta {BH} = {dk(beta, 2)} mot aksjemarkedet. "
         f"Finansformuen er {kr(F_)}. Humankapitalen er {kr(H)}. Mertons formel gir {navn} en optimal "
         f"aksjeandel på w* = {pk(w)} av totalformuen.</p>"
         f"<p>Hvor stor andel av finansformuen bør {navn} ha i aksjer? Rund av til én desimal.</p>")
    kand = [F(pst(belop_tot / F_, 1), f"Humankapitalen behandlet som risikofri ({BH} = 0): {tall(belop_tot)}/{tall(F_)}. "
                                       f"Da er aksjeeksponeringen i lønnen glemt.", belop_tot / F_),
            F(pst(w, 1), f"w* brukt direkte på finansformuen. Da er verken humankapitalen eller betaen med.", w),
            F(pst(belop / tot, 1), f"Riktig kronebeløp, men delt på totalformuen: {tall(belop)}/{tall(tot)}. Spørsmålet "
                                   f"gjelder andelen av finansformuen.", belop / tot),
            F(pst(w * (F_ + beta * H) / F_, 1), f"Betaen lagt på formuen i stedet for på eksponeringen: "
                                               f"{pk(w)} × ({tall(F_)} + {dk(beta, 2)} × {tall(H)})/{tall(F_)}.",
              w * (F_ + beta * H) / F_)]
    if beta < 1 and belop_tot - H > 0:
        kand.append(F(pst((belop_tot - H) / F_, 1), f"Hele humankapitalen trukket fra, som om {BH} = 1: "
                                                    f"({tall(belop_tot)} − {tall(H)})/{tall(F_)}.", (belop_tot - H) / F_))
    alternativer = plukk(r, R(pst(andel, 1), andel), kand)
    kort = (f"<p><b>{pst(andel, 1)}.</b> Ønsket eksponering {pk(w)} × {tall(tot)} = {tall(belop_tot)}. Lønnen gir alt "
            f"{dk(beta, 2)} × {tall(H)} = {tall(fra_h)}. Resten, {tall(belop)}, er {pst(andel, 1)} av "
            f"{tall(F_)}.</p>")
    full = (
        f"<p><b>Hva betaen betyr.</b> {BH} måler hvor mye humankapitalen svinger med aksjemarkedet. Med {BH} = 0 er "
        f"lønnen en obligasjon. Med {BH} = 1 er hele humankapitalen i praksis aksjer. Med {BH} = {dk(beta, 2)} "
        f"oppfører {pk(beta)} av humankapitalen seg som aksjer, enten {navn} vil eller ikke. Den eksponeringen "
        f"skal trekkes fra før du bestemmer hvor mye av finansformuen som skal i aksjer.</p>"
        f"<p><b>Steg 1: ønsket eksponering.</b> Totalformuen er {tall(F_)} + {tall(H)} = {kr(tot)}. "
        f"{pk(w)} × {tall(tot)} = {kr(belop_tot)}.</p>"
        f"<p><b>Steg 2: det lønnen alt gir.</b> {BH} × H = {dk(beta, 2)} × {tall(H)} = {kr(fra_h)}.</p>"
        f"<p><b>Steg 3: resten i finansformuen.</b> {tall(belop_tot)} − {tall(fra_h)} = {kr(belop)}. Andelen er "
        f"{tall(belop)}/{tall(F_)} = <b>{pst(andel, 1)}</b>. Resten av finansformuen, {kr(F_ - belop)}, står "
        f"risikofritt.</p>"
        f"<p><b>Kontroll:</b> samlet aksjeeksponering er {tall(belop)} + {tall(fra_h)} = {tall(belop + fra_h)}. Delt på "
        f"totalformuen: {tall(belop + fra_h)}/{tall(tot)} = {pk((belop + fra_h) / tot)}, som er w*. ✓</p>"
        f"<p><b>Husk:</b> andel av F = [w*(F + H) − {BH} × H]/F. Jo mer lønnen følger markedet, jo tryggere skal "
        f"finansformuen være. Det er også argumentet mot å eie aksjer i egen arbeidsgiver.</p>"
    )
    return sporsmal(q, alternativer, kort, full)


# ===========================================================================
# prt-liv1 · Livssyklusen: samme person ved to aldre
# ===========================================================================
@familie("prt-liv1", tema=T, antall=5, tittel="Aksjeandelen gjennom livet")
def _(r):
    navn, pron = r.choice(PERSONER)
    a1 = r.choice([28, 30, 32, 35])
    a2 = a1 + r.choice([20, 25, 30])
    w = r.choice([0.25, 0.30, 0.35, 0.40, 0.50])
    F1 = r.randrange(400_000, 1_500_001, 100_000)
    H1 = r.randrange(3_000_000, 7_000_001, 500_000)
    F2 = r.randrange(3_000_000, 8_000_001, 500_000)
    H2 = r.randrange(250_000, 1_500_001, 250_000)
    b1 = w * (F1 + H1)
    b2 = w * (F2 + H2)
    andel2 = b2 / F2
    andel1 = b1 / F1
    beta1 = max(0.0, (b2 - H2) / F2)
    if not 0.2 <= andel2 <= 0.95 or andel1 <= andel2 + 0.1 or andel1 > 2.5 or nær(andel2, w, 0.03):
        raise Avvis("andelene gir ikke en tydelig nedgang")
    q = (f"<p>{navn} har trygg jobb i offentlig sektor, så humankapitalen er risikofri ({BH} = 0). "
         f"Mertons formel gir {pk(w)} av totalformuen i aksjer. Risikoaversjonen og markedsanslagene er de "
         f"samme gjennom hele livet. {stor(pron)} kan låne til risikofri rente.</p>"
         f"<p>Ved {a1} år er finansformuen {kr(F1)} og humankapitalen {kr(H1)}. Ved {a2} år er finansformuen "
         f"{kr(F2)} og humankapitalen {kr(H2)}.</p>"
         f"<p>Hvor stor andel av finansformuen bør {navn} ha i aksjer ved {a2} år? Rund av til én desimal.</p>")
    kand = [F(pst(b1 / F2, 1), f"Aksjebeløpet fra {a1} år holdt fast: {tall(b1)}/{tall(F2)}. Beløpet skal være w* av "
                               f"dagens totalformue, {pk(w)} × {tall(F2 + H2)} = {tall(b2)}.", b1 / F2),
            F(pst(w, 1), f"w* brukt direkte på finansformuen, som om humankapitalen på {kr(H2)} ikke fantes.", w),
            F(pst(andel1, 1), f"Andelen ved {a1} år: {tall(b1)}/{tall(F1)}. Humankapitalen har krympet siden da.",
              andel1),
            F(pst(beta1, 1),
              f"Humankapitalen behandlet som aksjer ({BH} = 1): ({tall(b2)} − {tall(H2)})/{tall(F2)}"
              + (", kappet ved 0" if b2 < H2 else "") + f". {gen(navn)} lønn er trygg, så {BH} = 0.", beta1)]
    alternativer = plukk(r, R(pst(andel2, 1), andel2), kand)
    kort = (f"<p><b>{pst(andel2, 1)}.</b> Ved {a2} år er aksjebeløpet {pk(w)} × ({tall(F2)} + {tall(H2)}) = "
            f"{tall(b2)}. Andelen er {tall(b2)}/{tall(F2)} = {pst(andel2, 1)}.</p>")
    full = (
        f"<p><b>Hvorfor andelen faller.</b> Mertons w* er den samme gjennom livet når γ og markedet er det samme. "
        f"Det som endrer seg, er balansen: humankapitalen, en stor trygg post som virker som en obligasjon, "
        f"brukes opp år for år. Finansformuen vokser. Da må mer av den trygge delen av totalformuen ligge i "
        f"finansformuen. Aksjeandelen av finansformuen faller derfor. Alderen i seg selv står ikke i formelen.</p>"
        f"<p><b>Steg 1: ved {a1} år.</b> {pk(w)} × ({tall(F1)} + {tall(H1)}) = {kr(b1)}, altså "
        f"{pst(andel1, 1)} av finansformuen" + (" med lån" if andel1 > 1 else "") + ".</p>"
        f"<p><b>Steg 2: ved {a2} år.</b> Totalformuen er {tall(F2)} + {tall(H2)} = {kr(F2 + H2)}. Aksjebeløpet er "
        f"{pk(w)} × {tall(F2 + H2)} = {kr(b2)}.</p>"
        f"<p><b>Steg 3: andelen.</b> {tall(b2)}/{tall(F2)} = <b>{pst(andel2, 1)}</b>.</p>"
        f"<p><b>Kontroll:</b> ved {a2} år er balansen aksjer {tall(b2)}, bank {tall(F2 - b2)} og humankapital "
        f"{tall(H2)}. Aksjer delt på alt er {tall(b2)}/{tall(F2 + H2)} = {pk(b2 / (F2 + H2))} = w*. ✓ Holder du "
        f"kronebeløpet fra {a1} år fast, blir aksjeandelen av alt {pst(b1 / (F2 + H2), 1)}, ikke w*.</p>"
        f"<p><b>Husk:</b> unge med trygg jobb skal ha høy aksjeandel av finansformuen fordi humankapitalen er "
        f"stor og trygg, ikke fordi aksjer blir tryggere over tid.</p>"
    )
    return sporsmal(q, alternativer, kort, full)


# ===========================================================================
# prt-var1 · Standardavviket til en portefølje av to aktiva
# ===========================================================================
PAR = [("et globalt aksjefond", "et obligasjonsfond", "aksjefondet", "obligasjonsfondet"),
       ("aksje A", "aksje B", "aksje A", "aksje B"),
       ("et teknologifond", "et eiendomsfond", "teknologifondet", "eiendomsfondet"),
       ("et fremvoksende-markeder-fond", "et globalt indeksfond", "det første fondet", "indeksfondet"),
       ("en amerikansk teknologiaksje", "en norsk sparebankaksje", "teknologiaksjen", "bankaksjen")]


@familie("prt-var1", tema=T, antall=5, tittel="Porteføljens standardavvik med to aktiva")
def _(r):
    navn, pron = r.choice(PERSONER)
    a1, a2, k1, k2 = r.choice(PAR)
    s = r.choice([0.3, 0.4, 0.5, 0.6, 0.7, 0.8])
    s1 = r.choice([0.15, 0.18, 0.20, 0.25, 0.30])
    s2 = r.choice([0.06, 0.08, 0.10, 0.12, 0.15, 0.20])
    rho = r.choice([-0.5, -0.4, -0.3, -0.2, 0.2, 0.3, 0.4, 0.5, 0.6])
    mu1 = r.choice([0.07, 0.08, 0.09, 0.10])
    mu2 = r.choice([0.03, 0.04, 0.05])
    if abs(s1 - s2) < 0.03:
        raise Avvis("for like standardavvik")
    l1, l2 = s ** 2 * s1 ** 2, (1 - s) ** 2 * s2 ** 2
    kryss = 2 * s * (1 - s) * rho * s1 * s2
    var = l1 + l2 + kryss
    sd = sqrt(var)
    snitt = s * s1 + (1 - s) * s2
    kand = [F(pst(snitt, 2), f"Standardavvikene veid sammen: {dk(s, 1)} × {pk(s1)} + {dk(1 - s, 1)} × {pk(s2)}. Det er "
                             f"svaret bare når ρ = 1.", snitt),
            F(pst(var, 2), f"Variansen {dk(var, 6)} oppgitt som om den var standardavviket. Ta kvadratroten til slutt.",
              var)]
    v_rho = l1 + l2 + 2 * s * (1 - s) * rho
    if v_rho > 0:
        kand.append(F(pst(sqrt(v_rho), 2), f"Krysleddet regnet med ρ alene i stedet for ρσ<sub>1</sub>σ<sub>2</sub>: "
                                          f"√({dk(l1, 6)} + {dk(l2, 6)} + 2 × {dk(s, 1)} × {dk(1 - s, 1)} × "
                                          f"{dk(rho, 1)}).", sqrt(v_rho)))
    v_vekt = l1 + l2 + 2 * rho * s1 * s2
    if v_vekt > 0:
        kand.append(F(pst(sqrt(v_vekt), 2), f"Vektene glemt i krysleddet: √({dk(l1, 6)} + {dk(l2, 6)} + 2 × "
                                           f"({dk(rho, 1)}) × {dk(s1)} × {dk(s2)}).", sqrt(v_vekt)))
    if rho < 0:
        v_abs = l1 + l2 - kryss
        kand.append(F(pst(sqrt(v_abs), 2), f"Minustegnet på korrelasjonen mistet: √({dk(l1, 6)} + {dk(l2, 6)} + "
                                          f"{dk(-kryss, 6)}). Negativ korrelasjon senker risikoen.", sqrt(v_abs)))
    else:
        v_to = l1 + l2 + kryss / 2
        kand.append(F(pst(sqrt(v_to), 2), f"Totallet i krysleddet glemt: √({dk(l1, 6)} + {dk(l2, 6)} + "
                                         f"{dk(kryss / 2, 6)}).", sqrt(v_to)))
    alternativer = plukk(r, R(pst(sd, 2), sd), kand)
    q = (f"<p>{navn} har {pk(s)} av sparepengene i {a1} og {pk(1 - s)} i {a2}. {stor(k1)} har forventet avkastning "
         f"{pk(mu1)} og standardavvik {pk(s1)}. {stor(k2)} har forventet avkastning {pk(mu2)} og standardavvik "
         f"{pk(s2)}. Korrelasjonen mellom dem er ρ = {dk(rho, 1)}.</p>"
         f"<p>Hva er standardavviket til {gen(navn)} portefølje? Rund av til to desimaler.</p>")
    kort = (f"<p><b>{pst(sd, 2)}.</b> σ<sub>p</sub><sup>2</sup> = {dk(l1, 6)} + {dk(l2, 6)} {ledd(kryss)} = "
            f"{dk(var, 6)}. Roten er √{dk(var, 6)} = {pst(sd, 2)}.</p>")
    full = (
        f"<p><b>Hvorfor risikoen ikke er et vektet snitt.</b> Forventet avkastning er et rent vektet snitt. Variansen "
        f"er det ikke: σ<sub>p</sub><sup>2</sup> = s<sup>2</sup>σ<sub>1</sub><sup>2</sup> + (1 − s)<sup>2</sup>"
        f"σ<sub>2</sub><sup>2</sup> + 2s(1 − s)ρσ<sub>1</sub>σ<sub>2</sub>. Krysleddet inneholder kovariansen "
        f"ρσ<sub>1</sub>σ<sub>2</sub>. Så lenge ρ er under 1, blir standardavviket lavere enn snittet av "
        f"standardavvikene. Det er diversifiseringsgevinsten.</p>"
        f"<p><b>Steg 1: kvadratleddene.</b> {dk(s, 1)}<sup>2</sup> × {dk(s1)}<sup>2</sup> = {dk(l1, 6)} og "
        f"{dk(1 - s, 1)}<sup>2</sup> × {dk(s2)}<sup>2</sup> = {dk(l2, 6)}. Både vekten og standardavviket "
        f"kvadreres.</p>"
        f"<p><b>Steg 2: krysleddet.</b> 2 × {dk(s, 1)} × {dk(1 - s, 1)} × ({dk(rho, 1)}) × {dk(s1)} × {dk(s2)} = "
        f"{dk(kryss, 6)}." + (" Det er negativt fordi aktivaene trekker litt i hver sin retning." if rho < 0 else "")
        + "</p>"
        f"<p><b>Steg 3: variansen og roten.</b> {dk(l1, 6)} + {dk(l2, 6)} {ledd(kryss)} = {dk(var, 6)}. Roten er "
        f"√{dk(var, 6)} = {dk(sd, 5)}, altså <b>{pst(sd, 2)}</b>.</p>"
        f"<p><b>Kontroll:</b> svaret må ligge under det vektede snittet {pst(snitt, 2)}, fordi ρ er under 1. "
        f"{pst(sd, 2)} &lt; {pst(snitt, 2)}. ✓ Forventet avkastning er derimot bare snittet: "
        f"{dk(s, 1)} × {pk(mu1)} + {dk(1 - s, 1)} × {pk(mu2)} = {pst(s * mu1 + (1 - s) * mu2, 2)}.</p>"
        f"<p><b>Husk:</b> kvadrer vektene, ta med begge standardavvikene i krysleddet, behold fortegnet på ρ og "
        f"ta roten til slutt.</p>"
    )
    return sporsmal(q, alternativer, kort, full)


# ===========================================================================
# prt-minv1 · Minimum varians: ρ = 1 (hjørne), ρ = −1 og ρ = 0
# ===========================================================================
@familie("prt-minv1", tema=T, antall=5, tittel="Minimum varians og grensetilfellene for ρ")
def _(r):
    navn, pron = r.choice(PERSONER)
    mod = modus_for("prt-minv1", r, ["rho1a", "rho1b", "rhom1", "rho0"])
    modus = "rho1" if mod.startswith("rho1") else mod
    sa = r.choice([0.12, 0.15, 0.18, 0.20, 0.24])
    sb = r.choice([0.25, 0.28, 0.30, 0.35, 0.40])
    if sb - sa < 0.06:
        raise Avvis("for like standardavvik")
    ma = r.choice([0.04, 0.06, 0.08, 0.10])
    mb = r.choice([0.03, 0.05, 0.07, 0.09, 0.11])
    if ma == mb:
        raise Avvis("like forventninger")
    w0 = sb ** 2 / (sa ** 2 + sb ** 2)          # minimum varians ved ρ = 0
    wm1 = sb / (sa + sb)                          # null risiko ved ρ = −1
    tekst = (f"<p>Aksje A har forventet avkastning {pk(ma)} og standardavvik {pk(sa)}. Aksje B har forventet "
             f"avkastning {pk(mb)} og standardavvik {pk(sb)}. {navn} kan bare investere i disse to aksjene og kan "
             f"ikke shortselge.")
    if modus == "rho1":
        spør_b = mod == "rho1b"
        rho_t = "1"
        if spør_b:
            riktig = R(pst(0.0, 1), 0.0)
            kand = [F(pst(1 - w0, 1), f"Minimum-varians-andelen for B med ρ satt til 0: {dk(sa)}<sup>2</sup>/({dk(sa)}"
                                      f"<sup>2</sup> + {dk(sb)}<sup>2</sup>). Den gjelder bare ukorrelerte aksjer.",
                      1 - w0),
                    F(pst(1 - wm1, 1), f"Andelen for B som gir null risiko ved ρ = −1: {dk(sa)}/({dk(sa)} + {dk(sb)}). "
                                       f"Her er ρ = +1.", 1 - wm1),
                    F(pst(0.5, 1), "Halvparten i hver, fordi spredning alltid skal senke risikoen. Ved ρ = 1 finnes "
                                   "ingen diversifiseringsgevinst.", 0.5)]
            spm = "Hvor stor andel bør ligge i aksje B?"
        else:
            riktig = R(pst(1.0, 1), 1.0)
            kand = [F(pst(w0, 1), f"Minimum-varians-andelen med ρ satt til 0: {dk(sb)}<sup>2</sup>/({dk(sa)}<sup>2</sup> + "
                                  f"{dk(sb)}<sup>2</sup>). Den gjelder bare ukorrelerte aksjer.", w0),
                    F(pst(wm1, 1), f"Andelen som gir null risiko ved ρ = −1: {dk(sb)}/({dk(sa)} + {dk(sb)}). "
                                   f"Her er ρ = +1.", wm1),
                    F(pst(0.5, 1), "Halvparten i hver, fordi spredning alltid skal senke risikoen. Ved ρ = 1 finnes "
                                   "ingen diversifiseringsgevinst.", 0.5)]
            spm = "Hvor stor andel bør ligge i aksje A?"
        svar_a = 0.0 if spør_b else 1.0
        kort = (f"<p><b>{pst(svar_a, 1)}.</b> Ved ρ = 1 er σ<sub>p</sub> = w × {pk(sa)} + (1 − w) × {pk(sb)}, en "
                f"rett linje. Lavest risiko er hjørnet med alt i A, aksjen med lavest standardavvik.</p>")
        steg = (f"<p><b>Steg 1: hva ρ = 1 gjør.</b> Med ρ = 1 blir variansen et fullt kvadrat. Standardavviket er da "
                f"lineært i andelen w i A: σ<sub>p</sub> = w × {dk(sa)} + (1 − w) × {dk(sb)} = {dk(sb)} − "
                f"{dk(sb - sa)}w.</p>"
                f"<p><b>Steg 2: minimum.</b> Uttrykket faller jo større w er. Uten shortsalg er største lovlige w = 1. "
                f"Alt i A gir σ<sub>p</sub> = {pk(sa)}. B skal da ha <b>{pst(svar_a, 1) if spør_b else '0,0 %'}</b>"
                + (".</p>" if spør_b else ". Svaret er <b>100,0 %</b> i A.</p>") +
                f"<p><b>Kontroll:</b> prøv andelen {pst(w0, 1)} i A, minimum-varians-svaret ved ρ = 0. Da er "
                f"σ<sub>p</sub> = {dk(w0, 4)} × {pk(sa)} + {dk(1 - w0, 4)} × {pk(sb)} = "
                f"{pst(w0 * sa + (1 - w0) * sb, 2)}, høyere enn {pk(sa)}. ✓ "
                + ("Forventet avkastning spiller ingen rolle her: spørsmålet gjelder bare risikoen.</p>"
                   if ma < mb else "A har dessuten høyest forventning, så alt annet er dominert.</p>"))
        husk = "ved ρ = 1 må svaret være et hjørne, aldri en indre andel. Velg aksjen med lavest standardavvik."
        q = tekst + (f" Korrelasjonen mellom aksjene er 1.</p><p>{navn} vil ha en portefølje med så lavt "
                     f"standardavvik som mulig. {spm} Rund av til én desimal.</p>")
    elif modus == "rhom1":
        rho_t = "−1"
        riktig = R(pst(wm1, 1), wm1)
        kand = [F(pst(0.5, 1), "Halvparten i hver. Null risiko krever at de to bidragene er like store. Det skjer "
                               "ved 50 % bare når standardavvikene er like.", 0.5),
                F(pst(1 - wm1, 1), f"Brøken snudd: {dk(sa)}/({dk(sa)} + {dk(sb)}). Det er andelen som skal i B.",
                  1 - wm1),
                F(pst(w0, 1), f"Minimum-varians-andelen med ρ satt til 0: {dk(sb)}<sup>2</sup>/({dk(sa)}<sup>2</sup> + "
                              f"{dk(sb)}<sup>2</sup>). Her er ρ = −1. Da kan risikoen fjernes helt.", w0),
                F(pst(1.0, 1), "Alt i aksjen med lavest standardavvik. Det er svaret ved ρ = +1, ikke ved ρ = −1.", 1.0)]
        q = tekst + (f" Korrelasjonen mellom aksjene er −1.</p><p>Hvor stor andel må {navn} ha i aksje A for at "
                     f"porteføljen skal få så lavt standardavvik som mulig? Rund av til én desimal.</p>")
        kort = (f"<p><b>{pst(wm1, 1)}.</b> Ved ρ = −1 kan risikoen fjernes helt: w = σ<sub>B</sub>/(σ<sub>A</sub> + "
                f"σ<sub>B</sub>) = {dk(sb)}/({dk(sa)} + {dk(sb)}) = {pst(wm1, 1)}.</p>")
        steg = (f"<p><b>Steg 1: hva ρ = −1 gjør.</b> Aksjene beveger seg alltid motsatt. Standardavviket blir "
                f"σ<sub>p</sub> = |w × {dk(sa)} − (1 − w) × {dk(sb)}|. Det kan bli null.</p>"
                f"<p><b>Steg 2: null risiko.</b> w × {dk(sa)} = (1 − w) × {dk(sb)} gir w = {dk(sb)}/({dk(sa)} + "
                f"{dk(sb)}) = <b>{pst(wm1, 1)}</b>.</p>"
                f"<p><b>Kontroll:</b> {dk(wm1, 4)} × {dk(sa)} = {dk(wm1 * sa, 4)} og {dk(1 - wm1, 4)} × {dk(sb)} = "
                f"{dk((1 - wm1) * sb, 4)}. Bidragene er like store og opphever hverandre. ✓ Aksjen med lavest "
                f"standardavvik skal ha størst andel, ikke 50 %.</p>")
        husk = "ved ρ = −1 er null-risiko-andelen i A lik σ<sub>B</sub>/(σ<sub>A</sub> + σ<sub>B</sub>), som bare er 50 % når standardavvikene er like."
    else:
        rho_t = "0"
        riktig = R(pst(w0, 1), w0)
        kand = [F(pst(wm1, 1), f"Standardavvik brukt i stedet for varianser: {dk(sb)}/({dk(sa)} + {dk(sb)}). Det er "
                               f"svaret ved ρ = −1.", wm1),
                F(pst(1 - w0, 1), f"Brøken snudd: {dk(sa)}<sup>2</sup>/({dk(sa)}<sup>2</sup> + {dk(sb)}<sup>2</sup>). "
                                  f"Det er andelen som skal i B.", 1 - w0),
                F(pst(1.0, 1), "Alt i aksjen med lavest standardavvik. Det er hjørneløsningen ved ρ = 1. Ved ρ = 0 "
                               "senker litt av B risikoen.", 1.0),
                F(pst(0.5, 1), "Halvparten i hver. Minimum-varians-andelen avhenger av variansene.", 0.5)]
        q = tekst + (f" Korrelasjonen mellom aksjene er 0.</p><p>Hvor stor andel bør {navn} ha i aksje A for å få "
                     f"minimum-varians-porteføljen? Rund av til én desimal.</p>")
        var_min = w0 ** 2 * sa ** 2 + (1 - w0) ** 2 * sb ** 2
        kort = (f"<p><b>{pst(w0, 1)}.</b> Med ρ = 0 er w* = σ<sub>B</sub><sup>2</sup>/(σ<sub>A</sub><sup>2</sup> + "
                f"σ<sub>B</sub><sup>2</sup>) = {dk(sb ** 2)}/({dk(sa ** 2)} + {dk(sb ** 2)}) = {pst(w0, 1)}.</p>")
        steg = (f"<p><b>Steg 1: formelen.</b> Minimum varians gir w* = (σ<sub>B</sub><sup>2</sup> − ρσ<sub>A</sub>"
                f"σ<sub>B</sub>)/(σ<sub>A</sub><sup>2</sup> + σ<sub>B</sub><sup>2</sup> − 2ρσ<sub>A</sub>σ<sub>B</sub>). "
                f"Med ρ = 0 faller kovariansleddene bort.</p>"
                f"<p><b>Steg 2: sett inn.</b> {dk(sb ** 2)}/({dk(sa ** 2)} + {dk(sb ** 2)}) = "
                f"{dk(sb ** 2)}/{dk(sa ** 2 + sb ** 2)} = <b>{pst(w0, 1)}</b>.</p>"
                f"<p><b>Kontroll:</b> standardavviket ved w* er √({dk(var_min, 6)}) = {pst(sqrt(var_min), 2)}, lavere "
                f"enn {pk(sa)} med alt i A. ✓ Litt av den mer risikable aksjen senker altså risikoen når "
                f"korrelasjonen er lav.</p>")
        husk = "minimum varians ved ρ = 0 bruker varianser, σ<sub>B</sub><sup>2</sup>/(σ<sub>A</sub><sup>2</sup> + σ<sub>B</sub><sup>2</sup>). Standardavvik i brøken er svaret ved ρ = −1."
    alternativer = plukk(r, riktig, kand)
    full = (
        f"<p><b>Hva korrelasjonen gjør.</b> Porteføljevariansen er w<sup>2</sup>σ<sub>A</sub><sup>2</sup> + "
        f"(1 − w)<sup>2</sup>σ<sub>B</sub><sup>2</sup> + 2w(1 − w)ρσ<sub>A</sub>σ<sub>B</sub>. Korrelasjonen ρ "
        f"bestemmer hvor mye av risikoen som forsvinner når du blander. Her er ρ = {rho_t}.</p>"
        + steg + f"<p><b>Husk:</b> {husk}</p>"
    )
    brukt("prt-minv1", mod)
    return sporsmal(q, alternativer, kort, full)


# ===========================================================================
# prt-kml1 · Kapitalmarkedslinjen og Sharpe-forholdet
# ===========================================================================
@familie("prt-kml1", tema=T, antall=6, tittel="Kapitalmarkedslinjen")
def _(r):
    navn, pron = r.choice(PERSONER)
    modus = modus_for("prt-kml1", r, ["E", "sigma", "laan", "sharpe"])
    rf = r.choice([0.02, 0.025, 0.03])
    premie = r.choice([0.04, 0.045, 0.05, 0.06])
    em = rf + premie
    sm = r.choice([0.12, 0.15, 0.16, 0.20])
    sharpe = premie / sm
    k = r.choice([0.6, 0.8, 1.25, 1.5, 1.6, 2.0])
    oppsett = (f"<p>Risikofri rente er {pk(rf)}. Du kan både spare og låne til den renten. Markedsporteføljen, i "
               f"praksis et globalt indeksfond, har forventet avkastning {pk(em)} og standardavvik {pk(sm)}.</p>"
               )
    linje = (f"<p><b>Kapitalmarkedslinjen.</b> Alle kombinasjoner av bank og markedsporteføljen M ligger på en rett "
             f"linje: E(r<sub>p</sub>) = {RF} + [(E(r<sub>M</sub>) − {RF})/σ<sub>M</sub>] × σ<sub>p</sub>. "
             f"Stigningstallet er Sharpe-forholdet, meravkastning per enhet risiko. Vil du ha mer risiko enn M, låner "
             f"du til {RF} og kjøper mer M. Bankleddet har ingen varians, så standardavviket skaleres med andelen i "
             f"M.</p>")
    if modus == "E":
        sp = k * sm
        ep = rf + sharpe * sp
        q = oppsett + (f"<p>{navn} følger teorien og vil ha en portefølje med standardavvik {pk(sp)}. Hvilken forventet "
                       f"avkastning gir kapitalmarkedslinjen? Rund av til to desimaler.</p>")
        kand = [F(pst(k * em, 2), (f"Lånekostnaden glemt: {dk(k, 2)} × {pk(em)}. Hver lånte krone koster {pk(rf)}."
                                   if k > 1 else f"Bankdelen glemt: {dk(k, 2)} × {pk(em)}. De {pk(1 - k)} i banken "
                                   f"gir {pk(rf)}."), k * em),
                F(pst(k * premie, 2), f"Risikofri rente glemt: {dk(k, 2)} × {pk(premie)}. Linjen starter i {pk(rf)}.",
                  k * premie),
                F(pst(rf + em / sm * sp, 2), f"Stigningstallet regnet uten å trekke fra {RF}: {pk(rf)} + "
                                            f"({dk(em)}/{dk(sm)}) × {pk(sp)}.", rf + em / sm * sp)]
        if k > 1:
            kand.append(F(pst(em, 2), "Mer risiko enn M betales ikke. Feil: langs linjen betales den, så lenge du tar den "
                                      "ved å gire M.", em))
        riktig = R(pst(ep, 2), ep)
        kort = (f"<p><b>{pst(ep, 2)}.</b> Sharpe = {dk(premie)}/{dk(sm)} = {dk(sharpe, 4)}. "
                f"E(r<sub>p</sub>) = {pk(rf)} + {dk(sharpe, 4)} × {pk(sp)} = {pst(ep, 2)}.</p>")
        steg = (f"<p><b>Steg 1: Sharpe-forholdet.</b> ({pk(em)} − {pk(rf)})/{pk(sm)} = {dk(premie)}/{dk(sm)} = "
                f"{dk(sharpe, 4)}.</p>"
                f"<p><b>Steg 2: les av linjen.</b> {pk(rf)} + {dk(sharpe, 4)} × {pk(sp)} = <b>{pst(ep, 2)}</b>.</p>"
                f"<p><b>Kontroll med vektene:</b> andelen i M er σ<sub>p</sub>/σ<sub>M</sub> = {dk(k, 2)}"
                + (f", altså {pk(k - 1)} lånt" if k > 1 else f", altså {pk(1 - k)} i bank")
                + (f". {dk(k, 2)} × {pk(em)} − {dk(k - 1, 2)} × {pk(rf)} = " if k > 1
                   else f". {dk(k, 2)} × {pk(em)} + {dk(1 - k, 2)} × {pk(rf)} = ")
                + f"{pst(k * em - (k - 1) * rf, 2)}. ✓</p>")
    elif modus == "sigma":
        ep = rf + k * premie
        sp = k * sm
        q = oppsett + (f"<p>{navn} vil ha forventet avkastning {pk(ep)} og tar risikoen slik teorien sier. Hvilket "
                       f"standardavvik får porteføljen? Rund av til to desimaler.</p>")
        kand = [F(pst(ep / em * sm, 2), f"Lånekostnaden glemt: andelen i M regnet som {pk(ep)}/{pk(em)} i stedet for "
                                        f"({pk(ep)} − {pk(rf)})/({pk(em)} − {pk(rf)}).", ep / em * sm),
                F(pst((ep - rf) / (em / sm), 2), f"Stigningstallet regnet uten {RF}: ({pk(ep)} − {pk(rf)})/"
                                                 f"({dk(em)}/{dk(sm)}).", (ep - rf) / (em / sm)),
                F(pst(sm * sqrt(k), 2), f"Variansen skalert med andelen i stedet for standardavviket: {pk(sm)} × "
                                        f"√{dk(k, 2)}.", sm * sqrt(k))]
        riktig = R(pst(sp, 2), sp)
        kort = (f"<p><b>{pst(sp, 2)}.</b> Andelen i M er ({pk(ep)} − {pk(rf)})/({pk(em)} − {pk(rf)}) = {dk(k, 2)}. "
                f"Da er σ<sub>p</sub> = {dk(k, 2)} × {pk(sm)} = {pst(sp, 2)}.</p>")
        steg = (f"<p><b>Steg 1: andelen i M.</b> Hver krone i M gir {ppo(premie)} mer enn banken. Du trenger "
                f"{pk(ep)} − {pk(rf)} = {ppo(ep - rf)} ekstra: w = {dk(ep - rf)}/{dk(premie)} = {dk(k, 2)}.</p>"
                f"<p><b>Steg 2: standardavviket.</b> {dk(k, 2)} × {pk(sm)} = <b>{pst(sp, 2)}</b>.</p>"
                f"<p><b>Kontroll med linjen:</b> {pk(rf)} + ({dk(premie)}/{dk(sm)}) × {pk(sp)} = "
                f"{pst(rf + sharpe * sp, 2)}, som er målet. ✓</p>")
    elif modus == "laan":
        if k <= 1:
            k = r.choice([1.25, 1.5, 1.6, 2.0])
        sp = k * sm
        q = oppsett + (f"<p>{navn} har kr 500 000 i egenkapital og vil ha en portefølje med standardavvik {pk(sp)} på "
                       f"kapitalmarkedslinjen. Hvor mye må {pron} låne til risikofri rente, målt i prosent av "
                       f"egenkapitalen? Rund av til én desimal.</p>")
        lan = k - 1
        kand = [F(pst(k, 1), f"Dette er andelen i M, σ<sub>p</sub>/σ<sub>M</sub> = {dk(k, 2)}. Lånet er det som "
                             f"overstiger egenkapitalen.", k),
                F(pst(k ** 2 - 1, 1), f"Variansene delt i stedet for standardavvikene: ({dk(sp)}/{dk(sm)})<sup>2</sup> − 1.",
                  k ** 2 - 1),
                F(pst((sp - sm) / sp, 1), f"Delt på feil standardavvik: ({dk(sp)} − {dk(sm)})/{dk(sp)}.", (sp - sm) / sp)]
        riktig = R(pst(lan, 1), lan)
        kort = (f"<p><b>{pst(lan, 1)}.</b> Andelen i M er {pk(sp)}/{pk(sm)} = {dk(k, 2)}. Lånet er "
                f"{dk(k, 2)} − 1 = {dk(lan, 2)} av egenkapitalen, altså {kr(lan * 500_000)}.</p>")
        steg = (f"<p><b>Steg 1: andelen i M.</b> Standardavviket skaleres med andelen: w = σ<sub>p</sub>/σ<sub>M</sub> "
                f"= {pk(sp)}/{pk(sm)} = {dk(k, 2)}.</p>"
                f"<p><b>Steg 2: lånet.</b> {dk(k, 2)} − 1 = {dk(lan, 2)}, altså <b>{pst(lan, 1)}</b> av egenkapitalen: "
                f"{navn} låner {kr(lan * 500_000)} og har {kr(k * 500_000)} i M.</p>"
                f"<p><b>Kontroll:</b> forventet avkastning blir {dk(k, 2)} × {pk(em)} − {dk(lan, 2)} × {pk(rf)} = "
                f"{pst(k * em - lan * rf, 2)}, det samme som linjen gir: {pk(rf)} + ({dk(premie)}/{dk(sm)}) × "
                f"{pk(sp)} = {pst(rf + sharpe * sp, 2)}. ✓</p>")
    else:
        q = oppsett + ("<p>Hva er Sharpe-forholdet til markedsporteføljen, altså stigningstallet på "
                       "kapitalmarkedslinjen? Rund av til tre desimaler.</p>")
        kand = [F(tall(em / sm, 3), f"Risikofri rente ikke trukket fra: {dk(em)}/{dk(sm)}. Sharpe måler meravkastning "
                                    f"per enhet risiko.", em / sm),
                F(tall(premie / sm ** 2, 3), f"Variansen i nevneren: {dk(premie)}/{dk(sm ** 2)}. Sharpe bruker "
                                             f"standardavviket.", premie / sm ** 2),
                F(tall(sm / premie, 3), f"Brøken snudd: {dk(sm)}/{dk(premie)}. Det er risiko per enhet "
                                        f"meravkastning.", sm / premie)]
        riktig = R(tall(sharpe, 3), sharpe)
        kort = (f"<p><b>{tall(sharpe, 3)}.</b> ({pk(em)} − {pk(rf)})/{pk(sm)} = {dk(premie)}/{dk(sm)} = "
                f"{tall(sharpe, 3)}.</p>")
        sp = 1.5 * sm
        steg = (f"<p><b>Steg 1: meravkastningen.</b> {pk(em)} − {pk(rf)} = {ppo(premie)}.</p>"
                f"<p><b>Steg 2: del på standardavviket.</b> {dk(premie)}/{dk(sm)} = <b>{tall(sharpe, 3)}</b>. Hvert "
                f"prosentpoeng risiko gir {tall(sharpe, 3)} prosentpoeng meravkastning.</p>"
                f"<p><b>Kontroll:</b> en portefølje med 150 % i M har standardavvik {pk(sp)} og forventet avkastning "
                f"1,5 × {pk(em)} − 0,5 × {pk(rf)} = {pst(1.5 * em - 0.5 * rf, 2)}. Sharpe-forholdet er "
                f"({pst(1.5 * em - 0.5 * rf, 2)} − {pk(rf)})/{pk(sp)} = {tall((1.5 * em - 0.5 * rf - rf) / sp, 3)}, "
                f"det samme. ✓ Giring endrer ikke Sharpe-forholdet.</p>")
    alternativer = plukk(r, riktig, kand)
    full = (linje + steg +
            f"<p><b>Husk:</b> meravkastning per risiko er {dk(premie)}/{dk(sm)}. Mer risiko enn M tar du ved å låne og "
            f"kjøpe mer M, aldri ved å kjøpe mer volatile enkeltaksjer.</p>")
    brukt("prt-kml1", modus)
    return sporsmal(q, alternativer, kort, full)


# ===========================================================================
# Felles oppsett for sparevalget med ln-nytte (R15)
# ===========================================================================
def _sparevalg(r, tap_mulig=True):
    """Trekker et sparevalg: innskudd, horisont, bankrente og fondets to utfall."""
    W0 = r.choice([300_000, 400_000, 500_000, 600_000, 800_000])
    T_ = r.choice([10, 15, 20, 25])
    rb = r.choice([0.02, 0.025, 0.03, 0.035, 0.04])
    Wb = W0 * (1 + rb) ** T_
    g = r.choice([0.06, 0.07, 0.08, 0.09, 0.10])
    d = r.choice([-0.04, -0.03, -0.02, -0.01])
    Wg = round(W0 * (1 + g) ** T_ / 10_000) * 10_000
    Wd = round(W0 * (1 + d) ** T_ / 10_000) * 10_000
    return W0, T_, rb, Wb, Wg, Wd


def _oppsett_spar(navn, pron, W0, T_, rb, Wg, Wd, p, med_p=True):
    s = (f"<p>{navn} har {kr(W0)} og skal spare i {T_} år. {stor(pron)} må velge ett av to alternativer fullt ut. "
         f"Banken gir sikker rente {pk(rb)} per år. Et aksjefond er verdt {kr(Wg)} om {T_} år hvis det blir gode "
         f"tider og {kr(Wd)} hvis det blir dårlige tider.")
    if med_p:
        s += f" Sannsynligheten for gode tider er {pk(p)}."
    s += (f" Se bort fra skatt.</p><p>{navn} har nyttefunksjonen U(W) = ln W, der W er sluttverdien. {stor(pron)} "
          f"velger alternativet med høyest forventet nytte.")
    return s


def _valg(hvem, u_v, u_t):
    """«Banken: forventet nytte 13,714 mot 13,496 for fondet»."""
    if hvem == "bank":
        return f"Banken: forventet nytte {u3(u_v)} mot {u3(u_t)} for fondet"
    return f"Fondet: forventet nytte {u3(u_v)} mot {u3(u_t)} for banken"


def _valg_par(u_bank, u_fond):
    return _valg("bank", u_bank, u_fond) if u_bank > u_fond else _valg("fond", u_fond, u_bank)


# ===========================================================================
# prt-ln1 · Bank eller fond med ln-nytte
# ===========================================================================
@familie("prt-ln1", tema=T, antall=5, tittel="Sparevalget med ln-nytte")
def _(r):
    navn, pron = r.choice(PERSONER)
    W0, T_, rb, Wb, Wg, Wd = _sparevalg(r)
    p = r.choice([0.3, 0.4, 0.5, 0.6])
    Ub, Ug, Ud = ln(Wb), ln(Wg), ln(Wd)
    Uf = p * Ug + (1 - p) * Ud
    EW = p * Wg + (1 - p) * Wd
    if abs(Ub - Uf) < 0.004 or EW <= Wb * 1.02:
        raise Avvis("for tett eller fondet har ikke høyest forventet sluttverdi")
    vinner = "bank" if Ub > Uf else "fond"
    kand = [F(f"Fondet, fordi forventet sluttverdi er høyest: {kr(EW)} mot {kr(Wb)} for banken",
              f"Forventet sluttverdi sammenlignet i stedet for forventet nytte. Det er valget til en risikonøytral "
              f"person. Med ln-nytte går hvert utfall gjennom ln før du vekter.")]
    if p != 0.5:
        Us = (1 - p) * Ug + p * Ud
        if abs(Us - Ub) > 0.002:
            kand.append(F(_valg_par(Ub, Us), f"Sannsynlighetene byttet om: {dk(1 - p, 1)} × ln {tall(Wg)} + {dk(p, 1)} × "
                                             f"ln {tall(Wd)} = {u3(Us)}. Det er gode tider som har {pk(p)}."))
    if abs(Uf - ln(W0)) > 0.002:
        kand.append(F(_valg_par(ln(W0), Uf), f"Innskuddet brukt som bankens sluttverdi: ln {tall(W0)} = {u3(ln(W0))}. "
                                             f"Banken forrenter pengene i {T_} år, til {kr(Wb)}."))
    if abs(ln(EW) - Ub) > 0.002:
        kand.append(F(_valg_par(Ub, ln(EW)), f"Nytten av forventet sluttverdi, ln {tall(EW)} = {u3(ln(EW))}, i stedet for "
                                             f"forventet nytte. For en konkav nyttefunksjon er E[ln W] lavere enn ln E[W]."))
    alternativer = plukk(r, R(_valg_par(Ub, Uf)), kand)
    q = (_oppsett_spar(navn, pron, W0, T_, rb, Wg, Wd, p)
         + f" Hvilket alternativ velger {pron}? Oppgi forventet nytte av begge. Nyttetallene er avrundet til tre "
           f"desimaler.</p>")
    hva = "Banken" if vinner == "bank" else "Fondet"
    kort = (f"<p><b>{hva}.</b> Banken gir ln {tall(Wb)} = {u3(Ub)}. Fondet gir {dk(p, 1)} × {u4(Ug)} + {dk(1 - p, 1)} × "
            f"{u4(Ud)} = {u3(Uf)}.</p>")
    full = (
        f"<p><b>Hva forventet nytte gjør.</b> Med U(W) = ln W sammenligner du ikke kroner, men nytten av kronene. "
        f"Logaritmen er konkav: den siste kronen er verdt mindre enn den første. Et dårlig utfall trekker derfor "
        f"nytten mer ned enn et like stort godt utfall trekker den opp. Det risikable alternativet kan tape selv om "
        f"det har høyest forventet sluttverdi.</p>"
        f"<p><b>Steg 1: banken.</b> {tall(W0)} × {dk(1 + rb, 3)}<sup>{T_}</sup> = {kr(Wb)}. Den er sikker, så "
        f"nytten er ln {tall(Wb)} = {u4(Ub)}.</p>"
        f"<p><b>Steg 2: fondet.</b> ln {tall(Wg)} = {u4(Ug)} og ln {tall(Wd)} = {u4(Ud)}. Forventet nytte er "
        f"{dk(p, 1)} × {u4(Ug)} + {dk(1 - p, 1)} × {u4(Ud)} = {u4(Uf)}.</p>"
        f"<p><b>Steg 3: valget.</b> {u4(max(Ub, Uf))} &gt; {u4(min(Ub, Uf))}, så {navn} velger "
        f"<b>{'banken' if vinner == 'bank' else 'fondet'}</b>.</p>"
        f"<p><b>Kontroll:</b> fondets forventede nytte må ligge under nytten av forventet sluttverdi, fordi ln er "
        f"konkav. Forventet sluttverdi er {dk(p, 1)} × {tall(Wg)} + {dk(1 - p, 1)} × {tall(Wd)} = {kr(EW)}. Nytten av "
        f"den er ln {tall(EW)} = {u4(ln(EW))} &gt; {u4(Uf)}. ✓ I kroner tilsvarer fondets nytte et sikkert beløp på "
        f"{kr(exp(Uf))}" + (f", under bankens {kr(Wb)}." if vinner == "bank" else f", over bankens {kr(Wb)}.") + "</p>"
        f"<p><b>Husk:</b> ta ln av hvert utfall først, vekt deretter. Forventet sluttverdi i kroner er svaret for "
        f"en risikonøytral person.</p>"
    )
    return sporsmal(q, alternativer, kort, full)


# ===========================================================================
# prt-ln2 · Subjektive sannsynligheter: terskelen der valget snur
# ===========================================================================
@familie("prt-ln2", tema=T, antall=5, tittel="Subjektiv sannsynlighet: hvor valget snur")
def _(r):
    navn, pron = r.choice(PERSONER)
    W0, T_, rb, Wb, Wg, Wd = _sparevalg(r)
    Ub, Ug, Ud = ln(Wb), ln(Wg), ln(Wd)
    pst_ = (Ub - Ud) / (Ug - Ud)
    if not 0.2 <= pst_ <= 0.8:
        raise Avvis("terskelen utenfor 20–80 %")
    p_rn = (Wb - Wd) / (Wg - Wd)
    p_inn = (ln(W0) - Ud) / (Ug - Ud)
    kand = [F(pst(p_rn, 1), f"Terskelen for en risikonøytral person: ({tall(Wb)} − {tall(Wd)})/({tall(Wg)} − {tall(Wd)}). "
                            f"Med ln-nytte veier det dårlige utfallet tyngre, så det kreves mer.", p_rn),
            F(pst(1 - pst_, 1), f"Ligningen løst for sannsynligheten for dårlige tider: 1 − {dk(pst_, 4)}. Det er "
                                f"sannsynligheten for gode tider som må over terskelen.", 1 - pst_),
            F(pst(p_inn, 1), f"Innskuddet brukt som bankens sluttverdi: (ln {tall(W0)} − ln {tall(Wd)})/(ln {tall(Wg)} − "
                             f"ln {tall(Wd)}). Banken forrenter pengene til {kr(Wb)}.", p_inn)]
    alternativer = plukk(r, R(pst(pst_, 1), pst_), kand)
    q = (_oppsett_spar(navn, pron, W0, T_, rb, Wg, Wd, None, med_p=False)
         + f" Hvor høy må {gen(navn)} subjektive sannsynlighet for gode tider minst være for at {pron} skal "
           f"foretrekke fondet? Rund av til én desimal.</p>")
    kort = (f"<p><b>{pst(pst_, 1)}.</b> Sett p × {u4(Ug)} + (1 − p) × {u4(Ud)} = {u4(Ub)}. Det gir "
            f"p = ({u4(Ub)} − {u4(Ud)})/({u4(Ug)} − {u4(Ud)}) = {pst(pst_, 1)}.</p>")
    p_over = min(0.95, rund(pst_ + 0.05, 2))
    full = (
        f"<p><b>Hva en subjektiv sannsynlighet endrer.</b> En subjektiv sannsynlighet er det {navn} selv tror. Den "
        f"endrer vektene i forventet nytte, aldri sluttverdiene: fondet er fortsatt verdt {kr(Wg)} eller {kr(Wd)}. "
        f"Banken gir fortsatt {kr(Wb)}. Terskelen er sannsynligheten der de to alternativene gir like stor "
        f"forventet nytte.</p>"
        f"<p><b>Steg 1: bankens nytte.</b> {tall(W0)} × {dk(1 + rb, 3)}<sup>{T_}</sup> = {kr(Wb)}. Nytten er "
        f"ln {tall(Wb)} = {u4(Ub)}.</p>"
        f"<p><b>Steg 2: nytten i fondets utfall.</b> ln {tall(Wg)} = {u4(Ug)} og ln {tall(Wd)} = {u4(Ud)}.</p>"
        f"<p><b>Steg 3: indifferensen.</b> p × {u4(Ug)} + (1 − p) × {u4(Ud)} = {u4(Ub)} gir "
        f"p × {u4(Ug - Ud)} = {u4(Ub - Ud)}, altså p = {dk(pst_, 4)}, <b>{pst(pst_, 1)}</b>.</p>"
        f"<p><b>Kontroll:</b> prøv p = {pk(p_over)}: {dk(p_over, 2)} × {u4(Ug)} + {dk(1 - p_over, 2)} × {u4(Ud)} = "
        f"{u4(p_over * Ug + (1 - p_over) * Ud)}, over bankens {u4(Ub)}, så fondet vinner like over terskelen. ✓ "
        f"Den risikonøytrale terskelen er bare {pst(p_rn, 1)}. Avstanden er prisen på risikoen.</p>"
        f"<p><b>Husk:</b> nye sannsynligheter endrer forventet nytte, ikke sluttverdiene. Løs p × ln W<sub>god</sub> "
        f"+ (1 − p) × ln W<sub>dårlig</sub> = ln W<sub>bank</sub>.</p>"
    )
    return sporsmal(q, alternativer, kort, full)


# ===========================================================================
# prt-ln3 · Tapsaversjon i sparevalget
# ===========================================================================
VEKTER = [(1 / 1.03, "1/1,03 = 0,970874"), (0.96, "0,96"), (0.95, "0,95"), (1 / 1.05, "1/1,05 = 0,952381"),
          (0.97, "0,97")]


@familie("prt-ln3", tema=T, antall=5, tittel="Tapsaversjon i sparevalget")
def _(r):
    navn, pron = r.choice(PERSONER)
    W0, T_, rb, Wb, Wg, Wd = _sparevalg(r)
    if not Wd < W0 < Wb < Wg:
        raise Avvis("utfallene ligger ikke riktig rundt referansepunktet")
    v, vtxt = r.choice(VEKTER)
    p = r.choice([0.4, 0.5, 0.6])
    Ub, Ug, Ud = ln(Wb), ln(Wg), ln(Wd)
    Uf0 = p * Ug + (1 - p) * Ud
    Uf = p * Ug + (1 - p) * v * Ud
    if abs(Uf - Ub) < 0.004:
        raise Avvis("for tett")
    kand = [F(_valg_par(Ub, Uf0), f"Tapsaversjonen ikke brukt: {dk(p, 1)} × {u4(Ug)} + {dk(1 - p, 1)} × {u4(Ud)} = "
                                  f"{u3(Uf0)}. Det er valget til en vanlig ln-investor."),
            F(_valg_par(Ub, p * v * Ug + (1 - p) * Ud), f"Vekten lagt på feil utfall: {dk(p, 1)} × {dk(v, 6)} × "
                                                       f"{u4(Ug)} + {dk(1 - p, 1)} × {u4(Ud)}. Det er utfallet under "
                                                       f"referansepunktet, {kr(Wd)}, som skal nedvektes."),
            F(_valg_par(Ub, p * Ug + (1 - p) * Ud / v), f"Vekten delt på i stedet for ganget med: {dk(1 - p, 1)} × "
                                                       f"{u4(Ud)}/{dk(v, 6)}. Da blir tapet bedre, det motsatte av "
                                                       f"tapsaversjon."),
            F(_valg_par(v * Ub, Uf), f"Vekten også lagt på banken: {dk(v, 6)} × {u4(Ub)}. Banken gir {kr(Wb)}, over "
                                     f"referansepunktet {kr(W0)}, så den er ikke et tap.")]
    alternativer = plukk(r, R(_valg_par(Ub, Uf)), kand)
    q = (_oppsett_spar(navn, pron, W0, T_, rb, Wg, Wd, p)
         + f" {navn} er tapsavers. Referansepunktet er innskuddet på {kr(W0)}. Nytten av et utfall under "
           f"referansepunktet ganges med {vtxt}. Utfall over referansepunktet får vekt 1.</p>"
           f"<p>Hvilket alternativ velger {navn}? Oppgi forventet nytte av begge. Nyttetallene er avrundet til "
           f"tre desimaler.</p>")
    hva = "Banken" if Ub > Uf else "Fondet"
    kort = (f"<p><b>{hva}.</b> Bare {kr(Wd)} er et tap: {dk(p, 1)} × {u4(Ug)} + {dk(1 - p, 1)} × {dk(v, 4)} × {u4(Ud)} "
            f"= {u3(Uf)} mot ln {tall(Wb)} = {u3(Ub)} for banken.</p>")
    full = (
        f"<p><b>Hva tapsaversjon er.</b> En tapsavers person måler utfall mot et referansepunkt, her innskuddet. "
        f"Et tap gjør mer vondt enn en like stor gevinst gjør godt. I kursets regnemåte ganges nytten av utfall "
        f"under referansepunktet med en vekt under 1. Utfall over referansepunktet berøres ikke.</p>"
        f"<p><b>Steg 1: hvilke utfall er tap?</b> Banken gir {tall(W0)} × {dk(1 + rb, 3)}<sup>{T_}</sup> = "
        f"{kr(Wb)}, over {kr(W0)}. Fondet gir {kr(Wg)} (over) eller {kr(Wd)} (under). Bare det dårlige utfallet i "
        f"fondet er et tap.</p>"
        f"<p><b>Steg 2: banken.</b> ln {tall(Wb)} = {u4(Ub)}, med vekt 1.</p>"
        f"<p><b>Steg 3: fondet.</b> ln {tall(Wg)} = {u4(Ug)}. ln {tall(Wd)} = {u4(Ud)}, vektet "
        f"{dk(v, 6)} × {u4(Ud)} = {u4(v * Ud)}. Forventet nytte: {dk(p, 1)} × {u4(Ug)} + {dk(1 - p, 1)} × "
        f"{u4(v * Ud)} = {u4(Uf)}.</p>"
        f"<p><b>Steg 4: valget.</b> {u4(max(Ub, Uf))} &gt; {u4(min(Ub, Uf))}: {navn} velger "
        f"<b>{'banken' if Ub > Uf else 'fondet'}</b>.</p>"
        f"<p><b>Kontroll:</b> uten tapsaversjon gir fondet {u4(Uf0)}. Fradraget skal være {dk(1 - p, 1)} × "
        f"(1 − {dk(v, 4)}) × {u4(Ud)} = {u4(Uf0 - Uf)}. Da er {u4(Uf0)} − {u4(Uf0 - Uf)} = {u4(Uf)}. ✓ Vekten kan bare "
        f"trekke fondet ned, så den kan bare flytte valget mot banken.</p>"
        f"<p><b>Husk:</b> finn referansepunktet og merk hvilke utfall som er tap. Bare de ganges med vekten.</p>"
    )
    return sporsmal(q, alternativer, kort, full)


# ===========================================================================
# prt-tid1 · Tidsverdi: CAGR, sluttverdi av årlig sparing og gebyrets pris (R16)
# ===========================================================================
@familie("prt-tid1", tema=T, antall=6, tittel="CAGR, sluttverdi av sparing og gebyr")
def _(r):
    navn, pron = r.choice(PERSONER)
    modus = modus_for("prt-tid1", r, ["cagr", "fv", "gebyr"])
    if modus == "cagr":
        W0 = r.choice([200_000, 300_000, 400_000, 500_000, 750_000])
        T_ = r.choice([8, 10, 12, 15, 20, 25])
        rr = r.choice([0.02, 0.025, 0.03, 0.035, 0.04, 0.045, 0.05, 0.06])
        WT = round(W0 * (1 + rr) ** T_)
        cagr = (WT / W0) ** (1 / T_) - 1
        kand = [F(pst((WT / W0 - 1) / T_, 1), f"Enkel rente: samlet avkastning delt på antall år, ({tall(WT)}/{tall(W0)} − 1)/{T_}. "
                                               f"Avkastningen forrentes selv, så den årlige raten er lavere.",
                  (WT / W0 - 1) / T_),
                F(pst((WT / W0) ** (1 / (T_ - 1)) - 1, 1), f"Feil antall år: roten tatt med {T_ - 1} i stedet for {T_}.",
                  (WT / W0) ** (1 / (T_ - 1)) - 1),
                F(pst(WT / W0 - 1, 1), f"Samlet avkastning over hele perioden, {tall(WT)}/{tall(W0)} − 1, ikke årlig.",
                  WT / W0 - 1)]
        riktig = R(pst(cagr, 1), cagr)
        q = (f"<p>{navn} satte inn {kr(W0)} på en høyrentekonto for {T_} år siden. Rentene er lagt til kontoen hvert år. "
             f"I dag står det {kr(WT)} der. {stor(pron)} har verken satt inn eller tatt ut noe underveis.</p>"
             f"<p>Hva har den gjennomsnittlige årlige avkastningen vært? Rund av til én desimal.</p>")
        kort = (f"<p><b>{pst(cagr, 1)}.</b> ({tall(WT)}/{tall(W0)})<sup>1/{T_}</sup> − 1 = "
                f"{dk(WT / W0, 4)}<sup>1/{T_}</sup> − 1 = {pst(cagr, 2)}.</p>")
        steg = (f"<p><b>Hva CAGR er.</b> Den årlige veksttakten (CAGR) er den faste renten som får {kr(W0)} til å vokse "
                f"til {kr(WT)} på {T_} år med renters rente: W<sub>T</sub> = W<sub>0</sub>(1 + r)<sup>T</sup>. Løst for "
                f"r gir det r = (W<sub>T</sub>/W<sub>0</sub>)<sup>1/T</sup> − 1.</p>"
                f"<p><b>Steg 1: vekstfaktoren.</b> {tall(WT)}/{tall(W0)} = {dk(WT / W0, 4)}.</p>"
                f"<p><b>Steg 2: den årlige faktoren.</b> {dk(WT / W0, 4)}<sup>1/{T_}</sup> = {dk(1 + cagr, 5)}.</p>"
                f"<p><b>Steg 3: renten.</b> {dk(1 + cagr, 5)} − 1 = {dk(cagr, 5)}, altså <b>{pst(cagr, 1)}</b>.</p>"
                f"<p><b>Kontroll:</b> {tall(W0)} × {dk(1 + rr, 4)}<sup>{T_}</sup> = {kr(W0 * (1 + rr) ** T_)}, som er "
                f"beløpet på kontoen. ✓ Det enkle snittet {pst((WT / W0 - 1) / T_, 1)} er høyere fordi det ignorerer at "
                f"rentene selv forrentes.</p>")
        husk = "årlig avkastning er (sluttverdi/startverdi)<sup>1/T</sup> − 1, med T lik antall år."
    elif modus == "fv":
        a = r.choice([20_000, 24_000, 30_000, 36_000, 40_000, 50_000, 60_000])
        rr = r.choice([0.03, 0.04, 0.05, 0.06, 0.07])
        T_ = r.choice([10, 15, 20, 25, 30])
        fak = ((1 + rr) ** T_ - 1) / rr
        fv = a * fak
        nv = a * (1 - (1 + rr) ** -T_) / rr
        kand = [F(kr(a * T_), f"Bare innskuddene summert: {tall(a)} × {T_}. Rentene er glemt.", a * T_),
                F(kr(a * T_ * (1 + rr) ** T_), f"Alt forrentet i {T_} år, som om {tall(a * T_)} var satt inn på dag én. "
                                               f"Hvert innskudd forrentes bare fra det settes inn.", a * T_ * (1 + rr) ** T_),
                F(kr(nv), f"Nåverdifaktoren [1 − (1 + r)<sup>−T</sup>]/r brukt i stedet for sluttverdifaktoren. Det gir "
                          f"hva sparingen er verdt i dag, ikke om {T_} år.", nv),
                F(kr(a * (1 + rr) ** T_), f"Bare ett innskudd forrentet: {tall(a)} × {dk(1 + rr, 2)}<sup>{T_}</sup>.",
                  a * (1 + rr) ** T_)]
        riktig = R(kr(fv), fv)
        q = (f"<p>{navn} setter inn {kr(a)} i et indeksfond ved utgangen av hvert år i {T_} år. Fondet gir {pk(rr)} i "
             f"årlig avkastning. Se bort fra skatt.</p><p>Hvor mye står det i fondet rett etter det siste innskuddet? "
             f"Rund av til hele kroner.</p>")
        kort = (f"<p><b>{kr(fv)}.</b> Sluttverdifaktoren er ({dk(1 + rr, 2)}<sup>{T_}</sup> − 1)/{dk(rr)} = {dk(fak, 4)}. "
                f"{tall(a)} × {dk(fak, 4)} = {kr(fv)}.</p>")
        steg = (f"<p><b>Hva formelen gjør.</b> Hvert innskudd forrentes fra det settes inn til slutt: det første i "
                f"{T_ - 1} år, det siste i null år. Summen er S = a × [(1 + r)<sup>T</sup> − 1]/r.</p>"
                f"<p><b>Steg 1: vekstfaktoren.</b> {dk(1 + rr, 2)}<sup>{T_}</sup> = {dk((1 + rr) ** T_, 6)}.</p>"
                f"<p><b>Steg 2: sluttverdifaktoren.</b> ({dk((1 + rr) ** T_, 6)} − 1)/{dk(rr)} = {dk(fak, 4)}.</p>"
                f"<p><b>Steg 3: sluttverdien.</b> {tall(a)} × {dk(fak, 4)} = <b>{kr(fv)}</b>. {navn} har satt inn "
                f"{kr(a * T_)}. Resten, {kr(fv - a * T_)}, er avkastning.</p>"
                f"<p><b>Kontroll:</b> regn via nåverdien. Nåverdien av innskuddene er {tall(a)} × "
                f"[1 − {dk(1 + rr, 2)}<sup>−{T_}</sup>]/{dk(rr)} = {kr(nv)}. Forrentet i {T_} år: {tall(nv)} × "
                f"{dk((1 + rr) ** T_, 6)} = {kr(nv * (1 + rr) ** T_)}. ✓</p>")
        husk = "sluttverdien av årlig sparing er a × [(1 + r)<sup>T</sup> − 1]/r. Nåverdifaktoren har (1 + r)<sup>−T</sup> og gir dagens verdi."
    else:
        W0 = r.choice([100_000, 200_000, 250_000, 500_000])
        T_ = r.choice([15, 20, 25, 30])
        rr = r.choice([0.06, 0.07, 0.08])
        g = r.choice([0.005, 0.01, 0.015])
        lav = 1 - ((1 + rr - g) / (1 + rr)) ** T_
        kand = [F(pst(g * T_, 1), f"Gebyret lagt sammen uten renters rente: {T_} × {ppo(g)}.", g * T_),
                F(pst(((1 + rr) / (1 + rr - g)) ** T_ - 1, 1), f"Feil nevner: indeksfondets sluttverdi delt på det aktive "
                                                             f"fondets. Det sier hvor mye høyere indeksfondet er, ikke hvor "
                                                             f"mye lavere det aktive er.",
                  ((1 + rr) / (1 + rr - g)) ** T_ - 1),
                F(pst(g / rr, 1), f"Gebyret delt på avkastningen: {ppo(g)}/{pk(rr)}. Det er andelen av ett års avkastning "
                                  f"som går bort, ikke effekten på sluttverdien.", g / rr)]
        riktig = R(pst(lav, 1), lav)
        S_i, S_a = round(W0 * (1 + rr) ** T_), round(W0 * (1 + rr - g) ** T_)
        q = (f"<p>{navn} skal plassere {kr(W0)} i {T_} år. Et indeksfond gir {pk(rr)} i årlig avkastning etter kostnader. "
             f"Et aktivt fond gir samme avkastning før kostnader, men tar {ppo(g)} mer i årlig gebyr, så det gir "
             f"{pk(rr - g)}.</p><p>Hvor mange prosent lavere blir sluttverdien i det aktive fondet enn i indeksfondet? "
             f"Rund av til én desimal.</p>")
        kort = (f"<p><b>{pst(lav, 1)}.</b> 1 − ({dk(1 + rr - g, 3)}/{dk(1 + rr, 2)})<sup>{T_}</sup> = {pst(lav, 1)}: "
                f"{kr(S_a)} mot {kr(S_i)}.</p>")
        steg = (f"<p><b>Hvorfor gebyret koster mer enn det ser ut.</b> Gebyret trekkes hvert år. Det du betaler i "
                f"gebyr, får aldri forrente seg. Effekten vokser derfor med renters rente.</p>"
                f"<p><b>Steg 1: indeksfondet.</b> {tall(W0)} × {dk(1 + rr, 2)}<sup>{T_}</sup> = {kr(S_i)}.</p>"
                f"<p><b>Steg 2: det aktive fondet.</b> {tall(W0)} × {dk(1 + rr - g, 3)}<sup>{T_}</sup> = {kr(S_a)}.</p>"
                f"<p><b>Steg 3: forskjellen.</b> 1 − {tall(S_a)}/{tall(S_i)} = <b>{pst(lav, 1)}</b>. I kroner er det "
                f"{kr(S_i - S_a)}.</p>"
                f"<p><b>Kontroll:</b> forholdet kan regnes uten beløpet: ({dk(1 + rr - g, 3)}/{dk(1 + rr, 2)})"
                f"<sup>{T_}</sup> = {dk((1 + rr - g) ** T_ / (1 + rr) ** T_, 4)}. Da er 1 − "
                f"{dk((1 + rr - g) ** T_ / (1 + rr) ** T_, 4)} = {pst(lav, 1)}. ✓ Startbeløpet påvirker kronene, ikke "
                f"prosenten.</p>")
        husk = "et gebyr på ett prosentpoeng i året gir rundt 17 % lavere sluttverdi over 20 år med 7 % avkastning. Kostnaden er det du kan kontrollere."
    alternativer = plukk(r, riktig, kand)
    full = steg + f"<p><b>Husk:</b> {husk}</p>"
    brukt("prt-tid1", modus)
    return sporsmal(q, alternativer, kort, full)


# ===========================================================================
# STATISKE SPØRSMÅL
# ===========================================================================
statisk(
    "prt-s01", tema=T, type="paastand",
    q="<p>Hvilken av disse påstandene om brede indeksfond er <b>gal</b>?</p>",
    alternativer=[
        R("Et indeksfond gir normalt høyere avkastning enn det verdivektede snittet av aksjene det eier"),
        F("Et indeksfond har lavere risiko enn en typisk enkeltaksje fordi selskapsspesifikk risiko forsvinner",
          "Riktig påstand. Diversifisering fjerner det meste av den selskapsspesifikke risikoen."),
        F("Et indeksfond har som regel lavere årlige kostnader enn et aktivt forvaltet fond i samme marked",
          "Riktig påstand. Indeksfond tar typisk 0,1–0,3 % i året, aktive fond 1–2 %."),
        F("Et indeksfond beskytter deg mot å handle mot investorer som vet mer enn deg om enkeltselskaper",
          "Riktig påstand. Kjøper du hele markedet, velger du ikke aksjer. Da kan ingen med bedre informasjon "
          "utnytte valgene dine."),
    ],
    kort="<p><b>Påstanden om høyere avkastning enn snittet er gal.</b> Indeksfondet eier aksjene i markedsverdivekter "
         "og gir per definisjon det verdivektede snittet, minus gebyret.</p>",
    full="<p><b>Hva et indeksfond er.</b> Et indeksfond eier alle aksjene i en indeks, i samme vekter som indeksen. Har "
         "et selskap 3 % av markedsverdien, har fondet 3 % av pengene der. Fondet gjør ingen valg utover å følge "
         "indeksen.</p>"
         "<p><b>Steg 1: hva fondet gir.</b> Når fondet eier nøyaktig det verdivektede markedet, blir avkastningen før "
         "kostnader nøyaktig det verdivektede snittet av aksjene. Etter kostnader blir den litt lavere. Det kan ikke "
         "bli høyere. Det er ren aritmetikk, ikke et empirisk funn.</p>"
         "<p><b>Steg 2: de tre andre påstandene.</b> Risikoen er lavere enn i en enkeltaksje, fordi selskapsspesifikke "
         "sjokk jevner seg ut over hundrevis av selskaper. Kostnadene er lave fordi fondet ikke trenger analytikere. "
         "Og du kan ikke bli utnyttet av bedre informerte motparter når du ikke velger aksjer.</p>"
         "<p><b>Kontroll:</b> tenk deg at alle investorer eide indeksfondet. Da ville summen av alles avkastning vært "
         "markedets avkastning. Ingen kan få mer enn markedet uten at noen andre får mindre.</p>"
         "<p><b>Husk:</b> et indeksfond gir markedet minus gebyret. Alt som lover mer enn markedet, er galt per "
         "konstruksjon.</p>",
)

statisk(
    "prt-s02", tema=T, type="fakta",
    q="<p>Du vurderer et globalt indeksfond for utviklede markeder, av typen norske banker og nettmeglere selger. "
      "Hvilken beskrivelse passer best på hva fondet eier?</p>",
    alternativer=[
        R("Omtrent 70 % amerikanske aksjer og lite eller ingen eksponering mot Kina"),
        F("Omtrent like store andeler i USA, Europa og Asia, rundt en tredel hver",
          "Fondet er vektet etter markedsverdi. USA utgjør omtrent 70 % av verdien i utviklede markeder."),
        F("Omtrent 40 % amerikanske aksjer og rundt 20 % kinesiske aksjer",
          "Begge tallene er feil. USA er omtrent 70 %. Kina regnes som et fremvoksende marked og er ikke med i en "
          "indeks for utviklede markeder."),
        F("Omtrent 10 % norske aksjer, siden fondet selges i kroner til norske sparere",
          "Valutaen fondet selges i, endrer ikke indeksen. Norge er rundt 0,2 % av verdens aksjemarked."),
    ],
    kort="<p><b>Omtrent 70 % USA og lite eller ingen Kina.</b> Fondet følger en indeks for utviklede markeder i "
         "markedsverdivekter. USA dominerer. Kina er ikke med.</p>",
    full="<p><b>Hvordan vektene bestemmes.</b> Et globalt indeksfond følger typisk en indeks over utviklede markeder, "
         "vektet etter markedsverdi. Et land får like stor andel som børsverdien av selskapene der utgjør av "
         "totalen.</p>"
         "<p><b>Steg 1: USA.</b> Amerikanske selskaper utgjør omtrent 70 % av børsverdien i utviklede markeder. Et "
         "«globalt» fond er derfor i praksis en stor amerikansk posisjon med mye dollareksponering.</p>"
         "<p><b>Steg 2: Kina.</b> Kina regnes som et fremvoksende marked. Det er ikke med i indekser for utviklede "
         "markeder, så fondet har lite eller ingen Kina. Vil du ha Kina, må du kjøpe et fond for fremvoksende "
         "markeder i tillegg.</p>"
         "<p><b>Steg 3: Norge.</b> Norge er rundt 0,2 % av verdens aksjemarked. At fondet selges i kroner, endrer ikke "
         "hva det eier.</p>"
         "<p><b>Hvorfor det betyr noe.</b> Den store dollarandelen er grunnen til at valutaspørsmålet er viktig for et "
         "slikt fond. Den sier også at «globalt» ikke betyr «likt fordelt».</p>"
         "<p><b>Husk:</b> globalt indeksfond for utviklede markeder: omtrent 70 % USA, lite eller ingen Kina.</p>",
)

statisk(
    "prt-s03", tema=T, type="begrep",
    q="<p>Ola jobber i oljeservice. Når oljeprisen er høy, er kronen sterk og lønnen hans høy. Når oljeprisen faller, "
      "svekkes kronen samtidig som bonusen forsvinner. Ola sparer i et globalt indeksfond i utenlandsk valuta. Fondet "
      "finnes med og uten valutasikring. Sikringen fjerner valutasvingningene, så han bare får aksjeavkastningen.</p>"
      "<p>Ola er risikoavers og bryr seg om summen av lønn og fondsverdi. Hva bør han velge?</p>",
    alternativer=[
        R("Uten valutasikring: fondet er verdt mest i kroner når kronen er svak og lønnen lav"),
        F("Med valutasikring: et fond med lavere standardavvik gir alltid lavere samlet risiko",
          "Fondets eget standardavvik faller, men den negative samvariasjonen med lønnen forsvinner. Samlet inntekt "
          "blir mer usikker."),
        F("Med valutasikring, men bare hvis han er svært risikoavers",
          "Fortegnet er snudd. Jo mer risikoavers Ola er, jo mer verdt er den naturlige sikringen i det usikrede "
          "fondet."),
        F("Det spiller ingen rolle, fordi valutasikring gir samme utbetaling uansett",
          "Valutasikring fjerner valutasvingningen, ikke aksjerisikoen. Utbetalingen er langt fra sikker."),
    ],
    kort="<p><b>Uten valutasikring.</b> Svak krone gir høy fondsverdi i kroner nettopp når lønnen er lav. Det usikrede "
         "fondet jevner ut summen.</p>",
    full="<p><b>Prinsippet.</b> Kurset vurderer et aktivum etter hvordan det samvarierer med resten av formuen din, "
         "humankapitalen inkludert. Fondets eget standardavvik er ikke det som teller. Det som teller, er hvor mye "
         "summen av lønn og fondsverdi svinger.</p>"
         "<p><b>Steg 1: lønnen.</b> Høy oljepris gir sterk krone og høy lønn. Lav oljepris gir svak krone og lav "
         "lønn.</p>"
         "<p><b>Steg 2: det usikrede fondet.</b> Fondet eier utenlandske aksjer. Når kronen svekkes, er hver dollar "
         "verdt flere kroner. Fondet er altså verdt mest i kroner når kronen er svak, nettopp når Olas lønn er "
         "lav.</p>"
         "<p><b>Steg 3: summen.</b> Lønn og fondsverdi trekker i hver sin retning når kronen beveger seg. Det jevner "
         "ut summen. Valutasikring fjerner denne motvekten. Da svinger lønnen alene. Summen blir mer usikker.</p>"
         "<p><b>Kontroll:</b> snu forutsetningen. Hadde lønnen vært høy når kronen var svak, ville det usikrede fondet "
         "forsterket svingningene. Da ville sikring redusert risikoen. Svaret avhenger altså av samvariasjonen, ikke av "
         "fondet alene.</p>"
         "<p><b>Husk:</b> er lønnen høy når kronen er sterk, skal du ikke valutasikre. Det usikrede fondet betaler mest "
         "når du trenger det mest.</p>",
)

statisk(
    "prt-s04", tema=T, type="begrep",
    q="<p>Kari jobber i en eksportbedrift. Når kronen er svak, går salget godt og lønnen hennes er høy. Når kronen er "
      "sterk, faller bonusen. Hun sparer i et globalt indeksfond i utenlandsk valuta. Hun er risikoavers og bryr seg om "
      "summen av lønn og fondsverdi.</p><p>Hva tilsier kursets prinsipp om samvariasjon med resten av formuen?</p>",
    alternativer=[
        R("Valutasikre: uten sikring stiger fondet i kroner nettopp når lønnen alt er høy"),
        F("Ikke valutasikre: et globalt fond i utenlandsk valuta er alltid en naturlig sikring av lønnen",
          "Det er en sikring bare når fondet og lønnen samvarierer negativt. Her er lønnen høy når kronen er svak, "
          "akkurat når det usikrede fondet er verdt mest."),
        F("Ikke valutasikre: valutasikring fjerner aksjeavkastningen og gir bare risikofri rente",
          "Valutasikring fjerner valutasvingningen. Aksjeavkastningen beholder du."),
        F("Det spiller ingen rolle, fordi valutakursen svinger rundt et stabilt snitt over tid",
          "Spørsmålet gjelder samvariasjonen med lønnen, ikke om kronen er billig eller dyr på lang sikt."),
    ],
    kort="<p><b>Valutasikre.</b> Svak krone gir både høy lønn og høy fondsverdi i kroner. Uten sikring forsterker "
         "fondet svingningene i summen.</p>",
    full="<p><b>Prinsippet.</b> Et aktivum skal vurderes etter hvordan det samvarierer med resten av formuen din, "
         "humankapitalen inkludert. En plassering som betaler mest når du alt har det godt, øker den samlede "
         "risikoen. En plassering som betaler mest når du har det dårlig, demper den.</p>"
         "<p><b>Steg 1: lønnen.</b> Svak krone gir godt salg og høy lønn. Sterk krone gir lav bonus.</p>"
         "<p><b>Steg 2: det usikrede fondet.</b> Fondet eier utenlandske aksjer. Svak krone gjør dem verdt flere "
         "kroner. Fondet er altså verdt mest i kroner når lønnen alt er høy.</p>"
         "<p><b>Steg 3: summen.</b> Lønn og fondsverdi trekker i samme retning når kronen beveger seg. Det forsterker "
         "svingningene i summen. Valutasikring fjerner valutadelen av fondets svingninger og dermed den positive "
         "samvariasjonen med lønnen.</p>"
         "<p><b>Kontroll:</b> sammenlign med en arbeidstaker som tjener mest når kronen er sterk. For henne betaler det "
         "usikrede fondet mest når lønnen er lav. Da skal hun ikke sikre. Samme prinsipp, motsatt svar, fordi "
         "samvariasjonen har motsatt fortegn.</p>"
         "<p><b>Husk:</b> spør hvordan valutaeffekten i fondet samvarierer med lønnen. Positiv samvariasjon: sikre. "
         "Negativ samvariasjon: ikke sikre.</p>",
)

statisk(
    "prt-s05", tema=T, type="fakta",
    q="<p>Forbrukerrådet sammenlignet aktive fond fra norske forvaltere med indeksfond over tjue år fram til 2018, i "
      "fire kategorier: globale, europeiske, nordiske og norske aksjer. Hva fant de?</p>",
    alternativer=[
        R("Aktive fond var svakere enn indeks i tre kategorier, men bedre på norske aksjer"),
        F("Aktive fond var svakere enn indeks i alle fire kategoriene, også på norske aksjer",
          "Nær sannheten, men unntaket mangler. På norske aksjer slo de aktive fondene indeks med 0,86 prosentpoeng i "
          "året."),
        F("Aktive fond var bedre enn indeks på globale aksjer, men svakere på norske aksjer",
          "Speilvendt. De aktive tapte 0,89 prosentpoeng i året på globale aksjer og vant på norske."),
        F("Aktive fond og indeksfond ga omtrent samme avkastning etter kostnader i alle fire",
          "Forskjellene var store: fra −3,48 prosentpoeng i året på nordiske aksjer til +0,86 på norske."),
    ],
    kort="<p><b>Svakere i tre kategorier, bedre på norske aksjer.</b> Årlig differanse mot indeks: −0,89 globalt, "
         "−1,08 europeisk, −3,48 nordisk og +0,86 norsk.</p>",
    full="<p><b>Hva undersøkelsen målte.</b> Forbrukerrådet sammenlignet avkastningen etter kostnader for aktive fond fra "
         "norske forvaltere med tilsvarende indeksfond over tjue år fram til 2018. Funnet var fasit i H2025 oppgave "
         "16.</p>"
         "<p><b>Steg 1: tallene.</b> Årlig differanse mellom aktive fond og indeks, i prosentpoeng: globale aksjer "
         "−0,89, europeiske −1,08, nordiske −3,48 og norske +0,86.</p>"
         "<p><b>Steg 2: mønsteret.</b> De aktive tapte i tre av fire kategorier. Unntaket var hjemmemarkedet, der en "
         "norsk forvalter i det minste kan ha en informasjonsfordel i et lite og mindre analysert marked.</p>"
         "<p><b>Steg 3: forklaringen.</b> Kostnadene forklarer mye. Et aktivt fond tar typisk ett prosentpoeng mer i året "
         "enn et indeksfond. Det må tjenes inn før kunden går i null.</p>"
         "<p><b>Kontroll:</b> det farligste gale alternativet er «svakere i alle kategorier». Det er nærmest sannheten og "
         "derfor dyrest med minuspoeng. Sjekk alltid om alternativet har med unntaket.</p>"
         "<p><b>Husk:</b> aktive fond svakere enn indeks på globale, europeiske og nordiske aksjer, men bedre på norske.</p>",
)

statisk(
    "prt-s06", tema=T, type="begrep",
    q="<p>Petter har hele sparebeløpet i et globalt indeksfond, som vi kan behandle som markedsporteføljen. Han vil ha "
      "høyere forventet avkastning og godtar mer risiko. Han kan låne til risikofri rente. Hva sier teorien om optimale "
      "porteføljer at han bør gjøre?</p>",
    alternativer=[
        R("Låne til risikofri rente og kjøpe mer av indeksfondet"),
        F("Bytte til de mest volatile aksjene på børsen",
          "Mer total risiko, men den ekstra risikoen er selskapsspesifikk og prises ikke. Porteføljen havner under "
          "kapitalmarkedslinjen."),
        F("Samle alt i ett lovende vekstselskap",
          "Samme feil i ytterste form: helt udiversifisert, med risiko markedet ikke betaler for."),
        F("Bli der han er, fordi mer risiko enn markedet aldri gir mer forventet avkastning",
          "Langs kapitalmarkedslinjen gir mer risiko mer forventet avkastning, så lenge du tar risikoen ved å gire "
          "markedsporteføljen."),
    ],
    kort="<p><b>Låne og kjøpe mer av indeksfondet.</b> Det flytter ham oppover kapitalmarkedslinjen med samme "
         "Sharpe-forhold.</p>",
    full="<p><b>Kapitalmarkedslinjen.</b> Med en risikofri rente r<sub>f</sub> og markedsporteføljen M ligger de beste "
         "porteføljene på en rett linje: E(r<sub>p</sub>) = r<sub>f</sub> + [(E(r<sub>M</sub>) − r<sub>f</sub>)/"
         "σ<sub>M</sub>] × σ<sub>p</sub>. Stigningstallet er markedets Sharpe-forhold, det høyeste som kan oppnås.</p>"
         "<p><b>Steg 1: til høyre for M.</b> Vil Petter ha mer risiko enn M, må han plassere mer enn 100 % av "
         "egenkapitalen i M. Det gjør han ved å låne til r<sub>f</sub>.</p>"
         "<p><b>Steg 2: et regneeksempel.</b> Med r<sub>f</sub> = 3 %, E(r<sub>M</sub>) = 8 % og σ<sub>M</sub> = 15 % "
         "gir 150 % i M forventet avkastning 1,5 × 8 % − 0,5 × 3 % = 10,5 % og standardavvik 22,5 %. "
         "Sharpe-forholdet er fortsatt (10,5 − 3)/22,5 = 0,333.</p>"
         "<p><b>Steg 3: hvorfor ikke volatile aksjer.</b> En volatil enkeltaksje har mye selskapsspesifikk risiko. Den "
         "kan diversifiseres bort gratis, så markedet betaler ikke for den. Porteføljen får mer risiko uten tilsvarende "
         "mer forventet avkastning og havner under linjen.</p>"
         "<p><b>Husk:</b> mer avkastning: gir markedsporteføljen. Mindre risiko: bland inn bank. Plukk aldri aksjer for "
         "å få mer risiko.</p>",
)

statisk(
    "prt-s07", tema=T, type="begrep",
    q="<p>En enkeltaksje har standardavvik 45 %, mens et globalt indeksfond har 15 %. Ifølge kurset gir enkeltaksjen "
      "likevel ikke høyere forventet avkastning på grunn av den ekstra risikoen. Hvorfor?</p>",
    alternativer=[
        R("Det meste av risikoen kan fjernes gratis ved å spre, så den gir ingen premie"),
        F("Markedet betaler for all risiko, men skatten tar meravkastningen på enkeltaksjer",
          "Skattereglene er de samme uansett hvilken aksje du eier. Markedet betaler bare for den systematiske "
          "risikoen."),
        F("Enkeltaksjer med høy risiko gir høyere avkastning, men bare over lange horisonter",
          "Tiden endrer ikke hvilken risiko som prises. Den usystematiske delen gir ingen premie på noen horisont."),
        F("Enkeltaksjer er alltid overpriset fordi småsparere kjøper dem i flokk",
          "Flokkatferd finnes, men det er ikke kursets forklaring. Risiko som kan fjernes gratis, gir ingen premie."),
    ],
    kort="<p><b>Usystematisk risiko prises ikke.</b> Den kan diversifiseres bort gratis. Bare samvariasjonen med markedet "
         "gir premie.</p>",
    full="<p><b>To slags risiko.</b> En aksjes svingninger har to deler. Den systematiske delen følger "
         "markedet. Den usystematiske delen gjelder bare selskapet. Den usystematiske delen forsvinner nesten helt i en bred "
         "portefølje, fordi sjokkene i ulike selskaper jevner seg ut.</p>"
         "<p><b>Steg 1: hvorfor ingen betaler.</b> Når alle kan bli kvitt den usystematiske risikoen gratis ved å "
         "spre, kan ingen kreve betaling for å bære den. Konkurranse om aksjene presser prisen opp til den forventede "
         "avkastningen bare dekker den systematiske risikoen.</p>"
         "<p><b>Steg 2: hva det betyr for enkeltaksjen.</b> Av de 45 prosentene er mye usystematisk. Forventet "
         "avkastning bestemmes av betaen mot markedet, ikke av det totale standardavviket. Aksjen gir derfor dårlig "
         "betalt per enhet total risiko og havner under kapitalmarkedslinjen.</p>"
         "<p><b>Kontroll:</b> CAPM sier avkastningskrav = r<sub>f</sub> + β(r<sub>M</sub> − r<sub>f</sub>). Bare β "
         "står i formelen. To aksjer med samme β har samme forventede avkastning, uansett hvor mye de svinger "
         "hver for seg.</p>"
         "<p><b>Husk:</b> markedet betaler for risiko du ikke kan diversifisere bort, ikke for total risiko.</p>",
)

statisk(
    "prt-s08", tema=T, type="begrep",
    q="<p>Anne har risikoaversjon γ = 2 og Bjørn γ = 6. Begge kan spare og låne til risikofri rente og følger teorien om "
      "optimale porteføljer. Hva er riktig om porteføljene deres?</p>",
    alternativer=[
        R("Samme risikable portefølje, men Bjørn har en større del i bank"),
        F("Anne holder mer risikable enkeltaksjer, Bjørn mer stabile utbytteaksjer",
          "Separasjonsteoremet: den risikable delen er den samme for alle, nemlig markedsporteføljen. Risikoviljen "
          "styrer bare blandingen med bank eller lån."),
        F("Samme risikable portefølje, men Anne har en større del i bank",
          "Feil retning. Høyere γ betyr mer risikoaversjon. Det er Bjørn som skal ha mest i bank."),
        F("Helt like porteføljer, siden markedet bare betaler for systematisk risiko",
          "Den risikable delen er lik, men blandingen med bank følger γ. Med γ = 6 mot 2 har Bjørn en tredel så stor "
          "aksjeandel som Anne."),
    ],
    kort="<p><b>Samme risikable portefølje, mer bank for Bjørn.</b> Alle holder markedsporteføljen. γ styrer bare hvor "
         "mye som blandes med bank. w* er omvendt proporsjonal med γ.</p>",
    full="<p><b>Separasjonsteoremet.</b> Når det finnes en risikofri rente, deles porteføljevalget i to uavhengige "
         "beslutninger. Først: hvilken risikabel portefølje? Svaret er markedsporteføljen, den samme for alle. Deretter: "
         "hvor mye av formuen skal i den? Det avhenger av risikoaversjonen.</p>"
         "<p><b>Steg 1: den risikable delen.</b> Kapitalmarkedslinjen fra r<sub>f</sub> gjennom M er den bratteste "
         "linjen som finnes. Alle, uansett γ, vil ligge på den. Anne og Bjørn eier derfor samme aksjer i samme "
         "forhold.</p>"
         "<p><b>Steg 2: blandingen.</b> Mertons formel w* = (μ − r<sub>f</sub>)/(γσ<sup>2</sup>) har γ i nevneren. "
         "Med γ = 6 mot 2 blir Bjørns w* en tredel av Annes. Er Annes w* 75 %, er Bjørns 25 %. Resten står i "
         "bank.</p>"
         "<p><b>Kontroll:</b> forholdet mellom aksjene innenfor den risikable delen er likt. Har M 70 % USA, har både "
         "Anne og Bjørn 70 % USA i aksjedelen. Bare størrelsen på aksjedelen skiller dem.</p>"
         "<p><b>Husk:</b> samme risikable portefølje for alle. Risikoaversjonen bestemmer bare hvor mye bank eller lån "
         "som blandes inn.</p>",
)

statisk(
    "prt-s09", tema=T, type="formel",
    q="<p>μ er forventet avkastning på aksjemarkedet, r<sub>f</sub> risikofri rente, σ markedets standardavvik og γ "
      "risikoaversjonen. Hvilket uttrykk er Mertons optimale aksjeandel w* av <b>totalformuen</b>?</p>",
    alternativer=[
        R("w* = (μ − r<sub>f</sub>)/(γσ<sup>2</sup>)"),
        F("w* = (μ − r<sub>f</sub>)/(γσ)", "Standardavviket i nevneren i stedet for variansen. Den dyreste "
                                           "enkeltfeilen i finansdelen."),
        F("w* = γ(μ − r<sub>f</sub>)/σ<sup>2</sup>", "γ i telleren. Da ville mer risikoaversjon gitt mer aksjer, som "
                                                       "er feil retning."),
        F("w* = (μ − r<sub>f</sub>)/(γσ<sup>2</sup>) × (F + H)/F",
          "Dette er andelen av finansformuen når humankapitalen H er risikofri. Spørsmålet gjelder w* av "
          "totalformuen."),
    ],
    kort="<p><b>w* = (μ − r<sub>f</sub>)/(γσ<sup>2</sup>).</b> Premien i telleren, risikoaversjon ganger varians i "
         "nevneren.</p>",
    full="<p><b>Hva formelen sier.</b> Mertons formel gir hvor stor andel av totalformuen, finansformue pluss "
         "humankapital, som bør stå i aksjer. Telleren er risikopremien: det aksjer forventes å gi utover risikofri "
         "rente. Nevneren er risikoaversjonen ganget med variansen.</p>"
         "<p><b>Steg 1: sjekk retningene.</b> Mer premie skal gi mer aksjer: premien må stå i telleren. Mer risiko og "
         "mer risikoaversjon skal gi mindre: begge må stå i nevneren.</p>"
         "<p><b>Steg 2: varians, ikke standardavvik.</b> Formelen har σ<sup>2</sup>. Med premie 4 %, σ = 20 % og γ = 3 "
         "er w* = 0,04/(3 × 0,04) = 33,3 %. Med σ i stedet for σ<sup>2</sup> blir det 0,04/(3 × 0,20) = 6,7 %.</p>"
         "<p><b>Steg 3: totalformue, ikke finansformue.</b> Ganger du med (F + H)/F, får du andelen av finansformuen "
         "når humankapitalen er risikofri. Det er et neste steg, ikke w* selv.</p>"
         "<p><b>Kontroll med tall:</b> premie 0,04, σ = 0,20 og γ = 2 gir 0,04/(2 × 0,04) = 50 %. Med γ i telleren "
         "blir det 2 × 0,04/0,04 = 200 %: mer aksjer jo mer risikoavers du er. Det kan ikke stemme.</p>"
         "<p><b>Husk:</b> w* = (μ − r<sub>f</sub>)/(γσ<sup>2</sup>) av totalformuen. Tidshorisonten står ikke i "
         "formelen.</p>",
)

statisk(
    "prt-s10", tema=T, type="begrep",
    q="<p>Alt annet likt: hvilken av disse endringene gir høyere optimal aksjeandel w* etter Mertons formel?</p>",
    alternativer=[
        R("Markedets standardavvik faller fra 20 % til 16 %"),
        F("Spareperioden øker fra 10 til 30 år",
          "Tidshorisonten står ikke i formelen. w* er den samme for ett år og for tretti."),
        F("Risikoaversjonen øker fra γ = 2 til γ = 3", "γ står i nevneren. Høyere γ gir lavere w*."),
        F("Risikofri rente øker fra 2 % til 3 % med samme forventede aksjeavkastning",
          "Da faller risikopremien μ − r<sub>f</sub> med ett prosentpoeng, så w* faller."),
    ],
    kort="<p><b>Lavere standardavvik.</b> σ<sup>2</sup> faller fra 0,04 til 0,0256. Da stiger w* med faktoren "
         "0,04/0,0256 = 1,5625.</p>",
    full="<p><b>Formelen.</b> w* = (μ − r<sub>f</sub>)/(γσ<sup>2</sup>). Andelen stiger med risikopremien og faller med "
         "risikoaversjonen og variansen. Ingenting annet står der.</p>"
         "<p><b>Steg 1: standardavviket.</b> σ faller fra 0,20 til 0,16. Variansen faller fra 0,04 til 0,0256. Siden "
         "variansen står i nevneren, stiger w* med 0,04/0,0256 = 1,5625. Et fall i σ på en femdel løfter w* med over "
         "50 %, fordi σ står i annen potens.</p>"
         "<p><b>Steg 2: de tre andre.</b> Horisonten står ikke i formelen, så den endrer ingenting. Høyere γ gir lavere "
         "w*. Høyere risikofri rente med samme aksjeavkastning gir lavere premie og lavere w*.</p>"
         "<p><b>Kontroll med tall:</b> med premie 4 % og γ = 2 er w* = 0,04/(2 × 0,04) = 50 % ved σ = 20 % og "
         "0,04/(2 × 0,0256) = 78,1 % ved σ = 16 %. Med γ = 3 i stedet blir det 33,3 %, med premie 3 % blir det "
         "37,5 %.</p>"
         "<p><b>Husk:</b> volatiliteten er den sterkeste driveren i formelen fordi den står i annen potens. "
         "Tidshorisonten er ikke med.</p>",
)

statisk(
    "prt-s11", tema=T, type="begrep",
    q="<p>Lise er 62 år og har trygg jobb i staten. Siden hun var 35, har hun hatt nesten hele finansformuen i aksjer. "
      "Rådgiveren sier at hun bør trappe ned aksjeandelen av finansformuen nå. Risikoaversjonen hennes er den samme som "
      "før. Hvilken begrunnelse er i tråd med kurset?</p>",
    alternativer=[
        R("Humankapitalen hennes, som virket som en stor obligasjon, er nesten brukt opp"),
        F("Aksjer blir tryggere med lang horisont. Hennes horisont er nå kort",
          "Riktig konklusjon, galt argument. Kurset avviser at aksjer blir tryggere over tid: sluttformuens "
          "standardavvik vokser med horisonten."),
        F("Mertons w* faller med alderen fordi formelen inneholder tidshorisonten",
          "Formelen inneholder ingen tid. w* av totalformuen er den samme. Det som endres, er balansen."),
        F("Hun bør ikke trappe ned: w* er den samme, så aksjeandelen av finansformuen er uendret",
          "w* av totalformuen er uendret, men andelen av finansformuen faller når humankapitalen krymper."),
    ],
    kort="<p><b>Humankapitalen er nesten brukt opp.</b> Trygg humankapital virket som en obligasjon. Når den krymper, må "
         "mer av det trygge ligge i finansformuen.</p>",
    full="<p><b>Mekanismen.</b> Mertons w* gjelder totalformuen: finansformuen pluss humankapitalen. For Lise, med trygg "
         "jobb, har humankapitalen virket som et stort bankinnskudd. Den har båret den trygge delen av totalformuen, så "
         "finansformuen kunne stå i aksjer.</p>"
         "<p><b>Steg 1: som 35-åring.</b> Tenk deg F = 0,5 mill., H = 5 mill. og w* = 30 %. Ønsket aksjebeløp er "
         "0,30 × 5,5 mill. = 1,65 mill., mer enn hele finansformuen.</p>"
         "<p><b>Steg 2: som 62-åring.</b> Tenk deg F = 4 mill. og H = 0,5 mill. Ønsket aksjebeløp er 0,30 × 4,5 mill. "
         "= 1,35 mill., altså 34 % av finansformuen. Andelen faller kraftig, med samme w*.</p>"
         "<p><b>Steg 3: hvorfor ikke tiden.</b> Kurset avviser at aksjer blir tryggere jo lenger du eier dem. "
         "Sluttformuens standardavvik vokser med horisonten. Alternativet med kort horisont har riktig konklusjon, men "
         "galt argument.</p>"
         "<p><b>Kontroll:</b> i begge aldre er aksjer delt på totalformuen lik w* = 30 %. Bare andelen av "
         "finansformuen endres.</p>"
         "<p><b>Husk:</b> aksjeandelen av finansformuen faller over livet fordi humankapitalen brukes opp, ikke fordi "
         "risikoen avtar med tiden.</p>",
)

statisk(
    "prt-s12", tema=T, type="paastand",
    q="<p>Hvilken påstand om aksjer og lang tidshorisont er riktig ifølge kurset?</p>",
    alternativer=[
        R("Standardavviket til sluttformuen vokser med antall år du eier aksjene"),
        F("Risikoen i aksjer forsvinner hvis du bare eier dem lenge nok",
          "Dette er tidsdiversifiseringsfeilslutningen. Sluttformuens standardavvik vokser omtrent med kvadratroten av "
          "antall år."),
        F("Standardavviket til den årlige gjennomsnittsavkastningen vokser med antall år",
          "Motsatt: det faller med horisonten. Men det er sluttformuen du skal leve av. Den blir mer usikker."),
        F("Mertons w* blir høyere jo lengre horisonten er", "Tidshorisonten står ikke i formelen."),
    ],
    kort="<p><b>Sluttformuens standardavvik vokser med horisonten.</b> Aksjer blir ikke trygge av å eies lenge.</p>",
    full="<p><b>To mål på risiko.</b> Over T år kan du se på den årlige gjennomsnittsavkastningen eller på sluttformuen. "
         "De oppfører seg motsatt. Forvekslingen er grunnlaget for en vanlig feilslutning.</p>"
         "<p><b>Steg 1: snittavkastningen.</b> Snittet av T uavhengige årlige avkastninger har standardavvik "
         "σ/√T. Det faller med horisonten. Over 25 år med σ = 20 % er det 4 %.</p>"
         "<p><b>Steg 2: sluttformuen.</b> Den samlede avkastningen er summen av de årlige, med standardavvik omtrent "
         "σ × √T. Over 25 år blir standardavviket til den samlede logavkastningen 5 × 20 % = 100 %. Usikkerheten om hva du sitter igjen med, "
         "vokser.</p>"
         "<p><b>Steg 3: konsekvensen.</b> Det er sluttformuen du skal leve av. Derfor sier kurset at aksjer ikke blir "
         "tryggere av å eies lenge. Mertons formel inneholder heller ikke tid.</p>"
         "<p><b>Kontroll:</b> hvorfor skal unge likevel ha mer aksjer? Fordi de har stor, trygg humankapital. Det er "
         "kursets eneste forsvar for «100 minus alder». Det handler ikke om tid.</p>"
         "<p><b>Husk:</b> snittavkastningens standardavvik faller med tiden, sluttformuens vokser. Aksjer blir ikke "
         "tryggere av å eies lenge.</p>",
)

statisk(
    "prt-s13", tema=T, type="begrep",
    q="<p>Kurset fraråder å eie mye aksjer i selskapet du selv jobber i. Hva er hovedgrunnen?</p>",
    alternativer=[
        R("Jobben og aksjene kan rammes samtidig hvis det går dårlig for selskapet du jobber i"),
        F("Ansatte har innsideinformasjon og får derfor ikke eie aksjene",
          "Innsidereglene begrenser når du kan handle, ikke om du kan eie. Poenget er samvariasjonen."),
        F("Aksjer i egen arbeidsgiver gir lavere forventet avkastning enn et indeksfond",
          "Det er ingen grunn til at forventet avkastning er lavere. Problemet er at risikoen legges oppå risikoen du "
          "alt har i lønnen."),
        F("Selskapet kan kreve aksjene tilbake hvis du slutter i jobben",
          "Ingen slik regel gjelder vanlige aksjer. Argumentet handler om at lønn og aksjer samvarierer."),
    ],
    kort="<p><b>Lønn og aksjer samvarierer.</b> Humankapitalen din er alt eksponert mot selskapet. Aksjene legger mer av "
         "samme risiko oppå.</p>",
    full="<p><b>Humankapitalens beta.</b> Lønnen din er en del av formuen, målt som humankapital. Hvor risikabel den er, "
         "avhenger av hvor mye den samvarierer med det du ellers eier. For aksjer i egen arbeidsgiver er samvariasjonen "
         "ekstrem.</p>"
         "<p><b>Steg 1: det gode scenarioet.</b> Går selskapet bra, er jobben trygg og bonusen høy. Aksjene stiger. Du "
         "får mer av alt.</p>"
         "<p><b>Steg 2: det dårlige scenarioet.</b> Går selskapet dårlig, faller aksjene samtidig som du risikerer "
         "nedbemanning. Du mister inntekt og formue på samme tid, nettopp når du trenger formuen mest.</p>"
         "<p><b>Steg 3: Merton-regelen.</b> Aksjebeløp i finansformuen = w*(F + H) − β<sub>H</sub> × H. Jo mer lønnen "
         "følger aksjene du eier, jo mindre aksjer av samme slag skal du ha i finansformuen. Med eget selskap er "
         "korrelasjonen langt høyere enn mot markedet som helhet.</p>"
         "<p><b>Kontroll:</b> samme logikk ligger bak rådet mot hjemmebias. Norsk lønn og norske aksjer faller sammen i "
         "en norsk krise. Et globalt fond gjør ikke det.</p>"
         "<p><b>Husk:</b> vurder en plassering etter hvordan den samvarierer med lønnen din, ikke bare etter dens egen "
         "risiko.</p>",
)

statisk(
    "prt-s14", tema=T, type="formel",
    q="<p>F er finansformuen, H humankapitalen, β<sub>H</sub> humankapitalens beta mot aksjemarkedet og w* Mertons andel "
      "av totalformuen. Hvilket uttrykk gir andelen av <b>finansformuen</b> som bør stå i aksjer?</p>",
    alternativer=[
        R("[w*(F + H) − β<sub>H</sub>H]/F"),
        F("w*(F + β<sub>H</sub>H)/F", "Betaen lagt på formuen som ganges med w*, i stedet for på eksponeringen som "
                                       "trekkes fra."),
        F("[w*(F + H) − β<sub>H</sub>H]/(F + H)", "Delt på totalformuen. Spørsmålet gjelder andelen av "
                                                    "finansformuen."),
        F("[w*F − β<sub>H</sub>H]/F", "Humankapitalen er glemt i ønsket eksponering. w* gjelder F + H, ikke F."),
    ],
    kort="<p><b>[w*(F + H) − β<sub>H</sub>H]/F.</b> Ønsket eksponering av totalformuen, minus det lønnen alt gir, delt på "
         "finansformuen.</p>",
    full="<p><b>Logikken i tre ledd.</b> Merton sier hvor mye aksjeeksponering du skal ha av alt du eier. Noe av den "
         "har du alt gjennom lønnen. Resten må tas i finansformuen.</p>"
         "<p><b>Steg 1: ønsket eksponering.</b> w* × (F + H). Totalformuen er finansformue pluss humankapital.</p>"
         "<p><b>Steg 2: det lønnen gir.</b> β<sub>H</sub> × H. Med β<sub>H</sub> = 0 gir lønnen ingenting, med "
         "β<sub>H</sub> = 1 er hele H aksjer.</p>"
         "<p><b>Steg 3: resten, som andel av F.</b> [w*(F + H) − β<sub>H</sub>H]/F.</p>"
         "<p><b>Kontroll med H2025-tallene:</b> w* = 50 %, F = H = 1 mill. Med β<sub>H</sub> = 0: (1 − 0)/1 = 100 %. "
         "Med β<sub>H</sub> = 1: (1 − 1)/1 = 0 %. Begge stemmer med fasiten. Uttrykket med betaen lagt på formuen gir "
         "50 % ved β<sub>H</sub> = 0. Uttrykket uten H i ønsket eksponering gir 50 % og −50 %.</p>"
         "<p><b>Husk:</b> beløp = w*(F + H) − β<sub>H</sub>H. Andel av F = beløp/F. Kappes ved 0, over 100 % betyr "
         "lån.</p>",
)

statisk(
    "prt-s15", tema=T, type="formel",
    q="<p>To aktiva har standardavvik σ<sub>1</sub> og σ<sub>2</sub> og korrelasjon ρ. Andelen s ligger i aktivum 1, "
      "resten i aktivum 2. Hvilket uttrykk er porteføljens varians?</p>",
    alternativer=[
        R("s<sup>2</sup>σ<sub>1</sub><sup>2</sup> + (1 − s)<sup>2</sup>σ<sub>2</sub><sup>2</sup> + "
          "2s(1 − s)ρσ<sub>1</sub>σ<sub>2</sub>"),
        F("s<sup>2</sup>σ<sub>1</sub><sup>2</sup> + (1 − s)<sup>2</sup>σ<sub>2</sub><sup>2</sup> + 2s(1 − s)ρ",
          "Krysleddet har ρ alene. Det skal ha kovariansen ρσ<sub>1</sub>σ<sub>2</sub>."),
        F("sσ<sub>1</sub><sup>2</sup> + (1 − s)σ<sub>2</sub><sup>2</sup> + 2s(1 − s)ρσ<sub>1</sub>σ<sub>2</sub>",
          "Vektene er ikke kvadrert i de to første leddene."),
        F("s<sup>2</sup>σ<sub>1</sub><sup>2</sup> + (1 − s)<sup>2</sup>σ<sub>2</sub><sup>2</sup> + "
          "2s(1 − s)ρσ<sub>1</sub><sup>2</sup>σ<sub>2</sub><sup>2</sup>",
          "Krysleddet har variansene. Kovariansen er ρ ganget med standardavvikene, ikke med variansene."),
    ],
    kort="<p><b>s<sup>2</sup>σ<sub>1</sub><sup>2</sup> + (1 − s)<sup>2</sup>σ<sub>2</sub><sup>2</sup> + "
         "2s(1 − s)ρσ<sub>1</sub>σ<sub>2</sub>.</b> Kvadrerte vekter. Kovariansen ρσ<sub>1</sub>σ<sub>2</sub> står i "
         "krysleddet.</p>",
    full="<p><b>Hvor formelen kommer fra.</b> Porteføljeavkastningen er s × r<sub>1</sub> + (1 − s) × r<sub>2</sub>. "
         "Variansen av en sum med vekter er vekt i annen ganger variansen for hvert ledd, pluss to ganger produktet av "
         "vektene ganger kovariansen. Kovariansen er ρσ<sub>1</sub>σ<sub>2</sub>.</p>"
         "<p><b>Steg 1: kvadratleddene.</b> s<sup>2</sup>σ<sub>1</sub><sup>2</sup> og (1 − s)<sup>2</sup>σ<sub>2</sub>"
         "<sup>2</sup>. Både vekten og standardavviket står i annen.</p>"
         "<p><b>Steg 2: krysleddet.</b> 2s(1 − s)ρσ<sub>1</sub>σ<sub>2</sub>. Ett standardavvik fra hvert aktivum, "
         "ikke variansene.</p>"
         "<p><b>Kontroll:</b> sett ρ = 1. Riktig uttrykk blir [sσ<sub>1</sub> + (1 − s)σ<sub>2</sub>]<sup>2</sup>, så "
         "standardavviket blir det vektede snittet. Det stemmer med at ρ = 1 ikke gir noen "
         "diversifiseringsgevinst. Uttrykket med variansene i krysleddet gir ikke et fullt kvadrat. Det gjør heller ikke "
         "uttrykket med ρ alene.</p>"
         "<p><b>Husk:</b> kvadrer vektene og bruk kovariansen ρσ<sub>1</sub>σ<sub>2</sub> i krysleddet. Ta roten til "
         "slutt for standardavviket.</p>",
)

statisk(
    "prt-s16", tema=T, type="paastand", rekkefolge="fast",
    q="<p>To aksjer har korrelasjon ρ = 0,3. Du fordeler formuen mellom dem.</p>"
      "<p>I: Porteføljens forventede avkastning er det vektede snittet av aksjenes forventede avkastning.</p>"
      "<p>II: Porteføljens standardavvik er det vektede snittet av aksjenes standardavvik.</p>"
      "<p>Hvilke påstander er riktige?</p>",
    alternativer=[
        R("Bare I"),
        F("Bare II", "Snudd. Forventningen er alltid lineær. Standardavviket er lavere enn snittet når ρ er under 1."),
        F("Både I og II", "II gjelder bare ved ρ = 1. Med ρ = 0,3 er standardavviket lavere enn det vektede snittet."),
        F("Ingen av dem", "I er riktig: forventet avkastning er alltid et rent vektet snitt."),
    ],
    kort="<p><b>Bare I.</b> Forventningen er et vektet snitt. Standardavviket er lavere enn snittet så lenge ρ er under "
         "1.</p>",
    full="<p><b>Lineær forventning, ikke-lineær risiko.</b> Hele porteføljeteorien bygger på at de to størrelsene "
         "oppfører seg ulikt når du blander aktiva.</p>"
         "<p><b>Påstand I.</b> E(r<sub>p</sub>) = sμ<sub>1</sub> + (1 − s)μ<sub>2</sub>. Legger du 30 % i den ene, får "
         "du 30 % av dens forventning. Påstanden er riktig.</p>"
         "<p><b>Påstand II.</b> σ<sub>p</sub><sup>2</sup> = s<sup>2</sup>σ<sub>1</sub><sup>2</sup> + (1 − s)<sup>2</sup>"
         "σ<sub>2</sub><sup>2</sup> + 2s(1 − s)ρσ<sub>1</sub>σ<sub>2</sub>. Bare ved ρ = 1 blir dette kvadratet av det "
         "vektede snittet. Med ρ = 0,3 er krysleddet mindre. Standardavviket blir lavere enn snittet. Påstanden er "
         "gal.</p>"
         "<p><b>Kontroll med tall:</b> s = 0,5, σ<sub>1</sub> = 20 % og σ<sub>2</sub> = 10 %. Det vektede snittet er "
         "15 %. Variansen er 0,25 × 0,04 + 0,25 × 0,01 + 2 × 0,25 × 0,3 × 0,02 = 0,0155. Roten er 12,45 %, lavere "
         "enn 15 %. ✓</p>"
         "<p><b>Husk:</b> forventningen er et vektet snitt, standardavviket er det ikke. Forskjellen er "
         "diversifiseringsgevinsten.</p>",
)

statisk(
    "prt-s17", tema=T, type="paastand",
    q="<p>To aksjer A og B har perfekt negativ korrelasjon, ρ = −1. Standardavvikene er σ<sub>A</sub> og σ<sub>B</sub>, "
      "som ikke er like store. Du kan ikke shortselge. Hvilken påstand er riktig?</p>",
    alternativer=[
        R("Risikoen kan fjernes helt med andelen σ<sub>B</sub>/(σ<sub>A</sub> + σ<sub>B</sub>) i A"),
        F("Risikoen kan fjernes helt, men bare med 50 % i hver aksje",
          "50 % gir null risiko bare når σ<sub>A</sub> = σ<sub>B</sub>. Aksjen med lavest standardavvik skal ha "
          "størst andel."),
        F("Risikoen kan aldri bli null uten shortsalg",
          "Ved ρ = −1 trekker aksjene alltid motsatt vei. Med riktige andeler opphever de hverandre, uten "
          "shortsalg."),
        F("Lavest risiko får du med alt i aksjen med lavest standardavvik",
          "Det er hjørneløsningen ved ρ = +1. Ved ρ = −1 kan en blanding senke risikoen helt til null."),
    ],
    kort="<p><b>Null risiko med σ<sub>B</sub>/(σ<sub>A</sub> + σ<sub>B</sub>) i A.</b> Da er bidragene "
         "w × σ<sub>A</sub> og (1 − w) × σ<sub>B</sub> like store og opphever hverandre.</p>",
    full="<p><b>Hva ρ = −1 betyr.</b> Aksjene beveger seg alltid i motsatt retning, i fast forhold. Variansen blir et "
         "fullt kvadrat: σ<sub>p</sub> = |wσ<sub>A</sub> − (1 − w)σ<sub>B</sub>|. Det kan bli null.</p>"
         "<p><b>Steg 1: sett lik null.</b> wσ<sub>A</sub> = (1 − w)σ<sub>B</sub> gir w = σ<sub>B</sub>/(σ<sub>A</sub> + "
         "σ<sub>B</sub>).</p>"
         "<p><b>Steg 2: tolk.</b> Andelen i A øker med σ<sub>B</sub>. Aksjen med lavest standardavvik får størst andel, "
         "fordi den trenger større vekt for å oppveie den mer volatile.</p>"
         "<p><b>Kontroll med tall:</b> σ<sub>A</sub> = 20 % og σ<sub>B</sub> = 30 % gir w = 0,30/0,50 = 60 % i A. "
         "Da er 0,6 × 20 % = 12 % og 0,4 × 30 % = 12 %. Bidragene er like og opphever hverandre. ✓ Ved 50/50 blir "
         "σ<sub>p</sub> = |10 % − 15 %| = 5 %, ikke null.</p>"
         "<p><b>Husk:</b> ρ = −1: null risiko ved σ<sub>B</sub>/(σ<sub>A</sub> + σ<sub>B</sub>) i A. ρ = +1: alt i "
         "aksjen med lavest σ. 50/50 er bare riktig når standardavvikene er like.</p>",
)

statisk(
    "prt-s18", tema=T, type="begrep",
    q="<p>Jonas velger mellom bank og et aksjefond med to utfall, gode og dårlige tider. Han har ln-nytte av "
      "sluttverdien. Så blir han mer optimistisk: sannsynligheten han tror på for gode tider, øker fra 40 % til 55 %. "
      "Hvilken størrelse endres?</p>",
    alternativer=[
        R("Fondets forventede nytte"),
        F("Fondets sluttverdi i gode tider", "Sluttverdien i hvert utfall er gitt. Sannsynligheten endrer bare "
                                             "vektene."),
        F("Bankens nytte, ln av bankens sluttverdi", "Banken er sikker. Nytten av den avhenger ikke av noen "
                                                     "sannsynlighet."),
        F("Nytten i det dårlige utfallet, ln av sluttverdien der", "ln W i hvert utfall er det samme. Det er den "
                                                                   "veide summen som endres."),
    ],
    kort="<p><b>Fondets forventede nytte.</b> Sannsynlighetene er vektene i p × ln W<sub>god</sub> + (1 − p) × "
         "ln W<sub>dårlig</sub>. Utfallene og banken står stille.</p>",
    full="<p><b>Hva en sannsynlighet er i regnestykket.</b> Forventet nytte er en vektet sum: hvert utfall går gjennom "
         "nyttefunksjonen. Nyttene veies deretter med sannsynlighetene. En subjektiv sannsynlighet er bare en annen "
         "vekt.</p>"
         "<p><b>Steg 1: hva som står fast.</b> Fondets sluttverdi i gode og dårlige tider er bestemt av markedet, ikke av "
         "hva Jonas tror. ln av hver av dem er derfor også fast. Banken er sikker, så ln W<sub>bank</sub> har ingen "
         "sannsynlighet i seg.</p>"
         "<p><b>Steg 2: hva som endres.</b> Bare vektene: 0,40 og 0,60 blir 0,55 og 0,45. Fondets forventede nytte "
         "øker, fordi det gode utfallet får mer vekt.</p>"
         "<p><b>Steg 3: konsekvensen.</b> Valget kan snu fra bank til fond, selv om ingen kronebeløp er endret. Det var "
         "fellen i H2022 oppgave 5.4: alternativene påsto at sluttverdiene endret seg.</p>"
         "<p><b>Kontroll:</b> ta et eksempel. Med ln 1 300 000 = 14,0779 og ln 280 000 = 12,5425 gir 40 % en forventet "
         "nytte på 13,1567 og 55 % på 13,3870. De to ln-tallene er de samme i begge.</p>"
         "<p><b>Husk:</b> nye sannsynligheter endrer forventet nytte, aldri sluttverdiene.</p>",
)

statisk(
    "prt-s19", tema=T, type="tolkning",
    q="<p>Mia velger mellom bank og et aksjefond med ln-nytte. Banken gir sikkert mer enn innskuddet. Fondet gir enten "
      "mer eller mindre enn innskuddet. Mia blir tapsavers med innskuddet som referansepunkt: nytten av utfall under "
      "referansepunktet ganges med en vekt under 1. Hvilken påstand er riktig?</p>",
    alternativer=[
        R("Tapsaversjonen kan bare flytte valget fra fondet mot banken, aldri motsatt"),
        F("Tapsaversjonen senker også bankens nytte, siden banken gir mindre enn fondet i gode tider",
          "Referansepunktet er innskuddet, ikke fondets beste utfall. Banken gir mer enn innskuddet, så den er ikke "
          "et tap."),
        F("Tapsaversjonen øker nytten av det gode utfallet, fordi gevinster måles mot referansepunktet",
          "Utfall over referansepunktet får vekt 1. Bare tap vektes."),
        F("Tapsaversjonen endrer sluttverdien i det dårlige utfallet",
          "Sluttverdien er gitt. Vekten virker på nytten av den, ikke på kronene."),
    ],
    kort="<p><b>Bare mot banken.</b> Vekten trekker bare ned det dårlige utfallet i fondet. Banken og det gode utfallet "
         "er over referansepunktet og berøres ikke.</p>",
    full="<p><b>Hvordan tapsaversjonen regnes.</b> I kursets oppsett (H2022 oppgave 5.6) ganges ln-nytten av utfall under "
         "referansepunktet med en vekt under 1, for eksempel 1/1,03. Utfall over referansepunktet får vekt 1.</p>"
         "<p><b>Steg 1: hvilke utfall er tap?</b> Referansepunktet er innskuddet. Banken gir mer enn det, så den er "
         "ikke et tap. Fondets gode utfall er heller ikke et tap. Bare fondets dårlige utfall ligger under.</p>"
         "<p><b>Steg 2: retningen.</b> Vekten senker nytten i ett av fondets utfall. Fondets forventede nytte kan derfor "
         "bare falle, mens bankens står stille. Valget kan bare flyttes mot banken.</p>"
         "<p><b>Kontroll med tall:</b> med ln 1 300 000 = 14,0779 og ln 280 000 = 12,5425 med 50 % hver er fondets nytte "
         "13,3102. Med vekt 1/1,03 på det dårlige utfallet blir den 0,5 × 14,0779 + 0,5 × 0,970874 × 12,5425 = 13,1276. "
         "Bankens nytte er uendret.</p>"
         "<p><b>Husk:</b> merk hvilke utfall som er under referansepunktet. Bare de vektes ned. Det trekker alltid "
         "mot det trygge alternativet.</p>",
)

statisk(
    "prt-s20", tema=T, type="begrep",
    q="<p>Et aksjefond har høyere forventet sluttverdi enn banken. Likevel velger en person med U(W) = ln W banken. Hva "
      "forklarer det?</p>",
    alternativer=[
        R("ln er konkav, så det dårlige utfallet trekker nytten mer ned enn det gode løfter"),
        F("ln-nytte gjør personen risikonøytral, så hun ser bare på hvor stor risikoen er",
          "Risikonøytral betyr at bare forventet sluttverdi teller. Da ville hun valgt fondet. ln-nytte er "
          "risikoavers."),
        F("Med ln-nytte velger man alltid det sikre alternativet",
          "Nei. Er sannsynligheten for gode tider høy nok, vinner fondet også med ln-nytte."),
        F("Forventet sluttverdi skal regnes med ln av sannsynlighetene",
          "Sannsynlighetene er vekter og tas aldri ln av. Det er sluttverdiene som går gjennom ln."),
    ],
    kort="<p><b>Konkaviteten.</b> Med ln-nytte veier tapet i det dårlige utfallet tyngre enn gevinsten i det gode. "
         "Forventet nytte kan da være lavest for fondet.</p>",
    full="<p><b>Risikoaversjon som krumning.</b> En konkav nyttefunksjon har avtakende grensenytte: den første "
         "tusenlappen er verdt mer enn den siste. Fra det følger Jensens ulikhet, E[ln W] &lt; ln E[W] for et usikkert "
         "W. Et usikkert fond er verdt mindre i nytte enn sin egen forventning.</p>"
         "<p><b>Steg 1: et eksempel.</b> Fondet gir kr 1 300 000 eller kr 280 000 med 40 % og 60 %. Forventet "
         "sluttverdi er 688 000. Banken gir sikkert 579 319, altså mindre.</p>"
         "<p><b>Steg 2: nyttene.</b> Fondet: 0,4 × 14,0779 + 0,6 × 12,5425 = 13,1567. Banken: ln 579 319 = 13,2696. "
         "Banken vinner.</p>"
         "<p><b>Steg 3: hvorfor.</b> Fondet ligger rundt 109 000 kroner over banken i forventning. Men det dårlige utfallet "
         "ligger så langt nede på den bratte delen av ln-kurven at det trekker nytten mer ned enn det gode utfallet "
         "løfter.</p>"
         "<p><b>Kontroll:</b> med 50 % for gode tider blir fondets nytte 13,3102, over bankens. ln-nytte velger altså "
         "ikke alltid banken. Den krever bare bedre odds.</p>"
         "<p><b>Husk:</b> forventet sluttverdi er valget til en risikonøytral person. Med ln-nytte sammenligner du "
         "forventet nytte.</p>",
)

statisk(
    "prt-s21", tema=T, type="begrep",
    q="<p>Hvorfor kan ikke aktive forvaltere <b>som gruppe</b> slå markedet etter kostnader?</p>",
    alternativer=[
        R("Markedet er snittet av alle før kostnader, så snittet etter kostnader må ligge under"),
        F("Aktive forvaltere har systematisk dårligere informasjon om selskapene enn indeksfondene har",
          "Indeksfondene bruker ingen selskapsinformasjon i det hele tatt. Argumentet er ren aritmetikk."),
        F("Aktive fond tar høyere risiko og får derfor lavere avkastning",
          "Høyere risiko gir ikke lavere forventet avkastning. Det er kostnadene som trekker ned."),
        F("Indeksfond får skattefordeler som aktive fond ikke får",
          "Skattereglene for fondene er de samme. Forskjellen ligger i gebyret."),
    ],
    kort="<p><b>Aritmetikken.</b> Før kostnader er summen av alle investorers avkastning markedets avkastning. Etter "
         "kostnader blir snittet lavere.</p>",
    full="<p><b>Argumentet.</b> Alle aksjene i markedet eies av noen. Før kostnader er derfor snittavkastningen til alle "
         "investorer, vektet etter beløp, lik markedets avkastning. Det er en identitet.</p>"
         "<p><b>Steg 1: del investorene i to.</b> Passive investorer eier markedet og får markedets avkastning før "
         "kostnader. Da må de aktive samlet også få markedets avkastning før kostnader, siden summen er gitt.</p>"
         "<p><b>Steg 2: trekk fra kostnadene.</b> Aktive fond tar typisk 1–2 % i året, indeksfond 0,1–0,3 %. Etter "
         "kostnader må gjennomsnittlig aktiv krone derfor gjøre det dårligere enn gjennomsnittlig passiv krone.</p>"
         "<p><b>Steg 3: hva det ikke sier.</b> Enkelte aktive forvaltere kan slå markedet. Men da må andre aktive tape "
         "like mye før kostnader. Gruppen kan ikke vinne.</p>"
         "<p><b>Kontroll:</b> Forbrukerrådet fant at aktive fond fra norske forvaltere var svakere enn indeks på "
         "globale, europeiske og nordiske aksjer over tjue år. Det stemmer med aritmetikken.</p>"
         "<p><b>Husk:</b> markedet er snittet før kostnader. Etter kostnader taper de aktive som gruppe.</p>",
)

statisk(
    "prt-s22", tema=T, type="begrep",
    q="<p>Historisk statistikk over aktive fond får dem ofte til å se bedre ut enn de har vært for sparerne. Hvilken "
      "mekanisme peker kurset på?</p>",
    alternativer=[
        R("Fond som gjorde det dårlig, legges ned og forsvinner ut av snittet"),
        F("Statistikken trekker ikke fra gebyrene i de aktive fondene",
          "Det er ikke mekanismen kurset peker på. Skjevheten kommer av hvilke fond som er med i snittet."),
        F("De beste fondene får mest nye penger, noe som løfter avkastningen videre",
          "Mer penger inn løfter ikke avkastningen per krone. Kurset peker på at taperne forsvinner fra "
          "statistikken."),
        F("Statistikken bygger på forvalternes egne prognoser i stedet for faktisk avkastning",
          "Statistikken bygger på faktisk avkastning. Problemet er at de dårligste fondene ikke lenger er med."),
    ],
    kort="<p><b>Survivorship bias.</b> De dårligste fondene legges ned eller slås sammen og forsvinner ut av snittet. "
         "Bare overleverne telles.</p>",
    full="<p><b>Hva skjevheten er.</b> Survivorship bias betyr at et utvalg bare består av dem som har overlevd. Måler du "
         "snittavkastningen til aktive fond som finnes i dag, mangler fondene som gjorde det så dårlig at de ble lagt "
         "ned.</p>"
         "<p><b>Steg 1: hvorfor fond forsvinner.</b> Et fond som taper mot indeks år etter år, mister kunder. "
         "Forvalteren legger det ned eller slår det sammen med et annet fond.</p>"
         "<p><b>Steg 2: hva det gjør med snittet.</b> De dårligste resultatene faller ut. Snittet av de gjenværende er "
         "høyere enn snittet av alle fondene sparerne faktisk eide i perioden.</p>"
         "<p><b>Steg 3: konsekvensen.</b> Statistikken lyver i de aktives favør. Den virkelige forskjellen mot indeks er "
         "større enn tallene viser.</p>"
         "<p><b>Kontroll:</b> tenk deg ti fond der tre gjorde det svært dårlig og ble lagt ned. Måler du bare de sju "
         "som er igjen, får du et pent snitt. Men en sparer som valgte tilfeldig blant de ti, hadde 30 % sjanse for å "
         "havne i et av de tre.</p>"
         "<p><b>Husk:</b> survivorship bias gjør at aktive fond ser bedre ut i statistikken enn de var for sparerne.</p>",
)

statisk(
    "prt-s23", tema=T, type="fakta",
    q="<p>Sara selger en aksje med gevinst inne på aksjesparekontoen sin. Hun kjøper et aksjefond for pengene på samme "
      "konto og tar ikke ut noe. Hva skjer med skatten på gevinsten?</p>",
    alternativer=[
        R("Ingen skatt nå: gevinsten skattlegges først når hun tar ut mer enn hun har satt inn"),
        F("Gevinsten skattlegges i salgsåret, men skatten kan betales ved uttak",
          "Salg inne på kontoen utløser ingen skatt. Skatten kommer først ved uttak ut over innskuddet."),
        F("Gevinsten blir skattefri for godt dersom pengene blir stående på kontoen i minst ti år",
          "Det finnes ingen slik tidsgrense. Gevinsten skattlegges ved uttak uansett hvor lenge den har stått."),
        F("Gevinsten skattlegges med 22 % ved uttak, uten oppjustering",
          "Uttak ut over innskuddet skattlegges som aksjeinntekt, med skjerming og oppjustering: 37,84 % effektivt."),
    ],
    kort="<p><b>Ingen skatt nå.</b> Gevinster inne på aksjesparekontoen skattlegges først når uttakene overstiger det du "
         "har satt inn.</p>",
    full="<p><b>Hva kontoen er.</b> Aksjesparekontoen er en konto for børsnoterte aksjer og aksjefond med over 80 % "
         "aksjeandel innenfor EØS. Du kan bytte mellom aksjer og fond inne på kontoen uten at gevinsten "
         "skattlegges der og da.</p>"
         "<p><b>Steg 1: salget.</b> Sara selger med gevinst og kjøper noe annet på kontoen. Ingen penger forlater "
         "kontoen, så ingen skatt utløses.</p>"
         "<p><b>Steg 2: uttak.</b> Tar hun senere ut penger, regnes uttaket først som skattefri "
         "tilbakebetaling av innskuddet. Bare uttak ut over innskuddet skattlegges.</p>"
         "<p><b>Steg 3: satsen.</b> Den skattepliktige delen behandles som aksjeinntekt: skjermingsfradrag, "
         "oppjustering med 1,72 og 22 %, altså 37,84 % effektivt.</p>"
         "<p><b>Hvorfor det lønner seg.</b> Skatten utsettes. Hele bruttoavkastningen forrentes videre i stedet for at "
         "skatten tas løpende ved hvert salg. Det er en rentefri skattekreditt.</p>"
         "<p><b>Husk:</b> salg inne på aksjesparekontoen er skattefritt. Skatten kommer ved uttak ut over innskuddet, "
         "med 37,84 % effektivt.</p>",
)

statisk(
    "prt-s24", tema=T, type="formel",
    q="<p>E(r<sub>M</sub>) er markedsporteføljens forventede avkastning, σ<sub>M</sub> dens standardavvik og "
      "r<sub>f</sub> risikofri rente. Hvilket uttrykk er stigningstallet til kapitalmarkedslinjen?</p>",
    alternativer=[
        R("(E(r<sub>M</sub>) − r<sub>f</sub>)/σ<sub>M</sub>"),
        F("E(r<sub>M</sub>)/σ<sub>M</sub>", "Risikofri rente er ikke trukket fra. Stigningstallet er meravkastning per "
                                            "enhet risiko."),
        F("(E(r<sub>M</sub>) − r<sub>f</sub>)/σ<sub>M</sub><sup>2</sup>",
          "Variansen i nevneren. Linjen er tegnet mot standardavviket, så stigningstallet bruker σ<sub>M</sub>."),
        F("σ<sub>M</sub>/(E(r<sub>M</sub>) − r<sub>f</sub>)", "Brøken snudd. Det gir risiko per enhet "
                                                              "meravkastning."),
    ],
    kort="<p><b>(E(r<sub>M</sub>) − r<sub>f</sub>)/σ<sub>M</sub>.</b> Markedets Sharpe-forhold: meravkastning per enhet "
         "standardavvik.</p>",
    full="<p><b>Linjen.</b> Kapitalmarkedslinjen er E(r<sub>p</sub>) = r<sub>f</sub> + [(E(r<sub>M</sub>) − "
         "r<sub>f</sub>)/σ<sub>M</sub>] × σ<sub>p</sub>. Den starter i r<sub>f</sub> ved null risiko og går gjennom "
         "markedsporteføljen M. Alle gode porteføljer ligger på den.</p>"
         "<p><b>Steg 1: to punkter.</b> Ved σ<sub>p</sub> = 0 er avkastningen r<sub>f</sub>. Ved σ<sub>p</sub> = "
         "σ<sub>M</sub> er den E(r<sub>M</sub>).</p>"
         "<p><b>Steg 2: stigningstallet.</b> Endring i forventet avkastning delt på endring i standardavvik: "
         "(E(r<sub>M</sub>) − r<sub>f</sub>)/(σ<sub>M</sub> − 0). Det er markedets Sharpe-forhold.</p>"
         "<p><b>Kontroll med tall:</b> r<sub>f</sub> = 3 %, E(r<sub>M</sub>) = 8 %, σ<sub>M</sub> = 15 % gir 0,05/0,15 "
         "= 0,333. Vil du ha σ<sub>p</sub> = 22,5 %, gir linjen 3 % + 0,333 × 22,5 % = 10,5 %. Det er det samme som "
         "1,5 × 8 % − 0,5 × 3 %. ✓</p>"
         "<p><b>Husk:</b> Sharpe-forholdet er meravkastning over r<sub>f</sub> delt på standardavviket. Giring langs "
         "linjen endrer det ikke.</p>",
)

statisk(
    "prt-s25", tema=T, type="begrep",
    q="<p>To aksjer har korrelasjon under 1. Aksje 1 har høyest forventet avkastning. s* er andelen i aksje 1 i "
      "minimum-varians-porteføljen. Hvorfor bør ingen investor ha mindre enn s* i aksje 1?</p>",
    alternativer=[
        R("Hver slik portefølje slås av en med samme risiko og høyere forventning"),
        F("Under s* kan variansen bli negativ slik at standardavviket ikke er definert",
          "Variansen kan aldri bli negativ. Problemet er at porteføljene under s* er dominert."),
        F("Under s* er porteføljen ikke diversifisert",
          "Den er like diversifisert. Den gir bare mindre forventning for samme risiko enn en portefølje over s*."),
        F("Under s* blir forventet avkastning høyere enn risikoen tilsier",
          "Motsatt: forventningen faller når andelen i aksje 1 synker."),
    ],
    kort="<p><b>De er dominert.</b> Til hver portefølje under s* finnes en over s* med samme standardavvik og høyere "
         "forventet avkastning.</p>",
    full="<p><b>Minimum-varians-porteføljen.</b> Når du flytter andelen s fra 0 til 1, faller standardavviket først og "
         "stiger så. Bunnpunktet heter s*. Forventet avkastning stiger hele veien, fordi aksje 1 har høyest "
         "forventning.</p>"
         "<p><b>Steg 1: tvillingene.</b> Standardavviket er U-formet rundt s*. Til en portefølje litt under s* finnes en "
         "litt over s* med nøyaktig samme standardavvik.</p>"
         "<p><b>Steg 2: sammenlign.</b> Tvillingen over s* har mer i aksje 1 og derfor høyere forventet avkastning. "
         "Samme risiko, mer avkastning. Porteføljen under s* er dominert.</p>"
         "<p><b>Kontroll med kursets tall:</b> μ<sub>1</sub> = 2, σ<sub>1</sub> = 1, μ<sub>2</sub> = 1, σ<sub>2</sub> = "
         "2 og ρ = 0 gir s* = 4/(1 + 4) = 0,8 og σ = 0,894. Ved s = 0,6 er σ = √(0,36 + 0,64) = 1,000 og forventning "
         "1,60. Ved s = 1 er σ = 1,000 og forventning 2,00. Samme risiko, høyere forventning. ✓</p>"
         "<p><b>Husk:</b> de effisiente porteføljene starter i s* og går mot aktivumet med høyest forventning.</p>",
)

statisk(
    "prt-s26", tema=T, type="begrep",
    q="<p>Hvilken arbeidstaker har humankapital med beta β<sub>H</sub> nær 1 mot aksjemarkedet?</p>",
    alternativer=[
        R("En aksjemegler med bonus som stiger og faller med aksjemarkedet"),
        F("En lektor i fast stilling i den offentlige skolen",
          "Fast offentlig lønn svinger nesten ikke med børsen. β<sub>H</sub> er nær 0."),
        F("En ung student uten jobb, siden humankapitalen er usikker",
          "Usikker er ikke det samme som korrelert med markedet. β<sub>H</sub> måler samvariasjon med aksjemarkedet."),
        F("En pensjonist uten arbeidsinntekt",
          "Pensjonisten har nesten ingen humankapital igjen. Da spiller betaen ingen rolle."),
    ],
    kort="<p><b>Aksjemegleren.</b> Bonusen stiger og faller med markedet. Humankapitalen oppfører seg som aksjer.</p>",
    full="<p><b>Hva β<sub>H</sub> måler.</b> Humankapitalens beta sier hvor mye nåverdien av framtidig arbeidsinntekt "
         "beveger seg sammen med aksjemarkedet. Den måler samvariasjon, ikke hvor usikker inntekten er i seg selv.</p>"
         "<p><b>Steg 1: aksjemegleren.</b> Når børsen går godt, øker handelsvolumet og bonusen. Når den faller, kan "
         "jobben forsvinne. Lønnen følger markedet, nær én-til-én.</p>"
         "<p><b>Steg 2: de andre.</b> En lektor i fast offentlig stilling har lønn som nesten ikke påvirkes av "
         "børsen: β<sub>H</sub> nær 0. En student har usikre framtidsutsikter, men usikkerheten er knyttet til "
         "studier og jobbvalg, ikke til børsen. En pensjonist har nesten ingen humankapital igjen.</p>"
         "<p><b>Steg 3: hva det betyr.</b> Med β<sub>H</sub> = 1 er humankapitalen allerede aksjer. "
         "Aksjebeløpet i finansformuen blir w*(F + H) − H, ofte nær null. H2025 oppgave 11.3 er dette tilfellet: "
         "svaret var 0 %.</p>"
         "<p><b>Husk:</b> trygg lønn er en obligasjon, markedsavhengig lønn er aksjer. Finansformuen skal veie opp for "
         "det lønnen alt er.</p>",
)

statisk(
    "prt-s27", tema=T, type="fakta",
    q="<p>Omtrent hvor mye tar et bredt indeksfond og et typisk aktivt forvaltet aksjefond i årlig forvaltningshonorar, "
      "ifølge kurset?</p>",
    alternativer=[
        R("0,1–0,3 % for indeksfondet og 1–2 % for det aktive"),
        F("1–2 % for indeksfondet og 3–4 % for det aktive", "For høyt. Brede indeksfond tar typisk 0,1–0,3 % i året."),
        F("Omtrent 1 % for begge, fordi konkurransen har presset prisene sammen",
          "Forskjellen er fortsatt rundt ett prosentpoeng i året eller mer."),
        F("0,1–0,3 % for indeksfondet og 2 % pluss 20 % av avkastningen for det aktive",
          "Det er typisk prising for hedgefond, ikke for aktive aksjefond."),
    ],
    kort="<p><b>0,1–0,3 % mot 1–2 %.</b> Rundt ett prosentpoeng i året skiller dem. Det gir omtrent 17 % lavere "
         "sluttverdi over 20 år.</p>",
    full="<p><b>Hvorfor kostnadene er hovedargumentet.</b> Kostnaden er det eneste ved et fond du vet sikkert på forhånd. "
         "Avkastningen er usikker, gebyret er det ikke.</p>"
         "<p><b>Steg 1: nivåene.</b> Et bredt indeksfond tar typisk 0,1–0,3 % i året, fordi det bare følger en indeks. "
         "Et aktivt fond tar 1–2 %, fordi det betaler analytikere og forvaltere. Hedgefond tar ofte 2 % pluss 20 % av "
         "avkastningen.</p>"
         "<p><b>Steg 2: hva forskjellen betyr.</b> Kr 100 000 i 20 år til 7 % gir kr 386 968. Til 6 % gir det "
         "kr 320 714. Ett prosentpoeng i gebyr gir 17,1 % lavere sluttverdi.</p>"
         "<p><b>Steg 3: koblingen til funnene.</b> Forbrukerrådet fant at aktive fond var svakere enn indeks i tre av "
         "fire kategorier over tjue år. Gebyrforskjellen alene forklarer mye av det.</p>"
         "<p><b>Kontroll:</b> 1,06<sup>20</sup>/1,07<sup>20</sup> = 0,829, altså 17,1 % lavere. Over 30 år er tapet "
         "24,6 %. Gebyret vokser med renters rente.</p>"
         "<p><b>Husk:</b> indeksfond 0,1–0,3 %, aktive fond 1–2 %. Kostnaden er det du kan kontrollere.</p>",
)
