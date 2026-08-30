#!/usr/bin/env python3
"""
Setter sammen Case_Manual.html av kapittelfragmentene.

Kapitlene skrives som frittstående <section id="kN">-filer og settes sammen her.
Manualen er sannhetskilden når den først er bygget — fragmentene er bare en
arbeidsform for å skrive flere kapitler i parallell.

    python3 tools/case-bygg-manual.py <fragmentmappe>

Deltitlene normaliseres: alle h2.part i fragmentene fjernes, og kanoniske
titler settes inn på delegrensene. Uten det arver manualen tilfeldige
deloverskrifter fra det kapitlet som tilfeldigvis stod først — en felle som
kostet tid i FIE402-bygget.
"""
import pathlib, re, sys

DELER = [
    ("Del 0", "Grunnlaget", [0, 1, 2]),
    ("Del I", "Struktur", [3, 4, 5]),
    ("Del II", "Tall", [6, 7, 8]),
    ("Del III", "Framføring", [9, 10]),
    ("Del IV", "Fit", [11, 12]),
    ("Del V", "Håndverk", [13, 14]),
    ("Referanse", "Tall og formler", [15]),
]
ROT = pathlib.Path(__file__).resolve().parent.parent
MÅL = ROT / "Case_Manual.html"

HODE = """<!DOCTYPE html>
<html lang="nb">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Caseintervju — hele kurset</title>
<style>
  :root{ --ink:#1a1a1a; --paper:#fbf9f4; --plum:#4630ab; --rule:#d8d0c0; --box:#f2eefb; }
  body{ margin:0; background:var(--paper); color:var(--ink); font-family:Georgia,serif; line-height:1.62; font-size:18px; }
  .wrap{ max-width:860px; margin:0 auto; padding:0 28px 120px; }
  .cover{ min-height:70vh; display:flex; flex-direction:column; justify-content:center; border-bottom:3px double var(--plum); padding:60px 0 40px; }
  .cover h1{ font-size:3rem; line-height:1.08; margin:.2em 0 .15em; }
  .cover .tagline{ font-style:italic; color:#444; font-size:1.2rem; max-width:34em; }
  .cover .meta{ margin-top:34px; font-size:.92rem; color:#555; border-top:1px solid var(--rule); padding-top:16px; }
  h2.part{ font-variant:small-caps; letter-spacing:.14em; color:var(--plum); border-bottom:2px solid var(--plum); margin-top:64px; padding-bottom:6px; }
  h2.chap{ font-size:1.9rem; margin:.4em 0 .6em; }
  h3{ color:var(--plum); margin-top:1.7em; }
  .lead-in{ font-style:italic; color:#3a3a3a; }
  .formula{ background:var(--box); border-left:3px solid var(--plum); padding:14px 18px; margin:18px 0; }
  .formula .eq{ font-family:"Iowan Old Style",Georgia,serif; font-size:1.05rem; }
  .formula .where{ font-size:.9rem; color:#4a4a4a; margin-top:8px; }
  .callout{ background:var(--box); border-radius:8px; padding:14px 18px; margin:18px 0; border:1px solid transparent; }
  .callout .h{ display:block; font-weight:700; font-size:.8rem; text-transform:uppercase; letter-spacing:.04em; margin-bottom:.35em; color:var(--plum); }
  /* Variantene, så den frittstående filen leses like godt som i appen. */
  .callout.tip{ background:#e9f6ee; border-color:#cdeed8; } .callout.tip .h{ color:#1d7a47; }
  .callout.mistake{ background:#fdf3e3; border-color:#f2dcb6; } .callout.mistake .h{ color:#9a630f; }
  .callout.warn{ background:#fdecef; border-color:#f6d5dc; } .callout.warn .h{ color:#a32741; }
  .callout.link{ background:#eef0fd; border-color:#dcdefb; } .callout.link .h{ color:#4044c9; }
  .callout.mech{ background:var(--box); border-color:#ded5ff; }
  .worked{ background:#fff; border:1px dashed #c9bfae; border-radius:8px; padding:14px 18px; margin:18px 0; }
  .worked .wh{ display:block; text-transform:uppercase; letter-spacing:.05em; font-size:.75rem; font-weight:700; color:var(--plum); margin-bottom:.4em; }
  table.data{ border-collapse:collapse; width:100%; margin:18px 0; font-size:.95rem; }
  table.data th, table.data td{ border-bottom:1px solid var(--rule); padding:7px 10px; text-align:left; vertical-align:top; }
  table.data td.n, table.data th.n{ text-align:right; font-variant-numeric:tabular-nums; }
  blockquote{ border-left:3px solid var(--plum); margin:18px 0; padding:2px 0 2px 18px; color:#3a3a3a; }
  .backtotop{ float:right; font-size:.75rem; color:#8a8070; text-decoration:none; margin-top:8px; }
  #toc ol{ columns:2; column-gap:38px; font-size:.95rem; }
  hr.sec{ border:0; border-top:1px solid var(--rule); margin:40px 0; }
</style>
</head>
<body>
<div class="wrap">

<div class="cover">
  <h1>Caseintervju</h1>
  <p class="tagline">Hele veien fra prompt til anbefaling — struktur, hoderegning, figurlesing og fit, trent på ekte caser.</p>
  <div class="meta">Manualen er referanse, ikke pensum. Arbeidet ligger i drillene: 34 struktureringsprompter,
  sju hele caser, 34 finn-feilen-oppgaver, 24 figurer, 14 estimeringskjeder og 70 mock-intervjuer.</div>
</div>
"""


