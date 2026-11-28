# Logg over prediksjonseksamenene

Spesifikasjon: `docs/fie402-prediksjon-spek.md`. Ett avsnitt per sett: temaene, hva som er ny
runde på noe Magnus bommet på, og resultatet når settet er tatt.

## pred1 (28. november 2026)

Den mest sannsynlige eksamenen. 10 · 10 · 20 · 20 · 20 · 20.
E1 governance (eierens verktøykasse), E2 MM mot virkeligheten, E3 MM-rekapitalisering med
skatt som vri, E4 tvilling og WACC/APV på et prosjekt, E5 venteopsjon med ρ fra et omsatt
verdipapir, E6 dealsannsynlighet med T = 0,25.
Mål fra fremdriften før settet: venteopsjon med ρ 10,5 av 20 (del3-f3, 26. november).

Resultat (28. november, eksamensmodus, rettet i appen): **85 av 100** med følgefeil godkjent,
72 uten (appen har ikke kjørt «Sjekk følgefeil»). E1 6,5 · E2 9 · E3 18 · E4 18 · E5 13,5 · E6 20.
- E5 b 0 av 5: ρ med verdiene uten utbyttet ved t = 1 (80 og 48) sammen med (1 + r_f)S_0, 0,5344
  i stedet for 0,4375. c og d (talldelen) er følgefeil, e havnet innenfor toleransen uansett.
- E4 a 1,5 av 3: FCF = EBITDA(1 − τ) − ΔNWC = 17,9232 i stedet for 14,112 (avskrivning strøket
  mot investering før skatt). d og e er følgefeil (han brukte r_wacc 7,42 % og r_U 7,83 %).
- Forklaringene: E1 mangler «hvorfor det passer Kallmar» (6,5), E3 f sier «the investors» i stedet
  for aksjonærene ved kunngjøringen (0,5 av 1,5), E5 f er betinget og nevner ikke at begge
  tilstandene forblir lønnsomme (2 av 3). E6 d og e fikk fullt.
- En første retting fra databasen trodde E6 d og e sto tomme. De var bare ikke synket ennå.

## pred3 (28. november 2026)

Ny runde etter prediksjon 1. 10 · 10 · 20 · 20 · 20 · 20.
E1 governance (forsvar mot et fiendtlig bud: giftpille og forskjøvet styre, med kriterier som
belønner kobling til casen), E2 utbetaling verbalt (fire måter å bruke FCF, fast mot engangsbeløp),
E3 IPO med informerte investorer (Rock), E4 **ny runde på fri kontantstrøm** (avskrivning ≠
investering over tre år, to sammenlignbare, fast låneplan og APV med PV(TS) diskontert med r_D),
E5 **ny runde på ρ fra et omsatt verdipapir** (utvidelsesopsjon, annuitetssertifikat som betaler
fra t = 1), E6 aksjebytte og kontantbud med formlene på formelarket og hale om verdiskaping.
Fellene fra pred1 (EBITDA(1 − τ) og verdier uten betalingen ved t = 1) faller utenfor toleransen.
Blind kontroll: samme tall i alle 49 felt, 18 punkter om ordlyd, lekkasjer og lengde rettet.
1 365 ord, 44 svarfelt.

Resultat: ikke tatt ennå.

## pred2 (28. november 2026)

Den nest mest sannsynlige. 12 · 12 · 18 · 18 · 20 · 20.
E1 governance (lønn og KPI-er), E2 kursfall ved SEO, E3 gjeldsoverheng, E4 WACC og APV over to
år, E5 CDS, E6 trinnvis realopsjon.
Mål fra fremdriften før settet: gjeldsoverheng 10 av 20 (mk-gjeldsoverheng-1, 26. november).

Resultat: ikke tatt ennå.
