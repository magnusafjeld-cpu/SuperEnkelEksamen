# FIE402 · Øv uten stopp: spesifikasjon for eksamensoppgavene (LES HELE)

Du skriver eksamensoppgaver til **«Øv uten stopp»** (`/ov`) i FIE402 Corporate Finance: en
øvingsmodus der studenten bare trykker og får oppgave etter oppgave, styrt av repetisjon med
økende intervaller (som Anki). Hver **deloppgave** du skriver blir et kort i repetisjonen.
Når kortet kommer tilbake, får studenten **en ny variant med nye tall**, så det er metoden
som må sitte, ikke svaret. Bommer studenten med en misforståelse, kommer en ny variant av
samme deloppgave med en gang. Derfor trenger hver oppgave **minst 10 varianter** (standard 12).

Eksamen 7. desember 2026 er Kurbatovs format: seks oppgaver, 100 poeng, åpne svar, ingen
flervalg. To korte teorioppgaver (10–12 poeng, setningsbudsjett) og fire regneoppgaver med
deloppgaver (a), (b), (c) … der (a) er lett og flere slutter med 3–5 poeng intuisjon.
**Oppgavene dine skal se ut som eksamen og være på eksamensnivå.**

Studenten ser oppgavene på to måter:

1. **Én deloppgave om gangen** (vanligst): casen øverst, så `gitt` (tallene fra tidligere
   deloppgaver som trengs), så spørsmålet. Tallsvar skrives inn og rettes automatisk mot
   toleransen. Tekstsvar rettes av Claude mot løsningen og kriteriene dine, eller studenten
   vurderer seg selv.
2. **Hel oppgave** (av og til): casen og alle deloppgavene etter hverandre, uten `gitt`.

Etter svaret ser studenten den korte fasiten (`kort`), fellen tallet traff (`feller`), og kan
åpne hele løsningen (`losning`).

## 0. Hva du leser før du skriver

1. Denne fila, hele.
2. Referanseeksempelet `fag/fie402/_ov/eksempel.py` (`ov-eks1`). Det er formen og
   kvalitetsnivået. Les variantene:
   `python3 tools/bygg-ov.py fie402 --bare eksempel.py --vis ov-eks1`
3. Verktøyet: `tools/ov_lib.py` (T, Felle, tall_del, tekst_del, blandet_del, ovelse, oppgave)
   og `tools/trening_lib.py` (tallformatet: `tall`, `pst`, `prosent_tekst`, `mill`, `penger`,
   `gen`, `rund`, `Avvis`, `ulike`, `annuitetsfaktor`).
4. `docs/fie402-trening-spek.md` § 3 (språk og regler) og § 3b (kursets konvensjoner, Kurbatov
   2026). **De gjelder fullt ut her.** Der appen og Kurbatov er uenige, følger du Kurbatov.
5. `docs/fie402-forfatterspek.md` § 4 (notasjon) og § 9 (lærdommene).
6. `docs/fie402-forelesninger-2026.md` (rettelsene A1–A13 og tilleggene B og D) og
   `docs/fie402-prediksjon.md`.
7. Kurbatovs signaler fra opptakene: `../7. Semester/FIE402 Corporate Finance/NotebookLM-kilder/FIE402 NotebookLM source exam signals from all lecture recordings.md`
   (stien er relativ til `NHH/`). Det han sa kan komme, skal være dekket.
8. For **dine temaer**: eksamenene og prøveeksamenene i `fag/fie402/sett.js` (H2024 og H2025 er
   Kurbatovs egne; bruk `node tools/svar-deler.js fie402 h2024 h2025 prove1` for å lese dem som
   tekst), kjernepensumdelen `fag/fie402/_kjerne/kjN.js`, sjangerstigene `fag/fie402/_sjangre/`
   (også de korte del 3-stigene `101-d3-*.js` til `114-d3-*.js`) og eksamenstreningens moduler
   `fag/fie402/_trening/<tema>.py`. **Ikke kopier dem.** Bruk dem til å se hvordan Kurbatov spør,
   hvilke tall som er pene og hvilke feil som koster poeng. Familiene i eksamenstreningen er
   korte enkeltspørsmål; dine oppgaver er hele eksamensoppgaver med en kjede av deloppgaver.

