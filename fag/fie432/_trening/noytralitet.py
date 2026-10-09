# -*- coding: utf-8 -*-
"""Eksamenstrening, tema «noytralitet»: nøytralitet og bedriftens tilpasning (k9),
   progressivitet (k10) og skatt, risiko og implisitte skatter (k12). Kjernepensum kj6.

   Eksamen har testet F′(K) = r(1 − At)/(1 − t) og F′_G mot F′_E (H2025 oppgave 7)
   og implisitt skatt t* = (R − r)/R (H2024 oppgave 9). Domar–Musgrave er aldri
   prøvd, men har egen forelesning; den kommer her som regning og påstand.
"""
from trening_lib import *  # noqa: F401,F403


def p2(x):
    """Brøk til prosent med to desimaler: 0.0685 → «6,85 %»."""
    return pst(x, 2)


def pp(x, d=2):
    """Prosentpoeng: 0.018 → «1,80 prosentpoeng»."""
    return tall(x * 100, d) + NBSP + "prosentpoeng"


def rs(x):
    """Rente i prosent med én desimal når den trengs: 0.06 → «6 %», 0.055 → «5,5 %»."""
    v = x * 100
    return (tall(v, 0) if heltall(v) else tall(v, 1 if heltall(v * 10) else 2)) + NBSP + "%"


def ppa(x):
    """Prosentpoeng med én desimal, to når det trengs: 0.0165 → «1,65 prosentpoeng»."""
    return pp(x, 1 if heltall(x * 1000) else 2)


_BRUKT = {}


def unik(fam, *nokkel):
    """Avvis en variant som har nøyaktig de samme tallene som en tidligere variant i familien."""
    sett = _BRUKT.setdefault(fam, set())
    if nokkel in sett:
        raise Avvis("samme tall som en tidligere variant")
    sett.add(nokkel)


def resultat(x):
    return ("Overskudd " if x >= 0 else "Underskudd ") + kra(abs(x))


SELSKAP = ["Fjordlaks AS", "Brattli Bygg AS", "Nordvik Mekaniske AS", "Havbris Energi AS", "Tindefjell Hotell AS",
           "Solberg Logistikk AS", "Kystkraft AS", "Lysaker Data AS"]
NAVN = ["Kari", "Jonas", "Selma", "Aksel", "Ingrid", "Tobias", "Nora", "Elias", "Mira", "Henrik"]


# ---------------------------------------------------------------------------
# noy-foc1 · Avkastningskravet F′(K) = r(1 − At)/(1 − t) med tall
# ---------------------------------------------------------------------------
@familie("noy-foc1", tema="noytralitet", antall=5, tittel="Avkastningskravet med delvis rentefradrag")
def _(r):
    rr = r.choice([0.04, 0.045, 0.05, 0.055, 0.06, 0.07, 0.08])
    A = r.choice([0.2, 0.25, 0.4, 0.5, 0.6, 0.75, 0.8])
    t = r.choice([0.22, 0.22, 0.22, 0.25, 0.30])
    sel = r.choice(SELSKAP)
    riktig = rr * (1 - A * t) / (1 - t)
    f_a = rr * A / (1 - t)
    f_b = rr / ((1 - t) * A)
    tredje = r.choice(["ingen", "byttet", "glemt"])
    if tredje == "ingen":
        f3 = F(p2(rr / (1 - t)), f"Fradragsandelen overset, som om ingen renter kunne trekkes fra: r/(1 − t) = "
                                 f"{rs(rr)}/{tall(1 - t, 2)}. Det er kravet når A = 0.", rr / (1 - t))
    elif tredje == "byttet":
        v = rr * (1 - t) / (1 - A * t)
        f3 = F(p2(v), f"Teller og nevner byttet: r(1 − t)/(1 − At) = {rs(rr)} × {tall(1 - t, 2)}/"
                      f"{tall(1 - A * t, 3)}. Det gir et krav under renten, som ingen ufullstendig fradragsrett kan "
                      f"gi.", v)
    else:
        v = rr * (1 - A * t)
        f3 = F(p2(v), f"Glemt å dele på (1 − t): r(1 − At) = {rs(rr)} × {tall(1 - A * t, 3)} er rentekostnaden "
                      f"etter skatt, ikke kravet til marginalproduktet før skatt.", v)
    alt = [R(p2(riktig), riktig),
           F(p2(f_a), f"rA/(1 − t) = {rs(rr)} × {tall(A, 2)}/{tall(1 - t, 2)}: grensene snudd. Uttrykket gir "
                      f"r/(1 − t) ved full fradragsrett, der kravet skal være r"
                      + (". Her gir det dessuten et krav under renten, som ingen ufullstendig fradragsrett kan gi."
                         if f_a < rr else ". Når fradraget er borte, gir det null krav."),
             f_a),
           F(p2(f_b), f"r/[(1 − t)A] = {rs(rr)}/({tall(1 - t, 2)} × {tall(A, 2)}): gir r/(1 − t) ved full "
                      f"fradragsrett, der kravet skal være r.", f_b),
           f3]
    ulike(*[a.verdi for a in alt], rel=0.01)
    unik("foc1", rr, A, t)

    q = (f"<p>{sel} bruker kapital K og har inntekten F(K), med F′(K) &gt; 0 og F″(K) &lt; 0. Hele kapitalen er "
         f"lånt til renten r = {rs(rr)}. En rentebegrensningsregel gjør at bare {pst(A, 0)} av rentekostnaden kan "
         f"trekkes fra (A = {tall(A, 2)}). Overskuddsskatten er t = {pst(t, 0)}.</p>"
         f"<p>Hvilket marginalprodukt F′(K) må den siste kapitalkronen minst gi for at bedriften skal bruke den? "
         f"Rund av til to desimaler.</p>")
    kort = (f"<p><b>{p2(riktig)}.</b> F′(K) = r(1 − At)/(1 − t) = {rs(rr)} × (1 − {tall(A, 2)} × {tall(t, 2)})/"
            f"(1 − {tall(t, 2)}) = {rs(rr)} × {tall(1 - A * t, 3)}/{tall(1 - t, 2)}.</p>")
    hi, lo = rr / (1 - t), rr
    full_txt = (
        f"<p><b>Hva kravet er.</b> Bedriften bruker kapital så lenge den siste kronen gir mer enn den koster etter "
        f"skatt. Hele renten rK betales, men bare andelen A gir fradrag. Rentekostnaden står derfor to ganger i "
        f"verdien: V = F(K) − rK − t[F(K) − ArK].</p>"
        f"<p><b>Steg 1: deriver.</b> F′(K) − r − t[F′(K) − Ar] = 0 gir F′(K)(1 − t) = r(1 − At), altså "
        f"F′(K) = r(1 − At)/(1 − t).</p>"
        f"<p><b>Steg 2: sett inn.</b> 1 − At = 1 − {tall(A, 2)} × {tall(t, 2)} = {tall(1 - A * t, 3)} og 1 − t = "
        f"{tall(1 - t, 2)}. F′(K) = {rs(rr)} × {tall(1 - A * t, 3)}/{tall(1 - t, 2)} = <b>{p2(riktig)}</b>.</p>"
        f"<p><b>Kontroll: grensene.</b> A = 1 gir r = {p2(lo)}. A = 0 gir r/(1 − t) = {p2(hi)}. Uttrykket er "
        f"lineært i A, så kravet er {p2(hi)} − {tall(A, 2)} × ({p2(hi)} − {p2(lo)}) = {p2(riktig)} ✓. Det ligger "
        f"mellom grensene, som det må.</p>"
        f"<p><b>Husk:</b> sett A = 1 i hvert alternativ. Det riktige kollapser til r: en overskuddsskatt med fullt "
        f"fradrag for kapitalkostnaden er nøytral.</p>"
    )
    return sporsmal(q, alt, kort, full_txt)


# ---------------------------------------------------------------------------
# noy-ge1 · Kravet til gjeldsfinansiert og egenkapitalfinansiert kapital
# ---------------------------------------------------------------------------
def _ge_krav(r):
    rr = r.choice([0.04, 0.045, 0.05, 0.055, 0.06, 0.065, 0.07])
    t = r.choice([0.22, 0.22, 0.25, 0.30])
    sel = r.choice(SELSKAP)
    spor = r.choice(["E", "E", "G"])
    oppsett = (f"<p>{sel} kan finansiere den neste kapitalkronen med gjeld eller med egenkapital. Gjeldsrenten er "
               f"{rs(rr)} og gir fullt fradrag. Egenkapitalen har samme alternativkostnad, {rs(rr)}, fordi eierne "
               f"kunne plassert pengene til den renten et annet sted. Den kostnaden er ingen utbetaling og gir ikke "
               f"fradrag. Skattesatsen er {pst(t, 0)}.</p>")
    E_, G_ = rr / (1 - t), rr
    if spor == "E":
        q = oppsett + ("<p>Hvilket marginalprodukt før skatt må en egenkapitalfinansiert krone minst gi? Rund av til "
                       "to desimaler.</p>")
        riktig = E_
        alt = [R(p2(E_), E_),
               F(p2(G_), "Dette er kravet for gjeld, F′<sub>G</sub> = r. Egenkapitalens alternativkostnad gir ikke "
                         "fradrag, så kravet må være høyere.", G_),
               F(p2(rr * (1 - t)), f"r(1 − t) = {rs(rr)} × {tall(1 - t, 2)} er renten etter skatt. Et marginalprodukt "
                                   f"før skatt skal ikke sammenlignes med et tall etter skatt.", rr * (1 - t)),
               F(p2(rr * (1 + t)), f"r(1 + t) = {rs(rr)} × {tall(1 + t, 2)} legger skatten på renten. Riktig er å dele "
                                   f"på 1 − t: inntekten må tåle skatten og likevel dekke r.", rr * (1 + t))]
        kort = f"<p><b>{p2(E_)}.</b> F′<sub>E</sub> = r/(1 − t) = {rs(rr)}/{tall(1 - t, 2)}.</p>"
        steg = (f"<p><b>Steg 1: egenkapitalkronen.</b> Inntekten F′<sub>E</sub> skattlegges med {pst(t, 0)}, men "
                f"alternativkostnaden {rs(rr)} gir ikke fradrag. Etter skatt må F′<sub>E</sub>(1 − t) dekke r: "
                f"F′<sub>E</sub> = {rs(rr)}/{tall(1 - t, 2)} = <b>{p2(E_)}</b>.</p>"
                f"<p><b>Steg 2: sammenlign med gjeld.</b> For gjeld gir både inntekten og renten skatt med t, så de "
                f"to t-ene stryker hverandre: F′<sub>G</sub> = r = {p2(G_)}.</p>")
    else:
        q = oppsett + ("<p>Hvilket marginalprodukt før skatt må en gjeldsfinansiert krone minst gi? Rund av til to "
                       "desimaler.</p>")
        riktig = G_
        alt = [R(p2(G_), G_),
               F(p2(rr * (1 - t)), f"r(1 − t) = {rs(rr)} × {tall(1 - t, 2)} er gjeldens kostnad etter skatt. Kravet "
                                   f"gjelder marginalproduktet før skatt, som også skattlegges.", rr * (1 - t)),
               F(p2(E_), f"r/(1 − t) = {rs(rr)}/{tall(1 - t, 2)} er kravet for egenkapital, der kostnaden ikke gir "
                         f"fradrag.", E_),
               F(p2(rr * (1 + t)), f"r(1 + t) legger skatten oppå renten. For gjeld stryker skatten på inntekten og "
                                   f"fradraget for renten hverandre.", rr * (1 + t))]
        kort = (f"<p><b>{p2(G_)}.</b> F′<sub>G</sub> = r. Inntekten skattlegges med t og renten gir fradrag med t, "
                f"så skatten stryker seg selv.</p>")
        steg = (f"<p><b>Steg 1: gjeldskronen.</b> Overskuddet etter skatt er (F′<sub>G</sub> − r)(1 − t). Det er "
                f"positivt nøyaktig når F′<sub>G</sub> &gt; r, så kravet er F′<sub>G</sub> = <b>{p2(G_)}</b>.</p>"
                f"<p><b>Steg 2: sammenlign med egenkapital.</b> F′<sub>E</sub> = r/(1 − t) = {rs(rr)}/"
                f"{tall(1 - t, 2)} = {p2(E_)}, fordi alternativkostnaden ikke gir fradrag.</p>")
    ulike(*[a.verdi for a in alt], rel=0.005)
    unik("ge1", rr, t, spor)
    full_txt = (
        f"<p><b>Hvorfor gjeld og egenkapital har ulikt krav.</b> Begge koster {rs(rr)}: gjelden i renter, "
        f"egenkapitalen i avkastningen eierne gir opp. Men bare renten er en utbetaling som gir fradrag. Det er en "
        f"skatteregel, ikke en finansiell lov.</p>"
        + steg
        + f"<p><b>Kontroll.</b> En krone som gir nøyaktig {p2(E_)}, gir etter skatt {p2(E_)} × {tall(1 - t, 2)} = "
          f"{p2(E_ * (1 - t))}, akkurat alternativkostnaden ✓. Med egenkapital er kravet {p2(E_ - G_)} høyere, så "
          f"bedriften bruker mindre egenkapitalfinansiert kapital: E* &lt; G*.</p>"
          f"<p><b>Husk:</b> F′<sub>G</sub> = r og F′<sub>E</sub> = r/(1 − t). Et tall etter skatt hører ikke hjemme i "
          f"et krav til marginalproduktet før skatt.</p>"
    )
    return sporsmal(q, alt, kort, full_txt)


