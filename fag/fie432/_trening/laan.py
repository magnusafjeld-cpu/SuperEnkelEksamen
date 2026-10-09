# -*- coding: utf-8 -*-
"""Eksamenstrening, tema «laan»: annuitet og serielån, renter og rentefradrag,
   effektiv rente og kredittkostnad, utlånsforskriften og avdragsfrihet.
   Manualkapittel 16, kjernepensum kj10. Regnerutinene er R17 og R18 i
   eksamens-DNA-en. Stresstesten følger dagens forskrift (+3 prosentpoeng,
   minst 7 %), ikke DNA-ens eldre +5.
"""
from trening_lib import *  # noqa: F401,F403

NAVN = ["Mira", "Jonas", "Selma", "Aksel", "Ingrid", "Tobias", "Nora", "Elias", "Sigrid", "Henrik",
        "Maja", "Ola", "Hanne", "Petter", "Lise", "Kristian", "Emil", "Ida", "Sofie", "Marius"]


def rtekst(rp):
    """Rente i prosent som tekst med så mange desimaler som trengs: 5 → «5 %», 4.5 → «4,5 %», 4.99 → «4,99 %»."""
    for d in (0, 1, 2):
        if abs(rp * 10 ** d - round(rp * 10 ** d)) < 1e-9:
            return prosent_tekst(rp, d)
    return prosent_tekst(rp, 3)


def restgjeld(L, m, n, A, t):
    """Restgjeld etter t terminer på et annuitetslån: nåverdien av de n − t terminene som gjenstår."""
    return A * annuitetsfaktor(m, n - t)


# ---------------------------------------------------------------------------
# lan-ann1 · Terminbeløpet på et annuitetslån
# ---------------------------------------------------------------------------
@familie("lan-ann1", tema="laan", antall=5, tittel="Terminbeløp på et annuitetslån")
def _(r):
    navn = r.choice(NAVN)
    if r.random() < 0.6:
        L = r.randrange(1_500_000, 5_000_001, 100_000)
        rp = r.choice([3.9, 4.2, 4.5, 4.8, 5.1, 5.4, 5.7, 6.0])
        aar = r.choice([15, 20, 25, 30])
        m, n = rp / 100 / 12, aar * 12
        A = annuitet(L, m, n)
        f1 = annuitet(L, rp / 100, aar) / 12
        t1 = (f"Årsannuiteten delt på tolv: {kr(annuitet(L, rp / 100, aar), 2)} / 12. Med månedlige terminer "
              f"betales og forrentes lånet tolv ganger i året, så terminbeløpet blir litt lavere.")
        f2 = L / n
        t2 = f"Bare avdraget, {tall(L)} / {n}. Renten mangler. Dette er den nedre grensen for terminbeløpet."
        f3 = L / n + L * m
        t3 = (f"Serielånets første termin: avdrag {tall(L / n, 2)} pluss renten på hele lånet {tall(L * m, 2)}. "
              f"Et annuitetslån har fast terminbeløp.")
        q = (f"<p>{navn} tar opp et boliglån på {kr(L)} som annuitetslån med nominell rente {rtekst(rp)}. "
             f"Løpetiden er {aar} år med månedlige etterskuddsvise terminer.</p>"
             f"<p>Hva blir terminbeløpet?</p>")
        mt, nt = f"{rtekst(rp)}/12 = {tall(m * 100, 4)} %", f"{aar} × 12 = {n}"
        termin = "måned"
    else:
        L = r.randrange(150_000, 600_001, 10_000)
        rp = r.choice([4.5, 4.99, 5.5, 5.9, 6.5, 7.2, 7.9, 8.5])
        aar = r.choice([3, 4, 5, 6, 7, 8, 10])
        m, n = rp / 100, aar
        A = annuitet(L, m, n)
        f1 = 12 * annuitet(L, rp / 100 / 12, aar * 12)
        t1 = (f"Regnet med månedlige terminer og ganget med tolv. Terminene er årlige, så m = {rtekst(rp)} og "
              f"n = {aar}.")
        f2 = L / n
        t2 = f"Bare avdraget, {tall(L)} / {n}. Renten mangler. Dette er den nedre grensen for terminbeløpet."
        f3 = L / n + L * m
        t3 = (f"Serielånets første termin: avdrag {tall(L / n, 2)} pluss renten på hele lånet {tall(L * m, 2)}. "
              f"Et annuitetslån har fast terminbeløp.")
        q = (f"<p>{navn} kjøper bil og tar opp et annuitetslån på {kr(L)} med nominell rente {rtekst(rp)}. "
             f"Løpetiden er {aar} år med én etterskuddsvis termin i året. Se bort fra gebyrer og skatt.</p>"
             f"<p>Hva blir det årlige terminbeløpet?</p>")
        mt, nt = f"{rtekst(rp)}", f"{aar}"
        termin = "år"
    ulike(A, f1, f2, f3, rel=0.004)

    af = annuitetsfaktor(m, n)
    alternativer = [R(kr(A, 2), A), F(kr(f1, 2), t1, f1), F(kr(f2, 2), t2, f2), F(kr(f3, 2), t3, f3)]
    kort = (f"<p><b>{kr(A, 2)}.</b> A = L × m/(1 − (1 + m)<sup>−n</sup>) med m = {mt} og n = {nt}: "
            f"{tall(L * m, 2)} / {tall(1 - (1 + m) ** -n, 6)} = {tall(A, 2)}.</p>")
    full = (
        f"<p><b>Hva et annuitetslån er.</b> Et annuitetslån har samme terminbeløp hver gang. Hver termin dekker først "
        f"renten på det som står igjen av lånet, resten er avdrag. Terminbeløpet er akkurat stort nok til at lånet er "
        f"nedbetalt i siste termin: A = L × m/(1 − (1 + m)<sup>−n</sup>), der m er renten per termin og n antall "
        f"terminer.</p>"
        f"<p><b>Steg 1: renten og antall terminer må passe sammen.</b> m = {mt} og n = {nt}.</p>"
        f"<p><b>Steg 2: telleren.</b> L × m = {tall(L)} × {tall(m, 6)} = {tall(L * m, 2)}. Det er også renten i "
        f"første termin.</p>"
        f"<p><b>Steg 3: nevneren.</b> (1 + m)<sup>−n</sup> = {tall((1 + m) ** -n, 6)}, så nevneren er "
        f"{tall(1 - (1 + m) ** -n, 6)}.</p>"
        f"<p><b>Steg 4: terminbeløpet.</b> {tall(L * m, 2)} / {tall(1 - (1 + m) ** -n, 6)} = <b>{kr(A, 2)}</b> per "
        f"{termin}.</p>"
        f"<p><b>Kontroll:</b> nåverdien av alle terminene skal være lånet. Annuitetsfaktoren er "
        f"{tall(1 - (1 + m) ** -n, 6)} / {tall(m, 6)} = {tall(af, 4)}. {tall(A, 2)} × {tall(af, 4)} = "
        f"{tall(A * af)} ✓. Svaret må også ligge over avdraget alene, {tall(L / n, 2)}. Det må ligge under serielånets første "
        f"termin, {tall(L / n + L * m, 2)}.</p>"
        f"<p><b>Husk:</b> A = L × m/(1 − (1 + m)<sup>−n</sup>). Rente og antall terminer må måles i samme termin.</p>"
    )
    return sporsmal(q, alternativer, kort, full)


