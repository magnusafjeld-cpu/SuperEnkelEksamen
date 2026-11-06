"""fl-kvadsheim: Kvadsheim, «Hvordan bør vi spare og låne?» (gjesteforelesning 2026).

Kilde: tekst2/NYE FORELESNINGER __ Kvadsheim gjesteforelesning .pptx.txt (lysbildene som er
bilder, er lest via sjekklistens «mer»). Alle tall regnes her.
"""
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from felles import *

S = Sett("fl-kvadsheim")

# ======================================================================= 1
a = S.ledd("", "<p>Hvilken påstand stemmer med det Kvadsheim viser om gjeld og spareprodukter i Norge?</p>",
           "Høy gjeld i forhold til inntekten kombinert med mye flytende rente gjør norske lånekunder ekstra sårbare for renteøkninger",
           ["Etter boliggjelden er forbruksgjelden den største gjeldsposten, større enn både studiegjelden og billånene til sammen",
            "Forbrukslånene ble strammet gradvis inn gjennom hele perioden 2007 til 2017, mens det etter 2019 ikke har kommet nye tiltak",
            "Poenget med sakene om bankenes garanterte spareprodukter er at kapitalgarantien er verdt prisen for en langsiktig sparer"],
           begrep("Lysbilde 6 plasserer Norge i hjørnet «more vulnerable»: svært høy gjeld i forhold til disponibel inntekt "
                  "og en svært høy andel boliglån med flytende rente. Det er kombinasjonen som gjør lånekundene sårbare.",
                  "Høy gjeld kombinert med flytende rente er riktig.",
                  [("Forbruksgjelden størst etter boliggjelden", "feil rekkefølge. Lysbilde 5: boliggjeld 4 000 mrd., studiegjeld "
                    "300 mrd., billån 200 mrd. og forbruksgjeld 176 mrd. Forbruksgjelden er liten i kroner, men dyr i rente."),
                   ("Gradvis innstramming 2007 til 2017", "snur tidslinjen. «Ti år med ingenting, to år med tiltak»: 2007 til 2017 "
                    "var «vill vest», så kom retningslinjer i 2017 og forbrukslånsforskriften og Gjeldsregisteret i 2019."),
                   ("Garantien er verdt prisen", "motsatt av poenget. Overskriftene «meningsløst høyt» og «uanstendig grådig» "
                    "handler om at kundene betaler mer for garantien enn den er verdt.")],
                  kilde="Kvadsheim lb 5–7 og lb 15–17"),
           dekker=["kvadsheim-gjeld-02", "kvadsheim-gjeld-01", "kvadsheim-gjeld-03", "kvadsheim-sparing-09"])
S.oppgave("Gjeld og spareprodukter", "Lån", [16, 14], "", [a])