# ---------------------------------------------------------------------------
# noy-ge2 · Samme prosjekt med gjeld og med egenkapital
# ---------------------------------------------------------------------------
def _ge_prosjekt(r):
    I = r.choice([1_000_000, 2_000_000, 2_500_000, 3_000_000, 4_000_000])
    rr = r.choice([0.04, 0.05, 0.06])
    t = 0.22
    avk = rr + r.choice([0.005, 0.01, 0.015, 0.02, 0.03])     # avkastning før renter og skatt
    Y = I * avk
    if not heltall(Y * (1 - t)) or not heltall(rr * I):
        raise Avvis("ujevne beløp")
    fin = r.choice(["gjeld", "egenkapital", "egenkapital"])
    sel = r.choice(SELSKAP)
    rI = rr * I
    res_g = (Y - rI) * (1 - t)
    res_e = Y * (1 - t) - rI
    if fin == "egenkapital":
        riktig = res_e
        alt = [R(resultat(res_e), res_e),
               F(resultat(res_g), f"Alternativkostnaden behandlet som fradragsberettiget rente: ({tall(Y)} − {tall(rI)}) "
                                  f"× {tall(1 - t, 2)}. Det er resultatet med gjeld.", res_g),
               F(resultat(Y - rI), f"Skatten glemt: {tall(Y)} − {tall(rI)}.", Y - rI),
               F(resultat(Y * (1 - t)), f"Alternativkostnaden glemt: {tall(Y)} × {tall(1 - t, 2)}. Eierne kunne fått "
                                        f"{tall(rI)} et annet sted.", Y * (1 - t))]
        steg = (f"<p><b>Steg 1: skatten.</b> Egenkapitalens kostnad gir ikke fradrag, så hele inntekten skattlegges: "
                f"{tall(Y)} × 22 % = {tall(Y * t)}. Etter skatt: {tall(Y * (1 - t))}.</p>"
                f"<p><b>Steg 2: alternativkostnaden.</b> {tall(I)} × {rs(rr)} = {tall(rI)}. Resultatet er "
                f"{tall(Y * (1 - t))} − {tall(rI)} = <b>{tall(res_e)}</b>.</p>")
        kort = (f"<p><b>{resultat(res_e)}.</b> {tall(Y)} × 0,78 − {tall(rI)} = {tall(res_e)}. Alternativkostnaden "
                f"trekkes fra etter skatt, fordi den ikke gir fradrag.</p>")
    else:
        riktig = res_g
        alt = [R(resultat(res_g), res_g),
               F(resultat(res_e), f"Renten behandlet som om den ikke ga fradrag: {tall(Y)} × {tall(1 - t, 2)} − "
                                  f"{tall(rI)}. Det er resultatet med egenkapital.", res_e),
               F(resultat(Y - rI), f"Skatten glemt: {tall(Y)} − {tall(rI)}.", Y - rI),
               F(resultat((Y - rI) * t), f"Dette er skatten, ({tall(Y)} − {tall(rI)}) × 22 %, ikke resultatet etter "
                                         f"skatt.", (Y - rI) * t)]
        steg = (f"<p><b>Steg 1: renten.</b> {tall(I)} × {rs(rr)} = {tall(rI)}, fullt fradragsberettiget.</p>"
                f"<p><b>Steg 2: skatten.</b> Grunnlaget er {tall(Y)} − {tall(rI)} = {tall(Y - rI)}. Skatten er "
                f"{tall(Y - rI)} × 22 % = {tall((Y - rI) * t)}. Resultatet er {tall(Y - rI)} − {tall((Y - rI) * t)} "
                f"= <b>{tall(res_g)}</b>.</p>")
        kort = (f"<p><b>{resultat(res_g)}.</b> ({tall(Y)} − {tall(rI)}) × 0,78 = {tall(res_g)}. Renten gir fradrag, "
                f"så bare overskuddet over renten skattlegges.</p>")
    ulike(*[a.verdi for a in alt], rel=0.01)
    if abs(riktig) < 1:
        raise Avvis("null resultat")
    unik("ge2", I, rr, avk, fin)

    q = (f"<p>{sel} vurderer et prosjekt som binder {kr(I)} og gir {kr(Y)} i året før renter og skatt. Renten er "
         f"{rs(rr)}. Finansieres prosjektet med gjeld, gir renten fullt fradrag. Finansieres det med egenkapital, "
         f"har eierne samme alternativkostnad, {rs(rr)}, men den gir ikke fradrag. Skattesatsen er 22 %.</p>"
         f"<p>Prosjektet finansieres fullt med {fin}. Hva blir det årlige resultatet etter skatt og etter "
         f"{'rentekostnaden' if fin == 'gjeld' else 'alternativkostnaden'}?</p>")
    full_txt = (
        f"<p><b>Hva som skiller de to.</b> Gjeld og egenkapital har samme kostnad før skatt, {rs(rr)}. Men renten er "
        f"en utbetaling som trekkes fra før skatten regnes. Egenkapitalens alternativkostnad er det ikke. Derfor "
        f"skattlegges hele inntekten når prosjektet finansieres med egenkapital.</p>"
        + steg
        + f"<p><b>Kontroll med kravene.</b> Prosjektet gir {tall(Y)}/{tall(I)} = {p2(avk)} før skatt. Kravet for gjeld "
          f"er r = {p2(rr)} og for egenkapital r/(1 − t) = {p2(rr / (1 - t))}. Med gjeld blir resultatet "
          f"{resultat(res_g).lower()}. Med egenkapital blir det {resultat(res_e).lower()}. Fortegnene stemmer med "
          f"hvilket krav {p2(avk)} klarer ✓.</p>"
          f"<p><b>Husk:</b> med gjeld (Y − rI)(1 − t), med egenkapital Y(1 − t) − rI.</p>"
    )
    return sporsmal(q, alt, kort, full_txt)


# ---------------------------------------------------------------------------
# noy-imp1 · Implisitt skatt t* = (R − r)/R og likevekten r = R(1 − t)
# ---------------------------------------------------------------------------
PAR = [("to statsobligasjoner med samme risiko", "obligasjonen med skattefrie renter",
        "den fullt skattlagte obligasjonen"),
       ("to kommuneobligasjoner med samme risiko", "den skattefrie obligasjonen", "den skattlagte obligasjonen"),
       ("to like risikable næringer", "næringen som er fritatt for skatt", "den skattlagte næringen"),
       ("to fond med samme risiko", "fondet med skattefri avkastning", "fondet med skattlagt avkastning")]


def _imp_sats(r):
    R_ = r.choice([0.06, 0.075, 0.08, 0.09, 0.10, 0.12])
    ts = r.choice([0.20, 0.22, 0.25, 0.28, 0.30, 0.35, 0.40])
    rr = R_ * (1 - ts)
    if not heltall(rr * 10000):
        raise Avvis("ujevn rente")
    hva, fri, skatt = r.choice(PAR)
    spor = r.choice(["t", "t", "r"])
    if spor == "t":
        q = (f"<p>Et velfungerende marked i likevekt har {hva}. {skatt[0].upper() + skatt[1:]} gir R = {rs(R_)} før "
             f"skatt. {fri[0].upper() + fri[1:]} gir r = {rs(rr)}.</p>"
             f"<p>Hva er den implisitte skattesatsen på {fri}?</p>")
        riktig = ts
        alt = [R(pst(ts, 1), ts),
               F(pst((R_ - rr) / rr, 1), f"Feil nevner: (R − r)/r = ({rs(R_)} − {rs(rr)})/{rs(rr)}. En skattesats "
                                         f"måles mot avkastningen før skatt, R.", (R_ - rr) / rr),
               F(ppa(R_ - rr), f"R − r = {ppa(R_ - rr)} er en differanse, ikke en sats. Den må deles på R.",
                 (R_ - rr) * 1.0001),
               F(pst(rr / R_, 1), f"r/R = {rs(rr)}/{rs(R_)} er andelen som er igjen. Den implisitte skatten er "
                                  f"1 − r/R.", rr / R_)]
        kort = (f"<p><b>{pst(ts, 1)}.</b> t* = (R − r)/R = ({rs(R_)} − {rs(rr)})/{rs(R_)} = {ppa(R_ - rr)}/"
                f"{rs(R_)}.</p>")
        steg = (f"<p><b>Steg 1: likevekten.</b> Like risikable aktiva gir samme avkastning etter skatt for den "
                f"marginale investoren: r = R(1 − t*).</p>"
                f"<p><b>Steg 2: løs for t*.</b> t* = 1 − r/R = (R − r)/R = ({rs(R_)} − {rs(rr)})/{rs(R_)} = "
                f"<b>{pst(ts, 1)}</b>.</p>")
        kontroll = (f"{rs(R_)} × (1 − {pst(ts, 1)}) = {rs(rr)}, akkurat det det skattefrie gir ✓")
    else:
        q = (f"<p>Et velfungerende marked i likevekt har {hva}. {skatt[0].upper() + skatt[1:]} gir R = {rs(R_)} før "
             f"skatt og skattlegges med {pst(ts, 0)} hos den marginale investoren.</p>"
             f"<p>Hvilken avkastning før skatt gir {fri}?</p>")
        riktig = rr
        alt = [R(p2(rr), rr),
               F(p2(R_ / (1 + ts)), f"Delt på 1 + t i stedet for å gange med 1 − t: {rs(R_)}/{tall(1 + ts, 2)}.",
                 R_ / (1 + ts)),
               F(p2(R_ / (1 - ts)), f"Feil retning: {rs(R_)}/{tall(1 - ts, 2)} er høyere enn R. Det skattefrie bys opp "
                                    f"i pris, så avkastningen faller.", R_ / (1 - ts)),
               F(p2(R_), "Samme avkastning før skatt ville gitt det skattefrie mer etter skatt. Da kjøper alle det. "
                         "Prisen stiger til fordelen er borte.", R_)]
        kort = (f"<p><b>{p2(rr)}.</b> I likevekt gir begge det samme etter skatt: r = R(1 − t) = {rs(R_)} × "
                f"{tall(1 - ts, 2)}.</p>")
        steg = (f"<p><b>Steg 1: likevekten.</b> Like risikable aktiva gir samme avkastning etter skatt: "
                f"r = R(1 − t).</p>"
                f"<p><b>Steg 2: sett inn.</b> r = {rs(R_)} × (1 − {pst(ts, 0)}) = <b>{p2(rr)}</b>.</p>")
        kontroll = f"den implisitte skatten (R − r)/R = ({rs(R_)} − {rs(rr)})/{rs(R_)} = {pst(ts, 1)} ✓"
    ulike(*[a.verdi for a in alt], rel=0.005)
    unik("imp1", R_, ts, spor)
    full_txt = (
        f"<p><b>Hva implisitt skatt er.</b> Et skattefritt aktivum er mer attraktivt enn et skattlagt med samme risiko. "
        f"Alle vil ha det. Prisen bys opp. Da faller avkastningen før skatt. Fallet er den implisitte skatten. "
        f"Ingen krever den inn, men eieren bærer den likevel.</p>"
        + steg
        + f"<p><b>Kontroll.</b> {kontroll[0].upper() + kontroll[1:]}.</p>"
          f"<p><b>Hvem som bør eie det skattefrie.</b> Investorer med marginalskatt over {pst(ts, 0)} tjener på det "
          f"skattefrie. Investorer med lavere sats, for eksempel stiftelser uten skatt, tjener på det skattlagte.</p>"
          f"<p><b>Husk:</b> r = R(1 − t) og t* = (R − r)/R. Nevneren er R, fordi en sats måles mot avkastningen før "
          f"skatt.</p>"
    )
    return sporsmal(q, alt, kort, full_txt)


