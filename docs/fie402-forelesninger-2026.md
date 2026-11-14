# FIE402: endringer etter forelesningene 2026

Skrevet 14. november 2026. Alt FIE402-stoff ble skrevet fra gamle eksamener, sensorveiledninger og
syllabus, uten forelesningene. Kurbatovs forelesninger, tavlenotater, practice/tutorial sessions og
problem sets for 2026 kom da. Tre kontrollører sammenlignet dem med appen. Dette dokumentet er
beslutningene: hva som skal rettes og hva som skal legges inn. **Kurbatov lager eksamen, så der han
og appen er uenige, følger appen Kurbatov.**

Kildene ligger i `/Users/magnusfjeld/Documents/Magnus Fjeld/NHH/7. Semester/FIE402 Corporate Finance/FIE402 Claude/Filer FIE402 Claude/`
(forkortet KILDE): `lecture_1.pdf` til `lecture_14.pdf` (tekstlag), `lecture N board.pdf`,
`Practice session 1–3 board.pdf`, `tutorial session 1 board.pdf`, `s2.pdf` og `s3.pdf`
(tavlegjennomgang av PS2 og PS3) er håndskrevne skanninger uten tekstlag: render med
`python3 -I` og `import fitz` og les som bilder. `Problem Set 1–3.docx` og `… solution.docx`.
Rendrede tavlesider finnes allerede i scratchpad:
`/private/tmp/claude-501/-Users-magnusfjeld-Documents-Magnus-Fjeld-NHH/d8fcb6a6-9b2c-4346-b9e5-66d957577c1e/scratchpad/forel15/`, `forel610/` og `forel1114/`.

**Regel for alle som skriver:** sjekk hvert tall og hver formel mot kilden før du skriver det inn, og
regn alle tall på nytt i Python. Tallene under kommer fra kontrollørene og er ikke garantert riktige.
Står kilden og dette dokumentet i strid, følg kilden og si fra.

## A. Rettelser (appen motsier Kurbatov)

A1. **Forhåndsbestemt (fast) gjeld: r_U med D(1−τ)-vekter.** `lecture_8.pdf` lysbilde 18:
«in this case the firm's pre-tax WACC no longer coincides with r_U. Instead,
r_U = [D(1−τ)/(D(1−τ)+E)]·r_D + [E/(D(1−τ)+E)]·r_E» (BDM s. 708, eks. 18.12). Standarden er
fortsatt uskattede vekter (formelarket, konstant D/V). Ved fast permanent gjeld (eller fast plan)
gjelder D(1−τ)-vektene, og samme for beta. Dette er samme sammenheng som k7 sin
r_E = r_U + (D/E)(1−τ)(r_U − r_D). Rett «never»/«every time» i manualen k4, kj1, k29,
`docs/fie402-forfatterspek.md` §4 og hjernenotatet.

A2. **WACC-metoden virker ved fast permanent gjeld.** PS2 E9, gjennomgått på
`Practice session 2 board.pdf` s. 11–12 (løsningen viser til BDM 18.21, s. 707–708): evig,
ikke-voksende FCF med permanent gjeld verdsettes med APV (V^L = V^U + τD) og kontrolleres med
r_wacc = r_U(1 − τ·D/V^L), løst sammen med V^L = FCF/r_wacc (svar V^L = 21.18, r_wacc = 9.44 %).
Uten vekst er D/V konstant. Rett kj4 (`_kjerne/kj4.js` «no single r_wacc: use APV alone») og
tabellen i k18 («Fixed permanent amount … No, D/V drifts»): med vekst driver D/V, uten vekst ikke.
Legg formelen inn i k18, kj4 og som rad bakerst i k29.

