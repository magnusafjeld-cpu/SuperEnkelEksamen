# -*- coding: utf-8 -*-
"""Eksamenstrening, tema «skattesystem»: satser og grunnlag, gjennomsnitts- og
   marginalskatt, progressivitet, effektiv skattesats, justeringsfaktoren,
   avkastning etter skatt og tidsverdien av et fradrag (k1, k2), kjernepensum kj1.

   Regnerutinene fra eksamens-DNA § 4: R7 (ska-trinn1, ska-trinn2, ska-bunn1),
   R3a (ska-eff2, ska-eier1), R3b (ska-just1), R3c (ska-eff1), R8 (ska-fradr1).
   I tillegg rente mot aksjegevinst (ska-rente1) og realavkastning (ska-real1).
"""
from trening_lib import *  # noqa: F401,F403
import trening_lib as _L


# Flyttallsfeil kan legge et tall som 1,875 på 1,8749999… og runde det feil vei.
# Disse innpakningene runder til ni desimaler før formateringen i trening_lib.
def tall(x, d=0):
    return _L.tall(round(x, 9), d)


def talla(x):
    return _L.talla(round(x, 9))


def kr(x, d=0):
    return _L.kr(round(x, 9), d)


def kra(x):
    return _L.kra(round(x, 9))


def pst(x, d=1):
    return _L.tall(round(x * 100, 9), d) + NBSP + "%"

NAVN = ["Mira", "Jonas", "Selma", "Aksel", "Ingrid", "Tobias", "Nora", "Elias", "Sara", "Henrik",
        "Emma", "Ola", "Kari", "Lars", "Ida", "Sindre", "Thea", "Martin", "Hedda", "Even"]
FIRMA = ["Verksted AS", "Fjordbåt AS", "Trykkeriet AS", "Bakeriet AS", "Snekker Berg AS",
         "Lager Nord AS", "Kaffebrenneriet AS", "Kystfisk AS", "Byggmester Lie AS", "Sagbruket AS"]


def ps(p):
    """Prosenttall som alt er i prosent, med så få desimaler som trengs:
       12 → «12 %», 3.6 → «3,6 %», 37.84 → «37,84 %»."""
    for d in (0, 1, 2):
        if abs(p * 10 ** d - round(p * 10 ** d)) < 1e-9:
            return tall(p, d) + NBSP + "%"
    return tall(p, 2) + NBSP + "%"


def tn(x, maks=2):
    """Tall med så få desimaler som trengs, høyst maks: 1.6 → «1,6», 1.72 → «1,72»."""
    for d in range(0, maks + 1):
        if abs(x * 10 ** d - round(x * 10 ** d)) < 1e-9:
            return tall(x, d)
    return tall(x, maks)


def pp(x, d=2):
    """Brøk til prosentpoeng: 0.0467 → «4,67 prosentpoeng»."""
    return tall(round(x * 100, 9), d) + NBSP + "prosentpoeng"


def vis_ulike(*tekster):
    """Kast Avvis hvis to alternativer får samme tekst etter avrunding."""
    if len(set(tekster)) != len(tekster):
        raise Avvis("to alternativer blir like etter avrunding")


_BRUKT = {}


def unik(fam, verdi):
    """Kast Avvis hvis en tidligere variant av familien har samme fasit. Hindrer
       to varianter som bare skiller seg i navnet."""
    nokkel = round(verdi, 6)
    sett = _BRUKT.setdefault(fam, set())
    if nokkel in sett:
        raise Avvis("samme fasit som en tidligere variant")
    sett.add(nokkel)

def syklus(fam, valg):
    """Velg modus etter tur: variant nummer n i familien får valg[n % len(valg)].
       Telleren er antall godtatte varianter (se unik), så fordelingen blir jevn og
       bygget er fortsatt deterministisk."""
    return valg[len(_BRUKT.get(fam, ())) % len(valg)]


# ---------------------------------------------------------------------------
# ska-trinn1 · Gjennomsnittsskatt for én person i et trinnsystem (R7)
# ---------------------------------------------------------------------------
@familie("ska-trinn1", tema="skattesystem", antall=5, tittel="Gjennomsnittsskatt i et trinnsystem")
def _(r):
    med_fradrag = syklus("ska-trinn1", [False, True, False, True, False])
    navn = r.choice(NAVN)
    g1 = r.choice([50_000, 80_000, 100_000, 120_000, 150_000])
    g2 = r.choice([300_000, 350_000, 400_000, 450_000, 500_000])
    s1 = r.choice([5, 8, 10, 12, 15])
    s2 = s1 + r.choice([5, 6, 8, 10])
    s3 = s2 + r.choice([8, 10, 12, 15])
    Y = g2 + r.randrange(40_000, 400_001, 10_000)
    F_ = r.randrange(30_000, 120_001, 10_000) if med_fradrag else 0
    Ys = Y - F_
    if Ys < g2 + 20_000:
        raise Avvis("skattepliktig inntekt for nær øverste grense")
    a, b, c = s1 / 100 * g1, s2 / 100 * (g2 - g1), s3 / 100 * (Ys - g2)
    T = a + b + c
    riktig = T / Y
    d = 2 if med_fradrag else 1
    satser = (f"Inntekt opp til {kr(g1)} skattlegges med {ps(s1)}. Inntekt mellom {kr(g1)} og {kr(g2)} "
              f"skattlegges med {ps(s2)}. Inntekt over {kr(g2)} skattlegges med {ps(s3)}.")

    if med_fradrag:
        Tb = a + b + s3 / 100 * (Y - g2)
        f_skpl, f_brutto, f_marg = T / Ys, Tb / Y, s3 / 100 * Ys / Y
        ulike(riktig, f_skpl, f_brutto, f_marg, rel=0.03)
        q = (f"<p>I et land skattlegges den skattepliktige inntekten i tre trinn. {satser}</p>"
             f"<p>{navn} har en brutto inntekt på {kr(Y)} og fradrag på til sammen {kr(F_)}. Den skattepliktige "
             f"inntekten er derfor {kr(Ys)}.</p>"
             f"<p>Hva er {gen(navn)} effektive skattesats? Rund av til to desimaler.</p>")
        alternativer = [
            R(pst(riktig, d), riktig),
            F(pst(f_skpl, d), f"Riktig skatt, men delt på skattepliktig inntekt i stedet for brutto inntekt: "
              f"{talla(T)}/{tall(Ys)}. Da forsvinner virkningen av fradragene fra målet.", f_skpl),
            F(pst(f_brutto, d), f"Fradragene glemt, så trinnene er brukt på hele brutto inntekt: skatten blir "
              f"{talla(Tb)}. {talla(Tb)}/{tall(Y)} gir dette tallet.", f_brutto),
            F(pst(f_marg, d), f"Toppsatsen brukt på hele den skattepliktige inntekten: {ps(s3)} × {tall(Ys)} = "
              f"{talla(s3 / 100 * Ys)}, delt på {tall(Y)}. Hver sats gjelder bare inntekten inne i trinnet.", f_marg),
        ]
        kort = (f"<p><b>{pst(riktig, d)}.</b> Skatten av {tall(Ys)} er {talla(a)} + {talla(b)} + {talla(c)} = "
                f"{talla(T)}. Effektiv sats er skatten delt på brutto inntekt: {talla(T)}/{tall(Y)} = {pst(riktig, d)}.</p>")
        steg0 = (f"<p><b>Hva effektiv skattesats er.</b> Effektiv skattesats er betalt skatt delt på <i>brutto</i> "
                 f"inntekt, altså inntekten før fradrag. Skatten regnes av den skattepliktige inntekten, men målet "
                 f"skal vise hvor stor del av hele inntekten som går til skatt. Derfor senker fradrag den effektive "
                 f"satsen. I et trinnsystem gjelder hver sats bare den delen av inntekten som ligger inne i trinnet.</p>")
        steg_n = (f"<p><b>Steg 4: del på brutto inntekt.</b> {talla(T)}/{tall(Y)} = <b>{pst(riktig, d)}</b>. "
                  f"Deler du på {tall(Ys)}, får du {pst(f_skpl, d)}. Det tallet overser fradragene.</p>")
    else:
        f_marg = s3 / 100
        f_topp = (a + b) / Y
        f_hele = (s2 / 100 * g2 + s3 / 100 * (Y - g2)) / Y
        ulike(riktig, f_marg, f_topp, f_hele, rel=0.03)
        q = (f"<p>I et land skattlegges inntekt i tre trinn. {satser}</p>"
             f"<p>{navn} har en inntekt på {kr(Y)} og ingen fradrag.</p>"
             f"<p>Hva er {gen(navn)} gjennomsnittsskatt? Rund av til én desimal.</p>")
        alternativer = [
            R(pst(riktig, d), riktig),
            F(pst(f_marg, d), f"Toppsatsen brukt på hele inntekten: {ps(s3)} × {tall(Y)} gir {ps(s3)} i snitt. "
              f"Det er marginalskatten, ikke gjennomsnittsskatten.", f_marg),
            F(pst(f_topp, d), f"Toppsjiktet glemt: bare de to nederste trinnene, {talla(a + b)}/{tall(Y)}. "
              f"Inntekten over {tall(g2)} skal også skattlegges.", f_topp),
            F(pst(f_hele, d), f"Mellomsatsen brukt på hele inntekten opp til {tall(g2)} i stedet for bare på "
              f"intervallet: {ps(s2)} × {tall(g2)} + {talla(c)} = {talla(s2 / 100 * g2 + c)}, delt på {tall(Y)}.", f_hele),
        ]
        kort = (f"<p><b>{pst(riktig, d)}.</b> Skatten er {talla(a)} + {talla(b)} + {talla(c)} = {talla(T)}. "
                f"Gjennomsnittsskatten er {talla(T)}/{tall(Y)} = {pst(riktig, d)}.</p>")
        steg0 = (f"<p><b>Hva gjennomsnittsskatt er.</b> Gjennomsnittsskatten er hvor stor andel av inntekten som går "
                 f"til skatt: samlet skatt delt på inntekten. I et trinnsystem gjelder hver sats bare den delen av "
                 f"inntekten som ligger inne i trinnet. De første kronene skattlegges lavt og de siste høyt. Snittet "
                 f"ligger derfor alltid under toppsatsen, som er marginalskatten.</p>")
        steg_n = (f"<p><b>Steg 4: del på inntekten.</b> {talla(T)}/{tall(Y)} = <b>{pst(riktig, d)}</b>.</p>")

    kontroll_T = s3 / 100 * Ys - (s3 - s1) / 100 * g1 - (s3 - s2) / 100 * (g2 - g1)
    full = (
        steg0 +
        f"<p><b>Steg 1: første trinn.</b> {ps(s1)} × {tall(g1)} = {talla(a)}.</p>"
        f"<p><b>Steg 2: andre trinn.</b> Bare intervallet teller: {tall(g2)} − {tall(g1)} = {tall(g2 - g1)}. "
        f"{ps(s2)} × {tall(g2 - g1)} = {talla(b)}.</p>"
        f"<p><b>Steg 3: toppsjiktet.</b> {tall(Ys)} − {tall(g2)} = {tall(Ys - g2)}. {ps(s3)} × {tall(Ys - g2)} = "
        f"{talla(c)}. Samlet skatt: {talla(a)} + {talla(b)} + {talla(c)} = {talla(T)}.</p>"
        + steg_n +
        f"<p><b>Kontroll.</b> Regn som om alt var skattlagt med toppsatsen. Trekk så fra det de lavere trinnene "
        f"sparer: {ps(s3)} × {tall(Ys)} − {tn(s3 - s1)} % × {tall(g1)} − {tn(s3 - s2)} % × {tall(g2 - g1)} = "
        f"{talla(kontroll_T)}. Det er samme skatt. ✓</p>"
        f"<p><b>Husk:</b> hver sats bare på inntekten inne i trinnet. Gjennomsnittsskatt og effektiv sats deles på "
        f"brutto inntekt.</p>"
    )
    unik("ska-trinn1", alternativer[0].verdi)
    return sporsmal(q, alternativer, kort, full)


# ---------------------------------------------------------------------------
# ska-trinn2 · To personer i samme trinnsystem, fire tallpar (R7, H2024 oppgave 5)
# ---------------------------------------------------------------------------
@familie("ska-trinn2", tema="skattesystem", antall=5, tittel="Gjennomsnittsskatt for to personer")
def _(r):
    na, nx = r.sample(NAVN, 2)
    g1 = r.choice([60_000, 80_000, 100_000, 120_000])
    g2 = r.choice([250_000, 300_000, 350_000, 400_000])
    s1 = r.choice([8, 10, 12, 15])
    s2 = s1 + r.choice([4, 6, 8])
    s3 = s2 + r.choice([8, 10, 12])
    Yx = g2 + r.randrange(20_000, 150_001, 10_000)
    Ya = Yx + r.randrange(60_000, 300_001, 10_000)
    base = s1 / 100 * g1 + s2 / 100 * (g2 - g1)
    Ta, Tx = base + s3 / 100 * (Ya - g2), base + s3 / 100 * (Yx - g2)
    ra, rx = Ta / Ya, Tx / Yx
    marg = (s3 / 100, s3 / 100)
    topp = (base / Ya, base / Yx)
    hele = ((s2 / 100 * g2 + s3 / 100 * (Ya - g2)) / Ya, (s2 / 100 * g2 + s3 / 100 * (Yx - g2)) / Yx)
    ulike(ra, marg[0], topp[0], hele[0], rel=0.02)
    ulike(rx, marg[1], topp[1], hele[1], rel=0.02)

    def par(p):
        return f"{pst(p[0], 1)} og {pst(p[1], 1)}"
    vis_ulike(par((ra, rx)), par(marg), par(topp), par(hele))

    q = (f"<p>Et land har tre skattetrinn. Inntekt opp til {kr(g1)} skattlegges med {ps(s1)}. Inntekt mellom "
         f"{kr(g1)} og {kr(g2)} skattlegges med {ps(s2)}. Inntekt over {kr(g2)} skattlegges med {ps(s3)}.</p>"
         f"<p>{na} har en inntekt på {kr(Ya)}. {nx} har en inntekt på {kr(Yx)}. Ingen av dem har fradrag.</p>"
         f"<p>Hva er gjennomsnittsskatten for henholdsvis {na} og {nx}? Rund av til én desimal.</p>")
    alternativer = [
        R(par((ra, rx)), ra),
        F(par(marg), f"Toppsatsen på {ps(s3)} brukt på hele inntekten for begge. Det er marginalskatten deres, "
          f"ikke andelen av inntekten de betaler.", marg[0]),
        F(par(topp), f"Toppsjiktet glemt: bare de to nederste trinnene, {talla(base)} for begge, delt på hver "
          f"sin inntekt. Inntekten over {tall(g2)} skal også skattlegges.", topp[0]),
        F(par(hele), f"Mellomsatsen brukt på hele inntekten opp til {tall(g2)} i stedet for bare på intervallet "
          f"fra {tall(g1)}: {ps(s2)} × {tall(g2)} pluss toppsjiktet. Første trinn falt ut.", hele[0]),
    ]
    kort = (f"<p><b>{par((ra, rx))}.</b> De to nederste trinnene gir {talla(base)} for begge. Med toppsjiktet blir "
            f"skatten {talla(Ta)} og {talla(Tx)}. Del hver på sin inntekt: {talla(Ta)}/{tall(Ya)} og {talla(Tx)}/{tall(Yx)}.</p>")
    snitt_g2 = base / g2
    full = (
        f"<p><b>Hva gjennomsnittsskatt er.</b> Gjennomsnittsskatten er samlet skatt delt på inntekten. I et "
        f"trinnsystem gjelder hver sats bare inntekten inne i sitt trinn. Begge personene ligger over {kr(g2)}, så "
        f"de fyller de to nederste trinnene helt. Det eneste som skiller dem, er toppsjiktet.</p>"
        f"<p><b>Steg 1: de nederste trinnene, like for begge.</b> {ps(s1)} × {tall(g1)} = {talla(s1 / 100 * g1)}. "
        f"{ps(s2)} × ({tall(g2)} − {tall(g1)}) = {talla(s2 / 100 * (g2 - g1))}. Sum {talla(base)}.</p>"
        f"<p><b>Steg 2: toppsjiktet.</b> {na}: {ps(s3)} × {tall(Ya - g2)} = {talla(s3 / 100 * (Ya - g2))}. "
        f"{nx}: {ps(s3)} × {tall(Yx - g2)} = {talla(s3 / 100 * (Yx - g2))}.</p>"
        f"<p><b>Steg 3: snittet.</b> {na}: {talla(Ta)}/{tall(Ya)} = <b>{pst(ra, 1)}</b>. "
        f"{nx}: {talla(Tx)}/{tall(Yx)} = <b>{pst(rx, 1)}</b>.</p>"
        f"<p><b>Kontroll.</b> Hele inntektsforskjellen på {tall(Ya - Yx)} ligger i toppsjiktet: {ps(s3)} × "
        f"{tall(Ya - Yx)} = {talla(s3 / 100 * (Ya - Yx))}, som er {talla(Ta)} − {talla(Tx)}. ✓ En raskere sjekk: "
        f"ved nøyaktig {tall(g2)} er snittet {talla(base)}/{tall(g2)} = {pst(snitt_g2, 1)}. Alt over grensen "
        f"skattlegges med {ps(s3)}, så begge svarene må ligge mellom {pst(snitt_g2, 1)} og {ps(s3)}. Det stryker "
        f"paret uten toppsjikt og paret med toppsatsen på alt. Paret med mellomsatsen på hele inntekten ligger også "
        f"innenfor. Det må du skille fra svaret med selve regnestykket.</p>"
        f"<p><b>Husk:</b> skatt trinn for trinn, så del på hele inntekten. Toppsatsen er marginalskatten, ikke "
        f"snittet.</p>"
    )
    unik("ska-trinn2", alternativer[0].verdi)
    return sporsmal(q, alternativer, kort, full)


