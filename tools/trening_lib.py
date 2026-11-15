# -*- coding: utf-8 -*-
"""Felles verktøy for spørsmålene i eksamenstreningen (EDU_DATA.trening).

   Et fag skriver spørsmålene sine som Python-moduler i fag/<fag>/_trening/.
   tools/bygg-trening.py importerer dem, lager variantene og skriver
   fag/<fag>/trening.js. Spesifikasjonen er docs/<fag>-trening-spek.md.

   To slags spørsmål:

   FAMILIER er små regneprogrammer. Funksjonen får en tilfeldighetsgenerator
   og returnerer ett spørsmål med tall den selv har trukket. Byggeren kaller den
   `antall` ganger med hver sin faste seed, så samme kildekode alltid gir de
   samme spørsmålene. Aritmetikken er riktig per konstruksjon: tallene i
   spørsmålet, fasiten og gjennomgangen kommer fra de samme variablene.

       @familie("aks-skj1", tema="aksjonar", antall=8, tittel="Skattepliktig utbytte, ett år")
       def _(r):
           kost = r.randrange(200_000, 900_001, 50_000)
           ...
           return sporsmal(q=..., alternativer=[R(...), F(...), F(...), F(...)], kort=..., full=...)

   STATISKE spørsmål er skrevet for hånd: begreper, påstander, formelgjenkjenning.

       statisk("aks-b01", tema="aksjonar", type="begrep", q=..., alternativer=[...], kort=..., full=...)

   Alternativene lages med R (riktig) og F (feil, med fella som forklarer hvilken
   feil alternativet er laget av). Byggeren stokker dem slik at fasiten fordeler
   seg likt på A–D over hele banken. Skriv derfor ALDRI «alternativ B» i teksten.
   Stigende rekkefølge er valgfritt (rekkefolge="stigende"), men da havner
   fasiten på samme plass i hver variant når fellene alltid ligger på samme side
   av svaret, og det lærer leseren posisjonen. Bruk det bare når fellene ligger
   på begge sider og bytter plass mellom variantene.

   SPRÅK. Tallformatet følger faget. Byggeren setter SPRAK fra fagets
   temaer.py før de andre modulene lastes: «no» (standard, FIE432) gir
   «1 234,5» og «12,5 %», «en» (FIE402) gir «1 234.5» og «12.5%». Begge bruker
   hardt mellomrom som tusenskille og ekte minustegn (−).

   TALLSVAR. Et spørsmål med ett tall som svar kan få feltet tall, så leseren
   kan skrive tallet sitt før hun ser alternativene («Regn selv først»):

       sporsmal(q, [R(pst(r_e), r_e), F(...), ...], kort, full,
                tall=tallsvar(skala=100, enhet="%"))

   Verdien hentes fra R-alternativets verdi × skala, og fellene får sine
   verdier på samme måte, så et galt tall som treffer en felle, regnes som
   det alternativet. Se tallsvar().
"""
from decimal import Decimal, ROUND_HALF_UP
import math

NBSP = " "
MINUS = "−"

# Fagets tallformat: «no» eller «en». Settes av tools/bygg-trening.py fra
# SPRAK i fagets temaer.py, før de andre modulene lastes.
SPRAK = "no"

# Standardtoleransen for tallsvar: 0,1 % relativt avvik (Kurbatov, FIE402).
STD_REL = 0.001

FAMILIER = []
STATISKE = []


class Avvis(Exception):
    """Kast denne i en familie når de trukne tallene gir et dårlig spørsmål
       (for eksempel to like alternativer eller et negativt grunnlag). Byggeren
       trekker da på nytt med en ny seed."""


# ---------------------------------------------------------------- tallformat
def rund(x, d=0):
    """Avrunding slik man gjør for hånd: 0,5 rundes opp (ikke bankers rounding)."""
    q = Decimal(1).scaleb(-d)
    return float(Decimal(repr(float(x))).quantize(q, rounding=ROUND_HALF_UP))