# ======================================================================= 2
inntekt2, studie2, inkasso2, ek2 = 760_000, 170_000, 1_446_321, 450_000
maks_gjeld2 = 5 * inntekt2
g2_minus_gjeld = maks_gjeld2 - studie2 - inkasso2
g2_ek = ek2 / 0.10 - ek2
assert g2_minus_gjeld == 2_183_679 and lik(g2_ek, 4_050_000)
print(f"Oppgave 2: 5x = {maks_gjeld2}, minus gjeld = {g2_minus_gjeld}, EK-grense lån = {g2_ek:.0f}")
a = S.ledd("", "<p>Per (39) tjener 760 000 kr i året og leier bolig. Han har 170 000 kr i studielån. Gammel kredittkort-, "
               "billån- og forbruksgjeld har gått til inkasso og står nå på 1 446 321 kr. Kravene har gitt ham "
               "betalingsanmerkninger. Per har 450 000 kr i egenkapital etter et arveoppgjør. Banken krever minst 10 % "
               "egenkapital og at samlet gjeld ikke blir høyere enn fem ganger inntekten.</p>"
               "<p>Hvor mye kan Per regne med å få i boliglån?</p>",
           "Ingenting: betalingsanmerkningene stopper søknaden",
           [(f"Kr {kr(g2_minus_gjeld)}: fem ganger inntekten minus gjelden han har fra før", [kr(g2_minus_gjeld)]),
            (f"Kr {kr(maks_gjeld2)}: fem ganger inntekten, siden egenkapitalen holder", [kr(maks_gjeld2)]),
            (f"Kr {kr(g2_ek)}: lånet egenkapitalen hans gir rom for med 10 % egenkapital", [kr(g2_ek), "10 %"])],
           sol("Bankene sjekker tre ting (lysbilde 13): sikkerhet (10 % egenkapital), betalingsevne (samlet gjeld høyst fem "
               "ganger inntekten) og betalingsvilje (ingen betalingsanmerkninger). Oppgaven oppgir bare de to første. Den "
               "tredje må du kunne. Den stopper Per.",
               [f"Betalingsevne alene: 5 × 760 000 = {kr(maks_gjeld2)} i samlet gjeld. Minus 170 000 og 1 446 321 gir "
                f"{kr(g2_minus_gjeld)}.",
                f"Sikkerhet alene: 450 000 kr er 10 % av en kjøpesum på 4 500 000, altså {kr(g2_ek)} i lån.",
                "Betalingsvilje: betalingsanmerkningene viser at han ikke har betalt. Søknaden avslås: <b>ingen lån</b>."],
               [(f"Kr {kr(g2_minus_gjeld)}", "riktig grense for betalingsevne, men betalingsviljen er glemt."),
                (f"Kr {kr(maks_gjeld2)}", "glemmer både gjelden han har og betalingsviljen."),
                (f"Kr {kr(g2_ek)}", "ser bare på sikkerheten. Det bryter også grensen på fem ganger inntekten.")],
               "Inkassocaset (lysbilde 8–12) har nettopp dette poenget: høy inntekt beskytter ikke mot gjeldsproblemer. Rådet "
               "er å skaffe oversikt (Inkassoregisteret, Gjeldsregisteret), snakke med banken og lage en nedbetalingsplan.",
               kilde="Kvadsheim lb 8–13"),
           dekker=["kvadsheim-gjeld-04", "kvadsheim-gjeld-05"])
S.oppgave("Per og lånesøknaden", "Lån", [16], "", [a])

# ======================================================================= 3
bolig3, laan3, ft3, otp3, aksjeandel_otp3, fond3 = 5_000_000, 3_200_000, 1_800_000, 600_000, 0.70, 300_000
netto3 = bolig3 - laan3
aksjer3 = aksjeandel_otp3 * otp3 + fond3
renter3 = ft3 + (1 - aksjeandel_otp3) * otp3
tot3 = netto3 + ft3 + otp3 + fond3
assert lik(aksjer3 + renter3 + netto3, tot3)
andel3 = aksjer3 / tot3
g3_uten_ft = aksjer3 / (tot3 - ft3)
g3_brutto = aksjer3 / (tot3 - netto3 + bolig3)
g3_bare_fin = aksjer3 / (otp3 + fond3)
print(f"Oppgave 3: aksjer {aksjer3:.0f} av {tot3:.0f} = {andel3:.4f}; uten folketrygd {g3_uten_ft:.4f}; "
      f"brutto bolig {g3_brutto:.4f}; bare OTP og fond {g3_bare_fin:.4f}")