# ---------------------------------------------------------------------------
# ska-bunn1 · Flat sats med bunnfradrag (R7, H2024 oppgave 4)
# ---------------------------------------------------------------------------
@familie("ska-bunn1", tema="skattesystem", antall=5, tittel="Flat sats med bunnfradrag")
def _(r):
    t = r.choice([20, 25, 28, 30, 35, 40])
    B = r.choice([50_000, 80_000, 100_000, 150_000, 200_000])
    modus = syklus("ska-bunn1", ["gap", "en", "gap", "gap", "en"])
    if modus == "gap":
        nl, nh = r.sample(NAVN, 2)
        Yl = r.choice([250_000, 300_000, 350_000, 400_000, 450_000, 500_000, 600_000])
        Yh = Yl * r.choice([2, 3, 4]) if r.random() < 0.6 else Yl + r.choice([200_000, 300_000, 500_000])
        if Yl <= B * 1.5:
            raise Avvis("lav inntekt for nær bunnfradraget")
        tl, th = t / 100 * (1 - B / Yl), t / 100 * (1 - B / Yh)
        riktig = th - tl
        f_skatt = B * (1 / Yl - 1 / Yh)                    # bunnfradraget trukket fra skatten
        f_rel = th / tl - 1                                  # relativ endring, ikke prosentpoeng
        f_null = 0.0
        ulike(riktig, f_skatt, f_rel, 0.00001, rel=0.05)
        q = (f"<p>Et land har en flat skattesats på {ps(t)}. De første {kr(B)} av inntekten er skattefrie "
             f"(bunnfradrag). Resten skattlegges med {ps(t)}.</p>"
             f"<p>{nl} har en inntekt på {kr(Yl)}. {nh} har en inntekt på {kr(Yh)}.</p>"
             f"<p>Hvor mange prosentpoeng høyere er gjennomsnittsskatten til {nh} enn gjennomsnittsskatten til {nl}?</p>")
        alternativer = [
            R(pp(riktig), riktig),
            F(pp(f_null), f"Lik sats på hver krone over fradraget leses som lik gjennomsnittsskatt. Det gjelder bare "
              f"uten bunnfradrag. Med bunnfradraget betaler den med lavest inntekt en lavere andel.", f_null),
            F(pp(f_skatt), f"Bunnfradraget trukket fra skatten i stedet for fra inntekten: snittet blir da {ps(t)} − "
              f"{tall(B)}/Y. Forskjellen blir {tall(B)} × (1/{tall(Yl)} − 1/{tall(Yh)}).", f_skatt),
            F(pp(f_rel), f"Relativ forskjell i stedet for forskjell i prosentpoeng: {pst(th, 2)}/{pst(tl, 2)} − 1. "
              f"Spørsmålet ber om differansen mellom de to satsene.", f_rel),
        ]
        kort = (f"<p><b>{pp(riktig)}.</b> {nl}: {ps(t)} × ({tall(Yl)} − {tall(B)})/{tall(Yl)} = {pst(tl, 2)}. "
                f"{nh}: {ps(t)} × ({tall(Yh)} − {tall(B)})/{tall(Yh)} = {pst(th, 2)}. Forskjellen er "
                f"{pp(riktig)}.</p>")
        full = (
            f"<p><b>Hva bunnfradraget gjør.</b> Et bunnfradrag er et beløp av inntekten som er skattefritt. Det er "
            f"samme kronebeløp for alle, men en større andel av en liten inntekt enn av en stor. Den som tjener minst, "
            f"får derfor skjermet den største andelen og betaler den laveste andelen i skatt. En flat sats med "
            f"bunnfradrag er progressiv: gjennomsnittsskatten stiger med inntekten.</p>"
            f"<p><b>Steg 1: {gen(nl)} gjennomsnittsskatt.</b> Skatten er {ps(t)} × ({tall(Yl)} − {tall(B)}) = "
            f"{talla(t / 100 * (Yl - B))}. Delt på {tall(Yl)} gir det {pst(tl, 2)}.</p>"
            f"<p><b>Steg 2: {gen(nh)} gjennomsnittsskatt.</b> {ps(t)} × ({tall(Yh)} − {tall(B)}) = "
            f"{talla(t / 100 * (Yh - B))}. Delt på {tall(Yh)} gir det {pst(th, 2)}.</p>"
            f"<p><b>Steg 3: forskjellen.</b> {pst(th, 2)} − {pst(tl, 2)} = <b>{pp(riktig)}</b>.</p>"
            f"<p><b>Kontroll med formelen.</b> Forskjellen er t × B × (1/Y<sub>lav</sub> − 1/Y<sub>høy</sub>) = "
            f"{tn(t / 100)} × {tall(B)} × (1/{tall(Yl)} − 1/{tall(Yh)}) = {pp(riktig)}. ✓ Formelen viser også at "
            f"avstanden er proporsjonal med bunnfradraget: dobles B, dobles forskjellen.</p>"
            f"<p><b>Husk:</b> progressivitet måles i andel av inntekten, ikke i kroner. Bunnfradraget trekkes fra "
            f"inntekten, ikke fra skatten.</p>"
        )
    else:
        navn = r.choice(NAVN)
        Y = r.choice([150_000, 200_000, 250_000, 300_000, 400_000, 500_000, 600_000, 800_000])
        if Y <= B * 1.3:
            raise Avvis("inntekt for nær bunnfradraget")
        riktig = t / 100 * (1 - B / Y)
        f_t = t / 100
        f_skatt = t / 100 - B / Y
        f_spart = t / 100 * B / Y
        if f_skatt <= 0:
            raise Avvis("negativ felle")
        ulike(riktig, f_t, f_skatt, f_spart, rel=0.03)
        q = (f"<p>Et land har en flat skattesats på {ps(t)} med et bunnfradrag på {kr(B)}: de første {kr(B)} av "
             f"inntekten er skattefrie. Resten skattlegges med {ps(t)}.</p>"
             f"<p>{navn} har en inntekt på {kr(Y)}. Hva er {gen(navn)} gjennomsnittsskatt?</p>")
        alternativer = [
            R(pst(riktig, 2), riktig),
            F(pst(f_t, 2), f"Bunnfradraget glemt: {ps(t)} er marginalskatten, satsen på neste krone. Snittet er lavere, "
              f"fordi de første {tall(B)} er skattefrie.", f_t),
            F(pst(f_skatt, 2), f"Bunnfradraget trukket fra skatten i stedet for fra inntekten: ({ps(t)} × {tall(Y)} − "
              f"{tall(B)})/{tall(Y)}.", f_skatt),
            F(pst(f_spart, 2), f"Dette er hvor mye bunnfradraget senker snittet, {ps(t)} × {tall(B)}/{tall(Y)}, ikke "
              f"selve gjennomsnittsskatten.", f_spart),
        ]
        kort = (f"<p><b>{pst(riktig, 2)}.</b> Skatten er {ps(t)} × ({tall(Y)} − {tall(B)}) = {talla(t / 100 * (Y - B))}. "
                f"Delt på {tall(Y)} gir det {pst(riktig, 2)}.</p>")
        full = (
            f"<p><b>Hva gjennomsnittsskatt er.</b> Gjennomsnittsskatten er skatten delt på inntekten, altså andelen som "
            f"går til staten. Med flat sats og bunnfradrag er marginalskatten lik satsen for alle over fradraget, mens "
            f"snittet er lavere fordi de første kronene er skattefrie. Bunnfradraget er et fradrag i inntekten, ikke i "
            f"skatten.</p>"
            f"<p><b>Steg 1: skattegrunnlaget.</b> {tall(Y)} − {tall(B)} = {tall(Y - B)}.</p>"
            f"<p><b>Steg 2: skatten.</b> {ps(t)} × {tall(Y - B)} = {talla(t / 100 * (Y - B))}.</p>"
            f"<p><b>Steg 3: snittet.</b> {talla(t / 100 * (Y - B))}/{tall(Y)} = <b>{pst(riktig, 2)}</b>.</p>"
            f"<p><b>Kontroll med formelen.</b> t × (1 − B/Y) = {tn(t / 100)} × (1 − {tall(B)}/{tall(Y)}) = "
            f"{tn(t / 100)} × {tall(1 - B / Y, 4)} = {pst(riktig, 2)}. ✓ Svaret må ligge mellom 0 og {ps(t)}. Det ligger "
            f"nærmere {ps(t)} jo større inntekten er i forhold til fradraget.</p>"
            f"<p><b>Husk:</b> flat sats med bunnfradrag gir gjennomsnittsskatt t × (1 − B/Y), som stiger med inntekten. "
            f"Det er progressivt.</p>"
        )
    unik("ska-bunn1", alternativer[0].verdi)
    return sporsmal(q, alternativer, kort, full)


# ---------------------------------------------------------------------------
# ska-eff1 · Effektiv skattesats på bedriftsnivå med avskrivning (R3c, H2025 oppgave 5)
# ---------------------------------------------------------------------------
@familie("ska-eff1", tema="skattesystem", antall=5, tittel="Effektiv skattesats i et selskap")
def _(r):
    firma = r.choice(FIRMA)
    t = r.choice([22, 22, 22, 25])
    Rinnt = r.randrange(200_000, 2_000_001, 50_000)
    n = r.choice([2, 3, 4, 5])
    A = r.randrange(int(Rinnt * 0.10 / 10_000 + 1) * 10_000, int(Rinnt * 0.35 / 10_000) * 10_000 + 1, 10_000)
    K = A * n
    med_u = r.random() < 0.35
    U = r.randrange(int(Rinnt * 0.05 / 10_000 + 1) * 10_000, int(Rinnt * 0.25 / 10_000) * 10_000 + 1, 10_000) if med_u else 0
    grunnlag = Rinnt - A - U
    if Rinnt - K - U <= Rinnt * 0.05:
        raise Avvis("hele maskinen ført i år 1 gir negativt grunnlag")
    skatt = t / 100 * grunnlag
    riktig = skatt / Rinnt
    f_skpl = t / 100
    f_hele = t / 100 * (Rinnt - K - U) / Rinnt
    if med_u:
        f3 = t / 100 * (Rinnt - A) / Rinnt
        f3_tekst = (f"Det framførte underskuddet glemt: {ps(t)} × ({tall(Rinnt)} − {tall(A)}) = "
                    f"{talla(t / 100 * (Rinnt - A))}, delt på {tall(Rinnt)}.")
    else:
        f3 = t / 100 * A / Rinnt
        f3_tekst = (f"Dette er hvor mye avskrivningen senker satsen, {ps(t)} × {tall(A)}/{tall(Rinnt)}, ikke selve "
                    f"den effektive satsen.")
    ulike(riktig, f_skpl, f_hele, f3, rel=0.03)
    u_tekst = (f" Selskapet har også et framført underskudd på {kr(U)} fra tidligere år, som i sin helhet trekkes fra "
               f"i årets skattepliktige inntekt." if med_u else "")
    q = (f"<p>{firma} har driftsinntekter på {kr(Rinnt)} i år. Tidlig i år kjøpte selskapet en maskin for {kr(K)}, "
         f"som avskrives lineært med {kr(A)} i hvert av {n} år.{u_tekst} Selskapet har ingen andre kostnader. "
         f"Selskapsskatten er {ps(t)}.</p>"
         f"<p>Hva er selskapets effektive skattesats i år? Rund av til to desimaler.</p>")
    alternativer = [
        R(pst(riktig, 2), riktig),
        F(pst(f_skpl, 2), f"Skatten delt på skattepliktig overskudd: {talla(skatt)}/{tall(grunnlag)} gir bare satsen "
          f"tilbake. Effektiv sats deles på brutto inntekt.", f_skpl),
        F(pst(f_hele, 2), f"Hele maskinen ført til fradrag i år 1: {ps(t)} × ({tall(Rinnt)} − {tall(K)}"
          + (f" − {tall(U)}" if med_u else "") + f")/{tall(Rinnt)}. Bare årets avskrivning på {tall(A)} trekkes fra.", f_hele),
        F(pst(f3, 2), f3_tekst, f3),
    ]
    u_ledd = f" − {tall(U)}" if med_u else ""
    kort = (f"<p><b>{pst(riktig, 2)}.</b> Skatten er {ps(t)} × ({tall(Rinnt)} − {tall(A)}{u_ledd}) = {talla(skatt)}. "
            f"Effektiv sats: {talla(skatt)}/{tall(Rinnt)} = {pst(riktig, 2)}.</p>")
    full = (
        f"<p><b>Hva effektiv skattesats er.</b> Effektiv skattesats er betalt skatt delt på brutto inntekt. Den "
        f"nominelle satsen, {ps(t)}, gjelder det skattepliktige overskuddet. Fradrag som ikke er en utbetaling i året, "
        f"som avskrivning og framført underskudd, gjør grunnlaget mindre enn inntekten. Da blir den effektive satsen "
        f"lavere enn den nominelle. Det er nettopp det målet skal fange.</p>"
        f"<p><b>Steg 1: årets avskrivning.</b> {tall(K)}/{n} = {tall(A)}. Bare denne delen trekkes fra i år.</p>"
        f"<p><b>Steg 2: skattepliktig overskudd.</b> {tall(Rinnt)} − {tall(A)}{u_ledd} = {tall(grunnlag)}.</p>"
        f"<p><b>Steg 3: betalt skatt.</b> {ps(t)} × {tall(grunnlag)} = {talla(skatt)}.</p>"
        f"<p><b>Steg 4: effektiv sats.</b> {talla(skatt)}/{tall(Rinnt)} = <b>{pst(riktig, 2)}</b>.</p>"
        f"<p><b>Kontroll.</b> Regn det som en sats: t × (1 − fradrag/inntekt) = {ps(t)} × (1 − {tall(A + U)}/"
        f"{tall(Rinnt)}) = {pst(riktig, 2)}. ✓ Fradragene tar {pst((A + U) / Rinnt, 1)} av inntekten og dermed like stor "
        f"andel av satsen. Delt på skattepliktig overskudd ville du fått {ps(t)} uansett hvor store fradragene var.</p>"
        f"<p><b>Husk:</b> effektiv skattesats = betalt skatt / brutto inntekt. Den er under den nominelle satsen når "
        f"det finnes fradrag.</p>"
    )
    unik("ska-eff1", alternativer[0].verdi)
    return sporsmal(q, alternativer, kort, full)


