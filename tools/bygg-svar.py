#!/usr/bin/env python3
"""Bygger fag/<fag>/svar.js av fag/<fag>/_svar/*.json (docs/fie402-svar-spek.md).

Filene dekker både eksamenssettene og problem settene (ps1.json og videre).

    python3 tools/bygg-svar.py fie402

Svar-dataene styrer rettingen i eksamenssettene når brukeren har lagt inn en
API-nøkkel: hvilken type hver deloppgave har (tall, tekst eller blandet) og hvilke
tall fasiten har. Oppgavene selv ligger urørt i sett.js.
"""
import json
import pathlib
import sys

ROT = pathlib.Path(__file__).resolve().parent.parent
if len(sys.argv) < 2:
    sys.exit("bruk: python3 tools/bygg-svar.py <fag>")
fag = sys.argv[1]
mappe = ROT / "fag" / fag / "_svar"
ut = ROT / "fag" / fag / "svar.js"
data = {}
for f in sorted(mappe.glob("*.json")):
    for k, v in json.loads(f.read_text(encoding="utf-8")).items():
        if k in data:
            sys.exit(f"{k} står to ganger (siste i {f.name})")
        data[k] = v
hode = f"""/* ============== {fag.upper()} · SVAR-DATA FOR RETTING (EKSAMENSSETT OG PROBLEM SETS) ==============
   Bygget av tools/bygg-svar.py fra fag/{fag}/_svar/*.json. Ikke rediger her.
   Nøkkel "<settId>:<n>:<etikett>". Typen sier hvordan svaret rettes når brukeren
   har lagt inn en API-nøkkel: tall automatisk, tekst og blandet med Claude.
   Se docs/fie402-svar-spek.md.
   ================================================================================ */
"""
tekst = hode + "window.EDU_DATA = window.EDU_DATA || {};\nwindow.EDU_DATA.svar = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n"
ut.write_text(tekst, encoding="utf-8")
typer = {}
for v in data.values():
    typer[v.get("type")] = typer.get(v.get("type"), 0) + 1
print(f"{ut.relative_to(ROT)}: {len(data)} oppføringer · " + " · ".join(f"{k} {n}" for k, n in sorted(typer.items())))
