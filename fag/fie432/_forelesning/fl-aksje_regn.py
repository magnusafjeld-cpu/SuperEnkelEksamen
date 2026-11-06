"""fl-aksje: Næss, «Aksjesparing: kan du slå markedet?» (Investering i aksjemarkedet, 2026).

Kilde: tekst2/ForelesningAksjesparing2026 (6).pdf.txt, versjonen fra 30. september 2026 (nyest). Sidetallene i
kilde= er fra den. Det som er strøket der (sparing mot investering, Fama-French-formelen), hentes fra (3) og (4).
"""
import math
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from felles import *

S = Sett("fl-aksje")
A = "Aksjesparing 30.9."

# ======================================================================= 1
a = S.ledd("", "<p>Hvilken påstand stemmer med utgangspunktet i forelesningen om aksjesparing?</p>",
           "Aksjer har gitt høyere avkastning enn bankinnskudd i alle land og mer enn modellene predikerer",
           ["Livssyklusmodellen sier at man bør spare en fast andel av inntekten hvert år, både som ung og som pensjonist",
            "Forelesningen kaller det å kjøpe aksjer for sparing og det å sette penger trygt i banken for investering",
            "Hvilke aksjer man bør eie, avhenger av risikoviljen: de risikovillige bør eie andre aksjer enn de forsiktige"],
           begrep("Aksjepremien har typisk vært rundt 5 prosentpoeng over sikre bankinnskudd, den er positiv i alle land og "
                  "den er større enn modellene predikerer (s. 7–9).",
                  "Høyere avkastning i alle land og mer enn modellene predikerer er riktig.",
                  [("Fast andel hele livet", "selvhjelpsbøkenes regel. Livssyklusmodellen glatter forbruket: lite sparing som "
                    "ung, mye midt i livet og negativ sparing som pensjonist."),
                   ("Aksjer kalt sparing", "snudd. Versjonen fra 23.9. (s. 11) kaller bankinnskudd sparing og aksjer investering."),
                   ("Andre aksjer for risikovillige", "svaret på «hvilke aksjer» er markedsporteføljen for alle. Risikoviljen "
                    "avgjør bare <i>hvor mye</i> (s. 21–22).")],
                  kilde=f"{A} s. 3–9 og s. 21–22, Aksjesparing 23.9. s. 11"),
           dekker=["aksje-premie-02", "aksje-premie-01", "aksje-premie-04", "aksje-premie-03"])
S.oppgave("Utgangspunktet for aksjesparing", "Porteføljevalg", [14], "", [a])

# ======================================================================= 2
rf2, Er2, sig2, gam2, F2 = 0.03, 0.09, 0.25, 2, 800_000
w2 = (Er2 - rf2) / (gam2 * sig2 ** 2)
E2 = rf2 + w2 * (Er2 - rf2)
g2_sigma = rf2 + (Er2 - rf2) / (gam2 * sig2) * (Er2 - rf2)
g2_total = rf2 + Er2 / (gam2 * sig2 ** 2) * (Er2 - rf2)
g2_uten_rf = w2 * Er2
assert lik(w2, 0.48)
print(f"Oppgave 2: w {w2:.4f}, E {E2:.4f}; sigma {g2_sigma:.4f}; total {g2_total:.4f}; uten rf {g2_uten_rf:.4f}")
a = S.ledd("", "<p>Ingrid har 800 000 kr i finansformue og ingen annen formue. Hun velger mellom bankinnskudd med 3 % rente og "
               "et globalt indeksfond med forventet avkastning 9 % og standardavvik 25 %. Hennes relative risikoaversjon er "
               "γ = 2.</p>"
               "<p>Hva blir forventet avkastning på hele finansformuen når hun velger optimalt? Rund av til to desimaler.</p>",
           (pst(E2), [pst(E2)]),
           [(pst(g2_sigma), [pst(g2_sigma)]),
            (pst(g2_total), [pst(g2_total)]),
            (pst(g2_uten_rf), [pst(g2_uten_rf)])],
           sol("Mertons andel: w = (E(r) − r<sub>f</sub>)/(γσ<sup>2</sup>). Mer i aksjer jo høyere meravkastning, mindre jo "
               "høyere varians og risikoaversjon. Forventet avkastning på porteføljen er r<sub>f</sub> + w × premie.",
               ["Premie: 9 % − 3 % = 6 %. Varians: 0,25<sup>2</sup> = 0,0625.",
                f"w = 0,06/(2 × 0,0625) = {pst(w2, 0)}, altså {kr(w2 * F2)} kr i fondet.",
                f"E(r<sub>p</sub>) = 3 % + 0,48 × 6 % = <b>{pst(E2)}</b>."],
               [(pst(g2_sigma), "standardavviket er ikke kvadrert: w = 0,06/(2 × 0,25) = 12 %."),
                (pst(g2_total), "total avkastning (9 %) i telleren i stedet for premien: w = 72 %."),
                (pst(g2_uten_rf), "0,48 × 9 %. Renten på de 52 % i banken er glemt.")],
               f"Kontroll med beløp: 384 000 × 9 % + 416 000 × 3 % = {kr(384_000 * 0.09 + 416_000 * 0.03)}, som er "
               f"{pst(E2)} av 800 000. ✓",
               kilde=f"{A} s. 11–12"),
           dekker=["aksje-merton-01", "aksje-merton-02", "aksje-merton-04"])
S.oppgave("Ingrid og indeksfondet", "Porteføljevalg", [14], "", [a])

