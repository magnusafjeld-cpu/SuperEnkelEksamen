#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Bygger eksamensoppgavene til «Øv uten stopp»: fag/<fag>/_ov/*.py → fag/<fag>/ov.js.

   Hver modul i _ov/ registrerer oppgaver gjennom tools/ov_lib.py. temaer.py har
   TEMAER, DELER, EKSAMEN og SPRAK. Byggeren

     1. lager `antall` varianter av hver oppgave, hver med sin faste seed
        («<id>:<n>:<forsøk>»), og trekker på nytt når en variant blir avvist
        eller har samme tekst som en tidligere variant,
     2. validerer hver variant: samme deloppgaver (etikett, type, poeng) i alle
        variantene, gyldige tall og toleranser, feller utenfor toleransen,
        kriterier som summerer til poengene, gitt der en del bygger på en
        tidligere, språkreglene og balansert HTML,
     3. skriver fila med én oppgave per linje.

   Samme kilde gir alltid byte-lik fil. id-ene er lagringsnøkler for
   repetisjonen: kortet heter «<oppgave-id>:<etikett>» og må aldri endres.
   En oppgave som skrives om til noe annet, får ny id.

   Bruk:  python3 tools/bygg-ov.py fie402
          python3 tools/bygg-ov.py fie402 --bare tvilling.py     # bare egne moduler, til utkast
          python3 tools/bygg-ov.py fie402 --bare tvilling.py --vis ov-tvi1   # les variantene
"""
import importlib.util, json, os, random, re, sys
from html.parser import HTMLParser

ROT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
sys.path.insert(0, os.path.join(ROT, "tools"))
import trening_lib as TL  # noqa: E402
import ov_lib as L  # noqa: E402

MAKS_FORSØK = 80
MIN_VARIANTER = 10

HODE = """/* ===================== {navn} · ØV UTEN STOPP: EKSAMENSOPPGAVER =====================
   Oppgaver i eksamensformat med nye tall i hver variant: en case og deloppgavene
   (a), (b), (c) … Motoren (js/bundle-ov.js) gjør hver deloppgave til et kort i
   repetisjonen og henter en ny variant hver gang kortet kommer tilbake.

   BYGGET FIL, ikke rediger her. Kilden er fag/{fag}/_ov/, og fila lages med:
   python3 tools/bygg-ov.py {fag}
   ============================================================================ */
