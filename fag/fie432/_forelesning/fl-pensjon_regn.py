"""fl-pensjon: Næss, «Sparing og pensjon» (Pensjonssparing, 2026).

Kilde: tekst2/ForelesningPensjon (7).pdf.txt, versjonen fra 30. september 2026 (nyest). AFP-lysbildene er fjernet
der, så de hentes fra (5), versjonen fra 24. september 2026. Sidetallene i kilde= er fra 30.9.-versjonen.
"""
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from felles import *

S = Sett("fl-pensjon")
G = 136_549
TAK = 7.1 * G
OPPTJ = 0.181

# ======================================================================= 1
a = S.ledd("", "<p>Hvilken påstand om pensjonssystemet er riktig?</p>",
           "Folketrygden betaler pensjon så lenge du lever, så den forsikrer mot å leve lenge og kan ikke gi alle tilbake det de betalte inn",
           ["Folketrygden er innskuddsbasert og derfor fondert: innbetalingene til hver person settes av og forrentes i et eget fond",
            "Pilar I er tjenestepensjonen fra arbeidsgiveren, pilar II er folketrygden og pilar III er den enkeltes egen pensjonssparing",
            "Forsikringen i folketrygden ville virket like godt om ordningen var frivillig, så staten blander seg bare fordi folk sparer for lite"],
           begrep("To påstander kan ikke være sanne samtidig: «du får tilbake det du betalte inn» og «du får pensjon så lenge du "
                  "lever». Folketrygden gir det siste, så pensjon er også forsikring mot risikoen ved å leve lenge.",
                  "Forsikring mot å leve lenge er riktig.",
                  [("Innskuddsbasert og derfor fondert", "blander begrepene. Folketrygden er innskuddsbasert (det du får, avhenger "
                    "av det du har tjent opp), men pay-as-you-go: dagens arbeidstakere betaler dagens pensjonister."),
                   ("Pilar I er tjenestepensjon", "rekkefølgen er snudd. Pilar I er folketrygden, pilar II arbeidsgiverens "
                    "ordninger og pilar III individuell sparing."),
                   ("Like godt frivillig", "nei. Frivillig ville bare de som venter å leve lenge bli med (ugunstig utvalg). Det er "
                    "en av de to grunnene til at stat og arbeidsgiver blander seg: pensjon er sparing <i>og</i> forsikring. Og "
                    "kanskje stoler man ikke på at folk er langsiktige.")],
                  kilde="Pensjon 30.9. s. 3–8, s. 11–13 og s. 20–22"),
           dekker=["pensjon-folketrygd-07", "pensjon-system-02", "pensjon-system-01", "pensjon-system-03"])
S.oppgave("Pensjonssystemet", "Pensjon", [15], "", [a])

# ======================================================================= 2
lonn2a, lonn2b = 1_150_000, 300_000
omsorg2 = 4.5 * G
okning2 = OPPTJ * (min(lonn2a, TAK) + max(lonn2b, omsorg2))
g2_uten_tak = OPPTJ * (lonn2a + max(lonn2b, omsorg2))
g2_i_tillegg = OPPTJ * (min(lonn2a, TAK) + omsorg2 + lonn2b)
g2_uten_omsorg = OPPTJ * (min(lonn2a, TAK) + lonn2b)
assert lonn2a > TAK and lonn2b < omsorg2
print(f"Oppgave 2: tak {TAK:.2f}, omsorg {omsorg2:.2f}; økning {okning2:.2f}; uten tak {g2_uten_tak:.2f}; "
      f"i tillegg {g2_i_tillegg:.2f}; uten omsorg {g2_uten_omsorg:.2f}")