a = S.ledd("", "<p>Ola eier en bolig verdt 5 000 000 kr med 3 200 000 kr i lån. Opptjent pensjon i folketrygden er verdt "
               "1 800 000 kr. Tjenestepensjonen (OTP) er på 600 000 kr i en profil med 70 % aksjer og 30 % renter. I tillegg "
               "har han 300 000 kr i et globalt aksjefond.</p>"
               "<p>Hvor stor andel av Olas samlede formue står i aksjer, regnet slik Kvadsheim gjør? Rund av til én desimal.</p>",
           (pst(andel3, 1), [pst(andel3, 1)]),
           [(pst(g3_uten_ft, 1), [pst(g3_uten_ft, 1)]),
            (pst(g3_brutto, 1), [pst(g3_brutto, 1)]),
            (pst(g3_bare_fin, 1), [pst(g3_bare_fin, 1)])],
           sol("Kvadsheim (lysbilde 20) regner hele formuen: boligen netto etter lån, folketrygden som en sikker, rentelik "
               "plassering og OTP fordelt på aksjer og renter etter profilen.",
               [f"Aksjer: 0,70 × 600 000 + 300 000 = {kr(aksjer3)}.",
                f"Samlet formue: (5 000 000 − 3 200 000) + 1 800 000 + 600 000 + 300 000 = {kr(tot3)}.",
                f"Andel: {kr(aksjer3)}/{kr(tot3)} = <b>{pst(andel3, 1)}</b>."],
               [(pst(g3_uten_ft, 1), "folketrygden er glemt. Den er nettopp den store sikre posten."),
                (pst(g3_brutto, 1), "boligen er tatt med brutto, uten å trekke fra lånet."),
                (pst(g3_bare_fin, 1), "regner bare OTP og fondet, som om bolig og folketrygd ikke var formue.")],
               f"Renter: 1 800 000 + 180 000 = {kr(renter3)} ({pst(renter3 / tot3, 0)}), bolig {pst(netto3 / tot3, 0)}. "
               "Summen er 100 %. Poenget er det samme som på lysbildet: med folketrygden som sikker post har en vanlig "
               "nordmann lite i aksjer, så han bør ta høyere risiko i den frie sparingen.",
               kilde="Kvadsheim lb 18–20"),
           dekker=["kvadsheim-sparing-06"])
S.oppgave("Ola og formuen", "Sparing", [14], "", [a])

# ======================================================================= 4
a = S.ledd("", "<p>Thomas (37) og Maria (35) har to barn og 88 000 kr i samlet nettoinntekt i måneden. Boligen er verdt "
               "7,5 mill. kr med 3,5 mill. kr i lån. De har 250 000 kr på en vanlig bankkonto og 350 000 kr i et globalt "
               "indeksfond. De vil kjøpe større bolig om fem år og bygge opp formue til pensjon.</p>"
               "<p>Hvilket opplegg følger rådene i Kvadsheims gjesteforelesning?</p>",
           "Buffer på én til to månedslønner, rente- eller kombinasjonsfond til boligen og aksjefond til pensjonen",
           ["Flytt hele bankinnskuddet til indeksfondet, siden et globalt fond er bredt nok til å fungere som buffer og gir mest over tid",
            "Spar både til boligen og til pensjonen i det globale indeksfondet, fordi aksjer har gitt høyest avkastning over tid",
            "Spar til pensjonen i rentefond for å holde risikoen nede og bruk aksjefond til boligen, der pengene trengs først"],
           begrep("Rekkefølgen er buffer først (1–2 månedslønner på separat konto uten kort), så dyr gjeld, så fondssparing. "
                  "Sparemålet bestemmer horisonten og horisonten bestemmer fondstypen: bolig om 3–5 år gir rentefond eller "
                  "kombinasjonsfond, pensjon om 10–35 år gir aksjefond. De to målene trenger derfor ulike fond.",
                  "Buffer, rente- eller kombinasjonsfond til boligen og aksjefond til pensjonen er riktig.",
                  [("Hele bankinnskuddet i fondet", "hopper over bufferen. Den skal dekke uforutsette utgifter som vannlekkasje "
                    "og tannlege uten at man må selge fond etter et fall."),
                   ("Begge målene i indeksfondet", "fellen fra casen: samme fond for et mål om fem år og et mål om 30 år. "
                    "Med kort horisont kan et børsfall ødelegge boligkjøpet."),
                   ("Pensjon i rentefond og bolig i aksjefond", "snur koblingen mellom horisont og fondstype.")],
                  kilde="Kvadsheim lb 22–24 og lb 27–30"),
           dekker=["kvadsheim-sparing-08", "kvadsheim-sparing-03", "kvadsheim-sparing-02"])
S.oppgave("Familien Hansen", "Sparing", [14], "", [a])