# ---------------------------------------------------------------------------
# noy-valg1 · Valgregelen: egen marginalskatt mot den implisitte satsen
# ---------------------------------------------------------------------------
def _imp_valg(r):
    R_ = r.choice([0.06, 0.08, 0.09, 0.10, 0.12])
    ts = r.choice([0.20, 0.22, 0.25, 0.28, 0.30])
    rr = R_ * (1 - ts)
    if not heltall(rr * 10000):
        raise Avvis("ujevn rente")
    m = r.choice([0.0, 0.15, 0.22, 0.30, 0.35, 0.40, 0.45])
    if abs(m - ts) < 0.03:
        raise Avvis("for nær den implisitte satsen")
    navn = r.choice(NAVN)
    etter_skattlagt = R_ * (1 - m)
    if m > ts:
        valg, annet = "den skattefrie", "den skattlagte"
        g = rr - etter_skattlagt
    else:
        valg, annet = "den skattlagte", "den skattefrie"
        g = etter_skattlagt - rr
    feil_for = R_ - rr
    feil_begge = (R_ - rr) * (1 - m)
    if min(abs(g - feil_for), abs(g - feil_begge), abs(feil_for - feil_begge)) < 0.0002:
        raise Avvis("for like gevinster")
    unik("valg1", R_, ts)
    alt = [R(f"{valg[0].upper() + valg[1:]}, som gir {pp(g)} mer etter skatt"),
           F(f"{annet[0].upper() + annet[1:]}, som gir {pp(g)} mer etter skatt",
             f"Valgregelen snudd. Med marginalskatt {pst(m, 0)} mot den implisitte satsen {pst(ts, 0)} skal "
             f"{navn} eie {valg}."),
           F(f"Den skattlagte, som gir {pp(feil_for)} mer etter skatt",
             f"Sammenlignet før skatt: {rs(R_)} − {rs(rr)}. {navn} betaler skatt på det skattlagte, så det er "
             f"avkastningen etter skatt som teller."),
           F(f"Den skattlagte, som gir {pp(feil_begge)} mer etter skatt",
             f"Skatten trukket fra begge: ({rs(R_)} − {rs(rr)}) × {tall(1 - m, 2)}. Det skattefrie betaler ingen "
             f"eksplisitt skatt.")]
    q = (f"<p>To obligasjoner har samme risiko. Den skattlagte gir R = {rs(R_)} før skatt. Den skattefrie gir "
         f"r = {rs(rr)}. "
         f"Markedet er i likevekt. {navn} har en marginalskatt på {pst(m, 0)} på renteinntekter.</p>"
         f"<p>Hvilken obligasjon bør {navn} eie? Hvor mye mer gir den per år, målt i avkastning etter skatt?</p>")
    kort = (f"<p><b>{valg[0].upper() + valg[1:]}, {pp(g)}.</b> Den implisitte satsen er ({rs(R_)} − {rs(rr)})/"
            f"{rs(R_)} = {pst(ts, 0)}. {navn} har {'høyere' if m > ts else 'lavere'} marginalskatt. Det skattlagte gir "
            f"{rs(R_)} × {tall(1 - m, 2)} = {p2(etter_skattlagt)} mot {rs(rr)}.</p>")
    full_txt = (
        f"<p><b>Valgregelen.</b> Den implisitte satsen er markedets sats, satt av den marginale investoren. Har du "
        f"høyere marginalskatt enn den, tjener du på det skattefrie. Har du lavere, tjener du på det skattlagte.</p>"
        f"<p><b>Steg 1: den implisitte satsen.</b> t* = (R − r)/R = ({rs(R_)} − {rs(rr)})/{rs(R_)} = {pst(ts, 0)}.</p>"
        f"<p><b>Steg 2: sammenlign med egen sats.</b> {navn} har {pst(m, 0)}, som er "
        f"{'høyere' if m > ts else 'lavere'} enn {pst(ts, 0)}. Hun bør derfor eie {valg}.</p>"
        f"<p><b>Steg 3: gevinsten.</b> Det skattlagte gir etter skatt {rs(R_)} × (1 − {pst(m, 0)}) = "
        f"{p2(etter_skattlagt)}. Det skattefrie gir {p2(rr)}. Forskjellen er <b>{pp(g)}</b>.</p>"
        f"<p><b>Kontroll via satsene.</b> Gevinsten er |egen sats − t*| × R = |{pst(m, 0)} − {pst(ts, 0)}| × "
        f"{rs(R_)} = {pp(abs(m - ts) * R_)} ✓.</p>"
        f"<p><b>Hvorfor markedet har én implisitt sats.</b> Prisen på det skattefrie settes av investoren som akkurat er likegyldig. Alle med høyere marginalskatt enn henne vil ha det skattefrie. Alle med lavere vil ha det skattlagte.</p>"
        f"<p><b>Husk:</b> det skattefrie passer for den med marginalskatt over t*. For alle andre er fordelen alt "
        f"spist opp av prisen.</p>"
    ).replace("Hun bør", f"{navn} bør")
    return sporsmal(q, alt, kort, full_txt)


# ---------------------------------------------------------------------------
# noy-arb1 · Skattearbitrasje: låne med fradrag, plassere skattefritt
# ---------------------------------------------------------------------------
@familie("noy-arb1", tema="noytralitet", antall=5, tittel="Skattearbitrasje")
def _(r):
    L = r.choice([500_000, 1_000_000, 1_500_000, 2_000_000, 2_500_000, 3_000_000])
    rr = r.choice([0.04, 0.045, 0.05, 0.055, 0.06])
    navn = r.choice(NAVN)
    rL = rr * L
    spor = r.choice(["gevinst", "gevinst", "likevekt"])
    oppsett = (f"<p>{navn} låner {kr(L)} til {rs(rr)} og plasserer hele beløpet i et papir med samme risiko som lånet, "
               f"også til {rs(rr)}. Rentene på lånet gir fradrag i alminnelig inntekt med 22 %. Avkastningen på "
               f"papiret er skattefri.</p>")
    if spor == "gevinst":
        q = oppsett + ("<p>Prisen på papiret har ennå ikke tilpasset seg. Hva er den årlige gevinsten etter skatt av "
                       "posisjonen?</p>")
        riktig = rL * 0.22
        kand = [F(kra(rL * 0.474), f"Marginalskatten på lønn brukt som fradragsverdi: {tall(rL)} × 47,4 %. Et "
                                   f"rentefradrag er verdt 22 øre per krone uansett marginalskatt.", rL * 0.474),
                F(kra(rL), f"Hele renten {tall(rL)} regnet som gevinst. Rentekostnaden må betales. Bare fradraget på "
                           f"22 % er gevinsten.", rL),
                F(kra(0), "Null gjelder når avkastningen også skattlegges med 22 %, eller når prisen på papiret har "
                          "tilpasset seg. Her har den ikke det.", 0),
                F(kra(rL * 0.78), f"Rentekostnaden etter skatt, {tall(rL)} × 0,78. Gevinsten er det papiret gir minus "
                                  f"denne kostnaden.", rL * 0.78)]
        r.shuffle(kand)
        alt = [R(kra(riktig), riktig)] + kand[:3]
        kort = (f"<p><b>{kra(riktig)}.</b> Papiret gir {tall(rL)} skattefritt. Lånet koster {tall(rL)} × 0,78 = "
                f"{tall(rL * 0.78)} etter fradraget. Gevinsten er {tall(rL)} × 22 %.</p>")
        steg = (f"<p><b>Steg 1: rentekostnaden etter fradrag.</b> {tall(L)} × {rs(rr)} = {tall(rL)}. Fradraget er "
                f"verdt {tall(rL)} × 22 % = {tall(rL * 0.22)}, så kostnaden etter skatt er {tall(rL * 0.78)}.</p>"
                f"<p><b>Steg 2: avkastningen.</b> Papiret gir {tall(rL)} uten skatt.</p>"
                f"<p><b>Steg 3: gevinsten.</b> {tall(rL)} − {tall(rL * 0.78)} = <b>{kra(riktig)}</b>, uten egen kapital "
                f"og uten risiko.</p>")
        kontroll = (f"Formelen r × L × (t<sub>fradrag</sub> − t<sub>avkastning</sub>) = {tall(rL)} × (22 % − 0 %) = "
                    f"{tall(riktig)} ✓.")
    else:
        q = oppsett + ("<p>Markedet er velfungerende. Alle kan gjøre det samme. Hvilken avkastning før skatt vil "
                       "papiret gi når prisen har tilpasset seg?</p>")
        riktig = rr * 0.78
        alt = [R(p2(riktig), riktig),
               F(p2(rr), "Uendret avkastning ville gitt alle en gratis gevinst. Da kjøper alle papiret. Prisen "
                         "stiger til gevinsten er borte.", rr),
               F(p2(rr * 0.22), f"{rs(rr)} × 22 % er skattebesparelsen per krone, ikke avkastningen papiret faller "
                                f"til.", rr * 0.22),
               F(p2(rr / 0.78), f"Feil retning: {rs(rr)}/0,78 er høyere enn renten. Det skattefrie papiret bys opp i "
                                f"pris, så avkastningen faller.", rr / 0.78)]
        kort = (f"<p><b>{p2(riktig)}.</b> Avkastningen faller til den er lik lånerenten etter skatt: {rs(rr)} × 0,78. "
                f"Da er arbitrasjegevinsten null.</p>")
        steg = (f"<p><b>Steg 1: hva som skjer.</b> Alle vil låne og kjøpe papiret. Prisen på papiret stiger. Da "
                f"faller avkastningen.</p>"
                f"<p><b>Steg 2: hvor det stopper.</b> Gevinsten forsvinner når papiret gir det samme som lånet koster "
                f"etter skatt: {rs(rr)} × (1 − 22 %) = <b>{p2(riktig)}</b>.</p>")
        kontroll = (f"Med {p2(riktig)} gir papiret {tall(L)} × {p2(riktig)} = {tall(L * riktig)} skattefritt, mot "
                    f"{tall(rL * 0.78)} i rente etter fradrag. Netto 0 ✓. Fallet fra {rs(rr)} til {p2(riktig)} er en "
                    f"implisitt skatt på 22 %.")
    ulike(*[a.verdi for a in alt], rel=0.005)
    unik("arb1", rr, spor)
    full_txt = (
        f"<p><b>Hva skattearbitrasje er.</b> To sider av samme transaksjon skattlegges ulikt. Du låner der renten gir "
        f"fradrag og plasserer der avkastningen er skattefri. Posisjonen krever ingen egen kapital og har ingen "
        f"risiko, men gir likevel penger etter skatt. Det er et nøytralitetsbrudd.</p>"
        + steg
        + f"<p><b>Kontroll.</b> {kontroll}</p>"
          f"<p><b>Husk:</b> gevinsten er r × L × satsdifferansen. Lik sats på renteinntekt og rentefradrag stenger "
          f"den. Det gjør også markedet, ved å by ned avkastningen på det skattefrie.</p>"
    )
    return sporsmal(q, alt, kort, full_txt)


# ---------------------------------------------------------------------------
# noy-dm1 · Domar–Musgrave: skaler opp med 1/(1 − t)
# ---------------------------------------------------------------------------
def _dm_replisering(r):
    navn = r.choice(NAVN)
    x = r.choice([300_000, 400_000, 480_000, 600_000, 720_000, 900_000])
    oppe = r.choice([20, 24, 28, 30])
    nede = r.choice([10, 12, 15, 16])
    spor = r.choice(["ny", "ny", "heving"])
    if spor == "ny":
        t = r.choice([0.20, 0.25, 0.40, 0.50])
        riktig = x / (1 - t)
        if not heltall(riktig):
            raise Avvis("ujevnt beløp")
        alt = [R(kr(riktig), riktig),
               F(kr(x * (1 - t)), f"Ganget med 1 − t i stedet for å dele: {tall(x)} × {tall(1 - t, 2)}. Skatten krymper "
                                  f"hvert utfall, så beløpet må opp, ikke ned.", x * (1 - t)),
               F(kr(x * (1 + t)), f"Ganget med 1 + t: {tall(x)} × {tall(1 + t, 2)}. Det kompenserer ikke fullt: "
                                  f"(1 + t)(1 − t) er mindre enn 1.", x * (1 + t)),
               F(kr(x), "Uendret fordi skatten er nøytral. Nøytral betyr at rangeringen står, men hvert utfall er "
                        "krympet. For å få samme fordeling må beløpet skaleres opp.", x)]
        skatt_txt = f"Så innføres en proporsjonal skatt på {pst(t, 0)} på avkastningen, med fullt tapsfradrag."
        steg = (f"<p><b>Steg 1: hva skatten gjør.</b> Hvert utfall krymper med faktoren 1 − t = {tall(1 - t, 2)}: "
                f"gevinsten og tapet.</p>"
                f"<p><b>Steg 2: skaler opp.</b> {tall(x)}/{tall(1 - t, 2)} = <b>{kr(riktig)}</b>.</p>")
        kontroll_g = riktig * oppe / 100 * (1 - t)
        kontroll_t = riktig * nede / 100 * (1 - t)
        kort = (f"<p><b>{kr(riktig)}.</b> Skatten krymper hvert utfall med 1 − t. Med {tall(x)}/{tall(1 - t, 2)} "
                f"i aktivumet er fordelingen etter skatt den samme som før.</p>")
    else:
        t1 = r.choice([0.20, 0.25])
        t = r.choice([0.40, 0.50])
        riktig = x * (1 - t1) / (1 - t)
        if not heltall(riktig):
            raise Avvis("ujevnt beløp")
        alt = [R(kr(riktig), riktig),
               F(kr(x * (1 - t) / (1 - t1)), f"Brøken snudd: {tall(x)} × {tall(1 - t, 2)}/{tall(1 - t1, 2)}. Høyere "
                                             f"skatt krymper utfallene mer, så beløpet må opp.", x * (1 - t) / (1 - t1)),
               F(kr(x * (1 + t - t1)), f"Økt med satsøkningen: {tall(x)} × (1 + {tall(t - t1, 2)}). Riktig faktor er "
                                       f"(1 − t<sub>før</sub>)/(1 − t<sub>etter</sub>).", x * (1 + t - t1)),
               F(kr(x / (1 - t)), f"Delt på 1 − {pst(t, 0)} som om det ikke var skatt fra før. Beløpet var alt "
                                  f"skalert for {pst(t1, 0)}.", x / (1 - t))]
        skatt_txt = (f"Avkastningen skattlegges i dag proporsjonalt med {pst(t1, 0)}, med fullt tapsfradrag. Satsen "
                     f"heves til {pst(t, 0)}.")
        steg = (f"<p><b>Steg 1: posisjonen etter skatt i dag.</b> {tall(x)} × {tall(1 - t1, 2)} = "
                f"{tall(x * (1 - t1))} kroner i risikoeksponering etter skatt.</p>"
                f"<p><b>Steg 2: hold den fast.</b> Ny posisjon × {tall(1 - t, 2)} = {tall(x * (1 - t1))} gir "
                f"{tall(x * (1 - t1))}/{tall(1 - t, 2)} = <b>{kr(riktig)}</b>.</p>")
        kontroll_g = riktig * oppe / 100 * (1 - t)
        kontroll_t = riktig * nede / 100 * (1 - t)
        kort = (f"<p><b>{kr(riktig)}.</b> Eksponeringen etter skatt, {tall(x)} × {tall(1 - t1, 2)} = "
                f"{tall(x * (1 - t1))}, holdes fast: {tall(x * (1 - t1))}/{tall(1 - t, 2)}.</p>")
    ulike(*[a.verdi for a in alt], rel=0.005)
    if not (heltall(kontroll_g) and heltall(kontroll_t)):
        raise Avvis("ujevn kontroll")
    unik("dm1", x, t, spor)
    q = (f"<p>{navn} har {kr(x)} i et risikabelt aktivum som gir +{oppe} % eller −{nede} % med like stor "
         f"sannsynlighet. Resten av formuen står på en konto uten avkastning. {skatt_txt}</p>"
         f"<p>Hvor mye må {navn} ha i det risikable aktivumet for å få nøyaktig samme fordeling av avkastningen etter "
         f"skatt som før endringen?</p>")
    g0 = x * oppe / 100 * (1 - (t1 if spor == "heving" else 0))
    t0 = x * nede / 100 * (1 - (t1 if spor == "heving" else 0))
    full_txt = (
        f"<p><b>Staten som stille partner.</b> Med proporsjonal skatt og fullt tapsfradrag tar staten andelen t av "
        f"gevinsten og dekker andelen t av tapet. Hvert utfall krymper med samme faktor. Investoren kan få tilbake "
        f"nøyaktig samme fordeling ved å skalere beløpet opp. Det er Domar og Musgraves resultat: skatten kan gi mer "
        f"risikotaking, ikke mindre.</p>"
        + steg
        + f"<p><b>Kontroll utfall for utfall.</b> Før: +{tall(g0)} eller −{tall(t0)} etter skatt. Etter: "
          f"{tall(riktig)} × {oppe} % × {tall(1 - t, 2)} = +{tall(kontroll_g)} og {tall(riktig)} × {nede} % × "
          f"{tall(1 - t, 2)} = −{tall(kontroll_t)} ✓. Samme utfall gir samme forventede nytte, uansett "
          f"risikoholdning.</p>"
          f"<p><b>Husk:</b> beløpet i det risikable ganges med 1/(1 − t). Det krever fullt tapsfradrag og at bare "
          f"meravkastningen skattlegges.</p>"
    )
    return sporsmal(q, alt, kort, full_txt)