a = S.ledd("", "<p>Anta at G er 136 549 kr. Pensjonsbeholdningen i folketrygden øker hvert år med 18,1 % av pensjonsgivende "
               "inntekt opp til 7,1 G. Den som har omsorg for barn under skolealder, får omsorgsopptjening som sikrer "
               "opptjening tilsvarende en inntekt på 4,5 G.</p>"
               "<p>Ina tjente 1 150 000 kr i 2025. I 2026 har hun en datter på to år, mottar barnetrygd og jobber deltid for "
               "300 000 kr. Hvor mye øker pensjonsbeholdningen hennes av opptjeningen i de to årene til sammen? Se bort fra "
               "reguleringen og bruk samme G begge år. Rund av til nærmeste krone.</p>",
           (f"Kr {kr(okning2)}", [kr(okning2)]),
           [(f"Kr {kr(g2_uten_tak)}", [kr(g2_uten_tak)]),
            (f"Kr {kr(g2_i_tillegg)}", [kr(g2_i_tillegg)]),
            (f"Kr {kr(g2_uten_omsorg)}", [kr(g2_uten_omsorg)])],
           sol("Opptjeningen er 18,1 % av inntekten, men bare opp til 7,1 G. Omsorgsopptjeningen gir opptjening som av 4,5 G "
               "når egen inntekt er lavere. Den kommer ikke i tillegg til egen inntekt.",
               [f"2025: lønnen er over taket 7,1 × 136 549 = {kr(TAK)}. Opptjening 0,181 × {kr(TAK)} = {kr(OPPTJ * TAK)}.",
                f"2026: 300 000 er under 4,5 G = {kr(omsorg2)}. Opptjening 0,181 × {kr(omsorg2)} = {kr(OPPTJ * omsorg2)}.",
                f"Sum: <b>{kr(okning2)} kr</b>."],
               [(f"Kr {kr(g2_uten_tak)}", "taket er glemt: 18,1 % av hele lønnen på 1 150 000 i 2025."),
                (f"Kr {kr(g2_i_tillegg)}", "omsorgsopptjeningen er lagt oppå egen inntekt (4,5 G + 300 000)."),
                (f"Kr {kr(g2_uten_omsorg)}", "omsorgsopptjeningen er glemt. Bare deltidslønnen gir opptjening i 2026.")],
               "Kort vei: 0,181 × (7,1 + 4,5) × 136 549 = 0,181 × 11,6 G gir samme tall. ✓ Omsorgsopptjeningen står ikke i "
               "2026-lysbildene, men ble testet i H2016 o4f.",
               kilde="Pensjon 30.9. s. 10 og H2016 o4f"),
           dekker=["pensjon-folketrygd-01", "pensjon-folketrygd-11"])
S.oppgave("Ina og opptjeningen", "Pensjon", [15], "", [a])

# ======================================================================= 3
beh3, lv3, pv3, egen3, lonn3 = 1_850_000, 0.040, 0.026, 0.060, 1_050_000
ny3 = beh3 * (1 + lv3) + OPPTJ * min(lonn3, TAK)
g3_snitt = beh3 * (1 + (lv3 + pv3) / 2) + OPPTJ * min(lonn3, TAK)
g3_egen = beh3 * (1 + egen3) + OPPTJ * min(lonn3, TAK)
g3_uten_tak = beh3 * (1 + lv3) + OPPTJ * lonn3
assert lonn3 > TAK
print(f"Oppgave 3: ny {ny3:.2f}; snitt {g3_snitt:.2f}; egen {g3_egen:.2f}; uten tak {g3_uten_tak:.2f}")
a = S.ledd("", "<p>Ove (født 1975) hadde 1 850 000 kr i pensjonsbeholdning i folketrygden ved utgangen av fjoråret. I år er "
               "lønnsveksten i samfunnet 4,0 %, prisveksten 2,6 % og Oves egen lønnsvekst 6,0 %. Han tjener 1 050 000 kr. "
               "G er 136 549 kr og opptjeningen er 18,1 % av inntekt opp til 7,1 G.</p>"
               "<p>Hva blir beholdningen hans ved utgangen av året? Rund av til nærmeste krone.</p>",
           (f"Kr {kr(ny3)}", [kr(ny3)]),
           [(f"Kr {kr(g3_snitt)}", [kr(g3_snitt)]),
            (f"Kr {kr(g3_egen)}", [kr(g3_egen)]),
            (f"Kr {kr(g3_uten_tak)}", [kr(g3_uten_tak)])],
           sol("Før uttak reguleres beholdningen med den gjennomsnittlige lønnsveksten i samfunnet. Så legges årets opptjening "
               "til: 18,1 % av inntekten opp til 7,1 G.",
               [f"Regulering: 1 850 000 × 1,040 = {kr(beh3 * (1 + lv3))}.",
                f"Opptjening: 0,181 × min(1 050 000; {kr(TAK)}) = {kr(OPPTJ * TAK)}.",
                f"Ny beholdning: <b>{kr(ny3)} kr</b>."],
               [(f"Kr {kr(g3_snitt)}", "regulerer med snittet av lønns- og prisveksten (3,3 %). Det er regelen for pensjon "
                 "<i>under utbetaling</i>, ikke for beholdningen før uttak."),
                (f"Kr {kr(g3_egen)}", "regulerer med Oves egen lønnsvekst. Beholdningen følger samfunnets lønnsvekst."),
                (f"Kr {kr(g3_uten_tak)}", "taket er glemt: 18,1 % av hele lønnen.")],
               "Prisveksten og Oves egen lønnsvekst er støy før uttak. Etter uttak gir snittregelen normalt lavere vekst enn "
               "lønningene når reallønnen øker.",
               kilde="Pensjon 30.9. s. 10 og s. 18"),
           dekker=["pensjon-folketrygd-02", "pensjon-folketrygd-08"])
