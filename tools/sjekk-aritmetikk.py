#!/usr/bin/env python3
"""Kontrollregner regnestykkene i en pensummanual.

Manualene lærer bort regning, så et galt tall er verre enn ingen manual. Dette
skriptet trekker regnestykkene ut av den ferdige HTML-en og regner dem om.

    python3 tools/sjekk-aritmetikk.py FIE432_Manual.html
    python3 tools/sjekk-aritmetikk.py            # alle manualer i repoet

Skrivemåten oppdages per fil: norsk (desimalkomma, mellomrom som tusenskille)
eller engelsk (desimalpunktum, komma som tusenskille). Håndterer ekte minustegn,
prosent, promille, brøktegn, parenteser og enhetene «mill.» og «mrd.».
Kjeder som «100 × 1,02 + 200 = 102 + 200 = 302» kontrolleres ledd for ledd,
siden mellomleddet er en omskrivning og ikke et svar.

> En kontroll som bare bekrefter, er ingen kontroll. Skriptet er testet mot
> innplantede feil; se --selvtest.
"""
import re
import sys
import pathlib
from fractions import Fraction as F

BRØK = {"½": F(1, 2), "⅓": F(1, 3), "⅔": F(2, 3), "¼": F(1, 4), "¾": F(3, 4),
        "⅕": F(1, 5), "⅖": F(2, 5), "⅗": F(3, 5), "⅘": F(4, 5)}
ENHET = {"mill": F(10) ** 6, "mrd": F(10) ** 9}

TOK = re.compile(
    r"(?P<brøk>[½⅓⅔¼¾⅕⅖⅗⅘])"
    r"|(?P<tall>\d{1,3}(?: \d{3})+(?:,\d+)?|\d+(?:,\d+)?)"
    # Mellomrommet konsumeres bare når tegnet faktisk står der. Ellers spiste
    # «22 %» mellomrommet etter seg, og gapet til neste token så tomt ut — som
    # gjorde at implisitt multiplikasjon slo til tvers over en tabellcelle.
    r"(?P<hale>[½⅓⅔¼¾])?(?:\s*(?P<pst>%|‰))?(?:\s*(?P<enhet>mill\.?|mrd\.?))?"
    r"(?P<eksp>[²³⁴])?"
    r"|(?P<par>[()])|(?P<eq>=)|(?P<op>[×·/+−])|(?P<rot>[√])|(?<= )(?P<hyfen>-)(?= )")


def oppløsning(rå):
    """Halve enheten på siste skrevne plass — altså hva avrunding kan koste.

    «302» → 0,5 · «494 000» → 500 (avrundet til nærmeste tusen) · «37,84» → 0,005.
    Uten dette godtar en relativ toleranse et avvik på tusen kroner i et
    sekssifret tall, som er en ekte feil og ikke avrunding."""
    if "," in rå:
        return F(1, 10 ** len(rå.split(",")[1])) / 2
    n = len(rå) - len(rå.rstrip("0"))
    return F(10) ** n / 2


def tokeniser(t):
    ut = []
    for m in TOK.finditer(t):
        if m.group("brøk"):
            ut.append(("n", BRØK[m.group("brøk")], m.start(), m.end(), F(1, 200)))
        elif m.group("tall"):
            rå = m.group("tall").replace(" ", "")
            v = F(rå.replace(",", "."))
            skala = F(1)
            if m.group("hale"):
                v += BRØK[m.group("hale")]
            if m.group("pst"):
                d = 100 if m.group("pst") == "%" else 1000
                v /= d
                skala /= d
            if m.group("enhet"):
                f = ENHET[m.group("enhet").rstrip(".")]
                v *= f
                skala *= f
            if m.group("eksp"):
                v **= {"²": 2, "³": 3, "⁴": 4}[m.group("eksp")]
            ut.append(("n", v, m.start(), m.end(), oppløsning(rå) * skala))
        elif m.group("rot"):
            ut.append(("rot", "√", m.start(), m.end(), F(0)))
        elif m.group("par"):
            ut.append((m.group("par"), None, m.start(), m.end(), F(0)))
        elif m.group("eq"):
            ut.append(("=", None, m.start(), m.end(), F(0)))
        else:
            ut.append(("o", m.group("op") or "−", m.start(), m.end(), F(0)))
    return ut