# ======================================================================= 5
r5, inf5, t5 = 0.038, 0.032, 0.22
real5 = r5 * (1 - t5) - inf5
real5_eksakt = (1 + r5 * (1 - t5)) / (1 + inf5) - 1
g5_uten_skatt = r5 - inf5
g5_skatt_paa_real = (r5 - inf5) * (1 - t5)
g5_uten_inf = r5 * (1 - t5)
assert pst(real5, 1) == pst(real5_eksakt, 1) == "−0,2 %"
print(f"Oppgave 5: real {real5:.5f} (eksakt {real5_eksakt:.5f}); {g5_uten_skatt:.4f}, {g5_skatt_paa_real:.5f}, {g5_uten_inf:.5f}")
a = S.ledd("", "<p>Sofie har 200 000 kr på en sparekonto med 3,8 % rente. Inflasjonen er 3,2 % og renteinntekter skattlegges "
               "med 22 %. Hva er realrenten hennes etter skatt? Rund av til én desimal.</p>",
           (pst(real5, 1), [pst(real5, 1)]),
           [(pst(g5_uten_skatt, 1), [pst(g5_uten_skatt, 1)]),
            (pst(g5_skatt_paa_real, 1), [pst(g5_skatt_paa_real, 1)]),
            (pst(g5_uten_inf, 1), [pst(g5_uten_inf, 1)])],
           sol("Skatten tas av hele den nominelle renten. Så trekkes inflasjonen fra (lysbilde 25–26: 3,50 % − 0,77 % − 3,00 % "
               "= −0,27 %).",
               ["Skatt: 0,22 × 3,8 % = 0,836 prosentpoeng. Rente etter skatt: 2,964 %.",
                f"Realrente: 2,964 % − 3,2 % = −0,236 %, altså <b>{pst(real5, 1)}</b>."],
               [(pst(g5_uten_skatt, 1), "skatten er glemt: 3,8 − 3,2."),
                (pst(g5_skatt_paa_real, 1), "skatt bare på realrenten: 0,6 × 0,78. Skatten treffer også inflasjonsdelen."),
                (pst(g5_uten_inf, 1), "inflasjonen er glemt. Det er nominell rente etter skatt.")],
               f"Eksakt: 1,02964/1,032 − 1 = {pst(real5_eksakt, 2)}, som også rundes til {pst(real5, 1)}. Beløpet 200 000 kr er "
               "støy. Poenget: med inflasjon på nivå med renten taper man kjøpekraft på sparekonto etter skatt.",
               kilde="Kvadsheim lb 25–26"),
           dekker=["kvadsheim-sparing-01"])
S.oppgave("Sofies sparekonto", "Sparing", [2, 14], "", [a])

# ======================================================================= 6
a = S.ledd("", "<p>Hvilken påstand stemmer med tallene Kvadsheim viser om fondssparing?</p>",
           "Norske aksjefondssparere har fått lavere avkastning enn fondene, fordi de ofte kjøper etter oppgang og selger etter fall",
           ["Globale aksjer har aldri gitt negativ årlig snittavkastning over en tiårsperiode, så ti år er nok til å fjerne risikoen",
            "Den største kostnaden ved fondssparing er kjøp og salg av andeler, mens den løpende driften av fondene er gratis for sparerne",
            "Aksjefond gir både lavere formuesverdi og lavere skatt på avkastningen enn bankinnskudd, så fondet vinner på begge punkter"],
           begrep("Lysbilde 34: norsk fondsindeks ga 8,93 % i året 1994 til 2018, mens sparerne fikk 6,6 %. «Selg lavt, kjøp høyt»: "
                  "de kjøper etter oppgang og selger etter fall.",
                  "Gapet mellom fondsavkastning og investoravkastning er riktig.",
                  [("Aldri negativ over ti år", "feil. MSCI World i kroner 1970 til 2022: dårligste tiårsperiode ga −4 % i året. "
                    "Først fra 15 år og oppover er ingen periode negativ (lysbilde 33)."),
                   ("Kjøp og salg er størst", "snudd. Det er gratis å kjøpe og selge fond. Man betaler for driften: "
                    "forvaltningshonorar og plattformavgift hvert år (lysbilde 31)."),
                   ("Fond vinner på begge", "aksjefond verdsettes lavere i formuesskatten, men gevinsten skattlegges hardere "
                    "enn renteinntekter (lysbilde 56–57). Det ene veier mot det andre.")],
                  kilde="Kvadsheim lb 31, lb 33–35 og lb 56–57"),
           dekker=["kvadsheim-sparing-05", "kvadsheim-sparing-04", "kvadsheim-sparing-07", "kvadsheim-skatt-03"])
