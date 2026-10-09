# -*- coding: utf-8 -*-
"""Eksamenstrening, tema «aksjonar»: aksjonærmodellen (k5, k6), kjernepensum kj2.

   Referanseeksempelet for spesifikasjonen er familien aks-skj1 og det
   statiske spørsmålet aks-b01 øverst. Resten av temaet bygger videre på dem.
"""
from trening_lib import *  # noqa: F401,F403


# ---------------------------------------------------------------------------
# aks-skj1 · Skattepliktig utbytte når skjermingen dekker en del av utbyttet
# ---------------------------------------------------------------------------
@familie("aks-skj1", tema="aksjonar", antall=8, tittel="Skattepliktig utbytte, ett år",
         hjelp="<p><b>Steg 1: finn skjermingsgrunnlaget.</b> Det er kostprisen, det du betalte for aksjene, pluss "
               "eventuell ubenyttet skjerming fra året før. Markedsverdien brukes ikke.</p>"
               "<p><b>Steg 2: regn skjermingsfradraget.</b> Gang skjermingsgrunnlaget med skjermingsrenten.</p>"
               "<p><b>Steg 3: trekk fradraget fra utbyttet.</b> Det som er igjen, er skattepliktig utbytte. Det kan "
               "aldri bli negativt.</p>"
               "<p><b>Pass på:</b> spørsmålet ber om skattepliktig utbytte, altså beløpet skatten regnes av. Det er "
               "verken skjermingsgrunnlaget eller selve skatten. Skatten ville vært skattepliktig utbytte × 37,84 %.</p>")
