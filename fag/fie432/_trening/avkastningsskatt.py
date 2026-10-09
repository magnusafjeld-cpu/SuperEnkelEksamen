# -*- coding: utf-8 -*-
"""Eksamenstrening, tema «avkastningsskatt»: formuesskatt som avkastningsskatt (k8),
   kjernepensum kj4.

   Regnerutinene R5 og R6 i eksamens-DNA-en: avk-ekv1 og avk-ekv2 (ekvivalensen
   t = τ/r og τ = t·r/(1 + r)), avk-avk1 (avkastning etter formuesskatt),
   avk-verd1 (verdien av en evig kontantstrøm med og uten at alternativet
   rammes), avk-utb1 (utbyttet som betaler formuesskatten, D = τW/(1 − t_e))
   og avk-kum1 (kumulasjonen over mange år, Adam og Miller).
   Kursets konvensjon: formuesskatten faller på formuen ved periodens begynnelse.
"""
import re
from trening_lib import *  # noqa: F401,F403

TEMA = "avkastningsskatt"

NAVN = ["Mira", "Jonas", "Selma", "Aksel", "Ingrid", "Tobias", "Nora", "Elias", "Live", "Henrik",
        "Sigrid", "Eirik", "Hedda", "Sander", "Astrid", "Kasper", "Thea", "Vegard", "Marius", "Erna"]


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


def sp(q, alt, kort, full, rekkefolge=None, hjelp=None):
    return sporsmal(nb(q), _fiks(alt), nb(kort), nb(full), rekkefolge, hjelp=nb(hjelp) if hjelp else None)


def st(id_, typ, q, alt, kort, full, rekkefolge=None):
    statisk(id_, tema=TEMA, type=typ, q=nb(q), alternativer=_fiks(alt), kort=nb(kort), full=nb(full),
            rekkefolge=rekkefolge, hjelp=nb(HJELP[id_]))


_RUNDE = {}


def tur(nøkkel, valg):
    """Går syklisk gjennom valgene, så variantene i en familie fordeler seg jevnt."""
    return valg[_RUNDE.get(nøkkel, 0) % len(valg)]


def ferdig(nøkkel, sp_):
    _RUNDE[nøkkel] = _RUNDE.get(nøkkel, 0) + 1
    return sp_


def velg(r, riktig, kand, n=3, rel=0.02):
    kand = [k for k in kand if not nær(k[0], riktig, rel)]
    unike = []                      # to feller med nesten samme tall: behold den første
    for k in kand:
        if not any(nær(k[0], u[0], rel) for u in unike):
            unike.append(k)
    if len(unike) < n:
        raise Avvis("for få feller")
    valgt = r.sample(unike, n)
    ulike(riktig, *[v for v, _ in valgt], rel=rel)
    return valgt


def p(x, d=1):
    """Prosenttall (allerede i prosent) med d desimaler: 1.0 → «1,0 %»."""
    return prosent_tekst(x, d)


def fx(x, maks=3):
    """Tall med så få desimaler som trengs, høyst maks: 1.05 → «1,05», 1.025 → «1,025»."""
    for d in range(maks + 1):
        if abs(x * 10 ** d - round(x * 10 ** d)) < 1e-9:
            return tall(x, d)
    return tall(x, maks)


def pp(x, maks=2):
    """Prosenttall med så få desimaler som trengs: 22.0 → «22 %», 37.84 → «37,84 %»."""
    return fx(x, maks) + NBSP + "%"


def mkr(x):
    """200_000_000 → «kr 200 mill.»"""
    v = x / 1e6
    return "kr" + NBSP + (tall(v, 0) if abs(v - round(v)) < 1e-9 else tall(v, 1)) + NBSP + "mill."



# ---------------------------------------------------------------------------
# Hjelpen bak «Hjelp»-knappen: fremgangsmåten uten tallene i spørsmålet (spek § 2b)
# ---------------------------------------------------------------------------
HJ_FAM = {'avk-ekv1': '<p><b>Steg 1: formuesskatten i kroner.</b> Formuesverdien ganger satsen. Bruk 80 % av '
             'markedsverdien bare når oppgaven sier at aksjene verdsettes med rabatt. Står det at du skal se bort fra '
             'verdsettingsrabatter, bruker du hele beløpet.</p><p><b>Steg 2: avkastningen i kroner.</b> Hele '
             'markedsverdien ganger avkastningen r.</p><p><b>Steg 3: del.</b> t = formuesskatt i kroner / avkastning i '
             'kroner. Uten rabatt blir det τ<sub>w</sub>/r, med rabatt 0,8 × τ<sub>w</sub>/r.</p><p><b>Pass på:</b> '
             'avkastningen regnes alltid av hele markedsverdien, også når formuesskatten har rabatt.</p>',
 'avk-ekv2': '<p><b>Steg 1: finn t.</b> Satsen på avkastningen, med oppjusteringen hvis det er '
             'aksjegevinst.</p><p><b>Steg 2: sett opp likningen.</b> τ<sub>w</sub> × grunnlaget = t × r × W. '
             'Grunnlaget er W ved periodens begynnelse og W(1 + r) ved slutten.</p><p><b>Steg 3: løs for '
             'τ<sub>w</sub>.</b></p><p><b>Pass på:</b> tidspunktet avgjør om du deler på (1 + r). Oppjusteringen '
             'brukes bare én gang.</p>',
 'avk-avk1': '<p><b>Steg 1: avkastningen før skatt.</b> (Utbytte + kursgevinst)/kjøpsverdi.</p><p><b>Steg 2: '
             'formuesskatten.</b> Satsen ganger formuesverdien ved begynnelsen. Med aksjerabatt teller bare 80 % av '
             'verdien.</p><p><b>Steg 3: trekk fra.</b> Formuesskatten som andel av kjøpsverdien trekkes fra '
             'avkastningen.</p><p><b>Pass på:</b> skatten trekkes fra én gang og regnes av inngående verdi.</p>',
 'avk-verd1': '<p><b>Steg 1: les forutsetningen.</b> Rammer formuesskatten også alternativet i samme '
              'risikoklasse?</p><p><b>Steg 2: sett opp betingelsen.</b> (CF − τ<sub>w</sub>V)/V = kravet etter '
              'formuesskatt. Rammes alternativet, er kravet r − τ<sub>w</sub>. Rammes det ikke, er kravet fortsatt '
              'r.</p><p><b>Steg 3: løs for V.</b></p><p><b>Pass på den halve justeringen:</b> skatten trukket fra '
              'strømmen, men kravet før skatt beholdt.</p>',
 'avk-kum1': '<p><b>Steg 1: vekst per år.</b> Uten skatt 1 + r. Med skatt på inngående formue 1 + r − '
             'τ<sub>w</sub>.</p><p><b>Steg 2: forholdet etter n år.</b> [(1 + r − τ<sub>w</sub>)/(1 + '
             'r)]<sup>n</sup>.</p><p><b>Steg 3: reduksjonen.</b> 1 minus forholdet.</p><p><b>Pass på:</b> ikke legg '
             'satsen sammen lineært over årene. Ikke forveksle med den ekvivalente avkastningsskatten for ett '
             'år.</p>'}

HJ_VAR = {'avk-utb1': {'D': '<p><b>Steg 1: formuesskatten.</b> Satsen ganger formuesverdien, ikke '
                   'markedsverdien.</p><p><b>Steg 2: finn eierskatten t<sub>e</sub>.</b></p><p><b>Steg 3: '
                   'bruttoregn.</b> D = formuesskatt/(1 − t<sub>e</sub>).</p><p><b>Kontroll:</b> D minus skatten på '
                   'D skal gi formuesskatten.</p><p><b>Pass på:</b> del på (1 − t<sub>e</sub>), ikke gang med (1 + '
                   't<sub>e</sub>).</p>',
              'skatt': '<p><b>Steg 1: formuesskatten.</b> Satsen ganger formuesverdien, ikke '
                       'markedsverdien.</p><p><b>Steg 2: bruttoregn utbyttet.</b> D = formuesskatt/(1 − '
                       't<sub>e</sub>).</p><p><b>Steg 3: skatten på utbyttet.</b> D × t<sub>e</sub>, som er det '
                       'samme som D minus formuesskatten.</p><p><b>Pass på:</b> skatten regnes av utbyttet, ikke av '
                       'formuesskatten.</p>'}}

HJELP = {'avk-s01': '<p>Bruk alternativkostnaden. Avkastningskravet er avkastningen etter skatt på beste alternativ i samme risikoklasse.</p><p><b>Steg 1:</b> hvilke eiendeler hos en norsk investor treffes av formuesskatten?</p><p><b>Steg 2:</b> hva skjer da med avkastningen etter skatt på alternativet hun sammenligner med?</p><p><b>Steg 3:</b> hva betyr det for kravet hun stiller til investeringen? Test hvert alternativ: følger det av denne mekanismen?</p>',
 'avk-s02': '<p><b>Sett provenyene like:</b> formuesskatten τ<sub>w</sub>W mot avkastningsskatten t × rW. Løs for '
            't.</p><p><b>Sjekk tidspunktet:</b> inngående og utgående formue gir ulike formler.</p><p><b>Stryk</b> '
            'formler som er snudd eller bruker avkastningen etter formuesskatt.</p>',
 'avk-s03': '<p><b>Skriv provenyet på begge sider.</b> Formuesskatten tar τ<sub>w</sub> ganger formuen ved slutten, '
            'W(1 + r). Avkastningsskatten tar t × rW.</p><p><b>Løs for τ<sub>w</sub></b> og se hvor (1 + r) havner. '
            'Står det i telleren eller nevneren?</p>',
 'avk-s04': '<p><b>Venstre side</b> er avkastningen på investeringen etter formuesskatt, (CF − τ<sub>w</sub>V)/V. '
            '<b>Høyre side</b> er alternativkostnaden etter formuesskatt.</p><p><b>Spør:</b> hva blir kravet når '
            'skatten treffer alt investoren eier?</p><p><b>Tell justeringene:</b> skatt trukket fra telleren krever '
            'skatt trukket fra kravet.</p>',
 'avk-s05': '<p><b>Sett opp betingelsen:</b> det som er igjen av utbyttet etter skatt, skal være lik formuesskatten. '
            'Det som er igjen av D, er D × (1 − t<sub>e</sub>).</p><p><b>Løs for D</b> og test hvert alternativ: gir '
            'det nok etter skatt?</p>',
 'avk-s06': '<p><b>Formuesskatten er et fast beløp</b> av formuen. Avkastningen varierer.</p><p><b>Spør:</b> hvor '
            'stor andel av avkastningen tar et fast beløp når avkastningen er lav? Når den er høy?</p><p><b>Husk</b> '
            'at formuen stryker seg i likningen.</p>',
 'avk-s07': '<p><b>Bruk t = τ<sub>w</sub>/r</b> og la r gå mot null. Hva skjer med brøken?</p><p><b>Spør også:</b> '
            'kan en skatt på null avkastning noen gang gi et positivt proveny?</p>',
 'avk-s08': '<p><b>Steg 1:</b> regn formuesskatten i kroner for hver person: satsen ganger formuen ved årets '
            'begynnelse.</p><p><b>Steg 2:</b> del på hver persons avkastning.</p><p><b>Sammenlign</b> med det en '
            'avkastningsskatt ville tatt.</p>',
 'avk-s09': '<p>En skatt vrir når folk kan endre atferd for å betale mindre.</p><p><b>Steg 1:</b> hva må en person vite på forhånd for å tilpasse seg en skatt?</p><p><b>Steg 2:</b> kan grunnlaget for en uventet engangsskatt påvirkes etter at skatten er kjent?</p><p><b>Steg 3:</b> sammenlign med en årlig skatt, der folk vet at den kommer igjen neste år. Test hver forklaring mot dette.</p>',
 'avk-s10': '<p><b>Spør:</b> hvor mange ganger treffer en årlig formuesskatt den samme '
            'kronen?</p><p><b>Sammenlign</b> med en inntektsskatt, som treffer kronen én gang.</p><p><b>Stryk</b> '
            'alternativer om satsendringer og bunnfradrag.</p>',
 'avk-s11': '<p><b>Skill de to artiklene.</b> Adam og Miller er skeptiske, men gjengir argumenter for skatten. '
            'Magma-artikkelen forsvarer den med empiri.</p><p><b>Finn</b> det prinsipielle argumentet for og stryk '
            'det som egentlig er argumenter mot eller hører til den andre artikkelen.</p>',
 'avk-s12': '<p><b>Magma-artikkelen forsvarer skatten.</b> Hva kritiserer den likevel: satsen, virkningene eller '
            'hvordan formuen måles?</p><p><b>Stryk</b> innvendinger som hører til Adam og Miller og påstander '
            'artikkelen avviser.</p>',
 'avk-s13': '<p><b>Start med hovedresultatet:</b> rammes investeringen og alternativet likt, stryker skatten '
            'seg.</p><p><b>Her verdsettes de ulikt.</b> Hvilken gir minst formuesskatt per krone '
            'markedsverdi?</p><p><b>Spør:</b> faller kravet mer eller mindre enn kontantstrømmen etter skatt? Hva '
            'betyr det for verdien?</p>',
 'avk-s14': '<p><b>Tenk på hele kjeden</b> for den som eier et selskap: skatten i selskapet, skatten på utbyttet og '
            'formuesskatten.</p><p><b>Spør:</b> hvilke ledd blir lave for unoterte selskaper?</p><p><b>Stryk</b> '
            'forklaringer om satser som ikke finnes eller om ulovlig unndragelse.</p>',
 'avk-s15': '<p><b>Dette er et faktum fra Magma-artikkelen.</b> Det er tre land.</p><p><b>Husk</b> at de nordiske '
            'nabolandene har avskaffet sine formuesskatter.</p>',
 'avk-s16': '<p><b>Finn fratrekket</b> i prosentpoeng og del det på avkastningen før formuesskatt.</p><p><b>Pass '
            'på:</b> ikke del på avkastningen etter skatt. Ikke forveksle satsen på formuen med satsen på '
            'avkastningen.</p>',
 'avk-s17': '<p><b>Bruk betingelsen</b> (CF − τ<sub>w</sub>V)/V = kravet etter skatt.</p><p><b>Spør:</b> hva skjer '
            'med kravet når skatten treffer alt investoren eier?</p><p><b>Stryk</b> påstander om at utlendinger '
            'betaler norsk formuesskatt.</p>',
 'avk-s18': '<p><b>Ulike avkastninger gir ulike ekvivalente satser.</b> Hvem betaler størst andel av avkastningen: '
            'den med lav eller høy avkastning?</p><p><b>Spør:</b> hva gjør det med hvem som vil eie kapitalen over '
            'tid?</p><p><b>Stryk</b> alternativer som sier at ekvivalensen holder for alle.</p>',
 'avk-s19': '<p><b>Bruttoregn.</b> Utbyttet per krone formuesverdi er formuesskatten delt på (1 − '
            't<sub>e</sub>).</p><p><b>Kontroll:</b> det som er igjen etter skatt, skal dekke '
            'formuesskatten.</p><p><b>Stryk</b> tall der skatten er lagt oppå og tall som bare er '
            'formuesskatten.</p>',
 'avk-s20': '<p>Skill markedsverdi fra formuesverdi. Avkastningen r er målt mot markedsverdien. Formuesskatten regnes av formuesverdien, som er markedsverdien etter rabatt.</p><p><b>Steg 1:</b> skriv formuesverdien som andel av markedsverdien.</p><p><b>Steg 2:</b> regn formuesskatten i kroner og del på markedsverdien.</p><p><b>Steg 3:</b> trekk dette fra r. Kontroll: med null rabatt skal du få r minus full formuesskattesats.</p>',
 'avk-s21': '<p><b>Sammenlign likningene</b> for de to tidspunktene. I hvilken står r bare ett '
            'sted?</p><p><b>Spør:</b> hva inneholder grunnlaget ved periodens slutt?</p><p><b>Stryk</b> forklaringer '
            'om hva loven gjør og om når avkastningen skattlegges.</p>',
 'avk-s22': '<p>Tenk på trekanten for dødvektstapet. Både høyden og bredden vokser med satsen.</p><p><b>Steg 1:</b> hva skjer da med tapet når satsen dobles?</p><p><b>Steg 2:</b> hva skjer med tapet per krone i proveny når satsen øker?</p><p><b>Steg 3:</b> gitt det, er det best å hente et proveny fra ett grunnlag eller fra flere? Test hvert alternativ mot dette.</p>'}