S.oppgave("Oves pensjonsbeholdning", "Pensjon", [15], "", [a])

# ======================================================================= 4
b62, b67, d62, d67 = 3_900_000, 4_450_000, 22.30, 18.05
p62, p67 = b62 / d62, b67 / d67
diff4 = p67 - p62
g4_samme_beh = b62 / d67 - p62
g4_samme_dt = (b67 - b62) / d62
g4_nivaa = p67
print(f"Oppgave 4: p62 {p62:.2f}, p67 {p67:.2f}, diff {diff4:.2f}; samme beh {g4_samme_beh:.2f}; samme dt {g4_samme_dt:.2f}")
a = S.ledd("", "<p>Kari er født i 1985. Ved 62 år ventes pensjonsbeholdningen hennes å være 3 900 000 kr. Venter hun med "
               "uttaket til 67 år, ventes den å være 4 450 000 kr på grunn av regulering og ny opptjening. Anta at delingstallet "
               "for kullet hennes er 22,30 ved 62 år og 18,05 ved 67 år.</p>"
               "<p>Hvor mye høyere blir den årlige alderspensjonen fra folketrygden om hun venter til 67 år? Rund av til "
               "nærmeste krone.</p>",
           (f"Kr {kr(diff4)}", [kr(diff4)]),
           [(f"Kr {kr(g4_samme_beh)}", [kr(g4_samme_beh)]),
            (f"Kr {kr(g4_samme_dt)}", [kr(g4_samme_dt)]),
            (f"Kr {kr(g4_nivaa)}", [kr(g4_nivaa)])],
           sol("Årlig pensjon = pensjonsbeholdning / delingstall ved uttaksalderen. Venter hun, øker beholdningen og "
               "delingstallet synker. Begge trekker pensjonen opp.",
               [f"Ved 62 år: 3 900 000 / 22,30 = {kr(p62)}.",
                f"Ved 67 år: 4 450 000 / 18,05 = {kr(p67)}.",
                f"Økning: <b>{kr(diff4)} kr</b> i året."],
               [(f"Kr {kr(g4_samme_beh)}", "bruker beholdningen ved 62 også ved 67. Økningen i beholdningen er glemt."),
                (f"Kr {kr(g4_samme_dt)}", "deler hele økningen i beholdningen på delingstallet ved 62. Det lavere "
                 "delingstallet ved 67 er glemt."),
                (f"Kr {kr(g4_nivaa)}", "er pensjonen ved 67 år, ikke økningen.")],
               f"Lysbildets eksempel (1970-kullet, 4 670 000 kr) gir 220 804 kr ved 62 og 273 419 kr ved 67, med samme "
               f"beholdning. Her er økningen {pst(p67 / p62 - 1, 0)}.",
               kilde="Pensjon 30.9. s. 14 og s. 19"),
           dekker=["pensjon-folketrygd-03"])
S.oppgave("Kari og delingstallet", "Pensjon", [15], "", [a])