def tall(x, d=0):
    """1234567.891 → «1 234 567,89» med hardt mellomrom som tusenskille, komma
       som desimaltegn og ekte minustegn. d er antall desimaler, alltid vist.
       Med SPRAK «en» er punktum desimaltegnet: «1 234 567.89»."""
    v = rund(x, d)
    neg = v < 0
    s = f"{abs(v):,.{d}f}" if d > 0 else f"{int(round(abs(v))):,}"
    if SPRAK == "en":
        s = s.replace(",", NBSP)
    else:
        s = s.replace(",", NBSP).replace(".", ",")
    return (MINUS if neg and v != 0 else "") + s


def kr(x, d=0):
    """«kr 1 234» (d=0) eller «kr 1 234,50» (d=2)."""
    return "kr" + NBSP + tall(x, d)


def gen(navn):
    """Genitiv av et navn: «Mira» → «Miras», «Jonas» → «Jonas'».
       Engelsk: «Fjord» → «Fjord's», «Atlas» → «Atlas'»."""
    if SPRAK == "en":
        return navn + ("'" if navn[-1:].lower() == "s" else "'s")
    return navn + ("'" if navn[-1:].lower() in "sxz" else "s")


def heltall(x):
    """Sant når x er et helt antall kroner etter avrunding til øre."""
    return abs(rund(x, 2) - round(x)) < 1e-9


def talla(x):
    """Som tall(), men med to desimaler bare når beløpet ikke er helt: 14 400 og 1 834,20."""
    return tall(x, 0 if heltall(x) else 2)


def kra(x):
    """Som kr(), men med øre bare når beløpet ikke er helt: «kr 14 400» og «kr 1 834,20»."""
    return "kr" + NBSP + talla(x)


def _pst_tegn():
    # Engelsk fagstoff skriver «6%» uten mellomrom (docs/fie402-forfatterspek.md § 4).
    return "%" if SPRAK == "en" else NBSP + "%"


def pst(x, d=1):
    """Brøk til prosent: 0.165 → «16,5 %» (engelsk «16.5%»). d er desimaler i prosenttallet."""
    return tall(x * 100, d) + _pst_tegn()


def prosent_tekst(p, d=1):
    """Prosenttall som allerede er i prosent: 3.6 → «3,6 %» (engelsk «3.6%»)."""
    return tall(p, d) + _pst_tegn()


def mill(x, d=1):
    """5_250_000 → «5,25 mill.» med d desimaler (d=2 her). Engelsk: «5.25 million»."""
    return tall(x / 1e6, d) + NBSP + ("million" if SPRAK == "en" else "mill.")


def penger(x, d=0, symbol="$"):
    """Beløp med valutategn foran: «$1 234», «−$1 234.50», «NOK 1 234».
       Et tegn ($, €, £) står inntil tallet, en kode (NOK, USD) med hardt mellomrom."""
    tegn = symbol if len(symbol) == 1 else symbol + NBSP
    return (MINUS if rund(x, d) < 0 else "") + tegn + tall(abs(x), d)


# ---------------------------------------------------------------- alternativer
class R:
    """Det riktige alternativet. verdi er tallet bak teksten, når det finnes."""
    def __init__(self, tekst, verdi=None):
        self.tekst, self.verdi, self.felle = tekst, verdi, None


class F:
    """Et galt alternativ. felle sier hvilken konkret feil som gir det, med
       regnestykket når det er et tall: «Glemt oppjusteringen: 50 000 × 22 %»."""
    def __init__(self, tekst, felle, verdi=None):
        if not felle or not str(felle).strip():
            raise ValueError("F trenger en felletekst")
        self.tekst, self.verdi, self.felle = tekst, verdi, felle


def sporsmal(q, alternativer, kort, full, rekkefolge=None, hjelp=None, tall=None):
    """rekkefolge: «stokk» (standard), «stigende» (tall i stigende rekkefølge,
       se modulteksten) eller «fast» (behold rekkefølgen du skrev, for eksempel
       når alternativene er «Bare I», «Bare II», «Begge», «Ingen»).
       tall: tallsvar(...) når svaret er ett tall leseren kan regne selv."""
    return dict(q=q, alternativer=alternativer, kort=kort, full=full, rekkefolge=rekkefolge, hjelp=hjelp, tall=tall)


