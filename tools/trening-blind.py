#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Blind kontroll av eksamenstreningen.

   Steg 1, del ut: skriver spørsmålene UTEN fasit til <mappe>/oppgaver.md, og
   fasiten til <mappe>/.fasit.json. Kontrolløren løser oppgavene fra
   oppgaver.md alene og skriver svarene sine til <mappe>/svar.json som
   {"id": "B", ...}, eller "?" når et spørsmål ikke kan løses entydig.

       python3 tools/trening-blind.py del fie432 <mappe> --tema insidens noytralitet [--per-familie 2] [--fil sti]
       python3 tools/trening-blind.py del fie432 <mappe> --bare-familier     # én midtvariant per familie

   Alle statiske spørsmål tas med, og per-familie varianter av hver familie
   (de første og de siste, så spredningen i tall blir sett).

   Steg 2, sammenlign: viser hvert avvik med fasit, felle og kort fasit, så
   kontrolløren kan avgjøre om det er spørsmålet eller løsningen som er feil.

       python3 tools/trening-blind.py sammenlign <mappe>

   Leser fag/<fag>/trening.js, eller fila gitt med --fil (for eksempel et
   utkast fra bygg-trening.py --bare).
"""
import json, os, re, sys

ROT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))


def les(fil):
    sp = []
    for linje in open(fil, encoding="utf-8"):
        linje = linje.strip().rstrip(",")
        if linje.startswith('{"id"'):
            sp.append(json.loads(linje))
    return sp


def tekst(html):
    t = re.sub(r"<sub>(.*?)</sub>", r"_\1", str(html))
    t = re.sub(r"<sup>(.*?)</sup>", r"^\1", t)
    t = re.sub(r"</p>\s*<p>", "\n\n", t)
    t = re.sub(r"</tr>", "\n", t)
    t = re.sub(r"</t[dh]>", " | ", t)
    t = re.sub(r"<li>", "\n- ", t)
    t = re.sub(r"<br\s*/?>", "\n", t)
    t = re.sub(r"<[^>]+>", "", t)
    return re.sub(r"[ \t ]+", " ", t).strip()


def del_ut(args):
    fag, mappe = args[0], args[1]
    temaer = args[args.index("--tema") + 1:] if "--tema" in args else []
    temaer = [t for t in temaer if not t.startswith("--")]
    per = int(args[args.index("--per-familie") + 1]) if "--per-familie" in args else 2
    fil = args[args.index("--fil") + 1] if "--fil" in args else os.path.join(ROT, "fag", fag, "trening.js")
    alle = [s for s in les(fil) if not temaer or s["tema"] in temaer]
    fam = {}
    for s in alle:
        if s.get("fam"):
            fam.setdefault(s["fam"], []).append(s)
    if "--bare-familier" in args:
        # Etterkontroll: bare familiene, og varianten midt i hver, som de
        # første kontrollene (første og siste) ikke så.
        valgt = [liste[len(liste) // 2] for liste in fam.values()]
        fam = {}
    else:
        valgt = [s for s in alle if not s.get("fam")]
    for f, liste in fam.items():
        idx = sorted({0, len(liste) - 1} | set(range(min(per, len(liste)))))[:max(per, 1)]
        if per >= 2 and len(liste) > 1:
            idx = sorted(set(list(range(per // 2)) + [len(liste) - 1 - i for i in range(per - per // 2)]))
        valgt += [liste[i] for i in idx if i < len(liste)]
    os.makedirs(mappe, exist_ok=True)
    md = [f"# Blind kontroll · {len(valgt)} spørsmål\n",
          "Løs hvert spørsmål fra teksten alene. Skriv svarene til svar.json som {\"id\": \"B\"}. "
          "Bruk \"?\" når spørsmålet ikke kan løses entydig, og forklar hvorfor i rapporten.\n"]
    for s in valgt:
        md.append(f"\n## {s['id']}  ·  {s['tema']}{'  ·  familie ' + s['fam'] if s.get('fam') else ''}\n")
        md.append(tekst(s["q"]) + "\n")
        for i, o in enumerate(s["options"]):
            md.append(f"- **{'ABCD'[i]}**. {tekst(o)}")
    open(os.path.join(mappe, "oppgaver.md"), "w", encoding="utf-8").write("\n".join(md) + "\n")
    json.dump({s["id"]: s for s in valgt}, open(os.path.join(mappe, ".fasit.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=0)
    print(f"{len(valgt)} spørsmål til {mappe}/oppgaver.md ({len(alle) - len(valgt)} varianter holdt utenfor)")


def sammenlign(args):
    mappe = args[0]
    fasit = json.load(open(os.path.join(mappe, ".fasit.json"), encoding="utf-8"))
    svar = json.load(open(os.path.join(mappe, "svar.json"), encoding="utf-8"))
    rett = avvik = ukjent = mangler = 0
    for id_, s in fasit.items():
        v = str(svar.get(id_, "")).strip().upper()
        f = "ABCD"[s["answer"]]
        if not v:
            mangler += 1; print(f"MANGLER  {id_}"); continue
        if v == "?":
            ukjent += 1
            print(f"\n?  {id_}: kontrolløren fant ikke ett entydig svar. Fasit {f}: {tekst(s['options'][s['answer']])}")
            continue
        if v == f:
            rett += 1; continue
        avvik += 1
        i = "ABCD".index(v) if v in "ABCD" else None
        print(f"\nAVVIK  {id_}: kontrollør {v}, fasit {f}")
        print(f"  fasit {f}: {tekst(s['options'][s['answer']])}")
        if i is not None:
            print(f"  ditt {v}:  {tekst(s['options'][i])}")
            print(f"  fella for {v}: {tekst(s['traps'][i] or '')}")
        print(f"  kort: {tekst(s['kort'])}")
    print(f"\n{rett} like · {avvik} avvik · {ukjent} uløselige · {mangler} mangler · av {len(fasit)}")


if __name__ == "__main__":
    a = sys.argv[1:]
    if not a or a[0] not in ("del", "sammenlign"):
        print(__doc__); sys.exit(1)
    (del_ut if a[0] == "del" else sammenlign)(a[1:])