# ---------------------------------------------------------------------------
# avk-ekv1 · Hvilken avkastningsskatt tilsvarer formuesskatten? t = τ/r
# ---------------------------------------------------------------------------
@familie("avk-ekv1", tema=TEMA, hjelp=nb(HJ_FAM["avk-ekv1"]), antall=6, tittel="Ekvivalent avkastningsskatt, t = τ/r")
def _(r):
    navn = r.choice(NAVN)
    tau = r.choice([1.0, 1.0, 1.1])
    rr = r.choice([2.0, 2.5, 3.0, 4.0, 5.0, 6.0, 8.0])
    rab = tur("avk-ekv1", [False, True, False, False, True, False])
    W = r.choice([2, 5, 10, 20, 50]) * 1_000_000
    sym = r.choice(["τ<sub>w</sub>", "T"])
    te = tau * (0.8 if rab else 1.0)          # effektiv sats på markedsverdien, i prosent
    dte = 2 if rab and tau == 1.1 else 1
    riktig = te / rr
    ut = te * (1 + rr / 100) / rr
    etter = te / (rr - te)
    kand = [
        (ut, f"Skatten lagt på formuen ved periodens slutt: {p(te, dte)} × "
             f"{fx(1 + rr / 100)}/{p(rr)} = {pst(ut)}. Spørsmålet sier periodens begynnelse."),
        (etter, f"Delt på avkastningen etter formuesskatt: {p(te, dte)}/({p(rr)} − {p(te, dte)}) = {pst(etter)}. "
                f"Ekvivalensen sammenligner med avkastningen før formuesskatt."),
        ((rr - te) / 100, f"Dette er avkastningen etter formuesskatt, {p(rr)} − {p(te, dte)} = {pst((rr - te) / 100)}, "
                          f"svaret på nabospørsmålet (som H2025 oppgave 3b). Spørsmålet gjelder skattesatsen på "
                          f"avkastningen."),
    ]
    if rab:
        kand.append((tau / rr, f"Aksjerabatten glemt: {p(tau)}/{p(rr)} = {pst(tau / rr)}. Formuesskatten treffer "
                               f"bare 80 % av markedsverdien."))
    valgt = velg(r, riktig, kand)

    if rab:
        akt = "børsnoterte aksjer"
        regel = (f" Aksjer verdsettes til 80 % av markedsverdien i formuesskatten. Se bort fra bunnfradraget og "
                 f"fra gjeld.")
    else:
        akt = r.choice(["en portefølje av aksjer og obligasjoner", "en utleieeiendom (sekundærbolig)",
                        "et aksjefond"])
        regel = " Se bort fra bunnfradraget, verdsettingsrabatter og gjeld."
    q = (f"<p>{navn} har {kr(W)} plassert i {akt} ved periodens begynnelse. Plasseringen gir {p(rr)} avkastning i "
         f"perioden, realisert ved periodens slutt. Formuesskatten {sym} er {p(tau)} og faller på formuen ved "
         f"periodens begynnelse.{regel}</p>"
         f"<p>Hvor høy må en skatt t på avkastningen være for at den skal gi samme proveny som formuesskatten? "
         f"Oppgi svaret med én desimal.</p>")
    alternativer = [R(pst(riktig), riktig)] + [F(pst(v), f, v) for v, f in valgt]

    fs = W * te / 100
    avk = W * rr / 100
    rabsteg = f" Bare 80 % av verdien teller: {p(tau)} × 80 % = {p(te, dte)} av markedsverdien." if rab else ""
    kort = (f"<p><b>{pst(riktig)}.</b> Formuesskatten er {tall(fs)}, avkastningen {tall(avk)}. "
            f"t = {tall(fs)}/{tall(avk)} = {p(te, dte)}/{p(rr)} = {pst(riktig)}.</p>")
    full = (
        "<p><b>Hva ekvivalensen er.</b> Formuesskatten betales av det du eier, en skatt på avkastningen av det du "
        "tjener. Begge kan likevel gi samme proveny. I kursets modell faller formuesskatten på formuen ved periodens "
        "begynnelse. Den er da et fast kronebeløp, uansett hva plasseringen gir. Ekvivalent avkastningsskatt er det "
        "beløpet delt på avkastningen: t = τ<sub>w</sub>/r.</p>"
        f"<p><b>Steg 1: formuesskatten i kroner.</b>{rabsteg} {tall(W)} × {p(te, dte)} = "
        f"<b>{tall(fs)}</b>.</p>"
        f"<p><b>Steg 2: avkastningen i kroner.</b> {tall(W)} × {p(rr)} = {tall(avk)}.</p>"
        f"<p><b>Steg 3: sett dem like.</b> t × {tall(avk)} = {tall(fs)} gir t = {tall(fs)}/{tall(avk)} = "
        f"<b>{pst(riktig)}</b>. Formuen stryker seg: svaret avhenger bare av {p(te, dte)} og {p(rr)}.</p>"
        f"<p><b>Kontroll.</b> {tall(avk)} × {pst(riktig, 2)} ≈ {tall(fs)}, som er formuesskatten ✓. "
        f"Hadde skatten falt på formuen ved periodens slutt, ville grunnlaget vært {tall(W * (1 + rr / 100))} og "
        f"svaret {pst(ut)}. Den ene setningen om tidspunktet skiller de to alternativene.</p>"
        "<p><b>Husk:</b> t = τ<sub>w</sub>/r når skatten faller på inngående formue. Lav avkastning gir høy "
        "ekvivalent sats, fordi r står i nevneren.</p>"
    )
    return ferdig("avk-ekv1", sp(q, alternativer, kort, full))


# ---------------------------------------------------------------------------
# avk-ekv2 · Baklengs: hvilken formuesskattesats tilsvarer en avkastningsskatt?
# ---------------------------------------------------------------------------
@familie("avk-ekv2", tema=TEMA, hjelp=nb(HJ_FAM["avk-ekv2"]), antall=5, tittel="Formuesskattesatsen som tilsvarer en avkastningsskatt")
def _(r):
    slutt = tur("avk-ekv2", [True, False, True, False, True])
    rr = r.choice([2.0, 3.0, 4.0, 5.0, 6.0])
    if slutt:
        sats = r.choice([("aksjegevinst", 22.0, 1.72), ("aksjegevinst", 22.0, 1.44), ("renter", 22.0, None)])
    else:
        sats = r.choice([("aksjegevinst", 22.0, 1.72), ("aksjegevinst", 22.0, 1.72), ("aksjegevinst", 22.0, 1.44)])
    hva, nom, opp = sats
    t = nom * opp if opp else nom          # i prosent
    tt, rf = t / 100, rr / 100
    riktig = tt * rf / (1 + rf) if slutt else tt * rf
    annen = tt * rf if slutt else tt * rf / (1 + rf)
    feil_side = tt * rf * (1 + rf)
    deler = (1 + rf) if slutt else 1
    kand = [
        (annen, "Feil tidspunkt: " + (f"skatten lagt på inngående formue, τ = t × r = {pst(annen, 2)}. Oppgaven sier "
                                      f"formuen ved periodens slutt." if slutt else
                                      f"skatten lagt på utgående formue, τ = t × r/(1 + r) = {pst(annen, 2)}. Oppgaven "
                                      f"sier formuen ved periodens begynnelse.")),
    ]
    if slutt:
        kand.append((feil_side, f"(1 + r) satt på feil side: τ = t × r × (1 + r) = {pst(feil_side, 2)}. Faller skatten "
                                f"på utgående formue, skal grunnlaget W(1 + r) stå på formuesskattens side."))
    if opp:
        glemt = 0.22 * rf / deler
        kand.append((glemt, f"Oppjusteringen glemt, altså 22 % i stedet for {pp(t)}: {pst(glemt, 2)}."))
        dobbel = tt * opp * rf / deler
        kand.append((dobbel, f"Oppjusteringen brukt to ganger: {pp(t)} er alt 22 % × {tall(opp, 2)}, men er ganget med "
                             f"{tall(opp, 2)} igjen: {pst(dobbel, 2)}."))
    else:
        eier = 0.3784 * rf / deler
        kand.append((eier, f"Eierskatten 37,84 % brukt på renter: {pst(eier, 2)}. Renter skattlegges som alminnelig "
                           f"inntekt med 22 %."))
    valgt = velg(r, riktig, kand, rel=0.03)

    if opp:
        skatt_tekst = (f"Gevinst på aksjer skattlegges med 22 % etter oppjustering med {tall(opp, 2)}, altså en "
                       f"effektiv sats t = {pp(t)} på avkastningen"
                       + (" [dagens regel]." if opp == 1.72 else " [eksempeltall, 2019-regler]."))
    else:
        skatt_tekst = "Renteinntekter skattlegges som alminnelig inntekt med t = 22 %."
    tid = "slutt, altså W(1 + r)" if slutt else "begynnelse, altså W"
    q = (f"<p>En investor har formue W ved periodens begynnelse, plassert til {p(rr)} avkastning, realisert ved "
         f"periodens slutt. {skatt_tekst}</p>"
         f"<p>Myndighetene vurderer å erstatte skatten på avkastningen med en formuesskatt med sats τ<sub>w</sub>, som "
         f"faller på formuen ved periodens {tid}. Hvilken τ<sub>w</sub> gir samme proveny? Oppgi svaret med to "
         f"desimaler.</p>")
    alternativer = [R(pst(riktig, 2), riktig)] + [F(pst(v, 2), f, v) for v, f in valgt]
    if slutt:
        likning = f"τ<sub>w</sub> × W(1 + r) = t × r × W ⟹ τ<sub>w</sub> = t × r/(1 + r)"
        regn = f"{pp(t)} × {p(rr)}/{tall(1 + rf, 2)} = {pst(riktig, 2)}"
    else:
        likning = "τ<sub>w</sub> × W = t × r × W ⟹ τ<sub>w</sub> = t × r"
        regn = f"{pp(t)} × {p(rr)} = {pst(riktig, 2)}"
    kort = f"<p><b>{pst(riktig, 2)}.</b> {likning}: {regn}.</p>"
    full = (
        "<p><b>Hva som skal være likt.</b> To skatter gir samme proveny når de tar like mange kroner. Skatten på "
        "avkastningen tar t × r × W. Formuesskatten tar τ<sub>w</sub> ganger grunnlaget. Hva grunnlaget er, avhenger "
        "av når formuen måles: ved periodens begynnelse er det W, ved slutten W(1 + r). Kursets modell og H2025 "
        "legger skatten på begynnelsen. H2021 oppgave 3 la den på slutten, slik loven måler formuen per 1. januar "
        "året etter.</p>"
        f"<p><b>Steg 1: skatten på avkastningen.</b> t = {pp(t)}" + (f" (22 % × {tall(opp, 2)})" if opp else "")
        + f", r = {p(rr)}. Per krone formue tar den {pp(t)} × {p(rr)} = {pst(tt * rf, 3)}.</p>"
        f"<p><b>Steg 2: likningen.</b> {likning}.</p>"
        f"<p><b>Steg 3: regn ut.</b> {regn}.</p>"
        f"<p><b>Kontroll.</b> Med W = 1 000 000 tar avkastningsskatten {tall(1e6 * rf)} × {pp(t)} = "
        f"{talla(1e6 * rf * tt)}. Formuesskatten tar {pst(riktig, 4)} × "
        f"{tall(1e6 * (1 + rf)) if slutt else '1 000 000'} = {talla(riktig * 1e6 * ((1 + rf) if slutt else 1))} ✓.</p>"
        "<p><b>Husk:</b> inngående formue: τ<sub>w</sub> = t × r. Utgående formue: τ<sub>w</sub> = t × r/(1 + r). Les "
        "setningen om tidspunktet før du regner.</p>"
    )
    return ferdig("avk-ekv2", sp(q, alternativer, kort, full))