def les(mappe, n):
    f = mappe / f"k{n}.html"
    if not f.exists():
        return None
    t = f.read_text().strip()
    # normaliser: fjern alle deltitler fra fragmentene
    t = re.sub(r'<h2 class="part">.*?</h2>\s*', "", t, flags=re.S)
    if not re.match(r'<section id="k%d">' % n, t):
        sys.exit(f"k{n}: filen starter ikke med <section id=\"k{n}\">")
    return t


def tittel(frag):
    m = re.search(r'<h2 class="chap">(.*?)</h2>', frag, re.S)
    return re.sub(r"<[^>]+>", "", m.group(1)).strip() if m else "(uten tittel)"


def main():
    mappe = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else None
    if not mappe or not mappe.is_dir():
        sys.exit("bruk: python3 tools/case-bygg-manual.py <fragmentmappe>")

    frag, mangler = {}, []
    for _, _, kap in DELER:
        for n in kap:
            f = les(mappe, n)
            if f is None:
                mangler.append(n)
            else:
                frag[n] = f
    if mangler:
        print("⚠ mangler kapittel:", ", ".join(f"k{n}" for n in mangler))

    # innholdsfortegnelse
    toc = ['<nav id="toc">', "<h2 class=\"part\">Innhold</h2>", "<ol>"]
    for tag, navn, kap in DELER:
        har = [n for n in kap if n in frag]
        if not har:
            continue
        toc.append(f'<li style="list-style:none;margin-top:.7em"><b>{tag} · {navn}</b></li>')
        for n in har:
            toc.append(f'<li><a href="#k{n}">{tittel(frag[n])}</a></li>')
    toc += ["</ol>", "</nav>"]

    kropp = []
    for tag, navn, kap in DELER:
        har = [n for n in kap if n in frag]
        if not har:
            continue
        kropp.append(f'<h2 class="part">{tag} — {navn}</h2>')
        for i, n in enumerate(har):
            kropp.append(frag[n])
            if i < len(har) - 1:
                kropp.append('<hr class="sec">')

    ut = HODE + "\n".join(toc) + "\n\n" + "\n\n".join(kropp) + "\n\n</div>\n</body>\n</html>\n"
    MÅL.write_text(ut)

    ord_ = len(re.sub(r"<[^>]+>", " ", ut).split())
    print(f"✓ {MÅL.name}: {len(frag)} kapitler · {ord_:,} ord · {len(ut)//1024} KB".replace(",", " "))
    for n in sorted(frag):
        o = len(re.sub(r"<[^>]+>", " ", frag[n]).split())
        flagg = "  ⚠ lang" if o > 1700 else ""
        print(f"   k{n:<3} {o:>5} ord  {tittel(frag[n])[:52]}{flagg}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
