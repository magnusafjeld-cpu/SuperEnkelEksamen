# FIE459 · Forelesninger: spesifikasjon for gjennomgangene

Modulen `/forelesninger` (`js/bundle-forelesninger.js`) gir én kort, interaktiv
gjennomgang per forelesning. Magnus ba om den fordi han «får lite ut av å se på
forelesningene» og ville ha «en del i appen som går igjennom hva jeg må kunne fra
de forskjellige forelesningene på en engasjerende måte».

Det er **ikke** manualen på nytt (den er artikler) og **ikke** kjernepensum (det
er ordnet etter eksamensblokker). Det er forelesningen slik en god foreleser ville
tatt den på et kvarter: still et spørsmål, la studenten gjette, forklar, sjekk.

## 1. Eksamen styrer innholdet

- 3 timers digital skoleeksamen, lukket bok, 16. desember 2026, **flervalg og
  sant/usant**, på engelsk.
- Foreleseren (Jiaying Li): «The focus of the course is on economic intuition,
  not calculation» og «Memorizing definitions is not the best strategy!».
- Forelesning 13: eksamen har fokus på «concepts and frameworks learned in class».

Derfor: rammeverkene, skillelinjene og mekanismene fra forelesningen, brukt på
små caser. Ikke husketall. Et godt spørsmål tester en distinksjon («CSR and SRI
are actions; ESG is measurement»).

## 2. Formatet

Én fil per forelesning: `fag/fie459/_forelesninger/fN.js`, med nøyaktig ett kall:

```js
window.EDU_DATA.forelesninger.push({
  nr: 1,
  kapittel: 1,                 // manualkapitlet («Les kapitlet»-knappen)
  tittel: "Introduction: what sustainable finance is",
  minutter: 9,
  krok: "Is ESG investing about doing good, or about doing well?",   // én linje i oversikten
  steg: [
    { id: "f1-krok", type: "krok", tittel: "…", tekst: "<p>…</p>" },
    { id: "f1-ide-sf", type: "ide", tittel: "…", tekst: "<p>…</p>", husk: "…" },
    { id: "f1-gjett-1", type: "gjett",
      sporsmal: "<p>…</p>",
      alternativer: ["…", "…", "…", "…"], svar: 2,
      feil: ["…", "…", null, "…"],          // én setning per galt alternativ, null på fasiten
      forklaring: "<p>…</p>" },
    { id: "f1-sant-1", type: "sant", pastand: "<p>…</p>", svar: false, forklaring: "<p>…</p>" },
    { id: "f1-sorter-1", type: "sorter", tittel: "…", tekst: "<p>…</p>",
      grupper: ["SF 1.0", "SF 2.0", "SF 3.0"],
      kort: [{ t: "…", g: 0 }, { t: "…", g: 2 }],
      forklaring: "<p>…</p>" },
    { id: "f1-avdekk-1", type: "avdekk", tittel: "…", tekst: "<p>…</p>",
      rader: [{ t: "Finance as usual", d: "…" }, { t: "SF 1.0", d: "…" }] },
    { id: "f1-felle-1", type: "felle", tittel: "…", tekst: "<p>…</p>" },
  ],
  kunne: ["…", "…"],          // «Dette må du kunne» på sluttskjermen, 5–7 punkter
});
```

Tekstene er HTML: `<p>`, `<b>`, `<i>`, `<br>`, `<ul><li>`. Ingen tabeller (bruk
`avdekk` eller `sorter`).

**Hva stegene gjør i appen:**

| Type | Hva studenten ser |
|---|---|
| `krok` | Åpningen. Et spørsmål, et paradoks eller et overraskende funn fra forelesningen som gjør det verdt å lese videre. Alltid først |
| `ide` | Én idé: tittel, 40–90 ord, valgfri «Husk:»-linje på én setning |
| `felle` | En vanlig misforståelse og hvorfor den er feil. Rød kant |
| `gjett` | Flervalg. Studenten svarer **før** forklaringen. Valget låses, riktig og galt markeres, så vises fella for det valgte (fra `feil`) og `forklaring` |
| `sant` | En påstand med knappene Sant og Usant, så forklaringen |
| `sorter` | 4–8 kort som skal i 2–3 grupper. Studenten trykker gruppe per kort og så «Sjekk». Riktig gruppe markeres |
| `avdekk` | Et rammeverk som avdekkes rad for rad (trykk for neste). Til trinn, stiger, matriser og lister med 3–7 ledd |

Alternativene i `gjett` og kortene i `sorter` **stokkes fast per id** i appen.
Derfor må `forklaring` og `feil` vise til innholdet («the answer that blames
shareholders»), aldri til en bokstav eller plass («option B», «the first one»).
Ingen «all of the above» eller «none of the above».

