#!/usr/bin/env python3
"""Setter sammen kartleggingen til ett fag: fag/<fag>/kartlegging.js.

Bruk:  python3 tools/flett-kart.py fie402

Kildene ligger i fag/<fag>/_kart/: temaer.js (temalista rapporten bygger på) og
del1.js, del2.js, ... (én del hver, som window.EDU_KART.delN). Resultatet er én
fil som appen laster etter sett.js, og som legger delene til EDU_DATA.sets.
Kjør tools/sjekk-sett.js på resultatet etterpå."""
import pathlib, re, sys

if len(sys.argv) != 2:
    sys.exit(__doc__)
rot = pathlib.Path(__file__).resolve().parent.parent
kilde = rot / "fag" / sys.argv[1] / "_kart"
deler = sorted(kilde.glob("del*.js"), key=lambda p: int(re.sub(r"\D", "", p.stem) or 0))
if not (kilde / "temaer.js").exists() or not deler:
    sys.exit(f"fant ikke temaer.js og del*.js i {kilde}")
biter = [
    f"/* {sys.argv[1].upper()} · KARTLEGGING · generert av tools/flett-kart.py fra _kart/. Ikke rediger her. */\n",
    (kilde / "temaer.js").read_text(encoding="utf-8"),
    *[d.read_text(encoding="utf-8") for d in deler],
    "window.EDU_DATA.sets = (window.EDU_DATA.sets || []).concat(\n"
    "  Object.keys(window.EDU_KART || {}).sort().map((k) => window.EDU_KART[k]));\n",
]
ut = rot / "fag" / sys.argv[1] / "kartlegging.js"
ut.write_text("\n".join(biter), encoding="utf-8")
print(f"skrev {ut.relative_to(rot)}: {len(deler)} deler, {ut.stat().st_size // 1024} kB")