# ======================================================================= 5
a = S.ledd("", "<p>Hilde (født 1990) vurderer å utsette uttaket av alderspensjon fra folketrygden fra 64 til 68 år. Hvilken "
               "påstand er riktig?</p>",
           "Delingstallet blir lavere og den årlige pensjonen høyere, fordi beholdningen fordeles på færre år",
           ["I forventning får hun klart mest utbetalt totalt ved å ta ut tidlig, fordi hun da mottar pensjon i flere år",
            "Delingstallet blir høyere fordi hun da har levd lenger, så hver krone i beholdningen gir lavere årlig pensjon",
            "Pensjonen skattlegges uansett akkurat som lønn, med samme trygdeavgift og uten noe eget fradrag for pensjon"],
           begrep("Delingstallet uttrykker omtrent forventet antall år med pensjon. Senere uttak gir lavere delingstall og høyere "
                  "årlig pensjon. Uttaket er fleksibelt fra 62 år og nøytralt: forventet nåverdi av samlede utbetalinger skal "
                  "være omtrent uavhengig av uttaksalderen.",
                  "Lavere delingstall og høyere årlig pensjon er riktig.",
                  [("Mest totalt ved tidlig uttak", "strider mot nøytralt uttak. Flere år med lavere pensjon gir i forventning "
                    "omtrent det samme som færre år med høyere pensjon."),
                   ("Delingstallet blir høyere", "blander med levealdersjusteringen, der yngre <i>kull</i> får høyere "
                    "delingstall. Innen et kull synker delingstallet med uttaksalderen (prognosetabellen går fra 62 til 75 år)."),
                   ("Skattlegges som lønn", "pensjon er personinntekt med lavere trygdeavgift enn lønn (5,1 % mot 7,6 % i 2026) "
                    "og et eget skattefradrag for pensjonsinntekt. Står ikke i lysbildene, men i H2016 o4d.")],
                  kilde="Pensjon 30.9. s. 14 og s. 16, H2016 o4d"),
           dekker=["pensjon-folketrygd-04", "pensjon-folketrygd-10", "pensjon-ips-06"])
S.oppgave("Hilde utsetter uttaket", "Pensjon", [15], "", [a])

# ======================================================================= 6
a = S.ledd("", "<p>Hvilken påstand er riktig?</p>",
           "Yngre kull ventes å leve lenger og får høyere delingstall, altså lavere årlig pensjon av samme beholdning",
           ["Den som har tjent opp lite eller ingenting i folketrygden, får ingen alderspensjon derfra og må klare seg selv",
            "Tjenestepensjonene utgjør til sammen en større del av nordmenns samlede pensjonsformue enn folketrygden gjør",
            "Husholdningene sparer langt mer gjennom bank, fond og aksjer enn gjennom avdrag på boliglånet sitt"],
           begrep("Levealdersjusteringen kom med pensjonsreformen i 2011 (Stoltenberg-regjeringen), fordi pensjonssystemet koster "
                  "mye når levealderen øker. Jo høyere forventet levealder for kullet, jo høyere delingstall og jo lavere "
                  "pensjon ved en gitt uttaksalder.",
                  "Høyere delingstall og lavere pensjon for yngre kull er riktig.",
                  [("Ingen pensjon uten opptjening", "folketrygden har et minstenivå (garantipensjon) for dem med lav eller "
                    "ingen opptjening. Ikke i lysbildene."),
                   ("Tjenestepensjonen størst", "SSB 2017 (s. 8): folketrygden er 2 367 000 av 2 888 000 kr i snitt, altså over "
                    "80 % av pensjonsformuen."),
                   ("Mer i bank, fond og aksjer", "SSB-tabellen (s. 35–36): av 40 000 kr i årlig sparing er 14 000 avdrag og bare "
                    "2 000 bank, fond og aksjer. Boligkjøp er pensjonssparing, særlig med strenge avdragskrav.")],
                  strategi="Fellen i H2023 o10 er «høyere levealder gir høyere delingstall og mer pensjon». Høyere delingstall "
                           "gir alltid mindre per år.",
                  kilde="Pensjon 30.9. s. 8, s. 15–17 og s. 35–37"),
           dekker=["pensjon-folketrygd-06", "pensjon-folketrygd-12", "pensjon-system-04", "pensjon-ips-05"])
S.oppgave("Levealder og pensjonsformue", "Pensjon", [15], "", [a])

