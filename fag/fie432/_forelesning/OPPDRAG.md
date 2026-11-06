# Oppdrag: eksamenssett per forelesning i FIE432

Magnus er masterstudent ved NHH. Eksamen i FIE432 Personlig økonomi er torsdag 12. november 2026: fire timers digital flervalgseksamen, fire alternativer, +3 for rett, −1 for feil, 0 blankt. Han får nesten alt riktig på prøveeksamener, men finner hull her og der.

Appen SuperEnkelEksamen får en ny fane i Eksamenssett: **«Per forelesning»**, ett flervalgssett per forelesning (16 sett). **Når han har gjort alle settene, skal han ha blitt testet på hele pensum.** Det måles mot sjekklisten i appen (`fag/fie432/sjekkliste.js`, 854 punkter): hvert punkt for forelesningen skal være dekket av minst ett ledd.

Kurset kunngjorde 6. november 2026:
- **Satser og regler oppgis på eksamen.** Oppgi derfor alle satser, grenser og terskler i oppgaveteksten. Ikke spør om tall man må huske («Hva er bunnfradraget?»). Test forståelse og bruk: hvilken sats på hvilket grunnlag, i hvilken rekkefølge, hva som skjer når noe endres, hvorfor.
- **Veldig gamle eksamensoppgaver er utdatert.** Følg 2026-forelesningene. Er en gammel fasit i strid med forelesningen, gjelder forelesningen.
- **Les forelesningsnotatene nøye.** Settene skal derfor bygge på lysbildene, også det som bare står på ett lysbilde.

## Kildene

1. **Forelesningene 2026 (primærkilde):** tekst fra alle lysbildene ligger i
   `/Users/magnusfjeld/Documents/Magnus Fjeld/NHH/7. Semester/FIE432 Persøk/_claude/tekst2/`, filene `NYE FORELESNINGER __ *.txt` (lysbildene merket `=== Lysbilde N ===`). Eldre versjoner (`Forelesninger __ *`) bare som støtte. Pensumartikler og oppgavesett ligger i samme mappe.
2. **Sjekklisten:** `python3 -I fag/fie432/_forelesning/felles.py <sett-id>` lister punktene settet ditt skal dekke. Hele punktet (kort svar, forklaring i `mer`, kilder, avvik mellom kilder) står i `fag/fie432/sjekkliste.js`. Les punktene for din forelesning der, for eksempel med Python. `mer` forklarer kjente avvik mellom kildene og hva som gjelder til eksamen. Sjekklisten er et sammendrag: kontroller mot lysbildet når du er i tvil.
3. **Manualen:** `fag/fie432/_fragmenter/kN.html` (kapittel 1–18). Kapitlene: 1 effektiv skattesats og gjennomsnittsskatt, 2 avkastning etter skatt og tidsverdien av fradrag, 3 avkastning over tid og hvem som eier hva, 4 investeringscaser, 5 aksjonærmodellen og skjerming, 6 fritaksmetoden og exit-skatt, 7 formuesskatt, 8 formuesskatt som avkastningsskatt, 9 bedriftens tilpasning, 10 progressivitet, flat skatt og rettferdighet, 11 skatteincidens, 12 skatt, risiko og implisitt skatt, 13 internasjonal skatt og skatteparadiser, 14 sparing og portefølje, 15 pensjon, 16 lån, 17 forsikring og forventet nytte, 18 finansiell psykologi.
4. **Eksamensstilen:** `fag/fie432/sett.js`, settene `h2025`, `h2024`, `h2022` og `mc2026` (ekte flervalg), og `prove7`–`prove9` (prøveeksamener laget for appen, samme format som du skal lage). Les et par oppgaver for å se ordlyd, lengde og løsningsstil. **Ikke kopier** noe spørsmål med samme tall. Samme regnerutine med nye tall, navn og vri er bra.
5. `docs/fie432-proveeksamen-spek.md`: spesifikasjonen for prøveeksamenene. Avsnittene om alternativer, løsninger og skriveregler gjelder også her.

Ikke les hele mapper på måfå. Les forelesningen din fra start til slutt og søk målrettet i resten.

## Settet

- **Antall ledd:** antall sjekklistepunkter delt på 3, rundet opp, minst 10 og høyst 30. Et ledd kan dekke ett til fire punkter.
- **«dekker»** på hvert ledd: id-ene til sjekklistepunktene leddet faktisk tester. Et punkt er dekket bare hvis du må kunne punktet for å svare riktig, eller hvis et galt alternativ er nøyaktig feilen punktet advarer mot. Ikke fyll på id-er for å få dekningen opp.
- **Kjerne først:** hvert `kjerne`-punkt skal være hovedpoenget i minst ett ledd. `viktig`- og `detalj`-punkter kan dekkes sammen, gjerne flere i ett ledd («Hvilken påstand er riktig?» der de gale alternativene er tre andre punkter snudd på hodet).
- **Rekkefølgen** følger forelesningen. Ledd med felles scenario grupperes i én oppgave med deloppgaver a, b, c (som H2024 og H2025). Omtrent 8–18 oppgaver per sett.
- **Blanding:** regneledd der forelesningen har tall og formler, ellers begreps-, mekanisme- og påstandsledd. Finanspsykologi og skatteparadiser blir mest tekst, aksjonærmodellen og formuesskatt mest regning. Ingen kvote.
- **Vanskelighet:** som eksamen eller litt over. Ingen ledd som kan løses bare ved å lese spørsmålet.