# ---------------------------------------------------------------------------
# noy-dm2 · Forventet resultat med og uten tapsfradrag
# ---------------------------------------------------------------------------
def _dm_prosjekt(r):
    G = r.choice([100_000, 120_000, 150_000, 200_000])
    L = r.choice([40_000, 50_000, 60_000, 80_000])
    S = r.choice([15_000, 20_000, 25_000, 30_000])
    t = r.choice([0.30, 0.40, 0.50])
    E = (G - L) / 2
    if E <= S:
        raise Avvis("det risikable må være best uten skatt")
    med = (1 - t) * E
    uten = (1 - t) * G / 2 - L / 2
    S_e = (1 - t) * S
    teller = _BRUKT.setdefault("dm2-regime", {"med": 0, "uten": 0})
    regime = "uten" if teller["uten"] <= teller["med"] else "med"
    v, v_annen = (med, uten) if regime == "med" else (uten, med)
    valg = "det risikable" if v > S_e else "det sikre"
    valg_annen = "det risikable" if v_annen > S_e else "det sikre"
    motsatt = "det sikre" if valg == "det risikable" else "det risikable"
    if abs(v - S_e) < 1000 or abs(v_annen - S_e) < 1000:
        raise Avvis("for jevnt")
    if abs(v) < 1000:
        raise Avvis("forventet resultat nær null")
    if regime == "uten" and v > S_e:
        raise Avvis("uten tapsfradrag skal valget snu til det sikre")
    unik("dm2", G, L, t)
    teller[regime] += 1

    def opt(x, c):
        return f"Kr {tall(x)}, så du velger {c} prosjektet"
    if valg == "det risikable" and v < S:
        f4 = (f"Riktig tall, men sammenlignet med det sikre før skatt, {tall(S)}. Det sikre skattlegges også og gir "
              f"bare {tall(S_e)}.")
    else:
        f4 = f"Riktig tall, men valget snudd: {tall(v)} mot {tall(S_e)} for det sikre etter skatt."
    alt = [R(opt(v, valg)),
           F(opt(v_annen, valg_annen), ("Regnet uten tapsfradrag: tapet er ikke redusert med skatten."
                                        if regime == "med" else
                                        "Regnet med tapsfradrag: staten dekker ingen del av tapet her.")),
           F(opt(E, "det risikable"), f"Skatten glemt: ½ × {tall(G)} − ½ × {tall(L)} = {tall(E)} er forventningen "
                                      f"før skatt."),
           F(opt(v, motsatt), f4)]
    q = (f"<p>Du kan investere i ett av to prosjekter. Det sikre gir en gevinst på {kr(S)}. Det risikable gir en "
         f"gevinst på {kr(G)} eller et tap på {kr(L)}, med like stor sannsynlighet. Gevinster skattlegges med "
         f"{pst(t, 0)}. " + ("Et tap kan føres fullt ut mot annen skattepliktig inntekt." if regime == "med" else
                             "Et tap gir ikke noe fradrag, fordi du ikke har annen inntekt å føre det mot.")
         + "</p><p>Hva er forventet resultat etter skatt for det risikable prosjektet? Hvilket prosjekt velger du "
           "hvis du er risikonøytral?</p>")
    if regime == "med":
        regn = (f"½ × {tall(G)} × {tall(1 - t, 2)} − ½ × {tall(L)} × {tall(1 - t, 2)} = {tall(G * (1 - t) / 2)} − "
                f"{tall(L * (1 - t) / 2)} = {tall(med)}")
        hvorfor = (f"Staten tar {pst(t, 0)} av gevinsten og dekker {pst(t, 0)} av tapet. Begge prosjektene krymper "
                   f"med samme faktor, så rangeringen står.")
    else:
        regn = (f"½ × {tall(G)} × {tall(1 - t, 2)} − ½ × {tall(L)} = {tall(G * (1 - t) / 2)} − {tall(L / 2)} = "
                f"{tall(uten)}")
        hvorfor = ("Staten tar en del av gevinsten, men dekker ingenting av tapet. Det straffer oppsiden og vrir "
                   "valget mot det sikre.")
    kort = (f"<p><b>{opt(v, valg)}.</b> {regn}. Det sikre gir {tall(S)} × {tall(1 - t, 2)} = {tall(S_e)}.</p>")
    full_txt = (
        f"<p><b>Staten som partner, eller bare som skatteoppkrever.</b> Med fullt tapsfradrag er staten med på både "
        f"oppturen og nedturen: forventet resultat blir (1 − t) × E. Uten tapsfradrag er staten bare med på "
        f"oppturen: forventet resultat blir E − t × G, der G er forventet bruttogevinst. {hvorfor}</p>"
        f"<p><b>Steg 1: uten skatt.</b> ½ × {tall(G)} − ½ × {tall(L)} = {tall(E)}, mer enn de {tall(S)} det sikre "
        f"gir.</p>"
        f"<p><b>Steg 2: det risikable etter skatt.</b> {regn}.</p>"
        f"<p><b>Steg 3: det sikre etter skatt.</b> {tall(S)} × {tall(1 - t, 2)} = {tall(S_e)}. Du velger "
        f"<b>{valg} prosjektet</b>.</p>"
        f"<p><b>Kontroll med formelen.</b> "
        + (f"(1 − t) × E = {tall(1 - t, 2)} × {tall(E)} = {tall(med)} ✓." if regime == "med" else
           f"E − t × G = {tall(E)} − {tall(t, 2)} × {tall(G / 2)} = {tall(uten)} ✓.")
        + "</p><p><b>Husk:</b> med fullt tapsfradrag (1 − t)E, uten tapsfradrag E − tG. Det sikre skattlegges "
          "også.</p>"
    )
    return sporsmal(q, alt, kort, full_txt)


# ---------------------------------------------------------------------------
# noy-prog1 · Progressivitet: flat sats med bunnfradrag
# ---------------------------------------------------------------------------
@familie("noy-prog1", tema="noytralitet", antall=5, tittel="Gjennomsnittsskatt og progressivitet")
def _(r):
    s = r.choice([0.20, 0.25, 0.28, 0.30, 0.35, 0.40])
    B = r.choice([50_000, 100_000, 150_000, 200_000])
    Y1 = r.choice([300_000, 400_000, 500_000])
    Y2 = r.choice([800_000, 1_000_000, 1_200_000])
    n1, n2 = r.sample(NAVN, 2)
    a1, a2 = s * (1 - B / Y1), s * (1 - B / Y2)
    v1, v2 = s * B / Y1, s * B / Y2
    if not all(heltall(x * 1000) for x in (a1, a2, v1, v2)):
        raise Avvis("ujevne satser")
    if nær(v1, a1, 0.001) or nær(v2, a2, 0.001):
        raise Avvis("fradragsverdien lik gjennomsnittsskatten")
    unik("prog1", s)

    def par(x, y):
        return f"{n1} {pst(x, 1)} og {n2} {pst(y, 1)}"
    alt = [R(f"{par(a1, a2)}, altså progressivt"),
           F(f"{par(s, s)}, altså proporsjonalt", "Bunnfradraget glemt, eller skatten delt på inntekten over "
                                                   "fradraget. Gjennomsnittsskatt er betalt skatt delt på hele "
                                                   "inntekten."),
           F(f"{par(a1, a2)}, altså proporsjonalt", "Riktige tall, men flat er ikke det samme som proporsjonal. "
                                                    "Gjennomsnittsskatten stiger med inntekten. Det er definisjonen "
                                                    "på progressivt."),
           F(f"{par(v1, v2)}, altså regressivt", f"Dette er verdien av bunnfradraget i prosent av inntekten, "
                                                 f"{pst(s, 0)} × {tall(B)}/inntekt. Gjennomsnittsskatten er "
                                                 f"{pst(s, 0)} minus dette.")]
    q = (f"<p>Et land har én skattesats på {pst(s, 0)} på all inntekt over et bunnfradrag på {kr(B)}. {n1} tjener "
         f"{kr(Y1)} og {n2} {kr(Y2)}. Ingen av dem har andre fradrag.</p>"
         f"<p>Hva er gjennomsnittsskatten for hver av dem? Hva slags system er dette?</p>")
    kort = (f"<p><b>{par(a1, a2)}, progressivt.</b> Gjennomsnittsskatten er {pst(s, 0)} × (1 − {tall(B)}/inntekten). "
            f"Den stiger med inntekten, selv om det bare er én sats.</p>")
    full_txt = (
        f"<p><b>Hva progressivitet er.</b> Et skattesystem er progressivt når gjennomsnittsskatten, betalt skatt delt "
        f"på inntekt, stiger med inntekten. Antall satser er uten betydning. Én sats med bunnfradrag er både flat og "
        f"progressiv.</p>"
        f"<p><b>Steg 1: skatten.</b> {n1}: ({tall(Y1)} − {tall(B)}) × {pst(s, 0)} = {tall(s * (Y1 - B))}. {n2}: "
        f"({tall(Y2)} − {tall(B)}) × {pst(s, 0)} = {tall(s * (Y2 - B))}.</p>"
        f"<p><b>Steg 2: gjennomsnittsskatten.</b> {tall(s * (Y1 - B))}/{tall(Y1)} = {pst(a1, 1)} og "
        f"{tall(s * (Y2 - B))}/{tall(Y2)} = {pst(a2, 1)}.</p>"
        f"<p><b>Steg 3: klassifiser.</b> {pst(a2, 1)} er høyere enn {pst(a1, 1)}. Systemet er <b>progressivt</b>.</p>"
        f"<p><b>Kontroll.</b> Formelen t̄ = s(1 − B/Y) gir {pst(s, 0)} × (1 − {tall(B)}/{tall(Y1)}) = {pst(a1, 1)} ✓. "
        f"Gjennomsnittsskatten nærmer seg {pst(s, 0)} nedenfra uten å nå den. Et svar der den er lik eller over "
        f"marginalsatsen, er galt.</p>"
        f"<p><b>Marginalskatt mot gjennomsnittsskatt.</b> Marginalskatten er skatten på den neste kronen, her {pst(s, 0)} for begge. Gjennomsnittsskatten er hele skatten delt på hele inntekten. Progressivitet handler om den siste.</p>"
        f"<p><b>Husk:</b> progressivt betyr stigende gjennomsnittsskatt. Større bunnfradrag gir sterkere "
        f"progresjon.</p>"
    )
    return sporsmal(q, alt, kort, full_txt)


# ---------------------------------------------------------------------------
# Familiene som trekker mellom to beslektede regnestykker
# ---------------------------------------------------------------------------
def _veksle(fam, r, *regnestykker):
    """Trekk det regnestykket som er brukt minst så langt i familien, så variantene fordeler seg jevnt."""
    teller = _BRUKT.setdefault("veksle-" + fam, [0] * len(regnestykker))
    minst = min(teller)
    i = r.choice([k for k, c in enumerate(teller) if c == minst])
    sp = regnestykker[i](r)
    teller[i] += 1
    return sp