# ======================================================================= 3
w3, prem3, var3 = 0.60, 0.06, 0.05
gam3 = prem3 / (w3 * var3)
prem3n, sig3n = 0.066, 0.25
w3n = prem3n / (gam3 * sig3n ** 2)
gam3_feil = prem3 / (w3 * var3 ** 2)
g3_kvadrert = prem3n / (gam3_feil * sig3n ** 2)
g3_bare_premie = w3 * prem3n / prem3
g3_sigma = prem3n / (gam3 * sig3n)
assert lik(gam3, 2) and lik(gam3_feil, 40)
print(f"Oppgave 3: gamma {gam3}, ny w {w3n:.4f}; kvadrert {g3_kvadrert:.4f}; bare premie {g3_bare_premie:.4f}; sigma {g3_sigma:.4f}")
a = S.ledd("", "<p>Elling har 60 % av finansformuen i et indeksfond og resten i banken. Fondet har forventet meravkastning 6 % "
               "over bankrenten og en varians på 0,05. Andelen er optimal for ham. Han vurderer nå et aktivt fond som han tror "
               "gir 6,6 % meravkastning etter kostnader, med standardavvik 25 %.</p>"
               "<p>Hvor stor andel bør Elling ha i det aktive fondet hvis han tror på dette? Rund av til én desimal.</p>",
           (pst(w3n, 1), [pst(w3n, 1)]),
           [(pst(g3_kvadrert, 1), [pst(g3_kvadrert, 1)]),
            (pst(g3_bare_premie, 1), [pst(g3_bare_premie, 1)]),
            (pst(g3_sigma, 1), [pst(g3_sigma, 1)])],
           sol("Regn Merton-formelen baklengs for å finne γ. Bruk den så på det nye fondet. Variansen er oppgitt direkte og "
               "skal ikke kvadreres. Standardavviket for det nye fondet skal kvadreres.",
               ["γ = 0,06/(0,60 × 0,05) = 2.",
                "Ny varians: 0,25<sup>2</sup> = 0,0625.",
                f"w = 0,066/(2 × 0,0625) = <b>{pst(w3n, 1)}</b>."],
               [(pst(g3_kvadrert, 1), "variansen 0,05 er kvadrert, så γ blir 40."),
                (pst(g3_bare_premie, 1), "skalerer bare med premien (60 % × 6,6/6). Den høyere risikoen er glemt. Med samme "
                 "risiko hadde dette vært riktig: andelen er proporsjonal med premien."),
                (pst(g3_sigma, 1), "standardavviket for det nye fondet er ikke kvadrert.")],
               "Hvor troverdig er løftet? Skal et aktivt fond slå indeks med 0,6 prosentpoeng etter kostnader, må det slå "
               "indeks med langt mer før kostnader. Jensen, Malkiel, SPIVA og negativ alfa (s. 74–79) gjør det lite "
               "sannsynlig. En høyere andel er ikke et argument for fondet, bare en følge av en optimistisk antakelse.",
               kilde=f"{A} s. 11 og s. 74–79, H2021 o6b–c"),
           dekker=["aksje-merton-03", "aksje-merton-05"])
S.oppgave("Elling og det aktive fondet", "Porteføljevalg", [14], "", [a])

# ======================================================================= 4
t4, syk4, lav4, hoy4 = 0.30, 520_000, 300_000, 900_000
syk4e, lav4e, hoy4e = syk4 * (1 - t4), lav4 * (1 - t4), hoy4 * (1 - t4)
ce4 = math.exp(0.5 * math.log(lav4e) + 0.5 * math.log(hoy4e))
E4 = 0.5 * lav4e + 0.5 * hoy4e
ce4_rot = (0.5 * math.sqrt(lav4e) + 0.5 * math.sqrt(hoy4e)) ** 2
ce4_for = math.sqrt(lav4 * hoy4)
assert ce4 < syk4e < ce4_rot < E4 and ce4_for < syk4 and lik(ce4, ce4_for * (1 - t4))
print(f"Oppgave 4: sykepleier {syk4e:.0f}; CE ln {ce4:.2f}; E {E4:.0f}; CE rot {ce4_rot:.2f}; CE før skatt {ce4_for:.2f}")
a = S.ledd("", "<p>Hanne velger mellom to jobber. Som sykepleier får hun 520 000 kr i året sikkert. Som eiendomsmegler får hun "
               "300 000 kr eller 900 000 kr, med 50 % sannsynlighet for hver. All lønn skattlegges med en flat sats på 30 %. "
               "Nytten hennes er u(c) = ln(c), der c er årslønnen etter skatt.</p>"
               "<p>Hvilken jobb gir høyest forventet nytte?</p>",
           (f"Sykepleier: sikkerhetsekvivalenten til meglerjobben er kr {kr(ce4)} etter skatt", [kr(ce4)]),
           [(f"Megler: forventet lønn etter skatt er kr {kr(E4)}, mot kr {kr(syk4e)} som sykepleier", [kr(E4), kr(syk4e)]),
            (f"Megler: sikkerhetsekvivalenten til meglerjobben er kr {kr(ce4_rot)} etter skatt", [kr(ce4_rot)]),
            ("Megler, fordi den flate skatten på 30 % tar mest fra det høye utfallet og demper risikoen", ["30 %"])],
           sol("En risikoavers velger det sikre alternativet når forventningen er lik og krever betaling for risiko ellers. "
               "Sammenlign forventet nytte, eller sikkerhetsekvivalenter: ln-nytte er CRRA med γ = 1.",
               [f"Etter skatt: sykepleier {kr(syk4e)}, megler {kr(lav4e)} eller {kr(hoy4e)}.",
                f"E[ln c] = 0,5 ln {kr(lav4e)} + 0,5 ln {kr(hoy4e)}. Sikkerhetsekvivalenten er "
                f"√({kr(lav4e)} × {kr(hoy4e)}) = {kr(ce4)}.",
                f"{kr(ce4)} &lt; {kr(syk4e)}: <b>sykepleier</b> gir høyest forventet nytte, så vidt."],
               [(f"Forventet lønn {kr(E4)}", "risikonøytral sammenligning. Med ln-nytte teller risikoen."),
                (f"Sikkerhetsekvivalent {kr(ce4_rot)}", "regnet med u(c) = √c (γ = 0,5), som er mindre risikoavers. Feil "
                 "nyttefunksjon gir motsatt valg."),
                ("Skatten demper risikoen", "en proporsjonal skatt skalerer alle utfall med 0,7. Med CRRA endrer det ikke "
                 "valget. Først en progressiv skatt ville favorisert den sikre jobben.")],
               f"Før skatt: √(300 000 × 900 000) = {kr(ce4_for)} &lt; 520 000. Samme valg. Sikkerhetsekvivalenten etter "
               "skatt er nøyaktig 0,7 av den før skatt. ✓",
               kilde=f"{A} s. 11, H2018 o5b–c og H2024 o11"),
           dekker=["aksje-merton-06", "aksje-merton-07", "aksje-humankapital-09"])
S.oppgave("Hanne velger jobb", "Forsikring og forventet nytte", [17, 14], "", [a])