## Alternativene

- Nøyaktig fire, nøyaktig ett riktig under forutsetningene i teksten. Kan to svar forsvares, skriv om ledet.
- Hvert galt alternativ er en navngitt feil (glemt skjerming, feil grunnlag, brutto i stedet for netto, snudd fortegn, forvekslet begrep, gammel regel fra før 2026 og så videre). Løsningen sier hvilken.
- Fasitposisjonen bestemmes av `fasitplan.json`. `S.ledd()` setter riktig svar på plass selv: du gir riktig og tre gale.
- Ingen lekkasje: riktig alternativ skal ikke oftere være det lengste eller det mest presise. Gjør de gale like lange og like nyanserte. Kontrollen stopper deg hvis riktig er lengst i over 30 % av tekstledd.
- Tall: mellomrom som tusenskille, desimalkomma, minustegn «−» (U+2212): «kr 1 250 000», «37,84 %», «−2 400».

## Løsningene

Bruk `sol()` for regneledd og `begrep()` for begrepsledd i `felles.py`. Alle skal ha `kilde=` med presis henvisning til lysbildet, for eksempel `kilde="F4 lb 23"`, `"Pensjon lb 12"`, `"Kvadsheim lb 7"`, `"BS3 s. 55"`. Han skal kunne slå opp lysbildet etterpå. Forklar hvorfor hvert galt alternativ er galt. Kort og presist, 40–150 ord.

## Teknisk

Skriv **ett regneskript per sett**: `fag/fie432/_forelesning/<sett-id>_regn.py`. Se docstringen øverst i `fag/fie432/_forelesning/felles.py` for bruken:

```python
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from felles import *
S = Sett("fl-f4")
...
S.skriv(label="F4 Aksjonærmodellen og fritaksmetoden", note="…", facts=[…], practiceNote="…")
```

- Regn **hvert** tall i Python i skriptet. Ingen tall fra hukommelsen. For tallalternativer, gi `(tekst, [tallene som står i teksten])` så kontrollen sjekker at tallene stemmer.
- Kjør `cd "/Users/magnusfjeld/Documents/Magnus Fjeld/NHH/SuperEnkelEksamen" && python3 -I fag/fie432/_forelesning/<sett-id>_regn.py`. Den skriver `<sett-id>.json` og stopper med en feilliste: fasitplan, tallene i alternativene, skriveregler, lekkasje, struktur (`tools/sjekk-sett.js`) og **dekningen**. Rett til den sier «Ingen feil».
- `label`: forelesningsnavnet, for eksempel «F4 Aksjonærmodellen og fritaksmetoden» eller «Næss: sparing og pensjon» (samme navn som seksjonene i sjekklisten).
- `note`: én til to setninger om hva settet dekker.
- `facts`: fire korte punkter: antall ledd og formatet med minuspoeng, «Satser og regler står i oppgaveteksten, slik de blir oppgitt på eksamen.», «Sammen med de andre settene i fanen dekker settet hvert punkt i sjekklisten.», «Laget fra forelesningsnotatene 2026. Kurset har ikke kontrollert løsningene.»
- `practiceNote`: ett råd for akkurat denne forelesningen.
- `topic` på oppgavene: bruk navnene fra de ekte settene der det passer (Aksjonærmodellen, Skjerming, Effektiv skattesats, Formuesskatt, Formuesskatt som avkastningsskatt, Skatteincidens, Bedriftens tilpasning, Progressivitet, Skatt og risiko, Implisitt skatt, Internasjonal skatt, Exit-skatt, Skatteparadis, Investeringscaser, Fritaksmetoden, Porteføljevalg, Forsikring og forventet nytte, Pensjon, Lån, Sparing, Finansiell psykologi, Indeksfond og aktiv forvaltning), ellers et kort norsk navn.
- `chapters`: manualkapitlene oppgaven bygger på (1–18).
- Rør ingen andre filer enn dine egne `<sett-id>_regn.py` og `<sett-id>.json`. Ikke endre `felles.py` eller `fasitplan.json`. Finner du en feil i `felles.py`, si fra i svaret.

## Skriveregler (sjekkes maskinelt)

Norsk bokmål. Ingen tankestrek (verken «—» eller « – » som skilletegn): bruk kolon, punktum eller komma. Aldri komma foran «og». Minustegn «−», ikke bindestrek. Ingen LaTeX. Tillatt HTML: `p b i br sub sup ul ol li table tr th td em strong span`, tabeller med `class="data"` og `td class="n"` for tall. Kort og presist, som en eksamensoppgave. Korte scenarioer med navn («Kari eier …», «Anta at …»), og presis beskjed om avrunding.

## Svar tilbake

Kort: per sett antall oppgaver og ledd og dekningen, lysbilder du var i tvil om, og avvik mellom kilder du fant. Ikke lim inn innholdet.
