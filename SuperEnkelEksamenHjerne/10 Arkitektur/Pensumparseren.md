---
tags: [arkitektur, pensum, parser]
oppdatert: 2026-09-03
---

# Pensumparseren

Ligger i `js/bundle-core.js` (`S.parseManual`) og kjører med `DOMParser` i
nettleseren. Resultatet caches — se [[Datamodell og lagring]].

## Hva en pensumfil må inneholde

Manualen er én HTML-fil. Parseren leter etter:

| Selektor | Blir til |
|---|---|
| `section[id]` der id-en matcher `^k\d+$` | ett kapittel; tallet er kapittelnummeret |
| `h2.chap` | kapitteltittel (prefikset «Kapittel N ·» strippes bort) |
| `h3` med formen `N.M Tittel` | en seksjon i kapitlet |
| `p.lead` / `p.lead-in` | ingressen |
| `.formula` med `.eq` og `.where` | formler (både HTML og rentekst tas vare på) |
| `.callout.tip` | eksamenstips |
| `.callout.mistake` | vanlige feil |
| `.callout.mech` | mekanismer |
| `.callout.link` | sammenhenger |
| `.callout.warn` | advarsler |
| `figure`, `.worked`, `table` | telles opp i `counts` |

Hvert kapittel ender som et objekt med `num`, `title`, `leadIn`, `html`,
`sections[]`, `formulas[]`, `tips[]`, `mistakes[]`, `mechanisms[]`, `links[]`,
`warnings[]`, `counts` og `searchText`. Rå-HTML-en beholdes, så SVG-diagrammene i
manualen vises som de er i kapittelartiklene.

Sjekken for om en fil «ser ut som» en manual er bevisst grov:
den må inneholde `id="k0"` eller `class="chap"`.

## Referansedelen

`parseReference()` leser tre kapitler ved **hardkodede id-er**:

- `#k22` → formeltabeller (`h3` som matcher `22.N`, etterfulgt av `table.data`
  med kolonnene *term / formel / poeng*)
- `#k21` → eksamensmønstre (`table.data`, kolonnene eksamen / oppgave 1–3)
- `#k23` → forelesningsdekning + sjekklister

Formeltabellene brukes ikke bare som referanse: SRS-bunken lager
**automatisk flashcards** av hver rad, og lynspillene «Formel-lyn» og
«En skiller seg ut» henter fra dem. En manual uten `#k22` mister altså mer enn
bare en tabell.

## Del-inndelingen

`PARTS` øverst i parseren mapper kapittelnumre til Del 0 / I / II / III / IV med
navn som «Oppgave 2: Vekst på lang sikt».

> [!warning] Dette er SAM3-spesifikt og bor i motoren
> Et nytt fag med annen kapittelinndeling vil få feil deletilhørighet. Hører
> egentlig hjemme i fagmanifestet. Se [[Fallgruver]].

## Oppgaveparseren

`S.parseProblems` er en egen, enklere parser for oppgavebank-filen. Den ser etter
`class="doc"`, utleder oppgavetype fra id-en og merker temaer med regelbaserte
tekstsøk (`TOPIC_RULES`). Finner den ingenting, kjører appen videre med tom
oppgavebank — modulen tåler det.

## Kontrollen

`tools/sjekk-manual.py` speiler reglene over og kjører dem mot en manual:

```bash
python3 tools/sjekk-manual.py                      # alle manualer i repoet
python3 tools/sjekk-manual.py FIE432_Manual.html
```

Den bygger sin egen lille DOM med `html.parser` (ingen avhengigheter) og ser
etter nøyaktig det parseren mister i stillhet: `section`-er som ikke matcher
`^k\d+$`, kapittel som er `div` i stedet for `section`, manglende eller
feilnummerert `h2.chap`, innhold før `h2.chap`, `h3` nøstet i en `div`,
`h3` uten `N.M`-prefiks eller med feil kapittelnummer, hull i
kapittelnummereringen, `.formula` uten `.eq` og `.where`, `.callout` uten type
eller uten `span.h`, `div.figure` i stedet for `figure`, rå `<` i teksten, og
nøstede `section`-er. Referansekapitlet slås opp i `js/subjects.js` via
manualens filnavn.