A3. **Reelle sannsynligheter og r_f.** Appen sier «never pair a real probability with r_f»
(manualen §22.5, §25.2 «Never mix them», kj9 og «Must know»). Kurbatov gjør det når risikoen ikke
er systematisk (`lecture_11.pdf` s. 5 og tavle s. 1; s. 16 «50 % chance is known»; PS3 E8
«uncorrelated with the market so that you can discount at the risk free rate»; `lecture_12.pdf`
s. 21). Riktig regel: reelle sannsynligheter diskonteres med kapitalkostnaden, og den er r_f når
risikoen er ikke-systematisk (β = 0). Feilen er reelle sannsynligheter med r_f når risikoen er
priset. Appens §26.6 sier allerede dette.

A4. **k24 diskonterer kontinuerlig, Kurbatov diskret.** k24.2–24.3 bruker K·e^(−r_f T) og
y = ln(K/D)/T. Kurbatov bruker PV(K) = K/(1+r_f)^T (`lecture_9.pdf` lysbilde 19 og 21) og
y = (K/D)^(1/T) − 1, også for brøkdeler av år: (128/107.464)^(12/18) − 1 = 12.37 %
(`lecture_10.pdf` lysbilde 15). Skriv om til diskret som hovedform, kontinuerlig som fotnote.
Resten av appen er diskret allerede.

A5. **Gevinster ved oppkjøp.** Appen (manualen §26, kj10): «Targets gain a 20 % to 40 % premium,
acquirers about nothing». Kurbatov (`lecture_12.pdf` s. 12): målselskapet ca. 15 % unormal avkastning
ved kunngjøring, kjøperen ca. 1 % i snitt og negativ i om lag halvparten, samlet 1–3 % og stort sett
positiv; oppkjøp skaper som regel verdi og den går mest til målselskapets aksjonærer. Bruk hans tall
(premien på 20–40 % kan stå som premie over kurs, men skill det fra unormal avkastning).

A6. **Black-Scholes: OMGJORT 14.11 etter opptaket av wrap-up.** Kurbatov sa i timen, gjentatt mange
ganger: «Black-Scholes calculation will not be in the exam. Intuition can be there» (hva skjer med
opsjonsprisen når volatiliteten øker osv.), og «you don't need to explain what N(d1) is». Manualens k23
(«almost certainly not be asked to compute a Black-Scholes price by hand») hadde altså rett: skjerp den
til «will not be asked» med Kurbatovs ord som kilde. Ingen nye regnesteg med Black-Scholes, heller ikke
på realopsjoner. At han regnet BS i forelesning 9 og 11 og i PS3 er illustrasjon. Legg til: ingen
amerikanske opsjoner å regne, men mulig intuisjonsspørsmål om hva som skjer med prisen hvis opsjonen var
amerikansk (call på aksje uten utbytte: samme verdi; put: verdt mer).

A7. **Governance er generell, ikke norsk.** kj11 bruker norsk aksjelov i to av tre sjekker og i
minicasen og kaller amerikansk logikk en feil. Kurbatov bruker amerikansk ramme (staggered board
«much harder to replace incumbent members», `lecture_13.pdf` s. 5; SOX, Dodd-Frank, ISS, Microsoft).
Eksamensoppgavene (H2024 E2, H2025 E2) nevner ingen jurisdiksjon. Svar generelt som standard, og
trekk inn norsk rett bare når oppgaven sier ASA eller Norge.

A8. **Konkurskostnader.** k8 §8.1 og kj3: «3–4 %» uten forbehold. Kurbatov (`lecture_4.pdf` s. 8):
3–4 % for store og 20–25 % for små selskaper, ganget med årlig konkurssannsynlighet på 0.8–0.9 %;
forventede direkte kostnader er små og forklarer ikke at selskaper har lite gjeld.

A9. **Hjelpemidler.** Begge Kurbatov-eksamenene tillater kalkulator og én tospråklig ordbok
(forsiden av 2024.pdf og 2025.pdf). kj0 sier bare kalkulator. Rett kj0. (`lecture_1.pdf` s. 3 sier
«only calculator allowed», men eksamensforsidene gjelder.)