class Parser:
    """Rekursiv nedstigning over tokenstrømmen. Returnerer None ved noe uventet.

    `tekst` brukes til å se om det står prosa mellom to tokener. Et regnestykke
    skrives sammenhengende; står det bokstaver eller et punktum imellom, er det
    to setninger og ikke ett uttrykk."""

    def __init__(self, toks, i, tekst=""):
        self.t, self.i, self.ledd, self.tekst = toks, i, 0, tekst
        self.start = i
        self.har_rot = False
        self.tol = F(0)          # akkumulert avrundingsrom for tallene som leses

    def kikk(self):
        if self.i >= len(self.t):
            return None
        # Sperren gjelder bare når uttrykket skal FORTSETTE. Sjekket man også
        # det første tokenet, kunne et regnestykke aldri begynne etter en
        # setning — og «Samlet blir det 22 % + …» ble lest fra «78 %».
        if self.i > self.start and self.tekst:
            gap = self.tekst[self.t[self.i - 1][3]:self.t[self.i][2]]
            if re.search(r"[A-Za-zÆØÅæøå.;:,]", gap):
                return None
        return self.t[self.i][0]

    def sum_(self):
        v = self.produkt()
        if v is None:
            return None
        while self.kikk() == "o" and self.t[self.i][1] in "+−":
            o = self.t[self.i][1]
            self.i += 1
            h = self.produkt()
            if h is None:
                return None
            self.ledd += 1
            v = v + h if o == "+" else v - h
        return v

    def produkt(self):
        v = self.atom()
        if v is None:
            return None
        while True:
            k = self.kikk()
            # Implisitt multiplikasjon: FIE402-manualen skriver 0,25(0,96 − 0,00)
            # og 1,20(0,0500) uten gangetegn. Uten dette leses hvert slikt ledd
            # som to uavhengige uttrykk, og hele kontrollen drukner i falske utslag.
            if k == "(" and self.tekst and \
                    self.tekst[self.t[self.i - 1][3]:self.t[self.i][2]] == "":
                # Implisitt multiplikasjon krever at parentesen står KLISTRET inntil
                # tallet: «0,25(0,96 − 0,00)». Med et mellomrom imellom er det som
                # regel to tabellceller, og «3,657 % (3,657 + 0,5) × 0,78» ble lest
                # som ett produkt.
                o = "×"
            elif k == "o" and self.t[self.i][1] in "×·/":
                o = self.t[self.i][1]
                self.i += 1
            else:
                break
            h = self.atom()
            if h is None:
                return None
            if o == "/" and h == 0:
                return None
            self.ledd += 1
            v = v * h if o != "/" else v / h
        return v

    def atom(self):
        k = self.kikk()
        if k == "n":
            v = self.t[self.i][1]
            self.tol += self.t[self.i][4]
            self.i += 1
            return v
        if k == "(":
            self.i += 1
            v = self.sum_()
            if v is None or self.kikk() != ")":
                return None
            self.i += 1
            return v
        if k == "rot":
            self.har_rot = True
            return None
        if k == "o" and self.t[self.i][1] == "−":       # unært minus
            self.i += 1
            v = self.atom()
            return None if v is None else -v
        return None