# ======================================================================= 5
F5, H5, prem5, sig5, gam5 = 3_000_000, 1_500_000, 0.05, 0.20, 2.5
w5 = prem5 / (gam5 * sig5 ** 2)
aksjer5 = w5 * (F5 + H5)
a5 = aksjer5 / F5
b5 = max(0, aksjer5 - H5) / F5
g5a_paaF = w5
g5a_sigma = prem5 / (gam5 * sig5) * (F5 + H5) / F5
assert lik(w5, 0.5)
print(f"Oppgave 5: w {w5}, aksjer {aksjer5:.0f}; a {a5:.4f}; b {b5:.4f}; sigma-feil {g5a_sigma:.4f}")
body5 = ("<p>Jonas har 3 mill. kr i finansformue og en humankapital verdt 1,5 mill. kr. Han kan plassere finansformuen i et "
         "globalt indeksfond og i banken. Aksjemarkedet har forventet meravkastning 5 % over bankrenten og standardavvik 20 %. "
         "Jonas har relativ risikoaversjon γ = 2,5.</p>")
pa = S.ledd("a", "<p>Anta at humankapitalen er risikofri. Hvor stor andel av finansformuen bør han ha i indeksfondet? Rund av "
                 "til én desimal.</p>",
            (pst(a5, 1), [pst(a5, 1)]),
            [(pst(g5a_paaF, 1), [pst(g5a_paaF, 1)]),
             (pst(b5, 1), [pst(b5, 1)]),
             (pst(g5a_sigma, 1), [pst(g5a_sigma, 1)])],
            sol("Formuen er finansformuen <i>pluss</i> humankapitalen. Merton-andelen gjelder hele formuen. Sikker humankapital "
                "virker som et bankinnskudd, så hele aksjebeløpet må ligge i finansformuen.",
                [f"w = 0,05/(2,5 × 0,04) = {pst(w5, 0)}.",
                 f"Aksjer: 0,5 × (3 + 1,5) mill. = {kr(aksjer5)}.",
                 f"Andel av finansformuen: {kr(aksjer5)}/3 000 000 = <b>{pst(a5, 1)}</b>."],
                [(pst(g5a_paaF, 1), "bruker w bare på finansformuen og glemmer humankapitalen."),
                 (pst(b5, 1), "behandler humankapitalen som aksjer. Det er svaret i b, ikke her."),
                 (pst(g5a_sigma, 1), "standardavviket er ikke kvadrert: w = 0,05/(2,5 × 0,20) = 10 %.")],
                "Lysbildet: 2 mill. i finans og 3 mill. sikker humankapital med w = 1/3 gir 1,67 mill. i aksjer, mer enn "
                "83 % av finansformuen. Andelen kan bli over 100 %. Da betyr det lån.",
                kilde=f"{A} s. 12–14"),
            dekker=["aksje-humankapital-01", "aksje-humankapital-05"])
pb = S.ledd("b", "<p>Anta i stedet at humankapitalen svinger i takt med aksjemarkedet (β = 1). Hvor stor andel av "
                 "finansformuen bør han nå ha i indeksfondet? Rund av til én desimal.</p>",
            (pst(b5, 1), [pst(b5, 1)]),
            [(pst(a5, 1), [pst(a5, 1)]),
             (pst(g5a_paaF, 1), [pst(g5a_paaF, 1)]),
             (pst(0, 1), [pst(0, 1)])],
            sol("Aksjelik humankapital er allerede «aksjer». Aksjer i finansformuen = w(F + H) − βH, men ikke under null. "
                "Med humankapital som svinger mindre (β mellom 0 og 1) trekkes bare βH fra.",
                [f"Ønsket aksjeeksponering: 0,5 × 4,5 mill. = {kr(aksjer5)}.",
                 f"Humankapitalen dekker allerede 1 × 1 500 000. Resten: {kr(aksjer5 - H5)}.",
                 f"Andel: {kr(aksjer5 - H5)}/3 000 000 = <b>{pst(b5, 1)}</b>."],
                [(pst(a5, 1), "behandler humankapitalen som sikker, som i a."),
                 (pst(g5a_paaF, 1), "bruker w på finansformuen alene."),
                 (pst(0, 1), "plasserer alt i banken. Det er riktig bare når humankapitalen er større enn ønsket "
                  "aksjebeløp, slik som på lysbildet (3 mill. mot 1,67 mill.).")],
                f"Fra a til b faller andelen med H/F = 1,5/3 = 50 prosentpoeng. ✓",
                kilde=f"{A} s. 14–16, H2018 o5f"),
            dekker=["aksje-humankapital-02", "aksje-humankapital-08"])
S.oppgave("Jonas og humankapitalen", "Porteføljevalg", [14], body5, [pa, pb])

# ======================================================================= 6
a = S.ledd("", "<p>Nina er fast ansatt i staten. Kari er aksjemegler med en bonus som følger børsen. De er like gamle, har like "
               "stor finansformue, like stor forventet humankapital og samme risikoaversjon. Hvilken påstand er riktig?</p>",
           "Nina bør ha høyere aksjeandel i finansformuen, fordi den sikre lønnen virker som et stort bankinnskudd",
           ["De bør ha samme aksjeandel, fordi de har samme risikoaversjon og like stor formue og humankapital",
            "Er Karis bonus størst når kronen er sterk, bør hun valutasikre indeksfondet for å få lavere samlet risiko",
            "Begge bør kjøpe ekstra aksjer rett etter et kraftig børsfall, fordi prisene da er lave og venter å stige"],
           begrep("Tabellen «Er vi en aksje eller en obligasjon?»: risikofri arbeidsinntekt gir «kjøp aksjer», aksjelik "
                  "arbeidsinntekt gir «kjøp risikofritt». Praktiske råd (s. 92): ung med trygg jobb kan ha høy aksjeandel, "
                  "jobb som korrelerer med markedet gir lavere.",
                  "Nina bør ha høyest aksjeandel.",
                  [("Samme andel", "glemmer at humankapitalen er en del av porteføljen. Karis humankapital er allerede aksjelik."),
                   ("Valutasikre", "motsatt (H2024 o12c): et usikret utenlandsk fond er verdt mest i kroner når kronen er svak "
                    "og lønnen lav. Det jevner ut totalinntekten, så hun bør ikke sikre."),
                   ("Kjøpe etter fall", "markedstiming. Prisene reflekterer allerede all kjent informasjon (s. 92).")],
                  kilde=f"{A} s. 15–16 og s. 91–92, H2023 o9 og H2024 o12c"),
           dekker=["aksje-humankapital-03", "aksje-fond-07", "aksje-fond-12", "aksje-fond-13"])