S.oppgave("Tålmodighet og kostnader", "Sparing", [14], "", [a])

# ======================================================================= 7
a = S.ledd("", "<p>Hvilken påstand om aksjesparekonto (ASK), individuell pensjonssparing (IPS) og vanlig investeringskonto er "
               "riktig?</p>",
           "Bare IPS er fritatt for formuesskatt og bare ASK gir skattefritt uttak av innskuddet før pensjonsalder",
           ["På aksjesparekontoen får du fradrag for tap hver gang du selger et fond med tap, uten at du må avslutte kontoen",
            "IPS-midlene kan tas ut før pensjonsalderen uten skatt hvis de brukes til å kjøpe egen bolig for første gang",
            "Aksjefond og rentefond har alltid hatt ulik skattesats, men forskjellen mellom dem har krympet siden 2013"],
           begrep("Tabellen på lysbilde 36: formuesskatt og skjerming gjelder ASK og investeringskonto, ikke IPS. Skattefritt "
                  "uttak av innskudd har bare ASK. Bare IPS har bindingstid.",
                  "Fritak for formuesskatt bare i IPS og skattefritt uttak av innskudd bare i ASK er riktig.",
                  [("Løpende tapsfradrag på ASK", "ulempen ved ASK er nettopp at du må avslutte kontoen for å få tapsfradrag "
                    "(lysbilde 32)."),
                   ("IPS til bolig", "IPS er bundet til pensjonsalder. Bindingstid er Kvadsheims første ulempe (lysbilde 52)."),
                   ("Alltid ulik sats", "før 2013 var satsen 28 % for begge. Siden har kapitalinntekt gått ned til 22 %, mens "
                    "effektiv sats på aksjefond har økt til 37,84 %: forskjellen har økt (lysbilde 59–60).")],
                  kilde="Kvadsheim lb 32, lb 36, lb 51–52 og lb 59–60"),
           dekker=["kvadsheim-fond-01", "kvadsheim-fond-02", "kvadsheim-fond-03", "kvadsheim-skatt-02"])
S.oppgave("ASK, IPS eller investeringskonto", "Sparing", [14, 15], "", [a])

# ======================================================================= 8
a = S.ledd("", "<p>Hvilken påstand stemmer med Kvadsheims råd om å velge og vurdere fond?</p>",
           "DP-indeksen regner bare avkastning under risikofri rente som risiko, mens Sharpe-ratioen regner alle svingninger som risiko",
           ["En norsk investor bør valutasikre globale fond, fordi sikringen fjerner én risikokilde og gir lavere svingninger målt i kroner",
            "Et globalt indeksfond er så jevnt fordelt på land og bransjer at det ikke har noen tydelig konsentrasjon i enkeltland",
            "Det beste enkeltmålet ved fondsvalg er fjorårets avkastning, siden kostnader og risiko allerede er trukket fra i den"],
           begrep("Lysbilde 44: vanlig standardavvik behandler opp- og nedsidebevegelser likt. DP-indeksen er asymmetrisk: bare "
                  "observasjoner med avkastning under risikofri rente inngår i risikomålet.",
                  "Asymmetrien i DP-indeksen er riktig.",
                  [("Valutasikre", "lysbilde 49: «Valutasikring øker risikoen!» Sikret MSCI verdensindeks svinger ca. 14,9 % mot "
                    "11,7 % usikret. Kronen svekkes ofte når børsene faller, så valutaen demper fallet i kroner."),
                   ("Jevnt fordelt", "dissekeringen (lysbilde 38) viser om lag 72,5 % USA og teknologi som største bransje, med "
                    "NVIDIA, Apple og Microsoft øverst."),
                   ("Fjorårets avkastning", "Kvadsheim vil ha fem vurderinger: avkastning over flere perioder mot risiko, "
                    "størrelse, forvalterens erfaring og kostnader (lysbilde 40). Ett års avkastning er fellen.")],
                  kilde="Kvadsheim lb 37–38, lb 40–44 og lb 48–49"),
           dekker=["kvadsheim-fond-04", "kvadsheim-fond-06", "kvadsheim-fond-08", "kvadsheim-fond-05"])