window.EDU_DATA = window.EDU_DATA || {{}};
window.EDU_DATA.ov = {{
eksamen: {eksamen},
deler: {deler},
temaer: {temaer},
oppgaver: [
"""


# ---------------------------------------------------------------- tekstkontroller
class _Balanse(HTMLParser):
    TOMME = {"br", "hr", "img", "wbr", "input", "col"}

    def __init__(self):
        super().__init__()
        self.stakk, self.feil = [], []

    def handle_starttag(self, tag, attrs):
        if tag not in self.TOMME:
            self.stakk.append(tag)

    def handle_endtag(self, tag):
        if tag in self.TOMME:
            return
        if not self.stakk or self.stakk[-1] != tag:
            self.feil.append(f"</{tag}> uten åpning (åpne: {self.stakk[-3:]})")
            if tag in self.stakk:
                while self.stakk and self.stakk.pop() != tag:
                    pass
        else:
            self.stakk.pop()


def html_feil(t):
    p = _Balanse()
    p.feed(str(t))
    p.close()
    ut = list(p.feil)
    if p.stakk:
        ut.append(f"ulukkede tagger: {p.stakk}")
    return ut


SPRÅK = [
    (re.compile("—"), "tankestrek (—). Bruk komma, kolon eller ny setning"),
    (re.compile(r"Kurbatov[^.!?]*\b(he|his|him|himself|she|her|hers|herself)\b", re.I),
     "kjønnet pronomen om Kurbatov. Bruk navnet"),
    (re.compile(r"[^\s,]+, and\b"), "komma foran «and»"),
    (re.compile(r"\b(option|answer|alternative|choice)\s+[A-D]\b|\b[A-D]\s+is\s+(?:correct|right|wrong|incorrect)\b"),
     "bokstavhenvisning til et alternativ"),
    (re.compile(r"\b(question above|previous question|previous exercise|question before|same firm as|same company as|same person as)\b", re.I),
     "henvisning til et annet spørsmål"),
]


def språkfeil(t):
    # Tagger inne i et ord (r<sub>E</sub>, β<sup>2</sup>) fjernes uten mellomrom, ellers blir
    # «r<sub>E</sub>, and» til «r E , and» og kommaregelen ser det ikke (fallgruve 7å).
    ren = re.sub(r"</?(sub|sup|b|i|em|strong|span)\b[^>]*>", "", str(t))
    ren = re.sub(r"<[^>]+>", " ", ren).replace("&nbsp;", " ")
    return [m for rx, m in SPRÅK if rx.search(ren)]


def norm(s):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", str(s))).strip().lower()


def pen(x):
    return float(f"{x:.12g}")


def innenfor(x, v, rel, abs_):
    grense = max(abs_ or 0, (rel or 0) * abs(v))
    return abs(x - v) <= grense * (1 + 1e-9) + 1e-12


KRIT_POENG = re.compile(r"\((\d+(?:\.\d+)?)\s*p\)\s*$")


# ---------------------------------------------------------------- lasting
def last_moduler(mappe, bare):
    filer = sorted(f for f in os.listdir(mappe) if f.endswith(".py") and not f.startswith("_"))
    if "temaer.py" not in filer:
        sys.exit(f"mangler {mappe}/temaer.py")
    oppsett = None
    for f in ["temaer.py"] + [x for x in filer if x != "temaer.py"]:
        if bare and f != "temaer.py" and f not in bare:
            continue
        spec = importlib.util.spec_from_file_location("ov_" + f[:-3], os.path.join(mappe, f))
        mod = importlib.util.module_from_spec(spec)
        før = len(L.OPPGAVER)
        spec.loader.exec_module(mod)
        for x in L.OPPGAVER[før:]:
            x["fil"] = f
        if f == "temaer.py":
            oppsett = {k: getattr(mod, k, None) for k in ("TEMAER", "DELER", "EKSAMEN", "SPRAK")}
            TL.SPRAK = oppsett.get("SPRAK") or "no"
            if TL.SPRAK not in ("no", "en"):
                sys.exit("temaer.py: SPRAK må være «no» eller «en»")
            if not oppsett.get("TEMAER"):
                sys.exit("temaer.py: TEMAER mangler")
    return oppsett


# ---------------------------------------------------------------- validering
def tekster(d):
    """Alle tekstfeltene i en deloppgave, med navn, til språk- og HTML-kontrollen."""
    ut = [("q", d.get("q")), ("kort", d.get("kort")), ("losning", d.get("losning"))]
    if d.get("gitt"):
        ut.append(("gitt", d["gitt"]))
    if d.get("tekst_ledd"):
        ut.append(("tekst_ledd", d["tekst_ledd"]))
    if d.get("setninger"):
        ut.append(("setninger", d["setninger"]))
    for i, k in enumerate(d.get("kriterier") or []):
        ut.append((f"kriterier[{i}]", k))
    for i, f in enumerate(d.get("feller") or []):
        ut.append((f"feller[{i}]", f.tekst))
    for i, t in enumerate(d.get("svar") or []):
        ut.append((f"svar[{i}].navn", t.navn))
    return ut


def valider_tall(d, hvor):
    svar = d.get("svar") or []
    if not 1 <= len(svar) <= 3:
        raise L.Avvis(f"{hvor}: en taldel skal ha ett til tre tall (har {len(svar)})")
    ut = []
    for i, t in enumerate(svar):
        if not isinstance(t, L.T):
            raise L.Avvis(f"{hvor}: svar[{i}] må lages med T(...)")
        if not str(t.navn or "").strip():
            raise L.Avvis(f"{hvor}: svar[{i}] mangler navn")
        v = t.verdi
        if not isinstance(v, (int, float)) or v != v or v in (float("inf"), float("-inf")):
            raise L.Avvis(f"{hvor}: svar[{i}].verdi er ikke et tall ({v})")
        rel, abs_ = t.rel, t.abs
        if rel is None and abs_ is None:
            rel = L.STD_REL
        if (rel is not None and not rel > 0) or (abs_ is not None and not abs_ > 0):
            raise L.Avvis(f"{hvor}: svar[{i}] har en toleranse som ikke er positiv")
        if abs(v) < 1e-9 and not abs_:
            raise L.Avvis(f"{hvor}: svar[{i}] er 0. Gi en absolutt toleranse (abs=…)")
        if rel is not None and rel > 0.05:
            raise L.Avvis(f"{hvor}: svar[{i}] har rel {rel}, over 5 %")
        tol = {}
        if rel is not None:
            tol["rel"] = rel
        if abs_ is not None:
            tol["abs"] = abs_
        rad = {"navn": t.navn, "verdi": pen(v), "tol": tol}
        if t.enhet:
            rad["enhet"] = t.enhet
        if t.alt:
            rad["alt"] = [pen(a) for a in t.alt]
        ut.append((rad, rel, abs_))
    feller = []
    for j, f in enumerate(d.get("feller") or []):
        if not isinstance(f, L.Felle):
            raise L.Avvis(f"{hvor}: feller[{j}] må lages med Felle(...)")
        if not 0 <= f.i < len(svar):
            raise L.Avvis(f"{hvor}: feller[{j}].i = {f.i} peker ikke på et tall")
        fv = f.verdi
        if not isinstance(fv, (int, float)) or fv != fv:
            raise L.Avvis(f"{hvor}: feller[{j}].verdi er ikke et tall")
        rad, rel, abs_ = ut[f.i]
        for mål in [rad["verdi"]] + rad.get("alt", []):
            if innenfor(fv, mål, rel, abs_):
                raise L.Avvis(f"{hvor}: fella «{str(f.tekst)[:50]}» ({fv}) ligger innenfor toleransen til svaret")
        # Prosent: studenten kan skrive brøken. Fella må heller ikke treffe svaret slik.
        feller.append({"i": f.i, "verdi": pen(fv), "tekst": f.tekst})
    return [u[0] for u in ut], feller


def valider_kriterier(d, mål, hvor):
    kr = d.get("kriterier") or []
    if not kr:
        raise L.Avvis(f"{hvor}: mangler kriterier")
    s = 0.0
    for i, k in enumerate(kr):
        m = KRIT_POENG.search(re.sub(r"<[^>]+>", "", str(k)).strip())
        if not m:
            raise L.Avvis(f"{hvor}: kriterier[{i}] slutter ikke med poeng i parentes, som «(1 p)»")
        s += float(m.group(1))
    if abs(s - mål) > 1e-9:
        raise L.Avvis(f"{hvor}: kriteriene summerer til {s:g} p, men tekstdelen er {mål:g} p")


def valider_variant(ov, hvor):
    if not isinstance(ov, dict) or "deler" not in ov:
        raise L.Avvis(f"{hvor}: returner ovelse(case=…, deler=[…])")
    if not str(ov.get("case") or "").strip():
        raise L.Avvis(f"{hvor}: mangler case")
    deler = ov["deler"]
    if not 1 <= len(deler) <= 7:
        raise L.Avvis(f"{hvor}: en oppgave skal ha 1–7 deloppgaver")
    forventet = "abcdefg"
    ut_deler = []
    for k, d in enumerate(deler):
        h = f"{hvor} ({d.get('l')})"
        if d.get("l") != forventet[k]:
            raise L.Avvis(f"{hvor}: deloppgave {k + 1} har etiketten «{d.get('l')}», ventet «{forventet[k]}»")
        for felt in ("q", "kort", "losning"):
            if not str(d.get(felt) or "").strip():
                raise L.Avvis(f"{h}: mangler {felt}")
        p = d.get("poeng")
        if not isinstance(p, (int, float)) or not 1 <= p <= 12 or (p * 2) != int(p * 2):
            raise L.Avvis(f"{h}: poeng må være 1–12, hele eller halve (er {p})")
        if k == 0 and d.get("gitt"):
            raise L.Avvis(f"{h}: den første deloppgaven skal ikke ha gitt")
        if k > 0 and not d.get("gitt") and not d.get("selvstendig"):
            raise L.Avvis(f"{h}: gi tallene fra tidligere deloppgaver i gitt, eller sett selvstendig=True")
        rad = {"l": d["l"], "type": d["type"], "poeng": p, "q": d["q"].strip()}
        if d.get("gitt"):
            rad["gitt"] = d["gitt"].strip()
        if d["type"] in ("tall", "blandet"):
            svar, feller = valider_tall(d, h)
            rad["svar"] = svar
            if feller:
                rad["feller"] = feller
        if d["type"] == "tekst":
            if d.get("svar"):
                raise L.Avvis(f"{h}: en tekstdel har ikke tall")
            valider_kriterier(d, p, h)
        if d["type"] == "blandet":
            tp = d.get("tall_poeng")
            if not isinstance(tp, (int, float)) or not 0 < tp < p:
                raise L.Avvis(f"{h}: tall_poeng må være mellom 0 og {p} (er {tp})")
            if not str(d.get("tekst_ledd") or "").strip():
                raise L.Avvis(f"{h}: mangler tekst_ledd")
            valider_kriterier(d, p - tp, h)
            rad["tallPoeng"] = tp
            rad["tekstLedd"] = d["tekst_ledd"].strip()
        if d["type"] not in ("tall", "tekst", "blandet"):
            raise L.Avvis(f"{h}: ukjent type {d['type']}")
        if d.get("kriterier"):
            rad["kriterier"] = [str(x).strip() for x in d["kriterier"]]
        if d.get("setninger"):
            rad["setninger"] = str(d["setninger"]).strip()
        rad["kort"] = d["kort"].strip()
        rad["losning"] = d["losning"].strip()
        for navn, t in tekster(d) + ([("case", ov["case"])] if k == 0 else []):
            for m in språkfeil(t):
                raise L.Avvis(f"{h}.{navn}: {m}")
            for m in html_feil(t):
                raise L.Avvis(f"{h}.{navn}: HTML: {m}")
        ut_deler.append(rad)
    return {"case": ov["case"].strip(), "deler": ut_deler}


def svarvektor(v):
    """Alle tallsvarene i varianten, avrundet. Tom når oppgaven bare har tekst."""
    return tuple(float(f"{t['verdi']:.6g}") for d in v["deler"] for t in d.get("svar", []))


def struktur(v):
    return [(d["l"], d["type"], d["poeng"], len(d.get("svar") or [])) for d in v["deler"]]


# ---------------------------------------------------------------- visning
def vis_oppgave(o):
    for n, v in enumerate(o["varianter"], 1):
        print("\n" + "=" * 78 + f"\n{o['id']} · variant {n}")
        print("CASE:", norm(v["case"]))
        for d in v["deler"]:
            print(f"\n  ({d['l']}) [{d['type']}, {d['poeng']} p] {norm(d['q'])}")
            if d.get("gitt"):
                print("    GITT:", norm(d["gitt"]))
            for t in d.get("svar", []):
                print(f"    SVAR: {norm(t['navn'])} = {t['verdi']} {t.get('enhet', '')} tol {t['tol']}" + (f" alt {t['alt']}" if t.get("alt") else ""))
            for f in d.get("feller", []):
                print(f"    FELLE[{f['i']}]: {f['verdi']}  {norm(f['tekst'])}")
            print("    KORT:", norm(d["kort"]))
            for k in d.get("kriterier", []):
                print("    KRIT:", norm(k))
            print("    LØSNING:", norm(d["losning"])[:900])


# ---------------------------------------------------------------- hoved
def main():
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        sys.exit(1)
    fag = args[0]
    bare = set()
    vis = None
    if "--bare" in args:
        bare = {a for a in args[args.index("--bare") + 1:] if not a.startswith("--") and a.endswith(".py")}
    if "--vis" in args:
        vis = args[args.index("--vis") + 1]
    mappe = os.path.join(ROT, "fag", fag, "_ov")
    oppsett = last_moduler(mappe, bare)
    temaer = oppsett["TEMAER"]
    tema_ids = {t["id"] for t in temaer}

    ut, feil, sett_id = [], [], set()
    for o in L.OPPGAVER:
        oid = o["id"]
        if not re.match(r"^ov-[a-z]+[0-9]+$", oid):
            feil.append(f"{o['fil']}: id «{oid}» skal ha formen ov-<prefiks><n>, for eksempel ov-tvi1")
            continue
        if oid in sett_id:
            feil.append(f"{o['fil']}: id «{oid}» er brukt før")
            continue
        sett_id.add(oid)
        if o["tema"] not in tema_ids:
            feil.append(f"{o['fil']} {oid}: ukjent tema «{o['tema']}»")
            continue
        if o["antall"] < MIN_VARIANTER:
            feil.append(f"{o['fil']} {oid}: antall {o['antall']} er under {MIN_VARIANTER}")
        varianter, sett_tekst, sett_svar, mal = [], set(), set(), None
        for n in range(1, o["antall"] + 1):
            siste, ok = "", False
            for forsøk in range(MAKS_FORSØK):
                rng = random.Random(f"{oid}:{n}:{forsøk}")
                try:
                    v = valider_variant(o["fn"](rng), f"{oid}-{n:02d}")
                    nøkkel = norm(v["case"] + " " + " ".join(d["q"] for d in v["deler"]))
                    if nøkkel in sett_tekst:
                        raise L.Avvis("samme tekst som en tidligere variant")
                    # Samme tall med nye navn er ingen ny variant: den som bommet, skal få nye tall.
                    sv = svarvektor(v)
                    if sv and sv in sett_svar:
                        raise L.Avvis("samme svar som en tidligere variant")
                    if mal is not None and struktur(v) != mal:
                        raise L.Avvis(f"deloppgavene skiller seg fra første variant: {struktur(v)} mot {mal}")
                except L.Avvis as e:
                    siste = str(e)
                    continue
                except Exception as e:  # en programfeil i oppgaven: ingen vits å prøve igjen
                    siste = f"{type(e).__name__}: {e}"
                    break
                sett_tekst.add(nøkkel)
                if sv:
                    sett_svar.add(sv)
                mal = mal or struktur(v)
                varianter.append(v)
                ok = True
                break
            if not ok:
                feil.append(f"{o['fil']} {oid}-{n:02d}: ga opp. Siste: {siste}")
        if not varianter:
            continue
        rad = {"id": oid, "tema": o["tema"], "tittel": o["tittel"]}
        if o.get("sjanger"):
            rad["sjanger"] = o["sjanger"]
        if o.get("kilde"):
            rad["kilde"] = o["kilde"]
        rad["deler"] = [{"l": d["l"], "type": d["type"], "poeng": d["poeng"]} for d in varianter[0]["deler"]]
        rad["varianter"] = varianter
        ut.append(rad)

    if vis:
        for o in ut:
            if o["id"] == vis:
                vis_oppgave(o)
        if feil:
            print("\nFEIL:\n" + "\n".join(feil))
        return

    if feil:
        print("\n".join("FEIL " + f for f in feil))
        sys.exit(1)

    tekst = HODE.format(navn=fag.upper(), fag=fag,
                        eksamen=json.dumps(oppsett.get("EKSAMEN")),
                        deler=json.dumps(oppsett.get("DELER") or [], ensure_ascii=False, separators=(",", ":")),
                        temaer=json.dumps(temaer, ensure_ascii=False, separators=(",", ":"))) \
        + ",\n".join(json.dumps(o, ensure_ascii=False, separators=(",", ":")) for o in ut) + "\n]\n};\n"
    mål = os.path.join(ROT, "fag", fag, "ov.js")
    if bare:
        navn = "-".join(sorted(os.path.splitext(f)[0] for f in bare))
        mål = os.path.join(mappe, f"_utkast-{navn}.js")
    with open(mål, "w", encoding="utf-8") as fh:
        fh.write(tekst)

    per = {t["id"]: [0, 0, 0] for t in temaer}
    for o in ut:
        per[o["tema"]][0] += 1
        per[o["tema"]][1] += len(o["varianter"])
        per[o["tema"]][2] += len(o["deler"])
    print(f"{'tema':<14} {'oppgaver':>8} {'varianter':>9} {'deloppg.':>8}")
    for t in temaer:
        a, b, c = per[t["id"]]
        if a or not bare:
            print(f"  {t['id']:<12} {a:>8} {b:>9} {c:>8}")
    typer = {}
    for o in ut:
        for d in o["deler"]:
            typer[d["type"]] = typer.get(d["type"], 0) + 1
    print(f"\n{len(ut)} oppgaver · {sum(len(o['deler']) for o in ut)} kort ({', '.join(f'{k} {v}' for k, v in sorted(typer.items()))})")
    print(f"{os.path.relpath(mål, ROT)}: {len(tekst.encode('utf-8')) / 1024:.0f} KB")


if __name__ == "__main__":
    main()
