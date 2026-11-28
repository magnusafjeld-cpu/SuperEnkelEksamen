# FIE402: prediksjonseksamener i Eksamenssett (28. november 2026)

Magnus vil ha **hele eksamener bygd på det som mest sannsynlig kommer** 7. desember 2026, i
en egen fane «Prediksjon» i Eksamenssett. Først to sett. Når han er ferdig med et sett, lages
et nytt: én oppgave som ligner det han bommet på i settet han nettopp tok, pluss andre
eksamensoppgaver. Slik fortsetter det: prediksjon 1 ferdig gir prediksjon 3, prediksjon 2
ferdig gir prediksjon 4 og så videre.

Settene er `kind: "mock"` med `fane: "pred"` (se Eksamenssett-modulen i hjernen). Kilden er
`fag/fie402/_pred/`, flettet inn med `tools/flett-pred.py`.

## Les før du skriver

1. **`docs/fie402-mk-spek.md`, hele.** Reglene, «Ikke gjenbruk», lærdommene fra den blinde
   kontrollen og tabellen med forelesningssteder og tidsstempler per oppgavetype gjelder her.
2. **`docs/fie402-deleksamen-spek.md`** og det den viser til: `docs/fie402-svar-spek.md`,
   `docs/fie402-forfatterspek.md` (§ 4 notasjon og § 9 lærdommer), `docs/fie402-ov-spek.md`
   § 6b. I `docs/fie402-proveeksamen-spek.md` leser du «The format», «Sources», «What very
   similar means», «Data format», «Writing rules», «Checks before delivery», «Lessons from the
   blind review» og «Signals from all lecture recordings». **Hopp over «The three exams» og
   «Mock exams 4 to 12»**: Magnus skal kunne ta prøveeksamenene uten å ha fått dem forklart.
3. **`docs/fie402-prediksjon.md` § 0 til § 4.** Ikke § 5 og 6 (planene for prøveeksamenene).
4. **Kurbatovs to eksamener** (`h2024` og `h2025` i `fag/fie402/sett.js`) og nøklene
   `FIE402_Corp_course_files/2024 - S.pdf` og `2025 - S.pdf` (les med PyMuPDF). Formen, lengden
   og hvor kort et fullt svar kan være, kommer herfra.
5. **Forelesningsstedet** for hver oppgave (tidsstemplene i mk-spek-tabellen). Tekstingen ligger
   i `../7. Semester/FIE402 Corporate Finance/Forelesninger/Teksting fra Panopto/`.

Prøveeksamenene (`prove1` til `prove12` i `sett.js` og alt i `fag/fie402/_prove/`) skal du
**ikke lese for innhold** og ikke bygge på. Bruk dem bare i `grep` for å sjekke at firmanavn og
hovedtall ikke er gjenbrukt.

## Formatet

Hele eksamener: **6 oppgaver, 100 poeng, 180 minutter**, ingen flervalg. E1 og E2 er teori
(ett avsnitt med setningsbudsjett og poeng per element), E3 til E6 regning med 4 til 9
deloppgaver der del a er lett og siste del er en verbal hale på 3 til 5 poeng.

| Sett | Poeng | Hvorfor |
|---|---|---|
| pred1 | 10 · 10 · 20 · 20 · 20 · 20 | Mest sannsynlige fordeling (45 %): teori «about 10 points each», regning «like 80 %» |
| pred2 | 12 · 12 · 18 · 18 · 20 · 20 | Begge Kurbatov-settene (30 %) |
| pred3 og videre | Veksle mellom de to | |

**Ingen reserveverdier** («If you could not solve (b), use …»). Kurbatov bruker dem ikke. Den
blinde kontrollen av pred2 viste at de lekker svar: en reserveverdi kan ligge innenfor toleransen
til det tidligere leddet eller røpe retningen på det. Følgefeil rettes i appen med «Sjekk
følgefeil» (`følgePrompt` i `js/bundle-sett.js`). Dette går foran lærdommen om reserveverdier i
mk-spek.