S.oppgave("Fondsvalg", "Indeksfond og aktiv forvaltning", [14], "", [a])

# ======================================================================= 9
ak9, re9, maal9, fall9 = 150_000, 50_000, 0.75, 0.20
ak9_ny = ak9 * (1 - fall9)
tot9 = ak9_ny + re9
flytt9 = maal9 * tot9 - ak9_ny
g9_opprinnelig = ak9 - ak9_ny
assert lik(flytt9, 7_500) and lik(g9_opprinnelig, 30_000)
print(f"Oppgave 9: etter fall {ak9_ny:.0f}/{re9}, total {tot9:.0f}, flytt {flytt9:.0f}; til opprinnelig {g9_opprinnelig:.0f}")
a = S.ledd("", "<p>Kari vil ha 75 % i aksjefond og 25 % i rentefond. Hun har 150 000 kr i aksjefond og 50 000 kr i rentefond. "
               "Så faller aksjefondet med 20 %, mens rentefondet står stille. Hva bør hun gjøre for å komme tilbake til "
               "fordelingen hun vil ha?</p>",
           (f"Flytte kr {kr(flytt9)} fra rentefond til aksjefond", [kr(flytt9)]),
           [(f"Flytte kr {kr(flytt9)} fra aksjefond til rentefond", [kr(flytt9)]),
            (f"Flytte kr {kr(g9_opprinnelig)} fra rentefond til aksjefond", [kr(g9_opprinnelig)]),
            "Ingenting, fordi det å handle rett etter et børsfall er å forsøke å time markedet"],
           sol("Rebalansering betyr å kjøpe det som har falt og selge det som har steget, slik at fordelingen blir den man har "
               "valgt. Målet regnes av formuen <i>etter</i> fallet.",
               [f"Aksjefondet: 150 000 × 0,80 = {kr(ak9_ny)}. Samlet: {kr(tot9)}.",
                f"Mål for aksjefondet: 0,75 × {kr(tot9)} = {kr(maal9 * tot9)}.",
                f"Flytt {kr(maal9 * tot9)} − {kr(ak9_ny)} = <b>{kr(flytt9)} kr fra rentefond til aksjefond</b>."],
               [(f"{kr(flytt9)} fra aksjefond", "riktig beløp, feil retning. Da selger hun det som har falt."),
                (f"{kr(g9_opprinnelig)}", "tar aksjefondet tilbake til det opprinnelige beløpet, som om formuen ikke hadde falt."),
                ("Ingenting", "forveksler rebalansering med markedstiming. Rebalansering følger en fast regel og krever ingen "
                 "spådom om markedet.")],
               f"Etter flyttingen: {kr(maal9 * tot9)}/{kr(tot9)} = 75 % og {kr(re9 - flytt9)}/{kr(tot9)} = 25 %. ✓ Lysbilde 50 "
               "har samme regnestykke med 80/20 og 10 % fall. Der står 2 000 kr, men det eksakte tallet er 1 600 kr. "
               "Ulempen Kvadsheim nevner, er at rebalansering krever tett oppfølging.",
               kilde="Kvadsheim lb 50"),
           dekker=["kvadsheim-fond-07"])
S.oppgave("Kari rebalanserer", "Sparing", [14], "", [a])

# ======================================================================= 10
innsk10, verdi10, lonn10 = 300_000, 400_000, 60_000
mf10, pf10, t10, opp10 = 0.46, 114_540, 0.22, 1.72
alm10 = lonn10 * (1 - mf10)
rom10 = pf10 - alm10
gev10 = rom10 / opp10
uttak10 = innsk10 + gev10
g10_uten_opp = innsk10 + rom10
g10_forholdsmessig = gev10 / ((verdi10 - innsk10) / verdi10)
g10_uten_mf = innsk10 + (pf10 - lonn10) / opp10
assert g10_uten_opp < verdi10 and lik(alm10, 32_400)
skatt_kontroll = max(0, alm10 + gev10 * opp10 - pf10) * t10
assert lik(skatt_kontroll, 0)
print(f"Oppgave 10: rom {rom10:.0f}, gevinst {gev10:.2f}, uttak {uttak10:.2f}; uten opp {g10_uten_opp:.0f}; "
      f"forholdsmessig {g10_forholdsmessig:.2f}; uten minstefradrag {g10_uten_mf:.2f}")