Poeng: første forsøk på hver `gjett`, `sant` og `sorter` teller. `sorter` er riktig
bare når alle kortene er på rett plass, så hold den til 4–6 kort som virkelig
skiller seg.

## 3. Oppbygging av én forelesning

- **16–22 steg, 12–16 minutter.** Minst 9 steg med noe å gjøre (`gjett`, `sant`,
  `sorter`, `avdekk`). Målet var først 8–10 minutter, men med denne blandingen
  og forklaringer som faktisk lærer bort, landet alle fem skribentene på 12–16.
- Omtrent: 1 krok, 5–7 ide, 1–2 felle, 4–6 gjett, 3–4 sant, 1–2 sorter, 1–2 avdekk.
- **Aldri tre lesesteg på rad.** Veksle.
- **Spør før du forteller.** En god `gjett` introduserer en idé: studenten tenker
  først, og forklaringen lærer bort. En `ide` etterpå kan bygge videre.
- Følg forelesningens egen rekkefølge, så Magnus kjenner igjen foilene.
- Bruk konkrete småcaser (et selskap, en investor, en bank). Bruk eksemplene fra
  foilene når de finnes (Oatly i forelesning 6, Danone, Unilever osv.).
- `kunne`: 5–7 punkter i eksamensform: «Explain why …», «Tell apart … and …»,
  «Place a case on …». Hvert punkt er noe han kan bli spurt om.
- `minutter`: bruk kontrollens anslag (170 ord i minuttet for det studenten ser,
  med én `feil`-tekst per to `gjett`, pluss 20 sekunder per oppgave). Kontrollen
  advarer når tallet avviker med mer enn 2.

## 4. Kilder, i denne rekkefølgen

1. **Manualkapitlet** `fag/fie459/_fragmenter/kN.html`. Det er kontrollert mot
   foilene og artiklene. Hold deg innenfor det den sier.
2. **Foilteksten** `FIE459 Sustainable Finance files/_tekst/FIE459_H26_N_*.txt`, for
   hva foreleseren faktisk vektla og i hvilken rekkefølge.
3. **Rammeverkene som bare finnes som bilder** er transkribert i
   `docs/fie459-forfatterspek.md` §5 (S&S-tabellen over SF 1.0–3.0, integrated
   value, Starks' spekter, etikkrammeverkene, TCFD, taksonomien, strategitabellene).
4. **Kjernepensum** `fag/fie459/_kjerne/kj*.js` og quizen `fag/fie459/quiz.js`, for
   hva som er vektet som eksamensstoff. Ikke kopier spørsmål derfra; skriv nye.

Gjesteforelesningene som manualen har tatt inn, er med: PwC i forelesning 7 og
DNB i forelesning 11.

**Ikke dikt opp tall, år, sitater eller funn.** Alt som står, skal finnes i
manualen eller foilene. Kjente feil i foilene (alfa-fortegnet i forelesning 8 og 9,
«return on assets» i forelesning 6, TCFD skrevet «TFCD», «DNB (2017)» i forelesning
12 er De Nederlandsche Bank): lær det riktige, slik manualen gjør. Se
`SuperEnkelEksamenHjerne/20 Fag/FIE459 Sustainable Finance.md`.

## 5. Skriveregler

- **Engelsk** fagtekst (eksamen er på engelsk). Grensesnittet rundt er norsk.
- Korte, aktive setninger. Forklar hvorfor før hva. Ingen fyllfraser.
- **Ingen tankestrek** (— eller –). Bruk punktum, kolon eller komma.
- **Ingen komma før «and»**, heller ikke i lister («a, b and c»).
- `gjett`: 3–4 alternativer, alle plausible, omtrent like lange. **Fasiten skal
  være det lengste alternativet i rundt én av fire**, ikke oftere og ikke aldri.
  Legg begrunnelsen i `forklaring`, ikke i fasiten.
- `feil`: én setning per galt alternativ som sier hva som er galt med *dette*
  valget. Den skal ikke røpe eller sitere fasiten.
- `sant`: omtrent halvparten sanne. Et usant utsagn er galt på én konkret måte,
  ikke åpenbart tull. Ikke start med «True or false?».
- `forklaring`: 2–4 setninger. Hvorfor det riktige er riktig, og hva som er den
  vanlige feilen.
- id: `f<nr>-<kort-navn>`, unik, små bokstaver, tall og bindestrek. id-ene er
  lagringsnøkler og endres aldri etter publisering.

## 6. Kontroll før levering

```bash
node tools/sjekk-forelesninger.js fie459 <nr> <nr>
python3 tools/bygg-forelesninger.py fie459
```

Kontrollen må gi 0 feil. Les advarslene. Sjekk deretter hver påstand mot manualen
og foilene, og svar på hver `gjett` og `sant` selv uten å se fasiten: er det
nøyaktig ett riktig svar?