# ---------------------------------------------------------------------------
# avk-avk1 · Avkastning etter formuesskatt, med og uten rabatt
# ---------------------------------------------------------------------------
@familie("avk-avk1", tema=TEMA, hjelp=nb(HJ_FAM["avk-avk1"]), antall=5, tittel="Avkastning etter formuesskatt")
def _(r):
    navn = r.choice(NAVN)
    W = r.choice([50, 100, 200, 250, 400]) * 1_000_000
    rc = r.choice([3.0, 4.0, 5.0, 6.0, 8.0])
    g = tur("avk-avk1", [0.0, 2.0, 0.0, 1.0, 0.0])
    rab = tur("avk-avk1", [False, False, True, True, False])
    tau = r.choice([1.0, 1.0, 1.1])
    CF = W * rc / 100
    P1 = W * (1 + g / 100)
    rr = rc + g
    te = tau * (0.8 if rab else 1.0)
    d = 2 if abs(te * 10 - round(te * 10)) > 1e-9 else 1
    riktig = rr - te
    kand = [
        (rr + te, f"Skatten lagt til i stedet for trukket fra: {p(rr)} + {p(te, d)} = {p(rr + te, d)}."),
        (rr - 2 * te, f"Skatten trukket fra to ganger: {p(rr)} − 2 × {p(te, d)} = {p(rr - 2 * te, d)}."),
        (rr, f"Dette er avkastningen før formuesskatt, {p(rr)}. Spørsmålet gjelder avkastningen etter."),
    ]
    if rab:
        kand.append((rr - tau, f"Aksjerabatten glemt: {p(rr)} − {p(tau)} = {p(rr - tau)}. Formuesskatten treffer "
                               f"bare 80 % av verdien."))
    if g > 0:
        ut = rr - te * (1 + g / 100)
        kand.append((ut, f"Formuesskatten regnet av salgsverdien på {fx(P1 / 1e6, 2)} mill. kroner i stedet for kjøpsverdien: "
                         f"{p(ut, 2)}. Skatten faller på formuen ved periodens begynnelse."))
    valgt = velg(r, riktig, kand, rel=0.01)

    salg = (f"selger dem for {mkr(P1)} ved periodens slutt" if g else
            f"selger dem for samme beløp ved periodens slutt")
    rabtekst = ("Aksjene verdsettes til 80 % av markedsverdien i formuesskatten." if rab else
                "Se bort fra verdsettingsrabatten.")
    q = (f"<p>{navn} kjøper aksjer for {mkr(W)} ved periodens begynnelse, mottar {mkr(CF)} i utbytte ved periodens "
         f"slutt og {salg}. Formuesskatten er {p(tau)} og faller på formuesverdien ved periodens begynnelse. "
         f"{rabtekst} Se bort fra bunnfradraget og fra skatt på utbytte og gevinst.</p>"
         f"<p>Hva er avkastningen etter formuesskatt?</p>")
    alternativer = [R(p(riktig, d), riktig)] + [F(p(v, d if abs(v * 10 - round(v * 10)) < 1e-9 else 2), f, v)
                                                for v, f in valgt]
    fs = W * te / 100
    m = lambda x: fx(x / 1e6, 2)            # beløp i millioner, uten «kr» og «mill.»
    teller = m(CF) + (f" + {m(P1 - W)}" if g else "")
    kort = (f"<p><b>{p(riktig, d)}.</b> Formuesskatten er {m(W)} × {p(te, d)} = {m(fs)} mill. kroner. "
            f"({teller} − {m(fs)})/{m(W)} = {p(riktig, d)}.</p>")
    full = (
        "<p><b>Hva formuesskatten gjør med avkastningen.</b> Formuesskatten er et fast beløp av formuen ved "
        "periodens begynnelse. Den trekker derfor et fast antall prosentpoeng fra avkastningen: r<sub>etter</sub> = "
        "r − τ<sub>w</sub>. Med verdsettingsrabatt ρ er fratrekket τ<sub>w</sub>(1 − ρ).</p>"
        f"<p><b>Steg 1: avkastningen før skatt.</b> "
        + (f"Utbyttet er {m(CF)} mill. kroner og kursgevinsten {m(P1 - W)} mill. kroner: ({teller})/{m(W)} = "
           f"{p(rr)}.</p>" if g else
           f"Utbyttet er {m(CF)} mill. kroner. Kursgevinsten er null: {m(CF)}/{m(W)} = {p(rr)}.</p>")
        + f"<p><b>Steg 2: formuesskatten.</b> "
        + (f"Formuesverdien er 80 % av {m(W)} = {m(0.8 * W)} mill. kroner. " if rab else "")
        + f"Skatten er {m(W * (0.8 if rab else 1))} × {p(tau)} = {m(fs)} mill. kroner, altså {p(te, d)} av "
          f"kjøpsverdien.</p>"
        f"<p><b>Steg 3: avkastningen etter.</b> {p(rr)} − {p(te, d)} = <b>{p(riktig, d)}</b>.</p>"
        f"<p><b>Kontroll i kroner.</b> {tall(CF + P1 - W)} − {tall(fs)} = {tall(CF + P1 - W - fs)}. Delt på "
        f"kjøpsverdien: {tall(CF + P1 - W - fs)}/{tall(W)} = {p(riktig, d)} ✓. Regnet som avkastningsskatt tar "
        f"formuesskatten {p(te, d)}/{p(rr)} = {pst(te / rr)} av avkastningen.</p>"
        "<p><b>Husk:</b> r<sub>etter</sub> = r − τ<sub>w</sub>(1 − ρ). Skatten treffer inngående formuesverdi.</p>"
    )
    return ferdig("avk-avk1", sp(q, alternativer, kort, full))


# ---------------------------------------------------------------------------
# avk-verd1 · Evig kontantstrøm: rammes alternativet eller ikke?
# ---------------------------------------------------------------------------
@familie("avk-verd1", tema=TEMA, hjelp=nb(HJ_FAM["avk-verd1"]), antall=6, tittel="Verdien av en evig kontantstrøm under formuesskatt")
def _(r):
    navn = r.choice(NAVN)
    rammes = tur("avk-verd1", [True, False, True, True, False, True])
    CF = r.choice([300_000, 400_000, 500_000, 600_000, 800_000, 900_000, 1_200_000, 1_500_000, 2_000_000])
    rr = r.choice([4.0, 5.0, 6.0, 8.0])
    tau = 1.0
    rf, tf = rr / 100, tau / 100
    VA = CF / rf
    VB = CF / (rf + tf)
    Vh = (CF - tf * CF / rf) / rf
    Vm = CF / (rf - tf)
    for v in (VA, VB, Vh, Vm):
        if not heltall(v):
            raise Avvis("verdiene er ikke hele kroner")
    if rammes:
        riktig = VA
        kand = [
            (Vh, f"Den halve justeringen: kontantstrømmen trukket for formuesskatt, {tall(CF)} − {tall(tf * VA)} = "
                 f"{tall(CF - tf * VA)}, men diskontert med {p(rr)} før skatt: {tall(Vh)}. Kravet faller også."),
            (VB, f"Formuesskatten lagt oppå kravet: {tall(CF)}/({p(rr)} + {p(tau)}) = {tall(VB)}. Det gjelder bare "
                 f"hvis alternativet ikke rammes av formuesskatten."),
            (Vm, f"Diskontert med kravet etter skatt, {p(rr - tau)}, uten å trekke formuesskatten fra "
                 f"kontantstrømmen: {tall(CF)}/{p(rr - tau)} = {tall(Vm)}."),
        ]
        forutsetning = (f"Kapitalmarkedet er effisient og integrert, så alle plasseringer i samme risikoklasse gir "
                        f"{p(rr)} avkastning før formuesskatt. Formuesskatten på {p(tau)} treffer alt {navn} eier "
                        f"likt, på markedsverdien ved periodens begynnelse.")
    else:
        riktig = VB
        kand = [
            (VA, f"Verdien uten noen virkning av skatten: {tall(CF)}/{p(rr)} = {tall(VA)}. Den gjelder når "
                 f"formuesskatten treffer alternativet like mye. Her gjør den ikke det."),
            (Vh, f"Kontantstrømmen trukket for formuesskatt regnet av {tall(VA)} og diskontert med {p(rr)}: "
                 f"{tall(Vh)}. Skatten skal regnes av verdien du kommer fram til, ikke av {tall(VA)}."),
            (Vm, f"Diskontert med {p(rr - tau)}: {tall(Vm)}. Kravet er {p(rr)} etter formuesskatt, ikke lavere."),
        ]
        forutsetning = (f"{navn} betaler formuesskatt på {p(tau)} av investeringens markedsverdi ved periodens "
                        f"begynnelse. Anta at alternativet i samme risikoklasse ikke rammes av formuesskatten, slik at "
                        f"{navn} fortsatt krever {p(rr)} avkastning etter formuesskatt.")
    valgt = velg(r, riktig, kand)
    q = (f"<p>{forutsetning} Se bort fra bunnfradrag, verdsettingsrabatt og skatt på avkastningen.</p>"
         f"<p>{navn} vurderer en investering i samme risikoklasse som gir en evigvarende kontantstrøm på {kr(CF)} i "
         f"året. Hva er investeringen verdt for {navn}?</p>")
    alternativer = [R(kr(riktig), riktig)] + [F(kr(v), f, v) for v, f in valgt]
    if rammes:
        kort = (f"<p><b>{kr(riktig)}.</b> Både kontantstrømmen og kravet faller med {p(tau)}: "
                f"({tall(CF)} − 0,01V)/V = {p(rr - tau)} gir V = {tall(CF)}/{p(rr)} = {tall(riktig)}.</p>")
        full = (
            "<p><b>Hvorfor verdien ikke faller.</b> Formuesskatten er en skatt på personen, ikke på aktivumet. Den "
            "treffer alt investoren eier, også alternativet. Avkastningskravet hans faller derfor like mye som "
            "kontantstrømmen etter skatt og skatten stryker seg (Bjerksund og Schjelderup).</p>"
            f"<p><b>Steg 1: alternativkostnaden.</b> {p(rr)} − {p(tau)} = {p(rr - tau)} etter formuesskatt.</p>"
            f"<p><b>Steg 2: betingelsen.</b> Netto kontantstrøm skal gi {p(rr - tau)} av verdien: "
            f"({tall(CF)} − 0,01 × V)/V = {tall((rr - tau) / 100, 2)}. Det gir {tall(CF)}/V − 0,01 = "
            f"{tall((rr - tau) / 100, 2)}, altså {tall(CF)}/V = {tall(rf, 2)} og V = <b>{tall(riktig)}</b>.</p>"
            f"<p><b>Kontroll.</b> Formuesskatten blir {tall(tf * riktig)}, netto {tall(CF - tf * riktig)}. "
            f"{tall(CF - tf * riktig)}/{tall(riktig)} = {p(rr - tau)}, nøyaktig alternativkostnaden ✓.</p>"
            f"<p><b>De to vanlige feilene.</b> Trekker du skatten fra strømmen, men beholder {p(rr)}, får du "
            f"{tall(Vh)}: et tall etter skatt delt på et krav før skatt. {tall(VB)} er svaret bare når alternativet "
            f"ikke rammes.</p>"
            "<p><b>Husk:</b> rammes alternativet likt, er V = CF/r. Tell justeringene: én i telleren krever én i "
            "nevneren.</p>"
        )
    else:
        kort = (f"<p><b>{kr(riktig)}.</b> Kravet er fortsatt {p(rr)}: ({tall(CF)} − 0,01V)/V = {p(rr)} gir "
                f"V = {tall(CF)}/({p(rr)} + {p(tau)}) = {tall(riktig)}.</p>")
        full = (
            "<p><b>Hva forutsetningen gjør.</b> I kursets hovedtilfelle treffer formuesskatten alternativet like mye "
            "og verdien blir CF/r. Her er forutsetningen en annen: kravet etter formuesskatt er fortsatt det samme. Da "
            "virker skatten som et ekstra krav på investeringen og verdien faller.</p>"
            f"<p><b>Steg 1: betingelsen.</b> Netto kontantstrøm etter formuesskatt skal gi {p(rr)}: "
            f"({tall(CF)} − 0,01 × V)/V = {tall(rf, 2)}.</p>"
            f"<p><b>Steg 2: løs.</b> {tall(CF)}/V = {tall(rf, 2)} + 0,01 = {tall(rf + tf, 2)}, så V = "
            f"{tall(CF)}/{tall(rf + tf, 2)} = <b>{tall(riktig)}</b>.</p>"
            f"<p><b>Kontroll.</b> Formuesskatten blir {tall(tf * riktig)}, netto {tall(CF - tf * riktig)}. "
            f"{tall(CF - tf * riktig)}/{tall(riktig)} = {p(rr)} ✓. Uten skatt ville verdien vært {tall(VA)}.</p>"
            f"<p><b>Hvorfor det er unntaket.</b> Bjerksund og Schjelderup viser at i et effisient, integrert marked "
            f"treffer formuesskatten alternativet også. Da faller kravet til {p(rr - tau)} og verdien blir {tall(VA)}. "
            f"Svaret {tall(riktig)} krever at alternativet slipper unna.</p>"
            "<p><b>Husk:</b> alternativet rammes ikke: V = CF/(r + τ<sub>w</sub>). Alternativet rammes likt: "
            "V = CF/r.</p>"
        )
    return ferdig("avk-verd1", sp(q, alternativer, kort, full))