# ---------------------------------------------------------------------------
# lan-ren1 · Renter første år, rentefradraget og rentekostnaden etter skatt
# ---------------------------------------------------------------------------
@familie("lan-ren1", tema="laan", antall=6, tittel="Renter og rentefradrag første år")
def _(r):
    navn = r.choice(NAVN)
    marg = r.choice([33.6, 43.3, 46.4, 47.4])
    if r.random() < 0.7:
        L = r.randrange(2_000_000, 5_000_001, 100_000)
        rp = r.choice([4.2, 4.5, 4.8, 5.1, 5.4, 5.7, 6.0])
        aar = r.choice([20, 25, 30])
        m, n = rp / 100 / 12, aar * 12
        A = rund(annuitet(L, m, n), 2)
        R12 = rund(restgjeld(L, m, n, annuitet(L, m, n), 12))
        avdrag = L - R12
        renter = 12 * A - avdrag
        rL = rp / 100 * L
        spor = r.choice(["fradrag", "netto", "renter"])
        q0 = (f"<p>{navn} har et annuitetslån på {kr(L)} med nominell rente {rtekst(rp)} over {aar} år, med "
              f"månedlige terminer. Terminbeløpet er {kr(A, 2)}. Etter tolv terminer er restgjelden {kr(R12)}. "
              f"Renter gir fradrag i alminnelig inntekt, som skattlegges med 22 %. Marginalskatten til {navn} på "
              f"lønn er {prosent_tekst(marg)}.</p>")
        steg = (f"<p><b>Steg 1: avdragene første år.</b> Lånet minus restgjelden: {tall(L)} − {tall(R12)} = "
                f"{tall(avdrag)}.</p>"
                f"<p><b>Steg 2: rentene.</b> Alt som er betalt, minus avdragene: 12 × {tall(A, 2)} − {tall(avdrag)} = "
                f"{talla(renter)}.</p>")
        kontroll = (f"<p><b>Kontroll:</b> rentene må ligge litt under {rtekst(rp)} × {tall(L)} = {tall(rL)}. Bare første "
                    f"termin forrenter hele lånet. Hver termin etter det forrenter en litt lavere restgjeld. "
                    f"{talla(renter)} ligger under ✓.</p>")
        if spor == "fradrag":
            riktig = 0.22 * renter
            fl = [(0.22 * rL, f"Renter av hele lånet i tolv måneder: 22 % × {tall(rL)}. Saldoen faller gjennom året."),
                  (0.22 * 12 * A, "Fradrag for hele terminbeløpet. Avdragene er tilbakebetaling og gir ikke fradrag."),
                  (marg / 100 * renter, f"Marginalskatten på lønn brukt. Renter trekkes fra i alminnelig inntekt, verdt 22 %.")]
            sp = f"Hvor mye reduserer rentefradraget skatten til {navn} det første året?"
            svar = f"22 % × {talla(renter)} = {kr(riktig)}"
        elif spor == "netto":
            riktig = 0.78 * renter
            fl = [(0.78 * rL, f"Renter av hele lånet i tolv måneder: 78 % × {tall(rL)}. Saldoen faller gjennom året."),
                  (0.22 * renter, "Dette er fradraget, ikke det rentene koster etter fradraget."),
                  (0.78 * 12 * A, "Hele terminbeløpet behandlet som rente. Avdragene er tilbakebetaling, ikke kostnad.")]
            sp = f"Hva koster rentene {navn} det første året etter rentefradraget?"
            svar = f"78 % × {talla(renter)} = {kr(riktig)}"
        else:
            riktig = renter
            fl = [(rL, f"Rentesatsen ganget med hele lånet: {rtekst(rp)} × {tall(L)}. Det er renten på et lån som aldri nedbetales."),
                  (12 * A, "Alt som er betalt i løpet av året. Avdragene er med."),
                  (avdrag, "Dette er avdragene, lånet minus restgjelden. Rentene er resten av betalingene.")]
            sp = f"Hvor mye betaler {navn} i renter det første året?"
            svar = f"{kr(riktig)}"
        kort = (f"<p><b>{kr(riktig)}.</b> Avdrag {tall(L)} − {tall(R12)} = {tall(avdrag)}. Renter 12 × {tall(A, 2)} − "
                f"{tall(avdrag)} = {talla(renter)}." + ("" if spor == "renter" else f" Svaret: {svar}.") + "</p>")
    else:
        L = r.randrange(150_000, 600_001, 10_000)
        rp = r.choice([4.5, 5.5, 5.9, 6.5, 7.2, 7.9])
        aar = r.choice([4, 5, 6, 8])
        A = rund(annuitet(L, rp / 100, aar), 2)
        rL = rp / 100 * L
        renter = rL
        riktig = 0.22 * rL
        fl = [(0.22 * A, "Fradrag for hele terminbeløpet. Avdraget er tilbakebetaling og gir ikke fradrag."),
              (marg / 100 * rL, "Marginalskatten på lønn brukt. Renter trekkes fra i alminnelig inntekt, verdt 22 %."),
              (0.78 * rL, "Dette er hva rentene koster etter fradraget, ikke fradraget.")]
        q0 = (f"<p>{navn} har et billån på {kr(L)} som annuitetslån med nominell rente {rtekst(rp)} over {aar} år, "
              f"med én etterskuddsvis termin i året. Terminbeløpet er {kr(A, 2)}. Renter gir fradrag i alminnelig "
              f"inntekt, som skattlegges med 22 %. Marginalskatten til {navn} på lønn er {prosent_tekst(marg)}.</p>")
        sp = f"Hvor mye reduserer rentefradraget skatten til {navn} for det første året?"
        steg = (f"<p><b>Steg 1: rentene første år.</b> Med én årlig termin står hele lånet ute i hele første år: "
                f"{rtekst(rp)} × {tall(L)} = {talla(rL)}.</p>"
                f"<p><b>Steg 2: avdraget.</b> Resten av terminen er avdrag: {tall(A, 2)} − {talla(rL)} = "
                f"{talla(rund(A - rL, 2))}. Det gir ikke fradrag.</p>")
        kontroll = (f"<p><b>Kontroll:</b> avdraget i steg 2 må være positivt og litt under lånet delt på antall år, "
                    f"{tall(L)} / {aar} = {talla(rund(L / aar, 2))}, fordi et annuitetslån betaler lite ned i starten. "
                    f"{talla(rund(A - rL, 2))} ligger under ✓. Hadde du trukket fra mer enn rentene, ville avdraget "
                    f"blitt for lite.</p>")
        kort = (f"<p><b>{kr(riktig)}.</b> Med én årlig termin er første års rente {rtekst(rp)} × {tall(L)} = "
                f"{talla(rL)}. Fradraget er 22 % av det.</p>")
        spor = "fradrag"
    ulike(riktig, *[v for v, _ in fl], rel=0.006)

    q = q0 + f"<p>{sp}</p>"
    alternativer = [R(kr(riktig), riktig)] + [F(kr(v), t, v) for v, t in fl]
    slutt = {"fradrag": f"<p><b>Steg 3: fradraget.</b> 22 % × {talla(renter)} = <b>{kr(riktig)}</b>. Satsen er 22 % "
                        f"uansett marginalskatt, fordi renter trekkes fra i alminnelig inntekt.</p>",
             "netto": f"<p><b>Steg 3: etter skatt.</b> Fradraget er 22 % × {talla(renter)} = {kr(0.22 * renter)}. "
                      f"Nettokostnaden er 78 % × {talla(renter)} = <b>{kr(riktig)}</b>.</p>",
             "renter": f"<p><b>Steg 3: svaret.</b> Rentene første år er <b>{kr(riktig)}</b>. Fradraget er 22 % av "
                       f"det, {kr(0.22 * renter)}.</p>"}[spor]
    full = (
        f"<p><b>Hva rentene er.</b> Hver termin på et annuitetslån er renter pluss avdrag. Renten regnes av det som "
        f"står ubetalt. Avdragene er tilbakebetaling av lånet og er ingen kostnad. Bare rentene gir fradrag i "
        f"alminnelig inntekt. Det fradraget er verdt 22 %, uansett hvor høy marginalskatten på lønn er.</p>"
        + steg + slutt + kontroll +
        f"<p><b>Husk:</b> renter = betalt − avdrag. Fradraget er 22 % av rentene, aldri av terminbeløpet.</p>"
    )
    return sporsmal(q, alternativer, kort, full)


# ---------------------------------------------------------------------------
# lan-sum1 · Samlet rentekostnad: annuitet mot serielån
# ---------------------------------------------------------------------------
@familie("lan-sum1", tema="laan", antall=6, tittel="Samlet rentekostnad over løpetiden")
def _(r):
    navn = r.choice(NAVN)
    type_ = r.choice(["annuitet", "annuitet", "annuitet", "serie", "serie"])
    if r.random() < 0.6:
        L = r.randrange(200_000, 1_000_001, 25_000)
        rp = r.choice([3.0, 4.0, 4.5, 5.0, 6.0, 7.5, 9.0, 12.0])
        n = r.choice([5, 8, 10, 12, 15])
        aar = n
        m, termin, nt = rp / 100, "år", f"{n} årlige"
        gi_A = True
        annen = m * L * n / 2                                                   # renten på halve lånet hele tiden
        annen_tekst = (f"Renten på halve lånet i hele løpetiden, {tall(m * L, 2)} × {n}/2, som om gjelden falt "
                       f"lineært. Et annuitetslån har mer gjeld ute, fordi avdragene er små i starten.")
    else:
        L = r.randrange(1_500_000, 4_000_001, 100_000)
        rp = r.choice([4.2, 4.8, 5.1, 5.4, 6.0])
        aar = r.choice([20, 25])
        m, n, termin, nt = rp / 100 / 12, aar * 12, "måned", f"{aar * 12} månedlige"
        gi_A = False
        annen = aar * annuitet(L, rp / 100, aar) - L                             # årsannuiteten brukt
        annen_tekst = (f"Regnet med årlige terminer: {aar} × årsannuiteten {tall(annuitet(L, rp / 100, aar), 2)} − "
                       f"{tall(L)}. Terminene er månedlige, så lånet nedbetales litt raskere.")
    A = annuitet(L, m, n) if not gi_A else rund(annuitet(L, m, n), 2)
    ad = 4 if not gi_A else 2                                                    # desimaler i visningen av A
    ann_sum = n * A - L
    serie_sum = m * L * (n + 1) / 2
    if type_ == "annuitet":
        riktig = ann_sum
        fl = [(n * A, f"Alt som betales, {n} × {tall(A, ad)}, uten å trekke fra lånet. Avdragene er tilbakebetaling."),
              (m * L * n, f"Renten på hele lånet i alle terminene, {tall(m * L, 2)} × {n}. Gjelden faller underveis."),
              (serie_sum, f"Serielånets rentesum, m × L × (n + 1)/2. Et annuitetslån nedbetales saktere i starten og "
                          f"gir flere kroner i renter."),
              (annen, annen_tekst)]
        fl = r.sample(fl, 3)
        q = (f"<p>{navn} tar opp et annuitetslån på {kr(L)} med nominell rente {rtekst(rp)} og {nt} etterskuddsvise "
             f"terminer." + (f" Terminbeløpet er {kr(A, 2)}." if gi_A else "") + " Se bort fra gebyrer og skatt.</p>"
             f"<p>Hvor mye betaler {navn} i renter til sammen over hele løpetiden?</p>")
        kort = (f"<p><b>{kr(riktig)}.</b> " + ("" if gi_A else f"Terminbeløpet er {tall(L * m, 2)} / "
                f"(1 − {tall(1 + m, 6)}<sup>−{n}</sup>) = {tall(A, ad)}. ") + f"Alt som betales, minus lånet: "
                f"{n} × {tall(A, ad)} − {tall(L)} = {talla(rund(riktig, 2))}.</p>")
        steg0 = ("" if gi_A else
                 f"<p><b>Steg 0: terminbeløpet.</b> m = {rtekst(rp)}/12 og n = {n}: A = {tall(L)} × {tall(m, 6)} / "
                 f"(1 − {tall(1 + m, 6)}<sup>−{n}</sup>) = {tall(A, ad)}.</p>")
        steg = steg0 + (f"<p><b>Steg 1: alt som betales.</b> {n} × {tall(A, ad)} = {talla(rund(n * A, 2))}.</p>"
                f"<p><b>Steg 2: trekk fra lånet.</b> Avdragene summerer seg alltid til lånet, {tall(L)}. Resten er "
                f"renter: {talla(rund(n * A, 2))} − {tall(L)} = <b>{kr(riktig)}</b>.</p>"
                f"<p><b>Kontroll:</b> rentesummen må ligge mellom serielånets {kr(serie_sum)} og renten på hele lånet "
                f"i alle terminene, {kr(m * L * n)}. Annuitetslånet har mer gjeld ute enn serielånet, men mindre enn "
                f"et lån som aldri nedbetales ✓.</p>")
    else:
        riktig = serie_sum
        fl = [(m * L * n / 2, f"Leddet + 1 mangler: m × L × n/2. Gjennomsnittlig restgjeld er L × (n + 1)/(2n), ikke L/2."),
              (m * L * n, f"Renten på hele lånet i alle terminene, {tall(m * L, 2)} × {n}. Gjelden faller underveis."),
              (ann_sum, f"Annuitetslånets rentesum, n × A − L. Et serielån nedbetales raskere og gir færre kroner i renter."),
              (L + serie_sum, f"Alt som betales, avdrag og renter, uten å trekke fra lånet på {tall(L)}.")]
        fl = r.sample(fl, 3)
        q = (f"<p>{navn} tar opp et serielån på {kr(L)} med nominell rente {rtekst(rp)} og {nt} etterskuddsvise "
             f"terminer. Se bort fra gebyrer og skatt.</p>"
             f"<p>Hvor mye betaler {navn} i renter til sammen over hele løpetiden?</p>")
        kort = (f"<p><b>{kr(riktig)}.</b> Serielån: m × L × (n + 1)/2 = {tall(m * L, 2)} × {n + 1}/2 = "
                f"{talla(rund(riktig, 2))}.</p>")
        steg = (f"<p><b>Steg 1: avdraget.</b> {tall(L)} / {n} = {tall(L / n, 2)} per {termin}, likt hele veien.</p>"
                f"<p><b>Steg 2: renten i første og siste termin.</b> Første: {tall(L)} × {tall(m, 6)} = "
                f"{tall(m * L, 2)}. Siste: restgjelden er da ett avdrag, så renten er {tall(m * L / n, 2)}.</p>"
                f"<p><b>Steg 3: summen.</b> Rentene faller lineært, så summen er antall terminer ganger snittet av "
                f"første og siste: {n} × ({tall(m * L, 2)} + {tall(m * L / n, 2)})/2 = <b>{kr(riktig)}</b>. Det er det "
                f"samme som m × L × (n + 1)/2.</p>"
                f"<p><b>Kontroll:</b> et annuitetslån med samme rente og løpetid har terminbeløp {tall(A, ad)} og "
                f"rentesum {n} × {tall(A, ad)} − {tall(L)} = {talla(rund(ann_sum, 2))}. Serielånet må være billigere i "
                f"sum. Det er det ✓.</p>")
    ulike(riktig, *[v for v, _ in fl], rel=0.002)
    alternativer = [R(kr(riktig), riktig)] + [F(kr(v), t, v) for v, t in fl]
    full = (
        f"<p><b>Hva rentesummen er.</b> Over hele løpetiden betaler du tilbake lånet og i tillegg renter. Avdragene "
        f"summerer seg alltid til lånebeløpet, så rentesummen er alt du betaler minus lånet. I et annuitetslån er "
        f"terminbeløpet fast og avdraget lite i starten. I et serielån er avdraget fast. Gjelden faller raskere. "
        f"Derfor gir serielånet lavere rentesum.</p>"
        + steg +
        f"<p><b>Husk:</b> annuitet: rentesum = n × A − L. Serielån: rentesum = m × L × (n + 1)/2.</p>"
    )
    return sporsmal(q, alternativer, kort, full)