## 1. Formatet

Du skriver Python-moduler i `fag/fie402/_ov/<modul>.py`. Hver oppgave er en funksjon som får en
tilfeldighetsgenerator `r` og returnerer én variant:

```python
from ov_lib import *

@oppgave("ov-tvi1", tema="tvilling", tittel="A project outside the core business", antall=12,
         sjanger="tvilling", kilde="H2024 E5")
def _(r):
    ...                                   # trekk tallene, regn alt i Python
    return ovelse(case=case_html, deler=[
        tall_del("a", q=..., svar=[T("β<sub>U</sub>", bU)], kort=..., losning=..., poeng=3, feller=[...]),
        tall_del("b", q=..., svar=[T("r<sub>E</sub>", rE * 100, "%")], gitt="<p>From (a): …</p>", ...),
        blandet_del("c", q=..., svar=[T("NPV", npv, "NOK million")], tall_poeng=3,
                    tekst_ledd="Should the firm invest? Why?", kriterier=[...], poeng=5, gitt=..., ...),
        tekst_del("d", q=..., setninger="Answer in at most three sentences.", kriterier=[...], poeng=4, gitt=..., ...),
    ])
```

| Felt | Krav |
|---|---|
| `@oppgave(id, tema, tittel, antall, sjanger, kilde)` | id `ov-<prefiks><n>` (§ 5). `tema` fra `_ov/temaer.py`. `tittel` kort og engelsk. `antall` 10–14, standard 12. `sjanger`: id-en til sjangerstigen som trener det samme (valgfri). `kilde`: eksamensoppgaven den er bygd etter («H2025 E4», «V2022 P3», «Lecture 10 CDS example»). |
| `case` | HTML, engelsk. **Alle tallene** oppgaven trenger, og alle forutsetninger: skatt eller ikke, konstant D/V eller fast gjeld, reelle eller risikonøytrale sannsynligheter, når kontantstrømmene kommer, hvor mange desimaler. Avslutt gjerne med «Give rates in percent with two decimals and betas with four.» |
| deloppgaver | 3–5 per regneoppgave, 2–4 per teorioppgave. Etikettene `a`, `b`, `c` … i rekkefølge. **Samme deloppgaver** (etikett, type, poeng, antall tall) i alle variantene: kortet er «<id>:<etikett>». |
| `poeng` | Som på eksamen. En regneoppgave er 12–20 poeng i alt, en teorioppgave 10–12. (a) er lett (2–4 p). Intuisjonen på slutten er 3–5 p. |
| `q` | Spørsmålet slik det står på eksamen. Si hva som skal finnes og i hvilken enhet når den kan misforstås («in NOK million», «per share», «as a probability»), og om det er NPV eller verdi, firma eller egenkapital. |
| `gitt` | **Påkrevd for alle deloppgaver etter (a)** som bruker tall fra tidligere deloppgaver: nøyaktig de tallene, avrundet slik løsningen viser dem. «From (a): β<sub>U</sub> = 1.0250.» Aldri svaret på deloppgaven selv. Trenger delen ingenting fra før, sett `selvstendig=True` i stedet. |
| `svar` (tall og blandet) | 1–3 `T(navn, verdi, enhet, rel, abs, alt)`. `verdi` er det eksakte tallet (full presisjon) i enheten ved feltet. `"%"` betyr prosent (9.25 for 9,25 %); da godtas også 0.0925. Sannsynligheter, betaer og forholdstall har enhet `""`. Beløp: `"NOK million"`, `"$ million"`, `"$ per share"`, `"million shares"`. |
| `feller` | `Felle(verdi, tekst, i)`: et galt tall en student typisk får, i samme enhet som tall nummer `i`. Regn det ut i hver variant av feilen det beskriver. 2–4 per tall der det finnes naturlige feil. Teksten sier hva som er galt med **dette** tallet («You used D/V instead of D/E in MM II.»), ikke hva som er riktig (fallgruve 12). |
| `kort` | Fasiten på fem sekunder: svaret i fet skrift og regnestykket som avgjør det. Under 50 ord. For tekstdeler: **modellsvaret**, slik et toppsvar ville stått på eksamen, 1–4 setninger. |
| `losning` | Gjennomgangen for en som ikke kan dette: hva begrepet er og hvorfor (2–3 setninger), stegene med tallene (`<p><b>Step 1: …</b> …</p>`), en kontroll (de fem nummererte når de passer, ellers «First check»; si fra når kontrollen er en identitet), og «Remember:» til slutt. 120–350 ord. For tekstdeler: mekanismen, typiske feil som koster poeng, «Remember:». |
| `kriterier` (tekst og blandet) | Det sensor gir poeng for, ett punkt per linje, hvert med poeng i parentes **til slutt**: «Names debt overhang: the NPV of the project goes to the creditors (1 p)». **Summen er tekstdelens poeng** (for blandet: `poeng − tall_poeng`). Konkrete og etterprøvbare. Kurbatov belønner mekanismen, ikke merkelappen. |
| `setninger` | Setningsbudsjett for tekstdeler, som Kurbatov: «Answer in at most three sentences.» |
| `tall_poeng`, `tekst_ledd` (blandet) | Poengene for tallene, og hva teksten skal svare på: «Will the manager invest? Why?» |