S.oppgave("Nina og Kari", "Porteføljevalg", [14], "", [a])

# ======================================================================= 7
a = S.ledd("", "<p>Hvorfor bør en 60-åring normalt ha lavere aksjeandel i finansformuen enn en 30-åring, slik økonomene i "
               "forelesningen begrunner det?</p>",
           "Humankapitalen, som virker som et stort sikkert innskudd, er mye mindre når det er få år igjen til pensjon",
           ["Aksjer blir mindre risikable jo lenger man eier dem, så 30-åringen har bedre tid til å vente ut fallene",
            "Det bør hun ikke: i Norge stiger andelen i risikable aktiva med alderen, i tråd med det teorien sier",
            "Eldre er mer risikoaverse og tapsaverse enn yngre, så risikoaversjonen γ i Merton-formelen øker med alderen"],
           begrep("Humankapitalen er nåverdien av framtidig arbeidsinntekt: den viktigste eiendelen for en ung arbeidstaker og "
                  "liten nær pensjonsalder. Når den krymper, faller aksjeandelen av finansformuen. Det passer med regelen "
                  "«100 minus alder».",
                  "Mindre humankapital er økonomenes begrunnelse.",
                  [("Mindre risiko på lang sikt", "selvhjelpsbøkenes begrunnelse for det samme rådet. Økonomene er ikke enige "
                    "i at risikoen blir mindre med lang horisont (s. 19)."),
                   ("Andelen stiger i Norge", "Fagereng, Gottlieb og Guiso (s. 18): andelen i risikable aktiva faller med "
                    "alderen."),
                   ("γ øker med alderen", "modellen forklarer fallet uten at preferansene endres (H2019 o6d og H2025 o11(4)).")],
                  kilde=f"{A} s. 13 og s. 17–19"),
           dekker=["aksje-humankapital-04", "aksje-humankapital-05", "aksje-humankapital-06", "aksje-humankapital-07"])
S.oppgave("Alder og aksjeandel", "Porteføljevalg", [14], "", [a])

# ======================================================================= 8
mA, sA, mB, sB = 0.09, 0.15, 0.06, 0.30
w8, rho8 = 0.80, 0.20
var8 = w8 ** 2 * sA ** 2 + (1 - w8) ** 2 * sB ** 2 + 2 * w8 * (1 - w8) * rho8 * sA * sB
sd8 = math.sqrt(var8)
g8_snitt = w8 * sA + (1 - w8) * sB
g8_uten_kryss = math.sqrt(w8 ** 2 * sA ** 2 + (1 - w8) ** 2 * sB ** 2)
assert sd8 < sA
print(f"Oppgave 8a: var {var8:.5f}, sd {sd8:.5f}; snitt {g8_snitt:.4f}; uten kryss {g8_uten_kryss:.5f}")
neg8 = sB / (sA + sB)
pos8_formel = (sB ** 2 - sA * sB) / (sA ** 2 + sB ** 2 - 2 * sA * sB)
null8 = sB ** 2 / (sA ** 2 + sB ** 2)
assert lik(pos8_formel, 2) and lik(abs(neg8 * sA - (1 - neg8) * sB), 0)
print(f"Oppgave 8b: rho=-1 {neg8:.4f}; rho=1 formel {pos8_formel:.4f}; rho=0 {null8:.4f}")
body8 = ("<p>Aksje A har forventet avkastning 9 % og standardavvik 15 %. Aksje B har forventet avkastning 6 % og standardavvik "
         "30 %. Ola kan bare investere i disse to aksjene og kan ikke shorte.</p>")
pa = S.ledd("a", "<p>Korrelasjonen er 0,2. Ola setter 80 % i A og 20 % i B. Hva er standardavviket til porteføljen? Rund av "
                 "til to desimaler.</p>",
            (pst(sd8), [pst(sd8)]),
            [(pst(g8_snitt), [pst(g8_snitt)]),
             (pst(var8), [pst(var8)]),
             (pst(g8_uten_kryss), [pst(g8_uten_kryss)])],
            sol("σ<sub>p</sub><sup>2</sup> = w<sup>2</sup>σ<sub>A</sub><sup>2</sup> + (1 − w)<sup>2</sup>σ<sub>B</sub><sup>2</sup> "
                "+ 2w(1 − w)ρσ<sub>A</sub>σ<sub>B</sub>. Forventningen er et vektet snitt, risikoen er det ikke.",
                ["Kvadratleddene: 0,64 × 0,0225 = 0,0144 og 0,04 × 0,09 = 0,0036.",
                 "Kryssleddet: 2 × 0,8 × 0,2 × 0,2 × 0,15 × 0,30 = 0,00288.",
                 f"Varians {kr(var8, 5)}, standardavvik <b>{pst(sd8)}</b>."],
                [(pst(g8_snitt), "vektet snitt av standardavvikene. Det gjelder bare ved korrelasjon 1."),
                 (pst(var8), "variansen, uten kvadratrot."),
                 (pst(g8_uten_kryss), "kryssleddet er glemt.")],
                f"Poenget: B er dårligere på både forventning og risiko, men 20 % i B gir lavere risiko ({pst(sd8)}) enn A alene "
                f"(15 %). Forventningen faller bare til {pst(w8 * mA + (1 - w8) * mB)}. Det er diversifisering: «the only free "
                "lunch in finance».",
                kilde=f"{A} s. 23–30"),
            dekker=["aksje-diversifisering-01", "aksje-diversifisering-02"])