# ---------------------------------------------------------------------------
# lan-eff1 · Effektiv rente med etableringsgebyr og termingebyr
# ---------------------------------------------------------------------------
@familie("lan-eff1", tema="laan", antall=5, tittel="Effektiv rente med gebyrer")
def _(r):
    navn = r.choice(NAVN)
    L = r.randrange(150_000, 600_001, 10_000)
    rp = r.choice([4.5, 4.99, 5.5, 5.9, 6.5, 7.2, 7.9])
    n = r.choice([3, 4, 5, 6])
    E = r.randrange(1_500, 7_501, 250)
    T = r.randrange(300, 1_501, 60)
    A = rund(annuitet(L, rp / 100, n), 2)
    ut = L - E
    betaling = A + T
    reff = internrente([ut] + [-betaling] * n)
    bare_t = internrente([L] + [-betaling] * n)
    bare_e = internrente([ut] + [-A] * n)
    pluss = rp / 100 + (E + n * T) / L
    dobbel = internrente([ut - n * T] + [-betaling] * n)
    kandidater = [
        F(pst(rp / 100, 2), "Den nominelle renten. Gebyrene er ikke tatt med. Med gebyrer er effektiv rente alltid høyere.", rp / 100),
        F(pst(bare_t, 2), f"Bare termingebyret: internrenten av {tall(L)} mot {tall(betaling, 2)} i {n} år. "
                          f"Etableringsgebyret på {tall(E)} mangler.", bare_t),
        F(pst(bare_e, 2), f"Bare etableringsgebyret: internrenten av {tall(ut)} mot {tall(A, 2)} i {n} år. "
                          f"Termingebyrene mangler.", bare_e),
        F(pst(pluss, 2), f"Gebyrene lagt sammen, delt på lånet og lagt på renten: {rtekst(rp)} + "
                         f"({tall(E)} + {n} × {tall(T)})/{tall(L)}. Gebyrene er kroner på bestemte tidspunkter, ikke "
                         f"prosentpoeng.", pluss),
        F(pst(dobbel, 2), f"Termingebyrene telt to ganger: trukket fra beløpet i dag, {tall(ut)} − {n} × {tall(T)}, i "
                          f"tillegg til hver betaling. De betales bare sammen med terminene.", dobbel),
    ]
    feil = [kandidater[0]] + r.sample(kandidater[1:], 2)
    ulike(reff, *[x.verdi for x in feil], rel=0.008)
    if min(abs(reff - x.verdi) for x in feil) < 0.0006:
        raise Avvis("for tett på fasiten")

    af = annuitetsfaktor(round(reff, 4), n)
    af_nom = annuitetsfaktor(rp / 100, n)
    # gjennomsnittlig restgjeld ved inngangen til hvert år, for størrelseskontrollen
    saldo, sum_saldo = L, 0
    for _ in range(n):
        sum_saldo += saldo
        saldo = saldo * (1 + rp / 100) - A
    snitt = sum_saldo / n
    gebyr_aar = (E + n * T) / n

    q = (f"<p>{navn} får tilbud om et annuitetslån på {kr(L)} med nominell rente {rtekst(rp)} over {n} år, med "
         f"én etterskuddsvis termin i året. Terminbeløpet uten gebyrer er {kr(A, 2)}. Etableringsgebyret er "
         f"{kr(E)} og trekkes fra når lånet utbetales. Termingebyret er {kr(T)} og betales sammen med hver termin. "
         f"Se bort fra skatt.</p><p>Hva er den effektive renten på lånet?</p>")
    alternativer = [R(pst(reff, 2), reff)] + feil
    kort = (f"<p><b>{pst(reff, 2)}.</b> Internrenten der {tall(ut)} (lånet minus etableringsgebyret) er lik nåverdien "
            f"av {n} betalinger på {tall(betaling, 2)} (terminbeløp pluss termingebyr).</p>")
    full = (
        f"<p><b>Hva effektiv rente er.</b> Effektiv rente er den renten som gjør nåverdien av alt du betaler lik det du "
        f"faktisk får utbetalt. Den tar med gebyrene, som den nominelle renten ikke gjør. Etableringsgebyret reduserer "
        f"det du mottar i dag. Termingebyret legges på hver betaling.</p>"
        f"<p><b>Steg 1: kontantstrømmen.</b> I dag mottar {navn} {tall(L)} − {tall(E)} = {tall(ut)}. I hvert av de "
        f"{n} årene betales {tall(A, 2)} + {tall(T)} = {tall(betaling, 2)}.</p>"
        f"<p><b>Steg 2: sett inn alternativene baklengs.</b> Ved {pst(reff, 2)} er annuitetsfaktoren over {n} år "
        f"{tall(af, 4)}. {tall(ut)} / {tall(af, 4)} = {tall(ut / af, 2)}. Det er praktisk talt betalingen, så renten "
        f"stemmer (den eksakte internrenten er {pst(reff, 4)}). "
        f"Ved den nominelle {rtekst(rp)} er faktoren {tall(af_nom, 4)}. {tall(ut)} / {tall(af_nom, 4)} = "
        f"{tall(ut / af_nom, 2)}. Det er lavere enn betalingen, så den effektive renten må være høyere.</p>"
        f"<p><b>Steg 3: svaret.</b> Effektiv rente er <b>{pst(reff, 2)}</b>.</p>"
        f"<p><b>Kontroll av størrelsen:</b> gebyrene er {tall(E)} + {n} × {tall(T)} = {tall(E + n * T)}, altså "
        f"{tall(gebyr_aar)} i året. Gjennomsnittlig restgjeld ved inngangen til årene er {tall(snitt)}. "
        f"{tall(gebyr_aar)} / {tall(snitt)} = {pst(gebyr_aar / snitt, 2)}. Den effektive renten må ligge nær "
        f"{rtekst(rp)} pluss omtrent det: {pst(rp / 100 + gebyr_aar / snitt, 2)} ✓.</p>"
        f"<p><b>Husk:</b> effektiv rente = internrenten der lånet minus etableringsgebyret er lik nåverdien av "
        f"terminbeløp pluss termingebyr.</p>"
    )
    return sporsmal(q, alternativer, kort, full)