### 1b. Typer deloppgaver

- **`tall_del`**: svaret er ett til tre tall. Rettes automatisk.
- **`tekst_del`**: forklaring, intuisjon, teori, «comment», «explain why», «what happens if». Claude
  retter mot `kort`, `losning` og `kriterier`.
- **`blandet_del`**: tall og en kort tekst. «Find the NPV and say whether the shareholders vote for it.»
  Bruk den når sensor gir egne poeng for et valg eller en kommentar.

**Hver regneoppgave har minst én tekst- eller blandetdel**, vanligvis på slutten, som Kurbatovs
3–5 poeng intuisjon. Teorioppgaver (governance, verbale M&A- og kapitalstrukturspørsmål) er bare
tekstdeler.

## 2. Variantene

- **Minst 10 varianter, standard 12.** Byggeren lager dem med faste seeds og trekker på nytt når
  du kaster `Avvis(...)` eller teksten er lik en tidligere variant.
- **Varier mer enn tallene**: selskapsnavn (fiktive, norske eller engelske), NOK eller $, om
  casen gir D/E eller D/V, om den spør etter verdi eller NPV, en vri («the deal closes in a
  quarter», «the project is delayed a year»). Men **samme deloppgaver** i alle variantene.
- **Teorioppgaver** varierer med scenario: lag 6–10 vignetter (selskap, situasjon, tall i teksten)
  og trekk mellom dem, så variantene spør om samme mekanisme fra ulike vinkler. Kriteriene følger
  scenarioet.
- **Tall som ser ut som eksamenstall**: betaer med to desimaler, renter med én (4.5%), beløp i
  runde millioner, sannsynligheter som 0.4 eller 0.25. Velg kombinasjoner der vektene blir pene.
- **Kast `Avvis`** når tallene gir en dårlig oppgave: negativ NPV der teksten forutsetter positiv,
  et valg som snur slik at kriteriene blir feil, en felle som tilfeldigvis gir svaret, verdier som
  blir urimelige.
- **Mellomtall og avrunding** (forfatterspek § 9.5): løsningen viser mellomtall med fire desimaler
  og regner videre fra de viste tallene, så den summerer. `T.verdi` er den eksakte verdien. Bruk
  en sjekk som i eksempelet (`_sjekk(vist, eksakt)`) og avvis varianten når de to ligger lenger
  fra hverandre enn toleransen.

## 3. Toleransen

