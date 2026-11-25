# FIE402 · svar-data for retting i eksamenssettene

Med egen API-nøkkel kan studenten føre inn svarene sine i eksamenssettene (`/sett`) og få
dem rettet. Tall rettes automatisk mot fasiten, skrive- og forståelsessvar av Claude Opus
5.5. Uten nøkkel er modulen som før. Denne fila beskriver dataene som styrer rettingen.

**Oppgavene endres ikke.** Oppgavetekst, poeng, løsning og kriterier i `fag/fie402/sett.js`
røres aldri. Svar-dataene ligger for seg, i `fag/fie402/_svar/<settId>.json` (én fil per
sett), og bygges til `fag/fie402/svar.js` med `python3 tools/bygg-svar.py fie402`.

## Verktøy

```bash
node tools/svar-deler.js fie402 prove9          # skriv ut deloppgavene med fasit og kriterier
node tools/sjekk-svar.js fie402 prove9 prove10  # kontroller filene (0 feil kreves)
python3 tools/bygg-svar.py fie402                # bygg fag/fie402/svar.js
```

## Nøkler

`"<settId>:<n>:<etikett>"`, for eksempel `"prove9:4:a"`. En oppgave uten deloppgaver har
tom etikett: `"h2025:1:"`. Hver deloppgave (og hver oppgave uten deloppgaver) i de 18
egne settene skal ha én oppføring, **unntatt flervalgsledd** (de med `options`), som rettes
som før. Deleksamenene (`kind: "del"`) låner oppgavene og får ingen egne oppføringer.

## Typer

| Type | Når | Felter |
|---|---|---|
| `tall` | Deloppgaven spør bare etter tall: «find», «compute», «what is the value», «how many shares» | `tall` (1–5 verdier) |
| `tekst` | Forklaring, intuisjon, teori, «comment», «explain», «describe», «show that», en utledning, eller et valg uten tall | ingen |
| `blandet` | Tall **og** et ord- eller valgsvar: «find X and comment», «which project will the manager choose?» (NPV-ene er tall, valget er tekst) | `tall`, `tallPoeng`, valgfritt `tekstLedd` |
| `bokstav` | Flervalg skrevet som tekst i de gamle eksamenene (v2021–v2024): alternativene står i oppgaveteksten, svaret er en bokstav | `svar` (bokstaven, for eksempel `"A"`) |
| `ingen` | Ingen oppgavetekst å svare på (plassholdere der spørsmålet er tapt, som flervalget i v2024) | `merknad` med grunnen |

`bokstav` rettes automatisk og gratis. `ingen` vises som før, med selvvurdering.

Velg den enkleste typen som dekker det sensor gir poeng for. Er et ja/nei eller et valg
bare en direkte følge av tallene og kriteriene ikke gir det egne poeng, holder `tall`.

## Tallene

```json
"prove9:4:a": {
  "type": "tall",
  "tall": [
    { "navn": "FCF", "verdi": 46.8, "enhet": "NOK m" },
    { "navn": "V<sup>U</sup>", "verdi": 585, "enhet": "NOK m" }
  ]
}
```

- **Bare tallene oppgaven spør etter**, ikke mellomregninger. I rekkefølgen oppgaven nevner dem.
- `navn`: kort, som i løsningen. HTML for hevet og senket skrift er lov (`r<sub>E</sub>`).
- `verdi`: regnet i Python med full presisjon, ikke avrundet fra teksten.
- `enhet`: det studenten skal svare i. `"%"` betyr at verdien er i prosent (`9.25` for 9,25 %);
  da godtas også `0.0925`. Ellers for eksempel `"NOK m"`, `"$ m"`, `"$"`, `"$ per share"`,
  `"m shares"`, eller `""` for rene tall (beta, sannsynlighet, forholdstall).
- `tol` (valgfri): relativ toleranse, standard `0.01` (1 %). `abs` (valgfri): absolutt
  toleranse. **Er verdien 0 eller nær 0, bruk `abs`.** For prosent er `abs` i
  prosentpoeng (`0.05`).
- `alt` (valgfri): andre verdier som også godtas, for eksempel når oppgaven kan leses på
  to måter eller både kontinuerlig og årlig rente er riktig. Begrunn i `merknad`.
- `regnet: true` når verdien ikke står i løsningsteksten (du regnet den ut selv). Da gir
  kontrollen en advarsel i stedet for feil. Skriv hvorfor i `merknad`.

`tallPoeng` (bare `blandet`): poengene kriteriene knytter til tallene. Resten går til
tekstdelen. Må være større enn 0 og mindre enn deloppgavens poeng.

`tekstLedd` (valgfri, `blandet`): hva tekstdelen spør om, på engelsk som oppgaven, for
eksempel `"Will you invest? Why?"`. Vises over tekstfeltet.

`merknad` (valgfri): fritekst til den som kontrollerer.

## Poeng

Tall-delen deles likt på tallene (eller `tallPoeng` delt likt i `blandet`). Claude gir
tekstdelen poeng i halve poeng. Summen blir oppgavens poengsum, og studenten kan overstyre.

## Regler

- Ikke endre noe i `sett.js` eller andre filer enn dine `_svar/*.json`.
- Regn alle tall i Python. Mock-settene har `fag/fie402/_prove/proveN_regn.py` med alle tallene.
- Finner du en feil i løsningen, bruk det riktige tallet, sett `regnet: true` og forklar i
  `merknad`. Rapporter det.
- `node tools/sjekk-svar.js fie402 <settId>` må gi 0 feil før du leverer.

## Problem sets (fra 25. november 2026)

Problem sets (`/problemsett`, `fag/fie402/problemsett.js`) bruker samme retting. Dataene
ligger i `fag/fie402/_svar/<id>.json` (`ps1` til `ps4`) med nøkkel `"<id>:<oppgavenr>:<bokstav>"`,
for eksempel `"ps1:3:c"`. De bygges inn i `svar.js` sammen med settene.

```bash
node tools/svar-deler.js fie402 ps1     # delspørsmålene med kontekst, spørsmål og fasit
node tools/sjekk-svar.js fie402 ps1     # kontroll mot fasiten (0 feil kreves)
```

Forskjellene fra settene:

- Bare `tall`, `tekst` og `blandet`. Fasiten er på norsk med engelske tall.
- Oppgavene har ikke poeng. Regelen er 1 poeng per tall, 2 for `tekst` og `tallPoeng + 2`
  for `blandet` (`tallPoeng` = antall tall). `poeng` overstyrer, men brukes bare unntaksvis.
- `kriterier` (2 til 4, engelsk) står på hver `tekst` og `blandet`. Oppgavene har ingen
  kriterier selv. Uten dem retter Claude bare mot fasiten. Kriteriene vurderer bare
  tekstdelen og skal kreve mekanismen, ikke bare konklusjonen.
- Regneskriptene `fag/fie402/_problemsett/psN_regn.py` har tallene med full presisjon.