N8, P8, F8, Nu8 = pst(neg8), pst(1), pst(0.5), pst(null8)
pb = S.ledd("b", "<p>Hvilken andel i A gir lavest mulig standardavvik når korrelasjonen er perfekt negativ? Og når den er "
                 "perfekt positiv?</p>",
            (f"{N8} ved perfekt negativ og {P8} ved perfekt positiv korrelasjon", [N8, P8]),
            [(f"{F8} ved perfekt negativ og {P8} ved perfekt positiv korrelasjon", [F8, P8]),
             (f"{N8} ved perfekt negativ og {pst(pos8_formel)} ved perfekt positiv korrelasjon", [N8, pst(pos8_formel)]),
             (f"{Nu8} ved perfekt negativ og {Nu8} ved perfekt positiv korrelasjon", [Nu8, Nu8])],
            sol("ρ = −1: σ<sub>p</sub> = |wσ<sub>A</sub> − (1 − w)σ<sub>B</sub>|, som blir null ved w = σ<sub>B</sub>/(σ<sub>A</sub> + "
                "σ<sub>B</sub>). ρ = +1: σ<sub>p</sub> er et vektet snitt av standardavvikene, så uten shortsalg får du minst "
                "risiko med alt i aksjen med lavest σ.",
                [f"ρ = −1: w = 0,30/(0,15 + 0,30) = {N8}. Da er 0,6667 × 15 % = 0,3333 × 30 % og σ<sub>p</sub> = 0.",
                 f"ρ = +1: σ<sub>p</sub> = w × 15 % + (1 − w) × 30 % er minst ved w = 1: <b>{P8}</b> i A."],
                [(F8, "like vekter gir null risiko bare når standardavvikene er like (feilen i 2024-versjonen av lysbildet)."),
                 (pst(pos8_formel), "formelen for minimum varians med ρ = 1. Den krever shortsalg av B, som Ola ikke kan."),
                 (Nu8, "formelen for uavhengige aksjer, σ<sub>B</sub><sup>2</sup>/(σ<sub>A</sub><sup>2</sup> + "
                  "σ<sub>B</sub><sup>2</sup>), brukt i begge tilfeller.")],
                "Er null-risiko-porteføljen optimal? Ikke nødvendigvis: mer i A gir høyere forventning (s. 33).",
                kilde=f"{A} s. 31–33, H2024 o12d"),
            dekker=["aksje-diversifisering-05", "aksje-diversifisering-04"])
S.oppgave("Ola og aksjene A og B", "Porteføljevalg", [14], body8, [pa, pb])

# ======================================================================= 9
m1, s1, m2, s2, r9 = 1, 2, 2, 1, -0.5
w9 = (s2 ** 2 - r9 * s1 * s2) / (s1 ** 2 + s2 ** 2 - 2 * r9 * s1 * s2)
g9_aksje2 = 1 - w9
g9_null = s2 ** 2 / (s1 ** 2 + s2 ** 2)
g9_fortegn = (s2 ** 2 + r9 * s1 * s2) / (s1 ** 2 + s2 ** 2 + 2 * r9 * s1 * s2)
sd9 = math.sqrt(w9 ** 2 * s1 ** 2 + (1 - w9) ** 2 * s2 ** 2 + 2 * w9 * (1 - w9) * r9 * s1 * s2)
assert lik(w9, 2 / 7) and lik(g9_fortegn, 0)
print(f"Oppgave 9: w {w9:.4f}, sd {sd9:.4f}, E {w9 * m1 + (1 - w9) * m2:.4f}; aksje2 {g9_aksje2:.4f}; null {g9_null}; fortegn {g9_fortegn}")
a = S.ledd("", "<p>Regnearket «Effektive porteføljer med to risikable aksjer» har disse standardverdiene: aksje 1 har forventning "
               "1 og standardavvik 2, aksje 2 har forventning 2 og standardavvik 1. Korrelasjonen er −0,5. Arket regner "
               "porteføljer med andeler fra 0 til 1 i steg på 0,01.</p>"
               "<p>Hvor stor andel i aksje 1 gir minimum varians? Rund av til to desimaler.</p>",
           (pst(w9), [pst(w9)]),
           [(pst(g9_aksje2), [pst(g9_aksje2)]),
            (pst(g9_null), [pst(g9_null)]),
            (pst(g9_fortegn), [pst(g9_fortegn)])],
           sol("w<sub>1</sub>* = (σ<sub>2</sub><sup>2</sup> − ρσ<sub>1</sub>σ<sub>2</sub>)/(σ<sub>1</sub><sup>2</sup> + "
               "σ<sub>2</sub><sup>2</sup> − 2ρσ<sub>1</sub>σ<sub>2</sub>). Forventningene spiller ingen rolle.",
               ["Teller: 1 − (−0,5) × 2 × 1 = 2.",
                "Nevner: 4 + 1 − 2 × (−0,5) × 2 × 1 = 7.",
                f"w<sub>1</sub>* = 2/7 = <b>{pst(w9)}</b>."],
               [(pst(g9_aksje2), "andelen i aksje 2. Merk: arket nummererer motsatt av lysbildene (her er aksje 2 den gode) "
                 "og kolonnen «AndelAksje2» er egentlig andelen i aksje 1."),
                (pst(g9_null), "formelen for uavhengige aksjer. Den negative korrelasjonen er glemt."),
                (pst(g9_fortegn), "fortegnsfeil på ρ i både teller og nevner.")],
               f"σ<sub>p</sub> = {kr(sd9, 3)} og forventning {kr(w9 * m1 + (1 - w9) * m2, 2)}. Arket finner minimum ved 0,29, "
               "nærmeste steg. ✓",
               kilde=f"{A} s. 29–30, regnearket Effektive porteføljer"),
           dekker=["aksje-diversifisering-03", "aksje-diversifisering-08"])
S.oppgave("Regnearket med to aksjer", "Porteføljevalg", [14], "", [a])

# ======================================================================= 10
a = S.ledd("", "<p>Tenk på alle porteføljer av to risikable aksjer, uten bank. Hvilken påstand er riktig?</p>",
           "Den risikonøytrale setter alt i aksjen med høyest forventning, den mest risikoaverse velger minimum varians",
           ["To aksjer med positiv korrelasjon kan aldri gi en portefølje med lavere risiko enn den tryggeste aksjen alene",
            "Porteføljer på den nedre delen av hyperbelen, under minimum varians-punktet, kan passe for svært risikoaverse",
            "Er én aksje bedre på både forventning og risiko, kan det aldri senke risikoen å blande inn den andre aksjen"],
           begrep("Effisiente porteføljer er den stigende delen av hyperbelen fra minimum varians-punktet A. Maksimalt "
                  "risikoaverse velger A. Jo mindre risikoavers, jo nærmere 100 % i aksjen med høyest forventning.",
                  "Risikonøytral i aksjen med høyest forventning og maksimalt risikoavers i A er riktig.",
                  [("Aldri med positiv korrelasjon", "kravet er ρ &lt; σ<sub>lav</sub>/σ<sub>høy</sub>. I oppgave 8a ga ρ = 0,2 "
                    "lavere risiko enn A alene, fordi 0,2 &lt; 15/30."),
                   ("Under A", "der får man både lavere forventning og høyere risiko enn i punktet rett over. Aldri optimalt."),
                   ("Aldri blande inn den dårlige", "motsatt av lysbildeeksempelet (s. 24–28): litt av den dominerte aksjen "
                    "senker risikoen.")],
                  kilde=f"{A} s. 24–34"),
           dekker=["aksje-diversifisering-06", "aksje-diversifisering-07", "aksje-diversifisering-02"])