**Toleranser.** Rettingen godtar max(`abs`, `tol` × |verdi|), med `tol` 0,01 som standard. En `abs`
under 1 % av verdien gjør derfor ingenting alene: sett også en liten `tol`. Regneskriptet skal
sjekke at hver kjent felle (enkel rente i stedet for rentes rente, glemt rente for brøkdel av år,
ρ mot 1 − ρ, gammel kurs i tilbakekjøp) faller utenfor toleransen. Unntak: enkel mot sammensatt rente over
noen få måneder skiller seg mindre enn avrunding (1 + 0,03 × 0,25 mot 1,03<sup>0,25</sup>) og godtas. Riktige svar rundet til
4 desimaler skal falle innenfor.

`facts` på settet (vises på startkortet), for eksempel:
- «Prediction exam in Kurbatov's format: 6 exercises, 100 points, 180 minutes, no multiple choice, calculator and one bilingual dictionary permitted.»
- «Points per exercise: … Two verbal exercises with sentence budgets, then four computational exercises.»
- «The formula sheet is handed out.»
- «Recommended precision: 4 decimal places. An error carried forward is not penalised again in later parts.»
- «Written for this app from the prediction of the 2026 exam. Every number in the solutions is computed in a script.»

`note` (vises i lista, norsk): én til to setninger om hva settet tester, uten å røpe mekanismen.
`label`: «Prediksjon 1» osv. `format`: «6 oppgaver · 100 poeng · ingen flervalg».

`merke` på hver oppgave (norsk, vises ved oppgaven): hvilken form den har og hvor sannsynlig
temaet er, for eksempel «Som H2025 E6, med tre måneder · M&A med regning 65 %». Fra pred3 står
det også når oppgaven er en ny runde på noe fra et tidligere sett: «Ny runde: gjeldsoverheng
fra prediksjon 2». Merket navngir aldri mekanismen oppgaven spør etter.

## Pred1: den mest sannsynlige eksamenen

Blokkmønsteret med høyest sannsynlighet (40 %): kapitalstruktur, verdsetting, realopsjon, M&A.

| Opp. | Poeng | Tema (kode i prediksjonen) | Form |
|---|---|---|---|
| E1 | 10 | Governance: eierens verktøykasse (D11, 40 % av governance-vinklene) | En eier (for eksempel et fond med en stor post) i et børsnotert selskap med spredt eierskap og en ny CEO. Tre tiltak (kontrakt og insentiver, styret, åpenhet eller stemmegivning) som får lederen til å handle for eierne «but not scare them too much». Setningsbudsjett og poeng per element som H2025 E2. Opptak 17, 1:18:44 til 1:22:27 |
| E2 | 10 | Kapitalstruktur verbalt: MM mot virkeligheten (25 %) | Hvilke MM-forutsetninger som ikke holder og hva det betyr for valg av gjeld: skatt, kostnader ved financial distress (med brannsalg), byråkostnader. Opptak 03, 11:33 til 11:45 («This could be like the question one») og opptak 04, 4:56 og 26:24 |
| E3 | 20 | MM-rekapitalisering (A2 70 %) med skatt som vri (A5 40 %) | Del a til d i perfekt marked: kurs ved kunngjøring, gjeld til tilbakekjøp (eller utbytte), antall aksjer, ny r<sub>E</sub> via r<sub>U</sub>, hvem som er bedre stilt. Så «Now assume corporate taxes of τ and that the new debt is permanent»: PV(TS) = τD, kurs ved kunngjøring, aksjer kjøpt tilbake til ny kurs. H2024 E3 og H2025 E3, L3 s16 til s18 |
| E4 | 20 | Tvilling og CAPM (A1 90 %), WACC og APV med konstant D/V (B1 80 %) | Prosjekt (ikke firma) over flere år med annuitet eller voksende evigrente (75 %), FCF med ΔNWC i del a (B5 30 %), r<sub>U</sub> fra en tvilling med gjeldsbeta fra CAPM, r<sub>wacc</sub>, NPV, gjeldskapasitet, APV med PV(TS) diskontert med r<sub>U</sub>, samme svar, hale om r<sub>wacc</sub> mot r<sub>U</sub>. H2024 E5, H2025 E4, opptak 08, 1:19:30 |
| E5 | 20 | Realopsjon: investere nå eller vente (C6 50 %) med ρ fra et omsatt verdipapir (C10 30 %) | Ingen sannsynligheter oppgitt: ρ fra prisen på et omsatt verdipapir som avhenger av samme tilstand. NPV nå, NPV ved å vente (den dårlige tilstanden mot 0), beslutning, X som gir indifferens, hale «what if σ is very low?» (opptak 14, 46:34). Si tydelig om kontantstrømmen starter nå. H2024 E6, opptak 14, 1:05:41 til 1:16:09. **Magnus fikk 10,5 av 20 på en venteopsjon med ρ 26. november** |
| E6 | 20 | Dealsannsynlighet (D1 45 %) med rente for brøkdel av år (B6 40 %) | Aksjebud, kurser før ryktene og nå, T = 0,25 år, long-short-posisjonen, verdier ved suksess og fiasko, sikkerhetsekvivalenten (1 + r<sub>f</sub>)<sup>T</sup>, implisitt p, hvem betaler for mye, motiv utenom synergier som hale. H2025 E6, L12 s20 til s23, opptak 16, 54:58 til 1:22:12 |

