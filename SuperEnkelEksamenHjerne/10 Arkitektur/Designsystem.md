---
tags: [arkitektur, design, css]
oppdatert: 2026-11-25
---

# Designsystem

All CSS ligger inline i `<style>` i `index.html` — ingen egen stilfil, ingen
klassebibliotek. Uttrykket er Apple-inspirert og lyst: myke skygger, hårfine
skillelinjer, avrundede hjørner, systemfonten.

## Variabler (`:root`)

**Flater** `--bg #f5f5f7` · `--bg-elevated #fff` · `--bg-sunken #ecedf0` ·
`--card #fff` · `--hairline #e6e6ea`

**Tekst** `--ink #1d1d1f` → `--ink-2` → `--ink-3` → `--ink-4 #98989f` (fallende styrke)

**Aksent** `--accent #2f6bff` · `--accent-ink` · `--accent-soft` · `--accent-soft-2`
— **overstyres per fag** av `picker.applyTheme()` fra manifestets `accent*`-felt.

**Semantiske farger** grønn, gul, rosa, indigo, teal, skifer — hver med en
`-soft`-variant til bakgrunner. `--phase-*` fargelegger studieplanens faser.

**Form** `--r-sm 10px` → `--r-md 16px` → `--r-lg 22px` → `--r-xl 28px` →
`--r-pill`. Tre skyggenivåer pluss `--shadow-accent`, som også settes per fag.

**Typografi** `--font` (SF Pro / systemfont), `--font-serif` (New York — brukes i
kapittelartiklene), `--mono` (SF Mono).

**Mål** `--sidebar-w 256px` · `--maxw 1180px`

## Responsivt

Bruddpunktet er **860 px**. Over: sidepanel til venstre. Under: sidepanelet
forsvinner, topplinja blir sticky med blur, og en fast bunnavigasjon med seks
knapper tar over. `env(safe-area-inset-bottom)` respekteres, og appen er merket
`apple-mobile-web-app-capable` — den er ment å legges på hjemskjermen.

## Logo, favicon og tittel

**Appens logo** er et eksamensark med en rød A i ring, på `--accent`-blått
(`#2f6bff`). Den ligger i `ikon/`:

- `ikon/logo.svg` med avrundede hjørner (22,5 %). Fast favicon i `index.html`
  og velgerens logo (`EDU_PLATFORM.ikon`).
- `ikon/apple-touch-icon.png` (180 × 180) er hjemskjermikonet. iOS leser ikke
  SVG der. PNG-en er fullflate fordi iOS runder hjørnene selv. Bytter du
  logoen, må PNG-en lages på nytt fra SVG-en.

**Fagene** beholder sitt eget favicon: `js/picker.js` tegner en inline SVG av
fagets logotegn på fagets aksentfarge. Skriftstørrelsen justeres etter antall
tegn (1 tegn = 52, 2 = 38, 3 = 30). Uten valgt fag setter `setFavicon` bildet
fra `EDU_PLATFORM.ikon` i stedet. Tekstlogoen «SEE» er bare reserve hvis
`ikon` mangler. Logoflisen i sidepanelet viser fagets logotegn, ikke appens.

## Regel når du legger til UI

Bruk variablene, aldri løse hex-verdier — ellers følger ikke elementet med når
faget bytter aksentfarge. Se [[Kodekonvensjoner]].