# ---------------------------------------------------------------------------
# lan-kre1 · Kredittkostnad: renter og gebyrer, udiskontert
# ---------------------------------------------------------------------------
@familie("lan-kre1", tema="laan", antall=5, tittel="Kredittkostnaden på et lån")
def _(r):
    navn = r.choice(NAVN)
    L = r.randrange(150_000, 600_001, 10_000)
    rp = r.choice([4.99, 5.5, 5.9, 6.5, 7.2, 7.9, 8.5])
    if r.random() < 0.5:
        n, m, ord_termin, t_ord = r.choice([3, 4, 5, 6]), rp / 100, "årlige", "år"
        E, T = r.randrange(2_000, 7_001, 250), r.randrange(500, 1_501, 50)
        nt = f"{n} år med én etterskuddsvis termin i året"
    else:
        aar = r.choice([3, 4, 5])
        n, m, ord_termin, t_ord = aar * 12, rp / 100 / 12, "månedlige", "måned"
        E, T = r.randrange(1_500, 4_001, 250), r.choice([45, 55, 65, 75, 95])
        nt = f"{aar} år med månedlige etterskuddsvise terminer"
    A = rund(annuitet(L, m, n), 2)
    betalt = n * (A + T) + E
    riktig = betalt - L
    renter = n * A - L
    kandidater = [
        F(kr(betalt), f"Alt som betales, {tall(betalt)}, uten å trekke fra lånet. Kredittkostnaden er det du betaler "
                      f"utover det du fikk låne.", betalt),
        F(kr(renter), f"Bare rentene, {n} × {tall(A, 2)} − {tall(L)}. Gebyrene er også kostnader ved kreditten.", renter),
        F(kr(renter + n * T), f"Etableringsgebyret på {tall(E)} mangler.", renter + n * T),
        F(kr(renter + E), f"Termingebyrene, {n} × {tall(T)} = {tall(n * T)}, mangler.", renter + E),
        F(kr(m * L * n + n * T + E), f"Renten regnet av hele lånet i alle terminene, {tall(m * L, 2)} × {n}, pluss "
                                     f"gebyrene. Lånet nedbetales underveis, så rentene blir lavere.", m * L * n + n * T + E),
    ]
    feil = r.sample(kandidater, 3)
    ulike(riktig, *[x.verdi for x in feil], rel=0.005)

    q = (f"<p>{navn} tar opp et annuitetslån på {kr(L)} med nominell rente {rtekst(rp)} over {nt}. Terminbeløpet "
         f"uten gebyrer er {kr(A, 2)}. Etableringsgebyret er {kr(E)}. Termingebyret er {kr(T)} per termin. "
         f"Kredittkostnaden er alle kostnadene ved kreditten, renter og gebyrer, summert uten diskontering.</p>"
         f"<p>Hva er kredittkostnaden?</p>")
    alternativer = [R(kr(riktig), riktig)] + feil
    kort = (f"<p><b>{kr(riktig)}.</b> Renter {n} × {tall(A, 2)} − {tall(L)} = {talla(rund(renter, 2))}, pluss "
            f"termingebyrer {tall(n * T)} og etableringsgebyr {tall(E)}.</p>")
    full = (
        f"<p><b>Hva kredittkostnaden er.</b> Kredittkostnaden er det lånet koster deg i kroner: alt du betaler utover "
        f"det du fikk låne. Den summeres uten diskontering. Den er altså ikke en rente, men et kronebeløp. Avdragene er "
        f"ingen kostnad, fordi de bare betaler tilbake lånet.</p>"
        f"<p><b>Steg 1: rentene.</b> {n} × {tall(A, 2)} = {talla(rund(n * A, 2))}, minus lånet {tall(L)}: "
        f"{talla(rund(renter, 2))}.</p>"
        f"<p><b>Steg 2: gebyrene.</b> Termingebyrer {n} × {tall(T)} = {tall(n * T)}. Etableringsgebyr {tall(E)}.</p>"
        f"<p><b>Steg 3: sum.</b> {talla(rund(renter, 2))} + {tall(n * T)} + {tall(E)} = <b>{kr(riktig)}</b>.</p>"
        f"<p><b>Kontroll den andre veien:</b> alt som betales er {n} × ({tall(A, 2)} + {tall(T)}) + {tall(E)} = "
        f"{talla(rund(betalt, 2))}. Minus lånet {tall(L)} gir {talla(rund(riktig, 2))} ✓. Glemmer du å trekke fra "
        f"lånet, får du det farligste gale alternativet.</p>"
        f"<p><b>Husk:</b> kredittkostnad = alle betalinger og gebyrer − lånet, udiskontert. Det er renter pluss "
        f"gebyrer.</p>"
    )
    return sporsmal(q, alternativer, kort, full)


# ---------------------------------------------------------------------------
# lan-tak1 · Lånetaket etter utlånsforskriften
# ---------------------------------------------------------------------------
@familie("lan-tak1", tema="laan", antall=6, tittel="Lånetaket etter utlånsforskriften")
def _(r):
    navn = r.choice(NAVN)
    binder = r.choice(["gjeld", "belaning", "stress"])
    I = r.randrange(550_000, 1_100_001, 10_000)
    S = r.choice([0, 150_000, 200_000, 250_000, 300_000, 350_000, 400_000, 450_000])
    bil = r.choice([0, 0, 0, 120_000, 180_000])
    andel = r.choice([34, 36, 38, 40, 42, 45])
    D = I * andel / 100
    rp = r.choice([3.0, 3.5, 4.5, 5.0, 5.5, 6.0])
    stress = max(rp + 3, 7.0)
    feil_gulv = 7.0 if rp + 3 > 7 else rp + 3
    gammel = rp + 5
    AF = {x: rund(annuitetsfaktor(x / 100, 30), 4) for x in sorted({rp, stress, feil_gulv, gammel, 7.0})}
    g = 5 * I - S - bil
    st = D * AF[stress]
    if binder == "belaning":
        P = rund(min(g, st) * r.uniform(0.85, 0.95) / 0.9 / 50_000) * 50_000
    else:
        P = rund(min(g, st) * r.uniform(1.06, 1.25) / 0.9 / 50_000) * 50_000
    b = 0.9 * P
    skranker = {"gjeld": g, "belaning": b, "stress": st}
    riktig = min(skranker.values())
    if min(skranker, key=skranker.get) != binder:
        raise Avvis("feil skranke binder")
    if g <= 0:
        raise Avvis("negativ gjeldsgrad")

    gjeld_deler = [x for x in [f"et studielån på {kr(S)}" if S else "", f"et billån på {kr(bil)}" if bil else ""] if x]
    tekster = {
        "gjeld": (g, f"Gjeldsgradskravet: 5 × {tall(I)}" + (f" − {tall(S + bil)}" if S + bil else "") + f" = {tall(g)}. "
                     f"Det binder ikke her."),
        "belaning": (b, f"Belåningsgraden: 90 % × {tall(P)} = {tall(b)}. Egenkapitalkravet binder ikke her."),
        "stress": (st, f"Stresstesten: {tall(D)} × {tall(AF[stress], 4)} = {tall(st)}. Den binder ikke her."),
    }
    feil = [F(kr(v), t, v) for k, (v, t) in tekster.items() if k != binder]
    st_gammel = D * AF[gammel]
    st_gulv = D * AF[feil_gulv]
    if r.random() < 0.6:
        feil.append(F(kr(st_gammel), f"Det gamle påslaget på 5 prosentpoeng, {rtekst(gammel)}: {tall(D)} × "
                                     f"{tall(AF[gammel], 4)}. Dagens forskrift krever 3 prosentpoeng, minst 7 %.", st_gammel))
    elif S + bil > 0 and binder == "gjeld":
        feil.append(F(kr(5 * I), f"Eksisterende gjeld glemt i femgangeren: 5 × {tall(I)}. Studielån og billån teller "
                                 f"med i samlet gjeld.", 5 * I))
    else:
        tekst = (f"Stresset til gulvet på 7 % i stedet for {rtekst(rp)} + 3 = {rtekst(stress)}. Gulvet gjelder bare når "
                 f"renten pluss 3 prosentpoeng er under 7 %." if rp + 3 > 7 else
                 f"Stresset bare til {rtekst(rp)} + 3 = {rtekst(rp + 3)}. Det er under gulvet, så stresstesten skal "
                 f"bruke 7 %.")
        feil.append(F(kr(st_gulv), tekst, st_gulv))
    ulike(riktig, *[x.verdi for x in feil], rel=0.01)

    rader = "".join(f'<td class="n">{tall(AF[x], 4)}</td>' for x in AF)
    hode = "".join(f'<th class="n">{rtekst(x)}</th>' for x in AF)
    tabell = f'<table class="data"><tr><th>Rente</th>{hode}</tr><tr><td>Annuitetsfaktor, 30 år</td>{rader}</tr></table>'
    if len(gjeld_deler) == 2:
        inntekt_tekst = f"brutto årsinntekt {kr(I)}, {gjeld_deler[0]} og {gjeld_deler[1]}"
    elif gjeld_deler:
        inntekt_tekst = f"brutto årsinntekt {kr(I)} og {gjeld_deler[0]}"
    else:
        inntekt_tekst = f"brutto årsinntekt {kr(I)} og ingen annen gjeld"
    q = (f"<p>{navn} har {inntekt_tekst}. Boligen {navn} vil kjøpe, koster {kr(P)}. Banken regner at {andel} % av bruttoinntekten, {kr(D)} i året, kan "
         f"gå til renter og avdrag på boliglånet. Lånerenten er {rtekst(rp)}.</p>"
         f"<p>Utlånsforskriften: samlet gjeld kan ikke overstige 5 ganger brutto årsinntekt. Lånet kan ikke overstige "
         f"90 % av boligens verdi. Kunden må tåle renten pluss 3 prosentpoeng, men minst 7 %, regnet som et "
         f"annuitetslån over 30 år med årlige terminer.</p>{tabell}"
         f"<p>Hvor stort boliglån kan {navn} maksimalt få?</p>")
    navn_skranke = {"gjeld": "gjeldsgraden", "belaning": "belåningsgraden", "stress": "stresstesten"}[binder]
    kort = (f"<p><b>{kr(riktig)}.</b> Gjeldsgrad {tall(g)}, belåningsgrad {tall(b)}, stresstest {tall(st)}. Den "
            f"laveste binder: {navn_skranke}.</p>")
    gulvtekst = (f"{rtekst(rp)} + 3 = {rtekst(rp + 3)} er under gulvet, så renten stresses til 7 %."
                 if rp + 3 < 7 else f"{rtekst(rp)} + 3 = {rtekst(stress)} er over gulvet på 7 %, så gulvet biter ikke.")
    full = (
        f"<p><b>Hva utlånsforskriften gjør.</b> Banken kan ikke låne ut så mye den vil. Forskriften setter flere krav. "
        f"Lånet kan ikke bli større enn det strengeste av dem tillater. Du regner hver skranke for seg og svarer med "
        f"den laveste.</p>"
        f"<p><b>Steg 1: gjeldsgraden.</b> Samlet gjeld kan være 5 × {tall(I)} = {tall(5 * I)}. "
        + (f"Eksisterende gjeld på {tall(S + bil)} teller med, så boliglånet kan være {tall(g)}.</p>" if S + bil
           else f"{navn} har ingen annen gjeld, så boliglånet kan være {tall(g)}.</p>") +
        f"<p><b>Steg 2: belåningsgraden.</b> 90 % × {tall(P)} = {tall(b)}.</p>"
        f"<p><b>Steg 3: stresstesten.</b> {gulvtekst} Maks lån er betjeningsevnen ganger annuitetsfaktoren: "
        f"{tall(D)} × {tall(AF[stress], 4)} = {tall(st)}.</p>"
        f"<p><b>Steg 4: svaret.</b> Den laveste er {navn_skranke}: <b>{kr(riktig)}</b>.</p>"
        f"<p><b>Kontroll:</b> sjekk at lånet holder alle tre. Belåningsgraden blir {tall(riktig)}/{tall(P)} = "
        f"{pst(riktig / P, 1)}, ikke over 90 %. Ved stresset rente krever lånet {tall(riktig)}/{tall(AF[stress], 4)} = "
        f"{tall(riktig / AF[stress])} i året, ikke over {tall(D)} ✓.</p>"
        f"<p><b>Husk:</b> lånetaket er den laveste av 5 × inntekt minus annen gjeld, 90 % av boligverdien og "
        f"betjeningsevne × annuitetsfaktor ved renten + 3 prosentpoeng (minst 7 %).</p>"
    )
    alternativer = [R(kr(riktig), riktig)] + feil
    return sporsmal(q, alternativer, kort, full)