def tallsvar(verdi=None, enhet="", rel=None, abs=None, skala=1):
    """Det numeriske svaret til «Regn selv først». Leseren skriver tallet i
       enheten som står ved feltet, og svaret godtas når avviket er innenfor
       toleransen.

       verdi  tallet leseren skal skrive, i enheten. Utelatt: R-alternativets
              verdi × skala. Gi R en verdi, så slipper du å skrive tallet to ganger.
       enhet  vises ved feltet: «%», «million», «$ million», «years», «shares».
              Med «%» godtas også brøken (0.125 for 12.5 %).
       rel    relativt avvik som godtas. Standard STD_REL (0,1 %).
       abs    absolutt avvik som godtas, i enheten. Påkrevd når verdien er 0.
              Gis begge, godtas det største avviket.
       skala  regner R- og F-verdiene om til enheten: 100 når verdiene er
              brøker og enheten er «%».

       Byggeren sjekker at verdien stemmer med R-alternativet og at ingen
       felle ligger innenfor toleransen. Den legger også verdien bak hvert
       alternativ ved (alt), når alle har verdi, så et galt tall som treffer
       en felle, vises som det alternativet."""
    return dict(_tallsvar=True, verdi=verdi, enhet=enhet, rel=rel, abs=abs, skala=skala)


def hjelp3(tema, regel, oppsett):
    """Hjelpen i tre trinn, som vises ett om gangen (spesifikasjonen § 2c):
       tema     hvilket begrep spørsmålet handler om og hva du skal finne. Én til
                to setninger, ingen formel.
       regel    regelen eller formelen, med symboler og uten spørsmålets tall.
       oppsett  fremgangsmåten steg for steg, slik hjelpen var før.
       Alle tre skal la svaret stå åpent."""
    return (tema, regel, oppsett)


def familie(id, tema, antall, tittel="", type="regne", hjelp=None):
    """hjelp: fremgangsmåten uten tall, felles for alle variantene. En variant
       kan overstyre den med sporsmal(..., hjelp=...) når familien har flere
       spørsmålstyper. Se spesifikasjonen § 2b."""
    def dek(fn):
        FAMILIER.append(dict(id=id, tema=tema, antall=antall, tittel=tittel, type=type, fn=fn, hjelp=hjelp))
        return fn
    return dek


def statisk(id, tema, q, alternativer, kort, full, type="begrep", rekkefolge=None, hjelp=None, tall=None):
    STATISKE.append(dict(id=id, tema=tema, type=type,
                         sp=sporsmal(q, alternativer, kort, full, rekkefolge, hjelp, tall)))


# ---------------------------------------------------------------- små hjelpere
def nær(a, b, rel=0.005):
    """Sant når to tall ligger så tett at de ikke bør stå som hvert sitt alternativ."""
    return abs(a - b) <= rel * max(abs(a), abs(b), 1e-12)


def ulike(*verdier, rel=0.005):
    """Kast Avvis hvis to av verdiene er for like. Bruk den på alternativene."""
    v = list(verdier)
    for i in range(len(v)):
        for j in range(i + 1, len(v)):
            if nær(v[i], v[j], rel):
                raise Avvis(f"for like alternativer: {v[i]} og {v[j]}")


def annuitetsfaktor(r, n):
    """[1 − (1 + r)^−n] / r"""
    return (1 - (1 + r) ** -n) / r


def annuitet(L, r, n):
    """Terminbeløp på et annuitetslån: L · r / (1 − (1 + r)^−n)."""
    return L * r / (1 - (1 + r) ** -n)


def internrente(kontantstrom, lav=-0.99, hoy=10.0):
    """Internrenten til en kontantstrøm [c0, c1, …] med halvering.
       c0 er typisk positivt (lånet du får), resten negative (det du betaler)."""
    def npv(r):
        return sum(c / (1 + r) ** t for t, c in enumerate(kontantstrom))
    a, b = lav, hoy
    fa, fb = npv(a), npv(b)
    if fa * fb > 0:
        raise Avvis("internrenten finnes ikke i intervallet")
    for _ in range(200):
        m = (a + b) / 2
        fm = npv(m)
        if fa * fm <= 0:
            b, fb = m, fm
        else:
            a, fa = m, fm
    return (a + b) / 2


def sqrt(x):
    return math.sqrt(x)


def ln(x):
    return math.log(x)