Standard er 0,2 % relativt avvik (`ov_lib.STD_REL = 0.002`), litt rausere enn eksamenstreningen
fordi kjedene er lengre. Gi `abs` når svaret er 0 eller kan ligge nær 0 (en NPV, en endring i
verdi, en arbitrasjegevinst), for eksempel `abs=0.05` i millioner. Gi `alt=[...]` når to lesninger
er forsvarlige (si det i løsningen). Byggeren avviser en felle som ligger innenfor toleransen.

## 4. Språk og regler

Alt i § 3 og § 3b i `docs/fie402-trening-spek.md` gjelder. Det viktigste:

- **Engelsk**, «you», kort og direkte. **Ingen tankestrek (—)**, **ingen komma foran «and»**,
  ingen bokstavhenvisninger («option B»), ingen henvisninger til andre oppgaver («previous
  question», «same firm as»). Innenfor oppgaven er «(a)» og «from (b)» greit.
- **Tallformat** bare gjennom hjelperne (`tall`, `pst`, `prosent_tekst`, `penger`, `mill`).
  Punktum som desimaltegn, hardt mellomrom som tusenskille, ekte minus (−), × for gange.
- **Notasjon** etter forfatterspek § 4: r<sub>E</sub>, r<sub>D</sub>, r<sub>U</sub>, β<sub>U</sub>,
  τ<sub>c</sub>, V<sup>L</sup>, PV(TS), r<sub>wacc</sub>, FCF<sub>t</sub>. ρ er alltid den
  risikonøytrale sannsynligheten (unntak: CDS-eksempelet i forelesning 10, der Kurbatov skriver
  sannsynligheten for mislighold som ρ; si det i casen). D er markedsverdien av gjeld, K er
  innløsningskurs eller pålydende.
- **Konvensjonene** (trening-spek § 3b): β<sub>U</sub> uten skatt i vektene ved konstant D/V,
  netto gjeld, skatteskjoldet med r<sub>U</sub> ved konstant D/V og r<sub>D</sub> ved fast plan,
  diskret diskontering overalt (aldri e<sup>−rT</sup>), ingen Black-Scholes-regning, reelle
  sannsynligheter med kapitalkostnaden (r<sub>f</sub> bare når risikoen ikke er priset),
  nedleggelse sammenlignes med 0, avtalesannsynlighet over (1 + r<sub>f</sub>)<sup>T</sup>,
  governance generelt (ikke norsk aksjelov), fire desimaler på renter, sannsynligheter og betaer.
- **Kurbatov** omtales ved navn, aldri med «he/his/she/her».
- HTML: `<p>`, `<b>`, `<sub>`, `<sup>`, `<ul><li>`, enkle `<table>`. Balanserte tagger.

## 5. Id-er, filer og fordelingen

Id-ene er lagringsnøkler. En oppgave som skrives om til noe annet, får ny id. Kortet heter
`<id>:<etikett>`, så en deloppgave må aldri bytte innhold under samme etikett.