# ---------------------------------------------------------------------------
# lan-avf1 · Avdragsfrihet: nytt terminbeløp og hva det koster
# ---------------------------------------------------------------------------
@familie("lan-avf1", tema="laan", antall=5, tittel="Avdragsfrihet på et annuitetslån")
def _(r):
    navn = r.choice(NAVN)
    L = r.randrange(1_500_000, 4_500_001, 100_000)
    rp = r.choice([4.2, 4.5, 4.8, 5.1, 5.4, 6.0])
    aar = r.choice([20, 25, 30])
    k = r.choice([1, 2, 2, 3])
    m, n = rp / 100 / 12, aar * 12
    A = rund(annuitet(L, m, n), 2)
    rente_mnd = rund(L * m, 2)
    A2 = rund(annuitet(L, m, n - 12 * k), 2)
    spor = r.choice(["termin", "termin", "kost", "kost", "kost"])
    uten = n * A
    med = 12 * k * rente_mnd + (n - 12 * k) * A2
    mer = med - uten

    q0 = (f"<p>{navn} har nettopp tatt opp et annuitetslån på {kr(L)} med nominell rente {rtekst(rp)} over {aar} år, "
          f"med månedlige terminer. Terminbeløpet er {kr(A, 2)}. Før første termin blir {navn} permittert og får "
          f"{k * 12} måneders avdragsfrihet. I den perioden betales bare renter, {kr(rente_mnd, 2)} i måneden. Lånet skal fortsatt være "
          f"nedbetalt etter {aar} år, så de {n - 12 * k} terminene som gjenstår, må dekke hele lånet.</p>")
    if spor == "termin":
        riktig = A2
        serie = L / (n - 12 * k) + L * m
        fordelt = A + 12 * k * (A - rente_mnd) / (n - 12 * k)
        fl = [(A, "Terminbeløpet er uendret. Lånet er ikke nedbetalt noe i den avdragsfrie perioden. Færre terminer "
                  "skal nå dekke hele lånet."),
              (fordelt, f"De utsatte avdragene, {12 * k} × {tall(A - rente_mnd, 2)}, fordelt likt på de "
                        f"{n - 12 * k} terminene. Det overser at de utsatte avdragene også må forrentes."),
              (serie, f"Serielånets første termin: {tall(L)} / {n - 12 * k} + {tall(L * m, 2)}. Lånet er et annuitetslån.")]
        ulike(riktig, *[v for v, _ in fl], rel=0.002)
        q = q0 + f"<p>Hva blir terminbeløpet når den avdragsfrie perioden er over?</p>"
        alternativer = [R(kr(riktig, 2), riktig)] + [F(kr(v, 2), t, v) for v, t in fl]
        kort = (f"<p><b>{kr(riktig, 2)}.</b> Hele lånet {tall(L)} er nå et annuitetslån over {n - 12 * k} terminer: "
                f"A = {tall(L)} × {tall(m, 6)}/(1 − {tall(1 + m, 6)}<sup>−{n - 12 * k}</sup>).</p>")
        steg = (f"<p><b>Steg 1: hva står igjen?</b> Ingen avdrag er betalt, så restgjelden er fortsatt {tall(L)}.</p>"
                f"<p><b>Steg 2: nytt annuitetslån.</b> m = {tall(rp, 1)} %/12 og n = {n} − {12 * k} = {n - 12 * k}: "
                f"{tall(L * m, 2)} / (1 − {tall(1 + m, 6)}<sup>−{n - 12 * k}</sup>) = <b>{kr(riktig, 2)}</b>.</p>"
                f"<p><b>Kontroll:</b> det nye terminbeløpet må ligge over det gamle, {tall(A, 2)}, siden samme lån skal "
                f"betales på færre terminer. Samlet betaler {navn} {talla(rund(med, 2))} mot {talla(rund(uten, 2))} uten "
                f"avdragsfrihet, altså {kr(mer)} mer i renter ✓.</p>")
    else:
        riktig = mer
        fl = [(0, "Avdragsfrihet er ikke bare en flytting i tid. Hovedstolen står urørt lenger, så det løper renter på et "
                  "større beløp. I nåverdi ved lånerenten er kostnaden lik, men ikke i kroner."),
              (12 * k * rente_mnd, f"Rentene i den avdragsfrie perioden, {12 * k} × {tall(rente_mnd, 2)}. Det er "
                                   f"merkostnaden hvis løpetiden forlenges, ikke når sluttdatoen står fast."),
              (12 * k * (A - rente_mnd), f"Avdragene {navn} slipper i perioden, {12 * k} × {tall(A - rente_mnd, 2)}. "
                                         f"Det er likviditeten som frigjøres, ikke kostnaden.")]
        ulike(riktig, *[v for v, _ in fl if v], rel=0.01)
        q = q0 + (f"<p>Etter perioden blir terminbeløpet {kr(A2, 2)}. Hvor mye mer betaler {navn} til sammen over "
                  f"lånets levetid enn uten avdragsfrihet?</p>")
        alternativer = [R(kr(riktig), riktig)] + [F(kr(v), t, v) for v, t in fl]
        kort = (f"<p><b>{kr(riktig)}.</b> Med avdragsfrihet: {12 * k} × {tall(rente_mnd, 2)} + {n - 12 * k} × "
                f"{tall(A2, 2)} = {talla(rund(med, 2))}. Uten: {n} × {tall(A, 2)} = {talla(rund(uten, 2))}.</p>")
        steg = (f"<p><b>Steg 1: uten avdragsfrihet.</b> {n} × {tall(A, 2)} = {talla(rund(uten, 2))}.</p>"
                f"<p><b>Steg 2: med avdragsfrihet.</b> {12 * k} × {tall(rente_mnd, 2)} = "
                f"{talla(rund(12 * k * rente_mnd, 2))} i perioden, pluss {n - 12 * k} × {tall(A2, 2)} = "
                f"{talla(rund((n - 12 * k) * A2, 2))} etterpå. Sum {talla(rund(med, 2))}.</p>"
                f"<p><b>Steg 3: forskjellen.</b> {talla(rund(med, 2))} − {talla(rund(uten, 2))} = <b>{kr(riktig)}</b>.</p>"
                f"<p><b>Kontroll:</b> forlenges løpetiden i stedet, er merkostnaden nøyaktig rentene i perioden, "
                f"{tall(12 * k * rente_mnd)}. Med fast sluttdato betales lånet raskere ned etterpå, så merkostnaden må "
                f"være lavere. {tall(riktig)} er det ✓.</p>")
    full = (
        f"<p><b>Hva avdragsfrihet er.</b> I en periode betaler du bare renter. Lånet blir ikke mindre. Renten løper "
        f"på hele hovedstolen. Det gir lavere terminer nå, men høyere terminer etterpå hvis sluttdatoen står fast. I "
        f"kroner betaler du mer renter. I nåverdi ved lånerenten koster det det samme. Ordningen kjøper likviditet når "
        f"alternativet er dyrere kreditt.</p>"
        + steg +
        f"<p><b>Husk:</b> avdragsfrihet gir flere kroner i renter, men samme nåverdi. Den er verdt noe fordi den "
        f"frigjør likviditet.</p>"
    )
    return sporsmal(q, alternativer, kort, full)


# ===========================================================================
# STATISKE SPØRSMÅL
# ===========================================================================

statisk(
    "lan-s01", tema="laan", type="paastand",
    q="<p>Hvilken påstand om avdragsfrihet på et boliglån er riktig?</p>",
    alternativer=[
        R("Det kan være lurt å be om avdragsfrihet ved midlertidige problemer med likviditeten"),
        F("Det kan være lurt å be om avdragsfrihet fordi det fungerer som et rentefritt lån fra banken",
          "Motsatt av sant. Hovedstolen står uendret lenger, så du betaler flere kroner i renter."),
        F("Det kan være lurt å be om avdragsfrihet fordi staten da betaler avdragene en periode",
          "Staten har ingen rolle i avtalen. Det eneste staten gjør, er å dekke 22 % av rentene gjennom fradraget."),
        F("Kostnaden blir den samme uansett, så bare irrasjonelle låntakere ber om avdragsfrihet",
          "Nåverdien ved lånerenten er den samme, men slutningen er gal. Likviditet er verdt noe når alternativet er dyrere kreditt."),
    ],
    kort="<p><b>Ved midlertidige likviditetsproblemer.</b> Avdragsfrihet frigjør kontanter nå. Det koster flere kroner i "
         "renter, men er billigere enn forbrukslån eller kredittkort.</p>",
    full="<p><b>Hva avdragsfrihet er.</b> I en periode betaler du bare renter. Lånet blir ikke mindre. Renten løper på "
         "hele hovedstolen. Etter perioden må resten av lånet betales på færre terminer, eller så forlenges løpetiden.</p>"
         "<p><b>Steg 1: hva koster det?</b> I kroner betaler du mer renter. På et lån på 3 millioner til 5 % over 25 år "
         "gir to års avdragsfrihet 92 852 kroner mer i renter med samme sluttdato. I nåverdi ved lånerenten koster det "
         "likevel det samme, fordi du bare flytter betalinger i tid til lånets egen rente.</p>"
         "<p><b>Steg 2: hva får du?</b> Lavere terminer nå. Er du permittert, syk eller i foreldrepermisjon, frigjør "
         "det kontanter mye billigere enn forbrukslån eller kredittkort.</p>"
         "<p><b>Steg 3: stryk de gale.</b> «Rentefritt lån fra banken» er motsatt av sant. «Staten betaler» er feil. "
         "«Samme kostnad, så irrasjonelt» trekker gal slutning av et riktig nåverdipoeng.</p>"
         "<p><b>Kontroll:</b> den betingede formuleringen «kan være lurt hvis» passer med at verdien avhenger av "
         "situasjonen. En regel som sier at noe alltid eller aldri lønner seg, er mistenkelig.</p>"
         "<p><b>Husk:</b> avdragsfrihet = flere kroner i renter, samme nåverdi, kjøper likviditet.</p>",
)