# ---------------------------------------------------------------------------
# ska-eff2 · Samlet effektiv sats for selskap og eier (R3a, H2022 oppgave 1)
# ---------------------------------------------------------------------------
@familie("ska-eff2", tema="skattesystem", antall=5, tittel="Samlet skatt på utdelt overskudd, som sats")
def _(r):
    dagens = r.random() < 0.6
    navn = r.choice(NAVN)
    firma = r.choice(FIRMA)
    if dagens:
        f_, t, tA = 1.72, 22, 22
    else:
        f_, t = r.choice([(1.6, 25), (1.44, 22), (1.6, 22)])
        tA = r.choice([22, 22, 24, 25])
    te = f_ * t / 100
    P = r.randrange(100_000, 3_000_001, 50_000)
    selsk = tA / 100 * P
    D = P - selsk
    med_skj = r.random() < 0.75
    if med_skj:
        K = r.randrange(int(D * 1.5 / 50_000 + 1) * 50_000, int(D * 8 / 50_000) * 50_000 + 1, 50_000)
        rs = r.choice([2, 3, 3.2, 3.6, 3.9, 4, 5])
        S = K * rs / 100
        if not (0.08 * D < S < 0.6 * D):
            raise Avvis("skjermingen er for liten eller for stor")
    else:
        K, rs, S = 0, 0, 0.0
    E = (D - S) * te
    modus = r.choice(["samlet", "utbytte"]) if med_skj else "samlet"
    sats_tekst = (f"Oppjusteringsfaktoren for utbytte er {tn(f_)} og skattesatsen på alminnelig inntekt {ps(t)}, "
                  f"så eierskatten er {tn(f_)} × {ps(t)} = {ps(te * 100)}.")
    skj_tekst = (f"Kostprisen på {gen(navn)} aksjer er {kr(K)}. Skjermingsrenten er {ps(rs)}. {navn} har ingen "
                 f"ubenyttet skjerming." if med_skj else "Se bort fra skjermingsfradraget.")
    q = (f"<p>{navn} eier alle aksjene i {firma}. Selskapet har et overskudd før skatt på {kr(P)} og betaler "
         f"{ps(tA)} selskapsskatt. Alt som er igjen etter skatt, deles ut som utbytte til {navn}. {sats_tekst} "
         f"{skj_tekst}</p>")
    if modus == "samlet":
        riktig = (selsk + E) / P
        kand = [
            (tA / 100 + te, f"Satsene lagt sammen: {ps(tA)} + {ps(te * 100)}. Eierskatten treffer bare det som er igjen "
                            f"etter selskapsskatt, ikke hele overskuddet."),
            (E / P, f"Selskapsskatten utelatt: bare eierskatten {talla(E)} delt på overskuddet {tall(P)}."),
            (E / D, f"Eierskatten delt på utbyttet, {talla(E)}/{tall(D)}. Det er den effektive skatten på utbyttet, "
                    f"ikke den samlede satsen på overskuddet."),
            ((selsk + (D - S) * t / 100) / P, f"Oppjusteringen glemt: eierskatten regnet med {ps(t)} i stedet for "
                                              f"{ps(te * 100)}, ({talla(selsk)} + {talla((D - S) * t / 100)})/{tall(P)}."),
        ]
        if med_skj:
            kand.append(((selsk + D * te) / P, f"Skjermingen glemt: hele utbyttet skattlagt hos eieren, ({talla(selsk)} + "
                                              f"{talla(D * te)})/{tall(P)}."))
        q += (f"<p>Hva er den samlede effektive skattesatsen for selskap og eier under ett, målt mot overskuddet før "
              f"skatt? Rund av til to desimaler.</p>")
    else:
        riktig = E / D
        kand = [
            (te, f"Skjermingen glemt: uten fradrag er skatten på utbyttet bare eierskattesatsen {ps(te * 100)}."),
            (E / P, f"Eierskatten delt på overskuddet før skatt, {talla(E)}/{tall(P)}, i stedet for på utbyttet."),
            ((selsk + E) / P, f"Dette er den samlede satsen for selskap og eier, ({talla(selsk)} + {talla(E)})/{tall(P)}. "
                              f"Spørsmålet gjelder bare skatten på utbyttet."),
            ((D - S) * t / 100 / D, f"Oppjusteringen glemt: ({tall(D)} − {talla(S)}) × {ps(t)}, delt på {tall(D)}."),
        ]
        q += f"<p>Hva er den effektive skatten på utbyttet hos {navn}, altså eierskatten delt på utbyttet? Rund av til to desimaler.</p>"
    r.shuffle(kand)
    valgt = []
    for v, tekst in kand:
        if all(not nær(v, w, 0.03) for w, _ in valgt) and not nær(v, riktig, 0.03):
            valgt.append((v, tekst))
        if len(valgt) == 3:
            break
    if len(valgt) < 3:
        raise Avvis("for få ulike feller")
    alternativer = [R(pst(riktig, 2), riktig)] + [F(pst(v, 2), tekst, v) for v, tekst in valgt]
    vis_ulike(*[a.tekst for a in alternativer])

    skj_steg = (f"<p><b>Steg 3: skjermingen.</b> {tall(K)} × {ps(rs)} = {talla(S)}. Skattepliktig utbytte: "
                f"{tall(D)} − {talla(S)} = {talla(D - S)}.</p>" if med_skj else
                "<p><b>Steg 3: skjermingen.</b> Den skal vi se bort fra, så hele utbyttet er skattepliktig.</p>")
    if modus == "samlet":
        kort = (f"<p><b>{pst(riktig, 2)}.</b> Selskapsskatt {talla(selsk)} pluss eierskatt {talla(E)}, delt på "
                f"overskuddet {tall(P)}.</p>")
        slutt = (f"<p><b>Steg 5: samlet sats.</b> ({talla(selsk)} + {talla(E)})/{tall(P)} = <b>{pst(riktig, 2)}</b>.</p>")
        if med_skj:
            kontroll = (f"<p><b>Kontroll.</b> Uten skjerming ville satsen vært {ps(tA)} + {tn(1 - tA / 100)} × "
                        f"{ps(te * 100)} = {pst(tA / 100 + (1 - tA / 100) * te, 4)}. Skjermingen gjør den lavere. "
                        f"Forskjellen er {talla(S)} × {ps(te * 100)}/{tall(P)} = {pp(S * te / P, 4)}. "
                        f"{pst(tA / 100 + (1 - tA / 100) * te, 4)} − {pp(S * te / P, 4)} = {pst(riktig, 4)}, altså "
                        f"{pst(riktig, 2)}. ✓</p>")
        else:
            kontroll = (f"<p><b>Kontroll.</b> Regn satsen direkte: {ps(tA)} + {tn(1 - tA / 100)} × {ps(te * 100)} = "
                        f"{pst(tA / 100 + (1 - tA / 100) * te, 2)}. ✓ Med dagens satser gir samme formel 51,52 %, litt "
                        f"over toppskatten på lønn.</p>")
    else:
        kort = (f"<p><b>{pst(riktig, 2)}.</b> Eierskatten er ({tall(D)} − {talla(S)}) × {ps(te * 100)} = {talla(E)}. "
                f"Delt på utbyttet {tall(D)} gir det {pst(riktig, 2)}.</p>")
        slutt = (f"<p><b>Steg 5: delt på utbyttet.</b> {talla(E)}/{tall(D)} = <b>{pst(riktig, 2)}</b>. Den er lavere "
                 f"enn {ps(te * 100)} fordi skjermingen tok {talla(S)} ut av grunnlaget.</p>")
        kontroll = (f"<p><b>Kontroll.</b> Som sats: {ps(te * 100)} × (1 − {talla(S)}/{tall(D)}) = {pst(riktig, 2)}. ✓ "
                    f"Den samlede satsen for selskap og eier ville vært ({talla(selsk)} + {talla(E)})/{tall(P)} = "
                    f"{pst((selsk + E) / P, 2)}, et annet spørsmål med en annen nevner.</p>")
    full = (
        f"<p><b>Hva som skattlegges to ganger.</b> Et overskudd som deles ut, skattlegges først i selskapet. Det som er "
        f"igjen, deles ut og skattlegges hos eieren etter skjermingsfradraget, med oppjusteringsfaktoren ganger "
        f"satsen. Den samlede satsen setter begge skattene opp mot overskuddet før skatt.</p>"
        f"<p><b>Steg 1: selskapsskatten.</b> {ps(tA)} × {tall(P)} = {talla(selsk)}.</p>"
        f"<p><b>Steg 2: utbyttet.</b> {tall(P)} − {talla(selsk)} = {tall(D)}.</p>"
        + skj_steg +
        f"<p><b>Steg 4: eierskatten.</b> {talla(D - S)} × {tn(f_)} × {ps(t)} = {talla(E)}. Den andre veien: "
        f"{talla(D - S)} × {ps(te * 100)} = {talla(E)}.</p>"
        + slutt + kontroll +
        f"<p><b>Husk:</b> samlet sats = (selskapsskatt + eierskatt)/overskudd før skatt. Eierskatten treffer bare det som "
        f"er igjen etter selskapsskatten.</p>"
    )
    unik("ska-eff2", alternativer[0].verdi)
    return sporsmal(q, alternativer, kort, full)


# ---------------------------------------------------------------------------
# ska-just1 · Justeringsfaktoren (R3b, H2017 oppgave 2a, H2020 oppgave 1e)
# ---------------------------------------------------------------------------
@familie("ska-just1", tema="skattesystem", antall=5, tittel="Justeringsfaktoren for utbytte")
def _(r):
    tw = r.choice([46.4, 46.7, 47.0, 47.4, 48.0, 49.0])
    tA = r.choice([22, 22, 24, 25])
    t = r.choice([20, 22, 22, 23, 24, 25])
    y = (tw - tA) / ((100 - tA) / 100 * t)
    te = (tw - tA) / (100 - tA)                        # som brøk
    if not 1.15 < y < 2.0:
        raise Avvis("urimelig faktor")
    modus = syklus("ska-just1", ["y", "te", "y", "y", "te"])
    q = (f"<p>Toppskatten på lønn er {ps(tw)}. Et selskap betaler {ps(tA)} skatt av overskuddet og deler ut resten som "
         f"utbytte. Hos eieren skal utbyttet oppjusteres med en faktor y og deretter skattlegges med {ps(t)}. "
         f"Faktoren skal settes slik at samlet skatt på en krone overskudd som deles ut, blir lik toppskatten på "
         f"lønn. Se bort fra skjermingsfradraget.</p>")
    if modus == "y":
        q += "<p>Hvilken oppjusteringsfaktor y oppfyller kravet? Rund av til to desimaler.</p>"
        f1 = (tw - tA) / t
        f2 = tw / ((100 - tA) / 100 * t)
        f3 = tw / t
        ulike(y, f1, f2, f3, rel=0.03)
        alternativer = [
            R(tall(y, 2), y),
            F(tall(f1, 2), f"Glemt at eierskatten bare treffer det som er igjen etter selskapsskatt: ({tn(tw)} − {tn(tA)})/"
              f"{tn(t)}. Nevneren skal ha med {tn((100 - tA) / 100)}.", f1),
            F(tall(f2, 2), f"Selskapsskatten er ikke trukket fra toppskatten: {tn(tw / 100, 3)}/({tn((100 - tA) / 100)} × "
              f"{tn(t / 100)}). Da betales selskapsskatten to ganger.", f2),
            F(tall(f3, 2), f"Selskapsskatten helt utelatt, y × {ps(t)} = {ps(tw)}: {tn(tw)}/{tn(t)}. Overskuddet er alt "
              f"skattlagt i selskapet.", f3),
        ]
        kort = (f"<p><b>{tall(y, 2)}.</b> Løs {tn(tw / 100, 3)} = {tn(tA / 100)} + {tn((100 - tA) / 100)} × y × "
                f"{tn(t / 100)}: y = ({tn(tw / 100, 3)} − {tn(tA / 100)})/({tn((100 - tA) / 100)} × {tn(t / 100)}) = "
                f"{tall(y, 2)}.</p>")
        svar_linje = f"y = {tall((tw - tA) / 100, 3)}/{tall((100 - tA) / 100 * t / 100, 4)} = <b>{tall(y, 2)}</b>"
    else:
        q += "<p>Hvor høy blir da den effektive eierskatten y × t på utbytte? Rund av til to desimaler.</p>"
        f1 = (tw - tA) / 100
        f2 = tw / 100
        f3 = t / 100
        ulike(te, f1, f2, f3, rel=0.03)
        alternativer = [
            R(pst(te, 2), te),
            F(pst(f1, 2), f"Toppskatten minus selskapsskatten, {ps(tw)} − {ps(tA)}, uten å dele på {tn((100 - tA) / 100)}. "
              f"Eierskatten treffer bare de {tn(100 - tA)} kronene som er igjen etter selskapsskatt.", f1),
            F(pst(f2, 2), f"Eierskatten satt lik toppskatten på lønn. Da blir samlet skatt på utdelt overskudd langt over "
              f"{ps(tw)}, fordi selskapet alt har betalt {ps(tA)}.", f2),
            F(pst(f3, 2), f"Oppjusteringen glemt: bare den nominelle satsen {ps(t)}. Den gir for lav samlet skatt.", f3),
        ]
        kort = (f"<p><b>{pst(te, 2)}.</b> Eierskatten t<sub>e</sub> må oppfylle {ps(tA)} + {tn((100 - tA) / 100)} × "
                f"t<sub>e</sub> = {ps(tw)}, så t<sub>e</sub> = ({tn(tw)} − {tn(tA)})/{tn(100 - tA)} = {pst(te, 2)}.</p>")
        svar_linje = (f"y = {tall(y, 4)}. Eierskatten blir y × {ps(t)} = <b>{pst(te, 2)}</b>. Raskere: "
                      f"t<sub>e</sub> = ({tn(tw)} − {tn(tA)})/{tn(100 - tA)}")
    full = (
        f"<p><b>Hva faktoren skal gjøre.</b> En krone tjent i selskapet og delt ut skattlegges to ganger: først med "
        f"selskapsskatten, så med eierskatten på det som er igjen. Uten oppjustering ville samlet skatt ligget langt "
        f"under toppskatten på lønn. Da ville eiere av egne selskaper tatt ut lønn som utbytte. Faktoren y løfter "
        f"eierskatten slik at de to veiene koster det samme.</p>"
        f"<p><b>Steg 1: likningen.</b> Samlet skatt på utbytte = t<sub>A</sub> + (1 − t<sub>A</sub>) × y × t. "
        f"Sett den lik toppskatten: {tn(tw / 100, 3)} = {tn(tA / 100)} + {tn((100 - tA) / 100)} × y × {tn(t / 100)}.</p>"
        f"<p><b>Steg 2: løs for y.</b> y = (t<sub>w</sub> − t<sub>A</sub>)/((1 − t<sub>A</sub>) × t) = "
        f"({tn(tw / 100, 3)} − {tn(tA / 100)})/({tn((100 - tA) / 100)} × {tn(t / 100)}).</p>"
        f"<p><b>Steg 3: regn ut.</b> {svar_linje}.</p>"
        f"<p><b>Kontroll.</b> Sett svaret inn igjen: {ps(tA)} + {tn((100 - tA) / 100)} × {tall(y, 4)} × {ps(t)} = "
        f"{tn(tA)} % + {tall((100 - tA) / 100 * y * t, 2)} % = {tall(tA + (100 - tA) / 100 * y * t, 2)} %, som er "
        f"toppskatten. ✓ Dagens faktor 1,72 er høyere enn 1,48 som samme regning gir med 47,4 % og 22 %. Forskjellen "
        f"forklares med arbeidsgiveravgiften som veltes over på lønnstakeren.</p>"
        f"<p><b>Husk:</b> y = (t<sub>w</sub> − t<sub>A</sub>)/((1 − t<sub>A</sub>) × t). Eierskatten treffer bare "
        f"(1 − t<sub>A</sub>) av overskuddet.</p>"
    )
    unik("ska-just1", alternativer[0].verdi)
    return sporsmal(q, alternativer, kort, full)