A10. **Klienteller.** k16 §16.3 mangler raden for selskaper: personlige investorer foretrekker
tilbakekjøp, selskaper foretrekker utbytte, institusjoner er likegyldige (`lecture_5.pdf` s. 18).

A11. **Emisjonskostnad.** k14: spreaden alene ca. 7 %. Kurbatov (`lecture_6.pdf` lysbilde 13):
5.3 % honorar til banken pluss 1.7 % andre kostnader. Juster.

A12. **kj0 om temaer «absent from both Kurbatov papers»** (asymmetrisk informasjon): Kurbatov har
selv asymmetrisk informasjon og hakkeordenen, underprising og emisjonsreaksjon, verdipapirer som
opsjoner og coinsurance med i oppsummeringen i `lecture_14.pdf` (s. 13, 15, 21, 23). Si det.

A13. **Notasjon.** Legg Kurbatovs synonymer inn i k29 (bakerst) eller symbolene: r_A for r_U,
IP for rentebetaling, τ uten c, D_FV for pålydende (appen K), N og X for Δ og B i
replikasjonen (C0 = N·S0 + X), p eller ρ for risikonøytral misligholdssannsynlighet i CDS
(appen q), PV(DC), PV(IB), PV(IC) og «Augmented Static Tradeoff Theory», NOPAT og WCR.
Fotnote i k3: `lecture_1.pdf` s. 24 skriver β = Corr/Var, som er en trykkfeil (riktig Cov/Var).

## B. Tillegg i manual og kjernepensum

B1. **Konstant rentedekning.** IP_t = k·FCF_t gir PV(TS) = τ·k·V^U og V^L = (1 + τk)V^U
(`lecture_8.pdf` lysbilde 17; PS2 E5; `lecture_14.pdf` s. 17 «make sure you understand everything
in this presentation»). Ikke forveksle med k18 sin D_t = k·FCF_{t+1}; bruk ulike symboler eller si
det tydelig. Inn i k18, kj4 og k29.

B2. **Debt capacity og finansiering av prosjektet.** D_t = d·V_t^L heter «debt capacity»
(`lecture_7.pdf` lysbilde 21–22, PS2 E3(c)). Hans eksempel: prosjektet krever 30.625 i gjeld,
dekket av 20 i kontanter og 10.625 i ny gjeld, 2.625 utbetales, og egenkapitalen tjener 33.25 = NPV.
Inn i k17/k18 og kj4.

B3. **Netto gjeld i vektene.** «We use net debt» (`lecture_7.pdf` lysbilde 19: D = 320 − 20 = 300);
PS2 E7 (`s2.pdf` s. 3) trekker bare fra overskuddskassen: D = 400 − (150 − 50) = 300, β_U = 1.
Inn i k4, k17, kj1 og kj4.

B4. **Senior og junior gjeld som opsjoner, rente fra noterte calls.** D_S = V − C(K_S),
E = C(K_S + K_J), D_J = C(K_S) − C(K_S + K_J). Google-eksemplet (`lecture_10.pdf` lysbilde 13–15,
tavle s. 5–6; PS3 E6 på `s3.pdf` s. 2): egenkapital = N × callpris med strike = pålydende per aksje,
callpris = midtpunkt av bid og ask, D = V − E, rente (FV/D)^(1/T) − 1. PS3 E7: K = 250·1.1^5.
Inn i k24 og kj8.

B5. **Utbytte finansiert med nye aksjer** (MM-irrelevans). `lecture_5.pdf` s. 9–12, tavle s. 4:
1M evig, r = 10 %, 1.5M utbytte neste år finansiert med 500K nye aksjer: P1 = 95, P0 = (95 + 15)/1.1
= 100. PS1 E12 (Nilpoj) og E13c. Inn i k15 og kj2.