# ======================================================================= 7
aar7, dt7 = 41, 18.5
kg7 = OPPTJ * aar7 / dt7
g7_snudd = OPPTJ * dt7 / aar7
print(f"Oppgave 7: kompensasjonsgrad {kg7:.5f}; snudd {g7_snudd:.5f}")
K7, F7 = pst(kg7, 2), pst(g7_snudd, 2)
a = S.ledd("", "<p>Jonas har tjent opp alderspensjon i folketrygden i 41 år. Lønnen har hele tiden vært under 7,1 G og har "
               "vokst i takt med lønnsveksten i samfunnet. Opptjeningen er 18,1 % av inntekten og delingstallet ved uttak er "
               "18,5.</p>"
               "<p>Hvor stor blir alderspensjonen i prosent av sluttlønnen? Og hva gjelder for en person med samme sluttlønn "
               "som har hatt raskere lønnsvekst enn samfunnet? Rund av til to desimaler.</p>",
           (f"{K7}. Med raskere egen lønnsvekst blir andelen lavere", [K7]),
           [(f"{K7}. Med raskere egen lønnsvekst blir andelen høyere", [K7]),
            (f"{K7}. Andelen blir den samme, siden beholdningen følger lønnsveksten", [K7]),
            (f"{F7}. Med raskere egen lønnsvekst blir andelen lavere", [F7])],
           sol("Når lønnen følger samfunnets lønnsvekst, vokser beholdningen i takt med lønnen. Hvert år bidrar da med 18,1 % "
               "av sluttlønnen: kompensasjonsgrad = 0,181 × år / delingstall.",
               [f"Beholdning: 0,181 × 41 = 7,421 sluttlønner.",
                f"Årlig pensjon: 7,421 / 18,5 = <b>{K7}</b> av sluttlønnen.",
                "Raskere egen lønnsvekst: de tidlige årene er lave i forhold til sluttlønnen, mens beholdningen bare "
                "reguleres med samfunnets lønnsvekst. Andelen blir <b>lavere</b>."],
               [(f"{K7} og høyere", "snur effekten. Lav tidlig lønn gir liten beholdning i forhold til sluttlønnen."),
                (f"{K7} og den samme", "reguleringen med samfunnets lønnsvekst er nettopp grunnen til at den blir lavere."),
                (f"{F7}", "brøken er snudd: 0,181 × 18,5 / 41.")],
               "Rundt 40 % fra folketrygden er det vanlige tallet. Fellene i H2019 o6b var «høyere» og «likt».",
               kilde="Pensjon 30.9. s. 10–19 og H2019 o6b"),
           dekker=["pensjon-folketrygd-05", "pensjon-folketrygd-09"])
S.oppgave("Jonas og kompensasjonsgraden", "Pensjon", [15], "", [a])

# ======================================================================= 8
lonn8, r8, T8 = 1_750_000, 0.04, 15
inn8 = 0.02 * min(lonn8, 12 * G)
ann8 = ((1 + r8) ** T8 - 1) / r8
fv8 = inn8 * ann8
g8_full = 0.02 * lonn8 * ann8
g8_uten_r = inn8 * T8
g8_71 = 0.02 * TAK * ann8
print(f"Oppgave 8: 12G {12 * G}, innskudd {inn8:.2f}, faktor {ann8:.5f}, FV {fv8:.2f}; full {g8_full:.2f}; "
      f"uten r {g8_uten_r:.2f}; 7,1G {g8_71:.2f}")
