#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Trekker kapitler ut av en manual og skriver dem som ren tekst til NotebookLM.

   NotebookLM leser tekst, ikke HTML. Den vil ha overskriftshierarki, hele
   setninger og lesbare tabeller — og den blir forvirret av markup, av CSS-klasser
   som bærer mening, og av figurer som bare finnes som SVG-koordinater.

   Konverteringen er derfor ikke en stripping av tagger, men en oversettelse:

     div.formula   →  FORMEL: ligningen, så «der: …»
     div.worked    →  GJENNOMREGNET EKSEMPEL med tittel
     div.callout   →  typet blokk (MEKANISME / ADVARSEL / VANLIG FEIL / …),
                      så klassen ikke går tapt når fargen forsvinner
     table.data    →  pipe-tabell
     figure        →  figurteksten pluss svg-ens aria-label, som er den eneste
                      beskrivelsen av kurven som overlever uten bildet
     b, i          →  droppes. Manualen utheder hvert svartall i hvert
                      regneeksempel; som markdown blir det 900 stjernepar støy.
     sub, sup      →  _ og ^, så A(m,n) og x² fortsatt kan leses

   Bruk:  python3 tools/manual-til-kilde.py FIE432_Manual.html 1-8 ut.md
          python3 tools/manual-til-kilde.py FIE432_Manual.html 1-8 ut.md --seksjoner 0.1