B6. **Gjeldsoverheng når prosjektet finansieres med ny egenkapital (andel x).** `lecture_4.pdf`
s. 11, PS1 E6 (`Practice session 1 board.pdf` s. 8–10): x = 24/40 = 60 %, eieren får 0.4·40 = 16 <
25 og avslår; etter reforhandling til pålydende 80 blir x = 48 % og eieren får 26 > 25; gjelden
+5, egenkapitalen +1, sum 6 = NPV. Likt med at eierne betaler selv fordi (1 − x)E1 = E1 − I.
Inn i k10 og kj5.

B7. **Spin-off som flytter gjelden over på kreditorene.** PS1 E8 (Hillton, `Practice session 1
board.pdf` s. 11, `PS1-E8.xls`): all gjeld på Nicole gir D = 70, E = 110 mot 100; kreditorene taper
30, synergitapet 20. Marriott 1993 m.fl. (`lecture_4.pdf` s. 18). Covenants gjør gjelden billigere på
forhånd og er bra for eierne («necessary evil»). Inn i k9 (henvisning fra k13) og kj5.

B8. **Skatteskjold på rentelån (bare renter, hovedstol ved forfall).** `lecture_3.pdf` s. 11–12,
tavle s. 3: 100M i 10 år, τ = 35 %, r_f = 5 %: PV(TS) = 0.35·5·A(10; 5 %) = 13.51? (regn selv;
kontrolløren oppga 35 × annuitetsfaktor = 270.26 for et annet beløp; sjekk kilden). Hovedstolen er
ikke med. Inn i k7.

B9. **EPS-feilslutningen ved rekapitalisering.** `lecture_2.pdf` s. 24: EPS 1 → 1.1, break-even
EBIT: EBIT/10 = (EBIT − 1.2)/8 gir EBIT = 6. Tutorial E1 Yerba (`tutorial session 1 board.pdf`
s. 2–3): EPS 1.50 → 1.80, P/E 14 → 11.67. Inn i k6 (og kj2 kort).

B10. **IPO.** Kurbatovs fire teorier for underprising: investment bank conflicts, control
(underprising former eierbasen og reduserer innblanding), behavioral, asymmetric information
(`lecture_6.pdf` lysbilde 21). Svak avkastning etter IPO (lysbilde 30): optimistene kjøper,
pessimistene kan ikke shorte ennå, så prisen ligger over fundamental verdi og faller når shortsalg
starter. Inn i k14 og kj6. Kan: kapital før notering (angel, VC, PE, strategiske), secondary IPO,
fordeler og ulemper ved notering (lysbilde 2–7, 12–13), dual-class (lysbilde 38, Ford 4 %/40 %),
Kurbatovs vei til IPO-kostnaden (PS2 E2, `s2.pdf` s. 1: fair pris = (V_post − nettoproveny)/N_gamle
= 65.70, kostnad (65.70 − 50)·10 mill. = 157).

B11. **Governance.** Aksjonærer eller interessenter: Friedman 1970, «too many missions, conflicting
interests», CSR (`lecture_1.pdf` s. 28–32, `lecture_13.pdf` s. 2) og Stanford-undersøkelsen
(`Lecture 1 - Stanford Survey.pdf`: 89 % sier interessentene er viktige, 23 % sier aksjonærene er
klart viktigst, ansatte regnes som viktigst). Rådgivere for stemmegivning, ISS og Glass Lewis
(`lecture_13.pdf` s. 9: mange følger dem blindt, «is that optimal?»). Avveiningen ved overvåking:
«a manager who is monitored too strongly will be too passive» (s. 15), «freedom for the manager or
tight control?» (s. 18). Ansatte og myndigheter som overvåkere (s. 4; `lecture_14.pdf` s. 24).
Styresammensetning i kj11: innsidere, grå, uavhengige, captive board, CEO som styreleder,
styrestørrelse, travle styremedlemmer (s. 5; §27.2 har det). Lesestoff som illustrasjon (Broadridge,
Microsoft 2023, ISS): «just vote no» vinner sjelden, privatinvestorer stemmer lite, institusjoner
delegerer til rådgivere. Kan: SOX/Dodd-Frank-detaljer (s. 17), «shareholders or stakeholders?».
Inn i k27 og kj11.