# ---------------------------------------------------------------------------
# avk-utb1 · Utbyttet som skal betale formuesskatten, D = τW/(1 − t_e)
# ---------------------------------------------------------------------------
@familie("avk-utb1", tema=TEMA, antall=6, tittel="Utbytte som dekker formuesskatten")
def _(r):
    navn = r.choice(NAVN)
    selskap = r.choice(["Fjellbekk AS", "Torvik Holding AS", "Lysnes AS", "Bølgen Invest AS", "Rognli AS"])
    form = tur("avk-utb1", ["172", "oppgitt", "172", "144", "oppgitt", "172"])
    spm = tur("avk-utb1", ["D", "D", "skatt", "D", "D", "skatt"])
    W = r.randrange(2_000_000, 40_000_001, 1_000_000)
    M = W * r.choice([2, 2.5, 3, 4])
    tau = r.choice([1.0, 1.0, 1.1])
    if form == "172":
        te = 0.3784
        satstekst = "Utbytte skattlegges med 22 % etter oppjustering med 1,72, altså 37,84 % [dagens regel]."
    elif form == "144":
        te = 0.3168
        satstekst = ("Utbytte skattlegges med 22 % etter oppjustering med 1,44, altså 31,68 % [eksempeltall, "
                     "2019-regler].")
    else:
        te = r.choice([0.40, 0.50])
        satstekst = f"Anta at utbytte skattlegges med {pp(te * 100)} [eksempeltall]."
    Fs = W * tau / 100
    D = Fs / (1 - te)
    if spm == "D":
        riktig = D
        kand = [
            (Fs * (1 + te), f"Eierskatten lagt oppå i stedet for bruttoregnet: {tall(Fs)} × {fx(1 + te, 4)} = "
                            f"{tall(Fs * (1 + te))}. Etter {pp(te * 100)} skatt gir det bare "
                            f"{tall(Fs * (1 + te) * (1 - te))}."),
            (M * tau / 100 / (1 - te), f"Formuesskatten regnet av markedsverdien {tall(M)}: "
                                       f"{tall(M * tau / 100)}/{fx(1 - te, 4)} = {tall(M * tau / 100 / (1 - te))}."),
            (Fs, f"Bare formuesskatten, {tall(Fs)}. Utbyttet skattlegges selv, så det må være større."),
        ]
        if form in ("172", "144"):
            kand.append((Fs / 0.78, f"Oppjusteringen glemt: {tall(Fs)}/0,78 = {tall(Fs / 0.78)}. Satsen er "
                                    f"{pp(te * 100)}, ikke 22 %."))
        sporsmal_tekst = ("Hvor stort bruttoutbytte må han ta for at det som er igjen etter skatt på utbyttet, akkurat "
                          "dekker formuesskatten på aksjene?").replace("han", navn)
    else:
        riktig = D - Fs
        kand = [
            (Fs * te, f"Skatten regnet av formuesskatten i stedet for av utbyttet: {tall(Fs)} × {pp(te * 100)} = "
                      f"{tall(Fs * te)}. Utbyttet må bruttoregnes først."),
            (D, f"Dette er bruttoutbyttet, {tall(D)}. Utbytteskatten er {tall(D)} − {tall(Fs)}."),
            (M * tau / 100 / (1 - te) * te, f"Formuesskatten regnet av markedsverdien {tall(M)}: utbytteskatten blir "
                                            f"{tall(M * tau / 100 / (1 - te) * te)}."),
        ]
        sporsmal_tekst = (f"{navn} tar akkurat så mye utbytte at det som er igjen etter skatt på utbyttet, dekker "
                          f"formuesskatten på aksjene. Hvor mye betaler {navn} i skatt på utbyttet?")
    valgt = velg(r, riktig, kand)
    q = (f"<p>{navn} eier alle aksjene i {selskap}, et unotert selskap. Markedsverdien er anslått til {kr(M)}, men "
         f"formuesverdien av aksjene etter verdsettingsreglene er {kr(W)}. {navn} har ingen likvide midler utenfor "
         f"selskapet og må ta utbytte for å betale formuesskatten på {p(tau)} på aksjene. {satstekst} Se bort fra "
         f"skjermingsfradraget og bunnfradraget.</p><p>{sporsmal_tekst}</p>")
    alternativer = [R(kr(riktig), riktig)] + [F(kr(v), f, v) for v, f in valgt]
    kort = (f"<p><b>{kr(riktig)}.</b> Formuesskatten er {tall(W)} × {p(tau)} = {tall(Fs)}. "
            f"D = {tall(Fs)}/(1 − {fx(te, 4)}) = {tall(D)}"
            + (f". Utbytteskatten er {tall(D)} − {tall(Fs)} = {tall(D - Fs)}" if spm == "skatt" else "") + ".</p>")
    full = (
        "<p><b>Hvorfor utbyttet må bruttoregnes.</b> Formuen ligger i selskapet. For å betale formuesskatten må eieren "
        "ta utbytte og utbyttet skattlegges selv. Utbyttet D må derfor være så stort at det som er igjen etter "
        "utbytteskatt, akkurat dekker formuesskatten: D × (1 − t<sub>e</sub>) = τ<sub>w</sub>W.</p>"
        f"<p><b>Steg 1: formuesskatten.</b> Grunnlaget er formuesverdien, ikke markedsverdien: {tall(W)} × {p(tau)} = "
        f"<b>{tall(Fs)}</b>.</p>"
        f"<p><b>Steg 2: bruttoregn.</b> D = {tall(Fs)}/(1 − {fx(te, 4)}) = {tall(Fs)}/{fx(1 - te, 4)} = "
        f"<b>{tall(D)}</b>.</p>"
        + (f"<p><b>Steg 3: utbytteskatten.</b> {tall(D)} × {pp(te * 100)} = {tall(D * te)}, som er {tall(D)} − "
           f"{tall(Fs)} = <b>{tall(D - Fs)}</b>.</p>" if spm == "skatt" else "")
        + f"<p><b>Kontroll.</b> {tall(D)} × {pp(te * 100)} = {tall(D * te)} i skatt. Igjen: {tall(D)} − {tall(D * te)} = "
          f"{tall(D * (1 - te))}, nøyaktig formuesskatten ✓. Belastningen er {tall(D)}/{tall(W)} = {pst(D / W, 2)} av "
          f"formuesverdien, ikke {p(tau)}.</p>"
        "<p><b>Husk:</b> D = τ<sub>w</sub>W/(1 − t<sub>e</sub>). Del på (1 − t<sub>e</sub>), ikke gang med "
        "(1 + t<sub>e</sub>).</p>"
    )
    return ferdig("avk-utb1", sp(q, alternativer, kort, full, hjelp=HJ_VAR["avk-utb1"][spm]))


# ---------------------------------------------------------------------------
# avk-kum1 · Kumulasjonen: hva årlig formuesskatt gjør med sluttverdien
# ---------------------------------------------------------------------------
@familie("avk-kum1", tema=TEMA, hjelp=nb(HJ_FAM["avk-kum1"]), antall=5, tittel="Formuesskatt over mange år")
def _(r):
    navn = r.choice(NAVN)
    rr = r.choice([4.0, 5.0, 6.0, 7.0])
    tau = r.choice([1.0, 1.0, 1.1, 2.0])
    n = r.choice([10, 20, 25, 30, 40])
    rf, tf = rr / 100, tau / 100
    faktor = ((1 + rf - tf) / (1 + rf)) ** n
    riktig = 1 - faktor
    kand = [
        (n * tf, f"Skatten lagt sammen lineært: {n} × {p(tau)} = {pst(n * tf)}. Grunnlaget for skatten er hvert år "
                 f"mindre enn formuen ville vært uten skatt, så summen blir for høy."),
        (1 - (1 - tf) ** n, f"Skatten trukket fra formuen før den forrenter seg: (1 − τ)(1 + r) per år gir "
                            f"1 − (1 − {fx(tf, 3)})<sup>{n}</sup> = {pst(1 - (1 - tf) ** n)}. Oppgaven sier at skatten "
                            f"betales ved årets slutt av årets avkastning, så hele formuen forrenter seg gjennom året."),
        (tf / rf, f"Dette er den ekvivalente avkastningsskatten for ett år, {p(tau)}/{p(rr)} = {pst(tf / rf)}. "
                  f"Spørsmålet gjelder virkningen på sluttverdien etter {n} år."),
    ]
    valgt = velg(r, riktig, kand)
    q = (f"<p>{navn} sparer i {n} år. Formuen gir {p(rr)} avkastning i året og alt reinvesteres. En årlig "
         f"formuesskatt på {p(tau)}{' [eksempeltall]' if tau == 2.0 else ''} regnes av formuen ved inngangen til hvert år og betales ved årets slutt av årets avkastning. Se bort fra bunnfradrag, rabatter og "
         f"all annen skatt.</p><p>Hvor mye lavere blir sluttverdien med formuesskatten enn uten, i prosent av "
         f"sluttverdien uten skatt?</p>")
    alternativer = [R(pst(riktig), riktig)] + [F(pst(v), f, v) for v, f in valgt]
    kort = (f"<p><b>{pst(riktig)}.</b> Formuen vokser med {fx(1 + rf - tf, 3)} i stedet for {fx(1 + rf, 2)} i "
            f"året. ({fx(1 + rf - tf, 3)}/{fx(1 + rf, 2)})<sup>{n}</sup> = {tall(faktor, 3)}, altså "
            f"{pst(riktig)} lavere.</p>")
    full = (
        "<p><b>Hva kumulasjonen er.</b> En formuesskatt treffer den samme formuen på nytt hvert år. Over mange år hoper "
        "virkningen seg opp. Adam og Miller bruker det som et hovedargument mot årlig formuesskatt: jo lenger du "
        "venter med å bruke formuen, desto høyere blir den samlede skatten på det du til slutt bruker.</p>"
        f"<p><b>Steg 1: vekst per år.</b> Uten skatt: × {fx(1 + rf, 2)}. Med skatten på inngående formue: "
        f"W(1 + r) − τW = W × {fx(1 + rf - tf, 3)}.</p>"
        f"<p><b>Steg 2: etter {n} år.</b> Forholdet mellom sluttverdiene er ({fx(1 + rf - tf, 3)}/"
        f"{fx(1 + rf, 2)})<sup>{n}</sup> = {tall(faktor, 4)}.</p>"
        f"<p><b>Steg 3: reduksjonen.</b> 1 − {tall(faktor, 4)} = <b>{pst(riktig)}</b>.</p>"
        f"<p><b>Kontroll.</b> Med kr 1 000 000 i start blir sluttverdien {tall(1e6 * (1 + rf) ** n)} uten skatt og "
        f"{tall(1e6 * (1 + rf - tf) ** n)} med. {tall(1e6 * (1 + rf - tf) ** n)}/{tall(1e6 * (1 + rf) ** n)} = "
        f"{tall(faktor, 4)} ✓. Den lineære summen {n} × {p(tau)} = {pst(n * tf)} er feil fordi skatten hvert år "
        f"treffer en formue som er mindre enn den ellers ville vært.</p>"
        "<p><b>Husk:</b> reduksjonen er 1 − [(1 + r − τ<sub>w</sub>)/(1 + r)]<sup>n</sup>. Den vokser med "
        "tiden.</p>"
    )
    return sp(q, alternativer, kort, full)


