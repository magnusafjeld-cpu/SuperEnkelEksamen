# Oppdrag: FIE402-kartlegging, del N

Du skriver én av tre deler av en **kartleggingsprøve** i FIE402 Corporate Finance for appen
SuperEnkelEksamen. Prøven skal finne ut hva studenten må øve mer på. Alle ledd er flervalg
som rettes automatisk, og hvert **feil** alternativ er bygd fra én bestemt, navngitt feil, slik
at rapporten kan si nøyaktig hva som ikke sitter.

Studenten (Magnus) er masterstudent ved NHH. Eksamen er 7. desember 2026. Han har ingen lærebok.
Manualen i appen er kilden.

## Les først (målrettet, ikke hele filer)

- `docs/fie402-forfatterspek.md`: notasjon, kursets konvensjoner (βU vektet uten skatt, renten
  på skatteskjoldet), de fem konsistenskontrollene, og lærdommene i §9. **Følg dem.**
- `docs/fie402-kursplan.md`: kapittelkart og eksamens-DNA.
- `fag/fie402/_kart/temaer.js`: temalista. Hvert ledd skal ha `tema` fra denne lista.
- `FIE402_Manual.html`: manualen. Søk etter `<section id="kN">` for kapitlene du trenger, og
  bruk samme formler og konvensjoner som manualen. Ikke les hele fila.
- Se gjerne hvordan et eksisterende sett ser ut i `fag/fie402/sett.js` (søk på `kind: "mock"`),
  men **ikke kopier oppgaver derfra**. Alle tall og caser skal være nye.

## Leveranse

1. `fag/fie402/_kart/delN.js` (N = ditt delnummer) med nøyaktig denne formen:

```js
/* FIE402 · KARTLEGGING · del N: <tittel> */
window.EDU_KART = window.EDU_KART || {};
window.EDU_KART.delN = {
  id: "kartN", kind: "kartlegging", del: N,
  label: "Kartlegging del N: <kort norsk tittel>",
  minutes: 90, points: <antall ledd>,
  mc: { wrongFactor: 0 },
  format: "<antall> flervalgsledd · uten nedtelling",
  exercises: [
    { n: 1, title: "<English title>", topic: "<English topic>", chapters: [<kapitler>], points: <antall deler>,
      body: "<p>Case text in English, HTML.</p>",
      parts: [
        { label: "a", points: 1, tema: "<tema-id>",
          body: "<p>The question.</p>",
          options: ["<opt A>", "<opt B>", "<opt C>", "<opt D>"],
          answer: <0-3>,
          diag: ["<norsk: hvilken feil gir dette alternativet>", null, "...", "..."],
          solution: "<p>Full worked solution in English: the rule, the steps with numbers, then one short line per wrong option saying which error produces it.</p>" },
      ] },
  ],
};
```

2. `fag/fie402/_kart/delN_regn.py`: et Python-skript som regner ut **hvert** tall i delen
   (riktig svar og hvert feilsvar fra sin feil) og `assert`-er at tallene i `delN.js` stemmer.
   Kjør det til det går gjennom.

## Krav til innholdet

- **Språk:** case, spørsmål, alternativer og løsninger på **engelsk** (eksamen er på engelsk).
  `diag` skrives på **norsk**, kort (én setning, under 20 ord), med engelske fagtermer der det er
  naturlig. Eksempel: «Diskonterte skatteskjoldet med r_D selv om gjelden holdes på konstant D/V.»
  Norske skriveregler i `diag`: ingen tankestrek, ingen komma før «og».
- **Notasjon** som i forfatterspek §4: `r<sub>U</sub>`, `β<sub>E</sub>`, `τ<sub>c</sub>`,
  `V<sup>L</sup>`, minus som `−` (U+2212), `×` for gange, desimalpunktum, prosent som `6%`.
  Aldri rå `<` eller `>` i tekst: bruk `&lt;` og `&gt;`.
- **Hvert ledd står på egne ben.** Trenger et ledd et resultat fra et tidligere ledd, oppgi
  verdien i spørsmålet («Suppose r<sub>U</sub> = 9.20%»). En feil skal aldri forplante seg, ellers
  blir diagnosen feil.
- **Ett tema per ledd.** Leddet skal måle ferdigheten i temaet det er merket med, ikke noe annet.
- **Fire alternativer.** Nøyaktig ett riktig. `diag[answer]` er `null`. Hvert feil alternativ har
  en `diag` som navngir feilen som faktisk gir det tallet eller utsagnet. Feilene skal være de
  vanlige: dem manualen og forfatterspek §9 advarer mot (feil rente på skatteskjoldet, β<sub>D</sub>
  glemt, nominell i stedet for risikonøytral sannsynlighet, glemt å diskontere, D/E forvekslet med
  D/V, glemt kontanter, synergier talt dobbelt osv.).
- **Tallalternativer** står i stigende rekkefølge. Rund som manualen: 4 desimaler for renter
  (eller to desimaler i prosent), 1 til 2 desimaler for kroner/dollar. Feilsvarene skal ligge nær
  nok til at de krever regning, men være tydelig forskjellige etter avrunding.
- **Fordel fasiten.** Riktig alternativ skal fordele seg jevnt på A til D over delen (hver posisjon
  20 til 30 %). Riktig svar skal ikke systematisk være det lengste alternativet, det midterste
  tallet eller det eneste med en spesiell formulering.
- **Verbale ledd** (mekanismer, governance, intuisjon) har fire påstander der de tre gale er
  plausible og bygger på en navngitt misforståelse. Ingen «all of the above».
- **Vanskelighetsgrad:** eksamensnivå. Det skal kreve at man kan stoffet, ikke at man kjenner
  igjen formuleringer. Rundt 3 minutter per ledd i snitt, så delen tar rundt 90 minutter.
- **Løsning per ledd:** regelen, utregningen steg for steg med tall, og en kort linje per feilt
  alternativ om hvilken feil som gir det. Skriv som manualen (forfatterspek §3, §7, §9).
- **Ikke finn på eksamensreferanser.** Nevn gjerne «this is the H2025 Exercise 4 routine» bare
  hvis kursplanen lister det.
- Cases på 2 til 5 ledd, med en felles casetekst i `body`. 7 til 10 cases per del.

## Fordeling av ledd i din del

Se tabellen for ditt delnummer i oppdraget du fikk. Hold deg til temaene og antallene.

## Når du er ferdig

Kjør `node tools/sjekk-sett.js fag/fie402/_kart/delN.js` hvis den godtar fila. Den forventer
`window.EDU_DATA.sets`. Lag i så fall en midlertidig kopi som setter
`window.EDU_DATA = { sets: [window.EDU_KART.delN] }`, eller la være og sjekk selv at poengene
summerer, at `answer` er gyldig og at `diag` har like mange elementer som `options`.
Kjør `python3 fag/fie402/_kart/delN_regn.py`.

Rapporter kort: antall ledd per tema, fordelingen av riktig posisjon (A/B/C/D), og hva du var
usikker på faglig.