"""

import sys, re, html
from html.parser import HTMLParser

TOM = {"br", "img", "hr", "meta", "link", "input"}
HOPP = {"svg", "script", "style"}          # svg leses via aria-label, ikke innhold

CALLOUT = {
    "mech": "MEKANISME", "warn": "ADVARSEL", "tip": "TIPS",
    "link": "KOBLING", "mistake": "VANLIG FEIL", "info": "MERK",
}


class Node:
    __slots__ = ("tag", "attrs", "barn")
    def __init__(self, tag, attrs=None):
        self.tag, self.attrs, self.barn = tag, dict(attrs or {}), []
    def kl(self):
        return self.attrs.get("class", "").split()


class Treet(HTMLParser):
    """Bygger et minimalt tre. Manualen er validert av sjekk-manual.py, så den
       er velformet — men taggene under HOPP lukkes ikke alltid pent, og de
       telles derfor ut med en egen dybdeteller i stedet for på stakken."""
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.rot = Node("#rot")
        self.stakk = [self.rot]
        self.hoppdybde = 0

    def handle_starttag(self, tag, attrs):
        if self.hoppdybde:
            if tag in HOPP: self.hoppdybde += 1
            return
        if tag in HOPP:
            n = Node(tag, attrs)
            self.stakk[-1].barn.append(n)
            self.hoppdybde = 1
            return
        n = Node(tag, attrs)
        self.stakk[-1].barn.append(n)
        if tag not in TOM: self.stakk.append(n)

    def handle_endtag(self, tag):
        if self.hoppdybde:
            if tag in HOPP: self.hoppdybde -= 1
            return
        if tag in TOM: return
        for i in range(len(self.stakk) - 1, 0, -1):
            if self.stakk[i].tag == tag:
                del self.stakk[i:]
                return

    def handle_data(self, d):
        # Rene mellomrom må BEHOLDES. Manualen skriver «salgsverdien</b> <b>[dagens
        # regel]</b>», og mellomrommet mellom de to taggene er en egen tekstnode.
        # Kastes den, blir det «salgsverdien[dagens regel]» i kilden. rydd() slår
        # sammen mellomrom senere, og blokk() hopper over strenger som blir tomme.
        if not self.hoppdybde and d:
            self.stakk[-1].barn.append(d)


def rydd(s):
    return re.sub(r"[ \t ]+", " ", s).strip()


def tekst(n):
    """Inline-tekst. b/i droppes, sub/sup blir _ og ^."""
    if isinstance(n, str): return n.replace(" ", " ")
    if n.tag in HOPP: return ""
    if n.tag == "a" and "backtotop" in n.kl(): return ""
    inner = "".join(tekst(b) for b in n.barn)
    if n.tag == "sub": return "_" + inner
    if n.tag == "sup": return "^" + inner
    if n.tag == "br":  return " "
    return inner


def tabell(n):
    rader = []
    for tr in [b for b in n.barn if not isinstance(b, str) and b.tag == "tr"]:
        celler = [rydd(tekst(c)) or " " for c in tr.barn
                  if not isinstance(c, str) and c.tag in ("td", "th")]
        if celler: rader.append((celler, any(
            not isinstance(c, str) and c.tag == "th" for c in tr.barn)))
    if not rader: return []
    bredde = max(len(c) for c, _ in rader)
    ut, skilt_satt = [], False
    for celler, er_hode in rader:
        celler = celler + [" "] * (bredde - len(celler))
        ut.append("| " + " | ".join(celler) + " |")
        if er_hode and not skilt_satt:
            ut.append("|" + "---|" * bredde)
            skilt_satt = True
    if not skilt_satt:                       # tabell uten th — lag et tomt hode
        ut.insert(1, "|" + "---|" * bredde)
        ut.insert(0, "| " + " | ".join([" "] * bredde) + " |")
    return ut


def figur(n):
    kaptekst, beskrivelse = "", ""
    for b in n.barn:
        if isinstance(b, str): continue
        if b.tag == "figcaption": kaptekst = rydd(tekst(b))
        if b.tag == "svg": beskrivelse = rydd(b.attrs.get("aria-label", ""))
    ut = ["FIGUR: " + kaptekst if kaptekst else "FIGUR"]
    if beskrivelse: ut.append("Figuren viser: " + beskrivelse)
    return ut


def blokk(n, ut):
    """Skriver én blokknode som linjer i ut."""
    if isinstance(n, str):
        t = rydd(n)
        if t: ut.append(t); ut.append("")
        return
    if n.tag in HOPP: return
    if n.tag == "a" and "backtotop" in n.kl(): return
    kl = n.kl()

    if n.tag == "h2" and "chap" in kl:
        ut += ["", "## " + rydd(tekst(n)).replace(" · ", " · "), ""]; return
    if n.tag == "h3":
        ut += ["", "### " + rydd(tekst(n)), ""]; return
    if n.tag == "table":
        ut += tabell(n) + [""]; return
    if n.tag == "figure":
        ut += figur(n) + [""]; return
    if n.tag in ("ul", "ol"):
        for i, li in enumerate([b for b in n.barn
                                if not isinstance(b, str) and b.tag == "li"], 1):
            merke = f"{i}." if n.tag == "ol" else "-"
            ut.append(f"{merke} {rydd(tekst(li))}")
        ut.append(""); return

    if n.tag == "div" and "formula" in kl:
        for b in n.barn:
            if isinstance(b, str): continue
            if "eq" in b.kl():    ut.append("FORMEL:  " + rydd(tekst(b)))
            if "where" in b.kl(): ut.append("   der:  " + rydd(tekst(b)))
        ut.append(""); return

    if n.tag == "div" and ("worked" in kl or "callout" in kl):
        if "worked" in kl:
            hode = next((rydd(tekst(b)) for b in n.barn
                         if not isinstance(b, str) and "wh" in b.kl()), "")
            hode = re.sub(r"^Gjennomregnet:\s*", "", hode)
            ut.append("GJENNOMREGNET EKSEMPEL" + (f" — {hode}" if hode else ""))
        else:
            typ = next((CALLOUT[k] for k in kl if k in CALLOUT), "MERK")
            hode = next((rydd(tekst(b)) for b in n.barn
                         if not isinstance(b, str) and "h" in b.kl()), "")
            ut.append(typ + (f" — {hode}" if hode else ""))
        # Innmaten: løs tekst samles, blokkbarn rendres som vanlig.
        løs = []
        for b in n.barn:
            if isinstance(b, str):
                løs.append(b); continue
            if b.tag in ("span",) and ("wh" in b.kl() or "h" in b.kl()): continue
            if b.tag in ("table", "figure", "ul", "ol") or \
               (b.tag == "div" and ("formula" in b.kl() or "callout" in b.kl())):
                if rydd("".join(løs)): ut.append(rydd("".join(løs))); løs = []
                blokk(b, ut)
            elif b.tag == "p":
                if rydd("".join(løs)): ut.append(rydd("".join(løs))); løs = []
                # Tom linje etter avsnittet: uten den limes «Steg 1 …» til
                # setningen over, og en tabell rett under blir ikke en tabell.
                ut += [rydd(tekst(b)), ""]
            else:
                løs.append(tekst(b))
        if rydd("".join(løs)): ut.append(rydd("".join(løs)))
        ut.append(""); return

    if n.tag in ("p", "div"):
        t = rydd(tekst(n))
        if t: ut += [t, ""]
        return

    for b in n.barn: blokk(b, ut)


def main():
    if len(sys.argv) < 4:
        print(__doc__); sys.exit(1)
    kilde, spek, mål = sys.argv[1], sys.argv[2], sys.argv[3]

    # Spekken er en kommaliste av kapitler («5»), spenn («1-8») og enkeltseksjoner
    # («0.1»). Et kapittel tas i sin helhet; en enkeltseksjon tas uten
    # kapitteltittelen rundt seg, så en innledning kan hentes ut av et kapittel
    # man ellers ikke vil ha med.
    kapitler, seksjoner_valgt = set(), set()
    for del_ in spek.split(","):
        del_ = del_.strip()
        if "." in del_: seksjoner_valgt.add(del_)
        elif "-" in del_:
            a, b = (int(x) for x in del_.split("-")); kapitler |= set(range(a, b + 1))
        else: kapitler.add(int(del_))

    raw = open(kilde, encoding="utf-8").read()
    p = Treet(); p.feed(raw)

    def finn(n, ut):
        if isinstance(n, str): return
        if n.tag == "section" and re.fullmatch(r"k\d+", n.attrs.get("id", "")):
            ut.append(n); return
        for b in n.barn: finn(b, ut)

    alle = []; finn(p.rot, alle)

    # Deltittelen som STYRER et kapittel er den siste h2.part før det — Del 0-
    # banneret står foran k0 og gjelder også k1 og k2.
    deltittel, siste = {}, None
    for m in re.finditer(r'<h2 class="part">([^<]+)</h2>|<section id="k(\d+)"', raw):
        if m.group(1) is not None: siste = html.unescape(m.group(1)).strip()
        else: deltittel[int(m.group(2))] = siste

    linjer, deler, tatt = [], [], []
    for sek in alle:
        num = int(sek.attrs["id"][1:])
        egne = {x for x in seksjoner_valgt if x.split(".")[0] == str(num)}
        hel = num in kapitler
        if not hel and not egne: continue

        tittel = deltittel.get(num)
        if tittel and tittel not in deler:
            deler.append(tittel)
            linjer += ["", "", "=" * 78, "=" * 78, "", tittel.upper(), "",
                       "=" * 78, "=" * 78, "", ""]

        if hel:
            for b in sek.barn: blokk(b, linjer)
            tatt.append(f"k{num}")
        else:
            # Bare de navngitte underkapitlene: h3-en og alt fram til neste h3.
            på = False
            for b in sek.barn:
                if not isinstance(b, str) and b.tag == "h3":
                    m = re.match(r"([\d.]+)", rydd(tekst(b)))
                    på = bool(m) and m.group(1) in egne
                if på: blokk(b, linjer)
            tatt.append(", ".join(sorted(egne)))

    ut = re.sub(r"\n{3,}", "\n\n", "\n".join(linjer)).strip() + "\n"
    open(mål, "w", encoding="utf-8").write(ut)
    print(f"{mål}: {len(ut.split())} ord · {len(ut)} tegn")
    print(f"  tatt med: {' · '.join(tatt)}")
    print(f"  deler:    {' · '.join(deler)}")


if __name__ == "__main__":
    main()