# ===========================================================================
# STATISKE SPØRSMÅL
# ===========================================================================

st("avk-s01", "begrep",
   q="<p>I Bjerksund og Schjelderups modell faller avkastningskravet til en norsk investor med formuesskattesatsen "
     "τ<sub>w</sub>. Hvorfor?</p>",
   alt=[
       F("Fordi formuesskatten gir fradrag i skatten på avkastningen",
         "Formuesskatt gir ikke fradrag i inntektsskatten. Kravet faller av en annen grunn."),
       R("Fordi skatten treffer alt investoren eier, også alternativet"),
       F("Fordi utenlandske investorer presser kravet ned i norske aksjer",
         "Modellen handler om den norske investorens egen alternativkostnad, ikke om utlendinger."),
       F("Fordi verdsettingsrabatten gjør at aksjer gir høyere avkastning",
         "Rabatten senker skatten på aksjer, men forklarer ikke at kravet faller for alle plasseringer."),
   ],
   kort="<p><b>Alternativet rammes også.</b> Formuesskatten er en skatt på personen. Den senker avkastningen etter "
        "skatt på alt investoren kan plassere i, så alternativkostnaden faller med τ<sub>w</sub>.</p>",
   full="<p><b>Hva alternativkostnaden er.</b> Kravet til en investering er det du kunne fått på beste alternativ i "
        "samme risikoklasse, etter skatt. Hvis alternativet også rammes av formuesskatten, faller kravet.</p>"
        "<p><b>Steg 1: H2025 oppgave 3.</b> En plassering gir 5 % før formuesskatt. Med 1 % formuesskatt gir den "
        "4 %. Det er nå investorens alternativkostnad.</p>"
        "<p><b>Steg 2: verdsetting.</b> En evig strøm på 5 mill. verdsettes av (5 − 0,01V)/V = 0,04, som gir "
        "V = 100 mill., det samme som uten formuesskatt.</p>"
        "<p><b>Kontroll.</b> Skatten på V = 100 er 1 og netto 4. 4/100 = 4 % ✓. Den som trekker skatten fra strømmen, "
        "men beholder 5 %, får 80 mill. og sammenligner et tall etter skatt med et krav før skatt.</p>"
        "<p><b>Konsekvensen.</b> I et effisient, integrert marked verdsetter en norsk investor aksjen som en utlending "
        "uten formuesskatt. Resultatet er omstridt, men det er forelesningens versjon som gjelder til eksamen.</p>"
        "<p><b>Husk:</b> formuesskatten er en skatt på personen. Den senker både strømmen og kravet.</p>")

st("avk-s02", "formel",
   q="<p>Formuesskatten har sats τ<sub>w</sub> og faller på formuen W ved periodens begynnelse. Avkastningen er r. "
     "Hvilken skattesats t på avkastningen gir samme proveny?</p>",
   alt=[
       R("t = τ<sub>w</sub>/r"),
       F("t = τ<sub>w</sub>(1 + r)/r", "Dette er svaret når skatten faller på formuen ved periodens slutt."),
       F("t = r/τ<sub>w</sub>", "Telleren og nevneren er byttet. Med τ = 1 % og r = 5 % ville det gitt 500 %."),
       F("t = τ<sub>w</sub>/(r − τ<sub>w</sub>)", "Nevneren er avkastningen etter formuesskatt. Ekvivalensen bruker "
                                                 "avkastningen før."),
   ],
   kort="<p><b>t = τ<sub>w</sub>/r.</b> τ<sub>w</sub>W = t × r × W og W stryker seg.</p>",
   full="<p><b>Hva som skal være likt.</b> Formuesskatten tar τ<sub>w</sub>W kroner. En skatt på avkastningen tar "
        "t × rW kroner. Samme proveny betyr at de to beløpene er like.</p>"
        "<p><b>Steg 1: likningen.</b> τ<sub>w</sub>W = t × rW.</p>"
        "<p><b>Steg 2: løs.</b> W stryker seg og t = τ<sub>w</sub>/r.</p>"
        "<p><b>Steg 3: tall fra H2025 oppgave 9.</b> τ = 1 %, r = 5 %: t = 1/5 = 20 %. Alternativet 21 % var "
        "skatten lagt på utgående formue: 1 % × 1,05/5 % = 21 %.</p>"
        "<p><b>Kontroll.</b> Med W = 100 er formuesskatten 1 og avkastningen 5. 5 × 20 % = 1 ✓.</p>"
        "<p><b>Husk:</b> inngående formue gir t = τ<sub>w</sub>/r. Utgående gir τ<sub>w</sub> = t × r/(1 + r).</p>")

st("avk-s03", "formel",
   q="<p>En skatt t på avkastningen r skal erstattes av en formuesskatt τ<sub>w</sub> som faller på formuen ved "
     "periodens <b>slutt</b>, W(1 + r). Hvilket uttrykk gir provenynøytral τ<sub>w</sub>?</p>",
   alt=[
       F("τ<sub>w</sub> = t × r", "Dette er svaret når skatten faller på formuen ved periodens begynnelse."),
       F("τ<sub>w</sub> = t × r × (1 + r)", "(1 + r) står på feil side. Grunnlaget W(1 + r) står hos formuesskatten, "
                                           "så det skal deles på."),
       R("τ<sub>w</sub> = t × r/(1 + r)"),
       F("τ<sub>w</sub> = t/[r(1 + r)]", "Formelen er snudd. Med t = 22 % og r = 3 % ville det gitt over 700 %."),
   ],
   kort="<p><b>τ<sub>w</sub> = t × r/(1 + r).</b> τ<sub>w</sub> × W(1 + r) = t × rW og W stryker seg.</p>",
   full="<p><b>Hva som er annerledes.</b> Måles formuen ved periodens slutt, inneholder grunnlaget selve "
        "avkastningen: W(1 + r). Da dukker r opp på begge sider av likningen.</p>"
        "<p><b>Steg 1: likningen.</b> τ<sub>w</sub> × W(1 + r) = t × rW.</p>"
        "<p><b>Steg 2: løs.</b> τ<sub>w</sub> = t × r/(1 + r).</p>"
        "<p><b>Steg 3: tall fra H2021 oppgave 3.</b> t = 22 %, r = 3 %: τ = 0,22 × 0,03/1,03 = 0,64 %. Med "
        "inngående formue ville svaret vært 0,22 × 0,03 = 0,66 %.</p>"
        "<p><b>Kontroll.</b> W = 100: avkastningsskatten er 3 × 22 % = 0,66. Formuesskatten er 103 × 0,6408 % = "
        "0,66 ✓.</p>"
        "<p><b>Husk:</b> skatteloven måler formuen per 1. januar året etter, altså ved periodens slutt. Kursets modell "
        "bruker begynnelsen. Oppgaveteksten avgjør.</p>")

st("avk-s04", "formel",
   q="<p>Kapitalmarkedet er effisient og integrert. Alle plasseringer i samme risikoklasse gir r før formuesskatt og "
     "formuesskatten τ<sub>w</sub> treffer alt investoren eier likt, på markedsverdien V ved periodens begynnelse. "
     "Hvilken likning bestemmer verdien V av en evig kontantstrøm CF?</p>",
   alt=[
       F("(CF − τ<sub>w</sub>V)/V = r", "Kravet er holdt på r før skatt. Det gjelder bare når alternativet ikke "
                                        "rammes."),
       F("CF/V = r − τ<sub>w</sub>", "Kravet er justert, men formuesskatten er ikke trukket fra strømmen."),
       F("(CF − τ<sub>w</sub>CF/r)/V = r", "Skatten er regnet av verdien uten skatt og kravet holdt på r: den halve "
                                           "justeringen."),
       R("(CF − τ<sub>w</sub>V)/V = r − τ<sub>w</sub>"),
   ],
   kort="<p><b>(CF − τ<sub>w</sub>V)/V = r − τ<sub>w</sub>.</b> Skatten trekkes fra strømmen og fra kravet. Den "
        "stryker seg og V = CF/r.</p>",
   full="<p><b>Hva likningen sier.</b> Til venstre står avkastningen på investeringen etter formuesskatt. Til høyre "
        "står alternativkostnaden etter formuesskatt. I likevekt er de like.</p>"
        "<p><b>Steg 1: løs.</b> CF/V − τ<sub>w</sub> = r − τ<sub>w</sub>, så CF/V = r og V = CF/r.</p>"
        "<p><b>Steg 2: tall.</b> CF = 5 mill., r = 5 %, τ = 1 %: V = 100 mill. (H2025 oppgave 3d).</p>"
        "<p><b>Kontroll.</b> Skatten er 1 og netto 4. 4/100 = 4 % = 5 % − 1 % ✓.</p>"
        "<p><b>De gale likningene.</b> Holder du kravet på r, får du V = CF/(r + τ<sub>w</sub>) = 83,3 mill. Justerer "
        "du bare kravet, får du CF/(r − τ<sub>w</sub>) = 125 mill. Den halve justeringen gir 80 mill.</p>"
        "<p><b>Husk:</b> én justering i telleren krever én i nevneren.</p>")

st("avk-s05", "formel",
   q="<p>En eier må ta utbytte D for å betale formuesskatt τ<sub>w</sub> på formuesverdien W. Utbytte skattlegges med "
     "t<sub>e</sub>. Hvilket uttrykk gir utbyttet som akkurat dekker formuesskatten etter skatt på utbyttet?</p>",
   alt=[
       F("D = τ<sub>w</sub>W(1 + t<sub>e</sub>)", "Skatten lagt oppå. Med 50 % eierskatt gir 1 500 bare 750 etter "
                                                 "skatt, ikke 1 000."),
       F("D = τ<sub>w</sub>W/(1 + t<sub>e</sub>)", "Nevneren har feil fortegn. Utbyttet blir da mindre enn "
                                                  "formuesskatten."),
       R("D = τ<sub>w</sub>W/(1 − t<sub>e</sub>)"),
       F("D = τ<sub>w</sub>W(1 − t<sub>e</sub>)", "Dette er hva som er igjen av et utbytte på τ<sub>w</sub>W etter "
                                                 "skatt, ikke utbyttet som trengs."),
   ],
   kort="<p><b>D = τ<sub>w</sub>W/(1 − t<sub>e</sub>).</b> D × (1 − t<sub>e</sub>) = τ<sub>w</sub>W.</p>",
   full="<p><b>Hvorfor bruttoregning.</b> Eieren skal sitte igjen med formuesskatten etter at utbyttet er "
        "skattlagt. Det som er igjen av D, er D × (1 − t<sub>e</sub>).</p>"
        "<p><b>Steg 1: likningen.</b> D × (1 − t<sub>e</sub>) = τ<sub>w</sub>W.</p>"
        "<p><b>Steg 2: løs.</b> D = τ<sub>w</sub>W/(1 − t<sub>e</sub>).</p>"
        "<p><b>Steg 3: H2025 oppgave 6.</b> W = 100 000, τ = 1 %, t<sub>e</sub> = 50 %: D = 1 000/0,5 = 2 000. "
        "H2024 oppgave 7: 1/(1 − 0,378) = 1,6.</p>"
        "<p><b>Kontroll.</b> 2 000 × 50 % = 1 000 i skatt. Igjen: 2 000 − 1 000 = 1 000, nøyaktig formuesskatten ✓. Med "
        "skatten lagt oppå blir D = 1 500 og etter skatt er bare 750 igjen.</p>"
        "<p><b>Husk:</b> del på (1 − t<sub>e</sub>). Med dagens 37,84 % blir belastningen 1 %/0,6216 = 1,61 % av "
        "formuesverdien.</p>")