| Skribent | Fil | Prefiks | Tema | Oppgaver (forslag, minst disse mønstrene) |
|---|---|---|---|---|
| 1 · Verdsetting | `tvilling.py` | `tvi` | tvilling | 3: et prosjekt utenfor kjernevirksomheten priset med en tvilling (ikke firmaets WACC); to tvillinger og snittet av β<sub>U</sub>; egen gearing endres (β<sub>E</sub> og r<sub>E</sub> før og etter, lovet rente mot forventet avkastning) |
| 1 | `wacc_apv.py` | `wac` | wacc-apv | 4: WACC og APV på samme firma (Check 1); APV med fast nedbetalingsplan (skjoldet med r<sub>D</sub>); FCF fra EBIT, Dep, CapEx og ΔNWC over to–tre år pluss terminalverdi; FTE/FCFE mot WACC minus gjeld, eller gjeldskapasitet D<sub>t</sub> = d × V<sup>L</sup><sub>t</sub> og konstant rentedekning |
| 1 | `skatt.py` | `skt` | skatt | 3: rekapitalisering med skatt (kurshopp ved kunngjøringen, aksjer kjøpt tilbake, ny r<sub>E</sub>); permanent gjeld τ<sub>c</sub>D mot forventede konkurskostnader (beste gjeldsnivå); fast plan og skjoldet år for år |
| 2 · Kapitalstruktur | `mm.py` | `mm` | mm | 4: MM I og II uten skatt med rekap, EPS og pris; hjemmelaget gearing og arbitrasje; MM II med risikabel gjeld (β<sub>D</sub>); EPS i tilstander og break-even-EBIT |
| 2 | `utbytte.py` | `utb` | utbytte | 3: utbytte mot tilbakekjøp under MM (cum/ex, formuen til den som selger og den som beholder); utbytte finansiert med nye aksjer; skatt τ<sub>d</sub>* og kursfallet, klienteller |
| 2 | `agent.py` | `agt` | agent | 3: risk shifting (negativ NPV med max(·, 0) per tilstand, Check 3 og 4); gjeldsoverheng (positiv NPV avvist, reforhandling eller emisjon x = I/E<sub>with</sub>); gambling for resurrection eller utbytte/salg av eiendeler nær mislighold (wealth transfer) |
| 3 · Informasjon og M&A | `info.py` | `inf` | info | 3: Myers-Majluf med to typer, α og pooling mot separering med Check 5; samme med risikofri gjeld som alternativ (hakkeordenen); IPO-underprising og vinnerens forbannelse |
| 3 | `ma.py` | `ma` | ma | 5: aksjebytte (bytteforhold, pris etter fusjonen, hvem tjener, når sier hver side ja); kontant mot aksjer (NPV for hver side og hvem bærer synergirisikoen); implisitt avtalesannsynlighet med T i år og fusjonsarbitrasje; koforsikring med risikabel gjeld i tilstander; budkamp og reservasjonspris |
| 3 | `teori.py` | `teo` | skatt / utbytte / info | 2 teorioppgaver: kapitalstrukturteoriene (trade-off mot hakkeordenen) brukt på et selskap; utbyttepolitikk (signaler, klienteller, tilbakekjøp mot utbytte). Velg temaet etter innholdet |
| 4 · Opsjoner og kreditt | `opsjoner.py` | `ops` | opsjoner | 5: put-call-paritet med arbitrasje; ett binomisk steg med replikering (Δ, B) og ρ, og hvorfor den reelle sannsynligheten ikke betyr noe; et annet krav på samme tre priset med ρ fra en notert call og forventet avkastning på opsjonen; gevinst og nullpunkter for en strategi (straddle, spread); Black-Scholes-intuisjon og amerikansk mot europeisk (mest tekst). **Bare ett steg i treet** (Kurbatov) |
| 4 | `kreditt.py` | `kre` | kreditt | 5: egenkapital som call og gjeld som risikofri gjeld minus put i et tre (verdier, lovet rente, spread); senior og junior gjeld fra noterte calls (Google-oppgaven); spreaden delt i forventet tap og risikopremie; CDS priset som i forelesning 10; mer risiko flytter verdi fra kreditorene (opsjonsspråk) |
| 5 · Realopsjoner og governance | `realopsjon.py` | `reo` | realopsjon | 6: vente med å investere (risikonøytralt eller med tvilling) og hva som øker verdien av å vente; nedleggelse målt mot 0; trinnvis investering eller verdien av informasjon (pilot); prosjekt priset med en omsatt tvilling; exit-klausul med månedlige kontantstrømmer ((1 + r)<sup>1/12</sup> − 1, annuitet, forpliktet mot ikke forpliktet); vekstopsjon med reelle sannsynligheter når risikoen er priset og når den ikke er det |
| 5 | `governance.py` | `gov` | governance | 4 teorioppgaver: styret og uavhengighet (free-rider, CEO som styreleder, størrelse, travle styremedlemmer); lønn og KPI-er (EPS-mål, tilbakekjøp for å treffe målet, kortsiktighet); aktivister, proxy-rådgivere og oppkjøpsforsvar; aksjonærer mot interessenter og motivene for M&A |