@familie("noy-ge1", tema="noytralitet", antall=5, tittel="Gjeld mot egenkapital: krav og resultat")
def _(r):
    return _veksle("ge1", r, _ge_krav, _ge_prosjekt)


@familie("noy-imp1", tema="noytralitet", antall=5, tittel="Implisitt skatt og valgregelen")
def _(r):
    return _veksle("imp1", r, _imp_sats, _imp_valg)


@familie("noy-dm1", tema="noytralitet", antall=5, tittel="Domar–Musgrave: replisering og tapsfradrag")
def _(r):
    return _veksle("dm1", r, _dm_replisering, _dm_prosjekt)


# ===========================================================================
# STATISKE SPØRSMÅL
# ===========================================================================
BEDRIFT = ("<p>En bedrift bruker kapital K og har inntekten F(K), med F′(K) &gt; 0 og F″(K) &lt; 0. Renten er r og "
           "betales på all kapital. Bare andelen A av rentekostnaden kan trekkes fra, med 0 &lt; A &lt; 1. "
           "Overskuddsskatten er t.</p>")

statisk(
    "noy-s01", tema="noytralitet", type="formel",
    q=BEDRIFT + "<p>Bedriften maksimerer verdien etter skatt, V = F(K) − rK − t[F(K) − ArK]. Hvilket uttrykk "
                "beskriver den optimale kapitalbruken?</p>",
    alternativer=[
        R("F′(K) = r(1 − At)/(1 − t)"),
        F("F′(K) = rA/(1 − t)", "A = 1 gir r/(1 − t), der det riktige kravet er r. Uttrykket gir også et krav "
                                "under renten når A er liten."),
        F("F′(K) = r/[(1 − t)A]", "A = 1 gir r/(1 − t), ikke r. Når A går mot null, går kravet mot uendelig."),
        F("F′(K) = r(1 − t)/(1 − At)", "Teller og nevner byttet om. Uttrykket er under r for alle A &lt; 1, men "
                                       "ufullstendig fradrag kan bare gjøre kapitalen dyrere."),
    ],
    kort="<p><b>F′(K) = r(1 − At)/(1 − t).</b> Deriver V: F′(K)(1 − t) = r(1 − At). Testen: A = 1 skal gi r. Bare "
         "dette uttrykket gjør det.</p>",
    full="<p><b>Hva betingelsen sier.</b> Bedriften bruker kapital til den siste kronen akkurat betaler for seg etter "
         "skatt. Renten rK betales fullt, men bare ArK gir fradrag. Det gjør kapitalen dyrere enn uten skatt.</p>"
         "<p><b>Steg 1: deriver.</b> dV/dK = F′(K) − r − t[F′(K) − Ar] = 0.</p>"
         "<p><b>Steg 2: samle leddene med F′(K).</b> F′(K)(1 − t) = r − tAr = r(1 − At).</p>"
         "<p><b>Steg 3: del.</b> F′(K) = r(1 − At)/(1 − t).</p>"
         "<p><b>Kontroll: grensetesten.</b> A = 1 gir r(1 − t)/(1 − t) = r: full fradragsrett gjør skatten nøytral. "
         "A = 0 gir r/(1 − t). Med r = 6 %, t = 22 % og A = 0,5 [eksempeltall] blir kravet 6 % × 0,89/0,78 = 6,85 %, "
         "mellom 6,00 % og 7,69 % ✓. De to gale brøkene med A gir 3,85 % og 15,38 %.</p>"
         "<p><b>Husk:</b> sett A = 1 i hvert alternativ. Bare det riktige kollapser til r.</p>",
)

statisk(
    "noy-s02", tema="noytralitet", type="formel",
    q="<p>En bedrift bruker gjeld G og egenkapital E, slik at K = E + G. Inntekten er F(E + G) med F′ &gt; 0 og "
      "F″ &lt; 0. Gjeldsrenten er r og gir fullt fradrag. Egenkapitalen har samme alternativkostnad r, men den gir "
      "ikke fradrag. Skattesatsen er t. Hvordan tilpasser bedriften bruken av gjeld og egenkapital?</p>",
    alternativer=[
        R("F′<sub>G</sub> = r og F′<sub>E</sub> = r/(1 − t)"),
        F("F′<sub>G</sub> = r(1 − t) og F′<sub>E</sub> = r", "r(1 − t) er gjeldens kostnad etter skatt. Kravet "
                                                             "gjelder marginalproduktet før skatt."),
        F("F′<sub>G</sub> = r/(1 − t) og F′<sub>E</sub> = r(1 − t)", "Snudd: det ville gjort egenkapitalen billigst, "
                                                                     "stikk i strid med at bare renter gir fradrag."),
        F("F′<sub>G</sub> = r og F′<sub>E</sub> = r", "Det gjelder bare uten skatt, eller med fradrag også for "
                                                      "egenkapitalens kostnad."),
    ],
    kort="<p><b>F′<sub>G</sub> = r og F′<sub>E</sub> = r/(1 − t).</b> For gjeld stryker skatten på inntekten og "
         "fradraget for renten hverandre. For egenkapital skattlegges inntekten uten motpost.</p>",
    full="<p><b>Hva som skiller kronene.</b> Begge kronene koster r. Gjeldskronen koster r i renter, som gir "
         "fradrag. Egenkapitalkronen koster r i tapt avkastning for eierne, som ikke er en utbetaling og ikke gir "
         "fradrag.</p>"
         "<p><b>Steg 1: verdien.</b> V = F(E + G) − r(G + E) − t[F(E + G) − rG].</p>"
         "<p><b>Steg 2: gjeld.</b> ∂V/∂G = F′<sub>G</sub> − r − t(F′<sub>G</sub> − r) = (1 − t)(F′<sub>G</sub> − r) = "
         "0, så F′<sub>G</sub> = r.</p>"
         "<p><b>Steg 3: egenkapital.</b> ∂V/∂E = F′<sub>E</sub> − r − tF′<sub>E</sub> = 0, så F′<sub>E</sub> = "
         "r/(1 − t).</p>"
         "<p><b>Kontroll med tall.</b> r = 6 % og t = 22 % [eksempeltall] gir F′<sub>G</sub> = 6,00 % og "
         "F′<sub>E</sub> = 7,69 %. Et prosjekt som gir 7 %, gir (70 000 − 60 000) × 0,78 = 7 800 per million med "
         "gjeld og 54 600 − 60 000 = −5 400 med egenkapital ✓.</p>"
         "<p><b>Husk:</b> F′<sub>G</sub> = r og F′<sub>E</sub> = r/(1 − t). Et tall etter skatt hører ikke hjemme i "
         "et krav til marginalproduktet før skatt.</p>",
)

statisk(
    "noy-s03", tema="noytralitet", type="begrep",
    q="<p>En bedrift har F′<sub>G</sub> = r for gjeldsfinansiert kapital og F′<sub>E</sub> = r/(1 − t) for "
      "egenkapitalfinansiert kapital, med 0 &lt; t &lt; 1 og F″ &lt; 0. La E* og G* være de optimale mengdene. Hva "
      "følger?</p>",
    alternativer=[
        R("E* &lt; G*"),
        F("E* &gt; G*", "Feil vei. Et høyere krav til marginalproduktet betyr mindre bruk når F er konkav."),
        F("E* = G*", "Det krever like krav, altså at også egenkapitalens kostnad gir fradrag."),
        F("½E* &gt; G*", "Modellen gir en ulikhet, aldri et bestemt forholdstall."),
    ],
    kort="<p><b>E* &lt; G*.</b> F′<sub>E</sub> = r/(1 − t) &gt; r = F′<sub>G</sub>. Med fallende marginalprodukt "
         "betyr høyere krav mindre bruk.</p>",
    full="<p><b>Hvordan kravet styrer mengden.</b> F″ &lt; 0 betyr at marginalproduktet faller jo mer kapital "
         "bedriften bruker. Bedriften stopper der marginalproduktet er lik kravet. Et høyt krav nås tidlig, ved "
         "lite kapital. Et lavt krav nås først ved mye kapital.</p>"
         "<p><b>Steg 1: sammenlign kravene.</b> 1/(1 − t) &gt; 1 for alle t mellom 0 og 1, så r/(1 − t) &gt; r.</p>"
         "<p><b>Steg 2: les av mengdene.</b> Egenkapitalkronen må gi mer, så bedriften bruker mindre av den: "
         "E* &lt; G*.</p>"
         "<p><b>Kontroll med tall.</b> r = 6 % og t = 22 % [eksempeltall] gir kravene 6,00 % og 7,69 %. En krone som "
         "gir 7 %, brukes med gjeld, men ikke med egenkapital ✓.</p>"
         "<p><b>Forbeholdet.</b> Modellen peker egentlig mot en hjørneløsning med bare gjeld. Det som stopper den i "
         "praksis, er konkurskostnader, långivernes krav og rentebegrensningsregler, ikke skatten.</p>"
         "<p><b>Husk:</b> høyere krav, mindre bruk. Gjeld er billigst bare fordi renter gir fradrag.</p>",
)

statisk(
    "noy-s04", tema="noytralitet", type="begrep",
    q="<p>En overskuddsskatt gir fradrag for alle kostnader ved kapitalen, også hele rentekostnaden (A = 1). Da er "
      "bedriftens krav F′(K) = r, det samme som uten skatt. Hva er grunnen?</p>",
    alternativer=[
        R("Samme K maksimerer både overskuddet og en fast andel av det"),
        F("Bedriften velter hele skatten over på kundene gjennom høyere priser", "Kravet til marginalproduktet "
                                                                                 "handler om kostnader, ikke om "
                                                                                 "overvelting."),
        F("Skattesatsen er så lav at den ikke påvirker beslutningene", "Resultatet gjelder for enhver sats under "
                                                                       "100 %. Også en skatt på 50 % kan være "
                                                                       "nøytral."),
        F("Skatten treffer bare den delen av overskuddet som deles ut", "Overskuddsskatten treffer hele "
                                                                        "overskuddet. Det er grunnlaget, ikke "
                                                                        "utdelingen, som avgjør."),
    ],
    kort="<p><b>Fast andel av overskuddet.</b> Med A = 1 er V = (1 − t)[F(K) − rK]. Det K som gir størst "
         "overskudd før skatt, gir også størst overskudd etter skatt.</p>",
    full="<p><b>Hva nøytral betyr her.</b> En skatt er nøytral for investeringen når den ikke endrer hvilken "
         "kapitalmengde som lønner seg best. Nivået på skatten spiller da ingen rolle.</p>"
         "<p><b>Steg 1: skriv verdien med A = 1.</b> V = F(K) − rK − t[F(K) − rK] = (1 − t)[F(K) − rK].</p>"
         "<p><b>Steg 2: maksimer.</b> (1 − t) er en konstant. Det som maksimerer F(K) − rK, maksimerer også "
         "(1 − t)[F(K) − rK]. Betingelsen blir F′(K) = r, som uten skatt.</p>"
         "<p><b>Steg 3: hva som skjer med A &lt; 1.</b> Da er grunnlaget bredere enn overskuddet, fordi en del av "
         "renten ikke trekkes fra. Kravet blir r(1 − At)/(1 − t) &gt; r. Bedriften investerer mindre.</p>"
         "<p><b>Kontroll med formelen.</b> r(1 − 1 × t)/(1 − t) = r ✓.</p>"
         "<p><b>Husk:</b> en skatt på et grunnlag der alle kostnader gir fradrag, er nøytral uansett sats. Nøytral "
         "betyr ikke lav.</p>",
)

statisk(
    "noy-s05", tema="noytralitet", type="begrep",
    q="<p>Hva betyr det at et skattesystem er nøytralt?</p>",
    alternativer=[
        R("Skatten endrer ikke rangeringen mellom private alternativer"),
        F("Alle skattytere betaler like mange kroner i skatt", "Nøytralitet sier ingenting om hvem som betaler "
                                                               "hvor mye. Det betyr at rangeringen mellom "
                                                               "alternativene står etter skatt."),
        F("Alle inntekter står med samme sats i loven", "Det er den effektive satsen som må være lik. Lik sats i "
                                                        "loven kan gi ulike effektive satser når grunnlagene er ulike."),
        F("Skatten er så lav at den ikke påvirker sparingen", "Nøytralitet sier ingenting om nivået. En nøytral "
                                                              "skatt kan være høy."),
    ],
    kort="<p><b>Rangeringen endres ikke.</b> Det som var mest lønnsomt før skatt, er fortsatt mest lønnsomt etter "
         "skatt. Det krever like effektive satser.</p>",
    full="<p><b>Definisjonen.</b> Et skattesystem er nøytralt når det ikke endrer rangeringen mellom private "
         "alternativer. Gir A høyere avkastning enn B før skatt, gir A også høyere avkastning etter skatt.</p>"
         "<p><b>Steg 1: hvorfor det betyr noe.</b> Kapitalen flytter seg etter avkastningen etter skatt. Det er "
         "avkastningen før skatt som måler hva investeringen er verdt for samfunnet. Ulike effektive satser får "
         "kapitalen til å gå til det som er minst verdt.</p>"
         "<p><b>Steg 2: et tall.</b> Bolig med effektiv sats 10 % og 5 % avkastning gir 4,5 % etter skatt. "
         "Næringskapital med 30 % sats og 6 % avkastning gir 4,2 % [eksempeltall]. Boligen velges. Samfunnet "
         "taper ett prosentpoeng.</p>"
         "<p><b>Kontroll.</b> Med lik effektiv sats, 20 % på begge, gir boligen 4,0 % og næringskapitalen 4,8 %. "
         "Rangeringen før skatt er bevart ✓.</p>"
         "<p><b>Husk:</b> nøytral betyr verken lav eller rettferdig. Det betyr at skatten ikke vrir valgene.</p>",
)

