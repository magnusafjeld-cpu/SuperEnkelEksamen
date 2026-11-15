#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Bygger eksamenstreningen: fag/<fag>/_trening/*.py → fag/<fag>/trening.js.

   Hver modul i _trening/ registrerer familier (regneprogrammer) og statiske
   spørsmål gjennom tools/trening_lib.py. temaer.py definerer TEMAER. Byggeren

     1. lager `antall` varianter av hver familie, hver med sin faste seed
        («<familie>:<n>:<forsøk>»), og trekker på nytt når en variant blir
        avvist eller har samme spørsmålstekst som en tidligere variant,
     2. validerer hvert spørsmål (fire alternativer, ett riktig, ingen like),
     3. bestemmer rekkefølgen på alternativene: tall stigende, tekst stokket
        slik at fasiten fordeler seg jevnt på A–D over hele banken,
     4. skriver fila med ett spørsmål per linje.

   Fagets oppsett står i temaer.py ved siden av TEMAER. Alt er valgfritt:
     SPRAK      «no» (standard) eller «en»: tallformatet i trening_lib og
                språkreglene i sjekk-trening.js. Settes før de andre modulene lastes.
     POENG      {"rett": 1, "feil": 0, "blank": 0}. Utelatt: +3/−1/0 som i FIE432.
                Med feil 0 viser motoren antall riktige og prosent, uten minustekster.
     REGN_SELV  True: «Regn selv først» er på som standard i oppsettet.
   Bare det som er satt, skrives til fila, så et fag uten oppsett får samme fil
   som før.

   Spørsmål med tallsvar (sporsmal(..., tall=tallsvar(...))) får feltet
   tall = { verdi, tol: { rel?, abs? }, enhet?, alt? }. Byggeren regner ut verdien
   fra R-alternativet når den ikke er gitt. Den avviser spørsmålet når verdien ikke
   stemmer med R, eller når en felle ligger innenfor toleransen.

   Samme kilde gir alltid byte-lik fil. id-ene er lagringsnøkler for
   fremdriften: <familie>-<nn> for varianter, egen id for statiske.

   Bruk:  python3 tools/bygg-trening.py fie432
          python3 tools/bygg-trening.py fie432 --bare aksjonar.py   # bare én modul, til utprøving
          python3 tools/bygg-trening.py fie432 --vis aks-skj1        # skriv ut variantene av én familie
"""
import importlib.util, json, os, random, re, sys

ROT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
sys.path.insert(0, os.path.join(ROT, "tools"))
import trening_lib as L  # noqa: E402

HODE = """/* ===================== {navn} · EKSAMENSTRENING =====================
   En stor bank med spørsmål i eksamensformatet: fire alternativer, ett riktig,
   en kort fasit og en full gjennomgang. Regnespørsmålene er varianter av små
   regneprogrammer med nye tall, begrepsspørsmålene er skrevet for hånd.

   BYGGET FIL — ikke rediger her. Kilden er fag/{fag}/_trening/, og fila lages
   med: python3 tools/bygg-trening.py {fag}
   Kontroll: node tools/sjekk-trening.js {fag}
   ============================================================================ */