statisk(
    "lan-s02", tema="laan", type="paastand", rekkefolge="fast",
    q="<p>Mira får to års avdragsfrihet på et annuitetslån. Sluttdatoen for lånet står fast. Vurder to påstander.</p>"
      "<p>I. Mira betaler flere kroner i renter til sammen enn uten avdragsfrihet.</p>"
      "<p>II. Avdragsfriheten gjør lånet dyrere målt i nåverdi, diskontert med lånerenten.</p>"
      "<p>Hvilke påstander er riktige?</p>",
    alternativer=[
        R("Bare I"),
        F("Bare II", "Påstand I er riktig: hovedstolen står lenger, så rentene blir flere kroner. Påstand II er gal."),
        F("Både I og II", "Påstand II er gal. Diskontert med lånerenten er alle betalingsstrømmer på lånet verdt lånebeløpet."),
        F("Ingen av dem", "Påstand I er riktig. Renten løper på hele hovedstolen i to år til."),
    ],
    kort="<p><b>Bare I.</b> Flere kroner i renter, men samme nåverdi ved lånerenten. Enhver betalingsplan på lånet er "
         "verdt lånebeløpet når den diskonteres med lånets egen rente.</p>",
    full="<p><b>Hva som skjer.</b> I to år betaler Mira bare renter. Lånet står uendret. Etterpå må hele lånet betales "
         "ned på færre terminer, så terminbeløpet stiger.</p>"
         "<p><b>Påstand I.</b> Fordi hovedstolen står lenger, løper renten på et større beløp i lengre tid. Summen av "
         "rentene blir høyere. Påstanden er riktig.</p>"
         "<p><b>Påstand II.</b> Diskonter alle betalingene med lånerenten. Hver betaling er renter av restgjelden pluss "
         "avdrag. Nåverdien av en slik strøm er alltid restgjelden. Med og uten avdragsfrihet er nåverdien derfor "
         "lik lånebeløpet. Påstanden er gal.</p>"
         "<p><b>Kontroll med tall:</b> på 3 millioner til 5 % over 25 år gir to års avdragsfrihet 92 852 kroner mer i "
         "udiskonterte renter. Nåverdien er likevel 3 millioner i begge tilfeller.</p>"
         "<p><b>Hvorfor det betyr noe.</b> Kostnaden i nåverdi er null, men likviditeten nå har verdi når alternativet er "
         "dyrere kreditt. Derfor kan avdragsfrihet være lurt i en midlertidig knipe.</p>"
         "<p><b>Husk:</b> flere kroner, samme nåverdi.</p>",
)

statisk(
    "lan-s03", tema="laan", type="begrep",
    q="<p>Marius har nettopp kjøpt sin første bolig med så stort lån som banken ville gi. Han har lite sparepenger. "
      "Fastrenten for fem år er litt høyere enn den flytende renten. Hvilken påstand om valget er riktig?</p>",
    alternativer=[
        R("Fast rente er en forsikring mot renteoppgang som kan være verdt prisen for ham"),
        F("Fast rente lønner seg når ekspertene venter renteoppgang, fordi han da slår markedet",
          "Banken priser fastrenten ut fra markedets forventninger. Å velge fast rente er ikke et veddemål han vinner."),
        F("Flytende rente er alltid billigst over tid, så bare de som ikke har regnet, velger fast",
          "I snitt er fastrenten litt dyrere, men det er prisen for visshet. For en sårbar låntaker kan visshet være verdt det."),
        F("Fast rente er gratis fleksibilitet, fordi lånet kan innfris når som helst uten kostnad",
          "Innfrir du et fastrentelån tidlig, kan det komme overkurs. Bindingen er en del av prisen."),
    ],
    kort="<p><b>Fast rente er en forsikring.</b> Den koster en premie i snitt, men fjerner risikoen for at terminbeløpet "
         "stiger. Med høy gjeld og liten buffer kan det være verdt det.</p>",
    full="<p><b>Hva fast rente er.</b> Med fast rente vet du terminbeløpet i bindingstiden. Banken setter fastrenten ut "
         "fra markedets forventninger om renten, med et lite påslag. Den er altså ikke billig eller dyr i seg selv. Du "
         "betaler for å slippe usikkerhet.</p>"
         "<p><b>Steg 1: er det et veddemål?</b> Nei. Forventet rente er alt priset inn. Tror du at du vet bedre enn "
         "markedet, er det overkonfidens.</p>"
         "<p><b>Steg 2: hvem bør forsikre seg?</b> Den som tåler en renteøkning dårlig. Marius har maksimalt lån og lite "
         "buffer. Stiger renten tre prosentpoeng, rammer det ham hardt. For ham kan forsikringen være verdt premien.</p>"
         "<p><b>Steg 3: hvem bør ikke?</b> Den med lav belåning og god margin. Da betaler du for en trygghet du alt har.</p>"
         "<p><b>Kontroll:</b> regn ut hva en renteøkning på tre prosentpoeng gjør med terminbeløpet ditt. Kan du bære "
         "det uten å selge boligen, er forsikringen mindre verdt. Logikken er den samme som for all forsikring: "
         "forventet nytte, ikke forventede kroner.</p>"
         "<p><b>Husk:</b> fast rente = forsikring mot renteøkning, ikke et veddemål. Pris: litt høyere rente og binding.</p>",
)

statisk(
    "lan-s04", tema="laan", type="begrep",
    q="<p>Hanne har fire lån: kredittkort til 22 %, billån til 7,5 %, boliglån til 5,0 % og studielån til 4,5 %. Hun "
      "har kr 50 000 ekstra hun vil bruke på å betale ned gjeld. Hvilket råd er økonomisk riktig?</p>",
    alternativer=[
        R("Betal ned kredittkortet først, fordi det har høyest rente"),
        F("Betal ned studielånet først, fordi det er det minste og gir en rask seier",
          "Snøballmetoden er et argument om motivasjon, ikke økonomi. Studielånet er det billigste lånet hun har."),
        F("Fordel pengene likt på alle fire lånene, så alle blir litt mindre",
          "Lik fordeling er nettopp feilen forskningen finner. Hver krone sparer mest der renten er høyest."),
        F("Betal ned boliglånet først, fordi det er størst og har rentefradrag",
          "Alle lånene har rentefradrag på 22 %. Størrelsen avgjør ikke. Renten gjør."),
    ],
    kort="<p><b>Kredittkortet først.</b> Hver krone du betaler ned, sparer renten på det lånet. 22 % er mest å spare.</p>",
    full="<p><b>Hva nedbetaling er.</b> Å betale ned et lån er en sikker investering med avkastning lik lånerenten. "
         "50 000 kroner mindre gjeld til 22 % sparer 11 000 kroner i renter i året. Til 4,5 % sparer det bare 2 250.</p>"
         "<p><b>Steg 1: ranger etter rente.</b> Kredittkort 22 %, billån 7,5 %, boliglån 5,0 %, studielån 4,5 %. Alle "
         "rentene gir fradrag med 22 %, så rangeringen er den samme etter skatt.</p>"
         "<p><b>Steg 2: betal ned den dyreste.</b> Kredittkortet. Når det er borte, går ekstra penger til billånet.</p>"
         "<p><b>Steg 3: studielånet sist.</b> Det er billigst. I tillegg slettes det ved dødsfall og har rentefritak ved "
         "sykdom.</p>"
         "<p><b>Kontroll:</b> sammenlign renten etter skatt. Kredittkort: 22 % × 0,78 = 17,16 %. Studielån: 4,5 % × 0,78 = "
         "3,51 %. Forskjellen er så stor at ingen atferdsgrunn rettferdiggjør å betale studielånet først. Det eneste "
         "legitime unntaket er ulike konsekvenser ved mislighold.</p>"
         "<p><b>Hvorfor folk gjør feil.</b> Mange fordeler likt eller tar det minste først. Forklaringen er mental "
         "regnskapsføring og nåtidsskjevhet.</p>"
         "<p><b>Husk:</b> betal ned lånet med høyest rente først.</p>",
)

statisk(
    "lan-s05", tema="laan", type="fakta",
    q="<p>Petter har marginalskatt 47,4 % på lønn og betaler kr 100 000 i året på boliglånet: kr 60 000 i renter og "
      "kr 40 000 i avdrag. Skatten på alminnelig inntekt er 22 %. Hvor mye reduserer lånet skatten hans?</p>",
    alternativer=[
        R("kr 13 200, fordi bare rentene gir fradrag i alminnelig inntekt med 22 %"),
        F("kr 28 440, fordi rentene gir fradrag med marginalskatten 47,4 %",
          "Renter trekkes fra i alminnelig inntekt. Den skattlegges med 22 %. Trygdeavgift og trinnskatt påvirkes ikke."),
        F("kr 22 000, fordi både renter og avdrag gir fradrag med 22 %",
          "Avdrag er tilbakebetaling av lånet, ingen kostnad. De gir ikke fradrag."),
        F("kr 0, fordi rentefradraget bare gjelder studielån fra Lånekassen",
          "Renter på all gjeld, også boliglån, gir fradrag i alminnelig inntekt."),
    ],
    kort="<p><b>kr 13 200.</b> 22 % × 60 000. Avdragene gir ikke fradrag. Satsen er 22 % uansett marginalskatt.</p>",
    full="<p><b>Hva rentefradraget er.</b> Renter på gjeld trekkes fra i alminnelig inntekt. Alminnelig inntekt "
         "skattlegges med 22 %. Hver rentekrone reduserer derfor skatten med 22 øre.</p>"
         "<p><b>Steg 1: hva gir fradrag?</b> Bare rentene, 60 000. Avdragene på 40 000 er tilbakebetaling av penger du "
         "lånte. De er ingen kostnad og gir ikke fradrag.</p>"
         "<p><b>Steg 2: hvilken sats?</b> 22 %. Marginalskatten på lønn, 47,4 %, inneholder trygdeavgift og trinnskatt. "
         "De regnes av personinntekten, som rentefradraget ikke påvirker.</p>"
         "<p><b>Steg 3: fradraget.</b> 22 % × 60 000 = <b>kr 13 200</b>. Rentene koster ham 60 000 × 78 % = 46 800 "
         "etter skatt.</p>"
         "<p><b>Kontroll:</b> 13 200 + 46 800 = 60 000 ✓. Får du et fradrag over 22 % av rentene, har du brukt feil sats "
         "eller tatt med avdrag.</p>"
         "<p><b>Husk:</b> rentefradrag = 22 % av rentene. Ikke av avdrag, ikke med marginalskatten.</p>",
)