st("avk-s06", "paastand",
   q="<p>Formuesskatten er 1,0 %. Hvilken påstand om den ekvivalente avkastningsskatten τ<sub>w</sub>/r er "
     "riktig?</p>",
   alt=[
       F("Den er lik for alle plasseringer, siden satsen på formuen er lik",
         "Satsen på formuen er lik, men belastningen på avkastningen avhenger av r."),
       F("Den er lavest i lavrenteperioder, siden det da er lite å skattlegge",
         "Feil retning. Kronebeløpet er fast, så lav avkastning gir en høy andel."),
       R("Den er høyest i lavrenteperioder og på plasseringer med lav avkastning"),
       F("Den avhenger av formuens størrelse, siden skatten er et kronebeløp",
         "Formuen stryker seg i τ<sub>w</sub>W = t × rW. Bare forholdet τ<sub>w</sub>/r teller."),
   ],
   kort="<p><b>Høyest når avkastningen er lav.</b> r står i nevneren: 1 %/10 % = 10 %, men 1 %/2 % = 50 %.</p>",
   full="<p><b>Hvorfor.</b> Formuesskatten tar et fast kronebeløp, uansett hva formuen kaster av seg. Når "
        "avkastningen er lav, utgjør det faste beløpet en stor andel av den.</p>"
        "<p><b>Steg 1: tabellen.</b> Ved τ = 1,0 %: r = 10 % gir 10 %, r = 5 % gir 20 %, r = 3 % gir 33,3 %, r = 2 % "
        "gir 50 %, r = 1 % gir 100 %.</p>"
        "<p><b>Steg 2: grensetilfellet.</b> Ved r = 0 finnes det ingen avkastningsskatt som gir samme proveny. Skatten "
        "må betales av selve formuen.</p>"
        "<p><b>Merk.</b> Kurven t = τ<sub>w</sub>/r er en hyperbel: flat ved høy avkastning, bratt mot venstre. "
        "Halveres r, dobles t.</p>"
        "<p><b>Konsekvens.</b> Formuesskatten rammer hardest i lavrenteperioder og på bankinnskudd og andre "
        "lavtavkastende plasseringer. Den spør ikke om det er noe å skatte av.</p>"
        "<p><b>Husk:</b> t = τ<sub>w</sub>/r. r i nevneren.</p>")

st("avk-s07", "tolkning",
   q="<p>En plassering gir 0 % avkastning i et år. Formuesskatten er 1,0 % av formuen ved årets begynnelse. Hvilken "
     "skatt på avkastningen gir samme proveny?</p>",
   alt=[
       F("En skatt på 0 %, siden det ikke er noen avkastning",
         "Da ville provenyet vært null. Formuesskatten tar 1 % av formuen."),
       F("En skatt på 100 % av avkastningen", "100 % av null er null. Den tar ikke 1 % av formuen."),
       F("En skatt på 1,0 % av avkastningen, siden satsene er like",
         "Satsene måles mot ulike grunnlag. 1 % av null er null."),
       R("Ingen: skatten må betales av selve formuen"),
   ],
   kort="<p><b>Ingen avkastningsskatt kan gi samme proveny.</b> t = τ<sub>w</sub>/r går mot uendelig når r går mot "
        "null. Formuesskatten tar kroner som ikke er tjent.</p>",
   full="<p><b>Hva ekvivalensen forutsetter.</b> t = τ<sub>w</sub>/r gir en avkastningsskatt som tar like mange "
        "kroner som formuesskatten. Det forutsetter at det finnes avkastning å skattlegge.</p>"
        "<p><b>Steg 1: r = 0.</b> Formuesskatten tar 1 % × W. Avkastningen er 0 og enhver skatt på den gir 0.</p>"
        "<p><b>Steg 2: tolkningen.</b> Formuesskatten må betales av formuen selv. Den er en skatt på det du har, ikke "
        "på det du tjener.</p>"
        "<p><b>Kontroll.</b> Ved r = 1 % er t = 100 %: hele avkastningen går med. Ved r under 1 % ville t vært over "
        "100 % og formuen krymper.</p>"
        "<p><b>Hvorfor det betyr noe.</b> Dette er forelesningens poeng om at formuesskatten ikke spør om det er noe å "
        "skatte av. Det er også grunnen til at likviditet er et tema for eiere av unoterte selskaper.</p>"
        "<p><b>Husk:</b> lav avkastning gir høy ekvivalent sats. Null avkastning gir ingen ekvivalent sats.</p>")

st("avk-s08", "tolkning",
   q="<p>To personer eier hvert sitt aktivum verdt 100 ved årets begynnelse. Aktivumet til Kari gir 5 i avkastning, "
     "Pers gir 20. Formuesskatten er 1 % av formuen ved årets begynnelse. Hvilken påstand er riktig?</p>",
   alt=[
       F("Formuesskatten tar 1 % av avkastningen til begge",
         "Formuesskatten tar 1 % av formuen, altså 1 krone, ikke 1 % av avkastningen."),
       R("Formuesskatten tar 20 % av Karis avkastning og 5 % av Pers"),
       F("Formuesskatten tar 20 % av avkastningen til begge",
         "20 % gjelder bare ved normalavkastningen 5. Av Pers 20 tar 1 krone bare 5 %."),
       F("Formuesskatten tar mest fra Per, 4 kroner mot 1",
         "4 mot 1 er det en avkastningsskatt på 20 % ville tatt. Formuesskatten tar 1 fra begge."),
   ],
   kort="<p><b>20 % av Karis og 5 % av Pers.</b> Begge betaler 1. Det er 1/5 av Karis avkastning og 1/20 av "
        "Pers.</p>",
   full="<p><b>Poenget til Adam og Miller.</b> Avkastningen kan deles i normalavkastning og meravkastning (flaks, "
        "risiko, renprofitt, forkledd arbeidsinntekt). Teorien sier at meravkastningen kan skattlegges uten store "
        "vridninger, mens normalavkastningen helst bør skånes.</p>"
        "<p><b>Steg 1: formuesskatten.</b> 1 % × 100 = 1 for begge.</p>"
        "<p><b>Steg 2: som andel av avkastningen.</b> Kari: 1/5 = 20 %. Per: 1/20 = 5 %.</p>"
        "<p><b>Steg 3: sammenlign med en avkastningsskatt på 20 %.</b> Kari betaler 1, Per 4. Den treffer "
        "meravkastningen.</p>"
        "<p><b>Kontroll.</b> Ved normalavkastningen gir de to skattene samme proveny, 1 = 20 % × 5 ✓. Bare når "
        "avkastningen avviker, skiller de seg.</p>"
        "<p><b>Hvorfor det betyr noe.</b> Meravkastningen kan skattlegges uten store vridninger. Renprofitt vrir ikke. Risikopremien vris ikke så lenge tap gir fradrag like fritt som gevinst skattlegges (Domar og Musgrave). Normalavkastningen er belønningen for å utsette forbruk. En skatt på den vrir sparingen.</p>"
        "<p><b>Husk:</b> formuesskatten treffer normalavkastningen hardt og meravkastningen svakt, motsatt av det "
        "teorien anbefaler.</p>")

st("avk-s09", "begrep",
   q="<p>Adam og Miller skiller mellom en uventet engangs formuesskatt og en årlig formuesskatt. Hvorfor vrir en "
     "engangsskatt i prinsippet ingenting?</p>",
   alt=[
       R("Formuen finnes alt og ingen kan endre atferd for å unngå skatten"),
       F("Den treffer bare meravkastningen, som teorien sier kan skattlegges",
         "En engangsskatt treffer formuen, ikke avkastningen. Poenget er at atferden ikke kan endres i ettertid."),
       F("Den betales over mange år, så den føles mindre",
         "En engangsskatt betales én gang. Det er overraskelsen som gjør den nøytral, ikke betalingsplanen."),
       F("Den treffer bare de rikeste, som ikke endrer sparingen",
         "Argumentet gjelder alle som eier formue. Det er at skatten kommer uventet som teller."),
   ],
   kort="<p><b>Formuen er alt opparbeidet.</b> Kommer skatten uventet og bare én gang, kan ingen gjøre noe for å "
        "redusere den. Det krever at verdsettingsdatoen ikke er senere enn kunngjøringen.</p>",
   full="<p><b>Hva en vridning er.</b> En skatt vrir når folk endrer atferd for å betale mindre: sparer mindre, "
        "flytter formuen, endrer porteføljen. En skatt som ingen kan påvirke, gir ingen slik tilpasning.</p>"
        "<p><b>Steg 1: engangsskatten.</b> Den treffer formue som alt finnes på en dato som alt er passert. Ingen "
        "valg i dag eller senere endrer den. I prinsippet kunne satsen vært svært høy uten effektivitetstap.</p>"
        "<p><b>Steg 2: problemet.</b> Troverdighet. Et parlament kan ikke binde sine etterfølgere. Tror folk at "
        "skatten kan komme igjen, sparer de mindre. Verst er det om folk tror på en skatt som aldri kommer: all "
        "vridningen og ingen av inntektene.</p>"
        "<p><b>Steg 3: den årlige skatten.</b> Den er kjent på forhånd og treffer sparing hvert år. Den kumulerer og "
        "vrir valget mellom å bruke nå og senere.</p>"
        "<p><b>Merk.</b> Kravet for nøytralitet er at verdsettingsdatoen ikke er senere enn kunngjøringsdatoen.</p>"
        "<p><b>Husk:</b> uventet og én gang: ingen vridning. Årlig: vridning og kumulasjon.</p>")

st("avk-s10", "begrep",
   q="<p>Adam og Miller mener at en årlig formuesskatt slår skjevt ut mellom dem som bruker formuen tidlig og dem som "
     "sparer lenge. Hva er mekanismen?</p>",
   alt=[
       F("Satsen øker med alderen til den som eier formuen",
         "Satsen er den samme hvert år. Det er gjentakelsen som gir virkningen."),
       F("Bunnfradraget faller over tid, så flere betaler",
         "Bunnfradraget har steget, fra 1,7 mill. i 2024 til 1,9 mill. i 2026. Det forklarer ikke kumulasjonen."),
       R("Samme formue skattlegges på nytt hvert år"),
       F("Avkastningen skattlegges dobbelt i det året formuen brukes",
         "Det er ingen dobbeltbeskatning i brukeåret. Belastningen kommer av at skatten treffer hvert år."),
   ],
   kort="<p><b>Kumulasjon.</b> Skatten treffer formuen hvert år. Med 5 % avkastning og 1 % skatt i 40 år blir "
        "sluttverdien (1,04/1,05)<sup>40</sup> = 0,682 av det den ellers ville vært, 31,8 % lavere.</p>",
   full="<p><b>Hva kumulasjonen er.</b> En inntektsskatt treffer en krone én gang når den tjenes. En formuesskatt "
        "treffer den samme kronen hvert år den står. Jo lenger du venter med å bruke den, jo flere ganger er den "
        "skattlagt.</p>"
        "<p><b>Steg 1: ett år.</b> 1 % formuesskatt ved 5 % avkastning tilsvarer 20 % avkastningsskatt.</p>"
        "<p><b>Steg 2: 40 år.</b> Formuen vokser med 1,04 i stedet for 1,05. (1,04/1,05)<sup>40</sup> = 0,682, altså "
        "31,8 % lavere sluttverdi. Med 2 % skatt: (1,03/1,05)<sup>40</sup> = 0,463, altså 53,7 % lavere.</p>"
        "<p><b>Kontroll.</b> Den lineære summen 40 × 1 % = 40 % er for høy. Skatten treffer hvert år en formue som er "
        "mindre enn den ellers ville vært.</p>"
        "<p><b>Konsekvens.</b> Den som bruker eller gir bort formuen raskt, betaler mindre. Adam og Miller mener det er "
        "vanskelig å forsvare prinsipielt.</p>"
        "<p><b>Husk:</b> årlig formuesskatt kumulerer. Belastningen vokser med spareperioden.</p>")

st("avk-s11", "paastand",
   q="<p>Hvilket av disse er et argument <b>for</b> en årlig formuesskatt som Adam og Miller gjengir?</p>",
   alt=[
       F("Formuesskatten treffer meravkastningen og skåner normalavkastningen",
         "Motsatt. Adam og Millers hovedinnvending er at den treffer normalavkastningen."),
       R("Sparing kan avsløre skatteevne som lønnen ikke viser"),
       F("Formuesskatten kumulerer ikke, siden den betales hvert år",
         "Den kumulerer nettopp fordi den betales hvert år. Det er et argument mot."),
       F("Registerstudier viser at den øker sysselsettingen i tett eide selskaper",
         "Sysselsettingsfunnet er Magma-artikkelens empiri, ikke et av Adam og Millers argumenter."),
   ],
   kort="<p><b>Sparing kan avsløre skatteevne.</b> Er sparenivået et tegn på evne utover lønnen, kan en skatt på "
        "sparing omfordele uten å øke lønnsskatten.</p>",
   full="<p><b>Adam og Miller er skeptiske, men gjengir argumentene for.</b> Til eksamen spørres det om hva "
        "argumentene er, ikke hvem som har rett.</p>"
        "<p><b>Steg 1: de tre prinsipielle argumentene.</b> (1) Sparing avslører skatteevne: omfordeling kan da skje "
        "uten høyere skatt på arbeid. (2) Formue gir nytte utover kjøpekraften: trygghet, fleksibilitet, prestisje. "
        "(3) Negative eksternaliteter: status er et nullsumspill og rikdom kan kjøpe politisk innflytelse.</p>"
        "<p><b>Steg 2: andrebest-argumentet.</b> Effektivitetstapet vokser mer enn proporsjonalt med satsen, så det "
        "kan lønne seg å spre provenyet over flere skatter.</p>"
        "<p><b>Steg 3: deres innvendinger.</b> Skatten treffer normalavkastningen og kumulerer over tid.</p>"
        "<p><b>Merk.</b> Sysselsettingsfunnet hører til Magma-artikkelen (Bjerksund og Schjelderup), som forsvarer "
        "skatten med empiri.</p>"
        "<p><b>Hvordan eksamen spør.</b> Ofte som «hvilken påstand er riktig», med argumenter fra begge artiklene blandet sammen. Kjenn hvem som sier hva: Adam og Miller er skeptiske, Magma-artikkelen forsvarer skatten med empiri.</p>"
        "<p><b>Husk:</b> for: skatteevne, nytte, eksternaliteter, andrebest. Mot: normalavkastning, kumulasjon.</p>")