window.EDU_DATA = window.EDU_DATA || {{}};
window.EDU_DATA.trening = {{
{oppsett}temaer: {temaer},
sporsmal: [
"""

MAKS_FORSØK = 60


OPPSETT = ("SPRAK", "POENG", "REGN_SELV")


def last_moduler(mappe, bare):
    filer = sorted(f for f in os.listdir(mappe) if f.endswith(".py") and not f.startswith("_"))
    if "temaer.py" not in filer:
        sys.exit(f"mangler {mappe}/temaer.py")
    temaer = None
    oppsett = {}
    for f in ["temaer.py"] + [x for x in filer if x != "temaer.py"]:
        if bare and f != "temaer.py" and f not in bare:
            continue
        spec = importlib.util.spec_from_file_location("trening_" + f[:-3], os.path.join(mappe, f))
        mod = importlib.util.module_from_spec(spec)
        før_f, før_s = len(L.FAMILIER), len(L.STATISKE)
        spec.loader.exec_module(mod)
        for x in L.FAMILIER[før_f:]: x["fil"] = f
        for x in L.STATISKE[før_s:]: x["fil"] = f
        if f == "temaer.py":
            temaer = mod.TEMAER
            oppsett = {k: getattr(mod, k) for k in OPPSETT if hasattr(mod, k)}
            # Før de andre modulene lastes: tall() og pst() leser språket når de kalles,
            # og de statiske spørsmålene formaterer tallene sine alt ved import.
            L.SPRAK = oppsett.get("SPRAK", "no")
            if L.SPRAK not in ("no", "en"):
                sys.exit(f"temaer.py: SPRAK må være «no» eller «en», ikke «{L.SPRAK}»")
    return temaer, oppsett


def oppsett_tekst(oppsett):
    """Linjene foran temaer: i fila. Tom når faget ikke har satt noe."""
    ut = ""
    if "POENG" in oppsett:
        p = oppsett["POENG"]
        if not isinstance(p, dict) or set(p) - {"rett", "feil", "blank"} \
                or not all(isinstance(v, (int, float)) for v in p.values()):
            sys.exit("temaer.py: POENG må være en ordbok med rett, feil og blank som tall")
        ut += "poeng: " + json.dumps(p, separators=(",", ":")) + ",\n"
    if "SPRAK" in oppsett:
        ut += "sprak: " + json.dumps(oppsett["SPRAK"]) + ",\n"
    if oppsett.get("REGN_SELV"):
        ut += "regnSelv: true,\n"
    return ut


def pen(x):
    """Flyttall uten støy i fila: 0.30000000000000004 → 0.3."""
    return float(f"{x:.12g}")


def innenfor(x, v, rel, abs_):
    grense = max(abs_ or 0, (rel or 0) * abs(v))
    return abs(x - v) <= grense * (1 + 1e-9) + 1e-12


def lag_tall(sp, alt, hvor):
    """Bygger tall-feltet til fila og avviser spørsmålet når tallene ikke
       henger sammen. alt er alternativene i den rekkefølgen de skal stå."""
    t = sp.get("tall")
    if t is None:
        return None
    if not isinstance(t, dict) or not t.get("_tallsvar"):
        raise L.Avvis(f"{hvor}: tall må lages med tallsvar(...)")
    skala = t.get("skala") or 1
    riktig = next(a for a in alt if isinstance(a, L.R))
    rel, abs_ = t.get("rel"), t.get("abs")
    if rel is None and abs_ is None:
        rel = L.STD_REL
    if (rel is not None and not rel > 0) or (abs_ is not None and not abs_ > 0):
        raise L.Avvis(f"{hvor}: toleransen må være positiv")
    verdi = t.get("verdi")
    if verdi is None:
        if riktig.verdi is None:
            raise L.Avvis(f"{hvor}: tallsvar uten verdi krever verdi på R-alternativet")
        verdi = riktig.verdi * skala
    elif riktig.verdi is not None and not innenfor(riktig.verdi * skala, verdi, rel, abs_):
        raise L.Avvis(f"{hvor}: tallsvar.verdi {verdi} stemmer ikke med R-verdien × skala "
                      f"({riktig.verdi} × {skala})")
    if not isinstance(verdi, (int, float)) or verdi != verdi or verdi in (float("inf"), float("-inf")):
        raise L.Avvis(f"{hvor}: tallsvar.verdi må være et tall")
    if verdi == 0 and not abs_:
        raise L.Avvis(f"{hvor}: når svaret er 0, trenger tallsvar en absolutt toleranse (abs=…)")
    for a in alt:
        if isinstance(a, L.F) and a.verdi is not None and innenfor(a.verdi * skala, verdi, rel, abs_):
            raise L.Avvis(f"{hvor}: fella «{a.felle[:50]}» ligger innenfor toleransen til svaret")
    tol = {}
    if rel is not None: tol["rel"] = rel
    if abs_ is not None: tol["abs"] = abs_
    ut = {"verdi": pen(verdi), "tol": tol}
    if t.get("enhet"):
        ut["enhet"] = t["enhet"]
    if all(a.verdi is not None for a in alt):
        ut["alt"] = [pen(a.verdi * skala) for a in alt]
    return ut


def norm(s):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", str(s))).strip().lower()


def norm_alt(s):
    """Som norm(), men skiller store og små bokstaver og beholder senket og
       hevet skrift: P og p, R og r, σ<sub>p</sub> og σ<sup>2</sup> er ulike
       alternativer i en formel."""
    t = re.sub(r"<(/?)(sub|sup)>", r"[\1\2]", str(s))
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", t)).strip()


def valider(sp, hvor):
    alt = sp["alternativer"]
    if len(alt) != 4:
        raise L.Avvis(f"{hvor}: må ha nøyaktig fire alternativer, har {len(alt)}")
    if sum(isinstance(a, L.R) for a in alt) != 1:
        raise L.Avvis(f"{hvor}: må ha nøyaktig ett R")
    if any(not isinstance(a, (L.R, L.F)) for a in alt):
        raise L.Avvis(f"{hvor}: alternativene må lages med R og F")
    tekster = [norm_alt(a.tekst) for a in alt]
    if len(set(tekster)) != 4:
        raise L.Avvis(f"{hvor}: to alternativer har samme tekst: {tekster}")
    verdier = [a.verdi for a in alt]
    if all(v is not None for v in verdier):
        for i in range(4):
            for j in range(i + 1, 4):
                if verdier[i] == verdier[j]:
                    raise L.Avvis(f"{hvor}: to alternativer har samme verdi {verdier[i]}")
    for k in ("q", "kort", "full"):
        if not str(sp.get(k) or "").strip():
            raise L.Avvis(f"{hvor}: mangler {k}")
    lag_tall(sp, alt, hvor)


def ordne(sp, rng, teller):
    """Returnerer (options, answer, traps). Tall stigende; tekst stokket mot den
       posisjonen fasiten har stått minst på så langt."""
    alt = list(sp["alternativer"])
    modus = sp.get("rekkefolge") or "stokk"
    if modus == "stigende":
        if any(a.verdi is None for a in alt):
            raise L.Avvis("rekkefolge «stigende» krever verdi på alle alternativene")
        alt.sort(key=lambda a: a.verdi)
    elif modus == "stokk":
        riktig = next(a for a in alt if isinstance(a, L.R))
        andre = [a for a in alt if a is not riktig]
        rng.shuffle(andre)
        minst = min(teller)
        kandidater = [i for i in range(4) if teller[i] == minst]
        pos = rng.choice(kandidater)
        alt = andre[:pos] + [riktig] + andre[pos:]
    elif modus != "fast":
        raise L.Avvis(f"ukjent rekkefolge «{modus}»")
    svar = next(i for i, a in enumerate(alt) if isinstance(a, L.R))
    teller[svar] += 1
    return alt, svar, modus


def main():
    args = sys.argv[1:]
    if not args:
        print(__doc__); sys.exit(1)
    fag = args[0]
    bare = set()
    vis = None
    if "--bare" in args:
        bare = {a for a in args[args.index("--bare") + 1:] if not a.startswith("--")}
    if "--vis" in args:
        vis = args[args.index("--vis") + 1]
    mappe = os.path.join(ROT, "fag", fag, "_trening")
    temaer, oppsett = last_moduler(mappe, bare)
    tema_ids = {t["id"] for t in temaer}

    ut, feil = [], []
    teller = [0, 0, 0, 0]
    sett_id, sett_q = set(), {}

    def legg_til(id_, tema, fam, typ, sp, rng, kilde, fam_hjelp=None):
        hvor = f"{kilde} {id_}"
        if tema not in tema_ids:
            raise L.Avvis(f"{hvor}: ukjent tema «{tema}»")
        valider(sp, hvor)
        alt, answer, modus = ordne(sp, rng, teller)
        rad = {"id": id_, "tema": tema}
        if fam: rad["fam"] = fam
        rad.update({"type": typ, "q": sp["q"].strip(), "options": [a.tekst for a in alt], "answer": answer,
                    "traps": [a.felle for a in alt], "kort": sp["kort"].strip(), "full": sp["full"].strip()})
        hjelp = sp.get("hjelp") or fam_hjelp
        # Tre trinn (hjelp3): tema og regel blir hint, oppsettet er hjelpen.
        if isinstance(hjelp, (tuple, list)):
            if len(hjelp) != 3 or not all(str(h or "").strip() for h in hjelp):
                raise L.Avvis(f"{hvor}: hjelp3 må ha tre tekster")
            rad["hint"] = [hjelp[0].strip(), hjelp[1].strip()]
            hjelp = hjelp[2]
        if hjelp: rad["hjelp"] = hjelp.strip()
        tall_ut = lag_tall(sp, alt, hvor)
        if tall_ut: rad["tall"] = tall_ut
        ut.append(rad)
        return modus

    # Statiske først, så rekkefølgen i fila følger kildene.
    for s in L.STATISKE:
        try:
            if s["id"] in sett_id:
                raise L.Avvis(f"{s['fil']}: id «{s['id']}» er brukt før")
            sett_id.add(s["id"])
            legg_til(s["id"], s["tema"], None, s["type"], s["sp"], random.Random("statisk:" + s["id"]), s["fil"])
        except (L.Avvis, Exception) as e:
            feil.append(f"{s.get('fil')} {s.get('id')}: {e}")

    for fam in L.FAMILIER:
        fid = fam["id"]
        if not re.match(r"^[a-z0-9]+(-[a-z0-9]+)*$", fid):
            feil.append(f"{fam['fil']}: familie-id «{fid}» skal være små bokstaver, tall og bindestrek")
            continue
        sett_tekst = set()
        lagd = 0
        for n in range(1, fam["antall"] + 1):
            id_ = f"{fid}-{n:02d}"
            if id_ in sett_id:
                feil.append(f"{fam['fil']}: id «{id_}» er brukt før"); continue
            ok = False
            siste = ""
            for forsøk in range(MAKS_FORSØK):
                rng = random.Random(f"{fid}:{n}:{forsøk}")
                try:
                    sp = fam["fn"](rng)
                    if norm(sp["q"]) in sett_tekst:
                        raise L.Avvis("samme spørsmålstekst som en tidligere variant")
                    valider(sp, id_)
                except L.Avvis as e:
                    siste = str(e); continue
                except Exception as e:
                    siste = f"{type(e).__name__}: {e}"; break
                sett_tekst.add(norm(sp["q"]))
                sett_id.add(id_)
                legg_til(id_, fam["tema"], fid, fam["type"], sp, rng, fam["fil"], fam.get("hjelp"))
                ok = True; lagd += 1
                break
            if not ok:
                feil.append(f"{fam['fil']} {id_}: ga opp etter {MAKS_FORSØK} forsøk. Siste: {siste}")
        fam["lagd"] = lagd

    if vis:
        for r in ut:
            if r.get("fam") == vis or r["id"] == vis:
                print("\n" + "=" * 78 + f"\n{r['id']}  (fasit {'ABCD'[r['answer']]})")
                print(norm(r["q"]))
                for i, o in enumerate(r["options"]):
                    print(f"  {'ABCD'[i]}. {norm(o)}" + ("   ← riktig" if i == r["answer"] else f"   [{norm(r['traps'][i])}]"))
                if r.get("tall"):
                    t = r["tall"]
                    print("TALL:", t["verdi"], t.get("enhet", ""), t["tol"], "alt:", t.get("alt"))
                print("KORT:", norm(r["kort"]))
                print("FULL:", norm(r["full"])[:1200])
        if feil:
            print("\nFEIL:\n" + "\n".join(feil))
        return

    if feil:
        print("\n".join("FEIL " + f for f in feil))
        sys.exit(1)

    temaer_ut = [{k: v for k, v in t.items()} for t in temaer]
    linjer = [json.dumps(r, ensure_ascii=False, separators=(",", ":")) for r in ut]
    tekst = HODE.format(navn=fag.upper(), fag=fag, oppsett=oppsett_tekst(oppsett),
                        temaer=json.dumps(temaer_ut, ensure_ascii=False, separators=(",", ":"))) \
        + ",\n".join(linjer) + "\n]\n};\n"
    mål = os.path.join(ROT, "fag", fag, "trening.js")
    if bare:
        # Eget utkast per modulsett, så flere skribenter kan bygge samtidig.
        navn = "-".join(sorted(os.path.splitext(f)[0] for f in bare))
        mål = os.path.join(ROT, "fag", fag, "_trening", f"_utkast-{navn}.js")
    open(mål, "w", encoding="utf-8").write(tekst)

    # rapport
    per_tema = {t["id"]: [0, 0] for t in temaer}
    for r in ut:
        per_tema[r["tema"]][0 if r.get("fam") else 1] += 1
    print(f"{'tema':<16} {'varianter':>9} {'statiske':>9} {'sum':>5} {'mål':>5}")
    for t in temaer:
        v, s = per_tema[t["id"]]
        print(f"  {t['id']:<14} {v:>9} {s:>9} {v + s:>5} {t.get('mal', 0):>5}")
    med_tall = sum(1 for r in ut if r.get("tall"))
    print(f"\n{len(L.FAMILIER)} familier · {len(L.STATISKE)} statiske · {len(ut)} spørsmål"
          + (f" · {med_tall} med tallsvar" if med_tall else ""))
    print(f"fasit på A–D: {'/'.join(str(x) for x in teller)}")
    print(f"{os.path.relpath(mål, ROT)}: {len(tekst.encode('utf-8')) / 1024:.0f} KB")


if __name__ == "__main__":
    main()