def les(toks, i, tekst=""):
    """Returnerer (verdi, neste indeks, antall ledd, akkumulert toleranse).

    Toleransen er summen av avrundingsrommet til hvert tall som ble lest. Et
    uttrykk med fem avrundede ledd tåler fem halve enheter, ikke én — uten det
    flagges «0,65(1,7333) + 0,35(0,4333) = 1,12667 + 0,15167» som en feil."""
    p = Parser(toks, i, tekst)
    v = p.sum_()
    return (v, p.i, p.ledd, p.tol) if v is not None else (None, i, 0, F(0))


def nær(a, b, tol):
    """Godtar også at et prosenttall er skrevet som prosentpoeng (0,014 mot 1,4),
    og at enheten «mill.» står på bare den ene siden.

    Rommet er halve enheten på siste skrevne plass, pluss et lite relativt ledd
    for avrunding som har hopet seg opp gjennom flere ledd. Å summere hvert talls
    eget rom i stedet ble for vidt: da slapp «50 × 1,72 × 22 % = 18,93» gjennom.
    Skaleringen ligger på verdien, ikke på toleransen — ganget man toleransen med
    hundre, slapp «½ × 0,60 × 10 = 4» gjennom fordi 3/100 lå innenfor."""
    tol = max(tol, abs(b) * F(1, 10000))
    kandidater = (a, a * 100, a / 100, a * 10 ** 6, a / 10 ** 6, a * 10 ** 9, a / 10 ** 9)
    return any(abs(x - b) <= tol for x in kandidater)


def engelsk_notasjon(t):
    """Er tallene skrevet med desimalpunktum? FIE402-manualen er på engelsk.

    Uten dette leses «0.05 × 200 = 10» som to tall og et punktum, og hele
    kontrollen produserer søppel.

    Telles bare tall med **minst to** desimaler. Ett siffer etter skilletegnet
    treffer seksjonsnumrene («5.2», «avsnitt 0.4»), som finnes i hundretall i
    alle manualene og fikk de norske til å se engelske ut."""
    return len(re.findall(r"\d\.\d{2,}", t)) > len(re.findall(r"\d,\d{2,}", t))


def til_norsk(t):
    """Skriver engelske tall om til norsk form, så resten av verktøyet er felles."""
    t = re.sub(r"(?<=\d),(?=\d{3}\b)", " ", t)     # 1,000 → 1 000
    return re.sub(r"(?<=\d)\.(?=\d)", ",", t)       # 0.05  → 0,05


def rens(html):
    t = re.sub(r"<[^>]+>", " ", html)
    for a, b in [("&minus;", "−"), ("&nbsp;", " "), ("&times;", "×"), ("&sdot;", "·"),
                 ("&#8722;", "−"), ("&amp;", "&"), ("&lt;", "<"), ("&gt;", ">"),
                 ("&frac12;", "½"), ("&ndash;", "–"), ("&mdash;", "—")]:
        t = t.replace(a, b)
    return re.sub(r"[    ]", " ", t)


def sjekk(tekst):
    toks = tokeniser(tekst)
    sjekket, avvik, i = 0, [], 0
    while i < len(toks):
        v, j, ledd, vtol = les(toks, i, tekst)
        if v is None or ledd == 0 or j >= len(toks) or toks[j][0] != "=":
            i += 1
            continue
        kjede, start = [], j
        while j < len(toks) and toks[j][0] == "=":
            # Samme sperre som inne i et uttrykk: en kjede får ikke krysse prosa.
            # «= 32,6 %. Veltes hele avgiften …» er to setninger, ikke ett ledd.
            if kjede and re.search(r"[A-Za-zÆØÅæøå.;:]", tekst[toks[j - 1][3]:toks[j][2]]):
                break
            w, k, _, wtol = les(toks, j + 1, tekst)
            if w is None:
                break
            kjede.append((w, k, wtol))
            j = k
        if not kjede:
            i = start + 1
            continue
        sjekket += 1
        if not all(nær(v, w, tl) for w, _, tl in kjede):
            a = toks[i][2]
            b = toks[kjede[-1][1] - 1][3]
            avvik.append((re.sub(r"\s+", " ", tekst[a:b]), float(v),
                          [float(w) for w, _, _ in kjede],
                          re.sub(r"\s+", " ", tekst[max(0, a - 110):b + 40])))
        i = j
    return sjekket, avvik