Det er 50 oppgaver i alt, pluss eksempelet. Finner du et eksamensmønster i dine temaer som mangler
i listen og er viktigere enn et av forslagene, bytt og si det i rapporten.

## 6. Arbeidsrutinen

```bash
python3 tools/bygg-ov.py fie402 --bare tvilling.py wacc_apv.py skatt.py      # bare dine filer
python3 tools/bygg-ov.py fie402 --bare tvilling.py --vis ov-tvi1            # les alle variantene
```

1. Skriv **én** oppgave, bygg og **les alle variantene med `--vis`**.
2. **Regn minst to varianter uavhengig** i `python3` (i scratchpad, ikke i `_ov/`) fra casen alene,
   som en student ville gjort, med full presisjon. Sjekk hvert tall mot `SVAR:`-linjen, og at hver
   felle faktisk er den feilen teksten sier. Først da neste oppgave.
3. Les hver deloppgave **alene** med `gitt` over: kan den løses, og kan den bare gi ett svar?
4. Les tekstdelene som sensor: kan Claude gi poeng bare fra kriteriene og modellsvaret? Summerer
   kriteriene?
5. Kjør byggeren til den ikke melder FEIL.
6. **Ikke bygg `fag/fie402/ov.js`** (uten `--bare`). Koordinatoren bygger samlet. Ikke rør andre
   filer enn dine egne moduler i `fag/fie402/_ov/`. Trenger du en hjelper, definer den i din fil.
   Utkastfilene `_ov/_utkast-*.js` er dine og kan stå.

## 6b. Lærdommer fra kontrollen (23. november 2026)

Fem uavhengige kontrollører regnet alle 51 oppgavene på nytt. Regningen holdt overalt; feilene lå
i det rundt regningen. Disse reglene gjelder derfor alle nye oppgaver:

1. **En felle som havner innenfor toleransen, avviser varianten.** Ikke fjern fella stille: da godtas
   et galt svar, eller studenten får «feil» uten forklaring. Fjern bare en felle som treffer et
   *annet* tall i samme del.
2. **Nye tall betyr nye svar.** Byggeren avviser en variant med samme svarvektor som en tidligere.
   Sjekk også at symmetri ikke gjør et mellomtall lik svaret (skjeve sannsynligheter, ikke 0.5).
3. **Gitt har alt delen trenger, og ikke mer.** Mangler et tall fra (a), kan delen ikke løses alene.
   Står et argument eller et nøkkelsteg i gitt, er poenget gitt bort.
4. **Casen sier alle forutsetninger:** konstant D/V eller fast gjeld, netto gjeld, fri eller
   forpliktet investering. En forutsetning som mangler, kan snu fortegnet og beslutningen.
5. **Realistiske tall:** forventet avkastning under rundt 20 %, ρ/p under 4, ingen urimelig høy
   r<sub>U</sub>. Varianter som bryter det, avvises.
6. **Modellsvaret og kriteriene følger varianten.** En påstand («the decision flips», «the share price
   is unchanged», «worth more than today's cash flow») skal stemme i hver variant, og kriteriene skal
   bare gi poeng for det spørsmålet ber om.
7. **Kurbatov siteres bare med kilde.** Ikke tilskriv Kurbatov en advarsel uten å ha lest den i
   opptaket. Ikke lær studenten å si at Kurbatov tar feil: forklar heller når påstanden holder.
8. **Viste tall summerer.** Løsningen regner videre fra tallene den viser, eller viser nok desimaler.
9. **Pronomen følger navnet** for oppdiktede personer. Kurbatov omtales alltid ved navn.

## 7. Rapporten din

Når du er ferdig, svar med (kort, på norsk):

- oppgavene per fil: id, tittel, deloppgaver med type og poeng, antall varianter, kilde
- hva du regnet uavhengig og hva du fant og rettet underveis
- alt du er usikker på (en konvensjon, en formel, et tall), med id og etikett
- avvik mellom manualen, kjernepensum og Kurbatovs forelesninger som du oppdaget
- eksamensmønstre i dine temaer som fortsatt ikke er dekket