# ---------------------------------------------------------------------------
# ska-eier1 · Eierens effektive sats med eierandel og tilbakeholdt overskudd (R3a, kj1)
# ---------------------------------------------------------------------------
@familie("ska-eier1", tema="skattesystem", antall=5, tittel="Eierens effektive skattesats med eierandel")
def _(r):
    navn = r.choice(NAVN)
    firma = r.choice(FIRMA)
    tA, te = 22, 37.84
    alfa = r.choice([25, 40, 50, 60, 75])
    Rinnt = r.randrange(1_000_000, 6_000_001, 200_000)
    A = r.randrange(int(Rinnt * 0.1 / 50_000 + 1) * 50_000, int(Rinnt * 0.3 / 50_000) * 50_000 + 1, 50_000)
    overskudd = Rinnt - A
    sskatt = tA / 100 * overskudd
    maks_D = overskudd - sskatt
    D = r.randrange(int(maks_D * 0.2 / 50_000 + 1) * 50_000, int(maks_D * 0.9 / 50_000) * 50_000 + 1, 50_000)
    eget_D = alfa / 100 * D
    eget_skatt = eget_D * te / 100
    med_lonn = r.random() < 0.5
    if med_lonn:
        W = r.randrange(400_000, 900_001, 50_000)
        TW = round(W * r.choice([0.25, 0.27, 0.28, 0.30]) / 1000) * 1000
    else:
        W, TW = 0, 0
    teller = alfa / 100 * sskatt + eget_skatt + TW
    nevner = alfa / 100 * Rinnt + W
    riktig = teller / nevner
    f_alfa = (sskatt + eget_skatt + TW) / (Rinnt + W)
    f_skpl = teller / (alfa / 100 * overskudd + W)
    f_bare = (eget_skatt + TW) / (eget_D + W)
    ulike(riktig, f_alfa, f_skpl, f_bare, rel=0.03)
    if riktig >= f_bare:
        raise Avvis("kontrollen mot skattemeldingen ville ikke holdt")
    lonn_tekst = (f" {navn} har i tillegg {kr(W)} i lønn og betaler {kr(TW)} i skatt på lønnen." if med_lonn
                  else f" {navn} har ingen andre inntekter.")
    q = (f"<p>{navn} eier {alfa} % av aksjene i {firma}. I år har selskapet driftsinntekter på {kr(Rinnt)}, "
         f"avskrivninger på {kr(A)} og ingen andre kostnader. Selskapet betaler {ps(tA)} selskapsskatt og deler ut "
         f"{kr(D)} i utbytte. Resten holdes tilbake i selskapet.{lonn_tekst} Eierskatten på utbytte er 37,84 % "
         f"(1,72 × 22 %). Se bort fra skjerming og personfradrag.</p>"
         f"<p>Hva er {gen(navn)} effektive skattesats når selskapets skatt og driftsinntekter regnes med etter "
         f"eierandelen, slik kurset gjør for eiere? Rund av til to desimaler.</p>")
    lonn_ledd_t = f" + {tall(TW)}" if med_lonn else ""
    lonn_ledd_n = f" + {tall(W)}" if med_lonn else ""
    alternativer = [
        R(pst(riktig, 2), riktig),
        F(pst(f_alfa, 2), f"Eierandelen glemt: hele selskapets skatt og hele driftsinntekten tatt med, "
          f"({talla(sskatt)} + {talla(eget_skatt)}{lonn_ledd_t})/" + (f"({tall(Rinnt)}{lonn_ledd_n})" if med_lonn else
                                                                       tall(Rinnt)) + ".", f_alfa),
        F(pst(f_skpl, 2), f"Nevneren er eierandelen av det skattepliktige overskuddet, ikke av driftsinntektene. "
          f"Avskrivningen hører ikke hjemme i nevneren.", f_skpl),
        F(pst(f_bare, 2), f"Bare det som står på {gen(navn)} skattemelding: "
          + (f"({talla(eget_skatt)}{lonn_ledd_t})/({talla(eget_D)}{lonn_ledd_n})" if med_lonn else
             f"{talla(eget_skatt)}/{talla(eget_D)}")
          + ". Selskapets skatt og det tilbakeholdte overskuddet er utelatt.", f_bare),
    ]
    kort = (f"<p><b>{pst(riktig, 2)}.</b> Teller: {alfa} % × {talla(sskatt)} + {talla(eget_skatt)}{lonn_ledd_t} = "
            f"{talla(teller)}. Nevner: {alfa} % × {tall(Rinnt)}{lonn_ledd_n} = {talla(nevner)}.</p>")
    full = (
        f"<p><b>Hvorfor selskapet regnes med.</b> For en eier er det skattemeldingen viser, bare en del av bildet. "
        f"Selskapet betaler skatt på overskuddet. Det som holdes tilbake, er eierens formue enten det tas ut eller "
        f"ikke. Kursets mål tar derfor med eierandelen av selskapets skatt i telleren og eierandelen av selskapets "
        f"driftsinntekter i nevneren. Utbyttet telles ikke en gang til i nevneren, for det er en del av selskapets "
        f"inntekt.</p>"
        f"<p><b>Steg 1: selskapets skatt.</b> ({tall(Rinnt)} − {tall(A)}) × {ps(tA)} = {talla(sskatt)}. "
        f"{gen(navn)} andel: {alfa} % × {talla(sskatt)} = {talla(alfa / 100 * sskatt)}.</p>"
        f"<p><b>Steg 2: eierens egen skatt.</b> Utbyttet til {navn} er {alfa} % × {tall(D)} = {talla(eget_D)}. "
        f"Skatten er {talla(eget_D)} × 37,84 % = {talla(eget_skatt)}."
        + (f" I tillegg kommer skatten på lønnen, {tall(TW)}." if med_lonn else "") + "</p>"
        f"<p><b>Steg 3: brøken.</b> ({talla(alfa / 100 * sskatt)} + {talla(eget_skatt)}{lonn_ledd_t})/"
        f"({talla(alfa / 100 * Rinnt)}{lonn_ledd_n}) = {talla(teller)}/{talla(nevner)} = <b>{pst(riktig, 2)}</b>.</p>"
        f"<p><b>Kontroll.</b> Svaret skal ligge under det skattemeldingen alene gir, {pst(f_bare, 2)}, fordi det "
        f"tilbakeholdte overskuddet bare er skattlagt med {ps(tA)}. Det gjør det. ✓ Deler du opp, er selskapsdelen "
        f"{talla(alfa / 100 * sskatt)} av {talla(teller)} i telleren. Uten den ville satsen falt til "
        f"{pst((eget_skatt + TW) / nevner, 2)}.</p>"
        f"<p><b>Husk:</b> t<sub>eff</sub> = (α × selskapets skatt + egen skatt)/(α × selskapets driftsinntekter + "
        f"andre inntekter).</p>"
    )
    unik("ska-eier1", float(alternativer[0].tekst.split()[0].replace(",", ".")))   # vist tekst, ikke råverdi
    return sporsmal(q, alternativer, kort, full)


# ---------------------------------------------------------------------------
# ska-fradr1 · Nåverdien av et fradrag: ta det med en gang eller fordele det (R8, H2024 oppgave 3)
# ---------------------------------------------------------------------------
@familie("ska-fradr1", tema="skattesystem", antall=5, tittel="Nåverdien av et fradrag")
def _(r):
    navn = r.choice(["Turid", "Pia", "Geir", "Anne", "Rune", "Hilde", "Arne", "Liv"])
    ting = r.choice(["en maskin", "et ventilasjonsanlegg", "driftsmidler", "et nytt tak på utleiebygget"])
    Dfr = r.choice([100_000, 120_000, 150_000, 200_000, 250_000, 300_000, 400_000, 500_000])
    T = r.choice([3, 4, 5, 5, 8, 10])
    rho = r.choice([4, 5, 6, 8, 10])
    t = r.choice([22, 22, 22, 25, 34])
    a = Dfr / T
    if a != int(a):
        raise Avvis("ujevn avskrivning")
    AF = annuitetsfaktor(rho / 100, T)
    SF = ((1 + rho / 100) ** T - 1) / (rho / 100)
    nu = Dfr * t / 100
    nv = a * t / 100 * AF
    modus = syklus("ska-fradr1", ["diff", "nv", "diff", "diff", "nv"])
    q = (f"<p>{navn} har kjøpt {ting} for {kr(Dfr)} og kan velge mellom å utgiftsføre hele beløpet med en gang eller "
         f"avskrive {kr(a)} i året i {T} år. {navn} har rikelig med skattepliktig inntekt å trekke fradraget fra i "
         f"alle årene. Fradraget virker mot en skattesats på {ps(t)}. {navn} diskonterer med {ps(rho)}. Tas alt med "
         f"en gang, kommer skattebesparelsen i dag. Avskrives det, kommer besparelsen ved slutten av hvert av årene 1 "
         f"til {T}.</p>")
    if modus == "diff":
        riktig = nu - nv
        f_null = 0.0
        f_nv = nv
        f_utenskatt = Dfr - a * AF
        ulike(riktig, f_nv, f_utenskatt, rel=0.03)
        q += f"<p>Hvor mye mer er det verdt i nåverdi å ta hele fradraget med en gang? Rund av til hele kroner.</p>"
        alternativer = [
            R(kr(riktig), riktig),
            F(kr(f_null), f"Udiskonterte kroner sammenlignet: {T} × {talla(a * t / 100)} = {talla(nu)}, det samme som å ta "
              f"alt nå. Det er riktig bare når renten er null.", f_null),
            F(kr(f_nv), f"Dette er nåverdien av å avskrive, {talla(a * t / 100)} × {tall(AF, 4)}, et mellomtall. "
              f"Spørsmålet ber om forskjellen fra {talla(nu)}.", f_nv),
            F(kr(f_utenskatt), f"Regnet på fradragene i stedet for på skattebesparelsen: {tall(Dfr)} − {tall(a)} × "
              f"{tall(AF, 4)}. Fradraget er verdt satsen ganger beløpet, ikke hele beløpet.", f_utenskatt),
        ]
        kort = (f"<p><b>{kr(riktig)}.</b> Alt nå sparer {tall(Dfr)} × {ps(t)} = {talla(nu)} i dag. Fordelt er "
                f"nåverdien {talla(a * t / 100)} × {tall(AF, 4)} = {kr(nv)}. Forskjellen er {kr(riktig)}.</p>")
        svar = (f"<p><b>Steg 3: forskjellen.</b> {talla(nu)} − {tall(nv)} = <b>{kr(riktig)}</b> i favør av å ta alt "
                f"med en gang.</p>")
    else:
        riktig = nv
        f_sum = nu
        f_uten = a * AF
        f_sf = a * t / 100 * SF
        ulike(riktig, f_sum, f_uten, f_sf, rel=0.03)
        q += f"<p>Hva er nåverdien av skattebesparelsene hvis {navn} velger å avskrive? Rund av til hele kroner.</p>"
        alternativer = [
            R(kr(riktig), riktig),
            F(kr(f_sum), f"Summen av besparelsene uten diskontering: {T} × {talla(a * t / 100)} = {talla(nu)}. Senere "
              f"kroner er verdt mindre enn kroner i dag.", f_sum),
            F(kr(f_uten), f"Satsen glemt: {tall(a)} × {tall(AF, 4)} er nåverdien av fradragene, ikke av "
              f"skattebesparelsen.", f_uten),
            F(kr(f_sf), f"Sluttverdifaktoren brukt i stedet for annuitetsfaktoren: {talla(a * t / 100)} × {tall(SF, 4)}. "
              f"Det er verdien om {T} år, ikke i dag.", f_sf),
        ]
        kort = (f"<p><b>{kr(riktig)}.</b> Hvert år sparer {navn} {tall(a)} × {ps(t)} = {talla(a * t / 100)}. "
                f"Nåverdien er {talla(a * t / 100)} × {tall(AF, 4)} = {kr(riktig)}.</p>")
        svar = (f"<p><b>Steg 3: sammenlign.</b> Alt nå gir {talla(nu)} i dag, mer enn <b>{kr(riktig)}</b>. Kronene er de "
                f"samme, men de kommer senere.</p>")
    full = (
        f"<p><b>Hva et fradrag er verdt.</b> Et fradrag er ikke penger. Det er en skattebesparelse: fradraget ganger "
        f"satsen det virker mot. En skattebesparelse er en kontantstrøm som alle andre, så den skal diskonteres. Tar du "
        f"fradraget tidlig, betaler du mindre skatt nå og mer senere. Det er et rentefritt lån fra staten.</p>"
        f"<p><b>Steg 1: alt med en gang.</b> {tall(Dfr)} × {ps(t)} = {talla(nu)}, mottatt i dag.</p>"
        f"<p><b>Steg 2: fordelt.</b> Hvert år {tall(a)} × {ps(t)} = {talla(a * t / 100)}. Annuitetsfaktoren for {T} år "
        f"ved {ps(rho)} er [1 − {tn(1 + rho / 100)}<sup>−{T}</sup>]/{tn(rho / 100)} = {tall(AF, 4)}. Nåverdi: "
        f"{talla(a * t / 100)} × {tall(AF, 4)} = {tall(nv)}.</p>"
        + svar +
        f"<p><b>Kontroll.</b> Udiskontert er alternativene like: {T} × {talla(a * t / 100)} = {talla(nu)}. Forskjellen "
        f"i nåverdi er derfor ren rente og må være positiv når renten er positiv. Den må også være mindre enn "
        f"{talla(nu)}, siden det fordelte alternativet har positiv verdi. ✓</p>"
        f"<p><b>Husk:</b> ta fradraget så tidlig som inntekten tillater. Forbeholdene er at det må finnes inntekt å "
        f"trekke det fra og at satsen ikke er høyere senere.</p>"
    )
    unik("ska-fradr1", alternativer[0].verdi)
    return sporsmal(q, alternativer, kort, full)