## Pred2: den nest mest sannsynlige

Dekker det som er sannsynlig og ikke står i pred1. Blokkmønster (20 %): kapitalstruktur,
verdsetting, kreditt, realopsjon.

| Opp. | Poeng | Tema | Form |
|---|---|---|---|
| E1 | 12 | Governance: lønn, KPI-er og kortsiktighet (20 %) | Et styre som knytter bonusen til EPS eller et annet kortsiktig mål. Hva det oppmuntrer til og hvordan det slår feil (tilbakekjøp, kutt i FoU) og en bedre utforming. Ikke samme scenario som `mk-governance-2`. Opptak 17, 35:23 og 38:23; (1:11:48) |
| E2 | 12 | Emisjon: kursfall ved SEO og bedre alternativ (A10 40 %) | Et selskap kunngjør en emisjon og kursen faller 12 %. Mulige grunner (asymmetrisk informasjon og Myers-Majluf, byråkostnader ved fri kontantstrøm) og et bedre alternativ (hakkeorden: interne midler, gjeld). Rundt fem setninger. Opptak 18, 47:12 til 48:05 |
| E3 | 18 | Gjeldsoverheng finansiert med ny egenkapital (A8 40 %, byråkostnader samlet 65 %) | Firma med gjeld i to tilstander, prosjekt med positiv NPV finansiert med ny EK, vil lederen (som eier EK) det, hvem vinner og taper (formuesoverføring), reforhandling av pålydende som får alle med. «The firm forgoes positive-NPV projects». Opptak 04, 33:41 til 49:46, opptak 18, 29:31. **Magnus fikk 10 av 20 på gjeldsoverheng 26. november** |
| E4 | 18 | WACC og APV over to år med gjeldsjustering (B1 80 %) | H2025 E4-formen: 9 × 2 poeng, kjede der hvert ledd bygger på det forrige, r<sub>U</sub> fra tvilling, konstant D/V, V<sup>L</sup> hvert år, gjeld, PV(TS) med r<sub>U</sub>, samme svar med begge metoder, tolkning |
| E5 | 20 | Risikabel obligasjon og CDS (C5 40 %) | Løpetid 1,5 år eller 2 år, pris på risikofri og risikabel obligasjon, lovet mot forventet avkastning, ρ som risikonøytral misligholdssannsynlighet, CDS-pris, antall kontrakter, hale om hvorfor ρ er høyere enn den reelle, eller gjeld som PV(F) minus en put. V2024 P3, opptak 13, 17:42 til 32:24 |
| E6 | 20 | Realopsjon: trinnvis finansiering (C8, aldri brukt, «ny form» i rotasjonen) | Et prosjekt i to trinn (en test eller pilot først, så full investering bare hvis testen går bra). Verdi uten opsjonen, verdi med trinn, verdien av fleksibiliteten, gå ut sammenlignet med 0, hale om sunk cost eller volatilitet. L11 s10 til s12, opptak 14, 56:52 til 1:04:09 |

## Pred3 og videre: ny runde på det som gikk galt