st("avk-s12", "paastand",
   q="<p>Magma-artikkelen (Bjerksund og Schjelderup) forsvarer formuesskatten, men retter kritikk mot én del av den. "
     "Hvilken?</p>",
   alt=[
       F("Satsen, som er høyere enn i nabolandene",
         "Artikkelen forsvarer skatten. Kritikken gjelder grunnlaget, ikke satsen."),
       F("At den reduserer sysselsettingen i tett eide selskaper",
         "Artikkelen viser til registerstudier som ikke finner en slik virkning."),
       F("At den treffer normalavkastningen i stedet for meravkastningen",
         "Det er Adam og Millers innvending, ikke Magma-artikkelens."),
       R("Verdsettingen: unoterte aksjer teller langt under markedsverdi"),
   ],
   kort="<p><b>Verdsettingen.</b> Unoterte aksjer verdsettes av bokført egenkapital og kommer i snitt inn til om lag "
        "halvparten av markedsverdien før rabatt.</p>",
   full="<p><b>Hva artikkelen sier.</b> Bjerksund og Schjelderup forsvarer formuesskatten med empiri: formue er langt "
        "skjevere fordelt enn inntekt og studier finner ikke at skatten reduserer sysselsetting eller sparing "
        "nevneverdig.</p>"
        "<p><b>Steg 1: kritikken.</b> Unoterte aksjer verdsettes av selskapets egen formuesverdi, ikke markedet. De "
        "kommer i snitt inn til om lag halvparten av markedsverdien, før aksjerabatten på 20 %.</p>"
        "<p><b>Steg 2: virkningen.</b> Det vrir proveny, børsens virkemåte og kapitalallokeringen. To tredeler av "
        "formuen til de rikeste ligger i unoterte aksjer.</p>"
        "<p><b>Merk.</b> Normalavkastningsargumentet er Adam og Millers. Sysselsettingsinnvendingen er den "
        "artikkelen avviser.</p>"
        "<p><b>Steg 3: fordelingen.</b> De rikeste har mye av formuen i unoterte aksjer. Den lave verdsettingen gjør at formuesskatten treffer dem relativt lett. Det er en hovedgrunn til at den effektive skatten faller på toppen av fordelingen. Artikkelen mener derfor at problemet ligger i grunnlaget, ikke i satsen.</p>"
        "<p><b>Husk:</b> Magma: for skatten, mot verdsettingen. Adam og Miller: mot skatten.</p>")

st("avk-s13", "begrep",
   q="<p>En norsk investor vurderer en unotert aksje. Alternativet i samme risikoklasse er en børsnotert aksje. Den "
     "unoterte aksjen verdsettes i formuesskatten til langt under markedsverdien, den børsnoterte til 80 % av kursen. "
     "Hvordan blir betalingsviljen hans for den unoterte aksjen, sammenlignet med en utenlandsk investor uten "
     "formuesskatt?</p>",
   alt=[
       F("Lavere, fordi han betaler formuesskatt og utlendingen ikke gjør det",
         "Formuesskatten senker også alternativkostnaden hans. Det er forskjellen i verdsetting som avgjør."),
       F("Lik, fordi formuesskatten alltid stryker seg i et effisient marked",
         "Den stryker seg bare når investeringen og alternativet verdsettes likt."),
       R("Høyere, fordi den unoterte aksjen har lavere formuesskatt"),
       F("Høyere, fordi unoterte aksjer gir høyere avkastning før skatt",
         "Avkastningen før skatt er den samme i samme risikoklasse. Det er skatten som skiller."),
   ],
   kort="<p><b>Høyere.</b> Alternativkostnaden hans er senket av formuesskatt på 80 % av kursen. Den unoterte aksjen "
        "har lavere skatt, så den gir mer etter skatt enn alternativet.</p>",
   full="<p><b>Utgangspunktet.</b> Når investeringen og alternativet rammes likt, stryker formuesskatten seg: V = CF/r, "
        "som for utlendingen.</p>"
        "<p><b>Steg 1: ulik verdsetting.</b> Alternativet, en børsnotert aksje, teller 80 %. Kravet hans faller med "
        "τ<sub>w</sub> × 80 %. Den unoterte aksjen teller kanskje 40 % og strømmen hans faller bare med "
        "τ<sub>w</sub> × 40 %.</p>"
        "<p><b>Steg 2: virkningen.</b> Kravet faller mer enn strømmen. Verdien blir høyere enn CF/r, altså høyere "
        "enn utlendingens.</p>"
        "<p><b>Kontroll.</b> Med τ = 1 %, r = 5 %, CF = 5: alternativet gir 5 % − 0,8 % = 4,2 %. Unotert: "
        "(5 − 0,004V)/V = 0,042 gir V = 5/0,046 = 108,7, over 100.</p>"
        "<p><b>Forutsetningene.</b> Resultatet krever samme risikoklasse og et effisient marked. Det viser at det er verdsettingsreglene som vrir valget mellom unotert og børsnotert.</p>"
        "<p><b>Husk:</b> det er verdsettingsforskjellen, ikke formuesskatten som sådan, som vrir kapitalen.</p>")

st("avk-s14", "begrep",
   q="<p>SSB-forskning viser at den effektive skattesatsen stiger gjennom inntektsfordelingen, men faller for de aller "
     "rikeste. Hva er forklaringen i pensum?</p>",
   alt=[
       F("De rikeste flytter formuen til skatteparadiser og betaler ikke utbytteskatt",
         "Skatteparadis forklarer noe unndragelse, men pensum peker på lovlige regler."),
       R("Lav effektiv selskapsskatt og lav formuesverdi på unoterte aksjer"),
       F("Formuesskatten har lavere sats for formuer over 100 millioner",
         "Satsen er 1,1 % over innslagspunktet, ikke lavere."),
       F("De rikeste tar ut lønn i stedet for utbytte og slipper eierskatten",
         "Lønn har høyere marginalskatt. Det forklarer ikke fallet."),
   ],
   kort="<p><b>Lav selskapsskatt og lav verdsetting.</b> Gjennomsnittlig effektiv selskapsskatt er 13,1 % og unoterte "
        "aksjer verdsettes til om lag 35 % av markedsverdien.</p>",
   full="<p><b>Fakta.</b> I 2004–2018 betalte topp 1 % om lag 22 % av bruttoinntekten i skatt, 90. til 99. prosentil "
        "33 % og topp 0,1 % mellom 9 og 17 %.</p>"
        "<p><b>Steg 1: regnestykket (Bjerksund, Hopland og Schjelderup).</b> Et selskap tjener 100 og er verdt 818. "
        "Børsnotert: formuesverdi 654, formuesskatt 7,20, utbytte til å betale den 11,58 med 4,38 i utbytteskatt. I tillegg kommer "
        "selskapsskatt 13,10. Samlet 24,7 %.</p>"
        "<p><b>Steg 2: unotert.</b> Formuesverdi 818 × 35 % = 286, formuesskatt 3,15, utbytteskatt 1,92, selskapsskatt "
        "13,10. Samlet 18,2 %.</p>"
        "<p><b>Kontroll.</b> 13,10 + 3,15 + 1,92 = 18,17 ✓. En portefølje med en tredel børsnotert gir om lag 20 %, "
        "nær SSB-tallet for topp 1 %.</p>"
        "<p><b>Husk:</b> forklaringen er lav selskapsskatt og lav formuesverdsetting, ikke omgåelse av "
        "utbytteskatten.</p>")

st("avk-s15", "fakta",
   q="<p>Hvilke land har formuesskatt basert på skattyters nettoformue i 2026, ifølge pensum?</p>",
   alt=[
       F("Norge, Sverige og Danmark", "Begge nabolandene har avskaffet formuesskatten. Sverige gjorde det i 2007."),
       F("Norge, Frankrike og Tyskland", "Ingen av de to står på listen i pensum, som bare har Norge, Spania og Sveits."),
       R("Norge, Spania og Sveits"),
       F("Norge, Sveits og Nederland", "Nederland står ikke på listen i pensum. Det tredje landet er Spania."),
   ],
   kort="<p><b>Norge, Spania og Sveits.</b> Bare disse tre har formuesskatt basert på nettoformue i 2026 (Magma-"
        "artikkelen).</p>",
   full="<p><b>Fakta fra pensum.</b> Magma-artikkelen oppgir at bare Norge, Spania og Sveits har formuesskatt basert "
        "på skattyters nettoformue i 2026.</p>"
        "<p><b>Steg 1: tre tall til.</b> Skatter på eiendom utgjorde 2,2 % av samlede skatteinntekter i Norge i 2022, "
        "mot et OECD-snitt på 5,3 %. Norge avviklet arveavgiften i 2014.</p>"
        "<p><b>Steg 2: provenyet.</b> Fjernes formuesskatten, anslås tapet konservativt til om lag 30 mrd. kr. Med "
        "uendret atferd ville det krevd at selskapsskatten gikk fra 22 % til rundt 28 %.</p>"
        "<p><b>Merk.</b> Sverige avskaffet sin formuesskatt i 2007. Et alternativ med nordiske naboland er "
        "derfor galt.</p>"
        "<p><b>Hvorfor det spørres om.</b> Slike fakta er typiske flervalgsdistraktorer: land og tall byttes om. Lær de tre landene og de tre tallene som en pakke.</p>"
        "<p><b>Husk:</b> Norge, Spania, Sveits.</p>")

st("avk-s16", "tolkning",
   q="<p>En plassering gir 5 % avkastning før formuesskatt og 4 % etter. Formuesskatten faller på formuen ved "
     "periodens begynnelse. Hvilken skatt på avkastningen tilsvarer formuesskatten?</p>",
   alt=[
       R("20 %"),
       F("25 %", "Ett prosentpoeng delt på avkastningen etter skatt, 1/4. Ekvivalensen bruker avkastningen før."),
       F("1 %", "Dette er formuesskattesatsen, målt mot formuen. Mot avkastningen er den en femdel."),
       F("4 %", "Dette er avkastningen etter formuesskatt, ikke skatten."),
   ],
   kort="<p><b>20 %.</b> Formuesskatten tar 1 prosentpoeng av 5. 1/5 = 20 %.</p>",
   full="<p><b>Hva tallene sier.</b> Avkastningen faller med 1 prosentpoeng. Det er formuesskattesatsen: "
        "r<sub>etter</sub> = r − τ<sub>w</sub>.</p>"
        "<p><b>Steg 1: andelen.</b> 1 prosentpoeng av 5 er 1/5.</p>"
        "<p><b>Steg 2: som skattesats.</b> t = τ<sub>w</sub>/r = 1 %/5 % = 20 %.</p>"
        "<p><b>Kontroll.</b> H2025 oppgave 3 og 9 er samme mekanisme i to innpakninger: avkastningen falt fra 5 % til "
        "4 % og ekvivalent sats var 20 %. 5 % × (1 − 20 %) = 4 % ✓.</p>"
        "<p><b>Feilene.</b> 25 % kommer av å dele på avkastningen etter skatt, 4 %. 1 % er satsen på formuen, ikke på avkastningen. Ved 10 % avkastning ville samme formuesskatt tilsvart bare 10 %. Ved 2 % ville den tilsvart 50 %.</p>"
        "<p><b>Husk:</b> fratrekket i prosentpoeng delt på avkastningen før skatt gir ekvivalent sats.</p>")