a = S.ledd("", "<p>Mia tjener 1 750 000 kr i året. Arbeidsgiveren betaler minstekravet til obligatorisk tjenestepensjon: "
               "2 % av lønn opp til 12 G inn på en innskuddspensjon. Anta at G (136 549 kr) og lønnen er uendret, at innskuddet "
               "kommer ved slutten av hvert år og at pengene gir 4 % avkastning i året.</p>"
               "<p>Hvor mye står på pensjonskontoen etter 15 år? Rund av til nærmeste krone.</p>",
           (f"Kr {kr(fv8)}", [kr(fv8)]),
           [(f"Kr {kr(g8_full)}", [kr(g8_full)]),
            (f"Kr {kr(g8_uten_r)}", [kr(g8_uten_r)]),
            (f"Kr {kr(g8_71)}", [kr(g8_71)])],
           sol("Alle bedrifter må ha tjenestepensjon på minst 2 % av lønn opp til 12 G. Sluttverdien av like årlige innskudd "
               "er innskudd × ((1 + r)<sup>T</sup> − 1)/r.",
               [f"Grunnlag: 12 × 136 549 = {kr(12 * G)}, lavere enn lønnen. Innskudd: 2 % = {kr(inn8, 2)}.",
                f"Faktor: (1,04<sup>15</sup> − 1)/0,04 = {kr(ann8, 4)}.",
                f"Sluttverdi: {kr(inn8, 2)} × {kr(ann8, 4)} = <b>{kr(fv8)} kr</b>."],
               [(f"Kr {kr(g8_full)}", "2 % av hele lønnen. Taket på 12 G er glemt."),
                (f"Kr {kr(g8_uten_r)}", "bare innskuddene, uten avkastning."),
                (f"Kr {kr(g8_71)}", "bruker folketrygdens tak på 7,1 G i stedet for 12 G.")],
               "Noen bedrifter setter av 7 % (s. 25). Det ville gitt 3,5 ganger så mye. Skal du finne kompensasjonsgraden, "
               "fordeles sluttverdien som en annuitet over minst 10 år og deles på sluttlønnen (H2020 o5, H2021 o7).",
               kilde="Pensjon 30.9. s. 24–25 og H2021 o7"),
           dekker=["pensjon-tjeneste-01", "pensjon-tjeneste-08"])
S.oppgave("Mias tjenestepensjon", "Pensjon", [15], "", [a])

# ======================================================================= 9
a = S.ledd("", "<p>Hvilken påstand om tjenestepensjon er riktig?</p>",
           "Innskuddspensjon er en andel av lønnen som spares for deg, mens ytelsespensjon lover en andel av lønnen i pensjon",
           ["Ytelsespensjon er det vanligste i privat sektor, mens offentlig sektor stort sett har ren innskuddspensjon for de ansatte",
            "I innskuddspensjon kan du ta ut pengene før pensjonsalder ved behov for likviditet, men du kan ikke velge risikoprofil selv",
            "Innskuddspensjonen faller bort om du dør før uttak, mens privat tjenestepensjon alltid betales ut så lenge du lever"],
           begrep("Lysbilde 24: innskuddsbasert betyr at arbeidsgiver sparer en viss andel av lønnen og du bestemmer hvordan "
                  "pengene investeres. Ytelsesbasert betyr at du får avtale om en viss andel av lønnen i pensjon.",
                  "Definisjonene i det riktige alternativet er riktige.",
                  [("Ytelse vanligst i privat sektor", "omtrent motsatt: 9 av 10 i privat sektor har innskuddspensjon, mens "
                    "offentlig sektor har en kombinert løsning (s. 27)."),
                   ("Uttak før pensjonsalder, ingen risikovalg", "begge deler er feil. Pengene er bundet og du kan velge og "
                    "endre risikoprofil (ofte 50/50 som standard, men unge bør gjerne ha mer aksjer, s. 26)."),
                   ("Faller bort ved død", "innskuddspensjon arves av etterlatte. Privat tjenestepensjon betales i minst 10 år, "
                    "offentlig tjenestepensjon resten av livet (s. 24 og s. 27).")],
                  kilde="Pensjon 30.9. s. 24–27"),
           dekker=["pensjon-tjeneste-02", "pensjon-tjeneste-06", "pensjon-tjeneste-04", "pensjon-tjeneste-05"])
S.oppgave("Innskudd eller ytelse", "Pensjon", [15], "", [a])