statisk(
    "lan-s06", tema="laan", type="fakta",
    q="<p>Lånerenten er 3,5 %. Hvilken rente må banken bruke i stresstesten etter dagens utlånsforskrift?</p>",
    alternativer=[
        R("7 %, fordi renten pluss 3 prosentpoeng er under gulvet på 7 %"),
        F("6,5 %, fordi kravet er renten pluss 3 prosentpoeng",
          "Påslaget er 3 prosentpoeng, men renten i stresstesten skal være minst 7 %. 6,5 % er under gulvet."),
        F("8,5 %, fordi kravet er renten pluss 5 prosentpoeng",
          "Det var kravet før. Dagens forskrift krever 3 prosentpoeng, minst 7 %."),
        F("10 %, fordi stresstesten alltid bruker et fast nivå",
          "Stresstesten bygger på dagens rente med et påslag. Det finnes ikke et fast nivå på 10 %."),
    ],
    kort="<p><b>7 %.</b> Påslaget er 3 prosentpoeng, men minst 7 %. 3,5 % + 3 = 6,5 % er under gulvet.</p>",
    full="<p><b>Hva stresstesten er.</b> Banken skal sjekke at du tåler at renten stiger. Forskriften krever at du "
         "kan betjene lånet med en rente som er 3 prosentpoeng høyere enn dagens, men aldri lavere enn 7 %. Kurset "
         "regner som et annuitetslån over 30 år, med mindre oppgaven sier noe annet.</p>"
         "<p><b>Steg 1: legg på påslaget.</b> 3,5 % + 3 = 6,5 %.</p>"
         "<p><b>Steg 2: sammenlign med gulvet.</b> 6,5 % er under 7 %. Gulvet binder, så stresstesten bruker <b>7 %</b>.</p>"
         "<p><b>Kontroll med en høyere rente:</b> er lånerenten 5 %, blir det 5 % + 3 = 8 %, over gulvet. Da gjelder "
         "8 %. Gulvet biter bare når renten er under 4 %.</p>"
         "<p><b>Gamle eksamenssett.</b> H2020 og H2021 la på 5 prosentpoeng, som var kravet den gangen. Bruk alltid "
         "påslaget oppgaven oppgir. Uten oppgitt påslag gjelder dagens regel.</p>"
         "<p><b>Husk:</b> stresstest = max(rente + 3 prosentpoeng; 7 %), regnet over 30 år.</p>",
)

statisk(
    "lan-s07", tema="laan", type="fakta",
    q="<p>Ida har brutto årsinntekt kr 600 000. Hun har et studielån på kr 350 000, et billån på kr 120 000 og en "
      "kredittkortramme på kr 30 000. Hvor stort boliglån tillater gjeldsgradskravet i utlånsforskriften alene?</p>",
    alternativer=[
        R("kr 2 500 000"),
        F("kr 3 000 000", "Eksisterende gjeld glemt. Samlet gjeld, ikke bare boliglånet, kan være 5 × inntekten."),
        F("kr 2 650 000", "Studielånet trukket fra, men ikke billånet og kredittkortrammen. All gjeld teller."),
        F("kr 2 530 000", "Kredittkortrammen glemt. Den teller med i samlet gjeld, selv om den ikke er brukt."),
    ],
    kort="<p><b>kr 2 500 000.</b> 5 × 600 000 = 3 000 000 i samlet gjeld, minus 350 000 + 120 000 + 30 000 = 500 000.</p>",
    full="<p><b>Hva gjeldsgradskravet er.</b> Utlånsforskriften sier at samlet gjeld ikke kan være mer enn fem ganger "
         "brutto årsinntekt. Det gjelder all gjeld, ikke bare det nye boliglånet. Studielån, billån og kredittkortrammer "
         "teller med.</p>"
         "<p><b>Steg 1: taket for samlet gjeld.</b> 5 × 600 000 = 3 000 000.</p>"
         "<p><b>Steg 2: eksisterende gjeld.</b> 350 000 + 120 000 + 30 000 = 500 000. Kredittkortrammen teller selv om "
         "den ikke er brukt, fordi Ida kan bruke den når som helst.</p>"
         "<p><b>Steg 3: boliglånet.</b> 3 000 000 − 500 000 = <b>kr 2 500 000</b>.</p>"
         "<p><b>Kontroll:</b> legg sammen etterpå. 2 500 000 + 500 000 = 3 000 000 = 5 × 600 000 ✓. De andre kravene, "
         "belåningsgraden og stresstesten, kan gi et lavere tak. Spørsmålet gjelder bare gjeldsgraden.</p>"
         "<p><b>Husk:</b> nytt boliglån ≤ 5 × brutto inntekt − all annen gjeld, også ubrukte kredittrammer.</p>",
)

statisk(
    "lan-s08", tema="laan", type="fakta",
    q="<p>Hvilken kombinasjon gir dagens krav i utlånsforskriften til egenkapital og avdrag på et nedbetalingslån med "
      "pant i bolig?</p>",
    alternativer=[
        R("Lån høyst 90 % av boligverdien. Avdrag minst 2,5 % i året ved belåning over 60 %."),
        F("Lån høyst 85 % av boligverdien. Avdrag minst 2,5 % i året ved belåning over 60 %.",
          "85 % (15 % egenkapital) gjaldt til og med 2024. Fra 2025 er grensen 90 %."),
        F("Lån høyst 90 % av boligverdien. Avdrag minst 5 % i året ved belåning over 50 %.",
          "Avdragskravet er 2,5 % i året, eller det et annuitetslån over 30 år gir, når belåningen er over 60 %."),
        F("Lån høyst 60 % av boligverdien. Ingen avdragskrav så lenge renten betales.",
          "60 % er grensen for rammelån. Et nedbetalingslån kan gå til 90 %."),
    ],
    kort="<p><b>90 % og 2,5 % avdrag over 60 %.</b> Egenkapitalkravet ble senket fra 15 % til 10 % fra 2025.</p>",
    full="<p><b>Hva kravene er.</b> Utlånsforskriften begrenser hvor mye du kan låne mot bolig og krever at lånet "
         "betales ned når belåningen er høy. Kravene gjelder fra 1. januar 2025.</p>"
         "<p><b>Steg 1: belåningsgraden.</b> Et nedbetalingslån kan være høyst 90 % av boligens verdi. Du trenger "
         "altså 10 % egenkapital. Til og med 2024 var grensen 85 %. Rammelån kan bare gå til 60 %.</p>"
         "<p><b>Steg 2: avdragskravet.</b> Er lånet over 60 % av boligverdien, må du betale minst 2,5 % av lånet i "
         "avdrag hvert år. Alternativt holder det med avdraget i et annuitetslån over 30 år.</p>"
         "<p><b>Kontroll med tall:</b> bolig til 4 000 000. Maks lån 3 600 000. Låner du 3 000 000, er belåningen 75 %, "
         "over 60 %. Avdragskravet er da 2,5 % × 3 000 000 = 75 000 i året.</p>"
         "<p><b>Merk:</b> dokumentavgiften på 2,5 % kommer i tillegg. Egenkapitalen du trenger, er derfor mer enn 10 % av "
         "kjøpesummen.</p>"
         "<p><b>Husk:</b> lån ≤ 90 % av boligverdien. Over 60 % belåning: minst 2,5 % avdrag i året.</p>",
)

statisk(
    "lan-s09", tema="laan", type="begrep",
    q="<p>Hva er forelesningens hovedbegrunnelse for at utlånsforskriften finnes? Hvorfor kan en bank likevel gi "
      "lån som bryter kravene?</p>",
    alternativer=[
        R("Systemrisiko i finanssystemet. Bankene har en fleksibilitetskvote for unntak."),
        F("Å beskytte den enkelte mot å låne for mye. Unntak krever samtykke fra Finanstilsynet.",
          "Var formålet forbrukervern, ville også forbrukslån til 20 % vært regulert like strengt. Unntak går gjennom "
          "kvoten, ikke en søknad."),
        F("Å holde boligprisene nede. Unntak gis bare til førstegangskjøpere.",
          "Forskriften har ikke prismål. Fleksibilitetskvoten er ikke knyttet til førstegangskjøpere."),
        F("Å sikre staten skatteinntekter fra renter. Unntak gis når lånet har fast rente.",
          "Rentefradraget gir staten lavere inntekter, ikke høyere. Fast rente er ikke et unntaksgrunnlag."),
    ],
    kort="<p><b>Systemrisiko og fleksibilitetskvote.</b> Forskriften er skrevet mot bankene i flertall. Hver bank kan "
         "bryte kravene for 10 % av utlånene per kvartal (8 % i Oslo).</p>",
    full="<p><b>Hvorfor forskriften finnes.</b> Forelesningens poeng er at begrunnelsen er systemrisiko, ikke "
         "forbrukervern. Når mange husholdninger låner mye mot bolig samtidig, kan et prisfall gi en finanskrise. Hadde "
         "hensikten vært å beskytte den enkelte, ville forbrukslån med 20 % rente vært regulert like hardt.</p>"
         "<p><b>Steg 1: hva regulerer den?</b> Gjeldsgrad (5 × inntekt), belåningsgrad (90 %), stresstest (renten "
         "+ 3 prosentpoeng, minst 7 %) og avdrag over 60 % belåning.</p>"
         "<p><b>Steg 2: fleksibilitetskvoten.</b> Banken kan gi lån som bryter kravene for 10 % av utlånsvolumet hvert "
         "kvartal, 8 % i Oslo. Kravene binder altså porteføljen, ikke hver enkelt søknad.</p>"
         "<p><b>Steg 3: konsekvensen.</b> Et avslag fra én bank betyr ikke at alle sier nei. En annen bank kan ha "
         "ledig kvote.</p>"
         "<p><b>Kontroll:</b> passer begrunnelsen med hvordan regelen virker? Ja. En regel mot systemrisiko trenger "
         "bare å begrense det samlede volumet. Derfor holder det med en kvote for unntak.</p>"
         "<p><b>Husk:</b> utlånsforskriften = systemrisiko. Fleksibilitetskvote 10 % (8 % i Oslo).</p>",
)