def selvtest():
    prøver = [
        ("(500 − 50) × 28 % = 126", True),
        ("(500 − 50) × 28 % = 127", False),
        ("0,28 × 50 × (1/500 − 1/1 000) = 1,4", True),
        ("45 mill. × 1,1 % = 495 000", True),
        ("45 mill. × 1,1 % = 494 000", False),
        ("100 × 1,02 + 10 000 × 2 % = 102 + 200 = 302", True),
        ("100 × 1,02 + 10 000 × 2 % = 102 + 200 = 303", False),
        ("22 % + 78 % × 37,84 % = 51,52 %", True),
        ("16⅔ % × 1 800 000 = 300 000", True),
        ("−240 000 + 560 000 + 140 000 = 460 000", True),
        ("½ × 0,60 × 10 = 3", True),
        ("½ × 0,60 × 10 = 4", False),
        ("(3 600 000 − 1 700 000) × 1,0 % = 19 000", True),
        ("(3 600 000 − 1 700 000) × 1,0 % = 19 500", False),
        ("50 × 1,72 × 22 % = 18,92", True),
        ("50 × 1,72 × 22 % = 18,93", False),
        ("2 800 000 × 3 ‰ = 8 400", True),
        ("2 800 000 × 3 ‰ = 8 500", False),
        ("4,5 × 0,8 = 3,6 mill.", True),
        ("5/0,05 = 100 mill.", True),
        ("0,96 + 0,25(0,96 − 0,00) = 1,20", True),
        ("0,96 + 0,25(0,96 − 0,00) = 1,25", False),
        ("0,80(0,0900) + 0,20(0,0300)(1 − 0,22) = 0,076680", True),
        ("82,16/1,09² = 69,15", True),
        ("82,16/1,09² = 70,15", False),
        ("0,65(1,7333) + 0,35(0,4333) = 1,12667 + 0,15167 = 1,2783", True),
        ("0,0250 + 1,1611(0,0600) = 0,094667 = 9,4667 %", True),
    ]
    feil = 0
    for tekst, skal_gå_opp in prøver:
        n, av = sjekk(tekst)
        gikk = (n > 0 and not av)
        ok = gikk == skal_gå_opp
        if not ok:
            feil += 1
        print(("OK  " if ok else "FEIL"), f"«{tekst}» — forventet "
              f"{'å gå opp' if skal_gå_opp else 'avvik'}, fikk "
              f"{'gikk opp' if gikk else ('avvik' if n else 'ikke gjenkjent')}")
    print(f"\n{len(prøver) - feil} av {len(prøver)} selvtester bestått")
    return feil


def main():
    if "--selvtest" in sys.argv:
        return 1 if selvtest() else 0
    rot = pathlib.Path(__file__).resolve().parent.parent
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    filer = args or sorted(str(p) for p in rot.glob("*.html") if "manual" in p.name.lower())
    tot = 0
    for f in filer:
        t = rens(pathlib.Path(f).read_text())
        eng = engelsk_notasjon(t)
        if eng:
            t = til_norsk(t)
        n, avvik = sjekk(t)
        print(f"\n{'=' * 72}\n{pathlib.Path(f).name} [{'engelsk' if eng else 'norsk'} skrivemåte]: "
              f"{n} regnekjeder kontrollert, {len(avvik)} avvik")
        for u, v, kjede, ctx in avvik:
            print(f"\n  «{u}»")
            print(f"     venstre side gir {v:,.4f} · ledd: {['%.4f' % x for x in kjede]}".replace(",", " "))
            print(f"     … {ctx[:190]}")
        tot += len(avvik)
    return 1 if tot else 0


if __name__ == "__main__":
    sys.exit(main())