# ======================================================================= 10
a = S.ledd("", "<p>Lars har innskuddspensjon i et privat firma som også har AFP. Han vurderer å bytte til en arbeidsgiver uten "
               "AFP. Hvilken påstand er riktig?</p>",
           "Lars bærer selv investeringsrisikoen, fordi pensjonen avhenger av hvordan pengene utvikler seg",
           ["Ved jobbytte mister han det han har tjent opp, fordi innbetalingene fra den gamle arbeidsgiveren stopper",
            "Han beholder AFP-retten etter byttet, fordi han allerede har jobbet mange år i en bedrift med AFP",
            "De fleste nordmenn vet godt hva de får i pensjon, så det er lite å hente på å skaffe seg oversikt"],
           begrep("Innskuddsbasert pensjon gir mer risiko for arbeidstakeren, siden man ikke vet hvordan investeringene utvikler "
                  "seg. I ytelsespensjon bærer arbeidsgiveren risikoen.",
                  "Risikoen ligger hos Lars.",
                  [("Mister det opptjente", "innbetalingene stopper, men han får et pensjonskapitalbevis som normalt samles på "
                    "egen pensjonskonto. norskpensjon.no gir oversikt (s. 28–30)."),
                   ("Beholder AFP-retten", "jobbytte kan få store konsekvenser: bytter du til en arbeidsgiver uten AFP før "
                    "uttaket, kan du miste retten selv etter mange år med AFP. AFP-lysbildene står i versjonen fra 24.9., ikke i "
                    "30.9."),
                   ("Folk vet hva de får", "Nettavisen (s. 34): tre av fire vet ikke hva de får i pensjon. Det er et argument "
                    "for å sjekke avtalene og for standardvalg.")],
                  strategi="Fellen fra H2019 o6e er «innskuddspensjon gir mer risiko for arbeidsgiver». Snu den, så har du svaret.",
                  kilde="Pensjon 30.9. s. 24 og s. 28–34, Pensjon 24.9. s. 31–35"),
           dekker=["pensjon-tjeneste-03", "pensjon-tjeneste-07", "pensjon-tjeneste-09", "pensjon-system-05"])
S.oppgave("Lars bytter jobb", "Pensjon", [15], "", [a])

# ======================================================================= 11
a = S.ledd("", "<p>Siri (30) eier ikke bolig og vurderer å spare 25 000 kr i året i individuell pensjonssparing (IPS). Hvilken "
               "påstand er riktig?</p>",
           "IPS gir utsatt skatt og fritak for formuesskatt på det som er spart, men pengene bindes til pensjonsalder",
           ["IPS virker som BSU: en fast andel av innskuddet trekkes rett fra skatten hun skal betale samme år",
            "Pensjonssparing skiller seg grunnleggende fra annen sparing, så alt som kalles pensjonssparing gir skattefordeler",
            "Fordelen er at uttakene skattlegges med en lavere sats enn den hun fikk fradrag med, ikke at skatten utsettes"],
           begrep("Individuell pensjonssparing er stort sett som annen sparing: aksjer, bank og nedbetaling av lån flytter alle "
                  "penger til fremtiden. Unntaket er IPS, som gir utsatt skatt og fritak for formuesskatt for investert beløp "
                  "(maks 25 000 kr i året), men binder pengene til pensjonsalder.",
                  "Utsatt skatt, formuesskattfritak og binding er riktig.",
                  [("Som BSU", "BSU gir fradrag i skatt (10 % av innskuddet: 27 500 kr gir 2 750 kr). IPS gir fradrag i "
                    "alminnelig inntekt nå og skatt ved uttak."),
                   ("Alt pensjonssparing har skattefordel", "lysbildet sier det motsatte: stort sett små forskjeller, med IPS "
                    "som unntak."),
                   ("Lavere sats ved uttak", "fradrag og uttak skattlegges begge som alminnelig inntekt (22 %). Fordelen er "
                    "utsettelsen, som virker som et rentefritt lån fra staten, pluss formuesskattfritaket.")],
                  kilde="Pensjon 30.9. s. 32–33 og s. 37, Kvadsheim lb 51"),
           dekker=["pensjon-ips-01", "pensjon-ips-02", "pensjon-ips-03", "pensjon-ips-04"])
S.oppgave("Siri og IPS", "Pensjon", [15], "", [a])

S.skriv(label="Næss: sparing og pensjon",
        note="Pensjonsforelesningen: pilarene, opptjening, regulering og delingstall i folketrygden, kompensasjonsgrad, "
             "tjenestepensjon, AFP, IPS og BSU.",
        facts=["11 flervalg med fire alternativer: 3 poeng for rett, −1 for feil og 0 for blankt.",
               "Satser og regler står i oppgaveteksten, slik de blir oppgitt på eksamen.",
               "Sammen med de andre settene i fanen dekker settet hvert punkt i sjekklisten.",
               "Laget fra forelesningsnotatene 2026. Kurset har ikke kontrollert løsningene."],
        practiceNote="Hold to ting atskilt: innen et kull synker delingstallet med uttaksalderen, mellom kull stiger det med "
                     "levealderen. Og beholdningen følger lønnsveksten, mens løpende pensjon følger snittet av lønn og pris.")