statisk(
    "noy-s06", tema="noytralitet", type="paastand",
    q="<p>Hvilken påstand om nøytrale skatter er riktig?</p>",
    alternativer=[
        R("En overskuddsskatt på 50 % kan være helt nøytral"),
        F("En nøytral kapitalinntektsskatt gir ingen kile mellom r og r(1 − t)",
          "Også en nøytral kapitalskatt legger en kile mellom avkastningen før og etter skatt. Den vrir valget "
          "mellom konsum i dag og i morgen."),
        F("Et nøytralt skattesystem er også et rettferdig system",
          "Nøytralitet og rettferdighet er uavhengige egenskaper. Fordeling er et eget spørsmål."),
        F("Like satser i skatteloven er nok til å sikre nøytralitet",
          "Det er de effektive satsene som må være like. Ulike grunnlag og fradrag gir ulike effektive satser."),
    ],
    kort="<p><b>50 % kan være nøytral.</b> Å maksimere halve overskuddet er det samme som å maksimere hele, så "
         "lenge alle kostnader gir fradrag.</p>",
    full="<p><b>Tre forvekslinger.</b> «Nøytral» sier ingenting om nivået. Det sier ingenting om fordelingen. Det "
         "betyr heller ikke at det ikke finnes noen skattekile.</p>"
         "<p><b>Steg 1: nivået.</b> En overskuddsskatt med fullt fradrag for alle kostnader gir V = (1 − t) × "
         "overskuddet. Valget som maksimerer overskuddet, er det samme for t = 10 % og t = 50 %.</p>"
         "<p><b>Steg 2: kilen.</b> En skatt på renteinntekter gir sparerne r(1 − t) i stedet for r. Den kan være "
         "nøytral mellom aktiva, men den vrir valget mellom å bruke pengene nå og senere.</p>"
         "<p><b>Steg 3: fordelingen.</b> Paretooptimalitet og rettferdighet er uavhengige egenskaper. Hvem som "
         "betaler, er et eget spørsmål.</p>"
         "<p><b>Kontroll med formelen.</b> F′(K) = r(1 − At)/(1 − t) med A = 1 gir r for enhver t ✓.</p>"
         "<p><b>Husk:</b> nøytral betyr at rangeringen står. Den sier ingenting om hvor høy skatten er.</p>",
)

statisk(
    "noy-s07", tema="noytralitet", type="begrep",
    q="<p>Et nøytralt skattesystem krever like effektive skattesatser på tvers av tre ting. Hvilke?</p>",
    alternativer=[
        R("Aktiva, finansieringsformer og organisasjonsformer"),
        F("Inntektsnivåer, aldersgrupper og kommuner", "Dette er fordelingsspørsmål. Nøytralitet handler om at "
                                                       "skatten ikke vrir valgene mellom alternativer."),
        F("Lønn, pensjon og trygd", "Dette er inntektstyper hos personer. Kravet gjelder hvor kapitalen plasseres, "
                                    "hvordan den finansieres og i hvilken form virksomheten drives."),
        F("Personer, selskaper og staten", "Staten skattlegger ikke seg selv. Kravet handler om valgene til den "
                                           "som investerer."),
    ],
    kort="<p><b>Aktiva, finansiering og organisasjonsform.</b> Bank mot aksjer mot bolig, gjeld mot egenkapital "
         "og lønn mot utbytte. Ulike effektive satser vrir alle tre valgene.</p>",
    full="<p><b>Hvorfor tre dimensjoner.</b> En investor velger hva hun investerer i, hvordan det finansieres og i "
         "hvilken juridisk form. Skatten kan vri hvert av de tre valgene.</p>"
         "<p><b>Steg 1: aktiva.</b> Bank, aksjer og bolig bør ha samme effektive sats. Ellers flyttes sparingen dit "
         "skatten er lavest, ikke dit avkastningen før skatt er høyest.</p>"
         "<p><b>Steg 2: finansieringsform.</b> Gjeld gir rentefradrag, egenkapital gjør det ikke. Det gir "
         "F′<sub>E</sub> = r/(1 − t) &gt; F′<sub>G</sub> = r.</p>"
         "<p><b>Steg 3: organisasjonsform.</b> Lønn og utbytte bør ha samme samlede sats. Ellers tar eiere ut "
         "inntekten i den formen som gir lavest skatt. Aksjonærmodellen med oppjusteringsfaktoren skal tette det "
         "gapet.</p>"
         "<p><b>Kontroll.</b> Samlet skatt på utdelt overskudd er 22 % + 78 % × 37,84 % = 51,52 %, mot 47,4 % "
         "høyeste marginalskatt på lønn. Gapet på 4,12 prosentpoeng går i favør av lønn ✓.</p>"
         "<p><b>Husk:</b> det er den effektive satsen som må være lik, ikke den som står i loven.</p>",
)

statisk(
    "noy-s08", tema="noytralitet", type="begrep",
    q="<p>Hva er skattearbitrasje?</p>",
    alternativer=[
        R("Å utnytte at to sider av samme transaksjon skattlegges ulikt"),
        F("Å flytte til et land med lavere skatt før en gevinst realiseres", "Det er skattemotivert flytting, som "
                                                                             "exit-skatten skal ramme. Arbitrasje "
                                                                             "krever ingen flytting."),
        F("Å kjøpe og selge samme aksje for å realisere et tap", "Det er tapsrealisering, ikke arbitrasje."),
        F("Å utnytte prisforskjeller på samme aksje mellom to børser", "Det er vanlig arbitrasje. Skattearbitrasje "
                                                                       "utnytter skattereglene, ikke prisene."),
    ],
    kort="<p><b>Ulik skatt på to sider av samme transaksjon.</b> Lån med fradrag og plasser skattefritt. "
         "Gevinsten er r × L × (t<sub>fradrag</sub> − t<sub>avkastning</sub>).</p>",
    full="<p><b>Hva det er.</b> Du låner der rentene gir fradrag og plasserer der avkastningen er lavt eller ikke "
         "skattlagt. Posisjonen krever ingen egen kapital og bærer ingen risiko, men gir likevel penger etter "
         "skatt.</p>"
         "<p><b>Steg 1: et eksempel.</b> Lån kr 1 000 000 til 5 % med 22 % fradrag og plasser skattefritt til 5 % "
         "[eksempeltall]. Lånet koster 50 000 × 0,78 = 39 000. Plasseringen gir 50 000. Gevinsten er 11 000 i "
         "året.</p>"
         "<p><b>Steg 2: hva som stenger den.</b> Lik sats på renteinntekt og rentefradrag gir gevinst null. Det er "
         "konstruksjonen i det norske duale systemet. Markedet stenger den også: det skattefrie papiret bys opp i "
         "pris til avkastningen er 3,9 %.</p>"
         "<p><b>Kontroll med formelen.</b> 50 000 × (22 % − 0 %) = 11 000 ✓. Med lik sats: 50 000 × (22 % − 22 %) = "
         "0 ✓.</p>"
         "<p><b>Husk:</b> arbitrasje lever av satsforskjeller. Like satser på begge sider fjerner den.</p>",
)

statisk(
    "noy-s09", tema="noytralitet", type="paastand", rekkefolge="fast",
    q="<p>Vurder de to påstandene om skattearbitrasje.</p>"
      "<p>I: Lik skattesats på renteinntekter og rentefradrag fjerner gevinsten ved å låne og spare samtidig.</p>"
      "<p>II: Et rentefradrag i Norge er verdt mer for den som har høy marginalskatt på lønn.</p>"
      "<p>Hvilke av påstandene er riktige?</p>",
    alternativer=[
        R("Bare I"),
        F("Bare II", "II er gal: fradraget går mot alminnelig inntekt med 22 % for alle. I er riktig."),
        F("Begge", "II er gal. Marginalskatten på lønn inneholder trinnskatt og trygdeavgift, som rentefradraget "
                   "ikke reduserer."),
        F("Ingen", "I er riktig: med lik sats er gevinsten r × L × (22 % − 22 %) = 0."),
    ],
    kort="<p><b>Bare I.</b> Gevinsten er r × L × satsdifferansen, så lik sats gir null. Rentefradraget er verdt "
         "22 øre per krone uansett marginalskatt på lønn.</p>",
    full="<p><b>Påstand I.</b> Arbitrasjegevinsten er r × L × (t<sub>fradrag</sub> − t<sub>avkastning</sub>). "
         "Er satsene like, er gevinsten null uansett hvor stort lånet er. Det duale skattesystemet legger både "
         "renteinntekter og rentefradrag i alminnelig inntekt med 22 %. Riktig.</p>"
         "<p><b>Påstand II.</b> Rentefradraget trekkes fra alminnelig inntekt, som har én sats: 22 %. Trinnskatt og "
         "trygdeavgift beregnes av personinntekten, som rentefradraget ikke påvirker. En med 47,4 % marginalskatt "
         "på lønn sparer fortsatt bare 22 øre per krone i renter. Gal.</p>"
         "<p><b>Kontroll med tall.</b> Renter på kr 50 000 [eksempeltall] gir 50 000 × 22 % = 11 000 i lavere skatt, "
         "ikke 50 000 × 47,4 % = 23 700 ✓.</p>"
         "<p><b>Hvorfor regelen finnes.</b> Trekkes renter fra i en progressiv inntektsskatt, er fradraget verdt mest for dem med høyest inntekt. Det duale systemet legger renteinntekter og rentefradrag i samme flate grunnlag for å hindre slik arbitrasje.</p>"
         "<p><b>Husk:</b> i Norge er rentefradraget verdt 22 % for alle.</p>",
)

statisk(
    "noy-s10", tema="noytralitet", type="formel",
    q="<p>To obligasjoner har samme risiko. Den ene er fullt skattlagt og gir R før skatt. Den andre er "
      "skattefri og gir r. Markedet er velfungerende og i likevekt. Hvilket uttrykk er den implisitte "
      "skattesatsen t* på den skattefrie obligasjonen?</p>",
    alternativer=[
        R("t* = (R − r)/R"),
        F("t* = (R − r)/r", "Feil nevner. En skattesats måles mot grunnlaget "
                                                                "før skatt, R. Med r i nevneren "
                                                                "blir satsen for høy."),
        F("t* = R − r", "En differanse i prosentpoeng, ikke en sats. Den må deles på "
                                                "R."),
        F("t* = 1 − R/r", "Brøken snudd. R/r er over 1, så "
                                                  "uttrykket blir negativt."),
    ],
    kort="<p><b>t* = (R − r)/R.</b> Likevekten r = "
         "R(1 − t*) gir 1 − t* = r/R.</p>",
    full="<p><b>Hva implisitt skatt er.</b> Et skattefritt papir er mer attraktivt enn et skattlagt med samme risiko. "
         "Prisen bys opp til fordelen er borte. Da gir det skattefrie lavere avkastning før skatt. Forskjellen er "
         "en skatt ingen krever inn.</p>"
         "<p><b>Steg 1: likevekten.</b> Lik risiko krever lik avkastning etter skatt for den marginale investoren: "
         "r = R(1 − t*).</p>"
         "<p><b>Steg 2: løs for t*.</b> 1 − t* = r/R gir t* = 1 − r/R "
         "= (R − r)/R.</p>"
         "<p><b>Kontroll med tall.</b> R = 10 % og r = 7,8 % [eksempeltall] gir "
         "(10 − 7,8)/10 = 22 % ✓. Den gale nevneren gir 2,2/7,8 = 28,2 %.</p>"
         "<p><b>Filteret.</b> Satsen må være uten enhet, så differansen alene strykes. Den måles mot avkastningen "
         "før skatt, så nevneren r strykes. Den må ligge mellom 0 og 1, så det negative uttrykket "
         "strykes.</p>"
         "<p><b>Husk:</b> nevneren er R, avkastningen på det skattlagte. Den implisitte satsen leses ut av to "
         "avkastninger, uten å kjenne noen skattesats.</p>",
)