# ---------------------------------------------------------------------------
# ska-rente1 · Renter mot aksjeavkastning etter skatt (kj1)
# ---------------------------------------------------------------------------
@familie("ska-rente1", tema="skattesystem", antall=5, tittel="Rente mot aksjeavkastning etter skatt")
def _(r):
    modus = syklus("ska-rente1", ["rente", "kroner", "omvendt", "rente", "kroner"])
    navn = r.choice(NAVN)
    t, te = 0.22, 0.3784
    if modus == "rente":
        i = r.choice([2.5, 3.0, 3.25, 3.5, 3.75, 4.0, 4.25, 4.5, 4.75, 5.0, 5.25, 5.5, 6.0, 6.5])
        riktig = i / 100 * (1 - t) / (1 - te)
        f_bank = i / 100 * (1 - t)
        f_uten = i / 100 / (1 - te)
        f_snudd = i / 100 * (1 - te) / (1 - t)
        ulike(riktig, f_bank, f_uten, f_snudd, rel=0.015)
        q = (f"<p>{navn} har sparepenger i banken til {ps(i)} rente. Renteinntekter skattlegges med 22 %. Et aksjefond "
             f"skattlegges med 37,84 % av hele avkastningen (1,72 × 22 %). Se bort fra skjermingsfradraget.</p>"
             f"<p>Hvor høy avkastning før skatt må aksjefondet gi for at {navn} skal sitte igjen med like mye etter "
             f"skatt som i banken? Rund av til to desimaler.</p>")
        alternativer = [
            R(pst(riktig, 2), riktig),
            F(pst(f_bank, 2), f"Bankrenten etter skatt: {ps(i)} × 0,78. Det er det fondet må gi <i>etter</i> skatt, ikke "
              f"før.", f_bank),
            F(pst(f_uten, 2), f"Glemt at bankrenten også skattlegges: {ps(i)}/0,6216.", f_uten),
            F(pst(f_snudd, 2), f"Brøken snudd: {ps(i)} × 0,6216/0,78. Det gir fondet et lavere krav enn banken, selv om "
              f"fondet skattlegges hardere.", f_snudd),
        ]
        kort = (f"<p><b>{pst(riktig, 2)}.</b> Banken gir {ps(i)} × 0,78 = {pst(f_bank, 3)} etter skatt. Fondet må gi "
                f"r × 0,6216 = {pst(f_bank, 3)}, så r = {pst(riktig, 2)}.</p>")
        steg = (f"<p><b>Steg 1: banken etter skatt.</b> {ps(i)} × (1 − 22 %) = {ps(i)} × 0,78 = {pst(f_bank, 3)}.</p>"
                f"<p><b>Steg 2: fondet må gi det samme etter 37,84 %.</b> r × (1 − 37,84 %) = r × 0,6216 = "
                f"{pst(f_bank, 3)}. Da er r = {pst(f_bank, 3)}/0,6216 = <b>{pst(riktig, 2)}</b>.</p>"
                f"<p><b>Kontroll.</b> Forholdet {pst(riktig, 4)}/{ps(i)} er {tall(riktig * 100 / i, 4)}, som er "
                f"0,78/0,6216 = 1,2548. ✓ Det forholdet gjelder for alle renter.</p>")
    elif modus == "kroner":
        Y = r.randrange(15_000, 200_001, 5_000)
        riktig = Y * (1 - t) / (1 - te)
        f_lik = Y
        f_uten = Y / (1 - te)
        f_snudd = Y * (1 - te) / (1 - t)
        ulike(riktig, f_lik, f_uten, f_snudd, rel=0.015)
        q = (f"<p>{navn} får {kr(Y)} i renteinntekt i år, skattlagt med 22 %. Aksjegevinster skattlegges med 37,84 % "
             f"(1,72 × 22 %). Se bort fra skjermingsfradraget.</p>"
             f"<p>Hvor stor aksjegevinst måtte {navn} hatt for å sitte igjen med like mye etter skatt som renteinntekten "
             f"gir? Rund av til hele kroner.</p>")
        alternativer = [
            R(kr(riktig), riktig),
            F(kr(f_lik), f"Like store beløp før skatt. Aksjegevinsten skattlegges hardere, så den må være større.", f_lik),
            F(kr(f_uten), f"Glemt at renteinntekten også skattlegges: {tall(Y)}/0,6216.", f_uten),
            F(kr(f_snudd), f"Brøken snudd: {tall(Y)} × 0,6216/0,78. Det gir en gevinst som er mindre enn renten, selv om "
              f"gevinsten skattlegges hardere.", f_snudd),
        ]
        kort = (f"<p><b>{kr(riktig)}.</b> Renten gir {tall(Y)} × 0,78 = {talla(Y * 0.78)} etter skatt. Gevinsten G må "
                f"oppfylle G × 0,6216 = {talla(Y * 0.78)}, så G = {kr(riktig)}.</p>")
        steg = (f"<p><b>Steg 1: renten etter skatt.</b> {tall(Y)} × (1 − 22 %) = {talla(Y * 0.78)}.</p>"
                f"<p><b>Steg 2: gevinsten som gir det samme.</b> G × 0,6216 = {talla(Y * 0.78)}, så G = "
                f"{talla(Y * 0.78)}/0,6216 = <b>{kr(riktig)}</b>.</p>"
                f"<p><b>Kontroll.</b> {tall(riktig)} × 37,84 % = {tall(riktig * te)} i skatt. {tall(riktig)} − "
                f"{tall(riktig * te)} = {tall(riktig * (1 - te))}, som er renten etter skatt. ✓</p>")
    else:
        x = r.choice([5.0, 6.0, 6.5, 7.0, 7.5, 8.0, 9.0, 10.0, 12.0])
        riktig = x / 100 * (1 - te) / (1 - t)
        f_fond = x / 100 * (1 - te)
        f_lik = x / 100
        f_snudd = x / 100 * (1 - t) / (1 - te)
        ulike(riktig, f_fond, f_lik, f_snudd, rel=0.015)
        q = (f"<p>{navn} venter at et aksjefond gir {ps(x)} avkastning før skatt. Avkastningen på fondet skattlegges med "
             f"37,84 % (1,72 × 22 %). Renteinntekter skattlegges med 22 %. Se bort fra skjermingsfradraget.</p>"
             f"<p>Hvor høy bankrente må {navn} få for å sitte igjen med like mye etter skatt som i fondet? Rund av til "
             f"to desimaler.</p>")
        alternativer = [
            R(pst(riktig, 2), riktig),
            F(pst(f_fond, 2), f"Fondets avkastning etter skatt: {ps(x)} × 0,6216. Det er det banken må gi <i>etter</i> "
              f"skatt, ikke rentesatsen før skatt.", f_fond),
            F(pst(f_lik, 2), f"Samme sats før skatt. Renter skattlegges lettere enn aksjeavkastning, så banken kan gi "
              f"mindre og likevel holde følge.", f_lik),
            F(pst(f_snudd, 2), f"Brøken snudd: {ps(x)} × 0,78/0,6216. Da må banken gi mer enn fondet, selv om renter "
              f"skattlegges lettere.", f_snudd),
        ]
        kort = (f"<p><b>{pst(riktig, 2)}.</b> Fondet gir {ps(x)} × 0,6216 = {pst(f_fond, 3)} etter skatt. Banken må gi "
                f"i × 0,78 = {pst(f_fond, 3)}, så i = {pst(riktig, 2)}.</p>")
        steg = (f"<p><b>Steg 1: fondet etter skatt.</b> {ps(x)} × (1 − 37,84 %) = {ps(x)} × 0,6216 = {pst(f_fond, 3)}.</p>"
                f"<p><b>Steg 2: banken må gi det samme etter 22 %.</b> i × 0,78 = {pst(f_fond, 3)}, så i = "
                f"{pst(f_fond, 3)}/0,78 = <b>{pst(riktig, 2)}</b>.</p>"
                f"<p><b>Kontroll.</b> {ps(x)}/{pst(riktig, 4)} = {tall(x / 100 / riktig, 4)}, som er 0,78/0,6216 = "
                f"1,2548. ✓ Bankrenten skal være lavere enn fondets avkastning, fordi den skattlegges lettere.</p>")
    full = (
        f"<p><b>Hvorfor satsene er ulike.</b> Renter skattlegges én gang, med 22 %. Utbytte og aksjegevinst kommer fra "
        f"et overskudd som alt er skattlagt i selskapet. De skattlegges hos eieren med 1,72 × 22 % = 37,84 %. For deg "
        f"som sparer, er det avkastningen etter skatt som teller. Skal aksjene være like gode, må de gi mer før skatt: "
        f"r<sub>aksje</sub>/r<sub>rente</sub> = 0,78/0,6216 = 1,2548. Skatt opp virker som rente ned.</p>"
        + steg +
        f"<p><b>Husk:</b> sammenlign alltid etter skatt. Renter × 0,78, aksjeavkastning × 0,6216.</p>"
    )
    unik("ska-rente1", alternativer[0].verdi)
    return sporsmal(q, alternativer, kort, full)


# ---------------------------------------------------------------------------
# ska-real1 · Realavkastning etter skatt (k2: nominelt, så skatt, så realt)
# ---------------------------------------------------------------------------
@familie("ska-real1", tema="skattesystem", antall=5, tittel="Realavkastning etter skatt")
def _(r):
    navn = r.choice(NAVN)
    aktivum, t, sats_tekst = r.choice([
        ("et bankinnskudd", 0.22, "Renteinntekter skattlegges med 22 %."),
        ("en obligasjon", 0.22, "Renteinntektene skattlegges med 22 %."),
        ("et aksjefond", 0.3784, "Avkastningen skattlegges med 37,84 % (1,72 × 22 %). Se bort fra skjermingsfradraget."),
        ("et aksjefond", 0.3784, "Avkastningen skattlegges med 37,84 % (1,72 × 22 %). Se bort fra skjermingsfradraget."),
    ])
    if t > 0.3:
        i = r.choice([5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 14.0, 15.0])
    else:
        i = r.choice([2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 7.0, 8.0])
    pi = r.choice([1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 6.0, 7.0])
    if abs(i - pi) < 0.5:
        raise Avvis("rente lik inflasjon gir et tomt spørsmål")
    riktig = (1 + i / 100 * (1 - t)) / (1 + pi / 100) - 1
    f_for = (1 + i / 100) / (1 + pi / 100) - 1
    st = ps(t * 100)
    kand = [
        (i / 100 * (1 - t) - pi / 100, f"Tilnærmingen r ≈ i − π brukt etter skatt: {ps(i)} × (1 − {st}) − {ps(pi)}. "
                                       f"Den bommer med omtrent r × π. Oppgaven ber om to desimaler."),
        (f_for * (1 - t), f"Skatten lagt på realavkastningen i stedet for på den nominelle: {pst(f_for, 2)} × (1 − {st}). "
                          f"Skatten beregnes av nominelle kroner."),
        (f_for, f"Realavkastningen før skatt: {tn(1 + i / 100, 3)}/{tn(1 + pi / 100, 3)} − 1. Skatten er ikke trukket fra."),
        (i / 100 * (1 - t), f"Nominell avkastning etter skatt: {ps(i)} × (1 − {st}). Inflasjonen er ikke trukket ut."),
        ((i - pi) / 100, f"Tilnærmet realavkastning før skatt, {ps(i)} − {ps(pi)}. Både skatten og den eksakte formelen "
                         f"mangler."),
    ]
    valgt = []
    for v, tekst in kand:
        if abs(v - riktig) >= 0.0004 and all(abs(v - w) >= 0.0004 for w, _ in valgt):
            valgt.append((v, tekst))
        if len(valgt) == 3:
            break
    if len(valgt) < 3:
        raise Avvis("for få ulike feller")
    q = (f"<p>{navn} har pengene i {aktivum} som gir {ps(i)} nominell avkastning i år. {sats_tekst} Inflasjonen er "
         f"{ps(pi)}.</p>"
         f"<p>Hva er {gen(navn)} realavkastning etter skatt? Rund av til to desimaler.</p>")
    alternativer = [R(pst(riktig, 2), riktig)] + [F(pst(v, 2), tekst, v) for v, tekst in valgt]
    vis_ulike(*[a.tekst for a in alternativer])
    ietter = i / 100 * (1 - t)
    kort = (f"<p><b>{pst(riktig, 2)}.</b> Nominelt etter skatt: {ps(i)} × (1 − {st}) = {pst(ietter, 3)}. Realt: "
            f"{tall(1 + ietter, 5)}/{tn(1 + pi / 100, 3)} − 1 = {pst(riktig, 2)}.</p>")
    if f_for > 0.001:
        kontroll = (f"<p><b>Kontroll.</b> Før skatt er realavkastningen {pst(f_for, 2)}. Skatten tar {pp(f_for - riktig)} "
                    f"av den, altså {pst((f_for - riktig) / f_for, 1)} av realavkastningen. Formelen t × i/(i − π) = "
                    f"{st} × {tn(i)}/{tn(i - pi)} gir det samme, {pst(t * i / (i - pi), 1)}. ✓ Skatten på "
                    f"realavkastningen er høyere enn satsen fordi inflasjonsdelen også skattlegges.</p>")
    else:
        kontroll = (f"<p><b>Kontroll.</b> Inflasjonen på {ps(pi)} er minst like stor som renten på {ps(i)}. Realavkastningen "
                    f"er da null eller negativ allerede før skatt ({pst(f_for, 2)}). Skatten gjør den enda lavere. "
                    f"Alle positive alternativer kan strykes med en gang. ✓</p>")
    full = (
        f"<p><b>Rekkefølgen.</b> Skatten regnes av den nominelle avkastningen. Skatteetaten spør hva du fikk i kroner, "
        f"ikke hva kronene var verdt. Derfor trekkes skatten fra først. Inflasjonen deles ut etterpå: nominelt, så "
        f"etter skatt, så realt. Snur du rekkefølgen, later du som om staten gir fradrag for prisstigning.</p>"
        f"<p><b>Steg 1: nominelt etter skatt.</b> {ps(i)} × (1 − {st}) = {pst(ietter, 3)}.</p>"
        f"<p><b>Steg 2: realt.</b> (1 + {pst(ietter, 3)})/(1 + {ps(pi)}) − 1 = {tall(1 + ietter, 5)}/"
        f"{tn(1 + pi / 100, 3)} − 1 = <b>{pst(riktig, 2)}</b>.</p>"
        + kontroll +
        f"<p><b>Husk:</b> r<sub>etter</sub> = (1 + i(1 − t))/(1 + π) − 1. Nominelt, skatt, realt.</p>"
    )
    unik("ska-real1", alternativer[0].verdi)
    return sporsmal(q, alternativer, kort, full)


# ===========================================================================
# STATISKE SPØRSMÅL
# ===========================================================================

statisk(
    "ska-s01", tema="skattesystem", type="begrep",
    q="<p>Ola har en marginalskatt på 43,3 % og en gjennomsnittsskatt på 27 %. Hva betyr de to tallene?</p>",
    alternativer=[
        R("Av neste krone han tjener, går 43,3 øre i skatt. Av hele inntekten går 27 % til skatt"),
        F("Han betaler 43,3 % av hele inntekten i skatt. Av neste krone han tjener, går 27 øre i skatt",
          "Byttet om. Marginalskatten gjelder neste krone, gjennomsnittsskatten hele inntekten."),
        F("Lønnen hans skattlegges med 43,3 %, mens renter og utbytte skattlegges med 27 %",
          "Marginal- og gjennomsnittsskatt handler om samme inntekt målt på to måter, ikke om ulike inntektsarter."),
        F("Inntekten over siste innslagspunkt skattlegges med 43,3 %, resten av inntekten med 27 % i snitt",
          "Halvveis riktig om marginalskatten, men 27 % er snittet over <i>hele</i> inntekten, ikke over delen under "
          "innslagspunktet."),
    ],
    kort="<p><b>Neste krone mot hele inntekten.</b> Marginalskatten er ΔT/ΔY, skatten på neste krone. "
         "Gjennomsnittsskatten er T/Y, andelen av hele inntekten som går til skatt.</p>",
    full="<p><b>To størrelser, to spørsmål.</b> Marginalskatten svarer på hva skatten øker med når du tjener én krone "
         "til: ΔT/ΔY. Den styrer valg på marginen, som overtid, et ekstra oppdrag eller et lønnstillegg. "
         "Gjennomsnittsskatten svarer på hvor stor del av inntekten som går til skatt: T/Y. Den sier hvor tung skatten "
         "er samlet.</p>"
         "<p><b>Hvorfor de er ulike.</b> Gjennomsnittet inneholder også de første kronene dine. De er skattlagt lavere, "
         "fordi personfradraget og minstefradraget skjermer dem og de lave trinnene i trinnskatten treffer dem. Den "
         "neste kronen havner derimot i det høyeste trinnet du er i. I et system med fradrag eller trinn er "
         "marginalskatten derfor høyere enn gjennomsnittsskatten.</p>"
         "<p><b>Ola som eksempel.</b> 43,3 % er 22 % + 7,6 % trygdeavgift + 13,7 % i trinn 3 med 2026-satsene. Får han "
         "kr 10 000 i lønnstillegg, betaler han 4 330 i skatt av det. Det sier ingenting om at han betaler 43,3 % av alt "
         "han tjener. Av hele lønnen går bare 27 % til skatt.</p>"
         "<p><b>Kontroll.</b> Gjennomsnittsskatten kan aldri ligge over marginalskatten i et progressivt system. Et "
         "alternativ som gjør gjennomsnittet høyest, er derfor alltid galt.</p>"
         "<p><b>Husk:</b> marginal = skatten på neste krone. Gjennomsnitt = skatt delt på hele inntekten.</p>",
)

