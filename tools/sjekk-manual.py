#!/usr/bin/env python3
"""
Kontrollerer at en pensummanual er slik parseren i js/bundle-core.js krever.

Parseren feiler aldri høylytt. Bryter du en regel, forsvinner innholdet i
stillhet: en `h3` nøstet i en `div` gjør at seksjonen aldri finnes, en `.formula`
uten `.eq` og `.where` kastes, og en rå `<` spiser resten av dokumentet. Denne
kontrollen ser etter nøyaktig de tingene, og speiler parserens egne regler.

    python3 tools/sjekk-manual.py FIE432_Manual.html
    python3 tools/sjekk-manual.py            # alle manualer i repoet

Fagnøytral. Referansekapitlet slås opp i js/subjects.js via manualens filnavn
(manual.refSections.formulas); mangler oppslaget, gjettes det på seksjonen med
flest `table.data` rett etter en `N.M`-overskrift. Overstyres med --ref=k20.
"""
import html.parser
import pathlib
import re
import sys

# ---------------------------------------------------------------- liten DOM

TOMME = {"br", "hr", "img", "input", "meta", "link", "col", "source", "area", "base", "wbr"}


class Node:
    __slots__ = ("tag", "attrs", "barn", "forelder", "tekst")

    def __init__(self, tag, attrs=None, forelder=None):
        self.tag, self.attrs, self.barn, self.forelder, self.tekst = tag, attrs or {}, [], forelder, ""

    @property
    def klasser(self):
        return set((self.attrs.get("class") or "").split())

    def har(self, *k):
        return self.klasser.issuperset(k)

    def alle(self, pred):
        """Alle etterkommere som matcher, i dokumentrekkefølge."""
        ut = []
        for b in self.barn:
            if isinstance(b, Node):
                if pred(b):
                    ut.append(b)
                ut += b.alle(pred)
        return ut

    def direkte(self, pred):
        return [b for b in self.barn if isinstance(b, Node) and pred(b)]

    def txt(self):
        d = []
        for b in self.barn:
            d.append(b if isinstance(b, str) else b.txt())
        return "".join(d)