S.oppgave("Effisiente porteføljer", "Porteføljevalg", [14], "", [a])

# ======================================================================= 11
rf11, Em11, sm11, sp11 = 0.035, 0.09, 0.16, 0.24
sharpe11 = (Em11 - rf11) / sm11
E11 = rf11 + sharpe11 * sp11
g11_total = rf11 + Em11 / sm11 * sp11
g11_uten_rf = sharpe11 * sp11
g11_gratis = sp11 / sm11 * Em11
print(f"Oppgave 11: Sharpe {sharpe11:.5f}, E {E11:.4f}; total {g11_total:.4f}; uten rf {g11_uten_rf:.4f}; gratis lån {g11_gratis:.4f}")
a = S.ledd("", "<p>Risikofri rente er 3,5 %. Markedsporteføljen, et globalt indeksfond, har forventet avkastning 9 % og "
               "standardavvik 16 %. Siri kan låne og plassere til risikofri rente. Hun vil ha en portefølje med standardavvik "
               "24 %.</p>"
               "<p>Hva er den høyeste forventede avkastningen hun kan få med denne risikoen? Rund av til to desimaler.</p>",
           (pst(E11), [pst(E11)]),
           [(pst(g11_total), [pst(g11_total)]),
            (pst(g11_uten_rf), [pst(g11_uten_rf)]),
            (pst(g11_gratis), [pst(g11_gratis)])],
           sol("Kapitalmarkedslinjen: E(r<sub>p</sub>) = r<sub>f</sub> + (E(r<sub>m</sub>) − r<sub>f</sub>)/σ<sub>m</sub> × "
               "σ<sub>p</sub>. Stigningstallet er Sharpe-ratioen: meravkastning per enhet standardavvik.",
               [f"Sharpe: (9 % − 3,5 %)/16 % = {kr(sharpe11, 4)}.",
                f"E(r<sub>p</sub>) = 3,5 % + {kr(sharpe11, 4)} × 24 % = <b>{pst(E11)}</b>.",
                "Andel i M: 24/16 = 150 %. Hun låner 50 % av formuen og kjøper mer indeksfond."],
               [(pst(g11_total), "total avkastning i telleren (9/16) i stedet for meravkastningen."),
                (pst(g11_uten_rf), "risikofri rente er glemt: bare risikotillegget."),
                (pst(g11_gratis), "150 % × 9 %. Renten på lånet er glemt.")],
               "Kontroll: 1,5 × 9 % − 0,5 × 3,5 % = 11,75 %. ✓ Ikke bland med Merton: CML deler premien på σ<sub>m</sub>, "
               "Merton på γσ<sup>2</sup>.",
               kilde=f"{A} s. 48–49"),
           dekker=["aksje-cml-02", "aksje-cml-03"])
S.oppgave("Siri og kapitalmarkedslinjen", "Porteføljevalg", [14], "", [a])

# ======================================================================= 12
a = S.ledd("", "<p>Hvilken påstand følger av kapitalmarkedslinjen og separasjonsteoremet?</p>",
           "Alle bør kombinere markedsporteføljen med bank eller lån. De risikovillige tar mer av den, ikke andre aksjer",
           ["Den beste linjen trekkes fra risikofri rente til minimum varians-porteføljen, siden den har lavest risiko",
            "Et giret indeksfond som Nordnet Global Indeks 125 strider mot teoremet, fordi det gir mer risiko enn markedet",
            "Hovedfeilen til Tesla-investoren var at det aldri kan være rasjonelt å lånefinansiere aksjer, uansett preferanser"],
           begrep("Linjen fra r<sub>f</sub> som tangerer de effisiente porteføljene i M, ligger over hyperbelen for ethvert "
                  "standardavvik. Derfor tilpasser alle seg på den: separasjonsteoremet. Risikopreferansene avgjør bare "
                  "fordelingen mellom M og bank eller lån.",
                  "Markedsporteføljen pluss bank eller lån for alle er riktig.",
                  [("Linjen til minimum varians", "linjen skal tangere i M. En linje til A gir lavere forventning for enhver risiko."),
                   ("Giret indeksfond", "for 100 kr låner Nordnet deg 25 kr: ca. 1,25 × markedet. Det er et punkt til høyre for M "
                    "på linjen, i tråd med teoremet."),
                   ("Lånefinansiering aldri rasjonelt", "lysbildet sier at det kan være rasjonelt ved lav risikoaversjon. "
                    "Feilene var ekstrem Tesla-spesifikk risiko, som markedet ikke betaler for, pluss forbrukslån.")],
                  kilde=f"{A} s. 43–52 og s. 61–67"),
           dekker=["aksje-cml-04", "aksje-cml-01", "aksje-cml-08", "aksje-cml-09"])
S.oppgave("Separasjonsteoremet", "Porteføljevalg", [14], "", [a])

# ======================================================================= 13
a = S.ledd("", "<p>Hvilken påstand om å låne penger til aksjer stemmer med forelesningen?</p>",
           "En ung statsansatt med sikker humankapital og lav risikoaversjon kan fornuftig låne billig til indeksfond",
           ["Et forbrukslån til 12 % kan lønne seg til aksjekjøp, siden aksjer over tid har gitt klart mer enn bankinnskudd",
            "Det er långiverne selv, som låneformidleren Lendo, som advarer sterkest mot å låne penger til aksjekjøp",
            "Vil man ha høyere forventet avkastning enn markedsporteføljen, bør man velge de mest risikable enkeltaksjene"],
           begrep("Vil du ha mer risiko enn markedsporteføljen, bør du lånefinansiere mer av den (s. 58). Det passer for den "
                  "som er lite risikoavers og har sikker humankapital og liten finansformue (s. 54). Lånet må være billig. "
                  "Modellen antar lån til risikofri rente, så renten trenger ikke være lavere enn den.",
                  "Den unge statsansatte er riktig.",
                  [("Forbrukslån til 12 %", "aksjer har gitt rundt 5 prosentpoeng over risikofri rente på 3–4 %, altså 8–9 %. "
                    "Det er ingen grunn til å tro at et lån til 12 % lønner seg (s. 57)."),
                   ("Lendo advarer", "snudd. DN advarte mot lånefinansiert fondssparing (s. 53). Lendo, som formidler lån, "
                    "anbefaler det (s. 55). Se på avsenderens interesser."),
                   ("Mest risikable enkeltaksjer", "selskapsspesifikk risiko kan diversifiseres bort og gir ingen betaling. "
                    "Lån og kjøp mer av M.")],
                  kilde=f"{A} s. 53–58, H2023 o8 og H2025 o15"),
           dekker=["aksje-cml-05", "aksje-cml-06", "aksje-cml-07", "aksje-cml-10"])