Når Magnus sier at han er ferdig med prediksjon N (eller resultatet står i databasen), lages
neste sett med nummeret etter det høyeste som finnes.

1. **Hent resultatet.** Fremdriften ligger i Supabase-prosjektet (`public.progress`,
   `subject_id = 'fie402'`, `state->'exams'`). Per oppgave: `"predN-e<n>"` med `rett.<etikett>`
   (poeng per del = `tp + cp`, maks = delens `points`; `cp: null` betyr at teksten ikke er
   rettet) og `score`. Usikre deler: `"predN-u<n>-<etikett>"`. Innlevert: `"predN-run"`.
   ```sql
   select key, value from public.progress p, jsonb_each(p.state->'exams')
   where p.subject_id = 'fie402' and key like 'predN-%';
   ```
2. **Finn det han bommet på.** List delene med tapte poeng (og usikre), med oppgavetype og
   hvilket konstruksjonsledd som gikk galt. Les svaret hans (`rett.<etikett>.svar` og
   `første`) for å skille slurv fra misforståelse.
3. **Lag én oppgave som ligner** den typen der han tapte mest: samme oppgavetype og samme
   konstruksjonsledd, ny historie, nye tall og gjerne en annen rekkefølge på leddene. Ikke en
   kopi med nye tall. Tapte han mye på flere typer, kan to av de fire regneoppgavene være nye
   runder. Merket sier «Ny runde: … fra prediksjon N».
4. **Fyll resten med de mest sannsynlige temaene** som ikke er gått i de siste settene, etter
   sannsynlighetene i prediksjonen § 1 og § 2. Governance er alltid med (90 %), med en ny
   vinkel. Hver av de fire blokkene skal ha minst én oppgave eller deloppgave (90 %).
5. **Før loggen** i `fag/fie402/_pred/logg.md`: settet, temaene, hva som er ny runde og hvorfor.

## Data

Skribenten eier bare `fag/fie402/_pred/predN_regn.py`, `predN.json` og `predN_svar.json`.

- `predN_regn.py` regner alle tall med full presisjon og skriver de to filene. Kjør med
  `python3 -I`, med `assert` på alle sjekker (WACC = APV, summer som skal gå opp, ρ mellom 0 og 1).
- `predN.json`: hele settet (`id`, `kind: "mock"`, `fane: "pred"`, `nr`, `label`, `minutes: 180`,
  `points: 100`, `format`, `note`, `facts`, `exercises`). Oppgavene som i deleksamenene:
  `n`, `title`, `points`, `topic`, `chapters`, `body`, `merke`, `parts` med `label`, `points`,
  `body`, `solution`, `criteria`. Teorioppgaver uten `parts` har `solution` og `criteria` på
  oppgaven.
- `predN_svar.json`: svar-data etter `docs/fie402-svar-spek.md`, nøkler `"predN:<n>:<etikett>"`
  (teorioppgave uten deler: `"predN:<n>:"`).

Ikke rør `sett.js`, `svar.js`, `_svar/` eller andre filer.

## Kontroll før levering

1. `python3 -I fag/fie402/_pred/predN_regn.py` uten feil.
2. `python3 tools/flett-pred.py fie402 --sett predN` viser ingen `FEIL`.
3. Hvert tall i svar-dataene står i løsningsteksten, eller er merket `regnet: true` med `merknad`.
4. `grep -rn` etter firmanavnene og hovedtallene dine i `fag/fie402/` (også `_prove`, `_mk`,
   `_del`, `_ov`, `sett.js`) gir ingen treff utenfor dine filer.

## Kontroll etterpå

Hvert sett løses blindt av en uavhengig kontrollør fra `python3 tools/flett-pred.py fie402
--blind <mappe>`. Kontrolløren regner alt på nytt, sammenligner med løsningen og vurderer om
hvert ledd har ett forsvarlig svar, om feltnavn og `topic` røper svaret og om eksamenen ligner
Kurbatov. Funnene rettes. Så `--skriv`, `python3 tools/bygg-svar.py fie402`,
`node tools/sjekk-sett.js`, `node tools/sjekk-svar.js fie402 predN`, `node tools/sjekk-prove.js
fie402`. Til slutt bumpes byggnummeret.