statisk(
    "lan-s10", tema="laan", type="formel",
    q="<p>Et annuitetslån på L kroner har rente m per termin og n terminer. Hvilket uttrykk gir terminbeløpet A?</p>",
    alternativer=[
        R("A = L × m / (1 − (1 + m)<sup>−n</sup>)"),
        F("A = L × (1 − (1 + m)<sup>−n</sup>) / m",
          "Brøken er snudd. L × (1 − (1 + m)<sup>−n</sup>)/m er lånet ganger annuitetsfaktoren, som ikke er et terminbeløp."),
        F("A = L × m / (1 − (1 + m)<sup>n</sup>)",
          "Fortegnet i eksponenten er snudd. Da blir nevneren negativ og terminbeløpet negativt."),
        F("A = L / n + L × m",
          "Dette er serielånets første termin: fast avdrag pluss renten på hele lånet."),
    ],
    kort="<p><b>A = L × m / (1 − (1 + m)<sup>−n</sup>).</b> Terminbeløpet er lånet delt på annuitetsfaktoren "
         "(1 − (1 + m)<sup>−n</sup>)/m.</p>",
    full="<p><b>Hva formelen sier.</b> Et annuitetslån har samme terminbeløp hver gang. Beløpet er akkurat så stort at "
         "nåverdien av alle terminene er lik lånet. Annuitetsfaktoren (1 − (1 + m)<sup>−n</sup>)/m er nåverdien av én "
         "krone per termin. Derfor er A = L / annuitetsfaktor.</p>"
         "<p><b>Steg 1: skriv om.</b> L / [(1 − (1 + m)<sup>−n</sup>)/m] = L × m / (1 − (1 + m)<sup>−n</sup>).</p>"
         "<p><b>Steg 2: sjekk fortegnet.</b> (1 + m)<sup>−n</sup> er mindre enn 1, så nevneren er positiv. Med "
         "eksponent +n blir nevneren negativ.</p>"
         "<p><b>Steg 3: skill fra serielånet.</b> L/n + L × m er første termin i et serielån. Det er høyere enn "
         "annuiteten.</p>"
         "<p><b>Kontroll med tall:</b> L = 3 000 000, m = 5 %/12, n = 300. Telleren er 12 500, nevneren 0,712750, så "
         "A = 17 537,70. Svaret ligger over avdraget alene, 3 000 000/300 = 10 000. Det ligger under serielånets første "
         "termin, 22 500 ✓.</p>"
         "<p><b>Husk:</b> A = L × m / (1 − (1 + m)<sup>−n</sup>), med m og n målt i samme termin.</p>",
)

statisk(
    "lan-s11", tema="laan", type="formel",
    q="<p>Et lån har nominell årsrente r og k terminer i året, uten gebyrer. Hvilket uttrykk gir den effektive "
      "årsrenten?</p>",
    alternativer=[
        R("(1 + r/k)<sup>k</sup> − 1"),
        F("r", "Den nominelle renten. Med flere terminer i året forrentes rentene innen året, så effektiv rente er høyere."),
        F("(1 + r)<sup>k</sup> − 1", "Årsrenten brukt per termin. Da blir renten langt for høy: 80 % i stedet for 5,12 % med 5 % og k = 12."),
        F("(1 + r/k)<sup>1/k</sup> − 1", "Eksponenten er snudd. Det gir en rente lavere enn r/k."),
    ],
    kort="<p><b>(1 + r/k)<sup>k</sup> − 1.</b> Renten per termin er r/k. Den forrentes k ganger i løpet av året.</p>",
    full="<p><b>Hva effektiv rente er.</b> Den nominelle renten er satsen renten regnes med per termin, ganget opp til et "
         "år. Den effektive renten tar hensyn til at renten som betales tidlig i året, også rentes. Uten gebyrer er "
         "kapitaliseringen den eneste forskjellen.</p>"
         "<p><b>Steg 1: renten per termin.</b> r/k. Med 5 % og månedlige terminer: 5 %/12 = 0,4167 %.</p>"
         "<p><b>Steg 2: ett år.</b> En krone vokser til (1 + r/k)<sup>k</sup> i løpet av året. Den effektive renten er "
         "veksten minus kronen du startet med.</p>"
         "<p><b>Kontroll med tall:</b> (1 + 0,05/12)<sup>12</sup> − 1 = 5,12 %. Litt over den nominelle 5 %, slik det "
         "skal være. Får du et tall under den nominelle, har du snudd eksponenten. Får du 80 %, har du brukt årsrenten "
         "per termin.</p>"
         "<p><b>Med gebyrer.</b> Da er effektiv rente internrenten der lånet minus etableringsgebyret er lik nåverdien "
         "av terminbeløp pluss termingebyr. Formelen her gjelder bare uten gebyrer.</p>"
         "<p><b>Husk:</b> effektiv rente uten gebyrer = (1 + r/k)<sup>k</sup> − 1.</p>",
)

statisk(
    "lan-s12", tema="laan", type="begrep",
    q="<p>Hva er forskjellen på kredittkostnad og effektiv rente for et lån med gebyrer?</p>",
    alternativer=[
        R("Kredittkostnaden er kroner, udiskontert. Effektiv rente er en internrente i prosent."),
        F("Kredittkostnaden er nåverdien av renter og gebyrer. Effektiv rente er den nominelle renten.",
          "Kredittkostnaden summeres uten diskontering. Effektiv rente tar med gebyrene og er høyere enn nominell."),
        F("Begge måler det samme. Kredittkostnaden er bare effektiv rente ganget med lånet.",
          "Kredittkostnaden summerer kroner over hele løpetiden. Den kan ikke regnes som én rente ganger lånet."),
        F("Kredittkostnaden er alt du betaler, inkludert lånet. Effektiv rente er nominell rente pluss gebyrprosent.",
          "Lånet skal trekkes fra. Effektiv rente er internrenten, ikke nominell rente pluss gebyrer i prosent."),
    ],
    kort="<p><b>Kroner mot prosent.</b> Kredittkostnad = alle betalinger og gebyrer minus lånet, udiskontert. Effektiv "
         "rente = internrenten i kontantstrømmen.</p>",
    full="<p><b>To mål på samme lån.</b> Begge tar med gebyrene, men de svarer på ulike spørsmål.</p>"
         "<p><b>Kredittkostnaden.</b> Hvor mange kroner koster lånet? Summer alle terminbeløp, termingebyrer og "
         "etableringsgebyret. Trekk fra lånet. Ingen diskontering. Det er renter pluss gebyrer.</p>"
         "<p><b>Effektiv rente.</b> Hvilken rente svarer kontantstrømmen til? Det du mottar er lånet minus "
         "etableringsgebyret. Det du betaler er terminbeløp pluss termingebyr. Effektiv rente er renten som gjør "
         "nåverdiene like.</p>"
         "<p><b>Kontroll med H2022 oppgave 6:</b> lån 400 000 til 4,99 % over fem år, etableringsgebyr 5 990, termingebyr "
         "1 020. Kredittkostnaden er 5 × 93 384,38 + 5 990 − 400 000 = 72 912 kroner. Effektiv rente er 5,94 %. Alternativet "
         "472 912 glemmer å trekke fra lånet.</p>"
         "<p><b>Hvorfor begge brukes.</b> Effektiv rente lar deg sammenligne lån med ulik størrelse og løpetid. "
         "Kredittkostnaden viser hva du faktisk betaler i kroner.</p>"
         "<p><b>Husk:</b> kredittkostnad = kroner, udiskontert, minus lånet. Effektiv rente = internrenten.</p>",
)

statisk(
    "lan-s13", tema="laan", type="paastand", rekkefolge="fast",
    q="<p>Vurder to påstander om et annuitetslån og et serielån med samme lånebeløp, rente og løpetid.</p>"
      "<p>I. I annuitetslånet faller rentedelen av terminen over tid, mens terminbeløpet er fast.</p>"
      "<p>II. Serielånet gir lavere rentesum, fordi gjelden i snitt er lavere gjennom løpetiden.</p>"
      "<p>Hvilke påstander er riktige?</p>",
    alternativer=[
        F("Bare I", "Påstand II er også riktig. Serielånet nedbetales raskere, så det står mindre gjeld ute."),
        F("Bare II", "Påstand I er også riktig. Renten regnes av restgjelden, som faller, så rentedelen faller."),
        R("Både I og II"),
        F("Ingen av dem", "Begge er riktige. Renten følger restgjelden i begge lånetypene."),
    ],
    kort="<p><b>Både I og II.</b> Renten regnes alltid av restgjelden. I annuitetslånet faller rentedelen mens "
         "avdragsdelen stiger. Serielånet har lavere gjeld i snitt og dermed lavere rentesum.</p>",
    full="<p><b>Felles regel.</b> I begge lånetypene er renten i en termin restgjelden ganger renten per termin. Det "
         "som skiller dem, er hvordan avdraget settes.</p>"
         "<p><b>Påstand I.</b> I annuitetslånet er terminbeløpet fast. Første termin er nesten bare renter. Hver krone "
         "i avdrag gjør restgjelden mindre, så neste termins rente blir lavere og avdraget litt høyere. Påstanden er "
         "riktig.</p>"
         "<p><b>Påstand II.</b> I serielånet er avdraget fast, L/n, så gjelden faller raskere i starten. Gjennomsnittlig "
         "restgjeld er lavere. Da blir rentesummen lavere. Påstanden er riktig.</p>"
         "<p><b>Kontroll med tall:</b> 3 000 000 til 5 % over 25 år med månedlige terminer. Annuitetslånet gir rentesum "
         "2 261 310. Serielånet gir 12 500 × 301/2 = 1 881 250, altså 380 060 mindre. Prisen er tyngre terminer i "
         "starten: 22 500 mot 17 537,70 i første måned.</p>"
         "<p><b>Husk:</b> lavere rentesum i serielånet betyr ikke lavere rente. Det betyr mindre gjeld ute.</p>",
)