statisk(
    "noy-s11", tema="noytralitet", type="begrep",
    q="<p>En kommune utsteder en obligasjon med skattefrie renter. Et selskap med samme risiko utsteder en "
      "obligasjon der rentene skattlegges med 22 %. Markedet er velfungerende. Hvilken obligasjon har høyest "
      "avkastning før skatt?</p>",
    alternativer=[
        R("Den skattlagte"),
        F("Den skattefrie", "Feil vei. Alle vil ha den skattefrie. Prisen stiger, så avkastningen faller."),
        F("Begge har samme avkastning før skatt", "Da ville den skattefrie gitt mer etter skatt for alle. Det er ikke "
                                                  "en likevekt."),
        F("De kan ikke sammenlignes", "Lik risiko og et velfungerende marked gjør dem sammenlignbare. Det er "
                                      "nettopp poenget."),
    ],
    kort="<p><b>Den skattlagte.</b> I likevekt er r = R(1 − 22 %) &lt; R. Den skattefrie må ha lavere avkastning "
         "før skatt for å gi det samme etter skatt.</p>",
    full="<p><b>Hvorfor et skattefritak gir lavere avkastning.</b> Avkastningen er et forholdstall med prisen i "
         "nevneren: kupongen delt på kursen. Fritaket gjør papiret mer attraktivt. Kursen stiger mens kupongen står "
         "stille. Da faller avkastningen.</p>"
         "<p><b>Steg 1: likevekten.</b> Den marginale investoren må være likegyldig: r = R(1 − t).</p>"
         "<p><b>Steg 2: sett inn.</b> r = 0,78R. Siden 0,78 er under 1, er r &lt; R.</p>"
         "<p><b>Kontroll med tall.</b> R = 6 % [eksempeltall] gir r = 4,68 %. Begge gir 4,68 % etter skatt for en "
         "investor med 22 % skatt ✓.</p>"
         "<p><b>Fella.</b> «Skattefritt må være best» blander avkastning før og etter skatt. Etter skatt er de like "
         "for den marginale investoren. Før skatt er den skattefrie lavest.</p>"
         "<p><b>Hva det betyr for deg.</b> Sammenlign aldri et skattefritt og et skattlagt papir på avkastningen før skatt. Regn om det skattlagte til avkastning etter skatt med din egen marginalskatt før du sammenligner.</p>"
         "<p><b>Husk:</b> det skattefavoriserte har alltid lavest avkastning før skatt. Fallet er den implisitte "
         "skatten.</p>",
)

statisk(
    "noy-s12", tema="noytralitet", type="begrep",
    q="<p>Et skattefritt og et fullt skattlagt papir har samme risiko. Markedet er i likevekt. Den implisitte "
      "skattesatsen er t*. Hvilke investorer bør eie det skattefrie papiret?</p>",
    alternativer=[
        R("De som har marginalskatt over t*"),
        F("Alle, siden skattefritt alltid gir mest etter skatt", "Fordelen er priset inn. For den med lav "
                                                                 "marginalskatt gir det skattlagte mer etter skatt."),
        F("De som har marginalskatt under t*", "Valgregelen snudd. Den med lav sats taper mindre på det skattlagte "
                                               "enn den implisitte skatten koster."),
        F("Skattefrie investorer, som stiftelser", "Feil vei. En stiftelse betaler ingen skatt på det skattlagte, "
                                                   "men bærer hele den implisitte skatten på det skattefrie."),
    ],
    kort="<p><b>Marginalskatt over t*.</b> De sparer mer skatt enn den implisitte skatten koster dem. For alle "
         "andre gir det skattlagte mest etter skatt.</p>",
    full="<p><b>Valgregelen.</b> t* er markedets sats, satt av den marginale investoren. Din egen sats avgjør hva du "
         "bør eie. Er den høyere enn t*, bør du eie det skattefrie. Er den lavere, bør du eie det skattlagte.</p>"
         "<p><b>Steg 1: et eksempel.</b> Det skattlagte gir 8 % og det skattefrie 6 % [eksempeltall]. Da er "
         "t* = (8 − 6)/8 = 25 %.</p>"
         "<p><b>Steg 2: høy sats.</b> Med 40 % marginalskatt gir det skattlagte 8 % × 0,60 = 4,8 % mot 6 %. Velg det "
         "skattefrie.</p>"
         "<p><b>Steg 3: lav sats.</b> Med 0 % skatt, som en stiftelse, gir det skattlagte 8 % mot 6 %. Velg det "
         "skattlagte.</p>"
         "<p><b>Kontroll via satsene.</b> Gevinsten for 40 %-investoren er (40 % − 25 %) × 8 % = 1,2 prosentpoeng, "
         "som 6 − 4,8 ✓.</p>"
         "<p><b>Husk:</b> skattefavoriserte aktiva havner hos investorene med høyest marginalsats. Det kalles "
         "skatteklienteller.</p>",
)

statisk(
    "noy-s13", tema="noytralitet", type="begrep",
    q="<p>Staten innfører skattefritak for renter på en bestemt type obligasjon. Markedet er velfungerende. "
      "Prisene tilpasser seg. Hvem tjener mest på fritaket på lang sikt?</p>",
    alternativer=[
        R("Utstederne, som kan låne billigere"),
        F("Alle som kjøper obligasjonen senere", "Konkurransen om papiret har spist fordelen. Senere kjøpere får "
                                                 "lavere rente før skatt."),
        F("Staten, som får inn den implisitte skatten", "Ingen krever inn den implisitte skatten. Staten taper "
                                                        "proveny på fritaket."),
        F("Investorene med lavest marginalskatt", "Feil vei. Det skattefrie passer for dem med høyest "
                                                  "marginalskatt. De med lav sats taper på å eie det."),
    ],
    kort="<p><b>Utstederne.</b> De kan betale lavere rente fordi kjøperne slipper skatt. Kjøperne sitter igjen med "
         "omtrent det samme som før, fordi fordelen er priset inn.</p>",
    full="<p><b>Hvor fordelen havner.</b> Et skattefritak gjør papiret mer verdt. Prisen stiger til den marginale "
         "kjøperen er likegyldig. Da er fordelen borte for kjøperne. Den har gått til dem som utsteder papiret "
         "og til dem som eide papiret da fritaket kom.</p>"
         "<p><b>Steg 1: før fritaket.</b> Utstederen må betale 8 %, som andre papirer med samme risiko "
         "[eksempeltall].</p>"
         "<p><b>Steg 2: etter fritaket.</b> Med 25 % implisitt skatt holder det å betale 6 %. Kjøperen med 25 % skatt "
         "får 6 % i begge tilfeller.</p>"
         "<p><b>Steg 3: hvem tjente.</b> Utstederen sparer 2 prosentpoeng i rente. Den som eide papiret da fritaket "
         "kom, fikk en kursgevinst.</p>"
         "<p><b>Kontroll.</b> 8 % × (1 − 25 %) = 6 % ✓. Kjøperen er like godt stilt.</p>"
         "<p><b>Husk:</b> reell insidens avgjøres av markedet. Et fritak hjelper sjelden den det er rettet mot.</p>",
)

statisk(
    "noy-s14", tema="noytralitet", type="begrep",
    q="<p>I Domar–Musgrave-modellen skattlegges meravkastningen proporsjonalt med fullt tapsfradrag. Skatten "
      "heves. Hvorfor kan det få investoren til å øke beløpet i det risikable aktivumet?</p>",
    alternativer=[
        R("Staten bærer en større del av både gevinst og tap"),
        F("Skatten gjør investoren fattigere, så hun tar mer risiko", "Repliseringen virker uansett nyttefunksjon. "
                                                                      "Den bygger ikke på en inntektseffekt."),
        F("Skatten senker prisen på det risikable aktivumet", "Modellen har gitte priser. Det er fordelingen av "
                                                              "utfallene etter skatt som endres."),
        F("Skatten treffer bare gevinstene, så tapene blir relativt mindre", "Feil: med fullt tapsfradrag treffer "
                                                                             "skatten tapene like mye som "
                                                                             "gevinstene."),
    ],
    kort="<p><b>Staten deler gevinst og tap.</b> Hvert utfall krymper med 1 − t. Investoren skalerer beløpet opp med "
         "1/(1 − t) og får nøyaktig samme fordeling som før.</p>",
    full="<p><b>Staten som stille partner.</b> Med fullt tapsfradrag tar staten andelen t av gevinsten. Et tap kan "
         "føres mot annen inntekt, så staten dekker også andelen t av tapet. Utfall for utfall er "
         "kontantstrømmen (1 − t) ganger det den var uten skatt.</p>"
         "<p><b>Steg 1: hva skatten gjør.</b> Fordelingen etter skatt krymper. Forventningen og standardavviket faller "
         "begge med faktoren 1 − t.</p>"
         "<p><b>Steg 2: hva investoren gjør.</b> Hun ønsket en bestemt fordeling av sluttformuen. Ganges beløpet med "
         "1/(1 − t), er hvert utfall tilbake der det var.</p>"
         "<p><b>Kontroll med tall.</b> Kr 600 000 i et aktivum som gir +28 % eller −12 % gir +168 000 eller −72 000 "
         "[eksempeltall]. Med 40 % skatt og kr 1 000 000 i aktivumet: 0,60 × 280 000 = 168 000 og 0,60 × 120 000 = "
         "72 000 ✓.</p>"
         "<p><b>Husk:</b> med fullt tapsfradrag kan høyere skatt gi mer risikotaking, ikke mindre.</p>",
)

statisk(
    "noy-s15", tema="noytralitet", type="paastand",
    q="<p>Hvilken påstand om skatt og risikotaking er riktig?</p>",
    alternativer=[
        R("Uten tapsfradrag straffer skatten oppsiden og vrir valget mot det sikre"),
        F("Uten tapsfradrag bærer staten en større del av tapet enn av gevinsten", "Feil vei. Uten tapsfradrag bærer staten ingenting "
                                                                  "av tapet."),
        F("Fullt tapsfradrag gjør at investoren velger mindre risiko enn uten skatt", "Motsatt. Med fullt tapsfradrag skalerer "
                                                                       "investoren opp den risikable posisjonen."),
        F("Skatten påvirker ikke valget så lenge forventningen er positiv", "Uten tapsfradrag kan et prosjekt med "
                                                                            "høyest forventning før skatt tape mot "
                                                                            "et sikkert etter skatt."),
    ],
    kort="<p><b>Uten tapsfradrag straffes oppsiden.</b> Forventet resultat blir E − tG, der G er forventet "
         "bruttogevinst. Jo større oppside, jo hardere straff.</p>",
    full="<p><b>To regimer.</b> Med fullt tapsfradrag er forventet resultat etter skatt (1 − t) × E. Alle prosjekter "
         "krymper likt. Rangeringen står. Uten tapsfradrag er det E − t × G, der G er forventet gevinst i de gode "
         "utfallene.</p>"
         "<p><b>Steg 1: et eksempel.</b> Et sikkert prosjekt gir 20 000. Et risikabelt gir +100 000 eller −50 000 "
         "med lik sannsynlighet, altså 25 000 i forventning [eksempeltall]. Skatten er 40 %.</p>"
         "<p><b>Steg 2: med tapsfradrag.</b> 0,60 × 25 000 = 15 000 mot 0,60 × 20 000 = 12 000. Det risikable "
         "vinner, som før skatt.</p>"
         "<p><b>Steg 3: uten tapsfradrag.</b> 25 000 − 0,40 × 50 000 = 5 000 mot 12 000. Det sikre vinner.</p>"
         "<p><b>Kontroll.</b> ½ × 60 000 − ½ × 50 000 = 5 000 ✓.</p>"
         "<p><b>Hvem det rammer.</b> En oppstartsbedrift uten annen inntekt kan ikke føre tapet mot noe. Den møter "
         "regimet uten tapsfradrag. Et etablert selskap med overskudd andre steder møter regimet med.</p>"
         "<p><b>Husk:</b> «staten deler tapet» er bare riktig når tapsfradraget er fullt.</p>",
)

statisk(
    "noy-s16", tema="noytralitet", type="begrep",
    q="<p>Domar–Musgrave-resultatet sier at investoren skalerer det risikable beløpet opp med 1/(1 − t) når en "
      "skatt på avkastningen innføres. Hvilken forutsetning trengs <i>ikke</i> for resultatet?</p>",
    alternativer=[
        R("At investoren er risikonøytral"),
        F("At tap gir fullt fradrag mot annen inntekt", "Den trengs. Uten fullt tapsfradrag krymper ikke tapene "
                                                        "like mye som gevinstene."),
        F("At skatten er proporsjonal", "Den trengs. Med progressiv skatt treffes de gode utfallene hardere enn de "
                                        "dårlige."),
        F("At bare meravkastningen over risikofri rente skattlegges", "Den trengs. Skattlegges også den sikre "
                                                                      "avkastningen, kommer en inntektseffekt inn."),
    ],
    kort="<p><b>Risikonøytralitet trengs ikke.</b> Repliseringen gir nøyaktig samme fordeling utfall for utfall. "
         "Da gir den samme forventede nytte for enhver nyttefunksjon.</p>",
    full="<p><b>Hvorfor resultatet er så sterkt.</b> Investoren gjenoppretter ikke bare forventningen, men hele "
         "fordelingen av sluttformuen. Det som var optimalt før skatten, er derfor optimalt etterpå, uansett "
         "risikoholdning.</p>"
         "<p><b>Steg 1: fullt tapsfradrag.</b> Uten det krymper gevinstene med 1 − t, men tapene står. Skalering kan "
         "ikke gjenopprette fordelingen.</p>"
         "<p><b>Steg 2: proporsjonal skatt.</b> Med progressiv skatt krymper store gevinster mer enn små tap. Igjen "
         "brytes symmetrien.</p>"
         "<p><b>Steg 3: bare meravkastningen.</b> Skattlegges også den sikre avkastningen, blir investoren fattigere "
         "gjennom den sikre delen. Da kommer en inntektseffekt med motsatt fortegn inn.</p>"
         "<p><b>Kontroll.</b> Førsteordensbetingelsen E[U′(A + (1 − t)x r̃) × r̃] = 0 bestemmer produktet (1 − t)x. "
         "Den gjelder for enhver U ✓.</p>"
         "<p><b>Når vilkårene brytes.</b> Uten tapsfradrag straffes oppsiden. Da vris valget mot det sikre. Er skatten progressiv, treffes store gevinster hardere enn store tap.</p>"
         "<p><b>Husk:</b> fullt tapsfradrag, proporsjonal skatt og skatt bare på meravkastningen. Risikoholdningen "
         "spiller ingen rolle.</p>",
)