a = S.ledd("", "<p>Lise har aksjefond på en aksjesparekonto. Hun har satt inn 300 000 kr og kontoen er nå verdt 400 000 kr. "
               "I 2026 har hun 60 000 kr i lønn og ingen annen inntekt. Bruk minstefradrag 46 % av lønn, personfradrag "
               "114 540 kr, 22 % skatt på alminnelig inntekt og oppjusteringsfaktor 1,72 for aksjeinntekt. Se bort fra "
               "skjermingsfradrag, trygdeavgift og trinnskatt.</p>"
               "<p>Hvor mye kan hun ta ut av kontoen i 2026 uten å betale skatt? Rund av til nærmeste krone.</p>",
           (f"Kr {kr(uttak10)}", [kr(uttak10)]),
           [(f"Kr {kr(g10_uten_opp)}", [kr(g10_uten_opp)]),
            (f"Kr {kr(g10_forholdsmessig)}", [kr(g10_forholdsmessig)]),
            (f"Kr {kr(g10_uten_mf)}", [kr(g10_uten_mf)])],
           sol("Uttak fra ASK regnes først som tilbakebetaling av innskudd. Først når uttaket passerer innskuddet, realiseres "
               "gevinst. Gevinsten oppjusteres med 1,72 og skattlegges som alminnelig inntekt, så den er skattefri så lenge "
               "personfradraget ikke er brukt opp.",
               [f"Alminnelig inntekt fra lønn: 60 000 × (1 − 0,46) = {kr(alm10)}. Ledig personfradrag: 114 540 − {kr(alm10)} "
                f"= {kr(rom10)}.",
                f"Skattefri gevinst: {kr(rom10)}/1,72 = {kr(gev10)}.",
                f"Uttak: 300 000 i innskudd + {kr(gev10)} = <b>{kr(uttak10)} kr</b>."],
               [(f"Kr {kr(g10_uten_opp)}", "glemt oppjustering, som om gevinsten var vanlig kapitalinntekt med 22 %."),
                (f"Kr {kr(g10_forholdsmessig)}", "fordeler uttaket forholdsmessig mellom innskudd og gevinst (25 % gevinst), "
                 "slik et salg på vanlig fondskonto gjør. På ASK kommer innskuddet først."),
                (f"Kr {kr(g10_uten_mf)}", "glemt minstefradraget. Hele lønnen er trukket fra personfradraget.")],
               f"Alminnelig inntekt: {kr(alm10)} + {kr(gev10)} × 1,72 = {kr(alm10 + gev10 * opp10)} = personfradraget, så "
               "skatten blir 0. ✓ Lysbilde 54 bruker samme logikk: ta ut innskuddet pluss gevinsten i et lavinntektsår og sett "
               "pengene inn på en ny ASK.",
               kilde="Kvadsheim lb 53–55 og lb 58"),
           dekker=["kvadsheim-skatt-04", "kvadsheim-skatt-05", "kvadsheim-skatt-01"])
S.oppgave("Lise og aksjesparekontoen", "Sparing", [5, 14], "", [a])

S.skriv(label="Kvadsheim: hvordan bør vi spare og låne?",
        note="Gjesteforelesningen til Kvadsheim: gjeld og lånesøknader, rekkefølgen i sparingen, fond og fondsvalg, "
             "ASK, IPS og investeringskonto og skatten på sparing.",
        facts=["10 flervalg med fire alternativer: 3 poeng for rett, −1 for feil og 0 for blankt.",
               "Satser og regler står i oppgaveteksten, slik de blir oppgitt på eksamen.",
               "Sammen med de andre settene i fanen dekker settet hvert punkt i sjekklisten.",
               "Laget fra forelesningsnotatene 2026. Kurset har ikke kontrollert løsningene."],
        practiceNote="Mange av Kvadsheims lysbilder er bilder. Når et ledd spør om noe du ikke kjenner igjen, slå opp "
                     "lysbildet i kilden: tallene på ASK-uttak, rebalansering og realrente går igjen i ny drakt.")