statisk(
    "ska-s02", tema="skattesystem", type="begrep",
    q="<p>Hva betyr det at et skattesystem er progressivt?</p>",
    alternativer=[
        R("Andelen av inntekten som går til skatt, øker med inntekten"),
        F("Den som tjener mest, betaler flest kroner i skatt",
          "Det gjelder også en flat sats uten fradrag, som er proporsjonal. Progressivitet måles i andel, ikke i kroner."),
        F("Skatten på neste krone er den samme for alle som har inntekt over bunnfradraget",
          "Det beskriver en flat sats. Med bunnfradrag er en slik ordning progressiv, men det er ikke definisjonen."),
        F("Alle betaler samme andel av inntekten, men de rike betaler flere kroner",
          "Det er et proporsjonalt system. Gjennomsnittsskatten er konstant."),
    ],
    kort="<p><b>Gjennomsnittsskatten stiger med inntekten.</b> Progressivt: t̄(Y) = T(Y)/Y øker med Y. Proporsjonalt: "
         "konstant. Regressivt: fallende.</p>",
    full="<p><b>Definisjonen.</b> Et skattesystem er progressivt når gjennomsnittsskatten, T(Y)/Y, stiger med inntekten. "
         "Den som tjener mer, betaler da en større <i>andel</i> av inntekten i skatt. Er andelen lik for alle, er systemet "
         "proporsjonalt. Faller den, er det regressivt.</p>"
         "<p><b>Fella er kronene.</b> En flat skatt på 25 % uten fradrag tar 250 kroner av 1 000 og 1 250 kroner av "
         "5 000. Den rike betaler fem ganger så mange kroner, men begge betaler 25 %. Systemet er proporsjonalt. Påstanden "
         "«de rike betaler mest» er sann, men den sier ingenting om progressivitet.</p>"
         "<p><b>Hva som gjør et system progressivt.</b> Det må finnes noe som skiller gjennomsnittsskatten fra "
         "marginalskatten. Trinnskatten i Norge gjør det, men et bunnfradrag holder. Med 25 % over et bunnfradrag på "
         "100 er gjennomsnittsskatten 12,5 % ved inntekt 200 og 20 % ved inntekt 500.</p>"
         "<p><b>Kontroll.</b> Regn gjennomsnittsskatten for to inntekter og se om den stiger. Det er det eksamen ber om "
         "når den spør om et system er progressivt.</p>"
         "<p><b>Husk:</b> progressivitet handler om andelen av inntekten, aldri om antall kroner.</p>",
)

statisk(
    "ska-s03", tema="skattesystem", type="paastand", rekkefolge="fast",
    q="<p>Vurder de to påstandene.</p>"
      "<p>I. En flat skatt på 30 % av all inntekt over et bunnfradrag på kr 60 000 er progressiv.</p>"
      "<p>II. En flat skatt på 30 % av all inntekt uten bunnfradrag er progressiv, fordi den som tjener kr 900 000, "
      "betaler tre ganger så mange kroner i skatt som den som tjener kr 300 000.</p>"
      "<p>Hvilke påstander er riktige?</p>",
    alternativer=[
        R("Bare I"),
        F("Bare II", "Påstand II forveksler kroner med andel. Begge betaler 30 % av inntekten, så systemet er "
                     "proporsjonalt. Påstand I er riktig."),
        F("Både I og II", "Påstand II er gal: tre ganger så mange kroner er nøyaktig like stor andel, 30 %."),
        F("Ingen av dem", "Påstand I er riktig. Bunnfradraget gjør at gjennomsnittsskatten stiger med inntekten."),
    ],
    kort="<p><b>Bare I.</b> Med bunnfradrag er gjennomsnittsskatten 30 % × (1 − 60 000/Y), som stiger med Y. Uten "
         "fradrag betaler alle 30 % av inntekten. Det er proporsjonalt.</p>",
    full="<p><b>Hva progressivt betyr.</b> Et system er progressivt når gjennomsnittsskatten, skatten delt på "
         "inntekten, stiger med inntekten. Det er andelen som teller, ikke kronebeløpet.</p>"
         "<p><b>Påstand I.</b> Skatten er 30 % × (Y − 60 000). Gjennomsnittsskatten er 30 % × (1 − 60 000/Y). For "
         "Y = 300 000 gir det 30 % × 0,8 = 24 %. For Y = 900 000 gir det 30 % × 0,9333 = 28 %. Snittet stiger, så "
         "systemet er progressivt. Påstanden er riktig.</p>"
         "<p><b>Påstand II.</b> Uten fradrag betaler den med 300 000 kr 90 000 og den med 900 000 kr 270 000. Det er "
         "tre ganger så mange kroner, men 90 000/300 000 = 30 % og 270 000/900 000 = 30 %. Andelen er lik. Systemet "
         "er proporsjonalt. Begrunnelsen i påstanden er sann, men konklusjonen er gal.</p>"
         "<p><b>Kontroll.</b> Med flat sats t og bunnfradrag B er forskjellen i snitt mellom to inntekter "
         "t × B × (1/Y<sub>lav</sub> − 1/Y<sub>høy</sub>). Med B = 0 blir den null, som i påstand II. Med B = 60 000 blir "
         "den 0,30 × 60 000 × (1/300 000 − 1/900 000) = 4 prosentpoeng, som i påstand I.</p>"
         "<p><b>Husk:</b> flat sats uten fradrag er proporsjonal. Et bunnfradrag gjør den progressiv.</p>",
)

statisk(
    "ska-s04", tema="skattesystem", type="begrep",
    q="<p>Et land har en flat skatt på 25 % av inntekt over et bunnfradrag på kr 40 000. Bunnfradraget økes til "
      "kr 120 000, mens satsen er uendret. Hva skjer med forskjellen i gjennomsnittsskatt mellom en person med "
      "kr 300 000 og en person med kr 600 000 i inntekt?</p>",
    alternativer=[
        R("Den tredobles, fra 1,67 til 5,00 prosentpoeng"),
        F("Den er uendret, fordi begge får akkurat det samme kronebeløpet i økt fradrag",
          "Samme kronebeløp er en større andel av en liten inntekt. Det er andelen progressivitet måler."),
        F("Den blir mindre, fordi begge nå betaler en lavere andel av inntekten sin i skatt",
          "Begge betaler mindre, men den med lavest inntekt får størst nedgang i andel. Forskjellen øker."),
        F("Den er uendret, fordi marginalskatten fortsatt er 25 % for begge",
          "Marginalskatten er lik, men progressivitet handler om gjennomsnittsskatten."),
    ],
    kort="<p><b>Den tredobles.</b> Forskjellen er t × B × (1/300 000 − 1/600 000), proporsjonal med B. Fra 40 000 til "
         "120 000 går den fra 1,67 til 5,00 prosentpoeng.</p>",
    full="<p><b>Hvorfor bunnfradraget styrer progressiviteten.</b> Bunnfradraget er det samme kronebeløpet for alle, "
         "men en større andel av en liten inntekt enn av en stor. Gjennomsnittsskatten er t × (1 − B/Y). Den som tjener "
         "minst, får den største andelen skjermet.</p>"
         "<p><b>Steg 1: formelen for forskjellen.</b> t̄(Y<sub>høy</sub>) − t̄(Y<sub>lav</sub>) = t × B × "
         "(1/Y<sub>lav</sub> − 1/Y<sub>høy</sub>). Den er proporsjonal med B.</p>"
         "<p><b>Steg 2: før endringen.</b> 0,25 × 40 000 × (1/300 000 − 1/600 000) = 0,25 × 40 000/600 000 = 1,67 "
         "prosentpoeng. Snittene er 21,67 % og 23,33 %.</p>"
         "<p><b>Steg 3: etter endringen.</b> 0,25 × 120 000/600 000 = 5,00 prosentpoeng. Snittene er 15,00 % og "
         "20,00 %.</p>"
         "<p><b>Kontroll.</b> Bunnfradraget tredobles. Forskjellen tredobles også: 3 × 1,667 = 5,00. ✓ Begge betaler "
         "mindre skatt, men den med 300 000 faller 6,67 prosentpoeng og den med 600 000 bare 3,33.</p>"
         "<p><b>Husk:</b> større bunnfradrag gir sterkere progressivitet, selv om satsen står stille.</p>",
)

statisk(
    "ska-s05", tema="skattesystem", type="fakta",
    q="<p>En lønn treffes av tre skatter: 22 % skatt på alminnelig inntekt, trygdeavgift og trinnskatt. Hvilket grunnlag "
      "regnes hver av dem av?</p>",
    alternativer=[
        R("Trygdeavgift og trinnskatt av brutto lønn, 22 % av alminnelig inntekt"),
        F("Alle tre av alminnelig inntekt, altså lønnen etter minstefradrag og personfradrag",
          "Fradragene trekkes bare fra alminnelig inntekt. Trygdeavgift og trinnskatt regnes av brutto lønn."),
        F("Trinnskatt av alminnelig inntekt, trygdeavgift og 22 % av brutto lønn",
          "Byttet om. Trinnskatten regnes av personinntekten. 22 % regnes etter fradrag."),
        F("Trygdeavgift av brutto lønn, trinnskatt og 22 % av alminnelig inntekt",
          "Trinnskatten regnes av personinntekten, brutto lønn, som trygdeavgiften."),
    ],
    kort="<p><b>To grunnlag.</b> Trygdeavgift og trinnskatt regnes av personinntekten, altså brutto lønn. 22 % regnes av "
         "alminnelig inntekt, lønnen etter minstefradrag og personfradrag.</p>",
    full="<p><b>Personinntekt og alminnelig inntekt.</b> Personinntekt er brutto lønn, uten noen fradrag. Alminnelig "
         "inntekt er all inntekt minus alle fradrag. For en lønnstaker er de store fradragene minstefradraget (46 % av "
         "lønnen, høyst kr 95 700 i 2026) og personfradraget (kr 114 540).</p>"
         "<p><b>Hvem som bruker hva.</b> 22-prosenten er en generell skatt på netto inntekt og regnes av alminnelig "
         "inntekt. Trygdeavgiften, 7,6 % av lønn, er formelt en premie til folketrygden og knyttes til arbeidsinntekten "
         "selv. Trinnskatten er den progressive delen og regnes også av personinntekten.</p>"
         "<p><b>Konsekvensen.</b> Et fradrag senker bare 22-prosenten. Derfor er et fradrag nesten alltid verdt 22 øre "
         "per krone, også for den som har 47,4 % i marginalskatt.</p>"
         "<p><b>Kontroll.</b> Kortformen T(Y) = 29,6 % × Y − 22 % × fradrag + trinnskatt bare fungerer fordi 22 % og "
         "7,6 % begge treffer lønnen, mens fradragene bare virker mot 22 %. Hadde alle tre brukt alminnelig inntekt, "
         "ville fradragene stått i alle leddene.</p>"
         "<p><b>Husk:</b> trygdeavgift og trinnskatt av brutto lønn. 22 % av inntekten etter fradrag.</p>",
)

statisk(
    "ska-s06", tema="skattesystem", type="begrep",
    q="<p>Lise har en marginalskatt på 47,4 %. Per har 33,6 %. Begge får et nytt fradrag på kr 20 000 i alminnelig "
      "inntekt. Begge har inntekt nok til å bruke det. Hvorfor sparer de like mye skatt, kr 4 400?</p>",
    alternativer=[
        R("Fradrag senker bare grunnlaget for 22 %, ikke trygdeavgift eller trinnskatt"),
        F("Fradrag gis alltid som et fast beløp i skatten, uavhengig av inntekt og satser",
          "Et fradrag i inntekten er ikke et fradrag i skatten. Det er verdt beløpet ganger satsen det virker mot."),
        F("Det gjør de ikke: Lise sparer 47,4 % av 20 000 og Per 33,6 %, altså 9 480 mot 6 720",
          "Marginalskatten inneholder trygdeavgift og trinnskatt, som regnes av brutto lønn. Fradraget rører dem ikke."),
        F("Trinnskatten gjelder bare inntekt over kr 1 467 200",
          "Trinnskatten har fem trinn fra kr 226 100. Grunnen er at den regnes av brutto lønn."),
    ],
    kort="<p><b>Fradraget virker bare mot 22 %.</b> 20 000 × 22 % = 4 400 for begge. Trygdeavgift og trinnskatt regnes "
         "av brutto lønn og påvirkes ikke.</p>",
    full="<p><b>Hva et fradrag er.</b> Et fradrag trekkes fra inntekten, ikke fra skatten. Det er verdt beløpet ganger den "
         "satsen som faktisk regnes av grunnlaget det trekkes fra.</p>"
         "<p><b>Steg 1: hvilket grunnlag.</b> Fradraget gjelder alminnelig inntekt. Den skattlegges med 22 %.</p>"
         "<p><b>Steg 2: hva med resten av marginalskatten?</b> Lises 47,4 % er 22 % + 7,6 % trygdeavgift + 17,8 % "
         "trinnskatt. Pers 33,6 % er 22 % + 7,6 % + 4,0 %. Trygdeavgift og trinnskatt regnes av brutto lønn. Et fradrag "
         "i alminnelig inntekt endrer ikke brutto lønn.</p>"
         "<p><b>Steg 3: besparelsen.</b> 20 000 × 22 % = 4 400 for begge.</p>"
         "<p><b>Kontroll.</b> Får Lise i stedet kr 20 000 mer i lønn, betaler hun 20 000 × 47,4 % = 9 480 i skatt. "
         "Lønn og fradrag virker altså ulikt, fordi lønnen også treffer de to andre grunnlagene.</p>"
         "<p><b>Husk:</b> et fradrag er verdt 22 øre per krone når det finnes inntekt å trekke det fra.</p>",
)

statisk(
    "ska-s07", tema="skattesystem", type="fakta",
    q="<p>Hva er den høyeste marginalskatten på lønn i 2026? Velg tallet med riktig sammensetning.</p>",
    alternativer=[
        R("47,4 %: 22 % + 7,6 % trygdeavgift + 17,8 % trinnskatt"),
        F("51,52 %: 22 % selskapsskatt + 78 % × 37,84 % eierskatt",
          "Det er samlet skatt på utdelt selskapsoverskudd, tallet toppskatten på lønn skal sammenlignes med."),
        F("39,8 %: 22 % + 17,8 % trinnskatt, uten trygdeavgift",
          "Trygdeavgiften på 7,6 % betales av all lønn og hører med i marginalskatten."),
        F("61,5 %: 22 % + 7,6 % + 17,8 % + 14,1 % arbeidsgiveravgift",
          "Arbeidsgiveravgiften betales av arbeidsgiveren og er ikke en del av lønnstakerens marginalskatt."),
    ],
    kort="<p><b>47,4 %.</b> 22 % på alminnelig inntekt + 7,6 % trygdeavgift + 17,8 % i trinn 5 (fra kr 1 467 200).</p>",
    full="<p><b>Hva marginalskatten er.</b> Marginalskatten er skatten på neste krone. For en lønnstaker i det øverste "
         "trinnet treffes den kronen av alle tre lønnsskattene.</p>"
         "<p><b>Steg 1: de tre leddene.</b> 22 % på alminnelig inntekt, 7,6 % trygdeavgift på lønn og 17,8 % i trinn 5 "
         "av trinnskatten, som gjelder lønn over kr 1 467 200 i 2026.</p>"
         "<p><b>Steg 2: summen.</b> 22 + 7,6 + 17,8 = 47,4 %.</p>"
         "<p><b>Kontroll.</b> I 2024 var trygdeavgiften 7,8 % og trinn 5 17,6 %. Summen var den samme: 22 + 7,8 + 17,6 = "
         "47,4 %. Satsene ble flyttet like mye hver sin vei, så toppskatten har stått stille. Det er tallet samlet skatt "
         "på utdelt overskudd, 51,52 %, skal ligne på.</p>"
         "<p><b>Husk:</b> 47,4 % = 22 + 7,6 + 17,8. Arbeidsgiveravgiften er ikke med.</p>",
)