S.oppgave("Lån til aksjer", "Porteføljevalg", [14, 16], "", [a])

# ======================================================================= 14
rf14, Em14, sm14, s14, b14 = 0.03, 0.08, 0.15, 0.45, 0.8
E14 = rf14 + b14 * (Em14 - rf14)
g14_sigma = rf14 + s14 / sm14 * (Em14 - rf14)
g14_brm = b14 * Em14
g14_rf_brm = rf14 + b14 * Em14
print(f"Oppgave 14: CAPM {E14:.4f}; sigma {g14_sigma:.4f}; b*rm {g14_brm:.4f}; rf + b*rm {g14_rf_brm:.4f}")
a = S.ledd("", "<p>Risikofri rente er 3 %. Markedsporteføljen har forventet avkastning 8 % og standardavvik 15 %. Aksjen i "
               "Nordfisk ASA har standardavvik 45 % og beta 0,8.</p>"
               "<p>Hvilken forventet avkastning krever markedet for Nordfisk ifølge CAPM? Rund av til to desimaler.</p>",
           (pst(E14), [pst(E14)]),
           [(pst(g14_sigma), [pst(g14_sigma)]),
            (pst(g14_brm), [pst(g14_brm)]),
            (pst(g14_rf_brm), [pst(g14_rf_brm)])],
           sol("CAPM: r = r<sub>f</sub> + β(r<sub>m</sub> − r<sub>f</sub>). Bare risikoen som ikke kan diversifiseres bort, "
               "altså samvariasjonen med markedet (β), gir risikotillegg.",
               ["Markedspremie: 8 % − 3 % = 5 %.",
                f"r = 3 % + 0,8 × 5 % = <b>{pst(E14)}</b>."],
               [(pst(g14_sigma), "priser hele standardavviket: 3 % + 45/15 × 5 %. Det meste av Nordfisks risiko er "
                 "selskapsspesifikk og kan diversifiseres bort."),
                (pst(g14_brm), "0,8 × 8 %. Den risikofrie renten er glemt."),
                (pst(g14_rf_brm), "β ganger hele markedsavkastningen i stedet for premien.")],
               "Høy σ med lav β gir lavt avkastningskrav. Start-up-eksempelet (s. 59): risiko du kan diversifisere bort, vil "
               "ingen betale deg for. Ingen selvhjelpsbøker nevner kovarians (s. 90). Standardavviket 15 % er støy.",
               kilde=f"{A} s. 59–60 og s. 90"),
           dekker=["aksje-capm-02", "aksje-capm-01", "aksje-capm-06"])
S.oppgave("Nordfisk og CAPM", "Porteføljevalg", [14], "", [a])

# ======================================================================= 15
a = S.ledd("", "<p>Hvilken påstand om indeksfond er riktig?</p>",
           "Et indeksfond gir markedets vektede snitt. Markedet er summen av alle, så ikke alle kan slå det",
           ["Et globalt indeksfond har rundt 30 % i kinesiske aksjer og bare rundt 40 % i amerikanske aksjer",
            "Svak markedseffisiens betyr at prisene også reflekterer innsideinformasjon, så ingen analyse kan lønne seg",
            "Er profesjonelle forvaltere flinkere enn andre, slår de aktive fondene markedet i snitt, også etter gebyrer"],
           begrep("Indeksfond investerer i alle selskapene proporsjonalt med størrelsen. Rent logisk kan ikke alle slå markedet: "
                  "markedet er summen av alle og alle kan ikke slå gjennomsnittet.",
                  "Det vektede snittet og logikken om gjennomsnittet er riktig.",
                  [("30 % Kina, 40 % USA", "eksponeringen (s. 70, H2024 o12b): rundt 70 % USA og lite eller ingen Kina."),
                   ("Svak form og innsideinformasjon", "blander formene. Svak: historiske kurser. Semi-sterk: all offentlig "
                    "informasjon. Sterk: også innsideinformasjon. 2026-lysbildene sier bare at prisene reflekterer all kjent "
                    "informasjon."),
                   ("Proffene slår markedet", "proffene <i>er</i> en stor del av markedet. Før kostnader er gjennomsnittet "
                    "lik markedet, etter gebyrer taper det.")],
                  kilde=f"{A} s. 68–73 og s. 92, H2024 o12a–b"),
           dekker=["aksje-fond-01", "aksje-fond-03", "aksje-fond-06", "aksje-fond-14"])
S.oppgave("Indeksfondet", "Indeksfond og aktiv forvaltning", [14], "", [a])