class Bygger(html.parser.HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.rot = Node("#rot")
        self.stabel = [self.rot]
        self.nøstet_section = []

    def handle_starttag(self, tag, attrs):
        n = Node(tag, dict(attrs), self.stabel[-1])
        self.stabel[-1].barn.append(n)
        if tag == "section" and any(x.tag == "section" for x in self.stabel):
            self.nøstet_section.append(self.getpos()[0])
        if tag not in TOMME:
            self.stabel.append(n)

    def handle_startendtag(self, tag, attrs):
        self.stabel[-1].barn.append(Node(tag, dict(attrs), self.stabel[-1]))

    def handle_endtag(self, tag):
        for i in range(len(self.stabel) - 1, 0, -1):
            if self.stabel[i].tag == tag:
                del self.stabel[i:]
                return

    def handle_data(self, data):
        self.stabel[-1].barn.append(data)


def norm(s):
    return re.sub(r"\s+", " ", s).strip()


# ---------------------------------------------------------------- kontrollen

class Rapport:
    def __init__(self):
        self.feil, self.advarsel = [], []

    def f(self, hvor, m):
        self.feil.append(f"{hvor}: {m}")

    def a(self, hvor, m):
        self.advarsel.append(f"{hvor}: {m}")


def rå_vinkelparenteser(kilde):
    """Rå < eller > i tekst. DOMParser spiser resten av dokumentet fra en rå <.

    Vi ser bare etter < som ikke innleder en tagg, en kommentar eller en
    entitet. Et > alene er lovlig HTML, men ulesbart i en formel, så det
    rapporteres som advarsel."""
    ut = []
    for i, linje in enumerate(kilde.splitlines(), 1):
        # < som ikke følges av bokstav, /, !, ? -> rå
        for m in re.finditer(r"<(?![a-zA-Z/!?])", linje):
            ut.append((i, "rå <", linje[max(0, m.start() - 30):m.start() + 30].strip()))
    return ut


def ref_fra_manifest(sti):
    """Slår opp fagets refSections.formulas i js/subjects.js, via manualfilnavnet."""
    reg = pathlib.Path(__file__).resolve().parent.parent / "js" / "subjects.js"
    if not reg.exists():
        return None
    kilde = reg.read_text()
    navn = pathlib.Path(sti).name
    i = kilde.find(navn)
    if i < 0:
        return None
    # nærmeste refSections etter treffet, innenfor samme manifestobjekt
    m = re.search(r"refSections:\s*\{[^}]*?formulas:\s*[\"']([^\"']+)[\"']", kilde[i:i + 1200])
    return m.group(1) if m else None


def sjekk_manual(sti, ref_id=None):
    kilde = pathlib.Path(sti).read_text()
    b = Bygger()
    b.feed(kilde)
    rot, r = b.rot, Rapport()

    for ln in b.nøstet_section:
        r.f(f"linje {ln}", "nøstet <section> — lukker feil nivå")
    for ln, hva, ctx in rå_vinkelparenteser(kilde):
        r.f(f"linje {ln}", f"{hva} i teksten — parseren mister resten av dokumentet. Bruk &lt;  ({ctx!r})")

    seksjoner = rot.alle(lambda n: n.tag == "section" and re.fullmatch(r"k\d+", n.attrs.get("id", "")))
    if not seksjoner:
        r.f(pathlib.Path(sti).name, "ingen <section id=\"kN\"> funnet — parseren ser ingen kapitler")
        return r, [], None

    # nesten-treff: section-er som ser ut som kapitler men ikke matcher filteret
    for n in rot.alle(lambda n: n.tag == "section" and n.attrs.get("id")):
        i = n.attrs["id"]
        if not re.fullmatch(r"k\d+", i) and re.match(r"[kK]\s*\d", i):
            r.f(f"section#{i}", "id-en matcher ikke /^k\\d+$/ — kapitlet blir usynlig")
    for n in rot.alle(lambda n: n.tag == "div" and re.fullmatch(r"k\d+", n.attrs.get("id", ""))):
        r.f(f"div#{n.attrs['id']}", "kapitlet er en <div>, ikke en <section> — parseren finner det ikke")

    kap = []
    for sec in seksjoner:
        sid = sec.attrs["id"]
        num = int(sid[1:])
        hvor = f"{sid}"

        chap = sec.alle(lambda n: n.tag == "h2" and n.har("chap"))
        if not chap:
            r.f(hvor, "mangler <h2 class=\"chap\"> — hele kapitlet blir tomt")
            kap.append((num, "(uten tittel)", 0, {}))
            continue
        if len(chap) > 1:
            r.a(hvor, f"{len(chap)} h2.chap — bare den første brukes")
        chap = chap[0]
        if chap.forelder is not sec:
            r.f(hvor, "h2.chap er ikke direkte barn av <section> — brødteksten starter feil sted")

        tittel = norm(chap.txt())
        m = re.match(r"^(?:Kapittel\s+)?(\d+)\s*([·.])\s*(.+)$", tittel)
        if not m:
            r.f(hvor, f"tittelen «{tittel[:60]}» følger ikke «N · Tittel» — prefikset blir stående")
        elif int(m.group(1)) != num:
            r.f(hvor, f"tittelen sier kapittel {m.group(1)}, id-en sier {num}")
        rentittel = m.group(3) if m else tittel

        # alt før h2.chap går tapt, unntatt det parseren selv fjerner
        tapt = []
        for b_ in sec.barn:
            if b_ is chap:
                break
            if isinstance(b_, str):
                if b_.strip():
                    tapt.append(f"tekst «{norm(b_)[:40]}»")
            elif not (b_.tag == "a" and b_.har("backtotop")) \
                    and not any(k.startswith("part") for k in b_.klasser) \
                    and not (b_.tag == "hr" and b_.har("sec")):
                # Deletiketter (h2.part, div.parttag) er dekor i den frittstående
                # fila; appen henter delen fra manifestet, så de SKAL forsvinne.
                tapt.append(f"<{b_.tag}>")
        if tapt:
            r.f(hvor, "innhold før h2.chap går tapt: " + ", ".join(tapt[:4]))

        # h3: må være direkte barn, og komme etter h2.chap
        alle_h3 = sec.alle(lambda n: n.tag == "h3")
        direkte_h3 = [n for n in alle_h3 if n.forelder is sec]
        for n in alle_h3:
            if n.forelder is not sec:
                r.f(hvor, f"«{norm(n.txt())[:44]}» er en h3 nøstet i <{n.forelder.tag}> — seksjonen forsvinner")
        if not direkte_h3:
            r.a(hvor, "ingen h3-seksjoner")

        sett = []
        for n in direkte_h3:
            t = norm(n.txt())
            mm = re.match(r"^(\d+)\.(\d+)\s+(.*)$", t)
            if not mm:
                r.f(hvor, f"h3 «{t[:44]}» mangler «N.M »-prefiks — id-en blir tom")
                continue
            if int(mm.group(1)) != num:
                r.f(hvor, f"h3 «{t[:44]}» er nummerert {mm.group(1)}.x i kapittel {num}")
            sett.append(int(mm.group(2)))
        if sett and sett != sorted(sett):
            r.a(hvor, f"h3-numrene er ikke stigende: {sett}")
        if sett and sorted(sett) != list(range(1, len(sett) + 1)):
            r.a(hvor, f"h3-numrene har hull eller duplikater: {sorted(sett)}")

        # formler
        formler = sec.alle(lambda n: n.har("formula"))
        for i, f_ in enumerate(formler, 1):
            if not f_.alle(lambda n: n.har("eq")) and not f_.alle(lambda n: n.har("where")):
                r.f(hvor, f"formelblokk {i} har verken .eq eller .where — den kastes av parseren")

        # bokser
        for c in sec.alle(lambda n: n.har("callout")):
            typer = c.klasser & {"tip", "mistake", "mech", "link", "warn"}
            navn = "/".join(sorted(typer)) or "uten type"
            if not typer:
                r.f(hvor, "callout uten en av tip/mistake/mech/link/warn — den telles ikke")
            elif len(typer) > 1:
                r.a(hvor, f"callout med flere typer ({navn}) — den telles i alle")
            if not c.alle(lambda n: n.har("h")):
                r.f(hvor, f"callout ({navn}) mangler <span class=\"h\"> — overskriften blir tom")

        # figurer
        for d in sec.alle(lambda n: n.tag == "div" and n.har("figure")):
            r.f(hvor, "<div class=\"figure\"> brukt i stedet for <figure> — figuren telles ikke")
        for f_ in sec.alle(lambda n: n.tag == "figure"):
            svg = f_.alle(lambda n: n.tag == "svg")
            if svg and not svg[0].attrs.get("viewbox") and not svg[0].attrs.get("viewBox"):
                r.a(hvor, "svg uten viewBox — skalerer ikke på mobil")
            if svg and not (svg[0].attrs.get("aria-label") or f_.alle(lambda n: n.tag == "title")):
                r.a(hvor, "svg uten aria-label")
            if not f_.alle(lambda n: n.tag == "figcaption"):
                r.a(hvor, "figure uten figcaption")

        # tabeller
        for t in sec.alle(lambda n: n.tag == "table"):
            if not t.har("data"):
                r.a(hvor, "tabell uten class=\"data\" — får ikke stiling eller mobilrulling")
            elif not t.alle(lambda n: n.tag == "th"):
                r.a(hvor, "table.data uten overskriftsrad (th)")

        lead = sec.alle(lambda n: n.tag == "p" and (n.har("lead") or n.har("lead-in")))
        if not lead:
            r.a(hvor, "ingen p.lead-in")

        tell = {
            "seksjoner": len(direkte_h3),
            "formler": len(formler),
            "bokser": len(sec.alle(lambda n: n.har("callout"))),
            "eksempler": len(sec.alle(lambda n: n.har("worked"))),
            "figurer": len(sec.alle(lambda n: n.tag == "figure")),
            "tabeller": len(sec.alle(lambda n: n.tag == "table")),
            "ord": len(norm(sec.txt()).split()),
        }
        kap.append((num, rentittel, tell["ord"], tell))

    # kapittelnumre må være sammenhengende — prevNext bruker num±1
    numre = sorted(n for n, *_ in kap)
    if len(set(numre)) != len(numre):
        r.f("manualen", f"dupliserte kapittelnumre: {[n for n in numre if numre.count(n) > 1]}")
    hull = [n for n in range(min(numre), max(numre)) if n not in numre]
    if hull:
        r.f("manualen", f"hull i kapittelnummereringen: {hull} — forrige/neste hopper over")

    # Referansekapitlet er fagets eget valg (manual.refSections.formulas i
    # js/subjects.js). Gjett bare når manifestet ikke sier noe — ellers ville
    # kontrollen klaget på tabeller i et helt annet kapittel.
    ref = ref_id or ref_fra_manifest(sti)
    best = 0
    for sec in ([] if ref else seksjoner):
        n = 0
        for h3 in sec.direkte(lambda x: x.tag == "h3"):
            if not re.match(r"^\d+\.\d+", norm(h3.txt())):
                continue
            i = sec.barn.index(h3)
            for etter in sec.barn[i + 1:]:
                if isinstance(etter, Node) and etter.tag in ("h3", "h2"):
                    break
                if isinstance(etter, Node) and etter.tag == "table" and etter.har("data"):
                    n += 1
                    break
        if n > best:
            best, ref = n, sec.attrs["id"]
    if ref:
        sec = next((s for s in seksjoner if s.attrs["id"] == ref), None)
        rader = 0
        for h3 in sec.direkte(lambda x: x.tag == "h3"):
            if not re.match(r"^\d+\.\d+", norm(h3.txt())):
                r.a(f"{ref} (referanse)", f"h3 «{norm(h3.txt())[:40]}» mangler N.M — tabellen under blir ikke lest")
                continue
            i = sec.barn.index(h3)
            tab = None
            for etter in sec.barn[i + 1:]:
                if isinstance(etter, Node) and etter.tag in ("h3", "h2"):
                    break
                if isinstance(etter, Node) and etter.tag == "table":
                    tab = etter
                    break
            if tab is None:
                r.a(f"{ref} (referanse)", f"«{norm(h3.txt())[:40]}» har ingen tabell som søsken")
            elif not tab.har("data"):
                r.f(f"{ref} (referanse)", f"«{norm(h3.txt())[:40]}»: tabellen mangler class=\"data\"")
            else:
                rr = [x for x in tab.alle(lambda n: n.tag == "tr")]
                brede = [x for x in rr[1:] if len(x.alle(lambda n: n.tag in ("th", "td"))) >= 3]
                if len(brede) < len(rr) - 1:
                    r.a(f"{ref} (referanse)", f"«{norm(h3.txt())[:40]}»: {len(rr) - 1 - len(brede)} rader har under 3 kolonner og hoppes over")
                rader += len(brede)
        if rader:
            r.a(f"{ref} (referanse)", f"{rader} formelrader blir til flashcards med posisjonsbaserte id-er "
                                     "(fmla-<tabell>-<rad>) — rekkefølgen er permanent")
    return r, kap, ref


def kjør(sti, ref_id=None):
    navn = pathlib.Path(sti).name
    print(f"\n{'=' * 72}\n{navn}")
    r, kap, ref = sjekk_manual(sti, ref_id)
    if kap:
        ord_ = sum(k[2] for k in kap)
        print(f"{len(kap)} kapitler · {ord_:,} ord".replace(",", " ")
              + (f" · referansekapittel {ref}" if ref else " · intet referansekapittel funnet"))
        for num, tittel, o, t in sorted(kap):
            if t:
                print(f"  k{num:<3} {o:>6} ord  {t['seksjoner']}s {t['formler']}f {t['bokser']}b "
                      f"{t['eksempler']}e {t['figurer']}fig  {tittel[:44]}")
    if r.advarsel:
        print(f"\n{len(r.advarsel)} advarsler:")
        for a in r.advarsel[:40]:
            print("  ~ " + a)
        if len(r.advarsel) > 40:
            print(f"  … og {len(r.advarsel) - 40} til")
    if r.feil:
        print(f"\n{len(r.feil)} feil:")
        for f_ in r.feil[:40]:
            print("  ✗ " + f_)
        if len(r.feil) > 40:
            print(f"  … og {len(r.feil) - 40} til")
    else:
        print("\nIngen feil.")
    return len(r.feil)


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    ref = next((a.split("=", 1)[1] for a in sys.argv[1:] if a.startswith("--ref=")), None)
    rot = pathlib.Path(__file__).resolve().parent.parent
    # Filnavnene er ikke ensartede: FIE402_Manual.html, Case_Manual.html,
    # SAM3_Eksamensmanual.html. Match derfor uten hensyn til store bokstaver.
    filer = args or sorted(str(p) for p in rot.glob("*.html") if "manual" in p.name.lower())
    filer = list(dict.fromkeys(filer))
    if not filer:
        sys.exit("fant ingen manualer — oppgi en fil")
    return 1 if sum(kjør(f, ref) for f in filer) else 0


if __name__ == "__main__":
    sys.exit(main())