statisk(
    "ska-s08", tema="skattesystem", type="fakta",
    q="<p>Siri har kr 800 000 i lønn og ingen andre inntekter. Minstefradraget står på taket. Bruk 2026-satsene: 22 % "
      "skatt på alminnelig inntekt og 7,6 % trygdeavgift. Trinnskatten er 1,7 % fra kr 226 100, 4,0 % fra kr 318 300, "
      "13,7 % fra kr 725 050 og 16,8 % fra kr 980 100.</p>"
      "<p>Hva er marginalskatten hennes?</p>",
    alternativer=[
        R("43,3 %"),
        F("33,6 %", "Feil trinn: 22 + 7,6 + 4,0. Lønnen på 800 000 ligger over 725 050, altså i trinn 3."),
        F("35,7 %", "Trygdeavgiften glemt: 22 + 13,7. Trygdeavgiften betales av hver lønnskrone."),
        F("27,33 %", "Dette er gjennomsnittsskatten: 218 652,75/800 000. Marginalskatten gjelder neste krone."),
    ],
    kort="<p><b>43,3 %.</b> Neste krone treffes av 22 %, 7,6 % trygdeavgift og 13,7 % i trinn 3, fordi 800 000 ligger "
         "mellom 725 050 og 980 100.</p>",
    full="<p><b>Hva marginalskatten er.</b> Marginalskatten er skatten på neste krone. Den finner du ved å se hvilket trinn "
         "den siste kronen ligger i og legge sammen alle skattene som treffer den.</p>"
         "<p><b>Steg 1: trinnet.</b> 800 000 ligger over 725 050 og under 980 100. Neste krone er i trinn 3, med 13,7 %.</p>"
         "<p><b>Steg 2: de andre leddene.</b> Minstefradraget står på taket, så en ekstra krone øker alminnelig inntekt "
         "med en hel krone: 22 %. Trygdeavgiften på lønn er 7,6 %.</p>"
         "<p><b>Steg 3: summen.</b> 22 + 7,6 + 13,7 = 43,3 %.</p>"
         "<p><b>Kontroll mot gjennomsnittet.</b> Hele skatten er 22 % × (800 000 − 95 700 − 114 540) = 129 747,20, "
         "trygdeavgift 60 800 og trinnskatt 1 567,40 + 16 270 + 10 268,15 = 28 105,55. Samlet 218 652,75, altså "
         "27,33 %. Snittet ligger godt under marginalskatten, som det skal. ✓ Hadde minstefradraget ikke stått på "
         "taket, ville 46 øre av neste krone blitt trukket fra. Da ville 22-prosenten bare truffet 54 øre.</p>"
         "<p><b>Husk:</b> marginalskatt på lønn = 22 % + trygdeavgift + satsen i trinnet du er i.</p>",
)

statisk(
    "ska-s09", tema="skattesystem", type="begrep",
    q="<p>To selskaper har like store driftsinntekter og betaler 22 % skatt av overskuddet. Det ene har store "
      "avskrivninger, det andre ingen. Målt som betalt skatt delt på skattepliktig overskudd har begge 22 %. Hva viser "
      "dette?</p>",
    alternativer=[
        R("At målet sier lite: det gir satsen tilbake uansett fradrag"),
        F("At selskapene bærer like mye skatt i forhold til inntekten sin",
          "Selskapet med avskrivninger betaler mindre skatt av samme inntekt. Målt mot brutto inntekt er satsen lavere."),
        F("At avskrivninger ikke senker skatten, fordi de ikke er en utbetaling",
          "Avskrivninger trekkes fra i skattepliktig inntekt og senker skatten i året."),
        F("At den effektive skattesatsen alltid er lik den nominelle for selskaper",
          "Effektiv sats regnes mot brutto inntekt og er lavere enn den nominelle når det finnes fradrag."),
    ],
    kort="<p><b>Målet sier lite.</b> Skatt delt på skattepliktig inntekt gir alltid 22 % med flat sats. Effektiv "
         "skattesats deles på brutto inntekt, så fradragene synes.</p>",
    full="<p><b>Hva effektiv skattesats skal måle.</b> Effektiv skattesats er betalt skatt delt på brutto inntekt. Den skal "
         "vise hvor stor del av inntekten som faktisk går til skatt. To selskaper med samme nominelle sats kan betale "
         "svært ulikt fordi grunnlaget er uthulet i ulik grad.</p>"
         "<p><b>Regnestykket.</b> Si at begge har kr 100 000 i driftsinntekter og det ene avskriver kr 25 000. Det betaler "
         "22 % × 75 000 = 16 500. Det andre betaler 22 % × 100 000 = 22 000. Delt på skattepliktig overskudd gir det "
         "16 500/75 000 = 22 % og 22 000/100 000 = 22 %. Delt på driftsinntekten gir det 16,5 % og 22 %.</p>"
         "<p><b>Hva det viser.</b> Med flat sats gir skatt delt på skattepliktig inntekt alltid satsen tilbake. Målet kan "
         "ikke skille mellom de to selskapene. Brutto i nevneren fanger at avskrivningen senker skatten.</p>"
         "<p><b>Kontroll.</b> Effektiv sats = t × (1 − fradrag/inntekt) = 22 % × 0,75 = 16,5 %. ✓</p>"
         "<p><b>Husk:</b> effektiv skattesats = betalt skatt / brutto inntekt.</p>",
)

statisk(
    "ska-s10", tema="skattesystem", type="formel",
    q="<p>En flat skatt med sats t gjelder all inntekt over et bunnfradrag B. Hvilket uttrykk gir gjennomsnittsskatten "
      "for en person med inntekt Y, der Y er større enn B?</p>",
    alternativer=[
        R("t × (1 − B/Y)"),
        F("t × (1 − Y/B)", "Brøken snudd. Med Y større enn B blir uttrykket negativt."),
        F("t − B/Y", "Bunnfradraget trukket fra skatten i stedet for fra inntekten. B skal ganges med t."),
        F("t × B/Y", "Dette er hvor mye bunnfradraget senker snittet, ikke selve gjennomsnittsskatten."),
    ],
    kort="<p><b>t × (1 − B/Y).</b> Skatten er t × (Y − B). Delt på Y gir det t × (1 − B/Y).</p>",
    full="<p><b>Hva uttrykket skal gi.</b> Gjennomsnittsskatten er skatten delt på inntekten. Med bunnfradrag er bare "
         "inntekten over B skattepliktig.</p>"
         "<p><b>Steg 1: skatten.</b> T = t × (Y − B).</p>"
         "<p><b>Steg 2: del på inntekten.</b> T/Y = t × (Y − B)/Y = t × (1 − B/Y).</p>"
         "<p><b>Kontroll med tall.</b> t = 25 %, B = 100 000 og Y = 400 000 gir skatt 75 000 og snitt 18,75 %. "
         "Formelen: 0,25 × (1 − 0,25) = 18,75 %. ✓ De gale uttrykkene gir 0,25 × (1 − 4) = −75 %, 0,25 − 0,25 = 0 % og "
         "0,25 × 0,25 = 6,25 %.</p>"
         "<p><b>Hva formelen viser.</b> Når Y vokser, faller B/Y. Snittet nærmer seg da t nedenfra. Snittet stiger med "
         "inntekten, så systemet er progressivt. Med B = 0 er snittet t for alle. Da er systemet proporsjonalt.</p>"
         "<p><b>Husk:</b> t̄(Y) = t × (1 − B/Y). Bunnfradraget trekkes fra inntekten, ikke fra skatten.</p>",
)

statisk(
    "ska-s11", tema="skattesystem", type="formel",
    q="<p>Et selskap betaler skattesatsen t<sub>A</sub> av overskuddet og deler ut alt som er igjen. Eieren betaler "
      "eierskatten t<sub>e</sub> av utbyttet. Se bort fra skjerming. Hvilket uttrykk gir samlet skatt per krone "
      "overskudd før skatt?</p>",
    alternativer=[
        R("t<sub>A</sub> + (1 − t<sub>A</sub>) × t<sub>e</sub>"),
        F("t<sub>A</sub> + t<sub>e</sub>", "Satsene lagt sammen. Eierskatten treffer bare det som er igjen etter "
                                          "selskapsskatt, (1 − t<sub>A</sub>)."),
        F("(1 − t<sub>A</sub>) × t<sub>e</sub>", "Bare eierskatten. Selskapsskatten t<sub>A</sub> er også betalt av "
                                                 "samme krone."),
        F("t<sub>A</sub> + (1 − t<sub>e</sub>) × t<sub>A</sub>", "Satsene har byttet plass i andre ledd. Det er "
                                                                 "eierskatten som treffer det selskapet har igjen."),
    ],
    kort="<p><b>t<sub>A</sub> + (1 − t<sub>A</sub>) × t<sub>e</sub>.</b> Med dagens satser: 22 % + 78 % × 37,84 % = "
         "51,52 %.</p>",
    full="<p><b>To ledd.</b> En krone overskudd skattlegges først i selskapet. Det som er igjen, deles ut og skattlegges "
         "hos eieren. Samlet skatt er summen av de to beløpene, målt mot kronen før skatt.</p>"
         "<p><b>Steg 1: selskapet.</b> Av 1 krone betales t<sub>A</sub> i selskapsskatt. Igjen: 1 − t<sub>A</sub>.</p>"
         "<p><b>Steg 2: eieren.</b> Utbyttet 1 − t<sub>A</sub> skattlegges med t<sub>e</sub>: (1 − t<sub>A</sub>) × "
         "t<sub>e</sub>.</p>"
         "<p><b>Steg 3: summen.</b> t<sub>A</sub> + (1 − t<sub>A</sub>) × t<sub>e</sub>.</p>"
         "<p><b>Kontroll med tall.</b> Overskudd 1 000 000: selskapsskatt 220 000, utbytte 780 000, eierskatt "
         "780 000 × 37,84 % = 295 152. Samlet 515 152, altså 51,52 %. Formelen: 0,22 + 0,78 × 0,3784 = 0,5152. ✓ "
         "Lagt sammen gir satsene 59,84 %, bare eierskatten 29,52 %.</p>"
         "<p><b>Husk:</b> eierskatten treffer det som er igjen etter selskapsskatt. 51,52 % mot 47,4 % på lønn.</p>",
)

statisk(
    "ska-s12", tema="skattesystem", type="formel",
    q="<p>Oppjusteringsfaktoren y skal settes slik at samlet skatt på utdelt overskudd blir lik toppskatten på lønn, "
      "t<sub>w</sub>. Selskapet betaler t<sub>A</sub>. Eieren betaler y × t av utbyttet. Se bort fra skjerming og "
      "arbeidsgiveravgift. Hvilket uttrykk gir y?</p>",
    alternativer=[
        R("(t<sub>w</sub> − t<sub>A</sub>)/((1 − t<sub>A</sub>) × t)"),
        F("(t<sub>w</sub> − t<sub>A</sub>)/t", "Glemt at eierskatten bare treffer (1 − t<sub>A</sub>) av overskuddet."),
        F("t<sub>w</sub>/((1 − t<sub>A</sub>) × t)", "Selskapsskatten ikke trukket fra toppskatten. Da betales den to "
                                                    "ganger."),
        F("((1 − t<sub>A</sub>) × t)/(t<sub>w</sub> − t<sub>A</sub>)", "Brøken snudd. Med dagens satser gir den 0,68, "
                                                                      "en faktor som senker eierskatten."),
    ],
    kort="<p><b>(t<sub>w</sub> − t<sub>A</sub>)/((1 − t<sub>A</sub>) × t).</b> Løs t<sub>w</sub> = t<sub>A</sub> + "
         "(1 − t<sub>A</sub>) × y × t for y.</p>",
    full="<p><b>Hva faktoren skal gjøre.</b> Samlet skatt på en krone overskudd som deles ut, skal være lik skatten på en "
         "lønnskrone. Da lønner det seg ikke å ta ut lønn som utbytte.</p>"
         "<p><b>Steg 1: likningen.</b> t<sub>w</sub> = t<sub>A</sub> + (1 − t<sub>A</sub>) × y × t.</p>"
         "<p><b>Steg 2: flytt t<sub>A</sub>.</b> t<sub>w</sub> − t<sub>A</sub> = (1 − t<sub>A</sub>) × y × t.</p>"
         "<p><b>Steg 3: del.</b> y = (t<sub>w</sub> − t<sub>A</sub>)/((1 − t<sub>A</sub>) × t).</p>"
         "<p><b>Kontroll med tall.</b> t<sub>w</sub> = 47,4 %, t<sub>A</sub> = t = 22 %: y = 0,254/(0,78 × 0,22) = "
         "0,254/0,1716 = 1,48. Sett inn: 22 % + 0,78 × 1,48 × 22 % = 22 % + 25,4 % = 47,4 %. ✓ Dagens faktor er 1,72. "
         "Avviket forklares med arbeidsgiveravgiften som veltes over på lønnstakeren, et ledd uttrykket her ser bort fra. "
         "H2017 brukte samme formel med 46,7 %, 24 % og 23 % og fikk y = 1,3.</p>"
         "<p><b>Husk:</b> y = (t<sub>w</sub> − t<sub>A</sub>)/((1 − t<sub>A</sub>) × t).</p>",
)

statisk(
    "ska-s13", tema="skattesystem", type="formel",
    q="<p>En plassering gir nominell avkastning i. Avkastningen skattlegges med satsen t. Inflasjonen er π. Hvilket "
      "uttrykk gir den eksakte realavkastningen etter skatt?</p>",
    alternativer=[
        R("(1 + i(1 − t))/(1 + π) − 1"),
        F("(1 + i)(1 − t)/(1 + π) − 1", "Skatten er lagt på hele beløpet, også det du satte inn. Den skal bare treffe "
                                        "avkastningen i."),
        F("[(1 + i)/(1 + π) − 1] × (1 − t)", "Skatten lagt på realavkastningen. Skatten regnes av den nominelle "
                                              "avkastningen."),
        F("i(1 − t) − π", "Tilnærmingen. Den bommer med omtrent r × π og er ikke eksakt."),
    ],
    kort="<p><b>(1 + i(1 − t))/(1 + π) − 1.</b> Først nominell avkastning etter skatt, i(1 − t). Så deles inflasjonen "
         "ut.</p>",
    full="<p><b>Rekkefølgen.</b> Skatten regnes av nominelle kroner. Derfor trekkes skatten fra den nominelle avkastningen "
         "først. Inflasjonen deles ut etterpå: nominelt, så etter skatt, så realt.</p>"
         "<p><b>Steg 1: nominelt etter skatt.</b> i × (1 − t).</p>"
         "<p><b>Steg 2: realt.</b> 1 + r = (1 + i(1 − t))/(1 + π), så r = (1 + i(1 − t))/(1 + π) − 1.</p>"
         "<p><b>Kontroll med tall.</b> i = 5 %, t = 22 % og π = 3 %: 1,039/1,03 − 1 = 0,87 %. De gale uttrykkene gir "
         "1,05 × 0,78/1,03 − 1 = −20,5 %, 1,94 % × 0,78 = 1,51 % og 3,9 % − 3 % = 0,90 %. Bare det første følger "
         "rekkefølgen og er eksakt.</p>"
         "<p><b>Hvorfor det betyr noe.</b> Med skatt på nominell avkastning skattlegges også den delen som bare "
         "kompenserer for prisstigning. Effektiv skatt på realavkastningen blir t × i/(i − π), høyere enn t.</p>"
         "<p><b>Husk:</b> nominelt, skatt, realt.</p>",
)