statisk(
    "noy-s17", tema="noytralitet", type="begrep",
    q="<p>Når er et skattesystem progressivt?</p>",
    alternativer=[
        R("Når gjennomsnittsskatten stiger med inntekten"),
        F("Når det har mer enn én skattesats", "Antall satser er uten betydning. Én sats med bunnfradrag er "
                                               "progressiv."),
        F("Når de med høy inntekt betaler flest kroner i skatt", "Det gjør de også med en proporsjonal skatt. Det er "
                                                                 "andelen av inntekten som må stige."),
        F("Når alle har samme marginalskatt", "Det beskriver en flat skatt. Den kan være progressiv eller "
                                              "proporsjonal avhengig av bunnfradraget."),
    ],
    kort="<p><b>Stigende gjennomsnittsskatt.</b> Betalt skatt delt på inntekt skal være høyere jo høyere "
         "inntekten er. En flat sats med bunnfradrag oppfyller det.</p>",
    full="<p><b>Definisjonen.</b> Gjennomsnittsskatten er betalt skatt delt på inntekt. Systemet er progressivt når "
         "den stiger med inntekten, proporsjonalt når den er konstant og regressivt når den faller.</p>"
         "<p><b>Steg 1: flat sats uten bunnfradrag.</b> 28 % av all inntekt gir 28 % for alle. Proporsjonalt.</p>"
         "<p><b>Steg 2: flat sats med bunnfradrag.</b> 28 % over kr 50 gir Kari med 500 skatt (500 − 50) × 28 % = "
         "126, altså 25,2 %. Per med 1 000 betaler 266, altså 26,6 % [H2024 oppgave 4]. Progressivt.</p>"
         "<p><b>Steg 3: formelen.</b> t̄ = t × (1 − B/Y) stiger i Y for enhver B &gt; 0.</p>"
         "<p><b>Kontroll.</b> Med B = 200 blir tallene 16,8 % og 22,4 %. Avstanden øker fra 1,4 til 5,6 prosentpoeng, "
         "så større bunnfradrag gir sterkere progresjon ✓.</p>"
         "<p><b>Husk:</b> flat er ikke det samme som proporsjonal. Det er gjennomsnittsskatten som avgjør.</p>",
)

statisk(
    "noy-s18", tema="noytralitet", type="tolkning",
    q="<p>Inntekt skattlegges med 25 % over et bunnfradrag på kr 60 000. Kari tjener kr 300 000 og Per kr 900 000. "
      "Bunnfradraget heves til kr 120 000, mens satsen er den samme. Mål progresjonen som forskjellen mellom Pers og "
      "Karis gjennomsnittsskatt. Hva skjer med progresjonen?</p>",
    alternativer=[
        R("Den blir sterkere: forskjellen øker fra 3,33 til 6,67 prosentpoeng"),
        F("Den er uendret: begge får like stor skattelette, 15 000 kroner hver", "Begge sparer 15 000 kroner, men for Kari er "
                                                                      "det en større andel av inntekten. Det er "
                                                                      "andelen som teller."),
        F("Den blir svakere: begge betaler mindre skatt enn før endringen", "Lavere skatt for begge sier ingenting om "
                                                                  "progresjonen. Den måles med forskjellen i "
                                                                  "gjennomsnittsskatt."),
        F("Den er uendret: satsen er den samme i begge systemene", "Satsen er lik, men bunnfradraget er større. "
                                                                   "Større bunnfradrag gir sterkere progresjon."),
    ],
    kort="<p><b>Sterkere, fra 3,33 til 6,67 prosentpoeng.</b> Forskjellen er 25 % × B × (1/300 000 − 1/900 000). "
         "Den dobles når B dobles.</p>",
    full="<p><b>Hva som måles.</b> Gjennomsnittsskatten med flat sats og bunnfradrag er 25 % × (1 − B/Y). Avstanden "
         "mellom to inntekter er 25 % × B × (1/Y<sub>lav</sub> − 1/Y<sub>høy</sub>), som vokser med B.</p>"
         "<p><b>Steg 1: før.</b> Kari: 25 % × 240 000/300 000 = 20,00 %. Per: 25 % × 840 000/900 000 = 23,33 %. "
         "Forskjell 3,33 prosentpoeng.</p>"
         "<p><b>Steg 2: etter.</b> Kari: 25 % × 180 000/300 000 = 15,00 %. Per: 25 % × 780 000/900 000 = 21,67 %. "
         "Forskjell 6,67 prosentpoeng.</p>"
         "<p><b>Steg 3: konklusjon.</b> Forskjellen øker. Progresjonen blir sterkere.</p>"
         "<p><b>Kontroll med formelen.</b> 25 % × 60 000 × (1/300 000 − 1/900 000) = 15 000 × 2/900 000 = 3,33 "
         "prosentpoeng ✓. Med 120 000 dobles det til 6,67 ✓.</p>"
         "<p><b>Hvorfor bunnfradraget gir progresjon.</b> Bunnfradraget er det samme kronebeløpet for alle. For en lav inntekt er det en stor andel av inntekten, for en høy inntekt en liten andel. Derfor faller gjennomsnittsskatten mest for den med lav inntekt når fradraget heves.</p>"
         "<p><b>Husk:</b> større bunnfradrag gir sterkere progresjon, selv med samme sats. Det var H2024 oppgave "
         "4c.</p>",
)

statisk(
    "noy-s19", tema="noytralitet", type="paastand",
    q="<p>Teorien om optimal inntektsbeskatning (Mirrlees) sier noe om når den optimale marginalskatten er høy. "
      "Hvilken påstand er riktig?</p>",
    alternativer=[
        R("Den er høyere jo lavere den kompenserte arbeidstilbudselastisiteten er"),
        F("Den er høyere jo mer elastisk det kompenserte arbeidstilbudet er", "Feil vei. Et elastisk grunnlag rømmer, så skatten "
                                                              "blir dyr i effektivitetstap."),
        F("Den er høyere jo mindre spredningen i produktivitet er mellom innbyggerne", "Feil vei. Liten spredning betyr lite å "
                                                                    "omfordele."),
        F("Den er høyere jo svakere ulikhetsaversjonen er", "Feil vei. Sterkere ulikhetsaversjon gjør omfordeling "
                                                            "mer verdt og løfter satsen."),
    ],
    kort="<p><b>Lav elastisitet gir høy optimal sats.</b> Grunnlaget rømmer ikke, så skatten er billig i "
         "effektivitetstap. Stor produktivitetsspredning og sterk ulikhetsaversjon trekker også opp.</p>",
    full="<p><b>Avveiningen.</b> Optimal skatt veier omfordeling mot effektivitetstap. Myndighetene ser inntekten, "
         "men ikke evnen. Høyere marginalskatt gir mer proveny til omfordeling, men får folk til å jobbe mindre.</p>"
         "<p><b>Steg 1: elastisiteten.</b> Den kompenserte elastisiteten måler hvor mye folk jobber mindre når "
         "marginalskatten øker. Lav elastisitet betyr lite tap per krone skatt. Det er elastisitetsregelen fra "
         "insidens.</p>"
         "<p><b>Steg 2: spredningen.</b> Er produktiviteten svært ulik, er det mye å omfordele. Det løfter satsen.</p>"
         "<p><b>Steg 3: ulikhetsaversjonen.</b> Jo mer samfunnet verdsetter jevnere fordeling, jo høyere sats. Det "
         "er den eneste verdivurderingen av de tre.</p>"
         "<p><b>Kontroll med simuleringene.</b> Mirrlees fant en nesten lineær løsning: konstant eller svakt fallende "
         "marginalskatt og stigende gjennomsnittsskatt. Omfordelingen kommer fra bunnfradraget ✓.</p>"
         "<p><b>Husk:</b> lav elastisitet, stor spredning og sterk ulikhetsaversjon gir høy optimal marginalskatt.</p>",
)

statisk(
    "noy-s20", tema="noytralitet", type="begrep",
    q="<p>I modellen for bedriftens tilpasning krever bedriften høyere avkastning før skatt av egenkapitalfinansiert "
      "kapital enn av gjeldsfinansiert. Hva er grunnen i modellen?</p>",
    alternativer=[
        R("Bare renten på gjeld er en utbetaling som gir fradrag"),
        F("Egenkapital er mer risikabel for eierne enn gjeld", "Modellen har ingen risiko. Begge kronene koster det "
                                                               "samme, r, før skatt."),
        F("Långiverne krever sikkerhet i egenkapitalen", "Det er en grunn til at bedrifter ikke bare bruker gjeld i "
                                                         "praksis, men ikke grunnen til forskjellen i kravene."),
        F("Egenkapital har høyere alternativkostnad enn gjeld", "I modellen er alternativkostnaden den samme, r. "
                                                                "Forskjellen kommer bare av skattereglene."),
    ],
    kort="<p><b>Bare renten gir fradrag.</b> Egenkapitalens alternativkostnad er ingen utbetaling. Derfor er "
         "F′<sub>E</sub> = r/(1 − t) og F′<sub>G</sub> = r.</p>",
    full="<p><b>En skatteregel, ikke en finansiell lov.</b> I modellen koster begge kronene r. Forskjellen i kravene "
         "kommer bare av hva skatteloven gir fradrag for.</p>"
         "<p><b>Steg 1: gjeld.</b> Inntekten fra kronen skattlegges med t. Renten gir fradrag med t. De to stryker "
         "hverandre. Kravet er r.</p>"
         "<p><b>Steg 2: egenkapital.</b> Inntekten skattlegges med t, men alternativkostnaden gir ikke fradrag. "
         "Kravet blir r/(1 − t).</p>"
         "<p><b>Steg 3: hvis reglene endres.</b> Gir systemet fradrag også for en beregnet rente på egenkapitalen, "
         "blir F′<sub>E</sub> = F′<sub>G</sub> = r. Da er finansieringsvalget nøytralt.</p>"
         "<p><b>Kontroll med tall.</b> r = 5 % og t = 22 % [eksempeltall] gir kravene 5,00 % og 6,41 %. Med fradrag "
         "for egenkapitalrenten blir begge 5,00 % ✓.</p>"
         "<p><b>Hva som stopper hjørneløsningen.</b> Modellen sier at bedriften burde bruke bare gjeld. I praksis stopper konkurskostnader, långivernes krav om egenkapital og rentebegrensningsregler det.</p>"
         "<p><b>Husk:</b> gjeld er billigere enn egenkapital bare fordi renter gir fradrag.</p>",
)

statisk(
    "noy-s21", tema="noytralitet", type="begrep",
    q="<p>Hvorfor er det et nøytralitetsbrudd i formuesskatten å kjøpe primærbolig for lånte penger, sammenlignet "
      "med å sette de samme lånte pengene i banken?</p>",
    alternativer=[
        R("Boligen teller med 25 %, mens hele gjelden trekkes fra"),
        F("Renten på boliglånet gir fradrag med 47,4 % i inntektsskatten", "Rentefradraget er 22 % for alle. Det er dessuten en "
                                                         "inntektsskatt, ikke formuesskatt."),
        F("Bankinnskudd skattlegges med en høyere formuesskattesats enn bolig", "Satsen er den samme. Forskjellen ligger i "
                                                                      "verdsettingen."),
        F("Gjelden på boliglånet kan ikke trekkes fra i formuesgrunnlaget", "Feil: gjeld trekkes fra. Gjeld knyttet til "
                                                        "primærbolig avkortes ikke."),
    ],
    kort="<p><b>Rabatt på boligen, full gjeld.</b> Primærbolig teller med 25 % av verdien, mens gjelden trekkes fra "
         "fullt. Bankinnskuddet teller med 100 %, så der blir nettoen null.</p>",
    full="<p><b>Hva bruddet er.</b> To plasseringer finansiert på samme måte behandles ulikt i formuesskatten. Da "
         "vris valget mellom aktiva, som er nøyaktig det nøytralitet skal hindre.</p>"
         "<p><b>Steg 1: boligen.</b> Kjøp primærbolig for kr 4 000 000 i lån. Boligen teller med 4 000 000 × 25 % = "
         "1 000 000. Gjelden trekkes fra fullt. Gjeld på primærbolig avkortes ikke. Grunnlaget blir 1 000 000 − "
         "4 000 000 = −3 000 000.</p>"
         "<p><b>Steg 2: banken.</b> Sett de samme lånte pengene i banken. Innskuddet teller med 100 %. Netto: "
         "4 000 000 − 4 000 000 = 0.</p>"
         "<p><b>Steg 3: verdien av bruddet.</b> Har du annen formue over bunnfradraget, sparer boligkjøpet "
         "3 000 000 × 1,0 % = kr 30 000 i formuesskatt i året.</p>"
         "<p><b>Kontroll.</b> Forskjellen i grunnlag er 4 000 000 × (100 % − 25 %) = 3 000 000 ✓.</p>"
         "<p><b>Husk:</b> rabatt på eiendelen og full gjeld i fradrag gir en formuesskattearbitrasje.</p>",
)