B12. **M&A.** Kurbatovs motivliste (`lecture_12.pdf` s. 4): stordrift og breddefordeler,
optimalisering av verdikjeden, komplementære varer (synergier), konsolidering og markedsmakt,
endret kontroll, EPS-manipulasjon, lederambisjoner. Fusjonstyper (s. 2): horisontal, vertikal,
konglomerat, omvendt. Sannsynlighet for avtalen når T ≠ 1 år (s. 21, Vodafone/Mannesmann:
234 = [p·269.941 + (1−p)·190.261]/1.055^0.25, p = 0.5885); appen bruker overalt ett år.
Fusjonsarbitrasje som forsikring (s. 22–23, Mitchell og Pulvino 2001). Kan: fiendtlige oppkjøp,
fordeler og ulemper (s. 11), forsvarstiltak med kvalifisert flertall og regulatoriske hindre (s. 29),
budgivning etter alternativer (s. 26: reservasjonspris = verdi hvis du vinner minus verdi hvis en
rival vinner), kontantoppgjør NPV_A = S − (P − T), NPV_T = P − T (s. 15), «questions to consider»
(s. 5). Inn i k26 og kj10.

B13. **Realopsjoner.** Trinnvis finansiering (`lecture_11.pdf` s. 10–12, tavle s. 3): alt på én gang
−100 + 0.1·800 = −20, trinnvis 0.1·700 + 0.4·(−100) + 0.5·(−10) = 25; mer informative trinn gir mer
verdi. Månedsrente (s. 16): (1.07)^(1/12) − 1 = 0.565 %, månedlig evigrente og 24 måneders annuitet.
Kan: at tapt kontantstrøm under venting virker som utbytte (s. 9, kvalitativt; ikke BS-regning, A6), likegyldighet i sannsynlighet (PS3 E9(c), tavle).
Inn i k25 og kj9.

B14. **Kan, øvrige** (kort, mest verbalt): kontantstrømprinsippene, loven om én pris,
markedseffisiens i tre former, CAPM i praksis (`lecture_1.pdf`) i k1–k3; utvanningsfeilslutningen og
at gjeld forsterker avkastningen (`lecture_2.pdf` s. 21, 26) i k6; nominell mot effektiv skattesats
og fremførbart underskudd, PV(DC) avhenger av markedsrisiko, Chapter 7 mot 11 (`lecture_3.pdf`
s. 22, `lecture_4.pdf` s. 4 og 14) i k7/k8; gjeld lar ledelsen eie mer, fordeler ved finansiell
krise (`lecture_4.pdf` s. 22–23) i k11; event studies (`lecture_4.pdf` s. 27) i k13; dividend yield,
payout ratio, salg av puts som tilbakekjøp, 37.84 % utbytteskatt i Norge, fordeler og ulemper ved å
holde kontanter, kritikken av tilbakekjøp fra Warren og Lazonick (`lecture_5.pdf`) i k15/k16;
kilder til positiv NPV, Porters fem krefter, bransjens livssyklus (`lecture_7.pdf` s. 3–11);
flere tvillinger og vekting (`lecture_8.pdf` s. 12, `lecture 7 board.pdf` s. 1); put-call-paritet
som MM, P(K) som retten til å misligholde (`lecture_10.pdf` s. 7, 11–12); CDS λ = K × LGD i kj8;
«MM applies to all financing decisions» og «gambling for resurrection» (`lecture_14.pdf` s. 8, 12);
timing av tilbakekjøp med regneeksempel (`lecture_5.pdf` s. 24, PS1 E10).