# ======================================================================= 16
v30_7 = 100_000 * 1.07 ** 30
v30_6 = 100_000 * 1.06 ** 30
tap16 = 1 - v30_6 / v30_7
print(f"Oppgave 16: 7 % {v30_7:.0f}, 6 % {v30_6:.0f}, tap {tap16:.4f}")
a = S.ledd("", "<p>Hvilken påstand om valget mellom globalt indeksfond og aktive fond er riktig?</p>",
           "Indeksfondet gir maksimal spredning til lav pris, mens aktive fond ofte tar 1 til 2 % i året",
           ["En kostnad som er ett prosentpoeng høyere i året, koster bare rundt 1 % av sluttverdien, også over 30 år",
            "På en aksjesparekonto skattlegges gevinsten hver gang du bytter fra et aktivt fond til et indeksfond",
            "Høyere gebyr i aktive fond kjøper i snitt høyere avkastning etter kostnader for kundene i fondet"],
           begrep("Oppsummeringen (s. 91): kjøp globalt indeksfond. Maksimal diversifisering, du slipper risiko du ikke får "
                  "betalt for, aktive fond er mye dyrere (ofte 1 til 2 % i året) og det er vanskelig å slå markedet selv uten "
                  "gebyrer.",
                  "Diversifisering og lave kostnader er riktig.",
                  [("Bare 1 % av sluttverdien", f"kostnaden trekkes hvert år og vokser med rentes rente. 100 000 kr i 30 år: "
                    f"{kr(v30_7)} kr med 7 % mot {kr(v30_6)} kr med 6 %, altså {pst(tap16, 0)} mindre."),
                   ("Skatt ved bytte på ASK", "på aksjesparekonto kan du bytte fond uten løpende gevinstskatt. Skatten kommer "
                    "først når du tar ut mer enn du har satt inn."),
                   ("Gebyr kjøper avkastning", "aktive fond taper i snitt mot indeks etter gebyrer (s. 74–77).")],
                  kilde=f"{A} s. 73 og s. 91, Kvadsheim lb 32"),
           dekker=["aksje-fond-02", "aksje-fond-05", "aksje-fond-08", "aksje-fond-16"])
S.oppgave("Indeksfond eller aktive fond", "Indeksfond og aktiv forvaltning", [14], "", [a])

# ======================================================================= 17
a = S.ledd("", "<p>Hvilken påstand om aktive forvaltere er riktig?</p>",
           "Forbrukerrådet fant at aktive fond slo indeks i norske aksjer, men tapte i globale, europeiske og nordiske",
           ["Survivorship bias får aktive fond til å se dårligere ut enn de er, fordi de beste fondene blir kjøpt opp og forsvinner",
            "Forvaltere som har slått indeksen i årene før de blir ansatt, fortsetter i snitt å slå den like mye etter ansettelsen",
            "Berk og DeMarzo finner at aktive fond gjør det dårligere enn indeks allerede før gebyrene er trukket fra avkastningen"],
           begrep("Forbrukerrådet (2018, siste 20 år): årlig differanseavkastning −0,89 for globale, −1,08 for europeiske, "
                  "−3,48 for nordiske og +0,86 prosentpoeng for norske fond.",
                  "Svakere ute, bedre hjemme er riktig.",
                  [("Survivorship bias", "snudd. Dårlige fond legges ned og forsvinner fra statistikken. Det får de overlevende "
                    "til å se <i>bedre</i> ut (Malkiel 1995)."),
                   ("Fortsetter å slå indeks", "forvaltere med ca. 3,5 % meravkastning før ansettelse leverer ca. 0,4–0,7 % "
                    "etterpå. De beste på 80-tallet var under indeks på 90-tallet."),
                   ("Dårligere før gebyrer", "Berk og DeMarzo sier det motsatte: aktive fond slår indeks før gebyrer, men "
                    "kundene taper etter gebyrer. Alle fondstyper har negativ alfa.")],
                  kilde=f"{A} s. 74–81"),
           dekker=["aksje-fond-04", "aksje-fond-09", "aksje-fond-10", "aksje-fond-11"])
S.oppgave("Aktive forvaltere", "Indeksfond og aktiv forvaltning", [14], "", [a])

# ======================================================================= 18
a = S.ledd("", "<p>Verdiaksjer har historisk gitt høyere avkastning enn andre aksjer. Hvilken påstand er riktig?</p>",
           "Er premien betaling for en risiko som beta ikke fanger, gir verdiaksjer ikke bedre risikojustert avkastning",
           ["Verdiaksjer er aksjer med høy pris i forhold til inntjening og bokført verdi, først oppdaget av Fama og French",
            "Fama og French erstatter markedsbetaen i CAPM med to faktorer, én for selskapsstørrelse og én for verdi",
            "Ekskludering virker selv om bare du selger deg ut, mens aktivt eierskap krever at du ikke eier aksjene"],
           begrep("Funnene kan tolkes på to måter: (1) aksjene er bedre investeringer, eller (2) de er mer risikable på en måte "
                  "CAPM ikke fanger. Da er premien betaling for den risikoen. Under (2) bør du ikke nødvendigvis kjøpe dem "
                  "hvis du vil maksimere risikojustert avkastning (s. 83 og s. 89).",
                  "Tolkning 2 er riktig gjengitt.",
                  [("Høy pris, Fama og French først", "verdiaksjer har <i>lav</i> P/E eller <i>høy</i> book-to-market. Benjamin "
                    "Graham fant premien på 1930-tallet. Fama og French (1992) forsterket funnet."),
                   ("Erstatter beta", "trefaktormodellen <i>utvider</i> CAPM: r = r<sub>f</sub> + β(r<sub>m</sub> − r<sub>f</sub>) "
                    "+ b<sub>s</sub>SMB + b<sub>v</sub>HML + α. Formelsiden står i versjonen fra 25.9. (s. 90–91), ikke i 30.9."),
                   ("Ekskludering og eierskap", "snudd. Ekskludering («stikk») virker bare hvis mange selger seg ut. Aktivt "
                    "eierskap («bli og fiks») krever at du eier aksjene (H2021 o6d).")],
                  kilde=f"{A} s. 83–89, Aksjesparing 25.9. s. 90–91 og H2021 o6d"),
           dekker=["aksje-capm-05", "aksje-capm-04", "aksje-capm-03", "aksje-fond-15"])
S.oppgave("Verdiaksjer", "Indeksfond og aktiv forvaltning", [14], "", [a])

S.skriv(label="Næss: aksjesparing, kan du slå markedet?",
        note="Aksjesparingsforelesningen: Merton-andelen med og uten humankapital, forventet nytte, diversifisering med to "
             "aksjer, kapitalmarkedslinjen, CAPM og indeksfond mot aktive fond.",
        facts=["20 flervalg med fire alternativer: 3 poeng for rett, −1 for feil og 0 for blankt.",
               "Satser og regler står i oppgaveteksten, slik de blir oppgitt på eksamen.",
               "Sammen med de andre settene i fanen dekker settet hvert punkt i sjekklisten.",
               "Laget fra forelesningsnotatene 2026. Kurset har ikke kontrollert løsningene."],
        practiceNote="Les ordet: «standardavvik» skal kvadreres, «varians» skal ikke. Og regn alltid formuen som finansformue "
                     "pluss humankapital før du bruker Merton-andelen.")