def _(r):
    navn = r.choice(["Mira", "Jonas", "Selma", "Aksel", "Ingrid", "Tobias", "Nora", "Elias"])
    kost = r.randrange(200_000, 900_001, 50_000)
    marked = kost + r.randrange(50_000, 300_001, 25_000)
    rs = r.choice([2.8, 3.2, 3.6, 3.9, 4.2])               # skjermingsrenten i prosent
    skj = kost * rs / 100
    utbytte = r.randrange(int(skj * 1.5 // 1000 + 1) * 1000, int(skj * 3.5 // 1000) * 1000 + 1, 1000)
    riktig = utbytte - skj
    feil_marked = utbytte - marked * rs / 100               # grunnlaget satt til markedsverdien
    feil_skatt = riktig * 0.3784                            # skatten, ikke grunnlaget
    feil_utbytte = utbytte - utbytte * rs / 100             # renten ganget med utbyttet
    if feil_marked <= 0:
        raise Avvis("markedsverdien gir negativt grunnlag")
    ulike(riktig, feil_marked, feil_skatt, feil_utbytte, rel=0.02)

    q = (f"<p>{navn} kjøpte aksjer i et norsk aksjeselskap for {kr(kost)}, som er aksjenes kostpris. "
         f"Ved utgangen av året er markedsverdien {kr(marked)}. I løpet av året mottok {navn} {kr(utbytte)} "
         f"i utbytte. {navn} eide aksjene ved årsskiftet. Skjermingsrenten for året er {prosent_tekst(rs)}. "
         f"Det er ingen ubenyttet skjerming fra tidligere år.</p>"
         f"<p>Hva er {gen(navn)} skattepliktige utbytte?</p>")

    alternativer = [
        R(kra(riktig), riktig),
        F(kra(feil_marked),
          f"Skjermingsgrunnlaget satt til markedsverdien: {tall(utbytte)} − {tall(marked)} × {prosent_tekst(rs)}. "
          f"Grunnlaget er kostprisen, ikke det aksjene er verdt i dag.", feil_marked),
        F(kr(feil_skatt, 2),
          f"Dette er skatten på utbyttet, {talla(riktig)} × 37,84 %, ikke det skattepliktige utbyttet. "
          f"Les hva spørsmålet ber om.", feil_skatt),
        F(kra(feil_utbytte),
          f"Skjermingsrenten ganget med utbyttet i stedet for med kostprisen: "
          f"{tall(utbytte)} − {tall(utbytte)} × {prosent_tekst(rs)}.", feil_utbytte),
    ]

    kort = (f"<p><b>{kra(riktig)}.</b> Skjermingsfradraget er kostprisen ganger skjermingsrenten: "
            f"{tall(kost)} × {prosent_tekst(rs)} = {talla(skj)}. "
            f"Skattepliktig utbytte er {tall(utbytte)} − {talla(skj)} = {talla(riktig)}.</p>")

    full = (
        f"<p><b>Hva skjermingen er.</b> I aksjonærmodellen skattlegges bare den delen av utbyttet som er høyere enn "
        f"en «normal» avkastning, omtrent det du ville fått på en risikofri plassering. Den normale delen heter "
        f"skjermingsfradraget og er skattefri. Fradraget regnes av <i>skjermingsgrunnlaget</i>: det du betalte for "
        f"aksjene (kostprisen) pluss eventuell ubenyttet skjerming fra tidligere år.</p>"
        f"<p><b>Steg 1: grunnlaget.</b> Kostprisen er {kr(kost)}. Det finnes ingen ubenyttet skjerming, så grunnlaget "
        f"er også {kr(kost)}. Markedsverdien på {kr(marked)} står i oppgaven for å friste. Den brukes i "
        f"formuesskatten, ikke her.</p>"
        f"<p><b>Steg 2: fradraget.</b> {tall(kost)} × {prosent_tekst(rs)} = {kra(skj)}. Renten treffer alltid "
        f"grunnlaget, aldri utbyttet.</p>"
        f"<p><b>Steg 3: skattepliktig utbytte.</b> {tall(utbytte)} − {talla(skj)} = <b>{kra(riktig)}</b>. Utbyttet "
        f"er større enn fradraget. Hele fradraget er derfor brukt opp. Ingenting framføres til neste år.</p>"
        f"<p><b>Hva skatten blir.</b> Skattepliktig utbytte oppjusteres med 1,72 og skattlegges med 22 %, altså "
        f"37,84 % samlet: {talla(riktig)} × 37,84 % = {kr(feil_skatt, 2)}. Det er skatten. Den står som et galt "
        f"alternativ her fordi spørsmålet spør etter grunnlaget.</p>"
        f"<p><b>Husk:</b> kostpris × skjermingsrente = fradrag. Utbytte − fradrag = skattepliktig utbytte, aldri "
        f"under null.</p>"
    )
    return sporsmal(q, alternativer, kort, full)


# ---------------------------------------------------------------------------
# aks-b01 · Hvorfor eierskatten er 37,84 %
# ---------------------------------------------------------------------------
statisk(
    "aks-b01", tema="aksjonar", type="begrep",
    hjelp="<p><b>Tenk på hele kjeden.</b> Et overskudd i et aksjeselskap skattlegges først i selskapet. Det som deles "
          "ut, skattlegges så hos eieren.</p>"
          "<p><b>Sammenlign med lønn.</b> Hva ville eieren betalt i skatt om pengene ble tatt ut som lønn i stedet? "
          "Regn samlet skatt på utdelt overskudd: selskapsskatten pluss eierskatten på det som er igjen.</p>"
          "<p><b>Stryk de gale.</b> Hvilke alternativer beskriver en skatt som faktisk betales av utbytte? Hvilke "
          "blander inn regler for lønn eller for tapsfradrag?</p>",
    q="<p>Utbytte og aksjegevinst for personlige aksjonærer skattlegges i dag med en effektiv sats på 37,84 %. "
      "Hva er den riktige begrunnelsen for at satsen er så mye høyere enn 22 %?</p>",
    alternativer=[
        R("Overskuddet er alt skattlagt i selskapet, så samlet skatt skal ligge nær toppskatten på lønn"),
        F("Den høye satsen skal betale staten for at den deler risikoen ved å eie aksjer",
          "Risikodeling er argumentet for fullt tapsfradrag (Domar–Musgrave), ikke for oppjusteringen."),
        F("Satsen skal gjøre det mindre lønnsomt å eie aksjer enn å ha pengene i banken",
          "Feil retning. Skjermingsfradraget gjør den risikofrie delen av avkastningen skattefri. Modellen er "
          "laget for ikke å straffe sparing i aksjer."),
        F("Satsen er 22 % pluss trygdeavgift og trinnskatt, som også betales av utbytte",
          "Trygdeavgift og trinnskatt betales av lønn og annen personinntekt, aldri av utbytte. "
          "37,84 % er 22 % × 1,72."),
    ],
    kort="<p>Overskuddet er alt skattlagt med 22 % i selskapet. "
         "Samlet skatt blir 22 % + 78 % × 37,84 % = 51,52 %, nær toppskatten på lønn (47,4 %). "
         "Da lønner det seg ikke å ta ut inntekt som utbytte i stedet for lønn.</p>",
    full="<p><b>To ledd.</b> Et selskapsoverskudd skattlegges først i selskapet med 22 %. Det som deles ut som "
         "utbytte, skattlegges så hos eieren. Uten eierskatt ville en eier som tar ut 100 kroner som utbytte, "
         "bare betalt 22 kroner i skatt. Tar hun ut 100 kroner som lønn, kan skatten bli 47,40 kroner. Eiere av "
         "egne selskaper ville da tatt ut alt som utbytte.</p>"
         "<p><b>Oppjusteringen.</b> Eierens utbytte etter skjerming ganges med 1,72 før det skattlegges med "
         "22 %. Det gir en effektiv sats på 22 % × 1,72 = 37,84 %.</p>"
         "<p><b>Samlet skatt.</b> Av 100 kroner i overskudd betaler selskapet 22. Eieren får 78 i utbytte og "
         "betaler 78 × 37,84 % = 29,52. Samlet blir det 22 + 29,52 = 51,52 kroner, altså 51,52 %. Det er litt over "
         "toppskatten på lønn, så det lønner seg ikke lenger å gjøre lønn om til utbytte.</p>"
         "<p><b>Hvorfor ikke dobbeltbeskatning av alt?</b> Skjermingsfradraget gjør den normale, risikofrie "
         "avkastningen skattefri hos eieren. Bare avkastning utover den får den høye satsen.</p>",
)


# ===========================================================================
# Felles hjelpere for resten av temaet
# ===========================================================================
import math as _math
import trening_lib as _L


# Flyttallsfeil kan legge et tall som 1 234,565 på 1 234,564999… og runde det feil
# vei. Innpakningene runder til ni desimaler før formateringen i trening_lib.
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
        "Emma", "Ola", "Kari", "Lars", "Ida", "Sindre", "Thea", "Martin", "Hedda", "Even", "Linnea", "Anders"]
TE = 37.84   # dagens eierskatt i prosent, 1,72 × 22 %


def ps(p):
    """Prosenttall som alt er i prosent, med så få desimaler som trengs: 3 → «3 %», 3.6 → «3,6 %»."""
    for d in (0, 1, 2):
        if abs(p * 10 ** d - round(p * 10 ** d)) < 1e-9:
            return tall(p, d) + NBSP + "%"
    return tall(p, 2) + NBSP + "%"


def tn(x, maks=2):
    """Tall med så få desimaler som trengs: 1.6 → «1,6», 1.72 → «1,72»."""
    for d in range(0, maks + 1):
        if abs(x * 10 ** d - round(x * 10 ** d)) < 1e-9:
            return tall(x, d)
    return tall(x, maks)


def trekk(r, lav, hoy, steg):
    """Et tilfeldig, rundt beløp mellom lav og høy (begge med), i hele steg."""
    a, b = _math.ceil(lav / steg), _math.floor(hoy / steg)
    if a > b:
        raise Avvis("tomt intervall")
    return r.randrange(a, b + 1) * steg


def steg_for(x):
    """Et rundt steg for beløp av størrelsen x."""
    for grense, s in ((200, 1), (2_000, 10), (20_000, 100), (200_000, 1_000), (2_000_000, 10_000)):
        if x < grense:
            return s
    return 50_000


def vis_ulike(*tekster):
    if len(set(tekster)) != len(tekster):
        raise Avvis("to alternativer blir like etter avrunding")


def velg_feller(riktig, kand, antall=3, rel=0.004, faste=0):
    """Velg feller fra kand = [(verdi, tekst, visning)]. De første «faste» tas alltid
       med; resten trekkes i rekkefølge. Ingen felle får ligge nærmere enn rel
       (relativt) fasiten eller en annen valgt felle."""
    valgt = []
    for v, tekst, vis in kand:
        if nær(v, riktig, rel) or any(nær(v, w, rel) for w, _, _ in valgt):
            if len(valgt) < faste:
                raise Avvis("en fast felle er for nær")
            continue
        valgt.append((v, tekst, vis))
        if len(valgt) == antall:
            return valgt
    raise Avvis("for få ulike feller")


_BRUKT = {}


def unik(fam, verdi):
    """Kast Avvis hvis en tidligere variant av familien har samme fasit."""
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


def aarsrekke(r, n):
    """Årsnavn og skjermingsrenter for n år: faktiske år med faktiske satser
       (2023: 3,2 %, 2024: 3,9 %, 2025: 3,6 %) eller «år 1, år 2 …» med eksempeltall."""
    faktisk = {2023: 3.2, 2024: 3.9, 2025: 3.6}
    if r.random() < 0.4:
        start = r.choice([2023, 2024]) if n <= 2 else 2023
        return [str(start + i) for i in range(n)], [faktisk[start + i] for i in range(n)], True
    return [f"år {i + 1}" for i in range(n)], [r.choice([2, 2.5, 3, 3.5, 4, 4.5, 5]) for _ in range(n)], False


def rentetekst(aar, renter, faktisk):
    deler = [f"{ps(x)} i {a}" for a, x in zip(aar, renter)]
    tekst = ", ".join(deler[:-1]) + " og " + deler[-1] if len(deler) > 1 else deler[0]
    return f"Skjermingsrenten var {tekst}" + (" (de faktiske satsene)." if faktisk else ".")


def kjede(K, renter, utbytter, grunnlag_med_framført=True):
    """Skjermingsrutinen år for år. Returnerer én rad per år med grunnlag S,
       årets fradrag F, framført inn U_inn, samlet fradrag, utbytte D,
       skattepliktig utbytte og framført ut U_ut."""
    rader, u = [], 0.0
    for rs, D in zip(renter, utbytter):
        S = K + u if grunnlag_med_framført else K
        F_ = S * rs / 100
        samlet = F_ + u
        rader.append(dict(S=S, F=F_, U_inn=u, samlet=samlet, D=D, skpl=max(0.0, D - samlet),
                          U_ut=max(0.0, samlet - D)))
        u = max(0.0, samlet - D)
    return rader


def kjedetabell(aar, rader):
    hode = ("<tr><th>År</th><th>Grunnlag</th><th>Årets fradrag</th><th>Framført inn</th><th>Utbytte</th>"
            "<th>Skattepliktig</th><th>Framført ut</th></tr>")
    linjer = "".join(
        f"<tr><td>{a}</td><td class=\"n\">{talla(x['S'])}</td><td class=\"n\">{talla(x['F'])}</td>"
        f"<td class=\"n\">{talla(x['U_inn'])}</td><td class=\"n\">{talla(x['D'])}</td>"
        f"<td class=\"n\">{talla(x['skpl'])}</td><td class=\"n\">{talla(x['U_ut'])}</td></tr>"
        for a, x in zip(aar, rader))
    return f"<table class=\"data\">{hode}{linjer}</table>"


# ===========================================================================
# HJELP: fremgangsmåten uten tallene fra spørsmålet (spesifikasjonen § 2b)
# ===========================================================================
def _s(*steg):
    return "".join(f"<p>{x}</p>" for x in steg)


_TO_AAR = ("<b>Steg 1: første år.</b> Fradrag = kostpris × årets skjermingsrente. Er utbyttet mindre, er skattepliktig "
           "utbytte null. Resten framføres som ubenyttet skjerming.",
           "<b>Steg 2: grunnlaget neste år</b> = kostpris + ubenyttet skjerming.",
           "<b>Steg 3: årets fradrag</b> = grunnlaget × årets skjermingsrente.",
           "<b>Steg 4: skattepliktig utbytte</b> = utbytte − årets fradrag − ubenyttet skjerming.")
_KJEDE = ("<b>Steg 1: selskapsskatt</b> = 22 % × overskudd. <b>Steg 2: utbytte</b> = overskudd − selskapsskatt.",
          "<b>Steg 3: skjerming</b> = kostpris × skjermingsrente. Skattepliktig utbytte = utbytte − skjerming.",
          "<b>Steg 4: eierskatt</b> = skattepliktig utbytte × faktor × sats.")
_HOLD = ("<b>Steg 1: Drift AS.</b> Eierens andel = eierandel × overskudd. Selskapsskatt = 22 % av andelen. Resten går "
         "som utbytte til holdingselskapet.",
         "<b>Steg 2: holdingselskapet.</b> Eier det mer enn 90 % av aksjene og stemmene, er utbyttet fritatt. Ellers "
         "inntektsføres 3 % av utbyttet, og skatten blir 0,66 % av det.".replace("utbyttet, og skatten", "utbyttet. Skatten"))

HJA = {
    "aks-skj2": {
        "grunnlag": _s(*_TO_AAR, "<b>Pass på:</b> den framførte skjermingen skal både inn i skjermingsgrunnlaget og "
                       "trekkes fra. Spørsmålet ber om skattepliktig utbytte, ikke skjermingsgrunnlaget og ikke skatten."),
        "skatt": _s(*_TO_AAR, "<b>Steg 5: skatten</b> = skattepliktig utbytte × 1,72 × 22 %, altså × 37,84 %.",
                    "<b>Pass på:</b> den framførte skjermingen skal både inn i grunnlaget og trekkes fra. Glem ikke "
                    "oppjusteringen."),
    },
    "aks-skj3": _s("Gjør rutinen én rad per år, i rekkefølge.",
                   "<b>Grunnlag</b> = kostpris + ubenyttet skjerming fra året før. <b>Årets fradrag</b> = grunnlag × årets "
                   "rente. <b>Samlet skjerming</b> = årets fradrag + framført.",
                   "Er utbyttet større enn samlet skjerming, er differansen skattepliktig. Ingenting framføres. Er det "
                   "mindre, er skattepliktig null. Resten framføres.",
                   "<b>Pass på:</b> framført skjerming løfter grunnlaget og trekkes fra. Ikke svar med et mellomtall som "
                   "årets fradrag eller samlet fradrag."),
    "aks-skj4": {
        "fritt": _s("<b>Steg 1: første år.</b> Fradrag = kostpris × rente. Det som ikke gikk med til utbyttet, framføres.",
                    "<b>Steg 2: neste år.</b> Grunnlag = kostpris + framført. Fradrag = grunnlag × årets rente.",
                    "<b>Steg 3: skattefritt utbytte</b> = årets fradrag + framført skjerming.",
                    "<b>Pass på:</b> det framførte skal både løfte grunnlaget og legges til. Skjerming som er brukt mot "
                    "utbytte, er borte."),
        "saldo": _s("<b>Steg 1: første år.</b> Fradrag = kostpris × årets rente. Framført = fradrag − utbytte, men aldri "
                    "under null.",
                    "<b>Steg 2: andre år.</b> Grunnlag = kostpris + framført. Fradrag = grunnlag × årets rente.",
                    "<b>Steg 3: ny saldo</b> = årets fradrag + framført − årets utbytte, men aldri under null.",
                    "<b>Pass på:</b> det framførte skal forrentes gjennom grunnlaget. Begge utbyttene trekkes fra, men "
                    "hvert bare én gang. Saldoen etter første år er et mellomtall."),
        "grunnlag": _s("<b>Steg 1: første år.</b> Fradrag = kostpris × årets rente. Framført = fradrag − utbytte, men "
                       "aldri under null.",
                       "<b>Steg 2: andre år.</b> Grunnlag = kostpris + framført. Årets fradrag = grunnlag × årets rente. "
                       "Ny saldo = årets fradrag + framført − årets utbytte, men aldri under null.",
                       "<b>Steg 3: grunnlaget året etter</b> = kostpris + den nye saldoen.",
                       "<b>Pass på:</b> markedsverdien brukes aldri. Skjerming som er brukt mot utbytte, legges ikke til. "
                       "Bruk saldoen fra siste år."),
    },
    "aks-gev1": {
        "skatt": _s("<b>Steg 1: gevinst</b> = salgspris − inngangsverdi − ubenyttet skjerming.",
                    "<b>Steg 2: skatt</b> = gevinst × faktor × sats. Regn også med faktor × sats som én sats. Begge veier "
                    "skal gi det samme.",
                    "<b>Pass på:</b> oppjuster bare én gang. Glemt oppjustering gir et svar som er rundt seks tideler av "
                    "det riktige. Skjermingen trekkes fra, og den skattlegges ikke.".replace("fra, og den", "fra. Den")),
        "gevinst": _s("<b>Steg 1:</b> salgspris − inngangsverdi.",
                      "<b>Steg 2:</b> trekk fra den ubenyttede skjermingen. Ingen ny skjerming for salgsåret.",
                      "<b>Pass på:</b> spørsmålet ber om den skattepliktige gevinsten, ikke skatten. Skjermingen kan bare "
                      "gjøre gevinsten mindre."),
    },
    "aks-gev2": {
        "gevinst": _s("<b>Steg 1: framført skjerming.</b> For hvert år aksjene ble eid ved årsskiftet: grunnlag × rente. "
                      "Uten utbytte framføres alt og legges til grunnlaget året etter.",
                      "<b>Steg 2: salgsåret.</b> Aksjene er solgt før årsskiftet, så det gis ingen skjerming det året.",
                      "<b>Steg 3: gevinst</b> = salgspris − inngangsverdi − framført skjerming.",
                      "<b>Pass på:</b> fradraget for salgsåret går til kjøperen."),
        "skatt": _s("<b>Steg 1: framført skjerming.</b> For hvert år aksjene ble eid ved årsskiftet: grunnlag × rente. "
                    "Uten utbytte framføres alt og legges til grunnlaget året etter.",
                    "<b>Steg 2: salgsåret.</b> Solgt før årsskiftet gir ingen skjerming det året.",
                    "<b>Steg 3: gevinst</b> = salgspris − inngangsverdi − framført skjerming. <b>Steg 4: skatt</b> = "
                    "gevinst × 37,84 %.",
                    "<b>Pass på:</b> fradraget for salgsåret går til kjøperen. Glem ikke oppjusteringen."),
    },
    "aks-eier1": {
        "skatt": _s("<b>Steg 1: skjermingsfradrag</b> = kostpris × skjermingsrente.",
                    "<b>Steg 2: skattepliktig utbytte</b> = utbytte − skjerming.",
                    "<b>Steg 3: skatt</b> = skattepliktig utbytte × faktor × sats. Kontroller med faktor × sats som én sats.",
                    "<b>Pass på:</b> trekk fra skjermingen før du oppjusterer. Oppjuster bare én gang."),
        "netto": _s("<b>Steg 1: skjermingsfradrag</b> = kostpris × skjermingsrente.",
                    "<b>Steg 2: skatt</b> = (utbytte − skjerming) × faktor × sats.",
                    "<b>Steg 3: igjen</b> = hele utbyttet − skatten.",
                    "<b>Pass på:</b> trekk fra skjermingen før du oppjusterer. Den skjermede delen av utbyttet beholder "
                    "eieren også."),
    },
    "aks-samlet1": {
        "eierskatt": _s(*_KJEDE, "<b>Pass på:</b> eierskatten regnes av utbyttet etter selskapsskatt, ikke av overskuddet "
                        "før skatt. Trekk fra skjermingen før oppjusteringen."),
        "samlet": _s(*_KJEDE, "<b>Steg 5:</b> legg sammen selskapsskatt og eierskatt.",
                     "<b>Pass på:</b> begge skattene skal med. Eierskatten regnes av utbyttet, ikke av overskuddet."),
        "netto": _s(*_KJEDE, "<b>Steg 5: igjen</b> = utbytte − eierskatt.",
                    "<b>Pass på:</b> start fra utbyttet etter selskapsskatt. Den skjermede delen beholder eieren også."),
    },
    "aks-frit1": _s("<b>Steg 1: gå gjennom postene én for én.</b> Gevinst og tap på aksjer i EØS følger fritaksmetoden: "
                    "ingen skatt og ingen fradrag.",
                    "<b>Steg 2: utbytte.</b> Sjekk eierandelen. Mer enn 90 % av aksjene og stemmene: fritatt. 90 % eller "
                    "mindre: 3 % av utbyttet inntektsføres.",
                    "<b>Steg 3: skatt</b> = inntektsført beløp × 22 %, altså 0,66 % av utbyttet.",
                    "<b>Pass på:</b> 3 % er ikke skattesatsen. Regelen gjelder ikke gevinst. Nøyaktig 90 % er ikke mer "
                    "enn 90 %."),
    "aks-hold1": {
        "sats": _s(*_HOLD, "<b>Steg 3: eierskatt</b> = det holdingselskapet deler ut × 37,84 %.",
                   "<b>Steg 4: samlet sats</b> = (selskapsskatt + skatt i holdingselskapet + eierskatt) / eierens andel.",
                   "<b>Pass på:</b> holdingselskapet betaler ikke 22 % av utbyttet. Treprosentregelen gjelder bare ved "
                   "90 % eller lavere."),
        "netto": _s(*_HOLD, "<b>Steg 3: eierskatt</b> = det holdingselskapet deler ut × 37,84 %.",
                    "<b>Steg 4: igjen</b> = utdelt fra holdingselskapet − eierskatt.",
                    "<b>Pass på:</b> fritaksmetoden fritar holdingselskapet, ikke eieren."),
        "utsatt": _s(*_HOLD, "<b>Steg 3:</b> pengene blir stående i holdingselskapet. Eierskatten er ikke betalt ennå. "
                     "Betalt så langt = selskapsskatt + eventuell skatt etter treprosentregelen.",
                     "<b>Pass på:</b> ikke ta med eierskatten. Holdingselskapet skal ikke betale 22 % av utbyttet."),
    },
    "aks-uf1": _s("<b>Steg 1: skjerming hvert år</b> = kostpris × årets rente. Er utbyttet større enn skjermingen, framføres ingenting.",
                  "<b>Steg 2: eierskatt hvert år</b> = (utbytte − skjerming) × eierskatten.",
                  "<b>Steg 3: formuesskatt per år</b> = børsverdi × 80 % × formuesskattesatsen. Den betales hvert år.",
                  "<b>Steg 4: igjen</b> = sum utbytte − sum eierskatt − formuesskatt for begge år.",
                  "<b>Pass på:</b> hvert år har sitt eget fradrag. Glem ikke rabatten."),
}

HSA = {
    "aks-s01": _s("Skjermingen skal gjøre en risikofri avkastning på det eieren har skutt inn, skattefri.",
                  "Spør: hva har eieren skutt inn, og hvilken skjerming er ennå ikke brukt? Stryk alternativer med "
                  "markedsverdien eller med skjerming som alt er brukt mot utbytte.".replace("inn, og hvilken",
                                                                                          "inn? Hvilken")),
    "aks-s02": _s("Regelen: skjermingsfradraget for et år går til den som eier aksjen ved utgangen av året.",
                  "Fradraget fordeles ikke etter måneder, og det faller ikke bort ved eierskifte. Finn ut hvem som eier "
                  "aksjen ved årsskiftet.".replace("måneder, og det", "måneder. Det")),
    "aks-s03": '<p>Skjermingen beregnes med en risikofri rente på det eieren har skutt inn. Sammenlign med gjeld: renter på lån gir fradrag, men eierens egen alternativkostnad gir det ikke. Spør: hvilken del av avkastningen dekker en risikofri rente? Hvilken del dekker den ikke? Test hvert alternativ: passer begrunnelsen med at renten er risikofri og beregnes av innskutt kapital, eller ville den krevd en annen rente eller en annen mekanisme?</p>',
    "aks-s04": _s("Spør to ting om den ubenyttede skjermingen. Endrer den grunnlaget neste år? Trekkes den fra utbyttet "
                  "neste år?",
                  "Kontroll: samlet skjerming neste år kan regnes som framført × (1 + rente) + kostpris × rente. Stryk "
                  "svar der skjermingen går tapt."),
    "aks-s05": '<p>Bygg renten ut fra formålet: skjermingen skal gjøre en risikofri avkastning skattefri.</p><p><b>Steg 1:</b> hvilken markedsrente er risikofri på kort sikt, en børsavkastning, en styringsrente eller en rente på statspapirer?</p><p><b>Steg 2:</b> skjermingen er selv skattefri, mens en risikofri plassering skattlegges. Skal renten da måles før eller etter skatt?</p><p><b>Steg 3:</b> sjekk både rentekilden og justeringen i hvert alternativ. Ett feil ledd gjør alternativet galt.</p>',
    "aks-s06": _s("<b>Steg 1:</b> legg påslaget til snittet.",
                  "<b>Steg 2:</b> gang med (1 − 22 %).",
                  "<b>Steg 3:</b> rund av til nærmeste tidel.",
                  "<b>Pass på rekkefølgen:</b> påslaget først, så skattejusteringen. Glem ikke påslaget, og glem ikke "
                  "skattejusteringen.".replace("påslaget, og glem", "påslaget. Glem heller")),
    "aks-s07": _s("Vurder påstandene hver for seg.",
                  "Skjermingen trekkes fra gevinsten, men aldri slik at resultatet blir under null. Kan den da gjøre et "
                  "tap større? Tenk på asymmetrien i modellen."),
    "aks-s08": '<p>Fritaksmetoden skal hindre at samme overskudd skattlegges flere ganger i en kjede av selskaper. Spør tre ting. Hva skjer med utbytte når det går mellom aksjeselskaper? Hva skjer med gevinst? Hva ville det betydd for symmetrien om inntekten var fri mens tap ga fradrag? Husk at eieren her er et selskap. Vurder hvert alternativ på alle tre punktene.</p>',
    "aks-s09": _s("Sjekk tre ting. Gjelder regelen utbytte, gevinst eller begge? Er 3 % en skattesats eller en andel som "
                  "inntektsføres? Hva skjer når mottakeren eier mer enn 90 % av aksjene og stemmene?"),
    "aks-s10": '<p>Tenk på et selskap som eier aksjer. Inntekten fra aksjene er fritatt, men selskapet har også utgifter knyttet til den. Spør: gir de utgiftene fradrag i annen inntekt? Hvilken skjevhet oppstår da? Hvordan kan loven rette den opp på en enkel måte, uten å granske hver enkelt utgift? Test hvert alternativ: forklarer det en skjevhet i selskapets eget skattegrunnlag?</p>',
    "aks-s11": '<p>Følg én krone overskudd gjennom flere selskaper på vei til en personlig eier. Spør: hva ville skjedd med samlet skatt om hvert selskap i kjeden betalte skatt av utbyttet det mottok? Hva endrer fritaksmetoden i den kjeden? Husk at fritaksmetoden gjelder mellom selskaper og ikke fjerner skatten hos personen. Test hvert alternativ: beskriver det formålet med fritaket?</p>',
    "aks-s12": '<p>Samlet skatt ved uttak er den samme med og uten holdingselskap. Spør derfor hva annet enn satsen som kan skille de to veiene. Tenk på når eierskatten betales i hvert tilfelle. Hva er det verdt å kunne investere pengene videre før en skatt betales? Test hvert alternativ mot to krav: det må stemme med at samlet skatt er lik. Det må også stemme med fritaksmetodens regel for tap.</p>',
    "aks-s13": _s("Regelen fra 2015: lån fra et selskap til en personlig aksjonær behandles ikke som et vanlig lån. Som "
                  "hva, og når?".replace("hva, og når?", "hva? Og når?"),
                  "Sjekk også om forskriftens unntak for små lån som betales raskt tilbake, kan gjelde her."),
    "aks-s14": '<p>Beskriv modellen med tre spørsmål. Hva skattlegges: all avkastning eller bare en del av den? Når utløses skatten: hvert år eller ved en bestemt hendelse? Hos hvem betales eierskatten: i selskapet eller hos personen? Svar på alle tre før du ser på alternativene. Test så hvert alternativ mot svarene dine.</p>',
    "aks-s15": _s("Regn samlet skatt på én krone. Selskapsskatt først. Så eierskatt på det som er igjen.",
                  "Sammenlign med toppskatten på lønn, 47,4 %. Er utbytte billigere eller dyrere enn lønn? Hvilken vei "
                  "vil eieren da flytte inntekt? Stryk tall der satsene er lagt rett sammen."),
    "aks-s16": _s("Trekk t fra begge sider av likningen. Del så på det som står foran f, altså (1 − t) × t.",
                  "Kontroll: med a lik null og dagens satser skal f bli lavere enn 1,72. Stryk uttrykk som glemmer å "
                  "trekke fra t, glemmer å dele på t eller snur fortegnet på a."),
    "aks-s17": _s("Nøytralitet krever at staten deler oppside og nedside likt.",
                  "Spør hva som skjer med ubenyttet skjerming når aksjen selges med tap. Spør også om investoren kan låne "
                  "til skjermingsrenten. Stryk påstander med feil satser eller feil retning."),
    "aks-s18": '<p>Innlåsing er en atferdseffekt av skattesystemet. Spør: når betaler en personlig eier skatt på en kursgevinst i Norge? Er det løpende hvert år eller ved en bestemt hendelse? Tenk på en eier som har en bedre aksje i sikte. Hva gjør skattereglene med lysten til å bytte? Test hvert alternativ: beskriver det en atferd som følger av skattereglene?</p>',
    "aks-s19": _s("Vurder påstandene hver for seg.",
                  "Skjermingen regnes per aksje og tilhører eieren. Hva skjer da med selgerens ubenyttede skjerming ved "
                  "salg? Hva blir kjøperens grunnlag?"),
    "aks-s20": '<p>Regelen: skjerming for et år gis til den som eier aksjen ved utgangen av året. Den beregnes av skjermingsgrunnlaget.</p><p><b>Steg 1:</b> tegn en tidslinje med kjøp, salg og årsskiftene.</p><p><b>Steg 2:</b> sjekk om personen eide aksjen ved minst ett årsskifte.</p><p><b>Steg 3:</b> avgjør hvor mye skjerming som da finnes å trekke fra gevinsten.</p>',
    "aks-s21": _s("Skjermingen er et fast fradrag i utbyttet, ikke en lavere sats.",
                  "Spart skatt = skjermingsfradraget × eierskatten, så lenge utbyttet er større enn fradraget. Regn den "
                  "for hvert utbytte. Avhenger den av hvor stort utbyttet er?"),
    "aks-s22": '<p>Riktig skatt er gevinst etter skjerming ganget med oppjusteringsfaktoren og satsen.</p><p><b>Steg 1:</b> skriv opp regnestykket for hver feil i alternativene. Glemt skjerming gjør grunnlaget større. Dobbel skjerming gjør det mindre. Glemt eller doblet oppjustering endrer faktoren.</p><p><b>Steg 2:</b> del det oppgitte tallet på riktig skatt.</p><p><b>Steg 3:</b> finn feilen som gir akkurat det forholdet.</p>',
    "aks-s24": _s("Fritaksmetoden gjør utbytte mellom aksjeselskaper skattefritt. Over 90 % gjelder heller ikke "
                  "treprosentregelen.",
                  "Følg én krone gjennom kjeden og legg sammen skattene. Vurder hver påstand for seg."),
    "aks-s25": _s("Grunnlaget bygger på det eieren har skutt inn, inngangsverdien, pluss ubenyttet skjerming.",
                  "Hva skjer med inngangsverdien når eieren skyter inn mer egenkapital? Oppjusteringen gjelder skatten, "
                  "ikke grunnlaget."),
    "aks-s26": '<p>Skjermingen skal svare til en risikofri avkastning eieren kunne fått et annet sted. Fradraget gir selv ingen skatt.</p><p><b>Steg 1:</b> hvordan skattlegges den risikofrie plasseringen eieren sammenligner med?</p><p><b>Steg 2:</b> når fradraget er skattefritt, skal det da svare til den risikofrie renten før eller etter skatt?</p><p><b>Steg 3:</b> test hvert alternativ. Forklarer det justeringen ut fra skjermingens formål?</p>',
    "aks-s27": _s("Personlig aksjonær: tap behandles som gevinst, oppjustert og med 22 %, altså 37,84 %.",
                  "Aksjeselskap: fritaksmetoden gir ingen skatt på gevinst. Hva betyr symmetrien for tap? Regn verdien "
                  "av fradraget for hver."),
    "aks-s29": '<p>Se på hva hver regel gjør alene. Fritaksmetoden: hva skjer med skatten når et selskap selger aksjer med gevinst og investerer på nytt? Aksjonærmodellen: når betaler personen skatt? Sett dem sammen. Hvem styrer da tidspunktet for eierskatten? Hva er det økonomisk verdt å betale en skatt senere? Test hvert alternativ: er samlet skatt ved uttak endret, eller er det noe annet som endres?</p>',
}


# ---------------------------------------------------------------------------
# aks-skj2 · Framført skjerming over to år (R1, H2025 oppgave 4)
# ---------------------------------------------------------------------------
@familie("aks-skj2", tema="aksjonar", antall=6, tittel="Framført skjerming, to år")
def _(r):
    modus = syklus("aks-skj2", ["grunnlag", "skatt", "grunnlag"])
    navn = r.choice(NAVN)
    aar, (r1, r2), faktisk = aarsrekke(r, 2)
    K = r.choice([trekk(r, 100_000, 1_000_000, 50_000), trekk(r, 1_000_000, 4_000_000, 250_000)])
    F1 = K * r1 / 100
    D1 = 0 if r.random() < 0.4 else trekk(r, F1 * 0.2, F1 * 0.75, steg_for(F1))
    U1 = F1 - D1
    S2 = K + U1
    F2 = S2 * r2 / 100
    samlet = F2 + U1
    D2 = trekk(r, samlet * 1.3, samlet * 3, steg_for(samlet))
    g = D2 - samlet
    b = D2 - U1 - K * r2 / 100            # framført trukket fra, men ikke lagt til grunnlaget
    c = D2 - F2                            # lagt til grunnlaget, men ikke trukket fra
    a = D2 - K * r2 / 100                  # framføringen glemt helt
    if b - g < 0.004 * g:
        raise Avvis("hovedfella ligger for tett på fasiten")
    te = TE / 100
    d1_tekst = (f"Selskapet betalte ikke utbytte i {aar[0]}" if D1 == 0 else f"Utbyttet var {kr(D1)} i {aar[0]}")
    q = (f"<p>{navn} kjøpte aksjer i januar {aar[0]} for {kr(K)}, som er kostprisen. {navn} eide dem ved utgangen av begge "
         f"årene. Det fantes ingen ubenyttet skjerming fra før. {d1_tekst} og {kr(D2)} i {aar[1]}. "
         f"{rentetekst(aar, [r1, r2], faktisk)}</p>")
    T_b = (f"Den framførte skjermingen er trukket fra, men ikke lagt til grunnlaget: {tall(D2)} − {talla(U1)} − "
           f"{tall(K)} × {ps(r2)}. Grunnlaget i {aar[1]} er {talla(S2)}, ikke {tall(K)}.")
    T_c = (f"Den framførte skjermingen er lagt til grunnlaget, men ikke trukket fra: {tall(D2)} − {talla(S2)} × {ps(r2)}. "
           f"Resten fra {aar[0]} skal også trekkes fra utbyttet.")
    T_a = f"Framføringen glemt helt: {tall(D2)} − {tall(K)} × {ps(r2)}. Skjermingen fra {aar[0]} går ikke tapt."
    if modus == "grunnlag":
        riktig = g
        q += f"<p>Hva er {gen(navn)} skattepliktige utbytte i {aar[1]}?</p>"
        kand = [(b, T_b, kra(b)), (c, T_c, kra(c)), (a, T_a, kra(a)),
                (samlet, f"Dette er det samlede skjermingsfradraget i {aar[1]}, {talla(F2)} + {talla(U1)}, et mellomtall. "
                         f"Det skal trekkes fra utbyttet.", kra(samlet)),
                (g * te, f"Dette er skatten, {talla(g)} × 37,84 %. Spørsmålet ber om det skattepliktige utbyttet.",
                 kr(g * te, 2))]
        kand = kand[:1] + r.sample(kand[1:], len(kand) - 1)
    else:
        riktig = g * te
        q += (f"<p>Oppjusteringsfaktoren er 1,72 og skattesatsen på alminnelig inntekt 22 %. Hvor mye eierskatt betaler "
              f"{navn} på utbyttet i {aar[1]}?</p>")
        kand = [(b * te, f"Den framførte skjermingen er trukket fra, men ikke lagt til grunnlaget: ({tall(D2)} − "
                         f"{talla(U1)} − {tall(K)} × {ps(r2)}) × 37,84 %.", kra(b * te)),
                (g * 0.22, f"Oppjusteringen glemt: {talla(g)} × 22 %. Skattepliktig utbytte skal ganges med 1,72 først.",
                 kra(g * 0.22)),
                (a * te, f"Framføringen glemt helt: ({tall(D2)} − {tall(K)} × {ps(r2)}) × 37,84 %.", kra(a * te)),
                (g, f"Dette er det skattepliktige utbyttet, ikke skatten. Det skal ganges med 1,72 × 22 %.", kra(g)),
                (c * te, f"Den framførte skjermingen er lagt til grunnlaget, men ikke trukket fra: ({tall(D2)} − "
                         f"{talla(S2)} × {ps(r2)}) × 37,84 %.", kra(c * te))]
        kand = kand[:1] + r.sample(kand[1:], len(kand) - 1)
    valgt = velg_feller(riktig, kand, rel=0.003, faste=1)
    alternativer = [R(kra(riktig), riktig)] + [F(vis, tekst, v) for v, tekst, vis in valgt]
    vis_ulike(*[x.tekst for x in alternativer])

    skatt_kort = f" Skatten er {talla(g)} × 37,84 % = {kra(riktig)}." if modus == "skatt" else ""
    kort = (f"<p><b>{kra(riktig)}.</b> Framført fra {aar[0]}: {talla(U1)}. Grunnlaget i {aar[1]} er {talla(S2)}, som gir "
            f"fradraget {talla(F2)}. Skattepliktig: {tall(D2)} − {talla(F2)} − {talla(U1)} = {talla(g)}.{skatt_kort}</p>")
    skatt_steg = (f"<p><b>Steg 5: skatten.</b> {talla(g)} × 1,72 = {talla(g * 1.72)}. {talla(g * 1.72)} × 22 % = "
                  f"<b>{kra(riktig)}</b>. Den andre veien: {talla(g)} × 37,84 % = {kra(riktig)}.</p>" if modus == "skatt" else "")
    full = (
        f"<p><b>Hva ubenyttet skjerming gjør.</b> Skjermingsfradraget gjør en normal avkastning skattefri. Er utbyttet "
        f"mindre enn fradraget, går resten ikke tapt. Det framføres som ubenyttet skjerming og virker to ganger neste "
        f"år. Det legges til skjermingsgrunnlaget, så neste års fradrag blir større. I tillegg trekkes det fra neste "
        f"års utbytte sammen med årets fradrag.</p>"
        f"<p><b>Steg 1: {aar[0]}.</b> Grunnlaget er kostprisen, {tall(K)}. Fradrag: {tall(K)} × {ps(r1)} = {talla(F1)}. "
        f"Utbyttet er {tall(D1)}, så skattepliktig utbytte er 0. Framført: {talla(F1)} − {tall(D1)} = {talla(U1)}.</p>"
        f"<p><b>Steg 2: grunnlaget i {aar[1]}.</b> {tall(K)} + {talla(U1)} = {talla(S2)}.</p>"
        f"<p><b>Steg 3: årets fradrag.</b> {talla(S2)} × {ps(r2)} = {talla(F2)}.</p>"
        f"<p><b>Steg 4: skattepliktig utbytte.</b> {tall(D2)} − {talla(U1)} − {talla(F2)} = "
        + (f"<b>{kra(g)}</b>." if modus == "grunnlag" else f"{talla(g)}.") + " Hele skjermingen er brukt opp.</p>"
        + skatt_steg +
        f"<p><b>Kontroll.</b> Den framførte skjermingen forrenter seg. Samlet fradrag i {aar[1]} kan regnes som "
        f"{talla(U1)} × {tn(1 + r2 / 100, 3)} + {tall(K)} × {ps(r2)} = {talla(U1 * (1 + r2 / 100))} + {talla(K * r2 / 100)} = "
        f"{talla(samlet)}. Samme tall som {talla(F2)} + {talla(U1)}. ✓</p>"
        f"<p><b>Husk:</b> ubenyttet skjerming legges til grunnlaget <i>og</i> trekkes fra neste utbytte.</p>"
    )
    unik("aks-skj2", riktig)
    return sporsmal(q, alternativer, kort, full, hjelp=HJA["aks-skj2"][modus])


# ---------------------------------------------------------------------------
# aks-skj3 · Skjermingskjeden over tre år (R1, H2024 oppgave 1)
# ---------------------------------------------------------------------------
@familie("aks-skj3", tema="aksjonar", antall=6, tittel="Skjermingskjeden over tre år")
def _(r):
    monster = syklus("aks-skj3", ["A", "C", "B", "A", "C", "A"])
    navn = r.choice(NAVN)
    aar, renter, faktisk = aarsrekke(r, 3)
    smaa = r.random() < 0.2
    K = r.choice([1_000, 10_000]) if smaa else r.choice([trekk(r, 100_000, 900_000, 50_000),
                                                        trekk(r, 1_000_000, 3_000_000, 250_000)])
    F1 = K * renter[0] / 100
    st = steg_for(F1)
    if monster == "A":           # år 1 over fradraget, år 2 under, år 3 over (H2024 oppgave 1)
        D1 = trekk(r, F1 * 1.3, F1 * 2.5, st)
    else:                        # år 1 under fradraget
        D1 = 0 if r.random() < 0.3 else trekk(r, F1 * 0.2, F1 * 0.7, st)
    rad1 = kjede(K, renter[:1], [D1])[0]
    U1 = rad1["U_ut"]
    tot2 = (K + U1) * renter[1] / 100 + U1
    if monster == "A":
        D2 = trekk(r, tot2 * 0.2, tot2 * 0.7, st)
    elif monster == "B":
        D2 = 0
    else:
        D2 = trekk(r, tot2 * 0.3, tot2 * 0.8, st)
    rader2 = kjede(K, renter[:2], [D1, D2])
    U2 = rader2[1]["U_ut"]
    if U2 <= 0:
        raise Avvis("ingen framføring inn i år 3")
    tot3 = (K + U2) * renter[2] / 100 + U2
    D3 = trekk(r, tot3 * 1.3, tot3 * 3, steg_for(tot3))
    rader = kjede(K, renter, [D1, D2, D3])
    x3 = rader[2]
    riktig = x3["skpl"]
    tf = kjede(K, renter, [D1, D2, D3], grunnlag_med_framført=False)[2]["skpl"]
    lg = D3 - x3["F"]
    gh = D3 - K * renter[2] / 100
    kand = [
        (tf, f"Den framførte skjermingen er trukket fra, men aldri lagt til grunnlaget, som da står på {tall(K)} alle år. "
             f"Ubenyttet skjerming løfter også neste års grunnlag.", kra(tf)),
        (lg, f"Bare årets fradrag trukket fra: {tall(D3)} − {talla(x3['F'])}. Den framførte skjermingen på {talla(U2)} er "
             f"lagt til grunnlaget, men ikke trukket fra.", kra(lg)),
        (gh, f"Framføringen glemt helt: {tall(D3)} − {tall(K)} × {ps(renter[2])}.", kra(gh)),
        (x3["samlet"], f"Dette er det samlede fradraget i {aar[2]}, {talla(x3['F'])} + {talla(U2)}. Et riktig mellomtall "
                       f"på feil linje.", kra(x3["samlet"])),
    ]
    kand = kand[:2] + r.sample(kand[2:], 2)
    valgt = velg_feller(riktig, kand, rel=0.003, faste=1)
    alternativer = [R(kra(riktig), riktig)] + [F(vis, tekst, v) for v, tekst, vis in valgt]
    vis_ulike(*[a.tekst for a in alternativer])

    tabell = ("<table class=\"data\"><tr><th>År</th><th>Utbytte (kr)</th><th>Skjermingsrente</th></tr>"
              + "".join(f"<tr><td>{a}</td><td class=\"n\">{tall(D)}</td><td class=\"n\">{ps(x)}</td></tr>"
                        for a, D, x in zip(aar, [D1, D2, D3], renter)) + "</table>")
    q = (f"<p>{navn} kjøpte aksjer i januar {aar[0]} for {kr(K)}, som er kostprisen. {navn} eide aksjene ved utgangen av "
         f"alle tre årene og hadde ingen ubenyttet skjerming fra før. Utbytte og skjermingsrente"
         + (" (de faktiske satsene)" if faktisk else "") + f":</p>{tabell}"
         f"<p>Hva er {gen(navn)} skattepliktige utbytte i {aar[2]}?</p>")
    kort = (f"<p><b>{kra(riktig)}.</b> Framført inn i {aar[2]}: {talla(U2)}. Grunnlaget blir {talla(x3['S'])} og årets "
            f"fradrag {talla(x3['F'])}. {tall(D3)} − {talla(x3['F'])} − {talla(U2)} = {talla(riktig)}.</p>")
    r1, r2_ = rader[0], rader[1]
    aar1 = (f"<p><b>Steg 1: {aar[0]}.</b> {tall(K)} × {ps(renter[0])} = {talla(r1['F'])}. "
            + (f"Utbyttet er større, så {tall(D1)} − {talla(r1['F'])} = {talla(r1['skpl'])} er skattepliktig. Ingenting "
               f"framføres.</p>" if r1["U_ut"] == 0 else
               f"Utbyttet er {tall(D1)}, så skattepliktig er 0 og {talla(r1['U_ut'])} framføres.</p>"))
    aar2 = (f"<p><b>Steg 2: {aar[1]}.</b> Grunnlag {tall(K)} + {talla(r1['U_ut'])} = {talla(r2_['S'])}. Fradrag "
            f"{talla(r2_['S'])} × {ps(renter[1])} = {talla(r2_['F'])}, pluss framført {talla(r2_['U_inn'])}: samlet "
            f"{talla(r2_['samlet'])}. Utbyttet er {tall(D2)}, så skattepliktig er 0. Framført: {talla(r2_['samlet'])} − "
            f"{tall(D2)} = {talla(U2)}.</p>")
    sum_skpl = sum(x["skpl"] for x in rader)
    sum_brukt = sum(min(x["D"], x["samlet"]) for x in rader)
    full = (
        f"<p><b>Rutinen.</b> Hvert år: grunnlag = kostpris + ubenyttet skjerming fra året før. Fradrag = grunnlag × "
        f"skjermingsrenten. Skattepliktig utbytte = utbytte − årets fradrag − framført skjerming, aldri under null. Det "
        f"som ikke brukes, framføres. Framført skjerming virker altså to ganger: den løfter grunnlaget og trekkes fra.</p>"
        + aar1 + aar2 +
        f"<p><b>Steg 3: {aar[2]}.</b> Grunnlag {tall(K)} + {talla(U2)} = {talla(x3['S'])}. Fradrag {talla(x3['S'])} × "
        f"{ps(renter[2])} = {talla(x3['F'])}. Skattepliktig: {tall(D3)} − {talla(x3['F'])} − {talla(U2)} = "
        f"<b>{kra(riktig)}</b>.</p>"
        + kjedetabell(aar, rader) +
        f"<p><b>Kontroll.</b> Den framførte skjermingen forrenter seg. Samlet fradrag i {aar[2]} kan derfor regnes som "
        f"{talla(U2)} × {tn(1 + renter[2] / 100, 3)} + {tall(K)} × {ps(renter[2])} = {talla(U2 * (1 + renter[2] / 100))} + "
        f"{talla(K * renter[2] / 100)} = {talla(x3['samlet'])}, samme tall som {talla(x3['F'])} + {talla(U2)}. ✓ Summen "
        f"av skattepliktig utbytte og brukt skjerming over alle år, {talla(sum_skpl)} + {talla(sum_brukt)}, er "
        f"{talla(sum_skpl + sum_brukt)}. Det er summen av utbyttene.</p>"
        f"<p><b>Husk:</b> skriv grunnlag, årets fradrag og framført rest på hver sin linje før du trekker fra.</p>"
    )
    unik("aks-skj3", riktig)
    return sporsmal(q, alternativer, kort, full, hjelp=HJA["aks-skj3"])


# ---------------------------------------------------------------------------
# aks-skj4 · Ubenyttet skjerming: skattefritt utbytte, saldo og grunnlag (R1)
# ---------------------------------------------------------------------------
@familie("aks-skj4", tema="aksjonar", antall=5, tittel="Ubenyttet skjerming og skjermingsgrunnlaget")
def _(r):
    modus = syklus("aks-skj4", ["fritt", "saldo", "grunnlag", "fritt", "grunnlag"])
    navn = r.choice(NAVN)
    aar, renter, faktisk = aarsrekke(r, 3)
    K = r.choice([trekk(r, 100_000, 900_000, 50_000), trekk(r, 1_000_000, 3_000_000, 250_000)])
    F1 = K * renter[0] / 100
    st = steg_for(F1)
    D1 = 0 if r.random() < 0.35 else trekk(r, F1 * 0.2, F1 * 0.7, st)
    U1 = F1 - D1
    S2 = K + U1
    F2 = S2 * renter[1] / 100
    if modus == "fritt":
        riktig = U1 + F2
        kand = [
            (U1 + K * renter[1] / 100, f"Resten fra {aar[0]} er lagt til, men ikke tatt med i grunnlaget: {talla(U1)} + "
                                       f"{tall(K)} × {ps(renter[1])}. Grunnlaget i {aar[1]} er {talla(S2)}.", None),
            (K * renter[1] / 100, f"Framføringen glemt: bare {tall(K)} × {ps(renter[1])}. Skjermingen fra {aar[0]} går "
                                  f"ikke tapt.", None),
            (F2, f"Bare årets fradrag, {talla(S2)} × {ps(renter[1])}. Resten fra {aar[0]}, {talla(U1)}, kan også brukes.", None),
        ]
        if D1 > 0:
            kand.append((F1 + K * renter[1] / 100, f"Utbyttet i {aar[0]} er ikke trukket fra: {talla(F1)} + {tall(K)} × "
                                                   f"{ps(renter[1])}. Den delen av skjermingen er alt brukt.", None))
        d1_tekst = (f"Selskapet betalte ikke utbytte i {aar[0]}." if D1 == 0 else
                    f"I {aar[0]} var utbyttet {kr(D1)}.")
        q = (f"<p>{navn} kjøpte aksjer i januar {aar[0]} for {kr(K)}, som er kostprisen. Det fantes ingen ubenyttet "
             f"skjerming fra før. {d1_tekst} {navn} eier aksjene ved utgangen av {aar[0]} og {aar[1]}. "
             f"{rentetekst(aar[:2], renter[:2], faktisk)}</p>"
             f"<p>Hvor stort utbytte kan {navn} motta i {aar[1]} uten å betale eierskatt?</p>")
        kort = (f"<p><b>{kra(riktig)}.</b> Framført fra {aar[0]}: {talla(U1)}. Fradraget i {aar[1]} er ({tall(K)} + "
                f"{talla(U1)}) × {ps(renter[1])} = {talla(F2)}. Til sammen {talla(riktig)}.</p>")
        midt = (f"<p><b>Steg 2: grunnlaget og fradraget i {aar[1]}.</b> {tall(K)} + {talla(U1)} = {talla(S2)}. "
                f"{talla(S2)} × {ps(renter[1])} = {talla(F2)}.</p>"
                f"<p><b>Steg 3: samlet skjerming i {aar[1]}.</b> {talla(F2)} + {talla(U1)} = <b>{kra(riktig)}</b>. Et utbytte "
                f"opp til dette beløpet er skattefritt.</p>")
        kontroll = (f"<p><b>Kontroll.</b> Framført skjerming forrenter seg: {talla(U1)} × {tn(1 + renter[1] / 100, 3)} + "
                    f"{tall(K)} × {ps(renter[1])} = {talla(U1 * (1 + renter[1] / 100))} + {talla(K * renter[1] / 100)} = "
                    f"{talla(riktig)}. ✓</p>")
    else:
        tot2 = F2 + U1
        D2 = trekk(r, tot2 * 0.2, tot2 * 0.7, st)
        U2 = tot2 - D2
        d_tekst = ((f"Selskapet betalte ikke utbytte i {aar[0]}. " if D1 == 0 else f"Utbyttet var {kr(D1)} i {aar[0]}. ")
                   + f"I {aar[1]} var utbyttet {kr(D2)}.")
        if modus == "saldo":
            riktig = U2
            kand = [
                (U1 + K * renter[1] / 100 - D2, f"Resten fra {aar[0]} er ikke lagt til grunnlaget i {aar[1]}: {talla(U1)} + "
                                                f"{tall(K)} × {ps(renter[1])} − {tall(D2)}. Framført skjerming forrenter seg.", None),
                (F2 - D2, f"Resten fra {aar[0]} er glemt: bare {talla(F2)} − {tall(D2)}. Den skal legges til.", None),
                (F1 + (K + F1) * renter[1] / 100, f"Utbyttene er ikke trukket fra. Den delen av skjermingen er brukt opp.", None),
                (U1, f"Dette er saldoen ut av {aar[0]}, ikke ut av {aar[1]}.", None),
            ]
            spm = f"Hvor stor ubenyttet skjerming har {navn} med seg inn i {aar[2]}?"
            kort = (f"<p><b>{kra(riktig)}.</b> Ut av {aar[0]}: {talla(U1)}. I {aar[1]}: {talla(F2)} + {talla(U1)} − "
                    f"{tall(D2)} = {talla(U2)}.</p>")
            slutt = (f"<p><b>Steg 3: saldo ut av {aar[1]}.</b> {talla(F2)} + {talla(U1)} − {tall(D2)} = "
                     f"<b>{kra(riktig)}</b>.</p>")
        else:
            M = trekk(r, K * 1.15, K * 1.8, steg_for(K) * 10)
            riktig = K + U2
            kand = [
                (M, f"Markedsverdien. Skjermingsgrunnlaget bygger på kostprisen, ikke på hva aksjene er verdt.", None),
                (K, f"Bare kostprisen. Den ubenyttede skjermingen fra tidligere år skal legges til.", None),
                (K + F1 + F2, f"All skjerming lagt til, også den som er brukt mot utbytte: {tall(K)} + {talla(F1)} + "
                              f"{talla(F2)}.", None),
                (K + U1, f"Saldoen fra {aar[0]} brukt i stedet for saldoen fra {aar[1]}: {tall(K)} + {talla(U1)}.", None),
            ]
            d_tekst += f" Ved utgangen av {aar[1]} er markedsverdien {kr(M)}."
            spm = f"Hva er skjermingsgrunnlaget for {gen(navn)} aksjer i {aar[2]}?"
            kort = (f"<p><b>{kra(riktig)}.</b> Grunnlaget er kostprisen pluss ubenyttet skjerming fra året før: {tall(K)} + "
                    f"{talla(U2)} = {talla(riktig)}.</p>")
            slutt = (f"<p><b>Steg 3: saldo ut av {aar[1]}.</b> {talla(F2)} + {talla(U1)} − {tall(D2)} = {talla(U2)}.</p>"
                     f"<p><b>Steg 4: grunnlaget i {aar[2]}.</b> {tall(K)} + {talla(U2)} = <b>{kra(riktig)}</b>. "
                     f"Markedsverdien spiller ingen rolle.</p>")
        q = (f"<p>{navn} kjøpte aksjer i januar {aar[0]} for {kr(K)}, som er kostprisen. Det fantes ingen ubenyttet "
             f"skjerming fra før. {navn} eier aksjene ved utgangen av {aar[0]} og {aar[1]}. {d_tekst} "
             f"{rentetekst(aar[:2], renter[:2], faktisk)}</p><p>{spm}</p>")
        midt = (f"<p><b>Steg 2: {aar[1]}.</b> Grunnlag {tall(K)} + {talla(U1)} = {talla(S2)}. Fradrag {talla(S2)} × "
                f"{ps(renter[1])} = {talla(F2)}. Samlet skjerming {talla(F2)} + {talla(U1)} = {talla(tot2)}, mot et utbytte "
                f"på {tall(D2)}.</p>" + slutt)
        kontroll = (f"<p><b>Kontroll.</b> Brukt skjerming pluss det som er igjen, skal være all skjerming som er gitt: "
                    f"{tall(D1)} + {tall(D2)} + {talla(U2)} = {talla(D1 + D2 + U2)}. Fradragene er {talla(F1)} + {talla(F2)} = "
                    f"{talla(F1 + F2)}. ✓ Begge utbyttene var mindre enn skjermingen, så alt utbytte var skattefritt.</p>")
    kand = r.sample(kand, len(kand))
    valgt = velg_feller(riktig, [(v, t_, kra(v)) for v, t_, _ in kand], rel=0.003)
    alternativer = [R(kra(riktig), riktig)] + [F(vis, tekst, v) for v, tekst, vis in valgt]
    vis_ulike(*[a.tekst for a in alternativer])
    full = (
        f"<p><b>Hva ubenyttet skjerming er.</b> Skjermingsgrunnlaget er kostprisen pluss ubenyttet skjerming fra året før, "
        f"aldri markedsverdien. Er utbyttet mindre enn årets skjerming, framføres resten. Den framførte skjermingen "
        f"trekkes fra senere utbytte eller gevinst på samme aksje og legges i tillegg til neste års grunnlag. Slik "
        f"forrenter den seg med skjermingsrenten.</p>"
        f"<p><b>Steg 1: {aar[0]}.</b> {tall(K)} × {ps(renter[0])} = {talla(F1)}. Utbyttet er {tall(D1)}, så "
        f"{talla(U1)} framføres.</p>"
        + midt + kontroll +
        f"<p><b>Husk:</b> grunnlag = kostpris + ubenyttet skjerming. Framført skjerming løfter grunnlaget og trekkes fra.</p>"
    )
    unik("aks-skj4", riktig)
    return sporsmal(q, alternativer, kort, full, hjelp=HJA["aks-skj4"][modus])


# ---------------------------------------------------------------------------
# aks-gev1 · Skatt på aksjegevinst med framført skjerming (R2, H2025 oppgave 10, H2024 oppgave 2)
# ---------------------------------------------------------------------------
@familie("aks-gev1", tema="aksjonar", antall=5, tittel="Skatt på aksjegevinst med framført skjerming")
def _(r):
    modus = syklus("aks-gev1", ["skatt", "gevinst", "skatt", "skatt", "gevinst"])
    navn = r.choice(NAVN)
    smaa = r.random() < 0.3
    if smaa:
        K = r.choice([50, 80, 100, 120, 150, 200])
        U = r.choice([2, 3, 4, 5, 6, 8, 10, 12])
        P = K + U + r.choice([5, 8, 10, 15, 20, 30, 40, 50, 60])
        ting = "en aksje"
    else:
        K = trekk(r, 200_000, 2_000_000, 50_000)
        U = trekk(r, K * 0.02, K * 0.12, steg_for(K * 0.05))
        P = K + U + trekk(r, K * 0.1, K * 0.8, steg_for(K * 0.3))
        ting = "en aksjepost"
    dagens = r.random() < 0.75
    f_, t = (1.72, 22) if dagens else r.choice([(1.6, 25), (1.44, 22)])
    te = f_ * t / 100
    G = P - K - U
    q = (f"<p>{navn} kjøpte {ting} for {kr(K)}, som er inngangsverdien. I oktober i år selger {navn} den for {kr(P)}. "
         f"Det er ikke betalt utbytte i år. Fra tidligere år har {navn} {kr(U)} i ubenyttet skjerming på "
         f"{'aksjen' if smaa else 'aksjene'}. Oppjusteringsfaktoren er {tn(f_)} og skattesatsen på alminnelig inntekt "
         f"{ps(t)}.</p>")
    if modus == "skatt":
        riktig = G * te
        q += f"<p>Hvor mye skatt betaler {navn} på gevinsten?</p>"
        kand = [
            (G * t / 100, f"Oppjusteringen glemt: {tall(G)} × {ps(t)}. Et slikt svar er alltid {tn(1 / f_ * 100, 1)} % av "
                          f"det riktige.", None),
            ((P - K) * te, f"Den ubenyttede skjermingen glemt: ({tall(P)} − {tall(K)}) × {ps(te * 100)}.", None),
            (G * f_ * te, f"Oppjustert to ganger: {tall(G)} × {tn(f_)} × {ps(te * 100)}. Enten grunnlaget eller satsen "
                          f"oppjusteres, ikke begge.", None),
            ((P - K + U) * te, f"Skjermingen lagt til gevinsten i stedet for trukket fra: ({tall(P)} − {tall(K)} + "
                               f"{tall(U)}) × {ps(te * 100)}.", None),
            (U * te, f"Dette er skatten på selve skjermingen, {tall(U)} × {ps(te * 100)}. Skjermingen er skattefri.", None),
        ]
        kand = kand[:1] + r.sample(kand[1:], len(kand) - 1)
        kort = (f"<p><b>{kra(riktig)}.</b> Gevinsten er {tall(P)} − {tall(K)} − {tall(U)} = {tall(G)}. Skatten er "
                f"{tall(G)} × {tn(f_)} × {ps(t)} = {kra(riktig)}.</p>")
        slutt = (f"<p><b>Steg 2: oppjuster grunnlaget.</b> {tall(G)} × {tn(f_)} = {talla(G * f_)}. "
                 f"{talla(G * f_)} × {ps(t)} = <b>{kra(riktig)}</b>.</p>"
                 f"<p><b>Steg 3: oppjuster satsen i stedet, som kontroll.</b> {tn(f_)} × {ps(t)} = {ps(te * 100)}. "
                 f"{tall(G)} × {ps(te * 100)} = {kra(riktig)}. ✓ De to veiene skal gi nøyaktig samme svar.</p>")
    else:
        riktig = G
        q += f"<p>Hva er {gen(navn)} skattepliktige gevinst?</p>"
        kand = [
            (P - K, f"Den ubenyttede skjermingen glemt: {tall(P)} − {tall(K)}. Framført skjerming trekkes fra gevinsten.", None),
            (P - K + U, f"Skjermingen lagt til i stedet for trukket fra: {tall(P)} − {tall(K)} + {tall(U)}.", None),
            (G * te, f"Dette er skatten, {tall(G)} × {ps(te * 100)}. Spørsmålet ber om den skattepliktige gevinsten.", None),
        ]
        kort = f"<p><b>{kra(riktig)}.</b> Salgspris − inngangsverdi − ubenyttet skjerming: {tall(P)} − {tall(K)} − {tall(U)} = {tall(G)}.</p>"
        slutt = (f"<p><b>Steg 2: hva skatten blir.</b> Gevinsten oppjusteres og skattlegges: {tall(G)} × {tn(f_)} × {ps(t)} = "
                 f"{kra(G * te)}. Det står som et galt alternativ fordi spørsmålet gjelder grunnlaget.</p>"
                 f"<p><b>Kontroll.</b> Gevinsten før skjerming er {tall(P - K)}. Skjermingen kan bare redusere den, aldri øke "
                 f"den, så svaret må ligge under {tall(P - K)}. ✓</p>")
    valgt = velg_feller(riktig, [(v, t_, kra(v)) for v, t_, _ in kand], rel=0.004, faste=1)
    alternativer = [R(kra(riktig), riktig)] + [F(vis, tekst, v) for v, tekst, vis in valgt]
    vis_ulike(*[a.tekst for a in alternativer])
    full = (
        f"<p><b>Gevinst i aksjonærmodellen.</b> Ved salg byttes utbyttet ut med en gevinst, men rutinen er den samme. "
        f"Ubenyttet skjerming fra tidligere år trekkes fra gevinsten. Resten oppjusteres med faktoren og skattlegges med "
        f"satsen på alminnelig inntekt. I salgsåret gis det ikke noe nytt skjermingsfradrag når aksjen er solgt før "
        f"årsskiftet. Bare den skjermingen som alt er framført, kan brukes.</p>"
        f"<p><b>Steg 1: gevinsten.</b> {tall(P)} − {tall(K)} − {tall(U)} = {tall(G)}.</p>"
        + slutt +
        f"<p><b>Husk:</b> gevinst = salgspris − inngangsverdi − ubenyttet skjerming. Skatt = gevinst × faktor × sats. "
        f"Oppjuster grunnlaget eller satsen, aldri begge.</p>"
    )
    unik("aks-gev1", riktig)
    return sporsmal(q, alternativer, kort, full, hjelp=HJA["aks-gev1"][modus])


# ---------------------------------------------------------------------------
# aks-gev2 · Salg før årsskiftet: ingen skjerming i salgsåret (R2, H2022 oppgave 1)
# ---------------------------------------------------------------------------
@familie("aks-gev2", tema="aksjonar", antall=5, tittel="Gevinst når aksjen selges før årsskiftet")
def _(r):
    modus = syklus("aks-gev2", ["gevinst", "skatt", "skatt", "gevinst", "skatt"])
    navn = r.choice(NAVN)
    n_hold = r.choice([1, 2, 2])
    aar = [f"år {i + 1}" for i in range(n_hold + 1)]
    renter = [r.choice([2, 2.5, 3, 3.5, 4, 4.5, 5]) for _ in range(n_hold + 1)]
    K = trekk(r, 200_000, 3_000_000, 50_000)
    u = 0.0
    for x in renter[:n_hold]:
        u += (K + u) * x / 100
    U = u
    P = trekk(r, (K + U) * 1.08, (K + U) * 1.6, steg_for(K * 0.2))
    G = P - K - U
    salg_skj = (K + U) * renter[-1] / 100
    if G - salg_skj <= 0:
        raise Avvis("fella blir negativ")
    te = TE / 100
    dato = r.choice(["15. november", "1. oktober", "20. desember", "3. september"])
    if n_hold == 1:
        rentetekst_ = f"{ps(renter[0])} i {aar[0]} og {ps(renter[1])} i {aar[1]}"
    else:
        rentetekst_ = f"{ps(renter[0])} i {aar[0]}, {ps(renter[1])} i {aar[1]} og {ps(renter[2])} i {aar[2]}"
    eide = aar[0] if n_hold == 1 else f"{aar[0]} og {aar[1]}"
    q = (f"<p>{navn} kjøpte en aksjepost i januar {aar[0]} for {kr(K)}, som er inngangsverdien. Selskapet har ikke betalt "
         f"utbytte i eierperioden. {navn} eide posten ved utgangen av {eide} og solgte hele posten {dato} i {aar[-1]} for "
         f"{kr(P)}. Skjermingsrenten var {rentetekst_}.</p>")
    T_salg = (f"Skjermingsfradrag gitt også for salgsåret, ({tall(K)} + {talla(U)}) × {ps(renter[-1])} = {talla(salg_skj)}. "
              f"Fradraget tilordnes den som eier aksjen ved utgangen av året. Det er kjøperen.")
    if modus == "gevinst":
        riktig = G
        q += f"<p>Hva er {gen(navn)} skattepliktige gevinst?</p>"
        kand = [(G - salg_skj, T_salg, None),
                (P - K, f"Den ubenyttede skjermingen glemt: {tall(P)} − {tall(K)}. Skjerming fra årene {navn} eide aksjene "
                        f"ved årsskiftet, trekkes fra gevinsten.", None)]
        if n_hold == 2:
            enkel = K * (renter[0] + renter[1]) / 100
            kand.append((P - K - enkel, f"Skjermingen regnet av kostprisen begge år: {tall(K)} × ({ps(renter[0])} + "
                                        f"{ps(renter[1])}). Resten fra {aar[0]} skal legges til grunnlaget i {aar[1]}.", None))
        kand.append((G * te, f"Dette er skatten, {talla(G)} × 37,84 %. Spørsmålet ber om gevinsten.", None))
    else:
        riktig = G * te
        q += f"<p>Eierskatten er 37,84 % (1,72 × 22 %). Hvor mye skatt betaler {navn} på gevinsten?</p>"
        kand = [((G - salg_skj) * te, T_salg, None),
                ((P - K) * te, f"Den ubenyttede skjermingen glemt: ({tall(P)} − {tall(K)}) × 37,84 %.", None),
                (G * 0.22, f"Oppjusteringen glemt: {talla(G)} × 22 %.", None)]
        if n_hold == 2:
            enkel = K * (renter[0] + renter[1]) / 100
            kand.append(((P - K - enkel) * te, f"Skjermingen regnet av kostprisen begge år: ({tall(P)} − {tall(K)} − "
                                               f"{talla(enkel)}) × 37,84 %. Resten fra {aar[0]} skal løfte grunnlaget i "
                                               f"{aar[1]}.", None))
    kand = kand[:1] + r.sample(kand[1:], len(kand) - 1)
    valgt = velg_feller(riktig, [(v, t_, kra(v)) for v, t_, _ in kand], rel=0.004, faste=1)
    alternativer = [R(kra(riktig), riktig)] + [F(vis, tekst, v) for v, tekst, vis in valgt]
    vis_ulike(*[a.tekst for a in alternativer])
    if n_hold == 1:
        skj_steg = (f"<p><b>Steg 1: framført skjerming.</b> {aar[0].capitalize()}: {tall(K)} × {ps(renter[0])} = {talla(U)}. Ikke noe "
                    f"utbytte, så alt framføres.</p>")
    else:
        U1 = K * renter[0] / 100
        skj_steg = (f"<p><b>Steg 1: framført skjerming.</b> {aar[0].capitalize()}: {tall(K)} × {ps(renter[0])} = {talla(U1)}, framført. "
                    f"{aar[1].capitalize()}: ({tall(K)} + {talla(U1)}) × {ps(renter[1])} = {talla(U - U1)}. Samlet framført: "
                    f"{talla(U1)} + {talla(U - U1)} = {talla(U)}.</p>")
    skatt_steg = (f"<p><b>Steg 4: skatten.</b> {talla(G)} × 37,84 % = <b>{kra(riktig)}</b>. Kontroll med faktoren: "
                  f"{talla(G)} × 1,72 × 22 % = {kra(riktig)}. ✓</p>" if modus == "skatt" else "")
    kort = (f"<p><b>{kra(riktig)}.</b> Ingen skjerming for {aar[-1]}, fordi {navn} solgte før årsskiftet. Gevinst: {tall(P)} − "
            f"{tall(K)} − {talla(U)} = {talla(G)}" + (f", skatt {talla(G)} × 37,84 %." if modus == "skatt" else ".") + "</p>")
    full = (
        f"<p><b>Årsskifteregelen.</b> Skjermingsfradraget for et år tilordnes den som eier aksjen ved utgangen av året. "
        f"Selger du før 31. desember, får du ikke skjerming for salgsåret. Den skjermingen som alt er framført fra år du "
        f"eide aksjen ved årsskiftet, trekkes fra gevinsten.</p>"
        + skj_steg +
        f"<p><b>Steg 2: salgsåret.</b> {navn} solgte {dato} og eide ikke posten ved utgangen av {aar[-1]}. Ingen skjerming "
        f"for {aar[-1]}.</p>"
        f"<p><b>Steg 3: gevinsten.</b> {tall(P)} − {tall(K)} − {talla(U)} = "
        + (f"<b>{kra(G)}</b>.</p>" if modus == "gevinst" else f"{talla(G)}.</p>")
        + skatt_steg +
        f"<p><b>Kontroll.</b> Uten utbytte vokser grunnlaget med skjermingsrenten hvert år: {tall(K)} × "
        + " × ".join(tn(1 + x / 100, 3) for x in renter[:n_hold]) + f" = {talla(K + U)}. Det er inngangsverdien pluss "
        f"framført skjerming, så gevinsten er {tall(P)} − {talla(K + U)} = {talla(G)}. ✓</p>"
        f"<p><b>Husk:</b> solgt før årsskiftet betyr ingen skjerming for salgsåret, bare det som alt er framført.</p>"
    )
    unik("aks-gev2", riktig)
    return sporsmal(q, alternativer, kort, full, hjelp=HJA["aks-gev2"][modus])


# ---------------------------------------------------------------------------
# aks-eier1 · Eierskatt på utbytte, oppjustert grunnlag eller oppjustert sats (R2)
# ---------------------------------------------------------------------------
@familie("aks-eier1", tema="aksjonar", antall=5, tittel="Eierskatt på utbytte, begge veier")
def _(r):
    modus = syklus("aks-eier1", ["skatt", "netto", "skatt", "skatt", "netto"])
    navn = r.choice(NAVN)
    dagens = r.random() < 0.6
    f_, t = (1.72, 22) if dagens else r.choice([(1.6, 25), (1.44, 22), (1.5, 22)])
    te = f_ * t / 100
    K = trekk(r, 200_000, 3_000_000, 50_000)
    rs = r.choice([2, 2.5, 3, 3.2, 3.5, 3.6, 3.9, 4])
    S = K * rs / 100
    D = trekk(r, S * 1.5, S * 5, steg_for(S))
    E = (D - S) * te
    q = (f"<p>{navn} eier aksjer med kostpris {kr(K)} og har ingen ubenyttet skjerming. I år mottar {navn} {kr(D)} i "
         f"utbytte og eier aksjene ved årsskiftet. Skjermingsrenten er {ps(rs)}. Oppjusteringsfaktoren er {tn(f_)} og "
         f"skattesatsen på alminnelig inntekt {ps(t)}.</p>")
    if modus == "skatt":
        riktig = E
        q += f"<p>Hvor mye eierskatt betaler {navn} på utbyttet?</p>"
        kand = [
            ((D - S) * t / 100, f"Oppjusteringen glemt: ({tall(D)} − {talla(S)}) × {ps(t)}.", None),
            ((D * f_ - S) * t / 100, f"Skjermingen trukket fra etter oppjusteringen: ({tall(D)} × {tn(f_)} − {talla(S)}) × "
                                     f"{ps(t)}. Skjermingen trekkes fra først, så oppjusteres resten.", None),
            ((D - S) * f_ * te, f"Oppjustert to ganger: ({tall(D)} − {talla(S)}) × {tn(f_)} × {ps(te * 100)}.", None),
            (D * te, f"Skjermingen glemt: {tall(D)} × {ps(te * 100)}.", None),
        ]
        kand = kand[:2] + r.sample(kand[2:], 2)
        kort = (f"<p><b>{kra(riktig)}.</b> Skjerming {tall(K)} × {ps(rs)} = {talla(S)}. ({tall(D)} − {talla(S)}) × {tn(f_)} × "
                f"{ps(t)} = {kra(riktig)}.</p>")
        slutt = ""
    else:
        riktig = D - E
        q += f"<p>Hvor mye sitter {navn} igjen med av utbyttet etter eierskatt?</p>"
        kand = [
            (D - (D - S) * t / 100, f"Oppjusteringen glemt: skatten regnet som ({tall(D)} − {talla(S)}) × {ps(t)}.", None),
            (D - (D * f_ - S) * t / 100, f"Skjermingen trukket fra etter oppjusteringen: skatten regnet som ({tall(D)} × "
                                         f"{tn(f_)} − {talla(S)}) × {ps(t)}.", None),
            (D - D * te, f"Skjermingen glemt: {tall(D)} × (1 − {ps(te * 100)}).", None),
            ((D - S) * (1 - te), f"Bare det skattepliktige utbyttet etter skatt, ({tall(D)} − {talla(S)}) × (1 − "
                                 f"{ps(te * 100)}). Den skjermede delen, {talla(S)}, får {navn} også beholde.", None),
        ]
        kand = kand[:1] + r.sample(kand[1:], 3)
        kort = (f"<p><b>{kra(riktig)}.</b> Skatten er ({tall(D)} − {talla(S)}) × {ps(te * 100)} = {kra(E)}. "
                f"{tall(D)} − {talla(E)} = {talla(riktig)}.</p>")
        slutt = (f"<p><b>Steg 4: hva som er igjen.</b> {tall(D)} − {talla(E)} = <b>{kra(riktig)}</b>.</p>")
    valgt = velg_feller(riktig, [(v, t_, kra(v)) for v, t_, _ in kand], rel=0.004, faste=1)
    alternativer = [R(kra(riktig), riktig)] + [F(vis, tekst, v) for v, tekst, vis in valgt]
    vis_ulike(*[a.tekst for a in alternativer])
    full = (
        f"<p><b>To veier til samme skatt.</b> Utbytte etter skjerming skattlegges hos en personlig eier i to trinn: "
        f"grunnlaget ganges med oppjusteringsfaktoren. Resultatet skattlegges med satsen på alminnelig inntekt. Du kan "
        f"like gjerne gange faktoren inn i satsen: {tn(f_)} × {ps(t)} = {ps(te * 100)}. Begge veier gir samme svar, så "
        f"regn begge som kontroll.</p>"
        f"<p><b>Steg 1: skjermingen.</b> {tall(K)} × {ps(rs)} = {talla(S)}.</p>"
        f"<p><b>Steg 2: skattepliktig utbytte.</b> {tall(D)} − {talla(S)} = {talla(D - S)}.</p>"
        f"<p><b>Steg 3: skatten.</b> Oppjustert grunnlag: {talla(D - S)} × {tn(f_)} = {talla((D - S) * f_)}. Så "
        f"{talla((D - S) * f_)} × {ps(t)} = {kra(E)}. Oppjustert sats: {talla(D - S)} × {ps(te * 100)} = {kra(E)}. ✓</p>"
        + slutt +
        f"<p><b>Kontroll.</b> Et svar uten oppjustering er alltid {tn(100 / f_, 1)} % av riktig skatt. Ser du to "
        f"alternativer der det ene er {tn(100 / f_, 1)} % av det andre, er det oppjusteringsparet.</p>"
        f"<p><b>Husk:</b> trekk fra skjermingen først, oppjuster så grunnlaget eller satsen, aldri begge.</p>"
    )
    unik("aks-eier1", riktig)
    return sporsmal(q, alternativer, kort, full, hjelp=HJA["aks-eier1"][modus])


# ---------------------------------------------------------------------------
# aks-samlet1 · Selskap, utbytte og eier i kroner (R2 og R3a, H2022 oppgave 1)
# ---------------------------------------------------------------------------
@familie("aks-samlet1", tema="aksjonar", antall=5, tittel="Fra selskapsoverskudd til eierens lommebok")
def _(r):
    modus = syklus("aks-samlet1", ["eierskatt", "samlet", "netto", "eierskatt", "samlet"])
    navn = r.choice(NAVN)
    firma = r.choice(["Fjord AS", "Nordlys AS", "Kystverft AS", "Bergbakst AS", "Fjellsport AS", "Havbruk Nord AS"])
    dagens = r.random() < 0.6
    f_, t = (1.72, 22) if dagens else r.choice([(1.6, 25), (1.44, 22)])
    te = f_ * t / 100
    tA = 22
    P = trekk(r, 100_000, 3_000_000, 50_000)
    D = P * (1 - tA / 100)
    K = trekk(r, D * 1.5, D * 8, 50_000)
    rs = r.choice([2, 3, 3.2, 3.6, 3.9, 4, 5])
    S = K * rs / 100
    if not (0.08 * D < S < 0.6 * D):
        raise Avvis("skjermingen er for liten eller for stor")
    E = (D - S) * te
    selsk = tA / 100 * P
    q = (f"<p>{navn} eier alle aksjene i {firma}. Kostprisen på aksjene er {kr(K)}. Selskapet tjener {kr(P)} før skatt i "
         f"år og betaler {ps(tA)} selskapsskatt. Alt som er igjen, deles ut som utbytte til {navn}. Skjermingsrenten er "
         f"{ps(rs)}. Det finnes ingen ubenyttet skjerming. Oppjusteringsfaktoren er {tn(f_)} og skattesatsen på "
         f"alminnelig inntekt {ps(t)}.</p>")
    if modus == "eierskatt":
        riktig = E
        q += f"<p>Hvor mye eierskatt betaler {navn} på utbyttet?</p>"
        kand = [
            ((P - S) * te, f"Overskuddet før skatt brukt som utbytte: ({tall(P)} − {talla(S)}) × {ps(te * 100)}. Utbyttet er "
                           f"det som er igjen etter selskapsskatten, {tall(D)}.", None),
            ((D - S) * t / 100, f"Oppjusteringen glemt: ({tall(D)} − {talla(S)}) × {ps(t)}.", None),
            (D * te, f"Skjermingen glemt: {tall(D)} × {ps(te * 100)}.", None),
            ((D - S) * f_ * te, f"Oppjustert to ganger: ({tall(D)} − {talla(S)}) × {tn(f_)} × {ps(te * 100)}.", None),
        ]
        kort = (f"<p><b>{kra(riktig)}.</b> Utbytte {tall(P)} × {tn(1 - tA / 100)} = {tall(D)}. Skjerming {talla(S)}. "
                f"({tall(D)} − {talla(S)}) × {tn(f_)} × {ps(t)} = {kra(riktig)}.</p>")
        slutt = ""
    elif modus == "samlet":
        riktig = selsk + E
        q += f"<p>Hvor mye skatt betales til sammen av selskapet og {navn} på årets overskudd?</p>"
        kand = [
            (E, f"Bare eierskatten. Selskapsskatten på {talla(selsk)} er også betalt av det samme overskuddet.", None),
            (selsk + D * te, f"Skjermingen glemt: {talla(selsk)} + {tall(D)} × {ps(te * 100)}.", None),
            (selsk + (P - S) * te, f"Eierskatten regnet av overskuddet før skatt: {talla(selsk)} + ({tall(P)} − {talla(S)}) × "
                                   f"{ps(te * 100)}.", None),
            (selsk + (D - S) * t / 100, f"Oppjusteringen glemt: {talla(selsk)} + ({tall(D)} − {talla(S)}) × {ps(t)}.", None),
        ]
        kort = (f"<p><b>{kra(riktig)}.</b> Selskapsskatt {talla(selsk)} pluss eierskatt ({tall(D)} − {talla(S)}) × "
                f"{ps(te * 100)} = {talla(E)}.</p>")
        slutt = (f"<p><b>Steg 5: samlet.</b> {talla(selsk)} + {talla(E)} = <b>{kra(riktig)}</b>, altså "
                 f"{pst(riktig / P, 2)} av overskuddet.</p>")
    else:
        riktig = D - E
        q += f"<p>Hvor mye sitter {navn} igjen med etter all skatt?</p>"
        kand = [
            (P - (P - S) * te, f"Selskapsskatten glemt: {tall(P)} − ({tall(P)} − {talla(S)}) × {ps(te * 100)}.", None),
            (D - D * te, f"Skjermingen glemt: {tall(D)} × (1 − {ps(te * 100)}).", None),
            (D - (D - S) * t / 100, f"Oppjusteringen glemt: {tall(D)} − ({tall(D)} − {talla(S)}) × {ps(t)}.", None),
            ((D - S) * (1 - te), f"Bare det skattepliktige utbyttet etter skatt. Den skjermede delen, {talla(S)}, beholder "
                                 f"{navn} også.", None),
        ]
        kort = (f"<p><b>{kra(riktig)}.</b> Utbytte {tall(D)} minus eierskatt ({tall(D)} − {talla(S)}) × {ps(te * 100)} = "
                f"{talla(E)}.</p>")
        slutt = f"<p><b>Steg 5: igjen hos {navn}.</b> {tall(D)} − {talla(E)} = <b>{kra(riktig)}</b>.</p>"
    kand = r.sample(kand, len(kand))
    valgt = velg_feller(riktig, [(v, t_, kra(v)) for v, t_, _ in kand], rel=0.004)
    alternativer = [R(kra(riktig), riktig)] + [F(vis, tekst, v) for v, tekst, vis in valgt]
    vis_ulike(*[a.tekst for a in alternativer])
    full = (
        f"<p><b>Kjeden.</b> Overskuddet skattlegges først i selskapet. Det som er igjen, er utbyttet. Hos eieren trekkes "
        f"skjermingsfradraget fra. Resten skattlegges med faktoren ganger satsen. Hvert ledd har sitt eget grunnlag. "
        f"Det er der feilene skjer.</p>"
        f"<p><b>Steg 1: selskapsskatten.</b> {tall(P)} × {ps(tA)} = {talla(selsk)}.</p>"
        f"<p><b>Steg 2: utbyttet.</b> {tall(P)} − {talla(selsk)} = {tall(D)}.</p>"
        f"<p><b>Steg 3: skjermingen.</b> {tall(K)} × {ps(rs)} = {talla(S)}. Skattepliktig utbytte {tall(D)} − {talla(S)} = "
        f"{talla(D - S)}.</p>"
        f"<p><b>Steg 4: eierskatten.</b> {talla(D - S)} × {tn(f_)} × {ps(t)} = "
        + (f"<b>{kra(E)}</b>" if modus == "eierskatt" else kra(E)) + f". Den andre veien: {talla(D - S)} × {ps(te * 100)} = "
        f"{kra(E)}. ✓</p>"
        + slutt +
        f"<p><b>Kontroll, en annen vei.</b> Uten skjerming er samlet skatt {ps(tA)} + {tn(1 - tA / 100)} × {ps(te * 100)} = "
        f"{pst(tA / 100 + (1 - tA / 100) * te, 4)} av overskuddet: {tall(P)} × {pst(tA / 100 + (1 - tA / 100) * te, 4)} = "
        f"{talla(P * (tA / 100 + (1 - tA / 100) * te))}. Skjermingen sparer {talla(S)} × {ps(te * 100)} = {talla(S * te)}. "
        f"{talla(P * (tA / 100 + (1 - tA / 100) * te))} − {talla(S * te)} = {talla(selsk + E)}, som er selskapsskatt pluss "
        f"eierskatt, {talla(selsk)} + {talla(E)}. ✓</p>"
        f"<p><b>Husk:</b> selskapsskatt av overskuddet, eierskatt av utbyttet minus skjerming.</p>"
    )
    unik("aks-samlet1", riktig)
    return sporsmal(q, alternativer, kort, full, hjelp=HJA["aks-samlet1"][modus])


# ---------------------------------------------------------------------------
# aks-frit1 · Fritaksmetoden og treprosentregelen (k6, kj2)
# ---------------------------------------------------------------------------
@familie("aks-frit1", tema="aksjonar", antall=5, tittel="Fritaksmetoden: skatt i et holdingselskap")
def _(r):
    modus = syklus("aks-frit1", ["A", "B", "C", "B", "A"])
    eier = r.choice(["Lie", "Berg", "Dahl", "Strand", "Moe", "Vik", "Haug", "Solberg"])
    holding = f"{eier} Holding AS"
    d1 = r.choice(["Drift AS", "Nordvik AS", "Kystlaks AS", "Tekno AS"])
    e1 = r.choice([20, 35, 40, 51, 60, 75, 80, 90, 90])
    U1 = trekk(r, 500_000, 8_000_000, 100_000)
    G = trekk(r, 300_000, 5_000_000, 100_000)
    U2 = L_ = 0
    linjer = [f"Mottar {kr(U1)} i utbytte fra {d1}, der {holding} eier {e1} % av aksjene og stemmene."]
    if modus == "B":
        e2 = r.choice([95, 100])
        U2 = trekk(r, 500_000, 6_000_000, 100_000)
        linjer.append(f"Mottar {kr(U2)} i utbytte fra Datter AS, der {holding} eier {e2} % av aksjene og stemmene.")
    linjer.append(f"Selger en aksjepost i et annet norsk selskap med en gevinst på {kr(G)}.")
    if modus == "C":
        L_ = trekk(r, 200_000, 3_000_000, 100_000)
        linjer.append(f"Selger en tredje aksjepost i et svensk selskap med et tap på {kr(L_)}.")
    riktig = 0.0066 * U1
    kand = [
        (0.03 * U1, f"Tre prosent brukt som skattesats: 3 % × {tall(U1)}. Tre prosent av utbyttet inntektsføres og "
                    f"skattlegges med 22 %, altså 0,66 %.", None),
        (0.0066 * (U1 + G), f"Treprosentregelen brukt på gevinsten også: 0,66 % × ({tall(U1)} + {tall(G)}). Den gjelder "
                            f"bare utbytte.", None),
        (0.0, f"Fritaket lest som fullt. 3 % av utbytte fra selskaper der {holding} eier 90 % eller mindre, inntektsføres "
              f"likevel.", None),
        (0.22 * (U1 + U2 + G - L_), f"Ordinær skatt på alt: 22 % × ({tall(U1)}"
                                     + (f" + {tall(U2)}" if U2 else "") + f" + {tall(G)}"
                                     + (f" − {tall(L_)}" if L_ else "") + "). Fritaksmetoden fritar selskapets "
                                     "aksjeinntekter.", None),
    ]
    if modus == "B":
        kand.insert(0, (0.0066 * (U1 + U2), f"Konsernunntaket glemt: 0,66 % × ({tall(U1)} + {tall(U2)}). Utbytte fra et "
                                           f"selskap der mottakeren eier mer enn 90 % av aksjene og stemmene, er fullt "
                                           f"fritatt.", None))
    if modus == "C" and 0.0066 * U1 - 0.22 * L_ > 0:
        kand.insert(0, (0.0066 * U1 - 0.22 * L_, f"Tapet trukket fra: 0,66 % × {tall(U1)} − 22 % × {tall(L_)}. Tap på "
                                                 f"aksjer under fritaksmetoden er ikke fradragsberettiget.", None))
    if e1 == 90:
        kand.insert(0, (0.0, f"Konsernunntaket krever <i>mer</i> enn 90 % av aksjene og stemmene. Med nøyaktig 90 % gjelder "
                             f"treprosentregelen.", None))
    kand = kand[:1] + r.sample(kand[1:], len(kand) - 1)
    valgt = velg_feller(riktig, [(v, t_, kra(v)) for v, t_, _ in kand], rel=0.01, faste=1)
    alternativer = [R(kra(riktig), riktig)] + [F(vis, tekst, v) for v, tekst, vis in valgt]
    vis_ulike(*[a.tekst for a in alternativer])
    q = (f"<p>{holding} er et norsk aksjeselskap. I år skjer følgende:</p><ul>"
         + "".join(f"<li>{x}</li>" for x in linjer) + "</ul>"
         f"<p>Alle selskapene er hjemmehørende i EØS. Bruk dagens regler: fritaksmetoden gjelder. 3 % av mottatt utbytte "
         f"inntektsføres når mottakeren eier 90 % eller mindre. Satsen på alminnelig inntekt er 22 %. Hvor mye skatt "
         f"betaler {holding} på disse aksjeinntektene?</p>")
    b_steg = (f"<p><b>Steg 2: utbyttet fra Datter AS.</b> {holding} eier mer enn 90 % av aksjene og stemmene. Utbyttet er "
              f"fullt skattefritt.</p>" if modus == "B" else "")
    c_steg = (f"<p><b>Tapet.</b> Tap på aksjer som omfattes av fritaksmetoden, gir ikke fradrag. Tapet på {tall(L_)} "
              f"endrer ingenting.</p>" if modus == "C" else "")
    kort = (f"<p><b>{kra(riktig)}.</b> Bare utbyttet fra {d1} gir skatt: 3 % × {tall(U1)} × 22 % = {kra(riktig)}. "
            f"Gevinsten er fritatt"
            + (". Tapet gir ikke fradrag" if modus == "C" else "") + ".</p>")
    full = (
        f"<p><b>Fritaksmetoden.</b> Et aksjeselskap betaler ikke skatt på utbytte og gevinst på aksjer i selskap i EØS. "
        f"Til gjengjeld får det ikke fradrag for tap. Unntaket er treprosentregelen: 3 % av mottatt utbytte inntektsføres "
        f"som alminnelig inntekt, så skatten blir 3 % × 22 % = 0,66 % av utbyttet. Regelen gjelder bare utbytte, ikke "
        f"gevinst. Den gjelder heller ikke når mottakeren eier mer enn 90 % av aksjene og stemmene.</p>"
        f"<p><b>Steg 1: utbyttet fra {d1}.</b> {holding} eier {e1} %, altså ikke mer enn 90 %. Inntektsført: 3 % × "
        f"{tall(U1)} = {tall(0.03 * U1)}. Skatt: {tall(0.03 * U1)} × 22 % = <b>{kra(riktig)}</b>.</p>"
        + b_steg +
        f"<p><b>Gevinsten.</b> Gevinst på aksjer under fritaksmetoden er fullt skattefri. Treprosentregelen gjelder ikke "
        f"gevinst.</p>"
        + c_steg +
        f"<p><b>Kontroll.</b> 0,66 % × {tall(U1)} = {kra(riktig)}. ✓ Skatten er liten sammenlignet med 22 %. Forelesningen "
        f"sier at den i praksis kan glemmes når en beslutning skal tas, men ikke på eksamen.</p>"
        f"<p><b>Husk:</b> selskap som eier aksjer: 0 % på gevinst, 0,66 % på utbytte, 0 % i konsern over 90 %. Ingen "
        f"fradrag for tap.</p>"
    )
    unik("aks-frit1", riktig)
    return sporsmal(q, alternativer, kort, full, hjelp=HJA["aks-frit1"])


# ---------------------------------------------------------------------------
# aks-hold1 · Kjeden drift → holding → person (k6, kj2)
# ---------------------------------------------------------------------------
@familie("aks-hold1", tema="aksjonar", antall=5, tittel="Holdingselskapet: samlet skatt i kjeden")
def _(r):
    modus = syklus("aks-hold1", ["sats", "netto", "utsatt", "sats", "netto"])
    navn = r.choice(NAVN)
    e = r.choice([100, 95, 80, 60, 40])
    P = trekk(r, 1_000_000, 10_000_000, 500_000)
    te = TE / 100
    andel = e / 100 * P
    selsk = 0.22 * andel
    Dh = andel - selsk
    tre = e <= 90
    hs = 0.0066 * Dh if tre else 0.0
    Dp = Dh - hs
    E = Dp * te
    q = (f"<p>Drift AS tjener {kr(P)} før skatt, betaler 22 % selskapsskatt og deler ut alt som er igjen. {navn} Holding AS "
         f"eier {e} % av aksjene og stemmene i Drift AS. {navn} eier alle aksjene i holdingselskapet og har brukt opp "
         f"skjermingen. Bruk dagens regler: fritaksmetoden, treprosentregelen (3 % av utbytte inntektsføres når "
         f"mottakeren eier 90 % eller mindre), 22 % skatt på alminnelig inntekt i begge selskapene og eierskatt 37,84 % "
         f"på utbytte til person.</p>")
    vis = (lambda v: pst(v, 2)) if modus == "sats" else kra

    def sats_eller_kr(v):
        return v / andel if modus == "sats" else v
    tre_tekst = (f"{holding_navn(navn)} eier {e} %, ikke mer enn 90 %. 3 % av utbyttet inntektsføres: 3 % × {tall(Dh)} × 22 % = "
                 f"{talla(hs)}." if tre else f"{holding_navn(navn)} eier {e} %, mer enn 90 %. Utbyttet er fullt skattefritt.")
    if modus == "utsatt":
        riktig = selsk + hs
        q += (f"<p>I år lar {navn} hele utbyttet bli stående i holdingselskapet. Hvor mye skatt er betalt på {gen(navn)} "
              f"andel av overskuddet i Drift AS etter dette?</p>")
        kand = [
            (selsk + hs + E, f"Eierskatten tatt med. Den kommer først når pengene tas ut av holdingselskapet til {navn}.", None),
            (selsk + 0.22 * Dh, f"Holdingselskapet skattlagt ordinært med 22 % av utbyttet. Fritaksmetoden hindrer den "
                                f"kjedebeskatningen.", None),
            (selsk + 0.03 * Dh, (f"Tre prosent brukt som skattesats. 3 % inntektsføres og skattlegges med 22 %." if tre else
                                 f"Treprosentregelen brukt selv om eierandelen er over 90 %. I tillegg er 3 % brukt som skattesats."),
             None),
            ((selsk if tre else selsk + 0.0066 * Dh),
             (f"Treprosentregelen glemt. Med {e} % eierandel er ikke konsernunntaket oppfylt." if tre else
              f"Treprosentregelen brukt selv om {holding_navn(navn)} eier mer enn 90 %."), None),
        ]
        sporsm = "skatt betalt så langt"
    elif modus == "sats":
        riktig = (selsk + hs + E) / andel
        q += (f"<p>Holdingselskapet deler straks ut alt det har igjen til {navn}. Hvor stor andel av overskuddet bak "
              f"{gen(navn)} eierandel, {kr(andel)}, går til skatt til sammen? Rund av til to desimaler.</p>")
        kand = [
            ((selsk + 0.22 * Dh + 0.78 * Dh * te) / andel, f"Holdingselskapet skattlagt ordinært med 22 %. Fritaksmetoden "
                                                          f"hindrer at samme krone skattlegges i hvert ledd.", None),
            ((selsk + hs) / andel, f"Eierskatten glemt. Fritaksmetoden fritar holdingselskapet, ikke {navn}.", None),
            (((selsk + Dh * te) if tre else (selsk + 0.0066 * Dh + (Dh - 0.0066 * Dh) * te)) / andel,
             (f"Treprosentregelen glemt. Med {e} % er konsernunntaket ikke oppfylt." if tre else
              f"Treprosentregelen brukt selv om eierandelen er over 90 %."), None),
            ((selsk + 0.03 * Dh + (Dh - 0.03 * Dh) * te) / andel, (f"Tre prosent brukt som skattesats i holdingselskapet." if tre else
              f"Treprosentregelen brukt selv om eierandelen er over 90 %. I tillegg er 3 % brukt som skattesats."), None),
        ]
        sporsm = "andel"
    else:
        riktig = Dp - E
        q += f"<p>Holdingselskapet deler straks ut alt det har igjen til {navn}. Hvor mye sitter {navn} igjen med?</p>"
        kand = [
            (0.78 * Dh * (1 - te), f"Holdingselskapet skattlagt ordinært med 22 % før utbyttet sendes videre.", None),
            (Dp, f"Eierskatten glemt. Fritaksmetoden fritar holdingselskapet, ikke {navn}.", None),
            ((Dh * (1 - te)) if tre else ((Dh - 0.0066 * Dh) * (1 - te)),
             (f"Treprosentregelen glemt. Med {e} % er konsernunntaket ikke oppfylt." if tre else
              f"Treprosentregelen brukt selv om eierandelen er over 90 %."), None),
            ((Dh - 0.03 * Dh) * (1 - te), (f"Tre prosent brukt som skattesats i holdingselskapet." if tre else
              f"Treprosentregelen brukt selv om eierandelen er over 90 %. I tillegg er 3 % brukt som skattesats."), None),
        ]
        sporsm = "netto"
    kand = r.sample(kand, len(kand))
    valgt = velg_feller(riktig, [(v, t_, vis(v)) for v, t_, _ in kand], rel=0.002)
    alternativer = [R(vis(riktig), riktig)] + [F(vs, tekst, v) for v, tekst, vs in valgt]
    vis_ulike(*[a.tekst for a in alternativer])
    if modus == "utsatt":
        kort = (f"<p><b>{kra(riktig)}.</b> Selskapsskatt {talla(selsk)}"
                + (f" pluss {talla(hs)} etter treprosentregelen" if tre else "") + ". Eierskatten kommer først når pengene "
                f"tas ut.</p>")
        slutt = (f"<p><b>Steg 3: ingen eierskatt ennå.</b> Pengene står i holdingselskapet. Betalt så langt: "
                 + (f"{talla(selsk)} + {talla(hs)} = " if tre else "") + f"<b>{kra(riktig)}</b>. Tas pengene ut senere, "
                 f"kommer {talla(E)} i eierskatt.</p>")
    elif modus == "sats":
        teller = f"{talla(selsk)}" + (f" + {talla(hs)}" if tre else "") + f" + {talla(E)}"
        kort = (f"<p><b>{pst(riktig, 2)}.</b> ({teller})/{tall(andel)}. Fritaksmetoden gir selskapsskatt én gang og "
                f"eierskatt én gang.</p>")
        slutt = (f"<p><b>Steg 3: eierskatten.</b> {talla(Dp)} × 37,84 % = {talla(E)}.</p>"
                 f"<p><b>Steg 4: samlet.</b> ({teller})/{tall(andel)} = <b>{pst(riktig, 2)}</b>.</p>")
    else:
        kort = (f"<p><b>{kra(riktig)}.</b> Utbytte til {navn}: {talla(Dp)}. Eierskatt {talla(Dp)} × 37,84 % = "
                f"{talla(E)}.</p>")
        slutt = (f"<p><b>Steg 3: eierskatten.</b> {talla(Dp)} × 37,84 % = {talla(E)}. Igjen: {talla(Dp)} − {talla(E)} = "
                 f"<b>{kra(riktig)}</b>.</p>")
    full = (
        f"<p><b>Holdingselskapet er en utsettelse.</b> Fritaksmetoden gjør mellomleddet nesten gjennomsiktig: utbytte "
        f"mellom selskaper er skattefritt, bortsett fra treprosentregelen når eierandelen er 90 % eller mindre. Samlet "
        f"skatt på en krone som til slutt når eieren, er derfor 22 % + 78 % × 37,84 % = 51,52 % ved konsern over 90 %. "
        f"Holdingselskapet endrer ikke hvor mye som betales, bare når eierskatten kommer.</p>"
        f"<p><b>Steg 1: Drift AS.</b> {gen(navn)} andel av overskuddet: {e} % × {tall(P)} = {tall(andel)}. Selskapsskatt "
        f"22 % × {tall(andel)} = {talla(selsk)}. Utbytte til holdingselskapet: {talla(Dh)}.</p>"
        f"<p><b>Steg 2: holdingselskapet.</b> {tre_tekst}</p>"
        + slutt
        + (f"<p><b>Kontroll.</b> Over 90 % er samlet sats 51,52 %. Treprosentregelen legger på 0,66 % av utbyttet minus "
           f"eierskatten den sparer: 0,78 × 0,66 % × 62,16 % = 0,32 prosentpoeng. Med {e} % skal samlet sats derfor være "
           f"51,84 %" if tre else
           f"<p><b>Kontroll.</b> Treprosentregelen gjelder ikke over 90 %, så satsen er 51,52 %")
        + (f". Tas pengene ut, blir samlet skatt ({talla(riktig)} + {talla(E)})/{tall(andel)} = "
           f"{pst((selsk + hs + E) / andel, 2)}. ✓ Holdingselskapet har bare utsatt eierskatten.</p>" if modus == "utsatt" else
           f". Regnestykket over gir {pst((selsk + hs + E) / andel, 2)}. ✓</p>")
        + f"<p><b>Husk:</b> fritaksmetoden gir selskapsskatt én gang og eierskatt én gang, uansett antall ledd.</p>"
    )
    unik("aks-hold1", riktig)
    return sporsmal(q, alternativer, kort, full, hjelp=HJA["aks-hold1"][modus])


def holding_navn(navn):
    return f"{navn} Holding AS"


# ---------------------------------------------------------------------------
# aks-uf1 · Utbytte og formuesskatt over to år (k5 5.5, H2025 oppgave 1)
# ---------------------------------------------------------------------------
@familie("aks-uf1", tema="aksjonar", antall=5, tittel="Utbytte og formuesskatt over to år")
def _(r):
    navn = r.choice(NAVN)
    faktisk = r.random() < 0.35
    if faktisk:
        aar, (r1, r2) = ["2024", "2025"], (3.9, 3.6)
    else:
        aar, r1, r2 = ["år 1", "år 2"], r.choice([2, 2.5, 3, 3.5]), r.choice([3, 3.5, 4, 4.5])
    te = r.choice([TE, TE, 40.0])
    K = trekk(r, 2_000_000, 12_000_000, 500_000)
    D1 = trekk(r, K * r1 / 100 * 1.4, K * r1 / 100 * 3, steg_for(K * 0.05))
    D2 = trekk(r, K * r2 / 100 * 1.4, K * r2 / 100 * 3, steg_for(K * 0.05))
    S1, S2 = K * r1 / 100, K * r2 / 100
    E1, E2 = (D1 - S1) * te / 100, (D2 - S2) * te / 100
    FS1 = 0.01 * 0.8 * K
    riktig = D1 + D2 - E1 - E2 - 2 * FS1
    kand = [
        (D1 + D2 - E1 - D2 * te / 100 - 2 * FS1, f"Skjermingen brukt bare i {aar[0]}. Hvert år gir sitt eget fradrag.", None),
        (D1 + D2 - E1 - E2, f"Formuesskatten glemt. Den løper hvert år {navn} eier aksjene.", None),
        (D1 + D2 - E1 - E2 - 2 * 0.01 * K, f"Rabatten glemt: formuesskatten regnet av full børsverdi, 1 % × {tall(K)} per år.", None),
        (D1 + D2 - E1 - E2 - FS1, f"Formuesskatten tatt med for bare ett år.", None),
        (D1 + D2 - (D1 + D2) * te / 100 - 2 * FS1, f"Skjermingen glemt begge år: ({tall(D1)} + {tall(D2)}) × {ps(te)}.", None),
    ]
    kand = kand[:1] + r.sample(kand[1:], 4)
    valgt = velg_feller(riktig, [(v, t_, kra(v)) for v, t_, _ in kand], rel=0.004, faste=1)
    alternativer = [R(kra(riktig), riktig)] + [F(vis, tekst, v) for v, tekst, vis in valgt]
    vis_ulike(*[a.tekst for a in alternativer])
    sats_tekst = ("Eierskatten er 37,84 % (1,72 × 22 %)." if te == TE else "Anta at eierskatten er 40 %.")
    q = (f"<p>{navn} kjøpte børsnoterte aksjer i januar {aar[0]} for {kr(K)}, som er kostprisen. Aksjene eies ved "
         f"utgangen av begge årene. I {aar[0]} mottar {navn} {kr(D1)} i utbytte og skjermingsrenten er {ps(r1)}. I {aar[1]} "
         f"mottar {navn} {kr(D2)} og skjermingsrenten er {ps(r2)}. {sats_tekst} Formuesskatten er 1 %. Aksjene "
         f"verdsettes til 80 % av børsverdien. Børsverdien er lik kostprisen begge år. Se bort fra bunnfradraget og fra "
         f"annen formue og gjeld.</p>"
         f"<p>Hvor mye sitter {navn} igjen med av utbyttene etter eierskatt og formuesskatt for begge årene?</p>")
    kort = (f"<p><b>{kra(riktig)}.</b> Eierskatt {talla(E1)} + {talla(E2)}. Formuesskatt 1 % × 80 % × {tall(K)} = "
            f"{talla(FS1)} per år. {tall(D1 + D2)} − {talla(E1 + E2)} − {talla(2 * FS1)} = {talla(riktig)}.</p>")
    full = (
        f"<p><b>To skatter, to grunnlag.</b> Eierskatten treffer utbyttet minus skjermingsfradraget. Formuesskatten "
        f"treffer aksjenes formuesverdi, børsverdien etter rabatten. Den løper hvert år. Skjermingen har ingenting med "
        f"formuesskatten å gjøre. Rabatten har ingenting med eierskatten å gjøre.</p>"
        f"<p><b>Steg 1: skjermingen.</b> Utbyttet er større enn fradraget begge år, så ingenting framføres. Grunnlaget er "
        f"{tall(K)} begge år. {aar[0].capitalize()}: {tall(K)} × {ps(r1)} = {talla(S1)}. {aar[1].capitalize()}: {tall(K)} × "
        f"{ps(r2)} = {talla(S2)}.</p>"
        f"<p><b>Steg 2: eierskatten.</b> ({tall(D1)} − {talla(S1)}) × {ps(te)} = {talla(E1)}. ({tall(D2)} − {talla(S2)}) × "
        f"{ps(te)} = {talla(E2)}. Sum {talla(E1 + E2)}.</p>"
        f"<p><b>Steg 3: formuesskatten.</b> {tall(K)} × 80 % × 1 % = {talla(FS1)} per år, {talla(2 * FS1)} for to år.</p>"
        f"<p><b>Steg 4: igjen.</b> {tall(D1 + D2)} − {talla(E1 + E2)} − {talla(2 * FS1)} = <b>{kra(riktig)}</b>.</p>"
        f"<p><b>Kontroll, år for år.</b> {aar[0].capitalize()}: {tall(D1)} − {talla(E1)} − {talla(FS1)} = "
        f"{talla(D1 - E1 - FS1)}. {aar[1].capitalize()}: {tall(D2)} − {talla(E2)} − {talla(FS1)} = {talla(D2 - E2 - FS1)}. "
        f"Sum {talla(D1 - E1 - FS1)} + {talla(D2 - E2 - FS1)} = {talla(riktig)}. ✓ Skjermingen sparte ({talla(S1)} + "
        f"{talla(S2)}) × {ps(te)} = {talla((S1 + S2) * te / 100)} i eierskatt.</p>"
        f"<p><b>Husk:</b> eierskatt av utbytte minus skjerming, formuesskatt av 80 % av børsverdien hvert år.</p>"
    )
    unik("aks-uf1", riktig)
    return sporsmal(q, alternativer, kort, full, hjelp=HJA["aks-uf1"])


# ===========================================================================
# STATISKE SPØRSMÅL
# ===========================================================================

statisk(
    "aks-s01", hjelp=HSA["aks-s01"], tema="aksjonar", type="fakta",
    q="<p>Hva er skjermingsgrunnlaget for en aksje i aksjonærmodellen?</p>",
    alternativer=[
        R("Kostprisen pluss ubenyttet skjerming fra tidligere år"),
        F("Markedsverdien ved inngangen til året",
          "Grunnlaget bygger på det eieren har betalt, ikke på kursen. Markedsverdien brukes i formuesskatten."),
        F("Kostprisen pluss all skjerming aksjen har fått tidligere år",
          "Bare den ubenyttede delen legges til. Skjerming som er brukt mot utbytte, er borte."),
        F("Kostprisen alene, uansett om skjerming er framført",
          "Ubenyttet skjerming legges til grunnlaget. Slik forrenter den seg."),
    ],
    kort="<p><b>Kostpris pluss ubenyttet skjerming.</b> Grunnlaget starter på kostprisen. Ubrukt skjerming fra tidligere år "
         "legges til, så den gir skjermingsrente neste år.</p>",
    full="<p><b>Hva grunnlaget skal måle.</b> Skjermingsfradraget skal gjøre en risikofri avkastning på det eieren har "
         "skutt inn, skattefri. Grunnlaget er derfor kostprisen, altså inngangsverdien, ikke det aksjene er verdt i dag. "
         "Skyter eieren inn mer egenkapital, øker grunnlaget. Skrives egenkapitalen ned og betales tilbake, faller det.</p>"
         "<p><b>Ubenyttet skjerming.</b> Er utbyttet et år lavere enn fradraget, framføres resten. Den legges til neste "
         "års grunnlag og trekkes i tillegg fra senere utbytte eller gevinst.</p>"
         "<p><b>Eksempel.</b> Kostpris 500 000 og skjermingsrente 3 % gir fradrag 15 000. Utbyttet er 5 000, så 10 000 "
         "framføres. Neste år er grunnlaget 510 000.</p>"
         "<p><b>Kontroll.</b> Det som er brukt mot utbytte, skal ikke inn i grunnlaget. Legger du til alle 15 000, gir du "
         "skjerming for 5 000 kroner som alt er brukt. Grunnlaget blir 515 000 i stedet for 510 000.</p>"
         "<p><b>Husk:</b> grunnlag = kostpris + ubenyttet skjerming, aldri markedsverdien.</p>",
)

statisk(
    "aks-s02", hjelp=HSA["aks-s02"], tema="aksjonar", type="fakta",
    q="<p>Ole selger en aksjepost til Kari 15. september. Hvem får skjermingsfradraget for aksjene for dette året?</p>",
    alternativer=[
        R("Kari, fordi hun eier aksjene ved utgangen av året"),
        F("Ole, fordi han eide aksjene det meste av året",
          "Det er eieren ved årsskiftet som får fradraget, uansett hvor lenge hver av dem eide aksjene."),
        F("Begge, fordelt etter hvor mange måneder de eide aksjene",
          "Fradraget fordeles ikke. Det går i sin helhet til den som eier aksjen 31. desember."),
        F("Ingen av dem, fordi aksjene skiftet eier i løpet av året",
          "Selgeren mister årets fradrag, men kjøperen som eier ved årsskiftet, får det."),
    ],
    kort="<p><b>Kari.</b> Skjermingsfradraget tilordnes den som eier aksjen ved utgangen av året. Ole får bare bruke "
         "skjerming som alt er framført fra tidligere år.</p>",
    full="<p><b>Regelen.</b> Skjermingsfradraget for et år tilordnes den som eier aksjen ved utgangen av året. Det er en "
         "enkel regel som gjør at fradraget ikke må fordeles mellom flere eiere.</p>"
         "<p><b>For selgeren.</b> Ole får ikke skjerming for salgsåret. Han kan trekke fra den skjermingen som alt er "
         "framført fra år han eide aksjene ved årsskiftet. Den trekkes fra gevinsten hans.</p>"
         "<p><b>For kjøperen.</b> Kari eier aksjene 31. desember og får hele årets fradrag. Grunnlaget hennes er hennes egen "
         "kostpris, det hun betalte Ole. Oles ubenyttede skjerming følger ikke med, for skjermingen er personlig.</p>"
         "<p><b>Kontroll mot eksamen.</b> H2022 oppgave 1 bygger på dette: aksjen selges før årsskiftet. Den som legger "
         "på et skjermingsfradrag for salgsåret, får et negativt tall og velger feil.</p>"
         "<p><b>Husk:</b> skjerming til eieren ved årsskiftet. Solgt før 31. desember betyr ingen skjerming det året.</p>",
)

statisk(
    "aks-s03", hjelp=HSA["aks-s03"], tema="aksjonar", type="begrep",
    q="<p>Hva er den økonomiske begrunnelsen for skjermingsfradraget i aksjonærmodellen?</p>",
    alternativer=[
        R("Normalavkastningen på innskutt egenkapital skal være skattefri"),
        F("Aksjonæren skal kompenseres for inflasjonen mens aksjen eies",
          "Skjermingsrenten bygger på statskasseveksler etter skatt, ikke på prisstigningen."),
        F("Samlet skatt på utbytte skal bli lik toppskatten på lønn",
          "Det er begrunnelsen for oppjusteringsfaktoren 1,72, ikke for skjermingen."),
        F("Risikopremien på aksjer skal være skattefri, så det lønner seg å ta risiko",
          "Det er den risikofrie normalavkastningen som skjermes. Avkastning over den skattlegges fullt."),
    ],
    kort="<p><b>Normalavkastningen skal være skattefri.</b> Gjeld gir rentefradrag. Skjermingen gir egenkapital et "
         "tilsvarende fradrag for en risikofri avkastning.</p>",
    full="<p><b>Problemet skjermingen løser.</b> Et selskap som finansierer seg med gjeld, får trekke fra rentene. Et "
         "selskap som finansierer seg med egenkapital, får ikke trekke fra eierens alternativkostnad, selv om den er like "
         "reell. Uten en korreksjon ville skattesystemet gjøre egenkapital dyrere enn gjeld.</p>"
         "<p><b>Løsningen.</b> Skjermingsfradraget fritar en risikofri normalavkastning på det eieren har skutt inn. "
         "Eierskatten treffer bare avkastning ut over den. I teorien blir staten en passiv medinvestor i den risikable "
         "delen.</p>"
         "<p><b>Hvorfor renten er risikofri.</b> Skjermingsrenten er statskasseveksel pluss 0,5 prosentpoeng, etter skatt. "
         "Den skal ligne det eieren kunne fått uten risiko, ikke en aksjeavkastning.</p>"
         "<p><b>Kontroll mot de andre begrunnelsene.</b> 1,72 og 51,52 % handler om lønn mot utbytte. Inflasjon er ikke "
         "med i renten. Risikopremien skjermes ikke.</p>"
         "<p><b>Husk:</b> skjermingen gjør normalavkastningen skattefri. Bare meravkastning skattlegges.</p>",
)

statisk(
    "aks-s04", hjelp=HSA["aks-s04"], tema="aksjonar", type="begrep",
    q="<p>Utbyttet på en aksje var i fjor kr 2 000 lavere enn skjermingsfradraget. Eieren beholder aksjen. Hva skjer med de "
      "kr 2 000 i år?</p>",
    alternativer=[
        R("De legges til grunnlaget og trekkes i tillegg fra årets utbytte"),
        F("De trekkes fra årets utbytte, men grunnlaget er fortsatt bare kostprisen",
          "Da forrenter ikke den framførte skjermingen seg. Det er fellen som ga 12,50 i stedet for 12,36 i H2025 oppgave 4."),
        F("De legges til grunnlaget, så de bare gir høyere skjermingsfradrag i år",
          "De skal også trekkes fra utbyttet. Glemmer du det, blir svaret for høyt med nesten hele beløpet."),
        F("De går tapt, fordi skjerming bare gjelder året den oppstår",
          "Ubenyttet skjerming framføres. Den går tapt bare hvis aksjen selges med tap eller selskapet går konkurs."),
    ],
    kort="<p><b>Begge deler.</b> De 2 000 legges til grunnlaget, så årets fradrag blir større. De trekkes også fra årets "
         "utbytte sammen med årets fradrag.</p>",
    full="<p><b>To virkninger.</b> Ubenyttet skjerming er et fradrag som ikke ble brukt. Det trekkes derfor fra et senere "
         "utbytte. I tillegg legges det til skjermingsgrunnlaget, slik at neste års fradrag regnes av et større beløp.</p>"
         "<p><b>Eksempel.</b> Kostpris 100 000, skjermingsrente 4 % i år. Grunnlaget blir 100 000 + 2 000 = 102 000. "
         "Årets fradrag er 102 000 × 4 % = 4 080. Samlet skjerming i år er 4 080 + 2 000 = 6 080.</p>"
         "<p><b>Hvorfor begge.</b> Uten tillegget i grunnlaget ville en skjerming som ventet et år, tapt verdi. Med "
         "tillegget vokser den med skjermingsrenten, så den er like mye verdt når den brukes senere.</p>"
         "<p><b>Kontroll.</b> Samlet skjerming i år kan regnes som 2 000 × 1,04 + 100 000 × 4 % = 2 080 + 4 000 = 6 080. "
         "Samme tall. ✓ De to gale variantene gir 4 000 + 2 000 = 6 000 og 4 080.</p>"
         "<p><b>Husk:</b> framført skjerming løfter grunnlaget <i>og</i> trekkes fra.</p>",
)

statisk(
    "aks-s05", hjelp=HSA["aks-s05"], tema="aksjonar", type="fakta",
    q="<p>Hvordan fastsettes skjermingsrenten for aksjer eid av personer?</p>",
    alternativer=[
        R("Snittet av 3-måneders statskasseveksel pluss 0,5 prosentpoeng, ganget med 0,78"),
        F("Norges Banks styringsrente ved årets start, uten justering for skatt",
          "Renten bygger på statskasseveksler gjennom året og justeres for skatt."),
        F("Snittet av 3-måneders statskasseveksel pluss 0,5 prosentpoeng, uten noen skattejustering",
          "Renten ganges med (1 − 22 %), fordi skjermingen er skattefri og skal tilsvare en rente etter skatt."),
        F("Den gjennomsnittlige avkastningen på Oslo Børs året før, ganget med 0,78",
          "Skjermingsrenten er en risikofri rente, ikke en aksjeavkastning."),
    ],
    kort="<p><b>(Statskasseveksel + 0,5) × 0,78.</b> Skattedirektoratet fastsetter den i januar året etter inntektsåret og "
         "runder av til nærmeste tidel.</p>",
    full="<p><b>Formelen.</b> r<sub>s</sub> = (gjennomsnittlig rente på 3-måneders statskasseveksler + 0,5 prosentpoeng) × "
         "(1 − 22 %). Renten rundes av til nærmeste tidel.</p>"
         "<p><b>Når den fastsettes.</b> Skattedirektoratet fastsetter renten i januar året etter inntektsåret, når snittet "
         "for hele året er kjent. Renten for 2026 kommer derfor først i januar 2027. Eksamen oppgir alltid renten.</p>"
         "<p><b>Tallene.</b> 2023: (3,657 + 0,5) × 0,78 = 3,24, altså 3,2 %. 2024: (4,4498 + 0,5) × 0,78 = 3,86, altså "
         "3,9 %. 2025: (4,1480 + 0,5) × 0,78 = 3,63, altså 3,6 %.</p>"
         "<p><b>Hvorfor 0,78.</b> Skjermingen er skattefri. En risikofri plassering i banken ville vært skattlagt med 22 %. "
         "For at sammenligningen skal stemme, brukes renten etter skatt.</p>"
         "<p><b>Kontroll.</b> Regn baklengs fra den publiserte satsen for 2024: 3,9/0,78 − 0,5 = 4,5. Det stemmer med "
         "snittet 4,4498 % når du tar hensyn til avrundingen til én desimal. ✓</p>"
         "<p><b>Husk:</b> r<sub>s</sub> = (statskasseveksel + 0,5) × 0,78, fastsatt i januar året etter.</p>",
)

statisk(
    "aks-s06", hjelp=HSA["aks-s06"], tema="aksjonar", type="fakta",
    q="<p>Gjennomsnittsrenten på 3-måneders statskasseveksler var 4,1 % i et inntektsår. Skjermingsrenten er snittet pluss "
      "0,5 prosentpoeng, justert for 22 % skatt og rundet av til nærmeste tidel. Hva blir skjermingsrenten?</p>",
    alternativer=[
        R("3,6 %"),
        F("4,6 %", "Skattejusteringen glemt: 4,1 + 0,5 = 4,6. Summen skal ganges med 0,78."),
        F("3,2 %", "Påslaget på 0,5 prosentpoeng glemt: 4,1 × 0,78 = 3,198."),
        F("3,7 %", "Påslaget lagt til etter skattejusteringen: 4,1 × 0,78 + 0,5 = 3,698. Det skal legges til først."),
    ],
    kort="<p><b>3,6 %.</b> (4,1 + 0,5) × 0,78 = 3,588, som rundes til 3,6 %.</p>",
    full="<p><b>Formelen.</b> Skjermingsrenten er (statskasseveksel + 0,5 prosentpoeng) × (1 − 22 %), rundet av til "
         "nærmeste tidel. Rekkefølgen betyr noe: påslaget legges til før skattejusteringen.</p>"
         "<p><b>Steg 1: påslaget.</b> 4,1 + 0,5 = 4,6.</p>"
         "<p><b>Steg 2: skattejusteringen.</b> 4,6 × 0,78 = 3,588.</p>"
         "<p><b>Steg 3: avrunding.</b> 3,588 rundes til 3,6 %.</p>"
         "<p><b>Kontroll.</b> For inntektsåret 2025 var snittet 4,1480 %. Renten ble (4,1480 + 0,5) × 0,78 = 3,63, altså "
         "3,6 %. Regn så baklengs fra ditt eget tall: 3,588/0,78 = 4,6. Så er 4,6 − 0,5 = 4,1, som er snittet i "
         "spørsmålet. ✓</p>"
         "<p><b>Hvorfor etter skatt.</b> Skjermingen er skattefri. Den skal tilsvare det en risikofri plassering gir etter "
         "skatt. En plassering i statskasseveksler pluss påslaget ville gitt 4,6 % før skatt og 3,588 % etter 22 % skatt.</p>"
         "<p><b>Når renten kommer.</b> Skattedirektoratet fastsetter renten i januar året etter inntektsåret. Derfor oppgir "
         "eksamen alltid renten for hvert år.</p>"
         "<p><b>Husk:</b> (statskasseveksel + 0,5) × 0,78. Påslag først, så skatt.</p>",
)

statisk(
    "aks-s07", hjelp=HSA["aks-s07"], tema="aksjonar", type="paastand", rekkefolge="fast",
    q="<p>Vurder de to påstandene om skjerming for en personlig aksjonær.</p>"
      "<p>I. Ubenyttet skjerming kan trekkes fra en gevinst ved salg og redusere den til null.</p>"
      "<p>II. Selges aksjen med tap, kan ubenyttet skjerming legges til tapet og gi et større fradrag.</p>"
      "<p>Hvilke påstander er riktige?</p>",
    alternativer=[
        R("Bare I"),
        F("Bare II", "Påstand II er gal: skjermingen kan ikke skape eller øke et tap. Påstand I er riktig."),
        F("Både I og II", "Påstand II er gal. Ved tap går den ubenyttede skjermingen tapt."),
        F("Ingen av dem", "Påstand I er riktig: framført skjerming trekkes fra gevinsten, men aldri under null."),
    ],
    kort="<p><b>Bare I.</b> Skjermingen kan redusere en gevinst til null, men aldri skape eller øke et fradragsberettiget "
         "tap. Ved tap går den ubenyttede skjermingen tapt.</p>",
    full="<p><b>Regelen.</b> Skattepliktig gevinst er salgspris minus inngangsverdi minus ubenyttet skjerming. Skjermingen kan "
         "redusere gevinsten, men den kan ikke gjøre et resultat negativt eller et tap større.</p>"
         "<p><b>Påstand I.</b> Kjøpt for 500 000, solgt for 550 000, ubenyttet skjerming 50 000: gevinst 550 000 − 500 000 − "
         "50 000 = 0. Riktig. Det er nøyaktig H2022 oppgave 1.</p>"
         "<p><b>Påstand II.</b> Kjøpt for 500 000, solgt for 450 000, ubenyttet skjerming 30 000: tapet er 50 000, ikke "
         "80 000. De 30 000 i skjerming går tapt. Påstanden er gal.</p>"
         "<p><b>Hvorfor det betyr noe.</b> Asymmetrien er Bjerksund og Schjelderups argument for at aksjonærmodellen ikke er "
         "nøytral: staten deler oppsiden fullt, men nedsiden bare delvis. Ubenyttet skjerming er en fradragsrett knyttet "
         "til aksjen, ikke penger på bok.</p>"
         "<p><b>Kontroll.</b> Er gevinsten før skjerming negativ, er svaret alltid bare tapet. Skjermingen endrer ingenting.</p>"
         "<p><b>Husk:</b> skjerming kan redusere en gevinst til null, aldri øke et tap.</p>",
)

statisk(
    "aks-s08", hjelp=HSA["aks-s08"], tema="aksjonar", type="fakta",
    q="<p>Et norsk aksjeselskap eier aksjer i et annet norsk aksjeselskap. Hva sier fritaksmetoden om utbytte, gevinst og "
      "tap på slike aksjer?</p>",
    alternativer=[
        R("Gevinst og utbytte er i hovedsak fritatt. Tap gir ikke fradrag"),
        F("Gevinst og utbytte er fritatt, mens tap gir fradrag mot annen inntekt",
          "Symmetrien går begge veier. Når gevinst er fritatt, gir tap ikke fradrag."),
        F("Utbytte er fritatt, mens gevinst skattlegges med 22 % og tap gir fradrag",
          "Gevinst er også fritatt. Bare utbytte har treprosentregelen."),
        F("Utbytte og gevinst skattlegges med 37,84 %, som for personlige eiere",
          "37,84 % gjelder personlige aksjonærer. Selskaper følger fritaksmetoden."),
    ],
    kort="<p><b>Fritak for gevinst og utbytte, ingen fradrag for tap.</b> Eneste unntak er at 3 % av utbyttet inntektsføres "
         "når eierandelen er 90 % eller mindre.</p>",
    full="<p><b>Regelen.</b> Skatteloven § 2-38: et aksjeselskap betaler ikke skatt på utbytte og gevinst på aksjer i selskap "
         "hjemmehørende i EØS. Utenfor EØS gjelder det på vilkår. Motstykket står i samme bestemmelse: tap på slike aksjer "
         "gir ikke fradrag.</p>"
         "<p><b>Unntaket.</b> 3 % av mottatt utbytte inntektsføres som alminnelig inntekt hos mottakeren. Det gir en skatt "
         "på 3 % × 22 % = 0,66 % av utbyttet. Regelen gjelder ikke gevinst. Den gjelder heller ikke når mottakeren eier mer "
         "enn 90 % av aksjene og stemmene.</p>"
         "<p><b>Sammenligning med personlig eier.</b> En person skattlegges med 37,84 % av gevinst og utbytte over "
         "skjermingen. Personen får fradrag for tap med samme sats. Selskapet har verken skatt eller fradrag.</p>"
         "<p><b>Kontroll.</b> Et selskap som taper 10 mill. kr på en aksjepost, får ingenting igjen på skatten. En person "
         "får fradrag verdt 10 mill. × 37,84 % = 3 784 000. «Fritaksmetoden er en fordel i alle tilfeller» er derfor gal.</p>"
         "<p><b>Husk:</b> selskap: 0 % på gevinst, 0,66 % på utbytte, ingen fradrag for tap.</p>",
)

statisk(
    "aks-s09", hjelp=HSA["aks-s09"], tema="aksjonar", type="fakta",
    q="<p>Hvilken påstand om treprosentregelen i fritaksmetoden er riktig?</p>",
    alternativer=[
        R("3 % av mottatt utbytte inntektsføres, men ikke ved over 90 % eierskap"),
        F("3 % av både utbytte og gevinst inntektsføres hos mottakerselskapet",
          "Regelen gjelder bare utbytte. Gevinst er fullt fritatt."),
        F("Utbytte skattlegges med 3 % hos mottakerselskapet",
          "3 % inntektsføres og skattlegges med 22 %. Skatten blir 0,66 % av utbyttet."),
        F("3 % av utbyttet inntektsføres, også i konsern der eierandelen er 100 %",
          "Eier mottakeren mer enn 90 % av aksjene og stemmene, er utbyttet fullt fritatt."),
    ],
    kort="<p><b>Bare utbytte, bare til og med 90 %.</b> 3 % × 22 % = 0,66 % av utbyttet. Gevinst er fritatt. Utbytte i "
         "konsern over 90 % er også fritatt.</p>",
    full="<p><b>Regelen.</b> Etter skatteloven § 2-38 sjette ledd skal 3 % av mottatt utbytte inntektsføres som alminnelig "
         "inntekt hos det mottakende selskapet. Med 22 % gir det en skatt på 0,66 % av utbyttet.</p>"
         "<p><b>Hva den ikke gjelder.</b> Gevinst ved salg av aksjer er helt fritatt. Utbytte innen konsern er helt fritatt "
         "når mottakeren eier mer enn 90 % av aksjene og har mer enn 90 % av stemmene.</p>"
         "<p><b>Eksempel.</b> Holding AS eier 60 % av Drift AS og mottar 4 000 000 i utbytte. Inntektsført: 120 000. "
         "Skatt: 120 000 × 22 % = 26 400. Eier Holding AS 95 %, er skatten 0.</p>"
         "<p><b>Kontroll.</b> 0,66 % × 4 000 000 = 26 400. ✓ Bruker du 3 % som skattesats, får du 120 000. Det er "
         "inntektsføringen, ikke skatten.</p>"
         "<p><b>Husk:</b> 0,66 % på utbytte ved 90 % eller mindre. 0 % på gevinst. 0 % i konsern over 90 %.</p>",
)

statisk(
    "aks-s10", hjelp=HSA["aks-s10"], tema="aksjonar", type="begrep",
    q="<p>Hvorfor skal et aksjeselskap inntektsføre 3 % av mottatt utbytte når utbytte ellers er fritatt etter "
      "fritaksmetoden?</p>",
    alternativer=[
        R("Den er en sjablong for kostnader knyttet til skattefrie aksjeinntekter"),
        F("Den skal sikre at samlet skatt på utdelt overskudd blir 51,52 %",
          "51,52 % kommer fra selskapsskatt og eierskatt. Treprosentregelen flytter den bare litt."),
        F("Den er en skatt på at selskapet utsetter eierskatten for aksjonæren",
          "Utsettelsen beskattes ikke. Regelen handler om kostnader."),
        F("Den skal hindre kjedebeskatning når utbytte går gjennom mange selskaper",
          "Feil retning. Det er fritaksmetoden som hindrer kjedebeskatning. Treprosentregelen legger litt skatt tilbake."),
    ],
    kort="<p><b>En sjablong for kostnader.</b> Selskapet får fradrag for kostnader ved å eie aksjene, mens inntektene er "
         "skattefrie. 3 % av utbyttet tilbakefører fradraget sjablongmessig.</p>",
    full="<p><b>Problemet.</b> Et selskap som eier aksjer, har kostnader: forvaltning, rådgivning og renter på lån som "
         "finansierer aksjene. Kostnadene trekkes fra i alminnelig inntekt. Inntektene fra aksjene er derimot skattefrie "
         "etter fritaksmetoden. Da gir staten fradrag for kostnader ved å tjene skattefrie penger.</p>"
         "<p><b>Løsningen.</b> I stedet for å fordele hver kostnad mellom skattefri og skattepliktig virksomhet, tilbakefører "
         "loven sjablongmessig 3 % av utbyttet som inntekt. Skatten blir 3 % × 22 % = 0,66 %.</p>"
         "<p><b>Hvorfor ikke gevinst og ikke konsern.</b> Gevinster kommer sjeldnere og i større klumper. Over 90 % eierskap "
         "finnes ingen tredjepart å skyve kostnader til.</p>"
         "<p><b>Kontroll.</b> Virkningen er liten. I en kjede der holdingselskapet eier 80 %, løfter regelen samlet skatt fra "
         "51,52 % til 51,84 %. Forelesningen sier at den i praksis kan glemmes i beslutninger, men ikke på eksamen.</p>"
         "<p><b>Husk:</b> treprosentregelen er en kostnadssjablong, ikke en skatt på utsettelse.</p>",
)

statisk(
    "aks-s11", hjelp=HSA["aks-s11"], tema="aksjonar", type="begrep",
    q="<p>Hva er hovedbegrunnelsen for at utbytte og gevinst mellom aksjeselskaper er skattefritt?</p>",
    alternativer=[
        R("Å unngå kjedebeskatning, så overskuddet skattlegges én gang i selskapssektoren"),
        F("Å la eierne slippe eierskatten på overskudd som blir stående i selskapene for godt",
          "Eierskatten kommer når pengene tas ut til en person. Fritaksmetoden utsetter den, men fjerner den ikke."),
        F("Å gjøre det lønnsomt for selskaper å ta mer risiko enn personer",
          "Fritaket for gevinst følges av at tap ikke gir fradrag. Det gir ingen risikofordel."),
        F("Å kompensere for at selskaper ikke får skjermingsfradrag",
          "Skjermingen gjelder personlige aksjonærer. Fritaksmetoden har en annen begrunnelse."),
    ],
    kort="<p><b>Unngå kjedebeskatning.</b> Uten fritak ville samme krone blitt skattlagt i hvert selskap i kjeden. Nå "
         "skattlegges den én gang i selskapssektoren og én gang hos personen.</p>",
    full="<p><b>Kjedebeskatning.</b> Tenk deg tre selskaper i kjede: driftsselskap, mellomselskap og holdingselskap. Uten "
         "fritak betaler driftsselskapet 22 % av overskuddet, mellomselskapet 22 % av de 78 kronene det mottar, "
         "holdingselskapet 22 % av resten. Så kommer eierskatten. Skatten avhenger bare av hvor mange ledd kjeden "
         "tilfeldigvis har.</p>"
         "<p><b>Løsningen.</b> Med fritaksmetoden er utbytte og gevinst mellom selskaper skattefritt. Samlet skatt blir "
         "22 % + 78 % × 37,84 % = 51,52 %, uansett antall ledd.</p>"
         "<p><b>Regnestykket uten fritak.</b> Med ett holdingselskap som betaler 22 % av utbyttet: 22 % + 78 % × 22 % = "
         "39,16 % før eierskatt. Samlet blir det 39,16 % + 60,84 % × 37,84 % = 62,18 %.</p>"
         "<p><b>Kontroll.</b> 62,18 % mot 51,52 %: forskjellen er nøyaktig skatten i mellomleddet. Fritaket fjerner den.</p>"
         "<p><b>Husk:</b> fritaksmetoden gir selskapsskatt én gang og eierskatt én gang. Eierskatten utsettes, den "
         "forsvinner ikke.</p>",
)

statisk(
    "aks-s12", hjelp=HSA["aks-s12"], tema="aksjonar", type="begrep",
    q="<p>Samlet skatt på en krone som til slutt tas ut til eieren, er den samme med og uten holdingselskap. Hvorfor kan det "
      "likevel lønne seg å eie aksjene gjennom et holdingselskap?</p>",
    alternativer=[
        R("Eierskatten utsettes, som virker som et rentefritt lån fra staten"),
        F("Holdingselskapet gjør samlet skatt ved uttak lavere enn 51,52 %",
          "Over 90 % er samlet skatt ved uttak fortsatt 51,52 %. Eierskatten kommer når pengene tas ut."),
        F("Utbytte som går via et holdingselskap, slipper eierskatt for godt",
          "Eierskatten forsvinner ikke. Den kommer når pengene tas ut til en person."),
        F("Holdingselskapet kan trekke fra tap på aksjer mot andre inntekter",
          "Under fritaksmetoden gir tap ikke fradrag."),
    ],
    kort="<p><b>Utsettelse.</b> Pengene kan reinvesteres i holdingselskapet uten eierskatt. Eierskatten kommer først ved "
         "uttak. Utsatt skatt er et rentefritt lån.</p>",
    full="<p><b>Utsettelse, ikke fritak.</b> Med holdingselskap og fritaksmetoden kan eieren selge og kjøpe aksjer, eller "
         "motta utbytte, uten at eierskatten utløses. Den kommer først når pengene tas ut til eieren.</p>"
         "<p><b>Hva utsettelsen er verdt.</b> Står pengene i selskapet, reinvesteres hele beløpet i stedet for 62,16 % av "
         "det. Avkastningen på den utsatte skatten tilfaller eieren.</p>"
         "<p><b>Eksempel.</b> Aksjer verdt 10 mill. med inngangsverdi 2 mill. skal byttes. Personlig eie: skatt 8 mill. × "
         "37,84 % = 3 027 200 nå. Via holding: 0 nå. Dobles verdien før uttak, sitter eieren igjen med 1 881 708 mer via "
         "holding.</p>"
         "<p><b>Kontroll.</b> Fordelen skal være avkastningen på skatten som ble utsatt, etter skatt: 3 027 200 × 62,16 % = "
         "1 881 708. ✓ Bjerksund og Schjelderup kaller kombinasjonen av aksjonærmodellen og fritaksmetoden et to-hodet "
         "troll av den grunn.</p>"
         "<p><b>Husk:</b> holdingselskapet utsetter eierskatten. Samlet sats er fortsatt 51,52 %.</p>",
)

statisk(
    "aks-s13", hjelp=HSA["aks-s13"], tema="aksjonar", type="fakta",
    q="<p>Kari låner kr 500 000 av sitt eget aksjeselskap i 2026. Lånet har markedsmessig rente og en skriftlig avtale. "
      "Hvordan behandles lånet skattemessig hos Kari?</p>",
    alternativer=[
        R("Som utbytte til Kari på utbetalingstidspunktet"),
        F("Som et vanlig lån uten skattevirkning, så lenge renten er markedsmessig",
          "Slik var det før 2015. Nå skattlegges lån fra selskap til personlig aksjonær som utbytte."),
        F("Som lønn, med trygdeavgift og trinnskatt",
          "Lånet regnes som utbytte, ikke som lønn."),
        F("Som utbytte, men først når selskapet ettergir lånet",
          "Skatten utløses når lånet utbetales, ikke når det eventuelt ettergis."),
    ],
    kort="<p><b>Som utbytte.</b> Siden 2015 skattlegges lån fra selskap til personlig aksjonær som utbytte når det utbetales. "
         "Uten skjerming blir skatten 500 000 × 37,84 % = 189 200.</p>",
    full="<p><b>Omveien som ble stengt.</b> Står pengene i selskapet, er det fristende å låne dem ut til eieren i stedet for "
         "å dele dem ut. Et lån er ingen inntekt. Det trenger aldri å bli innfridd. Fram til 2015 fungerte det.</p>"
         "<p><b>Regelen nå.</b> Lån fra selskap til personlig aksjonær skattlegges som utbytte på utbetalingstidspunktet. "
         "Regelen omfatter også lån til aksjonærens nærstående.</p>"
         "<p><b>Regnestykket.</b> 500 000 × 37,84 % = 189 200, i den grad Kari ikke har skjerming å trekke fra. Hun skylder "
         "fortsatt selskapet pengene. Hun sitter igjen med kontantene, en skatteregning og en gjeld.</p>"
         "<p><b>Hvorfor.</b> Når låntakeren kontrollerer långiveren, er realiteten den samme som en utdeling. Eieren "
         "bestemmer rente, avdrag og om lånet noen gang kreves inn. Prinsippet er substans over form.</p>"
         "<p><b>Unntaket i forskriften.</b> Forskriften til skatteloven (FSFIN § 10-11-1) unntar samlet kreditt under kr 100 000 som innfris innen 60 dager. Går summen over, skattlegges hele beløpet. Karis lån på kr 500 000 er langt over grensen.</p>"
         "<p><b>Kontroll.</b> Lånet blir aldri billigere enn utbytte. Regelen gjør låneveien like dyr som utbytteveien.</p>"
         "<p><b>Husk:</b> aksjonærlån skattlegges som utbytte siden 2015.</p>",
)

statisk(
    "aks-s14", hjelp=HSA["aks-s14"], tema="aksjonar", type="fakta",
    q="<p>Hva er kjernen i aksjonærmodellen for personlige aksjonærer?</p>",
    alternativer=[
        R("Avkastning over skjermingen oppjusteres og skattlegges som alminnelig inntekt"),
        F("Utbytte er skattefritt hos personen fordi selskapet alt har betalt 22 % skatt av overskuddet",
          "Det var godtgjørelsesmetoden før 2006. I dag skattlegges utbytte over skjermingen med 37,84 %."),
        F("All avkastning på aksjer skattlegges hvert år, også urealisert kursgevinst",
          "Gevinst skattlegges først ved salg. Urealisert gevinst er ikke skattepliktig."),
        F("Utbytte skattlegges hos selskapet, mens gevinst skattlegges hos personen",
          "Både utbytte og gevinst skattlegges hos personen etter skjerming."),
    ],
    kort="<p><b>Skjerming, så oppjustert skatt.</b> Utbytte og gevinst over skjermingsfradraget ganges med 1,72 og "
         "skattlegges med 22 %, altså 37,84 %.</p>",
    full="<p><b>Modellen.</b> En personlig aksjonær trekker skjermingsfradraget fra utbytte og gevinst. Resten kalles "
         "eierinntekt. Den ganges med oppjusteringsfaktoren 1,72 og skattlegges som alminnelig inntekt med 22 %. Effektiv "
         "sats: 37,84 %.</p>"
         "<p><b>To deler med hver sin begrunnelse.</b> Skjermingen gjør en risikofri normalavkastning skattefri. "
         "Oppjusteringen gjør samlet skatt på utdelt overskudd lik omtrent toppskatten på lønn: 22 % + 78 % × 37,84 % = "
         "51,52 %.</p>"
         "<p><b>Når skatten kommer.</b> Utbytte skattlegges når det mottas. Gevinst skattlegges når aksjen selges. Tap gir "
         "fradrag med samme sats.</p>"
         "<p><b>Kontroll med tall.</b> Utbytte 60 000, skjerming 20 000: (60 000 − 20 000) × 1,72 × 22 % = 15 136. Samme "
         "som 40 000 × 37,84 %. ✓</p>"
         "<p><b>Husk:</b> skjerming trekkes fra, resten × 1,72 × 22 %.</p>",
)

statisk(
    "aks-s15", hjelp=HSA["aks-s15"], tema="aksjonar", type="begrep",
    q="<p>Anta at eierskatten på utbytte bare var 22 %, uten oppjustering. Selskapsskatten er 22 %. Hva ville samlet skatt på "
      "en krone utdelt overskudd vært? Velg tallet med riktig konsekvens.</p>",
    alternativer=[
        R("39,16 %, så eiere ville tatt ut lønn som utbytte"),
        F("44 %, så lønn og utbytte ville kostet omtrent det samme",
          "22 + 22 er satsene lagt sammen. Eierskatten treffer bare de 78 ørene som er igjen."),
        F("39,16 %, så eiere ville tatt ut utbytte som lønn",
          "Retningen er snudd. Er utbytte billigere enn lønn, gjør eieren lønn om til utbytte."),
        F("22 %, fordi utbytte bare skattlegges én gang",
          "Utbytte skattlegges både i selskapet og hos eieren."),
    ],
    kort="<p><b>39,16 %.</b> 22 % + 78 % × 22 % = 39,16 %, åtte prosentpoeng under 47,4 % på lønn. Da lønner det seg å ta "
         "lønnen som utbytte.</p>",
    full="<p><b>Inntektsskifting.</b> En eier som jobber i eget selskap, kan ta ut verdiene som lønn eller utbytte. Er "
         "utbytte billigere, gjør hun lønn om til utbytte. Det kalles inntektsskifting.</p>"
         "<p><b>Steg 1: uten oppjustering.</b> Selskapet betaler 22 øre av en krone. Eieren betaler 22 % av de 78 ørene: "
         "17,16 øre. Samlet 39,16 øre.</p>"
         "<p><b>Steg 2: sammenlign med lønn.</b> Toppskatten på lønn er 47,4 %. Utbytte ville vært 8,24 prosentpoeng "
         "billigere.</p>"
         "<p><b>Steg 3: med oppjustering.</b> Eierskatten blir 1,72 × 22 % = 37,84 %. Samlet: 22 % + 78 % × 37,84 % = "
         "51,52 %, litt over lønn. Inntektsskiftingen lønner seg ikke lenger.</p>"
         "<p><b>Kontroll.</b> Faktoren som gir nøyaktig 47,4 %, er (0,474 − 0,22)/(0,78 × 0,22) = 1,48. Dagens 1,72 tar også "
         "hensyn til arbeidsgiveravgiften som veltes over på lønnstakeren.</p>"
         "<p><b>Husk:</b> 39,16 % uten oppjustering, 51,52 % med. Oppjusteringen stenger døra for inntektsskifting.</p>",
)

statisk(
    "aks-s16", hjelp=HSA["aks-s16"], tema="aksjonar", type="formel",
    q="<p>Oppjusteringsfaktoren f løses ut av likevektsbetingelsen t<sub>w</sub> + a = t + (1 − t) × t × f. Her er t<sub>w</sub> "
      "toppskatten på lønn, t skatten på alminnelig inntekt og a den delen av arbeidsgiveravgiften som veltes over på "
      "lønnstakeren. Hvilket uttrykk gir f?</p>",
    alternativer=[
        R("(t<sub>w</sub> + a − t)/((1 − t) × t)"),
        F("(t<sub>w</sub> + a − t)/(1 − t)", "Glemt å dele på t. Dette uttrykket gir eierskatten f × t, ikke faktoren."),
        F("(t<sub>w</sub> + a)/((1 − t) × t)", "Selskapsskatten t er ikke trukket fra venstresiden. Da betales den to ganger."),
        F("(t<sub>w</sub> − a − t)/((1 − t) × t)", "Fortegnet på a er snudd. Overvelting øker den skatten en lønnskrone "
                                                  "bærer."),
    ],
    kort="<p><b>(t<sub>w</sub> + a − t)/((1 − t) × t).</b> Trekk t fra begge sider og del på (1 − t) × t.</p>",
    full="<p><b>Likningen.</b> Venstresiden er samlet skatt på en lønnskrone, inkludert den delen av arbeidsgiveravgiften "
         "lønnstakeren bærer. Høyresiden er samlet skatt på en utbyttekrone: selskapsskatt t pluss eierskatt (1 − t) × t × f.</p>"
         "<p><b>Steg 1.</b> t<sub>w</sub> + a − t = (1 − t) × t × f.</p>"
         "<p><b>Steg 2.</b> f = (t<sub>w</sub> + a − t)/((1 − t) × t).</p>"
         "<p><b>Kontroll med tall.</b> Med a = 0: f = (0,474 − 0,22)/(0,78 × 0,22) = 0,254/0,1716 = 1,48. Med hele "
         "arbeidsgiveravgiften veltet over, a = 0,124: f = 0,378/0,1716 = 2,20. Dagens 1,72 ligger mellom og svarer til "
         "a ≈ 4,1 prosentpoeng. ✓</p>"
         "<p><b>Debatten.</b> Forelesningen påpeker at empirien om overvelting spriker, så satsen hviler på en antakelse. "
         "Motargumentet er at 51,52 % mot 47,4 % er den sammenligningen lovgiveren har villet ha.</p>"
         "<p><b>Husk:</b> f = (t<sub>w</sub> + a − t)/((1 − t) × t). Uten a gir det 1,48.</p>",
)

statisk(
    "aks-s17", hjelp=HSA["aks-s17"], tema="aksjonar", type="paastand",
    q="<p>Bjerksund og Schjelderup argumenterer for at aksjonærmodellen ikke er nøytral. Hvilken begrunnelse gir de?</p>",
    alternativer=[
        R("Staten tar del i oppsiden, men ikke fullt i nedsiden"),
        F("Skjermingsrenten er høyere enn markedsrenten, så aksjer subsidieres",
          "Skjermingsrenten er en risikofri rente etter skatt. Argumentet går motsatt vei: investoren kan ikke låne så "
          "billig."),
        F("Eierskatten er lavere enn skatten på renter, så aksjer favoriseres",
          "Eierskatten, 37,84 %, er høyere enn 22 % på renter."),
        F("Oppjusteringen gjør at gevinster skattlegges to ganger hos eieren",
          "Gevinsten skattlegges én gang hos eieren. Oppjusteringen er en del av den ene skatten."),
    ],
    kort="<p><b>Asymmetri.</b> Gevinst over skjermingen skattlegges, men ubenyttet skjerming går tapt ved tap. I tillegg "
         "kan investoren ikke låne til skjermingsrenten.</p>",
    full="<p><b>Hva nøytral betyr.</b> En nøytral skatt endrer ikke hvilke investeringer som lønner seg. Skjermingen skal "
         "sørge for det: normalavkastningen er skattefri. Staten tar del i meravkastningen.</p>"
         "<p><b>Argument 1: asymmetri.</b> Går det godt, skattlegges gevinsten over skjermingen. Går det dårlig, går den "
         "ubenyttede skjermingen tapt uten kompensasjon. Staten tar del i oppsiden, men ikke fullt i nedsiden.</p>"
         "<p><b>Argument 2: lånerenten.</b> Selv med full symmetri krever nøytralitet at investoren kan låne til "
         "skjermingsrenten. Lånerenten er høyere, så skjermingen er for lav for den som finansierer med lån.</p>"
         "<p><b>Følgen.</b> Det lønner seg å holde kapitalen i selskapet framfor å ta den ut. Tilbakeholdt overskudd i "
         "norske aksjeselskaper vokste fra rundt 760 mrd. kr i 2000–2004 til rundt 2 486 mrd. kr i 2016.</p>"
         "<p><b>Kontroll.</b> Kjøpt for 500 000, solgt for 450 000, ubenyttet skjerming 30 000: fradraget gjelder bare "
         "tapet på 50 000. De 30 000 går tapt.</p>"
         "<p><b>Husk:</b> ikke nøytral fordi skjermingen er asymmetrisk og lånerenten høyere enn skjermingsrenten.</p>",
)

statisk(
    "aks-s18", hjelp=HSA["aks-s18"], tema="aksjonar", type="begrep",
    q="<p>Hva menes med innlåsing (lock-in) i aksjebeskatningen?</p>",
    alternativer=[
        R("At eiere venter med å selge fordi skatten først kommer ved salg"),
        F("At aksjer i unoterte selskaper ikke kan selges uten samtykke fra styret og de andre eierne",
          "Det er en selskapsrettslig begrensning, ikke en skattevirkning."),
        F("At ubenyttet skjerming bare kan brukes på samme aksje",
          "Det stemmer at skjermingen er aksjevis, men det er ikke det innlåsing betyr."),
        F("At utbytte må holdes tilbake i selskapet til skjermingen er brukt opp",
          "Det finnes ingen slik regel. Skjermingen framføres uansett."),
    ],
    kort="<p><b>Utsatt realisasjon.</b> Når gevinstskatten først utløses ved salg, blir det lønnsomt å la være å selge. "
         "Kapitalen blir stående i investeringer den ellers ville forlatt.</p>",
    full="<p><b>Mekanismen.</b> Gevinst på aksjer skattlegges når aksjen selges, ikke mens verdien stiger. Den som har en stor "
         "latent gevinst, betaler skatten i det øyeblikket hun bytter til en annen investering. Å la være å selge utsetter "
         "skatten. Utsatt skatt er et rentefritt lån.</p>"
         "<p><b>Følgen.</b> Kapital blir stående i investeringer som ellers ville blitt solgt. Det er et effektivitetstap: "
         "skatten styrer hvor pengene står, ikke avkastningen.</p>"
         "<p><b>Hvordan holdingselskapet endrer bildet.</b> Med fritaksmetoden kan et selskap selge aksjer uten skatt. "
         "Innlåsingen flyttes da fra hver enkelt aksjepost til uttaket fra holdingselskapet. Eieren bestemmer selv når "
         "eierskatten utløses.</p>"
         "<p><b>Old view og new view.</b> Old view: utbytteskatt øker kapitalkostnaden og reduserer investeringene. New view: "
         "ikke for selskaper som finansierer seg med tilbakeholdt overskudd, siden skatten treffer likt om pengene tas ut nå "
         "eller senere.</p>"
         "<p><b>Kontroll.</b> Innlåsing krever at skatten utløses ved realisasjon. Med årlig skatt på urealisert gevinst "
         "ville den forsvunnet.</p>"
         "<p><b>Husk:</b> lock-in = skatt ved salg gjør det lønnsomt å la være å selge.</p>",
)

statisk(
    "aks-s19", hjelp=HSA["aks-s19"], tema="aksjonar", type="paastand", rekkefolge="fast",
    q="<p>Vurder de to påstandene om skjerming.</p>"
      "<p>I. Skjermingen er personlig og regnes aksje for aksje. Ubenyttet skjerming på én aksje kan ikke brukes mot "
      "utbytte på en annen.</p>"
      "<p>II. Når en aksje selges, følger selgerens ubenyttede skjerming med til kjøperen.</p>"
      "<p>Hvilke påstander er riktige?</p>",
    alternativer=[
        R("Bare I"),
        F("Bare II", "Påstand II er gal: skjermingen er personlig. Påstand I er riktig."),
        F("Både I og II", "Påstand II er gal. Selgeren bruker skjermingen mot sin egen gevinst. Kjøperen starter på sin "
                          "egen kostpris."),
        F("Ingen av dem", "Påstand I er riktig. Skjermingen regnes per aksje og per eier."),
    ],
    kort="<p><b>Bare I.</b> Skjermingen er personlig og aksjevis. Ved salg bruker selgeren sin ubenyttede skjerming mot "
         "gevinsten. Kjøperens grunnlag starter på kjøperens egen kostpris.</p>",
    full="<p><b>Aksjevis.</b> Skjermingsgrunnlaget beregnes for hver aksje: kostprisen for den aksjen pluss ubenyttet "
         "skjerming på den. Kjøper du to poster til ulik pris, har de hvert sitt grunnlag. Ubenyttet skjerming på den ene "
         "kan ikke trekkes fra utbytte på den andre.</p>"
         "<p><b>Personlig.</b> Skjermingen tilhører eieren. Selges aksjen, trekker selgeren sin framførte skjerming fra "
         "gevinsten. Det som eventuelt blir til overs fordi gevinsten er for liten, går tapt.</p>"
         "<p><b>Kjøperen.</b> Kjøperen får skjermingsfradrag for salgsåret hvis hun eier aksjen ved årsskiftet. Grunnlaget "
         "hennes er det hun betalte. Selgerens historikk følger ikke med.</p>"
         "<p><b>Kontroll med tall.</b> Lise kjøpte for 120 000 og har 4 800 i ubenyttet skjerming. Hun selger for "
         "150 000: gevinst 150 000 − 120 000 − 4 800 = 25 200. Kjøperens grunnlag er 150 000, ikke 124 800.</p>"
         "<p><b>Husk:</b> skjermingen er personlig og aksjevis. Den følger ikke aksjen til en ny eier.</p>",
)

statisk(
    "aks-s20", hjelp=HSA["aks-s20"], tema="aksjonar", type="fakta",
    q="<p>Jon kjøper en aksjepost i februar og selger den med gevinst i desember samme år, før årsskiftet. Selskapet betaler "
      "ikke utbytte. Hvilken skjerming kan Jon trekke fra gevinsten?</p>",
    alternativer=[
        R("Ingen, fordi han ikke eide aksjene ved noe årsskifte"),
        F("Skjerming for månedene fra februar til desember",
          "Skjermingen fordeles ikke på måneder. Den går til eieren ved årsskiftet."),
        F("Et helt års skjerming, fordi han eide aksjene mer enn halve året",
          "Eierperioden spiller ingen rolle. Det som teller, er hvem som eier 31. desember."),
        F("Skjerming beregnet av salgsprisen i stedet for kostprisen",
          "Grunnlaget er alltid kostpris pluss ubenyttet skjerming. Her finnes ingen skjerming i det hele tatt."),
    ],
    kort="<p><b>Ingen.</b> Skjermingsfradraget går til eieren ved utgangen av året. Jon har aldri eid aksjene ved et "
         "årsskifte, så han har ingen skjerming å trekke fra.</p>",
    full="<p><b>Regelen.</b> Skjermingsfradraget for et år tilordnes den som eier aksjen ved utgangen av året. Ubenyttet "
         "skjerming kan bare oppstå i år der du eier aksjen ved årsskiftet.</p>"
         "<p><b>Jons tilfelle.</b> Han kjøper i februar og selger i desember samme år. Han eier ikke aksjene 31. desember. "
         "Han får ikke årets fradrag. Han har heller ingen framført skjerming fra tidligere år.</p>"
         "<p><b>Gevinsten.</b> Skattepliktig gevinst er salgspris minus kostpris, uten fradrag for skjerming. Den skattlegges "
         "med 37,84 %.</p>"
         "<p><b>Kontroll med tall.</b> Kjøpt for 400 000, solgt for 460 000: gevinst 60 000, skatt 60 000 × 37,84 % = "
         "22 704. Hadde han beholdt aksjene over nyttår, ville han fått skjerming for året, men da som eier ved årsskiftet.</p>"
         "<p><b>Typisk felle.</b> Det er fristende å regne skjerming for månedene han eide aksjene. Skjermingen fordeles "
         "aldri på måneder.</p>"
         "<p><b>Husk:</b> ingen skjerming uten eierskap ved et årsskifte.</p>",
)

statisk(
    "aks-s21", hjelp=HSA["aks-s21"], tema="aksjonar", type="tolkning",
    q="<p>Mira har et skjermingsfradrag på kr 6 000 i år og ingen framført skjerming. Eierskatten er 37,84 %. Hvor mye lavere "
      "blir eierskatten med skjermingen enn uten, på et utbytte på kr 20 000 og på et utbytte på kr 50 000?</p>",
    alternativer=[
        R("kr 2 270,40 for begge utbyttene"),
        F("kr 2 270,40 og kr 5 676", "Skjermingen skalert som 30 % av utbyttet: 15 000 × 37,84 % = 5 676. Skjermingen er "
          "et fast fradrag, ikke en andel av utbyttet."),
        F("kr 7 568 og kr 18 920", "Det er skatten uten skjerming: 20 000 × 37,84 % og 50 000 × 37,84 %."),
        F("kr 6 000, som er selve fradraget, i begge tilfeller",
          "6 000 er fradraget i inntekten. Det sparer 6 000 × 37,84 % i skatt."),
    ],
    kort="<p><b>kr 2 270,40 for begge.</b> Skjermingen er et bunnfradrag i utbyttet: 6 000 × 37,84 % = 2 270,40, uansett "
         "hvor stort utbyttet er, så lenge det er større enn 6 000.</p>",
    full="<p><b>Et bunnfradrag, ikke en lavere sats.</b> Skjermingsfradraget trekkes fra utbyttet før skatten regnes. Skatten "
         "er null opp til fradraget og stiger deretter med 37,84 øre per krone. Avstanden til skatten uten skjerming er "
         "derfor den samme for alle utbytter over fradraget.</p>"
         "<p><b>Utbytte 20 000.</b> Med skjerming: (20 000 − 6 000) × 37,84 % = 5 297,60. Uten: 7 568. Forskjell 2 270,40.</p>"
         "<p><b>Utbytte 50 000.</b> Med skjerming: 44 000 × 37,84 % = 16 649,60. Uten: 18 920. Forskjell 2 270,40.</p>"
         "<p><b>Kontroll.</b> Forskjellen er 6 000 × 37,84 % = 2 270,40 i begge tilfeller. ✓ Er utbyttet under 6 000, for "
         "eksempel 4 000, sparer skjermingen bare 4 000 × 37,84 % = 1 513,60. Resten, 2 000, framføres.</p>"
         "<p><b>Hva det betyr.</b> Som andel av utbyttet betyr skjermingen mest for små utbytter. Eierskatten er derfor "
         "progressiv i utbyttet, slik et bunnfradrag gjør en flat skatt progressiv.</p>"
         "<p><b>Husk:</b> skjermingen sparer skjermingsfradrag × 37,84 %, et fast kronebeløp.</p>",
)

statisk(
    "aks-s22", hjelp=HSA["aks-s22"], tema="aksjonar", type="tolkning",
    q="<p>En gevinst etter skjerming på kr 80 000 gir kr 30 272 i skatt med oppjusteringsfaktor 1,72 og sats 22 %. Blant "
      "svaralternativene står også kr 17 600. Hvilken feil gir det tallet?</p>",
    alternativer=[
        R("Oppjusteringen er glemt"),
        F("Skjermingen er glemt", "Uten skjerming blir grunnlaget større. Da blir skatten høyere enn 30 272, ikke lavere."),
        F("Oppjusteringen er gjort to ganger", "Det gir 80 000 × 1,72 × 37,84 % = 52 068, langt over."),
        F("Skjermingen er trukket fra to ganger", "Det gir et lavere grunnlag, men skatten er fortsatt 37,84 % av det. "
          "Forholdet 17 600/30 272 = 1/1,72 passer bare med glemt oppjustering."),
    ],
    kort="<p><b>Oppjusteringen er glemt.</b> 80 000 × 22 % = 17 600. Et slikt svar er alltid 1/1,72 = 58 % av det riktige: "
         "17 600/30 272 = 0,581.</p>",
    full="<p><b>Oppjusteringsparet.</b> Den vanligste feilen i aksjonærmodellen er å bruke 22 % uten å gange med 1,72 først. "
         "Svaret blir da alltid 22/37,84 = 58,1 % av det riktige. Eksamen har nesten alltid med det tallet.</p>"
         "<p><b>Steg 1: riktig skatt.</b> 80 000 × 1,72 × 22 % = 80 000 × 37,84 % = 30 272.</p>"
         "<p><b>Steg 2: feilen.</b> 80 000 × 22 % = 17 600.</p>"
         "<p><b>Steg 3: forholdet.</b> 17 600/30 272 = 0,581 = 1/1,72.</p>"
         "<p><b>Kontroll mot de andre feilene.</b> Glemt skjerming gir et større grunnlag og en høyere skatt. Dobbel "
         "oppjustering gir 52 068. Skjerming trukket fra to ganger gir et lavere tall, men da er skatten fortsatt 37,84 % av "
         "grunnlaget, så forholdet blir ikke 1/1,72. Bare den glemte oppjusteringen gir nøyaktig 0,581. ✓</p>"
         "<p><b>Slik bruker du det.</b> Ser du to alternativer der det ene er knapt seks tideler av det andre, er det "
         "oppjusteringsparet. Det høyeste er som regel riktig. I H2025 oppgave 10 var paret 18,92 og 11,00.</p>"
         "<p><b>Husk:</b> et svar som er 58 % av et annet, har glemt faktoren 1,72.</p>",
)

statisk(
    "aks-s24", hjelp=HSA["aks-s24"], tema="aksjonar", type="paastand", rekkefolge="fast",
    q="<p>Et driftsselskap eies 100 % av Holding 1 AS, som eies 100 % av Holding 2 AS. Holding 2 AS eies av en person. "
      "Alt overskudd deles ut hele veien. Vurder de to påstandene med dagens regler.</p>"
      "<p>I. Samlet skatt på en krone overskudd som når personen, er 22 % + 78 % × 37,84 % = 51,52 %.</p>"
      "<p>II. Hvert holdingselskap betaler 22 % skatt av utbyttet det mottar.</p>"
      "<p>Hvilke påstander er riktige?</p>",
    alternativer=[
        R("Bare I"),
        F("Bare II", "Påstand II er gal: utbytte mellom selskaper er fritatt etter fritaksmetoden. Påstand I er riktig."),
        F("Både I og II", "Påstand II er gal. Hadde den stemt, ville samlet skatt blitt langt over 51,52 %."),
        F("Ingen av dem", "Påstand I er riktig. Med eierandel over 90 % gjelder heller ikke treprosentregelen."),
    ],
    kort="<p><b>Bare I.</b> Fritaksmetoden gjør mellomleddene skattefrie. Over 90 % gjelder ikke treprosentregelen. Samlet "
         "skatt er 51,52 %, uansett antall ledd.</p>",
    full="<p><b>Fritaksmetoden i en kjede.</b> Utbytte mellom aksjeselskaper er skattefritt. Treprosentregelen gjelder ikke "
         "når mottakeren eier mer enn 90 % av aksjene og stemmene. I en kjede med 100 % eierskap er mellomleddene derfor "
         "helt gjennomsiktige.</p>"
         "<p><b>Påstand I.</b> Driftsselskapet betaler 22 øre. 78 øre går skattefritt gjennom begge holdingselskapene. "
         "Personen betaler 78 × 37,84 % = 29,52 øre. Samlet 51,52 %. Riktig.</p>"
         "<p><b>Påstand II.</b> Holdingselskapene betaler ingen skatt på utbyttet. Påstanden er gal.</p>"
         "<p><b>Kontroll.</b> Hadde påstand II stemt, ville skatten blitt 22 % + 78 % × 22 % = 39,16 % etter første "
         "holdingselskap, 52,54 % etter det andre og 70,50 % etter eierskatten. Det er kjedebeskatningen fritaksmetoden skal "
         "hindre.</p>"
         "<p><b>Hva holdingselskapene endrer.</b> Ikke hvor mye som betales, bare når. Eierskatten utløses først når "
         "pengene går til personen.</p>"
         "<p><b>Husk:</b> selskapsskatt én gang, eierskatt én gang. 51,52 % uansett antall ledd.</p>",
)

statisk(
    "aks-s25", hjelp=HSA["aks-s25"], tema="aksjonar", type="fakta",
    q="<p>Linnea eier alle aksjene i sitt eget aksjeselskap og skyter inn kr 200 000 i ny egenkapital. Hva skjer med "
      "skjermingsgrunnlaget for aksjene hennes?</p>",
    alternativer=[
        R("Det øker med innskuddet, kr 200 000"),
        F("Det er uendret, fordi grunnlaget ble fastsatt da hun kjøpte aksjene",
          "Innskutt egenkapital øker inngangsverdien og dermed grunnlaget."),
        F("Det øker med kr 200 000 × 1,72, fordi innskutt kapital oppjusteres",
          "Oppjusteringen gjelder skattepliktig utbytte og gevinst, ikke grunnlaget."),
        F("Det faller, fordi selskapets egenkapital per aksje blir lavere",
          "Egenkapitalen øker. Grunnlaget følger det eieren har skutt inn."),
    ],
    kort="<p><b>Det øker med kr 200 000.</b> Grunnlaget bygger på det eieren har skutt inn. Ny egenkapital øker det, "
         "nedskrevet og tilbakebetalt egenkapital senker det.</p>",
    full="<p><b>Hva grunnlaget er.</b> Skjermingsgrunnlaget er aksjens inngangsverdi pluss ubenyttet skjerming. "
         "Inngangsverdien er det eieren har betalt for aksjen, inkludert senere innskudd av egenkapital.</p>"
         "<p><b>Innskudd.</b> Skyter Linnea inn 200 000, har hun bundet 200 000 mer i selskapet. Skjermingen skal gjøre en "
         "risikofri avkastning på det hun har skutt inn, skattefri. Derfor øker grunnlaget med innskuddet.</p>"
         "<p><b>Nedskriving.</b> Skrives egenkapitalen ned og betales tilbake til eieren, faller grunnlaget tilsvarende. "
         "Tilbakebetalt innskudd er ikke utbytte. Det er eierens egne penger som kommer tilbake.</p>"
         "<p><b>Markedsverdien.</b> En kursoppgang endrer ikke grunnlaget. Det gjør bare innskudd, nedskriving og "
         "ubenyttet skjerming.</p>"
         "<p><b>Kontroll med tall.</b> Var grunnlaget 1 000 000, blir det 1 200 000. Med skjermingsrente 3,6 % øker fradraget "
         "fra 36 000 til 43 200, altså med 200 000 × 3,6 % = 7 200. ✓</p>"
         "<p><b>Husk:</b> grunnlaget følger innskutt kapital, aldri markedsverdien.</p>",
)

statisk(
    "aks-s26", hjelp=HSA["aks-s26"], tema="aksjonar", type="begrep",
    q="<p>Skjermingsrenten er snittet av 3-måneders statskasseveksel pluss 0,5 prosentpoeng, ganget med (1 − 22 %). Hvorfor "
      "ganges den med 0,78?</p>",
    alternativer=[
        R("Skjermingen er skattefri, så den tilsvarer en rente etter skatt"),
        F("For å gjøre plass til oppjusteringsfaktoren på 1,72",
          "Faktoren og skjermingsrenten har hver sin begrunnelse. De henger ikke sammen slik."),
        F("Fordi 22 % av overskuddet alt er betalt i selskapsskatt før utbyttet deles ut",
          "Selskapsskatten er grunnen til oppjusteringen, ikke til nedjusteringen av skjermingsrenten."),
        F("For å trekke fra inflasjonen, som er omtrent 22 % av renten",
          "Renten justeres for skatt, ikke for prisstigning."),
    ],
    kort="<p><b>Rente etter skatt.</b> Skjermingsfradraget er skattefritt. Det skal tilsvare det en risikofri plassering gir "
         "etter skatt. Renter skattlegges med 22 %.</p>",
    full="<p><b>Hva skjermingen skal tilsvare.</b> Skjermingen gjør en normal, risikofri avkastning skattefri. Alternativet "
         "for eieren er en risikofri plassering, som et bankinnskudd eller en statskasseveksel.</p>"
         "<p><b>Hvorfor etter skatt.</b> Renten på en slik plassering skattlegges med 22 %. Eieren sitter igjen med 78 % av "
         "den. Skjermingsfradraget skattlegges derimot ikke. Skulle det vært regnet med renten før skatt, ville aksjer fått "
         "en skattefri avkastning som var høyere enn det eieren kunne fått etter skatt i banken.</p>"
         "<p><b>Regnestykket.</b> For 2025: (4,1480 + 0,5) × 0,78 = 3,63, altså 3,6 %.</p>"
         "<p><b>Kontroll.</b> En investor med 100 000 i banken til 4,648 % får 4 648 i renter og 3 625 etter skatt. "
         "Skjermingen på 100 000 er 3 625, før avrunding. De to er like. ✓</p>"
         "<p><b>Husk:</b> skjermingsrenten er en risikofri rente etter skatt, fordi skjermingen selv er skattefri.</p>",
)

statisk(
    "aks-s27", hjelp=HSA["aks-s27"], tema="aksjonar", type="fakta",
    q="<p>En privatperson og et aksjeselskap taper hver kr 1 000 000 på en aksjepost i et norsk selskap. Begge har nok annen "
      "inntekt. Hva er tapsfradraget verdt for hver av dem med dagens regler?</p>",
    alternativer=[
        R("kr 378 400 for personen, kr 0 for selskapet"),
        F("kr 220 000 for personen, kr 0 for selskapet",
          "Tap for personlige aksjonærer oppjusteres som gevinster: 1 000 000 × 37,84 %."),
        F("kr 378 400 for personen, kr 220 000 for selskapet",
          "Under fritaksmetoden gir tap ikke fradrag for selskapet."),
        F("kr 0 for begge, fordi tap på aksjer aldri gir fradrag",
          "For personlige aksjonærer gir tap fradrag med 37,84 %."),
    ],
    kort="<p><b>kr 378 400 og kr 0.</b> Personen får fradrag med samme sats som gevinster: 1 000 000 × 37,84 %. Selskapet "
         "har fritak for gevinst og dermed ikke fradrag for tap.</p>",
    full="<p><b>Personlig aksjonær.</b> I aksjonærmodellen skattlegges gevinst og tap symmetrisk. Tapet oppjusteres med 1,72 og "
         "gir fradrag med 22 %: 1 000 000 × 1,72 × 22 % = 378 400.</p>"
         "<p><b>Selskapsaksjonær.</b> Etter fritaksmetoden er gevinst på aksjer skattefri. Motstykket står i samme "
         "bestemmelse: tap gir ikke fradrag. Fradraget er verdt 0.</p>"
         "<p><b>Hva det betyr.</b> Fritaksmetoden er ikke en fordel i alle tilfeller. For en investering som går dårlig, er "
         "personlig eie bedre: staten bærer 37,84 % av tapet. Selskapet bærer hele tapet selv.</p>"
         "<p><b>Hvorfor symmetrien.</b> Når gevinst er fritatt, ville fradrag for tap gitt selskapet bare nedside hos "
         "staten. Loven tar derfor både oppsiden og nedsiden ut av selskapets skatteregnskap.</p>"
         "<p><b>Kontroll.</b> Symmetri: en gevinst på 1 000 000 ville gitt personen 378 400 i skatt og selskapet 0. Tapet "
         "speiler gevinsten for begge. ✓</p>"
         "<p><b>Husk:</b> person: gevinst og tap med 37,84 %. Selskap: verken skatt på gevinst eller fradrag for tap.</p>",
)

statisk(
    "aks-s29", hjelp=HSA["aks-s29"], tema="aksjonar", type="begrep",
    q="<p>Bjerksund og Schjelderup kaller kombinasjonen av aksjonærmodellen og fritaksmetoden et «to-hodet troll». Hva er "
      "poenget?</p>",
    alternativer=[
        R("Sammen gir de eiere med holdingselskap en skattekreditt"),
        F("Sammen gjør de at utbytte skattlegges to ganger hos eieren",
          "Utbytte skattlegges én gang hos eieren. Det er selskapsskatten og eierskatten som er to ledd."),
        F("Sammen gir de lavere samlet skatt på utdelt overskudd enn på lønn, for alle aksjonærer",
          "Samlet skatt på utdelt overskudd er 51,52 %, høyere enn 47,4 % på lønn."),
        F("Sammen gjør de at tap på aksjer gir fradrag to steder",
          "Under fritaksmetoden gir tap ikke fradrag i selskapet."),
    ],
    kort="<p><b>En skattekreditt.</b> Fritaksmetoden lar kapitalen omplasseres uten skatt. Aksjonærmodellen lar eieren "
         "bestemme når eierskatten utløses. Sammen gir det et rentefritt lån fra staten.</p>",
    full="<p><b>De to hodene.</b> Fritaksmetoden lar et selskap selge aksjer og motta utbytte uten skatt. Aksjonærmodellen "
         "skattlegger eieren først når pengene tas ut. Sammen kan en eier med holdingselskap omplassere kapital så ofte hun "
         "vil uten at eierskatten utløses.</p>"
         "<p><b>Hva kreditten er verdt.</b> Utsatt skatt investeres for eierens regning. Med aksjer verdt 10 mill. og "
         "inngangsverdi 2 mill. er utsatt skatt 3 027 200. Dobles verdien før uttak, gir det 1 881 708 mer til eieren enn "
         "ved personlig eie.</p>"
         "<p><b>Hvem tjener mest.</b> Kreditten er størst for den som alt har et etablert selskap. Med 15 års horisont "
         "anslår Bjerksund og Schjelderup den til 0,36 kroner per krone i et nystartet selskap og 0,60 i et etablert.</p>"
         "<p><b>Kontroll.</b> Samlet sats ved uttak er fortsatt 51,52 %. Fordelen ligger i tidspunktet, ikke i satsen.</p>"
         "<p><b>Husk:</b> fritaksmetoden pluss aksjonærmodellen gir en skattekreditt, ikke en lavere sats.</p>",
)