## C. Sjangertrening (nye steg og ny stige)

Følg `docs/fie402-sjanger-spek.md`. Behold eksisterende steg-id-er (lagringsnøkler); nye steg får nye
id-er. Hvert galt alternativ bygges fra én navngitt feil, og mønstrene spesifikasjonen advarer mot
skal unngås.

- **01 tvilling:** netto gjeld i vektene (B3), og flere tvillinger (B14, kan).
- **02 mm:** utbytte med nye aksjer (B5), EPS-feilslutning (B9), kan: Gladstone (tutorial E5,
  `tutorial session 1 board.pdf` s. 4–7: V^U = 109.52, D = 78.87, E = 20.24, PV(konkurs) = 10.41,
  kurs 10.95 → 9.91, n = 7.96M, YTM 26.79 % mot forventet 5 %), gründereksemplet (`lecture_2.pdf`
  s. 3–11, andelen er verdt 0.75 = NPV), kapitalkrav i bank (`lecture_2.pdf` s. 25).
- **03 wacc-apv:** debt capacity og finansieringen (B2), rentedekning (B1), permanent gjeld med APV
  og WACC (A2, gjerne også unlevering med D(1−τ)-vekter, A1), FTE (PS2 E6(h): FCFE = (2000 − 250)·0.6
  + 150 = 1200, E = 1200/(15 % − 3 %) = 10 000), skatteskjold som annuitet (B8).
- **04 realopsjon:** trinnvis finansiering, månedsrente (B13), nedleggelsesopsjon med uendelig negativ strøm mot exit etter to år, sammenlignet med 0 (del D), likegyldighet i p (PS3 E9(c)). Ikke BS på realopsjon (A6).
- **05 ma:** sannsynlighet for avtalen med T ≠ 1 (B12), kan: kontantoppgjør, budgivning.
- **06 agent:** gjeldsoverheng med x (B6), spin-off (B7), kan: gambling for resurrection
  (`lecture 4 board.pdf` s. 3: gjelden taper 250K, egenkapitalen tjener 150K, tapet 100K).
- **07 opsjoner:** ingen BS-regning (A6). Kan: intuisjonssteg om BS-faktorene (σ, T, r, S, K) og om amerikansk mot europeisk; risikonøytral sannsynlighet fra egne tall (r_f 5 %, S0 100, opp 120, ned 60) og CDS priset med ρ; «pris den letteste av call og put først og bruk paritet».
- **08 kreditt:** senior og junior gjeld fra noterte calls, rente over brøkdel av år (B4), kan:
  Kurbatovs coinsurance-eksempel (`lecture_12.pdf` s. 28: gjeld 37.5 → 45, EK 37.5 → 30).
- **09 myers:** α regnet om til antall aksjer (Rothko, PS2 E1); IPO-regning: proveny, underprising
  og kostnad for gamle eiere (PS2 E2) og vinnerens forbannelse (`lecture_6.pdf` s. 24–27, tavle s. 1:
  uinformert avkastning −13.3 % ved pris 100, pris der uinformerte går i null 86.6, snitt
  førstedagsavkastning 15 %). Vurder egen stige for IPO hvis det passer bedre.
- **10 governance (ny stige):** governance og verbale M&A-motiver, flervalg om mekanismen, rundt 14
  steg: agentkonflikten og navnene på avvikene; verktøyene (overvåking, kontrakter, aksjonærhandling,
  regulering); hvem overvåker med hvilke verktøy; styret; lønn; aksjonærhandling og rådgivere for
  stemmegivning; forskansning og avveiningen ved overvåking; regulering; aksjonærer eller
  interessenter; motivlisten og hva som er synergi; fiendtlige oppkjøp og forsvarstiltak; hvem som
  vinner; kontanter eller aksjer; to steg på eksamensnivå som H2024 E2 og H2025 E2.

## D. Oppsummeringsforelesningen (opptak, 14.11.2026)