statisk(
    "ska-s14", tema="skattesystem", type="begrep",
    q="<p>Et selskap kan utgiftsføre kr 400 000 i år eller avskrive kr 100 000 i året i fire år. Satsen er 22 % hele "
      "tiden. Renten er positiv. Anta at fradrag som ikke kan brukes i år, går tapt. Når kan det lønne seg å avskrive i stedet for å utgiftsføre alt nå?</p>",
    alternativer=[
        R("Når årets inntekt er for liten til å bruke hele fradraget"),
        F("Aldri, fordi summen av skattebesparelsene er den samme",
          "Riktig hovedregel, gal begrunnelse og for bastant. Like kroner er ikke like nåverdier. Uten inntekt å "
          "trekke fra kan fradraget dessuten gå tapt."),
        F("Når renten er høy, fordi besparelser som kommer senere, da er verdt mer",
          "Feil retning. Høy rente gjør senere kroner mindre verdt og taler for å ta fradraget nå."),
        F("Alltid, fordi selskapet da får skattefradrag i flere år",
          "Flere år med fradrag gir samme sum, bare senere. Med positiv rente er det verre."),
    ],
    kort="<p><b>Når inntekten ikke rekker.</b> Hovedregelen er å ta fradraget nå. Unntaket er når det mangler inntekt å "
         "trekke det fra, eller når satsen blir høyere senere.</p>",
    full="<p><b>Hva fradraget er verdt.</b> Et fradrag er en skattebesparelse, fradraget ganger satsen. Her er summen den "
         "samme i begge tilfeller: 400 000 × 22 % = 88 000. Det eneste som skiller, er når besparelsen kommer.</p>"
         "<p><b>Hovedregelen.</b> Med positiv rente er en krone spart i dag verdt mer enn en krone spart om tre år. Alt "
         "nå gir 88 000 i dag. Avskrivning gir 22 000 i året i fire år, som har lavere nåverdi. Ved 8 % er den "
         "22 000 × 3,3121 = 72 866.</p>"
         "<p><b>Forbehold 1: inntekt.</b> Har selskapet bare kr 150 000 i inntekt i år og ingen rett til å framføre "
         "ubrukt fradrag, går 250 000 av fradraget tapt. Da kan avskrivning over fire år gi mer. I virkeligheten kan "
         "et selskap framføre underskudd (sktl § 14-6). Derfor sier spørsmålet at ubrukt fradrag går tapt.</p>"
         "<p><b>Forbehold 2: satsen.</b> Er satsen lavere nå enn senere, kan en senere besparelse være verdt mer. Her er "
         "satsen lik hele tiden.</p>"
         "<p><b>Kontroll.</b> «Det spiller ingen rolle» er bare riktig når renten er null. Med positiv rente og inntekt "
         "nok er svaret alltid å ta alt nå.</p>"
         "<p><b>Husk:</b> ta fradraget så tidlig som inntekten tillater.</p>",
)

statisk(
    "ska-s15", tema="skattesystem", type="paastand", rekkefolge="fast",
    q="<p>Nico eier hele Nico AS. Selskapet tjener kr 1 000 000 før skatt i år, betaler 22 % selskapsskatt og deler ikke ut "
      "noe. Nico har ingen andre inntekter. Vurder de to påstandene.</p>"
      "<p>I. Nicos skattemelding viser null inntekt og null skatt for året.</p>"
      "<p>II. Regnet slik kurset gjør for eiere, med selskapets skatt og inntekt etter eierandelen, er Nicos effektive "
      "skattesats også 0 %.</p>"
      "<p>Hvilke påstander er riktige?</p>",
    alternativer=[
        R("Bare I"),
        F("Bare II", "Påstand I er riktig: uten utbytte står ingenting på skattemeldingen. Påstand II er gal."),
        F("Både I og II", "Påstand II er gal. Med selskapet regnet med er satsen 220 000/1 000 000 = 22 %."),
        F("Ingen av dem", "Påstand I er riktig. Uten utbytte har Nico verken inntekt eller skatt på skattemeldingen."),
    ],
    kort="<p><b>Bare I.</b> Skattemeldingen viser null. Kursets mål tar med selskapets skatt og inntekt: 220 000/1 000 000 "
         "= 22 %.</p>",
    full="<p><b>Problemet med skattemeldingen.</b> For en eier viser skattemeldingen bare det som tas ut. Overskudd som "
         "holdes tilbake i selskapet, er likevel eierens formue. I et børsnotert selskap synes det i kursen. I et "
         "unotert selskap bestemmer eieren selv når utbyttet tas.</p>"
         "<p><b>Påstand I.</b> Nico tar ikke utbytte og har ingen andre inntekter. Han har null inntekt og null skatt på "
         "skattemeldingen. Riktig.</p>"
         "<p><b>Påstand II.</b> Kursets formel er (α × selskapets skatt + egen skatt)/(α × selskapets inntekt + andre "
         "inntekter). Med α = 100 %: (220 000 + 0)/(1 000 000 + 0) = 22 %. Påstanden er gal.</p>"
         "<p><b>Hvorfor det betyr noe.</b> SSBs analyse fra 2020 viser at offisiell statistikk undervurderer inntekten "
         "på toppen kraftig når overskudd blir stående i selskapene. Med eierandelen av årsresultatet i stedet for "
         "mottatt utbytte stiger andelen til topp 1 % fra 8,8 % til 19,0 % av markedsinntekten i 2018.</p>"
         "<p><b>Kontroll.</b> Pia med 1 mill. kr i renter betaler 220 000 og har 22 %. Nico i samme økonomiske stilling "
         "får det samme med kursets mål. Det er poenget med å ta selskapet med.</p>"
         "<p><b>Husk:</b> eierens effektive sats tar med eierandelen av selskapets skatt og inntekt.</p>",
)

statisk(
    "ska-s16", tema="skattesystem", type="tolkning",
    q="<p>Når selskapsskatt, formuesskatt og tilbakeholdt overskudd regnes med, stiger den effektive skattesatsen gjennom "
      "inntektsfordelingen til om lag 99. prosentil. Deretter faller den for topp 1 % og enda mer for topp 0,1 %. Hva er "
      "kursets viktigste forklaring på fallet på toppen?</p>",
    alternativer=[
        R("Utsatt eierskatt i selskap og lav verdi på unoterte aksjer"),
        F("Formuesskatten har lavere sats for de største formuene",
          "Satsen er høyere på toppen: 1,1 % over kr 21 500 000 mot 1,0 % under."),
        F("De aller rikeste har mest lønn, som skattlegges lettere enn utbytte",
          "De rikeste har mest kapitalinntekt og selskapsoverskudd, ikke lønn."),
        F("Skjermingsfradraget gjør at de største utbyttene er skattefrie",
          "Skjermingen fritar bare en risikofri normalavkastning, ikke store utbytter."),
    ],
    kort="<p><b>Utsatt eierskatt og lav verdsetting.</b> Overskudd som blir stående i selskap, er bare skattlagt med 22 %. "
         "Unoterte aksjer verdsettes til bokført verdi, som gir lav formuesskatt.</p>",
    full="<p><b>Hva figuren viser.</b> SSBs analyse fra 2020 regner effektiv skattesats med selskapsskatt og formuesskatt "
         "og med tilbakeholdt overskudd i inntekten. Kurven stiger til om lag 37 % ved 99. prosentil i 2004, men faller "
         "til 22 % for topp 1 % og 14 % for topp 0,1 %. Systemet er progressivt opp til 99. prosentil og regressivt "
         "over.</p>"
         "<p><b>Forklaring 1: utsatt eierskatt.</b> De rikeste har mye av inntekten sin i egne selskaper. Det som "
         "holdes tilbake, skattlegges bare med 22 %. Eierskatten på 37,84 % kommer først når pengene tas ut. Med "
         "holdingselskap og fritaksmetoden kan det ta lang tid.</p>"
         "<p><b>Forklaring 2: verdsettingen.</b> Unoterte aksjer verdsettes til selskapets bokførte verdi, ofte langt "
         "under markedsverdien. Formuesskatten blir da lav i forhold til den reelle formuen.</p>"
         "<p><b>Kontroll mot de gale alternativene.</b> Formuesskattesatsen stiger på toppen. Lønn utgjør en liten del "
         "av inntekten der. Skjermingen er en normalavkastning og forklarer ikke at satsen faller.</p>"
         "<p><b>Husk:</b> effektiv skatt faller på toppen fordi eierskatten utsettes og unoterte aksjer verdsettes lavt. "
         "Kurset gjengir argumentene i debatten som argumenter.</p>",
)

statisk(
    "ska-s17", tema="skattesystem", type="begrep",
    q="<p>I to-periodemodellen kan du spare eller låne til renten r. Skatten t treffer renteinntekter. Rentefradraget "
      "virker med samme sats. Satsen øker fra 22 % til 28 %, mens inntektene etter skatt i begge perioder er uendret. "
      "Hva skjer med budsjettlinjen?</p>",
    alternativer=[
        R("Den vipper om utstyrspunktet og blir slakere, som ved lavere rente"),
        F("Den forskyves parallelt innover, fordi all inntekt blir lavere",
          "Inntektene er uendret. Det er bare renten etter skatt som endres. Den endrer helningen."),
        F("Den blir brattere, fordi sparing nå gir mer igjen etter skatt",
          "Feil retning. Høyere skatt gir lavere rente etter skatt og en slakere linje."),
        F("Den er uendret, fordi skatten på renter og fradraget for renter oppveier hverandre",
          "De gjelder hver sin side av utstyrspunktet. Begge gjør renten etter skatt lavere, så linjen vipper."),
    ],
    kort="<p><b>Slakere, vippet om utstyrspunktet.</b> Helningen er −(1 + r(1 − t)). Høyere t gir lavere rente etter "
         "skatt: skatt opp virker som rente ned.</p>",
    full="<p><b>Modellen.</b> Du har inntekt Y<sub>1</sub> i dag og Y<sub>2</sub> neste periode. Sparer du S, får du "
         "S × (1 + r(1 − t)) tilbake. Låner du, betaler du det samme. Budsjettlinjen er C<sub>2</sub> = Y<sub>2</sub> + "
         "(Y<sub>1</sub> − C<sub>1</sub>)(1 + r(1 − t)).</p>"
         "<p><b>Steg 1: helningen.</b> dC<sub>2</sub>/dC<sub>1</sub> = −(1 + r(1 − t)). Med r = 5 % er den −1,039 ved "
         "22 % og −1,036 ved 28 %. Linjen blir slakere.</p>"
         "<p><b>Steg 2: hvor den vipper.</b> Utstyrspunktet E = (Y<sub>1</sub>, Y<sub>2</sub>) kan du alltid velge, uansett "
         "rente. Linjen går derfor gjennom E og vipper om det.</p>"
         "<p><b>Steg 3: hva det betyr.</b> Til venstre for E sparer du. Der ligger den nye linjen lavere: sparing gir "
         "mindre. Til høyre for E låner du. Der ligger den høyere: lån er billigere etter skatt.</p>"
         "<p><b>Kontroll.</b> Samme virkning får du ved å senke r og holde t fast. Det er innholdet i «skatt opp virker "
         "som rente ned».</p>"
         "<p><b>Husk:</b> helning −(1 + r(1 − t)), alltid gjennom utstyrspunktet.</p>",
)

statisk(
    "ska-s18", tema="skattesystem", type="begrep",
    q="<p>Et bankinnskudd gir 3 % rente. Inflasjonen er 3 %. Realavkastningen før skatt er null. Renteinntekten "
      "skattlegges med 22 %. Hva skjer med realavkastningen etter skatt?</p>",
    alternativer=[
        R("Den blir negativ, fordi skatten regnes av den nominelle renten"),
        F("Den forblir null, fordi det ikke finnes noen realavkastning å skattlegge",
          "Skatten regnes av den nominelle renten, 3 %, ikke av realavkastningen."),
        F("Den blir positiv, fordi skatten trekkes fra før inflasjonen deles ut",
          "Rekkefølgen gjør resultatet lavere, ikke høyere: 1,0234/1,03 − 1 er negativt."),
        F("Den blir null, fordi skatt og inflasjon oppveier hverandre",
          "Begge trekker realavkastningen ned. De oppveier ikke hverandre."),
    ],
    kort="<p><b>Negativ.</b> Etter skatt gir innskuddet 3 % × 0,78 = 2,34 %. Realt: 1,0234/1,03 − 1 = −0,64 %.</p>",
    full="<p><b>Skatten treffer nominelle kroner.</b> Skatteetaten skattlegger renten du får i kroner, uten fradrag for at "
         "pengene har tapt verdi. Også den delen av renten som bare holder tritt med prisene, skattlegges.</p>"
         "<p><b>Steg 1: nominelt etter skatt.</b> 3 % × (1 − 22 %) = 2,34 %.</p>"
         "<p><b>Steg 2: realt.</b> 1,0234/1,03 − 1 = −0,64 %.</p>"
         "<p><b>Kontroll.</b> Før skatt er realavkastningen 1,03/1,03 − 1 = 0. Skatten på 3 % × 22 % = 0,66 prosentpoeng "
         "tas likevel. Resultatet må derfor bli negativt, omtrent −0,66 % delt på 1,03. ✓</p>"
         "<p><b>Hva det betyr.</b> Inflasjon øker den reelle skatten på kapital uten at noen sats endres. Mest øker den for "
         "aktiva med lav realavkastning. Effektiv skatt på realavkastningen er t × i/(i − π). Når i nærmer seg π, går "
         "den mot uendelig.</p>"
         "<p><b>Husk:</b> skatten regnes av nominell avkastning. Lav realrente og høy inflasjon gir høy reell skatt.</p>",
)

statisk(
    "ska-s19", tema="skattesystem", type="tolkning",
    q="<p>Samlet skatt på en krone overskudd som deles ut som utbytte, er 22 % + 78 % × 37,84 % = 51,52 %. Toppskatten på "
      "lønn er 47,4 %. Hva følger av dette for en eier med høy inntekt i eget aksjeselskap?</p>",
    alternativer=[
        R("Utbytte er ikke lenger billigere enn lønn for eieren"),
        F("Utbytte er billigere, fordi det ikke gir trygdeavgift og trinnskatt",
          "Utbyttet har alt betalt 22 % selskapsskatt. Med eierskatten blir samlet skatt 51,52 %."),
        F("Det lønner seg å ta ut alt som utbytte, fordi 37,84 % er lavere enn 47,4 %",
          "37,84 % er bare eierskatten. Selskapsskatten på 22 % er betalt av samme krone først."),
        F("Lønn og utbytte koster det samme, fordi begge skattlegges med 22 % til slutt",
          "Begge har 22 % i bunnen, men lønn får trygdeavgift og trinnskatt og utbytte selskapsskatt og oppjustering."),
    ],
    kort="<p><b>Utbytte er ikke billigere.</b> 51,52 % på utbytte mot 47,4 % på lønn. Oppjusteringen fjerner gevinsten "
         "ved å gjøre lønn om til utbytte.</p>",
    full="<p><b>Inntektsskifting.</b> En eier som jobber i eget selskap, kan ta ut verdiene som lønn eller som utbytte. "
         "Er utbytte billigere, vil hun gjøre lønn om til utbytte. Det kalles inntektsskifting.</p>"
         "<p><b>Steg 1: lønnsveien.</b> Lønnen er fradragsberettiget i selskapet og skattlegges hos eieren med inntil "
         "47,4 %.</p>"
         "<p><b>Steg 2: utbytteveien.</b> Overskuddet skattlegges med 22 % i selskapet. De 78 ørene som er igjen, "
         "skattlegges med 37,84 % hos eieren: 29,52 øre. Samlet 51,52 øre.</p>"
         "<p><b>Steg 3: sammenlign.</b> 51,52 % er høyere enn 47,4 %. Utbytte er ikke billigere.</p>"
         "<p><b>Kontroll.</b> Uten oppjustering ville eierskatten vært 22 %: 22 % + 78 % × 22 % = 39,16 %, åtte "
         "prosentpoeng under lønn. Det er derfor faktoren 1,72 finnes. Samme regning med faktoren 1,48 gir nøyaktig "
         "47,4 %. Dagens 1,72 legger på litt ekstra for arbeidsgiveravgiften.</p>"
         "<p><b>Husk:</b> 51,52 % på utdelt overskudd mot 47,4 % på lønn. Oppjusteringen stenger døra for "
         "inntektsskifting.</p>",
)