> [!info] Hva den fant første gang
> **SAM3 hadde seks figurer skrevet som `<div class="figure">`** med
> `<div class="cap">` som tekst. De ble ikke telt i `counts.figures` — men
> verre: appens CSS styler `.prose figure svg` med hvitt kort, ramme og skygge,
> og `.prose figcaption` i kursiv. De seks fikk ingenting av det og lå som bar
> SVG rett på sidebakgrunnen. Manualen brukte allerede `<figure>` riktig for de
> fire andre. Rettet 3. september 2026; figurtallet gikk fra 4 til 10.
>
> **Caseintervju hadde to `.callout` uten type og uten `span.h`.** De vises,
> siden rå-HTML-en beholdes, men de telles ikke som tips og havner ikke i
> hurtigoppsummeringen. Rettet til `.callout.tip`.
>
> FIE402 var ren.

## Aritmetikken kontrolleres maskinelt

`tools/sjekk-aritmetikk.py` trekker regnestykkene ut av den ferdige manualen og
regner dem om. Manualene lærer bort regning, så et galt tall er verre enn ingen
manual.

```bash
python3 tools/sjekk-aritmetikk.py                    # alle manualer
python3 tools/sjekk-aritmetikk.py FIE432_Manual.html
python3 tools/sjekk-aritmetikk.py --selvtest
```

Teksten tokeniseres og parses med rekursiv nedstigning, så parenteser,
presedens, implisitt multiplikasjon (`0,25(0,96 − 0,00)`), prosent, promille,
brøktegn, superskrift og enhetene «mill.» og «mrd.» håndteres. **Skrivemåten
oppdages per fil** — norsk desimalkomma eller engelsk desimalpunktum — ved å
telle tall med minst to desimaler; ett siffer treffer seksjonsnumrene («5.2»)
og fikk de norske manualene til å se engelske ut.

Kjeder kontrolleres ledd for ledd: i «100 × 1,02 + 200 = 102 + 200 = 302» er
mellomleddet en omskrivning, ikke et svar.

> [!warning] Toleransen er den vanskeligste delen
> Tre modeller ble prøvd. **Relativ prosent** godtok et avvik på tusen kroner i
> et sekssifret tall. **Summen av hvert talls avrundingsrom** ble så vidt at
> «50 × 1,72 × 22 % = 18,93» slapp gjennom. Det som virker er *halve enheten på
> siste skrevne plass* — «494 000» er avrundet til nærmeste tusen og tåler 500,
> «302» tåler en halv — pluss et lite relativt ledd på 0,01 % for avrunding som
> har hopet seg opp gjennom flere ledd.

**Selvtesten er ikke pynt.** `--selvtest` kjører 27 tilfeller der halvparten er
bevisst gale. Tre av dem avslørte ekte feil i verktøyet mens det ble skrevet,
blant annet at skaleringen for prosentpoeng lå på toleransen i stedet for på
verdien, slik at «½ × 0,60 × 10 = 4» ble godkjent.

> [!info] Hva den fant
> **FIE432, 278 regnekjeder:** fem utslag, alle notasjon verktøyet ikke leser
> (absoluttverditegn, «60/40» som forholdstall, «1,1 % **av** (…)», algebra som
> «3 − 2Q»). Hver enkelt kontrollert for hånd. Ingen regnefeil.
> **FIE402, 1 035 kjeder:** 71 utslag, alle notasjon — kvadratrottegn og
> superskrift på parentes. **SAM3 og Caseintervju:** fire utslag, alle
> Solow-eksponenter skrevet som brøk og ett miksforhold.
>
> Én ekte feil ble funnet, og den var min egen: k0 skrev «22 + 78 × 37,84 =
> 51,52 %» der de to leddene er prosent og ikke rene tall.

Se [[Legge til nytt fag]] for hvordan en ny manual må se ut i praksis.