st("avk-s17", "paastand",
   q="<p>«Formuesskatten tvinger norske eiere til å kreve høyere avkastning enn utenlandske investorer.» Hva sier "
     "Bjerksund og Schjelderups modell om påstanden?</p>",
   alt=[
       F("Den stemmer: kravet til en norsk eier øker med formuesskattesatsen",
         "Kravet faller med satsen, fordi alternativet også rammes."),
       F("Den stemmer bare for unoterte aksjer, som har høyest skatt",
         "Unoterte aksjer har lavest formuesverdi og dermed lavest skatt per krone markedsverdi."),
       R("Den stemmer ikke: skatten senker strømmen og kravet like mye"),
       F("Den stemmer ikke, fordi utlendinger også betaler norsk formuesskatt",
         "Utenlandske investorer betaler ikke norsk formuesskatt. Det er nettopp sammenligningen modellen gjør."),
   ],
   kort="<p><b>Den stemmer ikke i modellen.</b> I et effisient, integrert marked senker formuesskatten både "
        "kontantstrømmen og avkastningskravet med τ<sub>w</sub> og verdien blir CF/r.</p>",
   full="<p><b>Påstanden.</b> Den er utbredt i næringslivsdebatten: formuesskatten skal gjøre norske investorer "
        "mindre villige til å betale for aksjer, så norsk eierskap presses ut.</p>"
        "<p><b>Steg 1: modellen.</b> Formuesskatten er en skatt på personen. Den treffer alt investoren eier. Kravet faller "
        "fra r til r − τ<sub>w</sub> og strømmen etter skatt faller med τ<sub>w</sub>V.</p>"
        "<p><b>Steg 2: resultatet.</b> (CF − τ<sub>w</sub>V)/V = r − τ<sub>w</sub> gir V = CF/r, samme verdi som for "
        "utlendingen.</p>"
        "<p><b>Merk.</b> En investor som likevel krever et påslag, går glipp av lønnsomme investeringer og skader "
        "sin egen formue.</p>"
        "<p><b>Nyanse.</b> Resultatet er omstridt: Mæland og Thorburn mener antakelsen om at kravet faller, bryter med "
        "Modigliani og Miller. Til eksamen gjelder forelesningens versjon.</p>"
        "<p><b>Husk:</b> i modellen gir formuesskatten ikke høyere krav, men lavere.</p>")

st("avk-s18", "begrep",
   q="<p>Ekvivalensen t = τ<sub>w</sub>/r forutsetter at alle investorer har samme avkastning. Hva viser en "
     "simuleringsstudie i pensum når avkastningen varierer vedvarende mellom investorer?</p>",
   alt=[
       F("At ekvivalensen fortsatt holder for hver enkelt investor",
         "Ekvivalensen bryter sammen: samme formuesskatt tilsvarer ulike avkastningsskatter for ulike investorer."),
       R("At formuesskatt flytter kapital mot eiere med høy avkastning"),
       F("At en gevinstskatt flytter kapital mot eiere med høy avkastning",
         "Studien finner at gevinstskatten ikke gjør det, men formuesskatten gjør."),
       F("At formuesskatten treffer eierne med høy avkastning hardest",
         "Motsatt. Den tar en fast sum av formuen, altså minst andel av høy avkastning."),
   ],
   kort="<p><b>Formuesskatt flytter kapital mot de høyavkastende.</b> De lavavkastende betaler en høyere andel av "
        "avkastningen. En gevinstskatt gjør ikke dette.</p>",
   full="<p><b>Utgangspunktet.</b> τ<sub>w</sub> = t × r gir samme proveny bare når alle har samme r. Med ulike r "
        "tilsvarer samme formuesskatt ulike avkastningsskatter.</p>"
        "<p><b>Steg 1: hvem som rammes.</b> En eier med 2 % avkastning betaler 1 % formuesskatt, altså 50 % av "
        "avkastningen. En med 10 % betaler 10 %.</p>"
        "<p><b>Steg 2: hva det gjør.</b> Det lønner seg mindre å sitte på kapital med lav avkastning. Over tid flyttes "
        "kapitalen til dem som forvalter den best.</p>"
        "<p><b>Steg 3: konklusjonen i studien.</b> En provenynøytral omlegging fra kapitalinntektsskatt til "
        "formuesskatt øker velferden. Magma-artikkelen bruker det som argument for, Adam og Miller avviser det.</p>"
        "<p><b>Merk.</b> Det er nettopp ulike r som bryter ekvivalensen. Påstander om at den holder for alle, er "
        "gale.</p>"
        "<p><b>Husk:</b> ulike avkastninger: formuesskatten flytter kapital mot høy avkastning, gevinstskatten flytter ikke kapitalen.</p>")

st("avk-s19", "tolkning",
   q="<p>En eier av et unotert selskap må ta utbytte for å betale formuesskatten på 1,0 %. Utbytte skattlegges med "
     "37,84 %. Hvor stor blir den samlede belastningen som andel av formuesverdien?</p>",
   alt=[
       F("1,00 %", "Dette er formuesskatten alene. Utbyttet som betaler den, skattlegges også."),
       F("1,38 %", "Eierskatten lagt oppå: 1 % × 1,3784. Da dekker ikke utbyttet formuesskatten etter skatt."),
       R("1,61 %"),
       F("0,62 %", "Dette er hva som er igjen av et utbytte på 1 % etter eierskatt, 1 % × 0,6216."),
   ],
   kort="<p><b>1,61 %.</b> τ<sub>w</sub>/(1 − t<sub>e</sub>) = 1 %/0,6216 = 1,61 % av formuesverdien.</p>",
   full="<p><b>Hvorfor det blir mer enn 1 %.</b> Hver krone formuesskatt må hentes ut gjennom et utbytte og utbyttet "
        "skattlegges med 37,84 %. Utbyttet må derfor bruttoregnes.</p>"
        "<p><b>Steg 1: utbyttet per krone formuesverdi.</b> D = 1 %/(1 − 0,3784) = 1 %/0,6216 = 1,61 %.</p>"
        "<p><b>Steg 2: fordelingen.</b> 0,61 prosentpoeng går til eierskatt, 1,00 til formuesskatt.</p>"
        "<p><b>Kontroll.</b> 1,61 % × 0,6216 = 1,00 % ✓.</p>"
        "<p><b>Som avkastningsskatt.</b> Med r = 5 % tilsvarer 1,61 % en avkastningsskatt på 1,61/5 = 32,2 %, mot 20 % "
        "for formuesskatten alene. Det er forelesningens hovedargument for eiere uten likvide midler. Motargumentet i "
        "Magma-artikkelen er at utsettelsesordningen er lite brukt og at selskapene som utløser skatten, som regel er "
        "finansielt sterke.</p>"
        "<p><b>Husk:</b> τ<sub>w</sub>/(1 − t<sub>e</sub>), ikke τ<sub>w</sub>(1 + t<sub>e</sub>).</p>")

st("avk-s20", "formel",
   q="<p>Et aktivum gir avkastning r før skatt. Formuesskatten har sats τ<sub>w</sub> på formuesverdien ved "
     "periodens begynnelse og aktivumet har verdsettingsrabatt ρ. Hva er avkastningen etter formuesskatt?</p>",
   alt=[
       F("r − τ<sub>w</sub>ρ", "Rabatten brukt som grunnlag. Grunnlaget er (1 − ρ) av verdien, ikke ρ."),
       F("r − τ<sub>w</sub>", "Rabatten glemt. Skatten treffer bare formuesverdien."),
       F("(r − τ<sub>w</sub>)(1 − ρ)", "Rabatten brukt på hele avkastningen. Den gjelder bare formuesskatten."),
       R("r − τ<sub>w</sub>(1 − ρ)"),
   ],
   kort="<p><b>r − τ<sub>w</sub>(1 − ρ).</b> Skatten er τ<sub>w</sub> av formuesverdien (1 − ρ)W. For aksjer med 1 % "
        "og 20 % rabatt: 0,8 prosentpoeng.</p>",
   full="<p><b>Hva rabatten gjør.</b> Formuesskatten treffer formuesverdien, ikke markedsverdien. Er rabatten ρ, er "
        "formuesverdien (1 − ρ)W og skatten τ<sub>w</sub>(1 − ρ)W.</p>"
        "<p><b>Steg 1: avkastningen etter.</b> (rW − τ<sub>w</sub>(1 − ρ)W)/W = r − τ<sub>w</sub>(1 − ρ).</p>"
        "<p><b>Steg 2: tall.</b> r = 5 %, τ = 1 %, ρ = 20 %: 5 % − 0,8 % = 4,2 %.</p>"
        "<p><b>Steg 3: som avkastningsskatt.</b> 0,8/5 = 16 %, mot 20 % uten rabatt. Rabatten senker den ekvivalente "
        "skatten direkte.</p>"
        "<p><b>Kontroll.</b> W = 100: formuesverdi 80, skatt 0,8, avkastning 5 − 0,8 = 4,2 ✓.</p>"
        "<p><b>Konsekvens.</b> Rabatten gjør aksjer billigere å eie enn bankinnskudd i formuesskatten: 0,8 mot 1,0 prosentpoeng i fratrekk.</p>"
        "<p><b>Husk:</b> fratrekket er τ<sub>w</sub>(1 − ρ). Primærbolig har ρ = 75 %, aksjer 20 %, bank 0.</p>")

st("avk-s21", "begrep",
   q="<p>Hvorfor gir det en «ren» ekvivalens, t = τ<sub>w</sub>/r, når formuesskatten faller på formuen ved "
     "periodens begynnelse?</p>",
   alt=[
       R("Fordi grunnlaget er kjent på forhånd og ikke avhenger av r"),
       F("Fordi loven alltid måler formuen ved periodens begynnelse",
         "Loven måler formuen per 1. januar året etter, altså ved slutten av inntektsåret."),
       F("Fordi avkastningen da også skattlegges ved periodens begynnelse",
         "Avkastningen realiseres og skattlegges ved slutten. Det er formuesgrunnlaget som er fast."),
       F("Fordi formuen da er størst, så skatten blir lettere å regne",
         "Formuen er normalt størst ved slutten. Poenget er at grunnlaget ikke inneholder r."),
   ],
   kort="<p><b>Grunnlaget W er gitt før avkastningen kommer.</b> Da står r bare ett sted i likningen og "
        "t = τ<sub>w</sub>/r.</p>",
   full="<p><b>Hva som skiller de to tidspunktene.</b> Ved periodens begynnelse er formuen W, kjent og fast. Ved "
        "slutten er den W(1 + r) og da inneholder grunnlaget selve avkastningen.</p>"
        "<p><b>Steg 1: begynnelsen.</b> τ<sub>w</sub>W = t × rW gir t = τ<sub>w</sub>/r.</p>"
        "<p><b>Steg 2: slutten.</b> τ<sub>w</sub>W(1 + r) = t × rW gir τ<sub>w</sub> = t × r/(1 + r).</p>"
        "<p><b>Steg 3: forskjellen.</b> Med τ = 1 % og r = 5 % gir begynnelsen 20 %, slutten 21 % (H2025 oppgave 9).</p>"
        "<p><b>Kontroll.</b> Forholdet mellom de to svarene er nøyaktig 1 + r = 1,05 ✓.</p>"
        "<p><b>Forskjellen.</b> t<sub>slutt</sub> − t<sub>begynnelse</sub> = τ<sub>w</sub>(1 + r)/r − τ<sub>w</sub>/r = τ<sub>w</sub>. Den er alltid ett prosentpoeng ved τ = 1 %: 20 mot 21 % ved r = 5 %, 10 mot 11 % ved r = 10 %. Det er forholdet, 1 + r, som vokser med r.</p>"
        "<p><b>Husk:</b> kursets modell bruker begynnelsen. Loven måler per 1. januar året etter. Oppgaveteksten "
        "avgjør.</p>")

st("avk-s22", "begrep",
   q="<p>Adam og Miller nevner et «andrebest»-argument for å ha formuesskatt i tillegg til andre skatter. Hva går det "
     "ut på?</p>",
   alt=[
       F("At formuesskatten er den beste skatten når inntektsskatt er umulig",
         "Argumentet sier ikke at formuesskatt er best, bare at flere skatter kan være bedre enn én høy."),
       R("At tapet vokser raskere enn satsen, så provenyet bør spres"),
       F("At formuesskatten bare skal brukes når andre skatter er brukt opp",
         "Det er ingen rekkefølgeregel. Poenget er at tapet øker mer enn proporsjonalt med satsen."),
       F("At formuesskatten virker som en forsikring for staten i nedgangstider",
         "Det er ikke argumentet. Det handler om fordelingen av skattebyrden over flere grunnlag."),
   ],
   kort="<p><b>Spre provenyet.</b> Dødvektstapet vokser omtrent med kvadratet av satsen. To skatter med middels sats "
        "kan derfor gi mindre tap enn én med høy sats. Motvekten er ekstra administrasjonskostnader.</p>",
   full="<p><b>Hva andrebest betyr.</b> Den beste skatten ville vært en som ikke vrir. Finnes den ikke, må staten "
        "velge blant skatter som alle vrir noe.</p>"
        "<p><b>Steg 1: mekanismen.</b> Effektivitetstapet ved en skatt vokser mer enn proporsjonalt med satsen, "
        "omtrent med kvadratet. Dobles satsen, blir tapet om lag fire ganger så stort.</p>"
        "<p><b>Steg 2: konsekvensen.</b> Det kan lønne seg å hente litt proveny fra mange grunnlag, også formue, "
        "framfor å presse én sats høyt.</p>"
        "<p><b>Steg 3: motvekten.</b> Hver ny skatt har administrasjons- og etterlevelseskostnader.</p>"
        "<p><b>Kontroll.</b> Med tap proporsjonalt med t<sup>2</sup>: én skatt på 40 % gir 1 600, to på 20 % gir "
        "400 + 400 = 800. Halvparten ✓.</p>"
        "<p><b>Husk:</b> andrebest-argumentet: spre provenyet fordi tapet vokser raskere enn satsen.</p>")