Utdrag med tidsstempler: `KILDE/Lecture 14 wrap-up eksamenssignaler fra opptaket.md`. Les den. Det som
endrer eller legger til noe i appen:

D1. **Black-Scholes regnes ikke** (se A6). Intuisjon og amerikansk mot europeisk kan komme.
D2. **Struktur:** nøyaktig som F24 og F25: to teorioppgaver («like 10 points each», sunn fornuft) og fire
regneoppgaver; regneoppgavene er rundt 80 % med 3–5 poeng intuisjon på slutten av noen; del a er lett.
Hver blokk får minst én oppgave eller deloppgave. Følgefeil gir full uttelling på neste ledd. Typisk fire
desimaler. A-grensen har historisk vært rundt 90–91. Tid tre eller fire timer: sjekk eksamensinfo.
D3. **Rente for brøkdel av år** (1.5 år: (1 + r)^1.5; halvår: kvadratrot; måned til år og omvendt) kan
komme. Inn i k2 eller k28-sjekklisten, kj0 og som steg der det passer (realopsjon har månedsrente).
D4. **Prosjekt mot firma og PV mot NPV:** les hva som spørres om. Inn i k28 og kj0.
D5. **FCF:** ΔNWC (frigjøring til slutt er innbetaling), legg tilbake avskrivning eller bruk
EBITDA(1 − τ) + τ·Dep, sunk cost, kannibalisering, prosjekt som starter i år 2 sammenlignet med et
alternativ nå. Inn i k1/k2 der det mangler, og kj0/kj4 kort.
D6. **Brannsalg og indirekte nødkostnader** skal ha vekt (eksempel: gjeld 30, eiendeler 80/15, konkurs
gir halvparten). Inn i k8 og kj3; et steg i 06 agent eller 02 mm hvis ingen stige har det.
D7. **«Who wins and who loses»:** sjekk lederen, aksjonærene og kreditorene. Allerede i appen; gjør det til
fast sjekkpunkt i kj5.
D8. **Fire måter å bruke fri kontantstrøm** (utbytte, tilbakekjøp, holde kontanter, reinvestere) med
reinvestering og imperiebygging, klebrig utbytte (GM), tilbakekjøp som signal, og «stoppe utbytte og kjøpe
tilbake». Kandidat til teorioppgave. Inn i k15/k16 og kj2; steg i governance-stigen eller mm.
D9. **SEO og kursfall på 12 %:** «what are the potential reasons» i fem setninger, med bedre alternativ.
Kandidat til teorioppgave. Inn i kj6 og som steg på eksamensnivå i governance/verbal-stigen.
D10. **Verdsettingsmetodene:** r_E til FCFE, r_U til APV, r_wacc til WACC; regn r_wacc og forklar hvorfor
den er lavere enn r_U. Ikke trekk renter fra i FCF. Inn i kj4 og et steg i 03 hvis det mangler.
D11. **Gjeld = risikofri gjeld minus solgt put**, forklart med ord, kan komme. Sjekk kj8 og 08.
D12. **Nedleggelsesopsjon** antydet som mulig eksamensoppgave: uendelig negativ strøm i dårlig tilstand
mot exit etter to år, sammenlignet med 0 og ikke med den negative verdien. Inn i k25, kj9 og et steg på
eksamensnivå i 04 realopsjon.
D13. **Mannesmann/Vodafone** er «one of the biggest exercises that you should focus on»: sannsynlighet for
avtalen, arbitrasje, risikonøytral verdsetting og synergiene markedet priser inn. Steg på eksamensnivå i
05 ma (se B12). M&A-forelesningens eksempler («minus one» og de tre til slutt) er Kurbatovs PS4.
D14. **Governance:** KPI-er og mål gjør lederen kortsiktig (tilbakekjøp for å nå EPS-mål). Inn i k27/kj11
og governance-stigen.
